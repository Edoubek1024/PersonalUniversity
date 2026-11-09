/**
 * keynesian-cross: planned expenditure AE = C + I + G + NX against the 45-degree line. A change
 * in autonomous spending (or in lump-sum taxes) shifts AE; Step or Play walks through the rounds
 * of spending as a staircase from the old equilibrium to the new one, with a bar for each round,
 * so you can watch the sum approach the multiplier 1 / (1 - MPC(1 - t)).
 *
 * Model: C = C0 + MPC (Y - T), T = T0 + t Y, so
 *   AE(Y) = (C0 + I + G + NX - MPC T0) + MPC (1 - t) Y,   Y* = intercept / (1 - MPC (1 - t)).
 *
 * Params:
 *   mpc       number   marginal propensity to consume, in (0, 1)        default 0.75
 *   auto      number   autonomous spending C0 + I + G + NX               default 800
 *   taxes     "none" | "lump-sum" | "proportional"                       default "none"
 *   t0        number   lump-sum taxes T0 (lump-sum mode)                  default 200
 *   rate      number   proportional tax rate t (proportional mode)       default 0.2
 *   dA        number   change in autonomous spending (e.g. ΔG)           default 100
 *   dT        number   change in lump-sum taxes (lump-sum mode)          default 0
 *   rounds    number   rounds of spending available (2-40)               default 15
 *   taxModes  boolean  show the tax-mode switch                          default true
 *   zoom      boolean  start zoomed on the two equilibria (a switch toggles it)  default false
 *   unit      string   unit suffix for readouts                          default "" (e.g. "bn")
 *   title     string                                                     default "The Keynesian cross and the multiplier"
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Dot, FnPath, Label, Plot, Poly, Rect, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { useAnimation, useElementSize } from '../kit/hooks';
import { clamp, fmt, niceStep } from '../kit/num';
import { ae, aeSlope, crossEquilibrium, multiplier, rounds as spendRounds, type Cross } from '../kit/econ-macro';

const TAXES = ['none', 'lump-sum', 'proportional'] as const;
type Taxes = (typeof TAXES)[number];

const OLD = 'var(--plot-1)';
const NEW = 'var(--plot-2)';
const STAIR = 'var(--plot-4)';
const ASPECT = 0.72;

export default function KeynesianCross({ params }: WidgetProps) {
  const mpc0 = num(params, 'mpc', 0.75);
  if (!(mpc0 > 0 && mpc0 < 1)) throw new Error('parameter "mpc" must be between 0 and 1');
  const nMax = Math.round(num(params, 'rounds', 15));
  if (nMax < 2 || nMax > 40) throw new Error('parameter "rounds" must be between 2 and 40');
  const unit = str(params, 'unit', '');
  const u = unit ? ` ${unit}` : '';
  const taxModes = bool(params, 'taxModes', true);

  const [mpc, setMpc] = useState(mpc0);
  const [auto, setAuto] = useState(num(params, 'auto', 800));
  const [taxes, setTaxes] = useState<Taxes>(oneOf(params, 'taxes', TAXES, 'none'));
  const [t0, setT0] = useState(num(params, 't0', 200));
  const [rate, setRate] = useState(num(params, 'rate', 0.2));
  const [dA, setDA] = useState(num(params, 'dA', 100));
  const [dT, setDT] = useState(num(params, 'dT', 0));
  const [k, setK] = useState(0);
  const [zoom, setZoom] = useState(bool(params, 'zoom', false));
  const [running, setRunning] = useState(false);
  const [acc, setAcc] = useState(0);

  const x0: Cross = { auto, c: mpc, t0: taxes === 'lump-sum' ? t0 : 0, t: taxes === 'proportional' ? rate : 0 };
  const dTax = taxes === 'lump-sum' ? dT : 0;
  const x1: Cross = { ...x0, auto: auto + dA, t0: x0.t0 + dTax };
  const y0 = crossEquilibrium(x0);
  const y1 = crossEquilibrium(x1);
  const r = useMemo(() => spendRounds(x0, dA, dTax, nMax), [mpc, rate, taxes, dA, dTax, nMax]); // eslint-disable-line react-hooks/exhaustive-deps
  const sumK = r.slice(0, k).reduce((s, v) => s + v, 0);
  const mult = multiplier(x0);

  useAnimation(running, (dt) => {
    const a = acc + dt;
    if (a >= 0.55) {
      setAcc(0);
      setK((kk) => {
        if (kk + 1 >= nMax) setRunning(false);
        return Math.min(nMax, kk + 1);
      });
    } else setAcc(a);
  });

  // Whole view: from the origin, fitting both equilibria, changing in steps so it does not jitter.
  // Zoom view: a window around the two equilibria so the rounds are visible. Either way the
  // x-range is set from the plot's pixel shape so that the 45-degree line really is at 45 degrees.
  const [boxRef, box] = useElementSize<HTMLDivElement>();
  const pw = box.width || 640;
  const ph = Math.round(clamp(pw * ASPECT, 220, 460));
  let lo: number;
  let hi: number;
  if (zoom) {
    const a = Math.min(y0, y1);
    const b = Math.max(y0, y1);
    const d = Math.max(b - a, 0.05 * Math.max(y0, 1));
    const st = niceStep(d * 2.2, 5);
    lo = Math.max(0, Math.floor((a - 0.55 * d) / st) * st);
    hi = Math.ceil((b + 0.55 * d) / st) * st;
  } else {
    const top = Math.max(y0, y1, 1) * 1.3;
    const st = niceStep(top, 5);
    lo = 0;
    hi = Math.ceil(top / st) * st;
  }
  const view: [number, number, number, number] = [lo, lo + ((hi - lo) * pw) / ph, lo, hi];
  const narrow = pw < 480;
  const f0 = useMemo(() => (y: number) => ae(x0, y), [auto, mpc, x0.t0, x0.t]); // eslint-disable-line react-hooks/exhaustive-deps
  const f1 = useMemo(() => (y: number) => ae(x1, y), [auto, dA, mpc, x1.t0, x1.t]); // eslint-disable-line react-hooks/exhaustive-deps

  // Staircase: (Y_j, Y_j) -> (Y_j, Y_j + r_j) -> (Y_j + r_j, Y_j + r_j).
  const stair: [number, number][] = [[y0, y0]];
  let yc = y0;
  for (let j = 0; j < k; j++) {
    stair.push([yc, yc + r[j]]);
    yc += r[j];
    stair.push([yc, yc]);
  }
  const changed = Math.abs(y1 - y0) > 1e-9;
  // Put each AE label where its line is comfortably inside the view.
  const labAt = (x: Cross) => {
    const target = hi - (hi - lo) * 0.2;
    const xs = (target - (ae(x, 0))) / aeSlope(x);
    return clamp(xs, view[0] + (view[1] - view[0]) * 0.1, view[0] + (view[1] - view[0]) * 0.9);
  };
  const lab0 = labAt(x0);
  const lab1 = labAt(x1);
  const diagLab = hi - (hi - lo) * 0.06;
  const fmtU = (v: number) => `${v >= 0 ? '' : '−'}${fmt(Math.abs(v), 4)}${u}`;

  const bars = r.map((v, i) => ({ i, v }));
  const barMax = Math.max(1e-9, ...r.map((v) => Math.abs(v)));
  const neg = (r[0] ?? 0) < 0;

  const tSlope = aeSlope(x0);
  const taxMult = -mpc / (1 - tSlope);

  return (
    <Frame title={str(params, 'title', 'The Keynesian cross and the multiplier')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {taxModes && (
        <Segmented
          label="Taxes"
          options={[
            { value: 'none', label: 'No taxes' },
            { value: 'lump-sum', label: 'Lump-sum T' },
            { value: 'proportional', label: 'Proportional tY' },
          ]}
          value={taxes}
          onChange={(v) => (setTaxes(v), setK(0))}
        />
      )}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Segmented
          label="View"
          options={[
            { value: 'whole', label: 'Whole diagram' },
            { value: 'zoom', label: 'Zoom on the change' },
          ]}
          value={zoom ? 'zoom' : 'whole'}
          onChange={(v) => setZoom(v === 'zoom')}
        />
      </div>
      <div ref={boxRef}>
      <Plot view={view} aspect={ASPECT} xLabel="Y" yLabel={narrow ? 'AE' : 'Planned expenditure AE'} label="Keynesian cross: planned expenditure against output">
        <FnPath f={(y) => y} color="var(--plot-axis)" width={1.5} />
        <Label x={diagLab} y={diagLab} dx={-8} dy={-6} anchor="end" color="var(--plot-text)">
          45°: AE = Y
        </Label>
        <FnPath f={f0} color={OLD} width={changed ? 2 : 2.5} dash={changed ? '6 4' : undefined} />
        {changed && <FnPath f={f1} color={NEW} />}
        <Label x={lab0} y={f0(lab0)} dx={6} dy={16} color={OLD} weight={600}>
          AE₀
        </Label>
        {changed && (
          <Label x={lab1} y={f1(lab1)} dx={-6} dy={-8} anchor="end" color={NEW} weight={600}>
            AE₁
          </Label>
        )}
        <Segment x1={y0} y1={lo} x2={y0} y2={y0} dash="3 3" width={1} />
        {changed && <Segment x1={y1} y1={lo} x2={y1} y2={y1} dash="3 3" width={1} />}
        {k > 0 && <Poly points={stair} color={STAIR} width={2.25} />}
        <Dot x={y0} y={y0} color={OLD} r={5.5} />
        {changed && <Dot x={y1} y={y1} color={NEW} r={5.5} />}
        <Label x={y0} y={lo} dx={y1 < y0 ? 4 : -4} anchor={y1 < y0 ? 'start' : 'end'} dy={-22} color={OLD} weight={600}>
          Y₀
        </Label>
        {changed && (
          <Label x={y1} y={lo} dx={y1 < y0 ? -4 : 4} anchor={y1 < y0 ? 'end' : 'start'} dy={-22} color={NEW} weight={600}>
            Y₁
          </Label>
        )}
        {k > 0 && <Dot x={yc} y={yc} color={STAIR} r={4} />}
      </Plot>
      </div>
      {changed ? (
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            <Button primary onClick={() => (k >= nMax ? (setK(0), setRunning(true)) : setRunning((x) => !x))}>
              {running ? 'Pause' : 'Play rounds'}
            </Button>
            <Button onClick={() => (setRunning(false), setK((kk) => Math.min(nMax, kk + 1)))} disabled={k >= nMax}>
              Next round
            </Button>
            <Button onClick={() => (setRunning(false), setK(0))} disabled={k === 0}>
              Reset
            </Button>
            <span className="font-mono text-xs text-ink-2">rounds shown: {k}</span>
          </div>
          <Plot
            view={neg ? [0, nMax, -barMax * 1.15, barMax * 0.08] : [0, nMax, -barMax * 0.08, barMax * 1.15]}
            aspect={0.2}
            minHeight={90}
            maxHeight={130}
            grid={false}
            xStep={5}
            yTickFormat={() => ''}
            label="Spending added in each round"
          >
            {bars.map(({ i, v }) => (
              <Rect key={i} x={i + 0.12} y={Math.min(0, v)} w={0.76} h={Math.abs(v)} fill={i < k ? STAIR : 'var(--plot-axis)'} opacity={i < k ? 0.85 : 0.25} />
            ))}
            <Label x={nMax} y={neg ? -barMax * 1.15 : barMax * 1.15} dx={-4} dy={neg ? -4 : 13} anchor="end" size={11}>
              {neg ? 'spending lost in each round' : 'spending added in each round'}
            </Label>
          </Plot>
        </>
      ) : (
        <Note>Move ΔA{taxes === 'lump-sum' ? ' or ΔT' : ''} away from zero to shift AE and step through the rounds of spending.</Note>
      )}
      <Controls cols={3}>
        <Readout label="Y₀ (before)" value={fmtU(y0)} tone={OLD} />
        <Readout label="Y₁ (after)" value={fmtU(y1)} tone={NEW} />
        <Readout label="Total ΔY = Y₁ − Y₀" value={fmtU(y1 - y0)} />
        <Readout label={`ΔY after ${k} round${k === 1 ? '' : 's'}`} value={`${fmtU(sumK)}${changed ? ` (${fmt((100 * sumK) / (y1 - y0), 3)}%)` : ''}`} tone={STAIR} />
        <Readout label={taxes === 'proportional' ? 'Multiplier 1/(1 − MPC(1 − t))' : 'Multiplier 1/(1 − MPC)'} value={fmt(mult, 4)} />
        {taxes === 'lump-sum' ? <Readout label="Tax multiplier −MPC/(1 − MPC)" value={fmt(taxMult, 4)} /> : <Readout label="Slope of AE" value={fmt(tSlope, 4)} />}
      </Controls>
      <Controls cols={2}>
        <Slider label="MPC" value={mpc} min={0.5} max={0.9} step={0.01} onChange={(v) => setMpc(v)} />
        <Slider label={`Autonomous spending C₀ + I + G + NX${u}`} value={auto} min={200} max={1500} step={10} onChange={setAuto} />
        <Slider label={`Change in autonomous spending ΔA (e.g. ΔG)${u}`} value={dA} min={-200} max={200} step={5} onChange={(v) => (setDA(v), setK(0))} />
        {taxes === 'lump-sum' && <Slider label={`Lump-sum taxes T₀${u}`} value={t0} min={0} max={500} step={10} onChange={setT0} />}
        {taxes === 'lump-sum' && <Slider label={`Change in taxes ΔT${u}`} value={dT} min={-200} max={200} step={5} onChange={(v) => (setDT(v), setK(0))} />}
        {taxes === 'proportional' && <Slider label="Tax rate t" value={rate} min={0} max={0.4} step={0.01} onChange={(v) => (setRate(v), setK(0))} />}
      </Controls>
    </Frame>
  );
}
