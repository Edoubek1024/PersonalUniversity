/**
 * Pedigree model for gen-pedigree: reading the people list, laying it out by generation, and a
 * mode-of-inheritance checker based on genotype elimination (Lange and Goradia): every person
 * starts with the genotypes their phenotype allows under a mode, and each nuclear family removes
 * parental and child genotypes that cannot occur together, repeated until nothing changes. A
 * person left with no genotype means the mode is excluded. For pedigrees without marriage loops
 * this test is exact (assuming complete penetrance and no new mutations).
 */
import { roman } from './gen-ui';

export interface Person {
  id: string;
  sex: 'M' | 'F';
  affected: boolean;
  carrier: boolean;
  deceased: boolean;
  father?: string;
  mother?: string;
}

export function readPeople(v: unknown): Person[] {
  if (!Array.isArray(v) || v.length === 0) throw new Error('parameter "people" should be a non-empty array of {"id", "sex", "affected", "father", "mother"} objects');
  const out: Person[] = v.map((x, i) => {
    if (!x || typeof x !== 'object' || Array.isArray(x)) throw new Error(`people[${i}] should be an object`);
    const o = x as Record<string, unknown>;
    if (typeof o.id !== 'string' || !o.id) throw new Error(`people[${i}] needs a string "id"`);
    if (o.sex !== 'M' && o.sex !== 'F') throw new Error(`people[${i}] ("${o.id}") needs "sex": "M" or "F"`);
    for (const k of ['affected', 'carrier', 'deceased']) if (o[k] !== undefined && typeof o[k] !== 'boolean') throw new Error(`people[${i}] ("${o.id}"): "${k}" should be true or false`);
    for (const k of ['father', 'mother']) if (o[k] !== undefined && typeof o[k] !== 'string') throw new Error(`people[${i}] ("${o.id}"): "${k}" should be an id string`);
    return { id: o.id, sex: o.sex, affected: !!o.affected, carrier: !!o.carrier, deceased: !!o.deceased, father: o.father as string | undefined, mother: o.mother as string | undefined };
  });
  const byId = new Map(out.map((p) => [p.id, p]));
  if (byId.size !== out.length) throw new Error('parameter "people": every id must be unique');
  for (const p of out) {
    if (p.father) {
      const f = byId.get(p.father);
      if (!f) throw new Error(`"${p.id}" has father "${p.father}", who is not in the list`);
      if (f.sex !== 'M') throw new Error(`"${p.id}": father "${p.father}" is not male`);
    }
    if (p.mother) {
      const m = byId.get(p.mother);
      if (!m) throw new Error(`"${p.id}" has mother "${p.mother}", who is not in the list`);
      if (m.sex !== 'F') throw new Error(`"${p.id}": mother "${p.mother}" is not female`);
    }
  }
  return out;
}

// ---------- layout ----------

export interface Placed {
  p: Person;
  gen: number;
  x: number; // slot units
  label: string; // "II-3"
}

export interface Layout {
  placed: Map<string, Placed>;
  gens: number;
  width: number; // slots
  couples: [string, string][]; // [father, mother] pairs with children or a spouse link
  sibships: { father?: string; mother?: string; kids: string[] }[];
}

