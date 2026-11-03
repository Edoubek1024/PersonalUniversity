/**
 * contour-gradient: a contour map of f(x, y) with a draggable point P, in up to five modes that
 * share the picture.
 *
 *   level     the level curve through P is highlighted; readout f(P)
 *   partials  P, P + h i and P + h j with the difference quotients, which tend to f_x and f_y
 *   gradient  ∇f at P (perpendicular to the level curve), a unit vector u with a draggable tip,
 *             D_u f = ∇f · u drawn as the shadow of ∇f on u, and the maximum rate |∇f|
 *   critical  every critical point in view, classified by D = f_xx f_yy − f_xy²
 *   lagrange  a constraint curve g = c; P slides along it, ∇f and ∇g are drawn, and the
 *             readout says when they are parallel. With `region`, the set g ≤ c is shaded and
 *             interior critical points join the list of candidates (absolute extrema).
 *
 * Params:
 *   f          string     expression in x and y                          default "x^2 + 3*x*y"
 *   view       [xMin, xMax, yMin, yMax]  (equal scale on both axes)      default [-3, 3, -3, 3]
 *   modes      string[]   modes offered, first shown first               default ["gradient"]
 *   point      [x, y]     initial P                                       default [1, 1]
 *   angle      number     initial direction of u, degrees from +x         default 0
 *   levels     number | number[]   how many contour levels, or the levels  default 12
 *   fill       boolean    colour the bands between contours              default true
 *   h          number     partials: initial step h                       default 0.5
 *   g          string     lagrange: constraint function of x and y       default "x^2 + y^2"
 *   c          number     lagrange: constraint level                     default 1
 *   region     boolean    lagrange: shade g ≤ c, include interior critical points   default false
 *   candidates boolean    lagrange: show the candidate list at first     default false
 *   profile    boolean    lagrange: graph of f along the constraint      default = region
 *   title      string                                                    default "Contour map and gradient"
 *   caption    string     may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { bool, num, numArray, str, strArray, view as readView } from '../kit/params';
import { Arrow, Dot, Draggable, Label, Plot, Poly, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { fmt } from '../kit/num';
import {
  bandOf,
  chainPath,
  chains as levelChains,
  contour,
  criticalPoints,
  grad,
  hessian,
  classify,
  nearestOnChains,
  niceLevels,
  projectToLevel,
  ramp,
  rasterize,
  sampleGrid,
  segPath,
  tidy,
  type Chain,
  type CritKind,
  type F2,
  type V4,
} from '../kit/calc3-contour';
import { caption, point, TL, useColors } from '../kit/calc3-ui';

const MODES = ['level', 'partials', 'gradient', 'critical', 'lagrange'] as const;
type Mode = (typeof MODES)[number];
const MODE_LABEL: Record<Mode, string> = { level: 'Level curves', partials: 'Partials', gradient: 'Gradient', critical: 'Critical points', lagrange: 'Constraint' };
const KIND_LABEL: Record<CritKind, string> = { min: 'local min', max: 'local max', saddle: 'saddle', degenerate: 'D = 0: test fails' };
const KIND_COLOR: Record<CritKind, string> = { min: 'var(--plot-3)', max: 'var(--plot-2)', saddle: 'var(--plot-4)', degenerate: 'var(--plot-6)' };

function compile2(src: string, what: string): F2 {
  const r = tryCompile(src, ['x', 'y']);
  if (!r.fn) throw new Error(`${what}: ${r.error}`);
  const fn = r.fn;
  return (x, y) => fn(x, y);
}

/** Parametrisation of a level-curve chain: polar angle about its centre when closed, arc fraction when open. */
interface ChainParam {
  closed: boolean;
  cx: number;
  cy: number;
  cum: number[];
  L: number;
}

function paramOf(c: Chain): ChainParam {
  const pts = c.closed ? c.pts.slice(0, -1) : c.pts;
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const cum = [0];
  for (let k = 1; k < c.pts.length; k++) cum.push(cum[k - 1] + Math.hypot(c.pts[k][0] - c.pts[k - 1][0], c.pts[k][1] - c.pts[k - 1][1]));
  return { closed: c.closed, cx, cy, cum, L: cum[cum.length - 1] || 1 };
}

