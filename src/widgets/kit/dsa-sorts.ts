/**
 * Step recorders for the sorting widget. Each algorithm runs once on a copy of the input and
 * returns a list of snapshots (array contents, per-index marks, invariant regions, pointers,
 * auxiliary rows such as merge buffers or counting arrays, counters and a description).
 * Pure TypeScript, no React, so it can be tested with `npx tsx`.
 */
import { mulberry32 } from './dsa-steps';

export type Mk = 'compare' | 'swap' | 'pivot' | 'active' | 'hole' | 'taken' | 'target';

export type Tone = 'sorted' | 'less' | 'greater' | 'equal' | 'unknown' | 'heap' | 'run';

/** A half-open index range [lo, hi) with a label, drawn as a bracket under the bars. */
export interface Region {
  lo: number;
  hi: number;
  label: string;
  tone: Tone;
}

export interface AuxRow {
  label: string;
  cells: (number | null)[];
  /** Index of the main array the first cell lines up with; null = own column grid. */
  offset: number | null;
  mk: Record<number, Mk>;
  /** Labels under the cells (e.g. the key values 0..k-1 of a count array). */
  idx?: string[];
}

export interface SortSnap {
  a: (number | null)[];
  mk: Record<number, Mk>;
  settled: boolean[];
  /** Active subarray [lo, hi); other indices are drawn faded. */
  range?: [number, number];
  ptr: { i: number; label: string }[];
  regions: Region[];
  aux: AuxRow[];
  /** Ranges [lo, hi) of the active recursive calls, outermost first. */
  stack: [number, number][];
  cmp: number;
  mv: number;
  d: string;
  /** Radix sort: the digit place (1, 10, 100...) being sorted on. */
  digit?: number;
}

export type SortAlgo = 'insertion' | 'selection' | 'merge' | 'merge-bu' | 'quick' | 'heap' | 'counting' | 'radix' | 'quickselect';
export type Partition = 'lomuto' | 'hoare' | 'three-way';
export type PivotRule = 'last' | 'first' | 'random' | 'median3';

export const ALGO_LABEL: Record<SortAlgo, string> = {
  insertion: 'Insertion',
  selection: 'Selection',
  merge: 'Merge (top-down)',
  'merge-bu': 'Merge (bottom-up)',
  quick: 'Quicksort',
  heap: 'Heapsort',
  counting: 'Counting',
  radix: 'LSD radix',
  quickselect: 'Quickselect',
};

export interface SortRun {
  snaps: SortSnap[];
  invariant: string;
}

export interface SortOptions {
  partition?: Partition;
  pivot?: PivotRule;
  seed?: number;
  /** Quickselect: 1-based rank wanted (k = 1 is the minimum). */
  k?: number;
}

class Rec {
  snaps: SortSnap[] = [];
  cmp = 0;
  mv = 0;
  settled: boolean[];
  stack: [number, number][] = [];
  constructor(public a: (number | null)[]) {
    this.settled = a.map(() => false);
  }
  snap(d: string, o: Partial<SortSnap> = {}) {
    this.snaps.push({
      a: this.a.slice(),
      mk: {},
      settled: this.settled.slice(),
      ptr: [],
      regions: [],
      aux: [],
      stack: this.stack.map((s) => [s[0], s[1]] as [number, number]),
      cmp: this.cmp,
      mv: this.mv,
      d,
      ...o,
    });
  }
  swap(i: number, j: number) {
    const t = this.a[i];
    this.a[i] = this.a[j];
    this.a[j] = t;
    this.mv++;
  }
  v(i: number): number {
    return this.a[i] as number;
  }
  done(extra = '') {
    this.settled = this.settled.map(() => true);
    this.snap(`Done${extra}: ${this.cmp} comparisons and ${this.mv} swaps/moves for n = ${this.a.length}.`);
  }
}

/* ---------------------------------------------------------------- insertion */

