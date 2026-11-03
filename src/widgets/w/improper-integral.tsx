/**
 * improper-integral: the area under y = f(x) from a to b as b slides out towards infinity
 * (kind "upper"), or from t to b as t slides in towards a blow-up at a (kind "lower"), with a
 * second plot of the running value of the integral, which levels off at the limit when the
 * integral converges and keeps climbing when it diverges. An optional comparison function g is
 * drawn and integrated alongside.
 *
 * Params:
 *   f        string    integrand in x and slider names                  default "1/x^p"
 *   g        string    comparison function (optional)
 *   a        number | string   the fixed lower limit (upper kind) or the singular end (lower kind)
 *                                                                        default 1 (upper), 0 (lower)
 *   b        number | string   lower kind: the fixed upper limit        default 1
 *   kind     "upper" | "lower"                                          default "upper"
 *   bMax     number    upper kind: the largest b                        default 1000
 *   tMin     number    lower kind: smallest t - a, a power of ten       default 1e-6
 *   scale    "log" | "linear"   upper kind: how b moves on its slider   default log when a > 0
 *   value    string | number   the limit, in slider names ("1/(p-1)")
 *   converges string   expression in slider names, > 0 when f's integral converges
 *   gValue   string | number   the limit for g
 *   view     [xMin, xMax, yMin, yMax]   the picture of f                 default fitted
 *   sliders  {name: [initial, min, max, step?]}                         default {}
 *   title, caption   strings
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { compile } from '../kit/expr';
import { num, oneOf, sliders as readSliders, str, view as readView } from '../kit/params';
import { Dot, FillBetween, FnPath, Label, Plot, Poly, Segment } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Slider, Tex } from '../kit/controls';
import { clamp, fmt, niceStep } from '../kit/num';
import { cumulative, numExpr, pow10Label } from '../kit/calc2-num';
import { Legend, ParamSliders, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

const GRID = 360;

function exprOrNumber(p: Record<string, unknown>, key: string, names: string[]): ((args: number[]) => number) | undefined {
  const v = p[key];
  if (v === undefined) return undefined;
  if (typeof v === 'number' && Number.isFinite(v)) return () => v;
  if (typeof v === 'string') {
    try {
      const fn = compile(v, names);
      return (args) => fn(...args);
    } catch (e) {
      throw new Error(`parameter "${key}": ${(e as Error).message} in "${v}"`);
    }
  }
  throw new Error(`parameter "${key}" should be a number or an expression, got ${JSON.stringify(v)}`);
}

export default function ImproperIntegral({ params }: WidgetProps) {
  const kind = oneOf(params, 'kind', ['upper', 'lower'] as const, 'upper');
  const defs = readSliders(params, 'sliders');
  const fSrc = str(params, 'f', '1/x^p');
  const gSrc = typeof params.g === 'string' ? str(params, 'g', '') : '';
  const a = numExpr(params, 'a', kind === 'upper' ? 1 : 0);
  const bFixed = numExpr(params, 'b', a + 1);
  const bMax = num(params, 'bMax', 1000);
  const tMin = num(params, 'tMin', 1e-6);
  if (kind === 'upper' && !(bMax > a)) throw new Error('parameter "bMax" must exceed "a"');
  if (kind === 'lower' && !(bFixed > a)) throw new Error('parameter "b" must exceed "a"');
  const scale = oneOf(params, 'scale', ['log', 'linear'] as const, a > 0 ? 'log' : 'linear');
  if (kind === 'upper' && scale === 'log' && !(a > 0)) throw new Error('a log scale for b needs a > 0; use "scale": "linear"');

  const { names, args, values, set } = useSliderValues(defs);
  const argKey = args.join(',');
  const fFn = useMemo(() => compile(fSrc, ['x', ...names]), [fSrc, names]);
  const gFn = useMemo(() => (gSrc ? compile(gSrc, ['x', ...names]) : null), [gSrc, names]);
  const f = useMemo(() => (x: number) => fFn(x, ...args), [fFn, argKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const g = useMemo(() => (gFn ? (x: number) => gFn(x, ...args) : null), [gFn, argKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const valueFn = exprOrNumber(params, 'value', names);
  const convFn = exprOrNumber(params, 'converges', names);
  const gValueFn = exprOrNumber(params, 'gValue', names);
  const converges = convFn ? convFn(args) > 0 : valueFn !== undefined;
  const limit = converges && valueFn ? valueFn(args) : undefined;
  const gLimit = gValueFn ? gValueFn(args) : undefined;

  // Slider position u in [0, 1] maps to the moving limit.
  const uToX = (u: number) => {
    if (kind === 'lower') return a + Math.pow(10, Math.log10(bFixed - a) + (Math.log10(tMin) - Math.log10(bFixed - a)) * u);
    if (scale === 'log') return Math.pow(10, Math.log10(a) + (Math.log10(bMax) - Math.log10(a)) * u);
    return a + (bMax - a) * u;
  };
  const [u, setU] = useState(() => 0.35);
  const moving = uToX(u);

  // Running values on a grid of the moving limit.
  const grid = useMemo(() => Array.from({ length: GRID + 1 }, (_, i) => uToX(i / GRID)), [kind, a, bFixed, bMax, tMin, scale]); // eslint-disable-line react-hooks/exhaustive-deps
  const runF = useMemo(() => runningValues(f, grid), [f, grid]);
  const runG = useMemo(() => (g ? runningValues(g, grid) : null), [g, grid]);
  const iu = clamp(u * GRID, 0, GRID);
  const lerp = (arr: number[]) => {
    const i = Math.min(GRID - 1, Math.floor(iu));
    const w = iu - i;
    return arr[i] * (1 - w) + arr[i + 1] * w;
  };
  const curF = lerp(runF);
  const curG = runG ? lerp(runG) : NaN;

  const lo = kind === 'upper' ? a : moving;
  const hi = kind === 'upper' ? moving : bFixed;
  const defaultView: [number, number, number, number] = kind === 'upper' ? [Math.min(0, a), Math.max(a + 9, 10), -0.1, 1.3] : [Math.min(0, a), bFixed + 0.5 * (bFixed - a), -0.4, 6];
  const v = params.view !== undefined ? readView(params, 'view', defaultView) : defaultView;

  // Running-value plot: x is the slider position, labelled with the limit's value.
  const early = (arr: number[] | null) => (arr ? arr.slice(0, Math.round(GRID * 0.6)).filter(Number.isFinite).map(Math.abs) : []);
  const top = Math.max(1e-9, limit ?? 0, gLimit ?? 0, ...early(runF), ...early(runG)) * 1.25;
  const runPts = (arr: number[]) => arr.map((y, i) => [i / GRID, clamp(y, -top, top * 1.5)] as [number, number]).filter(([, y]) => Number.isFinite(y));
  const tickU = useMemo(() => {
    const out: { u: number; label: string }[] = [];
    if (kind === 'lower' || scale === 'log') {
      const l0 = kind === 'lower' ? Math.log10(bFixed - a) : Math.log10(a);
      const l1 = kind === 'lower' ? Math.log10(tMin) : Math.log10(bMax);
      const step = Math.abs(l1 - l0) > 4 ? 2 : 1;
      for (let k = Math.ceil(Math.min(l0, l1)); k <= Math.floor(Math.max(l0, l1)); k += 1) {
        if ((k - Math.ceil(Math.min(l0, l1))) % step) continue;
        out.push({ u: (k - l0) / (l1 - l0), label: pow10Label(k) });
      }
    } else {
      const step = niceStep(bMax - a, 5);
      for (let x = Math.ceil(a / step) * step; x <= bMax + 1e-9; x += step) out.push({ u: (x - a) / (bMax - a), label: fmt(x, 3) });
    }
    return out;
  }, [kind, scale, a, bFixed, bMax, tMin]);

  const movingName = kind === 'upper' ? 'b' : 't';
  const intTex = kind === 'upper' ? `\\int_{${fmt(a)}}^{b}` : `\\int_{t}^{${fmt(bFixed)}}`;

  return (
    <Frame title={str(params, 'title', 'Improper integral as a limit')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} label={`Area under ${fSrc}`}>
        {g && <FillBetween top={g} a={Math.max(lo, v[0])} b={Math.min(hi, v[1])} fill="var(--plot-5)" opacity={0.14} samples={400} />}
        <FillBetween top={f} a={Math.max(lo, v[0])} b={Math.min(hi, v[1])} fill="var(--plot-1)" opacity={0.25} samples={400} />
        {g && <FnPath f={g} from={kind === 'upper' ? a : a + 1e-9} color="var(--plot-5)" width={2} dash="6 4" />}
        <FnPath f={f} from={kind === 'upper' ? a : a + 1e-9} color="var(--plot-1)" width={2.5} />
        {moving <= v[1] ? (
          <Segment x1={moving} y1={0} x2={moving} y2={clamp(f(moving), v[2], v[3])} color="var(--plot-2)" width={2.25} />
        ) : (
          <Label x={v[1]} y={(v[2] + v[3]) / 2} dx={-6} dy={0} anchor="end" color="var(--plot-2)" weight={600}>
            {`b = ${fmt(moving, 3)} →`}
          </Label>
        )}
        {kind === 'lower' && <Segment x1={a} y1={v[2]} x2={a} y2={v[3]} color="var(--plot-axis)" dash="4 4" width={1.25} />}
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: `f(x)=${plainTex(fSrc)}` },
          ...(g ? [{ color: 'var(--plot-5)', label: `g(x)=${plainTex(gSrc)}`, dash: true }] : []),
        ]}
      />
      <div>
        <div className="mb-1 text-xs text-ink-3">
          <Tex>{`\\text{Running value } ${intTex}f(x)\\,dx\\text{ as }${movingName}\\to${kind === 'upper' ? '\\infty' : `${fmt(a)}^+`}`}</Tex>
        </div>
        <Plot view={[0, 1, -top * 0.16, top]} aspect={0.32} minHeight={140} maxHeight={210} grid={false} xTickFormat={() => ""} label="Running value of the integral">
          {tickU.map((tk) => (
            <g key={tk.u}>
              <Segment x1={tk.u} y1={-top * 0.16} x2={tk.u} y2={top} color="var(--plot-grid)" width={1} />
              <Label x={tk.u} y={-top * 0.16} dx={tk.u < 0.03 ? 3 : tk.u > 0.97 ? -3 : 0} dy={-4} anchor={tk.u < 0.03 ? 'start' : tk.u > 0.97 ? 'end' : 'middle'} size={11}>
                {tk.label}
              </Label>
            </g>
          ))}
          {limit !== undefined && Number.isFinite(limit) && <Segment x1={0} y1={limit} x2={1} y2={limit} color="var(--plot-3)" dash="6 4" width={1.5} />}
          {gLimit !== undefined && Number.isFinite(gLimit) && <Segment x1={0} y1={gLimit} x2={1} y2={gLimit} color="var(--plot-5)" dash="2 4" width={1.5} />}
          {runG && <Poly points={runPts(runG)} color="var(--plot-5)" width={2} dash="6 4" />}
          <Poly points={runPts(runF)} color="var(--plot-1)" width={2.25} />
          <Dot x={u} y={clamp(curF, -top, top * 1.5)} r={5} color="var(--plot-2)" />
        </Plot>
      </div>
      <Controls>
        <Slider
          label={<Tex>{movingName}</Tex>}
          value={u}
          min={0}
          max={1}
          step={1 / 400}
          onChange={setU}
          format={() => (kind === 'lower' ? `${fmt(a)} + ${fmt(moving - a, 2)}` : fmt(moving, 4))}
        />
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      <ReadoutGrid>
        <Readout label={`Integral up to ${movingName}`} value={fmt(curF, 5)} tone="var(--plot-1)" />
        <Readout label="Limit" value={limit !== undefined ? fmt(limit, 5) : convFn ? 'diverges' : '—'} tone="var(--plot-3)" />
        {g ? <Readout label={`Integral of g up to ${movingName}`} value={fmt(curG, 5)} tone="var(--plot-5)" /> : <Readout label="Gap to the limit" value={limit !== undefined ? fmt(limit - curF, 4) : '—'} />}
      </ReadoutGrid>
      {convFn && !converges && <Note tone="warn">For these values the integral diverges: the running value grows without bound.</Note>}
    </Frame>
  );
}

/**
 * Integral from grid[0] to grid[i] for each i (grid may run downwards, toward a singular end;
 * then the values are integrals from grid[i] to grid[0], positive for positive f).
 */
function runningValues(f: (x: number) => number, grid: number[]): number[] {
  const c = cumulative(f, grid, 16);
  return grid[grid.length - 1] < grid[0] ? c.map((y) => -y) : c;
}

/** Light TeX for an expression: abs(u) as |u|, no * signs. */
function plainTex(s: string): string {
  let out = s.replace(/\*/g, '').replace(/\^\(([^()]*)\)/g, '^{$1}');
  for (let k = 0; k < 3; k++) out = out.replace(/abs\(([^()]*(?:\([^()]*\))?[^()]*)\)/g, '|$1|');
  return out.replace(/\b(sin|cos|exp|ln|sqrt)\b/g, (m) => `\\${m}`);
}
