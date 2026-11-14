/**
 * The lac operon logic for gen-lac-operon. A cell has one or two copies of the operon (the
 * chromosome and optionally an F′ plasmid). Repressor made from any lacI copy acts in trans on
 * every operator; each copy's promoter and operator control only the lacZ and lacY next to them
 * (cis). CAP-cAMP raises transcription when glucose is absent.
 */

export type IAllele = 'I+' | 'I-' | 'Is' | 'I-d';
export interface LacCopy {
  I: IAllele;
  P: '+' | '-';
  O: '+' | 'c';
  Z: '+' | '-';
  Y: '+' | '-';
}

export const WILD: LacCopy = { I: 'I+', P: '+', O: '+', Z: '+', Y: '+' };

export function parseLac(s: string, key: string): LacCopy {
  const out: LacCopy = { ...WILD };
  const toks = s.replace(/lac/gi, '').trim().split(/[\s,]+/).filter(Boolean);
  for (const t of toks) {
    const m = t.match(/^([IPOZYipozy])(\+|-d|-|s|c)$/);
    if (!m) throw new Error(`parameter "${key}": cannot read "${t}"; use alleles such as I+, I-, Is, I-d, P+, P-, O+, Oc, Z+, Z-, Y+, Y-`);
    const locus = m[1].toUpperCase() as keyof LacCopy;
    const a = m[2];
    if (locus === 'I') {
      if (a === 'c') throw new Error(`parameter "${key}": "${t}" is not a lacI allele (use I+, I-, Is or I-d)`);
      out.I = (a === '+' ? 'I+' : a === '-' ? 'I-' : a === 's' ? 'Is' : 'I-d') as IAllele;
    } else if (locus === 'O') {
      if (a !== '+' && a !== 'c') throw new Error(`parameter "${key}": "${t}": the operator alleles are O+ and Oc`);
      out.O = a;
    } else {
      if (a !== '+' && a !== '-') throw new Error(`parameter "${key}": "${t}": use ${locus}+ or ${locus}-`);
      (out as unknown as Record<string, string>)[locus] = a;
    }
  }
  return out;
}

export type Level = 'none' | 'basal' | 'low' | 'high';
export const LEVEL_TEXT: Record<Level, string> = { none: 'none', basal: 'basal (trace)', low: 'low (catabolite repression)', high: 'high' };
const rank: Record<Level, number> = { none: 0, basal: 1, low: 2, high: 3 };

export interface CopyState {
  repressorBound: boolean;
  transcribed: boolean;
  level: Level; // transcription level of this copy's Z and Y
  capBound: boolean;
}

export interface CellState {
  activeRepressor: boolean; // a repressor able to bind operators is present
  repressorKinds: string[];
  copies: CopyState[];
  z: Level;
  y: Level;
}

export function evaluate(copies: LacCopy[], inducer: boolean, glucose: boolean): CellState {
  const hasIs = copies.some((c) => c.I === 'Is');
  const hasIplus = copies.some((c) => c.I === 'I+');
  const hasId = copies.some((c) => c.I === 'I-d');
  // I-d subunits poison wild-type tetramers (dominant negative); Is cannot bind inducer at all.
  const inducibleWorks = hasIplus && !hasId;
  const activeRepressor = hasIs || (inducibleWorks && !inducer);
  const capBound = !glucose;
  const states = copies.map((c): CopyState => {
    const repressorBound = c.O === '+' && activeRepressor;
    const transcribed = c.P === '+' && !repressorBound;
    const level: Level = c.P === '-' ? 'none' : repressorBound ? 'basal' : glucose ? 'low' : 'high';
    return { repressorBound, transcribed, level, capBound };
  });
  const prod = (gene: 'Z' | 'Y'): Level => states.reduce<Level>((best, s, i) => (copies[i][gene] === '+' && rank[s.level] > rank[best] ? s.level : best), 'none');
  const kinds: string[] = [];
  if (hasIplus) kinds.push(hasId ? 'wild-type repressor poisoned by I−d subunits' : inducer ? 'wild-type repressor, inactivated by inducer' : 'wild-type repressor');
  if (hasIs) kinds.push('super-repressor (cannot bind inducer)');
  if (!hasIplus && !hasIs) kinds.push(hasId ? 'only non-functional I−d repressor' : 'no functional repressor');
  return { activeRepressor, repressorKinds: kinds, copies: states, z: prod('Z'), y: prod('Y') };
}

export type Regulation = 'inducible' | 'constitutive' | 'uninducible' | 'none';

/** Classic table entry, judged without glucose: compare no inducer with inducer. */
export function regulation(copies: LacCopy[], gene: 'Z' | 'Y'): Regulation {
  const off = evaluate(copies, false, false)[gene === 'Z' ? 'z' : 'y'];
  const on = evaluate(copies, true, false)[gene === 'Z' ? 'z' : 'y'];
  if (on === 'none' && off === 'none') return 'none';
  if (rank[off] >= rank.low) return 'constitutive';
  if (rank[on] >= rank.low) return 'inducible';
  return 'uninducible';
}

/** I⁺, Oᶜ ... for display. */
export function sup(locus: string, a: string): string {
  const s: Record<string, string> = { '+': '⁺', '-': '⁻', s: 'ˢ', c: 'ᶜ', '-d': '⁻ᵈ' };
  return locus + (s[a] ?? a);
}

export function copyText(c: LacCopy): string {
  return [sup('I', c.I.slice(1)), sup('P', c.P), sup('O', c.O), sup('Z', c.Z), sup('Y', c.Y)].join(' ');
}
