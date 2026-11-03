/**
 * riemann-sum: Riemann sums, the integral as accumulated area, and how fast numerical rules
 * converge. Modes
 *   sum         rectangles (left, right, midpoint, upper, lower), trapezoids or Simpson parabolas
 *               on [a, b] with n pieces; readouts of the sum, the integral and the error
 *   accumulate  A(x) = ∫_a^x f(t) dt: drag the right edge x, watch the signed area and the graph
 *               of A traced below, whose slope at x is f(x)
 *   error       |error| against n on log-log axes for several rules, with slope −2 and −4 guides
 *               and a doubling table
 *
 * Params:
 *   f        string    integrand in x                                 default "x^2"
 *   g        string    lower curve: sums of f − g between the curves   default none
 *   a, b     numbers   interval                                       default 0, 2
 *   n        number    starting number of pieces                      default 4
 *   nMax     number    largest n on the slider                        default 100
 *   method   string    left | right | midpoint | trapezoid | simpson | upper | lower   default "right"
 *   methods  string[]  which methods to offer                         default all (no upper/lower with g)
 *   exact    number    the exact integral, if known                   default high-accuracy numeric value
 *   exactTex string    TeX for the exact value, e.g. "\\tfrac83"      default none
 *   view     [xMin, xMax, yMin, yMax]                                 default fitted to f on [a, b]
 *   modes    string[]  any of "sum", "accumulate", "error"            default ["sum"]
 *   mode     string    starting mode                                  default first of modes
 *   trig     boolean   x ticks at multiples of π/2                    default false
 *   x        number    starting right edge in accumulate mode         default midpoint of [a, b]
 *   title, caption
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray, view as readView } from '../kit/params';
import { Plot, FnPath, FillBetween, Poly, Rect, Segment, Dot, Line, Label, Draggable } from '../kit/Plot';
import { Button, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';
import { compile1, cumulative, integrate, piTick, sig, type Fn } from '../kit/calc1-math';
import { Corner, Legend, NumTable, ReadoutGrid } from '../kit/calc1-ui';

const ALL = ['left', 'right', 'midpoint', 'trapezoid', 'simpson', 'upper', 'lower'] as const;
type Method = (typeof ALL)[number];
type Mode = 'sum' | 'accumulate' | 'error';
const MLABEL: Record<Method, string> = { left: 'Left', right: 'Right', midpoint: 'Midpoint', trapezoid: 'Trapezoid', simpson: 'Simpson', upper: 'Upper', lower: 'Lower' };
const MSYM: Record<Method, string> = { left: 'L', right: 'R', midpoint: 'M', trapezoid: 'T', simpson: 'S', upper: 'U', lower: '\\underline{L}' };
const MODE_LABEL: Record<Mode, string> = { sum: 'Riemann sum', accumulate: 'Accumulated area', error: 'Error against n' };
const MCOLOR: Partial<Record<Method, string>> = { left: 'var(--plot-6)', right: 'var(--plot-2)', midpoint: 'var(--plot-5)', trapezoid: 'var(--plot-4)', simpson: 'var(--plot-3)' };

/** Supremum or infimum of h on [lo, hi] by sampling. */
function extreme(h: Fn, lo: number, hi: number, up: boolean): number {
  let best = up ? -Infinity : Infinity;
  for (let k = 0; k <= 48; k++) {
    const y = h(lo + ((hi - lo) * k) / 48);
    if (Number.isFinite(y)) best = up ? Math.max(best, y) : Math.min(best, y);
  }
  return best;
}

