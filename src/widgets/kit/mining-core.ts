/**
 * Pure algorithms behind the data-mining widgets (mining-apriori, mining-tree-split,
 * mining-cluster, mining-cube). No React here, so the numbers can be checked from a script.
 */
import { mulberry32 } from './dsa-steps';

/* =================================================================== Apriori */

export type Itemset = string[];

export const key = (s: Itemset) => s.join('\u0001');

export interface Candidate {
  items: Itemset;
  /** Absolute support count; undefined when the candidate was pruned and never counted. */
  count?: number;
  /** The (k-1)-subset that is not frequent, when the prune step removed this candidate. */
  prunedBy?: Itemset;
  frequent: boolean;
}

export interface AprioriLevel {
  k: number;
  /** Candidates produced by the join (for k = 1: every item). */
  candidates: Candidate[];
  frequent: { items: Itemset; count: number }[];
}

export interface AprioriRun {
  items: string[];
  n: number;
  levels: AprioriLevel[];
  /** True when the last level's join produced no candidates (the algorithm stopped there). */
  emptyLast: boolean;
  support: Map<string, number>;
}

export function parseTransactions(rows: string[]): string[][] {
  if (rows.length === 0) throw new Error('parameter "transactions" needs at least one transaction');
  return rows.map((r, i) => {
    const items = [
      ...new Set(
        r
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      ),
    ].sort();
    if (items.length === 0) throw new Error(`transaction ${i + 1} is empty`);
    return items;
  });
}

function countSupport(tx: string[][], items: Itemset): number {
  let c = 0;
  for (const t of tx) if (items.every((x) => t.includes(x))) c++;
  return c;
}

export function apriori(tx: string[][], minSup: number): AprioriRun {
  const items = [...new Set(tx.flat())].sort();
  const support = new Map<string, number>();
  const levels: AprioriLevel[] = [];
  // Level 1: every item is a candidate.
  let cands: Candidate[] = items.map((it) => {
    const count = countSupport(tx, [it]);
    support.set(key([it]), count);
    return { items: [it], count, frequent: count >= minSup };
  });
  let k = 1;
  let emptyLast = false;
  for (;;) {
    const frequent = cands.filter((c) => c.frequent).map((c) => ({ items: c.items, count: c.count! }));
    levels.push({ k, candidates: cands, frequent });
    if (frequent.length < 2) break;
    // Join: two frequent k-itemsets that agree on the first k-1 items.
    const fset = new Set(frequent.map((f) => key(f.items)));
    const next: Candidate[] = [];
    for (let i = 0; i < frequent.length; i++) {
      for (let j = i + 1; j < frequent.length; j++) {
        const a = frequent[i].items;
        const b = frequent[j].items;
        let same = true;
        for (let t = 0; t < k - 1; t++) if (a[t] !== b[t]) same = false;
        if (!same || a[k - 1] >= b[k - 1]) continue;
        const c = [...a, b[k - 1]];
        // Prune: every k-subset must be frequent.
        let prunedBy: Itemset | undefined;
        for (let drop = 0; drop < c.length && !prunedBy; drop++) {
          const sub = c.filter((_, t) => t !== drop);
          if (!fset.has(key(sub))) prunedBy = sub;
        }
        if (prunedBy) next.push({ items: c, prunedBy, frequent: false });
        else {
          const count = countSupport(tx, c);
          support.set(key(c), count);
          next.push({ items: c, count, frequent: count >= minSup });
        }
      }
    }
    k++;
    if (next.length === 0) {
      levels.push({ k, candidates: [], frequent: [] });
      emptyLast = true;
      break;
    }
    cands = next;
  }
  return { items, n: tx.length, levels, emptyLast, support };
}

export interface Rule {
  lhs: Itemset;
  rhs: Itemset;
  count: number;
  support: number;
  confidence: number;
  lift: number;
  kulc: number;
}

