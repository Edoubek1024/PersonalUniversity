/**
 * Numerics for functions of two variables, shared by the Calculus III widgets: grid sampling,
 * marching-squares contours (as flat segment lists or stitched chains), numerical gradients and
 * Hessians, a critical-point finder, projection onto a level curve, and rasterising a function
 * to a small image for filled contour maps and shading.
 */
import { niceStep } from './num';

export type F2 = (x: number, y: number) => number;
export type V4 = [number, number, number, number];

export interface Grid {
  nx: number;
  ny: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  /** Values at the (nx + 1) * (ny + 1) vertices, row by row from the bottom. */
  v: Float64Array;
  /** Robust range of the finite values (1st and 99th percentiles). */
  lo: number;
  hi: number;
}

export function sampleGrid(f: F2, view: V4, nx: number, ny: number): Grid {
  const [x0, x1, y0, y1] = view;
  const dx = (x1 - x0) / nx;
  const dy = (y1 - y0) / ny;
  const v = new Float64Array((nx + 1) * (ny + 1));
  const finite: number[] = [];
  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      const z = f(x0 + i * dx, y0 + j * dy);
      v[j * (nx + 1) + i] = z;
      if (Number.isFinite(z)) finite.push(z);
    }
  }
  finite.sort((a, b) => a - b);
  const q = (p: number) => (finite.length ? finite[Math.min(finite.length - 1, Math.max(0, Math.round(p * (finite.length - 1))))] : 0);
  return { nx, ny, x0, y0, dx, dy, v, lo: q(0.01), hi: q(0.99) };
}

/** Evenly spaced "nice" levels strictly inside (lo, hi), about n of them. */
export function niceLevels(lo: number, hi: number, n: number): number[] {
  if (!(hi > lo)) return [lo];
  const step = niceStep(hi - lo, n);
  const out: number[] = [];
  for (let k = Math.ceil(lo / step); k * step < hi; k++) {
    const v = k * step;
    if (v > lo) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
  }
  return out;
}

/**
 * Marching squares for one level. Returns segment end points as a flat array
 * [x1, y1, x2, y2, ...] and, in `ids`, the grid-edge ids of each end point (used to stitch
 * segments into chains exactly).
 */
export function contour(g: Grid, level: number): { pts: number[]; ids: number[] } {
  const { nx, ny, v } = g;
  const W = nx + 1;
  const H = nx * (ny + 1);
  const pts: number[] = [];
  const ids: number[] = [];
  const hId = (i: number, j: number) => j * nx + i;
  const vId = (i: number, j: number) => H + j * W + i;
  const push = (a: number, b: number) => {
    const pa = edgePoint(g, a, level);
    const pb = edgePoint(g, b, level);
    pts.push(pa[0], pa[1], pb[0], pb[1]);
    ids.push(a, b);
  };
  const cross: number[] = [0, 0, 0, 0];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = v[j * W + i];
      const b = v[j * W + i + 1];
      const c = v[(j + 1) * W + i + 1];
      const d = v[(j + 1) * W + i];
      if (!(Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(c) && Number.isFinite(d))) continue;
      const A = a > level;
      const B = b > level;
      const C = c > level;
      const D = d > level;
      if (A === B && B === C && C === D) continue;
      const bottom = hId(i, j);
      const right = vId(i + 1, j);
      const top = hId(i, j + 1);
      const left = vId(i, j);
      let n = 0;
      if (A !== B) cross[n++] = bottom;
      if (B !== C) cross[n++] = right;
      if (D !== C) cross[n++] = top;
      if (A !== D) cross[n++] = left;
      if (n === 2) {
        push(cross[0], cross[1]);
      } else if (n === 4) {
        const centre = (a + b + c + d) / 4 > level;
        // A and C on one side, B and D on the other; the centre decides which pair is joined.
        const isolateBD = A ? centre : !centre;
        if (isolateBD) {
          push(bottom, right);
          push(top, left);
        } else {
          push(left, bottom);
          push(right, top);
        }
      }
    }
  }
  return { pts, ids };
}

