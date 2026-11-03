/**
 * dp-table: fills a dynamic-programming table one cell at a time, with arrows from the cells the
 * current value depends on (the winning one solid), the recurrence with numbers substituted, and
 * a traceback that highlights the optimal solution.
 *
 * Problems: Fibonacci (tabulation, or memoised recursion with its call stack), edit distance,
 * longest common subsequence, 0/1 knapsack, coin change (fewest coins), longest increasing
 * subsequence.
 *
 * Params:
 *   problem   "fib" | "edit" | "lcs" | "knapsack" | "coins" | "lis"   default "edit"
 *   problems  string[]  problems offered                             default [problem]
 *   fibMode   "table" | "memo"                                       default "table"
 *   n         number    Fibonacci index, 2 to 15                     default 7
 *   a, b      string    the two strings (edit, lcs), up to 10 chars   default "kitten", "sitting" (edit);
 *                                                                    "ABCBDAB", "BDCABA" (lcs)
 *   weights   number[]  knapsack weights                             default [1, 3, 4, 5]
 *   values    number[]  knapsack values                              default [1, 4, 5, 7]
 *   W         number    knapsack capacity, up to 15                  default 7
 *   coins     number[]  coin denominations                           default [1, 3, 4]
 *   amount    number    coin-change amount, up to 16                 default 6
 *   seq       number[]  LIS sequence, up to 12 values                default [10, 9, 2, 5, 3, 7, 101, 18]
 *   letter    string    knapsack table name: "K" gives K[i][c], any other
 *                       letter L gives the notation L_i(c)          default "K"
 *   title     string                                                 default "Filling a DP table"
 *   caption   string
 */