const TAU = 2 * Math.PI;
const wrapPi = (a: number) => a - TAU * Math.floor((a + Math.PI) / TAU);

function tOf(c: Chain, p: ChainParam, x: number, y: number): number {
  if (p.closed) {
    const a = Math.atan2(y - p.cy, x - p.cx);
    return a < 0 ? a + TAU : a;
  }
  let best = Infinity;
  let t = 0;
  for (let k = 0; k + 1 < c.pts.length; k++) {
    const [ax, ay] = c.pts[k];
    const [bx, by] = c.pts[k + 1];
    const ex = bx - ax;
    const ey = by - ay;
    const l2 = ex * ex + ey * ey || 1;
    const u = Math.min(1, Math.max(0, ((x - ax) * ex + (y - ay) * ey) / l2));
    const d = Math.hypot(ax + u * ex - x, ay + u * ey - y);
    if (d < best) {
      best = d;
      t = (p.cum[k] + u * Math.sqrt(l2)) / p.L;
    }
  }
  return t;
}

function pointAtT(c: Chain, p: ChainParam, t: number): [number, number] {
  if (p.closed) {
    for (let k = 0; k + 1 < c.pts.length; k++) {
      const [ax, ay] = c.pts[k];
      const [bx, by] = c.pts[k + 1];
      const a1 = wrapPi(Math.atan2(ay - p.cy, ax - p.cx) - t);
      const a2 = wrapPi(Math.atan2(by - p.cy, bx - p.cx) - t);
      if (Math.abs(a1 - a2) < Math.PI && ((a1 <= 0 && a2 >= 0) || (a1 >= 0 && a2 <= 0))) {
        const s = a1 === a2 ? 0 : a1 / (a1 - a2);
        return [ax + s * (bx - ax), ay + s * (by - ay)];
      }
    }
    return c.pts[0];
  }
  const target = t * p.L;
  for (let k = 0; k + 1 < c.pts.length; k++) {
    if (p.cum[k + 1] >= target) {
      const seg = p.cum[k + 1] - p.cum[k] || 1;
      const s = (target - p.cum[k]) / seg;
      return [c.pts[k][0] + s * (c.pts[k + 1][0] - c.pts[k][0]), c.pts[k][1] + s * (c.pts[k + 1][1] - c.pts[k][1])];
    }
  }
  return c.pts[c.pts.length - 1];
}

/** Filled bands and contour lines, plus optional highlighted levels. */
function ContourLayer({ f, levelSpec, fill, highlight, region }: { f: F2; levelSpec: number | number[]; fill: boolean; highlight?: { level: number; color: string; width: number }[]; region?: { g: F2; c: number } }) {
  const { view, width, height, sx, sy } = usePlot();
  const colors = useColors();
  const nx = Math.max(40, Math.round(width / 5));
  const ny = Math.max(30, Math.round(height / 5));
  const grid = useMemo(() => sampleGrid(f, view, nx, ny), [f, view, nx, ny]);
  const levels = useMemo(() => (Array.isArray(levelSpec) ? [...levelSpec].sort((a, b) => a - b) : niceLevels(grid.lo, grid.hi, levelSpec)), [grid, levelSpec]);
  const lines = useMemo(() => levels.map((L) => segPath(contour(grid, L).pts, sx, sy)).join(''), [grid, levels, sx, sy]);
  const img = useMemo(() => {
    if (!fill || typeof document === 'undefined') return '';
    const stops = ['--plot-1', '--plot-5', '--plot-3', '--plot-4'].map((n) => colors.rgb(n));
    const a = Math.round(255 * (colors.dark ? 0.4 : 0.34));
    const nb = levels.length;
    const W = Math.max(60, Math.round(width / 2));
    const H = Math.max(40, Math.round(height / 2));
    return rasterize(view as V4, W, H, (x, y) => {
      const v = f(x, y);
      if (!Number.isFinite(v)) return null;
      const c = ramp(stops, nb ? bandOf(levels, v) / nb : 0.5);
      return [c[0], c[1], c[2], a];
    });
  }, [fill, colors, levels, view, width, height, f]);
  const regionImg = useMemo(() => {
    if (!region || typeof document === 'undefined') return '';
    const c = colors.rgb('--plot-2');
    return rasterize(view as V4, Math.max(60, Math.round(width / 3)), Math.max(40, Math.round(height / 3)), (x, y) => (region.g(x, y) <= region.c ? [c[0], c[1], c[2], colors.dark ? 46 : 36] : null));
  }, [region, colors, view, width, height]);
  const hl = useMemo(() => (highlight ?? []).map((h) => ({ ...h, d: segPath(contour(grid, h.level).pts, sx, sy) })), [highlight, grid, sx, sy]);
  return (
    <g>
      {img && <image href={img} x={0} y={0} width={width} height={height} preserveAspectRatio="none" />}
      {regionImg && <image href={regionImg} x={0} y={0} width={width} height={height} preserveAspectRatio="none" />}
      <path d={lines} fill="none" stroke="var(--plot-text)" strokeWidth={0.9} opacity={0.55} />
      {/* Axes redrawn over the fill so they stay visible. */}
      <line x1={0} x2={width} y1={sy(0)} y2={sy(0)} stroke="var(--plot-axis)" strokeWidth={1} opacity={0.8} />
      <line y1={0} y2={height} x1={sx(0)} x2={sx(0)} stroke="var(--plot-axis)" strokeWidth={1} opacity={0.8} />
      {hl.map((h, i) => (
        <path key={i} d={h.d} fill="none" stroke={h.color} strokeWidth={h.width} strokeLinecap="round" />
      ))}
    </g>
  );
}

