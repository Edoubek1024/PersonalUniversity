/**
 * SVG plotting for widgets. <Plot> sets up a data coordinate system sized to its container in
 * real pixels (so text stays readable on a phone) and children draw in data coordinates.
 *
 *   <Plot view={[-5, 5, -2, 2]}>
 *     <FnPath f={Math.sin} />
 *     <Draggable x={a} y={Math.sin(a)} onChange={(x) => setA(x)} />
 *   </Plot>
 *
 * Colours: use the CSS variables --plot-1 ... --plot-6 (series), --plot-grid, --plot-axis and
 * --plot-text, which adapt to dark mode.
 */
import { createContext, useContext, useMemo, useRef, type ReactNode, type PointerEvent as RPointerEvent, type KeyboardEvent } from 'react';
import { useElementSize } from './hooks';
import { clamp, fmt, niceStep, ticks } from './num';

export type View = [xMin: number, xMax: number, yMin: number, yMax: number];

export interface PlotApi {
  /** Pixel size of the drawing area. */
  width: number;
  height: number;
  /** The view actually shown (wider than requested when `equal` is set). */
  view: View;
  sx: (x: number) => number;
  sy: (y: number) => number;
  /** Pixel to data. */
  ix: (px: number) => number;
  iy: (py: number) => number;
  /** Data coordinates of a pointer event. */
  toData: (e: { clientX: number; clientY: number }) => [number, number];
}

const PlotCtx = createContext<PlotApi | null>(null);

export function usePlot(): PlotApi {
  const p = useContext(PlotCtx);
  if (!p) throw new Error('usePlot must be used inside <Plot>');
  return p;
}

export interface PlotProps {
  view: View;
  /** Height as a fraction of width, clamped to [minHeight, maxHeight] pixels. Default 0.62. */
  aspect?: number;
  minHeight?: number;
  maxHeight?: number;
  /** Same scale on both axes (circles look round); the view is widened to fit. */
  equal?: boolean;
  grid?: boolean;
  axes?: boolean;
  /** Axis names drawn at the ends of the axes. */
  xLabel?: string;
  yLabel?: string;
  /** Tick spacings; chosen automatically when omitted. Use Math.PI / 2 for trig, etc. */
  xStep?: number;
  yStep?: number;
  /** Formats tick labels. */
  xTickFormat?: (v: number) => string;
  yTickFormat?: (v: number) => string;
  /** Pointer down / move / up on the background, in data coordinates. */
  onPointerDown?: (x: number, y: number, e: RPointerEvent<SVGSVGElement>) => void;
  onPointerMove?: (x: number, y: number, e: RPointerEvent<SVGSVGElement>) => void;
  onPointerUp?: (x: number, y: number, e: RPointerEvent<SVGSVGElement>) => void;
  /** Accessible description of what the plot shows. */
  label?: string;
  className?: string;
  children?: ReactNode;
}

