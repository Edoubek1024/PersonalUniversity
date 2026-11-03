/**
 * least-squares: fit a line or polynomial to draggable data points by least squares. Residuals
 * are drawn as vertical segments, with the sum of squared residuals, the coefficients, the
 * normal equations and two orthogonality checks. A "your line" toggle adds a line you drag
 * yourself, with its own sum of squares, so you can see that nothing beats the least-squares fit.
 * The "pca" mode instead finds the principal direction of the centred points: the line that
 * minimises perpendicular distances.
 *
 * Params:
 *   points     [[t, y], ...]                       default [[0, 1], [1, 1], [2, 2], [3, 4]]
 *   degree     initial polynomial degree           default 1
 *   maxDegree  largest degree on the slider (no slider when equal to degree) default degree
 *   mode       "fit" | "pca"                       default "fit"
 *   compare    offer the "your line" toggle        default true
 *   view       [tMin, tMax, yMin, yMax]            default fitted to the points
 *   xName      name of the input variable          default "t"
 *   yName      name of the output                  default "y"
 *   coef       coefficient letter (c gives c_0, c_1, ...; "beta" gives beta_0, ...) default "c"
 *   title      string                              default "Least squares"
 *   caption    string
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, matrix as readMatrix, num as readNum, oneOf, str, view as readView } from '../kit/params';
import { Draggable, FnPath, Label, Line, Plot, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { lstsq, symEig2 } from '../kit/la-core';
import { texMatrix, texNum, niceDir } from '../kit/la-ui';

type Pt = [number, number];

function MR({ label, value, tone }: { label: ReactNode; value: ReactNode; tone?: string }) {
  return <Readout label={<span className="normal-case tracking-normal">{label}</span>} value={value} tone={tone} />;
}

const polyAt = (c: number[], t: number) => c.reduceRight((s, a) => s * t + a, 0);

/**
 * Least-squares polynomial of degree d. Solved in the scaled variable u = (t - m) / h for
 * conditioning, then expanded back into coefficients of 1, t, t^2, ...
 */
function fit(points: Pt[], d: number): { c: number[]; f: (t: number) => number } | null {
  if (points.length < d + 1) return null;
  const ts = points.map((p) => p[0]);
  const m = ts.reduce((a, t) => a + t, 0) / ts.length;
  const h = Math.max(1e-9, ...ts.map((t) => Math.abs(t - m)));
  const A = points.map(([t]) => Array.from({ length: d + 1 }, (_, j) => ((t - m) / h) ** j));
  const cu = lstsq(
    A,
    points.map((p) => p[1]),
  );
  if (!cu) return null;
  const c = new Array(d + 1).fill(0);
  const binom = (n: number, k: number) => {
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return r;
  };
  cu.forEach((a, j) => {
    for (let i = 0; i <= j; i++) c[i] += (a * binom(j, i) * (-m) ** (j - i)) / h ** j;
  });
  return { c, f: (t: number) => polyAt(cu, (t - m) / h) };
}

