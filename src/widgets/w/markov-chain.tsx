/**
 * markov-chain: a 2- or 3-state Markov chain stepping towards its steady state, or the power
 * method on a general 2x2 / 3x3 matrix.
 *
 * markov mode: an editable transition matrix (the last entry of each column, or row, is filled
 * in so the probabilities sum to 1), bars for the distribution x_k with the steady state marked,
 * the path of x_k in the probability simplex (a triangle for 3 states, a segment for 2; drag the
 * start), the distance to the steady state on a log scale against the prediction |lambda_2|^k,
 * and the eigenvalues.
 *
 * power mode: x_{k+1} = A x_k / (scale), with the scale factors and Rayleigh quotients, the
 * angle error on a log scale against |lambda_2 / lambda_1|^k, and for 2x2 the iterates in the
 * plane with the eigenvector lines. A slider sets lambda_2 while keeping lambda_1 and the
 * eigenvectors, so you can see the ratio control the speed.
 *
 * Params:
 *   mode        "markov" | "power"                                   default "markov"
 *   P           transition matrix as written in the lesson            default [[0.9, 0.5], [0.1, 0.5]]
 *   convention  "column" (x_{k+1} = P x_k) | "row" (x_{k+1} = x_k P)  default "column"
 *   states      state names                                           default ["1", "2", ...]
 *   A           matrix for power mode (2x2 or 3x3)                    default [[4, 1], [2, 3]]
 *   x0          starting vector                                       default first state / [1, 0]
 *   scaling     "max" (divide by the entry of largest size) | "norm" (2-norm), power mode default "max"
 *   name        matrix letter                                         default "P" / "A"
 *   vec         vector letter                                         default "x"
 *   kMax        number of steps available                             default 30
 *   title, caption
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { matrix as readMatrix, num as readNum, numArray, oneOf, str, strArray } from '../kit/params';
import { Arrow, Dot, Draggable, FnPath, Label, Line, Plot, Poly, Rect, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider, Tex } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';
import { cabs, eig2, eigenvalues, inv2, matVec, nullVector, transpose, type CNum, type M2 } from '../kit/la-core';
import { MatrixEditor, NumberField, texComplex } from '../kit/la-ui';

function MR({ label, value, tone }: { label: ReactNode; value: ReactNode; tone?: string }) {
  return <Readout label={<span className="normal-case tracking-normal">{label}</span>} value={value} tone={tone} />;
}

const STATE_COLORS = ['var(--plot-1)', 'var(--plot-3)', 'var(--plot-4)'];
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const subN = (n: number) => String(n).replace(/\d/g, (d) => SUB[Number(d)]);

export default function MarkovChain({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['markov', 'power'] as const, 'markov');
  return mode === 'markov' ? <MarkovView params={params} /> : <PowerView params={params} />;
}

/** Steps x_0 .. x_kMax with Play / Pause / Step / Back / Reset. */
function useStepper(kMax: number) {
  const [k, setK] = useState(0);
  const [running, setRunning] = useState(false);
  const [acc, setAcc] = useState(0);
  useAnimation(running, (dt) => {
    const t = acc + dt;
    if (t >= 0.45) {
      setAcc(0);
      setK((kk) => {
        if (kk + 1 >= kMax) setRunning(false);
        return Math.min(kMax, kk + 1);
      });
    } else setAcc(t);
  });
  const controls = (
    <div className="flex flex-wrap items-center gap-1.5">
      <Button primary onClick={() => (k >= kMax ? (setK(0), setRunning(true)) : setRunning((r) => !r))}>
        {running ? 'Pause' : 'Play'}
      </Button>
      <Button onClick={() => (setRunning(false), setK((kk) => Math.min(kMax, kk + 1)))} disabled={k >= kMax}>
        Step
      </Button>
      <Button onClick={() => (setRunning(false), setK((kk) => Math.max(0, kk - 1)))} disabled={k === 0}>
        Back
      </Button>
      <Button onClick={() => (setRunning(false), setK(0))} disabled={k === 0}>
        Reset
      </Button>
      <span className="font-mono text-xs text-ink-2">k = {k}</span>
    </div>
  );
  return { k, setK: (v: number) => (setRunning(false), setK(v)), controls };
}

