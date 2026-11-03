/**
 * Step recorders for dynamic-programming tables: each step fills one cell and records the cells
 * it depends on (with the winning one marked) and the recurrence with numbers substituted;
 * a traceback then walks the optimal solution. Pure TypeScript.
 */
export type DPProblem = 'fib' | 'edit' | 'lcs' | 'knapsack' | 'coins' | 'lis';

export type Cell = number | null;

export interface Dep {
  r: number;
  c: number;
  chosen: boolean;
  label?: string;
}

export interface DPSnap {
  grid: Cell[][];
  cur: [number, number] | null;
  deps: Dep[];
  path: [number, number][];
  /** KaTeX for the recurrence at the current cell. */
  tex: string;
  d: string;
  /** Memoised Fibonacci: active calls, outermost first. */
  stack?: number[];
  calls?: number;
  /** Cells whose value was reused from the memo at this step. */
  hit?: number;
}

export interface DPRun {
  snaps: DPSnap[];
  rowLabels: string[];
  colLabels: string[];
  /** Row header title, column header title. */
  rowTitle: string;
  colTitle: string;
  /** Extra per-column info shown above the header (e.g. the sequence for LIS). */
  topLabels?: string[];
  answer: string;
}

const INF = Infinity;
const show = (v: Cell) => (v === null ? '·' : v === INF ? '\\infty' : String(v));

class Rec {
  snaps: DPSnap[] = [];
  path: [number, number][] = [];
  constructor(public grid: Cell[][]) {}
  snap(d: string, cur: [number, number] | null = null, deps: Dep[] = [], tex = '', extra: Partial<DPSnap> = {}) {
    this.snaps.push({ grid: this.grid.map((r) => r.slice()), cur, deps, path: this.path.slice(), tex, d, ...extra });
  }
}

const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const sub = (i: number | string) => String(i).replace(/\d/g, (d) => SUBS[Number(d)]).replace(/^i$/, 'ᵢ');

const blank = (r: number, c: number): Cell[][] => Array.from({ length: r }, () => Array<Cell>(c).fill(null));

/* ---------------------------------------------------------------- Fibonacci */

export function fibTable(n: number): DPRun {
  const R = new Rec(blank(1, n + 1));
  const g = R.grid[0];
  R.snap(`Tabulation: fill F[0..${n}] left to right, so both F[i−1] and F[i−2] are ready when F[i] is computed.`);
  g[0] = 0;
  R.snap('Base case F[0] = 0.', [0, 0], [], 'F(0) = 0');
  if (n >= 1) {
    g[1] = 1;
    R.snap('Base case F[1] = 1.', [0, 1], [], 'F(1) = 1');
  }
  for (let i = 2; i <= n; i++) {
    g[i] = (g[i - 1] as number) + (g[i - 2] as number);
    R.snap(`F[${i}] = F[${i - 1}] + F[${i - 2}] = ${g[i - 1]} + ${g[i - 2]} = ${g[i]}. One addition per cell: O(n) in total.`, [0, i], [
      { r: 0, c: i - 1, chosen: true },
      { r: 0, c: i - 2, chosen: true },
    ], `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${g[i - 1]} + ${g[i - 2]} = ${g[i]}`);
  }
  R.snap(`Done: F(${n}) = ${g[n]} after ${Math.max(0, n - 1)} additions.`, [0, n]);
  return { snaps: R.snaps, rowLabels: ['F'], colLabels: Array.from({ length: n + 1 }, (_, i) => String(i)), rowTitle: '', colTitle: 'i', answer: `F(${n}) = ${g[n]}` };
}

