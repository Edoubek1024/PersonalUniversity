/**
 * rel-doppler: the relativistic Doppler effect for a source moving at beta. The scene shows the
 * source, its velocity and the ray that reaches you at angle theta to the velocity; the graph
 * shows nu_obs / nu_emit against theta (relativistic, and optionally the classical moving-source
 * formula 1 / (1 - beta cos theta) for comparison), and a spectrum bar shows the emitted and
 * observed wavelengths, so you can watch a line move from red to blue or out of the visible band.
 *
 * theta is measured in the observer's frame ("observer": nu = nu0 / [gamma (1 - beta cos theta)],
 * so at theta = 90 degrees the light is redshifted by 1/gamma) or in the source's rest frame
 * ("source": nu = gamma nu0 (1 + beta cos theta'), blueshifted by gamma at theta' = 90 degrees).
 * The other frame's angle (aberration) is read out, which resolves the apparent contradiction.
 *
 * Params:
 *   beta       number   source speed v/c, 0 <= beta < 1                        default 0.3
 *   theta      number   angle in degrees (0 = approaching head-on, 180 = receding) default 0
 *   lambda     number   emitted wavelength in nm                                 default 656.3
 *   frame      "observer" | "source"   frame in which theta is measured          default "observer"
 *   frames     boolean  offer the switch between the two frames                  default true
 *   classical  boolean  show the classical moving-source curve                   default true
 *   betaMax    number   largest beta on the slider (< 1)                         default 0.99
 *   title      string                                                            default "The relativistic Doppler effect"
 *   caption    string   may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Arrow, Dot, FnPath, Label, Line, ParamPath, Plot, Rect, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { fmt } from '../kit/num';
import { dopplerFactor, gammaOf, toObserverAngle, toSourceAngle, wavelengthToRgb } from '../kit/rel-core';
import { Key, ReadGrid, relCaption } from '../kit/rel-ui';

const DEG = Math.PI / 180;
const T = ({ children }: { children: string }) => <Tex>{children}</Tex>;

function colourName(nm: number): string {
  if (nm < 380) return 'ultraviolet';
  if (nm > 750) return 'infrared';
  if (nm < 450) return 'violet';
  if (nm < 495) return 'blue';
  if (nm < 570) return 'green';
  if (nm < 590) return 'yellow';
  if (nm < 620) return 'orange';
  return 'red';
}

function Spectrum({ l0, l1 }: { l0: number; l1: number }) {
  const lo = 300;
  const hi = 850;
  const stripes = useMemo(() => {
    const out: { x: number; c: string }[] = [];
    for (let nm = 380; nm < 750; nm += 5) {
      const rgb = wavelengthToRgb(nm + 2.5)!;
      out.push({ x: nm, c: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` });
    }
    return out;
  }, []);
  const clampNm = (v: number) => Math.min(hi - 2, Math.max(lo + 2, v));
  return (
    <Plot view={[lo, hi, 0, 1]} aspect={0.16} minHeight={74} maxHeight={96} grid={false} axes={false} label="Visible spectrum with emitted and observed wavelengths">
      {stripes.map((s) => (
        <Rect key={s.x} x={s.x} y={0.3} w={5.4} h={0.45} fill={s.c} opacity={1} />
      ))}
      <Label x={340} y={0.52} anchor="middle" dy={4} size={10}>
        UV
      </Label>
      <Label x={800} y={0.52} anchor="middle" dy={4} size={10}>
        IR
      </Label>
      <Segment x1={clampNm(l0)} y1={0.2} x2={clampNm(l0)} y2={0.85} color="var(--color-ink)" width={2} dash="3 2" />
      <Segment x1={clampNm(l1)} y1={0.2} x2={clampNm(l1)} y2={0.85} color="var(--color-ink)" width={3} />
      <Label x={clampNm(l0)} y={0.85} anchor="middle" dy={-4} dx={0} size={10}>
        emitted
      </Label>
      <Label x={clampNm(l1)} y={0.2} anchor="middle" dy={12} dx={0} size={10}>
        {`observed${l1 < lo || l1 > hi ? (l1 < lo ? ' ←' : ' →') : ''}`}
      </Label>
    </Plot>
  );
}

function Swatch({ nm, label }: { nm: number; label: string }) {
  const rgb = wavelengthToRgb(nm);
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-1.5">
      <span
        className="inline-block h-6 w-6 shrink-0 rounded-full border border-line"
        style={rgb ? { background: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})` } : { background: 'repeating-linear-gradient(45deg, var(--color-surface), var(--color-surface) 3px, var(--color-line) 3px, var(--color-line) 6px)' }}
        aria-hidden
      />
      <div className="min-w-0">
        <div className="text-xs text-ink-3">{label}</div>
        <div className="font-mono text-sm tabular-nums">
          {fmt(nm, 4)} nm · {colourName(nm)}
        </div>
      </div>
    </div>
  );
}

export default function RelDoppler({ params }: WidgetProps) {
  const betaMax = num(params, 'betaMax', 0.99);
  if (!(betaMax > 0 && betaMax < 1)) throw new Error('parameter "betaMax" must be between 0 and 1');
  const beta0 = num(params, 'beta', 0.3);
  if (!(beta0 >= 0 && beta0 < 1)) throw new Error('parameter "beta" must satisfy 0 <= beta < 1');
  const theta0 = num(params, 'theta', 0);
  if (!(theta0 >= 0 && theta0 <= 180)) throw new Error('parameter "theta" must be between 0 and 180 degrees');
  const lam0 = num(params, 'lambda', 656.3);
  if (!(lam0 > 0)) throw new Error('parameter "lambda" must be a positive wavelength in nm');
  const frame0 = oneOf(params, 'frame', ['observer', 'source'] as const, 'observer');
  const showFrames = bool(params, 'frames', true);

  const [beta, setBeta] = useState(Math.min(beta0, betaMax));
  const [thetaDeg, setTheta] = useState(theta0);
  const [lam, setLam] = useState(lam0);
  const [frame, setFrame] = useState<'observer' | 'source'>(frame0);
  const [classical, setClassical] = useState(bool(params, 'classical', true));

  const g = gammaOf(beta);
  const th = thetaDeg * DEG;
  const ratio = dopplerFactor(beta, th, frame);
  const lamObs = lam / ratio;
  const otherAngle = frame === 'observer' ? toSourceAngle(beta, th) : toObserverAngle(beta, th);
  const classicalRatio = frame === 'observer' ? 1 / (1 - beta * Math.cos(th)) : 1 + beta * Math.cos(th);
  const fRel = (d: number) => dopplerFactor(beta, d * DEG, frame);
  const fCl = (d: number) => (frame === 'observer' ? 1 / (1 - beta * Math.cos(d * DEG)) : 1 + beta * Math.cos(d * DEG));
  const yMax = Math.min(6, Math.max(2, Math.ceil(Math.max(fRel(0), classical ? fCl(0) : 0) * 1.1 * 2) / 2));
  const thLabel = frame === 'observer' ? '\\theta' : "\\theta'";

  // Scene: source at the origin moving along +x; the ray to the observer leaves at the chosen
  // angle (in the chosen frame); the dashed ray is the same light described in the other frame.
  const ray = (a: number, len = 1.15): [number, number] => [len * Math.cos(a), len * Math.sin(a)];
  const [rx, ry] = ray(th);
  const [ox, oy] = ray(otherAngle, 1.0);

  return (
    <Frame title={str(params, 'title', 'The relativistic Doppler effect')} caption={relCaption(params)}>
      {showFrames && (
        <Segmented
          label="Angle measured in"
          options={[
            { value: 'observer', label: "the observer's frame (θ)" },
            { value: 'source', label: "the source's rest frame (θ′)" },
          ]}
          value={frame}
          onChange={setFrame}
        />
      )}
      <div className="grid gap-3 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Plot view={[-1.35, 1.35, -0.35, 1.35]} equal aspect={0.8} minHeight={200} maxHeight={300} grid={false} axes={false} label="Source, velocity and the ray to the observer">
          <Segment x1={-1.3} y1={0} x2={1.3} y2={0} color="var(--plot-grid)" width={1} />
          <ParamPath x={(t) => 0.32 * Math.cos(t)} y={(t) => 0.32 * Math.sin(t)} t0={0} t1={th} samples={60} color="var(--plot-text)" width={1.25} />
          <Label x={0.4 * Math.cos(th / 2)} y={0.4 * Math.sin(th / 2)} dx={2} dy={4} size={12}>
            {frame === 'observer' ? 'θ' : 'θ′'}
          </Label>
          <Segment x1={0} y1={0} x2={ox} y2={oy} color="var(--plot-1)" width={1.5} dash="5 4" opacity={0.8} />
          <Arrow x1={0} y1={0} x2={rx} y2={ry} color="var(--plot-4)" width={2.25} />
          <Arrow x1={0} y1={0} x2={0.15 + 0.85 * beta} y2={0} color="var(--plot-2)" width={3} />
          <Dot x={0} y={0} r={7} color="var(--plot-2)" />
          <Label x={0} y={0} dx={-10} dy={18} anchor="end" color="var(--plot-2)" size={12} weight={600}>
            source
          </Label>
          <Label x={0.15 + 0.85 * beta} y={0} dx={4} dy={16} anchor="middle" color="var(--plot-2)" size={11}>
            v
          </Label>
          <Dot x={rx} y={ry} r={5} color="var(--plot-4)" />
          <Label x={rx} y={ry} dx={0} dy={-12} anchor={rx > 0.4 ? 'end' : rx < -0.4 ? 'start' : 'middle'} color="var(--plot-4)" size={12} weight={600}>
            to you
          </Label>
        </Plot>
        <Plot view={[0, 180, 0, yMax]} aspect={0.62} minHeight={200} maxHeight={300} xStep={30} xLabel={frame === 'observer' ? 'θ (deg)' : 'θ′ (deg)'} yLabel="ν/ν₀" label="Doppler factor against angle">
          <Line x={0} y={1} slope={0} color="var(--plot-axis)" width={1} dash="4 4" />
          <Line x={90} y={0} slope={Infinity} color="var(--plot-axis)" width={1} dash="4 4" />
          {classical && <FnPath f={fCl} color="var(--plot-4)" width={2} dash="6 4" />}
          <FnPath f={fRel} color="var(--plot-1)" width={2.5} />
          <Dot x={90} y={fRel(90)} r={3.5} color="var(--plot-1)" hollow />
          <Dot x={thetaDeg} y={ratio} r={6} color="var(--plot-2)" />
        </Plot>
      </div>
      <Key
        items={[
          { color: 'var(--plot-1)', label: frame === 'observer' ? 'relativistic 1/[γ(1 − β cos θ)]' : "relativistic γ(1 + β cos θ′)" },
          ...(classical ? [{ color: 'var(--plot-4)', label: frame === 'observer' ? 'classical moving source 1/(1 − β cos θ)' : "classical 1 + β cos θ′", dash: true }] : []),
          { color: 'var(--plot-1)', label: frame === 'observer' ? 'same ray in the source frame' : 'same ray in the observer frame', dash: true },
        ]}
      />
      <Spectrum l0={lam} l1={lamObs} />
      <ReadGrid cols={2}>
        <Swatch nm={lam} label="Emitted (source frame)" />
        <Swatch nm={lamObs} label="Observed (your frame)" />
      </ReadGrid>
      <Controls cols={3}>
        <Slider label={<T>{'\\beta = v/c'}</T>} value={beta} min={0} max={betaMax} step={0.005} onChange={setBeta} format={(v) => fmt(v, 3)} />
        <Slider label={<T>{`${thLabel}\\ (\\text{degrees})`}</T>} value={thetaDeg} min={0} max={180} step={1} onChange={setTheta} format={(v) => `${fmt(v, 3)}°`} />
        <Slider label={<T>{'\\lambda_0\\ (\\text{nm})'}</T>} value={lam} min={300} max={900} step={0.1} onChange={setLam} format={(v) => fmt(v, 4)} />
      </Controls>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => setTheta(0)}>approaching (0°)</Button>
        <Button onClick={() => setTheta(90)}>transverse (90°)</Button>
        <Button onClick={() => setTheta(180)}>receding (180°)</Button>
        <Toggle label="classical curve" checked={classical} onChange={setClassical} />
      </div>
      <ReadGrid cols={3}>
        <Readout label={<T>{'\\nu_{\\rm obs}/\\nu_0'}</T>} tone="var(--plot-2)" value={fmt(ratio, 5)} />
        <Readout label={<T>{'z = \\lambda_{\\rm obs}/\\lambda_0 - 1'}</T>} value={fmt(1 / ratio - 1, 4)} />
        <Readout label={<T>{'\\gamma'}</T>} value={fmt(g, 5)} />
        <Readout label={frame === 'observer' ? "Same ray's angle in source frame θ′" : "Same ray's angle in observer frame θ"} tone="var(--plot-1)" value={`${fmt(otherAngle / DEG, 4)}°`} />
        <Readout label="Classical prediction" tone="var(--plot-4)" value={fmt(classicalRatio, 5)} />
        <Readout label="At 90° in this frame" value={frame === 'observer' ? `1/γ = ${fmt(1 / g, 5)}` : `γ = ${fmt(g, 5)}`} />
      </ReadGrid>
    </Frame>
  );
}