export function layoutPedigree(people: Person[]): Layout {
  const byId = new Map(people.map((p) => [p.id, p]));
  const hasParents = (p: Person) => !!(p.father || p.mother);
  // spouses = co-parents
  const spouses = new Map<string, Set<string>>();
  const link = (a?: string, b?: string) => {
    if (!a || !b) return;
    if (!spouses.has(a)) spouses.set(a, new Set());
    if (!spouses.has(b)) spouses.set(b, new Set());
    spouses.get(a)!.add(b);
    spouses.get(b)!.add(a);
  };
  for (const p of people) link(p.father, p.mother);

  // generations
  const gen = new Map<string, number>(people.map((p) => [p.id, 0]));
  for (let it = 0; it < people.length + 2; it++) {
    let changed = false;
    for (const p of people) {
      let g = gen.get(p.id)!;
      if (hasParents(p)) g = Math.max(p.father ? gen.get(p.father)! + 1 : 0, p.mother ? gen.get(p.mother)! + 1 : 0);
      else for (const s of spouses.get(p.id) ?? []) if (hasParents(byId.get(s)!)) g = Math.max(g, gen.get(s)!);
      if (g !== gen.get(p.id)) {
        gen.set(p.id, g);
        changed = true;
      }
    }
    if (!changed) break;
  }
  const nGen = Math.max(...gen.values()) + 1;

  // sibships keyed by parents
  const sibKey = (p: Person) => `${p.father ?? ''}|${p.mother ?? ''}`;
  const sibMap = new Map<string, { father?: string; mother?: string; kids: string[] }>();
  for (const p of people)
    if (hasParents(p)) {
      const k = sibKey(p);
      if (!sibMap.has(k)) sibMap.set(k, { father: p.father, mother: p.mother, kids: [] });
      sibMap.get(k)!.kids.push(p.id);
    }

  const x = new Map<string, number>();
  const placedSet = new Set<string>();
  const GAP = 1.6;
  // generation 0: founders in input order, spouses adjacent
  for (let g = 0; g < nGen; g++) {
    const units: { want: number; ids: string[] }[] = [];
    if (g === 0) {
      for (const p of people) {
        if (gen.get(p.id) !== 0 || placedSet.has(p.id) || hasParents(p)) continue;
        const ids = [p.id];
        placedSet.add(p.id);
        for (const s of spouses.get(p.id) ?? []) if (!placedSet.has(s) && gen.get(s) === 0 && !hasParents(byId.get(s)!)) {
          ids.push(s);
          placedSet.add(s);
        }
        units.push({ want: -Infinity, ids });
      }
    } else {
      const sibs = [...sibMap.values()].filter((s) => s.kids.some((k) => gen.get(k) === g));
      const mid = (s: { father?: string; mother?: string }) => {
        const xs = [s.father, s.mother].filter((v): v is string => !!v && x.has(v)).map((v) => x.get(v)!);
        return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
      };
      sibs.sort((a, b) => mid(a) - mid(b));
      for (const s of sibs) {
        const ids: string[] = [];
        for (const k of s.kids) {
          if (placedSet.has(k)) continue;
          ids.push(k);
          placedSet.add(k);
          // married-in spouses go right next to the person they married
          for (const sp of spouses.get(k) ?? []) if (!placedSet.has(sp) && !hasParents(byId.get(sp)!)) {
            ids.push(sp);
            placedSet.add(sp);
          }
        }
        if (ids.length) units.push({ want: mid(s) - (ids.length - 1) / 2, ids });
      }
      // anyone left in this generation (no placed relatives)
      for (const p of people) if (gen.get(p.id) === g && !placedSet.has(p.id)) {
        units.push({ want: -Infinity, ids: [p.id] });
        placedSet.add(p.id);
      }
    }
    let cursor = -Infinity;
    for (const u of units) {
      const start = Math.max(u.want, cursor === -Infinity ? (u.want === -Infinity ? 0 : u.want) : cursor + GAP);
      u.ids.forEach((id, i) => x.set(id, start + i));
      cursor = start + u.ids.length - 1;
    }
  }
  // centre each founder couple above its children when there is room (one pass, left to right)
  const minX = Math.min(...x.values());
  for (const [k, v] of x) x.set(k, v - minX);

  // labels by generation and x
  const placed = new Map<string, Placed>();
  for (let g = 0; g < nGen; g++) {
    const row = people.filter((p) => gen.get(p.id) === g).sort((a, b) => x.get(a.id)! - x.get(b.id)!);
    row.forEach((p, i) => placed.set(p.id, { p, gen: g, x: x.get(p.id)!, label: `${roman(g + 1)}-${i + 1}` }));
  }
  const couples: [string, string][] = [];
  const seen = new Set<string>();
  for (const s of sibMap.values())
    if (s.father && s.mother && !seen.has(`${s.father}|${s.mother}`)) {
      seen.add(`${s.father}|${s.mother}`);
      couples.push([s.father, s.mother]);
    }
  const width = Math.max(...[...placed.values()].map((q) => q.x)) + 1;
  return { placed, gens: nGen, width, couples, sibships: [...sibMap.values()] };
}

// ---------- checker ----------

export type Mode = 'AD' | 'AR' | 'XD' | 'XR' | 'Y' | 'MT';
export const MODES: Mode[] = ['AD', 'AR', 'XD', 'XR', 'Y', 'MT'];
export const MODE_NAMES: Record<Mode, string> = {
  AD: 'Autosomal dominant',
  AR: 'Autosomal recessive',
  XD: 'X-linked dominant',
  XR: 'X-linked recessive',
  Y: 'Y-linked',
  MT: 'Mitochondrial',
};

