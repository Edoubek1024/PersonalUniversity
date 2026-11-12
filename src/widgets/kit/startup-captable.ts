/**
 * Cap table arithmetic for the startup course: post-money and pre-money SAFEs, a priced round with
 * an option pool target, and a simple liquidation waterfall. Pure functions, no React.
 *
 * Conventions (they follow the lessons and the YC post-money SAFE User Guide):
 * - Post-money SAFE: ownership sold = amount / post-money cap, measured on Company Capitalization,
 *   which includes existing shares, the existing unissued pool and the converting SAFEs, but not a
 *   pool increase made in the round. Before any round, Company Capitalization is
 *   existing / (1 - sum of amount/cap), rounded down, and each SAFE's shares are its percentage of
 *   that, rounded down (this reproduces the guide's Example 1: 11,764,705, 588,235 and 1,176,470).
 * - Pre-money SAFE: price = cap / (existing shares + any pool increase created in the pre-money),
 *   ignoring the other SAFEs.
 * - In a priced round each SAFE converts at the lower of its SAFE price and the round price.
 * - Priced round: price = pre-money / (existing + converted SAFEs + pool increase in the pre-money).
 *   The pool target is a share of post-closing fully diluted shares. "pre" timing puts the increase
 *   in the pre-money (the option pool shuffle); "post" timing creates it after closing, so everyone
 *   is diluted. A pool never shrinks.
 * - Waterfall: every preferred holder (each SAFE, and the round's new investors) has a 1x
 *   non-participating preference equal to the money it paid, all pari passu; common receives the
 *   rest; the unissued pool receives nothing. When proceeds are below total preferences, they are
 *   shared in proportion to preference.
 */

export interface Safe {
  amount: number;
  cap: number;
}

export type SafeType = 'post' | 'pre';
export type PoolTiming = 'pre' | 'post';

export interface RoundInput {
  pre: number;
  money: number;
  /** Target available pool as a fraction of post-closing fully diluted shares, 0 to 0.5. */
  poolTarget: number;
  poolTiming: PoolTiming;
}

export interface CapInput {
  founders: number;
  pool: number;
  safes: Safe[];
  safeType: SafeType;
  round: RoundInput | null;
}

export interface SafeLine {
  /** SAFE price per share used for conversion at this stage. */
  safePrice: number;
  /** Price actually used (lower of safe price and round price). */
  price: number;
  shares: number;
  /** True when the round price is below the SAFE price, so the SAFE converts at the round price. */
  atRound: boolean;
}

export interface Stage {
  founders: number;
  pool: number;
  safes: SafeLine[];
  investors: number;
  total: number;
}

export interface RoundStage extends Stage {
  price: number;
  poolIncrease: number;
  /** Price times existing shares (founders and existing pool): what the old shares are really priced at. */
  effectivePre: number;
  post: number;
  converged: boolean;
}

export interface CapResult {
  /** Fraction sold on each SAFE before any round (post-money: amount / cap). */
  safeFractions: number[];
  /** SAFEs converted at their caps, no priced round. */
  stage1: Stage;
  stage2: RoundStage | null;
  error: string | null;
}