/* ------------------------------------------------------------------ Markov ------------------------------------------------------------------ */

function MarkovView({ params }: { params: Record<string, unknown> }) {
  const P0 = readMatrix(params, 'P', [
    [0.9, 0.5],
    [0.1, 0.5],
  ]);
  const n = P0.length;
  if ((n !== 2 && n !== 3) || P0[0].length !== n) throw new Error('parameter "P" should be a 2x2 or 3x3 matrix');
  const conv = oneOf(params, 'convention', ['column', 'row'] as const, 'column');
  const states = strArray(params, 'states', Array.from({ length: n }, (_, i) => String(i + 1)));
  if (states.length !== n) throw new Error('parameter "states" needs one name per state');
  const x00 = numArray(params, 'x0', Array.from({ length: n }, (_, i) => (i === 0 ? 1 : 0)));
  if (x00.length !== n) throw new Error('parameter "x0" needs one entry per state');
  const name = str(params, 'name', 'P');
  const vec = str(params, 'vec', 'x');
  const kMax = Math.round(readNum(params, 'kMax', 30));
  const sums = conv === 'column' ? P0[0].map((_, j) => P0.reduce((s, r) => s + r[j], 0)) : P0.map((r) => r.reduce((s, a) => s + a, 0));
  if (sums.some((s) => Math.abs(s - 1) > 1e-9) || P0.flat().some((a) => a < 0)) throw new Error(`each ${conv} of "P" must be non-negative and sum to 1 (convention "${conv}")`);

  const [P, setP] = useState(P0.map((r) => [...r]));
  const [x0, setX0] = useState(x00);
  const st = useStepper(kMax);
  const k = st.k;
  // Column-stochastic form C with x_{k+1} = C x_k.
  const C = conv === 'column' ? P : transpose(P);
  const bad = P.flat().some((a) => a < -1e-12);
  const traj = useMemo(() => {
    const out = [x0];
    for (let i = 0; i < kMax; i++) out.push(matVec(C, out[out.length - 1]));
    return out;
  }, [JSON.stringify(C), JSON.stringify(x0), kMax]); // eslint-disable-line react-hooks/exhaustive-deps
  const ev = eigenvalues(C);
  const piRaw = nullVector(C, 1);
  const piS = piRaw ? piRaw.reduce((s, a) => s + a, 0) : 0;
  const pi = piRaw && Math.abs(piS) > 1e-12 ? piRaw.map((a) => a / piS) : null;
  const lam2 = ev.slice(1).reduce((m, z) => Math.max(m, cabs(z)), 0);
  const ones = ev.filter((z) => cabs({ re: z.re - 1, im: z.im }) < 1e-7).length;
  const dist = (v: number[]) => (pi ? v.reduce((s, a, i) => s + Math.abs(a - pi[i]), 0) : NaN);
  const xk = traj[k];

  // Entry editing: the last entry of each column (row) is computed.
  const computed = (i: number, j: number) => (conv === 'column' ? i === n - 1 : j === n - 1);
  const setEntry = (i: number, j: number, v: number) =>
    setP((M) => {
      const N = M.map((r) => [...r]);
      N[i][j] = clamp(v, 0, 1);
      if (conv === 'column') N[n - 1][j] = 1 - N.slice(0, n - 1).reduce((s, r) => s + r[j], 0);
      else N[i][n - 1] = 1 - N[i].slice(0, n - 1).reduce((s, a) => s + a, 0);
      return N.map((r) => r.map((a) => Math.round(a * 1e10) / 1e10));
    });
  const readOnly = P.map((r, i) => r.map((_, j) => computed(i, j)));

  const evTex = ev.map((z) => texComplex(z.re, z.im)).join(',\\ ');
  const ratio = k >= 1 && pi ? dist(traj[k]) / dist(traj[k - 1]) : NaN;
  const stepTex = conv === 'column' ? `${vec}_{k+1} = ${name}${vec}_k` : `${vec}_{k+1} = ${vec}_k${name}`;

  return (
    <Frame title={str(params, 'title', 'A Markov chain settling down')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Bars xk={xk} pi={pi} states={states} k={k} vec={vec} />
        {n === 3 ? <Simplex traj={traj} k={k} pi={pi} states={states} onStart={(v) => (setX0(v), st.setK(0))} /> : <Segment1D traj={traj} k={k} pi={pi} states={states} onStart={(v) => (setX0(v), st.setK(0))} />}
      </div>
      {st.controls}
      <ErrorPlot errs={traj.map(dist)} k={k} rate={lam2} kMax={kMax} label={`‖${vec}ₖ − π‖₁`} />
      <div className="flex flex-wrap items-center gap-3">
        <MatrixEditor A={P} name={name} onChange={setEntry} readOnly={readOnly} />
        <div className="text-xs text-ink-3">
          <Tex>{stepTex}</Tex>. Each {conv} sums to 1; its last entry is filled in for you.
        </div>
      </div>
      {bad && <Note tone="warn">A computed entry went negative, so this is not a stochastic matrix. Lower one of the other entries in that {conv}.</Note>}
      <Controls cols={3}>
        <MR label={`${vec}${subN(k)} (step ${k})`} value={`(${xk.map((a) => fmt(a, 3)).join(', ')})`} />
        <MR label="Steady state π" value={pi ? `(${pi.map((a) => fmt(a, 4)).join(', ')})` : '—'} tone="var(--plot-2)" />
        <MR label="Eigenvalues" value={<Tex>{evTex}</Tex>} />
        <MR label="|λ₂|: predicted shrink per step" value={fmt(lam2, 4)} />
        <MR label="Measured ‖xₖ − π‖ / ‖xₖ₋₁ − π‖" value={Number.isFinite(ratio) && dist(traj[k - 1]) > 1e-13 ? fmt(ratio, 4) : '—'} />
        <MR label="Distance ‖xₖ − π‖₁" value={pi ? fmt(dist(xk), 3) : '—'} />
      </Controls>
      {ones > 1 ? (
        <Note tone="warn">Eigenvalue 1 is repeated: the steady state is not unique, and the limit depends on where the chain starts.</Note>
      ) : lam2 > 1 - 1e-9 ? (
        <Note tone="warn">Another eigenvalue has |λ| = 1, so the distribution never settles from most starts: the chain is not regular.</Note>
      ) : null}
    </Frame>
  );
}

function Bars({ xk, pi, states, k, vec }: { xk: number[]; pi: number[] | null; states: string[]; k: number; vec: string }) {
  const n = xk.length;
  return (
    <Plot view={[0, n, -0.13, 1.08]} aspect={0.75} minHeight={200} maxHeight={260} xStep={1} yStep={0.25} xTickFormat={() => ''} label={`Probabilities of each state at step ${k}`}>
      {xk.map((p, i) => (
        <g key={i}>
          <Rect x={i + 0.18} y={0} w={0.64} h={p} fill={STATE_COLORS[i]} opacity={0.7} color={STATE_COLORS[i]} />
          {pi && <Segment x1={i + 0.08} y1={pi[i]} x2={i + 0.92} y2={pi[i]} color="var(--plot-2)" width={2.5} dash="6 3" />}
          <Label x={i + 0.5} y={-0.065} dy={4} anchor="middle" size={12} weight={600}>
            {states[i]}
          </Label>
          <Label x={i + 0.5} y={p} dy={p > 0.15 ? 16 : -6} anchor="middle" size={11} weight={600}>
            {fmt(p, 3)}
          </Label>
        </g>
      ))}
      <Label x={n} y={1.08} dx={-4} dy={14} anchor="end" size={11} color="var(--plot-2)">
        {`dashed: π · bars: ${vec}${subN(k)}`}
      </Label>
    </Plot>
  );
}

const TRI: [number, number][] = [
  [0, 0],
  [1, 0],
  [0.5, Math.sqrt(3) / 2],
];
const toTri = (v: number[]): [number, number] => [v[0] * TRI[0][0] + v[1] * TRI[1][0] + v[2] * TRI[2][0], v[0] * TRI[0][1] + v[1] * TRI[1][1] + v[2] * TRI[2][1]];
function fromTri(x: number, y: number): number[] {
  // barycentric coordinates, clamped into the triangle
  const c = y / TRI[2][1];
  const b = x - 0.5 * c;
  const a = 1 - b - c;
  const v = [a, b, c].map((t) => Math.max(0, t));
  const s = v[0] + v[1] + v[2];
  return v.map((t) => Math.round((t / s) * 100) / 100);
}

function Simplex({ traj, k, pi, states, onStart }: { traj: number[][]; k: number; pi: number[] | null; states: string[]; onStart: (v: number[]) => void }) {
  const pts = traj.slice(0, k + 1).map(toTri);
  const s0 = toTri(traj[0]);
  return (
    <Plot view={[-0.12, 1.12, -0.12, 0.98]} equal grid={false} axes={false} aspect={0.75} minHeight={200} maxHeight={260} label="The distribution moving inside the triangle of probability vectors">
      <Poly points={TRI} closed fill="var(--plot-grid)" fillOpacity={0.5} color="var(--plot-axis)" width={1.5} />
      {TRI.map((p, i) => (
        <Label key={i} x={p[0]} y={p[1]} dx={i === 0 ? -4 : i === 1 ? 4 : 0} dy={i === 2 ? -6 : 14} anchor={i === 0 ? 'end' : i === 1 ? 'start' : 'middle'} size={12} weight={600} color={STATE_COLORS[i]}>
          {states[i]}
        </Label>
      ))}
      {pi && (
        <>
          <Label x={toTri(pi)[0]} y={toTri(pi)[1]} dx={8} dy={4} size={11} color="var(--plot-2)">
            π
          </Label>
        </>
      )}
      <Poly points={pts} color="var(--plot-6)" width={1.5} />
      {pi && <PiMark at={toTri(pi)} />}
      {pts.map(([x, y], i) => (
        <Dot key={i} x={x} y={y} r={i === pts.length - 1 ? 5.5 : 2.5} color="var(--plot-6)" />
      ))}
      <Draggable x={s0[0]} y={s0[1]} r={6} color="var(--color-ink)" step={0.02} label="Starting distribution" onChange={(x, y) => onStart(fromTri(x, y))} />
    </Plot>
  );
}

function PiMark({ at }: { at: [number, number] }) {
  return <Poly points={[[at[0] - 0.03, at[1]], [at[0], at[1] + 0.03], [at[0] + 0.03, at[1]], [at[0], at[1] - 0.03]]} closed fill="var(--plot-2)" fillOpacity={0.9} color="var(--plot-2)" width={1} />;
}

function Segment1D({ traj, k, pi, states, onStart }: { traj: number[][]; k: number; pi: number[] | null; states: string[]; onStart: (v: number[]) => void }) {
  const xs = traj.slice(0, k + 1).map((v) => v[0]);
  return (
    <Plot view={[-0.08, 1.08, -0.5, 0.55]} grid={false} axes={false} aspect={0.75} minHeight={200} maxHeight={260} label={`Probability of ${states[0]} over the steps`}>
      <Segment x1={0} y1={0} x2={1} y2={0} color="var(--plot-axis)" width={2} />
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <Segment x1={t} y1={-0.03} x2={t} y2={0.03} color="var(--plot-axis)" width={1.5} />
          <Label x={t} y={0} dy={18} anchor="middle" size={11}>
            {fmt(t)}
          </Label>
        </g>
      ))}
      <Label x={-0.06} y={0.55} dx={0} dy={14} size={12} weight={600}>
        {`probability of ${states[0]}`}
      </Label>
      {pi && <Line x={pi[0]} y={0} slope={Infinity} color="var(--plot-2)" width={2} dash="6 3" />}
      {pi && (
        <Label x={pi[0]} y={0.3} dx={5} size={12} weight={600} color="var(--plot-2)">
          π
        </Label>
      )}
      {xs.map((x, i) => (
        <Dot key={i} x={x} y={0.06 + 0.012 * i} r={i === xs.length - 1 ? 5.5 : 2.5} color="var(--plot-6)" />
      ))}
      <Draggable x={traj[0][0]} y={-0.3} r={6} color="var(--color-ink)" step={0.01} label="Starting probability of the first state" onChange={(x) => onStart([Math.round(clamp(x, 0, 1) * 100) / 100, Math.round((1 - clamp(x, 0, 1)) * 100) / 100])} constrain={(x) => [clamp(x, 0, 1), -0.3]} />
      <Label x={traj[0][0]} y={-0.3} dx={10} dy={4} size={11}>
        start
      </Label>
    </Plot>
  );
}

