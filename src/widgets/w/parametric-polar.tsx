/**
 * parametric-polar: traces a parametric curve (x(t), y(t)) or a polar curve r = f(theta) with a
 * moving point. Parametric mode shows the velocity vector, slope, speed, arc length so far and,
 * optionally, the area under the traced arc. Polar mode shows the ray from the pole, the swept
 * region (shaded) with its area 1/2 * integral of r^2, the arc length, and a graph of r against
 * theta. Derivatives are exact (power-series arithmetic), not differenced.
 *
 * Params:
 *   x, y     strings   parametric mode: expressions in t and slider names
 *   r        string    polar mode: expression in theta (or t) and slider names
 *   r2       string    polar mode: an inner curve; the shaded area is then between r2 and r
 *   t0, t1   number | string   parameter range ("2*pi" allowed)        default 0, 2*pi
 *   t        number | string   initial parameter value                 default t0
 *   sliders  {name: [initial, min, max, step?]}                        default {}
 *   view     [xMin, xMax, yMin, yMax]                                  default fitted to the curve
 *   vector   boolean   velocity vector (parametric) / tangent direction default true
 *   tangent  boolean   tangent line                                     default false
 *   area     boolean   parametric: shade the area under the traced arc, integral of y x'(t) dt
 *                      polar: shade the swept region (default true in polar mode)
 *   rGraph   boolean   polar: also plot r against theta                 default true
 *   duration number    seconds for one sweep when playing               default 6
 *   title, caption   strings
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import type { ExprNode } from '../kit/expr';
import { bool, num, sliders as readSliders, str, view as readView } from '../kit/params';
import { Arrow, Dot, FnPath, Line, Plot, Poly, Segment } from '../kit/Plot';
import { Controls, Frame, Readout, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { useAnimation } from '../kit/hooks';
import { valueAndSlope } from '../kit/calc2-taylor';
import { numExpr, parseOrThrow, piLabel } from '../kit/calc2-num';
import { Legend, ParamSliders, PlayBar, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

const K = 3000;

interface Sample {
  t: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  r2: number;
}

export default function ParametricPolar({ params }: WidgetProps) {
  const polar = typeof params.r === 'string';
  if (!polar && (typeof params.x !== 'string' || typeof params.y !== 'string')) throw new Error('give "x" and "y" (parametric) or "r" (polar)');
  const defs = readSliders(params, 'sliders');
  const t0 = numExpr(params, 't0', 0);
  const t1 = numExpr(params, 't1', 2 * Math.PI);
  if (!(t1 > t0)) throw new Error('parameter "t1" must be greater than "t0"');
  const showVector = bool(params, 'vector', true);
  const showTangent = bool(params, 'tangent', false);
  const showArea = bool(params, 'area', polar);
  const showRGraph = polar && bool(params, 'rGraph', true);
  const duration = Math.max(1, num(params, 'duration', 6));
  const r2Src = polar && typeof params.r2 === 'string' ? str(params, 'r2', '0') : '';

  const { names, args, values, set } = useSliderValues(defs);
  const argKey = args.join(',');
  const [t, setT] = useState(() => clamp(numExpr(params, 't', t0), t0, t1));
  const [playing, setPlaying] = useState(false);

  const varNames = polar ? ['theta', 't'] : ['t'];
  const trees = useMemo((): ExprNode[] => {
    const all = [...varNames, ...names];
    if (polar) return [parseOrThrow(str(params, 'r', '1'), all), ...(r2Src ? [parseOrThrow(r2Src, all)] : [])];
    return [parseOrThrow(str(params, 'x', 't'), all), parseOrThrow(str(params, 'y', 't'), all)];
  }, [params.x, params.y, params.r, r2Src, names.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  const at = useMemo(
    () =>
      (tt: number): Sample => {
        const vars = polar ? [tt, tt, ...args] : [tt, ...args];
        if (polar) {
          const [r, dr] = valueAndSlope(trees[0], tt, vars);
          const r2 = trees[1] ? valueAndSlope(trees[1], tt, vars)[0] : 0;
          const c = Math.cos(tt);
          const s = Math.sin(tt);
          return { t: tt, x: r * c, y: r * s, vx: dr * c - r * s, vy: dr * s + r * c, r, r2 };
        }
        const [x, vx] = valueAndSlope(trees[0], tt, vars);
        const [y, vy] = valueAndSlope(trees[1], tt, vars);
        return { t: tt, x, y, vx, vy, r: NaN, r2: NaN };
      },
    [trees, argKey, polar], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Dense samples with cumulative arc length and area (trapezoid on K steps).
  const track = useMemo(() => {
    const pts: Sample[] = [];
    for (let i = 0; i <= K; i++) pts.push(at(t0 + ((t1 - t0) * i) / K));
    const len = [0];
    const area = [0];
    const h = (t1 - t0) / K;
    const speed = (p: Sample) => Math.hypot(p.vx, p.vy);
    const dA = (p: Sample) => (polar ? 0.5 * (p.r * p.r - p.r2 * p.r2) : p.y * p.vx);
    for (let i = 1; i <= K; i++) {
      const p = pts[i - 1];
      const q = pts[i];
      const ds = (speed(p) + speed(q)) / 2;
      const da = (dA(p) + dA(q)) / 2;
      len.push(len[i - 1] + (Number.isFinite(ds) ? ds * h : 0));
      area.push(area[i - 1] + (Number.isFinite(da) ? da * h : 0));
    }
    return { pts, len, area };
  }, [at, t0, t1, polar]);

  const autoView = useMemo((): [number, number, number, number] => {
    let x0 = polar ? 0 : Infinity;
    let x1 = polar ? 0 : -Infinity;
    let y0 = polar ? 0 : Infinity;
    let y1 = polar ? 0 : -Infinity;
    for (const p of track.pts) {
      if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || Math.abs(p.x) > 1e6 || Math.abs(p.y) > 1e6) continue;
      x0 = Math.min(x0, p.x);
      x1 = Math.max(x1, p.x);
      y0 = Math.min(y0, p.y);
      y1 = Math.max(y1, p.y);
    }
    if (!Number.isFinite(x0)) return [-2, 2, -2, 2];
    const pad = Math.max(x1 - x0, y1 - y0, 1e-6) * 0.12;
    return [x0 - pad, x1 + pad, y0 - pad, y1 + pad];
  }, [track.pts[0], polar]); // eslint-disable-line react-hooks/exhaustive-deps
  const [initialView] = useState(autoView);
  const view = params.view !== undefined ? readView(params, 'view', [-2, 2, -2, 2]) : initialView;

  useAnimation(playing, (dt) => {
    setT((cur) => {
      const nt = cur + ((t1 - t0) * dt) / duration;
      if (nt >= t1) {
        setPlaying(false);
        return t1;
      }
      return nt;
    });
  });

  const P = at(t);
  const fi = ((t - t0) / (t1 - t0)) * K;
  const i0 = clamp(Math.floor(fi), 0, K - 1);
  const w = fi - i0;
  const lenSoFar = track.len[i0] * (1 - w) + track.len[i0 + 1] * w;
  const areaSoFar = track.area[i0] * (1 - w) + track.area[i0 + 1] * w;
  const traced = useMemo(() => {
    const out: [number, number][] = [];
    const step = 4;
    for (let i = 0; i <= i0; i += step) out.push([track.pts[i].x, track.pts[i].y]);
    out.push([P.x, P.y]);
    return out.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
  }, [track, i0, P.x, P.y]);

  const span = Math.max(view[1] - view[0], view[3] - view[2]);
  const maxSpeed = useMemo(() => Math.max(1e-9, ...track.pts.map((p) => Math.hypot(p.vx, p.vy)).filter(Number.isFinite)), [track]);
  const vScale = (0.22 * span) / maxSpeed;
  const speed = Math.hypot(P.vx, P.vy);
  const slope = P.vy / P.vx;
  const slopeText = speed < 1e-9 ? 'undefined (both 0)' : Math.abs(P.vx) < 1e-12 * Math.max(1, speed) ? 'vertical' : fmt(slope, 4);

  // Swept region in polar mode: pole + traced points (or between r2 and r).
  const region = useMemo(() => {
    if (!showArea) return null;
    if (polar && !trees[1]) return [[0, 0] as [number, number], ...traced];
    if (polar) {
      const inner: [number, number][] = [];
      for (let i = i0; i >= 0; i -= 4) {
        const p = track.pts[i];
        inner.push([p.r2 * Math.cos(p.t), p.r2 * Math.sin(p.t)]);
      }
      return [...traced, [P.r2 * Math.cos(t), P.r2 * Math.sin(t)] as [number, number], ...inner];
    }
    // Parametric: between the traced arc and the x-axis.
    const first = traced[0];
    return first ? [[first[0], 0] as [number, number], ...traced, [P.x, 0] as [number, number]] : null;
  }, [showArea, polar, traced, trees, i0, track, P.x, P.r2, t]);

  const tLabel = polar ? '\\theta' : 't';
  const fmtT = (v: number) => (polar ? piLabel(v, 12) : fmt(v, 3));
  const isPiRange = Math.abs((t1 - t0) / Math.PI - Math.round((t1 - t0) / Math.PI)) < 1e-9;

  return (
    <Frame title={str(params, 'title', polar ? 'Polar curve' : 'Parametric curve')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={view} equal label={polar ? `Polar curve r = ${params.r}` : `Parametric curve x = ${params.x}, y = ${params.y}`}>
        {region && region.length > 2 && <Poly points={region} closed fill="var(--plot-3)" fillOpacity={0.22} color="none" width={0} />}
        {polar && trees[1] && <FullCurve pts={track.pts} inner color="var(--plot-5)" />}
        <FullCurve pts={track.pts} color="var(--plot-1)" faint />
        <Poly points={traced} color="var(--plot-1)" width={2.75} />
        {polar && (
          <>
            {P.r < 0 && <Segment x1={0} y1={0} x2={Math.cos(t) * span} y2={Math.sin(t) * span} color="var(--plot-axis)" dash="4 4" width={1.25} />}
            <Segment x1={0} y1={0} x2={P.x} y2={P.y} color="var(--plot-4)" width={2} />
            <Dot x={0} y={0} r={3.5} color="var(--plot-axis)" />
          </>
        )}
        {showTangent && speed > 1e-9 && <Line x={P.x} y={P.y} slope={Math.abs(P.vx) < 1e-12 ? Infinity : slope} color="var(--plot-6)" dash="6 4" width={1.5} />}
        {showVector && speed > 1e-9 && <Arrow x1={P.x} y1={P.y} x2={P.x + P.vx * vScale} y2={P.y + P.vy * vScale} color="var(--plot-6)" width={2.25} />}
        <Dot x={P.x} y={P.y} r={6} color="var(--plot-2)" />
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: polar ? `r=${texOf(String(params.r))}` : 'x(t),\\ y(t)' },
          ...(polar && trees[1] ? [{ color: 'var(--plot-5)', label: `r=${texOf(r2Src)}` }] : []),
          ...(showVector ? [{ color: 'var(--plot-6)', label: polar ? '\\text{velocity }(dx/d\\theta,dy/d\\theta)' : '\\text{velocity }(x\'(t),y\'(t))' }] : []),
          ...(polar ? [{ color: 'var(--plot-4)', label: '\\text{ray at angle }\\theta' }] : []),
          ...(region ? [{ color: 'var(--plot-3)', label: polar ? (trees[1] ? '\\tfrac12\\int(r^2-r_2^2)\\,d\\theta' : '\\tfrac12\\int r^2\\,d\\theta') : '\\int y\\,x\'(t)\\,dt', box: true }] : []),
        ]}
      />
      {showRGraph && (
        <div>
          <div className="mb-1 text-xs text-ink-3">
            <Tex>{'r\\text{ against }\\theta'}</Tex>
          </div>
          <RGraph pts={track.pts} t0={t0} t1={t1} t={t} r={P.r} piTicks={isPiRange} />
        </div>
      )}
      <PlayBar
        playing={playing}
        onPlay={() => {
          if (!playing && t >= t1 - 1e-9) setT(t0);
          setPlaying(!playing);
        }}
        onStep={() => {
          setPlaying(false);
          setT((cur) => Math.min(t1, cur + (t1 - t0) / 24));
        }}
        onReset={() => {
          setPlaying(false);
          setT(t0);
        }}
      />
      <Controls>
        <Slider
          label={<Tex>{tLabel}</Tex>}
          value={t}
          min={t0}
          max={t1}
          step={(t1 - t0) / 480}
          format={fmtT}
          onChange={(v) => {
            setPlaying(false);
            setT(v);
          }}
        />
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      <ReadoutGrid>
        {polar ? (
          <>
            <Readout label="r" value={fmt(P.r, 4)} tone="var(--plot-4)" />
            <Readout label="Point (x, y)" value={`(${fmt(P.x, 3)}, ${fmt(P.y, 3)})`} tone="var(--plot-2)" />
            <Readout label="Slope dy/dx" value={slopeText} tone="var(--plot-6)" />
            <Readout label="Swept area so far" value={fmt(areaSoFar, 5)} tone="var(--plot-3)" />
            <Readout label="Arc length so far" value={fmt(lenSoFar, 5)} tone="var(--plot-1)" />
            <Readout label="Totals over the range" value={`A = ${fmt(track.area[K], 4)}, L = ${fmt(track.len[K], 4)}`} />
          </>
        ) : (
          <>
            <Readout label="Point (x, y)" value={`(${fmt(P.x, 3)}, ${fmt(P.y, 3)})`} tone="var(--plot-2)" />
            <Readout label="Slope dy/dx" value={slopeText} tone="var(--plot-6)" />
            <Readout label="Speed" value={fmt(speed, 4)} tone="var(--plot-6)" />
            <Readout label="Arc length so far" value={fmt(lenSoFar, 5)} tone="var(--plot-1)" />
            {showArea && <Readout label="Area so far" value={fmt(areaSoFar, 5)} tone="var(--plot-3)" />}
            <Readout label="Totals over the range" value={`L = ${fmt(track.len[K], 4)}${showArea ? `, A = ${fmt(track.area[K], 4)}` : ''}`} />
          </>
        )}
      </ReadoutGrid>
    </Frame>
  );
}

/** Light TeX for an expression: theta to \theta, * dropped, pi to \pi. */
function texOf(s: string): string {
  return s
    .replace(/\btheta\b/g, '\\theta ')
    .replace(/\bpi\b/g, '\\pi ')
    .replace(/\b(sin|cos|tan|exp|ln|sqrt)\b/g, '\\$1')
    .replace(/\*/g, '');
}

