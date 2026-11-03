/**
 * Graph analyses and step-by-step algorithm traces for the graph-lab widget. Pure functions with
 * no React, so they can be checked with `npx tsx`.
 *
 * A graph has vertices 0..n-1 with labels, and an edge list (parallel edges allowed). Neighbours
 * are always visited in vertex order (index order), so traces are deterministic and match the
 * usual "alphabetical" convention of textbooks.
 */

export interface Edge {
  u: number;
  v: number;
  w: number;
}
export interface Graph {
  labels: string[];
  edges: Edge[];
  directed: boolean;
}
export interface Arc {
  to: number;
  w: number;
  e: number;
}

/** Out-neighbours (all neighbours if undirected), sorted by neighbour index then edge index. */
export function adjacency(g: Graph, reverse = false): Arc[][] {
  const adj: Arc[][] = g.labels.map(() => []);
  g.edges.forEach((ed, e) => {
    const [a, b] = reverse ? [ed.v, ed.u] : [ed.u, ed.v];
    adj[a].push({ to: b, w: ed.w, e });
    if (!g.directed && a !== b) adj[b].push({ to: a, w: ed.w, e });
  });
  for (const l of adj) l.sort((x, y) => x.to - y.to || x.e - y.e);
  return adj;
}

/* ---------------------------------------------------------------- analyses */

export function degrees(g: Graph) {
  const n = g.labels.length;
  const deg = Array(n).fill(0);
  const indeg = Array(n).fill(0);
  const outdeg = Array(n).fill(0);
  for (const { u, v } of g.edges) {
    deg[u]++;
    deg[v]++;
    outdeg[u]++;
    indeg[v]++;
  }
  return { deg, indeg, outdeg };
}

/** Connected components (weak components for a digraph): comp[v] and the member lists. */
export function components(g: Graph): { comp: number[]; groups: number[][] } {
  const n = g.labels.length;
  const adj = adjacency({ ...g, directed: false });
  const comp = Array(n).fill(-1);
  const groups: number[][] = [];
  for (let s = 0; s < n; s++) {
    if (comp[s] >= 0) continue;
    const id = groups.length;
    const members: number[] = [];
    const stack = [s];
    comp[s] = id;
    while (stack.length) {
      const u = stack.pop()!;
      members.push(u);
      for (const { to } of adj[u])
        if (comp[to] < 0) {
          comp[to] = id;
          stack.push(to);
        }
    }
    groups.push(members.sort((a, b) => a - b));
  }
  return { comp, groups };
}

export type Bipartite = { ok: true; side: number[] } | { ok: false; cycle: number[]; cycleEdges: number[] };

/** BFS parity colouring; on failure returns an odd cycle as a witness (direction ignored). */
export function bipartite(g: Graph): Bipartite {
  const n = g.labels.length;
  const adj = adjacency({ ...g, directed: false });
  const side = Array(n).fill(-1);
  const parent = Array(n).fill(-1);
  const pedge = Array(n).fill(-1);
  const depth = Array(n).fill(0);
  for (let s = 0; s < n; s++) {
    if (side[s] >= 0) continue;
    side[s] = 0;
    const q = [s];
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      for (const { to, e } of adj[u]) {
        if (to === u) return { ok: false, cycle: [u, u], cycleEdges: [e] }; // a loop is an odd cycle
        if (side[to] < 0) {
          side[to] = 1 - side[u];
          parent[to] = u;
          pedge[to] = e;
          depth[to] = depth[u] + 1;
          q.push(to);
        } else if (side[to] === side[u]) {
          // Walk both ends up to their lowest common ancestor.
          let a = u;
          let b = to;
          const left: number[] = [a];
          const right: number[] = [b];
          const le: number[] = [];
          const re: number[] = [];
          while (depth[a] > depth[b]) {
            le.push(pedge[a]);
            a = parent[a];
            left.push(a);
          }
          while (depth[b] > depth[a]) {
            re.push(pedge[b]);
            b = parent[b];
            right.push(b);
          }
          while (a !== b) {
            le.push(pedge[a]);
            a = parent[a];
            left.push(a);
            re.push(pedge[b]);
            b = parent[b];
            right.push(b);
          }
          right.pop();
          const cycle = [...left, ...right.reverse(), u];
          return { ok: false, cycle, cycleEdges: [...le, ...re, e] };
        }
      }
    }
  }
  return { ok: true, side };
}

export type Euler =
  | { kind: 'empty'; reason: string }
  | { kind: 'none'; reason: string; odd: number[] }
  | { kind: 'circuit' | 'trail'; reason: string; odd: number[]; vertices: number[]; edges: number[] };

