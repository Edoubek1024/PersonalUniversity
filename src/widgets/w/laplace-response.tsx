/**
 * laplace-response: the response of a y'' + b y' + c y = g(t) to switched and impulsive inputs,
 * with the input plotted above the output on the same time axis.
 *
 *   mode "switch":      g = F on [on, off) and 0 elsewhere. The switch-off time is a slider.
 *   mode "impulse":     g = J δ(t − at). A width slider replaces the delta by the pulse d_ε of
 *                       height J/ε on [at, at + ε); the exact impulse response is drawn dashed.
 *   mode "convolution": g is an expression in t. For a chosen time t the upper plot shows g(τ),
 *                       the flipped impulse response h(t − τ) and their product, whose area is
 *                       y(t) = (h * g)(t) (Duhamel's principle); the readouts compare it with a
 *                       direct numerical solution.
 *
 * All solutions are RK4 with steps that land on every switching time (the jump in y' of J/a is
 * applied exactly at an impulse).
 *
 * Params:
 *   mode        "switch" | "impulse" | "convolution"                         default "switch"
 *   a, b, c     number   coefficients                                        default 1, 0, 1
 *   y0, v0      number   initial y and y' (switch and impulse modes)         default 0, 0
 *   F, on, off  number | string   switched force and its times               default 1, 0, "pi"
 *   J, at       number | string   impulse strength and time                  default 1, 1
 *   g           string   forcing in t (convolution)                           default "t"
 *   tMax        number | string   time axis length                           default 4π (switch), 6 (impulse), 10 (convolution)
 *   title, caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { num, oneOf, str } from '../kit/params';
import { Plot, Arrow, Dot, FillBetween, FnPath, Label, Rect, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, ExprInput, Frame, Readout, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { useAnimation } from '../kit/hooks';
import { niceCeil, numOrExpr, pathD, type Pt } from '../kit/de-ode';

const nc = (s: string) => <span className="normal-case">{s}</span>;

interface Sol {
  pts: Pt[];
  /** y' at each point of pts (a kick adds a second point at the same time). */
  vs: number[];
  at: (t: number) => number;
  /** y' at the last stored point with time <= t. */
  vAt: (t: number) => number;
}

