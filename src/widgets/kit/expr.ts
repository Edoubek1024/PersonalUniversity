/**
 * A small, safe compiler for the maths expressions widgets accept as parameters, such as
 * "a*sin(b*x) + c" or "e^(-x^2/2)". No eval: the source is parsed to a tree and turned into
 * closures.
 *
 * Supported: numbers (1, 2.5, 1e-3), + - * / ^ (right-associative, and -x^2 means -(x^2)),
 * parentheses, |x| for absolute value, implicit multiplication after a number or closing
 * parenthesis (2x, 3sin(x), (x+1)(x-1)), the constants pi and e, and the functions below.
 * log is the natural logarithm, as in most maths texts; log10 and log2 are explicit.
 * Multi-letter names are single identifiers, so write x*y, not xy.
 */

/**
 * The parsed tree, exported for widgets that need more than evaluation (exact Taylor
 * coefficients, say). `var.i` indexes the names passed to parseExpr; `call.name` is the function
 * name as written (asin and arcsin both appear as written).
 */
export type ExprNode =
  | { k: 'num'; v: number }
  | { k: 'var'; i: number }
  | { k: 'neg'; a: ExprNode }
  | { k: 'bin'; op: '+' | '-' | '*' | '/' | '^'; a: ExprNode; b: ExprNode }
  | { k: 'call'; name: string; f: (...a: number[]) => number; args: ExprNode[] };
type Node = ExprNode;

const FUNCS: Record<string, [arity: number, f: (...a: number[]) => number]> = {
  sin: [1, Math.sin],
  cos: [1, Math.cos],
  tan: [1, Math.tan],
  sec: [1, (x) => 1 / Math.cos(x)],
  csc: [1, (x) => 1 / Math.sin(x)],
  cot: [1, (x) => 1 / Math.tan(x)],
  asin: [1, Math.asin],
  acos: [1, Math.acos],
  atan: [1, Math.atan],
  arcsin: [1, Math.asin],
  arccos: [1, Math.acos],
  arctan: [1, Math.atan],
  sinh: [1, Math.sinh],
  cosh: [1, Math.cosh],
  tanh: [1, Math.tanh],
  exp: [1, Math.exp],
  ln: [1, Math.log],
  log: [1, Math.log],
  log10: [1, Math.log10],
  log2: [1, Math.log2],
  sqrt: [1, Math.sqrt],
  cbrt: [1, Math.cbrt],
  abs: [1, Math.abs],
  floor: [1, Math.floor],
  ceil: [1, Math.ceil],
  round: [1, Math.round],
  sign: [1, Math.sign],
  min: [2, Math.min],
  max: [2, Math.max],
  atan2: [2, Math.atan2],
  pow: [2, Math.pow],
  mod: [2, (a, b) => a - b * Math.floor(a / b)],
};
const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E, tau: 2 * Math.PI };

type Tok = { t: 'num'; v: number } | { t: 'id'; v: string } | { t: 'op'; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
    } else if (/[0-9.]/.test(c)) {
      const m = /^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(src.slice(i));
      if (!m) throw new Error(`bad number at "${src.slice(i, i + 6)}"`);
      out.push({ t: 'num', v: parseFloat(m[0]) });
      i += m[0].length;
    } else if (/[A-Za-z_]/.test(c)) {
      const m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i))!;
      out.push({ t: 'id', v: m[0] });
      i += m[0].length;
    } else if ('+-*/^(),|'.includes(c)) {
      out.push({ t: 'op', v: c });
      i++;
    } else if (c === '·' || c === '×') {
      out.push({ t: 'op', v: '*' });
      i++;
    } else if (c === '−') {
      out.push({ t: 'op', v: '-' });
      i++;
    } else if (c === 'π') {
      out.push({ t: 'id', v: 'pi' });
      i++;
    } else {
      throw new Error(`unexpected "${c}"`);
    }
  }
  return out;
}

/** Parses `src` to a tree over the named variables. Throws an Error with a readable message. */
export function parseExpr(src: string, names: readonly string[] = ['x']): ExprNode {
  return parse(src, names);
}