function FullCurve({ pts, color, faint, inner }: { pts: Sample[]; color: string; faint?: boolean; inner?: boolean }) {
  const path = useMemo(() => {
    const out: [number, number][] = [];
    for (let i = 0; i < pts.length; i += 3) {
      const p = pts[i];
      const xy: [number, number] = inner ? [p.r2 * Math.cos(p.t), p.r2 * Math.sin(p.t)] : [p.x, p.y];
      if (Number.isFinite(xy[0]) && Number.isFinite(xy[1])) out.push(xy);
    }
    return out;
  }, [pts, inner]);
  return <Poly points={path} color={color} width={faint ? 1.5 : 2.25} opacity={faint ? 0.35 : 1} />;
}

function RGraph({ pts, t0, t1, t, r, piTicks }: { pts: Sample[]; t0: number; t1: number; t: number; r: number; piTicks: boolean }) {
  const [lo, hi] = useMemo(() => {
    const rs = pts.map((p) => p.r).filter((v) => Number.isFinite(v) && Math.abs(v) < 1e6);
    const a = Math.min(0, ...rs);
    const b = Math.max(0, ...rs);
    const pad = Math.max(b - a, 1e-6) * 0.12;
    return [a - pad, b + pad];
  }, [pts]);
  const f = useMemo(() => {
    const n = pts.length - 1;
    return (x: number) => {
      const i = clamp(Math.round(((x - t0) / (t1 - t0)) * n), 0, n);
      return pts[i].r;
    };
  }, [pts, t0, t1]);
  return (
    <Plot view={[t0, t1, lo, hi]} aspect={0.28} minHeight={120} maxHeight={180} xStep={piTicks ? Math.PI / 4 : undefined} xTickFormat={piTicks ? (v) => piLabel(v, 4) : undefined} label="r against theta">
      <FnPath f={f} color="var(--plot-1)" width={2} />
      <Segment x1={t} y1={0} x2={t} y2={r} color="var(--plot-4)" width={2} />
      <Dot x={t} y={r} r={4.5} color="var(--plot-2)" />
    </Plot>
  );
}
