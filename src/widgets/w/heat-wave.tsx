/**
 * heat-wave: the series solutions of the heat equation u_t = alpha u_xx and the wave equation
 * u_tt = c^2 u_xx on [0, L] with u(0, t) = u(L, t) = 0. Pick an initial shape (or sketch one by
 * dragging control points), choose the number of modes N, and play the solution. The bar chart
 * shows each mode's time factor: e^(-alpha (n pi / L)^2 t) for heat, so the high modes visibly
 * die first, and cos(omega_n t) for the wave, which never decays. For the wave, the two
 * travelling halves of d'Alembert's form can be overlaid. The wave is released from rest (g = 0).
 *
 * Params:
 *   equation  "heat" | "wave"                                                   default "heat"
 *   L         number | string   length of the rod / string, e.g. "pi"           default pi
 *   alpha     number   diffusivity (heat)                                       default 1
 *   c         number   wave speed (wave)                                        default 1
 *   ic        "parabola" | "pluck" | "box" | "sketch" | "custom"   initial shape   default "parabola" (heat), "pluck" (wave)
 *   ics       string[]   shapes offered as buttons                default ["parabola", "pluck", "box", "sketch"]
 *   f         string   custom u(x, 0) in x and L (makes "custom" available and the default)
 *   height    number   height of the pluck and box shapes                       default 1
 *   pluckAt   number   pluck position as a fraction of L                         default 0.5
 *   N         number   initial number of modes                                  default 10
 *   Nmax      number                                                            default 40
 *   tMax      number   end of the time slider     default 2 (heat, scaled by L^2/(pi^2 alpha)), 2L/c (wave: one period)
 *   title, caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { num, oneOf, str, strArray } from '../kit/params';
import { Plot, Draggable, FnPath, Rect, Segment } from '../kit/Plot';
import { Button, Controls, ExprInput, Frame, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { useAnimation } from '../kit/hooks';
import { numOrExpr, niceCeil } from '../kit/de-ode';

/** Readout labels are upper-cased by the kit; keep maths symbols as written. */
const nc = (s: string) => <span className="normal-case">{s}</span>;

type Shape = 'parabola' | 'pluck' | 'box' | 'sketch' | 'custom';
const SHAPES = ['parabola', 'pluck', 'box', 'sketch', 'custom'] as const;
const SHAPE_LABEL: Record<Shape, string> = { parabola: 'x(L − x)', pluck: 'pluck', box: 'box', sketch: 'sketch', custom: 'custom' };
const K = 7; // sketch control points
const MODE_COLORS = ['var(--plot-5)', 'var(--plot-6)', 'var(--plot-4)', 'var(--plot-3)', 'var(--plot-2)'];

function piFormat(v: number): string {
  const k = Math.round((v / Math.PI) * 4);
  if (Math.abs(v - (k * Math.PI) / 4) > 1e-9) return fmt(v);
  if (k === 0) return '0';
  const g = k % 4 === 0 ? 4 : k % 2 === 0 ? 2 : 1;
  const n = k / g;
  const d = 4 / g;
  const s = n === 1 ? '' : fmt(n);
  return d === 1 ? `${s}π` : `${s}π/${d}`;
}

