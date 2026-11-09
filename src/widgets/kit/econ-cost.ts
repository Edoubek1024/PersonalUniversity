/**
 * Pure maths for a firm with a cubic cost function and, for monopoly, a linear demand curve.
 * Shared by the cost-curves widget and its tests. No React here.
 *
 *   TC(Q) = F + a1 Q + a2 Q^2 + a3 Q^3,   MC = a1 + 2 a2 Q + 3 a3 Q^2,
 *   AVC = a1 + a2 Q + a3 Q^2,             ATC = AVC + F / Q.
 *   Demand (monopoly): P = A - B Q,        MR = A - 2 B Q.
 */

export interface Cost {
  F: number;
  a1: number;
  a2: number;
  a3: number;
}

export const vc = (c: Cost, q: number) => c.a1 * q + c.a2 * q * q + c.a3 * q * q * q;
export const tc = (c: Cost, q: number) => c.F + vc(c, q);
export const mc = (c: Cost, q: number) => c.a1 + 2 * c.a2 * q + 3 * c.a3 * q * q;
export const avc = (c: Cost, q: number) => c.a1 + c.a2 * q + c.a3 * q * q;
export const atc = (c: Cost, q: number) => (q > 0 ? avc(c, q) + c.F / q : Infinity);

/** Checks that marginal cost is positive on (0, qMax]; returns an error message or null. */
export function checkCost(c: Cost, qMax: number): string | null {
  if (c.F < 0) return 'the fixed cost F must not be negative';
  if (c.a3 < 0) return 'the cubic coefficient must not be negative (marginal cost would eventually fall below zero)';
  for (let i = 1; i <= 200; i++) {
    const q = (qMax * i) / 200;
    if (!(mc(c, q) > 0)) return `marginal cost is not positive at Q = ${q.toFixed(2)}; choose coefficients with MC > 0`;
  }
  return null;
}

/** Larger root of A q^2 + B q + C = 0 (A may be 0); NaN when there is no real root. */
export function largerRoot(A: number, B: number, C: number): number {
  if (Math.abs(A) < 1e-14) return Math.abs(B) < 1e-14 ? NaN : -C / B;
  const disc = B * B - 4 * A * C;
  if (disc < 0) return NaN;
  return (-B + Math.sqrt(disc)) / (2 * A);
}

/** Minimum of AVC: the shutdown point. When AVC never turns up, the minimum is at Q -> 0. */
export function minAVC(c: Cost): { q: number; value: number } {
  if (c.a3 > 0 && c.a2 < 0) {
    const q = -c.a2 / (2 * c.a3);
    return { q, value: avc(c, q) };
  }
  return { q: 0, value: c.a1 };
}

/**
 * Minimum of ATC: the break-even point. ATC is falling where MC < ATC and rising where MC > ATC,
 * so the minimum is where MC - ATC changes sign, found by bisection. Returns q = Infinity when
 * ATC falls for ever (constant marginal cost with a fixed cost: a natural monopoly).
 */
export function minATC(c: Cost): { q: number; value: number } {
  if (c.a2 <= 0 && c.a3 === 0) return { q: Infinity, value: c.a1 };
  if (c.F === 0) return minAVC(c);
  const g = (q: number) => mc(c, q) - atc(c, q);
  let lo = 1e-9;
  let hi = 1;
  for (let k = 0; k < 200 && g(hi) < 0; k++) hi *= 2;
  for (let k = 0; k < 200; k++) {
    const m = (lo + hi) / 2;
    if (g(m) < 0) lo = m;
    else hi = m;
  }
  const q = (lo + hi) / 2;
  return { q, value: atc(c, q) };
}

export interface FirmChoice {
  q: number;
  revenue: number;
  cost: number;
  profit: number;
  /** "profit", "loss" (operating, covering variable cost), or "shutdown". */
  decision: 'profit' | 'loss' | 'shutdown';
}

