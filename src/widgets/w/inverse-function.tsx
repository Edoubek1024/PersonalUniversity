/**
 * inverse-function: the graph of f and its mirror image in the line y = x. Drag the point
 * P = (a, f(a)) (or its mirror P′ = (f(a), a)); run the horizontal line test; restrict the domain
 * so that f becomes one-to-one and the mirror image becomes the graph of f⁻¹.
 *
 * Params:
 *   f            string     expression in x                                default "x^2"
 *   restrict     [lo, hi]   a domain on which f is one-to-one (adds a toggle) default none
 *   restricted   boolean    start with the restriction on                   default false
 *   a            number     starting x of the point P                       default 1
 *   view         [xMin, xMax, yMin, yMax]                                  default [-4, 4, -4, 4]
 *   trig         boolean    ticks at multiples of π/2                       default false
 *   name         string     TeX for f, e.g. "\\sin x"                         default "f(x)"
 *   inverseName  string     TeX for the inverse, e.g. "\\arcsin x"            default "f^{-1}(x)"
 *   hline        boolean    start with the horizontal line test shown        default false
 *   examples     [{label, ...any of the above}]   tabs that switch between functions
 *   title, caption
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, str, view as readView } from '../kit/params';
import { Plot, FnPath, ParamPath, Line, Segment, Dot, Label, Draggable } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { compile1, piTex, piTick, roots, type Fn } from '../kit/calc1-math';
import { ExampleTabs, Legend, readExamples, ReadoutGrid } from '../kit/calc1-ui';

type Params = Record<string, unknown>;

/** A domain endpoint in TeX: ∞ for large values, multiples of π when trig is on. */
function endTex(v: number, trig: boolean): string {
  if (Math.abs(v) >= 1e6) return v > 0 ? '\\infty' : '-\\infty';
  return (trig ? piTex(v) : null) ?? fmt(v).replace('−', '-');
}

/** Two inputs with the same output on [lo, hi], or null if f looks one-to-one there. */
function findCollision(f: Fn, lo: number, hi: number): [number, number, number] | null {
  let ymin = Infinity;
  let ymax = -Infinity;
  for (let i = 0; i <= 400; i++) {
    const y = f(lo + ((hi - lo) * i) / 400);
    if (Number.isFinite(y) && Math.abs(y) < 1e6) {
      ymin = Math.min(ymin, y);
      ymax = Math.max(ymax, y);
    }
  }
  if (!(ymax > ymin)) return null;
  for (let k = 1; k < 120; k++) {
    // Irrational offset so that levels avoid turning values hit exactly.
    const y = ymin + (ymax - ymin) * ((k + 0.318309886) / 120);
    const rs = roots((x) => f(x) - y, lo, hi, 500);
    if (rs.length >= 2) return [rs[0], rs[rs.length - 1], y];
  }
  return null;
}

