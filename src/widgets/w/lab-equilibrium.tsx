/**
 * lab-equilibrium: Le Chatelier's principle in a rack of test tubes. Tube 1 is the control; the
 * learner applies one stress to each of the others and compares colours with the control.
 *
 * Systems
 *   "iron"    Fe3+ + SCN− ⇌ FeSCN2+ (red-orange). Stresses: add Fe(NO3)3, add KSCN, add AgNO3
 *             (Ag+ + SCN− -> AgSCN(s), white), add water. The equilibrium is solved exactly
 *             (quadratic) with K = 140 at 25 °C, a representative value: published values vary
 *             with ionic strength.
 *   "cobalt"  [Co(H2O)6]2+ (pink) + 4Cl− ⇌ [CoCl4]2− (blue) + 6H2O. Stresses: add 12 M HCl, add
 *             water, heat in an 80 °C bath, cool in ice. The
 *             forward reaction is endothermic; the simulator's K(25 °C) and ΔH (+50 kJ/mol) are
 *             illustrative values chosen to give the colours seen in teaching labs.
 *
 * Colours are drawn from Beer's law in three bands (iron) or as a mix of the two cobalt
 * complexes' colours by mole fraction, and every tube also has a text description relative to
 * the control so the comparison does not depend on colour vision.
 *
 * Params:
 *   system   "iron" | "cobalt" | "both"   which systems to offer        default "both"
 *   title    string                                                    default "Le Chatelier's principle"
 *   caption  string
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { oneOf, str } from '../kit/params';
import { Button, Frame, Note, Segmented } from '../kit/controls';
import { fx } from '../kit/chemlab-core';
import { BenchLog, ButtonRow, LabVars } from '../kit/chemlab-ui';

type Sys = 'iron' | 'cobalt';
const K_FE = 140;
const PATH = 1.5; // cm, a test tube

interface Tube {
  V: number; // mL
  fe: number; // mmol
  scn: number;
  ag: number;
  co: number;
  cl: number;
  T: number; // °C
  log: string[];
}

function ironStart(): Tube {
  // 5.0 mL of a mixture 1.0 mM in Fe(NO3)3 and 1.0 mM in KSCN, in 0.1 M HNO3.
  return { V: 5, fe: 0.005, scn: 0.005, ag: 0, co: 0, cl: 0, T: 22, log: [] };
}
function cobaltStart(): Tube {
  // 3.0 mL of 0.020 M CoCl2 in about 5.5 M chloride (violet).
  return { V: 3, fe: 0, scn: 0, ag: 0, co: 0.06, cl: 16.5, T: 22, log: [] };
}

/** Equilibrium [FeSCN2+], free [Fe3+] (mol/L) and mmol of AgSCN precipitate. */
function ironEq(t: Tube): { x: number; fe: number; ppt: number } {
  const ppt = Math.min(t.ag, t.scn);
  const F = t.fe / t.V; // mol/L (mmol/mL)
  const S = Math.max(0, t.scn - t.ag) / t.V + 1e-9;
  const b = K_FE * (F + S) + 1;
  const x = (b - Math.sqrt(Math.max(0, b * b - 4 * K_FE * K_FE * F * S))) / (2 * K_FE);
  return { x, fe: F - x, ppt };
}

function cobaltFrac(t: Tube): { f: number; ppt: number } {
  const ppt = Math.min(t.ag, t.cl);
  const cl = Math.max(0, t.cl - t.ag) / t.V;
  const K = 7.7e-4 * Math.exp((50000 / 8.314) * (1 / 298.15 - 1 / (t.T + 273.15)));
  const q = K * cl ** 4;
  return { f: q / (1 + q), ppt };
}