/** Euler trail / circuit existence with reasons, and one found by Hierholzer's algorithm. */
export function euler(g: Graph): Euler {
  const n = g.labels.length;
  const m = g.edges.length;
  if (m === 0) return { kind: 'empty', reason: 'There are no edges.' };
  const { deg, indeg, outdeg } = degrees(g);
  const { comp } = components(g);
  const touched = [...Array(n).keys()].filter((v) => deg[v] > 0);
  if (new Set(touched.map((v) => comp[v])).size > 1) return { kind: 'none', reason: 'The edges do not all lie in one connected component, so no single trail can use them all.', odd: [] };
  let start = touched[0];
  let kind: 'circuit' | 'trail';
  let odd: number[];
  let reason: string;
  const L = (v: number) => g.labels[v];
  if (!g.directed) {
    odd = touched.filter((v) => deg[v] % 2 === 1);
    if (odd.length === 0) {
      kind = 'circuit';
      reason = 'Connected and every degree is even, so an Euler circuit exists.';
    } else if (odd.length === 2) {
      kind = 'trail';
      start = odd[0];
      reason = `Exactly two vertices (${L(odd[0])}, ${L(odd[1])}) have odd degree, so an Euler trail exists, from one to the other, but no circuit.`;
    } else {
      return { kind: 'none', reason: `${odd.length} vertices have odd degree (${odd.map(L).join(', ')}); an Euler trail allows at most two.`, odd };
    }
  } else {
    const plus = touched.filter((v) => outdeg[v] - indeg[v] === 1);
    const minus = touched.filter((v) => indeg[v] - outdeg[v] === 1);
    const off = touched.filter((v) => Math.abs(outdeg[v] - indeg[v]) > 1);
    odd = touched.filter((v) => outdeg[v] !== indeg[v]);
    if (odd.length === 0) {
      kind = 'circuit';
      reason = 'Every vertex has in-degree equal to out-degree (and the edges are connected), so a directed Euler circuit exists.';
    } else if (plus.length === 1 && minus.length === 1 && off.length === 0 && odd.length === 2) {
      kind = 'trail';
      start = plus[0];
      reason = `${L(plus[0])} has one more out-edge than in-edges and ${L(minus[0])} one more in-edge: a directed Euler trail from ${L(plus[0])} to ${L(minus[0])}.`;
    } else {
      return { kind: 'none', reason: `In-degree and out-degree differ at ${odd.map(L).join(', ')} in a way no Euler trail allows.`, odd };
    }
  }
  // Hierholzer: walk until stuck, backtrack splicing sub-circuits in.
  const adj = adjacency(g);
  const used = Array(m).fill(false);
  const ptr = Array(n).fill(0);
  const stack: [number, number][] = [[start, -1]];
  const vs: number[] = [];
  const es: number[] = [];
  while (stack.length) {
    const [u] = stack[stack.length - 1];
    while (ptr[u] < adj[u].length && used[adj[u][ptr[u]].e]) ptr[u]++;
    if (ptr[u] < adj[u].length) {
      const a = adj[u][ptr[u]];
      used[a.e] = true;
      stack.push([a.to, a.e]);
    } else {
      const [v, e] = stack.pop()!;
      vs.push(v);
      if (e >= 0) es.push(e);
    }
  }
  vs.reverse();
  es.reverse();
  // A directed connectivity failure (weakly connected, wrong orientation) shows up as unused edges.
  if (es.length !== m) return { kind: 'none', reason: 'The degree condition holds but the edges cannot all be reached along their directions.', odd };
  return { kind, reason, odd, vertices: vs, edges: es };
}

export type ColourOrder = 'index' | 'degree' | 'smallest-last';

/** Greedy colouring in the given vertex order: each vertex takes the smallest colour unused by its neighbours. */
export function greedyColouring(g: Graph, orderKind: ColourOrder): { order: number[]; colour: number[]; count: number; maxDeg: number } {
  const n = g.labels.length;
  const adj = adjacency({ ...g, directed: false });
  const deg = adj.map((l) => new Set(l.map((a) => a.to)).size);
  let order = [...Array(n).keys()];
  if (orderKind === 'degree') order.sort((a, b) => deg[b] - deg[a] || a - b);
  if (orderKind === 'smallest-last') {
    // Repeatedly remove a vertex of minimum remaining degree; colour in reverse removal order.
    const alive = Array(n).fill(true);
    const d = [...deg];
    const removed: number[] = [];
    for (let k = 0; k < n; k++) {
      let best = -1;
      for (let v = 0; v < n; v++) if (alive[v] && (best < 0 || d[v] < d[best])) best = v;
      alive[best] = false;
      removed.push(best);
      for (const to of new Set(adj[best].map((a) => a.to))) if (alive[to]) d[to]--;
    }
    order = removed.reverse();
  }
  const colour = Array(n).fill(-1);
  for (const v of order) {
    const taken = new Set(adj[v].map((a) => colour[a.to]));
    let c = 0;
    while (taken.has(c)) c++;
    colour[v] = c;
  }
  return { order, colour, count: n ? Math.max(...colour) + 1 : 0, maxDeg: n ? Math.max(...deg) : 0 };
}

/**
 * Hamilton cycle by backtracking (undirected, or along arc directions for a digraph). Returns the
 * cycle or null, the number of partial paths tried, and Dirac's condition. Gives up above 14
 * vertices, where the search can take visibly long.
 */
export function hamilton(g: Graph): { cycle: number[] | null; tried: number; dirac: boolean; minDeg: number; skipped?: boolean } {
  const n = g.labels.length;
  const adj = adjacency(g).map((l) => [...new Set(l.map((a) => a.to))].filter((x) => x >= 0));
  const und = adjacency({ ...g, directed: false }).map((l) => new Set(l.map((a) => a.to)).size);
  const minDeg = n ? Math.min(...und) : 0;
  const dirac = !g.directed && n >= 3 && minDeg >= n / 2;
  if (n < 3) return { cycle: null, tried: 0, dirac, minDeg };
  if (n > 14) return { cycle: null, tried: 0, dirac, minDeg, skipped: true };
  const has = adj.map((l) => new Set(l));
  const path = [0];
  const on = Array(n).fill(false);
  on[0] = true;
  let tried = 0;
  const go = (): boolean => {
    tried++;
    if (path.length === n) return has[path[n - 1]].has(0);
    for (const v of adj[path[path.length - 1]]) {
      if (on[v]) continue;
      on[v] = true;
      path.push(v);
      if (go()) return true;
      path.pop();
      on[v] = false;
    }
    return false;
  };
  const found = go();
  return { cycle: found ? [...path, 0] : null, tried, dirac, minDeg };
}

