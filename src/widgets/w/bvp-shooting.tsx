/**
 * bvp-shooting: eigenvalues of y'' + λy = 0, y(0) = 0, with y(L) = 0 (Dirichlet) or y'(L) = 0
 * (Neumann) at the right end, found by shooting. The solution with y(0) = 0, y'(0) = 1 is
 * sin(√λ x)/√λ, x or sinh(√−λ x)/√−λ; λ is an eigenvalue exactly when it also meets the right-end
 * condition. The lower plot shows that "miss" as a function of λ, so the eigenvalues are its zeros.
 *
 * Params:
 *   L          number | string   interval length, e.g. "pi"                  default pi
 *   right      "dirichlet" | "neumann"   initial right-end condition          default "neumann"
 *   switchable boolean   offer both right-end conditions as buttons            default true
 *   lambda     number    initial λ                                             default 0.6 (scaled by π²/L²)
 *   lambdaMin  number                                                          default −1 (scaled)
 *   lambdaMax  number                                                          default 18 (scaled)
 *   title, caption   string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Plot, Dot, FnPath, Label, Segment } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { fmt } from '../kit/num';
import { niceCeil, numOrExpr } from '../kit/de-ode';

const nc = (s: string) => <span className="normal-case">{s}</span>;
type Right = 'dirichlet' | 'neumann';

/** y(x) and y'(x) for y'' + λy = 0, y(0) = 0, y'(0) = 1. */
function shoot(lam: number, x: number): [number, number] {
  if (Math.abs(lam) < 1e-12) return [x, 1];
  if (lam > 0) {
    const k = Math.sqrt(lam);
    return [Math.sin(k * x) / k, Math.cos(k * x)];
  }
  const k = Math.sqrt(-lam);
  return [Math.sinh(k * x) / k, Math.cosh(k * x)];
}

