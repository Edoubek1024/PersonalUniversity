/**
 * Exact bit-level arithmetic for the computer-architecture widgets: fixed-width integers held as
 * unsigned BigInts, IEEE 754 binary16/32/64 encode and decode with correct rounding from decimal
 * (no double rounding: decimal text is parsed to an exact rational first), and exact decimal
 * expansions of binary fractions.
 */

export const mask = (n: number): bigint => (1n << BigInt(n)) - 1n;

/** Reduce any integer to its n-bit unsigned pattern (mod 2^n). */
export const wrap = (v: bigint, n: number): bigint => ((v % (1n << BigInt(n))) + (1n << BigInt(n))) % (1n << BigInt(n));

/** Two's-complement reading of an n-bit pattern. */
export const toSigned = (v: bigint, n: number): bigint => (v >> BigInt(n - 1)) & 1n ? v - (1n << BigInt(n)) : v;

export const bit = (v: bigint, i: number): number => Number((v >> BigInt(i)) & 1n);

/** Binary digits, most significant first, with a space every `group` bits (0 = no spaces). */
export function bin(v: bigint, n: number, group = 4): string {
  const s = v.toString(2).padStart(n, '0').slice(-n);
  if (!group) return s;
  let out = '';
  for (let i = 0; i < n; i++) {
    if (i && (n - i) % group === 0) out += ' ';
    out += s[i];
  }
  return out;
}

export function hex(v: bigint, n: number): string {
  return '0x' + v.toString(16).toUpperCase().padStart(Math.ceil(n / 4), '0');
}

/** Decimal with a true minus sign. */
export const dec = (v: bigint | number): string => String(v).replace(/^-/, '−');

/**
 * Parses an integer literal: decimal (optionally negative), 0x hex or 0b binary. Spaces and
 * underscores are ignored. Returns null when the text is not an integer.
 */
export function parseIntLiteral(text: string): bigint | null {
  const s = text.replace(/[\s_]/g, '').replace(/^−/, '-');
  if (!s) return null;
  const neg = s.startsWith('-');
  const body = neg || s.startsWith('+') ? s.slice(1) : s;
  let v: bigint;
  if (/^0x[0-9a-f]+$/i.test(body)) v = BigInt(body);
  else if (/^0b[01]+$/i.test(body)) v = BigInt(body);
  else if (/^\d+$/.test(body)) v = BigInt(body);
  else return null;
  return neg ? -v : v;
}

// ---------------------------------------------------------------- floating point

export interface FloatFormat {
  name: 'binary16' | 'binary32' | 'binary64';
  bits: number;
  expBits: number;
  fracBits: number;
  bias: number;
}

export const FORMATS: Record<FloatFormat['name'], FloatFormat> = {
  binary16: { name: 'binary16', bits: 16, expBits: 5, fracBits: 10, bias: 15 },
  binary32: { name: 'binary32', bits: 32, expBits: 8, fracBits: 23, bias: 127 },
  binary64: { name: 'binary64', bits: 64, expBits: 11, fracBits: 52, bias: 1023 },
};

export type FloatClass = 'zero' | 'subnormal' | 'normal' | 'infinity' | 'nan';

export interface Decoded {
  s: number;
  /** Biased exponent field and fraction field as integers. */
  E: number;
  F: bigint;
  cls: FloatClass;
  /** For finite values: |value| = mant * 2^exp2 exactly. */
  mant: bigint;
  exp2: number;
}

export function decodeFloat(bits: bigint, f: FloatFormat): Decoded {
  const s = Number((bits >> BigInt(f.bits - 1)) & 1n);
  const E = Number((bits >> BigInt(f.fracBits)) & mask(f.expBits));
  const F = bits & mask(f.fracBits);
  const emax = (1 << f.expBits) - 1;
  const emin = 1 - f.bias;
  if (E === emax) return { s, E, F, cls: F === 0n ? 'infinity' : 'nan', mant: 0n, exp2: 0 };
  if (E === 0) return { s, E, F, cls: F === 0n ? 'zero' : 'subnormal', mant: F, exp2: emin - f.fracBits };
  return { s, E, F, cls: 'normal', mant: F | (1n << BigInt(f.fracBits)), exp2: E - f.bias - f.fracBits };
}

/** Exact decimal expansion of mant * 2^exp2 (mant >= 0). */
export function exactDecimal(mant: bigint, exp2: number): string {
  if (mant === 0n) return '0';
  if (exp2 >= 0) return (mant << BigInt(exp2)).toString();
  // mant / 2^k = mant * 5^k / 10^k
  const k = -exp2;
  return scaledToDecimal(mant * 5n ** BigInt(k), k);
}