/** A label that flips to the other side of its point near the edges of the plot. */
function EdgeLabel({ x, y, color, text }: { x: number; y: number; color: string; text: string }) {
  const { sx, sy, width } = usePlot();
  const right = sx(x) > width - 90;
  const top = sy(y) < 24;
  return (
    <Label x={x} y={y} dx={right ? -9 : 9} dy={top ? 18 : -8} anchor={right ? 'end' : 'start'} color={color} weight={600}>
      {text}
    </Label>
  );
}

function ChainLayer({ cs, color }: { cs: Chain[]; color: string }) {
  const { sx, sy } = usePlot();
  return <path d={cs.map((c) => chainPath(c, sx, sy)).join('')} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" />;
}

function CritMark({ x, y, kind }: { x: number; y: number; kind: CritKind }) {
  const { sx, sy } = usePlot();
  const X = sx(x);
  const Y = sy(y);
  const col = KIND_COLOR[kind];
  if (kind === 'saddle')
    return (
      <g stroke={col} strokeWidth={3} strokeLinecap="round">
        <line x1={X - 6} y1={Y - 6} x2={X + 6} y2={Y + 6} />
        <line x1={X - 6} y1={Y + 6} x2={X + 6} y2={Y - 6} />
      </g>
    );
  return <circle cx={X} cy={Y} r={6} fill={kind === 'degenerate' ? 'var(--color-surface)' : col} stroke={col} strokeWidth={2.5} />;
}

const ft = (v: number, d?: number) => fmt(tidy(v, 1e-6), d);
const pt = (x: number, y: number) => `(${ft(x)}, ${ft(y)})`;
const vec = (a: number, b: number) => `⟨${ft(a)}, ${ft(b)}⟩`;

