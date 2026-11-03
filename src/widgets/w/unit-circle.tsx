/**
 * unit-circle: drag a point round the unit circle; cos θ and sin θ appear as segments, and the
 * sine and cosine graphs are traced alongside so the circle-to-graph link is visible. Angles
 * snap to multiples of π/6 and π/4, where the readouts become exact (√3/2 and so on).
 *
 * Params:
 *   degrees  number    starting angle in degrees                    default 30
 *   tan      boolean   show tan θ on the tangent line x = 1         default true
 *   graph    boolean   show the traced graphs beside the circle      default true
 *   snap     boolean   snap a dragged point to π/6 and π/4 multiples default true
 *   title    string                                                  default "The unit circle"
 *   caption  string    sentence under the widget
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str } from '../kit/params';
import { Plot, ParamPath, Segment, Dot, Label, Draggable, FnPath, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Readout, Slider, Tex, Toggle } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { fmt } from '../kit/num';
import { exactTex, piTex, piText, piTick } from '../kit/calc1-math';
import { Legend, ReadoutGrid } from '../kit/calc1-ui';

const TAU = 2 * Math.PI;
const TARGETS = Array.from(new Set([...Array.from({ length: 12 }, (_, k) => (k * Math.PI) / 6), ...Array.from({ length: 8 }, (_, k) => (k * Math.PI) / 4)])).sort((a, b) => a - b);

function norm(t: number) {
  const r = t % TAU;
  return r < 0 ? r + TAU : r;
}

function snapTo(t: number, tol: number): number {
  for (const s of [...TARGETS, TAU]) if (Math.abs(t - s) < tol) return s === TAU ? 0 : s;
  return t;
}

const isExact = (t: number) => TARGETS.some((s) => Math.abs(t - s) < 1e-9);

/** A value readout: exact TeX at a standard angle, else three decimals. */
function Val({ v, exact }: { v: number; exact: boolean }) {
  if (!Number.isFinite(v) || Math.abs(v) > 1e12) return <span>undefined</span>;
  const t = exact ? exactTex(v) : null;
  return t ? <Tex>{t}</Tex> : <span>{fmt(v)}</span>;
}

/** Vertical bar from (x, 0) to (x, y), offset sideways by dx pixels. */
function Bar({ x, y, dx, color }: { x: number; y: number; dx: number; color: string }) {
  const { sx, sy } = usePlot();
  return <line x1={sx(x) + dx} x2={sx(x) + dx} y1={sy(0)} y2={sy(y)} stroke={color} strokeWidth={4} strokeLinecap="round" />;
}

