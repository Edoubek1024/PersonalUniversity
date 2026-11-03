/**
 * Numerics shared by the differential-equations widgets: RK4 for scalar equations and planar
 * systems, curve tracing for direction fields and phase portraits (step size chosen in pixels so
 * curves stay smooth on any screen), 2x2 eigen-analysis and classification, root and
 * equilibrium finding, and a couple of parameter helpers.
 */
import type { ExprNode } from './expr';
import { compile } from './expr';

export type Pt = [number, number];
export type F1 = (t: number, y: number) => number;
export type F2 = (x: number, y: number) => number;

/** One classical Runge-Kutta step for y' = f(t, y). */
export function rk4(f: F1, t: number, y: number, h: number): number {
  const k1 = f(t, y);
  const k2 = f(t + h / 2, y + (h / 2) * k1);
  const k3 = f(t + h / 2, y + (h / 2) * k2);
  const k4 = f(t + h, y + h * k3);
  return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
}

/** y(t1) for y' = f(t, y), y(t0) = y0, by n RK4 steps. */
export function rk4Solve(f: F1, t0: number, y0: number, t1: number, n = 2000): number {
  const h = (t1 - t0) / n;
  let y = y0;
  for (let i = 0; i < n; i++) y = rk4(f, t0 + i * h, y, h);
  return y;
}

/** Euler's method from (t0, y0) to t1 with step h (the last step is shortened to land on t1). */
export function eulerPath(f: F1, t0: number, y0: number, t1: number, h: number): Pt[] {
  const out: Pt[] = [[t0, y0]];
  let t = t0;
  let y = y0;
  const dir = t1 >= t0 ? 1 : -1;
  for (let i = 0; i < 100000 && dir * (t1 - t) > 1e-12; i++) {
    const step = dir * Math.min(h, Math.abs(t1 - t));
    y = y + step * f(t, y);
    t = Math.abs(t1 - (t + step)) < 1e-12 ? t1 : t + step;
    out.push([t, y]);
    if (!Number.isFinite(y)) break;
  }
  return out;
}

export interface Box {
  view: [number, number, number, number];
  /** Pixels per data unit along each axis. */
  kx: number;
  ky: number;
}

function inBox(x: number, y: number, b: Box, margin = 0.15): boolean {
  const [x0, x1, y0, y1] = b.view;
  const mx = (x1 - x0) * margin;
  const my = (y1 - y0) * margin;
  return x >= x0 - mx && x <= x1 + mx && y >= y0 - my && y <= y1 + my;
}

/**
 * The solution curve of y' = f(t, y) through (t0, y0), traced forwards and backwards until it
 * leaves the view (or blows up). Steps are sized so each moves about `px` pixels.
 */
export function traceSolution(f: F1, t0: number, y0: number, box: Box, px = 1.5): Pt[] {
  const half = (dir: 1 | -1): Pt[] => {
    const pts: Pt[] = [];
    let t = t0;
    let y = y0;
    const hMax = (box.view[1] - box.view[0]) / 200;
    for (let i = 0; i < 6000; i++) {
      const s = f(t, y);
      if (!Number.isFinite(s)) break;
      const speed = Math.hypot(box.kx, s * box.ky);
      const h = dir * Math.min(hMax, px / speed);
      const yn = rk4(f, t, y, h);
      t += h;
      y = yn;
      if (!Number.isFinite(y)) break;
      pts.push([t, y]);
      if (!inBox(t, y, box, 0.05)) break;
    }
    return pts;
  };
  const back = half(-1).reverse();
  return [...back, [t0, y0], ...half(1)];
}

/** One RK4 step for the planar system x' = fx(x, y), y' = fy(x, y). Writes into `out`. */
export function rk4Plane(fx: F2, fy: F2, x: number, y: number, h: number, out: Pt): void {
  const a1 = fx(x, y);
  const b1 = fy(x, y);
  const a2 = fx(x + (h / 2) * a1, y + (h / 2) * b1);
  const b2 = fy(x + (h / 2) * a1, y + (h / 2) * b1);
  const a3 = fx(x + (h / 2) * a2, y + (h / 2) * b2);
  const b3 = fy(x + (h / 2) * a2, y + (h / 2) * b2);
  const a4 = fx(x + h * a3, y + h * b3);
  const b4 = fy(x + h * a3, y + h * b3);
  out[0] = x + (h / 6) * (a1 + 2 * a2 + 2 * a3 + a4);
  out[1] = y + (h / 6) * (b1 + 2 * b2 + 2 * b3 + b4);
}

export interface Orbit {
  /** Points in time order (backward half reversed, then the start, then forward). */
  pts: Pt[];
  /** Index of the start point in `pts`. */
  start: number;
}

