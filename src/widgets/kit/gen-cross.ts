/**
 * Cross logic for gen-punnett: parse genotypes, list gametes, combine them, and classify
 * offspring by genotype and phenotype (complete, incomplete or co-dominance per gene, X-linkage,
 * and the classic two-gene epistatic ratios).
 */

export type Dominance = 'complete' | 'incomplete' | 'codominant';
export type Epistasis = 'none' | '9:7' | '9:3:4' | '12:3:1' | '15:1' | '13:3' | '9:6:1';
export const EPISTASIS: Epistasis[] = ['none', '9:7', '9:3:4', '12:3:1', '15:1', '13:3', '9:6:1'];

/** One gene's two alleles, each a single letter; uppercase = dominant. */
export type GenePair = [string, string];

export interface Parsed {
  genes: string[]; // uppercase gene letters in order
  pairs: GenePair[];
}

const pairOrder = (a: string, b: string): GenePair => (a === a.toUpperCase() ? [a, b] : [b, a]);

/** "AaBb" -> genes ["A","B"], pairs [["A","a"],["B","b"]]. */
export function parseAutosomal(g: string, key: string): Parsed {
  const s = g.replace(/\s+/g, '');
  if (!/^[A-Za-z]+$/.test(s) || s.length % 2 !== 0 || s.length < 2 || s.length > 6)
    throw new Error(`parameter "${key}" should be 1-3 allele pairs such as "Aa" or "AaBb", got "${g}"`);
  const genes: string[] = [];
  const pairs: GenePair[] = [];
  for (let i = 0; i < s.length; i += 2) {
    const a = s[i];
    const b = s[i + 1];
    if (a.toUpperCase() !== b.toUpperCase()) throw new Error(`parameter "${key}": "${a}${b}" mixes two genes; write the two alleles of one gene together`);
    const G = a.toUpperCase();
    if (genes.includes(G)) throw new Error(`parameter "${key}": gene ${G} appears twice`);
    genes.push(G);
    pairs.push(pairOrder(a, b));
  }
  return { genes, pairs };
}

export interface XParsed {
  gene: string;
  mother: GenePair; // two X alleles
  father: string; // one X allele
}

/** Mother "XAXa", father "XaY". */
export function parseX(mother: string, father: string): XParsed {
  const m = mother.replace(/\s+/g, '').match(/^X([A-Za-z])X([A-Za-z])$/);
  if (!m) throw new Error(`parameter "p1" (the mother, X-linked) should look like "XAXa", got "${mother}"`);
  const f = father.replace(/\s+/g, '').match(/^X([A-Za-z])Y$/);
  if (!f) throw new Error(`parameter "p2" (the father, X-linked) should look like "XaY", got "${father}"`);
  const G = m[1].toUpperCase();
  if (m[2].toUpperCase() !== G || f[1].toUpperCase() !== G) throw new Error('X-linked: both parents must use the same gene letter');
  return { gene: G, mother: pairOrder(m[1], m[2]), father: f[1] };
}

export interface Gamete {
  alleles: string[]; // one per gene ("Y" stands for the Y chromosome in X-linked crosses)
  p: number;
}

/** Distinct gametes with probabilities (independent assortment). */
export function gametes(pairs: GenePair[]): Gamete[] {
  let out: Gamete[] = [{ alleles: [], p: 1 }];
  for (const [a, b] of pairs) {
    const opts = a === b ? [[a, 1]] : [[a, 0.5], [b, 0.5]];
    out = out.flatMap((g) => opts.map(([al, q]) => ({ alleles: [...g.alleles, al as string], p: g.p * (q as number) })));
  }
  return out;
}

/** Genotype string with the dominant allele first in each gene: "AaBb". */
export function genotypeOf(x: string[], y: string[]): string {
  return x.map((a, i) => pairOrder(a, y[i]).join('')).join('');
}

export interface TraitNames {
  [gene: string]: string[];
}

/** Phenotype of one gene from its two alleles. */
export function genePhenotype(G: string, a: string, b: string, dom: Dominance, names?: string[]): string {
  const nDom = (a === G ? 1 : 0) + (b === G ? 1 : 0);
  const g = G.toLowerCase();
  if (dom === 'complete') {
    if (nDom > 0) return names?.[0] ?? `${G}_`;
    return names?.[1] ?? `${g}${g}`;
  }
  if (nDom === 2) return names?.[0] ?? `${G}${G}`;
  if (nDom === 0) return names?.[1] ?? `${g}${g}`;
  return names?.[2] ?? (dom === 'incomplete' ? (names ? 'intermediate' : `${G}${g} (intermediate)`) : names ? `both (${names[0]} and ${names[1]})` : `${G}${g} (both)`);
}

/** The four dihybrid classes. */
export type Klass = 'A_B_' | 'A_bb' | 'aaB_' | 'aabb';

export const EPI_GROUPS: Record<Exclude<Epistasis, 'none'>, Klass[][]> = {
  '9:7': [['A_B_'], ['A_bb', 'aaB_', 'aabb']],
  '9:3:4': [['A_B_'], ['A_bb'], ['aaB_', 'aabb']],
  '12:3:1': [['A_B_', 'A_bb'], ['aaB_'], ['aabb']],
  '15:1': [['A_B_', 'A_bb', 'aaB_'], ['aabb']],
  '13:3': [['A_B_', 'A_bb', 'aabb'], ['aaB_']],
  '9:6:1': [['A_B_'], ['A_bb', 'aaB_'], ['aabb']],
};

