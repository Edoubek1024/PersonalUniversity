/**
 * dynamic-array: appends one element at a time to a dynamic array and shows capacity, the copy
 * cost of each append, total cost / n (bounded for geometric growth, growing for +constant), and
 * the potential-function view of the amortised cost.
 *
 * Cost model: an append costs 1 (the write) plus the number of elements copied if it resizes.
 * Capacity starts at 0. Geometric growth: new capacity = max(cap + 1, ⌊g · cap⌋).
 * Constant growth: new capacity = cap + c.
 * Potential for growth factor g: Φ = (g · size − cap) / (g − 1), which is 2 · size − cap for g = 2;
 * amortised cost = actual cost + ΔΦ.
 *
 * Params:
 *   policy     "factor" | "constant"                       default "factor"
 *   g          number   growth factor, 1.1 to 4            default 2
 *   c          number   constant increment, 1 to 32        default 4
 *   n          number   number of appends, 8 to 256        default 64
 *   potential  boolean  show the potential-method readouts default false
 *   compare    boolean  draw the other policy for contrast default true
 *   title      string                                     default "Dynamic array growth"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Controls, Frame, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { Plot, Poly, Rect, Segment } from '../kit/Plot';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { Legend, MARK, StepControls, useStepper } from '../kit/dsa-steps';

interface Op {
  size: number;
  cap: number;
  cost: number;
  copies: number;
  total: number;
  phi: number;
  amort: number;
}

function simulate(policy: 'factor' | 'constant', g: number, c: number, N: number): Op[] {
  const ops: Op[] = [{ size: 0, cap: 0, cost: 0, copies: 0, total: 0, phi: 0, amort: 0 }];
  let size = 0;
  let cap = 0;
  let total = 0;
  const phi = (s: number, k: number) => (policy === 'factor' ? (g * s - k) / (g - 1) : NaN);
  for (let k = 1; k <= N; k++) {
    let copies = 0;
    const before = phi(size, cap);
    if (size === cap) {
      copies = size;
      cap = policy === 'factor' ? Math.max(cap + 1, Math.floor(g * cap + 1e-9)) : cap + c;
    }
    size++;
    const cost = copies + 1;
    total += cost;
    const after = phi(size, cap);
    ops.push({ size, cap, cost, copies, total, phi: after, amort: cost + after - before });
  }
  return ops;
}

function ArrayStrip({ op, prevCap }: { op: Op; prevCap: number }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = Math.max(220, size.width || 600);
  const cap = Math.max(1, op.cap);
  const perRow = Math.min(cap, W < 500 ? 16 : 32);
  const cw = Math.min(26, (W - 8) / perRow);
  const rows = Math.ceil(cap / perRow);
  const H = rows * (cw + 3) + 22;
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Backing array: ${op.size} used of capacity ${op.cap}`} className="block select-none rounded-lg bg-surface">
        <text x={4} y={13} fontSize={11} fill="var(--plot-text)">
          {op.cap === 0 ? 'empty array, capacity 0' : `backing array: ${op.size} used of capacity ${op.cap}${op.copies > 0 ? ` (just grew from ${prevCap})` : ''}`}
        </text>
        {Array.from({ length: op.cap }, (_, i) => {
          const r = Math.floor(i / perRow);
          const x = 4 + (i % perRow) * cw;
          const y = 20 + r * (cw + 3);
          const used = i < op.size;
          const isNew = i === op.size - 1;
          const copied = op.copies > 0 && i < op.copies;
          const fill = isNew ? MARK.active.color : copied ? MARK.swap.color : used ? 'var(--color-ink-3)' : 'none';
          return (
            <g key={i}>
              <rect x={x + 1} y={y} width={cw - 2} height={cw - 2} rx={2} fill={fill} fillOpacity={used ? (isNew || copied ? 0.9 : 0.5) : 0} stroke={used ? 'none' : 'var(--plot-axis)'} strokeDasharray={used ? undefined : '2 2'} />
              {cw >= 16 && isNew && (
                <text x={x + cw / 2} y={y + cw / 2 + 3} textAnchor="middle" fontSize={9} fontWeight={700} fill="var(--color-surface)">
                  +
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function DynamicArray({ params }: WidgetProps) {
  const policy0 = oneOf(params, 'policy', ['factor', 'constant'] as const, 'factor');
  const g0 = num(params, 'g', 2);
  const c0 = num(params, 'c', 4);
  const N0 = num(params, 'n', 64);
  if (g0 < 1.1 || g0 > 4) throw new Error('parameter "g" should be between 1.1 and 4');
  if (c0 < 1 || c0 > 32) throw new Error('parameter "c" should be between 1 and 32');
  if (N0 < 8 || N0 > 256) throw new Error('parameter "n" should be between 8 and 256');
  const showPhi = bool(params, 'potential', false);
  const compare = bool(params, 'compare', true);
  const title = str(params, 'title', 'Dynamic array growth');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [policy, setPolicy] = useState<'factor' | 'constant'>(policy0);
  const [g, setG] = useState(g0);
  const [c, setC] = useState(c0);
  const [N, setN] = useState(Math.round(N0));

  const ops = useMemo(() => simulate(policy, g, c, N), [policy, g, c, N]);
  const other = useMemo(() => (compare ? simulate(policy === 'factor' ? 'constant' : 'factor', policy === 'factor' ? g : 2, c, N) : null), [compare, policy, g, c, N]);
  const st = useStepper(ops.length, `${policy}|${g}|${c}|${N}`, 6);
  const op = ops[st.i];
  const prev = ops[Math.max(0, st.i - 1)];
  const k = st.i;

  const maxCost = Math.max(...ops.map((o) => o.cost), 2);
  const avg = (o: Op[]) => o.slice(1).map((x, i) => [i + 1, x.total / (i + 1)] as [number, number]);
  const avgA = avg(ops);
  const avgB = other ? avg(other) : [];
  const yMaxAvg = Math.max(4, ...avgA.map((p) => p[1]), ...avgB.map((p) => p[1])) * 1.1;
  const visA = avgA.slice(0, Math.max(1, k));
  const name = policy === 'factor' ? `×${fmt(g)}` : `+${c}`;
  const otherName = policy === 'factor' ? `+${c}` : '×2';

  const desc =
    k === 0
      ? `Empty array: size 0, capacity 0. Press Next to append.`
      : op.copies > 0 || prev.cap === 0
        ? `Append #${k}: the array was full (size = capacity = ${prev.cap}), so allocate capacity ${op.cap}, copy ${op.copies} element${op.copies === 1 ? '' : 's'} and write the new one. Cost ${op.cost}.`
        : `Append #${k}: spare capacity (${prev.size} of ${prev.cap} used), so just write into slot ${k - 1}. Cost 1.`;

  const phiTex = Math.abs(g - 2) < 1e-9 ? '\\Phi = 2\\cdot\\text{size} - \\text{cap}' : `\\Phi = \\dfrac{${fmt(g)}\\cdot\\text{size} - \\text{cap}}{${fmt(g - 1)}}`;

  return (
    <Frame title={title} caption={caption}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <Segmented
          label="Growth policy"
          value={policy === 'constant' ? 'c' : Math.abs(g - 2) < 1e-9 ? '2' : Math.abs(g - 1.5) < 1e-9 ? '1.5' : 'g'}
          onChange={(v) => {
            if (v === 'c') setPolicy('constant');
            else {
              setPolicy('factor');
              if (v !== 'g') setG(Number(v));
            }
          }}
          options={[
            { value: '2', label: 'Double (×2)' },
            { value: '1.5', label: '×1.5' },
            ...(policy === 'factor' && Math.abs(g - 2) > 1e-9 && Math.abs(g - 1.5) > 1e-9 ? [{ value: 'g', label: `×${fmt(g)}` }] : []),
            { value: 'c', label: '+ constant' },
          ]}
        />
      </div>
      <Controls cols={3}>
        {policy === 'factor' ? <Slider label="Growth factor g" value={g} min={1.1} max={3} step={0.05} onChange={setG} format={(v) => `×${fmt(v)}`} /> : <Slider label="Increment c" value={c} min={1} max={32} step={1} onChange={setC} format={(v) => `+${v}`} />}
        <Slider label="Appends n" value={N} min={8} max={256} step={8} onChange={setN} format={(v) => String(v)} />
      </Controls>
      <ArrayStrip op={op} prevCap={prev.cap} />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Size / capacity" value={`${op.size} / ${op.cap}`} />
        <Readout label="This append" value={k === 0 ? '–' : `${op.cost}${op.copies ? ` (${op.copies} copied)` : ''}`} tone={op.copies ? MARK.swap.color : undefined} />
        <Readout label="Total cost" value={op.total} />
        <Readout label="Total / n" value={k === 0 ? '–' : fmt(op.total / k)} tone="var(--plot-1)" />
      </div>
      {showPhi && (
        <div className="space-y-1.5 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]">
          {policy === 'factor' ? (
            <>
              <div>
                Potential <Tex>{phiTex}</Tex> (zero at the start, never negative). Amortised cost <Tex>{'\\hat c_i = c_i + \\Phi_i - \\Phi_{i-1}'}</Tex>.
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Readout label="Φ" value={k === 0 ? '0' : `${fmt(prev.phi)} → ${fmt(op.phi)}`} />
                <Readout label="Actual" value={k === 0 ? '–' : op.cost} />
                <Readout label="Amortised" value={k === 0 ? '–' : fmt(op.amort)} tone="var(--plot-3)" />
              </div>
              <div className="text-[12px] text-ink-2">
                {k === 0
                  ? 'Step through: a cheap append raises Φ, an expensive copy is paid for by Φ falling.'
                  : op.copies > 0
                    ? `Resize: actual cost ${op.cost}, but Φ falls by ${fmt(prev.phi - op.phi)}, so ĉᵢ = ${op.cost} − ${fmt(prev.phi - op.phi)} = ${fmt(op.amort)}. The credit saved by cheap appends pays for the copies.`
                    : `Cheap append: actual cost 1 plus ΔΦ = ${fmt(op.phi - prev.phi)} saved for the next resize.`}
              </div>
            </>
          ) : (
            <div className="text-ink-2">With +{c} growth no potential works: each resize copies about n elements but only {c} cheap appends come before the next one, so the cost per append grows like n/(2c).</div>
          )}
        </div>
      )}
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <div className="mb-1 text-[12px] text-ink-2">Cost of each append (spikes are resizes)</div>
          <Plot view={[0, N + 1, 0, maxCost * 1.08]} aspect={0.5} minHeight={150} maxHeight={220} label="Cost of each append">
            {ops.slice(1).map((o, i) => (
              <Rect key={i} x={i + 1 - 0.4} y={0} w={0.8} h={o.cost} fill={i + 1 === k ? MARK.active.color : o.copies ? MARK.swap.color : 'var(--plot-axis)'} opacity={i + 1 <= k ? 0.9 : 0.25} />
            ))}
          </Plot>
        </div>
        <div>
          <div className="mb-1 text-[12px] text-ink-2">
            Total cost / n: <span style={{ color: 'var(--plot-1)' }}>━ {name}</span>
            {other && <span style={{ color: 'var(--plot-4)' }}> ┅ {otherName}</span>}
          </div>
          <Plot view={[0, N + 1, 0, yMaxAvg]} aspect={0.5} minHeight={150} maxHeight={220} label="Total cost divided by number of appends">
            {other && <Poly points={avgB} color="var(--plot-4)" width={2} dash="5 4" />}
            {visA.length > 1 && <Poly points={visA} color="var(--plot-1)" width={2.5} />}
            {k > 0 && <Segment x1={k} y1={0} x2={k} y2={yMaxAvg} color="var(--plot-axis)" dash="3 3" width={1} />}
          </Plot>
        </div>
      </div>
      <Legend
        items={[
          { kind: 'active', glyph: '+', label: 'element just appended' },
          { kind: 'swap', glyph: '', label: 'copied during a resize' },
          { color: 'var(--color-ink-3)', glyph: '', label: 'already stored' },
          { color: 'var(--plot-axis)', label: 'spare capacity', dashed: true },
        ]}
      />
      <StepControls st={st} desc={desc} />
    </Frame>
  );
}