export function hasTriangle(g: Graph): boolean {
  const n = g.labels.length;
  const A = Array.from({ length: n }, () => Array(n).fill(false));
  for (const { u, v } of g.edges) if (u !== v) A[u][v] = A[v][u] = true;
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (A[a][b]) for (let c = b + 1; c < n; c++) if (A[a][c] && A[b][c]) return true;
  return false;
}

/** Tree facts for an undirected graph, and the Prüfer code (labels, smallest leaf by index) if it is a tree. */
export function treeInfo(g: Graph) {
  const n = g.labels.length;
  const m = g.edges.length;
  const { groups } = components(g);
  const loops = g.edges.some((e) => e.u === e.v);
  const keys = new Set(g.edges.map((e) => `${Math.min(e.u, e.v)},${Math.max(e.u, e.v)}`));
  const parallel = keys.size < m;
  const connected = groups.length === 1;
  // An undirected graph is a forest exactly when |E| = n - (number of components), with no loops or parallel edges.
  const acyclic = !loops && !parallel && m === n - groups.length;
  const isTree = connected && acyclic && n > 0;
  let prufer: string[] | null = null;
  if (isTree && n >= 2) {
    const adj = adjacency({ ...g, directed: false });
    const deg = adj.map((l) => l.length);
    const gone = Array(n).fill(false);
    prufer = [];
    for (let k = 0; k < n - 2; k++) {
      let leaf = -1;
      for (let v = 0; v < n; v++)
        if (!gone[v] && deg[v] === 1) {
          leaf = v;
          break;
        }
      const nb = adj[leaf].find((a) => !gone[a.to])!.to;
      prufer.push(g.labels[nb]);
      gone[leaf] = true;
      deg[nb]--;
    }
  }
  return { n, m, components: groups.length, connected, acyclic, isTree, prufer };
}

/* ---------------------------------------------------------------- algorithm traces */

export type VState = 'idle' | 'frontier' | 'current' | 'done';
/** candidate: the current best edge into a vertex that is not final yet (Dijkstra, Prim). */
export type EState = 'idle' | 'tree' | 'candidate' | 'active' | 'rejected' | 'back' | 'forward' | 'cross';

export interface Step {
  msg: string;
  vs: VState[];
  es: EState[];
  /** Short text drawn beside each vertex (distance, d/f times, ...). */
  badge: (string | null)[];
  /** Vertex colour groups (SCCs, union-find sets); -1 for none. */
  groups?: number[];
  /** Draw arcs reversed (Kosaraju's second pass works on the transpose). */
  reversed?: boolean;
  /** One line per data structure, e.g. ["Queue", "A, C"]. */
  ds: [string, string][];
  table: { head: string[]; rows: string[][]; hi?: number };
}

export type AlgoKey = 'bfs' | 'dfs' | 'topo' | 'scc' | 'dijkstra' | 'bellman-ford' | 'prim' | 'kruskal';
export const ALGO_LABEL: Record<AlgoKey, string> = {
  bfs: 'BFS',
  dfs: 'DFS',
  topo: 'Topological sort (Kahn)',
  scc: 'Strong components (Kosaraju)',
  dijkstra: 'Dijkstra',
  'bellman-ford': 'Bellman-Ford',
  prim: 'Prim',
  kruskal: 'Kruskal',
};
export const ALGO_NEEDS_SOURCE: Record<AlgoKey, boolean> = { bfs: true, dfs: true, topo: false, scc: false, dijkstra: true, 'bellman-ford': true, prim: true, kruskal: false };

const INF = Infinity;
const dstr = (d: number) => (d === INF ? '∞' : String(Math.round(d * 1000) / 1000).replace('-', '−'));

class Recorder {
  steps: Step[] = [];
  vs: VState[];
  es: EState[];
  badge: (string | null)[];
  groups?: number[];
  reversed = false;
  constructor(public g: Graph) {
    this.vs = g.labels.map(() => 'idle');
    this.es = g.edges.map(() => 'idle');
    this.badge = g.labels.map(() => null);
  }
  snap(msg: string, ds: [string, string][], table: Step['table']) {
    this.steps.push({ msg, vs: [...this.vs], es: [...this.es], badge: [...this.badge], groups: this.groups ? [...this.groups] : undefined, reversed: this.reversed, ds, table });
  }
}

