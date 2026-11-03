/**
 * Hash table with chaining or open addressing (linear, quadratic, double hashing), tombstones,
 * resize and rehash, recorded step by step; plus a Bloom filter. Pure TypeScript.
 */
export type HashFn = 'mod' | 'mult' | 'string';
export type Strategy = 'chaining' | 'linear' | 'quadratic' | 'double';
export type Slot = string | 'TOMB' | null;
export type SHl = 'probe' | 'collide' | 'found' | 'insert' | 'tomb' | 'home';

export interface Table {
  m: number;
  /** Open addressing slots (unused for chaining). */
  slots: Slot[];
  /** Chaining lists (unused for open addressing). */
  chains: string[][];
  n: number;
  tombs: number;
}

export interface HashSnap {
  t: Table;
  hl: Record<number, SHl>;
  /** Order in which slots were probed by the current operation. */
  seq: number[];
  /** Chaining: highlighted chain element [slot, index, kind]. */
  chainHl?: [number, number, SHl];
  probes: number;
  d: string;
}

export const A_KNUTH = (Math.sqrt(5) - 1) / 2;

export function isNumericKey(k: string) {
  return /^\d{1,9}$/.test(k);
}

function horner(k: string, base: number, m: number): number {
  let h = 0;
  for (let i = 0; i < k.length; i++) h = (h * base + k.charCodeAt(i)) % m;
  return h;
}

export function hash1(k: string, m: number, fn: HashFn): number {
  if (fn === 'string' || !isNumericKey(k)) return horner(k, 31, m);
  const v = Number(k);
  if (fn === 'mod') return v % m;
  const f = (v * A_KNUTH) % 1;
  return Math.floor(m * f);
}

export function hash2(k: string, m: number, fn: HashFn): number {
  if (fn === 'string' || !isNumericKey(k)) return 1 + horner(k, 37, m - 1);
  return 1 + (Number(k) % (m - 1));
}

export function hashFormula(k: string, m: number, fn: HashFn): string {
  const h = hash1(k, m, fn);
  if (fn === 'string' || !isNumericKey(k)) return `h("${k}") = Σ cᵢ·31^(L−1−i) mod ${m} = ${h}`;
  const v = Number(k);
  if (fn === 'mod') return `h(${k}) = ${k} mod ${m} = ${h}`;
  return `h(${k}) = ⌊${m} · frac(${k} · 0.618…)⌋ = ⌊${m} · ${((v * A_KNUTH) % 1).toFixed(3)}⌋ = ${h}`;
}

export function probeAt(strategy: Strategy, h: number, h2: number, i: number, m: number): number {
  if (strategy === 'linear') return (h + i) % m;
  if (strategy === 'quadratic') return (h + i * i) % m;
  return (h + i * h2) % m;
}

export function emptyTable(m: number): Table {
  return { m, slots: Array(m).fill(null), chains: Array.from({ length: m }, () => []), n: 0, tombs: 0 };
}

function clone(t: Table): Table {
  return { m: t.m, slots: t.slots.slice(), chains: t.chains.map((c) => c.slice()), n: t.n, tombs: t.tombs };
}

export function nextPrime(x: number): number {
  const isP = (v: number) => {
    if (v < 2) return false;
    for (let d = 2; d * d <= v; d++) if (v % d === 0) return false;
    return true;
  };
  let v = Math.max(2, Math.ceil(x));
  while (!isP(v)) v++;
  return v;
}

export interface HashCfg {
  fn: HashFn;
  strategy: Strategy;
  /** Resize when (n + tombstones) / m would exceed this; 0 = never resize. */
  maxLoad: number;
}

export interface HashOpResult {
  snaps: HashSnap[];
  table: Table;
}

class Rec {
  snaps: HashSnap[] = [];
  seq: number[] = [];
  probes = 0;
  constructor(
    public t: Table,
    public quiet = false,
  ) {}
  snap(d: string, hl: Record<number, SHl> = {}, chainHl?: [number, number, SHl]) {
    if (this.quiet) return;
    this.snaps.push({ t: clone(this.t), hl, seq: this.seq.slice(), chainHl, probes: this.probes, d });
  }
}