/** Example phenotype names for each interaction (the classic textbook cases). */
export const EPI_NAMES: Record<Exclude<Epistasis, 'none'>, string[]> = {
  '9:7': ['purple', 'white'],
  '9:3:4': ['black', 'brown', 'yellow'],
  '12:3:1': ['white', 'yellow', 'green'],
  '15:1': ['triangular', 'ovoid'],
  '13:3': ['white', 'coloured'],
  '9:6:1': ['disc', 'sphere', 'long'],
};

export const EPI_RULE: Record<Exclude<Epistasis, 'none'>, string> = {
  '9:7': 'duplicate recessive epistasis (complementary genes): both A_ and B_ are needed for the product, so aa or bb alone gives the mutant phenotype',
  '9:3:4': 'recessive epistasis: aa masks gene B, so aaB_ and aabb look the same',
  '12:3:1': 'dominant epistasis: A_ masks gene B, so A_B_ and A_bb look the same',
  '15:1': 'duplicate dominant genes: one dominant allele of either gene is enough; only aabb differs',
  '13:3': 'dominant suppression: A_ suppresses the phenotype made by B_, so only aaB_ shows it',
  '9:6:1': 'additive (duplicate interaction): one dominant allele of either gene gives an intermediate phenotype, both give the full one',
};

export function klassOf(G1: string, G2: string, x: string[], y: string[]): Klass {
  const A = x[0] === G1 || y[0] === G1;
  const B = x[1] === G2 || y[1] === G2;
  return `${A ? 'A_' : 'aa'}${B ? 'B_' : 'bb'}` as Klass;
}

export interface Offspring {
  genotype: string;
  phenotype: string;
  p: number;
  sex?: 'F' | 'M';
}

export interface CrossOptions {
  dominance: Dominance[];
  traits?: TraitNames;
  epistasis: Epistasis;
  epiNames?: string[];
}

/** All zygotes of an autosomal cross. */
export function crossAutosomal(g1: Parsed, g2: Parsed, opt: CrossOptions): { square: { row: Gamete; col: Gamete; child: Offspring }[][]; rows: Gamete[]; cols: Gamete[]; children: Offspring[] } {
  const rows = gametes(g1.pairs);
  const cols = gametes(g2.pairs);
  const genes = g1.genes;
  const phen = (x: string[], y: string[]) => {
    if (opt.epistasis !== 'none' && genes.length === 2) {
      const k = klassOf(genes[0], genes[1], x, y);
      const groups = EPI_GROUPS[opt.epistasis];
      const gi = groups.findIndex((g) => g.includes(k));
      return (opt.epiNames ?? EPI_NAMES[opt.epistasis])[gi];
    }
    return genes.map((G, i) => genePhenotype(G, x[i], y[i], opt.dominance[i] ?? 'complete', opt.traits?.[G])).join(', ');
  };
  const square = rows.map((r) => cols.map((c) => ({ row: r, col: c, child: { genotype: genotypeOf(r.alleles, c.alleles), phenotype: phen(r.alleles, c.alleles), p: r.p * c.p } })));
  return { square, rows, cols, children: square.flat().map((s) => s.child) };
}

/** All zygotes of an X-linked cross. Mother gametes are rows, father gametes (X allele or Y) columns. */
export function crossX(x: XParsed, opt: { dominance: Dominance; names?: string[] }) {
  const rows = gametes([x.mother]);
  const cols: Gamete[] = [
    { alleles: [x.father], p: 0.5 },
    { alleles: ['Y'], p: 0.5 },
  ];
  const G = x.gene;
  const square = rows.map((r) =>
    cols.map((c) => {
      const m = r.alleles[0];
      const f = c.alleles[0];
      if (f === 'Y') {
        const phenotype = genePhenotype(G, m, m, opt.dominance === 'complete' ? 'complete' : opt.dominance, opt.names);
        return { row: r, col: c, child: { genotype: `X${m}Y`, phenotype, p: r.p * c.p, sex: 'M' as const } };
      }
      const [a, b] = pairOrder(m, f);
      return { row: r, col: c, child: { genotype: `X${a}X${b}`, phenotype: genePhenotype(G, a, b, opt.dominance, opt.names), p: r.p * c.p, sex: 'F' as const } };
    }),
  );
  return { square, rows, cols, children: square.flat().map((s) => s.child) };
}

/** Sum probabilities by a key, keeping first-seen order unless `order` sorts them. */
export function tally<T>(items: T[], key: (t: T) => string, p: (t: T) => number): { key: string; p: number }[] {
  const m = new Map<string, number>();
  for (const it of items) m.set(key(it), (m.get(key(it)) ?? 0) + p(it));
  return [...m.entries()].map(([k, v]) => ({ key: k, p: v }));
}

/** Sort genotypes AA < Aa < aa gene by gene. */
export function genotypeRank(g: string): number {
  let r = 0;
  for (let i = 0; i + 1 < g.length; i += 2) {
    const k = (g[i] === g[i].toUpperCase() ? 0 : 1) + (g[i + 1] === g[i + 1].toUpperCase() ? 0 : 1);
    r = r * 3 + k;
  }
  return r;
}
