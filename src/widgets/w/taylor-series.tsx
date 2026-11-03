/**
 * taylor-series: a function, its Taylor polynomial T_n about x = a, and the error |f - T_n|.
 * Coefficients are computed exactly from the expression (power-series arithmetic, no finite
 * differences). Remainder mode compares the actual error at a chosen x with the Lagrange bound
 * M|x - a|^(n+1)/(n+1)!, where M is the largest |f^(n+1)| between a and x.
 *
 * Params:
 *   f        string    expression in x and the slider names            default "exp(x)"
 *   a        number | string   centre ("pi/4" allowed)                  default 0
 *   aRange   [min, max]   shows a slider for the centre                 default none
 *   n        number    initial degree                                    default 3
 *   nMax     number    largest degree on the slider (<= 30)              default 12
 *   sliders  {name: [initial, min, max, step?]}   parameters in f       default {}
 *   view     [xMin, xMax, yMin, yMax]                                    default [-4, 4, -3, 5]
 *   sing     array of numbers or [re, im] pairs: the singularities of f, so the radius of
 *            convergence is the distance from a to the nearest one ([] means R = infinity)
 *   R        number | "inf"   a fixed radius instead of sing             default unknown
 *   ends     "[]" | "[)" | "(]" | "()"   endpoint behaviour at the initial centre  default none
 *   menu     string[]   standard functions to switch between: exp, sin, cos, ln1p, geom, atan,
 *            sqrt1p, lorentz, gauss (each brings its own singularities and endpoints)
 *   mode     "taylor" | "remainder"                                      default "taylor"
 *   modes    boolean   show a switch between the two modes               default false
 *   x        number | string   initial x for remainder mode             default a + 1
 *   errorPlot boolean  show the log-scale error plot                     default true
 *   errView  [yMin, yMax]   powers of ten on the error plot              default [-10, 2]
 *   title, caption   strings
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { compile, type ExprNode } from '../kit/expr';
import { bool, num, numArray, oneOf, sliders as readSliders, str, strArray, view as readView } from '../kit/params';
import { Dot, FnPath, Label, Plot, Rect, Segment, Draggable } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { NotAnalytic, evalPoly, taylorCoeffs, tryTaylor } from '../kit/calc2-taylor';
import { asFraction, numExpr, parseOrThrow, pow10Label, sci, texNum } from '../kit/calc2-num';
import { Legend, ParamSliders, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

type Sing = number | [number, number];
type Ends = '[]' | '[)' | '(]' | '()';

const LIBRARY: Record<string, { label: string; f: string; sing: Sing[]; ends?: Ends }> = {
  exp: { label: 'e^x', f: 'exp(x)', sing: [] },
  sin: { label: '\\sin x', f: 'sin(x)', sing: [] },
  cos: { label: '\\cos x', f: 'cos(x)', sing: [] },
  ln1p: { label: '\\ln(1+x)', f: 'ln(1+x)', sing: [-1], ends: '(]' },
  geom: { label: '\\tfrac{1}{1-x}', f: '1/(1-x)', sing: [1], ends: '()' },
  atan: { label: '\\arctan x', f: 'arctan(x)', sing: [[0, 1], [0, -1]], ends: '[]' },
  sqrt1p: { label: '\\sqrt{1+x}', f: 'sqrt(1+x)', sing: [-1], ends: '[]' },
  lorentz: { label: '\\tfrac{1}{1+x^2}', f: '1/(1+x^2)', sing: [[0, 1], [0, -1]], ends: '()' },
  gauss: { label: 'e^{-x^2}', f: 'exp(-x^2)', sing: [] },
};

function readSing(p: Record<string, unknown>): Sing[] | undefined {
  const v = p.sing;
  if (v === undefined) return undefined;
  const ok = Array.isArray(v) && v.every((s) => (typeof s === 'number' && Number.isFinite(s)) || (Array.isArray(s) && s.length === 2 && s.every((t) => typeof t === 'number' && Number.isFinite(t))));
  if (!ok) throw new Error(`parameter "sing" should be an array of numbers or [re, im] pairs, got ${JSON.stringify(v)}`);
  return v as Sing[];
}

function radius(sing: Sing[] | undefined, fixed: number | undefined, a: number): number | undefined {
  if (fixed !== undefined) return fixed;
  if (!sing) return undefined;
  let r = Infinity;
  for (const s of sing) r = Math.min(r, typeof s === 'number' ? Math.abs(a - s) : Math.hypot(a - s[0], s[1]));
  return r;
}

/** TeX for the centre a inside (x - a). */
function texCentre(a: number): string {
  const k = Math.round((a / Math.PI) * 12);
  if (a !== 0 && Math.abs(a - (k * Math.PI) / 12) < 1e-12 && !asFraction(a)) {
    const g = gcd(Math.abs(k), 12);
    const p = Math.abs(k) / g;
    const q = 12 / g;
    return `${p === 1 ? '' : p}\\pi${q === 1 ? '' : `/${q}`}`;
  }
  return texNum(Math.abs(a)).replace(/^-/, '');
}

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}

