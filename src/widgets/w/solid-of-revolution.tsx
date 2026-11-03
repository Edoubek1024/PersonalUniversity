/**
 * solid-of-revolution: the region between y = f(x) and y = g(x) on [a, b], rotated about a
 * horizontal line y = k or a vertical line x = k. A 2D view shows the region, the axis and one
 * slice (a strip of width dx or dy) with its radii; a 3D view (drag to turn it) shows the solid
 * forming as the region sweeps round, with the same slice turned into a disk, washer or shell.
 * The volume of n slices is compared with the exact integral.
 *
 * Params:
 *   f         string    upper curve in x                                default "sqrt(x)"
 *   g         string    lower curve in x                                default "0"
 *   a, b      numbers   interval                                        default 0, 4
 *   axis      string    "x-axis", "y-axis", "y = k" or "x = k"           default "x-axis"
 *   axes      string[]  axis choices offered as tabs                    default [axis]
 *   method    string    "disk" (disks/washers) or "shell"               default "disk"
 *   methods   string[]  methods offered                                 default ["disk", "shell"]
 *   n         number    number of slices                                default 8
 *   nMax      number    largest n on the slider                         default 40
 *   exact     number    exact volume for the default axis, if known      default numeric integral
 *   exactTex  string    TeX for the exact volume, e.g. "8\\pi"          default none
 *   fTex, gTex string   TeX for the curves in the legend, e.g. "\\sqrt{x}"  default the expressions
 *   view      [xMin, xMax, yMin, yMax] for the 2D view                  default fitted
 *   title, caption
 */
import { useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str, strArray, view as readView } from '../kit/params';
import { Plot, FnPath, FillBetween, Line, Rect, Segment, Label, Draggable } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { useAnimation, useDark, useElementSize } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';
import { compile1, integrate, sig, type Fn } from '../kit/calc1-math';
import { Legend, ReadoutGrid } from '../kit/calc1-ui';

type Dir = 'h' | 'v';
interface Axis {
  dir: Dir;
  k: number;
  label: string;
}
type Method = 'disk' | 'shell';

function parseAxis(s: string): Axis {
  const t = s.replace(/\s+/g, '').toLowerCase();
  if (t === 'x-axis' || t === 'xaxis') return { dir: 'h', k: 0, label: 'x-axis' };
  if (t === 'y-axis' || t === 'yaxis') return { dir: 'v', k: 0, label: 'y-axis' };
  const m = /^([xy])=([-+]?\d*\.?\d+)$/.exec(t.replace('−', '-'));
  if (!m) throw new Error(`axis "${s}" should be "x-axis", "y-axis", "y = k" or "x = k"`);
  const k = parseFloat(m[2]);
  return m[1] === 'y' ? { dir: 'h', k, label: `y = ${fmt(k)}` } : { dir: 'v', k, label: `x = ${fmt(k)}` };
}

/** x-intervals where bot(x) ≤ y ≤ top(x) on [a, b], refined by bisection. */
function crossSection(top: Fn, bot: Fn, a: number, b: number, y: number, M = 400): [number, number][] {
  const inside = (x: number) => bot(x) <= y && y <= top(x);
  const out: [number, number][] = [];
  let start: number | null = null;
  let prevX = a;
  let prevIn = inside(a);
  if (prevIn) start = a;
  const edge = (lo: number, hi: number, loIn: boolean) => {
    for (let k = 0; k < 40; k++) {
      const m = (lo + hi) / 2;
      if (inside(m) === loIn) lo = m;
      else hi = m;
    }
    return (lo + hi) / 2;
  };
  for (let i = 1; i <= M; i++) {
    const x = a + ((b - a) * i) / M;
    const cur = inside(x);
    if (cur !== prevIn) {
      const e = edge(prevX, x, prevIn);
      if (cur) start = e;
      else if (start !== null) {
        out.push([start, e]);
        start = null;
      }
    }
    prevX = x;
    prevIn = cur;
  }
  if (start !== null) out.push([start, b]);
  return out;
}

