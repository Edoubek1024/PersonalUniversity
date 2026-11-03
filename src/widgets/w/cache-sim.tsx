/**
 * cache-sim: steps a memory-address trace through a configurable cache. Shows the address split
 * into tag / set index / offset bits, the set looked up, hit or miss (compulsory, capacity,
 * conflict), the cache contents, and running and final hit rates.
 *
 * Params:
 *   size      number   total data bytes: 64, 128, 256, 512, 1024 or 4096       default 64
 *   block     number   block (line) size in bytes: 4, 8, 16, 32 or 64        default 16
 *   assoc     1 | 2 | 4 | "full"                                             default 1 (direct-mapped)
 *   policy    "lru" | "fifo" | "random"                                      default "lru"
 *   seed      number   seed for random replacement                           default 1
 *   addrBits  number   address width, 8..32                                  default 16
 *   trace     "sequential" | "strided" | "row-major" | "col-major" | "conflict" | "exercise" | "custom"
 *                                                                           default "row-major"
 *   traces    string[] trace presets offered                                 default all
 *   addresses (number | string)[]  the custom trace, e.g. ["0x0", "0x40"]    default []
 *   rows, cols number  matrix size for row-/col-major (4-byte ints)          default 8, 8
 *   n         number   elements for sequential / strided / conflict          default 32 (conflict: 8)
 *   stride    number   bytes between strided accesses                        default 64
 *   repeat    boolean  run the trace twice                                   default false
 *   title     string                                                         default "Cache simulator"
 *   caption   string
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { geometry, simulate, type Kind, type Policy } from '../kit/arch-cache';
import { parseIntLiteral } from '../kit/arch-bits';
import { Field, tint } from '../kit/arch-ui';

const SIZES = [64, 128, 256, 512, 1024, 4096];
const BLOCKS = [4, 8, 16, 32, 64];
const TRACES = ['sequential', 'strided', 'row-major', 'col-major', 'conflict', 'exercise', 'custom'] as const;
type Trace = (typeof TRACES)[number];
const TRACE_LABEL: Record<Trace, string> = {
  sequential: 'array walk',
  strided: 'strided',
  'row-major': 'matrix row-major',
  'col-major': 'matrix column-major',
  conflict: 'two arrays (conflict)',
  exercise: 'exercise trace',
  custom: 'custom',
};
const KIND_COLOR: Record<Kind, string> = {
  hit: 'var(--plot-3)',
  compulsory: 'var(--plot-5)',
  capacity: 'var(--plot-4)',
  conflict: 'var(--plot-2)',
  replacement: 'var(--plot-6)',
};
const fmtSize = (n: number) => (n >= 1024 ? `${n / 1024} KB` : `${n} B`);
const hx = (v: number, bits: number) => '0x' + v.toString(16).toUpperCase().padStart(Math.ceil(bits / 4), '0');

function readAddresses(p: Record<string, unknown>): string {
  const v = p.addresses;
  if (v === undefined) return '0x0000, 0x0040, 0x1000, 0x0044, 0x1040, 0x0000';
  if (!Array.isArray(v) || !v.every((x) => typeof x === 'number' || typeof x === 'string')) throw new Error('parameter "addresses" should be an array of numbers or hex strings');
  return v.map((x) => (typeof x === 'number' ? '0x' + x.toString(16).toUpperCase() : x)).join(', ');
}

export default function CacheSim({ params }: WidgetProps) {
  const size0 = num(params, 'size', 64);
  const block0 = num(params, 'block', 16);
  if (!SIZES.includes(size0)) throw new Error(`parameter "size" should be one of ${SIZES.join(', ')}`);
  if (!BLOCKS.includes(block0)) throw new Error(`parameter "block" should be one of ${BLOCKS.join(', ')}`);
  const assocRaw = params.assoc ?? 1;
  if (!(assocRaw === 1 || assocRaw === 2 || assocRaw === 4 || assocRaw === 'full')) throw new Error('parameter "assoc" should be 1, 2, 4 or "full"');
  const policy0 = oneOf(params, 'policy', ['lru', 'fifo', 'random'] as const, 'lru');
  const seed = num(params, 'seed', 1);
  const addrBits = num(params, 'addrBits', 16);
  if (!Number.isInteger(addrBits) || addrBits < 8 || addrBits > 32) throw new Error('parameter "addrBits" should be an integer from 8 to 32');
  const trace0 = oneOf(params, 'trace', TRACES, 'row-major');
  const traces = strArray(params, 'traces', [...TRACES]) as Trace[];
  for (const t of traces) if (!(TRACES as readonly string[]).includes(t)) throw new Error(`parameter "traces" has unknown preset "${t}"`);
  const rows = num(params, 'rows', 8);
  const cols = num(params, 'cols', 8);
  const n0 = num(params, 'n', trace0 === 'conflict' ? 8 : 32);
  const stride0 = num(params, 'stride', 64);
  for (const [k, v, lo, hi] of [['rows', rows, 1, 32], ['cols', cols, 1, 32], ['n', n0, 1, 256], ['stride', stride0, 1, 4096]] as const)
    if (!Number.isInteger(v) || v < lo || v > hi) throw new Error(`parameter "${k}" should be an integer from ${lo} to ${hi}`);

  const [size, setSize] = useState(size0);
  const [block, setBlock] = useState(block0);
  const [assoc, setAssoc] = useState<string>(String(assocRaw));
  const [policy, setPolicy] = useState<Policy>(policy0);
  const [trace, setTrace] = useState<Trace>(trace0);
  const [stride, setStride] = useState(stride0);
  const [repeat, setRepeat] = useState(bool(params, 'repeat', false));
  const [custom, setCustom] = useState(() => readAddresses(params));
  const [step, setStep] = useState(0); // number of accesses performed
  const [playing, setPlaying] = useState(false);
  const acc = useRef(0);

  const ways = assoc === 'full' ? size / block : +assoc;
  const cfg = { size, block, ways, policy, addrBits, seed };
  const g = geometry(cfg);
  const maxAddr = 2 ** addrBits;

  const { addrs, traceError } = useMemo(() => {
    let a: number[] = [];
    let err: string | null = null;
    const n = trace === 'conflict' ? Math.min(n0, size / 4) : n0;
    if (trace === 'sequential') a = Array.from({ length: n }, (_, i) => 4 * i);
    else if (trace === 'strided') a = Array.from({ length: Math.min(n, 64) }, (_, i) => i * stride);
    else if (trace === 'row-major') for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) a.push((i * cols + j) * 4);
    else if (trace === 'col-major') for (let j = 0; j < cols; j++) for (let i = 0; i < rows; i++) a.push((i * cols + j) * 4);
    else if (trace === 'conflict') for (let i = 0; i < n; i++) a.push(4 * i, size + 4 * i);
    else if (trace === 'exercise') a = [0x0000, 0x0040, 0x1000, 0x0044, 0x1040, 0x0000];
    else {
      const parts = custom.split(/[\s,;]+/).filter(Boolean);
      for (const p of parts) {
        const v = parseIntLiteral(p);
        if (v === null || v < 0n || v >= BigInt(maxAddr)) {
          err = `"${p}" is not an address from 0 to ${hx(maxAddr - 1, addrBits)}`;
          break;
        }
        a.push(Number(v));
      }
      a = a.slice(0, 256);
    }
    a = a.filter((x) => x < maxAddr);
    return { addrs: repeat ? [...a, ...a] : a, traceError: err };
  }, [trace, n0, stride, rows, cols, size, custom, maxAddr, addrBits, repeat]);

  const full = useMemo(() => simulate(cfg, addrs), [size, block, ways, policy, addrBits, seed, addrs]); // eslint-disable-line react-hooks/exhaustive-deps
  const k = Math.min(step, addrs.length);
  const now = useMemo(() => simulate(cfg, addrs, k), [full, k]); // eslint-disable-line react-hooks/exhaustive-deps
  const cur = k > 0 ? full.events[k - 1] : null;

  const reset = () => {
    setStep(0);
    setPlaying(false);
  };
  // Changing the configuration or the trace restarts the run.
  const cfgKey = `${size}|${block}|${assoc}|${policy}|${trace}|${stride}|${repeat}|${custom}`;
  const [lastKey, setLastKey] = useState(cfgKey);
  if (lastKey !== cfgKey) {
    setLastKey(cfgKey);
    setStep(0);
    setPlaying(false);
  }

  useAnimation(playing, (dt) => {
    acc.current += dt;
    if (acc.current > 0.35) {
      acc.current = 0;
      setStep((s) => {
        if (s + 1 >= addrs.length) setPlaying(false);
        return Math.min(addrs.length, s + 1);
      });
    }
  });

  const count = (evs: typeof full.events) => {
    const c: Record<Kind, number> = { hit: 0, compulsory: 0, capacity: 0, conflict: 0, replacement: 0 };
    for (const e of evs) c[e.kind]++;
    return c;
  };
  const sofar = count(now.events);
  const total = count(full.events);
  const rate = (c: Record<Kind, number>, n: number) => (n ? `${((100 * c.hit) / n).toFixed(1)}%` : '—');

  // Which sets to show: all when few, otherwise the ones used so far plus the current one.
  const usedSets = useMemo(() => {
    if (g.S <= 16) return [...Array(g.S).keys()];
    const u = new Set(now.events.map((e) => e.set));
    if (cur) u.add(cur.set);
    return [...u].sort((x, y) => x - y);
  }, [now, g.S, cur]);

  const addrBin = cur ? cur.addr.toString(2).padStart(addrBits, '0') : '';
  const fields = [
    { name: 'tag', bits: g.t, color: 'var(--plot-1)' },
    { name: 'set index', bits: g.s, color: 'var(--plot-4)' },
    { name: 'offset', bits: g.b, color: 'var(--plot-3)' },
  ];

  return (
    <Frame title={str(params, 'title', 'Cache simulator')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Segmented label="Cache size" value={String(size)} onChange={(v) => setSize(+v)} options={SIZES.map((s) => ({ value: String(s), label: fmtSize(s) }))} />
        <Segmented label="Block size" value={String(block)} onChange={(v) => setBlock(+v)} options={BLOCKS.map((b) => ({ value: String(b), label: `${b} B` }))} />
        <Segmented
          label="Associativity"
          value={assoc}
          onChange={setAssoc}
          options={[
            { value: '1', label: 'direct-mapped' },
            { value: '2', label: '2-way' },
            { value: '4', label: '4-way' },
            { value: 'full', label: 'fully assoc.' },
          ]}
        />
        <Segmented
          label="Replacement"
          value={policy}
          onChange={setPolicy}
          options={[
            { value: 'lru', label: 'LRU' },
            { value: 'fifo', label: 'FIFO' },
            { value: 'random', label: 'random' },
          ]}
        />
      </div>
      <div className="text-[13px] text-ink-2">
        {g.S} set{g.S === 1 ? '' : 's'} × {g.E} way{g.E === 1 ? '' : 's'} × {block} B = {fmtSize(size)}
        {+assoc > g.lines ? ' (only ' + g.lines + ' lines, so this is fully associative)' : ''}. A {addrBits}-bit address splits into{' '}
        <b style={{ color: 'var(--plot-1)' }}>{g.t} tag</b>, <b style={{ color: 'var(--plot-4)' }}>{g.s} set-index</b> and <b style={{ color: 'var(--plot-3)' }}>{g.b} offset</b> bits.
      </div>

      <div className="space-y-2 rounded-xl border border-line p-3">
        {traces.length > 1 && <Segmented label="Address trace" value={trace} onChange={setTrace} options={traces.map((t) => ({ value: t, label: TRACE_LABEL[t] }))} />}
        {trace === 'strided' && (
          <div className="max-w-sm">
            <Slider label="Stride (bytes)" value={Math.log2(stride)} min={2} max={8} step={1} onChange={(v) => setStride(2 ** v)} format={(v) => `${2 ** v} B`} />
          </div>
        )}
        {trace === 'custom' && <Field label="Addresses (hex 0x… or decimal, separated by commas or spaces)" value={custom} onChange={setCustom} error={traceError} />}
        <div className="text-[12.5px] text-ink-2">
          {trace === 'sequential' && 'for (i = 0; i < n; i++) sum += a[i];  with 4-byte ints at address 0.'}
          {trace === 'strided' && `Every access is ${stride} bytes after the previous one.`}
          {trace === 'row-major' && `for i, for j: a[i][j] over a ${rows}×${cols} int matrix (${rows * cols * 4} bytes) at address 0: stride 4 bytes.`}
          {trace === 'col-major' && `for j, for i: a[i][j] over the same ${rows}×${cols} int matrix: stride ${cols * 4} bytes.`}
          {trace === 'conflict' && `x[i] then y[i]: two int arrays, y placed exactly ${fmtSize(size)} (the cache size) after x, so x[i] and y[i] share a set.`}
          {trace === 'exercise' && 'The address-decomposition exercise: 0x0000, 0x0040, 0x1000, 0x0044, 0x1040, 0x0000.'}
          {trace === 'custom' && `${addrs.length} accesses.`}
        </div>
        <Toggle label="Run the trace twice (second pass shows what stayed in the cache)" checked={repeat} onChange={setRepeat} />
        <div className="flex flex-wrap gap-1" aria-label="Trace; click an access to jump to it">
          {addrs.map((a, i) => {
            const e = full.events[i];
            const done = i < k;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setStep(i + 1);
                }}
                title={`${hx(a, addrBits)}${done ? ': ' + e.kind : ''}`}
                className="rounded border px-1 py-px font-mono text-[10.5px] tabular-nums"
                style={{
                  borderColor: i === k - 1 ? 'var(--color-ink)' : done ? KIND_COLOR[e.kind] : 'var(--color-line)',
                  background: done ? tint(KIND_COLOR[e.kind], 22) : undefined,
                  color: done ? 'var(--color-ink)' : 'var(--color-ink-3)',
                }}
              >
                {a.toString(16).toUpperCase()}
                {done && <span className="ml-0.5 font-bold">{e.kind === 'hit' ? 'H' : 'M'}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={reset} disabled={k === 0}>
          Reset
        </Button>
        <Button onClick={() => setStep(Math.max(0, k - 1))} disabled={k === 0}>
          ◀ Back
        </Button>
        <Button primary onClick={() => setStep(Math.min(addrs.length, k + 1))} disabled={k >= addrs.length}>
          Step ▶
        </Button>
        <Button onClick={() => (k >= addrs.length ? (setStep(0), setPlaying(true)) : setPlaying((p) => !p))} disabled={addrs.length === 0}>
          {playing ? 'Pause' : 'Play'}
        </Button>
        <Button
          onClick={() => {
            setPlaying(false);
            setStep(addrs.length);
          }}
          disabled={k >= addrs.length}
        >
          Run to end
        </Button>
        <span className="text-[12.5px] text-ink-2">
          access {k} of {addrs.length}
        </span>
      </div>

      {cur ? (
        <div className="space-y-2 rounded-xl border border-line p-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[13px] text-ink-2">Address {hx(cur.addr, addrBits)} =</span>
            <span className="break-all font-mono text-[13px]">
              {fields.map((f, fi) => {
                const start = fields.slice(0, fi).reduce((s2, x) => s2 + x.bits, 0);
                const txt = addrBin.slice(start, start + f.bits);
                return txt ? (
                  <span key={f.name} className="mr-1 rounded px-1 py-0.5" style={{ background: tint(f.color, 22), color: 'var(--color-ink)' }} title={f.name}>
                    {txt}
                  </span>
                ) : null;
              })}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Readout label="tag" value={hx(cur.tag, Math.max(4, g.t))} tone="var(--plot-1)" />
            <Readout label="set index" value={cur.set} tone="var(--plot-4)" />
            <Readout label="offset" value={cur.offset} tone="var(--plot-3)" />
            <Readout label="result" value={<span className="whitespace-normal">{cur.kind === 'hit' ? 'HIT' : `MISS (${cur.kind})`}</span>} tone={KIND_COLOR[cur.kind]} />
          </div>
          <Note tone={cur.kind === 'hit' ? 'good' : 'warn'}>{explain(cur.kind, cur.set, g.E, !!cur.evicted, cur.evicted ? hx(cur.evicted.block * block, addrBits) : '')}</Note>
        </div>
      ) : (
        <Note>Press Step to send the first address to the cache. Every line starts invalid (empty).</Note>
      )}

      <div>
        <div className="mb-1 text-[12.5px] text-ink-2">
          Cache contents after {k} access{k === 1 ? '' : 'es'}
          {g.S > 16 ? ` (showing the ${usedSets.length} sets used so far of ${g.S})` : ''}: each line shows its tag and the bytes it holds.
        </div>
        <div className="max-h-72 overflow-auto rounded-lg border border-line">
          <table className="w-full border-collapse text-[12px]" style={{ width: '100%' }}>
            <thead className="sticky top-0 bg-surface-2 text-ink-2">
              <tr>
                <th className="px-2 py-1 text-left font-medium">set</th>
                {[...Array(g.E).keys()].map((w) => (
                  <th key={w} className="px-2 py-1 text-left font-medium">
                    {g.E === 1 ? 'line' : `way ${w}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usedSets.map((si) => (
                <tr key={si} className="border-t border-line" style={cur && cur.set === si ? { background: tint('var(--plot-4)', 14) } : undefined}>
                  <td className="px-2 py-1 font-mono tabular-nums text-ink-2">{si}</td>
                  {now.sets[si].map((l, w) => {
                    const touched = cur && cur.set === si && cur.way === w;
                    const base = (l.tag * g.S + si) * block;
                    return (
                      <td key={w} className="px-2 py-1 font-mono tabular-nums" style={touched ? { outline: `2px solid ${KIND_COLOR[cur!.kind]}`, outlineOffset: -2 } : undefined}>
                        {l.valid ? (
                          <span>
                            <span style={{ color: 'var(--plot-1)' }}>{hx(l.tag, Math.max(4, g.t))}</span>
                            <span className="text-ink-3">
                              {' '}
                              {hx(base, addrBits)}–{hx(base + block - 1, addrBits)}
                            </span>
                          </span>
                        ) : (
                          <span className="text-ink-3">empty</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <Readout label="hit rate so far" value={rate(sofar, k)} tone="var(--plot-3)" />
        <Readout label="hits" value={sofar.hit} />
        <Readout label="compulsory" value={sofar.compulsory} tone={KIND_COLOR.compulsory} />
        <Readout label="capacity" value={sofar.capacity} tone={KIND_COLOR.capacity} />
        <Readout label={total.replacement ? 'conflict / repl.' : 'conflict'} value={sofar.conflict + sofar.replacement} tone={KIND_COLOR.conflict} />
      </div>
      <Note>
        Whole trace ({addrs.length} accesses): {total.hit} hit{total.hit === 1 ? '' : 's'}, {addrs.length - total.hit} miss{addrs.length - total.hit === 1 ? '' : 'es'} ({total.compulsory} compulsory, {total.capacity} capacity, {total.conflict} conflict
        {total.replacement ? `, ${total.replacement} replacement-policy` : ''}), hit rate <b>{rate(total, addrs.length)}</b>.
      </Note>
    </Frame>
  );
}

function explain(kind: Kind, set: number, E: number, evicted: boolean, evictedRange: string): string {
  const ev = evicted ? ` The set was full, so the block starting at ${evictedRange} was evicted.` : '';
  switch (kind) {
    case 'hit':
      return `Set ${set} holds a valid line with this tag: a hit. Nothing is fetched from memory.`;
    case 'compulsory':
      return `No line in set ${set} has this tag, and this block has never been touched before: a compulsory (cold) miss. The whole block is fetched.${ev}`;
    case 'capacity':
      return `Miss. This block was in the cache earlier, but even a fully associative cache of the same size would have evicted it: the working set is bigger than the cache (capacity miss).${ev}`;
    case 'conflict':
      return `Miss, although a fully associative cache of the same size would still hold this block: it was pushed out because too many blocks map to set ${set}${E === 1 ? ', which has a single line' : ''} (conflict miss).${ev}`;
    case 'replacement':
      return `Miss caused by the replacement policy: an LRU cache of the same size would still hold this block.${ev}`;
  }
}
