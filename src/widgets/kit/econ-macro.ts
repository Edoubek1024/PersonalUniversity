/**
 * Pure maths for the macroeconomics widgets (ad-as, keynesian-cross, growth-compound,
 * money-creation, debt-dynamics). No React here, so the numbers can be checked with tsx.
 */

/* ------------------------------------------------------------------ AD-AS ------------------------------------------------------------------ */

/**
 * A linear AD-AS model with price level P on the vertical axis.
 *
 *   AD    P = P0 + (Yad - Y) / m     (Yad = 100 + adShift: output demanded when P = P0)
 *   SRAS  P = W + s (Y - Ystar)      (W = expected price level / cost level)
 *   LRAS  Y = Ystar                  (Ystar = 100 + lrShift)
 *
 * Expectations adapt: after each period W moves a fraction lambda of the way to the actual P.
 */
export interface AdAsState {
  adShift: number;
  lrShift: number;
  /** Expected price level (cost level) that positions SRAS. */
  w: number;
}

export interface AdAsSlopes {
  /** Output demanded per unit fall in P (AD slope is -1/m). */
  m: number;
  /** SRAS slope. */
  s: number;
  /** Baseline price level (where AD meets LRAS before any shock). */
  p0: number;
}

export const adP = (st: AdAsState, k: AdAsSlopes, y: number) => k.p0 + (100 + st.adShift - y) / k.m;
export const srasP = (st: AdAsState, k: AdAsSlopes, y: number) => st.w + k.s * (y - (100 + st.lrShift));

export function adAsEquilibrium(st: AdAsState, k: AdAsSlopes): { y: number; p: number; ystar: number; gap: number } {
  const ystar = 100 + st.lrShift;
  const y = (k.p0 - st.w + (100 + st.adShift) / k.m + k.s * ystar) / (1 / k.m + k.s);
  const p = adP(st, k, y);
  return { y, p, ystar, gap: (100 * (y - ystar)) / ystar };
}

/** The long-run equilibrium for the current AD and LRAS (where AD crosses LRAS). */
export function adAsLongRun(st: AdAsState, k: AdAsSlopes): { y: number; p: number } {
  const y = 100 + st.lrShift;
  return { y, p: adP(st, k, y) };
}

/** One period of expectation adjustment. */
export function adAsStep(st: AdAsState, k: AdAsSlopes, lambda: number): AdAsState {
  const { p } = adAsEquilibrium(st, k);
  return { ...st, w: st.w + lambda * (p - st.w) };
}

/** AD shift that puts the short-run equilibrium on LRAS at the current W (policy closes the gap). */
export function adShiftToCloseGap(st: AdAsState, k: AdAsSlopes): number {
  const ystar = 100 + st.lrShift;
  // On LRAS, SRAS gives P = W; AD must pass through (Ystar, W).
  return ystar - 100 + k.m * (st.w - k.p0);
}

/* ------------------------------------------------------------------ Keynesian cross ------------------------------------------------------------------ */

/**
 * Planned expenditure AE = C + I + G + NX with C = C0 + c (Y - T) and T = T0 + t Y:
 *   AE(Y) = (C0 - c T0 + I + G + NX) + c (1 - t) Y.
 * `auto` is C0 + I + G + NX (spending that does not depend on income).
 */
export interface Cross {
  auto: number;
  c: number;
  t0: number;
  t: number;
}

export const aeIntercept = (x: Cross) => x.auto - x.c * x.t0;
export const aeSlope = (x: Cross) => x.c * (1 - x.t);
export const ae = (x: Cross, y: number) => aeIntercept(x) + aeSlope(x) * y;
export const crossEquilibrium = (x: Cross) => aeIntercept(x) / (1 - aeSlope(x));
export const multiplier = (x: Cross) => 1 / (1 - aeSlope(x));

/** The spending rounds after a change dA in autonomous spending and dT in lump-sum taxes. */
export function rounds(x: Cross, dA: number, dT: number, n: number): number[] {
  const first = dA - x.c * dT;
  const r = aeSlope(x);
  const out: number[] = [];
  let v = first;
  for (let i = 0; i < n; i++) {
    out.push(v);
    v *= r;
  }
  return out;
}

/* ------------------------------------------------------------------ Growth ------------------------------------------------------------------ */

/** Exact doubling time in years at growth rate g percent per year. */
export const doublingTime = (gPct: number) => Math.log(2) / Math.log(1 + gPct / 100);

/** Years until an economy starting at yB growing at gB catches one at yA growing at gA (NaN if never). */
export function catchUpYears(yA: number, gA: number, yB: number, gB: number): number {
  if (yB >= yA) return 0;
  if (gB <= gA) return NaN;
  return Math.log(yA / yB) / Math.log((1 + gB / 100) / (1 + gA / 100));
}

/** Solow model per worker: y = A k^alpha, k' = k + s y - delta k. */
export interface Solow {
  s: number;
  delta: number;
  alpha: number;
  A: number;
}

export const solowY = (m: Solow, k: number) => m.A * Math.pow(Math.max(0, k), m.alpha);
export const solowKStar = (m: Solow) => Math.pow((m.s * m.A) / m.delta, 1 / (1 - m.alpha));
export const solowNext = (m: Solow, k: number) => k + m.s * solowY(m, k) - m.delta * k;

export function solowPath(m: Solow, k0: number, n: number): number[] {
  const out = [k0];
  for (let i = 0; i < n; i++) out.push(solowNext(m, out[out.length - 1]));
  return out;
}

/* ------------------------------------------------------------------ Money creation ------------------------------------------------------------------ */

export interface BankRow {
  deposit: number;
  reserves: number;
  loan: number;
}

/**
 * Deposit expansion: each bank keeps (rr + excess) of a deposit as reserves and lends the rest;
 * the public keeps `cash` of each loan as currency and redeposits the remainder.
 */
export function depositChain(d0: number, rr: number, excess: number, cash: number, n: number): BankRow[] {
  const keep = Math.min(1, rr + excess);
  const out: BankRow[] = [];
  let d = d0;
  for (let i = 0; i < n; i++) {
    const reserves = keep * d;
    const loan = d - reserves;
    out.push({ deposit: d, reserves, loan });
    d = (1 - cash) * loan;
  }
  return out;
}

/** Total deposits when the chain runs forever. */
export function depositLimit(d0: number, rr: number, excess: number, cash: number): number {
  const keep = Math.min(1, rr + excess);
  const ratio = (1 - keep) * (1 - cash);
  return ratio >= 1 ? Infinity : d0 / (1 - ratio);
}

/* ------------------------------------------------------------------ Debt dynamics ------------------------------------------------------------------ */

/**
 * Debt-to-GDP ratio d (percent) with nominal interest rate r and nominal growth g (percent)
 * and a primary deficit p (percent of GDP, negative for a surplus):
 *   d_{t+1} = d_t (1 + r) / (1 + g) + p.
 */
export function debtPath(d0: number, rPct: number, gPct: number, pPct: number, years: number): number[] {
  const k = (1 + rPct / 100) / (1 + gPct / 100);
  const out = [d0];
  for (let i = 0; i < years; i++) out.push(out[out.length - 1] * k + pPct);
  return out;
}

/** Primary deficit (percent of GDP) that holds the debt ratio at d: p = d (g - r) / (1 + g). */
export const stabilisingPrimary = (d: number, rPct: number, gPct: number) => (d * (gPct - rPct)) / 100 / (1 + gPct / 100);
