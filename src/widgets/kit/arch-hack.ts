/** The Hack ALU and its official truth table (Nand2Tetris chapter 2), shared by the Hack widgets. */

export const NAMES = ['zx', 'nx', 'zy', 'ny', 'f', 'no'] as const;
export type Bits = [number, number, number, number, number, number];

/** The official Hack ALU truth table (Nand2Tetris chapter 2), with the C-instruction comp names (a = 0). */
export const ALU_TABLE: { fn: string; label: string; comp: string; bits: Bits; f: (x: number, y: number) => number }[] = [
  { fn: '0', label: '0', comp: '0', bits: [1, 0, 1, 0, 1, 0], f: () => 0 },
  { fn: '1', label: '1', comp: '1', bits: [1, 1, 1, 1, 1, 1], f: () => 1 },
  { fn: '-1', label: '−1', comp: '-1', bits: [1, 1, 1, 0, 1, 0], f: () => -1 },
  { fn: 'x', label: 'x', comp: 'D', bits: [0, 0, 1, 1, 0, 0], f: (x) => x },
  { fn: 'y', label: 'y', comp: 'A', bits: [1, 1, 0, 0, 0, 0], f: (_, y) => y },
  { fn: '!x', label: '!x', comp: '!D', bits: [0, 0, 1, 1, 0, 1], f: (x) => ~x },
  { fn: '!y', label: '!y', comp: '!A', bits: [1, 1, 0, 0, 0, 1], f: (_, y) => ~y },
  { fn: '-x', label: '−x', comp: '-D', bits: [0, 0, 1, 1, 1, 1], f: (x) => -x },
  { fn: '-y', label: '−y', comp: '-A', bits: [1, 1, 0, 0, 1, 1], f: (_, y) => -y },
  { fn: 'x+1', label: 'x+1', comp: 'D+1', bits: [0, 1, 1, 1, 1, 1], f: (x) => x + 1 },
  { fn: 'y+1', label: 'y+1', comp: 'A+1', bits: [1, 1, 0, 1, 1, 1], f: (_, y) => y + 1 },
  { fn: 'x-1', label: 'x−1', comp: 'D-1', bits: [0, 0, 1, 1, 1, 0], f: (x) => x - 1 },
  { fn: 'y-1', label: 'y−1', comp: 'A-1', bits: [1, 1, 0, 0, 1, 0], f: (_, y) => y - 1 },
  { fn: 'x+y', label: 'x+y', comp: 'D+A', bits: [0, 0, 0, 0, 1, 0], f: (x, y) => x + y },
  { fn: 'x-y', label: 'x−y', comp: 'D-A', bits: [0, 1, 0, 0, 1, 1], f: (x, y) => x - y },
  { fn: 'y-x', label: 'y−x', comp: 'A-D', bits: [0, 0, 0, 1, 1, 1], f: (x, y) => y - x },
  { fn: 'x&y', label: 'x&y', comp: 'D&A', bits: [0, 0, 0, 0, 0, 0], f: (x, y) => x & y },
  { fn: 'x|y', label: 'x|y', comp: 'D|A', bits: [0, 1, 0, 1, 0, 1], f: (x, y) => x | y },
];

export const M16 = 0xffff;
export const s16 = (v: number) => ((v & M16) << 16) >> 16;

/** The ALU itself, stage by stage, on 16-bit unsigned patterns. */
export function alu(x: number, y: number, [zx, nx, zy, ny, f, no]: Bits) {
  const x1 = zx ? 0 : x;
  const x2 = nx ? ~x1 & M16 : x1;
  const y1 = zy ? 0 : y;
  const y2 = ny ? ~y1 & M16 : y1;
  const fo = f ? (x2 + y2) & M16 : x2 & y2;
  const out = no ? ~fo & M16 : fo;
  return { x1, x2, y1, y2, fo, out, zr: out === 0 ? 1 : 0, ng: (out >> 15) & 1 };
}

