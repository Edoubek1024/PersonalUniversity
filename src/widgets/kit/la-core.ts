/**
 * Linear-algebra numerics for the linear algebra widgets: 2x2 and 3x3 eigenvalues and SVDs, exact
 * fractions (BigInt) and a rounding "field" for row reduction, small dense solves, least squares
 * and a one-sided Jacobi SVD for small images. No React here, so it can be tested with tsx.
 */

export type V2 = [number, number];
export type M2 = [[number, number], [number, number]];

/* ------------------------------------------------------------------ 2x2 ------------------------------------------------------------------ */

export const mul2 = (A: M2, x: V2): V2 => [A[0][0] * x[0] + A[0][1] * x[1], A[1][0] * x[0] + A[1][1] * x[1]];
export const mmul2 = (A: M2, B: M2): M2 => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];
export const det2 = (A: M2) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
export const tr2 = (A: M2) => A[0][0] + A[1][1];
export const transpose2 = (A: M2): M2 => [
  [A[0][0], A[1][0]],
  [A[0][1], A[1][1]],
];
export function inv2(A: M2): M2 | null {
  const d = det2(A);
  if (Math.abs(d) < 1e-12 * (1 + maxAbs2(A) ** 2)) return null;
  return [
    [A[1][1] / d, -A[0][1] / d],
    [-A[1][0] / d, A[0][0] / d],
  ];
}
export const maxAbs2 = (A: M2) => Math.max(Math.abs(A[0][0]), Math.abs(A[0][1]), Math.abs(A[1][0]), Math.abs(A[1][1]));
export const norm2 = (v: V2) => Math.hypot(v[0], v[1]);
export const unit2 = (v: V2): V2 => {
  const n = norm2(v);
  return n === 0 ? [1, 0] : [v[0] / n, v[1] / n];
};
export const dot2 = (a: V2, b: V2) => a[0] * b[0] + a[1] * b[1];
export const cross2 = (a: V2, b: V2) => a[0] * b[1] - a[1] * b[0];
/** Columns of A: A e1 and A e2. */
export const cols2 = (A: M2): [V2, V2] => [
  [A[0][0], A[1][0]],
  [A[0][1], A[1][1]],
];
export const fromCols2 = (a: V2, b: V2): M2 => [
  [a[0], b[0]],
  [a[1], b[1]],
];
export function matPow2(A: M2, k: number): M2 {
  let R: M2 = [
    [1, 0],
    [0, 1],
  ];
  for (let i = 0; i < k; i++) R = mmul2(A, R);
  return R;
}

/** A direction made canonical for display: first component positive (second when the first is 0). */
export function canonicalDir(v: V2): V2 {
  const u = unit2(v);
  const s = Math.abs(u[0]) > 1e-9 ? Math.sign(u[0]) : Math.sign(u[1]) || 1;
  return [u[0] * s, u[1] * s];
}

export type Eig2 =
  | { kind: 'real'; values: [number, number]; vectors: [V2, V2] }
  | { kind: 'repeated'; value: number; vector: V2 } // defective: one eigenline only
  | { kind: 'scalar'; value: number } // A = lambda I: every vector is an eigenvector
  | { kind: 'complex'; re: number; im: number };

/** Eigenvalues and eigenvectors of a real 2x2 matrix. Real eigenvalues are sorted, largest first. */
export function eig2(A: M2): Eig2 {
  const T = tr2(A);
  const D = det2(A);
  const scale = 1 + maxAbs2(A) ** 2;
  const disc = (T * T) / 4 - D;
  const tol = 1e-10 * scale;
  if (disc < -tol) return { kind: 'complex', re: T / 2, im: Math.sqrt(-disc) };
  if (disc <= tol) {
    const l = T / 2;
    const off = Math.max(Math.abs(A[0][0] - l), Math.abs(A[0][1]), Math.abs(A[1][0]), Math.abs(A[1][1] - l));
    if (off < 1e-7 * Math.sqrt(scale)) return { kind: 'scalar', value: l };
    return { kind: 'repeated', value: l, vector: nullVec2(A, l) };
  }
  const r = Math.sqrt(disc);
  const l1 = T / 2 + r;
  const l2 = T / 2 - r;
  return { kind: 'real', values: [l1, l2], vectors: [nullVec2(A, l1), nullVec2(A, l2)] };
}