function insertion(input: number[]): SortRun {
  const r = new Rec(input.slice());
  const n = input.length;
  const keyRow = (key: number): AuxRow => ({ label: 'key', cells: [key], offset: null, mk: { 0: 'active' } });
  const pre = (hi: number, label = 'sorted prefix'): Region[] => [{ lo: 0, hi, label, tone: 'sorted' }];
  r.snap(`Start: the prefix a[0..1) holds one element, so it is sorted. Each step inserts the next element into it.`, { regions: pre(Math.min(1, n)), ptr: n > 1 ? [{ i: 1, label: 'i' }] : [] });
  for (let i = 1; i < n; i++) {
    const key = r.v(i);
    r.a[i] = null;
    r.snap(`i = ${i}: lift key = ${key} out of a[${i}] and insert it into the sorted prefix a[0..${i}).`, { mk: { [i]: 'hole' }, aux: [keyRow(key)], regions: pre(i), ptr: [{ i, label: 'i' }] });
    let j = i - 1;
    while (j >= 0) {
      r.cmp++;
      const aj = r.v(j);
      const bigger = aj > key;
      r.snap(
        bigger ? `Compare a[${j}] = ${aj} with key ${key}: ${aj} > ${key}, so shift ${aj} one place right.` : `Compare a[${j}] = ${aj} with key ${key}: ${aj} ≤ ${key}, so the key belongs just after it (equal keys stay in order: stable).`,
        { mk: { [j]: 'compare', [j + 1]: 'hole' }, aux: [keyRow(key)], regions: pre(i + 1, 'sorted except the gap'), ptr: [{ i, label: 'i' }, { i: j, label: 'j' }] },
      );
      if (!bigger) break;
      r.a[j + 1] = aj;
      r.a[j] = null;
      r.mv++;
      r.snap(`Shift ${aj} from a[${j}] to a[${j + 1}]; the gap moves left.`, { mk: { [j + 1]: 'swap', [j]: 'hole' }, aux: [keyRow(key)], regions: pre(i + 1, 'sorted except the gap'), ptr: [{ i, label: 'i' }, { i: j, label: 'j' }] });
      j--;
    }
    r.a[j + 1] = key;
    r.mv++;
    r.snap(`${j < 0 ? 'Reached the front: ' : ''}drop key ${key} into a[${j + 1}]. Now a[0..${i + 1}) is sorted.`, { mk: { [j + 1]: 'active' }, regions: pre(i + 1), ptr: [{ i, label: 'i' }] });
  }
  r.done();
  return { snaps: r.snaps, invariant: 'Before step i: the prefix a[0..i) is sorted and holds exactly the original first i elements.' };
}

/* ---------------------------------------------------------------- selection */

function selection(input: number[]): SortRun {
  const r = new Rec(input.slice());
  const n = input.length;
  const pre = (i: number): Region[] => (i > 0 ? [{ lo: 0, hi: i, label: `${i} smallest, final`, tone: 'sorted' }] : []);
  for (let i = 0; i < n - 1; i++) {
    let m = i;
    r.snap(`i = ${i}: scan a[${i}..${n}) for its minimum. Start with min = a[${i}] = ${r.v(i)}.`, { mk: { [i]: 'active' }, regions: pre(i), ptr: [{ i, label: 'i, min' }] });
    for (let j = i + 1; j < n; j++) {
      r.cmp++;
      const less = r.v(j) < r.v(m);
      r.snap(`Compare a[${j}] = ${r.v(j)} with the current minimum a[${m}] = ${r.v(m)}: ${less ? 'smaller, so it becomes the new minimum' : 'not smaller, keep the minimum'}.`, {
        mk: { [j]: 'compare', [m]: 'active' },
        regions: pre(i),
        ptr: [{ i, label: 'i' }, { i: m, label: 'min' }, { i: j, label: 'j' }],
      });
      if (less) m = j;
    }
    if (m !== i) {
      r.swap(i, m);
      r.settled[i] = true;
      r.snap(`Swap the minimum ${r.v(i)} into a[${i}]. It is now in its final place.`, { mk: { [i]: 'swap', [m]: 'swap' }, regions: pre(i + 1), ptr: [{ i, label: 'i' }] });
    } else {
      r.settled[i] = true;
      r.snap(`a[${i}] = ${r.v(i)} is already the minimum: no swap needed. It is final.`, { mk: { [i]: 'active' }, regions: pre(i + 1), ptr: [{ i, label: 'i' }] });
    }
  }
  r.done();
  return { snaps: r.snaps, invariant: 'Before step i: a[0..i) holds the i smallest elements in sorted order, each in its final place.' };
}

/* ---------------------------------------------------------------- merge */

