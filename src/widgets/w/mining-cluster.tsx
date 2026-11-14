/**
 * mining-cluster: k-means and DBSCAN on draggable 2D points. k-means steps through Lloyd's
 * algorithm one half-step at a time (assign each point to its nearest centroid, then move each
 * centroid to the mean of its points), with random (Forgy) or k-means++ seeding; centroids can be
 * dragged too, to try a bad start. DBSCAN marks core points (|N_eps(p)| ≥ minPts, counting p
 * itself), border points and noise, and draws the eps-neighbourhood of the selected point.
 * Points: drag (or focus and use the arrow keys), Add mode adds a point where you click, Remove
 * mode deletes the point you click (Delete key on a focused point does the same).
 *
 * Params:
 *   mode     "kmeans" | "dbscan"                   default "kmeans"
 *   modes    string[]  modes offered                default ["kmeans", "dbscan"] (hidden when one)
 *   preset   "blobs" | "moons" | "rings" | "uneven" default "blobs"
 *   points   number[][]  [x, y] pairs in [0, 10]; overrides the preset
 *   k        number    clusters for k-means, 1..8   default 3
 *   init     "random" | "kmeans++"                  default "random"
 *   seed     number    seed for the initialisation  default 1
 *   eps      number    DBSCAN radius, 0.2..3        default 1.0
 *   minPts   number    DBSCAN density threshold, 2..10  default 4
 *   title    string                                 default "Clustering playground"
 *   caption  string
 */
import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { Plot, usePlot } from '../kit/Plot';
import { fmt } from '../kit/num';
import { Legend } from '../kit/dsa-steps';
import { assign, dbscan, initCentroids, presetPoints, sse, update, type ClusterPreset, type Pt } from '../kit/mining-core';

const MODES = ['kmeans', 'dbscan'] as const;
type Mode = (typeof MODES)[number];
const PRESETS = ['blobs', 'moons', 'rings', 'uneven'] as const;
const PRESET_LABEL: Record<ClusterPreset, string> = {
  blobs: 'Blobs',
  moons: 'Moons',
  rings: 'Rings',
  uneven: 'Uneven',
};
const COLORS = [
  'var(--plot-1)',
  'var(--plot-2)',
  'var(--plot-3)',
  'var(--plot-4)',
  'var(--plot-6)',
  'var(--plot-5)',
  'color-mix(in srgb, var(--plot-2) 55%, var(--plot-4))',
  'color-mix(in srgb, var(--plot-1) 50%, var(--plot-3))',
];
const NOISE = 'var(--color-ink-3)';
const col = (j: number) => COLORS[j % COLORS.length];

type KmPhase = 'init' | 'assigned' | 'updated';
interface Km {
  cs: Pt[];
  lab: (number | null)[];
  iter: number;
  phase: KmPhase;
  converged: boolean;
  last: string;
}

function readPoints(params: Record<string, unknown>): Pt[] | null {
  const v = params.points;
  if (v === undefined) return null;
  const ok =
    Array.isArray(v) && v.length > 0 && v.every((p) => Array.isArray(p) && p.length === 2 && p.every((x) => typeof x === 'number' && Number.isFinite(x) && x >= 0 && x <= 10));
  if (!ok) throw new Error(`parameter "points" should be a non-empty array of [x, y] pairs with 0 ≤ x, y ≤ 10, got ${JSON.stringify(v)}`);
  return (v as number[][]).map((p) => [p[0], p[1]]);
}

const freshKm = (pts: Pt[], k: number, init: 'random' | 'kmeans++', seed: number): Km => ({
  cs: initCentroids(pts, k, init, seed),
  lab: pts.map(() => null),
  iter: 0,
  phase: 'init',
  converged: false,
  last: `Initial centroids: ${init === 'random' ? `${k} distinct points chosen at random` : 'k-means++ (each new centroid drawn with probability proportional to D², its squared distance to the nearest centroid so far)'} with seed ${seed}. Press Step to assign points.`,
});

