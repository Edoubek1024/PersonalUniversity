/**
 * curve-analysis: what f′ and f″ say about the graph of f. Modes
 *   sketch   f, f′ and f″ stacked on one x-scale, with the signs of f′ and f″ shaded, critical
 *            and inflection points marked, a draggable cursor and a sign chart
 *   extrema  the closed interval method on [a, b]: critical numbers and endpoints tabulated,
 *            absolute maximum and minimum picked out
 *   mvt      the secant over [a, b] and every c in (a, b) where the tangent is parallel to it
 *
 * Params:
 *   f       string    expression in x                          default "x^4 - 4x^3"
 *   view    [xMin, xMax, yMin, yMax] for f                     default [-1.5, 4.5, -32, 12]
 *   a, b    numbers   interval ends (extrema and mvt modes)     default 0 and 2
 *   x       number    starting cursor position (sketch mode)   default midpoint of the view
 *   modes   string[]  any of "sketch", "extrema", "mvt"        default ["sketch"]
 *   mode    string    starting mode                            default first of modes
 *   trig    boolean   x ticks at multiples of π/2              default false
 *   name    string    TeX name of the function                 default "f(x)"
 *   examples [{label, ...any of the above}], title, caption
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray, view as readView } from '../kit/params';
import { Plot, FnPath, FillBetween, Line, Segment, Dot, Label, Draggable } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { compile1, d1, d2, piTick, sig, zeros, type Fn, type Zero } from '../kit/calc1-math';
import { Corner, ExampleTabs, Legend, NumTable, readExamples, ReadoutGrid } from '../kit/calc1-ui';

type Params = Record<string, unknown>;
type Mode = 'sketch' | 'extrema' | 'mvt';
const LABELS: Record<Mode, string> = { sketch: 'f, f′ and f″', extrema: 'Closed interval method', mvt: 'Mean value theorem' };

function fitRange(g: Fn, lo: number, hi: number): [number, number] {
  let m = 0;
  for (let i = 0; i <= 300; i++) {
    const y = g(lo + ((hi - lo) * i) / 300);
    if (Number.isFinite(y) && Math.abs(y) < 1e6) m = Math.max(m, Math.abs(y));
  }
  m = m || 1;
  return [-m * 1.15, m * 1.15];
}

const sign = (y: number) => (Math.abs(y) < 1e-9 ? '0' : y > 0 ? '+' : '−');

function Sketch({ f, v, ticks, name, x0 }: { f: Fn; v: [number, number, number, number]; ticks: object; name: string; x0: number }) {
  const [x, setX] = useState(x0);
  const fp = useMemo<Fn>(() => (t) => d1(f, t), [f]);
  const fpp = useMemo<Fn>(() => (t) => d2(f, t), [f]);
  const zp = useMemo(() => zeros(fp, v[0], v[1]), [fp, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const zpp = useMemo(() => zeros(fpp, v[0], v[1]).filter((z) => z.kind !== 'touch'), [fpp, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const rp = useMemo(() => fitRange(fp, v[0], v[1]), [fp, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const rpp = useMemo(() => fitRange(fpp, v[0], v[1]), [fpp, v[0], v[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const pos = (g: Fn) => (t: number) => Math.max(0, g(t));
  const neg = (g: Fn) => (t: number) => Math.min(0, g(t));

  const classify = (z: Zero) => {
    const d = (v[1] - v[0]) * 1e-3;
    const l = fp(z.x - d);
    const r = fp(z.x + d);
    if (l > 0 && r < 0) return 'local max';
    if (l < 0 && r > 0) return 'local min';
    return 'no extremum';
  };
  const cursor = (
    <Segment x1={x} y1={-1e6} x2={x} y2={1e6} color="var(--color-accent)" width={1.25} dash="4 4" />
  );
  const ys = [f(x), fp(x), fpp(x)];

  // Sign chart: split the view at every zero of f′ and f″.
  const cuts = [...zp, ...zpp]
    .map((z) => z.x)
    .sort((p, q) => p - q)
    .filter((x, i, arr) => i === 0 || x - arr[i - 1] > (v[1] - v[0]) * 1e-5);
  const edges = [v[0], ...cuts, v[1]];
  const mids = edges.slice(0, -1).map((e, i) => (e + edges[i + 1]) / 2);
  const ivl = (i: number) => {
    const l = i === 0 ? null : fmt(edges[i]);
    const r = i === mids.length - 1 ? null : fmt(edges[i + 1]);
    return l === null && r === null ? 'all x' : l === null ? `x < ${r}` : r === null ? `x > ${l}` : `${l} < x < ${r}`;
  };

  return (
    <>
      <Plot view={v} aspect={0.46} minHeight={200} maxHeight={320} {...ticks} label="Graph of f with critical and inflection points">
        <FnPath f={f} />
        {cursor}
        {zp.filter((z) => z.kind !== 'jump').map((z, i) => (
          <g key={`c${i}`}>
            <Dot x={z.x} y={f(z.x)} color="var(--plot-1)" r={5} />
            <Label x={z.x} y={f(z.x)} dy={classify(z) === 'local max' ? -10 : 18} anchor="middle" size={11} color="var(--plot-1)">
              {classify(z)}
            </Label>
          </g>
        ))}
        {zpp.filter((z) => z.kind === 'cross').map((z, i) => (
          <Dot key={`i${i}`} x={z.x} y={f(z.x)} color="var(--plot-6)" r={5} hollow />
        ))}
        <Draggable x={x} y={f(x)} color="var(--color-accent)" label="Cursor on the graph of f" onChange={(nx) => setX(clamp(nx, v[0], v[1]))} />
        <Corner corner="tr">
          y = f(x)
        </Corner>
      </Plot>
      <Plot view={[v[0], v[1], rp[0], rp[1]]} aspect={0.3} minHeight={130} maxHeight={200} {...ticks} label="Graph of f′, shaded by sign">
        <FillBetween top={pos(fp)} a={v[0]} b={v[1]} fill="var(--plot-3)" opacity={0.25} />
        <FillBetween top={neg(fp)} a={v[0]} b={v[1]} fill="var(--plot-2)" opacity={0.22} />
        <FnPath f={fp} color="var(--plot-4)" width={2} />
        {cursor}
        <Dot x={x} y={ys[1]} color="var(--color-accent)" r={4} />
        <Corner corner="tr">y = f′(x): + rising, − falling</Corner>
      </Plot>
      <Plot view={[v[0], v[1], rpp[0], rpp[1]]} aspect={0.3} minHeight={130} maxHeight={200} {...ticks} label="Graph of f″, shaded by sign">
        <FillBetween top={pos(fpp)} a={v[0]} b={v[1]} fill="var(--plot-3)" opacity={0.25} />
        <FillBetween top={neg(fpp)} a={v[0]} b={v[1]} fill="var(--plot-2)" opacity={0.22} />
        <FnPath f={fpp} color="var(--plot-6)" width={2} />
        {cursor}
        <Dot x={x} y={ys[2]} color="var(--color-accent)" r={4} />
        <Corner corner="tr">y = f″(x): + concave up, − down</Corner>
      </Plot>
      <Legend items={[{ color: 'var(--plot-1)', label: <span>critical point of <Tex>{name}</Tex></span> }, { color: 'var(--plot-6)', label: 'inflection point (hollow)' }]} />
      <ReadoutGrid>
        <Readout label="f(x)" value={sig(ys[0], 5)} tone="var(--plot-1)" />
        <Readout label="f′(x)" value={sig(ys[1], 5)} tone="var(--plot-4)" />
        <Readout label="f″(x)" value={sig(ys[2], 5)} tone="var(--plot-6)" />
      </ReadoutGrid>
      <Slider label="x" value={x} min={v[0]} max={v[1]} step={(v[1] - v[0]) / 400} onChange={setX} />
      <Note>
        At x = {fmt(x)}, f is {ys[1] > 1e-9 ? 'increasing' : ys[1] < -1e-9 ? 'decreasing' : 'momentarily flat'} and {ys[2] > 1e-6 ? 'concave up' : ys[2] < -1e-6 ? 'concave down' : 'changing concavity or flat in curvature'}.
      </Note>
      <NumTable
        head={['', ...mids.map((_, i) => ivl(i))]}
        rows={[
          ['sign of f′', ...mids.map((m) => sign(fp(m)))],
          ['f', ...mids.map((m) => (fp(m) > 0 ? 'rising' : 'falling'))],
          ['sign of f″', ...mids.map((m) => sign(fpp(m)))],
          ['concavity', ...mids.map((m) => (fpp(m) > 0 ? 'up' : 'down'))],
        ]}
      />
    </>
  );
}

function Interval({ f, v, ticks, name, a0, b0, mvt }: { f: Fn; v: [number, number, number, number]; ticks: object; name: string; a0: number; b0: number; mvt: boolean }) {
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const fp = useMemo<Fn>(() => (t) => d1(f, t), [f]);
  const fa = f(lo);
  const fb = f(hi);
  const m = (fb - fa) / (hi - lo);
  const zs = useMemo(() => (hi - lo > 1e-9 ? zeros(mvt ? (t) => fp(t) - m : fp, lo, hi, 800).filter((z) => z.x > lo + 1e-9 && z.x < hi - 1e-9) : []), [fp, lo, hi, mvt, m]);
  const good = zs.filter((z) => z.kind !== 'jump');
  const bad = zs.filter((z) => z.kind === 'jump');
  const setEnd = (which: 'a' | 'b') => (x: number) => {
    const xc = clamp(x, v[0], v[1]);
    if (Number.isFinite(f(xc))) (which === 'a' ? setA : setB)(xc);
  };

  let body;
  if (mvt) {
    body = (
      <>
        <ReadoutGrid>
          <Readout label="Secant slope" value={sig(m, 6)} tone="var(--plot-2)" />
          <Readout label="c in (a, b)" value={good.length ? good.map((z) => sig(z.x, 5)).join(', ') : 'none'} tone="var(--plot-3)" />
          <Readout label="f′(c)" value={good.length ? sig(fp(good[0].x), 6) : '—'} tone="var(--plot-3)" />
        </ReadoutGrid>
        {bad.length > 0 && (
          <Note tone="warn">
            f is not differentiable at x = {bad.map((z) => fmt(z.x)).join(', ')}, inside (a, b). The theorem's hypothesis fails, so it promises nothing{good.length ? '' : ', and indeed no tangent is parallel to the secant'}.
          </Note>
        )}
      </>
    );
  } else {
    const cands = [
      { x: lo, kind: 'endpoint' },
      ...good.map((z) => ({ x: z.x, kind: "critical: f′ = 0" })),
      ...bad.map((z) => ({ x: z.x, kind: 'critical: f′ undefined' })),
      { x: hi, kind: 'endpoint' },
    ].sort((p, q) => p.x - q.x);
    const vals = cands.map((c) => f(c.x));
    const iMax = vals.indexOf(Math.max(...vals));
    const iMin = vals.indexOf(Math.min(...vals));
    body = (
      <>
        <Controls>
          <Readout label="Absolute maximum" value={`${sig(vals[iMax], 6)} at x = ${sig(cands[iMax].x, 5)}`} tone="var(--plot-3)" />
          <Readout label="Absolute minimum" value={`${sig(vals[iMin], 6)} at x = ${sig(cands[iMin].x, 5)}`} tone="var(--plot-2)" />
        </Controls>
        <NumTable
          head={['candidate', 'x', 'f(x)', '']}
          rows={cands.map((c, i) => [c.kind, sig(c.x, 5), sig(vals[i], 6), i === iMax ? 'max' : i === iMin ? 'min' : ''])}
        />
      </>
    );
  }

  return (
    <>
      <Plot view={v} aspect={0.62} minHeight={260} maxHeight={440} {...ticks} label={mvt ? 'Graph of f with the secant over [a, b] and parallel tangents' : 'Graph of f on [a, b] with the candidates for extrema'}>
        <FnPath f={f} width={1.5} opacity={0.45} />
        <FnPath f={f} from={lo} to={hi} />
        <Segment x1={lo} y1={-1e6} x2={lo} y2={1e6} color="var(--plot-axis)" width={1} dash="3 4" />
        <Segment x1={hi} y1={-1e6} x2={hi} y2={1e6} color="var(--plot-axis)" width={1} dash="3 4" />
        {mvt && <Line x={lo} y={fa} slope={m} color="var(--plot-2)" width={1.75} />}
        {mvt &&
          good.map((z, i) => (
            <g key={i}>
              <Line x={z.x} y={f(z.x)} slope={fp(z.x)} color="var(--plot-3)" width={1.75} dash="6 4" />
              <Segment x1={z.x} y1={0} x2={z.x} y2={f(z.x)} color="var(--plot-3)" width={1} dash="2 3" />
              <Dot x={z.x} y={f(z.x)} color="var(--plot-3)" r={5} />
              <Label x={z.x} y={0} dy={16} anchor="middle" color="var(--plot-3)" size={11}>
                c
              </Label>
            </g>
          ))}
        {!mvt &&
          good.concat(bad).map((z, i) => <Dot key={i} x={z.x} y={f(z.x)} color="var(--plot-4)" r={5} />)}
        <Label x={a} y={f(a)} dx={-8} dy={-10} anchor="end" size={12} weight={600}>
          a
        </Label>
        <Label x={b} y={f(b)} dx={8} dy={-10} size={12} weight={600}>
          b
        </Label>
        <Draggable x={a} y={f(a)} color="var(--plot-1)" label="Endpoint a" onChange={(x) => setEnd('a')(x)} />
        <Draggable x={b} y={f(b)} color="var(--plot-1)" label="Endpoint b" onChange={(x) => setEnd('b')(x)} />
      </Plot>
      <Legend
        items={
          mvt
            ? [{ color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> }, { color: 'var(--plot-2)', label: 'secant through the endpoints' }, { color: 'var(--plot-3)', label: 'parallel tangent at c', dash: true }]
            : [{ color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> }, { color: 'var(--plot-4)', label: 'critical numbers in (a, b)' }]
        }
      />
      {body}
      <Controls>
        <Slider label="a" value={a} min={v[0]} max={v[1]} step={(v[1] - v[0]) / 400} onChange={setEnd('a')} />
        <Slider label="b" value={b} min={v[0]} max={v[1]} step={(v[1] - v[0]) / 400} onChange={setEnd('b')} />
      </Controls>
    </>
  );
}

function Inner({ p }: { p: Params }) {
  const src = str(p, 'f', 'x^4 - 4x^3');
  const f = useMemo(() => compile1(src, 'f'), [src]);
  const v = readView(p, 'view', [-1.5, 4.5, -32, 12]);
  const modes = strArray(p, 'modes', ['sketch']) as Mode[];
  for (const m of modes) if (!(m in LABELS)) throw new Error(`parameter "modes": unknown mode "${m}" (use sketch, extrema, mvt)`);
  const [mode, setMode] = useState<Mode>(() => oneOf(p, 'mode', modes, modes[0] ?? 'sketch'));
  const ticks = bool(p, 'trig', false) ? { xStep: Math.PI / 2, xTickFormat: piTick } : {};
  const name = str(p, 'name', 'f(x)');
  const a = num(p, 'a', 0);
  const b = num(p, 'b', 2);
  return (
    <>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m, label: LABELS[m] }))} value={mode} onChange={setMode} />}
      {mode === 'sketch' ? <Sketch f={f} v={v} ticks={ticks} name={name} x0={num(p, 'x', (v[0] + v[1]) / 2)} /> : <Interval key={mode} f={f} v={v} ticks={ticks} name={name} a0={a} b0={b} mvt={mode === 'mvt'} />}
    </>
  );
}

export default function CurveAnalysis({ params }: WidgetProps) {
  const examples = readExamples(params);
  const [ex, setEx] = useState(0);
  const p = examples.length ? examples[Math.min(ex, examples.length - 1)].params : params;
  return (
    <Frame title={str(params, 'title', 'Reading a graph from its derivatives')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <ExampleTabs examples={examples} value={ex} onChange={setEx} />
      <Inner key={ex} p={p} />
    </Frame>
  );
}
