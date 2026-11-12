/**
 * lab-gas-collection: hydrogen from a metal and hydrochloric acid, collected over water in an
 * inverted 50 mL gas-measuring tube (eudiometer). The learner chooses and weighs the metal
 * (analytical balance, 0.0001 g), reads the tube's meniscus before and after (to ±0.01 mL), the
 * water temperature (0.1 °C), the barometer (0.1 mmHg) and, unless they equalise the water
 * levels, the height of the water column inside the tube (ruler, 1 mm). The gas is hydrogen
 * saturated with water vapour: P(H2) = P(bar) − h/13.6 − P(H2O, T). Vapour pressure from
 * kit/chemlab-core.ts.
 *
 * Realistic errors: an oxide coating on the ribbon makes less hydrogen; reading before the gas
 * has cooled to the water temperature gives a volume about 1% high; too much metal overflows the
 * tube.
 *
 * Params:
 *   metal    "mg" | "unknown"   magnesium (find R), or an unknown metal (find its molar mass)   default "mg"
 *   oxide    number   mass fraction of the ribbon that is MgO (or oxide), 0 to 0.1        default 0.008
 *   seed     number   fixed sample number; 0 picks a new one                               default 0
 *   title    string                                                                         default "Gas collection over water"
 *   caption  string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str } from '../kit/params';
import { Button, Controls, Frame, Note, Slider } from '../kit/controls';
import { fx, M, makeRand, newSeed, quantize, R_LATM, subSeed, waterVapourPressure } from '../kit/chemlab-core';
import { ButtonRow, CheckResult, Display, LabVars, Meniscus, SampleBar } from '../kit/chemlab-ui';

const METALS = [
  { key: 'Mg', name: 'magnesium', M: M.Mg, h2: 1 },
  { key: 'Zn', name: 'zinc', M: M.Zn, h2: 1 },
  { key: 'Al', name: 'aluminium', M: M.Al, h2: 1.5 },
] as const;

type Stage = 'setup' | 'ready' | 'warm' | 'done';

export default function LabGasCollection({ params }: WidgetProps) {
  const metalMode = oneOf(params, 'metal', ['mg', 'unknown'] as const, 'mg');
  const oxide = num(params, 'oxide', 0.008);
  if (oxide < 0 || oxide > 0.1) throw new Error('parameter "oxide" should be between 0 and 0.1');
  const fixedSeed = num(params, 'seed', 0);
  const [seed, setSeed] = useState(() => (fixedSeed > 0 ? fixedSeed : newSeed()));
  const [trial, setTrial] = useState(0);

  const s = useMemo(() => {
    const base = makeRand(seed);
    const metal = metalMode === 'mg' ? METALS[0] : base.pick(METALS);
    const pbar = base.range(735, 768);
    const r = makeRand(subSeed(seed, trial));
    return { metal, pbar, T: base.range(19, 25) + r.range(-0.3, 0.3), v0: r.range(0.15, 1.4), h: Math.round(r.range(50, 170)) };
  }, [seed, trial, metalMode]);

  const [target, setTarget] = useState(metalMode === 'mg' ? 0.035 : 0.05);
  const [mass, setMass] = useState<{ m: number; shown: string } | null>(null);
  const [stage, setStage] = useState<Stage>('setup');
  const [equal, setEqual] = useState(false);

  const weigh = () => {
    const r = makeRand(subSeed(seed, trial, 11));
    const m = Math.max(0.005, target * (1 + r.range(-0.08, 0.08)));
    setMass({ m, shown: fx(quantize(m + r.normal(0.00006), 0.0001), 4) });
    setStage('ready');
  };

  const pw = waterVapourPressure(s.T);
  const hNow = equal ? 0 : s.h;
  const pH2 = s.pbar - hNow / 13.6 - pw; // mmHg
  const nH2 = mass ? ((mass.m * (1 - oxide)) / s.metal.M) * s.metal.h2 : 0;
  const Tgas = stage === 'warm' ? s.T + 2.8 : s.T;
  // Gas volume (mL) after the reaction: H2 at its partial pressure plus the initial bubble.
  const vH2 = ((nH2 * R_LATM * (Tgas + 273.15)) / (pH2 / 760)) * 1000;
  const vFinal = stage === 'warm' || stage === 'done' ? s.v0 + vH2 : s.v0;
  const overflow = vFinal > 50.6;
  const level = Math.min(vFinal, 51.2);

  const reset = (newSample: boolean) => {
    if (newSample) setSeed(newSeed());
    setTrial((t) => (newSample ? 0 : t + 1));
    setMass(null);
    setStage('setup');
    setEqual(false);
  };

  const rRead = makeRand(subSeed(seed, trial, 21));
  const thermo = fx(quantize(s.T + rRead.normal(0.03), 0.1), 1);
  const baro = fx(quantize(s.pbar + rRead.normal(0.1), 0.1), 1);
  const truthR = R_LATM;
  const truth = metalMode === 'mg' ? truthR : s.metal.M;

  return (
    <Frame title={str(params, 'title', 'Gas collection over water')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        <SampleBar seed={seed} fixed={fixedSeed > 0} onNew={() => reset(true)}>
          <Button onClick={() => reset(false)}>New trial</Button>
        </SampleBar>
        <Note>
          {metalMode === 'mg' ? 'Metal: magnesium ribbon (24.305 g/mol). ' : 'Metal: an unknown metal ribbon or turning that dissolves in HCl giving H₂. '}
          The 50 mL gas tube holds about 10 mL of 6 M HCl topped up with water, and stands inverted in a beaker of water at room temperature.
        </Note>
        <Controls>
          <Slider label="Length of ribbon to cut (as a target mass)" value={target} min={0.01} max={0.15} step={0.001} onChange={(v) => setTarget(v)} format={(v) => `${(v * 1000).toFixed(0)} mg`} />
          <div className="flex flex-wrap items-end gap-2">
            <Button onClick={weigh} disabled={stage !== 'setup'}>
              Cut and weigh the metal
            </Button>
            <Display label="Analytical balance" value={mass ? mass.shown : '–'} unit="g" tone={mass ? 'live' : 'idle'} />
          </div>
        </Controls>
        <div className="flex flex-wrap items-start gap-3">
          <div>
            <div className="mb-1 text-[13px] text-ink-2">Gas tube (magnified)</div>
            <Meniscus level={level} minor={0.1} major={1} mid={0.5} span={1.1} direction="down" min={0} max={50} label="Gas tube scale near the water surface" />
          </div>
          <div className="grid min-w-[160px] flex-1 gap-2">
            <Display label="Thermometer in the water" value={thermo} unit="°C" />
            <Display label="Barometer" value={baro} unit="mmHg" />
            <Display label="Ruler: water inside the tube above the outside level" value={stage === 'setup' || stage === 'ready' ? '–' : equal ? '0' : String(s.h)} unit="mm" tone={stage === 'setup' || stage === 'ready' ? 'idle' : 'live'} />
          </div>
        </div>
        <ButtonRow label="At the bench">
          <Button primary onClick={() => setStage('warm')} disabled={stage !== 'ready'}>
            Invert the tube and let the metal react
          </Button>
          <Button onClick={() => setStage('done')} disabled={stage !== 'warm'}>
            Wait 10 minutes for the gas to cool
          </Button>
          <Button onClick={() => setEqual((e) => !e)} disabled={stage === 'setup' || stage === 'ready'}>
            {equal ? 'Put the tube back on its clamp' : 'Move the tube to a tall cylinder and equalise the levels'}
          </Button>
        </ButtonRow>
        <div className="text-xs text-ink-3">
          {stage === 'setup' && 'Read the initial volume (the small air bubble at the top) after you weigh the metal.'}
          {stage === 'ready' && 'Tube filled and inverted; the reading now is your initial volume.'}
          {stage === 'warm' && 'The metal has just dissolved. The gas is still a little warmer than the water.'}
          {stage === 'done' && 'The gas has reached the temperature of the water.'}
        </div>
        {overflow && <Note tone="warn">Gas bubbles are escaping from the bottom of the tube: the volume is beyond the 50 mL scale and this trial cannot be used. Use less metal.</Note>}
        <CheckResult
          label={metalMode === 'mg' ? 'Your value of R' : 'Your molar mass of the metal'}
          unit={metalMode === 'mg' ? 'L·atm/(mol·K)' : 'g/mol'}
          truth={truth}
          decimals={metalMode === 'mg' ? 5 : 2}
          tolerancePct={2}
          note={metalMode === 'unknown' ? `The metal was ${s.metal.name}.` : 'The true value is the accepted gas constant.'}
        />
      </LabVars>
    </Frame>
  );
}
