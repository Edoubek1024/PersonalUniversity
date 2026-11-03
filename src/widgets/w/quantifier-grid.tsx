/**
 * quantifier-grid: a relation P(x, y) on a small finite domain drawn as a grid the learner can
 * toggle, with nested-quantifier statements (∀x∃y, ∃y∀x, ...) evaluated live. The chosen
 * statement's evidence is marked on the grid: a witness y in each row for ∀x∃y, an all-true
 * column for ∃y∀x, or the row / column that refutes it. Optionally each statement's negation
 * (pushed inward) is shown and evaluated separately, so the flip in truth value can be checked.
 *
 * Params:
 *   domain      number[]   the domain D (2 to 8 values)                       default [1, 2, 3, 4, 5]
 *   preset      string     starting relation: "y > x", "y >= x", "x + y = 0", "x + y = c",
 *                          "x * y = y", "x divides y", "x = y", "empty" or "full"   default "y > x"
 *   presets     string[]   relations offered in the menu                  default all of the above
 *   c           number     the constant in "x + y = c"           default min(D) + max(D)
 *   statements  string[]   any of "AxEy", "EyAx", "ExAy", "AyEx", "AxAy", "ExEy"
 *                                                                        default ["AxEy", "EyAx"]
 *   negations   boolean    show each statement's negation and its value        default false
 *   title       string                                         default "Quantifiers on a finite domain"
 *   caption     string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, str, strArray } from '../kit/params';
import { Frame, Note, Tex } from '../kit/controls';

const PRESETS: Record<string, { tex: (c: number) => string; f: (x: number, y: number, c: number) => boolean }> = {
  'y > x': { tex: () => 'y > x', f: (x, y) => y > x },
  'y >= x': { tex: () => 'y \\ge x', f: (x, y) => y >= x },
  'x + y = 0': { tex: () => 'x + y = 0', f: (x, y) => x + y === 0 },
  'x + y = c': { tex: (c) => `x + y = ${c}`, f: (x, y, c) => x + y === c },
  'x * y = y': { tex: () => 'x \\cdot y = y', f: (x, y) => x * y === y },
  'x divides y': { tex: () => 'x \\mid y', f: (x, y) => (x === 0 ? y === 0 : y % x === 0) },
  'x = y': { tex: () => 'x = y', f: (x, y) => x === y },
  empty: { tex: () => '\\text{false}', f: () => false },
  full: { tex: () => '\\text{true}', f: () => true },
};
const PRESET_KEYS = Object.keys(PRESETS);

type St = 'AxEy' | 'EyAx' | 'ExAy' | 'AyEx' | 'AxAy' | 'ExEy';
const ST_KEYS: St[] = ['AxEy', 'EyAx', 'ExAy', 'AyEx', 'AxAy', 'ExEy'];
const TEX: Record<St, string> = {
  AxEy: '\\forall x\\,\\exists y\\; P(x,y)',
  EyAx: '\\exists y\\,\\forall x\\; P(x,y)',
  ExAy: '\\exists x\\,\\forall y\\; P(x,y)',
  AyEx: '\\forall y\\,\\exists x\\; P(x,y)',
  AxAy: '\\forall x\\,\\forall y\\; P(x,y)',
  ExEy: '\\exists x\\,\\exists y\\; P(x,y)',
};
const NEG: Record<St, string> = {
  AxEy: '\\exists x\\,\\forall y\\; \\neg P(x,y)',
  EyAx: '\\forall y\\,\\exists x\\; \\neg P(x,y)',
  ExAy: '\\forall x\\,\\exists y\\; \\neg P(x,y)',
  AyEx: '\\exists y\\,\\forall x\\; \\neg P(x,y)',
  AxAy: '\\exists x\\,\\exists y\\; \\neg P(x,y)',
  ExEy: '\\forall x\\,\\forall y\\; \\neg P(x,y)',
};

interface Evidence {
  value: boolean;
  text: string;
  /** Cells to ring: "r,c" keys; good = supports, bad = refutes. */
  good: Set<string>;
  bad: Set<string>;
  goodRows: Set<number>;
  badRows: Set<number>;
  goodCols: Set<number>;
  badCols: Set<number>;
}

