/**
 * logic-circuit: predefined gate-level circuits drawn as diagrams with clickable input switches
 * and live wire values (lit wires are coloured AND labelled 0/1), plus a generated truth table
 * with the current input row highlighted (click a row to jump to it).
 *
 * Circuits:
 *   not-nand, and-nand, or-nand, xor-nand   NOT, AND, OR, XOR built only from NAND
 *   half-adder, full-adder                  the Project 2 adders
 *   mux, mux-nand, dmux                     selector (AND/OR/NOT and the 4-NAND version), router
 *   ripple-4                                4-bit ripple-carry adder with an optional carry-delay view
 *   sr-latch                                cross-coupled NAND latch (active-low S̄, R̄) with a history
 *   bit                                     Nand2Tetris Bit: Mux + DFF with load; clock button and a timing diagram
 *
 * Params:
 *   circuit   string     circuit shown first                         default "xor-nand"
 *   circuits  string[]   circuits offered in a selector              default [circuit]
 *   inputs    {name: 0|1}  initial input values (e.g. {"a": 1})     default all 0 (sr-latch: S̄ = R̄ = 1)
 *   a, b      number     ripple-4: initial 4-bit operands 0..15      default 11, 6
 *   delay     boolean    ripple-4: start with the carry-delay view on default false
 *   table     boolean    show the truth table                         default true
 *   title     string                                                  default from the circuit
 *   caption   string
 */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str, strArray } from '../kit/params';
import { Button, Frame, Note, Readout, Segmented, Slider, Toggle } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { tint } from '../kit/arch-ui';

// ------------------------------------------------------------------------------------ model

type GateType = 'and' | 'or' | 'not' | 'nand' | 'nor' | 'xor';
type Pt = [number, number];

interface InSpec {
  id: string;
  label: string;
  x: number;
  y: number;
}
interface GateSpec {
  id: string;
  type: GateType;
  x: number;
  y: number;
  ins: string[];
  /** Text above the gate, e.g. "NOT a". */
  label?: string;
  /** Where to put the 0/1 value label of the output (default right-above the output pin). */
  valueAt?: Pt;
}
interface OutSpec {
  id: string;
  label: string;
  x: number;
  y: number;
  src: string;
}
interface WireSpec {
  from: string;
  /** "gateId.pin" or "out:outId". */
  to: string;
  bx?: number;
  pts?: Pt[];
}
interface Circuit {
  name: string;
  short: string;
  title: string;
  w: number;
  h: number;
  inputs: InSpec[];
  gates: GateSpec[];
  outputs: OutSpec[];
  wires: WireSpec[];
  dots?: Pt[];
  sequential?: boolean;
  /** Initial gate outputs for sequential circuits. */
  init?: Record<string, number>;
  initInputs?: Record<string, number>;
}

const evalGate = (t: GateType, v: number[]): number => {
  switch (t) {
    case 'and':
      return v[0] & v[1];
    case 'or':
      return v[0] | v[1];
    case 'not':
      return 1 - v[0];
    case 'nand':
      return 1 - (v[0] & v[1]);
    case 'nor':
      return 1 - (v[0] | v[1]);
    case 'xor':
      return v[0] ^ v[1];
  }
};

/** Settles the circuit. Combinational circuits are listed in topological order, so one pass is
 * enough; sequential ones repeat passes (each gate seeing the newest values, like gates with
 * slightly different delays) until nothing changes. */
function settle(c: Circuit, inputs: Record<string, number>, prev: Record<string, number>): { values: Record<string, number>; stable: boolean } {
  const v: Record<string, number> = { ...prev, ...inputs };
  for (const g of c.gates) if (v[g.id] === undefined) v[g.id] = 0;
  const passes = c.sequential ? 20 : 1;
  for (let k = 0; k < passes; k++) {
    let changed = false;
    for (const g of c.gates) {
      const nv = evalGate(
        g.type,
        g.ins.map((s) => v[s] ?? 0),
      );
      if (nv !== v[g.id]) {
        v[g.id] = nv;
        changed = true;
      }
    }
    if (!changed) return { values: v, stable: true };
  }
  return { values: v, stable: !c.sequential };
}

// ------------------------------------------------------------------------------------ circuits

