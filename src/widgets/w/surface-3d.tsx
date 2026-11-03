/**
 * surface-3d: the graph z = f(x, y) as a shaded mesh on a canvas. Drag to rotate (or use the
 * sliders). Optional features, each with a toggle:
 *   traces    the curves cut by the planes y = b and x = a through P, with their tangent lines,
 *             whose slopes are f_x(a, b) and f_y(a, b)
 *   plane     the tangent plane z = f(a,b) + f_x (x − a) + f_y (y − b) at P
 *   contours  level curves of f, drawn on the surface at their heights and on the floor
 *   paths     curves (x(t), y(t)) in the domain, lifted onto the surface, with the value f tends
 *             to as t → 0 (for two-variable limits along paths)
 * P = (a, b) is moved by dragging its dot on the surface or with the a and b sliders.
 *
 * Params:
 *   f         string     expression in x and y                        default "x^2 + y^2"
 *   domain    [xMin, xMax, yMin, yMax]                                default [-2, 2, -2, 2]
 *   z         [zMin, zMax]   height range of the box; default from the samples
 *   n         number     grid cells per side (12-60)                  default 32
 *   point     [a, b]     initial P                                     default centre of domain
 *   features  string[]   toggles offered: traces, plane, contours, paths   default ["traces", "plane"]
 *   show      string[]   features on at the start                      default = features
 *   paths     [label, x(t), y(t)][]  expressions in t and m            default []
 *   t         number     paths run over −t ≤ t ≤ t                     default 2
 *   m         [initial, min, max]   slider for m in the paths          default [1, -3, 3]
 *   special   [x, y, value][]   values of f at points where the formula is 0/0   default []
 *   az, el    number     initial view angles in degrees                default 32, 24
 *   title     string                                                  default "Surface z = f(x, y)"
 *   caption   string     may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { num, numArray, str, strArray } from '../kit/params';
import { Controls, Frame, Readout, Slider, Toggle } from '../kit/controls';
import { fmt, niceStep } from '../kit/num';
import { CamSliders, Scene3D, dot3, line, polyline, text, type Cam, type Proj, type Vec3 } from '../kit/calc3-3d';
import { contour, grad, tidy, ramp, sampleGrid, niceLevels, type F2 } from '../kit/calc3-contour';
import { caption, point, rgba, TL, useColors } from '../kit/calc3-ui';

const FEATURES = ['traces', 'plane', 'contours', 'paths'] as const;
type Feature = (typeof FEATURES)[number];
const FEATURE_LABEL: Record<Feature, string> = { traces: 'Traces x = a and y = b', plane: 'Tangent plane', contours: 'Level curves (on the surface and the floor)', paths: 'Paths to the origin' };
const ZS = 0.8; // half-height of the box in world units (the base is 2 by 2)
const PATH_COLORS = [5, 6, 4];

interface PathDef {
  label: string;
  x: (t: number, m: number) => number;
  y: (t: number, m: number) => number;
  usesM: boolean;
}

function readPaths(p: Record<string, unknown>): PathDef[] {
  const v = p.paths;
  if (v === undefined) return [];
  if (!Array.isArray(v) || !v.every((q) => Array.isArray(q) && q.length === 3 && q.every((s) => typeof s === 'string')))
    throw new Error(`parameter "paths" should be a list of [label, x(t), y(t)] string triples, got ${JSON.stringify(v)}`);
  return (v as string[][]).map(([label, xs, ys]) => {
    const cx = tryCompile(xs, ['t', 'm']);
    const cy = tryCompile(ys, ['t', 'm']);
    if (!cx.fn) throw new Error(`path "${label}": ${cx.error}`);
    if (!cy.fn) throw new Error(`path "${label}": ${cy.error}`);
    const fx = cx.fn;
    const fy = cy.fn;
    return { label, x: (t, m) => fx(t, m), y: (t, m) => fy(t, m), usesM: /\bm\b/.test(xs + ' ' + ys) };
  });
}

type Item = { depth: number; kind: 0 | 1 | 2; i: number };

export default function Surface3D({ params }: WidgetProps) {
  const fSrc = str(params, 'f', 'x^2 + y^2');
  const dom = numArray(params, 'domain', [-2, 2, -2, 2]);
  if (dom.length !== 4 || !(dom[0] < dom[1]) || !(dom[2] < dom[3])) throw new Error('parameter "domain" should be [xMin, xMax, yMin, yMax] with min < max');
  const [x0, x1, y0, y1] = dom;
  const n = Math.round(num(params, 'n', 32));
  if (n < 8 || n > 80) throw new Error('parameter "n" should be between 8 and 80');
  const feats = strArray(params, 'features', ['traces', 'plane']);
  for (const q of feats) if (!FEATURES.includes(q as Feature)) throw new Error(`parameter "features": unknown feature "${q}" (use ${FEATURES.join(', ')})`);
  const show0 = strArray(params, 'show', feats);
  const paths = useMemo(() => readPaths(params), [JSON.stringify(params.paths)]); // eslint-disable-line react-hooks/exhaustive-deps
  const tMax = num(params, 't', 2);
  const specialRaw = params.special ?? [];
  if (!Array.isArray(specialRaw) || !specialRaw.every((q) => Array.isArray(q) && q.length === 3 && q.every((x) => typeof x === 'number')))
    throw new Error(`parameter "special" should be a list of [x, y, value] triples, got ${JSON.stringify(specialRaw)}`);
  const special = specialRaw as number[][];
  const mDef = numArray(params, 'm', [1, -3, 3]);
  if (mDef.length !== 3 || !(mDef[1] < mDef[2])) throw new Error('parameter "m" should be [initial, min, max]');

  const f = useMemo<F2>(() => {
    const r = tryCompile(fSrc, ['x', 'y']);
    if (!r.fn) throw new Error(`f: ${r.error}`);
    const fn = r.fn;
    return (x, y) => fn(x, y);
  }, [fSrc]);
  // Where f is undefined at a grid point (0/0 at the origin, say), look just beside it.
  const fs = useMemo<F2>(() => {
    const e = 1e-7 * Math.max(x1 - x0, y1 - y0);
    return (x, y) => {
      const z = f(x, y);
      return Number.isFinite(z) ? z : f(x + e, y + 0.7 * e);
    };
  }, [f, x0, x1, y0, y1]);

  const grid = useMemo(() => sampleGrid(fs, [x0, x1, y0, y1], n, n), [fs, x0, x1, y0, y1, n]);
  const zr = numArray(params, 'z', []);
  if (zr.length && (zr.length !== 2 || !(zr[0] < zr[1]))) throw new Error('parameter "z" should be [zMin, zMax] with zMin < zMax');
  const [z0, z1] = useMemo(() => {
    if (zr.length === 2) return [zr[0], zr[1]];
    let lo = Infinity;
    let hi = -Infinity;
    for (const z of grid.v) if (Number.isFinite(z)) (lo = Math.min(lo, z)), (hi = Math.max(hi, z));
    if (!(hi > lo)) return [lo - 1, hi + 1];
    // Round the box out to nice values.
    const st = niceStep(hi - lo, 5);
    return [Math.floor(lo / st - 1e-9) * st, Math.ceil(hi / st + 1e-9) * st];
  }, [grid, zr.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  const xc = (x0 + x1) / 2;
  const yc = (y0 + y1) / 2;
  const hx = (x1 - x0) / 2;
  const hy = (y1 - y0) / 2;
  const zc = (z0 + z1) / 2;
  const hz = (z1 - z0) / 2;
  const W = (x: number, y: number, z: number): Vec3 => [(x - xc) / hx, (y - yc) / hy, ((z - zc) / hz) * ZS];
  const inZ = (z: number) => z >= z0 - 1e-9 * hz && z <= z1 + 1e-9 * hz;

  const [cam, setCam] = useState<Cam>({ az: num(params, 'az', 32), el: num(params, 'el', 24) });
  const p0 = point(params, 'point', [xc, yc]);
  const [P, setP] = useState<[number, number]>(p0);
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(feats.map((q) => [q, show0.includes(q)])));
  const [m, setM] = useState(mDef[0]);
  const colors = useColors();

  const [a, b] = P;
  const hd = 1e-5 * Math.max(hx, hy);
  // Values defined separately at special points (f(0, 0) = 0 for a 0/0 formula, say).
  const fv: F2 = (x, y) => {
    for (const s of special) if (Math.abs(s[0] - x) < 1e-12 && Math.abs(s[1] - y) < 1e-12) return s[2];
    const z = f(x, y);
    return Number.isFinite(z) ? z : fs(x, y);
  };
  const fP = fv(a, b);
  const [fx, fy] = grad(fv, a, b, hd).map((d) => tidy(d));

  // Static mesh data: world vertices and per-quad base colour.
  const mesh = useMemo(() => {
    const N1 = n + 1;
    const V: (Vec3 | null)[] = [];
    for (let j = 0; j <= n; j++)
      for (let i = 0; i <= n; i++) {
        const x = x0 + i * grid.dx;
        const y = y0 + j * grid.dy;
        const z = grid.v[j * N1 + i];
        V.push(Number.isFinite(z) && inZ(z) ? W(x, y, z) : null);
      }
    const quads: { v: [number, number, number, number]; t: number; nrm: Vec3 }[] = [];
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        const ids: [number, number, number, number] = [j * N1 + i, j * N1 + i + 1, (j + 1) * N1 + i + 1, (j + 1) * N1 + i];
        if (ids.some((k) => !V[k])) continue;
        const [A, B, C, D] = ids.map((k) => V[k]!);
        const u: Vec3 = [C[0] - A[0], C[1] - A[1], C[2] - A[2]];
        const w: Vec3 = [D[0] - B[0], D[1] - B[1], D[2] - B[2]];
        const nr: Vec3 = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
        const l = Math.hypot(...nr) || 1;
        const zAvg = (A[2] + B[2] + C[2] + D[2]) / 4;
        quads.push({ v: ids, t: (zAvg / ZS + 1) / 2, nrm: [nr[0] / l, nr[1] / l, nr[2] / l] });
      }
    return { V, quads };
  }, [grid, n, x0, y0, z0, z1]); // eslint-disable-line react-hooks/exhaustive-deps

  const floorContours = useMemo(() => {
    if (!feats.includes('contours')) return [] as { L: number; pts: number[] }[];
    const levels = niceLevels(Math.max(z0, grid.lo), Math.min(z1, grid.hi), 10);
    return levels.map((L) => ({ L, pts: contour(grid, L).pts }));
  }, [grid, z0, z1, feats.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  // Curves on the surface: traces through P and the limit paths.
  const lift = (x: number, y: number): Vec3 | null => {
    if (x < x0 - 1e-9 || x > x1 + 1e-9 || y < y0 - 1e-9 || y > y1 + 1e-9) return null;
    const z = f(x, y);
    return Number.isFinite(z) && inZ(z) ? W(x, y, z) : null;
  };
  const curves: { pts: (Vec3 | null)[]; color: string; width: number; dash?: number[] }[] = [];
  if (on.contours) {
    // The same level curves lifted to their heights: horizontal slices of the surface.
    const pts: (Vec3 | null)[] = [];
    for (const { L, pts: seg } of floorContours)
      for (let k = 0; k < seg.length; k += 4) pts.push(W(seg[k], seg[k + 1], L), W(seg[k + 2], seg[k + 3], L), null);
    curves.push({ pts, color: rgba(colors.rgb("--color-ink"), 0.7), width: 1.3 });
  }
  if (on.traces) {
    const K = 120;
    curves.push({ pts: Array.from({ length: K + 1 }, (_, k) => lift(x0 + ((x1 - x0) * k) / K, b)), color: colors.p[1], width: 3 });
    curves.push({ pts: Array.from({ length: K + 1 }, (_, k) => lift(a, y0 + ((y1 - y0) * k) / K)), color: colors.p[2], width: 3 });
    const L = 0.4 * Math.min(hx, hy);
    curves.push({ pts: [W(a - L, b, fP - L * fx), W(a + L, b, fP + L * fx)], color: colors.p[1], width: 2, dash: [6, 4] });
    curves.push({ pts: [W(a, b - L, fP - L * fy), W(a, b + L, fP + L * fy)], color: colors.p[2], width: 2, dash: [6, 4] });
  }
  const pathInfo = on.paths
    ? paths.map((pd, k) => {
        const K = 400;
        const pts: (Vec3 | null)[] = [];
        for (let i = 0; i <= K; i++) {
          const t = -tMax + (2 * tMax * i) / K;
          pts.push(Math.abs(t) < 1e-9 ? null : lift(pd.x(t, m), pd.y(t, m)));
        }
        const e = 1e-8;
        const Lp = tidy(f(pd.x(e, m), pd.y(e, m)), 1e-5);
        const Lm = tidy(f(pd.x(-e, m), pd.y(-e, m)), 1e-5);
        const color = colors.p[PATH_COLORS[k % 3] - 1];
        curves.push({ pts, color, width: 3 });
        return { label: pd.label, Lp, Lm, color, x: pd.x(e * 1e-3, m), y: pd.y(e * 1e-3, m) };
      })
    : [];

  const draw = (ctx: CanvasRenderingContext2D, Pj: Proj) => {
    const dark = colors.dark;
    const halo = colors.surface;
    const stops = ['--plot-1', '--plot-5', '--plot-3', '--plot-4'].map((q) => colors.rgb(q));
    const ZB = -ZS;
    // Floor: outline, axis lines through 0, contour lines, labels.
    const floor: Vec3[] = [
      [-1, -1, ZB],
      [1, -1, ZB],
      [1, 1, ZB],
      [-1, 1, ZB],
    ];
    ctx.beginPath();
    floor.forEach((q, i) => {
      const [sx, sy] = Pj.p(q);
      if (i) ctx.lineTo(sx, sy);
      else ctx.moveTo(sx, sy);
    });
    ctx.closePath();
    ctx.fillStyle = rgba(colors.rgb('--plot-grid'), 0.6);
    ctx.fill();
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.stroke();
    if (x0 < 0 && x1 > 0) line(ctx, Pj, W(0, y0, z0), W(0, y1, z0), colors.axis, 1, [3, 3]);
    if (y0 < 0 && y1 > 0) line(ctx, Pj, W(x0, 0, z0), W(x1, 0, z0), colors.axis, 1, [3, 3]);
    if (on.contours) {
      ctx.strokeStyle = rgba(colors.rgb('--plot-1'), 0.75);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (const { pts: seg } of floorContours)
        for (let k = 0; k < seg.length; k += 4) {
          const [ax, ay] = Pj.p(W(seg[k], seg[k + 1], z0));
          const [bx, by] = Pj.p(W(seg[k + 2], seg[k + 3], z0));
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
        }
      ctx.stroke();
    }
    // Axis names and range labels on the two floor edges nearest the viewer.
    const nearX = Pj.p([0, -1, ZB])[2] > Pj.p([0, 1, ZB])[2] ? -1 : 1; // y-side of the x edge
    const nearY = Pj.p([-1, 0, ZB])[2] > Pj.p([1, 0, ZB])[2] ? -1 : 1;
    const lab = (q: Vec3, s: string, bold = false) => text(ctx, Pj, q, s, colors.text, halo, { size: bold ? 13 : 11, weight: bold ? 600 : 400 });
    lab([0, nearX * 1.24, ZB], 'x', true);
    lab([-0.86, nearX * 1.13, ZB], fmt(x0));
    lab([0.86, nearX * 1.13, ZB], fmt(x1));
    lab([nearY * 1.24, 0, ZB], 'y', true);
    lab([nearY * 1.13, -0.86, ZB], fmt(y0));
    lab([nearY * 1.13, 0.86, ZB], fmt(y1));
    // z axis on the far corner.
    const corner: Vec3 = [-nearY, -nearX, ZB];
    line(ctx, Pj, corner, [corner[0], corner[1], ZS], colors.axis, 1);
    lab([corner[0], corner[1], ZS + 0.12], 'z', true);
    text(ctx, Pj, [corner[0], corner[1], ZB], fmt(z0), colors.text, halo, { size: 11, dx: -8, align: 'right' });
    text(ctx, Pj, [corner[0], corner[1], ZS], fmt(z1), colors.text, halo, { size: 11, dx: -8, align: 'right' });

    // Painter's algorithm over mesh quads, tangent-plane quads and curve segments.
    const S = mesh.V.map((v) => (v ? Pj.p(v) : null));
    const items: Item[] = [];
    mesh.quads.forEach((q, i) => {
      const d = (S[q.v[0]]![2] + S[q.v[1]]![2] + S[q.v[2]]![2] + S[q.v[3]]![2]) / 4;
      items.push({ depth: d, kind: 0, i });
    });
    const planeQuads: Vec3[][] = [];
    if (on.plane && Number.isFinite(fP)) {
      const R = 0.45 * Math.min(hx, hy);
      const K = 6;
      for (let j = 0; j < K; j++)
        for (let i = 0; i < K; i++) {
          const corner2 = (ii: number, jj: number): Vec3 => {
            const x = a - R + (2 * R * ii) / K;
            const y = b - R + (2 * R * jj) / K;
            return W(x, y, fP + fx * (x - a) + fy * (y - b));
          };
          const qd = [corner2(i, j), corner2(i + 1, j), corner2(i + 1, j + 1), corner2(i, j + 1)];
          planeQuads.push(qd);
          items.push({ depth: qd.reduce((s, v) => s + Pj.p(v)[2], 0) / 4 + 0.02, kind: 1, i: planeQuads.length - 1 });
        }
    }
    const segs: { a: Vec3; b: Vec3; c: number }[] = [];
    curves.forEach((cv, ci) => {
      for (let k = 0; k + 1 < cv.pts.length; k++) {
        const A = cv.pts[k];
        const B = cv.pts[k + 1];
        if (!A || !B) continue;
        segs.push({ a: A, b: B, c: ci });
        items.push({ depth: (Pj.p(A)[2] + Pj.p(B)[2]) / 2 + 0.06, kind: 2, i: segs.length - 1 });
      }
    });
    items.sort((p, q) => p.depth - q.depth);

    const L: Vec3 = [Pj.d[0] * 0.55 + Pj.up[0] * 0.75 - Pj.r[0] * 0.35, Pj.d[1] * 0.55 + Pj.up[1] * 0.75 - Pj.r[1] * 0.35, Pj.d[2] * 0.55 + Pj.up[2] * 0.75 - Pj.r[2] * 0.35];
    const Ll = Math.hypot(...L);
    const planeFill = rgba(colors.rgb('--plot-6'), dark ? 0.5 : 0.42);
    const planeEdge = rgba(colors.rgb('--plot-6'), 0.9);
    for (const it of items) {
      if (it.kind === 0) {
        const q = mesh.quads[it.i];
        const c0 = ramp(stops, q.t);
        const c = dark ? c0 : [c0[0] * 0.78 + 56, c0[1] * 0.78 + 56, c0[2] * 0.78 + 56];
        const lit = Math.abs(q.nrm[0] * L[0] + q.nrm[1] * L[1] + q.nrm[2] * L[2]) / Ll;
        const sh = dark ? 0.35 + 0.6 * lit : 0.55 + 0.45 * lit;
        ctx.beginPath();
        for (let k = 0; k < 4; k++) {
          const s = S[q.v[k]]!;
          if (k) ctx.lineTo(s[0], s[1]);
          else ctx.moveTo(s[0], s[1]);
        }
        ctx.closePath();
        ctx.fillStyle = rgba([c[0] * sh, c[1] * sh, c[2] * sh], 1);
        ctx.fill();
        ctx.strokeStyle = dark ? rgba([c[0] * sh * 0.55, c[1] * sh * 0.55, c[2] * sh * 0.55], 1) : rgba([c[0] * sh * 0.72, c[1] * sh * 0.72, c[2] * sh * 0.72], 1);
        ctx.lineWidth = 0.6;
        ctx.stroke();
      } else if (it.kind === 1) {
        const qd = planeQuads[it.i];
        ctx.beginPath();
        qd.forEach((v, k) => {
          const [sx, sy] = Pj.p(v);
          if (k) ctx.lineTo(sx, sy);
          else ctx.moveTo(sx, sy);
        });
        ctx.closePath();
        ctx.fillStyle = planeFill;
        ctx.fill();
        ctx.strokeStyle = planeEdge;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      } else {
        const sg = segs[it.i];
        const cv = curves[sg.c];
        const [ax, ay] = Pj.p(sg.a);
        const [bx, by] = Pj.p(sg.b);
        ctx.beginPath();
        ctx.setLineDash(cv.dash ?? []);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = cv.color;
        ctx.lineWidth = cv.width;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    // Shadows of the paths on the floor, and the limit points.
    for (const [k, pd] of paths.entries()) {
      if (!on.paths) break;
      const K = 200;
      const pts: (Vec3 | null)[] = [];
      for (let i = 0; i <= K; i++) {
        const t = -tMax + (2 * tMax * i) / K;
        const x = pd.x(t, m);
        const y = pd.y(t, m);
        pts.push(x >= x0 && x <= x1 && y >= y0 && y <= y1 ? W(x, y, z0) : null);
      }
      polyline(ctx, Pj, pts, pathInfo[k].color, 1.5, [4, 4]);
    }
    for (const pi of pathInfo) {
      for (const Lv of [pi.Lp, pi.Lm]) if (Number.isFinite(Lv) && inZ(Lv)) dot3(ctx, Pj, W(pi.x, pi.y, Lv), halo, 5, pi.color);
    }
    // P on the surface, its drop line and its shadow (a, b) on the floor.
    if (Number.isFinite(fP)) {
      const top = W(a, b, Math.min(z1, Math.max(z0, fP)));
      line(ctx, Pj, top, W(a, b, z0), colors.ink, 1, [3, 3]);
      dot3(ctx, Pj, W(a, b, z0), colors.ink, 3);
      dot3(ctx, Pj, top, colors.p[0], 6.5, halo);
      text(ctx, Pj, top, 'P', colors.ink, halo, { dx: 12, dy: -10, size: 13, weight: 600 });
    }
  };

  const grabR = 22;
  const onGrab = (sx: number, sy: number, Pj: Proj) => {
    if (!Number.isFinite(fP)) return false;
    const [px, py] = Pj.p(W(a, b, Math.min(z1, Math.max(z0, fP))));
    return Math.hypot(px - sx, py - sy) < grabR;
  };
  const onDrag = (sx: number, sy: number, Pj: Proj) => {
    const Z = W(a, b, Math.min(z1, Math.max(z0, fP)))[2];
    const q = Pj.atHeight(sx, sy, Z);
    if (!q) return;
    setP([Math.min(x1, Math.max(x0, xc + q[0] * hx)), Math.min(y1, Math.max(y0, yc + q[1] * hy))]);
  };

  const shift = (n: string, c: number) => (Math.abs(c) < 1e-12 ? n : `(${n} ${c < 0 ? '+' : '−'} ${fmt(Math.abs(c))})`);
  const plane = `z = ${fmt(fP)} ${fx < 0 ? '−' : '+'} ${fmt(Math.abs(fx))}${shift('x', a)} ${fy < 0 ? '−' : '+'} ${fmt(Math.abs(fy))}${shift('y', b)}`;
  const step = Math.max(0.01, Number(((x1 - x0) / 200).toPrecision(1)));

  return (
    <Frame title={str(params, 'title', 'Surface z = f(x, y)')} caption={caption(params)}>
      <Scene3D cam={cam} onCam={setCam} fit={1.75} draw={draw} onGrab={onGrab} onDrag={onDrag} label={`Graph of z = ${fSrc}`} />
      {feats.length > 0 && (
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {feats.map((q) => (
            <Toggle key={q} label={FEATURE_LABEL[q as Feature]} checked={!!on[q]} onChange={(c) => setOn((s) => ({ ...s, [q]: c }))} />
          ))}
        </div>
      )}
      <Controls cols={2}>
        <Slider label="a (x-coordinate of P)" value={a} min={x0} max={x1} step={step} onChange={(v) => setP([v, b])} />
        <Slider label="b (y-coordinate of P)" value={b} min={y0} max={y1} step={step} onChange={(v) => setP([a, v])} />
        {on.paths && paths.some((q) => q.usesM) && <Slider label="m" value={m} min={mDef[1]} max={mDef[2]} step={0.05} onChange={setM} />}
        <CamSliders cam={cam} onCam={setCam} />
      </Controls>
      <Controls cols={3}>
        <Readout label={<TL>{'f(a,b)'}</TL>} value={fmt(fP, 4)} tone="var(--plot-1)" />
        <Readout label={<TL>{'f_x(a,b)'}</TL>} value={fmt(fx, 4)} tone={on.traces ? 'var(--plot-2)' : undefined} />
        <Readout label={<TL>{'f_y(a,b)'}</TL>} value={fmt(fy, 4)} tone={on.traces ? 'var(--plot-3)' : undefined} />
        {on.paths &&
          pathInfo.map((pi, k) => (
            <Readout
              key={k}
              label={<span className="normal-case">{`along ${pi.label}, as t → 0`}</span>}
              value={Math.abs(pi.Lp - pi.Lm) < 1e-4 || !Number.isFinite(pi.Lm) ? `f → ${fmt(pi.Lp)}` : `f → ${fmt(pi.Lp)} (t > 0), ${fmt(pi.Lm)} (t < 0)`}
              tone={pi.color}
            />
          ))}
      </Controls>
      {on.plane && (
        <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5">
          <div className="text-[11px] uppercase tracking-wide text-ink-3">Tangent plane at P</div>
          <div className="font-mono text-sm tabular-nums" style={{ color: "var(--plot-6)" }}>
            {plane}
          </div>
        </div>
      )}
    </Frame>
  );
}