function mergeInto(r: Rec, lo: number, mid: number, hi: number) {
  const buf: number[] = [];
  const row = (fresh?: number): AuxRow => {
    const cells: (number | null)[] = Array.from({ length: hi - lo }, (_, k) => (k < buf.length ? buf[k] : null));
    return { label: 'buffer', cells, offset: lo, mk: fresh === undefined ? {} : { [fresh]: 'swap' } };
  };
  const taken: Record<number, Mk> = {};
  const runs: Region[] = [
    { lo, hi: mid, label: 'left run', tone: 'run' },
    { lo: mid, hi, label: 'right run', tone: 'run' },
  ];
  r.snap(`Merge the sorted runs a[${lo}..${mid}) and a[${mid}..${hi}) into a buffer.`, { range: [lo, hi], regions: runs, aux: [row()] });
  let i = lo;
  let j = mid;
  while (i < mid && j < hi) {
    r.cmp++;
    const left = r.v(i) <= r.v(j);
    r.snap(`Compare the run heads a[${i}] = ${r.v(i)} and a[${j}] = ${r.v(j)}: take the ${left ? `left one${r.v(i) === r.v(j) ? ' (ties go left: stable)' : ''}` : 'right one'}.`, {
      range: [lo, hi],
      regions: runs,
      aux: [row()],
      mk: { ...taken, [i]: 'compare', [j]: 'compare' },
      ptr: [{ i, label: 'i' }, { i: j, label: 'j' }],
    });
    const from = left ? i++ : j++;
    buf.push(r.v(from));
    taken[from] = 'taken';
    r.mv++;
    r.snap(`Write ${buf[buf.length - 1]} to buffer[${buf.length - 1}].`, { range: [lo, hi], regions: runs, aux: [row(buf.length - 1)], mk: { ...taken }, ptr: [{ i, label: 'i' }, { i: j, label: 'j' }] });
  }
  if (i < mid || j < hi) {
    const [s, e, side] = i < mid ? [i, mid, 'left'] : [j, hi, 'right'];
    for (let k = s; k < e; k++) {
      buf.push(r.v(k));
      taken[k] = 'taken';
      r.mv++;
    }
    r.snap(`The other run is used up: copy the rest of the ${side} run (${e - s} element${e - s === 1 ? '' : 's'}) to the buffer, no comparisons needed.`, { range: [lo, hi], regions: runs, aux: [row()], mk: { ...taken } });
  }
  for (let k = 0; k < buf.length; k++) r.a[lo + k] = buf[k];
  r.mv += buf.length;
  const mk: Record<number, Mk> = {};
  for (let k = lo; k < hi; k++) mk[k] = 'swap';
  r.snap(`Copy the buffer back: a[${lo}..${hi}) is now one sorted run.`, { range: [lo, hi], regions: [{ lo, hi, label: 'sorted run', tone: 'sorted' }], mk });
}

function mergeTopDown(input: number[]): SortRun {
  const r = new Rec(input.slice());
  const sort = (lo: number, hi: number) => {
    if (hi - lo <= 1) return;
    r.stack.push([lo, hi]);
    const mid = lo + Math.floor((hi - lo) / 2);
    r.snap(`Depth ${r.stack.length - 1}: split a[${lo}..${hi}) into a[${lo}..${mid}) and a[${mid}..${hi}) and sort each half recursively.`, { range: [lo, hi] });
    sort(lo, mid);
    sort(mid, hi);
    mergeInto(r, lo, mid, hi);
    r.stack.pop();
  };
  sort(0, input.length);
  r.done();
  return { snaps: r.snaps, invariant: 'When merge(lo, mid, hi) runs, a[lo..mid) and a[mid..hi) are each sorted; the buffer holds the smallest elements of both, in order.' };
}

function mergeBottomUp(input: number[]): SortRun {
  const r = new Rec(input.slice());
  const n = input.length;
  for (let w = 1; w < n; w *= 2) {
    const runs: Region[] = [];
    for (let k = 0; k < n; k += w) runs.push({ lo: k, hi: Math.min(n, k + w), label: `w=${w}`, tone: 'run' });
    r.snap(`Pass with width ${w}: every run of length ${w} is sorted. Merge neighbouring pairs of runs.`, { regions: runs });
    for (let lo = 0; lo < n - w; lo += 2 * w) mergeInto(r, lo, lo + w, Math.min(lo + 2 * w, n));
  }
  r.done();
  return { snaps: r.snaps, invariant: 'Before the pass with width w, every run a[kw..(k+1)w) is sorted. No recursion: runs of 1, 2, 4, ... are merged.' };
}

/* ---------------------------------------------------------------- quicksort */

function choosePivot(r: Rec, lo: number, hi: number, rule: PivotRule, rng: () => number): { p: number; why: string } {
  if (rule === 'last') return { p: hi, why: 'last element' };
  if (rule === 'first') return { p: lo, why: 'first element' };
  if (rule === 'random') return { p: lo + Math.floor(rng() * (hi - lo + 1)), why: 'random index' };
  const mid = lo + Math.floor((hi - lo) / 2);
  const idx = [lo, mid, hi];
  // median of three with explicit (counted) comparisons
  r.cmp++;
  if (r.v(idx[1]) < r.v(idx[0])) [idx[0], idx[1]] = [idx[1], idx[0]];
  r.cmp++;
  if (r.v(idx[2]) < r.v(idx[1])) [idx[1], idx[2]] = [idx[2], idx[1]];
  r.cmp++;
  if (r.v(idx[1]) < r.v(idx[0])) [idx[0], idx[1]] = [idx[1], idx[0]];
  return { p: idx[1], why: `median of a[${lo}], a[${mid}], a[${hi}]` };
}

interface QCtx {
  r: Rec;
  rule: PivotRule;
  rng: () => number;
  /** Quickselect target index, if selecting. */
  target?: number;
}

