/**
 * cost-curves: a firm's cost curves from a cubic cost function, in two modes.
 *
 *   competitive  MC, ATC and AVC with a market price line. Shows the profit-maximising output
 *                (P = MC on the rising part of MC), the profit or loss rectangle, the shutdown
 *                price (min AVC) and the break-even price (min ATC).
 *   monopoly     demand, marginal revenue, MC and ATC. Shows the MR = MC output and price, the
 *                profit rectangle, consumer surplus and the deadweight loss against the
 *                efficient output where demand meets MC. Optional pricing rules: perfect price
 *                discrimination, and regulation at P = MC or at P = ATC.
 *
 *   TC(Q) = F + a1 Q + a2 Q^2 + a3 Q^3        demand  P = A - B Q
 *
 * Params:
 *   mode          "competitive" | "monopoly"                                default "competitive"
 *   modes         string[]   modes offered as tabs                          default [mode]
 *   cost          [F, a1, a2, a3]   fixed cost and variable-cost coefficients default [100, 20, -2, 0.1]
 *   price         number     initial market price (competitive)             default 1.15 x min ATC
 *   demand        [A, B]     monopoly demand intercept and slope            default [60, 1.5]
 *   demandSlider  boolean    a slider for the demand intercept A            default false
 *   pricing       string[]   monopoly pricing rules to offer: any of "single", "perfect",
 *                            "mc", "atc"                                    default ["single"]
 *   showAVC       boolean    draw AVC                                       default true
 *   showSupply    boolean    highlight the firm's short-run supply curve    default false
 *   showPrice     boolean    competitive mode: false hides the price and shows a quantity
 *                            slider with the costs at that output instead   default true
 *   quantity      number     initial output for the quantity slider         default the min-ATC output
 *   xLabel        string                                                    default "Quantity"
 *   yLabel        string                                                    default "Price, cost"
 *   priceUnit     string     unit after prices and money amounts            default ""
 *   quantityUnit  string                                                    default ""
 *   view          [xMin, xMax, yMin, yMax]                                  default fitted to the curves
 *   digits        number     significant digits in readouts                 default 3
 *   title, caption  strings
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, strArray, view as readView } from '../kit/params';
import { Dot, FnPath, Label, Plot, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { niceStep } from '../kit/num';
import { Area, AxisTitles, EconLegend, EconReadouts, YTag, withUnit, type LegendItem } from '../kit/econ-ui';
import {
  atc,
  avc,
  checkCost,
  competitiveChoice,
  demandPrice,
  efficientQ,
  mc,
  minATC,
  minAVC,
  monopolyOutcome,
  mr,
  tc,
  vc,
  type Cost,
  type Pricing,
} from '../kit/econ-cost';

const MODES = ['competitive', 'monopoly'] as const;
type Mode = (typeof MODES)[number];
const PRICINGS = ['single', 'perfect', 'mc', 'atc'] as const;
const PRICING_LABEL: Record<Pricing, string> = { single: 'Single price', perfect: 'Perfect price discrimination', mc: 'Regulated P = MC', atc: 'Regulated P = ATC' };

const C = { mc: 'var(--plot-2)', atc: 'var(--plot-1)', avc: 'var(--plot-5)', price: 'var(--plot-4)', profit: 'var(--plot-3)', loss: 'var(--plot-2)', demand: 'var(--plot-1)', mr: 'var(--plot-6)', matc: 'var(--plot-4)', cs: 'var(--plot-1)', dwl: 'var(--plot-6)' };

/** Points along y = top(q) from q0 to q1 and back along y = bottom(q), for a shaded region. */
function between(top: (q: number) => number, bottom: (q: number) => number, q0: number, q1: number, n = 60): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const q = q0 + ((q1 - q0) * i) / n;
    pts.push([q, top(q)]);
  }
  for (let i = n; i >= 0; i--) {
    const q = q0 + ((q1 - q0) * i) / n;
    pts.push([q, bottom(q)]);
  }
  return pts;
}

