/**
 * double-integral: pictures of a double integral, in up to three modes.
 *
 *   boxes   Riemann boxes over a rectangle R in 3D: n × n boxes with heights f at the sample
 *           points, their total volume against the integral (drag to rotate)
 *   slices  a region described as type I (a ≤ x ≤ b, g1(x) ≤ y ≤ g2(x)) and/or type II
 *           (c ≤ y ≤ d, h1(y) ≤ x ≤ h2(y)): the typical line across the region gives the inner
 *           limits, the inner integral A is graphed below, and n strips approximate the total
 *   polar   a polar grid over α ≤ θ ≤ β, r1 ≤ r ≤ r2: one polar rectangle highlighted with its area
 *           against r Δr Δθ, and the polar Riemann sum Σ f r Δr Δθ against the integral
 *
 * Params:
 *   f        string   integrand in x and y                                  default "1"
 *   modes    string[] modes offered, first shown first                      default ["slices"]
 *   rect     [a, b, c, d]   boxes: the rectangle R                          default [0, 2, 0, 2]
 *   n        number   boxes: initial n; slices: initial number of strips   default 4
 *   sample   "mid" | "corner"   boxes: sample point in each box            default "mid"
 *   I        [a, b, "g1(x)", "g2(x)"]   type I description of the region
 *   II       [c, d, "h1(y)", "h2(y)"]   type II description of the region   (give I, II or both)
 *   polar    [r1, r2, α, β]   polar: the region (angles in radians)        default [0, 2, 0, 2π]
 *   view     [xMin, xMax, yMin, yMax]   slices/polar view                  default fitted
 *   title    string                                                         default "Double integral"
 *   caption  string   may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { num, numArray, oneOf, str, strArray, view as readView } from '../kit/params';
import { Dot, Plot, Poly, Rect, Segment, usePlot } from '../kit/Plot';
import { Controls, Frame, Readout, Segmented, Slider } from '../kit/controls';
import { fmt, niceStep, simpson } from '../kit/num';
import { CamSliders, Scene3D, line, text, type Cam, type Proj, type Vec3 } from '../kit/calc3-3d';
import { ramp } from '../kit/calc3-contour';
import { caption, rgba, TL, useColors } from '../kit/calc3-ui';

const MODES = ['boxes', 'slices', 'polar'] as const;
type Mode = (typeof MODES)[number];
const MODE_LABEL: Record<Mode, string> = { boxes: 'Riemann boxes', slices: 'Slices', polar: 'Polar rectangles' };
const ZS = 0.8;
type F1 = (t: number) => number;

function c1(src: string, v: string, what: string): F1 {
  const r = tryCompile(src, [v]);
  if (!r.fn) throw new Error(`${what}: ${r.error}`);
  const fn = r.fn;
  return (t) => fn(t);
}

interface Desc {
  lo: number;
  hi: number;
  g1: F1;
  g2: F1;
  s1: string;
  s2: string;
}

function readDesc(p: Record<string, unknown>, key: 'I' | 'II'): Desc | null {
  const v = p[key];
  if (v === undefined) return null;
  if (!Array.isArray(v) || v.length !== 4 || typeof v[0] !== 'number' || typeof v[1] !== 'number' || typeof v[2] !== 'string' || typeof v[3] !== 'string' || !(v[0] < v[1]))
    throw new Error(`parameter "${key}" should be [low, high, "lower curve", "upper curve"] with low < high, got ${JSON.stringify(v)}`);
  const w = key === 'I' ? 'x' : 'y';
  return { lo: v[0], hi: v[1], g1: c1(v[2], w, `${key} lower curve`), g2: c1(v[3], w, `${key} upper curve`), s1: v[2], s2: v[3] };
}

function Region({ d, type, fill, opacity }: { d: Desc; type: 'I' | 'II'; fill: string; opacity: number }) {
  const { sx, sy } = usePlot();
  const K = 160;
  const pts: string[] = [];
  for (let k = 0; k <= K; k++) {
    const t = d.lo + ((d.hi - d.lo) * k) / K;
    pts.push(type === 'I' ? `${sx(t).toFixed(1)},${sy(d.g2(t)).toFixed(1)}` : `${sx(d.g2(t)).toFixed(1)},${sy(t).toFixed(1)}`);
  }
  for (let k = K; k >= 0; k--) {
    const t = d.lo + ((d.hi - d.lo) * k) / K;
    pts.push(type === 'I' ? `${sx(t).toFixed(1)},${sy(d.g1(t)).toFixed(1)}` : `${sx(d.g1(t)).toFixed(1)},${sy(t).toFixed(1)}`);
  }
  return <polygon points={pts.join(' ')} fill={fill} fillOpacity={opacity} stroke={fill} strokeWidth={2} strokeLinejoin="round" />;
}

function PolarCell({ r1, r2, t1, t2, fill, opacity, stroke, width = 1 }: { r1: number; r2: number; t1: number; t2: number; fill?: string; opacity?: number; stroke?: string; width?: number }) {
  const { sx, sy } = usePlot();
  const K = 12;
  const pts: string[] = [];
  for (let k = 0; k <= K; k++) {
    const t = t1 + ((t2 - t1) * k) / K;
    pts.push(`${sx(r2 * Math.cos(t)).toFixed(1)},${sy(r2 * Math.sin(t)).toFixed(1)}`);
  }
  for (let k = K; k >= 0; k--) {
    const t = t1 + ((t2 - t1) * k) / K;
    pts.push(`${sx(r1 * Math.cos(t)).toFixed(1)},${sy(r1 * Math.sin(t)).toFixed(1)}`);
  }
  return <polygon points={pts.join(' ')} fill={fill ?? 'none'} fillOpacity={opacity} stroke={stroke ?? 'none'} strokeWidth={width} strokeLinejoin="round" />;
}

export default function DoubleIntegral({ params }: WidgetProps) {
  const fSrc = str(params, 'f', '1');
  const f = useMemo(() => {
    const r = tryCompile(fSrc, ['x', 'y']);
    if (!r.fn) throw new Error(`f: ${r.error}`);
    const fn = r.fn;
    return (x: number, y: number) => fn(x, y);
  }, [fSrc]);
  const modeList = strArray(params, 'modes', ['slices']);
  for (const m of modeList) if (!MODES.includes(m as Mode)) throw new Error(`parameter "modes": unknown mode "${m}" (use ${MODES.join(', ')})`);
  const modes = modeList as Mode[];
  const rect = numArray(params, 'rect', [0, 2, 0, 2]);
  if (rect.length !== 4 || !(rect[0] < rect[1]) || !(rect[2] < rect[3])) throw new Error('parameter "rect" should be [a, b, c, d] with a < b and c < d');
  const sample = oneOf(params, 'sample', ['mid', 'corner'] as const, 'mid');
  const dI = useMemo(() => readDesc(params, 'I'), [JSON.stringify(params.I)]); // eslint-disable-line react-hooks/exhaustive-deps
  const dII = useMemo(() => readDesc(params, 'II'), [JSON.stringify(params.II)]); // eslint-disable-line react-hooks/exhaustive-deps
  if (modes.includes('slices') && !dI && !dII) throw new Error('slices mode needs a region: give "I" and/or "II"');
  const pol = numArray(params, 'polar', [0, 2, 0, 2 * Math.PI]);
  if (pol.length !== 4 || !(pol[0] >= 0 && pol[0] < pol[1]) || !(pol[2] < pol[3])) throw new Error('parameter "polar" should be [r1, r2, α, β] with 0 ≤ r1 < r2 and α < β');

  const [mode, setMode] = useState<Mode>(modes[0]);
  const [n, setN] = useState(() => Math.round(num(params, 'n', 4)));
  const [order, setOrder] = useState<'I' | 'II'>(dI ? 'I' : 'II');
  const [pos, setPos] = useState(0.4);
  const [nr, setNr] = useState(4);
  const [nt, setNt] = useState(12);
  const [cell, setCell] = useState<[number, number]>([2, 1]);
  const [cam, setCam] = useState<Cam>({ az: 32, el: 24 });
  const colors = useColors();

  // ----- slices -----
  const d = order === 'I' ? dI : dII;
  const inner = (t: number) => {
    if (!d) return NaN;
    const a = d.g1(t);
    const b = d.g2(t);
    return simpson((s) => (order === 'I' ? f(t, s) : f(s, t)), a, b, 120);
  };
  const total = useMemo(() => (d ? simpson(inner, d.lo, d.hi, 200) : NaN), [d, f, order]); // eslint-disable-line react-hooks/exhaustive-deps
  const regionView = useMemo<[number, number, number, number]>(() => {
    if (params.view !== undefined) return readView(params, 'view', [-1, 1, -1, 1]);
    if (mode === 'polar') return [-pol[1] * 1.15, pol[1] * 1.15, -pol[1] * 1.15, pol[1] * 1.15];
    let x0 = Infinity;
    let x1 = -Infinity;
    let y0 = Infinity;
    let y1 = -Infinity;
    for (const [dd, ty] of [
      [dI, 'I'],
      [dII, 'II'],
    ] as [Desc | null, string][]) {
      if (!dd) continue;
      for (let k = 0; k <= 50; k++) {
        const t = dd.lo + ((dd.hi - dd.lo) * k) / 50;
        for (const g of [dd.g1(t), dd.g2(t)]) {
          const [x, y] = ty === 'I' ? [t, g] : [g, t];
          x0 = Math.min(x0, x);
          x1 = Math.max(x1, x);
          y0 = Math.min(y0, y);
          y1 = Math.max(y1, y);
        }
      }
    }
    const px = (x1 - x0) * 0.2 + 0.1;
    const py = (y1 - y0) * 0.2 + 0.1;
    return [x0 - px, x1 + px, y0 - py, y1 + py];
  }, [mode, dI, dII, JSON.stringify(params.view), pol.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const tPos = d ? d.lo + pos * (d.hi - d.lo) : 0;
  const strips = d
    ? Array.from({ length: n }, (_, k) => {
        const w = (d.hi - d.lo) / n;
        const t = d.lo + (k + 0.5) * w;
        return { t0: d.lo + k * w, t1: d.lo + (k + 1) * w, t, A: inner(t), w };
      })
    : [];
  const stripSum = strips.reduce((s, q) => s + q.A * q.w, 0);
  const Aprofile = useMemo(() => {
    if (!d) return [] as [number, number][];
    return Array.from({ length: 101 }, (_, k) => {
      const t = d.lo + ((d.hi - d.lo) * k) / 100;
      return [t, inner(t)] as [number, number];
    });
  }, [d, f, order]); // eslint-disable-line react-hooks/exhaustive-deps

  // ----- boxes -----
  const [a, b, c, dd] = rect;
  const boxes = useMemo(() => {
    const dx = (b - a) / n;
    const dy = (dd - c) / n;
    const out: { x0: number; y0: number; z: number }[] = [];
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        const sxp = sample === 'mid' ? a + (i + 0.5) * dx : a + (i + 1) * dx;
        const syp = sample === 'mid' ? c + (j + 0.5) * dy : c + (j + 1) * dy;
        out.push({ x0: a + i * dx, y0: c + j * dy, z: f(sxp, syp) });
      }
    return { list: out, dx, dy };
  }, [a, b, c, dd, n, f, sample]);
  const boxSum = boxes.list.reduce((s, q) => s + q.z, 0) * boxes.dx * boxes.dy;
  const rectExact = useMemo(() => simpson((x) => simpson((y) => f(x, y), c, dd, 80), a, b, 80), [f, a, b, c, dd]);
  const zr = useMemo(() => {
    let lo = 0;
    let hi = 0;
    for (let j = 0; j <= 24; j++)
      for (let i = 0; i <= 24; i++) {
        const z = f(a + ((b - a) * i) / 24, c + ((dd - c) * j) / 24);
        if (Number.isFinite(z)) (lo = Math.min(lo, z)), (hi = Math.max(hi, z));
      }
    if (hi - lo < 1e-9) hi = lo + 1;
    const st = niceStep(hi - lo, 5);
    return [Math.floor(lo / st - 1e-9) * st, Math.ceil(hi / st + 1e-9) * st];
  }, [f, a, b, c, dd]);

  const drawBoxes = (ctx: CanvasRenderingContext2D, P: Proj) => {
    const [z0, z1] = zr;
    const xc = (a + b) / 2;
    const yc = (c + dd) / 2;
    const hx = (b - a) / 2;
    const hy = (dd - c) / 2;
    const zc = (z0 + z1) / 2;
    const hz = (z1 - z0) / 2;
    const W = (x: number, y: number, z: number): Vec3 => [(x - xc) / hx, (y - yc) / hy, ((z - zc) / hz) * ZS];
    const halo = colors.surface;
    const stops = ['--plot-1', '--plot-5', '--plot-3', '--plot-4'].map((q) => colors.rgb(q));
    // Floor and labels.
    const fl = [W(a, c, 0), W(b, c, 0), W(b, dd, 0), W(a, dd, 0)].map((q) => P.p(q));
    ctx.beginPath();
    fl.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.fillStyle = rgba(colors.rgb('--plot-grid'), 0.6);
    ctx.fill();
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.stroke();
    text(ctx, P, W(xc, c - hy * 0.25, 0), 'x', colors.text, halo, { size: 13, weight: 600 });
    text(ctx, P, W(a - hx * 0.25, yc, 0), 'y', colors.text, halo, { size: 13, weight: 600 });
    text(ctx, P, W(a, c - hy * 0.13, 0), fmt(a), colors.text, halo, { size: 11 });
    text(ctx, P, W(b, c - hy * 0.13, 0), fmt(b), colors.text, halo, { size: 11 });
    text(ctx, P, W(a - hx * 0.13, dd, 0), fmt(dd), colors.text, halo, { size: 11 });
    line(ctx, P, W(a, dd, z0), W(a, dd, z1), colors.axis, 1);
    text(ctx, P, W(a, dd, z1), `z = ${fmt(z1)}`, colors.text, halo, { size: 11, dy: -10 });
    // Faces of all boxes, far first.
    type Face = { pts: Vec3[]; depth: number; col: string };
    const faces: Face[] = [];
    for (const q of boxes.list) {
      if (!Number.isFinite(q.z)) continue;
      const x0 = q.x0;
      const x1 = q.x0 + boxes.dx;
      const y0 = q.y0;
      const y1 = q.y0 + boxes.dy;
      const zb = 0;
      const zt = q.z;
      const base = ramp(stops, (zt - z0) / (z1 - z0 || 1));
      const sh = (k: number) => rgba([base[0] * k, base[1] * k, base[2] * k], colors.dark ? 0.92 : 0.88);
      const pushF = (pts: Vec3[], k: number) => faces.push({ pts, depth: pts.reduce((s, v) => s + P.p(v)[2], 0) / pts.length, col: sh(k) });
      pushF([W(x0, y0, zt), W(x1, y0, zt), W(x1, y1, zt), W(x0, y1, zt)], 1);
      pushF([W(x0, y0, zb), W(x1, y0, zb), W(x1, y0, zt), W(x0, y0, zt)], 0.72);
      pushF([W(x0, y1, zb), W(x1, y1, zb), W(x1, y1, zt), W(x0, y1, zt)], 0.72);
      pushF([W(x0, y0, zb), W(x0, y1, zb), W(x0, y1, zt), W(x0, y0, zt)], 0.84);
      pushF([W(x1, y0, zb), W(x1, y1, zb), W(x1, y1, zt), W(x1, y0, zt)], 0.84);
    }
    faces.sort((p, q) => p.depth - q.depth);
    const edge = rgba(colors.rgb('--color-surface'), 0.55);
    for (const fc of faces) {
      ctx.beginPath();
      fc.pts.forEach((v, i) => {
        const [x, y] = P.p(v);
        if (i) ctx.lineTo(x, y);
        else ctx.moveTo(x, y);
      });
      ctx.closePath();
      ctx.fillStyle = fc.col;
      ctx.fill();
      ctx.strokeStyle = edge;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    // The surface as a light wireframe on top.
    ctx.strokeStyle = rgba(colors.rgb('--color-ink'), 0.45);
    ctx.lineWidth = 1;
    const K = 16;
    for (let k = 0; k <= K; k++) {
      for (const dir of [0, 1]) {
        ctx.beginPath();
        for (let m = 0; m <= 40; m++) {
          const u = k / K;
          const v = m / 40;
          const x = dir ? a + (b - a) * u : a + (b - a) * v;
          const y = dir ? c + (dd - c) * v : c + (dd - c) * u;
          const [px, py] = P.p(W(x, y, f(x, y)));
          if (m) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        ctx.stroke();
      }
    }
  };

  // ----- polar -----
  const [r1, r2, al, be] = pol;
  const dr = (r2 - r1) / nr;
  const dth = (be - al) / nt;
  const fp = (r: number, t: number) => f(r * Math.cos(t), r * Math.sin(t));
  const polarSum = useMemo(() => {
    let s = 0;
    for (let i = 0; i < nr; i++)
      for (let j = 0; j < nt; j++) {
        const r = r1 + (i + 0.5) * dr;
        const t = al + (j + 0.5) * dth;
        s += fp(r, t) * r * dr * dth;
      }
    return s;
  }, [f, nr, nt, r1, r2, al, be]); // eslint-disable-line react-hooks/exhaustive-deps
  const polarExact = useMemo(() => simpson((t) => simpson((r) => fp(r, t) * r, r1, r2, 80), al, be, 120), [f, r1, r2, al, be]); // eslint-disable-line react-hooks/exhaustive-deps
  const ci = Math.min(cell[0], nr - 1);
  const cj = Math.min(cell[1], nt - 1);
  const cr1 = r1 + ci * dr;
  const cr2 = cr1 + dr;
  const ct1 = al + cj * dth;
  const cellExact = 0.5 * (cr2 * cr2 - cr1 * cr1) * dth;
  const cellApprox = (cr1 + dr / 2) * dr * dth;
  const polarCells = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    const out: { i: number; j: number; v: number }[] = [];
    for (let i = 0; i < nr; i++)
      for (let j = 0; j < nt; j++) {
        const v = fp(r1 + (i + 0.5) * dr, al + (j + 0.5) * dth);
        out.push({ i, j, v });
        if (Number.isFinite(v)) (lo = Math.min(lo, v)), (hi = Math.max(hi, v));
      }
    return out.map((q) => ({ ...q, t: hi > lo ? (q.v - lo) / (hi - lo) : 0.5 }));
  }, [f, nr, nt, r1, r2, al, be]); // eslint-disable-line react-hooks/exhaustive-deps
  const pstops = ['--plot-1', '--plot-5', '--plot-3', '--plot-4'].map((q) => colors.rgb(q));

  const orderLabel = (o: 'I' | 'II') => (o === 'I' ? 'Type I: dy dx' : 'Type II: dx dy');

  return (
    <Frame title={str(params, 'title', 'Double integral')} caption={caption(params)}>
      {modes.length > 1 && <Segmented label="Show" options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={setMode} />}

      {mode === 'boxes' && (
        <>
          <Scene3D cam={cam} onCam={setCam} fit={1.75} draw={drawBoxes} label={`${n} by ${n} Riemann boxes under z = ${fSrc}`} />
          <Controls cols={2}>
            <Slider label="n (boxes per side)" value={n} min={1} max={20} step={1} onChange={(v) => setN(Math.round(v))} />
            <CamSliders cam={cam} onCam={setCam} />
          </Controls>
          <Controls cols={3}>
            <Readout label={<TL>{'\\sum f(x_i^*,y_j^*)\\,\\Delta A'}</TL>} value={fmt(boxSum, 5)} tone="var(--plot-4)" />
            <Readout label={<TL>{'\\iint_R f\\,dA'}</TL>} value={fmt(rectExact, 5)} tone="var(--plot-1)" />
            <Readout label="Error" value={fmt(boxSum - rectExact, 3)} />
          </Controls>
        </>
      )}

      {mode === 'slices' && d && (
        <>
          {dI && dII && <Segmented label="Order of integration" options={(['I', 'II'] as const).map((o) => ({ value: o, label: orderLabel(o) }))} value={order} onChange={setOrder} />}
          <Plot view={regionView} equal aspect={0.7} maxHeight={420} label="The region of integration">
            <Region d={d} type={order} fill="var(--plot-1)" opacity={0.16} />
            {strips.map((q, k) =>
              order === 'I' ? (
                <Poly
                  key={k}
                  closed
                  points={[
                    [q.t0, d.g1(q.t)],
                    [q.t1, d.g1(q.t)],
                    [q.t1, d.g2(q.t)],
                    [q.t0, d.g2(q.t)],
                  ]}
                  color="var(--plot-1)"
                  width={0.75}
                  fill="var(--plot-1)"
                  fillOpacity={0.1}
                />
              ) : (
                <Poly
                  key={k}
                  closed
                  points={[
                    [d.g1(q.t), q.t0],
                    [d.g2(q.t), q.t0],
                    [d.g2(q.t), q.t1],
                    [d.g1(q.t), q.t1],
                  ]}
                  color="var(--plot-1)"
                  width={0.75}
                  fill="var(--plot-1)"
                  fillOpacity={0.1}
                />
              ),
            )}
            {order === 'I' ? (
              <>
                <Segment x1={tPos} y1={d.g1(tPos)} x2={tPos} y2={d.g2(tPos)} color="var(--plot-4)" width={3.5} />
                <Dot x={tPos} y={d.g1(tPos)} color="var(--plot-2)" />
                <Dot x={tPos} y={d.g2(tPos)} color="var(--plot-3)" />
              </>
            ) : (
              <>
                <Segment x1={d.g1(tPos)} y1={tPos} x2={d.g2(tPos)} y2={tPos} color="var(--plot-4)" width={3.5} />
                <Dot x={d.g1(tPos)} y={tPos} color="var(--plot-2)" />
                <Dot x={d.g2(tPos)} y={tPos} color="var(--plot-3)" />
              </>
            )}
          </Plot>
          <Controls cols={2}>
            <Slider label={order === 'I' ? 'Position of the typical line, x' : 'Position of the typical line, y'} value={tPos} min={d.lo} max={d.hi} step={(d.hi - d.lo) / 200} onChange={(v) => setPos((v - d.lo) / (d.hi - d.lo))} />
            <Slider label="Number of strips" value={n} min={1} max={40} step={1} onChange={(v) => setN(Math.round(v))} />
          </Controls>
          <Controls cols={3}>
            <Readout label={order === 'I' ? <span className="normal-case">y runs from g₁(x) to g₂(x)</span> : <span className="normal-case">x runs from h₁(y) to h₂(y)</span>} value={`${d.s1} → ${d.s2}`} />
            <Readout label={<span className="normal-case">{order === 'I' ? 'here: y from' : 'here: x from'}</span>} value={`${fmt(d.g1(tPos))} to ${fmt(d.g2(tPos))}`} tone="var(--plot-4)" />
            <Readout label={<TL>{order === 'I' ? 'A(x)=\\int f\\,dy' : 'A(y)=\\int f\\,dx'}</TL>} value={fmt(inner(tPos), 4)} tone="var(--plot-4)" />
            <Readout label={<span className="normal-case">{`outer limits: ${order === 'I' ? 'x' : 'y'} from ${fmt(d.lo)} to ${fmt(d.hi)}`}</span>} value={`${n} strips: ${fmt(stripSum, 4)}`} />
            <Readout label={<TL>{'\\iint_D f\\,dA'}</TL>} value={fmt(total, 5)} tone="var(--plot-1)" />
          </Controls>
          <div>
            <div className="mb-1 text-[13px] text-ink-2">{order === 'I' ? 'The inner integral A(x) against x: the outer integral is the area under this graph' : 'The inner integral A(y) against y: the outer integral is the area under this graph'}</div>
            <Plot view={profileView(Aprofile, d)} aspect={0.3} minHeight={130} maxHeight={190} xLabel={order === 'I' ? 'x' : 'y'} label="Graph of the inner integral">
              {strips.map((q, k) => (
                <Rect key={k} x={q.t0} y={0} w={q.w} h={q.A} fill="var(--plot-1)" opacity={0.18} color="var(--plot-1)" width={0.75} />
              ))}
              <Poly points={Aprofile} color="var(--plot-4)" width={2} />
              <Dot x={tPos} y={inner(tPos)} color="var(--plot-4)" />
            </Plot>
          </div>
        </>
      )}

      {mode === 'polar' && (
        <>
          <Plot view={regionView} equal aspect={0.8} maxHeight={440} label="Polar rectangles">
            {polarCells.map((q) => {
              const col = ramp(pstops, q.t);
              return (
                <PolarCell
                  key={`${q.i},${q.j}`}
                  r1={r1 + q.i * dr}
                  r2={r1 + (q.i + 1) * dr}
                  t1={al + q.j * dth}
                  t2={al + (q.j + 1) * dth}
                  fill={`rgb(${col.map(Math.round).join(',')})`}
                  opacity={colors.dark ? 0.45 : 0.38}
                  stroke="var(--plot-text)"
                  width={0.6}
                />
              );
            })}
            <PolarCell r1={cr1} r2={cr2} t1={ct1} t2={ct1 + dth} stroke="var(--color-ink)" width={3} />
          </Plot>
          <Controls cols={2}>
            <Slider label="Rings (divisions of r)" value={nr} min={1} max={24} step={1} onChange={(v) => setNr(Math.round(v))} />
            <Slider label="Sectors (divisions of θ)" value={nt} min={2} max={72} step={1} onChange={(v) => setNt(Math.round(v))} />
            <Slider label="Highlighted cell: ring" value={ci + 1} min={1} max={nr} step={1} onChange={(v) => setCell([Math.round(v) - 1, cj])} />
            <Slider label="Highlighted cell: sector" value={cj + 1} min={1} max={nt} step={1} onChange={(v) => setCell([ci, Math.round(v) - 1])} />
          </Controls>
          <Controls cols={3}>
            <Readout label="Area of highlighted cell" value={fmt(cellExact, 4)} />
            <Readout label={<TL>{'r\\,\\Delta r\\,\\Delta\\theta'}</TL>} value={fmt(cellApprox, 4)} />
            <Readout label={<TL>{'\\Delta r\\,\\Delta\\theta\\ \\text{(no }r)'}</TL>} value={fmt(dr * dth, 4)} />
            <Readout label={<TL>{'\\sum f\\,r\\,\\Delta r\\,\\Delta\\theta'}</TL>} value={fmt(polarSum, 5)} tone="var(--plot-4)" />
            <Readout label={<TL>{'\\iint_D f\\,dA'}</TL>} value={fmt(polarExact, 5)} tone="var(--plot-1)" />
          </Controls>
        </>
      )}
    </Frame>
  );
}

function profileView(pts: [number, number][], d: Desc): [number, number, number, number] {
  const ys = pts.map((p) => p[1]).filter(Number.isFinite);
  let lo = Math.min(0, ...ys);
  let hi = Math.max(0, ...ys);
  if (hi - lo < 1e-9) hi = lo + 1;
  const pad = (hi - lo) * 0.12;
  lo = lo < 0 ? lo - pad : lo;
  hi += pad;
  const w = d.hi - d.lo;
  return [d.lo - w * 0.04, d.hi + w * 0.04, lo, hi];
}
