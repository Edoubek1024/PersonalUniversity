/**
 * Pure maths for linear supply-and-demand markets, shared by the supply-demand widget and its
 * tests. Curves are written in inverse form, price as a function of quantity:
 *
 *   demand  P = a - b Q   (b > 0)
 *   supply  P = c + d Q   (d > 0)
 *
 * so that they can be drawn with price on the vertical axis. Every function returns plain
 * numbers; areas are in price x quantity units. No React here.
 */

export interface Linear {
  /** Demand intercept and slope: P = a - bQ. */
  a: number;
  b: number;
  /** Supply intercept and slope: P = c + dQ. */
  c: number;
  d: number;
}

/** Shift demand right by sD and supply right by sS (in quantity units). */
export function shifted(m: Linear, sD: number, sS: number): Linear {
  return { a: m.a + m.b * sD, b: m.b, c: m.c - m.d * sS, d: m.d };
}

export const demandP = (m: Linear, q: number) => m.a - m.b * q;
export const supplyP = (m: Linear, q: number) => m.c + m.d * q;
/** Quantity demanded at price p (never negative). */
export const demandQ = (m: Linear, p: number) => Math.max(0, (m.a - p) / m.b);
/** Quantity supplied at price p (never negative). */
export const supplyQ = (m: Linear, p: number) => Math.max(0, (p - m.c) / m.d);

/** Area under the demand curve and above price p over [0, q]. */
function areaAboveP(m: Linear, p: number, q: number): number {
  return q * (m.a - p) - 0.5 * m.b * q * q;
}
/** Area above the supply curve and below price p over [0, q]. */
function areaBelowP(m: Linear, p: number, q: number): number {
  return q * (p - m.c) - 0.5 * m.d * q * q;
}

export interface Outcome {
  /** Quantity traded. */
  q: number;
  /** Price buyers pay and price sellers receive (equal without a wedge). */
  pb: number;
  ps: number;
  cs: number;
  ps_: number;
  /** Government revenue (tax, tariff) is positive; spending (subsidy) is negative. */
  gov: number;
  dwl: number;
  total: number;
}

export interface Equilibrium {
  q: number;
  p: number;
  cs: number;
  ps: number;
  /** Point elasticities at the equilibrium (demand negative). NaN when Q = 0. */
  ed: number;
  es: number;
}

export function equilibrium(m: Linear): Equilibrium {
  const q = Math.max(0, (m.a - m.c) / (m.b + m.d));
  const p = q > 0 ? demandP(m, q) : NaN;
  const cs = q > 0 ? 0.5 * q * (m.a - p) : 0;
  const ps = q > 0 ? 0.5 * q * (p - m.c) : 0;
  const ed = q > 0 ? -(1 / m.b) * (p / q) : NaN;
  const es = q > 0 ? (1 / m.d) * (p / q) : NaN;
  return { q, p, cs, ps, ed, es };
}

/** A per-unit tax t (t >= 0). Who it is levied on does not change the outcome. */
export function withTax(m: Linear, t: number): Outcome & { buyerShare: number } {
  const e = equilibrium(m);
  const q = Math.max(0, (m.a - m.c - t) / (m.b + m.d));
  const pb = demandP(m, q);
  const ps = supplyP(m, q);
  const cs = 0.5 * q * (m.a - pb);
  const psu = 0.5 * q * (ps - m.c);
  const gov = t * q;
  const total = cs + psu + gov;
  return { q, pb, ps, cs, ps_: psu, gov, dwl: e.cs + e.ps - total, total, buyerShare: m.b / (m.b + m.d) };
}

/** A per-unit subsidy s (s >= 0) paid to sellers. */
export function withSubsidy(m: Linear, s: number): Outcome & { buyerShare: number } {
  const e = equilibrium(m);
  const q = Math.max(0, (m.a - m.c + s) / (m.b + m.d));
  const pb = demandP(m, q);
  const ps = supplyP(m, q);
  const cs = 0.5 * q * (m.a - pb);
  const psu = 0.5 * q * (ps - m.c);
  const gov = -s * q;
  const total = cs + psu + gov;
  return { q, pb, ps, cs, ps_: psu, gov, dwl: e.cs + e.ps - total, total, buyerShare: m.b / (m.b + m.d) };
}

/**
 * A price ceiling. Binding only below the equilibrium price. Assumes the units that are sold go
 * to the buyers who value them most (the most favourable case); any other rationing loses more.
 */
export function withCeiling(m: Linear, pc: number): Outcome & { qd: number; qs: number; binding: boolean } {
  const e = equilibrium(m);
  if (!(pc < e.p)) return { q: e.q, pb: e.p, ps: e.p, cs: e.cs, ps_: e.ps, gov: 0, dwl: 0, total: e.cs + e.ps, qd: e.q, qs: e.q, binding: false };
  const qs = supplyQ(m, pc);
  const qd = demandQ(m, pc);
  const q = qs;
  const cs = areaAboveP(m, pc, q);
  const psu = 0.5 * q * (pc - m.c);
  const total = cs + psu;
  return { q, pb: pc, ps: pc, cs, ps_: Math.max(0, psu), gov: 0, dwl: e.cs + e.ps - total, total, qd, qs, binding: true };
}

