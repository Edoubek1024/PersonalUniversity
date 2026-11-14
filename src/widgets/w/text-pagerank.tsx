/**
 * text-pagerank: power iteration for PageRank (or HITS) on a small editable web graph.
 *
 * PageRank: r <- (1 - d)/N + d (sum over links j -> i of r_j / out(j) + dangling mass / N), from
 * the uniform start. A page with no out-links (dangling) spreads its score over every page.
 * HITS: authority a <- sum of hub scores of pages linking in, hub h <- sum of authority scores of
 * pages linked to, each scaled to sum to 1, starting from equal hub scores.
 * Step, Play and Reset drive the iteration; the bars show the current iterate with a tick at the
 * converged value. Click a page and then another to add or remove the link between them, or use
 * the From / To menus (keyboard path). Node size follows the score.
 *
 * Params:
 *   nodes      string[]                 page labels (2 to 10)                 default ["A", "B", "C", "D", "E"]
 *   edges      [from, to][]             links, as labels or 0-based indices   default A→B, A→C, B→C, C→A, D→C, D→E
 *   positions  [x, y][]                 layout, y up (any units)              default a circle
 *   d          number                   damping: probability of following a link   default 0.85
 *   mode       "pagerank" | "hits"                                            default "pagerank"
 *   modes      string[]                 modes offered ([] or one hides the switch)  default ["pagerank", "hits"]
 *   editable   boolean                  allow editing links                   default true
 *   title      string                                                        default "PageRank by power iteration"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Arrow, Plot, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { fmt } from '../kit/num';
import { hitsStep, l1, pagerankStep, type Edge } from '../kit/text-ir';

type Mode = 'pagerank' | 'hits';

function readEdges(raw: unknown, labels: string[]): Edge[] {
  if (raw === undefined) return [];
  if (!Array.isArray(raw)) throw new Error('parameter "edges" should be an array of [from, to] pairs');
  return raw.map((e, i) => {
    if (!Array.isArray(e) || e.length !== 2) throw new Error(`edge ${i + 1} should be a [from, to] pair`);
    const [u, v] = e.map((x) => (typeof x === 'number' ? x : labels.indexOf(String(x))));
    if (!(u >= 0 && u < labels.length && v >= 0 && v < labels.length && Number.isInteger(u) && Number.isInteger(v))) throw new Error(`edge ${i + 1} names a page that is not in "nodes": ${JSON.stringify(e)}`);
    if (u === v) throw new Error(`edge ${i + 1} is a self-link; leave it out`);
    return [u, v] as Edge;
  });
}

function converge(n: number, edges: Edge[], d: number, mode: Mode): { a: number[]; b: number[] } {
  if (mode === 'pagerank') {
    let r = new Array(n).fill(1 / n);
    for (let i = 0; i < 2000; i++) {
      const nx = pagerankStep(n, edges, r, d);
      const done = l1(nx, r) < 1e-13;
      r = nx;
      if (done) break;
    }
    return { a: r, b: r };
  }
  let h = new Array(n).fill(1 / n);
  let a = h;
  for (let i = 0; i < 2000; i++) {
    const s = hitsStep(n, edges, h);
    const done = l1(s.hub, h) + l1(s.auth, a) < 1e-13;
    h = s.hub;
    a = s.auth;
    if (done) break;
  }
  return { a, b: h };
}

const NODE = 'var(--plot-1)';
const SEL = 'var(--plot-2)';

function Graph({ labels, pos, edges, size, selected }: { labels: string[]; pos: [number, number][]; edges: Edge[]; size: number[]; selected: number | null }) {
  const { sx, sy } = usePlot();
  const unit = Math.abs(sx(1) - sx(0)); // pixels per data unit
  const radius = size.map((s) => 11 + 26 * Math.sqrt(s));
  const has = new Set(edges.map(([u, v]) => `${u}-${v}`));
  return (
    <g>
      {edges.map(([u, v]) => {
        const [x1, y1] = pos[u];
        const [x2, y2] = pos[v];
        const len = Math.hypot(x2 - x1, y2 - y1) || 1;
        const ux = (x2 - x1) / len;
        const uy = (y2 - y1) / len;
        // Offset the two directions of a reciprocal pair so both arrows show.
        const off = has.has(`${v}-${u}`) ? 5 / unit : 0;
        const ox = -uy * off;
        const oy = ux * off;
        const a = radius[u] / unit + 2 / unit;
        const b = radius[v] / unit + 3 / unit;
        return <Arrow key={`${u}-${v}`} x1={x1 + ux * a + ox} y1={y1 + uy * a + oy} x2={x2 - ux * b + ox} y2={y2 - uy * b + oy} color="var(--plot-axis)" width={1.6} head={8} />;
      })}
      {pos.map(([x, y], i) => (
        <g key={i}>
          <circle cx={sx(x)} cy={sy(y)} r={radius[i]} fill={selected === i ? SEL : NODE} fillOpacity={0.25} stroke={selected === i ? SEL : NODE} strokeWidth={2} />
          <text x={sx(x)} y={sy(y) + 4.5} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--plot-text)">
            {labels[i]}
          </text>
        </g>
      ))}
    </g>
  );
}

export default function TextPagerank({ params }: WidgetProps) {
  const labels = strArray(params, 'nodes', ['A', 'B', 'C', 'D', 'E']);
  if (labels.length < 2 || labels.length > 10) throw new Error('parameter "nodes" should list 2 to 10 pages');
  const n = labels.length;
  const initEdges = useMemo(
    () => (params.edges === undefined && params.nodes === undefined ? readEdges([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'A'], ['D', 'C'], ['D', 'E']], labels) : readEdges(params.edges, labels)),
    [JSON.stringify(params.edges), labels.join()], // eslint-disable-line react-hooks/exhaustive-deps
  );
  let pos: [number, number][];
  if (params.positions !== undefined) {
    const p = params.positions;
    if (!Array.isArray(p) || p.length !== n || !p.every((q) => Array.isArray(q) && q.length === 2 && q.every((x) => typeof x === 'number'))) throw new Error('parameter "positions" should be one [x, y] pair per page');
    const xs = p.map((q) => q[0] as number);
    const ys = p.map((q) => q[1] as number);
    const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
    const cy = (Math.max(...ys) + Math.min(...ys)) / 2;
    const s = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)) / 2 || 1;
    pos = p.map((q) => [((q[0] as number) - cx) / s, ((q[1] as number) - cy) / s]);
  } else {
    pos = labels.map((_, i) => [Math.sin((2 * Math.PI * i) / n), Math.cos((2 * Math.PI * i) / n)]);
  }
  const d0 = num(params, 'd', 0.85);
  if (!(d0 >= 0 && d0 < 1)) throw new Error('parameter "d" should be at least 0 and below 1');
  const modes = strArray(params, 'modes', ['pagerank', 'hits']);
  for (const m of modes) if (m !== 'pagerank' && m !== 'hits') throw new Error(`parameter "modes" has unknown mode "${m}"`);
  const editable = bool(params, 'editable', true);

  const [mode, setModeRaw] = useState<Mode>(oneOf(params, 'mode', ['pagerank', 'hits'] as const, 'pagerank'));
  const [edges, setEdges] = useState<Edge[]>(initEdges);
  const [d, setD] = useState(d0);
  const uniform = () => new Array(n).fill(1 / n);
  const [it, setIt] = useState({ k: 0, a: uniform(), b: uniform(), change: NaN });
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);
  const [acc, setAcc] = useState(0);

  const restart = () => {
    setIt({ k: 0, a: uniform(), b: uniform(), change: NaN });
    setRunning(false);
  };
  const setMode = (m: Mode) => {
    setModeRaw(m);
    restart();
  };
  const limit = useMemo(() => converge(n, edges, d, mode), [n, edges, d, mode]);

  const step = () =>
    setIt((s) => {
      if (mode === 'pagerank') {
        const nx = pagerankStep(n, edges, s.a, d);
        return { k: s.k + 1, a: nx, b: nx, change: l1(nx, s.a) };
      }
      const h = hitsStep(n, edges, s.b);
      return { k: s.k + 1, a: h.auth, b: h.hub, change: l1(h.auth, s.a) + l1(h.hub, s.b) };
    });
  useAnimation(running, (dt) => {
    const t = acc + dt;
    if (t >= 0.45) {
      setAcc(0);
      step();
      if (it.k >= 60) setRunning(false);
    } else setAcc(t);
  });

  const toggleEdge = (u: number, v: number) => {
    if (u === v) return;
    setEdges((es) => (es.some(([a, b]) => a === u && b === v) ? es.filter(([a, b]) => !(a === u && b === v)) : [...es, [u, v]]));
    restart();
  };
  const onDown = (x: number, y: number) => {
    if (!editable) return;
    let best = -1;
    let bd = 0.28;
    pos.forEach(([px, py], i) => {
      const dd = Math.hypot(px - x, py - y);
      if (dd < bd) {
        bd = dd;
        best = i;
      }
    });
    if (best < 0) return setSelected(null);
    if (selected === null) return setSelected(best);
    if (selected !== best) toggleEdge(selected, best);
    setSelected(null);
  };

  const out = labels.map((_, i) => edges.filter(([u]) => u === i).length);
  const dangling = labels.filter((_, i) => out[i] === 0);
  const size = it.a;
  const maxBar = Math.max(...limit.a, ...it.a, ...(mode === 'hits' ? [...limit.b, ...it.b] : []), 1e-9);
  const order = [...labels.keys()].sort((i, j) => limit.a[j] - limit.a[i]);

  const bar = (val: number, lim: number, color: string) => (
    <span className="relative h-2.5 min-w-0 flex-1 rounded bg-surface">
      <span className="absolute inset-y-0 left-0 rounded" style={{ width: `${(100 * val) / maxBar}%`, background: color, opacity: 0.75 }} />
      <span className="absolute -inset-y-0.5 w-0.5 rounded bg-ink" style={{ left: `calc(${(100 * lim) / maxBar}% - 1px)` }} title="converged value" />
    </span>
  );

  return (
    <Frame
      title={str(params, 'title', 'PageRank by power iteration')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button onClick={step} primary>
            Step
          </Button>
          <Button onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Play'}</Button>
          <Button onClick={restart}>Reset</Button>
        </>
      }
    >
      {modes.length > 1 && <Segmented label="Algorithm" options={modes.map((m) => ({ value: m as Mode, label: m === 'pagerank' ? 'PageRank' : 'HITS' }))} value={mode} onChange={setMode} />}
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Plot view={[-1.3, 1.3, -1.3, 1.3]} equal grid={false} axes={false} aspect={0.85} minHeight={240} maxHeight={340} onPointerDown={onDown} label="Web graph">
          <Graph labels={labels} pos={pos} edges={edges} size={size} selected={selected} />
        </Plot>
        <div className="space-y-1.5 text-[13px]">
          <div className="text-xs text-ink-3">
            {mode === 'pagerank' ? 'PageRank after' : 'Authority (top) and hub (bottom) after'} {it.k} step{it.k === 1 ? '' : 's'}; tick = converged
          </div>
          {order.map((i) => (
            <div key={i} className="rounded-md border border-line bg-surface-2 px-2 py-1">
              <div className="flex items-center gap-2">
                <span className="w-5 shrink-0 font-semibold">{labels[i]}</span>
                {bar(it.a[i], limit.a[i], 'var(--plot-1)')}
                <span className="w-14 shrink-0 text-right font-mono text-xs tabular-nums">{fmt(it.a[i], 3)}</span>
              </div>
              {mode === 'hits' && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="w-5 shrink-0 text-xs text-ink-3">h</span>
                  {bar(it.b[i], limit.b[i], 'var(--plot-2)')}
                  <span className="w-14 shrink-0 text-right font-mono text-xs tabular-nums">{fmt(it.b[i], 3)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Controls cols={3}>
        {mode === 'pagerank' && <Slider label="Damping d (follow a link)" value={d} min={0} max={0.99} step={0.01} onChange={(v) => (setD(v), restart())} />}
        <Readout label="L1 change in the last step" value={Number.isNaN(it.change) ? '–' : fmt(it.change, 3)} />
        <Readout label="Pages with no out-links" value={dangling.length ? dangling.join(', ') : 'none'} />
      </Controls>
      {editable && (
        <div className="flex flex-wrap items-end gap-2 text-[13px]">
          <label className="text-ink-2">
            From{' '}
            <select className="input ml-1 inline-block w-auto py-1" value={from} onChange={(e) => setFrom(Number(e.target.value))}>
              {labels.map((l, i) => (
                <option key={i} value={i}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <label className="text-ink-2">
            To{' '}
            <select className="input ml-1 inline-block w-auto py-1" value={to} onChange={(e) => setTo(Number(e.target.value))}>
              {labels.map((l, i) => (
                <option key={i} value={i}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <Button onClick={() => toggleEdge(from, to)} disabled={from === to}>
            {edges.some(([u, v]) => u === from && v === to) ? 'Remove link' : 'Add link'}
          </Button>
          <Button onClick={() => (setEdges(initEdges), restart())}>Original links</Button>
        </div>
      )}
      {editable && <Note>{selected === null ? 'Click a page, then a second page, to add or remove the link from the first to the second.' : `Now click the page that ${labels[selected]} should link to (or links to already, to remove it).`}</Note>}
    </Frame>
  );
}
