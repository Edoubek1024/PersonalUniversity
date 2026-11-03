/**
 * phase-portrait: the phase plane of a planar system.
 *
 * Linear mode, x' = A x: entry sliders, direction arrows, trajectories (tap to add one; a
 * draggable probe shows the one through it), eigenvector lines when the eigenvalues are real,
 * the classification from the lesson's trace-determinant table, and a trace-determinant plane
 * whose point can be dragged: the diagonal entries move with the trace and one off-diagonal entry
 * with the determinant, so the matrix keeps its general shape.
 *
 * Non-linear mode, x' = f(x, y), y' = g(x, y): equilibria found by Newton's method from a grid of
 * seeds, each classified from its Jacobian (with a warning when linearisation cannot decide),
 * saddle separatrices traced from the eigenvector directions, and the Jacobians plotted in the
 * trace-determinant plane.
 *
 * Params:
 *   mode       "linear" | "nonlinear"                                         default "linear"
 *   A          [[a, b], [c, d]]   initial matrix (linear)                    default [[1, 1], [4, 1]]
 *   range      number   entry sliders run from -range to range              default 5
 *   f, g       string   right-hand sides in the variable and slider names (non-linear)
 *                       default "x*(3 - x - 2*y)", "y*(2 - x - y)"
 *   vars       [string, string]   axis / variable names     default ["x₁", "x₂"] (linear), ["x", "y"] (non-linear)
 *   sliders    {name: [initial, min, max, step?]}   parameters in f and g     default {}
 *   view       [xMin, xMax, yMin, yMax]   (equal scale)                      default [-4, 4, -4, 4]
 *   starts     [[x, y], ...]   initial trajectories   default a ring of 8 (linear), none (non-linear)
 *   probe      [x, y]   draggable probe point                                default [1, 0.5] scaled to the view
 *   eigen      boolean  eigenvector lines (linear) / separatrices (non-linear)  default true
 *   traceDet   boolean  trace-determinant panel                              default true
 *   title, caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { bool, matrix, num, numArray, oneOf, sliders as readSliders, str, strArray, view as readView } from '../kit/params';
import { Plot, Dot, Draggable, FnPath, Label, Line, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { classify2, eigen2, findEquilibria, jacobian, pathD, traceOrbit, type Classification, type Eigen2, type F2, type Mat2, type Orbit, type Pt } from '../kit/de-ode';

/** Readout labels are upper-cased by the kit; keep maths symbols as written. */
const nc = (s: string) => <span className="normal-case">{s}</span>;

const TONE: Record<Classification['tone'], string> = { stable: 'var(--plot-3)', unstable: 'var(--plot-2)', neutral: 'var(--plot-4)' };
const TD_VIEW: [number, number, number, number] = [-6, 6, -4, 10];

const tex = (x: number) => fmt(x).replace(/−/g, '-');

function eigText(e: Eigen2): string {
  if (e.kind === 'complex') return `${fmt(e.re)} ± ${fmt(e.im)}i`;
  if (e.kind === 'repeated') return `${fmt(e.l1)} (double)`;
  return `${fmt(e.l1)}, ${fmt(e.l2)}`;
}

/** Moves A to trace T and determinant D, changing the diagonal and one off-diagonal entry. */
function withTD([a, b, c, d]: Mat2, T: number, D: number): Mat2 {
  const p = (a - d) / 2;
  const q = D - (T * T) / 4; // determinant of the traceless part
  const need = -q - p * p; // required product of the off-diagonal entries
  let nb = b;
  let nc = c;
  if (Math.abs(b) >= Math.abs(c) && Math.abs(b) > 0.2) nc = need / b;
  else if (Math.abs(c) > 0.2) nb = need / c;
  else {
    nb = 1;
    nc = need;
  }
  return [T / 2 + p, nb, nc, T / 2 - p];
}

