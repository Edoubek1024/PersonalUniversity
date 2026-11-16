/**
 * qc-shor: period finding, the quantum heart of Shor's algorithm, for a small N and base a, in
 * four steps.
 *   1. f(x) = a^x mod N for small x, showing its period r (computed classically here only so you
 *      can see it; the quantum computer never builds this table).
 *   2. The exact distribution of the first-register measurement y after modular exponentiation
 *      and the inverse QFT on q = 2^t: P(y) = sum_z |(1/q) sum_{x: a^x = z} e^{2 pi i x y/q}|^2,
 *      with peaks near the multiples of q/r. Click a bar (the highest bar nearby is chosen),
 *      move the slider, or sample y at random.
 *   3. The continued-fraction expansion of y/q and its convergents; the first denominator s < N
 *      with a^s = 1 (mod N) is the period (small multiples 2s..4s are tried if none works).
 *   4. The classical finish: if r is even and a^(r/2) is not -1 (mod N), gcd(a^(r/2) +- 1, N)
 *      are factors of N; otherwise the run fails and you try another y or a.
 *
 * Params:
 *   N         number   odd composite, not a prime power, 15 <= N <= 63           default 15
 *   a         number   base, 2 <= a < N                                          default 7
 *   t         number   qubits in the first register (q = 2^t), ceil(log2 N) <= t <= 12
 *                      default: the smallest t with 2^t >= N^2 (Shor's choice)
 *   y         number   initially selected measurement outcome, 0 <= y < 2^t       default none
 *   editable  boolean  controls for N, a and t                                   default true
 *   title     string                                                            default "Shor's period finding"
 *   caption   string   may contain $TeX$
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, str } from '../kit/params';
import { Dot, Label, Plot, Poly, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { fmt, gcd } from '../kit/num';
import { caption } from '../kit/calc3-ui';
import { contFrac, factorFromPeriod, modPow, order, recoverPeriod, shorDistribution, shorNs, MAX_MULTIPLE } from '../kit/qc-algo';

const NS = shorNs(15, 63);
const sup = (k: number) => String(k).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]).join('');
const T_MAX = 12;
const tMinFor = (N: number) => Math.ceil(Math.log2(N));
const tShor = (N: number) => Math.ceil(Math.log2(N * N));

function Bars({ P, sel, maxP }: { P: Float64Array; sel: number | null; maxP: number }) {
  const { sx, sy, width } = usePlot();
  const q = P.length;
  const d = useMemo(() => {
    // Merge bars that land on the same pixel column, keeping the tallest.
    const cols = new Map<number, number>();
    for (let y = 0; y < q; y++) {
      if (P[y] < maxP * 1e-4) continue;
      const px = Math.round(sx(y) * 2) / 2;
      cols.set(px, Math.max(cols.get(px) ?? 0, P[y]));
    }
    let out = '';
    for (const [px, p] of cols) out += `M${px},${sy(0).toFixed(1)}V${sy(p).toFixed(1)}`;
    return out;
  }, [P, sx, sy, q, maxP]);
  const bw = Math.max(1.25, Math.min(6, (width / q) * 0.7));
  return (
    <g>
      <path d={d} stroke="var(--plot-1)" strokeWidth={bw} fill="none" />
      {sel !== null && (
        <>
          <line x1={sx(sel)} x2={sx(sel)} y1={sy(0)} y2={sy(maxP * 1.1)} stroke="var(--plot-2)" strokeWidth={1} strokeDasharray="3 3" />
          <circle cx={sx(sel)} cy={sy(P[sel])} r={5} fill="var(--plot-2)" stroke="var(--color-surface)" strokeWidth={2} />
        </>
      )}
    </g>
  );
}

export default function QcShor({ params }: WidgetProps) {
  const N0 = num(params, 'N', 15);
  if (!NS.includes(N0)) throw new Error(`parameter "N" should be an odd composite that is not a prime power, between 15 and 63 (one of ${NS.join(', ')}); got ${N0}`);
  const a0 = num(params, 'a', 7);
  if (!Number.isInteger(a0) || a0 < 2 || a0 >= N0) throw new Error(`parameter "a" should be a whole number with 2 <= a < N = ${N0}`);
  const t0 = num(params, 't', Math.min(T_MAX, tShor(N0)));
  if (!Number.isInteger(t0) || t0 < tMinFor(N0) || t0 > T_MAX) throw new Error(`parameter "t" should be a whole number from ${tMinFor(N0)} to ${T_MAX} for N = ${N0}`);
  const y0 = params.y === undefined ? null : num(params, 'y', 0);
  if (y0 !== null && (!Number.isInteger(y0) || y0 < 0 || y0 >= 2 ** t0)) throw new Error(`parameter "y" should be a whole number from 0 to ${2 ** t0 - 1}`);
  const editable = bool(params, 'editable', true);

  const [N, setN] = useState(N0);
  const [a, setA] = useState(a0);
  const [t, setT] = useState(t0);
  const [ySel, setY] = useState<number | null>(y0);
  const q = 2 ** t;

  const g = gcd(a, N);
  const r = g === 1 ? order(a, N) : NaN;
  const P = useMemo(() => (g === 1 ? shorDistribution(r, q) : new Float64Array(0)), [g, r, q]);
  const maxP = useMemo(() => P.reduce((m, v) => Math.max(m, v), 0), [P]);

  const changeN = (n: number) => {
    setN(n);
    setA((x) => (x < n ? x : 2));
    setT(Math.min(T_MAX, tShor(n)));
    setY(null);
  };
  const sample = () => {
    let u = Math.random();
    for (let y = 0; y < q; y++) {
      u -= P[y];
      if (u <= 0) return setY(y);
    }
    setY(q - 1);
  };
  const pickNear = (x: number, width: number) => {
    const c = Math.round(x);
    const w = Math.max(1, Math.round((q / width) * 8));
    let best = Math.min(q - 1, Math.max(0, c));
    for (let y = Math.max(0, c - w); y <= Math.min(q - 1, c + w); y++) if (P[y] > P[best]) best = y;
    setY(best);
  };

  const controls = editable && (
    <div className="space-y-3">
      <Segmented label="N" options={NS.map((n) => ({ value: String(n), label: String(n) }))} value={String(N)} onChange={(v) => changeN(Number(v))} />
      <Controls cols={2}>
        <Slider label="Base a" value={a} min={2} max={N - 1} step={1} onChange={(v) => { setA(v); setY(null); }} format={(v) => String(v)} />
        <Slider label="First-register qubits t" value={t} min={tMinFor(N)} max={T_MAX} step={1} onChange={(v) => { setT(v); setY(null); }} format={(v) => `${v}, q = ${2 ** v}${v === tShor(N) ? ' (Shor)' : ''}`} />
      </Controls>
    </div>
  );

  if (g !== 1) {
    return (
      <Frame title={str(params, 'title', 'Shor’s period finding')} caption={caption(params)}>
        {controls}
        <Note tone="good">
          Lucky: gcd({a}, {N}) = {g}, so {g} is already a factor of {N} = {g} × {N / g}, found classically. Shor&apos;s algorithm only needs the quantum step when a is coprime to N; pick another a.
        </Note>
      </Frame>
    );
  }

  const X = Math.min(64, Math.max(12, 3 * r));
  const fx = Array.from({ length: X + 1 }, (_, x) => modPow(a, x, N));
  const cf = ySel !== null ? contFrac(ySel, q) : null;
  const rec = cf && ySel !== null && ySel > 0 ? recoverPeriod(cf, a, N) : null;
  const fac = rec?.r ? factorFromPeriod(a, rec.r, N) : null;

  return (
    <Frame title={str(params, 'title', 'Shor’s period finding')} caption={caption(params)}>
      {controls}

      <div>
        <div className="mb-1 text-[13px] font-semibold">
          1. f(x) = {a}<sup>x</sup> mod {N}
        </div>
        <Plot view={[-0.8, X + 0.8, -N * 0.22, N * 1.32]} aspect={0.3} minHeight={150} maxHeight={220} xLabel="x" label={`a^x mod N for x = 0 to ${X}`}>
          <Poly points={fx.map((v, x) => [x, v] as [number, number])} color="var(--plot-1)" width={1.25} opacity={0.5} />
          {fx.map((v, x) => (
            <Dot key={x} x={x} y={v} r={x < r ? 4.5 : 3} color={x < r ? 'var(--plot-4)' : 'var(--plot-1)'} />
          ))}
          <Segment x1={0} y1={N * 1.2} x2={r} y2={N * 1.2} color="var(--plot-4)" width={2} />
          <Segment x1={0} y1={N * 1.15} x2={0} y2={N * 1.25} color="var(--plot-4)" width={2} />
          <Segment x1={r} y1={N * 1.15} x2={r} y2={N * 1.25} color="var(--plot-4)" width={2} />
          <Label x={r} y={N * 1.2} dx={6} dy={4} color="var(--plot-4)" weight={600} size={12}>
            period r = {r}
          </Label>
        </Plot>
        <div className="mt-1 text-[12px] text-ink-3">
          {fx.slice(0, Math.min(fx.length, r + 2)).map((v, x) => `${a}${sup(x)} ≡ ${v}`).join(',  ')}, … The values repeat every r = {r} steps. (Shown classically for reference; the quantum computer finds r without this table.)
        </div>
      </div>

      <div>
        <div className="mb-1 text-[13px] font-semibold">
          2. Measure the first register after the inverse QFT (q = 2<sup>{t}</sup> = {q})
        </div>
        <Plot
          view={[-q * 0.01, q * 1.01, -maxP * 0.04, maxP * 1.16]}
          aspect={0.34}
          minHeight={170}
          maxHeight={240}
          xLabel="y"
          yTickFormat={(v) => fmt(v, 2)}
          label="Probability of each measurement outcome y"
          onPointerDown={(x, _y, e) => pickNear(x, (e.currentTarget as SVGSVGElement).clientWidth)}
        >
          <Bars P={P} sel={ySel} maxP={maxP} />
        </Plot>
        <div className="mt-1 text-[12px] text-ink-3">Peaks sit near the multiples of q/r = {fmt(q / r, 5)}. Click near a bar to pick it.</div>
        <div className="mt-2 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
          <Button primary onClick={sample}>
            Sample y
          </Button>
          <Slider label="Measured y" value={ySel ?? 0} min={0} max={q - 1} step={1} onChange={(v) => setY(v)} format={(v) => (ySel === null ? '—' : `${v}, P = ${fmt(P[v], 4)}`)} />
        </div>
      </div>

      {ySel === null || !cf ? (
        <Note>Pick or sample a measurement outcome y to continue.</Note>
      ) : (
        <>
          <div>
            <div className="mb-1 text-[13px] font-semibold">3. Continued fraction of y/q</div>
            <div className="text-[13px]">
              y/q = {ySel}/{q} = {fmt(ySel / q, 6)} = [{cf.terms[0]}; {cf.terms.slice(1).join(', ')}]
            </div>
            <div className="mt-1 overflow-x-auto">
              <table className="text-[13px] tabular-nums">
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-ink-2">convergent j/s</td>
                    {cf.convergents.map(([p, s], i) => (
                      <td key={i} className={`px-2 py-1 text-center font-mono ${s === rec?.from ? 'font-bold text-[var(--plot-2)]' : ''}`}>
                        {p}/{s}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-line">
                    <td className="px-2 py-1 text-ink-2">
                      {a}
                      <sup>s</sup> mod {N}
                    </td>
                    {cf.convergents.map(([, s], i) => (
                      <td key={i} className="px-2 py-1 text-center font-mono text-ink-2">
                        {s < N ? modPow(a, s, N) : `s ≥ N`}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-1 text-[13px]">
              {ySel === 0 ? (
                <span>y = 0 carries no information about r (it is 0/r for every r). Measure again.</span>
              ) : rec?.r ? (
                rec.multiple === 1 ? (
                  <span>
                    The first denominator below N with {a}
                    <sup>s</sup> ≡ 1 is s = <span className="font-semibold">{rec.r}</span>, so r = {rec.r}.
                  </span>
                ) : (
                  <span>
                    No denominator works directly (y/q is near j/r with j and r sharing a factor), but s = {rec.from} times {rec.multiple} gives {a}
                    <sup>{rec.r}</sup> ≡ 1, so r = {rec.r}.
                  </span>
                )
              ) : (
                <span>
                  No convergent denominator s &lt; N (or 2s to {MAX_MULTIPLE}s) satisfies {a}
                  <sup>s</sup> ≡ 1 (mod {N}). This y was unlucky (P(y) = {fmt(P[ySel], 4)}); measure again.
                </span>
              )}
            </div>
          </div>
          {rec?.r && fac && (
            <div>
              <div className="mb-1 text-[13px] font-semibold">4. Classical post-processing</div>
              {fac.ok ? (
                <Note tone="good">
                  r = {rec.r} is even and {a}
                  <sup>{rec.r / 2}</sup> mod {N} = {fac.half}, which is not ≡ −1, so gcd({fac.half} − 1, {N}) = {fac.f1} and gcd({fac.half} + 1, {N}) = {fac.f2}: {N} = {fac.f1} × {N / fac.f1}.
                </Note>
              ) : fac.reason === 'odd' ? (
                <Note tone="warn">r = {rec.r} is odd, so a<sup>r/2</sup> is not an integer power. The run fails: choose another a.</Note>
              ) : fac.reason === 'minus-one' ? (
                <Note tone="warn">
                  r = {rec.r} is even but {a}
                  <sup>{rec.r / 2}</sup> ≡ {fac.half} ≡ −1 (mod {N}), so gcd(a<sup>r/2</sup> + 1, N) = N and gcd(a<sup>r/2</sup> − 1, N) = 1: only trivial factors. Choose another a.
                </Note>
              ) : (
                <Note tone="warn">The recovered s = {rec.r} is a multiple of the true order, and a^(s/2) ≡ 1 gives only trivial factors. Measure again.</Note>
              )}
            </div>
          )}
        </>
      )}
      <Controls cols={3}>
        <Readout label="N, a" value={`${N}, ${a} (gcd 1)`} />
        <Readout label="Order r of a mod N" value={String(r)} tone="var(--plot-4)" />
        <Readout label="P(y) summed over the peaks near jq/r" value={fmt(peakMass(P, r, q), 4)} />
      </Controls>
    </Frame>
  );
}

/** Probability that y is the nearest integer to some j q / r (the "good" outcomes). */
function peakMass(P: Float64Array, r: number, q: number): number {
  let s = 0;
  const seen = new Set<number>();
  for (let j = 0; j < r; j++) {
    const y = Math.round((j * q) / r) % q;
    if (seen.has(y)) continue;
    seen.add(y);
    s += P[y];
  }
  return s;
}
