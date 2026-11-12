/**
 * lab-balance: a measurement bench with an analytical balance (0.0001 g) and four pieces of
 * glassware. The learner delivers water (or an unknown solution) into a weighing beaker, reads
 * the balance and, for the graduated glassware, the meniscus themselves, then converts mass to
 * volume with the density of water at the bench temperature. Repeating deliveries shows each
 * piece of glassware's precision (scatter) and accuracy (its offset from the nominal volume).
 *
 * Built-in behaviour, all seeded per sample:
 *   - each piece of glassware has a calibration offset inside its tolerance class
 *     (50 mL beaker ±5% at the 20 mL mark, 10 mL graduated cylinder ±0.10 mL, 10 mL class A
 *     volumetric pipet ±0.02 mL, 50 mL class A burette ±0.05 mL), plus filling scatter;
 *   - `pipetBias` adds a systematic error beyond tolerance (a chipped or uncalibrated pipet);
 *   - balance noise is about 0.0001 g with the draft-shield doors closed and ten times that with
 *     them open;
 *   - air buoyancy: water weighed in air reads about 0.1% light (kit/chemlab-core.ts).
 *
 * Params:
 *   pipetBias  number   extra error of the volumetric pipet, mL            default 0
 *   unknown    boolean  offer an unknown solution for a density measurement   default true
 *   glassware  string[] which glassware to offer: "beaker", "cylinder", "pipet", "burette"   default all four
 *   seed       number   fixed sample number; 0 picks a new one              default 0
 *   title      string                                                       default "Measurement bench"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str, strArray } from '../kit/params';
import { Button, Frame, Note, Segmented, Toggle } from '../kit/controls';
import { balanceReading, fx, makeRand, newSeed, quantize, subSeed, waterDensity } from '../kit/chemlab-core';
import { ButtonRow, CheckResult, Display, LabVars, Meniscus, SampleBar } from '../kit/chemlab-ui';

type Glass = 'beaker' | 'cylinder' | 'pipet' | 'burette';
const ALL: Glass[] = ['beaker', 'cylinder', 'pipet', 'burette'];
const NAMES: Record<Glass, string> = { beaker: '50 mL beaker (to 20 mL mark)', cylinder: '10 mL graduated cylinder', pipet: '10 mL volumetric pipet', burette: '50 mL burette (about 10 mL)' };
const SHORT: Record<Glass, string> = { beaker: 'Beaker', cylinder: 'Cylinder', pipet: 'Pipet', burette: 'Burette' };
const NOMINAL: Record<Glass, number> = { beaker: 20, cylinder: 10, pipet: 10, burette: 10 };

/** What the learner sees in the magnifier after filling (or delivering from) a piece of glassware. */
interface View {
  glass: Glass;
  level: number;
  phase: 'filled' | 'delivered';
}