/** Area of the cross-section at height y when the intervals are rotated about x = k. */
function washerArea(ivs: [number, number][], k: number): number {
  let s = 0;
  for (const [x1, x2] of ivs) {
    const d1 = Math.abs(x1 - k);
    const d2 = Math.abs(x2 - k);
    const R = Math.max(d1, d2);
    const r = (x1 - k) * (x2 - k) <= 0 ? 0 : Math.min(d1, d2);
    s += Math.PI * (R * R - r * r);
  }
  return s;
}

// ---------- 3D drawing ----------

interface Face {
  p: number[]; // x, y, z triples
  kind: 0 | 1 | 2; // solid surface, slice, flat region
}

function rotatePoint(ax: Axis, x: number, y: number, th: number): [number, number, number] {
  const c = Math.cos(th);
  const s = Math.sin(th);
  return ax.dir === 'h' ? [x, ax.k + (y - ax.k) * c, (y - ax.k) * s] : [ax.k + (x - ax.k) * c, y, (x - ax.k) * s];
}

/** Faces swept by rotating a closed polygon about the axis through [0, phi], plus end caps. */
function sweep(poly: [number, number][], ax: Axis, phi: number, kind: 0 | 1, steps: number, faces: Face[]) {
  const m = Math.max(1, Math.ceil((steps * phi) / (2 * Math.PI)));
  for (let i = 0; i < poly.length; i++) {
    const [x0, y0] = poly[i];
    const [x1, y1] = poly[(i + 1) % poly.length];
    if (Math.hypot(x1 - x0, y1 - y0) < 1e-12) continue;
    for (let j = 0; j < m; j++) {
      const t0 = (phi * j) / m;
      const t1 = (phi * (j + 1)) / m;
      faces.push({ p: [...rotatePoint(ax, x0, y0, t0), ...rotatePoint(ax, x1, y1, t0), ...rotatePoint(ax, x1, y1, t1), ...rotatePoint(ax, x0, y0, t1)], kind });
    }
  }
  if (phi < 2 * Math.PI - 1e-9) {
    for (const t of [0, phi]) faces.push({ p: poly.flatMap(([x, y]) => rotatePoint(ax, x, y, t)), kind: kind === 0 ? 2 : 1 });
  }
}

const rgbCache = new Map<string, [number, number, number]>();
function rgbOf(color: string): [number, number, number] {
  const hit = rgbCache.get(color);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#888';
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const d = ctx.getImageData(0, 0, 1, 1).data;
  const out: [number, number, number] = [d[0], d[1], d[2]];
  rgbCache.set(color, out);
  return out;
}

