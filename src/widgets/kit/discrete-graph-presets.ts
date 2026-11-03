/**
 * Example graphs for graph-lab. Coordinates are in arbitrary units with y pointing down (as on
 * screen); the widget scales them to fit. The CLRS examples reproduce the figures most courses
 * use, so their answers can be checked against the book: Dijkstra (fig. 24.6) gives
 * s 0, t 8, x 9, y 5, z 7; Bellman-Ford (fig. 24.4) gives s 0, t 2, x 4, y 7, z −2; the MST
 * (fig. 23.1) weighs 37; the SCC graph (fig. 22.9) has components {a,b,e} {c,d} {f,g} {h}.
 */

export interface PresetGraph {
  title: string;
  labels: string[];
  pos: [number, number][];
  /** [u, v] or [u, v, w] by vertex index. */
  edges: number[][];
  directed?: boolean;
  weighted?: boolean;
  multi?: boolean;
}

const ring = (k: number, r: number, cx = 0, cy = 0, phase = -90): [number, number][] =>
  Array.from({ length: k }, (_, i) => {
    const a = ((phase + (360 * i) / k) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
const letters = (k: number) => Array.from({ length: k }, (_, i) => String.fromCharCode(65 + i));
const allPairs = (k: number) => {
  const out: number[][] = [];
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++) out.push([i, j]);
  return out;
};

export const PRESETS: Record<string, PresetGraph> = {
  k4: { title: 'K₄', labels: letters(4), pos: [[0, 0], [4, 0], [4, 4], [0, 4]], edges: allPairs(4) },
  k5: { title: 'K₅', labels: letters(5), pos: ring(5, 3), edges: allPairs(5) },
  k33: {
    title: 'K₃,₃',
    labels: ['A', 'B', 'C', 'X', 'Y', 'Z'],
    pos: [[0, 0], [3, 0], [6, 0], [0, 4], [3, 4], [6, 4]],
    edges: [0, 1, 2].flatMap((a) => [3, 4, 5].map((b) => [a, b])),
  },
  petersen: {
    title: 'Petersen graph',
    labels: Array.from({ length: 10 }, (_, i) => String(i)),
    pos: [...ring(5, 4), ...ring(5, 1.8)],
    edges: [...[0, 1, 2, 3, 4].map((i) => [i, (i + 1) % 5]), ...[0, 1, 2, 3, 4].map((i) => [i, i + 5]), ...[0, 1, 2, 3, 4].map((i) => [5 + i, 5 + ((i + 2) % 5)])],
  },
  cube: {
    title: 'Cube Q₃',
    labels: Array.from({ length: 8 }, (_, i) => i.toString(2).padStart(3, '0')),
    pos: Array.from({ length: 8 }, (_, i) => [4 * (i & 1) + 1.8 * ((i >> 2) & 1), 4 * ((i >> 1) & 1) - 1.8 * ((i >> 2) & 1)] as [number, number]),
    edges: allPairs(8).filter(([a, b]) => [1, 2, 4].includes(a ^ b)),
  },
  cycle5: { title: 'C₅ (odd cycle)', labels: letters(5), pos: ring(5, 3), edges: [0, 1, 2, 3, 4].map((i) => [i, (i + 1) % 5]) },
  cycle6: { title: 'C₆ (even cycle)', labels: letters(6), pos: ring(6, 3), edges: [0, 1, 2, 3, 4, 5].map((i) => [i, (i + 1) % 6]) },
  grid: {
    title: '3 × 4 grid',
    labels: letters(12),
    pos: Array.from({ length: 12 }, (_, i) => [2 * (i % 4), 2 * Math.floor(i / 4)] as [number, number]),
    edges: Array.from({ length: 12 }, (_, i) => [...(i % 4 < 3 ? [[i, i + 1]] : []), ...(i < 8 ? [[i, i + 4]] : [])]).flat(),
  },
  tree: {
    title: 'A tree',
    labels: letters(7),
    pos: [[3, 0], [1.5, 1.6], [4.5, 1.6], [0.5, 3.2], [2.5, 3.2], [3.5, 3.2], [5.5, 3.2]],
    edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]],
  },
  konigsberg: {
    title: 'Königsberg bridges',
    labels: ['N', 'S', 'K', 'L'],
    pos: [[3, 0], [3, 6], [2, 3], [5.5, 3]],
    edges: [[0, 2], [0, 2], [1, 2], [1, 2], [0, 3], [1, 3], [2, 3]],
    multi: true,
  },
  house: {
    title: 'House (envelope)',
    labels: letters(5),
    pos: [[0, 5], [4, 5], [4, 2], [0, 2], [2, 0]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2], [1, 3], [2, 4], [3, 4]],
  },
  'two-k4': {
    title: 'Two K₄ sharing a vertex',
    labels: letters(7),
    pos: [[0, 0], [0, 3], [1.8, 1.5], [3.5, 1.5], [5.2, 0], [5.2, 3], [7, 1.5]],
    edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3], [3, 4], [3, 5], [3, 6], [4, 5], [4, 6], [5, 6]],
  },
  dag: {
    title: 'A DAG (tasks and prerequisites)',
    labels: letters(7),
    pos: [[0, 0], [0, 3], [2.5, 0], [2.5, 3], [5, 0.8], [5, 3.6], [7.5, 1.8]],
    edges: [[0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6]],
    directed: true,
  },
  scc: {
    title: 'Digraph with 4 strong components',
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    pos: [[0, 0], [2.5, 0], [5, 0], [7.5, 0], [0, 2.8], [2.5, 2.8], [5, 2.8], [7.5, 2.8]],
    edges: [[0, 1], [1, 2], [1, 4], [1, 5], [2, 3], [2, 6], [3, 2], [3, 7], [4, 0], [4, 5], [5, 6], [6, 5], [6, 7]],
    directed: true,
  },
  dijkstra: {
    title: 'Weighted digraph (Dijkstra)',
    labels: ['s', 't', 'x', 'y', 'z'],
    pos: [[0, 2], [2.5, 0], [5.5, 0], [2.5, 4], [5.5, 4]],
    edges: [[0, 1, 10], [0, 3, 5], [1, 2, 1], [1, 3, 2], [3, 1, 3], [3, 2, 9], [3, 4, 2], [2, 4, 4], [4, 2, 6], [4, 0, 7]],
    directed: true,
    weighted: true,
  },
  negative: {
    title: 'Negative weights (Bellman-Ford)',
    labels: ['s', 't', 'x', 'y', 'z'],
    pos: [[0, 2], [2.5, 0], [5.5, 0], [2.5, 4], [5.5, 4]],
    edges: [[0, 1, 6], [0, 3, 7], [1, 2, 5], [1, 3, 8], [1, 4, -4], [2, 1, -2], [3, 2, -3], [3, 4, 9], [4, 0, 2], [4, 2, 7]],
    directed: true,
    weighted: true,
  },
  mst: {
    title: 'Weighted graph (MST)',
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'],
    pos: [[0, 2], [1.6, 0], [3.8, 0], [6, 0], [7.6, 2], [6, 4], [3.8, 4], [1.6, 4], [2.8, 2]],
    edges: [[0, 1, 4], [0, 7, 8], [1, 2, 8], [1, 7, 11], [2, 3, 7], [2, 5, 4], [2, 8, 2], [3, 4, 9], [3, 5, 14], [4, 5, 10], [5, 6, 2], [6, 7, 1], [6, 8, 6], [7, 8, 7]],
    weighted: true,
  },
  empty: { title: 'Empty (draw your own)', labels: [], pos: [], edges: [] },
};

export const PRESET_KEYS = Object.keys(PRESETS);