function ruleSum(h: Fn, a: number, b: number, n: number, m: Method): number {
  const dx = (b - a) / n;
  let s = 0;
  switch (m) {
    case 'left':
      for (let i = 0; i < n; i++) s += h(a + i * dx);
      return s * dx;
    case 'right':
      for (let i = 1; i <= n; i++) s += h(a + i * dx);
      return s * dx;
    case 'midpoint':
      for (let i = 0; i < n; i++) s += h(a + (i + 0.5) * dx);
      return s * dx;
    case 'trapezoid':
      s = (h(a) + h(b)) / 2;
      for (let i = 1; i < n; i++) s += h(a + i * dx);
      return s * dx;
    case 'simpson': {
      s = h(a) + h(b);
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * h(a + i * dx);
      return (s * dx) / 3;
    }
    case 'upper':
    case 'lower':
      for (let i = 0; i < n; i++) s += extreme(h, a + i * dx, a + (i + 1) * dx, m === 'upper');
      return s * dx;
  }
}

const POS = 'var(--plot-1)';
const NEG = 'var(--plot-2)';

/** Region between the parabola through three points of f (and of g) over [x0, x2]. */
function SimpsonPiece({ f, g, x0, x2 }: { f: Fn; g: Fn; x0: number; x2: number }) {
  const x1 = (x0 + x2) / 2;
  const quad = (h: Fn) => {
    const [y0, y1, y2] = [h(x0), h(x1), h(x2)];
    const hw = (x2 - x0) / 2;
    return (x: number) => {
      const t = (x - x1) / hw;
      return y1 + ((y2 - y0) / 2) * t + ((y0 - 2 * y1 + y2) / 2) * t * t;
    };
  };
  const qf = quad(f);
  const qg = quad(g);
  const area = ((x2 - x0) / 6) * (f(x0) - g(x0) + 4 * (f(x1) - g(x1)) + f(x2) - g(x2));
  const col = area >= 0 ? POS : NEG;
  return (
    <>
      <FillBetween top={qf} bottom={qg} a={x0} b={x2} fill={col} opacity={0.22} samples={40} />
      <FnPath f={qf} from={x0} to={x2} color={col} width={1.5} samples={40} />
      <Segment x1={x0} y1={g(x0)} x2={x0} y2={f(x0)} color={col} width={1} opacity={0.7} />
      <Segment x1={x2} y1={g(x2)} x2={x2} y2={f(x2)} color={col} width={1} opacity={0.7} />
    </>
  );
}

function Pieces({ f, g, a, b, n, m }: { f: Fn; g: Fn; a: number; b: number; n: number; m: Method }) {

  const dx = (b - a) / n;
  const els = [];
  const h = (x: number) => f(x) - g(x);
  if (m === 'simpson') {
    for (let i = 0; i < n; i += 2) els.push(<SimpsonPiece key={i} f={f} g={g} x0={a + i * dx} x2={a + (i + 2) * dx} />);
    for (let i = 0; i <= n; i++) els.push(<Dot key={`d${i}`} x={a + i * dx} y={f(a + i * dx)} r={3} color="var(--color-ink-2)" />);
    return <>{els}</>;
  }
  for (let i = 0; i < n; i++) {
    const x0 = a + i * dx;
    const x1 = x0 + dx;
    if (m === 'trapezoid') {
      const area = (h(x0) + h(x1)) / 2;
      const col = area >= 0 ? POS : NEG;
      els.push(<Poly key={i} points={[[x0, g(x0)], [x0, f(x0)], [x1, f(x1)], [x1, g(x1)]]} closed fill={col} fillOpacity={0.22} color={col} width={1.25} />);
      continue;
    }
    const xs = m === 'left' ? x0 : m === 'right' ? x1 : (x0 + x1) / 2;
    const top = m === 'upper' || m === 'lower' ? g(xs) + extreme(h, x0, x1, m === 'upper') : f(xs);
    const bot = g(xs);
    const col = top - bot >= 0 ? POS : NEG;
    els.push(<Rect key={i} x={x0} y={bot} w={dx} h={top - bot} fill={col} opacity={0.22} color={col} width={1.25} />);
    if (m !== 'upper' && m !== 'lower') els.push(<Dot key={`d${i}`} x={xs} y={f(xs)} r={n > 40 ? 2 : 3.5} color="var(--color-ink-2)" />);
  }
  return <>{els}</>;
}

