/**
 * The standard genetic code and helpers for gen-central-dogma: strands, reading frames,
 * translation and the classification of a mutation by comparing the old and new proteins.
 */

const BASES = 'TCAG';
// Standard code in TCAG order (first base slowest): one-letter amino acids, * = stop.
const AA1 = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const THREE: Record<string, string> = {
  A: 'Ala', R: 'Arg', N: 'Asn', D: 'Asp', C: 'Cys', Q: 'Gln', E: 'Glu', G: 'Gly', H: 'His', I: 'Ile',
  L: 'Leu', K: 'Lys', M: 'Met', F: 'Phe', P: 'Pro', S: 'Ser', T: 'Thr', W: 'Trp', Y: 'Tyr', V: 'Val', '*': 'Stop',
};

/** One-letter amino acid (or "*") for a DNA or RNA codon. */
export function aa(codon: string): string {
  const c = codon.toUpperCase().replace(/U/g, 'T');
  if (c.length !== 3 || /[^TCAG]/.test(c)) return '?';
  return AA1[BASES.indexOf(c[0]) * 16 + BASES.indexOf(c[1]) * 4 + BASES.indexOf(c[2])];
}
export const three = (a1: string) => THREE[a1] ?? '???';

const COMP: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };
export const complement = (s: string) => s.split('').map((b) => COMP[b]).join('');
export const revcomp = (s: string) => complement(s).split('').reverse().join('');
export const toRna = (s: string) => s.replace(/T/g, 'U');

export function cleanDna(s: string): { seq: string; error?: string } {
  const t = s.replace(/\s+/g, '').toUpperCase();
  const bad = t.match(/[^ACGT]/);
  if (bad) return { seq: '', error: `"${bad[0]}" is not a DNA base; use only A, C, G and T` };
  if (!t.length) return { seq: '', error: 'enter a sequence' };
  return { seq: t };
}

export interface Orf {
  start: number; // index of first base of first codon; -1 when no start codon
  codons: { at: number; codon: string; aa: string }[]; // up to and including the stop codon (if any)
  stopped: boolean;
}

/** Reading frame from the first ATG (startAtAug) or from a fixed frame offset. */
export function readOrf(coding: string, startAtAug: boolean, frame: number): Orf {
  const start = startAtAug ? coding.indexOf('ATG') : frame;
  if (start < 0) return { start: -1, codons: [], stopped: false };
  const codons: Orf['codons'] = [];
  let stopped = false;
  for (let i = start; i + 3 <= coding.length; i += 3) {
    const c = coding.slice(i, i + 3);
    const a = aa(c);
    codons.push({ at: i, codon: c, aa: a });
    if (a === '*') {
      stopped = true;
      break;
    }
  }
  return { start, codons, stopped };
}

/** Protein (one-letter, without the stop). */
export const protein = (o: Orf) => o.codons.filter((c) => c.aa !== '*').map((c) => c.aa).join('');

export interface Classification {
  kind: 'none' | 'utr' | 'silent' | 'missense' | 'nonsense' | 'stop-loss' | 'start-loss' | 'in-frame' | 'frameshift';
  text: string;
}

/**
 * Compare the original and mutated coding strands. `edits` is the number of edit operations so
 * far (0 means unchanged).
 */
