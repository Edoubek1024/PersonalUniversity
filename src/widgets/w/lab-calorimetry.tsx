/**
 * lab-calorimetry: a coffee-cup calorimeter with a thermometer, a clock and heat loss. The learner
 * runs the clock, reads the thermometer at the times they choose (Record logs the displayed
 * reading), and mixes or adds the solid when they decide. Because the cup exchanges heat with the
 * room (Newton cooling) and reactions take time, the highest reading is not the temperature the
 * mixture would have reached instantly: the learner extrapolates the post-mixing line back to the
 * mixing time, as in a real lab. The thermometer lags the solution by a few seconds.
 *
 * Model: the cup's contents have heat capacity C = (mass of solution)·4.184 J g−1 °C−1 + C_cal and
 * energy E = C·T (relative to 0 °C). After mixing, the reaction releases −nΔH with first-order
 * kinetics (time constant per reaction) and the cup loses h·(T − T_room) with h = k·C. Solutions
 * are treated as water (1.00 g/mL, 4.184 J g−1 °C−1), as the lessons assume. Enthalpies: see
 * kit/chemlab-core.ts.
 *
 * Modes
 *   "constant"        50 mL of hot water poured into 50 mL of cool water: find C_cal
 *   "neutralization"  50.0 mL of 1.000 M HCl + 50.0 mL of 1.050 M NaOH: ΔH of neutralisation
 *   "solution"        a weighed salt dissolved in about 100 g of water: ΔH of solution
 *   "fusion"          ice (patted dry) added to about 100 g of warm water: ΔH of fusion
 *   "hess"            Mg ribbon or MgO powder in 100.0 mL of 1.0 M HCl: ΔH of each reaction
 *
 * Params:
 *   mode        "constant" | "neutralization" | "solution" | "fusion" | "hess"   default "constant"
 *   salt        "NH4NO3" | "CaCl2" | "NaOH" | "KCl"   first salt shown in solution mode   default "NH4NO3"
 *   reaction    "mg" | "mgo"   first reaction shown in hess mode            default "mg"
 *   seed        number   fixed sample number; 0 picks a new one               default 0
 *   calConst    number   true calorimeter constant, J/°C; 0 picks 15-45       default 0
 *   resolution  number   thermometer resolution, °C (0.1 or 0.01)             default 0.1
 *   lid         boolean  start with the lid on (less heat exchange)          default true
 *   wetIce      boolean  the ice carries 4-8% liquid water (fusion mode)       default false
 *   title       string                                                         default "Coffee-cup calorimeter"
 *   caption     string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { useAnimation } from '../kit/hooks';
import { Button, Controls, Frame, Note, Segmented, Slider, Toggle } from '../kit/controls';
import { Dot, Plot } from '../kit/Plot';
import { C_WATER, DH, fx, M, makeRand, newSeed, quantize, subSeed } from '../kit/chemlab-core';
import { ButtonRow, CheckResult, DataLog, Display, LabVars, SampleBar } from '../kit/chemlab-ui';

type Mode = 'constant' | 'neutralization' | 'solution' | 'fusion' | 'hess';
type Salt = 'NH4NO3' | 'CaCl2' | 'NaOH' | 'KCl';
type Rxn = 'mg' | 'mgo';

const SALT_NAMES: Record<Salt, string> = { NH4NO3: 'ammonium nitrate, NH₄NO₃', CaCl2: 'calcium chloride, CaCl₂', NaOH: 'sodium hydroxide, NaOH', KCl: 'potassium chloride, KCl' };
const DT = 0.5;
const TAU_PROBE = 3;
const L_FUS = (DH.fusion * 1000) / M.H2O; // J per g of ice

interface Sim {
  t: number;
  /** Energy of the liquid contents relative to 0 °C, J. */
  E: number;
  /** Heat capacity of the liquid contents and cup, J/°C. */
  C: number;
  probe: number;
  mixedAt: number | null;
  /** Fraction of the reaction still to happen, or grams of ice left (fusion). */
  left: number;
}

interface Setup {
  room: number;
  Ccal: number;
  T0: number;
  /** Second liquid's starting temperature (hot water, NaOH solution). */
  T2: number;
  mCold: number;
  mHot: number;
  vAcid: number;
  vBase: number;
  mWater: number;
  cup: number;
}

