/**
 * laplace-square: the series solution of Laplace's equation on the unit square with
 * u(x, 1) = f(x) on the top edge and u = 0 on the other three edges,
 *   u(x, y) = Σ c_n sinh(nπy)/sinh(nπ) sin(nπx),   c_n = 2 ∫_0^1 f(x) sin(nπx) dx.
 * A colour map of u with N terms, a draggable probe with its value, the value at the centre
 * (exactly 1/4 when f = 1), and a horizontal slice u(x, y_probe) compared with f, showing how
 * boundary detail fades inside.
 *
 * Params:
 *   top      string   f(x) on the top edge                                     default "1"
 *   N        number   initial number of terms                                  default 9
 *   Nmax     number                                                            default 61
 *   probe    [x, y]                                                            default [0.5, 0.5]
 *   title, caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { num, numArray, str } from '../kit/params';
import { Plot, Draggable, FnPath, Segment, usePlot } from '../kit/Plot';
import { Controls, ExprInput, Frame, Readout, Slider } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { niceCeil } from '../kit/de-ode';

const nc = (s: string) => <span className="normal-case">{s}</span>;
const RES = 96;
// A colour ramp (dark blue to yellow) that reads in both themes.
const RAMP: [number, number, number][] = [
  [48, 18, 59],
  [65, 69, 171],
  [57, 121, 236],
  [27, 170, 223],
  [36, 208, 170],
  [113, 236, 100],
  [195, 240, 52],
  [250, 205, 52],
  [251, 128, 34],
  [218, 56, 8],
];
function color(s: number): [number, number, number] {
  const u = clamp(s, 0, 1) * (RAMP.length - 1);
  const i = Math.min(RAMP.length - 2, Math.floor(u));
  const f = u - i;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

/** sinh(nπy)/sinh(nπ) without overflow. */
function ratio(n: number, y: number): number {
  const k = n * Math.PI;
  return (Math.exp(k * (y - 1)) - Math.exp(-k * (y + 1))) / (1 - Math.exp(-2 * k));
}

