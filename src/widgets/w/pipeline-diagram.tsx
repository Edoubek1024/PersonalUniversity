/**
 * pipeline-diagram: the classic 5-stage pipeline (IF ID EX MEM WB) for a short RISC-V sequence,
 * with read-after-write hazards resolved by stalling, with or without forwarding.
 *
 * Timing model (Patterson & Hennessy): the register file is written in the first half of WB and
 * read in the second half of ID. Without forwarding a consumer's ID may coincide with its
 * producer's WB. With forwarding, an ALU result reaches the very next instruction's EX, and a
 * load result (available after MEM) reaches an EX one cycle later, so a load followed directly by
 * a use costs one stall. Every source register (including a store's data register) is treated
 * as needed at the start of EX. Branches are not modelled.
 *
 * Body (optional): the program, one instruction per line. Supported: add sub and or xor slt mul
 * rd, rs1, rs2 · addi andi ori xori slli srli rd, rs1, imm · lw rd, off(rs1) · sw rs2, off(rs1) · nop.
 *
 * Params:
 *   forwarding  boolean   initial state of the forwarding toggle     default true
 *   editable    boolean   show a text box to edit the program        default true
 *   title       string                                               default "Five-stage pipeline"
 *   caption     string
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, str } from '../kit/params';
import { Frame, Note, Readout, Toggle } from '../kit/controls';
import { tint } from '../kit/arch-ui';

interface Instr {
  text: string;
  op: string;
  rd: number | null;
  srcs: number[];
  load: boolean;
}

const R3 = ['add', 'sub', 'and', 'or', 'xor', 'slt', 'mul'];
const RI = ['addi', 'andi', 'ori', 'xori', 'slli', 'srli'];

function reg(s: string, line: string): number {
  const m = /^x(\d{1,2})$/.exec(s.trim());
  if (!m || +m[1] > 31) throw new Error(`"${s.trim()}" is not a register x0…x31 in "${line}"`);
  return +m[1];
}

function parseProgram(src: string): Instr[] {
  const out: Instr[] = [];
  for (const raw of src.split('\n')) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const m = /^([a-z]+)\s*(.*)$/i.exec(line)!;
    const op = m[1].toLowerCase();
    const args = m[2].split(',').map((a) => a.trim());
    if (op === 'nop') out.push({ text: 'nop', op, rd: null, srcs: [], load: false });
    else if (R3.includes(op)) {
      if (args.length !== 3) throw new Error(`${op} needs rd, rs1, rs2: "${line}"`);
      out.push({ text: line, op, rd: reg(args[0], line), srcs: [reg(args[1], line), reg(args[2], line)], load: false });
    } else if (RI.includes(op)) {
      if (args.length !== 3 || !/^-?\d+$/.test(args[2])) throw new Error(`${op} needs rd, rs1, imm: "${line}"`);
      out.push({ text: line, op, rd: reg(args[0], line), srcs: [reg(args[1], line)], load: false });
    } else if (op === 'lw' || op === 'sw') {
      const mm = /^(-?\d+)\((x\d{1,2})\)$/.exec(args[1] ?? '');
      if (args.length !== 2 || !mm) throw new Error(`${op} needs ${op === 'lw' ? 'rd' : 'rs2'}, offset(rs1): "${line}"`);
      if (op === 'lw') out.push({ text: line, op, rd: reg(args[0], line), srcs: [reg(mm[2], line)], load: true });
      else out.push({ text: line, op, rd: null, srcs: [reg(mm[2], line), reg(args[0], line)], load: false });
    } else throw new Error(`unsupported instruction "${op}" (use add, sub, and, or, xor, slt, mul, addi, andi, ori, xori, slli, srli, lw, sw, nop)`);
    if (out.length > 10) throw new Error('at most 10 instructions');
  }
  if (!out.length) throw new Error('the program is empty');
  return out;
}

interface Dep {
  consumer: number;
  producer: number;
  reg: number;
}

function schedule(prog: Instr[], fwd: boolean) {
  const ex: number[] = [];
  const deps: Dep[] = [];
  const lastWriter = new Map<number, number>();
  prog.forEach((ins, i) => {
    let e = i === 0 ? 3 : ex[i - 1] + 1;
    for (const r of new Set(ins.srcs)) {
      if (r === 0) continue;
      const p = lastWriter.get(r);
      if (p === undefined) continue;
      deps.push({ consumer: i, producer: p, reg: r });
      const need = fwd ? ex[p] + (prog[p].load ? 2 : 1) : ex[p] + 3;
      e = Math.max(e, need);
    }
    ex.push(e);
    if (ins.rd !== null && ins.rd !== 0) lastWriter.set(ins.rd, i);
  });
  return { ex, deps, cycles: ex[ex.length - 1] + 2 };
}

const STAGE_COLOR: Record<string, string> = { IF: 'var(--plot-5)', ID: 'var(--plot-1)', EX: 'var(--plot-4)', MEM: 'var(--plot-3)', WB: 'var(--plot-6)' };
const DEFAULT = `lw   x1, 0(x10)
add  x2, x1, x3
sub  x4, x2, x5
addi x6, x7, 4
sw   x4, 8(x10)`;

export default function PipelineDiagram({ params, body }: WidgetProps) {
  const [fwd, setFwd] = useState(bool(params, 'forwarding', true));
  const editable = bool(params, 'editable', true);
  const initial = body.trim() ? body.trim() : DEFAULT;
  parseProgram(initial); // bad lesson data shows as a widget error
  const [src, setSrc] = useState(initial);
  const parsed = useMemo(() => {
    try {
      return { prog: parseProgram(src), error: null as string | null };
    } catch (e) {
      return { prog: null, error: (e as Error).message };
    }
  }, [src]);
  // While the text box holds an invalid program, keep drawing the last valid one.
  const lastGood = useRef<Instr[]>(parseProgram(initial));
  if (parsed.prog) lastGood.current = parsed.prog;
  const prog = parsed.prog ?? lastGood.current;

  const s = useMemo(() => schedule(prog, fwd), [prog, fwd]);
  const other = useMemo(() => schedule(prog, !fwd), [prog, fwd]);
  const ideal = prog.length + 4;

  const cw = 38;
  const rh = 30;
  const lw = 132;
  const top = 22;
  const W = lw + cw * s.cycles + 8;
  const H = top + rh * prog.length + 6;
  const cx = (cycle: number) => lw + (cycle - 1) * cw;
  const cy = (row: number) => top + row * rh;

  const cells: { row: number; cycle: number; label: string; stall: boolean }[] = [];
  prog.forEach((_, i) => {
    const e = s.ex[i];
    const f = i + 1;
    const d = i === 0 ? 2 : s.ex[i - 1];
    for (let c = f; c < d; c++) cells.push({ row: i, cycle: c, label: c === f ? 'IF' : 'stall', stall: c !== f });
    for (let c = d; c < e; c++) cells.push({ row: i, cycle: c, label: c === d ? 'ID' : 'stall', stall: c !== d });
    cells.push({ row: i, cycle: e, label: 'EX', stall: false }, { row: i, cycle: e + 1, label: 'MEM', stall: false }, { row: i, cycle: e + 2, label: 'WB', stall: false });
  });

  // Arrows for the dependences that decide timing (producer within the last three instructions).
  const arrows = s.deps
    .filter((d) => d.consumer - d.producer <= 3)
    .map((d) => {
      const p = d.producer;
      const c = d.consumer;
      if (fwd) {
        const from = prog[p].load ? s.ex[p] + 1 : s.ex[p];
        // Forwarding is used only if the value is not already in the register file by ID.
        if (s.ex[c] - 1 >= s.ex[p] + 2) return null;
        return { x1: cx(from) + cw, y1: cy(p) + rh / 2, x2: cx(s.ex[c]) + 2, y2: cy(c) + rh / 2, d };
      }
      if (s.ex[c] - 1 > s.ex[p] + 2) return null;
      return { x1: cx(s.ex[p] + 2) + cw / 2, y1: cy(p) + rh - 6, x2: cx(s.ex[c] - 1) + cw / 2, y2: cy(c) + 6, d };
    })
    .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number; d: Dep }[];

  const stallsOf = (sch: ReturnType<typeof schedule>, i: number) => (i === 0 ? 0 : sch.ex[i] - sch.ex[i - 1] - 1);

  return (
    <Frame title={str(params, 'title', 'Five-stage pipeline')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Toggle label="Forwarding (bypassing)" checked={fwd} onChange={setFwd} />
        <span className="text-[12.5px] text-ink-2">Arrows: {fwd ? 'values forwarded from a pipeline register to EX' : 'register file written in WB, read in the same cycle by ID'}.</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Pipeline diagram: instructions by clock cycle" className="block">
          <defs>
            <marker id="pd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 Z" fill="var(--plot-2)" />
            </marker>
            <pattern id="pd-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--plot-axis)" strokeWidth="1.5" />
            </pattern>
          </defs>
          {Array.from({ length: s.cycles }, (_, k) => (
            <g key={k}>
              <text x={cx(k + 1) + cw / 2} y={14} textAnchor="middle" fontSize={10.5} fill="var(--color-ink-3)">
                {k + 1}
              </text>
              <line x1={cx(k + 1)} y1={top - 2} x2={cx(k + 1)} y2={H} stroke="var(--plot-grid)" />
            </g>
          ))}
          {prog.map((ins, i) => (
            <g key={i}>
              <text x={6} y={cy(i) + rh / 2 + 4} fontSize={11.5} fill="var(--color-ink)" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
                {ins.text.replace(/\s+/g, ' ')}
              </text>
              {stallsOf(s, i) > 0 && (
                <text x={lw - 6} y={cy(i) + rh / 2 + 4} fontSize={9.5} textAnchor="end" fill="var(--plot-2)">
                  +{stallsOf(s, i)}
                </text>
              )}
            </g>
          ))}
          {cells.map((c, k) => (
            <g key={k}>
              <rect x={cx(c.cycle) + 1.5} y={cy(c.row) + 3} width={cw - 3} height={rh - 6} rx={4} fill={c.stall ? 'url(#pd-hatch)' : tint(STAGE_COLOR[c.label], 26)} stroke={c.stall ? 'var(--plot-axis)' : STAGE_COLOR[c.label]} strokeWidth={1.2} />
              {!c.stall && (
                <text x={cx(c.cycle) + cw / 2} y={cy(c.row) + rh / 2 + 4} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="var(--color-ink)">
                  {c.label}
                </text>
              )}
            </g>
          ))}
          {arrows.map((a, k) => (
            <path key={k} d={`M${a.x1},${a.y1} C${a.x1 + 14},${a.y1} ${a.x2 - 14},${a.y2} ${a.x2},${a.y2}`} fill="none" stroke="var(--plot-2)" strokeWidth={1.8} markerEnd="url(#pd-arrow)" />
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap gap-3 text-[11.5px] text-ink-2">
        {Object.entries(STAGE_COLOR).map(([k, c]) => (
          <span key={k} className="inline-flex items-center gap-1">
            <span className="inline-block h-3 w-4 rounded-sm border" style={{ borderColor: c, background: tint(c, 26) }} />
            {k}
          </span>
        ))}
        <span className="inline-flex items-center gap-1">
          <svg width="16" height="12" aria-hidden>
            <rect x="0.5" y="0.5" width="15" height="11" rx="2" fill="url(#pd-hatch)" stroke="var(--plot-axis)" />
          </svg>
          stall (bubble)
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="cycles" value={s.cycles} tone="var(--plot-1)" />
        <Readout label="stall cycles" value={s.cycles - ideal} tone={s.cycles > ideal ? 'var(--plot-2)' : undefined} />
        <Readout label="CPI (this run)" value={(s.cycles / prog.length).toFixed(2)} />
        <Readout label={fwd ? 'without forwarding' : 'with forwarding'} value={`${other.cycles} cycles`} />
      </div>
      <Note>
        {s.deps.filter((d) => d.consumer - d.producer <= 3).length === 0
          ? 'No read-after-write dependences between nearby instructions: the pipeline never stalls.'
          : s.deps
              .filter((d) => d.consumer - d.producer <= 3)
              .map((d) => {
                const gap = d.consumer - d.producer;
                const p = prog[d.producer];
                const kind = p.load && gap === 1 ? 'load-use' : 'RAW';
                return `${prog[d.consumer].op} (line ${d.consumer + 1}) reads x${d.reg} written by ${p.op} (line ${d.producer + 1})${gap === 1 ? ', the instruction just before' : `, ${gap} instructions earlier`}: ${kind}`;
              })
              .join('. ') + '.'}{' '}
        A program of n instructions needs at least n + 4 = {ideal} cycles; every extra cycle is a stall.
      </Note>
      {editable && (
        <div>
          <label htmlFor="pd-src" className="mb-1 block text-[13px] text-ink-2">
            Program (edit it: reorder instructions to hide the load-use stall)
          </label>
          <textarea id="pd-src" value={src} onChange={(e) => setSrc(e.target.value)} rows={Math.min(10, src.split('\n').length + 1)} spellCheck={false} className="input font-mono text-[13px]" aria-invalid={!!parsed.error} />
          {parsed.error && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{parsed.error} (showing the last valid program)</div>}
        </div>
      )}
    </Frame>
  );
}