function tubeColour(sys: Sys, t: Tube): { fill: string; cloudy: number; level: number } {
  if (sys === 'iron') {
    const { x, fe, ppt } = ironEq(t);
    const band = (eps: number, epsFe: number) => 10 ** -((eps * x + epsFe * fe) * PATH);
    const [R, G, B] = [band(60, 0), band(1500, 0.2), band(4700, 3)];
    return { fill: `rgb(${Math.round(250 * R)},${Math.round(246 * G)},${Math.round(240 * B)})`, cloudy: Math.min(0.7, ppt * 60), level: x };
  }
  const { f, ppt } = cobaltFrac(t);
  const dil = Math.min(1, (t.co / t.V) / 0.02);
  const pink = [236, 150, 178];
  const blue = [52, 92, 205];
  const c = pink.map((p, i) => Math.round(255 - (255 - (p * (1 - f) + blue[i] * f)) * dil));
  return { fill: `rgb(${c.join(',')})`, cloudy: Math.min(0.7, ppt * 0.4), level: f };
}

function describe(sys: Sys, t: Tube, control: Tube): string {
  const a = tubeColour(sys, t);
  const b = tubeColour(sys, control);
  const parts: string[] = [];
  if (sys === 'iron') {
    const r = a.level / b.level;
    parts.push(r > 1.6 ? 'much deeper red than the control' : r > 1.12 ? 'deeper red than the control' : r < 0.25 ? 'almost colourless (pale yellow)' : r < 0.6 ? 'much paler than the control' : r < 0.9 ? 'paler than the control' : 'about the same as the control');
  } else {
    const f = a.level;
    parts.push(f > 0.85 ? 'deep blue' : f > 0.6 ? 'blue-violet' : f > 0.3 ? 'violet' : f > 0.12 ? 'pink-violet' : 'pink');
    const d = f - b.level;
    parts.push(Math.abs(d) < 0.05 ? '(like the control)' : d > 0 ? '(bluer than the control)' : '(pinker than the control)');
  }
  if (a.cloudy > 0.02) parts.push('with a white precipitate');
  return parts.join(' ');
}