export function classify(orig: string, mut: string, startAtAug: boolean, frame: number): Classification {
  if (orig === mut) return { kind: 'none', text: 'No mutation yet. Select a base and change, insert or delete one.' };
  const o0 = readOrf(orig, startAtAug, frame);
  const o1 = readOrf(mut, startAtAug, frame);
  const p0 = protein(o0);
  const p1 = protein(o1);
  if (o0.start < 0) return { kind: 'utr', text: 'The original sequence has no start codon, so there is no protein to change.' };
  // first differing base and the length change
  let i = 0;
  while (i < orig.length && i < mut.length && orig[i] === mut[i]) i++;
  const lenDiff = mut.length - orig.length;
  const orfEnd0 = o0.codons.length ? o0.codons[o0.codons.length - 1].at + 3 : orig.length;
  const expectedStart = i < o0.start ? o0.start + lenDiff : o0.start;
  if (startAtAug && o1.start !== expectedStart && o1.start >= 0 && o1.start < expectedStart) {
    return {
      kind: 'utr',
      text: `The change creates a new AUG at base ${o1.start + 1}, upstream of the original start, so scanning ribosomes now begin there: ${p1.length} residues (${p1.slice(0, 12)}${p1.length > 12 ? '…' : ''}) instead of ${p0}.`,
    };
  }
  if (startAtAug && o1.start !== expectedStart) {
    return {
      kind: 'start-loss',
      text:
        o1.start < 0
          ? 'Start-loss: the AUG start codon is destroyed and there is no other AUG, so no protein is made from this message.'
          : `Start-loss: the original AUG is gone; a ribosome scanning from the 5′ end would start at the next AUG (base ${o1.start + 1}), making ${p1.length ? `${three(p1[0])}…, ${p1.length} amino acids long` : 'no useful protein'} instead of the original ${p0.length}-residue protein.`,
    };
  }
  if (i >= orfEnd0 && o0.stopped) return { kind: 'utr', text: "The change is downstream of the stop codon (3′ untranslated region): the protein is unchanged, although UTR changes can affect mRNA stability or translation." };
  if (startAtAug && i < o0.start && p0 === p1) return { kind: 'utr', text: "The change is upstream of the start codon (5′ untranslated region): the protein is unchanged." };
  if (lenDiff % 3 !== 0) {
    const codonIdx = Math.floor((i - o0.start) / 3);
    const tail = o1.codons.slice(codonIdx).map((c) => three(c.aa)).join('-');
    return {
      kind: 'frameshift',
      text: `Frameshift: ${lenDiff > 0 ? `${lenDiff} base${lenDiff > 1 ? 's' : ''} inserted` : `${-lenDiff} base${lenDiff < -1 ? 's' : ''} deleted`} near base ${i + 1}, so every codon from codon ${codonIdx + 1} is read in a new frame: ${tail || '(no complete codon)'}${o1.stopped ? '' : ' … (no stop before the end of the sequence)'}. The protein is ${p1.length} residues instead of ${p0.length}.`,
    };
  }
  if (lenDiff !== 0) {
    return {
      kind: 'in-frame',
      text: `In-frame ${lenDiff > 0 ? 'insertion' : 'deletion'} of ${Math.abs(lenDiff) / 3} codon${Math.abs(lenDiff) > 3 ? 's' : ''}: the reading frame downstream is kept. Protein ${p0} → ${p1 || '(none)'} (${p1.length} residues instead of ${p0.length}).`,
    };
  }
  if (p0 === p1 && o0.stopped === o1.stopped) return { kind: 'silent', text: `Silent (synonymous): the codon changes but still codes for the same amino acid, because the code is degenerate. Protein unchanged: ${p0}.` };
  // same length, substitutions only: compare codon by codon
  const changes: string[] = [];
  for (let k = 0; k < Math.max(o0.codons.length, o1.codons.length); k++) {
    const a0 = o0.codons[k]?.aa;
    const a1 = o1.codons[k]?.aa;
    if (a0 === undefined || a1 === undefined) break;
    if (a1 === '*' && a0 !== '*') return { kind: 'nonsense', text: `Nonsense: codon ${k + 1} (${three(a0)}, ${toRna(o0.codons[k].codon)}) becomes the stop codon ${toRna(o1.codons[k].codon)}, so the protein ends after ${k} amino acid${k === 1 ? '' : 's'} instead of ${p0.length}.` };
    if (a0 === '*' && a1 !== '*') return { kind: 'stop-loss', text: `Stop-loss: the stop codon ${toRna(o0.codons[k].codon)} becomes ${toRna(o1.codons[k].codon)} (${three(a1)}), so the ribosome reads on into the 3′ UTR: ${p1.length} residues${o1.stopped ? ' before the next stop' : ', with no stop before the end of the sequence'} instead of ${p0.length}.` };
    if (a0 !== a1) changes.push(`${three(a0)}${k + 1}${three(a1)}`);
  }
  if (changes.length) return { kind: 'missense', text: `Missense: ${changes.join(', ')} (one amino acid replaced by another). Whether this matters depends on where it is in the folded protein and how different the side chains are.` };
  return { kind: 'silent', text: `Silent: protein unchanged (${p0}).` };
}
