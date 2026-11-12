/**
 * periodic-trends: the first five periods of the periodic table (H to Xe) coloured by atomic
 * radius, first ionisation energy or electronegativity, with the same property plotted against
 * atomic number underneath. Click (or tab to) an element to read all three values.
 *
 * Data (see src/widgets/kit/chem-data.ts): covalent radii from Cordero et al. (2008); first
 * ionisation energies from the CRC Handbook (NIST data); Pauling electronegativities from the
 * CRC Handbook. Noble gases He, Ne and Ar have no Pauling value and are shown grey for it.
 *
 * Params:
 *   property   "radius" | "ie" | "en"   property to colour by            default "radius"
 *   select     string                  symbol of the element selected first   default "Na"
 *   highlight  string[]                symbols to outline (e.g. a period or group being discussed)   default []
 *   plot       boolean                 show the property-against-Z plot   default true
 *   title      string                                                    default "Periodic trends"
 *   caption    string                  what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, oneOf, str, strArray } from '../kit/params';
import { Plot, Poly, Dot, Label } from '../kit/Plot';
import { Controls, Frame, Readout, Segmented } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { ELEMENTS, BY_SYMBOL, type Element } from '../kit/chem-data';

type Prop = 'radius' | 'ie' | 'en';
const META: Record<Prop, { label: string; unit: string; get: (e: Element) => number | null; source: string }> = {
  radius: { label: 'Covalent radius', unit: 'pm', get: (e) => e.rcov, source: 'Cordero et al. 2008' },
  ie: { label: 'First ionisation energy', unit: 'kJ/mol', get: (e) => e.ie1, source: 'CRC Handbook (NIST data)' },
  en: { label: 'Electronegativity (Pauling)', unit: '', get: (e) => e.en, source: 'CRC Handbook' },
};

export default function PeriodicTrends({ params }: WidgetProps) {
  const [prop, setProp] = useState<Prop>(oneOf(params, 'property', ['radius', 'ie', 'en'] as const, 'radius'));
  const sel0 = str(params, 'select', 'Na');
  if (!BY_SYMBOL[sel0]) throw new Error(`parameter "select" should be an element symbol from H to Xe, got "${sel0}"`);
  const hl = new Set(strArray(params, 'highlight', []));
  for (const s of hl) if (!BY_SYMBOL[s]) throw new Error(`parameter "highlight" has unknown symbol "${s}"`);
  const showPlot = bool(params, 'plot', true);
  const [sel, setSel] = useState(sel0);
  const [ref, { width }] = useElementSize<HTMLDivElement>();
  const W = width || 640;
  const cell = Math.min(40, Math.floor((W - 4) / 18));
  const gap = cell >= 30 ? 2 : 1;
  const H = cell * 5 + 4;
  const m = META[prop];
  const vals = ELEMENTS.map(m.get).filter((v): v is number => v !== null);
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const e = BY_SYMBOL[sel];
  const pts = useMemo(() => ELEMENTS.filter((x) => m.get(x) !== null).map((x) => [x.z, m.get(x)!] as [number, number]), [prop]); // eslint-disable-line react-hooks/exhaustive-deps

  const fill = (v: number | null) => (v === null ? 'var(--color-surface-2)' : `color-mix(in oklab, var(--plot-1) ${Math.round(8 + 87 * ((v - lo) / (hi - lo)))}%, var(--color-surface))`);
  const textOn = (v: number | null) => (v !== null && (v - lo) / (hi - lo) > 0.55 ? 'var(--color-surface)' : 'var(--color-ink)');

  return (
    <Frame title={str(params, 'title', 'Periodic trends')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Segmented
        label="Colour by"
        options={[
          { value: 'radius', label: 'Atomic radius' },
          { value: 'ie', label: 'Ionisation energy' },
          { value: 'en', label: 'Electronegativity' },
        ]}
        value={prop}
        onChange={(v) => setProp(v as Prop)}
      />
      <div ref={ref} className="w-full">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="group" aria-label={`Periodic table H to Xe coloured by ${m.label}`} className="block">
          {ELEMENTS.map((x) => {
            const cx = 2 + (x.group - 1) * cell;
            const cy = 2 + (x.period - 1) * cell;
            const v = m.get(x);
            const isSel = x.sym === sel;
            return (
              <g
                key={x.z}
                role="button"
                tabIndex={0}
                aria-label={`${x.name}: ${v === null ? 'no value' : `${fmt(v, 4)} ${m.unit}`}`}
                aria-pressed={isSel}
                onClick={() => setSel(x.sym)}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    setSel(x.sym);
                  }
                }}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <rect x={cx + gap / 2} y={cy + gap / 2} width={cell - gap} height={cell - gap} rx={cell > 24 ? 3 : 1.5} fill={fill(v)} stroke={isSel ? 'var(--plot-2)' : hl.has(x.sym) ? 'var(--plot-4)' : 'none'} strokeWidth={isSel || hl.has(x.sym) ? 2.5 : 0} />
                <text x={cx + cell / 2} y={cy + cell / 2 + (cell > 30 ? -1 : 3)} textAnchor="middle" fontSize={Math.max(8, Math.min(13, cell * 0.42))} fontWeight={600} fill={textOn(v)}>
                  {x.sym}
                </text>
                {cell > 30 && (
                  <text x={cx + cell / 2} y={cy + cell - 5} textAnchor="middle" fontSize={8.5} fill={textOn(v)} opacity={0.85}>
                    {v === null ? '—' : prop === 'en' ? v.toFixed(2) : Math.round(v)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex items-center gap-2 text-xs text-ink-2">
        <span>{fmt(lo, 3)}</span>
        <span className="h-2.5 flex-1 rounded" style={{ background: `linear-gradient(to right, ${fill(lo)}, ${fill((lo + hi) / 2)}, ${fill(hi)})` }} />
        <span>
          {fmt(hi, 4)} {m.unit}
        </span>
      </div>
      <Controls cols={3}>
        <Readout label={`${e.name} (Z = ${e.z}), period ${e.period}, group ${e.group}`} value={`radius ${e.rcov} pm`} />
        <Readout label="First ionisation energy" value={`${fmt(e.ie1, 4)} kJ/mol`} />
        <Readout label="Electronegativity" value={e.en === null ? 'none defined' : e.en.toFixed(2)} />
      </Controls>
      {showPlot && (
        <Plot view={[0, 55, prop === 'en' ? 0 : 0, hi * 1.08]} aspect={0.42} minHeight={180} maxHeight={260} xLabel="Z" yLabel={m.unit || 'EN'} label={`${m.label} against atomic number`}>
          <Poly points={pts} color="var(--plot-1)" width={1.75} />
          {pts.map(([z, v]) => (
            <Dot key={z} x={z} y={v} r={2.5} color={ELEMENTS[z - 1].group === 1 ? 'var(--plot-4)' : ELEMENTS[z - 1].group === 18 ? 'var(--plot-3)' : 'var(--plot-1)'} />
          ))}
          {m.get(e) !== null && (
            <>
              <Dot x={e.z} y={m.get(e)!} r={6} color="var(--plot-2)" />
              <Label x={e.z} y={m.get(e)!} dy={-10} anchor={e.z > 45 ? 'end' : 'start'} weight={600}>
                {e.sym}
              </Label>
            </>
          )}
        </Plot>
      )}
      {showPlot && <div className="text-xs text-ink-3">In the plot, group 1 metals are amber and noble gases green. Source: {m.source}.</div>}
    </Frame>
  );
}
