/**
 * qc-circuit: a small state-vector simulator for 1-4 qubits. The circuit is drawn on wires
 * q0 (top) ... q3; under it the state vector after any column (amplitude a + bi, phase as an
 * angle and a colour, probability bars), optional sampled shot counts, per-qubit reduced Bloch
 * vectors, and the outcomes of mid-circuit measurements, which the learner chooses (the
 * impossible outcome is disabled; the post-measurement state is renormalised).
 *
 * Ordering: qubit 0 is the top wire and the LEFTMOST bit of a ket |q0 q1 ... q_{n-1}> (Nielsen and
 * Chuang; Qiskit prints the bits in the opposite order).
 *
 * Gate strings (one gate each, case-insensitive), placed in successive columns; gates on disjoint
 * wires are packed into the same column, and the order of gates on each wire is kept:
 *   "H 0"  "X 1"  "Y 0"  "Z 0"  "S 0"  "SDG 0"  "T 0"  "TDG 0"
 *   "RX(pi/2) 0"  "RY(1.2) 1"  "RZ(pi/4) 0"  "P(pi/2) 0"     angles in radians, expressions allowed
 *   "CNOT 0 1" (alias "CX"; control 0, target 1)   "CZ 0 1"   "SWAP 0 1"
 *   "CCX 0 1 2" (Toffoli; controls 0, 1, target 2)  "CCZ 0 1 2"
 *   "M 0"  measure qubit 0 in the computational basis (mid-circuit allowed)
 *   "BARRIER"  a dashed separator across all wires (no effect on the state)
 * Classically controlled gates are not supported; use the deferred-measurement form (a controlled
 * gate from the measured qubit, which acts identically once that qubit has been measured).
 * Conventions: RX(t) = exp(-i t X/2), RY(t) = exp(-i t Y/2), RZ(t) = exp(-i t Z/2) = diag(e^{-it/2}, e^{it/2}),
 * P(phi) = diag(1, e^{i phi}), S = diag(1, i), T = diag(1, e^{i pi/4}).
 *
 * Params:
 *   qubits    number    1-4 (ignored when a preset is given)                          default 2
 *   circuit   string[]  gates as above (ignored when a preset is given)               default []
 *   init      string    initial basis state, one bit per qubit, e.g. "01"             default all zeros
 *   preset    string    "none" | "bell" | "ghz" | "teleport" | "teleport-measure" | "superdense" |
 *                       "deutsch-jozsa" | "bernstein-vazirani" | "grover2" | "grover3"  default "none"
 *   presets   string[]  presets offered as buttons (switching resets the circuit)     default []
 *   palette   string[]  gates the learner may add: H X Y Z S SDG T TDG RX RY RZ P CNOT CZ SWAP CCX CCZ M
 *                                                                                     default ["H","X","Z","S","T","CNOT","CZ"]
 *   editable  boolean   false draws a fixed circuit (readonly illustration)           default true
 *   step      boolean   slider "state after column k" to watch the state gate by gate default true
 *   shots     number    shots per "Sample" click (0 hides sampling)                   default 1000
 *   perQubit  boolean   per-qubit P(1), reduced Bloch vector and its length |r|       default false
 *   hideZero  boolean   hide basis states with zero amplitude                         default true for 3-4 qubits
 *   showNote  boolean   show the preset's explanatory note                            default true
 *   title     string                                                                  default "Quantum circuit" (or the preset name)
 *   caption   string    what to try; may contain $TeX$
 */