export function fibMemo(n: number): DPRun {
  const R = new Rec(blank(1, n + 1));
  const g = R.grid[0];
  const stack: number[] = [];
  let calls = 0;
  const rec = (k: number): number => {
    calls++;
    stack.push(k);
    if (g[k] !== null) {
      R.snap(`fib(${k}) is already in the memo: return ${g[k]} without recursing.`, [0, k], [], `F(${k}) = ${g[k]}\\ \\text{(cached)}`, { stack: stack.slice(), calls, hit: k });
      stack.pop();
      return g[k] as number;
    }
    if (k < 2) {
      g[k] = k;
      R.snap(`fib(${k}) is a base case: ${k}. Store it in the memo.`, [0, k], [], `F(${k}) = ${k}`, { stack: stack.slice(), calls });
      stack.pop();
      return k;
    }
    R.snap(`Call fib(${k}): not in the memo, so it calls fib(${k - 1}) first.`, [0, k], [], `F(${k}) = F(${k - 1}) + F(${k - 2})`, { stack: stack.slice(), calls });
    const a = rec(k - 1);
    R.snap(`Back in fib(${k}): fib(${k - 1}) = ${a}. Now call fib(${k - 2}).`, [0, k], [{ r: 0, c: k - 1, chosen: true }], `F(${k}) = ${a} + F(${k - 2})`, { stack: stack.slice(), calls });
    const b = rec(k - 2);
    g[k] = a + b;
    R.snap(`fib(${k}) = ${a} + ${b} = ${g[k]}; store it in the memo.`, [0, k], [
      { r: 0, c: k - 1, chosen: true },
      { r: 0, c: k - 2, chosen: true },
    ], `F(${k}) = ${a} + ${b} = ${g[k]}`, { stack: stack.slice(), calls });
    stack.pop();
    return g[k] as number;
  };
  R.snap(`Memoisation: the recursive definition plus a cache. Call fib(${n}).`, null, [], '', { stack: [], calls: 0 });
  rec(n);
  const naive = 2 * fibN(n + 1) - 1;
  R.snap(`Done: fib(${n}) = ${g[n]} with ${calls} calls (2n − 1 for n ≥ 1). The naive recursion without a memo makes 2F(n+1) − 1 = ${naive} calls.`, [0, n], [], '', { stack: [], calls });
  return { snaps: R.snaps, rowLabels: ['memo'], colLabels: Array.from({ length: n + 1 }, (_, i) => String(i)), rowTitle: '', colTitle: 'k', answer: `F(${n}) = ${g[n]}` };
}

export function fibN(n: number): number {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

/* ---------------------------------------------------------------- edit distance */

export function editDistance(A: string, B: string): DPRun {
  const m = A.length;
  const n = B.length;
  const R = new Rec(blank(m + 1, n + 1));
  const D = R.grid as number[][];
  R.snap(`D[i][j] is the edit distance between the first i letters of “${A}” and the first j letters of “${B}”. Fill row by row.`);
  for (let i = 0; i <= m; i++) {
    D[i][0] = i;
  }
  R.snap(`Column 0: turning a prefix of length i into the empty string takes i deletions.`, null, [], 'D[i][0] = i');
  for (let j = 0; j <= n; j++) D[0][j] = j;
  R.snap(`Row 0: building a prefix of length j from nothing takes j insertions.`, null, [], 'D[0][j] = j');
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      const same = A[i - 1] === B[j - 1];
      const del = D[i - 1][j] + 1;
      const ins = D[i][j - 1] + 1;
      const sub = D[i - 1][j - 1] + (same ? 0 : 1);
      const best = Math.min(sub, del, ins);
      D[i][j] = best;
      R.snap(
        `${A[i - 1]} vs ${B[j - 1]}: ${same ? 'equal, so the diagonal costs 0' : 'different, so the diagonal is a substitution costing 1'}. Take the minimum of delete ${del}, insert ${ins}, ${same ? 'match' : 'substitute'} ${sub}: ${best}.`,
        [i, j],
        [
          { r: i - 1, c: j, chosen: best === del && best !== sub, label: 'del' },
          { r: i, c: j - 1, chosen: best === ins && best !== sub && best !== del, label: 'ins' },
          { r: i - 1, c: j - 1, chosen: best === sub, label: same ? 'match' : 'sub' },
        ],
        `D[${i}][${j}] = \\min(D[${i - 1}][${j}]{+}1,\\ D[${i}][${j - 1}]{+}1,\\ D[${i - 1}][${j - 1}]{+}${same ? 0 : 1}) = \\min(${del}, ${ins}, ${sub}) = ${best}`,
      );
    }
  // traceback
  let i = m;
  let j = n;
  const ops: string[] = [];
  R.path = [[i, j]];
  R.snap(`Traceback from D[${m}][${n}] = ${D[m][n]}: at each cell step to a neighbour that produced its value.`, [m, n]);
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1)) {
      ops.push(A[i - 1] === B[j - 1] ? `keep ${A[i - 1]}` : `${A[i - 1]}→${B[j - 1]}`);
      i--;
      j--;
    } else if (i > 0 && D[i][j] === D[i - 1][j] + 1) {
      ops.push(`delete ${A[i - 1]}`);
      i--;
    } else {
      ops.push(`insert ${B[j - 1]}`);
      j--;
    }
    R.path.push([i, j]);
    R.snap(`Step to D[${i}][${j}]: ${ops[ops.length - 1]}.`, [i, j]);
  }
  const edits = ops.reverse().filter((o) => !o.startsWith('keep'));
  R.snap(`Edit distance ${D[m][n]}: ${edits.join(', ') || 'no edits'}.`, null);
  return { snaps: R.snaps, rowLabels: ['ε', ...A.split('')], colLabels: ['ε', ...B.split('')], rowTitle: 'A', colTitle: 'B', answer: `${D[m][n]} (${edits.join(', ')})` };
}