/** A unit vector in the null space of A - lambda I (assumed singular, not zero). */
function nullVec2(A: M2, l: number): V2 {
  const p: V2 = [A[0][0] - l, A[0][1]];
  const q: V2 = [A[1][0], A[1][1] - l];
  const row = norm2(p) >= norm2(q) ? p : q;
  return canonicalDir([-row[1], row[0]]);
}

/** Symmetric 2x2 eigen-decomposition: values descending, orthonormal vectors. */
export function symEig2(a: number, b: number, d: number): { values: [number, number]; vectors: [V2, V2] } {
  const th = 0.5 * Math.atan2(2 * b, a - d);
  const c = Math.cos(th);
  const s = Math.sin(th);
  const l1 = a * c * c + 2 * b * s * c + d * s * s;
  const l2 = a * s * s - 2 * b * s * c + d * c * c;
  let q1: V2 = [c, s];
  let q2: V2 = [-s, c];
  let L: [number, number] = [l1, l2];
  if (l2 > l1) {
    [q1, q2] = [q2, q1];
    L = [l2, l1];
  }
  return { values: L, vectors: [canonicalDir(q1), canonicalDir(q2)] };
}

/** SVD of a 2x2 matrix: A v_i = s_i u_i, s1 >= s2 >= 0. */
export function svd2(A: M2): { s: [number, number]; u: [V2, V2]; v: [V2, V2] } {
  const AtA = mmul2(transpose2(A), A);
  const { values, vectors } = symEig2(AtA[0][0], AtA[0][1], AtA[1][1]);
  const s1 = Math.sqrt(Math.max(0, values[0]));
  const s2 = Math.sqrt(Math.max(0, values[1]));
  const [v1, v2] = vectors;
  const u1 = s1 > 1e-12 ? unit2(mul2(A, v1)) : ([1, 0] as V2);
  let u2: V2;
  if (s2 > 1e-9 * Math.max(1, s1)) u2 = unit2(mul2(A, v2));
  else u2 = [-u1[1], u1[0]];
  return { s: [s1, s2], u: [u1, u2], v: [v1, v2] };
}

/* ------------------------------------------------------------------ general small matrices ------------------------------------------------------------------ */

export type Mat = number[][];

export const matVec = (A: Mat, x: number[]) => A.map((r) => r.reduce((s, a, j) => s + a * x[j], 0));
export const matMul = (A: Mat, B: Mat): Mat => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
export const transpose = (A: Mat): Mat => A[0].map((_, j) => A.map((r) => r[j]));
export const dot = (a: number[], b: number[]) => a.reduce((s, x, i) => s + x * b[i], 0);
export const norm = (a: number[]) => Math.sqrt(dot(a, a));
export const sub = (a: number[], b: number[]) => a.map((x, i) => x - b[i]);
export const add = (a: number[], b: number[]) => a.map((x, i) => x + b[i]);
export const scale = (a: number[], c: number) => a.map((x) => x * c);
export const cross3 = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Solves the square system A x = b by elimination with partial pivoting; null if singular. */
export function solve(A: Mat, b: number[]): number[] | null {
  const n = A.length;
  const M = A.map((r, i) => [...r, b[i]]);
  const big = Math.max(1e-300, ...A.flat().map(Math.abs));
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-13 * big) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = c + 1; r < n; r++) {
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = M[r][n];
    for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k];
    x[r] = s / M[r][r];
  }
  return x;
}

/** Least squares min |Ax - b| through modified Gram-Schmidt QR; null if the columns are dependent. */
export function lstsq(A: Mat, b: number[]): number[] | null {
  const m = A.length;
  const n = A[0].length;
  const Q: number[][] = transpose(A); // columns, overwritten
  const R: Mat = Array.from({ length: n }, () => new Array(n).fill(0));
  const colScale = Math.max(1e-300, ...Q.map(norm));
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < j; i++) {
      R[i][j] = dot(Q[i], Q[j]);
      for (let k = 0; k < m; k++) Q[j][k] -= R[i][j] * Q[i][k];
    }
    R[j][j] = norm(Q[j]);
    if (R[j][j] < 1e-11 * colScale) return null;
    for (let k = 0; k < m; k++) Q[j][k] /= R[j][j];
  }
  const qb = Q.map((q) => dot(q, b));
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = qb[r];
    for (let k = r + 1; k < n; k++) s -= R[r][k] * x[k];
    x[r] = s / R[r][r];
  }
  return x;
}