/** T_n as TeX, eliding the middle when there are many terms. */
function polyTex(c: number[], a: number, n: number): string {
  const base = a === 0 ? 'x' : `(x${a > 0 ? '-' : '+'}${texCentre(a)})`;
  const terms: { k: number; c: number }[] = [];
  const scaleRef = Math.max(1e-300, ...c.slice(0, n + 1).map(Math.abs));
  for (let k = 0; k <= n; k++) if (Math.abs(c[k]) > 1e-13 * scaleRef) terms.push({ k, c: c[k] });
  if (!terms.length) return '0';
  const power = (k: number) => (k === 0 ? '' : k === 1 ? base : `${base}^{${k}}`);
  const one = (t: { k: number; c: number }, first: boolean) => {
    const neg = t.c < 0;
    const abs = Math.abs(t.c);
    const sign = first ? (neg ? '-' : '') : neg ? '-' : '+';
    if (t.k === 0) return `${sign}${texNum(abs)}`;
    const fr = asFraction(abs);
    if (fr && fr[1] !== 1) return `${sign}\\frac{${fr[0] === 1 ? '' : fr[0]}${power(t.k)}}{${fr[1]}}`;
    if (fr && fr[0] === 1) return `${sign}${power(t.k)}`;
    return `${sign}${texNum(abs)}${power(t.k)}`;
  };
  const shown = terms.length > 6 ? [...terms.slice(0, 3), null, ...terms.slice(-2)] : terms;
  return shown.map((t, i) => (t ? one(t, i === 0) : '+\\cdots')).join('');
}

