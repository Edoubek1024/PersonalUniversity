/**
 * Numerical helpers for the Calculus II widgets: an expression compiler that also understands
 * factorials (n!, (2n)!), robust quadrature for finite and infinite intervals, readable exact
 * fractions, and a parameter reader that accepts "2*pi" as well as numbers.
 */
import { compile, parseExpr, type ExprNode } from './expr';

const FACT: number[] = [1];
for (let i = 1; i <= 170; i++) FACT[i] = FACT[i - 1] * i;

/** Lanczos approximation of the gamma function (g = 7, 9 terms). */
function gamma(x: number): number {
  if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  x -= 1;
  let a = c[0];
  const t = x + g + 0.5;
  for (let i = 1; i < 9; i++) a += c[i] / (x + i);
  return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
}

/** x! for integers 0..170 exactly, Gamma(x + 1) otherwise; Infinity beyond 170. */
export function factorial(x: number): number {
  if (Number.isInteger(x)) return x < 0 ? NaN : x > 170 ? Infinity : FACT[x];
  return gamma(x + 1);
}

/** Splits "X!" occurrences out of the source, replacing each by a placeholder name. */
function extractFactorials(src: string): { src: string; parts: string[] } {
  const parts: string[] = [];
  let s = src;
  for (let guard = 0; guard < 20; guard++) {
    const i = s.indexOf('!');
    if (i === -1) break;
    let j = i - 1;
    while (j >= 0 && s[j] === ' ') j--;
    let start: number;
    if (s[j] === ')') {
      let depth = 0;
      start = j;
      for (; start >= 0; start--) {
        if (s[start] === ')') depth++;
        else if (s[start] === '(') {
          depth--;
          if (depth === 0) break;
        }
      }
      if (start < 0) throw new Error('unbalanced parentheses before "!"');
      // A function call such as sqrt(n)! takes its name too.
      while (start > 0 && /[A-Za-z0-9_]/.test(s[start - 1])) start--;
    } else {
      start = j;
      while (start >= 0 && /[A-Za-z0-9_.]/.test(s[start])) start--;
      start++;
      if (start > j) throw new Error('"!" must follow a number, a name or a bracket');
      // In "2n!" the factorial applies to n only, as in ordinary notation.
      const m = /^\d*\.?\d*(?=[A-Za-z_])/.exec(s.slice(start, j + 1));
      if (m && m[0]) start += m[0].length;
    }
    const inner = s.slice(start, j + 1);
    const name = `_fact${parts.length}`;
    parts.push(inner);
    s = `${s.slice(0, start)}${name}${s.slice(i + 1)}`;
  }
  return { src: s, parts };
}

/**
 * Compiles an expression that may contain factorials. Returns a function of the named variables,
 * in order, like expr.compile. Throws an Error with a readable message.
 */
export function compileF(src: string, names: readonly string[]): (...v: number[]) => number {
  if (!src.includes('!')) return compile(src, names);
  const { src: main, parts } = extractFactorials(src);
  const placeholders = parts.map((_, i) => `_fact${i}`);
  // Each factorial's argument may itself use earlier placeholders (nested factorials).
  const inner = parts.map((p, i) => compile(p, [...names, ...placeholders.slice(0, i)]));
  const f = compile(main, [...names, ...placeholders]);
  return (...v: number[]) => {
    const all = [...v];
    for (let i = 0; i < inner.length; i++) all.push(factorial(inner[i](...all)));
    return f(...all);
  };
}

export function tryCompileF(src: string, names: readonly string[]): { fn: (...v: number[]) => number; error?: undefined } | { fn?: undefined; error: string } {
  try {
    return { fn: compileF(src, names) };
  } catch (e) {
    return { error: `${(e as Error).message} in "${src}"` };
  }
}

/** Parse for the series engine, with a readable error. */
export function parseOrThrow(src: string, names: readonly string[]): ExprNode {
  try {
    return parseExpr(src, names);
  } catch (e) {
    throw new Error(`${(e as Error).message} in "${src}"`);
  }
}

/**
 * Tanh-sinh quadrature of f over [a, b], which may be infinite at either end. Copes with
 * integrable blow-ups at the end points, which are never evaluated.
 */
export function integrate(f: (x: number) => number, a: number, b: number, h = 1 / 32): number {
  if (a === b) return 0;
  if (a > b) return -integrate(f, b, a, h);
  if (a === -Infinity && b === Infinity) return integrate((t) => (f(t / (1 - t * t)) * (1 + t * t)) / ((1 - t * t) * (1 - t * t)), -1, 1, h);
  if (b === Infinity) return integrate((t) => f(a + t / (1 - t)) / ((1 - t) * (1 - t)), 0, 1, h);
  if (a === -Infinity) return integrate((t) => f(b - t / (1 - t)) / ((1 - t) * (1 - t)), 0, 1, h);
  const half = (b - a) / 2;
  let sum = 0;
  for (let k = -Math.round(4 / h); k <= Math.round(4 / h); k++) {
    const t = k * h;
    const u = (Math.PI / 2) * Math.sinh(t);
    const ch = Math.cosh(u);
    const w = ((Math.PI / 2) * Math.cosh(t)) / (ch * ch);
    // Distance from the nearer end, computed directly so it does not round to zero.
    const d = (2 * half) / (1 + Math.exp(2 * Math.abs(u)));
    const x = t < 0 ? a + d : b - d;
    if (!(d > 0) || x <= a || x >= b) continue;
    const y = f(x);
    if (Number.isFinite(y)) sum += y * w;
  }
  return sum * half * h;
}

