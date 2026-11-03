/**
 * fourier-series: the partial sum S_N of a Fourier series over the function it represents, with
 * the coefficients as a bar chart (or on log-log axes, to read the decay rate), a Gibbs overshoot
 * readout near jumps (or the maximum error when the extension is continuous), and closed-form
 * checks for the presets. In "sine" / "cosine" mode the data lives on (0, L) and is extended as
 * an odd / even function before the periodic extension. Coefficients are computed by Simpson's
 * rule, split at the breakpoints of the presets, with one-sided limits at the panel ends.
 *
 * Params:
 *   mode      "full" | "sine" | "cosine"   series type                         default "full"
 *   modes     string[]   series types offered as buttons                         default [mode]
 *   preset    "square" | "sawtooth" | "triangle" | "abs" | "parabola" | "custom"   default "square"
 *   presets   string[]   presets offered as buttons        default all that apply to the mode
 *   f         string     custom function of x, on (-L, L) for "full" and (0, L) otherwise
 *                        (giving f makes "custom" the default preset)          default "x^2" / "x"
 *   L         number | string   half-period, e.g. "pi"                          default pi
 *   N         number     initial number of harmonics                            default 5
 *   Nmax      number     slider maximum                                          default 50
 *   parseval  boolean    show Parseval's identity readout                       default false
 *   log       boolean    start with the coefficients on log-log axes            default false
 *   title, caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Plot, Dot, FnPath, Rect, Segment, Line } from '../kit/Plot';
import { Controls, ExprInput, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { numOrExpr, niceCeil } from '../kit/de-ode';

/** Readout labels are upper-cased by the kit; keep maths symbols as written. */
const nc = (s: string) => <span className="normal-case">{s}</span>;

type Mode = 'full' | 'sine' | 'cosine';
type Preset = 'square' | 'sawtooth' | 'triangle' | 'abs' | 'parabola' | 'custom';
const MODES = ['full', 'sine', 'cosine'] as const;
const PRESETS = ['square', 'sawtooth', 'triangle', 'abs', 'parabola', 'custom'] as const;
const MODE_LABEL: Record<Mode, string> = { full: 'Full series', sine: 'Sine series (odd)', cosine: 'Cosine series (even)' };

const sgn = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0);
const odd = (n: number) => (n % 2 === 1 ? 1 : 0);
const neg1 = (n: number) => (n % 2 === 0 ? 1 : -1);

/** Preset on (-L, L) for the full series, or on (0, L) for half-range series. */
function presetFn(p: Exclude<Preset, 'custom'>, L: number, half: boolean): (x: number) => number {
  switch (p) {
    case 'square':
      return half ? () => 1 : (x) => sgn(x);
    case 'sawtooth':
      return (x) => x;
    case 'triangle':
      return half ? (x) => (x <= L / 2 ? x : L - x) : (x) => (Math.abs(x) <= L / 2 ? x : sgn(x) * (L - Math.abs(x)));
    case 'abs':
      return (x) => Math.abs(x);
    case 'parabola':
      return half ? (x) => x * (L - x) : (x) => x * (L - Math.abs(x));
  }
}

function presetLabel(p: Preset, half: boolean): string {
  if (p === 'custom') return 'custom';
  if (half) return { square: '1', sawtooth: 'x', triangle: 'plucked △', abs: '|x|', parabola: 'x(L − x)' }[p];
  return { square: 'square', sawtooth: 'sawtooth x', triangle: 'triangle', abs: '|x|', parabola: 'x(L − |x|)' }[p];
}

