/**
 * ad-as: aggregate demand, short-run and long-run aggregate supply. Shift the curves with
 * sliders or pick a shock preset, then Step or Play to watch expectations (the cost level W that
 * positions SRAS) adjust until output returns to potential. "Close the gap" shifts AD the way a
 * stabilisation policy would.
 *
 * Model (price level P vertical, real GDP Y horizontal, potential normalised to 100):
 *   AD    P = p0 + (100 + adShift - Y) / m
 *   SRAS  P = W + s (Y - Y*)       Y* = 100 + lrShift
 *   LRAS  Y = Y*
 *   each period W <- W + lambda (P - W)
 *
 * Params:
 *   preset    "none" | "demand-fall" | "demand-boom" | "supply-shock" | "policy" | "growth"   default "none"
 *             (policy = a demand fall, then AD is shifted back at the current W after `lag` steps)
 *   adShift   number  initial AD shift (output units)          default 0 (preset overrides)
 *   cost      number  initial shift of SRAS (W - p0)            default 0 (preset overrides)
 *   lrShift   number  initial LRAS shift                        default 0
 *   m         number  AD: output demanded per unit fall in P    default 1
 *   s         number  SRAS slope                                default 0.5
 *   lambda    number  share of the gap between P and W closed each period, in (0, 1]   default 0.35
 *   lag       number  steps before the policy preset acts       default 2
 *   p0        number  baseline price level                      default 100
 *   showLambda boolean show the adjustment-speed slider          default true
 *   title     string                                            default "Aggregate demand and aggregate supply"
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Dot, FnPath, Label, Plot, Segment, Arrow } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { useAnimation, useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { adAsEquilibrium, adAsLongRun, adAsStep, adP, adShiftToCloseGap, srasP, type AdAsSlopes, type AdAsState } from '../kit/econ-macro';

const PRESETS = ['none', 'demand-fall', 'demand-boom', 'supply-shock', 'policy', 'growth'] as const;
type Preset = (typeof PRESETS)[number];

const PRESET_LABEL: Record<Preset, string> = {
  none: 'Long-run equilibrium',
  'demand-fall': 'Demand falls',
  'demand-boom': 'Demand boom',
  'supply-shock': 'Supply shock',
  policy: 'Demand falls + policy',
  growth: 'Productivity rises',
};

function presetState(p: Preset, p0: number, fallback: AdAsState): AdAsState {
  switch (p) {
    case 'demand-fall':
    case 'policy':
      return { adShift: -12, lrShift: 0, w: p0 };
    case 'demand-boom':
      return { adShift: 10, lrShift: 0, w: p0 };
    case 'supply-shock':
      return { adShift: 0, lrShift: 0, w: p0 + 10 };
    case 'growth':
      return { adShift: 0, lrShift: 8, w: p0 };
    default:
      return fallback;
  }
}

const AD = 'var(--plot-1)';
const SRAS = 'var(--plot-2)';
const LRAS = 'var(--plot-3)';

export default function AdAs({ params }: WidgetProps) {
  const p0 = num(params, 'p0', 100);
  const k: AdAsSlopes = { m: num(params, 'm', 1), s: num(params, 's', 0.5), p0 };
  if (!(k.m > 0) || !(k.s > 0)) throw new Error('parameters "m" and "s" must be positive');
  const lambda0 = num(params, 'lambda', 0.35);
  if (!(lambda0 > 0 && lambda0 <= 1)) throw new Error('parameter "lambda" must be in (0, 1]');
  const lag = Math.max(1, Math.round(num(params, 'lag', 2)));
  const preset0 = oneOf(params, 'preset', PRESETS, 'none');
  const showLambda = bool(params, 'showLambda', true);
  const custom: AdAsState = { adShift: num(params, 'adShift', 0), lrShift: num(params, 'lrShift', 0), w: p0 + num(params, 'cost', 0) };
  const baseline: AdAsState = { adShift: 0, lrShift: 0, w: p0 };

  const [preset, setPreset] = useState<Preset>(preset0);
  const [st, setSt] = useState<AdAsState>(() => presetState(preset0, p0, custom));
  const [t, setT] = useState(0);
  const [trail, setTrail] = useState<[number, number][]>([]);
  const [lambda, setLambda] = useState(lambda0);
  const [running, setRunning] = useState(false);
  const [acc, setAcc] = useState(0);
  const [policyDone, setPolicyDone] = useState(false);

  const eq = adAsEquilibrium(st, k);
  const lr = adAsLongRun(st, k);
  const start = adAsEquilibrium(baseline, k);

  const settled = Math.abs(eq.gap) < 0.02 && Math.abs(eq.p - st.w) < 0.02;
  const doStep = () => {
    let next = adAsStep(st, k, lambda);
    let done = policyDone;
    if (preset === 'policy' && !done && t + 1 >= lag) {
      next = { ...next, adShift: adShiftToCloseGap(next, k) };
      done = true;
    }
    setTrail((tr) => [...tr, [eq.y, eq.p] as [number, number]].slice(-60));
    setSt(next);
    setPolicyDone(done);
    setT(t + 1);
  };

  useAnimation(running, (dt) => {
    const a = acc + dt;
    if (a >= 0.6) {
      setAcc(0);
      if (settled && !(preset === 'policy' && !policyDone)) setRunning(false);
      else doStep();
    } else setAcc(a);
  });

  const reset = (p: Preset) => {
    setRunning(false);
    setPreset(p);
    setSt(presetState(p, p0, p === preset0 ? custom : baseline));
    setT(0);
    setTrail([]);
    setPolicyDone(false);
  };
  const edit = (patch: Partial<AdAsState>) => {
    setRunning(false);
    setSt((s) => ({ ...s, ...patch }));
    setTrail([]);
  };

  const view: [number, number, number, number] = [70, 130, 70, 135];
  const [boxRef, box] = useElementSize<HTMLDivElement>();
  const narrow = (box.width || 640) < 480;
  const adF = useMemo(() => (y: number) => adP(st, k, y), [st.adShift, k.m, p0]); // eslint-disable-line react-hooks/exhaustive-deps
  const srF = useMemo(() => (y: number) => srasP(st, k, y), [st.w, st.lrShift, k.s]); // eslint-disable-line react-hooks/exhaustive-deps
  const ad0 = useMemo(() => (y: number) => adP(baseline, k, y), [k.m, p0]); // eslint-disable-line react-hooks/exhaustive-deps
  const sr0 = useMemo(() => (y: number) => srasP(baseline, k, y), [k.s, p0]); // eslint-disable-line react-hooks/exhaustive-deps

  const moved = st.adShift !== 0 || st.lrShift !== 0 || Math.abs(st.w - p0) > 1e-9;
  const gapTone = eq.gap < -0.05 ? SRAS : eq.gap > 0.05 ? 'var(--plot-4)' : LRAS;
  const status =
    Math.abs(eq.gap) < 0.05
      ? Math.abs(eq.p - st.w) < 0.05
        ? 'Long-run equilibrium: output is at potential and expectations match the price level.'
        : 'Output is at potential.'
      : eq.gap < 0
        ? 'Recessionary gap: output below potential, unemployment above its natural rate. Press Step: expected prices and wages fall, so SRAS shifts down.'
        : 'Inflationary gap: output above potential. Press Step: expected prices and wages rise, so SRAS shifts up.';

  // Label positions, kept inside the view.
  const yLabAD = Math.min(127, Math.max(76, 100 + st.adShift + k.m * (p0 - 78)));
  const yLabSR = Math.min(127, Math.max(76, 100 + st.lrShift + (128 - st.w) / k.s));

  return (
    <Frame title={str(params, 'title', 'Aggregate demand and aggregate supply')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Segmented label="Scenario" options={PRESETS.map((p) => ({ value: p, label: PRESET_LABEL[p] }))} value={preset} onChange={reset} />
      <div ref={boxRef}>
      <Plot view={view} aspect={0.7} xLabel={narrow ? 'Y' : 'Real GDP, Y'} yLabel={narrow ? 'P' : 'Price level, P'} xStep={10} yStep={10} label="AD, SRAS and LRAS with the short-run equilibrium">
        {moved && (
          <>
            <FnPath f={ad0} color={AD} width={1.5} dash="5 4" opacity={0.45} />
            <FnPath f={sr0} color={SRAS} width={1.5} dash="5 4" opacity={0.45} />
          </>
        )}
        <Segment x1={eq.ystar} y1={view[2]} x2={eq.ystar} y2={view[3]} color={LRAS} width={2.5} />
        <Label x={eq.ystar} y={view[3]} dx={5} dy={14} color={LRAS} weight={600}>
          LRAS
        </Label>
        <FnPath f={adF} color={AD} />
        <FnPath f={srF} color={SRAS} />
        <Label x={yLabAD} y={adF(yLabAD)} dx={-4} dy={-8} anchor="end" color={AD} weight={600}>
          AD
        </Label>
        <Label x={yLabSR} y={srF(yLabSR)} dx={-4} dy={-8} anchor="end" color={SRAS} weight={600}>
          SRAS
        </Label>
        {trail.map(([x, y], i) => (
          <Dot key={i} x={x} y={y} r={3} color="var(--plot-axis)" />
        ))}
        {trail.length > 0 && <Arrow x1={trail[trail.length - 1][0]} y1={trail[trail.length - 1][1]} x2={eq.y} y2={eq.p} color="var(--plot-axis)" width={1.5} head={7} />}
        {moved && <Dot x={start.y} y={start.p} r={4} hollow color="var(--plot-axis)" />}
        {Math.abs(lr.y - eq.y) > 0.05 && <Dot x={lr.y} y={lr.p} r={4.5} hollow color={LRAS} />}
        <Segment x1={view[0]} y1={eq.p} x2={eq.y} y2={eq.p} dash="3 3" width={1} />
        <Segment x1={eq.y} y1={view[2]} x2={eq.y} y2={eq.p} dash="3 3" width={1} />
        <Dot x={eq.y} y={eq.p} r={6} color="var(--color-ink)" />
        <Label x={eq.y} y={eq.p} dx={8} dy={16} weight={600}>
          {`(${fmt(eq.y, 3)}, ${fmt(eq.p, 3)})`}
        </Label>
      </Plot>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button primary onClick={() => setRunning((r) => !r)}>
          {running ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={() => (setRunning(false), doStep())}>Step</Button>
        <Button onClick={() => reset(preset)}>Reset</Button>
        <Button onClick={() => edit({ adShift: adShiftToCloseGap(st, k) })} disabled={Math.abs(eq.gap) < 0.05} title="Shift AD so that the short-run equilibrium is on LRAS at today's expectations">
          Policy: close the gap
        </Button>
        <span className="font-mono text-xs text-ink-2">period t = {t}</span>
      </div>
      <Controls cols={3}>
        <Readout label="Real GDP Y" value={fmt(eq.y, 4)} />
        <Readout label="Potential Y*" value={fmt(eq.ystar, 4)} tone={LRAS} />
        <Readout label="Output gap (Y − Y*)/Y*" value={`${eq.gap >= 0 ? '+' : ''}${fmt(eq.gap, 3)}%`} tone={gapTone} />
        <Readout label="Price level P" value={fmt(eq.p, 4)} />
        <Readout label="Expected price level W" value={fmt(st.w, 4)} tone={SRAS} />
        <Readout label="P since start" value={`${eq.p >= start.p ? '+' : ''}${fmt((100 * (eq.p - start.p)) / start.p, 3)}%`} />
      </Controls>
      <Note tone={Math.abs(eq.gap) < 0.05 ? 'good' : 'info'}>{status}</Note>
      <Controls cols={2}>
        <Slider label="AD shift (spending, money, confidence)" value={st.adShift} min={-20} max={20} step={0.5} onChange={(v) => edit({ adShift: v })} />
        <Slider label="SRAS shift: expected prices and costs W − 100" value={st.w - p0} min={-15} max={20} step={0.5} onChange={(v) => edit({ w: p0 + v })} />
        <Slider label="LRAS shift (potential output)" value={st.lrShift} min={-10} max={15} step={0.5} onChange={(v) => edit({ lrShift: v })} />
        {showLambda && <Slider label="Speed of adjustment λ per period" value={lambda} min={0.05} max={1} step={0.05} onChange={setLambda} />}
      </Controls>
    </Frame>
  );
}