export function trace(g: Graph, algo: AlgoKey, source: number): { steps: Step[]; problem?: string } {
  const n = g.labels.length;
  if (n === 0) return { steps: [], problem: 'Add some vertices first.' };
  if ((algo === 'topo' || algo === 'scc') && !g.directed) return { steps: [], problem: `${ALGO_LABEL[algo]} needs a directed graph: switch on "Directed".` };
  if ((algo === 'prim' || algo === 'kruskal') && g.directed) return { steps: [], problem: 'Minimum spanning trees are defined for undirected graphs: switch off "Directed".' };
  const s = Math.min(Math.max(0, source), n - 1);
  switch (algo) {
    case 'bfs':
      return { steps: bfs(g, s) };
    case 'dfs':
      return { steps: dfs(g, s) };
    case 'topo':
      return { steps: kahn(g) };
    case 'scc':
      return { steps: kosaraju(g) };
    case 'dijkstra':
      return { steps: dijkstra(g, s) };
    case 'bellman-ford':
      return { steps: bellmanFord(g, s) };
    case 'prim':
      return { steps: prim(g, s) };
    case 'kruskal':
      return { steps: kruskal(g) };
  }
}

function bfs(g: Graph, s: number): Step[] {
  const L = g.labels;
  const adj = adjacency(g);
  const R = new Recorder(g);
  const dist: number[] = L.map(() => INF);
  const parent: number[] = L.map(() => -1);
  const order: number[] = [];
  const queue: number[] = [];
  const table = (hi?: number) => ({ head: ['vertex', 'dist', 'parent'], rows: L.map((l, v) => [l, dstr(dist[v]), parent[v] >= 0 ? L[parent[v]] : '–']), hi });
  const ds = (): [string, string][] => [
    ['Queue (front first)', queue.map((v) => L[v]).join(', ') || 'empty'],
    ['Discovery order', order.map((v) => L[v]).join(', ')],
  ];
  dist[s] = 0;
  queue.push(s);
  order.push(s);
  R.vs[s] = 'frontier';
  R.badge[s] = '0';
  R.snap(`Start at ${L[s]}: dist[${L[s]}] = 0, and ${L[s]} goes into the queue.`, ds(), table(s));
  while (queue.length) {
    const u = queue.shift()!;
    R.vs[u] = 'current';
    R.snap(`Dequeue ${L[u]} (distance ${dist[u]}) and scan its ${g.directed ? 'out-' : ''}neighbours.`, ds(), table(u));
    for (const { to, e } of adj[u]) {
      const prev = R.es[e];
      R.es[e] = 'active';
      if (dist[to] === INF) {
        dist[to] = dist[u] + 1;
        parent[to] = u;
        queue.push(to);
        order.push(to);
        R.vs[to] = 'frontier';
        R.badge[to] = String(dist[to]);
        R.snap(`${L[to]} is new: dist[${L[to]}] = ${dist[u]} + 1 = ${dist[to]}, parent ${L[u]}, enqueue it. ${L[u]}–${L[to]} is a tree edge.`, ds(), table(to));
        R.es[e] = 'tree';
      } else {
        R.snap(`${L[to]} was already discovered (distance ${dist[to]}): skip.`, ds(), table(to));
        R.es[e] = prev === 'tree' ? 'tree' : 'rejected';
      }
    }
    R.vs[u] = 'done';
  }
  const missed = L.filter((_, v) => dist[v] === INF);
  const maxd = Math.max(...dist.filter((d) => d < INF));
  R.snap(
    `Queue empty. Every reachable vertex got its shortest distance (levels 0 to ${maxd}); the tree edges form a BFS tree.${missed.length ? ` Not reachable from ${L[s]}: ${missed.join(', ')}.` : ''}`,
    ds(),
    table(),
  );
  return R.steps;
}

