/**
 * low-rank-image: a small built-in greyscale picture (a matrix of brightness values), its SVD
 * computed in the browser, and the truncated SVD A_k for a rank slider. Shows the original
 * beside A_k (or the single term sigma_k u_k v_k^T, or the error A - A_k), the singular values
 * on a log scale with the kept ones highlighted, and the storage and error readouts of the
 * Eckart-Young theorem, the relative error both from the formula and computed directly.
 *
 * Params:
 *   images   which pictures to offer: "house", "letters", "rings", "noise"  default ["house", "letters", "noise"]
 *   image    the picture shown first                                       default first of images
 *   size     side of the square image in pixels (24 to 64)                 default 48
 *   k        initial rank                                                  default 5
 *   title    string                                                        default "Low-rank approximation of an image"
 *   caption  string
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { num as readNum, oneOf, str, strArray } from '../kit/params';
import { Dot, Plot, Segment } from '../kit/Plot';
import { Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { svdJacobi } from '../kit/la-core';

const IMAGES = ['house', 'letters', 'rings', 'noise'] as const;
type ImageName = (typeof IMAGES)[number];
const LABEL: Record<ImageName, string> = { house: 'House', letters: 'Letters', rings: 'Rings', noise: 'Noise' };

function MR({ label, value, tone }: { label: ReactNode; value: ReactNode; tone?: string }) {
  return <Readout label={<span className="normal-case tracking-normal">{label}</span>} value={value} tone={tone} />;
}

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Brightness in [0, 1] at (x, y) in [0, 1]^2 (y downwards). */
function makeImage(name: ImageName, n: number): number[][] {
  const r = rng(7);
  const noise = Array.from({ length: n }, () => Array.from({ length: n }, () => r()));
  const font: Record<string, string[]> = {
    L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  };
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      const x = (j + 0.5) / n;
      const y = (i + 0.5) / n;
      if (name === 'noise') return noise[i][j];
      if (name === 'rings') {
        const d = Math.hypot(x - 0.5, y - 0.5);
        return 0.5 + 0.45 * Math.cos(d * 38);
      }
      if (name === 'letters') {
        // "LA" in 5x7 blocks on a light background with a soft vertical gradient
        let v = 0.82 - 0.2 * y;
        const gx = Math.floor((x - 0.08) / 0.07);
        const gy = Math.floor((y - 0.25) / 0.07);
        if (gy >= 0 && gy < 7) {
          if (gx >= 0 && gx < 5 && font.L[gy][gx] === '1') v = 0.12;
          if (gx >= 7 && gx < 12 && font.A[gy][gx - 7] === '1') v = 0.12;
        }
        return v;
      }
      // house: sky gradient, sun, hills, a house with roof, door and windows
      let v = 0.92 - 0.3 * y;
      if (Math.hypot(x - 0.8, y - 0.18) < 0.09) v = 1;
      const hill = 0.68 + 0.05 * Math.sin(x * 7);
      if (y > hill) v = 0.38 + 0.08 * Math.sin(x * 23) * Math.sin(y * 19);
      const inBody = x > 0.22 && x < 0.62 && y > 0.5 && y < 0.86;
      const inRoof = y > 0.3 && y <= 0.5 && Math.abs(x - 0.42) < (y - 0.3) * 1.15;
      if (inRoof) v = 0.22;
      if (inBody) {
        v = 0.62;
        if (x > 0.38 && x < 0.47 && y > 0.66) v = 0.15;
        if ((x > 0.27 && x < 0.35 && y > 0.57 && y < 0.66) || (x > 0.51 && x < 0.59 && y > 0.57 && y < 0.66)) v = 0.97;
      }
      return v;
    }),
  );
}

