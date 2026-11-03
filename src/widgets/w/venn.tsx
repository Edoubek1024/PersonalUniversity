/**
 * venn: Venn diagrams for two or three sets.
 *  - "shade": type a set expression (A ∪ B, (A ∩ B)ᶜ, A \ (B ∪ C), ...) and its region is shaded,
 *    with the membership table beside it; an optional second expression is drawn alongside and
 *    the regions where the two differ are named, so identities can be checked.
 *  - "count": each region holds a count the learner can edit; the sizes of the sets and their
 *    intersections, and the union by inclusion-exclusion, are computed from them.
 *
 * Params:
 *   mode     "shade" | "count"                                    default "shade"
 *   modes    string[]  modes offered as tabs                      default [mode]
 *   sets     2 | 3     number of sets                             default 3
 *   labels   string[]  what each set means, e.g. ["even", "multiple of 3"]   default none
 *   f        string    expression (shade mode)                    default "(A ∪ B)ᶜ"
 *   g        string    second expression to compare (shade mode)  default none
 *   counts   number[]  region counts, index = bitmask (bit 0 = A, bit 1 = B, bit 2 = C; 0 is
 *                      outside every set)       default the multiples of 2, 3, 5 up to 100
 *   title    string                                               default "Venn diagram"
 *   caption  string
 */
import { useId, useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, oneOf, str, strArray } from '../kit/params';
import { Frame, Note, Segmented, Toggle } from '../kit/controls';
import { evaluate } from '../kit/discrete-logic';
import { tryParseSetExpr } from '../kit/discrete-sets';

const NAMES = ['A', 'B', 'C'];
const COL = ['var(--plot-1)', 'var(--plot-2)', 'var(--plot-3)'];
const GEO: Record<2 | 3, { h: number; circles: [number, number][]; r: number; label: [number, number][]; regions: Record<number, [number, number]> }> = {
  2: { h: 250, r: 88, circles: [[150, 128], [250, 128]], label: [[92, 42], [308, 42]], regions: { 0: [36, 232], 1: [108, 128], 2: [292, 128], 3: [200, 128] } },
  3: { h: 290, r: 80, circles: [[160, 112], [240, 112], [200, 182]], label: [[86, 46], [314, 46], [200, 278]], regions: { 0: [36, 30], 1: [125, 88], 2: [275, 88], 4: [200, 236], 3: [200, 80], 5: [150, 170], 6: [250, 170], 7: [200, 137] } },
};
const DEFAULT_COUNTS = [26, 27, 14, 13, 7, 7, 3, 3];
const INSERT = ['∪', '∩', '\\', 'ᶜ', 'Δ', '(', ')'];

export default function Venn({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', ['shade', 'count'] as const, 'shade');
  const modes = strArray(params, 'modes', [mode0]) as ('shade' | 'count')[];
  for (const m of modes) if (m !== 'shade' && m !== 'count') throw new Error('parameter "modes" may contain only shade and count');
  const k = num(params, 'sets', 3);
  if (k !== 2 && k !== 3) throw new Error('parameter "sets" should be 2 or 3');
  const labels = strArray(params, 'labels', []);
  if (labels.length && labels.length !== k) throw new Error(`parameter "labels" should have ${k} entries`);
  const counts0 = numArray(params, 'counts', k === 3 ? DEFAULT_COUNTS : [10, 6, 4, 3]);
  if (counts0.length !== 1 << k || counts0.some((c) => c < 0 || !Number.isInteger(c))) throw new Error(`parameter "counts" should be ${1 << k} non-negative whole numbers (one per region)`);
  const [mode, setMode] = useState(mode0);
  const [f, setF] = useState(() => str(params, 'f', '(A ∪ B)ᶜ'));
  const [g, setG] = useState(() => str(params, 'g', ''));
  const [compare, setCompare] = useState(() => typeof params.g === 'string');
  const [counts, setCounts] = useState(counts0);
  const names = NAMES.slice(0, k);

  return (
    <Frame title={str(params, 'title', 'Venn diagram')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && (
        <Segmented
          options={modes.map((m) => ({ value: m, label: m === 'shade' ? 'Shade an expression' : 'Count by regions' }))}
          value={mode}
          onChange={setMode}
        />
      )}
      {labels.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-2">
          {labels.map((l, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COL[i] }} />
              {names[i]}: {l}
            </span>
          ))}
        </div>
      )}
      {mode === 'shade' ? <Shade k={k} names={names} f={f} setF={setF} g={g} setG={setG} compare={compare} setCompare={setCompare} /> : <Count k={k} names={names} counts={counts} setCounts={setCounts} />}
    </Frame>
  );
}