/**
 * The trajectory of a planar autonomous system through (x0, y0), forwards and backwards in time,
 * stopping when it leaves the view, settles at an equilibrium, or has run long enough.
 */
export function traceOrbit(fx: F2, fy: F2, x0: number, y0: number, box: Box, opts: { px?: number; hMax?: number; tMax?: number; maxSteps?: number } = {}): Orbit {
  const px = opts.px ?? 2;
  const hMax = opts.hMax ?? 0.05;
  const tMax = opts.tMax ?? 60;
  const maxSteps = opts.maxSteps ?? 3000;
  const tmp: Pt = [0, 0];
  const half = (dir: 1 | -1): Pt[] => {
    const pts: Pt[] = [];
    let x = x0;
    let y = y0;
    let t = 0;
    let travelled = 0;
    const limit = 12 * (box.view[1] - box.view[0]) * box.kx + 12 * (box.view[3] - box.view[2]) * box.ky;
    for (let i = 0; i < maxSteps && t < tMax; i++) {
      const u = fx(x, y);
      const v = fy(x, y);
      const speed = Math.hypot(u * box.kx, v * box.ky);
      if (!Number.isFinite(speed) || speed < 1e-6) break;
      const h = Math.min(hMax, px / speed);
      rk4Plane(fx, fy, x, y, dir * h, tmp);
      if (!Number.isFinite(tmp[0]) || !Number.isFinite(tmp[1])) break;
      travelled += Math.hypot((tmp[0] - x) * box.kx, (tmp[1] - y) * box.ky);
      x = tmp[0];
      y = tmp[1];
      t += h;
      pts.push([x, y]);
      if (!inBox(x, y, box) || travelled > limit) break;
    }
    return pts;
  };
  const back = half(-1).reverse();
  return { pts: [...back, [x0, y0], ...half(1)], start: back.length };
}

/** An SVG path through data points, broken wherever a point is not finite. */
export function pathD(pts: readonly Pt[], sx: (x: number) => number, sy: (y: number) => number): string {
  let d = '';
  let pen = false;
  for (const [x, y] of pts) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      pen = false;
      continue;
    }
    const X = Math.max(-1e5, Math.min(1e5, sx(x)));
    const Y = Math.max(-1e5, Math.min(1e5, sy(y)));
    d += `${pen ? 'L' : 'M'}${X.toFixed(1)},${Y.toFixed(1)}`;
    pen = true;
  }
  return d;
}

/* ------------------------------------------------------------------------------------------ */
/* 2x2 linear algebra                                                                          */

export type Mat2 = [number, number, number, number]; // a b / c d (rows)

export interface Eigen2 {
  T: number;
  D: number;
  disc: number;
  /** 'real' distinct, 'repeated', or 'complex'. */
  kind: 'real' | 'repeated' | 'complex';
  /** Real eigenvalues in increasing order (repeated: both equal); for complex, re ± i·im. */
  l1: number;
  l2: number;
  re: number;
  im: number;
  /** Unit eigenvectors for l1, l2 (real case); for repeated, v1 = v2 unless A = λI (then null). */
  v1: Pt | null;
  v2: Pt | null;
  /** Repeated eigenvalue with A = λI (every vector is an eigenvector). */
  scalar: boolean;
}

function eigvec(a: number, b: number, c: number, d: number, l: number): Pt {
  // Rows of A - lI are (a-l, b) and (c, d-l); a null vector is perpendicular to the larger row.
  const r1 = Math.hypot(a - l, b);
  const r2 = Math.hypot(c, d - l);
  let v: Pt = r1 >= r2 ? [b, l - a] : [l - d, c];
  const n = Math.hypot(v[0], v[1]);
  if (n < 1e-14) v = [1, 0];
  else v = [v[0] / n, v[1] / n];
  return v;
}

export function eigen2([a, b, c, d]: Mat2, eps = 1e-9): Eigen2 {
  const T = a + d;
  const D = a * d - b * c;
  const disc = T * T - 4 * D;
  const scale = 1 + T * T + Math.abs(D);
  if (disc > eps * scale) {
    const s = Math.sqrt(disc);
    const l1 = (T - s) / 2;
    const l2 = (T + s) / 2;
    return { T, D, disc, kind: 'real', l1, l2, re: NaN, im: 0, v1: eigvec(a, b, c, d, l1), v2: eigvec(a, b, c, d, l2), scalar: false };
  }
  if (disc >= -eps * scale) {
    const l = T / 2;
    const scalar = Math.hypot(a - l, b, c, d - l) < Math.sqrt(eps) * Math.sqrt(scale);
    const v = scalar ? null : eigvec(a, b, c, d, l);
    return { T, D, disc: 0, kind: 'repeated', l1: l, l2: l, re: l, im: 0, v1: v, v2: v, scalar };
  }
  const re = T / 2;
  const im = Math.sqrt(-disc) / 2;
  return { T, D, disc, kind: 'complex', l1: NaN, l2: NaN, re, im, v1: null, v2: null, scalar: false };
}

