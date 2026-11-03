/**
 * direction-field: the slope field of y' = f(t, y). Click or tap to draw the solution through a
 * point (RK4, forwards and backwards until it leaves the view). A draggable start point shows the
 * solution through it live; with `euler` it is the initial point of an Euler approximation whose
 * step is chosen from `hs`, compared with the accurate solution at t0 + span. With `phaseLine`
 * (autonomous equations only) a side panel shows f(y), the equilibria and the phase-line arrows.
 *
 * Params:
 *   f          string     right-hand side in the two variable names and slider names   default "t - y"
 *   vars       [string, string]   names of the independent and dependent variable      default ["t", "y"]
 *   sliders    {name: [initial, min, max, step?]}                                       default {}
 *   view       [tMin, tMax, yMin, yMax]                                                 default [-1, 4, -2, 3]
 *   start      [t0, y0]   the draggable initial point                                   default left of centre
 *   curves     [[t, y], ...]   solution curves drawn from the start                     default []
 *   euler      boolean    show Euler's method from the start point                      default false
 *   span       number     Euler runs from t0 to t0 + span                               default 1
 *   hs         number[]   step sizes offered by the slider, largest first               default [1, 0.5, 0.25, 0.125, 0.0625, 0.03125]
 *   h          number     initial step (nearest entry of hs)                            default 0.5
 *   phaseLine  boolean    phase-line panel; f must not contain the first variable       default false
 *   title      string                                                                   default "Direction field"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { parseExpr, tryCompile } from '../kit/expr';
import { bool, matrix, num, numArray, sliders as readSliders, str, strArray, view as readView } from '../kit/params';
import { Plot, Dot, Draggable, Label, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { useElementSize } from '../kit/hooks';
import { eulerPath, pathD, phaseLineEquilibria, rk4Solve, traceSolution, usesVar, niceCeil, type F1, type Pt, type Equilibrium1D } from '../kit/de-ode';

/** Readout labels are upper-cased by the kit; keep maths symbols as written. */
const nc = (s: string) => <span className="normal-case">{s}</span>;

const CURVE_COLORS = ['var(--plot-1)', 'var(--plot-5)', 'var(--plot-6)', 'var(--plot-4)'];
const EQ_COLOR: Record<Equilibrium1D['kind'], string> = { stable: 'var(--plot-3)', unstable: 'var(--plot-2)', semistable: 'var(--plot-4)' };
const PANEL_W = 104;

function Field({ f }: { f: F1 }) {
  const { view, width, height, ix, iy } = usePlot();
  const d = useMemo(() => {
    const gap = width < 420 ? 24 : 28;
    const nx = Math.max(6, Math.round(width / gap));
    const ny = Math.max(5, Math.round(height / gap));
    const half = Math.min(9, gap * 0.36);
    const kx = width / (view[1] - view[0]);
    const ky = height / (view[3] - view[2]);
    let out = '';
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        const px = ((i + 0.5) * width) / nx;
        const py = ((j + 0.5) * height) / ny;
        const s = f(ix(px), iy(py));
        if (!Number.isFinite(s)) continue;
        // Direction (1, s) in data units is (kx, -s*ky) in pixels.
        const ux = kx;
        const uy = -s * ky;
        const n = Math.hypot(ux, uy);
        const dx = (ux / n) * half;
        const dy = (uy / n) * half;
        out += `M${(px - dx).toFixed(1)},${(py - dy).toFixed(1)}L${(px + dx).toFixed(1)},${(py + dy).toFixed(1)}`;
      }
    }
    return out;
  }, [f, view, width, height, ix, iy]);
  return <path d={d} stroke="var(--plot-axis)" strokeWidth={1.4} strokeLinecap="round" opacity={0.85} />;
}

function Curve({ pts, color, width = 2.25, dash }: { pts: Pt[]; color: string; width?: number; dash?: string }) {
  const { sx, sy } = usePlot();
  const d = useMemo(() => pathD(pts, sx, sy), [pts, sx, sy]);
  return <path d={d} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinejoin="round" strokeLinecap="round" />;
}