import { useId, useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, oneOf, str, strArray } from '../kit/params';
import { Controls, Frame, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { coinChange, editDistance, fibMemo, fibN, fibTable, knapsack, lcs, lis, type DPProblem, type DPRun, type DPSnap } from '../kit/dsa-dp';
import { Field, Legend, ListInput, MARK, StepControls, useStepper } from '../kit/dsa-steps';

const PROBLEMS = ['fib', 'edit', 'lcs', 'knapsack', 'coins', 'lis'] as const;
const PLABEL: Record<DPProblem, string> = { fib: 'Fibonacci', edit: 'Edit distance', lcs: 'LCS', knapsack: '0/1 knapsack', coins: 'Coin change', lis: 'LIS' };

function Grid({ run, s }: { run: DPRun; s: DPSnap }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const avail = Math.max(240, size.width || 600);
  const rows = s.grid.length;
  const cols = s.grid[0].length;
  const oneD = rows === 1;
  const hw = oneD ? 44 : 30;
  const cs = Math.max(19, Math.min(46, (avail - hw - 6) / cols));
  const W = Math.max(avail, hw + cols * cs + 6);
  const top = oneD ? 56 : 20;
  const H = top + rows * cs + (oneD ? 16 + (run.topLabels ? 16 : 0) : 6);
  const cx = (c: number) => hw + c * cs + cs / 2;
  const cy = (r: number) => top + r * cs + cs / 2;
  const onPath = new Set(s.path.map(([r, c]) => `${r},${c}`));
  const depAt = new Map(s.deps.map((d) => [`${d.r},${d.c}`, d]));
  const font = Math.max(9, Math.min(13, cs * 0.36));
  const arrow = (d: (typeof s.deps)[number], k: number) => {
    if (!s.cur) return null;
    const [r1, c1] = [d.r, d.c];
    const [r2, c2] = s.cur;
    const color = d.chosen ? 'var(--plot-3)' : 'var(--plot-axis)';
    if (oneD) {
      const x1 = cx(c1);
      const x2 = cx(c2);
      const y0 = top - 2;
      const h = Math.min(top - 22, 10 + Math.abs(c2 - c1) * cs * 0.22);
      return (
        <g key={k}>
          <path d={`M${x1},${y0} C${x1},${y0 - h} ${x2},${y0 - h} ${x2},${y0 - 3}`} fill="none" stroke={color} strokeWidth={d.chosen ? 2.25 : 1.4} strokeDasharray={d.chosen ? undefined : '4 3'} markerEnd={`url(#${uid}-${d.chosen ? 'g' : 'n'})`} />
          {d.label && cs >= 22 && (
            <text x={(x1 + x2) / 2} y={y0 - h * 0.75 - 7} textAnchor="middle" fontSize={10} fontWeight={d.chosen ? 700 : 400} fill={color}>
              {d.label}
            </text>
          )}
        </g>
      );
    }
    const x1 = cx(c1);
    const y1 = cy(r1);
    const x2 = cx(c2);
    const y2 = cy(r2);
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const sh = cs * 0.3;
    return (
      <g key={k}>
        <line x1={x1 + ux * sh} y1={y1 + uy * sh} x2={x2 - ux * sh} y2={y2 - uy * sh} stroke={color} strokeWidth={d.chosen ? 2.5 : 1.4} strokeDasharray={d.chosen ? undefined : '4 3'} markerEnd={`url(#${uid}-${d.chosen ? 'g' : 'n'})`} />
      </g>
    );
  };
  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`DP table, ${rows} by ${cols}`} className="block select-none rounded-lg bg-surface" style={{ fontVariantNumeric: 'tabular-nums' }}>
        <defs>
          {(['g', 'n'] as const).map((t) => (
            <marker key={t} id={`${uid}-${t}`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill={t === 'g' ? 'var(--plot-3)' : 'var(--plot-axis)'} />
            </marker>
          ))}
        </defs>
        {run.colLabels.map((l, c) => (
          <text key={`c${c}`} x={cx(c)} y={oneD ? top + cs + 11 : top - 5} textAnchor="middle" fontSize={oneD ? 9.5 : 10.5} fill="var(--plot-text)">
            {l}
          </text>
        ))}
        {oneD && run.topLabels && (
          <>
            <text x={hw - 6} y={top + cs + 27} textAnchor="end" fontSize={10} fill="var(--plot-text)">
              a[i]
            </text>
            {run.topLabels.map((l, c) => (
              <text key={`t${c}`} x={cx(c)} y={top + cs + 27} textAnchor="middle" fontSize={Math.min(11, cs * 0.42)} fontWeight={600} fill="var(--color-ink)">
                {l}
              </text>
            ))}
          </>
        )}
        {run.rowLabels.map((l, r) => (
          <text key={`r${r}`} x={hw - 6} y={cy(r) + 4} textAnchor="end" fontSize={10.5} fontWeight={600} fill="var(--plot-text)">
            {l}
          </text>
        ))}
        {s.grid.map((row, r) =>
          row.map((v, c) => {
            const key = `${r},${c}`;
            const isCur = !!s.cur && s.cur[0] === r && s.cur[1] === c;
            const path = onPath.has(key);
            const dep = depAt.get(key);
            const hit = s.hit === c && oneD;
            const fill = isCur ? MARK.compare.color : path ? MARK.sorted.color : hit ? 'var(--plot-5)' : v === null ? 'transparent' : 'var(--color-surface-2)';
            const strong = isCur || path || hit;
            return (
              <g key={key}>
                <rect x={hw + c * cs + 1} y={top + r * cs + 1} width={cs - 2} height={cs - 2} rx={3} fill={fill} fillOpacity={strong ? 0.92 : 1} stroke={dep ? (dep.chosen ? 'var(--plot-3)' : 'var(--color-accent)') : isCur ? 'var(--color-ink)' : 'var(--color-line)'} strokeWidth={dep ? 2.25 : isCur ? 2 : 1} strokeDasharray={dep && !dep.chosen ? '3 2' : undefined} />
                {dep?.label && !oneD && cs >= 26 && (
                  <text x={hw + c * cs + 4} y={top + r * cs + 10} fontSize={8.5} fontWeight={dep.chosen ? 700 : 500} fill={dep.chosen ? 'var(--plot-3)' : 'var(--color-accent)'}>
                    {dep.label}
                  </text>
                )}
                {v !== null && (
                  <text x={cx(c)} y={cy(r) + font * 0.36 + (dep?.label && !oneD && cs >= 26 ? 3 : 0)} textAnchor="middle" fontSize={font} fontWeight={strong ? 700 : 500} fill={strong ? 'var(--color-surface)' : 'var(--color-ink)'}>
                    {v === Infinity ? '∞' : v}
                  </text>
                )}
              </g>
            );
          }),
        )}
        {s.deps.map(arrow)}
      </svg>
    </div>
  );
}

