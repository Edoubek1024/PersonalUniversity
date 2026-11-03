/**
 * euclid: the Euclidean and extended Euclidean algorithm as a step-through table (quotients,
 * remainders and Bézout coefficients), modular inverses with a "clock" picture of Z_n under
 * multiplication by a, and fast modular exponentiation by square-and-multiply.
 *
 * Params:
 *   mode    "gcd" | "inverse" | "power"   starting mode                       default "gcd"
 *   modes   string[]  modes offered as tabs                                    default [mode]
 *   a       number    first number (all modes)                                 default 252
 *   b       number    second number (gcd mode)                                 default 198
 *   n       number    modulus (inverse and power modes)                        default 7 (inverse), 13 (power)
 *   k       number    exponent (power mode)                                    default 1000
 *   units   boolean   clock shows only the units of Z_n at first               default false
 *   clock   boolean   show the clock picture in inverse mode                   default true
 *   title   string                                              default "Euclid's algorithm"
 *   caption string
 * Numbers may also be given as strings of digits for values above 2^53.
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Note, Readout, Segmented, Tex, Toggle } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { bmod, euclidTable, gcdBig, modpow, parseNat, phi, powTable, show, type EuclidRow } from '../kit/discrete-number';

type Mode = 'gcd' | 'inverse' | 'power';
const MODES: readonly Mode[] = ['gcd', 'inverse', 'power'];
const LABEL: Record<Mode, string> = { gcd: 'gcd and Bézout', inverse: 'Inverse mod n', power: 'Fast powers' };

function natParam(p: Record<string, unknown>, key: string, def: number): string {
  const v = p[key];
  if (v === undefined) return String(def);
  if (typeof v === 'number' && Number.isInteger(v) && v >= 0) return String(v);
  if (typeof v === 'string' && /^\d+$/.test(v)) return v;
  throw new Error(`parameter "${key}" should be a whole number ≥ 0, got ${JSON.stringify(v)}`);
}

export default function Euclid({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'gcd');
  const modes = strArray(params, 'modes', [mode0]) as Mode[];
  for (const m of modes) if (!MODES.includes(m)) throw new Error(`parameter "modes" may contain only ${MODES.join(', ')}`);
  const [mode, setMode] = useState<Mode>(mode0);
  const [a, setA] = useState(() => natParam(params, 'a', mode0 === 'power' ? 7 : mode0 === 'inverse' ? 3 : 252));
  const [b, setB] = useState(() => natParam(params, 'b', 198));
  const [n, setN] = useState(() => natParam(params, 'n', mode0 === 'power' ? 13 : 7));
  const [k, setK] = useState(() => natParam(params, 'k', 1000));
  const [units, setUnits] = useState(() => bool(params, 'units', false));
  const showClock = bool(params, 'clock', true);

  return (
    <Frame title={str(params, 'title', "Euclid's algorithm")} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m, label: LABEL[m] }))} value={mode} onChange={setMode} />}
      {mode === 'gcd' && <GcdMode a={a} b={b} setA={setA} setB={setB} />}
      {mode === 'inverse' && <InverseMode a={a} n={n} setA={setA} setN={setN} units={units} setUnits={setUnits} showClock={showClock} />}
      {mode === 'power' && <PowerMode a={a} k={k} n={n} setA={setA} setK={setK} setN={setN} />}
    </Frame>
  );
}

function NumField({ label, value, onChange, error }: { label: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1 block text-[13px] text-ink-2">{label}</span>
      <input type="text" inputMode="numeric" className="input font-mono text-[13px]" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} spellCheck={false} autoComplete="off" />
      {error && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{error}</span>}
    </label>
  );
}

function Stepper({ shown, total, setShown, min }: { shown: number; total: number; setShown: (n: number) => void; min: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button primary onClick={() => setShown(Math.min(total, shown + 1))} disabled={shown >= total}>
        Step
      </Button>
      <Button onClick={() => setShown(total)} disabled={shown >= total}>
        Show all
      </Button>
      <Button onClick={() => setShown(min)} disabled={shown <= min}>
        Reset
      </Button>
      <span className="font-mono text-xs text-ink-3">
        {shown - min} / {total - min} steps
      </span>
    </div>
  );
}

function EuclidTableView({ rows, shown, aName, bName, hi, av, bv }: { rows: EuclidRow[]; shown: number; aName: string; bName: string; hi?: number; av: bigint; bv: bigint }) {
  return (
    <div className="max-h-80 overflow-auto rounded-lg border border-line">
      <table className="my-0 w-full border-collapse font-mono text-[13px] tabular-nums">
        <thead className="sticky top-0 bg-surface-2 text-ink-2">
          <tr>
            {['i', 'r_i', 'q_i', 's_i', 't_i', `s_i\\,${aName} + t_i\\,${bName}`].map((h) => (
              <th key={h} className="whitespace-nowrap border-b border-line px-2.5 py-1.5 text-right font-normal">
                <Tex>{h}</Tex>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, shown).map((r, j) => {
            const isG = shown === rows.length && j === rows.length - 2;
            return (
              <tr key={r.i} className={isG ? 'bg-emerald-500/15' : j === hi ? 'bg-accent/15' : ''}>
                <td className="px-2.5 py-1 text-right text-ink-3">{r.i}</td>
                <td className="px-2.5 py-1 text-right font-semibold">{show(r.r)}</td>
                <td className="px-2.5 py-1 text-right">{r.q !== undefined && j < shown - 1 ? show(r.q) : ''}</td>
                <td className="px-2.5 py-1 text-right">{show(r.s)}</td>
                <td className="px-2.5 py-1 text-right">{show(r.t)}</td>
                <td className="px-2.5 py-1 text-right text-ink-3">{show(r.s * av + r.t * bv)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GcdMode({ a, b, setA, setB }: { a: string; b: string; setA: (v: string) => void; setB: (v: string) => void }) {
  const pa = parseNat(a, 'a');
  const pb = parseNat(b, 'b');
  const ok = pa.v !== undefined && pb.v !== undefined && !(pa.v === 0n && pb.v === 0n);
  const rows = useMemo(() => (ok ? euclidTable(pa.v!, pb.v!) : []), [a, b, ok]); // eslint-disable-line react-hooks/exhaustive-deps
  const [state, setState] = useState({ key: '', shown: 2 });
  const key = `${a}|${b}`;
  const shown = state.key === key ? Math.min(state.shown, rows.length) : Math.min(2, rows.length);
  const setShown = (s: number) => setState({ key, shown: s });
  const done = ok && shown === rows.length;
  const g = rows.length >= 2 ? rows[rows.length - 2] : rows[0];
  const latest = shown >= 3 ? rows[shown - 1] : null;
  const prev = latest ? rows[shown - 2] : null;
  const prev2 = latest ? rows[shown - 3] : null;
  const steps = rows.length - 2;
  const lame = ok && pb.v! > 0n ? Math.log(Number(pb.v!)) / Math.log((1 + Math.sqrt(5)) / 2) : 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <NumField label="a" value={a} onChange={setA} error={pa.error} />
        <NumField label="b" value={b} onChange={setB} error={pb.error} />
      </div>
      {pa.v === 0n && pb.v === 0n && <Note tone="warn">gcd(0, 0) is not defined: every integer divides 0.</Note>}
      {ok && (
        <>
          <Stepper shown={shown} total={rows.length} setShown={setShown} min={Math.min(2, rows.length)} />
          <EuclidTableView rows={rows} shown={shown} aName="a" bName="b" hi={shown - 1} av={pa.v!} bv={pb.v!} />
          {latest && prev && prev2 && (
            <div className="space-y-1 text-[13px] text-ink-2">
              <div>
                Divide: <Tex>{`${show(prev2.r)} = ${show(prev.q!)} \\cdot ${show(prev.r)} + ${show(latest.r)}`}</Tex>, so <Tex>{`r_{${latest.i}} = ${show(latest.r)}`}</Tex>
                {latest.r === 0n ? ' and the algorithm stops.' : '.'}
              </div>
              <div>
                Carry the coefficients with the same quotient:{' '}
                <Tex>{`s_{${latest.i}} = ${show(prev2.s)} - ${show(prev.q!)}\\cdot(${show(prev.s)}) = ${show(latest.s)},\\; t_{${latest.i}} = ${show(prev2.t)} - ${show(prev.q!)}\\cdot(${show(prev.t)}) = ${show(latest.t)}`}</Tex>
              </div>
            </div>
          )}
          {shown === 2 && rows.length > 2 && <div className="text-[13px] text-ink-2">Rows 0 and 1 hold a and b, written as 1·a + 0·b and 0·a + 1·b. Press Step to divide.</div>}
          {done && (
            <Note tone="good">
              The last nonzero remainder is <b>gcd({show(pa.v!)}, {show(pb.v!)}) = {show(g.r)}</b>, and its row gives Bézout:{' '}
              <Tex>{`${show(g.r)} = (${show(g.s)})\\cdot ${show(pa.v!)} + (${show(g.t)})\\cdot ${show(pb.v!)}`}</Tex>. {steps} division step{steps === 1 ? '' : 's'}
              {pb.v! > 1n ? ` (Lamé: about log_φ b ≈ ${lame.toFixed(1)} at most).` : '.'}
            </Note>
          )}
          <div className="grid grid-cols-3 gap-2">
            <Readout label="gcd" value={done ? show(g.r) : '…'} tone="var(--plot-3)" />
            <Readout label="x" value={done ? show(g.s) : '…'} />
            <Readout label="y" value={done ? show(g.t) : '…'} />
          </div>
        </>
      )}
    </div>
  );
}

function InverseMode({ a, n, setA, setN, units, setUnits, showClock }: { a: string; n: string; setA: (v: string) => void; setN: (v: string) => void; units: boolean; setUnits: (v: boolean) => void; showClock: boolean }) {
  const pa = parseNat(a, 'a');
  const pn = parseNat(n, 'n');
  const nErr = pn.error ?? (pn.v !== undefined && pn.v < 2n ? 'n should be at least 2' : undefined);
  const ok = pa.v !== undefined && pn.v !== undefined && !nErr;
  const ar = ok ? bmod(pa.v!, pn.v!) : 0n;
  const rows = useMemo(() => (ok ? euclidTable(ar, pn.v!) : []), [ok, ar, n]); // eslint-disable-line react-hooks/exhaustive-deps
  const g = rows.length >= 2 ? rows[rows.length - 2] : rows[0];
  const inv = ok && g && g.r === 1n ? bmod(g.s, pn.v!) : null;
  const nn = ok && pn.v! <= 40n ? Number(pn.v!) : 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <NumField label="a" value={a} onChange={setA} error={pa.error} />
        <NumField label="n (modulus)" value={n} onChange={setN} error={nErr} />
      </div>
      {ok && (
        <>
          {inv !== null ? (
            <Note tone="good">
              <Tex>{`\\gcd(${show(ar)}, ${show(pn.v!)}) = 1`}</Tex>, and Bézout gives <Tex>{`(${show(g.s)})\\cdot ${show(ar)} + (${show(g.t)})\\cdot ${show(pn.v!)} = 1`}</Tex>. Reduce the coefficient of a mod n: <Tex>{`${show(ar)}^{-1} \\equiv ${show(inv)} \\pmod{${show(pn.v!)}}`}</Tex>. Check: <Tex>{`${show(ar)} \\cdot ${show(inv)} = ${show(ar * inv)} = ${show((ar * inv) / pn.v!)}\\cdot ${show(pn.v!)} + 1`}</Tex>.
            </Note>
          ) : (
            <Note tone="warn">
              <Tex>{`\\gcd(${show(ar)}, ${show(pn.v!)}) = ${show(g.r)} \\ne 1`}</Tex>, so {show(ar)} has no inverse mod {show(pn.v!)}. Cancellation fails too:{' '}
              <Tex>{`${show(ar)} \\cdot ${show(pn.v! / g.r)} \\equiv 0 \\equiv ${show(ar)} \\cdot 0 \\pmod{${show(pn.v!)}}`}</Tex> although <Tex>{`${show(pn.v! / g.r)} \\not\\equiv 0`}</Tex>.
            </Note>
          )}
          <details className="text-[13px] text-ink-2">
            <summary className="cursor-pointer select-none">Extended Euclid table for ({show(ar)}, {show(pn.v!)})</summary>
            <div className="mt-2">
              <EuclidTableView rows={rows} shown={rows.length} aName="a" bName="n" av={ar} bv={pn.v!} />
            </div>
          </details>
          {showClock && nn > 0 && <Clock a={Number(ar)} n={nn} units={units} setUnits={setUnits} />}
          {showClock && nn === 0 && <div className="text-xs text-ink-3">The clock picture is drawn for n ≤ 40.</div>}
        </>
      )}
    </div>
  );
}

function Clock({ a, n, units, setUnits }: { a: number; n: number; units: boolean; setUnits: (v: boolean) => void }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.min(size.width || 340, 380);
  const H = W;
  const cx = W / 2;
  const cy = H / 2;
  const rad = W / 2 - 30;
  const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : x);
  const isUnit = (x: number) => gcd(x, n) === 1;
  const dom = [...Array(n).keys()].filter((x) => !units || isUnit(x));
  const img = dom.map((x) => (a * x) % n);
  const hits = Array(n).fill(0);
  img.forEach((y) => hits[y]++);
  const perm = dom.every((x) => hits[x] === 1);
  const pt = (x: number, r = rad): [number, number] => {
    const t = -Math.PI / 2 + (2 * Math.PI * x) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  };
  const ph = phi(n);
  const unitA = isUnit(a);
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-[13px] text-ink-2">
          Arrows: <Tex>{`x \\mapsto ${a}x \\bmod ${n}`}</Tex> on <Tex>{units ? `\\mathbb{Z}_{${n}}^*` : `\\mathbb{Z}_{${n}}`}</Tex>
        </div>
        <Toggle label={`Only the units (φ(${n}) = ${ph})`} checked={units} onChange={setUnits} />
      </div>
      <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
        <div ref={ref} className="mx-auto w-full max-w-[380px]">
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block" role="img" aria-label={`Multiplication by ${a} on the integers mod ${n}`}>
            <circle cx={cx} cy={cy} r={rad} fill="none" stroke="var(--plot-grid)" strokeWidth={1.5} />
            {dom.map((x, i) => {
              const y = img[i];
              if (x === y) {
                const [px, py] = pt(x, rad - 10);
                return <circle key={x} cx={px} cy={py} r={6} fill="none" stroke="var(--plot-1)" strokeWidth={1.5} opacity={0.8} />;
              }
              const [x1, y1] = pt(x);
              const [x2, y2] = pt(y);
              const len = Math.hypot(x2 - x1, y2 - y1);
              const ux = (x2 - x1) / len;
              const uy = (y2 - y1) / len;
              const ex = x2 - ux * 8;
              const ey = y2 - uy * 8;
              const bad = hits[y] > 1;
              const c = bad ? 'var(--plot-2)' : 'var(--plot-1)';
              return (
                <g key={x} opacity={0.75}>
                  <line x1={x1 + ux * 6} y1={y1 + uy * 6} x2={ex - ux * 5} y2={ey - uy * 5} stroke={c} strokeWidth={1.4} />
                  <polygon points={`${ex},${ey} ${ex - ux * 7 - uy * 3.5},${ey - uy * 7 + ux * 3.5} ${ex - ux * 7 + uy * 3.5},${ey - uy * 7 - ux * 3.5}`} fill={c} />
                </g>
              );
            })}
            {[...Array(n).keys()].map((x) => {
              const [px, py] = pt(x);
              const [lx, ly] = pt(x, rad + 16);
              const inDom = !units || isUnit(x);
              const h = hits[x];
              const fill = !inDom ? 'var(--color-surface-2)' : h === 0 ? 'var(--color-surface)' : h > 1 ? 'var(--plot-2)' : 'var(--plot-1)';
              return (
                <g key={x} opacity={inDom ? 1 : 0.35}>
                  <circle cx={px} cy={py} r={5.5} fill={fill} stroke={h === 0 && inDom ? 'var(--plot-2)' : 'var(--plot-axis)'} strokeWidth={1.25} strokeDasharray={h === 0 && inDom ? '2 2' : undefined} />
                  <text x={lx} y={ly + 4} textAnchor="middle" fontSize={n > 24 ? 9.5 : 11.5} fill="var(--plot-text)">
                    {x}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          <Readout label={`×${a} a permutation?`} value={perm ? 'yes: every point is hit once' : 'no'} tone={perm ? 'var(--plot-3)' : 'var(--plot-2)'} />
          {!perm && <div className="text-xs text-ink-2">Red points are hit more than once; dashed points are never hit.</div>}
          {unitA ? (
            <Readout label={`${a}^φ(${n}) mod ${n}`} value={`${a}^${ph} ≡ ${modpow(BigInt(a), BigInt(ph), BigInt(n))}`} />
          ) : (
            <Readout label="gcd(a, n)" value={`${gcdBig(BigInt(a), BigInt(n))} ≠ 1`} tone="var(--plot-2)" />
          )}
        </div>
      </div>
    </div>
  );
}

function PowerMode({ a, k, n, setA, setK, setN }: { a: string; k: string; n: string; setA: (v: string) => void; setK: (v: string) => void; setN: (v: string) => void }) {
  const pa = parseNat(a, 'a');
  const pk = parseNat(k, 'k');
  const pn = parseNat(n, 'n');
  const nErr = pn.error ?? (pn.v !== undefined && pn.v < 2n ? 'n should be at least 2' : undefined);
  const ok = pa.v !== undefined && pk.v !== undefined && pn.v !== undefined && !nErr;
  const T = useMemo(() => (ok ? powTable(pa.v!, pk.v!, pn.v!) : null), [a, k, n, ok]); // eslint-disable-line react-hooks/exhaustive-deps
  const key = `${a}|${k}|${n}`;
  const [state, setState] = useState({ key: '', shown: 0 });
  const total = T?.rows.length ?? 0;
  const shown = state.key === key ? Math.min(state.shown, total) : 0;
  const setShown = (s: number) => setState({ key, shown: s });
  const done = ok && shown === total;
  const bits = ok ? pk.v!.toString(2) : '';
  const check = ok ? modpow(pa.v!, pk.v!, pn.v!) : 0n;
  const small = ok && pn.v! <= 10n ** 7n;
  const ph = small ? BigInt(phi(Number(pn.v!))) : 0n;
  const coprime = ok && gcdBig(pa.v!, pn.v!) === 1n;
  const cur = shown > 0 && T ? T.rows[shown - 1] : null;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <NumField label="a (base)" value={a} onChange={setA} error={pa.error} />
        <NumField label="k (exponent)" value={k} onChange={setK} error={pk.error} />
        <NumField label="n (modulus)" value={n} onChange={setN} error={nErr} />
      </div>
      {ok && T && (
        <>
          <div className="text-[13px] text-ink-2">
            <Tex>{`k = ${show(pk.v!)} = ${bits}_2`}</Tex>: {bits.length} bits, so {Math.max(0, bits.length - 1)} squarings plus one multiplication per extra 1-bit, instead of {show(pk.v! > 0n ? pk.v! - 1n : 0n)} multiplications one at a time.
          </div>
          {total > 0 && <Stepper shown={shown} total={total} setShown={setShown} min={0} />}
          {total > 0 && (
            <div className="max-h-80 overflow-auto rounded-lg border border-line">
              <table className="my-0 w-full border-collapse font-mono text-[13px] tabular-nums">
                <thead className="sticky top-0 bg-surface-2 text-ink-2">
                  <tr>
                    {['i', '\\text{bit } k_i', `${show(pa.v!)}^{2^i} \\bmod ${show(pn.v!)}`, '\\text{result so far}'].map((h) => (
                      <th key={h} className="whitespace-nowrap border-b border-line px-2.5 py-1.5 text-right font-normal">
                        <Tex>{h}</Tex>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {T.rows.slice(0, shown).map((r, j) => (
                    <tr key={r.i} className={j === shown - 1 ? 'bg-accent/15' : ''}>
                      <td className="px-2.5 py-1 text-right text-ink-3">{r.i}</td>
                      <td className="px-2.5 py-1 text-right" style={{ color: r.bit ? 'var(--plot-3)' : 'var(--color-ink-3)' }}>
                        {r.bit}
                      </td>
                      <td className="px-2.5 py-1 text-right">{show(r.sq)}</td>
                      <td className="px-2.5 py-1 text-right font-semibold">{show(r.acc)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {cur && !done && (
            <div className="text-[13px] text-ink-2">
              Row {cur.i}: {cur.i === 0 ? <Tex>{`${show(pa.v!)}^{1} \\bmod ${show(pn.v!)} = ${show(cur.sq)}`}</Tex> : <>square the previous power: <Tex>{`${show(T.rows[cur.i - 1].sq)}^2 \\bmod ${show(pn.v!)} = ${show(cur.sq)}`}</Tex></>}
              {cur.bit ? <>; bit is 1, so multiply it into the result: {show(cur.acc)}.</> : '; bit is 0, so the result is unchanged.'}
            </div>
          )}
          {(done || total === 0) && (
            <Note tone="good">
              <Tex>{`${show(pa.v!)}^{${show(pk.v!)}} \\equiv ${show(T.result)} \\pmod{${show(pn.v!)}}`}</Tex> using {T.squarings} squarings and {T.multiplies} multiplications{check === T.result ? '' : ' (MISMATCH with check!)'}.
              {coprime && small && ph > 0n && pk.v! >= ph && (
                <>
                  {' '}
                  Euler's theorem agrees: <Tex>{`\\varphi(${show(pn.v!)}) = ${show(ph)}`}</Tex> and <Tex>{`${show(pk.v!)} \\bmod ${show(ph)} = ${show(pk.v! % ph)}`}</Tex>, so the answer is <Tex>{`${show(pa.v!)}^{${show(pk.v! % ph)}} \\bmod ${show(pn.v!)} = ${show(modpow(pa.v!, pk.v! % ph, pn.v!))}`}</Tex>.
                </>
              )}
            </Note>
          )}
        </>
      )}
    </div>
  );
}
