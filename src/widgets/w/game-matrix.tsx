/**
 * game-matrix: a two-player game in normal form (2 or 3 strategies each) with editable payoffs.
 * Marks each player's best responses, lists the pure-strategy Nash equilibria and dominant
 * strategies, finds the mixed equilibrium of a 2x2 game, and flags a prisoner's dilemma (an
 * equilibrium both players would rather leave). For a dilemma it adds the repeated game: with
 * grim-trigger strategies, cooperation is an equilibrium when the discount factor
 * delta >= (T - R) / (T - P).
 *
 * Params:
 *   players  [string, string]       names of the row and column player   default ["Row", "Column"]
 *   rows     string[] (2-3)         row player's strategies              default ["Cooperate", "Defect"]
 *   cols     string[] (2-3)         column player's strategies           default ["Cooperate", "Defect"]
 *   payoffs  [[[r, c], ...], ...]   payoffs[i][j] = [row payoff, column payoff]
 *                                   default [[[3, 3], [0, 5]], [[5, 0], [1, 1]]]
 *   editable boolean                show the payoff editor               default true
 *   repeated boolean                show the repeated-game panel when the game is a dilemma
 *                                                                        default true
 *   unit     string                 unit after payoffs in text           default ""
 *   title, caption  strings
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, str, strArray } from '../kit/params';
import { Button, Frame, Note, Readout, Slider, Toggle } from '../kit/controls';
import { fmt } from '../kit/num';
import { EconReadouts } from '../kit/econ-ui';

type Pay = [number, number][][];

function readPayoffs(p: Record<string, unknown>, nr: number, nc: number): Pay {
  const v = p.payoffs ?? [
    [[3, 3], [0, 5]],
    [[5, 0], [1, 1]],
  ];
  const ok =
    Array.isArray(v) &&
    v.length === nr &&
    v.every((row) => Array.isArray(row) && row.length === nc && row.every((cell) => Array.isArray(cell) && cell.length === 2 && cell.every((x) => typeof x === 'number' && Number.isFinite(x))));
  if (!ok) throw new Error(`parameter "payoffs" should be a ${nr} x ${nc} array of [row payoff, column payoff] pairs`);
  return (v as Pay).map((row) => row.map((c) => [c[0], c[1]] as [number, number]));
}

const EPS = 1e-9;

function analyse(P: Pay) {
  const nr = P.length;
  const nc = P[0].length;
  const rowBest = P.map((row, i) => row.map((_, j) => P[i][j][0] >= Math.max(...P.map((r) => r[j][0])) - EPS));
  const colBest = P.map((row, i) => row.map((_, j) => P[i][j][1] >= Math.max(...P[i].map((c) => c[1])) - EPS));
  const ne: [number, number][] = [];
  for (let i = 0; i < nr; i++) for (let j = 0; j < nc; j++) if (rowBest[i][j] && colBest[i][j]) ne.push([i, j]);
  // Strictly dominant strategies.
  let rowDom = -1;
  for (let i = 0; i < nr; i++) if (P.every((_, k) => k === i || P[i].every((_, j) => P[i][j][0] > P[k][j][0] + EPS))) rowDom = i;
  let colDom = -1;
  for (let j = 0; j < nc; j++) if (P[0].every((_, k) => k === j || P.every((row) => row[j][1] > row[k][1] + EPS))) colDom = j;
  // Mixed equilibrium of a 2x2 game: each player mixes to make the other indifferent.
  let mixed: { p: number; q: number } | null = null;
  if (nr === 2 && nc === 2) {
    const den1 = P[0][0][1] - P[1][0][1] - P[0][1][1] + P[1][1][1];
    const den2 = P[0][0][0] - P[0][1][0] - P[1][0][0] + P[1][1][0];
    if (Math.abs(den1) > EPS && Math.abs(den2) > EPS) {
      const p = (P[1][1][1] - P[1][0][1]) / den1; // probability row plays row 0
      const q = (P[1][1][0] - P[0][1][0]) / den2; // probability column plays column 0
      if (p > EPS && p < 1 - EPS && q > EPS && q < 1 - EPS) mixed = { p, q };
    }
  }
  // A dilemma: a unique equilibrium in dominant strategies that some other outcome beats for both.
  let dilemma: null | { ne: [number, number]; coop: [number, number]; delta: number; R: [number, number]; T: [number, number]; Pn: [number, number] } = null;
  if (ne.length === 1 && rowDom >= 0 && colDom >= 0) {
    const [ni, nj] = ne[0];
    let best: [number, number] | null = null;
    for (let i = 0; i < nr; i++)
      for (let j = 0; j < nc; j++)
        if (P[i][j][0] > P[ni][nj][0] + EPS && P[i][j][1] > P[ni][nj][1] + EPS && (!best || P[i][j][0] + P[i][j][1] > P[best[0]][best[1]][0] + P[best[0]][best[1]][1])) best = [i, j];
    if (best) {
      const [ci, cj] = best;
      const R: [number, number] = [P[ci][cj][0], P[ci][cj][1]];
      const T: [number, number] = [Math.max(...P.map((row) => row[cj][0])), Math.max(...P[ci].map((c) => c[1]))];
      const Pn: [number, number] = [P[ni][nj][0], P[ni][nj][1]];
      const need = [0, 1].map((k) => (T[k] - R[k]) / (T[k] - Pn[k]));
      dilemma = { ne: ne[0], coop: best, delta: Math.max(0, ...need), R, T, Pn };
    }
  }
  return { rowBest, colBest, ne, rowDom, colDom, mixed, dilemma };
}

export default function GameMatrix({ params }: WidgetProps) {
  const players = strArray(params, 'players', ['Row', 'Column']);
  if (players.length !== 2) throw new Error('parameter "players" should be two names');
  const rows = strArray(params, 'rows', ['Cooperate', 'Defect']);
  const cols = strArray(params, 'cols', ['Cooperate', 'Defect']);
  if (rows.length < 2 || rows.length > 3 || cols.length < 2 || cols.length > 3) throw new Error('parameters "rows" and "cols" should each list 2 or 3 strategies');
  const initial = readPayoffs(params, rows.length, cols.length);
  const editable = bool(params, 'editable', true);
  const showRepeated = bool(params, 'repeated', true);
  const unit = str(params, 'unit', '');
  const [P, setP] = useState<Pay>(initial);
  const [edit, setEdit] = useState(false);
  const [delta, setDelta] = useState(0.5);
  const a = analyse(P);
  const isNE = (i: number, j: number) => a.ne.some(([x, y]) => x === i && y === j);
  const u = (x: number) => (unit ? `${fmt(x)} ${unit}` : fmt(x));
  const set = (i: number, j: number, k: 0 | 1, val: number) =>
    setP((old) => old.map((row, r) => row.map((c, s) => (r === i && s === j ? (k === 0 ? [val, c[1]] : [c[0], val]) : c)) as [number, number][]));

  return (
    <Frame
      title={str(params, 'title', 'A game in normal form')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        editable ? (
          <>
            <Toggle label="Edit payoffs" checked={edit} onChange={setEdit} />
            <Button onClick={() => setP(initial)}>Reset</Button>
          </>
        ) : undefined
      }
    >
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-1" />
              <th colSpan={cols.length} className="px-2 pb-1 text-center text-xs font-medium" style={{ color: 'var(--plot-2)' }}>
                {players[1]}
              </th>
            </tr>
            <tr>
              <th className="p-1 text-left text-xs font-medium" style={{ color: 'var(--plot-1)' }}>
                {players[0]}
              </th>
              {cols.map((c) => (
                <th key={c} className="min-w-[6.5rem] px-2 py-1 text-center text-xs font-semibold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r}>
                <th className="pr-2 text-left text-xs font-semibold">{r}</th>
                {cols.map((_, j) => {
                  const ne = isNE(i, j);
                  return (
                    <td key={j} className={`border border-line px-2 py-2 text-center font-mono tabular-nums ${ne ? 'bg-emerald-500/15' : ''}`} style={ne ? { outline: '2px solid var(--plot-3)', outlineOffset: '-2px' } : undefined}>
                      {edit ? (
                        <div className="flex items-center justify-center gap-1">
                          <input aria-label={`${players[0]} payoff at ${r}, ${cols[j]}`} type="number" value={P[i][j][0]} onChange={(e) => set(i, j, 0, parseFloat(e.target.value) || 0)} className="input w-14 px-1 py-0.5 text-center font-mono text-xs" style={{ color: 'var(--plot-1)' }} />
                          <input aria-label={`${players[1]} payoff at ${r}, ${cols[j]}`} type="number" value={P[i][j][1]} onChange={(e) => set(i, j, 1, parseFloat(e.target.value) || 0)} className="input w-14 px-1 py-0.5 text-center font-mono text-xs" style={{ color: 'var(--plot-2)' }} />
                        </div>
                      ) : (
                        <span>
                          <span style={{ color: 'var(--plot-1)', fontWeight: a.rowBest[i][j] ? 700 : 400, textDecoration: a.rowBest[i][j] ? 'underline' : 'none' }}>{fmt(P[i][j][0])}</span>
                          <span className="text-ink-3">, </span>
                          <span style={{ color: 'var(--plot-2)', fontWeight: a.colBest[i][j] ? 700 : 400, textDecoration: a.colBest[i][j] ? 'underline' : 'none' }}>{fmt(P[i][j][1])}</span>
                          {ne && <span className="ml-1 text-xs text-emerald-700 dark:text-emerald-300">NE</span>}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-center text-xs text-ink-3">
        Each cell is ({players[0]}'s payoff, {players[1]}'s payoff). Underlined payoffs are best responses; a cell where both are underlined is a Nash equilibrium.
      </p>
      <EconReadouts>
        <Readout label="Pure-strategy Nash equilibria" value={a.ne.length ? a.ne.map(([i, j]) => `(${rows[i]}, ${cols[j]})`).join('; ') : 'none'} tone="var(--plot-3)" />
        <Readout label={`${players[0]}: dominant strategy`} value={a.rowDom >= 0 ? rows[a.rowDom] : 'none'} tone="var(--plot-1)" />
        <Readout label={`${players[1]}: dominant strategy`} value={a.colDom >= 0 ? cols[a.colDom] : 'none'} tone="var(--plot-2)" />
        {a.mixed && (
          <Readout
            label="Mixed equilibrium"
            value={`${players[0]} plays ${rows[0]} with p = ${fmt(a.mixed.p)}; ${players[1]} plays ${cols[0]} with q = ${fmt(a.mixed.q)}`}
          />
        )}
      </EconReadouts>
      {a.dilemma && (
        <Note tone="warn">
          A dilemma: the equilibrium ({rows[a.dilemma.ne[0]]}, {cols[a.dilemma.ne[1]]}) gives ({u(a.dilemma.Pn[0])}, {u(a.dilemma.Pn[1])}), yet both would be better off at ({rows[a.dilemma.coop[0]]}, {cols[a.dilemma.coop[1]]}) with ({u(a.dilemma.R[0])}, {u(a.dilemma.R[1])}). Each player's dominant strategy leads both to the worse outcome.
        </Note>
      )}
      {a.dilemma && showRepeated && (
        <div className="space-y-2 rounded-lg border border-line p-3">
          <div className="text-[13px] font-semibold">Repeated game with grim trigger</div>
          <p className="text-[13px] leading-6 text-ink-2">
            Play the cooperative cell each round; if anyone deviates, play the one-shot equilibrium for ever. With discount factor δ (how much next round's payoff is worth today), cooperating forever is worth R/(1 − δ), while deviating once is worth T + δP/(1 − δ). Cooperation holds when δ ≥ (T − R)/(T − P).
          </p>
          <Slider label="Discount factor δ" value={delta} min={0} max={0.99} step={0.01} onChange={setDelta} />
          <EconReadouts>
            <Readout label={`${players[0]}: T, R, P`} value={`${fmt(a.dilemma.T[0])}, ${fmt(a.dilemma.R[0])}, ${fmt(a.dilemma.Pn[0])}`} tone="var(--plot-1)" />
            <Readout label={`${players[1]}: T, R, P`} value={`${fmt(a.dilemma.T[1])}, ${fmt(a.dilemma.R[1])}, ${fmt(a.dilemma.Pn[1])}`} tone="var(--plot-2)" />
            <Readout label="Cooperation needs δ ≥" value={fmt(a.dilemma.delta)} />
          </EconReadouts>
          <Note tone={delta >= a.dilemma.delta - EPS ? 'good' : 'warn'}>
            {delta >= a.dilemma.delta - EPS
              ? `At δ = ${fmt(delta)} the future matters enough: neither player gains by deviating, so cooperation can last.`
              : `At δ = ${fmt(delta)} the one-time gain from deviating outweighs the lost future, so cooperation unravels.`}
          </Note>
        </div>
      )}
    </Frame>
  );
}
