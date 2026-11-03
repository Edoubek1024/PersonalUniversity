/**
 * graph-lab: an editable graph with readouts (degrees, components, bipartite test, Euler trails,
 * Hamilton cycles, greedy colouring, tree facts, planarity bounds) and step-by-step algorithm
 * traces (BFS, DFS, Kahn, Kosaraju, Dijkstra, Bellman-Ford, Prim, Kruskal).
 *
 * Params:
 *   preset      string    starting example: k4, k5, k33, petersen, cube, cycle5, cycle6, grid, tree,
 *                         konigsberg, house, two-k4, dag, scc, dijkstra, negative, mst, empty,
 *                         or "custom" (the default when `vertices` is given)          default "k4"
 *   presets     string[]  examples in the menu ([] hides the menu)     default a general list
 *   vertices    [x, y][]  a custom layout (any units, y pointing down)
 *   labels      string[]  custom vertex labels                              default A, B, C, ...
 *   edges       [u, v] or [u, v, w][]  custom edges; u, v are indices or labels
 *   name        string    menu name of the custom graph                 default "Lesson example"
 *   directed    boolean   overrides the example's setting
 *   weighted    boolean   overrides the example's setting
 *   multi       boolean   allow parallel edges when editing                    default false
 *   editable    boolean   show the editing tools                                default true
 *   toggles     boolean   show the Directed / Weighted switches                 default true
 *   panels      string[]  readouts: degrees, adjacency, components, bipartite, euler, hamilton,
 *                         colouring, tree, planarity       default ["degrees", "components"]
 *   show        string    readout drawn on the graph at first: none, components, bipartite,
 *                         euler, hamilton, colouring                             default "none"
 *   algorithms  string[]  bfs, dfs, topo, scc, dijkstra, bellman-ford, prim, kruskal   default []
 *   source      string | number   start vertex (label or index)                     default 0
 *   title       string                                                   default "Graph lab"
 *   caption     string
 */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type PointerEvent as RPointerEvent } from 'react';
import type { WidgetProps } from '../types';
import { bool, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Note, Segmented, Slider, Toggle } from '../kit/controls';
import { useAnimation, useElementSize } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';
import {
  ALGO_LABEL,
  ALGO_NEEDS_SOURCE,
  adjacency,
  bipartite,
  components,
  degrees,
  euler,
  greedyColouring,
  hamilton,
  hasTriangle,
  trace,
  treeInfo,
  type AlgoKey,
  type ColourOrder,
  type EState,
  type Edge,
  type Graph,
  type Step,
  type VState,
} from '../kit/discrete-graph';
import { PRESETS, PRESET_KEYS } from '../kit/discrete-graph-presets';

const ALGOS: AlgoKey[] = ['bfs', 'dfs', 'topo', 'scc', 'dijkstra', 'bellman-ford', 'prim', 'kruskal'];
const PANELS = ['degrees', 'adjacency', 'components', 'bipartite', 'euler', 'hamilton', 'colouring', 'tree', 'planarity'] as const;
type Panel = (typeof PANELS)[number];
const SHOWS = ['none', 'components', 'bipartite', 'euler', 'hamilton', 'colouring'] as const;
type Show = (typeof SHOWS)[number];
const DEFAULT_MENU = ['k4', 'k5', 'k33', 'petersen', 'cube', 'cycle5', 'cycle6', 'grid', 'tree', 'konigsberg', 'house', 'dag', 'scc', 'dijkstra', 'negative', 'mst', 'empty'];
const GROUP = ['var(--plot-1)', 'var(--plot-2)', 'var(--plot-3)', 'var(--plot-4)', 'var(--plot-5)', 'var(--plot-6)'];
const PAD = 24;

interface V {
  x: number;
  y: number;
  label: string;
}
interface GState {
  key: string;
  vs: V[];
  es: Edge[];
  directed: boolean;
  weighted: boolean;
  multi: boolean;
  box: [number, number, number, number];
}

function boxOf(vs: V[]): [number, number, number, number] {
  if (!vs.length) return [0, 0, 10, 6];
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const v of vs) {
    x0 = Math.min(x0, v.x);
    x1 = Math.max(x1, v.x);
    y0 = Math.min(y0, v.y);
    y1 = Math.max(y1, v.y);
  }
  const span = Math.max(x1 - x0, y1 - y0, 1);
  // Keep a sensible shape for a row or column of vertices.
  const minW = span * 0.45;
  if (x1 - x0 < minW) [x0, x1] = [(x0 + x1) / 2 - minW / 2, (x0 + x1) / 2 + minW / 2];
  if (y1 - y0 < minW) [y0, y1] = [(y0 + y1) / 2 - minW / 2, (y0 + y1) / 2 + minW / 2];
  const pad = span * 0.06;
  return [x0 - pad, y0 - pad, x1 + pad, y1 + pad];
}

function nextLabel(vs: V[]): string {
  const used = new Set(vs.map((v) => v.label));
  if (vs.length && vs.every((v) => /^\d+$/.test(v.label))) return String(Math.max(...vs.map((v) => +v.label)) + 1);
  for (let k = 0; ; k++) {
    const l = k < 26 ? String.fromCharCode(65 + k) : String.fromCharCode(65 + (k % 26)) + Math.floor(k / 26);
    if (!used.has(l)) return l;
  }
}

function readEdges(raw: unknown, labels: string[]): Edge[] {
  if (!Array.isArray(raw)) throw new Error('parameter "edges" should be an array of [u, v] or [u, v, weight]');
  const idx = (x: unknown) => {
    if (typeof x === 'number' && Number.isInteger(x) && x >= 0 && x < labels.length) return x;
    if (typeof x === 'string' && labels.includes(x)) return labels.indexOf(x);
    throw new Error(`edge endpoint ${JSON.stringify(x)} is not a vertex index or label`);
  };
  return raw.map((e) => {
    if (!Array.isArray(e) || e.length < 2 || e.length > 3) throw new Error(`edge ${JSON.stringify(e)} should be [u, v] or [u, v, weight]`);
    const w = e.length === 3 ? e[2] : 1;
    if (typeof w !== 'number' || !Number.isFinite(w)) throw new Error(`edge ${JSON.stringify(e)} has a weight that is not a number`);
    return { u: idx(e[0]), v: idx(e[1]), w };
  });
}