function Heat({ u, lo, hi }: { u: Float64Array; lo: number; hi: number }) {
  const { sx, sy } = usePlot();
  const url = useMemo(() => {
    if (typeof document === 'undefined') return '';
    const cv = document.createElement('canvas');
    cv.width = RES;
    cv.height = RES;
    const ctx = cv.getContext('2d');
    if (!ctx) return '';
    const img = ctx.createImageData(RES, RES);
    for (let j = 0; j < RES; j++) {
      for (let i = 0; i < RES; i++) {
        const v = u[j * RES + i];
        const [r, g, b] = color((v - lo) / (hi - lo || 1));
        const o = ((RES - 1 - j) * RES + i) * 4; // row 0 of the image is the top (y = 1)
        img.data[o] = r;
        img.data[o + 1] = g;
        img.data[o + 2] = b;
        img.data[o + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    return cv.toDataURL();
  }, [u, lo, hi]);
  return <image href={url} x={sx(0)} y={sy(1)} width={sx(1) - sx(0)} height={sy(0) - sy(1)} preserveAspectRatio="none" style={{ imageRendering: 'auto' }} />;
}

export default function LaplaceSquare({ params }: WidgetProps) {
  const top0 = str(params, 'top', '1');
  const Nmax = Math.round(num(params, 'Nmax', 61));
  if (Nmax < 1 || Nmax > 300) throw new Error('parameter "Nmax" should be between 1 and 300');
  const probe0 = numArray(params, 'probe', [0.5, 0.5]);
  if (probe0.length !== 2) throw new Error('parameter "probe" should be [x, y]');
  const [src, setSrc] = useState(top0);
  const [N, setN] = useState(() => clamp(Math.round(num(params, 'N', 9)), 1, Nmax));
  const [probe, setProbe] = useState<[number, number]>([probe0[0], probe0[1]]);
  const compiled = useMemo(() => tryCompile(src, ['x']), [src]);
  if (compiled.error && src === top0) throw new Error(compiled.error);
  const f = useMemo(() => {
    const fn = compiled.fn;
    return fn ? (x: number) => fn(x) : () => 0;
  }, [compiled]);

  // c_n by Simpson's rule (ends nudged inwards so a jump at a corner is not sampled).
  const cn = useMemo(() => {
    const m = 4000;
    const h = 1 / m;
    const fx: number[] = [];
    for (let i = 0; i <= m; i++) {
      const v = f(i === 0 ? 1e-9 : i === m ? 1 - 1e-9 : i * h);
      fx.push(Number.isFinite(v) ? v : 0);
    }
    const out = new Float64Array(Nmax + 1);
    for (let n = 1; n <= Nmax; n++) {
      let s = 0;
      for (let i = 0; i <= m; i++) s += (i === 0 || i === m ? 1 : i % 2 ? 4 : 2) * fx[i] * Math.sin(n * Math.PI * i * h);
      const v = (2 * s * h) / 3;
      out[n] = Math.abs(v) < 1e-12 ? 0 : v;
    }
    return out;
  }, [f, Nmax]);

  const u = useMemo(
    () => (x: number, y: number) => {
      let s = 0;
      for (let n = 1; n <= N; n++) if (cn[n]) s += cn[n] * ratio(n, y) * Math.sin(n * Math.PI * x);
      return s;
    },
    [cn, N],
  );
  const grid = useMemo(() => {
    const g = new Float64Array(RES * RES);
    // Precompute the x and y factors: u = Σ c_n Y_n(y) X_n(x).
    const X: Float64Array[] = [];
    const Y: Float64Array[] = [];
    for (let n = 1; n <= N; n++) {
      const xs = new Float64Array(RES);
      const ys = new Float64Array(RES);
      for (let i = 0; i < RES; i++) {
        const t = (i + 0.5) / RES;
        xs[i] = Math.sin(n * Math.PI * t);
        ys[i] = ratio(n, t);
      }
      X.push(xs);
      Y.push(ys);
    }
    for (let n = 1; n <= N; n++) {
      const c = cn[n];
      if (!c) continue;
      const xs = X[n - 1];
      const ys = Y[n - 1];
      for (let j = 0; j < RES; j++) {
        const cy = c * ys[j];
        if (Math.abs(cy) < 1e-14) continue;
        for (let i = 0; i < RES; i++) g[j * RES + i] += cy * xs[i];
      }
    }
    return g;
  }, [cn, N]);
  const [lo, hi] = useMemo(() => {
    let a = 0;
    let b = 0;
    for (let i = 0; i <= 200; i++) {
      const v = f(i / 200);
      if (Number.isFinite(v)) (a = Math.min(a, v)), (b = Math.max(b, v));
    }
    return [a, b > a ? b : a + 1];
  }, [f]);
  const sliceMax = niceCeil(Math.max(Math.abs(lo), Math.abs(hi)) * 1.25);

  return (
    <Frame title={str(params, 'title', "Laplace's equation on the unit square")} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <ExprInput label="Temperature on the top edge, f(x) for 0 < x < 1 (the other edges are held at 0)" value={src} onChange={setSrc} error={compiled.error} />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="min-w-0">
          <Plot view={[-0.05, 1.05, -0.05, 1.05]} equal aspect={1} minHeight={240} maxHeight={380} grid={false} xLabel="x" yLabel="y" label="Colour map of u(x, y)">
            <Heat u={grid} lo={lo} hi={hi} />
            <Segment x1={0} x2={1} y1={probe[1]} y2={probe[1]} color="var(--color-surface)" dash="4 4" width={1.5} />
            <Draggable x={probe[0]} y={probe[1]} onChange={(x, y) => setProbe([clamp(x, 0.005, 0.995), clamp(y, 0.005, 0.995)])} color="var(--color-surface)" label="Probe point" />
          </Plot>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-ink-3">
            <span>{fmt(lo)}</span>
            <span className="h-2 flex-1 rounded" style={{ background: `linear-gradient(to right, ${RAMP.map((c) => `rgb(${c.join(',')})`).join(',')})` }} />
            <span>{fmt(hi)}</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="mb-1 text-[13px] text-ink-2">Slice through the probe: u(x, {fmt(probe[1], 2)}) and the top edge f(x)</div>
          <Plot view={[0, 1, Math.min(0, lo) - 0.1 * sliceMax, sliceMax]} aspect={0.75} minHeight={200} maxHeight={320} xLabel="x" label="Slice of u">
            <FnPath f={f} color="var(--plot-4)" width={1.75} dash="5 4" />
            <FnPath f={(x) => u(x, 1 - 1e-9)} color="var(--plot-4)" width={1.25} opacity={0.6} />
            <FnPath f={(x) => u(x, probe[1])} color="var(--plot-1)" width={2.5} />
          </Plot>
          <div className="mt-1 text-xs text-ink-3">Dashed: f. Thin amber: the series on the top edge itself. Blue: the slice at the probe's height.</div>
        </div>
      </div>
      <Slider label="Terms N (n = 1 … N)" value={N} min={1} max={Nmax} step={1} format={(v) => String(Math.round(v))} onChange={(v) => setN(Math.round(v))} />
      <Controls cols={3}>
        <Readout label={nc(`u at the probe (${fmt(probe[0], 2)}, ${fmt(probe[1], 2)})`)} value={fmt(u(probe[0], probe[1]), 4)} tone="var(--plot-1)" />
        <Readout label={nc('u at the centre (½, ½)')} value={fmt(u(0.5, 0.5), 5)} />
        <Readout label={nc('First term alone at the centre')} value={fmt(cn[1] * ratio(1, 0.5), 5)} />
      </Controls>
    </Frame>
  );
}
