/**
 * Set expressions for the venn widget, parsed into the propositional Formula type of
 * ./discrete-logic (membership in a union is an "or", in an intersection an "and").
 *
 *   union         ∪  |  +  or "union"
 *   intersection  ∩  &  or "intersect"
 *   difference    \  -  −
 *   symmetric     Δ  △  ^  or "xor"
 *   complement    postfix ᶜ or ', or prefix ~ / ¬
 * Precedence: complement, then ∩, then ∪ \ Δ (left to right). Sets are single capital letters.
 */
import { LogicError, type Formula } from './discrete-logic';

type Tok = { t: 'set'; v: string; pos: number } | { t: 'op'; v: 'or' | 'and' | 'minus' | 'xor'; pos: number; src: string } | { t: 'post' | 'pre' | 'lp' | 'rp'; pos: number; src: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    const word = /^[a-z]+/i.exec(src.slice(i))?.[0] ?? '';
    const lw = word.toLowerCase();
    if (lw === 'union' || lw === 'cup') {
      out.push({ t: 'op', v: 'or', pos: i, src: word });
      i += word.length;
    } else if (lw === 'intersect' || lw === 'cap') {
      out.push({ t: 'op', v: 'and', pos: i, src: word });
      i += word.length;
    } else if (lw === 'xor') {
      out.push({ t: 'op', v: 'xor', pos: i, src: word });
      i += word.length;
    } else if (/[A-Z]/.test(c)) {
      out.push({ t: 'set', v: c, pos: i });
      i++;
    } else if ('∪|+'.includes(c)) out.push({ t: 'op', v: 'or', pos: i++, src: c });
    else if ('∩&'.includes(c)) out.push({ t: 'op', v: 'and', pos: i++, src: c });
    else if ('\\-−'.includes(c)) out.push({ t: 'op', v: 'minus', pos: i++, src: c });
    else if ('Δ△^'.includes(c)) out.push({ t: 'op', v: 'xor', pos: i++, src: c });
    else if ("ᶜ'′".includes(c)) out.push({ t: 'post', pos: i++, src: c });
    else if ('~¬'.includes(c)) out.push({ t: 'pre', pos: i++, src: c });
    else if (c === '(') out.push({ t: 'lp', pos: i++, src: c });
    else if (c === ')') out.push({ t: 'rp', pos: i++, src: c });
    else throw new LogicError(`"${c}" is not a set name or operation (sets are capital letters)`, i);
  }
  return out;
}

export function parseSetExpr(src: string, allowed: string[]): Formula {
  if (!src.trim()) throw new LogicError('the expression is empty', 0);
  const toks = tokenize(src);
  let p = 0;
  const desc = (t?: Tok) => (!t ? 'the end' : t.t === 'set' ? `"${t.v}"` : `"${t.src}"`);
  function low(): Formula {
    let a = mid();
    for (;;) {
      const t = toks[p];
      if (!t || t.t !== 'op' || t.v === 'and') return a;
      p++;
      const b = mid();
      a = t.v === 'or' ? { k: 'bin', op: 'or', a, b } : t.v === 'xor' ? { k: 'bin', op: 'xor', a, b } : { k: 'bin', op: 'and', a, b: { k: 'not', a: b } };
    }
  }
  function mid(): Formula {
    let a = unary();
    while (toks[p]?.t === 'op' && (toks[p] as { v: string }).v === 'and') {
      p++;
      a = { k: 'bin', op: 'and', a, b: unary() };
    }
    return a;
  }
  function unary(): Formula {
    if (toks[p]?.t === 'pre') {
      p++;
      return { k: 'not', a: unary() };
    }
    let a = atom();
    while (toks[p]?.t === 'post') {
      p++;
      a = { k: 'not', a };
    }
    return a;
  }
  function atom(): Formula {
    const t = toks[p];
    const prev = toks[p - 1];
    if (!t) throw new LogicError(prev ? `the expression ends after ${desc(prev)}: a set is missing` : 'the expression is empty', src.length);
    p++;
    if (t.t === 'set') {
      if (!allowed.includes(t.v)) throw new LogicError(`there is no set ${t.v} here (use ${allowed.join(', ')})`, t.pos);
      return { k: 'var', name: t.v };
    }
    if (t.t === 'lp') {
      const a = low();
      if (toks[p]?.t !== 'rp') throw new LogicError(toks[p] ? `expected ")" but found ${desc(toks[p])}` : 'a "(" is never closed', toks[p]?.pos ?? src.length);
      p++;
      return a;
    }
    throw new LogicError(prev ? `${desc(t)} right after ${desc(prev)}: a set is missing` : `the expression starts with ${desc(t)}`, t.pos);
  }
  const f = low();
  if (p < toks.length) throw new LogicError(toks[p].t === 'rp' ? 'there is a ")" with no matching "("' : `${desc(toks[p])} follows ${desc(toks[p - 1])} with no operation between them`, toks[p].pos);
  return f;
}

export function tryParseSetExpr(src: string, allowed: string[]): { f: Formula; error?: undefined } | { f?: undefined; error: string } {
  try {
    return { f: parseSetExpr(src, allowed) };
  } catch (e) {
    if (e instanceof LogicError) return { error: `${e.message} (at character ${e.pos + 1})` };
    throw e;
  }
}
