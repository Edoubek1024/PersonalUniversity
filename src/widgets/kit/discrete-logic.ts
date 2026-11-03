/**
 * Propositional formulas for the discrete-mathematics widgets: a tokenizer and recursive-descent
 * parser with readable errors, evaluation, subformula listing and minimal-parenthesis printing.
 *
 * Accepted syntax (case-insensitive words):
 *   not     ¬  ~  !  -  not
 *   and     ∧  &  &&  /\  ^  *  ·  and
 *   or      ∨  |  ||  \/  +  or
 *   xor     ⊕  xor
 *   implies →  ->  =>  ⇒  ⊃  implies
 *   iff     ↔  <->  <=>  ⇔  ≡  iff
 *   constants  ⊤ T true 1   and   ⊥ F false 0
 *   variables  a letter followed by letters, digits, _ or ' (p, q, P, x1, rain)
 *
 * Precedence, tightest first: ¬, ∧, ∨ and ⊕ (same level, left to right), → (right-associative),
 * ↔ (loosest, left to right). So "P ∧ Q → R" is (P ∧ Q) → R and "P → Q → R" is P → (Q → R).
 */

export type BinOp = 'and' | 'or' | 'xor' | 'imp' | 'iff';
export type Formula =
  | { k: 'var'; name: string }
  | { k: 'const'; v: boolean }
  | { k: 'not'; a: Formula }
  | { k: 'bin'; op: BinOp; a: Formula; b: Formula };

export const SYMBOL: Record<BinOp, string> = { and: '∧', or: '∨', xor: '⊕', imp: '→', iff: '↔' };
/** For texts that write implication as ⇒ and the biconditional as ⇔. */
export const DOUBLE: Record<BinOp, string> = { ...SYMBOL, imp: '⇒', iff: '⇔' };
const PREC: Record<BinOp, number> = { iff: 1, imp: 2, or: 3, xor: 3, and: 4 };

export class LogicError extends Error {
  pos: number;
  constructor(message: string, pos: number) {
    super(message);
    this.pos = pos;
  }
}

type Tok = { t: 'var'; v: string; pos: number } | { t: 'const'; v: boolean; pos: number } | { t: 'not' | 'lp' | 'rp'; pos: number; src: string } | { t: 'op'; v: BinOp; pos: number; src: string };

const WORDS: Record<string, Tok['t'] | BinOp> = { not: 'not', and: 'and', or: 'or', xor: 'xor', implies: 'imp', iff: 'iff' };
// Longest symbols first so "<->" is not read as "<" then "->".
const SYMS: [string, 'not' | 'lp' | 'rp' | BinOp][] = [
  ['<->', 'iff'],
  ['<=>', 'iff'],
  ['->', 'imp'],
  ['=>', 'imp'],
  ['&&', 'and'],
  ['||', 'or'],
  ['/\\', 'and'],
  ['\\/', 'or'],
  ['¬', 'not'],
  ['~', 'not'],
  ['!', 'not'],
  ['-', 'not'],
  ['∧', 'and'],
  ['&', 'and'],
  ['^', 'and'],
  ['*', 'and'],
  ['·', 'and'],
  ['∨', 'or'],
  ['|', 'or'],
  ['+', 'or'],
  ['⊕', 'xor'],
  ['→', 'imp'],
  ['⇒', 'imp'],
  ['⊃', 'imp'],
  ['↔', 'iff'],
  ['⇔', 'iff'],
  ['≡', 'iff'],
  ['(', 'lp'],
  [')', 'rp'],
  ['[', 'lp'],
  [']', 'rp'],
];

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[A-Za-z]/.test(c)) {
      const m = /^[A-Za-z][A-Za-z0-9_']*/.exec(src.slice(i))!;
      const w = m[0];
      const lw = w.toLowerCase();
      if (lw in WORDS) {
        const k = WORDS[lw];
        if (k === 'not') out.push({ t: 'not', pos: i, src: w });
        else out.push({ t: 'op', v: k as BinOp, pos: i, src: w });
      } else if (lw === 'true' || w === 'T') out.push({ t: 'const', v: true, pos: i });
      else if (lw === 'false' || w === 'F') out.push({ t: 'const', v: false, pos: i });
      else out.push({ t: 'var', v: w, pos: i });
      i += w.length;
      continue;
    }
    if (c === '1' || c === '⊤') {
      out.push({ t: 'const', v: true, pos: i });
      i++;
      continue;
    }
    if (c === '0' || c === '⊥') {
      out.push({ t: 'const', v: false, pos: i });
      i++;
      continue;
    }
    const s = SYMS.find(([sym]) => src.startsWith(sym, i));
    if (!s) throw new LogicError(`"${c}" is not a connective or variable`, i);
    const [sym, k] = s;
    if (k === 'not' || k === 'lp' || k === 'rp') out.push({ t: k, pos: i, src: sym });
    else out.push({ t: 'op', v: k, pos: i, src: sym });
    i += sym.length;
  }
  return out;
}

