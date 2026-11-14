/**
 * mining-cube: OLAP on a small built-in sales cube with three dimensions and concept hierarchies:
 * time (year → quarter → month, 2024–2025), location (region → city) and product (category →
 * item); measure revenue (sum), number of sales (count) or average sale (avg = sum / count).
 * Roll up and drill down each dimension, slice the third dimension to one value, pivot rows and
 * columns. The cross-tab has row and column totals; the cuboid lattice highlights the group-by
 * being shown; the equivalent SQL is written out.
 *
 * Params:
 *   rows     "time" | "location" | "product"   dimension down the side   default "time"
 *   cols     "time" | "location" | "product"   dimension across the top  default "product" (must differ from rows)
 *   measure  "sum" | "count" | "avg"                                     default "sum"
 *   title    string                                                      default "Data cube: roll-up, drill-down, slice"
 *   caption  string
 */
import { useId, useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { oneOf, str } from '../kit/params';
import { Button, Frame, Readout, Segmented } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { aggValue, DIM_LABEL, DIMS, LEVELS, memberOf, salesFacts, type Agg, type Dim } from '../kit/mining-core';

type Measure = 'sum' | 'count' | 'avg';
const MEASURE_LABEL: Record<Measure, string> = {
  sum: 'Revenue (sum)',
  count: 'Sales (count)',
  avg: 'Average sale',
};
const DEFAULT_LEVEL: Record<Dim, string> = {
  time: 'quarter',
  location: 'region',
  product: 'category',
};

const fmtVal = (v: number | null, m: Measure) => (v === null ? '–' : m === 'count' ? v.toLocaleString('en-US') : Math.round(v).toLocaleString('en-US'));

export default function MiningCube({ params }: WidgetProps) {
  const r0 = oneOf(params, 'rows', DIMS, 'time');
  const c0 = oneOf(params, 'cols', DIMS, r0 === 'product' ? 'time' : 'product');
  if (r0 === c0) throw new Error('parameters "rows" and "cols" must name different dimensions');
  const m0 = oneOf(params, 'measure', ['sum', 'count', 'avg'] as const, 'sum');

  const [rowDim, setRowDim] = useState<Dim>(r0);
  const [colDim, setColDim] = useState<Dim>(c0);
  const [measure, setMeasure] = useState<Measure>(m0);
  const [level, setLevel] = useState<Record<Dim, string>>(DEFAULT_LEVEL);
  const [slice, setSlice] = useState<string>('all');
  const sliceDim = DIMS.find((d) => d !== rowDim && d !== colDim)!;
  const sliceId = useId();

  const facts = salesFacts();
  const sliceMembers = useMemo(() => {
    const m = new Map<string, string>();
    for (const f of facts) {
      const mm = memberOf(f, sliceDim, level[sliceDim]);
      m.set(mm.key, mm.label);
    }
    return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [facts, sliceDim, level]);
  const sliceOk = slice === 'all' || sliceMembers.some(([k]) => k === slice);
  const activeSlice = sliceOk ? slice : 'all';

  const cube = useMemo(() => {
    const rowM = new Map<string, string>();
    const colM = new Map<string, string>();
    const cell = new Map<string, Agg>();
    const rowT = new Map<string, Agg>();
    const colT = new Map<string, Agg>();
    const total: Agg = { count: 0, revenue: 0 };
    const apex: Agg = { count: 0, revenue: 0 };
    const add = (m: Map<string, Agg>, k: string, f: { count: number; revenue: number }) => {
      const a = m.get(k) ?? { count: 0, revenue: 0 };
      a.count += f.count;
      a.revenue += f.revenue;
      m.set(k, a);
    };
    for (const f of facts) {
      apex.count += f.count;
      apex.revenue += f.revenue;
      if (activeSlice !== 'all' && memberOf(f, sliceDim, level[sliceDim]).key !== activeSlice) continue;
      const r = memberOf(f, rowDim, level[rowDim]);
      const c = memberOf(f, colDim, level[colDim]);
      rowM.set(r.key, r.label);
      colM.set(c.key, c.label);
      add(cell, `${r.key}|${c.key}`, f);
      add(rowT, r.key, f);
      add(colT, c.key, f);
      total.count += f.count;
      total.revenue += f.revenue;
    }
    const rowsS = [...rowM.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    const colsS = [...colM.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    let max = 0;
    for (const a of cell.values()) {
      const v = aggValue(a, measure);
      if (v !== null && v > max) max = v;
    }
    return { rowsS, colsS, cell, rowT, colT, total, apex, max };
  }, [facts, rowDim, colDim, sliceDim, level, activeSlice, measure]);

  const setLvl = (d: Dim, l: string) => {
    setLevel((s) => ({ ...s, [d]: l }));
    if (d === sliceDim) setSlice('all');
  };
  const pivot = () => {
    setRowDim(colDim);
    setColDim(rowDim);
  };
  const chooseRows = (d: Dim) => {
    if (d === rowDim) return;
    if (d === colDim) return pivot();
    setRowDim(d);
    setSlice('all');
  };
  const chooseCols = (d: Dim) => {
    if (d === colDim) return;
    if (d === rowDim) return pivot();
    setColDim(d);
    setSlice('all');
  };

  // Group-by of the cuboid being shown: the row and column dimensions not rolled up to "all".
  const groupDims = DIMS.filter((d) => (d === rowDim || d === colDim) && level[d] !== 'all');
  const agg = measure === 'sum' ? 'SUM(revenue)' : measure === 'count' ? 'COUNT(*)' : 'AVG(revenue)';
  const sliceLabel = sliceMembers.find(([k]) => k === activeSlice)?.[1];
  const groupCols = [rowDim, colDim].filter((d) => level[d] !== 'all').map((d) => level[d]);
  const sql = `SELECT ${[...groupCols, agg].join(', ')}\nFROM sales${activeSlice !== 'all' ? `\nWHERE ${level[sliceDim]} = '${sliceLabel}'` : ''}${groupCols.length ? `\nGROUP BY ${groupCols.join(', ')}` : ''};`;

  const shade = (v: number | null) => (v === null || cube.max <= 0 ? undefined : `color-mix(in srgb, var(--plot-1) ${Math.round((v / cube.max) * 38)}%, transparent)`);

  return (
    <Frame title={str(params, 'title', 'Data cube: roll-up, drill-down, slice')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap items-end gap-3">
        <Segmented label="Rows" options={DIMS.map((d) => ({ value: d, label: DIM_LABEL[d] }))} value={rowDim} onChange={chooseRows} />
        <Segmented label="Columns" options={DIMS.map((d) => ({ value: d, label: DIM_LABEL[d] }))} value={colDim} onChange={chooseCols} />
        <Button onClick={pivot} title="Swap rows and columns">
          Pivot ⇄
        </Button>
        <Segmented
          label="Measure"
          options={(['sum', 'count', 'avg'] as const).map((m) => ({
            value: m,
            label: MEASURE_LABEL[m],
          }))}
          value={measure}
          onChange={setMeasure}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {DIMS.map((d) => {
          const lv = LEVELS[d];
          const i = lv.indexOf(level[d]);
          return (
            <div key={d} className="min-w-0 rounded-lg border border-line px-2 py-1.5">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-1 text-[13px]">
                <span className="text-ink-2">
                  {DIM_LABEL[d]} <span className="text-xs text-ink-3">({d === rowDim ? 'rows' : d === colDim ? 'columns' : 'slice'})</span>
                </span>
                <span className="flex gap-1">
                  <Button onClick={() => setLvl(d, lv[i - 1])} disabled={i === 0} title={`Roll up ${DIM_LABEL[d].toLowerCase()} to ${lv[i - 1] ?? ''}`}>
                    <span className="whitespace-nowrap">▲ Roll up</span>
                  </Button>
                  <Button onClick={() => setLvl(d, lv[i + 1])} disabled={i === lv.length - 1} title={`Drill down ${DIM_LABEL[d].toLowerCase()} to ${lv[i + 1] ?? ''}`}>
                    <span className="whitespace-nowrap">▼ Drill</span>
                  </Button>
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1 font-mono text-[11px] text-ink-3" aria-label={`${DIM_LABEL[d]} hierarchy`}>
                {lv.map((l, t) => (
                  <span key={l} className="inline-flex items-center gap-1">
                    {t > 0 && <span aria-hidden>→</span>}
                    <button
                      type="button"
                      onClick={() => setLvl(d, l)}
                      aria-pressed={t === i}
                      className={`rounded px-1 ${t === i ? 'bg-accent/15 font-semibold text-ink' : 'hover:text-ink'}`}
                    >
                      {l}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[13px]">
        <label htmlFor={sliceId} className="text-ink-2">
          Slice {DIM_LABEL[sliceDim].toLowerCase()} ({level[sliceDim]}):
        </label>
        <select id={sliceId} value={activeSlice} onChange={(e) => setSlice(e.target.value)} disabled={level[sliceDim] === 'all'} className="input w-auto py-1 text-[13px]">
          <option value="all">All (no slice)</option>
          {level[sliceDim] !== 'all' &&
            sliceMembers.map(([k, l]) => (
              <option key={k} value={k}>
                {l}
              </option>
            ))}
        </select>
        {level[sliceDim] === 'all' && <span className="text-xs text-ink-3">drill down {DIM_LABEL[sliceDim].toLowerCase()} to slice it</span>}
      </div>

      <div className="max-h-[26rem] overflow-auto rounded-lg border border-line">
        <table className="w-full text-[12px] tabular-nums">
          <caption className="sr-only">
            {MEASURE_LABEL[measure]} by {level[rowDim]} and {level[colDim]}
          </caption>
          <thead className="sticky top-0 bg-surface-2 text-ink-3">
            <tr>
              <th className="px-2 py-1 text-left font-medium">
                {level[rowDim]} \ {level[colDim]}
              </th>
              {cube.colsS.map(([k, l]) => (
                <th key={k} className="px-2 py-1 text-right font-medium text-ink-2">
                  {l}
                </th>
              ))}
              {cube.colsS.length > 1 && <th className="px-2 py-1 text-right font-semibold text-ink">Total</th>}
            </tr>
          </thead>
          <tbody>
            {cube.rowsS.map(([rk, rl]) => (
              <tr key={rk} className="border-t border-line">
                <th className="whitespace-nowrap px-2 py-0.5 text-left font-medium text-ink-2">{rl}</th>
                {cube.colsS.map(([ck]) => {
                  const v = aggValue(cube.cell.get(`${rk}|${ck}`), measure);
                  return (
                    <td key={ck} className="px-2 py-0.5 text-right font-mono" style={{ background: shade(v) }}>
                      {fmtVal(v, measure)}
                    </td>
                  );
                })}
                {cube.colsS.length > 1 && <td className="px-2 py-0.5 text-right font-mono font-semibold">{fmtVal(aggValue(cube.rowT.get(rk), measure), measure)}</td>}
              </tr>
            ))}
            {cube.rowsS.length > 1 && (
              <tr className="border-t-2 border-line">
                <th className="px-2 py-0.5 text-left font-semibold text-ink">Total</th>
                {cube.colsS.map(([ck]) => (
                  <td key={ck} className="px-2 py-0.5 text-right font-mono font-semibold">
                    {fmtVal(aggValue(cube.colT.get(ck), measure), measure)}
                  </td>
                ))}
                {cube.colsS.length > 1 && <td className="px-2 py-0.5 text-right font-mono font-bold">{fmtVal(aggValue(cube.total, measure), measure)}</td>}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Lattice group={groupDims} level={level} />
        <div className="space-y-2">
          <pre className="overflow-x-auto rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-[12px] leading-5 text-ink">{sql}</pre>
          <div className="grid grid-cols-2 gap-2">
            <Readout label={activeSlice === 'all' ? 'Grand total' : `Total in slice ${sliceLabel}`} value={fmtVal(aggValue(cube.total, measure), measure)} />
            <Readout label="Apex cuboid (all, all, all)" value={fmtVal(aggValue(cube.apex, measure), measure)} />
          </div>
          <p className="text-[12px] leading-5 text-ink-3">
            Sum and count are distributive: a rolled-up cell is the sum of the cells below it. Average is algebraic: it is computed here as total revenue ÷ total sales, never as an
            average of averages. Revenue is in US dollars.
          </p>
        </div>
      </div>
    </Frame>
  );
}

/** The 3-D cuboid lattice, from the apex (no group-by) down to the base cuboid. */
function Lattice({ group, level }: { group: Dim[]; level: Record<Dim, string> }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.max(260, size.width || 320);
  const H = 196;
  const short: Record<Dim, string> = { time: 'T', location: 'L', product: 'P' };
  const layers: Dim[][][] = [
    [[]],
    [['time'], ['location'], ['product']],
    [
      ['time', 'location'],
      ['time', 'product'],
      ['location', 'product'],
    ],
    [['time', 'location', 'product']],
  ];
  const pos = (layer: number, i: number, n: number): [number, number] => [((i + 0.5) * W) / n, 22 + layer * 50];
  const sameSet = (a: Dim[], b: Dim[]) => a.length === b.length && a.every((x) => b.includes(x));
  const nodes = layers.flatMap((ly, li) => ly.map((dims, i) => ({ dims, xy: pos(li, i, ly.length), li })));
  const edges: [number, number][] = [];
  nodes.forEach((a, i) =>
    nodes.forEach((b, j) => {
      if (b.li === a.li + 1 && a.dims.every((d) => b.dims.includes(d))) edges.push([i, j]);
    }),
  );
  const label = (dims: Dim[]) => (dims.length === 0 ? 'apex ()' : dims.length === 3 ? 'base (T, L, P)' : `(${dims.map((d) => short[d]).join(', ')})`);
  return (
    <div ref={ref} className="min-w-0">
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Cuboid lattice; showing the cuboid grouped by ${group.length ? group.map((d) => level[d]).join(' and ') : 'nothing (the apex)'}`}
        className="block rounded-lg border border-line bg-surface"
      >
        {edges.map(([i, j]) => (
          <line key={`${i}-${j}`} x1={nodes[i].xy[0]} y1={nodes[i].xy[1]} x2={nodes[j].xy[0]} y2={nodes[j].xy[1]} stroke="var(--plot-grid)" strokeWidth={1.5} />
        ))}
        {nodes.map((n, i) => {
          const on = sameSet(n.dims, group);
          const w = n.li === 0 || n.li === 3 ? 92 : 64;
          return (
            <g key={i}>
              <rect
                x={n.xy[0] - w / 2}
                y={n.xy[1] - 11}
                width={w}
                height={22}
                rx={6}
                fill={on ? 'var(--color-accent)' : 'var(--color-surface-2)'}
                stroke={on ? 'var(--color-accent)' : 'var(--color-line)'}
              />
              <text
                x={n.xy[0]}
                y={n.xy[1] + 4}
                textAnchor="middle"
                fontSize={11}
                fontFamily="ui-monospace, monospace"
                fill={on ? 'var(--color-surface)' : 'var(--plot-text)'}
                fontWeight={on ? 700 : 400}
              >
                {label(n.dims)}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-1 text-[12px] text-ink-3">
        Showing cuboid {group.length ? `(${group.map((d) => level[d]).join(', ')})` : '() — the apex'}. T = time, L = location, P = product. The slice is a WHERE condition, not a
        group-by.
      </div>
    </div>
  );
}
