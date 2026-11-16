/**
 * Maths for the quantum-algorithm widgets (qc-grover, qc-chsh, qc-shor, qc-error-correction).
 * Pure functions, no React, so they can be checked with `npx tsx`.
 *
 * Conventions used across the course: qubits are numbered from 1 in the error-correction codes
 * (as in Nielsen and Chuang); basis states of an n-qubit register are indexed 0 .. 2^n - 1 with
 * the first qubit as the most significant bit.
 */
import { gcd } from './num';

/* ------------------------------------------------------------------ Grover */

export type GroverOp = 'O' | 'D';

/** Uniform superposition, then the given sequence of oracle (O) and diffusion (D) steps. */
export function groverState(N: number, marked: ReadonlySet<number>, ops: readonly GroverOp[]): number[] {
  let a = new Array<number>(N).fill(1 / Math.sqrt(N));
  for (const op of ops) a = op === 'O' ? a.map((v, i) => (marked.has(i) ? -v : v)) : diffuse(a);
  return a;
}

/** Inversion about the mean: 2|s><s| - I acting on real amplitudes. */
export function diffuse(a: readonly number[]): number[] {
  const m = mean(a);
  return a.map((v) => 2 * m - v);
}

export const mean = (a: readonly number[]) => a.reduce((s, v) => s + v, 0) / a.length;

/** Components of a real state along |w> (normalised marked superposition) and |s'> (unmarked). */
export function groverPlane(a: readonly number[], marked: ReadonlySet<number>): { w: number; s: number } {
  let w = 0;
  let s = 0;
  a.forEach((v, i) => (marked.has(i) ? (w += v) : (s += v)));
  const M = marked.size;
  return { w: w / Math.sqrt(M), s: s / Math.sqrt(a.length - M) };
}

export const groverTheta = (N: number, M: number) => Math.asin(Math.sqrt(M / N));
export const groverOptimal = (theta: number) => Math.max(0, Math.round(Math.PI / (4 * theta) - 0.5));
export const groverP = (theta: number, k: number) => Math.sin((2 * k + 1) * theta) ** 2;

/* ------------------------------------------------------------------ CHSH */

const rad = (d: number) => (d * Math.PI) / 180;

/**
 * Correlation <(-1)^(a xor b)> when Alice and Bob measure |Phi+> in real bases rotated by tA and
 * tB (degrees): P(same) = cos^2(tA - tB), so E = cos 2(tA - tB). Visibility v mixes in white
 * noise (a Werner state), which scales every correlation by v.
 */
export const chshE = (tA: number, tB: number, v = 1) => v * Math.cos(2 * rad(tA - tB));

/** Win probability for questions (x, y): the players win iff a xor b = x and y. */
export const chshWinXY = (E: number, x: number, y: number) => (x & y ? (1 - E) / 2 : (1 + E) / 2);

export interface ChshStats {
  E: number[][];
  win: number[][];
  S: number;
  winAll: number;
}

export function chshStats(angles: readonly number[], v: number): ChshStats {
  const [a0, a1, b0, b1] = angles;
  const A = [a0, a1];
  const B = [b0, b1];
  const E = [0, 1].map((x) => [0, 1].map((y) => chshE(A[x], B[y], v)));
  const win = [0, 1].map((x) => [0, 1].map((y) => chshWinXY(E[x][y], x, y)));
  const S = E[0][0] + E[0][1] + E[1][0] - E[1][1];
  return { E, win, S, winAll: 0.5 + S / 8 };
}

export interface ChshRun {
  rounds: number;
  wins: number;
  /** Empirical correlations per question pair (NaN if the pair never came up). */
  E: number[][];
  n: number[][];
}