export default function LabEquilibrium({ params }: WidgetProps) {
  const which = oneOf(params, 'system', ['iron', 'cobalt', 'both'] as const, 'both');
  const [sys, setSys] = useState<Sys>(which === 'cobalt' ? 'cobalt' : 'iron');
  const fresh = (s: Sys) => Array.from({ length: 5 }, () => (s === 'iron' ? ironStart() : cobaltStart()));
  const [tubes, setTubes] = useState<Tube[]>(() => fresh(sys));
  const [sel, setSel] = useState(1);
  const [debrief, setDebrief] = useState(false);

  const act = (fn: (t: Tube) => Tube, line: string) => {
    setTubes((ts) => ts.map((t, i) => (i === sel ? { ...fn(t), log: [...t.log, line] } : t)));
  };
  const drops = 5 * 0.05; // mL
  const switchSys = (s: Sys) => {
    setSys(s);
    setTubes(fresh(s));
    setSel(1);
    setDebrief(false);
  };

  const t = tubes[sel];
  const allLines = tubes.flatMap((tb, i) => tb.log.map((l) => `Tube ${i + 1}: ${l}`));

  return (
    <Frame title={str(params, 'title', "Le Chatelier's principle")} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <LabVars>
        {which === 'both' && (
          <Segmented
            label="System"
            options={[
              { value: 'iron', label: 'Iron(III) thiocyanate' },
              { value: 'cobalt', label: 'Cobalt(II) chloride' },
            ]}
            value={sys}
            onChange={switchSys}
          />
        )}
        <Note>
          {sys === 'iron' ? (
            <>Each tube: 5.0 mL of a mixture made 1.0 mM in Fe(NO₃)₃ and 1.0 mM in KSCN (in dilute HNO₃). Fe³⁺ + SCN⁻ ⇌ FeSCN²⁺ (red-orange).</>
          ) : (
            <>Each tube: 3.0 mL of 0.020 M CoCl₂ in concentrated chloride. [Co(H₂O)₆]²⁺ (pink) + 4Cl⁻ ⇌ [CoCl₄]²⁻ (blue) + 6H₂O.</>
          )}
        </Note>
        <div className="flex flex-wrap items-end gap-2" role="group" aria-label="Test tubes">
          {tubes.map((tb, i) => {
            const c = tubeColour(sys, tb);
            const h = 30 + tb.V * 11;
            return (
              <button key={i} type="button" onClick={() => i > 0 && setSel(i)} disabled={i === 0} aria-pressed={i === sel} className={`rounded-lg border p-1 ${i === sel ? 'border-accent' : 'border-line'} ${i === 0 ? 'cursor-default' : ''}`}>
                <svg width={42} height={128} viewBox="0 0 42 128" aria-hidden>
                  <path d="M9,4 L33,4 L33,108 Q33,124 21,124 Q9,124 9,108 Z" fill="var(--chemlab-glass)" stroke="var(--plot-axis)" strokeWidth={1.5} />
                  <path d={`M10,${124 - h} L32,${124 - h} L32,108 Q32,123 21,123 Q10,123 10,108 Z`} fill={c.fill} />
                  {c.cloudy > 0 && <path d={`M10,${124 - h} L32,${124 - h} L32,108 Q32,123 21,123 Q10,123 10,108 Z`} fill="white" opacity={c.cloudy} />}
                  {tb.T > 40 && <text x={21} y={16} textAnchor="middle" fontSize={10} fill="var(--plot-2)">hot</text>}
                  {tb.T < 10 && <text x={21} y={16} textAnchor="middle" fontSize={10} fill="var(--plot-5)">ice</text>}
                </svg>
                <div className="text-center text-[11px] text-ink-2">{i === 0 ? 'Control' : `Tube ${i + 1}`}</div>
              </button>
            );
          })}
        </div>
        <div className="text-[13px] text-ink-2">
          Tube {sel + 1}: <span className="text-ink">{describe(sys, t, tubes[0])}</span>
        </div>
        {sys === 'iron' ? (
          <ButtonRow label={`Stress tube ${sel + 1}`}>
            <Button onClick={() => act((x) => ({ ...x, fe: x.fe + drops * 0.2, V: x.V + drops }), 'added 5 drops of 0.20 M Fe(NO₃)₃')}>+ Fe(NO₃)₃</Button>
            <Button onClick={() => act((x) => ({ ...x, scn: x.scn + drops * 0.2, V: x.V + drops }), 'added 5 drops of 0.20 M KSCN')}>+ KSCN</Button>
            <Button onClick={() => act((x) => ({ ...x, ag: x.ag + drops * 0.1, V: x.V + drops }), 'added 5 drops of 0.10 M AgNO₃')}>+ AgNO₃</Button>
            <Button onClick={() => act((x) => ({ ...x, V: x.V + 2 }), 'added 2 mL of water')}>+ 2 mL water</Button>
          </ButtonRow>
        ) : (
          <ButtonRow label={`Stress tube ${sel + 1}`}>
            <Button onClick={() => act((x) => ({ ...x, cl: x.cl + drops * 12, V: x.V + drops }), 'added 5 drops of 12 M HCl')}>+ 12 M HCl</Button>
            <Button onClick={() => act((x) => ({ ...x, V: x.V + 1 }), 'added 1 mL of water')}>+ 1 mL water</Button>
            <Button onClick={() => act((x) => ({ ...x, T: 80 }), 'placed in an 80 °C water bath')}>Hot bath</Button>
            <Button onClick={() => act((x) => ({ ...x, T: 2 }), 'placed in an ice bath')}>Ice bath</Button>
            <Button onClick={() => act((x) => ({ ...x, T: 22 }), 'returned to room temperature')}>Room temperature</Button>
          </ButtonRow>
        )}
        <ButtonRow>
          <Button onClick={() => { setTubes(fresh(sys)); setDebrief(false); }}>Fresh rack</Button>
          <Button onClick={() => setDebrief((d) => !d)}>{debrief ? 'Hide concentrations' : 'Show the concentrations (after you have written your observations)'}</Button>
        </ButtonRow>
        <BenchLog lines={allLines} />
        {debrief && (
          <Note>
            {tubes
              .map((tb, i) =>
                sys === 'iron'
                  ? `Tube ${i + 1}: [FeSCN²⁺] = ${fx(ironEq(tb).x * 1e6, 0)} µM, [Fe³⁺] = ${fx(ironEq(tb).fe * 1e3, 2)} mM`
                  : `Tube ${i + 1}: ${fx(100 * cobaltFrac(tb).f, 0)}% of the cobalt as [CoCl₄]²⁻ at ${tb.T} °C`,
              )
              .join('; ')}
            .
          </Note>
        )}
      </LabVars>
    </Frame>
  );
}