const CIRCUITS: Record<string, Circuit> = {
  'not-nand': {
    name: 'not-nand',
    short: 'NOT',
    title: 'NOT from one NAND',
    w: 300,
    h: 100,
    inputs: [{ id: 'a', label: 'a', x: 60, y: 50 }],
    gates: [{ id: 'g1', type: 'nand', x: 130, y: 32, ins: ['a', 'a'], label: 'NAND(a, a)' }],
    outputs: [{ id: 'out', label: 'out', x: 236, y: 50, src: 'g1' }],
    wires: [
      { from: 'a', to: 'g1.0', bx: 100 },
      { from: 'a', to: 'g1.1', bx: 100 },
      { from: 'g1', to: 'out:out' },
    ],
    dots: [[100, 50]],
  },
  'and-nand': {
    name: 'and-nand',
    short: 'AND',
    title: 'AND from two NANDs',
    w: 380,
    h: 110,
    inputs: [
      { id: 'a', label: 'a', x: 60, y: 45 },
      { id: 'b', label: 'b', x: 60, y: 63 },
    ],
    gates: [
      { id: 'g1', type: 'nand', x: 120, y: 36, ins: ['a', 'b'], label: 'NAND(a, b)' },
      { id: 'g2', type: 'nand', x: 225, y: 36, ins: ['g1', 'g1'], label: 'NOT' },
    ],
    outputs: [{ id: 'out', label: 'out', x: 318, y: 54, src: 'g2' }],
    wires: [
      { from: 'a', to: 'g1.0' },
      { from: 'b', to: 'g1.1' },
      { from: 'g1', to: 'g2.0', bx: 200 },
      { from: 'g1', to: 'g2.1', bx: 200 },
      { from: 'g2', to: 'out:out' },
    ],
    dots: [[200, 54]],
  },
  'or-nand': {
    name: 'or-nand',
    short: 'OR',
    title: 'OR from three NANDs (De Morgan)',
    w: 390,
    h: 150,
    inputs: [
      { id: 'a', label: 'a', x: 60, y: 40 },
      { id: 'b', label: 'b', x: 60, y: 110 },
    ],
    gates: [
      { id: 'na', type: 'nand', x: 110, y: 22, ins: ['a', 'a'], label: 'NOT a', valueAt: [170, 34] },
      { id: 'nb', type: 'nand', x: 110, y: 92, ins: ['b', 'b'], label: 'NOT b', valueAt: [170, 104] },
      { id: 'g', type: 'nand', x: 240, y: 66, ins: ['na', 'nb'], label: 'NAND(ā, b̄)' },
    ],
    outputs: [{ id: 'out', label: 'out', x: 330, y: 84, src: 'g' }],
    wires: [
      { from: 'a', to: 'na.0', bx: 90 },
      { from: 'a', to: 'na.1', bx: 90 },
      { from: 'b', to: 'nb.0', bx: 90 },
      { from: 'b', to: 'nb.1', bx: 90 },
      { from: 'na', to: 'g.0', bx: 205 },
      { from: 'nb', to: 'g.1', bx: 205 },
      { from: 'g', to: 'out:out' },
    ],
    dots: [
      [90, 40],
      [90, 110],
    ],
  },
  'xor-nand': {
    name: 'xor-nand',
    short: 'XOR',
    title: 'XOR from four NANDs',
    w: 420,
    h: 150,
    inputs: [
      { id: 'a', label: 'a', x: 60, y: 31 },
      { id: 'b', label: 'b', x: 60, y: 129 },
    ],
    gates: [
      { id: 'g1', type: 'nand', x: 110, y: 62, ins: ['a', 'b'], label: 'NAND(a, b)', valueAt: [166, 76] },
      { id: 'g2', type: 'nand', x: 210, y: 22, ins: ['a', 'g1'] },
      { id: 'g3', type: 'nand', x: 210, y: 102, ins: ['g1', 'b'] },
      { id: 'g4', type: 'nand', x: 300, y: 62, ins: ['g2', 'g3'] },
    ],
    outputs: [{ id: 'out', label: 'out', x: 370, y: 80, src: 'g4' }],
    wires: [
      { from: 'a', to: 'g2.0' },
      { from: 'a', to: 'g1.0', bx: 82 },
      { from: 'b', to: 'g3.1' },
      { from: 'b', to: 'g1.1', bx: 92 },
      { from: 'g1', to: 'g2.1', bx: 186 },
      { from: 'g1', to: 'g3.0', bx: 186 },
      { from: 'g2', to: 'g4.0', bx: 280 },
      { from: 'g3', to: 'g4.1', bx: 280 },
      { from: 'g4', to: 'out:out' },
    ],
    dots: [
      [82, 31],
      [92, 129],
      [186, 80],
    ],
  },
  'half-adder': {
    name: 'half-adder',
    short: 'Half adder',
    title: 'Half adder: sum = a ⊕ b, carry = ab',
    w: 330,
    h: 140,
    inputs: [
      { id: 'a', label: 'a', x: 60, y: 31 },
      { id: 'b', label: 'b', x: 60, y: 119 },
    ],
    gates: [
      { id: 'sum', type: 'xor', x: 170, y: 22, ins: ['a', 'b'] },
      { id: 'carry', type: 'and', x: 170, y: 92, ins: ['a', 'b'] },
    ],
    outputs: [
      { id: 'sum', label: 'sum', x: 260, y: 40, src: 'sum' },
      { id: 'carry', label: 'carry', x: 260, y: 110, src: 'carry' },
    ],
    wires: [
      { from: 'a', to: 'sum.0' },
      { from: 'a', to: 'carry.0', bx: 100 },
      { from: 'b', to: 'carry.1' },
      { from: 'b', to: 'sum.1', bx: 125 },
      { from: 'sum', to: 'out:sum' },
      { from: 'carry', to: 'out:carry' },
    ],
    dots: [
      [100, 31],
      [125, 119],
    ],
  },
  'full-adder': {
    name: 'full-adder',
    short: 'Full adder',
    title: 'Full adder: two half adders and an OR',
    w: 470,
    h: 180,
    inputs: [
      { id: 'a', label: 'a', x: 50, y: 26 },
      { id: 'b', label: 'b', x: 50, y: 62 },
      { id: 'c', label: 'c', x: 50, y: 160 },
    ],
    gates: [
      { id: 'x1', type: 'xor', x: 130, y: 17, ins: ['a', 'b'], label: 'a ⊕ b', valueAt: [178, 29] },
      { id: 'a1', type: 'and', x: 130, y: 81, ins: ['a', 'b'], label: 'ab', valueAt: [178, 93] },
      { id: 'x2', type: 'xor', x: 270, y: 39, ins: ['x1', 'c'] },
      { id: 'a2', type: 'and', x: 270, y: 129, ins: ['x1', 'c'], label: 'c(a ⊕ b)', valueAt: [318, 141] },
      { id: 'o', type: 'or', x: 355, y: 99, ins: ['a1', 'a2'] },
    ],
    outputs: [
      { id: 'sum', label: 'sum', x: 410, y: 57, src: 'x2' },
      { id: 'carry', label: 'carry', x: 410, y: 117, src: 'o' },
    ],
    wires: [
      { from: 'a', to: 'x1.0' },
      { from: 'a', to: 'a1.0', bx: 85 },
      { from: 'b', to: 'x1.1', bx: 115 },
      { from: 'b', to: 'a1.1', bx: 100 },
      { from: 'x1', to: 'x2.0', bx: 215 },
      { from: 'x1', to: 'a2.0', bx: 215 },
      { from: 'c', to: 'a2.1' },
      { from: 'c', to: 'x2.1', bx: 240 },
      { from: 'a1', to: 'o.0' },
      { from: 'a2', to: 'o.1', bx: 335 },
      { from: 'x2', to: 'out:sum' },
      { from: 'o', to: 'out:carry' },
    ],
    dots: [
      [85, 26],
      [100, 62],
      [215, 48],
      [240, 160],
    ],
  },
  mux: {
    name: 'mux',
    short: 'Mux',
    title: 'Mux: out = sel ? b : a',
    w: 420,
    h: 180,
    inputs: [
      { id: 'a', label: 'a', x: 60, y: 30 },
      { id: 'b', label: 'b', x: 60, y: 100 },
      { id: 'sel', label: 'sel', x: 60, y: 160 },
    ],
    gates: [
      { id: 'ns', type: 'not', x: 110, y: 148, ins: ['sel'], label: 'NOT sel', valueAt: [152, 154] },
      { id: 'g1', type: 'and', x: 200, y: 21, ins: ['a', 'ns'], label: 'a · s̄', valueAt: [248, 33] },
      { id: 'g2', type: 'and', x: 200, y: 91, ins: ['b', 'sel'], label: 'b · s', valueAt: [248, 103] },
      { id: 'g3', type: 'or', x: 290, y: 56, ins: ['g1', 'g2'] },
    ],
    outputs: [{ id: 'out', label: 'out', x: 365, y: 74, src: 'g3' }],
    wires: [
      { from: 'a', to: 'g1.0' },
      { from: 'b', to: 'g2.0' },
      { from: 'sel', to: 'ns.0' },
      { from: 'sel', to: 'g2.1', bx: 90 },
      { from: 'ns', to: 'g1.1', bx: 172 },
      { from: 'g1', to: 'g3.0', bx: 268 },
      { from: 'g2', to: 'g3.1', bx: 268 },
      { from: 'g3', to: 'out:out' },
    ],
    dots: [[90, 160]],
  },
  'mux-nand': {
    name: 'mux-nand',
    short: 'Mux (4 NANDs)',
    title: 'Mux from four NANDs',
    w: 420,
    h: 180,
    inputs: [
      { id: 'a', label: 'a', x: 60, y: 30 },
      { id: 'b', label: 'b', x: 60, y: 100 },
      { id: 'sel', label: 'sel', x: 60, y: 160 },
    ],
    gates: [
      { id: 'ns', type: 'nand', x: 110, y: 142, ins: ['sel', 'sel'], label: 'NOT sel', valueAt: [168, 154] },
      { id: 'g1', type: 'nand', x: 200, y: 21, ins: ['a', 'ns'] },
      { id: 'g2', type: 'nand', x: 200, y: 91, ins: ['b', 'sel'] },
      { id: 'g3', type: 'nand', x: 290, y: 56, ins: ['g1', 'g2'] },
    ],
    outputs: [{ id: 'out', label: 'out', x: 370, y: 74, src: 'g3' }],
    wires: [
      { from: 'a', to: 'g1.0' },
      { from: 'b', to: 'g2.0' },
      { from: 'sel', to: 'ns.0', bx: 90 },
      { from: 'sel', to: 'ns.1', bx: 90 },
      { from: 'sel', to: 'g2.1', bx: 90 },
      { from: 'ns', to: 'g1.1', bx: 180 },
      { from: 'g1', to: 'g3.0', bx: 270 },
      { from: 'g2', to: 'g3.1', bx: 270 },
      { from: 'g3', to: 'out:out' },
    ],
    dots: [
      [90, 160],
      [90, 151],
    ],
  },
  dmux: {
    name: 'dmux',
    short: 'DMux',
    title: 'DMux: route in to a (sel = 0) or b (sel = 1)',
    w: 350,
    h: 180,
    inputs: [
      { id: 'in', label: 'in', x: 60, y: 40 },
      { id: 'sel', label: 'sel', x: 60, y: 160 },
    ],
    gates: [
      { id: 'ns', type: 'not', x: 110, y: 148, ins: ['sel'], label: 'NOT sel', valueAt: [152, 154] },
      { id: 'ga', type: 'and', x: 200, y: 31, ins: ['in', 'ns'] },
      { id: 'gb', type: 'and', x: 200, y: 103, ins: ['in', 'sel'] },
    ],
    outputs: [
      { id: 'a', label: 'a', x: 290, y: 49, src: 'ga' },
      { id: 'b', label: 'b', x: 290, y: 121, src: 'gb' },
    ],
    wires: [
      { from: 'in', to: 'ga.0' },
      { from: 'in', to: 'gb.0', bx: 85 },
      { from: 'sel', to: 'ns.0' },
      { from: 'sel', to: 'gb.1', bx: 95 },
      { from: 'ns', to: 'ga.1', bx: 175 },
      { from: 'ga', to: 'out:a' },
      { from: 'gb', to: 'out:b' },
    ],
    dots: [
      [85, 40],
      [95, 160],
    ],
  },
  'sr-latch': {
    name: 'sr-latch',
    short: 'SR latch',
    title: 'SR latch from two cross-coupled NANDs',
    w: 390,
    h: 160,
    sequential: true,
    inputs: [
      { id: 'S', label: 'S̄', x: 60, y: 40 },
      { id: 'R', label: 'R̄', x: 60, y: 130 },
    ],
    gates: [
      { id: 'Q', type: 'nand', x: 170, y: 31, ins: ['S', 'Qn'], valueAt: [228, 43] },
      { id: 'Qn', type: 'nand', x: 170, y: 103, ins: ['Q', 'R'], valueAt: [228, 133] },
    ],
    outputs: [
      { id: 'Q', label: 'Q', x: 320, y: 49, src: 'Q' },
      { id: 'Qn', label: 'Q̄', x: 320, y: 121, src: 'Qn' },
    ],
    wires: [
      { from: 'S', to: 'Q.0' },
      { from: 'R', to: 'Qn.1' },
      {
        from: 'Q',
        to: 'Qn.0',
        pts: [
          [250, 49],
          [250, 76],
          [140, 76],
          [140, 112],
        ],
      },
      {
        from: 'Qn',
        to: 'Q.1',
        pts: [
          [262, 121],
          [262, 94],
          [150, 94],
          [150, 58],
        ],
      },
      { from: 'Q', to: 'out:Q' },
      { from: 'Qn', to: 'out:Qn' },
    ],
    dots: [
      [250, 49],
      [262, 121],
    ],
    init: { Q: 0, Qn: 1 },
    initInputs: { S: 1, R: 1 },
  },
};

