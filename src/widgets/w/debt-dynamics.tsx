/**
 * debt-dynamics: the debt-to-GDP ratio year by year from
 *   d_{t+1} = d_t (1 + r) / (1 + g) + p
 * with r the average nominal interest rate on the debt, g nominal GDP growth and p the primary
 * deficit (percent of GDP; negative is a primary surplus). Readouts give r - g, the final ratio
 * and the primary balance that would hold the ratio where it starts. Optional marks plot
 * published projections for comparison.
 *
 * Params:
 *   d0         number   starting debt, percent of GDP        default 100
 *   r          number   nominal interest rate, percent         default 3.4
 *   g          number   nominal GDP growth, percent            default 4
 *   p          number   primary deficit, percent of GDP        default 2.4
 *   years      number   horizon (5-60)                          default 30
 *   startYear  number   calendar year of d0                     default 2026
 *   marks      [[year, value], ...]  points to compare against default []
 *   markLabel  string   legend for the marks                    default "projection"
 *   ref        number   horizontal reference line (e.g. 106)    default none
 *   refLabel   string   label for it                            default ""
 *   title      string                                           default "Debt dynamics: r, g and the primary deficit"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { matrix, num, str } from '../kit/params';
import { Dot, Label, Plot, Poly, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Readout, Slider } from '../kit/controls';
import { fmt, niceStep } from '../kit/num';
import { debtPath, stabilisingPrimary } from '../kit/econ-macro';

export default function DebtDynamics({ params }: WidgetProps) {
  const init = { d0: num(params, 'd0', 100), r: num(params, 'r', 3.4), g: num(params, 'g', 4), p: num(params, 'p', 2.4) };
  const years = Math.round(num(params, 'years', 30));
  if (years < 5 || years > 60) throw new Error('parameter "years" must be between 5 and 60');
  const y0 = Math.round(num(params, 'startYear', 2026));
  const marksRaw = params.marks === undefined ? [] : matrix(params, 'marks', [[0, 0]]);
  if (marksRaw.length && marksRaw[0].length !== 2) throw new Error('parameter "marks" should be [[year, value], ...]');
  const markLabel = str(params, 'markLabel', 'projection');
  const ref = params.ref === undefined ? NaN : num(params, 'ref', 0);
  const refLabel = str(params, 'refLabel', '');

  const [d0, setD0] = useState(init.d0);
  const [r, setR] = useState(init.r);
  const [g, setG] = useState(init.g);
  const [p, setP] = useState(init.p);

  const path = useMemo(() => debtPath(d0, r, g, p, years), [d0, r, g, p, years]);
  const end = path[path.length - 1];
  const pStar = stabilisingPrimary(d0, r, g);
  const top = Math.max(160, ...path, ...(Number.isFinite(ref) ? [ref] : []), ...marksRaw.map((m) => m[1])) * 1.08;
  const yTop = Math.ceil(top / niceStep(top, 5)) * niceStep(top, 5);
  const view: [number, number, number, number] = [y0, y0 + years, 0, Math.min(yTop, 400)];
  const pts = path.map((d, i) => [y0 + i, Math.min(d, view[3] * 1.5)] as [number, number]);
  const pTone = p > 0 ? 'var(--plot-2)' : 'var(--plot-3)';

  return (
    <Frame title={str(params, 'title', 'Debt dynamics: r, g and the primary deficit')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={view} aspect={0.55} yLabel="debt, % of GDP" xTickFormat={(v) => String(Math.round(v))} label="Debt-to-GDP ratio over time">
        {Number.isFinite(ref) && (
          <>
            <Segment x1={view[0]} y1={ref} x2={view[1]} y2={ref} color="var(--plot-4)" dash="6 4" width={1.5} />
            <Label x={view[1]} y={ref} dx={-4} dy={14} anchor="end" color="var(--plot-4)" size={11} weight={600}>
              {refLabel}
            </Label>
          </>
        )}
        <Segment x1={view[0]} y1={d0} x2={view[1]} y2={d0} color="var(--plot-axis)" dash="2 4" width={1} />
        <Poly points={pts} color="var(--plot-1)" width={2.5} />
        {marksRaw.map(([yr, v], i) => (
          <g key={i}>
            <Dot x={yr} y={v} r={5} hollow color="var(--plot-2)" />
            <Label x={yr} y={v} dx={8} dy={4} color="var(--plot-2)" size={11} weight={600}>
              {`${markLabel} ${fmt(v, 4)}`}
            </Label>
          </g>
        ))}
        <Dot x={y0 + years} y={Math.min(end, view[3])} r={4.5} color="var(--plot-1)" />
      </Plot>
      <Controls cols={3}>
        <Readout label="r − g (percentage points)" value={`${r - g >= 0 ? '+' : ''}${fmt(r - g, 3)}`} tone={r > g ? 'var(--plot-2)' : 'var(--plot-3)'} />
        <Readout label={`Debt in ${y0 + years}`} value={`${fmt(end, 4)}% of GDP`} tone="var(--plot-1)" />
        <Readout label={`Change since ${y0}`} value={`${end - d0 >= 0 ? '+' : ''}${fmt(end - d0, 4)} points`} />
        <Readout label="Primary balance this year" value={p > 0 ? `deficit ${fmt(p, 3)}% of GDP` : p < 0 ? `surplus ${fmt(-p, 3)}% of GDP` : 'balanced'} tone={pTone} />
        <Readout label={`Primary balance that holds debt at ${fmt(d0, 4)}%`} value={pStar >= 0 ? `deficit up to ${fmt(pStar, 3)}%` : `surplus of ${fmt(-pStar, 3)}%`} />
        <Readout label="Debt after 10 years" value={`${fmt(path[Math.min(10, years)], 4)}%`} />
      </Controls>
      <Controls cols={2}>
        <Slider label="Average interest rate on debt r (%)" value={r} min={0} max={8} step={0.1} onChange={setR} />
        <Slider label="Nominal GDP growth g (%)" value={g} min={0} max={8} step={0.1} onChange={setG} />
        <Slider label="Primary deficit p (% of GDP; negative = surplus)" value={p} min={-4} max={8} step={0.1} onChange={setP} />
        <Slider label={`Starting debt in ${y0} (% of GDP)`} value={d0} min={20} max={200} step={1} onChange={setD0} />
      </Controls>
      <div>
        <Button onClick={() => (setD0(init.d0), setR(init.r), setG(init.g), setP(init.p))}>Reset</Button>
      </div>
    </Frame>
  );
}
