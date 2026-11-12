/**
 * Shared numerics for the General Chemistry Lab I simulators (lab-* widgets): a seeded random
 * generator, instrument rounding, and the physical data the simulators use, each with its source.
 *
 * Data and sources
 *   Density of air-free water, 0-40 °C: Tanaka et al., Metrologia 38, 301 (2001), the formula
 *     recommended by CIPM; agrees with the CRC Handbook table to 1e-5 g/mL.
 *   Vapour pressure of water: Buck, J. Appl. Meteorol. 20, 1527 (1981), revised 1996 constants;
 *     within 0.05% of the IAPWS values (NIST Chemistry WebBook) between 0 and 50 °C.
 *   Enthalpies (kJ/mol, 25 °C): NBS Tables of Chemical Thermodynamic Properties (1982), as
 *     reproduced in the CRC Handbook: ΔfH° H2O(l) −285.83, OH−(aq) −229.99, Mg2+(aq) −466.85,
 *     MgO(s) −601.6; enthalpies of solution at infinite dilution NH4NO3 +25.69, KCl +17.22,
 *     NaOH −44.51, CaCl2 −81.33; ΔfusH of ice 6.01 kJ/mol (333.5 J/g).
 *   Acid dissociation constants (25 °C): phthalic acid pKa 2.95 and 5.41; hydrogen sulfate 1.99;
 *     sulfamic acid 1.05; tartaric acid 3.04 and 4.37 (CRC Handbook, "Dissociation constants of
 *     organic acids and bases" / "of inorganic acids and bases").
 *   Food dyes: λmax and absorptivity from the JECFA Combined Compendium of Food Additive
 *     Specifications, vol. 4 (FAO, 2006): Brilliant Blue FCF 630 nm, 164 L g−1 cm−1 (×792.85 g/mol
 *     = 1.30e5 L mol−1 cm−1); Allura Red AC 504 nm, 52.0 L g−1 cm−1 (×496.42 = 2.58e4);
 *     Tartrazine 427 nm, 53.0 L g−1 cm−1 (×534.36 = 2.83e4).
 */

/** Mulberry32: a small, fast, seedable generator. Returns a function giving uniform [0, 1). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random generator with uniform, normal and range helpers. */
export interface Rand {
  u: () => number;
  /** Uniform in [a, b). */
  range: (a: number, b: number) => number;
  /** Normal with mean 0 and the given standard deviation (Box-Muller). */
  normal: (sd?: number) => number;
  /** One of the items. */
  pick: <T>(items: readonly T[]) => T;
}

export function makeRand(seed: number): Rand {
  const u = rng(seed);
  return {
    u,
    range: (a, b) => a + (b - a) * u(),
    normal: (sd = 1) => {
      const u1 = Math.max(1e-12, u());
      const u2 = u();
      return sd * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    },
    pick: (items) => items[Math.floor(u() * items.length) % items.length],
  };
}

/** A fresh six-digit sample number. */
export function newSeed(): number {
  return 100000 + Math.floor(Math.random() * 900000);
}

/** Derives an independent seed for a sub-stream (a trial, a reading) from a sample seed. */
export function subSeed(seed: number, ...keys: number[]): number {
  let h = seed >>> 0;
  for (const k of keys) {
    h = Math.imul(h ^ (k + 0x9e3779b9), 0x85ebca6b) >>> 0;
    h ^= h >>> 13;
  }
  return h >>> 0;
}

/** Rounds to the instrument's resolution (0.0001 for an analytical balance, 0.1 for a thermometer). */
export function quantize(x: number, step: number): number {
  return Math.round(x / step) * step;
}

/** Fixed decimals with a true minus sign, keeping trailing zeros (they are significant). */
export function fx(x: number, decimals: number): string {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(decimals);
  return s.startsWith('-') ? (Number(s) === 0 ? s.slice(1) : `−${s.slice(1)}`) : s;
}

/** Decimal places implied by a resolution such as 0.01. */
export function decimalsOf(step: number): number {
  return Math.max(0, Math.round(-Math.log10(step)));
}

/** Density of air-free water in g/mL at t °C (Tanaka et al. 2001). */
export function waterDensity(t: number): number {
  const a1 = -3.983035;
  const a2 = 301.797;
  const a3 = 522528.9;
  const a4 = 69.34881;
  const a5 = 999.97495;
  return (a5 * (1 - ((t + a1) ** 2 * (t + a2)) / (a3 * (t + a4)))) / 1000;
}

/** Vapour pressure of water in mmHg at t °C (Buck 1996 constants). */
export function waterVapourPressure(t: number): number {
  const kPa = 0.61121 * Math.exp((18.678 - t / 234.5) * (t / (257.14 + t)));
  return (kPa * 760) / 101.325;
}

/** Air buoyancy: what a balance calibrated with steel weights (8.0 g/mL) shows for true mass m of density rho. */
export function balanceReading(mTrue: number, rho: number, rhoAir = 0.0012): number {
  return (mTrue * (1 - rhoAir / rho)) / (1 - rhoAir / 8.0);
}

export const R_LATM = 0.082057; // L atm mol−1 K−1
export const R_J = 8.314462; // J mol−1 K−1
export const C_WATER = 4.184; // J g−1 °C−1, the value the lessons use for dilute solutions
export const M = {
  Mg: 24.305,
  O: 15.999,
  N: 14.007,
  H: 1.008,
  Zn: 65.38,
  Al: 26.982,
  KHP: 204.22,
  H2O: 18.015,
  MgO: 40.304,
  NH4NO3: 80.043,
  CaCl2: 110.98,
  NaOH: 39.997,
  KCl: 74.551,
} as const;

/** Enthalpies used by the calorimetry simulator, kJ/mol (see header for sources). */
export const DH = {
  neutralization: -55.84, // H+(aq) + OH−(aq) -> H2O(l)
  fusion: 6.01,
  mgHcl: -466.85, // Mg(s) + 2H+(aq) -> Mg2+(aq) + H2(g)
  mgoHcl: -151.08, // MgO(s) + 2H+(aq) -> Mg2+(aq) + H2O(l) = −466.85 − 285.83 + 601.6
  solution: { NH4NO3: 25.69, KCl: 17.22, NaOH: -44.51, CaCl2: -81.33 } as Record<string, number>,
};
