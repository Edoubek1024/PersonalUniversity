/**
 * qc-bloch: one qubit on the Bloch sphere. |psi> = cos(theta/2)|0> + e^{i phi} sin(theta/2)|1> is
 * the point (sin theta cos phi, sin theta sin phi, cos theta); |0> is the north pole (+z), |+> is +x
 * and |+i> is +y. Gate buttons rotate the state (X, Y, Z: pi about x, y, z; H: pi about
 * (x + z)/sqrt2; S: pi/2 and T: pi/4 about z; RX/RY/RZ(t): t about x/y/z), drawing the axis and
 * the arc the state travels. Global phases are dropped. Drag the sphere (or use the view
 * sliders) to turn it. Optional decoherence: with T1 and T2 the vector shrinks into the ball,
 * x and y decaying as e^{-t/T2} and z relaxing toward +1 (|0> is the ground state) as
 * 1 - (1 - z0) e^{-t/T1}; T2 is held at or below 2 T1.
 *
 * Params:
 *   theta       number    initial polar angle in degrees                        default 0
 *   phi         number    initial azimuth in degrees                            default 0
 *   gates       string[]  gate buttons: X Y Z H S SDG T TDG RX RY RZ           default ["X","Y","Z","H","S","T"]
 *   angle       number    initial angle for RX/RY/RZ in degrees                 default 90
 *   showAxis    boolean   draw the last gate's rotation axis and arc            default true
 *   sliders     boolean   theta and phi sliders to set the state directly       default true
 *   basis       string    "Z" | "X" | "Y" measurement basis shown first         default "Z"
 *   bases       string[]  bases offered (empty hides the selector)              default ["Z","X","Y"]
 *   decoherence boolean   T1, T2 and time sliders with Play/Pause/Reset         default false
 *   T1          number    relaxation time in microseconds                       default 100
 *   T2          number    dephasing time in microseconds (clamped to 2 T1)      default 80
 *   az, el      number    view angles in degrees                                default 25, 18
 *   title       string                                                          default "Bloch sphere"
 *   caption     string    what to try; may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { CamSliders, Scene3D, arrow, line, polyline, text, type Cam, type Proj, type Vec3 } from '../kit/calc3-3d';
import { TL, caption, rgba, useColors } from '../kit/calc3-ui';
import { useAnimation } from '../kit/hooks';
import { fmtC, fromAngles, gateRotation, rotate, toAngles, type V3 } from '../kit/qc-sim';
import { drawBlochBackdrop } from '../kit/qc-ui';

const ALLOWED = ['X', 'Y', 'Z', 'H', 'S', 'SDG', 'T', 'TDG', 'RX', 'RY', 'RZ'] as const;
const BASES = ['Z', 'X', 'Y'] as const;
type Basis = (typeof BASES)[number];
const BASIS_KETS: Record<Basis, [string, string]> = { Z: ['|0⟩', '|1⟩'], X: ['|+⟩', '|−⟩'], Y: ['|+i⟩', '|−i⟩'] };
const LABEL: Record<string, string> = { SDG: 'S†', TDG: 'T†', RX: 'Rx', RY: 'Ry', RZ: 'Rz' };
const D = Math.PI / 180;

const decay = (r: V3, t: number, T1: number, T2: number): V3 => {
  const e2 = Math.exp(-t / T2);
  return [r[0] * e2, r[1] * e2, 1 - (1 - r[2]) * Math.exp(-t / T1)];
};

interface Snap {
  r: V3;
  t: number;
  hist: string[];
}

export default function QcBloch({ params }: WidgetProps) {
  const th0 = num(params, 'theta', 0);
  const ph0 = num(params, 'phi', 0);
  const gates = strArray(params, 'gates', ['X', 'Y', 'Z', 'H', 'S', 'T']).map((g) => g.toUpperCase());
  for (const g of gates) if (!(ALLOWED as readonly string[]).includes(g)) throw new Error(`parameter "gates": unknown gate "${g}" (use ${ALLOWED.join(', ')})`);
  const showAxis = bool(params, 'showAxis', true);
  const sliders = bool(params, 'sliders', true);
  const basis0 = oneOf(params, 'basis', BASES, 'Z');
  const bases = strArray(params, 'bases', [...BASES]);
  for (const b of bases) if (!(BASES as readonly string[]).includes(b)) throw new Error(`parameter "bases": unknown basis "${b}" (use Z, X, Y)`);
  const deco = bool(params, 'decoherence', false);
  const T1_0 = num(params, 'T1', 100);
  const T2_0 = num(params, 'T2', 80);
  if (!(T1_0 > 0) || !(T2_0 > 0)) throw new Error('parameters "T1" and "T2" should be positive (microseconds)');

  const init: Snap = useMemo(() => ({ r: fromAngles(th0 * D, ph0 * D), t: 0, hist: [] }), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [snap, setSnap] = useState<Snap>(init);
  const [undo, setUndo] = useState<Snap[]>([]);
  const [last, setLast] = useState<{ axis: V3; angle: number; from: V3 } | null>(null);
  const [anim, setAnim] = useState(1);
  const [ang, setAng] = useState(num(params, 'angle', 90));
  const [basis, setBasis] = useState<Basis>(basis0);
  const [T1, setT1] = useState(T1_0);
  const [T2raw, setT2] = useState(T2_0);
  const [playing, setPlaying] = useState(false);
  const [phiMem, setPhiMem] = useState(((ph0 % 360) + 360) % 360);
  const [cam, setCam] = useState<Cam>({ az: num(params, 'az', 25), el: num(params, 'el', 18) });
  const C = useColors();

  const T2 = Math.min(T2raw, 2 * T1);
  const clamped = T2raw > 2 * T1;
  const tMax = Math.round(3 * Math.max(T1, T2));
  const cur: V3 = deco ? decay(snap.r, snap.t, T1, T2) : snap.r;
  const shown: V3 = last && anim < 1 ? rotate(last.from, last.axis, last.angle * anim) : cur;

  useAnimation(anim < 1 || playing, (dt) => {
    if (anim < 1) setAnim((a) => Math.min(1, a + dt / 0.55));
    if (playing)
      setSnap((s) => {
        const t = Math.min(tMax, s.t + (dt * tMax) / 8);
        if (t >= tMax) setPlaying(false);
        return { ...s, t };
      });
  });

  const apply = (g: string) => {
    const { axis, angle } = gateRotation(g, ang * D);
    const from = cur;
    const r = rotate(from, axis, angle);
    setUndo((u) => [...u, snap]);
    setSnap({ r, t: 0, hist: [...snap.hist, g === 'RX' || g === 'RY' || g === 'RZ' ? `${LABEL[g]}(${Math.round(ang)}°)` : LABEL[g] ?? g] });
    setLast({ axis, angle, from });
    setAnim(0);
    setPlaying(false);
  };

  const rlen = Math.hypot(...cur);
  const pure = rlen > 0.9995;
  const [th, ph] = toAngles(cur);
  const alpha = Math.cos(th / 2);
  const beta: [number, number] = [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)];
  const comp = basis === 'Z' ? cur[2] : basis === 'X' ? cur[0] : cur[1];
  const atPole = Math.hypot(cur[0], cur[1]) < 1e-6;
  const phDeg = atPole ? phiMem : ((ph / D) % 360 + 360) % 360;

  const draw = (ctx: CanvasRenderingContext2D, P: Proj) => {
    drawBlochBackdrop(ctx, P, C);
    const halo = C.surface;
    if (showAxis && last) {
      const a = last.axis;
      line(ctx, P, [-a[0] * 1.15, -a[1] * 1.15, -a[2] * 1.15], [a[0] * 1.15, a[1] * 1.15, a[2] * 1.15], C.p[3], 2, [6, 4]);
      text(ctx, P, [a[0] * 1.22, a[1] * 1.22, a[2] * 1.22], 'axis', C.p[3], halo, { size: 11, weight: 600 });
      const steps = 48;
      const pts: Vec3[] = [];
      const frac = last && anim < 1 ? anim : 1;
      for (let i = 0; i <= steps; i++) pts.push(rotate(last.from, a, (last.angle * frac * i) / steps) as Vec3);
      polyline(ctx, P, pts, C.p[3], 2.5);
    }
    if (deco && snap.t > 0) {
      const pts: Vec3[] = [];
      for (let i = 0; i <= 60; i++) pts.push(decay(snap.r, (snap.t * i) / 60, T1, T2) as Vec3);
      polyline(ctx, P, pts, rgba(C.rgb('--plot-2'), 0.8), 1.75, [4, 3]);
    }
    const v = shown as Vec3;
    // Drop line to the equatorial plane and the projection on z.
    line(ctx, P, v, [v[0], v[1], 0], rgba(C.rgb('--plot-text'), 0.55), 1, [3, 3]);
    line(ctx, P, [0, 0, 0], [v[0], v[1], 0], rgba(C.rgb('--plot-text'), 0.35), 1, [3, 3]);
    if (Math.hypot(...v) > 0.02) arrow(ctx, P, [0, 0, 0], v, C.p[0], 3, 12);
    const [x, y] = P.p(v);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = C.p[0];
    ctx.fill();
    ctx.strokeStyle = halo;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const setAngles = (thd: number, phd: number) => {
    setPhiMem(phd);
    setUndo((u) => [...u, snap]);
    setSnap({ r: fromAngles(thd * D, phd * D), t: 0, hist: [...snap.hist, `set θ=${Math.round(thd)}°, φ=${Math.round(phd)}°`].slice(-12) });
    setLast(null);
    setAnim(1);
  };

  const hasRot = gates.some((g) => g === 'RX' || g === 'RY' || g === 'RZ');

  return (
    <Frame title={str(params, 'title', 'Bloch sphere')} caption={caption(params)}>
      <Scene3D cam={cam} onCam={setCam} fit={1.5} draw={draw} aspect={0.78} maxHeight={420} label={`Bloch vector (${cur.map((c) => c.toFixed(3)).join(', ')})`} />
      {gates.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[13px] text-ink-2">Apply gate</span>
          {gates.map((g) => (
            <Button key={g} onClick={() => apply(g)}>
              <span className="font-mono font-semibold">{LABEL[g] ?? g}</span>
            </Button>
          ))}
          <Button
            onClick={() => {
              const prev = undo[undo.length - 1];
              if (!prev) return;
              setSnap(prev);
              setUndo((u) => u.slice(0, -1));
              setLast(null);
              setAnim(1);
            }}
            disabled={undo.length === 0}
          >
            Undo
          </Button>
          <Button
            onClick={() => {
              setSnap(init);
              setUndo([]);
              setLast(null);
              setAnim(1);
              setPlaying(false);
            }}
          >
            Reset
          </Button>
        </div>
      )}
      {hasRot && (
        <div className="max-w-sm">
          <Slider label="Angle for Rx, Ry, Rz" value={ang} min={-180} max={180} step={5} format={(v) => `${v}°`} onChange={setAng} />
        </div>
      )}
      {snap.hist.length > 0 && (
        <div className="text-[13px] text-ink-2">
          Applied: <span className="font-mono">{snap.hist.join(' → ')}</span>
          {last && <span className="text-ink-3"> (last: {Math.round((Math.abs(last.angle) / D) * 10) / 10}° about ({last.axis.map((c) => fmtC(c, 0)).join(', ')}))</span>}
        </div>
      )}
      {sliders && (
        <Controls cols={2}>
          <Slider label="θ (polar angle)" value={Math.round(th / D)} min={0} max={180} step={1} format={(v) => `${v}°`} onChange={(v) => setAngles(v, phDeg)} />
          <Slider label="φ (azimuth, relative phase)" value={Math.round(phDeg) % 360} min={0} max={359} step={1} format={(v) => `${v}°`} onChange={(v) => setAngles(th / D, v)} />
        </Controls>
      )}
      {deco && (
        <div className="space-y-2 rounded-lg border border-line px-3 py-2">
          <Controls cols={3}>
            <Slider label="T1 (μs)" value={T1} min={5} max={300} step={5} onChange={setT1} />
            <Slider label="T2 (μs)" value={T2raw} min={5} max={600} step={5} onChange={setT2} />
            <Slider label="time t (μs)" value={Math.round(snap.t * 10) / 10} min={0} max={tMax} step={tMax / 200} onChange={(t) => setSnap((s) => ({ ...s, t }))} />
          </Controls>
          <div className="flex flex-wrap gap-1.5">
            <Button primary onClick={() => setPlaying(!playing)}>
              {playing ? 'Pause' : snap.t >= tMax ? 'Play again' : 'Play'}
            </Button>
            <Button onClick={() => (setPlaying(false), setSnap((s) => ({ ...s, t: 0 })))}>Reset time</Button>
          </div>
          {clamped && <Note tone="warn">T2 cannot exceed 2T1, so T2 = {T2} μs is used.</Note>}
          <div className="text-xs text-ink-3">Applying a gate restarts the clock from the current (possibly mixed) state.</div>
        </div>
      )}
      <Controls cols={3}>
        <Readout
          label="State"
          value={
            pure ? (
              <span>
                {alpha.toFixed(3)}|0⟩ + ({fmtC(beta[0], beta[1])})|1⟩
              </span>
            ) : (
              'mixed: no single ket'
            )
          }
        />
        <Readout label={<TL>{'(x, y, z)'}</TL>} value={`(${cur.map((c) => fmtC(c, 0)).join(', ')})`} tone="var(--plot-1)" />
        <Readout label={<TL>{'\\theta,\\ \\varphi'}</TL>} value={rlen < 1e-6 ? '—' : `${(th / D).toFixed(1)}°, ${atPole ? '— (pole)' : `${phDeg.toFixed(1)}°`}`} />
        <Readout label={`P(${BASIS_KETS[basis][0]})`} value={((1 + comp) / 2).toFixed(3)} tone="var(--plot-3)" />
        <Readout label={`P(${BASIS_KETS[basis][1]})`} value={((1 - comp) / 2).toFixed(3)} tone="var(--plot-2)" />
        {deco ? <Readout label="|r|, purity Tr ρ²" value={`${rlen.toFixed(3)}, ${((1 + rlen * rlen) / 2).toFixed(3)}`} /> : <Readout label={`Expectation ⟨${basis}⟩ = P(${BASIS_KETS[basis][0]}) − P(${BASIS_KETS[basis][1]})`} value={fmtC(comp, 0)} />}
      </Controls>
      {bases.length > 1 && (
        <Segmented
          label="Measure in basis"
          options={bases.map((b) => ({ value: b as Basis, label: `${b}: ${BASIS_KETS[b as Basis].join(', ')}` }))}
          value={basis}
          onChange={setBasis}
        />
      )}
      <div className="grid gap-x-5 gap-y-2 sm:grid-cols-2">
        <CamSliders cam={cam} onCam={setCam} />
      </div>
      <Note>Each gate is drawn as a rotation; global phases are dropped (Z is a π turn about z, which equals the matrix Z up to the phase −i).</Note>
    </Frame>
  );
}