export default function MiningCluster({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'kmeans');
  const offered = strArray(params, 'modes', [...MODES]);
  for (const m of offered) if (!MODES.includes(m as Mode)) throw new Error(`parameter "modes" has unknown mode "${m}" (use kmeans or dbscan)`);
  const preset0 = oneOf(params, 'preset', PRESETS, 'blobs');
  const given = readPoints(params);
  const k0 = Math.round(num(params, 'k', 3));
  if (k0 < 1 || k0 > 8) throw new Error('parameter "k" should be between 1 and 8');
  const init0 = oneOf(params, 'init', ['random', 'kmeans++'] as const, 'random');
  const seed0 = Math.round(num(params, 'seed', 1));
  const eps0 = num(params, 'eps', 1.0);
  if (eps0 < 0.2 || eps0 > 3) throw new Error('parameter "eps" should be between 0.2 and 3');
  const minPts0 = Math.round(num(params, 'minPts', 4));
  if (minPts0 < 2 || minPts0 > 10) throw new Error('parameter "minPts" should be between 2 and 10');

  const [mode, setMode] = useState<Mode>(offered.includes(mode0) ? mode0 : (offered[0] as Mode));
  const [preset, setPreset] = useState<ClusterPreset | 'custom'>(given ? 'custom' : preset0);
  const [pts, setPts] = useState<Pt[]>(() => given ?? presetPoints(preset0));
  const [k, setK] = useState(k0);
  const [init, setInit] = useState(init0);
  const [seed, setSeed] = useState(seed0);
  const [eps, setEps] = useState(eps0);
  const [minPts, setMinPts] = useState(minPts0);
  const [edit, setEdit] = useState<'drag' | 'add' | 'remove'>('drag');
  const [sel, setSel] = useState(0);
  const [km, setKm] = useState<Km>(() => freshKm(pts, k0, init0, seed0));

  const restart = (p = pts, kk = k, how = init, s = seed) => setKm(freshKm(p, kk, how, s));

  const loadPreset = (p: ClusterPreset) => {
    const np = presetPoints(p);
    setPreset(p);
    setPts(np);
    setSel(0);
    restart(np);
  };

  const stepKm = (s: Km): Km => {
    if (s.converged || s.cs.length === 0) return s;
    if (s.phase === 'init' || s.phase === 'updated') {
      const lab = assign(pts, s.cs);
      const same = s.phase === 'updated' && lab.every((v, i) => v === s.lab[i]);
      const iter = s.iter + 1;
      if (same)
        return {
          ...s,
          lab,
          phase: 'assigned',
          converged: true,
          last: `Assign: no point changed cluster, so the centroids will not move again. Converged after ${s.iter} iteration${s.iter === 1 ? '' : 's'}.`,
        };
      const moved = s.phase === 'updated' ? lab.filter((v, i) => v !== s.lab[i]).length : pts.length;
      return {
        ...s,
        lab,
        iter,
        phase: 'assigned',
        last: `Iteration ${iter}, assign: each point joins its nearest centroid${s.phase === 'updated' ? ` (${moved} point${moved === 1 ? '' : 's'} changed cluster)` : ''}. SSE can only go down.`,
      };
    }
    const cs = update(pts, s.lab as number[], s.cs);
    const empty = s.cs.filter((_, j) => !s.lab.includes(j)).length;
    return {
      ...s,
      cs,
      phase: 'updated',
      last: `Iteration ${s.iter}, update: each centroid moves to the mean of its points${empty ? ` (${empty} empty cluster${empty === 1 ? '' : 's'} kept in place)` : ''}. SSE can only go down.`,
    };
  };
  const runKm = () => {
    let s = km;
    for (let t = 0; t < 400 && !s.converged; t++) s = stepKm(s);
    setKm(s);
  };

  const db = useMemo(() => dbscan(pts, eps, minPts), [pts, eps, minPts]);
  const curSse = km.lab.every((l) => l !== null) ? sse(pts, km.lab, km.cs) : null;

  const movePoint = (i: number, x: number, y: number) => {
    const p: Pt = [Math.min(10, Math.max(0, x)), Math.min(10, Math.max(0, y))];
    setPts((q) => q.map((v, j) => (j === i ? p : v)));
    setPreset('custom');
    setKm((s) =>
      s.converged
        ? {
            ...s,
            converged: false,
            phase: 'updated',
            last: 'A point moved: step again to reassign.',
          }
        : s,
    );
  };
  const removePoint = (i: number) => {
    if (pts.length <= 2) return;
    const np = pts.filter((_, j) => j !== i);
    setPts(np);
    setPreset('custom');
    setSel((s) => Math.max(0, Math.min(s, np.length - 1)));
    setKm((s) => ({
      ...s,
      lab: s.lab.filter((_, j) => j !== i),
      converged: false,
      phase: s.phase === 'init' ? 'init' : 'updated',
      last: 'A point was removed: step again to reassign.',
    }));
  };
  const addPoint = (x: number, y: number) => {
    if (x < 0 || x > 10 || y < 0 || y > 10 || pts.length >= 150) return;
    setPts((q) => [...q, [Math.round(x * 100) / 100, Math.round(y * 100) / 100]]);
    setPreset('custom');
    setSel(pts.length);
    setKm((s) => ({
      ...s,
      lab: [...s.lab, null],
      converged: false,
      phase: s.phase === 'init' ? 'init' : 'updated',
      last: 'A point was added: step again to assign it.',
    }));
  };

  const down = useRef<[number, number] | null>(null);

  const selPt = pts[Math.min(sel, pts.length - 1)];
  const nCore = db.kind.filter((x) => x === 'core').length;
  const nBorder = db.kind.filter((x) => x === 'border').length;
  const nNoise = db.kind.filter((x) => x === 'noise').length;
  const selNb = db.neighbours[Math.min(sel, pts.length - 1)]?.length ?? 0;

  return (
    <Frame title={str(params, 'title', 'Clustering playground')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="flex flex-wrap items-end gap-3">
        {offered.length > 1 && (
          <Segmented
            label="Algorithm"
            options={offered.map((m) => ({
              value: m as Mode,
              label: m === 'kmeans' ? 'k-means' : 'DBSCAN',
            }))}
            value={mode}
            onChange={setMode}
          />
        )}
        <Segmented
          label="Data"
          options={PRESETS.map((p) => ({ value: p, label: PRESET_LABEL[p] }))}
          value={preset === 'custom' ? ('' as ClusterPreset) : preset}
          onChange={loadPreset}
        />
        <Segmented
          label="Click on the plot to"
          options={
            [
              { value: 'drag', label: 'Drag' },
              { value: 'add', label: 'Add' },
              { value: 'remove', label: 'Remove' },
            ] as const
          }
          value={edit}
          onChange={setEdit}
        />
      </div>

      <Plot
        view={[0, 10, 0, 10]}
        equal
        aspect={0.85}
        minHeight={300}
        maxHeight={470}
        label={mode === 'kmeans' ? `k-means on ${pts.length} points with k = ${k}` : `DBSCAN on ${pts.length} points, eps ${fmt(eps)}, minPts ${minPts}`}
        onPointerDown={(x, y) => {
          down.current = [x, y];
        }}
        onPointerUp={(x, y) => {
          const d = down.current;
          down.current = null;
          if (edit === 'add' && d && Math.hypot(d[0] - x, d[1] - y) < 0.2) addPoint(x, y);
        }}
      >
        {mode === 'dbscan' && selPt && <EpsCircle p={selPt} eps={eps} />}
        {mode === 'kmeans' &&
          km.phase !== 'init' &&
          pts.map((p, i) => {
            const l = km.lab[i];
            return l === null || !km.cs[l] ? null : <Seg key={`s${i}`} a={p} b={km.cs[l]} color={col(l)} />;
          })}
        {pts.map((p, i) => {
          let color = NOISE;
          let glyph: Glyph = 'dot';
          if (mode === 'kmeans') {
            const l = km.lab[i];
            if (l !== null && l !== undefined) color = col(l);
          } else {
            const kd = db.kind[i];
            glyph = kd === 'core' ? 'dot' : kd === 'border' ? 'ring' : 'cross';
            color = kd === 'noise' ? NOISE : col(db.cluster[i]);
          }
          return (
            <PointHandle
              key={i}
              p={p}
              color={color}
              glyph={glyph}
              selected={mode === 'dbscan' && i === sel}
              label={`Point ${i + 1}`}
              onMove={(x, y) => movePoint(i, x, y)}
              onFocus={() => setSel(i)}
              onRemove={() => removePoint(i)}
              removeOnClick={edit === 'remove'}
            />
          );
        })}
        {mode === 'kmeans' &&
          km.cs.map((c, j) => (
            <PointHandle
              key={`c${j}`}
              p={c}
              color={col(j)}
              glyph="centroid"
              label={`Centroid ${j + 1}`}
              onMove={(x, y) =>
                setKm((s) => ({
                  ...s,
                  cs: s.cs.map((v, t) => (t === j ? ([Math.min(10, Math.max(0, x)), Math.min(10, Math.max(0, y))] as Pt) : v)),
                  converged: false,
                  phase: 'updated',
                  last: `Centroid ${j + 1} moved by hand: step to reassign the points.`,
                }))
              }
            />
          ))}
      </Plot>

      {mode === 'kmeans' ? (
        <>
          <Legend
            items={[
              { color: NOISE, glyph: '●', label: 'not yet assigned' },
              {
                color: 'var(--plot-1)',
                glyph: '✚',
                label: 'centroid (draggable)',
              },
            ]}
          />
          <div aria-live="polite" className="min-h-[2.75rem] rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px] leading-5 text-ink">
            {km.last}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <Button primary onClick={() => setKm(stepKm(km))} disabled={km.converged}>
              Step ({km.phase === 'assigned' ? 'update' : 'assign'})
            </Button>
            <Button onClick={runKm} disabled={km.converged}>
              Run to convergence
            </Button>
            <Button onClick={() => restart()}>Reset</Button>
            <Button
              onClick={() => {
                setSeed(seed + 1);
                restart(pts, k, init, seed + 1);
              }}
            >
              New seed
            </Button>
          </div>
          <Controls>
            <Slider
              label="k (number of clusters)"
              value={k}
              min={1}
              max={8}
              step={1}
              onChange={(v) => {
                setK(v);
                restart(pts, v);
              }}
            />
            <Segmented
              label="Initialisation"
              options={
                [
                  { value: 'random', label: 'Random points' },
                  { value: 'kmeans++', label: 'k-means++' },
                ] as const
              }
              value={init}
              onChange={(v) => {
                setInit(v);
                restart(pts, k, v);
              }}
            />
          </Controls>
          <div className="grid grid-cols-3 gap-2">
            <Readout label={`Iteration (seed ${seed})`} value={`${km.iter}`} />
            <Readout label="SSE" value={curSse === null ? '–' : fmt(curSse, 4)} />
            <Readout label="Converged" value={km.converged ? 'yes' : 'no'} tone={km.converged ? 'var(--plot-3)' : undefined} />
          </div>
        </>
      ) : (
        <>
          <Legend
            items={[
              { color: 'var(--plot-1)', glyph: '●', label: 'core point' },
              {
                color: 'var(--plot-1)',
                dashed: true,
                label: 'border point (hollow)',
              },
              { color: NOISE, glyph: '✕', label: 'noise' },
            ]}
          />
          <Note>
            A point is <b>core</b> when its eps-neighbourhood holds at least minPts points, counting the point itself. Clusters grow from core points through other core points; a
            non-core point within eps of a core point is a <b>border</b> point; everything else is <b>noise</b>. Selected point {Math.min(sel, pts.length - 1) + 1}: {selNb} point
            {selNb === 1 ? '' : 's'} within eps (dashed circle). Focus or drag a point to select it.
          </Note>
          <Controls>
            <Slider label="eps (radius)" value={eps} min={0.2} max={3} step={0.05} onChange={setEps} format={(v) => fmt(v, 3)} />
            <Slider label="minPts" value={minPts} min={2} max={10} step={1} onChange={setMinPts} />
          </Controls>
          <div className="grid grid-cols-3 gap-2">
            <Readout label="Clusters" value={`${db.clusters}`} />
            <Readout label="Core / border" value={`${nCore} / ${nBorder}`} />
            <Readout label="Noise" value={`${nNoise} of ${pts.length}`} tone={nNoise ? NOISE : undefined} />
          </div>
        </>
      )}
    </Frame>
  );
}

type Glyph = 'dot' | 'ring' | 'cross' | 'centroid';

function Seg({ a, b, color }: { a: Pt; b: Pt; color: string }) {
  const { sx, sy } = usePlot();
  return <line x1={sx(a[0])} y1={sy(a[1])} x2={sx(b[0])} y2={sy(b[1])} stroke={color} strokeWidth={1} opacity={0.28} />;
}

function EpsCircle({ p, eps }: { p: Pt; eps: number }) {
  const { sx, sy } = usePlot();
  const r = Math.abs(sx(p[0] + eps) - sx(p[0]));
  return <circle cx={sx(p[0])} cy={sy(p[1])} r={r} fill="var(--color-accent)" fillOpacity={0.07} stroke="var(--color-accent)" strokeWidth={1.5} strokeDasharray="5 4" />;
}

/** A draggable point (pointer and arrow keys) drawn with a chosen glyph. */
function PointHandle({
  p,
  color,
  glyph,
  label,
  selected,
  onMove,
  onFocus,
  onRemove,
  removeOnClick,
}: {
  p: Pt;
  color: string;
  glyph: Glyph;
  label: string;
  selected?: boolean;
  onMove: (x: number, y: number) => void;
  onFocus?: () => void;
  onRemove?: () => void;
  removeOnClick?: boolean;
}) {
  const { sx, sy, toData } = usePlot();
  const dragging = useRef(false);
  const cx = sx(p[0]);
  const cy = sy(p[1]);
  const onKey = (e: KeyboardEvent<SVGGElement>) => {
    const s = e.shiftKey ? 0.5 : 0.1;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-s, 0],
      ArrowRight: [s, 0],
      ArrowUp: [0, s],
      ArrowDown: [0, -s],
    };
    if ((e.key === 'Delete' || e.key === 'Backspace') && onRemove) {
      e.preventDefault();
      onRemove();
      return;
    }
    const v = d[e.key];
    if (!v) return;
    e.preventDefault();
    onMove(p[0] + v[0], p[1] + v[1]);
  };
  return (
    <g
      tabIndex={0}
      role="slider"
      aria-label={label}
      aria-valuetext={`(${fmt(p[0])}, ${fmt(p[1])})`}
      style={{
        cursor: removeOnClick ? 'not-allowed' : 'grab',
        touchAction: 'none',
        outline: 'none',
      }}
      className="group"
      onFocus={onFocus}
      onPointerDown={(e) => {
        e.stopPropagation();
        onFocus?.();
        if (removeOnClick && onRemove) {
          onRemove();
          return;
        }
        dragging.current = true;
        (e.currentTarget as SVGGElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const [x, y] = toData(e);
        onMove(x, y);
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        dragging.current = false;
      }}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={onKey}
    >
      <circle cx={cx} cy={cy} r={glyph === 'centroid' ? 14 : 10} fill="transparent" />
      <circle cx={cx} cy={cy} r={glyph === 'centroid' ? 12 : 8} fill="none" stroke="var(--color-accent)" strokeWidth={2} className="opacity-0 group-focus-visible:opacity-100" />
      {selected && <circle cx={cx} cy={cy} r={8.5} fill="none" stroke="var(--color-ink)" strokeWidth={1.5} />}
      {glyph === 'dot' && <circle cx={cx} cy={cy} r={4.5} fill={color} stroke="var(--color-surface)" strokeWidth={1} />}
      {glyph === 'ring' && <circle cx={cx} cy={cy} r={4} fill="var(--color-surface)" stroke={color} strokeWidth={2.25} />}
      {glyph === 'cross' && (
        <g stroke={color} strokeWidth={2} strokeLinecap="round">
          <line x1={cx - 3.5} y1={cy - 3.5} x2={cx + 3.5} y2={cy + 3.5} />
          <line x1={cx - 3.5} y1={cy + 3.5} x2={cx + 3.5} y2={cy - 3.5} />
        </g>
      )}
      {glyph === 'centroid' && (
        <g>
          <rect x={cx - 7} y={cy - 7} width={14} height={14} transform={`rotate(45 ${cx} ${cy})`} fill={color} stroke="var(--color-ink)" strokeWidth={1.5} />
          <line x1={cx - 3.5} y1={cy} x2={cx + 3.5} y2={cy} stroke="var(--color-surface)" strokeWidth={1.75} />
          <line x1={cx} y1={cy - 3.5} x2={cx} y2={cy + 3.5} stroke="var(--color-surface)" strokeWidth={1.75} />
        </g>
      )}
    </g>
  );
}