type G = number; // genotype code: number of disease alleles (autosomal, X), 0/1 (Y, MT), -1 = "no Y" for females in Y mode

function genotypes(mode: Mode, sex: 'M' | 'F'): G[] {
  if (mode === 'AD' || mode === 'AR') return [0, 1, 2];
  if (mode === 'XD' || mode === 'XR') return sex === 'F' ? [0, 1, 2] : [0, 1];
  if (mode === 'Y') return sex === 'M' ? [0, 1] : [-1];
  return [0, 1];
}

function affectedBy(mode: Mode, sex: 'M' | 'F', g: G): boolean {
  switch (mode) {
    case 'AD':
      return g >= 1;
    case 'AR':
      return g === 2;
    case 'XD':
      return sex === 'F' ? g >= 1 : g === 1;
    case 'XR':
      return sex === 'F' ? g === 2 : g === 1;
    case 'Y':
      return g === 1;
    case 'MT':
      return g === 1;
  }
}

const alleles = (g: G) => (g === 0 ? [0] : g === 1 ? [0, 1] : [1]);

function childPossible(mode: Mode, sex: 'M' | 'F', gc: G, gf: G, gm: G): boolean {
  switch (mode) {
    case 'AD':
    case 'AR':
      return alleles(gf).some((a) => alleles(gm).some((b) => a + b === gc));
    case 'XD':
    case 'XR':
      if (sex === 'M') return alleles(gm).includes(gc);
      return alleles(gm).some((b) => gf + b === gc);
    case 'Y':
      return sex === 'M' ? gc === gf : gc === -1;
    case 'MT':
      return gc === gm;
  }
}

export interface ModeResult {
  mode: Mode;
  consistent: boolean;
  reason: string;
  /** Unaffected people who must be heterozygous carriers. */
  carriers: string[];
  marriedInCarriers: string[];
}

interface Family {
  father: string;
  mother: string;
  kids: string[];
}

export function checkModes(people: Person[], labels: Map<string, string>): ModeResult[] {
  const byId = new Map(people.map((p) => [p.id, p]));
  const L = (id: string) => labels.get(id) ?? id;
  // nuclear families, with virtual unknown parents where one is missing
  const fams = new Map<string, Family>();
  const virt = new Map<string, 'M' | 'F'>();
  for (const p of people) {
    if (!p.father && !p.mother) continue;
    const f = p.father ?? `?f:${p.mother}`;
    const m = p.mother ?? `?m:${p.father}`;
    if (!p.father) virt.set(f, 'M');
    if (!p.mother) virt.set(m, 'F');
    const k = `${f}|${m}`;
    if (!fams.has(k)) fams.set(k, { father: f, mother: m, kids: [] });
    fams.get(k)!.kids.push(p.id);
  }
  const sexOf = (id: string) => byId.get(id)?.sex ?? virt.get(id)!;
  const hasParents = (id: string) => !!(byId.get(id)?.father || byId.get(id)?.mother);
  const spouseHasParents = (id: string) => [...fams.values()].some((f) => (f.father === id && hasParents(f.mother)) || (f.mother === id && hasParents(f.father)));

  return MODES.map((mode) => {
    const sets = new Map<string, G[]>();
    for (const p of people) sets.set(p.id, genotypes(mode, p.sex).filter((g) => affectedBy(mode, p.sex, g) === p.affected));
    for (const [id, s] of virt) sets.set(id, genotypes(mode, s));
    let emptied: string | null = null;
    for (const p of people) if (sets.get(p.id)!.length === 0) emptied ??= p.id;
    let failFam: Family | null = null;
    for (let it = 0; it < 50 && !emptied; it++) {
      let changed = false;
      for (const fam of fams.values()) {
        const okF = new Set<G>();
        const okM = new Set<G>();
        const okK = fam.kids.map(() => new Set<G>());
        for (const gf of sets.get(fam.father)!)
          for (const gm of sets.get(fam.mother)!) {
            const kidOpts = fam.kids.map((k) => sets.get(k)!.filter((gc) => childPossible(mode, sexOf(k), gc, gf, gm)));
            if (kidOpts.every((o) => o.length > 0)) {
              okF.add(gf);
              okM.add(gm);
              kidOpts.forEach((o, i) => o.forEach((g) => okK[i].add(g)));
            }
          }
        const upd = (id: string, ok: Set<G>) => {
          const cur = sets.get(id)!;
          const nxt = cur.filter((g) => ok.has(g));
          if (nxt.length !== cur.length) {
            sets.set(id, nxt);
            changed = true;
            if (nxt.length === 0 && !emptied) {
              emptied = id;
              failFam = fam;
            }
          }
        };
        upd(fam.father, okF);
        upd(fam.mother, okM);
        fam.kids.forEach((k, i) => upd(k, okK[i]));
        if (emptied) break;
      }
      if (!changed) break;
    }
    if (emptied) return { mode, consistent: false, reason: explain(mode, people, byId, fams, L, emptied, failFam), carriers: [], marriedInCarriers: [] };
    const carriers: string[] = [];
    if (mode === 'AR' || mode === 'XR')
      for (const p of people) {
        const s = sets.get(p.id)!;
        if (!p.affected && s.length === 1 && s[0] === 1 && (mode === 'AR' || p.sex === 'F')) carriers.push(p.id);
      }
    const founders = carriers.filter((id) => !hasParents(id));
    const marriedIn = founders.filter((id) => spouseHasParents(id));
    return { mode, consistent: true, reason: '', carriers: carriers.map(L), marriedInCarriers: marriedIn.map(L) };
  });
}