/** Cumulative integrals F[i] = integral of f from xs[0] to xs[i], Simpson on each piece. */
export function cumulative(f: (x: number) => number, xs: readonly number[], m = 16): number[] {
  const out = [0];
  let acc = 0;
  for (let i = 1; i < xs.length; i++) {
    const a = xs[i - 1];
    const b = xs[i];
    const h = (b - a) / m;
    let s = f(a) + f(b);
    for (let j = 1; j < m; j++) s += (j % 2 ? 4 : 2) * f(a + j * h);
    acc += (s * h) / 3;
    out.push(acc);
  }
  return out;
}

/** A close rational p/q (q <= maxDen) if x is one to near machine precision, else null. */
export function asFraction(x: number, maxDen = 1e8): [number, number] | null {
  if (!Number.isFinite(x)) return null;
  if (Number.isInteger(x)) return [x, 1];
  const sign = Math.sign(x);
  const ax = Math.abs(x);
  let h0 = 1,
    h1 = 0,
    k0 = 0,
    k1 = 1,
    v = ax;
  for (let i = 0; i < 40; i++) {
    const an = Math.floor(v);
    [h0, h1] = [an * h0 + h1, h0];
    [k0, k1] = [an * k0 + k1, k0];
    if (k0 > maxDen) return null;
    // Accept only when the next partial quotient would be huge (error far below 1/k^2), which
    // separates an exact fraction carrying rounding noise from an irrational number's convergent.
    const err = Math.abs(ax - h0 / k0);
    // Series coefficients have smooth denominators (factorials, small n), which rules out
    // chance convergents of irrational numbers with large prime factors.
    if (err <= 1e-13 * ax && err * k0 * k0 < 1e-4) return k0 <= 1000 || smooth(k0) ? [sign * h0, k0] : null;
    const frac = v - an;
    if (frac < 1e-15) break;
    v = 1 / frac;
  }
  return null;
}

/** True when every prime factor of n is below 200. */
function smooth(n: number): boolean {
  for (let p = 2; p < 200 && n > 1; p++) while (n % p === 0) n /= p;
  return n === 1;
}

/** TeX for a number: an exact fraction when it is one, a short decimal otherwise. */
export function texNum(x: number, digits = 4): string {
  const fr = asFraction(x);
  if (fr) {
    const [p, q] = fr;
    if (q === 1) return `${p}`;
    return `${p < 0 ? '-' : ''}\\tfrac{${Math.abs(p)}}{${q}}`;
  }
  return shortNum(x, digits);
}

/** A decimal with `digits` significant figures, in TeX (scientific form when tiny or huge). */
export function shortNum(x: number, digits = 4): string {
  if (x === 0) return '0';
  const ax = Math.abs(x);
  if (ax >= 1e5 || ax < 1e-3) {
    const e = Math.floor(Math.log10(ax));
    const m = x / Math.pow(10, e);
    return `${+m.toFixed(digits - 1)}\\times10^{${e}}`;
  }
  return `${+x.toPrecision(digits)}`;
}

const SUP: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };

/** "10⁻⁴" style label for a power of ten. */
export function pow10Label(k: number): string {
  if (k === 0) return '1';
  if (k === 1) return '10';
  return `10${String(k)
    .split('')
    .map((c) => SUP[c] ?? c)
    .join('')}`;
}

/** Scientific notation for readouts: 3.1×10⁻⁶. */
export function sci(x: number, digits = 3): string {
  if (!Number.isFinite(x)) return Number.isNaN(x) ? 'undefined' : x > 0 ? '∞' : '−∞';
  if (x === 0) return '0';
  const ax = Math.abs(x);
  if (ax >= 1e-3 && ax < 1e5) return `${x < 0 ? '−' : ''}${+ax.toPrecision(digits + 1)}`;
  const e = Math.floor(Math.log10(ax));
  let m = ax / Math.pow(10, e);
  if (+m.toFixed(digits - 1) >= 10) {
    m /= 10;
    return `${x < 0 ? '−' : ''}${+m.toFixed(digits - 1)}×${pow10Label(e + 1)}`;
  }
  return `${x < 0 ? '−' : ''}${+m.toFixed(digits - 1)}×${pow10Label(e)}`;
}

/**
 * A numeric parameter that may also be written as a constant expression ("2*pi", "pi/3").
 * Strings "inf" and "-inf" give infinities when allowInf is set.
 */
export function numExpr(p: Record<string, unknown>, key: string, def: number, allowInf = false): number {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (allowInf && (s === 'inf' || s === 'infinity' || s === '+inf')) return Infinity;
    if (allowInf && (s === '-inf' || s === '-infinity')) return -Infinity;
    try {
      const x = compile(v, [])();
      if (Number.isFinite(x)) return x;
    } catch {
      // fall through to the error below
    }
  }
  throw new Error(`parameter "${key}" should be a number or a constant expression such as "2*pi"${allowInf ? ' or "inf"' : ''}, got ${JSON.stringify(v)}`);
}

/** Formats multiples of pi/k for tick labels, e.g. 3π/4; falls back to a decimal. */
export function piLabel(v: number, den = 4): string {
  const k = Math.round((v / Math.PI) * den);
  if (Math.abs(v - (k * Math.PI) / den) > 1e-9) return `${+v.toFixed(2)}`;
  if (k === 0) return '0';
  let n = k;
  let d = den;
  const g = gcdInt(Math.abs(n), d);
  n /= g;
  d /= g;
  const num = n === 1 ? 'π' : n === -1 ? '−π' : `${n < 0 ? '−' : ''}${Math.abs(n)}π`;
  return d === 1 ? num : `${num}/${d}`;
}

function gcdInt(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}
