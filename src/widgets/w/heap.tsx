/**
 * heap: a binary min- or max-heap drawn both as a tree and as its array, with the index
 * arithmetic (children 2i+1, 2i+2, parent ⌊(i−1)/2⌋) shown for the node being worked on.
 * Insert with sift-up, extract with sift-down, and bottom-up build-heap with its step counts.
 * Edges that violate the heap property are drawn dashed in red.
 *
 * Params:
 *   kind     "min" | "max"                                    default "min"
 *   values   number[]  initial elements (up to 31)            default [4, 10, 3, 5, 1, 8, 7, 2, 9]
 *   start    "heap" | "build"  heapify silently, or show the
 *            array as given with the build-heap steps loaded   default "heap"
 *   title    string                                           default "Binary heap"
 *   caption  string
 */
import { useId, useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { numArray, oneOf, str } from '../kit/params';
import { Button, Frame, Readout } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { heapBuild, heapExtract, heapify, heapInsert, isHeap, type HMk, type HeapKind, type HeapRun, type HeapSnap } from '../kit/dsa-heap';
import { Field, Legend, ListInput, MARK, StepControls, mulberry32, useStepper, type MarkKind } from '../kit/dsa-steps';

const MAXN = 31;
const MK: Record<HMk, MarkKind> = { compare: 'compare', swap: 'swap', active: 'active', out: 'found' };

function HeapView({ s, kind }: { s: HeapSnap; kind: HeapKind }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const mid = `heap-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const W = Math.max(240, size.width || 600);
  const n = s.a.length;
  const depth = n === 0 ? 0 : Math.floor(Math.log2(n));
  const levelH = 46;
  const leaves = 2 ** depth;
  const r = Math.max(9, Math.min(17, (W / leaves) * 0.36));
  const pos = (i: number) => {
    const d = Math.floor(Math.log2(i + 1));
    const p = i - (2 ** d - 1);
    return { x: ((p + 0.5) / 2 ** d) * W, y: 22 + d * levelH };
  };
  const treeH = 22 + depth * levelH + r + 18;
  // array row
  const cw = Math.min(38, (W - 8) / Math.max(n, 1));
  const ax = (i: number) => 4 + (W - 8 - cw * n) / 2 + i * cw;
  const ay = treeH + 30;
  const H = ay + 34 + 18;
  const f = s.focus;
  const kids = f === null ? [] : [2 * f + 1, 2 * f + 2].filter((c) => c < n);
  const par = f !== null && f > 0 ? (f - 1) >> 1 : null;
  const bad = (i: number) => i > 0 && (kind === 'min' ? s.a[i] < s.a[(i - 1) >> 1] : s.a[i] > s.a[(i - 1) >> 1]);
  const fillOf = (i: number) => {
    const m = s.mk[i];
    return m ? MARK[MK[m]].color : 'var(--color-surface-2)';
  };
  const arc = (i: number, j: number, color: string) => {
    const x1 = ax(i) + cw / 2;
    const x2 = ax(j) + cw / 2;
    const h = Math.min(28, 8 + Math.abs(x2 - x1) * 0.18);
    return <path d={`M${x1},${ay - 2} C${x1},${ay - h} ${x2},${ay - h} ${x2},${ay - 4}`} fill="none" stroke={color} strokeWidth={1.5} markerEnd={`url(#${mid})`} />;
  };
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${kind}-heap with ${n} elements: ${s.a.join(', ')}`} className="block select-none rounded-lg bg-surface" style={{ fontVariantNumeric: 'tabular-nums' }}>
        <defs>
          <marker id={mid} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" fill="var(--color-accent)" />
          </marker>
        </defs>
        {s.a.map((_, i) => {
          if (i === 0) return null;
          const a = pos(i);
          const b = pos((i - 1) >> 1);
          const v = bad(i);
          return <line key={`e${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={v ? 'var(--plot-2)' : 'var(--plot-axis)'} strokeWidth={v ? 2 : 1.5} strokeDasharray={v ? '4 3' : undefined} />;
        })}
        {s.a.map((v, i) => {
          const { x, y } = pos(i);
          const m = s.mk[i];
          const marked = !!m;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r={r} fill={fillOf(i)} stroke={i === f ? 'var(--color-ink)' : marked ? 'var(--color-ink)' : 'var(--color-line)'} strokeWidth={i === f ? 2.5 : 1.25} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={Math.min(13, r * 0.95)} fontWeight={600} fill={marked ? 'var(--color-surface)' : 'var(--color-ink)'}>
                {v}
              </text>
              <text x={x} y={y + r + 11} textAnchor="middle" fontSize={9.5} fill="var(--plot-text)">
                {i}
              </text>
              {m && r >= 11 && (
                <text x={x + r * 0.8} y={y - r * 0.6} textAnchor="middle" fontSize={10} fontWeight={800} fill={MARK[MK[m]].color}>
                  {MARK[MK[m]].glyph}
                </text>
              )}
            </g>
          );
        })}
        {n === 0 && (
          <text x={W / 2} y={40} textAnchor="middle" fontSize={12} fill="var(--plot-text)">
            empty heap
          </text>
        )}
        <text x={4} y={ay - 18} fontSize={10.5} fill="var(--plot-text)">
          array
        </text>
        {f !== null && kids.map((c) => <g key={`k${c}`}>{arc(f, c, 'var(--color-accent)')}</g>)}
        {s.a.map((v, i) => {
          const m = s.mk[i];
          return (
            <g key={`c${i}`}>
              <rect x={ax(i) + 1} y={ay} width={cw - 2} height={26} rx={3} fill={fillOf(i)} stroke={i === f ? 'var(--color-ink)' : 'var(--color-line)'} strokeWidth={i === f ? 2 : 1} />
              <text x={ax(i) + cw / 2} y={ay + 17} textAnchor="middle" fontSize={Math.min(12, cw * 0.42)} fontWeight={m ? 700 : 400} fill={m ? 'var(--color-surface)' : 'var(--color-ink)'}>
                {v}
              </text>
              {(cw >= 13 || i % 2 === 0) && (
                <text x={ax(i) + cw / 2} y={ay + 40} textAnchor="middle" fontSize={Math.min(10, cw * 0.5)} fill="var(--plot-text)">
                  {i}
                </text>
              )}
            </g>
          );
        })}
        {par !== null && f !== null && (
          <text x={ax(par) + cw / 2} y={ay - 4} textAnchor="middle" fontSize={10} fontWeight={700} fill="var(--color-accent)">
            p
          </text>
        )}
      </svg>
    </div>
  );
}

