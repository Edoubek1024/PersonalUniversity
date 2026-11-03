/**
 * secant-tangent: from secant to tangent. Modes
 *   secant  drag P = (a, f(a)) and Q = (a + h, f(a + h)); shrink h and watch the secant slope
 *           approach f′(a), with a table of difference quotients for h = ±1, ±0.1, ...
 *   trace   sweep a and plot the tangent slope point by point on a second graph: that is f′
 *   linear  the tangent line L(x) = f(a) + f′(a)(x − a); zoom in until the graph looks straight,
 *           and read the error f(a + h) − L(a + h)
 *
 * Params:
 *   f       string    expression in x                          default "x^2 - 3x"
 *   a       number    starting point                           default 2
 *   h       number    starting h                               default 1
 *   view    [xMin, xMax, yMin, yMax]                           default [-1.5, 4.5, -3.5, 3]
 *   fpView  [yMin, yMax] for the f′ graph in trace mode         default fitted to f′
 *   modes   string[]  any of "secant", "trace", "linear"        default ["secant"]
 *   mode    string    starting mode                            default first of modes
 *   trig    boolean   x ticks at multiples of π/2              default false
 *   name    string    TeX name of the function, e.g. "\\sqrt x"  default "f(x)"
 *   examples [{label, ...any of the above}], title, caption
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, strArray, view as readView } from '../kit/params';
import { Plot, FnPath, Line, Segment, Dot, Label, Draggable } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';
import { compile1, d1, d2, piTick, sig } from '../kit/calc1-math';
import { Corner, Dots, ExampleTabs, Legend, LogSlider, NumTable, readExamples, ReadoutGrid } from '../kit/calc1-ui';

type Params = Record<string, unknown>;
type Mode = 'secant' | 'trace' | 'linear';
const LABELS: Record<Mode, string> = { secant: 'Secant → tangent', trace: 'Derivative trace', linear: 'Linear approximation' };

function Inner({ p }: { p: Params }) {
  const src = str(p, 'f', 'x^2 - 3x');
  const f = useMemo(() => compile1(src, 'f'), [src]);
  const v = readView(p, 'view', [-1.5, 4.5, -3.5, 3]);
  const modes = strArray(p, 'modes', ['secant']) as Mode[];
  for (const m of modes) if (!(m in LABELS)) throw new Error(`parameter "modes": unknown mode "${m}" (use secant, trace, linear)`);
  const trig = bool(p, 'trig', false);
  const name = str(p, 'name', 'f(x)');
  const ticks = trig ? { xStep: Math.PI / 2, xTickFormat: piTick } : {};
  const span = v[1] - v[0];

  const [mode, setMode] = useState<Mode>(() => oneOf(p, 'mode', modes, modes[0] ?? 'secant'));
  const [a, setA] = useState(num(p, 'a', 2));
  const [h, setH] = useState(num(p, 'h', 1));
  const [showTangent, setShowTangent] = useState(true);
  const [shrinking, setShrinking] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const [trace, setTrace] = useState<[number, number][]>([]);
  const [showFp, setShowFp] = useState(false);
  const [zoom, setZoom] = useState(1);

  const fa = f(a);
  const slope = d1(f, a);
  const hMax = span / 2;

  const record = (x: number) => {
    const s = d1(f, x);
    if (!Number.isFinite(s)) return;
    setTrace((t) => (t.length && Math.abs(t[t.length - 1][0] - x) < span / 1500 ? t : t.length > 3000 ? [...t.slice(1), [x, s]] : [...t, [x, s]]));
  };
  const moveA = (x: number) => {
    const xc = clamp(x, v[0], v[1]);
    if (!Number.isFinite(f(xc))) return;
    setA(xc);
    if (mode === 'trace') record(xc);
  };

  useAnimation(shrinking, (dt) => {
    setH((hh) => {
      const next = hh * Math.exp(-dt * 0.9);
      if (Math.abs(next) < 1e-3) {
        setShrinking(false);
        return Math.sign(hh) * 1e-3;
      }
      return next;
    });
  });
  useAnimation(sweeping, (dt) => {
    // Keep moving through points where f is undefined (e.g. x < 0 for √x); record only defined slopes.
    const next = Math.min(v[1], a + (dt * span) / 8);
    if (next >= v[1]) setSweeping(false);
    setA(next);
    if (Number.isFinite(f(next))) record(next);
  });

  const fpRange = useMemo<[number, number]>(() => {
    if (p.fpView !== undefined) {
      const r = numArray(p, 'fpView', []);
      if (r.length !== 2 || !(r[0] < r[1])) throw new Error('parameter "fpView" should be [yMin, yMax] with yMin < yMax');
      return [r[0], r[1]];
    }
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i <= 200; i++) {
      const s = d1(f, v[0] + (span * i) / 200);
      if (Number.isFinite(s) && Math.abs(s) < 1e3) {
        lo = Math.min(lo, s);
        hi = Math.max(hi, s);
      }
    }
    if (!(hi > lo)) return [lo - 1, lo + 1];
    const pad = (hi - lo) * 0.15;
    return [Math.min(lo - pad, -0.5), Math.max(hi + pad, 0.5)];
  }, [f, v[0], v[1], p.fpView]); // eslint-disable-line react-hooks/exhaustive-deps
  const fp = useMemo(() => (x: number) => d1(f, x), [f]);

  const tabs = modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m, label: LABELS[m] }))} value={mode} onChange={(m) => { setMode(m); setShrinking(false); setSweeping(false); }} />;

  if (mode === 'secant') {
    const b = a + h;
    const fb = f(b);
    const ok = Math.abs(h) > 1e-12 && Number.isFinite(fb);
    const sec = ok ? (fb - fa) / h : NaN;
    const hs = [1, 0.1, 0.01, 0.001, 0.0001];
    return (
      <>
        {tabs}
        <Plot view={v} aspect={0.62} minHeight={260} maxHeight={440} {...ticks} label="Graph of f with a secant line through P and Q and the tangent at P">
          <FnPath f={f} />
          {showTangent && Number.isFinite(slope) && <Line x={a} y={fa} slope={slope} color="var(--plot-3)" width={1.75} dash="6 5" />}
          {ok && <Line x={a} y={fa} slope={sec} color="var(--plot-2)" width={2} />}
          {ok && (
            <>
              <Segment x1={a} y1={fa} x2={b} y2={fa} color="var(--color-ink-3)" width={1.25} dash="3 3" />
              <Segment x1={b} y1={fa} x2={b} y2={fb} color="var(--color-ink-3)" width={1.25} dash="3 3" />
              <Label x={(a + b) / 2} y={fa} dy={fb > fa ? 15 : -7} anchor="middle" size={11} color="var(--color-ink-2)">
                h
              </Label>
            </>
          )}
          <Label x={a} y={fa} dx={-10} dy={-10} anchor="end" color="var(--plot-1)" weight={600}>
            P
          </Label>
          {ok && (
            <Label x={b} y={fb} dx={10} dy={-8} color="var(--plot-2)" weight={600}>
              Q
            </Label>
          )}
          {ok && <Draggable x={b} y={fb} color="var(--plot-2)" label="Point Q at x = a + h" onChange={(x) => { setShrinking(false); const hh = clamp(x, v[0], v[1]) - a; setH(Math.abs(hh) < 1e-9 ? 1e-3 : hh); }} />}
          <Draggable x={a} y={fa} color="var(--plot-1)" label="Point P at x = a" onChange={(x) => moveA(x)} />
        </Plot>
        <Legend items={[{ color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> }, { color: 'var(--plot-2)', label: 'secant PQ' }, ...(showTangent ? [{ color: 'var(--plot-3)', label: 'tangent at P', dash: true }] : [])]} />
        <ReadoutGrid>
          <Readout label="Secant slope" value={ok ? sig(sec, 6) : '0/0: undefined'} tone="var(--plot-2)" />
          <Readout label="Tangent slope f′(a)" value={sig(slope, 6)} tone="var(--plot-3)" />
          <Readout label="Difference" value={ok ? sig(sec - slope, 3) : '—'} />
        </ReadoutGrid>
        <Controls>
          <Slider label="a" value={a} min={v[0]} max={v[1]} step={span / 400} onChange={moveA} />
          <Slider label="h" value={h} min={-hMax} max={hMax} step={hMax / 400} onChange={(x) => { setShrinking(false); setH(x); }} format={(x) => sig(x, 3)} />
        </Controls>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setShrinking((s) => !s)}>{shrinking ? 'Pause' : 'Shrink h'}</Button>
          <Button onClick={() => { setShrinking(false); setH((x) => x / 2); }}>Halve h</Button>
          <Button onClick={() => { setShrinking(false); setH(num(p, 'h', 1)); setA(num(p, 'a', 2)); }}>Reset</Button>
          <Toggle label="Show tangent" checked={showTangent} onChange={setShowTangent} />
        </div>
        {!ok && <Note>With h = 0 the quotient is 0/0, which says nothing: the derivative is the limit as h → 0, not the value at h = 0.</Note>}
        <NumTable
          head={['h', <Tex key="p">{'\\frac{f(a+h)-f(a)}{h}'}</Tex>, <span key="m">with −h</span>]}
          rows={hs.map((x) => [sig(x, 1), sig((f(a + x) - fa) / x, 8), sig((f(a - x) - fa) / -x, 8)])}
        />
      </>
    );
  }

  if (mode === 'trace') {
    return (
      <>
        {tabs}
        <Plot view={v} aspect={0.5} minHeight={210} maxHeight={330} {...ticks} label="Graph of f with its tangent line at a">
          <FnPath f={f} />
          {Number.isFinite(slope) && <Line x={a} y={fa} slope={slope} color="var(--plot-3)" width={1.75} />}
          <Draggable x={a} y={fa} color="var(--plot-1)" label="Point of tangency" onChange={(x) => { setSweeping(false); moveA(x); }} />
          <Label x={a} y={fa} dx={10} dy={-10} color="var(--plot-3)" size={11}>
            slope {fmt(slope)}
          </Label>
        </Plot>
        <Plot view={[v[0], v[1], fpRange[0], fpRange[1]]} aspect={0.4} minHeight={170} maxHeight={260} {...ticks} label="The slopes recorded so far, plotted against x">
          {showFp && <FnPath f={fp} color="var(--plot-4)" width={1.75} dash="6 5" />}
          <Dots points={trace} r={2.2} color="var(--plot-3)" />
          {Number.isFinite(slope) && <Segment x1={a} y1={0} x2={a} y2={slope} color="var(--plot-3)" width={2} />}
          <Dot x={a} y={slope} color="var(--plot-3)" r={5} />
          <Corner corner="tr">slope of the tangent at x</Corner>
        </Plot>
        <Legend items={[{ color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> }, { color: 'var(--plot-3)', label: 'tangent slopes recorded' }, ...(showFp ? [{ color: 'var(--plot-4)', label: <Tex>{"y=f'(x)"}</Tex>, dash: true }] : [])]} />
        <ReadoutGrid>
          <Readout label="a" value={fmt(a)} />
          <Readout label="f(a)" value={sig(fa, 5)} tone="var(--plot-1)" />
          <Readout label="f′(a)" value={sig(slope, 5)} tone="var(--plot-3)" />
        </ReadoutGrid>
        <Slider label="a" value={a} min={v[0]} max={v[1]} step={span / 400} onChange={(x) => { setSweeping(false); moveA(x); }} />
        <div className="flex flex-wrap items-center gap-2">
          <Button primary onClick={() => { if (!sweeping && a >= v[1] - 1e-9) { setTrace([]); setA(v[0]); } setSweeping((s) => !s); }}>{sweeping ? 'Pause' : 'Sweep'}</Button>
          <Button onClick={() => { setSweeping(false); setTrace([]); setA(v[0]); }}>Clear</Button>
          <Toggle label="Show f′" checked={showFp} onChange={setShowFp} />
        </div>
      </>
    );
  }

  // Linear approximation.
  const sec2 = d2(f, a);
  const vz: [number, number, number, number] = [a - (a - v[0]) * zoom, a + (v[1] - a) * zoom, fa - (fa - v[2]) * zoom, fa + (v[3] - fa) * zoom];
  const x1 = a + h;
  const Lx = fa + slope * h;
  const err = f(x1) - Lx;
  return (
    <>
      {tabs}
      <Plot view={vz} aspect={0.62} minHeight={260} maxHeight={440} {...(zoom > 0.3 ? ticks : {})} label="Graph of f with its tangent line, zoomed about the point of tangency">
        <FnPath f={f} />
        {Number.isFinite(slope) && <Line x={a} y={fa} slope={slope} color="var(--plot-3)" width={1.75} />}
        <Segment x1={x1} y1={Lx} x2={x1} y2={f(x1)} color="var(--plot-2)" width={3} />
        <Dot x={x1} y={f(x1)} color="var(--plot-1)" r={4} />
        <Dot x={x1} y={Lx} color="var(--plot-3)" r={4} />
        <Draggable x={a} y={fa} color="var(--plot-1)" label="Point of tangency" onChange={(x) => moveA(x)} />
      </Plot>
      <Legend items={[{ color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> }, { color: 'var(--plot-3)', label: <Tex>{"y=L(x)=f(a)+f'(a)(x-a)"}</Tex> }, { color: 'var(--plot-2)', label: 'error at a + h' }]} />
      <ReadoutGrid>
        <Readout label="f(a + h)" value={sig(f(x1), 7)} tone="var(--plot-1)" />
        <Readout label="L(a + h)" value={sig(Lx, 7)} tone="var(--plot-3)" />
        <Readout label="Error f − L" value={sig(err, 4)} tone="var(--plot-2)" />
        <Readout label="f′(a)" value={sig(slope, 5)} />
        <Readout label="Error / h²" value={Math.abs(h) > 1e-9 ? sig(err / (h * h), 4) : '—'} />
        <Readout label="f″(a) / 2" value={sig(sec2 / 2, 4)} />
      </ReadoutGrid>
      <Controls>
        <Slider label="a" value={a} min={v[0]} max={v[1]} step={span / 400} onChange={moveA} />
        <Slider label="h" value={h} min={-hMax / 2} max={hMax / 2} step={hMax / 1000} onChange={setH} format={(x) => sig(x, 3)} />
        <LogSlider label="Zoom" value={zoom} min={1e-3} max={1} onChange={setZoom} format={(s) => `×${fmt(1 / s, 3)}`} steps={300} />
      </Controls>
      <Note>
        {sec2 < -1e-6 ? 'Here f is concave down, so the tangent lies above the graph and L overestimates.' : sec2 > 1e-6 ? 'Here f is concave up, so the tangent lies below the graph and L underestimates.' : 'Here f″(a) is about 0, so the tangent hugs the graph especially closely.'} Shrinking h by 10 shrinks the error by about 100.
      </Note>
    </>
  );
}

export default function SecantTangent({ params }: WidgetProps) {
  const examples = readExamples(params);
  const [ex, setEx] = useState(0);
  const p = examples.length ? examples[Math.min(ex, examples.length - 1)].params : params;
  return (
    <Frame title={str(params, 'title', 'Secant and tangent')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <ExampleTabs examples={examples} value={ex} onChange={setEx} />
      <Inner key={ex} p={p} />
    </Frame>
  );
}