import { useMemo, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { caption } from '../kit/calc3-ui';
import { useDark } from '../kit/hooks';
import {
  GATE_ALL,
  PRESETS,
  PRESET_NAMES,
  ROTATIONS,
  arity,
  blochOf,
  fmtC,
  fmtPi,
  ket,
  layout,
  parseGate,
  run,
  type Gate,
} from '../kit/qc-sim';
import { PhaseLegend, PhaseSwatch, ProbBar, diracString } from '../kit/qc-ui';

interface Item {
  id: number;
  gate: Gate;
}

const COL = 46;
const ROW = 46;
const LEFT = 58;
const TOP = 26;

let nextId = 1;
const mkItems = (gates: Gate[]): Item[] => gates.map((gate) => ({ id: nextId++, gate }));

function readSetup(params: Record<string, unknown>) {
  const preset = oneOf(params, 'preset', ['none', ...PRESET_NAMES] as const, 'none');
  if (preset !== 'none') {
    const p = PRESETS[preset];
    return { n: p.qubits, gates: p.circuit.map((s) => parseGate(s, p.qubits)), init: p.init ?? '0'.repeat(p.qubits), preset };
  }
  const n = num(params, 'qubits', 2);
  if (!Number.isInteger(n) || n < 1 || n > 4) throw new Error(`parameter "qubits" should be 1, 2, 3 or 4, got ${n}`);
  const circuit = strArray(params, 'circuit', []);
  const gates = circuit.map((s, i) => {
    try {
      return parseGate(s, n);
    } catch (e) {
      throw new Error(`parameter "circuit" entry ${i + 1}: ${(e as Error).message}`);
    }
  });
  const init = str(params, 'init', '0'.repeat(n));
  if (!new RegExp(`^[01]{${n}}$`).test(init)) throw new Error(`parameter "init" should be ${n} bits such as "${'0'.repeat(n)}", got "${init}"`);
  return { n, gates, init, preset };
}

export default function QcCircuit({ params }: WidgetProps) {
  const setup0 = useMemo(() => readSetup(params), []); // eslint-disable-line react-hooks/exhaustive-deps
  const presetList = strArray(params, 'presets', []);
  for (const p of presetList) if (!PRESET_NAMES.includes(p)) throw new Error(`parameter "presets": unknown preset "${p}" (use ${PRESET_NAMES.join(', ')})`);
  const palette = strArray(params, 'palette', ['H', 'X', 'Z', 'S', 'T', 'CNOT', 'CZ']).map((g) => g.toUpperCase());
  for (const g of palette) if (!(GATE_ALL as readonly string[]).includes(g)) throw new Error(`parameter "palette": unknown gate "${g}" (use ${GATE_ALL.join(', ')})`);
  const editable = bool(params, 'editable', true);
  const stepOn = bool(params, 'step', true);
  const shotsN = num(params, 'shots', 1000);
  if (shotsN < 0 || shotsN > 100000 || !Number.isInteger(shotsN)) throw new Error('parameter "shots" should be a whole number from 0 to 100000');
  const perQubit = bool(params, 'perQubit', false);
  const showNote = bool(params, 'showNote', true);

  const [setup, setSetup] = useState(setup0);
  const n = setup.n;
  const [items, setItems] = useState<Item[]>(() => mkItems(setup0.gates));
  const [hideZero, setHideZero] = useState(bool(params, 'hideZero', setup0.n >= 3));
  const [stepK, setStepK] = useState<number | null>(null);
  const [outcomes, setOutcomes] = useState<Record<number, 0 | 1>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [tool, setTool] = useState<string | null>(null);
  const [pending, setPending] = useState<number[]>([]);
  const [angle, setAngle] = useState(Math.PI / 2);
  const [counts, setCounts] = useState<{ sig: string; c: number[] } | null>(null);
  const dark = useDark();

  const gates = items.map((it) => it.gate);
  const { placed, cols } = useMemo(() => layout(gates, n), [items, n]); // eslint-disable-line react-hooks/exhaustive-deps
  const k = stepK === null ? cols : Math.min(stepK, cols);
  const outByIndex = useMemo(() => {
    const o: Record<number, 0 | 1> = {};
    items.forEach((it, i) => {
      if (outcomes[it.id] !== undefined) o[i] = outcomes[it.id];
    });
    return o;
  }, [items, outcomes]);
  const res = useMemo(() => run(n, setup.init, placed, k, outByIndex), [n, setup.init, placed, k, outByIndex]);
  const st = res.state;
  const sig = `${n}|${setup.init}|${k}|${items.map((it) => `${it.id}`).join(',')}|${JSON.stringify(outByIndex)}`;
  const hasM = res.meas.length > 0;

  const edit = (f: (xs: Item[]) => Item[]) => {
    setItems(f);
    setCounts(null);
  };
  const resetAll = (s = setup0) => {
    setSetup(s);
    setItems(mkItems(s.gates));
    setStepK(null);
    setOutcomes({});
    setSel(null);
    setPending([]);
    setCounts(null);
    setHideZero(bool(params, 'hideZero', s.n >= 3));
  };

  const place = (q: number) => {
    if (!tool) return;
    const need = arity(tool);
    if (pending.includes(q)) return;
    const qs = [...pending, q];
    if (qs.length < need) {
      setPending(qs);
      return;
    }
    const g: Gate = { name: tool as Gate['name'], qubits: qs };
    if (ROTATIONS.includes(tool)) {
      g.theta = angle;
      g.angleSrc = fmtPi(angle).replace('π', 'pi').replace('−', '-');
    }
    edit((xs) => [...xs, { id: nextId++, gate: g }]);
    setPending([]);
    setStepK(null);
  };

  const selItem = items.find((it) => it.id === sel) ?? null;
  const move = (d: -1 | 1) => {
    const i = items.findIndex((it) => it.id === sel);
    const j = i + d;
    if (i < 0 || j < 0 || j >= items.length) return;
    edit((xs) => {
      const ys = [...xs];
      [ys[i], ys[j]] = [ys[j], ys[i]];
      return ys;
    });
  };

  /** Draws every mid-circuit outcome in order, each with its Born-rule probability. */
  const drawOutcomes = (): Record<number, 0 | 1> => {
    const oc: Record<number, 0 | 1> = {};
    for (const pl of [...placed].sort((a, b) => a.col - b.col || a.index - b.index)) {
      if (pl.gate.name !== 'M' || pl.col >= k) continue;
      const before = placed.filter((x) => x.col < pl.col || (x.col === pl.col && x.index < pl.index));
      const p1 = blochProb1(run(n, setup.init, before, Infinity, oc).state, pl.gate.qubits[0]);
      oc[pl.index] = Math.random() < p1 ? 1 : 0;
    }
    return oc;
  };

  const sample = () => {
    const N = 1 << n;
    const c = new Array(N).fill(0);
    const anyM = placed.some((pl) => pl.gate.name === 'M' && pl.col < k);
    for (let s = 0; s < shotsN; s++) {
      // Without measurements every shot samples the same state; with them, each shot draws its own outcomes.
      const fin = anyM ? run(n, setup.init, placed, k, drawOutcomes()).state : st;
      let r = Math.random();
      let i = 0;
      for (; i < N - 1; i++) {
        r -= fin.re[i] ** 2 + fin.im[i] ** 2;
        if (r < 0) break;
      }
      c[i]++;
    }
    setCounts({ sig, c });
  };

  const randomOutcomes = () => {
    const oc = drawOutcomes();
    const ids: Record<number, 0 | 1> = {};
    for (const [i, o] of Object.entries(oc)) ids[items[Number(i)].id] = o;
    setOutcomes(ids);
    setCounts(null);
  };

  const N = 1 << n;
  const shownCounts = counts && counts.sig === sig ? counts.c : null;
  const rows = Array.from({ length: N }, (_, i) => i).filter((i) => !hideZero || st.re[i] ** 2 + st.im[i] ** 2 > 1e-9 || (shownCounts !== null && shownCounts[i] > 0));
  const dirac = diracString(st);
  const presetNote = setup.preset !== 'none' ? PRESETS[setup.preset].note : null;
  const title = str(params, 'title', setup0.preset !== 'none' ? PRESETS[setup0.preset].label : 'Quantum circuit');

  const roles = tool === 'SWAP' ? ['first wire', 'second wire'] : arity(tool ?? 'H') === 3 ? ['first control wire', 'second control wire', 'target wire'] : ['control wire', 'target wire'];
  const hint = tool
    ? arity(tool) === 1
      ? `Click a wire (or a q button) to add ${tool}${ROTATIONS.includes(tool) ? `(${fmtPi(angle)})` : ''} at the end of the circuit.`
      : `${tool}: ${pending.length ? 'now ' : ''}click the ${roles[pending.length]}${pending.length ? ` (chosen so far: q${pending.join(', q')})` : ''}.`
    : 'Choose a gate to add it, or click a gate in the circuit to select it.';

  return (
    <Frame title={title} caption={caption(params)}>
      {presetList.length > 0 && (
        <Segmented
          label="Example circuit"
          options={presetList.map((p) => ({ value: p, label: PRESETS[p].label }))}
          value={setup.preset}
          onChange={(p) => {
            const pr = PRESETS[p];
            resetAll({ n: pr.qubits, gates: pr.circuit.map((s) => parseGate(s, pr.qubits)), init: pr.init ?? '0'.repeat(pr.qubits), preset: p as typeof setup.preset });
          }}
        />
      )}

      <CircuitSvg
        n={n}
        init={setup.init}
        placed={placed}
        cols={cols}
        k={k}
        sel={sel === null ? -1 : items.findIndex((it) => it.id === sel)}
        meas={res.meas}
        pending={pending}
        canPlace={editable && !!tool}
        onWire={place}
        onGate={(i) => {
          if (!editable) return;
          setTool(null);
          setPending([]);
          setSel(items[i].id === sel ? null : items[i].id);
        }}
        selectable={editable}
      />

      {editable && (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-[13px] text-ink-2">Add gate</span>
            {palette.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={tool === g}
                onClick={() => {
                  setTool(tool === g ? null : g);
                  setPending([]);
                  setSel(null);
                }}
                className={`rounded-md border px-2 py-1 font-mono text-xs font-semibold ${tool === g ? 'border-accent bg-accent/15 text-ink' : 'border-line bg-surface-2 text-ink-2 hover:text-ink'}`}
              >
                {g}
              </button>
            ))}
          </div>
          {tool && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[13px] text-ink-2">Place on</span>
              {Array.from({ length: n }, (_, q) => (
                <Button key={q} onClick={() => place(q)} disabled={pending.includes(q)}>
                  q{q}
                </Button>
              ))}
              {pending.length > 0 && <Button onClick={() => setPending([])}>Cancel</Button>}
            </div>
          )}
          {tool && ROTATIONS.includes(tool) && (
            <div className="max-w-sm">
              <Slider label={`Angle for new ${tool}`} value={angle} min={-2 * Math.PI} max={2 * Math.PI} step={Math.PI / 16} format={fmtPi} onChange={setAngle} />
            </div>
          )}
          <div className="text-[13px] text-ink-3">{hint}</div>
          {selItem && (
            <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-1.5">
              <span className="text-[13px]">
                Selected: <span className="font-mono">{describe(selItem.gate)}</span>
              </span>
              <Button onClick={() => move(-1)}>Move earlier</Button>
              <Button onClick={() => move(1)}>Move later</Button>
              <Button
                onClick={() => {
                  edit((xs) => xs.filter((it) => it.id !== sel));
                  setSel(null);
                }}
              >
                Remove
              </Button>
              {selItem.gate.theta !== undefined && (
                <div className="w-full max-w-sm">
                  <Slider
                    label={`Angle of ${selItem.gate.name}`}
                    value={selItem.gate.theta}
                    min={-2 * Math.PI}
                    max={2 * Math.PI}
                    step={Math.PI / 16}
                    format={fmtPi}
                    onChange={(v) =>
                      edit((xs) => xs.map((it) => (it.id === sel ? { ...it, gate: { ...it.gate, theta: v, angleSrc: fmtPi(v).replace('π', 'pi').replace('−', '-') } } : it)))
                    }
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            <Button
              onClick={() => {
                edit(() => []);
                setSel(null);
                setStepK(null);
              }}
            >
              Clear circuit
            </Button>
            <Button onClick={() => resetAll(setup.preset !== setup0.preset && setup.preset !== 'none' ? { ...setup, gates: PRESETS[setup.preset].circuit.map((s) => parseGate(s, setup.n)) } : setup0)}>Reset</Button>
          </div>
        </div>
      )}

      {stepOn && cols > 0 && (
        <div className="grid items-end gap-x-4 gap-y-2 sm:grid-cols-[1fr_auto]">
          <Slider label="State after column" value={k} min={0} max={cols} step={1} format={(v) => (v === cols ? `${v} (end)` : `${v} of ${cols}`)} onChange={(v) => setStepK(v)} />
          <div className="flex gap-1.5">
            <Button onClick={() => setStepK(Math.max(0, k - 1))} disabled={k === 0}>
              ◀ Back
            </Button>
            <Button onClick={() => setStepK(Math.min(cols, k + 1))} disabled={k === cols}>
              Step ▶
            </Button>
          </div>
        </div>
      )}

      {hasM && (
        <div className="space-y-1.5 rounded-lg border border-line px-3 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-ink-3">Mid-circuit measurements: choose each outcome</span>
            <Button onClick={randomOutcomes}>Random outcomes</Button>
          </div>
          {res.meas.map((m) => {
            const id = items[m.index].id;
            return (
              <div key={m.index} className="flex flex-wrap items-center gap-2 text-[13px]">
                <span>
                  M on q{m.q} <span className="text-ink-3">(column {m.col + 1})</span>
                </span>
                {([0, 1] as const).map((o) => {
                  const p = o ? m.p1 : 1 - m.p1;
                  const dis = p < 1e-12;
                  return (
                    <button
                      key={o}
                      type="button"
                      disabled={dis}
                      aria-pressed={m.outcome === o}
                      onClick={() => {
                        setOutcomes((x) => ({ ...x, [id]: o }));
                        setCounts(null);
                      }}
                      className={`rounded-md border px-2 py-0.5 font-mono text-xs ${m.outcome === o ? 'border-accent bg-accent/15 text-ink' : 'border-line bg-surface-2 text-ink-2'} ${dis ? 'cursor-not-allowed opacity-40' : 'hover:text-ink'}`}
                    >
                      {o} <span className="text-ink-3">p = {p.toFixed(3)}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
          <div className="text-xs text-ink-3">Probability of this branch: {res.branch.toFixed(4)}. The table shows the renormalised state after these outcomes.</div>
        </div>
      )}

      {dirac && (
        <div className="overflow-x-auto rounded-lg bg-surface-2 px-3 py-1.5 font-mono text-[13px] [overflow-wrap:anywhere]">
          |ψ{k < cols ? sub(k) : ''}⟩ = {dirac}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[300px] text-[13px] tabular-nums">
          <thead className="text-xs text-ink-3">
            <tr>
              <th className="py-1 pr-2 text-left font-medium">basis</th>
              <th className="pr-2 text-left font-medium">amplitude</th>
              <th className="pr-2 text-left font-medium">phase</th>
              <th className="text-left font-medium">probability{shownCounts ? ` · counts of ${shotsN}` : ''}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => {
              const re = st.re[i];
              const im = st.im[i];
              const p = re * re + im * im;
              const ph = p > 1e-9 ? Math.atan2(im, re) : null;
              return (
                <tr key={i} className="border-t border-line">
                  <td className="py-1 pr-2 font-mono">|{ket(i, n)}⟩</td>
                  <td className="pr-2 font-mono text-xs">{fmtC(re, im)}</td>
                  <td className="pr-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                      <PhaseSwatch phase={ph} dark={dark} />
                      {ph === null ? '—' : fmtPi(ph)}
                    </span>
                  </td>
                  <td className="min-w-[7rem]">
                    <ProbBar p={p} />
                    {shownCounts && <ProbBar p={shownCounts[i] / shotsN} color="var(--plot-4)" label={String(shownCounts[i])} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <PhaseLegend dark={dark} />
        <div className="flex flex-wrap items-center gap-3">
          {n >= 2 && <Toggle label="Hide zero amplitudes" checked={hideZero} onChange={setHideZero} />}
          {shotsN > 0 && (
            <Button onClick={sample} primary>
              Sample {shotsN} shots
            </Button>
          )}
        </div>
      </div>
      {shownCounts && (
        <div className="text-xs text-ink-3">
          {hasM
            ? `Orange bars: final readouts in ${shotsN} simulated runs, each drawing its own mid-circuit outcomes, so they cover every branch; the blue bars are only the branch you chose.`
            : `Orange bars: measured frequencies from ${shotsN} simulated runs. They scatter around the blue probabilities by about √(p(1−p)/${shotsN}).`}
        </div>
      )}

      {perQubit && (
        <Controls cols={n >= 3 ? 3 : 2}>
          {Array.from({ length: n }, (_, q) => {
            const b = blochOf(st, q);
            const r = Math.hypot(...b);
            return (
              <Readout
                key={q}
                label={`qubit q${q} on its own`}
                value={
                  <span className="block text-[13px] leading-5">
                    P(1) = {((1 - b[2]) / 2).toFixed(3)}
                    <br />r = ({b.map((x) => fmtC(x, 0)).join(', ')})
                    <br />|r| = {r.toFixed(3)}
                    <span className="block text-xs text-ink-3">{r < 0.999 ? 'mixed: entangled with the other qubits' : 'pure: not entangled with the rest'}</span>
                  </span>
                }
                tone={r < 0.999 ? 'var(--plot-2)' : undefined}
              />
            );
          })}
        </Controls>
      )}
      {showNote && presetNote && <Note>{presetNote}</Note>}
    </Frame>
  );
}

const sub = (k: number) => String(k).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)]);

/** Angle label for a gate box: a plain number as written ("1.2"), otherwise a multiple of π. */
const angleLabel = (g: Gate) => (g.angleSrc && /^-?\d+(\.\d+)?$/.test(g.angleSrc) ? g.angleSrc.replace('-', '−') : fmtPi(g.theta ?? 0));

function blochProb1(s: ReturnType<typeof run>['state'], q: number) {
  return (1 - blochOf(s, q)[2]) / 2;
}

function describe(g: Gate): string {
  if (g.name === 'BARRIER') return 'barrier';
  const a = g.theta !== undefined ? `(${fmtPi(g.theta)})` : '';
  const q = g.qubits;
  if (g.name === 'CNOT' || g.name === 'CZ') return `${g.name}, control q${q[0]}, target q${q[1]}`;
  if (g.name === 'CCX' || g.name === 'CCZ') return `${g.name}, controls q${q[0]}, q${q[1]}, target q${q[2]}`;
  if (g.name === 'SWAP') return `SWAP q${q[0]}, q${q[1]}`;
  if (g.name === 'M') return `measure q${q[0]}`;
  return `${g.name}${a} on q${q[0]}`;
}

const boxLabel = (g: Gate) => (g.name === 'SDG' ? 'S†' : g.name === 'TDG' ? 'T†' : g.name === 'RX' ? 'Rx' : g.name === 'RY' ? 'Ry' : g.name === 'RZ' ? 'Rz' : g.name);

function CircuitSvg({
  n,
  init,
  placed,
  cols,
  k,
  sel,
  meas,
  pending,
  canPlace,
  onWire,
  onGate,
  selectable,
}: {
  n: number;
  init: string;
  placed: ReturnType<typeof layout>['placed'];
  cols: number;
  k: number;
  sel: number;
  meas: { index: number; outcome: 0 | 1 }[];
  pending: number[];
  canPlace: boolean;
  onWire: (q: number) => void;
  onGate: (i: number) => void;
  selectable: boolean;
}) {
  const W = LEFT + Math.max(cols, 1) * COL + (canPlace ? COL : 16) + 8;
  const H = TOP + (n - 1) * ROW + 30;
  const y = (q: number) => TOP + q * ROW;
  const x = (c: number) => LEFT + c * COL + COL / 2;
  const ink = 'var(--color-ink)';
  const ink2 = 'var(--color-ink-2)';
  const outOf = (i: number) => meas.find((m) => m.index === i)?.outcome;

  const gateEl = (pl: (typeof placed)[number]): ReactNode => {
    const g = pl.gate;
    const cx = x(pl.col);
    const faded = pl.col >= k;
    const isSel = pl.index === sel;
    const stroke = isSel ? 'var(--color-accent)' : ink2;
    const sw = isSel ? 2.5 : 1.25;
    const q = g.qubits;
    let body: ReactNode;
    if (g.name === 'BARRIER') {
      body = <line x1={cx} x2={cx} y1={y(0) - 16} y2={y(n - 1) + 16} stroke="var(--plot-axis)" strokeDasharray="4 4" strokeWidth={1.25} />;
    } else if (g.name === 'CNOT' || g.name === 'CCX' || g.name === 'CZ' || g.name === 'CCZ') {
      const t = q[q.length - 1];
      const ctr = q.slice(0, -1);
      const isX = g.name === 'CNOT' || g.name === 'CCX';
      const lo = Math.min(...q);
      const hi = Math.max(...q);
      body = (
        <g>
          <line x1={cx} x2={cx} y1={y(lo)} y2={y(hi)} stroke={isSel ? stroke : ink} strokeWidth={isSel ? 2.5 : 1.5} />
          {ctr.map((c) => (
            <circle key={c} cx={cx} cy={y(c)} r={5} fill={isSel ? stroke : ink} />
          ))}
          {isX ? (
            <g>
              <circle cx={cx} cy={y(t)} r={11} fill="var(--color-surface)" stroke={isSel ? stroke : ink} strokeWidth={1.5} />
              <line x1={cx - 11} x2={cx + 11} y1={y(t)} y2={y(t)} stroke={isSel ? stroke : ink} strokeWidth={1.5} />
              <line x1={cx} x2={cx} y1={y(t) - 11} y2={y(t) + 11} stroke={isSel ? stroke : ink} strokeWidth={1.5} />
            </g>
          ) : (
            <circle cx={cx} cy={y(t)} r={5} fill={isSel ? stroke : ink} />
          )}
        </g>
      );
    } else if (g.name === 'SWAP') {
      const xm = (yy: number) => (
        <g key={yy} stroke={isSel ? stroke : ink} strokeWidth={1.75}>
          <line x1={cx - 6} x2={cx + 6} y1={yy - 6} y2={yy + 6} />
          <line x1={cx - 6} x2={cx + 6} y1={yy + 6} y2={yy - 6} />
        </g>
      );
      body = (
        <g>
          <line x1={cx} x2={cx} y1={y(q[0])} y2={y(q[1])} stroke={isSel ? stroke : ink} strokeWidth={isSel ? 2.5 : 1.5} />
          {xm(y(q[0]))}
          {xm(y(q[1]))}
        </g>
      );
    } else if (g.name === 'M') {
      const yy = y(q[0]);
      const o = outOf(pl.index);
      body = (
        <g>
          <rect x={cx - 17} y={yy - 17} width={34} height={34} rx={5} fill="var(--color-surface-2)" stroke={stroke} strokeWidth={sw} />
          <path d={`M${cx - 10},${yy + 7} A11,11 0 0 1 ${cx + 10},${yy + 7}`} fill="none" stroke={ink} strokeWidth={1.4} />
          <line x1={cx} x2={cx + 8} y1={yy + 8} y2={yy - 8} stroke={ink} strokeWidth={1.4} />
          {o !== undefined && !faded && (
            <text x={cx} y={yy + 30} textAnchor="middle" fontSize={11} fill="var(--plot-4)" fontWeight={700}>
              ={o}
            </text>
          )}
        </g>
      );
    } else {
      const yy = y(q[0]);
      const rot = g.theta !== undefined;
      body = (
        <g>
          <rect x={cx - 17} y={yy - 17} width={34} height={34} rx={5} fill="var(--color-surface-2)" stroke={stroke} strokeWidth={sw} />
          <text x={cx} y={rot ? yy - 1 : yy + 5} textAnchor="middle" fontSize={rot ? 12 : 14} fontWeight={700} fill={ink} fontFamily="ui-monospace, monospace">
            {boxLabel(g)}
          </text>
          {rot && (
            <text x={cx} y={yy + 11} textAnchor="middle" fontSize={9} fill={ink2}>
              {angleLabel(g)}
            </text>
          )}
        </g>
      );
    }
    if (g.name === 'BARRIER') return <g key={pl.index} opacity={faded ? 0.35 : 1}>{body}</g>;
    const onKey = (e: KeyboardEvent<SVGGElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onGate(pl.index);
      }
    };
    return (
      <g
        key={pl.index}
        opacity={faded ? 0.3 : 1}
        {...(selectable
          ? { role: 'button', tabIndex: 0, 'aria-label': `${describe(g)}, column ${pl.col + 1}`, 'aria-pressed': isSel, onClick: (e: { stopPropagation: () => void }) => (e.stopPropagation(), onGate(pl.index)), onKeyDown: onKey, style: { cursor: 'pointer', outline: 'none' } }
          : {})}
      >
        {body}
      </g>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Circuit on ${n} qubit${n > 1 ? 's' : ''} with ${placed.length} gates`} className="block select-none">
        {Array.from({ length: n }, (_, q) => (
          <g key={q}>
            <text x={6} y={y(q) + 4} fontSize={12} fill="var(--plot-text)" fontFamily="ui-monospace, monospace">
              q{q}
            </text>
            <text x={LEFT - 6} y={y(q) + 4} fontSize={12} textAnchor="end" fill="var(--plot-text)">
              |{init[q]}⟩
            </text>
            <line x1={LEFT - 2} x2={W - 6} y1={y(q)} y2={y(q)} stroke={pending.includes(q) ? 'var(--color-accent)' : 'var(--plot-axis)'} strokeWidth={pending.includes(q) ? 2.5 : 1.25} />
            {canPlace && (
              <rect x={LEFT} y={y(q) - ROW / 2} width={W - LEFT} height={ROW} fill="transparent" style={{ cursor: 'copy' }} onClick={() => onWire(q)} />
            )}
            {canPlace && (
              <text x={x(cols)} y={y(q) + 5} textAnchor="middle" fontSize={16} fill="var(--color-accent)" pointerEvents="none">
                +
              </text>
            )}
          </g>
        ))}
        {k > 0 && k < cols && <line x1={LEFT + k * COL} x2={LEFT + k * COL} y1={4} y2={H - 4} stroke="var(--color-accent)" strokeWidth={2} strokeDasharray="5 4" />}
        {placed.map(gateEl)}
      </svg>
    </div>
  );
}