export function Plot({
  view: requested,
  aspect = 0.62,
  minHeight = 220,
  maxHeight = 460,
  equal = false,
  grid = true,
  axes = true,
  xLabel,
  yLabel,
  xStep,
  yStep,
  xTickFormat = (v) => fmt(v),
  yTickFormat = (v) => fmt(v),
  onPointerDown,
  onPointerMove,
  onPointerUp,
  label,
  className = '',
  children,
}: PlotProps) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const svgRef = useRef<SVGSVGElement>(null);
  const width = size.width || 640;
  const height = Math.round(clamp(width * aspect, minHeight, maxHeight));

  const api = useMemo<PlotApi>(() => {
    let [x0, x1, y0, y1] = requested;
    if (equal) {
      const k = Math.max((x1 - x0) / width, (y1 - y0) / height);
      const cx = (x0 + x1) / 2;
      const cy = (y0 + y1) / 2;
      [x0, x1, y0, y1] = [cx - (k * width) / 2, cx + (k * width) / 2, cy - (k * height) / 2, cy + (k * height) / 2];
    }
    const kx = width / (x1 - x0);
    const ky = height / (y1 - y0);
    return {
      width,
      height,
      view: [x0, x1, y0, y1],
      sx: (x) => (x - x0) * kx,
      sy: (y) => height - (y - y0) * ky,
      ix: (px) => x0 + px / kx,
      iy: (py) => y0 + (height - py) / ky,
      toData: (e) => {
        const r = svgRef.current?.getBoundingClientRect();
        if (!r) return [NaN, NaN];
        return [x0 + (e.clientX - r.left) / kx, y0 + (height - (e.clientY - r.top)) / ky];
      },
    };
  }, [requested[0], requested[1], requested[2], requested[3], equal, width, height]); // eslint-disable-line react-hooks/exhaustive-deps

  const handler = (cb?: (x: number, y: number, e: RPointerEvent<SVGSVGElement>) => void) =>
    cb
      ? (e: RPointerEvent<SVGSVGElement>) => {
          const [x, y] = api.toData(e);
          cb(x, y, e);
        }
      : undefined;

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        className="block select-none overflow-hidden rounded-lg bg-surface"
        // Taps on the background still work with the default touch-action, and the page keeps
        // scrolling when a finger lands on the plot. Draggable points block scrolling themselves.
        onPointerDown={handler(onPointerDown)}
        onPointerMove={handler(onPointerMove)}
        onPointerUp={handler(onPointerUp)}
      >
        <PlotCtx.Provider value={api}>
          {(grid || axes) && <Axes grid={grid} axes={axes} xStep={xStep} yStep={yStep} xTickFormat={xTickFormat} yTickFormat={yTickFormat} xLabel={xLabel} yLabel={yLabel} />}
          {children}
        </PlotCtx.Provider>
      </svg>
    </div>
  );
}

function Axes({
  grid,
  axes,
  xStep,
  yStep,
  xTickFormat,
  yTickFormat,
  xLabel,
  yLabel,
}: {
  grid: boolean;
  axes: boolean;
  xStep?: number;
  yStep?: number;
  xTickFormat: (v: number) => string;
  yTickFormat: (v: number) => string;
  xLabel?: string;
  yLabel?: string;
}) {
  const { view, sx, sy, width, height } = usePlot();
  const [x0, x1, y0, y1] = view;
  let dx = xStep ?? niceStep(x1 - x0, Math.max(3, Math.round(width / 80)));
  let dy = yStep ?? niceStep(y1 - y0, Math.max(3, Math.round(height / 60)));
  // A fixed step (multiples of pi, say) is thinned on narrow screens so labels do not collide.
  while ((dx / (x1 - x0)) * width < 48) dx *= 2;
  while ((dy / (y1 - y0)) * height < 26) dy *= 2;
  const xt = ticks(x0, x1, dx);
  const yt = ticks(y0, y1, dy);
  // Axes sit at zero when zero is visible, otherwise along the bottom / left edge.
  const ax = clamp(sy(0), 0, height);
  const ay = clamp(sx(0), 0, width);
  const labelBelow = ax < height - 18;
  const labelLeft = ay > 30;
  return (
    <g fontSize={11} fill="var(--plot-text)" style={{ fontVariantNumeric: 'tabular-nums' }}>
      {grid && (
        <g stroke="var(--plot-grid)" strokeWidth={1}>
          {xt.map((v) => (
            <line key={`gx${v}`} x1={sx(v)} x2={sx(v)} y1={0} y2={height} />
          ))}
          {yt.map((v) => (
            <line key={`gy${v}`} y1={sy(v)} y2={sy(v)} x1={0} x2={width} />
          ))}
        </g>
      )}
      {axes && (
        <g>
          <line x1={0} x2={width} y1={ax} y2={ax} stroke="var(--plot-axis)" strokeWidth={1.25} />
          <line y1={0} y2={height} x1={ay} x2={ay} stroke="var(--plot-axis)" strokeWidth={1.25} />
          {xt.map((v) =>
            (v === 0 && x0 < 0) || sx(v) < 14 || sx(v) > width - 14 ? null : (
              <text key={`tx${v}`} x={sx(v)} y={labelBelow ? ax + 14 : ax - 5} textAnchor="middle">
                {xTickFormat(v)}
              </text>
            ),
          )}
          {yt.map((v) =>
            (v === 0 && y0 < 0) || sy(v) < 10 || sy(v) > height - 10 ? null : (
              <text key={`ty${v}`} x={labelLeft ? ay - 5 : ay + 5} y={sy(v) + 4} textAnchor={labelLeft ? 'end' : 'start'}>
                {yTickFormat(v)}
              </text>
            ),
          )}
          {xLabel && (
            <text x={width - 6} y={ax - 6} textAnchor="end" fontStyle="italic" fontSize={12}>
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text x={ay + 6} y={12} fontStyle="italic" fontSize={12}>
              {yLabel}
            </text>
          )}
        </g>
      )}
    </g>
  );
}

