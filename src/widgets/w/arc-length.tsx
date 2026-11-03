/**
 * arc-length: a curve y = f(x) on [a, b] with an inscribed polygon of n equal steps in x. The
 * polygon's length rises to the arc length L = integral of sqrt(1 + f'(x)^2) as n grows. The
 * exact derivative comes from power-series arithmetic; the integral from tanh-sinh quadrature.
 *
 * Params:
 *   f        string    expression in x and slider names                 default "x^(3/2)"
 *   a, b     number | string   the interval                             default 0, 4
 *   n        number    initial number of segments                       default 2
 *   nMax     number    largest n                                        default 64
 *   view     [xMin, xMax, yMin, yMax]                                   default fitted, equal scale
 *   sliders  {name: [initial, min, max, step?]}                         default {}
 *   title, caption   strings
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { compile } from '../kit/expr';
import { num, sliders as readSliders, str, view as readView } from '../kit/params';
import { Dot, FnPath, Plot, Poly, Segment } from '../kit/Plot';
import { Controls, Frame, Readout, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { valueAndSlope } from '../kit/calc2-taylor';
import { integrate, numExpr, parseOrThrow } from '../kit/calc2-num';
import { Legend, ParamSliders, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

export default function ArcLength({ params }: WidgetProps) {
  const defs = readSliders(params, 'sliders');
  const fSrc = str(params, 'f', 'x^(3/2)');
  const a = numExpr(params, 'a', 0);
  const b = numExpr(params, 'b', 4);
  if (!(b > a)) throw new Error('parameter "b" must exceed "a"');
  const nMax = clamp(Math.round(num(params, 'nMax', 64)), 2, 512);
  const [n, setN] = useState(() => clamp(Math.round(num(params, 'n', 2)), 1, nMax));
  const { names, args, values, set } = useSliderValues(defs);
  const argKey = args.join(',');

  const fFn = useMemo(() => compile(fSrc, ['x', ...names]), [fSrc, names]);
  const tree = useMemo(() => parseOrThrow(fSrc, ['x', ...names]), [fSrc, names]);
  const f = useMemo(() => (x: number) => fFn(x, ...args), [fFn, argKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const L = useMemo(() => integrate((x) => Math.sqrt(1 + valueAndSlope(tree, x, [0, ...args])[1] ** 2), a, b), [tree, a, b, argKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const pts = useMemo(() => Array.from({ length: n + 1 }, (_, i) => [a + ((b - a) * i) / n, f(a + ((b - a) * i) / n)] as [number, number]), [n, a, b, f]);
  const poly = pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
  const chord = Math.hypot(b - a, f(b) - f(a));

  const autoView = useMemo((): [number, number, number, number] => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 200; i++) {
      const y = f(a + ((b - a) * i) / 200);
      if (Number.isFinite(y)) {
        lo = Math.min(lo, y);
        hi = Math.max(hi, y);
      }
    }
    const pad = Math.max(b - a, hi - lo) * 0.1;
    return [a - pad, b + pad, Math.min(0, lo) - pad, hi + pad];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const v = params.view !== undefined ? readView(params, 'view', autoView) : autoView;

  return (
    <Frame title={str(params, 'title', 'Arc length as a limit of polygons')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} equal label={`Curve ${fSrc} with an inscribed polygon of ${n} segments`}>
        <FnPath f={f} color="var(--plot-1)" width={4} opacity={0.45} />
        <FnPath f={f} from={a} to={b} color="var(--plot-1)" width={2.5} />
        <Segment x1={a} y1={f(a)} x2={b} y2={f(b)} color="var(--plot-axis)" dash="5 4" width={1.25} />
        <Poly points={pts} color="var(--plot-2)" width={2} />
        {n <= 64 && pts.map(([x, y], i) => <Dot key={i} x={x} y={y} r={n > 24 ? 2.2 : 3.5} color="var(--plot-2)" />)}
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: <span className="font-mono">y = {fSrc}</span> },
          { color: 'var(--plot-2)', label: `\\text{polygon, }n=${n}` },
          { color: 'var(--plot-axis)', label: '\\text{chord}', dash: true },
        ]}
      />
      <Controls>
        <Slider label={<Tex>{'\\text{Segments } n'}</Tex>} value={n} min={1} max={nMax} step={1} onChange={(k) => setN(Math.round(k))} format={(k) => `${k}`} />
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      <ReadoutGrid>
        <Readout label="Polygon length" value={fmt(poly, 6)} tone="var(--plot-2)" />
        <Readout label="Arc length (integral)" value={fmt(L, 6)} tone="var(--plot-1)" />
        <Readout label="Shortfall" value={fmt(L - poly, 3)} />
      </ReadoutGrid>
      <div className="text-[13px] text-ink-2">
        Chord from end to end (n = 1): {fmt(chord, 5)}. Every inscribed polygon is shorter than the curve, and doubling n (which only adds vertices) can never make it shorter, by the triangle inequality.
      </div>
    </Frame>
  );
}