export function computeCapTable(inp: CapInput): CapResult {
  const E = inp.founders + inp.pool;
  const empty: Stage = { founders: inp.founders, pool: inp.pool, safes: [], investors: 0, total: E };
  const fractions = inp.safes.map((s) => s.amount / s.cap);
  // Stage 1: SAFEs at their caps.
  let stage1: Stage;
  if (inp.safeType === 'post') {
    const sold = fractions.reduce((a, b) => a + b, 0);
    if (sold >= 1) return { safeFractions: fractions, stage1: empty, stage2: null, error: 'The SAFEs sell 100% or more of the company: lower the amounts or raise the caps.' };
    const cc = Math.floor(E / (1 - sold) + 1e-9);
    const safes = inp.safes.map((s, i) => {
      const shares = Math.floor(fractions[i] * cc + 1e-9);
      return { safePrice: s.cap / cc, price: s.cap / cc, shares, atRound: false };
    });
    stage1 = { founders: inp.founders, pool: inp.pool, safes, investors: 0, total: E + safes.reduce((a, s) => a + s.shares, 0) };
  } else {
    const safes = inp.safes.map((s) => {
      const p = s.cap / E;
      return { safePrice: p, price: p, shares: Math.floor(s.amount / p + 1e-9), atRound: false };
    });
    stage1 = { founders: inp.founders, pool: inp.pool, safes, investors: 0, total: E + safes.reduce((a, s) => a + s.shares, 0) };
  }
  if (!inp.round) return { safeFractions: fractions, stage1, stage2: null, error: null };

  // Stage 2: fixed point on the round price, which SAFEs convert at it, and the pool increase.
  const { pre, money, poolTarget: p, poolTiming } = inp.round;
  const k = 1 + money / pre;
  if (poolTiming === 'pre' && p * k >= 1) return { safeFractions: fractions, stage1, stage2: null, error: 'That pool target cannot be met: lower it or the new money.' };
  let price = Infinity;
  let atRound = inp.safes.map(() => false);
  let poolInc = 0;
  let shares = inp.safes.map(() => 0);
  let safePrices = inp.safes.map(() => 0);
  let converged = false;
  for (let it = 0; it < 300; it++) {
    if (inp.safeType === 'post') {
      const capSold = fractions.reduce((a, f, i) => a + (atRound[i] ? 0 : f), 0);
      const roundShares = inp.safes.reduce((a, s, i) => a + (atRound[i] ? s.amount / price : 0), 0);
      const cc = (E + roundShares) / (1 - capSold);
      safePrices = inp.safes.map((s) => s.cap / cc);
    } else {
      safePrices = inp.safes.map((s) => s.cap / (E + (poolTiming === 'pre' ? poolInc : 0)));
    }
    shares = inp.safes.map((s, i) => s.amount / Math.min(safePrices[i], price));
    const B = E + shares.reduce((a, b) => a + b, 0);
    let newPrice: number;
    if (poolTiming === 'pre') {
      poolInc = Math.max(0, (p * k * B - inp.pool) / (1 - p * k));
      newPrice = pre / (B + poolInc);
    } else {
      newPrice = pre / B;
      const N = money / newPrice;
      poolInc = Math.max(0, (p * (B + N) - inp.pool) / (1 - p));
    }
    const newAt = inp.safes.map((_, i) => newPrice < safePrices[i] * (1 - 1e-12));
    const same = Number.isFinite(price) && Math.abs(newPrice - price) <= 1e-13 * newPrice && newAt.every((v, i) => v === atRound[i]);
    price = newPrice;
    atRound = newAt;
    if (same) {
      converged = true;
      break;
    }
  }
  const safes: SafeLine[] = inp.safes.map((_, i) => ({ safePrice: safePrices[i], price: Math.min(safePrices[i], price), shares: Math.floor(shares[i] + 1e-9), atRound: atRound[i] }));
  const investors = Math.floor(money / price + 1e-9);
  const poolIncrease = Math.floor(poolInc + 1e-9);
  const total = E + poolIncrease + investors + safes.reduce((a, s) => a + s.shares, 0);
  return {
    safeFractions: fractions,
    stage1,
    stage2: { founders: inp.founders, pool: inp.pool + poolIncrease, safes, investors, total, price, poolIncrease, effectivePre: price * E, post: pre + money, converged },
    error: null,
  };
}

export interface WaterfallClass {
  label: string;
  shares: number;
  pref: number;
}

export interface WaterfallResult {
  /** Value of one common share. */
  x: number;
  payouts: number[];
  /** For preferred classes: true when converting to common pays more than the preference. */
  converts: boolean[];
}

/**
 * Pari passu 1x non-participating preferred plus common. `classes` with pref 0 are common.
 * Each preferred class takes max(pref, shares * x); common takes shares * x; x uses up the exit.
 */
export function waterfall(classes: WaterfallClass[], exit: number): WaterfallResult {
  const totalPref = classes.reduce((a, c) => a + c.pref, 0);
  if (exit <= totalPref) {
    const payouts = classes.map((c) => (totalPref > 0 ? (exit * c.pref) / totalPref : 0));
    return { x: 0, payouts, converts: classes.map(() => false) };
  }
  const paid = (x: number) => classes.reduce((a, c) => a + (c.pref > 0 ? Math.max(c.pref, c.shares * x) : c.shares * x), 0);
  const allShares = classes.reduce((a, c) => a + c.shares, 0);
  if (allShares <= 0) return { x: 0, payouts: classes.map((c) => c.pref), converts: classes.map(() => false) };
  let lo = 0;
  let hi = exit / Math.max(1, classes.filter((c) => c.pref === 0).reduce((a, c) => a + c.shares, 0) || allShares);
  while (paid(hi) < exit) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (paid(mid) < exit) lo = mid;
    else hi = mid;
  }
  const x = (lo + hi) / 2;
  return {
    x,
    payouts: classes.map((c) => (c.pref > 0 ? Math.max(c.pref, c.shares * x) : c.shares * x)),
    converts: classes.map((c) => c.pref > 0 && c.shares * x > c.pref),
  };
}