export default function ContourGradient({ params }: WidgetProps) {
  const fSrc = str(params, 'f', 'x^2 + 3*x*y');
  const v = readView(params, 'view', [-3, 3, -3, 3]);
  const modeList = strArray(params, 'modes', ['gradient']);
  for (const m of modeList) if (!MODES.includes(m as Mode)) throw new Error(`parameter "modes": unknown mode "${m}" (use ${MODES.join(', ')})`);
  if (!modeList.length) throw new Error('parameter "modes" should list at least one mode');
  const modes = modeList as Mode[];
  const p0 = point(params, 'point', [1, 1]);
  const levelSpec: number | number[] = Array.isArray(params.levels) ? numArray(params, 'levels', []) : num(params, 'levels', 12);
  const fill = bool(params, 'fill', true);
  const gSrc = str(params, 'g', 'x^2 + y^2');
  const cLevel = num(params, 'c', 1);
  const region = bool(params, 'region', false);
  const showProfile = bool(params, 'profile', region);

  const f = useMemo(() => compile2(fSrc, 'f'), [fSrc]);
  const g = useMemo(() => (modes.includes('lagrange') ? compile2(gSrc, 'g') : null), [gSrc, modes.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const span = Math.min(v[1] - v[0], v[3] - v[2]);
  const hd = 1e-5 * Math.max(v[1] - v[0], v[3] - v[2]);

  // Scale for drawing gradient arrows: a typical |grad f| maps to 30% of the view.
  const arrowScale = (fn: F2) => {
    const ms: number[] = [];
    for (let j = 0; j <= 16; j++)
      for (let i = 0; i <= 16; i++) {
        const [gx, gy] = grad(fn, v[0] + ((v[1] - v[0]) * i) / 16, v[2] + ((v[3] - v[2]) * j) / 16, hd);
        const m = Math.hypot(gx, gy);
        if (Number.isFinite(m)) ms.push(m);
      }
    ms.sort((a, b) => a - b);
    const typ = ms[Math.floor(ms.length * 0.75)] || 1;
    return (0.3 * span) / typ;
  };
  const kf = useMemo(() => arrowScale(f), [f, v.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const kg = useMemo(() => (g ? arrowScale(g) : 1), [g, v.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  const crits = useMemo(() => (modes.includes('critical') || region ? criticalPoints(f, v) : []), [f, v.join(), modes.join(), region]); // eslint-disable-line react-hooks/exhaustive-deps

  // Constraint curve, sampled over a slightly larger area than the view.
  const cons = useMemo(() => {
    if (!g) return [];
    const ex = (v[1] - v[0]) * 0.25;
    const ey = (v[3] - v[2]) * 0.25;
    const gr = sampleGrid(g, [v[0] - ex, v[1] + ex, v[2] - ey, v[3] + ey], 180, 180);
    return levelChains(gr, cLevel);
  }, [g, cLevel, v.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  if (g && !cons.length) throw new Error(`the constraint ${gSrc} = ${cLevel} has no points near the view`);
  const params0 = useMemo(() => cons.map(paramOf), [cons]);

  const snap = (x: number, y: number): [number, number] => {
    if (!g) return [x, y];
    const n = nearestOnChains(cons, x, y);
    const [nx0, ny0] = n ? n.p : [x, y];
    return projectToLevel(g, cLevel, nx0, ny0, hd);
  };

  const [mode, setMode] = useState<Mode>(modes[0]);
  const [P, setP] = useState<[number, number]>(() => (modes[0] === 'lagrange' ? snap(p0[0], p0[1]) : p0));
  const [angle, setAngle] = useState(() => num(params, 'angle', 0));
  const [h, setH] = useState(() => num(params, 'h', 0.5));
  const [showCand, setShowCand] = useState(() => bool(params, 'candidates', false));

  const changeMode = (m: Mode) => {
    setMode(m);
    if (m === 'lagrange') setP((q) => snap(q[0], q[1]));
  };

  const [x, y] = P;
  const fP = f(x, y);
  const [fx, fy] = grad(f, x, y, hd).map((d) => tidy(d));
  const gl = Math.hypot(fx, fy);
  const th = (angle * Math.PI) / 180;
  const u: [number, number] = [Math.cos(th), Math.sin(th)];
  const Du = fx * u[0] + fy * u[1];
  const R = 0.15 * span;

  // Lagrange quantities.
  const [gx, gy] = g ? grad(g, x, y, hd).map((d) => tidy(d)) : [0, 0];
  const ggl = Math.hypot(gx, gy);
  const sinAng = gl > 0 && ggl > 0 ? (fx * gy - fy * gx) / (gl * ggl) : 0;
  const cosAng = gl > 0 && ggl > 0 ? (fx * gx + fy * gy) / (gl * ggl) : 1;
  const angFG = (Math.atan2(Math.abs(sinAng), cosAng) * 180) / Math.PI;
  const parallel = gl < 1e-9 || Math.abs(sinAng) < 0.012;
  const lambda = ggl > 0 ? (fx * gx + fy * gy) / (ggl * ggl) : NaN;
  const ci = useMemo(() => (g ? (nearestOnChains(cons, x, y)?.ci ?? 0) : 0), [g, cons, x, y]);
  const chain = cons[ci];
  const cpar = params0[ci];
  const tP = chain ? tOf(chain, cpar, x, y) : 0;

  // Lagrange candidates: where the cross product of the unit gradients changes sign along the curve.
  const candidates = useMemo(() => {
    if (!g) return [] as { x: number; y: number; f: number; interior?: boolean }[];
    const out: { x: number; y: number; f: number; interior?: boolean }[] = [];
    const cr = (px: number, py: number) => {
      const [a, b] = grad(f, px, py, hd);
      const [c2, d] = grad(g, px, py, hd);
      const n = Math.hypot(a, b) * Math.hypot(c2, d);
      return n > 0 ? (a * d - b * c2) / n : 0;
    };
    const add = (px: number, py: number) => {
      if (px < v[0] - 1e-9 || px > v[1] + 1e-9 || py < v[2] - 1e-9 || py > v[3] + 1e-9) return;
      if (out.some((q) => Math.hypot(q.x - px, q.y - py) < span * 1e-3)) return;
      const r = (t: number) => (Math.abs(t - Math.round(t * 1e4) / 1e4) < 1e-7 ? Math.round(t * 1e4) / 1e4 : t);
      out.push({ x: r(px), y: r(py), f: f(r(px), r(py)) });
    };
    for (const c of cons) {
      const vals = c.pts.map(([px, py]) => cr(px, py));
      for (let k = 0; k + 1 < c.pts.length; k++) {
        const a = vals[k];
        const b = vals[k + 1];
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
        if (a === 0 || a * b < 0) {
          let lo = 0;
          let hi = 1;
          const at = (s: number) => projectToLevel(g, cLevel, c.pts[k][0] + s * (c.pts[k + 1][0] - c.pts[k][0]), c.pts[k][1] + s * (c.pts[k + 1][1] - c.pts[k][1]), hd);
          const sa = Math.sign(a);
          for (let it = 0; it < 40 && a !== 0; it++) {
            const m = (lo + hi) / 2;
            const [mx, my] = at(m);
            if (Math.sign(cr(mx, my)) === sa) lo = m;
            else hi = m;
          }
          const [qx, qy] = at(a === 0 ? 0 : (lo + hi) / 2);
          add(qx, qy);
        }
      }
    }
    if (region) for (const q of crits) if (g(q.x, q.y) < cLevel) out.push({ x: q.x, y: q.y, f: q.f, interior: true });
    return out;
  }, [g, f, cons, cLevel, region, crits, v.join(), span, hd]); // eslint-disable-line react-hooks/exhaustive-deps
  const fmax = candidates.length ? Math.max(...candidates.map((q) => q.f)) : NaN;
  const fmin = candidates.length ? Math.min(...candidates.map((q) => q.f)) : NaN;

  // f along the constraint, against the chain parameter.
  const profile = useMemo(() => {
    if (!g || !chain) return [] as [number, number][];
    const pts = chain.pts.map(([px, py]) => [tOf(chain, cpar, px, py), f(px, py)] as [number, number]);
    if (cpar.closed) pts.sort((a, b) => a[0] - b[0]);
    return pts.filter((q) => Number.isFinite(q[1]));
  }, [g, chain, cpar, f]);

  // Highlighted level curves.
  const highlight = useMemo(() => {
    if (mode === 'level' || mode === 'gradient' || mode === 'lagrange') return [{ level: fP, color: 'var(--color-ink)', width: 2 }];
    return [];
  }, [mode, fP]);

  const crSel = crits.find((q) => Math.hypot(q.x - x, q.y - y) < span * 1e-3);
  const [hxx, hxy, hyy] = hessian(f, x, y, 1e-4 * Math.max(v[1] - v[0], v[3] - v[2]));
  const hereClass = classify(hxx, hxy, hyy);

  return (
    <Frame title={str(params, 'title', 'Contour map and gradient')} caption={caption(params)}>
      {modes.length > 1 && <Segmented label="Show" options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={changeMode} />}
      <Plot view={v} equal aspect={0.75} maxHeight={480} label={`Contour map of f(x, y) = ${fSrc}`}>
        <ContourLayer f={f} levelSpec={levelSpec} fill={fill} highlight={highlight} region={mode === 'lagrange' && region && g ? { g, c: cLevel } : undefined} />
        {mode === 'lagrange' && <ChainLayer cs={cons} color="var(--plot-2)" />}
        {mode === 'critical' && crits.map((q, i) => <CritMark key={i} x={q.x} y={q.y} kind={q.kind} />)}
        {mode === 'critical' && crits.map((q, i) => (
          <Label key={`l${i}`} x={q.x} y={q.y} dx={9} dy={-9} size={12} weight={600} color={KIND_COLOR[q.kind]}>
            {KIND_LABEL[q.kind]}
          </Label>
        ))}
        {mode === 'lagrange' && showCand && candidates.map((q, i) => (
          <g key={i}>
            <Dot x={q.x} y={q.y} r={5} color={q.f === fmax ? 'var(--plot-2)' : q.f === fmin ? 'var(--plot-3)' : 'var(--plot-6)'} hollow={!!q.interior} />
            <Label x={q.x} y={q.y} dx={8} dy={14} size={11}>
              {`f = ${fmt(q.f)}`}
            </Label>
          </g>
        ))}

        {mode === 'partials' && (
          <>
            <Segment x1={x} y1={y} x2={x + h} y2={y} color="var(--plot-2)" width={2.5} />
            <Segment x1={x} y1={y} x2={x} y2={y + h} color="var(--plot-3)" width={2.5} />
            <Dot x={x + h} y={y} color="var(--plot-2)" />
            <Dot x={x} y={y + h} color="var(--plot-3)" />
            <EdgeLabel x={x + h} y={y} color="var(--plot-2)" text="(a + h, b)" />
            <EdgeLabel x={x} y={y + h} color="var(--plot-3)" text="(a, b + h)" />
          </>
        )}

        {mode === 'gradient' && (
          <>
            {/* Shadow of the (scaled) gradient on the line of u: its signed length is D_u f. */}
            <Segment x1={x - u[0] * span} y1={y - u[1] * span} x2={x + u[0] * span} y2={y + u[1] * span} color="var(--plot-4)" width={1} dash="3 4" opacity={0.7} />
            <Segment x1={x + kf * fx} y1={y + kf * fy} x2={x + kf * Du * u[0]} y2={y + kf * Du * u[1]} color="var(--plot-text)" width={1.25} dash="4 3" />
            <Segment x1={x} y1={y} x2={x + kf * Du * u[0]} y2={y + kf * Du * u[1]} color="var(--plot-4)" width={5} opacity={0.75} />
            <Arrow x1={x} y1={y} x2={x + u[0] * R} y2={y + u[1] * R} color="var(--color-ink)" width={2} />
            <Label x={x + u[0] * R} y={y + u[1] * R} dx={u[0] >= 0 ? 10 : -10} dy={u[1] >= 0 ? -6 : 16} anchor={u[0] >= 0 ? 'start' : 'end'} color="var(--color-ink)" weight={600}>
              u
            </Label>
          </>
        )}
        {(mode === 'gradient' || mode === 'level' || mode === 'critical' || mode === 'lagrange') && gl > 0 && (
          <>
            <Arrow x1={x} y1={y} x2={x + kf * fx} y2={y + kf * fy} color="var(--plot-1)" width={2.75} head={11} />
            <Label x={x + kf * fx} y={y + kf * fy} dx={fx >= 0 ? 8 : -8} dy={fy >= 0 ? -6 : 16} anchor={fx >= 0 ? 'start' : 'end'} color="var(--plot-1)" weight={600}>
              ∇f
            </Label>
          </>
        )}
        {mode === 'lagrange' && ggl > 0 && (
          <>
            <Arrow x1={x} y1={y} x2={x + kg * gx} y2={y + kg * gy} color="var(--plot-2)" width={2.75} head={11} />
            <Label x={x + kg * gx} y={y + kg * gy} dx={gx >= 0 ? 8 : -8} dy={gy >= 0 ? -6 : 16} anchor={gx >= 0 ? 'start' : 'end'} color="var(--plot-2)" weight={600}>
              ∇g
            </Label>
          </>
        )}
        {mode === 'level' && (
          <Label x={x} y={y} dx={10} dy={18} color="var(--plot-1)" weight={600}>
            {`f = ${fmt(fP)}`}
          </Label>
        )}
        <Draggable x={x} y={y} label="Point P" constrain={mode === 'lagrange' ? snap : (px, py) => [Math.min(v[1], Math.max(v[0], px)), Math.min(v[3], Math.max(v[2], py))]} onChange={(nx, ny) => setP([nx, ny])} color="var(--plot-1)" />
        {mode === 'gradient' && (
          <Draggable
            x={x + u[0] * R}
            y={y + u[1] * R}
            r={5.5}
            color="var(--color-ink)"
            label="Tip of the unit vector u"
            onChange={(nx, ny) => {
              const a = (Math.atan2(ny - y, nx - x) * 180) / Math.PI;
              setAngle(Math.round(a < 0 ? a + 360 : a));
            }}
          />
        )}
      </Plot>

      {mode === 'level' && (
        <Controls cols={3}>
          <Readout label="P" value={pt(x, y)} />
          <Readout label={<TL>{'f(P)'}</TL>} value={ft(fP)} tone="var(--plot-1)" />
          <Readout label={<TL>{'|\\nabla f|'}</TL>} value={fmt(gl)} />
        </Controls>
      )}

      {mode === 'partials' && (
        <>
          <Slider label="Step h" value={h} min={-1} max={1} step={0.01} onChange={(t) => setH(Math.abs(t) < 0.005 ? 0.01 : t)} />
          <Controls cols={2}>
            <Readout label={<TL>{'\\frac{f(a+h,b)-f(a,b)}{h}'}</TL>} value={fmt((f(x + h, y) - fP) / h, 4)} tone="var(--plot-2)" />
            <Readout label={<TL>{'f_x(a,b)'}</TL>} value={fmt(fx, 4)} tone="var(--plot-2)" />
            <Readout label={<TL>{'\\frac{f(a,b+h)-f(a,b)}{h}'}</TL>} value={fmt((f(x, y + h) - fP) / h, 4)} tone="var(--plot-3)" />
            <Readout label={<TL>{'f_y(a,b)'}</TL>} value={fmt(fy, 4)} tone="var(--plot-3)" />
          </Controls>
          <Note>
            P = (a, b) = {pt(x, y)}, f(P) = {fmt(fP)}. Each quotient compares f at P with f one step h along an axis, with the other variable held fixed.
          </Note>
        </>
      )}

      {mode === 'gradient' && (
        <>
          <Slider label="Direction of u (degrees from the +x axis)" value={angle} min={0} max={360} step={1} onChange={setAngle} format={(t) => `${fmt(t)}°`} />
          <Controls cols={3}>
            <Readout label="P" value={pt(x, y)} />
            <Readout label={<TL>{'\\nabla f(P)'}</TL>} value={vec(fx, fy)} tone="var(--plot-1)" />
            <Readout label={<TL>{'\\mathbf u'}</TL>} value={vec(u[0], u[1])} />
            <Readout label={<TL>{'D_{\\mathbf u}f=\\nabla f\\cdot\\mathbf u'}</TL>} value={fmt(Du, 4)} tone="var(--plot-4)" />
            <Readout label={<TL>{'\\max D_{\\mathbf u}f=|\\nabla f|'}</TL>} value={fmt(gl, 4)} tone="var(--plot-1)" />
            <Readout label={<TL>{'\\text{angle }(\\nabla f,\\mathbf u)'}</TL>} value={gl > 0 ? `${fmt((Math.acos(Math.max(-1, Math.min(1, Du / gl))) * 180) / Math.PI, 3)}°` : '—'} />
          </Controls>
        </>
      )}

      {mode === 'critical' && (
        <>
          <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-2">
            {crits.length ? <span>Move P to:</span> : <span>No critical points in this view.</span>}
            {crits.map((q, i) => (
              <Button key={i} onClick={() => setP([q.x, q.y])}>
                {`${pt(q.x, q.y)} ${KIND_LABEL[q.kind]}`}
              </Button>
            ))}
          </div>
          <Controls cols={3}>
            <Readout label="P" value={pt(x, y)} />
            <Readout label={<TL>{'\\nabla f(P)'}</TL>} value={vec(fx, fy)} tone="var(--plot-1)" />
            <Readout label={<TL>{'f(P)'}</TL>} value={ft(fP)} />
            <Readout label={<TL>{'f_{xx},\\ f_{yy},\\ f_{xy}'}</TL>} value={`${fmt(hxx)}, ${fmt(hyy)}, ${fmt(hxy)}`} />
            <Readout label={<TL>{'D=f_{xx}f_{yy}-f_{xy}^2'}</TL>} value={fmt(hereClass.D)} />
            <Readout label="Verdict" value={crSel ? KIND_LABEL[crSel.kind] : 'not critical: ∇f ≠ 0'} tone={crSel ? KIND_COLOR[crSel.kind] : undefined} />
          </Controls>
        </>
      )}

      {mode === 'lagrange' && chain && (
        <>
          <Slider
            label={cpar.closed ? `Position on g = ${fmt(cLevel)}: angle t` : `Position along g = ${fmt(cLevel)}`}
            value={tP}
            min={0}
            max={cpar.closed ? TAU : 1}
            step={cpar.closed ? 0.005 : 0.002}
            format={(t) => (cpar.closed ? `${fmt(t)} rad` : fmt(t))}
            onChange={(t) => {
              const [qx, qy] = pointAtT(chain, cpar, t);
              setP(projectToLevel(g!, cLevel, qx, qy, hd));
            }}
          />
          <Controls cols={3}>
            <Readout label="P" value={pt(x, y)} />
            <Readout label={<TL>{'f(P)'}</TL>} value={ft(fP, 4)} tone="var(--plot-1)" />
            <Readout label={<TL>{'\\text{angle }(\\nabla f,\\nabla g)'}</TL>} value={`${fmt(angFG, 3)}°`} />
            <Readout label={<TL>{'\\nabla f(P)'}</TL>} value={vec(fx, fy)} tone="var(--plot-1)" />
            <Readout label={<TL>{'\\nabla g(P)'}</TL>} value={vec(gx, gy)} tone="var(--plot-2)" />
            <Readout label={<TL>{'\\lambda=\\frac{\\nabla f\\cdot\\nabla g}{|\\nabla g|^2}'}</TL>} value={parallel ? fmt(lambda, 4) : '— (not parallel)'} />
          </Controls>
          {parallel ? (
            <Note tone="good">∇f and ∇g are parallel here: the level curve f = {fmt(fP)} touches the constraint, so P is a candidate, with λ = {fmt(lambda, 4)}.</Note>
          ) : (
            <Note>∇f is not parallel to ∇g, so the level curve of f through P crosses the constraint: moving along it one way raises f and the other way lowers it.</Note>
          )}
          {showProfile && profile.length > 1 && (
            <div>
              <div className="mb-1 text-[13px] text-ink-2">{cpar.closed ? 'f along the boundary, against the angle t' : 'f along the constraint'}</div>
              <Plot view={profileView(profile, cpar.closed)} aspect={0.32} minHeight={130} maxHeight={200} xLabel="t" label="Graph of f along the constraint">
                <Poly points={profile} color="var(--plot-1)" width={2} />
                <Dot x={tP} y={fP} color="var(--plot-1)" />
              </Plot>
            </div>
          )}
          <Toggle label={region ? 'Show the candidates (interior critical points and boundary points where ∇f ∥ ∇g)' : 'Show the points where ∇f ∥ ∇g'} checked={showCand} onChange={setShowCand} />
          {showCand && (
            <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-2">
              <span>Move P to:</span>
              {candidates
                .filter((q) => !q.interior)
                .map((q, i) => (
                  <Button key={i} onClick={() => setP([q.x, q.y])}>
                    {`${pt(q.x, q.y)}: f = ${fmt(q.f)}`}
                  </Button>
                ))}
              {region &&
                candidates
                  .filter((q) => q.interior)
                  .map((q, i) => <span key={`i${i}`} className="rounded-md border border-dashed border-line px-2 py-1 text-xs">{`interior critical point ${pt(q.x, q.y)}: f = ${fmt(q.f)}`}</span>)}
              {region && candidates.length > 0 && <span className="text-xs">{`Largest ${fmt(fmax)}, smallest ${fmt(fmin)}.`}</span>}
            </div>
          )}
        </>
      )}
    </Frame>
  );
}

function profileView(pts: [number, number][], closed: boolean): [number, number, number, number] {
  const ys = pts.map((p) => p[1]);
  let lo = Math.min(...ys);
  let hi = Math.max(...ys);
  if (hi - lo < 1e-9) {
    lo -= 1;
    hi += 1;
  }
  const pad = (hi - lo) * 0.15;
  return [0, closed ? TAU : 1, lo - pad, hi + pad];
}
