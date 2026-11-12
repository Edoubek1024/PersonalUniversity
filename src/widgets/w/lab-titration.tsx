/**
 * lab-titration: an acid-base titration at the bench. The learner weighs a solid acid into a
 * flask, fills a 50 mL burette with NaOH, reads the burette meniscus themselves (to ±0.01 mL),
 * and adds base in streams, single drops or half drops until the indicator changes. The pH is
 * computed from the full charge balance (kit/chemlab-acidbase.ts), the indicator colour follows
 * its own pKa, and over-shooting is possible. An optional pH meter plots the titration curve.
 *
 * Modes
 *   "standardize"  KHP (204.22 g/mol, a primary standard) against NaOH of unknown molarity
 *   "unknown"      an unknown monoprotic solid acid against NaOH of stated molarity; the result
 *                  is the acid's molar mass
 *
 * Params:
 *   mode       "standardize" | "unknown"                          default "standardize"
 *   seed       number   fixed sample number; 0 picks a new one     default 0
 *   indicator  "phenolphthalein" | "bromothymol"                  default "phenolphthalein"
 *   phMeter    boolean  start with the pH meter in the flask       default false
 *   acid       "random" | "sulfamic" | "khso4" | "khp"   unknown mode only   default "random"
 *   naoh       number   true NaOH molarity; 0 picks 0.0950-0.1050 M in standardize mode and
 *                       0.0980-0.1020 M (printed on the label) in unknown mode   default 0
 *   bubble     boolean  an air bubble in the burette tip escapes on the first delivery   default false
 *   title      string                                              default "Titration bench"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Button, Controls, Frame, Note, Segmented, Slider, Toggle } from '../kit/controls';
import { Dot, Plot } from '../kit/Plot';
import { fx, makeRand, newSeed, quantize, subSeed } from '../kit/chemlab-core';
import { ACIDS, baseFraction, INDICATORS, titrationPH, type Indicator } from '../kit/chemlab-acidbase';
import { ButtonRow, CheckResult, Display, LabVars, Meniscus, SampleBar } from '../kit/chemlab-ui';

const V0 = 50; // mL of water the solid is dissolved in
const UNKNOWNS = ['sulfamic', 'khso4', 'khp'] as const;

interface Flask {
  trial: number;
  massTrue: number;
  massShown: string;
  n: number;
  /** mL of base actually in the flask. */
  v: number;
  points: [number, number][];
  streak: boolean;
}

function flaskColour(ind: Indicator, pH: number): { fill: string; words: string } {
  const f = baseFraction(ind, pH);
  if (!ind.acid && ind.base) {
    const a = f < 0.04 ? 0 : Math.min(0.95, 0.08 + (f - 0.04) * 2.2);
    const words = f < 0.04 ? 'colourless' : f < 0.12 ? 'very faint pink' : f < 0.35 ? 'light pink' : f < 0.75 ? 'pink' : 'deep magenta';
    return { fill: `rgba(${ind.base.join(',')},${a.toFixed(3)})`, words };
  }
  const [a, b] = [ind.acid!, ind.base!];
  const c = a.map((x, i) => Math.round(x * (1 - f) + b[i] * f));
  const words = f < 0.1 ? 'yellow' : f < 0.35 ? 'yellow-green' : f < 0.65 ? 'green' : f < 0.9 ? 'blue-green' : 'blue';
  return { fill: `rgba(${c.join(',')},0.6)`, words };
}

