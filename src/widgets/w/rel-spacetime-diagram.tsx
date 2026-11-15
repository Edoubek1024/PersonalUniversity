/**
 * rel-spacetime-diagram: a Minkowski diagram (x across, ct up, c = 1) with the axes of a frame
 * S' moving at beta drawn tilted toward the light line, its unit ticks, the calibration
 * hyperbolae (ct)^2 - x^2 = ±n^2 and its lines of simultaneity ct' = const.
 *
 *   events  drag up to three events A, B, C; each shows (ct, x) and (ct', x'), with dashed
 *           guides along the primed grid to the primed axes. The interval between A and B (or
 *           from the origin with one event) is computed in both frames and classified, with the
 *           time order of the two events in each frame and the light cone of A.
 *   twin    Earth stays at x = 0, the traveller goes to x = L at speed beta and comes back. The
 *           lines of simultaneity of the outbound and return frames through the turnaround show
 *           the jump in the traveller's "now" on Earth; both proper times are read out.
 *   barn    a pole of proper length `pole` moving at beta through a barn of proper length `barn`
 *           (metres, ct in metres): the door events and the simultaneity lines of both frames,
 *           with both contracted lengths and the time between the door events in each frame.
 *
 * Params:
 *   preset      "events" | "twin" | "barn"                 initial preset        default "events"
 *   presets     string[]   presets offered as buttons                            default [preset]
 *   beta        number     frame (or traveller, or pole) speed, |beta| < 1       default 0.5 (twin 0.8, barn 0.866)
 *   rapidity    boolean    slider in rapidity phi, beta = tanh(phi)              default false
 *   events      [ct, x][]  1-3 events (events preset)                            default [[3, 1], [1, 3.5]]
 *   range       number     half-width of the events view                         default 5
 *   lightCone   boolean    light cone through the origin (and A)                 default true
 *   hyperbolae  boolean    calibration hyperbolae                                default true
 *   simultaneity boolean   lines ct' = n of S'                                   default true
 *   L           number     twin: distance to the star (light-years)              default 4
 *   pole        number     barn: proper length of the pole (m)                   default 20
 *   barn        number     barn: proper length of the barn (m)                   default 10
 *   title       string                                                           default "Spacetime diagram"
 *   caption     string     may contain $TeX$
 */
import { useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Dot, Draggable, Label, Line, ParamPath, Plot, Segment, usePlot } from '../kit/Plot';
import { Controls, Frame, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { boost, classify, gammaOf, interval2 } from '../kit/rel-core';
import { Key, ReadGrid, relCaption } from '../kit/rel-ui';

const PRESETS = ['events', 'twin', 'barn'] as const;
type Preset = (typeof PRESETS)[number];
const PRESET_LABEL: Record<Preset, string> = { events: 'Events', twin: 'Twin paradox', barn: 'Pole and barn' };
const NAMES = ['A', 'B', 'C'];
const C_PRIME = 'var(--plot-1)';
const C_EVENT = 'var(--plot-2)';
const C_LIGHT = 'var(--plot-4)';
const C_TRAV = 'var(--plot-3)';
const C_HYP = 'var(--plot-6)';

function readEvents(p: Record<string, unknown>): [number, number][] {
  const v = p.events;
  if (v === undefined) return [[3, 1], [1, 3.5]];
  const ok = Array.isArray(v) && v.length >= 1 && v.length <= 3 && v.every((e) => Array.isArray(e) && e.length === 2 && e.every((x) => typeof x === 'number' && Number.isFinite(x)));
  if (!ok) throw new Error(`parameter "events" should be 1-3 events [ct, x], got ${JSON.stringify(v)}`);
  return v as [number, number][];
}

/** Primed axes, unit ticks, hyperbolae, simultaneity lines and light cone: the shared backdrop. */
function Backdrop({ beta, R, hyper, simul, cone, tickMax, unitLabel }: { beta: number; R: number; hyper: boolean; simul: boolean; cone: boolean; tickMax: number; unitLabel?: string }) {
  const { view } = usePlot();
  const g = gammaOf(beta);
  const span = Math.max(view[1] - view[0], view[3] - view[2]);
  const nMax = Math.min(40, Math.ceil(span));
  const step = span > 30 ? 5 : span > 14 ? 2 : 1;
  const hyps: number[] = [];
  for (let n = step; n <= Math.min(nMax, R * 1.5); n += step) hyps.push(n);
  const sims: number[] = [];
  for (let k = -nMax; k <= nMax; k += step) if (k !== 0) sims.push(k);
  const ticks: number[] = [];
  for (let k = -tickMax; k <= tickMax; k += step) if (k !== 0) ticks.push(k);
  return (
    <g>
      {hyper &&
        hyps.map((n) => {
          const u = Math.asinh((2 * span) / n);
          return (
            <g key={n}>
              <ParamPath x={(t) => n * Math.sinh(t)} y={(t) => n * Math.cosh(t)} t0={-u} t1={u} samples={120} color={C_HYP} width={1} opacity={0.4} />
              <ParamPath x={(t) => n * Math.cosh(t)} y={(t) => n * Math.sinh(t)} t0={-u} t1={u} samples={120} color={C_HYP} width={1} opacity={0.4} />
              <ParamPath x={(t) => -n * Math.cosh(t)} y={(t) => n * Math.sinh(t)} t0={-u} t1={u} samples={120} color={C_HYP} width={1} opacity={0.4} />
              <ParamPath x={(t) => n * Math.sinh(t)} y={(t) => -n * Math.cosh(t)} t0={-u} t1={u} samples={120} color={C_HYP} width={1} opacity={0.4} />
            </g>
          );
        })}
      {simul && sims.map((k) => <Line key={k} x={g * k * beta} y={g * k} slope={beta} color={C_PRIME} width={1} dash="3 4" opacity={0.45} />)}
      {cone && (
        <>
          <Line x={0} y={0} slope={1} color={C_LIGHT} width={1.5} opacity={0.9} />
          <Line x={0} y={0} slope={-1} color={C_LIGHT} width={1.5} opacity={0.9} />
        </>
      )}
      <Line x={0} y={0} slope={beta === 0 ? Infinity : 1 / beta} color={C_PRIME} width={2} />
      <Line x={0} y={0} slope={beta} color={C_PRIME} width={2} />
      {ticks.map((k) => (
        <g key={k}>
          <Dot x={g * beta * k} y={g * k} r={2.5} color={C_PRIME} />
          <Dot x={g * k} y={g * beta * k} r={2.5} color={C_PRIME} />
        </g>
      ))}
      <AxisNames beta={beta} unitLabel={unitLabel} />
    </g>
  );
}

function AxisNames({ beta, unitLabel }: { beta: number; unitLabel?: string }) {
  const { view } = usePlot();
  // Where each primed axis leaves the view (shrunk by 10%), on its positive half.
  const xEdge = (dx: number) => (dx >= 0 ? view[1] : view[0]);
  const reach = (dx: number, dy: number) => 0.88 * Math.min(Math.abs(dx) > 1e-9 ? xEdge(dx) / dx : Infinity, dy > 1e-9 ? view[3] / dy : Infinity);
  const sCt = reach(beta, 1);
  const sX = reach(1, beta);
  return (
    <>
      <Label x={beta * sCt} y={sCt} color={C_PRIME} dx={8} dy={4} weight={600}>
        ct′
      </Label>
      <Label x={sX} y={beta * sX} color={C_PRIME} dx={-4} dy={-8} anchor="end" weight={600}>
        x′
      </Label>
      {unitLabel && (
        <Label x={view[0]} y={view[2]} dx={6} dy={-6} size={11}>
          {unitLabel}
        </Label>
      )}
    </>
  );
}

const T = ({ children }: { children: string }) => <Tex>{children}</Tex>;

export default function RelSpacetimeDiagram({ params }: WidgetProps) {
  const initial = oneOf(params, 'preset', PRESETS, 'events');
  const offered = strArray(params, 'presets', [initial]);
  for (const o of offered) if (!(PRESETS as readonly string[]).includes(o)) throw new Error(`parameter "presets" has unknown preset "${o}" (use events, twin, barn)`);
  const defaultBeta = { events: 0.5, twin: 0.8, barn: 0.866 };
  const beta0 = num(params, 'beta', defaultBeta[initial]);
  if (!(Math.abs(beta0) < 1)) throw new Error('parameter "beta" must satisfy |beta| < 1');
  const useRap = bool(params, 'rapidity', false);
  const events0 = readEvents(params);
  const R = num(params, 'range', 5);
  if (!(R > 0)) throw new Error('parameter "range" must be positive');
  const Ltw = num(params, 'L', 4);
  const Lp = num(params, 'pole', 20);
  const Lb = num(params, 'barn', 10);
  if (!(Ltw > 0 && Lp > 0 && Lb > 0)) throw new Error('parameters "L", "pole" and "barn" must be positive');

  const [preset, setPreset] = useState<Preset>(initial);
  const [betas, setBetas] = useState<Record<Preset, number>>(() => ({ ...defaultBeta, [initial]: beta0 }));
  const [evs, setEvs] = useState<[number, number][]>(events0);
  const [hyper, setHyper] = useState(bool(params, 'hyperbolae', true));
  const [simul, setSimul] = useState(bool(params, 'simultaneity', true));
  const [cone, setCone] = useState(bool(params, 'lightCone', true));

  const beta = betas[preset];
  const setBeta = (b: number) => setBetas((s) => ({ ...s, [preset]: b }));
  const g = gammaOf(beta);
  const phi = Math.atanh(beta);
  const minB = preset === 'events' ? -0.95 : preset === 'twin' ? 0.4 : 0.05;
  const maxB = preset === 'barn' ? 0.98 : 0.95;

  const slider = useRap ? (
    <Slider label={<T>{'\\text{rapidity } \\phi'}</T>} value={phi} min={Math.atanh(minB)} max={Math.atanh(maxB)} step={0.01} onChange={(p) => setBeta(Math.tanh(p))} format={(v) => fmt(v, 2)} />
  ) : (
    <Slider label={<T>{preset === 'events' ? '\\beta = v/c \\text{ of } S\'' : preset === 'twin' ? '\\beta \\text{ of the traveller}' : '\\beta \\text{ of the pole}'}</T>} value={beta} min={minB} max={maxB} step={preset === 'barn' ? 0.0005 : 0.01} onChange={setBeta} format={(v) => fmt(v, preset === 'barn' ? 4 : 2)} />
  );

  let plot: ReactNode;
  let readouts: ReactNode;
  let key: { color: string; label: ReactNode; dash?: boolean }[] = [
    { color: C_PRIME, label: preset === 'events' ? 'axes and ticks of S′' : preset === 'twin' ? 'axes of the outbound frame' : 'axes of the pole frame' },
    { color: C_LIGHT, label: 'light rays' },
  ];
  if (hyper) key.push({ color: C_HYP, label: 'hyperbolae (ct)² − x² = ±n²' });
  if (simul) key.push({ color: C_PRIME, label: 'ct′ = const', dash: true });

  if (preset === 'events') {
    const view: [number, number, number, number] = [-R, R, -R, R];
    const prim = evs.map(([ct, x]) => boost(beta, ct, x));
    const A = evs[0];
    const Bv = evs.length > 1 ? evs[1] : ([0, 0] as [number, number]);
    const Bp = evs.length > 1 ? prim[1] : ([0, 0] as [number, number]);
    const dct = A[0] - Bv[0];
    const dx = A[1] - Bv[1];
    const dctP = prim[0][0] - Bp[0];
    const dxP = prim[0][1] - Bp[1];
    const s2 = interval2(dct, dx);
    const s2p = interval2(dctP, dxP);
    const kind = classify(s2, 1e-6);
    const other = evs.length > 1 ? 'B' : 'O';
    const order = (d: number) => (Math.abs(d) < 1e-6 ? 'simultaneous' : d > 0 ? `A after ${other}` : `A before ${other}`);
    const snap = (v: number) => Math.round(v * 10) / 10;
    plot = (
      <Plot view={view} equal aspect={0.9} maxHeight={520} xLabel="x" yLabel="ct" label="Spacetime diagram with draggable events">
        <Backdrop beta={beta} R={R} hyper={hyper} simul={simul} cone={cone} tickMax={Math.ceil(R * 1.5)} />
        {cone && (
          <>
            <Line x={A[1]} y={A[0]} slope={1} color={C_LIGHT} width={1} dash="5 4" opacity={0.7} />
            <Line x={A[1]} y={A[0]} slope={-1} color={C_LIGHT} width={1} dash="5 4" opacity={0.7} />
          </>
        )}
        {evs.map(([ct, x], i) => {
          const [ctp, xp] = prim[i];
          return (
            <g key={i}>
              <Segment x1={x} y1={ct} x2={g * beta * ctp} y2={g * ctp} color={C_EVENT} width={1.25} dash="3 3" opacity={0.8} />
              <Segment x1={x} y1={ct} x2={g * xp} y2={g * beta * xp} color={C_EVENT} width={1.25} dash="3 3" opacity={0.8} />
            </g>
          );
        })}
        {evs.map(([ct, x], i) => (
          <g key={`e${i}`}>
            <Draggable
              x={x}
              y={ct}
              step={0.1}
              label={`Event ${NAMES[i]}`}
              color={C_EVENT}
              onChange={(nx, ny) => setEvs((s) => s.map((e, j) => (j === i ? [snap(clamp(ny, -R, R)), snap(clamp(nx, -R, R))] : e)))}
            />
            <Label x={x} y={ct} dx={10} dy={-10} weight={700} color={C_EVENT}>
              {NAMES[i]}
            </Label>
          </g>
        ))}
      </Plot>
    );
    readouts = (
      <>
        <ReadGrid cols={evs.length === 3 ? 3 : 2}>
          {evs.map(([ct, x], i) => (
            <Readout key={i} label={`Event ${NAMES[i]}`} tone={C_EVENT} value={<>S: ({fmt(ct, 2)}, {fmt(x, 2)})<br />S′: ({fmt(prim[i][0], 3)}, {fmt(prim[i][1], 3)})</>} />
          ))}
        </ReadGrid>
        <ReadGrid cols={3}>
          <Readout label={<>Δs² ({other}→A) in S / S′</>} value={`${fmt(s2, 3)} / ${fmt(s2p, 3)}`} />
          <Readout label="Separation" value={kind === 'timelike' ? `timelike, Δτ = ${fmt(Math.sqrt(-s2), 3)}` : kind === 'spacelike' ? `spacelike, proper distance ${fmt(Math.sqrt(s2), 3)}` : 'lightlike (null)'} />
          <Readout label="Time order in S / S′" value={`${order(dct)} / ${order(dctP)}`} />
        </ReadGrid>
      </>
    );
    key = [...key, { color: C_EVENT, label: 'guides to the primed axes', dash: true }];
  } else if (preset === 'twin') {
    const Tturn = Ltw / beta;
    const Ttot = 2 * Tturn;
    const nowOut = Tturn - beta * Ltw;
    const nowIn = Tturn + beta * Ltw;
    const tauTrav = Ttot / g;
    const view: [number, number, number, number] = [-0.6 * Ltw, 1.6 * Ltw, -0.5, Ttot + 0.6];
    const tauTicks: [number, number][] = [];
    for (let tau = 1; tau < tauTrav - 1e-9; tau += 1) {
      const half = tauTrav / 2;
      if (tau <= half) tauTicks.push([g * beta * tau, g * tau]);
      else tauTicks.push([Ltw - g * beta * (tau - half), Tturn + g * (tau - half)]);
    }
    const earthTicks: number[] = [];
    for (let t = 1; t < Ttot - 1e-9; t += 1) earthTicks.push(t);
    plot = (
      <Plot view={view} equal aspect={1.15} maxHeight={560} xLabel="x (ly)" yLabel="ct (yr)" label="Twin paradox spacetime diagram">
        <Backdrop beta={beta} R={Ttot} hyper={hyper} simul={simul} cone={cone} tickMax={0} />
        <Segment x1={0} y1={0} x2={0} y2={Ttot} color="var(--plot-5)" width={3} />
        <Segment x1={0} y1={0} x2={Ltw} y2={Tturn} color={C_TRAV} width={3} />
        <Segment x1={Ltw} y1={Tturn} x2={0} y2={Ttot} color={C_TRAV} width={3} />
        <Segment x1={Ltw} y1={Tturn} x2={0} y2={nowOut} color={C_EVENT} width={1.75} dash="6 4" />
        <Segment x1={Ltw} y1={Tturn} x2={0} y2={nowIn} color={C_EVENT} width={1.75} dash="6 4" />
        <Segment x1={0} y1={nowOut} x2={0} y2={nowIn} color={C_EVENT} width={5} opacity={0.55} />
        {earthTicks.map((t) => (
          <Dot key={t} x={0} y={t} r={2.5} color="var(--plot-5)" />
        ))}
        {tauTicks.map(([x, ct], i) => (
          <Dot key={i} x={x} y={ct} r={3} color={C_TRAV} />
        ))}
        <Label x={0} y={nowOut} dx={-6} dy={4} anchor="end" color={C_EVENT} size={11}>
          {fmt(nowOut, 2)}
        </Label>
        <Label x={0} y={nowIn} dx={-6} dy={4} anchor="end" color={C_EVENT} size={11}>
          {fmt(nowIn, 2)}
        </Label>
        <Label x={Ltw} y={Tturn} dx={8} dy={4} color={C_TRAV} weight={600}>
          turnaround
        </Label>
        <Label x={0} y={Ttot} dx={8} dy={4} color="var(--plot-5)" weight={600}>
          reunion
        </Label>
      </Plot>
    );
    readouts = (
      <ReadGrid cols={3}>
        <Readout label="Earth twin's proper time" tone="var(--plot-5)" value={`${fmt(Ttot, 3)} yr`} />
        <Readout label="Traveller's proper time" tone={C_TRAV} value={`${fmt(tauTrav, 3)} yr`} />
        <Readout label="Earth clock 'now' at turnaround, outbound frame" tone={C_EVENT} value={`${fmt(nowOut, 3)} yr`} />
        <Readout label="… return frame" tone={C_EVENT} value={`${fmt(nowIn, 3)} yr`} />
        <Readout label="Jump in 'now' at the turnaround" tone={C_EVENT} value={`${fmt(nowIn - nowOut, 3)} yr`} />
      </ReadGrid>
    );
    key = [
      { color: 'var(--plot-5)', label: 'Earth (ticks every year)' },
      { color: C_TRAV, label: 'traveller (ticks every year of proper time)' },
      { color: C_EVENT, label: 'traveller’s simultaneity at the turnaround', dash: true },
      ...key,
    ];
  } else {
    const LpS = Lp / g;
    const LbP = Lb / g;
    const E2: [number, number] = [beta > 0 ? (Lb - LpS) / beta : NaN, Lb];
    const E2p = boost(beta, E2[0], E2[1]);
    const fits = LpS <= Lb + 1e-9;
    const view: [number, number, number, number] = [-0.7 * Lp, Lb + 0.7 * Lp, -0.9 * Lp, 0.9 * Lp];
    const ns = (d: number) => `${fmt(d, 3)} m (${fmt(d / 0.299792458, 3)} ns)`;
    plot = (
      <Plot view={view} equal aspect={0.85} maxHeight={520} xLabel="x (m)" yLabel="ct (m)" label="Pole and barn spacetime diagram">
        <Backdrop beta={beta} R={Lp} hyper={hyper} simul={simul} cone={cone} tickMax={0} unitLabel="1 m of ct = 3.34 ns" />
        <Line x={0} y={0} slope={Infinity} color="var(--plot-5)" width={3} />
        <Line x={Lb} y={0} slope={Infinity} color="var(--plot-5)" width={3} />
        {beta > 0 && (
          <>
            <Line x={0} y={0} slope={1 / beta} color={C_TRAV} width={3} />
            <Line x={LpS} y={0} slope={1 / beta} color={C_TRAV} width={3} />
          </>
        )}
        <Line x={E2[1]} y={E2[0]} slope={0} color="var(--plot-5)" width={1.5} dash="6 4" />
        <Line x={E2[1]} y={E2[0]} slope={beta} color={C_TRAV} width={1.5} dash="6 4" />
        <Dot x={0} y={0} r={5} color={C_EVENT} />
        <Label x={0} y={0} dx={-8} dy={16} anchor="end" color={C_EVENT} weight={700}>
          E1
        </Label>
        {Number.isFinite(E2[0]) && (
          <>
            <Dot x={E2[1]} y={E2[0]} r={5} color={C_EVENT} />
            <Label x={E2[1]} y={E2[0]} dx={8} dy={4} color={C_EVENT} weight={700}>
              E2
            </Label>
          </>
        )}
      </Plot>
    );
    readouts = (
      <>
        <ReadGrid cols={3}>
          <Readout label="Pole length in barn frame" tone={C_TRAV} value={`${fmt(LpS, 3)} m (barn ${fmt(Lb, 3)} m)`} />
          <Readout label="Barn length in pole frame" tone="var(--plot-5)" value={`${fmt(LbP, 3)} m (pole ${fmt(Lp, 3)} m)`} />
          <Readout label="Δ(ct) E1 → E2, barn frame" value={Number.isFinite(E2[0]) ? ns(E2[0]) : '—'} />
          <Readout label="Δ(ct′) E1 → E2, pole frame" value={Number.isFinite(E2p[0]) ? ns(E2p[0]) : '—'} />
          <Readout label="Pole inside with both doors shut?" value={fits ? 'yes, in the barn frame' : 'never'} />
        </ReadGrid>
        <div className="text-xs text-ink-2">
          E1: the rear of the pole passes the front door (the door shuts). E2: the front of the pole reaches the back door (it opens). They are simultaneous in neither frame unless the pole exactly fits; their order flips between frames when the separation is spacelike.
        </div>
      </>
    );
    key = [
      { color: 'var(--plot-5)', label: 'barn doors (dashed: barn-frame "now" through E2)' },
      { color: C_TRAV, label: 'pole ends (dashed: pole-frame "now" through E2)' },
      ...key,
    ];
  }

  return (
    <Frame title={str(params, 'title', 'Spacetime diagram')} caption={relCaption(params)}>
      {offered.length > 1 && <Segmented options={offered.map((o) => ({ value: o as Preset, label: PRESET_LABEL[o as Preset] }))} value={preset} onChange={setPreset} />}
      {plot}
      <Key items={key} />
      <Controls cols={2}>
        {slider}
        <ReadGrid cols={2}>
          <Readout label={<T>{'\\gamma'}</T>} value={fmt(g, 4)} />
          <Readout label={<T>{'\\phi = \\tanh^{-1}\\beta'}</T>} value={fmt(phi, 3)} />
        </ReadGrid>
      </Controls>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Toggle label="light cone" checked={cone} onChange={setCone} />
        <Toggle label="hyperbolae" checked={hyper} onChange={setHyper} />
        <Toggle label="lines of simultaneity of S′" checked={simul} onChange={setSimul} />
      </div>
      {readouts}
    </Frame>
  );
}
