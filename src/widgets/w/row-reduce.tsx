/**
 * row-reduce: row reduction you drive yourself. Choose a row operation (swap, scale, add a
 * multiple of one row to another); the widget does the arithmetic exactly in fractions (or
 * rounded to a few significant digits), keeps a history with undo, highlights pivots, says when
 * the matrix is in echelon or reduced echelon form and reads off the solution set. "Next step"
 * performs the next step of standard elimination.
 *
 * Modes:
 *   solve    an augmented matrix [A | b] (or a plain matrix with aug = 0, solving Ax = 0)
 *   inverse  [A | I]: Gauss-Jordan elimination; when the left block is I the right block is A^-1
 *   lu       elimination recorded as P A = L U: only "subtract l times row j from row i" (j above i)
 *            and swaps; the multipliers appear in L
 *
 * Params:
 *   A         matrix (rows) of numbers; decimals are read exactly (0.1 = 1/10)
 *             default [[1, 2, -1, 3], [2, 5, 1, 14], [-1, 1, 4, 9]]
 *   mode      "solve" | "inverse" | "lu"                               default "solve"
 *   aug       columns to the right of the bar (solve mode)             default 1
 *   vars      variable names, e.g. ["x", "y", "z"]                      default x1, x2, ...
 *   free      names for the free parameters, e.g. ["c_1", "c_2"]       default t (one) or s, t, u, ...
 *   digits    round every result to this many significant digits (omit for exact fractions)
 *   pivoting  "none" | "partial": the rule "Next step" uses             default "none"
 *   pivotToggle  show a switch between the two pivoting rules           default false
 *   target    "echelon" | "rref": where "Next step" stops (solve/inverse) default "rref" ("echelon" in lu)
 *   b         right-hand side to solve with L and U once they are found (lu mode)
 *   forward   name of the intermediate vector in L c = b                default "c"
 *   unknown   name of the unknown in U x = c                            default "x"
 *   det       show the determinant bookkeeping (pivots, swaps, scalings) default false
 *   name      matrix letter                                             default "A"
 *   title     string                                                    default "Row reduction"
 *   caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, matrix as readMatrix, num as readNum, numArray, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Note, Segmented, Tex, Toggle } from '../kit/controls';
import { fracField, roundField, type Field } from '../kit/la-core';
import { MatrixEditor } from '../kit/la-ui';
import { applyOp, initState, lead, nextStep, shape, solutionSet, suggestAdd, suggestScale, upperTriangular, type Op, type RRState } from '../kit/la-rowreduce';

type Mode = 'solve' | 'inverse' | 'lu';

export default function RowReduce({ params }: WidgetProps) {
  const digits = params.digits === undefined ? null : Math.round(readNum(params, 'digits', 3));
  if (digits !== null && (digits < 1 || digits > 15)) throw new Error('parameter "digits" should be between 1 and 15');
  const F = useMemo(() => (digits === null ? fracField : roundField(digits)), [digits]) as Field<unknown>;
  return <RowReduceInner params={params} F={F} />;
}

function RowReduceInner<T>({ params, F }: { params: Record<string, unknown>; F: Field<T> }) {
  const mode = oneOf(params, 'mode', ['solve', 'inverse', 'lu'] as const, 'solve') as Mode;
  const Aparam = readMatrix(params, 'A', [
    [1, 2, -1, 3],
    [2, 5, 1, 14],
    [-1, 1, 4, 9],
  ]);
  const editable = bool(params, 'editable', true);
  const [Araw, setAraw] = useState(Aparam);
  const [editing, setEditing] = useState(false);
  const m = Araw.length;
  if (m > 5 || Araw[0].length > 8) throw new Error('row-reduce supports at most 5 rows and 8 columns');
  const aug = mode === 'inverse' ? m : mode === 'lu' ? 0 : Math.round(readNum(params, 'aug', 1));
  if (mode === 'inverse' && Araw[0].length !== m) throw new Error('inverse mode needs a square matrix A');
  if (mode === 'lu' && Araw[0].length !== m) throw new Error('lu mode needs a square matrix A');
  if (aug < 0 || aug >= Araw[0].length + (mode === 'inverse' ? m : 0)) throw new Error('parameter "aug" is out of range');
  const full = mode === 'inverse' ? Araw.map((r, i) => [...r, ...Array.from({ length: m }, (_, j) => (i === j ? 1 : 0))]) : Araw;
  const n = full[0].length;
  const nCoef = n - aug;
  const vars = strArray(params, 'vars', Array.from({ length: nCoef }, (_, j) => `x_${j + 1}`));
  const name = str(params, 'name', 'A');
  const target = oneOf(params, 'target', ['echelon', 'rref'] as const, mode === 'lu' ? 'echelon' : 'rref');
  const showDet = bool(params, 'det', false);
  const pivotToggle = bool(params, 'pivotToggle', false);
  const bVec = params.b === undefined ? null : numArray(params, 'b', []);
  if (bVec && bVec.length !== m) throw new Error('parameter "b" should have one entry per row');

  const start = useMemo(() => initState(F, full.map((r) => r.map((x) => F.fromNumber(x))), mode === 'lu'), [F, JSON.stringify(full), mode]); // eslint-disable-line react-hooks/exhaustive-deps
  const [hist, setHist] = useState<{ s: RRState<T>; tex: string; changed: number[] }[]>([]);
  const [partial, setPartial] = useState(oneOf(params, 'pivoting', ['none', 'partial'] as const, 'none') === 'partial');
  const cur = hist.length ? hist[hist.length - 1].s : start;
  const M = cur.M;
  const changed = hist.length ? hist[hist.length - 1].changed : [];

  const [kind, setKind] = useState<Op<T>['kind']>(mode === 'lu' ? 'add' : 'add');
  const [ri, setRi] = useState(1);
  const [rj, setRj] = useState(0);
  const [cText, setCText] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  // Keep the multiplier field filled with the value that clears / normalises, as a suggestion.
  const suggestion = kind === 'add' ? suggestAdd(F, M, ri, rj) : kind === 'scale' ? suggestScale(F, M, ri) : null;
  const sugText = suggestion === null ? '' : F.text(mode === 'lu' && kind === 'add' ? F.neg(suggestion) : suggestion).replace(/\u2212/g, '-');
  const [lastSug, setLastSug] = useState('');
  if (sugText !== lastSug) {
    setLastSug(sugText);
    setCText(sugText);
  }

  const doOp = (op: Op<T>) => {
    const r = applyOp(F, cur, op);
    if ('error' in r) return setMsg(r.error);
    setMsg(null);
    setHist((h) => [...h, { s: r, tex: opTex(F, op, mode === 'lu'), changed: op.kind === 'swap' ? [op.i, op.j] : [op.i] }]);
  };
  const apply = () => {
    if (kind === 'swap') return doOp({ kind: 'swap', i: ri, j: rj });
    const c = F.parse(cText);
    if (c === null) return setMsg('Type a number or a fraction such as -3/2.');
    if (kind === 'scale') return doOp({ kind: 'scale', i: ri, c });
    doOp({ kind: 'add', i: ri, j: rj, c: mode === 'lu' ? F.neg(c) : c });
  };
  const auto = () => {
    const op = nextStep(F, M, mode === 'inverse' ? m : nCoef, { partial, rref: mode !== 'lu' && target === 'rref' });
    if (!op) return setMsg(mode === 'lu' ? 'Elimination is finished: U is upper triangular.' : target === 'rref' ? 'Already in reduced echelon form.' : 'Already in echelon form.');
    doOp(op);
  };

  const sh = shape(F, M);
  const coefLeads = M.map((r) => lead(F, r, mode === 'inverse' ? m : nCoef));
  const ops: { value: Op<T>['kind']; label: string }[] =
    mode === 'lu'
      ? [
          { value: 'add', label: 'Subtract ℓ × row' },
          { value: 'swap', label: 'Swap rows' },
        ]
      : [
          { value: 'add', label: 'Add c × row' },
          { value: 'scale', label: 'Scale row' },
          { value: 'swap', label: 'Swap rows' },
        ];
  const rowSel = (v: number, set: (k: number) => void, label: string) => (
    <select aria-label={label} value={v} onChange={(e) => set(Number(e.target.value))} className="rounded-md border border-line bg-surface px-1.5 py-1 font-mono text-[13px] text-ink">
      {M.map((_, k) => (
        <option key={k} value={k}>
          R{k + 1}
        </option>
      ))}
    </select>
  );
  const cInput = (
    <input
      aria-label={kind === 'scale' ? 'scale factor c' : mode === 'lu' ? 'multiplier l' : 'multiplier c'}
      value={cText}
      onChange={(e) => setCText(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && apply()}
      spellCheck={false}
      autoComplete="off"
      className={`w-20 rounded-md border bg-surface px-1.5 py-1 text-center font-mono text-[13px] text-ink ${cText.trim() && F.parse(cText) === null ? 'border-rose-500' : 'border-line'}`}
    />
  );

  return (
    <Frame title={str(params, 'title', mode === 'lu' ? 'Elimination as A = LU' : mode === 'inverse' ? 'Inverse by Gauss-Jordan' : 'Row reduction')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <MatrixTable F={F} M={M} aug={aug} leads={sh.echelon || mode === 'lu' ? sh.leads : coefLeads} changed={changed} pivotsOk={sh.echelon} lu={mode === 'lu'} />

      {mode === 'lu' && cur.L && <LUPanel F={F} L={cur.L} U={M} perm={cur.perm} name={name} done={upperTriangular(F, M)} b={bVec} fwd={str(params, 'forward', 'c')} unk={str(params, 'unknown', 'x')} />}

      <div className="space-y-2 rounded-lg border border-line bg-surface-2/50 p-2.5">
        <Segmented options={ops} value={kind} onChange={(k) => (setKind(k), setMsg(null))} />
        <div className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-2">
          {kind === 'swap' && (
            <>
              {rowSel(ri, setRi, 'first row')} <span aria-hidden>↔</span> {rowSel(rj, setRj, 'second row')}
            </>
          )}
          {kind === 'scale' && (
            <>
              {rowSel(ri, setRi, 'row to scale')} <span>→</span> {cInput} <span>× R{ri + 1}</span>
            </>
          )}
          {kind === 'add' && (
            <>
              {rowSel(ri, setRi, 'row to change')} <span>→ R{ri + 1} {mode === 'lu' ? '−' : '+'}</span> {cInput} <span>×</span> {rowSel(rj, setRj, 'row to add')}
            </>
          )}
          <Button primary onClick={apply}>
            Apply
          </Button>
        </div>
        {kind !== 'swap' && suggestion !== null && (
          <div className="text-xs text-ink-3">
            {kind === 'add' ? `Filled in: the ${mode === 'lu' ? 'multiplier ℓ' : 'value of c'} that makes R${ri + 1} zero under the leading entry of R${rj + 1}.` : `Filled in: the factor that makes the leading entry of R${ri + 1} equal to 1.`} You can type another.
          </div>
        )}
        <div className="flex flex-wrap items-center gap-1.5">
          <Button onClick={auto} title="Do the next step of standard elimination">
            Next step
          </Button>
          <Button onClick={() => (setHist((h) => h.slice(0, -1)), setMsg(null))} disabled={!hist.length}>
            Undo
          </Button>
          <Button onClick={() => (setHist([]), setMsg(null))} disabled={!hist.length}>
            Reset
          </Button>
          {editable && (
            <Button onClick={() => setEditing((e) => !e)} title="Type your own matrix">
              {editing ? 'Done editing' : 'Edit matrix'}
            </Button>
          )}
          {pivotToggle && <Toggle label="Partial pivoting in Next step" checked={partial} onChange={setPartial} />}
        </div>
      </div>
      {msg && <Note tone="warn">{msg}</Note>}
      {editing && (
        <div className="space-y-2 rounded-lg border border-line p-2.5">
          <MatrixEditor
            A={Araw}
            name={mode === 'inverse' ? name : mode === 'lu' ? name : aug > 0 ? `[${name} | b]` : name}
            onChange={(i, j, v) => {
              setAraw((M0) => M0.map((r, a) => r.map((x, b) => (a === i && b === j ? v : x))));
              setHist([]);
              setMsg(null);
            }}
          />
          <div className="text-xs text-ink-3">Type numbers or fractions such as 3/2 (decimals are read exactly). Editing restarts the reduction{aug > 0 && mode === 'solve' ? '; the last column is the right-hand side' : ''}.</div>
          <div className="flex gap-1.5">
            <Button onClick={() => (setAraw(Aparam), setHist([]))}>Lesson's matrix</Button>
          </div>
        </div>
      )}

      <Status F={F} M={M} mode={mode} nCoef={mode === 'inverse' ? m : nCoef} aug={aug} vars={vars} name={name} sh={sh} freeNames={params.free === undefined ? null : strArray(params, 'free', [])} />
      {showDet && <DetPanel F={F} s={cur} name={name} />}
      {!F.exact && <Note>Every result is rounded to {String(params.digits)} significant digits, like a short calculator.</Note>}

      {hist.length > 0 && (
        <details className="text-[13px] text-ink-2" open={hist.length <= 8}>
          <summary className="cursor-pointer select-none">Steps so far ({hist.length})</summary>
          <ol className="mt-1 list-decimal space-y-0.5 pl-6">
            {hist.map((h, k) => (
              <li key={k}>
                <Tex>{h.tex}</Tex>
              </li>
            ))}
          </ol>
        </details>
      )}
    </Frame>
  );
}

function coefTex<T>(F: Field<T>, c: T, signFirst: boolean): string {
  // "+ 2R_1", "- \tfrac12 R_1", "+ R_1"
  const neg = F.toNumber(c) < 0;
  const a = neg ? F.neg(c) : c;
  const s = F.tex(a);
  const body = F.eq(a, F.one) ? '' : s.includes('\\times') ? `(${s})` : s;
  return signFirst ? `${neg ? '-' : '+'} ${body}` : `${neg ? '-' : ''}${body}`;
}

function opTex<T>(F: Field<T>, op: Op<T>, lu: boolean): string {
  const R = (k: number) => `R_{${k + 1}}`;
  if (op.kind === 'swap') return `${R(op.i)} \\leftrightarrow ${R(op.j)}`;
  if (op.kind === 'scale') return `${R(op.i)} \\to ${coefTex(F, op.c, false)}${R(op.i)}`;
  if (lu) {
    const l = F.neg(op.c);
    return `${R(op.i)} \\to ${R(op.i)} - \\ell_{${op.i + 1}${op.j + 1}}${R(op.j)},\\quad \\ell_{${op.i + 1}${op.j + 1}} = ${F.tex(l)}`;
  }
  return `${R(op.i)} \\to ${R(op.i)} ${coefTex(F, op.c, true)}${R(op.j)}`;
}

function MatrixTable<T>({ F, M, aug, leads, changed, pivotsOk, lu }: { F: Field<T>; M: T[][]; aug: number; leads: number[]; changed: number[]; pivotsOk: boolean; lu: boolean }) {
  const n = M[0].length;
  return (
    <div className="overflow-x-auto py-1">
      <div className="mx-auto flex w-max items-stretch gap-1.5" role="group" aria-label={lu ? 'The matrix U being eliminated' : 'The matrix being reduced'}>
        <div className="flex flex-col justify-around py-1">
          {M.map((_, i) => (
            <div key={i} className="flex h-9 items-center font-mono text-xs text-ink-3">
              R{i + 1}
            </div>
          ))}
        </div>
        <div className="relative px-2 py-1">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 rounded-l border-y-2 border-l-2 border-ink-2" />
          <span aria-hidden className="absolute inset-y-0 right-0 w-1.5 rounded-r border-y-2 border-r-2 border-ink-2" />
          <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, auto)` }}>
            {M.map((row, i) =>
              row.map((a, j) => {
                const piv = leads[i] === j;
                return (
                  <div key={`${i}-${j}`} className={`flex h-9 items-center justify-center px-1 text-[15px] ${changed.includes(i) ? 'bg-accent/10' : ''} ${j === n - aug && aug > 0 ? 'ml-1 border-l-2 border-ink-3 pl-2' : ''}`}>
                    <span className={`inline-block min-w-9 rounded-md px-1 py-0.5 text-center ${piv ? (pivotsOk ? 'bg-accent/20 ring-1 ring-accent' : 'ring-1 ring-ink-3') : ''} ${F.isZero(a) ? 'text-ink-3' : 'text-ink'}`}>
                      <Tex>{F.tex(a)}</Tex>
                    </span>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function texMat<T>(F: Field<T>, M: T[][]): string {
  return `\\begin{bmatrix} ${M.map((r) => r.map((a) => F.tex(a)).join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
}

function LUPanel<T>({ F, L, U, perm, name, done, b, fwd, unk }: { F: Field<T>; L: T[][]; U: T[][]; perm: number[]; name: string; done: boolean; b: number[] | null; fwd: string; unk: string }) {
  const m = L.length;
  const swapped = perm.some((p, i) => p !== i);
  const P = perm.map((p) => Array.from({ length: m }, (_, j) => (j === p ? F.one : F.zero)));
  let solveTex = '';
  if (done && b && U.every((r, i) => !F.isZero(r[i]))) {
    const pb = perm.map((p) => F.fromNumber(b[p]));
    const c: T[] = [];
    for (let i = 0; i < m; i++) {
      let s = pb[i];
      for (let k = 0; k < i; k++) s = F.sub(s, F.mul(L[i][k], c[k]));
      c.push(s);
    }
    const x: T[] = new Array(m).fill(F.zero);
    for (let i = m - 1; i >= 0; i--) {
      let s = c[i];
      for (let k = i + 1; k < m; k++) s = F.sub(s, F.mul(U[i][k], x[k]));
      x[i] = F.div(s, U[i][i]);
    }
    const col = (v: T[]) => `\\begin{bmatrix} ${v.map((a) => F.tex(a)).join(' \\\\ ')} \\end{bmatrix}`;
    solveTex = `L${fwd} = ${swapped ? 'Pb' : 'b'}:\\ ${fwd} = ${col(c)},\\qquad U${unk} = ${fwd}:\\ ${unk} = ${col(x)}`;
  }
  return (
    <div className="space-y-1 overflow-x-auto rounded-lg border border-line px-2 py-1.5 text-sm">
      <Tex display>{`${swapped ? `P${name}` : name} = LU,\\qquad L = ${texMat(F, L)},\\quad U = ${texMat(F, U)}${swapped ? `,\\quad P = ${texMat(F, P)}` : ''}`}</Tex>
      {done ? (
        <div className="text-[13px] text-emerald-700 dark:text-emerald-300">U is upper triangular, so the factorisation is complete: multiply L and U to get {swapped ? `P${name}` : name} back.</div>
      ) : (
        <div className="text-[13px] text-ink-3">Each multiplier ℓᵢⱼ you use is written into L at row i, column j. L times the current U always equals {swapped ? `P${name}` : name}.</div>
      )}
      {solveTex && <Tex display>{solveTex}</Tex>}
    </div>
  );
}

function Status<T>({ F, M, mode, nCoef, aug, vars, name, sh, freeNames }: { F: Field<T>; M: T[][]; mode: Mode; nCoef: number; aug: number; vars: string[]; name: string; sh: { echelon: boolean; rref: boolean; leads: number[] }; freeNames: string[] | null }) {
  if (mode === 'lu') return null;
  const form = sh.rref ? 'reduced echelon form' : sh.echelon ? 'echelon form' : null;
  if (!form) return <Note>Not yet in echelon form: each row's first non-zero entry (outlined) must sit to the right of the one above, with zero rows at the bottom.</Note>;
  if (mode === 'inverse') {
    const m = M.length;
    const left = M.map((r) => r.slice(0, m));
    const right = M.map((r) => r.slice(m));
    const isI = left.every((r, i) => r.every((a, j) => (i === j ? F.eq(a, F.one) : F.isZero(a))));
    if (isI) return <Note tone="good"><span>The left block is I, so the right block is {name}⁻¹: </span><Tex>{`${name}^{-1} = ${texMat(F, right)}`}</Tex></Note>;
    const pivots = left.filter((r) => r.some((a) => !F.isZero(a))).length;
    if (pivots < m) return <Note tone="warn">The left block has only {pivots} pivot{pivots === 1 ? '' : 's'}, so {name} is not invertible.</Note>;
    return <Note>Echelon form with {m} pivots, so {name} is invertible. Keep going (scale each pivot to 1 and clear above it) until the left block is I.</Note>;
  }
  const sol = solutionSet(F, M, nCoef);
  const pivCount = sh.leads.filter((l) => l >= 0 && l < nCoef).length;
  if (sol.kind === 'none')
    return (
      <Note tone="warn">
        {cap(form)}. Row {sol.row + 1} reads 0 = {F.text(M[sol.row][nCoef])}, so the system is inconsistent: no solution.
      </Note>
    );
  const params = freeNames ?? ['s', 't', 'u', 'v', 'w'];
  const pName = (k: number) => (sol.free.length === 1 && !freeNames ? 't' : params[k] ?? `t_${k + 1}`);
  const expr = (j: number) => {
    const fk = sol.free.indexOf(j);
    if (fk >= 0) return pName(fk);
    let s = F.isZero(sol.particular[j]) ? '' : F.tex(sol.particular[j]);
    sol.nullBasis.forEach((v, k) => {
      const c = v[j];
      if (F.isZero(c)) return;
      const t = coefTex(F, c, s !== '');
      s += `${s ? ' ' : ''}${t}${pName(k)}`;
    });
    return s || '0';
  };
  const tex = Array.from({ length: nCoef }, (_, j) => `${vars[j] ?? `x_${j + 1}`} = ${expr(j)}`).join(',\\ ');
  const homog = aug === 0;
  return (
    <Note tone="good">
      <span>
        {cap(form)} with {pivCount} pivot{pivCount === 1 ? '' : 's'}.{' '}
        {sol.free.length === 0 ? (homog ? 'No free variables, so Ax = 0 has only x = 0.' : 'No free variables, so the solution is unique: ') : `${sol.free.length} free variable${sol.free.length > 1 ? 's' : ''} (${sol.free.map((f) => vars[f]?.replace(/_/g, '') ?? f).join(', ')}), so there are infinitely many solutions: `}
      </span>
      {!(homog && sol.free.length === 0) && <Tex>{tex}</Tex>}
      {!sh.rref && sol.free.length === 0 && <span className="block text-xs text-ink-3">(Back substitution from this echelon form; reduce further to read it off directly.)</span>}
    </Note>
  );
}

function DetPanel<T>({ F, s, name }: { F: Field<T>; s: RRState<T>; name: string }) {
  const M = s.M;
  const m = M.length;
  if (M[0].length < m) return null;
  const tri = M.every((r, i) => r.slice(0, i).every((a) => F.isZero(a)));
  const sign = s.swaps % 2 ? '-' : '';
  if (!tri) return <Note>Row swaps so far: {s.swaps} (each flips the sign of the determinant). Adding a multiple of a row changes nothing.</Note>;
  let prod = F.one;
  for (let i = 0; i < m; i++) prod = F.mul(prod, M[i][i]);
  const det = F.div(s.swaps % 2 ? F.neg(prod) : prod, s.detScale);
  const pivots = M.map((r, i) => F.tex(r[i])).join(' \\cdot ');
  const scaled = !F.eq(s.detScale, F.one);
  return (
    <Note tone="good">
      <Tex>{`\\det ${name} = ${sign}${scaled ? `\\frac{1}{${F.tex(s.detScale)}}\\,` : ''}(${pivots}) = ${F.tex(det)}`}</Tex>
      <span className="block text-xs text-ink-3">
        Triangular: the determinant is the product of the diagonal, times (−1) for each of the {s.swaps} swap{s.swaps === 1 ? '' : 's'}{scaled ? ', divided by the scale factors used' : ''}.
      </span>
    </Note>
  );
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