/** The point where the level crosses grid edge `id`. */
export function edgePoint(g: Grid, id: number, level: number): [number, number] {
  const { nx, ny, v, x0, y0, dx, dy } = g;
  const W = nx + 1;
  const H = nx * (ny + 1);
  if (id < H) {
    const j = Math.floor(id / nx);
    const i = id - j * nx;
    const a = v[j * W + i];
    const b = v[j * W + i + 1];
    const t = a === b ? 0.5 : (level - a) / (b - a);
    return [x0 + (i + t) * dx, y0 + j * dy];
  }
  const k = id - H;
  const j = Math.floor(k / W);
  const i = k - j * W;
  const a = v[j * W + i];
  const b = v[(j + 1) * W + i];
  const t = a === b ? 0.5 : (level - a) / (b - a);
  return [x0 + i * dx, y0 + (j + t) * dy];
}

export interface Chain {
  pts: [number, number][];
  closed: boolean;
}

/** The level curve as connected polylines. */
export function chains(g: Grid, level: number): Chain[] {
  const { ids } = contour(g, level);
  const nseg = ids.length / 2;
  const adj = new Map<number, number[]>();
  for (let k = 0; k < nseg; k++) {
    for (const e of [ids[2 * k], ids[2 * k + 1]]) {
      const l = adj.get(e);
      if (l) l.push(k);
      else adj.set(e, [k]);
    }
  }
  const used = new Uint8Array(nseg);
  const out: Chain[] = [];
  const walk = (start: number): number[] => {
    const list = [start];
    let cur = start;
    for (;;) {
      const segs = adj.get(cur) ?? [];
      const k = segs.find((s) => !used[s]);
      if (k === undefined) break;
      used[k] = 1;
      cur = ids[2 * k] === cur ? ids[2 * k + 1] : ids[2 * k];
      list.push(cur);
    }
    return list;
  };
  const toChain = (list: number[]): Chain => ({
    pts: list.map((e) => edgePoint(g, e, level)),
    closed: list.length > 2 && list[0] === list[list.length - 1],
  });
  for (const [e, segs] of adj) if (segs.length === 1 && !used[segs[0]]) out.push(toChain(walk(e)));
  for (let k = 0; k < nseg; k++) if (!used[k]) out.push(toChain(walk(ids[2 * k])));
  return out.filter((c) => c.pts.length > 1);
}

/** SVG path data for a flat segment list, through pixel maps sx, sy. */
export function segPath(pts: number[], sx: (x: number) => number, sy: (y: number) => number): string {
  let d = '';
  for (let k = 0; k < pts.length; k += 4) d += `M${sx(pts[k]).toFixed(1)},${sy(pts[k + 1]).toFixed(1)}L${sx(pts[k + 2]).toFixed(1)},${sy(pts[k + 3]).toFixed(1)}`;
  return d;
}

export function chainPath(c: Chain, sx: (x: number) => number, sy: (y: number) => number): string {
  return c.pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join('') + (c.closed ? 'Z' : '');
}

/** Nearest point to (x, y) on any chain. */
export function nearestOnChains(cs: Chain[], x: number, y: number): { ci: number; p: [number, number]; d: number } | null {
  let best: { ci: number; p: [number, number]; d: number } | null = null;
  cs.forEach((c, ci) => {
    for (let k = 0; k + 1 < c.pts.length; k++) {
      const [ax, ay] = c.pts[k];
      const [bx, by] = c.pts[k + 1];
      const ex = bx - ax;
      const ey = by - ay;
      const l2 = ex * ex + ey * ey;
      const t = l2 > 0 ? Math.min(1, Math.max(0, ((x - ax) * ex + (y - ay) * ey) / l2)) : 0;
      const px = ax + t * ex;
      const py = ay + t * ey;
      const d = Math.hypot(px - x, py - y);
      if (!best || d < best.d) best = { ci, p: [px, py], d };
    }
  });
  return best;
}

