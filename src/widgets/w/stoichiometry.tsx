/**
 * stoichiometry: limiting reagent and yield for a balanced reaction. Set the starting amount of
 * each reactant (grams or moles); the widget converts to moles with molar masses computed from
 * the formulas, divides by the coefficients to find the limiting reagent (the smallest n/ν), and
 * shows the amount of every species before and after the reaction as bars and as a mole table
 * (initial, change, final). Optionally an actual yield gives the percent yield.
 *
 * Molar masses come from IUPAC standard atomic weights (src/widgets/kit/chem-data.ts).
 *
 * Params:
 *   reaction  string     a preset: "ammonia", "water", "methane", "propane", "rust",
 *                        "aluminium-chloride", "lead-iodide", "thermite"           default "ammonia"
 *   equation  string     instead of a preset, a balanced equation such as
 *                        "2 H2 + O2 -> 2 H2O" (formulas may use brackets: "Ca(OH)2")   default none
 *   amounts   number[]   starting amount of each reactant, in `unit`               default 10 for each (grams) or 1 (moles)
 *   unit      "g" | "mol"                                                         default "g"
 *   choose    boolean    let the learner switch between presets                    default true when no equation is given
 *   yield     boolean    show an actual-yield slider and the percent yield         default false
 *   title     string                                                               default "Limiting reagent"
 *   caption   string     what to try
 */
import { useMemo, useState, useId } from 'react';
import type { WidgetProps } from '../types';
import { bool, numArray, oneOf, str } from '../kit/params';
import { Controls, Frame, Note, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { molarMass, parseFormula, prettyFormula } from '../kit/chem-data';

const PRESETS: Record<string, { label: string; eq: string }> = {
  ammonia: { label: 'Ammonia synthesis', eq: 'N2 + 3 H2 -> 2 NH3' },
  water: { label: 'Burning hydrogen', eq: '2 H2 + O2 -> 2 H2O' },
  methane: { label: 'Burning methane', eq: 'CH4 + 2 O2 -> CO2 + 2 H2O' },
  propane: { label: 'Burning propane', eq: 'C3H8 + 5 O2 -> 3 CO2 + 4 H2O' },
  rust: { label: 'Rusting iron', eq: '4 Fe + 3 O2 -> 2 Fe2O3' },
  'aluminium-chloride': { label: 'Aluminium and chlorine', eq: '2 Al + 3 Cl2 -> 2 AlCl3' },
  'lead-iodide': { label: 'Lead iodide precipitate', eq: 'Pb(NO3)2 + 2 KI -> PbI2 + 2 KNO3' },
  thermite: { label: 'Thermite', eq: '2 Al + Fe2O3 -> Al2O3 + 2 Fe' },
};

interface Species {
  formula: string;
  coef: number;
  M: number;
}

function parseEquation(eq: string): { reactants: Species[]; products: Species[] } {
  const sides = eq.split(/->|→|=/);
  if (sides.length !== 2) throw new Error(`equation "${eq}" should have one arrow (->)`);
  const side = (s: string): Species[] =>
    s.split(/\s\+\s|\s*\+\s+|\s+\+\s*/).map((term) => {
      const m = term.trim().match(/^(\d+)?\s*(\S+)$/);
      if (!m) throw new Error(`cannot read "${term.trim()}" in equation "${eq}"`);
      const coef = m[1] ? parseInt(m[1], 10) : 1;
      return { formula: m[2], coef, M: molarMass(m[2]) };
    });
  const reactants = side(sides[0]);
  const products = side(sides[1]);
  // check the balance, element by element
  const count = (list: Species[]) => {
    const out: Record<string, number> = {};
    for (const sp of list) for (const [el, k] of Object.entries(parseFormula(sp.formula))) out[el] = (out[el] ?? 0) + k * sp.coef;
    return out;
  };
  const a = count(reactants);
  const b = count(products);
  for (const el of new Set([...Object.keys(a), ...Object.keys(b)]))
    if ((a[el] ?? 0) !== (b[el] ?? 0)) throw new Error(`equation "${eq}" is not balanced: ${el} has ${a[el] ?? 0} on the left and ${b[el] ?? 0} on the right`);
  return { reactants, products };
}

const texFormula = (f: string) => `\\mathrm{${f.replace(/(\d+)/g, '_{$1}')}}`;
const texEq = (r: Species[], p: Species[]) =>
  [r, p].map((side) => side.map((s) => `${s.coef > 1 ? s.coef + '\\,' : ''}${texFormula(s.formula)}`).join(' + ')).join(' \\rightarrow ');

function Bars({ rows }: { rows: { name: string; before: number; after: number; color: string }[] }) {
  const [ref, { width }] = useElementSize<HTMLDivElement>();
  const W = width || 600;
  const left = 74;
  const rowH = 30;
  const H = rows.length * rowH + 22;
  const max = Math.max(1e-9, ...rows.flatMap((r) => [r.before, r.after]));
  // leave room on the right for the "before → after" label
  const sx = (v: number) => (v / max) * Math.max(40, W - left - 120);
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Moles of each species before and after the reaction" className="block rounded-lg bg-surface">
        {rows.map((r, i) => {
          const y = 6 + i * rowH;
          return (
            <g key={r.name} fontSize={12}>
              <text x={left - 8} y={y + 15} textAnchor="end" fill="var(--color-ink)" fontWeight={600}>
                {r.name}
              </text>
              <rect x={left} y={y + 2} width={Math.max(0, sx(r.before))} height={9} fill={r.color} opacity={0.3} rx={2} />
              <rect x={left} y={y + 13} width={Math.max(0, sx(r.after))} height={11} fill={r.color} rx={2} />
              <text x={left + Math.max(sx(r.before), sx(r.after)) + 6} y={y + 20} fill="var(--plot-text)" fontSize={11}>
                {fmt(r.before, 3)} → {fmt(r.after, 3)} mol
              </text>
            </g>
          );
        })}
        <g fontSize={11} fill="var(--plot-text)">
          <rect x={left} y={H - 13} width={14} height={7} fill="var(--plot-text)" opacity={0.3} />
          <text x={left + 18} y={H - 6}>
            before
          </text>
          <rect x={left + 70} y={H - 14} width={14} height={9} fill="var(--plot-text)" />
          <text x={left + 88} y={H - 6}>
            after
          </text>
        </g>
      </svg>
    </div>
  );
}

