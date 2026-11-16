/**
 * State-vector simulation for the qc-* widgets (qc-circuit, qc-bloch, qc-rabi).
 *
 * Conventions (shared with the quantum-computing lessons):
 *   qubit 0 is the top wire and the LEFTMOST bit of a ket |q0 q1 ... q_{n-1}>, so the basis index
 *   is sum_k q_k 2^(n-1-k) (Nielsen and Chuang order; Qiskit prints bits the other way round).
 *   H = [[1,1],[1,-1]]/sqrt2, S = diag(1,i), T = diag(1,e^{i pi/4}), P(phi) = diag(1,e^{i phi}),
 *   RX(t) = exp(-i t X/2), RY(t) = exp(-i t Y/2), RZ(t) = exp(-i t Z/2) = diag(e^{-it/2}, e^{it/2}).
 *   Bloch vector (x, y, z) = (<X>, <Y>, <Z>); |0> is +z, |+> is +x, |+i> is +y.
 */
import { compile } from './expr';

// ---------- complex 2x2 matrices: [re00, im00, re01, im01, re10, im10, re11, im11] ----------
export type M2 = [number, number, number, number, number, number, number, number];

const R2 = Math.SQRT1_2;
export const GATE_1Q = ['H', 'X', 'Y', 'Z', 'S', 'SDG', 'T', 'TDG', 'RX', 'RY', 'RZ', 'P'] as const;
export const GATE_ALL = [...GATE_1Q, 'CNOT', 'CZ', 'SWAP', 'CCX', 'CCZ', 'M'] as const;
export type GateName = (typeof GATE_ALL)[number] | 'BARRIER';
export const ROTATIONS: readonly string[] = ['RX', 'RY', 'RZ', 'P'];

export function matrix1(name: string, t = 0): M2 {
  const c = Math.cos(t / 2);
  const s = Math.sin(t / 2);
  switch (name) {
    case 'H':
      return [R2, 0, R2, 0, R2, 0, -R2, 0];
    case 'X':
      return [0, 0, 1, 0, 1, 0, 0, 0];
    case 'Y':
      return [0, 0, 0, -1, 0, 1, 0, 0];
    case 'Z':
      return [1, 0, 0, 0, 0, 0, -1, 0];
    case 'S':
      return [1, 0, 0, 0, 0, 0, 0, 1];
    case 'SDG':
      return [1, 0, 0, 0, 0, 0, 0, -1];
    case 'T':
      return [1, 0, 0, 0, 0, 0, R2, R2];
    case 'TDG':
      return [1, 0, 0, 0, 0, 0, R2, -R2];
    case 'RX':
      return [c, 0, 0, -s, 0, -s, c, 0];
    case 'RY':
      return [c, 0, -s, 0, s, 0, c, 0];
    case 'RZ':
      return [c, -s, 0, 0, 0, 0, c, s];
    case 'P':
      return [1, 0, 0, 0, 0, 0, Math.cos(t), Math.sin(t)];
    default:
      throw new Error(`"${name}" is not a single-qubit gate`);
  }
}

// ---------- gates ----------
export interface Gate {
  name: GateName;
  /** For controlled gates: controls first, target last. */
  qubits: number[];
  /** Angle in radians for RX, RY, RZ, P. */
  theta?: number;
  /** The angle as written ("pi/2"), for labels. */
  angleSrc?: string;
}

const ALIASES: Record<string, string> = { CX: 'CNOT', TOFFOLI: 'CCX', CCNOT: 'CCX', SDAG: 'SDG', TDAG: 'TDG', PHASE: 'P', MEASURE: 'M' };

export function arity(name: string): number {
  return name === 'CNOT' || name === 'CZ' || name === 'SWAP' ? 2 : name === 'CCX' || name === 'CCZ' ? 3 : name === 'BARRIER' ? 0 : 1;
}