export default function LabTitration({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['standardize', 'unknown'] as const, 'standardize');
  const fixedSeed = num(params, 'seed', 0);
  const indName = oneOf(params, 'indicator', ['phenolphthalein', 'bromothymol'] as const, 'phenolphthalein');
  const acidParam = oneOf(params, 'acid', ['random', 'sulfamic', 'khso4', 'khp'] as const, 'random');
  const naohParam = num(params, 'naoh', 0);
  const bubbleParam = bool(params, 'bubble', false);
  if (naohParam < 0 || naohParam > 1) throw new Error('parameter "naoh" should be between 0 and 1 mol/L');

  const [seed, setSeed] = useState(() => (fixedSeed > 0 ? fixedSeed : newSeed()));
  const makeSample = (s: number) => {
    const r = makeRand(s);
    const cb = naohParam > 0 ? naohParam : mode === 'standardize' ? r.range(0.095, 0.105) : Number(r.range(0.098, 0.102).toFixed(4));
    const acidKey = mode === 'standardize' ? 'khp' : acidParam === 'random' ? r.pick(UNKNOWNS) : acidParam;
    return { cb, acid: ACIDS[acidKey], level0: r.range(0.1, 1.9) };
  };
  const sample = useMemo(() => makeSample(seed), [seed, mode, acidParam, naohParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const [ind, setInd] = useState<Indicator>(INDICATORS[indName]);
  const [meter, setMeter] = useState(bool(params, 'phMeter', false));
  const [target, setTarget] = useState(mode === 'standardize' ? 0.45 : 0.3);
  const [level, setLevel] = useState(sample.level0);
  const [bubble, setBubble] = useState(bubbleParam);
  const [flask, setFlask] = useState<Flask | null>(null);
  const [actions, setActions] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);

  const reset = (s: number) => {
    setSeed(s);
    setLevel(makeSample(s).level0);
    setFlask(null);
    setBubble(bubbleParam);
    setActions(0);
    setMsg(null);
  };

  const pH = flask ? titrationPH(sample.acid, flask.n, V0, sample.cb, flask.v) : 7;
  const colour = flask ? flaskColour(ind, pH) : { fill: 'transparent', words: 'empty' };
  const meterReading = useMemo(() => {
    if (!flask) return '–';
    const r = makeRand(subSeed(seed, 7, actions));
    return fx(pH + r.normal(0.006), 2);
  }, [flask, pH, seed, actions]);

  const weigh = () => {
    const r = makeRand(subSeed(seed, 1, (flask?.trial ?? 0) + 1));
    const m = Math.max(0.05, target + r.range(-0.03, 0.03));
    const shown = quantize(m + r.normal(0.00008), 0.0001);
    setFlask({ trial: (flask?.trial ?? 0) + 1, massTrue: m, massShown: fx(shown, 4), n: m / sample.acid.molarMass, v: 0, points: [[0, titrationPH(sample.acid, m / sample.acid.molarMass, V0, sample.cb, 0)]], streak: false });
    setMsg(null);
  };

  const refill = () => {
    const r = makeRand(subSeed(seed, 2, actions));
    setLevel(r.range(0.1, 1.9));
    setActions((a) => a + 1);
    setMsg('Burette refilled with NaOH and drained to just below the zero mark. Read it before you go on.');
  };

  const add = (nominal: number, sd: number) => {
    if (!flask) return;
    if (level > 50.6) {
      setMsg('The meniscus is below the last graduation. Refill the burette before adding more.');
      return;
    }
    const r = makeRand(subSeed(seed, 3, actions));
    let v = Math.max(0.005, nominal + r.normal(sd));
    v = Math.min(v, 50.6 - level + 0.4);
    const extra = bubble ? 0.12 + r.range(0, 0.08) : 0;
    const before = titrationPH(sample.acid, flask.n, V0, sample.cb, flask.v);
    const nv = flask.v + v;
    const after = titrationPH(sample.acid, flask.n, V0, sample.cb, nv);
    // A drop of base lands as a local patch of high pH: pink where it lands, gone on swirling.
    const streak = nominal <= 1.2 && baseFraction(ind, after) < 0.04 && after > ind.pKin - 3.2 && after - before > 0.02;
    const counter = nv + makeRand(subSeed(seed, 9, actions)).normal(0.01);
    setFlask({ ...flask, v: nv, points: [...flask.points, [counter, after]], streak });
    setLevel(level + v + extra);
    if (bubble) {
      setBubble(false);
      setMsg('An air bubble shot out of the burette tip with that delivery.');
    } else setMsg(null);
    setActions((a) => a + 1);
  };

  const maxV = Math.max(30, ...(flask?.points.map((p) => p[0] + 3) ?? [0]));
  const isStd = mode === 'standardize';
  const truth = isStd ? sample.cb : sample.acid.molarMass;

  return (
    <Frame title={str(params, 'title', 'Titration bench')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        <SampleBar seed={seed} fixed={fixedSeed > 0} onNew={() => reset(newSeed())} />
        <Note>
          {isStd ? (
            <>
              Analyte: solid KHP (KHC₈H₄O₄, 204.22 g/mol, a primary standard) dissolved in about 50 mL of water with 2 drops of {ind.name}. Titrant: NaOH of
              unknown molarity, roughly 0.1 M.
            </>
          ) : (
            <>
              Analyte: an unknown monoprotic solid acid dissolved in about 50 mL of water with 2 drops of {ind.name}. Titrant: NaOH, label reads{' '}
              <span className="font-mono">{fx(sample.cb, 4)} M</span> (standardised).
            </>
          )}
        </Note>
        <Controls>
          <Slider label="Target mass of solid to weigh" value={target} min={0.1} max={1.0} step={0.01} onChange={setTarget} format={(v) => `${v.toFixed(2)} g`} />
          <div className="flex flex-wrap items-end gap-1.5">
            <Button primary onClick={weigh}>
              {flask ? 'New flask: weigh a new sample' : 'Weigh sample into flask'}
            </Button>
          </div>
        </Controls>
        <div className="flex flex-wrap items-start gap-3">
          <div>
            <div className="mb-1 text-[13px] text-ink-2">Burette (magnified)</div>
            <Meniscus level={level} minor={0.1} major={1} mid={0.5} span={1.1} direction="down" min={0} max={50} label="Burette scale near the meniscus" liquid="var(--chemlab-water)" />
          </div>
          <div className="min-w-[150px]">
            <div className="mb-1 text-[13px] text-ink-2">Flask</div>
            <svg width={150} height={150} viewBox="0 0 150 150" role="img" aria-label={`Flask, solution is ${colour.words}`}>
              <path d="M58,8 L92,8 L92,48 L135,138 Q137,144 130,144 L20,144 Q13,144 15,138 L58,48 Z" fill="var(--chemlab-glass)" stroke="var(--plot-axis)" strokeWidth={2} />
              {flask && <path d="M38,92 L112,92 L135,138 Q137,144 130,144 L20,144 Q13,144 15,138 Z" fill="var(--chemlab-water)" opacity={0.55} />}
              {flask && <path d="M38,92 L112,92 L135,138 Q137,144 130,144 L20,144 Q13,144 15,138 Z" fill={colour.fill} />}
              {flask?.streak && <ellipse cx={78} cy={100} rx={9} ry={4} fill={`rgba(${(ind.base ?? [0, 0, 0]).join(',')},0.75)`} />}
              {meter && flask && <rect x={88} y={2} width={7} height={118} rx={3} fill="var(--plot-axis)" />}
            </svg>
            <div className="text-[13px] text-ink-2">
              Colour: <span className="font-medium text-ink">{colour.words}</span>
            </div>
          </div>
          <div className="grid min-w-[150px] flex-1 gap-2">
            <Display label="Balance (sample in flask)" value={flask ? flask.massShown : '–'} unit="g" tone={flask ? 'live' : 'idle'} />
            {meter && <Display label="pH meter" value={meterReading} />}
            {flask && <div className="text-xs text-ink-3">Trial {flask.trial}</div>}
          </div>
        </div>
        {flask?.streak && <Note>A streak of colour forms where the base lands and fades as you swirl: you are close to the end point.</Note>}
        {msg && <Note tone="warn">{msg}</Note>}
        <ButtonRow label="Add NaOH from the burette">
          <Button onClick={() => add(5, 0.25)} disabled={!flask}>
            Stream ≈5 mL
          </Button>
          <Button onClick={() => add(1, 0.06)} disabled={!flask}>
            Stream ≈1 mL
          </Button>
          <Button onClick={() => add(0.05, 0.005)} disabled={!flask}>
            1 drop
          </Button>
          <Button onClick={() => add(0.025, 0.004)} disabled={!flask}>
            Half drop
          </Button>
          <Button onClick={refill}>Refill burette</Button>
        </ButtonRow>
        <div className="flex flex-wrap items-center gap-4">
          <Segmented
            label="Indicator in the next flask"
            options={[
              { value: 'phenolphthalein', label: 'Phenolphthalein' },
              { value: 'bromothymol', label: 'Bromothymol blue' },
            ]}
            value={ind === INDICATORS.phenolphthalein ? 'phenolphthalein' : 'bromothymol'}
            onChange={(v) => setInd(INDICATORS[v])}
          />
          <Toggle label="pH meter in the flask" checked={meter} onChange={setMeter} />
        </div>
        {meter && flask && (
          <Plot view={[0, maxV, 0, 14]} aspect={0.5} minHeight={200} maxHeight={300} yStep={2} label="pH against volume of NaOH added">
            {flask.points.map(([v, p], i) => (
              <Dot key={i} x={v} y={p} r={3} color="var(--plot-1)" />
            ))}
          </Plot>
        )}
        {meter && flask && <div className="text-xs text-ink-3">pH against mL of NaOH added (volume from the drop counter, ±0.02 mL).</div>}
        <CheckResult
          label={isStd ? 'Your NaOH molarity' : 'Your molar mass of the acid'}
          unit={isStd ? 'mol/L' : 'g/mol'}
          truth={truth}
          decimals={isStd ? 4 : 1}
          tolerancePct={isStd ? 0.5 : 1}
          note={!isStd ? `The unknown was ${sample.acid.name}.` : undefined}
        />
      </LabVars>
    </Frame>
  );
}