/* ------------------------------------------------------------------ 3x3 eigenvalues ------------------------------------------------------------------ */

export interface CNum {
  re: number;
  im: number;
}
export const cabs = (z: CNum) => Math.hypot(z.re, z.im);

/** Roots of a monic cubic x^3 + a x^2 + b x + c, real roots refined by Newton. */
export function cubicRoots(a: number, b: number, c: number): CNum[] {
  const p = b - (a * a) / 3;
  const q = (2 * a * a * a) / 27 - (a * b) / 3 + c;
  const shift = -a / 3;
  const disc = (q * q) / 4 + (p * p * p) / 27;
  const f = (x: number) => ((x + a) * x + b) * x + c;
  const df = (x: number) => (3 * x + 2 * a) * x + b;
  const polish = (x: number) => {
    for (let i = 0; i < 4; i++) {
      const d = df(x);
      if (Math.abs(d) < 1e-14) break;
      x -= f(x) / d;
    }
    return x;
  };
  const tiny = 1e-12 * (1 + Math.abs(p) ** 1.5 + Math.abs(q));
  if (disc > tiny) {
    const sq = Math.sqrt(disc);
    const u = Math.cbrt(-q / 2 + sq);
    const v = Math.cbrt(-q / 2 - sq);
    const x1 = polish(u + v + shift);
    // remaining quadratic x^2 + (a + x1) x + (b + (a + x1) x1)
    const B = a + x1;
    const C = b + B * x1;
    const re = -B / 2;
    const im = Math.sqrt(Math.max(0, C - (B * B) / 4));
    return [{ re: x1, im: 0 }, { re, im }, { re, im: -im }];
  }
  if (Math.abs(p) < 1e-14) {
    const x = shift - Math.cbrt(q);
    return [0, 1, 2].map(() => ({ re: x, im: 0 }));
  }
  const r = 2 * Math.sqrt(-p / 3);
  const arg = Math.max(-1, Math.min(1, ((3 * q) / (p * r)) * 1));
  const phi = Math.acos(arg) / 3;
  return [0, 1, 2].map((k) => ({ re: polish(r * Math.cos(phi - (2 * Math.PI * k) / 3) + shift), im: 0 }));
}

/** Eigenvalues of a 2x2 or 3x3 matrix, sorted by modulus, largest first. */
export function eigenvalues(A: Mat): CNum[] {
  let out: CNum[];
  if (A.length === 2) {
    const e = eig2(A as M2);
    if (e.kind === 'complex') out = [{ re: e.re, im: e.im }, { re: e.re, im: -e.im }];
    else if (e.kind === 'real') out = e.values.map((v) => ({ re: v, im: 0 }));
    else out = [{ re: e.value, im: 0 }, { re: e.value, im: 0 }];
  } else if (A.length === 3) {
    const t = A[0][0] + A[1][1] + A[2][2];
    const c2 = A[0][0] * A[1][1] - A[0][1] * A[1][0] + A[0][0] * A[2][2] - A[0][2] * A[2][0] + A[1][1] * A[2][2] - A[1][2] * A[2][1];
    const d = det3(A);
    out = cubicRoots(-t, c2, -d);
  } else throw new Error('eigenvalues: only 2x2 and 3x3 matrices are supported');
  return out.sort((x, y) => cabs(y) - cabs(x) || y.re - x.re);
}

export const det3 = (A: Mat) =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

/** A null vector of the singular matrix A - lambda I (2x2 or 3x3), unit length, or null. */
export function nullVector(A: Mat, lambda: number): number[] | null {
  const n = A.length;
  const B = A.map((r, i) => r.map((a, j) => a - (i === j ? lambda : 0)));
  if (n === 2) {
    const p = B[0];
    const q = B[1];
    const row = norm(p) >= norm(q) ? p : q;
    if (norm(row) < 1e-14) return [1, 0];
    const v = [-row[1], row[0]];
    return scale(v, 1 / norm(v));
  }
  let best: number[] | null = null;
  let bn = 0;
  for (const [i, j] of [
    [0, 1],
    [0, 2],
    [1, 2],
  ]) {
    const c = cross3(B[i], B[j]);
    const cn = norm(c);
    if (cn > bn) {
      bn = cn;
      best = c;
    }
  }
  if (!best || bn < 1e-13) return null;
  return scale(best, 1 / bn);
}

