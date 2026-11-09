/**
 * supply-demand: a linear market with price on the vertical axis. Shows the equilibrium, shaded
 * consumer and producer surplus, the point elasticities at the equilibrium, and five policy
 * modes: a per-unit tax, a per-unit subsidy, a price ceiling, a price floor, and a world price
 * with an import tariff. All labels and units are parameters, so the same widget draws loanable
 * funds, the money market or a foreign exchange market (turn surplus and elasticity off there).
 *
 * Curves (inverse form):  demand P = a - bQ,  supply P = c + dQ.
 *
 * Params:
 *   demand        [a, b]    demand intercept and slope (b > 0)               default [10, 0.1]
 *   supply        [c, d]    supply intercept and slope (d > 0)               default [2, 0.1]
 *   xLabel        string    horizontal axis name                             default "Quantity"
 *   yLabel        string    vertical axis name                               default "Price"
 *   demandLabel   string    label drawn on the demand curve                  default "D"
 *   supplyLabel   string    label drawn on the supply curve                  default "S"
 *   priceUnit     string    unit after prices, e.g. "USD" or "%"             default ""
 *   quantityUnit  string    unit after quantities, e.g. "units"              default ""
 *   surplusUnit   string    unit after areas (surplus, revenue, DWL)         default priceUnit
 *   csLabel       string    name of the buyers' surplus                      default "Consumer surplus"
 *   psLabel       string    name of the sellers' surplus                     default "Producer surplus"
 *   controls      string[]  sliders to show, any of "demandShift", "supplyShift",
 *                           "demandSlope", "supplySlope"                     default ["demandShift", "supplyShift"]
 *   shiftRange    number    shift sliders run from -shiftRange to +shiftRange (quantity units)
 *                                                                           default 40% of a/b
 *   demandShift   number    initial horizontal shift of demand               default 0
 *   supplyShift   number    initial horizontal shift of supply               default 0
 *   mode          string    "market" | "tax" | "subsidy" | "ceiling" | "floor" | "world" |
 *                           "externality"                                   default "market"
 *   modes         string[]  modes offered as tabs                            default [mode]
 *   tax           number    initial per-unit tax                             default 25% of (a - c)
 *   taxMax        number    top of the tax / subsidy / tariff sliders        default a - c
 *   taxOn         string    "sellers" | "buyers": which curve the tax shifts default "sellers"
 *   subsidy       number    initial per-unit subsidy                         default 25% of (a - c)
 *   ceiling       number    initial price ceiling                            default halfway between c and P*
 *   floor         number    initial price floor                              default halfway between P* and a
 *   worldPrice    number    initial world price                              default halfway between max(c, 0) and P*
 *   tariff        number    initial per-unit import tariff                   default 0
 *   externalCost  number    externality mode: external cost per unit (negative = external
 *                           benefit); the supply curve is private MC        default 25% of (a - c)
 *   corrective    number    externality mode: initial corrective tax per unit (negative =
 *                           subsidy)                                        default 0
 *   showSurplus   boolean   shade surplus, revenue and deadweight loss       default true
 *   showElasticity boolean  show point elasticities at the equilibrium       default true
 *   showOriginal  boolean   ghost the unshifted curves when shifted          default true
 *   view          [xMin, xMax, yMin, yMax]                                   default [0, 1.1 a/b, 0, 1.1 a]
 *   digits        number    significant digits in readouts                   default 3
 *   title, caption  strings
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, strArray, view as readView } from '../kit/params';
import { FnPath, Label, Plot, Segment, Dot } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { niceStep } from '../kit/num';
import { Area, AxisTitles, EC, EconLegend, EconReadouts, HBracket, YTag, withUnit, type LegendItem } from '../kit/econ-ui';
import { demandP, equilibrium, shifted, supplyP, withCeiling, withExternality, withFloor, withSubsidy, withTax, withWorldPrice, type Linear } from '../kit/econ-market';

const MODES = ['market', 'tax', 'subsidy', 'ceiling', 'floor', 'world', 'externality'] as const;
type Mode = (typeof MODES)[number];
const MODE_LABEL: Record<Mode, string> = { market: 'Market', tax: 'Tax', subsidy: 'Subsidy', ceiling: 'Price ceiling', floor: 'Price floor', world: 'World price', externality: 'Externality' };
const CONTROLS = ['demandShift', 'supplyShift', 'demandSlope', 'supplySlope'] as const;

function pair(p: Record<string, unknown>, key: string, def: [number, number]): [number, number] {
  const v = numArray(p, key, def);
  if (v.length !== 2) throw new Error(`parameter "${key}" should be [intercept, slope]`);
  if (!(v[1] > 0)) throw new Error(`parameter "${key}": the slope must be positive (write demand as P = a − bQ with b > 0)`);
  return [v[0], v[1]];
}

export default function SupplyDemand({ params }: WidgetProps) {
  const [a0, b0] = pair(params, 'demand', [10, 0.1]);
  const [c0, d0] = pair(params, 'supply', [2, 0.1]);
  if (!(a0 > c0)) throw new Error('parameters "demand" and "supply": the demand intercept a must exceed the supply intercept c, or nothing is ever traded');
  const xLabel = str(params, 'xLabel', 'Quantity');
  const yLabel = str(params, 'yLabel', 'Price');
  const dLab = str(params, 'demandLabel', 'D');
  const sLab = str(params, 'supplyLabel', 'S');
  const pu = str(params, 'priceUnit', '');
  const qu = str(params, 'quantityUnit', '');
  const au = str(params, 'surplusUnit', pu);
  const csLab = str(params, 'csLabel', 'Consumer surplus');
  const psLab = str(params, 'psLabel', 'Producer surplus');
  const digits = num(params, 'digits', 3);
  const controls = strArray(params, 'controls', ['demandShift', 'supplyShift']);
  for (const c of controls) if (!(CONTROLS as readonly string[]).includes(c)) throw new Error(`parameter "controls": unknown control "${c}" (use ${CONTROLS.join(', ')})`);
  const mode0 = oneOf(params, 'mode', MODES, 'market');
  const modes = strArray(params, 'modes', [mode0]);
  for (const m of modes) if (!(MODES as readonly string[]).includes(m)) throw new Error(`parameter "modes": unknown mode "${m}" (use ${MODES.join(', ')})`);
  const taxOn = oneOf(params, 'taxOn', ['sellers', 'buyers'] as const, 'sellers');
  const showSurplus = bool(params, 'showSurplus', true);
  const showElasticity = bool(params, 'showElasticity', true);
  const showOriginal = bool(params, 'showOriginal', true);
  const base0 = equilibrium({ a: a0, b: b0, c: c0, d: d0 });
  const qInt = a0 / b0;
  const v = readView(params, 'view', [0, qInt * 1.1, 0, a0 * 1.1]);
  const shiftRange = num(params, 'shiftRange', qInt * 0.4);
  const gap = a0 - c0;
  const taxMax = num(params, 'taxMax', gap);

  const [mode, setMode] = useState<Mode>(mode0);
  const [sD, setSD] = useState(num(params, 'demandShift', 0));
  const [sS, setSS] = useState(num(params, 'supplyShift', 0));
  const [b, setB] = useState(b0);
  const [d, setD] = useState(d0);
  const [tax, setTax] = useState(num(params, 'tax', gap * 0.25));
  const [sub, setSub] = useState(num(params, 'subsidy', gap * 0.25));
  const [ceil, setCeil] = useState(num(params, 'ceiling', (c0 + base0.p) / 2));
  const [floor, setFloor] = useState(num(params, 'floor', (base0.p + a0) / 2));
  const [pw, setPw] = useState(num(params, 'worldPrice', (Math.max(c0, 0) + base0.p) / 2));
  const [tariff, setTariff] = useState(num(params, 'tariff', 0));
  const [ext, setExt] = useState(num(params, 'externalCost', gap * 0.25));
  const [corr, setCorr] = useState(num(params, 'corrective', 0));

  // The slope sliders pivot each curve about its price intercept.
  const base: Linear = { a: a0, b, c: c0, d };
  const m = useMemo(() => shifted(base, sD, sS), [a0, b, c0, d, sD, sS]); // eslint-disable-line react-hooks/exhaustive-deps
  const eq = equilibrium(m);
  const isShifted = sD !== 0 || sS !== 0 || b !== b0 || d !== d0;

  const D = useMemo(() => (q: number) => demandP(m, q), [m]);
  const S = useMemo(() => (q: number) => supplyP(m, q), [m]);
  const D0 = useMemo(() => (q: number) => a0 - b0 * q, [a0, b0]);
  const S0 = useMemo(() => (q: number) => c0 + d0 * q, [c0, d0]);

  const shiftStep = niceStep(shiftRange, 50);
  const priceStep = niceStep(v[3] - v[2], 200);
  const pStep = niceStep(taxMax, 100);
  const ySpan = v[3] - v[2];
  const yLow = v[2] + ySpan * 0.07;
  const yHigh = v[2] + ySpan * 0.93;
  const xEnd = v[0] + (v[1] - v[0]) * 0.96;
  const dLabelQ = Math.min(xEnd, (m.a - yLow) / m.b);
  const sLabelQ = Math.min(xEnd, (yHigh - m.c) / m.d);
  const U = (x: number, unit: string) => withUnit(x, unit, digits);

  const legend: LegendItem[] = [
    { color: EC.demand, label: dLab === 'D' ? 'Demand' : dLab },
    { color: EC.supply, label: sLab === 'S' ? 'Supply' : sLab },
  ];
  if (mode === 'externality') {
    legend.push({ color: ext >= 0 ? EC.supply : EC.demand, label: ext >= 0 ? 'Social marginal cost' : 'Social marginal benefit', kind: 'dash' });
    if (showSurplus) legend.push({ color: EC.dwl, label: 'Deadweight loss', kind: 'box' });
  } else if (showSurplus) {
    legend.push({ color: EC.cs, label: csLab, kind: 'box' }, { color: EC.ps, label: psLab, kind: 'box' });
    if (mode === 'tax' || mode === 'world') legend.push({ color: EC.gov, label: mode === 'tax' ? 'Tax revenue' : 'Tariff revenue', kind: 'box' });
    if (mode === 'subsidy') legend.push({ color: EC.gov, label: 'Subsidy cost', kind: 'dash' });
    if (mode !== 'market') legend.push({ color: EC.dwl, label: 'Deadweight loss', kind: 'box' });
  }

  let shapes: ReactNode = null;
  let readouts: ReactNode = null;
  let note: ReactNode = null;
  let slider: ReactNode = null;
  const eqPoint = (q: number, p: number, color = 'var(--plot-text)') => (
    <>
      <Segment x1={q} y1={v[2]} x2={q} y2={p} color={color} dash="4 4" width={1.25} />
      <Segment x1={v[0]} y1={p} x2={q} y2={p} color={color} dash="4 4" width={1.25} />
    </>
  );

  if (mode === 'market') {
    shapes = (
      <>
        {showSurplus && eq.q > 0 && (
          <>
            <Area points={[[0, m.a], [eq.q, eq.p], [0, eq.p]]} fill={EC.cs} />
            <Area points={[[0, m.c], [eq.q, eq.p], [0, eq.p]]} fill={EC.ps} />
          </>
        )}
        {eqPoint(eq.q, eq.p)}
        <YTag y={eq.p} label="P*" color="var(--plot-text)" />
        <Dot x={eq.q} y={eq.p} color="var(--color-ink)" />
        <Label x={eq.q} y={eq.p} dx={8} dy={-8}>E</Label>
      </>
    );
    readouts = (
      <>
        <Readout label="Equilibrium quantity Q*" value={U(eq.q, qu)} />
        <Readout label="Equilibrium price P*" value={U(eq.p, pu)} />
        {showSurplus && <Readout label={csLab} value={U(eq.cs, au)} tone={EC.cs} />}
        {showSurplus && <Readout label={psLab} value={U(eq.ps, au)} tone={EC.ps} />}
        {showSurplus && <Readout label="Total surplus" value={U(eq.cs + eq.ps, au)} />}
        {showElasticity && <Readout label="Elasticity at E: demand / supply" value={`${U(eq.ed, '')} / ${U(eq.es, '')}`} />}
      </>
    );
  } else if (mode === 'tax' || mode === 'subsidy') {
    const isTax = mode === 'tax';
    const amt = isTax ? tax : sub;
    const o = isTax ? withTax(m, amt) : withSubsidy(m, amt);
    const hi = Math.max(o.pb, o.ps);
    const lo = Math.min(o.pb, o.ps);
    // The wedge drawn as a shifted curve: sellers' curve moves up by t (down by s), or buyers' down by t (up by s).
    const sign = isTax ? 1 : -1;
    const shiftedCurve = taxOn === 'sellers' ? (q: number) => S(q) + sign * amt : (q: number) => D(q) - sign * amt;
    const wedgeQ =
      taxOn === 'sellers'
        ? Math.max(v[0] + (v[1] - v[0]) * 0.1, Math.min(xEnd * 0.85, (yHigh - m.c - sign * amt) / m.d))
        : Math.max(v[0] + (v[1] - v[0]) * 0.1, Math.min(xEnd * 0.85, (m.a - sign * amt - (yLow + ySpan * 0.12)) / m.b));
    shapes = (
      <>
        {showSurplus && o.q > 0 && (
          <>
            <Area points={[[0, m.a], [o.q, o.pb], [0, o.pb]]} fill={EC.cs} />
            <Area points={[[0, m.c], [o.q, o.ps], [0, o.ps]]} fill={EC.ps} />
            {isTax ? (
              <Area points={[[0, lo], [o.q, lo], [o.q, hi], [0, hi]]} fill={EC.gov} opacity={0.38} />
            ) : (
              <>
                <Segment x1={0} y1={hi} x2={o.q} y2={hi} color={EC.gov} dash="5 3" width={1.75} />
                <Segment x1={o.q} y1={lo} x2={o.q} y2={hi} color={EC.gov} dash="5 3" width={1.75} />
                <Segment x1={0} y1={lo} x2={o.q} y2={lo} color={EC.gov} dash="5 3" width={1.75} />
              </>
            )}
            <Area points={isTax ? [[o.q, o.pb], [eq.q, eq.p], [o.q, o.ps]] : [[eq.q, eq.p], [o.q, o.ps], [o.q, o.pb]]} fill={EC.dwl} opacity={0.42} />
          </>
        )}
        <FnPath f={shiftedCurve} color={taxOn === 'sellers' ? EC.supply : EC.demand} dash="7 5" width={1.75} />
        <Label x={wedgeQ} y={shiftedCurve(wedgeQ)} dx={-6} dy={-8} anchor="end" color={taxOn === 'sellers' ? EC.supply : EC.demand} size={11}>
          {taxOn === 'sellers' ? `${sLab} ${isTax ? '+ t' : '− s'}` : `${dLab} ${isTax ? '− t' : '+ s'}`}
        </Label>
        <Dot x={eq.q} y={eq.p} color="var(--plot-text)" hollow r={4} />
        <Segment x1={o.q} y1={v[2]} x2={o.q} y2={hi} color="var(--plot-text)" dash="4 4" width={1.25} />
        <YTag y={o.pb} label="Pb" color={EC.demand} />
        <YTag y={o.ps} label="Ps" color={EC.supply} />
        <Dot x={o.q} y={o.pb} color={EC.demand} />
        <Dot x={o.q} y={o.ps} color={EC.supply} />
      </>
    );
    slider = isTax ? (
      <Slider label="Tax per unit t" value={tax} min={0} max={taxMax} step={pStep} onChange={setTax} format={(x) => U(x, pu)} />
    ) : (
      <Slider label="Subsidy per unit s" value={sub} min={0} max={taxMax} step={pStep} onChange={setSub} format={(x) => U(x, pu)} />
    );
    readouts = (
      <>
        <Readout label={`Quantity (was ${U(eq.q, '')})`} value={U(o.q, qu)} />
        <Readout label="Buyers pay Pb" value={U(o.pb, pu)} tone={EC.demand} />
        <Readout label="Sellers receive Ps" value={U(o.ps, pu)} tone={EC.supply} />
        {showSurplus && <Readout label={isTax ? 'Tax revenue' : 'Subsidy cost'} value={U(Math.abs(o.gov), au)} tone={EC.gov} />}
        {showSurplus && <Readout label="Deadweight loss" value={U(o.dwl, au)} tone={EC.dwl} />}
        <Readout label={isTax ? 'Share of tax borne by buyers' : 'Share of subsidy to buyers'} value={o.q > 0 ? `${Math.round(o.buyerShare * 100)}%` : '—'} />
        {showSurplus && <Readout label={csLab} value={U(o.cs, au)} tone={EC.cs} />}
        {showSurplus && <Readout label={psLab} value={U(o.ps_, au)} tone={EC.ps} />}
        {showElasticity && <Readout label="Elasticity at E: demand / supply" value={`${U(eq.ed, '')} / ${U(eq.es, '')}`} />}
      </>
    );
    note = (
      <Note>
        The {isTax ? 'tax' : 'subsidy'} is drawn as a shift of the {taxOn === 'sellers' ? 'supply' : 'demand'} curve, but the outcome is the same whichever side it is levied on: the side with the steeper curve (the less elastic side) {isTax ? 'bears' : 'receives'} more of it.
      </Note>
    );
  } else if (mode === 'ceiling' || mode === 'floor') {
    const isC = mode === 'ceiling';
    const pc = isC ? ceil : floor;
    const o = isC ? withCeiling(m, pc) : withFloor(m, pc);
    const q = o.q;
    shapes = (
      <>
        <Segment x1={v[0]} y1={pc} x2={v[1]} y2={pc} color={EC.gov} width={2.25} />
        <Label x={v[0] + (v[1] - v[0]) * 0.98} y={pc} dx={0} dy={-6} anchor="end" color={EC.gov} size={11}>
          {isC ? 'ceiling' : 'floor'}
        </Label>
        {showSurplus && q > 0 && o.binding && (
          <>
            {isC ? (
              <>
                <Area points={[[0, m.a], [q, D(q)], [q, pc], [0, pc]]} fill={EC.cs} />
                <Area points={[[0, Math.min(m.c, pc)], [q, pc], [0, pc]]} fill={EC.ps} />
                <Area points={[[q, D(q)], [eq.q, eq.p], [q, pc]]} fill={EC.dwl} opacity={0.42} />
              </>
            ) : (
              <>
                <Area points={[[0, m.a], [q, pc], [0, pc]]} fill={EC.cs} />
                <Area points={[[0, m.c], [q, S(q)], [q, pc], [0, pc]]} fill={EC.ps} />
                <Area points={[[q, pc], [eq.q, eq.p], [q, S(q)]]} fill={EC.dwl} opacity={0.42} />
              </>
            )}
          </>
        )}
        {showSurplus && !o.binding && eq.q > 0 && (
          <>
            <Area points={[[0, m.a], [eq.q, eq.p], [0, eq.p]]} fill={EC.cs} />
            <Area points={[[0, m.c], [eq.q, eq.p], [0, eq.p]]} fill={EC.ps} />
          </>
        )}
        {o.binding && <HBracket x1={o.qs} x2={o.qd} y={pc} above={!isC} label={isC ? 'shortage' : 'surplus'} color={EC.gov} />}
        {o.binding && (
          <>
            <Dot x={o.qs} y={pc} color={EC.supply} />
            <Dot x={o.qd} y={pc} color={EC.demand} />
            <Segment x1={q} y1={v[2]} x2={q} y2={pc} color="var(--plot-text)" dash="4 4" width={1.25} />
          </>
        )}
        <Dot x={eq.q} y={eq.p} color="var(--plot-text)" hollow={o.binding} r={o.binding ? 4 : 4.5} />
      </>
    );
    const lo = Math.max(0, v[2]);
    slider = isC ? (
      <Slider label="Price ceiling" value={ceil} min={lo} max={v[3]} step={priceStep} onChange={setCeil} format={(x) => U(x, pu)} />
    ) : (
      <Slider label="Price floor" value={floor} min={lo} max={v[3]} step={priceStep} onChange={setFloor} format={(x) => U(x, pu)} />
    );
    readouts = o.binding ? (
      <>
        <Readout label="Quantity demanded" value={U(o.qd, qu)} tone={EC.demand} />
        <Readout label="Quantity supplied" value={U(o.qs, qu)} tone={EC.supply} />
        <Readout label={isC ? 'Shortage' : 'Surplus (excess supply)'} value={U(Math.abs(o.qd - o.qs), qu)} tone={EC.gov} />
        {showSurplus && <Readout label={csLab} value={U(o.cs, au)} tone={EC.cs} />}
        {showSurplus && <Readout label={psLab} value={U(o.ps_, au)} tone={EC.ps} />}
        {showSurplus && <Readout label="Deadweight loss" value={U(o.dwl, au)} tone={EC.dwl} />}
      </>
    ) : (
      <>
        <Readout label="Equilibrium price P*" value={U(eq.p, pu)} />
        <Readout label="Quantity traded" value={U(eq.q, qu)} />
        <Readout label="Deadweight loss" value={U(0, au)} tone={EC.dwl} />
      </>
    );
    note = o.binding ? (
      <Note>
        {isC
          ? 'The surplus areas assume the scarce units go to the buyers who value them most. Queues, search costs or random allocation lose more than the triangle shown.'
          : 'The surplus areas assume only the lowest-cost sellers produce, and nothing is made that is not sold. Unsold output, or a government buying the surplus, costs more than the triangle shown.'}
      </Note>
    ) : (
      <Note>
        This {isC ? 'ceiling is above' : 'floor is below'} the equilibrium price of {U(eq.p, pu)}, so it does not bind: the market clears as if it were not there.
      </Note>
    );
  } else if (mode === 'externality') {
    const o = withExternality(m, ext, corr);
    const neg = ext >= 0;
    const socialD = (q: number) => D(q) + Math.max(0, -ext);
    const socialS = (q: number) => S(q) + Math.max(0, ext);
    const social = neg ? socialS : socialD;
    const socialColor = neg ? EC.supply : EC.demand;
    const lq = neg
      ? Math.max(v[0] + (v[1] - v[0]) * 0.1, Math.min(xEnd * 0.8, (yHigh - m.c - ext) / m.d))
      : Math.max(v[0] + (v[1] - v[0]) * 0.1, Math.min(xEnd * 0.8, (m.a - ext - (yLow + ySpan * 0.2)) / m.b));
    shapes = (
      <>
        {showSurplus && o.dwl > 1e-9 && <Area points={[[o.q, socialD(o.q)], [o.q, socialS(o.q)], [o.qOpt, socialS(o.qOpt)]]} fill={EC.dwl} opacity={0.42} />}
        {ext !== 0 && <FnPath f={social} color={socialColor} dash="7 5" width={2} />}
        {ext !== 0 && (
          <Label x={lq} y={social(lq)} dx={-6} dy={-8} anchor="end" color={socialColor} size={11} weight={600}>
            {neg ? 'Social MC' : 'Social MB'}
          </Label>
        )}
        <Dot x={o.qOpt} y={socialS(o.qOpt)} color="var(--plot-3)" r={5} hollow />
        <Label x={o.qOpt} y={socialS(o.qOpt)} dx={8} dy={-8} size={11} color="var(--plot-3)">efficient</Label>
        <Segment x1={o.q} y1={v[2]} x2={o.q} y2={Math.max(o.pb, o.ps)} color="var(--plot-text)" dash="4 4" width={1.25} />
        <Dot x={o.q} y={o.pb} color={EC.demand} />
        {corr !== 0 && <Dot x={o.q} y={o.ps} color={EC.supply} />}
        {corr === 0 && (
          <Label x={o.q} y={o.pb} dx={8} dy={14} size={11}>market</Label>
        )}
      </>
    );
    slider = (
      <>
        <Slider label="External cost per unit (negative = benefit)" value={ext} min={-taxMax} max={taxMax} step={pStep} onChange={setExt} format={(x) => U(x, pu)} />
        <Slider label="Corrective tax per unit (negative = subsidy)" value={corr} min={-taxMax} max={taxMax} step={pStep} onChange={setCorr} format={(x) => U(x, pu)} />
      </>
    );
    readouts = (
      <>
        <Readout label="Market quantity, no policy" value={U(o.qMarket, qu)} />
        <Readout label="Efficient quantity" value={U(o.qOpt, qu)} tone="var(--plot-3)" />
        <Readout label="Quantity with this policy" value={U(o.q, qu)} />
        {showSurplus && <Readout label="Deadweight loss now" value={U(o.dwl, au)} tone={EC.dwl} />}
        {showSurplus && <Readout label="Deadweight loss with no policy" value={U(o.dwlMarket, au)} />}
        {showSurplus && <Readout label={corr >= 0 ? 'Tax revenue' : 'Subsidy cost'} value={U(Math.abs(o.revenue), au)} tone={EC.gov} />}
      </>
    );
    note = (
      <Note>
        {ext === 0
          ? 'With no externality the market quantity is already efficient, and any tax or subsidy creates a deadweight loss.'
          : `The ${neg ? 'supply curve is private marginal cost; the dashed curve adds the external cost' : 'demand curve is private marginal benefit; the dashed curve adds the external benefit'}. A corrective ${neg ? 'tax' : 'subsidy'} equal to the external ${neg ? 'cost' : 'benefit'} per unit (${U(Math.abs(ext), pu)}) moves the market to the efficient quantity.`}
      </Note>
    );
  } else {
    const o = withWorldPrice(m, pw, tariff);
    const exporter = pw >= eq.p;
    const p = o.price;
    shapes = (
      <>
        {showSurplus && (
          <>
            <Area points={[[0, m.a], [o.qd, p], [0, p]]} fill={EC.cs} />
            {o.qs > 0 && <Area points={[[0, m.c], [o.qs, p], [0, p]]} fill={EC.ps} />}
            {!exporter && !o.prohibitive && tariff > 0 && (
              <>
                <Area points={[[o.qs, pw], [o.qd, pw], [o.qd, p], [o.qs, p]]} fill={EC.gov} opacity={0.38} />
                <Area points={[[o.qsFree, pw], [o.qs, p], [o.qs, pw]]} fill={EC.dwl} opacity={0.42} />
                <Area points={[[o.qd, pw], [o.qd, p], [o.qdFree, pw]]} fill={EC.dwl} opacity={0.42} />
              </>
            )}
            {!exporter && o.prohibitive && (
              <Area points={[[o.qsFree, pw], [eq.q, eq.p], [o.qdFree, pw]]} fill={EC.dwl} opacity={0.42} />
            )}
          </>
        )}
        <Segment x1={v[0]} y1={pw} x2={v[1]} y2={pw} color={EC.gov} width={2} dash={tariff > 0 && !exporter ? '6 4' : undefined} />
        <Label x={v[0] + (v[1] - v[0]) * 0.98} y={pw} dx={0} dy={14} anchor="end" color={EC.gov} size={11}>
          world price
        </Label>
        {tariff > 0 && !exporter && !o.prohibitive && (
          <>
            <Segment x1={v[0]} y1={p} x2={v[1]} y2={p} color={EC.gov} width={2} />
            <Label x={v[0] + (v[1] - v[0]) * 0.98} y={p} dx={0} dy={-6} anchor="end" color={EC.gov} size={11}>
              world + tariff
            </Label>
          </>
        )}
        {Math.abs(o.imports) > 1e-9 && <HBracket x1={o.qs} x2={o.qd} y={p} label={exporter ? 'exports' : 'imports'} color={EC.gov} above={exporter} />}
        <Dot x={o.qs} y={p} color={EC.supply} />
        <Dot x={o.qd} y={p} color={EC.demand} />
        <Dot x={eq.q} y={eq.p} color="var(--plot-text)" hollow r={4} />
        <Label x={eq.q} y={eq.p} dx={8} dy={-6} size={11}>no trade</Label>
      </>
    );
    slider = (
      <>
        <Slider label="World price" value={pw} min={Math.max(0, v[2])} max={v[3]} step={priceStep} onChange={setPw} format={(x) => U(x, pu)} />
        <Slider label="Import tariff per unit" value={tariff} min={0} max={taxMax} step={pStep} onChange={setTariff} format={(x) => U(x, pu)} />
      </>
    );
    readouts = (
      <>
        <Readout label="Domestic price" value={U(p, pu)} />
        <Readout label="Domestic quantity demanded / supplied" value={`${U(o.qd, '')} / ${U(o.qs, qu)}`} />
        <Readout label={exporter ? 'Exports' : 'Imports'} value={U(Math.abs(o.imports), qu)} tone={EC.gov} />
        {showSurplus && <Readout label={csLab} value={U(o.cs, au)} tone={EC.cs} />}
        {showSurplus && <Readout label={psLab} value={U(o.ps, au)} tone={EC.ps} />}
        {showSurplus && <Readout label="Tariff revenue" value={U(o.revenue, au)} tone={EC.gov} />}
        {showSurplus && <Readout label="Deadweight loss of tariff" value={U(o.dwl, au)} tone={EC.dwl} />}
        {showSurplus && <Readout label="Gains from free trade vs none" value={U(o.gainsFromTrade, au)} />}
      </>
    );
    note = exporter ? (
      <Note>The world price is above the no-trade price, so this country exports. An import tariff has no effect; domestic buyers lose surplus and producers gain more.</Note>
    ) : o.prohibitive ? (
      <Note tone="warn">The tariff is prohibitive: world price plus tariff is at or above the no-trade price, so imports stop and all the gains from trade are lost.</Note>
    ) : null;
  }

  const shiftControls = (
    <>
      {controls.includes('demandShift') && <Slider label={`Shift ${dLab === 'D' ? 'demand' : dLab} (right +)`} value={sD} min={-shiftRange} max={shiftRange} step={shiftStep} onChange={setSD} format={(x) => U(x, qu)} />}
      {controls.includes('supplyShift') && <Slider label={`Shift ${sLab === 'S' ? 'supply' : sLab} (right +)`} value={sS} min={-shiftRange} max={shiftRange} step={shiftStep} onChange={setSS} format={(x) => U(x, qu)} />}
      {controls.includes('demandSlope') && <Slider label="Demand slope b (steeper = less elastic)" value={b} min={b0 * 0.2} max={b0 * 4} step={b0 * 0.02} onChange={setB} />}
      {controls.includes('supplySlope') && <Slider label="Supply slope d (steeper = less elastic)" value={d} min={d0 * 0.2} max={d0 * 4} step={d0 * 0.02} onChange={setD} />}
    </>
  );

  return (
    <Frame title={str(params, 'title', 'Supply and demand')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && <Segmented label="Mode" options={modes.map((x) => ({ value: x as Mode, label: MODE_LABEL[x as Mode] }))} value={mode} onChange={setMode} />}
      <Plot view={v} label={`${yLabel} against ${xLabel}: demand and supply, ${MODE_LABEL[mode]}`}>
        {shapes}
        {showOriginal && isShifted && (
          <>
            <FnPath f={D0} color={EC.demand} dash="3 4" width={1.5} opacity={0.6} />
            <FnPath f={S0} color={EC.supply} dash="3 4" width={1.5} opacity={0.6} />
          </>
        )}
        <FnPath f={D} color={EC.demand} width={2.5} />
        <FnPath f={S} color={EC.supply} width={2.5} />
        <Label x={dLabelQ} y={D(dLabelQ)} dx={-4} dy={-8} anchor="end" color={EC.demand} weight={600}>
          {dLab}
        </Label>
        <Label x={sLabelQ} y={S(sLabelQ)} dx={-8} dy={4} anchor="end" color={EC.supply} weight={600}>
          {sLab}
        </Label>
        <AxisTitles x={xLabel} y={yLabel} />
      </Plot>
      <EconLegend items={legend} />
      {(slider || controls.length > 0) && (
        <Controls>
          {slider}
          {shiftControls}
        </Controls>
      )}
      <EconReadouts>{readouts}</EconReadouts>
      {note}
      {eq.q <= 0 && <Note tone="warn">The curves no longer cross at a positive quantity: at every price buyers will pay, sellers want more, so nothing is traded.</Note>}
    </Frame>
  );
}
