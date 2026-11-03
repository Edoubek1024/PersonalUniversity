/**
 * projection-3d: vectors in R^3 drawn in a turnable 3D view (drag the background, or use the
 * slider). Two modes:
 *   project       b, its orthogonal projection p = A x-hat onto the line through a1 or the plane
 *                 spanned by a1, a2, and the residual e = b - p, perpendicular to the subspace
 *   gram-schmidt  step through Gram-Schmidt on a1, a2 (, a3): subtract the projections onto the
 *                 earlier q's, then normalise, building Q and R one entry at a time
 *
 * Params:
 *   mode     "project" | "gram-schmidt"                default "project"
 *   b        [b1, b2, b3]                              default [3, 0, 3]
 *   a        list of 1 to 3 vectors in R^3 (the columns a1, a2, ...) default [[1, 1, 0], [0, 1, 1]]
 *   onto     "line" | "plane": initial subspace (project mode, two vectors) default "plane"
 *   editable allow typing the vectors                  default true
 *   turn     initial azimuth of the view in degrees     default 30
 *   tilt     initial elevation in degrees               default 20
 *   title    string
 *   caption  string
 */
import { useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, matrix as readMatrix, num as readNum, numArray, oneOf, str } from '../kit/params';
import { Arrow, Label, Plot, Poly, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { fmt } from '../kit/num';
import { add, cross3, dot, norm, scale, solve, sub } from '../kit/la-core';
import { NumberField, texMatrix, texNum } from '../kit/la-ui';

type V3 = number[];

function MR({ label, value, tone }: { label: ReactNode; value: ReactNode; tone?: string }) {
  return <Readout label={<span className="normal-case tracking-normal">{label}</span>} value={value} tone={tone} />;
}

const COL = { b: 'var(--color-ink)', p: 'var(--plot-3)', e: 'var(--plot-2)', a: ['var(--plot-1)', 'var(--plot-5)', 'var(--plot-6)'], q: 'var(--plot-3)', plane: 'var(--plot-1)' };
const tup = (v: V3, d = 3) => `(${v.map((x) => fmt(x, d)).join(', ')})`;

/** Orthographic camera: azimuth th about z, elevation ph. */
function camera(th: number, ph: number) {
  const [ct, st, cp, sp] = [Math.cos(th), Math.sin(th), Math.cos(ph), Math.sin(ph)];
  return (v: V3): [number, number] => [-v[0] * st + v[1] * ct, v[2] * cp - (v[0] * ct + v[1] * st) * sp];
}

export default function Projection3D({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['project', 'gram-schmidt'] as const, 'project');
  const b0 = numArray(params, 'b', [3, 0, 3]);
  const a0 = readMatrix(params, 'a', mode === 'project' ? [[1, 1, 0], [0, 1, 1]] : [[1, 1, 0], [1, 0, 1], [0, 1, 1]]);
  if (b0.length !== 3 || a0[0].length !== 3) throw new Error('vectors "b" and "a" must have 3 entries each');
  if (a0.length > 3 || (mode === 'project' && a0.length > 2)) throw new Error('give one or two vectors in "a" for project mode, at most three for gram-schmidt');
  const editable = bool(params, 'editable', true);
  const onto0 = oneOf(params, 'onto', ['line', 'plane'] as const, a0.length > 1 ? 'plane' : 'line');

  const [b, setB] = useState<V3>(b0);
  const [as, setAs] = useState<V3[]>(a0.map((r) => [...r]));
  const [th, setTh] = useState((readNum(params, 'turn', 30) * Math.PI) / 180);
  const [ph, setPh] = useState((readNum(params, 'tilt', 20) * Math.PI) / 180);
  const [onto, setOnto] = useState(onto0);
  const [step, setStep] = useState(0);
  const proj = camera(th, ph);
  const R = useMemo(() => Math.max(1.5, mode === 'project' ? norm(b0) : 0, ...a0.map(norm)) * 1.05, []); // eslint-disable-line react-hooks/exhaustive-deps
  const drag = useRef<{ x: number; y: number; th: number; ph: number } | null>(null);

  const setVec = (k: number, i: number, val: number) => (k < 0 ? setB((v) => v.map((x, j) => (j === i ? val : x))) : setAs((A) => A.map((v, kk) => (kk === k ? v.map((x, j) => (j === i ? val : x)) : v))));

  const P = (v: V3) => proj(v);
  const arrow = (from: V3, to: V3, color: string, width = 2.5, dash?: string, opacity?: number) => {
    const [x1, y1] = P(from);
    const [x2, y2] = P(to);
    return <Arrow x1={x1} y1={y1} x2={x2} y2={y2} color={color} width={width} dash={dash} opacity={opacity} />;
  };
  const seg = (from: V3, to: V3, color: string, width = 1.5, dash?: string, opacity?: number) => {
    const [x1, y1] = P(from);
    const [x2, y2] = P(to);
    return <Segment x1={x1} y1={y1} x2={x2} y2={y2} color={color} width={width} dash={dash} opacity={opacity} />;
  };
  const label = (at: V3, text: string, color: string, dx = 6, dy = -6) => {
    const [x, y] = P(at);
    return (
      <Label x={x} y={y} color={color} dx={dx} dy={dy} weight={600}>
        {text}
      </Label>
    );
  };
  /** Translucent patch of the plane spanned by u, w (orthonormalised) with a few grid lines. */
  const plane = (u: V3, w: V3, size: number) => {
    const e1 = scale(u, 1 / (norm(u) || 1));
    const w2 = sub(w, scale(e1, dot(w, e1)));
    if (norm(w2) < 1e-9) return null;
    const e2 = scale(w2, 1 / norm(w2));
    const corner = (s: number, t: number) => P(add(scale(e1, s * size), scale(e2, t * size)));
    const lines = [];
    for (let k = -2; k <= 2; k++) {
      const s = k / 2;
      const [x1, y1] = corner(s, -1);
      const [x2, y2] = corner(s, 1);
      const [x3, y3] = corner(-1, s);
      const [x4, y4] = corner(1, s);
      lines.push(<Segment key={`p${k}`} x1={x1} y1={y1} x2={x2} y2={y2} color={COL.plane} width={1} opacity={0.3} />);
      lines.push(<Segment key={`q${k}`} x1={x3} y1={y3} x2={x4} y2={y4} color={COL.plane} width={1} opacity={0.3} />);
    }
    return (
      <g>
        <Poly points={[corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)]} closed fill={COL.plane} fillOpacity={0.1} color={COL.plane} width={1} opacity={0.6} />
        {lines}
      </g>
    );
  };
  const axes = (
    <g>
      {[0, 1, 2].map((i) => {
        const e = [0, 0, 0];
        e[i] = R * 0.78;
        const m = scale(e, -0.35);
        return (
          <g key={i}>
            {seg(m, e, 'var(--plot-axis)', 1.25)}
            {label(e, ['x', 'y', 'z'][i], 'var(--plot-text)', 4, 4)}
          </g>
        );
      })}
    </g>
  );
  const rightAngle = (at: V3, d1: V3, d2: V3, size: number) => {
    if (norm(d1) < 1e-9 || norm(d2) < 1e-9) return null;
    const u = scale(d1, size / norm(d1));
    const w = scale(d2, size / norm(d2));
    return <Poly points={[P(add(at, u)), P(add(add(at, u), w)), P(add(at, w))]} color="var(--plot-text)" width={1.25} />;
  };

  const onDown = (x: number, y: number, e: PointerEvent<SVGSVGElement>) => {
    (e.currentTarget as SVGSVGElement).setPointerCapture(e.pointerId);
    drag.current = { x, y, th, ph };
  };
  const onMove = (x: number, y: number) => {
    const d = drag.current;
    if (!d) return;
    setTh(d.th - ((x - d.x) / R) * 1.2);
    setPh(Math.max(-1.45, Math.min(1.45, d.ph + ((y - d.y) / R) * 1.2)));
  };
  const onUp = () => (drag.current = null);

  const editor = editable && (
    <details className="text-[13px] text-ink-2">
      <summary className="cursor-pointer select-none">Edit the vectors</summary>
      <div className="mt-2 space-y-1.5">
        {mode === 'project' && <VecRow name="b" v={b} onChange={(i, x) => (setVec(-1, i, x), setStep(0))} />}
        {as.map((v, k) => (
          <VecRow key={k} name={`a${'₁₂₃'[k]}`} v={v} onChange={(i, x) => (setVec(k, i, x), setStep(0))} />
        ))}
        <Button onClick={() => (setB(b0), setAs(a0.map((r) => [...r])), setStep(0))}>Lesson's vectors</Button>
      </div>
    </details>
  );
  const turn = (
    <Controls cols={2}>
      <Slider label="Turn the view" value={th} min={-Math.PI} max={Math.PI} step={0.02} onChange={setTh} format={(v) => `${fmt((v * 180) / Math.PI, 3)}°`} />
      <Slider label="Tilt" value={ph} min={-1.45} max={1.45} step={0.02} onChange={setPh} format={(v) => `${fmt((v * 180) / Math.PI, 3)}°`} />
    </Controls>
  );
  const plot = (children: ReactNode, desc: string) => (
    <Plot view={[-R, R, -R * 0.85, R * 0.85]} equal grid={false} axes={false} aspect={0.72} minHeight={290} maxHeight={480} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} label={desc}>
      {axes}
      {children}
    </Plot>
  );

  // Gram-Schmidt factors (computed in both modes so the hooks run in a fixed order).
  const k = as.length;
  const gs = useMemo(() => {
    const q: V3[] = [];
    const Rm = Array.from({ length: k }, () => new Array(k).fill(NaN));
    const vs: V3[] = [];
    let ok = true;
    for (let j = 0; j < k; j++) {
      let v = [...as[j]];
      for (let i = 0; i < j; i++) {
        Rm[i][j] = dot(q[i], as[j]);
        v = sub(v, scale(q[i], Rm[i][j]));
      }
      vs.push(v);
      Rm[j][j] = norm(v);
      if (Rm[j][j] < 1e-9) {
        ok = false;
        q.push([0, 0, 0]);
      } else q.push(scale(v, 1 / Rm[j][j]));
      for (let i = j + 1; i < k; i++) Rm[i][j] = 0;
    }
    return { q, Rm, vs, ok };
  }, [JSON.stringify(as)]); // eslint-disable-line react-hooks/exhaustive-deps

  if (mode === 'project') {
    const cols = onto === 'line' || as.length === 1 ? as.slice(0, 1) : as;
    const AtA = cols.map((u) => cols.map((w) => dot(u, w)));
    const Atb = cols.map((u) => dot(u, b));
    const xh = solve(AtA, Atb);
    const p = xh ? cols.reduce((s, u, k) => add(s, scale(u, xh[k])), [0, 0, 0]) : null;
    const e = p ? sub(b, p) : null;
    const normal = cols.length === 2 ? cross3(cols[0], cols[1]) : null;
    return (
      <Frame title={str(params, 'title', 'Projection onto a subspace')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
        {as.length > 1 && (
          <Segmented
            label="Project b onto"
            options={[
              { value: 'line', label: 'the line through a₁' },
              { value: 'plane', label: 'the plane of a₁, a₂' },
            ]}
            value={onto}
            onChange={setOnto}
          />
        )}
        {plot(
          <>
            {cols.length === 2 && plane(cols[0], cols[1], R * 0.6)}
            {cols.length === 1 && seg(scale(cols[0], -R / norm(cols[0])), scale(cols[0], R / norm(cols[0])), COL.plane, 1.5, '6 4', 0.6)}
            {cols.map((u, k) => (
              <g key={k}>
                {arrow([0, 0, 0], u, COL.a[k], 2.25)}
                {label(u, `a${'₁₂₃'[k]}`, COL.a[k], 6, 14)}
              </g>
            ))}
            {p && e && (
              <>
                {seg(p, b, COL.e, 2.5, '5 4')}
                {arrow([0, 0, 0], p, COL.p, 3)}
                {label(p, 'p', COL.p, 6, 14)}
                {rightAngle(p, e, cols.length === 1 ? scale(cols[0], -Math.sign(dot(cols[0], p)) || 1) : sub([0, 0, 0], p), R * 0.06)}
                {label(add(p, scale(e, 0.5)), 'e', COL.e, 6, 0)}
              </>
            )}
            {arrow([0, 0, 0], b, COL.b, 2.5)}
            {label(b, 'b', COL.b)}
          </>,
          'The vector b, its projection p and the residual e',
        )}
        {turn}
        {xh && p && e ? (
          <>
            <Controls cols={3}>
              <MR label="x̂ from AᵀA x̂ = Aᵀb" value={tup(xh, 4)} />
              <MR label="p = A x̂" value={tup(p, 4)} tone={COL.p} />
              <MR label="e = b − p,  |e|" value={`${tup(e, 4)},  ${fmt(norm(e), 4)}`} tone={COL.e} />
            </Controls>
            <div className="overflow-x-auto text-sm">
              <Tex display>{`A^TA = ${texMatrix(AtA, 'b', 4)},\\quad A^Tb = ${texMatrix(Atb.map((x) => [x]), 'b', 4)},\\qquad ${cols.map((u, k) => `e\\cdot a_${k + 1} = ${texNum(Math.abs(dot(e, u)) < 1e-10 ? 0 : dot(e, u), 3)}`).join(',\\ ')}`}</Tex>
            </div>
            <Note>
              The residual e is perpendicular to {cols.length === 1 ? 'the line' : 'the plane'} (right-angle mark), which is what makes p the closest point.{' '}
              {normal && norm(normal) > 1e-9 && `In R³ that means e is parallel to the normal a₁ × a₂ = ${tup(normal)}.`}
            </Note>
          </>
        ) : (
          <Note tone="warn">The vectors spanning the subspace are dependent, so AᵀA is singular.</Note>
        )}
        {editor}
      </Frame>
    );
  }

  // Gram-Schmidt
  const nSteps = 2 * k - 1; // normalise a1; then (subtract, normalise) for each later vector
  const s = Math.min(step, nSteps);
  // After step s: which q's are done, and which v is being shown.
  const doneQ = s === 0 ? 0 : Math.floor((s + 1) / 2);
  const showingV = s >= 2 && s % 2 === 0 ? s / 2 : -1; // index j of v_j shown (subtracted, not yet normalised)
  const known = (i: number, j: number) => (i > j ? true : i === j ? j < doneQ : j < doneQ || showingV === j);
  const desc = (() => {
    if (s === 0) return 'Start: the vectors a₁, a₂' + (k > 2 ? ', a₃' : '') + '. Press Next.';
    if (s === 1) return `Normalise a₁: r₁₁ = |a₁| = ${fmt(gs.Rm[0][0], 4)} and q₁ = a₁ / r₁₁.`;
    const j = Math.floor(s / 2);
    if (s % 2 === 0)
      return `Subtract from a${'₁₂₃'[j]} its components along ${Array.from({ length: j }, (_, i) => `q${'₁₂₃'[i]}`).join(' and ')}: ${Array.from({ length: j }, (_, i) => `r${'₁₂₃'[i]}${'₁₂₃'[j]} = q${'₁₂₃'[i]}·a${'₁₂₃'[j]} = ${fmt(gs.Rm[i][j], 4)}`).join(', ')}. What is left, v${'₁₂₃'[j]} = ${tup(gs.vs[j])}, is perpendicular to the earlier q's.`;
    return `Normalise: r${'₁₂₃'[j]}${'₁₂₃'[j]} = |v${'₁₂₃'[j]}| = ${fmt(gs.Rm[j][j], 4)} and q${'₁₂₃'[j]} = v${'₁₂₃'[j]} / r${'₁₂₃'[j]}${'₁₂₃'[j]} = ${tup(gs.q[j])}.`;
  })();
  const Rtex = gs.Rm.map((row, i) => row.map((x, j) => (known(i, j) ? texNum(x, 4) : '\\cdot')));
  const Qtex = [0, 1, 2].map((r) => gs.q.map((q, j) => (j < doneQ ? texNum(q[r], 3) : '\\cdot')));
  const j = showingV;
  return (
    <Frame title={str(params, 'title', 'Gram-Schmidt, one step at a time')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {plot(
        <>
          {doneQ >= 2 && plane(gs.q[0], gs.q[1], R * 0.6)}
          {as.map((a, i) => (
            <g key={i}>
              {arrow([0, 0, 0], a, COL.a[i], 2, undefined, i < doneQ ? 0.35 : 1)}
              {label(a, `a${'₁₂₃'[i]}`, COL.a[i], 6, 14)}
            </g>
          ))}
          {j >= 0 && (
            <>
              {Array.from({ length: j }, (_, i) => (
                <g key={`c${i}`}>{arrow([0, 0, 0], scale(gs.q[i], gs.Rm[i][j]), COL.a[j], 1.75, '4 3', 0.8)}</g>
              ))}
              {seg(as[j], gs.vs[j], COL.e, 1.5, '3 3')}
              {arrow([0, 0, 0], gs.vs[j], COL.e, 3)}
              {label(gs.vs[j], `v${'₁₂₃'[j]}`, COL.e, 6, -6)}
            </>
          )}
          {gs.q.slice(0, doneQ).map((q, i) => (
            <g key={`q${i}`}>
              {arrow([0, 0, 0], q, COL.q, 3)}
              {label(q, `q${'₁₂₃'[i]}`, COL.q, -6, -6)}
            </g>
          ))}
        </>,
        'Gram-Schmidt on the vectors a',
      )}
      <div className="flex flex-wrap items-center gap-1.5">
        <Button onClick={() => setStep((t) => Math.max(0, t - 1))} disabled={s === 0}>
          Back
        </Button>
        <Button primary onClick={() => setStep((t) => Math.min(nSteps, t + 1))} disabled={s >= nSteps}>
          Next
        </Button>
        <Button onClick={() => setStep(0)} disabled={s === 0}>
          Reset
        </Button>
        <span className="text-xs text-ink-3">
          Step {s} of {nSteps}
        </span>
      </div>
      <Note tone={s === nSteps && gs.ok ? 'good' : 'info'}>{desc}</Note>
      {!gs.ok && <Note tone="warn">A leftover vector is zero: the a's are dependent, so Gram-Schmidt stops (a zero diagonal entry in R).</Note>}
      <div className="overflow-x-auto text-sm">
        <Tex display>{`Q = ${texMatrix(Qtex, 'b')},\\qquad R = ${texMatrix(Rtex, 'b')}`}</Tex>
      </div>
      {s === nSteps && gs.ok && <Note>Check: q·q = 1 for each column and qᵢ·qⱼ = {fmt(Math.max(...gs.q.flatMap((a, i) => gs.q.map((c, jj) => (i < jj ? Math.abs(dot(a, c)) : 0)))), 3)} for i ≠ j, and QR = A column by column.</Note>}
      {turn}
      {editor}
    </Frame>
  );
}

function VecRow({ name, v, onChange }: { name: string; v: V3; onChange: (i: number, x: number) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      <span className="w-6 font-serif italic text-ink">{name}</span>
      <span className="text-ink-3">=</span>
      {v.map((x, i) => (
        <NumberField key={i} value={x} width="w-14" srLabel={`${name} component ${i + 1}`} onChange={(val) => onChange(i, val)} />
      ))}
    </div>
  );
}

