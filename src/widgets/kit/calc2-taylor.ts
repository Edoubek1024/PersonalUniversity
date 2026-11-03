/**
 * Truncated power-series arithmetic ("Taylor-mode automatic differentiation") over the trees that
 * parseExpr returns. taylorCoeffs(tree, a, vars, n) gives the exact Taylor coefficients
 * c_0 ... c_n of the expression about x = a (up to floating-point rounding), with no finite
 * differences: every operation is done on whole truncated series.
 *
 *   const t = parseExpr('sin(x)/x');
 *   taylorCoeffs(t, 0, [], 6)  // [1, 0, -1/6, 0, 1/120, 0, -1/5040]
 *
 * Variable index 0 is the expansion variable; the other indices take the constant values in
 * `vars` (vars[0] is ignored). Throws NotAnalytic where the expression has no Taylor series at a
 * (|x| at 0, sqrt at 0, a pole, ...).
 */
import type { ExprNode } from './expr';

export class NotAnalytic extends Error {}

type S = Float64Array;

/** Extra orders carried internally so that cancelling a removable zero (sin x / x) stays exact. */
const PAD = 8;

function cnst(c: number, L: number): S {
  const s = new Float64Array(L);
  s[0] = c;
  return s;
}

function isConst(s: S): boolean {
  for (let i = 1; i < s.length; i++) if (s[i] !== 0) return false;
  return true;
}

function add(p: S, q: S, sign = 1): S {
  const r = new Float64Array(p.length);
  for (let i = 0; i < p.length; i++) r[i] = p[i] + sign * q[i];
  return r;
}

function scale(p: S, k: number): S {
  const r = new Float64Array(p.length);
  for (let i = 0; i < p.length; i++) r[i] = p[i] * k;
  return r;
}

function mul(p: S, q: S): S {
  const L = p.length;
  const r = new Float64Array(L);
  for (let n = 0; n < L; n++) {
    let s = 0;
    for (let j = 0; j <= n; j++) s += p[j] * q[n - j];
    r[n] = s;
  }
  return r;
}

function magnitude(s: S): number {
  let m = 0;
  for (let i = 0; i < s.length; i++) m = Math.max(m, Math.abs(s[i]));
  return m;
}

/** Index of the first coefficient that is not (numerically) zero. */
function order(s: S, ref: number): number {
  const tol = 1e-13 * Math.max(1, ref);
  for (let i = 0; i < s.length; i++) if (Math.abs(s[i]) > tol) return i;
  return s.length;
}

function shift(s: S, k: number): S {
  const r = new Float64Array(s.length);
  for (let i = k; i < s.length; i++) r[i - k] = s[i];
  // The top k entries are unknown after a shift; they fall into the padding.
  return r;
}

function div(p: S, q: S): S {
  let num = p;
  let den = q;
  if (!(Math.abs(den[0]) > 1e-13 * Math.max(1, magnitude(den)))) {
    const k = order(den, magnitude(den));
    if (k >= den.length) throw new NotAnalytic('division by zero');
    const kp = order(num, Math.max(magnitude(num), magnitude(den)));
    if (kp < k || k > PAD) throw new NotAnalytic('a pole (division by zero)');
    num = shift(num, k);
    den = shift(den, k);
  }
  const L = num.length;
  const r = new Float64Array(L);
  const d0 = den[0];
  for (let n = 0; n < L; n++) {
    let s = num[n];
    for (let j = 1; j <= n; j++) s -= den[j] * r[n - j];
    r[n] = s / d0;
  }
  return r;
}

function expS(u: S): S {
  const L = u.length;
  const e = new Float64Array(L);
  e[0] = Math.exp(u[0]);
  for (let n = 1; n < L; n++) {
    let s = 0;
    for (let j = 1; j <= n; j++) s += j * u[j] * e[n - j];
    e[n] = s / n;
  }
  return e;
}

function lnS(u: S): S {
  if (!(u[0] > 0)) throw new NotAnalytic(u[0] === 0 || Math.abs(u[0]) < 1e-14 ? 'log of 0' : 'log of a negative number');
  const L = u.length;
  const l = new Float64Array(L);
  l[0] = Math.log(u[0]);
  for (let n = 1; n < L; n++) {
    let s = u[n];
    for (let j = 1; j < n; j++) s -= (j * l[j] * u[n - j]) / n;
    l[n] = s / u[0];
  }
  return l;
}