/** Plays `rounds` rounds with uniformly random questions, sampling outcomes from the quantum statistics. */
export function chshPlay(angles: readonly number[], v: number, rounds: number, rand: () => number = Math.random): ChshRun {
  const st = chshStats(angles, v);
  const same = [0, 0, 0, 0];
  const n = [0, 0, 0, 0];
  let wins = 0;
  for (let r = 0; r < rounds; r++) {
    const x = rand() < 0.5 ? 0 : 1;
    const y = rand() < 0.5 ? 0 : 1;
    const isSame = rand() < (1 + st.E[x][y]) / 2;
    const k = 2 * x + y;
    n[k]++;
    if (isSame) same[k]++;
    // a xor b = 0 when the outcomes agree.
    if ((isSame ? 0 : 1) === (x & y)) wins++;
  }
  const E = [0, 1].map((x) => [0, 1].map((y) => {
    const k = 2 * x + y;
    return n[k] ? (2 * same[k] - n[k]) / n[k] : NaN;
  }));
  return { rounds, wins, E, n: [[n[0], n[1]], [n[2], n[3]]] };
}

/** Deterministic classical strategy: answers a(0), a(1), b(0), b(1). Returns the fraction of the 4 question pairs won. */
export function chshClassical(a: readonly number[], b: readonly number[]): number {
  let w = 0;
  for (const x of [0, 1]) for (const y of [0, 1]) if ((a[x] ^ b[y]) === (x & y)) w++;
  return w / 4;
}

/* ------------------------------------------------------------------ Shor */

export function modPow(b: number, e: number, m: number): number {
  let r = 1 % m;
  let x = ((b % m) + m) % m;
  let k = e;
  while (k > 0) {
    if (k & 1) r = (r * x) % m;
    x = (x * x) % m;
    k = Math.floor(k / 2);
  }
  return r;
}

/** Multiplicative order of a mod N (a coprime to N). */
export function order(a: number, N: number): number {
  let x = a % N;
  for (let r = 1; r <= N; r++) {
    if (x === 1) return r;
    x = (x * a) % N;
  }
  return NaN;
}

export function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

export function isPrimePower(n: number): boolean {
  for (let p = 2; p <= n; p++) {
    if (n % p !== 0) continue;
    let m = n;
    while (m % p === 0) m /= p;
    return m === 1;
  }
  return false;
}

/** Odd composites in [lo, hi] that are not prime powers: the N for which Shor's reduction applies. */
export function shorNs(lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let n = lo; n <= hi; n++) if (n % 2 === 1 && !isPrime(n) && !isPrimePower(n)) out.push(n);
  return out;
}

/**
 * Exact distribution of the first-register outcome y after modular exponentiation and the
 * (inverse) QFT on q = 2^t: P(y) = sum_z |(1/q) sum_{x : a^x = z} e^{2 pi i x y / q}|^2.
 * The x with a^x mod N = a^x0 are x0, x0 + r, ..., so each inner sum is geometric.
 */
export function shorDistribution(r: number, q: number): Float64Array {
  const P = new Float64Array(q);
  for (let y = 0; y < q; y++) {
    const phi = (Math.PI * r * y) / q; // half the phase step
    const sphi = Math.sin(phi);
    let s = 0;
    for (let x0 = 0; x0 < r; x0++) {
      const m = Math.ceil((q - x0) / r); // number of x < q in this residue class
      let mag2: number;
      if (Math.abs(sphi) < 1e-12) mag2 = m * m;
      else {
        const num = Math.sin(m * phi);
        mag2 = (num * num) / (sphi * sphi);
      }
      s += mag2;
    }
    P[y] = s / (q * q);
  }
  return P;
}

export interface CF {
  terms: number[];
  convergents: [number, number][];
}

/** Continued fraction of y/q (exact, integers) with its convergents p/s. */
export function contFrac(y: number, q: number): CF {
  const terms: number[] = [];
  const convergents: [number, number][] = [];
  let a = y;
  let b = q;
  let [p0, p1] = [0, 1];
  let [s0, s1] = [1, 0];
  while (b !== 0 && terms.length < 40) {
    const t = Math.floor(a / b);
    terms.push(t);
    [p0, p1] = [p1, t * p1 + p0];
    [s0, s1] = [s1, t * s1 + s0];
    convergents.push([p1, s1]);
    [a, b] = [b, a - t * b];
  }
  return { terms, convergents };
}

export interface RecoverResult {
  /** The recovered period, or null. */
  r: number | null;
  /** Convergent denominator it came from, and the multiple used (1 when the denominator itself works). */
  from?: number;
  multiple?: number;
}

