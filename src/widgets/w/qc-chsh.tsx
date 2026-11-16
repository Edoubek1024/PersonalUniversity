/**
 * qc-chsh: the CHSH game played with the Bell state |Phi+> = (|00> + |11>)/sqrt2. The referee
 * sends random bits x to Alice and y to Bob; they win iff a xor b = x AND y. On question x Alice
 * measures in the real basis {|t>, |t + 90°>} with t = a_x (|t> = cos t|0> + sin t|1>, outcome
 * 0 for |t>), Bob likewise with t = b_y. Then P(same outcome) = cos^2(t_A - t_B) and the
 * correlation is E = cos 2(t_A - t_B). Shown: the four measurement directions on a dial (drag
 * the handles or use the sliders), the 2x2 table of E(x, y) and per-question win probabilities,
 * S = E00 + E01 + E10 - E11 against the classical bound 2 and Tsirelson's bound 2√2, and the
 * overall win probability 1/2 + S/8. Optional: white noise (visibility v scales every E),
 * simulated rounds, and a panel for deterministic classical strategies (never above 3/4).
 *
 * Params:
 *   angles      number[4]  [a0, a1, b0, b1] in degrees, each in [-90, 90]   default [0, 45, 22.5, -22.5]
 *   visibility  number     0..1, Werner-state visibility v                  default 1
 *   noise       boolean    show the visibility slider                       default true
 *   shots       number     rounds per "Play" press; 0 hides the simulation  default 1000
 *   classical   boolean    show the classical-strategy panel                default true
 *   title       string                                                      default "The CHSH game"
 *   caption     string     may contain $TeX$
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, str } from '../kit/params';
import { Arrow, Draggable, Label, ParamPath, Plot, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { caption } from '../kit/calc3-ui';
import { chshClassical, chshPlay, chshStats, type ChshRun } from '../kit/qc-algo';

const NAMES = ['a₀', 'a₁', 'b₀', 'b₁'];
const COLORS = ['var(--plot-1)', 'var(--plot-5)', 'var(--plot-2)', 'var(--plot-4)'];
const OPT = [0, 45, 22.5, -22.5];
const TSIRELSON = 2 * Math.SQRT2;

/** Angle in (-90, 90], snapped to 0.5 degrees. */
function wrap(d: number): number {
  let t = d;
  while (t > 90) t -= 180;
  while (t <= -90) t += 180;
  return Math.round(t * 2) / 2;
}

function SBar({ S, emp }: { S: number; emp?: number }) {
  const pos = (v: number) => `${((clamp(v, -3, 3) + 3) / 6) * 100}%`;
  const marks = [
    { v: -TSIRELSON, l: '−2√2' },
    { v: -2, l: '−2' },
    { v: 0, l: '0' },
    { v: 2, l: '2' },
    { v: TSIRELSON, l: '2√2' },
  ];
  return (
    <div className="pt-1">
      <div className="relative h-5 rounded-md border border-line bg-surface-2">
        <div className="absolute inset-y-0 rounded-sm bg-[var(--plot-1)] opacity-30" style={{ left: '16.667%', right: '16.667%' }} title="classical region |S| ≤ 2" />
        <div className="absolute inset-y-0 w-1 -translate-x-1/2 rounded bg-[var(--plot-2)]" style={{ left: pos(S) }} />
        {emp !== undefined && Number.isFinite(emp) && <div className="absolute inset-y-1 w-1 -translate-x-1/2 rounded bg-[var(--plot-3)]" style={{ left: pos(emp) }} />}
      </div>
      <div className="relative mt-0.5 h-4 text-[10px] text-ink-3">
        {marks.map((m) => (
          <span key={m.l} className="absolute -translate-x-1/2 font-mono" style={{ left: pos(m.v) }}>
            {m.l}
          </span>
        ))}
      </div>
      <div className="mt-1 flex flex-wrap gap-x-4 text-[11px] text-ink-2">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-3 rounded-sm bg-[var(--plot-1)] opacity-40" /> reachable by local hidden variables (|S| ≤ 2)
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2.5 w-1 rounded bg-[var(--plot-2)]" /> S (theory)
        </span>
        {emp !== undefined && (
          <span className="inline-flex items-center gap-1">
            <span className="inline-block h-2.5 w-1 rounded bg-[var(--plot-3)]" /> S (simulated rounds)
          </span>
        )}
      </div>
    </div>
  );
}

