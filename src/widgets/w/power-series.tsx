/**
 * power-series: partial sums S_N(x) of a power series given by its general term, against the
 * function it represents, with the interval of convergence shaded. A probe point x shows the
 * sequence S_N(x) against N and the ratio of consecutive terms, so the learner sees convergence
 * inside the radius, divergence outside, and the separate behaviour at each endpoint.
 *
 * Params:
 *   term     string    general term in n, x and slider names; factorials allowed ("x^n/n!")
 *                      default "x^n"
 *   n0       number    first index                                   default 0
 *   f        string    the sum, as an expression in x (optional)
 *   a        number | string   centre                                default 0
 *   R        number | "inf"    radius of convergence (optional)
 *   ends     "[]" | "[)" | "(]" | "()"   endpoint behaviour         default unknown
 *   N        number    initial number of the last index              default 5
 *   NMax     number    largest N (<= 200)                            default 40
 *   x        number | string   initial probe point                   default a + R/2
 *   view     [xMin, xMax, yMin, yMax]                                default [-2, 2, -3, 5]
 *   sumsView [yMin, yMax]  y-range of the S_N(x) plot                default automatic
 *   sliders  {name: [initial, min, max, step?]}                     default {}
 *   title, caption   strings
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { compile } from '../kit/expr';
import { num, numArray, oneOf, sliders as readSliders, str, view as readView } from '../kit/params';
import { Dot, Draggable, FnPath, Plot, Rect, Segment } from '../kit/Plot';
import { Controls, Frame, Readout, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { compileF, numExpr } from '../kit/calc2-num';
import { Legend, ParamSliders, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

type Ends = '[]' | '[)' | '(]' | '()';

export default function PowerSeries({ params }: WidgetProps) {
  const defs = readSliders(params, 'sliders');
  const termSrc = str(params, 'term', 'x^n');
  const fSrc = typeof params.f === 'string' ? str(params, 'f', '') : '';
  const n0 = Math.round(num(params, 'n0', 0));
  const a = numExpr(params, 'a', 0);
  const R = params.R === undefined ? undefined : numExpr(params, 'R', 1, true);
  const ends = params.ends === undefined ? undefined : oneOf<Ends>(params, 'ends', ['[]', '[)', '(]', '()'], '()');
  const NMax = clamp(Math.round(num(params, 'NMax', 40)), n0 + 1, 200);
  const v = readView(params, 'view', [-2, 2, -3, 5]);
  const sumsView = params.sumsView === undefined ? undefined : numArray(params, 'sumsView', [0, 1]);
  if (sumsView && !(sumsView.length === 2 && sumsView[0] < sumsView[1])) throw new Error('parameter "sumsView" should be [yMin, yMax]');

  const [N, setN] = useState(() => clamp(Math.round(num(params, 'N', 5)), n0, NMax));
  const [x0, setX0] = useState(() => numExpr(params, 'x', a + (R !== undefined && Number.isFinite(R) ? R / 2 : 0.5)));
  const { names, args, values, set } = useSliderValues(defs);
  const argKey = args.join(',');

  const term = useMemo(() => compileF(termSrc, ['n', 'x', ...names]), [termSrc, names]);
  const fFn = useMemo(() => (fSrc ? compile(fSrc, ['x', ...names]) : null), [fSrc, names]);

  const S = useMemo(() => (x: number) => {
    let s = 0;
    for (let n = n0; n <= N; n++) s += term(n, x, ...args);
    return s;
  }, [term, n0, N, argKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const f = useMemo(() => (fFn ? (x: number) => fFn(x, ...args) : null), [fFn, argKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Partial sums at the probe point for every N.
  const probe = useMemo(() => {
    const sums: number[] = [];
    const terms: number[] = [];
    let s = 0;
    for (let n = n0; n <= NMax + 1; n++) {
      const t = term(n, x0, ...args);
      terms.push(t);
      s += t;
      sums.push(s);
    }
    return { sums, terms };
  }, [term, x0, n0, NMax, argKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const fx = f ? f(x0) : NaN;
  const dist = Math.abs(x0 - a);
  const status =
    R === undefined
      ? null
      : R === Infinity || dist < R - 1e-9
        ? 'inside'
        : dist > R + 1e-9
          ? 'outside'
          : 'endpoint';
  const atLeft = status === 'endpoint' && x0 < a;
  const endConverges = status === 'endpoint' && ends ? (atLeft ? ends[0] === '[' : ends[1] === ']') : undefined;
  const sumConverges = status === 'inside' || endConverges === true;

  // y-range for the S_N(x0) plot: from the data, clipped so divergence still reads as a climb.
  const sv = useMemo((): [number, number] => {
    if (sumsView) return [sumsView[0], sumsView[1]];
    const ys = probe.sums.slice(0, NMax - n0 + 1).filter(Number.isFinite);
    let lo = Math.min(0, ...ys.slice(0, 12));
    let hi = Math.max(0, ...ys.slice(0, 12));
    if (Number.isFinite(fx)) {
      lo = Math.min(lo, fx);
      hi = Math.max(hi, fx);
    }
    if (hi - lo < 1e-9) hi = lo + 1;
    const pad = (hi - lo) * 0.25;
    return [lo - pad, hi + pad];
  }, [probe, sumsView, fx, NMax, n0]);

  const ratio = Math.abs(probe.terms[N - n0 + 1] / probe.terms[N - n0]);
  const span = v[1] - v[0];
  const interval = R !== undefined && R > 0 ? [Math.max(a - R, v[0] - span), Math.min(a + R, v[1] + span)] : null;
  const verdict =
    status === 'inside'
      ? 'inside: converges absolutely'
      : status === 'outside'
        ? 'outside: diverges'
        : status === 'endpoint'
          ? endConverges === undefined
            ? 'endpoint: test it separately'
            : endConverges
              ? 'endpoint: converges'
              : 'endpoint: diverges'
          : '—';

  return (
    <Frame title={str(params, 'title', 'Partial sums of a power series')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} label={`Partial sum of ${termSrc} up to n = ${N}`}>
        {interval && <Rect x={interval[0]} y={v[2]} w={interval[1] - interval[0]} h={v[3] - v[2]} fill="var(--plot-3)" opacity={0.08} />}
        {R !== undefined &&
          Number.isFinite(R) &&
          R > 0 &&
          [a - R, a + R].map((e, i) => <Segment key={i} x1={e} y1={v[2]} x2={e} y2={v[3]} color="var(--plot-3)" dash="5 4" width={1.25} />)}
        {f && <FnPath f={f} color="var(--plot-1)" width={2.5} />}
        <FnPath f={S} color="var(--plot-2)" width={2.25} />
        {R !== undefined && Number.isFinite(R) && R > 0 && ends && (
          <>
            <Dot x={a - R} y={0} r={5} color="var(--plot-3)" hollow={ends[0] === '('} />
            <Dot x={a + R} y={0} r={5} color="var(--plot-3)" hollow={ends[1] === ')'} />
          </>
        )}
        <Segment x1={x0} y1={v[2]} x2={x0} y2={v[3]} color="var(--plot-4)" dash="3 3" width={1.25} />
        <Draggable x={x0} y={0} onChange={(nx) => setX0(clamp(nx, v[0], v[1]))} constrain={(nx) => [snapEnds(nx, a, R, span), 0]} label="Probe point x" color="var(--plot-4)" />
      </Plot>
      <Legend
        items={[
          ...(f ? [{ color: 'var(--plot-1)', label: fSrc ? 'f(x)' : '' }] : []),
          { color: 'var(--plot-2)', label: `S_{${N}}(x)=\\sum_{n=${n0}}^{${N}}(\\cdots)` },
          ...(interval ? [{ color: 'var(--plot-3)', label: R === Infinity ? 'R=\\infty' : `|x-a|<R`, box: true }] : []),
        ]}
      />
      <div>
        <div className="mb-1 text-xs text-ink-3">
          <Tex>{`S_N(x)\\text{ at }x=${fmt(x0, 3).replace('−', '-')}\\text{, against }N`}</Tex>
        </div>
        <Plot view={[Math.min(n0 - 0.5, -0.09 * (NMax - n0 + 2)), NMax + 0.5, sv[0], sv[1]]} aspect={0.32} minHeight={140} maxHeight={210} label="Partial sums at the probe point">
          {sumConverges && Number.isFinite(fx) && <Segment x1={n0 - 1} y1={fx} x2={NMax + 1} y2={fx} color="var(--plot-1)" dash="6 4" width={1.5} />}
          {probe.sums.slice(0, NMax - n0 + 1).map((s, i) => {
            const n = n0 + i;
            const y = clamp(s, sv[0] - (sv[1] - sv[0]), sv[1] + (sv[1] - sv[0]));
            return <Dot key={n} x={n} y={y} r={n === N ? 5 : 2.6} color={n <= N ? 'var(--plot-2)' : 'var(--plot-axis)'} />;
          })}
        </Plot>
      </div>
      <Controls>
        <Slider label={<Tex>{'\\text{Last index } N'}</Tex>} value={N} min={n0} max={NMax} step={1} onChange={(k) => setN(Math.round(k))} format={(k) => `${k}`} />
        <Slider label={<Tex>{'\\text{Probe point } x'}</Tex>} value={x0} min={v[0]} max={v[1]} step={span / 400} onChange={(nx) => setX0(snapEnds(nx, a, R, span))} />
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      <ReadoutGrid>
        <Readout label="Partial sum at x" value={fmt(probe.sums[N - n0], 5)} tone="var(--plot-2)" />
        <Readout label={f ? 'Function value' : 'Where x sits'} value={f ? fmt(fx, 5) : verdict} tone="var(--plot-1)" />
        <Readout label="Term ratio at N" value={Number.isFinite(ratio) ? fmt(ratio, 4) : '—'} />
      </ReadoutGrid>
      {f && R !== undefined && <div className="text-[13px] text-ink-2">At this x: {verdict}{R !== Infinity && <> (ratio of terms tends to |x − a|/R = {fmt(dist / R, 3)})</>}.</div>}
    </Frame>
  );
}

/** Snaps the probe onto an endpoint when it is within half a percent of the view. */
function snapEnds(x: number, a: number, R: number | undefined, span: number): number {
  if (R === undefined || !Number.isFinite(R)) return x;
  for (const e of [a - R, a + R]) if (Math.abs(x - e) < span * 0.006) return e;
  return x;
}