function evaluateSt(st: St, P: boolean[][], D: number[]): Evidence {
  const n = D.length;
  const ev: Evidence = { value: false, text: '', good: new Set(), bad: new Set(), goodRows: new Set(), badRows: new Set(), goodCols: new Set(), badCols: new Set() };
  const idx = [...Array(n).keys()];
  const k = (r: number, c: number) => `${r},${c}`;
  if (st === 'AxEy') {
    const fails = idx.filter((r) => !P[r].some(Boolean));
    idx.forEach((r) => {
      const c = P[r].indexOf(true);
      if (c >= 0) ev.good.add(k(r, c));
    });
    fails.forEach((r) => ev.badRows.add(r));
    ev.value = fails.length === 0;
    ev.text = ev.value ? 'Every row x has a true cell: a witness y (ringed) chosen after seeing x.' : `Row x = ${D[fails[0]]} has no true cell, so no y works for that x: a counterexample.`;
  } else if (st === 'AyEx') {
    const fails = idx.filter((c) => !idx.some((r) => P[r][c]));
    idx.forEach((c) => {
      const r = idx.find((r2) => P[r2][c]);
      if (r !== undefined) ev.good.add(k(r, c));
    });
    fails.forEach((c) => ev.badCols.add(c));
    ev.value = fails.length === 0;
    ev.text = ev.value ? 'Every column y has a true cell: a witness x (ringed) for each y.' : `Column y = ${D[fails[0]]} has no true cell: a counterexample.`;
  } else if (st === 'EyAx') {
    const cols = idx.filter((c) => idx.every((r) => P[r][c]));
    cols.forEach((c) => ev.goodCols.add(c));
    if (!cols.length)
      idx.forEach((c) => {
        const r = idx.find((r2) => !P[r2][c])!;
        ev.bad.add(k(r, c));
      });
    ev.value = cols.length > 0;
    ev.text = ev.value ? `Column y = ${D[cols[0]]} is true all the way down: one y that works for every x, fixed before x is chosen.` : 'No column is entirely true: every candidate y fails for some x (ringed).';
  } else if (st === 'ExAy') {
    const rows = idx.filter((r) => P[r].every(Boolean));
    rows.forEach((r) => ev.goodRows.add(r));
    if (!rows.length)
      idx.forEach((r) => {
        const c = P[r].indexOf(false);
        ev.bad.add(k(r, c));
      });
    ev.value = rows.length > 0;
    ev.text = ev.value ? `Row x = ${D[rows[0]]} is true all the way across: one x that works for every y.` : 'No row is entirely true: every candidate x fails for some y (ringed).';
  } else if (st === 'AxAy') {
    const bad = idx.flatMap((r) => idx.filter((c) => !P[r][c]).map((c) => [r, c] as const));
    if (bad.length) ev.bad.add(k(bad[0][0], bad[0][1]));
    ev.value = bad.length === 0;
    ev.text = ev.value ? 'Every cell is true.' : `P(${D[bad[0][0]]}, ${D[bad[0][1]]}) is false (ringed): one counterexample refutes it.`;
  } else {
    const good = idx.flatMap((r) => idx.filter((c) => P[r][c]).map((c) => [r, c] as const));
    if (good.length) ev.good.add(k(good[0][0], good[0][1]));
    ev.value = good.length > 0;
    ev.text = ev.value ? `P(${D[good[0][0]]}, ${D[good[0][1]]}) is true (ringed): one witness pair proves it.` : 'Every cell is false: no witness exists.';
  }
  return ev;
}

function negValue(st: St, P: boolean[][]): boolean {
  // Evaluated directly from the negated form, not by flipping the original's answer.
  const n = P.length;
  const idx = [...Array(n).keys()];
  const Q = (r: number, c: number) => !P[r][c];
  switch (st) {
    case 'AxEy':
      return idx.some((r) => idx.every((c) => Q(r, c)));
    case 'EyAx':
      return idx.every((c) => idx.some((r) => Q(r, c)));
    case 'ExAy':
      return idx.every((r) => idx.some((c) => Q(r, c)));
    case 'AyEx':
      return idx.some((c) => idx.every((r) => Q(r, c)));
    case 'AxAy':
      return idx.some((r) => idx.some((c) => Q(r, c)));
    case 'ExEy':
      return idx.every((r) => idx.every((c) => Q(r, c)));
  }
}