/** The decimal string of v / 10^d (v may be negative), trailing zeros trimmed. */
export function scaledToDecimal(v: bigint, d: number): string {
  const neg = v < 0n;
  let s = (neg ? -v : v).toString();
  if (d > 0) {
    s = s.padStart(d + 1, '0');
    s = `${s.slice(0, s.length - d)}.${s.slice(s.length - d)}`.replace(/0+$/, '').replace(/\.$/, '');
  }
  return (neg ? '−' : '') + s;
}

/** An exact rational, or a special value, parsed from text. */
export type Parsed = { kind: 'num'; neg: boolean; num: bigint; den: bigint } | { kind: 'inf'; neg: boolean } | { kind: 'nan' };

/**
 * Parses "0.1", "-1.5e-3", "6.5", "2^-130", "1/3", "inf", "-infinity", "nan". Returns null on
 * anything else.
 */
export function parseReal(text: string): Parsed | null {
  let s = text.trim().replace(/−/g, '-').replace(/[\s_]/g, '').toLowerCase();
  if (!s) return null;
  let neg = false;
  if (s[0] === '-' || s[0] === '+') {
    neg = s[0] === '-';
    s = s.slice(1);
  }
  if (s === 'inf' || s === 'infinity' || s === '∞') return { kind: 'inf', neg };
  if (s === 'nan') return { kind: 'nan' };
  const pow = /^2\^(-?\d{1,5})$/.exec(s);
  if (pow) {
    const k = parseInt(pow[1], 10);
    return k >= 0 ? { kind: 'num', neg, num: 1n << BigInt(k), den: 1n } : { kind: 'num', neg, num: 1n, den: 1n << BigInt(-k) };
  }
  const frac = s.split('/');
  if (frac.length === 2) {
    const a = parseDec(frac[0]);
    const b = parseDec(frac[1]);
    if (!a || !b || b.num === 0n) return null;
    return { kind: 'num', neg, num: a.num * b.den, den: a.den * b.num };
  }
  const d = parseDec(s);
  return d ? { kind: 'num', neg, ...d } : null;
}

function parseDec(s: string): { num: bigint; den: bigint } | null {
  const m = /^(\d*)(?:\.(\d*))?(?:e([+-]?\d{1,5}))?$/.exec(s);
  if (!m || (!m[1] && !m[2])) return null;
  const digits = (m[1] || '') + (m[2] || '');
  let e10 = (m[3] ? parseInt(m[3], 10) : 0) - (m[2] || '').length;
  let num = BigInt(digits || '0');
  let den = 1n;
  if (e10 >= 0) num *= 10n ** BigInt(e10);
  else den = 10n ** BigInt(-e10);
  e10 = 0;
  return { num, den };
}

const bitLength = (v: bigint): number => (v === 0n ? 0 : v.toString(2).length);

/** Correctly rounded (to nearest, ties to even) encoding of a parsed value. */
export function encodeParsed(p: Parsed, f: FloatFormat): bigint {
  const sign = (neg: boolean) => (neg ? 1n << BigInt(f.bits - 1) : 0n);
  const expAll = mask(f.expBits) << BigInt(f.fracBits);
  if (p.kind === 'nan') return expAll | (1n << BigInt(f.fracBits - 1));
  if (p.kind === 'inf') return sign(p.neg) | expAll;
  const { num, den } = p;
  if (num === 0n) return sign(p.neg);
  const prec = f.fracBits + 1;
  const emin = 1 - f.bias;
  // e = floor(log2(num/den))
  let e = bitLength(num) - bitLength(den);
  const ge = (k: number) => (k >= 0 ? num >= den << BigInt(k) : num << BigInt(-k) >= den);
  if (!ge(e)) e--;
  if (e < emin) e = emin;
  const shift = prec - 1 - e;
  const N = shift >= 0 ? num << BigInt(shift) : num;
  const D = shift >= 0 ? den : den << BigInt(-shift);
  let M = N / D;
  const r2 = (N % D) * 2n;
  if (r2 > D || (r2 === D && (M & 1n) === 1n)) M++;
  if (M === 1n << BigInt(prec)) {
    M >>= 1n;
    e++;
  }
  if (e > f.bias) return sign(p.neg) | expAll;
  const hidden = 1n << BigInt(f.fracBits);
  if (M < hidden) return sign(p.neg) | M; // subnormal (e === emin)
  return sign(p.neg) | (BigInt(e + f.bias) << BigInt(f.fracBits)) | (M - hidden);
}

/** The exact (finite) value of a pattern as a JS number; exact for every binary16/32/64 value. */
export function floatToNumber(bits: bigint, f: FloatFormat): number {
  const d = decodeFloat(bits, f);
  if (d.cls === 'nan') return NaN;
  if (d.cls === 'infinity') return d.s ? -Infinity : Infinity;
  if (f.name === 'binary64') {
    const dv = new DataView(new ArrayBuffer(8));
    dv.setBigUint64(0, bits);
    return dv.getFloat64(0);
  }
  const v = Number(d.mant) * 2 ** d.exp2;
  return d.s ? -v : v;
}