/** Parses "H 0", "RY(pi/3) 1", "CNOT 0 1", "CCZ 0 1 2", "M 2", "BARRIER". */
export function parseGate(src: string, n: number): Gate {
  const m = src.trim().match(/^([A-Za-z]+)\s*(?:\(([^)]*)\))?\s*(.*)$/);
  if (!m) throw new Error(`cannot read gate "${src}" (write e.g. "H 0", "RY(pi/2) 1" or "CNOT 0 1")`);
  let name = m[1].toUpperCase();
  name = ALIASES[name] ?? name;
  if (name === 'BARRIER') return { name: 'BARRIER', qubits: [] };
  if (!(GATE_ALL as readonly string[]).includes(name)) throw new Error(`unknown gate "${m[1]}" in "${src}" (use ${GATE_ALL.join(', ')})`);
  const g: Gate = { name: name as GateName, qubits: [] };
  if (ROTATIONS.includes(name)) {
    if (m[2] === undefined || !m[2].trim()) throw new Error(`gate "${src}" needs an angle, e.g. "${name}(pi/2) 0"`);
    let v: number;
    try {
      v = compile(m[2], [])();
    } catch (e) {
      throw new Error(`bad angle in "${src}": ${(e as Error).message}`);
    }
    if (!Number.isFinite(v)) throw new Error(`bad angle in "${src}"`);
    g.theta = v;
    g.angleSrc = m[2].trim();
  } else if (m[2] !== undefined) throw new Error(`gate "${name}" takes no angle (in "${src}")`);
  const qs = m[3].trim() ? m[3].trim().split(/[\s,]+/) : [];
  const k = arity(name);
  if (qs.length !== k) throw new Error(`gate "${src}" needs ${k} qubit number${k > 1 ? 's' : ''}`);
  for (const q of qs) {
    if (!/^\d+$/.test(q)) throw new Error(`"${q}" is not a qubit number in "${src}"`);
    const i = parseInt(q, 10);
    if (i >= n) throw new Error(`qubit ${i} in "${src}" does not exist (qubits are 0 to ${n - 1})`);
    g.qubits.push(i);
  }
  if (new Set(g.qubits).size !== g.qubits.length) throw new Error(`gate "${src}" uses the same qubit twice`);
  return g;
}

export function gateToString(g: Gate): string {
  if (g.name === 'BARRIER') return 'BARRIER';
  const a = g.theta !== undefined ? `(${g.angleSrc ?? g.theta.toFixed(3)})` : '';
  return `${g.name}${a} ${g.qubits.join(' ')}`;
}

// ---------- state vectors ----------
export interface State {
  n: number;
  re: Float64Array;
  im: Float64Array;
}

export function basisState(n: number, bits: string): State {
  const N = 1 << n;
  const re = new Float64Array(N);
  const im = new Float64Array(N);
  re[parseInt(bits, 2)] = 1;
  return { n, re, im };
}

export const cloneState = (s: State): State => ({ n: s.n, re: s.re.slice(), im: s.im.slice() });

/** Bit mask of qubit q (qubit 0 is the most significant bit). */
export const maskOf = (n: number, q: number) => 1 << (n - 1 - q);

/** Applies a 2x2 unitary to qubit `t`, only on basis states where every control qubit is 1. */
export function applyU(s: State, t: number, U: M2, controls: number[] = []) {
  const { n, re, im } = s;
  const mt = maskOf(n, t);
  let mc = 0;
  for (const c of controls) mc |= maskOf(n, c);
  for (let i = 0; i < re.length; i++) {
    if (i & mt || (i & mc) !== mc) continue;
    const j = i | mt;
    const ar = re[i];
    const ai = im[i];
    const br = re[j];
    const bi = im[j];
    re[i] = U[0] * ar - U[1] * ai + U[2] * br - U[3] * bi;
    im[i] = U[0] * ai + U[1] * ar + U[2] * bi + U[3] * br;
    re[j] = U[4] * ar - U[5] * ai + U[6] * br - U[7] * bi;
    im[j] = U[4] * ai + U[5] * ar + U[6] * bi + U[7] * br;
  }
}

