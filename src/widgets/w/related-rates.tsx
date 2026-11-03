/**
 * related-rates: two linked quantities changing in time, animated. Scenes
 *   cone    water poured at a constant rate dV/dt into a cone, point down (height H, top radius R):
 *           the depth h rises ever more slowly, dh/dt = (dV/dt) / (π r²) with r = (R/H) h
 *   ladder  a ladder of length ℓ whose foot slides out at a constant rate dx/dt: the top falls
 *           with dy/dt = −(x/y) dx/dt
 * A graph of the depth (or height) against time is traced with its tangent, whose slope is the
 * rate being computed.
 *
 * Params:
 *   scene   "cone" | "ladder"                                  default "cone"
 *   H, R    numbers  cone height and top radius (m)             default 6, 3
 *   rate    number   dV/dt (m³/min) or dx/dt (m/s)              default 2 (cone), 0.5 (ladder)
 *   length  number   ladder length (m)                          default 5
 *   x0      number   starting distance of the ladder's foot (m) default 1
 *   title, caption
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { num, oneOf, str } from '../kit/params';
import { Plot, FnPath, Line, Poly, Segment, Dot, Label } from '../kit/Plot';
import { Button, Frame, Readout, Slider } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { clamp } from '../kit/num';
import { sig } from '../kit/calc1-math';
import { Corner, ReadoutGrid } from '../kit/calc1-ui';

export default function RelatedRates({ params }: WidgetProps) {
  const scene = oneOf(params, 'scene', ['cone', 'ladder'] as const, 'cone');
  const H = num(params, 'H', 6);
  const R = num(params, 'R', 3);
  const len = num(params, 'length', 5);
  const x0 = num(params, 'x0', 1);
  const rate = num(params, 'rate', scene === 'cone' ? 2 : 0.5);
  if (!(H > 0 && R > 0 && len > 0 && rate > 0)) throw new Error('H, R, length and rate should be positive');

  // Time to fill (cone) or for the foot to reach the length (ladder, stopping just short).
  const Vfull = (Math.PI * R * R * H) / 3;
  const tEnd = scene === 'cone' ? Vfull / rate : (len * 0.995 - x0) / rate;
  const [t, setT] = useState(scene === 'cone' ? tEnd * 0.125 : tEnd * 0.4);
  const [playing, setPlaying] = useState(false);
  useAnimation(playing, (dt) =>
    setT((s) => {
      const n = s + (dt * tEnd) / 10;
      if (n >= tEnd) {
        setPlaying(false);
        return tEnd;
      }
      return n;
    }),
  );

  const k = R / H;
  // Cone: V = π k² h³ / 3.
  const hOf = (tt: number) => Math.cbrt((3 * rate * Math.max(0, tt)) / (Math.PI * k * k));
  const xOf = (tt: number) => x0 + rate * tt;
  const yOf = (tt: number) => Math.sqrt(Math.max(0, len * len - xOf(tt) ** 2));

  let picture;
  let graphF: (tt: number) => number;
  let slope: number;
  let readouts;
  let gTop: number;
  let gLabel: string;
  if (scene === 'cone') {
    const h = hOf(t);
    const r = k * h;
    const dh = h > 1e-9 ? rate / (Math.PI * r * r) : Infinity;
    graphF = hOf;
    slope = dh;
    gTop = H * 1.08;
    gLabel = 'depth h (m) against time (min)';
    picture = (
      <Plot view={[-R * 1.5, R * 1.5, -0.4, H * 1.12]} equal aspect={0.9} minHeight={230} maxHeight={340} grid={false} axes={false} label="A conical tank, point down, filling with water">
        <Poly points={[[-r, h], [0, 0], [r, h]]} closed fill="var(--plot-5)" fillOpacity={0.45} color="var(--plot-5)" width={1.5} />
        <Poly points={[[-R, H], [0, 0], [R, H]]} color="var(--color-ink-2)" width={2} />
        <Segment x1={-R} y1={H} x2={R} y2={H} color="var(--color-ink-3)" width={1} dash="3 4" />
        <Segment x1={R * 1.2} y1={0} x2={R * 1.2} y2={h} color="var(--plot-2)" width={2} />
        <Label x={R * 1.2} y={h / 2} dx={6} color="var(--plot-2)" size={12} weight={600}>h = {sig(h, 3)}</Label>
        <Segment x1={0} y1={h} x2={r} y2={h} color="var(--plot-4)" width={2} />
        <Label x={r / 2} y={h} dy={-6} anchor="middle" color="var(--plot-4)" size={12} weight={600}>r</Label>
        <Label x={0} y={H} dy={-7} anchor="middle" size={11} color="var(--color-ink-3)">top radius {sig(R, 3)} m, height {sig(H, 3)} m</Label>
      </Plot>
    );
    readouts = (
      <ReadoutGrid>
        <Readout label="V (m³)" value={sig(rate * t, 4)} />
        <Readout label="depth h (m)" value={sig(h, 4)} tone="var(--plot-2)" />
        <Readout label={`radius r = ${k === 0.5 ? 'h/2' : `${sig(k, 3)}h`}`} value={sig(r, 4)} tone="var(--plot-4)" />
        <Readout label="dV/dt (m³/min)" value={sig(rate, 3)} />
        <Readout label="dh/dt = (dV/dt)/(πr²)" value={Number.isFinite(dh) ? `${sig(dh, 4)} m/min` : '∞'} tone="var(--plot-3)" />
        <Readout label="t (min)" value={sig(t, 3)} />
      </ReadoutGrid>
    );
  } else {
    const x = xOf(t);
    const y = yOf(t);
    const dy = -(x / y) * rate;
    graphF = yOf;
    slope = dy;
    gTop = len * 1.08;
    gLabel = 'height of the top y (m) against time (s)';
    picture = (
      <Plot view={[-0.6, len * 1.1, -0.4, len * 1.1]} equal aspect={0.9} minHeight={230} maxHeight={340} grid={false} axes={false} label="A ladder sliding down a wall">
        <Segment x1={0} y1={0} x2={0} y2={len * 1.08} color="var(--color-ink-2)" width={3} />
        <Segment x1={0} y1={0} x2={len * 1.08} y2={0} color="var(--color-ink-2)" width={3} />
        <Segment x1={x} y1={0} x2={0} y2={y} color="var(--plot-4)" width={4} />
        <Dot x={x} y={0} color="var(--plot-1)" r={5} />
        <Dot x={0} y={y} color="var(--plot-2)" r={5} />
        <Label x={x / 2} y={0} dy={16} anchor="middle" color="var(--plot-1)" size={12} weight={600}>x = {sig(x, 3)}</Label>
        <Label x={0} y={y / 2} dx={8} color="var(--plot-2)" size={12} weight={600}>y = {sig(y, 3)}</Label>
        <Label x={x / 2} y={y / 2} dx={8} dy={-6} color="var(--plot-4)" size={12}>{sig(len, 3)} m</Label>
      </Plot>
    );
    readouts = (
      <ReadoutGrid>
        <Readout label="foot x (m)" value={sig(x, 4)} tone="var(--plot-1)" />
        <Readout label="top y (m)" value={sig(y, 4)} tone="var(--plot-2)" />
        <Readout label="t (s)" value={sig(t, 3)} />
        <Readout label="dx/dt (m/s)" value={sig(rate, 3)} tone="var(--plot-1)" />
        <Readout label="dy/dt = −(x/y)·dx/dt" value={`${sig(dy, 4)} m/s`} tone="var(--plot-3)" />
        <Readout label="x² + y²" value={sig(x * x + y * y, 5)} />
      </ReadoutGrid>
    );
  }
  const gy = graphF(t);
  const graph = (
    <Plot view={[0, tEnd, scene === 'cone' ? -0.3 : -0.3, gTop]} aspect={0.62} minHeight={200} maxHeight={320} label={`Graph of ${gLabel}`}>
      <FnPath f={graphF} from={0} to={tEnd} color="var(--plot-2)" width={1.5} opacity={0.35} />
      <FnPath f={graphF} from={0} to={Math.max(t, 1e-9)} color="var(--plot-2)" />
      {Number.isFinite(slope) && <Line x={t} y={gy} slope={slope} color="var(--plot-3)" width={1.5} dash="6 4" />}
      <Dot x={t} y={gy} color="var(--plot-2)" r={5} />
      <Corner corner="tr">{gLabel}</Corner>
    </Plot>
  );

  return (
    <Frame
      title={str(params, 'title', scene === 'cone' ? 'Filling a conical tank' : 'A sliding ladder')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button onClick={() => { if (!playing && t >= tEnd) setT(0); setPlaying((p) => !p); }}>{playing ? 'Pause' : 'Play'}</Button>
          <Button onClick={() => { setPlaying(false); setT(0); }}>Reset</Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 sm:items-center">
        {picture}
        {graph}
      </div>
      {readouts}
      <Slider label="t" value={t} min={0} max={tEnd} step={tEnd / 400} onChange={(v) => { setPlaying(false); setT(clamp(v, 0, tEnd)); }} format={(v) => sig(v, 3)} />
    </Frame>
  );
}