/** Lomuto partition of a[lo..hi] (inclusive). Returns the pivot's final index. */
function lomuto(c: QCtx, lo: number, hi: number): number {
  const { r } = c;
  const { p, why } = choosePivot(r, lo, hi, c.rule, c.rng);
  const range: [number, number] = [lo, hi + 1];
  const tg = c.target !== undefined ? { [c.target]: 'target' as Mk } : {};
  if (p !== hi) {
    r.swap(p, hi);
    r.snap(`Partition a[${lo}..${hi}]: pivot = ${r.v(hi)} (${why}); swap it to the end, a[${hi}].`, { range, mk: { ...tg, [hi]: 'pivot', [p]: 'swap' } });
  } else {
    r.snap(`Partition a[${lo}..${hi}]: pivot = a[${hi}] = ${r.v(hi)} (${why}).`, { range, mk: { ...tg, [hi]: 'pivot' } });
  }
  const x = r.v(hi);
  let i = lo - 1;
  const regs = (j: number): Region[] => [
    { lo, hi: i + 1, label: '≤ p', tone: 'less' },
    { lo: i + 1, hi: j, label: '> p', tone: 'greater' },
    { lo: j, hi, label: '?', tone: 'unknown' },
  ];
  for (let j = lo; j < hi; j++) {
    r.cmp++;
    const le = r.v(j) <= x;
    const ptr = [...(i >= lo ? [{ i, label: 'i' }] : []), { i: j, label: 'j' }];
    r.snap(le ? `Compare a[${j}] = ${r.v(j)} with pivot ${x}: ≤ p, so it joins the left region (i becomes ${i + 1}).` : `Compare a[${j}] = ${r.v(j)} with pivot ${x}: > p, so it stays in the right region.`, {
      range,
      regions: regs(j),
      mk: { ...tg, [j]: 'compare', [hi]: 'pivot' },
      ptr,
    });
    if (le) {
      i++;
      if (i !== j) {
        r.swap(i, j);
        r.snap(`Swap a[${i}] and a[${j}] so the ≤ region grows by one.`, { range, regions: regs(j + 1), mk: { ...tg, [i]: 'swap', [j]: 'swap', [hi]: 'pivot' }, ptr: [{ i, label: 'i' }, { i: j, label: 'j' }] });
      }
    }
  }
  const q = i + 1;
  if (q !== hi) r.swap(q, hi);
  r.settled[q] = true;
  r.snap(`Swap the pivot into a[${q}]: everything left of it is ≤ ${x}, everything right is > ${x}. The pivot is in its final place.`, {
    range,
    regions: [
      { lo, hi: q, label: '≤ p', tone: 'less' },
      { lo: q + 1, hi: hi + 1, label: '> p', tone: 'greater' },
    ],
    mk: { ...tg, [q]: 'pivot', ...(q !== hi ? { [hi]: 'swap' as Mk } : {}) },
    ptr: [{ i: q, label: 'q' }],
  });
  return q;
}

function quickLomuto(c: QCtx, lo: number, hi: number) {
  const { r } = c;
  if (lo > hi) return;
  if (lo === hi) {
    r.settled[lo] = true;
    r.snap(`a[${lo}..${hi}] has one element: it is in its final place.`, { range: [lo, hi + 1] });
    return;
  }
  r.stack.push([lo, hi + 1]);
  const q = lomuto(c, lo, hi);
  quickLomuto(c, lo, q - 1);
  quickLomuto(c, q + 1, hi);
  r.stack.pop();
}