export default function LeastSquares({ params }: WidgetProps) {
  const pts0 = readMatrix(params, 'points', [
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 4],
  ]);
  if (pts0[0].length !== 2) throw new Error('parameter "points" should be a list of [t, y] pairs');
  const mode = oneOf(params, 'mode', ['fit', 'pca'] as const, 'fit');
  const d0 = Math.round(readNum(params, 'degree', 1));
  const dMax = Math.round(readNum(params, 'maxDegree', d0));
  if (d0 < 0 || dMax < d0 || dMax > 10) throw new Error('need 0 <= degree <= maxDegree <= 10');
  const xName = str(params, 'xName', 't');
  const yName = str(params, 'yName', 'y');
  const coefRaw = str(params, 'coef', 'c');
  const coefTex = coefRaw === 'beta' ? '\\beta' : coefRaw;
  const compare = bool(params, 'compare', true);
  const autoView = useMemo<[number, number, number, number]>(() => {
    const ts = pts0.map((p) => p[0]);
    const ys = pts0.map((p) => p[1]);
    const [t0, t1] = [Math.min(...ts), Math.max(...ts)];
    const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
    const pt = Math.max(1, (t1 - t0) * 0.2);
    const py = Math.max(1, (y1 - y0) * 0.35);
    return [t0 - pt, t1 + pt, y0 - py, y1 + py];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const v = readView(params, 'view', autoView);

  const [pts, setPts] = useState<Pt[]>(pts0.map((p) => [p[0], p[1]]));
  const [deg, setDeg] = useState(d0);
  const [mine, setMine] = useState(false);
  const fitted0 = useMemo(() => fit(pts, deg), [pts, deg]);
  const c = fitted0?.c ?? null;
  const snapT = (x: number) => Math.round(clamp(x, v[0], v[1]) * 20) / 20;
  const snapY = (y: number) => Math.round(clamp(y, v[2], v[3]) * 20) / 20;

  // "Your line": two handles at the ends of the data range.
  const tLo = v[0] + (v[1] - v[0]) * 0.12;
  const tHi = v[1] - (v[1] - v[0]) * 0.12;
  const startLine = (): [number, number] => {
    const c1 = fit(pts, 1);
    const y = (t: number) => (c1 ? c1.f(t) : (v[2] + v[3]) / 2);
    return [Math.round((y(tLo) + 0.6) * 10) / 10, Math.round((y(tHi) - 0.6) * 10) / 10];
  };
  const [yl, setYl] = useState<[number, number]>(startLine);
  const myLine = (t: number) => yl[0] + ((yl[1] - yl[0]) * (t - tLo)) / (tHi - tLo);

  const sse = (f: (t: number) => number) => pts.reduce((s, [t, y]) => s + (y - f(t)) ** 2, 0);
  const fitF = fitted0 ? fitted0.f : null;

  if (mode === 'pca') return <PcaView params={params} pts={pts} setPts={setPts} v={v} snapT={snapT} snapY={snapY} xName={xName} yName={yName} reset={() => setPts(pts0.map((p) => [p[0], p[1]]))} />;

  const ybar = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const sst = pts.reduce((s, p) => s + (p[1] - ybar) ** 2, 0);
  const sseFit = fitF ? sse(fitF) : NaN;
  const sseMine = sse(myLine);
  const res = fitF ? pts.map(([t, y]) => y - fitF(t)) : [];
  const orth = (j: number) => {
    const sum = pts.reduce((acc, [t], i) => acc + t ** j * res[i], 0);
    const size = pts.reduce((acc, [t], i) => acc + Math.abs(t ** j) * (Math.abs(res[i]) + 1e-3), 0);
    return Math.abs(sum) < 1e-9 * size ? 0 : sum;
  };

  // Normal equations, shown for small degree.
  const N = deg + 1;
  const AtA = Array.from({ length: N }, (_, i) => Array.from({ length: N }, (_, j) => pts.reduce((s, [t]) => s + t ** (i + j), 0)));
  const Atb = Array.from({ length: N }, (_, i) => pts.reduce((s, [t, y]) => s + t ** i * y, 0));
  const cTex = Array.from({ length: N }, (_, i) => [`${coefTex}_${i}`]);
  const model = Array.from({ length: N }, (_, j) => (j === 0 ? `${coefTex}_0` : `${coefTex}_${j}${xName}${j > 1 ? `^${j}` : ''}`)).join(' + ');
  const fitted = c
    ? c
        .map((a, j) => {
          const mag = texNum(Math.abs(a), 4);
          const term = j === 0 ? mag : `${mag === '1' ? '' : mag}${xName}${j > 1 ? `^${j}` : ''}`;
          return { neg: a < 0, term, zero: Math.abs(a) < 1e-12 };
        })
        .filter((x, j, arr) => !x.zero || arr.length === 1 || j === 0)
        .map((x, k) => (k === 0 ? `${x.neg ? '-' : ''}${x.term}` : ` ${x.neg ? '-' : '+'} ${x.term}`))
        .join('')
    : '';

  return (
    <Frame title={str(params, 'title', 'Least squares')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} aspect={0.62} minHeight={260} xLabel={xName} yLabel={yName} label="Data points with the least-squares fit and its residuals">
        {fitF && res.map((r, i) => <Segment key={`r${i}`} x1={pts[i][0]} y1={pts[i][1]} x2={pts[i][0]} y2={pts[i][1] - r} color="var(--plot-2)" width={2.5} />)}
        {mine && pts.map(([t, y], i) => <Segment key={`m${i}`} x1={t + (v[1] - v[0]) * 0.006} y1={y} x2={t + (v[1] - v[0]) * 0.006} y2={myLine(t)} color="var(--plot-4)" width={1.75} dash="3 3" />)}
        {fitF && <FnPath f={fitF} color="var(--plot-3)" width={2.5} />}
        {mine && (
          <>
            <Line x={tLo} y={yl[0]} slope={(yl[1] - yl[0]) / (tHi - tLo)} color="var(--plot-4)" width={2} dash="7 4" />
            <Draggable x={tLo} y={yl[0]} color="var(--plot-4)" r={6} step={0.1} label="Left handle of your line" onChange={(_, y) => setYl([snapY(y), yl[1]])} constrain={(_, y) => [tLo, y]} />
            <Draggable x={tHi} y={yl[1]} color="var(--plot-4)" r={6} step={0.1} label="Right handle of your line" onChange={(_, y) => setYl([yl[0], snapY(y)])} constrain={(_, y) => [tHi, y]} />
          </>
        )}
        {pts.map(([t, y], i) => (
          <Draggable key={i} x={t} y={y} color="var(--plot-1)" r={6} step={0.1} label={`Data point ${i + 1}`} onChange={(nt, ny) => setPts((P) => P.map((p, k) => (k === i ? [snapT(nt), snapY(ny)] : p)))} />
        ))}
        {pts.map(([t, y], i) => (
          <Label key={`l${i}`} x={t} y={y} dx={t > v[0] + 0.7 * (v[1] - v[0]) ? -9 : 8} dy={-9} anchor={t > v[0] + 0.7 * (v[1] - v[0]) ? 'end' : 'start'} size={11}>
            {`(${fmt(t)}, ${fmt(y)})`}
          </Label>
        ))}
      </Plot>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button onClick={() => setPts((P) => [...P, [Math.round(((v[0] + v[1]) / 2 + (P.length % 3) * 0.37) * 10) / 10, Math.round(((v[2] + v[3]) / 2) * 10) / 10]])} disabled={pts.length >= 14}>
          Add point
        </Button>
        <Button onClick={() => setPts((P) => P.slice(0, -1))} disabled={pts.length <= Math.max(2, deg + 1)}>
          Remove point
        </Button>
        <Button onClick={() => (setPts(pts0.map((p) => [p[0], p[1]])), setDeg(d0))}>Reset</Button>
        {compare && <Toggle label="Draw my own line to compete" checked={mine} onChange={(on) => (setMine(on), on && setYl(startLine()))} />}
      </div>
      {dMax > d0 && <Slider label={`Degree of the polynomial (${deg + 1} coefficients)`} value={deg} min={0} max={Math.min(dMax, pts.length - 1)} step={1} onChange={setDeg} />}

      {c ? (
        <>
          <Controls cols={3}>
            <MR label="Least-squares fit" value={deg <= 3 ? <Tex>{`${yName} = ${fitted}`}</Tex> : `degree ${deg} polynomial`} tone="var(--plot-3)" />
            <MR label="Sum of squared residuals" value={fmt(sseFit, 4)} tone="var(--plot-2)" />
            {mine ? (
              <MR label="Your line's sum of squares" value={`${fmt(sseMine, 4)}  (${sseMine - sseFit < 5e-4 ? 'tied' : `+${fmt(sseMine - sseFit, 3)}`})`} tone="var(--plot-4)" />
            ) : (
              <MR label={<>R² = 1 − SSE/SST</>} value={sst > 0 ? fmt(1 - sseFit / sst, 4) : '—'} />
            )}
          </Controls>
          {N <= 4 && (
            <div className="overflow-x-auto text-sm">
              <Tex display>{`\\underbrace{${texMatrix(AtA, 'b', 4)}}_{A^TA}\\underbrace{${texMatrix(cTex, 'b')}}_{\\hat{${coefTex}}} = \\underbrace{${texMatrix(Atb.map((x) => [x]), 'b', 4)}}_{A^Tb}`}</Tex>
            </div>
          )}
          <Note>
            <span>
              Model <Tex>{`${yName} \\approx ${model}`}</Tex>. Residuals are perpendicular to every column of A:{' '}
              <Tex>{Array.from({ length: Math.min(N, 3) }, (_, j) => `\\textstyle\\sum ${j === 0 ? '' : j === 1 ? `${xName}_i` : `${xName}_i^{${j}}`} r_i = ${texNum(orth(j), 3)}`).join(',\\quad ')}</Tex>
            </span>
          </Note>
        </>
      ) : (
        <Note tone="warn">The columns of A are dependent here (too few distinct {xName} values for this degree), so the normal equations have no unique solution.</Note>
      )}
    </Frame>
  );
}

function PcaView({ params, pts, setPts, v, snapT, snapY, xName, yName, reset }: { params: Record<string, unknown>; pts: Pt[]; setPts: (f: (p: Pt[]) => Pt[]) => void; v: [number, number, number, number]; snapT: (x: number) => number; snapY: (y: number) => number; xName: string; yName: string; reset: () => void }) {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / n;
  const my = pts.reduce((s, p) => s + p[1], 0) / n;
  const X = pts.map(([a, b]) => [a - mx, b - my]);
  const sxx = X.reduce((s, p) => s + p[0] * p[0], 0);
  const sxy = X.reduce((s, p) => s + p[0] * p[1], 0);
  const syy = X.reduce((s, p) => s + p[1] * p[1], 0);
  const { values, vectors } = symEig2(sxx, sxy, syy);
  const v1 = vectors[0];
  const total = values[0] + values[1];
  const [showReg, setShowReg] = useState(false);
  const slope = Math.abs(v1[0]) < 1e-12 ? Infinity : v1[1] / v1[0];
  const proj = X.map(([a, b]) => (a * v1[0] + b * v1[1]));
  const reg = sxx > 0 ? sxy / sxx : NaN;
  return (
    <Frame title={str(params, 'title', 'Principal direction')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} equal aspect={0.7} minHeight={280} xLabel={xName} yLabel={yName} label="Data points with their first principal direction">
        <Line x={mx} y={my} slope={slope} color="var(--plot-3)" width={2.5} />
        {showReg && Number.isFinite(reg) && <Line x={mx} y={my} slope={reg} color="var(--plot-4)" width={2} dash="7 4" />}
        {pts.map(([a, b], i) => (
          <Segment key={i} x1={a} y1={b} x2={mx + proj[i] * v1[0]} y2={my + proj[i] * v1[1]} color="var(--plot-2)" width={2.5} />
        ))}
        {pts.map(([a, b], i) => (
          <Draggable key={`d${i}`} x={a} y={b} color="var(--plot-1)" r={6} step={0.1} label={`Data point ${i + 1}`} onChange={(nx, ny) => setPts((P) => P.map((p, k) => (k === i ? [snapT(nx), snapY(ny)] : p)))} />
        ))}
        <Label x={mx} y={my} dx={8} dy={16} color="var(--plot-3)" weight={600}>
          mean
        </Label>
      </Plot>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button onClick={reset}>Reset</Button>
        <Toggle label="Compare with the regression line (vertical errors)" checked={showReg} onChange={setShowReg} />
      </div>
      <Controls cols={3}>
        <MR label="XᵀX (centred)" value={<Tex>{texMatrix([[sxx, sxy], [sxy, syy]], 'b', 4)}</Tex>} />
        <MR label="Eigenvalues σ₁², σ₂²" value={`${fmt(values[0], 4)}, ${fmt(values[1], 4)}`} />
        <MR label="First direction v₁, share of variance" value={`(${fmt(v1[0])}, ${fmt(v1[1])}), ${total > 0 ? fmt((100 * values[0]) / total, 3) : '—'}%`} tone="var(--plot-3)" />
      </Controls>
      <Note>
        The green line through the mean minimises the sum of squared perpendicular distances (red), which is σ₂² = {fmt(values[1], 4)}. Direction v₁ ∝ ({niceDir(v1).map((x) => fmt(x)).join(', ')}).
      </Note>
    </Frame>
  );
}