export default function UnitCircle({ params }: WidgetProps) {
  const start = snapTo(norm((num(params, 'degrees', 30) * Math.PI) / 180), 1e-6);
  const showTanParam = bool(params, 'tan', true);
  const graph = bool(params, 'graph', true);
  const snap = bool(params, 'snap', true);
  const [theta, setTheta] = useState(start);
  const [showTan, setShowTan] = useState(showTanParam);
  const [playing, setPlaying] = useState(false);

  useAnimation(playing, (dt) => setTheta((t) => norm(t + (dt * Math.PI) / 4)));

  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const exact = isExact(theta);
  const tanDefined = Math.abs(c) > 1e-9;
  const tn = tanDefined ? s / c : NaN;
  const ref = Math.min(theta % Math.PI, Math.PI - (theta % Math.PI));
  const deg = (theta * 180) / Math.PI;
  const thetaTex = exact ? piTex(theta) : null;

  const tanFn = useMemo(() => (x: number) => (Math.abs(Math.cos(x)) < 1e-3 ? NaN : Math.tan(x)), []);

  const circle = (
    <Plot view={[-1.35, 1.35, -1.35, 1.35]} equal aspect={1} minHeight={240} maxHeight={320} xStep={1} yStep={1} xLabel="x" yLabel="y" label="Unit circle with the point (cos θ, sin θ)">
      <ParamPath x={Math.cos} y={Math.sin} t0={0} t1={TAU} samples={240} color="var(--plot-axis)" width={1.75} />
      {/* angle arc */}
      <ParamPath x={(t) => 0.22 * Math.cos(t)} y={(t) => 0.22 * Math.sin(t)} t0={0} t1={theta} samples={60} color="var(--color-ink-3)" width={1.5} />
      {showTan && tanDefined && Math.abs(tn) < 50 && (
        <>
          <Segment x1={1} y1={-1.6} x2={1} y2={1.6} color="var(--plot-3)" width={1} dash="3 4" opacity={0.6} />
          <Segment x1={c > 0 ? 0 : c} y1={c > 0 ? 0 : s} x2={1} y2={tn} color="var(--plot-3)" width={1.25} dash="4 4" />
          <Segment x1={1} y1={0} x2={1} y2={tn} color="var(--plot-3)" width={4} />
        </>
      )}
      <Segment x1={0} y1={0} x2={c} y2={s} color="var(--color-ink-2)" width={1.75} />
      <Segment x1={0} y1={0} x2={c} y2={0} color="var(--plot-1)" width={4} />
      <Segment x1={c} y1={0} x2={c} y2={s} color="var(--plot-2)" width={4} />
      <Label x={c / 2} y={0} dy={s >= 0 ? 16 : -8} anchor="middle" color="var(--plot-1)" size={11}>
        cos θ
      </Label>
      <Label x={c} y={s / 2} dx={c >= 0 ? 6 : -6} dy={4} anchor={c >= 0 ? 'start' : 'end'} color="var(--plot-2)" size={11}>
        sin θ
      </Label>
      <Label x={0.26 * Math.cos(theta / 2)} y={0.26 * Math.sin(theta / 2)} dx={3} dy={-2} color="var(--color-ink-2)" size={11}>
        θ
      </Label>
      <Draggable
        x={c}
        y={s}
        color="var(--color-accent)"
        label="Point on the unit circle at angle θ"
        onChange={(x, y) => {
          setPlaying(false);
          const t = norm(Math.atan2(y, x));
          setTheta(snap ? snapTo(t, 0.06) : t);
        }}
      />
    </Plot>
  );

  const graphs = (
    <Plot view={[0, TAU, -1.6, 1.6]} aspect={0.72} minHeight={200} maxHeight={320} xStep={Math.PI / 2} yStep={1} xTickFormat={piTick} xLabel="θ" label="Graphs of sin θ and cos θ traced up to the current angle">
      <FnPath f={Math.cos} color="var(--plot-1)" width={1.5} opacity={0.3} />
      <FnPath f={Math.sin} color="var(--plot-2)" width={1.5} opacity={0.3} />
      {showTan && <FnPath f={tanFn} color="var(--plot-3)" width={1.25} opacity={0.3} />}
      {theta > 1e-9 && <FnPath f={Math.cos} to={theta} color="var(--plot-1)" width={2.5} />}
      {theta > 1e-9 && <FnPath f={Math.sin} to={theta} color="var(--plot-2)" width={2.5} />}
      {showTan && theta > 1e-9 && <FnPath f={tanFn} to={theta} color="var(--plot-3)" width={2} />}
      <Segment x1={theta} y1={-1.6} x2={theta} y2={1.6} color="var(--plot-axis)" width={1} dash="3 4" />
      <Bar x={theta} y={c} dx={-3} color="var(--plot-1)" />
      <Bar x={theta} y={s} dx={3} color="var(--plot-2)" />
      <Dot x={theta} y={c} color="var(--plot-1)" />
      <Dot x={theta} y={s} color="var(--plot-2)" />
    </Plot>
  );

  return (
    <Frame
      title={str(params, 'title', 'The unit circle')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Button>
          <Button
            onClick={() => {
              setPlaying(false);
              setTheta(start);
            }}
          >
            Reset
          </Button>
        </>
      }
    >
      <div className={graph ? 'grid gap-3 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:items-center' : ''}>
        {circle}
        {graph && graphs}
      </div>
      <Legend
        items={[
          { color: 'var(--plot-1)', label: 'cos θ (x-coordinate)' },
          { color: 'var(--plot-2)', label: 'sin θ (y-coordinate)' },
          ...(showTan ? [{ color: 'var(--plot-3)', label: 'tan θ (height on x = 1)' }] : []),
        ]}
      />
      <ReadoutGrid>
        <Readout label="θ (radians)" value={thetaTex ? <Tex>{thetaTex}</Tex> : fmt(theta)} />
        <Readout label="θ (degrees)" value={`${fmt(deg, 2)}°`} />
        <Readout label="Reference angle" value={exact && piTex(ref) ? <Tex>{piTex(ref)!}</Tex> : fmt(ref)} />
        <Readout label="cos θ" value={<Val v={c} exact={exact} />} tone="var(--plot-1)" />
        <Readout label="sin θ" value={<Val v={s} exact={exact} />} tone="var(--plot-2)" />
        <Readout label="tan θ" value={<Val v={tn} exact={exact} />} tone="var(--plot-3)" />
      </ReadoutGrid>
      <Controls>
        <Slider
          label="θ"
          value={theta}
          min={0}
          max={TAU}
          step={Math.PI / 180}
          onChange={(v) => {
            setPlaying(false);
            setTheta(snapTo(norm(v), 1e-6));
          }}
          format={(v) => (isExact(v) ? piText(v) : `${fmt(v)} rad`)}
        />
        <div className="flex items-end gap-4 pb-1">
          <Toggle label="Show tan θ" checked={showTan} onChange={setShowTan} />
        </div>
      </Controls>
    </Frame>
  );
}