export default function LowRankImage({ params }: WidgetProps) {
  const offered = strArray(params, 'images', ['house', 'letters', 'noise']) as ImageName[];
  for (const o of offered) if (!IMAGES.includes(o)) throw new Error(`unknown image "${o}"; use ${IMAGES.join(', ')}`);
  const first = oneOf(params, 'image', IMAGES, offered[0] ?? 'house');
  const n = Math.round(readNum(params, 'size', 48));
  if (n < 24 || n > 64) throw new Error('parameter "size" should be between 24 and 64');
  const [img, setImg] = useState<ImageName>(first);
  const [k, setK] = useState(clamp(Math.round(readNum(params, 'k', 5)), 1, n));
  const [show, setShow] = useState<'approx' | 'term' | 'error'>('approx');

  const A = useMemo(() => makeImage(img, n), [img, n]);
  const svd = useMemo(() => svdJacobi(A), [A]);
  const s = svd.s;
  const total = s.reduce((a, x) => a + x * x, 0);
  const tail = s.slice(k).reduce((a, x) => a + x * x, 0);
  const Ak = useMemo(() => {
    const out = Array.from({ length: n }, () => new Float64Array(n));
    const from = show === 'term' ? k - 1 : 0;
    for (let t = from; t < k; t++) {
      const u = svd.U[t];
      const v = svd.V[t];
      const st = s[t];
      for (let i = 0; i < n; i++) {
        const a = st * u[i];
        const row = out[i];
        for (let j = 0; j < n; j++) row[j] += a * v[j];
      }
    }
    return out;
  }, [svd, k, show, n, s]);
  const direct = useMemo(() => {
    let e = 0;
    if (show === 'term') return NaN;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) e += (A[i][j] - Ak[i][j]) ** 2;
    return Math.sqrt(e / total);
  }, [A, Ak, total, n, show]);
  const shown = useMemo(() => (show === 'error' ? Ak.map((r, i) => Array.from(r, (x, j) => 0.5 + (A[i][j] - x))) : show === 'term' ? normalise(Ak) : Ak.map((r) => Array.from(r))), [Ak, A, show]);

  const storage = k * (2 * n + 1);
  return (
    <Frame title={str(params, 'title', 'Low-rank approximation of an image')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {offered.length > 1 && <Segmented label="Picture" options={offered.map((o) => ({ value: o, label: LABEL[o] }))} value={img} onChange={(v) => setImg(v)} />}
      <div className="grid grid-cols-2 gap-3">
        <figure className="m-0">
          <Canvas data={A} label={`Original ${n} by ${n} image`} />
          <figcaption className="mt-1 text-center text-xs text-ink-2">Original, rank {s.filter((x) => x > 1e-9 * s[0]).length}</figcaption>
        </figure>
        <figure className="m-0">
          <Canvas data={shown} label={`Rank ${k} approximation`} />
          <figcaption className="mt-1 text-center text-xs text-ink-2">{show === 'approx' ? `Rank ${k} approximation A${sub(k)}` : show === 'term' ? `Term ${k} alone: σ${sub(k)}u${sub(k)}v${sub(k)}ᵀ (rescaled)` : `Error A − A${sub(k)} (grey = 0)`}</figcaption>
        </figure>
      </div>
      <Slider label={<>Rank k</>} value={k} min={1} max={n} step={1} onChange={setK} />
      <Segmented
        options={[
          { value: 'approx', label: 'Show Aₖ' },
          { value: 'term', label: 'Only the k-th term' },
          { value: 'error', label: 'The error' },
        ]}
        value={show}
        onChange={setShow}
      />
      <div>
        <div className="mb-1 text-[13px] text-ink-2">Singular values σᵢ on a log scale: the first k are kept (blue), the rest are dropped (zeros not drawn)</div>
        <Plot view={[0, n + 1, Math.log10(Math.min(...s.filter((x) => x > 1e-10 * s[0]))) - 0.3, Math.log10(s[0]) + 0.3]} aspect={0.3} minHeight={140} maxHeight={190} yTickFormat={(v) => (Number.isInteger(v) ? `1e${v}` : '')} yStep={1} label="Singular values on a log scale">
          <Segment x1={k + 0.5} y1={-20} x2={k + 0.5} y2={20} color="var(--plot-2)" width={1.5} dash="4 3" />
          {s.map((x, i) => (x > 1e-10 * s[0] ? <Dot key={i} x={i + 1} y={Math.log10(x)} r={i < k ? 3.5 : 2.5} color={i < k ? 'var(--plot-1)' : 'var(--plot-axis)'} /> : null))}
        </Plot>
      </div>
      <Controls cols={3}>
        <MR label={`Storage k(m + n + 1) vs mn`} value={`${storage} vs ${n * n} (${fmt((100 * storage) / (n * n), 3)}%)`} />
        <MR label="Relative error √(Σᵢ>ₖ σᵢ² / Σ σᵢ²)" value={fmt(Math.sqrt(tail / total), 4)} tone="var(--plot-2)" />
        <MR label="Computed ‖A − Aₖ‖_F / ‖A‖_F" value={show === 'term' ? '—' : fmt(direct, 4)} />
        <MR label="Spectral error ‖A − Aₖ‖₂ = σₖ₊₁" value={k < n ? fmt(s[k], 4) : '0'} />
        <MR label="σ₁, σₖ" value={`${fmt(s[0], 4)}, ${fmt(s[k - 1], 4)}`} />
        <MR label="Energy kept Σᵢ≤ₖ σᵢ² / Σ σᵢ²" value={`${fmt((100 * (total - tail)) / total, 4)}%`} />
      </Controls>
      {storage >= n * n && <Note tone="warn">At this rank the factors take more numbers than the picture itself.</Note>}
    </Frame>
  );
}

const SUBS = '₀₁₂₃₄₅₆₇₈₉';
const sub = (k: number) => String(k).replace(/\d/g, (d) => SUBS[Number(d)]);

function normalise(M: Float64Array[]): number[][] {
  let lo = Infinity;
  let hi = -Infinity;
  for (const r of M) for (const x of r) (lo = Math.min(lo, x)), (hi = Math.max(hi, x));
  const sc = hi - lo > 1e-12 ? 1 / (hi - lo) : 0;
  return M.map((r) => Array.from(r, (x) => (x - lo) * sc));
}

function Canvas({ data, label }: { data: number[][]; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const n = data.length;
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const im = ctx.createImageData(n, n);
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const v = Math.round(clamp(data[i][j], 0, 1) * 255);
        const o = 4 * (i * n + j);
        im.data[o] = im.data[o + 1] = im.data[o + 2] = v;
        im.data[o + 3] = 255;
      }
    ctx.putImageData(im, 0, 0);
  }, [data, n]);
  return <canvas ref={ref} width={n} height={n} role="img" aria-label={label} className="block aspect-square w-full rounded-md border border-line" style={{ imageRendering: 'pixelated' }} />;
}