export default function QuantifierGrid({ params }: WidgetProps) {
  const D = numArray(params, 'domain', [1, 2, 3, 4, 5]);
  if (D.length < 2 || D.length > 8) throw new Error('parameter "domain" should have between 2 and 8 values');
  if (new Set(D).size !== D.length) throw new Error('parameter "domain" has repeated values');
  const presetKeys = strArray(params, 'presets', PRESET_KEYS);
  for (const p of presetKeys) if (!(p in PRESETS)) throw new Error(`unknown preset "${p}" (use one of ${PRESET_KEYS.join(', ')})`);
  const preset0 = str(params, 'preset', presetKeys[0] ?? 'y > x');
  if (!(preset0 in PRESETS)) throw new Error(`unknown preset "${preset0}" (use one of ${PRESET_KEYS.join(', ')})`);
  const c = num(params, 'c', Math.min(...D) + Math.max(...D));
  const sts = strArray(params, 'statements', ['AxEy', 'EyAx']) as St[];
  for (const s of sts) if (!ST_KEYS.includes(s)) throw new Error(`unknown statement "${s}" (use ${ST_KEYS.join(', ')})`);
  if (!sts.length) throw new Error('parameter "statements" is empty');
  const negations = bool(params, 'negations', false);

  const build = (key: string) => D.map((x) => D.map((y) => PRESETS[key].f(x, y, c)));
  const [preset, setPreset] = useState<string>(preset0);
  const [P, setP] = useState<boolean[][]>(() => build(preset0));
  const [focus, setFocus] = useState<St>(sts[0]);

  const choose = (key: string) => {
    setPreset(key);
    setP(build(key));
  };
  const toggle = (r: number, col: number) => {
    setP((m) => m.map((row, i) => (i === r ? row.map((v, j) => (j === col ? !v : v)) : row)));
    setPreset('custom');
  };

  const results = useMemo(() => Object.fromEntries(sts.map((s) => [s, evaluateSt(s, P, D)])) as Record<St, Evidence>, [P, sts.join(), D.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const ev = results[focus];
  const label = preset === 'custom' ? 'your relation' : PRESETS[preset].tex(c);

  return (
    <Frame title={str(params, 'title', 'Quantifiers on a finite domain')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-ink-2">
        <label className="inline-flex items-center gap-2">
          P(x, y) is
          <select className="input w-auto py-1 font-mono text-[13px]" value={preset} onChange={(e) => e.target.value !== 'custom' && choose(e.target.value)}>
            {preset === 'custom' && <option value="custom">your relation</option>}
            {presetKeys.map((k) => (
              <option key={k} value={k}>
                {k === 'x + y = c' ? `x + y = ${c}` : k}
              </option>
            ))}
          </select>
        </label>
        <span>
          over <Tex>{`D = \\{${D.join(', ')}\\}`}</Tex>
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
        <div className="mx-auto">
          <div className="mb-1 text-center text-xs text-ink-3">
            columns: y →&nbsp;&nbsp;rows: x ↓&nbsp;&nbsp;(tap a cell to toggle)
          </div>
          <table className="my-0 w-auto border-separate border-spacing-1 font-mono text-[13px] [&_td]:border-0 [&_th]:border-0 [&_td]:align-middle [&_th]:align-middle">
            <thead>
              <tr>
                <th className="text-xs font-normal text-ink-3">
                  <Tex>{'x \\backslash y'}</Tex>
                </th>
                {D.map((y, j) => (
                  <th key={j} scope="col" className={`h-7 min-w-8 rounded text-center font-semibold ${ev.goodCols.has(j) ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : ev.badCols.has(j) ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300' : 'text-ink-2'}`}>
                    {y}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {D.map((x, i) => (
                <tr key={i}>
                  <th scope="row" className={`w-8 rounded text-center font-semibold ${ev.goodRows.has(i) ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : ev.badRows.has(i) ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300' : 'text-ink-2'}`}>
                    {x}
                  </th>
                  {D.map((y, j) => {
                    const v = P[i][j];
                    const key = `${i},${j}`;
                    const ring = ev.good.has(key) ? 'var(--plot-3)' : ev.bad.has(key) ? 'var(--plot-2)' : null;
                    const band = ev.goodCols.has(j) || ev.goodRows.has(i);
                    return (
                      <td key={j} className="p-0">
                        <button
                          type="button"
                          onClick={() => toggle(i, j)}
                          aria-label={`P(${x}, ${y}) is ${v ? 'true' : 'false'}; toggle`}
                          aria-pressed={v}
                          className="flex h-9 w-9 items-center justify-center rounded-md border text-xs font-semibold transition-colors sm:h-10 sm:w-10"
                          style={{
                            background: v ? 'color-mix(in srgb, var(--color-accent) 75%, transparent)' : band ? 'color-mix(in srgb, var(--plot-3) 12%, var(--color-surface-2))' : 'var(--color-surface-2)',
                            color: v ? 'var(--color-surface)' : 'var(--color-ink-3)',
                            borderColor: ring ?? 'var(--color-line)',
                            boxShadow: ring ? `0 0 0 2px ${ring}` : undefined,
                          }}
                        >
                          {v ? 'T' : 'F'}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="min-w-0 space-y-2">
          <div className="text-[13px] text-ink-2">
            <Tex>{`P(x, y):\\; ${label === 'your relation' ? '\\text{your relation}' : label}`}</Tex>
          </div>
          {sts.length > 1 && <div className="text-xs text-ink-3">Tap a statement to mark its evidence on the grid.</div>}
          <div className="space-y-1.5">
            {sts.map((s) => {
              const r = results[s];
              const nv = negValue(s, P);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFocus(s)}
                  aria-pressed={s === focus}
                  className={`block w-full rounded-lg border px-3 py-2 text-left text-[13px] ${s === focus ? 'border-accent bg-accent/10' : 'border-line bg-surface-2'}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Tex>{TEX[s]}</Tex>
                    <span className="font-semibold" style={{ color: r.value ? 'var(--plot-3)' : 'var(--plot-2)' }}>
                      {r.value ? 'true' : 'false'}
                    </span>
                  </div>
                  {negations && (
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-1 text-ink-2">
                      <span>
                        negation: <Tex>{NEG[s]}</Tex>
                      </span>
                      <span className="font-semibold" style={{ color: nv ? 'var(--plot-3)' : 'var(--plot-2)' }}>
                        {nv ? 'true' : 'false'}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <Note tone={ev.value ? 'good' : 'warn'}>{ev.text}</Note>
        </div>
      </div>
    </Frame>
  );
}