function sumTex(m: Method, n: number): string {
  const S = `${MSYM[m]}_{${n}}`;
  switch (m) {
    case 'left':
      return `${S}=\\sum_{i=1}^{${n}} f(x_{i-1})\\,\\Delta x`;
    case 'right':
      return `${S}=\\sum_{i=1}^{${n}} f(x_i)\\,\\Delta x`;
    case 'midpoint':
      return `${S}=\\sum_{i=1}^{${n}} f(\\bar x_i)\\,\\Delta x`;
    case 'trapezoid':
      return `${S}=\\tfrac{\\Delta x}{2}\\left[f(x_0)+2f(x_1)+\\dots+2f(x_{${n - 1}})+f(x_{${n}})\\right]`;
    case 'simpson':
      return `${S}=\\tfrac{\\Delta x}{3}\\left[f(x_0)+4f(x_1)+2f(x_2)+\\dots+f(x_{${n}})\\right]`;
    case 'upper':
      return `U_{${n}}=\\sum_{i=1}^{${n}} M_i\\,\\Delta x,\\ M_i=\\max f\\text{ on the }i\\text{th piece}`;
    case 'lower':
      return `L_{${n}}=\\sum_{i=1}^{${n}} m_i\\,\\Delta x,\\ m_i=\\min f\\text{ on the }i\\text{th piece}`;
  }
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const pow10 = (k: number) => `10${k < 0 ? '⁻' : ''}${String(Math.abs(Math.round(k))).split('').map((c) => SUP[+c]).join('')}`;

function ErrorMode({ h, a, b, exact, methods, n, setN }: { h: Fn; a: number; b: number; exact: number; methods: Method[]; n: number; setN: (n: number) => void }) {
  const ms = methods.filter((m) => m !== 'upper' && m !== 'lower' && m !== 'right');
  const ns = useMemo(() => {
    const out: number[] = [];
    for (let k = 1; k <= 64; k++) out.push(k);
    for (let k = 64; k <= 1024; k = Math.ceil(k * 1.08)) if (k > 64) out.push(k);
    if (out[out.length - 1] !== 1024) out.push(1024);
    return out;
  }, []);
  const floor = 1e-16;
  const curves = useMemo(
    () =>
      ms.map((m) => ({
        m,
        pts: ns.filter((k) => m !== 'simpson' || k % 2 === 0).map((k) => [Math.log10(k), Math.log10(Math.max(floor, Math.abs(ruleSum(h, a, b, k, m) - exact)))] as [number, number]),
      })),
    [h, a, b, exact, ms.join()], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const yTop = Math.ceil(Math.max(...curves.flatMap((c) => c.pts.map((p) => p[1]))) + 0.5);
  const view: [number, number, number, number] = [0, Math.log10(1024), -16, Math.max(yTop, 0)];
  // Reference slopes anchored at n = 1 on the trapezoid-like scale.
  const anchor = curves.find((c) => c.m === 'trapezoid')?.pts[0]?.[1] ?? curves[0]?.pts[0]?.[1] ?? 0;
  const rows = [2, 4, 8, 16, 32, 64, 128, 256].map((k) => {
    const cells: string[] = [String(k)];
    for (const m of ms) {
      const e = Math.abs(ruleSum(h, a, b, k, m) - exact);
      const e2 = Math.abs(ruleSum(h, a, b, k / 2, m) - exact);
      cells.push(sig(e, 3));
      cells.push(m === 'simpson' && k / 2 < 2 ? '—' : e > 1e-14 ? fmt(e2 / e, 3) : '—');
    }
    return cells;
  });
  return (
    <>
      <Plot view={view} aspect={0.62} minHeight={260} maxHeight={420} xStep={1} yStep={2} xTickFormat={(t) => pow10(t)} yTickFormat={(t) => pow10(t)} xLabel="n" label="Absolute error against n on logarithmic axes">
        <Line x={0} y={anchor} slope={-2} color="var(--plot-axis)" width={1} dash="4 5" />
        <Line x={0} y={anchor} slope={-4} color="var(--plot-axis)" width={1} dash="1 4" />
        <Line x={0} y={anchor} slope={-1} color="var(--plot-axis)" width={1} dash="8 4" opacity={0.6} />
        {curves.map((c) => (
          <Poly key={c.m} points={c.pts} color={MCOLOR[c.m]} width={2} />
        ))}
        <Segment x1={Math.log10(n)} y1={-16} x2={Math.log10(n)} y2={view[3]} color="var(--color-accent)" width={1.25} dash="3 3" />
        <Label x={1.5} y={anchor - 3} dx={4} size={11} color="var(--plot-text)">
          slope −2
        </Label>
        <Label x={0.75} y={anchor - 3} dx={2} size={11} color="var(--plot-text)">
          slope −4
        </Label>
        <Corner corner="tr">|error| (log scale)</Corner>
      </Plot>
      <Legend items={[...ms.map((m) => ({ color: MCOLOR[m]!, label: MLABEL[m] })), { color: 'var(--plot-axis)', label: 'slopes −1, −2, −4', dash: true }]} />
      <Slider label="n" value={n} min={1} max={1024} step={1} onChange={(k) => setN(Math.round(k))} />
      <ReadoutGrid>
        {ms.map((m) => {
          const k = m === 'simpson' && n % 2 ? n + 1 : n;
          return <Readout key={m} label={`${MLABEL[m]} error, n = ${k}`} value={sig(ruleSum(h, a, b, k, m) - exact, 3)} tone={MCOLOR[m]} />;
        })}
      </ReadoutGrid>
      <NumTable head={['n', ...ms.flatMap((m) => [`|E| ${MLABEL[m]}`, 'ratio'])]} rows={rows} />
      <Note>The ratio is the error with n/2 pieces divided by the error with n. About 2 means error ∝ 1/n, about 4 means 1/n², about 16 means 1/n⁴. Below about 10⁻¹⁴ rounding error takes over.</Note>
    </>
  );
}

function AccumulateMode({ f, a, b, v, ticks, x0 }: { f: Fn; a: number; b: number; v: [number, number, number, number]; ticks: object; x0: number }) {
  const [x, setX] = useState(x0);
  const [playing, setPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const A = useMemo(() => cumulative(f, a, v[0], v[1], 600), [f, a, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const range = useMemo<[number, number]>(() => {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i <= 200; i++) {
      const y = A(v[0] + ((v[1] - v[0]) * i) / 200);
      if (Number.isFinite(y)) {
        lo = Math.min(lo, y);
        hi = Math.max(hi, y);
      }
    }
    const pad = (hi - lo) * 0.12 || 1;
    return [lo - pad, hi + pad];
  }, [A, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  useAnimation(playing, (dt) => {
    const nx = x + (dt * (b - a)) / 6;
    if (nx >= b) {
      setX(b);
      setPlaying(false);
    } else setX(nx);
  });
  const Ax = A(x);
  const fx = f(x);
  const lo = Math.min(a, x);
  const hi = Math.max(a, x);
  const strip = (v[1] - v[0]) / 60;
  const numSlope = (A(x + 1e-4) - A(x - 1e-4)) / 2e-4;
  return (
    <>
      <Plot view={v} aspect={0.5} minHeight={210} maxHeight={330} {...ticks} label="Graph of f with the signed area from a to x shaded">
        <FillBetween top={(t) => Math.max(0, f(t))} a={lo} b={hi} fill={POS} opacity={0.25} />
        <FillBetween top={(t) => Math.min(0, f(t))} a={lo} b={hi} fill={NEG} opacity={0.25} />
        {Number.isFinite(fx) && <Rect x={x} y={0} w={strip} h={fx} fill="var(--plot-4)" opacity={0.55} />}
        <FnPath f={f} />
        <Segment x1={a} y1={v[2]} x2={a} y2={v[3]} color="var(--plot-axis)" width={1} dash="3 4" />
        <Segment x1={x} y1={0} x2={x} y2={fx} color="var(--color-accent)" width={1.5} />
        <Label x={a} y={v[2]} dx={4} dy={-6} size={11}>
          a
        </Label>
        <Draggable x={x} y={0} color="var(--color-accent)" label="Moving right edge x" constrain={(nx) => [clamp(nx, v[0], v[1]), 0]} onChange={(nx) => { setPlaying(false); setX(nx); }} />
        <Corner corner="tr">y = f(t)</Corner>
      </Plot>
      <Plot view={[v[0], v[1], range[0], range[1]]} aspect={0.4} minHeight={170} maxHeight={270} {...ticks} label="Graph of the accumulated area A(x)">
        {showAll && <FnPath f={A} color="var(--plot-3)" width={1.5} dash="5 5" opacity={0.7} />}
        <FnPath f={A} from={Math.min(a, x)} to={Math.max(a, x)} color="var(--plot-3)" width={2.5} />
        {Number.isFinite(fx) && <Line x={x} y={Ax} slope={fx} color="var(--plot-4)" width={1.5} dash="6 4" />}
        <Dot x={x} y={Ax} color="var(--plot-3)" r={5} />
        <Corner corner="tr">y = A(x): slope here = f(x)</Corner>
      </Plot>
      <Legend items={[{ color: POS, label: 'area above the axis (+)' }, { color: NEG, label: 'area below (−)' }, { color: 'var(--plot-3)', label: 'A(x)' }, { color: 'var(--plot-4)', label: 'tangent to A, slope f(x)', dash: true }]} />
      <ReadoutGrid>
        <Readout label="A(x)" value={sig(Ax, 6)} tone="var(--plot-3)" />
        <Readout label="f(x)" value={sig(fx, 6)} tone="var(--plot-1)" />
        <Readout label="slope of A at x" value={sig(numSlope, 6)} tone="var(--plot-4)" />
      </ReadoutGrid>
      <Slider label="x" value={x} min={v[0]} max={v[1]} step={(v[1] - v[0]) / 400} onChange={(nx) => { setPlaying(false); setX(nx); }} />
      <div className="flex flex-wrap items-center gap-2">
        <Button primary onClick={() => { if (!playing && x >= b - 1e-9) setX(a); setPlaying((p) => !p); }}>{playing ? 'Pause' : 'Play'}</Button>
        <Button onClick={() => { setPlaying(false); setX(a); }}>Reset</Button>
        <Toggle label="Show all of A" checked={showAll} onChange={setShowAll} />
      </div>
    </>
  );
}

export default function RiemannSum({ params }: WidgetProps) {
  const src = str(params, 'f', 'x^2');
  const gsrc = params.g === undefined ? null : str(params, 'g', '0');
  const f = useMemo(() => compile1(src, 'f'), [src]);
  const g = useMemo<Fn>(() => (gsrc === null ? () => 0 : compile1(gsrc, 'g')), [gsrc]);
  const h = useMemo<Fn>(() => (x) => f(x) - g(x), [f, g]);
  const a = num(params, 'a', 0);
  const b = num(params, 'b', 2);
  if (!(b > a)) throw new Error('parameters "a" and "b" should satisfy a < b');
  const nMax = Math.max(2, Math.round(num(params, 'nMax', 100)));
  const methods = strArray(params, 'methods', gsrc === null ? [...ALL] : ALL.filter((m) => m !== 'upper' && m !== 'lower')) as Method[];
  for (const m of methods) if (!ALL.includes(m)) throw new Error(`parameter "methods": unknown method "${m}" (use ${ALL.join(', ')})`);
  if (gsrc !== null && methods.some((m) => m === 'upper' || m === 'lower')) throw new Error('upper and lower sums are not available with "g"');
  const modes = strArray(params, 'modes', ['sum']) as Mode[];
  for (const m of modes) if (!(m in MODE_LABEL)) throw new Error(`parameter "modes": unknown mode "${m}" (use sum, accumulate, error)`);
  const exactParam = params.exact === undefined ? undefined : num(params, 'exact', 0);
  const exactTex = params.exactTex === undefined ? undefined : str(params, 'exactTex', '');
  const ticks = bool(params, 'trig', false) ? { xStep: Math.PI / 2, xTickFormat: piTick } : {};

  const autoView = useMemo<[number, number, number, number]>(() => {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i <= 200; i++) {
      const x = a + ((b - a) * i) / 200;
      for (const y of [f(x), g(x)]) if (Number.isFinite(y)) [lo, hi] = [Math.min(lo, y), Math.max(hi, y)];
    }
    const px = (b - a) * 0.12;
    const py = (hi - lo) * 0.12 || 1;
    return [a - px, b + px, lo - py, hi + py];
  }, [f, g, a, b]);
  const v = params.view === undefined ? autoView : readView(params, 'view', autoView);

  const [mode, setMode] = useState<Mode>(() => oneOf(params, 'mode', modes, modes[0] ?? 'sum'));
  const [method, setMethod] = useState<Method>(() => oneOf(params, 'method', methods, methods.includes('right') ? 'right' : methods[0]));
  const [n, setN] = useState(clamp(Math.round(num(params, 'n', 4)), 1, Math.max(nMax, 1024)));

  const exact = useMemo(() => exactParam ?? integrate(h, a, b, 1e-15), [exactParam, h, a, b]);
  const nS = clamp(n, 1, nMax);
  const nEff = method === 'simpson' && nS % 2 ? nS + 1 : nS;
  const nSum = nEff;
  // Rounding noise (1e-16) shown as 0, so exact cancellation reads as 0.
  const S0 = ruleSum(h, a, b, nSum, method);
  const S = Math.abs(S0 - exact) < 1e-13 * (1 + Math.abs(exact)) ? exact : S0;

  return (
    <Frame title={str(params, 'title', 'Riemann sums')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={setMode} />}
      {mode === 'sum' && (
        <>
          {methods.length > 1 && <Segmented options={methods.map((m) => ({ value: m, label: MLABEL[m] }))} value={method} onChange={setMethod} />}
          <Plot view={v} aspect={0.58} minHeight={240} maxHeight={420} {...ticks} label={`${MLABEL[method]} approximation with ${nSum} pieces`}>
            <Pieces f={f} g={g} a={a} b={b} n={nSum} m={method} />
            <FnPath f={f} />
            {gsrc !== null && <FnPath f={g} color="var(--plot-6)" />}
          </Plot>
          <div className="overflow-x-auto text-sm">
            <Tex>{sumTex(method, nSum)}</Tex>
          </div>
          <ReadoutGrid>
            <Readout label={`${MLABEL[method]} sum, n = ${nSum}`} value={sig(S, 8)} tone="var(--plot-1)" />
            <Readout label="Integral" value={exactTex ? <span className="inline-flex items-baseline gap-1.5"><Tex>{exactTex}</Tex> ≈ {sig(exact, 8)}</span> : sig(exact, 10)} />
            <Readout label="Error (sum − integral)" value={sig(S - exact, 4)} tone={Math.abs(S - exact) < 1e-9 ? 'var(--plot-3)' : 'var(--plot-2)'} />
          </ReadoutGrid>
          <Slider label={<span>n (Δx = {sig((b - a) / nSum, 4)})</span>} value={nS} min={1} max={nMax} step={1} onChange={(k) => setN(Math.round(k))} format={(k) => String(Math.round(k))} />
          {method === 'simpson' && nS % 2 === 1 && <Note>Simpson's rule needs an even n, so n = {nS + 1} is used.</Note>}
        </>
      )}
      {mode === 'accumulate' && <AccumulateMode f={h} a={a} b={b} v={v} ticks={ticks} x0={num(params, 'x', (a + b) / 2)} />}
      {mode === 'error' && <ErrorMode h={h} a={a} b={b} exact={exact} methods={methods} n={n} setN={setN} />}
    </Frame>
  );
}
