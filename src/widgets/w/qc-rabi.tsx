/**
 * qc-rabi: a driven two-level system, as when a microwave pulse drives a transmon qubit.
 * Rotating frame, drive along x: the Bloch vector obeys dr/dt = w x r with w = (Omega, 0, Delta)
 * (angular frequencies), plus damping -x/T2, -y/T2, -(z - 1)/T1 when T1, T2 are set. The qubit
 * starts in |0> (z = +1) and P(1) = (1 - z)/2.
 *
 *   rabi    P(1) against pulse length t. Without damping
 *             P1(t) = Omega^2/(Omega^2 + Delta^2) sin^2(pi sqrt(Omega^2 + Delta^2) t)
 *           with Omega, Delta in cycles (MHz) and t in microseconds, so Omega/2pi = 10 MHz gives a
 *           pi pulse of 1/(2 x 10 MHz) = 50 ns. With T1 or T2 the Bloch equations are integrated
 *           numerically (RK4) and the oscillation decays.
 *   ramsey  pi/2 pulse about x, free evolution for tau at detuning Delta, second pi/2 pulse about x
 *           (pulses treated as instantaneous). Then
 *             P1(tau) = (1/2) (1 + cos(2 pi Delta tau) e^{-tau/T2}),
 *           so tau = 0 gives P1 = 1 (two pi/2 pulses make a pi pulse), the fringes have period
 *           1/Delta, and their envelope decays with T2. T1 does not enter beyond limiting T2 <= 2 T1.
 *
 * Params:
 *   mode       string    "rabi" | "ramsey"                                      default "rabi"
 *   modes      string[]  modes offered as buttons                               default ["rabi", "ramsey"]
 *   omega      number    Rabi frequency Omega/2pi in MHz (0.5-50)               default 10
 *   detuning   number    drive detuning Delta/2pi in MHz (-30 to 30)            default 0 (2 when mode is "ramsey")
 *   t          number    pulse length in ns (rabi)                              default 0
 *   tau        number    free-evolution time in ns (ramsey)                     default 0
 *   T1         number    relaxation time in microseconds; 0 = none             default 0
 *   T2         number    coherence time in microseconds; 0 = none (2 T1 if T1 is set in rabi mode)  default 0
 *   tmax       number    longest pulse plotted, ns                              default 200
 *   taumax     number    longest free evolution plotted, ns                     default 2000
 *   sphere     boolean   small Bloch sphere showing the trajectory              default true
 *   title      string                                                           default "Rabi oscillations"
 *   caption    string    what to try; may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { Dot, Plot, Poly, Segment } from '../kit/Plot';
import { Scene3D, arrow, polyline, type Cam, type Proj, type Vec3 } from '../kit/calc3-3d';
import { TL, caption, useColors } from '../kit/calc3-ui';
import { fmt } from '../kit/num';
import { fmtC, rotate, type V3 } from '../kit/qc-sim';
import { drawBlochBackdrop } from '../kit/qc-ui';

const MODES = ['rabi', 'ramsey'] as const;
type Mode = (typeof MODES)[number];
const TAU = 2 * Math.PI;

/** Integrates the damped Bloch equations from r0 for `dur` microseconds, returning samples. */
function evolve(r0: V3, w: V3, T1: number, T2: number, dur: number, nOut: number): V3[] {
  const wl = Math.hypot(...w);
  const h0 = Math.min(wl > 0 ? TAU / wl / 80 : dur, dur / Math.max(1, nOut), dur || 1);
  const g1 = T1 > 0 ? 1 / T1 : 0;
  const g2 = T2 > 0 ? 1 / T2 : 0;
  const f = (r: V3): V3 => [
    w[1] * r[2] - w[2] * r[1] - g2 * r[0],
    w[2] * r[0] - w[0] * r[2] - g2 * r[1],
    w[0] * r[1] - w[1] * r[0] - g1 * (r[2] - 1),
  ];
  const out: V3[] = [r0];
  let r = r0;
  for (let k = 1; k <= nOut; k++) {
    const tEnd = (dur * k) / nOut;
    const tStart = (dur * (k - 1)) / nOut;
    const m = Math.max(1, Math.ceil((tEnd - tStart) / h0));
    const h = (tEnd - tStart) / m;
    for (let i = 0; i < m; i++) {
      const k1 = f(r);
      const k2 = f([r[0] + (h / 2) * k1[0], r[1] + (h / 2) * k1[1], r[2] + (h / 2) * k1[2]]);
      const k3 = f([r[0] + (h / 2) * k2[0], r[1] + (h / 2) * k2[1], r[2] + (h / 2) * k2[2]]);
      const k4 = f([r[0] + h * k3[0], r[1] + h * k3[1], r[2] + h * k3[2]]);
      r = [r[0] + (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), r[1] + (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]), r[2] + (h / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2])];
    }
    out.push(r);
  }
  return out;
}

