/**
 * Row reduction over a Field (exact fractions or rounded decimals): row operations with an LU
 * record, echelon tests, the next standard elimination step, and reading off a solution set.
 * Pure logic, testable with tsx; the row-reduce widget draws it.
 */
import type { Field } from './la-core';

export type Op<T> =
  | { kind: 'swap'; i: number; j: number }
  | { kind: 'scale'; i: number; c: T }
  /** R_i -> R_i + c R_j. In LU mode the multiplier is l = -c. */
  | { kind: 'add'; i: number; j: number; c: T };

export interface RRState<T> {
  M: T[][];
  /** Unit lower triangular L with P A = L U (LU mode only). */
  L: T[][] | null;
  /** perm[k] = the original row now in position k. */
  perm: number[];
  swaps: number;
  /** Product of the scale factors applied so far (det(current) = detScale * (-1)^swaps * det A). */
  detScale: T;
}

export function initState<T>(F: Field<T>, M: T[][], lu: boolean): RRState<T> {
  const m = M.length;
  return {
    M: M.map((r) => [...r]),
    L: lu ? Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => (i === j ? F.one : F.zero))) : null,
    perm: Array.from({ length: m }, (_, i) => i),
    swaps: 0,
    detScale: F.one,
  };
}

export const lead = <T>(F: Field<T>, row: T[], upTo = row.length) => {
  for (let j = 0; j < upTo; j++) if (!F.isZero(row[j])) return j;
  return -1;
};

/** The multiplier c that makes R_i + c R_j vanish at R_j's leading column (null if none). */
export function suggestAdd<T>(F: Field<T>, M: T[][], i: number, j: number): T | null {
  const p = lead(F, M[j]);
  if (p < 0 || i === j) return null;
  if (F.isZero(M[i][p])) return null;
  return F.neg(F.div(M[i][p], M[j][p]));
}
/** The factor that makes R_i's leading entry 1. */
export function suggestScale<T>(F: Field<T>, M: T[][], i: number): T | null {
  const p = lead(F, M[i]);
  if (p < 0) return null;
  return F.div(F.one, M[i][p]);
}

function isLowerUnit<T>(F: Field<T>, L: T[][]): boolean {
  for (let i = 0; i < L.length; i++)
    for (let j = 0; j < L.length; j++) {
      if (j > i && !F.isZero(L[i][j])) return false;
      if (j === i && !F.eq(L[i][j], F.one)) return false;
    }
  return true;
}

export function applyOp<T>(F: Field<T>, s: RRState<T>, op: Op<T>): RRState<T> | { error: string } {
  const M = s.M.map((r) => [...r]);
  const m = M.length;
  const inRange = (k: number) => k >= 0 && k < m;
  if (op.kind === 'swap') {
    if (!inRange(op.i) || !inRange(op.j) || op.i === op.j) return { error: 'Choose two different rows to swap.' };
    [M[op.i], M[op.j]] = [M[op.j], M[op.i]];
    const perm = [...s.perm];
    [perm[op.i], perm[op.j]] = [perm[op.j], perm[op.i]];
    let L = s.L;
    if (L) {
      const N = L.map((r) => [...r]);
      [N[op.i], N[op.j]] = [N[op.j], N[op.i]];
      for (const r of N) [r[op.i], r[op.j]] = [r[op.j], r[op.i]];
      if (!isLowerUnit(F, N)) return { error: 'That swap would break the lower-triangular shape of L. Swap rows before you eliminate with either of them (as partial pivoting does), not after.' };
      L = N;
    }
    return { ...s, M, perm, L, swaps: s.swaps + 1 };
  }
  if (op.kind === 'scale') {
    if (!inRange(op.i)) return { error: 'Choose a row.' };
    if (s.L) return { error: 'LU elimination only subtracts multiples of rows (and swaps them); scaling a row is not part of it.' };
    if (F.isZero(op.c)) return { error: 'Multiplying a row by 0 is not a row operation: it cannot be undone.' };
    const p = lead(F, M[op.i]);
    const exactOne = p >= 0 && !F.exact && F.eq(op.c, F.div(F.one, M[op.i][p]));
    M[op.i] = M[op.i].map((a) => F.mul(op.c, a));
    if (exactOne) M[op.i][p] = F.one;
    return { ...s, M, detScale: F.mul(s.detScale, op.c) };
  }
  if (!inRange(op.i) || !inRange(op.j) || op.i === op.j) return { error: 'Choose two different rows.' };
  if (s.L && op.j > op.i) return { error: 'For LU, subtract a multiple of a higher row from a lower one (j above i), so the multiplier lands below the diagonal of L.' };
  const p = lead(F, M[op.j]);
  const sug = suggestAdd(F, M, op.i, op.j);
  const clear = p >= 0 && !F.exact && sug !== null && F.eq(sug, op.c);
  M[op.i] = M[op.i].map((a, k) => F.add(a, F.mul(op.c, M[op.j][k])));
  if (clear) M[op.i][p] = F.zero;
  let L = s.L;
  if (L) {
    // L' = L (I - c e_i e_j^T): column j gains l = -c times column i.
    const N = L.map((r) => [...r]);
    for (let r = 0; r < m; r++) N[r][op.j] = F.sub(N[r][op.j], F.mul(op.c, N[r][op.i]));
    L = N;
  }
  return { ...s, M, L };
}

