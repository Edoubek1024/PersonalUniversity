/**
 * oscillator: m x'' + c x' + k x = F0 cos(omega t). An animated mass on a spring beside the graph
 * of x(t) (same vertical scale), readouts for the natural frequency, damping ratio, regime and
 * characteristic roots, the amplitude-response curve A(omega) with the current omega marked, and
 * the characteristic roots in the complex plane with their path as the damping varies.
 *
 * Params:
 *   mode      "forced" | "free"   free hides the forcing                       default "forced"
 *   m, c, k   number   initial mass, damping, stiffness                      default 1, 0.4, 4
 *   F0, omega number   initial forcing amplitude and frequency (forced)      default 1, 1.5
 *   ranges    {m|c|k|F0|omega: [min, max]}   slider ranges     default m [0.25, 4], c [0, 4], k [0.5, 10], F0 [0, 3], omega [0, 5]
 *   x0, v0    number   initial position and velocity             default 0, 0 (forced) or 1, 0 (free)
 *   tMax      number   length of the time axis                                default 30
 *   var       string   name of the unknown                                    default "x"
 *   names     [string, string, string]   labels for m, c, k (e.g. ["a", "b", "c"])  default ["m", "c", "k"]
 *   response  boolean  amplitude-response panel                              default true when forced
 *   roots     boolean  complex-plane panel for the roots                     default true when free
 *   title     string                                                          default "Mass, spring and damper"
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Plot, Dot, FnPath, Label, Segment, Rect, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Readout, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { useAnimation, useElementSize } from '../kit/hooks';
import { niceCeil, pathD, type Pt } from '../kit/de-ode';

/** Readout labels are upper-cased by the kit; keep maths symbols as written. */
const ncase = (s: string) => <span className="normal-case">{s}</span>;

type Key = 'm' | 'c' | 'k' | 'F0' | 'omega';
const DEFAULT_RANGES: Record<Key, [number, number]> = { m: [0.25, 4], c: [0, 4], k: [0.5, 10], F0: [0, 3], omega: [0, 5] };
const SPRING_W = 64;
const STEPS = 3000;

function readRanges(p: Record<string, unknown>): Record<Key, [number, number]> {
  const v = p.ranges;
  if (v === undefined) return DEFAULT_RANGES;
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('parameter "ranges" should be an object such as {"c": [0, 4]}');
  const out = { ...DEFAULT_RANGES };
  for (const [key, r] of Object.entries(v as Record<string, unknown>)) {
    if (!(key in DEFAULT_RANGES)) throw new Error(`parameter "ranges" has unknown key "${key}" (use m, c, k, F0, omega)`);
    if (!Array.isArray(r) || r.length !== 2 || !r.every((x) => typeof x === 'number') || !(r[0] < r[1])) throw new Error(`parameter "ranges.${key}" should be [min, max] with min < max`);
    out[key as Key] = [r[0], r[1]];
  }
  if (out.m[0] <= 0) throw new Error('parameter "ranges.m" must stay positive');
  return out;
}

/** Characteristic roots of m r^2 + c r + k = 0. */
function roots(m: number, c: number, k: number) {
  const disc = c * c - 4 * m * k;
  if (disc >= 0) {
    const s = Math.sqrt(disc);
    return { complex: false, r1: (-c + s) / (2 * m), r2: (-c - s) / (2 * m), re: NaN, im: 0, disc };
  }
  return { complex: true, r1: NaN, r2: NaN, re: -c / (2 * m), im: Math.sqrt(-disc) / (2 * m), disc };
}

function amp(m: number, c: number, k: number, F0: number, w: number) {
  return F0 / Math.hypot(k - m * w * w, c * w);
}