const CUSTOM = ['ripple-4', 'bit'] as const;
const ALL = [...Object.keys(CIRCUITS), ...CUSTOM];
const SHORT: Record<string, string> = { ...Object.fromEntries(Object.values(CIRCUITS).map((c) => [c.name, c.short])), 'ripple-4': '4-bit adder', bit: 'Bit (DFF)' };

// ------------------------------------------------------------------------------------ drawing

const LIT = 'var(--plot-4)';
const DARK = 'var(--plot-axis)';
const wireColor = (v: number | null) => (v === null ? DARK : v ? LIT : DARK);

function gateGeom(g: GateSpec) {
  if (g.type === 'not') return { ins: [[g.x, g.y + 12]] as Pt[], out: [g.x + 36, g.y + 12] as Pt, inset: 0 };
  const bubble = g.type === 'nand' || g.type === 'nor';
  const inset = g.type === 'or' || g.type === 'nor' ? 4 : g.type === 'xor' ? 4 : 0;
  return {
    ins: [
      [g.x, g.y + 9],
      [g.x, g.y + 27],
    ] as Pt[],
    out: [g.x + (bubble ? 52 : 44), g.y + 18] as Pt,
    inset,
  };
}

function GateShape({ g }: { g: GateSpec }) {
  const body = { fill: 'var(--color-surface)', stroke: 'var(--color-ink-2)', strokeWidth: 1.6 };
  const t = `translate(${g.x},${g.y})`;
  let shape: ReactNode;
  if (g.type === 'not')
    shape = (
      <>
        <path d="M0,0 L28,12 L0,24 Z" {...body} />
        <circle cx={32} cy={12} r={4} {...body} />
      </>
    );
  else if (g.type === 'and' || g.type === 'nand')
    shape = (
      <>
        <path d="M0,0 H22 A18,18 0 0 1 22,36 H0 Z" {...body} />
        {g.type === 'nand' && <circle cx={48} cy={18} r={4} {...body} />}
      </>
    );
  else if (g.type === 'or' || g.type === 'nor')
    shape = (
      <>
        <path d="M0,0 Q12,18 0,36 Q28,36 44,18 Q28,0 0,0 Z" {...body} />
        {g.type === 'nor' && <circle cx={48} cy={18} r={4} {...body} />}
      </>
    );
  else
    shape = (
      <>
        <path d="M6,0 Q18,18 6,36 Q30,36 44,18 Q30,0 6,0 Z" {...body} />
        <path d="M0,0 Q12,18 0,36" fill="none" stroke="var(--color-ink-2)" strokeWidth={1.6} />
      </>
    );
  return (
    <g transform={t}>
      {shape}
      <text x={g.type === 'xor' ? 23 : 17} y={g.type === 'not' ? 15.5 : 21.5} fontSize={8.5} textAnchor="middle" fill="var(--color-ink-3)" style={{ fontWeight: 600 }}>
        {g.type === 'not' ? '' : g.type.toUpperCase()}
      </text>
    </g>
  );
}