const COLORS = ['var(--plot-1)', 'var(--plot-4)', 'var(--plot-3)', 'var(--plot-5)', 'var(--plot-6)', 'var(--plot-2)'];

export default function Stoichiometry({ params }: WidgetProps) {
  const given = typeof params.equation === 'string' ? str(params, 'equation', '') : null;
  const preset0 = oneOf(params, 'reaction', Object.keys(PRESETS) as string[], 'ammonia');
  const choose = bool(params, 'choose', given === null);
  const [preset, setPreset] = useState(preset0);
  const eqText = given ?? PRESETS[preset].eq;
  const { reactants, products } = useMemo(() => parseEquation(eqText), [eqText]);
  const [unit, setUnit] = useState(oneOf(params, 'unit', ['g', 'mol'] as const, 'g'));
  const initial = numArray(params, 'amounts', []);
  if (initial.length && initial.length !== parseEquation(given ?? PRESETS[preset0].eq).reactants.length) throw new Error('parameter "amounts" needs one number per reactant');
  if (initial.some((a) => a < 0)) throw new Error('parameter "amounts" should not be negative');
  const unit0 = oneOf(params, 'unit', ['g', 'mol'] as const, 'g');
  // amounts are stored in moles so switching units keeps the same sample
  const startMoles = (rs: Species[], useInitial: boolean) => rs.map((r, i) => (useInitial && initial.length ? (unit0 === 'g' ? initial[i] / r.M : initial[i]) : unit0 === 'g' ? 10 / r.M : 1));
  const [moles, setMoles] = useState<number[]>(() => startMoles(reactants, true));
  const [eqKey, setEqKey] = useState(eqText);
  if (eqKey !== eqText) {
    setEqKey(eqText);
    setMoles(startMoles(reactants, false));
  }
  const showYield = bool(params, 'yield', false);
  const [actualFrac, setActualFrac] = useState(0.8);
  const selId = useId();

  const ratios = reactants.map((r, i) => (moles[i] ?? 0) / r.coef);
  const xi = Math.min(...ratios);
  const lim = ratios.indexOf(xi);
  const tie = ratios.filter((q) => Math.abs(q - xi) < 1e-9 * Math.max(1, xi)).length > 1;
  const species = [...reactants.map((s, i) => ({ ...s, n0: moles[i] ?? 0, sign: -1 })), ...products.map((s) => ({ ...s, n0: 0, sign: 1 }))];
  const prod = products[0];
  const theo = xi * prod.coef * prod.M;
  const masses = reactants.map((r, i) => (moles[i] ?? 0) * r.M);
  const smallestMass = masses.indexOf(Math.min(...masses));

  const sliderMax = (r: Species) => (unit === 'g' ? Math.max(20, Math.ceil((r.M * 3) / 10) * 10) : 5);

  return (
    <Frame title={str(params, 'title', 'Limiting reagent')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {choose && (
        <div>
          <label htmlFor={selId} className="mb-1 block text-[13px] text-ink-2">
            Reaction
          </label>
          <select id={selId} value={preset} onChange={(e) => setPreset(e.target.value)} className="input max-w-full text-[13px]">
            {Object.entries(PRESETS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}: {prettyFormula(v.eq.replace('->', '→'))}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="overflow-x-auto text-center text-[15px]">
        <Tex>{texEq(reactants, products)}</Tex>
      </div>
      <Controls>
        <Segmented
          label="Amounts in"
          options={[
            { value: 'g', label: 'grams' },
            { value: 'mol', label: 'moles' },
          ]}
          value={unit}
          onChange={setUnit}
        />
        {reactants.map((r, i) => (
          <Slider
            key={r.formula}
            label={`${prettyFormula(r.formula)} (M = ${fmt(r.M, 4)} g/mol)`}
            value={unit === 'g' ? Math.min(sliderMax(r), (moles[i] ?? 0) * r.M) : Math.min(5, moles[i] ?? 0)}
            min={0}
            max={sliderMax(r)}
            step={unit === 'g' ? 0.5 : 0.01}
            format={(v) => (unit === 'g' ? `${fmt(v, 4)} g = ${fmt(v / r.M, 3)} mol` : `${fmt(v, 3)} mol = ${fmt(v * r.M, 4)} g`)}
            onChange={(v) => setMoles((m) => m.map((x, j) => (j === i ? (unit === 'g' ? v / r.M : v) : x)))}
          />
        ))}
      </Controls>
      <Bars rows={species.map((s, i) => ({ name: prettyFormula(s.formula), before: s.n0, after: s.n0 + s.sign * s.coef * xi, color: COLORS[i % COLORS.length] }))} />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[440px] text-right text-[13px] tabular-nums">
          <thead className="text-ink-3">
            <tr>
              <th className="py-1 text-left font-medium">Species</th>
              <th className="font-medium">ν</th>
              <th className="font-medium">initial (mol)</th>
              <th className="font-medium">n / ν</th>
              <th className="font-medium">change (mol)</th>
              <th className="font-medium">final (mol)</th>
              <th className="font-medium">final (g)</th>
            </tr>
          </thead>
          <tbody>
            {species.map((s, i) => {
              const fin = s.n0 + s.sign * s.coef * xi;
              const isLim = s.sign < 0 && i === lim;
              return (
                <tr key={s.formula} className={`border-t border-line ${isLim ? 'font-semibold text-[var(--plot-2)]' : ''}`}>
                  <td className="py-1 text-left">{prettyFormula(s.formula)}</td>
                  <td>{s.coef}</td>
                  <td>{fmt(s.n0, 3)}</td>
                  <td>{s.sign < 0 ? fmt(s.n0 / s.coef, 3) : ''}</td>
                  <td>
                    {s.sign < 0 ? '−' : '+'}
                    {fmt(s.coef * xi, 3)}
                  </td>
                  <td>{fmt(Math.abs(fin) < 1e-12 ? 0 : fin, 3)}</td>
                  <td>{fmt(Math.abs(fin) < 1e-12 ? 0 : fin * s.M, 4)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Controls cols={3}>
        <Readout label="Limiting reagent" value={xi <= 0 ? 'none (a reactant is missing)' : tie ? 'none: exact stoichiometric ratio' : prettyFormula(reactants[lim].formula)} tone="var(--plot-2)" />
        <Readout label="Reaction extent ξ = smallest n/ν" value={`${fmt(xi, 4)} mol`} />
        <Readout label={`Theoretical yield of ${prettyFormula(prod.formula)}`} value={`${fmt(theo, 4)} g (${fmt(xi * prod.coef, 4)} mol)`} />
      </Controls>
      {showYield && theo > 0 && (
        <Controls>
          <Slider label={`Actual yield of ${prettyFormula(prod.formula)} (g)`} value={actualFrac * theo} min={0} max={theo} step={theo / 200} format={(v) => `${fmt(v, 4)} g`} onChange={(v) => setActualFrac(v / theo)} />
          <Readout label="Percent yield = actual / theoretical × 100" value={`${fmt(actualFrac * 100, 3)} %`} />
        </Controls>
      )}
      {xi > 0 && !tie && smallestMass !== lim && reactants.length > 1 && (
        <Note tone="warn">
          {prettyFormula(reactants[smallestMass].formula)} is the reactant with the smaller mass, but {prettyFormula(reactants[lim].formula)} is limiting. Compare moles divided by coefficients, never grams.
        </Note>
      )}
    </Frame>
  );
}