interface StrokeProps {
  color?: string;
  width?: number;
  dash?: string;
  opacity?: number;
}

/**
 * Graph of y = f(x). Breaks the line at undefined points and vertical asymptotes rather than
 * joining across them.
 */
export function FnPath({ f, from, to, samples, color = 'var(--plot-1)', width = 2.25, dash, opacity }: { f: (x: number) => number; from?: number; to?: number; samples?: number } & StrokeProps) {
  const { view, sx, sy, width: W } = usePlot();
  const a = Math.max(from ?? view[0], view[0]);
  const b = Math.min(to ?? view[1], view[1]);
  const d = useMemo(() => {
    if (!(b > a)) return '';
    const n = samples ?? Math.max(200, Math.round(W * 1.5));
    const span = view[3] - view[2];
    const lo = view[2] - span * 4;
    const hi = view[3] + span * 4;
    let out = '';
    let pen = false;
    let prev = NaN;
    for (let i = 0; i <= n; i++) {
      const x = a + ((b - a) * i) / n;
      const y = f(x);
      // A jump from beyond one edge of the view to beyond the other is an asymptote, not a line.
      const jump = Number.isFinite(prev) && ((y > view[3] && prev < view[2]) || (y < view[2] && prev > view[3]));
      if (!Number.isFinite(y) || jump) {
        pen = false;
        prev = y;
        if (!Number.isFinite(y)) continue;
      }
      const yc = clamp(y, lo, hi);
      out += `${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(yc).toFixed(1)}`;
      pen = true;
      prev = y;
    }
    return out;
  }, [f, a, b, samples, view, sx, sy, W]);
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} strokeLinejoin="round" strokeLinecap="round" />;
}

/** A parametric curve (x(t), y(t)) for t in [t0, t1]. */
export function ParamPath({ x, y, t0, t1, samples = 600, color = 'var(--plot-1)', width = 2.25, dash, opacity }: { x: (t: number) => number; y: (t: number) => number; t0: number; t1: number; samples?: number } & StrokeProps) {
  const { sx, sy } = usePlot();
  const d = useMemo(() => {
    let out = '';
    let pen = false;
    for (let i = 0; i <= samples; i++) {
      const t = t0 + ((t1 - t0) * i) / samples;
      const px = x(t);
      const py = y(t);
      if (!Number.isFinite(px) || !Number.isFinite(py)) {
        pen = false;
        continue;
      }
      out += `${pen ? 'L' : 'M'}${sx(px).toFixed(1)},${sy(py).toFixed(1)}`;
      pen = true;
    }
    return out;
  }, [x, y, t0, t1, samples, sx, sy]);
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} strokeLinejoin="round" />;
}

