/**
 * orbital-filling: an orbital-box (aufbau) diagram, subshells stacked in filling order.
 *
 * "Element" mode: choose Z and see the ground-state configuration, the boxes filled by Pauli and
 * Hund, the number of unpaired electrons and, for Cr, Cu, Nb, Mo, Ru, Rh, Pd and Ag, the simple
 * aufbau prediction next to the observed configuration.
 * "Build" mode: click boxes to place electrons yourself (empty, then up, then a pair, then empty
 * again) for the chosen element; the widget names the first rule your diagram breaks.
 *
 * Params:
 *   z        number               atomic number, 1 to maxZ                      default 8
 *   maxZ     number               largest Z offered (up to 54)                   default 36
 *   mode     "element" | "build"  starting mode                                  default "element"
 *   title    string                                                              default "Orbital filling"
 *   caption  string               what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { AUFBAU, EXCEPTIONS, ELEMENTS, aufbauFill, configTex, groundState, unpaired } from '../kit/chem-data';

type Occ = 0 | 1 | 2; // per orbital: empty, one (spin up), paired
type Boxes = Record<string, Occ[]>;

const orbitalsOf = (label: string) => 2 * 'spdf'.indexOf(label[1]) + 1;

function boxesFromConfig(cfg: Record<string, number>): Boxes {
  const out: Boxes = {};
  for (const s of AUFBAU) {
    const k = orbitalsOf(s.label);
    const n = cfg[s.label] ?? 0;
    // Hund: one in each orbital first, then pair up.
    out[s.label] = Array.from({ length: k }, (_, i) => (n >= k + i + 1 ? 2 : n >= i + 1 ? 1 : 0) as Occ);
  }
  return out;
}

const emptyBoxes = (): Boxes => Object.fromEntries(AUFBAU.map((s) => [s.label, Array.from({ length: orbitalsOf(s.label) }, () => 0 as Occ)]));

const countOf = (b: Boxes) => Object.values(b).reduce((s, arr) => s + arr.reduce<number>((t, o) => t + o, 0), 0);

function cfgOf(b: Boxes): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [k, arr] of Object.entries(b)) {
    const n = arr.reduce<number>((t, o) => t + o, 0);
    if (n) out[k] = n;
  }
  return out;
}

/** The first rule the learner's diagram breaks, or null if it is a valid ground state. */
function check(b: Boxes, z: number): { ok: boolean; msg: string } {
  const n = countOf(b);
  for (const s of AUFBAU) {
    const arr = b[s.label];
    const filled = arr.filter((o) => o > 0).length;
    if (arr.some((o) => o === 2) && filled < arr.length)
      return { ok: false, msg: `Hund's rule: in ${s.label} you paired two electrons while another ${s.label} orbital is still empty. Electrons spread out with parallel spins before they pair.` };
  }
  const gs = groundState(z);
  const cfg = cfgOf(b);
  if (n !== z) return { ok: false, msg: `Count: a neutral ${ELEMENTS[z - 1].sym} atom has ${z} electrons; your diagram has ${n}.` };
  const same = AUFBAU.every((s) => (gs[s.label] ?? 0) === (cfg[s.label] ?? 0));
  if (same) return { ok: true, msg: `Correct: this is the ground state of ${ELEMENTS[z - 1].sym}.` };
  const pred = aufbauFill(z);
  if (EXCEPTIONS[z] && AUFBAU.every((s) => (pred[s.label] ?? 0) === (cfg[s.label] ?? 0)))
    return { ok: false, msg: `That is exactly what filling in order predicts, but ${ELEMENTS[z - 1].sym} is one of the exceptions: one s electron moves into the d set. Try it.` };
  // aufbau violation: an electron sits in a higher subshell while a lower one is not full
  for (let i = 0; i < AUFBAU.length; i++) {
    const lower = AUFBAU[i];
    if ((cfg[lower.label] ?? 0) < lower.cap && AUFBAU.slice(i + 1).some((h) => (cfg[h.label] ?? 0) > 0)) {
      const higher = AUFBAU.slice(i + 1).find((h) => (cfg[h.label] ?? 0) > 0)!;
      const isException = !!EXCEPTIONS[z];
      return {
        ok: false,
        msg: `Aufbau: ${higher.label} has electrons while ${lower.label} is not full. ${isException ? 'This element is an exception, but not in this way; compare with the element mode.' : 'Fill lower-energy subshells first.'}`,
      };
    }
  }
  return { ok: false, msg: 'Not the ground state: compare with the element mode.' };
}

const ROW = 34;
const BOX = 30;