/** A price-taking firm's best output at price p: P = MC on the rising part of MC, if P >= min AVC. */
export function competitiveChoice(c: Cost, p: number): FirmChoice {
  const shut = minAVC(c);
  let q: number;
  if (p < shut.value) q = 0;
  else if (c.a3 > 0) q = largerRoot(3 * c.a3, 2 * c.a2, c.a1 - p);
  else if (c.a2 > 0) q = (p - c.a1) / (2 * c.a2);
  else q = NaN; // constant MC: output is indeterminate (zero below MC, unbounded above)
  if (!Number.isFinite(q) || q < 0) q = 0;
  const revenue = p * q;
  const cost = tc(c, q);
  const profit = revenue - cost;
  const decision = q === 0 ? 'shutdown' : profit >= -1e-9 ? 'profit' : 'loss';
  return { q, revenue, cost, profit, decision };
}

export interface Demand {
  A: number;
  B: number;
}
export const demandPrice = (d: Demand, q: number) => d.A - d.B * q;
export const mr = (d: Demand, q: number) => d.A - 2 * d.B * q;

/** Area under demand minus variable cost from 0 to q: total surplus before fixed cost. */
export const welfare = (c: Cost, d: Demand, q: number) => d.A * q - 0.5 * d.B * q * q - vc(c, q);

export interface MarketOutcome {
  q: number;
  price: number;
  cs: number;
  profit: number;
  /** Lost surplus compared with the efficient output where demand meets MC. */
  dwl: number;
  /** False when no such price exists (for P = ATC with ATC above demand everywhere). */
  feasible: boolean;
}

/** Efficient output: demand meets marginal cost. */
export function efficientQ(c: Cost, d: Demand): number {
  return Math.max(0, largerRoot(3 * c.a3, 2 * c.a2 + d.B, c.a1 - d.A));
}

/** The single-price monopoly: MR = MC. */
export function monopolyQ(c: Cost, d: Demand): number {
  return Math.max(0, largerRoot(3 * c.a3, 2 * c.a2 + 2 * d.B, c.a1 - d.A));
}

/** Largest quantity at which demand meets ATC (average-cost pricing), or NaN. */
export function averageCostQ(c: Cost, d: Demand): number {
  const qMax = d.A / d.B;
  const h = (q: number) => demandPrice(d, q) - atc(c, q);
  const n = 2000;
  for (let i = n - 1; i >= 1; i--) {
    const q0 = (qMax * i) / n;
    const q1 = (qMax * (i + 1)) / n;
    if (h(q0) >= 0 && h(q1) < 0) {
      let lo = q0;
      let hi = q1;
      for (let k = 0; k < 80; k++) {
        const m = (lo + hi) / 2;
        if (h(m) >= 0) lo = m;
        else hi = m;
      }
      return (lo + hi) / 2;
    }
  }
  return NaN;
}

export type Pricing = 'single' | 'perfect' | 'mc' | 'atc';

export function monopolyOutcome(c: Cost, d: Demand, pricing: Pricing): MarketOutcome {
  const qe = efficientQ(c, d);
  const best = welfare(c, d, qe);
  let q: number;
  if (pricing === 'single') q = monopolyQ(c, d);
  else if (pricing === 'atc') q = averageCostQ(c, d);
  else q = qe;
  if (!Number.isFinite(q)) return { q: 0, price: NaN, cs: 0, profit: -c.F, dwl: best, feasible: false };
  const price = demandPrice(d, q);
  if (pricing === 'perfect') {
    // Each unit is sold at its own reservation price: the firm takes the whole area under demand.
    const revenue = d.A * q - 0.5 * d.B * q * q;
    return { q, price, cs: 0, profit: revenue - tc(c, q), dwl: 0, feasible: true };
  }
  const cs = 0.5 * d.B * q * q;
  const profit = price * q - tc(c, q);
  return { q, price, cs, profit, dwl: best - welfare(c, d, q), feasible: true };
}