/** Numerical noise to zero: values below tol (relative to 1) print as 0. */
export function tidy(v: number, tol = 1e-7): number {
  return Math.abs(v) < tol ? 0 : v;
}

export function grad(f: F2, x: number, y: number, h: number): [number, number] {
  return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)];
}

/** [f_xx, f_xy, f_yy] by central differences. */
export function hessian(f: F2, x: number, y: number, h: number): [number, number, number] {
  const c = f(x, y);
  const fxx = (f(x + h, y) - 2 * c + f(x - h, y)) / (h * h);
  const fyy = (f(x, y + h) - 2 * c + f(x, y - h)) / (h * h);
  const fxy = (f(x + h, y + h) - f(x + h, y - h) - f(x - h, y + h) + f(x - h, y - h)) / (4 * h * h);
  return [fxx, fxy, fyy];
}

/** Moves (x, y) onto the curve g = c by Newton steps along the gradient. */
export function projectToLevel(g: F2, c: number, x: number, y: number, h: number, iters = 12): [number, number] {
  for (let k = 0; k < iters; k++) {
    const r = g(x, y) - c;
    if (!Number.isFinite(r)) break;
    if (Math.abs(r) < 1e-13) break;
    const [gx, gy] = grad(g, x, y, h);
    const n2 = gx * gx + gy * gy;
    if (!(n2 > 1e-24)) break;
    x -= (r * gx) / n2;
    y -= (r * gy) / n2;
  }
  return [x, y];
}

export type CritKind = 'min' | 'max' | 'saddle' | 'degenerate';

export interface CritPoint {
  x: number;
  y: number;
  f: number;
  fxx: number;
  fxy: number;
  fyy: number;
  D: number;
  kind: CritKind;
}

export function classify(fxx: number, fxy: number, fyy: number): { D: number; kind: CritKind } {
  const D = fxx * fyy - fxy * fxy;
  const s = Math.max(1, Math.abs(fxx), Math.abs(fyy), Math.abs(fxy));
  if (Math.abs(D) < 1e-4 * s * s) return { D: 0, kind: 'degenerate' };
  if (D < 0) return { D, kind: 'saddle' };
  return { D, kind: fxx > 0 ? 'min' : 'max' };
}

