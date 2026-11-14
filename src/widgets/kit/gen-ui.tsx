/**
 * Small UI pieces shared by the genetics widgets: a labelled number field, a fraction formatter
 * and the colours used for classes (parental, recombinant, double crossover, ...).
 */
import { useId, useState, useEffect, type ReactNode } from 'react';
import { gcd } from './num';

export const GC = {
  a: 'var(--plot-1)',
  b: 'var(--plot-2)',
  c: 'var(--plot-3)',
  d: 'var(--plot-4)',
  e: 'var(--plot-5)',
  f: 'var(--plot-6)',
} as const;

export const SERIES = [GC.a, GC.c, GC.d, GC.b, GC.e, GC.f];

/** A compact number input with a visible label. Keeps the text while typing; reports valid numbers. */
export function NumField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  width = 'w-20',
}: {
  label: ReactNode;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  width?: string;
}) {
  const id = useId();
  const [text, setText] = useState(String(value));
  useEffect(() => {
    if (parseFloat(text) !== value) setText(String(value));
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <span className="inline-flex flex-col gap-0.5">
      <label htmlFor={id} className="text-[11px] leading-4 text-ink-3">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          const v = parseFloat(e.target.value);
          if (Number.isFinite(v) && v >= min && (max === undefined || v <= max)) onChange(v);
        }}
        className={`input ${width} px-2 py-1 font-mono text-[13px] tabular-nums`}
      />
    </span>
  );
}

/** Reduce integer weights to lowest terms, e.g. [6, 2] -> [3, 1]. */
export function lowestTerms(xs: number[]): number[] {
  const ints = xs.map((x) => Math.round(x));
  const g = ints.reduce((a, b) => gcd(a, b), 0) || 1;
  return ints.map((x) => x / g);
}

/** "3/16" in lowest terms. */
export function frac(num: number, den: number): string {
  if (num === 0) return '0';
  const g = gcd(Math.round(num), Math.round(den)) || 1;
  const d = Math.round(den) / g;
  return d === 1 ? `${Math.round(num) / g}` : `${Math.round(num) / g}/${d}`;
}

/** Roman numerals for pedigree generations. */
export function roman(n: number): string {
  const r: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of r) while (n >= v) {
    out += s;
    n -= v;
  }
  return out;
}

/** A small legend swatch. */
export function Swatch({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-2">
      <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: color }} />
      {children}
    </span>
  );
}