/* ------------------------------------------------------------------ fields for row reduction ------------------------------------------------------------------ */

/** Arithmetic used by row reduction: exact fractions or rounding to a few significant digits. */
export interface Field<T> {
  zero: T;
  one: T;
  exact: boolean;
  fromNumber(x: number): T;
  parse(s: string): T | null;
  add(a: T, b: T): T;
  sub(a: T, b: T): T;
  mul(a: T, b: T): T;
  div(a: T, b: T): T;
  neg(a: T): T;
  isZero(a: T): boolean;
  eq(a: T, b: T): boolean;
  toNumber(a: T): number;
  tex(a: T): string;
  text(a: T): string;
}

const bgcd = (a: bigint, b: bigint): bigint => {
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;
  while (b) [a, b] = [b, a % b];
  return a;
};

export interface Frac {
  n: bigint;
  d: bigint;
}

export function frac(n: bigint, d: bigint = 1n): Frac {
  if (d === 0n) throw new Error('division by zero');
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = bgcd(n, d) || 1n;
  return { n: n / g, d: d / g };
}

/** The exact value of a number's shortest decimal representation: 0.1 becomes 1/10. */
export function fracFromNumber(x: number): Frac {
  if (!Number.isFinite(x)) throw new Error(`cannot use ${x} as an exact fraction`);
  // A long decimal such as 0.3333333333333333 is most likely a simple fraction typed as 1/3.
  if (String(x).replace(/^-?0\.0*|[-.]|e.*$/g, '').length > 10) {
    let [h0, h1, k0, k1] = [0, 1, 1, 0];
    let r = Math.abs(x);
    for (let it = 0; it < 30; it++) {
      const a = Math.floor(r);
      [h0, h1] = [h1, a * h1 + h0];
      [k0, k1] = [k1, a * k1 + k0];
      if (k1 > 10000) break;
      if (Math.abs(Math.abs(x) - h1 / k1) <= 1e-12 * Math.max(1, Math.abs(x))) return frac(BigInt(x < 0 ? -h1 : h1), BigInt(k1));
      if (r - a < 1e-15) break;
      r = 1 / (r - a);
    }
  }
  const m =/^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/i.exec(String(x));
  if (!m) throw new Error(`cannot read ${x} as a fraction`);
  const digits = (m[2] + (m[3] ?? '')).replace(/^0+(?=\d)/, '');
  const exp = Number(m[4] ?? 0) - (m[3]?.length ?? 0);
  let n = BigInt(digits);
  let d = 1n;
  if (exp >= 0) n *= 10n ** BigInt(exp);
  else d = 10n ** BigInt(-exp);
  return frac(m[1] ? -n : n, d);
}

export function parseFrac(s: string): Frac | null {
  const t = s.trim().replace(/−/g, '-').replace(/\s+/g, '');
  if (!t) return null;
  const m = /^([+-]?[\d.]+(?:e[+-]?\d+)?)(?:\/([+-]?[\d.]+(?:e[+-]?\d+)?))?$/i.exec(t);
  if (!m) return null;
  const a = Number(m[1]);
  const b = m[2] === undefined ? 1 : Number(m[2]);
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) return null;
  const fa = fracFromNumber(a);
  const fb = fracFromNumber(b);
  return frac(fa.n * fb.d, fa.d * fb.n);
}

export const fracField: Field<Frac> = {
  zero: { n: 0n, d: 1n },
  one: { n: 1n, d: 1n },
  exact: true,
  fromNumber: fracFromNumber,
  parse: parseFrac,
  add: (a, b) => frac(a.n * b.d + b.n * a.d, a.d * b.d),
  sub: (a, b) => frac(a.n * b.d - b.n * a.d, a.d * b.d),
  mul: (a, b) => frac(a.n * b.n, a.d * b.d),
  div: (a, b) => frac(a.n * b.d, a.d * b.n),
  neg: (a) => ({ n: -a.n, d: a.d }),
  isZero: (a) => a.n === 0n,
  eq: (a, b) => a.n === b.n && a.d === b.d,
  toNumber: (a) => Number(a.n) / Number(a.d),
  tex: (a) => (a.d === 1n ? a.n.toString() : `${a.n < 0n ? '-' : ''}\\tfrac{${(a.n < 0n ? -a.n : a.n).toString()}}{${a.d.toString()}}`),
  text: (a) => (a.d === 1n ? a.n.toString() : `${a.n.toString()}/${a.d.toString()}`).replace(/^-/, '−'),
};

