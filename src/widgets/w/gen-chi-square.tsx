/**
 * gen-chi-square: chi-square goodness-of-fit test of observed counts against a hypothesised
 * ratio (a Mendelian 3:1, 9:3:3:1, a 1:2:1 or any other). Shows the expected counts, each
 * (O − E)²/E term, χ², the degrees of freedom, the p-value (upper tail, computed exactly with the
 * regularised incomplete gamma function), the critical value at α, a verdict, and the χ² density
 * for that df with the rejection region shaded and the observed statistic marked.
 *
 * Params:
 *   observed  number[]   observed counts, one per class                        default [5474, 1850] (Mendel's seed shape)
 *   ratio     number[]   hypothesised ratio, same length (any positive weights) default [3, 1]
 *   labels    string[]   class names, same length                               default ["round", "wrinkled"]
 *   alpha     number     significance level, 0 < alpha < 1                      default 0.05
 *   lostDf    number     extra degrees of freedom lost to parameters estimated
 *                        from the data (1 for a Hardy-Weinberg test with p estimated)   default 0
 *   editable  boolean    number inputs for counts and ratio, add/remove classes default true
 *   title     string                                                            default "Chi-square goodness of fit"
 *   caption   string     what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Tex } from '../kit/controls';
import { FillBetween, FnPath, Label, Plot, Segment } from '../kit/Plot';
import { fmt } from '../kit/num';
import { chiSqPdf, chiSqTest, fmtP } from '../kit/gen-stats';
import { GC, NumField } from '../kit/gen-ui';

export default function GenChiSquare({ params }: WidgetProps) {
  const obs0 = numArray(params, 'observed', [5474, 1850]);
  const ratio0 = numArray(params, 'ratio', [3, 1]);
  const labels0 = strArray(params, 'labels', obs0.length === 2 && !params.observed ? ['round', 'wrinkled'] : obs0.map((_, i) => `class ${i + 1}`));
  const alpha0 = num(params, 'alpha', 0.05);
  const lostDf = num(params, 'lostDf', 0);
  const editable = bool(params, 'editable', true);
  if (obs0.length < 2) throw new Error('parameter "observed" needs at least two classes');
  if (ratio0.length !== obs0.length) throw new Error(`parameter "ratio" needs ${obs0.length} numbers, one per observed class`);
  if (labels0.length !== obs0.length) throw new Error(`parameter "labels" needs ${obs0.length} names, one per observed class`);
  if (obs0.some((o) => o < 0)) throw new Error('parameter "observed" should not contain negative counts');
  if (ratio0.some((r) => !(r > 0))) throw new Error('parameter "ratio" should contain positive numbers');
  if (!(alpha0 > 0 && alpha0 < 1)) throw new Error('parameter "alpha" should be between 0 and 1');
  if (!Number.isInteger(lostDf) || lostDf < 0) throw new Error('parameter "lostDf" should be a whole number ≥ 0');

  const [rows, setRows] = useState(() => obs0.map((o, i) => ({ label: labels0[i], o, r: ratio0[i] })));
  const [alpha, setAlpha] = useState(String(alpha0) as string);
  const a = parseFloat(alpha);
  const res = useMemo(() => chiSqTest(rows.map((x) => x.o), rows.map((x) => x.r), a, lostDf), [rows, a, lostDf]);
  const n = rows.reduce((s, x) => s + x.o, 0);
  const rs = rows.reduce((s, x) => s + x.r, 0);
  const ok = res.df > 0 && n > 0;
  const smallE = res.expected.some((e) => e < 5);

  const df = Math.max(1, res.df);
  const xMax = Math.max(res.crit * 1.7, Math.min(res.chi2 * 1.15, res.crit * 4), df + 4 * Math.sqrt(2 * df), 6);
  let yMax = 0;
  for (let i = 1; i <= 200; i++) yMax = Math.max(yMax, chiSqPdf((xMax * i) / 200, df));
  yMax = Math.min(yMax, df === 1 ? 0.6 : yMax) * 1.15;
  const pdf = (x: number) => chiSqPdf(x, df);

  const setRow = (i: number, patch: Partial<{ o: number; r: number }>) => setRows((rs0) => rs0.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const offChart = res.chi2 > xMax;

  return (
    <Frame title={str(params, 'title', 'Chi-square goodness of fit')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[300px] text-right text-[13px] tabular-nums [&_td+td]:pl-2 [&_th+th]:pl-2">
          <thead className="text-ink-3">
            <tr>
              <th className="py-1 text-left font-medium">Class</th>
              <th className="font-medium">Observed O</th>
              <th className="font-medium">Ratio</th>
              <th className="font-medium">Expected E</th>
              <th className="hidden font-medium sm:table-cell">O − E</th>
              <th className="font-medium">(O − E)²/E</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((x, i) => (
              <tr key={i} className="border-t border-line">
                <td className="py-1 text-left">{x.label}</td>
                <td>{editable ? <NumField label={<span className="sr-only">Observed {x.label}</span>} value={x.o} width="w-[4.75rem]" onChange={(v) => setRow(i, { o: Math.round(v) })} /> : x.o}</td>
                <td>{editable ? <NumField label={<span className="sr-only">Ratio part {x.label}</span>} value={x.r} min={0.0001} step={1} width="w-14" onChange={(v) => v > 0 && setRow(i, { r: v })} /> : `${fmt(x.r)}`}</td>
                <td>{fmt(res.expected[i], 4)}</td>
                <td className="hidden sm:table-cell">{fmt(x.o - res.expected[i], 4)}</td>
                <td style={{ color: GC.b }}>{fmt(res.terms[i], 4)}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-line font-semibold">
              <td className="py-1 text-left">Total</td>
              <td>{n}</td>
              <td>{fmt(rs)}</td>
              <td>{fmt(n, 6)}</td>
              <td className="hidden sm:table-cell" />
              <td style={{ color: GC.b }}>χ² = {fmt(res.chi2, 4)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {editable && (
        <div className="flex flex-wrap items-end gap-2">
          <Button onClick={() => setRows((r) => [...r, { label: `class ${r.length + 1}`, o: 0, r: 1 }])} disabled={rows.length >= 8}>
            Add class
          </Button>
          <Button onClick={() => setRows((r) => r.slice(0, -1))} disabled={rows.length <= 2}>
            Remove last class
          </Button>
          <Button onClick={() => setRows(obs0.map((o, i) => ({ label: labels0[i], o, r: ratio0[i] })))}>Reset</Button>
          <Segmented
            label="α"
            options={['0.1', '0.05', '0.01'].map((v) => ({ value: v, label: v }))}
            value={['0.1', '0.05', '0.01'].includes(alpha) ? alpha : '0.05'}
            onChange={setAlpha}
          />
        </div>
      )}
      <div className="overflow-x-auto text-center text-[14px]">
        <Tex>{`\\chi^2 = \\sum \\frac{(O-E)^2}{E} = ${fmt(res.chi2, 4)}, \\quad \\text{df} = ${rows.length} - 1${lostDf ? ` - ${lostDf}` : ''} = ${res.df}`}</Tex>
      </div>
      {ok ? (
        <>
          <Plot view={[0, xMax, 0, yMax]} aspect={0.42} minHeight={180} maxHeight={300} label={`Chi-square density with ${res.df} degrees of freedom`} yTickFormat={(v) => fmt(v, 2)}>
            <FillBetween top={pdf} a={res.crit} b={xMax} fill={GC.b} opacity={0.25} />
            <FnPath f={pdf} from={0.001} color={GC.a} />
            <Segment x1={res.crit} y1={0} x2={res.crit} y2={yMax * 0.9} color={GC.b} dash="4 3" width={1.25} />
            <Label x={res.crit} y={yMax * 0.9} dx={4} dy={0} color={GC.b} size={11}>
              critical {fmt(res.crit, 4)}
            </Label>
            {!offChart && <Segment x1={res.chi2} y1={0} x2={res.chi2} y2={yMax * 0.7} color={GC.c} width={2.5} />}
            <Label x={offChart ? xMax : res.chi2} y={yMax * 0.7} dx={offChart || res.chi2 > xMax * 0.6 ? -4 : 4} dy={0} anchor={offChart || res.chi2 > xMax * 0.6 ? 'end' : 'start'} color={GC.c} size={12} weight={600}>
              {offChart ? `χ² = ${fmt(res.chi2, 4)} →` : `χ² = ${fmt(res.chi2, 4)}`}
            </Label>
          </Plot>
          <Controls cols={3}>
            <Readout label={`p-value = P(χ² with ${res.df} df ≥ ${fmt(res.chi2, 4)})`} value={fmtP(res.p)} tone={GC.c} />
            <Readout label={`Critical value at α = ${fmt(a)}`} value={fmt(res.crit, 4)} tone={GC.b} />
            <Readout label="Degrees of freedom" value={`${res.df}`} />
          </Controls>
          <Note tone={res.reject ? 'warn' : 'good'}>
            {res.reject
              ? `χ² = ${fmt(res.chi2, 4)} exceeds ${fmt(res.crit, 4)} (p = ${fmtP(res.p)} < ${fmt(a)}): reject the hypothesised ratio at α = ${fmt(a)}. Deviations this large would be rare if the ratio were true.`
              : `χ² = ${fmt(res.chi2, 4)} is below ${fmt(res.crit, 4)} (p = ${fmtP(res.p)} ≥ ${fmt(a)}): do not reject the hypothesised ratio at α = ${fmt(a)}. The data are consistent with it, which is not proof that it is true.`}
          </Note>
          {smallE && <Note tone="warn">An expected count is below 5, so the χ² approximation is unreliable here; pool classes or collect more data.</Note>}
        </>
      ) : (
        <Note tone="warn">{n === 0 ? 'Enter some observed counts.' : `With ${rows.length} classes and ${lostDf} estimated parameter(s) there are no degrees of freedom left to test.`}</Note>
      )}
    </Frame>
  );
}