/** Parses a formula. Throws LogicError (with the character position) on bad input. */
export function parseFormula(src: string): Formula {
  if (!src.trim()) throw new LogicError('the formula is empty', 0);
  const toks = tokenize(src);
  let p = 0;
  const end = src.length;
  const describe = (t: Tok | undefined) => (!t ? 'the end' : t.t === 'var' ? `"${t.v}"` : t.t === 'const' ? `"${t.v ? '⊤' : '⊥'}"` : `"${t.src}"`);

  function binary(level: number): Formula {
    if (level > 4) return unary();
    let a = binary(level + 1);
    for (;;) {
      const t = toks[p];
      if (!t || t.t !== 'op' || PREC[t.v] !== level) return a;
      p++;
      if (t.v === 'imp') return { k: 'bin', op: 'imp', a, b: binary(level) }; // right-associative
      a = { k: 'bin', op: t.v, a, b: binary(level + 1) };
    }
  }
  function unary(): Formula {
    const t = toks[p];
    if (t?.t === 'not') {
      p++;
      return { k: 'not', a: unary() };
    }
    return atom();
  }
  function atom(): Formula {
    const t = toks[p];
    const prev = toks[p - 1];
    if (!t) throw new LogicError(prev ? `the formula ends after ${describe(prev)}: something is missing` : 'the formula is empty', end);
    p++;
    if (t.t === 'var') return { k: 'var', name: t.v };
    if (t.t === 'const') return { k: 'const', v: t.v };
    if (t.t === 'lp') {
      const a = binary(1);
      const close = toks[p];
      if (!close || close.t !== 'rp') throw new LogicError(close ? `expected ")" but found ${describe(close)}` : `a "(" is never closed`, close ? close.pos : end);
      p++;
      return a;
    }
    if (t.t === 'rp') throw new LogicError(prev ? `")" right after ${describe(prev)}: a variable is missing` : 'the formula starts with ")"', t.pos);
    throw new LogicError(prev ? `${describe(t)} right after ${describe(prev)}: a variable is missing` : `the formula starts with ${describe(t)}`, t.pos);
  }

  const f = binary(1);
  if (p < toks.length) {
    const t = toks[p];
    const prev = toks[p - 1];
    if (t.t === 'rp') throw new LogicError('there is a ")" with no matching "("', t.pos);
    throw new LogicError(`${describe(t)} follows ${describe(prev)} with no connective between them`, t.pos);
  }
  return f;
}

export function tryParseFormula(src: string): { f: Formula; error?: undefined } | { f?: undefined; error: string } {
  try {
    return { f: parseFormula(src) };
  } catch (e) {
    if (e instanceof LogicError) return { error: `${e.message} (at character ${e.pos + 1})` };
    throw e;
  }
}

const collator = new Intl.Collator('en', { numeric: true });

/** Variables in a formula (or several), sorted naturally: P, Q, R or x1, x2, x10. */
export function variables(...fs: Formula[]): string[] {
  const set = new Set<string>();
  const walk = (f: Formula) => {
    if (f.k === 'var') set.add(f.name);
    else if (f.k === 'not') walk(f.a);
    else if (f.k === 'bin') {
      walk(f.a);
      walk(f.b);
    }
  };
  fs.forEach(walk);
  return [...set].sort(collator.compare);
}

export function evaluate(f: Formula, env: Record<string, boolean>): boolean {
  switch (f.k) {
    case 'var':
      return env[f.name];
    case 'const':
      return f.v;
    case 'not':
      return !evaluate(f.a, env);
    case 'bin': {
      const a = evaluate(f.a, env);
      const b = evaluate(f.b, env);
      switch (f.op) {
        case 'and':
          return a && b;
        case 'or':
          return a || b;
        case 'xor':
          return a !== b;
        case 'imp':
          return !a || b;
        case 'iff':
          return a === b;
      }
    }
  }
}

/**
 * Prints with Unicode connectives. Parentheses are kept wherever a reader might hesitate, not
 * only where the parser needs them: ∧ inside ∨ is bracketed, and so is → inside →.
 */
export function show(f: Formula, sym: Record<BinOp, string> = SYMBOL): string {
  switch (f.k) {
    case 'var':
      return f.name;
    case 'const':
      return f.v ? '⊤' : '⊥';
    case 'not':
      return '¬' + (f.a.k === 'bin' ? `(${show(f.a, sym)})` : show(f.a, sym));
    case 'bin': {
      const pp = PREC[f.op];
      const loose = f.op === 'imp' || f.op === 'iff';
      const side = (c: Formula, right: boolean) => {
        if (c.k !== 'bin') return show(c, sym);
        const cp = PREC[c.op];
        const need = loose ? cp <= pp : c.op !== f.op || right;
        return need ? `(${show(c, sym)})` : show(c, sym);
      };
      return `${side(f.a, false)} ${sym[f.op]} ${side(f.b, true)}`;
    }
  }
}

/** Compound subformulas, children before parents, each once (by printed form). */
export function subformulas(f: Formula): Formula[] {
  const out: Formula[] = [];
  const seen = new Set<string>();
  const walk = (g: Formula) => {
    if (g.k === 'not') walk(g.a);
    if (g.k === 'bin') {
      walk(g.a);
      walk(g.b);
    }
    if (g.k === 'var' || g.k === 'const') return;
    const s = show(g);
    if (!seen.has(s)) {
      seen.add(s);
      out.push(g);
    }
  };
  walk(f);
  return out;
}

/** All 2^n assignments in textbook order: the first variable changes slowest and T comes first. */
export function assignments(vars: string[]): Record<string, boolean>[] {
  const n = vars.length;
  const rows: Record<string, boolean>[] = [];
  for (let r = 0; r < 1 << n; r++) {
    const env: Record<string, boolean> = {};
    vars.forEach((v, i) => (env[v] = ((r >> (n - 1 - i)) & 1) === 0));
    rows.push(env);
  }
  return rows;
}

export type Verdict = 'tautology' | 'contradiction' | 'contingent';
export function classify(values: boolean[]): Verdict {
  if (values.every(Boolean)) return 'tautology';
  if (!values.some(Boolean)) return 'contradiction';
  return 'contingent';
}
