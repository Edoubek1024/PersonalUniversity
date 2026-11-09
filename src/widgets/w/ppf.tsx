/**
 * ppf: production possibilities, in two modes.
 *
 *   single  One economy's frontier, bowed out or straight. Drag the point to see whether it is
 *           efficient, inefficient or unattainable; the slope of the frontier at that output is
 *           the opportunity cost of one more unit of the x-good. Optional growth sliders shift
 *           the frontier out, and optional steps show increasing opportunity cost.
 *   trade   Two countries with straight frontiers. Shows opportunity costs and comparative
 *           advantage; with specialisation and trade at a chosen price, each country consumes
 *           outside its own frontier when the price lies between the two opportunity costs.
 *
 * Params:
 *   mode       "single" | "trade"                                          default "single"
 *   xLabel     string   name of the good on the horizontal axis             default "Good X"
 *   yLabel     string   name of the good on the vertical axis               default "Good Y"
 *   xMax       number   most x-good the economy can make (single)           default 100
 *   yMax       number   most y-good the economy can make (single)           default 100
 *   shape      "bowed" | "straight"                                        default "bowed"
 *   curvature  number   exponent k in (x/xMax)^k + (y/yMax)^k = 1, k >= 1    default 2
 *   point      [x, y]   initial position of the draggable point             default on the frontier at x = xMax/2
 *   growth     boolean  show sliders that shift the frontier out            default true
 *   steps      number   equal steps in x to show rising opportunity cost (0 = off)  default 0
 *   countries  [{name, x, y}, {name, x, y}]   trade: each country's maximum output of each good
 *                                            default [{"name": "Home", "x": 60, "y": 30}, {"name": "Foreign", "x": 20, "y": 40}]
 *   autarky    [[x, y], [x, y]]   trade: each country's production without trade
 *                                            default half of each maximum
 *   price      number   trade: initial terms of trade (y-good per x-good)    default midway between the opportunity costs
 *   traded     number   trade: initial amount of the x-good exported         default a quarter of the exporter's maximum
 *   view       [xMin, xMax, yMin, yMax]   single mode view                 default fitted
 *   title, caption  strings
 */
import { useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, view as readView } from '../kit/params';
import { Dot, Draggable, Label, Line, ParamPath, Plot, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider, Toggle } from '../kit/controls';
import { clamp, fmt, niceStep } from '../kit/num';
import { AxisTitles, EconLegend, EconReadouts } from '../kit/econ-ui';

const COL = { ppf: 'var(--plot-1)', old: 'var(--plot-axis)', point: 'var(--plot-2)', tangent: 'var(--plot-4)', good: 'var(--plot-3)', trade: 'var(--plot-6)', steps: 'var(--plot-5)' };

interface Country {
  name: string;
  x: number;
  y: number;
}

function readCountries(p: Record<string, unknown>): Country[] {
  const v = p.countries;
  if (v === undefined)
    return [
      { name: 'Home', x: 60, y: 30 },
      { name: 'Foreign', x: 20, y: 40 },
    ];
  const ok = Array.isArray(v) && v.length === 2 && v.every((c) => c && typeof c === 'object' && typeof (c as Country).name === 'string' && (c as Country).x > 0 && (c as Country).y > 0);
  if (!ok) throw new Error('parameter "countries" should be two objects {"name": string, "x": number > 0, "y": number > 0}');
  return v as Country[];
}

function readAutarky(p: Record<string, unknown>, cs: Country[]): [number, number][] {
  const v = p.autarky;
  if (v === undefined) return cs.map((c) => [c.x / 2, c.y / 2]);
  const ok = Array.isArray(v) && v.length === 2 && v.every((r) => Array.isArray(r) && r.length === 2 && r.every((x) => typeof x === 'number' && x >= 0));
  if (!ok) throw new Error('parameter "autarky" should be [[x, y], [x, y]] with non-negative numbers');
  const pts = v as [number, number][];
  pts.forEach(([x, y], i) => {
    if (x / cs[i].x + y / cs[i].y > 1 + 1e-9) throw new Error(`parameter "autarky": the point for ${cs[i].name} lies outside its frontier`);
  });
  return pts;
}

export default function Ppf({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['single', 'trade'] as const, 'single');
  return mode === 'single' ? <Single params={params} /> : <Trade params={params} />;
}