export function applySwap(s: State, a: number, b: number) {
  const { n, re, im } = s;
  const ma = maskOf(n, a);
  const mb = maskOf(n, b);
  for (let i = 0; i < re.length; i++) {
    if (i & ma && !(i & mb)) {
      const j = (i & ~ma) | mb;
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
}

/** Probability that qubit q reads 1. */
export function probOne(s: State, q: number): number {
  const m = maskOf(s.n, q);
  let p = 0;
  for (let i = 0; i < s.re.length; i++) if (i & m) p += s.re[i] ** 2 + s.im[i] ** 2;
  return p;
}

/** Projects qubit q onto `outcome` and renormalises; returns the probability of that outcome. */
export function measure(s: State, q: number, outcome: 0 | 1): number {
  const m = maskOf(s.n, q);
  let p = 0;
  for (let i = 0; i < s.re.length; i++) {
    const hit = (i & m ? 1 : 0) === outcome;
    if (hit) p += s.re[i] ** 2 + s.im[i] ** 2;
    else {
      s.re[i] = 0;
      s.im[i] = 0;
    }
  }
  if (p > 1e-15) {
    const k = 1 / Math.sqrt(p);
    for (let i = 0; i < s.re.length; i++) {
      s.re[i] *= k;
      s.im[i] *= k;
    }
  }
  return p;
}

/** Applies a unitary gate (not M or BARRIER). */
export function applyGate(s: State, g: Gate) {
  const q = g.qubits;
  switch (g.name) {
    case 'CNOT':
      return applyU(s, q[1], matrix1('X'), [q[0]]);
    case 'CZ':
      return applyU(s, q[1], matrix1('Z'), [q[0]]);
    case 'CCX':
      return applyU(s, q[2], matrix1('X'), [q[0], q[1]]);
    case 'CCZ':
      return applyU(s, q[2], matrix1('Z'), [q[0], q[1]]);
    case 'SWAP':
      return applySwap(s, q[0], q[1]);
    case 'M':
    case 'BARRIER':
      return;
    default:
      return applyU(s, q[0], matrix1(g.name, g.theta ?? 0));
  }
}

/** Reduced Bloch vector of qubit q: (x, y, z) with rho_q = (I + xX + yY + zZ)/2. */
export function blochOf(s: State, q: number): [number, number, number] {
  const m = maskOf(s.n, q);
  let p0 = 0;
  let p1 = 0;
  let cr = 0;
  let ci = 0; // rho_01 = sum a_{..0..} conj(a_{..1..})
  for (let i = 0; i < s.re.length; i++) {
    if (i & m) {
      p1 += s.re[i] ** 2 + s.im[i] ** 2;
      continue;
    }
    p0 += s.re[i] ** 2 + s.im[i] ** 2;
    const j = i | m;
    cr += s.re[i] * s.re[j] + s.im[i] * s.im[j];
    ci += s.im[i] * s.re[j] - s.re[i] * s.im[j];
  }
  return [2 * cr, -2 * ci, p0 - p1];
}

export const ket = (i: number, n: number) => i.toString(2).padStart(n, '0');

// ---------- circuit layout ----------
export interface Placed {
  gate: Gate;
  /** Index in the gate list. */
  index: number;
  col: number;
}

/**
 * Packs gates into columns: each gate goes in the first column after every earlier gate that
 * touches any wire in its span (min..max qubit), so gates on disjoint wires share a column and
 * the order of gates on any wire is kept. BARRIER spans every wire.
 */
export function layout(gates: Gate[], n: number): { placed: Placed[]; cols: number } {
  const last = new Array(n).fill(-1);
  const placed: Placed[] = [];
  gates.forEach((g, index) => {
    const span = g.name === 'BARRIER' || g.qubits.length === 0 ? [0, n - 1] : [Math.min(...g.qubits), Math.max(...g.qubits)];
    let col = 0;
    for (let w = span[0]; w <= span[1]; w++) col = Math.max(col, last[w] + 1);
    for (let w = span[0]; w <= span[1]; w++) last[w] = col;
    placed.push({ gate: g, index, col });
  });
  return { placed, cols: Math.max(0, ...last.map((x) => x + 1)) };
}

/** Runs gates in columns < upTo; measurements use the chosen outcomes (by gate index). */
export function run(
  n: number,
  init: string,
  placed: Placed[],
  upTo: number,
  outcomes: Record<number, 0 | 1>,
): { state: State; meas: { index: number; q: number; p1: number; outcome: 0 | 1; col: number }[]; branch: number } {
  const s = basisState(n, init);
  const meas: { index: number; q: number; p1: number; outcome: 0 | 1; col: number }[] = [];
  let branch = 1;
  const order = [...placed].sort((a, b) => a.col - b.col || a.index - b.index);
  for (const pl of order) {
    if (pl.col >= upTo) continue;
    const g = pl.gate;
    if (g.name === 'M') {
      const q = g.qubits[0];
      const p1 = probOne(s, q);
      let o: 0 | 1 = outcomes[pl.index] ?? (p1 > 0.5 + 1e-9 ? 1 : 0);
      if (o === 1 && p1 < 1e-12) o = 0;
      if (o === 0 && 1 - p1 < 1e-12) o = 1;
      branch *= o ? p1 : 1 - p1;
      measure(s, q, o);
      meas.push({ index: pl.index, q, p1, outcome: o, col: pl.col });
    } else applyGate(s, g);
  }
  return { state: s, meas, branch };
}

// ---------- formatting ----------
const r3 = (x: number) => {
  const v = Math.round(x * 1000) / 1000;
  return Object.is(v, -0) || Math.abs(v) < 5e-4 ? 0 : v;
};
const num3 = (x: number) => {
  const v = r3(x);
  return (v < 0 ? '−' : '') + Math.abs(v).toFixed(3).replace(/\.?0+$/, '');
};

/** "0.707", "−0.5i", "0.354 + 0.354i". */
export function fmtC(re: number, im: number): string {
  const a = r3(re);
  const b = r3(im);
  if (b === 0) return num3(a);
  const bs = Math.abs(b) === 1 ? '' : Math.abs(b).toFixed(3).replace(/\.?0+$/, '');
  if (a === 0) return `${b < 0 ? '−' : ''}${bs}i`;
  return `${num3(a)} ${b < 0 ? '−' : '+'} ${bs}i`;
}

/** An angle in radians as a simple multiple of pi (denominators up to 16), else in degrees. */
export function fmtPi(t: number): string {
  let a = t;
  while (a > Math.PI + 1e-9) a -= 2 * Math.PI;
  while (a <= -Math.PI + 1e-9) a += 2 * Math.PI;
  for (const den of [1, 2, 3, 4, 6, 8, 12, 16]) {
    const k = (a / Math.PI) * den;
    const kr = Math.round(k);
    if (Math.abs(k - kr) > 1e-6) continue;
    if (kr === 0) return '0';
    const sign = kr < 0 ? '−' : '';
    const an = Math.abs(kr);
    return `${sign}${an === 1 ? '' : an}π${den === 1 ? '' : `/${den}`}`;
  }
  const d = (a * 180) / Math.PI;
  return `${d < 0 ? '−' : ''}${Math.abs(d).toFixed(1)}°`;
}

/** A colour for a phase angle: hue goes round the colour wheel, 0 = red-orange. */
export function phaseColor(t: number, dark: boolean): string {
  const h = ((((t * 180) / Math.PI) % 360) + 360) % 360;
  return `hsl(${h.toFixed(0)}, ${dark ? 75 : 70}%, ${dark ? 62 : 46}%)`;
}

// ---------- Bloch-sphere rotations ----------
export type V3 = [number, number, number];

/** Rotates v by angle a about the unit axis n (right-hand rule). */
export function rotate(v: V3, n: V3, a: number): V3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  const d = n[0] * v[0] + n[1] * v[1] + n[2] * v[2];
  const cr: V3 = [n[1] * v[2] - n[2] * v[1], n[2] * v[0] - n[0] * v[2], n[0] * v[1] - n[1] * v[0]];
  return [v[0] * c + cr[0] * s + n[0] * d * (1 - c), v[1] * c + cr[1] * s + n[1] * d * (1 - c), v[2] * c + cr[2] * s + n[2] * d * (1 - c)];
}

/** The rotation (axis, angle) a single-qubit gate performs on the Bloch sphere, up to global phase. */
export function gateRotation(name: string, t = Math.PI / 2): { axis: V3; angle: number } {
  switch (name) {
    case 'X':
      return { axis: [1, 0, 0], angle: Math.PI };
    case 'Y':
      return { axis: [0, 1, 0], angle: Math.PI };
    case 'Z':
      return { axis: [0, 0, 1], angle: Math.PI };
    case 'H':
      return { axis: [R2, 0, R2], angle: Math.PI };
    case 'S':
      return { axis: [0, 0, 1], angle: Math.PI / 2 };
    case 'SDG':
      return { axis: [0, 0, 1], angle: -Math.PI / 2 };
    case 'T':
      return { axis: [0, 0, 1], angle: Math.PI / 4 };
    case 'TDG':
      return { axis: [0, 0, 1], angle: -Math.PI / 4 };
    case 'RX':
      return { axis: [1, 0, 0], angle: t };
    case 'RY':
      return { axis: [0, 1, 0], angle: t };
    case 'RZ':
    case 'P':
      return { axis: [0, 0, 1], angle: t };
    default:
      throw new Error(`"${name}" is not a single-qubit gate`);
  }
}

/** Bloch vector to (theta, phi) in radians; phi = 0 at the poles. */
export function toAngles(v: V3): [number, number] {
  const r = Math.hypot(v[0], v[1], v[2]) || 1;
  const th = Math.acos(Math.max(-1, Math.min(1, v[2] / r)));
  const ph = Math.hypot(v[0], v[1]) < 1e-9 ? 0 : Math.atan2(v[1], v[0]);
  return [th, ph];
}

export const fromAngles = (th: number, ph: number): V3 => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];