function word(s: string) {
  return s.replace(/[^A-Za-z]/g, '').slice(0, 10);
}

export default function DPTable({ params }: WidgetProps) {
  const p0 = oneOf(params, 'problem', PROBLEMS, 'edit');
  const offered = strArray(params, 'problems', [p0]).filter((p): p is DPProblem => (PROBLEMS as readonly string[]).includes(p));
  const fibMode0 = oneOf(params, 'fibMode', ['table', 'memo'] as const, 'table');
  const n0 = num(params, 'n', 7);
  const a0 = str(params, 'a', p0 === 'lcs' ? 'ABCBDAB' : 'kitten');
  const b0 = str(params, 'b', p0 === 'lcs' ? 'BDCABA' : 'sitting');
  const w0 = numArray(params, 'weights', [1, 3, 4, 5]);
  const v0 = numArray(params, 'values', [1, 4, 5, 7]);
  const W0 = num(params, 'W', 7);
  const coins0 = numArray(params, 'coins', [1, 3, 4]);
  const amount0 = num(params, 'amount', 6);
  const seq0 = numArray(params, 'seq', [10, 9, 2, 5, 3, 7, 101, 18]);
  const letter = str(params, 'letter', 'K');
  if (!/^[A-Z]$/.test(letter)) throw new Error('parameter "letter" should be one capital letter');
  if (w0.length !== v0.length || w0.length === 0 || w0.length > 8) throw new Error('parameters "weights" and "values" should be lists of the same length (1 to 8)');
  if (W0 < 1 || W0 > 15) throw new Error('parameter "W" should be between 1 and 15');
  if (amount0 < 1 || amount0 > 16) throw new Error('parameter "amount" should be between 1 and 16');
  if (n0 < 2 || n0 > 15) throw new Error('parameter "n" should be between 2 and 15');
  const title = str(params, 'title', 'Filling a DP table');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [problem, setProblem] = useState<DPProblem>(p0);
  const [fibMode, setFibMode] = useState<'table' | 'memo'>(fibMode0);
  const [n, setN] = useState(n0);
  const [A, setA] = useState(word(a0));
  const [B, setB] = useState(word(b0));
  const [aText, setAText] = useState(word(a0));
  const [bText, setBText] = useState(word(b0));
  const [wts, setWts] = useState(w0);
  const [vals, setVals] = useState(v0);
  const [W, setW] = useState(W0);
  const [coins, setCoins] = useState(coins0);
  const [amount, setAmount] = useState(amount0);
  const [seq, setSeq] = useState(seq0.slice(0, 12));

  const run = useMemo<DPRun>(() => {
    switch (problem) {
      case 'fib':
        return fibMode === 'memo' ? fibMemo(n) : fibTable(n);
      case 'edit':
        return editDistance(A || 'a', B || 'b');
      case 'lcs':
        return lcs(A || 'a', B || 'b');
      case 'knapsack':
        return knapsack(wts, vals, W, letter);
      case 'coins':
        return coinChange(coins, amount);
      case 'lis':
        return lis(seq);
    }
  }, [problem, fibMode, n, A, B, wts, vals, W, coins, amount, seq, letter]);
  const st = useStepper(run.snaps.length, run, 3);
  const s = run.snaps[st.i];
  const done = st.i === run.snaps.length - 1;
  const applyAB = () => {
    setA(word(aText) || 'a');
    setB(word(bText) || 'b');
  };
  const chooseProblem = (p: DPProblem) => {
    setProblem(p);
    if (p === 'lcs' && A === 'kitten' && B === 'sitting') {
      setA('ABCBDAB');
      setB('BDCABA');
      setAText('ABCBDAB');
      setBText('BDCABA');
    }
    if (p === 'edit' && A === 'ABCBDAB' && B === 'BDCABA') {
      setA('kitten');
      setB('sitting');
      setAText('kitten');
      setBText('sitting');
    }
  };

  return (
    <Frame title={title} caption={caption}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {offered.length > 1 && <Segmented label="Problem" value={problem} onChange={chooseProblem} options={offered.map((p) => ({ value: p, label: PLABEL[p] }))} />}
        {problem === 'fib' && (
          <Segmented
            label="Evaluation order"
            value={fibMode}
            onChange={setFibMode}
            options={[
              { value: 'table', label: 'Tabulation (bottom-up)' },
              { value: 'memo', label: 'Memoisation (top-down)' },
            ]}
          />
        )}
      </div>
      {problem === 'knapsack' && (
        <div className="flex flex-wrap gap-1.5 text-[12px]">
          {wts.map((w, i) => (
            <span key={i} className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono">
              item {i + 1}: w {w}, v {vals[i]}
            </span>
          ))}
        </div>
      )}
      <Grid run={run} s={s} />
      {s.stack && (
        <div className="font-mono text-[12px] text-ink-2">
          call stack: {s.stack.length ? s.stack.map((k) => `fib(${k})`).join(' → ') : '(empty)'}
        </div>
      )}
      <div className="min-h-[2.25rem] overflow-x-auto rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[13px]">{s.tex ? <Tex>{s.tex}</Tex> : <span className="text-ink-3">The recurrence for the current cell appears here.</span>}</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Readout label="Cells" value={`${s.grid.flat().filter((v) => v !== null).length} / ${s.grid.length * s.grid[0].length}`} />
        {problem === 'fib' && fibMode === 'memo' ? <Readout label="Calls so far / naive total" value={`${s.calls ?? 0} / ${2 * fibN(n + 1) - 1}`} tone="var(--plot-4)" /> : <Readout label="Table size" value={`${s.grid.length} × ${s.grid[0].length}`} />}
        <div className="col-span-2 sm:col-span-1">
          <Readout label="Answer" value={done ? run.answer : '…'} tone={done ? MARK.sorted.color : undefined} />
        </div>
      </div>
      <Legend
        items={[
          { kind: 'compare', glyph: '', label: 'cell being computed' },
          { color: 'var(--plot-3)', glyph: '→', label: 'dependency that wins' },
          { color: 'var(--color-accent)', label: 'other dependencies', dashed: true },
          { kind: 'sorted', glyph: '', label: 'traceback / optimal solution' },
          ...(problem === 'fib' && fibMode === 'memo' ? [{ color: 'var(--plot-5)', glyph: '', label: 'answered from the memo' }] : []),
        ]}
      />
      <StepControls st={st} desc={s.d} />
      {problem === 'fib' && <Slider label="n" value={n} min={2} max={15} step={1} onChange={setN} format={(v) => String(v)} />}
      {(problem === 'edit' || problem === 'lcs') && (
        <div className="flex flex-wrap items-center gap-2">
          <Field label="A" value={aText} onChange={setAText} onEnter={applyAB} width="w-28" />
          <Field label="B" value={bText} onChange={setBText} onEnter={applyAB} width="w-28" />
          <button type="button" className="btn-outline px-2.5 py-1.5 text-xs" onClick={applyAB}>
            Apply
          </button>
          <span className="text-[11px] text-ink-3">letters only, up to 10</span>
        </div>
      )}
      {problem === 'knapsack' && (
        <>
          <ListInput
            label="Weights"
            values={wts}
            onChange={(v) => {
              setWts(v.slice(0, 8));
              setVals((old) => v.slice(0, 8).map((_, i) => old[i] ?? 1));
            }}
            min={1}
            max={15}
            maxLen={8}
          />
          <ListInput label="Values (one per item)" values={vals} onChange={(v) => setVals(wts.map((_, i) => v[i] ?? 1))} min={0} max={99} maxLen={8} />
          <Controls>
            <Slider label="Capacity W" value={W} min={1} max={15} step={1} onChange={setW} format={(v) => String(v)} />
          </Controls>
        </>
      )}
      {problem === 'coins' && (
        <>
          <ListInput label="Coin denominations" values={coins} onChange={(v) => setCoins([...new Set(v)].sort((x, y) => x - y))} min={1} max={16} maxLen={6} />
          <Controls>
            <Slider label="Amount" value={amount} min={1} max={16} step={1} onChange={setAmount} format={(v) => String(v)} />
          </Controls>
        </>
      )}
      {problem === 'lis' && <ListInput label="Sequence (up to 12 numbers)" values={seq} onChange={(v) => setSeq(v.slice(0, 12))} presets={['random', 'nearly', 'reversed']} min={0} max={99} maxLen={12} size={10} />}
    </Frame>
  );
}