function Single({ params }: { params: Record<string, unknown> }) {
  const xName = str(params, 'xLabel', 'Good X');
  const yName = str(params, 'yLabel', 'Good Y');
  const X0 = num(params, 'xMax', 100);
  const Y0 = num(params, 'yMax', 100);
  if (!(X0 > 0 && Y0 > 0)) throw new Error('parameters "xMax" and "yMax" must be positive');
  const shape = oneOf(params, 'shape', ['bowed', 'straight'] as const, 'bowed');
  const k = shape === 'straight' ? 1 : num(params, 'curvature', 2);
  if (!(k >= 1)) throw new Error('parameter "curvature" must be at least 1 (1 is a straight line)');
  const growth = bool(params, 'growth', true);
  const nSteps = Math.round(num(params, 'steps', 0));
  const frontierAt = (x: number, X: number, Y: number) => (x >= X ? 0 : Y * Math.pow(1 - Math.pow(Math.max(0, x) / X, k), 1 / k));
  const p0 = numArray(params, 'point', [X0 / 2, frontierAt(X0 / 2, X0, Y0)]);
  if (p0.length !== 2) throw new Error('parameter "point" should be [x, y]');
  const v = readView(params, 'view', [0, X0 * 1.45, 0, Y0 * 1.45]);

  const [pt, setPt] = useState<[number, number]>([p0[0], p0[1]]);
  const [gx, setGx] = useState(0);
  const [gy, setGy] = useState(0);
  const [showSteps, setShowSteps] = useState(nSteps > 0);
  const X = X0 * (1 + gx / 100);
  const Y = Y0 * (1 + gy / 100);
  const grown = gx !== 0 || gy !== 0;

  const [x, y] = pt;
  const s = Math.pow(Math.pow(Math.max(0, x) / X, k) + Math.pow(Math.max(0, y) / Y, k), 1 / k);
  const status = Math.abs(s - 1) < 0.012 ? 'efficient' : s < 1 ? 'inefficient' : 'unattainable';
  // Opportunity cost on the frontier at this x: minus the slope dy/dx.
  const xf = clamp(x, 0, X);
  const yf = frontierAt(xf, X, Y);
  const oc = k === 1 ? Y / X : xf <= 0 ? 0 : yf <= 0 ? Infinity : (Y / X) * Math.pow(xf / X / (yf / Y), k - 1);
  const pathX = (t: number) => X * Math.pow(Math.cos(t), 2 / k);
  const pathY = (t: number) => Y * Math.pow(Math.sin(t), 2 / k);
  const statusTone = status === 'efficient' ? 'var(--plot-3)' : status === 'inefficient' ? 'var(--plot-4)' : 'var(--plot-2)';

  const stepPts: ReactNode[] = [];
  if (showSteps && nSteps > 0) {
    const dx = X / nSteps;
    for (let i = 0; i < nSteps; i++) {
      const xa = i * dx;
      const xb = (i + 1) * dx;
      const ya = frontierAt(xa, X, Y);
      const yb = frontierAt(xb, X, Y);
      stepPts.push(
        <g key={i}>
          <Segment x1={xa} y1={ya} x2={xb} y2={ya} color={COL.steps} width={1.75} />
          <Segment x1={xb} y1={ya} x2={xb} y2={yb} color={COL.steps} width={1.75} />
          <Label x={xb} y={(ya + yb) / 2} dx={4} dy={4} size={10} color={COL.steps}>
            {`−${fmt(ya - yb, 2)}`}
          </Label>
        </g>,
      );
    }
  }

  return (
    <Frame title={str(params, 'title', 'Production possibilities frontier')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} label={`Production possibilities frontier for ${xName} and ${yName}`}>
        {grown && <ParamPath x={(t) => X0 * Math.pow(Math.cos(t), 2 / k)} y={(t) => Y0 * Math.pow(Math.sin(t), 2 / k)} t0={0} t1={Math.PI / 2} color={COL.old} dash="5 4" width={1.75} />}
        <ParamPath x={pathX} y={pathY} t0={0} t1={Math.PI / 2} color={COL.ppf} width={2.75} />
        {stepPts}
        {Number.isFinite(oc) && xf > 0 && xf < X && <Line x={xf} y={yf} slope={-oc} color={COL.tangent} width={1.5} dash="6 4" />}
        {status !== 'efficient' && xf < X && <Dot x={xf} y={yf} r={3.5} color={COL.tangent} />}
        <Draggable x={x} y={y} onChange={(nx, ny) => setPt([clamp(nx, 0, v[1]), clamp(ny, 0, v[3])])} color={statusTone} label={`Output point: ${xName} and ${yName}`} step={niceStep(v[1] - v[0], 100)} />
        <Label x={x} y={y} dx={10} dy={-10} color={statusTone} weight={600}>
          {status}
        </Label>
        <AxisTitles x={xName} y={yName} />
      </Plot>
      <EconLegend
        items={[
          { color: COL.ppf, label: grown ? 'Frontier after growth' : 'Frontier' },
          ...(grown ? [{ color: COL.old, label: 'Original frontier', kind: 'dash' as const }] : []),
          { color: COL.tangent, label: 'Slope = opportunity cost', kind: 'dash' },
          ...(showSteps && nSteps > 0 ? [{ color: COL.steps, label: `${yName} given up per step` }] : []),
        ]}
      />
      <Controls>
        {growth && <Slider label={`Growth in ${xName} capacity`} value={gx} min={-30} max={60} step={1} onChange={setGx} format={(g) => `${g > 0 ? '+' : ''}${fmt(g)}%`} />}
        {growth && <Slider label={`Growth in ${yName} capacity`} value={gy} min={-30} max={60} step={1} onChange={setGy} format={(g) => `${g > 0 ? '+' : ''}${fmt(g)}%`} />}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setPt([xf, yf])}>Move to frontier</Button>
          <Button onClick={() => setPt([p0[0], p0[1]])}>Reset point</Button>
          {nSteps > 0 && <Toggle label="Show equal steps" checked={showSteps} onChange={setShowSteps} />}
        </div>
      </Controls>
      <EconReadouts>
        <Readout label={`${xName}, ${yName}`} value={`${fmt(x)}, ${fmt(y)}`} />
        <Readout label="This point is" value={status} tone={statusTone} />
        <Readout label={`Opportunity cost of 1 more ${xName} (at x = ${fmt(xf)})`} value={Number.isFinite(oc) ? `${fmt(oc)} ${yName}` : 'very large'} tone={COL.tangent} />
        <Readout label={`Opportunity cost of 1 more ${yName}`} value={oc > 0 && Number.isFinite(oc) ? `${fmt(1 / oc)} ${xName}` : oc === 0 ? 'very large' : '0'} />
      </EconReadouts>
      {k > 1 && <Note>The frontier is bowed out, so its slope gets steeper as you move right: each extra unit of {xName} costs more {yName} than the last, because resources suited to {yName} are moved over last.</Note>}
    </Frame>
  );
}

