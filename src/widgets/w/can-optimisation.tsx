/**
 * can-optimisation: the closed can of fixed volume V with least surface area. Drag the radius r;
 * the can is redrawn to scale (its height h = V/(πr²) follows from the constraint) and the point
 * moves along the objective S(r) = 2πr² + 2V/r, whose minimum is at r = (V/2π)^{1/3}, where h = 2r.
 *
 * Params:
 *   V      number   volume (cm³)                 default 1000
 *   r      number   starting radius (cm)         default 3
 *   rMax   number   largest radius on the slider default 14
 *   title, caption
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, str } from '../kit/params';
import { Plot, FnPath, Line, Rect, Segment, Dot, Label, Draggable } from '../kit/Plot';
import { Frame, Note, Readout, Slider } from '../kit/controls';
import { clamp } from '../kit/num';
import { sig } from '../kit/calc1-math';
import { Corner, ReadoutGrid } from '../kit/calc1-ui';

export default function CanOptimisation({ params }: WidgetProps) {
  const V = num(params, 'V', 1000);
  const rMax = num(params, 'rMax', 14);
  if (!(V > 0 && rMax > 0)) throw new Error('V and rMax should be positive');
  const rMin = rMax / 40;
  const [r, setR] = useState(clamp(num(params, 'r', 3), rMin, rMax));
  const S = useMemo(() => (x: number) => (x > 0 ? 2 * Math.PI * x * x + (2 * V) / x : NaN), [V]);
  const rStar = Math.cbrt(V / (2 * Math.PI));
  const h = V / (Math.PI * r * r);
  const dS = 4 * Math.PI * r - (2 * V) / (r * r);
  const Smin = S(rStar);
  const yTop = Smin * 3.2;

  // Side view of the can, to scale.
  const side = Math.max(2 * r, h) * 1.15;
  return (
    <Frame title={str(params, 'title', 'The cheapest can')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:items-center">
        <Plot view={[-side / 2, side / 2, -side * 0.08, side * 1.02]} equal aspect={1} minHeight={220} maxHeight={320} grid={false} axes={false} label="Side view of the can, to scale">
          <Rect x={-r} y={0} w={2 * r} h={h} fill="var(--plot-1)" opacity={0.25} color="var(--plot-1)" width={2} />
          <Segment x1={-r} y1={h} x2={r} y2={h} color="var(--plot-1)" width={3} />
          <Segment x1={-r} y1={0} x2={r} y2={0} color="var(--plot-1)" width={3} />
          <Segment x1={0} y1={h * 0.5} x2={r} y2={h * 0.5} color="var(--plot-4)" width={2} />
          <Label x={r / 2} y={h * 0.5} dy={-6} anchor="middle" color="var(--plot-4)" size={12} weight={600}>r = {sig(r, 3)}</Label>
          <Label x={r} y={h * 0.75} dx={6} color="var(--plot-2)" size={12} weight={600}>h = {sig(h, 3)}</Label>
          <Segment x1={r + side * 0.02} y1={0} x2={r + side * 0.02} y2={h} color="var(--plot-2)" width={2} />
        </Plot>
        <Plot view={[0, rMax, 0, yTop]} aspect={0.62} minHeight={210} maxHeight={320} xLabel="r" label="Surface area S(r) against the radius">
          <FnPath f={S} from={rMin} to={rMax} />
          <Segment x1={rStar} y1={0} x2={rStar} y2={Smin} color="var(--plot-3)" width={1.25} dash="3 4" />
          <Dot x={rStar} y={Smin} color="var(--plot-3)" r={4} hollow />
          {Number.isFinite(dS) && <Line x={r} y={S(r)} slope={dS} color="var(--plot-4)" width={1.5} dash="6 4" />}
          <Draggable x={r} y={S(r)} color="var(--plot-1)" label="Radius r on the graph of S" onChange={(x) => setR(clamp(x, rMin, rMax))} step={rMax / 200} />
          <Corner corner="tr">S(r) = 2πr² + 2V/r (cm²)</Corner>
        </Plot>
      </div>
      <ReadoutGrid>
        <Readout label="S(r) (cm²)" value={sig(S(r), 5)} tone="var(--plot-1)" />
        <Readout label="S′(r)" value={sig(dS, 4)} tone="var(--plot-4)" />
        <Readout label="h / r" value={sig(h / r, 4)} tone="var(--plot-2)" />
      </ReadoutGrid>
      <Slider label="r (cm)" value={r} min={rMin} max={rMax} step={(rMax - rMin) / 400} onChange={setR} format={(x) => sig(x, 3)} />
      <Note tone={Math.abs(r - rStar) < rMax / 200 ? 'good' : 'info'}>
        {Math.abs(r - rStar) < rMax / 200
          ? `At the minimum: r ≈ ${sig(rStar, 4)} cm, h = 2r, S ≈ ${sig(Smin, 4)} cm².`
          : dS < 0
            ? 'S′(r) < 0: a slightly wider can uses less metal. The can is too tall and thin.'
            : 'S′(r) > 0: a slightly narrower can uses less metal. The can is too flat.'}
      </Note>
    </Frame>
  );
}