/**
 * First convergent denominator s < N with a^s = 1. If none works, small multiples 2s, 3s, 4s of
 * the denominators s >= 2 are tried (y/q may have reduced to j/r with gcd(j, r) > 1).
 */
export const MAX_MULTIPLE = 4;

export function recoverPeriod(cf: CF, a: number, N: number): RecoverResult {
  const dens = cf.convergents.map(([, s]) => s).filter((s) => s > 0 && s < N);
  for (const s of dens) if (modPow(a, s, N) === 1) return { r: s, from: s, multiple: 1 };
  for (const s of dens) {
    if (s < 2) continue;
    for (let m = 2; m <= MAX_MULTIPLE && m * s < N; m++) if (modPow(a, m * s, N) === 1) return { r: m * s, from: s, multiple: m };
  }
  return { r: null };
}

export type FactorOutcome =
  | { ok: true; half: number; f1: number; f2: number }
  | { ok: false; reason: 'odd' | 'minus-one' | 'one'; half?: number };

export function factorFromPeriod(a: number, r: number, N: number): FactorOutcome {
  if (r % 2 === 1) return { ok: false, reason: 'odd' };
  const half = modPow(a, r / 2, N);
  if (half === N - 1) return { ok: false, reason: 'minus-one', half };
  // Only possible when r is a multiple of the true order.
  if (half === 1) return { ok: false, reason: 'one', half };
  return { ok: true, half, f1: gcd(half - 1, N), f2: gcd(half + 1, N) };
}

/* ------------------------------------------------------------------ Error correction */

/** A Pauli operator on n qubits as bit masks: bit j set in x means an X (or Y) on qubit j + 1. */
export interface Pauli {
  x: number;
  z: number;
}

export type CodeId = 'bit-flip' | 'phase-flip' | 'shor9';
export const CODE_IDS: readonly CodeId[] = ['bit-flip', 'phase-flip', 'shor9'];

export interface Code {
  id: CodeId;
  name: string;
  n: number;
  stabilisers: { label: string; p: Pauli }[];
  /** Logical X and Z. */
  XL: Pauli;
  ZL: Pauli;
  XLlabel: string;
  ZLlabel: string;
}

const mask = (qs: number[]) => qs.reduce((m, q) => m | (1 << (q - 1)), 0);
const sub = (qs: number[]) => qs.map((q) => '₀₁₂₃₄₅₆₇₈₉'[q]).join('');
const zs = (qs: number[]) => ({ label: qs.map((q) => `Z${sub([q])}`).join(''), p: { x: 0, z: mask(qs) } });
const xs = (qs: number[]) => ({ label: qs.map((q) => `X${sub([q])}`).join(''), p: { x: mask(qs), z: 0 } });

export const CODES: Record<CodeId, Code> = {
  'bit-flip': {
    id: 'bit-flip',
    name: '3-qubit bit-flip code',
    n: 3,
    stabilisers: [zs([1, 2]), zs([2, 3])],
    XL: { x: mask([1, 2, 3]), z: 0 },
    ZL: { x: 0, z: mask([1]) },
    XLlabel: 'X₁X₂X₃',
    ZLlabel: 'Z₁ (≡ Z₁Z₂Z₃)',
  },
  'phase-flip': {
    id: 'phase-flip',
    name: '3-qubit phase-flip code',
    n: 3,
    stabilisers: [xs([1, 2]), xs([2, 3])],
    XL: { x: 0, z: mask([1, 2, 3]) },
    ZL: { x: mask([1]), z: 0 },
    XLlabel: 'Z₁Z₂Z₃',
    ZLlabel: 'X₁ (≡ X₁X₂X₃)',
  },
  shor9: {
    id: 'shor9',
    name: 'Shor 9-qubit code',
    n: 9,
    stabilisers: [zs([1, 2]), zs([2, 3]), zs([4, 5]), zs([5, 6]), zs([7, 8]), zs([8, 9]), xs([1, 2, 3, 4, 5, 6]), xs([4, 5, 6, 7, 8, 9])],
    XL: { x: 0, z: mask([1, 4, 7]) },
    ZL: { x: mask([1, 2, 3]), z: 0 },
    XLlabel: 'Z₁Z₄Z₇ (≡ Z⊗9)',
    ZLlabel: 'X₁X₂X₃ (≡ X⊗9)',
  },
};