function quickHoare(c: QCtx, lo: number, hi: number) {
  const { r } = c;
  if (lo > hi) return;
  if (lo === hi) {
    r.settled[lo] = true;
    r.snap(`a[${lo}..${hi}] has one element: it is in its final place.`, { range: [lo, hi + 1] });
    return;
  }
  r.stack.push([lo, hi + 1]);
  const range: [number, number] = [lo, hi + 1];
  const { p, why } = choosePivot(r, lo, hi, c.rule, c.rng);
  if (p !== lo) {
    r.swap(p, lo);
    r.snap(`Partition a[${lo}..${hi}] (Hoare): pivot = ${r.v(lo)} (${why}); swap it to the front, a[${lo}].`, { range, mk: { [lo]: 'pivot', [p]: 'swap' } });
  } else {
    r.snap(`Partition a[${lo}..${hi}] (Hoare): pivot p = a[${lo}] = ${r.v(lo)} (${why}). i starts left of the range, j right of it.`, { range, mk: { [lo]: 'pivot' } });
  }
  const x = r.v(lo);
  let pi = lo; // where the pivot value currently sits
  let i = lo - 1;
  let j = hi + 1;
  let leEnd = lo; // a[lo..leEnd) known ≤ p
  let geStart = hi + 1; // a[geStart..hi] known ≥ p
  const regs = (): Region[] => [
    { lo, hi: leEnd, label: '≤ p', tone: 'less' },
    { lo: geStart, hi: hi + 1, label: '≥ p', tone: 'greater' },
  ];
  const ptrs = () => [...(i >= lo ? [{ i, label: 'i' }] : []), ...(j <= hi ? [{ i: j, label: 'j' }] : [])];
  for (;;) {
    for (;;) {
      j--;
      r.cmp++;
      const stop = r.v(j) <= x;
      if (!stop) geStart = j;
      r.snap(stop ? `j scans left: a[${j}] = ${r.v(j)} ≤ p, so j stops here.` : `j scans left: a[${j}] = ${r.v(j)} > p, keep going.`, { range, regions: regs(), mk: { [pi]: 'pivot', [j]: 'compare' }, ptr: ptrs() });
      if (stop) break;
    }
    for (;;) {
      i++;
      r.cmp++;
      const stop = r.v(i) >= x;
      if (!stop) leEnd = i + 1;
      r.snap(stop ? `i scans right: a[${i}] = ${r.v(i)} ≥ p, so i stops here.` : `i scans right: a[${i}] = ${r.v(i)} < p, keep going.`, { range, regions: regs(), mk: { [pi]: 'pivot', [i]: 'compare' }, ptr: ptrs() });
      if (stop) break;
    }
    if (i < j) {
      r.swap(i, j);
      if (pi === i) pi = j;
      else if (pi === j) pi = i;
      leEnd = i + 1;
      geStart = j;
      r.snap(`i < j: swap a[${i}] and a[${j}]; now a[${lo}..${i}] ≤ p and a[${j}..${hi}] ≥ p.`, { range, regions: regs(), mk: { [i]: 'swap', [j]: 'swap', [pi]: 'pivot' }, ptr: ptrs() });
    } else {
      r.snap(`i ≥ j: the pointers have crossed. Split at j = ${j}: every element of a[${lo}..${j}] is ≤ every element of a[${j + 1}..${hi}]. (The pivot need not be at the split.)`, {
        range,
        regions: [
          { lo, hi: j + 1, label: '≤ p', tone: 'less' },
          { lo: j + 1, hi: hi + 1, label: '≥ p', tone: 'greater' },
        ],
        mk: { [pi]: 'pivot' },
        ptr: [{ i: j, label: 'j' }],
      });
      break;
    }
  }
  quickHoare(c, lo, j);
  quickHoare(c, j + 1, hi);
  r.stack.pop();
}

function quick3(c: QCtx, lo: number, hi: number) {
  const { r } = c;
  if (lo > hi) return;
  if (lo === hi) {
    r.settled[lo] = true;
    r.snap(`a[${lo}..${hi}] has one element: it is in its final place.`, { range: [lo, hi + 1] });
    return;
  }
  r.stack.push([lo, hi + 1]);
  const range: [number, number] = [lo, hi + 1];
  const { p, why } = choosePivot(r, lo, hi, c.rule, c.rng);
  if (p !== lo) r.swap(p, lo);
  const v = r.v(lo);
  let lt = lo;
  let i = lo + 1;
  let gt = hi;
  const regs = (): Region[] => [
    { lo, hi: lt, label: '< p', tone: 'less' },
    { lo: lt, hi: i, label: '= p', tone: 'equal' },
    { lo: i, hi: gt + 1, label: '?', tone: 'unknown' },
    { lo: gt + 1, hi: hi + 1, label: '> p', tone: 'greater' },
  ];
  const eq = (): Record<number, Mk> => {
    const m: Record<number, Mk> = {};
    for (let k = lt; k < i; k++) m[k] = 'pivot';
    return m;
  };
  const ptrs = () => [{ i: lt, label: 'lt' }, ...(i <= hi ? [{ i, label: 'i' }] : []), { i: gt, label: 'gt' }];
  r.snap(`Three-way partition of a[${lo}..${hi}]: pivot p = ${v} (${why}${p !== lo ? ', moved to the front' : ''}). Regions: < p, = p, unexamined, > p.`, { range, regions: regs(), mk: eq(), ptr: ptrs() });
  while (i <= gt) {
    const ai = r.v(i);
    r.cmp++;
    if (ai < v) {
      r.snap(`a[${i}] = ${ai} < p: swap it with a[lt] = a[${lt}], then lt++ and i++.`, { range, regions: regs(), mk: { ...eq(), [i]: 'compare' }, ptr: ptrs() });
      r.swap(lt, i);
      lt++;
      i++;
      continue;
    }
    r.cmp++;
    if (ai > v) {
      r.snap(`a[${i}] = ${ai} > p: swap it with a[gt] = a[${gt}], then gt−− (i stays: the new a[i] is unexamined).`, { range, regions: regs(), mk: { ...eq(), [i]: 'compare' }, ptr: ptrs() });
      r.swap(i, gt);
      gt--;
    } else {
      r.snap(`a[${i}] = ${ai} = p: it joins the equal region, i++.`, { range, regions: regs(), mk: { ...eq(), [i]: 'compare' }, ptr: ptrs() });
      i++;
    }
  }
  for (let k = lt; k <= gt; k++) r.settled[k] = true;
  r.snap(`Done partitioning: the ${gt - lt + 1} element${gt === lt ? '' : 's'} equal to ${v} (a[${lt}..${gt}]) are final. Recurse only on the < and > parts.`, { range, regions: regs(), mk: eq(), ptr: [{ i: lt, label: 'lt' }, { i: gt, label: 'gt' }] });
  quick3(c, lo, lt - 1);
  quick3(c, gt + 1, hi);
  r.stack.pop();
}

