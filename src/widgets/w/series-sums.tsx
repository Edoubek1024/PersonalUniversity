/**
 * series-sums: the terms a_n and partial sums s_n of a sequence or series, with several views
 * that share one picture of the terms:
 *   sums         terms and partial sums, with the sum S as a line when known
 *   sequence     terms only, with the limit L and an epsilon band, and the N after which every
 *                term stays inside
 *   integral     the integral test: rectangles of width 1 over and under y = f(x)
 *   alternating  partial sums zig-zagging onto S, with the bound |S - s_N| <= b_{N+1}
 *   ratio        |a_{n+1}/a_n| (or the n-th root of |a_n|) tending to its limit L
 *
 * Params:
 *   preset   "harmonic" | "p" | "geometric" | "alt-harmonic" | "alt-p" | "telescoping"
 *   presets  string[]   presets to switch between (the first is shown first)
 *   a        string     term in n and slider names; factorials allowed ("n!/n^n")
 *   rec      string     instead of a: the next term from the previous one, in a and n
 *                       (a_{n+1} = rec(a_n, n)), with a1 the first term
 *   a1       number     first term for rec                                default 1
 *   n0       number     first index                                       default 1
 *   sum      string | number   the sum S, in slider names ("1/(1-r)")
 *   converges string   expression in slider names, > 0 when the series converges (for sum)
 *   limit    string | number   the limit L of the terms (sequence mode)  default 0
 *   L        string | number   the limit of the ratio or root (ratio mode)
 *   tail     string     integral of f from n to infinity, in n and slider names (integral mode)
 *   N        number     initial N                                         default 10
 *   NMax     number     largest N (<= 400)                                default 40
 *   eps      number     initial epsilon (sequence mode)                   default 0.1
 *   mode     one of the modes above                                       default "sums"
 *   modes    string[]   modes to switch between                           default [mode]
 *   termsView, sumsView   [yMin, yMax] overrides                          default automatic
 *   sliders  {name: [initial, min, max, step?]}                           default {}
 *   title, caption   strings
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { compile } from '../kit/expr';
import { num, numArray, oneOf, sliders as readSliders, str, strArray, type SliderDef } from '../kit/params';
import { Dot, FnPath, Plot, Rect, Segment } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { compileF, sci } from '../kit/calc2-num';
import { Legend, ParamSliders, useSliderValues, ReadoutGrid } from '../kit/calc2-ui';

const MODES = ['sums', 'sequence', 'integral', 'alternating', 'ratio'] as const;
type Mode = (typeof MODES)[number];
const MODE_LABEL: Record<Mode, string> = { sums: 'Terms and sums', sequence: 'Sequence limit', integral: 'Integral test', alternating: 'Alternating bound', ratio: 'Ratio and root' };

interface Config {
  label: string;
  a?: string;
  rec?: string;
  a1: number;
  n0: number;
  sliders: SliderDef[];
  /** Sum as a function of slider values, or null when it diverges. */
  sum?: (args: number[]) => number | null;
  limit?: (args: number[]) => number;
  L?: (args: number[]) => number;
  tail?: string;
  tex: (args: number[]) => string;
}

function zeta(p: number): number {
  // Euler–Maclaurin with N = 12.
  const N = 12;
  let s = 0;
  for (let n = 1; n < N; n++) s += Math.pow(n, -p);
  return s + Math.pow(N, 1 - p) / (p - 1) + Math.pow(N, -p) / 2 + (p * Math.pow(N, -p - 1)) / 12 - (p * (p + 1) * (p + 2) * Math.pow(N, -p - 3)) / 720 + (p * (p + 1) * (p + 2) * (p + 3) * (p + 4) * Math.pow(N, -p - 5)) / 30240;
}