function VectorField({ fx, fy }: { fx: F2; fy: F2 }) {
  const { width, height, ix, iy, view } = usePlot();
  const [shafts, heads] = useMemo(() => {
    const gap = width < 420 ? 30 : 36;
    const nx = Math.max(6, Math.round(width / gap));
    const ny = Math.max(5, Math.round(height / gap));
    const kx = width / (view[1] - view[0]);
    const ky = height / (view[3] - view[2]);
    let s = '';
    let h = '';
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const px = ((i + 0.5) * width) / nx;
        const py = ((j + 0.5) * height) / ny;
        const x = ix(px);
        const y = iy(py);
        const u = fx(x, y) * kx;
        const v = -fy(x, y) * ky;
        const n = Math.hypot(u, v);
        if (!Number.isFinite(n) || n < 1e-12) continue;
        const ux = u / n;
        const uy = v / n;
        const L = 7;
        const x1 = px - ux * L;
        const y1 = py - uy * L;
        const x2 = px + ux * L;
        const y2 = py + uy * L;
        s += `M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`;
        const bx = x2 - ux * 5;
        const by = y2 - uy * 5;
        h += `M${x2.toFixed(1)},${y2.toFixed(1)}L${(bx - uy * 3).toFixed(1)},${(by + ux * 3).toFixed(1)}L${(bx + uy * 3).toFixed(1)},${(by - ux * 3).toFixed(1)}Z`;
      }
    }
    return [s, h];
  }, [fx, fy, width, height, ix, iy, view]);
  return (
    <g opacity={0.75}>
      <path d={shafts} stroke="var(--plot-axis)" strokeWidth={1.2} strokeLinecap="round" />
      <path d={heads} fill="var(--plot-axis)" />
    </g>
  );
}

function OrbitPath({ orbit, color, width = 2 }: { orbit: Orbit; color: string; width?: number }) {
  const { sx, sy } = usePlot();
  const [d, heads] = useMemo(() => {
    const d = pathD(orbit.pts, sx, sy);
    // Arrowheads every ~150 px of arc length, pointing forward in time.
    let h = '';
    let acc = 75;
    const pts = orbit.pts;
    for (let i = 1; i < pts.length; i++) {
      const ax = sx(pts[i - 1][0]);
      const ay = sy(pts[i - 1][1]);
      const bx = sx(pts[i][0]);
      const by = sy(pts[i][1]);
      const len = Math.hypot(bx - ax, by - ay);
      acc += len;
      if (acc >= 150 && len > 1e-6 && bx > -10 && by > -10 && bx < 1e4 && by < 1e4) {
        acc = 0;
        const ux = (bx - ax) / len;
        const uy = (by - ay) / len;
        const baseX = bx - ux * 8;
        const baseY = by - uy * 8;
        h += `M${bx.toFixed(1)},${by.toFixed(1)}L${(baseX - uy * 4).toFixed(1)},${(baseY + ux * 4).toFixed(1)}L${(baseX + uy * 4).toFixed(1)},${(baseY - ux * 4).toFixed(1)}Z`;
      }
    }
    return [d, h];
  }, [orbit, sx, sy]);
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" />
      <path d={heads} fill={color} />
    </g>
  );
}

interface EqInfo {
  p: Pt;
  J: Mat2;
  e: Eigen2;
  cls: Classification;
  hyperbolic: boolean;
}

