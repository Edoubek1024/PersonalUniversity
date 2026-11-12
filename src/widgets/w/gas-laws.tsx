/**
 * gas-laws: an ideal gas in a cylinder with a piston. Set the amount n, the temperature T and,
 * with a rigid piston, the volume V; the pressure follows from PV = nRT. With a free piston the
 * pressure is held and V follows instead (Charles's and Avogadro's laws). Particles move with a
 * speed proportional to sqrt(T/M) (Play to animate). A graph shows the current state on a Boyle
 * isotherm (P against V), a Charles line (V against T) or a Gay-Lussac line (P against T).
 * With "mixture" on, a second gas is added and the partial pressures and mole fractions are shown.
 *
 * Constants: R = 0.08206 L atm/(mol K) = 8.314 J/(mol K); 1 atm = 101.325 kPa.
 *
 * Params:
 *   n        number                 moles of gas A, 0.1-3                          default 1
 *   T        number                 temperature in kelvin, 50-800                  default 300
 *   V        number                 volume in litres, 2-50                         default 24.62
 *   hold     "V" | "P"              what stays fixed when T or n change            default "V"
 *   graph    "PV" | "VT" | "PT"     which law to plot                              default "PV"
 *   mixture  boolean                add gas B                                      default false
 *   n2       number                 moles of gas B, 0-3                            default 0.5
 *   labels   [string, string]       names of gas A and gas B                       default ["gas A", "gas B"]
 *   M        [number, number]       molar masses in g/mol (set the particle speeds) default [28, 4]
 *   title    string                                                                default "Ideal gas in a cylinder"
 *   caption  string                 what to try
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, strArray } from '../kit/params';
import { Plot, FnPath, Dot, Label } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { useAnimation, useElementSize } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';

const R_LATM = 0.08206;
const R_SI = 8.314;
const KPA = 101.325;
const VMAX = 50;

interface Particle {
  u: number;
  v: number;
  vx: number;
  vy: number;
  gas: 0 | 1;
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeParticles(count: number, gas: 0 | 1, seed: number): Particle[] {
  const r = rng(seed);
  return Array.from({ length: count }, () => {
    const a = r() * 2 * Math.PI;
    return { u: 0.05 + 0.9 * r(), v: 0.05 + 0.9 * r(), vx: Math.cos(a), vy: Math.sin(a), gas };
  });
}

function Cylinder({ V, nA, nB, T, M, running, frame, setFrame }: { V: number; nA: number; nB: number; T: number; M: [number, number]; running: boolean; frame: number; setFrame: (f: (x: number) => number) => void }) {
  const [ref, { width }] = useElementSize<HTMLDivElement>();
  const W = width || 600;
  const H = 150;
  const x0 = 34;
  const full = W - x0 - 22;
  const Lpx = Math.max(8, (Math.min(V, VMAX) / VMAX) * full);
  const countA = Math.max(1, Math.round(nA * 12));
  const countB = nB > 0 ? Math.max(1, Math.round(nB * 12)) : 0;
  const ps = useRef<Particle[]>([]);
  // keep a stable particle set; add or drop particles when n changes
  const want = useMemo(() => [...makeParticles(36, 0, 7).slice(0, countA), ...makeParticles(36, 1, 11).slice(0, countB)], [countA, countB]);
  if (ps.current.length !== want.length || ps.current.filter((p) => p.gas === 0).length !== countA) {
    const keepA = ps.current.filter((p) => p.gas === 0).slice(0, countA);
    const keepB = ps.current.filter((p) => p.gas === 1).slice(0, countB);
    ps.current = [...keepA, ...want.filter((p) => p.gas === 0).slice(keepA.length), ...keepB, ...want.filter((p) => p.gas === 1).slice(keepB.length)].map((p) => ({ ...p }));
  }
  const speed = (gas: 0 | 1) => clamp(70 * Math.sqrt(T / 300 / (M[gas] / 28)), 6, 900);

  useAnimation(running, (dt) => {
    const hpx = H - 24;
    for (const p of ps.current) {
      const s = speed(p.gas);
      p.u += (p.vx * s * dt) / Lpx;
      p.v += (p.vy * s * dt) / hpx;
      if (p.u < 0) {
        p.u = -p.u;
        p.vx = Math.abs(p.vx);
      }
      if (p.u > 1) {
        p.u = 2 - p.u;
        p.vx = -Math.abs(p.vx);
      }
      if (p.v < 0) {
        p.v = -p.v;
        p.vy = Math.abs(p.vy);
      }
      if (p.v > 1) {
        p.v = 2 - p.v;
        p.vy = -Math.abs(p.vy);
      }
      p.u = clamp(p.u, 0, 1);
      p.v = clamp(p.v, 0, 1);
    }
    setFrame((f) => f + 1);
  });

  const top = 10;
  const inner = H - 24;
  return (
    <div ref={ref} className="w-full" data-frame={frame}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Cylinder holding ${fmt(V)} L of gas`} className="block rounded-lg bg-surface">
        {/* cylinder walls */}
        <rect x={x0 - 4} y={top - 4} width={full + 12} height={inner + 8} fill="none" stroke="var(--plot-axis)" strokeWidth={2} rx={4} />
        <rect x={x0} y={top} width={Lpx} height={inner} fill="var(--color-surface-2)" />
        {ps.current.map((p, i) => (
          <circle key={i} cx={x0 + 5 + p.u * (Lpx - 10)} cy={top + 5 + p.v * (inner - 10)} r={4} fill={p.gas ? 'var(--plot-4)' : 'var(--plot-1)'} />
        ))}
        {/* piston */}
        <rect x={x0 + Lpx} y={top - 2} width={8} height={inner + 4} fill="var(--plot-axis)" rx={2} />
        <rect x={x0 + Lpx + 8} y={top + inner / 2 - 3} width={Math.max(0, full - Lpx + 4)} height={6} fill="var(--plot-axis)" opacity={0.6} />
        <text x={4} y={top + inner / 2 + 4} fontSize={11} fill="var(--plot-text)">
          {fmt(V, 3)} L
        </text>
      </svg>
    </div>
  );
}

