/**
 * pH of an acid being titrated with NaOH, from the full charge balance (no buffer approximations),
 * for the lab-titration simulator. Activities are taken as concentrations and Kw = 1.0e-14 (25 °C).
 *
 * An acid is described by the pKa values of its fully protonated form H_nA (charge 0) and by how
 * many protons its starting salt has already lost: KHP is the phthalic acid system (pKa 2.95,
 * 5.41) starting as HP− with one K+; sulfamic acid is H_nA itself (removed = 0).
 */

export interface AcidSystem {
  name: string;
  /** Formula as shown to the learner. */
  formula: string;
  /** g/mol of the solid as weighed. */
  molarMass: number;
  /** pKa values of the fully protonated form, in order. */
  pKa: number[];
  /** Protons already removed in the weighed form (balanced by K+). */
  removed: number;
}

export const ACIDS: Record<string, AcidSystem> = {
  khp: { name: 'potassium hydrogen phthalate (KHP)', formula: 'KHC8H4O4', molarMass: 204.22, pKa: [2.95, 5.41], removed: 1 },
  sulfamic: { name: 'sulfamic acid', formula: 'H3NSO3', molarMass: 97.09, pKa: [1.05], removed: 0 },
  khso4: { name: 'potassium hydrogen sulfate', formula: 'KHSO4', molarMass: 136.17, pKa: [-3, 1.99], removed: 1 },
  kht: { name: 'potassium hydrogen tartrate', formula: 'KHC4H4O6', molarMass: 188.18, pKa: [3.04, 4.37], removed: 1 },
};

const KW = 1e-14;

/** Fractions of each deprotonation state j = 0..n at hydrogen-ion concentration h. */
function fractions(pKa: number[], h: number): number[] {
  const terms = [1];
  let prod = 1;
  for (const p of pKa) {
    prod *= 10 ** -p;
    terms.push(prod / h ** terms.length);
  }
  const s = terms.reduce((a, b) => a + b, 0);
  return terms.map((t) => t / s);
}

/**
 * pH after adding vb mL of NaOH (cb mol/L) to nAcid mol of the acid dissolved in v0 mL of water.
 * Solves [H+] + [Na+] + [K+] = [OH−] + C·Σ j·α_j by bisection on log[H+].
 */
export function titrationPH(acid: AcidSystem, nAcid: number, v0: number, cb: number, vb: number): number {
  const vL = (v0 + vb) / 1000;
  const C = nAcid / vL;
  const na = (cb * vb) / 1000 / vL;
  const k = acid.removed * C;
  const f = (logh: number) => {
    const h = 10 ** logh;
    const a = fractions(acid.pKa, h);
    const neg = C * a.reduce((s, x, j) => s + j * x, 0);
    return h + na + k - KW / h - neg;
  };
  let lo = -14.5;
  let hi = 1;
  // f increases with h: at very low h, OH− dominates (negative); at high h, H+ dominates.
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (f(mid) > 0) hi = mid;
    else lo = mid;
  }
  return -(lo + hi) / 2;
}

/** Acid-base indicators: pKa of the colour change and the two colours as RGB 0-255 per unit intensity. */
export interface Indicator {
  name: string;
  pKin: number;
  /** Colour of the acid form and of the base form when fully developed (null = colourless). */
  acid: [number, number, number] | null;
  base: [number, number, number] | null;
}

export const INDICATORS: Record<string, Indicator> = {
  phenolphthalein: { name: 'phenolphthalein', pKin: 9.4, acid: null, base: [214, 51, 132] },
  bromothymol: { name: 'bromothymol blue', pKin: 7.1, acid: [222, 196, 40], base: [40, 92, 196] },
};

/** Fraction of the indicator in its base form at a given pH. */
export function baseFraction(ind: Indicator, pH: number): number {
  return 1 / (1 + 10 ** (ind.pKin - pH));
}
