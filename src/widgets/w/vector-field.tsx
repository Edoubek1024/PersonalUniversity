/**
 * vector-field: a plane vector field F = ⟨P(x, y), Q(x, y)⟩ drawn as arrows coloured by size,
 * in one of several modes (offer more than one with `modes`).
 *
 *   field    a draggable probe with F there, the flow line through it, and the cross-partials
 *            test P_y = Q_x at the probe and across the view
 *   line     a path from A to B (bend it with its control point C) with the running work
 *            ∫ F · dr up to the moving dot, and the tangential part of F drawn along the path
 *   compare  two paths with the same ends A and B and their two line integrals
 *   probe    a paddle wheel spinning at angular speed (Q_x − P_y)/2 and a small circle with the
 *            outward part of F drawn round it, sized by the divergence P_x + Q_y
 *   green    a closed curve (circle or square, drag its centre) with the circulation ∮ F · dr and
 *            the double integral of Q_x − P_y over the inside, both computed numerically
 *
 * Paths are quadratic Bézier curves r(t) = (1−t)²A + 2t(1−t)C + t²B, 0 ≤ t ≤ 1: the control C at
 * the midpoint gives the segment, and C = (0, 0.5) with A = (0, 0), B = (1, 1) gives x = y².
 *
 * Params:
 *   P, Q      string    components of F in x and y                    default "-y", "x"
 *   fields    [label, P, Q][]   several fields to switch between (overrides P, Q)
 *   view      [xMin, xMax, yMin, yMax]   (equal scale)                default [-3, 3, -3, 3]
 *   modes     string[]  modes offered, first shown first              default ["field"]
 *   A, B      [x, y]    path ends                                     default [-2, -1], [2, 1]
 *   C1, C2    [x, y]    controls of path 1 and 2                      default midpoint, and bent
 *   potential string    f with F = ∇f, for the readout f(B) − f(A)    default none
 *   probe     [x, y]    initial probe position                        default [1, 1]
 *   curve     "circle" | "square"   green mode                        default "circle"
 *   centre    [x, y]    centre of the closed curve                    default [0, 0]
 *   r         number    radius (or half side) of the closed curve     default 1.5
 *   singular  [x, y][]  points where F may be undefined (used only where it is)   default []
 *   normalize boolean   draw all arrows the same length               default false
 *   title     string                                                  default "Vector field"
 *   caption   string    may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { bool, num, oneOf, str, strArray, view as readView } from '../kit/params';
import { Arrow, Dot, Draggable, Label, Plot, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { fmt, simpson } from '../kit/num';
import { useAnimation } from '../kit/hooks';
import { ramp, rasterize, type V4 } from '../kit/calc3-contour';
import { caption, point, TL, useColors } from '../kit/calc3-ui';

const MODES = ['field', 'line', 'compare', 'probe', 'green'] as const;
type Mode = (typeof MODES)[number];
const MODE_LABEL: Record<Mode, string> = { field: 'Field', line: 'Line integral', compare: 'Two paths', probe: 'Curl and divergence', green: "Green's theorem" };
type Pt = [number, number];
type Field = (x: number, y: number) => Pt;

interface FieldDef {
  label: string;
  F: Field;
  P: (x: number, y: number) => number;
  Q: (x: number, y: number) => number;
}

function compileField(label: string, ps: string, qs: string): FieldDef {
  const cp = tryCompile(ps, ['x', 'y']);
  const cq = tryCompile(qs, ['x', 'y']);
  if (!cp.fn) throw new Error(`P of "${label}": ${cp.error}`);
  if (!cq.fn) throw new Error(`Q of "${label}": ${cq.error}`);
  const P = cp.fn;
  const Q = cq.fn;
  return { label, P: (x, y) => P(x, y), Q: (x, y) => Q(x, y), F: (x, y) => [P(x, y), Q(x, y)] };
}

function readFields(p: Record<string, unknown>): FieldDef[] {
  if (p.fields !== undefined) {
    const v = p.fields;
    if (!Array.isArray(v) || !v.length || !v.every((q) => Array.isArray(q) && q.length === 3 && q.every((s) => typeof s === 'string')))
      throw new Error(`parameter "fields" should be a list of [label, P, Q] string triples, got ${JSON.stringify(v)}`);
    return (v as string[][]).map(([l, a, b]) => compileField(l, a, b));
  }
  const ps = str(p, 'P', '-y');
  const qs = str(p, 'Q', 'x');
  return [compileField(`⟨${ps}, ${qs}⟩`, ps, qs)];
}

const bez = (A: Pt, C: Pt, B: Pt, t: number): Pt => {
  const s = 1 - t;
  return [s * s * A[0] + 2 * s * t * C[0] + t * t * B[0], s * s * A[1] + 2 * s * t * C[1] + t * t * B[1]];
};
const bezD = (A: Pt, C: Pt, B: Pt, t: number): Pt => [2 * (1 - t) * (C[0] - A[0]) + 2 * t * (B[0] - C[0]), 2 * (1 - t) * (C[1] - A[1]) + 2 * t * (B[1] - C[1])];

/** ∫ F · dr along the Bézier path for 0 ≤ t ≤ t1. */
function work(F: Field, A: Pt, C: Pt, B: Pt, t1: number): number {
  if (t1 <= 0) return 0;
  return simpson(
    (t) => {
      const [x, y] = bez(A, C, B, t);
      const [dx, dy] = bezD(A, C, B, t);
      const [p, q] = F(x, y);
      return p * dx + q * dy;
    },
    0,
    t1,
    400,
  );
}