export default function LabCalorimetry({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['constant', 'neutralization', 'solution', 'fusion', 'hess'] as const, 'constant') as Mode;
  const fixedSeed = num(params, 'seed', 0);
  const calParam = num(params, 'calConst', 0);
  const res = num(params, 'resolution', 0.1);
  if (!(res === 0.1 || res === 0.01)) throw new Error('parameter "resolution" should be 0.1 or 0.01');
  const wetIce = bool(params, 'wetIce', false);

  const [seed, setSeed] = useState(() => (fixedSeed > 0 ? fixedSeed : newSeed()));
  const [salt, setSalt] = useState<Salt>(oneOf(params, 'salt', ['NH4NO3', 'CaCl2', 'NaOH', 'KCl'] as const, 'NH4NO3'));
  const [rxn, setRxn] = useState<Rxn>(oneOf(params, 'reaction', ['mg', 'mgo'] as const, 'mg'));
  const [lid, setLid] = useState(bool(params, 'lid', true));
  const [target, setTarget] = useState(defaultTarget(mode, 'mg'));
  const [weighed, setWeighed] = useState<{ m: number; shown: string } | null>(null);
  const [run, setRun] = useState(0);

  const setup: Setup = useMemo(() => {
    const r = makeRand(subSeed(seed, run));
    const base = makeRand(seed);
    const room = base.range(21, 23.5);
    const Ccal = calParam > 0 ? calParam : base.range(15, 45);
    const T0 = room + r.range(-0.4, 0.3);
    const T2 = mode === 'constant' ? r.range(46, 56) : mode === 'neutralization' ? T0 + r.range(-0.5, 0.5) : mode === 'fusion' ? r.range(34, 40) : T0;
    return { room, Ccal, T0, T2, mCold: r.range(49.6, 50.4), mHot: r.range(49.6, 50.4), vAcid: 50 + r.normal(0.12), vBase: 50 + r.normal(0.12), mWater: r.range(99.2, 100.8), cup: r.range(3.6, 4.4) };
  }, [seed, run, mode, calParam]);

  const start = (): Sim => {
    const C0 = mode === 'constant' ? setup.mCold * C_WATER + setup.Ccal : mode === 'neutralization' ? setup.vAcid * C_WATER + setup.Ccal : mode === 'hess' ? 100 * C_WATER + setup.Ccal : setup.mWater * C_WATER + setup.Ccal;
    const T = mode === 'fusion' ? setup.T2 : setup.T0;
    return { t: 0, E: C0 * T, C: C0, probe: T, mixedAt: null, left: 0 };
  };
  const [sim, setSim] = useState<Sim>(start);
  const [playing, setPlaying] = useState(false);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [plotPts, setPlotPts] = useState<[number, number][]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  const k = lid ? 5e-4 : 1.5e-3;
  // Ice, the reaction amount and the second liquid are fixed for the run (seeded).
  const rr = useMemo(() => makeRand(subSeed(seed, run, 77)), [seed, run]);
  const iceTrue = useMemo(() => Math.max(5, target + rr.range(-2.5, 2.5)), [target, rr]);
  const wetFrac = useMemo(() => (wetIce ? 0.04 + 0.04 * makeRand(subSeed(seed, run, 78)).u() : 0), [wetIce, seed, run]);

  const hotT = (t: number) => setup.room + (setup.T2 - setup.room) * Math.exp(-0.0012 * t);
  const nReact = (): number => {
    if (mode === 'neutralization') return Math.min(setup.vAcid * 1.0, setup.vBase * 1.05) / 1000;
    if (mode === 'solution' && weighed) return weighed.m / M[salt];
    if (mode === 'hess' && weighed) return weighed.m / (rxn === 'mg' ? M.Mg : M.MgO);
    return 0;
  };
  const dH = mode === 'neutralization' ? DH.neutralization : mode === 'solution' ? DH.solution[salt] : mode === 'hess' ? (rxn === 'mg' ? DH.mgHcl : DH.mgoHcl) : 0;
  const tau = mode === 'neutralization' ? 3 : mode === 'solution' ? (salt === 'CaCl2' ? 25 : 18) : mode === 'hess' ? (rxn === 'mg' ? 70 : 30) : mode === 'fusion' ? 25 : 2;

  const advance = (s: Sim, seconds: number): Sim => {
    let { t, E, C, probe, left } = s;
    const steps = Math.round(seconds / DT);
    for (let i = 0; i < steps; i++) {
      if (s.mixedAt !== null) {
        if (mode === 'fusion') {
          const T = E / C;
          const dm = T > 0.02 ? (left / tau) * DT : 0;
          left -= dm;
          E -= L_FUS * dm;
          C += C_WATER * dm;
        } else if (mode !== 'constant') {
          const q = -nReact() * dH * 1000;
          const dxi = (left / tau) * DT;
          left -= dxi;
          E += q * dxi;
        }
      }
      const T = E / C;
      E -= k * C * (T - setup.room) * DT;
      probe += ((E / C - probe) / TAU_PROBE) * DT;
      t += DT;
    }
    return { ...s, t: Math.round(t * 2) / 2, E, C, probe, left };
  };

  useAnimation(playing, (dt) => {
    setSim((s) => (s.t >= 1200 ? s : advance(s, DT * Math.max(1, Math.round((dt * 20) / DT)))));
  });
  if (playing && sim.t >= 1200) setPlaying(false);

  const reading = (s: Sim) => {
    const noise = makeRand(subSeed(seed, run, Math.round(s.t * 2))).normal(0.012);
    return quantize(s.probe + noise, res);
  };
  const d = res === 0.1 ? 1 : 2;
  const cupT = fx(reading(sim), d);

  const needsSolid = mode === 'solution' || mode === 'hess';
  const mix = () => {
    if (needsSolid && !weighed) {
      setMsg('Weigh the solid first.');
      return;
    }
    setSim((s) => {
      if (s.mixedAt !== null) return s;
      let { E, C } = s;
      let left = 1;
      if (mode === 'constant') {
        E += setup.mHot * C_WATER * hotT(s.t);
        C += setup.mHot * C_WATER;
      } else if (mode === 'neutralization') {
        E += setup.vBase * C_WATER * setup.T2;
        C += setup.vBase * C_WATER;
      } else if (mode === 'fusion') {
        const wet = iceTrue * wetFrac;
        C += wet * C_WATER; // clinging water arrives at 0 °C: adds mass, no energy
        left = iceTrue - wet;
      } else if (weighed) {
        // The solid arrives at room temperature; it is counted as solution mass, as the lessons do.
        E += weighed.m * C_WATER * setup.room;
        C += weighed.m * C_WATER;
      }
      return { ...s, E, C, left, mixedAt: s.t };
    });
    setMsg(null);
  };

  const record = () => {
    setRows((r) => [...r, { t: String(sim.t), T: cupT }]);
    setPlotPts((p) => [...p, [sim.t, Number(cupT)]]);
  };

  const restart = (newSample: boolean) => {
    const s = newSample ? newSeed() : seed;
    if (newSample) setSeed(s);
    setRun((x) => (newSample ? 0 : x + 1));
    setWeighed(null);
    setRows([]);
    setPlotPts([]);
    setPlaying(false);
    setMsg(null);
  };
  // Re-initialise the cup when the run or sample changes.
  const key = `${seed}:${run}:${salt}:${rxn}`;
  const [lastKey, setLastKey] = useState(key);
  if (key !== lastKey) {
    setLastKey(key);
    setSim(start());
  }

  const weigh = () => {
    const r = makeRand(subSeed(seed, run, 5));
    const m = Math.max(0.02, target * (1 + r.range(-0.06, 0.06)));
    setWeighed({ m, shown: mode === 'hess' ? fx(quantize(m, 0.0001), 4) : fx(quantize(m, 0.001), 3) });
  };

  // Total mass on the balance at the end of the fusion run (cup + water + all ice that went in).
  const [finalMass, setFinalMass] = useState<string | null>(null);
  if (finalMass !== null && sim.mixedAt === null) setFinalMass(null);

  const truth = mode === 'constant' ? setup.Ccal : mode === 'fusion' ? DH.fusion : dH;
  const unit = mode === 'constant' ? 'J/°C' : 'kJ/mol';
  const tView = Math.max(300, sim.t + 30, ...plotPts.map((p) => p[0] + 30));
  const ts = plotPts.map((p) => p[1]);
  const tLo = Math.floor(Math.min(setup.room - 1, ...ts) - 1);
  const tHi = Math.ceil(Math.max(setup.room + 1, ...ts) + 1);

  return (
    <Frame title={str(params, 'title', 'Coffee-cup calorimeter')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        <SampleBar seed={seed} fixed={fixedSeed > 0} onNew={() => restart(true)}>
          <Button onClick={() => restart(false)} title="Empty and dry the cup; same calorimeter, new trial">
            New trial
          </Button>
        </SampleBar>
        {mode === 'solution' && (
          <Segmented label="Salt" options={(['NH4NO3', 'CaCl2', 'NaOH', 'KCl'] as const).map((v) => ({ value: v, label: v }))} value={salt} onChange={(v) => { setSalt(v); setWeighed(null); setRows([]); setPlotPts([]); }} />
        )}
        {mode === 'hess' && (
          <Segmented
            label="Reaction"
            options={[
              { value: 'mg', label: 'Mg ribbon + HCl' },
              { value: 'mgo', label: 'MgO powder + HCl' },
            ]}
            value={rxn}
            onChange={(v) => { setRxn(v); setTarget(defaultTarget('hess', v)); setWeighed(null); setRows([]); setPlotPts([]); }}
          />
        )}
        <SetupReadings mode={mode} setup={setup} salt={salt} rxn={rxn} />
        {(needsSolid || mode === 'fusion') && (
          <Controls>
            <Slider
              label={mode === 'fusion' ? 'Ice to add (approximate)' : 'Target mass of solid'}
              value={target}
              {...sliderRange(mode, rxn)}
              onChange={(v) => { setTarget(v); setWeighed(null); }}
              format={(v) => `${v.toFixed(mode === 'hess' ? 2 : 1)} g`}
            />
            {needsSolid && (
              <div className="flex flex-wrap items-end gap-2">
                <Button onClick={weigh} disabled={sim.mixedAt !== null}>
                  Weigh the solid
                </Button>
                <Display label={mode === 'hess' ? 'Analytical balance' : 'Top-loading balance'} value={weighed ? weighed.shown : '–'} unit="g" tone={weighed ? 'live' : 'idle'} />
              </div>
            )}
          </Controls>
        )}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Display label="Clock" value={`${sim.t.toFixed(0)}`} unit="s" />
          <Display label="Thermometer in cup" value={cupT} unit="°C" />
          {mode === 'constant' && sim.mixedAt === null && <Display label="Thermometer in hot water" value={fx(quantize(hotT(sim.t) + makeRand(subSeed(seed, run, 3, sim.t)).normal(0.012), res), d)} unit="°C" />}
          {mode === 'neutralization' && sim.mixedAt === null && <Display label="Thermometer in NaOH" value={fx(quantize(setup.T2 + makeRand(subSeed(seed, run, 4, sim.t)).normal(0.012), res), d)} unit="°C" />}
          <Display label="Mixed at" value={sim.mixedAt === null ? 'not yet' : `${sim.mixedAt} s`} />
        </div>
        <ButtonRow>
          <Button primary onClick={() => setPlaying((p) => !p)}>
            {playing ? 'Pause clock' : 'Run clock'}
          </Button>
          <Button onClick={() => setSim((s) => advance(s, 15))}>+15 s</Button>
          <Button onClick={() => setSim((s) => advance(s, 30))}>+30 s</Button>
          <Button onClick={record}>Record reading</Button>
          <Button onClick={mix} disabled={sim.mixedAt !== null}>
            {mode === 'constant' ? 'Pour in hot water' : mode === 'neutralization' ? 'Pour in NaOH' : mode === 'fusion' ? 'Add the ice' : 'Add the solid'}
          </Button>
          {mode === 'fusion' && (
            <Button onClick={() => setFinalMass(fx(quantize(setup.cup + setup.mWater + iceTrue + makeRand(subSeed(seed, run, 6)).normal(0.004), 0.01), 2))} disabled={sim.mixedAt === null}>
              Weigh cup and contents
            </Button>
          )}
        </ButtonRow>
        <Toggle label="Lid on the cup" checked={lid} onChange={setLid} />
        {mode === 'fusion' && finalMass && <Display label="Cup + water + melted ice (balance)" value={finalMass} unit="g" />}
        {mode === 'fusion' && sim.mixedAt !== null && sim.left > 0.3 && <Note>Some ice is still floating in the cup.</Note>}
        {msg && <Note tone="warn">{msg}</Note>}
        {plotPts.length > 0 && (
          <Plot view={[0, tView, tLo, tHi]} aspect={0.45} minHeight={190} maxHeight={280} label="Your recorded temperatures against time">
            {plotPts.map(([t, T], i) => (
              <Dot key={i} x={t} y={T} r={3} color="var(--plot-2)" />
            ))}
          </Plot>
        )}
        <DataLog columns={[{ key: 't', label: 't (s)' }, { key: 'T', label: 'T (°C)' }]} rows={rows} onClear={() => { setRows([]); setPlotPts([]); }} />
        <CheckResult
          label={mode === 'constant' ? 'Your calorimeter constant' : mode === 'fusion' ? 'Your ΔH of fusion' : mode === 'neutralization' ? 'Your ΔH of neutralisation' : 'Your ΔH (per mole of solid)'}
          unit={unit}
          truth={truth}
          decimals={mode === 'constant' ? 0 : 1}
          tolerancePct={mode === 'constant' ? 25 : 5}
          note={mode === 'constant' ? 'A calorimeter constant is small next to the water, so even good data give it only to about ±5 J/°C.' : 'The true value is the literature value the simulator uses.'}
        />
      </LabVars>
    </Frame>
  );
}

function defaultTarget(mode: Mode, rxn: Rxn): number {
  if (mode === 'fusion') return 25;
  if (mode === 'hess') return rxn === 'mg' ? 0.25 : 1.0;
  return 5;
}

function sliderRange(mode: Mode, rxn: Rxn): { min: number; max: number; step: number } {
  if (mode === 'fusion') return { min: 10, max: 40, step: 1 };
  if (mode === 'hess') return rxn === 'mg' ? { min: 0.1, max: 0.5, step: 0.01 } : { min: 0.4, max: 1.6, step: 0.05 };
  return { min: 1, max: 12, step: 0.5 };
}

function SetupReadings({ mode, setup, salt, rxn }: { mode: Mode; setup: Setup; salt: Salt; rxn: Rxn }) {
  const items: [string, string][] = [];
  if (mode === 'constant') {
    items.push(['Cool water in the cup (balance)', `${fx(quantize(setup.mCold, 0.01), 2)} g`], ['Hot water in the beaker (balance)', `${fx(quantize(setup.mHot, 0.01), 2)} g`]);
  } else if (mode === 'neutralization') {
    items.push(['1.000 M HCl in the cup (graduated cylinder)', '50.0 mL'], ['1.050 M NaOH in a beaker (graduated cylinder)', '50.0 mL']);
  } else if (mode === 'solution') {
    items.push(['Water in the cup (balance)', `${fx(quantize(setup.mWater, 0.01), 2)} g`], ['Salt', SALT_NAMES[salt]]);
  } else if (mode === 'fusion') {
    items.push(['Empty cup and lid (balance)', `${fx(quantize(setup.cup, 0.01), 2)} g`], ['Cup, lid and warm water (balance)', `${fx(quantize(setup.cup + setup.mWater, 0.01), 2)} g`]);
  } else {
    items.push(['1.0 M HCl in the cup (graduated cylinder)', '100.0 mL'], ['Solid', rxn === 'mg' ? 'magnesium ribbon, Mg (24.305 g/mol)' : 'magnesium oxide powder, MgO (40.304 g/mol)']);
  }
  if (mode !== 'constant') items.push(['Calorimeter constant of this cup (from your earlier run)', `${Math.round(setup.Ccal)} J/°C`]);
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13px]">
          <div className="text-xs text-ink-3">{k}</div>
          <div className="font-mono text-ink">{v}</div>
        </div>
      ))}
    </div>
  );
}