/** A sentence naming the individuals that rule the mode out. Looks for the classic local violations first. */
function explain(mode: Mode, people: Person[], byId: Map<string, Person>, fams: Map<string, Family>, L: (id: string) => string, emptied: string, failFam: Family | null): string {
  const aff = (id: string) => byId.get(id)?.affected ?? null; // null = not in pedigree
  const S = (id: string) => byId.get(id)?.sex;
  const famList = [...fams.values()];
  const parentsTxt = (f: Family) => [f.father, f.mother].filter((id) => byId.has(id)).map(L).join(' and ');
  if (mode === 'Y') {
    const f = people.find((p) => p.sex === 'F' && p.affected);
    if (f) return `${L(f.id)} is an affected female; a Y-linked trait affects only males.`;
  }
  for (const f of famList) {
    const fa = aff(f.father);
    const ma = aff(f.mother);
    for (const k of f.kids) {
      const ka = aff(k)!;
      switch (mode) {
        case 'AD':
          if (ka && fa === false && ma === false) return `${L(k)} is affected but both parents (${parentsTxt(f)}) are unaffected; a dominant allele must come from an affected parent.`;
          break;
        case 'AR':
          if (!ka && fa === true && ma === true) return `${L(f.father)} and ${L(f.mother)} are both affected (aa), so every child must be affected, but ${L(k)} is not.`;
          break;
        case 'XD':
          if (ka && fa === false && ma === false) return `${L(k)} is affected but both parents (${parentsTxt(f)}) are unaffected.`;
          if (S(k) === 'F' && !ka && fa === true) return `${L(k)} is an unaffected daughter of an affected father ${L(f.father)}; he passes his X to every daughter.`;
          if (S(k) === 'M' && ka && ma === false) return `${L(k)} is an affected son of an unaffected mother ${L(f.mother)}; a son's X comes from his mother.`;
          break;
        case 'XR':
          if (S(k) === 'F' && ka && fa === false) return `${L(k)} is an affected daughter of an unaffected father ${L(f.father)}; she would need his X to carry the allele.`;
          if (S(k) === 'M' && !ka && ma === true) return `${L(k)} is an unaffected son of an affected mother ${L(f.mother)}; both her X chromosomes carry the allele.`;
          break;
        case 'Y':
          if (S(k) === 'M' && ka !== (fa ?? ka)) return ka ? `${L(k)} is an affected son of an unaffected father ${L(f.father)}; sons get their Y from their father.` : `${L(k)} is an unaffected son of an affected father ${L(f.father)}; every son inherits his father's Y.`;
          break;
        case 'MT':
          if (ka && ma === false) return `${L(k)} is affected but the mother ${L(f.mother)} is not; mitochondria are inherited from the mother.`;
          if (!ka && ma === true) return `${L(k)} is unaffected but the mother ${L(f.mother)} is affected; all her children inherit her mitochondria.`;
          break;
      }
    }
  }
  if (failFam) return `No assignment of genotypes fits the family of ${parentsTxt(failFam) || 'unknown parents'} and children ${failFam.kids.map(L).join(', ')} (first contradiction at ${L(emptied)}).`;
  return `${L(emptied)} cannot have a genotype that matches the phenotype.`;
}

// ---------- presets ----------

