/**
 * Statistics helpers for the genetics widgets: the chi-square distribution (density, upper-tail
 * p-value through the regularised incomplete gamma function, critical values), a seeded random
 * number generator and binomial / Poisson samplers for drift and crossover simulations.
 */

/** ln Γ(x) for x > 0 (Lanczos, g = 7, n = 9; about 15 significant digits). */
export function lnGamma(x: number): number {
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lnGamma(1 - x);
  x -= 1;
  let a = c[0];
  const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

/** Regularised lower incomplete gamma P(s, x). */
function gammaP(s: number, x: number): number {
  if (x <= 0) return 0;
  if (x < s + 1) {
    // series
    let sum = 1 / s;
    let term = sum;
    for (let n = 1; n < 1000; n++) {
      term *= x / (s + n);
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-15) break;
    }
    return sum * Math.exp(-x + s * Math.log(x) - lnGamma(s));
  }
  return 1 - gammaQcf(s, x);
}

/** Regularised upper incomplete gamma Q(s, x) by continued fraction (x >= s + 1). */
function gammaQcf(s: number, x: number): number {
  const tiny = 1e-300;
  let b = x + 1 - s;
  let c = 1 / tiny;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 1000; i++) {
    const an = -i * (i - s);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < tiny) d = tiny;
    c = b + an / c;
    if (Math.abs(c) < tiny) c = tiny;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-15) break;
  }
  return Math.exp(-x + s * Math.log(x) - lnGamma(s)) * h;
}

/** Upper-tail probability P(χ²_df ≥ x). */
export function chiSqP(x: number, df: number): number {
  if (!(df > 0)) return NaN;
  if (x <= 0) return 1;
  const s = df / 2;
  const h = x / 2;
  return h < s + 1 ? 1 - gammaP(s, h) : gammaQcf(s, h);
}

/** Density of χ² with df degrees of freedom. */
export function chiSqPdf(x: number, df: number): number {
  if (x < 0) return 0;
  if (x === 0) return df === 2 ? 0.5 : df < 2 ? Infinity : 0;
  const k = df / 2;
  return Math.exp((k - 1) * Math.log(x) - x / 2 - k * Math.log(2) - lnGamma(k));
}

/** The value c with P(χ²_df ≥ c) = alpha. */
export function chiSqCrit(alpha: number, df: number): number {
  let lo = 0;
  let hi = Math.max(10, df * 4 + 40);
  while (chiSqP(hi, df) > alpha) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (chiSqP(mid, df) > alpha) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export interface ChiSqResult {
  expected: number[];
  terms: number[];
  chi2: number;
  df: number;
  p: number;
  crit: number;
  reject: boolean;
}

/** Goodness of fit of observed counts to a hypothesised ratio (any positive weights). */
export function chiSqTest(observed: number[], ratio: number[], alpha = 0.05, lostDf = 0): ChiSqResult {
  const n = observed.reduce((a, b) => a + b, 0);
  const rs = ratio.reduce((a, b) => a + b, 0);
  const expected = ratio.map((r) => (n * r) / rs);
  const terms = observed.map((o, i) => (expected[i] > 0 ? (o - expected[i]) ** 2 / expected[i] : NaN));
  const chi2 = terms.reduce((a, b) => a + b, 0);
  const df = observed.length - 1 - lostDf;
  const p = df > 0 ? chiSqP(chi2, df) : NaN;
  const crit = df > 0 ? chiSqCrit(alpha, df) : NaN;
  return { expected, terms, chi2, df, p, crit, reject: p < alpha };
}

/** mulberry32: a small, fast seeded generator returning numbers in [0, 1). */
export function rng(seed: number): () => number {
  let a = (Math.floor(seed) >>> 0) || 0x9e3779b9;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Poisson(lambda) sample by inversion (fine for the small means used here). */
export function poisson(lambda: number, u: () => number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= u();
  } while (p > L && k < 1000);
  return k - 1;
}

/** Standard normal sample (Box-Muller). */
function normal(u: () => number): number {
  const a = Math.max(1e-300, u());
  return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * u());
}

/**
 * Binomial(n, p) sample: exact Bernoulli sums for small n, a clamped normal approximation with
 * continuity correction otherwise (n·p·(1−p) large), which is accurate for drift plots.
 */
export function binomial(n: number, p: number, u: () => number): number {
  if (p <= 0) return 0;
  if (p >= 1) return n;
  if (n <= 200) {
    let k = 0;
    for (let i = 0; i < n; i++) if (u() < p) k++;
    return k;
  }
  const v = n * p * (1 - p);
  if (v < 25) {
    // rare allele in a large population: use the Poisson limit on the rarer side
    if (p < 0.5) return Math.min(n, poisson(n * p, u));
    return n - Math.min(n, poisson(n * (1 - p), u));
  }
  return Math.max(0, Math.min(n, Math.round(n * p + Math.sqrt(v) * normal(u))));
}

/** A p-value for display: 3 significant figures, scientific notation below 0.0001. */
export function fmtP(p: number): string {
  if (!Number.isFinite(p)) return '—';
  if (p < 1e-15) return '< 10⁻¹⁵';
  if (p < 1e-4) {
    const [m, e] = p.toExponential(2).split('e');
    const sup = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    return `${m} × 10⁻${e.replace('-', '').split('').map((d) => sup[+d]).join('')}`;
  }
  return String(Number(p.toPrecision(3)));
}
