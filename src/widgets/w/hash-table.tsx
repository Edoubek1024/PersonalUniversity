/**
 * hash-table: a table of m slots with insert / search / delete stepped probe by probe. Hash
 * functions: k mod m, multiplicative ⌊m·frac(kA)⌋ with A = (√5 − 1)/2, and a polynomial string
 * hash. Collision resolution: separate chaining, linear probing, quadratic probing (h + i²),
 * double hashing (h + i·h₂, h₂ = 1 + k mod (m − 1)). Tombstones for open-addressing deletes,
 * optional resize and rehash past a load-factor threshold, the occupancy strip that makes
 * clustering visible, and measured probe counts against the textbook formulas.
 * Bloom-filter mode: m bits, k hash functions, measured false-positive rate vs (1 − e^(−kn/m))^k.
 *
 * Params:
 *   mode        "table" | "bloom"                                  default "table"
 *   m           number   slots (table) or bits (bloom)             default 11 (table), 64 (bloom)
 *   hash        "mod" | "mult" | "string"                          default "mod"
 *   hashes      string[] hash functions offered                    default ["mod", "mult", "string"]
 *   strategy    "chaining" | "linear" | "quadratic" | "double"     default "linear"
 *   strategies  string[] strategies offered                        default all four
 *   keys        (number | string)[] inserted at the start          default [10, 22, 31, 4, 15, 28, 17, 88, 59]
 *   key         string   initial value of the key field            default "47"
 *   resize      boolean  resize and rehash past maxLoad            default false
 *   maxLoad     number   threshold for (n + tombstones)/m          default 0.7
 *   k           number   bloom: hash functions                     default 3
 *   n           number   bloom: items for the measurement          default 20
 *   title       string                                             default "Hash table" / "Bloom filter"
 *   caption     string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { bloomBits, emptyTable, hashInsert, hashSearch, longestRun, nextPrime, probeStats, type HashCfg, type HashFn, type HashSnap, type SHl, type Strategy, type Table } from '../kit/dsa-hash';
import { Field, Legend, MARK, NEUTRAL, StepControls, mulberry32, useStepper } from '../kit/dsa-steps';

const STRATS = ['chaining', 'linear', 'quadratic', 'double'] as const;
const FNS = ['mod', 'mult', 'string'] as const;
const STRAT_LABEL: Record<Strategy, string> = { chaining: 'Chaining', linear: 'Linear probing', quadratic: 'Quadratic', double: 'Double hashing' };
const FN_LABEL: Record<HashFn, string> = { mod: 'k mod m', mult: 'Multiplicative', string: 'String hash' };
const HLS: Record<SHl, { color: string; glyph: string }> = {
  home: { color: MARK.active.color, glyph: 'h' },
  probe: { color: MARK.compare.color, glyph: '?' },
  collide: { color: MARK.swap.color, glyph: '✗' },
  found: { color: MARK.found.color, glyph: '★' },
  insert: { color: MARK.active.color, glyph: '+' },
  tomb: { color: NEUTRAL, glyph: '⊠' },
};

const isPrime = (v: number) => v === nextPrime(v);

function theory(strategy: Strategy, a: number): { s: number; u: number } {
  if (strategy === 'chaining') return { s: 1 + a / 2, u: a };
  if (a >= 1) return { s: Infinity, u: Infinity };
  if (strategy === 'linear') return { s: 0.5 * (1 + 1 / (1 - a)), u: 0.5 * (1 + 1 / (1 - a) ** 2) };
  return { s: a > 0 ? (1 / a) * Math.log(1 / (1 - a)) : 1, u: 1 / (1 - a) };
}

function short(k: string, max: number) {
  return k.length > max ? `${k.slice(0, max - 1)}…` : k;
}

function OpenView({ s }: { s: HashSnap }) {
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = size.width || 600;
  const m = s.t.m;
  const fit = Math.max(1, Math.floor(W / 34));
  const rows = Math.ceil(m / fit);
  const cols = Math.ceil(m / rows);
  const order = new Map<number, number>();
  s.seq.forEach((slot, i) => {
    if (!order.has(slot)) order.set(slot, i);
  });
  return (
    <div ref={ref} className="w-full space-y-2">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="list" aria-label="Hash table slots">
        {s.t.slots.map((v, i) => {
          const h = s.hl[i];
          const st = h ? HLS[h] : null;
          const tomb = v === 'TOMB';
          const filled = h && h !== 'tomb' && h !== 'home';
          return (
            <div key={i} role="listitem" className="relative flex h-12 flex-col items-center justify-center rounded-md border text-[12.5px] font-mono" style={{ background: filled ? st!.color : 'var(--color-surface-2)', borderColor: st ? st.color : 'var(--color-line)', borderWidth: st ? 2 : 1, borderStyle: h === 'tomb' || h === 'home' ? 'dashed' : 'solid', color: filled ? 'var(--color-surface)' : 'var(--color-ink)' }}>
              <span className={tomb ? 'text-ink-3' : 'font-semibold'} style={filled ? { color: 'var(--color-surface)' } : undefined}>
                {v === null ? '' : tomb ? '⊠' : short(v, cols > 12 ? 4 : 6)}
              </span>
              <span className="text-[9.5px] opacity-70">{i}</span>
              {order.has(i) && (
                <span className="absolute -right-1 -top-1.5 rounded-full px-1 text-[9px] font-bold leading-[14px]" style={{ background: 'var(--color-accent)', color: 'var(--color-surface)' }}>
                  {order.get(i)! + 1}
                </span>
              )}
              {st && <span className="sr-only">{st.glyph}</span>}
            </div>
          );
        })}
      </div>
      <div>
        <div className="mb-0.5 text-[11px] text-ink-3">occupancy strip (clusters are unbroken runs)</div>
        <div className="flex h-3 w-full overflow-hidden rounded" aria-hidden>
          {s.t.slots.map((v, i) => (
            <div key={i} className="h-full flex-1 border-r border-surface" style={{ background: v === null ? 'var(--color-surface-2)' : v === 'TOMB' ? 'var(--plot-axis)' : 'var(--plot-1)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChainView({ s }: { s: HashSnap }) {
  const m = s.t.m;
  return (
    <div className={`grid gap-x-4 gap-y-1 ${m > 9 ? 'md:grid-cols-2' : ''}`} role="list" aria-label="Hash table chains">
      {s.t.chains.map((c, i) => {
        const h = s.hl[i];
        const st = h ? HLS[h] : null;
        return (
          <div key={i} role="listitem" className="flex min-h-[28px] flex-wrap items-center gap-1 font-mono text-[12.5px]">
            <span className="w-6 text-right text-[11px] text-ink-3">{i}</span>
            <span className="inline-flex h-6 w-7 items-center justify-center rounded border text-[11px] font-bold" style={{ borderColor: st ? st.color : 'var(--color-line)', borderWidth: st ? 2 : 1, color: st ? st.color : 'var(--color-ink-3)' }}>
              {st ? st.glyph : '•'}
            </span>
            {c.map((k, j) => {
              const ch = s.chainHl && s.chainHl[0] === i && s.chainHl[1] === j ? HLS[s.chainHl[2]] : null;
              return (
                <span key={j} className="inline-flex items-center gap-1">
                  <span className="text-ink-3">→</span>
                  <span className="rounded border px-1.5 py-0.5" style={{ background: ch ? ch.color : 'var(--color-surface-2)', color: ch ? 'var(--color-surface)' : 'var(--color-ink)', borderColor: ch ? ch.color : 'var(--color-line)' }}>
                    {ch && <span className="mr-0.5 font-bold">{ch.glyph}</span>}
                    {short(k, 8)}
                  </span>
                </span>
              );
            })}
            {c.length === 0 && <span className="text-[11px] text-ink-3">empty</span>}
          </div>
        );
      })}
    </div>
  );
}

function build(keys: string[], m: number, cfg: HashCfg): Table {
  let t = emptyTable(m);
  for (const k of keys) t = hashInsert(t, k, cfg, true).table;
  return t;
}

function TableMode({ params }: { params: Record<string, unknown> }) {
  const m0 = num(params, 'm', 11);
  if (m0 < 3 || m0 > 61 || !Number.isInteger(m0)) throw new Error('parameter "m" should be a whole number from 3 to 61');
  const fn0 = oneOf(params, 'hash', FNS, 'mod');
  const st0 = oneOf(params, 'strategy', STRATS, 'linear');
  const fns = strArray(params, 'hashes', [...FNS]).filter((f): f is HashFn => (FNS as readonly string[]).includes(f));
  const strats = strArray(params, 'strategies', [...STRATS]).filter((f): f is Strategy => (STRATS as readonly string[]).includes(f));
  const rawKeys = params.keys === undefined ? [10, 22, 31, 4, 15, 28, 17, 88, 59] : params.keys;
  if (!Array.isArray(rawKeys) || !rawKeys.every((k) => typeof k === 'number' || typeof k === 'string')) throw new Error('parameter "keys" should be an array of numbers or strings');
  const keys0 = (rawKeys as (number | string)[]).map(String);
  const key0 = str(params, 'key', '47');
  const resize0 = bool(params, 'resize', false);
  const maxLoad = num(params, 'maxLoad', 0.7);
  const title = str(params, 'title', 'Hash table');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;

  const [fn, setFn] = useState<HashFn>(fn0);
  const [strategy, setStrategy] = useState<Strategy>(st0);
  const [resize, setResize] = useState(resize0);
  const cfg: HashCfg = { fn, strategy, maxLoad: resize ? maxLoad : 0 };
  const [table, setTable] = useState<Table>(() => build(keys0, m0, { fn: fn0, strategy: st0, maxLoad: resize0 ? maxLoad : 0 }));
  const [order, setOrder] = useState<string[]>(keys0);
  const still = (t: Table, d: string): HashSnap[] => [{ t, hl: {}, seq: [], probes: 0, d }];
  const [snaps, setSnaps] = useState<HashSnap[]>(() => still(table, `${keys0.length} keys inserted: ${keys0.join(', ')}. Insert, search or delete a key to step through its probes.`));
  const [keyText, setKeyText] = useState(key0);
  const [seed, setSeed] = useState(1);
  const stp = useStepper(snaps.length, snaps, 3);
  const s = snaps[stp.i];

  const rebuild = (nfn: HashFn, nst: Strategy, nm: number, nresize: boolean, why: string) => {
    const c: HashCfg = { fn: nfn, strategy: nst, maxLoad: nresize ? maxLoad : 0 };
    const t = build(order, nm, c);
    setTable(t);
    setSnaps(still(t, why));
    stp.restart(false);
  };
  const run = (op: 'insert' | 'search' | 'delete', k: string) => {
    if (!k) return;
    const r = op === 'insert' ? hashInsert(table, k, cfg) : hashSearch(table, k, cfg, op === 'delete');
    setTable(r.table);
    setSnaps(r.snaps);
    if (op === 'insert' && !order.includes(k)) setOrder([...order, k]);
    if (op === 'delete') setOrder(order.filter((x) => x !== k));
    stp.restart(true);
  };

  const fillTo = (target: number) => {
    const rng = mulberry32(seed * 13 + 5);
    setSeed(seed + 1);
    let tb = table;
    const ord = order.slice();
    let guard = 0;
    while (tb.n / tb.m < target && guard++ < 2000) {
      const k = fn === 'string' ? `w${Math.floor(rng() * 1e6)}` : String(Math.floor(rng() * 100000));
      if (ord.includes(k)) continue;
      tb = hashInsert(tb, k, { ...cfg, maxLoad: 0 }, true).table;
      ord.push(k);
    }
    setTable(tb);
    setOrder(ord);
    setSnaps(still(tb, `Inserted random keys (without resizing) until α = ${tb.n}/${tb.m} = ${fmt(tb.n / tb.m, 2)}. Compare the measured probe counts with the formulas.`));
    stp.restart(false);
  };
  const absent = useMemo(() => {
    const rng = mulberry32(99);
    const present = new Set(order);
    const out: string[] = [];
    while (out.length < 400) {
      const k = fn === 'string' ? `w${Math.floor(rng() * 1e6)}` : String(100 + Math.floor(rng() * 100000));
      if (!present.has(k)) out.push(k);
    }
    return out;
  }, [order, fn]);
  const t = s.t;
  const alpha = t.n / t.m;
  const stats = useMemo(() => probeStats(t, cfg, absent), [t, cfg.fn, cfg.strategy, absent]); // eslint-disable-line react-hooks/exhaustive-deps
  const th = theory(strategy, alpha);
  const open = strategy !== 'chaining';
  const needPrime = (strategy === 'double' || strategy === 'quadratic') && !isPrime(t.m);

  return (
    <Frame title={title} caption={caption}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {strats.length > 1 && (
          <Segmented
            label="Collision resolution"
            value={strategy}
            onChange={(v) => {
              setStrategy(v);
              rebuild(fn, v, table.m, resize, `Rebuilt with ${STRAT_LABEL[v].toLowerCase()} by reinserting the same keys in the same order.`);
            }}
            options={strats.map((v) => ({ value: v, label: STRAT_LABEL[v] }))}
          />
        )}
        {fns.length > 1 && (
          <Segmented
            label="Hash function"
            value={fn}
            onChange={(v) => {
              setFn(v);
              rebuild(v, strategy, table.m, resize, `Rebuilt with the ${FN_LABEL[v].toLowerCase()} hash.`);
            }}
            options={fns.map((v) => ({ value: v, label: FN_LABEL[v] }))}
          />
        )}
      </div>
      {open ? <OpenView s={s} /> : <ChainView s={s} />}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="n / m" value={`${t.n} / ${t.m}`} />
        <Readout label="Load factor n/m" value={fmt(alpha, 2)} tone="var(--plot-1)" />
        <Readout label={open ? 'Longest cluster' : 'Longest chain'} value={open ? longestRun(t) : Math.max(0, ...t.chains.map((c) => c.length))} />
        <Readout label={open ? 'Tombstones' : 'Empty slots'} value={open ? t.tombs : t.chains.filter((c) => c.length === 0).length} />
        <Readout label="Probes (this op)" value={s.probes} tone="var(--plot-4)" />
        <Readout label="Hit: meas. / theory" value={`${fmt(stats.succ, 2)} / ${fmt(th.s, 2)}`} />
        <div className="col-span-2">
          <Readout label="Miss: meas. / theory" value={`${fmt(stats.unsucc, 2)} / ${fmt(th.u, 2)}`} />
        </div>
      </div>
      <div className="text-[12px] text-ink-3">
        Theory: {strategy === 'chaining' ? 'hit 1 + α/2, miss α (keys compared)' : strategy === 'linear' ? 'Knuth: hit ½(1 + 1/(1−α)), miss ½(1 + 1/(1−α)²)' : 'uniform hashing: hit (1/α) ln(1/(1−α)), miss 1/(1−α)'}. Measured: average over the stored keys, and over 400 absent keys. Small tables are noisy.
      </div>
      {needPrime && <Note tone="warn">m = {t.m} is not prime: {strategy === 'double' ? 'h₂ may share a factor with m, so the probe sequence can miss slots' : 'quadratic probing may revisit slots and miss free ones'}.</Note>}
      <Legend
        items={[
          { color: HLS.home.color, glyph: 'h', label: 'home slot h(k)', dashed: true },
          { color: HLS.collide.color, glyph: '✗', label: 'collision' },
          { color: HLS.probe.color, glyph: '?', label: 'probe ends here (empty)' },
          { color: HLS.insert.color, glyph: '+', label: 'stored here' },
          { color: HLS.found.color, glyph: '★', label: 'found' },
          ...(open ? [{ color: NEUTRAL, glyph: '⊠', label: 'tombstone', dashed: true }, { color: 'var(--color-accent)', glyph: '1', label: 'probe order' }] : []),
        ]}
      />
      <StepControls st={stp} desc={s.d} />
      <div className="flex flex-wrap items-center gap-2">
        <Field label="Key" value={keyText} onChange={setKeyText} onEnter={() => run('insert', keyText.trim())} width="w-24" />
        <Button primary onClick={() => run('insert', keyText.trim())}>
          Insert
        </Button>
        <Button onClick={() => run('search', keyText.trim())}>Search</Button>
        <Button onClick={() => run('delete', keyText.trim())}>Delete</Button>
        <Button
          onClick={() => {
            const rng = mulberry32(seed * 7 + 1);
            setSeed(seed + 1);
            const k = fn === 'string' ? ['ant', 'bee', 'cat', 'dog', 'eel', 'fox', 'gnu', 'hen', 'ibis', 'jay', 'kiwi', 'lynx', 'mole', 'newt', 'owl', 'pig', 'ram', 'seal', 'toad', 'yak'][Math.floor(rng() * 20)] : String(Math.floor(rng() * 100));
            setKeyText(k);
            run('insert', k);
          }}
        >
          Insert random
        </Button>
        {[0.5, 0.8, 0.9].map((target) => (
          <Button key={target} onClick={() => fillTo(target)} disabled={alpha >= target}>
            Fill to α {target}
          </Button>
        ))}
        <Button
          onClick={() => {
            setOrder([]);
            const e = emptyTable(table.m);
            setTable(e);
            setSnaps(still(e, 'Empty table.'));
            stp.restart(false);
          }}
        >
          Clear
        </Button>
      </div>
      <Controls>
        <Slider label="Table size m" value={table.m} min={3} max={61} step={1} onChange={(v) => rebuild(fn, strategy, v, resize, `Rebuilt with m = ${v}${isPrime(v) ? ' (prime)' : ''}.`)} format={(v) => `${v}${isPrime(v) ? ' (prime)' : ''}`} />
        <div className="flex items-center">
          <Toggle
            label={`Resize and rehash when (n + tombstones)/m > ${maxLoad}`}
            checked={resize}
            onChange={(v) => {
              setResize(v);
              rebuild(fn, strategy, table.m, v, v ? 'Resizing on: the next insert that pushes the load past the threshold doubles m.' : 'Resizing off.');
            }}
          />
        </div>
      </Controls>
    </Frame>
  );
}

function BloomMode({ params }: { params: Record<string, unknown> }) {
  const m0 = num(params, 'm', 64);
  const k0 = num(params, 'k', 3);
  const n0 = num(params, 'n', 20);
  if (m0 < 16 || m0 > 512) throw new Error('parameter "m" should be between 16 and 512 bits');
  if (k0 < 1 || k0 > 10) throw new Error('parameter "k" should be between 1 and 10');
  const title = str(params, 'title', 'Bloom filter');
  const caption = typeof params.caption === 'string' ? params.caption : undefined;
  const [m, setM] = useState(m0);
  const [k, setK] = useState(k0);
  const [n, setN] = useState(n0);
  const [items, setItems] = useState<string[]>(['cat', 'dog', 'fish']);
  const [word, setWord] = useState('cow');
  const [last, setLast] = useState<{ x: string; bits: number[]; op: 'insert' | 'query'; result?: string } | null>(null);
  const [measured, setMeasured] = useState<{ fp: number; trials: number; n: number } | null>(null);
  const [seed, setSeed] = useState(1);

  const bits = useMemo(() => {
    const b = new Uint8Array(m);
    for (const it of items) for (const p of bloomBits(it, m, k)) b[p] = 1;
    return b;
  }, [items, m, k]);
  const set = bits.reduce((a, b) => a + b, 0);
  const N = items.length;
  const predicted = (1 - Math.exp((-k * N) / m)) ** k;
  const kOpt = N > 0 ? (m / N) * Math.LN2 : NaN;
  const hl = new Set(last?.bits ?? []);
  const [ref, size] = useElementSize<HTMLDivElement>();
  const W = size.width || 600;
  const cols = Math.min(32, Math.max(8, Math.floor(W / 22)));

  const insert = (x: string) => {
    if (!x) return;
    setItems((a) => (a.includes(x) ? a : [...a, x]));
    setLast({ x, bits: bloomBits(x, m, k), op: 'insert' });
  };
  const query = (x: string) => {
    if (!x) return;
    const b = bloomBits(x, m, k);
    const all = b.every((p) => bits[p] === 1);
    const member = items.includes(x);
    setLast({ x, bits: b, op: 'query', result: !all ? `Some bit is 0, so “${x}” is definitely not in the set (no false negatives).` : member ? `All ${k} bits are 1: “${x}” is probably in the set, and it really is.` : `All ${k} bits are 1 but “${x}” was never inserted: a false positive. Other items set those bits.` });
  };
  const measure = () => {
    const s = seed + 1;
    setSeed(s);
    const fill = Array.from({ length: n }, (_, i) => `item-${s}-${i}`);
    setItems(fill);
    const b = new Uint8Array(m);
    for (const it of fill) for (const p of bloomBits(it, m, k)) b[p] = 1;
    const trials = 5000;
    let fp = 0;
    for (let i = 0; i < trials; i++) if (bloomBits(`probe-${s}-${i}`, m, k).every((p) => b[p] === 1)) fp++;
    setMeasured({ fp: fp / trials, trials, n });
    setLast(null);
  };

  return (
    <Frame title={title} caption={caption}>
      <div ref={ref} className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="img" aria-label={`Bit array of ${m} bits, ${set} set`}>
        {Array.from(bits).map((v, i) => {
          const h = hl.has(i);
          return (
            <div key={i} className="flex aspect-square items-center justify-center rounded-[3px] font-mono text-[9px]" style={{ background: v ? 'var(--plot-1)' : 'var(--color-surface-2)', color: v ? 'var(--color-surface)' : 'var(--color-ink-3)', outline: h ? `2px solid ${last?.op === 'query' && !v ? MARK.swap.color : MARK.compare.color}` : undefined, outlineOffset: 1 }}>
              {cols <= 20 || h ? v : ''}
            </div>
          );
        })}
      </div>
      <div className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]" aria-live="polite">
        {last ? (
          <>
            <span className="font-mono">
              {last.op === 'insert' ? 'insert' : 'query'} “{last.x}”: bits {last.bits.join(', ')}
            </span>
            <span className="text-ink-2"> (gᵢ = h₁ + i·h₂ mod m). </span>
            {last.op === 'insert' ? `Set those ${k} bits to 1.` : last.result}
          </>
        ) : measured ? (
          `Inserted ${measured.n} random items, then queried ${measured.trials} items that were never inserted: ${(measured.fp * 100).toFixed(2)}% came back “probably present”.`
        ) : (
          `Items in the filter: ${items.join(', ')}. Query a word that is not there, or fill the filter and measure.`
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Items n / bits m" value={`${N} / ${m}`} />
        <Readout label="Bits set" value={`${set} (${fmt((100 * set) / m, 3)}%)`} />
        <Readout label="Predicted FP" value={`${fmt(predicted * 100, 3)}%`} tone="var(--plot-1)" />
        <Readout label="Measured FP" value={measured && measured.n === N ? `${fmt(measured.fp * 100, 3)}%` : '–'} tone="var(--plot-4)" />
      </div>
      <div className="text-[12px] text-ink-3">
        Predicted FP = (1 − e^(−kn/m))^k with n = items now in the filter. Best k for this n and m: (m/n) ln 2 ≈ {Number.isFinite(kOpt) ? fmt(kOpt, 2) : '–'}. Expected fraction of bits set: 1 − e^(−kn/m) ≈ {fmt(100 * (1 - Math.exp((-k * N) / m)), 3)}%.
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Field label="Word" value={word} onChange={setWord} onEnter={() => query(word.trim())} width="w-28" mono={false} />
        <Button primary onClick={() => insert(word.trim())}>
          Insert
        </Button>
        <Button onClick={() => query(word.trim())}>Query</Button>
        <Button
          onClick={() => {
            setItems([]);
            setLast(null);
            setMeasured(null);
          }}
        >
          Clear
        </Button>
      </div>
      <Controls cols={3}>
        <Slider label="Bits m" value={m} min={16} max={512} step={16} onChange={(v) => { setM(v); setMeasured(null); setLast(null); }} format={(v) => String(v)} />
        <Slider label="Hash functions k" value={k} min={1} max={10} step={1} onChange={(v) => { setK(v); setMeasured(null); setLast(null); }} format={(v) => String(v)} />
        <Slider label="Items n" value={n} min={1} max={Math.max(2, m)} step={1} onChange={setN} format={(v) => `${v} (${fmt(m / v, 2)} bits/item)`} />
      </Controls>
      <div>
        <Button primary onClick={measure}>
          Fill with n random items and measure
        </Button>
      </div>
    </Frame>
  );
}

export default function HashTable({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['table', 'bloom'] as const, 'table');
  return mode === 'bloom' ? <BloomMode params={params} /> : <TableMode params={params} />;
}