type P = [id: string, sex: 'M' | 'F', affected: 0 | 1, father?: string, mother?: string];
const mk = (rows: P[]): Person[] => rows.map(([id, sex, a, father, mother]) => ({ id, sex, affected: !!a, carrier: false, deceased: false, father, mother }));

export const PRESETS: Record<'ad' | 'ar' | 'xr' | 'xd' | 'y' | 'mito', Person[]> = {
  ad: mk([
    ['g1', 'M', 1], ['g2', 'F', 0],
    ['a', 'M', 1, 'g1', 'g2'], ['as', 'F', 0], ['b', 'F', 0, 'g1', 'g2'], ['c', 'F', 1, 'g1', 'g2'], ['cs', 'M', 0], ['d', 'M', 0, 'g1', 'g2'],
    ['a1', 'M', 1, 'a', 'as'], ['a2', 'F', 0, 'a', 'as'], ['a3', 'F', 1, 'a', 'as'],
    ['c1', 'M', 0, 'cs', 'c'], ['c2', 'F', 1, 'cs', 'c'], ['c3', 'M', 1, 'cs', 'c'],
  ]),
  ar: mk([
    ['g1', 'M', 0], ['g2', 'F', 0],
    ['a', 'M', 0, 'g1', 'g2'], ['as', 'F', 0], ['b', 'F', 1, 'g1', 'g2'], ['c', 'M', 0, 'g1', 'g2'], ['cs', 'F', 0],
    ['a1', 'F', 1, 'a', 'as'], ['a2', 'M', 0, 'a', 'as'], ['a3', 'M', 0, 'a', 'as'],
    ['c1', 'F', 0, 'c', 'cs'], ['c2', 'M', 0, 'c', 'cs'],
  ]),
  xr: mk([
    ['g1', 'M', 1], ['g2', 'F', 0],
    ['a', 'F', 0, 'g1', 'g2'], ['as', 'M', 0], ['b', 'M', 0, 'g1', 'g2'], ['bs', 'F', 0], ['c', 'F', 0, 'g1', 'g2'], ['cs', 'M', 0],
    ['a1', 'M', 1, 'as', 'a'], ['a2', 'F', 0, 'as', 'a'], ['a3', 'M', 0, 'as', 'a'],
    ['b1', 'M', 0, 'b', 'bs'], ['b2', 'F', 0, 'b', 'bs'],
    ['c1', 'M', 1, 'cs', 'c'],
  ]),
  xd: mk([
    ['g1', 'M', 1], ['g2', 'F', 0],
    ['a', 'F', 1, 'g1', 'g2'], ['as', 'M', 0], ['b', 'M', 0, 'g1', 'g2'], ['bs', 'F', 0], ['c', 'F', 1, 'g1', 'g2'], ['cs', 'M', 0],
    ['a1', 'M', 1, 'as', 'a'], ['a2', 'F', 0, 'as', 'a'], ['a3', 'F', 1, 'as', 'a'],
    ['b1', 'F', 0, 'b', 'bs'],
    ['c1', 'M', 0, 'cs', 'c'], ['c2', 'F', 1, 'cs', 'c'],
  ]),
  y: mk([
    ['g1', 'M', 1], ['g2', 'F', 0],
    ['a', 'M', 1, 'g1', 'g2'], ['as', 'F', 0], ['b', 'F', 0, 'g1', 'g2'], ['bs', 'M', 0], ['c', 'M', 1, 'g1', 'g2'], ['cs', 'F', 0],
    ['a1', 'M', 1, 'a', 'as'], ['a2', 'F', 0, 'a', 'as'],
    ['b1', 'M', 0, 'bs', 'b'],
    ['c1', 'M', 1, 'c', 'cs'], ['c2', 'M', 1, 'c', 'cs'], ['c3', 'F', 0, 'c', 'cs'],
  ]),
  mito: mk([
    ['g1', 'M', 0], ['g2', 'F', 1],
    ['a', 'M', 1, 'g1', 'g2'], ['as', 'F', 0], ['b', 'F', 1, 'g1', 'g2'], ['bs', 'M', 0], ['c', 'F', 1, 'g1', 'g2'], ['cs', 'M', 0],
    ['a1', 'F', 0, 'a', 'as'], ['a2', 'M', 0, 'a', 'as'],
    ['b1', 'M', 1, 'bs', 'b'], ['b2', 'F', 1, 'bs', 'b'],
    ['c1', 'F', 1, 'cs', 'c'], ['c2', 'M', 1, 'cs', 'c'],
  ]),
};
