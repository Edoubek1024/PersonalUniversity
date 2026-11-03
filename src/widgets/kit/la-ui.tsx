/**
 * Small UI pieces shared by the linear algebra widgets: TeX for numbers, vectors and matrices,
 * a text field that accepts numbers or fractions, and an editable matrix.
 */
import { useEffect, useId, useState, type ReactNode } from 'react';
import { fmt } from './num';
import { parseFrac } from './la-core';

/** A number for TeX: ASCII minus, at most `digits` significant decimals. */
export function texNum(x: number, digits = 3): string {
  const s = fmt(x, digits).replace(/−/g, '-');
  const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(s);
  return m ? `${m[1]}\\times10^{${Number(m[2])}}` : s;
}

/** Plain-text number with a true minus sign. */
export const num = (x: number, digits = 3) => fmt(x, digits);

export type Bracket = 'b' | 'p';

export function texMatrix(rows: (string | number)[][], bracket: Bracket = 'b', digits = 3): string {
  const env = bracket === 'p' ? 'pmatrix' : 'bmatrix';
  const body = rows.map((r) => r.map((x) => (typeof x === 'number' ? texNum(x, digits) : x)).join(' & ')).join(' \\\\ ');
  return `\\begin{${env}} ${body} \\end{${env}}`;
}

export const texVec = (v: number[], bracket: Bracket = 'b', digits = 3) => texMatrix(v.map((x) => [x]), bracket, digits);

/** A tuple such as (1, -2) in TeX. */
export const texTuple = (v: number[], digits = 3) => `(${v.map((x) => texNum(x, digits)).join(',\\ ')})`;

/**
 * A short direction for display: rescales a vector to small integers when it is close to a
 * multiple of one, such as (0.447, 0.894) to (1, 2); otherwise returns it unchanged.
 */
export function niceDir(v: number[]): number[] {
  const nz = v.filter((x) => Math.abs(x) > 1e-9);
  if (!nz.length) return v;
  const m0 = Math.min(...nz.map(Math.abs));
  const big = Math.max(...nz.map(Math.abs));
  for (let k = 1; k <= 6; k++) {
    const r = v.map((x) => (x / m0) * k);
    if (r.every((x) => Math.abs(x - Math.round(x)) < 2e-3 * (big / m0) * k) && Math.max(...r.map(Math.abs)) <= 12) return r.map((x) => Math.round(x) || 0);
  }
  return v;
}

/** A text field holding a number. Accepts decimals and fractions such as 3/2; keeps the draft while typing. */
export function NumberField({ label, value, onChange, width = 'w-16', disabled, srLabel }: { label?: ReactNode; value: number; onChange: (v: number) => void; width?: string; disabled?: boolean; srLabel?: string }) {
  const id = useId();
  const [draft, setDraft] = useState(fmt(value, 4).replace(/−/g, '-'));
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    if (!focus) setDraft(fmt(value, 4).replace(/−/g, '-'));
  }, [value, focus]);
  const bad = parseFrac(draft) === null;
  return (
    <span className="inline-flex items-center gap-1">
      {label && (
        <label htmlFor={id} className="text-[13px] text-ink-2">
          {label}
        </label>
      )}
      <input
        id={id}
        aria-label={srLabel}
        value={draft}
        disabled={disabled}
        inputMode="decimal"
        spellCheck={false}
        autoComplete="off"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          setDraft(e.target.value);
          const f = parseFrac(e.target.value);
          if (f) onChange(Number(f.n) / Number(f.d));
        }}
        onKeyDown={(e) => {
          if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
          e.preventDefault();
          const d = (e.key === 'ArrowUp' ? 1 : -1) * (e.shiftKey ? 1 : 0.1);
          const v = Math.round((value + d) * 1000) / 1000;
          setDraft(fmt(v, 4).replace(/−/g, '-'));
          onChange(v);
        }}
        className={`${width} rounded-md border bg-surface px-1.5 py-1 text-center font-mono text-[13px] tabular-nums text-ink outline-none focus:border-accent ${bad ? 'border-rose-500' : 'border-line'} disabled:opacity-60`}
      />
    </span>
  );
}

/** A matrix of NumberFields between brackets. `onChange(i, j, v)` is called per entry. */
export function MatrixEditor({
  A,
  onChange,
  name,
  colors,
  readOnly,
  label,
}: {
  A: number[][];
  onChange: (i: number, j: number, v: number) => void;
  name?: string;
  /** Optional colour per column (e.g. to match the arrows of the columns). */
  colors?: (string | undefined)[];
  /** readOnly[i][j] true makes that entry display-only. */
  readOnly?: boolean[][];
  label?: ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      {label ?? (name && <span className="font-serif text-base italic text-ink">{name} =</span>)}
      <div className="relative px-2 py-1">
        <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 rounded-l border-y-2 border-l-2 border-ink-2" />
        <span aria-hidden className="absolute inset-y-0 right-0 w-1.5 rounded-r border-y-2 border-r-2 border-ink-2" />
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${A[0].length}, auto)` }}>
          {A.map((row, i) =>
            row.map((v, j) => (
              <span key={`${i}-${j}`} style={colors?.[j] ? { borderBottom: `2px solid ${colors[j]}`, paddingBottom: 1 } : undefined}>
                <NumberField value={v} srLabel={`${name ?? 'matrix'} entry row ${i + 1} column ${j + 1}`} onChange={(x) => onChange(i, j, x)} disabled={readOnly?.[i]?.[j]} width="w-14" />
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

/** Formats a possibly complex eigenvalue. */
export function texComplex(re: number, im: number, digits = 3): string {
  if (Math.abs(im) < 1e-10) return texNum(re, digits);
  const r = Math.abs(re) < 1e-10 ? '' : texNum(re, digits);
  const i = Math.abs(Math.abs(im) - 1) < 1e-10 ? 'i' : `${texNum(Math.abs(im), digits)}i`;
  return r ? `${r} ${im < 0 ? '-' : '+'} ${i}` : `${im < 0 ? '-' : ''}${i}`;
}