/** A polyline or polygon through data points. */
export function Poly({ points, closed = false, fill, fillOpacity = 0.18, color = 'var(--plot-1)', width = 2, dash, opacity }: { points: [number, number][]; closed?: boolean; fill?: string; fillOpacity?: number } & StrokeProps) {
  const { sx, sy } = usePlot();
  const pts = points.map(([x, y]) => `${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join(' ');
  return closed ? (
    <polygon points={pts} fill={fill ?? 'none'} fillOpacity={fill ? fillOpacity : undefined} stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} strokeLinejoin="round" />
  ) : (
    <polyline points={pts} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} strokeLinejoin="round" />
  );
}

/** Shaded region between y = top(x) and y = bottom(x) (default the x-axis) over [a, b]. */
export function FillBetween({ top, bottom = () => 0, a, b, fill = 'var(--plot-1)', opacity = 0.18, samples = 300 }: { top: (x: number) => number; bottom?: (x: number) => number; a: number; b: number; fill?: string; opacity?: number; samples?: number }) {
  const { sx, sy, view } = usePlot();
  const span = view[3] - view[2];
  const c = (y: number) => clamp(Number.isFinite(y) ? y : 0, view[2] - span, view[3] + span);
  const xs = Array.from({ length: samples + 1 }, (_, i) => a + ((b - a) * i) / samples);
  const upper = xs.map((x) => `${sx(x).toFixed(1)},${sy(c(top(x))).toFixed(1)}`);
  const lower = xs.reverse().map((x) => `${sx(x).toFixed(1)},${sy(c(bottom(x))).toFixed(1)}`);
  return <polygon points={[...upper, ...lower].join(' ')} fill={fill} fillOpacity={opacity} stroke="none" />;
}

export function Segment({ x1, y1, x2, y2, color = 'var(--plot-axis)', width = 1.5, dash, opacity }: { x1: number; y1: number; x2: number; y2: number } & StrokeProps) {
  const { sx, sy } = usePlot();
  return <line x1={sx(x1)} y1={sy(y1)} x2={sx(x2)} y2={sy(y2)} stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} strokeLinecap="round" />;
}

/** An infinite line through (x, y) with the given slope (or vertical when slope is ±Infinity). */
export function Line({ x, y, slope, ...stroke }: { x: number; y: number; slope: number } & StrokeProps) {
  const { view } = usePlot();
  if (!Number.isFinite(slope)) return <Segment x1={x} y1={view[2] - 1e3} x2={x} y2={view[3] + 1e3} {...stroke} />;
  const span = view[1] - view[0];
  const xa = view[0] - span;
  const xb = view[1] + span;
  return <Segment x1={xa} y1={y + slope * (xa - x)} x2={xb} y2={y + slope * (xb - x)} {...stroke} />;
}

/** An arrow from (x1, y1) to (x2, y2) with a head drawn in pixels. */
export function Arrow({ x1, y1, x2, y2, color = 'var(--plot-1)', width = 2.25, head = 9, opacity, dash }: { x1: number; y1: number; x2: number; y2: number; head?: number } & StrokeProps) {
  const { sx, sy } = usePlot();
  const ax = sx(x1);
  const ay = sy(y1);
  const bx = sx(x2);
  const by = sy(y2);
  const len = Math.hypot(bx - ax, by - ay);
  if (len < 0.5) return null;
  const ux = (bx - ax) / len;
  const uy = (by - ay) / len;
  const h = Math.min(head, len * 0.6);
  const baseX = bx - ux * h;
  const baseY = by - uy * h;
  const pts = `${bx},${by} ${baseX - uy * h * 0.45},${baseY + ux * h * 0.45} ${baseX + uy * h * 0.45},${baseY - ux * h * 0.45}`;
  return (
    <g opacity={opacity}>
      <line x1={ax} y1={ay} x2={baseX} y2={baseY} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />
      <polygon points={pts} fill={color} />
    </g>
  );
}

export function Dot({ x, y, r = 4.5, color = 'var(--plot-1)', hollow = false }: { x: number; y: number; r?: number; color?: string; hollow?: boolean }) {
  const { sx, sy } = usePlot();
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return <circle cx={sx(x)} cy={sy(y)} r={r} fill={hollow ? 'var(--color-surface)' : color} stroke={color} strokeWidth={hollow ? 2 : 0} />;
}

/** Text at a data point, offset in pixels. */
export function Label({ x, y, children, dx = 6, dy = -6, anchor = 'start', color = 'var(--plot-text)', size = 12, weight }: { x: number; y: number; children: ReactNode; dx?: number; dy?: number; anchor?: 'start' | 'middle' | 'end'; color?: string; size?: number; weight?: number }) {
  const { sx, sy } = usePlot();
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return (
    <text x={sx(x) + dx} y={sy(y) + dy} textAnchor={anchor} fill={color} fontSize={size} fontWeight={weight} style={{ paintOrder: 'stroke', stroke: 'var(--color-surface)', strokeWidth: 3, strokeLinejoin: 'round' }}>
      {children}
    </text>
  );
}

/** Axis-aligned rectangle in data coordinates. */
export function Rect({ x, y, w, h, fill = 'var(--plot-1)', opacity = 0.2, color, width = 1 }: { x: number; y: number; w: number; h: number; fill?: string; opacity?: number; color?: string; width?: number }) {
  const { sx, sy } = usePlot();
  const px = Math.min(sx(x), sx(x + w));
  const py = Math.min(sy(y), sy(y + h));
  return <rect x={px} y={py} width={Math.abs(sx(x + w) - sx(x))} height={Math.abs(sy(y + h) - sy(y))} fill={fill} fillOpacity={opacity} stroke={color} strokeWidth={color ? width : 0} />;
}

/**
 * A point the learner can drag with a pointer or move with the arrow keys (Shift for bigger
 * steps). `constrain` maps a proposed position to an allowed one, e.g. to keep it on a curve.
 */
export function Draggable({
  x,
  y,
  onChange,
  constrain,
  color = 'var(--plot-2)',
  r = 7,
  step,
  label,
}: {
  x: number;
  y: number;
  onChange: (x: number, y: number) => void;
  constrain?: (x: number, y: number) => [number, number];
  color?: string;
  r?: number;
  /** Keyboard step in data units; defaults to 1% of the view width. */
  step?: number;
  /** Accessible name, e.g. "Point P". */
  label?: string;
}) {
  const { sx, sy, toData, view } = usePlot();
  const dragging = useRef(false);
  const move = (nx: number, ny: number) => {
    const [cx, cy] = constrain ? constrain(nx, ny) : [nx, ny];
    onChange(cx, cy);
  };
  const s = step ?? (view[1] - view[0]) / 100;
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    const k = e.shiftKey ? 10 : 1;
    const d: Record<string, [number, number]> = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, s], ArrowDown: [0, -s] };
    const v = d[e.key];
    if (!v) return;
    e.preventDefault();
    move(x + v[0] * k, y + v[1] * k);
  };
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return (
    <g
      tabIndex={0}
      role="slider"
      aria-label={label ?? 'Draggable point'}
      aria-valuetext={`(${fmt(x)}, ${fmt(y)})`}
      style={{ cursor: 'grab', touchAction: 'none', outline: 'none' }}
      className="[&:focus-visible>circle:first-child]:stroke-accent"
      onPointerDown={(e) => {
        e.stopPropagation();
        dragging.current = true;
        (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const [nx, ny] = toData(e);
        move(nx, ny);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={onKey}
    >
      <circle cx={sx(x)} cy={sy(y)} r={r + 9} fill="transparent" stroke="transparent" strokeWidth={3} />
      <circle cx={sx(x)} cy={sy(y)} r={r} fill={color} stroke="var(--color-surface)" strokeWidth={2} />
    </g>
  );
}