/** RK4 for a y'' + b y' + c y = g(t) on [0, tMax], stepping exactly onto each break; kicks[t] adds to y'. */
function solve(a: number, b: number, c: number, g: (t: number) => number, y0: number, v0: number, tMax: number, breaks: number[], kicks: Map<number, number>, n = 4000): Sol {
  const cuts = [0, ...breaks.filter((t) => t > 0 && t < tMax).sort((p, q) => p - q), tMax];
  const pts: Pt[] = [[0, y0]];
  let y = y0;
  let v = v0 + (kicks.get(0) ?? 0);
  const vs: number[] = [v];
  const acc = (t: number, y: number, v: number) => (g(t) - b * v - c * y) / a;
  for (let s = 0; s < cuts.length - 1; s++) {
    const t0 = cuts[s];
    const t1 = cuts[s + 1];
    const m = Math.max(4, Math.ceil((n * (t1 - t0)) / tMax));
    const h = (t1 - t0) / m;
    // Evaluate the forcing just inside the segment so a switch at t0 counts as already on.
    const eps = h * 1e-9;
    for (let i = 0; i < m; i++) {
      const t = t0 + i * h;
      const ta = Math.max(t, t0 + eps);
      const tb = Math.min(t + h, t1 - eps);
      const k1y = v;
      const k1v = acc(ta, y, v);
      const k2y = v + (h / 2) * k1v;
      const k2v = acc(t + h / 2, y + (h / 2) * k1y, v + (h / 2) * k1v);
      const k3y = v + (h / 2) * k2v;
      const k3v = acc(t + h / 2, y + (h / 2) * k2y, v + (h / 2) * k2v);
      const k4y = v + h * k3v;
      const k4v = acc(tb, y + h * k3y, v + h * k3v);
      y += (h / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
      v += (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
      pts.push([t + h, y]);
      vs.push(v);
    }
    const kick = kicks.get(t1);
    if (kick) {
      v += kick;
      pts.push([t1, y]);
      vs.push(v);
    }
  }
  const find = (tt: number) => {
    let lo = 0;
    let hi = pts.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (pts[mid][0] <= tt) lo = mid;
      else hi = mid;
    }
    return [lo, hi];
  };
  const vAt = (t: number) => vs[find(clamp(t, 0, tMax))[0]];
  const at = (t: number) => {
    const tt = clamp(t, 0, tMax);
    const [lo, hi] = find(tt);
    const [ta, ya] = pts[lo];
    const [tb, yb] = pts[hi];
    return tb > ta ? ya + ((yb - ya) * (tt - ta)) / (tb - ta) : ya;
  };
  return { pts, vs, at, vAt };
}

function Curve({ pts, color, width = 2.25, dash }: { pts: Pt[]; color: string; width?: number; dash?: string }) {
  const { sx, sy } = usePlot();
  const d = useMemo(() => pathD(pts, sx, sy), [pts, sx, sy]);
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinejoin="round" />;
}

function yRange(pts: Pt[], extra: number[] = []): [number, number] {
  let lo = 0;
  let hi = 0;
  for (const [, y] of pts) if (Number.isFinite(y)) (lo = Math.min(lo, y)), (hi = Math.max(hi, y));
  for (const y of extra) if (Number.isFinite(y)) (lo = Math.min(lo, y)), (hi = Math.max(hi, y));
  const m = niceCeil(Math.max(Math.abs(lo), Math.abs(hi), 1e-3) * 1.15);
  return [lo < -1e-9 ? -m : -0.12 * m, hi > 1e-9 ? m : 0.12 * m];
}

function piFormat(v: number): string {
  const k = Math.round(v / Math.PI);
  if (Math.abs(v - k * Math.PI) > 1e-9) return fmt(v);
  return k === 0 ? '0' : k === 1 ? 'π' : `${k}π`;
}

export default function LaplaceResponse({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['switch', 'impulse', 'convolution'] as const, 'switch');
  const a = num(params, 'a', 1);
  const b = num(params, 'b', 0);
  const c = num(params, 'c', 1);
  if (a === 0) throw new Error('parameter "a" must not be 0');
  const y0 = num(params, 'y0', 0);
  const v0 = num(params, 'v0', 0);
  const tMax = numOrExpr(params, 'tMax', mode === 'switch' ? 4 * Math.PI : mode === 'impulse' ? 6 : 10);
  if (!(tMax > 0)) throw new Error('parameter "tMax" must be positive');
  const F = numOrExpr(params, 'F', 1);
  const on = numOrExpr(params, 'on', 0);
  const J = numOrExpr(params, 'J', 1);
  const gSrc0 = str(params, 'g', 't');
  const isPi = mode === 'switch' && Math.abs(tMax / Math.PI - Math.round(tMax / Math.PI)) < 1e-9;
  const tickProps = isPi ? { xStep: Math.PI, xTickFormat: piFormat } : {};

  const [off, setOff] = useState(() => numOrExpr(params, 'off', Math.PI));
  const [at, setAt] = useState(() => numOrExpr(params, 'at', 1));
  const [eps, setEps] = useState(0);
  const [gSrc, setGSrc] = useState(gSrc0);
  const [t, setT] = useState(() => tMax / 2);
  const [playing, setPlaying] = useState(false);
  useAnimation(playing, (dt) =>
    setT((s) => {
      const n = s + (dt * tMax) / 8;
      if (n >= tMax) {
        setPlaying(false);
        return tMax;
      }
      return n;
    }),
  );

  const P = `${a === 1 ? '' : fmt(a)}y'' ${b ? `${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : fmt(Math.abs(b))}y'` : ''} ${c ? `${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 ? '' : fmt(Math.abs(c))}y` : ''}`.replace(/−/g, '-');

  const compiled = useMemo(() => tryCompile(gSrc, ['t']), [gSrc]);
  if (mode === 'convolution' && compiled.error && gSrc === gSrc0) throw new Error(compiled.error);

  // Impulse response h: a h'' + b h' + c h = 0, h(0) = 0, h'(0) = 1/a.
  const h = useMemo(() => solve(a, b, c, () => 0, 0, 1 / a, tMax, [], new Map()), [a, b, c, tMax]);

  const sw = useMemo(() => {
    if (mode !== 'switch') return null;
    const lo = Math.min(on, off);
    const hi = Math.max(on, off);
    const g = (s: number) => (s >= lo && s < hi ? F : 0);
    return { g, sol: solve(a, b, c, g, y0, v0, tMax, [lo, hi], new Map()) };
  }, [mode, a, b, c, F, on, off, y0, v0, tMax]);

  const im = useMemo(() => {
    if (mode !== 'impulse') return null;
    const exact = solve(a, b, c, () => 0, y0, v0, tMax, [at], new Map([[at, J / a]]));
    const pulse = eps > 0 ? solve(a, b, c, (s) => (s >= at && s < at + eps ? J / eps : 0), y0, v0, tMax, [at, at + eps], new Map()) : null;
    return { exact, pulse };
  }, [mode, a, b, c, y0, v0, tMax, at, J, eps]);

  const cv = useMemo(() => {
    if (mode !== 'convolution' || !compiled.fn) return null;
    const g = compiled.fn;
    const direct = solve(a, b, c, (s) => g(s), 0, 0, tMax, [], new Map());
    return { g: (s: number) => g(s), direct };
  }, [mode, compiled, a, b, c, tMax]);
  const conv = useMemo(() => {
    if (!cv) return NaN;
    // Simpson's rule for ∫_0^t h(t − τ) g(τ) dτ.
    const n = 600;
    const dx = t / n;
    let s = 0;
    for (let i = 0; i <= n; i++) {
      const tau = i * dx;
      s += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * h.at(t - tau) * cv.g(tau);
    }
    return (s * dx) / 3;
  }, [cv, h, t]);
  const gConv = cv?.g;
  const gMax = useMemo(() => {
    if (!gConv) return 1;
    let m = 0;
    for (let i = 0; i <= 300; i++) {
      const s = (tMax * i) / 300;
      for (const v of [gConv(s), h.at(s)]) if (Number.isFinite(v)) m = Math.max(m, Math.abs(v));
    }
    return niceCeil(m * 1.15 || 1);
  }, [gConv, h, tMax]);

  const frameProps = { title: str(params, 'title', mode === 'switch' ? 'A switched force' : mode === 'impulse' ? 'An impulse and its response' : 'Convolution: y = h * g'), caption: typeof params.caption === 'string' ? params.caption : undefined };

  if (mode === 'switch' && sw) {
    const r = yRange(sw.sol.pts);
    const yNow = sw.sol.at(off);
    return (
      <Frame {...frameProps}>
        <div className="overflow-x-auto text-sm">
          <Tex>{`${P} = ${F === 1 ? '' : fmt(F)}\\,[u_{${fmt(on)}}(t) - u_{${fmt(off)}}(t)]`.replace(/−/g, '-')}</Tex>
        </div>
        <Plot view={[0, tMax, -0.25 * Math.abs(F), 1.3 * Math.abs(F)]} aspect={0.18} minHeight={90} maxHeight={130} yStep={Math.abs(F) || 1} label="Input force" {...tickProps}>
          <Curve pts={[[0, sw.g(0)], ...[Math.min(on, off), Math.max(on, off)].flatMap((s): Pt[] => [[s, sw.g(s - 1e-9)], [s, sw.g(s)]]), [tMax, sw.g(tMax)]]} color="var(--plot-4)" />
          <Label x={tMax} y={1.3 * Math.abs(F)} anchor="end" dx={-4} dy={14} size={11}>
            input g(t)
          </Label>
        </Plot>
        <Plot view={[0, tMax, r[0], r[1]]} aspect={0.42} minHeight={200} maxHeight={320} xLabel="t" yLabel="y" label="Response y(t)" {...tickProps}>
          <Segment x1={off} x2={off} y1={r[0]} y2={r[1]} color="var(--plot-axis)" dash="4 4" width={1.2} />
          <Curve pts={sw.sol.pts} color="var(--plot-1)" />
          <Dot x={off} y={yNow} r={4.5} color="var(--plot-4)" />
        </Plot>
        <Slider label="Switch-off time" value={off} min={0} max={tMax} step={tMax / 400} format={(v) => (isPi && Math.abs(v / Math.PI - Math.round(v / Math.PI)) < 1e-6 ? piFormat(v) : fmt(v))} onChange={setOff} />
        <Controls cols={3}>
          <Readout label={nc('y at the switch')} value={fmt(yNow, 4)} tone="var(--plot-4)" />
          <Readout label={nc("y' at the switch")} value={fmt(sw.sol.vAt(off), 4)} />
          <Readout label={nc('Amplitude afterwards')} value={fmt(amplitudeAfter(sw.sol, Math.max(on, off), tMax), 3)} />
        </Controls>
        <div className="flex gap-2">
          <Button onClick={() => setOff(Math.PI)}>Off at π</Button>
          <Button onClick={() => setOff(2 * Math.PI)}>Off at 2π</Button>
        </div>
      </Frame>
    );
  }

  if (mode === 'impulse' && im) {
    const main = im.pulse ?? im.exact;
    const r = yRange(im.exact.pts, im.pulse ? im.pulse.pts.map((p) => p[1]) : []);
    const height = eps > 0 ? J / eps : 0;
    const top = Math.max(1.6 * Math.abs(J), 1);
    // y' just after the input ends minus y' just before it starts.
    const jump = main.vAt(at + eps + 1e-9) - main.vAt(at - 1e-9);
    return (
      <Frame {...frameProps}>
        <div className="overflow-x-auto text-sm">
          <Tex>{`${P} = ${eps > 0 ? `d_{\\epsilon}(t - ${fmt(at)})\\ (\\epsilon = ${fmt(eps)})` : `${J === 1 ? '' : fmt(J)}\\,\\delta(t - ${fmt(at)})`}`.replace(/−/g, '-')}</Tex>
        </div>
        <Plot view={[0, tMax, -0.2 * top, top]} aspect={0.18} minHeight={90} maxHeight={130} yStep={niceCeil(top / 2)} label="Input" xLabel="t">
          {eps > 0 ? (
            <>
              <Rect x={at} y={0} w={eps} h={Math.min(height, top * 2)} fill="var(--plot-4)" opacity={0.5} color="var(--plot-4)" />
              <Label x={at + eps} y={Math.min(height, top)} dx={6} dy={12} size={11}>
                {`height ${fmt(height)}, area ${fmt(J)}`}
              </Label>
            </>
          ) : (
            <>
              <Arrow x1={at} y1={0} x2={at} y2={top * 0.85} color="var(--plot-4)" />
              <Label x={at} y={top * 0.85} dx={8} dy={10} size={11}>
                {`${fmt(J)}·δ(t − ${fmt(at)})`}
              </Label>
            </>
          )}
        </Plot>
        <Plot view={[0, tMax, r[0], r[1]]} aspect={0.42} minHeight={200} maxHeight={320} xLabel="t" yLabel="y" label="Response y(t)">
          <Curve pts={im.exact.pts} color={im.pulse ? 'var(--plot-3)' : 'var(--plot-1)'} dash={im.pulse ? '6 4' : undefined} width={im.pulse ? 1.8 : 2.25} />
          {im.pulse && <Curve pts={im.pulse.pts} color="var(--plot-1)" />}
        </Plot>
        <Controls cols={2}>
          <Slider label="Impulse time" value={at} min={0} max={tMax * 0.8} step={tMax / 400} onChange={setAt} />
          <Slider label="Pulse width ε (0 = delta)" value={eps} min={0} max={1.5} step={0.01} onChange={setEps} />
        </Controls>
        <Controls cols={3}>
          <Readout label={nc("Jump in y' across the input")} value={fmt(jump, 3)} tone="var(--plot-1)" />
          <Readout label={nc('J / a')} value={fmt(J / a, 3)} />
          <Readout label={nc('Max gap to the impulse response')} value={im.pulse ? fmt(maxGap(im.pulse, im.exact, tMax), 3) : '0'} />
        </Controls>
      </Frame>
    );
  }

  // Convolution.
  const g = cv?.g ?? (() => 0);
  const rOut = cv ? yRange(cv.direct.pts) : ([-1, 1] as [number, number]);
  return (
    <Frame
      {...frameProps}
      actions={
        <>
          <Button
            primary
            onClick={() => {
              if (!playing && t >= tMax) setT(0);
              setPlaying((s) => !s);
            }}
          >
            {playing ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={() => (setPlaying(false), setT(0))}>Reset</Button>
        </>
      }
    >
      <div className="overflow-x-auto text-sm">
        <Tex>{`${P} = g(t),\\quad y(t) = \\int_0^t h(t - \\tau)\\,g(\\tau)\\,d\\tau`}</Tex>
      </div>
      <ExprInput label="Forcing g(t)" value={gSrc} onChange={setGSrc} error={compiled.error} />
      <div className="text-[13px] text-ink-2">
        Integrand at t = {fmt(t)}: <span style={{ color: 'var(--plot-4)' }}>g(τ)</span>, <span style={{ color: 'var(--plot-5)' }}>h(t − τ)</span> and their <span style={{ color: 'var(--plot-6)' }}>product</span> (shaded area = y(t))
      </div>
      <Plot view={[0, tMax, -gMax, gMax]} aspect={0.32} minHeight={150} maxHeight={240} xLabel="τ" label="Convolution integrand">
        <FillBetween top={(tau) => (tau <= t ? h.at(t - tau) * g(tau) : 0)} a={0} b={t} fill="var(--plot-6)" opacity={0.3} samples={300} />
        <FnPath f={g} color="var(--plot-4)" width={2} />
        <FnPath f={(tau) => h.at(t - tau)} to={t} color="var(--plot-5)" width={2} />
        <FnPath f={(tau) => h.at(t - tau) * g(tau)} to={t} color="var(--plot-6)" width={1.5} />
        <Segment x1={t} x2={t} y1={-gMax} y2={gMax} color="var(--plot-axis)" dash="4 4" width={1.2} />
      </Plot>
      <Plot view={[0, tMax, rOut[0], rOut[1]]} aspect={0.32} minHeight={150} maxHeight={240} xLabel="t" yLabel="y" label="Response y(t)">
        {cv && <Curve pts={cv.direct.pts} color="var(--plot-1)" />}
        <Dot x={t} y={conv} r={5} color="var(--plot-6)" />
      </Plot>
      <Slider label="Time t" value={t} min={0} max={tMax} step={tMax / 500} onChange={(v) => (setPlaying(false), setT(v))} />
      <Controls cols={3}>
        <Readout label={nc('Area: (h * g)(t)')} value={fmt(conv, 5)} tone="var(--plot-6)" />
        <Readout label={nc('y(t) solved directly')} value={cv ? fmt(cv.direct.at(t), 5) : '—'} tone="var(--plot-1)" />
        <Readout label={nc('Impulse response h(t)')} value={fmt(h.at(t), 4)} tone="var(--plot-5)" />
      </Controls>
    </Frame>
  );
}

function amplitudeAfter(sol: Sol, from: number, tMax: number): number {
  let m = 0;
  for (const [t, y] of sol.pts) if (t >= from && t <= tMax) m = Math.max(m, Math.abs(y));
  return m;
}

function maxGap(p: Sol, q: Sol, tMax: number): number {
  let m = 0;
  for (let i = 0; i <= 600; i++) {
    const t = (tMax * i) / 600;
    m = Math.max(m, Math.abs(p.at(t) - q.at(t)));
  }
  return m;
}