function Portrait({ fx, fy, seeds, probe, setProbe, eig, eqs, separatrices, names }: { fx: F2; fy: F2; seeds: Pt[]; probe: Pt; setProbe: (p: Pt) => void; eig: Eigen2 | null; eqs: EqInfo[]; separatrices: boolean; names: [string, string] }) {
  const { view, width, height } = usePlot();
  const box = useMemo(() => ({ view, kx: width / (view[1] - view[0]), ky: height / (view[3] - view[2]) }), [view, width, height]);
  const hMax = 0.05;
  const orbits = useMemo(() => seeds.map((s) => traceOrbit(fx, fy, s[0], s[1], box, { hMax })), [seeds, fx, fy, box]);
  const live = useMemo(() => traceOrbit(fx, fy, probe[0], probe[1], box, { hMax }), [probe, fx, fy, box]);
  const seps = useMemo(() => {
    if (!separatrices) return [];
    const out: { orbit: Orbit; stable: boolean }[] = [];
    const eps = 1e-3 * Math.max(view[1] - view[0], view[3] - view[2]);
    for (const q of eqs) {
      if (q.cls.name !== 'Saddle' || !q.e.v1 || !q.e.v2) continue;
      for (const [v, stable] of [
        [q.e.v1, true],
        [q.e.v2, false],
      ] as const) {
        for (const s of [1, -1]) out.push({ orbit: traceOrbit(fx, fy, q.p[0] + s * eps * v[0], q.p[1] + s * eps * v[1], box, { hMax, maxSteps: 5000 }), stable });
      }
    }
    return out;
  }, [separatrices, eqs, fx, fy, box, view]);
  return (
    <>
      <VectorField fx={fx} fy={fy} />
      {eig && eig.v1 && eig.kind !== 'complex' && (
        <>
          <Line x={0} y={0} slope={eig.v1[0] === 0 ? Infinity : eig.v1[1] / eig.v1[0]} color={eig.l1 < 0 ? 'var(--plot-3)' : eig.l1 > 0 ? 'var(--plot-2)' : 'var(--plot-4)'} width={2} dash="7 5" />
          {eig.kind === 'real' && eig.v2 && <Line x={0} y={0} slope={eig.v2[0] === 0 ? Infinity : eig.v2[1] / eig.v2[0]} color={eig.l2 < 0 ? 'var(--plot-3)' : eig.l2 > 0 ? 'var(--plot-2)' : 'var(--plot-4)'} width={2} dash="7 5" />}
          <EigLabel v={eig.v1} text={`λ = ${fmt(eig.l1)}`} />
          {eig.kind === 'real' && eig.v2 && <EigLabel v={eig.v2} text={`λ = ${fmt(eig.l2)}`} />}
        </>
      )}
      {seps.map((s, i) => (
        <OrbitPath key={`s${i}`} orbit={s.orbit} color="var(--plot-6)" width={2.25} />
      ))}
      {orbits.map((o, i) => (
        <OrbitPath key={i} orbit={o} color="var(--plot-1)" />
      ))}
      <OrbitPath orbit={live} color="var(--plot-2)" width={2.5} />
      {eqs.map((q, i) => (
        <g key={i}>
          <Dot x={q.p[0]} y={q.p[1]} r={5.5} color={TONE[q.cls.tone]} hollow={q.cls.tone !== 'stable'} />
          {eqs.length <= 6 && (
            <Label x={q.p[0]} y={q.p[1]} dx={8} dy={-8} size={11}>
              {`${i + 1}`}
            </Label>
          )}
        </g>
      ))}
      <Draggable x={probe[0]} y={probe[1]} onChange={(x, y) => setProbe([clamp(x, view[0], view[1]), clamp(y, view[2], view[3])])} color="var(--plot-2)" label={`Probe point (${names[0]}, ${names[1]})`} />
    </>
  );
}

function EigLabel({ v, text }: { v: Pt; text: string }) {
  const { view } = usePlot();
  // Put the label where the line meets the edge of the view (in the direction of v or -v, whichever is upper).
  const dir: Pt = v[1] < 0 || (v[1] === 0 && v[0] < 0) ? [-v[0], -v[1]] : v;
  const tx = dir[0] === 0 ? Infinity : (dir[0] > 0 ? view[1] : view[0]) / dir[0];
  const ty = dir[1] === 0 ? Infinity : view[3] / dir[1];
  const s = Math.min(Math.abs(tx), Math.abs(ty)) * 0.88;
  return (
    <Label x={dir[0] * s} y={dir[1] * s} dx={dir[0] > 0 ? -6 : 6} dy={4} anchor={dir[0] > 0 ? 'end' : 'start'} size={11}>
      {text}
    </Label>
  );
}

function TDPlane({ T, D, onDrag, points }: { T?: number; D?: number; onDrag?: (T: number, D: number) => void; points?: { T: number; D: number; label: string; tone: string }[] }) {
  const v = TD_VIEW;
  const lab = (x: number, y: number, s: string) => (
    <Label x={x} y={y} anchor="middle" dx={0} dy={4} size={10.5} color="var(--color-ink-3)">
      {s}
    </Label>
  );
  return (
    <Plot view={v} aspect={0.85} minHeight={220} maxHeight={320} xLabel="T" yLabel="D" label="Trace-determinant plane">
      <FnPath f={(t) => (t * t) / 4} color="var(--plot-6)" width={1.75} dash="6 4" />
      <Segment x1={0} x2={0} y1={0} y2={v[3]} color="var(--plot-4)" width={2} />
      {lab(0, -2.4, 'saddle')}
      {lab(-2.9, 8.2, 'stable spiral')}
      {lab(2.9, 8.2, 'unstable spiral')}
      {lab(-4.1, 1.6, 'stable node')}
      {lab(4.1, 1.6, 'unstable node')}
      <Label x={0} y={v[3] * 0.82} anchor="start" dx={5} dy={0} size={10.5} color="var(--plot-4)">
        center
      </Label>
      <Label x={5.2} y={6.76} anchor="end" dx={-4} dy={-2} size={10.5} color="var(--plot-6)">
        D = T²/4
      </Label>
      {points?.map((q, i) => (
        <g key={i}>
          <Dot x={clamp(q.T, v[0], v[1])} y={clamp(q.D, v[2], v[3])} r={5} color={q.tone} />
          <Label x={clamp(q.T, v[0], v[1])} y={clamp(q.D, v[2], v[3])} dx={7} dy={-6} size={11}>
            {q.label}
          </Label>
        </g>
      ))}
      {onDrag && T !== undefined && D !== undefined && (
        <Draggable x={clamp(T, v[0], v[1])} y={clamp(D, v[2], v[3])} step={0.1} onChange={(t, d) => onDrag(clamp(t, v[0], v[1]), clamp(d, v[2], v[3]))} color="var(--plot-1)" label="Point (T, D)" />
      )}
    </Plot>
  );
}

