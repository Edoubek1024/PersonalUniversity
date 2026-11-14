/**
 * Three-point testcross analysis for gen-linkage-map: find the parental and double-crossover
 * classes, the gene order, the two interval distances, the coefficient of coincidence and the
 * interference. Also the Haldane mapping function used by the saturation mode.
 */

export type ClassKind = 'parental' | 'sco1' | 'sco2' | 'dco';

export interface ThreePoint {
  genes: string[];
  mutant: boolean[][]; // per class, per gene (input order)
  counts: number[];
  total: number;
  order: [number, number, number]; // gene indices: outer, middle, outer
  parental: [number, number]; // class indices
  dco: [number, number];
  kind: ClassKind[];
  sco1: number;
  sco2: number;
  dcoN: number;
  r1: number; // outer1 - middle
  r2: number; // middle - outer2
  rOuterObserved: number;
  expectedDco: number;
  coc: number;
  interference: number;
}

export function parseClasses(genes: string[], classes: string[]): boolean[][] {
  if (genes.length !== 3) throw new Error('parameter "genes" needs exactly three gene symbols');
  if (new Set(genes).size !== 3 || genes.includes('+')) throw new Error('parameter "genes" should be three different symbols (not "+")');
  if (classes.length !== 8) throw new Error('parameter "classes" needs 8 entries (all combinations of the three genes)');
  const out = classes.map((c, i) => {
    const toks = c.trim().split(/\s+/);
    if (toks.length !== 3) throw new Error(`classes[${i}] "${c}" should have 3 space-separated alleles, such as "${genes[0]} + ${genes[2]}"`);
    return toks.map((t, j) => {
      if (t === '+') return false;
      if (t === genes[j]) return true;
      throw new Error(`classes[${i}] "${c}": allele ${j + 1} should be "+" or "${genes[j]}", got "${t}"`);
    });
  });
  const keys = new Set(out.map((m) => m.map((b) => (b ? 1 : 0)).join('')));
  if (keys.size !== 8) throw new Error('parameter "classes" should list each of the 8 allele combinations once');
  return out;
}

const key = (m: boolean[]) => m.map((b) => (b ? 1 : 0)).join('');

export function analyseThreePoint(genes: string[], mutant: boolean[][], counts: number[]): ThreePoint {
  const total = counts.reduce((a, b) => a + b, 0);
  const idx = new Map(mutant.map((m, i) => [key(m), i]));
  const partner = mutant.map((m) => idx.get(key(m.map((b) => !b)))!);
  // reciprocal pairs
  const pairs: [number, number][] = [];
  const seen = new Set<number>();
  mutant.forEach((_, i) => {
    if (seen.has(i)) return;
    seen.add(i);
    seen.add(partner[i]);
    pairs.push([i, partner[i]]);
  });
  const pairSum = (p: [number, number]) => counts[p[0]] + counts[p[1]];
  pairs.sort((a, b) => pairSum(b) - pairSum(a));
  const parental = pairs[0];
  const dco = pairs[3];
  const P = mutant[parental[0]];
  const D = mutant[dco[0]];
  const diff = [0, 1, 2].filter((j) => P[j] !== D[j]);
  const middle = diff.length === 1 ? diff[0] : [0, 1, 2].find((j) => !diff.includes(j))!;
  const outers = [0, 1, 2].filter((j) => j !== middle);
  const order: [number, number, number] = [outers[0], middle, outers[1]];
  const kind: ClassKind[] = mutant.map((m) => {
    const d = [0, 1, 2].filter((j) => m[j] !== P[j]);
    const s = new Set(d.length > 1 ? [0, 1, 2].filter((j) => !d.includes(j)) : d); // reduce to the smaller switched set
    if (s.size === 0) return 'parental';
    if (s.size === 1 && s.has(middle)) return 'dco';
    if (s.size === 1 && s.has(order[0])) return 'sco1';
    return 'sco2';
  });
  const sum = (k: ClassKind) => counts.reduce((a, c, i) => a + (kind[i] === k ? c : 0), 0);
  const sco1 = sum('sco1');
  const sco2 = sum('sco2');
  const dcoN = sum('dco');
  const r1 = total ? (sco1 + dcoN) / total : 0;
  const r2 = total ? (sco2 + dcoN) / total : 0;
  const expectedDco = r1 * r2 * total;
  const coc = expectedDco > 0 ? dcoN / expectedDco : NaN;
  return { genes, mutant, counts, total, order, parental, dco, kind, sco1, sco2, dcoN, r1, r2, rOuterObserved: total ? (sco1 + sco2) / total : 0, expectedDco, coc, interference: 1 - coc };
}

/** Haldane: recombination frequency for map distance d in Morgans, no interference. */
export const haldane = (d: number) => 0.5 * (1 - Math.exp(-2 * d));
/** Inverse Haldane: map distance (Morgans) from a recombination frequency r < 0.5. */
export const haldaneInv = (r: number) => (r < 0.5 ? -0.5 * Math.log(1 - 2 * r) : Infinity);
