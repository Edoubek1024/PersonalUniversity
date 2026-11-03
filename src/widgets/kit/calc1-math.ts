/**
 * Numerical helpers for the Calculus I widgets: fast one-variable compilation, accurate
 * integration, root finding, derivatives and exact-value formatting.
 */
import { parseExpr, type ExprNode } from './expr';
import { fmt } from './num';

export type Fn = (x: number) => number;

function build1(n: ExprNode): Fn {
  switch (n.k) {
    case 'num': {
      const c = n.v;
      return () => c;
    }
    case 'var':
      return (x) => x;
    case 'neg': {
      const a = build1(n.a);
      return (x) => -a(x);
    }
    case 'call': {
      const f = n.f;
      const args = n.args.map(build1);
      if (args.length === 1) {
        const a = args[0];
        return (x) => f(a(x));
      }
      const [a, b] = args;
      return (x) => f(a(x), b(x));
    }
    case 'bin': {
      const a = build1(n.a);
      const b = build1(n.b);
      switch (n.op) {
        case '+':
          return (x) => a(x) + b(x);
        case '-':
          return (x) => a(x) - b(x);
        case '*':
          return (x) => a(x) * b(x);
        case '/':
          return (x) => a(x) / b(x);
        case '^':
          return (x) => Math.pow(a(x), b(x));
      }
    }
  }
}

/**
 * Compiles an expression in one variable to a plain closure (no array per call, so it is cheap
 * in tight loops). Throws an Error naming the parameter when the expression is bad.
 */
export function compile1(src: string, key: string, variable = 'x'): Fn {
  try {
    return build1(parseExpr(src, [variable]));
  } catch (e) {
    throw new Error(`parameter "${key}": ${(e as Error).message} in "${src}"`);
  }
}