function quicksort(input: number[], o: SortOptions): SortRun {
  const r = new Rec(input.slice());
  const part = o.partition ?? 'lomuto';
  const rule = o.pivot ?? (part === 'lomuto' ? 'last' : 'first');
  const c: QCtx = { r, rule, rng: mulberry32((o.seed ?? 1) * 104729 + 3) };
  if (part === 'lomuto') quickLomuto(c, 0, input.length - 1);
  else if (part === 'hoare') quickHoare(c, 0, input.length - 1);
  else quick3(c, 0, input.length - 1);
  r.done();
  const inv =
    part === 'lomuto'
      ? 'During partition: a[lo..i] ≤ p, a[i+1..j) > p, a[j..hi) not yet examined, pivot p at a[hi].'
      : part === 'hoare'
        ? 'During partition: everything left of i is ≤ p and everything right of j is ≥ p; when i and j cross, j is the split.'
        : 'During partition: a[lo..lt) < p, a[lt..i) = p, a[i..gt] not yet examined, a(gt..hi] > p.';
  return { snaps: r.snaps, invariant: inv };
}

/* ---------------------------------------------------------------- quickselect */

function quickselect(input: number[], o: SortOptions): SortRun {
  const r = new Rec(input.slice());
  const n = input.length;
  const k = Math.max(1, Math.min(n, o.k ?? Math.ceil(n / 2)));
  const t = k - 1;
  const c: QCtx = { r, rule: o.pivot ?? 'random', rng: mulberry32((o.seed ?? 1) * 104729 + 3), target: t };
  let lo = 0;
  let hi = n - 1;
  r.snap(`Find the k = ${k}${ord(k)} smallest element, which belongs at index ${t} once sorted. Partition, then keep only the side that contains index ${t}.`, { mk: { [t]: 'target' }, ptr: [{ i: t, label: 'k−1' }] });
  for (;;) {
    if (lo === hi) {
      r.settled[lo] = true;
      r.snap(`Only a[${lo}] is left: it is the ${k}${ord(k)} smallest, ${r.v(lo)}. ${r.cmp} comparisons in all (n = ${n}).`, { range: [lo, hi + 1], mk: { [lo]: 'pivot' } });
      break;
    }
    const q = lomuto(c, lo, hi);
    if (q === t) {
      r.snap(`The pivot landed exactly at index ${t}: the ${k}${ord(k)} smallest is ${r.v(q)}. ${r.cmp} comparisons in all (n = ${n}); a full sort would need about n log₂ n.`, { range: [lo, hi + 1], mk: { [q]: 'pivot' } });
      break;
    }
    if (t < q) {
      r.snap(`Index ${t} is left of the pivot (q = ${q}): discard a[${q}..${hi}] and continue in a[${lo}..${q - 1}].`, { range: [lo, q], mk: { [t]: 'target' } });
      hi = q - 1;
    } else {
      r.snap(`Index ${t} is right of the pivot (q = ${q}): discard a[${lo}..${q}] and continue in a[${q + 1}..${hi}].`, { range: [q + 1, hi + 1], mk: { [t]: 'target' } });
      lo = q + 1;
    }
  }
  return { snaps: r.snaps, invariant: `The ${k}${ord(k)} smallest element always lies in the live range a[lo..hi]; each partition shrinks the range and never needs to look at the discarded side again.` };
}

function ord(k: number): string {
  const m = k % 100;
  if (m >= 11 && m <= 13) return 'th';
  return k % 10 === 1 ? 'st' : k % 10 === 2 ? 'nd' : k % 10 === 3 ? 'rd' : 'th';
}

/* ---------------------------------------------------------------- heapsort */