function Inner({ p }: { p: Params }) {
  const src = str(p, 'f', 'x^2');
  const f = useMemo(() => compile1(src, 'f'), [src]);
  const v = readView(p, 'view', [-4, 4, -4, 4]);
  const restrictArr = p.restrict === undefined ? null : numArray(p, 'restrict', []);
  if (restrictArr && (restrictArr.length !== 2 || !(restrictArr[0] < restrictArr[1]))) throw new Error('parameter "restrict" should be [lo, hi] with lo < hi');
  const trig = bool(p, 'trig', false);
  const name = str(p, 'name', 'f(x)');
  const invName = str(p, 'inverseName', 'f^{-1}(x)');
  const [restricted, setRestricted] = useState(bool(p, 'restricted', false) && !!restrictArr);
  const [hline, setHline] = useState(bool(p, 'hline', false));

  // Pad the sampled domain so curves run off the (possibly widened) plot edges.
  const span = v[1] - v[0];
  const full: [number, number] = [v[0] - span * 0.6, v[1] + span * 0.6];
  const D: [number, number] = restricted && restrictArr ? [Math.max(restrictArr[0], full[0]), Math.min(restrictArr[1], full[1])] : full;
  const [a, setA] = useState(() => clamp(num(p, 'a', 1), D[0], D[1]));
  const ac = clamp(a, D[0], D[1]);
  const b = f(ac);

  const collision = useMemo(() => findCollision(f, D[0], D[1]), [f, D[0], D[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const oneToOne = !collision;
  const hits = useMemo(() => (hline && Number.isFinite(b) ? roots((x) => f(x) - b, D[0], D[1], 800) : []), [hline, f, b, D[0], D[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFromX = (x: number) => {
    const xc = clamp(x, D[0], D[1]);
    if (Number.isFinite(f(xc))) setA(xc);
  };
  const tick = trig ? { xStep: Math.PI / 2, yStep: Math.PI / 2, xTickFormat: piTick, yTickFormat: piTick } : {};
  const outside = restricted && restrictArr;

  return (
    <>
      <Plot view={v} equal aspect={0.8} minHeight={280} maxHeight={480} {...tick} label="Graph of f and its reflection in the line y = x">
        <Line x={0} y={0} slope={1} color="var(--plot-axis)" width={1.25} dash="6 5" />
        {hline && Number.isFinite(b) && <Line x={0} y={b} slope={0} color="var(--plot-4)" width={1.5} />}
        {outside && <FnPath f={f} from={full[0]} to={D[0]} color="var(--plot-1)" width={1.5} dash="4 5" opacity={0.55} />}
        {outside && <FnPath f={f} from={D[1]} to={full[1]} color="var(--plot-1)" width={1.5} dash="4 5" opacity={0.55} />}
        <FnPath f={f} from={D[0]} to={D[1]} color="var(--plot-1)" />
        <ParamPath x={f} y={(t) => t} t0={D[0]} t1={D[1]} samples={900} color="var(--plot-2)" />
        {Number.isFinite(b) && <Segment x1={ac} y1={b} x2={b} y2={ac} color="var(--color-ink-3)" width={1.25} dash="2 4" />}
        {hits.map((x, i) => (
          <Dot key={i} x={x} y={b} r={5} color="var(--plot-4)" />
        ))}
        {Number.isFinite(b) && (
          <>
            <Label x={ac} y={b} dx={10} dy={-10} color="var(--plot-1)" size={12} weight={600}>
              P ({fmt(ac)}, {fmt(b)})
            </Label>
            <Label x={b} y={ac} dx={10} dy={16} color="var(--plot-2)" size={12} weight={600}>
              P′ ({fmt(b)}, {fmt(ac)})
            </Label>
          </>
        )}
        <Draggable x={b} y={ac} color="var(--plot-2)" label="Mirror point P′" onChange={(_x, y) => setFromX(y)} />
        <Draggable x={ac} y={b} color="var(--plot-1)" label="Point P on the graph of f" onChange={(x) => setFromX(x)} />
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> },
          { color: 'var(--plot-2)', label: oneToOne ? <Tex>{`y=${invName}`}</Tex> : 'mirror image (not a function)' },
          { color: 'var(--plot-axis)', label: <Tex>{'y=x'}</Tex>, dash: true },
        ]}
      />
      <ReadoutGrid>
        <Readout label="P = (a, f(a))" value={`(${fmt(ac)}, ${fmt(b)})`} tone="var(--plot-1)" />
        <Readout label="P′ = (f(a), a)" value={`(${fmt(b)}, ${fmt(ac)})`} tone="var(--plot-2)" />
        <Readout label="One-to-one here?" value={oneToOne ? 'yes' : 'no'} tone={oneToOne ? 'var(--plot-3)' : 'var(--plot-2)'} />
      </ReadoutGrid>
      <Controls>
        <Slider label="a" value={ac} min={Math.max(D[0], v[0])} max={Math.min(D[1], v[1])} step={(v[1] - v[0]) / 400} onChange={setFromX} />
        <div className="flex flex-col justify-end gap-2 pb-1">
          <Toggle label="Horizontal line test" checked={hline} onChange={setHline} />
          {restrictArr && (
            <Toggle
              label={
                <span>
                  Restrict the domain to <Tex>{`[${endTex(restrictArr[0], trig)},\\ ${endTex(restrictArr[1], trig)}]`}</Tex>
                </span>
              }
              checked={restricted}
              onChange={setRestricted}
            />
          )}
        </div>
      </Controls>
      {hline && Number.isFinite(b) && (
        <Note tone={hits.length > 1 ? 'warn' : 'good'}>
          The line <Tex>{`y=${fmt(b)}`}</Tex> meets the graph {hits.length === 1 ? 'once' : `${hits.length} times`}
          {hits.length > 1 ? ', so f is not one-to-one on this domain.' : '.'}
        </Note>
      )}
      {!hline && collision && (
        <Note tone="warn">
          Not one-to-one here: <Tex>{`f(${fmt(collision[0])})=f(${fmt(collision[1])})\\approx${fmt(collision[2])}`}</Tex>. The mirror image fails the vertical line test.
        </Note>
      )}
    </>
  );
}

export default function InverseFunction({ params }: WidgetProps) {
  const examples = readExamples(params);
  const [ex, setEx] = useState(0);
  const p = examples.length ? examples[Math.min(ex, examples.length - 1)].params : params;
  return (
    <Frame title={str(params, 'title', 'A function and its inverse')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <ExampleTabs examples={examples} value={ex} onChange={setEx} />
      <Inner key={ex} p={p} />
    </Frame>
  );
}
