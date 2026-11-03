/**
 * A light 3D scene for the Calculus III widgets: orthographic projection with azimuth and
 * elevation, a canvas sized in real pixels (sharp on high-DPI screens), drag to rotate, an
 * optional grabbable handle, and small drawing helpers. World z is up.
 *
 *   <Scene3D cam={cam} onCam={setCam} fit={1.6} draw={(ctx, P) => { line(ctx, P, a, b, '#f00') }} />
 *   <CamSliders cam={cam} onCam={setCam} />   // keyboard path for the rotation
 */
import { useEffect, useRef, type PointerEvent as RPointerEvent } from 'react';
import { useElementSize } from './hooks';
import { Slider } from './controls';
import { clamp } from './num';

export type Vec3 = [number, number, number];
export interface Cam {
  /** Degrees about the z axis. */
  az: number;
  /** Degrees above the xy-plane. */
  el: number;
}

export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const scale = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
export const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);

export interface Proj {
  w: number;
  h: number;
  /** Pixels per world unit. */
  s: number;
  /** Screen right, screen up and toward-the-viewer directions in world coordinates. */
  r: Vec3;
  up: Vec3;
  d: Vec3;
  /** World point to [screen x, screen y, depth]; larger depth is nearer the viewer. */
  p: (v: Vec3) => [number, number, number];
  /** The world point at height z under a screen point, or null when looking edge-on. */
  atHeight: (sx: number, sy: number, z: number) => [number, number] | null;
  /** A screen displacement as a world displacement parallel to the screen. */
  delta: (dx: number, dy: number) => Vec3;
}