/** Closed forms [a_n, b_n] for n >= 0 (a_0 included), where the lesson's formulas give them. */
function exact(p: Preset, mode: Mode, L: number): ((n: number) => [number, number]) | null {
  const P = Math.PI;
  if (p === 'custom') return null;
  if (mode === 'cosine') {
    switch (p) {
      case 'square':
        return (n) => [n === 0 ? 2 : 0, 0];
      case 'sawtooth':
      case 'abs':
        return (n) => [n === 0 ? L : (2 * L * (neg1(n) - 1)) / (n * n * P * P), 0];
      case 'triangle':
        return (n) => [n === 0 ? L / 2 : (2 * L * (1 + neg1(n)) * (Math.cos((n * P) / 2) - 1)) / (n * n * P * P), 0];
      case 'parabola':
        return (n) => [n === 0 ? (L * L) / 3 : (-2 * L * L * (1 + neg1(n))) / (n * n * P * P), 0];
    }
  }
  // Full series of the odd presets equals the sine series of their restriction to (0, L).
  switch (p) {
    case 'square':
      return (n) => [0, n === 0 ? 0 : (4 * odd(n)) / (n * P)];
    case 'sawtooth':
      return mode === 'full' || mode === 'sine' ? (n) => [0, n === 0 ? 0 : (-2 * L * neg1(n)) / (n * P)] : null;
    case 'triangle':
      return (n) => [0, n === 0 ? 0 : (4 * L * Math.sin((n * P) / 2)) / (n * n * P * P)];
    case 'parabola':
      return (n) => [0, n === 0 ? 0 : (4 * L * L * (1 - neg1(n))) / (n * n * n * P * P * P)];
    case 'abs':
      return mode === 'full' ? (n) => [n === 0 ? L : (2 * L * (neg1(n) - 1)) / (n * n * P * P), 0] : null;
  }
}

function formulaTex(p: Preset, mode: Mode): string | null {
  if (p === 'custom') return null;
  if (mode === 'cosine')
    return {
      square: 'a_0 = 2,\\ a_n = 0',
      sawtooth: 'a_0 = L,\\ a_n = \\frac{2L((-1)^n - 1)}{n^2\\pi^2}',
      abs: 'a_0 = L,\\ a_n = \\frac{2L((-1)^n - 1)}{n^2\\pi^2}',
      triangle: 'a_0 = \\tfrac{L}{2},\\ a_n = \\frac{2L(1 + (-1)^n)(\\cos\\frac{n\\pi}{2} - 1)}{n^2\\pi^2}',
      parabola: 'a_0 = \\tfrac{L^2}{3},\\ a_n = -\\frac{2L^2(1 + (-1)^n)}{n^2\\pi^2}',
    }[p];
  if (p === 'abs') return mode === 'full' ? 'a_0 = L,\\ a_n = \\frac{2L((-1)^n - 1)}{n^2\\pi^2},\\ b_n = 0' : null;
  return {
    square: 'b_n = \\frac{2(1 - (-1)^n)}{n\\pi}',
    sawtooth: 'b_n = \\frac{2L(-1)^{n+1}}{n\\pi}',
    triangle: 'b_n = \\frac{4L\\sin(n\\pi/2)}{n^2\\pi^2}',
    parabola: 'b_n = \\frac{4L^2(1 - (-1)^n)}{n^3\\pi^3}',
  }[p];
}

function simpsonPanel(a: number, b: number, m: number, out: { x: number[]; w: number[] }) {
  const h = (b - a) / m;
  const nudge = (b - a) * 1e-9;
  for (let i = 0; i <= m; i++) {
    const x = i === 0 ? a + nudge : i === m ? b - nudge : a + i * h;
    const w = ((i === 0 || i === m ? 1 : i % 2 ? 4 : 2) * h) / 3;
    out.x.push(x);
    out.w.push(w);
  }
}

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const pow10 = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? `10${String(Math.round(v)).replace(/./g, (ch) => SUP[ch] ?? ch)}` : '');

function piFormat(v: number): string {
  const k = Math.round((v / Math.PI) * 2);
  if (Math.abs(v - (k * Math.PI) / 2) > 1e-9) return fmt(v);
  if (k === 0) return '0';
  const [n, d] = k % 2 === 0 ? [k / 2, 1] : [k, 2];
  const s = n === 1 ? '' : n === -1 ? '−' : fmt(n);
  return d === 1 ? `${s}π` : `${s}π/2`;
}

