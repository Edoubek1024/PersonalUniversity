/**
 * Text retrieval helpers for the Text Information Systems widgets: a small analyser, collection
 * statistics, the three ranking functions taught in the course (TF-IDF, BM25, query likelihood with
 * Dirichlet or Jelinek-Mercer smoothing), ranked-list evaluation measures, and PageRank / HITS by
 * power iteration. Pure functions with no React, so they can be checked with `npx tsx`.
 *
 * Definitions (they match the lessons):
 *   TF-IDF   score = sum_w c(w,q) * TF(c(w,d)) * ln((N + 1) / df(w)),  TF = c or 1 + ln c
 *   BM25     score = sum_w c(w,q) * ln(1 + (N - df + 0.5) / (df + 0.5)) * c (k1 + 1) / (c + k1 (1 - b + b |d| / avgdl))
 *   QL-Dir   score = sum_w c(w,q) * ln((c(w,d) + mu p(w|C)) / (|d| + mu))
 *   QL-JM    score = sum_w c(w,q) * ln((1 - lambda) c(w,d) / |d| + lambda p(w|C))
 *   AP       (1/R) sum over relevant ranks k of P@k, R = all relevant documents for the query
 *   nDCG@k   DCG@k / IDCG@k with DCG = sum_i g_i / log2(i + 1) (linear gain)
 *   PageRank r <- (1 - d)/N + d (sum_{j -> i} r_j / out(j) + dangling mass / N)
 */

export const STOP_WORDS = new Set(
  'a an and are as at be but by for from has have in into is it its of on or that the their this to was were will with which as than then so'.split(' '),
);

/** Lower-case, split on anything that is not a letter or digit, optionally drop stop words. */
export function tokenize(text: string, dropStop = true): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 0 && (!dropStop || !STOP_WORDS.has(t)));
}

export interface Collection {
  docs: string[][];
  N: number;
  lengths: number[];
  avgdl: number;
  /** total tokens in the collection */
  total: number;
  df: Map<string, number>;
  cf: Map<string, number>;
  tf: Map<string, number>[];
}

export function buildCollection(docs: string[][]): Collection {
  const df = new Map<string, number>();
  const cf = new Map<string, number>();
  const tf = docs.map((d) => {
    const m = new Map<string, number>();
    for (const t of d) m.set(t, (m.get(t) ?? 0) + 1);
    for (const [t, c] of m) {
      df.set(t, (df.get(t) ?? 0) + 1);
      cf.set(t, (cf.get(t) ?? 0) + c);
    }
    return m;
  });
  const lengths = docs.map((d) => d.length);
  const total = lengths.reduce((a, b) => a + b, 0);
  return { docs, N: docs.length, lengths, avgdl: total / Math.max(1, docs.length), total, df, cf, tf };
}

/** Distinct query terms with their counts, in first-seen order. */
export function queryTerms(q: string[]): [string, number][] {
  const m = new Map<string, number>();
  for (const t of q) m.set(t, (m.get(t) ?? 0) + 1);
  return [...m];
}

export type Model = 'tfidf' | 'bm25' | 'ql-dir' | 'ql-jm';

export interface ModelParams {
  tf: 'raw' | 'log';
  k1: number;
  b: number;
  mu: number;
  lambda: number;
}

/** Contribution of one query term (count qc) to the score of document i. */
export function termScore(C: Collection, i: number, w: string, qc: number, model: Model, p: ModelParams): number {
  const c = C.tf[i].get(w) ?? 0;
  const df = C.df.get(w) ?? 0;
  const len = C.lengths[i];
  if (model === 'tfidf') {
    if (c === 0) return 0;
    const t = p.tf === 'log' ? 1 + Math.log(c) : c;
    return qc * t * Math.log((C.N + 1) / df);
  }
  if (model === 'bm25') {
    if (c === 0) return 0;
    const idf = Math.log(1 + (C.N - df + 0.5) / (df + 0.5));
    return qc * idf * ((c * (p.k1 + 1)) / (c + p.k1 * (1 - p.b + (p.b * len) / C.avgdl)));
  }
  // Query likelihood. A term that never occurs in the collection gets a tiny floor so the log is finite.
  const pc = Math.max((C.cf.get(w) ?? 0) / C.total, 1e-6);
  if (model === 'ql-dir') return qc * Math.log((c + p.mu * pc) / (len + p.mu));
  return qc * Math.log(((1 - p.lambda) * c) / Math.max(1, len) + p.lambda * pc);
}