export default function PhasePortrait({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['linear', 'nonlinear'] as const, 'linear');
  return mode === 'linear' ? <LinearPortrait params={params} /> : <NonlinearPortrait params={params} />;
}

function useCommon(params: Record<string, unknown>, linear: boolean) {
  const v = readView(params, 'view', [-4, 4, -4, 4]);
  const vars = strArray(params, 'vars', linear ? ['x₁', 'x₂'] : ['x', 'y']);
  if (vars.length !== 2) throw new Error('parameter "vars" should name two variables');
  const r = 0.62 * Math.min(v[1] - v[0], v[3] - v[2]) / 2;
  const cx = (v[0] + v[1]) / 2;
  const cy = (v[2] + v[3]) / 2;
  const ring = Array.from({ length: 8 }, (_, i) => [cx + r * Math.cos(((i + 0.5) * Math.PI) / 4), cy + r * Math.sin(((i + 0.5) * Math.PI) / 4)]);
  const startsDef = params.starts === undefined ? (linear ? ring : []) : matrix(params, 'starts', [[0, 0]]);
  if (startsDef.length && startsDef[0].length !== 2) throw new Error('parameter "starts" should be a list of [x, y] points');
  const probeDef = numArray(params, 'probe', [cx + 0.3 * (v[1] - v[0]) * 0.5, cy + 0.15 * (v[3] - v[2]) * 0.5]);
  if (probeDef.length !== 2) throw new Error('parameter "probe" should be [x, y]');
  const [seeds, setSeeds] = useState<Pt[]>(() => startsDef.map((s) => [s[0], s[1]] as Pt));
  const [probe, setProbe] = useState<Pt>([probeDef[0], probeDef[1]]);
  return { v, names: [vars[0], vars[1]] as [string, string], seeds, setSeeds, probe, setProbe, startsDef };
}

function Header({ setSeeds, probe, startsDef, seeds }: { setSeeds: (f: (s: Pt[]) => Pt[]) => void; probe: Pt; startsDef: number[][]; seeds: Pt[] }) {
  return (
    <>
      <Button onClick={() => setSeeds((s) => [...s.slice(-15), probe])} title="Keep the trajectory through the probe point">
        Keep
      </Button>
      <Button onClick={() => setSeeds(() => startsDef.map((s) => [s[0], s[1]] as Pt))}>Reset</Button>
      <Button onClick={() => setSeeds(() => [])} disabled={!seeds.length}>
        Clear
      </Button>
    </>
  );
}

