/**
 * mining-tree-split: decision-tree split explorer on a small table. At the current node it shows
 * the class counts, entropy and Gini, and for every remaining attribute the information gain,
 * split information, gain ratio and Gini reduction, with the best attribute under the chosen
 * measure highlighted. Pick an attribute to see its partition and the arithmetic; click a child
 * to descend into it (the breadcrumb goes back up). "Whole tree" grows the greedy tree under the
 * chosen measure. Numeric columns (every value a number) get binary splits at midpoints.
 *
 * Params:
 *   attributes  string[]  names of the non-class columns                   default a small example
 *   rows        string[]  each "v1,v2,...,class" (attributes, then class)  default a small example
 *   classLabel  string    name of the class column                         default "class"
 *   measure     "gain" | "gainratio" | "gini"                              default "gain"
 *   title       string                                                     default "Decision-tree split explorer"
 *   caption     string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Segmented, Tex } from '../kit/controls';
import { classCounts, entropy, evalSplit, gini, grow, parseTreeData, scoreOf, type Child, type GrownNode, type Measure, type SplitEval, type TreeData } from '../kit/mining-core';

const DEFAULT_ATTRS = ['outlook', 'windy'];
const DEFAULT_ROWS = ['sun,no,yes', 'sun,yes,yes', 'rain,yes,no', 'rain,no,yes', 'cloud,no,yes', 'rain,yes,no', 'sun,yes,no', 'cloud,yes,yes'];

const MEASURES = ['gain', 'gainratio', 'gini'] as const;
const MEASURE_LABEL: Record<Measure, string> = {
  gain: 'Information gain',
  gainratio: 'Gain ratio',
  gini: 'Gini reduction',
};
const CLASS_COLORS = ['var(--plot-1)', 'var(--plot-4)', 'var(--plot-3)', 'var(--plot-6)', 'var(--plot-5)', 'var(--plot-2)'];

const f4 = (x: number) => (Math.abs(x) < 5e-5 ? '0.0000' : x.toFixed(4));

interface PathStep {
  child: Child;
  attr: number;
}

export default function MiningTreeSplit({ params }: WidgetProps) {
  const attrs = strArray(params, 'attributes', DEFAULT_ATTRS);
  const rows = strArray(params, 'rows', params.attributes ? [] : DEFAULT_ROWS);
  const classLabel = str(params, 'classLabel', 'class');
  const m0 = oneOf(params, 'measure', MEASURES, 'gain');
  const data = useMemo(() => parseTreeData(attrs, rows), [attrs.join('\n'), rows.join('\n')]); // eslint-disable-line react-hooks/exhaustive-deps

  const [measure, setMeasure] = useState<Measure>(m0);
  const [path, setPath] = useState<PathStep[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [whole, setWhole] = useState(false);

  const all = useMemo(() => data.rows.map((_, i) => i), [data]);
  const idx = path.length ? path[path.length - 1].child.idx : all;
  const used = path.map((p) => p.attr).filter((a) => !data.numeric[a]);
  const avail = data.attributes.map((_, j) => j).filter((j) => data.numeric[j] || !used.includes(j));
  const counts = classCounts(data, idx);
  const H = entropy(counts);
  const G = gini(counts);
  const evals = useMemo(() => avail.map((j) => evalSplit(data, idx, j, measure)), [data, idx, avail.join(), measure]); // eslint-disable-line react-hooks/exhaustive-deps
  const best = evals.reduce<SplitEval | null>((b, s) => (s.valid && (!b || scoreOf(s, measure) > scoreOf(b, measure) + 1e-12) ? s : b), null);
  const pure = counts.filter((c) => c > 0).length <= 1;
  const sel = evals.find((e) => e.attr === chosen) ?? best;
  const tree = useMemo(() => (whole ? grow(data, all, [], measure) : null), [whole, data, all, measure]);

  const descend = (s: SplitEval, c: Child) => {
    if (c.idx.length === 0) return;
    setPath((p) => [...p, { child: c, attr: s.attr }]);
    setChosen(null);
  };

  return (
    <Frame title={str(params, 'title', 'Decision-tree split explorer')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <Segmented
          label="Choose splits by"
          options={MEASURES.map((m) => ({ value: m, label: MEASURE_LABEL[m] }))}
          value={measure}
          onChange={(m) => {
            setMeasure(m);
            setChosen(null);
          }}
        />
        <div className="flex gap-1.5">
          <Button onClick={() => setWhole((w) => !w)}>{whole ? 'Hide whole tree' : 'Whole tree'}</Button>
        </div>
      </div>

      <nav aria-label="Path from the root" className="flex flex-wrap items-center gap-1 text-[13px]">
        <button
          type="button"
          onClick={() => {
            setPath([]);
            setChosen(null);
          }}
          className={`rounded px-1.5 py-0.5 ${path.length === 0 ? 'bg-surface-2 font-semibold text-ink' : 'text-accent hover:underline'}`}
        >
          root
        </button>
        {path.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <span className="text-ink-3" aria-hidden>
              ›
            </span>
            <button
              type="button"
              onClick={() => {
                setPath((q) => q.slice(0, i + 1));
                setChosen(null);
              }}
              className={`rounded px-1.5 py-0.5 font-mono text-xs ${i === path.length - 1 ? 'bg-surface-2 font-semibold text-ink' : 'text-accent hover:underline'}`}
            >
              {p.child.label}
            </button>
          </span>
        ))}
      </nav>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]">
        <span>
          <span className="text-ink-3">rows</span> <span className="font-mono">{idx.length}</span>
        </span>
        <ClassBar data={data} counts={counts} label={classLabel} />
        <span>
          <span className="text-ink-3">entropy</span> <span className="font-mono">{f4(H)}</span> <span className="text-ink-3">bits</span>
        </span>
        <span>
          <span className="text-ink-3">Gini</span> <span className="font-mono">{f4(G)}</span>
        </span>
      </div>

      {pure || avail.length === 0 || !best ? (
        <div className="rounded-lg border border-line px-3 py-2 text-[13px] text-ink-2">
          {pure
            ? `This node is pure: every row has ${classLabel} = ${data.classNames[counts.findIndex((c) => c > 0)]}. It becomes a leaf.`
            : 'No attribute can split these rows further, so this node becomes a leaf labelled with the majority class.'}
        </div>
      ) : (
        <>
          <div className="text-xs text-ink-3">
            Candidate splits at this node. Click a row to see its partition; the best under {MEASURE_LABEL[measure].toLowerCase()} is marked ★.
          </div>
          <div className="-mt-1 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-120 text-[13px] tabular-nums">
              <caption className="sr-only">Candidate splits</caption>
              <thead className="bg-surface-2 text-xs text-ink-3">
                <tr>
                  <th className="px-2 py-1 text-left font-medium">attribute</th>
                  <th className={`px-2 py-1 text-right font-medium ${measure === 'gain' ? 'text-ink' : ''}`}>gain</th>
                  <th className="px-2 py-1 text-right font-medium">split info</th>
                  <th className={`px-2 py-1 text-right font-medium ${measure === 'gainratio' ? 'text-ink' : ''}`}>gain ratio</th>
                  <th className="px-2 py-1 text-right font-medium">Gini after</th>
                  <th className={`px-2 py-1 text-right font-medium ${measure === 'gini' ? 'text-ink' : ''}`}>ΔGini</th>
                </tr>
              </thead>
              <tbody>
                {evals.map((e) => {
                  const isBest = best && e.attr === best.attr;
                  const isSel = sel && e.attr === sel.attr;
                  return (
                    <tr key={e.attr} className={`cursor-pointer border-t border-line hover:bg-surface-2 ${isSel ? 'bg-surface-2' : ''}`} onClick={() => setChosen(e.attr)}>
                      <td className="px-2 py-1">
                        <button
                          type="button"
                          onClick={() => setChosen(e.attr)}
                          aria-pressed={!!isSel}
                          className={`text-left font-mono text-xs ${isSel ? 'font-semibold text-ink underline decoration-accent decoration-2 underline-offset-2' : 'text-ink'}`}
                        >
                          {isBest ? '★ ' : ''}
                          {data.attributes[e.attr]}
                          {e.numeric && e.threshold !== undefined ? ` ≤ ${Math.round(e.threshold * 1000) / 1000}` : ''}
                        </button>
                      </td>
                      {e.valid ? (
                        <>
                          <Cell v={e.gain} hot={measure === 'gain' && !!isBest} />
                          <Cell v={e.splitInfo} />
                          <Cell v={e.ratio} hot={measure === 'gainratio' && !!isBest} />
                          <Cell v={e.giniSplit} />
                          <Cell v={e.dGini} hot={measure === 'gini' && !!isBest} />
                        </>
                      ) : (
                        <td colSpan={5} className="px-2 py-1 text-right text-xs text-ink-3">
                          one value only: no split
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {sel && sel.valid && <Partition data={data} s={sel} H={H} G={G} n={idx.length} onDescend={(c) => descend(sel, c)} classLabel={classLabel} />}
        </>
      )}

      <details className="rounded-lg border border-line text-[13px]">
        <summary className="cursor-pointer px-3 py-1.5 text-ink-2">Rows at this node ({idx.length})</summary>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full text-xs">
            <thead className="bg-surface-2 text-ink-3">
              <tr>
                {data.attributes.map((a) => (
                  <th key={a} className="px-2 py-0.5 text-left font-medium">
                    {a}
                  </th>
                ))}
                <th className="px-2 py-0.5 text-left font-medium">{classLabel}</th>
              </tr>
            </thead>
            <tbody>
              {idx.map((i) => (
                <tr key={i} className="border-t border-line font-mono">
                  {data.rows[i].map((v, j) => (
                    <td key={j} className="px-2 py-0.5">
                      {v}
                    </td>
                  ))}
                  <td
                    className="px-2 py-0.5 font-semibold"
                    style={{
                      color: CLASS_COLORS[data.classNames.indexOf(data.classes[i]) % CLASS_COLORS.length],
                    }}
                  >
                    {data.classes[i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {tree && (
        <div className="overflow-x-auto rounded-lg border border-line px-3 py-2">
          <div className="mb-1 text-xs text-ink-3">
            Greedy tree grown by {MEASURE_LABEL[measure].toLowerCase()} (stops at pure nodes or when no split helps). Leaf counts are [{data.classNames.join(', ')}].
          </div>
          <TreeView data={data} node={tree} depth={0} />
        </div>
      )}
    </Frame>
  );
}

function Cell({ v, hot }: { v: number; hot?: boolean }) {
  return <td className={`px-2 py-1 text-right font-mono text-xs ${hot ? 'font-bold text-accent' : ''}`}>{f4(v)}</td>;
}

function ClassBar({ data, counts, label }: { data: TreeData; counts: number[]; label: string }) {
  const n = counts.reduce((a, b) => a + b, 0) || 1;
  return (
    <span className="inline-flex min-w-0 flex-wrap items-center gap-2">
      <span className="flex h-3 w-24 overflow-hidden rounded bg-surface" aria-hidden>
        {counts.map((c, k) =>
          c > 0 ? (
            <span
              key={k}
              style={{
                width: `${(100 * c) / n}%`,
                background: CLASS_COLORS[k % CLASS_COLORS.length],
              }}
            />
          ) : null,
        )}
      </span>
      <span className="font-mono text-xs">
        {data.classNames.map((cn, k) => (
          <span key={cn} className="mr-1.5">
            <span style={{ color: CLASS_COLORS[k % CLASS_COLORS.length] }}>■</span> {label}={cn}: {counts[k]}
          </span>
        ))}
      </span>
    </span>
  );
}

function Partition({
  data,
  s,
  H,
  G,
  n,
  onDescend,
  classLabel,
}: {
  data: TreeData;
  s: SplitEval;
  H: number;
  G: number;
  n: number;
  onDescend: (c: Child) => void;
  classLabel: string;
}) {
  const kids = s.children.filter((c) => c.idx.length > 0);
  const terms = kids.map((c) => `\\tfrac{${c.idx.length}}{${n}}(${c.entropy.toFixed(3)})`).join(' + ');
  const gTerms = kids.map((c) => `\\tfrac{${c.idx.length}}{${n}}(${c.gini.toFixed(3)})`).join(' + ');
  const name = data.attributes[s.attr].replace(/[^A-Za-z0-9]/g, '');
  return (
    <div className="space-y-2 rounded-lg border border-line p-2">
      <div className="text-xs text-ink-3">
        Split on <span className="font-mono text-ink">{data.attributes[s.attr]}</span>: click a child to explore it.
      </div>
      <ul className="space-y-1">
        {kids.map((c) => {
          const pure = c.counts.filter((x) => x > 0).length <= 1;
          return (
            <li key={c.label}>
              <button
                type="button"
                onClick={() => onDescend(c)}
                className="flex w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-line px-2 py-1 text-left hover:border-accent hover:bg-surface-2"
                title={`Descend into ${c.label}`}
              >
                <span className="min-w-[7rem] font-mono text-xs text-ink">{c.label}</span>
                <ClassBar data={data} counts={c.counts} label={classLabel} />
                <span className="font-mono text-[11px] text-ink-3">
                  H {c.entropy.toFixed(3)} · Gini {c.gini.toFixed(3)}
                  {pure ? ' · pure' : ''}
                </span>
                <span className="ml-auto text-xs text-accent" aria-hidden>
                  ›
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="space-y-1.5 overflow-x-auto py-1 text-[13px]">
        <div>
          <Tex>{`\\mathrm{Info}_{\\mathit{${name}}}(D) = ${terms} = ${s.info.toFixed(4)}`}</Tex>
        </div>
        <div>
          <Tex>{`\\mathrm{Gain} = ${H.toFixed(4)} - ${s.info.toFixed(4)} = ${f4(s.gain)},\\quad \\mathrm{GainRatio} = \\frac{${f4(s.gain)}}{${s.splitInfo.toFixed(4)}} = ${f4(s.ratio)}`}</Tex>
        </div>
        <div>
          <Tex>{`\\mathrm{Gini}_{\\mathit{${name}}}(D) = ${gTerms} = ${s.giniSplit.toFixed(4)},\\quad \\Delta\\mathrm{Gini} = ${G.toFixed(4)} - ${s.giniSplit.toFixed(4)} = ${f4(s.dGini)}`}</Tex>
        </div>
      </div>
    </div>
  );
}

function TreeView({ data, node, depth }: { data: TreeData; node: GrownNode; depth: number }) {
  if (!node.split) {
    const k = node.counts.indexOf(Math.max(...node.counts));
    return (
      <span className="font-mono text-xs">
        → <span style={{ color: CLASS_COLORS[k % CLASS_COLORS.length] }}>{data.classNames[k]}</span> <span className="text-ink-3">[{node.counts.join(', ')}]</span>
      </span>
    );
  }
  return (
    <ul className={depth ? 'ml-4 border-l border-line pl-2' : ''}>
      {node.children.map(({ child, node: sub }) => (
        <li key={child.label} className="py-0.5">
          <span className="font-mono text-xs text-ink">{child.label}</span> <TreeView data={data} node={sub} depth={depth + 1} />
        </li>
      ))}
    </ul>
  );
}
