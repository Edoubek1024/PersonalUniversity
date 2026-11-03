/**
 * hack-alu: the Nand2Tetris Hack ALU. Two 16-bit inputs, the six control bits as toggles, every
 * intermediate stage (after zx, nx, zy, ny, f, no) in binary and decimal, the outputs out, zr and
 * ng, and the 18 named functions of the official table: clicking one sets the bits, and the one
 * matching the current bits is highlighted.
 *
 * Params:
 *   x        number   initial x (−32768 … 65535; wrapped to 16 bits)   default 17
 *   y        number   initial y                                        default 5
 *   fn       string   initial function from the table, e.g. "x-y", "x|y", "!x"   default "x+y"
 *   hack     boolean  label inputs D and A/M and show the comp mnemonics (D+A, D-M, …)  default false
 *   title    string                                                    default "The Hack ALU"
 *   caption  string
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str } from '../kit/params';
import { Frame, Note, Readout } from '../kit/controls';
import { bin, hex, parseIntLiteral, wrap, dec } from '../kit/arch-bits';
import { Field, tint } from '../kit/arch-ui';
import { ALU_TABLE as TABLE, NAMES, alu, s16, type Bits } from '../kit/arch-hack';

const DESC: Record<(typeof NAMES)[number], [string, string]> = {
  zx: ['zero x', 'x = 0'],
  nx: ['negate x', 'x = !x'],
  zy: ['zero y', 'y = 0'],
  ny: ['negate y', 'y = !y'],
  f: ['function', '1: x+y · 0: x&y'],
  no: ['negate out', 'out = !out'],
};

export default function HackAlu({ params }: WidgetProps) {
  const hack = bool(params, 'hack', false);
  const x0 = num(params, 'x', 17);
  const y0 = num(params, 'y', 5);
  for (const [k, v] of [['x', x0], ['y', y0]] as const) if (!Number.isInteger(v) || v < -32768 || v > 65535) throw new Error(`parameter "${k}" should be an integer from −32768 to 65535, got ${v}`);
  const fn0 = str(params, 'fn', 'x+y');
  const row0 = TABLE.find((r) => r.fn === fn0);
  if (!row0) throw new Error(`parameter "fn" should be one of ${TABLE.map((r) => r.fn).join(' ')}, got "${fn0}"`);

  const [xText, setXText] = useState(String(x0));
  const [yText, setYText] = useState(String(y0));
  const [bits, setBits] = useState<Bits>(row0.bits);
  const xp = parseIntLiteral(xText);
  const yp = parseIntLiteral(yText);
  const x = Number(wrap(xp ?? 0n, 16));
  const y = Number(wrap(yp ?? 0n, 16));
  const r = alu(x, y, bits);
  const match = TABLE.find((t) => t.bits.every((b, i) => b === bits[i]));
  const X = hack ? 'D' : 'x';
  const Y = hack ? 'A/M' : 'y';
  const name = (t: (typeof TABLE)[number]) => (hack ? t.comp.replace('-', '−') : t.label);

  const rangeErr = (p: bigint | null) => (p === null ? 'Not an integer' : p < -32768n || p > 65535n ? 'Outside 16 bits; wrapped' : null);
  const stage = (label: string, v: number, active: boolean | null, note?: string) => (
    <div className={`grid grid-cols-[88px_1fr] items-baseline gap-x-3 sm:grid-cols-[120px_auto_1fr] ${active === false ? 'opacity-45' : ''}`}>
      <span className="text-right text-[12px] text-ink-2">{label}</span>
      <span className="font-mono text-[13px] tabular-nums" style={active ? { color: 'var(--color-ink)', fontWeight: 600 } : undefined}>
        {bin(BigInt(v), 16)}
      </span>
      <span className="col-start-2 font-mono text-[12px] tabular-nums text-ink-2 sm:col-start-3">
        = {dec(s16(v))}
        {note && <span className="ml-2 font-sans text-ink-3">{note}</span>}
      </span>
    </div>
  );

  return (
    <Frame title={str(params, 'title', 'The Hack ALU')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <Field label={hack ? 'x = D register' : 'x (16-bit, decimal or 0x…)'} value={xText} onChange={setXText} error={rangeErr(xp)} />
          <div className="mt-1 font-mono text-[12px] text-ink-3">{bin(BigInt(x), 16)}</div>
        </div>
        <div>
          <Field label={hack ? 'y = A register (a = 0) or M = RAM[A] (a = 1)' : 'y (16-bit, decimal or 0x…)'} value={yText} onChange={setYText} error={rangeErr(yp)} />
          <div className="mt-1 font-mono text-[12px] text-ink-3">{bin(BigInt(y), 16)}</div>
        </div>
      </div>

      <div>
        <div className="mb-1 text-[13px] text-ink-2">Control bits{hack ? ' (the c1…c6 bits of a C-instruction)' : ''}: click to toggle</div>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {NAMES.map((n, i) => (
            <button
              key={n}
              type="button"
              aria-pressed={bits[i] === 1}
              aria-label={`${n} (${DESC[n][0]}): ${bits[i]}`}
              onClick={() => setBits((b) => b.map((v, j) => (j === i ? 1 - v : v)) as Bits)}
              className="rounded-lg border px-2 py-1.5 text-left transition-colors hover:brightness-110"
              style={{ borderColor: bits[i] ? 'var(--color-accent)' : 'var(--color-line)', background: bits[i] ? tint('var(--color-accent)', 22) : 'var(--color-surface)' }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[13px] font-semibold">{n}</span>
                <span className="font-mono text-base font-bold" style={{ color: bits[i] ? 'var(--color-ink)' : 'var(--color-ink-3)' }}>
                  {bits[i]}
                </span>
              </div>
              <div className="text-[10.5px] leading-tight text-ink-3">{n === 'f' ? DESC[n][1] : `${DESC[n][1]}`}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-0.5 rounded-xl border border-line p-3">
        {stage(X, x, null)}
        {stage(`zx → ${X}`, r.x1, bits[0] === 1, bits[0] ? 'zeroed' : 'unchanged')}
        {stage(`nx → ${X}`, r.x2, bits[1] === 1, bits[1] ? 'bits flipped' : 'unchanged')}
        <div className="h-1.5" />
        {stage(Y, y, null)}
        {stage(`zy → ${Y}`, r.y1, bits[2] === 1, bits[2] ? 'zeroed' : 'unchanged')}
        {stage(`ny → ${Y}`, r.y2, bits[3] === 1, bits[3] ? 'bits flipped' : 'unchanged')}
        <div className="my-1 border-t border-line" />
        {stage(bits[4] ? `f=1: ${X} + ${Y}` : `f=0: ${X} & ${Y}`, r.fo, true, bits[4] ? 'sum mod 2¹⁶' : 'bitwise AND')}
        {stage(`no → out`, r.out, bits[5] === 1, bits[5] ? 'bits flipped' : 'unchanged')}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="out" value={dec(s16(r.out))} tone="var(--plot-1)" />
        <Readout label="out (hex)" value={hex(BigInt(r.out), 16)} />
        <Readout label="zr (out = 0)" value={r.zr} tone={r.zr ? 'var(--plot-3)' : undefined} />
        <Readout label="ng (out < 0)" value={r.ng} tone={r.ng ? 'var(--plot-2)' : undefined} />
      </div>

      {match ? (
        <Note tone="good">
          Bits {bits.join('')} are the table's row for <b>{name(match)}</b>
          {hack ? ` (x = D, y = A or M)` : ''}: {matchText(match, x, y)}
        </Note>
      ) : (
        <Note>Bits {bits.join('')} are not one of the 18 named rows. The ALU still computes something ({dec(s16(r.out))}); the designers simply did not need it.</Note>
      )}

      <div>
        <div className="mb-1 text-[13px] text-ink-2">The 18 functions of the Hack ALU (click one to set its control bits)</div>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
          {TABLE.map((t) => {
            const on = t === match;
            return (
              <button
                key={t.fn}
                type="button"
                aria-pressed={on}
                onClick={() => setBits(t.bits)}
                className="rounded-lg border px-1.5 py-1 text-center transition-colors hover:bg-surface-2"
                style={{ borderColor: on ? 'var(--plot-1)' : 'var(--color-line)', background: on ? tint('var(--plot-1)', 20) : undefined }}
              >
                <div className="font-mono text-[13px] font-semibold">{name(t)}</div>
                <div className="font-mono text-[10.5px] tracking-wider text-ink-3">{t.bits.join('')}</div>
              </button>
            );
          })}
        </div>
      </div>
    </Frame>
  );
}

function matchText(t: (typeof TABLE)[number], x: number, y: number): string {
  const sx = s16(x);
  const sy = s16(y);
  const expect = s16(t.f(sx, sy));
  const got = s16(alu(x, y, t.bits).out);
  const lhs = t.label.replace(/x/g, `(${dec(sx)})`).replace(/y/g, `(${dec(sy)})`).replace(/\((\d+)\)/g, '$1');
  return `${lhs} = ${dec(expect)} in 16-bit two's complement, and out = ${dec(got)} ${expect === got ? '✓' : '✗'}`;
}