/** sin and cos (or sinh and cosh when hyp) of a series, together. */
function sinCos(u: S, hyp: boolean): [S, S] {
  const L = u.length;
  const s = new Float64Array(L);
  const c = new Float64Array(L);
  s[0] = hyp ? Math.sinh(u[0]) : Math.sin(u[0]);
  c[0] = hyp ? Math.cosh(u[0]) : Math.cos(u[0]);
  for (let n = 1; n < L; n++) {
    let a = 0;
    let b = 0;
    for (let j = 1; j <= n; j++) {
      a += j * u[j] * c[n - j];
      b += j * u[j] * s[n - j];
    }
    s[n] = a / n;
    c[n] = (hyp ? b : -b) / n;
  }
  return [s, c];
}

/** u^k for a constant real k, with u_0 > 0 (or u_0 != 0 for integer k). */
function powConst(u: S, k: number): S {
  const L = u.length;
  if (Number.isInteger(k) && Math.abs(k) <= 64) {
    if (k === 0) return cnst(1, L);
    let base = u;
    let m = Math.abs(k);
    let r: S | null = null;
    while (m > 0) {
      if (m & 1) r = r ? mul(r, base) : base;
      m >>= 1;
      if (m) base = mul(base, base);
    }
    return k > 0 ? r! : div(cnst(1, L), r!);
  }
  const ref = magnitude(u);
  if (!(Math.abs(u[0]) > 1e-13 * Math.max(1, ref))) {
    // u = t^m (v_0 + ...): u^k is analytic only when m*k is a non-negative integer.
    const m = order(u, ref);
    if (m >= L) throw new NotAnalytic('a power of 0');
    const mk = m * k;
    if (Math.abs(mk - Math.round(mk)) > 1e-9 || mk < 0 || m > PAD) throw new NotAnalytic('a fractional power of 0');
    const v = powConst(shift(u, m), k);
    const r = new Float64Array(L);
    for (let i = 0; i + Math.round(mk) < L; i++) r[i + Math.round(mk)] = v[i];
    return r;
  }
  if (u[0] < 0) throw new NotAnalytic('a fractional power of a negative number');
  const p = new Float64Array(L);
  p[0] = Math.pow(u[0], k);
  for (let n = 1; n < L; n++) {
    let s = 0;
    for (let j = 1; j <= n; j++) s += (k * j - (n - j)) * u[j] * p[n - j];
    p[n] = s / (n * u[0]);
  }
  return p;
}

/** Derivative series (the last coefficient is unknown and set to 0). */
function D(u: S): S {
  const r = new Float64Array(u.length);
  for (let n = 0; n + 1 < u.length; n++) r[n] = (n + 1) * u[n + 1];
  return r;
}

/** Antiderivative series with constant term c0. */
function I(v: S, c0: number): S {
  const r = new Float64Array(v.length);
  r[0] = c0;
  for (let n = 1; n < v.length; n++) r[n] = v[n - 1] / n;
  return r;
}

function locallyConstant(name: string, u0: number, f: (x: number) => number, jump: (x: number) => boolean, L: number): S {
  if (jump(u0)) throw new NotAnalytic(`${name} jumps there`);
  return cnst(f(u0), L);
}

function evalS(n: ExprNode, a: number, vars: number[], L: number): S {
  switch (n.k) {
    case 'num':
      return cnst(n.v, L);
    case 'var': {
      if (n.i === 0) {
        const s = cnst(a, L);
        if (L > 1) s[1] = 1;
        return s;
      }
      return cnst(vars[n.i], L);
    }
    case 'neg':
      return scale(evalS(n.a, a, vars, L), -1);
    case 'bin': {
      const p = evalS(n.a, a, vars, L);
      const q = evalS(n.b, a, vars, L);
      switch (n.op) {
        case '+':
          return add(p, q);
        case '-':
          return add(p, q, -1);
        case '*':
          return mul(p, q);
        case '/':
          return div(p, q);
        case '^':
          return pow(p, q);
      }
      break;
    }
    case 'call':
      return call(n.name, n.args.map((g) => evalS(g, a, vars, L)), L);
  }
  throw new Error('unreachable');
}

function pow(p: S, q: S): S {
  if (isConst(q)) return powConst(p, q[0]);
  return expS(mul(q, lnS(p)));
}