export default function TaylorSeries({ params }: WidgetProps) {
  const defs = readSliders(params, 'sliders');
  const menu = strArray(params, 'menu', []);
  for (const m of menu) if (!(m in LIBRARY)) throw new Error(`parameter "menu": unknown function "${m}" (use ${Object.keys(LIBRARY).join(', ')})`);
  const a0 = numExpr(params, 'a', 0);
  const aRange = params.aRange === undefined ? undefined : numArray(params, 'aRange', [0, 1]);
  if (aRange && !(aRange.length === 2 && aRange[0] < aRange[1])) throw new Error('parameter "aRange" should be [min, max]');
  const nMax = clamp(Math.round(num(params, 'nMax', 12)), 1, 30);
  const v = readView(params, 'view', [-4, 4, -3, 5]);
  const errView = numArray(params, 'errView', [-10, 2]);
  const showErr = bool(params, 'errorPlot', true);
  const canSwitch = bool(params, 'modes', false);
  const fixedR = params.R === undefined ? undefined : numExpr(params, 'R', 1, true);
  const singParam = readSing(params);
  const endsParam = params.ends === undefined ? undefined : oneOf<Ends>(params, 'ends', ['[]', '[)', '(]', '()'], '()');

  const [choice, setChoice] = useState<string>(menu[0] ?? '');
  const fSrc = choice ? LIBRARY[choice].f : str(params, 'f', 'exp(x)');
  const sing = choice ? LIBRARY[choice].sing : singParam;
  const [n, setN] = useState(() => clamp(Math.round(num(params, 'n', 3)), 0, nMax));
  const [a, setA] = useState(a0);
  const [mode, setMode] = useState(oneOf(params, 'mode', ['taylor', 'remainder'] as const, 'taylor'));
  const [x0, setX0] = useState(() => numExpr(params, 'x', a0 + 1));
  const { names, args, values, set } = useSliderValues(defs);

  const tree: ExprNode = useMemo(() => parseOrThrow(fSrc, ['x', ...names]), [fSrc, names]);
  const fn = useMemo(() => compile(fSrc, ['x', ...names]), [fSrc, names]);
  const argKey = args.join(',');
  const vars = useMemo(() => [0, ...args], [argKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const f = useMemo(() => (x: number) => fn(x, ...args), [fn, argKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Coefficients about a, up to nMax + 1 (the next one is needed for the remainder).
  const coeffs = useMemo((): { c: number[] } | { error: string } => {
    try {
      return { c: taylorCoeffs(tree, a, vars, nMax + 1) };
    } catch (e) {
      if (e instanceof NotAnalytic) return { error: e.message };
      throw e;
    }
  }, [tree, a, vars, nMax]);
  const c = 'c' in coeffs ? coeffs.c : null;
  const T = useMemo(() => (c ? (x: number) => evalPoly(c, a, x, n) : null), [c, a, n]);

  // A polynomial (the binomial series with a whole-number k, say) has R = infinity whatever sing says.
  const isPoly = useMemo(() => {
    if (!c || c.length < 6) return false;
    const ref = Math.max(...c.map(Math.abs));
    let k = c.length;
    while (k > 0 && Math.abs(c[k - 1]) <= 1e-13 * ref) k--;
    return c.length - k >= 4;
  }, [c]);
  const R = isPoly ? Infinity : radius(sing, fixedR, a);
  const ends: Ends | undefined = a === a0 ? (choice ? LIBRARY[choice].ends : endsParam) : undefined;

  // |f^(n+1)(t)| / (n+1)! on a grid across the view, for the Lagrange bound.
  const nextCoef = useMemo(() => {
    if (mode !== 'remainder' && !showErr) return null;
    const xs: number[] = [];
    const ys: number[] = [];
    const m = 240;
    for (let i = 0; i <= m; i++) {
      const t = v[0] + ((v[1] - v[0]) * i) / m;
      const s = tryTaylor(tree, t, vars, n + 1);
      xs.push(t);
      ys.push(s ? Math.abs(s[n + 1]) : Infinity);
    }
    return { xs, ys };
  }, [tree, vars, n, v[0], v[1], mode, showErr]); // eslint-disable-line react-hooks/exhaustive-deps

  /** max |f^(n+1)|/(n+1)! between a and x: exact samples at a, x and the grid between. */
  const maxNext = (x: number): number => {
    let m = 0;
    const lo = Math.min(a, x);
    const hi = Math.max(a, x);
    for (const t of [a, x]) {
      const s = tryTaylor(tree, t, vars, n + 1);
      m = Math.max(m, s ? Math.abs(s[n + 1]) : Infinity);
    }
    if (nextCoef) nextCoef.xs.forEach((t, i) => t > lo && t < hi && (m = Math.max(m, nextCoef.ys[i])));
    // A finer pass between a and x, so the bound does not depend on the view.
    for (let i = 1; i < 60; i++) {
      const t = lo + ((hi - lo) * i) / 60;
      const s = tryTaylor(tree, t, vars, n + 1);
      m = Math.max(m, s ? Math.abs(s[n + 1]) : Infinity);
    }
    return m;
  };

  // The bound curve for the error plot: cumulative maximum outward from a.
  const boundFn = useMemo(() => {
    if (mode !== 'remainder' || !nextCoef || !c) return null;
    const { xs, ys } = nextCoef;
    const i0 = xs.findIndex((t) => t >= a);
    const cm = new Array<number>(xs.length).fill(0);
    let run = Math.abs(c[n + 1]);
    for (let i = Math.max(0, i0); i < xs.length; i++) cm[i] = run = Math.max(run, ys[i]);
    run = Math.abs(c[n + 1]);
    for (let i = Math.max(0, i0) - 1; i >= 0; i--) cm[i] = run = Math.max(run, ys[i]);
    return (x: number) => {
      const i = clamp(Math.round(((x - xs[0]) / (xs[xs.length - 1] - xs[0])) * (xs.length - 1)), 0, xs.length - 1);
      return Math.log10(cm[i] * Math.pow(Math.abs(x - a), n + 1));
    };
  }, [mode, nextCoef, c, a, n]);

  const errLog = useMemo(() => (T ? (x: number) => Math.max(errView[0] - 1, Math.log10(Math.abs(f(x) - T(x)))) : null), [T, f, errView[0]]); // eslint-disable-line react-hooks/exhaustive-deps

  const interval = R !== undefined && R > 0 ? [a - R, a + R] : null;
  const span = v[1] - v[0];

  // Remainder mode numbers.
  const rem = useMemo(() => {
    if (mode !== 'remainder' || !T || !c) return null;
    const fx = f(x0);
    const tx = T(x0);
    const actual = fx - tx;
    const M = maxNext(x0);
    const bound = M * Math.pow(Math.abs(x0 - a), n + 1);
    // c with f^(n+1)(c)/(n+1)! (x - a)^(n+1) = R_n(x), from a sign change between a and x.
    let cPt: number | null = null;
    if (x0 !== a) {
      const h = Math.pow(x0 - a, n + 1);
      const g = (t: number) => {
        const s = tryTaylor(tree, t, vars, n + 1);
        return s ? s[n + 1] * h - actual : NaN;
      };
      let prevT = a;
      let prev = g(a);
      for (let i = 1; i <= 200 && cPt === null; i++) {
        const t = a + ((x0 - a) * i) / 200;
        const y = g(t);
        if (Number.isFinite(prev) && Number.isFinite(y) && (prev === 0 || prev * y < 0)) {
          let lo = prevT;
          let hi = t;
          let glo = prev;
          for (let k = 0; k < 40; k++) {
            const mid = (lo + hi) / 2;
            const gm = g(mid);
            if (glo * gm <= 0) hi = mid;
            else {
              lo = mid;
              glo = gm;
            }
          }
          cPt = (lo + hi) / 2;
        }
        prevT = t;
        prev = y;
      }
    }
    return { fx, tx, actual, M, bound, cPt };
  }, [mode, T, c, f, x0, a, n, tree, vars]); // eslint-disable-line react-hooks/exhaustive-deps

  const fLabel = choice ? LIBRARY[choice].label : 'f(x)';
  const yTicks = (k: number) => pow10Label(Math.round(k));

  return (
    <Frame title={str(params, 'title', mode === 'remainder' ? "Taylor's theorem: error and bound" : 'Taylor polynomials')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {(menu.length > 0 || canSwitch) && (
        <div className="flex flex-wrap items-end gap-3">
          {menu.length > 0 && (
            <Segmented
              label="Function"
              options={menu.map((m) => ({ value: m, label: <Tex>{LIBRARY[m].label}</Tex> }))}
              value={choice}
              onChange={(m) => {
                setChoice(m);
                setA(a0);
              }}
            />
          )}
          {canSwitch && (
            <Segmented
              label="Mode"
              options={[
                { value: 'taylor', label: 'Polynomials' },
                { value: 'remainder', label: 'Error bound' },
              ]}
              value={mode}
              onChange={setMode}
            />
          )}
        </div>
      )}
      <Plot view={v} label={`Graph of ${fSrc} and its Taylor polynomial of degree ${n} about ${fmt(a)}`}>
        {interval && R !== Infinity && <Rect x={Math.max(interval[0], v[0] - span)} y={v[2]} w={Math.min(interval[1], v[1] + span) - Math.max(interval[0], v[0] - span)} h={v[3] - v[2]} fill="var(--plot-3)" opacity={0.08} />}
        {interval &&
          interval.map((e, i) => Number.isFinite(e) && (
            <Segment key={i} x1={e} y1={v[2]} x2={e} y2={v[3]} color="var(--plot-3)" dash="5 4" width={1.25} />
          ))}
        <FnPath f={f} color="var(--plot-1)" width={2.5} />
        {T && <FnPath f={T} color="var(--plot-2)" width={2.25} />}
        {interval && ends && (
          <>
            <Dot x={interval[0]} y={0} r={5} color="var(--plot-3)" hollow={ends[0] === '('} />
            <Dot x={interval[1]} y={0} r={5} color="var(--plot-3)" hollow={ends[1] === ')'} />
          </>
        )}
        {c && <Dot x={a} y={c[0]} r={5} color="var(--plot-2)" />}
        {rem && (
          <>
            <Segment x1={x0} y1={rem.tx - rem.bound} x2={x0} y2={rem.tx + rem.bound} color="var(--plot-4)" width={6} opacity={0.45} />
            <Segment x1={x0} y1={rem.tx} x2={x0} y2={rem.fx} color="var(--plot-2)" width={2} />
            <Dot x={x0} y={rem.tx} r={4} color="var(--plot-2)" />
            {rem.cPt !== null && (
              <>
                <Dot x={rem.cPt} y={0} r={4.5} color="var(--plot-4)" />
                <Label x={rem.cPt} y={0} dx={0} dy={18} anchor="middle" color="var(--plot-4)">
                  c
                </Label>
              </>
            )}
            <Draggable x={x0} y={rem.fx} onChange={(nx) => setX0(clamp(nx, v[0], v[1]))} constrain={(nx) => [nx, f(nx)]} label="Point x" color="var(--plot-1)" />
          </>
        )}
        <Label x={a} y={c ? c[0] : 0} dx={8} dy={16} color="var(--plot-2)">
          a
        </Label>
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: fLabel },
          { color: 'var(--plot-2)', label: `T_{${n}}(x)` },
          ...(interval && R !== Infinity ? [{ color: 'var(--plot-3)', label: '|x-a|<R', box: true }] : []),
          ...(rem ? [{ color: 'var(--plot-4)', label: `T_{${n}}(x)\\pm\\text{bound}`, box: true }] : []),
        ]}
      />
      {'error' in coeffs && (
        <Note tone="warn">
          This function has no Taylor series at a = {fmt(a)} ({coeffs.error}). Move the centre.
        </Note>
      )}
      {showErr && errLog && (
        <div>
          <div className="mb-1 text-xs text-ink-3">
            <Tex>{`\\text{Error } |f(x)-T_{${n}}(x)|`}</Tex>
            {rem && (
              <>
                {' '}
                <span>and the Lagrange bound (dashed), log scale</span>
              </>
            )}
            {!rem && <span> on a log scale</span>}
          </div>
          {/* Shifted so x = v[0] sits at 0: the log axis then runs down the left edge, clear of the curve. */}
          <Plot view={[0, span, errView[0], errView[1]]} aspect={0.3} minHeight={130} maxHeight={200} yStep={2} yTickFormat={yTicks} xTickFormat={() => ''} label="Error on a logarithmic scale">
            {interval && R !== Infinity && <Rect x={Math.max(interval[0], v[0] - span) - v[0]} y={errView[0]} w={Math.min(interval[1], v[1] + span) - Math.max(interval[0], v[0] - span)} h={errView[1] - errView[0]} fill="var(--plot-3)" opacity={0.08} />}
            <FnPath f={(u) => errLog(u + v[0])} color="var(--plot-2)" width={2} />
            {boundFn && <FnPath f={(u) => boundFn(u + v[0])} color="var(--plot-4)" width={2} dash="6 4" />}
            {rem && <Segment x1={x0 - v[0]} y1={errView[0]} x2={x0 - v[0]} y2={errView[1]} color="var(--plot-1)" dash="3 3" width={1.25} />}
            <Segment x1={a - v[0]} y1={errView[0]} x2={a - v[0]} y2={errView[1]} color="var(--plot-2)" dash="2 4" width={1} opacity={0.6} />
          </Plot>
        </div>
      )}
      {c && (
        <div className="overflow-x-auto rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm">
          <Tex>{`T_{${n}}(x)=${polyTex(c, a, n)}`}</Tex>
        </div>
      )}
      <Controls>
        <Slider label={<Tex>{`\\text{Degree } n`}</Tex>} value={n} min={0} max={nMax} step={1} onChange={(k) => setN(Math.round(k))} format={(k) => `${k}`} />
        {aRange && <Slider label={<Tex>{'\\text{Centre } a'}</Tex>} value={a} min={aRange[0]} max={aRange[1]} step={(aRange[1] - aRange[0]) / 100} onChange={setA} />}
        {mode === 'remainder' && <Slider label={<Tex>x</Tex>} value={x0} min={v[0]} max={v[1]} step={(v[1] - v[0]) / 400} onChange={setX0} />}
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      {rem ? (
        <ReadoutGrid>
          <Readout label="Actual error" value={sci(Math.abs(rem.actual))} tone="var(--plot-2)" />
          <Readout label="Lagrange bound" value={sci(rem.bound)} tone="var(--plot-4)" />
          <Readout label="Point c" value={rem.cPt === null ? '—' : fmt(rem.cPt, 4)} tone="var(--plot-4)" />
          <Readout label="Bound constant M" value={Number.isFinite(rem.M) ? sci(rem.M * factorialInt(n + 1)) : '∞'} />
          <Readout label="Function value" value={fmt(rem.fx, 6)} tone="var(--plot-1)" />
          <Readout label="Polynomial value" value={fmt(rem.tx, 6)} />
        </ReadoutGrid>
      ) : (
        <ReadoutGrid>
          <Readout label="Radius R" value={R === undefined ? 'not given' : R === Infinity ? '∞' : fmt(R, 4)} tone="var(--plot-3)" />
          <Readout label="Interval" value={intervalText(a, R, ends)} tone="var(--plot-3)" />
          <Readout label="Next coefficient cₙ₊₁" value={c ? sci(c[n + 1]) : '—'} />
        </ReadoutGrid>
      )}
    </Frame>
  );
}

function factorialInt(k: number): number {
  let r = 1;
  for (let i = 2; i <= k; i++) r *= i;
  return r;
}

function intervalText(a: number, R: number | undefined, ends: Ends | undefined): string {
  if (R === undefined) return '—';
  if (R === Infinity) return 'all real x';
  if (R === 0) return `x = ${fmt(a)} only`;
  const lo = fmt(a - R, 3);
  const hi = fmt(a + R, 3);
  if (!ends) return `|x − ${fmt(a)}| < ${fmt(R, 3)}, ends?`;
  return `${ends[0]}${lo}, ${hi}${ends[1]}`;
}