/**
 * A price floor. Binding only above the equilibrium price. Assumes only the lowest-cost sellers
 * produce the quantity buyers take; unsold output or government purchases would cost more.
 */
export function withFloor(m: Linear, pf: number): Outcome & { qd: number; qs: number; binding: boolean } {
  const e = equilibrium(m);
  if (!(pf > e.p)) return { q: e.q, pb: e.p, ps: e.p, cs: e.cs, ps_: e.ps, gov: 0, dwl: 0, total: e.cs + e.ps, qd: e.q, qs: e.q, binding: false };
  const qd = demandQ(m, pf);
  const qs = supplyQ(m, pf);
  const q = qd;
  const cs = 0.5 * q * (m.a - pf);
  const psu = areaBelowP(m, pf, q);
  const total = cs + psu;
  return { q, pb: pf, ps: pf, cs, ps_: psu, gov: 0, dwl: e.cs + e.ps - total, total, qd, qs, binding: true };
}

export interface ExternalityOutcome {
  /** Quantity with no policy, the efficient quantity, and the quantity with the corrective wedge. */
  qMarket: number;
  qOpt: number;
  q: number;
  /** Price buyers pay and sellers receive with the wedge. */
  pb: number;
  ps: number;
  /** Social surplus lost relative to the efficient quantity, with the wedge and with no policy. */
  dwl: number;
  dwlMarket: number;
  /** Revenue from the corrective tax (negative for a subsidy). */
  revenue: number;
  /** Total external cost (negative: external benefit) at the quantity traded. */
  external: number;
}

/**
 * A constant external cost e per unit (negative e is an external benefit) and a corrective
 * per-unit tax w (negative w is a subsidy). Social surplus of the first q units is
 * (a - c - e) q - (b + d) q^2 / 2, maximised at q = (a - c - e) / (b + d).
 */
export function withExternality(m: Linear, e: number, w: number): ExternalityOutcome {
  const k = m.b + m.d;
  const W = (q: number) => (m.a - m.c - e) * q - 0.5 * k * q * q;
  const qMarket = Math.max(0, (m.a - m.c) / k);
  const qOpt = Math.max(0, (m.a - m.c - e) / k);
  const q = Math.max(0, (m.a - m.c - w) / k);
  return { qMarket, qOpt, q, pb: demandP(m, q), ps: supplyP(m, q), dwl: W(qOpt) - W(q), dwlMarket: W(qOpt) - W(qMarket), revenue: w * q, external: e * q };
}

export interface WorldOutcome {
  /** Domestic price (world price plus tariff, capped at the autarky price). */
  price: number;
  qd: number;
  qs: number;
  /** Imports (positive) or exports (negative). */
  imports: number;
  cs: number;
  ps: number;
  revenue: number;
  total: number;
  /** Surplus lost relative to free trade at the world price. */
  dwl: number;
  /** Total surplus gained by free trade relative to no trade. */
  gainsFromTrade: number;
  /** Quantities at the world price with no tariff, for drawing the deadweight triangles. */
  qdFree: number;
  qsFree: number;
  prohibitive: boolean;
}

/** Domestic producer surplus at price p: area above supply below p (supply may start below 0). */
function producerSurplusAt(m: Linear, p: number): number {
  const qs = supplyQ(m, p);
  if (qs <= 0) return 0;
  return 0.5 * qs * (p - m.c);
}

/** A small open economy facing a world price pw, with an import tariff tau. */
export function withWorldPrice(m: Linear, pw: number, tau: number): WorldOutcome {
  const e = equilibrium(m);
  const autarky = e.cs + e.ps;
  const welfareAt = (p: number, rev: number) => {
    const qd = demandQ(m, p);
    return 0.5 * qd * (m.a - p) + producerSurplusAt(m, p) + rev;
  };
  const free = welfareAt(pw, 0);
  const qdFree = demandQ(m, pw);
  const qsFree = supplyQ(m, pw);
  if (pw >= e.p) {
    // An exporter: an import tariff has no effect.
    const qd = qdFree;
    const qs = qsFree;
    return { price: pw, qd, qs, imports: qd - qs, cs: 0.5 * qd * (m.a - pw), ps: producerSurplusAt(m, pw), revenue: 0, total: free, dwl: 0, gainsFromTrade: free - autarky, qdFree, qsFree, prohibitive: false };
  }
  const prohibitive = pw + tau >= e.p;
  const price = prohibitive ? e.p : pw + tau;
  const qd = demandQ(m, price);
  const qs = supplyQ(m, price);
  const imports = Math.max(0, qd - qs);
  const revenue = prohibitive ? 0 : tau * imports;
  const cs = 0.5 * qd * (m.a - price);
  const ps = producerSurplusAt(m, price);
  const total = cs + ps + revenue;
  return { price, qd, qs, imports, cs, ps, revenue, total, dwl: free - total, gainsFromTrade: free - autarky, qdFree, qsFree, prohibitive };
}
