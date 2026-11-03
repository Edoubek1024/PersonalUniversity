/**
 * sorting: step-through visualiser for comparison and non-comparison sorts, with the loop
 * invariant stated and marked, comparison and swap/move counters, and an optional race of two
 * algorithms on the same input.
 *
 * Params:
 *   algo       "insertion" | "selection" | "merge" | "merge-bu" | "quick" | "heap" | "counting" |
 *              "radix" | "quickselect"                          default "insertion"
 *   algos      string[]  algorithms offered in a selector         default [algo]
 *   values     number[]  initial input (whole numbers ≥ 0)        default depends on algo
 *   partition  "lomuto" | "hoare" | "three-way"  (quicksort)      default "lomuto"
 *   pivot      "last" | "first" | "random" | "median3"            default "last" (Lomuto),
 *                                                                 "first" (Hoare, three-way),
 *                                                                 "random" (quickselect)
 *   k          number    quickselect rank, 1 = minimum            default ⌈n/2⌉ (the median)
 *   race       boolean   show a second algorithm side by side     default false
 *   race2      string    the second algorithm in race mode        default "merge"
 *   max        number    largest value the generators produce     default 99 (20 counting, 999 radix)
 *   title      string                                             default "Sorting, step by step"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, strArray } from '../kit/params';
import { Controls, Frame, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { ALGO_LABEL, inversions, runSort, type Mk, type Partition, type PivotRule, type SortAlgo, type SortRun, type SortSnap, type Tone } from '../kit/dsa-sorts';
import { Legend, ListInput, MARK, NEUTRAL, StepControls, log2, useStepper, type MarkKind, type Preset } from '../kit/dsa-steps';

const ALGOS = ['insertion', 'selection', 'merge', 'merge-bu', 'quick', 'heap', 'counting', 'radix', 'quickselect'] as const;
const PARTS = ['lomuto', 'hoare', 'three-way'] as const;
const PIVOTS = ['last', 'first', 'random', 'median3'] as const;

const DEFAULT_VALUES: Record<SortAlgo, number[]> = {
  insertion: [5, 2, 4, 6, 1, 3],
  selection: [29, 10, 14, 37, 13, 5, 22],
  merge: [38, 27, 43, 3, 9, 82, 10],
  'merge-bu': [38, 27, 43, 3, 9, 82, 10, 50],
  quick: [2, 8, 7, 1, 3, 5, 6, 4],
  heap: [4, 10, 3, 5, 1, 8, 7],
  counting: [2, 5, 3, 0, 2, 3, 0, 3],
  radix: [170, 45, 75, 90, 802, 24, 2, 66],
  quickselect: [7, 10, 4, 3, 20, 15, 1, 12, 9],
};

const MK_KIND: Partial<Record<Mk, MarkKind>> = { compare: 'compare', swap: 'swap', pivot: 'pivot', active: 'active' };

const TONE_FILL: Record<Tone, string | null> = {
  sorted: MARK.sorted.color,
  less: 'var(--plot-1)',
  greater: 'var(--plot-5)',
  equal: MARK.pivot.color,
  unknown: null,
  heap: null,
  run: null,
};
const TONE_STROKE: Record<Tone, string> = {
  sorted: MARK.sorted.color,
  less: 'var(--plot-1)',
  greater: 'var(--plot-5)',
  equal: MARK.pivot.color,
  unknown: 'var(--plot-axis)',
  heap: 'var(--plot-axis)',
  run: 'var(--plot-axis)',
};

interface Layout {
  maxDepth: number;
  aux: { label: string; own: boolean; len: number }[];
}

function layoutOf(run: SortRun): Layout {
  let maxDepth = 0;
  const aux: Layout['aux'] = [];
  for (const s of run.snaps) {
    maxDepth = Math.max(maxDepth, s.stack.length);
    for (const r of s.aux) {
      const own = r.offset === null;
      const found = aux.find((x) => x.label === r.label);
      if (!found) aux.push({ label: r.label, own, len: r.cells.length });
      else found.len = Math.max(found.len, r.cells.length);
    }
  }
  return { maxDepth, aux };
}

function SortView({ snap, n, vmax, layout, barH, digits, label }: { snap: SortSnap; n: number; vmax: number; layout: Layout; barH: number; digits: number; label: string }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.max(200, size.width || 600);
  const pad = 4;
  const colW = (W - 2 * pad) / n;
  const font = Math.max(8, Math.min(12, colW * 0.42 * (digits > 2 ? 2.4 / digits : 1)));
  const showVals = colW >= 11;
  const top = 34;
  const base = top + barH;
  const xOf = (i: number) => pad + i * colW;

  const toneAt: (Tone | null)[] = Array(n).fill(null);
  for (const r of snap.regions) for (let k = Math.max(0, r.lo); k < Math.min(n, r.hi); k++) toneAt[k] = r.tone;

  const ptrBy = new Map<number, string[]>();
  for (const p of snap.ptr) {
    if (p.i < 0 || p.i > n) continue;
    ptrBy.set(p.i, [...(ptrBy.get(p.i) ?? []), p.label]);
  }
  const yIdx = base + 13;
  const yPtr = base + 27;
  const yReg = base + 36;
  const yStack = yReg + 22;
  const stackH = layout.maxDepth > 0 ? 12 + layout.maxDepth * 7 : 0;
  let y = yStack + stackH + 4;
  const auxY: number[] = [];
  for (const a of layout.aux) {
    auxY.push(y);
    y += 14 + 22 + (a.own ? 13 : 2) + 6;
  }
  const H = y;

  const digitSplit = (v: number) => {
    const s = digits > 0 ? String(v).padStart(digits, '0') : String(v);
    if (!snap.digit) return <>{s}</>;
    const pos = s.length - 1 - Math.round(Math.log10(snap.digit));
    return (
      <>
        {s.slice(0, pos)}
        <tspan fontWeight={800} fill="var(--color-accent)" textDecoration="underline">
          {s[pos]}
        </tspan>
        {s.slice(pos + 1)}
      </>
    );
  };

  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block select-none rounded-lg bg-surface" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {snap.a.map((v, i) => {
          const faded = snap.range && (i < snap.range[0] || i >= snap.range[1]);
          const mk = snap.mk[i];
          const x = xOf(i) + colW * 0.1;
          const w = colW * 0.8;
          const cx = xOf(i) + colW / 2;
          if (v === null) {
            return (
              <g key={i}>
                <rect x={x} y={base - 14} width={w} height={14} fill="none" stroke="var(--plot-axis)" strokeDasharray="3 2" strokeWidth={1.25} rx={2} />
                {colW >= 18 && (
                  <text x={cx} y={base - 18} textAnchor="middle" fontSize={10} fill="var(--plot-text)">
                    gap
                  </text>
                )}
              </g>
            );
          }
          const h = 4 + (Math.max(0, v) / Math.max(1, vmax)) * (barH - 4);
          const tone = toneAt[i];
          const kind = mk ? MK_KIND[mk] : undefined;
          let fill = NEUTRAL;
          let op = 0.62;
          if (kind) {
            fill = MARK[kind].color;
            op = 1;
          } else if (snap.settled[i]) {
            fill = MARK.sorted.color;
            op = 1;
          } else if (tone && TONE_FILL[tone]) {
            fill = TONE_FILL[tone]!;
            op = tone === 'sorted' ? 0.9 : 0.6;
          }
          if (mk === 'taken') op = 0.18;
          const glyph = kind ? MARK[kind].glyph : mk === 'target' ? 'k' : snap.settled[i] ? MARK.sorted.glyph : '';
          return (
            <g key={i} opacity={faded ? 0.4 : 1}>
              <rect x={x} y={base - h} width={w} height={h} rx={2} fill={fill} fillOpacity={op} stroke={kind === 'pivot' ? 'var(--color-ink)' : mk === 'target' ? 'var(--color-accent)' : 'none'} strokeWidth={kind === 'pivot' || mk === 'target' ? 1.5 : 0} strokeDasharray={kind === 'pivot' ? '3 2' : undefined} />
              {showVals && (
                <text x={cx} y={base - h - 4} textAnchor="middle" fontSize={font} fill="var(--color-ink)">
                  {digitSplit(v)}
                </text>
              )}
              {glyph && (
                <text x={cx} y={13} textAnchor="middle" fontSize={Math.min(13, Math.max(9, colW * 0.6))} fontWeight={700} fill={kind ? MARK[kind].color : mk === 'target' ? 'var(--color-accent)' : MARK.sorted.color}>
                  {glyph}
                </text>
              )}
            </g>
          );
        })}
        <line x1={pad} x2={W - pad} y1={base + 0.5} y2={base + 0.5} stroke="var(--plot-axis)" strokeWidth={1} />
        {colW >= 9 &&
          snap.a.map((_, i) =>
            colW >= 14 || i % 2 === 0 ? (
              <text key={i} x={xOf(i) + colW / 2} y={yIdx} textAnchor="middle" fontSize={Math.min(10, colW * 0.55)} fill="var(--plot-text)">
                {i}
              </text>
            ) : null,
          )}
        {[...ptrBy.entries()].map(([i, labels]) => (
          <text key={i} x={xOf(i) + colW / 2} y={yPtr} textAnchor="middle" fontSize={11} fontWeight={600} fill="var(--color-accent)">
            ↑{labels.join(',')}
          </text>
        ))}
        {snap.regions.map((r, k) => {
          if (r.hi <= r.lo) return null;
          const x0 = xOf(r.lo) + 2;
          const x1 = xOf(r.hi) - 2;
          const c = TONE_STROKE[r.tone];
          const fits = x1 - x0 > r.label.length * 6;
          return (
            <g key={k}>
              <path d={`M${x0},${yReg} v4 H${x1} v-4`} fill="none" stroke={c} strokeWidth={1.75} />
              {fits && (
                <text x={(x0 + x1) / 2} y={yReg + 16} textAnchor="middle" fontSize={10.5} fill="var(--plot-text)">
                  {r.label}
                </text>
              )}
            </g>
          );
        })}
        {layout.maxDepth > 0 && (
          <g>
            <text x={pad} y={yStack + 8} fontSize={10} fill="var(--plot-text)">
              call stack (recursion depth)
            </text>
            {snap.stack.map(([lo, hi], d) => (
              <rect key={d} x={xOf(lo) + 1} y={yStack + 12 + d * 7} width={Math.max(2, (hi - lo) * colW - 2)} height={5} rx={1.5} fill={d === snap.stack.length - 1 ? 'var(--color-accent)' : 'var(--plot-axis)'} opacity={d === snap.stack.length - 1 ? 0.9 : 0.55} />
            ))}
          </g>
        )}
        {layout.aux.map((lay, r) => {
          const row = snap.aux.find((a) => a.label === lay.label);
          const y0 = auxY[r];
          if (!row) return null;
          const own = row.offset === null;
          const cw = own ? Math.min(32, (W - 2 * pad) / Math.max(1, lay.len)) : colW;
          const x0 = own ? pad : xOf(row.offset ?? 0);
          return (
            <g key={lay.label}>
              <text x={pad} y={y0 + 10} fontSize={11} fill="var(--plot-text)">
                {row.label}
              </text>
              {row.cells.map((c, k) => {
                const mk = row.mk[k];
                const kind = mk ? MK_KIND[mk] : undefined;
                const cx = x0 + k * cw;
                return (
                  <g key={k}>
                    <rect x={cx + 1} y={y0 + 14} width={cw - 2} height={20} rx={3} fill={kind ? MARK[kind].color : 'var(--color-surface-2)'} fillOpacity={kind ? 0.85 : 1} stroke={kind ? 'var(--color-ink)' : 'var(--color-line)'} strokeWidth={kind ? 1.25 : 1} />
                    {c !== null && (
                      <text x={cx + cw / 2} y={y0 + 28} textAnchor="middle" fontSize={Math.min(12, cw * 0.45)} fill={kind ? 'var(--color-surface)' : 'var(--color-ink)'} fontWeight={kind ? 700 : 400}>
                        {c}
                      </text>
                    )}
                    {row.idx && (cw >= 12 || k % 2 === 0) && (
                      <text x={cx + cw / 2} y={y0 + 45} textAnchor="middle" fontSize={Math.min(10, cw * 0.5)} fill="var(--plot-text)">
                        {row.idx[k]}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function refLine(algo: SortAlgo, n: number, input: number[]): string {
  const nlg = Math.round(n * log2(Math.max(2, n)));
  if (algo === 'insertion') return `inversions I = ${inversions(input)}; worst n(n−1)/2 = ${(n * (n - 1)) / 2}`;
  if (algo === 'selection') return `always n(n−1)/2 = ${(n * (n - 1)) / 2}`;
  if (algo === 'counting' || algo === 'radix') return 'no comparisons at all';
  if (algo === 'quickselect') return `n log₂ n ≈ ${nlg}`;
  return `n log₂ n ≈ ${nlg}; n(n−1)/2 = ${(n * (n - 1)) / 2}`;
}

const legendFor = (algo: SortAlgo): { kind?: MarkKind; label: string; color?: string; glyph?: string; dashed?: boolean }[] => {
  const base: { kind?: MarkKind; label: string; color?: string; glyph?: string; dashed?: boolean }[] = [];
  if (algo !== 'counting' && algo !== 'radix') base.push({ kind: 'compare', label: 'compared' });
  base.push({ kind: 'swap', label: algo === 'insertion' || algo.startsWith('merge') || algo === 'counting' || algo === 'radix' ? 'moved / written' : 'swapped' });
  if (algo === 'quick' || algo === 'quickselect') base.push({ kind: 'pivot', label: 'pivot (= p in 3-way)' });
  if (algo === 'insertion' || algo === 'selection' || algo === 'heap' || algo === 'counting' || algo === 'radix') base.push({ kind: 'active', label: algo === 'selection' ? 'current minimum' : 'current' });
  if (algo === 'quickselect') base.push({ label: 'target index k−1', color: 'var(--color-accent)', glyph: 'k', dashed: true });
  if (algo === 'quick') {
    base.push({ label: '≤ p / < p region', color: 'var(--plot-1)', glyph: '' });
    base.push({ label: '> p region', color: 'var(--plot-5)', glyph: '' });
  }
  if (algo === 'insertion') base.push({ label: 'gap left by the key', color: 'var(--plot-axis)', dashed: true });
  if (algo.startsWith('merge')) base.push({ label: 'already copied to buffer', color: NEUTRAL, glyph: '' });
  base.push({ kind: 'sorted', label: algo === 'insertion' ? 'sorted prefix / final' : 'final position' });
  return base;
};

export default function Sorting({ params }: WidgetProps) {
  const algo0 = oneOf(params, 'algo', ALGOS, 'insertion');
  const offered = strArray(params, 'algos', [algo0]);
  for (const a of offered) if (!(ALGOS as readonly string[]).includes(a)) throw new Error(`parameter "algos": unknown algorithm "${a}"`);
  const values0 = numArray(params, 'values', DEFAULT_VALUES[algo0]);
  const part0 = oneOf(params, 'partition', PARTS, 'lomuto');
  const pivotParam = params.pivot === undefined ? undefined : oneOf(params, 'pivot', PIVOTS, 'last');
  const k0 = num(params, 'k', 0);
  const race0 = bool(params, 'race', false);
  const race2 = oneOf(params, 'race2', ALGOS, 'merge');
  const title = str(params, 'title', 'Sorting, step by step');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [algo, setAlgo] = useState<SortAlgo>(algo0);
  const [algoB, setAlgoB] = useState<SortAlgo>(race2);
  const [values, setValues] = useState<number[]>(values0);
  const [part, setPart] = useState<Partition>(part0);
  const [pivot, setPivot] = useState<PivotRule | undefined>(pivotParam);
  const [race, setRace] = useState(race0);
  const [k, setK] = useState(k0);
  const [seed, setSeed] = useState(1);

  const fits = (a: SortAlgo, v: number[]) => (a === 'counting' ? v.every((x) => x <= 30) : a === 'radix' ? v.every((x) => x <= 9999) : true);
  const linear = (a: SortAlgo) => a === 'counting' || a === 'radix';
  const chooseA = (a: SortAlgo) => {
    setAlgo(a);
    const untouched = values.join() === values0.join() || values.join() === DEFAULT_VALUES[algo].join();
    if (!fits(a, values) || (race && !fits(algoB, values)) || (untouched && (linear(a) || linear(algo)) && a !== algo)) setValues(DEFAULT_VALUES[a]);
  };
  const chooseB = (a: SortAlgo) => {
    setAlgoB(a);
    if (!fits(a, values)) setValues(DEFAULT_VALUES[a]);
  };
  const n = values.length;
  const usesCounting = algo === 'counting' || (race && algoB === 'counting');
  const maxDefault = usesCounting ? 20 : algo === 'radix' ? 999 : 99;
  const inputMax = Math.max(1, Math.min(usesCounting ? 30 : 9999, num(params, 'max', maxDefault)));
  const kEff = k >= 1 && k <= n ? k : Math.ceil(n / 2);
  const effPivot: PivotRule = pivot ?? (algo === 'quickselect' ? 'random' : part === 'lomuto' ? 'last' : 'first');

  const runA = useMemo(() => runSort(algo, values, { partition: part, pivot: effPivot, seed, k: kEff }), [algo, values, part, effPivot, seed, kEff]);
  const runB = useMemo(() => (race ? runSort(algoB, values, { partition: part, pivot: effPivot, seed, k: kEff }) : null), [race, algoB, values, part, effPivot, seed, kEff]);
  const layoutA = useMemo(() => layoutOf(runA), [runA]);
  const layoutB = useMemo(() => (runB ? layoutOf(runB) : null), [runB]);
  const count = Math.max(runA.snaps.length, runB?.snaps.length ?? 0);
  const st = useStepper(count, `${runA.snaps.length}|${runB?.snaps.length}|${algo}|${algoB}|${values.join()}|${part}|${effPivot}|${kEff}|${race}`);
  const sa = runA.snaps[Math.min(st.i, runA.snaps.length - 1)];
  const sb = runB ? runB.snaps[Math.min(st.i, runB.snaps.length - 1)] : null;
  const vmax = Math.max(1, ...values);
  const digitsFor = (a: SortAlgo) => (a === 'radix' ? String(Math.max(...values)).length : 0);
  const showQuickOpts = algo === 'quick' || (race && algoB === 'quick');
  const showPivot = showQuickOpts || algo === 'quickselect' || (race && algoB === 'quickselect');
  const showK = algo === 'quickselect' || (race && algoB === 'quickselect');
  const presets: Preset[] = ['random', 'nearly', 'reversed', 'dups', 'sorted'];

  const panel = (a: SortAlgo, run: SortRun, snap: SortSnap, layout: Layout, barH: number) => (
    <div className="space-y-2">
      <div className="text-[12.5px] leading-5 text-ink-2">
        <span className="font-semibold text-ink">Invariant. </span>
        {run.invariant}
      </div>
      <SortView snap={snap} n={n} vmax={vmax} layout={layout} barH={barH} digits={digitsFor(a)} label={`${ALGO_LABEL[a]} on ${n} values, step ${Math.min(st.i, run.snaps.length - 1)}`} />
      <div className="grid grid-cols-2 gap-2">
        <Readout label="Comparisons" value={snap.cmp} tone="var(--plot-4)" />
        <Readout label="Swaps / moves" value={snap.mv} tone="var(--plot-2)" />
      </div>
      <div className="text-[12px] text-ink-3">For reference (n = {n}): {refLine(a, n, values)}</div>
    </div>
  );

  const selector = (label: string, value: SortAlgo, set: (a: SortAlgo) => void, opts: readonly string[]) =>
    opts.length > 1 ? <Segmented label={label} value={value} onChange={(v) => set(v as SortAlgo)} options={opts.map((o) => ({ value: o, label: ALGO_LABEL[o as SortAlgo] }))} /> : null;

  const raceOptions = (ALGOS as readonly string[]).filter((a) => a !== 'quickselect' && (offered.includes(a) || ['insertion', 'selection', 'merge', 'quick', 'heap'].includes(a)));

  return (
    <Frame title={title} caption={caption}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {selector(race ? 'Algorithm A' : 'Algorithm', algo, chooseA, race ? raceOptions : offered)}
        {race && selector('Algorithm B', algoB, chooseB, raceOptions)}
      </div>
      {(showQuickOpts || showPivot) && (
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          {showQuickOpts && (
            <Segmented
              label="Partition scheme"
              value={part}
              onChange={setPart}
              options={[
                { value: 'lomuto', label: 'Lomuto' },
                { value: 'hoare', label: 'Hoare' },
                { value: 'three-way', label: 'Three-way' },
              ]}
            />
          )}
          {showPivot && (
            <Segmented
              label="Pivot choice"
              value={effPivot}
              onChange={(v) => setPivot(v)}
              options={[
                { value: 'last', label: 'Last' },
                { value: 'first', label: 'First' },
                { value: 'random', label: 'Random' },
                { value: 'median3', label: 'Median of 3' },
              ]}
            />
          )}
        </div>
      )}
      {race ? (
        <div className="grid gap-4 lg:grid-cols-1">
          <div>
            <div className="mb-1 text-[13px] font-semibold">
              A · {ALGO_LABEL[algo]} {st.i >= runA.snaps.length - 1 && <span className="font-normal text-ink-2">(finished at step {runA.snaps.length - 1})</span>}
            </div>
            {panel(algo, runA, sa, layoutA, 90)}
          </div>
          <div>
            <div className="mb-1 text-[13px] font-semibold">
              B · {ALGO_LABEL[algoB]} {runB && st.i >= runB.snaps.length - 1 && <span className="font-normal text-ink-2">(finished at step {runB.snaps.length - 1})</span>}
            </div>
            {runB && sb && layoutB && panel(algoB, runB, sb, layoutB, 90)}
          </div>
        </div>
      ) : (
        panel(algo, runA, sa, layoutA, 130)
      )}
      <Legend items={legendFor(algo)} />
      <StepControls
        st={st}
        desc={
          race && sb ? (
            <div className="space-y-1">
              <div>
                <span className="font-semibold">A:</span> {sa.d}
              </div>
              <div>
                <span className="font-semibold">B:</span> {sb.d}
              </div>
            </div>
          ) : (
            sa.d
          )
        }
      />
      <ListInput
        label={`Input (comma-separated whole numbers 0–${inputMax}, up to 32 of them)`}
        values={values}
        onChange={(v) => {
          setValues(v);
          setSeed((s) => s + 1);
        }}
        presets={presets}
        min={0}
        max={inputMax}
        maxLen={32}
      />
      <Controls>
        {showK && <Slider label={`k (find the k-th smallest)`} value={kEff} min={1} max={n} step={1} onChange={setK} format={(v) => fmt(v)} />}
        {algo !== 'quickselect' && (
          <div className="flex items-center">
            <Toggle label="Race mode: a second algorithm on the same input" checked={race} onChange={setRace} />
          </div>
        )}
      </Controls>
    </Frame>
  );
}
