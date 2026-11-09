/**
 * growth-compound: compound growth and the rule of 70, or a simple Solow diagram.
 *
 * compound mode: two economies with starting incomes and growth rates, plotted over a horizon on
 * a linear or a log scale. Readouts give the rule-of-70 and exact doubling times, the income
 * ratio at the end and the year the poorer economy catches up (if it does).
 *
 * solow mode: output per worker y = A k^alpha, investment s y and depreciation delta k against
 * capital per worker k. Where investment equals depreciation is the steady state k*. Drag the
 * starting k (or use the slider) and Step / Play to watch k converge.
 *
 * Params:
 *   mode      "compound" | "solow"                      default "compound"
 *   modes     string[]  modes offered in a switch        default [mode]
 *   names     [string, string]                           default ["Economy A", "Economy B"]
 *   y0        [number, number]  starting incomes         default [20000, 5000]
 *   g         [number, number]  growth rates, percent    default [1.5, 4.5]
 *   years     number  horizon (10-200)                   default 100
 *   scale     "linear" | "log"                           default "linear"
 *   s, delta, alpha, A   Solow parameters               default 0.25, 0.05, 0.33, 1
 *   k0        number  starting capital per worker        default k* / 4
 *   title     string
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, oneOf, str, strArray } from '../kit/params';
import { Dot, Draggable, FnPath, Label, Plot, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { fmt, niceStep } from '../kit/num';
import { catchUpYears, doublingTime, solowKStar, solowNext, solowY, type Solow } from '../kit/econ-macro';

const MODES = ['compound', 'solow'] as const;
type Mode = (typeof MODES)[number];

export default function GrowthCompound({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'compound');
  const modes = strArray(params, 'modes', [mode0]);
  if (!modes.every((m) => (MODES as readonly string[]).includes(m))) throw new Error('parameter "modes" may contain only "compound" and "solow"');
  const [mode, setMode] = useState<Mode>(mode0);
  const title = str(params, 'title', mode0 === 'solow' ? 'The Solow model: saving, depreciation and the steady state' : 'Compound growth and the rule of 70');
  return (
    <Frame title={title} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && (
        <Segmented
          label="View"
          options={(modes as Mode[]).map((m) => ({ value: m, label: m === 'compound' ? 'Compound growth' : 'Solow diagram' }))}
          value={mode}
          onChange={setMode}
        />
      )}
      {mode === 'compound' ? <CompoundView params={params} /> : <SolowView params={params} />}
    </Frame>
  );
}

/* ------------------------------------------------------------------ compound ------------------------------------------------------------------ */