export default function CostCurves({ params }: WidgetProps) {
  const cv = numArray(params, 'cost', [100, 20, -2, 0.1]);
  if (cv.length !== 4) throw new Error('parameter "cost" should be [F, a1, a2, a3] for TC = F + a1 Q + a2 Q² + a3 Q³');
  const cost: Cost = { F: cv[0], a1: cv[1], a2: cv[2], a3: cv[3] };
  const mode0 = oneOf(params, 'mode', MODES, 'competitive');
  const modes = strArray(params, 'modes', [mode0]);
  for (const m of modes) if (!(MODES as readonly string[]).includes(m)) throw new Error(`parameter "modes": unknown mode "${m}" (use ${MODES.join(', ')})`);
  const dv = numArray(params, 'demand', [60, 1.5]);
  if (dv.length !== 2 || !(dv[0] > 0) || !(dv[1] > 0)) throw new Error('parameter "demand" should be [A, B] with A > 0 and B > 0 for P = A − BQ');
  const pricings = strArray(params, 'pricing', ['single']);
  for (const p of pricings) if (!(PRICINGS as readonly string[]).includes(p)) throw new Error(`parameter "pricing": unknown rule "${p}" (use ${PRICINGS.join(', ')})`);
  const showAVC = bool(params, 'showAVC', true);
  const showSupply0 = bool(params, 'showSupply', false);
  const showPrice = bool(params, 'showPrice', true);
  const demandSlider = bool(params, 'demandSlider', false);
  const pu = str(params, 'priceUnit', '');
  const qu = str(params, 'quantityUnit', '');
  const digits = num(params, 'digits', 3);
  const U = (x: number, unit: string) => withUnit(x, unit, digits);

  const shut = minAVC(cost);
  const be = minATC(cost);
  const naturalMonopoly = !Number.isFinite(be.q);

  // A default view that shows the U-shapes (competitive) or the demand curve (monopoly).
  const qFit = naturalMonopoly ? dv[0] / dv[1] : Math.max(be.q * 1.8, shut.q * 2, 1);
  const defView: [number, number, number, number] = modes.includes('monopoly')
    ? [0, (dv[0] / dv[1]) * 1.05, 0, dv[0] * 1.08]
    : [0, qFit, 0, Math.max(be.value * 2.2, mc(cost, qFit * 0.8) * 1.05)];
  const v = readView(params, 'view', defView);
  const err = checkCost(cost, v[1]);
  if (err) throw new Error(`parameter "cost": ${err}`);

  const [mode, setMode] = useState<Mode>(mode0);
  const [price, setPrice] = useState(num(params, 'price', Number.isFinite(be.value) ? be.value * 1.15 : (v[2] + v[3]) / 2));
  const [A, setA] = useState(dv[0]);
  const [pricing, setPricing] = useState<Pricing>(pricings[0] as Pricing);
  const [showSupply, setShowSupply] = useState(showSupply0);
  const [qAt, setQAt] = useState(num(params, 'quantity', Number.isFinite(be.q) ? be.q : v[1] / 2));

  const MC = useMemo(() => (q: number) => mc(cost, q), [cv.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const ATC = useMemo(() => (q: number) => atc(cost, q), [cv.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const AVC = useMemo(() => (q: number) => avc(cost, q), [cv.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const dem = { A, B: dv[1] };
  const D = useMemo(() => (q: number) => demandPrice({ A, B: dv[1] }, q), [A, dv[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const MR = useMemo(() => (q: number) => mr({ A, B: dv[1] }, q), [A, dv[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  const ySpan = v[3] - v[2];
  const xEnd = v[0] + (v[1] - v[0]) * 0.97;
  /** Where a rising curve leaves the top of the view, for its label. */
  const exitQ = (f: (q: number) => number, from: number) => {
    let q = from;
    const step = (v[1] - v[0]) / 400;
    while (q < xEnd && f(q) < v[3] - ySpan * 0.06) q += step;
    return Math.min(q, xEnd);
  };

  let body: ReactNode;
  let readouts: ReactNode;
  let legend: LegendItem[];
  let controls: ReactNode;
  let note: ReactNode = null;

  if (mode === 'competitive' && !showPrice) {
    const q = qAt;
    const qLabMC = exitQ(MC, Math.max(shut.q, v[0]));
    legend = [
      { color: C.mc, label: 'MC' },
      { color: C.atc, label: 'ATC' },
      ...(showAVC ? [{ color: C.avc, label: 'AVC' } as LegendItem] : []),
    ];
    body = (
      <>
        <FnPath f={ATC} from={Math.max(v[0], 1e-6)} color={C.atc} width={2.25} />
        {showAVC && <FnPath f={AVC} color={C.avc} width={2} dash="6 4" />}
        <FnPath f={MC} color={C.mc} width={2.5} />
        <Label x={qLabMC} y={MC(qLabMC)} dx={-6} dy={2} anchor="end" color={C.mc} weight={600}>MC</Label>
        <Label x={xEnd} y={ATC(xEnd)} dx={-2} dy={-6} anchor="end" color={C.atc} weight={600}>ATC</Label>
        {showAVC && <Label x={xEnd} y={AVC(xEnd)} dx={-2} dy={14} anchor="end" color={C.avc} weight={600}>AVC</Label>}
        <Segment x1={q} y1={v[2]} x2={q} y2={v[3]} color="var(--plot-text)" dash="4 4" width={1.25} />
        <Dot x={q} y={MC(q)} color={C.mc} />
        <Dot x={q} y={ATC(q)} color={C.atc} />
        {showAVC && <Dot x={q} y={AVC(q)} color={C.avc} />}
        {Number.isFinite(be.q) && <Dot x={be.q} y={be.value} color={C.atc} r={3.5} hollow />}
        {shut.q > 0 && showAVC && <Dot x={shut.q} y={shut.value} color={C.avc} r={3.5} hollow />}
      </>
    );
    const qStep = niceStep(v[1] - v[0], 200);
    controls = <Slider label="Output Q" value={q} min={Math.max(v[0], qStep)} max={v[1]} step={qStep} onChange={setQAt} format={(x) => U(x, qu)} />;
    readouts = (
      <>
        <Readout label="Fixed cost / variable cost" value={`${U(cost.F, '')} / ${U(vc(cost, q), pu)}`} />
        <Readout label="Total cost" value={U(tc(cost, q), pu)} />
        <Readout label="Marginal cost" value={U(MC(q), pu)} tone={C.mc} />
        <Readout label="Average variable cost" value={U(AVC(q), pu)} tone={C.avc} />
        <Readout label="Average total cost" value={U(ATC(q), pu)} tone={C.atc} />
        <Readout label="Min AVC / min ATC at Q =" value={`${U(shut.q, '')} / ${Number.isFinite(be.q) ? U(be.q, qu) : 'none'}`} />
      </>
    );
    note = <Note>MC cuts both AVC and ATC at their minimum points (the hollow dots): while MC is below an average the average falls, and once MC is above it the average rises.</Note>;
  } else if (mode === 'competitive') {
    const ch = competitiveChoice(cost, price);
    const atcQ = ch.q > 0 ? ATC(ch.q) : NaN;
    const profitable = ch.profit >= 0;
    const qLabMC = exitQ(MC, Math.max(shut.q, v[0]));
    const qLabATC = xEnd;
    legend = [
      { color: C.mc, label: 'MC' },
      { color: C.atc, label: 'ATC' },
      ...(showAVC ? [{ color: C.avc, label: 'AVC' } as LegendItem] : []),
      { color: C.price, label: 'Price = MR' },
      { color: profitable ? C.profit : C.loss, label: profitable ? 'Profit' : 'Loss', kind: 'box' },
    ];
    body = (
      <>
        {ch.q > 0 && Number.isFinite(atcQ) && <Area points={[[0, Math.min(price, atcQ)], [ch.q, Math.min(price, atcQ)], [ch.q, Math.max(price, atcQ)], [0, Math.max(price, atcQ)]]} fill={profitable ? C.profit : C.loss} opacity={0.3} />}
        {showSupply && (
          <>
            <FnPath f={MC} from={shut.q} color={C.price} width={8} opacity={0.3} />
            <Segment x1={0} y1={v[2]} x2={0} y2={shut.value} color={C.price} width={8} opacity={0.3} />
          </>
        )}
        <FnPath f={ATC} from={Math.max(v[0], 1e-6)} color={C.atc} width={2.25} />
        {showAVC && <FnPath f={AVC} color={C.avc} width={2} dash="6 4" />}
        <FnPath f={MC} color={C.mc} width={2.5} />
        <Segment x1={v[0]} y1={price} x2={v[1]} y2={price} color={C.price} width={2.25} />
        <Label x={qLabMC} y={MC(qLabMC)} dx={-6} dy={2} anchor="end" color={C.mc} weight={600}>MC</Label>
        <Label x={qLabATC} y={ATC(qLabATC)} dx={-2} dy={-6} anchor="end" color={C.atc} weight={600}>ATC</Label>
        {showAVC && <Label x={qLabATC} y={AVC(qLabATC)} dx={-2} dy={14} anchor="end" color={C.avc} weight={600}>AVC</Label>}
        <YTag y={price} label="P" color={C.price} />
        {Number.isFinite(be.q) && <Dot x={be.q} y={be.value} color={C.atc} r={3.5} hollow />}
        {shut.q > 0 && showAVC && <Dot x={shut.q} y={shut.value} color={C.avc} r={3.5} hollow />}
        {ch.q > 0 && (
          <>
            <Segment x1={ch.q} y1={v[2]} x2={ch.q} y2={Math.max(price, atcQ)} color="var(--plot-text)" dash="4 4" width={1.25} />
            <Dot x={ch.q} y={price} color="var(--color-ink)" />
            <Label x={ch.q} y={v[2]} dx={4} dy={-6} size={11}>q*</Label>
          </>
        )}
      </>
    );
    controls = (
      <>
        <Slider label="Market price P" value={price} min={Math.max(0, v[2])} max={v[3]} step={niceStep(ySpan, 300)} onChange={setPrice} format={(x) => U(x, pu)} />
        <div className="flex flex-wrap items-end gap-1.5">
          <Button onClick={() => setPrice(shut.value)}>P = min AVC</Button>
          {Number.isFinite(be.value) && <Button onClick={() => setPrice(be.value)}>P = min ATC</Button>}
          <Button onClick={() => setShowSupply((s) => !s)}>{showSupply ? 'Hide' : 'Show'} supply curve</Button>
        </div>
      </>
    );
    readouts = (
      <>
        <Readout label="Output q* (P = MC)" value={U(ch.q, qu)} />
        <Readout label="ATC at q*" value={ch.q > 0 ? U(atcQ, pu) : '—'} tone={C.atc} />
        <Readout label={profitable ? 'Profit' : 'Loss'} value={U(Math.abs(ch.profit), pu)} tone={profitable ? C.profit : C.loss} />
        <Readout label="Revenue / total cost" value={`${U(ch.revenue, '')} / ${U(ch.cost, pu)}`} />
        <Readout label="Shutdown price (min AVC)" value={U(shut.value, pu)} tone={C.avc} />
        <Readout label="Break-even price (min ATC)" value={Number.isFinite(be.value) ? U(be.value, pu) : 'none'} tone={C.atc} />
      </>
    );
    note =
      ch.decision === 'shutdown' ? (
        <Note tone="warn">The price is below minimum AVC: producing anything loses more than the fixed cost, so the firm shuts down and loses only F = {U(cost.F, pu)}.</Note>
      ) : ch.decision === 'loss' ? (
        <Note>The price covers average variable cost but not average total cost. The firm keeps producing in the short run because its loss ({U(-ch.profit, pu)}) is smaller than the fixed cost it would lose by shutting down ({U(cost.F, pu)}).</Note>
      ) : (
        <Note tone="good">Price is at or above minimum ATC, so the firm earns a non-negative economic profit. In the long run, positive profit attracts entry, which pushes price down towards minimum ATC.</Note>
      );
    if (cost.a2 <= 0 && cost.a3 === 0) note = <Note tone="warn">Marginal cost is constant, so a price-taking firm has no single best output. Use a rising marginal cost for the competitive mode.</Note>;
  } else {
    const o = monopolyOutcome(cost, dem, pricing);
    const qe = efficientQ(cost, dem);
    const pe = D(qe);
    const atcQ = o.q > 0 ? ATC(o.q) : NaN;
    const profitable = o.profit >= 0;
    const qLabMC = exitQ(MC, v[0]);
    legend = [
      { color: C.demand, label: 'Demand' },
      { color: C.mr, label: 'MR', kind: 'dash' },
      { color: C.mc, label: 'MC' },
      { color: C.matc, label: 'ATC' },
      { color: C.cs, label: 'Consumer surplus', kind: 'box' },
      { color: profitable ? C.profit : C.loss, label: pricing === 'perfect' ? 'Producer surplus' : profitable ? 'Profit' : 'Loss', kind: 'box' },
      { color: C.dwl, label: 'Deadweight loss', kind: 'box' },
    ];
    body = (
      <>
        {o.feasible && o.q > 0 && pricing !== 'perfect' && (
          <>
            <Area points={[[0, A], [o.q, o.price], [0, o.price]]} fill={C.cs} />
            {Number.isFinite(atcQ) && <Area points={[[0, Math.min(o.price, atcQ)], [o.q, Math.min(o.price, atcQ)], [o.q, Math.max(o.price, atcQ)], [0, Math.max(o.price, atcQ)]]} fill={profitable ? C.profit : C.loss} opacity={0.3} />}
          </>
        )}
        {o.feasible && pricing === 'perfect' && <Area points={between(D, MC, 0, o.q)} fill={C.profit} opacity={0.3} />}
        {o.feasible && o.dwl > 1e-9 && <Area points={o.q < qe ? between(D, MC, o.q, qe) : between(MC, D, qe, o.q)} fill={C.dwl} opacity={0.42} />}
        <FnPath f={D} color={C.demand} width={2.5} />
        <FnPath f={MR} color={C.mr} width={2} dash="7 4" />
        <FnPath f={ATC} from={Math.max(v[0], 1e-6)} color={C.matc} width={2} />
        <FnPath f={MC} color={C.mc} width={2.5} />
        <Label x={Math.min(xEnd, (A - (v[2] + ySpan * 0.1)) / dv[1])} y={D(Math.min(xEnd, (A - (v[2] + ySpan * 0.1)) / dv[1]))} dx={-4} dy={-8} anchor="end" color={C.demand} weight={600}>D</Label>
        <Label x={(A - (v[2] + ySpan * 0.2)) / (2 * dv[1])} y={v[2] + ySpan * 0.2} dx={8} dy={4} color={C.mr} weight={600}>MR</Label>
        <Label x={qLabMC} y={MC(qLabMC)} dx={-6} dy={2} anchor="end" color={C.mc} weight={600}>MC</Label>
        <Label x={xEnd} y={ATC(xEnd)} dx={-2} dy={-6} anchor="end" color={C.matc} weight={600}>ATC</Label>
        <Dot x={qe} y={pe} color="var(--plot-text)" r={4} hollow />
        {o.feasible && o.q > 0 && (
          <>
            <Segment x1={o.q} y1={v[2]} x2={o.q} y2={Math.max(o.price, atcQ)} color="var(--plot-text)" dash="4 4" width={1.25} />
            {pricing !== 'perfect' && <Segment x1={v[0]} y1={o.price} x2={o.q} y2={o.price} color="var(--plot-text)" dash="4 4" width={1.25} />}
            {pricing === 'single' && <Dot x={o.q} y={MR(o.q)} color={C.mr} r={3.5} />}
            <Dot x={o.q} y={o.price} color="var(--color-ink)" />
            {pricing !== 'perfect' && <YTag y={o.price} label={pricing === 'single' ? 'Pm' : 'P'} color="var(--color-ink)" />}
          </>
        )}
      </>
    );
    controls = (
      <>
        {pricings.length > 1 && <Segmented label="Pricing" options={pricings.map((p) => ({ value: p as Pricing, label: PRICING_LABEL[p as Pricing] }))} value={pricing} onChange={setPricing} />}
        {demandSlider && <Slider label="Demand intercept A" value={A} min={dv[0] * 0.5} max={dv[0] * 1.5} step={niceStep(dv[0], 100)} onChange={setA} format={(x) => U(x, pu)} />}
      </>
    );
    readouts = o.feasible ? (
      <>
        <Readout label={pricing === 'single' ? 'Output (MR = MC)' : 'Output'} value={U(o.q, qu)} />
        <Readout label={pricing === 'perfect' ? 'Price of the last unit' : 'Price'} value={U(o.price, pu)} />
        <Readout label={profitable ? 'Profit' : 'Loss'} value={U(Math.abs(o.profit), pu)} tone={profitable ? C.profit : C.loss} />
        <Readout label="Consumer surplus" value={U(o.cs, pu)} tone={C.cs} />
        <Readout label="Deadweight loss" value={U(o.dwl, pu)} tone={C.dwl} />
        <Readout label="Efficient output and price (D = MC)" value={`${U(qe, '')} at ${U(pe, pu)}`} />
      </>
    ) : (
      <>
        <Readout label="Output" value="none" />
        <Readout label="Deadweight loss" value={U(o.dwl, pu)} tone={C.dwl} />
      </>
    );
    note =
      pricing === 'single' ? (
        <Note>The monopolist produces where MR = MC (the small dot on MR) and charges what demand will bear at that output. Price exceeds MC, so units that buyers value above their cost are not produced: that is the deadweight loss.</Note>
      ) : pricing === 'perfect' ? (
        <Note>Charging every buyer their own maximum price makes MR equal the demand curve, so output is efficient and there is no deadweight loss, but the firm captures all the surplus.</Note>
      ) : pricing === 'mc' ? (
        <Note tone={profitable ? 'info' : 'warn'}>
          Price at marginal cost gives the efficient output.{profitable ? '' : ' Here ATC is above MC at that output, so the firm makes a loss and would need a subsidy to stay in business: the natural-monopoly problem.'}
        </Note>
      ) : o.feasible ? (
        <Note>Average-cost pricing lets the firm just break even (zero economic profit). Output is higher than under a single unregulated price but below the efficient level, so a smaller deadweight loss remains.</Note>
      ) : (
        <Note tone="warn">ATC lies above demand at every output, so no regulated price lets this firm break even.</Note>
      );
  }

  return (
    <Frame title={str(params, 'title', mode === 'competitive' ? 'A competitive firm' : 'Monopoly')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && <Segmented label="Mode" options={modes.map((m) => ({ value: m as Mode, label: m === 'competitive' ? 'Competitive firm' : 'Monopoly' }))} value={mode} onChange={setMode} />}
      <Plot view={v} label={mode === 'competitive' ? 'Cost curves of a competitive firm with a price line' : 'Monopoly: demand, marginal revenue and cost curves'}>
        {body}
        <AxisTitles x={str(params, 'xLabel', 'Quantity')} y={str(params, 'yLabel', 'Price, cost')} />
      </Plot>
      <EconLegend items={legend} />
      <Controls>{controls}</Controls>
      <EconReadouts>{readouts}</EconReadouts>
      {note}
    </Frame>
  );
}