export default function Heap({ params }: WidgetProps) {
  const kind0 = oneOf(params, 'kind', ['min', 'max'] as const, 'min');
  const values0 = numArray(params, 'values', [4, 10, 3, 5, 1, 8, 7, 2, 9]);
  if (values0.length > MAXN) throw new Error(`parameter "values": at most ${MAXN} elements`);
  const start = oneOf(params, 'start', ['heap', 'build'] as const, 'heap');
  const title = str(params, 'title', 'Binary heap');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [kind, setKind] = useState<HeapKind>(kind0);
  const initial = useMemo<HeapRun>(() => {
    if (start === 'build') return heapBuild(values0, kind0);
    const h = heapify(values0, kind0);
    return { snaps: [{ a: h, mk: {}, focus: null, cmp: 0, swaps: 0, d: `A ${kind0}-heap of ${h.length} elements. Insert, extract or rebuild.` }], final: h };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [run, setRun] = useState<HeapRun>(initial);
  const [base, setBase] = useState<number[]>(initial.final);
  const [key, setKey] = useState('6');
  const [seed, setSeed] = useState(5);
  const st = useStepper(run.snaps.length, run, 3);
  const s = run.snaps[st.i];

  const go = (r: HeapRun) => {
    setRun(r);
    setBase(r.final);
    st.restart(r.snaps.length > 1);
  };
  const insert = (x: number) => {
    if (base.length >= MAXN) return;
    go(heapInsert(base, x, kind));
  };
  const insertKey = () => {
    const x = Number(key);
    if (Number.isFinite(x) && Number.isInteger(x)) insert(x);
  };

  const n = s.a.length;
  const f = s.focus;
  const arith =
    f === null || f >= n
      ? 'The node being worked on is outlined; its index arithmetic appears here.'
      : `i = ${f}: parent ⌊(i−1)/2⌋ = ${f === 0 ? '— (root)' : (f - 1) >> 1}; children 2i+1 = ${2 * f + 1}${2 * f + 1 >= n ? ' (none, ≥ n)' : ''}, 2i+2 = ${2 * f + 2}${2 * f + 2 >= n ? ' (none, ≥ n)' : ''}.`;

  return (
    <Frame title={title} caption={caption}>
      <HeapView s={s} kind={kind} />
      <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-[12px] text-ink-2">{arith}</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Comparisons" value={s.cmp} tone="var(--plot-4)" />
        <Readout label="Swaps" value={s.swaps} tone="var(--plot-2)" />
        <Readout label="n, height ⌊log₂ n⌋" value={n ? `${n}, ${Math.floor(Math.log2(n))}` : '0'} />
        <Readout label={s.out !== undefined ? 'Extracted' : 'Heap property'} value={s.out !== undefined ? s.out : isHeap(s.a, kind) ? 'holds' : 'violated'} tone={s.out !== undefined ? MARK.found.color : isHeap(s.a, kind) ? 'var(--plot-3)' : 'var(--plot-2)'} />
      </div>
      <Legend
        items={[
          { kind: 'compare', label: 'compared' },
          { kind: 'swap', label: 'swapped' },
          { kind: 'active', label: 'current' },
          { kind: 'found', label: 'extracted root' },
          { color: 'var(--plot-2)', label: 'edge violating the heap property', dashed: true },
        ]}
      />
      <StepControls st={st} desc={s.d} />
      <div className="flex flex-wrap items-center gap-2">
        <Field label="Key" value={key} onChange={setKey} onEnter={insertKey} type="number" width="w-20" />
        <Button onClick={insertKey} disabled={base.length >= MAXN} primary>
          Insert
        </Button>
        <Button
          onClick={() => {
            const rng = mulberry32(seed);
            setSeed(seed + 1);
            insert(1 + Math.floor(rng() * 99));
          }}
          disabled={base.length >= MAXN}
        >
          Insert random
        </Button>
        <Button onClick={() => go(heapExtract(base, kind))} disabled={base.length === 0}>
          Extract-{kind}
        </Button>
        <Button
          onClick={() => {
            const k = kind === 'min' ? 'max' : 'min';
            setKind(k);
            go(heapBuild(base, k));
          }}
        >
          Switch to {kind === 'min' ? 'max' : 'min'}-heap
        </Button>
      </div>
      <ListInput
        label="Load an unordered array (up to 31 numbers), then build a heap from it bottom-up"
        values={base}
        onChange={(v) => go(heapBuild(v, kind))}
        presets={['random', 'sorted', 'reversed']}
        min={0}
        max={99}
        maxLen={MAXN}
        size={15}
      />
    </Frame>
  );
}
