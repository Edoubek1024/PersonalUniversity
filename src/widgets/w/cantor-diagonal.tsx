/**
 * cantor-diagonal: two pictures of infinite sets.
 *  - "diagonal": a list of infinite binary (or decimal) sequences, the first rows editable. Step
 *    builds the diagonal sequence d one position at a time, showing that d differs from row k at
 *    position k. "Add d to the list" puts d at the top, and the argument defeats the new list too.
 *  - "pairing": a grid of N × N (or of fractions a/b) walked diagonal by diagonal, so each cell
 *    gets a finite position; alternative orders show a listing that never reaches row 2, and the
 *    bijection g(m, n) = 2^(m−1)(2n − 1).
 *
 * Params:
 *   mode     "diagonal" | "pairing"                                         default "diagonal"
 *   modes    string[]  modes offered as tabs                                default [mode]
 *   digits   "binary" | "decimal"   diagonal mode: kind of sequence         default "binary"
 *   start    0 | 1     index of the first row / position / natural number   default 0
 *   rows     number    rows shown in diagonal mode (4 to 10)               default 8
 *   editable number    how many leading rows the learner can edit           default 4
 *   set      "pairs" | "rationals"   pairing mode: what the grid holds      default "pairs"
 *   order    "diagonal" | "rows" | "power2"   pairing mode: the listing     default "diagonal"
 *   orders   string[]  listings offered                                     default [order]
 *   size     number    pairing grid size (4 to 8)                           default 6
 *   title    string                                                         default by mode
 *   caption  string
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Note, Segmented, Slider, Tex } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { gcd } from '../kit/num';

type Mode = 'diagonal' | 'pairing';
type Order = 'diagonal' | 'rows' | 'power2';
const COLS_EXTRA = 2;

// Default listings: a mixture of patterns, so the diagonal is not obvious in advance.
const PI_BITS = '0010010000111111011010101000100010000101101000110000100011010011';
const BIN_ROWS: ((j: number) => number)[] = [
  () => 0,
  () => 1,
  (j) => j % 2,
  (j) => (j % 4 < 2 ? 0 : 1),
  (j) => +PI_BITS[j % PI_BITS.length],
  (j) => ([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31].includes(j) ? 1 : 0),
  (j) => (j % 3 === 0 ? 1 : 0),
  (j) => ((j * j + 1) % 5 < 2 ? 1 : 0),
  (j) => (j < 5 ? 1 : 0),
  (j) => (j % 5 === 2 ? 0 : 1),
];
const DEC_STRINGS = ['50000000000000', '33333333333333', '14159265358979', '71828182845904', '14285714285714', '41421356237309', '25000000000000', '61803398874989', '57721566490153', '12345678910111'];
const DEC_ROWS: ((j: number) => number)[] = DEC_STRINGS.map((s) => (j: number) => +s[j % s.length]);

export default function CantorDiagonal({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', ['diagonal', 'pairing'] as const, 'diagonal');
  const modes = strArray(params, 'modes', [mode0]) as Mode[];
  for (const m of modes) if (m !== 'diagonal' && m !== 'pairing') throw new Error('parameter "modes" may contain only diagonal and pairing');
  const [mode, setMode] = useState<Mode>(mode0);
  const start = num(params, 'start', 0);
  if (start !== 0 && start !== 1) throw new Error('parameter "start" should be 0 or 1');
  const title = str(params, 'title', mode0 === 'diagonal' ? "Cantor's diagonal argument" : 'Listing N × N');
  return (
    <Frame title={title} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && (
        <Segmented
          options={modes.map((m) => ({ value: m, label: m === 'diagonal' ? 'Diagonal argument' : 'Countable pairing' }))}
          value={mode}
          onChange={setMode}
        />
      )}
      {mode === 'diagonal' ? <Diagonal params={params} start={start} /> : <Pairing params={params} start={start} />}
    </Frame>
  );
}

function Diagonal({ params, start }: { params: Record<string, unknown>; start: number }) {
  const digits = oneOf(params, 'digits', ['binary', 'decimal'] as const, 'binary');
  const nRows = num(params, 'rows', 8);
  if (!Number.isInteger(nRows) || nRows < 4 || nRows > 10) throw new Error('parameter "rows" should be a whole number from 4 to 10');
  const nEdit = num(params, 'editable', 4);
  if (!Number.isInteger(nEdit) || nEdit < 0 || nEdit > nRows) throw new Error('parameter "editable" should be a whole number from 0 to rows');
  const base = digits === 'binary' ? BIN_ROWS : DEC_ROWS;
  const nCols = nRows + COLS_EXTRA;
  const dec = digits === 'decimal';

  // `prefix` holds sequences put at the top by "Add d"; `edits` overrides individual cells.
  const [prefix, setPrefix] = useState<number[][]>([]);
  const [edits, setEdits] = useState<Record<string, number>>({});
  const [k, setK] = useState(0); // positions of d revealed
  const rowFn = (i: number) => (j: number): number => {
    const key = `${i},${j}`;
    if (key in edits) return edits[key];
    if (i < prefix.length) return prefix[i][j] ?? 0;
    return base[(i - prefix.length) % base.length](j);
  };
  const flip = (x: number) => (dec ? (x === 5 ? 6 : 5) : 1 - x);
  const grid = Array.from({ length: nRows }, (_, i) => Array.from({ length: nCols }, (_, j) => rowFn(i)(j)));
  const d = Array.from({ length: nRows }, (_, i) => flip(grid[i][i]));
  const idx = (i: number) => i + start;
  const name = dec ? 'x' : 's';
  const dName = dec ? 'y' : 'd';

  const edit = (i: number, j: number) => {
    const v = grid[i][j];
    setEdits((e) => ({ ...e, [`${i},${j}`]: dec ? (v + 1) % 10 : 1 - v }));
    setK(0);
  };
  const addD = () => {
    // Shift all edits down one row; d (extended past the visible diagonal by its rule) goes on top.
    const full = Array.from({ length: nCols + 40 }, (_, j) => (j < nRows ? d[j] : flip(rowFn(j)(j))));
    setPrefix((p) => [full, ...p]);
    setEdits((e) => Object.fromEntries(Object.entries(e).map(([key, v]) => {
      const [i, j] = key.split(',').map(Number);
      return [`${i + 1},${j}`, v];
    })));
    setK(0);
  };
  const reset = () => {
    setPrefix([]);
    setEdits({});
    setK(0);
  };

  const cur = k > 0 ? k - 1 : -1;
  const rule = dec ? `e_i = 5 \\text{ if } d_{ii} \\ne 5, \\text{ else } 6` : `d_i = 1 - s_i(i)`;

  return (
    <div className="space-y-3">
      <div className="text-[13px] text-ink-2">
        {dec ? (
          <>
            A claimed list of every real number in (0, 1). Rule: <Tex>{rule}</Tex>. Tap one of the first {nEdit} rows to change a digit.
          </>
        ) : (
          <>
            A claimed list of every infinite binary sequence. Rule: <Tex>{rule}</Tex>, the opposite of the diagonal bit. Tap a bit in the first {nEdit} rows to flip it.
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="mx-auto my-0 w-auto border-separate [&_td]:border-0 [&_th]:border-0 [&_td]:align-middle [&_th]:align-middle border-spacing-[3px] font-mono text-[13px] tabular-nums">
          <thead>
            <tr>
              <th />
              {Array.from({ length: nCols }, (_, j) => (
                <th key={j} className="w-6 text-center sm:w-7 text-[11px] font-normal text-ink-3">
                  {idx(j)}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {grid.map((row, i) => (
              <tr key={i}>
                <th scope="row" className="whitespace-nowrap pr-1 text-right text-[12px] font-normal text-ink-2">
                  <Tex>{`${name}_{${idx(i)}}${dec ? ' = 0.' : ''}`}</Tex>
                  {i < prefix.length && <span className="ml-1 text-[10px] text-accent">added</span>}
                </th>
                {row.map((v, j) => {
                  const diag = i === j;
                  const revealed = diag && i < k;
                  const now = diag && i === cur;
                  const canEdit = i < nEdit;
                  const style = {
                    background: now ? 'color-mix(in srgb, var(--plot-2) 30%, var(--color-surface))' : diag ? 'color-mix(in srgb, var(--plot-4) 22%, var(--color-surface))' : 'var(--color-surface-2)',
                    borderColor: revealed ? 'var(--plot-2)' : diag ? 'var(--plot-4)' : 'var(--color-line)',
                  };
                  const cls = 'flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded border text-[13px]';
                  return (
                    <td key={j} className="p-0">
                      {canEdit ? (
                        <button type="button" className={`${cls} hover:brightness-110`} style={style} onClick={() => edit(i, j)} aria-label={`Row ${idx(i)}, position ${idx(j)}: ${v}. Change it.`}>
                          {v}
                        </button>
                      ) : (
                        <span className={cls} style={style}>
                          {v}
                        </span>
                      )}
                    </td>
                  );
                })}
                <td className="pl-1 text-ink-3">…</td>
              </tr>
            ))}
            <tr>
              <td className="pt-1 text-center text-ink-3">⋮</td>
            </tr>
            <tr>
              <th scope="row" className="whitespace-nowrap pr-1 pt-1 text-right text-[12px] font-semibold" style={{ color: 'var(--plot-2)' }}>
                <Tex>{`${dName}${dec ? ' = 0.' : ' ='}`}</Tex>
              </th>
              {Array.from({ length: nCols }, (_, j) => (
                <td key={j} className="p-0 pt-1">
                  <span
                    className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded border text-[13px] font-semibold"
                    style={{ borderColor: j < k ? 'var(--plot-2)' : 'var(--color-line)', color: j < k ? 'var(--plot-2)' : 'var(--color-ink-3)', borderStyle: j < k ? 'solid' : 'dashed' }}
                  >
                    {j < k ? d[j] : j < nRows ? '?' : ''}
                  </span>
                </td>
              ))}
              <td className="pl-1 pt-1 text-ink-3">…</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button primary onClick={() => setK((x) => Math.min(nRows, x + 1))} disabled={k >= nRows}>
          Step
        </Button>
        <Button onClick={() => setK(nRows)} disabled={k >= nRows}>
          Show all
        </Button>
        <Button onClick={() => setK(0)} disabled={k === 0}>
          Clear {dName}
        </Button>
        <Button onClick={addD} disabled={k < nRows} title="Put the new sequence at the top of the list">
          Add {dName} to the list
        </Button>
        {(prefix.length > 0 || Object.keys(edits).length > 0) && <Button onClick={reset}>Restore list</Button>}
      </div>
      {cur >= 0 && k < nRows && (
        <Note>
          Position {idx(cur)}: row {name}
          <sub>{idx(cur)}</sub> has {grid[cur][cur]} there, so {dName}
          <sub>{idx(cur)}</sub> = {d[cur]}. Whatever comes later, {dName} ≠ {name}
          <sub>{idx(cur)}</sub>, because they already differ at position {idx(cur)}.
        </Note>
      )}
      {k >= nRows && (
        <Note tone="good">
          {dName} differs from {name}
          <sub>{idx(0)}</sub> at position {idx(0)}, from {name}
          <sub>{idx(1)}</sub> at position {idx(1)}, … and from {name}
          <sub>i</sub> at position i for every i, including the rows below the ones shown. So {dName} is {dec ? 'a number in (0, 1)' : 'an infinite binary sequence'} missing from the list.
          {dec ? ' It uses only the digits 5 and 6, so it has no second decimal expansion that could be hiding in the list.' : ''}
          {prefix.length > 0 ? ` Adding it (${prefix.length} time${prefix.length > 1 ? 's' : ''}) did not help: the new list has a new diagonal.` : ' Try adding it to the list.'}
        </Note>
      )}
    </div>
  );
}

function Pairing({ params, start }: { params: Record<string, unknown>; start: number }) {
  const set = oneOf(params, 'set', ['pairs', 'rationals'] as const, 'pairs');
  const order0 = oneOf(params, 'order', ['diagonal', 'rows', 'power2'] as const, 'diagonal');
  const orders = strArray(params, 'orders', [order0]) as Order[];
  for (const o of orders) if (!['diagonal', 'rows', 'power2'].includes(o)) throw new Error('parameter "orders" may contain only diagonal, rows, power2');
  const size = num(params, 'size', 6);
  if (!Number.isInteger(size) || size < 4 || size > 8) throw new Error('parameter "size" should be a whole number from 4 to 8');
  const [order, setOrder] = useState<Order>(order0);
  const [k, setK] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const acc = useRef(0);
  const rat = set === 'rationals';
  // Fractions need positive numerators and denominators, and g(m, n) is defined on {1, 2, ...}.
  const lo = rat || order === 'power2' ? 1 : start;
  const vals = Array.from({ length: size }, (_, i) => lo + i);

  // The listing as a sequence of cells (row, col) in grid coordinates, long enough to pass the grid.
  const seq = useMemo(() => {
    const out: { r: number; c: number; skip: boolean; inGrid: boolean }[] = [];
    const push = (a: number, b: number) => {
      const r = a - lo;
      const c = b - lo;
      const skip = rat && gcd(a, b) !== 1;
      out.push({ r, c, skip, inGrid: r < size && c < size });
    };
    if (order === 'diagonal') {
      // Cantor's order: by a + b, then by b. Position (0-based) = (a+b)(a+b+1)/2 + b for a, b ≥ 0.
      for (let s = 0; s < 2 * size - 1; s++) for (let c = 0; c <= s; c++) push(lo + s - c, lo + c);
    } else if (order === 'rows') {
      for (let c = 0; c < size + 4; c++) push(lo, lo + c);
    } else {
      // g(m, n) = 2^(m−1)(2n − 1) on N = {1, 2, ...}: visit cells in increasing g.
      const cells: [number, number, number][] = [];
      for (let m = 1; m <= size; m++) for (let n = 1; n <= size; n++) cells.push([2 ** (m - 1) * (2 * n - 1), m, n]);
      cells.sort((x, y) => x[0] - y[0]);
      for (const [, m, n] of cells) push(m - 1 + lo, n - 1 + lo);
    }
    return out;
  }, [order, size, lo, rat]);

  const total = order === 'diagonal' ? size * (size + 1) / 2 : order === 'rows' ? size + 4 : seq.length;
  // Positions: skipped duplicates get no number.
  const posOf = new Map<string, number>();
  let p = start;
  const listed: string[] = [];
  for (let i = 0; i < Math.min(k, seq.length); i++) {
    const s = seq[i];
    if (s.skip) {
      listed.push(`(${vals[s.r]}/${vals[s.c]} skipped)`);
      continue;
    }
    const label = rat ? `${vals[s.r] ?? s.r + lo}/${vals[s.c] ?? s.c + lo}` : `(${s.r + lo}, ${s.c + lo})`;
    if (order === 'power2') {
      const g = 2 ** s.r * (2 * (s.c + 1) - 1);
      posOf.set(`${s.r},${s.c}`, g);
      listed.push(`${g} ↦ ${label}`);
    } else {
      posOf.set(`${s.r},${s.c}`, p);
      listed.push(`${p} ↦ ${label}`);
      p++;
    }
  }
  const last = k > 0 ? seq[k - 1] : null;

  useAnimation(playing, (dt) => {
    acc.current += dt * speed;
    if (acc.current >= 1) {
      acc.current = 0;
      setK((x) => {
        if (x >= total) {
          setPlaying(false);
          return x;
        }
        return x + 1;
      });
    }
  });

  const cellText = (r: number, c: number) => (rat ? `${vals[r]}/${vals[c]}` : `${vals[r]},${vals[c]}`);
  const W = size <= 6 ? 'h-11 w-11 sm:h-12 sm:w-14' : 'h-9 w-9 sm:h-11 sm:w-12';

  return (
    <div className="space-y-3">
      {orders.length > 1 && (
        <Segmented
          label="Listing"
          options={orders.map((o) => ({ value: o, label: o === 'diagonal' ? 'Diagonals' : o === 'rows' ? 'Row by row (broken)' : 'g(m,n) = 2^(m−1)(2n−1)' }))}
          value={order}
          onChange={(o) => {
            setOrder(o);
            setK(0);
            setPlaying(false);
          }}
        />
      )}
      <div className="text-[13px] text-ink-2">
        {rat ? (
          <>
            Row a, column b holds the fraction a/b. Fractions not in lowest terms repeat an earlier value and are skipped.
          </>
        ) : (
          <>
            Row m, column n holds the pair (m, n) in <Tex>{start === 1 ? '\\mathbb{N}\\times\\mathbb{N},\\ \\mathbb{N} = \\{1, 2, \\dots\\}' : '\\mathbb{N}\\times\\mathbb{N},\\ \\mathbb{N} = \\{0, 1, \\dots\\}'}</Tex>. The grid goes on forever to the right and down.
          </>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="mx-auto my-0 w-auto border-separate [&_td]:border-0 [&_th]:border-0 [&_td]:align-middle [&_th]:align-middle border-spacing-1 font-mono text-[12px] tabular-nums">
          <tbody>
            {vals.map((_, r) => (
              <tr key={r}>
                {vals.map((__, c) => {
                  const key = `${r},${c}`;
                  const pos = posOf.get(key);
                  const isLast = last && last.r === r && last.c === c;
                  const skipped = rat && gcd(vals[r], vals[c]) !== 1;
                  const visited = pos !== undefined || (skipped && seq.slice(0, k).some((s) => s.r === r && s.c === c));
                  return (
                    <td key={c} className="p-0">
                      <div
                        className={`flex ${W} flex-col items-center justify-center rounded-md border leading-tight`}
                        style={{
                          background: isLast ? 'color-mix(in srgb, var(--plot-2) 25%, var(--color-surface))' : pos !== undefined ? 'color-mix(in srgb, var(--plot-1) 18%, var(--color-surface))' : 'var(--color-surface-2)',
                          borderColor: isLast ? 'var(--plot-2)' : 'var(--color-line)',
                          opacity: skipped ? 0.45 : 1,
                          textDecoration: skipped && visited ? 'line-through' : undefined,
                        }}
                      >
                        <span className={skipped ? 'text-ink-3' : 'text-ink'}>{cellText(r, c)}</span>
                        {pos !== undefined && (
                          <span className="text-[10px] font-semibold" style={{ color: 'var(--plot-1)' }}>
                            #{pos}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
                <td className="text-ink-3">…</td>
              </tr>
            ))}
            <tr>
              <td className="text-center text-ink-3">⋮</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button primary onClick={() => setK((x) => Math.min(total, x + 1))} disabled={k >= total}>
          Step
        </Button>
        <Button onClick={() => (k >= total ? (setK(0), setPlaying(true)) : setPlaying((x) => !x))}>{playing ? 'Pause' : 'Play'}</Button>
        <Button
          onClick={() => {
            setK(0);
            setPlaying(false);
          }}
        >
          Reset
        </Button>
        <div className="w-40">
          <Slider label="Speed (steps/s)" value={speed} min={0.5} max={6} step={0.5} onChange={setSpeed} />
        </div>
      </div>
      {k > 0 && (
        <div className="break-words font-mono text-[12px] text-ink-2">
          {listed.slice(-14).join(',  ')}
          {listed.length > 14 ? '  (latest shown)' : ''}
        </div>
      )}
      {order === 'diagonal' && (
        <Note>
          {rat
            ? 'Each diagonal a + b = constant is finite, so every fraction is reached after finitely many steps: the positive rationals are countable.'
            : start === 0
              ? 'Each diagonal a + b = s is finite, so every pair gets a finite position: (a, b) is number (a+b)(a+b+1)/2 + b, counting from 0. That formula is a bijection N × N → N.'
              : 'Each diagonal m + n = s is finite, so every pair gets a finite position: (m, n) is number (m+n−2)(m+n−1)/2 + n. That formula is a bijection N × N → N.'}
        </Note>
      )}
      {order === 'rows' && (
        <Note tone="warn">
          This listing walks along the first row and never comes back: {rat ? '2/1' : `(${lo + 1}, ${lo})`} would need position "infinity", which is not a position. A list must reach every element after finitely many steps.
        </Note>
      )}
      {order === 'power2' && (
        <Note>
          Each cell shows g(m, n) = 2<sup>m−1</sup>(2n − 1). Every positive integer is a power of 2 times an odd number in exactly one way, so each number appears in exactly one cell: g is a bijection. (Cells off the grid take the missing numbers.)
        </Note>
      )}
    </div>
  );
}
