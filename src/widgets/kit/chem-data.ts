/**
 * Element data and electron configurations for the General Chemistry I widgets (Z = 1-54).
 *
 * Sources (stated in the widgets that show them):
 *   mass   standard atomic weights, IUPAC/CIAAW abridged values (Tc: mass number of its longest-lived isotope)
 *   ie1    first ionisation energy in kJ/mol, CRC Handbook of Chemistry and Physics (from NIST ASD data)
 *   en     Pauling electronegativity, CRC Handbook / WebElements (null where none is defined)
 *   rcov   single-bond covalent radius in pm, Cordero et al., Dalton Trans. 2008, 2832
 *          (sp3 value for C, low-spin values for Mn, Fe, Co)
 */

export interface Element {
  z: number;
  sym: string;
  name: string;
  mass: number;
  period: number;
  group: number;
  ie1: number;
  en: number | null;
  rcov: number;
}

// z, symbol, name, mass, group, ie1, en, rcov
const RAW: [number, string, string, number, number, number, number | null, number][] = [
  [1, 'H', 'Hydrogen', 1.008, 1, 1312.0, 2.2, 31],
  [2, 'He', 'Helium', 4.0026, 18, 2372.3, null, 28],
  [3, 'Li', 'Lithium', 6.94, 1, 520.2, 0.98, 128],
  [4, 'Be', 'Beryllium', 9.0122, 2, 899.5, 1.57, 96],
  [5, 'B', 'Boron', 10.81, 13, 800.6, 2.04, 84],
  [6, 'C', 'Carbon', 12.011, 14, 1086.5, 2.55, 76],
  [7, 'N', 'Nitrogen', 14.007, 15, 1402.3, 3.04, 71],
  [8, 'O', 'Oxygen', 15.999, 16, 1313.9, 3.44, 66],
  [9, 'F', 'Fluorine', 18.998, 17, 1681.0, 3.98, 57],
  [10, 'Ne', 'Neon', 20.18, 18, 2080.7, null, 58],
  [11, 'Na', 'Sodium', 22.99, 1, 495.8, 0.93, 166],
  [12, 'Mg', 'Magnesium', 24.305, 2, 737.7, 1.31, 141],
  [13, 'Al', 'Aluminium', 26.982, 13, 577.5, 1.61, 121],
  [14, 'Si', 'Silicon', 28.085, 14, 786.5, 1.9, 111],
  [15, 'P', 'Phosphorus', 30.974, 15, 1011.8, 2.19, 107],
  [16, 'S', 'Sulfur', 32.06, 16, 999.6, 2.58, 105],
  [17, 'Cl', 'Chlorine', 35.45, 17, 1251.2, 3.16, 102],
  [18, 'Ar', 'Argon', 39.95, 18, 1520.6, null, 106],
  [19, 'K', 'Potassium', 39.098, 1, 418.8, 0.82, 203],
  [20, 'Ca', 'Calcium', 40.078, 2, 589.8, 1.0, 176],
  [21, 'Sc', 'Scandium', 44.956, 3, 633.1, 1.36, 170],
  [22, 'Ti', 'Titanium', 47.867, 4, 658.8, 1.54, 160],
  [23, 'V', 'Vanadium', 50.942, 5, 650.9, 1.63, 153],
  [24, 'Cr', 'Chromium', 51.996, 6, 652.9, 1.66, 139],
  [25, 'Mn', 'Manganese', 54.938, 7, 717.3, 1.55, 139],
  [26, 'Fe', 'Iron', 55.845, 8, 762.5, 1.83, 132],
  [27, 'Co', 'Cobalt', 58.933, 9, 760.4, 1.88, 126],
  [28, 'Ni', 'Nickel', 58.693, 10, 737.1, 1.91, 124],
  [29, 'Cu', 'Copper', 63.546, 11, 745.5, 1.9, 132],
  [30, 'Zn', 'Zinc', 65.38, 12, 906.4, 1.65, 122],
  [31, 'Ga', 'Gallium', 69.723, 13, 578.8, 1.81, 122],
  [32, 'Ge', 'Germanium', 72.63, 14, 762, 2.01, 120],
  [33, 'As', 'Arsenic', 74.922, 15, 947.0, 2.18, 119],
  [34, 'Se', 'Selenium', 78.971, 16, 941.0, 2.55, 120],
  [35, 'Br', 'Bromine', 79.904, 17, 1139.9, 2.96, 120],
  [36, 'Kr', 'Krypton', 83.798, 18, 1350.8, 3.0, 116],
  [37, 'Rb', 'Rubidium', 85.468, 1, 403.0, 0.82, 220],
  [38, 'Sr', 'Strontium', 87.62, 2, 549.5, 0.95, 195],
  [39, 'Y', 'Yttrium', 88.906, 3, 600, 1.22, 190],
  [40, 'Zr', 'Zirconium', 91.224, 4, 640.1, 1.33, 175],
  [41, 'Nb', 'Niobium', 92.906, 5, 652.1, 1.6, 164],
  [42, 'Mo', 'Molybdenum', 95.95, 6, 684.3, 2.16, 154],
  [43, 'Tc', 'Technetium', 98, 7, 686.9, 1.9, 147],
  [44, 'Ru', 'Ruthenium', 101.07, 8, 710.2, 2.2, 146],
  [45, 'Rh', 'Rhodium', 102.91, 9, 719.7, 2.28, 142],
  [46, 'Pd', 'Palladium', 106.42, 10, 804.4, 2.2, 139],
  [47, 'Ag', 'Silver', 107.87, 11, 731.0, 1.93, 145],
  [48, 'Cd', 'Cadmium', 112.41, 12, 867.8, 1.69, 144],
  [49, 'In', 'Indium', 114.82, 13, 558.3, 1.78, 142],
  [50, 'Sn', 'Tin', 118.71, 14, 708.6, 1.96, 139],
  [51, 'Sb', 'Antimony', 121.76, 15, 834, 2.05, 139],
  [52, 'Te', 'Tellurium', 127.6, 16, 869.3, 2.1, 138],
  [53, 'I', 'Iodine', 126.9, 17, 1008.4, 2.66, 139],
  [54, 'Xe', 'Xenon', 131.29, 18, 1170.4, 2.6, 140],
];