function CompoundView({ params }: { params: Record<string, unknown> }) {
  const names = strArray(params, 'names', ['Economy A', 'Economy B']);
  const y00 = numArray(params, 'y0', [20000, 5000]);
  const g00 = numArray(params, 'g', [1.5, 4.5]);
  if (names.length !== 2 || y00.length !== 2 || g00.length !== 2) throw new Error('parameters "names", "y0" and "g" need exactly two entries');
  if (!(y00[0] > 0 && y00[1] > 0)) throw new Error('parameter "y0" must be positive');
  const years0 = Math.round(num(params, 'years', 100));
  if (years0 < 10 || years0 > 200) throw new Error('parameter "years" must be between 10 and 200');

  const [gA, setGA] = useState(g00[0]);
  const [gB, setGB] = useState(g00[1]);
  const [yB, setYB] = useState(y00[1]);
  const [years, setYears] = useState(years0);
  const [scale, setScale] = useState<'linear' | 'log'>(oneOf(params, 'scale', ['linear', 'log'] as const, 'linear'));
  const yA = y00[0];

  const fA = (t: number) => yA * Math.pow(1 + gA / 100, t);
  const fB = (t: number) => yB * Math.pow(1 + gB / 100, t);
  const endA = fA(years);
  const endB = fB(years);
  const hi = Math.max(endA, endB, yA, yB);
  const lo = Math.min(yA, yB, endA, endB);
  const log = scale === 'log';
  const tr = (v: number) => (log ? Math.log10(v) : v);
  const yTop = log ? Math.log10(hi) + 0.25 : hi * 1.1;
  const yBot = log ? Math.log10(lo) - 0.25 : -yTop * 0.05;
  const view: [number, number, number, number] = [0, years, yBot, yTop];
  const pA = useMemo(() => (t: number) => tr(fA(t)), [gA, yA, log]); // eslint-disable-line react-hooks/exhaustive-deps
  const pB = useMemo(() => (t: number) => tr(fB(t)), [gB, yB, log]); // eslint-disable-line react-hooks/exhaustive-deps

  const dA = doublingTime(gA);
  const dB = doublingTime(gB);
  const cu = catchUpYears(yA, gA, yB, gB);
  const yStepLin = niceStep(yTop - yBot, 5);
  // Powers of ten when the range covers two decades or more, half-decades otherwise.
  const logStep = yTop - yBot >= 2 ? Math.max(1, Math.round(niceStep(yTop - yBot, 5))) : 0.5;
  const money = (v: number) => (Math.abs(v) >= 1e6 ? `${fmt(v / 1e6, 3)}m` : Math.abs(v) >= 1e4 ? `${fmt(v / 1e3, 3)}k` : fmt(v, 4));

  // Doubling marks along each path.
  const marks = (y0: number, d: number) => {
    const out: [number, number, number][] = [];
    if (!(d > 0) || !Number.isFinite(d)) return out;
    for (let i = 1; i * d <= years && i <= 12; i++) out.push([i * d, tr(y0 * Math.pow(2, i)), i]);
    return out;
  };

  return (
    <>
      <Segmented
        label="Vertical scale"
        options={[
          { value: 'linear', label: 'Linear' },
          { value: 'log', label: 'Log (ratio)' },
        ]}
        value={scale}
        onChange={setScale}
      />
      <Plot
        view={view}
        aspect={0.6}
        xLabel="years"
        yLabel={log ? 'income per person (log scale)' : 'income per person'}
        yStep={log ? logStep : yStepLin}
        yTickFormat={(v) => (!log && v < 0 ? '' : money(log ? Math.pow(10, v) : v))}
        label="Income paths of two economies growing at constant rates"
      >
        <FnPath f={pA} color="var(--plot-1)" />
        <FnPath f={pB} color="var(--plot-2)" />
        {marks(yA, dA).map(([t, v, i]) => (
          <Dot key={`a${i}`} x={t} y={v} r={3.5} color="var(--plot-1)" />
        ))}
        {marks(yB, dB).map(([t, v, i]) => (
          <Dot key={`b${i}`} x={t} y={v} r={3.5} color="var(--plot-2)" />
        ))}
        {Number.isFinite(cu) && cu > 0 && cu <= years && (
          <>
            <Segment x1={cu} y1={yBot} x2={cu} y2={tr(fA(cu))} dash="4 3" width={1.25} />
            <Label x={cu} y={tr(fA(cu))} dx={-6} dy={-10} anchor="end" weight={600}>
              {`catch-up: year ${fmt(cu, 3)}`}
            </Label>
          </>
        )}
        <EndLabels x={years} ya={pA(years)} yb={pB(years)} names={names} />
      </Plot>
      <div className="text-xs text-ink-3">Dots mark each doubling. On the log scale a constant growth rate is a straight line, and its slope is the growth rate.</div>
      <Controls cols={3}>
        <Readout label={`${names[0]}: 70/g vs exact doubling`} value={`${fmt(70 / gA, 3)} vs ${fmt(dA, 3)} yr`} tone="var(--plot-1)" />
        <Readout label={`${names[1]}: 70/g vs exact doubling`} value={`${fmt(70 / gB, 3)} vs ${fmt(dB, 3)} yr`} tone="var(--plot-2)" />
        <Readout label={`Ratio after ${years} years`} value={`${fmt(endA / endB, 3)} : 1`} />
        <Readout label={`${names[0]} in year ${years}`} value={money(endA)} tone="var(--plot-1)" />
        <Readout label={`${names[1]} in year ${years}`} value={money(endB)} tone="var(--plot-2)" />
        <Readout label="Catch-up year" value={yB >= yA ? 'already ahead' : Number.isFinite(cu) ? fmt(cu, 3) : 'never at these rates'} />
      </Controls>
      <Controls cols={2}>
        <Slider label={`${names[0]} growth rate g (%)`} value={gA} min={0.1} max={10} step={0.1} onChange={setGA} />
        <Slider label={`${names[1]} growth rate g (%)`} value={gB} min={0.1} max={10} step={0.1} onChange={setGB} />
        <Slider label={`${names[1]} starting income (${names[0]} = ${money(yA)})`} value={yB} min={Math.round(yA / 40)} max={yA} step={Math.max(1, Math.round(yA / 400))} onChange={setYB} format={money} />
        <Slider label="Horizon (years)" value={years} min={10} max={200} step={1} onChange={setYears} />
      </Controls>
    </>
  );
}