export interface Classification {
  /** Short name, e.g. "Saddle", "Stable spiral". */
  name: string;
  /** Stability phrase in the lesson's words. */
  stability: string;
  /** A key for colouring: 'stable' | 'unstable' | 'neutral'. */
  tone: 'stable' | 'unstable' | 'neutral';
}

/** Classifies the origin of x' = Ax using the lesson's trace-determinant table. */
export function classify2(e: Eigen2, eps = 1e-9): Classification {
  const { T, D } = e;
  const tol = eps * (1 + T * T + Math.abs(D));
  const tZero = Math.abs(T) < Math.sqrt(tol);
  if (Math.abs(D) < tol) {
    if (tZero) return { name: 'Degenerate (both eigenvalues 0)', stability: 'Not asymptotically stable', tone: 'neutral' };
    return T < 0
      ? { name: 'Degenerate: line of equilibria', stability: 'Stable, not asymptotically', tone: 'neutral' }
      : { name: 'Degenerate: line of equilibria', stability: 'Unstable', tone: 'unstable' };
  }
  if (D < 0) return { name: 'Saddle', stability: 'Unstable', tone: 'unstable' };
  if (e.kind === 'real') return T < 0 ? { name: 'Stable node', stability: 'Asymptotically stable', tone: 'stable' } : { name: 'Unstable node', stability: 'Unstable', tone: 'unstable' };
  if (e.kind === 'repeated') {
    const what = e.scalar ? 'star point' : 'improper node';
    return T < 0 ? { name: `Stable ${what}`, stability: 'Asymptotically stable', tone: 'stable' } : { name: `Unstable ${what}`, stability: 'Unstable', tone: 'unstable' };
  }
  if (tZero) return { name: 'Center', stability: 'Stable, not asymptotically', tone: 'neutral' };
  return T < 0 ? { name: 'Stable spiral', stability: 'Asymptotically stable', tone: 'stable' } : { name: 'Unstable spiral', stability: 'Unstable', tone: 'unstable' };
}

/** Jacobian of (fx, fy) at (x, y) by central differences. */
export function jacobian(fx: F2, fy: F2, x: number, y: number): Mat2 {
  const hx = 1e-5 * Math.max(1, Math.abs(x));
  const hy = 1e-5 * Math.max(1, Math.abs(y));
  return [
    (fx(x + hx, y) - fx(x - hx, y)) / (2 * hx),
    (fx(x, y + hy) - fx(x, y - hy)) / (2 * hy),
    (fy(x + hx, y) - fy(x - hx, y)) / (2 * hx),
    (fy(x, y + hy) - fy(x, y - hy)) / (2 * hy),
  ];
}

/** Equilibria of a planar system inside the view: Newton's method from a grid of seeds. */
export function findEquilibria(fx: F2, fy: F2, view: [number, number, number, number], seeds = 14): Pt[] {
  const [x0, x1, y0, y1] = view;
  const found: Pt[] = [];
  const tolSame = 1e-4 * Math.max(x1 - x0, y1 - y0);
  for (let i = 0; i <= seeds; i++) {
    for (let j = 0; j <= seeds; j++) {
      let x = x0 + ((x1 - x0) * i) / seeds;
      let y = y0 + ((y1 - y0) * j) / seeds;
      let ok = false;
      for (let it = 0; it < 60; it++) {
        const u = fx(x, y);
        const v = fy(x, y);
        if (!Number.isFinite(u) || !Number.isFinite(v)) break;
        if (Math.hypot(u, v) < 1e-12) {
          ok = true;
          break;
        }
        const [a, b, c, d] = jacobian(fx, fy, x, y);
        const det = a * d - b * c;
        if (!Number.isFinite(det) || Math.abs(det) < 1e-14) break;
        let dx = (d * u - b * v) / det;
        let dy = (-c * u + a * v) / det;
        // Damp very long steps so a seed does not jump far across the plane.
        const len = Math.hypot(dx, dy);
        const cap = Math.max(x1 - x0, y1 - y0) / 4;
        if (len > cap) {
          dx *= cap / len;
          dy *= cap / len;
        }
        x -= dx;
        y -= dy;
        if (Math.hypot(dx, dy) < 1e-13 * (1 + Math.hypot(x, y))) {
          ok = Math.hypot(fx(x, y), fy(x, y)) < 1e-8;
          break;
        }
      }
      if (!ok) continue;
      const mx = (x1 - x0) * 0.02;
      const my = (y1 - y0) * 0.02;
      if (x < x0 - mx || x > x1 + mx || y < y0 - my || y > y1 + my) continue;
      if (found.some(([p, q]) => Math.hypot(p - x, q - y) < tolSame)) continue;
      found.push([Math.abs(x) < 1e-10 ? 0 : x, Math.abs(y) < 1e-10 ? 0 : y]);
    }
  }
  return found.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
}

