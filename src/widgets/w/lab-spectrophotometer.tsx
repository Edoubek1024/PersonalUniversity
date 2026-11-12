/**
 * lab-spectrophotometer: a visible spectrophotometer with a food-dye calibration set. The learner
 * blanks the instrument with water, scans a standard to find λmax, sets the wavelength, reads the
 * absorbance of each standard and of an unknown, and builds a Beer's-law calibration line in a
 * spreadsheet. Readings carry photometric noise, cuvette-placement scatter, small errors in how
 * each standard was made up, carry-over when the cuvette is not rinsed, a baseline offset when
 * the blank is skipped, and stray light, which flattens the response above A ≈ 1.5.
 *
 * Measured A = −log10((T + s)/(1 + s)) + noise, where T = 10^(−εbc) and s is the stray-light
 * fraction. Molar absorptivities and λmax from the JECFA specifications (see kit/chemlab-core.ts);
 * band shapes are smooth approximations of the published spectra. Path length 1.00 cm.
 *
 * Params:
 *   dye        "blue1" | "red40" | "yellow5"                       default "blue1"
 *   standards  number[]  standard concentrations, µM               default by dye (about A 0.1 to 1.1)
 *   unknown    number    true unknown concentration, µM; 0 picks one inside the standards   default 0
 *   stray      number    stray-light fraction (0 to 0.02)          default 0.003
 *   seed       number    fixed sample number; 0 picks a new one     default 0
 *   unknownLabel string  what the unknown is                       default "Unknown (diluted drink)"
 *   title      string                                              default "Spectrophotometer"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, oneOf, str } from '../kit/params';
import { Button, Controls, Frame, Note, Segmented, Slider, Toggle } from '../kit/controls';
import { Plot, Poly } from '../kit/Plot';
import { fx, makeRand, newSeed, subSeed } from '../kit/chemlab-core';
import { ButtonRow, CheckResult, Display, LabVars, SampleBar } from '../kit/chemlab-ui';

type DyeKey = 'blue1' | 'red40' | 'yellow5';

interface Dye {
  name: string;
  lmax: number;
  /** L mol−1 cm−1 at λmax. */
  eps: number;
  /** Gaussian bands [centre nm, relative height, sd nm]. */
  bands: [number, number, number][];
  standards: number[];
}

const DYES: Record<DyeKey, Dye> = {
  blue1: { name: 'FD&C Blue No. 1 (Brilliant Blue FCF)', lmax: 630, eps: 1.3e5, bands: [[630, 1, 26], [585, 0.3, 22], [410, 0.09, 30]], standards: [1, 2, 4, 6, 8] },
  red40: { name: 'FD&C Red No. 40 (Allura Red AC)', lmax: 504, eps: 2.58e4, bands: [[504, 1, 40], [430, 0.18, 25]], standards: [5, 10, 20, 30, 40] },
  yellow5: { name: 'FD&C Yellow No. 5 (Tartrazine)', lmax: 427, eps: 2.83e4, bands: [[427, 1, 38], [380, 0.35, 30]], standards: [5, 10, 20, 30, 40] },
};

function shape(d: Dye, l: number): number {
  return d.bands.reduce((s, [c, h, w]) => s + h * Math.exp(-0.5 * ((l - c) / w) ** 2), 0);
}

/** Absorbance of water in a plastic cuvette against air (what blanking removes). */
const baseline = (l: number) => 0.045 + 0.00012 * (700 - l);