function Diagram({ k, shaded, numbers, title, differ }: { k: 2 | 3; shaded?: boolean[]; numbers?: (string | null)[]; title?: string; differ?: boolean[] }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const G = GEO[k];
  const masks = Array.from({ length: 1 << k }, (_, m) => m);
  return (
    <svg viewBox={`0 0 400 ${G.h}`} className="block h-auto w-full" role="img" aria-label={title ?? 'Venn diagram'}>
      <defs>
        {G.circles.map(([cx, cy], i) => (
          <clipPath key={i} id={`${id}c${i}`}>
            <circle cx={cx} cy={cy} r={G.r} />
          </clipPath>
        ))}
        {G.circles.map(([cx, cy], i) => (
          // Outside circle i: the whole box with the disc cut out (even-odd rule).
          <clipPath key={i} id={`${id}o${i}`}>
            <path d={`M0,0H400V${G.h}H0Z M${cx - G.r},${cy} a${G.r},${G.r} 0 1,0 ${2 * G.r},0 a${G.r},${G.r} 0 1,0 ${-2 * G.r},0Z`} clipRule="evenodd" />
          </clipPath>
        ))}
      </defs>
      <rect x="6" y="6" width="388" height={G.h - 12} rx="10" fill="var(--color-surface)" stroke="var(--plot-axis)" strokeWidth="1.25" />
      {masks.map((m) => {
        if (!shaded?.[m]) return null;
        let el = <rect x="7" y="7" width="386" height={G.h - 14} rx="9" fill="var(--color-accent)" fillOpacity={0.45} />;
        // A region is an intersection of discs and disc complements: nested clip paths.
        for (let i = 0; i < k; i++) el = <g clipPath={`url(#${id}${(m >> i) & 1 ? 'c' : 'o'}${i})`}>{el}</g>;
        return <g key={m}>{el}</g>;
      })}
      {differ &&
        masks.map((m) =>
          differ[m] ? (
            <text key={`d${m}`} x={G.regions[m][0]} y={G.regions[m][1] + 20} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--plot-2)">
              ≠
            </text>
          ) : null,
        )}
      {G.circles.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={G.r} fill="none" stroke={COL[i]} strokeWidth="2.25" />
      ))}
      {G.label.map(([x, y], i) => (
        <text key={i} x={x} y={y} textAnchor="middle" fontSize="17" fontWeight="700" fill={COL[i]}>
          {NAMES[i]}
        </text>
      ))}
      <text x="384" y={G.h - 14} textAnchor="end" fontSize="13" fill="var(--plot-text)" fontStyle="italic">
        U
      </text>
      {numbers &&
        masks.map((m) =>
          numbers[m] !== null ? (
            <text key={`n${m}`} x={G.regions[m][0]} y={G.regions[m][1] + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--color-ink)" style={{ paintOrder: 'stroke', stroke: 'var(--color-surface)', strokeWidth: 3 }}>
              {numbers[m]}
            </text>
          ) : null,
        )}
      {title && (
        <text x="16" y={G.h - 14} fontSize="13" fill="var(--color-ink-2)" fontFamily="ui-monospace, monospace">
          {title}
        </text>
      )}
    </svg>
  );
}

function regionName(m: number, names: string[]): string {
  const ins = names.filter((_, i) => (m >> i) & 1);
  const outs = names.filter((_, i) => !((m >> i) & 1));
  if (!ins.length) return `outside ${names.join(', ')}`;
  return `in ${ins.join(', ')}${outs.length ? `, not ${outs.join(', ')}` : ''}`;
}