/** Critical points (grad f = 0) inside the view, found by Newton's method from a grid of seeds. */
export function criticalPoints(f: F2, view: V4): CritPoint[] {
  const [x0, x1, y0, y1] = view;
  const span = Math.max(x1 - x0, y1 - y0);
  const hg = 1e-5 * span;
  const hh = 1e-4 * span;
  const found: CritPoint[] = [];
  const N = 11;
  // Scale for "gradient is zero": the typical gradient size over the view.
  let gscale = 0;
  for (let j = 0; j <= 6; j++)
    for (let i = 0; i <= 6; i++) {
      const [gx, gy] = grad(f, x0 + ((x1 - x0) * i) / 6, y0 + ((y1 - y0) * j) / 6, hg);
      const m = Math.hypot(gx, gy);
      if (Number.isFinite(m)) gscale = Math.max(gscale, m);
    }
  const tol = 1e-7 * Math.max(1, gscale);
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      let x = x0 + ((x1 - x0) * (i + 0.5)) / N;
      let y = y0 + ((y1 - y0) * (j + 0.5)) / N;
      let ok = false;
      for (let it = 0; it < 80; it++) {
        const [gx, gy] = grad(f, x, y, hg);
        if (!Number.isFinite(gx) || !Number.isFinite(gy)) break;
        if (Math.hypot(gx, gy) < tol * 1e-3) {
          ok = true;
          break;
        }
        const [a, b, c] = hessian(f, x, y, hh);
        const det = a * c - b * b;
        if (!Number.isFinite(det) || Math.abs(det) < 1e-300) break;
        let sx = -(c * gx - b * gy) / det;
        let sy = -(-b * gx + a * gy) / det;
        const len = Math.hypot(sx, sy);
        if (len > span * 0.25) {
          sx *= (span * 0.25) / len;
          sy *= (span * 0.25) / len;
        }
        x += sx;
        y += sy;
        if (Math.hypot(sx, sy) < span * 1e-12) {
          ok = Math.hypot(...grad(f, x, y, hg)) < tol;
          break;
        }
      }
      if (!ok) ok = Math.hypot(...grad(f, x, y, hg)) < tol;
      if (!ok || x < x0 || x > x1 || y < y0 || y > y1) continue;
      if (found.some((p) => Math.hypot(p.x - x, p.y - y) < span * 2e-3)) continue;
      // Tidy round-off so that (1, 1) prints as (1, 1). Newton is slow at degenerate points
      // (x^4 + y^4 stalls near 1e-3), so also accept a rounded point whose gradient is as small.
      const g0 = Math.hypot(...grad(f, x, y, hg));
      for (const k of [1, 2, 3, 4]) {
        const s = Math.pow(10, k);
        const rx = Math.round(x * s) / s;
        const ry = Math.round(y * s) / s;
        if (Math.hypot(rx - x, ry - y) > span * 0.01) continue;
        const gr = Math.hypot(...grad(f, rx, ry, hg));
        if (gr <= Math.max(2 * g0, tol)) {
          x = rx;
          y = ry;
          break;
        }
      }
      const [fxx, fxy, fyy] = hessian(f, x, y, hh);
      const { D, kind } = classify(fxx, fxy, fyy);
      found.push({ x, y, f: f(x, y), fxx, fxy, fyy, D, kind });
    }
  }
  return found.sort((p, q) => p.x - q.x || p.y - q.y);
}

/**
 * Draws a function over the view into a small RGBA image and returns it as a data URL, for use as
 * an SVG <image>. `paint(x, y)` returns [r, g, b, a] (0-255) or null for transparent.
 */
export function rasterize(view: V4, W: number, H: number, paint: (x: number, y: number) => readonly number[] | null): string {
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(W, H);
  const [x0, x1, y0, y1] = view;
  const d = img.data;
  for (let py = 0; py < H; py++) {
    const y = y1 - ((py + 0.5) / H) * (y1 - y0);
    for (let px = 0; px < W; px++) {
      const x = x0 + ((px + 0.5) / W) * (x1 - x0);
      const c = paint(x, y);
      const k = (py * W + px) * 4;
      if (c) {
        d[k] = c[0];
        d[k + 1] = c[1];
        d[k + 2] = c[2];
        d[k + 3] = c[3];
      }
    }
  }
  ctx.putImageData(img, 0, 0);
  return cv.toDataURL();
}

/** Parses "#rrggbb", "#rgb" or "rgb(r, g, b)" to [r, g, b]. */
export function parseColor(s: string): [number, number, number] {
  const t = s.trim();
  if (t.startsWith('#')) {
    const h = t.length === 4 ? t.slice(1).split('').map((c) => c + c).join('') : t.slice(1, 7);
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m = /rgba?\(([^)]+)\)/.exec(t);
  if (m) {
    const [r, g, b] = m[1].split(/[ ,/]+/).map(parseFloat);
    return [r, g, b];
  }
  return [128, 128, 128];
}

/** Piecewise-linear colour ramp through `stops` for t in [0, 1]. */
export function ramp(stops: readonly (readonly number[])[], t: number): [number, number, number] {
  const u = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const k = Math.min(stops.length - 2, Math.floor(u));
  const f = u - k;
  const a = stops[k];
  const b = stops[k + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

/** Index of the band containing v among sorted levels: 0 below the first, levels.length above the last. */
export function bandOf(levels: readonly number[], v: number): number {
  let lo = 0;
  let hi = levels.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (levels[m] <= v) lo = m + 1;
    else hi = m;
  }
  return lo;
}