const strat = (s: Strategy) => (s === 'linear' ? 'linear probing: h + i' : s === 'quadratic' ? 'quadratic probing: h + i²' : 'double hashing: h + i·h₂');

/** Insert without recording (used by rehash). Returns false if no slot was found. */
function rawInsert(t: Table, k: string, cfg: HashCfg): boolean {
  const h = hash1(k, t.m, cfg.fn);
  if (cfg.strategy === 'chaining') {
    if (!t.chains[h].includes(k)) {
      t.chains[h].push(k);
      t.n++;
    }
    return true;
  }
  const h2 = hash2(k, t.m, cfg.fn);
  for (let i = 0; i < t.m; i++) {
    const s = probeAt(cfg.strategy, h, h2, i, t.m);
    if (t.slots[s] === null || t.slots[s] === 'TOMB') {
      if (t.slots[s] === 'TOMB') t.tombs--;
      t.slots[s] = k;
      t.n++;
      return true;
    }
    if (t.slots[s] === k) return true;
  }
  return false;
}

export function keysOf(t: Table): string[] {
  return t.chains.some((c) => c.length) ? t.chains.flat() : (t.slots.filter((s) => s !== null && s !== 'TOMB') as string[]);
}

function rehash(R: Rec, cfg: HashCfg, why: string) {
  const old = R.t;
  const keys = keysOf(old);
  let m = nextPrime(old.m * 2 + 1);
  let t = emptyTable(m);
  for (;;) {
    t = emptyTable(m);
    if (keys.every((k) => rawInsert(t, k, cfg))) break;
    m = nextPrime(m + 1);
  }
  R.t = t;
  R.seq = [];
  R.snap(`${why} Resize: allocate m = ${m} (the next prime above 2·${old.m}) and reinsert all ${keys.length} keys with the new hash values${cfg.strategy === 'chaining' ? '' : '; tombstones disappear'}. Rehashing costs O(n), amortised O(1) per insert as with dynamic arrays.`);
}