/** Every rule X → Y with X ∪ Y frequent, X and Y non-empty and disjoint, confidence ≥ minConf. */
export function rules(run: AprioriRun, minConf: number): Rule[] {
  const out: Rule[] = [];
  const n = run.n;
  for (const lv of run.levels) {
    if (lv.k < 2) continue;
    for (const f of lv.frequent) {
      const m = f.items.length;
      for (let mask = 1; mask < (1 << m) - 1; mask++) {
        const lhs = f.items.filter((_, t) => mask & (1 << t));
        const rhs = f.items.filter((_, t) => !(mask & (1 << t)));
        const sx = run.support.get(key(lhs))!;
        const sy = run.support.get(key(rhs))!;
        const confidence = f.count / sx;
        if (confidence + 1e-12 < minConf) continue;
        out.push({
          lhs,
          rhs,
          count: f.count,
          support: f.count / n,
          confidence,
          lift: confidence / (sy / n),
          kulc: (f.count / sx + f.count / sy) / 2,
        });
      }
    }
  }
  return out.sort((a, b) => b.confidence - a.confidence || b.lift - a.lift || b.count - a.count || key(a.lhs).localeCompare(key(b.lhs)));
}

/* ============================================================ decision trees */

export interface TreeData {
  attributes: string[];
  /** rows[i][j] is attribute j of row i; classes[i] is its class. */
  rows: string[][];
  classes: string[];
  classNames: string[];
  numeric: boolean[];
}

export function parseTreeData(attributes: string[], rows: string[]): TreeData {
  if (attributes.length === 0) throw new Error('parameter "attributes" needs at least one attribute');
  if (rows.length < 2) throw new Error('parameter "rows" needs at least two rows');
  const parsed = rows.map((r, i) => {
    const cells = r.split(',').map((s) => s.trim());
    if (cells.length !== attributes.length + 1) throw new Error(`row ${i + 1} has ${cells.length} values; expected ${attributes.length + 1} (the attributes, then the class)`);
    if (cells.some((c) => c === '')) throw new Error(`row ${i + 1} has an empty value`);
    return cells;
  });
  const classes = parsed.map((c) => c[c.length - 1]);
  const vals = parsed.map((c) => c.slice(0, -1));
  const numeric = attributes.map((_, j) => vals.every((v) => v[j] !== '' && Number.isFinite(Number(v[j]))));
  return {
    attributes,
    rows: vals,
    classes,
    classNames: [...new Set(classes)].sort(),
    numeric,
  };
}

export const log2 = (x: number) => Math.log(x) / Math.LN2;

export function classCounts(d: TreeData, idx: number[]): number[] {
  const c = d.classNames.map(() => 0);
  for (const i of idx) c[d.classNames.indexOf(d.classes[i])]++;
  return c;
}

export function entropy(counts: number[]): number {
  const n = counts.reduce((a, b) => a + b, 0);
  if (n === 0) return 0;
  let h = 0;
  for (const c of counts) if (c > 0) h -= (c / n) * log2(c / n);
  return h;
}

export function gini(counts: number[]): number {
  const n = counts.reduce((a, b) => a + b, 0);
  if (n === 0) return 0;
  return 1 - counts.reduce((s, c) => s + (c / n) ** 2, 0);
}

export type Measure = 'gain' | 'gainratio' | 'gini';

export interface Child {
  label: string;
  /** Condition for the path: "= value", "≤ t" or "> t". */
  op: '=' | '≤' | '>';
  value: string;
  idx: number[];
  counts: number[];
  entropy: number;
  gini: number;
}

export interface SplitEval {
  attr: number;
  numeric: boolean;
  threshold?: number;
  children: Child[];
  /** Info_A(D): weighted child entropy. */
  info: number;
  gain: number;
  splitInfo: number;
  ratio: number;
  /** Weighted child Gini. */
  giniSplit: number;
  dGini: number;
  /** False when every row has the same value (no split possible). */
  valid: boolean;
}

export function scoreOf(s: SplitEval, m: Measure): number {
  if (!s.valid) return -Infinity;
  return m === 'gain' ? s.gain : m === 'gainratio' ? s.ratio : s.dGini;
}