export default function GraphLab({ params }: WidgetProps) {
  // ---- params
  const hasCustom = params.vertices !== undefined;
  const preset0 = str(params, 'preset', hasCustom ? 'custom' : 'k4');
  if (preset0 !== 'custom' && !(preset0 in PRESETS)) throw new Error(`unknown preset "${preset0}" (use one of ${PRESET_KEYS.join(', ')})`);
  if (preset0 === 'custom' && !hasCustom) throw new Error('preset "custom" needs a "vertices" parameter');
  const menu = strArray(params, 'presets', DEFAULT_MENU);
  for (const k of menu) if (!(k in PRESETS) && k !== 'custom') throw new Error(`unknown preset "${k}" in "presets"`);
  const panels = strArray(params, 'panels', params.algorithms ? [] : ['degrees', 'components']) as Panel[];
  for (const p of panels) if (!PANELS.includes(p)) throw new Error(`unknown panel "${p}" (use ${PANELS.join(', ')})`);
  const algos = strArray(params, 'algorithms', []) as AlgoKey[];
  for (const a of algos) if (!ALGOS.includes(a)) throw new Error(`unknown algorithm "${a}" (use ${ALGOS.join(', ')})`);
  const show0 = oneOf(params, 'show', SHOWS, 'none');
  const editable = bool(params, 'editable', true);
  const toggles = bool(params, 'toggles', true);
  const customName = str(params, 'name', 'Lesson example');

  const custom = useMemo<GState | null>(() => {
    if (!hasCustom) return null;
    const raw = params.vertices;
    if (!Array.isArray(raw) || !raw.every((p) => Array.isArray(p) && p.length === 2 && p.every((c) => typeof c === 'number' && Number.isFinite(c)))) throw new Error('parameter "vertices" should be an array of [x, y] pairs');
    const pts = raw as [number, number][];
    const labels = strArray(params, 'labels', pts.map((_, i) => (i < 26 ? String.fromCharCode(65 + i) : `v${i}`)));
    if (labels.length !== pts.length) throw new Error(`"labels" has ${labels.length} entries but "vertices" has ${pts.length}`);
    if (new Set(labels).size !== labels.length) throw new Error('"labels" has repeated labels');
    const vs = pts.map(([x, y], i) => ({ x, y, label: labels[i] }));
    return { key: 'custom', vs, es: readEdges(params.edges ?? [], labels), directed: bool(params, 'directed', false), weighted: bool(params, 'weighted', false), multi: bool(params, 'multi', false), box: boxOf(vs) };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const load = (key: string, first = false): GState => {
    if (key === 'custom' && custom) return { ...custom, vs: custom.vs.map((v) => ({ ...v })), es: custom.es.map((e) => ({ ...e })) };
    const p = PRESETS[key];
    const vs = p.pos.map(([x, y], i) => ({ x, y, label: p.labels[i] }));
    const es = p.edges.map(([u, v, w]) => ({ u, v, w: w ?? 1 }));
    // Lesson overrides apply to the starting example only.
    const directed = first && params.directed !== undefined ? bool(params, 'directed', false) : !!p.directed;
    const weighted = first && params.weighted !== undefined ? bool(params, 'weighted', false) : !!p.weighted;
    return { key, vs, es, directed, weighted, multi: !!p.multi || bool(params, 'multi', false), box: boxOf(vs) };
  };

  const [G, setG] = useState<GState>(() => load(preset0, true));
  const [mode, setMode] = useState<'move' | 'add' | 'delete'>('move');
  const [pending, setPending] = useState<number | null>(null);
  const [selEdge, setSelEdge] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [showing, setShowing] = useState<Show>(show0);
  const [order, setOrder] = useState<ColourOrder>('index');
  const src0 = params.source;
  const [source, setSource] = useState<number>(() => {
    if (src0 === undefined) return 0;
    const i = typeof src0 === 'number' ? src0 : G.vs.findIndex((v) => v.label === src0);
    if (i < 0 || i >= G.vs.length) throw new Error(`parameter "source" ${JSON.stringify(src0)} is not a vertex`);
    return i;
  });
  const [algo, setAlgo] = useState<AlgoKey | null>(algos[0] ?? null);
  const [idx, setIdx] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.5);

  const menuKeys = hasCustom && !menu.includes('custom') && params.presets === undefined ? ['custom', ...menu] : menu;

  // ---- derived graph
  const graph: Graph = useMemo(() => ({ labels: G.vs.map((v) => v.label), edges: G.es.map((e) => ({ ...e, w: G.weighted ? e.w : 1 })), directed: G.directed }), [G.vs.length, G.vs.map((v) => v.label).join('\u0000'), G.es, G.weighted, G.directed]); // eslint-disable-line react-hooks/exhaustive-deps
  const n = graph.labels.length;
  const src = clamp(source, 0, Math.max(0, n - 1));

  const run = useMemo(() => (algo ? trace(graph, algo, src) : { steps: [] as Step[] }), [graph, algo, src]);
  useEffect(() => {
    setIdx(-1);
    setPlaying(false);
  }, [run]);
  const step: Step | null = idx >= 0 ? run.steps[idx] ?? null : null;
  const acc = useRef(0);
  useAnimation(playing, (dt) => {
    acc.current += dt * speed;
    if (acc.current >= 1) {
      acc.current = 0;
      setIdx((i) => Math.min(i + 1, run.steps.length - 1));
    }
  });
  useEffect(() => {
    if (playing && idx >= run.steps.length - 1) setPlaying(false);
  }, [playing, idx, run.steps.length]);

  // ---- analyses (only those shown)
  const want = (p: Panel) => panels.includes(p);
  const deg = useMemo(() => degrees(graph), [graph]);
  const comps = useMemo(() => (want('components') || showing === 'components' ? components(graph) : null), [graph, showing]); // eslint-disable-line react-hooks/exhaustive-deps
  const bip = useMemo(() => (want('bipartite') || showing === 'bipartite' ? bipartite(graph) : null), [graph, showing]); // eslint-disable-line react-hooks/exhaustive-deps
  const eul = useMemo(() => (want('euler') || showing === 'euler' ? euler(graph) : null), [graph, showing]); // eslint-disable-line react-hooks/exhaustive-deps
  const ham = useMemo(() => (want('hamilton') || showing === 'hamilton' ? hamilton(graph) : null), [graph, showing]); // eslint-disable-line react-hooks/exhaustive-deps
  const col = useMemo(() => (want('colouring') || showing === 'colouring' ? greedyColouring(graph, order) : null), [graph, showing, order]); // eslint-disable-line react-hooks/exhaustive-deps
  const tree = useMemo(() => (want('tree') ? treeInfo(graph) : null), [graph]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- geometry
  const [wrapRef, size] = useElementSize<HTMLDivElement>();
  const W = size.width || 600;
  // Smaller vertices on a phone so dense examples keep room for their edges.
  const R = W < 480 ? 12.5 : 15;
  const [bx0, by0, bx1, by1] = G.box;
  const bw = bx1 - bx0;
  const bh = by1 - by0;
  const H = Math.round(clamp(((W - 2 * PAD) * bh) / bw + 2 * PAD, 240, 440));
  const k = Math.min((W - 2 * PAD) / bw, (H - 2 * PAD) / bh);
  const ox = (W - bw * k) / 2;
  const oy = (H - bh * k) / 2;
  const toPx = (x: number, y: number): [number, number] => [ox + (x - bx0) * k, oy + (y - by0) * k];
  const fromPx = (px: number, py: number): [number, number] => [bx0 + (px - ox) / k, by0 + (py - oy) / k];
  const clampWorld = (x: number, y: number): [number, number] => {
    const [ax, ay] = fromPx(R + 2, R + 12); // room for a badge above the top row
    const [cx, cy] = fromPx(W - R - 2, H - R - 2);
    return [clamp(x, ax, cx), clamp(y, ay, cy)];
  };
  const svgRef = useRef<SVGSVGElement>(null);
  const eventPx = (e: { clientX: number; clientY: number }): [number, number] => {
    const r = svgRef.current!.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };

  // ---- editing
  const say = (m: string) => {
    setFlash(m);
    window.setTimeout(() => setFlash((f) => (f === m ? null : f)), 2500);
  };
  const update = (fn: (g: GState) => GState) => setG((g) => fn(g));
  const addVertexAt = (x: number, y: number) => update((g) => ({ ...g, vs: [...g.vs, { x, y, label: nextLabel(g.vs) }] }));
  const addEdge = (u: number, v: number, w = 1) => {
    if (u === v) return;
    const exists = G.es.some((e) => (e.u === u && e.v === v) || (!G.directed && e.u === v && e.v === u));
    if (exists && !G.multi) {
      say(`${G.vs[u].label}–${G.vs[v].label} is already an edge.`);
      return;
    }
    update((g) => ({ ...g, es: [...g.es, { u, v, w }] }));
  };
  const removeVertex = (v: number) => {
    update((g) => ({
      ...g,
      vs: g.vs.filter((_, i) => i !== v),
      es: g.es.filter((e) => e.u !== v && e.v !== v).map((e) => ({ ...e, u: e.u > v ? e.u - 1 : e.u, v: e.v > v ? e.v - 1 : e.v })),
    }));
    setSource((s) => (s > v ? s - 1 : s === v ? 0 : s));
    setPending(null);
    setSelEdge(null);
  };
  const removeEdge = (e: number) => {
    update((g) => ({ ...g, es: g.es.filter((_, i) => i !== e) }));
    setSelEdge(null);
  };
  const tapVertex = (v: number) => {
    if (mode === 'delete') return removeVertex(v);
    if (mode === 'add') {
      if (pending === null) setPending(v);
      else if (pending === v) setPending(null);
      else {
        addEdge(pending, v);
        setPending(null);
      }
      return;
    }
    if (algo && ALGO_NEEDS_SOURCE[algo]) setSource(v);
  };
  const tapEdge = (e: number) => {
    if (mode === 'delete') return removeEdge(e);
    setSelEdge((s) => (s === e ? null : e));
  };
  const choosePreset = (key: string) => {
    setG(load(key));
    setSource(0);
    setPending(null);
    setSelEdge(null);
  };

  const drag = useRef<{ id: number; v: number; px: number; py: number; dx: number; dy: number; moved: boolean } | null>(null);
  const onVDown = (e: RPointerEvent<SVGGElement>, v: number) => {
    e.stopPropagation();
    (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
    const [px, py] = eventPx(e);
    const [vx, vy] = toPx(G.vs[v].x, G.vs[v].y);
    // Keep the grab offset so the vertex does not jump under the pointer.
    drag.current = { id: e.pointerId, v, px, py, dx: vx - px, dy: vy - py, moved: false };
  };
  const onVMove = (e: RPointerEvent<SVGGElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const [px, py] = eventPx(e);
    if (!d.moved && Math.hypot(px - d.px, py - d.py) < 6) return;
    if (mode === 'delete') return;
    d.moved = true;
    const [x, y] = clampWorld(...fromPx(px + d.dx, py + d.dy));
    setG((g) => ({ ...g, vs: g.vs.map((p, i) => (i === d.v ? { ...p, x, y } : p)) }));
  };
  const onVUp = (e: RPointerEvent<SVGGElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    if (!d.moved) tapVertex(d.v);
  };
  const onVKey = (e: KeyboardEvent<SVGGElement>, v: number) => {
    const s = (Math.max(bw, bh) / 50) * (e.shiftKey ? 5 : 1);
    const dirs: Record<string, [number, number]> = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] };
    if (dirs[e.key]) {
      e.preventDefault();
      const [dx, dy] = dirs[e.key];
      setG((g) => ({ ...g, vs: g.vs.map((p, i) => (i === v ? { ...p, ...Object.fromEntries(clampWorld(p.x + dx, p.y + dy).map((c, j) => [j ? 'y' : 'x', c])) } : p)) }));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tapVertex(v);
    } else if ((e.key === 'Delete' || e.key === 'Backspace') && editable) {
      e.preventDefault();
      removeVertex(v);
    }
  };
  const onBgDown = (e: RPointerEvent<SVGSVGElement>) => {
    if (e.target !== e.currentTarget && !(e.target as Element).hasAttribute('data-bg')) return;
    if (editable && mode === 'add') {
      const [x, y] = clampWorld(...fromPx(...eventPx(e)));
      addVertexAt(x, y);
    }
    setPending(null);
    setSelEdge(null);
  };
  const addVertexFree = () => {
    // Somewhere not on top of an existing vertex.
    const cx = (bx0 + bx1) / 2;
    const cy = (by0 + by1) / 2;
    const r0 = Math.max(bw, bh) / 8;
    for (let t = 0; t < 60; t++) {
      const a = t * 2.4;
      const rr = r0 * Math.sqrt(t);
      const [x, y] = clampWorld(cx + rr * Math.cos(a), cy + rr * Math.sin(a));
      if (G.vs.every((v) => Math.hypot(v.x - x, v.y - y) * k > 2.6 * R)) return addVertexAt(x, y);
    }
    addVertexAt(cx, cy);
  };

  // ---- drawing state
  const vState: (VState | null)[] = step ? step.vs : G.vs.map(() => null);
  let vFill: (string | null)[] = G.vs.map(() => null);
  let vBadge: (string | null)[] = G.vs.map(() => null);
  let eStyle: (EState | 'hl' | 'hl2' | null)[] = G.es.map(() => null);
  let eLabel: (string | null)[] = G.es.map((e) => (G.weighted ? fmt(e.w) : null));
  let reversed = false;
  if (step) {
    vBadge = step.badge;
    eStyle = step.es;
    reversed = !!step.reversed;
    if (step.groups) vFill = step.groups.map((g) => (g >= 0 ? GROUP[g % GROUP.length] : null));
  } else {
    if (want('degrees') && !G.directed) vBadge = deg.deg.map(String);
    if (showing === 'components' && comps) vFill = comps.comp.map((c) => GROUP[c % GROUP.length]);
    if (showing === 'bipartite' && bip) {
      if (bip.ok) vFill = bip.side.map((s) => GROUP[s === 0 ? 0 : 3]);
      else {
        const on = new Set(bip.cycleEdges);
        eStyle = G.es.map((_, i) => (on.has(i) ? 'hl2' : null));
        vFill = G.vs.map((_, i) => (bip.cycle.includes(i) ? GROUP[1] : null));
      }
    }
    if (showing === 'euler' && eul && 'edges' in eul) {
      const pos = new Map(eul.edges.map((e, i) => [e, i + 1]));
      eStyle = G.es.map((_, i) => (pos.has(i) ? 'hl' : null));
      eLabel = G.es.map((_, i) => (pos.has(i) ? `#${pos.get(i)}` : null));
      vBadge = G.vs.map((_, i) => (i === eul.vertices[0] ? 'start' : i === eul.vertices[eul.vertices.length - 1] && eul.kind === 'trail' ? 'end' : null));
    }
    if (showing === 'euler' && eul && eul.kind === 'none') vFill = G.vs.map((_, i) => (eul.odd.includes(i) ? GROUP[1] : null));
    if (showing === 'hamilton' && ham?.cycle) {
      const cyc = ham.cycle;
      const on = new Set<number>();
      for (let i = 0; i + 1 < cyc.length; i++) {
        const e = G.es.findIndex((ed) => (ed.u === cyc[i] && ed.v === cyc[i + 1]) || (!G.directed && ed.u === cyc[i + 1] && ed.v === cyc[i]));
        if (e >= 0) on.add(e);
      }
      eStyle = G.es.map((_, i) => (on.has(i) ? 'hl' : null));
      vBadge = G.vs.map((_, i) => `${cyc.indexOf(i) + 1}`);
    }
    if (showing === 'colouring' && col) {
      vFill = col.colour.map((c) => GROUP[c % GROUP.length]);
      vBadge = col.colour.map((c) => String(c + 1));
    }
  }

  // ---- edge geometry (parallel edges curve apart)
  const pairCount = new Map<string, number>();
  const pairIndex: number[] = [];
  G.es.forEach((e) => {
    const key = `${Math.min(e.u, e.v)},${Math.max(e.u, e.v)}`;
    const c = pairCount.get(key) ?? 0;
    pairIndex.push(c);
    pairCount.set(key, c + 1);
  });

  const crossings = useMemo(() => {
    if (!want('planarity')) return 0;
    let c = 0;
    const seg = G.es.filter((e) => e.u !== e.v);
    const P = G.vs;
    const orient = (a: V, b: V, c2: V) => Math.sign((b.x - a.x) * (c2.y - a.y) - (b.y - a.y) * (c2.x - a.x));
    for (let i = 0; i < seg.length; i++)
      for (let j = i + 1; j < seg.length; j++) {
        const a = seg[i];
        const b = seg[j];
        if (a.u === b.u || a.u === b.v || a.v === b.u || a.v === b.v) continue;
        const [p1, p2, p3, p4] = [P[a.u], P[a.v], P[b.u], P[b.v]];
        if (orient(p1, p2, p3) * orient(p1, p2, p4) < 0 && orient(p3, p4, p1) * orient(p3, p4, p2) < 0) c++;
      }
    return c;
  }, [G.vs, G.es, panels.join()]); // eslint-disable-line react-hooks/exhaustive-deps

  const L = (v: number) => G.vs[v]?.label ?? '?';
  const needsSource = algo ? ALGO_NEEDS_SOURCE[algo] : false;

  return (
    <Frame title={str(params, 'title', 'Graph lab')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {/* ---- toolbar */}
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        {menuKeys.length > 0 && (
          <label className="text-[13px] text-ink-2">
            <span className="mb-1 block">Example</span>
            <select className="input w-auto py-1 text-[13px]" value={menuKeys.includes(G.key) ? G.key : ''} onChange={(e) => choosePreset(e.target.value)}>
              {!menuKeys.includes(G.key) && <option value="">{G.key === 'custom' ? customName : PRESETS[G.key]?.title}</option>}
              {menuKeys.map((key) => (
                <option key={key} value={key}>
                  {key === 'custom' ? customName : PRESETS[key].title}
                </option>
              ))}
            </select>
          </label>
        )}
        {editable && (
          <Segmented
            label="Tap to"
            options={[
              { value: 'move', label: algo && needsSource ? 'Move / pick start' : 'Move' },
              { value: 'add', label: 'Add' },
              { value: 'delete', label: 'Delete' },
            ]}
            value={mode}
            onChange={(m) => {
              setMode(m);
              setPending(null);
            }}
          />
        )}
        {toggles && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 pb-1">
            <Toggle label="Directed" checked={G.directed} onChange={(d) => update((g) => ({ ...g, directed: d }))} />
            <Toggle label="Weighted" checked={G.weighted} onChange={(w) => update((g) => ({ ...g, weighted: w }))} />
          </div>
        )}
        <Button onClick={() => choosePreset(G.key)} title="Restore this example">
          Reset graph
        </Button>
      </div>
      {editable && (
        <div className="text-xs text-ink-3">
          {mode === 'move' && `Drag vertices to rearrange${algo && needsSource ? '; tap one to make it the start vertex' : ''}. Tap an edge to ${G.weighted ? 'edit its weight' : 'select it'}.`}
          {mode === 'add' && (pending === null ? 'Tap empty space to add a vertex; tap two vertices to join them.' : `Now tap the vertex to join to ${L(pending)} (tap ${L(pending)} again to cancel).`)}
          {mode === 'delete' && 'Tap a vertex or an edge to delete it.'}
        </div>
      )}

      {/* ---- the graph */}
      <div ref={wrapRef} className="w-full">
        <svg
          ref={svgRef}
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="block select-none rounded-lg border border-line bg-surface"
          style={{ touchAction: 'none' }}
          onPointerDown={onBgDown}
          role="group"
          aria-label={`Graph with ${n} vertices and ${G.es.length} edges${G.directed ? ', directed' : ''}`}
        >
          <defs>
            <pattern id="gl-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill="var(--plot-grid)" />
            </pattern>
          </defs>
          <rect data-bg x={0} y={0} width={W} height={H} fill={mode === 'add' && editable ? 'url(#gl-dots)' : 'transparent'} />
          {G.es.map((e, i) => {
            const a = G.vs[e.u];
            const b = G.vs[e.v];
            if (!a || !b) return null;
            const [ux, uy] = reversed ? toPx(b.x, b.y) : toPx(a.x, a.y);
            const [vx, vy] = reversed ? toPx(a.x, a.y) : toPx(b.x, b.y);
            const st = eStyle[i];
            const selected = selEdge === i;
            const style = edgeStyle(st, selected);
            let d: string;
            let mid: [number, number];
            let tip: { x: number; y: number; dx: number; dy: number } | null = null;
            if (e.u === e.v) {
              d = `M${ux - 6},${uy - R + 2} C${ux - 26},${uy - R - 30} ${ux + 26},${uy - R - 30} ${ux + 6},${uy - R + 2}`;
              mid = [ux, uy - R - 22];
            } else {
              const key = `${Math.min(e.u, e.v)},${Math.max(e.u, e.v)}`;
              const m = pairCount.get(key)!;
              const sign = (e.u < e.v) !== reversed ? 1 : -1;
              const off = (pairIndex[i] - (m - 1) / 2) * 30 * sign;
              const dx = vx - ux;
              const dy = vy - uy;
              const len = Math.hypot(dx, dy) || 1;
              const nx = -dy / len;
              const ny = dx / len;
              const mx = (ux + vx) / 2 + nx * off;
              const my = (uy + vy) / 2 + ny * off;
              const cx = 2 * mx - (ux + vx) / 2;
              const cy = 2 * my - (uy + vy) / 2;
              const s1 = Math.hypot(cx - ux, cy - uy) || 1;
              const sx = ux + ((cx - ux) / s1) * R;
              const sy = uy + ((cy - uy) / s1) * R;
              const s2 = Math.hypot(vx - cx, vy - cy) || 1;
              const tx = (vx - cx) / s2;
              const ty = (vy - cy) / s2;
              const ex = vx - tx * (R + 1);
              const ey = vy - ty * (R + 1);
              const head = G.directed ? 9 : 0;
              d = `M${sx.toFixed(1)},${sy.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${(ex - tx * head * 0.8).toFixed(1)},${(ey - ty * head * 0.8).toFixed(1)}`;
              mid = [mx, my];
              if (G.directed) tip = { x: ex, y: ey, dx: tx, dy: ty };
            }
            const label = eLabel[i];
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={style.color} strokeWidth={style.width} strokeDasharray={style.dash} opacity={style.opacity} strokeLinecap="round" />
                {tip && <polygon points={`${tip.x},${tip.y} ${tip.x - tip.dx * 10 - tip.dy * 5},${tip.y - tip.dy * 10 + tip.dx * 5} ${tip.x - tip.dx * 10 + tip.dy * 5},${tip.y - tip.dy * 10 - tip.dx * 5}`} fill={style.color} opacity={style.opacity} />}
                <path
                  d={d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={16}
                  style={{ cursor: 'pointer' }}
                  onPointerDown={(ev) => {
                    ev.stopPropagation();
                    tapEdge(i);
                  }}
                />
                {label && (
                  <text x={mid[0]} y={mid[1] + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill={st === 'hl' ? 'var(--plot-1)' : 'var(--color-ink)'} style={{ paintOrder: 'stroke', stroke: 'var(--color-surface)', strokeWidth: 4, strokeLinejoin: 'round', pointerEvents: 'none' }}>
                    {label}
                  </text>
                )}
              </g>
            );
          })}
          {G.vs.map((v, i) => {
            const [x, y] = toPx(v.x, v.y);
            const s = vState[i];
            const fill = vertexFill(s, vFill[i]);
            const isSrc = !!algo && needsSource && i === src;
            const ring = pending === i ? 'var(--color-accent)' : null;
            const badge = vBadge[i];
            return (
              <g
                key={i}
                tabIndex={0}
                role="button"
                aria-label={`Vertex ${v.label}${isSrc ? ' (start)' : ''}. Arrow keys move it; Enter ${mode === 'add' ? 'selects it for an edge' : mode === 'delete' ? 'deletes it' : 'picks it'}.`}
                style={{ cursor: mode === 'delete' ? 'pointer' : 'grab', outline: 'none' }}
                className="[&:focus-visible>circle:nth-child(2)]:stroke-[var(--color-accent)]"
                onPointerDown={(e) => onVDown(e, i)}
                onPointerMove={onVMove}
                onPointerUp={onVUp}
                onPointerCancel={() => (drag.current = null)}
                onKeyDown={(e) => onVKey(e, i)}
              >
                <circle cx={x} cy={y} r={R + 8} fill="transparent" />
                <circle cx={x} cy={y} r={R} fill={fill.bg} stroke={ring ?? fill.stroke} strokeWidth={ring ? 3.5 : isSrc ? 3 : 1.75} />
                {isSrc && <circle cx={x} cy={y} r={R + 4} fill="none" stroke="var(--color-ink-2)" strokeWidth={1.25} strokeDasharray="3 3" />}
                <text x={x} y={y + 4} textAnchor="middle" fontSize={v.label.length > 2 ? (R < 15 ? 8.5 : 10) : R < 15 ? 11.5 : 12.5} fontWeight={600} fill={fill.text} style={{ pointerEvents: 'none' }}>
                  {v.label}
                </text>
                {badge && (
                  <text x={x + R + 3} y={y - R + 2} fontSize={11} fontWeight={600} fill="var(--color-ink)" style={{ paintOrder: 'stroke', stroke: 'var(--color-surface)', strokeWidth: 3.5, strokeLinejoin: 'round', pointerEvents: 'none' }}>
                    {badge}
                  </text>
                )}
              </g>
            );
          })}
          {n === 0 && (
            <text x={W / 2} y={H / 2} textAnchor="middle" fontSize={13} fill="var(--color-ink-3)" style={{ pointerEvents: 'none' }}>
              {editable ? 'Choose "Add", then tap here to place vertices.' : 'No vertices.'}
            </text>
          )}
        </svg>
      </div>
      {flash && <Note tone="warn">{flash}</Note>}

      {/* ---- selected edge */}
      {selEdge !== null && G.es[selEdge] && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]">
          <span className="font-mono">
            Edge {L(G.es[selEdge].u)}
            {G.directed ? '→' : '–'}
            {L(G.es[selEdge].v)}
          </span>
          {G.weighted && (
            <label className="inline-flex items-center gap-2 text-ink-2">
              weight
              <input
                type="number"
                className="input w-24 py-1 font-mono text-[13px]"
                value={G.es[selEdge].w}
                step="any"
                onChange={(e) => {
                  const w = parseFloat(e.target.value);
                  if (Number.isFinite(w)) update((g) => ({ ...g, es: g.es.map((ed, i) => (i === selEdge ? { ...ed, w } : ed)) }));
                }}
              />
            </label>
          )}
          {editable && <Button onClick={() => removeEdge(selEdge)}>Delete edge</Button>}
          <Button onClick={() => setSelEdge(null)}>Done</Button>
        </div>
      )}

      {editable && <KeyboardEditor G={G} addVertex={addVertexFree} addEdge={addEdge} removeVertex={removeVertex} removeEdge={removeEdge} />}

      {/* ---- algorithm stepper */}
      {algos.length > 0 && (
        <div className="space-y-2 rounded-lg border border-line p-3">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
            {algos.length > 1 && <Segmented label="Algorithm" options={algos.map((a) => ({ value: a, label: ALGO_LABEL[a] }))} value={algo ?? algos[0]} onChange={(a) => setAlgo(a)} />}
            {needsSource && n > 0 && (
              <label className="text-[13px] text-ink-2">
                <span className="mb-1 block">Start</span>
                <select className="input w-auto py-1 font-mono text-[13px]" value={src} onChange={(e) => setSource(+e.target.value)}>
                  {G.vs.map((v, i) => (
                    <option key={i} value={i}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
          {run.problem ? (
            <Note tone="warn">{run.problem}</Note>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={() => setIdx((i) => Math.max(-1, i - 1))} disabled={idx < 0}>
                  Back
                </Button>
                <Button primary onClick={() => setIdx((i) => Math.min(run.steps.length - 1, i + 1))} disabled={idx >= run.steps.length - 1}>
                  Step
                </Button>
                <Button onClick={() => (idx >= run.steps.length - 1 ? (setIdx(-1), setPlaying(true)) : setPlaying((p) => !p))}>{playing ? 'Pause' : 'Play'}</Button>
                <Button
                  onClick={() => {
                    setIdx(-1);
                    setPlaying(false);
                  }}
                >
                  Reset
                </Button>
                <span className="font-mono text-xs text-ink-3">
                  step {idx + 1} / {run.steps.length}
                </span>
                <div className="ml-auto w-40">
                  <Slider label="Speed (steps/s)" value={speed} min={0.5} max={5} step={0.5} onChange={setSpeed} />
                </div>
              </div>
              <Note tone={step && idx === run.steps.length - 1 ? 'good' : 'info'}>{step ? step.msg : `Press Step to run ${algo ? ALGO_LABEL[algo] : ''}${needsSource ? ` from ${L(src)}` : ''}.`}</Note>
              {step && (
                <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
                  <div className="min-w-0 space-y-1">
                    {step.ds.map(([k2, v2]) => (
                      <div key={k2} className="text-[13px]">
                        <span className="text-ink-3">{k2}: </span>
                        <span className="break-words font-mono">{v2}</span>
                      </div>
                    ))}
                    <Legend algo={algo!} />
                  </div>
                  <StepTable t={step.table} />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ---- readouts */}
      {panels.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2">
          {want('degrees') && (
            <Card title="Degrees">
              {G.directed ? (
                <>
                  <div className="font-mono">{G.vs.map((v, i) => `${v.label}: in ${deg.indeg[i]}, out ${deg.outdeg[i]}`).join(' · ') || '–'}</div>
                  <div>
                    Σ in-degrees = Σ out-degrees = {deg.indeg.reduce((a, b) => a + b, 0)} = |E|
                  </div>
                </>
              ) : (
                <>
                  <div className="font-mono">{G.vs.map((v, i) => `${v.label}:${deg.deg[i]}`).join(' ') || '–'}</div>
                  <div>
                    Σ deg(v) = {deg.deg.join(' + ') || '0'} = {deg.deg.reduce((a, b) => a + b, 0)} = 2 × {G.es.length} = 2|E|
                  </div>
                  <div className="text-ink-3">
                    Odd-degree vertices: {deg.deg.filter((d) => d % 2).length} (always an even number)
                  </div>
                </>
              )}
            </Card>
          )}
          {want('adjacency') && <AdjacencyCard g={graph} />}
          {want('components') && comps && (
            <Card title={G.directed ? 'Components (ignoring direction)' : 'Connected components'} show={showing === 'components'} onShow={() => setShowing((s) => (s === 'components' ? 'none' : 'components'))}>
              <div>
                {comps.groups.length} component{comps.groups.length === 1 ? '' : 's'}
                {comps.groups.length === 1 ? ': connected.' : ':'}
              </div>
              {comps.groups.length > 1 && <div className="font-mono">{comps.groups.map((g) => `{${g.map(L).join(', ')}}`).join('  ')}</div>}
            </Card>
          )}
          {want('bipartite') && bip && (
            <Card title="Bipartite?" show={showing === 'bipartite'} onShow={() => setShowing((s) => (s === 'bipartite' ? 'none' : 'bipartite'))}>
              {bip.ok ? (
                <div>
                  Yes. Parts{' '}
                  <span className="font-mono">
                    {'{'}
                    {G.vs.filter((_, i) => bip.side[i] === 0).map((v) => v.label).join(', ')}
                    {'}'}
                  </span>{' '}
                  and{' '}
                  <span className="font-mono">
                    {'{'}
                    {G.vs.filter((_, i) => bip.side[i] === 1).map((v) => v.label).join(', ')}
                    {'}'}
                  </span>
                  : a proper 2-colouring by BFS parity.
                </div>
              ) : (
                <div>
                  No: odd cycle <span className="font-mono">{bip.cycle.map(L).join('–')}</span> (length {bip.cycle.length - 1}). Colours would have to alternate around it, which an odd cycle cannot do.
                </div>
              )}
            </Card>
          )}
          {want('euler') && eul && (
            <Card title="Euler trail / circuit" show={showing === 'euler'} onShow={eul.kind === 'circuit' || eul.kind === 'trail' || eul.kind === 'none' ? () => setShowing((s) => (s === 'euler' ? 'none' : 'euler')) : undefined}>
              <div>{eul.reason}</div>
              {'edges' in eul && (
                <div>
                  Hierholzer finds: <span className="break-words font-mono">{eul.vertices.map(L).join(G.directed ? '→' : ' ')}</span> ({eul.edges.length} edges)
                </div>
              )}
            </Card>
          )}
          {want('hamilton') && ham && (
            <Card title="Hamilton cycle" show={showing === 'hamilton'} onShow={ham.cycle ? () => setShowing((s) => (s === 'hamilton' ? 'none' : 'hamilton')) : undefined}>
              {ham.skipped ? (
                <div>More than 14 vertices: the backtracking search is skipped (it is exponential).</div>
              ) : n < 3 ? (
                <div>A Hamilton cycle needs at least 3 vertices.</div>
              ) : ham.cycle ? (
                <div>
                  Found by backtracking: <span className="font-mono">{ham.cycle.map(L).join(' ')}</span> ({ham.tried} partial paths tried).
                </div>
              ) : (
                <div>None exists: the exhaustive backtracking search tried {ham.tried} partial paths.</div>
              )}
              {!G.directed && n >= 3 && (
                <div className="text-ink-3">
                  Dirac: min degree δ = {ham.minDeg} {ham.dirac ? '≥' : '<'} n/2 = {fmt(n / 2)}, so the theorem {ham.dirac ? 'guarantees a Hamilton cycle' : 'does not apply (it is only sufficient)'}.
                </div>
              )}
            </Card>
          )}
          {want('colouring') && col && (
            <Card title="Greedy colouring" show={showing === 'colouring'} onShow={() => setShowing((s) => (s === 'colouring' ? 'none' : 'colouring'))}>
              <label className="flex flex-wrap items-center gap-2">
                Order
                <select className="input w-auto py-0.5 text-[13px]" value={order} onChange={(e) => setOrder(e.target.value as ColourOrder)}>
                  <option value="index">vertex order</option>
                  <option value="degree">largest degree first</option>
                  <option value="smallest-last">smallest last</option>
                </select>
              </label>
              <div>
                Uses {col.count} colour{col.count === 1 ? '' : 's'} (greedy never needs more than Δ + 1 = {col.maxDeg + 1}).
              </div>
              <div className="break-words font-mono">{col.order.map((v) => `${L(v)}→${col.colour[v] + 1}`).join(' ')}</div>
            </Card>
          )}
          {want('tree') && tree && (
            <Card title="Tree?">
              <div>
                n = {tree.n}, |E| = {tree.m}, {tree.connected ? 'connected' : `${tree.components} components`}, {tree.acyclic ? 'acyclic' : 'has a cycle'}.
              </div>
              <div>
                {tree.isTree
                  ? `A tree: connected, acyclic and |E| = n − 1 = ${tree.n - 1}.`
                  : tree.acyclic
                    ? `A forest of ${tree.components} trees (|E| = n − ${tree.components}), not a tree.`
                    : tree.connected
                      ? `Not a tree: connected but |E| = ${tree.m} > n − 1 = ${tree.n - 1}, so there is a cycle.`
                      : 'Not a tree.'}
              </div>
              {tree.prufer && (
                <div>
                  Prüfer code: <span className="font-mono">({tree.prufer.join(', ')})</span>, one of {tree.n}
                  <sup>{tree.n - 2}</sup> = {fmt(Math.pow(tree.n, tree.n - 2))} labelled trees (Cayley).
                </div>
              )}
            </Card>
          )}
          {want('planarity') && (
            <Card title="Planarity bounds">
              <PlanarityText g={graph} crossings={crossings} />
            </Card>
          )}
        </div>
      )}
    </Frame>
  );
}

function edgeStyle(st: EState | 'hl' | 'hl2' | null, selected: boolean): { color: string; width: number; dash?: string; opacity?: number } {
  if (selected) return { color: 'var(--color-accent)', width: 4 };
  switch (st) {
    case 'tree':
      return { color: 'var(--plot-1)', width: 4 };
    case 'candidate':
      return { color: 'var(--plot-4)', width: 3, dash: '7 4' };
    case 'active':
      return { color: 'var(--plot-2)', width: 4 };
    case 'rejected':
      return { color: 'var(--plot-axis)', width: 1.5, dash: '3 4', opacity: 0.55 };
    case 'back':
      return { color: 'var(--plot-6)', width: 3, dash: '8 4' };
    case 'forward':
      return { color: 'var(--plot-5)', width: 3, dash: '8 4' };
    case 'cross':
      return { color: 'var(--plot-3)', width: 3, dash: '8 4' };
    case 'hl':
      return { color: 'var(--plot-1)', width: 3.5 };
    case 'hl2':
      return { color: 'var(--plot-2)', width: 4 };
    default:
      return { color: 'var(--plot-axis)', width: 2 };
  }
}

function vertexFill(s: VState | null, group: string | null): { bg: string; stroke: string; text: string } {
  if (s === 'current') return { bg: 'var(--plot-2)', stroke: 'var(--plot-2)', text: 'var(--color-surface)' };
  if (group) return { bg: `color-mix(in srgb, ${group} 30%, var(--color-surface))`, stroke: group, text: 'var(--color-ink)' };
  if (s === 'frontier') return { bg: 'color-mix(in srgb, var(--plot-4) 35%, var(--color-surface))', stroke: 'var(--plot-4)', text: 'var(--color-ink)' };
  if (s === 'done') return { bg: 'var(--plot-1)', stroke: 'var(--plot-1)', text: 'var(--color-surface)' };
  return { bg: 'var(--color-surface-2)', stroke: 'var(--plot-axis)', text: 'var(--color-ink)' };
}

function Card({ title, children, show, onShow }: { title: string; children: ReactNode; show?: boolean; onShow?: () => void }) {
  return (
    <div className="min-w-0 space-y-1 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px] leading-5 text-ink">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] uppercase tracking-wide text-ink-3">{title}</span>
        {onShow && (
          <button type="button" aria-pressed={!!show} onClick={onShow} className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${show ? 'border-accent bg-accent/15 text-ink' : 'border-line text-ink-2 hover:text-ink'}`}>
            {show ? 'Shown on graph' : 'Show on graph'}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AdjacencyCard({ g }: { g: Graph }) {
  const adj = adjacency(g);
  const n = g.labels.length;
  const M = Array.from({ length: n }, () => Array(n).fill(0));
  for (const e of g.edges) {
    M[e.u][e.v]++;
    if (!g.directed && e.u !== e.v) M[e.v][e.u]++;
  }
  return (
    <div className="min-w-0 space-y-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px] sm:col-span-2">
      <div className="text-[11px] uppercase tracking-wide text-ink-3">Adjacency list and matrix</div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="font-mono text-[12.5px] leading-5">
          {g.labels.map((l, i) => (
            <div key={i}>
              {l}: {adj[i].map((a) => g.labels[a.to]).join(', ') || '–'}
            </div>
          ))}
        </div>
        {n <= 12 && n > 0 && (
          <div className="overflow-x-auto">
            <table className="my-0 w-auto border-collapse font-mono text-[12px] tabular-nums">
              <thead>
                <tr>
                  <th />
                  {g.labels.map((l) => (
                    <th key={l} className="px-1.5 text-ink-3">
                      {l}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {M.map((row, i) => (
                  <tr key={i}>
                    <th className="pr-1.5 text-right text-ink-3">{g.labels[i]}</th>
                    {row.map((c, j) => (
                      <td key={j} className="px-1.5 text-center" style={{ color: c ? 'var(--color-ink)' : 'var(--color-ink-3)' }}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="text-xs text-ink-3">
        List: O(V + E) = {n + g.edges.length} entries{g.directed ? '' : ' (each undirected edge listed twice)'}. Matrix: V² = {n * n} cells.
      </div>
    </div>
  );
}

function PlanarityText({ g, crossings }: { g: Graph; crossings: number }) {
  const V = g.labels.length;
  const E = new Set(g.edges.filter((e) => e.u !== e.v).map((e) => `${Math.min(e.u, e.v)},${Math.max(e.u, e.v)}`)).size;
  if (V < 3) return <div>Every graph with fewer than 3 vertices is planar.</div>;
  const tri = hasTriangle(g);
  const b3 = 3 * V - 6;
  const b2 = 2 * V - 4;
  return (
    <>
      <div>
        V = {V}, E = {E}. Bound E ≤ 3V − 6 = {b3}: {E > b3 ? <b>violated, so not planar.</b> : 'holds.'}
      </div>
      {!tri && (
        <div>
          No triangles, so faces have ≥ 4 edges and E ≤ 2V − 4 = {b2}: {E > b2 ? <b>violated, so not planar.</b> : 'holds.'}
        </div>
      )}
      {E <= b3 && (tri || E <= b2) && <div className="text-ink-3">The bounds are necessary, not sufficient: passing them proves nothing.</div>}
      <div className="text-ink-3">
        Crossings in this drawing: {crossings}
        {crossings > 0 ? ' (drag vertices to try to remove them).' : '.'}
      </div>
    </>
  );
}

function StepTable({ t }: { t: Step['table'] }) {
  return (
    <div className="max-h-72 overflow-auto rounded-md border border-line">
      <table className="my-0 w-full border-collapse font-mono text-[12px] tabular-nums">
        <thead className="sticky top-0 bg-surface-2">
          <tr>
            {t.head.map((h) => (
              <th key={h} className="whitespace-nowrap border-b border-line px-2 py-1 text-left font-sans text-[11px] font-medium text-ink-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, i) => (
            <tr key={i} className={i === t.hi ? 'bg-accent/15' : ''}>
              {r.map((c, j) => (
                <td key={j} className="whitespace-nowrap px-2 py-0.5">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Legend({ algo }: { algo: AlgoKey }) {
  const v: [string, string][] = [
    ['var(--plot-2)', 'current'],
    ['var(--plot-4)', algo === 'dijkstra' || algo === 'prim' ? 'reached, not final' : algo === 'topo' ? 'ready' : 'discovered'],
    ['var(--plot-1)', algo === 'dijkstra' ? 'settled' : algo === 'topo' ? 'output' : 'finished'],
  ];
  const e: [string, string, string?][] = [['var(--plot-1)', algo === 'kruskal' || algo === 'prim' ? 'tree edge' : algo === 'topo' ? 'removed' : 'tree edge']];
  if (algo === 'dijkstra' || algo === 'prim') e.push(['var(--plot-4)', 'best so far', '6 3']);
  if (algo === 'dfs') e.push(['var(--plot-6)', 'back', '6 3'], ['var(--plot-5)', 'forward', '6 3'], ['var(--plot-3)', 'cross', '6 3']);
  if (algo === 'bellman-ford') e.push(['var(--plot-6)', 'still relaxes', '6 3']);
  e.push(['var(--plot-2)', 'being examined']);
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px] text-ink-2">
      {algo !== 'kruskal' &&
        algo !== 'scc' &&
        v.map(([c, l]) => (
          <span key={l} className="inline-flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            {l}
          </span>
        ))}
      {(algo === 'kruskal' || algo === 'scc') && <span>fill colour = {algo === 'kruskal' ? 'union-find set' : 'component'}</span>}
      {e.map(([c, l, dash]) => (
        <span key={l} className="inline-flex items-center gap-1">
          <svg width="18" height="6" aria-hidden>
            <line x1="1" y1="3" x2="17" y2="3" stroke={c} strokeWidth="2.5" strokeDasharray={dash} />
          </svg>
          {l}
        </span>
      ))}
    </div>
  );
}

function KeyboardEditor({ G, addVertex, addEdge, removeVertex, removeEdge }: { G: GState; addVertex: () => void; addEdge: (u: number, v: number, w?: number) => void; removeVertex: (v: number) => void; removeEdge: (e: number) => void }) {
  const [u, setU] = useState(0);
  const [v, setV] = useState(1);
  const [w, setW] = useState('1');
  const [rv, setRv] = useState(0);
  const [re, setRe] = useState(0);
  const n = G.vs.length;
  const sel = (val: number, set: (x: number) => void, label: string) => (
    <select aria-label={label} className="input w-auto py-1 font-mono text-[13px]" value={Math.min(val, n - 1)} onChange={(e) => set(+e.target.value)}>
      {G.vs.map((p, i) => (
        <option key={i} value={i}>
          {p.label}
        </option>
      ))}
    </select>
  );
  return (
    <details className="rounded-lg border border-line px-3 py-2 text-[13px] text-ink-2">
      <summary className="cursor-pointer select-none">Edit with the keyboard</summary>
      <div className="mt-2 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={addVertex}>Add vertex</Button>
          <span className="text-xs text-ink-3">Focus a vertex (Tab) and use the arrow keys to move it.</span>
        </div>
        {n >= 2 && (
          <div className="flex flex-wrap items-center gap-2">
            Edge {sel(u, setU, 'Edge from')} {G.directed ? '→' : '–'} {sel(v, setV, 'Edge to')}
            {G.weighted && (
              <input aria-label="Weight" type="number" step="any" className="input w-20 py-1 font-mono text-[13px]" value={w} onChange={(e) => setW(e.target.value)} />
            )}
            <Button onClick={() => addEdge(Math.min(u, n - 1), Math.min(v, n - 1), Number.isFinite(parseFloat(w)) ? parseFloat(w) : 1)}>Add edge</Button>
          </div>
        )}
        {n >= 1 && (
          <div className="flex flex-wrap items-center gap-2">
            Vertex {sel(rv, setRv, 'Vertex to remove')}
            <Button onClick={() => removeVertex(Math.min(rv, n - 1))}>Remove vertex</Button>
          </div>
        )}
        {G.es.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <select aria-label="Edge to remove" className="input w-auto py-1 font-mono text-[13px]" value={Math.min(re, G.es.length - 1)} onChange={(e) => setRe(+e.target.value)}>
              {G.es.map((e, i) => (
                <option key={i} value={i}>
                  {G.vs[e.u]?.label}
                  {G.directed ? '→' : '–'}
                  {G.vs[e.v]?.label}
                  {G.weighted ? ` (${fmt(e.w)})` : ''}
                </option>
              ))}
            </select>
            <Button onClick={() => removeEdge(Math.min(re, G.es.length - 1))}>Remove edge</Button>
          </div>
        )}
      </div>
    </details>
  );
}