function heapsort(input: number[]): SortRun {
  const r = new Rec(input.slice());
  const n = input.length;
  let size = n;
  const regs = (): Region[] => [
    ...(size > 0 ? [{ lo: 0, hi: size, label: phase === 'build' ? 'building max-heap' : 'max-heap', tone: 'heap' as Tone }] : []),
    ...(size < n ? [{ lo: size, hi: n, label: 'sorted', tone: 'sorted' as Tone }] : []),
  ];
  let phase: 'build' | 'sort' = 'build';
  const sift = (i0: number) => {
    let i = i0;
    for (;;) {
      const l = 2 * i + 1;
      if (l >= size) {
        r.snap(`a[${i}] has no children inside the heap: sift-down stops.`, { regions: regs(), mk: { [i]: 'active' }, ptr: [{ i, label: 'i' }] });
        break;
      }
      let ch = l;
      if (l + 1 < size) {
        r.cmp++;
        if (r.v(l + 1) > r.v(l)) ch = l + 1;
        r.snap(`Children of a[${i}] are a[${l}] = ${r.v(l)} and a[${l + 1}] = ${r.v(l + 1)} (2i+1, 2i+2): the larger is a[${ch}].`, { regions: regs(), mk: { [i]: 'active', [l]: 'compare', [l + 1]: 'compare' }, ptr: [{ i, label: 'i' }] });
      }
      r.cmp++;
      if (r.v(ch) > r.v(i)) {
        r.snap(`a[${ch}] = ${r.v(ch)} > a[${i}] = ${r.v(i)}: swap them and continue from ${ch}.`, { regions: regs(), mk: { [i]: 'compare', [ch]: 'compare' }, ptr: [{ i, label: 'i' }, { i: ch, label: 'child' }] });
        r.swap(i, ch);
        r.snap(`Swapped. The heap property now holds at index ${i}.`, { regions: regs(), mk: { [i]: 'swap', [ch]: 'swap' }, ptr: [{ i: ch, label: 'i' }] });
        i = ch;
      } else {
        r.snap(`a[${i}] = ${r.v(i)} ≥ its larger child ${r.v(ch)}: heap property holds, sift-down stops.`, { regions: regs(), mk: { [i]: 'active', [ch]: 'compare' }, ptr: [{ i, label: 'i' }] });
        break;
      }
    }
  };
  r.snap(`Phase 1, build a max-heap bottom-up: sift down a[i] for i = ⌊n/2⌋−1 = ${Math.floor(n / 2) - 1} down to 0. Leaves are already heaps.`, { regions: regs() });
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    r.snap(`Sift down from i = ${i}; the subtrees below it are already heaps.`, { regions: regs(), mk: { [i]: 'active' }, ptr: [{ i, label: 'i' }] });
    sift(i);
  }
  phase = 'sort';
  r.snap(`Phase 2: a[0] = ${r.v(0)} is the maximum. Repeatedly swap it to the end of the heap and sift the new root down.`, { regions: regs(), mk: { 0: 'active' } });
  for (let end = n - 1; end >= 1; end--) {
    r.swap(0, end);
    size = end;
    r.settled[end] = true;
    r.snap(`Swap the maximum ${r.v(end)} into a[${end}]; it is final. The heap shrinks to a[0..${end}).`, { regions: regs(), mk: { 0: 'swap', [end]: 'swap' } });
    sift(0);
  }
  size = 0;
  r.done();
  return { snaps: r.snaps, invariant: 'Phase 2: a[0..end) is a max-heap (children of i are 2i+1 and 2i+2), and a[end..n) holds the n − end largest elements in sorted order.' };
}

/* ---------------------------------------------------------------- counting / radix */

function counting(input: number[]): SortRun {
  if (input.some((v) => v < 0 || v > 30 || !Number.isInteger(v))) throw new Error('counting sort needs whole-number keys between 0 and 30');
  const r = new Rec(input.slice());
  const n = input.length;
  const k = Math.max(...input) + 1;
  const count = Array<number>(k).fill(0);
  const out: (number | null)[] = Array(n).fill(null);
  const idx = Array.from({ length: k }, (_, v) => String(v));
  let start: (number | null)[] = Array(k).fill(null);
  const rows = (mc: Record<number, Mk> = {}, ms: Record<number, Mk> = {}, mo: Record<number, Mk> = {}): AuxRow[] => [
    { label: 'count[v]', cells: count.slice(), offset: null, mk: mc, idx },
    { label: 'next[v] (start position)', cells: start.slice(), offset: null, mk: ms, idx },
    { label: 'output', cells: out.slice(), offset: 0, mk: mo },
  ];
  r.snap(`Keys are integers in [0, k) with k = ${k}. Pass 1 counts each key. No two keys are ever compared.`, { aux: rows() });
  for (let i = 0; i < n; i++) {
    count[r.v(i)]++;
    r.snap(`a[${i}] = ${r.v(i)}: count[${r.v(i)}] becomes ${count[r.v(i)]}.`, { aux: rows({ [r.v(i)]: 'swap' }), mk: { [i]: 'active' }, ptr: [{ i, label: 'i' }] });
  }
  let run = 0;
  start = count.map((c) => {
    const s = run;
    run += c;
    return s;
  });
  r.snap(`Pass 2, prefix sums: next[v] = count[0] + … + count[v−1] is where the first v goes. For example next[${input[0]}] = ${start[input[0]]}.`, { aux: rows({}, Object.fromEntries(start.map((_, v) => [v, 'active' as Mk]))) });
  for (let i = 0; i < n; i++) {
    const v = r.v(i);
    const pos = start[v] as number;
    out[pos] = v;
    start[v] = pos + 1;
    r.mv++;
    r.snap(`Pass 3: a[${i}] = ${v} goes to output[${pos}], then next[${v}] becomes ${pos + 1}. Elements are placed in input order, so equal keys keep their order: stable.`, {
      aux: rows({}, { [v]: 'swap' }, { [pos]: 'swap' }),
      mk: { [i]: 'active' },
      ptr: [{ i, label: 'i' }],
    });
  }
  for (let i = 0; i < n; i++) r.a[i] = out[i];
  r.mv += n;
  r.settled = r.settled.map(() => true);
  r.snap(`Copy the output back. Total work O(n + k) = O(${n} + ${k}); comparisons: ${r.cmp}.`, { aux: rows() });
  return { snaps: r.snaps, invariant: 'After the prefix-sum pass, next[v] is the first output slot for key v; placing elements in input order keeps equal keys in order (stability).' };
}