/** log10 of an error sequence against k, with the reference slope `rate`. */
function ErrorPlot({ errs, k, rate, kMax, label }: { errs: number[]; k: number; rate: number; kMax: number; label: string }) {
  const e0 = errs.find((e) => e > 1e-14) ?? 1;
  // Below about 1e-14 the error is rounding noise, so those points are not drawn.
  const logs = errs.map((e) => (e > 1e-14 ? Math.log10(e) : NaN));
  const shown = logs.filter((y) => Number.isFinite(y));
  const lo = Math.max(-15, (shown.length ? Math.min(...shown) : -1) - 0.5);
  const hi = Math.max(0.5, Math.log10(e0) + 0.5);
  const ref = rate > 0 ? (x: number) => Math.log10(e0) + x * Math.log10(rate) : null;
  return (
    <div>
      <div className="mb-1 text-[13px] text-ink-2">
        {label} on a log scale (dots) and the prediction ∝ {fmt(rate, 3)}ᵏ (dashed)
      </div>
      <Plot view={[0, kMax, lo, hi]} aspect={0.32} minHeight={150} maxHeight={200} xLabel="k" yTickFormat={(v) => (Number.isInteger(v) ? `1e${v}` : '')} yStep={hi - lo > 8 ? 2 : 1} label="Error against step number on a log scale">
        {ref && <FnPath f={ref} color="var(--plot-4)" width={1.75} dash="6 4" />}
        <Poly points={logs.flatMap((y, i) => (Number.isFinite(y) ? [[i, y] as [number, number]] : []))} color="var(--plot-5)" width={1.25} opacity={0.5} />
        {logs.map((y, i) => (
          <Dot key={i} x={i} y={y} r={i === k ? 5 : 2.5} color={i === k ? 'var(--plot-2)' : 'var(--plot-5)'} />
        ))}
      </Plot>
    </div>
  );
}