export default function LabSpectrophotometer({ params }: WidgetProps) {
  const dyeKey = oneOf(params, 'dye', ['blue1', 'red40', 'yellow5'] as const, 'blue1');
  const dye = DYES[dyeKey];
  const stds = numArray(params, 'standards', dye.standards);
  if (stds.length < 2 || stds.length > 8 || stds.some((c) => !(c > 0))) throw new Error('parameter "standards" should be 2 to 8 positive concentrations in µM');
  const unknownParam = num(params, 'unknown', 0);
  const stray = num(params, 'stray', 0.003);
  if (stray < 0 || stray > 0.02) throw new Error('parameter "stray" should be between 0 and 0.02');
  const fixedSeed = num(params, 'seed', 0);
  const norm = shape(dye, dye.lmax);

  const [seed, setSeed] = useState(() => (fixedSeed > 0 ? fixedSeed : newSeed()));
  const sample = useMemo(() => {
    const r = makeRand(seed);
    const prep = stds.map((c) => c * (1 + r.normal(0.004)));
    const lo = Math.min(...stds);
    const hi = Math.max(...stds);
    const unk = unknownParam > 0 ? unknownParam : r.range(lo + 0.15 * (hi - lo), lo + 0.85 * (hi - lo));
    return { prep, unk };
  }, [seed, stds.join(','), unknownParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const ids = ['blank', ...stds.map((_, i) => `s${i + 1}`), 'unknown'];
  const concOf = (id: string) => (id === 'blank' ? 0 : id === 'unknown' ? sample.unk : sample.prep[Number(id.slice(1)) - 1]);
  const [holder, setHolder] = useState('blank');
  const [prev, setPrev] = useState('blank');
  const [rinse, setRinse] = useState(true);
  const [carry, setCarry] = useState(0);
  const [lambda, setLambda] = useState(520);
  const [blanked, setBlanked] = useState(false);
  const [n, setN] = useState(0);
  const [read, setRead] = useState<{ A: string; T: string; l: number; id: string } | null>(null);
  const [scans, setScans] = useState<{ id: string; pts: [number, number][] }[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  /** Concentration actually in the cuvette (µM), including carry-over from the last solution. */
  const inCuvette = concOf(holder) + carry;

  const measure = (l: number, key: number): number => {
    const r = makeRand(subSeed(seed, key));
    const A = (dye.eps * shape(dye, l)) / norm * inCuvette * 1e-6 + baseline(l) + r.normal(0.0015);
    const Aref = blanked ? baseline(l) : 0;
    const T = 10 ** -(A - Aref);
    const Tm = (T + stray) / (1 + stray) + r.normal(0.0003);
    return -Math.log10(Math.max(Tm, 1e-4));
  };

  const choose = (id: string) => {
    if (id === holder) return;
    // Without rinsing, a few percent of the previous solution stays in the cuvette.
    const leftover = rinse ? 0 : 0.04 * (concOf(holder) + carry - concOf(id));
    setCarry(leftover);
    setPrev(holder);
    setHolder(id);
    setRead(null);
  };

  const doRead = () => {
    const A = measure(lambda, 1000 + n);
    setN((x) => x + 1);
    setRead({ A: fx(A, 3), T: fx(100 * 10 ** -A, 1), l: lambda, id: holder });
    setMsg(blanked ? null : 'The instrument has not been blanked: this reading includes the water and the cuvette.');
  };

  const doBlank = () => {
    if (holder !== 'blank') {
      setMsg('Put the blank (water) in the holder before calibrating.');
      return;
    }
    setBlanked(true);
    setMsg('Calibrated: the blank now reads A = 0.000 at every wavelength.');
    setRead(null);
  };

  const doScan = () => {
    const pts: [number, number][] = [];
    for (let l = 380; l <= 720; l += 2) pts.push([l, measure(l, 50000 + n * 400 + l)]);
    setN((x) => x + 1);
    setScans((s) => [...s.slice(-2), { id: holder, pts }]);
  };

  const label = (id: string) => (id === 'blank' ? 'Blank' : id === 'unknown' ? 'Unknown' : `S${id.slice(1)}`);
  const colour = useMemo(() => {
    const band = (a: number, b: number) => {
      let s = 0;
      for (let l = a; l <= b; l += 10) s += 10 ** -((dye.eps * shape(dye, l)) / norm * inCuvette * 1e-6);
      return s / ((b - a) / 10 + 1);
    };
    const [R, G, B] = [band(600, 700), band(500, 590), band(400, 490)];
    return `rgba(${Math.round(255 * R)},${Math.round(255 * G)},${Math.round(255 * B)},0.9)`;
  }, [inCuvette, dye, norm]);
  const yMax = Math.max(1.2, ...scans.flatMap((s) => s.pts.map((p) => p[1] + 0.1)));

  return (
    <Frame title={str(params, 'title', 'Spectrophotometer')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        <SampleBar seed={seed} fixed={fixedSeed > 0} onNew={() => { setSeed(newSeed()); setBlanked(false); setRead(null); setScans([]); setCarry(0); setHolder('blank'); setMsg(null); }} />
        <Note>
          Dye: {dye.name}. Standards made by diluting a stock solution:{' '}
          {stds.map((c, i) => `S${i + 1} = ${fx(c, c < 10 ? 2 : 1)} µM`).join(', ')}. Path length 1.00 cm.
        </Note>
        <Segmented label="Cuvette in the holder" options={ids.map((id) => ({ value: id, label: label(id) }))} value={holder} onChange={choose} />
        <div className="flex flex-wrap items-center gap-3">
          <svg width={46} height={76} viewBox="0 0 46 76" role="img" aria-label={`Cuvette holding ${label(holder)}`}>
            <rect x={6} y={4} width={34} height={68} rx={3} fill="var(--chemlab-glass)" stroke="var(--plot-axis)" strokeWidth={1.5} />
            <rect x={8} y={18} width={30} height={52} fill={holder === 'blank' ? 'var(--chemlab-water)' : colour} />
          </svg>
          <Toggle label="Rinse the cuvette with the new solution before filling" checked={rinse} onChange={setRinse} />
        </div>
        <Controls>
          <Slider label="Wavelength" value={lambda} min={380} max={720} step={1} onChange={(v) => { setLambda(v); setRead(null); }} format={(v) => `${v} nm`} />
          <div className="grid grid-cols-2 gap-2">
            <Display label="Absorbance" value={read && read.l === lambda && read.id === holder ? read.A : '–'} tone={read ? 'live' : 'idle'} />
            <Display label="Transmittance" value={read && read.l === lambda && read.id === holder ? read.T : '–'} unit="%" tone={read ? 'live' : 'idle'} />
          </div>
        </Controls>
        <ButtonRow>
          <Button onClick={doBlank}>Calibrate with blank</Button>
          <Button primary onClick={doRead}>
            Read absorbance
          </Button>
          <Button onClick={doScan}>Scan spectrum</Button>
          {scans.length > 0 && <Button onClick={() => setScans([])}>Clear scans</Button>}
        </ButtonRow>
        <div className="text-xs text-ink-3">Status: {blanked ? 'blanked with water' : 'not blanked'} · previous cuvette: {label(prev)}</div>
        {msg && <Note tone={msg.startsWith('Calibrated') ? 'good' : 'warn'}>{msg}</Note>}
        {scans.length > 0 && (
          <>
            <Plot view={[380, 720, -0.13 * yMax, yMax]} aspect={0.45} minHeight={200} maxHeight={300} xStep={50} label="Absorbance spectra you scanned">
              {scans.map((s, i) => (
                <Poly key={i} points={s.pts} color={['var(--plot-1)', 'var(--plot-3)', 'var(--plot-2)'][i % 3]} width={1.6} />
              ))}
            </Plot>
            <div className="flex flex-wrap gap-3 text-xs text-ink-2">
              <span>Absorbance against wavelength (nm).</span>
              {scans.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-0.5 w-4 rounded" style={{ background: ['var(--plot-1)', 'var(--plot-3)', 'var(--plot-2)'][i % 3] }} />
                  {label(s.id)}
                </span>
              ))}
            </div>
          </>
        )}
        <CheckResult label="Your unknown concentration" unit="µM" truth={sample.unk} decimals={2} tolerancePct={3} />
      </LabVars>
    </Frame>
  );
}