function Solid3D({ faces, ax, center, radius, yaw, pitch, onTurn, translucent, extent }: { faces: Face[]; ax: Axis; center: [number, number, number]; radius: number; yaw: number; pitch: number; onTurn: (dyaw: number, dpitch: number) => void; translucent: boolean; extent: [number, number] }) {
  const [wrap, size] = useElementSize<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const dark = useDark();
  const drag = useRef<{ x: number; y: number } | null>(null);
  const W = size.width || 400;
  const H = Math.round(clamp(W * 0.8, 240, 400));

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const dpr = window.devicePixelRatio || 1;
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    const ctx = cv.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const css = getComputedStyle(document.documentElement);
    const col = (n: string) => rgbOf(css.getPropertyValue(n).trim() || '#888');
    const cSolid = col('--plot-1');
    const cSlice = col('--plot-4');
    const cAxis = css.getPropertyValue('--plot-axis').trim();
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    const s = (0.46 * Math.min(W, H)) / radius;
    /** View coordinates: x right, y up, z towards the viewer. */
    const view = (x: number, y: number, z: number): [number, number, number] => {
      const X = x - center[0];
      const Y = y - center[1];
      const Z = z - center[2];
      const x1 = X * cy + Z * sy;
      const z1 = -X * sy + Z * cy;
      return [x1, Y * cp - z1 * sp, Y * sp + z1 * cp];
    };
    const proj = (x: number, y: number, z: number): [number, number, number] => {
      const [vx, vy, vz] = view(x, y, z);
      return [W / 2 + s * vx, H / 2 - s * vy, vz];
    };
    // Coordinate axes and the axis of rotation, behind everything.
    const line = (p: [number, number, number], q: [number, number, number], color: string, w: number, dash: number[]) => {
      const a = proj(...p);
      const b = proj(...q);
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.stroke();
      ctx.setLineDash([]);
    };
    const L = radius * 1.15;
    line([center[0] - L, 0, 0], [center[0] + L, 0, 0], cAxis, 1, []);
    line([0, center[1] - L, 0], [0, center[1] + L, 0], cAxis, 1, []);

    const light = [0.35, 0.55, 0.76];
    const items = faces.map((f) => {
      const n = f.p.length / 3;
      const vs: [number, number, number][] = [];
      const pts: number[] = [];
      let zs = 0;
      for (let i = 0; i < n; i++) {
        const q = view(f.p[3 * i], f.p[3 * i + 1], f.p[3 * i + 2]);
        vs.push(q);
        pts.push(W / 2 + s * q[0], H / 2 - s * q[1]);
        zs += q[2];
      }
      // Newell's method: a robust normal even when a quad has two coincident corners.
      let nx = 0;
      let ny = 0;
      let nz = 0;
      for (let i = 0; i < n; i++) {
        const [x0, y0, z0] = vs[i];
        const [x1, y1, z1] = vs[(i + 1) % n];
        nx += (y0 - y1) * (z0 + z1);
        ny += (z0 - z1) * (x0 + x1);
        nz += (x0 - x1) * (y0 + y1);
      }
      const len = Math.hypot(nx, ny, nz);
      const lum = len > 0 ? 0.38 + 0.62 * Math.abs((nx * light[0] + ny * light[1] + nz * light[2]) / len) : 0.8;
      return { pts, z: zs / n, kind: f.kind, lum };
    });
    items.sort((p, q) => p.z - q.z);
    const shade = dark ? 1.0 : 0.92;
    for (const it of items) {
      const base = it.kind === 1 ? cSlice : cSolid;
      const k = it.kind === 2 ? 1 : it.lum * shade;
      const alpha = it.kind === 1 ? 0.95 : it.kind === 2 ? (translucent ? 0.32 : 0.55) : translucent ? 0.4 : 0.9;
      const fill = `rgba(${Math.round(base[0] * k)},${Math.round(base[1] * k)},${Math.round(base[2] * k)},${alpha})`;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(it.pts[0], it.pts[1]);
      for (let i = 2; i < it.pts.length; i += 2) ctx.lineTo(it.pts[i], it.pts[i + 1]);
      ctx.closePath();
      ctx.fill();
      if (alpha > 0.85) {
        ctx.strokeStyle = fill;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
    // Axis of rotation on top, dashed.
    if (ax.dir === 'h') line([extent[0], ax.k, 0], [extent[1], ax.k, 0], css.getPropertyValue('--color-ink-2').trim(), 1.5, [6, 5]);
    else line([ax.k, extent[0], 0], [ax.k, extent[1], 0], css.getPropertyValue('--color-ink-2').trim(), 1.5, [6, 5]);
  }, [faces, ax, center, radius, yaw, pitch, W, H, dark, translucent, extent]);

  const onDown = (e: RPointerEvent<HTMLCanvasElement>) => {
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: RPointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    onTurn(dx * 0.01, dy * 0.01);
  };
  return (
    <div ref={wrap} className="w-full">
      <canvas
        ref={canvas}
        role="img"
        aria-label="Three-dimensional view of the solid of revolution; drag to turn it"
        className="block cursor-grab rounded-lg bg-surface"
        style={{ width: W, height: H, touchAction: 'none' }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
    </div>
  );
}

// ---------- the widget ----------

export default function SolidOfRevolution({ params }: WidgetProps) {
  const fsrc = str(params, 'f', 'sqrt(x)');
  const gsrc = str(params, 'g', '0');
  const f = useMemo(() => compile1(fsrc, 'f'), [fsrc]);
  const g = useMemo(() => compile1(gsrc, 'g'), [gsrc]);
  const top = useMemo<Fn>(() => (x) => Math.max(f(x), g(x)), [f, g]);
  const bot = useMemo<Fn>(() => (x) => Math.min(f(x), g(x)), [f, g]);
  const a = num(params, 'a', 0);
  const b = num(params, 'b', 4);
  if (!(b > a)) throw new Error('parameters "a" and "b" should satisfy a < b');
  const axisStr = str(params, 'axis', 'x-axis');
  const axisList = strArray(params, 'axes', [axisStr]);
  const axesParsed = useMemo(() => axisList.map(parseAxis), [axisList.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  const methods = strArray(params, 'methods', ['disk', 'shell']) as Method[];
  for (const m of methods) if (m !== 'disk' && m !== 'shell') throw new Error(`parameter "methods": unknown method "${m}" (use disk, shell)`);
  const nMax = Math.max(2, Math.round(num(params, 'nMax', 40)));
  const exactParam = params.exact === undefined ? undefined : num(params, 'exact', 0);
  const exactTex = params.exactTex === undefined ? undefined : str(params, 'exactTex', '');
  const fTex = str(params, 'fTex', fsrc);
  const gTex = str(params, 'gTex', gsrc);

  const [axisIdx, setAxisIdx] = useState(() => Math.max(0, axisList.indexOf(axisStr)));
  const ax = axesParsed[Math.min(axisIdx, axesParsed.length - 1)];
  const [method, setMethod] = useState<Method>(() => oneOf(params, 'method', methods, methods[0]));
  const [n, setN] = useState(clamp(Math.round(num(params, 'n', 8)), 1, nMax));
  const [phiDeg, setPhiDeg] = useState(360);
  const [playing, setPlaying] = useState(false);
  const [yaw, setYaw] = useState(-0.55);
  const [pitch, setPitch] = useState(0.38);
  const [showSlice, setShowSlice] = useState(true);
  const [stack, setStack] = useState(false);

  // Range of y over the region.
  const [ymin, ymax] = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 400; i++) {
      const x = a + ((b - a) * i) / 400;
      const t = top(x);
      const u = bot(x);
      if (Number.isFinite(t)) hi = Math.max(hi, t);
      if (Number.isFinite(u)) lo = Math.min(lo, u);
    }
    return [lo, hi];
  }, [top, bot, a, b]);

  // Strips run along dx for (horizontal axis, disks) and (vertical axis, shells); along dy otherwise.
  const alongX = (ax.dir === 'h') === (method === 'disk');
  const [lo, hi] = alongX ? [a, b] : [ymin, ymax];
  const [pos, setPos] = useState<number | null>(null);
  const sPos = clamp(pos ?? lo + (hi - lo) * 0.55, lo, hi);
  const dw = (hi - lo) / n;

  // Exact volume by the simplest formula for the axis (Pappus-type single integrals).
  const volume = useMemo(() => {
    if (ax.dir === 'h') {
      return Math.PI * integrate((x) => {
        const d1 = Math.abs(top(x) - ax.k);
        const d2 = Math.abs(bot(x) - ax.k);
        const straddle = (top(x) - ax.k) * (bot(x) - ax.k) <= 0;
        const R = Math.max(d1, d2);
        const r = straddle ? 0 : Math.min(d1, d2);
        return R * R - r * r;
      }, a, b, 1e-12);
    }
    return 2 * Math.PI * integrate((x) => Math.abs(x - ax.k) * (top(x) - bot(x)), a, b, 1e-12);
  }, [ax, top, bot, a, b]);
  const isDefaultAxis = axisList[Math.min(axisIdx, axisList.length - 1)] === axisStr;
  const exact = exactParam !== undefined && isDefaultAxis ? exactParam : volume;
  const straddles = ax.dir === 'v' ? a < ax.k && ax.k < b : ymin < ax.k && ax.k < ymax && (() => {
    for (let i = 0; i <= 100; i++) {
      const x = a + ((b - a) * i) / 100;
      if (bot(x) < ax.k - 1e-12 && top(x) > ax.k + 1e-12) return true;
    }
    return false;
  })();

  /** Rectangles (in the plane) making up the strip centred at s with width w. */
  const stripRects = (s: number, w: number): [number, number, number, number][] => {
    if (alongX) {
      const x0 = Math.max(a, s - w / 2);
      const x1 = Math.min(b, s + w / 2);
      return [[x0, x1, bot(s), top(s)]];
    }
    const y0 = Math.max(ymin, s - w / 2);
    const y1 = Math.min(ymax, s + w / 2);
    return crossSection(top, bot, a, b, s).map(([p, q]) => [p, q, y0, y1]);
  };
  const stripVolume = (s: number, w: number): number => {
    if (alongX) {
      if (ax.dir === 'h') {
        const d1 = Math.abs(top(s) - ax.k);
        const d2 = Math.abs(bot(s) - ax.k);
        const straddle = (top(s) - ax.k) * (bot(s) - ax.k) <= 0;
        const R = Math.max(d1, d2);
        const r = straddle ? 0 : Math.min(d1, d2);
        return Math.PI * (R * R - r * r) * w;
      }
      return 2 * Math.PI * Math.abs(s - ax.k) * (top(s) - bot(s)) * w;
    }
    const ivs = crossSection(top, bot, a, b, s);
    if (ax.dir === 'v') return washerArea(ivs, ax.k) * w;
    return 2 * Math.PI * Math.abs(s - ax.k) * ivs.reduce((t, [p, q]) => t + q - p, 0) * w;
  };
  const sliceSum = useMemo(() => {
    let t = 0;
    for (let i = 0; i < n; i++) t += stripVolume(lo + (i + 0.5) * dw, dw);
    return t;
  }, [n, lo, dw, alongX, ax, top, bot, a, b]); // eslint-disable-line react-hooks/exhaustive-deps

  // Geometry for the 3D view.
  const phi = (phiDeg * Math.PI) / 180;
  const faces = useMemo(() => {
    const out: Face[] = [];
    const M = 40;
    const outline: [number, number][] = [];
    for (let i = 0; i <= M; i++) {
      const x = a + ((b - a) * i) / M;
      outline.push([x, top(x)]);
    }
    for (let i = M; i >= 0; i--) {
      const x = a + ((b - a) * i) / M;
      outline.push([x, bot(x)]);
    }
    if (stack) {
      for (let i = 0; i < n; i++) for (const [x0, x1, y0, y1] of stripRects(lo + (i + 0.5) * dw, dw)) sweep([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], ax, Math.max(phi, 1e-6), 0, 40, out);
    } else if (phi > 1e-6) {
      sweep(outline, ax, phi, 0, 48, out);
    }
    // The flat region itself, where the sweep does not already provide it as an end cap.
    if (phi < 1e-6 || (stack && phi < 2 * Math.PI - 1e-9)) out.push({ p: outline.flatMap(([x, y]) => rotatePoint(ax, x, y, 0)), kind: 2 });
    if (showSlice) for (const [x0, x1, y0, y1] of stripRects(sPos, dw)) sweep([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], ax, Math.max(phi, 1e-6), 1, 48, out);
    return out;
  }, [phi, stack, n, lo, dw, ax, a, b, top, bot, showSlice, sPos, alongX, ymin, ymax]); // eslint-disable-line react-hooks/exhaustive-deps

  const { center, radius, extent } = useMemo(() => {
    let R = 0;
    for (let i = 0; i <= 200; i++) {
      const x = a + ((b - a) * i) / 200;
      if (ax.dir === 'h') R = Math.max(R, Math.abs(top(x) - ax.k), Math.abs(bot(x) - ax.k));
      else R = Math.max(R, Math.abs(x - ax.k));
    }
    if (ax.dir === 'h') {
      const half = (b - a) / 2;
      return { center: [(a + b) / 2, ax.k, 0] as [number, number, number], radius: Math.hypot(half, R) || 1, extent: [Math.min(a, 0) - 0.3 * half, Math.max(b, 0) + 0.3 * half] as [number, number] };
    }
    const half = (ymax - ymin) / 2;
    return { center: [ax.k, (ymin + ymax) / 2, 0] as [number, number, number], radius: Math.hypot(half, R) || 1, extent: [Math.min(ymin, 0) - 0.3 * half, Math.max(ymax, 0) + 0.3 * half] as [number, number] };
  }, [ax, a, b, top, bot, ymin, ymax]);

  useAnimation(playing, (dt) => {
    setPhiDeg((p) => {
      const next = p + dt * 90;
      if (next >= 360) {
        setPlaying(false);
        return 360;
      }
      return next;
    });
  });

  // 2D view.
  const autoView = useMemo<[number, number, number, number]>(() => {
    const xs = [a, b, ...(ax.dir === 'v' ? [ax.k] : [])];
    const ys = [ymin, ymax, 0, ...(ax.dir === 'h' ? [ax.k] : [])];
    const x0 = Math.min(...xs, 0);
    const x1 = Math.max(...xs, 0);
    const y0 = Math.min(...ys);
    const y1 = Math.max(...ys);
    const px = (x1 - x0) * 0.12 || 1;
    const py = (y1 - y0) * 0.15 || 1;
    return [x0 - px, x1 + px, y0 - py, y1 + py];
  }, [a, b, ax, ymin, ymax]);
  const v2 = params.view === undefined ? autoView : readView(params, 'view', autoView);

  const rects = stripRects(sPos, dw);
  const radiusMarks = () => {
    if (!rects.length) return null;
    if (alongX) {
      const [x0, x1, y0, y1] = rects[0];
      const xm = (x0 + x1) / 2;
      if (ax.dir === 'h') {
        const far = Math.abs(y1 - ax.k) >= Math.abs(y0 - ax.k) ? y1 : y0;
        const near = far === y1 ? y0 : y1;
        const straddle = (y1 - ax.k) * (y0 - ax.k) <= 0;
        return (
          <>
            <Segment x1={xm} y1={ax.k} x2={xm} y2={far} color="var(--plot-2)" width={2.5} />
            <Label x={xm} y={(ax.k + far) / 2} dx={13} dy={14} color="var(--plot-2)" size={12} weight={600}>R</Label>
            {!straddle && Math.abs(near - ax.k) > 1e-9 && (
              <>
                <Segment x1={x0} y1={ax.k} x2={x0} y2={near} color="var(--plot-5)" width={2.5} />
                <Label x={x0} y={(ax.k + near) / 2} dx={-6} dy={4} anchor="end" color="var(--plot-5)" size={12} weight={600}>r</Label>
              </>
            )}
          </>
        );
      }
      const ym = (y0 + y1) / 2;
      return (
        <>
          <Segment x1={ax.k} y1={ym} x2={xm} y2={ym} color="var(--plot-2)" width={2.5} />
          <Label x={(ax.k + xm) / 2} y={ym} dy={-8} anchor="middle" color="var(--plot-2)" size={12} weight={600}>radius</Label>
        </>
      );
    }
    const [x0, x1, y0, y1] = rects[0];
    const ym = (y0 + y1) / 2;
    if (ax.dir === 'v') {
      const far = Math.abs(x1 - ax.k) >= Math.abs(x0 - ax.k) ? x1 : x0;
      const near = far === x1 ? x0 : x1;
      return (
        <>
          <Segment x1={ax.k} y1={ym} x2={far} y2={ym} color="var(--plot-2)" width={2.5} />
          <Label x={(ax.k + far) / 2} y={ym} dy={-8} anchor="middle" color="var(--plot-2)" size={12} weight={600}>R</Label>
          {Math.abs(near - ax.k) > 1e-9 && (x0 - ax.k) * (x1 - ax.k) > 0 && (
            <>
              <Segment x1={ax.k} y1={y0} x2={near} y2={y0} color="var(--plot-5)" width={2.5} />
              <Label x={(ax.k + near) / 2} y={y0} dy={16} anchor="middle" color="var(--plot-5)" size={12} weight={600}>r</Label>
            </>
          )}
        </>
      );
    }
    const xm = (x0 + x1) / 2;
    return (
      <>
        <Segment x1={xm} y1={ax.k} x2={xm} y2={ym} color="var(--plot-2)" width={2.5} />
        <Label x={xm} y={(ax.k + ym) / 2} dx={8} dy={4} color="var(--plot-2)" size={12} weight={600}>radius</Label>
      </>
    );
  };

  const sliceVol = stripVolume(sPos, dw);
  const dvar = alongX ? 'x' : 'y';
  const formula =
    method === 'disk'
      ? `V=\\pi\\int_{${fmt(lo).replace('−', '-')}}^{${fmt(hi).replace('−', '-')}}\\big(R(${dvar})^2-r(${dvar})^2\\big)\\,d${dvar}`
      : `V=2\\pi\\int_{${fmt(lo).replace('−', '-')}}^{${fmt(hi).replace('−', '-')}}(\\text{radius})(\\text{${alongX ? 'height' : 'length'}})\\,d${dvar}`;
  // A disk-method slice is a washer when the strip does not reach the axis.
  const sliceName =
    method === 'shell'
      ? 'shell'
      : rects.length && (ax.dir === 'h' ? (rects[0][2] - ax.k) * (rects[0][3] - ax.k) : (rects[0][0] - ax.k) * (rects[0][1] - ax.k)) > 1e-9
        ? 'washer'
        : 'disk';

  const twoD = (
    <Plot view={v2} equal aspect={0.85} minHeight={230} maxHeight={400} label="The region, the axis of rotation and one slice">
      <FillBetween top={top} bottom={bot} a={a} b={b} fill="var(--plot-1)" opacity={0.2} />
      <FnPath f={f} from={a} to={b} color="var(--plot-1)" />
      <FnPath f={g} from={a} to={b} color="var(--plot-6)" />
      {ax.dir === 'h' ? <Line x={0} y={ax.k} slope={0} color="var(--color-ink-2)" width={1.5} dash="6 5" /> : <Line x={ax.k} y={0} slope={Infinity} color="var(--color-ink-2)" width={1.5} dash="6 5" />}
      {showSlice && rects.map(([x0, x1, y0, y1], i) => <Rect key={i} x={x0} y={y0} w={x1 - x0} h={y1 - y0} fill="var(--plot-4)" opacity={0.65} color="var(--plot-4)" width={1.5} />)}
      {showSlice && radiusMarks()}
      {showSlice &&
        (alongX ? (
          <Draggable x={sPos} y={(top(sPos) + bot(sPos)) / 2} color="var(--plot-4)" label="Slice position" onChange={(x) => setPos(clamp(x, lo, hi))} step={(hi - lo) / 100} />
        ) : (
          <Draggable x={rects.length ? (rects[0][0] + rects[0][1]) / 2 : (a + b) / 2} y={sPos} color="var(--plot-4)" label="Slice position" onChange={(_x, y) => setPos(clamp(y, lo, hi))} step={(hi - lo) / 100} />
        ))}
    </Plot>
  );

  return (
    <Frame
      title={str(params, 'title', 'Solid of revolution')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button onClick={() => { if (!playing && phiDeg >= 360) setPhiDeg(0); setPlaying((p) => !p); }}>{playing ? 'Pause' : 'Sweep'}</Button>
          <Button onClick={() => { setPlaying(false); setPhiDeg(360); setYaw(-0.55); setPitch(0.38); }}>Reset</Button>
        </>
      }
    >
      <div className="flex flex-wrap gap-3">
        {axesParsed.length > 1 && <Segmented label="Axis of rotation" options={axesParsed.map((x, i) => ({ value: String(i), label: x.label }))} value={String(axisIdx)} onChange={(v) => { setAxisIdx(Number(v)); setPos(null); }} />}
        {methods.length > 1 && <Segmented label="Slices" options={methods.map((m) => ({ value: m, label: m === 'disk' ? 'Disks / washers' : 'Shells' }))} value={method} onChange={(m) => { setMethod(m); setPos(null); }} />}
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] sm:items-center">
        {twoD}
        <Solid3D faces={faces} ax={ax} center={center} radius={radius} yaw={yaw} pitch={pitch} onTurn={(dy, dp) => { setYaw((y) => y + dy); setPitch((p) => clamp(p + dp, -1.45, 1.45)); }} translucent={showSlice && !stack} extent={extent} />
      </div>
      <Legend items={[{ color: 'var(--plot-1)', label: <Tex>{`y=${fTex}`}</Tex> }, ...(gsrc.trim() !== '0' ? [{ color: 'var(--plot-6)', label: <Tex>{`y=${gTex}`}</Tex> }] : []), { color: 'var(--color-ink-2)', label: `axis: ${ax.label}`, dash: true }, ...(showSlice ? [{ color: 'var(--plot-4)', label: `one ${sliceName}` }] : [])]} />
      <div className="overflow-x-auto text-sm">
        <Tex>{formula}</Tex>
      </div>
      <ReadoutGrid>
        <Readout label="Volume (integral)" value={exactTex && isDefaultAxis ? <span className="inline-flex items-baseline gap-1.5"><Tex>{exactTex}</Tex> ≈ {sig(exact, 7)}</span> : sig(exact, 7)} tone="var(--plot-1)" />
        <Readout label={`Sum of ${n} ${method === 'disk' ? 'slices' : 'shells'}`} value={sig(sliceSum, 7)} />
        <Readout label={`This ${sliceName}'s volume`} value={sig(sliceVol, 4)} tone="var(--plot-4)" />
      </ReadoutGrid>
      <Controls>
        <Slider label="Sweep angle" value={phiDeg} min={0} max={360} step={1} onChange={(d) => { setPlaying(false); setPhiDeg(d); }} format={(d) => `${Math.round(d)}°`} />
        <Slider label="Turn the 3D view" value={yaw} min={-Math.PI} max={Math.PI} step={0.01} onChange={setYaw} format={(t) => `${Math.round((t * 180) / Math.PI)}°`} />
        <Slider label="n (number of slices)" value={n} min={1} max={nMax} step={1} onChange={(k) => setN(Math.round(k))} format={(k) => String(Math.round(k))} />
        <Slider label={`Slice position (${dvar})`} value={sPos} min={lo} max={hi} step={(hi - lo) / 200} onChange={setPos} />
      </Controls>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Toggle label="Highlight one slice" checked={showSlice} onChange={setShowSlice} />
        <Toggle label={`Build the solid from ${n} slices`} checked={stack} onChange={setStack} />
      </div>
      {straddles && <Note tone="warn">The axis passes through the region, so parts of the region sweep through the same space. The volume shown counts that space once.</Note>}
    </Frame>
  );
}