/** Shortest decimal string that rounds back to exactly this pattern. */
export function shortestDecimal(bits: bigint, f: FloatFormat): string {
  const d = decodeFloat(bits, f);
  if (d.cls === 'nan') return 'NaN';
  if (d.cls === 'infinity') return d.s ? '−∞' : '∞';
  if (d.cls === 'zero') return d.s ? '−0' : '0';
  const x = floatToNumber(bits, f);
  if (f.name === 'binary64') return String(x).replace(/-/g, '−');
  for (let p = 1; p <= 17; p++) {
    const s = x.toPrecision(p);
    const back = parseReal(s);
    if (back && encodeParsed(back, f) === bits) return String(Number(s)).replace(/-/g, '−');
  }
  return String(x).replace(/-/g, '−');
}

/** The next pattern towards +infinity (NaN and +inf map to themselves). */
export function nextUp(bits: bigint, f: FloatFormat): bigint {
  const d = decodeFloat(bits, f);
  if (d.cls === 'nan' || (d.cls === 'infinity' && !d.s)) return bits;
  const signBit = 1n << BigInt(f.bits - 1);
  if (bits === signBit) return 1n; // -0 -> smallest positive subnormal
  return d.s ? bits - 1n : bits + 1n;
}

export function nextDown(bits: bigint, f: FloatFormat): bigint {
  const d = decodeFloat(bits, f);
  if (d.cls === 'nan' || (d.cls === 'infinity' && d.s)) return bits;
  const signBit = 1n << BigInt(f.bits - 1);
  if (bits === 0n) return signBit | 1n; // +0 -> smallest negative subnormal
  return d.s ? bits + 1n : bits - 1n;
}

/** A signed dyadic rational m * 2^e (m may be negative). */
export interface Dyadic {
  m: bigint;
  e: number;
}

export function toDyadic(bits: bigint, f: FloatFormat): Dyadic | null {
  const d = decodeFloat(bits, f);
  if (d.cls === 'nan' || d.cls === 'infinity') return null;
  return { m: d.s ? -d.mant : d.mant, e: d.exp2 };
}

export function dyadicSub(a: Dyadic, b: Dyadic): Dyadic {
  const e = Math.min(a.e, b.e);
  return { m: (a.m << BigInt(a.e - e)) - (b.m << BigInt(b.e - e)), e };
}

/** If |d| is a power of two, its exponent; otherwise null. */
export function powerOfTwo(d: Dyadic): number | null {
  const m = d.m < 0n ? -d.m : d.m;
  if (m === 0n || (m & (m - 1n)) !== 0n) return null;
  return d.e + bitLength(m) - 1;
}

export function dyadicToNumber(d: Dyadic): number {
  // Split to stay within double range for intermediate values.
  const bl = bitLength(d.m < 0n ? -d.m : d.m);
  const shift = Math.max(0, bl - 60);
  return Number(d.m >> BigInt(shift)) * 2 ** (d.e + shift);
}

/** Exact decimal of a signed dyadic. */
export function dyadicDecimal(d: Dyadic): string {
  const neg = d.m < 0n;
  const s = exactDecimal(neg ? -d.m : d.m, d.e);
  return neg && s !== '0' ? '−' + s : s;
}

/**
 * Exact decimal of (stored - typed) where stored is a dyadic and typed = num/den with den a
 * product of 2s and 5s (any decimal literal). Returns null if den has other prime factors.
 */
export function errorDecimal(stored: Dyadic, typedNeg: boolean, num: bigint, den: bigint): { text: string; value: number } | null {
  // Find D such that den divides 10^D.
  let d = den;
  let twos = 0;
  let fives = 0;
  while (d % 2n === 0n) {
    d /= 2n;
    twos++;
  }
  while (d % 5n === 0n) {
    d /= 5n;
    fives++;
  }
  if (d !== 1n) return null;
  const D = Math.max(twos, fives, stored.e < 0 ? -stored.e : 0);
  const scale = 10n ** BigInt(D);
  const typedScaled = ((typedNeg ? -num : num) * scale) / den;
  const storedScaled = stored.e >= 0 ? (stored.m << BigInt(stored.e)) * scale : (stored.m * 5n ** BigInt(-stored.e) * 10n ** BigInt(D + stored.e));
  const diff = storedScaled - typedScaled;
  const text = scaledToDecimal(diff, D);
  return { text, value: Number(text.replace('−', '-')) };
}

/** A short scientific rendering such as 1.490116e−9, with a true minus sign. */
export function sci(x: number, digits = 7): string {
  if (x === 0) return '0';
  if (!Number.isFinite(x)) return x > 0 ? '∞' : '−∞';
  const a = Math.abs(x);
  const s = a >= 1e-3 && a < 1e7 ? String(Number(x.toPrecision(digits))) : x.toExponential(digits - 1).replace(/\.?0+e/, 'e');
  return s.replace(/-/g, '−').replace('e+', 'e');
}