/* ---------------------------------------------------------------- LCS */

export function lcs(A: string, B: string): DPRun {
  const m = A.length;
  const n = B.length;
  const R = new Rec(blank(m + 1, n + 1));
  const L = R.grid as number[][];
  for (let i = 0; i <= m; i++) L[i][0] = 0;
  for (let j = 0; j <= n; j++) L[0][j] = 0;
  R.snap(`L[i][j] is the length of a longest common subsequence of the first i letters of “${A}” and the first j of “${B}”. Row 0 and column 0 are 0 (an empty prefix).`, null, [], 'L[i][0] = L[0][j] = 0');
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) {
        L[i][j] = L[i - 1][j - 1] + 1;
        R.snap(`${A[i - 1]} = ${B[j - 1]}: extend the diagonal by one, ${L[i - 1][j - 1]} + 1 = ${L[i][j]}.`, [i, j], [{ r: i - 1, c: j - 1, chosen: true, label: '+1' }], `L[${i}][${j}] = L[${i - 1}][${j - 1}] + 1 = ${L[i][j]}`);
      } else {
        const up = L[i - 1][j];
        const left = L[i][j - 1];
        L[i][j] = Math.max(up, left);
        R.snap(`${A[i - 1]} ≠ ${B[j - 1]}: drop one of them and take the better, max(${up}, ${left}) = ${L[i][j]}.`, [i, j], [
          { r: i - 1, c: j, chosen: up >= left, label: 'drop A' },
          { r: i, c: j - 1, chosen: left > up, label: 'drop B' },
        ], `L[${i}][${j}] = \\max(L[${i - 1}][${j}], L[${i}][${j - 1}]) = \\max(${up}, ${left}) = ${L[i][j]}`);
      }
    }
  let i = m;
  let j = n;
  const out: string[] = [];
  R.path = [[i, j]];
  R.snap(`Traceback from L[${m}][${n}] = ${L[m][n]}: diagonal steps on equal letters collect the subsequence.`, [m, n]);
  while (i > 0 && j > 0) {
    if (A[i - 1] === B[j - 1]) {
      out.push(A[i - 1]);
      i--;
      j--;
      R.path.push([i, j]);
      R.snap(`${A[i]} matches: it is in the LCS. Step diagonally.`, [i, j]);
    } else if (L[i - 1][j] >= L[i][j - 1]) {
      i--;
      R.path.push([i, j]);
      R.snap(`Letters differ: step up (the value came from there).`, [i, j]);
    } else {
      j--;
      R.path.push([i, j]);
      R.snap(`Letters differ: step left (the value came from there).`, [i, j]);
    }
  }
  const s = out.reverse().join('');
  R.snap(`An LCS is “${s}”, length ${L[m][n]}.`, null);
  return { snaps: R.snaps, rowLabels: ['ε', ...A.split('')], colLabels: ['ε', ...B.split('')], rowTitle: 'A', colTitle: 'B', answer: `“${s}” (length ${L[m][n]})` };
}

/* ---------------------------------------------------------------- knapsack */

