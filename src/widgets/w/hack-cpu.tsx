/**
 * hack-cpu: assembles a Hack assembly program and steps the Hack CPU through it: registers A, D
 * and PC, the instruction being executed (with its machine code), and a RAM window showing
 * R0-R15 and the program's variables.
 *
 * Body: the program (Hack assembly; // comments, (LABEL)s and @symbols allowed).
 *
 * Params:
 *   ram       {address: value}   initial RAM contents, e.g. {"0": 5}      default {}
 *   show      number[]  RAM addresses always shown                      default [0, 1, 2]
 *   editable  boolean   show a text box to edit the program             default true
 *   title     string                                                    default "Hack CPU"
 *   caption   string
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, numArray, str } from '../kit/params';
import { Button, Frame, Note, Readout, Slider } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { assemble, encode, halted, step, type CpuState, type Program } from '../kit/arch-hackasm';
import { s16 } from '../kit/arch-hack';
import { tint } from '../kit/arch-ui';

const fresh = (ram: Record<number, number>): CpuState => ({ A: 0, D: 0, PC: 0, ram: new Map(Object.entries(ram).map(([k, v]) => [+k, v & 0xffff])), steps: 0 });

export default function HackCpu({ params, body }: WidgetProps) {
  const ramP = params.ram ?? {};
  if (typeof ramP !== 'object' || ramP === null || Array.isArray(ramP) || !Object.entries(ramP).every(([k, v]) => /^\d+$/.test(k) && +k < 24577 && Number.isInteger(v) && (v as number) >= -32768 && (v as number) <= 65535))
    throw new Error('parameter "ram" should map addresses (0..24576) to 16-bit integers, e.g. {"0": 5}');
  const ram0 = ramP as Record<number, number>;
  const show = numArray(params, 'show', [0, 1, 2]);
  const editable = bool(params, 'editable', true);
  if (!body.trim()) throw new Error('hack-cpu needs the program as the block body (after a --- line)');
  const initial = body.replace(/^\n+|\s+$/g, '');
  assemble(initial); // errors in lesson data are shown as a widget error

  const [src, setSrc] = useState(initial);
  const asm = useMemo(() => {
    try {
      return { prog: assemble(src), error: null as string | null };
    } catch (e) {
      return { prog: null, error: (e as Error).message };
    }
  }, [src]);
  const good = useRef<Program>(assemble(initial));
  if (asm.prog) good.current = asm.prog;
  const prog = asm.prog ?? good.current;

  const [cpu, setCpu] = useState<CpuState>(() => fresh(ram0));
  const [last, setLast] = useState<{ wroteM: number | null; changed: string[] } | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(4);
  const acc = useRef(0);
  const [progKey, setProgKey] = useState(prog);
  if (progKey !== prog) {
    setProgKey(prog);
    setCpu(fresh(ram0));
    setLast(null);
    setPlaying(false);
  }
  const done = halted(prog, cpu);

  const doSteps = (n: number) => {
    const s: CpuState = { ...cpu, ram: new Map(cpu.ram) };
    let info = { wroteM: null as number | null, jumped: false };
    const before = { A: s.A, D: s.D };
    for (let i = 0; i < n && !halted(prog, s); i++) info = step(prog, s);
    setCpu(s);
    setLast({ wroteM: info.wroteM, changed: [s.A !== before.A ? 'A' : '', s.D !== before.D ? 'D' : ''].filter(Boolean) });
    if (halted(prog, s)) setPlaying(false);
  };
  useAnimation(playing, (dt) => {
    acc.current += dt * speed;
    if (acc.current >= 1) {
      const n = Math.floor(acc.current);
      acc.current -= n;
      doSteps(n);
    }
  });
  const reset = () => {
    setCpu(fresh(ram0));
    setLast(null);
    setPlaying(false);
  };

  // RAM rows: requested addresses, R0-R15 that are non-zero, variables, and anything written.
  const names = useMemo(() => {
    const m = new Map<number, string>();
    for (let i = 0; i < 16; i++) m.set(i, `R${i}`);
    for (const [k, v] of Object.entries(prog.vars)) m.set(v, k);
    return m;
  }, [prog]);
  const rows = useMemo(() => {
    const set = new Set<number>(show);
    for (const v of Object.values(prog.vars)) set.add(v);
    for (const [k, v] of cpu.ram) if (v !== 0 || k < 16) set.add(k);
    return [...set].filter((a) => a < 16 || cpu.ram.has(a) || Object.values(prog.vars).includes(a) || show.includes(a)).sort((a, b) => a - b).slice(0, 24);
  }, [cpu, prog, show]);

  const cur = prog.rom[cpu.PC];
  const fmtv = (v: number) => `${s16(v)}`.replace('-', '−');
  const labelAt = useMemo(() => {
    const m = new Map<number, string[]>();
    for (const [k, v] of Object.entries(prog.labels)) m.set(v, [...(m.get(v) ?? []), k]);
    return m;
  }, [prog]);

  return (
    <Frame title={str(params, 'title', 'Hack CPU')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-1 text-[12.5px] text-ink-2">ROM (address: instruction)</div>
          <div className="max-h-80 overflow-auto rounded-lg border border-line bg-surface font-mono text-[12.5px]">
            {prog.rom.map((ins, i) => (
              <div key={i}>
                {labelAt.get(i)?.map((l) => (
                  <div key={l} className="px-2 pt-0.5 text-[11.5px] text-ink-3">
                    ({l})
                  </div>
                ))}
                <div className="flex gap-2 px-2 py-px" style={i === cpu.PC ? { background: tint('var(--plot-4)', 28), fontWeight: 700 } : undefined} aria-current={i === cpu.PC}>
                  <span className="w-7 shrink-0 text-right tabular-nums text-ink-3">{i}</span>
                  <span className="w-4 shrink-0 text-[var(--plot-4)]">{i === cpu.PC ? '▶' : ''}</span>
                  <span className="min-w-0 truncate">{ins.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <Readout label="A" value={fmtv(cpu.A)} tone={last?.changed.includes('A') ? 'var(--plot-2)' : undefined} />
            <Readout label="D" value={fmtv(cpu.D)} tone={last?.changed.includes('D') ? 'var(--plot-2)' : undefined} />
            <Readout label="PC" value={cpu.PC} />
          </div>
          <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-[12.5px]">
            {done ? (
              <span className="text-ink-2">Halted at the end loop after {cpu.steps} instructions.</span>
            ) : cur ? (
              <>
                <div className="text-[11px] uppercase tracking-wide text-ink-3">next instruction</div>
                <div className="font-mono">
                  {cur.text} <span className="text-ink-3">= {encode(cur).replace(/(.{4})(?=.)/g, '$1 ')}</span>
                </div>
                <div className="text-ink-2">
                  {cur.kind === 'A'
                    ? `A-instruction: load ${cur.value} into A${cur.value === cpu.A ? ' (already there)' : ''}; M will then mean RAM[${cur.value}].`
                    : `C-instruction: compute ${cur.comp}${cur.a ? ` (M = RAM[${cpu.A}])` : ''}${cur.dest ? `, store it in ${cur.dest
                        .split('')
                        .map((r) => (r === 'M' ? `M = RAM[${cpu.A}]` : r))
                        .join(', ')}` : ''}${cur.jump ? `, ${cur.jump === 'JMP' ? 'jump' : cur.jump + ': jump if true'} to ROM[${cpu.A}]` : ''}.`}
                </div>
              </>
            ) : null}
          </div>
          <div>
            <div className="mb-1 text-[12.5px] text-ink-2">RAM</div>
            <div className="max-h-56 overflow-auto rounded-lg border border-line">
              <table className="w-full border-collapse font-mono text-[12.5px]" style={{ width: '100%' }}>
                <tbody>
                  {rows.map((a) => (
                    <tr key={a} className="border-t border-line first:border-t-0" style={last?.wroteM === a ? { background: tint('var(--plot-2)', 18) } : a === cpu.A ? { background: tint('var(--plot-1)', 10) } : undefined}>
                      <td className="px-2 py-0.5 text-right tabular-nums text-ink-3">{a}</td>
                      <td className="px-2 py-0.5 text-ink-2">{names.get(a) ?? ''}</td>
                      <td className="px-2 py-0.5 text-right tabular-nums">{fmtv(cpu.ram.get(a) ?? 0)}</td>
                      <td className="px-2 py-0.5 text-[11px] text-ink-3">{a === cpu.A ? '← A (M)' : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={reset} disabled={cpu.steps === 0}>
          Reset
        </Button>
        <Button primary onClick={() => doSteps(1)} disabled={done}>
          Step ▶
        </Button>
        <Button onClick={() => setPlaying((p) => !p)} disabled={done}>
          {playing ? 'Pause' : 'Run'}
        </Button>
        <Button
          onClick={() => {
            setPlaying(false);
            doSteps(200000);
          }}
          disabled={done}
        >
          Run to end
        </Button>
        <span className="text-[12.5px] text-ink-2">{cpu.steps} instructions executed</span>
        <div className="w-44">
          <Slider label="Run speed" value={speed} min={1} max={60} step={1} onChange={setSpeed} format={(v) => `${v}/s`} />
        </div>
      </div>
      {!done && cpu.steps >= 200000 && <Note tone="warn">Stopped after 200,000 instructions: the program may be in a loop that is not the usual (END) @END 0;JMP.</Note>}
      {editable && (
        <div>
          <label htmlFor="hack-src" className="mb-1 block text-[13px] text-ink-2">
            Program (edit and the CPU resets)
          </label>
          <textarea id="hack-src" value={src} onChange={(e) => setSrc(e.target.value)} rows={8} spellCheck={false} className="input font-mono text-[12.5px]" aria-invalid={!!asm.error} />
          {asm.error && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{asm.error} (running the last valid program)</div>}
        </div>
      )}
    </Frame>
  );
}