function evalPartition(d: TreeData, idx: number[], attr: number, children: Omit<Child, 'counts' | 'entropy' | 'gini'>[], threshold?: number): SplitEval {
  const n = idx.length;
  const parent = classCounts(d, idx);
  const H = entropy(parent);
  const G = gini(parent);
  const full: Child[] = children.map((c) => {
    const counts = classCounts(d, c.idx);
    return { ...c, counts, entropy: entropy(counts), gini: gini(counts) };
  });
  const info = full.reduce((s, c) => s + (c.idx.length / n) * c.entropy, 0);
  const giniSplit = full.reduce((s, c) => s + (c.idx.length / n) * c.gini, 0);
  const splitInfo = -full.reduce((s, c) => s + (c.idx.length > 0 ? (c.idx.length / n) * log2(c.idx.length / n) : 0), 0);
  const gain = H - info;
  const valid = full.filter((c) => c.idx.length > 0).length >= 2;
  return {
    attr,
    numeric: d.numeric[attr],
    threshold,
    children: full,
    info,
    gain,
    splitInfo,
    ratio: splitInfo > 1e-12 ? gain / splitInfo : 0,
    giniSplit,
    dGini: G - giniSplit,
    valid,
  };
}

const fmtNum = (x: number) => String(Math.round(x * 1000) / 1000);

/** Evaluates attribute `attr` on rows `idx`; numeric attributes try every midpoint and keep the best under `m`. */
export function evalSplit(d: TreeData, idx: number[], attr: number, m: Measure): SplitEval {
  if (!d.numeric[attr]) {
    const values = [...new Set(idx.map((i) => d.rows[i][attr]))].sort();
    return evalPartition(
      d,
      idx,
      attr,
      values.map((v) => ({
        label: `${d.attributes[attr]} = ${v}`,
        op: '=' as const,
        value: v,
        idx: idx.filter((i) => d.rows[i][attr] === v),
      })),
    );
  }
  const xs = [...new Set(idx.map((i) => Number(d.rows[i][attr])))].sort((a, b) => a - b);
  let best: SplitEval | null = null;
  for (let t = 0; t + 1 < xs.length; t++) {
    const th = (xs[t] + xs[t + 1]) / 2;
    const s = evalPartition(
      d,
      idx,
      attr,
      [
        {
          label: `${d.attributes[attr]} ≤ ${fmtNum(th)}`,
          op: '≤',
          value: fmtNum(th),
          idx: idx.filter((i) => Number(d.rows[i][attr]) <= th),
        },
        {
          label: `${d.attributes[attr]} > ${fmtNum(th)}`,
          op: '>',
          value: fmtNum(th),
          idx: idx.filter((i) => Number(d.rows[i][attr]) > th),
        },
      ],
      th,
    );
    if (!best || scoreOf(s, m) > scoreOf(best, m) + 1e-12) best = s;
  }
  if (best) return best;
  return evalPartition(d, idx, attr, [
    {
      label: `${d.attributes[attr]} = ${xs[0]}`,
      op: '=',
      value: String(xs[0]),
      idx,
    },
  ]);
}

export interface GrownNode {
  idx: number[];
  counts: number[];
  split?: SplitEval;
  children: { child: Child; node: GrownNode }[];
}

/** Greedy top-down induction: stop when pure, out of attributes, or no split improves the measure. */
export function grow(d: TreeData, idx: number[], used: number[], m: Measure, depth = 0): GrownNode {
  const counts = classCounts(d, idx);
  const node: GrownNode = { idx, counts, children: [] };
  if (counts.filter((c) => c > 0).length <= 1 || depth > 12) return node;
  const avail = d.attributes.map((_, j) => j).filter((j) => d.numeric[j] || !used.includes(j));
  let best: SplitEval | null = null;
  for (const j of avail) {
    const s = evalSplit(d, idx, j, m);
    if (!best || scoreOf(s, m) > scoreOf(best, m) + 1e-12) best = s;
  }
  if (!best || !best.valid || scoreOf(best, m) <= 1e-12) return node;
  node.split = best;
  node.children = best.children
    .filter((c) => c.idx.length > 0)
    .map((c) => ({
      child: c,
      node: grow(d, c.idx, d.numeric[best!.attr] ? used : [...used, best!.attr], m, depth + 1),
    }));
  return node;
}

/* ================================================================ clustering */

export type Pt = [number, number];