export default function QcChsh({ params }: WidgetProps) {
  const ang0 = numArray(params, 'angles', OPT);
  if (ang0.length !== 4 || ang0.some((a) => a < -90 || a > 90)) throw new Error('parameter "angles" should be [a0, a1, b0, b1] in degrees, each between -90 and 90');
  const v0 = num(params, 'visibility', 1);
  if (v0 < 0 || v0 > 1) throw new Error('parameter "visibility" should be between 0 and 1');
  const shots = num(params, 'shots', 1000);
  if (!Number.isInteger(shots) || shots < 0 || shots > 1e6) throw new Error('parameter "shots" should be a whole number from 0 to 1000000');
  const showNoise = bool(params, 'noise', true);
  const showClassical = bool(params, 'classical', true);

  const [ang, setAng] = useState<number[]>(ang0);
  const [v, setV] = useState(v0);
  const [run, setRun] = useState<ChshRun | null>(null);
  const [cls, setCls] = useState<number[]>([0, 0, 0, 0]);

  const st = chshStats(ang, v);
  const setOne = (i: number, d: number) => {
    setAng((a) => a.map((x, j) => (j === i ? d : x)));
    setRun(null);
  };
  const empS = run ? run.E[0][0] + run.E[0][1] + run.E[1][0] - run.E[1][1] : undefined;
  const winRate = run ? run.wins / run.rounds : NaN;
  const se = run ? Math.sqrt((winRate * (1 - winRate)) / run.rounds) : NaN;
  const clsWin = chshClassical([cls[0], cls[1]], [cls[2], cls[3]]);

  const R = 1.3;
  return (
    <Frame title={str(params, 'title', 'The CHSH game')} caption={caption(params)}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <Plot view={[-R, R, -R, R]} equal grid={false} axes={false} aspect={1} minHeight={240} maxHeight={340} label="Measurement directions of Alice and Bob">
            <ParamPath x={Math.cos} y={Math.sin} t0={0} t1={2 * Math.PI} color="var(--plot-grid)" width={1.25} />
            <Segment x1={-1.15} y1={0} x2={1.15} y2={0} color="var(--plot-axis)" width={1} />
            <Segment x1={0} y1={-1.15} x2={0} y2={1.15} color="var(--plot-axis)" width={1} />
            <Label x={1.15} y={0} dx={-16} dy={20} anchor="end" size={12}>|0⟩</Label>
            <Label x={0} y={1.15} dx={6} dy={8} size={12}>|1⟩</Label>
            {ang.map((d, i) => {
              const t = (d * Math.PI) / 180;
              return (
                <g key={i}>
                  <Segment x1={-Math.cos(t)} y1={-Math.sin(t)} x2={0} y2={0} color={COLORS[i]} width={1} dash="3 3" opacity={0.6} />
                  <Arrow x1={0} y1={0} x2={Math.cos(t)} y2={Math.sin(t)} color={COLORS[i]} width={2.5} />
                  <Label x={1.17 * Math.cos(t)} y={1.17 * Math.sin(t)} dx={0} dy={4} anchor="middle" color={COLORS[i]} weight={700} size={13}>
                    {NAMES[i]}
                  </Label>
                </g>
              );
            })}
            {ang.map((d, i) => {
              const t = (d * Math.PI) / 180;
              return (
                <Draggable
                  key={`h${i}`}
                  x={Math.cos(t)}
                  y={Math.sin(t)}
                  r={6}
                  color={COLORS[i]}
                  label={`Direction ${NAMES[i]}`}
                  constrain={(x, y) => {
                    const w = wrap((Math.atan2(y, x) * 180) / Math.PI);
                    return [Math.cos((w * Math.PI) / 180), Math.sin((w * Math.PI) / 180)];
                  }}
                  onChange={(x, y) => setOne(i, wrap((Math.atan2(y, x) * 180) / Math.PI))}
                />
              );
            })}
          </Plot>
          <div className="mt-1 text-[11px] leading-4 text-ink-3">Each arrow is the outcome-0 state |t⟩; outcome 1 is the perpendicular |t + 90°⟩. A direction and its opposite give the same measurement.</div>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {ang.map((d, i) => (
              <Slider key={i} label={<span style={{ color: COLORS[i] }} className="font-semibold">{`${i < 2 ? 'Alice' : 'Bob'} ${NAMES[i]}`}</span>} value={d} min={-90} max={90} step={0.5} format={(x) => `${fmt(x)}°`} onChange={(x) => setOne(i, x)} />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Button onClick={() => { setAng(OPT); setRun(null); }}>Optimal angles</Button>
            <Button onClick={() => { setAng([0, 0, 0, 0]); setRun(null); }}>All 0°</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-[13px] tabular-nums">
              <thead>
                <tr className="text-xs text-ink-3">
                  <th className="p-1 text-left font-medium">questions</th>
                  <th className="p-1 font-medium">angle gap</th>
                  <th className="p-1 font-medium">E(x, y)</th>
                  <th className="p-1 font-medium">win if</th>
                  <th className="p-1 font-medium">P(win)</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1].flatMap((x) =>
                  [0, 1].map((y) => (
                    <tr key={`${x}${y}`} className="border-t border-line">
                      <td className="p-1 text-left font-mono">
                        x={x}, y={y}
                      </td>
                      <td className="p-1 font-mono">{fmt(ang[x] - ang[2 + y])}°</td>
                      <td className="p-1 font-mono">{fmt(st.E[x][y], 4)}</td>
                      <td className="p-1">{x & y ? 'a ≠ b' : 'a = b'}</td>
                      <td className="p-1 font-mono">{fmt(st.win[x][y], 4)}</td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Controls cols={3}>
        <Readout label="S = E₀₀ + E₀₁ + E₁₀ − E₁₁" value={fmt(st.S, 4)} tone="var(--plot-2)" />
        <Readout label="P(win) = ½ + S/8" value={fmt(st.winAll, 4)} tone="var(--plot-2)" />
        <Readout label="Bounds on |S|: classical, quantum" value="2 (75%), 2√2 ≈ 2.828 (85.4%)" />
      </Controls>
      <SBar S={st.S} emp={empS} />
      {showNoise && (
        <Controls cols={2}>
          <Slider label="Visibility v (noise: ρ = v|Φ⁺⟩⟨Φ⁺| + (1 − v) I/4)" value={v} min={0} max={1} step={0.01} onChange={(x) => { setV(x); setRun(null); }} />
          <Readout label="Largest S at this v" value={`2√2 · v = ${fmt(TSIRELSON * v, 4)} ${TSIRELSON * v > 2 ? '> 2' : '≤ 2'}`} />
        </Controls>
      )}
      {Math.abs(st.S) > 2 + 1e-9 ? (
        <Note tone="good">|S| = {fmt(Math.abs(st.S), 4)} &gt; 2: no local hidden-variable strategy can do this. {Math.abs(Math.abs(st.S) - TSIRELSON) < 1e-3 ? 'This is Tsirelson’s bound, the best any quantum strategy can do.' : ''}</Note>
      ) : (
        <Note>|S| = {fmt(Math.abs(st.S), 4)} ≤ 2: a classical strategy could do as well. {showNoise && v < 1 / Math.SQRT2 ? 'With visibility below 1/√2 ≈ 0.707 no choice of angles violates the bound.' : ''}</Note>
      )}
      {shots > 0 && (
        <div className="space-y-2 rounded-lg border border-line p-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button primary onClick={() => setRun(chshPlay(ang, v, shots))}>
              Play {shots.toLocaleString('en-US')} rounds
            </Button>
            {run && <span className="text-[13px] text-ink-2">Each press is a fresh experiment with random questions.</span>}
          </div>
          {run && (
            <Controls cols={3}>
              <Readout label="Rounds won" value={`${run.wins} / ${run.rounds}`} tone="var(--plot-3)" />
              <Readout label="Win rate ± 1 standard error" value={`${fmt(winRate, 4)} ± ${fmt(se, 2)}`} tone="var(--plot-3)" />
              <Readout label="Measured E₀₀, E₀₁, E₁₀, E₁₁ → S" value={`${run.E.flat().map((e) => fmt(e, 3)).join(', ')} → ${fmt(empS ?? NaN, 3)}`} />
            </Controls>
          )}
        </div>
      )}
      {showClassical && (
        <div className="space-y-2 rounded-lg border border-line p-3">
          <div className="text-[13px] font-semibold">A classical strategy</div>
          <div className="text-[13px] text-ink-2">Without entanglement, each player's answer can only depend on their own question. Pick the four answers:</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {['a(0)', 'a(1)', 'b(0)', 'b(1)'].map((nm, i) => (
              <Segmented
                key={nm}
                label={nm}
                options={[
                  { value: '0', label: '0' },
                  { value: '1', label: '1' },
                ]}
                value={String(cls[i]) as '0' | '1'}
                onChange={(val) => setCls((c) => c.map((x, j) => (j === i ? Number(val) : x)))}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-[12px]">
            {[0, 1].flatMap((x) =>
              [0, 1].map((y) => {
                const ok = ((cls[x] ^ cls[2 + y]) === (x & y));
                return (
                  <span key={`${x}${y}`} className={`rounded-md border px-2 py-0.5 ${ok ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300' : 'border-rose-500/50 text-rose-700 dark:text-rose-300'}`}>
                    ({x},{y}): {cls[x]}⊕{cls[2 + y]}={cls[x] ^ cls[2 + y]} {ok ? 'win' : 'lose'}
                  </span>
                );
              }),
            )}
          </div>
          <Readout label="Classical win rate (questions uniform)" value={`${fmt(clsWin)} = ${clsWin * 4}/4`} />
          <div className="text-[12px] leading-5 text-ink-3">
            The four win conditions add up to a(0)⊕b(0) ⊕ a(0)⊕b(1) ⊕ a(1)⊕b(0) ⊕ a(1)⊕b(1) = 0, but they demand 0⊕0⊕0⊕1 = 1, so at most 3 of 4 can hold. Shared randomness only mixes deterministic strategies, so it cannot beat 3/4 either.
          </div>
        </div>
      )}
    </Frame>
  );
}