export function hashInsert(table: Table, k: string, cfg: HashCfg, quiet = false): HashOpResult {
  const R = new Rec(clone(table), quiet);
  const t = () => R.t;
  const h = hash1(k, t().m, cfg.fn);
  if (cfg.strategy === 'chaining') {
    R.seq = [h];
    R.snap(`Insert ${k}: ${hashFormula(k, t().m, cfg.fn)}. Walk chain ${h} to check ${k} is not already there.`, { [h]: 'home' });
    const chain = t().chains[h];
    for (let j = 0; j < chain.length; j++) {
      R.probes++;
      if (chain[j] === k) {
        R.snap(`${k} is already in chain ${h}: nothing to insert.`, { [h]: 'found' }, [h, j, 'found']);
        return { snaps: R.snaps, table: R.t };
      }
      R.snap(`Compare with ${chain[j]}: different key (a collision in slot ${h}), keep walking.`, { [h]: 'collide' }, [h, j, 'collide']);
    }
    chain.push(k);
    t().n++;
    R.snap(`Append ${k} to chain ${h}${chain.length > 1 ? `, which now holds ${chain.length} keys` : ''}. Load factor α = n/m = ${t().n}/${t().m} = ${(t().n / t().m).toFixed(2)}.`, { [h]: 'insert' }, [h, chain.length - 1, 'insert']);
  } else {
    const h2 = hash2(k, t().m, cfg.fn);
    R.snap(`Insert ${k}: ${hashFormula(k, t().m, cfg.fn)}${cfg.strategy === 'double' ? `, h₂ = ${h2}` : ''}. Probe with ${strat(cfg.strategy)} (mod ${t().m}).`, { [h]: 'home' });
    let tomb = -1;
    let placed = -1;
    for (let i = 0; i < t().m; i++) {
      const s = probeAt(cfg.strategy, h, h2, i, t().m);
      R.seq.push(s);
      R.probes++;
      const v = t().slots[s];
      if (v === null) {
        placed = tomb >= 0 ? tomb : s;
        if (tomb >= 0) R.snap(`Probe ${i}: slot ${s} is empty, so ${k} is not in the table. Reuse the first tombstone we passed, slot ${tomb}.`, { [s]: 'probe', [tomb]: 'insert' });
        break;
      }
      if (v === 'TOMB') {
        if (tomb < 0) tomb = s;
        R.snap(`Probe ${i}: slot ${s} holds a tombstone. Remember it, but keep going: ${k} might be further along.`, { [s]: 'tomb' });
        continue;
      }
      if (v === k) {
        R.snap(`Probe ${i}: slot ${s} already holds ${k}: nothing to insert.`, { [s]: 'found' });
        return { snaps: R.snaps, table: R.t };
      }
      R.snap(`Probe ${i}: slot ${s} is taken by ${v}: collision, try the next slot in the sequence.`, { [s]: 'collide' });
    }
    if (placed < 0 && tomb >= 0) placed = tomb;
    if (placed < 0) {
      R.snap(`The probe sequence visited ${t().m} slots without finding a free one${cfg.strategy === 'quadratic' ? ' (quadratic probing can cycle through only part of the table once α > 1/2)' : ''}. The table must grow.`);
      rehash(R, cfg, 'No free slot.');
      const again = hashInsert(R.t, k, cfg, quiet);
      return { snaps: [...R.snaps, ...again.snaps], table: again.table };
    }
    if (t().slots[placed] === 'TOMB') t().tombs--;
    t().slots[placed] = k;
    t().n++;
    R.snap(`Store ${k} in slot ${placed} after ${R.probes} probe${R.probes === 1 ? '' : 's'}. α = n/m = ${t().n}/${t().m} = ${(t().n / t().m).toFixed(2)}.`, { [placed]: 'insert' });
  }
  const fill = (t().n + t().tombs) / t().m;
  if (cfg.maxLoad > 0 && fill > cfg.maxLoad) rehash(R, cfg, `${cfg.strategy === 'chaining' || t().tombs === 0 ? `α = ${fill.toFixed(2)}` : `(n + tombstones)/m = ${fill.toFixed(2)}`} exceeds the threshold ${cfg.maxLoad}.`);
  return { snaps: R.snaps, table: R.t };
}