function routeOf(p1: Pt, p2: Pt, w: WireSpec): Pt[] {
  if (w.pts) return [p1, ...w.pts, p2];
  if (Math.abs(p1[1] - p2[1]) < 0.5) return [p1, p2];
  const bx = w.bx ?? (p1[0] + p2[0]) / 2;
  return [p1, [bx, p1[1]], [bx, p2[1]], p2];
}

/** One input switch: a clickable box showing the bit, label on its left. */
function Switch({ x, y, label, v, onToggle }: { x: number; y: number; label: string; v: number; onToggle: () => void }) {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };
  return (
    <g role="switch" aria-checked={v === 1} aria-label={`input ${label}`} tabIndex={0} onClick={onToggle} onKeyDown={onKey} style={{ cursor: 'pointer', outline: 'none' }} className="[&:focus-visible>rect]:stroke-[var(--color-accent)]">
      <line x1={x - 8} y1={y} x2={x} y2={y} stroke={wireColor(v)} strokeWidth={2.4} />
      <rect x={x - 38} y={y - 12} width={30} height={24} rx={6} fill={v ? tint(LIT, 35) : 'var(--color-surface-2)'} stroke={v ? LIT : 'var(--color-line)'} strokeWidth={2} />
      <text x={x - 23} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--color-ink)" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
        {v}
      </text>
      <text x={x - 44} y={y + 5} textAnchor="end" fontSize={14} fontStyle="italic" fill="var(--color-ink)">
        {label}
      </text>
    </g>
  );
}

function OutBox({ x, y, label, v }: { x: number; y: number; label: string; v: number | null }) {
  return (
    <g>
      <rect x={x} y={y - 12} width={30} height={24} rx={12} fill={v ? tint(LIT, 35) : 'var(--color-surface-2)'} stroke={v ? LIT : 'var(--color-line)'} strokeWidth={2} strokeDasharray={v === null ? '3 3' : undefined} />
      <text x={x + 15} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--color-ink)" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
        {v === null ? '?' : v}
      </text>
      <text x={x + 36} y={y + 5} fontSize={14} fontStyle="italic" fill="var(--color-ink)">
        {label}
      </text>
    </g>
  );
}

function Svg({ w, h, label, children, x0 = 0 }: { w: number; h: number; label: string; children: ReactNode; x0?: number }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <svg viewBox={`${x0} 0 ${w} ${h}`} width="100%" style={{ maxWidth: w * 1.45, minWidth: Math.round(w * 0.78) }} role="img" aria-label={label} className="mx-auto block select-none">
        {children}
      </svg>
    </div>
  );
}

function CircuitDiagram({ c, values, onToggle }: { c: Circuit; values: Record<string, number>; onToggle: (id: string) => void }) {
  const gates = Object.fromEntries(c.gates.map((g) => [g.id, g]));
  const outs = Object.fromEntries(c.outputs.map((o) => [o.id, o]));
  const srcPin = (id: string): Pt => {
    const g = gates[id];
    if (g) return gateGeom(g).out;
    const i = c.inputs.find((q) => q.id === id)!;
    return [i.x, i.y];
  };
  const dstPin = (to: string): Pt => {
    if (to.startsWith('out:')) {
      const o = outs[to.slice(4)];
      return [o.x, o.y];
    }
    const [gid, pin] = to.split('.');
    const geo = gateGeom(gates[gid]);
    const p = geo.ins[+pin];
    return [p[0] + geo.inset, p[1]];
  };
  // Leave room for input labels on the left and output labels on the right.
  const x0 = Math.min(0, ...c.inputs.map((i) => i.x - 50 - 8 * i.label.length));
  const right = Math.max(c.w, ...c.outputs.map((o) => o.x + 44 + 8.5 * o.label.length));
  return (
    <Svg x0={x0} w={right - x0} h={c.h} label={`${c.title} circuit diagram`}>
      {c.wires.map((w, i) => {
        const v = values[w.from] ?? 0;
        const pts = routeOf(srcPin(w.from), dstPin(w.to), w);
        return <polyline key={i} points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={wireColor(v)} strokeWidth={v ? 2.6 : 1.8} strokeLinejoin="round" />;
      })}
      {c.dots?.map(([x, y], i) => {
        const w = c.wires.find((wi) => routeOf(srcPin(wi.from), dstPin(wi.to), wi).some((p, k, arr) => k > 0 && onSeg(arr[k - 1], p, [x, y])));
        return <circle key={i} cx={x} cy={y} r={3.2} fill={wireColor(w ? (values[w.from] ?? 0) : 0)} />;
      })}
      {c.gates.map((g) => (
        <GateShape key={g.id} g={g} />
      ))}
      {c.gates.map((g) => {
        const [ox, oy] = gateGeom(g).out;
        const [vx, vy] = g.valueAt ?? [ox + 5, oy - 6];
        const v = values[g.id] ?? 0;
        return (
          <g key={`l${g.id}`}>
            {g.label && (
              <text x={g.x + (g.type === 'not' ? 16 : 24)} y={g.y - 5} textAnchor="middle" fontSize={10.5} fill="var(--color-ink-2)">
                {g.label}
              </text>
            )}
            <text x={vx} y={vy} fontSize={11.5} fontWeight={700} fill={v ? LIT : 'var(--color-ink-3)'} style={{ fontFamily: 'var(--font-mono, monospace)' }}>
              {v}
            </text>
          </g>
        );
      })}
      {c.inputs.map((i) => (
        <Switch key={i.id} x={i.x} y={i.y} label={i.label} v={values[i.id] ?? 0} onToggle={() => onToggle(i.id)} />
      ))}
      {c.outputs.map((o) => (
        <OutBox key={o.id} x={o.x} y={o.y} label={o.label} v={values[o.src] ?? 0} />
      ))}
    </Svg>
  );
}