/** Central first derivative with a step scaled to |x|. */
export function d1(f: Fn, x: number): number {
  // Richardson-extrapolated central difference (error ~h⁴), falling back to a small step near
  // the edge of the domain or a kink, where the wide stencil is unreliable.
  const H = 1e-3 * (1 + Math.abs(x));
  const D1 = (f(x + H) - f(x - H)) / (2 * H);
  const D2 = (f(x + H / 2) - f(x - H / 2)) / H;
  const R = (4 * D2 - D1) / 3;
  if (Number.isFinite(R) && Math.abs(R - D2) < 1e-7 * (1 + Math.abs(R))) return R;
  const h = 1e-5 * (1 + Math.abs(x));
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** Central second derivative. */
export function d2(f: Fn, x: number): number {
  const h = 1e-4 * (1 + Math.abs(x));
  return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
}

/** One-sided difference quotients at x, used to spot corners. */
export function oneSided(f: Fn, x: number, h = 1e-6 * (1 + Math.abs(x))): [left: number, right: number] {
  const fx = f(x);
  return [(fx - f(x - h)) / h, (f(x + h) - fx) / h];
}

/** True when f has a corner, cusp or jump at x (the one-sided slopes disagree clearly). */
export function isCorner(f: Fn, x: number): boolean {
  const [l, r] = oneSided(f, x);
  if (!Number.isFinite(l) || !Number.isFinite(r)) return true;
  return Math.abs(l - r) > 1e-3 * (1 + Math.abs(l) + Math.abs(r));
}

// Gauss-Kronrod 7-15 nodes and weights (QUADPACK).
const XGK = [0.991455371120812639, 0.949107912342758525, 0.864864423359769073, 0.741531185599394440, 0.586087235467691130, 0.405845151377397167, 0.207784955007898468, 0];
const WGK = [0.022935322010529225, 0.063092092629978553, 0.104790010322250184, 0.140653259715525919, 0.169004726639267903, 0.190350578064785410, 0.204432940075298892, 0.209482141084727828];
const WG = [0.129484966168869693, 0.279705391489276668, 0.381830050505118945, 0.417959183673469388];

function gk(f: Fn, a: number, b: number): [k: number, err: number] {
  const c = (a + b) / 2;
  const h = (b - a) / 2;
  const fc = f(c);
  let k = WGK[7] * fc;
  let g = WG[3] * fc;
  for (let j = 0; j < 7; j++) {
    const dx = h * XGK[j];
    const s = f(c - dx) + f(c + dx);
    k += WGK[j] * s;
    if (j % 2 === 1) g += WG[(j - 1) / 2] * s;
  }
  return [k * h, Math.abs((k - g) * h)];
}

/**
 * Adaptive Gauss-Kronrod integral of f over [a, b], accurate to about 1e-12 for smooth
 * integrands (and still good for integrable endpoint singularities such as sqrt). Returns NaN
 * when f is not finite somewhere it is sampled.
 */
export function integrate(f: Fn, a: number, b: number, tol = 1e-12): number {
  if (a === b) return 0;
  if (a > b) return -integrate(f, b, a, tol);
  let budget = 4000;
  const rec = (lo: number, hi: number, whole: number, err: number, depth: number): number => {
    if (!Number.isFinite(whole)) return NaN;
    if (err <= Math.max(tol * (hi - lo) / (b - a), 1e-15 * Math.abs(whole)) || depth > 40 || budget-- <= 0) return whole;
    const m = (lo + hi) / 2;
    const [l, le] = gk(f, lo, m);
    const [r, re] = gk(f, m, hi);
    return rec(lo, m, l, le, depth + 1) + rec(m, hi, r, re, depth + 1);
  };
  const [k, e] = gk(f, a, b);
  return rec(a, b, k, e, 0);
}

/**
 * Cumulative integral A(x) = ∫_x0^x f on a grid of `cells` equal cells over [lo, hi] (x0 inside
 * or outside the range). Returns a function that interpolates the grid with the local
 * integrand, accurate to ~1e-10 for smooth f.
 */
export function cumulative(f: Fn, x0: number, lo: number, hi: number, cells = 800): Fn {
  const h = (hi - lo) / cells;
  const vals = new Float64Array(cells + 1);
  for (let i = 1; i <= cells; i++) vals[i] = vals[i - 1] + gk(f, lo + (i - 1) * h, lo + i * h)[0];
  const at = (x: number) => {
    const t = Math.min(cells - 1, Math.max(0, Math.floor((x - lo) / h)));
    const xl = lo + t * h;
    return vals[t] + gk(f, xl, x)[0];
  };
  const base = at(x0);
  return (x) => at(x) - base;
}

/**
 * Zeros of g on [a, b]: scan `n` cells for sign changes (and exact zeros), then bisect. Points
 * where g jumps across zero without a root (|g| stays large) are dropped.
 */
export function roots(g: Fn, a: number, b: number, n = 600): number[] {
  const out: number[] = [];
  let x0 = a;
  let g0 = g(a);
  const scale = (() => {
    let m = 0;
    for (let i = 0; i <= 40; i++) {
      const v = Math.abs(g(a + ((b - a) * i) / 40));
      if (Number.isFinite(v)) m = Math.max(m, v);
    }
    return m || 1;
  })();
  const push = (x: number) => {
    if (!out.length || Math.abs(out[out.length - 1] - x) > (b - a) * 1e-6) out.push(x);
  };
  if (g0 === 0) push(a);
  for (let i = 1; i <= n; i++) {
    const x1 = a + ((b - a) * i) / n;
    const g1 = g(x1);
    if (g1 === 0) push(x1);
    else if (Number.isFinite(g0) && Number.isFinite(g1) && g0 !== 0 && g0 * g1 < 0) {
      let lo = x0;
      let hi = x1;
      let glo = g0;
      for (let k = 0; k < 80; k++) {
        const m = (lo + hi) / 2;
        const gm = g(m);
        if (gm === 0) {
          lo = hi = m;
          break;
        }
        if (gm * glo < 0) hi = m;
        else {
          lo = m;
          glo = gm;
        }
      }
      const r = (lo + hi) / 2;
      if (Math.abs(g(r)) < 1e-6 * scale) push(r);
    }
    x0 = x1;
    g0 = g1;
  }
  return out;
}

export interface Zero {
  x: number;
  /** cross: g changes sign through 0; touch: g reaches 0 without changing sign; jump: g changes sign without passing through 0 (a corner, cusp or asymptote of the original function). */
  kind: 'cross' | 'touch' | 'jump';
}

/**
 * Like roots, but also reports zeros where g touches 0 without a sign change (found as small
 * local minima of |g|) and sign changes across a jump. Sorted by x.
 */
export function zeros(g: Fn, a: number, b: number, n = 800): Zero[] {
  const xs = new Float64Array(n + 1);
  const gs = new Float64Array(n + 1);
  let scale = 0;
  for (let i = 0; i <= n; i++) {
    xs[i] = a + ((b - a) * i) / n;
    gs[i] = g(xs[i]);
    if (Number.isFinite(gs[i]) && Math.abs(gs[i]) < 1e8) scale = Math.max(scale, Math.abs(gs[i]));
  }
  scale = scale || 1;
  const out: Zero[] = [];
  // Snap to a nearby round number (0, 3, 0.25...) when within rounding error of it.
  const grid = Math.pow(10, Math.floor(Math.log10(b - a))) * 1e-6;
  const add = (x0: number, kind: Zero['kind']) => {
    const r = Math.round(x0 / grid) * grid;
    const x = Math.abs(r - x0) < (b - a) * 5e-9 ? (Math.abs(r) < grid / 2 ? 0 : r) : x0;
    if (out.some((z) => Math.abs(z.x - x) < (b - a) * 1e-5)) return;
    out.push({ x, kind });
  };
  for (let i = 0; i < n; i++) {
    const g0 = gs[i];
    const g1 = gs[i + 1];
    if (g0 === 0) {
      const d = (b - a) * 1e-7;
      const gl = g(xs[i] - d);
      const gr = g(xs[i] + d);
      const near = Math.max(Math.abs(gl), Math.abs(gr));
      add(xs[i], !(near < 1e-3 * scale) ? 'jump' : gl * gr > 0 ? 'touch' : 'cross');
      continue;
    }
    if (Number.isFinite(g0) && Number.isFinite(g1) && g0 * g1 < 0) {
      let lo = xs[i];
      let hi = xs[i + 1];
      let glo = g0;
      for (let k = 0; k < 80; k++) {
        const m = (lo + hi) / 2;
        const gm = g(m);
        if (gm === 0) {
          lo = hi = m;
          break;
        }
        if (gm * glo < 0) hi = m;
        else {
          lo = m;
          glo = gm;
        }
      }
      const r = (lo + hi) / 2;
      // A genuine root has |g| tiny; a sign change across a corner or cusp leaves |g| large on both sides.
      const near = Math.max(Math.abs(g(r - (b - a) * 1e-7)), Math.abs(g(r + (b - a) * 1e-7)));
      add(r, Math.abs(g(r)) < 1e-6 * scale && near < 1e-3 * scale ? 'cross' : 'jump');
    } else if (i > 0 && i < n && Number.isFinite(g0) && Math.abs(g0) < Math.abs(gs[i - 1]) && Math.abs(g0) <= Math.abs(g1) && Math.abs(g0) < 0.02 * scale && gs[i - 1] * g0 > 0 && g0 * g1 > 0) {
      // Local minimum of |g| without a sign change: refine by golden-section search on |g|.
      let lo = xs[i - 1];
      let hi = xs[i + 1];
      const phi = (Math.sqrt(5) - 1) / 2;
      for (let k = 0; k < 90; k++) {
        const m1 = hi - phi * (hi - lo);
        const m2 = lo + phi * (hi - lo);
        if (Math.abs(g(m1)) < Math.abs(g(m2))) hi = m2;
        else lo = m1;
      }
      const r = (lo + hi) / 2;
      if (Math.abs(g(r)) < 1e-7 * scale) add(r, 'touch');
    }
  }
  return out.sort((p, q) => p.x - q.x);
}

/** p/q with small q when v/π is such a fraction, e.g. 7π/6; otherwise a decimal. */
export function piText(v: number, dens: readonly number[] = [1, 2, 3, 4, 6, 12]): string {
  const r = v / Math.PI;
  for (const q of dens) {
    const p = Math.round(r * q);
    if (Math.abs(r * q - p) < 1e-9) {
      if (p === 0) return '0';
      const sign = p < 0 ? '−' : '';
      const ap = Math.abs(p);
      const top = ap === 1 ? 'π' : `${ap}π`;
      return q === 1 ? `${sign}${top}` : `${sign}${top}/${q}`;
    }
  }
  return fmt(v);
}

/** TeX for a multiple of π, e.g. \tfrac{7\pi}{6}; null when not a nice multiple. */
export function piTex(v: number, dens: readonly number[] = [1, 2, 3, 4, 6, 12]): string | null {
  const r = v / Math.PI;
  for (const q of dens) {
    const p = Math.round(r * q);
    if (Math.abs(r * q - p) < 1e-9) {
      if (p === 0) return '0';
      const sign = p < 0 ? '-' : '';
      const ap = Math.abs(p);
      const top = ap === 1 ? '\\pi' : `${ap}\\pi`;
      return q === 1 ? `${sign}${top}` : `${sign}\\tfrac{${top}}{${q}}`;
    }
  }
  return null;
}

const EXACT: [number, string][] = [
  [0, '0'],
  [0.5, '\\tfrac12'],
  [Math.SQRT2 / 2, '\\tfrac{\\sqrt2}{2}'],
  [Math.sqrt(3) / 2, '\\tfrac{\\sqrt3}{2}'],
  [1, '1'],
  [Math.sqrt(3) / 3, '\\tfrac{\\sqrt3}{3}'],
  [Math.sqrt(3), '\\sqrt3'],
  [2, '2'],
  [2 / Math.sqrt(3), '\\tfrac{2\\sqrt3}{3}'],
  [Math.SQRT2, '\\sqrt2'],
];

/** TeX of an exact value such as -\tfrac{\sqrt3}{2} when v is one of the standard values. */
export function exactTex(v: number): string | null {
  const a = Math.abs(v);
  for (const [x, t] of EXACT) if (Math.abs(a - x) < 1e-9) return x === 0 ? '0' : v < 0 ? `-${t}` : t;
  return null;
}

/** Tick labels in multiples of π for axes stepped by π/2, π/4 and so on. */
export function piTick(v: number): string {
  return piText(v, [1, 2, 4, 3, 6]);
}

/** Significant-figure formatting for tables (more digits than fmt). */
export function sig(x: number, digits = 6): string {
  if (!Number.isFinite(x)) return Number.isNaN(x) ? 'undefined' : x > 0 ? '∞' : '−∞';
  if (x === 0) return '0';
  const a = Math.abs(x);
  const s = a >= 1e7 || a < 1e-5 ? x.toExponential(digits - 1) : x.toPrecision(digits);
  const t = s.includes('e') ? s.replace(/\.?0+e/, 'e') : s.includes('.') ? s.replace(/\.?0+$/, '') : s;
  return t.replace(/^-/, '−').replace('e-', 'e−');
}