/** Sum of the alternating series sum (-1)^k b_k (k >= 0) by Cohen–Villegas–Zagier acceleration. */
function alternatingSum(b: (k: number) => number, n = 40): number {
  let d = Math.pow(3 + Math.sqrt(8), n);
  d = (d + 1 / d) / 2;
  let bb = -1;
  let c = -d;
  let s = 0;
  for (let k = 0; k < n; k++) {
    c = bb - c;
    s += c * b(k);
    bb = ((k + n) * (k - n) * bb) / ((k + 0.5) * (k + 1));
  }
  return s / d;
}

const pSlider = (v: number): SliderDef => ({ name: 'p', value: v, min: 0.2, max: 4, step: 0.05 });

const PRESETS: Record<string, () => Config> = {
  harmonic: () => ({ label: 'Harmonic', a: '1/n', a1: 1, n0: 1, sliders: [], sum: () => null, L: () => 1, tex: () => '\\sum \\frac1n' }),
  p: () => ({
    label: 'p-series',
    a: '1/n^p',
    a1: 1,
    n0: 1,
    sliders: [pSlider(2)],
    sum: ([p]) => (p > 1 ? zeta(p) : null),
    tail: 'n^(1-p)/(p-1)',
    L: () => 1,
    tex: ([p]) => `\\sum \\frac{1}{n^{${fmt(p)}}}`,
  }),
  geometric: () => ({
    label: 'Geometric',
    a: 'r^(n-1)',
    a1: 1,
    n0: 1,
    sliders: [{ name: 'r', value: 0.5, min: -1.2, max: 1.2, step: 0.01 }],
    sum: ([r]) => (Math.abs(r) < 1 ? 1 / (1 - r) : null),
    L: ([r]) => Math.abs(r),
    tex: ([r]) => `\\sum r^{n-1},\\ r=${fmt(r)}`,
  }),
  'alt-harmonic': () => ({ label: 'Alternating harmonic', a: '(-1)^(n-1)/n', a1: 1, n0: 1, sliders: [], sum: () => Math.LN2, L: () => 1, tex: () => '\\sum \\frac{(-1)^{n-1}}{n}' }),
  'alt-p': () => ({
    label: 'Alternating p-series',
    a: '(-1)^(n-1)/n^p',
    a1: 1,
    n0: 1,
    sliders: [pSlider(2)],
    sum: ([p]) => alternatingSum((k) => Math.pow(k + 1, -p)),
    L: () => 1,
    tex: ([p]) => `\\sum \\frac{(-1)^{n-1}}{n^{${fmt(p)}}}`,
  }),
  telescoping: () => ({ label: 'Telescoping', a: '1/(n*(n+1))', a1: 1, n0: 1, sliders: [], sum: () => 1, tex: () => '\\sum \\frac{1}{n(n+1)}' }),
};

function exprOrNumber(p: Record<string, unknown>, key: string, names: string[]): ((args: number[]) => number) | undefined {
  const v = p[key];
  if (v === undefined) return undefined;
  if (typeof v === 'number' && Number.isFinite(v)) return () => v;
  if (typeof v === 'string') {
    let fn: (...a: number[]) => number;
    try {
      fn = compile(v, names);
    } catch (e) {
      throw new Error(`parameter "${key}": ${(e as Error).message} in "${v}"`);
    }
    return (args) => fn(...args);
  }
  throw new Error(`parameter "${key}" should be a number or an expression, got ${JSON.stringify(v)}`);
}

function customConfig(params: Record<string, unknown>): Config {
  const sliders = readSliders(params, 'sliders');
  const names = sliders.map((s) => s.name);
  const sumFn = exprOrNumber(params, 'sum', names);
  const conv = exprOrNumber(params, 'converges', names);
  const a = typeof params.a === 'string' ? str(params, 'a', '1/n') : undefined;
  const rec = typeof params.rec === 'string' ? str(params, 'rec', 'a') : undefined;
  if (!a && !rec) throw new Error('give a term "a" (in n), a recursion "rec" (in a and n), or a "preset"');
  return {
    label: 'Custom',
    a,
    rec,
    a1: num(params, 'a1', 1),
    n0: Math.round(num(params, 'n0', 1)),
    sliders,
    sum: sumFn ? (args) => (conv && !(conv(args) > 0) ? null : sumFn(args)) : undefined,
    limit: exprOrNumber(params, 'limit', names),
    L: exprOrNumber(params, 'L', names),
    tail: typeof params.tail === 'string' ? str(params, 'tail', '') : undefined,
    tex: () => '',
  };
}