function LinearPortrait({ params }: { params: WidgetProps['params'] }) {
  const A0 = matrix(params, 'A', [
    [1, 1],
    [4, 1],
  ]);
  if (A0.length !== 2 || A0[0].length !== 2) throw new Error('parameter "A" should be a 2×2 matrix [[a, b], [c, d]]');
  const range = num(params, 'range', 5);
  const showEig = bool(params, 'eigen', true);
  const showTD = bool(params, 'traceDet', true);
  const { v, names, seeds, setSeeds, probe, setProbe, startsDef } = useCommon(params, true);
  const [A, setA] = useState<Mat2>([A0[0][0], A0[0][1], A0[1][0], A0[1][1]]);
  const [a, b, c, d] = A;
  const fx = useMemo<F2>(() => (x, y) => a * x + b * y, [a, b]);
  const fy = useMemo<F2>(() => (x, y) => c * x + d * y, [c, d]);
  const e = eigen2(A);
  const cls = classify2(e);
  const setEntry = (i: number) => (x: number) => setA((m) => m.map((q, j) => (j === i ? x : q)) as Mat2);
  const rot = e.kind === 'complex' ? (c > 0 ? 'Counterclockwise' : 'Clockwise') : '—';
  const [n1, n2] = names;

  const plane = (
    <Plot view={v} equal aspect={0.85} minHeight={260} maxHeight={480} xLabel={n1} yLabel={n2} label={`Phase portrait of x' = Ax`} onPointerDown={(x, y) => setSeeds((s) => [...s.slice(-15), [x, y]])}>
      <Portrait fx={fx} fy={fy} seeds={seeds} probe={probe} setProbe={setProbe} eig={showEig ? e : null} eqs={[]} separatrices={false} names={names} />
      <Dot x={0} y={0} r={4.5} color={TONE[cls.tone]} />
    </Plot>
  );

  return (
    <Frame title={str(params, 'title', 'Phase portrait')} caption={typeof params.caption === 'string' ? params.caption : undefined} actions={<Header setSeeds={setSeeds} probe={probe} startsDef={startsDef} seeds={seeds} />}>
      <div className="overflow-x-auto text-sm">
        <Tex>{`x' = \\begin{pmatrix} ${tex(a)} & ${tex(b)} \\\\ ${tex(c)} & ${tex(d)} \\end{pmatrix} x`}</Tex>
      </div>
      {showTD ? (
        <div className="grid gap-3 md:grid-cols-[3fr_2fr]">
          <div className="min-w-0">{plane}</div>
          <div className="min-w-0">
            <TDPlane T={e.T} D={e.D} onDrag={(T, D) => setA((m) => withTD(m, T, D))} />
          </div>
        </div>
      ) : (
        plane
      )}
      <Controls cols={2}>
        <Slider label="a (row 1, column 1)" value={a} min={-range} max={range} step={0.05} onChange={setEntry(0)} />
        <Slider label="b (row 1, column 2)" value={b} min={-range} max={range} step={0.05} onChange={setEntry(1)} />
        <Slider label="c (row 2, column 1)" value={c} min={-range} max={range} step={0.05} onChange={setEntry(2)} />
        <Slider label="d (row 2, column 2)" value={d} min={-range} max={range} step={0.05} onChange={setEntry(3)} />
      </Controls>
      <Controls cols={3}>
        <Readout label={nc("Trace T")} value={fmt(e.T)} />
        <Readout label={nc("Determinant D")} value={fmt(e.D)} />
        <Readout label={nc("T² − 4D")} value={fmt(e.T * e.T - 4 * e.D)} />
        <Readout label={nc("Eigenvalues")} value={eigText(e)} />
        <Readout label={nc("Type")} value={cls.name} tone={TONE[cls.tone]} />
        <Readout label={nc(e.kind === 'complex' ? 'Stability · rotation' : 'Stability')} value={e.kind === 'complex' ? `${cls.stability} · ${rot.toLowerCase()}` : cls.stability} />
      </Controls>
      <p className="text-xs text-ink-3">
        Tap the plane to add a trajectory; drag the red probe (or use its arrow keys) and press Keep. Dashed lines are eigenvector directions (green: decaying, red: growing). Drag the point in the trace-determinant plane to move between types.
      </p>
    </Frame>
  );
}