/** A closed curve: position and velocity for 0 ≤ s ≤ 1, anticlockwise. */
function loop(kind: 'circle' | 'square', c: Pt, r: number) {
  if (kind === 'circle')
    return {
      at: (s: number): Pt => [c[0] + r * Math.cos(2 * Math.PI * s), c[1] + r * Math.sin(2 * Math.PI * s)],
      vel: (s: number): Pt => [-2 * Math.PI * r * Math.sin(2 * Math.PI * s), 2 * Math.PI * r * Math.cos(2 * Math.PI * s)],
      area: Math.PI * r * r,
    };
  // Square [c ± r]^2, corners in anticlockwise order, each side a quarter of s.
  const corners: Pt[] = [
    [c[0] + r, c[1] - r],
    [c[0] + r, c[1] + r],
    [c[0] - r, c[1] + r],
    [c[0] - r, c[1] - r],
  ];
  const side = (s: number) => Math.min(3, Math.floor(s * 4));
  return {
    at: (s: number): Pt => {
      const k = side(s);
      const u = s * 4 - k;
      const a = corners[(k + 3) % 4];
      const b = corners[k];
      return [a[0] + u * (b[0] - a[0]), a[1] + u * (b[1] - a[1])];
    },
    vel: (s: number): Pt => {
      const k = side(s);
      const a = corners[(k + 3) % 4];
      const b = corners[k];
      return [4 * (b[0] - a[0]), 4 * (b[1] - a[1])];
    },
    area: 4 * r * r,
  };
}

function FieldArrows({ F, normalize, refMag }: { F: Field; normalize: boolean; refMag: number }) {
  const { view, width, sx, sy } = usePlot();
  const colors = useColors();
  const paths = useMemo(() => {
    const nx = Math.max(9, Math.round(width / 36));
    const cell = (view[1] - view[0]) / nx;
    const ny = Math.max(1, Math.round((view[3] - view[2]) / cell));
    const NB = 6;
    const bins: string[] = Array(NB).fill('');
    const kpx = width / (view[1] - view[0]);
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++) {
        const x = view[0] + (i + 0.5) * cell;
        const y = view[2] + (j + 0.5) * ((view[3] - view[2]) / ny);
        const [p, q] = F(x, y);
        const m = Math.hypot(p, q);
        if (!Number.isFinite(m) || m < 1e-12) continue;
        const rel = Math.min(1.25, m / refMag);
        const len = 0.82 * cell * (normalize ? 1 : rel);
        const ux = p / m;
        const uy = q / m;
        const x1 = x - (ux * len) / 2;
        const y1 = y - (uy * len) / 2;
        const x2 = x + (ux * len) / 2;
        const y2 = y + (uy * len) / 2;
        const X1 = sx(x1);
        const Y1 = sy(y1);
        const X2 = sx(x2);
        const Y2 = sy(y2);
        const lpx = len * kpx;
        let d = `M${X1.toFixed(1)},${Y1.toFixed(1)}L${X2.toFixed(1)},${Y2.toFixed(1)}`;
        if (lpx > 4) {
          const h = Math.min(6, lpx * 0.45);
          // Screen direction (y flipped).
          const dx = ux;
          const dy = -uy;
          d += `M${(X2 - dx * h - dy * h * 0.55).toFixed(1)},${(Y2 - dy * h + dx * h * 0.55).toFixed(1)}L${X2.toFixed(1)},${Y2.toFixed(1)}L${(X2 - dx * h + dy * h * 0.55).toFixed(1)},${(Y2 - dy * h - dx * h * 0.55).toFixed(1)}`;
        }
        bins[Math.min(NB - 1, Math.floor((Math.min(1.25, m / refMag) / 1.25) * NB))] += d;
      }
    return bins;
  }, [F, view, width, sx, sy, normalize, refMag]);
  const stops = [colors.rgb('--plot-5'), colors.rgb('--plot-1'), colors.rgb('--plot-6')];
  return (
    <g fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, k) => {
        const c = ramp(stops, k / (paths.length - 1));
        return <path key={k} d={d} stroke={`rgb(${c.map(Math.round).join(',')})`} opacity={0.5 + (0.4 * k) / (paths.length - 1)} />;
      })}
    </g>
  );
}