/** Arithmetic that rounds every result to `digits` significant digits, as on a short calculator. */
export function roundField(digits: number): Field<number> {
  const r = (x: number) => (x === 0 || !Number.isFinite(x) ? x : Number(x.toPrecision(digits)));
  const show = (x: number) => {
    if (x === 0) return '0';
    const ax = Math.abs(x);
    if (ax >= 10 ** digits || ax < 1e-3) {
      const [m, e] = x.toExponential(digits - 1).split('e');
      return `${m}e${Number(e)}`;
    }
    return x.toPrecision(digits);
  };
  return {
    zero: 0,
    one: 1,
    exact: false,
    fromNumber: r,
    parse: (s) => {
      const f = parseFrac(s);
      return f ? r(Number(f.n) / Number(f.d)) : null;
    },
    add: (a, b) => r(a + b),
    sub: (a, b) => r(a - b),
    mul: (a, b) => r(a * b),
    div: (a, b) => r(a / b),
    neg: (a) => -a,
    isZero: (a) => a === 0,
    eq: (a, b) => a === b,
    toNumber: (a) => a,
    tex: (a) => {
      const s = show(a);
      const [m, e] = s.split('e');
      return e === undefined ? m : `${m}\\times10^{${e}}`;
    },
    text: (a) => show(a).replace(/^-/, '−'),
  };
}

/* ------------------------------------------------------------------ SVD for small images ------------------------------------------------------------------ */

/**
 * One-sided Jacobi SVD of an m x n matrix given as rows (m >= n works best). Returns the
 * singular values in descending order with U (m x n, columns) and V (n x n, columns).
 */
export function svdJacobi(rows: number[][]): { s: number[]; U: Float64Array[]; V: Float64Array[] } {
  const m = rows.length;
  const n = rows[0].length;
  const U = Array.from({ length: n }, (_, j) => Float64Array.from(rows, (r) => r[j]));
  const V = Array.from({ length: n }, (_, j) => {
    const v = new Float64Array(n);
    v[j] = 1;
    return v;
  });
  for (let sweep = 0; sweep < 40; sweep++) {
    let off = 0;
    for (let p = 0; p < n - 1; p++) {
      const up = U[p];
      for (let q = p + 1; q < n; q++) {
        const uq = U[q];
        let a = 0;
        let b = 0;
        let g = 0;
        for (let k = 0; k < m; k++) {
          a += up[k] * up[k];
          b += uq[k] * uq[k];
          g += up[k] * uq[k];
        }
        if (Math.abs(g) <= 1e-15 * Math.sqrt(a * b) || g === 0) continue;
        off = Math.max(off, Math.abs(g) / Math.sqrt(a * b));
        const zeta = (b - a) / (2 * g);
        const t = Math.sign(zeta || 1) / (Math.abs(zeta) + Math.sqrt(1 + zeta * zeta));
        const c = 1 / Math.sqrt(1 + t * t);
        const s = c * t;
        for (let k = 0; k < m; k++) {
          const x = up[k];
          const y = uq[k];
          up[k] = c * x - s * y;
          uq[k] = s * x + c * y;
        }
        const vp = V[p];
        const vq = V[q];
        for (let k = 0; k < n; k++) {
          const x = vp[k];
          const y = vq[k];
          vp[k] = c * x - s * y;
          vq[k] = s * x + c * y;
        }
      }
    }
    if (off < 1e-13) break;
  }
  const s = U.map((u) => Math.sqrt(u.reduce((acc, x) => acc + x * x, 0)));
  const order = s.map((_, i) => i).sort((i, j) => s[j] - s[i]);
  return {
    s: order.map((i) => s[i]),
    U: order.map((i) => (s[i] > 0 ? U[i].map((x) => x / s[i]) : U[i])),
    V: order.map((i) => V[i]),
  };
}