function onSeg(a: Pt, b: Pt, p: Pt) {
  const minx = Math.min(a[0], b[0]) - 0.5;
  const maxx = Math.max(a[0], b[0]) + 0.5;
  const miny = Math.min(a[1], b[1]) - 0.5;
  const maxy = Math.max(a[1], b[1]) + 0.5;
  return p[0] >= minx && p[0] <= maxx && p[1] >= miny && p[1] <= maxy;
}

// ------------------------------------------------------------------------------------ truth table

function TruthTable({ cols, outCols, rows, current, onPick, extra }: { cols: string[]; outCols: string[]; rows: { ins: number[]; outs: (number | string)[]; note?: string }[]; current: number; onPick: (ins: number[]) => void; extra?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse font-mono text-[13px] tabular-nums" style={{ width: 'auto' }}>
        <thead>
          <tr className="text-ink-2">
            {cols.map((c, i) => (
              <th key={c} className={`px-2.5 py-1 font-semibold italic ${i === cols.length - 1 ? 'border-r border-line' : ''}`}>
                {c}
              </th>
            ))}
            {outCols.map((c) => (
              <th key={c} className="px-2.5 py-1 font-semibold italic">
                {c}
              </th>
            ))}
            {extra !== undefined && <th className="px-2.5 py-1 text-left font-sans text-[12px] font-normal">{extra}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, k) => (
            <tr
              key={k}
              onClick={() => onPick(r.ins)}
              className="cursor-pointer border-t border-line hover:bg-surface-2"
              style={k === current ? { background: tint('var(--plot-4)', 22), fontWeight: 700 } : undefined}
              aria-current={k === current}
            >
              {r.ins.map((v, i) => (
                <td key={i} className={`px-2.5 py-0.5 text-center ${i === r.ins.length - 1 ? 'border-r border-line' : ''}`}>
                  {v}
                </td>
              ))}
              {r.outs.map((v, i) => (
                <td key={i} className="px-2.5 py-0.5 text-center">
                  {v}
                </td>
              ))}
              {r.note !== undefined && <td className="px-2.5 py-0.5 text-left font-sans text-[12px] text-ink-2">{r.note}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ------------------------------------------------------------------------------------ widget

export default function LogicCircuit({ params }: WidgetProps) {
  const first = str(params, 'circuit', 'xor-nand');
  const list = strArray(params, 'circuits', [first]);
  for (const c of [first, ...list]) if (!ALL.includes(c)) throw new Error(`unknown circuit "${c}" (use ${ALL.join(', ')})`);
  if (!list.includes(first)) throw new Error('parameter "circuit" must be one of "circuits"');
  const inputsParam = params.inputs;
  if (inputsParam !== undefined && (typeof inputsParam !== 'object' || inputsParam === null || Array.isArray(inputsParam) || !Object.values(inputsParam).every((v) => v === 0 || v === 1)))
    throw new Error('parameter "inputs" should be an object of 0/1 values, e.g. {"a": 1}');
  const showTable = bool(params, 'table', true);
  const [name, setName] = useState(first);
  const title = str(params, 'title', name in CIRCUITS ? CIRCUITS[name].title : name === 'ripple-4' ? '4-bit ripple-carry adder' : 'Bit: a 1-bit register');

  return (
    <Frame title={title} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {list.length > 1 && <Segmented value={name} onChange={setName} options={list.map((c) => ({ value: c, label: SHORT[c] }))} />}
      {name === 'ripple-4' ? (
        <Ripple4 params={params} />
      ) : name === 'bit' ? (
        <BitRegister params={params} />
      ) : (
        <GateCircuit key={name} c={CIRCUITS[name]} initial={(name === first ? (inputsParam as Record<string, number>) : undefined) ?? {}} showTable={showTable} />
      )}
    </Frame>
  );
}

function GateCircuit({ c, initial, showTable }: { c: Circuit; initial: Record<string, number>; showTable: boolean }) {
  for (const k of Object.keys(initial)) if (!c.inputs.some((i) => i.id === k)) throw new Error(`parameter "inputs" names "${k}", which is not an input of ${c.name} (inputs: ${c.inputs.map((i) => i.id).join(', ')})`);
  const [inputs, setInputs] = useState<Record<string, number>>(() => ({ ...Object.fromEntries(c.inputs.map((i) => [i.id, 0])), ...c.initInputs, ...initial }));
  const [state, setState] = useState(() => settle(c, inputs, c.init ?? {}));
  const [history, setHistory] = useState<{ S: number; R: number; Q: number; Qn: number; note: string }[]>(() => (c.sequential ? [{ S: inputs.S, R: inputs.R, Q: state.values.Q, Qn: state.values.Qn, note: 'start' }] : []));

  const apply = (next: Record<string, number>) => {
    const prevInputs = inputs;
    const r = settle(c, next, state.values);
    setInputs(next);
    setState(r);
    if (c.sequential) {
      const raced = prevInputs.S === 0 && prevInputs.R === 0 && next.S === 1 && next.R === 1;
      const note = next.S === 0 && next.R === 0 ? 'forbidden: Q = Q̄ = 1' : next.S === 0 ? 'set' : next.R === 0 ? 'reset' : raced ? 'race: either state possible' : 'hold';
      setHistory((h) => [...h.slice(-7), { S: next.S, R: next.R, Q: r.values.Q, Qn: r.values.Qn, note }]);
    }
  };
  const toggle = (id: string) => apply({ ...inputs, [id]: 1 - inputs[id] });

  const table = useMemo(() => {
    if (c.sequential) return null;
    const n = c.inputs.length;
    return Array.from({ length: 1 << n }, (_, k) => {
      const ins = c.inputs.map((_, i) => (k >> (n - 1 - i)) & 1);
      const vals = settle(c, Object.fromEntries(c.inputs.map((inp, i) => [inp.id, ins[i]])), {}).values;
      return { ins, outs: c.outputs.map((o) => vals[o.src]) };
    });
  }, [c]);
  const current = c.inputs.reduce((acc, i) => acc * 2 + inputs[i.id], 0);

  if (c.sequential) {
    const S = inputs.S;
    const R = inputs.R;
    const rowIdx = S === 0 && R === 1 ? 0 : S === 1 && R === 0 ? 1 : S === 1 && R === 1 ? 2 : 3;
    const last = history[history.length - 1];
    return (
      <div className="space-y-3">
        <CircuitDiagram c={c} values={state.values} onToggle={toggle} />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-1 text-center text-[12px] text-ink-2">What each input pair does (inputs are active low)</div>
            <TruthTable
              cols={['S̄', 'R̄']}
              outCols={['Q']}
              extra=""
              current={rowIdx}
              onPick={(ins) => apply({ S: ins[0], R: ins[1] })}
              rows={[
                { ins: [0, 1], outs: [1], note: 'set' },
                { ins: [1, 0], outs: [0], note: 'reset' },
                { ins: [1, 1], outs: ['Q'], note: 'hold: remember' },
                { ins: [0, 0], outs: ['1*'], note: 'forbidden (Q̄ = 1 too)' },
              ]}
            />
          </div>
          <div>
            <div className="mb-1 text-center text-[12px] text-ink-2">History (latest last)</div>
            <TruthTable cols={['S̄', 'R̄']} outCols={['Q', 'Q̄']} extra="" current={history.length - 1} onPick={() => {}} rows={history.map((h) => ({ ins: [h.S, h.R], outs: [h.Q, h.Qn], note: h.note }))} />
          </div>
        </div>
        {last.note.startsWith('race') ? (
          <Note tone="warn">Both inputs went from 0 back to 1 together. Each NAND now wants to switch, and which one wins depends on tiny differences in gate delay: in a real latch the outcome is unpredictable and may even hover (metastability). This simulator lets the top gate win.</Note>
        ) : S === 1 && R === 1 ? (
          <Note>With S̄ = R̄ = 1 each NAND just inverts the other gate's output, so the loop holds whatever it last held: Q = {state.values.Q}. That loop is one bit of memory.</Note>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${showTable ? 'lg:grid-cols-[1fr_auto]' : ''}`}>
      <CircuitDiagram c={c} values={state.values} onToggle={toggle} />
      {showTable && table && (
        <div>
          <div className="mb-1 text-center text-[12px] text-ink-2">Truth table (click a row)</div>
          <TruthTable cols={c.inputs.map((i) => i.label)} outCols={c.outputs.map((o) => o.label)} rows={table} current={current} onPick={(ins) => apply(Object.fromEntries(c.inputs.map((inp, i) => [inp.id, ins[i]])))} />
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------------------------ 4-bit ripple adder

function Ripple4({ params }: { params: Record<string, unknown> }) {
  const a0 = num(params, 'a', 11);
  const b0 = num(params, 'b', 6);
  for (const [k, v] of [['a', a0], ['b', b0]] as const) if (!Number.isInteger(v) || v < 0 || v > 15) throw new Error(`parameter "${k}" should be an integer 0..15 for the 4-bit adder, got ${v}`);
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const [c0, setC0] = useState(0);
  const [delayView, setDelayView] = useState(bool(params, 'delay', false));
  const [t, setT] = useState(4);
  const [playing, setPlaying] = useState(false);
  const acc = useRef(0);
  useAnimation(playing, (dt) => {
    acc.current += dt;
    if (acc.current >= 0.7) {
      acc.current = 0;
      setT((x) => {
        if (x >= 4) {
          setPlaying(false);
          return 4;
        }
        return x + 1;
      });
    }
  });
  useEffect(() => {
    if (t >= 4) setPlaying(false);
  }, [t]);

  const bitsOf = (v: number) => [0, 1, 2, 3].map((i) => (v >> i) & 1);
  const A = bitsOf(a);
  const B = bitsOf(b);
  const c: number[] = [c0];
  const s: number[] = [];
  // Settling times in full-adder delays. A column whose operand bits are equal fixes its own
  // carry out (1+1 generates, 0+0 kills) after one delay; otherwise it propagates, and its carry
  // out is ready one delay after its carry in. A sum bit is ready one delay after its carry in.
  const tc: number[] = [0];
  const ts: number[] = [];
  for (let i = 0; i < 4; i++) {
    s.push(A[i] ^ B[i] ^ c[i]);
    c.push((A[i] & B[i]) | (c[i] & (A[i] ^ B[i])));
    tc.push(A[i] === B[i] ? 1 : tc[i] + 1);
    ts.push(tc[i] + 1);
  }
  const settleTime = Math.max(tc[4], ...ts);
  const time = delayView ? t : 4;
  const known = (i: number) => tc[i] <= time;
  const sumKnown = (i: number) => ts[i] <= time;

  const change = (f: () => void) => {
    f();
    if (delayView) {
      setT(0);
      setPlaying(false);
    }
  };

  const W = 525;
  const H = 250;
  const colX = (i: number) => 70 + (3 - i) * 105;
  const Y = 95;
  const sumVal = s.reduce((acc2, v, i) => acc2 + (v << i), 0);

  const SwitchV = ({ x, y, label, v, onToggle }: { x: number; y: number; label: string; v: number; onToggle: () => void }) => (
    <g role="switch" aria-checked={v === 1} aria-label={`input ${label}`} tabIndex={0} onClick={onToggle} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onToggle())} style={{ cursor: 'pointer', outline: 'none' }} className="[&:focus-visible>rect]:stroke-[var(--color-accent)]">
      <rect x={x - 13} y={y} width={26} height={24} rx={6} fill={v ? tint(LIT, 35) : 'var(--color-surface-2)'} stroke={v ? LIT : 'var(--color-line)'} strokeWidth={2} />
      <text x={x} y={y + 17} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--color-ink)" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
        {v}
      </text>
      <text x={x} y={y - 5} textAnchor="middle" fontSize={12.5} fontStyle="italic" fill="var(--color-ink)">
        {label}
      </text>
    </g>
  );
  const wire = (pts: Pt[], v: number | null, key: string) => <polyline key={key} points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={wireColor(v)} strokeWidth={v ? 2.6 : 1.8} strokeDasharray={v === null ? '4 4' : undefined} />;
  const val = (x: number, y: number, v: number | null, anchor: 'start' | 'middle' | 'end' = 'middle') => (
    <text x={x} y={y} textAnchor={anchor} fontSize={11.5} fontWeight={700} fill={v ? LIT : 'var(--color-ink-3)'} style={{ fontFamily: 'var(--font-mono, monospace)' }}>
      {v === null ? '?' : v}
    </text>
  );

  return (
    <div className="space-y-3">
      <Svg w={W} h={H} label="Four full adders chained by their carries">
        {[0, 1, 2, 3].map((i) => {
          const x = colX(i);
          const co = known(i + 1) ? c[i + 1] : null;
          const si = sumKnown(i) ? s[i] : null;
          return (
            <g key={i}>
              {wire([[x + 20, 58], [x + 20, Y]], A[i], `a${i}`)}
              {wire([[x + 50, 58], [x + 50, Y]], B[i], `b${i}`)}
              {wire([[x + 35, Y + 60], [x + 35, Y + 100]], si, `s${i}`)}
              {/* carry out to the left */}
              {wire([[x, Y + 30], [x - 35, Y + 30]], co, `c${i + 1}`)}
              <text x={x - 17} y={Y + 24} textAnchor="middle" fontSize={10.5} fill="var(--color-ink-2)">
                c{i + 1}
              </text>
              {val(x - 17, Y + 46, co)}
              <rect x={x} y={Y} width={70} height={60} rx={8} fill="var(--color-surface)" stroke={known(i + 1) && sumKnown(i) ? 'var(--color-ink-2)' : 'var(--plot-4)'} strokeWidth={1.6} strokeDasharray={known(i + 1) ? undefined : '5 3'} />
              <text x={x + 35} y={Y + 28} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--color-ink)">
                FA
              </text>
              <text x={x + 35} y={Y + 45} textAnchor="middle" fontSize={10} fill="var(--color-ink-3)">
                bit {i}
              </text>
              <SwitchV x={x + 20} y={34} label={`a${i}`} v={A[i]} onToggle={() => change(() => setA(a ^ (1 << i)))} />
              <SwitchV x={x + 50} y={34} label={`b${i}`} v={B[i]} onToggle={() => change(() => setB(b ^ (1 << i)))} />
              <OutBox x={x + 20} y={Y + 112} label="" v={si} />
              <text x={x + 35} y={Y + 143} textAnchor="middle" fontSize={12.5} fontStyle="italic" fill="var(--color-ink)">
                s{i}
              </text>
            </g>
          );
        })}
        {/* carry in */}
        {wire([[colX(0) + 70, Y + 30], [colX(0) + 92, Y + 30]], c0, 'c0')}
        <SwitchV x={colX(0) + 105} y={Y + 18} label="c0" v={c0} onToggle={() => change(() => setC0(1 - c0))} />
        {/* carry out */}
        <OutBox x={colX(3) - 66} y={Y + 30} label="" v={known(4) ? c[4] : null} />
        <text x={colX(3) - 51} y={Y + 6} textAnchor="middle" fontSize={12.5} fontStyle="italic" fill="var(--color-ink)">
          carry
        </text>
      </Svg>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="a" value={`${A.slice().reverse().join('')} = ${a}`} />
        <Readout label="b" value={`${B.slice().reverse().join('')} = ${b}`} />
        <Readout label="sum s3…s0" value={time >= settleTime ? `${s.slice().reverse().join('')} = ${sumVal}` : 'settling…'} tone="var(--plot-1)" />
        <Readout label="carry out c4" value={known(4) ? c[4] : '?'} tone={known(4) && c[4] ? 'var(--plot-2)' : undefined} />
      </div>
      {time >= settleTime && (
        <Note tone={c[4] ? 'warn' : 'good'}>
          {a} + {b}
          {c0 ? ' + 1' : ''} = {a + b + c0}
          {c[4] ? `, which needs 5 bits: the 4-bit result is ${sumVal} and the carry out is lost in modular arithmetic (${a + b + c0} − 16 = ${sumVal}).` : `, and it fits in 4 bits.`}
        </Note>
      )}
      <div className="space-y-2">
        <Toggle
          label="Show carry delay (each full adder takes one time step)"
          checked={delayView}
          onChange={(v) => {
            setDelayView(v);
            setT(v ? 0 : 4);
            setPlaying(false);
          }}
        />
        {delayView && (
          <div className="flex flex-wrap items-end gap-3">
            <div className="min-w-[200px] flex-1">
              <Slider label="Time since the inputs changed (full-adder delays)" value={t} min={0} max={4} step={1} onChange={(v) => setT(v)} format={(v) => String(v)} />
            </div>
            <Button onClick={() => setT((x) => Math.min(4, x + 1))} disabled={t >= 4}>
              Step
            </Button>
            <Button primary onClick={() => (t >= 4 ? (setT(0), setPlaying(true)) : setPlaying((p) => !p))}>
              {playing ? 'Pause' : t >= 4 ? 'Replay' : 'Play'}
            </Button>
          </div>
        )}
        {delayView && (
          <Note>
            Dashed wires and boxes are still settling (shown as ?). A column with equal bits (1 + 1 or 0 + 0) fixes its own carry after one delay; a column with different bits must wait for the carry from the column to its right and pass it on. These inputs settle after <b>{settleTime}</b> full-adder delay{settleTime === 1 ? '' : 's'}. Changing an input restarts the clock.
          </Note>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------ Bit register

interface Cycle {
  inV: number;
  load: number;
  d: number;
  out: number;
}

function BitRegister({ params }: { params: Record<string, unknown> }) {
  const ini = (params.inputs ?? {}) as Record<string, number>;
  const [inV, setIn] = useState(ini.in ?? 1);
  const [load, setLoad] = useState(ini.load ?? 0);
  const [out, setOut] = useState(0);
  const [hist, setHist] = useState<Cycle[]>([]);
  const [count, setCount] = useState(0);
  const d = load ? inV : out;

  const tick = () => {
    setHist((h) => [...h, { inV, load, d, out }].slice(-11));
    setCount((n) => n + 1);
    setOut(d);
  };
  const reset = () => {
    setHist([]);
    setCount(0);
    setOut(0);
  };

  const W = 470;
  const H = 175;
  const mux = { x: 160, y: 40, w: 44, h: 82 };
  const muxOut: Pt = [mux.x + mux.w, mux.y + mux.h / 2];
  const dff = { x: 260, y: 56, w: 70, h: 50 };
  const sw = (x: number, y: number, label: string, v: number, onToggle: () => void) => <Switch x={x} y={y} label={label} v={v} onToggle={onToggle} />;
  const wire = (pts: Pt[], v: number, key: string) => <polyline key={key} points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={wireColor(v)} strokeWidth={v ? 2.6 : 1.8} />;
  const cycles = [...hist, { inV, load, d, out }];
  const first = count - hist.length;

  return (
    <div className="space-y-3">
      <Svg w={W} h={H} label="Bit: a Mux feeding a DFF whose output loops back">
        {/* feedback out -> mux a */}
        {wire([[dff.x + dff.w, 81], [372, 81], [372, 18], [130, 18], [130, 60], [mux.x, 60]], out, 'fb')}
        {wire([[70, 102], [mux.x, 102]], inV, 'in')}
        {wire([[70, 150], [mux.x + mux.w / 2, 150], [mux.x + mux.w / 2, mux.y + mux.h - 6]], load, 'load')}
        {wire([muxOut, [dff.x, 81]], d, 'd')}
        {wire([[372, 81], [400, 81]], out, 'out')}
        <circle cx={372} cy={81} r={3.2} fill={wireColor(out)} />
        <path d={`M${mux.x},${mux.y} L${mux.x + mux.w},${mux.y + 14} L${mux.x + mux.w},${mux.y + mux.h - 14} L${mux.x},${mux.y + mux.h} Z`} fill="var(--color-surface)" stroke="var(--color-ink-2)" strokeWidth={1.6} />
        <text x={mux.x + 8} y={64} fontSize={11} fill="var(--color-ink-2)">
          a
        </text>
        <text x={mux.x + 8} y={106} fontSize={11} fill="var(--color-ink-2)">
          b
        </text>
        <text x={mux.x + 22} y={85} fontSize={10} textAnchor="middle" fill="var(--color-ink-3)" fontWeight={600}>
          MUX
        </text>
        <text x={mux.x + mux.w / 2 + 5} y={mux.y + mux.h + 6} fontSize={10} fill="var(--color-ink-3)">
          sel
        </text>
        <rect x={dff.x} y={dff.y} width={dff.w} height={dff.h} rx={6} fill="var(--color-surface)" stroke="var(--color-ink-2)" strokeWidth={1.6} />
        <path d={`M${dff.x + 26},${dff.y + dff.h} L${dff.x + 35},${dff.y + dff.h - 9} L${dff.x + 44},${dff.y + dff.h}`} fill="none" stroke="var(--color-ink-2)" strokeWidth={1.4} />
        <text x={dff.x + 35} y={dff.y + 25} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--color-ink)">
          DFF
        </text>
        <line x1={dff.x + 35} y1={dff.y + dff.h} x2={dff.x + 35} y2={150} stroke="var(--color-ink-3)" strokeWidth={1.4} strokeDasharray="3 3" />
        <text x={dff.x + 42} y={150} fontSize={11} fill="var(--color-ink-3)">
          clock
        </text>
        <text x={226} y={75} fontSize={11.5} fontWeight={700} fill={d ? LIT : 'var(--color-ink-3)'} textAnchor="middle" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
          {d}
        </text>
        <text x={226} y={96} fontSize={10} fill="var(--color-ink-3)" textAnchor="middle">
          next
        </text>
        <text x={250} y={13} fontSize={10.5} fill="var(--color-ink-2)" textAnchor="middle">
          feedback: out(t)
        </text>
        {sw(70, 102, 'in', inV, () => setIn(1 - inV))}
        {sw(70, 150, 'load', load, () => setLoad(1 - load))}
        <OutBox x={400} y={81} label="out" v={out} />
      </Svg>
      <div className="flex flex-wrap items-center gap-2">
        <Button primary onClick={tick}>
          Clock tick ▶
        </Button>
        <Button onClick={() => setIn(1 - inV)}>Toggle in</Button>
        <Button onClick={() => setLoad(1 - load)}>Toggle load</Button>
        <Button onClick={reset}>Reset</Button>
        <span className="text-[12.5px] text-ink-2">
          cycle t{count}: the DFF will store <b className="font-mono text-ink">{d}</b> at the next tick ({load ? 'load = 1: take in' : 'load = 0: keep out'})
        </span>
      </div>
      <Timeline cycles={cycles} first={first} />
    </div>
  );
}

function Timeline({ cycles, first }: { cycles: Cycle[]; first: number }) {
  const rows: [string, (c: Cycle) => number][] = [
    ['in', (c) => c.inV],
    ['load', (c) => c.load],
    ['DFF in', (c) => c.d],
    ['out', (c) => c.out],
  ];
  const cw = 30;
  const lw = 58;
  const rh = 26;
  const W = lw + cw * Math.max(6, cycles.length);
  const H = rh * rows.length + 22;
  return (
    <div>
      <div className="mb-1 text-[12px] text-ink-2">Timing diagram (one column per clock cycle; the last column is the current cycle). out(t) = DFF in(t − 1).</div>
      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label="Timing diagram of in, load, DFF input and out" className="block">
          {cycles.map((_, k) => (
            <g key={k}>
              <line x1={lw + k * cw} y1={14} x2={lw + k * cw} y2={H} stroke="var(--plot-grid)" />
              <text x={lw + k * cw + cw / 2} y={11} fontSize={9.5} textAnchor="middle" fill={k === cycles.length - 1 ? 'var(--color-accent)' : 'var(--color-ink-3)'}>
                {k === cycles.length - 1 ? 'now' : `t${first + k}`}
              </text>
            </g>
          ))}
          {cycles.length > 0 && <rect x={lw + (cycles.length - 1) * cw} y={14} width={cw} height={H - 14} fill={tint('var(--color-accent)', 10)} />}
          {rows.map(([label, f], r) => {
            const y0 = 22 + r * rh;
            const hi = y0 + 4;
            const lo = y0 + rh - 8;
            let d = '';
            cycles.forEach((c, k) => {
              const y = f(c) ? hi : lo;
              d += `${k === 0 ? 'M' : 'L'}${lw + k * cw},${y} L${lw + (k + 1) * cw},${y} `;
            });
            return (
              <g key={label}>
                <text x={lw - 6} y={y0 + rh / 2} fontSize={11} textAnchor="end" fill="var(--color-ink-2)">
                  {label}
                </text>
                <path d={d} fill="none" stroke={label === 'out' ? 'var(--plot-1)' : label === 'DFF in' ? 'var(--plot-4)' : 'var(--color-ink-2)'} strokeWidth={2} />
                {cycles.map((c, k) => (
                  <text key={k} x={lw + k * cw + cw / 2} y={y0 + rh / 2 + 1} fontSize={9.5} textAnchor="middle" fill="var(--color-ink-3)" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
                    {f(c)}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