export function knapsack(w: number[], v: number[], W: number, letter = 'K'): DPRun {
  const N = (i: number | string, c: number | string) => (letter === 'K' ? `K[${i}][${c}]` : `${letter}${sub(i)}(${c})`);
  const T = (i: number | string, c: number | string) => (letter === 'K' ? `K[${i}][${c}]` : `${letter}_{${i}}(${c})`);
  const n = w.length;
  const R = new Rec(blank(n + 1, W + 1));
  const K = R.grid as number[][];
  for (let c = 0; c <= W; c++) K[0][c] = 0;
  R.snap(`${N('i', 'c')} is the best value using items 1..i with capacity c. Row 0 (no items) is all 0.`, null, [], T(0, 'c') + ' = 0');
  for (let i = 1; i <= n; i++)
    for (let c = 0; c <= W; c++) {
      const skip = K[i - 1][c];
      if (w[i - 1] > c) {
        K[i][c] = skip;
        R.snap(`Item ${i} (weight ${w[i - 1]}) does not fit in capacity ${c}: copy ${N(i - 1, c)} = ${skip}.`, [i, c], [{ r: i - 1, c, chosen: true, label: 'skip' }], `${T(i, c)} = ${T(i - 1, c)} = ${skip}\\quad (w_{${i}} = ${w[i - 1]} > ${c})`);
      } else {
        const take = v[i - 1] + K[i - 1][c - w[i - 1]];
        K[i][c] = Math.max(skip, take);
        R.snap(`Item ${i}: skip it (${skip}) or take it, value ${v[i - 1]} plus the best for the remaining capacity ${c - w[i - 1]}: ${v[i - 1]} + ${K[i - 1][c - w[i - 1]]} = ${take}. Best ${K[i][c]}.`, [i, c], [
          { r: i - 1, c, chosen: skip >= take, label: 'skip' },
          { r: i - 1, c: c - w[i - 1], chosen: take > skip, label: `+${v[i - 1]}` },
        ], `${T(i, c)} = \\max(${T(i - 1, c)},\\ ${v[i - 1]} + ${T(i - 1, c - w[i - 1])}) = \\max(${skip}, ${take}) = ${K[i][c]}`);
      }
    }
  let c = W;
  const taken: number[] = [];
  R.path = [[n, W]];
  R.snap(`Traceback from ${N(n, W)} = ${K[n][W]}: if a value differs from the cell above, that item was taken.`, [n, W]);
  for (let i = n; i >= 1; i--) {
    if (K[i][c] !== K[i - 1][c]) {
      taken.push(i);
      c -= w[i - 1];
      R.path.push([i - 1, c]);
      R.snap(`${N(i, c + w[i - 1])} ≠ ${N(i - 1, c + w[i - 1])}: item ${i} was taken; capacity drops by ${w[i - 1]} to ${c}.`, [i - 1, c]);
    } else {
      R.path.push([i - 1, c]);
      R.snap(`${N(i, c)} = ${N(i - 1, c)}: item ${i} was not needed.`, [i - 1, c]);
    }
  }
  taken.reverse();
  const tw = taken.reduce((s, i) => s + w[i - 1], 0);
  R.snap(`Take items ${taken.join(', ') || 'none'}: weight ${tw} ≤ ${W}, value ${K[n][W]}. ${n + 1}·${W + 1} cells, O(nW): pseudo-polynomial.`, null);
  return {
    snaps: R.snaps,
    rowLabels: ['0', ...w.map((_, i) => `${i + 1}`)],
    colLabels: Array.from({ length: W + 1 }, (_, i) => String(i)),
    rowTitle: 'item (w, v)',
    colTitle: 'capacity c',
    topLabels: undefined,
    answer: `value ${K[n][W]} with items ${taken.join(', ')}`,
  };
}

/* ---------------------------------------------------------------- coin change */