/* ------------------------------------------------------------------ Power method ------------------------------------------------------------------ */

function PowerView({ params }: { params: Record<string, unknown> }) {
  const A0 = readMatrix(params, 'A', [
    [4, 1],
    [2, 3],
  ]);
  const n = A0.length;
  if ((n !== 2 && n !== 3) || A0[0].length !== n) throw new Error('parameter "A" should be a 2x2 or 3x3 matrix');
  const x00 = numArray(params, 'x0', Array.from({ length: n }, (_, i) => (i === 0 ? 1 : 0)));
  if (x00.length !== n) throw new Error('parameter "x0" needs one entry per row of A');
  const scaling = oneOf(params, 'scaling', ['max', 'norm'] as const, 'max');
  const name = str(params, 'name', 'A');
  const vec = str(params, 'vec', 'x');
  const kMax = Math.round(readNum(params, 'kMax', 25));

  const [A, setA] = useState(A0.map((r) => [...r]));
  const [x0, setX0] = useState(x00);
  const st = useStepper(kMax);
  const k = st.k;

  const ev = eigenvalues(A);
  const realDom = Math.abs(ev[0].im) < 1e-12 && (ev.length < 2 || cabs(ev[0]) > cabs(ev[1]) + 1e-12);
  const v1 = realDom ? nullVector(A, ev[0].re) : null;
  const ratio = ev.length > 1 && cabs(ev[0]) > 0 ? cabs(ev[1]) / cabs(ev[0]) : NaN;

  const iters = useMemo(() => {
    const xs: number[][] = [x0];
    const scales: number[] = [NaN];
    for (let i = 0; i < kMax; i++) {
      const y = matVec(A, xs[xs.length - 1]);
      let s: number;
      if (scaling === 'max') s = y.reduce((m, a) => (Math.abs(a) > Math.abs(m) ? a : m), 0);
      else s = Math.hypot(...y);
      if (!s) {
        xs.push(y);
        scales.push(0);
        continue;
      }
      xs.push(y.map((a) => a / s));
      scales.push(s);
    }
    return { xs, scales };
  }, [JSON.stringify(A), JSON.stringify(x0), kMax, scaling]); // eslint-disable-line react-hooks/exhaustive-deps
  const angleErr = (x: number[]) => {
    if (!v1) return NaN;
    const nx = Math.hypot(...x);
    if (!nx) return NaN;
    const c = Math.abs(x.reduce((s, a, i) => s + a * v1[i], 0)) / nx;
    return Math.sqrt(Math.max(0, 1 - c * c));
  };
  const errs = iters.xs.map(angleErr);
  const xk = iters.xs[k];
  const rq = (() => {
    const Ax = matVec(A, xk);
    const d = xk.reduce((s, a) => s + a * a, 0);
    return d ? xk.reduce((s, a, i) => s + a * Ax[i], 0) / d : NaN;
  })();

  // lambda_2 slider for 2x2 with real distinct eigenvalues: A = V diag(l1, l2) V^-1.
  const e2 = n === 2 ? eig2(A as M2) : null;
  const canDesign = e2?.kind === 'real';
  const setLam2 = (l2: number) => {
    if (!e2 || e2.kind !== 'real') return;
    const dom = Math.abs(e2.values[0]) >= Math.abs(e2.values[1]) ? 0 : 1;
    const V: M2 = [
      [e2.vectors[dom][0], e2.vectors[1 - dom][0]],
      [e2.vectors[dom][1], e2.vectors[1 - dom][1]],
    ];
    const Vi = inv2(V);
    if (!Vi) return;
    const l1 = e2.values[dom];
    const D = [l1, l2];
    const N = [0, 1].map((i) => [0, 1].map((j) => Math.round((V[i][0] * D[0] * Vi[0][j] + V[i][1] * D[1] * Vi[1][j]) * 1e4) / 1e4));
    setA(N);
  };
  const lam1 = e2?.kind === 'real' ? (Math.abs(e2.values[0]) >= Math.abs(e2.values[1]) ? e2.values[0] : e2.values[1]) : NaN;
  const lam2 = e2?.kind === 'real' ? (Math.abs(e2.values[0]) >= Math.abs(e2.values[1]) ? e2.values[1] : e2.values[0]) : NaN;

  const rows = Array.from({ length: Math.min(k, 6) + 1 }, (_, i) => k - Math.min(k, 6) + i);

  return (
    <Frame title={str(params, 'title', 'The power method')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {n === 2 && <PlanePicture A={A as M2} xs={iters.xs} k={k} v1={v1} onStart={(v) => (setX0(v), st.setK(0))} vec={vec} />}
      {st.controls}
      <ErrorPlot errs={errs} k={k} rate={ratio} kMax={kMax} label={`Angle error sin∠(${vec}ₖ, v₁)`} />
      <div className="flex flex-wrap items-center gap-3">
        <MatrixEditor A={A} name={name} onChange={(i, j, v) => setA((M) => M.map((r, a) => r.map((x, b) => (a === i && b === j ? v : x))))} />
        <div className="flex flex-wrap items-center gap-1">
          <span className="font-serif italic text-ink">{vec}₀ =</span>
          {x0.map((x, i) => (
            <NumberField key={i} value={x} width="w-14" srLabel={`${vec}0 entry ${i + 1}`} onChange={(v) => (setX0((X) => X.map((y, j) => (j === i ? v : y))), st.setK(0))} />
          ))}
        </div>
        <Button onClick={() => (setA(A0.map((r) => [...r])), setX0(x00), st.setK(0))}>Lesson's matrix</Button>
      </div>
      {canDesign && Number.isFinite(lam2) && (
        <Slider label={<>Set λ₂ (λ₁ = {fmt(lam1)} and both eigenvectors stay fixed)</>} value={lam2} min={-Math.abs(lam1)} max={Math.abs(lam1)} step={Math.abs(lam1) / 50} onChange={(v) => (setLam2(v), st.setK(0))} />
      )}
      <Controls cols={3}>
        <MR label="Eigenvalues (by size)" value={<Tex>{ev.map((z: CNum) => texComplex(z.re, z.im)).join(',\\ ')}</Tex>} />
        <MR label="|λ₂/λ₁|: error factor per step" value={fmt(ratio, 4)} />
        <MR label={`Scale factor and Rayleigh quotient at k = ${k}`} value={k ? `${fmt(iters.scales[k], 5)},  ${fmt(rq, 6)}` : `—,  ${fmt(rq, 6)}`} tone="var(--plot-2)" />
      </Controls>
      <div className="overflow-x-auto">
        <table className="mx-auto font-mono text-xs tabular-nums text-ink-2" style={{ borderCollapse: 'separate', borderSpacing: '12px 2px' }}>
          <thead>
            <tr className="text-ink-3">
              <th className="text-right font-normal">k</th>
              <th className="text-left font-normal">{vec}ₖ</th>
              <th className="text-right font-normal">scale</th>
              <th className="text-right font-normal">error</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i} className={i === k ? 'text-ink' : ''}>
                <td className="text-right">{i}</td>
                <td className="text-left">({iters.xs[i].map((a) => fmt(a, 4)).join(', ')})</td>
                <td className="text-right">{i ? fmt(iters.scales[i], 5) : '—'}</td>
                <td className="text-right">{Number.isFinite(errs[i]) ? fmt(errs[i], 3) : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!realDom ? (
        <Note tone="warn">No single real eigenvalue is strictly largest in size, so the iterates need not settle: watch them {ev.length > 1 && Math.abs(ev[0].im) > 1e-12 ? 'turn round without converging (complex pair)' : 'swing between directions'}.</Note>
      ) : (
        <Note>
          Each step divides by {scaling === 'max' ? 'the entry of largest size' : 'the length'}; the scale factor tends to λ₁ = {fmt(ev[0].re, 5)}, and the error shrinks by about |λ₂/λ₁| = {fmt(ratio, 3)} per step.
        </Note>
      )}
    </Frame>
  );
}

