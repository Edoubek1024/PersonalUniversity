/** A small set-associative cache model with 3C miss classification, for the cache-sim widget. */

export type Policy = 'lru' | 'fifo' | 'random';
export type Kind = 'hit' | 'compulsory' | 'capacity' | 'conflict' | 'replacement';

export interface CacheConfig {
  size: number; // bytes
  block: number; // bytes
  ways: number; // E; equal to the number of lines for fully associative
  policy: Policy;
  addrBits: number;
  seed: number;
}

export interface Line {
  valid: boolean;
  tag: number;
  lastUse: number;
  inserted: number;
}

export interface Access {
  addr: number;
  tag: number;
  set: number;
  offset: number;
  kind: Kind;
  way: number;
  evicted: { tag: number; block: number } | null;
}

export const log2 = (n: number) => Math.round(Math.log2(n));

export function geometry(c: CacheConfig) {
  const lines = c.size / c.block;
  const E = Math.min(c.ways, lines);
  const S = lines / E;
  const b = log2(c.block);
  const s = log2(S);
  return { lines, E, S, b, s, t: c.addrBits - s - b };
}

/** Deterministic PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Runs the first `upto` accesses of `trace`. Misses that are not first touches are classified
 * against a fully associative LRU cache with the same number of lines: if that cache would also
 * miss, the miss is a capacity miss; otherwise it is a conflict miss (or, in a fully associative
 * cache with FIFO/random replacement, a replacement-policy miss).
 */
export function simulate(c: CacheConfig, trace: number[], upto = trace.length): { events: Access[]; sets: Line[][] } {
  const { lines, E, S } = geometry(c);
  const sets: Line[][] = Array.from({ length: S }, () => Array.from({ length: E }, () => ({ valid: false, tag: 0, lastUse: -1, inserted: -1 })));
  const seen = new Set<number>();
  const shadow: number[] = []; // block numbers, most recent last
  const rand = rng(c.seed);
  const events: Access[] = [];
  for (let k = 0; k < Math.min(upto, trace.length); k++) {
    const addr = trace[k];
    const blockNo = Math.floor(addr / c.block);
    const offset = addr & (c.block - 1);
    const set = blockNo & (S - 1);
    const tag = Math.floor(blockNo / S);
    // shadow fully associative LRU
    const si = shadow.indexOf(blockNo);
    const shadowHit = si !== -1;
    if (shadowHit) shadow.splice(si, 1);
    shadow.push(blockNo);
    if (shadow.length > lines) shadow.shift();

    const ways = sets[set];
    let way = ways.findIndex((l) => l.valid && l.tag === tag);
    let kind: Kind = 'hit';
    let evicted: Access['evicted'] = null;
    if (way === -1) {
      kind = !seen.has(blockNo) ? 'compulsory' : !shadowHit ? 'capacity' : E < lines ? 'conflict' : 'replacement';
      way = ways.findIndex((l) => !l.valid);
      if (way === -1) {
        if (c.policy === 'random') way = Math.floor(rand() * E);
        else {
          const key = (l: Line) => (c.policy === 'lru' ? l.lastUse : l.inserted);
          way = 0;
          for (let i = 1; i < E; i++) if (key(ways[i]) < key(ways[way])) way = i;
        }
        evicted = { tag: ways[way].tag, block: ways[way].tag * S + set };
      }
      ways[way] = { valid: true, tag, lastUse: k, inserted: k };
    } else {
      ways[way].lastUse = k;
    }
    seen.add(blockNo);
    events.push({ addr, tag, set, offset, kind, way, evicted });
  }
  return { events, sets };
}