const popc = (v: number) => {
  let c = 0;
  while (v) {
    v &= v - 1;
    c++;
  }
  return c;
};

/** True when the two Paulis anticommute. */
export const anticommutes = (a: Pauli, b: Pauli) => (popc((a.x & b.z) ^ (a.z & b.x)) & 1) === 1;
export const mul = (a: Pauli, b: Pauli): Pauli => ({ x: a.x ^ b.x, z: a.z ^ b.z });
export const weight = (p: Pauli) => popc(p.x | p.z);

/** Syndrome as a bit mask: bit i set when stabiliser i reads -1. */
export function syndrome(code: Code, e: Pauli): number {
  let s = 0;
  code.stabilisers.forEach((st, i) => {
    if (anticommutes(st.p, e)) s |= 1 << i;
  });
  return s;
}

/** Pauli i (0..4^n - 1) as a pattern: two bits per qubit, 0 = I, 1 = X, 2 = Z, 3 = Y. */
function fromIndex(i: number, n: number): Pauli {
  let x = 0;
  let z = 0;
  for (let q = 0; q < n; q++) {
    const d = (i >> (2 * q)) & 3;
    if (d & 1) x |= 1 << q;
    if (d & 2) z |= 1 << q;
  }
  return { x, z };
}

const tables = new Map<CodeId, Map<number, Pauli>>();

/** Minimum-weight decoder: for each syndrome, the lowest-weight Pauli producing it (first found in weight order). */
export function decoderTable(code: Code): Map<number, Pauli> {
  const hit = tables.get(code.id);
  if (hit) return hit;
  const total = 4 ** code.n;
  const byWeight: number[][] = Array.from({ length: code.n + 1 }, () => []);
  for (let i = 0; i < total; i++) byWeight[weight(fromIndex(i, code.n))].push(i);
  const t = new Map<number, Pauli>();
  for (const list of byWeight)
    for (const i of list) {
      const e = fromIndex(i, code.n);
      const s = syndrome(code, e);
      if (!t.has(s)) t.set(s, e);
    }
  tables.set(code.id, t);
  return t;
}

export type Verdict = 'none' | 'corrected' | 'stabiliser' | 'logical-undetected' | 'logical-miscorrected';

export interface DecodeResult {
  syn: number;
  correction: Pauli;
  residual: Pauli;
  /** Logical error left after correction: does the residual act as X_L and/or Z_L? */
  logicalX: boolean;
  logicalZ: boolean;
  verdict: Verdict;
}

export function decode(code: Code, e: Pauli): DecodeResult {
  const syn = syndrome(code, e);
  const correction = decoderTable(code).get(syn) ?? { x: 0, z: 0 };
  const residual = mul(e, correction);
  // Residual acts as X_L if it anticommutes with Z_L, as Z_L if it anticommutes with X_L.
  const logicalX = anticommutes(residual, code.ZL);
  const logicalZ = anticommutes(residual, code.XL);
  const bad = logicalX || logicalZ;
  const verdict: Verdict =
    weight(e) === 0 ? 'none' : bad ? (syn === 0 ? 'logical-undetected' : 'logical-miscorrected') : syn === 0 ? 'stabiliser' : 'corrected';
  return { syn, correction, residual, logicalX, logicalZ, verdict };
}

export type NoiseModel = 'x' | 'z' | 'dep';

/** failures[nx][ny][nz] = number of error patterns with that many X, Y, Z that the decoder fails on. */
const failMemo = new Map<CodeId, { fail: number[][][]; all: number[][][] }>();

export function failureCounts(code: Code) {
  const hit = failMemo.get(code.id);
  if (hit) return hit;
  const n = code.n;
  const mk = () => Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }, () => new Array<number>(n + 1).fill(0)));
  const fail = mk();
  const all = mk();
  const table = decoderTable(code);
  for (let i = 0; i < 4 ** n; i++) {
    const e = fromIndex(i, n);
    const nY = popc(e.x & e.z);
    const nX = popc(e.x) - nY;
    const nZ = popc(e.z) - nY;
    all[nX][nY][nZ]++;
    const r = mul(e, table.get(syndrome(code, e)) ?? { x: 0, z: 0 });
    if (anticommutes(r, code.ZL) || anticommutes(r, code.XL)) fail[nX][nY][nZ]++;
  }
  const out = { fail, all };
  failMemo.set(code.id, out);
  return out;
}

