/**
 * rel-boost-composition: composing two Lorentz boosts by multiplying their matrices (c = 1,
 * passive boosts, ct' = gamma (ct - beta x)).
 *
 *   collinear  two boosts along x. The 4-velocities of S, S' and S'' sit on the unit hyperbola
 *              (ct)^2 - x^2 = 1 at hyperbolic angles 0, phi1 and phi1 + phi2: rapidities add,
 *              speeds do not. The product matrix, its beta = (beta1 + beta2)/(1 + beta1 beta2)
 *              and the Galilean sum (which can exceed 1) are read out; the two orders agree.
 *   angle      the first boost along x, the second at angle alpha measured in the intermediate
 *              frame (alpha = 90 degrees: perpendicular). Both orders give the same final speed
 *              but different directions: the product is a boost times a rotation by the Wigner
 *              angle, found by splitting L = R B(w). The velocity plane shows both composite
 *              velocities inside the light-speed circle.
 *
 * Params:
 *   mode     "collinear" | "angle"        initial mode                      default "collinear"
 *   modes    string[]   modes offered as buttons                            default ["collinear", "angle"]
 *   beta1    number     first boost, |beta1| < 1                            default 0.6
 *   beta2    number     second boost, |beta2| < 1 (>= 0 in angle mode)      default 0.6
 *   alpha    number     angle of the second boost in degrees (angle mode)   default 90
 *   galilean boolean    show the Galilean sum in collinear mode             default true
 *   title    string                                                         default "Composing boosts"
 *   caption  string     may contain $TeX$
 */
import { useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Arrow, Dot, Label, Line, ParamPath, Plot, Segment } from '../kit/Plot';
import { Controls, Frame, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { fmt } from '../kit/num';
import { texMatrix } from '../kit/la-ui';
import { addBeta, boost3, gammaOf, mul3, polar3 } from '../kit/rel-core';
import { Key, ReadGrid, relCaption } from '../kit/rel-ui';

const MODES = ['collinear', 'angle'] as const;
type Mode = (typeof MODES)[number];
const DEG = Math.PI / 180;
const T = ({ children }: { children: string }) => <Tex>{children}</Tex>;

function Collinear({ b1, b2, galilean }: { b1: number; b2: number; galilean: boolean }) {
  const p1 = Math.atanh(b1);
  const p2 = Math.atanh(b2);
  const p = p1 + p2;
  const b = addBeta(b1, b2);
  const g = gammaOf(b);
  const g1 = gammaOf(b1);
  const g2 = gammaOf(b2);
  const L1 = [[g1, -g1 * b1], [-g1 * b1, g1]];
  const L2 = [[g2, -g2 * b2], [-g2 * b2, g2]];
  const P = [[g, -g * b], [-g * b, g]];
  const gal = b1 + b2;
  const hyp = (a: number): [number, number] => [Math.sinh(a), Math.cosh(a)];
  const [x1, y1] = hyp(p1);
  const [x2, y2] = hyp(p);
  const span = Math.max(2.2, Math.abs(x2) * 1.15 + 0.3, Math.abs(x1) * 1.15 + 0.3);
  const yTop = Math.max(Math.cosh(Math.max(Math.abs(p), Math.abs(p1))) * 1.1, 2.4);
  const tMax = Math.asinh(span * 1.5);
  return (
    <>
      <Plot view={[-span, span, 0, yTop]} equal aspect={0.7} maxHeight={420} xLabel="x" yLabel="ct" label="Four-velocities on the unit hyperbola">
        <Line x={0} y={0} slope={1} color="var(--plot-4)" width={1.5} />
        <Line x={0} y={0} slope={-1} color="var(--plot-4)" width={1.5} />
        <ParamPath x={(t) => Math.sinh(t)} y={(t) => Math.cosh(t)} t0={-tMax} t1={tMax} color="var(--plot-6)" width={1.5} />
        <ParamPath x={(t) => Math.sinh(t)} y={(t) => Math.cosh(t)} t0={0} t1={p1} samples={80} color="var(--plot-2)" width={5} opacity={0.85} />
        <ParamPath x={(t) => Math.sinh(t)} y={(t) => Math.cosh(t)} t0={p1} t1={p} samples={80} color="var(--plot-3)" width={5} opacity={0.85} />
        <Segment x1={0} y1={0} x2={0} y2={1} color="var(--plot-axis)" width={2} />
        <Segment x1={0} y1={0} x2={x1} y2={y1} color="var(--plot-2)" width={2} />
        <Segment x1={0} y1={0} x2={x2} y2={y2} color="var(--plot-1)" width={2.5} />
        {galilean && Math.abs(gal) > 1e-6 && <Line x={0} y={0} slope={1 / gal} color="var(--plot-5)" width={1.75} dash="6 4" />}
        <Dot x={0} y={1} r={4} color="var(--plot-axis)" />
        <Dot x={x1} y={y1} r={5} color="var(--plot-2)" />
        <Dot x={x2} y={y2} r={6} color="var(--plot-1)" />
        <Label x={0} y={1} dx={p1 >= 0 ? -8 : 8} dy={-10} anchor={p1 >= 0 ? 'end' : 'start'} size={12} weight={600}>
          S
        </Label>
        <Label x={x1} y={y1} dx={x1 >= 0 ? 8 : -8} dy={4} anchor={x1 >= 0 ? 'start' : 'end'} color="var(--plot-2)" size={12} weight={600}>
          S′
        </Label>
        <Label x={x2} y={y2} dx={x2 >= 0 ? 8 : -8} dy={4} anchor={x2 >= 0 ? 'start' : 'end'} color="var(--plot-1)" size={12} weight={600}>
          S″
        </Label>
      </Plot>
      <Key
        items={[
          { color: 'var(--plot-6)', label: 'unit hyperbola (ct)² − x² = 1' },
          { color: 'var(--plot-2)', label: 'hyperbolic angle φ₁ (rapidity)' },
          { color: 'var(--plot-3)', label: 'φ₂, added on' },
          { color: 'var(--plot-1)', label: 'worldline of S″' },
          ...(galilean ? [{ color: 'var(--plot-5)', label: 'Galilean sum β₁ + β₂', dash: true }] : []),
          { color: 'var(--plot-4)', label: 'light' },
        ]}
      />
      <div className="overflow-x-auto text-sm">
        <T>{`\\Lambda(\\beta_2)\\,\\Lambda(\\beta_1) = ${texMatrix(L2, 'p', 3)}${texMatrix(L1, 'p', 3)} = ${texMatrix(P, 'p', 4)}`}</T>
      </div>
      <ReadGrid cols={3}>
        <Readout label={<T>{'\\phi_1 + \\phi_2'}</T>} value={`${fmt(p1, 4)} + ${fmt(p2, 4)} = ${fmt(p, 4)}`} />
        <Readout label={<T>{'\\beta = \\tanh(\\phi_1+\\phi_2)'}</T>} tone="var(--plot-1)" value={fmt(b, 5)} />
        <Readout label={<T>{'(\\beta_1+\\beta_2)/(1+\\beta_1\\beta_2)'}</T>} value={fmt(b, 5)} />
        <Readout label={<T>{'\\gamma = \\gamma_1\\gamma_2(1+\\beta_1\\beta_2)'}</T>} value={fmt(g1 * g2 * (1 + b1 * b2), 5)} />
        <Readout label="Galilean β₁ + β₂" tone="var(--plot-5)" value={`${fmt(gal, 4)}${Math.abs(gal) >= 1 ? ' (faster than light!)' : ''}`} />
        <Readout label="Λ(β₁)Λ(β₂) − Λ(β₂)Λ(β₁)" value="0 (collinear boosts commute)" />
      </ReadGrid>
    </>
  );
}

function Angled({ b1, b2, alphaDeg }: { b1: number; b2: number; alphaDeg: number }) {
  const a = alphaDeg * DEG;
  const B1 = boost3(b1, 0);
  const B2 = boost3(b2 * Math.cos(a), b2 * Math.sin(a));
  const L12 = mul3(B2, B1); // first along x, then at alpha in S'
  const L21 = mul3(B1, B2); // first at alpha, then along x in the new frame
  const d12 = polar3(L12);
  const d21 = polar3(L21);
  const s12 = Math.hypot(...d12.w);
  const s21 = Math.hypot(...d21.w);
  const dir12 = Math.atan2(d12.w[1], d12.w[0]);
  const dir21 = Math.atan2(d21.w[1], d21.w[0]);
  let between = dir21 - dir12;
  while (between > Math.PI) between -= 2 * Math.PI;
  while (between < -Math.PI) between += 2 * Math.PI;
  const g1 = gammaOf(b1);
  const g2 = gammaOf(b2);
  const perp = Math.abs(alphaDeg - 90) < 1e-9;
  const formula = Math.acos(Math.min(1, (g1 + g2) / (1 + g1 * g2)));
  const sortedArc = [Math.min(dir12, dir12 + between), Math.max(dir12, dir12 + between)];
  return (
    <>
      <Plot view={[-1.15, 1.15, -1.15, 1.15]} equal aspect={0.75} maxHeight={420} xLabel="βx" yLabel="βy" xStep={0.5} yStep={0.5} label="Velocity plane with the two composite velocities">
        <ParamPath x={(t) => Math.cos(t)} y={(t) => Math.sin(t)} t0={0} t1={2 * Math.PI} color="var(--plot-4)" width={1.75} />
        <Arrow x1={0} y1={0} x2={b1} y2={0} color="var(--plot-2)" width={2} />
        <Arrow x1={0} y1={0} x2={b2 * Math.cos(a)} y2={b2 * Math.sin(a)} color="var(--plot-5)" width={2} dash="5 4" />
        <Arrow x1={0} y1={0} x2={d12.w[0]} y2={d12.w[1]} color="var(--plot-1)" width={2.75} />
        <Arrow x1={0} y1={0} x2={d21.w[0]} y2={d21.w[1]} color="var(--plot-3)" width={2.75} />
        {Math.abs(between) > 1e-4 && (
          <ParamPath x={(t) => 0.92 * s12 * Math.cos(t)} y={(t) => 0.92 * s12 * Math.sin(t)} t0={sortedArc[0]} t1={sortedArc[1]} samples={60} color="var(--plot-text)" width={1.5} />
        )}
        <Label x={d12.w[0]} y={d12.w[1]} dx={8} dy={14} color="var(--plot-1)" size={12} weight={600}>
          w (x first)
        </Label>
        <Label x={d21.w[0]} y={d21.w[1]} dx={-6} dy={-8} anchor="end" color="var(--plot-3)" size={12} weight={600}>
          w′ (other order)
        </Label>
      </Plot>
      <Key
        items={[
          { color: 'var(--plot-2)', label: 'boost 1 along x' },
          { color: 'var(--plot-5)', label: 'boost 2 at angle α', dash: true },
          { color: 'var(--plot-1)', label: 'composite, boost 1 first' },
          { color: 'var(--plot-3)', label: 'composite, boost 2 first' },
          { color: 'var(--plot-4)', label: '|β| = 1' },
        ]}
      />
      <div className="space-y-1 overflow-x-auto text-sm">
        <div>
          <T>{`B_2B_1 = ${texMatrix(L12, 'p', 3)}`}</T>
        </div>
        <div>
          <T>{`B_1B_2 = ${texMatrix(L21, 'p', 3)}`}</T>
        </div>
      </div>
      <ReadGrid cols={3}>
        <Readout label="Final speed, boost 1 first" tone="var(--plot-1)" value={`${fmt(s12, 5)} at ${fmt(dir12 / DEG, 4)}°`} />
        <Readout label="Final speed, boost 2 first" tone="var(--plot-3)" value={`${fmt(s21, 5)} at ${fmt(dir21 / DEG, 4)}°`} />
        <Readout label="Angle between the two" value={`${fmt(Math.abs(between) / DEG, 4)}°`} />
        <Readout label="Wigner rotation in L = R B(w)" value={`${fmt(Math.abs(d12.angle) / DEG, 4)}° (check ${fmt(Math.max(d12.residual, d21.residual), 2)})`} />
        <Readout label={<T>{'\\cos\\theta_W = \\frac{\\gamma_1+\\gamma_2}{1+\\gamma_1\\gamma_2}'}</T>} value={perp ? `${fmt(formula / DEG, 4)}° (perpendicular case)` : 'formula holds at α = 90° only'} />
        <Readout label="Do the two orders agree?" value={Math.abs(between) < 1e-6 ? 'yes' : 'no: they differ by a rotation'} />
      </ReadGrid>
    </>
  );
}

export default function RelBoostComposition({ params }: WidgetProps) {
  const initial = oneOf(params, 'mode', MODES, 'collinear');
  const offered = strArray(params, 'modes', ['collinear', 'angle']);
  for (const o of offered) if (!(MODES as readonly string[]).includes(o)) throw new Error(`parameter "modes" has unknown mode "${o}" (use collinear, angle)`);
  const b10 = num(params, 'beta1', 0.6);
  const b20 = num(params, 'beta2', 0.6);
  if (!(Math.abs(b10) < 1 && Math.abs(b20) < 1)) throw new Error('parameters "beta1" and "beta2" must satisfy |beta| < 1');
  const alpha0 = num(params, 'alpha', 90);
  const [mode, setMode] = useState<Mode>(initial);
  const [b1, setB1] = useState(b10);
  const [b2, setB2] = useState(b20);
  const [alpha, setAlpha] = useState(alpha0);
  const [gal, setGal] = useState(bool(params, 'galilean', true));
  const lo = mode === 'angle' ? 0 : -0.95;
  const B1 = Math.max(lo, b1);
  const B2 = Math.max(lo, b2);
  return (
    <Frame title={str(params, 'title', 'Composing boosts')} caption={relCaption(params)}>
      {offered.length > 1 && (
        <Segmented
          options={offered.map((o) => ({ value: o as Mode, label: o === 'collinear' ? 'Collinear boosts' : 'Boosts at an angle' }))}
          value={mode}
          onChange={setMode}
        />
      )}
      {mode === 'collinear' ? <Collinear b1={B1} b2={B2} galilean={gal} /> : <Angled b1={B1} b2={B2} alphaDeg={alpha} />}
      <Controls cols={mode === 'angle' ? 3 : 2}>
        <Slider label={<T>{'\\beta_1'}</T>} value={B1} min={lo} max={0.95} step={0.01} onChange={setB1} format={(v) => fmt(v, 2)} />
        <Slider label={<T>{'\\beta_2'}</T>} value={B2} min={lo} max={0.95} step={0.01} onChange={setB2} format={(v) => fmt(v, 2)} />
        {mode === 'angle' && <Slider label={<T>{'\\alpha\\ (\\text{degrees})'}</T>} value={alpha} min={0} max={180} step={1} onChange={setAlpha} format={(v) => `${fmt(v, 3)}°`} />}
      </Controls>
      {mode === 'collinear' && <Toggle label="show the Galilean sum" checked={gal} onChange={setGal} />}
    </Frame>
  );
}