export function coinChange(coins: number[], amount: number): DPRun {
  const R = new Rec(blank(1, amount + 1));
  const C = R.grid[0];
  const choice: number[] = Array(amount + 1).fill(0);
  C[0] = 0;
  R.snap(`C[a] is the fewest coins from {${coins.join(', ')}} that make a. C[0] = 0.`, [0, 0], [], 'C(0) = 0');
  for (let a = 1; a <= amount; a++) {
    let best = INF;
    let bc = 0;
    const deps: Dep[] = [];
    const parts: string[] = [];
    for (const c of coins) {
      if (c > a) continue;
      const prev = C[a - c] as number;
      parts.push(`C(${a - c}){+}1`);
      deps.push({ r: 0, c: a - c, chosen: false, label: `${c}` });
      if (prev + 1 < best) {
        best = prev + 1;
        bc = c;
      }
    }
    C[a] = best;
    choice[a] = bc;
    for (const d of deps) d.chosen = Number(d.label) === bc;
    const vals = coins.filter((c) => c <= a).map((c) => show((C[a - c] as number) + 1));
    R.snap(best === INF ? `No coin fits into ${a}: impossible, C[${a}] = ∞.` : `Last coin c ∈ {${coins.filter((c) => c <= a).join(', ')}}: 1 + C[${a} − c]. Best is coin ${bc}: C[${a}] = ${best}.`, [0, a], deps, deps.length ? `C(${a}) = \\min(${parts.join(',\\ ')}) = \\min(${vals.join(', ')}) = ${show(best)}` : `C(${a}) = \\infty`);
  }
  const used: number[] = [];
  let a = amount;
  R.path = [[0, a]];
  if (C[amount] === INF) {
    R.snap(`${amount} cannot be made from these coins.`, null);
    return { snaps: R.snaps, rowLabels: ['C'], colLabels: Array.from({ length: amount + 1 }, (_, i) => String(i)), rowTitle: '', colTitle: 'amount a', answer: 'impossible' };
  }
  R.snap(`Traceback: follow the winning coin from ${amount} back to 0.`, [0, a]);
  while (a > 0) {
    used.push(choice[a]);
    a -= choice[a];
    R.path.push([0, a]);
    R.snap(`Use a ${used[used.length - 1]}: ${a} left.`, [0, a]);
  }
  R.snap(`${amount} = ${used.join(' + ')}: ${used.length} coins.${greedyNote(coins, amount, used.length)}`, null);
  return { snaps: R.snaps, rowLabels: ['C'], colLabels: Array.from({ length: amount + 1 }, (_, i) => String(i)), rowTitle: '', colTitle: 'amount a', answer: `${used.length} coins: ${used.join(' + ')}` };
}

function greedyNote(coins: number[], amount: number, opt: number): string {
  const cs = coins.slice().sort((x, y) => y - x);
  let a = amount;
  const g: number[] = [];
  for (const c of cs)
    while (a >= c) {
      a -= c;
      g.push(c);
    }
  if (a !== 0) return ' Largest-coin-first greedy gets stuck here.';
  return g.length > opt ? ` Largest-coin-first greedy would use ${g.length} (${g.join(' + ')}).` : ' Greedy happens to agree here.';
}

/* ---------------------------------------------------------------- LIS */

export function lis(a: number[]): DPRun {
  const n = a.length;
  const R = new Rec(blank(1, n));
  const L = R.grid[0];
  const prev: number[] = Array(n).fill(-1);
  R.snap(`L[i] is the length of the longest increasing subsequence that ends at a[i]. Each L[i] looks at every earlier j with a[j] < a[i].`);
  for (let i = 0; i < n; i++) {
    let best = 1;
    let bj = -1;
    const deps: Dep[] = [];
    for (let j = 0; j < i; j++)
      if (a[j] < a[i]) {
        deps.push({ r: 0, c: j, chosen: false });
        if ((L[j] as number) + 1 > best) {
          best = (L[j] as number) + 1;
          bj = j;
        }
      }
    L[i] = best;
    prev[i] = bj;
    for (const d of deps) d.chosen = d.c === bj;
    R.snap(deps.length ? `a[${i}] = ${a[i]}: the earlier smaller values are at ${deps.map((d) => d.c).join(', ')}. Extend the longest of them: L[${i}] = 1 + L[${bj}] = ${best}.` : `a[${i}] = ${a[i]}: nothing earlier is smaller, so L[${i}] = 1.`, [0, i], deps, deps.length ? `L[${i}] = 1 + \\max_{j<${i},\\ a_j<a_{${i}}} L[j] = 1 + ${best - 1} = ${best}` : `L[${i}] = 1`);
  }
  let end = 0;
  for (let i = 1; i < n; i++) if ((L[i] as number) > (L[end] as number)) end = i;
  const seq: number[] = [];
  R.path = [];
  for (let i = end; i >= 0; i = prev[i]) {
    seq.push(a[i]);
    R.path.push([0, i]);
    R.snap(`Traceback: ${a[i]} at index ${i}${prev[i] >= 0 ? `, which extended index ${prev[i]}` : ', the start of the subsequence'}.`, [0, i]);
  }
  seq.reverse();
  R.snap(`Longest increasing subsequence: ${seq.join(', ')} (length ${L[end]}). O(n²) as written.`, null);
  return { snaps: R.snaps, rowLabels: ['L'], colLabels: Array.from({ length: n }, (_, i) => String(i)), rowTitle: '', colTitle: 'i', topLabels: a.map(String), answer: `${seq.join(', ')} (length ${L[end]})` };
}