const periodOf = (z: number) => (z <= 2 ? 1 : z <= 10 ? 2 : z <= 18 ? 3 : z <= 36 ? 4 : 5);

export const ELEMENTS: Element[] = RAW.map(([z, sym, name, mass, group, ie1, en, rcov]) => ({ z, sym, name, mass, period: periodOf(z), group, ie1, en, rcov }));

export const BY_SYMBOL: Record<string, Element> = Object.fromEntries(ELEMENTS.map((e) => [e.sym, e]));

/** Looks up an element by symbol; throws a readable Error for an unknown one. */
export function elementBySymbol(sym: string): Element {
  const e = BY_SYMBOL[sym];
  if (!e) throw new Error(`unknown element "${sym}" (the widgets know H to Xe, plus Cs, Ba, Pt, Au, Hg, Pb, U)`);
  return e;
}

/**
 * Parses a formula such as "H2O", "Ca(OH)2" or "Fe2(SO4)3" into element counts.
 * Throws a readable Error on anything it cannot read.
 */
export function parseFormula(f: string): Record<string, number> {
  let i = 0;
  const readNum = () => {
    let s = '';
    while (i < f.length && /[0-9]/.test(f[i])) s += f[i++];
    return s ? parseInt(s, 10) : 1;
  };
  const group = (close?: string): Record<string, number> => {
    const out: Record<string, number> = {};
    const addAll = (src: Record<string, number>, k: number) => {
      for (const [s, n] of Object.entries(src)) out[s] = (out[s] ?? 0) + n * k;
    };
    while (i < f.length) {
      const c = f[i];
      if (c === '(' || c === '[') {
        i++;
        const inner = group(c === '(' ? ')' : ']');
        addAll(inner, readNum());
      } else if (c === ')' || c === ']') {
        if (c !== close) throw new Error(`unbalanced bracket in formula "${f}"`);
        i++;
        return out;
      } else if (/[A-Z]/.test(c)) {
        let sym = c;
        i++;
        while (i < f.length && /[a-z]/.test(f[i])) sym += f[i++];
        atomicMass(sym);
        addAll({ [sym]: 1 }, readNum());
      } else {
        throw new Error(`cannot read "${c}" in formula "${f}"`);
      }
    }
    if (close) throw new Error(`missing "${close}" in formula "${f}"`);
    return out;
  };
  const r = group();
  if (!Object.keys(r).length) throw new Error(`empty formula "${f}"`);
  return r;
}

/** Heavier elements that appear in course reactions (standard atomic weights). */
const EXTRA_MASS: Record<string, number> = { Cs: 132.91, Ba: 137.33, Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2, U: 238.03 };

export function atomicMass(sym: string): number {
  return EXTRA_MASS[sym] ?? elementBySymbol(sym).mass;
}