export default function FourierSeries({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'full');
  const modes = strArray(params, 'modes', [mode0]) as Mode[];
  if (!modes.every((m) => (MODES as readonly string[]).includes(m))) throw new Error('parameter "modes" should list full, sine and/or cosine');
  const hasF = typeof params.f === 'string';
  const preset0 = oneOf(params, 'preset', PRESETS, hasF ? 'custom' : 'square');
  const presets = strArray(params, 'presets', mode0 === 'full' && modes.length === 1 ? ['square', 'sawtooth', 'triangle', 'abs', 'custom'] : ['square', 'sawtooth', 'triangle', 'parabola', 'custom']) as Preset[];
  if (!presets.every((p) => (PRESETS as readonly string[]).includes(p))) throw new Error(`parameter "presets" should list some of ${PRESETS.join(', ')}`);
  const L = numOrExpr(params, 'L', Math.PI);
  if (!(L > 0)) throw new Error('parameter "L" must be positive');
  const Nmax = Math.round(num(params, 'Nmax', 50));
  if (Nmax < 1 || Nmax > 400) throw new Error('parameter "Nmax" should be between 1 and 400');
  const showParseval = bool(params, 'parseval', false);

  const [mode, setMode] = useState<Mode>(mode0);
  const [preset, setPreset] = useState<Preset>(preset0);
  const [N, setN] = useState(() => clamp(Math.round(num(params, 'N', 5)), 1, Nmax));
  const [custom, setCustom] = useState(() => str(params, 'f', mode0 === 'full' ? 'x^2' : 'x'));
  const [logScale, setLogScale] = useState(bool(params, 'log', false));
  const half = mode !== 'full';

  const compiled = useMemo(() => tryCompile(custom, ['x', 'L']), [custom]);
  const customOk = !compiled.error;
  if (preset0 === 'custom' && compiled.error && custom === str(params, 'f', '')) throw new Error(compiled.error);

  // f on its own domain, and its extension to the whole line.
  const f = useMemo(() => {
    if (preset === 'custom') {
      const fn = compiled.fn;
      return fn ? (x: number) => fn(x, L) : () => NaN;
    }
    return presetFn(preset, L, half);
  }, [preset, compiled, L, half]);
  const ext = useMemo(() => {
    return (x: number) => {
      const r = x - 2 * L * Math.floor((x + L) / (2 * L));
      if (mode === 'full') return f(r);
      if (mode === 'sine') return r > 0 ? f(r) : r < 0 ? -f(-r) : 0;
      return f(Math.abs(r));
    };
  }, [f, mode, L]);

  // Coefficients a_n, b_n for n = 0..Nmax by Simpson's rule on panels split at -L, -L/2, 0, L/2, L.
  const coef = useMemo(() => {
    const nodes = { x: [] as number[], w: [] as number[] };
    const cuts = [-L, -L / 2, 0, L / 2, L];
    for (let i = 0; i < 4; i++) simpsonPanel(cuts[i], cuts[i + 1], 1200, nodes);
    const fx = nodes.x.map((x) => {
      // Inside (-L, L) the extension before periodic wrapping.
      if (mode === 'full') return f(x);
      if (mode === 'sine') return x > 0 ? f(x) : -f(-x);
      return f(Math.abs(x));
    });
    const a = new Float64Array(Nmax + 1);
    const b = new Float64Array(Nmax + 1);
    let energy = 0;
    for (let j = 0; j < fx.length; j++) if (Number.isFinite(fx[j])) energy += nodes.w[j] * fx[j] * fx[j];
    for (let n = 0; n <= Nmax; n++) {
      let sa = 0;
      let sb = 0;
      const k = (n * Math.PI) / L;
      for (let j = 0; j < fx.length; j++) {
        const v = fx[j];
        if (!Number.isFinite(v)) continue;
        const wv = nodes.w[j] * v;
        sa += wv * Math.cos(k * nodes.x[j]);
        sb += wv * Math.sin(k * nodes.x[j]);
      }
      a[n] = Math.abs(sa / L) < 1e-12 ? 0 : sa / L;
      b[n] = Math.abs(sb / L) < 1e-12 ? 0 : sb / L;
    }
    if (mode === 'sine') a.fill(0);
    if (mode === 'cosine') b.fill(0);
    return { a, b, energy: energy / L };
  }, [f, mode, L, Nmax]);

  const S = useMemo(() => {
    const { a, b } = coef;
    return (x: number) => {
      let s = a[0] / 2;
      for (let n = 1; n <= N; n++) {
        const t = (n * Math.PI * x) / L;
        if (a[n]) s += a[n] * Math.cos(t);
        if (b[n]) s += b[n] * Math.sin(t);
      }
      return s;
    };
  }, [coef, N, L]);

  // Jumps of the extension over one period, located by bisection.
  const jumps = useMemo(() => {
    const M = 4000;
    const xs: number[] = [];
    const gs: number[] = [];
    for (let i = 0; i <= M; i++) {
      const x = -L + (2 * L * i) / M + L * 1e-7;
      xs.push(x);
      gs.push(ext(x));
    }
    const finite = gs.filter(Number.isFinite);
    if (!finite.length) return [];
    const range = Math.max(...finite) - Math.min(...finite) || 1;
    const diffs = gs.slice(1).map((g, i) => Math.abs(g - gs[i])).filter(Number.isFinite).sort((p, q) => p - q);
    const median = diffs[Math.floor(diffs.length / 2)] ?? 0;
    const out: { x: number; lo: number; hi: number; left: number; right: number }[] = [];
    for (let i = 0; i < M; i++) {
      const d = gs[i + 1] - gs[i];
      if (!Number.isFinite(d) || Math.abs(d) < 0.02 * range || Math.abs(d) < 30 * median + 1e-12) continue;
      let lo = xs[i];
      let hi = xs[i + 1];
      for (let k = 0; k < 50; k++) {
        const mid = (lo + hi) / 2;
        const g = ext(mid);
        if (Math.abs(g - gs[i]) < Math.abs(g - gs[i + 1])) lo = mid;
        else hi = mid;
      }
      const x = (lo + hi) / 2;
      const left = ext(x - L * 1e-9);
      const right = ext(x + L * 1e-9);
      out.push({ x, lo: Math.min(left, right), hi: Math.max(left, right), left, right });
    }
    return out;
  }, [ext, L]);

  const gibbs = useMemo(() => {
    if (!jumps.length) return null;
    const J = jumps.reduce((p, q) => (q.hi - q.lo > p.hi - p.lo ? q : p));
    const size = J.hi - J.lo;
    // Search the side of the jump where the function takes its higher value.
    const dir = J.right >= J.left ? 1 : -1;
    const w = Math.min(L / 2, (4 * L) / N);
    let best = -Infinity;
    for (let i = 1; i <= 2000; i++) best = Math.max(best, S(J.x + (dir * w * i) / 2000));
    return { size, over: best - J.hi, x: J.x, peak: best };
  }, [jumps, S, N, L]);

  const maxErr = useMemo(() => {
    if (jumps.length) return NaN;
    let m = 0;
    for (let i = 0; i <= 2000; i++) {
      const x = -L + (2 * L * i) / 2000;
      const e = Math.abs(S(x) - ext(x));
      if (Number.isFinite(e)) m = Math.max(m, e);
    }
    return m;
  }, [jumps, S, ext, L]);

  const ex = exact(preset, mode, L);
  const exactErr = useMemo(() => {
    if (!ex) return NaN;
    let m = 0;
    for (let n = 0; n <= Nmax; n++) {
      const [A, B] = ex(n);
      m = Math.max(m, Math.abs(A - coef.a[n]), Math.abs(B - coef.b[n]));
    }
    return m;
  }, [ex, coef, Nmax]);

  // Plot ranges.
  const fr = useMemo(() => {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 800; i++) {
      const y = ext(-L + (2 * L * i) / 800 + 1e-9);
      if (Number.isFinite(y)) {
        lo = Math.min(lo, y);
        hi = Math.max(hi, y);
      }
    }
    if (!Number.isFinite(lo)) return [-1, 1];
    const pad = Math.max(0.25 * (hi - lo), 0.1 * Math.max(Math.abs(hi), Math.abs(lo)), 0.2);
    return [lo - pad, hi + pad];
  }, [ext, L]);
  const isPi = Math.abs(L - Math.PI) < 1e-9;
  const domLo = half ? 0 : -L;

  // Coefficient panel.
  const showA = mode !== 'sine';
  const showB = mode !== 'cosine';
  const cmax = useMemo(() => {
    let m = 0;
    for (let n = 0; n <= N; n++) m = Math.max(m, n === 0 ? Math.abs(coef.a[0]) / 2 : Math.abs(coef.a[n]), Math.abs(coef.b[n]));
    return niceCeil(m * 1.1 || 1);
  }, [coef, N]);
  const logPts = useMemo(() => {
    const pts: { n: number; v: number; kind: 'a' | 'b' }[] = [];
    for (let n = 1; n <= N; n++) {
      if (showA && Math.abs(coef.a[n]) > 1e-10) pts.push({ n, v: Math.log10(Math.abs(coef.a[n])), kind: 'a' });
      if (showB && Math.abs(coef.b[n]) > 1e-10) pts.push({ n, v: Math.log10(Math.abs(coef.b[n])), kind: 'b' });
    }
    return pts;
  }, [coef, N, showA, showB]);
  const logRange = useMemo(() => {
    if (!logPts.length) return [-3, 0];
    const vs = logPts.map((p) => p.v);
    return [Math.floor(Math.min(...vs) - 0.3), Math.ceil(Math.max(...vs) + 0.3)];
  }, [logPts]);
  const first = logPts[0];

  const nonzero = useMemo(() => {
    let k = coef.a[0] !== 0 ? 1 : 0;
    for (let n = 1; n <= N; n++) k += (coef.a[n] !== 0 ? 1 : 0) + (coef.b[n] !== 0 ? 1 : 0);
    return k;
  }, [coef, N]);
  const parsevalSum = useMemo(() => {
    let s = (coef.a[0] * coef.a[0]) / 2;
    for (let n = 1; n <= N; n++) s += coef.a[n] * coef.a[n] + coef.b[n] * coef.b[n];
    return s;
  }, [coef, N]);
  const formula = formulaTex(preset, mode);

  return (
    <Frame title={str(params, 'title', 'Fourier partial sums')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {(modes.length > 1 || presets.length > 1) && (
        <div className="flex flex-wrap gap-3">
          {modes.length > 1 && <Segmented label="Series" options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={setMode} />}
          {presets.length > 1 && <Segmented label={half ? 'f on (0, L)' : 'f on (−L, L)'} options={presets.map((p) => ({ value: p, label: presetLabel(p, half) }))} value={preset} onChange={setPreset} />}
        </div>
      )}
      {preset === 'custom' && <ExprInput label={`f(x) on ${half ? '(0, L)' : '(−L, L)'}; you may use L`} value={custom} onChange={setCustom} error={compiled.error} />}
      <Plot view={[-2 * L, 2 * L, fr[0], fr[1]]} aspect={0.5} minHeight={220} maxHeight={380} xStep={isPi ? Math.PI / 2 : undefined} xTickFormat={isPi ? piFormat : undefined} xLabel="x" label="Function and Fourier partial sum">
        <FnPath f={ext} color="var(--plot-3)" width={1.5} dash="5 4" opacity={0.8} />
        <FnPath f={ext} from={domLo} to={L} color="var(--plot-3)" width={2.5} />
        {customOk || preset !== 'custom' ? <FnPath f={S} color="var(--plot-1)" width={2.25} /> : null}
        {jumps.flatMap((j) =>
          [-2, -1, 0, 1, 2]
            .map((k) => j.x + 2 * k * L)
            .filter((x) => x > -2 * L - 1e-9 && x < 2 * L + 1e-9)
            .map((x) => <Dot key={`${j.x}:${x}`} x={x} y={(j.lo + j.hi) / 2} r={3.5} color="var(--plot-4)" hollow />),
        )}
      </Plot>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded" style={{ background: 'var(--plot-3)' }} />f{half ? ` on (0, L), dashed: its ${mode === 'sine' ? 'odd' : 'even'} periodic extension` : ' on (−L, L), dashed: its periodic extension'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded" style={{ background: 'var(--plot-1)' }} />S<sub>N</sub>, harmonics n ≤ {N}
        </span>
        {jumps.length > 0 && <span className="text-ink-3">Hollow dots: midpoints of the jumps.</span>}
      </div>

      <div>
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-[13px] text-ink-2">
          <span>
            Coefficients {showA && <span style={{ color: 'var(--plot-5)' }}>aₙ</span>}
            {showA && showB && ' and '}
            {showB && <span style={{ color: 'var(--plot-6)' }}>bₙ</span>}
            {logScale ? ' (|value|, log-log)' : ''}
          </span>
          <Toggle label="log-log scale" checked={logScale} onChange={setLogScale} />
        </div>
        {logScale ? (
          <Plot view={[-0.05, Math.log10(Math.max(N, 2)) + 0.1, logRange[0], logRange[1]]} aspect={0.32} minHeight={150} maxHeight={220} xStep={Math.log10(Math.max(N, 2)) > 1.2 ? 1 : 0.5} yStep={1} xTickFormat={(v) => (Math.abs(v - Math.round(v)) < 1e-9 ? pow10(v) : fmt(Math.pow(10, v), 2))} yTickFormat={pow10} xLabel="n" label="Coefficient magnitudes on log-log axes">
            {first && (
              <>
                <Line x={Math.log10(first.n)} y={first.v} slope={-1} color="var(--plot-axis)" dash="4 4" width={1.2} />
                <Line x={Math.log10(first.n)} y={first.v} slope={-2} color="var(--plot-axis)" dash="1 4" width={1.4} />
              </>
            )}
            {logPts.map((p) => (
              <Dot key={`${p.kind}${p.n}`} x={Math.log10(p.n)} y={p.v} r={3} color={p.kind === 'a' ? 'var(--plot-5)' : 'var(--plot-6)'} />
            ))}
          </Plot>
        ) : (
          <Plot view={[-0.6, N + 0.6, -cmax, cmax]} aspect={0.32} minHeight={150} maxHeight={220} xStep={N > 24 ? 10 : N > 10 ? 5 : 1} label="Fourier coefficients">
            {Array.from({ length: N + 1 }, (_, n) => {
              const av = n === 0 ? coef.a[0] / 2 : coef.a[n];
              const bv = coef.b[n];
              const wbar = showA && showB ? 0.36 : 0.6;
              return (
                <g key={n}>
                  {showA && av !== 0 && <Rect x={showB ? n - wbar : n - wbar / 2} y={Math.min(0, av)} w={wbar} h={Math.abs(av)} fill="var(--plot-5)" opacity={0.85} />}
                  {showB && bv !== 0 && <Rect x={showA ? n : n - wbar / 2} y={Math.min(0, bv)} w={wbar} h={Math.abs(bv)} fill="var(--plot-6)" opacity={0.85} />}
                </g>
              );
            })}
            <Segment x1={-0.6} x2={N + 0.6} y1={0} y2={0} color="var(--plot-axis)" width={1} />
          </Plot>
        )}
        {logScale && <div className="mt-1 text-xs text-ink-3">Reference lines: slope −1 (dashed, a 1/n decay) and slope −2 (dotted, 1/n²).</div>}
      </div>

      <Slider label="Harmonics N" value={N} min={1} max={Nmax} step={1} format={(v) => String(Math.round(v))} onChange={(v) => setN(Math.round(v))} />
      <Controls cols={3}>
        <Readout label={nc("Non-zero terms in S_N")} value={String(nonzero)} />
        {gibbs ? (
          <Readout label={nc(`Peak overshoot (jump ${fmt(gibbs.size)})`)} value={`${fmt(gibbs.over, 4)} = ${fmt((100 * gibbs.over) / gibbs.size, 3)}%`} tone="var(--plot-4)" />
        ) : (
          <Readout label={nc("Max |S_N − f| (no jumps)")} value={fmt(maxErr, 3)} />
        )}
        {gibbs ? <Readout label={nc("Peak value of S_N")} value={fmt(gibbs.peak, 5)} /> : <Readout label={nc("Extension")} value="continuous: uniform convergence" />}
        {showParseval && (
          <>
            <Readout label={nc("(1/L)∫ f² over a period")} value={fmt(coef.energy, 5)} />
            <Readout label={nc("a₀²/2 + Σ (aₙ² + bₙ²), n ≤ N")} value={fmt(parsevalSum, 5)} />
            <Readout label={nc("Captured")} value={`${fmt((100 * parsevalSum) / coef.energy, 4)}%`} />
          </>
        )}
      </Controls>
      {formula ? (
        <Note tone={exactErr < 1e-6 ? 'good' : 'warn'}>
          <span className="mr-2">Closed form:</span>
          <Tex>{formula}</Tex>
          <span className="ml-2">Largest difference from the numerical coefficients (n ≤ {Nmax}): {fmt(exactErr, 2)}.</span>
        </Note>
      ) : (
        preset === 'custom' && <Note>Coefficients of your function are computed numerically (Simpson&apos;s rule).</Note>
      )}
    </Frame>
  );
}