export function makeProj(cam: Cam, w: number, h: number, fit: number, centre: Vec3 = [0, 0, 0]): Proj {
  const a = (cam.az * Math.PI) / 180;
  const e = (cam.el * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const ce = Math.cos(e);
  const se = Math.sin(e);
  const r: Vec3 = [-sa, ca, 0];
  const up: Vec3 = [-se * ca, -se * sa, ce];
  const d: Vec3 = [ce * ca, ce * sa, se];
  const s = (0.5 * Math.min(w, h)) / fit;
  const cx = w / 2;
  const cy = h / 2;
  const p = (v: Vec3): [number, number, number] => {
    const x = v[0] - centre[0];
    const y = v[1] - centre[1];
    const z = v[2] - centre[2];
    return [cx + s * (x * r[0] + y * r[1]), cy - s * (x * up[0] + y * up[1] + z * up[2]), x * d[0] + y * d[1] + z * d[2]];
  };
  const atHeight = (sx: number, sy: number, z: number): [number, number] | null => {
    // Solve  X r0 + Y r1 = px,  X up0 + Y up1 = py - Z up2  for X, Y.
    const px = (sx - cx) / s;
    const py = (cy - sy) / s - (z - centre[2]) * up[2];
    const det = r[0] * up[1] - r[1] * up[0];
    if (Math.abs(det) < 0.08) return null;
    const X = (px * up[1] - r[1] * py) / det;
    const Y = (r[0] * py - px * up[0]) / det;
    return [X + centre[0], Y + centre[1]];
  };
  const delta = (dx: number, dy: number): Vec3 => add(scale(r, dx / s), scale(up, -dy / s));
  return { w, h, s, r, up, d, p, atHeight, delta };
}

export function Scene3D({
  cam,
  onCam,
  fit,
  centre,
  draw,
  onGrab,
  onDrag,
  aspect = 0.8,
  minHeight = 260,
  maxHeight = 460,
  elRange = [-5, 89],
  label,
}: {
  cam: Cam;
  onCam: (c: Cam) => void;
  /** World radius that must fit in the view. */
  fit: number;
  centre?: Vec3;
  draw: (ctx: CanvasRenderingContext2D, P: Proj) => void;
  /** Return true if the pointer went down on a handle; drags then go to onDrag instead of rotating. */
  onGrab?: (x: number, y: number, P: Proj) => boolean;
  onDrag?: (x: number, y: number, P: Proj) => void;
  aspect?: number;
  minHeight?: number;
  maxHeight?: number;
  elRange?: [number, number];
  label: string;
}) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const cv = useRef<HTMLCanvasElement>(null);
  const w = size.width || 600;
  const h = Math.round(clamp(w * aspect, minHeight, maxHeight));
  const P = makeProj(cam, w, h, fit, centre);
  const drag = useRef<{ kind: 'orbit' | 'grab'; x: number; y: number; cam: Cam } | null>(null);

  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    const ctx = c.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    draw(ctx, P);
  });

  const local = (e: RPointerEvent<HTMLCanvasElement>): [number, number] => {
    const rc = e.currentTarget.getBoundingClientRect();
    return [e.clientX - rc.left, e.clientY - rc.top];
  };

  return (
    <div ref={ref} className="w-full">
      <canvas
        ref={cv}
        role="img"
        aria-label={label}
        className="block cursor-grab rounded-lg bg-surface active:cursor-grabbing"
        style={{ width: w, height: h, touchAction: 'none' }}
        onPointerDown={(e) => {
          const [x, y] = local(e);
          const grab = onGrab?.(x, y, P) ?? false;
          drag.current = { kind: grab ? 'grab' : 'orbit', x, y, cam };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const [x, y] = local(e);
          if (d.kind === 'grab') onDrag?.(x, y, P);
          else onCam({ az: d.cam.az - (x - d.x) * 0.45, el: clamp(d.cam.el + (y - d.y) * 0.45, elRange[0], elRange[1]) });
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      />
    </div>
  );
}

/** Keyboard (and precise) control of the view angles. */
export function CamSliders({ cam, onCam, elRange = [-5, 89] }: { cam: Cam; onCam: (c: Cam) => void; elRange?: [number, number] }) {
  const az = ((cam.az % 360) + 360) % 360;
  return (
    <>
      <Slider label="Turn (azimuth)" value={Math.round(az)} min={0} max={359} step={1} format={(v) => `${v}°`} onChange={(v) => onCam({ ...cam, az: v })} />
      <Slider label="Tilt (elevation)" value={Math.round(cam.el)} min={elRange[0]} max={elRange[1]} step={1} format={(v) => `${v}°`} onChange={(v) => onCam({ ...cam, el: v })} />
    </>
  );
}

export function font(size = 12, weight = 400): string {
  const fam = typeof document !== 'undefined' ? getComputedStyle(document.body).fontFamily : 'sans-serif';
  return `${weight} ${size}px ${fam}`;
}

export function line(ctx: CanvasRenderingContext2D, P: Proj, a: Vec3, b: Vec3, color: string, width = 1.5, dash?: number[]) {
  const [x1, y1] = P.p(a);
  const [x2, y2] = P.p(b);
  ctx.beginPath();
  ctx.setLineDash(dash ?? []);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.setLineDash([]);
}

export function polyline(ctx: CanvasRenderingContext2D, P: Proj, pts: (Vec3 | null)[], color: string, width = 2, dash?: number[]) {
  ctx.beginPath();
  ctx.setLineDash(dash ?? []);
  let pen = false;
  for (const q of pts) {
    if (!q || !q.every(Number.isFinite)) {
      pen = false;
      continue;
    }
    const [x, y] = P.p(q);
    if (pen) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
    pen = true;
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.setLineDash([]);
}

export function arrow(ctx: CanvasRenderingContext2D, P: Proj, a: Vec3, b: Vec3, color: string, width = 2.5, head = 11) {
  const [x1, y1] = P.p(a);
  const [x2, y2] = P.p(b);
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 0.5) return;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const hh = Math.min(head, len * 0.6);
  const bx = x2 - ux * hh;
  const by = y2 - uy * hh;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(bx - uy * hh * 0.45, by + ux * hh * 0.45);
  ctx.lineTo(bx + uy * hh * 0.45, by - ux * hh * 0.45);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export function poly(ctx: CanvasRenderingContext2D, P: Proj, pts: Vec3[], fill?: string, stroke?: string, width = 1) {
  ctx.beginPath();
  pts.forEach((q, i) => {
    const [x, y] = P.p(q);
    if (i) ctx.lineTo(x, y);
    else ctx.moveTo(x, y);
  });
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

export function dot3(ctx: CanvasRenderingContext2D, P: Proj, a: Vec3, color: string, r = 5, ring?: string) {
  const [x, y] = P.p(a);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  if (ring) {
    ctx.strokeStyle = ring;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

/** Text at a world point with a halo in `halo` (the surface colour) so it reads over lines. */
export function text(ctx: CanvasRenderingContext2D, P: Proj, a: Vec3, s: string, color: string, halo: string, opts: { dx?: number; dy?: number; align?: CanvasTextAlign; size?: number; weight?: number } = {}) {
  const [x, y] = P.p(a);
  ctx.font = font(opts.size ?? 12, opts.weight ?? 500);
  ctx.textAlign = opts.align ?? 'center';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 3;
  ctx.strokeStyle = halo;
  ctx.strokeText(s, x + (opts.dx ?? 0), y + (opts.dy ?? 0));
  ctx.fillStyle = color;
  ctx.fillText(s, x + (opts.dx ?? 0), y + (opts.dy ?? 0));
}
