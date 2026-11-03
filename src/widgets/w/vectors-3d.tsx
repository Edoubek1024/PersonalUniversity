/**
 * vectors-3d: two vectors a and b from the origin, in the plane (dim 2, drag the tips) or in
 * space (dim 3, drag a tip to move it parallel to the screen, drag elsewhere to rotate; sliders
 * for every component). Features, each with a toggle:
 *   sum     a + b and the parallelogram rule
 *   proj    the vector projection of a on b, with the perpendicular remainder dashed
 *   angle   the angle θ between a and b, marked at the origin
 *   cross   (3D) a × b, perpendicular to both, and the parallelogram whose area is |a × b|
 *
 * Params:
 *   dim       2 | 3                                                default 3
 *   a, b      number[]  components (2 or 3 of them)              default ⟨1, 2, 2⟩, ⟨3, 0, 4⟩
 *   names     [string, string]  names of the two vectors         default ["a", "b"]
 *   features  string[]  toggles offered                          default ["proj", "angle"]
 *   show      string[]  features on at the start                 default = features
 *   snap      number    grid the tips snap to while dragging      default 0.5
 *   range     number    half-width of the view                   default fitted to the vectors
 *   az, el    number    initial view angles (3D)                 default 30, 22
 *   title     string                                             default "Vectors"
 *   caption   string    may contain $TeX$
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, numArray, str, strArray } from '../kit/params';
import { Arrow, Dot, Draggable, Label, Plot, Segment, usePlot } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Slider, Toggle } from '../kit/controls';
import { fmt } from '../kit/num';
import { CamSliders, Scene3D, add, arrow, cross, dot, line, norm, poly, scale, sub, text, type Cam, type Proj, type Vec3 } from '../kit/calc3-3d';
import { caption, rgba, TL, useColors } from '../kit/calc3-ui';

const FEATURES = ['sum', 'proj', 'angle', 'cross'] as const;
type Feature = (typeof FEATURES)[number];

const vecStr = (v: readonly number[]) => `⟨${v.map((x) => fmt(x)).join(', ')}⟩`;
const deg = (r: number) => (r * 180) / Math.PI;

function AngleArc2({ a, b, r }: { a: [number, number]; b: [number, number]; r: number }) {
  const { sx, sy } = usePlot();
  const t0 = Math.atan2(a[1], a[0]);
  let d = Math.atan2(b[1], b[0]) - t0;
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const pts = Array.from({ length: 31 }, (_, k) => {
    const t = t0 + (d * k) / 30;
    return `${sx(r * Math.cos(t)).toFixed(1)},${sy(r * Math.sin(t)).toFixed(1)}`;
  });
  const tm = t0 + d / 2;
  return (
    <g>
      <polyline points={pts.join(' ')} fill="none" stroke="var(--plot-6)" strokeWidth={2} />
      <text x={sx(1.45 * r * Math.cos(tm))} y={sy(1.45 * r * Math.sin(tm)) + 4} textAnchor="middle" fontSize={13} fill="var(--plot-6)" fontWeight={600}>
        θ
      </text>
    </g>
  );
}

export default function Vectors3D({ params }: WidgetProps) {
  const dim = num(params, 'dim', 3);
  if (dim !== 2 && dim !== 3) throw new Error('parameter "dim" should be 2 or 3');
  const a0 = numArray(params, 'a', dim === 3 ? [1, 2, 2] : [3, 1]);
  const b0 = numArray(params, 'b', dim === 3 ? [3, 0, 4] : [1, 3]);
  if (a0.length !== dim || b0.length !== dim) throw new Error(`parameters "a" and "b" should each have ${dim} components`);
  const names = strArray(params, 'names', ['a', 'b']);
  if (names.length !== 2) throw new Error('parameter "names" should have two names');
  const [na, nb] = names;
  const feats = strArray(params, 'features', ['proj', 'angle']);
  for (const q of feats) if (!FEATURES.includes(q as Feature)) throw new Error(`parameter "features": unknown feature "${q}" (use ${FEATURES.join(', ')})`);
  if (dim === 2 && feats.includes('cross')) throw new Error('the cross product needs dim 3');
  const show0 = strArray(params, 'show', feats);
  const snapStep = num(params, 'snap', 0.5);

  const [a, setA] = useState<number[]>(a0);
  const [b, setB] = useState<number[]>(b0);
  const [on, setOn] = useState<Record<string, boolean>>(() => Object.fromEntries(feats.map((q) => [q, show0.includes(q)])));
  const [cam, setCam] = useState<Cam>({ az: num(params, 'az', 30), el: num(params, 'el', 22) });
  const colors = useColors();
  const dragRef = useRef({ which: -1, start: [0, 0, 0] as Vec3, sx: 0, sy: 0 }).current;

  const A3: Vec3 = [a[0], a[1], dim === 3 ? a[2] : 0];
  const B3: Vec3 = [b[0], b[1], dim === 3 ? b[2] : 0];
  const ab = dot(A3, B3);
  const la = norm(A3);
  const lb = norm(B3);
  const cosT = la > 0 && lb > 0 ? Math.max(-1, Math.min(1, ab / (la * lb))) : NaN;
  const theta = Math.acos(cosT);
  const proj: Vec3 = lb > 0 ? scale(B3, ab / (lb * lb)) : [0, 0, 0];
  const cr = cross(A3, B3);
  const lcr = norm(cr);
  const sum = add(A3, B3);

  const range = useMemo(() => {
    if (params.range !== undefined) return num(params, 'range', 5);
    const comps = [...a0, ...b0].map(Math.abs);
    if (feats.includes('cross')) comps.push(...cross([a0[0], a0[1], a0[2] ?? 0], [b0[0], b0[1], b0[2] ?? 0]).map(Math.abs));
    if (feats.includes('sum')) comps.push(...a0.map((x, i) => Math.abs(x + b0[i])));
    return Math.max(3, Math.ceil(Math.max(...comps) * 1.1));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const snapTo = (x: number) => Math.max(-range, Math.min(range, Math.round(x / snapStep) * snapStep));

  const signNote = !Number.isFinite(cosT) ? (
    <Note>One of the vectors is zero, so the angle is undefined.</Note>
  ) : Math.abs(ab) < 1e-9 ? (
    <Note tone="good">{`${na} · ${nb} = 0: the vectors are orthogonal.`}</Note>
  ) : (
    <Note>{`${na} · ${nb} ${ab > 0 ? '> 0, so the angle is acute' : '< 0, so the angle is obtuse'}.`}</Note>
  );

  const readouts = (
    <Controls cols={3}>
      <Readout label={<TL>{`\\mathbf ${na}\\cdot\\mathbf ${nb}`}</TL>} value={fmt(ab, 4)} />
      <Readout label={<TL>{`|\\mathbf ${na}|,\\ |\\mathbf ${nb}|`}</TL>} value={`${fmt(la, 4)}, ${fmt(lb, 4)}`} />
      <Readout label={<TL>{`\\cos\\theta,\\ \\theta`}</TL>} value={Number.isFinite(cosT) ? `${fmt(cosT, 4)}, ${fmt(deg(theta), 3)}°` : '—'} tone="var(--plot-6)" />
      {on.proj && <Readout label={<TL>{`\\text{comp}_{\\mathbf ${nb}}\\mathbf ${na}`}</TL>} value={lb > 0 ? fmt(ab / lb, 4) : '—'} tone="var(--plot-4)" />}
      {on.proj && <Readout label={<TL>{`\\text{proj}_{\\mathbf ${nb}}\\mathbf ${na}`}</TL>} value={vecStr(dim === 3 ? proj : proj.slice(0, 2))} tone="var(--plot-4)" />}
      {on.sum && <Readout label={<TL>{`\\mathbf ${na}+\\mathbf ${nb}`}</TL>} value={vecStr(dim === 3 ? sum : sum.slice(0, 2))} tone="var(--plot-5)" />}
      {on.cross && <Readout label={<TL>{`\\mathbf ${na}\\times\\mathbf ${nb}`}</TL>} value={vecStr(cr)} tone="var(--plot-3)" />}
      {on.cross && <Readout label={<TL>{`|\\mathbf ${na}\\times\\mathbf ${nb}|=\\text{area}`}</TL>} value={fmt(lcr, 4)} tone="var(--plot-3)" />}
      {on.cross && <Readout label={<TL>{`|\\mathbf ${na}||\\mathbf ${nb}|\\sin\\theta`}</TL>} value={Number.isFinite(theta) ? fmt(la * lb * Math.sin(theta), 4) : '—'} />}
      {on.cross && <Readout label={<TL>{`(\\mathbf ${na}\\times\\mathbf ${nb})\\cdot\\mathbf ${na},\\ \\cdot\\mathbf ${nb}`}</TL>} value={`${fmt(dot(cr, A3))}, ${fmt(dot(cr, B3))}`} />}
    </Controls>
  );

  const toggles = feats.length > 0 && (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {feats.map((q) => (
        <Toggle
          key={q}
          label={q === 'sum' ? `${na} + ${nb}` : q === 'proj' ? `Projection of ${na} on ${nb}` : q === 'angle' ? 'Angle θ' : `${na} × ${nb}`}
          checked={!!on[q]}
          onChange={(c) => setOn((s) => ({ ...s, [q]: c }))}
        />
      ))}
    </div>
  );

  const compSliders = (
    <div className="grid grid-cols-3 gap-x-3 gap-y-2 sm:gap-x-4">
      {[0, 1].flatMap((w) =>
        Array.from({ length: dim }, (_, i) => {
          const v = w ? b : a;
          const set = w ? setB : setA;
          return (
            <Slider
              key={`${w}${i}`}
              label={`${w ? nb : na}${['₁', '₂', '₃'][i]}`}
              value={v[i]}
              min={-range}
              max={range}
              step={snapStep}
              onChange={(x) => set((s) => s.map((c, k) => (k === i ? x : c)))}
            />
          );
        }),
      )}
    </div>
  );

  if (dim === 2) {
    const R = range;
    const tip = (x: number, y: number): [number, number] => [snapTo(x), snapTo(y)];
    return (
      <Frame title={str(params, 'title', 'Vectors')} caption={caption(params)}>
        <Plot view={[-R, R, -R, R]} equal aspect={0.8} maxHeight={460} label={`Vectors ${na} and ${nb}`}>
          {on.sum && (
            <>
              <Segment x1={a[0]} y1={a[1]} x2={sum[0]} y2={sum[1]} color="var(--plot-2)" dash="5 4" width={1.25} />
              <Segment x1={b[0]} y1={b[1]} x2={sum[0]} y2={sum[1]} color="var(--plot-1)" dash="5 4" width={1.25} />
              <Arrow x1={0} y1={0} x2={sum[0]} y2={sum[1]} color="var(--plot-5)" />
              <Label x={sum[0]} y={sum[1]} dx={8} dy={-8} color="var(--plot-5)" weight={600}>{`${na} + ${nb}`}</Label>
            </>
          )}
          {on.proj && lb > 0 && (
            <>
              <Segment x1={-b[0] * R} y1={-b[1] * R} x2={b[0] * R} y2={b[1] * R} color="var(--plot-2)" width={1} opacity={0.35} />
              <Segment x1={a[0]} y1={a[1]} x2={proj[0]} y2={proj[1]} color="var(--plot-text)" dash="4 3" width={1.25} />
              <Segment x1={0} y1={0} x2={proj[0]} y2={proj[1]} color="var(--plot-4)" width={6} opacity={0.8} />
              <Dot x={proj[0]} y={proj[1]} r={3.5} color="var(--plot-4)" />
            </>
          )}
          {on.angle && la > 0 && lb > 0 && <AngleArc2 a={[a[0], a[1]]} b={[b[0], b[1]]} r={Math.min(la, lb, R) * 0.28} />}
          <Arrow x1={0} y1={0} x2={a[0]} y2={a[1]} color="var(--plot-1)" width={2.75} />
          <Arrow x1={0} y1={0} x2={b[0]} y2={b[1]} color="var(--plot-2)" width={2.75} />
          <Label x={a[0]} y={a[1]} dx={10} dy={-10} color="var(--plot-1)" weight={700} size={14}>{na}</Label>
          <Label x={b[0]} y={b[1]} dx={10} dy={-10} color="var(--plot-2)" weight={700} size={14}>{nb}</Label>
          <Draggable x={a[0]} y={a[1]} r={6} color="var(--plot-1)" step={snapStep} label={`Tip of ${na}`} constrain={tip} onChange={(x, y) => setA([x, y])} />
          <Draggable x={b[0]} y={b[1]} r={6} color="var(--plot-2)" step={snapStep} label={`Tip of ${nb}`} constrain={tip} onChange={(x, y) => setB([x, y])} />
        </Plot>
        {toggles}
        <Controls cols={2}>
          <Readout label={<TL>{`\\mathbf ${na}`}</TL>} value={vecStr(a)} tone="var(--plot-1)" />
          <Readout label={<TL>{`\\mathbf ${nb}`}</TL>} value={vecStr(b)} tone="var(--plot-2)" />
        </Controls>
        {readouts}
        {signNote}
      </Frame>
    );
  }

  // 3D.
  const R = range;
  const draw = (ctx: CanvasRenderingContext2D, P: Proj) => {
    const halo = colors.surface;
    const st = R <= 6 ? 1 : R <= 12 ? 2 : 5;
    // Grid on the xy-plane.
    ctx.lineWidth = 1;
    for (let k = -Math.floor(R / st) * st; k <= R + 1e-9; k += st) {
      line(ctx, P, [k, -R, 0], [k, R, 0], rgba(colors.rgb('--plot-axis'), k === 0 ? 0 : 0.28), 1);
      line(ctx, P, [-R, k, 0], [R, k, 0], rgba(colors.rgb('--plot-axis'), k === 0 ? 0 : 0.28), 1);
    }
    // Axes.
    const axes: [Vec3, string][] = [
      [[1, 0, 0], 'x'],
      [[0, 1, 0], 'y'],
      [[0, 0, 1], 'z'],
    ];
    for (const [u, nm] of axes) {
      line(ctx, P, scale(u, -R), scale(u, R), colors.axis, 1.25);
      arrow(ctx, P, scale(u, R * 0.98), scale(u, R * 1.1), colors.axis, 1.25, 8);
      text(ctx, P, scale(u, R * 1.2), nm, colors.text, halo, { size: 13, weight: 600 });
    }
    // Shadows of the tips on the xy-plane.
    for (const v of [A3, B3]) {
      if (Math.abs(v[2]) > 1e-9) {
        line(ctx, P, v, [v[0], v[1], 0], rgba(colors.rgb('--plot-text'), 0.6), 1, [3, 3]);
        line(ctx, P, [0, 0, 0], [v[0], v[1], 0], rgba(colors.rgb('--plot-text'), 0.35), 1, [3, 3]);
      }
    }
    if (on.cross) {
      poly(ctx, P, [[0, 0, 0], A3, sum, B3], rgba(colors.rgb('--plot-3'), colors.dark ? 0.22 : 0.18), rgba(colors.rgb('--plot-3'), 0.7), 1);
    }
    if (on.sum) {
      line(ctx, P, A3, sum, colors.p[1], 1.25, [5, 4]);
      line(ctx, P, B3, sum, colors.p[0], 1.25, [5, 4]);
    }
    if (on.proj && lb > 0) {
      line(ctx, P, scale(B3, -R / lb), scale(B3, R / lb), rgba(colors.rgb('--plot-2'), 0.3), 1);
      line(ctx, P, A3, proj, colors.text, 1.25, [4, 3]);
    }
    if (on.angle && la > 0 && lb > 0) {
      // Arc from a toward b in their plane.
      const ua = scale(A3, 1 / la);
      const perp = sub(B3, scale(ua, dot(B3, ua)));
      const lp = norm(perp);
      const rr = Math.min(la, lb) * 0.3;
      if (lp > 1e-9) {
        const up = scale(perp, 1 / lp);
        const pts = Array.from({ length: 31 }, (_, k) => {
          const t = (theta * k) / 30;
          return add(scale(ua, rr * Math.cos(t)), scale(up, rr * Math.sin(t)));
        });
        ctx.beginPath();
        pts.forEach((q, k) => {
          const [x, y] = P.p(q);
          if (k) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        });
        ctx.strokeStyle = colors.p[5];
        ctx.lineWidth = 2;
        ctx.stroke();
        const mid = add(scale(ua, 1.5 * rr * Math.cos(theta / 2)), scale(up, 1.5 * rr * Math.sin(theta / 2)));
        text(ctx, P, mid, 'θ', colors.p[5], halo, { size: 13, weight: 600 });
      }
    }
    // Vectors, far ones first.
    const vs: { v: Vec3; c: string; label: string; w: number }[] = [
      { v: A3, c: colors.p[0], label: na, w: 3 },
      { v: B3, c: colors.p[1], label: nb, w: 3 },
    ];
    if (on.proj && lb > 0) vs.push({ v: proj, c: colors.p[3], label: '', w: 5 });
    if (on.sum) vs.push({ v: sum, c: colors.p[4], label: `${na} + ${nb}`, w: 2.5 });
    if (on.cross) {
      // Draw a long cross product at half (or quarter) size so it stays in view.
      let k = 1;
      while (lcr * k > 1.25 * R) k /= 2;
      vs.push({ v: scale(cr, k), c: colors.p[2], label: k === 1 ? `${na} × ${nb}` : `${na} × ${nb} (drawn at 1/${1 / k} size)`, w: 3 });
    }
    vs.sort((p, q) => P.p(p.v)[2] - P.p(q.v)[2]);
    for (const it of vs) {
      if (norm(it.v) < 1e-9) continue;
      arrow(ctx, P, [0, 0, 0], it.v, it.c, it.w, 12);
      if (it.label) text(ctx, P, it.v, it.label, it.c, halo, { dx: 12, dy: -10, size: 14, weight: 700, align: 'left' });
    }
    for (const it of [A3, B3]) {
      const [x, y] = P.p(it);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = halo;
      ctx.fill();
      ctx.strokeStyle = it === A3 ? colors.p[0] : colors.p[1];
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  };

  const onGrab = (x: number, y: number, P: Proj) => {
    const da = Math.hypot(P.p(A3)[0] - x, P.p(A3)[1] - y);
    const db = Math.hypot(P.p(B3)[0] - x, P.p(B3)[1] - y);
    const which = da < 20 && da <= db ? 0 : db < 20 ? 1 : -1;
    if (which < 0) return false;
    dragRef.which = which;
    dragRef.start = which === 0 ? A3 : B3;
    dragRef.sx = x;
    dragRef.sy = y;
    return true;
  };
  const onDrag = (x: number, y: number, P: Proj) => {
    const nv = add(dragRef.start, P.delta(x - dragRef.sx, y - dragRef.sy)).map(snapTo);
    if (dragRef.which === 0) setA(nv);
    else if (dragRef.which === 1) setB(nv);
  };

  return (
    <Frame title={str(params, 'title', 'Vectors')} caption={caption(params)}>
      <Scene3D cam={cam} onCam={setCam} fit={R * 1.3} draw={draw} onGrab={onGrab} onDrag={onDrag} label={`Vectors ${na} = ${vecStr(a)} and ${nb} = ${vecStr(b)} in space`} />
      {toggles}
      {compSliders}
      <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
        <CamSliders cam={cam} onCam={setCam} />
      </div>
      <Controls cols={2}>
        <Readout label={<TL>{`\\mathbf ${na}`}</TL>} value={vecStr(a)} tone="var(--plot-1)" />
        <Readout label={<TL>{`\\mathbf ${nb}`}</TL>} value={vecStr(b)} tone="var(--plot-2)" />
      </Controls>
      {readouts}
      {on.cross ? (
        <Note>Right-hand rule: curl the fingers of your right hand from {na} to {nb}; your thumb points along {na} × {nb}. Swap the roles (make {nb} the first vector) and the cross product flips.</Note>
      ) : (
        signNote
      )}
    </Frame>
  );
}