function Trade({ params }: { params: Record<string, unknown> }) {
  const xName = str(params, 'xLabel', 'Good X');
  const yName = str(params, 'yLabel', 'Good Y');
  const cs = readCountries(params);
  const aut = readAutarky(params, cs);
  const opp = cs.map((c) => c.y / c.x); // y-good given up per unit of x-good
  const same = Math.abs(opp[0] - opp[1]) < 1e-12;
  const e = opp[0] <= opp[1] ? 0 : 1; // exporter of the x-good: lower opportunity cost of x
  const i = 1 - e;
  const lo = Math.min(...opp);
  const hi = Math.max(...opp);
  // The price slider's minimum sits on its step grid, so round prices such as 0.5 and 1 are reachable.
  const priceStep = niceStep(hi * 1.5, 150);
  const priceMin = priceStep * Math.max(1, Math.floor((lo * 0.5) / priceStep));
  const [spec, setSpec] = useState(true);
  const [price, setPrice] = useState(num(params, 'price', (lo + hi) / 2));
  const [traded, setTraded] = useState(num(params, 'traded', cs[e].x / 4));

  const prod: [number, number][] = spec && !same ? cs.map((c, j) => (j === e ? [c.x, 0] : [0, c.y])) : aut.map((p) => [p[0], p[1]]);
  const maxT = spec && !same ? Math.min(cs[e].x, cs[i].y / price) : 0;
  const T = clamp(traded, 0, maxT);
  const cons: [number, number][] = prod.map(([px, py], j) => (j === e ? [px - T, py + price * T] : [px + T, py - price * T]));
  const gains = cons.map(([cx, cy], j) => [cx - aut[j][0], cy - aut[j][1]]);
  const outside = cons.map(([cx, cy], j) => cx / cs[j].x + cy / cs[j].y > 1 + 1e-9);
  const both = gains.every(([gx, gy]) => gx >= -1e-9 && gy >= -1e-9 && gx + gy > 1e-9);

  // Consumption after trade never exceeds the larger country's maximum of either good, so a fixed
  // view keeps the picture still while the sliders move.
  const vx = Math.max(...cs.map((c) => c.x)) * 1.15;
  const vy = Math.max(...cs.map((c) => c.y)) * 1.15;
  const view: [number, number, number, number] = [-vx * 0.04, vx, -vy * 0.05, vy];

  return (
    <Frame title={str(params, 'title', 'Comparative advantage and gains from trade')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="grid gap-3 sm:grid-cols-2">
        {cs.map((c, j) => (
          <div key={c.name} className="min-w-0">
            <div className="mb-1 text-[13px] font-semibold">{c.name}</div>
            <Plot view={view} aspect={0.85} minHeight={200} maxHeight={320} label={`${c.name}: frontier, production and consumption`}>
              <Segment x1={0} y1={c.y} x2={c.x} y2={0} color={COL.ppf} width={2.5} />
              {spec && !same && T > 0 && <Segment x1={prod[j][0]} y1={prod[j][1]} x2={cons[j][0]} y2={cons[j][1]} color={COL.trade} width={1.75} dash="6 4" />}
              <Dot x={aut[j][0]} y={aut[j][1]} color="var(--plot-text)" hollow r={5} />
              {spec && !same && <Dot x={prod[j][0]} y={prod[j][1]} color={COL.ppf} r={5} />}
              <Dot x={cons[j][0]} y={cons[j][1]} color={outside[j] ? COL.good : COL.point} r={6} />
              <Label x={cons[j][0]} y={cons[j][1]} dx={8} dy={-8} color={outside[j] ? COL.good : COL.point} size={11} weight={600}>
                consumes
              </Label>
              <AxisTitles x={xName} y={yName} />
            </Plot>
          </div>
        ))}
      </div>
      <EconLegend
        items={[
          { color: COL.ppf, label: 'Frontier' },
          { color: 'var(--plot-text)', label: 'Without trade (hollow)', kind: 'dash' },
          { color: COL.trade, label: 'Trade at the chosen price', kind: 'dash' },
          { color: COL.good, label: 'Consumption outside the frontier' },
        ]}
      />
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full border-collapse text-xs tabular-nums">
          <thead className="bg-surface-2 text-ink-2">
            <tr>
              <th className="px-2.5 py-1.5 text-left font-medium">Country</th>
              <th className="px-2.5 py-1.5 text-right font-medium">1 {xName} costs</th>
              <th className="px-2.5 py-1.5 text-right font-medium">1 {yName} costs</th>
              <th className="px-2.5 py-1.5 text-right font-medium">Change in consumption</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {cs.map((c, j) => (
              <tr key={c.name} className="border-t border-line">
                <td className="whitespace-nowrap px-2.5 py-1 text-left font-sans">{c.name}</td>
                <td className="whitespace-nowrap px-2.5 py-1 text-right">{fmt(opp[j])} {yName}</td>
                <td className="whitespace-nowrap px-2.5 py-1 text-right">{fmt(1 / opp[j])} {xName}</td>
                <td className="whitespace-nowrap px-2.5 py-1 text-right">
                  {`${gains[j][0] >= 0 ? '+' : '−'}${fmt(Math.abs(gains[j][0]))} ${xName}, ${gains[j][1] >= 0 ? '+' : '−'}${fmt(Math.abs(gains[j][1]))} ${yName}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Controls>
        <Toggle label="Specialise by comparative advantage and trade" checked={spec} onChange={setSpec} />
        <div />
        <Slider label={`Price: ${yName} per ${xName}`} value={price} min={priceMin} max={priceMin + priceStep * Math.ceil((hi * 1.5 - priceMin) / priceStep)} step={priceStep} onChange={setPrice} format={(p) => fmt(p)} disabled={!spec || same} />
        <Slider label={`${xName} exported by ${cs[e].name}`} value={T} min={0} max={Math.max(maxT, 1e-6)} step={niceStep(Math.max(maxT, 1), 100)} onChange={setTraded} format={(t) => fmt(t)} disabled={!spec || same} />
      </Controls>
      <EconReadouts>
        <Readout label={`Comparative advantage in ${xName}`} value={same ? 'neither' : cs[e].name} />
        <Readout label={`Comparative advantage in ${yName}`} value={same ? 'neither' : cs[i].name} />
        <Readout label="Prices where both can gain" value={same ? 'none' : `${fmt(lo)} to ${fmt(hi)} ${yName} per ${xName}`} />
        <Readout label={`World output of ${xName}, ${yName}`} value={`${fmt(prod[0][0] + prod[1][0])}, ${fmt(prod[0][1] + prod[1][1])} (was ${fmt(aut[0][0] + aut[1][0])}, ${fmt(aut[0][1] + aut[1][1])})`} />
      </EconReadouts>
      {same ? (
        <Note>Both countries give up the same amount of {yName} for each unit of {xName}, so neither has a comparative advantage and specialising cannot raise total output.</Note>
      ) : !spec ? (
        <Note>Without trade each country consumes what it produces, on or inside its own frontier.</Note>
      ) : both ? (
        <Note tone="good">Both countries end up with at least as much of each good as before, and more of one: trade lets each consume outside its own frontier.</Note>
      ) : (
        <Note tone="warn">At this price or quantity one country is worse off in some good than without trade. Gains for both need a price between the two opportunity costs ({fmt(lo)} and {fmt(hi)}) and a suitable quantity.</Note>
      )}
    </Frame>
  );
}
