/**
 * lab-crucible: the empirical formula of magnesium oxide. The learner heats a clean crucible and
 * lid to constant mass, adds a coil of magnesium ribbon, heats it in cycles with the lid on, ajar
 * or off, cools and weighs (analytical balance, 0.0001 g) until two weighings agree, optionally
 * adds water and reheats to convert magnesium nitride to the oxide, and finally computes the
 * Mg : O mole ratio from their masses.
 *
 * Hidden chemistry, all seeded: 2Mg + O2 -> 2MgO, with a few percent of the reacting Mg going to
 * Mg3N2 (3Mg + N2), more when the lid starves the ribbon of oxygen; with the lid off, some MgO
 * escapes as smoke. Water converts Mg3N2 to Mg(OH)2 (+ NH3), and strong heating turns Mg(OH)2
 * into MgO. A new crucible holds 1-3 mg of moisture until first heated. Weighing a hot crucible
 * reads several milligrams light (convection currents). "What happened" reveals the bookkeeping
 * after the run, for the error analysis.
 *
 * Params:
 *   nitride  boolean  model Mg3N2 formation                          default true
 *   seed     number   fixed sample number; 0 picks a new one          default 0
 *   title    string                                                   default "Crucible: magnesium oxide"
 *   caption  string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str } from '../kit/params';
import { Button, Controls, Frame, Note, Segmented, Slider } from '../kit/controls';
import { fx, M, makeRand, newSeed, quantize, subSeed } from '../kit/chemlab-core';
import { BenchLog, ButtonRow, Display, LabVars, SampleBar } from '../kit/chemlab-ui';

type Lid = 'on' | 'ajar' | 'off';
const M_MG3N2 = 3 * M.Mg + 2 * M.N;
const M_MGOH2 = M.Mg + 2 * (M.O + M.H);

interface State {
  moisture: number;
  mg: number; // g of unreacted Mg
  mgo: number;
  nitride: number; // g of Mg3N2
  hydroxide: number; // g of Mg(OH)2
  water: number; // g of liquid water added and not yet driven off
  lost: number; // g of MgO lost as smoke
  hot: boolean;
  ribbonIn: boolean;
  heats: number;
}

export default function LabCrucible({ params }: WidgetProps) {
  const nitrideOn = bool(params, 'nitride', true);
  const fixedSeed = num(params, 'seed', 0);
  const [seed, setSeed] = useState(() => (fixedSeed > 0 ? fixedSeed : newSeed()));
  const base = useMemo(() => {
    const r = makeRand(seed);
    return { crucible: r.range(24.5, 31.5), moisture: r.range(0.001, 0.003), perCm: r.range(0.0092, 0.0104) };
  }, [seed]);
  const init = (): State => ({ moisture: base.moisture, mg: 0, mgo: 0, nitride: 0, hydroxide: 0, water: 0, lost: 0, hot: false, ribbonIn: false, heats: 0 });
  const [st, setSt] = useState<State>(init);
  const [len, setLen] = useState(25);
  const [lid, setLid] = useState<Lid>('ajar');
  const [n, setN] = useState(0);
  const [shown, setShown] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [debrief, setDebrief] = useState(false);
  const [lastSeed, setLastSeed] = useState(seed);
  if (lastSeed !== seed) {
    setLastSeed(seed);
    setSt(init());
  }

  const say = (line: string) => setLog((l) => [...l, line]);
  const total = (x: State) => base.crucible + x.moisture + x.mg + x.mgo + x.nitride + x.hydroxide + x.water;

  const addRibbon = () => {
    const r = makeRand(subSeed(seed, 1));
    const mg = len * base.perCm * (1 + r.normal(0.01));
    setSt((x) => ({ ...x, mg, ribbonIn: true }));
    say(`Coiled ${len} cm of sanded Mg ribbon into the crucible.`);
  };

  const heat = () => {
    const r = makeRand(subSeed(seed, 2, n));
    setN((k) => k + 1);
    setSt((x) => {
      const y = { ...x, hot: true, heats: x.heats + 1, moisture: 0 };
      if (y.water > 0) {
        // Water boils off first; strong heating then converts the hydroxide.
        y.water = 0;
      }
      if (y.hydroxide > 0) {
        y.mgo += (y.hydroxide / M_MGOH2) * M.MgO;
        y.hydroxide = 0;
      }
      if (y.mg > 0) {
        const rate = lid === 'on' ? 0.12 : lid === 'ajar' ? 0.55 : 0.8;
        const reacted = y.mg * Math.min(1, rate * (1 + r.normal(0.1)));
        const fN = nitrideOn ? (lid === 'on' ? 0.12 : lid === 'ajar' ? 0.06 : 0.025) * (1 + r.normal(0.15)) : 0;
        const toN = reacted * Math.max(0, fN);
        const toO = reacted - toN;
        const oxide = (toO / M.Mg) * M.MgO;
        const smoke = lid === 'off' ? oxide * r.range(0.03, 0.08) : lid === 'ajar' ? oxide * r.range(0, 0.004) : 0;
        y.mg -= reacted;
        y.mgo += oxide - smoke;
        y.lost += smoke;
        y.nitride += (toN / (3 * M.Mg)) * M_MG3N2;
        if (y.mg < 1e-5) y.mg = 0;
      }
      return y;
    });
    say(`Heated strongly for 5 minutes with the lid ${lid}.${lid === 'off' && st.mg > 0 ? ' White smoke rose from the crucible.' : ''}${st.mg > 0 && lid !== 'on' ? ' The ribbon glowed brightly.' : ''}`);
    setShown(null);
  };

  const addWater = () => {
    setSt((x) => {
      const nit = x.nitride / M_MG3N2;
      return { ...x, hydroxide: x.hydroxide + 3 * nit * M_MGOH2, nitride: 0, water: x.water + 0.25, hot: false };
    });
    say('Cooled, then added about 10 drops of water. A faint smell of ammonia.');
    setShown(null);
  };

  const weigh = (hot: boolean) => {
    const r = makeRand(subSeed(seed, 3, n));
    setN((k) => k + 1);
    const convection = hot && st.hot ? -r.range(0.004, 0.009) : 0;
    const m = total(st) + convection + r.normal(0.00006);
    setShown(fx(quantize(m, 0.0001), 4));
    if (!hot) setSt((x) => ({ ...x, hot: false }));
    say(hot && st.hot ? 'Weighed the crucible while still hot.' : 'Cooled the crucible and lid in a desiccator for 10 minutes, then weighed them.');
  };

  const reset = () => {
    setSeed(newSeed());
    setLog([]);
    setShown(null);
    setDebrief(false);
  };

  const colour = st.mg > 0 && st.mgo === 0 ? 'var(--plot-axis)' : st.mg > 0.01 ? 'color-mix(in oklab, var(--plot-axis) 50%, white)' : st.nitride > 0.002 ? '#d9d2c1' : st.ribbonIn ? '#f2f2ee' : 'transparent';
  const mgStart = len * base.perCm;

  return (
    <Frame title={str(params, 'title', 'Crucible: magnesium oxide')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        <SampleBar seed={seed} fixed={fixedSeed > 0} onNew={reset} />
        <div className="flex flex-wrap items-start gap-3">
          <svg width={150} height={130} viewBox="0 0 150 130" role="img" aria-label="Crucible on a clay triangle">
            <path d="M30,40 L120,40 L106,100 Q75,112 44,100 Z" fill="var(--chemlab-glass)" stroke="var(--plot-axis)" strokeWidth={2} />
            {st.ribbonIn && <path d="M42,80 L108,80 L106,100 Q75,112 44,100 Z" fill={colour} stroke="var(--plot-axis)" strokeWidth={0.5} />}
            {lid !== 'off' && <rect x={lid === 'on' ? 26 : 40} y={lid === 'on' ? 33 : 26} width={98} height={7} rx={3} fill="var(--plot-axis)" transform={lid === 'ajar' ? 'rotate(-8 75 30)' : undefined} />}
            <line x1={10} y1={104} x2={140} y2={104} stroke="var(--plot-4)" strokeWidth={2} />
            {st.hot && <path d="M60,128 Q75,108 90,128" fill="var(--plot-4)" opacity={0.5} />}
          </svg>
          <div className="grid min-w-[170px] flex-1 gap-2">
            <Display label="Analytical balance (crucible + lid + contents)" value={shown ?? '–'} unit="g" tone={shown ? 'live' : 'idle'} />
            <div className="text-xs text-ink-3">Heating cycles so far: {st.heats}. {st.hot ? 'The crucible is hot.' : 'The crucible is at room temperature.'}</div>
          </div>
        </div>
        <Controls>
          <Slider label="Length of Mg ribbon to add" value={len} min={10} max={40} step={1} onChange={setLen} format={(v) => `${v} cm`} />
          <Segmented
            label="Lid while heating"
            options={[
              { value: 'on', label: 'On' },
              { value: 'ajar', label: 'Ajar' },
              { value: 'off', label: 'Off' },
            ]}
            value={lid}
            onChange={setLid}
          />
        </Controls>
        <ButtonRow label="At the bench">
          <Button onClick={addRibbon} disabled={st.ribbonIn}>
            Add the ribbon
          </Button>
          <Button primary onClick={heat}>
            Heat 5 minutes
          </Button>
          <Button onClick={() => weigh(false)}>Cool, then weigh</Button>
          <Button onClick={() => weigh(true)}>Weigh while hot</Button>
          <Button onClick={addWater} disabled={!st.ribbonIn || st.mg > 0.02}>
            Add water drops
          </Button>
        </ButtonRow>
        <BenchLog lines={log} />
        <ButtonRow>
          <Button onClick={() => setDebrief((d) => !d)} disabled={!st.ribbonIn}>
            {debrief ? 'Hide what happened' : 'What happened (after your analysis)'}
          </Button>
        </ButtonRow>
        {debrief && (
          <Note>
            Of {fx(mgStart * 1000, 1)} mg of Mg (about; your weighing is the real number): {fx(st.mg * 1000, 1)} mg unreacted; {fx(st.mgo * 1000, 1)} mg of MgO in the crucible;{' '}
            {fx(st.nitride * 1000, 1)} mg of Mg₃N₂ still present; {fx(st.hydroxide * 1000, 1)} mg of Mg(OH)₂ not yet dehydrated; {fx(st.lost * 1000, 1)} mg of MgO lost as smoke;{' '}
            {fx(st.water * 1000, 0)} mg of water not driven off. Moisture on the new crucible: {fx(base.moisture * 1000, 1)} mg{st.moisture === 0 ? ' (driven off)' : ' (still there)'}.
          </Note>
        )}
      </LabVars>
    </Frame>
  );
}