// ---------- circuit presets ----------
export interface Preset {
  label: string;
  qubits: number;
  init?: string;
  circuit: string[];
  note: string;
}

export const PRESETS: Record<string, Preset> = {
  bell: { label: 'Bell state', qubits: 2, circuit: ['H 0', 'CNOT 0 1'], note: 'H then CNOT makes (|00⟩ + |11⟩)/√2: each outcome 00 or 11 with probability 1/2, never 01 or 10.' },
  ghz: { label: 'GHZ', qubits: 3, circuit: ['H 0', 'CNOT 0 1', 'CNOT 1 2'], note: '(|000⟩ + |111⟩)/√2: all three qubits agree, and each one alone is maximally mixed (|r| = 0).' },
  teleport: {
    label: 'Teleportation',
    qubits: 3,
    circuit: ['RY(1.2) 0', 'BARRIER', 'H 1', 'CNOT 1 2', 'BARRIER', 'CNOT 0 1', 'H 0', 'BARRIER', 'CNOT 1 2', 'CZ 0 2'],
    note: 'q0 holds RY(1.2)|0⟩ = cos 0.6|0⟩ + sin 0.6|1⟩; q1, q2 share a Bell pair. The last two gates are the corrections X^{m1}, Z^{m0} written as controlled gates (deferred measurement), so q2 ends in the input state: Bloch vector (sin 1.2, 0, cos 1.2) = (0.932, 0, 0.362).',
  },
  'teleport-measure': {
    label: 'Teleportation with measurements',
    qubits: 3,
    circuit: ['RY(1.2) 0', 'BARRIER', 'H 1', 'CNOT 1 2', 'BARRIER', 'CNOT 0 1', 'H 0', 'M 0', 'M 1', 'BARRIER', 'CNOT 1 2', 'CZ 0 2'],
    note: 'Alice measures q0 and q1; pick the outcomes. A controlled gate whose control has been measured acts exactly like a classically controlled gate, so the corrections fix q2 for every one of the four outcomes (each has probability 1/4).',
  },
  superdense: {
    label: 'Superdense coding',
    qubits: 2,
    circuit: ['H 0', 'CNOT 0 1', 'BARRIER', 'X 0', 'Z 0', 'BARRIER', 'CNOT 0 1', 'H 0'],
    note: 'Alice encodes two bits b1b2 by applying X^{b2} then Z^{b1} to her half (here 11: X then Z). Bob undoes the Bell circuit and reads 11 with probability 1. Remove X or Z to send 10, 01 or 00.',
  },
  'deutsch-jozsa': {
    label: 'Deutsch-Jozsa',
    qubits: 3,
    circuit: ['X 2', 'H 0', 'H 1', 'H 2', 'BARRIER', 'CNOT 0 2', 'BARRIER', 'H 0', 'H 1'],
    note: 'Inputs q0 q1, answer qubit q2 in |−⟩. The oracle CNOT 0 2 computes the balanced f(x) = x0. The inputs never read 00 (they read 10), so f is balanced. Delete the oracle (f = 0, constant) and they read 00 with certainty.',
  },
  'bernstein-vazirani': {
    label: 'Bernstein-Vazirani',
    qubits: 4,
    circuit: ['X 3', 'H 0', 'H 1', 'H 2', 'H 3', 'BARRIER', 'CNOT 0 3', 'CNOT 2 3', 'BARRIER', 'H 0', 'H 1', 'H 2'],
    note: 'The oracle computes f(x) = s·x mod 2 with secret s = 101 (a CNOT from each qubit where s has a 1). One query and the inputs q0 q1 q2 read 101 with probability 1.',
  },
  grover2: {
    label: 'Grover, 2 qubits',
    qubits: 2,
    circuit: ['H 0', 'H 1', 'BARRIER', 'CZ 0 1', 'BARRIER', 'H 0', 'H 1', 'X 0', 'X 1', 'CZ 0 1', 'X 0', 'X 1', 'H 0', 'H 1'],
    note: 'Oracle CZ flips the sign of |11⟩; the next seven gates are the diffusion (inversion about the mean, up to a global phase). With N = 4 one iteration finds 11 with probability 1.',
  },
  grover3: {
    label: 'Grover, 3 qubits',
    qubits: 3,
    circuit: [
      'H 0', 'H 1', 'H 2', 'BARRIER',
      'X 1', 'CCZ 0 1 2', 'X 1', 'BARRIER',
      'H 0', 'H 1', 'H 2', 'X 0', 'X 1', 'X 2', 'CCZ 0 1 2', 'X 0', 'X 1', 'X 2', 'H 0', 'H 1', 'H 2', 'BARRIER',
      'X 1', 'CCZ 0 1 2', 'X 1', 'BARRIER',
      'H 0', 'H 1', 'H 2', 'X 0', 'X 1', 'X 2', 'CCZ 0 1 2', 'X 0', 'X 1', 'X 2', 'H 0', 'H 1', 'H 2',
    ],
    note: 'N = 8, marked item 101 (the oracle is CCZ sandwiched by X on q1). After one iteration P(101) = 0.781; after two, 0.945 = sin²(5θ) with sin θ = 1/√8. A third iteration would overshoot.',
  },
};
export const PRESET_NAMES = Object.keys(PRESETS);