export default function LabBalance({ params }: WidgetProps) {
  const pipetBias = num(params, 'pipetBias', 0);
  if (Math.abs(pipetBias) > 1) throw new Error('parameter "pipetBias" should be between −1 and 1 mL');
  const offer = strArray(params, 'glassware', ALL);
  if (!offer.length || offer.some((g) => !ALL.includes(g as Glass))) throw new Error('parameter "glassware" should list some of "beaker", "cylinder", "pipet", "burette"');
  const withUnknown = bool(params, 'unknown', true);
  const fixedSeed = num(params, 'seed', 0);

  const [seed, setSeed] = useState(() => (fixedSeed > 0 ? fixedSeed : newSeed()));
  const s = useMemo(() => {
    const r = makeRand(seed);
    return {
      T: r.range(20.5, 24.5),
      beakerGlass: r.range(28.5, 33.5),
      bias: { beaker: r.range(-0.04, 0.04) * 20, cylinder: r.range(-0.08, 0.08), pipet: r.range(-0.018, 0.018), burette: r.range(-0.04, 0.04) } as Record<Glass, number>,
      rhoUnknown: r.range(1.03, 1.15),
    };
  }, [seed]);

  const [glass, setGlass] = useState<Glass>(offer[0] as Glass);
  const [liquid, setLiquid] = useState<'water' | 'unknown'>('water');
  const [doors, setDoors] = useState(true);
  const [content, setContent] = useState(0); // grams of liquid in the weighing beaker
  const [tare, setTare] = useState(0); // reading subtracted by Tare
  const [shown, setShown] = useState<string | null>(null);
  const [view, setView] = useState<View | null>(null);
  const [pending, setPending] = useState<{ glass: Glass; vol: number; level: number } | null>(null);
  const [n, setN] = useState(0);
  const [deliveries, setDeliveries] = useState(0);

  const rho = liquid === 'water' ? waterDensity(s.T) : s.rhoUnknown;
  const trueReading = () => balanceReading(s.beakerGlass, 2.23) + balanceReading(content, rho);

  const read = () => {
    const r = makeRand(subSeed(seed, 1, n));
    const sd = doors ? 0.00007 : 0.0012;
    setShown(fx(quantize(trueReading() - tare + r.normal(sd) + (doors ? 0 : r.range(-0.001, 0.002)), 0.0001), 4));
    setN((x) => x + 1);
  };

  const fill = () => {
    const r = makeRand(subSeed(seed, 2, n));
    setN((x) => x + 1);
    let level = 0;
    let vol = 0;
    if (glass === 'beaker') {
      level = 20 + r.normal(0.6);
      vol = level * (1 + s.bias.beaker / 20);
    } else if (glass === 'cylinder') {
      level = 10 + r.normal(0.04);
      vol = level + s.bias.cylinder;
    } else if (glass === 'pipet') {
      level = 10 + r.normal(0.004);
      vol = level + s.bias.pipet + pipetBias;
    } else {
      level = r.range(0.2, 1.6);
      vol = 0;
    }
    setPending({ glass, vol, level });
    setView({ glass, level, phase: 'filled' });
  };

  const deliver = () => {
    if (!pending || pending.glass !== glass) return;
    const r = makeRand(subSeed(seed, 3, n));
    setN((x) => x + 1);
    let vol = pending.vol;
    if (glass === 'burette') {
      const d = 10 + r.normal(0.15);
      vol = d * (1 + s.bias.burette / 50);
      setView({ glass, level: pending.level + d, phase: 'delivered' });
    } else setView(null);
    setContent((c) => c + vol * rho);
    setPending(null);
    setDeliveries((d) => d + 1);
  };

  const reset = (newSample: boolean) => {
    if (newSample) setSeed(newSeed());
    setContent(0);
    setTare(0);
    setShown(null);
    setView(null);
    setPending(null);
    setDeliveries(0);
  };

  const truthVol = glass === 'pipet' ? NOMINAL.pipet + s.bias.pipet + pipetBias : glass === 'beaker' ? 20 * (1 + s.bias.beaker / 20) : glass === 'cylinder' ? 10 + s.bias.cylinder : 10 * (1 + s.bias.burette / 50);
  const tol = glass === 'beaker' ? 8 : glass === 'cylinder' ? 1.5 : 0.3;

  const meniscus = view && (
    <div>
      <div className="mb-1 text-[13px] text-ink-2">
        {SHORT[view.glass]} (magnified){view.glass === 'burette' ? (view.phase === 'filled' ? ': initial reading' : ': final reading') : ''}
      </div>
      {view.glass === 'beaker' && <Meniscus level={view.level} minor={5} major={10} span={16} direction="up" min={0} max={50} label="Beaker graduations near the surface" />}
      {view.glass === 'cylinder' && <Meniscus level={view.level} minor={0.2} major={1} span={1.6} direction="up" min={0} max={10} label="Graduated cylinder scale near the surface" />}
      {view.glass === 'pipet' && <Meniscus level={view.level} minor={1} major={1} span={0.25} direction="up" mark={10} centre={10} label="Pipet calibration mark and meniscus" />}
      {view.glass === 'burette' && <Meniscus level={view.level} minor={0.1} major={1} mid={0.5} span={1.1} direction="down" min={0} max={50} label="Burette scale near the meniscus" />}
    </div>
  );

  return (
    <Frame title={str(params, 'title', 'Measurement bench')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        <SampleBar seed={seed} fixed={fixedSeed > 0} onNew={() => reset(true)} />
        <Segmented label="Glassware" options={(offer as Glass[]).map((g) => ({ value: g, label: SHORT[g] }))} value={glass} onChange={(g) => { setGlass(g); setPending(null); setView(null); }} />
        {withUnknown && (
          <Segmented
            label="Liquid"
            options={[
              { value: 'water', label: 'Deionised water' },
              { value: 'unknown', label: 'Unknown solution' },
            ]}
            value={liquid}
            onChange={(v) => { if (content > 0) return; setLiquid(v); }}
          />
        )}
        <div className="text-[13px] text-ink-2">
          Using: {NAMES[glass]}. Deliveries into this beaker so far: {deliveries}.
          {content > 0 && withUnknown ? ' (Empty the beaker to change liquid.)' : ''}
        </div>
        <div className="flex flex-wrap items-start gap-3">
          {meniscus}
          <div className="grid min-w-[170px] flex-1 gap-2">
            <Display label={`Analytical balance${doors ? '' : ' (doors open)'}`} value={shown ?? '–'} unit="g" tone={shown ? 'live' : 'idle'} />
            <Display label="Thermometer in the liquid" value={fx(quantize(s.T, 0.1), 1)} unit="°C" />
          </div>
        </div>
        <ButtonRow label="Balance">
          <Button primary onClick={read}>
            Read balance
          </Button>
          <Button onClick={() => { setTare(trueReading()); setShown('0.0000'); }}>Tare (zero with beaker on)</Button>
          <Button onClick={() => { setTare(0); setShown(null); }}>Clear tare</Button>
          <Toggle label="Draft-shield doors closed" checked={doors} onChange={setDoors} />
        </ButtonRow>
        <ButtonRow label="Glassware">
          <Button onClick={fill} disabled={!!pending}>
            {glass === 'burette' ? 'Fill burette and drain to near zero' : glass === 'pipet' ? 'Fill pipet to the mark' : 'Fill to the mark'}
          </Button>
          <Button onClick={deliver} disabled={!pending}>
            {glass === 'burette' ? 'Deliver about 10 mL into the beaker' : 'Deliver into the beaker'}
          </Button>
          <Button onClick={() => { setContent(0); setShown(null); setDeliveries(0); }}>Empty and dry the beaker</Button>
        </ButtonRow>
        {!doors && <Note tone="warn">With the doors open, air currents push on the pan: the last digits wander.</Note>}
        {liquid === 'water' ? (
          <CheckResult label={`Mean volume one ${SHORT[glass].toLowerCase()} delivery gives`} unit="mL" truth={truthVol} decimals={3} tolerancePct={tol} note="Weighing in air makes water read about 0.1% light; a careful calibration corrects for this." />
        ) : (
          <CheckResult label="Your density of the unknown" unit="g/mL" truth={s.rhoUnknown} decimals={4} tolerancePct={0.5} />
        )}
      </LabVars>
    </Frame>
  );
}