function dfs(g: Graph, s: number): Step[] {
  const L = g.labels;
  const n = L.length;
  const adj = adjacency(g);
  const R = new Recorder(g);
  const d = Array(n).fill(0);
  const f = Array(n).fill(0);
  const parent = Array(n).fill(-1);
  const color = Array(n).fill(0); // 0 white, 1 grey, 2 black
  const stack: number[] = [];
  const finish: number[] = [];
  let time = 0;
  let backEdge: [number, number] | null = null;
  const table = (hi?: number) => ({ head: ['vertex', 'discover', 'finish', 'parent'], rows: L.map((l, v) => [l, d[v] ? String(d[v]) : '', f[v] ? String(f[v]) : '', parent[v] >= 0 ? L[parent[v]] : '–']), hi });
  const ds = (): [string, string][] => [
    ['Stack (bottom → top)', stack.map((v) => L[v]).join(', ') || 'empty'],
    ['Finish order', finish.map((v) => L[v]).join(', ')],
  ];
  const badge = (v: number) => (R.badge[v] = f[v] ? `${d[v]}/${f[v]}` : `${d[v]}/`);
  const visit = (u: number, viaEdge: number) => {
    time++;
    d[u] = time;
    color[u] = 1;
    stack.push(u);
    R.vs[u] = 'current';
    badge(u);
    R.snap(`Discover ${L[u]} at time ${time} and push it.`, ds(), table(u));
    for (const { to, e } of adj[u]) {
      if (!g.directed && e === viaEdge) continue; // the tree edge we arrived along
      R.es[e] = 'active';
      if (color[to] === 0) {
        parent[to] = u;
        R.es[e] = 'tree';
        R.vs[u] = 'frontier';
        R.snap(`${L[u]}–${L[to]}: ${L[to]} is unvisited, so this is a tree edge; go deeper.`, ds(), table(to));
        visit(to, e);
        R.vs[u] = 'current';
      } else if (color[to] === 1) {
        if (g.directed || R.es[e] === 'active') {
          R.es[e] = 'back';
          if (!backEdge) backEdge = [u, to];
          R.snap(`${L[u]}–${L[to]}: ${L[to]} is on the stack (discovered, not finished), so this is a back edge and it closes a cycle.`, ds(), table(to));
        }
      } else if (g.directed) {
        const fwd = d[u] < d[to];
        R.es[e] = fwd ? 'forward' : 'cross';
        R.snap(`${L[u]}→${L[to]}: ${L[to]} is already finished; ${fwd ? 'it is a descendant of ' + L[u] + ', so a forward edge' : 'it was finished in an earlier branch, so a cross edge'}.`, ds(), table(to));
      } else {
        R.es[e] = R.es[e] === 'active' ? 'back' : R.es[e];
      }
    }
    time++;
    f[u] = time;
    color[u] = 2;
    stack.pop();
    finish.push(u);
    R.vs[u] = 'done';
    badge(u);
    R.snap(`${L[u]} has no unexplored edges: finish it at time ${time} and pop it.`, ds(), table(u));
  };
  const roots = [s, ...[...Array(n).keys()].filter((v) => v !== s)];
  let first = true;
  for (const r of roots) {
    if (color[r] !== 0) continue;
    if (!first) {
      R.snap(`The stack is empty but ${L[r]} is unvisited: restart from ${L[r]}.`, ds(), table(r));
    }
    first = false;
    visit(r, -1);
  }
  let end = 'Done. The discovery/finish intervals nest like parentheses.';
  if (g.directed) {
    end = backEdge
      ? `Done. The back edge ${L[backEdge[0]]}→${L[backEdge[1]]} shows a directed cycle, so there is no topological order.`
      : `Done. No back edges, so the graph is a DAG; reverse finish order is a topological order: ${[...finish].reverse().map((v) => L[v]).join(', ')}.`;
  } else if (backEdge) end += ' Back edges (dashed) each close a cycle with tree edges.';
  else end += ' No back edges: the graph is a forest.';
  R.snap(end, ds(), table());
  return R.steps;
}

function kahn(g: Graph): Step[] {
  const L = g.labels;
  const n = L.length;
  const adj = adjacency(g);
  const R = new Recorder(g);
  const indeg = Array(n).fill(0);
  for (const { v } of g.edges) indeg[v]++;
  const out: number[] = [];
  let ready = [...Array(n).keys()].filter((v) => indeg[v] === 0);
  const table = (hi?: number) => ({ head: ['vertex', 'in-degree left'], rows: L.map((l, v) => [l, R.vs[v] === 'done' ? 'output' : String(indeg[v])]), hi });
  const ds = (): [string, string][] => [
    ['Ready (in-degree 0)', ready.map((v) => L[v]).join(', ') || 'none'],
    ['Output order', out.map((v) => L[v]).join(', ')],
  ];
  ready.forEach((v) => (R.vs[v] = 'frontier'));
  L.forEach((_, v) => (R.badge[v] = String(indeg[v])));
  R.snap(`Count in-degrees (shown beside each vertex). Vertices with in-degree 0 have no prerequisites: ${ready.map((v) => L[v]).join(', ') || 'none'}.`, ds(), table());
  while (ready.length) {
    const u = ready.shift()!;
    out.push(u);
    R.vs[u] = 'current';
    R.badge[u] = `#${out.length}`;
    R.snap(`Output ${L[u]} (position ${out.length}) and remove its out-edges.`, ds(), table(u));
    for (const { to, e } of adj[u]) {
      indeg[to]--;
      R.es[e] = 'tree';
      R.badge[to] = String(indeg[to]);
      if (indeg[to] === 0) {
        ready.push(to);
        ready = [...ready].sort((a, b) => a - b);
        R.vs[to] = 'frontier';
        R.snap(`${L[u]}→${L[to]} removed: in-degree of ${L[to]} drops to 0, so ${L[to]} is ready.`, ds(), table(to));
      } else {
        R.snap(`${L[u]}→${L[to]} removed: in-degree of ${L[to]} drops to ${indeg[to]}.`, ds(), table(to));
      }
    }
    R.vs[u] = 'done';
  }
  if (out.length === n) R.snap(`All ${n} vertices output: ${out.map((v) => L[v]).join(', ')} is a topological order (every edge points forward).`, ds(), table());
  else {
    const left = L.filter((_, v) => R.vs[v] !== 'done');
    R.snap(`Stuck: ${left.join(', ')} all still have in-degree ≥ 1, which can only happen if they contain a directed cycle. No topological order exists.`, ds(), table());
  }
  return R.steps;
}