export function molarMass(f: string): number {
  return Object.entries(parseFormula(f)).reduce((s, [sym, n]) => s + atomicMass(sym) * n, 0);
}

/** A formula as HTML-free text with Unicode subscripts, e.g. "Fe₂(SO₄)₃". */
export function prettyFormula(f: string): string {
  const sub = '₀₁₂₃₄₅₆₇₈₉';
  // Only digits that follow an element symbol or a bracket are subscripts (coefficients stay as they are).
  return f.replace(/([A-Za-z)\]])([0-9]+)/g, (_m, a: string, ds: string) => a + ds.replace(/[0-9]/g, (d) => sub[+d]));
}

/* ---------- electron configurations ---------- */

export interface Subshell {
  n: number;
  l: number;
  /** "1s", "3d", ... */
  label: string;
  cap: number;
}

const L = 'spdf';
/** Aufbau (Madelung n + l) order up to 5p. */
export const AUFBAU: Subshell[] = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p'].map((label) => {
  const n = +label[0];
  const l = L.indexOf(label[1]);
  return { n, l, label, cap: 2 * (2 * l + 1) };
});

/** Ground states that differ from the simple aufbau filling (Z <= 54), as [subshell, electrons] overrides. */
export const EXCEPTIONS: Record<number, Record<string, number>> = {
  24: { '4s': 1, '3d': 5 },
  29: { '4s': 1, '3d': 10 },
  41: { '5s': 1, '4d': 4 },
  42: { '5s': 1, '4d': 5 },
  44: { '5s': 1, '4d': 7 },
  45: { '5s': 1, '4d': 8 },
  46: { '5s': 0, '4d': 10 },
  47: { '5s': 1, '4d': 10 },
};

/** Electrons per subshell by simple aufbau filling. */
export function aufbauFill(z: number): Record<string, number> {
  const out: Record<string, number> = {};
  let left = z;
  for (const s of AUFBAU) {
    const k = Math.min(left, s.cap);
    if (k > 0) out[s.label] = k;
    left -= k;
  }
  return out;
}

/** Observed ground-state configuration. */
export function groundState(z: number): Record<string, number> {
  const base = aufbauFill(z);
  const ex = EXCEPTIONS[z];
  if (!ex) return base;
  const out = { ...base, ...ex };
  for (const k of Object.keys(out)) if (!out[k]) delete out[k];
  return out;
}

const NOBLE = [
  { z: 2, sym: 'He' },
  { z: 10, sym: 'Ne' },
  { z: 18, sym: 'Ar' },
  { z: 36, sym: 'Kr' },
];

/** Subshells in the order chemists write them (by n, then l). */
export function writtenOrder(cfg: Record<string, number>): string[] {
  return Object.keys(cfg).sort((a, b) => +a[0] - +b[0] || L.indexOf(a[1]) - L.indexOf(b[1]));
}

/** Configuration as a list of [label, count] with an optional noble-gas core. */
export function configParts(z: number, cfg: Record<string, number>, core = true): { core?: string; parts: [string, number][] } {
  // Use the largest noble-gas core that the configuration actually contains in full.
  const ng = core
    ? [...NOBLE].reverse().find((g) => {
        if (g.z >= z) return false;
        const c = aufbauFill(g.z);
        return Object.keys(c).every((k) => cfg[k] === c[k]);
      })
    : undefined;
  const coreCfg = ng ? aufbauFill(ng.z) : {};
  const parts: [string, number][] = [];
  for (const k of writtenOrder(cfg)) {
    const inCore = coreCfg[k] ?? 0;
    if (ng && inCore === cfg[k]) continue;
    parts.push([k, cfg[k]]);
  }
  return { core: ng?.sym, parts };
}

/** Configuration as TeX, e.g. "[\\mathrm{Ar}]\\,3d^{5}4s^{1}". */
export function configTex(z: number, cfg: Record<string, number>, core = true): string {
  const { core: c, parts } = configParts(z, cfg, core);
  const body = parts.map(([k, n]) => `${k[0]}\\mathrm{${k[1]}}^{${n}}`).join('\\,');
  return c ? `[\\mathrm{${c}}]\\,${body}` : body;
}

/** Unpaired electrons when each subshell is filled by Hund's rule. */
export function unpaired(cfg: Record<string, number>): number {
  let u = 0;
  for (const [k, n] of Object.entries(cfg)) {
    const orbitals = 2 * L.indexOf(k[1]) + 1;
    u += n <= orbitals ? n : 2 * orbitals - n;
  }
  return u;
}