export interface Scored {
  doc: number;
  parts: number[];
  score: number;
}

/** Scores every document; returns them sorted by score (ties broken by document order). */
export function rank(C: Collection, q: string[], model: Model, p: ModelParams): { terms: [string, number][]; ranked: Scored[] } {
  const terms = queryTerms(q);
  const scored = C.docs.map((_, i) => {
    const parts = terms.map(([w, qc]) => termScore(C, i, w, qc, model, p));
    return { doc: i, parts, score: parts.reduce((a, b) => a + b, 0) };
  });
  const ranked = [...scored].sort((a, b) => (a.score === b.score ? 0 : b.score > a.score ? 1 : -1) || a.doc - b.doc);
  return { terms, ranked };
}

/* ---------------- evaluation ---------------- */

/** Precision and recall after each rank, for binary relevance (grade > 0). */
export function prPoints(grades: number[], totalRelevant: number): { p: number; r: number }[] {
  let hits = 0;
  return grades.map((g, k) => {
    if (g > 0) hits++;
    return { p: hits / (k + 1), r: totalRelevant > 0 ? hits / totalRelevant : 0 };
  });
}

export function averagePrecision(grades: number[], totalRelevant: number): number {
  if (totalRelevant <= 0) return 0;
  let hits = 0;
  let sum = 0;
  grades.forEach((g, k) => {
    if (g > 0) {
      hits++;
      sum += hits / (k + 1);
    }
  });
  return sum / totalRelevant;
}

export function dcg(grades: number[], k: number): number {
  let s = 0;
  for (let i = 0; i < Math.min(k, grades.length); i++) s += grades[i] / Math.log2(i + 2);
  return s;
}

/** nDCG@k; `allGrades` are the grades of every judged relevant document (retrieved or not). */
export function ndcg(grades: number[], allGrades: number[], k: number): number {
  const ideal = [...allGrades].filter((g) => g > 0).sort((a, b) => b - a);
  const i = dcg(ideal, k);
  return i > 0 ? dcg(grades, k) / i : 0;
}

/** Interpolated precision at recall r: the highest precision at any recall >= r. */
export function interpolated(points: { p: number; r: number }[], r: number): number {
  let best = 0;
  for (const pt of points) if (pt.r >= r - 1e-12 && pt.p > best) best = pt.p;
  return best;
}

/* ---------------- link analysis ---------------- */

export type Edge = [number, number];

/** One PageRank step. */
export function pagerankStep(n: number, edges: Edge[], r: number[], d: number): number[] {
  const out = new Array(n).fill(0);
  for (const [u] of edges) out[u]++;
  const next = new Array(n).fill((1 - d) / n);
  let dangling = 0;
  for (let u = 0; u < n; u++) if (out[u] === 0) dangling += r[u];
  for (const [u, v] of edges) next[v] += (d * r[u]) / out[u];
  for (let v = 0; v < n; v++) next[v] += (d * dangling) / n;
  return next;
}

export function l1(a: number[], b: number[]): number {
  return a.reduce((s, x, i) => s + Math.abs(x - b[i]), 0);
}

/** One HITS step: authorities from hubs, then hubs from the new authorities, each scaled to sum 1. */
export function hitsStep(n: number, edges: Edge[], hub: number[]): { hub: number[]; auth: number[] } {
  const auth = new Array(n).fill(0);
  for (const [u, v] of edges) auth[v] += hub[u];
  const sa = auth.reduce((a, b) => a + b, 0) || 1;
  const a = auth.map((x) => x / sa);
  const h = new Array(n).fill(0);
  for (const [u, v] of edges) h[u] += a[v];
  const sh = h.reduce((x, y) => x + y, 0) || 1;
  return { hub: h.map((x) => x / sh), auth: a };
}
