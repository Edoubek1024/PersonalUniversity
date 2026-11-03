/** Small numeric helpers shared by widgets. */

export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

export function linspace(a: number, b: number, n: number): number[] {
  if (n < 2) return [a];
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
}

/** A "nice" tick spacing (1, 2 or 5 times a power of ten) giving about `target` ticks over `span`. */
export function niceStep(span: number, target = 8): number {
  const raw = span / Math.max(1, target);
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const r = raw / mag;
  return (r < 1.5 ? 1 : r < 3 ? 2 : r < 7 ? 5 : 10) * mag;
}

/** Ticks that are multiples of `step` within [lo, hi]. */
export function ticks(lo: number, hi: number, step: number): number[] {
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + step * 1e-9; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  return out;
}

/**
 * Formats a number for display: up to `digits` significant decimals, trailing zeros trimmed,
 * a true minus sign, and no "-0".
 */
export function fmt(x: number, digits = 3): string {
  if (!Number.isFinite(x)) return Number.isNaN(x) ? 'undefined' : x > 0 ? '∞' : '−∞';
  if (Math.abs(x) < 1e-12) return '0';
  const abs = Math.abs(x);
  const s = abs >= 1e6 || abs < 1e-4 ? x.toExponential(Math.max(0, digits - 1)) : x.toFixed(Math.max(0, digits - Math.max(0, Math.floor(Math.log10(abs)))));
  const trimmed = s.includes('e') ? s.replace(/\.?0+e/, 'e') : s.includes('.') ? s.replace(/\.?0+$/, '') : s;
  return trimmed.replace(/^-/, '−');
}

/** Central-difference derivative. */
export function deriv(f: (x: number) => number, x: number, h = 1e-5): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** Composite Simpson's rule with n (made even) subintervals. */
export function simpson(f: (x: number) => number, a: number, b: number, n = 400): number {
  const m = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / m;
  let s = f(a) + f(b);
  for (let i = 1; i < m; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return (s * h) / 3;
}

/** Greatest common divisor of integers (non-negative result). */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