function kosaraju(g: Graph): Step[] {
  const L = g.labels;
  const n = L.length;
  const adj = adjacency(g);
  const radj = adjacency(g, true);
  const R = new Recorder(g);
  const seen = Array(n).fill(false);
  const finish: number[] = [];
  const stack: number[] = [];
  const groups = Array(n).fill(-1);
  const sccs: number[][] = [];
  const table = (hi?: number) => ({ head: ['vertex', 'finish #', 'component'], rows: L.map((l, v) => [l, finish.includes(v) ? String(finish.indexOf(v) + 1) : '', groups[v] >= 0 ? String(groups[v] + 1) : '']), hi });
  let phase = 1;
  const ds = (): [string, string][] => [
    [phase === 1 ? 'Pass 1 stack' : 'Pass 2 stack (on reversed graph)', stack.map((v) => L[v]).join(', ') || 'empty'],
    ['Finish order (pass 1)', finish.map((v) => L[v]).join(', ')],
    ['Components so far', sccs.map((c) => `{${c.map((v) => L[v]).join(', ')}}`).join(' ') || 'none'],
  ];
  const dfs1 = (u: number) => {
    seen[u] = true;
    stack.push(u);
    R.vs[u] = 'current';
    R.snap(`Pass 1: discover ${L[u]}.`, ds(), table(u));
    for (const { to, e } of adj[u])
      if (!seen[to]) {
        R.es[e] = 'tree';
        R.vs[u] = 'frontier';
        dfs1(to);
        R.vs[u] = 'current';
      }
    stack.pop();
    finish.push(u);
    R.vs[u] = 'done';
    R.badge[u] = `f${finish.length}`;
    R.snap(`Pass 1: ${L[u]} finishes (number ${finish.length}).`, ds(), table(u));
  };
  for (let v = 0; v < n; v++) if (!seen[v]) dfs1(v);
  phase = 2;
  R.reversed = true;
  R.es = R.es.map(() => 'idle');
  R.vs = R.vs.map(() => 'idle');
  R.groups = groups;
  R.snap(`Pass 2: reverse every edge (the transpose graph) and run DFS from vertices in decreasing finish time, starting with ${L[finish[n - 1]]}.`, ds(), table());
  const seen2 = Array(n).fill(false);
  const dfs2 = (u: number, id: number) => {
    seen2[u] = true;
    groups[u] = id;
    sccs[id].push(u);
    stack.push(u);
    R.vs[u] = 'current';
    R.snap(`Pass 2: reach ${L[u]}; it joins component ${id + 1}.`, ds(), table(u));
    for (const { to, e } of radj[u])
      if (!seen2[to]) {
        R.es[e] = 'tree';
        R.vs[u] = 'frontier';
        dfs2(to, id);
        R.vs[u] = 'current';
      }
    stack.pop();
    R.vs[u] = 'done';
  };
  for (let k = n - 1; k >= 0; k--) {
    const v = finish[k];
    if (seen2[v]) continue;
    const id = sccs.length;
    sccs.push([]);
    dfs2(v, id);
    R.snap(`Component ${id + 1} complete: {${sccs[id].map((x) => L[x]).join(', ')}}. The next start is the unvisited vertex with the latest finish time.`, ds(), table());
  }
  R.reversed = false;
  R.snap(`${sccs.length} strongly connected component${sccs.length === 1 ? '' : 's'}. Shrinking each to one vertex gives the condensation, which is always a DAG.`, ds(), table());
  return R.steps;
}

function dijkstra(g: Graph, s: number): Step[] {
  const L = g.labels;
  const n = L.length;
  const adj = adjacency(g);
  const R = new Recorder(g);
  const dist = Array(n).fill(INF);
  const parent = Array(n).fill(-1);
  const pedge = Array(n).fill(-1);
  const settled = Array(n).fill(false);
  const neg = g.edges.some((e) => e.w < 0);
  const table = (hi?: number) => ({ head: ['vertex', 'dist', 'parent', 'settled'], rows: L.map((l, v) => [l, dstr(dist[v]), parent[v] >= 0 ? L[parent[v]] : '–', settled[v] ? 'yes' : '']), hi });
  const pq = () =>
    [...Array(n).keys()]
      .filter((v) => !settled[v] && dist[v] < INF)
      .sort((a, b) => dist[a] - dist[b] || a - b)
      .map((v) => `${L[v]}:${dstr(dist[v])}`)
      .join(', ') || 'empty';
  const ds = (): [string, string][] => [
    ['Priority queue (min first)', pq()],
    ['Settled', L.filter((_, v) => settled[v]).join(', ') || 'none'],
  ];
  dist[s] = 0;
  R.vs[s] = 'frontier';
  L.forEach((_, v) => (R.badge[v] = dstr(dist[v])));
  R.snap(`dist[${L[s]}] = 0 and every other tentative distance is ∞.${neg ? ' Warning: there are negative weights, so the invariant behind Dijkstra fails; compare with Bellman-Ford.' : ''}`, ds(), table(s));
  for (;;) {
    let u = -1;
    for (let v = 0; v < n; v++) if (!settled[v] && dist[v] < INF && (u < 0 || dist[v] < dist[u])) u = v;
    if (u < 0) break;
    settled[u] = true;
    R.vs[u] = 'current';
    if (pedge[u] >= 0) R.es[pedge[u]] = 'tree';
    R.snap(`Extract ${L[u]}, the unsettled vertex with the smallest tentative distance (${dstr(dist[u])}). Its distance is now final.`, ds(), table(u));
    for (const { to, w, e } of adj[u]) {
      if (settled[to]) continue;
      const prev = R.es[e];
      R.es[e] = 'active';
      const cand = dist[u] + w;
      if (cand < dist[to]) {
        const old = dist[to];
        dist[to] = cand;
        if (pedge[to] >= 0) R.es[pedge[to]] = 'rejected';
        parent[to] = u;
        pedge[to] = e;
        R.vs[to] = 'frontier';
        R.badge[to] = dstr(cand);
        R.snap(`Relax ${L[u]}→${L[to]}: ${dstr(dist[u])} + ${dstr(w)} = ${dstr(cand)} < ${dstr(old)}, so dist[${L[to]}] = ${dstr(cand)} via ${L[u]}.`, ds(), table(to));
        R.es[e] = 'candidate';
      } else {
        R.snap(`Check ${L[u]}→${L[to]}: ${dstr(dist[u])} + ${dstr(w)} = ${dstr(cand)} is not less than ${dstr(dist[to])}; no change.`, ds(), table(to));
        R.es[e] = prev === 'idle' ? 'rejected' : prev;
      }
    }
    R.vs[u] = 'done';
  }
  const missed = L.filter((_, v) => dist[v] === INF);
  R.snap(`Queue empty. The highlighted parent edges form a shortest-path tree from ${L[s]}.${missed.length ? ` Unreachable: ${missed.join(', ')}.` : ''}`, ds(), table());
  return R.steps;
}

