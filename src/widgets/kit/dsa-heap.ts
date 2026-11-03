/**
 * Step recorders for a binary heap stored in an array (0-based: children of i are 2i+1 and
 * 2i+2, parent is ⌊(i−1)/2⌋). Pure TypeScript, testable with `npx tsx`.
 */
export type HeapKind = 'min' | 'max';
export type HMk = 'compare' | 'swap' | 'active' | 'out';

export interface HeapSnap {
  a: number[];
  mk: Record<number, HMk>;
  /** Index whose parent/child arithmetic is shown. */
  focus: number | null;
  cmp: number;
  swaps: number;
  d: string;
  /** Value just removed by extract. */
  out?: number;
  /** Build-heap: subtrees rooted at indices >= this are already heaps. */
  built?: number;
}

export interface HeapRun {
  snaps: HeapSnap[];
  final: number[];
}

class HR {
  snaps: HeapSnap[] = [];
  cmp = 0;
  swaps = 0;
  out?: number;
  built?: number;
  constructor(
    public a: number[],
    public kind: HeapKind,
  ) {}
  /** True if x should sit above y. */
  above(x: number, y: number) {
    return this.kind === 'min' ? x < y : x > y;
  }
  snap(d: string, mk: Record<number, HMk> = {}, focus: number | null = null) {
    this.snaps.push({ a: this.a.slice(), mk, focus, cmp: this.cmp, swaps: this.swaps, d, out: this.out, built: this.built });
  }
  swap(i: number, j: number) {
    [this.a[i], this.a[j]] = [this.a[j], this.a[i]];
    this.swaps++;
  }
  get word() {
    return this.kind === 'min' ? 'smaller' : 'larger';
  }
  siftDown(i0: number) {
    const a = this.a;
    const n = a.length;
    let i = i0;
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      if (l >= n) {
        this.snap(`a[${i}] has no children (2i+1 = ${l} ≥ n = ${n}): sift-down stops.`, { [i]: 'active' }, i);
        return;
      }
      let c = l;
      if (r < n) {
        this.cmp++;
        if (this.above(a[r], a[l])) c = r;
        this.snap(`Children of i = ${i} are at 2i+1 = ${l} (${a[l]}) and 2i+2 = ${r} (${a[r]}): the ${this.word} is a[${c}] = ${a[c]}.`, { [i]: 'active', [l]: 'compare', [r]: 'compare' }, i);
      }
      this.cmp++;
      if (this.above(a[c], a[i])) {
        this.snap(`a[${c}] = ${a[c]} is ${this.word} than its parent a[${i}] = ${a[i]}: swap them.`, { [i]: 'compare', [c]: 'compare' }, i);
        this.swap(i, c);
        this.snap(`Swapped; continue sifting down from index ${c}.`, { [i]: 'swap', [c]: 'swap' }, c);
        i = c;
      } else {
        this.snap(`a[${i}] = ${a[i]} is no ${this.kind === 'min' ? 'larger' : 'smaller'} than its ${this.word} child ${a[c]}: the heap property holds here, stop.`, { [i]: 'active', [c]: 'compare' }, i);
        return;
      }
    }
  }
  siftUp(i0: number) {
    const a = this.a;
    let i = i0;
    while (i > 0) {
      const p = (i - 1) >> 1;
      this.cmp++;
      if (this.above(a[i], a[p])) {
        this.snap(`Parent of i = ${i} is ⌊(i−1)/2⌋ = ${p}. ${a[i]} is ${this.word} than ${a[p]}: swap.`, { [i]: 'compare', [p]: 'compare' }, i);
        this.swap(i, p);
        this.snap(`Swapped; continue from index ${p}.`, { [i]: 'swap', [p]: 'swap' }, p);
        i = p;
      } else {
        this.snap(`Parent of i = ${i} is ⌊(i−1)/2⌋ = ${p}. ${a[i]} is not ${this.word} than ${a[p]}: stop.`, { [i]: 'active', [p]: 'compare' }, i);
        return;
      }
    }
    this.snap(`Reached the root: sift-up stops.`, { 0: 'active' }, 0);
  }
}

export function heapInsert(heap: number[], x: number, kind: HeapKind): HeapRun {
  const r = new HR(heap.slice(), kind);
  r.a.push(x);
  const i = r.a.length - 1;
  r.snap(`Insert ${x}: append it at the end, index n − 1 = ${i}, keeping the tree complete. Then sift it up.`, { [i]: 'active' }, i);
  r.siftUp(i);
  r.snap(`Done: insert cost ${r.cmp} comparison${r.cmp === 1 ? '' : 's'} and ${r.swaps} swap${r.swaps === 1 ? '' : 's'} (at most the height ⌊log₂ n⌋ = ${Math.floor(Math.log2(r.a.length))}).`);
  return { snaps: r.snaps, final: r.a };
}

export function heapExtract(heap: number[], kind: HeapKind): HeapRun {
  const r = new HR(heap.slice(), kind);
  if (r.a.length === 0) {
    r.snap('The heap is empty: nothing to extract.');
    return { snaps: r.snaps, final: [] };
  }
  const top = r.a[0];
  r.snap(`Extract-${kind}: the root a[0] = ${top} is the ${kind === 'min' ? 'minimum' : 'maximum'}.`, { 0: 'out' }, 0);
  const last = r.a.pop() as number;
  r.out = top;
  if (r.a.length === 0) {
    r.snap(`Removed ${top}; the heap is now empty.`);
    return { snaps: r.snaps, final: [] };
  }
  r.a[0] = last;
  r.snap(`Move the last element ${last} into the root (the array shrinks to n = ${r.a.length}), then sift it down.`, { 0: 'active' }, 0);
  r.siftDown(0);
  r.snap(`Done: extracted ${top} with ${r.cmp} comparisons and ${r.swaps} swaps (at most about 2⌊log₂ n⌋ comparisons).`);
  return { snaps: r.snaps, final: r.a };
}

export function heapBuild(arr: number[], kind: HeapKind): HeapRun {
  const r = new HR(arr.slice(), kind);
  const n = r.a.length;
  const start = Math.floor(n / 2) - 1;
  r.built = start + 1;
  r.snap(`Build-heap on ${n} elements: the leaves (indices ${start + 1}..${n - 1}) are already one-element heaps. Sift down each internal node from i = ⌊n/2⌋ − 1 = ${start} back to 0.`);
  for (let i = start; i >= 0; i--) {
    r.snap(`Sift down from i = ${i}. Both subtrees below it are heaps already.`, { [i]: 'active' }, i);
    r.siftDown(i);
    r.built = i;
  }
  r.snap(`Done: a ${kind}-heap built with ${r.swaps} swaps and ${r.cmp} comparisons. Compare n = ${n} with n log₂ n ≈ ${Math.round(n * Math.log2(Math.max(2, n)))}: the bottom-up build is O(n).`);
  return { snaps: r.snaps, final: r.a };
}

/** Silent bottom-up build (no steps). */
export function heapify(arr: number[], kind: HeapKind): number[] {
  return heapBuild(arr, kind).final;
}

export function isHeap(a: number[], kind: HeapKind): boolean {
  for (let i = 1; i < a.length; i++) {
    const p = (i - 1) >> 1;
    if (kind === 'min' ? a[i] < a[p] : a[i] > a[p]) return false;
  }
  return true;
}