export interface Shape {
  echelon: boolean;
  rref: boolean;
  /** Leading column of each row (-1 for a zero row). */
  leads: number[];
}

export function shape<T>(F: Field<T>, M: T[][]): Shape {
  const leads = M.map((r) => lead(F, r));
  let echelon = true;
  let last = -1;
  let seenZero = false;
  for (const l of leads) {
    if (l < 0) seenZero = true;
    else if (seenZero || l <= last) echelon = false;
    else last = l;
  }
  let rref = echelon;
  if (rref)
    leads.forEach((l, i) => {
      if (l < 0) return;
      if (!F.eq(M[i][l], F.one)) rref = false;
      M.forEach((r, k) => k !== i && !F.isZero(r[l]) && (rref = false));
    });
  return { echelon, rref, leads };
}

/** True when every entry below the diagonal is zero (for LU). */
export function upperTriangular<T>(F: Field<T>, M: T[][]): boolean {
  return M.every((r, i) => r.every((a, j) => j >= i || F.isZero(a)));
}

/** The next step of standard elimination (forward to echelon form, then upward to reduced form). */
export function nextStep<T>(F: Field<T>, M: T[][], nCoef: number, opts: { partial: boolean; rref: boolean }): Op<T> | null {
  const m = M.length;
  const mag = (a: T) => Math.abs(F.toNumber(a));
  let r = 0;
  const pivots: [number, number][] = [];
  for (let c = 0; c < nCoef && r < m; c++) {
    let pr = -1;
    for (let i = r; i < m; i++) {
      if (F.isZero(M[i][c])) continue;
      if (pr < 0 || (opts.partial && mag(M[i][c]) > mag(M[pr][c]))) pr = i;
      if (!opts.partial) break;
    }
    if (pr < 0) continue;
    if (pr !== r) return { kind: 'swap', i: r, j: pr };
    for (let i = r + 1; i < m; i++) if (!F.isZero(M[i][c])) return { kind: 'add', i, j: r, c: F.neg(F.div(M[i][c], M[r][c])) };
    pivots.push([r, c]);
    r++;
  }
  if (!opts.rref) return null;
  for (let k = pivots.length - 1; k >= 0; k--) {
    const [pr, pc] = pivots[k];
    if (!F.eq(M[pr][pc], F.one)) return { kind: 'scale', i: pr, c: F.div(F.one, M[pr][pc]) };
    for (let i = 0; i < pr; i++) if (!F.isZero(M[i][pc])) return { kind: 'add', i, j: pr, c: F.neg(M[i][pc]) };
  }
  return null;
}

export type Solution<T> =
  | { kind: 'none'; row: number }
  | { kind: 'some'; pivotCols: number[]; free: number[]; particular: T[]; nullBasis: T[][] };

/**
 * Solution set of [A | b] (nCoef coefficient columns, then one right-hand side; with no
 * right-hand side pass nCoef = number of columns and it solves A x = 0). M must be in echelon form.
 */
export function solutionSet<T>(F: Field<T>, M: T[][], nCoef: number): Solution<T> {
  const hasB = M[0].length > nCoef;
  const leads = M.map((r) => lead(F, r));
  for (let i = 0; i < M.length; i++) if (hasB && leads[i] >= nCoef) return { kind: 'none', row: i };
  const pivotCols = leads.filter((l) => l >= 0 && l < nCoef);
  const free = Array.from({ length: nCoef }, (_, j) => j).filter((j) => !pivotCols.includes(j));
  const back = (rhs: (i: number) => T, preset: Map<number, T>) => {
    const x: T[] = Array.from({ length: nCoef }, (_, j) => preset.get(j) ?? F.zero);
    for (let i = M.length - 1; i >= 0; i--) {
      const p = leads[i];
      if (p < 0 || p >= nCoef) continue;
      let s = rhs(i);
      for (let k = p + 1; k < nCoef; k++) s = F.sub(s, F.mul(M[i][k], x[k]));
      x[p] = F.div(s, M[i][p]);
    }
    return x;
  };
  const particular = back((i) => (hasB ? M[i][nCoef] : F.zero), new Map());
  const nullBasis = free.map((f) => back(() => F.zero, new Map([[f, F.one]])));
  return { kind: 'some', pivotCols, free, particular, nullBasis };
}