export default function SeriesSums({ params }: WidgetProps) {
  const list = params.presets !== undefined ? strArray(params, 'presets', []) : params.preset !== undefined ? [str(params, 'preset', 'harmonic')] : [];
  for (const k of list) if (!(k in PRESETS)) throw new Error(`unknown preset "${k}" (use ${Object.keys(PRESETS).join(', ')})`);
  const [which, setWhich] = useState(list[0] ?? '');
  const config = useMemo(() => (which ? PRESETS[which]() : customConfig(params)), [which]); // eslint-disable-line react-hooks/exhaustive-deps
  const mode0 = oneOf(params, 'mode', MODES, 'sums');
  const modes = (params.modes !== undefined ? strArray(params, 'modes', []) : [mode0]) as Mode[];
  for (const m of modes) if (!MODES.includes(m)) throw new Error(`unknown mode "${m}" (use ${MODES.join(', ')})`);
  const [mode, setMode] = useState<Mode>(modes.includes(mode0) ? mode0 : modes[0]);

  return (
    <Frame title={str(params, 'title', MODE_LABEL[mode])} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {(list.length > 1 || modes.length > 1) && (
        <div className="flex flex-wrap items-end gap-3">
          {list.length > 1 && <Segmented label="Series" options={list.map((k) => ({ value: k, label: PRESETS[k]().label }))} value={which} onChange={setWhich} />}
          {modes.length > 1 && <Segmented label="View" options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={setMode} />}
        </div>
      )}
      <SeriesView key={which} config={config} mode={mode} params={params} />
    </Frame>
  );
}

