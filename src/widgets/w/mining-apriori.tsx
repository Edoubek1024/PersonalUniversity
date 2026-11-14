/**
 * mining-apriori: Apriori level by level on a small transaction database. Each level shows the
 * join that builds the candidates C_k from L_{k-1}, the prune step (naming the infrequent
 * (k-1)-subset that removes a candidate), the support counts from one scan, and the frequent
 * itemsets L_k. After the last level, every association rule with its support, confidence, lift
 * and Kulczynski measure. Click a candidate to highlight the transactions that contain it.
 *
 * Params:
 *   transactions  string[]  each a comma-separated list of items   default a 10-basket grocery set
 *   minSup        number    minimum support as an absolute count   default 2 (slider 1..n)
 *   minConf       number    minimum confidence in [0, 1]           default 0.6 (slider, step 0.05)
 *   title         string                                           default "Apriori, level by level"
 *   caption       string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, str, strArray } from '../kit/params';
import { Controls, Frame, Readout, Slider } from '../kit/controls';
import { fmt } from '../kit/num';
import { Legend, StepControls, useStepper } from '../kit/dsa-steps';
import { apriori, key, parseTransactions, rules, type Candidate, type Itemset } from '../kit/mining-core';

const DEFAULT_TX = [
  'apples,bread,cheese',
  'bread,cheese,yogurt',
  'apples,bread',
  'bread,cheese',
  'apples,yogurt',
  'apples,bread,cheese,yogurt',
  'cheese,yogurt',
  'apples,bread,cheese',
];

const OK = 'var(--plot-3)';
const LOW = 'var(--plot-2)';
const CUT = 'var(--plot-4)';

type Phase = 'count' | 'join' | 'prune' | 'stop' | 'rules';
interface Step {
  level: number; // index into run.levels
  phase: Phase;
}

const set = (s: Itemset) => `{${s.join(', ')}}`;

export default function MiningApriori({ params }: WidgetProps) {
  const rawTx = strArray(params, 'transactions', DEFAULT_TX);
  const tx = useMemo(() => parseTransactions(rawTx), [rawTx.join('\n')]); // eslint-disable-line react-hooks/exhaustive-deps
  const n = tx.length;
  const sup0 = Math.round(num(params, 'minSup', 2));
  if (sup0 < 1 || sup0 > n) throw new Error(`parameter "minSup" should be a count between 1 and ${n}`);
  const conf0 = num(params, 'minConf', 0.6);
  if (conf0 < 0 || conf0 > 1) throw new Error('parameter "minConf" should be between 0 and 1');

  const [minSup, setMinSup] = useState(sup0);
  const [minConf, setMinConf] = useState(conf0);
  const [picked, setPicked] = useState<string | null>(null);

  const run = useMemo(() => apriori(tx, minSup), [tx, minSup]);
  const steps = useMemo(() => {
    const out: Step[] = [{ level: 0, phase: 'count' }];
    for (let l = 1; l < run.levels.length; l++) {
      const lv = run.levels[l];
      if (lv.candidates.length === 0) out.push({ level: l, phase: 'stop' });
      else out.push({ level: l, phase: 'join' }, { level: l, phase: 'prune' }, { level: l, phase: 'count' });
    }
    if (!run.emptyLast) out.push({ level: run.levels.length - 1, phase: 'stop' });
    out.push({ level: run.levels.length - 1, phase: 'rules' });
    return out;
  }, [run]);
  const st = useStepper(steps.length, steps);
  const step = steps[st.i];
  const ruleList = useMemo(() => rules(run, minConf), [run, minConf]);

  // How far each level has progressed at this step.
  const phaseOf = (l: number): Phase | 'done' | null => {
    if (l > step.level) return null;
    if (l < step.level) return 'done';
    return step.phase;
  };
  const counted = run.levels.reduce((s, lv, l) => {
    const ph = phaseOf(l);
    if (ph === 'done' || ph === 'count' || ph === 'stop' || ph === 'rules') return s + lv.candidates.filter((c) => c.count !== undefined).length;
    return s;
  }, 0);
  const frequentSoFar = run.levels.reduce((s, lv, l) => {
    const ph = phaseOf(l);
    return ph === 'done' || ph === 'count' || ph === 'stop' || ph === 'rules' ? s + lv.frequent.length : s;
  }, 0);
  const possible = 2 ** run.items.length - 1;

  const lv = run.levels[step.level];
  const desc = (() => {
    const k = lv.k;
    if (step.phase === 'rules')
      return `Done. ${frequentSoFar} frequent itemsets. Every rule X → Y comes from one of them: confidence = sup(X ∪ Y) / sup(X), and only rules with confidence ≥ ${fmt(minConf, 2)} are kept (${ruleList.length} rules).`;
    if (step.phase === 'stop')
      return lv.candidates.length === 0 && step.level > 0 && run.levels[step.level - 1].frequent.length >= 2
        ? `Join L${k - 1}: no two frequent ${k - 1}-itemsets share their first ${k - 2} item${k - 2 === 1 ? '' : 's'}, so C${k} is empty and Apriori stops.`
        : `L${k} has fewer than two itemsets, so nothing can be joined and Apriori stops.`;
    if (k === 1 && step.phase === 'count') return `Scan 1: count every single item. Those with count ≥ ${minSup} form L1 (${lv.frequent.length} of ${lv.candidates.length}).`;
    if (step.phase === 'join')
      return `Join: pair frequent ${k - 1}-itemsets that agree on their first ${k - 2} item${k - 2 === 1 ? '' : 's'} (items sorted). This gives ${lv.candidates.length} candidate ${k}-itemsets.`;
    if (step.phase === 'prune') {
      const cut = lv.candidates.filter((c) => c.prunedBy).length;
      return cut === 0
        ? `Prune: every ${k - 1}-subset of every candidate is frequent${k === 2 ? ' (always true for pairs built from L1)' : ''}, so nothing is removed.`
        : `Prune: a candidate with an infrequent ${k - 1}-subset cannot be frequent (downward closure), so ${cut} ${cut === 1 ? 'is' : 'are'} removed without counting.`;
    }
    return `Scan ${k}: count the ${lv.candidates.filter((c) => c.count !== undefined).length} surviving candidates in one pass. Count ≥ ${minSup} goes into L${k} (${lv.frequent.length}).`;
  })();

  const pickedItems = picked ? picked.split('\u0001') : null;

  return (
    <Frame title={str(params, 'title', 'Apriori, level by level')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full text-[13px]">
          <caption className="sr-only">Transactions</caption>
          <thead className="bg-surface-2 text-left text-xs text-ink-3">
            <tr>
              <th className="px-2 py-1 font-medium">TID</th>
              <th className="px-2 py-1 font-medium">
                Items
                {pickedItems ? ` (rows containing ${set(pickedItems)} highlighted)` : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {tx.map((t, i) => {
              const hit = pickedItems && pickedItems.every((x) => t.includes(x));
              return (
                <tr
                  key={i}
                  className="border-t border-line"
                  style={
                    hit
                      ? {
                          background: 'color-mix(in srgb, var(--plot-1) 14%, transparent)',
                        }
                      : undefined
                  }
                >
                  <td className="px-2 py-0.5 font-mono text-xs text-ink-3">T{i + 1}</td>
                  <td className="px-2 py-0.5">
                    <span className="flex flex-wrap gap-1">
                      {t.map((it) => (
                        <span key={it} className={`rounded px-1.5 font-mono text-xs ${pickedItems?.includes(it) && hit ? 'bg-accent/20 text-ink' : 'bg-surface-2 text-ink-2'}`}>
                          {it}
                        </span>
                      ))}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Controls>
        <Slider
          label={`min support (count of ${n})`}
          value={minSup}
          min={1}
          max={n}
          step={1}
          onChange={(v) => {
            setMinSup(v);
            setPicked(null);
          }}
          format={(v) => `${v} (${fmt((v / n) * 100, 3)}%)`}
        />
        <Slider label="min confidence" value={minConf} min={0} max={1} step={0.05} onChange={setMinConf} format={(v) => fmt(v, 2)} />
      </Controls>

      <StepControls st={st} desc={desc} />

      <Legend
        items={[
          { color: OK, glyph: '✓', label: `frequent (count ≥ ${minSup})` },
          { color: LOW, glyph: '✗', label: 'counted, below min support' },
          { color: CUT, glyph: '✂', label: 'pruned before counting' },
        ]}
      />

      <div className="grid gap-2 sm:grid-cols-2">
        {run.levels.map((level, l) => {
          const ph = phaseOf(l);
          if (ph === null || level.candidates.length === 0) return null;
          const current = l === step.level && step.phase !== 'rules' && step.phase !== 'stop';
          return (
            <div key={l} className={`min-w-0 rounded-lg border p-2 ${current ? 'border-accent' : 'border-line'}`}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                <span className="font-semibold text-ink">
                  C{level.k} → L{level.k}
                </span>
                <span className="text-ink-3">
                  {level.candidates.length} candidate
                  {level.candidates.length === 1 ? '' : 's'}
                  {ph === 'done' || ph === 'count' || ph === 'stop' || ph === 'rules' ? `, ${level.frequent.length} frequent` : ''}
                </span>
              </div>
              <ul className="space-y-0.5">
                {level.candidates.map((c) => (
                  <CandRow key={key(c.items)} c={c} phase={ph} picked={picked === key(c.items)} onPick={() => setPicked((p) => (p === key(c.items) ? null : key(c.items)))} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Readout label="Candidates counted" value={`${counted}`} />
        <Readout label={`All itemsets, 2^${run.items.length} − 1`} value={`${possible}`} />
        <Readout label="Frequent itemsets" value={`${frequentSoFar}`} tone={OK} />
      </div>

      {step.phase === 'rules' && (
        <>
          <div className="text-xs text-ink-3">
            Rules with confidence ≥ {fmt(minConf, 2)}, strongest first. Lift above 1 means X and Y occur together more often than independence predicts; below 1, less often.
          </div>
          <div className="-mt-1 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-120 text-[13px] tabular-nums">
              <caption className="sr-only">Association rules</caption>
              <thead className="bg-surface-2 text-xs text-ink-3">
                <tr>
                  <th className="px-2 py-1 text-left font-medium">Rule X → Y</th>
                  <th className="px-2 py-1 text-right font-medium">support</th>
                  <th className="px-2 py-1 text-right font-medium">confidence</th>
                  <th className="px-2 py-1 text-right font-medium">lift</th>
                  <th className="px-2 py-1 text-right font-medium">Kulczynski</th>
                </tr>
              </thead>
              <tbody>
                {ruleList.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-2 py-2 text-ink-3">
                      No rule reaches this confidence. Lower the min confidence or the min support.
                    </td>
                  </tr>
                )}
                {ruleList.map((r) => (
                  <tr key={key(r.lhs) + '>' + key(r.rhs)} className="border-t border-line">
                    <td className="px-2 py-0.5 font-mono text-xs">
                      {set(r.lhs)} → {set(r.rhs)}
                    </td>
                    <td className="px-2 py-0.5 text-right font-mono text-xs">
                      {r.count} ({fmt(r.support, 3)})
                    </td>
                    <td className="px-2 py-0.5 text-right font-mono text-xs">{r.confidence.toFixed(3)}</td>
                    <td
                      className="px-2 py-0.5 text-right font-mono text-xs"
                      style={{
                        color: r.lift > 1 + 1e-9 ? OK : r.lift < 1 - 1e-9 ? LOW : undefined,
                      }}
                    >
                      {r.lift.toFixed(3)}
                    </td>
                    <td className="px-2 py-0.5 text-right font-mono text-xs">{r.kulc.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Frame>
  );
}

function CandRow({ c, phase, picked, onPick }: { c: Candidate; phase: Phase | 'done'; picked: boolean; onPick: () => void }) {
  const showPrune = phase !== 'join';
  const showCount = phase === 'count' || phase === 'done' || phase === 'stop' || phase === 'rules';
  let color = 'var(--color-ink-3)';
  let glyph = '';
  let note = '';
  if (c.prunedBy && showPrune) {
    color = CUT;
    glyph = '✂';
    note = `${set(c.prunedBy)} not frequent`;
  } else if (showCount && c.count !== undefined) {
    color = c.frequent ? OK : LOW;
    glyph = c.frequent ? '✓' : '✗';
    note = `count ${c.count}`;
  }
  return (
    <li>
      <button
        type="button"
        onClick={onPick}
        aria-pressed={picked}
        title="Highlight the transactions that contain this itemset"
        className={`flex w-full flex-wrap items-center gap-x-1.5 gap-y-0 rounded px-1 py-0.5 text-left text-xs hover:bg-surface-2 ${picked ? 'bg-surface-2 ring-1 ring-accent' : ''}`}
      >
        <span
          className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] text-[10px] font-bold"
          style={{
            background: glyph ? color : 'transparent',
            border: glyph ? undefined : '1px dashed var(--color-line)',
            color: 'var(--color-surface)',
          }}
          aria-hidden
        >
          {glyph}
        </span>
        <span className={`font-mono ${c.prunedBy && showPrune ? 'text-ink-3 line-through' : 'text-ink'}`}>{set(c.items)}</span>
        <span className="ml-auto shrink-0 pl-1 font-mono text-[11px]" style={{ color }}>
          {note}
        </span>
      </button>
    </li>
  );
}