function CurlShade({ curl, cmax, floor }: { curl: (x: number, y: number) => number; cmax: number; floor: number }) {
  const { view, width, height } = usePlot();
  const colors = useColors();
  const img = useMemo(() => {
    if (typeof document === 'undefined') return '';
    const pos = colors.rgb('--plot-3');
    const neg = colors.rgb('--plot-2');
    const amax = colors.dark ? 0.42 : 0.34;
    return rasterize(view as V4, Math.max(40, Math.round(width / 4)), Math.max(30, Math.round(height / 4)), (x, y) => {
      const c = curl(x, y);
      if (!Number.isFinite(c) || Math.abs(c) < Math.max(cmax * 1e-3, floor)) return null;
      const t = Math.min(1, Math.abs(c) / cmax);
      const col = c > 0 ? pos : neg;
      return [col[0], col[1], col[2], Math.round(255 * amax * t)];
    });
  }, [curl, cmax, floor, view, width, height, colors]);
  return img ? <image href={img} x={0} y={0} width={width} height={height} preserveAspectRatio="none" /> : null;
}

/** Paddle wheel (spin angle phi, data orientation) and the outward-flux circle at a point. */
function Probe({ x, y, phi, F, kData }: { x: number; y: number; phi: number; F: Field; kData: number }) {
  const { sx, sy, view, width } = usePlot();
  const kpx = width / (view[1] - view[0]);
  const X = sx(x);
  const Y = sy(y);
  const R = 15;
  const rho = 30;
  const blades = [0, 1, 2, 3].map((k) => phi + (k * Math.PI) / 2);
  const flux = Array.from({ length: 12 }, (_, k) => {
    const a = (k * 2 * Math.PI) / 12;
    const px = x + (rho / kpx) * Math.cos(a);
    const py = y + (rho / kpx) * Math.sin(a);
    const [p, q] = F(px, py);
    const fn = p * Math.cos(a) + q * Math.sin(a);
    const L = Math.max(-16, Math.min(16, fn * kData * kpx));
    return { a, L, X: sx(px), Y: sy(py) };
  });
  return (
    <g>
      <circle cx={X} cy={Y} r={rho} fill="none" stroke="var(--plot-text)" strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
      {flux.map((f, k) => {
        if (Math.abs(f.L) < 1.5) return null;
        const ex = f.X + f.L * Math.cos(f.a);
        const ey = f.Y - f.L * Math.sin(f.a);
        const col = f.L > 0 ? 'var(--plot-3)' : 'var(--plot-2)';
        const dx = Math.sign(f.L) * Math.cos(f.a);
        const dy = -Math.sign(f.L) * Math.sin(f.a);
        const h = Math.min(5, Math.abs(f.L) * 0.5);
        return (
          <g key={k} stroke={col} strokeWidth={2} strokeLinecap="round" fill="none">
            <line x1={f.X} y1={f.Y} x2={ex} y2={ey} />
            <path d={`M${ex - dx * h - dy * h * 0.6},${ey - dy * h + dx * h * 0.6}L${ex},${ey}L${ex - dx * h + dy * h * 0.6},${ey - dy * h - dx * h * 0.6}`} />
          </g>
        );
      })}
      <g stroke="var(--color-ink)" strokeWidth={2.5} strokeLinecap="round">
        {blades.map((a, k) => (
          <line key={k} x1={X} y1={Y} x2={X + R * Math.cos(a)} y2={Y - R * Math.sin(a)} />
        ))}
      </g>
      {blades.map((a, k) => (
        <circle key={k} cx={X + R * Math.cos(a)} cy={Y - R * Math.sin(a)} r={3.2} fill={k === 0 ? 'var(--plot-4)' : 'var(--color-ink)'} />
      ))}
    </g>
  );
}