function SeriesView({ config, mode, params }: { config: Config; mode: Mode; params: Record<string, unknown> }) {
  const { n0, sliders: defs } = config;
  const NMax = clamp(Math.round(num(params, 'NMax', mode === 'integral' ? 16 : 40)), n0 + 2, 400);
  const [N, setN] = useState(() => clamp(Math.round(num(params, 'N', mode === 'integral' ? 8 : 10)), n0, NMax));
  const [eps, setEps] = useState(() => num(params, 'eps', 0.1));
  const [root, setRoot] = useState(false);
  const { names, args, values, set } = useSliderValues(defs);
  const argKey = args.join(',');

  const termFn = useMemo(() => (config.a ? compileF(config.a, ['n', ...names]) : null), [config.a, names]);
  const recFn = useMemo(() => (config.rec ? compileF(config.rec, ['a', 'n', ...names]) : null), [config.rec, names]);
  const tailFn = useMemo(() => (config.tail ? compile(config.tail, ['n', ...names]) : null), [config.tail, names]);

  // Terms a_{n0} ... a_{NMax+1} and partial sums.
  const data = useMemo(() => {
    const a: number[] = [];
    const s: number[] = [];
    let acc = 0;
    let prev = config.a1;
    for (let n = n0; n <= NMax + 1; n++) {
      const t = termFn ? termFn(n, ...args) : n === n0 ? config.a1 : recFn!(prev, n - 1, ...args);
      prev = t;
      a.push(t);
      acc += t;
      s.push(acc);
    }
    return { a, s };
  }, [termFn, recFn, n0, NMax, config.a1, argKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const at = (n: number) => data.a[n - n0];
  const sAt = (n: number) => data.s[n - n0];
  const S = config.sum ? config.sum(args) : undefined;
  const L = config.limit ? config.limit(args) : 0;
  const Lratio = config.L ? config.L(args) : undefined;
  const ns = useMemo(() => Array.from({ length: NMax - n0 + 1 }, (_, i) => n0 + i), [n0, NMax]);

  const range = (ys: number[], extra: number[] = [], override?: unknown, withZero = true): [number, number] => {
    if (override !== undefined) {
      const r = override as number[];
      return [r[0], r[1]];
    }
    const fin = [...ys, ...extra].filter(Number.isFinite);
    let lo = withZero ? Math.min(0, ...fin) : Math.min(...fin);
    let hi = withZero ? Math.max(0, ...fin) : Math.max(...fin);
    if (hi - lo < 1e-9) hi = lo + 1;
    const pad = (hi - lo) * 0.1;
    return [lo - pad, hi + pad];
  };
  const termsOverride = params.termsView !== undefined ? numArray(params, 'termsView', [0, 1]) : undefined;
  const sumsOverride = params.sumsView !== undefined ? numArray(params, 'sumsView', [0, 1]) : undefined;
  // Terms that grow without bound are clipped so the first ones stay readable.
  const capped = (ys: number[]) => {
    const fin = ys.filter(Number.isFinite).map(Math.abs).sort((p, q) => p - q);
    const cap = fin.length ? Math.max(fin[Math.floor(fin.length * 0.6)] * 4, Math.abs(ys[0]) * 1.2) : 1;
    return ys.map((y) => clamp(y, -cap, cap));
  };
  const ty = range(capped(data.a.slice(0, NMax - n0 + 1)), mode === 'sequence' ? [L + eps, L - eps] : [], termsOverride);
  // Alternating sums zig-zag around S, so their plot need not include 0.
  const sy = range(capped(data.s.slice(0, NMax - n0 + 1)), S !== undefined && S !== null ? [S] : [], sumsOverride, mode !== 'alternating');
  // Room on the left for the y-axis labels, which sit left of x = 0.
  const xv: [number, number] = [Math.min(n0 - 0.6, -0.09 * (NMax - n0 + 2)), NMax + 0.6];
  const clipY = (y: number, r: [number, number]) => clamp(y, r[0] - (r[1] - r[0]), r[1] + (r[1] - r[0]));

  const termsPlot = (extra?: ReactNode, highlight?: (n: number) => string) => (
    <Plot view={[xv[0], xv[1], ty[0], ty[1]]} aspect={0.36} minHeight={150} maxHeight={240} xLabel="n" label="Terms of the sequence">
      {extra}
      {ns.map((n) => {
        const y = clipY(at(n), ty);
        const col = highlight ? highlight(n) : n <= N ? 'var(--plot-1)' : 'var(--plot-axis)';
        return (
          <g key={n} opacity={n <= N ? 1 : 0.45}>
            <Segment x1={n} y1={0} x2={n} y2={y} color={col} width={1.5} />
            <Dot x={n} y={y} r={n === N ? 4.5 : 2.8} color={col} />
          </g>
        );
      })}
    </Plot>
  );

  const nSlider = <Slider label={<Tex>N</Tex>} value={N} min={n0} max={NMax} step={1} onChange={(k) => setN(Math.round(k))} format={(k) => `${k}`} />;
  const sumText = S === undefined ? 'not given' : S === null ? 'diverges' : fmt(S, 6);

  if (mode === 'sequence') {
    // The last n in range with |a_n - L| >= eps: beyond it every computed term is inside the band.
    let last = n0 - 1;
    for (const n of ns) if (!(Math.abs(at(n) - L) < eps)) last = n;
    const inside = (n: number) => Math.abs(at(n) - L) < eps;
    return (
      <>
        {termsPlot(
          <>
            <Rect x={xv[0]} y={L - eps} w={xv[1] - xv[0]} h={2 * eps} fill="var(--plot-3)" opacity={0.14} />
            <Segment x1={xv[0]} y1={L} x2={xv[1]} y2={L} color="var(--plot-3)" dash="6 4" width={1.5} />
            {last >= n0 && last < NMax && <Segment x1={last + 0.5} y1={ty[0]} x2={last + 0.5} y2={ty[1]} color="var(--plot-4)" dash="3 3" width={1.5} />}
          </>,
          (n) => (inside(n) ? 'var(--plot-1)' : 'var(--plot-2)'),
        )}
        <Legend
          items={[
            { color: 'var(--plot-1)', label: 'a_n\\text{ within }\\varepsilon\\text{ of }L' },
            { color: 'var(--plot-2)', label: '|a_n-L|\\ge\\varepsilon' },
            { color: 'var(--plot-3)', label: `L\\pm\\varepsilon`, box: true },
          ]}
        />
        <Controls>
          <Slider label={<Tex>\varepsilon</Tex>} value={eps} min={0.001} max={Math.max(0.3, eps)} step={0.001} onChange={setEps} />
          {nSlider}
          <ParamSliders defs={defs} values={values} set={set} />
        </Controls>
        <ReadoutGrid>
          <Readout label="Limit L" value={fmt(L, 5)} tone="var(--plot-3)" />
          <Readout label="Term at N" value={Math.abs(at(N)) < 1e-3 ? sci(at(N)) : fmt(at(N), 6)} tone="var(--plot-1)" />
          <Readout label="Inside the band for all n >" value={last >= NMax ? `beyond ${NMax}` : `${Math.max(last, n0 - 1)}`} tone="var(--plot-4)" />
        </ReadoutGrid>
      </>
    );
  }

  if (mode === 'integral') {
    const fx = (x: number) => (termFn ? termFn(x, ...args) : NaN);
    const top = Math.max(at(n0) * 1.15, 1e-9);
    const view: [number, number, number, number] = [Math.min(n0 - 0.6, -0.1 * (NMax - n0 + 2)), NMax + 1.2, -top * 0.06, top];
    let lower = 0;
    let upper = 0;
    for (let n = n0 + 1; n <= N; n++) lower += at(n);
    for (let n = n0; n <= N - 1; n++) upper += at(n);
    // The integral from n0 to N by Simpson on unit pieces.
    let integral = 0;
    for (let k = n0; k < N; k++) {
      const m = 16;
      let s = fx(k) + fx(k + 1);
      for (let j = 1; j < m; j++) s += (j % 2 ? 4 : 2) * fx(k + j / m);
      integral += s / (3 * m);
    }
    const tl = tailFn ? [tailFn(N + 1, ...args), tailFn(N, ...args)] : null;
    const tailOk = tl && tl.every((t) => Number.isFinite(t) && t >= 0);
    return (
      <>
        <Plot view={view} aspect={0.5} minHeight={200} maxHeight={340} xLabel="x" label="Integral test rectangles">
          {ns
            .filter((n) => n <= N - 1)
            .map((n) => (
              <Rect key={`u${n}`} x={n} y={0} w={1} h={at(n)} fill="var(--plot-2)" opacity={0.16} color="var(--plot-2)" width={1} />
            ))}
          {ns
            .filter((n) => n >= n0 + 1 && n <= N)
            .map((n) => (
              <Rect key={`l${n}`} x={n - 1} y={0} w={1} h={at(n)} fill="var(--plot-3)" opacity={0.32} color="var(--plot-3)" width={1} />
            ))}
          <FnPath f={fx} from={n0 - 0.5 > 0 ? n0 - 0.5 : n0} color="var(--plot-1)" width={2.5} />
          <Segment x1={N} y1={0} x2={N} y2={top} color="var(--plot-4)" dash="3 3" width={1.25} />
        </Plot>
        <Legend
          items={[
            { color: 'var(--plot-1)', label: 'y=f(x),\\ f(n)=a_n' },
            { color: 'var(--plot-2)', label: `\\textstyle\\sum_{n=${n0}}^{N-1}a_n\\ \\text{(over)}`, box: true },
            { color: 'var(--plot-3)', label: `\\textstyle\\sum_{n=${n0 + 1}}^{N}a_n\\ \\text{(under)}`, box: true },
          ]}
        />
        <Controls>
          {nSlider}
          <ParamSliders defs={defs} values={values} set={set} />
        </Controls>
        <ReadoutGrid>
          <Readout label="Sum under the curve" value={fmt(lower, 5)} tone="var(--plot-3)" />
          <Readout label={`Integral from ${n0} to N`} value={fmt(integral, 5)} tone="var(--plot-1)" />
          <Readout label="Sum over the curve" value={fmt(upper, 5)} tone="var(--plot-2)" />
        </ReadoutGrid>
        {tailOk && tl ? (
          <Note>
            <Tex>{`s_{${N}}=${fmt(sAt(N), 6).replace('−', '-')},\\quad s_{${N}}+\\int_{${N + 1}}^\\infty f\\,dx=${fmt(sAt(N) + tl[0], 6).replace('−', '-')}\\ \\le S\\le\\ s_{${N}}+\\int_{${N}}^\\infty f\\,dx=${fmt(sAt(N) + tl[1], 6).replace('−', '-')}`}</Tex>
            {S !== undefined && S !== null && (
              <>
                {' '}
                (the true sum is {fmt(S, 6)})
              </>
            )}
          </Note>
        ) : tailFn ? (
          <Note tone="warn">The integral from N to ∞ diverges here, so the sum is infinite too.</Note>
        ) : null}
      </>
    );
  }

  if (mode === 'alternating') {
    const b = Math.abs(at(N + 1));
    const sN = sAt(N);
    const err = S !== undefined && S !== null ? Math.abs(S - sN) : NaN;
    return (
      <>
        <Plot view={[xv[0], xv[1], sy[0], sy[1]]} aspect={0.45} minHeight={190} maxHeight={320} xLabel="n" label="Partial sums of an alternating series">
          {S !== undefined && S !== null && <Segment x1={xv[0]} y1={S} x2={xv[1]} y2={S} color="var(--plot-3)" dash="6 4" width={1.5} />}
          <Rect x={N - 0.35} y={sN - b} w={0.7} h={2 * b} fill="var(--plot-4)" opacity={0.3} color="var(--plot-4)" />
          {ns.slice(1).map((n) => (
            <Segment key={`z${n}`} x1={n - 1} y1={clipY(sAt(n - 1), sy)} x2={n} y2={clipY(sAt(n), sy)} color={n <= N ? 'var(--plot-2)' : 'var(--plot-axis)'} width={1.25} opacity={n <= N ? 0.8 : 0.35} />
          ))}
          {ns.map((n) => (
            <Dot key={n} x={n} y={clipY(sAt(n), sy)} r={n === N ? 4.5 : 2.8} color={n <= N ? 'var(--plot-2)' : 'var(--plot-axis)'} />
          ))}
        </Plot>
        <Legend
          items={[
            { color: 'var(--plot-2)', label: 's_n' },
            { color: 'var(--plot-3)', label: 'S', dash: true },
            { color: 'var(--plot-4)', label: `s_N\\pm b_{N+1}`, box: true },
          ]}
        />
        <Controls>
          {nSlider}
          <ParamSliders defs={defs} values={values} set={set} />
        </Controls>
        <ReadoutGrid>
          <Readout label="Partial sum at N" value={fmt(sN, 6)} tone="var(--plot-2)" />
          <Readout label="Bound: first omitted term" value={sci(b)} tone="var(--plot-4)" />
          <Readout label="Actual error" value={Number.isFinite(err) ? sci(err) : '—'} tone="var(--plot-3)" />
        </ReadoutGrid>
      </>
    );
  }

  if (mode === 'ratio') {
    const vals = ns.map((n) => (root ? Math.pow(Math.abs(at(n)), 1 / n) : Math.abs(at(n + 1) / at(n))));
    const hi = Math.max(1.4, ...(Lratio !== undefined ? [Lratio * 1.2] : []), ...vals.filter(Number.isFinite).slice(2).map((y) => Math.min(y * 1.1, 4)));
    const view: [number, number, number, number] = [xv[0], xv[1], 0, hi];
    const cur = vals[N - n0];
    const verdict = Lratio === undefined ? '' : Lratio < 1 - 1e-9 ? 'L < 1: converges absolutely' : Lratio > 1 + 1e-9 ? 'L > 1: diverges' : 'L = 1: the test says nothing';
    return (
      <>
        <Segmented
          options={[
            { value: 'ratio', label: 'Ratio |aₙ₊₁/aₙ|' },
            { value: 'root', label: 'Root |aₙ|^(1/n)' },
          ]}
          value={root ? 'root' : 'ratio'}
          onChange={(v) => setRoot(v === 'root')}
        />
        <Plot view={view} aspect={0.42} minHeight={180} maxHeight={300} xLabel="n" label="Ratio or root of the terms">
          <Segment x1={xv[0]} y1={1} x2={xv[1]} y2={1} color="var(--plot-axis)" width={1.5} />
          {Lratio !== undefined && <Segment x1={xv[0]} y1={Lratio} x2={xv[1]} y2={Lratio} color="var(--plot-3)" dash="6 4" width={1.75} />}
          {ns.map((n, i) => (
            <Dot key={n} x={n} y={clamp(vals[i], -1, hi * 2)} r={n === N ? 4.5 : 2.8} color={n <= N ? 'var(--plot-5)' : 'var(--plot-axis)'} />
          ))}
        </Plot>
        <Legend
          items={[
            { color: 'var(--plot-5)', label: root ? '\\sqrt[n]{|a_n|}' : '|a_{n+1}/a_n|' },
            ...(Lratio !== undefined ? [{ color: 'var(--plot-3)', label: 'L', dash: true }] : []),
            { color: 'var(--plot-axis)', label: '1' },
          ]}
        />
        <Controls>
          {nSlider}
          <ParamSliders defs={defs} values={values} set={set} />
        </Controls>
        <ReadoutGrid>
          <Readout label={root ? 'Root at N' : 'Ratio at N'} value={fmt(cur, 6)} tone="var(--plot-5)" />
          <Readout label="Limit L" value={Lratio === undefined ? '—' : fmt(Lratio, 5)} tone="var(--plot-3)" />
          <Readout label="Partial sum at N" value={fmt(sAt(N), 6)} />
        </ReadoutGrid>
        {verdict && <Note tone={Lratio! < 1 - 1e-9 ? 'good' : Lratio! > 1 + 1e-9 ? 'warn' : 'info'}>{verdict}.</Note>}
      </>
    );
  }

  // sums
  return (
    <>
      {config.tex(args) && (
        <div className="text-sm">
          <Tex>{config.tex(args)}</Tex>
        </div>
      )}
      <div>
        <div className="mb-1 text-xs text-ink-3">
          <Tex>{'\\text{Terms } a_n'}</Tex>
        </div>
        {termsPlot()}
      </div>
      <div>
        <div className="mb-1 text-xs text-ink-3">
          <Tex>{'\\text{Partial sums } s_n=a_1+\\dots+a_n'}</Tex>
        </div>
        <Plot view={[xv[0], xv[1], sy[0], sy[1]]} aspect={0.36} minHeight={150} maxHeight={240} xLabel="n" label="Partial sums">
          {S !== undefined && S !== null && <Segment x1={xv[0]} y1={S} x2={xv[1]} y2={S} color="var(--plot-3)" dash="6 4" width={1.5} />}
          {ns.map((n) => (
            <Dot key={n} x={n} y={clipY(sAt(n), sy)} r={n === N ? 4.5 : 2.8} color={n <= N ? 'var(--plot-2)' : 'var(--plot-axis)'} />
          ))}
        </Plot>
      </div>
      <Controls>
        {nSlider}
        <ParamSliders defs={defs} values={values} set={set} />
      </Controls>
      <ReadoutGrid>
        <Readout label="Term at N" value={Math.abs(at(N)) < 1e-3 ? sci(at(N)) : fmt(at(N), 6)} tone="var(--plot-1)" />
        <Readout label="Partial sum at N" value={fmt(sAt(N), 6)} tone="var(--plot-2)" />
        <Readout label="Sum S" value={sumText} tone="var(--plot-3)" />
      </ReadoutGrid>
    </>
  );
}
