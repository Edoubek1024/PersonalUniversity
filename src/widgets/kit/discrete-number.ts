/**
 * Exact integer helpers (BigInt) for the number-theory widgets: the extended Euclidean table,
 * square-and-multiply traces, modular inverses and small primality tests.
 */

/** Parses a non-negative integer typed by the learner; returns an error message instead of throwing. */
export function parseNat(s: string, name: string, maxDigits = 30): { v: bigint; error?: undefined } | { v?: undefined; error: string } {
  const t = s.trim().replace(/[\s_,]/g, '');
  if (!t) return { error: `${name} is empty` };
  if (!/^\d+$/.test(t)) return { error: `${name} should be a whole number ≥ 0` };
  if (t.length > maxDigits) return { error: `${name} is too long (at most ${maxDigits} digits here)` };
  return { v: BigInt(t) };
}

export const babs = (x: bigint) => (x < 0n ? -x : x);
/** Floor-convention remainder in [0, n). */
export const bmod = (a: bigint, n: bigint) => ((a % n) + n) % n;
export const show = (x: bigint) => (x < 0n ? '−' + (-x).toString() : x.toString());

export interface EuclidRow {
  i: number;
  r: bigint;
  s: bigint;
  t: bigint;
  /** Quotient floor(r_{i-1} / r_i) used to make the next row; undefined on the last row. */
  q?: bigint;
}

/**
 * Extended Euclid as a table: r_0 = a, r_1 = b, r_{i+1} = r_{i-1} − q_i r_i, with s, t carried so
 * that r_i = s_i a + t_i b on every row. The last row has r = 0; the row before holds the gcd.
 */
export function euclidTable(a: bigint, b: bigint): EuclidRow[] {
  const rows: EuclidRow[] = [
    { i: 0, r: a, s: 1n, t: 0n },
    { i: 1, r: b, s: 0n, t: 1n },
  ];
  while (rows[rows.length - 1].r !== 0n) {
    const cur = rows[rows.length - 1];
    const prev = rows[rows.length - 2];
    const q = prev.r / cur.r;
    cur.q = q;
    rows.push({ i: cur.i + 1, r: prev.r - q * cur.r, s: prev.s - q * cur.s, t: prev.t - q * cur.t });
  }
  return rows;
}

export function egcd(a: bigint, b: bigint): { g: bigint; x: bigint; y: bigint } {
  const rows = euclidTable(a, b);
  const last = rows.length >= 2 ? rows[rows.length - 2] : rows[0];
  return { g: last.r, x: last.s, y: last.t };
}

export function modinv(a: bigint, n: bigint): bigint | null {
  const { g, x } = egcd(bmod(a, n), n);
  return g === 1n ? bmod(x, n) : null;
}

export interface PowRow {
  i: number;
  bit: number;
  /** a^(2^i) mod n */
  sq: bigint;
  /** Result after this bit. */
  acc: bigint;
}

/** Right-to-left square-and-multiply: one row per bit of k, least significant first. */
export function powTable(a: bigint, k: bigint, n: bigint): { rows: PowRow[]; result: bigint; squarings: number; multiplies: number } {
  const rows: PowRow[] = [];
  let sq = bmod(a, n);
  let acc = bmod(1n, n);
  let squarings = 0;
  let multiplies = 0;
  let i = 0;
  let kk = k;
  let started = false;
  if (k === 0n) return { rows, result: acc, squarings, multiplies };
  while (kk > 0n) {
    if (i > 0) {
      sq = (sq * sq) % n;
      squarings++;
    }
    const bit = Number(kk & 1n);
    if (bit) {
      // The first multiply is by 1 and costs nothing; count only real ones.
      if (started) multiplies++;
      started = true;
      acc = (acc * sq) % n;
    }
    rows.push({ i, bit, sq, acc });
    kk >>= 1n;
    i++;
  }
  return { rows, result: acc, squarings, multiplies };
}

export function modpow(a: bigint, k: bigint, n: bigint): bigint {
  if (n === 1n) return 0n;
  let r = 1n;
  let b = bmod(a, n);
  let e = k;
  while (e > 0n) {
    if (e & 1n) r = (r * b) % n;
    b = (b * b) % n;
    e >>= 1n;
  }
  return r;
}

export function gcdBig(a: bigint, b: bigint): bigint {
  a = babs(a);
  b = babs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

/** Trial division; fine below about 10^12. */
export function isPrime(n: bigint): boolean {
  if (n < 2n) return false;
  if (n < 4n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;
  for (let d = 5n; d * d <= n; d += 6n) if (n % d === 0n || n % (d + 2n) === 0n) return false;
  return true;
}

/** Smallest prime factor by trial division, with the number of divisions tried. */
export function smallestFactor(n: bigint): { p: bigint; tries: number } {
  let tries = 0;
  if (n % 2n === 0n) return { p: 2n, tries: 1 };
  tries = 1;
  for (let d = 3n; d * d <= n; d += 2n) {
    tries++;
    if (n % d === 0n) return { p: d, tries };
  }
  return { p: n, tries };
}

export function phi(n: number): number {
  let r = n;
  let m = n;
  for (let p = 2; p * p <= m; p++)
    if (m % p === 0) {
      while (m % p === 0) m /= p;
      r -= r / p;
    }
  if (m > 1) r -= r / m;
  return r;
}