function Diagram({ boxes, onClick, highlight }: { boxes: Boxes; onClick?: (label: string, i: number) => void; highlight?: Set<string> }) {
  const rows = [...AUFBAU].reverse();
  const W = 60 + 5 * BOX + 8;
  const H = rows.length * ROW + 6;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto block w-full max-w-[360px]" role="img" aria-label="Orbital box diagram, highest-energy subshell at the top">
      <text x={4} y={12} fontSize={10} fill="var(--plot-text)">
        energy ↑
      </text>
      {rows.map((s, r) => {
        const y = r * ROW + 6;
        const arr = boxes[s.label];
        const hl = highlight?.has(s.label);
        return (
          <g key={s.label}>
            <text x={52} y={y + BOX / 2 + 5} textAnchor="end" fontSize={14} fontWeight={hl ? 700 : 500} fill={hl ? 'var(--plot-2)' : 'var(--color-ink)'} fontFamily="ui-monospace, monospace">
              {s.label}
            </text>
            {arr.map((o, i) => {
              const x = 60 + i * BOX;
              return (
                <g
                  key={i}
                  onClick={onClick ? () => onClick(s.label, i) : undefined}
                  style={{ cursor: onClick ? 'pointer' : undefined }}
                  role={onClick ? 'button' : undefined}
                  tabIndex={onClick ? 0 : undefined}
                  aria-label={onClick ? `${s.label} orbital ${i + 1}: ${['empty', 'one electron', 'two electrons'][o]}. Activate to change.` : undefined}
                  onKeyDown={
                    onClick
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onClick(s.label, i);
                          }
                        }
                      : undefined
                  }
                >
                  <rect x={x + 1} y={y + 1} width={BOX - 2} height={BOX - 2} rx={3} fill={o ? 'var(--color-surface-2)' : 'var(--color-surface)'} stroke={hl ? 'var(--plot-2)' : 'var(--color-line)'} strokeWidth={hl ? 2 : 1.25} />
                  {o >= 1 && <text x={x + (o === 2 ? 10 : BOX / 2)} y={y + BOX / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--plot-1)">↑</text>}
                  {o === 2 && <text x={x + 20} y={y + BOX / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill="var(--plot-2)">↓</text>}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

export default function OrbitalFilling({ params }: WidgetProps) {
  const maxZ = Math.round(num(params, 'maxZ', 36));
  if (maxZ < 2 || maxZ > 54) throw new Error('parameter "maxZ" should be between 2 and 54');
  const z0 = Math.round(num(params, 'z', 8));
  if (z0 < 1 || z0 > maxZ) throw new Error(`parameter "z" should be between 1 and maxZ (${maxZ})`);
  const [z, setZ] = useState(z0);
  const [mode, setMode] = useState(oneOf(params, 'mode', ['element', 'build'] as const, 'element'));
  const [showAufbau, setShowAufbau] = useState(false);
  const [built, setBuilt] = useState<Boxes>(emptyBoxes);

  const el = ELEMENTS[z - 1];
  const gs = useMemo(() => groundState(z), [z]);
  const exc = !!EXCEPTIONS[z];
  const predicted = useMemo(() => aufbauFill(z), [z]);
  const shown = mode === 'element' ? (showAufbau && exc ? predicted : gs) : cfgOf(built);
  const boxes = mode === 'element' ? boxesFromConfig(shown) : built;
  const result = mode === 'build' ? check(built, z) : null;
  const changed = exc ? new Set(Object.keys({ ...predicted, ...gs }).filter((k) => (predicted[k] ?? 0) !== (gs[k] ?? 0))) : undefined;

  const click = (label: string, i: number) =>
    setBuilt((b) => {
      const arr = [...b[label]];
      arr[i] = ((arr[i] + 1) % 3) as Occ;
      return { ...b, [label]: arr };
    });

  const nBuilt = countOf(built);
  const cfgText = Object.keys(shown).length ? configTex(z, shown, true) : '\\text{(no electrons yet)}';
  const fullText = Object.keys(shown).length ? configTex(z, shown, false) : '';
  const u = unpaired(shown);

  return (
    <Frame title={str(params, 'title', 'Orbital filling')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Controls>
        <Segmented
          label="Mode"
          options={[
            { value: 'element', label: 'Pick an element' },
            { value: 'build', label: 'Build it yourself' },
          ]}
          value={mode}
          onChange={setMode}
        />
        <div>
          <Slider label={`Element: ${el.name} (${el.sym})`} value={z} min={1} max={maxZ} step={1} format={(v) => `Z = ${v}`} onChange={(v) => setZ(Math.round(v))} />
          <div className="mt-1 flex gap-1.5">
            <Button onClick={() => setZ(Math.max(1, z - 1))} disabled={z <= 1}>
              ← Z − 1
            </Button>
            <Button onClick={() => setZ(Math.min(maxZ, z + 1))} disabled={z >= maxZ}>
              Z + 1 →
            </Button>
          </div>
        </div>
      </Controls>
      <Diagram boxes={boxes} onClick={mode === 'build' ? click : undefined} highlight={mode === 'element' && exc ? changed : undefined} />
      <div className="overflow-x-auto text-center text-[15px]">
        <Tex>{`\\mathrm{${el.sym}}:\\ ${cfgText}`}</Tex>
        {fullText && fullText !== cfgText && (
          <div className="mt-1 text-xs text-ink-2">
            <Tex>{fullText}</Tex>
          </div>
        )}
      </div>
      <Controls cols={3}>
        <Readout label="Electrons" value={mode === 'element' ? `${z}` : `${nBuilt} of ${z}`} />
        <Readout label="Unpaired electrons" value={`${u}`} />
        <Readout label="Magnetism" value={u ? 'paramagnetic' : 'diamagnetic'} />
      </Controls>
      {mode === 'element' && exc && (
        <>
          <Toggle label="Show the simple aufbau prediction instead" checked={showAufbau} onChange={setShowAufbau} />
          <Note tone="warn">
            {el.sym} is an exception. Filling in order predicts <Tex>{configTex(z, predicted)}</Tex>, but the observed ground state is <Tex>{configTex(z, gs)}</Tex>. The highlighted subshells differ: the s and d levels are so close in energy here that
            moving an electron into the d set (making it half-filled or full) lowers the total energy.
          </Note>
        </>
      )}
      {mode === 'build' && result && (
        <>
          <Note tone={result.ok ? 'good' : nBuilt < z ? 'info' : 'warn'}>{nBuilt < z && !result.msg.startsWith('Hund') ? `Click boxes to add electrons: ${z - nBuilt} still to place. Each click cycles empty → ↑ → ↑↓ → empty.` : result.msg}</Note>
          <div className="flex flex-wrap gap-1.5">
            <Button onClick={() => setBuilt(emptyBoxes())}>Clear</Button>
            <Button onClick={() => setBuilt(boxesFromConfig(gs))}>Show the answer</Button>
          </div>
        </>
      )}
    </Frame>
  );
}