const d2 = (a: Pt, b: Pt) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

function gauss(rng: () => number): number {
  let u = 0;
  while (u === 0) u = rng();
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const clampPt = (p: Pt): Pt => [Math.min(9.8, Math.max(0.2, p[0])), Math.min(9.8, Math.max(0.2, p[1]))];

export type ClusterPreset = 'blobs' | 'moons' | 'rings' | 'uneven';

export function presetPoints(kind: ClusterPreset): Pt[] {
  const rng = mulberry32({ blobs: 11, moons: 23, rings: 37, uneven: 41 }[kind]);
  const pts: Pt[] = [];
  const blob = (cx: number, cy: number, sd: number, n: number) => {
    for (let i = 0; i < n; i++) pts.push(clampPt([cx + sd * gauss(rng), cy + sd * gauss(rng)]));
  };
  if (kind === 'blobs') {
    blob(2.6, 7.0, 0.75, 16);
    blob(7.4, 7.3, 0.75, 16);
    blob(5.0, 2.6, 0.75, 16);
  } else if (kind === 'moons') {
    const n = 34;
    for (let i = 0; i < n; i++) {
      const t = (Math.PI * i) / (n - 1);
      pts.push(clampPt([0.5 + 3 * (Math.cos(t) + 1) + 0.18 * gauss(rng), 2.75 + 3 * (Math.sin(t) + 0.5) + 0.18 * gauss(rng)]));
    }
    for (let i = 0; i < n; i++) {
      const t = (Math.PI * i) / (n - 1);
      pts.push(clampPt([0.5 + 3 * (1 - Math.cos(t) + 1) + 0.18 * gauss(rng), 2.75 + 3 * (0.5 - Math.sin(t) + 0.5) + 0.18 * gauss(rng)]));
    }
  } else if (kind === 'rings') {
    for (let i = 0; i < 20; i++) {
      const t = (2 * Math.PI * i) / 20;
      pts.push(clampPt([5 + 1.2 * Math.cos(t) + 0.12 * gauss(rng), 5 + 1.2 * Math.sin(t) + 0.12 * gauss(rng)]));
    }
    for (let i = 0; i < 60; i++) {
      const t = (2 * Math.PI * i) / 60;
      pts.push(clampPt([5 + 3.8 * Math.cos(t) + 0.12 * gauss(rng), 5 + 3.8 * Math.sin(t) + 0.12 * gauss(rng)]));
    }
  } else {
    blob(3.3, 5.0, 1.25, 40);
    blob(8.0, 8.0, 0.35, 10);
    blob(8.0, 2.0, 0.35, 10);
  }
  return pts.map(([x, y]) => [Math.round(x * 100) / 100, Math.round(y * 100) / 100]);
}

/** Initial centroids: Forgy (k distinct random points) or k-means++ (D² weighting). */
export function initCentroids(pts: Pt[], k: number, how: 'random' | 'kmeans++', seed: number): Pt[] {
  const rng = mulberry32(seed * 2654435761 + 7);
  const kk = Math.min(k, pts.length);
  if (kk === 0) return [];
  if (how === 'random') {
    const idx = pts.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx.slice(0, kk).map((i) => [...pts[i]] as Pt);
  }
  const cs: Pt[] = [[...pts[Math.floor(rng() * pts.length)]] as Pt];
  while (cs.length < kk) {
    const w = pts.map((p) => Math.min(...cs.map((c) => d2(p, c))));
    const total = w.reduce((a, b) => a + b, 0);
    if (total <= 0) break;
    let r = rng() * total;
    let pick = pts.length - 1;
    for (let i = 0; i < pts.length; i++) {
      r -= w[i];
      if (r <= 0) {
        pick = i;
        break;
      }
    }
    cs.push([...pts[pick]] as Pt);
  }
  return cs;
}

export function assign(pts: Pt[], cs: Pt[]): number[] {
  return pts.map((p) => {
    let best = 0;
    let bd = Infinity;
    cs.forEach((c, j) => {
      const v = d2(p, c);
      if (v < bd - 1e-12) {
        bd = v;
        best = j;
      }
    });
    return best;
  });
}

/** Centroid update; an empty cluster keeps its old centroid. */
export function update(pts: Pt[], lab: number[], cs: Pt[]): Pt[] {
  return cs.map((c, j) => {
    let sx = 0;
    let sy = 0;
    let n = 0;
    pts.forEach((p, i) => {
      if (lab[i] === j) {
        sx += p[0];
        sy += p[1];
        n++;
      }
    });
    return n ? [sx / n, sy / n] : c;
  });
}

export function sse(pts: Pt[], lab: (number | null)[], cs: Pt[]): number {
  let s = 0;
  pts.forEach((p, i) => {
    const l = lab[i];
    if (l !== null && l !== undefined && cs[l]) s += d2(p, cs[l]);
  });
  return s;
}

/** Runs Lloyd's algorithm from given centroids to convergence; returns final centroids, labels and iterations. */
export function lloyd(pts: Pt[], cs0: Pt[], maxIter = 100): { cs: Pt[]; lab: number[]; iters: number } {
  let cs = cs0;
  let lab = assign(pts, cs);
  let iters = 1;
  for (; iters < maxIter; iters++) {
    cs = update(pts, lab, cs);
    const nl = assign(pts, cs);
    if (nl.every((v, i) => v === lab[i])) break;
    lab = nl;
  }
  return { cs, lab, iters };
}

export type DbKind = 'core' | 'border' | 'noise';

export interface DbResult {
  kind: DbKind[];
  /** Cluster index per point, or -1 for noise. */
  cluster: number[];
  clusters: number;
  neighbours: number[][];
}

/** DBSCAN. A point is core when |N_eps(p)| ≥ minPts, where N_eps(p) includes p itself. */
export function dbscan(pts: Pt[], eps: number, minPts: number): DbResult {
  const n = pts.length;
  const e2 = eps * eps;
  const neighbours: number[][] = pts.map((p) => {
    const out: number[] = [];
    for (let j = 0; j < n; j++) if (d2(p, pts[j]) <= e2 + 1e-12) out.push(j);
    return out;
  });
  const core = neighbours.map((nb) => nb.length >= minPts);
  const cluster = new Array<number>(n).fill(-1);
  let c = 0;
  for (let i = 0; i < n; i++) {
    if (!core[i] || cluster[i] !== -1) continue;
    const queue = [i];
    cluster[i] = c;
    while (queue.length) {
      const p = queue.shift()!;
      if (!core[p]) continue;
      for (const q of neighbours[p]) {
        if (cluster[q] === -1) {
          cluster[q] = c;
          if (core[q]) queue.push(q);
        }
      }
    }
    c++;
  }
  const kind: DbKind[] = pts.map((_, i) => (core[i] ? 'core' : cluster[i] >= 0 ? 'border' : 'noise'));
  return { kind, cluster, clusters: c, neighbours };
}

/* ====================================================================== cube */

export type Dim = 'time' | 'location' | 'product';
export const DIMS: Dim[] = ['time', 'location', 'product'];

export const DIM_LABEL: Record<Dim, string> = {
  time: 'Time',
  location: 'Location',
  product: 'Product',
};
export const LEVELS: Record<Dim, string[]> = {
  time: ['all', 'year', 'quarter', 'month'],
  location: ['all', 'region', 'city'],
  product: ['all', 'category', 'item'],
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const CITIES: {
  city: string;
  region: string;
  size: number;
  growth: number;
}[] = [
  { city: 'Boston', region: 'East', size: 1.0, growth: 1.04 },
  { city: 'New York', region: 'East', size: 1.6, growth: 1.02 },
  { city: 'Philadelphia', region: 'East', size: 0.8, growth: 1.0 },
  { city: 'Seattle', region: 'West', size: 0.9, growth: 1.3 },
  { city: 'Denver', region: 'West', size: 0.6, growth: 1.35 },
];
export const ITEMS: {
  item: string;
  category: string;
  price: number;
  rate: number;
  season: number[];
}[] = [
  // season: multiplier per quarter
  {
    item: 'Laptop',
    category: 'Electronics',
    price: 900,
    rate: 2.2,
    season: [0.8, 0.7, 1.0, 1.9],
  },
  {
    item: 'Phone',
    category: 'Electronics',
    price: 600,
    rate: 3.0,
    season: [0.8, 0.8, 1.0, 1.8],
  },
  {
    item: 'Headphones',
    category: 'Electronics',
    price: 120,
    rate: 4.0,
    season: [0.9, 0.9, 1.0, 1.6],
  },
  {
    item: 'Lamp',
    category: 'Home',
    price: 45,
    rate: 5.0,
    season: [1.2, 0.9, 0.8, 1.2],
  },
  {
    item: 'Kettle',
    category: 'Home',
    price: 35,
    rate: 4.5,
    season: [1.3, 0.8, 0.8, 1.2],
  },
  {
    item: 'Novel',
    category: 'Books',
    price: 15,
    rate: 9.0,
    season: [0.9, 1.0, 1.25, 1.0],
  },
  {
    item: 'Cookbook',
    category: 'Books',
    price: 25,
    rate: 4.0,
    season: [0.9, 0.9, 1.0, 1.4],
  },
];
export const YEARS = [2024, 2025];

/** One base cell of the cube: (month, city, item) with the number of sales and their revenue. */
export interface Fact {
  year: number;
  quarter: number;
  month: number; // 0-11
  city: string;
  region: string;
  item: string;
  category: string;
  count: number;
  revenue: number;
}

let factCache: Fact[] | null = null;

/** The built-in sales facts, generated once from a fixed seed. */
export function salesFacts(): Fact[] {
  if (factCache) return factCache;
  const rng = mulberry32(2024);
  const out: Fact[] = [];
  for (const year of YEARS) {
    for (let month = 0; month < 12; month++) {
      const quarter = Math.floor(month / 3) + 1;
      for (const c of CITIES) {
        for (const it of ITEMS) {
          const g = year === 2025 ? c.growth : 1;
          const mean = it.rate * c.size * g * it.season[quarter - 1];
          // Poisson draw by inversion.
          const L = Math.exp(-mean);
          let k = 0;
          let p = 1;
          do {
            k++;
            p *= rng();
          } while (p > L);
          const count = k - 1;
          let revenue = 0;
          for (let s = 0; s < count; s++) {
            const units = 1 + Math.floor(rng() * 2.2);
            revenue += units * it.price * (0.9 + 0.2 * rng());
          }
          out.push({
            year,
            quarter,
            month,
            city: c.city,
            region: c.region,
            item: it.item,
            category: it.category,
            count,
            revenue: Math.round(revenue),
          });
        }
      }
    }
  }
  factCache = out;
  return out;
}

/** The value of a fact on a dimension at a level, as a sortable key and a display label. */
export function memberOf(f: Fact, dim: Dim, level: string): { key: string; label: string } {
  if (level === 'all') return { key: 'all', label: 'All' };
  if (dim === 'time') {
    if (level === 'year') return { key: `${f.year}`, label: `${f.year}` };
    if (level === 'quarter')
      return {
        key: `${f.year}-${f.quarter}`,
        label: `${f.year} Q${f.quarter}`,
      };
    return {
      key: `${f.year}-${String(f.month + 1).padStart(2, '0')}`,
      label: `${MONTHS[f.month]} ${f.year}`,
    };
  }
  if (dim === 'location') {
    if (level === 'region') return { key: f.region, label: f.region };
    const ci = CITIES.findIndex((c) => c.city === f.city);
    return { key: `${f.region}/${ci}`, label: f.city };
  }
  if (level === 'category') {
    const ci = ['Electronics', 'Home', 'Books'].indexOf(f.category);
    return { key: `${ci}`, label: f.category };
  }
  const ii = ITEMS.findIndex((x) => x.item === f.item);
  return { key: `${String(ii).padStart(2, '0')}`, label: f.item };
}

export interface Agg {
  count: number;
  revenue: number;
}

export function aggValue(a: Agg | undefined, measure: 'sum' | 'count' | 'avg'): number | null {
  if (!a) return measure === 'avg' ? null : 0;
  if (measure === 'sum') return a.revenue;
  if (measure === 'count') return a.count;
  return a.count > 0 ? a.revenue / a.count : null;
}