function PlanePicture({ A, xs, k, v1, onStart, vec }: { A: M2; xs: number[][]; k: number; v1: number[] | null; onStart: (v: number[]) => void; vec: string }) {
  const e = eig2(A);
  const lines = e.kind === 'real' ? e.vectors : e.kind === 'repeated' ? [e.vector] : [];
  const unit = (v: number[]): [number, number] => {
    const nv = Math.hypot(v[0], v[1]) || 1;
    return [v[0] / nv, v[1] / nv];
  };
  const pts = xs.slice(0, k + 1).map(unit);
  const cur = pts[pts.length - 1];
  const s0 = unit(xs[0]);
  return (
    <Plot view={[-1.35, 1.35, -1.35, 1.35]} equal aspect={0.6} minHeight={230} maxHeight={320} label="Directions of the iterates on the unit circle">
      <Poly points={Array.from({ length: 121 }, (_, i) => [Math.cos((i * Math.PI) / 60), Math.sin((i * Math.PI) / 60)] as [number, number])} color="var(--plot-axis)" width={1} dash="3 4" />
      {lines.map((d, i) => (
        <Line key={i} x={0} y={0} slope={Math.abs(d[0]) < 1e-12 ? Infinity : d[1] / d[0]} color={v1 && Math.abs(d[0] * v1[1] - d[1] * v1[0]) < 1e-9 ? 'var(--plot-4)' : 'var(--plot-axis)'} width={2} dash="6 4" />
      ))}
      {pts.slice(0, -1).map(([x, y], i) => (
        <Arrow key={i} x1={0} y1={0} x2={x} y2={y} color="var(--plot-2)" width={1.25} opacity={0.15 + (0.45 * i) / Math.max(1, k)} head={6} />
      ))}
      <Arrow x1={0} y1={0} x2={cur[0]} y2={cur[1]} color="var(--plot-2)" width={3} />
      <Label x={cur[0]} y={cur[1]} dx={8} dy={-8} color="var(--plot-2)" weight={600}>
        {`${vec}${subN(k)}/|${vec}${subN(k)}|`}
      </Label>
      {v1 && (
        <Label x={v1[0] * 1.2} y={v1[1] * 1.2} dx={4} dy={-4} color="var(--plot-4)" weight={600}>
          v₁
        </Label>
      )}
      <Draggable x={s0[0]} y={s0[1]} r={6} color="var(--color-ink)" step={0.05} label={`Direction of the start ${vec}0`} onChange={(x, y) => onStart(unit([x, y]).map((t) => Math.round(t * 100) / 100))} constrain={(x, y) => unit([x, y])} />
    </Plot>
  );
}
