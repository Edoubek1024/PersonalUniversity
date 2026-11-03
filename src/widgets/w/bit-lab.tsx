/**
 * bit-lab: a row of clickable bits read three ways.
 *
 *   int     unsigned / two's-complement readouts with place values, and an operations panel
 *           (add, subtract with the carry chain and overflow flags, negate = invert + 1,
 *           shifts, AND/OR/XOR with a mask)
 *   float   IEEE 754 binary16/32/64: coloured sign/exponent/fraction fields, the formula with
 *           numbers filled in, the exact stored value, rounding from a typed decimal, and
 *           next/previous representable numbers with the gap (ulp)
 *   endian  the bytes of a 16/32/64-bit value at increasing addresses, little- and big-endian
 *
 * Params:
 *   mode     "int" | "float" | "endian"                 default "int"
 *   modes    string[]  modes offered in a selector       default [mode]
 *   width    4 | 8 | 16 | 32   integer width              default 8
 *   widths   number[]  widths offered                     default [4, 8, 16, 32]
 *   value    number | string   initial value: integer (or "0x…", "0b…") in int/endian mode,
 *            a decimal such as "0.1" in float mode       default 0 (int), "0.1" (float), "0x01234567" (endian)
 *   bits     string    float mode: initial raw pattern in hex, e.g. "0x3F800000" (overrides value)
 *   signed   boolean   int mode: place values read as two's complement   default true
 *   ops      string[]  any of "add", "sub", "neg", "shift", "mask"; [] hides the panel
 *                                                         default all five
 *   op       string    operation shown first              default first of ops
 *   b        number | string   second operand / mask      default 1 (add/sub), "0x0F" style for mask
 *   format   "binary16" | "binary32" | "binary64"       default "binary32"
 *   formats  string[]  float formats offered              default [format]
 *   endianWidth  16 | 32 | 64                             default 32
 *   base     number    endian mode: address of the first byte (shown in decimal)   default 100
 *   title    string                                       default "Bit lab"
 *   caption  string
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray, numArray } from '../kit/params';
import { Button, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import {
  FORMATS,
  bin,
  bit,
  dec,
  decodeFloat,
  dyadicDecimal,
  dyadicSub,
  dyadicToNumber,
  encodeParsed,
  errorDecimal,
  exactDecimal,
  hex,
  mask,
  nextDown,
  nextUp,
  parseIntLiteral,
  parseReal,
  powerOfTwo,
  sci,
  shortestDecimal,
  toDyadic,
  toSigned,
  wrap,
  type FloatFormat,
  type Parsed,
} from '../kit/arch-bits';
import { BitRow, Field, MonoRows, tint, type MonoRow } from '../kit/arch-ui';

type Mode = 'int' | 'float' | 'endian';
const MODES = ['int', 'float', 'endian'] as const;
const OPS = ['add', 'sub', 'neg', 'shift', 'mask'] as const;
type Op = (typeof OPS)[number];
type FmtName = FloatFormat['name'];
const FMT_NAMES = ['binary16', 'binary32', 'binary64'] as const;

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (k: number) => String(k).replace(/\d/g, (d) => SUP[+d]).replace('-', '⁻');
const pow2 = (k: number) => `2${sup(k)}`;

function intParam(p: Record<string, unknown>, key: string, def: bigint): bigint {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v === 'number' && Number.isInteger(v)) return BigInt(v);
  if (typeof v === 'string') {
    const r = parseIntLiteral(v);
    if (r !== null) return r;
  }
  throw new Error(`parameter "${key}" should be an integer or an integer literal such as "0x7F", got ${JSON.stringify(v)}`);
}

/** A readout whose value wraps instead of truncating (for long bit strings). */
function Out({ label, children, tone }: { label: ReactNode; children: ReactNode; tone?: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-surface-2 px-3 py-1.5">
      <div className="text-[11px] uppercase tracking-wide text-ink-3">{label}</div>
      <div className="break-all font-mono text-sm tabular-nums" style={tone ? { color: tone } : undefined}>
        {children}
      </div>
    </div>
  );
}

export default function BitLab({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'int');
  const modes = strArray(params, 'modes', [mode0]);
  for (const m of modes) if (!(MODES as readonly string[]).includes(m)) throw new Error(`parameter "modes" has unknown mode "${m}" (use int, float, endian)`);
  if (!modes.includes(mode0)) throw new Error('parameter "mode" must be one of "modes"');
  const [mode, setMode] = useState<Mode>(mode0);

  const title = str(params, 'title', 'Bit lab');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  return (
    <Frame title={title} caption={caption}>
      {modes.length > 1 && (
        <Segmented
          value={mode}
          onChange={setMode}
          options={(modes as Mode[]).map((m) => ({ value: m, label: m === 'int' ? 'Integer' : m === 'float' ? 'Floating point' : 'Byte order' }))}
        />
      )}
      {mode === 'int' && <IntMode params={params} />}
      {mode === 'float' && <FloatMode params={params} />}
      {mode === 'endian' && <EndianMode params={params} />}
    </Frame>
  );
}

// ======================================================================= integer mode