/** Exact logical failure probability for physical error rate p under the model. */
export function logicalErrorRate(code: Code, model: NoiseModel, p: number): number {
  const { fail } = failureCounts(code);
  const n = code.n;
  let P = 0;
  for (let a = 0; a <= n; a++)
    for (let b = 0; a + b <= n; b++)
      for (let c = 0; a + b + c <= n; c++) {
        const f = fail[a][b][c];
        if (!f) continue;
        const w = a + b + c;
        let pr: number;
        if (model === 'x') pr = b === 0 && c === 0 ? p ** a * (1 - p) ** (n - a) : 0;
        else if (model === 'z') pr = a === 0 && b === 0 ? p ** c * (1 - p) ** (n - c) : 0;
        else pr = (p / 3) ** w * (1 - p) ** (n - w);
        P += f * pr;
      }
  return P;
}

/** Failing patterns and all patterns by total weight, for the error types the model allows. */
export function failuresByWeight(code: Code, model: NoiseModel): { w: number; fail: number; total: number }[] {
  const { fail, all } = failureCounts(code);
  const n = code.n;
  const out = Array.from({ length: n + 1 }, (_, w) => ({ w, fail: 0, total: 0 }));
  for (let a = 0; a <= n; a++)
    for (let b = 0; a + b <= n; b++)
      for (let c = 0; a + b + c <= n; c++) {
        const ok = model === 'dep' || (model === 'x' ? b === 0 && c === 0 : a === 0 && b === 0);
        if (!ok) continue;
        out[a + b + c].fail += fail[a][b][c];
        out[a + b + c].total += all[a][b][c];
      }
  return out;
}

/** A random error pattern: each qubit independently gets X (model x), Z (model z) or X/Y/Z with p/3 each. */
export function randomError(n: number, model: NoiseModel, p: number, rand: () => number = Math.random): Pauli {
  let x = 0;
  let z = 0;
  for (let q = 0; q < n; q++) {
    const u = rand();
    if (u >= p) continue;
    const kind = model === 'x' ? 1 : model === 'z' ? 2 : 1 + Math.floor((u / p) * 3); // 1 X, 2 Z, 3 Y
    if (kind === 1 || kind === 3) x |= 1 << q;
    if (kind === 2 || kind === 3) z |= 1 << q;
  }
  return { x, z };
}

/** Physical p in (0, pMax] where the code's logical rate crosses p, scanning upward; null if none. */
export function breakEven(code: Code, model: NoiseModel, pMax: number): number | null {
  const f = (p: number) => logicalErrorRate(code, model, p) - p;
  let prev = f(1e-3);
  const steps = 1000;
  for (let i = 1; i <= steps; i++) {
    const p = 1e-3 + ((pMax - 1e-3) * i) / steps;
    const v = f(p);
    if (Math.abs(v) < 1e-12) return p;
    if (Math.sign(v) !== Math.sign(prev)) {
      let lo = p - (pMax - 1e-3) / steps;
      let hi = p;
      for (let k = 0; k < 50; k++) {
        const mid = (lo + hi) / 2;
        if (Math.sign(f(mid)) === Math.sign(prev)) lo = mid;
        else hi = mid;
      }
      return (lo + hi) / 2;
    }
    prev = v;
  }
  return null;
}

/** A Pauli as text such as "X₂ Z₅ Y₇" ("I" for the identity). */
export function pauliText(p: Pauli, n: number): string {
  const parts: string[] = [];
  for (let q = 0; q < n; q++) {
    const hx = (p.x >> q) & 1;
    const hz = (p.z >> q) & 1;
    if (hx || hz) parts.push(`${hx && hz ? 'Y' : hx ? 'X' : 'Z'}${sub([q + 1])}`);
  }
  return parts.length ? parts.join(' ') : 'I (no correction)';
}