function PhasePanel({ g, eqs, yName }: { g: (y: number) => number; eqs: Equilibrium1D[]; yName: string }) {
  const { view, sx, sy, height } = usePlot();
  const pts = useMemo(() => {
    const out: Pt[] = [];
    for (let i = 0; i <= 300; i++) {
      const y = view[2] + ((view[3] - view[2]) * i) / 300;
      out.push([g(y), y]);
    }
    return out;
  }, [g, view]);
  const x0 = sx(0);
  // Arrows on the phase line: one in each interval between equilibria, pointing up where f > 0.
  const cuts = [view[2], ...eqs.map((e) => e.y).filter((y) => y > view[2] && y < view[3]), view[3]];
  const arrows: { y: number; up: boolean }[] = [];
  for (let i = 0; i < cuts.length - 1; i++) {
    const lo = cuts[i];
    const hi = cuts[i + 1];
    if (sy(lo) - sy(hi) < 26) continue;
    const mid = (lo + hi) / 2;
    const v = g(mid);
    if (!Number.isFinite(v) || v === 0) continue;
    arrows.push({ y: mid, up: v > 0 });
  }
  return (
    <g>
      <line x1={x0} x2={x0} y1={0} y2={height} stroke="var(--plot-axis)" strokeWidth={1.5} />
      <path d={pathD(pts, sx, sy)} fill="none" stroke="var(--plot-6)" strokeWidth={1.75} opacity={0.9} />
      {arrows.map((a, i) => {
        const y = sy(a.y);
        const s = a.up ? -1 : 1;
        return <polygon key={i} points={`${x0},${y + s * 9} ${x0 - 6},${y - s * 5} ${x0 + 6},${y - s * 5}`} fill="var(--color-ink-2)" />;
      })}
      {eqs.map((e) => {
        const y = sy(e.y);
        const c = EQ_COLOR[e.kind];
        return e.kind === 'semistable' ? (
          <g key={e.y}>
            <circle cx={x0} cy={y} r={5.5} fill="var(--color-surface)" stroke={c} strokeWidth={2} />
            <path d={`M${x0 - 5.5},${y}A5.5,5.5 0 0 0 ${x0 + 5.5},${y}Z`} fill={c} />
          </g>
        ) : (
          <circle key={e.y} cx={x0} cy={y} r={5.5} fill={e.kind === 'stable' ? c : 'var(--color-surface)'} stroke={c} strokeWidth={2} />
        );
      })}
      <text x={6} y={14} fontSize={11} fill="var(--plot-text)" fontStyle="italic">
        f({yName})
      </text>
    </g>
  );
}