function bellmanFord(g: Graph, s: number): Step[] {
  const L = g.labels;
  const n = L.length;
  const R = new Recorder(g);
  const dist = Array(n).fill(INF);
  const parent = Array(n).fill(-1);
  const pedge = Array(n).fill(-1);
  // Each undirected edge relaxes in both directions.
  const arcs: { u: number; v: number; w: number; e: number }[] = [];
  g.edges.forEach((ed, e) => {
    arcs.push({ u: ed.u, v: ed.v, w: ed.w, e });
    if (!g.directed) arcs.push({ u: ed.v, v: ed.u, w: ed.w, e });
  });
  let round = 0;
  const table = (hi?: number) => ({ head: ['vertex', 'dist', 'parent'], rows: L.map((l, v) => [l, dstr(dist[v]), parent[v] >= 0 ? L[parent[v]] : '–']), hi });
  const ds = (): [string, string][] => [['Round', round ? `${round} of ${n - 1}` : 'not started']];
  dist[s] = 0;
  L.forEach((_, v) => (R.badge[v] = dstr(dist[v])));
  R.vs[s] = 'frontier';
  R.snap(`dist[${L[s]}] = 0, all others ∞. Relax every edge, in list order, ${n - 1} times (n − 1 rounds).`, ds(), table(s));
  const treeEdges = () => {
    R.es = R.es.map(() => 'idle');
    pedge.forEach((e) => e >= 0 && (R.es[e] = 'tree'));
  };
  let changed = true;
  while (changed && round < n - 1) {
    round++;
    changed = false;
    for (const a of arcs) {
      if (dist[a.u] === INF) continue;
      treeEdges();
      R.es[a.e] = 'active';
      const cand = dist[a.u] + a.w;
      if (cand < dist[a.v]) {
        const old = dist[a.v];
        dist[a.v] = cand;
        parent[a.v] = a.u;
        pedge[a.v] = a.e;
        R.badge[a.v] = dstr(cand);
        R.vs[a.v] = 'frontier';
        changed = true;
        R.snap(`Round ${round}: ${L[a.u]}→${L[a.v]}: ${dstr(dist[a.u])} + ${dstr(a.w)} = ${dstr(cand)} < ${dstr(old)}, relax.`, ds(), table(a.v));
      } else {
        R.snap(`Round ${round}: ${L[a.u]}→${L[a.v]}: ${dstr(dist[a.u])} + ${dstr(a.w)} = ${dstr(cand)}, no improvement on ${dstr(dist[a.v])}.`, ds(), table(a.v));
      }
    }
    treeEdges();
    if (!changed) R.snap(`Round ${round} changed nothing, so the distances are final; stop early.`, ds(), table());
    else R.snap(`End of round ${round}: every shortest path that uses at most ${round} edge${round > 1 ? 's' : ''} is now correct.`, ds(), table());
  }
  // One more pass detects a reachable negative cycle.
  const bad = arcs.find((a) => dist[a.u] < INF && dist[a.u] + a.w < dist[a.v]);
  treeEdges();
  if (bad) {
    R.es[bad.e] = 'back';
    R.snap(`Check round: ${L[bad.u]}→${L[bad.v]} can still be relaxed after n − 1 rounds, so a negative cycle is reachable from ${L[s]} and shortest distances are undefined.`, ds(), table(bad.v));
  } else {
    L.forEach((_, v) => dist[v] < INF && (R.vs[v] = 'done'));
    R.snap(`Check round: no edge can be relaxed, so there is no reachable negative cycle and these distances are final.`, ds(), table());
  }
  return R.steps;
}

