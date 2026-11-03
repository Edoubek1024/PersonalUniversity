/**
 * tree-lab: binary search tree insert / delete (leaf, one child, two children via the in-order
 * successor) / search with the path highlighted; AVL mode with balance factors and stepped
 * single and double rotations; left-leaning red-black mode (Sedgewick's LLRB, insert and
 * delete). Height is compared with log₂ n. Layout: x = in-order rank, y = depth, so the picture
 * is also the sorted order read left to right.
 *
 * Params:
 *   mode     "bst" | "avl" | "rb"                            default "bst"
 *   modes    string[]  modes offered                        default ["bst", "avl", "rb"]
 *   keys     number[]  inserted in this order at the start   default [50, 30, 70, 20, 40, 60, 80]
 *   key      number    initial value of the key field        default 35
 *   title    string                                         default "Binary search tree lab"
 *   caption  string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Readout, Segmented } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { replay, runTreeOp, sizeOf, stillSnap, type FlatNode, type THl, type TNode, type TreeMode, type TreeOp, type TreeRun, type TreeSnap } from '../kit/dsa-tree';
import { Field, Legend, ListInput, MARK, StepControls, log2, mulberry32, useStepper, type MarkKind } from '../kit/dsa-steps';

const MODES = ['bst', 'avl', 'rb'] as const;
const MODE_LABEL: Record<TreeMode, string> = { bst: 'Plain BST', avl: 'AVL', rb: 'Red-black (LLRB)' };
const HL: Record<THl, { kind: MarkKind; glyph: string }> = {
  path: { kind: 'path', glyph: '' },
  compare: { kind: 'compare', glyph: '?' },
  found: { kind: 'found', glyph: '★' },
  new: { kind: 'active', glyph: '+' },
  remove: { kind: 'swap', glyph: '✕' },
  succ: { kind: 'pivot', glyph: 's' },
  rot: { kind: 'active', glyph: '↻' },
};
const MAXN = 31;

function layout(s: TreeSnap) {
  const byId = new Map<number, FlatNode>(s.nodes.map((n) => [n.id, n]));
  const pos = new Map<number, { rank: number; depth: number; h: number }>();
  let rank = 0;
  let maxDepth = 0;
  const walk = (id: number | null, depth: number): number => {
    if (id === null) return -1;
    const n = byId.get(id)!;
    const hl = walk(n.l, depth + 1);
    const r = rank++;
    const hr = walk(n.r, depth + 1);
    const h = 1 + Math.max(hl, hr);
    pos.set(id, { rank: r, depth, h });
    maxDepth = Math.max(maxDepth, depth);
    return h;
  };
  walk(s.root, 0);
  const bf = (id: number) => {
    const n = byId.get(id)!;
    const hl = n.l === null ? -1 : pos.get(n.l)!.h;
    const hr = n.r === null ? -1 : pos.get(n.r)!.h;
    return hl - hr;
  };
  return { byId, pos, count: rank, maxDepth, bf };
}

function TreeView({ s, mode }: { s: TreeSnap; mode: TreeMode }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const avail = Math.max(240, size.width || 600);
  const L = useMemo(() => layout(s), [s]);
  const n = L.count;
  const minCol = 26;
  const W = Math.max(avail, n * minCol + 8);
  const col = (W - 8) / Math.max(1, n);
  const r = Math.max(10, Math.min(17, col * 0.4));
  const levelH = 46;
  const H = Math.max(80, 26 + L.maxDepth * levelH + r + 16);
  const xy = (id: number) => {
    const p = L.pos.get(id)!;
    return { x: 4 + (p.rank + 0.5) * col, y: 22 + p.depth * levelH };
  };
  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${MODE_LABEL[mode]} with ${n} keys`} className="block select-none rounded-lg bg-surface" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {n === 0 && (
          <text x={avail / 2} y={44} textAnchor="middle" fontSize={12} fill="var(--plot-text)">
            empty tree
          </text>
        )}
        {s.nodes.map((nd) =>
          [nd.l, nd.r].map((c) => {
            if (c === null) return null;
            const a = xy(nd.id);
            const b = xy(c);
            const red = mode === 'rb' && L.byId.get(c)!.red;
            const onPath = s.hl[c] && s.hl[nd.id];
            return <line key={`${nd.id}-${c}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={red ? 'var(--plot-2)' : onPath ? 'var(--plot-5)' : 'var(--plot-axis)'} strokeWidth={red ? 4 : onPath ? 2.5 : 1.5} />;
          }),
        )}
        {s.nodes.map((nd) => {
          const { x, y } = xy(nd.id);
          const h = s.hl[nd.id];
          const hk = h ? HL[h] : null;
          const ring = hk ? MARK[hk.kind].color : null;
          const red = mode === 'rb' && nd.red;
          const fill = mode === 'rb' ? (red ? 'var(--plot-2)' : 'var(--color-surface-2)') : h && h !== 'path' ? ring! : 'var(--color-surface-2)';
          const darkText = mode === 'rb' ? red : !!(h && h !== 'path');
          const bf = mode === 'avl' ? L.bf(nd.id) : 0;
          const label = s.labels[nd.id];
          return (
            <g key={nd.id}>
              {ring && <circle cx={x} cy={y} r={r + 4} fill="none" stroke={ring} strokeWidth={h === 'path' ? 2 : 3} strokeDasharray={h === 'remove' ? '4 3' : undefined} />}
              <circle cx={x} cy={y} r={r} fill={fill} stroke={mode === 'rb' && !red ? 'var(--color-ink)' : 'var(--color-line)'} strokeWidth={mode === 'rb' && !red ? 2 : 1.25} />
              <text x={x} y={y + 4} textAnchor="middle" fontSize={Math.min(13, r * 0.85)} fontWeight={600} fill={darkText ? 'var(--color-surface)' : 'var(--color-ink)'}>
                {nd.key}
              </text>
              {hk?.glyph && !label && (
                <text x={x - r - 2} y={y - r + 2} textAnchor="end" fontSize={11} fontWeight={800} fill={ring!}>
                  {hk.glyph}
                </text>
              )}
              {label && (
                <text x={x} y={y - r - 6} textAnchor="middle" fontSize={11} fontWeight={800} fill="var(--color-accent)">
                  {label}
                </text>
              )}
              {mode === 'avl' && (
                <text x={x + r + 2} y={y - r + 4} fontSize={10} fontWeight={Math.abs(bf) >= 2 ? 800 : 500} fill={Math.abs(bf) >= 2 ? 'var(--plot-2)' : 'var(--plot-text)'}>
                  {bf > 0 ? `+${bf}` : bf < 0 ? `−${-bf}` : '0'}
                </text>
              )}
              {mode === 'rb' && red && r >= 12 && (
                <text x={x + r + 2} y={y - r + 4} fontSize={9.5} fontWeight={700} fill="var(--plot-2)">
                  R
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function TreeLab({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'bst');
  const offered = strArray(params, 'modes', ['bst', 'avl', 'rb']).filter((m): m is TreeMode => (MODES as readonly string[]).includes(m));
  const keys0 = numArray(params, 'keys', [50, 30, 70, 20, 40, 60, 80]);
  if (keys0.length > MAXN) throw new Error(`parameter "keys": at most ${MAXN} keys`);
  const key0 = num(params, 'key', 35);
  const title = str(params, 'title', 'Binary search tree lab');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [mode, setMode] = useState<TreeMode>(mode0);
  const initOps = useMemo<TreeOp[]>(() => keys0.map((k) => ({ op: 'insert', key: k })), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [ops, setOps] = useState<TreeOp[]>(initOps);
  const [root, setRoot] = useState<TNode | null>(() => replay(initOps, mode0));
  const still = (t: TNode | null, d: string): TreeRun => ({ snaps: [stillSnap(t, d)], root: t });
  const [run, setRun] = useState<TreeRun>(() => still(root, keys0.length ? `A ${MODE_LABEL[mode0]} built by inserting ${keys0.join(', ')} in that order.` : 'An empty tree. Insert some keys.'));
  const [keyText, setKeyText] = useState(String(key0));
  const [seed, setSeed] = useState(3);
  const [listKeys, setListKeys] = useState<number[]>(keys0);
  const st = useStepper(run.snaps.length, run, 3);
  const s = run.snaps[st.i];

  const apply = (o: TreeOp) => {
    if (o.op === 'insert' && sizeOf(root) >= MAXN) return;
    const r = runTreeOp(root, o, mode);
    setRun(r);
    setRoot(r.root);
    if (o.op !== 'search') setOps((x) => [...x, o]);
    st.restart(true);
  };
  const keyNum = () => {
    const v = Number(keyText);
    return Number.isInteger(v) && Math.abs(v) < 1000 ? v : null;
  };
  const buildFrom = (keys: number[]) => {
    let t: TNode | null = null;
    const snaps: TreeSnap[] = [];
    for (const k of keys.slice(0, MAXN)) {
      const r = runTreeOp(t, { op: 'insert', key: k }, mode);
      snaps.push(...r.snaps.slice(1));
      t = r.root;
    }
    setOps(keys.map((k) => ({ op: 'insert', key: k })));
    if (keys.length) setListKeys(keys);
    setRoot(t);
    setRun({ snaps: snaps.length ? snaps : still(null, 'Empty tree.').snaps, root: t });
    st.restart(false);
  };
  const switchMode = (m: TreeMode) => {
    setMode(m);
    const t = replay(ops, m);
    setRoot(t);
    const keys = ops.filter((o) => o.op === 'insert').map((o) => o.key);
    setRun({ snaps: [stillSnap(t, `Rebuilt as a ${MODE_LABEL[m]} by replaying the same ${ops.length} operation${ops.length === 1 ? '' : 's'}${keys.length ? ` (inserts ${keys.slice(0, 12).join(', ')}${keys.length > 12 ? '…' : ''})` : ''}.`)], root: t });
    st.restart(false);
  };

  // readouts from the snapshot on screen
  const L = useMemo(() => layout(s), [s]);
  const n = L.count;
  const h = n === 0 ? -1 : L.maxDepth;
  const bound = mode === 'avl' ? `AVL bound 1.44 log₂ n ≈ ${fmt(1.44 * log2(Math.max(2, n)), 2)}` : mode === 'rb' ? `RB bound 2 log₂(n+1) ≈ ${fmt(2 * log2(n + 1), 2)}` : `worst case n − 1 = ${Math.max(0, n - 1)}`;

  return (
    <Frame title={title} caption={caption}>
      {offered.length > 1 && <Segmented label="Tree type" value={mode} onChange={switchMode} options={offered.map((m) => ({ value: m, label: MODE_LABEL[m] }))} />}
      <TreeView s={s} mode={mode} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Keys n" value={n} />
        <Readout label="Height h" value={h < 0 ? '—' : h} tone="var(--plot-1)" />
        <Readout label="⌊log₂ n⌋ (best)" value={n ? Math.floor(log2(n)) : '—'} />
        <Readout label="Comparisons" value={s.cmp} tone="var(--plot-4)" />
      </div>
      <div className="text-[12px] text-ink-3">Height counts edges on the longest root-to-leaf path. For reference: {bound}.</div>
      <Legend
        items={[
          { kind: 'compare', label: 'comparing' },
          { kind: 'path', label: 'search path', dashed: true },
          { kind: 'active', glyph: '+', label: 'new node / rotating' },
          { kind: 'swap', glyph: '✕', label: 'being removed' },
          { kind: 'pivot', glyph: 's', label: 'in-order successor' },
          { kind: 'found', label: 'found' },
          ...(mode === 'avl' ? [{ color: 'var(--plot-2)', glyph: '±2', label: 'balance factor h(left) − h(right) beside each node; ±2 needs a rotation' }] : []),
          ...(mode === 'rb' ? [{ color: 'var(--plot-2)', glyph: 'R', label: 'red node: thick red link to its parent' }] : []),
        ]}
      />
      <StepControls st={st} desc={s.d} />
      <div className="flex flex-wrap items-center gap-2">
        <Field label="Key" value={keyText} onChange={setKeyText} onEnter={() => keyNum() !== null && apply({ op: 'insert', key: keyNum()! })} type="number" width="w-20" />
        <Button primary onClick={() => keyNum() !== null && apply({ op: 'insert', key: keyNum()! })} disabled={sizeOf(root) >= MAXN}>
          Insert
        </Button>
        <Button onClick={() => keyNum() !== null && apply({ op: 'delete', key: keyNum()! })}>Delete</Button>
        <Button onClick={() => keyNum() !== null && apply({ op: 'search', key: keyNum()! })}>Search</Button>
        <Button
          onClick={() => {
            const rng = mulberry32(seed * 31 + 7);
            setSeed(seed + 1);
            const k = 1 + Math.floor(rng() * 99);
            setKeyText(String(k));
            apply({ op: 'insert', key: k });
          }}
          disabled={sizeOf(root) >= MAXN}
        >
          Insert random
        </Button>
        <Button onClick={() => buildFrom([])}>Clear</Button>
      </div>
      <ListInput label="Rebuild from a list of keys, inserted left to right (steps through every insertion)" values={listKeys} onChange={buildFrom} presets={['random', 'sorted']} min={1} max={99} maxLen={MAXN} size={10} />
    </Frame>
  );
}
