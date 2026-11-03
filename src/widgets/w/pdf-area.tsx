/**
 * pdf-area: a probability density with a draggable interval [a, b]; the probability
 * P(a <= X <= b) is the shaded area. Shows the total area (which must be 1), the mean and the
 * median, and lets either end go to infinity.
 *
 * Params:
 *   f        string    density in x and slider names, used on the support only
 *                      default "lambda*exp(-lambda*x)"
 *   support  [lo, hi]  numbers or "-inf" / "inf"                         default [0, "inf"]
 *   a, b     number | string   initial interval ("inf" allowed for b, "-inf" for a)
 *                                                                        default 0 and 10
 *   view     [xMin, xMax, yMin, yMax]                                    default [-1, 25, -0.02, 0.3]
 *   sliders  {name: [initial, min, max, step?]}                         default {"lambda": [0.2, 0.05, 1, 0.01]}
 *   mean, median   booleans   mark them                                  default true
 *   title, caption   strings
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { compile } from '../kit/expr';
import { bool, sliders as readSliders, str, view as readView } from '../kit/params';
import { Draggable, FillBetween, FnPath, Label, Plot, Segment } from '../kit/Plot';
import { Controls, Frame, Readout, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { integrate, numExpr } from '../kit/calc2-num';
import { Legend, ParamSliders, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

function readSupport(p: Record<string, unknown>): [number, number] {
  const v = p.support;
  if (v === undefined) return [0, Infinity];
  if (!Array.isArray(v) || v.length !== 2) throw new Error('parameter "support" should be [lo, hi], with "-inf" or "inf" allowed');
  const lo = numExpr({ lo: v[0] }, 'lo', 0, true);
  const hi = numExpr({ hi: v[1] }, 'hi', 0, true);
  if (!(hi > lo)) throw new Error('parameter "support" needs lo < hi');
  return [lo, hi];
}

export default function PdfArea({ params }: WidgetProps) {
  const defs = readSliders(params, 'sliders', { lambda: [0.2, 0.05, 1, 0.01] });
  const fSrc = str(params, 'f', 'lambda*exp(-lambda*x)');
  const [lo, hi] = readSupport(params);
  const v = readView(params, 'view', [-1, 25, -0.02, 0.3]);
  const a0 = numExpr(params, 'a', Math.max(lo, v[0]), true);
  const b0 = numExpr(params, 'b', 10, true);
  const [a, setA] = useState(Number.isFinite(a0) ? a0 : v[0] + (v[1] - v[0]) * 0.2);
  const [b, setB] = useState(Number.isFinite(b0) ? b0 : v[0] + (v[1] - v[0]) * 0.6);
  const [aInf, setAInf] = useState(a0 === -Infinity);
  const [bInf, setBInf] = useState(b0 === Infinity);
  const showMean = bool(params, 'mean', true);
  const showMedian = bool(params, 'median', true);
  const { names, args, values, set } = useSliderValues(defs);
  const argKey = args.join(',');

  const fFn = useMemo(() => compile(fSrc, ['x', ...names]), [fSrc, names]);
  const f = useMemo(() => (x: number) => (x < lo || x > hi ? 0 : fFn(x, ...args)), [fFn, argKey, lo, hi]); // eslint-disable-line react-hooks/exhaustive-deps

  // Integrals over infinite ranges are split at the peak of the density, so the quadrature's
  // change of variables never squeezes the bulk of the mass into a sliver.
  const peak = useMemo(() => {
    let best = clamp(0, Math.max(lo, v[0]), Math.min(hi, v[1]));
    let fb = -Infinity;
    for (let i = 0; i <= 400; i++) {
      const x = v[0] + ((v[1] - v[0]) * i) / 400;
      const y = f(x);
      if (Number.isFinite(y) && y > fb) {
        fb = y;
        best = x;
      }
    }
    return clamp(best, lo, hi);
  }, [f, lo, hi, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const area = (g: (x: number) => number, p: number, q: number): number => {
    const a1 = Math.max(p, lo);
    const b1 = Math.min(q, hi);
    if (!(b1 > a1)) return 0;
    if (Number.isFinite(a1) && Number.isFinite(b1)) return integrate(g, a1, b1);
    const c = clamp(peak, Number.isFinite(a1) ? a1 : -Infinity, Number.isFinite(b1) ? b1 : Infinity);
    return integrate(g, a1, c) + integrate(g, c, b1);
  };

  const stats = useMemo(() => {
    const total = area(f, lo, hi);
    const mean = area((x) => x * f(x), lo, hi) / total;
    // Median by bisection on the distribution function, measured from the peak.
    const below = area(f, lo, peak);
    const cdf = (m: number) => below + (m >= peak ? integrate(f, peak, m) : -integrate(f, m, peak));
    const w = Math.max(1, v[1] - v[0]);
    let l = peak - w;
    let h = peak + w;
    for (let k = 0; k < 60 && cdf(l) > total / 2; k++) l -= w;
    for (let k = 0; k < 60 && cdf(h) < total / 2; k++) h += w;
    for (let k = 0; k < 60; k++) {
      const m = (l + h) / 2;
      if (cdf(m) < total / 2) l = m;
      else h = m;
    }
    return { total, mean, median: (l + h) / 2 };
  }, [f, lo, hi, peak]); // eslint-disable-line react-hooks/exhaustive-deps

  const A = aInf ? -Infinity : Math.min(a, bInf ? Infinity : b);
  const B = bInf ? Infinity : Math.max(b, aInf ? -Infinity : a);
  const prob = area(f, A, B);
  const span = v[1] - v[0];
  const yLab = v[2] + (v[3] - v[2]) * 0.92;

  return (
    <Frame title={str(params, 'title', 'Probability is area')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} label={`Density ${fSrc} with the area between ${fmt(A)} and ${fmt(B)} shaded`}>
        <FillBetween top={f} a={Math.max(A, v[0])} b={Math.min(B, v[1])} fill="var(--plot-1)" opacity={0.28} samples={500} />
        <FnPath f={f} color="var(--plot-1)" width={2.5} />
        {showMean && Number.isFinite(stats.mean) && (
          <>
            <Segment x1={stats.mean} y1={0} x2={stats.mean} y2={yLab} color="var(--plot-4)" dash="5 4" width={1.5} />
            <Label x={stats.mean} y={yLab} dx={4} dy={0} color="var(--plot-4)" size={11}>
              μ
            </Label>
          </>
        )}
        {showMedian && Number.isFinite(stats.median) && (
          <>
            <Segment x1={stats.median} y1={0} x2={stats.median} y2={yLab * 0.85} color="var(--plot-5)" dash="2 3" width={1.5} />
            <Label x={stats.median} y={yLab * 0.85} dx={-4} dy={0} anchor="end" color="var(--plot-5)" size={11}>
              m
            </Label>
          </>
        )}
        {!aInf && <Draggable x={A} y={0} onChange={(x) => setA(clamp(x, v[0], v[1]))} constrain={(x) => [x, 0]} label="Left end a" color="var(--plot-2)" />}
        {!bInf && <Draggable x={B} y={0} onChange={(x) => setB(clamp(x, v[0], v[1]))} constrain={(x) => [x, 0]} label="Right end b" color="var(--plot-2)" />}
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: 'P(a\\le X\\le b)', box: true },
          ...(showMean ? [{ color: 'var(--plot-4)', label: '\\text{mean }\\mu', dash: true }] : []),
          ...(showMedian ? [{ color: 'var(--plot-5)', label: '\\text{median }m', dash: true }] : []),
        ]}
      />
      <Controls>
        <div>
          <Slider label={<Tex>a</Tex>} value={a} min={v[0]} max={v[1]} step={span / 500} onChange={setA} disabled={aInf} />
          <div className="mt-1">
            <Toggle label={<Tex>{'a=-\\infty'}</Tex>} checked={aInf} onChange={setAInf} />
          </div>
        </div>
        <div>
          <Slider label={<Tex>b</Tex>} value={b} min={v[0]} max={v[1]} step={span / 500} onChange={setB} disabled={bInf} />
          <div className="mt-1">
            <Toggle label={<Tex>{'b=\\infty'}</Tex>} checked={bInf} onChange={setBInf} />
          </div>
        </div>
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      <ReadoutGrid>
        <Readout label="Probability (shaded area)" value={fmt(prob, 4)} tone="var(--plot-1)" />
        <Readout label="Mean / median" value={`${fmt(stats.mean, 4)} / ${fmt(stats.median, 4)}`} />
        <Readout label="Total area" value={fmt(stats.total, 5)} />
      </ReadoutGrid>
    </Frame>
  );
}
