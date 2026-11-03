/**
 * binary-search: lo / mid / hi stepping on a sorted array with the invariant shaded, probes counted
 * against ⌈log₂(n+1)⌉; variants lower bound (bisect_left), upper bound (bisect_right) and the
 * classic closed-interval exact search; plus binary search on the answer for a monotone predicate.
 *
 * Params:
 *   mode      "array" | "answer"                                  default "array"
 *   values    number[]  sorted array (sorted for you if not)        default [1, 3, 3, 5, 8, 8, 8, 13, 21, 34]
 *   target    number                                              default 8
 *   variant   "lower" | "upper" | "closed"                        default "lower"
 *   variants  string[]  variants offered                          default ["lower", "upper", "closed"]
 *   f         string    answer mode: f(v), P(v) is f(v) >= t       default "v^2"
 *   t         number    answer mode threshold                     default 200
 *   range     [lo, hi]  answer mode search range [lo, hi)          default [0, 64]
 *   title     string                                              default "Binary search"
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, oneOf, str, strArray } from '../kit/params';
import { tryCompile } from '../kit/expr';
import { Frame, Note, Readout, Segmented } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { answerSearchSteps, binarySearchSteps, type SearchSnap, type SearchVariant } from '../kit/dsa-search';
import { Field, Legend, ListInput, MARK, NEUTRAL, StepControls, log2, useStepper } from '../kit/dsa-steps';

const VARIANTS = ['lower', 'upper', 'closed'] as const;
const VLABEL: Record<SearchVariant, string> = { lower: 'lower bound [lo, hi)', upper: 'upper bound [lo, hi)', closed: 'exact, closed [lo, hi]' };

function invariant(v: SearchVariant, x: number): string {
  if (v === 'lower') return `every index below lo has a[i] < ${x}; every index at or above hi has a[i] ≥ ${x}.`;
  if (v === 'upper') return `every index below lo has a[i] ≤ ${x}; every index at or above hi has a[i] > ${x}.`;
  return `if ${x} is in the array, it is in a[lo..hi] (both ends included).`;
}

function ArrayView({ a, s, variant, onPick }: { a: number[]; s: SearchSnap; variant: SearchVariant; onPick: (v: number) => void }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.max(220, size.width || 600);
  const n = a.length;
  const half = variant !== 'closed';
  const cols = n + (half ? 1 : 0);
  const pad = 4;
  const cw = Math.min(52, (W - 2 * pad) / cols);
  const x0 = pad + (W - 2 * pad - cw * cols) / 2;
  const xOf = (i: number) => x0 + i * cw;
  const font = Math.max(9, Math.min(14, cw * 0.42));
  const yBr = 18;
  const yCell = 30;
  const ch = 34;
  const yIdx = yCell + ch + 14;
  const yPtr = yIdx + 16;
  const H = yPtr + 22;
  const leftHi = s.lo; // [0, lo) known left
  const rightLo = half ? s.hi : s.hi + 1; // [rightLo, n) known right
  const lt = variant === 'lower' ? '<' : variant === 'upper' ? '≤' : '<';
  const gt = variant === 'lower' ? '≥' : variant === 'upper' ? '>' : '>';
  const ptr = new Map<number, string[]>();
  const add = (i: number, l: string) => ptr.set(i, [...(ptr.get(i) ?? []), l]);
  if (s.result === undefined || variant !== 'closed') {
    add(s.lo, 'lo');
    if (s.mid !== null) add(s.mid, 'mid');
    add(s.hi, 'hi');
  } else if (s.result >= 0) add(s.result, 'mid');
  const bracket = (lo: number, hi: number, label: string, color: string) => {
    if (hi <= lo) return null;
    const a0 = xOf(lo) + 2;
    const a1 = xOf(hi) - 2;
    return (
      <g>
        <path d={`M${a0},${yBr + 6} v-4 H${a1} v4`} fill="none" stroke={color} strokeWidth={1.75} />
        {a1 - a0 > label.length * 6 && (
          <text x={(a0 + a1) / 2} y={yBr - 5} textAnchor="middle" fontSize={11} fill="var(--plot-text)">
            {label}
          </text>
        )}
      </g>
    );
  };
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Binary search state: lo ${s.lo}, hi ${s.hi}`} className="block select-none rounded-lg bg-surface" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {bracket(0, leftHi, `known ${lt} x`, 'var(--plot-1)')}
        {bracket(Math.max(rightLo, 0), n, `known ${gt} x`, 'var(--plot-5)')}
        {s.result === undefined && bracket(s.lo, half ? s.hi : s.hi + 1, 'candidates', 'var(--plot-axis)')}
        {a.map((v, i) => {
          const left = i < leftHi;
          const right = i >= rightLo;
          const isMid = s.mid === i;
          const isRes = s.result === i;
          const fill = isMid ? MARK.compare.color : isRes ? MARK.found.color : left ? 'var(--plot-1)' : right ? 'var(--plot-5)' : 'var(--color-surface-2)';
          const op = isMid || isRes ? 0.95 : left || right ? 0.28 : 1;
          return (
            <g key={i} onClick={() => onPick(v)} style={{ cursor: 'pointer' }}>
              <rect x={xOf(i) + 1} y={yCell} width={cw - 2} height={ch} rx={4} fill={fill} fillOpacity={op} stroke={isRes ? 'var(--color-ink)' : 'var(--color-line)'} strokeWidth={isRes ? 2 : 1} />
              <text x={xOf(i) + cw / 2} y={yCell + ch / 2 + font * 0.36} textAnchor="middle" fontSize={font} fontWeight={isMid || isRes ? 700 : 500} fill={isMid || isRes ? 'var(--color-surface)' : 'var(--color-ink)'}>
                {v}
              </text>
              {(isMid || isRes) && cw >= 16 && (
                <text x={xOf(i) + cw - 4} y={yCell + 10} textAnchor="end" fontSize={9} fontWeight={700} fill="var(--color-surface)">
                  {isMid ? '?' : '★'}
                </text>
              )}
              <text x={xOf(i) + cw / 2} y={yIdx} textAnchor="middle" fontSize={Math.min(11, cw * 0.5)} fill="var(--plot-text)">
                {i}
              </text>
            </g>
          );
        })}
        {half && (
          <g>
            <rect x={xOf(n) + 1} y={yCell} width={cw - 2} height={ch} rx={4} fill="none" stroke={s.result === n ? 'var(--color-ink)' : 'var(--plot-axis)'} strokeDasharray="4 3" strokeWidth={s.result === n ? 2 : 1} />
            <text x={xOf(n) + cw / 2} y={yCell + ch / 2 + 4} textAnchor="middle" fontSize={Math.min(10, cw * 0.32)} fill="var(--plot-text)">
              end
            </text>
            <text x={xOf(n) + cw / 2} y={yIdx} textAnchor="middle" fontSize={Math.min(11, cw * 0.5)} fill="var(--plot-text)">
              {n}
            </text>
          </g>
        )}
        {[...ptr.entries()].map(([i, ls]) =>
          i >= 0 && i <= cols ? (
            <text key={i} x={Math.max(10, Math.min(W - 10, xOf(i) + cw / 2))} y={yPtr} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={ls.includes('mid') ? 'var(--plot-4)' : 'var(--color-accent)'}>
              ↑{ls.join('=')}
            </text>
          ) : null,
        )}
        {variant === 'closed' && s.result === undefined && s.hi < 0 && (
          <text x={pad} y={yPtr} fontSize={11} fill="var(--color-accent)">
            hi = −1
          </text>
        )}
      </svg>
    </div>
  );
}

function AnswerView({ s, lo0, hi0 }: { s: SearchSnap; lo0: number; hi0: number }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.max(220, size.width || 600);
  const pad = 18;
  const span = hi0 - lo0;
  const sx = (v: number) => pad + ((v - lo0) / span) * (W - 2 * pad);
  const yL = 46;
  const H = 104;
  const step = span <= 20 ? 1 : span <= 50 ? 5 : span <= 120 ? 10 : Math.pow(10, Math.floor(Math.log10(span / 4)));
  const ticks: number[] = [];
  for (let v = Math.ceil(lo0 / step) * step; v <= hi0; v += step) ticks.push(v);
  const known = s.known ?? {};
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Search range now [${s.lo}, ${s.hi})`} className="block select-none rounded-lg bg-surface" style={{ fontVariantNumeric: 'tabular-nums' }}>
        <rect x={sx(lo0)} y={yL - 9} width={Math.max(0, sx(s.lo) - sx(lo0))} height={18} fill="var(--plot-2)" fillOpacity={0.22} />
        <rect x={sx(s.hi)} y={yL - 9} width={Math.max(0, sx(hi0) - sx(s.hi))} height={18} fill="var(--plot-3)" fillOpacity={0.25} />
        {s.lo > lo0 && sx(s.lo) - sx(lo0) > 60 && (
          <text x={(sx(lo0) + sx(s.lo)) / 2} y={yL - 14} textAnchor="middle" fontSize={11} fill="var(--plot-text)">
            P false ✗
          </text>
        )}
        {s.hi < hi0 && sx(hi0) - sx(s.hi) > 60 && (
          <text x={(sx(s.hi) + sx(hi0)) / 2} y={yL - 14} textAnchor="middle" fontSize={11} fill="var(--plot-text)">
            P true ✓
          </text>
        )}
        <line x1={sx(lo0)} x2={sx(hi0)} y1={yL} y2={yL} stroke="var(--plot-axis)" strokeWidth={1.5} />
        {ticks.map((v) => (
          <g key={v}>
            <line x1={sx(v)} x2={sx(v)} y1={yL - 4} y2={yL + 4} stroke="var(--plot-axis)" />
            <text x={sx(v)} y={yL + 17} textAnchor="middle" fontSize={10} fill="var(--plot-text)">
              {v}
            </text>
          </g>
        ))}
        {Object.entries(known).map(([v, p]) => (
          <g key={v}>
            <circle cx={sx(+v)} cy={yL} r={5} fill={p ? 'var(--plot-3)' : 'var(--plot-2)'} stroke="var(--color-surface)" strokeWidth={1.5} />
            <text x={sx(+v)} y={yL - 9} textAnchor="middle" fontSize={10} fontWeight={700} fill={p ? 'var(--plot-3)' : 'var(--plot-2)'}>
              {p ? 'T' : 'F'}
            </text>
          </g>
        ))}
        {s.mid !== null && <circle cx={sx(s.mid)} cy={yL} r={9} fill="none" stroke="var(--plot-4)" strokeWidth={2.5} />}
        <text x={sx(s.lo)} y={yL + 34} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--color-accent)">
          ↑lo{s.lo === s.hi ? '=hi' : ''}
        </text>
        {s.lo !== s.hi && (
          <text x={Math.min(W - 12, sx(s.hi))} y={yL + 34} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--color-accent)">
            ↑hi
          </text>
        )}
        {s.mid !== null && (
          <text x={sx(s.mid)} y={yL + 48} textAnchor="middle" fontSize={11.5} fontWeight={700} fill="var(--plot-4)">
            mid = {s.mid}
          </text>
        )}
      </svg>
    </div>
  );
}

export default function BinarySearch({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['array', 'answer'] as const, 'array');
  const values0 = numArray(params, 'values', [1, 3, 3, 5, 8, 8, 8, 13, 21, 34]);
  const target0 = num(params, 'target', 8);
  const variant0 = oneOf(params, 'variant', VARIANTS, 'lower');
  const offered = strArray(params, 'variants', ['lower', 'upper', 'closed']).filter((v): v is SearchVariant => (VARIANTS as readonly string[]).includes(v));
  const fsrc = str(params, 'f', 'v^2');
  const t0 = num(params, 't', 200);
  const range = numArray(params, 'range', [0, 64]);
  if (range.length !== 2 || !(range[0] < range[1]) || range[1] - range[0] > 100000) throw new Error('parameter "range" should be [lo, hi] with lo < hi');
  const title = str(params, 'title', mode === 'answer' ? 'Binary search on the answer' : 'Binary search');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [values, setValues] = useState(() => values0.slice().sort((x, y) => x - y));
  const [sortedNote, setSortedNote] = useState(values0.some((v, i) => i > 0 && v < values0[i - 1]));
  const [target, setTarget] = useState(target0);
  const [targetText, setTargetText] = useState(String(target0));
  const [variant, setVariant] = useState<SearchVariant>(variant0);
  const [t, setT] = useState(t0);
  const [tText, setTText] = useState(String(t0));

  const compiled = useMemo(() => tryCompile(fsrc, ['v']), [fsrc]);
  if (compiled.error) throw new Error(`parameter "f": ${compiled.error}`);
  const f = compiled.fn!;

  const steps = useMemo(() => (mode === 'answer' ? answerSearchSteps((v) => f(v), t, range[0], range[1], fsrc) : binarySearchSteps(values, target, variant)), [mode, values, target, variant, t, f, range[0], range[1], fsrc]); // eslint-disable-line react-hooks/exhaustive-deps
  const st = useStepper(steps.length, steps, 2);
  const s = steps[st.i];
  const n = values.length;
  const bound = mode === 'answer' ? Math.ceil(log2(range[1] - range[0] + 1)) : Math.ceil(log2(n + 1));

  const applyTarget = () => {
    const v = Number(targetText);
    if (Number.isFinite(v)) setTarget(v);
  };
  const applyT = () => {
    const v = Number(tText);
    if (Number.isFinite(v)) setT(v);
  };

  return (
    <Frame title={title} caption={caption}>
      {mode === 'array' && offered.length > 1 && <Segmented label="Variant" value={variant} onChange={setVariant} options={offered.map((v) => ({ value: v, label: VLABEL[v] }))} />}
      <div className="text-[12.5px] leading-5 text-ink-2">
        <span className="font-semibold text-ink">Invariant. </span>
        {mode === 'answer' ? 'P(v) is false for every v below lo and true for every v at or above hi; the boundary is in [lo, hi].' : invariant(variant, target)}
      </div>
      {mode === 'array' ? (
        <ArrayView
          a={values}
          s={s}
          variant={variant}
          onPick={(v) => {
            setTarget(v);
            setTargetText(String(v));
          }}
        />
      ) : (
        <AnswerView s={s} lo0={range[0]} hi0={range[1]} />
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label={mode === 'answer' ? 'Evaluations of P' : 'Probes of a[mid]'} value={s.probes} tone="var(--plot-4)" />
        <Readout label={mode === 'answer' ? '⌈log₂(range + 1)⌉' : '⌈log₂(n + 1)⌉'} value={bound} />
        <Readout label="lo, hi" value={`${s.lo}, ${s.hi}`} />
        <Readout label="Result" value={s.result === undefined ? '…' : s.result} tone={s.result === undefined ? undefined : MARK.found.color} />
      </div>
      {mode === 'array' ? (
        <Legend
          items={[
            { kind: 'compare', label: 'a[mid] being probed' },
            { color: 'var(--plot-1)', glyph: '', label: variant === 'upper' ? 'known ≤ x' : 'known < x' },
            { color: 'var(--plot-5)', glyph: '', label: variant === 'upper' ? 'known > x' : variant === 'lower' ? 'known ≥ x' : 'known > x' },
            { color: NEUTRAL, glyph: '', label: 'still a candidate', dashed: true },
            { kind: 'found', label: 'answer' },
          ]}
        />
      ) : (
        <Legend
          items={[
            { color: 'var(--plot-2)', glyph: 'F', label: 'P(v) false' },
            { color: 'var(--plot-3)', glyph: 'T', label: 'P(v) true' },
            { color: 'var(--plot-4)', glyph: '', label: 'v being tested', dashed: true },
          ]}
        />
      )}
      <StepControls st={st} desc={s.d} />
      {mode === 'array' ? (
        <>
          <ListInput
            label="Sorted array (comma-separated; it is sorted for you). Click a cell to search for its value."
            values={values}
            onChange={(v) => {
              setSortedNote(v.some((x, i) => i > 0 && x < v[i - 1]));
              setValues(v.slice().sort((x, y) => x - y));
            }}
            presets={['random', 'dups']}
            sortedOnly
            min={0}
            max={60}
            maxLen={24}
          />
          {sortedNote && <Note>The list was not sorted, so it was sorted first: binary search needs sorted input.</Note>}
          <div className="flex flex-wrap items-center gap-2">
            <Field label="Target x" value={targetText} onChange={setTargetText} onEnter={applyTarget} type="number" width="w-20" />
            <button type="button" className="btn-outline px-2.5 py-1.5 text-xs" onClick={applyTarget}>
              Search
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[13px] text-ink-2">P(v): {fsrc} ≥</span>
          <Field label={<span className="sr-only">threshold t</span>} value={tText} onChange={setTText} onEnter={applyT} type="number" width="w-24" />
          <button type="button" className="btn-outline px-2.5 py-1.5 text-xs" onClick={applyT}>
            Search
          </button>
        </div>
      )}
    </Frame>
  );
}