export default function GasLaws({ params }: WidgetProps) {
  const n0 = num(params, 'n', 1);
  const T0 = num(params, 'T', 300);
  const V0 = num(params, 'V', 24.62);
  if (n0 < 0.1 || n0 > 3) throw new Error('parameter "n" should be between 0.1 and 3');
  if (T0 < 50 || T0 > 800) throw new Error('parameter "T" should be between 50 and 800 (kelvin)');
  if (V0 < 2 || V0 > VMAX) throw new Error(`parameter "V" should be between 2 and ${VMAX} (litres)`);
  const labels = strArray(params, 'labels', ['gas A', 'gas B']);
  const Ms = numArray(params, 'M', [28, 4]);
  if (labels.length !== 2 || Ms.length !== 2 || Ms.some((m) => m <= 0)) throw new Error('parameters "labels" and "M" should each have two entries (M positive, in g/mol)');
  const mixture = bool(params, 'mixture', false);

  const [n, setN] = useState(n0);
  const [n2, setN2] = useState(mixture ? num(params, 'n2', 0.5) : 0);
  const [T, setT] = useState(T0);
  const [hold, setHold] = useState(oneOf(params, 'hold', ['V', 'P'] as const, 'V'));
  const [graph, setGraph] = useState(oneOf(params, 'graph', ['PV', 'VT', 'PT'] as const, 'PV'));
  const ntot0 = n0 + (mixture ? num(params, 'n2', 0.5) : 0);
  const [V, setV] = useState(V0);
  const [P, setP] = useState((ntot0 * R_LATM * T0) / V0);
  const [running, setRunning] = useState(false);
  const [frame, setFrame] = useState(0);

  const ntot = n + n2;
  // whichever of P, V is held, the other follows
  const Vnow = hold === 'P' ? (ntot * R_LATM * T) / P : V;
  const Pnow = hold === 'P' ? P : (ntot * R_LATM * T) / V;

  const set = (next: { n?: number; n2?: number; T?: number; V?: number }) => {
    const nn = next.n ?? n;
    const nn2 = next.n2 ?? n2;
    const TT = next.T ?? T;
    const VV = next.V ?? Vnow;
    if (next.n !== undefined) setN(nn);
    if (next.n2 !== undefined) setN2(nn2);
    if (next.T !== undefined) setT(TT);
    if (hold === 'V') {
      setV(VV);
      setP(((nn + nn2) * R_LATM * TT) / VV);
    }
  };

  const switchHold = (h: 'V' | 'P') => {
    if (h === hold) return;
    if (h === 'P') setP(Pnow);
    else setV(clamp(Vnow, 2, VMAX));
    setHold(h);
  };

  const urms = (M: number) => Math.sqrt((3 * R_SI * T) / (M / 1000));
  const xA = ntot > 0 ? n / ntot : 1;

  const plot = useMemo(() => {
    if (graph === 'PV') {
      const k = ntot * R_LATM * T;
      return { view: [0, VMAX, 0, Math.max(1, (k / 2) * 1.05)] as [number, number, number, number], f: (v: number) => k / v, pt: [Vnow, Pnow] as [number, number], xl: 'V (L)', yl: 'P (atm)' };
    }
    // Against Celsius temperature t: the straight line reaches zero at t = -273.15 °C (0 K).
    const k = graph === 'VT' ? (ntot * R_LATM) / Pnow : (ntot * R_LATM) / Vnow;
    const top = Math.max(1, k * 800 * 1.05);
    return {
      view: [-300, 550, 0, top] as [number, number, number, number],
      f: (t: number) => k * (t + 273.15),
      pt: [T - 273.15, graph === 'VT' ? Vnow : Pnow] as [number, number],
      xl: 't (°C)',
      yl: graph === 'VT' ? 'V (L)' : 'P (atm)',
    };
  }, [graph, ntot, T, Vnow, Pnow]);

  return (
    <Frame
      title={str(params, 'title', 'Ideal gas in a cylinder')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button primary onClick={() => setRunning((r) => !r)}>
            {running ? 'Pause' : 'Play'}
          </Button>
          <Button
            onClick={() => {
              setRunning(false);
              setN(n0);
              setN2(mixture ? num(params, 'n2', 0.5) : 0);
              setT(T0);
              setV(V0);
              setP((ntot0 * R_LATM * T0) / V0);
            }}
          >
            Reset
          </Button>
        </>
      }
    >
      <Cylinder V={Vnow} nA={n} nB={n2} T={T} M={[Ms[0], Ms[1]]} running={running} frame={frame} setFrame={setFrame} />
      {Vnow > VMAX && <Note tone="warn">The volume ({fmt(Vnow, 3)} L) is larger than the drawing; the numbers are still right.</Note>}
      <Controls cols={3}>
        <Readout label="Pressure P = nRT/V" value={`${fmt(Pnow, 4)} atm = ${fmt(Pnow * KPA, 4)} kPa`} tone="var(--plot-2)" />
        <Readout label="Temperature" value={`${fmt(T, 4)} K = ${fmt(T - 273.15, 4)} °C`} />
        <Readout label="Volume" value={`${fmt(Vnow, 4)} L`} />
        {mixture ? (
          <>
            <Readout label={`Partial pressure, ${labels[0]}`} value={`${fmt(Pnow * xA, 4)} atm (x = ${fmt(xA, 3)})`} tone="var(--plot-1)" />
            <Readout label={`Partial pressure, ${labels[1]}`} value={`${fmt(Pnow * (1 - xA), 4)} atm (x = ${fmt(1 - xA, 3)})`} tone="var(--plot-4)" />
            <Readout label="rms speeds" value={`${fmt(urms(Ms[0]), 3)} and ${fmt(urms(Ms[1]), 3)} m/s`} />
          </>
        ) : (
          <>
            <Readout label="PV / nT (should be R)" value={`${fmt((Pnow * Vnow) / (ntot * T), 4)} L·atm/(mol·K)`} />
            <Readout label={`rms speed, M = ${fmt(Ms[0])} g/mol`} value={`${fmt(urms(Ms[0]), 3)} m/s`} />
          </>
        )}
      </Controls>
      <Controls>
        <Segmented
          label="Piston"
          options={[
            { value: 'V', label: 'Locked: V fixed, P follows' },
            { value: 'P', label: 'Free: P fixed, V follows' },
          ]}
          value={hold}
          onChange={switchHold}
        />
        <Segmented
          label="Graph"
          options={[
            { value: 'PV', label: 'P vs V (Boyle)' },
            { value: 'VT', label: 'V vs T (Charles)' },
            { value: 'PT', label: 'P vs T (Gay-Lussac)' },
          ]}
          value={graph}
          onChange={setGraph}
        />
        <Slider label={`n, ${labels[0]} (mol)`} value={n} min={0.1} max={3} step={0.05} onChange={(v) => set({ n: v })} />
        {mixture && <Slider label={`n, ${labels[1]} (mol)`} value={n2} min={0} max={3} step={0.05} onChange={(v) => set({ n2: v })} />}
        <Slider label="T (K)" value={T} min={50} max={800} step={5} onChange={(v) => set({ T: v })} />
        <Slider label={hold === 'V' ? 'V (L)' : 'V (L), set by the free piston'} value={clamp(Vnow, 2, VMAX)} min={2} max={VMAX} step={0.5} disabled={hold === 'P'} onChange={(v) => set({ V: v })} />
      </Controls>
      <Plot view={plot.view} aspect={0.5} minHeight={200} maxHeight={300} xLabel={plot.xl} yLabel={plot.yl} label={`Graph of ${plot.yl} against ${plot.xl}`}>
        {graph === 'PV' ? (
          <FnPath f={plot.f} from={0.5} color="var(--plot-1)" />
        ) : (
          <>
            <FnPath f={plot.f} from={50 - 273.15} color="var(--plot-1)" />
            <FnPath f={plot.f} from={-273.15} to={50 - 273.15} color="var(--plot-1)" dash="5 5" opacity={0.6} />
            <Dot x={-273.15} y={0} r={4} color="var(--plot-text)" />
            <Label x={-273.15} y={0} dy={-24} dx={4} size={11}>
              −273.15 °C = 0 K
            </Label>
          </>
        )}
        <Dot x={plot.pt[0]} y={plot.pt[1]} r={6} color="var(--plot-2)" />
      </Plot>
      {graph !== 'PV' && (
        <Note>
          Against Celsius temperature the line is straight but does not pass through the origin: extended (dashed) it reaches zero at −273.15 °C, absolute zero. Measured from there, in kelvin, the quantity is proportional to T. That is why every gas-law
          calculation needs T in kelvin: doubling 20 °C to 40 °C raises the absolute temperature only from 293 K to 313 K.
        </Note>
      )}
    </Frame>
  );
}