/* ------------------------------------------------------------------ Solow ------------------------------------------------------------------ */

function SolowView({ params }: { params: Record<string, unknown> }) {
  const [m, setM] = useState<Solow>({ s: num(params, 's', 0.25), delta: num(params, 'delta', 0.05), alpha: num(params, 'alpha', 0.33), A: num(params, 'A', 1) });
  if (!(m.alpha > 0 && m.alpha < 1) || !(m.delta > 0) || !(m.s > 0 && m.s < 1) || !(m.A > 0)) throw new Error('Solow parameters need 0 < s < 1, delta > 0, 0 < alpha < 1, A > 0');
  const kStar = solowKStar(m);
  const [k0, setK0] = useState(() => num(params, 'k0', kStar / 4));
  const [n, setN] = useState(0);
  const [running, setRunning] = useState(false);
  const [acc, setAcc] = useState(0);
  const nMax = 200;

  // The view is set by the first steady state and grows only when the steady state leaves it.
  const [xMax, setXMax] = useState(() => niceUp(Math.max(kStar, k0) * 2.2));
  const need = Math.max(kStar, k0) * 1.15;
  if (need > xMax) setXMax(niceUp(need * 1.6));
  const yMax = solowY(m, xMax) * 1.1;
  // A little room below zero so the k axis has its tick labels underneath.
  const view: [number, number, number, number] = [0, xMax, -yMax * 0.07, yMax];

  const path = useMemo(() => {
    const out = [k0];
    for (let i = 0; i < nMax; i++) out.push(solowNext(m, out[out.length - 1]));
    return out;
  }, [k0, m]);
  const kn = path[n];
  const yn = solowY(m, kn);
  const growth = n > 0 ? 100 * (solowY(m, kn) / solowY(m, path[n - 1]) - 1) : NaN;
  const yStar = solowY(m, kStar);

  useAnimation(running, (dt) => {
    const a = acc + dt;
    if (a >= 0.12) {
      setAcc(0);
      setN((x) => {
        if (x + 1 >= nMax) setRunning(false);
        return Math.min(nMax, x + 1);
      });
    } else setAcc(a);
  });

  const fy = useMemo(() => (k: number) => solowY(m, k), [m]);
  const fi = useMemo(() => (k: number) => m.s * solowY(m, k), [m]);
  const fd = useMemo(() => (k: number) => m.delta * k, [m]);
  const set = (patch: Partial<Solow>) => (setRunning(false), setM((x) => ({ ...x, ...patch })));
  const labK = xMax * 0.9;

  return (
    <>
      <Plot view={view} aspect={0.62} xLabel="capital per worker k" yLabel="per worker" yTickFormat={(v) => (v < 0 ? '' : fmt(v))} label="Solow diagram: output, investment and depreciation per worker">
        <FnPath f={fy} color="var(--plot-1)" />
        <FnPath f={fi} color="var(--plot-3)" />
        <FnPath f={fd} color="var(--plot-2)" />
        <Label x={labK} y={fy(labK)} dx={-4} dy={-8} anchor="end" color="var(--plot-1)" weight={600}>
          output y = A k^α
        </Label>
        <Label x={labK} y={fi(labK)} dx={-4} dy={16} anchor="end" color="var(--plot-3)" weight={600}>
          investment s·y
        </Label>
        <Label x={Math.min(labK, (yMax * 0.85) / m.delta)} y={fd(Math.min(labK, (yMax * 0.85) / m.delta))} dx={-6} dy={-8} anchor="end" color="var(--plot-2)" weight={600}>
          depreciation δk
        </Label>
        <Segment x1={kStar} y1={0} x2={kStar} y2={yStar} dash="4 3" width={1.25} />
        <Dot x={kStar} y={fi(kStar)} r={5} color="var(--plot-2)" />
        <Label x={kStar} y={0} dx={4} dy={-6} weight={600}>
          k*
        </Label>
        {n > 0 && path.slice(0, n + 1).map((k, i) => <Dot key={i} x={k} y={0} r={2.5} color="var(--plot-4)" />)}
        <Segment x1={kn} y1={fd(kn)} x2={kn} y2={fi(kn)} color="var(--plot-4)" width={3} />
        <Dot x={kn} y={yn} r={4} color="var(--plot-4)" />
        <Draggable x={kn} y={0} onChange={(x) => (setRunning(false), setK0(Math.max(xMax * 0.005, Math.min(xMax, x))), setN(0))} constrain={(x) => [x, 0]} color="var(--plot-4)" label="Starting capital per worker" step={xMax / 100} />
      </Plot>
      <div className="text-xs text-ink-3">The orange bar is investment minus depreciation at today's k: when it points up, capital grows. Drag the orange point on the axis to choose where k starts.</div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button primary onClick={() => (n >= nMax ? (setN(0), setRunning(true)) : setRunning((r) => !r))}>
          {running ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={() => (setRunning(false), setN((x) => Math.min(nMax, x + 1)))} disabled={n >= nMax}>
          Step
        </Button>
        <Button onClick={() => (setRunning(false), setN(0))} disabled={n === 0}>
          Reset
        </Button>
        <span className="font-mono text-xs text-ink-2">year t = {n}</span>
      </div>
      <Controls cols={3}>
        <Readout label="Steady state k*" value={fmt(kStar, 4)} tone="var(--plot-2)" />
        <Readout label="Output y* = A (k*)^α" value={fmt(yStar, 4)} tone="var(--plot-1)" />
        <Readout label="Consumption c* = (1 − s) y*" value={fmt((1 - m.s) * yStar, 4)} />
        <Readout label={`k in year ${n}`} value={fmt(kn, 4)} tone="var(--plot-4)" />
        <Readout label={`y in year ${n}`} value={fmt(yn, 4)} />
        <Readout label="Growth of y this year" value={Number.isFinite(growth) ? `${fmt(growth, 3)}%` : '—'} />
      </Controls>
      <Controls cols={2}>
        <Slider label="Saving rate s" value={m.s} min={0.05} max={0.6} step={0.01} onChange={(v) => set({ s: v })} />
        <Slider label="Depreciation rate δ" value={m.delta} min={0.02} max={0.12} step={0.005} onChange={(v) => set({ delta: v })} />
        <Slider label="Capital share α" value={m.alpha} min={0.2} max={0.5} step={0.01} onChange={(v) => set({ alpha: v })} />
        <Slider label="Productivity A" value={m.A} min={0.5} max={2} step={0.05} onChange={(v) => set({ A: v })} />
      </Controls>
      {Math.abs(m.s - m.alpha) < 0.005 && <Note tone="good">s = α: in this model that saving rate gives the highest steady-state consumption (the golden rule).</Note>}
    </>
  );
}

/** Names at the right end of the two paths, kept apart and inside the plot. */
function EndLabels({ x, ya, yb, names }: { x: number; ya: number; yb: number; names: string[] }) {
  const { sx, sy, height } = usePlot();
  const px = sx(x) - 6;
  let a = sy(ya) - 8;
  let b = sy(yb) - 8;
  // Keep the labels at least 16 px apart, and inside the plot.
  if (Math.abs(a - b) < 16) {
    if (a <= b) b = a + 16;
    else a = b + 16;
  }
  a = Math.min(height - 22, Math.max(14, a));
  b = Math.min(height - 22, Math.max(14, b));
  if (Math.abs(a - b) < 16) {
    if (a <= b) a = b - 16;
    else b = a - 16;
  }
  const style = { paintOrder: 'stroke' as const, stroke: 'var(--color-surface)', strokeWidth: 3, strokeLinejoin: 'round' as const };
  return (
    <g fontSize={12} fontWeight={600} textAnchor="end">
      <text x={px} y={a} fill="var(--plot-1)" style={style}>
        {names[0]}
      </text>
      <text x={px} y={b} fill="var(--plot-2)" style={style}>
        {names[1]}
      </text>
    </g>
  );
}

function niceUp(v: number): number {
  const st = niceStep(v, 4);
  return Math.ceil(v / st) * st;
}