export interface Equilibrium1D {
  y: number;
  /** 'stable' | 'unstable' | 'semistable', read from the sign of f on each side. */
  kind: 'stable' | 'unstable' | 'semistable';
  slope: number;
}

/** Zeros of f on [a, b] (sign changes and touching zeros), classified by the phase-line arrows. */
export function phaseLineEquilibria(f: (y: number) => number, a: number, b: number, n = 1200): Equilibrium1D[] {
  const ys: number[] = [];
  const fs: number[] = [];
  for (let i = 0; i <= n; i++) {
    const y = a + ((b - a) * i) / n;
    ys.push(y);
    fs.push(f(y));
  }
  const span = b - a;
  const roots: number[] = [];
  const bisect = (lo: number, hi: number) => {
    let flo = f(lo);
    for (let k = 0; k < 80; k++) {
      const mid = (lo + hi) / 2;
      const fm = f(mid);
      if (fm === 0) return mid;
      if (Math.sign(fm) === Math.sign(flo)) {
        lo = mid;
        flo = fm;
      } else hi = mid;
    }
    return (lo + hi) / 2;
  };
  const fmax = Math.max(1e-12, ...fs.filter(Number.isFinite).map(Math.abs));
  for (let i = 0; i < n; i++) {
    const p = fs[i];
    const q = fs[i + 1];
    if (!Number.isFinite(p) || !Number.isFinite(q)) continue;
    if (p === 0) roots.push(ys[i]);
    else if (p * q < 0) roots.push(bisect(ys[i], ys[i + 1]));
    else if (i > 0 && Number.isFinite(fs[i - 1])) {
      // A touching zero: |f| has a local minimum that is (nearly) zero without a sign change.
      const r = fs[i - 1];
      if (Math.abs(p) <= Math.abs(r) && Math.abs(p) <= Math.abs(q) && Math.sign(r) === Math.sign(p) && Math.sign(q) === Math.sign(p) && Math.abs(p) < 1e-6 * fmax) {
        // Golden-section on |f| to locate the minimum.
        let lo = ys[i - 1];
        let hi = ys[i + 1];
        for (let k = 0; k < 80; k++) {
          const m1 = lo + (hi - lo) * 0.382;
          const m2 = lo + (hi - lo) * 0.618;
          if (Math.abs(f(m1)) < Math.abs(f(m2))) hi = m2;
          else lo = m1;
        }
        const m = (lo + hi) / 2;
        if (Math.abs(f(m)) < 1e-9 * fmax) roots.push(m);
      }
    }
  }
  const uniq = roots.filter((r, i) => i === 0 || Math.abs(r - roots[i - 1]) > span * 1e-6);
  const eps = span * 1e-4;
  return uniq.map((y) => {
    const below = f(y - eps);
    const above = f(y + eps);
    const kind: Equilibrium1D['kind'] = below > 0 && above < 0 ? 'stable' : below < 0 && above > 0 ? 'unstable' : 'semistable';
    const slope = (f(y + 1e-6) - f(y - 1e-6)) / 2e-6;
    return { y: Math.abs(y) < 1e-12 ? 0 : y, kind, slope };
  });
}

/* ------------------------------------------------------------------------------------------ */
/* Parameter helpers                                                                           */

/** True if the expression tree reads variable number `i`. */
export function usesVar(n: ExprNode, i: number): boolean {
  switch (n.k) {
    case 'num':
      return false;
    case 'var':
      return n.i === i;
    case 'neg':
      return usesVar(n.a, i);
    case 'bin':
      return usesVar(n.a, i) || usesVar(n.b, i);
    case 'call':
      return n.args.some((a) => usesVar(a, i));
  }
}

/** A number parameter that may also be written as a constant expression such as "pi" or "2*pi". */
export function numOrExpr(p: Record<string, unknown>, key: string, def: number): number {
  const v = p[key];
  if (v === undefined) return def;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    let x: number;
    try {
      x = compile(v, [])();
    } catch (e) {
      throw new Error(`parameter "${key}": ${(e as Error).message} in "${v}"`);
    }
    if (Number.isFinite(x)) return x;
  }
  throw new Error(`parameter "${key}" should be a number or a constant expression such as "pi", got ${JSON.stringify(v)}`);
}

/** Rounds to a "nice" upper bound (1, 1.5, 2, 3, 5 times a power of ten). */
export function niceCeil(x: number): number {
  if (!(x > 0) || !Number.isFinite(x)) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(x)));
  for (const m of [1, 1.5, 2, 3, 5, 10]) if (x <= m * p * (1 + 1e-9)) return m * p;
  return 10 * p;
}
