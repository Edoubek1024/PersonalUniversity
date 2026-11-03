/**
 * conic-sections: the focus-directrix definition. Focus F at the origin, directrix x = d, and
 * the curve of points P with |PF| = e * (distance from P to the directrix), which in polar form
 * is r = e d / (1 + e cos(theta)). An eccentricity slider moves through ellipse, parabola and
 * hyperbola; a draggable point P on the curve shows both distances and their ratio. Optionally
 * the second focus with the sum (ellipse) or difference (hyperbola) of focal distances, 2a.
 *
 * Params:
 *   e        number    initial eccentricity                           default 0.6
 *   d        number    distance from the focus to the directrix       default 2
 *   eMax     number    largest eccentricity on the slider             default 2
 *   theta    number | string   initial polar angle of P               default "2*pi/3"
 *   second   boolean   show the second focus and 2a at the start      default false
 *   view     [xMin, xMax, yMin, yMax]                                 default [-7, 6.5, -4.5, 4.5]
 *   title, caption   strings
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str, view as readView } from '../kit/params';
import { Dot, Draggable, Label, Line, ParamPath, Plot, Segment } from '../kit/Plot';
import { Controls, Frame, Readout, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { numExpr } from '../kit/calc2-num';
import { Legend, ReadoutGrid } from '../kit/calc2-ui';

export default function ConicSections({ params }: WidgetProps) {
  const v = readView(params, 'view', [-7, 6.5, -4.5, 4.5]);
  const eMax = Math.max(1.2, num(params, 'eMax', 2));
  const [e, setE] = useState(() => clamp(num(params, 'e', 0.6), 0.05, eMax));
  const [d, setD] = useState(() => num(params, 'd', 2));
  const [theta, setTheta] = useState(() => numExpr(params, 'theta', (2 * Math.PI) / 3));
  const [second, setSecond] = useState(() => bool(params, 'second', false));

  const r = (t: number) => (e * d) / (1 + e * Math.cos(t));
  const P = (t: number): [number, number] => {
    const rr = r(t);
    return [rr * Math.cos(t), rr * Math.sin(t)];
  };
  const kind = Math.abs(e - 1) < 0.005 ? 'parabola' : e < 1 ? 'ellipse' : 'hyperbola';
  const [px, py] = P(theta);
  const pf = Math.hypot(px, py);
  const pd = Math.abs(d - px);

  // Centre, semi-axis a and focal distance c (measured from F) for e != 1.
  const a = kind === 'parabola' ? NaN : (e * d) / Math.abs(1 - e * e);
  const c = a * e;
  const b = kind === 'ellipse' ? Math.sqrt(a * a - c * c) : kind === 'hyperbola' ? Math.sqrt(c * c - a * a) : NaN;
  const centreX = kind === 'ellipse' ? -c : c;
  const F2: [number, number] = [2 * centreX, 0];
  const pf2 = Math.hypot(px - F2[0], py);

  // Angles where 1 + e cos(theta) > 0 (the branch with r > 0); for e > 1 the other branch has r < 0.
  const lim = e > 1 ? Math.acos(-1 / e) - 1e-3 : Math.PI;
  const span = Math.max(v[1] - v[0], v[3] - v[2]);
  const finite = (t: number) => {
    const rr = r(t);
    return rr > 0 && rr < span * 4;
  };

  /** Pointer to the nearest point of the curve: try the angle of the pointer, and for a hyperbola the far branch. */
  const nearestTheta = (x: number, y: number): number => {
    const phi = Math.atan2(y, x);
    const cands: number[] = [];
    if (r(phi) > 0) cands.push(phi);
    const alt = phi + Math.PI;
    if (e > 1 && r(alt) < 0) cands.push(alt);
    let best = theta;
    let bd = Infinity;
    for (const t of cands) {
      const [qx, qy] = P(t);
      const dd = Math.hypot(qx - x, qy - y);
      if (Number.isFinite(dd) && dd < bd) {
        bd = dd;
        best = t;
      }
    }
    return best;
  };

  const setFromPoint = (x: number, y: number) => setTheta(normalise(nearestTheta(x, y)));

  // Branches to draw.
  const nearBranch = <ParamPath x={(t) => (finite(t) ? P(t)[0] : NaN)} y={(t) => (finite(t) ? P(t)[1] : NaN)} t0={-lim} t1={lim} samples={700} color="var(--plot-1)" width={2.5} />;
  const farBranch =
    e > 1 ? (
      <ParamPath
        x={(t) => {
          const rr = r(t);
          return rr < 0 && -rr < span * 4 ? rr * Math.cos(t) : NaN;
        }}
        y={(t) => {
          const rr = r(t);
          return rr < 0 && -rr < span * 4 ? rr * Math.sin(t) : NaN;
        }}
        t0={lim + 2e-3}
        t1={2 * Math.PI - lim - 2e-3}
        samples={700}
        color="var(--plot-1)"
        width={2.5}
      />
    ) : null;
  const onCurve = Number.isFinite(px) && Number.isFinite(py) && Math.abs(px) < span * 4;

  return (
    <Frame title={str(params, 'title', 'Focus and directrix')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} equal label={`Conic with eccentricity ${fmt(e)}: a ${kind}`}>
        <Line x={d} y={0} slope={Infinity} color="var(--plot-4)" width={2} />
        <Label x={d} y={v[3]} dx={6} dy={16} color="var(--plot-4)">
          directrix
        </Label>
        {kind === 'hyperbola' && second && (
          <>
            <Line x={centreX} y={0} slope={b / a} color="var(--plot-axis)" dash="4 4" width={1.25} />
            <Line x={centreX} y={0} slope={-b / a} color="var(--plot-axis)" dash="4 4" width={1.25} />
          </>
        )}
        {nearBranch}
        {farBranch}
        {onCurve && (
          <>
            <Segment x1={px} y1={py} x2={0} y2={0} color="var(--plot-2)" width={2.25} />
            <Segment x1={px} y1={py} x2={d} y2={py} color="var(--plot-4)" width={2.25} dash="6 4" />
            {second && kind !== 'parabola' && <Segment x1={px} y1={py} x2={F2[0]} y2={F2[1]} color="var(--plot-5)" width={2} />}
          </>
        )}
        <Dot x={0} y={0} r={5} color="var(--plot-2)" />
        <Label x={0} y={0} dx={6} dy={16} color="var(--plot-2)">
          F
        </Label>
        {second && kind !== 'parabola' && (
          <>
            <Dot x={F2[0]} y={F2[1]} r={5} color="var(--plot-5)" />
            <Label x={F2[0]} y={F2[1]} dx={6} dy={16} color="var(--plot-5)">
              F′
            </Label>
          </>
        )}
        {onCurve && (
          <>
            <Draggable x={px} y={py} onChange={setFromPoint} label="Point P on the conic" color="var(--plot-2)" />
            <Label x={px} y={py} dx={10} dy={-10} weight={600}>
              P
            </Label>
          </>
        )}
      </Plot>
      <Legend
        items={[
          { color: 'var(--plot-2)', label: '|PF|' },
          { color: 'var(--plot-4)', label: '|PD|\\text{ (to the directrix)}', dash: true },
          ...(second && kind !== 'parabola' ? [{ color: 'var(--plot-5)', label: "|PF'|" }] : []),
        ]}
      />
      <Controls>
        <Slider label={<Tex>{'\\text{Eccentricity } e'}</Tex>} value={e} min={0.05} max={eMax} step={0.01} onChange={(x) => {
            const ne = Math.abs(x - 1) < 0.006 ? 1 : x;
            setE(ne);
            // Keep P on screen: if the new curve carries it out of view, move it to a visible angle.
            const inView = (t: number) => {
              const rr = (ne * d) / (1 + ne * Math.cos(t));
              const qx = rr * Math.cos(t);
              const qy = rr * Math.sin(t);
              return Number.isFinite(rr) && qx > v[0] && qx < v[1] && qy > v[2] && qy < v[3];
            };
            if (!inView(theta)) setTheta([(2 * Math.PI) / 3, Math.PI / 2, Math.PI / 3, 0].find(inView) ?? 0);
          }} />
        <Slider label={<Tex>{'\\text{Directrix distance } d'}</Tex>} value={d} min={0.5} max={4} step={0.05} onChange={setD} />
        <Slider label={<Tex>{'\\text{Angle of } P,\\ \\theta'}</Tex>} value={theta} min={-Math.PI} max={Math.PI} step={Math.PI / 180} onChange={setTheta} format={(t) => `${Math.round((t * 180) / Math.PI)}°`} />
        <div className="flex items-end">
          <Toggle label="Second focus and 2a" checked={second} onChange={setSecond} />
        </div>
      </Controls>
      <ReadoutGrid>
        <Readout label="Curve" value={kind} />
        <Readout label="|PF|" value={onCurve ? fmt(pf, 4) : '—'} tone="var(--plot-2)" />
        <Readout label="|PD|" value={onCurve ? fmt(pd, 4) : '—'} tone="var(--plot-4)" />
        <Readout label="Ratio |PF| / |PD|" value={onCurve ? fmt(pf / pd, 4) : '—'} />
        {kind !== 'parabola' ? (
          <>
            <Readout label="c / a" value={fmt(c / a, 4)} />
            <Readout label="a, b, c" value={`${fmt(a, 2)}, ${fmt(b, 2)}, ${fmt(c, 2)}`} />
            {second && (
              <Readout
                label={kind === 'ellipse' ? "|PF| + |PF′|, and 2a" : "||PF| − |PF′||, and 2a"}
                value={onCurve ? `${fmt(kind === 'ellipse' ? pf + pf2 : Math.abs(pf - pf2), 4)}, ${fmt(2 * a, 4)}` : '—'}
                tone="var(--plot-5)"
              />
            )}
          </>
        ) : (
          <>
            <Readout label="Vertex" value={`(${fmt(d / 2, 3)}, 0)`} />
            <Readout label="Focus to vertex p" value={fmt(d / 2, 3)} />
          </>
        )}
      </ReadoutGrid>
    </Frame>
  );
}

function normalise(t: number): number {
  let x = t;
  while (x > Math.PI) x -= 2 * Math.PI;
  while (x < -Math.PI) x += 2 * Math.PI;
  return x;
}