/** RK4 solution sampled at STEPS + 1 equally spaced times. */
function simulate(m: number, c: number, k: number, F0: number, w: number, x0: number, v0: number, tMax: number): Float64Array {
  const out = new Float64Array(STEPS + 1);
  const h = tMax / STEPS;
  let x = x0;
  let v = v0;
  const acc = (t: number, x: number, v: number) => (F0 * Math.cos(w * t) - c * v - k * x) / m;
  out[0] = x;
  for (let i = 0; i < STEPS; i++) {
    const t = i * h;
    const k1x = v;
    const k1v = acc(t, x, v);
    const k2x = v + (h / 2) * k1v;
    const k2v = acc(t + h / 2, x + (h / 2) * k1x, v + (h / 2) * k1v);
    const k3x = v + (h / 2) * k2v;
    const k3v = acc(t + h / 2, x + (h / 2) * k2x, v + (h / 2) * k2v);
    const k4x = v + h * k3v;
    const k4v = acc(t + h, x + h * k3x, v + h * k3v);
    x += (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    v += (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
    out[i + 1] = x;
  }
  return out;
}

function sample(xs: Float64Array, t: number, tMax: number): number {
  const u = clamp((t / tMax) * STEPS, 0, STEPS);
  const i = Math.min(STEPS - 1, Math.floor(u));
  const f = u - i;
  return xs[i] * (1 - f) + xs[i + 1] * f;
}

function Spring({ height, yPix, force }: { height: number; yPix: number; force: number }) {
  const cx = SPRING_W / 2;
  const block = 20;
  const top = 6;
  const bottom = yPix - block / 2;
  const coils = 9;
  let d = `M${cx},${top}L${cx},${top + 4}`;
  const len = Math.max(2, bottom - top - 8);
  for (let i = 0; i < coils * 2; i++) {
    const y = top + 4 + (len * (i + 0.5)) / (coils * 2);
    d += `L${cx + (i % 2 ? -9 : 9)},${y.toFixed(1)}`;
  }
  d += `L${cx},${(top + 4 + len).toFixed(1)}L${cx},${bottom.toFixed(1)}`;
  const fl = clamp(force, -1, 1) * 22;
  return (
    <svg width={SPRING_W} height={height} className="block shrink-0 rounded-lg bg-surface" aria-hidden>
      <rect x={6} y={0} width={SPRING_W - 12} height={5} fill="var(--plot-axis)" />
      <path d={d} fill="none" stroke="var(--color-ink-2)" strokeWidth={1.6} strokeLinejoin="round" />
      <rect x={cx - 15} y={yPix - block / 2} width={30} height={block} rx={4} fill="var(--plot-1)" />
      {Math.abs(fl) > 2 && (
        <g stroke="var(--plot-4)" fill="var(--plot-4)" strokeWidth={2.5}>
          <line x1={cx} y1={yPix} x2={cx} y2={yPix - fl} />
          <polygon points={`${cx},${yPix - fl - Math.sign(fl) * 6} ${cx - 5},${yPix - fl} ${cx + 5},${yPix - fl}`} />
        </g>
      )}
    </svg>
  );
}

function Series({ xs, tMax, color = 'var(--plot-1)', width = 2.25 }: { xs: Float64Array; tMax: number; color?: string; width?: number }) {
  const { sx, sy } = usePlot();
  const d = useMemo(() => {
    const pts: Pt[] = [];
    for (let i = 0; i <= STEPS; i += 2) pts.push([(i / STEPS) * tMax, xs[i]]);
    return pathD(pts, sx, sy);
  }, [xs, tMax, sx, sy]);
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" />;
}

function Locus({ m, k, cMin, cMax }: { m: number; k: number; cMin: number; cMax: number }) {
  const { sx, sy } = usePlot();
  const d = useMemo(() => {
    const up: Pt[] = [];
    const down: Pt[] = [];
    for (let i = 0; i <= 400; i++) {
      const c = cMin + ((cMax - cMin) * i) / 400;
      const r = roots(m, c, k);
      if (r.complex) {
        up.push([r.re, r.im]);
        down.push([r.re, -r.im]);
      } else {
        up.push([r.r1, 0]);
        down.push([r.r2, 0]);
      }
    }
    return pathD(up, sx, sy) + pathD(down, sx, sy);
  }, [m, k, cMin, cMax, sx, sy]);
  return <path d={d} fill="none" stroke="var(--plot-axis)" strokeWidth={1.5} strokeDasharray="4 4" />;
}

export default function Oscillator({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['forced', 'free'] as const, 'forced');
  const forced = mode === 'forced';
  const R = readRanges(params);
  const init = {
    m: num(params, 'm', 1),
    c: num(params, 'c', 0.4),
    k: num(params, 'k', 4),
    F0: forced ? num(params, 'F0', 1) : 0,
    omega: num(params, 'omega', 1.5),
  };
  if (!(init.m > 0)) throw new Error('parameter "m" must be positive');
  const x0 = num(params, 'x0', forced ? 0 : 1);
  const v0 = num(params, 'v0', 0);
  const tMax = num(params, 'tMax', 30);
  if (!(tMax > 0)) throw new Error('parameter "tMax" must be positive');
  const xName = str(params, 'var', 'x');
  const names = strArray(params, 'names', ['m', 'c', 'k']);
  if (names.length !== 3) throw new Error('parameter "names" should be three labels for m, c and k');
  const showResponse = bool(params, 'response', forced) && forced;
  const showRoots = bool(params, 'roots', !forced);

  const [p, setP] = useState(init);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [steady, setSteady] = useState(true);
  const { m, c, k, F0, omega } = p;
  const set = (key: Key) => (v: number) => setP((s) => ({ ...s, [key]: v }));

  const xs = useMemo(() => simulate(m, c, k, F0, omega, x0, v0, tMax), [m, c, k, F0, omega, x0, v0, tMax]);
  const M = useMemo(() => {
    let mx = 0;
    for (let i = 0; i <= STEPS; i++) if (Number.isFinite(xs[i])) mx = Math.max(mx, Math.abs(xs[i]));
    return niceCeil(Math.max(mx, 1e-3) * 1.3);
  }, [xs]);

  const speed = tMax / 15;
  useAnimation(playing, (dt) =>
    setT((s) => {
      const n = s + dt * speed;
      if (n >= tMax) {
        setPlaying(false);
        return tMax;
      }
      return n;
    }),
  );

  const [wrapRef, wrap] = useElementSize<HTMLDivElement>();
  const graphW = Math.max(200, (wrap.width || 640) - SPRING_W - 8);
  const H = Math.round(clamp(graphW * 0.5, 220, 360));
  const xNow = sample(xs, t, tMax);
  const yPix = H - ((clamp(xNow, -M, M) + M) / (2 * M)) * H;

  const r = roots(m, c, k);
  const w0 = Math.sqrt(k / m);
  const zeta = c / (2 * Math.sqrt(m * k));
  const crit = Math.abs(r.disc) < 1e-9 * (c * c + 4 * m * k);
  const regime = c < 0 ? 'Negative damping: grows' : c === 0 ? 'Undamped' : crit ? 'Critically damped' : r.complex ? 'Underdamped' : 'Overdamped';
  const wd = r.complex ? r.im : NaN;
  const wr2 = w0 * w0 - (c * c) / (2 * m * m);
  const wr = wr2 > 0 && c > 0 ? Math.sqrt(wr2) : NaN;
  const A = amp(m, c, k, F0, omega);
  const delta = Math.atan2(c * omega, k - m * omega * omega);
  const atRest = x0 === 0 && v0 === 0;

  // Amplitude-response scale: fixed by the starting parameters so a change of damping is visible.
  const gain0 = useMemo(() => {
    const w2 = init.k / init.m - (init.c * init.c) / (2 * init.m * init.m);
    const peak = init.c > 0 ? (w2 > 0 ? amp(init.m, init.c, init.k, 1, Math.sqrt(w2)) : 1 / init.k) : 4 / init.k;
    return peak * 1.3;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const ampMax = niceCeil(Math.max(F0, 1e-6) * gain0);

  const rootText = r.complex ? `${fmt(r.re)} ± ${fmt(r.im)}i` : crit ? `${fmt(r.r1)} (double)` : `${fmt(r.r1)}, ${fmt(r.r2)}`;
  const [nm, nc, nk] = names;
  const co = (v: number) => (v === 1 ? '' : `${fmt(v)}\\,`);
  const eqTex = `${co(m)}${xName}'' ${c < 0 ? '-' : '+'} ${co(Math.abs(c))}${xName}' + ${co(k)}${xName} = ${forced ? `${co(F0)}\\cos(${fmt(omega)}\\,t)` : '0'}`.replace(/−/g, '-');

  // Roots-plane view: wide enough for the farthest root over the damping range.
  const far = (cc: number) => {
    const rr = roots(m, cc, k);
    return rr.complex ? [rr.re] : [rr.r1, rr.r2];
  };
  const reAll = [...far(R.c[0]), ...far(R.c[1]), -w0, w0 * 0.3];
  const reLo = Math.min(...reAll) * 1.15;
  const reHi = Math.max(...reAll, 0.3 * w0) * 1.15;
  const imHi = w0 * 1.35;

  return (
    <Frame
      title={str(params, 'title', 'Mass, spring and damper')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
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
      <div className="overflow-x-auto text-sm">
        <Tex>{eqTex}</Tex>
      </div>
      <div ref={wrapRef} className="flex gap-2">
        <Spring height={H} yPix={yPix} force={F0 > 0 ? (F0 * Math.cos(omega * t)) / Math.max(F0, R.F0[1] / 2) : 0} />
        <div className="min-w-0 flex-1">
          <Plot view={[0, tMax, -M, M]} minHeight={H} maxHeight={H} xLabel="t" yLabel={xName} label={`Graph of ${xName}(t)`}>
            {forced && steady && c > 0 && F0 > 0 && <FnPath f={(s) => A * Math.cos(omega * s - delta)} color="var(--plot-3)" width={1.6} dash="5 4" />}
            {forced && c === 0 && F0 > 0 && atRest && (
              <>
                {Math.abs(omega - w0) > 1e-9 ? (
                  <>
                    <FnPath f={(s) => ((2 * F0) / m / Math.abs(w0 * w0 - omega * omega)) * Math.abs(Math.sin(((w0 - omega) * s) / 2))} color="var(--plot-4)" width={1.5} dash="5 4" />
                    <FnPath f={(s) => -((2 * F0) / m / Math.abs(w0 * w0 - omega * omega)) * Math.abs(Math.sin(((w0 - omega) * s) / 2))} color="var(--plot-4)" width={1.5} dash="5 4" />
                  </>
                ) : (
                  <>
                    <FnPath f={(s) => (F0 * s) / (2 * m * w0)} color="var(--plot-4)" width={1.5} dash="5 4" />
                    <FnPath f={(s) => -(F0 * s) / (2 * m * w0)} color="var(--plot-4)" width={1.5} dash="5 4" />
                  </>
                )}
              </>
            )}
            <Series xs={xs} tMax={tMax} />
            <Segment x1={0} x2={t} y1={xNow} y2={xNow} color="var(--plot-axis)" dash="3 4" width={1} />
            <Dot x={t} y={xNow} r={5} color="var(--plot-1)" />
          </Plot>
        </div>
      </div>

      {(showResponse || showRoots) && (
        <div className={`grid gap-3 ${showResponse && showRoots ? 'sm:grid-cols-2' : ''}`}>
          {showResponse && (
            <div>
              <div className="mb-1 text-[13px] text-ink-2">Steady-state amplitude A(ω)</div>
              <Plot view={[0, R.omega[1], 0, ampMax]} aspect={showRoots ? 0.6 : 0.34} minHeight={180} maxHeight={showRoots ? 260 : 240} xLabel="ω" yLabel="A" label="Amplitude response">
                <Segment x1={w0} x2={w0} y1={0} y2={ampMax} color="var(--plot-axis)" dash="3 4" width={1} />
                <Label x={w0} y={ampMax} dx={4} dy={14} size={11}>
                  ω₀
                </Label>
                <FnPath f={(w) => amp(m, c, k, F0, w)} color="var(--plot-5)" />
                {Number.isFinite(wr) && <Dot x={wr} y={amp(m, c, k, F0, wr)} r={3.5} color="var(--plot-5)" hollow />}
                <Segment x1={omega} x2={omega} y1={0} y2={Math.min(A, ampMax)} color="var(--plot-4)" width={1.5} />
                <Dot x={omega} y={Math.min(A, ampMax)} r={5} color="var(--plot-4)" />
              </Plot>
            </div>
          )}
          {showRoots && (
            <div>
              <div className="mb-1 text-[13px] text-ink-2">Characteristic roots in the complex plane</div>
              <Plot view={[reLo, reHi, -imHi, imHi]} equal aspect={0.75} minHeight={180} maxHeight={280} xLabel="Re" yLabel="Im" label="Characteristic roots">
                <Rect x={reLo * 3} y={-imHi * 3} w={-reLo * 3} h={imHi * 6} fill="var(--plot-3)" opacity={0.07} />
                <Locus m={m} k={k} cMin={R.c[0]} cMax={R.c[1]} />
                {r.complex ? (
                  <>
                    <Dot x={r.re} y={r.im} r={5.5} color="var(--plot-2)" />
                    <Dot x={r.re} y={-r.im} r={5.5} color="var(--plot-2)" />
                    <Label x={r.re} y={r.im} dx={8} dy={-6}>
                      r₁
                    </Label>
                    <Label x={r.re} y={-r.im} dx={8} dy={14}>
                      r₂
                    </Label>
                  </>
                ) : (
                  <>
                    <Dot x={r.r1} y={0} r={5.5} color="var(--plot-2)" />
                    <Dot x={r.r2} y={0} r={5.5} color="var(--plot-2)" />
                  </>
                )}
              </Plot>
            </div>
          )}
        </div>
      )}

      <Controls cols={3}>
        <Slider label={`${nm} (mass)`} value={m} min={R.m[0]} max={R.m[1]} step={(R.m[1] - R.m[0]) / 200} onChange={set('m')} />
        <Slider label={`${nc} (damping)`} value={c} min={R.c[0]} max={R.c[1]} step={(R.c[1] - R.c[0]) / 200} onChange={set('c')} />
        <Slider label={`${nk} (stiffness)`} value={k} min={R.k[0]} max={R.k[1]} step={(R.k[1] - R.k[0]) / 200} onChange={set('k')} />
        {forced && <Slider label="F₀ (force amplitude)" value={F0} min={R.F0[0]} max={R.F0[1]} step={(R.F0[1] - R.F0[0]) / 200} onChange={set('F0')} />}
        {forced && <Slider label="ω (driving frequency)" value={omega} min={R.omega[0]} max={R.omega[1]} step={(R.omega[1] - R.omega[0]) / 500} onChange={set('omega')} />}
        <Slider label="Time t" value={t} min={0} max={tMax} step={tMax / 600} onChange={(v) => (setPlaying(false), setT(v))} />
      </Controls>

      <Controls cols={3}>
        <Readout label={ncase("Natural frequency ω₀")} value={fmt(w0)} />
        <Readout label={ncase("Damping ratio ζ")} value={fmt(zeta)} />
        <Readout label={ncase("Regime")} value={regime} />
        <Readout label={ncase("Characteristic roots")} value={rootText} tone="var(--plot-2)" />
        {forced ? (
          <>
            <Readout label={ncase("Amplitude A(ω)")} value={c === 0 && Math.abs(omega - w0) < 1e-9 ? '∞ (pure resonance)' : fmt(A)} tone="var(--plot-4)" />
            <Readout label={ncase("Resonance ω_r, A(ω_r)")} value={Number.isFinite(wr) ? `${fmt(wr)}, ${fmt(amp(m, c, k, F0, wr))}` : c === 0 ? `ω₀ = ${fmt(w0)}, ∞` : `none (${nc}² ≥ 2${nm}${nk})`} />
          </>
        ) : (
          <>
            <Readout label={ncase("Damped frequency ω_d")} value={Number.isFinite(wd) ? fmt(wd) : '— (no oscillation)'} />
            <Readout label={ncase(`Discriminant ${nc}² − 4${nm}${nk}`)} value={fmt(r.disc)} />
          </>
        )}
      </Controls>
      {forced && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-3">
          <Toggle label="Show steady state (green, dashed)" checked={steady} onChange={setSteady} />
          {c === 0 && F0 > 0 && atRest && <span>Amber dashed: the beat envelope{Math.abs(omega - w0) < 1e-9 ? ' (here the linear growth of pure resonance)' : ''}.</span>}
        </div>
      )}
    </Frame>
  );
}