export default function DirectionField({ params }: WidgetProps) {
  const src = str(params, 'f', 't - y');
  const vars = strArray(params, 'vars', ['t', 'y']);
  if (vars.length !== 2) throw new Error('parameter "vars" should name two variables, e.g. ["t", "y"]');
  const [tName, yName] = vars;
  const defs = readSliders(params, 'sliders');
  const v = readView(params, 'view', [-1, 4, -2, 3]);
  const startDef = numArray(params, 'start', [v[0] + 0.2 * (v[1] - v[0]), (v[2] + v[3]) / 2]);
  if (startDef.length !== 2) throw new Error('parameter "start" should be [t0, y0]');
  const curvesDef = params.curves === undefined ? [] : matrix(params, 'curves', [[0, 0]]);
  if (curvesDef.length && curvesDef[0].length !== 2) throw new Error('parameter "curves" should be a list of [t, y] points');
  const euler = bool(params, 'euler', false);
  const span = num(params, 'span', 1);
  const hs = numArray(params, 'hs', [1, 0.5, 0.25, 0.125, 0.0625, 0.03125]);
  if (!hs.length || hs.some((h) => !(h > 0))) throw new Error('parameter "hs" should be a list of positive step sizes');
  const h0 = num(params, 'h', 0.5);
  const phaseLine = bool(params, 'phaseLine', false);

  const names = useMemo(() => [tName, yName, ...defs.map((d) => d.name)], [tName, yName, defs.map((d) => d.name).join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const compiled = useMemo(() => tryCompile(src, names), [src, names]);
  if (compiled.error) throw new Error(compiled.error);
  const autonomous = useMemo(() => !usesVar(parseExpr(src, names), 0), [src, names]);
  if (phaseLine && !autonomous) throw new Error(`phaseLine needs an autonomous equation: "${src}" contains ${tName}`);

  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(defs.map((d) => [d.name, d.value])));
  const [start, setStart] = useState<Pt>([startDef[0], startDef[1]]);
  const [seeds, setSeeds] = useState<Pt[]>(() => curvesDef.map((r) => [r[0], r[1]] as Pt));
  const [hi, setHi] = useState(() => {
    let best = 0;
    hs.forEach((h, i) => Math.abs(h - h0) < Math.abs(hs[best] - h0) && (best = i));
    return best;
  });

  const args = defs.map((d) => values[d.name]);
  const argKey = args.join(',');
  const f: F1 = useMemo(() => {
    const fn = compiled.fn!;
    const a = argKey ? argKey.split(',').map(Number) : [];
    return a.length === 0 ? (t, y) => fn(t, y) : (t, y) => fn(t, y, ...a);
  }, [compiled, argKey]);

  // Layout: the field and (optionally) the phase panel share one height.
  const [wrapRef, wrap] = useElementSize<HTMLDivElement>();
  const total = wrap.width || 640;
  const fieldW = phaseLine ? Math.max(160, total - PANEL_W - 8) : total;
  const H = Math.round(clamp(fieldW * 0.62, 240, 460));
  const kx = fieldW / (v[1] - v[0]);
  const ky = H / (v[3] - v[2]);
  const box = useMemo(() => ({ view: v, kx, ky }), [v[0], v[1], v[2], v[3], kx, ky]); // eslint-disable-line react-hooks/exhaustive-deps

  const curves = useMemo(() => seeds.map((s) => traceSolution(f, s[0], s[1], box)), [seeds, f, box]);
  const live = useMemo(() => traceSolution(f, start[0], start[1], box), [start, f, box]);

  const tEnd = start[0] + span;
  const eu = useMemo(() => {
    if (!euler) return null;
    const h = hs[hi];
    const path = eulerPath(f, start[0], start[1], tEnd, h);
    const exact = rk4Solve(f, start[0], start[1], tEnd, 4000);
    const approx = path[path.length - 1][1];
    const err = Math.abs(approx - exact);
    let ratio = NaN;
    if (hi > 0) {
      const prev = eulerPath(f, start[0], start[1], tEnd, hs[hi - 1]);
      const prevErr = Math.abs(prev[prev.length - 1][1] - exact);
      // A ratio of two round-off-sized errors means nothing.
      const tiny = 1e-9 * Math.max(1, Math.abs(exact));
      if (err > tiny && prevErr > tiny) ratio = prevErr / err;
    }
    return { h, path, exact, approx, err, ratio, steps: path.length - 1 };
  }, [euler, f, start, tEnd, hs, hi]);

  const g = useMemo(() => (y: number) => f(0, y), [f]);
  const eqs = useMemo(() => (phaseLine ? phaseLineEquilibria(g, v[2], v[3]) : []), [phaseLine, g, v[2], v[3]]); // eslint-disable-line react-hooks/exhaustive-deps
  const fMax = useMemo(() => {
    if (!phaseLine) return 1;
    let m = 0;
    for (let i = 0; i <= 200; i++) {
      const val = Math.abs(g(v[2] + ((v[3] - v[2]) * i) / 200));
      if (Number.isFinite(val)) m = Math.max(m, val);
    }
    return niceCeil(m * 1.1 || 1);
  }, [phaseLine, g, v[2], v[3]]); // eslint-disable-line react-hooks/exhaustive-deps

  const slope = f(start[0], start[1]);
  const eqText = (e: Equilibrium1D) => `${yName}* = ${fmt(e.y)} ${e.kind} (f′ = ${fmt(e.slope)})`;

  return (
    <Frame
      title={str(params, 'title', 'Direction field')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button onClick={() => setSeeds((s) => [...s.slice(-11), start])} title="Keep the solution through the start point">
            Keep curve
          </Button>
          <Button onClick={() => setSeeds([])} disabled={!seeds.length}>
            Clear
          </Button>
        </>
      }
    >
      <div ref={wrapRef} className="flex gap-2">
        <div className="min-w-0 flex-1">
          <Plot
            view={v}
            minHeight={H}
            maxHeight={H}
            xLabel={tName}
            yLabel={yName}
            label={`Direction field of ${yName}' = ${src}`}
            onPointerDown={(x, y) => Number.isFinite(x) && Number.isFinite(y) && setSeeds((s) => [...s.slice(-11), [x, y]])}
          >
            <Field f={f} />
            {eqs.map((e) => (
              <Segment key={e.y} x1={v[0]} x2={v[1]} y1={e.y} y2={e.y} color={EQ_COLOR[e.kind]} dash="6 5" width={1.75} />
            ))}
            {curves.map((c, i) => (
              <Curve key={i} pts={c} color={CURVE_COLORS[i % CURVE_COLORS.length]} />
            ))}
            <Curve pts={live} color={euler ? 'var(--plot-3)' : 'var(--plot-2)'} width={euler ? 2.5 : 2.25} />
            {eu && (
              <>
                <Segment x1={tEnd} x2={tEnd} y1={v[2]} y2={v[3]} color="var(--plot-axis)" dash="4 4" width={1.25} />
                <Curve pts={eu.path} color="var(--plot-2)" width={2} />
                {eu.path.length <= 80 && eu.path.map(([t, y], i) => <Dot key={i} x={t} y={y} r={3.2} color="var(--plot-2)" />)}
                <Dot x={tEnd} y={eu.exact} r={4} color="var(--plot-3)" />
                <Label x={tEnd} y={(v[2] + v[3]) / 2} dx={4} dy={0} size={11}>
                  {`${tName} = ${fmt(tEnd)}`}
                </Label>
              </>
            )}
            <Draggable x={start[0]} y={start[1]} onChange={(x, y) => setStart([clamp(x, v[0], v[1]), clamp(y, v[2], v[3])])} color="var(--plot-2)" label={`Start point (${tName}, ${yName})`} />
          </Plot>
        </div>
        {phaseLine && (
          <div style={{ width: PANEL_W }} className="shrink-0">
            <Plot view={[-fMax, fMax, v[2], v[3]]} minHeight={H} maxHeight={H} grid={false} axes={false} label={`Phase line of ${yName}' = ${src}`}>
              <PhasePanel g={g} eqs={eqs} yName={yName} />
            </Plot>
          </div>
        )}
      </div>

      {(defs.length > 0 || euler) && (
        <Controls>
          {defs.map((d) => (
            <Slider key={d.name} label={d.name} value={values[d.name]} min={d.min} max={d.max} step={d.step} onChange={(x) => setValues((s) => ({ ...s, [d.name]: x }))} />
          ))}
          {euler && <Slider label="Step size h" value={hi} min={0} max={hs.length - 1} step={1} format={(i) => fmt(hs[i], 4)} onChange={(i) => setHi(Math.round(i))} />}
        </Controls>
      )}

      {eu ? (
        <Controls cols={3}>
          <Readout label={nc(`Start (${tName}₀, ${yName}₀)`)} value={`(${fmt(start[0])}, ${fmt(start[1])})`} />
          <Readout label={nc("Steps")} value={`${eu.steps} of h = ${fmt(eu.h, 4)}`} />
          <Readout label={nc(`Euler ${yName}(${fmt(tEnd)})`)} value={fmt(eu.approx, 5)} tone="var(--plot-2)" />
          <Readout label={nc(`Accurate ${yName}(${fmt(tEnd)})`)} value={fmt(eu.exact, 5)} tone="var(--plot-3)" />
          <Readout label={nc("Error")} value={fmt(eu.err, 4)} />
          <Readout label={nc("Error(previous h) / error")} value={Number.isFinite(eu.ratio) ? fmt(eu.ratio, 3) : '—'} />
        </Controls>
      ) : (
        <Controls cols={3}>
          <Readout label={nc(`Point (${tName}, ${yName})`)} value={`(${fmt(start[0])}, ${fmt(start[1])})`} tone="var(--plot-2)" />
          <Readout label={nc(`Slope ${yName}′ there`)} value={fmt(slope)} />
          <Readout label={nc("Curves kept")} value={String(seeds.length)} />
        </Controls>
      )}

      {phaseLine && <Note tone={eqs.length ? 'info' : 'warn'}>{eqs.length ? `Equilibria: ${eqs.map(eqText).join('; ')}.` : `No equilibria in view: ${yName}′ has one sign, so every solution moves the same way.`}</Note>}
      <p className="text-xs text-ink-3">
        Tap or click the field to draw a solution through that point; drag the red point (or focus it and use the arrow keys){euler ? ' to move the initial value of Euler’s method' : ''}.
        {euler ? ' Green: accurate solution (RK4). Red: Euler steps.' : ''}
      </p>
    </Frame>
  );
}