function Shade({ k, names, f, setF, g, setG, compare, setCompare }: { k: 2 | 3; names: string[]; f: string; setF: (v: string) => void; g: string; setG: (v: string) => void; compare: boolean; setCompare: (v: boolean) => void }) {
  const pf = useMemo(() => tryParseSetExpr(f, names), [f, names.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const pg = useMemo(() => (compare ? tryParseSetExpr(g || 'A', names) : null), [g, compare, names.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const regions = Array.from({ length: 1 << k }, (_, m) => m);
  const env = (m: number) => Object.fromEntries(names.map((nm, i) => [nm, !!((m >> i) & 1)]));
  const sf = pf.f ? regions.map((m) => evaluate(pf.f!, env(m))) : null;
  const sg = pg?.f ? regions.map((m) => evaluate(pg.f!, env(m))) : null;
  const differ = sf && sg ? regions.map((m) => sf[m] !== sg[m]) : null;
  const [last, setLast] = useState<'f' | 'g'>('f');
  const insert = (s: string) => (last === 'g' && compare ? setG(g + s) : setF(f + s));
  // Rows ordered like a membership table: A changes slowest, "in" first.
  const rows = [...regions].sort((a, b) => {
    for (let i = 0; i < k; i++) {
      const d = ((b >> i) & 1) - ((a >> i) & 1);
      if (d) return d;
    }
    return 0;
  });
  const field = (label: string, v: string, set: (x: string) => void, err: string | undefined, which: 'f' | 'g') => (
    <label className="block min-w-0">
      <span className="mb-1 block text-[13px] text-ink-2">{label}</span>
      <input className="input font-mono text-[13px]" value={v} onChange={(e) => set(e.target.value)} onFocus={() => setLast(which)} spellCheck={false} autoComplete="off" aria-invalid={!!err} />
      {err && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{err}</span>}
    </label>
  );
  return (
    <div className="space-y-3">
      <div className={`grid gap-3 ${compare ? 'sm:grid-cols-2' : ''}`}>
        {field('Set expression', f, setF, pf.error, 'f')}
        {compare && field('Compare with', g, setG, pg?.error, 'g')}
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {INSERT.map((s) => (
          <button key={s} type="button" onClick={() => insert(s)} className="min-w-8 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-sm text-ink hover:bg-surface" title={`Append ${s}`}>
            {s}
          </button>
        ))}
        <span className="ml-1 text-xs text-ink-3">or type | &amp; - ' ^</span>
        <span className="ml-auto">
          <Toggle label="Compare two expressions" checked={compare} onChange={setCompare} />
        </span>
      </div>
      <div className={`grid gap-3 ${compare ? 'sm:grid-cols-2' : 'md:grid-cols-[3fr_2fr]'}`}>
        <Diagram k={k} shaded={sf ?? undefined} title={pf.f ? f.trim() : undefined} />
        {compare ? (
          <Diagram k={k} shaded={sg ?? undefined} title={pg?.f ? g.trim() : undefined} differ={differ ?? undefined} />
        ) : (
          sf && (
            <div className="overflow-x-auto self-start rounded-lg border border-line">
              <table className="my-0 w-full border-collapse font-mono text-[13px]">
                <thead className="bg-surface-2 text-ink-2">
                  <tr>
                    {names.map((nm) => (
                      <th key={nm} className="border-b border-line px-2 py-1 font-semibold">
                        {nm}
                      </th>
                    ))}
                    <th className="whitespace-nowrap border-b border-l border-line px-2 py-1 font-semibold">{f.trim()}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((m) => (
                    <tr key={m} className={sf[m] ? 'bg-accent/10' : ''}>
                      {names.map((nm, i) => (
                        <td key={nm} className="px-2 py-0.5 text-center text-ink-2">
                          {(m >> i) & 1 ? 1 : 0}
                        </td>
                      ))}
                      <td className="border-l border-line px-2 py-0.5 text-center font-semibold" style={{ color: sf[m] ? 'var(--plot-3)' : 'var(--color-ink-3)' }}>
                        {sf[m] ? 1 : 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-2 py-1 text-[11px] text-ink-3">membership table: 1 = in, 0 = out</div>
            </div>
          )
        )}
      </div>
      {differ && (differ.some(Boolean) ? (
        <Note tone="warn">
          Not the same set: they differ on the region{differ.filter(Boolean).length > 1 ? 's' : ''} {regions.filter((m) => differ[m]).map((m) => regionName(m, names)).join('; ')}.
        </Note>
      ) : (
        <Note tone="good">The same set: the two expressions shade exactly the same regions, so the identity holds.</Note>
      ))}
    </div>
  );
}

function Count({ k, names, counts, setCounts }: { k: 2 | 3; names: string[]; counts: number[]; setCounts: (c: number[]) => void }) {
  const regions = Array.from({ length: 1 << k }, (_, m) => m);
  const size = (mask: number) => regions.filter((m) => m && (m & mask) === mask).reduce((s, m) => s + counts[m], 0);
  const total = counts.reduce((a, b) => a + b, 0);
  const union = total - counts[0];
  const subsets = regions.filter((m) => m > 0).sort((a, b) => popcount(a) - popcount(b) || a - b);
  const term = (mask: number) => `|${names.filter((_, i) => (mask >> i) & 1).join(' ∩ ')}|`;
  const signed = subsets.map((s) => ({ s, sign: popcount(s) % 2 ? 1 : -1, v: size(s) }));
  const ie = signed.reduce((acc, t) => acc + t.sign * t.v, 0);
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[3fr_2fr]">
        <Diagram k={k} numbers={counts.map(String)} />
        <div className="space-y-1.5">
          <div className="text-[13px] text-ink-2">Elements in each region (edit to change):</div>
          {regions.map((m) => (
            <label key={m} className="flex items-center justify-between gap-2 text-[13px]">
              <span className="text-ink-2">{regionName(m, names)}</span>
              <input
                type="number"
                min={0}
                step={1}
                className="input w-20 py-0.5 text-right font-mono text-[13px]"
                value={counts[m]}
                onChange={(e) => {
                  const v = Math.max(0, Math.floor(Number(e.target.value) || 0));
                  setCounts(counts.map((c, i) => (i === m ? v : c)));
                }}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-1 rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-[13px]">
        {subsets.map((s) => (
          <div key={s}>
            {term(s)} = {size(s)}
          </div>
        ))}
        <div className="border-t border-line pt-1">
          |{names.join(' ∪ ')}| = {signed.map((t, i) => `${i === 0 ? '' : t.sign > 0 ? ' + ' : ' − '}${t.v}`).join('')} = {ie}
        </div>
        <div className="text-ink-2">
          Adding the regions directly: {union} {ie === union ? '✓' : '✗'}. In none of the sets: {total} − {union} = {counts[0]}.
        </div>
      </div>
    </div>
  );
}

function popcount(x: number) {
  let c = 0;
  for (; x; x >>= 1) c += x & 1;
  return c;
}