function parse(src: string, names: readonly string[]): Node {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => peek()?.t === 'op' && peek().v === v;
  const expect = (v: string) => {
    if (!isOp(v)) throw new Error(`expected "${v}"`);
    p++;
  };

  function sum(): Node {
    let a = product();
    while (isOp('+') || isOp('-')) {
      const op = toks[p++].v as '+' | '-';
      a = { k: 'bin', op, a, b: product() };
    }
    return a;
  }
  function startsAtom() {
    const t = peek();
    return !!t && (t.t === 'num' || t.t === 'id' || (t.t === 'op' && t.v === '('));
  }
  function product(): Node {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) {
        const op = toks[p++].v as '*' | '/';
        a = { k: 'bin', op, a, b: unary() };
      } else if (startsAtom()) {
        a = { k: 'bin', op: '*', a, b: power() };
      } else {
        return a;
      }
    }
  }
  function unary(): Node {
    if (isOp('-')) {
      p++;
      return { k: 'neg', a: unary() };
    }
    if (isOp('+')) {
      p++;
      return unary();
    }
    return power();
  }
  function power(): Node {
    const a = atom();
    if (isOp('^')) {
      p++;
      return { k: 'bin', op: '^', a, b: unary() };
    }
    return a;
  }
  function atom(): Node {
    const t = toks[p++];
    if (!t) throw new Error('unexpected end');
    if (t.t === 'num') return { k: 'num', v: t.v };
    if (t.t === 'id') {
      const vi = names.indexOf(t.v);
      if (vi !== -1) return { k: 'var', i: vi };
      if (t.v in FUNCS) {
        const [arity, f] = FUNCS[t.v];
        expect('(');
        const args = [sum()];
        while (isOp(',')) {
          p++;
          args.push(sum());
        }
        expect(')');
        if (args.length !== arity) throw new Error(`${t.v} takes ${arity} argument${arity > 1 ? 's' : ''}`);
        return { k: 'call', name: t.v, f, args };
      }
      if (t.v in CONSTS) return { k: 'num', v: CONSTS[t.v] };
      throw new Error(`unknown name "${t.v}"${t.v.length > 1 ? ' (write x*y for a product)' : ''}`);
    }
    if (t.v === '(') {
      const a = sum();
      expect(')');
      return a;
    }
    if (t.v === '|') {
      const a = sum();
      expect('|');
      return { k: 'call', name: 'abs', f: Math.abs, args: [a] };
    }
    throw new Error(`unexpected "${t.v}"`);
  }

  const tree = sum();
  if (p < toks.length) throw new Error(`unexpected "${toks[p].v}"`);
  return tree;
}

/**
 * x^y as a maths text means it: a negative base with a fractional exponent whose denominator is
 * odd (2/3, 1/5, ...) has a real value, so x^(2/3) is defined for x < 0. Math.pow returns NaN.
 */
function realPow(x: number, y: number): number {
  if (x >= 0 || Number.isInteger(y)) return Math.pow(x, y);
  for (let q = 3; q <= 15; q += 2) {
    const p = Math.round(y * q);
    if (Math.abs(y * q - p) < 1e-9) return (p % 2 === 0 ? 1 : -1) * Math.pow(-x, y);
  }
  return NaN;
}

function build(n: Node): (v: number[]) => number {
  switch (n.k) {
    case 'num': {
      const c = n.v;
      return () => c;
    }
    case 'var': {
      const i = n.i;
      return (v) => v[i];
    }
    case 'neg': {
      const a = build(n.a);
      return (v) => -a(v);
    }
    case 'call': {
      const f = n.f;
      const args = n.args.map(build);
      if (args.length === 1) {
        const a = args[0];
        return (v) => f(a(v));
      }
      return (v) => f(...args.map((g) => g(v)));
    }
    case 'bin': {
      const a = build(n.a);
      const b = build(n.b);
      switch (n.op) {
        case '+':
          return (v) => a(v) + b(v);
        case '-':
          return (v) => a(v) - b(v);
        case '*':
          return (v) => a(v) * b(v);
        case '/':
          return (v) => a(v) / b(v);
        case '^':
          return (v) => realPow(a(v), b(v));
      }
    }
  }
}

export type CompiledFn = (...values: number[]) => number;

/**
 * Compiles `src` into a function of the named variables, in order:
 * `compile('a*x^2', ['x', 'a'])(2, 3) === 12`. Throws an Error with a readable message.
 */
export function compile(src: string, names: readonly string[] = ['x']): CompiledFn {
  const f = build(parse(src, names));
  return (...values: number[]) => f(values);
}

/** Like compile, but returns the error message instead of throwing. */
export function tryCompile(src: string, names: readonly string[] = ['x']): { fn: CompiledFn; error?: undefined } | { fn?: undefined; error: string } {
  try {
    return { fn: compile(src, names) };
  } catch (e) {
    return { error: `${(e as Error).message} in "${src}"` };
  }
}