export function hashSearch(table: Table, k: string, cfg: HashCfg, del = false, quiet = false): HashOpResult & { found: boolean } {
  const R = new Rec(clone(table), quiet);
  const t = R.t;
  const h = hash1(k, t.m, cfg.fn);
  const verb = del ? 'Delete' : 'Search for';
  if (cfg.strategy === 'chaining') {
    R.seq = [h];
    R.snap(`${verb} ${k}: ${hashFormula(k, t.m, cfg.fn)}. Walk chain ${h}.`, { [h]: 'home' });
    const chain = t.chains[h];
    for (let j = 0; j < chain.length; j++) {
      R.probes++;
      if (chain[j] === k) {
        if (del) {
          R.snap(`Found ${k} in chain ${h} after ${R.probes} comparison${R.probes === 1 ? '' : 's'}: unlink it.`, { [h]: 'found' }, [h, j, 'found']);
          chain.splice(j, 1);
          t.n--;
          R.snap(`Removed ${k}. With chaining, deletion is just a list removal.`, { [h]: 'home' });
        } else R.snap(`Found ${k} after ${R.probes} comparison${R.probes === 1 ? '' : 's'}.`, { [h]: 'found' }, [h, j, 'found']);
        return { snaps: R.snaps, table: R.t, found: true };
      }
      R.snap(`Compare with ${chain[j]}: not it.`, { [h]: 'probe' }, [h, j, 'collide']);
    }
    R.snap(`End of chain ${h}: ${k} is not in the table (${R.probes} comparison${R.probes === 1 ? '' : 's'}, the chain length).`, { [h]: 'probe' });
    return { snaps: R.snaps, table: R.t, found: false };
  }
  const h2 = hash2(k, t.m, cfg.fn);
  R.snap(`${verb} ${k}: ${hashFormula(k, t.m, cfg.fn)}${cfg.strategy === 'double' ? `, h₂ = ${h2}` : ''}. Follow the same probe sequence as insert.`, { [h]: 'home' });
  for (let i = 0; i < t.m; i++) {
    const s = probeAt(cfg.strategy, h, h2, i, t.m);
    R.seq.push(s);
    R.probes++;
    const v = t.slots[s];
    if (v === null) {
      R.snap(`Probe ${i}: slot ${s} is empty, so ${k} is not in the table (${R.probes} probes). An empty slot ends every search.`, { [s]: 'probe' });
      return { snaps: R.snaps, table: R.t, found: false };
    }
    if (v === 'TOMB') {
      R.snap(`Probe ${i}: slot ${s} is a tombstone: step over it, the chain continues.`, { [s]: 'tomb' });
      continue;
    }
    if (v === k) {
      if (del) {
        R.snap(`Probe ${i}: found ${k} in slot ${s}. Emptying the slot would cut the probe chain of later keys, so leave a tombstone.`, { [s]: 'found' });
        t.slots[s] = 'TOMB';
        t.n--;
        t.tombs++;
        R.snap(`Slot ${s} now holds a tombstone ⊠: searches pass over it, inserts may reuse it.`, { [s]: 'tomb' });
      } else R.snap(`Probe ${i}: found ${k} in slot ${s} after ${R.probes} probe${R.probes === 1 ? '' : 's'}.`, { [s]: 'found' });
      return { snaps: R.snaps, table: R.t, found: true };
    }
    R.snap(`Probe ${i}: slot ${s} holds ${v}, not ${k}: keep probing.`, { [s]: 'collide' });
  }
  R.snap(`Probed ${t.m} slots without finding ${k} or an empty slot: not present.`);
  return { snaps: R.snaps, table: R.t, found: false };
}

/** Probe counts for statistics: average over stored keys (successful) and over sample absent keys. */
export function probeStats(t: Table, cfg: HashCfg, absent: string[]): { succ: number; unsucc: number } {
  const keys = keysOf(t);
  let s = 0;
  for (const k of keys) s += countProbes(t, k, cfg);
  let u = 0;
  for (const k of absent) u += countProbes(t, k, cfg);
  return { succ: keys.length ? s / keys.length : 0, unsucc: absent.length ? u / absent.length : 0 };
}

function countProbes(t: Table, k: string, cfg: HashCfg): number {
  const h = hash1(k, t.m, cfg.fn);
  if (cfg.strategy === 'chaining') {
    const c = t.chains[h];
    const j = c.indexOf(k);
    return j >= 0 ? j + 1 : c.length;
  }
  const h2 = hash2(k, t.m, cfg.fn);
  for (let i = 0; i < t.m; i++) {
    const v = t.slots[probeAt(cfg.strategy, h, h2, i, t.m)];
    if (v === null || v === k) return i + 1;
  }
  return t.m;
}

/** Longest run of occupied (key or tombstone) slots, wrapping around. */
export function longestRun(t: Table): number {
  if (t.slots.every((s) => s !== null)) return t.m;
  let best = 0;
  let cur = 0;
  for (let i = 0; i < 2 * t.m; i++) {
    if (t.slots[i % t.m] !== null) {
      cur++;
      best = Math.max(best, Math.min(cur, t.m));
    } else cur = 0;
  }
  return best;
}

/* ------------------------------------------------------------------ Bloom filter */

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}
function djb2(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 33) + s.charCodeAt(i)) >>> 0;
  return h >>> 0;
}

/** The k bit positions of x in an m-bit filter: gᵢ(x) = h₁(x) + i·h₂(x) mod m (Kirsch–Mitzenmacher). */
export function bloomBits(x: string, m: number, k: number): number[] {
  const a = fnv1a(x);
  const b = (djb2(x) % (m - 1)) + 1;
  return Array.from({ length: k }, (_, i) => (a + i * b) % m);
}