export default function HeatWave({ params }: WidgetProps) {
  const eq = oneOf(params, 'equation', ['heat', 'wave'] as const, 'heat');
  const heat = eq === 'heat';
  const L = numOrExpr(params, 'L', Math.PI);
  if (!(L > 0)) throw new Error('parameter "L" must be positive');
  const alpha = num(params, 'alpha', 1);
  const c = num(params, 'c', 1);
  if (!(alpha > 0) || !(c > 0)) throw new Error('parameters "alpha" and "c" must be positive');
  const hasF = typeof params.f === 'string';
  const ic0 = oneOf(params, 'ic', SHAPES, hasF ? 'custom' : heat ? 'parabola' : 'pluck');
  const ics = strArray(params, 'ics', hasF ? ['custom', 'parabola', 'pluck', 'box', 'sketch'] : ['parabola', 'pluck', 'box', 'sketch']) as Shape[];
  if (!ics.every((s) => (SHAPES as readonly string[]).includes(s))) throw new Error(`parameter "ics" should list some of ${SHAPES.join(', ')}`);
  const height = num(params, 'height', 1);
  const Nmax = Math.round(num(params, 'Nmax', 40));
  if (Nmax < 1 || Nmax > 200) throw new Error('parameter "Nmax" should be between 1 and 200');
  const period = (2 * L) / c;
  const tMax = num(params, 'tMax', heat ? (2 * L * L) / (Math.PI * Math.PI * alpha) : period);

  const [shape, setShape] = useState<Shape>(ic0);
  const [N, setN] = useState(() => clamp(Math.round(num(params, 'N', 10)), 1, Nmax));
  const [p, setP] = useState(() => clamp(num(params, 'pluckAt', 0.5), 0.02, 0.98));
  const [custom, setCustom] = useState(() => str(params, 'f', 'x*(L - x)'));
  const [pts, setPts] = useState<number[]>(() => Array.from({ length: K }, (_, i) => height * Math.sin((Math.PI * (i + 1)) / (K + 1))));
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showModes, setShowModes] = useState(false);
  const [halves, setHalves] = useState(false);

  const compiled = useMemo(() => tryCompile(custom, ['x', 'L']), [custom]);
  if (ic0 === 'custom' && compiled.error && custom === str(params, 'f', '')) throw new Error(compiled.error);

  const { f, cuts } = useMemo(() => {
    switch (shape) {
      case 'parabola':
        return { f: (x: number) => x * (L - x), cuts: [] as number[] };
      case 'pluck':
        return { f: (x: number) => (x <= p * L ? (height * x) / (p * L) : (height * (L - x)) / (L * (1 - p))), cuts: [p * L] };
      case 'box':
        return { f: (x: number) => (x > L / 3 && x < (2 * L) / 3 ? height : 0), cuts: [L / 3, (2 * L) / 3] };
      case 'sketch': {
        const xs = [0, ...pts.map((_, i) => ((i + 1) * L) / (K + 1)), L];
        const ys = [0, ...pts, 0];
        return {
          f: (x: number) => {
            const u = clamp((x / L) * (K + 1), 0, K + 1 - 1e-12);
            const i = Math.floor(u);
            const s = u - i;
            return ys[i] * (1 - s) + ys[i + 1] * s;
          },
          cuts: xs.slice(1, -1),
        };
      }
      case 'custom': {
        const fn = compiled.fn;
        return { f: fn ? (x: number) => fn(x, L) : () => 0, cuts: [] as number[] };
      }
    }
  }, [shape, L, p, height, pts, compiled]);

  // Sine coefficients b_n = (2/L) ∫ f sin(nπx/L) dx by Simpson's rule on panels split at the corners.
  const b = useMemo(() => {
    const edges = [0, ...cuts.filter((x) => x > 0 && x < L).sort((u, v) => u - v), L];
    const xs: number[] = [];
    const ws: number[] = [];
    for (let i = 0; i < edges.length - 1; i++) {
      const a0 = edges[i];
      const a1 = edges[i + 1];
      const m = Math.max(40, 2 * Math.round((2400 * (a1 - a0)) / L / 2));
      const h = (a1 - a0) / m;
      for (let j = 0; j <= m; j++) {
        const x = j === 0 ? a0 + h * 1e-7 : j === m ? a1 - h * 1e-7 : a0 + j * h;
        xs.push(x);
        ws.push(((j === 0 || j === m ? 1 : j % 2 ? 4 : 2) * h) / 3);
      }
    }
    const fx = xs.map((x) => {
      const v = f(x);
      return Number.isFinite(v) ? v : 0;
    });
    const out = new Float64Array(Nmax + 1);
    for (let n = 1; n <= Nmax; n++) {
      let s = 0;
      const k = (n * Math.PI) / L;
      for (let j = 0; j < xs.length; j++) s += ws[j] * fx[j] * Math.sin(k * xs[j]);
      const v = (2 / L) * s;
      out[n] = Math.abs(v) < 1e-12 ? 0 : v;
    }
    return out;
  }, [f, cuts, L, Nmax]);

  const factor = (n: number, s: number) => (heat ? Math.exp(-alpha * ((n * Math.PI) / L) ** 2 * s) : Math.cos(((n * Math.PI * c) / L) * s));
  const u = useMemo(() => {
    const fac = Array.from({ length: N + 1 }, (_, n) => (n === 0 ? 0 : b[n] * factor(n, t)));
    return (x: number) => {
      let s = 0;
      for (let n = 1; n <= N; n++) if (fac[n]) s += fac[n] * Math.sin((n * Math.PI * x) / L);
      return s;
    };
  }, [b, N, t, L, heat, alpha, c]); // eslint-disable-line react-hooks/exhaustive-deps

  // Odd 2L-periodic extension, for d'Alembert's travelling halves.
  const fOdd = useMemo(
    () => (x: number) => {
      const r = x - 2 * L * Math.floor((x + L) / (2 * L));
      return r >= 0 ? f(r) : -f(-r);
    },
    [f, L],
  );

  const yr = useMemo(() => {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i <= 400; i++) {
      const v = f((L * i) / 400);
      if (Number.isFinite(v)) {
        lo = Math.min(lo, v);
        hi = Math.max(hi, v);
      }
    }
    const m = Math.max(Math.abs(lo), Math.abs(hi), 1e-6);
    if (!heat) return [-niceCeil(m * 1.15), niceCeil(m * 1.15)];
    return [lo < 0 ? -niceCeil(-lo * 1.2) : -0.08 * m, niceCeil(hi * 1.15 || 1)];
  }, [f, L, heat]);

  useAnimation(playing, (dt) =>
    setT((s) => {
      const n = s + (dt * tMax) / (heat ? 8 : 4);
      if (heat && n >= tMax) {
        setPlaying(false);
        return tMax;
      }
      return heat ? n : n % tMax;
    }),
  );

  const isPi = Math.abs(L - Math.PI) < 1e-9;
  const mid = u(L / 2);
  const ratio31 = b[1] !== 0 && N >= 3 ? Math.abs((b[3] * factor(3, t)) / (b[1] * factor(1, t))) : NaN;
  const sketching = shape === 'sketch';

  return (
    <Frame
      title={str(params, 'title', heat ? 'Heat equation: series solution' : 'Wave equation: series solution')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button
            primary
            onClick={() => {
              if (!playing && heat && t >= tMax) setT(0);
              setPlaying((s) => !s);
            }}
          >
            {playing ? 'Pause' : 'Play'}
          </Button>
          <Button
            onClick={() => {
              setPlaying(false);
              setT(0);
            }}
          >
            Reset
          </Button>
        </>
      }
    >
      {ics.length > 1 && <Segmented label="Initial shape u(x, 0)" options={ics.map((s) => ({ value: s, label: SHAPE_LABEL[s] }))} value={shape} onChange={(s) => (setShape(s), setT(0), setPlaying(false))} />}
      {shape === 'custom' && <ExprInput label="u(x, 0) = f(x) on [0, L]; you may use L" value={custom} onChange={setCustom} error={compiled.error} />}
      <Plot view={[0, L, yr[0], yr[1]]} aspect={0.5} minHeight={220} maxHeight={380} xStep={isPi ? Math.PI / 4 : undefined} xTickFormat={isPi ? piFormat : undefined} xLabel="x" yLabel="u" label={heat ? 'Temperature along the rod' : 'Displacement of the string'}>
        {heat && <HeatBand u={u} lo={yr[0]} hi={yr[1]} L={L} />}
        <FnPath f={f} color="var(--color-ink-3)" width={1.5} dash="5 4" />
        {showModes &&
          Array.from({ length: Math.min(N, 5) }, (_, i) => i + 1).map((n) =>
            b[n] !== 0 ? <FnPath key={n} f={(x) => b[n] * factor(n, t) * Math.sin((n * Math.PI * x) / L)} color={MODE_COLORS[(n - 1) % MODE_COLORS.length]} width={1.4} opacity={0.9} /> : null,
          )}
        {!heat && halves && (
          <>
            <FnPath f={(x) => 0.5 * fOdd(x - c * t)} color="var(--plot-2)" width={1.6} dash="6 4" />
            <FnPath f={(x) => 0.5 * fOdd(x + c * t)} color="var(--plot-4)" width={1.6} dash="6 4" />
          </>
        )}
        <FnPath f={u} color="var(--plot-1)" width={2.5} />
        {sketching &&
          pts.map((y, i) => {
            const x = ((i + 1) * L) / (K + 1);
            return (
              <Draggable
                key={i}
                x={x}
                y={y}
                r={6}
                step={(yr[1] - yr[0]) / 50}
                color="var(--plot-4)"
                label={`Control point ${i + 1} of the initial shape`}
                constrain={(_, ny) => [x, clamp(ny, -1.5 * height, 1.5 * height)]}
                onChange={(_, ny) => {
                  setPts((s) => s.map((q, j) => (j === i ? ny : q)));
                  setT(0);
                  setPlaying(false);
                }}
              />
            );
          })}
      </Plot>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded border-t border-dashed" style={{ borderColor: 'var(--color-ink-3)' }} />
          u(x, 0)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded" style={{ background: 'var(--plot-1)' }} />
          u(x, t), {N} mode{N > 1 ? 's' : ''}
        </span>
        {!heat && halves && <span>Dashed red / amber: ½ f̃(x − ct) moving right and ½ f̃(x + ct) moving left.</span>}
        {sketching && <span className="text-ink-3">Drag the amber points (or use their arrow keys) to sketch u(x, 0).</span>}
      </div>

      <div>
        <div className="mb-1 text-[13px] text-ink-2">{heat ? 'Each mode’s decay factor e^(−α(nπ/L)²t)' : 'Each mode’s time factor cos(ωₙt)'} at the current t (faded: modes absent from f)</div>
        <Plot view={[0.4, N + 0.6, heat ? 0 : -1.05, 1.05]} aspect={0.25} minHeight={110} maxHeight={170} xStep={N > 24 ? 10 : N > 10 ? 5 : 1} yStep={heat ? 0.5 : 1} label="Mode factors">
          {Array.from({ length: N }, (_, i) => {
            const n = i + 1;
            const v = factor(n, t);
            return <Rect key={n} x={n - 0.32} y={Math.min(0, v)} w={0.64} h={Math.abs(v)} fill={heat ? 'var(--plot-2)' : 'var(--plot-5)'} opacity={b[n] === 0 ? 0.18 : 0.85} />;
          })}
          <Segment x1={0.4} x2={N + 0.6} y1={0} y2={0} color="var(--plot-axis)" width={1} />
        </Plot>
      </div>

      <Controls cols={2}>
        <Slider label="Time t" value={t} min={0} max={tMax} step={tMax / 500} onChange={(v) => (setPlaying(false), setT(v))} />
        <Slider label="Modes N" value={N} min={1} max={Nmax} step={1} format={(v) => String(Math.round(v))} onChange={(v) => setN(Math.round(v))} />
        {shape === 'pluck' && <Slider label="Pluck point (fraction of L)" value={p} min={0.05} max={0.95} step={0.01} onChange={(v) => (setP(v), setT(0), setPlaying(false))} />}
      </Controls>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        <Toggle label="Show modes 1–5 separately" checked={showModes} onChange={setShowModes} />
        {!heat && <Toggle label="Show d’Alembert’s travelling halves" checked={halves} onChange={setHalves} />}
      </div>
      <Controls cols={3}>
        <Readout label={nc("u(L/2, t)")} value={fmt(mid, 4)} tone="var(--plot-1)" />
        {heat ? (
          <>
            <Readout label={nc("Mode 1 factor e^(−απ²t/L²)")} value={fmt(factor(1, t), 4)} />
            <Readout label={nc("|mode 3 / mode 1|")} value={Number.isFinite(ratio31) ? fmt(ratio31, 3) : '—'} />
          </>
        ) : (
          <>
            <Readout label={nc("Period 2L/c")} value={fmt(period, 4)} />
            <Readout label={nc("b₁, b₂, b₃")} value={`${fmt(b[1], 3)}, ${fmt(b[2], 3)}, ${fmt(b[3], 3)}`} />
          </>
        )}
      </Controls>
    </Frame>
  );
}

/** A faint colour band under the rod showing temperature (warm where u is large). */
function HeatBand({ u, lo, hi, L }: { u: (x: number) => number; lo: number; hi: number; L: number }) {
  const n = 48;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = (L * i) / n;
        const v = u(x + L / (2 * n));
        const s = clamp((v - Math.max(lo, 0)) / (hi - Math.max(lo, 0) || 1), 0, 1);
        return <Rect key={i} x={x} y={hi - (hi - lo) * 0.05} w={L / n + 1e-9} h={(hi - lo) * 0.05} fill="var(--plot-2)" opacity={0.08 + 0.75 * s} />;
      })}
    </g>
  );
}