function NonlinearPortrait({ params }: { params: WidgetProps['params'] }) {
  const fSrc = str(params, 'f', 'x*(3 - x - 2*y)');
  const gSrc = str(params, 'g', 'y*(2 - x - y)');
  const defs = readSliders(params, 'sliders');
  const showSep = bool(params, 'eigen', true);
  const showTD = bool(params, 'traceDet', true);
  const { v, names, seeds, setSeeds, probe, setProbe, startsDef } = useCommon(params, false);
  const vars = useMemo(() => [names[0], names[1], ...defs.map((q) => q.name)], [names[0], names[1], defs.map((q) => q.name).join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const cf = useMemo(() => tryCompile(fSrc, vars), [fSrc, vars]);
  const cg = useMemo(() => tryCompile(gSrc, vars), [gSrc, vars]);
  if (cf.error) throw new Error(cf.error);
  if (cg.error) throw new Error(cg.error);
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(defs.map((q) => [q.name, q.value])));
  const argKey = defs.map((q) => values[q.name]).join(',');
  const [fx, fy] = useMemo<[F2, F2]>(() => {
    const a = argKey ? argKey.split(',').map(Number) : [];
    const F = cf.fn!;
    const G = cg.fn!;
    return a.length ? [(x, y) => F(x, y, ...a), (x, y) => G(x, y, ...a)] : [(x, y) => F(x, y), (x, y) => G(x, y)];
  }, [cf, cg, argKey]);

  const eqs = useMemo<EqInfo[]>(
    () =>
      findEquilibria(fx, fy, v).map((p) => {
        const J = jacobian(fx, fy, p[0], p[1]);
        const e = eigen2(J, 1e-7);
        const cls = classify2(e, 1e-7);
        const tol = 1e-5 * (1 + Math.abs(e.T) + Math.sqrt(Math.abs(e.D)));
        const hyperbolic = e.kind === 'complex' ? Math.abs(e.re) > tol : Math.min(Math.abs(e.l1), Math.abs(e.l2)) > tol;
        return { p, J, e, cls, hyperbolic };
      }),
    [fx, fy, v[0], v[1], v[2], v[3]], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const [n1, n2] = names;

  const plane = (
    <Plot view={v} equal aspect={0.85} minHeight={260} maxHeight={480} xLabel={n1} yLabel={n2} label="Phase portrait" onPointerDown={(x, y) => setSeeds((s) => [...s.slice(-15), [x, y]])}>
      <Portrait fx={fx} fy={fy} seeds={seeds} probe={probe} setProbe={setProbe} eig={null} eqs={eqs} separatrices={showSep} names={names} />
    </Plot>
  );
  const pt = (p: Pt) => `(${fmt(p[0])}, ${fmt(p[1])})`;

  return (
    <Frame title={str(params, 'title', 'Non-linear phase portrait')} caption={typeof params.caption === 'string' ? params.caption : undefined} actions={<Header setSeeds={setSeeds} probe={probe} startsDef={startsDef} seeds={seeds} />}>
      <div className="overflow-x-auto font-mono text-[13px] text-ink-2">
        {n1}′ = {fSrc}, &nbsp;{n2}′ = {gSrc}
      </div>
      {showTD ? (
        <div className="grid gap-3 md:grid-cols-[3fr_2fr]">
          <div className="min-w-0">{plane}</div>
          <div className="min-w-0">
            <div className="mb-1 text-[13px] text-ink-2">Jacobians in the trace-determinant plane</div>
            <TDPlane points={eqs.map((q, i) => ({ T: q.e.T, D: q.e.D, label: String(i + 1), tone: TONE[q.cls.tone] }))} />
          </div>
        </div>
      ) : (
        plane
      )}
      {defs.length > 0 && (
        <Controls>
          {defs.map((q) => (
            <Slider key={q.name} label={q.name} value={values[q.name]} min={q.min} max={q.max} step={q.step} onChange={(x) => setValues((s) => ({ ...s, [q.name]: x }))} />
          ))}
        </Controls>
      )}
      {eqs.length ? (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-surface-2 text-[11px] uppercase tracking-wide text-ink-3">
              <tr>
                <th className="px-3 py-1.5">#</th>
                <th className="px-3 py-1.5">Equilibrium</th>
                <th className="px-3 py-1.5">Jacobian</th>
                <th className="px-3 py-1.5">Eigenvalues</th>
                <th className="px-3 py-1.5">Type</th>
              </tr>
            </thead>
            <tbody className="font-mono tabular-nums">
              {eqs.map((q, i) => (
                <tr key={i} className="border-t border-line">
                  <td className="px-3 py-1.5">{i + 1}</td>
                  <td className="whitespace-nowrap px-3 py-1.5">{pt(q.p)}</td>
                  <td className="whitespace-nowrap px-3 py-1.5">
                    ({fmt(q.J[0])}, {fmt(q.J[1])}; {fmt(q.J[2])}, {fmt(q.J[3])})
                  </td>
                  <td className="whitespace-nowrap px-3 py-1.5">{eigText(q.e)}</td>
                  <td className="whitespace-nowrap px-3 py-1.5 font-sans" style={{ color: TONE[q.cls.tone] }}>
                    {q.hyperbolic ? q.cls.name : `${q.cls.name} for the linearisation: not decided`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Note tone="warn">No equilibria found in this view.</Note>
      )}
      <Controls cols={2}>
        <Readout label={nc(`Probe (${n1}, ${n2})`)} value={pt(probe)} tone="var(--plot-2)" />
        <Readout label={nc("Velocity there")} value={pt([fx(probe[0], probe[1]), fy(probe[0], probe[1])])} />
      </Controls>
      <p className="text-xs text-ink-3">
        Tap the plane to add a trajectory; drag the red probe (or use its arrow keys) and press Keep. Filled dots are stable equilibria, hollow ones are not{showSep ? '; purple curves are the separatrices of saddles' : ''}.
      </p>
    </Frame>
  );
}