function IntMode({ params }: { params: Record<string, unknown> }) {
  const widths = numArray(params, 'widths', [4, 8, 16, 32]);
  for (const w of widths) if (![4, 8, 16, 32].includes(w)) throw new Error(`parameter "widths" may only contain 4, 8, 16, 32, got ${w}`);
  const w0 = num(params, 'width', 8);
  if (![4, 8, 16, 32].includes(w0)) throw new Error(`parameter "width" should be 4, 8, 16 or 32, got ${w0}`);
  const v0 = intParam(params, 'value', 0n);
  const ops = strArray(params, 'ops', [...OPS]) as Op[];
  for (const o of ops) if (!(OPS as readonly string[]).includes(o)) throw new Error(`parameter "ops" has unknown operation "${o}" (use ${OPS.join(', ')})`);
  const op0 = oneOf(params, 'op', OPS, ops[0] ?? 'add');
  const b0 = intParam(params, 'b', op0 === 'mask' ? 0x0fn : 1n);

  const [n, setN] = useState(w0);
  const [a, setA] = useState(() => wrap(v0, w0));
  const [text, setText] = useState(dec(v0));
  const [signed, setSigned] = useState(bool(params, 'signed', true));
  const [widthNote, setWidthNote] = useState<string | null>(null);

  const parsed = parseIntLiteral(text);
  const outOfRange = parsed !== null && (parsed < -(1n << BigInt(n - 1)) || parsed > mask(n));

  const setFromText = (t: string) => {
    setText(t);
    const v = parseIntLiteral(t);
    if (v !== null) setA(wrap(v, n));
    setWidthNote(null);
  };
  const setBits = (v: bigint, nn = n) => {
    setA(v);
    setText(dec(signed ? toSigned(v, nn) : v));
  };
  const changeWidth = (w: number) => {
    // Widening sign-extends (signed view) or zero-extends (unsigned view); narrowing truncates.
    const val = signed ? toSigned(a, n) : a;
    const nv = wrap(val, w);
    const kept = (signed ? toSigned(nv, w) : nv) === val;
    setN(w);
    setBits(nv, w);
    setWidthNote(
      w > n
        ? `Widened from ${n} to ${w} bits by ${signed ? 'sign extension (copies of the sign bit fill the new high bits)' : 'zero extension'}: the value is unchanged.`
        : w < n
          ? `Narrowed from ${n} to ${w} bits by dropping the high bits: ${kept ? 'the value happens to survive.' : `the value changed from ${dec(val)} to ${dec(signed ? toSigned(nv, w) : nv)}.`}`
          : null,
    );
  };

  const u = a;
  const s = toSigned(a, n);
  const weight = (i: number): bigint => (signed && i === n - 1 ? -(1n << BigInt(i)) : 1n << BigInt(i));
  const weightLabel = (i: number) => (n <= 8 ? dec(weight(i)) : `${signed && i === n - 1 ? '−' : ''}2${sup(i)}`);
  const setIdx = [...Array(n).keys()].reverse().filter((i) => bit(a, i));
  const terms = setIdx.map((i) => weight(i));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
        {widths.length > 1 && <Segmented label="Width" value={String(n)} onChange={(v) => changeWidth(+v)} options={widths.map((w) => ({ value: String(w), label: `${w} bits` }))} />}
        <Segmented
          label="Place value of the top bit"
          value={signed ? 's' : 'u'}
          onChange={(v) => {
            setSigned(v === 's');
            setText(dec(v === 's' ? toSigned(a, n) : a));
          }}
          options={[
            { value: 'u', label: `unsigned (+2${sup(n - 1)})` },
            { value: 's', label: `two's complement (−2${sup(n - 1)})` },
          ]}
        />
      </div>
      <BitRow value={a} width={n} onToggle={(i) => setBits(a ^ (1n << BigInt(i)))} below={weightLabel} color={(i) => (signed && i === n - 1 ? 'var(--plot-2)' : undefined)} label="Bits of a; click to flip" />
      <div className="text-[13px] leading-6 text-ink-2">
        {terms.length === 0 ? (
          'No bits set: the value is 0.'
        ) : terms.length === 1 ? (
          <span>
            Only bit {setIdx[0]} is set: the value is its place value, <b className="font-mono text-ink">{dec(terms[0])}</b>.
          </span>
        ) : terms.length <= 10 ? (
          <span className="font-mono text-[12.5px]">
            = {terms.map((t, k) => (k === 0 ? dec(t) : t < 0n ? ` − ${-t}` : ` + ${t}`)).join('')} = <b className="text-ink">{dec(signed ? s : u)}</b>
          </span>
        ) : (
          <span>
            Sum of the {terms.length} set place values = <b className="font-mono text-ink">{dec(signed ? s : u)}</b>
          </span>
        )}
      </div>
      {widthNote && <Note>{widthNote}</Note>}
      <div className="grid gap-x-5 gap-y-3 sm:grid-cols-[1fr_auto]">
        <Field
          label="Set a from a number (decimal, −37, 0x2A, 0b1010)"
          value={text}
          onChange={setFromText}
          error={parsed === null && text.trim() !== '' ? 'Not an integer literal' : outOfRange ? `Out of range for ${n} bits: stored modulo 2${sup(n)} as ${dec(wrap(parsed!, n))}` : null}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Unsigned" value={dec(u)} />
        <Readout label="Signed (two's comp.)" value={dec(s)} tone={s < 0n ? 'var(--plot-2)' : undefined} />
        <Readout label="Hex" value={hex(a, n)} />
        <Readout label="Range" value={signed ? `${dec(-(1n << BigInt(n - 1)))} … ${dec((1n << BigInt(n - 1)) - 1n)}` : `0 … ${dec(mask(n))}`} />
      </div>
      <Out label="Binary">{bin(a, n)}</Out>
      {ops.length > 0 && <OpsPanel n={n} a={a} ops={ops} op0={op0} b0={b0} onUse={(v) => setBits(v)} />}
    </div>
  );
}