/** The flow line through a point, traced both ways by RK4 in arc length. */
function flowLine(F: Field, p: Pt, view: V4, sing: Pt[]): Pt[] {
  const span = Math.max(view[1] - view[0], view[3] - view[2]);
  const ds = span / 300;
  const dir = (x: number, y: number, sgn: number): Pt | null => {
    const [a, b] = F(x, y);
    const m = Math.hypot(a, b);
    if (!Number.isFinite(m) || m < 1e-10) return null;
    return [(sgn * a) / m, (sgn * b) / m];
  };
  const trace = (sgn: number) => {
    const out: Pt[] = [];
    let [x, y] = p;
    for (let k = 0; k < 900; k++) {
      const k1 = dir(x, y, sgn);
      if (!k1) break;
      const k2 = dir(x + (ds / 2) * k1[0], y + (ds / 2) * k1[1], sgn);
      if (!k2) break;
      const k3 = dir(x + (ds / 2) * k2[0], y + (ds / 2) * k2[1], sgn);
      if (!k3) break;
      const k4 = dir(x + ds * k3[0], y + ds * k3[1], sgn);
      if (!k4) break;
      x += (ds / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      y += (ds / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      if (x < view[0] || x > view[1] || y < view[2] || y > view[3]) break;
      if (sing.some((s) => Math.hypot(s[0] - x, s[1] - y) < span * 0.02)) break;
      out.push([x, y]);
      // Closed orbit: back near the start after going round.
      if (k > 40 && Math.hypot(x - p[0], y - p[1]) < ds * 0.75) break;
    }
    return out;
  };
  return [...trace(-1).reverse(), p, ...trace(1)];
}

function PolyPath({ pts, color, width, dash, opacity }: { pts: Pt[]; color: string; width: number; dash?: string; opacity?: number }) {
  const { sx, sy } = usePlot();
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`).join('');
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} opacity={opacity} strokeLinejoin="round" strokeLinecap="round" />;
}

export default function VectorField({ params }: WidgetProps) {
  const fields = useMemo(() => readFields(params), [JSON.stringify([params.fields, params.P, params.Q])]); // eslint-disable-line react-hooks/exhaustive-deps
  const v = readView(params, 'view', [-3, 3, -3, 3]);
  const modeList = strArray(params, 'modes', ['field']);
  for (const m of modeList) if (!MODES.includes(m as Mode)) throw new Error(`parameter "modes": unknown mode "${m}" (use ${MODES.join(', ')})`);
  if (!modeList.length) throw new Error('parameter "modes" should list at least one mode');
  const modes = modeList as Mode[];
  const A0 = point(params, 'A', [-2, -1]);
  const B0 = point(params, 'B', [2, 1]);
  const C10 = point(params, 'C1', [(A0[0] + B0[0]) / 2, (A0[1] + B0[1]) / 2]);
  const C20 = point(params, 'C2', [(A0[0] + B0[0]) / 2 - (B0[1] - A0[1]) * 0.6, (A0[1] + B0[1]) / 2 + (B0[0] - A0[0]) * 0.6]);
  const potSrc = str(params, 'potential', '');
  const pot = useMemo(() => {
    if (!potSrc) return null;
    const r = tryCompile(potSrc, ['x', 'y']);
    if (!r.fn) throw new Error(`potential: ${r.error}`);
    return r.fn;
  }, [potSrc]);
  const curveKind = oneOf(params, 'curve', ['circle', 'square'] as const, 'circle');
  const singAll = useMemo(() => {
    const s = params.singular ?? [];
    if (!Array.isArray(s) || !s.every((q) => Array.isArray(q) && q.length === 2 && q.every((x) => typeof x === 'number')))
      throw new Error(`parameter "singular" should be a list of points [x, y], got ${JSON.stringify(s)}`);
    return s as Pt[];
  }, [JSON.stringify(params.singular)]); // eslint-disable-line react-hooks/exhaustive-deps
  const normalize0 = bool(params, 'normalize', false);

  const [fi, setFi] = useState(0);
  const [mode, setMode] = useState<Mode>(modes[0]);
  const [A, setA] = useState<Pt>(A0);
  const [B, setB] = useState<Pt>(B0);
  const [C1, setC1] = useState<Pt>(C10);
  const [C2, setC2] = useState<Pt>(C20);
  const [t, setT] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [probe, setProbe] = useState<Pt>(() => point(params, 'probe', [1, 1]));
  const [phi, setPhi] = useState(0);
  const [centre, setCentre] = useState<Pt>(() => point(params, 'centre', [0, 0]));
  const [r, setR] = useState(() => num(params, 'r', 1.5));
  const [normalize, setNormalize] = useState(normalize0);

  const fd = fields[Math.min(fi, fields.length - 1)];
  const F = fd.F;
  // Only the listed points where this field really is undefined.
  const sing = useMemo(() => singAll.filter((s) => !fd.F(s[0], s[1]).every(Number.isFinite)), [singAll, fd]);
  const span = Math.min(v[1] - v[0], v[3] - v[2]);
  const h = 1e-5 * Math.max(v[1] - v[0], v[3] - v[2]);
  const nearSing = (x: number, y: number, tol = 0.03) => sing.some((s) => Math.hypot(s[0] - x, s[1] - y) < span * tol);
  const Py = (x: number, y: number) => (fd.P(x, y + h) - fd.P(x, y - h)) / (2 * h);
  const Px = (x: number, y: number) => (fd.P(x + h, y) - fd.P(x - h, y)) / (2 * h);
  const Qx = (x: number, y: number) => (fd.Q(x + h, y) - fd.Q(x - h, y)) / (2 * h);
  const Qy = (x: number, y: number) => (fd.Q(x, y + h) - fd.Q(x, y - h)) / (2 * h);
  const curl = useMemo(() => (x: number, y: number) => (nearSing(x, y, 0.004) ? NaN : Qx(x, y) - Py(x, y)), [fd, sing]); // eslint-disable-line react-hooks/exhaustive-deps

  // Typical |F| over the view (for arrow lengths), and the size of the curl.
  const stats = useMemo(() => {
    const ms: number[] = [];
    const cs: number[] = [];
    let worst = { c: 0, x: 0, y: 0 };
    let jac = 0;
    const N = 24;
    for (let j = 0; j <= N; j++)
      for (let i = 0; i <= N; i++) {
        const x = v[0] + ((v[1] - v[0]) * (i + 0.37)) / (N + 0.74);
        const y = v[2] + ((v[3] - v[2]) * (j + 0.41)) / (N + 0.82);
        const [p, q] = F(x, y);
        const m = Math.hypot(p, q);
        if (Number.isFinite(m)) ms.push(m);
        if (nearSing(x, y)) continue;
        const c = Qx(x, y) - Py(x, y);
        if (!Number.isFinite(c)) continue;
        cs.push(Math.abs(c));
        jac = Math.max(jac, Math.abs(Px(x, y)), Math.abs(Py(x, y)), Math.abs(Qx(x, y)), Math.abs(Qy(x, y)));
        if (Math.abs(c) > Math.abs(worst.c)) worst = { c, x, y };
      }
    ms.sort((a, b) => a - b);
    cs.sort((a, b) => a - b);
    return {
      ref: ms[Math.floor(ms.length * 0.85)] || 1,
      cmax: Math.max(1e-9, cs[Math.floor(cs.length * 0.95)] || 0),
      conservative: (cs[cs.length - 1] ?? 0) <= 1e-5 * Math.max(1, jac),
      worst,
      jac,
    };
  }, [F, v.join(), sing]); // eslint-disable-line react-hooks/exhaustive-deps
  // Data units of arrow per unit of |F|, matching the field arrows (about span/14 per typical |F|).
  // Below this, a derivative is numerical noise and shows as 0.
  const zt = 1e-6 * Math.max(1, stats.jac);
  const tz = (x: number) => (Math.abs(x) < zt ? 0 : x);
  const kData = (0.82 * (span / 14)) / stats.ref;

  useAnimation(playing, (dt) => {
    if (mode === 'probe') {
      setPhi((p) => p + 0.5 * curl(probe[0], probe[1]) * dt * 1.5);
    } else {
      setT((x) => {
        const nx = x + dt / 4;
        if (nx >= 1) {
          setPlaying(false);
          return 1;
        }
        return nx;
      });
    }
  });

  const changeMode = (m: Mode) => {
    setMode(m);
    setPlaying(false);
  };

  // Tangential parts of F along a path given by position and velocity functions of s in [0, 1].
  const tangential = (at: (s: number) => Pt, vel: (s: number) => Pt, count: number, kT: number) =>
    Array.from({ length: count }, (_, k) => {
      const s = (k + 0.5) / count;
      const [x, y] = at(s);
      const [dx, dy] = vel(s);
      const l = Math.hypot(dx, dy) || 1;
      const T: Pt = [dx / l, dy / l];
      const [p, q] = F(x, y);
      const ft = p * T[0] + q * T[1];
      if (!Number.isFinite(ft)) return null;
      const L = ft * kT;
      return { x, y, x2: x + T[0] * L, y2: y + T[1] * L, pos: ft >= 0 };
    }).filter((q): q is NonNullable<typeof q> => !!q);

  // Scale for tangential arrows: the largest |F · T| on the curves shown maps to 11% of the view.
  const maxFt = (at: (s: number) => Pt, vel: (s: number) => Pt) => {
    let mx = 0;
    for (let k = 0; k <= 40; k++) {
      const [x, y] = at(k / 40.5 + 0.006);
      const [dx, dy] = vel(k / 40.5 + 0.006);
      const [p, q] = F(x, y);
      const ft = Math.abs((p * dx + q * dy) / (Math.hypot(dx, dy) || 1));
      if (Number.isFinite(ft)) mx = Math.max(mx, ft);
    }
    return mx;
  };
  const pathsShown = mode === 'compare' ? [C1, C2] : [C1];
  const ftMax =
    mode === 'green'
      ? maxFt(loop(curveKind, centre, r).at, loop(curveKind, centre, r).vel)
      : Math.max(...pathsShown.map((C) => maxFt((s) => bez(A, C, B, s), (s) => bezD(A, C, B, s))));
  const kT = (0.11 * span) / (ftMax || 1);

  const pathPts = (C: Pt, t1 = 1) => Array.from({ length: 81 }, (_, k) => bez(A, C, B, (k / 80) * t1));

  // Line integrals.
  const W1 = work(F, A, C1, B, 1);
  const W2 = work(F, A, C2, B, 1);
  const W1t = work(F, A, C1, B, t);
  const W2t = work(F, A, C2, B, t);

  // Green's theorem numbers.
  const lp = loop(curveKind, centre, r);
  const circulation = useMemo(() => {
    if (mode !== 'green') return NaN;
    if (curveKind === 'circle') return simpson((s) => {
      const [x, y] = lp.at(s);
      const [dx, dy] = lp.vel(s);
      const [p, q] = F(x, y);
      return p * dx + q * dy;
    }, 0, 1, 800);
    let tot = 0;
    for (let k = 0; k < 4; k++)
      tot += simpson((s) => {
        const [x, y] = lp.at(s);
        const [dx, dy] = lp.vel(s);
        const [p, q] = F(x, y);
        return p * dx + q * dy;
      }, k / 4 + 1e-12, (k + 1) / 4 - 1e-12, 200);
    return tot;
  }, [mode, F, curveKind, centre[0], centre[1], r]); // eslint-disable-line react-hooks/exhaustive-deps
  const doubleInt = useMemo(() => {
    if (mode !== 'green') return NaN;
    const safe = (x: number, y: number) => {
      const c = curl(x, y);
      return Number.isFinite(c) ? c : 0;
    };
    if (curveKind === 'circle')
      return simpson((rr) => rr * simpson((th) => safe(centre[0] + rr * Math.cos(th), centre[1] + rr * Math.sin(th)), 0, 2 * Math.PI, 120), 0, r, 60);
    return simpson((x) => simpson((y) => safe(x, y), centre[1] - r, centre[1] + r, 80), centre[0] - r, centre[0] + r, 80);
  }, [mode, curl, curveKind, centre[0], centre[1], r]); // eslint-disable-line react-hooks/exhaustive-deps
  const inside = (q: Pt) => (curveKind === 'circle' ? Math.hypot(q[0] - centre[0], q[1] - centre[1]) < r : Math.abs(q[0] - centre[0]) < r && Math.abs(q[1] - centre[1]) < r);
  const singInside = sing.filter(inside);

  const flow = useMemo(() => (mode === 'field' ? flowLine(F, probe, v, sing) : []), [mode, F, probe[0], probe[1], v.join(), sing]); // eslint-disable-line react-hooks/exhaustive-deps

  const clampV = (x: number, y: number): Pt => [Math.min(v[1], Math.max(v[0], x)), Math.min(v[3], Math.max(v[2], y))];
  const vec = (a: number, b: number) => `⟨${fmt(a)}, ${fmt(b)}⟩`;
  const [Fp, Fq] = F(probe[0], probe[1]);
  const pathMode = mode === 'line' || mode === 'compare';

  const conservativeNote = stats.conservative ? (
    <Note tone="good">
      {`P_y = Q_x everywhere in this view${sing.length ? ` (F is undefined at ${sing.map((s) => `(${fmt(s[0])}, ${fmt(s[1])})`).join(', ')})` : ''}, so the field passes the test for a gradient field.`}
    </Note>
  ) : (
    <Note>{`P_y ≠ Q_x: at (${fmt(stats.worst.x, 2)}, ${fmt(stats.worst.y, 2)}), P_y = ${fmt(Py(stats.worst.x, stats.worst.y))} but Q_x = ${fmt(Qx(stats.worst.x, stats.worst.y))}, so F is not a gradient field.`}</Note>
  );

  return (
    <Frame title={str(params, 'title', 'Vector field')} caption={caption(params)}>
      {(fields.length > 1 || modes.length > 1) && (
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {fields.length > 1 && <Segmented label="Field F" options={fields.map((q, i) => ({ value: String(i), label: q.label }))} value={String(fi)} onChange={(s) => setFi(Number(s))} />}
          {modes.length > 1 && <Segmented label="Show" options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={changeMode} />}
        </div>
      )}
      <Plot view={v} equal aspect={0.75} maxHeight={480} label={`Vector field ${fd.label}`}>
        {mode === 'green' && <CurlShade curl={curl} cmax={stats.cmax} floor={zt} />}
        <FieldArrows F={F} normalize={normalize} refMag={stats.ref} />
        {sing.map((s, i) => (
          <Dot key={`s${i}`} x={s[0]} y={s[1]} r={4} color="var(--plot-2)" hollow />
        ))}

        {mode === 'field' && (
          <>
            <PolyPath pts={flow} color="var(--plot-4)" width={2.5} />
            {Number.isFinite(Fp) && <Arrow x1={probe[0]} y1={probe[1]} x2={probe[0] + Fp * kData * 2} y2={probe[1] + Fq * kData * 2} color="var(--color-ink)" width={2.75} head={11} />}
            <Draggable x={probe[0]} y={probe[1]} label="Probe point" color="var(--plot-4)" constrain={clampV} onChange={(x, y) => setProbe([x, y])} />
          </>
        )}

        {pathMode && (
          <>
            {(mode === 'compare' ? [C1, C2] : [C1]).map((C, k) => {
              const col = k === 0 ? 'var(--plot-4)' : 'var(--plot-5)';
              return (
                <g key={k}>
                  <Segment x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} color={col} width={1} dash="3 3" opacity={0.7} />
                  <Segment x1={C[0]} y1={C[1]} x2={B[0]} y2={B[1]} color={col} width={1} dash="3 3" opacity={0.7} />
                  <PolyPath pts={pathPts(C)} color={col} width={2} opacity={0.45} />
                  <PolyPath pts={pathPts(C, t)} color={col} width={3.5} />
                  {tangential(
                    (s) => bez(A, C, B, s),
                    (s) => bezD(A, C, B, s),
                    12,
                    kT,
                  ).map((q, i) => (
                    <Arrow key={i} x1={q.x} y1={q.y} x2={q.x2} y2={q.y2} color={q.pos ? 'var(--plot-3)' : 'var(--plot-2)'} width={2.5} head={8} />
                  ))}
                  <Dot x={bez(A, C, B, t)[0]} y={bez(A, C, B, t)[1]} r={5} color={col} />
                  <Draggable x={C[0]} y={C[1]} r={5} color={col} label={`Control point of path ${k + 1}`} constrain={clampV} onChange={(x, y) => (k === 0 ? setC1([x, y]) : setC2([x, y]))} />
                  <Label x={C[0]} y={C[1]} dx={8} dy={-8} color={col} size={11}>
                    {mode === 'compare' ? `C${k + 1}` : 'C'}
                  </Label>
                </g>
              );
            })}
            <Draggable x={A[0]} y={A[1]} label="Start A" color="var(--color-ink)" constrain={clampV} onChange={(x, y) => setA([x, y])} />
            <Draggable x={B[0]} y={B[1]} label="End B" color="var(--color-ink)" constrain={clampV} onChange={(x, y) => setB([x, y])} />
            <Label x={A[0]} y={A[1]} dx={-10} dy={-10} anchor="end" weight={600}>
              A
            </Label>
            <Label x={B[0]} y={B[1]} dx={10} dy={-10} weight={600}>
              B
            </Label>
          </>
        )}

        {mode === 'probe' && (
          <>
            <Probe x={probe[0]} y={probe[1]} phi={phi} F={F} kData={kData} />
            <Draggable x={probe[0]} y={probe[1]} r={5} label="Probe point" color="var(--plot-4)" constrain={clampV} onChange={(x, y) => setProbe([x, y])} />
          </>
        )}

        {mode === 'green' && (
          <>
            <PolyPath pts={Array.from({ length: 161 }, (_, k) => lp.at(Math.min(k / 160, 1 - 1e-9)))} color="var(--plot-4)" width={3} />
            {tangential(lp.at, lp.vel, 20, kT).map((q, i) => (
              <Arrow key={i} x1={q.x} y1={q.y} x2={q.x2} y2={q.y2} color={q.pos ? 'var(--plot-3)' : 'var(--plot-2)'} width={2.5} head={8} />
            ))}
            {[0.08, 0.58].map((s0) => (
              <Arrow key={s0} x1={lp.at(s0)[0]} y1={lp.at(s0)[1]} x2={lp.at(s0 + 0.03)[0]} y2={lp.at(s0 + 0.03)[1]} color="var(--plot-4)" width={3} head={13} />
            ))}
            <Draggable x={centre[0]} y={centre[1]} r={6} label="Centre of the curve" color="var(--plot-4)" constrain={clampV} onChange={(x, y) => setCentre([x, y])} />
          </>
        )}
      </Plot>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Toggle label="Arrows all the same length" checked={normalize} onChange={setNormalize} />
        {(pathMode || mode === 'probe') && (
          <div className="flex gap-1.5">
            <Button
              primary
              onClick={() => {
                if (!playing && pathMode && t >= 1) setT(0);
                setPlaying((p) => !p);
              }}
            >
              {playing ? 'Pause' : mode === 'probe' ? 'Spin' : 'Play'}
            </Button>
            <Button
              onClick={() => {
                setPlaying(false);
                if (mode === 'probe') setPhi(0);
                else setT(0);
              }}
            >
              Reset
            </Button>
          </div>
        )}
      </div>

      {mode === 'field' && (
        <>
          <Controls cols={3}>
            <Readout label="Probe" value={`(${fmt(probe[0])}, ${fmt(probe[1])})`} tone="var(--plot-4)" />
            <Readout label={<TL>{'\\mathbf F'}</TL>} value={vec(Fp, Fq)} />
            <Readout label={<TL>{'|\\mathbf F|'}</TL>} value={fmt(Math.hypot(Fp, Fq))} />
            <Readout label={<TL>{'P_y'}</TL>} value={fmt(tz(Py(probe[0], probe[1])))} />
            <Readout label={<TL>{'Q_x'}</TL>} value={fmt(tz(Qx(probe[0], probe[1])))} />
          </Controls>
          {conservativeNote}
        </>
      )}

      {pathMode && (
        <>
          <Slider label="Parameter t (the dot is at r(t))" value={t} min={0} max={1} step={0.005} onChange={(x) => (setPlaying(false), setT(x))} />
          <Controls cols={3}>
            <Readout label={<TL>{mode === 'compare' ? '\\int_0^t\\mathbf F\\cdot d\\mathbf r\\ (C_1)' : '\\int_0^t\\mathbf F\\cdot d\\mathbf r'}</TL>} value={fmt(W1t, 4)} tone="var(--plot-4)" />
            <Readout label={<TL>{mode === 'compare' ? '\\int_{C_1}\\mathbf F\\cdot d\\mathbf r' : '\\int_C\\mathbf F\\cdot d\\mathbf r'}</TL>} value={fmt(W1, 4)} tone="var(--plot-4)" />
            {mode === 'compare' && <Readout label={<TL>{'\\int_0^t\\mathbf F\\cdot d\\mathbf r\\ (C_2)'}</TL>} value={fmt(W2t, 4)} tone="var(--plot-5)" />}
            {mode === 'compare' && <Readout label={<TL>{'\\int_{C_2}\\mathbf F\\cdot d\\mathbf r'}</TL>} value={fmt(W2, 4)} tone="var(--plot-5)" />}
            {mode === 'compare' && <Readout label="Difference" value={fmt(Math.abs(W2 - W1) < 1e-7 * Math.max(1, Math.abs(W1)) ? 0 : W2 - W1, 4)} />}
            {pot && <Readout label={<TL>{'f(B)-f(A)'}</TL>} value={fmt(pot(B[0], B[1]) - pot(A[0], A[1]), 4)} />}
            <Readout label="A → B" value={`(${fmt(A[0])}, ${fmt(A[1])}) → (${fmt(B[0])}, ${fmt(B[1])})`} />
          </Controls>
          <Note>Along the path, green arrows are the part of F pointing forward along the path (positive work) and red ones the part pointing backward.</Note>
          {mode === 'compare' && conservativeNote}
        </>
      )}

      {mode === 'probe' && (
        <>
          <Controls cols={3}>
            <Readout label="Probe" value={`(${fmt(probe[0])}, ${fmt(probe[1])})`} tone="var(--plot-4)" />
            <Readout label={<TL>{'\\mathbf F'}</TL>} value={vec(Fp, Fq)} />
            <Readout label={<TL>{'Q_x-P_y'}</TL>} value={fmt(tz(curl(probe[0], probe[1])))} />
            <Readout label="Spin rate (rad per unit time)" value={fmt(tz(curl(probe[0], probe[1])) / 2)} />
            <Readout label={<TL>{'P_x+Q_y=\\operatorname{div}\\mathbf F'}</TL>} value={fmt(tz(Px(probe[0], probe[1]) + Qy(probe[0], probe[1])))} />
          </Controls>
          <Note>
            The wheel turns anticlockwise when Q_x − P_y &gt; 0. Round the dashed circle, green arrows show F flowing out and red arrows F flowing in; more out than in means positive divergence. In space the curl is a vector, ⟨R_y − Q_z, P_z − R_x, Q_x − P_y⟩, and the number here is its z-component: the spin of a wheel whose axle points out of the screen.
          </Note>
        </>
      )}

      {mode === 'green' && (
        <>
          <Slider label={curveKind === 'circle' ? 'Radius' : 'Half the side'} value={r} min={0.2} max={span / 2} step={0.05} onChange={setR} />
          <Controls cols={3}>
            <Readout label={<TL>{'\\oint_C\\mathbf F\\cdot d\\mathbf r'}</TL>} value={fmt(circulation, 4)} tone="var(--plot-4)" />
            <Readout label={<TL>{'\\iint_D(Q_x-P_y)\\,dA'}</TL>} value={fmt(Math.abs(doubleInt) < zt * lp.area ? 0 : doubleInt, 4)} tone="var(--plot-3)" />
            <Readout label="Area of D" value={fmt(lp.area, 4)} />
          </Controls>
          {singInside.length ? (
            <Note tone="warn">{`F is undefined at (${fmt(singInside[0][0])}, ${fmt(singInside[0][1])}), inside the curve, so Green's theorem does not apply and the two numbers need not agree.`}</Note>
          ) : Math.abs(circulation - doubleInt) <= 1e-3 * Math.max(1, Math.abs(circulation)) ? (
            <Note tone="good">The circulation round C equals the double integral of Q_x − P_y over D, as Green's theorem says.</Note>
          ) : (
            <Note tone="warn">The two numbers differ by {fmt(circulation - doubleInt)}: check that F is defined and smooth inside the curve.</Note>
          )}
          <Note>Shading: green where Q_x − P_y &gt; 0 (anticlockwise spin), red where it is negative. The circulation adds up the tangential arrows round C; the double integral adds up the shading inside.</Note>
        </>
      )}
    </Frame>
  );
}
