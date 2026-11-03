/**
 * Step recorder for binary search variants (pure, testable with `npx tsx`).
 *
 *  lower   bisect_left on the half-open interval [lo, hi): first index with a[i] >= x
 *  upper   bisect_right: first index with a[i] > x
 *  closed  classic exact search on the closed interval [lo, hi] (returns an index or -1)
 *  answer  binary search on a monotone predicate P(v) = f(v) >= t over integers [lo, hi)
 */
export type SearchVariant = 'lower' | 'upper' | 'closed';

export interface SearchSnap {
  lo: number;
  hi: number;
  mid: number | null;
  probes: number;
  d: string;
  /** Final answer index, when finished. */
  result?: number;
  /** For the answer mode: predicate values found so far, by v. */
  known?: Record<number, boolean>;
}

export function binarySearchSteps(a: number[], x: number, variant: SearchVariant): SearchSnap[] {
  const n = a.length;
  const out: SearchSnap[] = [];
  let probes = 0;
  if (variant === 'closed') {
    let lo = 0;
    let hi = n - 1;
    out.push({ lo, hi, mid: null, probes, d: `Closed interval: lo = 0, hi = n − 1 = ${n - 1}. If ${x} is present, it lies in a[lo..hi].` });
    while (lo <= hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      probes++;
      const v = a[mid];
      if (v === x) {
        out.push({ lo, hi, mid, probes, d: `mid = lo + (hi − lo) // 2 = ${mid}: a[${mid}] = ${v} = x. Found at index ${mid}.`, result: mid });
        return out;
      }
      if (v < x) {
        out.push({ lo, hi, mid, probes, d: `mid = ${mid}: a[${mid}] = ${v} < ${x}, so x can only be right of mid: lo = mid + 1 = ${mid + 1}.` });
        lo = mid + 1;
      } else {
        out.push({ lo, hi, mid, probes, d: `mid = ${mid}: a[${mid}] = ${v} > ${x}, so x can only be left of mid: hi = mid − 1 = ${mid - 1}.` });
        hi = mid - 1;
      }
      out.push({ lo, hi, mid: null, probes, d: lo <= hi ? `Now lo = ${lo}, hi = ${hi}: ${hi - lo + 1} candidate${hi === lo ? '' : 's'} left.` : `lo = ${lo} > hi = ${hi}: the interval is empty.` });
    }
    out.push({ lo, hi, mid: null, probes, d: `lo > hi, so ${x} is not in the array (returns −1). Note it says nothing about where ${x} would go; the half-open lower bound does.`, result: -1 });
    return out;
  }
  const strict = variant === 'lower';
  const rel = strict ? '<' : '≤';
  const nrel = strict ? '≥' : '>';
  let lo = 0;
  let hi = n;
  out.push({ lo, hi, mid: null, probes, d: `Half-open interval [lo, hi) = [0, ${n}). Nothing is known yet, so the invariant holds trivially.` });
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    probes++;
    const v = a[mid];
    const goRight = strict ? v < x : v <= x;
    out.push({
      lo,
      hi,
      mid,
      probes,
      d: goRight
        ? `mid = lo + (hi − lo) // 2 = ${mid}: a[${mid}] = ${v} ${rel} ${x}, so a[0..${mid}] all ${rel} x: move lo = mid + 1 = ${mid + 1}.`
        : `mid = lo + (hi − lo) // 2 = ${mid}: a[${mid}] = ${v} ${nrel} ${x}, so a[${mid}..] all ${nrel} x: move hi = mid = ${mid}.`,
    });
    if (goRight) lo = mid + 1;
    else hi = mid;
    out.push({ lo, hi, mid: null, probes, d: lo < hi ? `[lo, hi) = [${lo}, ${hi}): ${hi - lo} candidate${hi - lo === 1 ? '' : 's'} left. Exactly one bound moved.` : `lo = hi = ${lo}: the interval is empty.` });
  }
  const r = lo;
  const what = strict ? `the first index with a[i] ≥ ${x} (bisect_left)` : `the first index with a[i] > ${x} (bisect_right)`;
  const found = strict ? r < n && a[r] === x : r > 0 && a[r - 1] === x;
  const extra = strict ? (found ? ` a[${r}] = ${x}, so ${x} is present and this is its first copy.` : ` a[${r}] ${r < n ? `= ${a[r]} ≠ ${x}` : 'is past the end'}, so ${x} is absent; ${r} is where it would be inserted.`) : found ? ` The copies of ${x} end just before it, at index ${r - 1}.` : ` ${x} is absent; ${r} is where it would be inserted after any equal keys.`;
  out.push({ lo, hi, mid: null, probes, d: `Stop with lo = hi = ${r}: ${what}.${extra}`, result: r });
  return out;
}

/** Binary search on the answer: smallest integer v in [lo, hi) with f(v) >= t, or hi if none. */
export function answerSearchSteps(f: (v: number) => number, t: number, lo0: number, hi0: number, fname: string): SearchSnap[] {
  const out: SearchSnap[] = [];
  const known: Record<number, boolean> = {};
  let lo = lo0;
  let hi = hi0;
  let probes = 0;
  out.push({ lo, hi, mid: null, probes, known: {}, d: `Find the smallest v in [${lo0}, ${hi0}) with P(v): ${fname} ≥ ${t}. P is false then true (monotone), so the boundary can be found by halving.` });
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    probes++;
    const fv = f(mid);
    const p = fv >= t;
    known[mid] = p;
    out.push({ lo, hi, mid, probes, known: { ...known }, d: p ? `Test v = ${mid}: ${fname.replace(/\bv\b/g, String(mid))} = ${round(fv)} ≥ ${t}, P true. The answer is ${mid} or smaller: hi = ${mid}.` : `Test v = ${mid}: ${fname.replace(/\bv\b/g, String(mid))} = ${round(fv)} < ${t}, P false. The answer is larger: lo = ${mid + 1}.` });
    if (p) hi = mid;
    else lo = mid + 1;
    out.push({ lo, hi, mid: null, probes, known: { ...known }, d: lo < hi ? `[lo, hi) = [${lo}, ${hi}): ${hi - lo} candidate${hi - lo === 1 ? '' : 's'} left.` : `lo = hi = ${lo}.` });
  }
  out.push({ lo, hi, mid: null, probes, known: { ...known }, result: lo, d: lo < hi0 ? `The boundary is v = ${lo}: the smallest value with ${fname} ≥ ${t}, found with ${probes} evaluations instead of up to ${hi0 - lo0}.` : `P is false on the whole range: no v below ${hi0} works.` });
  return out;
}

function round(x: number): string {
  return Number.isInteger(x) ? String(x) : x.toFixed(3).replace(/\.?0+$/, '');
}
