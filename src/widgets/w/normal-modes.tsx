/**
 * normal-modes: two masses between two walls joined by three springs, M u'' + K u = 0. The
 * natural frequencies and mode shapes come from K v = omega^2 M v; the motion from rest at u(0)
 * is the superposition of the two modes. Animated (Play / Pause / Reset), with the graphs of
 * u1(t) and u2(t), buttons that start the system in a pure mode, and a slider for the middle
 * spring so you can make the frequencies close and see beats.
 *
 * Params:
 *   m      [m1, m2] masses                       default [1, 1]
 *   k      [k_left, k_middle, k_right] stiffness  default [1, 1, 1]
 *   u0     [u1, u2] initial displacements (released from rest) default [1, 0]
 *   tMax   length of the time axis               default 40
 *   title, caption
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { num as readNum, numArray, str } from '../kit/params';
import { FnPath, Label, Plot, Poly, Rect, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider } from '../kit/controls';
import { useAnimation } from '../kit/hooks';
import { clamp, fmt } from '../kit/num';
import { symEig2 } from '../kit/la-core';
import { niceDir } from '../kit/la-ui';

function MR({ label, value, tone }: { label: ReactNode; value: ReactNode; tone?: string }) {
  return <Readout label={<span className="normal-case tracking-normal">{label}</span>} value={value} tone={tone} />;
}

function zigzag(x0: number, x1: number, y: number, n = 8, h = 0.12): [number, number][] {
  const pts: [number, number][] = [[x0, y]];
  const a = x0 + (x1 - x0) * 0.12;
  const b = x1 - (x1 - x0) * 0.12;
  pts.push([a, y]);
  for (let i = 1; i < 2 * n; i++) pts.push([a + ((b - a) * i) / (2 * n), y + (i % 2 ? h : -h)]);
  pts.push([b, y], [x1, y]);
  return pts;
}

export default function NormalModes({ params }: WidgetProps) {
  const m = numArray(params, 'm', [1, 1]);
  const k0 = numArray(params, 'k', [1, 1, 1]);
  const u00 = numArray(params, 'u0', [1, 0]);
  if (m.length !== 2 || k0.length !== 3 || u00.length !== 2 || m.some((x) => x <= 0) || k0.some((x) => x < 0)) throw new Error('need m = [m1, m2] > 0, k = [k1, k2, k3] >= 0 and u0 = [u1, u2]');
  const tMax = readNum(params, 'tMax', 40);

  const [kMid, setKMid] = useState(k0[1]);
  const [u0, setU0] = useState<[number, number]>([u00[0], u00[1]]);
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  useAnimation(running, (dt) => {
    const nt = t + dt * 1.5;
    if (nt >= tMax) {
      setT(tMax);
      setRunning(false);
    } else setT(nt);
  });

  const K = [
    [k0[0] + kMid, -kMid],
    [-kMid, kMid + k0[2]],
  ];
  // Symmetric form: M^-1/2 K M^-1/2 w = omega^2 w, v = M^-1/2 w.
  const s = [1 / Math.sqrt(m[0]), 1 / Math.sqrt(m[1])];
  const modes = useMemo(() => {
    const { values, vectors } = symEig2(K[0][0] * s[0] * s[0], K[0][1] * s[0] * s[1], K[1][1] * s[1] * s[1]);
    // ascending frequency: index 0 = lowest
    const order = [1, 0];
    return order.map((i) => {
      const w = vectors[i];
      let v: [number, number] = [w[0] * s[0], w[1] * s[1]];
      const big = Math.abs(v[0]) >= Math.abs(v[1]) ? v[0] : v[1];
      v = [v[0] / big, v[1] / big];
      return { w2: Math.max(0, values[i]), v };
    });
  }, [K[0][0], K[0][1], K[1][1], s[0], s[1]]); // eslint-disable-line react-hooks/exhaustive-deps
  const [V1, V2] = [modes[0].v, modes[1].v];
  const det = V1[0] * V2[1] - V2[0] * V1[1];
  const a1 = (u0[0] * V2[1] - V2[0] * u0[1]) / det;
  const a2 = (V1[0] * u0[1] - u0[0] * V1[1]) / det;
  const om = modes.map((md) => Math.sqrt(md.w2));
  const u = (tt: number): [number, number] => {
    const c1 = a1 * Math.cos(om[0] * tt);
    const c2 = a2 * Math.cos(om[1] * tt);
    return [c1 * V1[0] + c2 * V2[0], c1 * V1[1] + c2 * V2[1]];
  };
  const ut = u(t);
  const L = 3;
  const eq = [1, 2];
  const amp = 0.28;
  const x1 = eq[0] + amp * ut[0];
  const x2 = eq[1] + amp * ut[1];
  const box = 0.22;
  const start = (v: [number, number]) => {
    setU0(v);
    setT(0);
    setRunning(true);
  };
  const scaleU = Math.max(1, Math.abs(a1) + Math.abs(a2));

  return (
    <Frame title={str(params, 'title', 'Two masses, three springs')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={[-0.1, L + 0.1, -0.45, 0.45]} grid={false} axes={false} aspect={0.22} minHeight={110} maxHeight={150} label="The two masses and three springs">
        <Rect x={-0.1} y={-0.4} w={0.1} h={0.8} fill="var(--plot-axis)" opacity={0.5} />
        <Rect x={L} y={-0.4} w={0.1} h={0.8} fill="var(--plot-axis)" opacity={0.5} />
        <Segment x1={0} y1={-0.2} x2={L} y2={-0.2} color="var(--plot-grid)" width={1} />
        <Poly points={zigzag(0, x1 - box / 2, 0)} color="var(--plot-text)" width={1.5} />
        <Poly points={zigzag(x1 + box / 2, x2 - box / 2, 0, 8, 0.06 + 0.06 * clamp(kMid / Math.max(k0[1], 0.01), 0.2, 2))} color="var(--plot-4)" width={1.5} />
        <Poly points={zigzag(x2 + box / 2, L, 0)} color="var(--plot-text)" width={1.5} />
        <Rect x={x1 - box / 2} y={-0.15} w={box} h={0.3} fill="var(--plot-1)" opacity={0.85} color="var(--plot-1)" />
        <Rect x={x2 - box / 2} y={-0.15} w={box} h={0.3} fill="var(--plot-3)" opacity={0.85} color="var(--plot-3)" />
        <Label x={x1} y={0.15} dy={-6} anchor="middle" size={12} weight={600} color="var(--plot-1)">
          m₁
        </Label>
        <Label x={x2} y={0.15} dy={-6} anchor="middle" size={12} weight={600} color="var(--plot-3)">
          m₂
        </Label>
        {eq.map((e) => (
          <Segment key={e} x1={e} y1={-0.32} x2={e} y2={-0.22} color="var(--plot-axis)" width={1.5} />
        ))}
      </Plot>
      <Plot view={[0, tMax, -scaleU * 1.15, scaleU * 1.15]} aspect={0.32} minHeight={150} maxHeight={210} xLabel="t" label="Displacements of the two masses against time">
        <FnPath f={(tt) => u(tt)[0]} color="var(--plot-1)" width={2} samples={800} />
        <FnPath f={(tt) => u(tt)[1]} color="var(--plot-3)" width={2} samples={800} />
        <Segment x1={t} y1={-scaleU * 1.15} x2={t} y2={scaleU * 1.15} color="var(--plot-2)" width={1.5} dash="4 3" />
      </Plot>
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded" style={{ background: 'var(--plot-1)' }} /> u₁(t)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded" style={{ background: 'var(--plot-3)' }} /> u₂(t)
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button primary onClick={() => (t >= tMax ? (setT(0), setRunning(true)) : setRunning((r) => !r))}>
          {running ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={() => (setRunning(false), setT(0))}>Reset</Button>
        <Button onClick={() => start([1, 0])}>Pull m₁ only</Button>
        <Button onClick={() => start([V1[0], V1[1]])}>Start in mode 1</Button>
        <Button onClick={() => start([V2[0], V2[1]])}>Start in mode 2</Button>
      </div>
      <Controls cols={2}>
        <Slider label="Time t" value={t} min={0} max={tMax} step={tMax / 400} onChange={(v) => (setRunning(false), setT(v))} />
        <Slider label="Middle spring stiffness" value={kMid} min={0} max={Math.max(3, k0[1] * 3)} step={0.01} onChange={setKMid} />
        <Slider label="u₁(0)" value={u0[0]} min={-1} max={1} step={0.05} onChange={(v) => (setU0([v, u0[1]]), setT(0))} />
        <Slider label="u₂(0)" value={u0[1]} min={-1} max={1} step={0.05} onChange={(v) => (setU0([u0[0], v]), setT(0))} />
      </Controls>
      <Controls cols={3}>
        <MR label="ω₁, mode v₁" value={`${fmt(om[0], 4)},  (${niceDir(V1).map((x) => fmt(x, 3)).join(', ')})`} />
        <MR label="ω₂, mode v₂" value={`${fmt(om[1], 4)},  (${niceDir(V2).map((x) => fmt(x, 3)).join(', ')})`} />
        <MR label="u(0) = a₁v₁ + a₂v₂" value={`a₁ = ${fmt(a1, 3)}, a₂ = ${fmt(a2, 3)}`} />
      </Controls>
      <Note>
        u(t) = a₁cos(ω₁t)v₁ + a₂cos(ω₂t)v₂. ω₂/ω₁ = {fmt(om[1] / om[0], 4)}
        {om[1] - om[0] < 0.25 * om[0] ? `: the frequencies are close, so energy sloshes between the masses (beats, period 2π/(ω₂ − ω₁) ≈ ${fmt((2 * Math.PI) / Math.max(1e-9, om[1] - om[0]), 3)}).` : '.'}
      </Note>
    </Frame>
  );
}