interface Col {
  ch: string;
  /** Bit index (or -1 for spacing, n for the carry-out column). */
  i: number;
}

/** Characters for an n-bit row with nibble spaces and a leading carry-out column. */
function cols(n: number, digit: (i: number) => string, prefix = ' '): Col[] {
  const out: Col[] = [{ ch: prefix, i: n }, { ch: ' ', i: -1 }];
  for (let i = n - 1; i >= 0; i--) {
    out.push({ ch: digit(i), i });
    if (i > 0 && i % 4 === 0) out.push({ ch: ' ', i: -1 });
  }
  return out;
}

function row(label: ReactNode, cs: Col[], color?: (c: Col) => string | undefined, extra: Partial<MonoRow> = {}): MonoRow {
  return { label, text: cs.map((c) => c.ch).join(''), color: color ? (k) => color(cs[k]) : undefined, ...extra };
}

function OpsPanel({ n, a, ops, op0, b0, onUse }: { n: number; a: bigint; ops: Op[]; op0: Op; b0: bigint; onUse: (v: bigint) => void }) {
  const [op, setOp] = useState<Op>(op0);
  const [bText, setBText] = useState(op0 === 'mask' ? hex(wrap(b0, 8), 8) : dec(b0));
  const [shiftKind, setShiftKind] = useState<'shl' | 'lsr' | 'asr'>('asr');
  const [k, setK] = useState(1);
  const [logic, setLogic] = useState<'and' | 'or' | 'xor'>('and');
  const bParsed = parseIntLiteral(bText);
  const b = wrap(bParsed ?? 0n, n);
  const kk = Math.min(k, n - 1);

  const view = useMemo(() => {
    const sA = toSigned(a, n);
    const top = n - 1;
    if (op === 'add' || op === 'sub' || op === 'neg') {
      const x = op === 'neg' ? a ^ mask(n) : a;
      const y = op === 'add' ? b : op === 'sub' ? b ^ mask(n) : 0n;
      const cin = op === 'add' ? 0 : 1;
      const c: number[] = [cin];
      let r = 0n;
      for (let i = 0; i < n; i++) {
        const xi = bit(x, i);
        const yi = bit(y, i);
        const si = xi ^ yi ^ c[i];
        c.push((xi & yi) | (c[i] & (xi ^ yi)));
        if (si) r |= 1n << BigInt(i);
      }
      const cout = c[n];
      const vflag = c[n] !== c[n - 1];
      const carryColor = (cc: Col) => (cc.i === n || cc.i === top ? (vflag ? 'var(--plot-2)' : cc.ch === '1' ? 'var(--plot-4)' : undefined) : cc.ch === '1' ? 'var(--plot-4)' : undefined);
      const rows: MonoRow[] = [
        row('carry', cols(n, (i) => String(c[i]), String(cout)), carryColor, {
          dim: true,
          note: `carry into the sign bit ${c[top]}, carry out ${cout}`,
        }),
      ];
      const sB = toSigned(b, n);
      if (op === 'add') {
        rows.push(row('a', cols(n, (i) => String(bit(a, i))), undefined, { note: `${dec(a)} unsigned, ${dec(sA)} signed` }));
        rows.push(row('+ b', cols(n, (i) => String(bit(b, i))), undefined, { note: `${dec(b)} unsigned, ${dec(sB)} signed` }));
      } else if (op === 'sub') {
        rows.push(row('a', cols(n, (i) => String(bit(a, i))), undefined, { note: `${dec(a)} unsigned, ${dec(sA)} signed` }));
        rows.push(row('+ ~b', cols(n, (i) => String(bit(y, i))), undefined, { note: `b = ${dec(b)} (${dec(sB)} signed) inverted; carry in 1 adds the +1` }));
      } else {
        rows.push(row('a', cols(n, (i) => String(bit(a, i))), undefined, { dim: true, note: `${dec(sA)}` }));
        rows.push(row('~a', cols(n, (i) => String(bit(x, i))), undefined, { note: 'every bit flipped (= −a − 1)' }));
        rows.push(row('+ 1', cols(n, (i) => (i === 0 ? '1' : '0')), undefined, { dim: true, note: 'carry in 1' }));
      }
      const sR = toSigned(r, n);
      rows.push(row('=', cols(n, (i) => String(bit(r, i))), undefined, { rule: true, note: `${dec(r)} unsigned, ${dec(sR)} signed` }));

      const notes: { tone: 'info' | 'warn' | 'good'; text: ReactNode }[] = [];
      const two = 1n << BigInt(n);
      if (op === 'add') {
        const tu = a + b;
        const ts = sA + sB;
        notes.push(
          cout
            ? { tone: 'warn', text: `Unsigned overflow: ${dec(a)} + ${dec(b)} = ${dec(tu)} needs ${n + 1} bits. The carry out is lost, leaving ${dec(tu)} − ${dec(two)} = ${dec(r)}.` }
            : { tone: 'good', text: `Unsigned: no carry out, so ${dec(a)} + ${dec(b)} = ${dec(r)} is exact.` },
        );
        notes.push(
          vflag
            ? { tone: 'warn', text: `Signed overflow: ${dec(sA)} + ${dec(sB)} = ${dec(ts)} is outside the ${n}-bit range, and the carry into the sign bit (${c[top]}) differs from the carry out (${cout}). The result reads as ${dec(sR)}${ts > 0n ? ': two positives gave a negative.' : ': two negatives gave a positive.'}` }
            : { tone: 'good', text: `Signed: carry into the sign bit equals carry out (${cout}), so ${dec(sA)} + ${dec(sB)} = ${dec(sR)} is exact${cout ? ' (the carry out is normal here, not an overflow)' : ''}.` },
        );
      } else if (op === 'sub') {
        const tu = a - b;
        const ts = sA - sB;
        notes.push(
          cout
            ? { tone: 'good', text: `Unsigned: carry out 1 means no borrow (a ≥ b), so ${dec(a)} − ${dec(b)} = ${dec(r)}.` }
            : { tone: 'warn', text: `Unsigned borrow: as unsigned, a < b, so ${dec(a)} − ${dec(b)} = ${dec(tu)} wraps to ${dec(r)} (carry out 0 signals the borrow).` },
        );
        notes.push(
          vflag
            ? { tone: 'warn', text: `Signed overflow: ${dec(sA)} − ${dec(sB)} = ${dec(ts)} does not fit; the carry into the sign bit (${c[top]}) differs from the carry out (${cout}), and the result reads as ${dec(sR)}.` }
            : { tone: 'good', text: `Signed: ${dec(sA)} − ${dec(sB)} = ${dec(sR)}, no overflow.` },
        );
      } else {
        notes.push(
          a === 1n << BigInt(top)
            ? { tone: 'warn', text: `${dec(sA)} is the most negative ${n}-bit number. Its negation ${dec(-sA)} does not fit, and invert-and-add-one gives back ${dec(sR)}: the number is its own negative (signed overflow).` }
            : a === 0n
              ? { tone: 'info', text: `~0 is all ones; adding 1 carries out of the top bit, which is lost, so −0 = 0.` }
              : { tone: 'good', text: `−(${dec(sA)}) = ${dec(sR)}. Check: a + (−a) = ${dec(two)} ≡ 0 (mod 2${sup(n)}).` },
        );
      }
      return { rows, result: r, notes, flags: op === 'neg' ? null : { cout, vflag } };
    }
    if (op === 'shift') {
      let r: bigint;
      let note: string;
      const pow = 1n << BigInt(kk);
      if (shiftKind === 'shl') {
        r = wrap(a << BigInt(kk), n);
        const sR = toSigned(r, n);
        const lostU = a * pow !== r;
        const lostS = sA * pow !== sR;
        note = `a << ${kk} = a × 2${sup(kk)}${lostU || lostS ? ' modulo 2' + sup(n) : ''}: unsigned ${dec(a)} × ${dec(pow)} = ${dec(a * pow)}${lostU ? ` → ${dec(r)} (high bits lost)` : ''}; signed ${dec(sA)} × ${dec(pow)} = ${dec(sA * pow)}${lostS ? ` → ${dec(sR)} (overflow)` : ''}.`;
      } else if (shiftKind === 'lsr') {
        r = a >> BigInt(kk);
        note = `Logical shift fills with zeros: ⌊${dec(a)} / ${dec(pow)}⌋ = ${dec(r)} as unsigned.${sA < 0n && kk > 0 ? ` As a signed number the sign is lost (${dec(sA)} became ${dec(toSigned(r, n))}).` : ''}`;
      } else {
        const fill = bit(a, n - 1) ? mask(n) ^ (mask(n) >> BigInt(kk)) : 0n;
        r = (a >> BigInt(kk)) | fill;
        const sR = toSigned(r, n);
        const trunc = sA / pow; // BigInt division truncates toward zero, like C
        note = `Arithmetic shift copies the sign bit in: ⌊${dec(sA)} / ${dec(pow)}⌋ = ${dec(sR)} (rounds toward −∞).${sR !== trunc ? ` C's ${dec(sA)} / ${dec(pow)} rounds toward zero and gives ${dec(trunc)}, which is why compilers add a bias before shifting.` : ''}`;
      }
      const incoming = (i: number) => (shiftKind === 'shl' ? i < kk : i >= n - kk);
      const rows: MonoRow[] = [
        row('a', cols(n, (i) => String(bit(a, i))), (c) => (c.i >= 0 && c.i < n && (shiftKind === 'shl' ? c.i >= n - kk : c.i < kk) ? 'var(--color-ink-3)' : undefined), { note: `${dec(a)} unsigned, ${dec(sA)} signed` }),
        row(shiftKind === 'shl' ? `<< ${kk}` : `>> ${kk}`, cols(n, (i) => String(bit(r, i))), (c) => (c.i >= 0 && c.i < n && incoming(c.i) ? 'var(--plot-4)' : undefined), {
          rule: true,
          note: `${dec(r)} unsigned, ${dec(toSigned(r, n))} signed`,
        }),
      ];
      return { rows, result: r, notes: [{ tone: 'info' as const, text: note }], flags: null };
    }
    // mask
    const r = logic === 'and' ? a & b : logic === 'or' ? a | b : a ^ b;
    const sym = logic === 'and' ? '&' : logic === 'or' ? '|' : '^';
    const rows: MonoRow[] = [
      row('a', cols(n, (i) => String(bit(a, i))), undefined, { note: hex(a, n) }),
      row(`${sym} m`, cols(n, (i) => String(bit(b, i))), (c) => (c.i >= 0 && c.i < n && bit(b, c.i) ? 'var(--plot-5)' : undefined), { note: hex(b, n) }),
      row('=', cols(n, (i) => String(bit(r, i))), (c) => (c.i >= 0 && c.i < n && bit(b, c.i) ? 'var(--plot-5)' : undefined), { rule: true, note: `${hex(r, n)} = ${dec(r)}` }),
    ];
    const text =
      logic === 'and'
        ? 'AND keeps the bits of a where the mask is 1 and clears the rest: extract a field, or clear bits with a & ~m.'
        : logic === 'or'
          ? 'OR sets every bit where the mask is 1 and leaves the others: x | (1 << k) sets bit k.'
          : 'XOR flips every bit where the mask is 1: applying the same mask twice gives a back.';
    return { rows, result: r, notes: [{ tone: 'info' as const, text }], flags: null };
  }, [a, b, n, op, shiftKind, kk, logic]);

  return (
    <div className="space-y-3 rounded-xl border border-line p-3">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
        {ops.length > 1 && (
          <Segmented
            label="Operation"
            value={op}
            onChange={(v) => {
              setOp(v);
              if (v === 'mask' && op !== 'mask') setBText(hex(mask(Math.min(4, n)), n));
            }}
            options={ops.map((o) => ({ value: o, label: { add: 'a + b', sub: 'a − b', neg: '−a', shift: 'shift', mask: 'mask' }[o] }))}
          />
        )}
        {op === 'shift' && (
          <Segmented
            label="Shift"
            value={shiftKind}
            onChange={setShiftKind}
            options={[
              { value: 'shl', label: '<< left' },
              { value: 'lsr', label: '>> logical' },
              { value: 'asr', label: '>> arithmetic' },
            ]}
          />
        )}
        {op === 'mask' && (
          <Segmented
            label="With mask m"
            value={logic}
            onChange={setLogic}
            options={[
              { value: 'and', label: 'a & m' },
              { value: 'or', label: 'a | m' },
              { value: 'xor', label: 'a ^ m' },
            ]}
          />
        )}
      </div>
      {(op === 'add' || op === 'sub' || op === 'mask') && (
        <div className="max-w-xs">
          <Field label={op === 'mask' ? 'Mask m (0x0F, 0b1100, 12)' : 'b (decimal, −5, 0x7F)'} value={bText} onChange={setBText} error={bParsed === null ? 'Not an integer literal' : null} />
        </div>
      )}
      {op === 'shift' && (
        <div className="max-w-xs">
          <Slider label="Shift amount k" value={kk} min={0} max={n - 1} step={1} onChange={setK} format={(v) => String(v)} />
        </div>
      )}
      <MonoRows rows={view.rows} />
      {view.flags && (
        <div className="grid grid-cols-3 gap-2">
          <Readout label="Carry out" value={view.flags.cout} />
          <Readout label="Unsigned overflow" value={op === 'sub' ? (view.flags.cout ? 'no' : 'borrow') : view.flags.cout ? 'yes' : 'no'} tone={(op === 'sub' ? !view.flags.cout : view.flags.cout) ? 'var(--plot-2)' : undefined} />
          <Readout label="Signed overflow" value={view.flags.vflag ? 'yes' : 'no'} tone={view.flags.vflag ? 'var(--plot-2)' : undefined} />
        </div>
      )}
      {view.notes.map((nt, i) => (
        <Note key={i} tone={nt.tone}>
          {nt.text}
        </Note>
      ))}
      <Button onClick={() => onUse(view.result)}>Use the result as a</Button>
    </div>
  );
}

