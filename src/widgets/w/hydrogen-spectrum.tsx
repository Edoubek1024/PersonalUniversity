/**
 * hydrogen-spectrum: the energy levels of the hydrogen atom, E_n = -hcR_H / n^2, with the
 * transitions of one series drawn as arrows. Pick the lower level (series) and click a level
 * (or use the buttons) to choose the upper one; the photon's energy, wavelength, frequency and
 * colour are shown, the Rydberg formula is filled in, and every line of the series is marked on a
 * spectrum strip from the ultraviolet to the infrared.
 *
 * Constants: R_H = 1.09678e7 m^-1 (hydrogen, reduced-mass corrected), h = 6.62607015e-34 J s,
 * c = 2.99792458e8 m/s, N_A = 6.02214076e23 /mol. Wavelengths are vacuum wavelengths.
 *
 * Params:
 *   nLower   number   lower level (1 = Lyman, 2 = Balmer, 3 = Paschen, 4 = Brackett)   default 2
 *   nUpper   number   upper level, greater than nLower and at most maxN                 default 3
 *   maxN     number   highest level drawn (4 to 8)                                       default 7
 *   mode     "emission" | "absorption"   direction of the arrow and wording              default "emission"
 *   title    string                                                                       default "Hydrogen energy levels and spectrum"
 *   caption  string   what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str } from '../kit/params';
import { Plot, Segment, Arrow, Label } from '../kit/Plot';
import { Button, Controls, Frame, Readout, Segmented, Tex } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { regionOf, sciText, wavelengthCss } from '../kit/chem-color';

const RH = 1.09678e7;
const H = 6.62607015e-34;
const C = 2.99792458e8;
const NA = 6.02214076e23;
const EV = 1.602176634e-19;
const E1 = H * C * RH; // J, magnitude of the n = 1 energy

const SERIES: Record<number, string> = { 1: 'Lyman', 2: 'Balmer', 3: 'Paschen', 4: 'Brackett' };

const levelEV = (n: number) => -E1 / EV / (n * n);
/**
 * Display height of an energy (eV). Levels n >= 2 are drawn to scale; the long gap down to n = 1
 * is compressed (a broken axis, marked in the drawing) so the upper levels get room.
 */
const BREAK = -4.1;
const yOf = (E: number) => (E >= BREAK ? E : BREAK - (BREAK - E) * 0.16);
const Y = (n: number) => yOf(levelEV(n));
const lambdaNm = (lo: number, hi: number) => 1e9 / (RH * (1 / (lo * lo) - 1 / (hi * hi)));

function sci(x: number, digits = 4): string {
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / Math.pow(10, e);
  return `${m.toFixed(digits - 1)} \\times 10^{${e}}`;
}

