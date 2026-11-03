/** A Hack assembler and CPU emulator (Nand2Tetris chapters 4-6), built on the verified ALU. */
import { ALU_TABLE, alu, s16, type Bits } from './arch-hack';

export type Instr = { kind: 'A'; value: number; text: string; line: number } | { kind: 'C'; a: number; bits: Bits; dest: string; jump: string; comp: string; text: string; line: number };

const PREDEF: Record<string, number> = { SP: 0, LCL: 1, ARG: 2, THIS: 3, THAT: 4, SCREEN: 16384, KBD: 24576 };
for (let i = 0; i < 16; i++) PREDEF[`R${i}`] = i;

const COMP = new Map<string, { a: number; bits: Bits }>();
for (const r of ALU_TABLE) {
  COMP.set(r.comp, { a: 0, bits: r.bits });
  if (r.comp.includes('A')) COMP.set(r.comp.replace('A', 'M'), { a: 1, bits: r.bits });
}
// Commutative spellings compute the same thing.
for (const [alias, canon] of [
  ['A+D', 'D+A'],
  ['M+D', 'D+M'],
  ['A&D', 'D&A'],
  ['M&D', 'D&M'],
  ['A|D', 'D|A'],
  ['M|D', 'D|M'],
  ['1+D', 'D+1'],
  ['1+A', 'A+1'],
  ['1+M', 'M+1'],
] as const)
  COMP.set(alias, COMP.get(canon)!);

const JUMPS = ['', 'JGT', 'JEQ', 'JGE', 'JLT', 'JNE', 'JLE', 'JMP'];

export interface Program {
  rom: Instr[];
  labels: Record<string, number>;
  vars: Record<string, number>;
  /** Source line of each ROM address. */
  lines: number[];
}

/** Assembles Hack assembly. Throws an Error naming the line on any mistake. */
export function assemble(src: string): Program {
  const rawLines = src.replace(/\r/g, '').split('\n');
  const labels: Record<string, number> = {};
  const code: { text: string; line: number }[] = [];
  rawLines.forEach((raw, i) => {
    const t = raw.replace(/\/\/.*$/, '').replace(/\s+/g, '');
    if (!t) return;
    const m = /^\(([A-Za-z_.$:][\w.$:]*)\)$/.exec(t);
    if (m) {
      if (m[1] in labels || m[1] in PREDEF) throw new Error(`line ${i + 1}: label (${m[1]}) is defined twice or clashes with a predefined symbol`);
      labels[m[1]] = code.length;
    } else if (t.startsWith('(')) throw new Error(`line ${i + 1}: bad label "${t}"`);
    else code.push({ text: t, line: i + 1 });
  });
  if (code.length > 32768) throw new Error('program longer than the 32K ROM');
  const vars: Record<string, number> = {};
  let next = 16;
  const rom: Instr[] = code.map(({ text, line }) => {
    if (text.startsWith('@')) {
      const sym = text.slice(1);
      if (/^\d+$/.test(sym)) {
        const v = +sym;
        if (v > 32767) throw new Error(`line ${line}: @${sym} is larger than 32767, the biggest 15-bit constant`);
        return { kind: 'A', value: v, text, line };
      }
      if (!/^[A-Za-z_.$:][\w.$:]*$/.test(sym)) throw new Error(`line ${line}: bad symbol "${sym}"`);
      let v = PREDEF[sym] ?? labels[sym] ?? vars[sym];
      if (v === undefined) v = vars[sym] = next++;
      return { kind: 'A', value: v, text, line };
    }
    let rest = text;
    let dest = '';
    let jump = '';
    const eq = rest.indexOf('=');
    if (eq !== -1) {
      dest = rest.slice(0, eq);
      rest = rest.slice(eq + 1);
      if (!dest || !/^[AMD]{1,3}$/.test(dest) || new Set(dest).size !== dest.length) throw new Error(`line ${line}: bad destination "${dest}" (use any of A, M, D, e.g. AM)`);
    }
    const sc = rest.indexOf(';');
    if (sc !== -1) {
      jump = rest.slice(sc + 1);
      rest = rest.slice(0, sc);
      if (!JUMPS.includes(jump) || !jump) throw new Error(`line ${line}: bad jump "${jump}" (use JGT JEQ JGE JLT JNE JLE JMP)`);
    }
    const c = COMP.get(rest);
    if (!c) throw new Error(`line ${line}: "${rest}" is not a Hack comp field (e.g. D+1, M-D, D&A, !M)`);
    return { kind: 'C', a: c.a, bits: c.bits, dest, jump, comp: rest, text, line };
  });
  return { rom, labels, vars, lines: rom.map((r) => r.line) };
}

export interface CpuState {
  A: number;
  D: number;
  PC: number;
  ram: Map<number, number>;
  steps: number;
}

export interface StepInfo {
  wroteM: number | null;
  jumped: boolean;
}

const get = (ram: Map<number, number>, a: number) => ram.get(a) ?? 0;

/** Executes one instruction in place. Registers and memory hold 16-bit patterns (0..65535). */
export function step(p: Program, s: CpuState): StepInfo {
  const ins = p.rom[s.PC];
  s.steps++;
  if (!ins) {
    s.PC++;
    return { wroteM: null, jumped: false };
  }
  if (ins.kind === 'A') {
    s.A = ins.value;
    s.PC++;
    return { wroteM: null, jumped: false };
  }
  const oldA = s.A;
  const y = ins.a ? get(s.ram, oldA) : oldA;
  const r = alu(s.D, y, ins.bits);
  let wroteM: number | null = null;
  // All destinations take the same ALU output; M is written at the address A held at the start.
  if (ins.dest.includes('M')) {
    s.ram.set(oldA, r.out);
    wroteM = oldA;
  }
  if (ins.dest.includes('D')) s.D = r.out;
  if (ins.dest.includes('A')) s.A = r.out;
  const v = s16(r.out);
  const j = ins.jump;
  const take = j === 'JMP' || (j === 'JGT' && v > 0) || (j === 'JEQ' && v === 0) || (j === 'JGE' && v >= 0) || (j === 'JLT' && v < 0) || (j === 'JNE' && v !== 0) || (j === 'JLE' && v <= 0);
  // The PC loads the A register's value from the start of the cycle.
  s.PC = take ? oldA : s.PC + 1;
  return { wroteM, jumped: take };
}

/** True at the canonical end loop "(END) @END 0;JMP" (or PC past the program). */
export function halted(p: Program, s: CpuState): boolean {
  if (s.PC >= p.rom.length) return true;
  const a = p.rom[s.PC];
  const b = p.rom[s.PC + 1];
  return a?.kind === 'A' && a.value === s.PC && b?.kind === 'C' && b.jump === 'JMP' && b.dest === '';
}

/** The 16-bit machine code of an instruction, as a string of 0s and 1s. */
export function encode(i: Instr): string {
  if (i.kind === 'A') return i.value.toString(2).padStart(16, '0');
  const d = ['A', 'D', 'M'].map((r) => (i.dest.includes(r) ? '1' : '0')).join('');
  const j = JUMPS.indexOf(i.jump).toString(2).padStart(3, '0');
  return `111${i.a}${i.bits.join('')}${d}${j}`;
}