// ======================================================================= float mode

const FIELD_COLORS = { s: 'var(--plot-2)', e: 'var(--plot-1)', f: 'var(--plot-3)' };

function ratToNumber(n: bigint, d: bigint): number {
  const neg = n < 0n !== d < 0n;
  let a = n < 0n ? -n : n;
  let b = d < 0n ? -d : d;
  const la = a.toString(2).length;
  const lb = b.toString(2).length;
  const sa = Math.max(0, la - 62);
  const sb = Math.max(0, lb - 62);
  a >>= BigInt(sa);
  b >>= BigInt(sb);
  const v = (Number(a) / Number(b)) * 2 ** (sa - sb);
  return neg ? -v : v;
}

function FloatMode({ params }: { params: Record<string, unknown> }) {
  const f0 = oneOf(params, 'format', FMT_NAMES, 'binary32');
  const formats = strArray(params, 'formats', [f0]) as FmtName[];
  for (const f of formats) if (!(FMT_NAMES as readonly string[]).includes(f)) throw new Error(`parameter "formats" has unknown format "${f}"`);
  const rawBits = typeof params.bits === 'string' ? params.bits : undefined;
  if (params.bits !== undefined && typeof params.bits !== 'string') throw new Error('parameter "bits" should be a hex string such as "0x3F800000"');
  const v0 = params.value === undefined ? '0.1' : typeof params.value === 'number' ? String(params.value) : str(params, 'value', '0.1');

  const init = useMemo(() => {
    if (rawBits) {
      const b = parseIntLiteral(rawBits);
      if (b === null || b < 0n || b > mask(FORMATS[f0].bits)) throw new Error(`parameter "bits" is not a ${FORMATS[f0].bits}-bit hex pattern: ${rawBits}`);
      return { bits: b, text: shortestDecimal(b, FORMATS[f0]), typed: null as Parsed | null };
    }
    const p = parseReal(v0);
    if (!p) throw new Error(`parameter "value" is not a number: ${v0}`);
    return { bits: encodeParsed(p, FORMATS[f0]), text: v0, typed: p };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [fmtName, setFmtName] = useState<FmtName>(f0);
  const fmt = FORMATS[fmtName];
  const [bits, setBitsRaw] = useState(init.bits);
  const [text, setText] = useState(init.text);
  const [typed, setTyped] = useState<Parsed | null>(init.typed);

  const setBits = (b: bigint) => {
    setBitsRaw(b);
    setTyped(null);
    setText(shortestDecimal(b, fmt));
  };
  const onText = (t: string) => {
    setText(t);
    const p = parseReal(t);
    if (p) {
      setTyped(p);
      setBitsRaw(encodeParsed(p, fmt));
    }
  };
  const changeFormat = (name: FmtName) => {
    const nf = FORMATS[name];
    let p: Parsed | null = typed;
    if (!p) {
      const d = decodeFloat(bits, fmt);
      if (d.cls === 'nan') p = { kind: 'nan' };
      else if (d.cls === 'infinity') p = { kind: 'inf', neg: !!d.s };
      else p = d.exp2 >= 0 ? { kind: 'num', neg: !!d.s, num: d.mant << BigInt(d.exp2), den: 1n } : { kind: 'num', neg: !!d.s, num: d.mant, den: 1n << BigInt(-d.exp2) };
    }
    setFmtName(name);
    setBitsRaw(encodeParsed(p, nf));
    if (!typed) setText(shortestDecimal(encodeParsed(p, nf), nf));
  };

  const d = decodeFloat(bits, fmt);
  const eAll = (1 << fmt.expBits) - 1;
  const fieldOf = (i: number): 's' | 'e' | 'f' => (i === fmt.bits - 1 ? 's' : i >= fmt.fracBits ? 'e' : 'f');
  const emin = 1 - fmt.bias;

  const formula = useMemo(() => {
    const sgn = `(-1)^{${d.s}}`;
    const F = d.F.toString();
    if (d.cls === 'normal') {
      const sig = exactDecimal(d.mant, -fmt.fracBits);
      const sigShort = sig.length > 26 ? sig.slice(0, 24) + '\\ldots' : sig;
      return [`${sgn} \\times \\left(1 + \\tfrac{${F}}{2^{${fmt.fracBits}}}\\right) \\times 2^{${d.E} - ${fmt.bias}}`, `= ${d.s ? '-' : ''}${sigShort} \\times 2^{${d.E - fmt.bias}}`];
    }
    if (d.cls === 'subnormal') {
      const sig = exactDecimal(d.F, -fmt.fracBits);
      const sigShort = sig.length > 26 ? sig.slice(0, 24) + '\\ldots' : sig;
      return [`${sgn} \\times \\left(0 + \\tfrac{${F}}{2^{${fmt.fracBits}}}\\right) \\times 2^{1 - ${fmt.bias}}`, `= ${d.s ? '-' : ''}${sigShort} \\times 2^{${emin}}`];
    }
    if (d.cls === 'zero') return [`E = 0,\\ F = 0`, `\\Rightarrow\\; ${d.s ? '-' : '+'}0`];
    if (d.cls === 'infinity') return [`E = ${eAll}\\ (\\text{all ones}),\\ F = 0`, `\\Rightarrow\\; ${d.s ? '-' : '+'}\\infty`];
    return [`E = ${eAll}\\ (\\text{all ones}),\\ F \\neq 0`, `\\Rightarrow\\; \\text{NaN}`];
  }, [bits, fmtName]); // eslint-disable-line react-hooks/exhaustive-deps

  const clsLabel = {
    zero: d.s ? 'negative zero' : 'zero',
    subnormal: 'subnormal (denormalised)',
    normal: 'normalised',
    infinity: d.s ? '−infinity' : '+infinity',
    nan: (d.F >> BigInt(fmt.fracBits - 1)) & 1n ? 'NaN (quiet)' : 'NaN (signalling)',
  }[d.cls];

  const stored = toDyadic(bits, fmt);
  const exact = stored ? dyadicDecimal(stored) : d.cls === 'nan' ? 'NaN' : d.s ? '−∞' : '+∞';
  const up = nextUp(bits, fmt);
  const down = nextDown(bits, fmt);
  const gap = (x: bigint, y: bigint) => {
    const dx = toDyadic(x, fmt);
    const dy = toDyadic(y, fmt);
    if (!dx || !dy || x === y) return '—';
    const g = dyadicSub(dx, dy);
    const p2 = powerOfTwo(g);
    return p2 !== null ? `${pow2(p2)} ≈ ${sci(Math.abs(dyadicToNumber(g)), 4)}` : sci(Math.abs(dyadicToNumber(g)), 4);
  };
  const ulpExp = d.cls === 'normal' || d.cls === 'subnormal' || d.cls === 'zero' ? (d.cls === 'normal' ? d.E - fmt.bias : emin) - fmt.fracBits : null;

  // Rounding error of the typed decimal.
  const typedInfo = useMemo(() => {
    if (!typed || typed.kind !== 'num' || !stored) {
      if (typed && typed.kind === 'num' && !stored) return { kind: 'overflow' as const };
      return null;
    }
    const exactHit = (() => {
      // stored == typed ?
      const sm = stored.m;
      const tn = typed.neg ? -typed.num : typed.num;
      // compare sm * 2^e * den with tn
      return stored.e >= 0 ? (sm << BigInt(stored.e)) * typed.den === tn : sm * typed.den === tn << BigInt(-stored.e);
    })();
    const err = errorDecimal(stored, typed.neg, typed.num, typed.den);
    const u = ulpExp!;
    const tn = typed.neg ? -typed.num : typed.num;
    // (stored - typed) / 2^u = stored.m * 2^(e-u) - tn / (den * 2^u)
    const N = u >= 0 ? (stored.m << BigInt(stored.e - u)) * typed.den * (1n << BigInt(u)) - tn : (stored.m << BigInt(stored.e - u)) * typed.den - (tn << BigInt(-u));
    const D = u >= 0 ? typed.den * (1n << BigInt(u)) : typed.den;
    const ulps = ratToNumber(N, D);
    const errNum = err ? err.value : ratToNumber(N, D) * 2 ** u;
    const typedNum = ratToNumber(tn, typed.den);
    return { kind: 'ok' as const, exactHit, errText: err?.text, errNum, ulps, rel: typedNum !== 0 ? errNum / typedNum : NaN, underflow: d.cls === 'zero' && typed.num !== 0n };
  }, [typed, bits, fmtName]); // eslint-disable-line react-hooks/exhaustive-deps

  const maxFinite = (BigInt(eAll - 1) << BigInt(fmt.fracBits)) | mask(fmt.fracBits);
  const presets: [string, bigint][] = [
    ['1', BigInt(fmt.bias) << BigInt(fmt.fracBits)],
    ['0.1', encodeParsed(parseReal('0.1')!, fmt)],
    ['−0', 1n << BigInt(fmt.bits - 1)],
    ['min subnormal', 1n],
    ['max subnormal', mask(fmt.fracBits)],
    ['min normal', 1n << BigInt(fmt.fracBits)],
    ['max finite', maxFinite],
    ['∞', BigInt(eAll) << BigInt(fmt.fracBits)],
    ['NaN', (BigInt(eAll) << BigInt(fmt.fracBits)) | (1n << BigInt(fmt.fracBits - 1))],
  ];

  return (
    <div className="space-y-3">
      {formats.length > 1 && (
        <Segmented
          label="Format"
          value={fmtName}
          onChange={changeFormat}
          options={formats.map((f) => ({ value: f, label: `${f} (${FORMATS[f].bits}-bit)` }))}
        />
      )}
      <BitRow
        value={bits}
        width={fmt.bits}
        onToggle={(i) => setBits(bits ^ (1n << BigInt(i)))}
        color={(i) => FIELD_COLORS[fieldOf(i)]}
        below={(i) => fieldOf(i)}
        label={`${fmt.name} pattern; click a bit to flip it`}
      />
      <div className="grid gap-2 text-[13px] sm:grid-cols-[auto_auto_1fr]">
        <FieldBox color={FIELD_COLORS.s} name="sign s" bitsText={String(d.s)} value={d.s ? 'negative' : 'positive'} />
        <FieldBox color={FIELD_COLORS.e} name={`exponent E (${fmt.expBits} bits)`} bitsText={bin(BigInt(d.E), fmt.expBits)} value={`= ${d.E}${d.cls === 'normal' ? `, so e = E − ${fmt.bias} = ${dec(d.E - fmt.bias)}` : d.E === 0 ? ' (special: zero or subnormal)' : ' (all ones: ∞ or NaN)'}`} />
        <FieldBox color={FIELD_COLORS.f} name={`fraction F (${fmt.fracBits} bits)`} bitsText={bin(d.F, fmt.fracBits)} value={`= ${d.F}`} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 overflow-x-auto rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-[15px] sm:text-base">
        {formula.map((t, i) => (
          <Tex key={i}>{t}</Tex>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Hex" value={hex(bits, fmt.bits)} />
        <Readout label="Kind" value={clsLabel} />
        <Readout label="Shortest decimal" value={shortestDecimal(bits, fmt)} />
        <Readout label="ulp here" value={ulpExp === null ? '—' : pow2(ulpExp)} />
      </div>
      <Out label="Exact stored value">{exact}</Out>
      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Field label="Type a decimal (0.1, −6.5, 1e10, 2^-130, 1/3, inf, nan)" value={text} onChange={onText} error={text.trim() && !parseReal(text) ? 'Not a number this field understands' : null} />
      </div>
      {typedInfo?.kind === 'overflow' && <Note tone="warn">Too large for {fmt.name}: anything at or beyond the largest finite value plus half an ulp rounds to infinity.</Note>}
      {typedInfo?.kind === 'ok' &&
        (typedInfo.exactHit ? (
          <Note tone="good">{text.trim()} is exactly representable in {fmt.name}: no rounding error.</Note>
        ) : (
          <div className="space-y-2">
            <Note tone={typedInfo.underflow ? 'warn' : 'info'}>
              {typedInfo.underflow ? `Underflow: ${text.trim()} is below half the smallest subnormal and rounds to zero. ` : ''}
              {text.trim()} has no exact {fmt.name} form; it is stored as the nearest representable value (round to nearest, ties to even). The error is {sci(typedInfo.ulps, 3)} ulp, never more than ½ ulp in size.
            </Note>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr]">
              <Out label="Rounding error (stored − typed)">{typedInfo.errText ?? `≈ ${sci(typedInfo.errNum, 6)}`}</Out>
              <Readout label="Relative error" value={sci(typedInfo.rel, 4)} />
            </div>
          </div>
        ))}
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setBits(down)} disabled={down === bits} title="Next representable number towards −∞">
          ◀ previous
        </Button>
        <Button onClick={() => setBits(up)} disabled={up === bits} title="Next representable number towards +∞">
          next ▶
        </Button>
        <span className="text-[12.5px] text-ink-2">
          gap below: <span className="font-mono">{gap(bits, down)}</span> · gap above: <span className="font-mono">{gap(up, bits)}</span>
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map(([label, b]) => (
          <Button key={label} onClick={() => setBits(b)}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function FieldBox({ color, name, bitsText, value }: { color: string; name: string; bitsText: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border px-3 py-1.5" style={{ borderColor: color, background: tint(color, 8) }}>
      <div className="text-[11px] uppercase tracking-wide" style={{ color }}>
        {name}
      </div>
      <div className="break-all font-mono text-[12.5px]">{bitsText}</div>
      <div className="text-[12px] text-ink-2">{value}</div>
    </div>
  );
}

// ======================================================================= endian mode

const BYTE_COLORS = ['var(--plot-1)', 'var(--plot-2)', 'var(--plot-3)', 'var(--plot-4)', 'var(--plot-5)', 'var(--plot-6)', 'var(--plot-1)', 'var(--plot-2)'];

function EndianMode({ params }: { params: Record<string, unknown> }) {
  const w0 = num(params, 'endianWidth', 32);
  if (![16, 32, 64].includes(w0)) throw new Error(`parameter "endianWidth" should be 16, 32 or 64, got ${w0}`);
  const base = num(params, 'base', 100);
  if (!Number.isInteger(base) || base < 0) throw new Error('parameter "base" should be a non-negative integer');
  const v0 = intParam(params, 'value', 0x01234567n);
  const [n, setN] = useState(w0);
  const [text, setText] = useState(() => (typeof params.value === 'string' ? params.value : hex(wrap(v0, w0), w0)));
  const [showMisread, setShowMisread] = useState(true);
  const parsed = parseIntLiteral(text);
  const v = wrap(parsed ?? 0n, n);
  const nb = n / 8;
  const byte = (k: number) => Number((v >> BigInt(8 * k)) & 0xffn); // k = 0 is least significant
  const hx = (b: number) => b.toString(16).toUpperCase().padStart(2, '0');
  const le = [...Array(nb).keys()]; // address offset i holds byte i
  const be = le.map((i) => nb - 1 - i);
  let swapped = 0n;
  for (let k = 0; k < nb; k++) swapped |= BigInt(byte(k)) << BigInt(8 * (nb - 1 - k));
  const sig = (k: number) => (k === nb - 1 ? 'MSB' : k === 0 ? 'LSB' : `byte ${k}`);

  const presets: [string, string, number][] = [
    ['0x01234567', '0x01234567', 32],
    ['0x1234', '0x1234', 16],
    ['−1', '-1', 32],
    ['1.0f = 0x3F800000', '0x3F800000', 32],
    ['1.0 (double)', '0x3FF0000000000000', 64],
    ['0x0102030405060708', '0x0102030405060708', 64],
  ];

  const strip = (title: string, order: number[]) => (
    <div>
      <div className="mb-1 text-[13px] text-ink-2">{title}</div>
      <div className="flex flex-wrap gap-1">
        {order.map((k, i) => (
          <div key={i} className="flex w-[52px] flex-col items-center sm:w-16">
            <span className="text-[10px] tabular-nums text-ink-3">{base + i}</span>
            <span className="w-full rounded-md border py-1.5 text-center font-mono text-sm font-semibold" style={{ borderColor: BYTE_COLORS[k], background: tint(BYTE_COLORS[k], 18) }}>
              {hx(byte(k))}
            </span>
            <span className="text-[10px] text-ink-3">{sig(k)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
        <Segmented label="Width" value={String(n)} onChange={(x) => setN(+x)} options={[16, 32, 64].map((w) => ({ value: String(w), label: `${w} bits (${w / 8} bytes)` }))} />
      </div>
      <div className="max-w-sm">
        <Field label="Value (hex 0x…, or decimal; negatives use two's complement)" value={text} onChange={setText} error={parsed === null ? 'Not an integer literal' : parsed > mask(n) || parsed < -(1n << BigInt(n - 1)) ? `Too wide for ${n} bits; keeping the low ${n} bits` : null} />
      </div>
      <div>
        <div className="mb-1 text-[13px] text-ink-2">The value, most significant byte first (as you write it)</div>
        <div className="flex flex-wrap items-center gap-1 font-mono text-sm">
          <span className="text-ink-3">0x</span>
          {[...Array(nb).keys()].reverse().map((k) => (
            <span key={k} className="rounded px-1.5 py-0.5 font-semibold" style={{ background: tint(BYTE_COLORS[k], 22) }}>
              {hx(byte(k))}
            </span>
          ))}
          <span className="ml-2 font-sans text-[12.5px] text-ink-2">= {dec(v)}{v >> BigInt(n - 1) ? ` (signed ${dec(toSigned(v, n))})` : ''}</span>
        </div>
      </div>
      {strip(`Little-endian (x86, ARM, RISC-V): least significant byte at the lowest address`, le)}
      {strip(`Big-endian (network byte order): most significant byte at the lowest address`, be)}
      <Toggle label="Show what goes wrong if the other machine reads these bytes" checked={showMisread} onChange={setShowMisread} />
      {showMisread && (
        <Note tone="warn">
          A big-endian reader that loads the little-endian bytes ({le.map((k) => hx(byte(k))).join(' ')}) gets {hex(swapped, n)} = {dec(swapped)}
          {swapped === v ? ', which happens to be the same value: the bytes form a palindrome.' : ', not ' + hex(v, n) + '. This is why htonl and ntohl exist.'}
        </Note>
      )}
      <div className="flex flex-wrap gap-1.5">
        {presets.map(([label, t, w]) => (
          <Button
            key={label}
            onClick={() => {
              setN(w);
              setText(t);
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