function prim(g: Graph, s: number): Step[] {
  const L = g.labels;
  const n = L.length;
  const adj = adjacency(g);
  const R = new Recorder(g);
  const key = Array(n).fill(INF);
  const via = Array(n).fill(-1);
  const viaEdge = Array(n).fill(-1);
  const inTree = Array(n).fill(false);
  let total = 0;
  const table = (hi?: number) => ({ head: ['vertex', 'key', 'via', 'in tree'], rows: L.map((l, v) => [l, dstr(key[v]), via[v] >= 0 ? L[via[v]] : '–', inTree[v] ? 'yes' : '']), hi });
  const pq = () =>
    [...Array(n).keys()]
      .filter((v) => !inTree[v] && key[v] < INF)
      .sort((a, b) => key[a] - key[b] || a - b)
      .map((v) => `${L[v]}:${dstr(key[v])}`)
      .join(', ') || 'empty';
  const ds = (): [string, string][] => [
    ['Priority queue (min key first)', pq()],
    ['Tree weight so far', dstr(total)],
  ];
  key[s] = 0;
  R.vs[s] = 'frontier';
  R.snap(`Grow a tree from ${L[s]}. key[v] is the lightest known edge joining v to the tree.`, ds(), table(s));
  for (;;) {
    let u = -1;
    for (let v = 0; v < n; v++) if (!inTree[v] && key[v] < INF && (u < 0 || key[v] < key[u])) u = v;
    if (u < 0) break;
    inTree[u] = true;
    R.vs[u] = 'current';
    if (viaEdge[u] >= 0) {
      total += key[u];
      R.es[viaEdge[u]] = 'tree';
      R.snap(`Add ${L[via[u]]}–${L[u]} (weight ${dstr(key[u])}): the lightest edge leaving the tree, safe by the cut property.`, ds(), table(u));
    } else R.snap(`${L[u]} starts the tree.`, ds(), table(u));
    for (const { to, w, e } of adj[u]) {
      if (inTree[to]) continue;
      R.es[e] = 'active';
      if (w < key[to]) {
        const old = key[to];
        if (viaEdge[to] >= 0) R.es[viaEdge[to]] = 'rejected';
        key[to] = w;
        via[to] = u;
        viaEdge[to] = e;
        R.vs[to] = 'frontier';
        R.badge[to] = dstr(w);
        R.snap(`${L[u]}–${L[to]} (${dstr(w)}) is lighter than key ${dstr(old)}: key[${L[to]}] = ${dstr(w)}.`, ds(), table(to));
        R.es[e] = 'candidate';
      } else {
        R.snap(`${L[u]}–${L[to]} (${dstr(w)}) is not lighter than key[${L[to]}] = ${dstr(key[to])}.`, ds(), table(to));
        R.es[e] = 'rejected';
      }
    }
    R.vs[u] = 'done';
  }
  const missed = L.filter((_, v) => !inTree[v]);
  R.snap(missed.length ? `The queue is empty but ${missed.join(', ')} were never reached: the graph is disconnected, so this is a spanning tree of ${L[s]}'s component only (weight ${dstr(total)}).` : `Minimum spanning tree complete: ${n - 1} edges, total weight ${dstr(total)}.`, ds(), table());
  return R.steps;
}

function kruskal(g: Graph): Step[] {
  const L = g.labels;
  const n = L.length;
  const R = new Recorder(g);
  const parent = [...Array(n).keys()];
  const rank = Array(n).fill(0);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // path halving: a one-pass form of path compression
      x = parent[x];
    }
    return x;
  };
  const order = g.edges.map((_, e) => e).sort((a, b) => g.edges[a].w - g.edges[b].w || a - b);
  const status: string[] = g.edges.map(() => '');
  let total = 0;
  let taken = 0;
  const sets = () => {
    const roots = L.map((_, v) => {
      let x = v;
      while (parent[x] !== x) x = parent[x];
      return x;
    });
    const ids = [...new Set(roots)].sort((a, b) => a - b);
    return roots.map((r) => ids.indexOf(r));
  };
  const table = (hi?: number) => ({
    head: ['edge', 'weight', 'decision'],
    rows: order.map((e) => [`${L[g.edges[e].u]}–${L[g.edges[e].v]}`, dstr(g.edges[e].w), status[e]]),
    hi,
  });
  const ds = (): [string, string][] => [
    ['Union-find parent', L.map((l, v) => `${l}→${L[parent[v]]}`).join('  ')],
    ['Tree: edges, weight', `${taken} of ${n - 1}, ${dstr(total)}`],
  ];
  R.groups = sets();
  R.snap(`Sort the ${order.length} edges by weight (table). Each vertex starts in its own set: parent[v] = v.`, ds(), table());
  for (let k = 0; k < order.length; k++) {
    const e = order[k];
    const { u, v, w } = g.edges[e];
    if (taken === n - 1) {
      status[e] = 'not needed';
      continue;
    }
    R.es[e] = 'active';
    const ru = find(u);
    const rv = find(v);
    if (ru !== rv) {
      if (rank[ru] < rank[rv]) parent[ru] = rv;
      else if (rank[ru] > rank[rv]) parent[rv] = ru;
      else {
        parent[rv] = ru;
        rank[ru]++;
      }
      total += w;
      taken++;
      status[e] = 'take ✓';
      R.es[e] = 'tree';
      R.groups = sets();
      R.snap(`${L[u]}–${L[v]} (${dstr(w)}): find(${L[u]}) = ${L[ru]}, find(${L[v]}) = ${L[rv]}, different sets, so take it and union them (by rank).`, ds(), table(k));
    } else {
      status[e] = 'skip: cycle';
      R.es[e] = 'rejected';
      R.snap(`${L[u]}–${L[v]} (${dstr(w)}): both ends are already in set ${L[ru]}, so this edge would close a cycle. Skip.`, ds(), table(k));
    }
  }
  R.snap(taken === n - 1 ? `Done: ${n - 1} edges taken, total weight ${dstr(total)}. That is a minimum spanning tree.` : `Edges exhausted with ${taken} taken: the graph is disconnected, so this is a minimum spanning forest (weight ${dstr(total)}).`, ds(), table());
  return R.steps;
}