function call(name: string, args: S[], L: number): S {
  const [u, w] = args;
  const u0 = u[0];
  switch (name) {
    case 'sin':
      return sinCos(u, false)[0];
    case 'cos':
      return sinCos(u, false)[1];
    case 'tan': {
      const [s, c] = sinCos(u, false);
      return div(s, c);
    }
    case 'sec':
      return div(cnst(1, L), sinCos(u, false)[1]);
    case 'csc':
      return div(cnst(1, L), sinCos(u, false)[0]);
    case 'cot': {
      const [s, c] = sinCos(u, false);
      return div(c, s);
    }
    case 'sinh':
      return sinCos(u, true)[0];
    case 'cosh':
      return sinCos(u, true)[1];
    case 'tanh': {
      const [s, c] = sinCos(u, true);
      return div(s, c);
    }
    case 'exp':
      return expS(u);
    case 'ln':
    case 'log':
      return lnS(u);
    case 'log10':
      return scale(lnS(u), 1 / Math.LN10);
    case 'log2':
      return scale(lnS(u), 1 / Math.LN2);
    case 'sqrt':
      return powConst(u, 0.5);
    case 'cbrt': {
      if (u0 < 0) return scale(powConst(scale(u, -1), 1 / 3), -1);
      return powConst(u, 1 / 3);
    }
    case 'atan':
    case 'arctan':
      return I(div(D(u), add(cnst(1, L), mul(u, u))), Math.atan(u0));
    case 'asin':
    case 'arcsin': {
      if (!(Math.abs(u0) < 1)) throw new NotAnalytic('arcsin is not analytic at ±1');
      return I(div(D(u), powConst(add(cnst(1, L), mul(u, u), -1), 0.5)), Math.asin(u0));
    }
    case 'acos':
    case 'arccos': {
      if (!(Math.abs(u0) < 1)) throw new NotAnalytic('arccos is not analytic at ±1');
      return I(scale(div(D(u), powConst(add(cnst(1, L), mul(u, u), -1), 0.5)), -1), Math.acos(u0));
    }
    case 'atan2': {
      // atan2(y, x): derivative (x y' - y x') / (x^2 + y^2).
      const y = u;
      const x = w;
      if (y[0] === 0 && x[0] === 0) throw new NotAnalytic('atan2 at the origin');
      if (y[0] === 0 && x[0] < 0) throw new NotAnalytic('atan2 jumps on the negative x-axis');
      return I(div(add(mul(x, D(y)), mul(y, D(x)), -1), add(mul(x, x), mul(y, y))), Math.atan2(y[0], x[0]));
    }
    case 'abs':
      if (Math.abs(u0) < 1e-14) throw new NotAnalytic('|x| has a corner at 0');
      return u0 > 0 ? u : scale(u, -1);
    case 'floor':
      return locallyConstant('floor', u0, Math.floor, Number.isInteger, L);
    case 'ceil':
      return locallyConstant('ceil', u0, Math.ceil, Number.isInteger, L);
    case 'round':
      return locallyConstant('round', u0, Math.round, (x) => Number.isInteger(x - 0.5), L);
    case 'sign':
      return locallyConstant('sign', u0, Math.sign, (x) => x === 0, L);
    case 'min':
    case 'max': {
      if (u0 === w[0]) throw new NotAnalytic(`${name} has a corner there`);
      return (name === 'min') === u0 < w[0] ? u : w;
    }
    case 'pow':
      return pow(u, w);
    case 'mod': {
      const q = u0 / w[0];
      if (Number.isInteger(q)) throw new NotAnalytic('mod jumps there');
      return add(u, scale(w, Math.floor(q)), -1);
    }
  }
  throw new NotAnalytic(`no series rule for ${name}`);
}

/**
 * Taylor coefficients c_0 ... c_n of the expression about x = a: c_k = f^(k)(a) / k!.
 * Throws NotAnalytic when there is no Taylor series at a.
 */
export function taylorCoeffs(tree: ExprNode, a: number, vars: number[], n: number): number[] {
  const s = evalS(tree, a, vars, n + 1 + PAD);
  const out = Array.from(s.subarray(0, n + 1));
  if (!out.every(Number.isFinite)) throw new NotAnalytic('the derivatives are not finite there');
  return out;
}

/** Like taylorCoeffs but returns null instead of throwing. */
export function tryTaylor(tree: ExprNode, a: number, vars: number[], n: number): number[] | null {
  try {
    return taylorCoeffs(tree, a, vars, n);
  } catch (e) {
    if (e instanceof NotAnalytic) return null;
    throw e;
  }
}

/** Value and first derivative at x, exactly (no differencing). NaN where not differentiable. */
export function valueAndSlope(tree: ExprNode, x: number, vars: number[]): [number, number] {
  try {
    const s = evalS(tree, x, vars, 2 + PAD);
    return [s[0], s[1]];
  } catch (e) {
    if (e instanceof NotAnalytic) return [NaN, NaN];
    throw e;
  }
}

/** The polynomial sum c_k (x - a)^k, by Horner's rule. */
export function evalPoly(c: readonly number[], a: number, x: number, upTo = c.length - 1): number {
  const t = x - a;
  let s = 0;
  for (let k = upTo; k >= 0; k--) s = s * t + c[k];
  return s;
}