function radix(input: number[]): SortRun {
  if (input.some((v) => v < 0 || v > 9999 || !Number.isInteger(v))) throw new Error('radix sort here needs whole-number keys between 0 and 9999');
  const r = new Rec(input.slice());
  const n = input.length;
  const mx = Math.max(...input);
  const digits = Math.max(1, String(mx).length);
  const idx = Array.from({ length: 10 }, (_, v) => String(v));
  const name = ['ones', 'tens', 'hundreds', 'thousands'];
  for (let d = 0, place = 1; d < digits; d++, place *= 10) {
    const dig = (x: number) => Math.floor(x / place) % 10;
    const count = Array<number>(10).fill(0);
    let next: (number | null)[] = Array(10).fill(null);
    const out: (number | null)[] = Array(n).fill(null);
    const rows = (mc: Record<number, Mk> = {}, ms: Record<number, Mk> = {}, mo: Record<number, Mk> = {}): AuxRow[] => [
      { label: `count of ${name[d]} digit`, cells: count.slice(), offset: null, mk: mc, idx },
      { label: 'next[d]', cells: next.slice(), offset: null, mk: ms, idx },
      { label: 'output', cells: out.slice(), offset: 0, mk: mo },
    ];
    r.snap(`Pass ${d + 1} of ${digits}: stable counting sort on the ${name[d]} digit (highlighted). ${d === 0 ? 'Least significant digit first.' : `The array is already sorted by the last ${d} digit${d > 1 ? 's' : ''}; stability keeps that order among equal ${name[d]} digits.`}`, {
      aux: rows(),
      digit: place,
    });
    for (let i = 0; i < n; i++) {
      count[dig(r.v(i))]++;
      r.snap(`a[${i}] = ${r.v(i)} has ${name[d]} digit ${dig(r.v(i))}: count it.`, { aux: rows({ [dig(r.v(i))]: 'swap' }), mk: { [i]: 'active' }, digit: place, ptr: [{ i, label: 'i' }] });
    }
    let run = 0;
    next = count.map((c) => {
      const s = run;
      run += c;
      return s;
    });
    r.snap(`Prefix sums give each digit's first output slot.`, { aux: rows(), digit: place });
    for (let i = 0; i < n; i++) {
      const g = dig(r.v(i));
      const pos = next[g] as number;
      out[pos] = r.v(i);
      next[g] = pos + 1;
      r.mv++;
      r.snap(`a[${i}] = ${r.v(i)} (digit ${g}) goes to output[${pos}].`, { aux: rows({}, { [g]: 'swap' }, { [pos]: 'swap' }), mk: { [i]: 'active' }, digit: place, ptr: [{ i, label: 'i' }] });
    }
    for (let i = 0; i < n; i++) r.a[i] = out[i];
    r.mv += n;
    if (d === digits - 1) r.settled = r.settled.map(() => true);
    r.snap(d === digits - 1 ? `Copy back. After ${digits} stable passes the array is sorted, with ${r.cmp} comparisons: O(d(n + b)) = O(${digits}·(${n} + 10)).` : `Copy back: the array is now sorted by its last ${d + 1} digit${d ? 's' : ''}.`, {
      aux: rows(),
      digit: place,
    });
  }
  return { snaps: r.snaps, invariant: 'After pass d, the array is sorted by its last d digits; each pass must be stable or earlier passes are undone.' };
}

/* ---------------------------------------------------------------- dispatch */

export function runSort(algo: SortAlgo, input: number[], o: SortOptions = {}): SortRun {
  if (input.length === 0) throw new Error('the input list is empty');
  switch (algo) {
    case 'insertion':
      return insertion(input);
    case 'selection':
      return selection(input);
    case 'merge':
      return mergeTopDown(input);
    case 'merge-bu':
      return mergeBottomUp(input);
    case 'quick':
      return quicksort(input, o);
    case 'heap':
      return heapsort(input);
    case 'counting':
      return counting(input);
    case 'radix':
      return radix(input);
    case 'quickselect':
      return quickselect(input, o);
  }
}

/** Number of inversions (pairs i < j with a[i] > a[j]). */
export function inversions(a: number[]): number {
  let c = 0;
  for (let i = 0; i < a.length; i++) for (let j = i + 1; j < a.length; j++) if (a[i] > a[j]) c++;
  return c;
}