export default function BvpShooting({ params }: WidgetProps) {
  const L = numOrExpr(params, 'L', Math.PI);
  if (!(L > 0)) throw new Error('parameter "L" must be positive');
  const scale = (Math.PI * Math.PI) / (L * L);
  const r0 = oneOf(params, 'right', ['dirichlet', 'neumann'] as const, 'neumann');
  const switchable = bool(params, 'switchable', true);
  const lamMin = num(params, 'lambdaMin', -1 * scale);
  const lamMax = num(params, 'lambdaMax', 18 * scale);
  if (!(lamMin < lamMax)) throw new Error('parameters "lambdaMin" < "lambdaMax" required');
  const [right, setRight] = useState<Right>(r0);
  const [lam, setLam] = useState(() => num(params, 'lambda', 0.6 * scale));

  const miss = (l: number) => (right === 'dirichlet' ? shoot(l, L)[0] : shoot(l, L)[1]);
  const eig = (n: number) => (right === 'dirichlet' ? ((n * Math.PI) / L) ** 2 : (((2 * n - 1) * Math.PI) / (2 * L)) ** 2);
  const eigs = useMemo(() => {
    const out: number[] = [];
    for (let n = 1; n < 200; n++) {
      const e = right === 'dirichlet' ? ((n * Math.PI) / L) ** 2 : (((2 * n - 1) * Math.PI) / (2 * L)) ** 2;
      if (e > lamMax) break;
      out.push(e);
    }
    return out;
  }, [right, L, lamMax]);

  const [y, yp] = shoot(lam, L);
  const m = right === 'dirichlet' ? y : yp;
  // Nearest eigenvalue and its index.
  let nearest = 1;
  for (let n = 1; n < 400; n++) if (Math.abs(eig(n) - lam) < Math.abs(eig(nearest) - lam)) nearest = n;
  const step = (lamMax - lamMin) / 1000;
  const hit = Math.abs(eig(nearest) - lam) < step / 2 + 1e-12;

  // y(x) scale.
  const yMax = useMemo(() => {
    let mx = 0;
    for (let i = 0; i <= 200; i++) mx = Math.max(mx, Math.abs(shoot(lam, (L * i) / 200)[0]));
    return niceCeil(mx * 1.15 || 1);
  }, [lam, L]);
  const missRange = useMemo(() => {
    let mx = 0;
    for (let i = 0; i <= 400; i++) {
      const l = lamMin + ((lamMax - lamMin) * i) / 400;
      const v = right === 'dirichlet' ? shoot(l, L)[0] : shoot(l, L)[1];
      if (l >= 0) mx = Math.max(mx, Math.abs(v));
    }
    return niceCeil(mx * 1.3 || 1);
  }, [lamMin, lamMax, right, L]);

  const isPi = Math.abs(L - Math.PI) < 1e-9;
  const snap = (dir: 1 | -1) => {
    const list = eigs.length ? eigs : [eig(1)];
    const next = dir > 0 ? list.find((e) => e > lam + 1e-9) : [...list].reverse().find((e) => e < lam - 1e-9);
    if (next !== undefined) setLam(next);
  };
  const missName = right === 'dirichlet' ? 'y(L)' : "y'(L)";

  return (
    <Frame title={str(params, 'title', 'Shooting for eigenvalues')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {switchable && (
        <Segmented
          label="Condition at x = L"
          options={[
            { value: 'dirichlet', label: 'y(L) = 0' },
            { value: 'neumann', label: "y'(L) = 0" },
          ]}
          value={right}
          onChange={setRight}
        />
      )}
      <div className="text-[13px] text-ink-2">
        Solution of y″ + λy = 0 with y(0) = 0, y′(0) = 1. It solves the boundary value problem only when it also has {right === 'dirichlet' ? 'y(L) = 0' : 'zero slope at x = L'}.
      </div>
      <Plot view={[0, L, -yMax, yMax]} aspect={0.42} minHeight={190} maxHeight={300} xStep={isPi ? Math.PI / 4 : undefined} xTickFormat={isPi ? (v) => ({ 0: '0', 1: 'π/4', 2: 'π/2', 3: '3π/4', 4: 'π' } as Record<number, string>)[Math.round((4 * v) / Math.PI)] ?? fmt(v) : undefined} xLabel="x" yLabel="y" label="Shot solution">
        <FnPath f={(x) => shoot(lam, x)[0]} color={hit ? 'var(--plot-3)' : 'var(--plot-1)'} width={2.5} />
        {right === 'dirichlet' ? (
          <Dot x={L} y={0} r={6} color="var(--plot-3)" hollow />
        ) : (
          <>
            <Segment x1={L - 0.12 * L} x2={L} y1={y - 0.12 * L * yp} y2={y} color="var(--plot-2)" width={2.5} />
            <Segment x1={L - 0.12 * L} x2={L} y1={y} y2={y} color="var(--plot-3)" width={1.5} dash="4 3" />
          </>
        )}
        <Dot x={L} y={y} r={4.5} color={hit ? 'var(--plot-3)' : 'var(--plot-2)'} />
      </Plot>
      <div className="text-[13px] text-ink-2">
        The miss {missName} as a function of λ: eigenvalues are its zeros
      </div>
      <Plot view={[lamMin, lamMax, -missRange, missRange]} aspect={0.3} minHeight={150} maxHeight={220} xLabel="λ" label="Miss as a function of lambda">
        <FnPath f={miss} color="var(--plot-6)" width={2} />
        {eigs.map((e, i) => (
          <g key={e}>
            <Dot x={e} y={0} r={4} color="var(--plot-3)" />
            <Label x={e} y={0} dx={0} dy={-9} anchor="middle" size={10.5}>
              {`λ${'₁₂₃₄₅₆₇₈₉'[i] ?? ''}`}
            </Label>
          </g>
        ))}
        <Segment x1={lam} x2={lam} y1={-missRange} y2={missRange} color="var(--plot-axis)" dash="4 4" width={1.2} />
        <Dot x={lam} y={Math.max(-missRange, Math.min(missRange, m))} r={5} color={hit ? 'var(--plot-3)' : 'var(--plot-2)'} />
      </Plot>
      <Slider label="λ" value={lam} min={lamMin} max={lamMax} step={step} format={(v) => fmt(v, 4)} onChange={setLam} />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => snap(-1)}>Previous eigenvalue</Button>
        <Button onClick={() => snap(1)}>Next eigenvalue</Button>
      </div>
      <Controls cols={3}>
        <Readout label={nc(`Miss ${missName}`)} value={fmt(m, 4)} tone={hit ? 'var(--plot-3)' : 'var(--plot-2)'} />
        <Readout label={nc(`Nearest eigenvalue λ${nearest <= 9 ? '₁₂₃₄₅₆₇₈₉'[nearest - 1] : `_${nearest}`}`)} value={fmt(eig(nearest), 5)} />
        <Readout label={nc('Formula')} value={right === 'dirichlet' ? `(${nearest}π/L)²` : `((2·${nearest} − 1)π/2L)²`} />
      </Controls>
      {lam <= 0 ? (
        <Note>For λ ≤ 0 the shot solution is {lam < 0 ? 'sinh(√−λ x)/√−λ' : 'y = x'}: it never turns back, so it can never hit the condition. No eigenvalues here.</Note>
      ) : hit ? (
        <Note tone="good">Hit: λ = {fmt(lam, 5)} is an eigenvalue, and the curve is the eigenfunction sin(√λ x) (scaled).</Note>
      ) : null}
    </Frame>
  );
}