function Strip({ lo, hi, maxN }: { lo: number; hi: number; maxN: number }) {
  const [ref, { width }] = useElementSize<HTMLDivElement>();
  const W = width || 600;
  const Hh = 74;
  const a = Math.log10(80);
  const b = Math.log10(2700);
  const x = (nm: number) => ((Math.log10(nm) - a) / (b - a)) * W;
  const lines = useMemo(() => {
    const out: { n: number; nm: number }[] = [];
    for (let n = lo + 1; n <= Math.max(maxN, 12); n++) out.push({ n, nm: lambdaNm(lo, n) });
    return out;
  }, [lo, maxN]);
  const limit = 1e9 / (RH / (lo * lo));
  const stops = [380, 420, 460, 490, 510, 550, 580, 610, 645, 700, 750];
  const gid = `vis-${lo}`;
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={Hh} viewBox={`0 0 ${W} ${Hh}`} role="img" aria-label={`${SERIES[lo] ?? ''} series lines on a wavelength scale from 80 to 2700 nm`} className="block rounded-lg bg-surface">
        <defs>
          <linearGradient id={gid} x1={x(380)} x2={x(750)} gradientUnits="userSpaceOnUse">
            {stops.map((s) => (
              <stop key={s} offset={(x(s) - x(380)) / (x(750) - x(380))} stopColor={wavelengthCss(s) ?? 'black'} />
            ))}
          </linearGradient>
        </defs>
        <rect x={0} y={8} width={W} height={34} fill="var(--color-surface-2)" />
        <rect x={x(380)} y={8} width={x(750) - x(380)} height={34} fill={`url(#${gid})`} opacity={0.35} />
        {/* series limit */}
        <line x1={x(limit)} x2={x(limit)} y1={4} y2={46} stroke="var(--plot-text)" strokeDasharray="3 3" />
        {lines.map(({ n, nm }) => {
          if (nm > 2700) return null;
          const sel = n === hi;
          return <line key={n} x1={x(nm)} x2={x(nm)} y1={sel ? 4 : 12} y2={sel ? 46 : 38} stroke={wavelengthCss(nm) ?? 'var(--plot-text)'} strokeWidth={sel ? 3 : 1.5} opacity={sel ? 1 : 0.8} />;
        })}
        <g fontSize={11} fill="var(--plot-text)">
          {[100, 200, 400, 700, 1000, 2000].map((t) => (
            <g key={t}>
              <line x1={x(t)} x2={x(t)} y1={42} y2={47} stroke="var(--plot-axis)" />
              <text x={x(t)} y={59} textAnchor="middle">
                {t}
              </text>
            </g>
          ))}
          <text x={4} y={71}>
            UV
          </text>
          <text x={(x(380) + x(750)) / 2} y={71} textAnchor="middle">
            visible
          </text>
          <text x={W - 4} y={71} textAnchor="end">
            IR (nm)
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function HydrogenSpectrum({ params }: WidgetProps) {
  const maxN = Math.round(num(params, 'maxN', 7));
  if (maxN < 4 || maxN > 8) throw new Error('parameter "maxN" should be between 4 and 8');
  const lo0 = Math.round(num(params, 'nLower', 2));
  const hi0 = Math.round(num(params, 'nUpper', lo0 + 1));
  if (lo0 < 1 || lo0 > 4) throw new Error('parameter "nLower" should be 1, 2, 3 or 4');
  if (hi0 <= lo0 || hi0 > maxN) throw new Error(`parameter "nUpper" should be greater than nLower and at most maxN (${maxN})`);
  const [lo, setLo] = useState(lo0);
  const [hi, setHi] = useState(hi0);
  const [mode, setMode] = useState(oneOf(params, 'mode', ['emission', 'absorption'] as const, 'emission'));

  const dE = E1 * (1 / (lo * lo) - 1 / (hi * hi));
  const nm = lambdaNm(lo, hi);
  const nu = C / (nm * 1e-9);
  const colour = wavelengthCss(nm);

  const levels = Array.from({ length: maxN }, (_, i) => i + 1);

  const pick = (n: number) => {
    if (n > lo) setHi(n);
    else if (n <= 4) {
      setLo(n);
      if (hi <= n) setHi(n + 1);
    }
  };

  const onDown = (_x: number, y: number) => {
    let best = 0;
    let bd = Infinity;
    for (const n of levels) {
      const d = Math.abs(Y(n) - y);
      if (d < bd) {
        bd = d;
        best = n;
      }
    }
    if (bd < 0.25) pick(best);
  };

  // x positions of the series arrows
  const ups = levels.filter((n) => n > lo);
  const ax = (n: number) => 3.2 + ((n - lo - 1) / Math.max(1, maxN - lo - 1)) * 5.2;

  const rydberg = `\\frac{1}{\\lambda} = R_\\mathrm{H}\\left(\\frac{1}{${lo}^2} - \\frac{1}{${hi}^2}\\right) = ${sci(1 / (nm * 1e-9))}\\ \\mathrm{m^{-1}}`;

  return (
    <Frame title={str(params, 'title', 'Hydrogen energy levels and spectrum')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={[0, 10, -5.95, 0.45]} aspect={0.62} minHeight={280} maxHeight={420} grid={false} axes={false} onPointerDown={onDown} label={`Energy levels of hydrogen, transition between n = ${hi} and n = ${lo}`}>
        <Segment x1={0.2} y1={0} x2={9.8} y2={0} color="var(--plot-text)" dash="4 4" width={1} />
        <Label x={9.8} y={0} anchor="end" dy={-5} size={11}>
          n = ∞, 0 eV
        </Label>
        {levels.map((n) => (
          <g key={n} style={{ cursor: 'pointer' }}>
            <Segment x1={0.2} y1={Y(n)} x2={9.8} y2={Y(n)} color={n === lo || n === hi ? 'var(--plot-axis)' : 'var(--plot-grid)'} width={n === lo || n === hi ? 2 : 1.5} />
            {n <= 4 && (
              <>
                <Label x={0.2} y={Y(n)} dy={-5} size={11} weight={n === lo || n === hi ? 600 : undefined}>
                  {`n = ${n}`}
                </Label>
                <Label x={9.8} y={Y(n)} dy={-5} anchor="end" size={11}>
                  {`${fmt(levelEV(n), 3)} eV`}
                </Label>
              </>
            )}
          </g>
        ))}
        {/* broken-axis marks between n = 2 and n = 1 */}
        {[0.12, 9.88].map((x) => (
          <g key={x}>
            <Segment x1={x - 0.12} y1={BREAK - 0.12} x2={x + 0.12} y2={BREAK + 0.02} color="var(--plot-text)" width={1.25} />
            <Segment x1={x - 0.12} y1={BREAK - 0.27} x2={x + 0.12} y2={BREAK - 0.13} color="var(--plot-text)" width={1.25} />
          </g>
        ))}
        <Label x={0.35} y={BREAK - 0.2} dy={4} size={10} color="var(--plot-text)">
          axis broken
        </Label>
        {ups.map((n) => {
          const sel = n === hi;
          const [y1, y2] = mode === 'emission' ? [Y(n), Y(lo)] : [Y(lo), Y(n)];
          const c = wavelengthCss(lambdaNm(lo, n)) ?? 'var(--plot-1)';
          return <Arrow key={n} x1={ax(n)} y1={y1} x2={ax(n)} y2={y2} color={c} width={sel ? 3.5 : 1.5} head={sel ? 11 : 7} opacity={sel ? 1 : 0.45} />;
        })}
        <Label x={ax(hi)} y={(Y(lo) + Y(hi)) / 2} dx={8} size={12} weight={600}>
          {`${fmt(nm, 4)} nm`}
        </Label>
      </Plot>
      <Strip lo={lo} hi={hi} maxN={maxN} />
      <Controls>
        <Segmented
          label="Lower level (series)"
          options={[1, 2, 3, 4].map((n) => ({ value: String(n), label: `n=${n} ${SERIES[n]}` }))}
          value={String(lo)}
          onChange={(v) => {
            const n = +v;
            setLo(n);
            if (hi <= n) setHi(n + 1);
          }}
        />
        <div>
          <div className="mb-1 text-[13px] text-ink-2">Upper level (or click a level in the diagram)</div>
          <div className="flex flex-wrap gap-1.5">
            <Button onClick={() => setHi(Math.max(lo + 1, hi - 1))} disabled={hi <= lo + 1}>
              n − 1
            </Button>
            <span className="self-center px-1 font-mono text-sm">n = {hi}</span>
            <Button onClick={() => setHi(Math.min(maxN, hi + 1))} disabled={hi >= maxN}>
              n + 1
            </Button>
          </div>
        </div>
        <Segmented
          label="Process"
          options={[
            { value: 'emission', label: 'Emission (photon out)' },
            { value: 'absorption', label: 'Absorption (photon in)' },
          ]}
          value={mode}
          onChange={setMode}
        />
      </Controls>
      <Controls cols={3}>
        <Readout label="Transition" value={mode === 'emission' ? `n = ${hi} → ${lo}` : `n = ${lo} → ${hi}`} />
        <Readout label="Photon energy" value={`${sciText(dE)} J = ${fmt(dE / EV, 3)} eV`} />
        <Readout label="Per mole of photons" value={`${fmt((dE * NA) / 1000, 3)} kJ/mol`} />
        <Readout label="Wavelength" value={`${fmt(nm, 4)} nm`} />
        <Readout label="Frequency" value={`${sciText(nu)} Hz`} />
        <Readout
          label="Region"
          value={
            <span className="inline-flex items-center gap-2">
              {colour && <span className="inline-block h-3 w-6 rounded" style={{ background: colour }} />}
              {regionOf(nm)}
            </span>
          }
        />
      </Controls>
      <div className="overflow-x-auto text-sm">
        <Tex display>{rydberg}</Tex>
      </div>
    </Frame>
  );
}