const fmtNs = (ns: number) => (ns >= 1000 ? `${fmt(ns / 1000, 3)} μs` : `${fmt(ns, 3)} ns`);

export default function QcRabi({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'rabi');
  const modes = strArray(params, 'modes', [...MODES]);
  for (const m of modes) if (!(MODES as readonly string[]).includes(m)) throw new Error(`parameter "modes": unknown mode "${m}" (use rabi, ramsey)`);
  const om0 = num(params, 'omega', 10);
  if (!(om0 >= 0.5 && om0 <= 50)) throw new Error('parameter "omega" should be between 0.5 and 50 (MHz)');
  const de0 = num(params, 'detuning', mode0 === 'ramsey' ? 2 : 0);
  if (Math.abs(de0) > 30) throw new Error('parameter "detuning" should be between −30 and 30 (MHz)');
  const tmax = num(params, 'tmax', 200);
  const taumax = num(params, 'taumax', 2000);
  if (!(tmax > 0) || !(taumax > 0)) throw new Error('parameters "tmax" and "taumax" should be positive (ns)');
  const T1_0 = num(params, 'T1', 0);
  const T2_0 = num(params, 'T2', 0);
  if (T1_0 < 0 || T2_0 < 0) throw new Error('parameters "T1" and "T2" should be 0 (none) or positive (microseconds)');
  const sphere = bool(params, 'sphere', true);

  const [mode, setMode] = useState<Mode>(mode0);
  const [om, setOm] = useState(om0);
  const [de, setDe] = useState(de0);
  const [t, setT] = useState(Math.min(tmax, num(params, 't', 0)));
  const [tau, setTau] = useState(Math.min(taumax, num(params, 'tau', 0)));
  const [T1, setT1] = useState(T1_0);
  const [T2raw, setT2] = useState(T2_0);
  const [cam, setCam] = useState<Cam>({ az: 25, el: 18 });
  const C = useColors();

  // Effective T2: capped at 2 T1; in Rabi mode "0" with T1 set means the T1 limit 2 T1.
  const T2cap = T1 > 0 && T2raw > 2 * T1;
  const T2 = T1 > 0 ? (T2raw > 0 ? Math.min(T2raw, 2 * T1) : mode === 'rabi' ? 2 * T1 : 0) : T2raw;
  const damped = mode === 'rabi' && (T1 > 0 || T2 > 0);
  const w: V3 = [TAU * om, 0, TAU * de]; // rad per microsecond
  const wEff = Math.hypot(om, de); // MHz
  const tPi = 1000 / (2 * om); // ns, on resonance

  const rabi = useMemo(() => {
    const periods = (wEff * tmax) / 1000;
    const n = Math.min(4000, Math.max(600, Math.ceil(periods * 50)));
    if (damped) return evolve([0, 0, 1], w, T1, T2, tmax / 1000, n).map((r, i) => [(tmax * i) / n, (1 - r[2]) / 2] as [number, number]);
    return Array.from({ length: n + 1 }, (_, i) => {
      const tt = (tmax * i) / n;
      return [tt, ((om * om) / (wEff * wEff)) * Math.sin(Math.PI * wEff * (tt / 1000)) ** 2] as [number, number];
    });
  }, [om, de, T1, T2, tmax, damped]); // eslint-disable-line react-hooks/exhaustive-deps

  const rabiPath = useMemo<V3[]>(() => {
    if (t <= 0) return [[0, 0, 1]];
    const n = Math.min(800, Math.max(60, Math.ceil(((wEff * t) / 1000) * 40)));
    if (damped) return evolve([0, 0, 1], w, T1, T2, t / 1000, n);
    const ax: V3 = [om / wEff, 0, de / wEff];
    return Array.from({ length: n + 1 }, (_, i) => rotate([0, 0, 1], ax, (TAU * wEff * (t / 1000) * i) / n));
  }, [om, de, T1, T2, t, damped]); // eslint-disable-line react-hooks/exhaustive-deps

  const ramseyP = (tt: number) => 0.5 * (1 + Math.cos(TAU * de * (tt / 1000)) * (T2 > 0 ? Math.exp(-tt / 1000 / T2) : 1));
  const ramsey = useMemo(() => {
    const periods = (Math.abs(de) * taumax) / 1000;
    const n = Math.min(4000, Math.max(400, Math.ceil(periods * 50)));
    return Array.from({ length: n + 1 }, (_, i) => {
      const tt = (taumax * i) / n;
      return [tt, ramseyP(tt)] as [number, number];
    });
  }, [de, T2, taumax]); // eslint-disable-line react-hooks/exhaustive-deps

  const ramseyPath = useMemo<V3[]>(() => {
    const pts: V3[] = [];
    for (let i = 0; i <= 20; i++) pts.push(rotate([0, 0, 1], [1, 0, 0], (Math.PI / 2) * (i / 20)));
    const n = Math.min(600, Math.max(30, Math.ceil(((Math.abs(de) * tau) / 1000) * 40)));
    let last: V3 = [0, -1, 0];
    for (let i = 1; i <= n; i++) {
      const tt = ((tau / 1000) * i) / n;
      const e = T2 > 0 ? Math.exp(-tt / T2) : 1;
      const zr = T1 > 0 ? 1 - Math.exp(-tt / T1) : 0;
      last = [Math.sin(TAU * de * tt) * e, -Math.cos(TAU * de * tt) * e, zr];
      pts.push(last);
    }
    const end = last;
    for (let i = 1; i <= 20; i++) pts.push(rotate(end, [1, 0, 0], (Math.PI / 2) * (i / 20)));
    return pts;
  }, [de, tau, T1, T2]);

  const path = mode === 'rabi' ? rabiPath : ramseyPath;
  const rNow = path[path.length - 1];
  const pNow = mode === 'rabi' ? (1 - rNow[2]) / 2 : ramseyP(tau);

  const draw = (ctx: CanvasRenderingContext2D, P: Proj) => {
    drawBlochBackdrop(ctx, P, C, { labels: true });
    polyline(ctx, P, path as Vec3[], C.p[3], 2);
    if (mode === 'rabi' && wEff > 0) {
      const a: Vec3 = [om / wEff, 0, de / wEff];
      polyline(ctx, P, [[-a[0] * 1.15, 0, -a[2] * 1.15], [a[0] * 1.15, 0, a[2] * 1.15]], C.p[4], 1.5, [5, 4]);
    }
    if (Math.hypot(...rNow) > 0.02) arrow(ctx, P, [0, 0, 0], rNow as Vec3, C.p[0], 2.75, 11);
  };

  const xMax = mode === 'rabi' ? tmax : taumax;
  const cur = mode === 'rabi' ? t : tau;
  const T2label = (v: number) => (v === 0 ? 'off' : `${fmt(v, 3)} μs`);

  return (
    <Frame title={str(params, 'title', mode0 === 'ramsey' ? 'Ramsey fringes' : 'Rabi oscillations')} caption={caption(params)}>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m as Mode, label: m === 'rabi' ? 'Rabi: one pulse of length t' : 'Ramsey: π/2 – wait τ – π/2' }))} value={mode} onChange={setMode} />}
      <div className={sphere ? 'grid gap-3 md:grid-cols-[3fr_2fr]' : ''}>
        <Plot view={[0, xMax, -0.05, 1.16]} aspect={0.6} minHeight={220} maxHeight={340} xLabel={mode === 'rabi' ? 't (ns)' : 'τ (ns)'} yLabel="P(1)" label={mode === 'rabi' ? 'Probability of |1⟩ against pulse length' : 'Ramsey fringes: probability of |1⟩ against waiting time'}>
          {mode === 'ramsey' && T2 > 0 && (
            <>
              <Poly points={ramsey.map(([x]) => [x, 0.5 * (1 + Math.exp(-x / 1000 / T2))] as [number, number])} color="var(--plot-6)" width={1.25} dash="5 4" />
              <Poly points={ramsey.map(([x]) => [x, 0.5 * (1 - Math.exp(-x / 1000 / T2))] as [number, number])} color="var(--plot-6)" width={1.25} dash="5 4" />
            </>
          )}
          {mode === 'rabi' && !damped && de !== 0 && <Segment x1={0} y1={(om * om) / (wEff * wEff)} x2={xMax} y2={(om * om) / (wEff * wEff)} color="var(--plot-6)" dash="5 4" width={1.25} />}
          <Poly points={mode === 'rabi' ? rabi : ramsey} color="var(--plot-1)" width={2.25} />
          <Segment x1={cur} y1={-0.05} x2={cur} y2={1.16} color="var(--plot-4)" dash="4 3" width={1.25} />
          <Dot x={cur} y={pNow} color="var(--plot-4)" r={5.5} />
        </Plot>
        {sphere && <Scene3D cam={cam} onCam={setCam} fit={1.55} draw={draw} aspect={0.9} minHeight={220} maxHeight={340} label={`Bloch vector (${rNow.map((c) => c.toFixed(2)).join(', ')})`} />}
      </div>

      <Controls cols={2}>
        {mode === 'rabi' ? (
          <Slider label="Pulse length t" value={t} min={0} max={tmax} step={tmax / 400} format={fmtNs} onChange={setT} />
        ) : (
          <Slider label="Waiting time τ" value={tau} min={0} max={taumax} step={taumax / 400} format={fmtNs} onChange={setTau} />
        )}
        {mode === 'rabi' && <Slider label="Rabi frequency Ω/2π" value={om} min={0.5} max={50} step={0.5} format={(v) => `${fmt(v)} MHz`} onChange={setOm} />}
        <Slider label="Detuning Δ/2π" value={de} min={-30} max={30} step={0.1} format={(v) => `${fmt(v)} MHz`} onChange={setDe} />
        {mode === 'rabi' && <Slider label="T1 (0 = none)" value={T1} min={0} max={10} step={0.05} format={T2label} onChange={setT1} />}
        <Slider label="T2 (0 = none)" value={T2raw} min={0} max={10} step={0.05} format={T2label} onChange={setT2} />
      </Controls>
      {mode === 'rabi' && (
        <div className="flex flex-wrap gap-1.5">
          <Button onClick={() => setT(Math.min(tmax, tPi / 2))}>π/2 pulse</Button>
          <Button onClick={() => setT(Math.min(tmax, tPi))}>π pulse</Button>
          <Button onClick={() => setT(Math.min(tmax, 2 * tPi))}>2π pulse</Button>
          <Button onClick={() => setT(0)}>t = 0</Button>
        </div>
      )}
      {T2cap && <Note tone="warn">T2 cannot exceed 2T1, so T2 = {fmt(T2, 3)} μs is used.</Note>}

      <Controls cols={3}>
        {mode === 'rabi' ? (
          <>
            <Readout label={<TL>{'t_\\pi = 1/(2\\,\\Omega/2\\pi)'}</TL>} value={fmtNs(tPi)} />
            <Readout label={<TL>{'t_{\\pi/2}'}</TL>} value={fmtNs(tPi / 2)} />
            <Readout label={<TL>{'\\sqrt{\\Omega^2+\\Delta^2}/2\\pi'}</TL>} value={`${fmt(wEff, 4)} MHz`} />
            <Readout label={<TL>{'\\max P(1) = \\Omega^2/(\\Omega^2+\\Delta^2)'}</TL>} value={fmt((om * om) / (wEff * wEff), 4)} tone="var(--plot-6)" />
          </>
        ) : (
          <>
            <Readout label="Fringe period 1/Δ" value={de === 0 ? '∞ (no fringes)' : fmtNs(1000 / Math.abs(de))} />
            <Readout label="Envelope at τ" value={T2 > 0 ? fmt(Math.exp(-tau / 1000 / T2), 4) : '1 (no decay)'} tone="var(--plot-6)" />
          </>
        )}
        <Readout label={mode === 'rabi' ? 'P(1) at t' : 'P(1) at τ'} value={fmt(pNow, 4)} tone="var(--plot-4)" />
        <Readout label={<TL>{'(x, y, z)'}</TL>} value={`(${rNow.map((c) => fmtC(c, 0)).join(', ')})`} tone="var(--plot-1)" />
      </Controls>
      {mode === 'rabi' && damped && <Note>With damping the Bloch equations are integrated numerically: the oscillation decays toward a steady state and P(1) no longer reaches its undamped maximum.</Note>}
    </Frame>
  );
}
