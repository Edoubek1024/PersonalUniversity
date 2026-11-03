/**
 * matrix-transform: a 2x2 matrix as a map of the plane. The columns of A are the images of e1
 * and e2 (drag their tips or type the entries); the grid and the unit square are drawn
 * transformed, with the signed determinant, and a draggable test vector x with Ax.
 *
 * Modes (Segmented when more than one is offered):
 *   transform  grid, unit square, determinant and orientation
 *   eigen      real eigenvector lines; x snaps onto them and Ax = lambda x is reported; complex
 *              eigenvalues are read out
 *   svd        the unit circle and its image ellipse, v1, v2 and s1 u1, s2 u2; x moves on the circle
 *   basis      a second basis P = [b1 b2] (draggable), its grid, the coordinates of x in both bases
 *              and the matrix P^-1 A P
 *   powers     x, Ax, ..., A^k x for a step slider, with the eigenvector lines (diagonalisation and
 *              dynamics); optionally rescaled to constant length
 *   quadratic  level curves of x^T A x for a symmetric A, its principal axes and a definiteness test
 *
 * Params:
 *   A          2x2 matrix (rows)                     default [[1, 1], [0, 1]]
 *   mode       initial mode (see above)              default "transform"
 *   modes      modes offered                         default ["transform", "eigen", "svd", "basis"]
 *   x          test vector [x1, x2]                  default [1, 0.5]
 *   B          basis matrix (rows; its columns are b1, b2) default [[1, 1], [1, -1]]
 *   name       matrix letter                          default "A"
 *   vec        test vector letter                     default "x"
 *   basisName  letter for the basis matrix            default "P"
 *   basisVec   letter for the basis vectors           default "b"
 *   symmetric  keep A symmetric (forced in quadratic) default false
 *   presets    preset names: rotation, reflection, shear, projection, scaling, singular,
 *              symmetric, defective, rotation90, indefinite, definite, semidefinite
 *              default ["rotation", "reflection", "shear", "projection", "scaling", "singular"]
 *   k          initial power (powers mode)            default 3
 *   kMax       largest power                          default 10
 *   rescale    rescale A^k x to the length of x       default: true when the largest |eigenvalue| > 1.05
 *   view       half-width of the plot                 default: fitted to A, x and B
 *   bracket    "b" (square) or "p" (round) brackets   default "b"
 *   title      string                                 default "A matrix as a map of the plane"
 *   caption    string
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, matrix as readMatrix, num as readNum, numArray, oneOf, str, strArray } from '../kit/params';
import { Arrow, Draggable, Label, Line, Plot, Poly, Segment, usePlot } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider, Tex, Toggle } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import {

  cols2,
  cross2,
  det2,
  dot2,
  eig2,
  fromCols2,
  inv2,
  matPow2,
  mmul2,
  mul2,
  norm2,
  svd2,
  symEig2,
  tr2,
  unit2,
  type M2,
  type V2,
} from '../kit/la-core';
import { MatrixEditor, niceDir, texComplex, texMatrix, texNum, texTuple, type Bracket } from '../kit/la-ui';

const MODES = ['transform', 'eigen', 'svd', 'basis', 'powers', 'quadratic'] as const;
type Mode = (typeof MODES)[number];
const MODE_LABEL: Record<Mode, string> = { transform: 'Transform', eigen: 'Eigen', svd: 'SVD', basis: 'Change of basis', powers: 'Powers', quadratic: 'Quadratic form' };

const c30 = Math.sqrt(3) / 2;
const PRESETS: Record<string, { label: string; A: M2 }> = {
  rotation: { label: 'Rotation 30°', A: [[c30, -0.5], [0.5, c30]] },
  rotation90: { label: 'Rotation 90°', A: [[0, -1], [1, 0]] },
  reflection: { label: 'Reflection', A: [[-0.6, 0.8], [0.8, 0.6]] },
  shear: { label: 'Shear', A: [[1, 1], [0, 1]] },
  projection: { label: 'Projection', A: [[0.2, 0.4], [0.4, 0.8]] },
  scaling: { label: 'Scaling', A: [[2, 0], [0, 0.5]] },
  singular: { label: 'Singular', A: [[1, 2], [0.5, 1]] },
  symmetric: { label: 'Symmetric', A: [[2, 1], [1, 2]] },
  defective: { label: 'Defective', A: [[1, 1], [0, 1]] },
  definite: { label: 'Positive definite', A: [[4, 2], [2, 3]] },
  semidefinite: { label: 'Semidefinite', A: [[1, 2], [2, 4]] },
  indefinite: { label: 'Indefinite', A: [[1, 2], [2, 1]] },
};

const C = {
  a1: 'var(--plot-1)',
  a2: 'var(--plot-3)',
  x: 'var(--color-ink)',
  Ax: 'var(--plot-2)',
  pos: 'var(--plot-5)',
  neg: 'var(--plot-4)',
  eig: 'var(--plot-4)',
  s1: 'var(--plot-4)',
  s2: 'var(--plot-6)',
  b1: 'var(--plot-4)',
  b2: 'var(--plot-6)',
};

const snap = (v: number) => Math.round(v * 10) / 10;
const sub = (s: string) => s.replace(/_?1$/, '₁').replace(/_?2$/, '₂');

function asM2(m: number[][], key: string): M2 {
  if (m.length !== 2 || m[0].length !== 2) throw new Error(`parameter "${key}" should be a 2x2 matrix`);
  return [
    [m[0][0], m[0][1]],
    [m[1][0], m[1][1]],
  ];
}

export default function MatrixTransform({ params }: WidgetProps) {
  const A0 = asM2(readMatrix(params, 'A', [[1, 1], [0, 1]]), 'A');
  const B0 = asM2(readMatrix(params, 'B', [[1, 1], [1, -1]]), 'B');
  const x0v = numArray(params, 'x', [1, 0.5]);
  if (x0v.length !== 2) throw new Error('parameter "x" should be [x1, x2]');
  const x0: V2 = [x0v[0], x0v[1]];
  const mode0 = oneOf(params, 'mode', MODES, 'transform');
  const offered = strArray(params, 'modes', ['transform', 'eigen', 'svd', 'basis']);
  for (const m of offered) if (!MODES.includes(m as Mode)) throw new Error(`unknown mode "${m}" in "modes"; use ${MODES.join(', ')}`);
  const modes = (offered.includes(mode0) ? offered : [mode0, ...offered]) as Mode[];
  const name = str(params, 'name', 'A');
  const vec = str(params, 'vec', 'x');
  const basisName = str(params, 'basisName', 'P');
  const basisVec = str(params, 'basisVec', 'b');
  const symParam = bool(params, 'symmetric', false);
  const presetNames = strArray(params, 'presets', ['rotation', 'reflection', 'shear', 'projection', 'scaling', 'singular']);
  for (const p of presetNames) if (!PRESETS[p]) throw new Error(`unknown preset "${p}"; use ${Object.keys(PRESETS).join(', ')}`);
  const kMax = Math.round(readNum(params, 'kMax', 10));
  const k0 = Math.round(readNum(params, 'k', 3));
  const bracket = oneOf(params, 'bracket', ['b', 'p'] as const, 'b') as Bracket;
  const r0 = useMemo(() => {
    const lens = [...cols2(A0).map(norm2), norm2(x0), norm2(mul2(A0, x0)), ...cols2(B0).map(norm2)];
    return clamp(Math.ceil(Math.max(...lens) * 1.35 * 2) / 2, 2.5, 12);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const r = readNum(params, 'view', r0);
  if (!(r > 0)) throw new Error('parameter "view" should be a positive half-width');

  const [mode, setMode] = useState<Mode>(mode0);
  const [A, setA] = useState<M2>(A0);
  const [B, setB] = useState<M2>(B0);
  const [x, setX] = useState<V2>(() => (mode0 === 'svd' && norm2(x0) > 0 ? unit2(x0) : x0));
  const [k, setK] = useState(clamp(k0, 0, kMax));
  const eAll = eig2(A);
  const rho = eAll.kind === 'real' ? Math.max(...eAll.values.map(Math.abs)) : eAll.kind === 'complex' ? Math.hypot(eAll.re, eAll.im) : Math.abs(eAll.value);
  const [rescale, setRescale] = useState<boolean>(() => bool(params, 'rescale', rho > 1.05));
  const sym = symParam || mode === 'quadratic';

  const setEntry = (i: number, j: number, v: number) =>
    setA((M) => {
      const N: M2 = [[...M[0]], [...M[1]]] as M2;
      N[i][j] = v;
      if (sym && i !== j) N[j][i] = v;
      return N;
    });
  const [a1, a2] = cols2(A);
  const det = det2(A);
  const Ax = mul2(A, x);
  const lim = (v: number) => clamp(snap(v), -r, r);

  // Test-vector snapping onto eigenlines in eigen mode.
  const eigDirs: { dir: V2; lambda: number }[] = eAll.kind === 'real' ? eAll.values.map((l, i) => ({ dir: eAll.vectors[i], lambda: l })) : eAll.kind === 'repeated' ? [{ dir: eAll.vector, lambda: eAll.value }] : [];
  const moveX = (nx: number, ny: number) => {
    let p: V2 = [clamp(nx, -r, r), clamp(ny, -r, r)];
    if (mode === 'svd') {
      p = unit2(p);
    } else if (mode === 'eigen' && norm2(p) > 0.15) {
      for (const { dir } of eigDirs) {
        const along = dot2(p, dir);
        if (Math.abs(cross2(unit2(p), dir)) < 0.035) {
          p = [along * dir[0], along * dir[1]];
          return setX(p);
        }
      }
      p = [snap(p[0] * 2) / 2, snap(p[1] * 2) / 2];
    } else p = [snap(p[0]), snap(p[1])];
    setX(p);
  };

  const showColumnHandles = mode === 'transform' || mode === 'eigen' || mode === 'svd';
  const draggableColumns = showColumnHandles && !sym;

  return (
    <Frame title={str(params, 'title', 'A matrix as a map of the plane')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && <Segmented label="Show" options={modes.map((m) => ({ value: m, label: MODE_LABEL[m] }))} value={mode} onChange={(m) => (setMode(m), m === 'svd' && setX((p) => (norm2(p) > 0 ? unit2(p) : [1, 0])))} />}
      <Plot view={[-r, r, -r, r]} equal aspect={0.78} minHeight={300} maxHeight={500} label={`The plane transformed by ${name}`}>
        {mode === 'transform' && <TransformedGrid A={A} r={r} />}
        {mode === 'basis' && <TransformedGrid A={B} r={r} color="var(--plot-6)" />}
        {(mode === 'transform' || mode === 'eigen') && <UnitSquare A={A} faint={mode === 'eigen'} />}
        {mode === 'eigen' && eigDirs.map(({ dir, lambda }, i) => <EigenLine key={i} dir={dir} lambda={lambda} r={r} hot={norm2(x) > 0.05 && Math.abs(cross2(unit2(x), dir)) < 1e-6} />)}
        {mode === 'powers' && eigDirs.map(({ dir, lambda }, i) => <EigenLine key={i} dir={dir} lambda={lambda} r={r} hot={false} />)}
        {mode === 'svd' && <SvdPicture A={A} />}
        {mode === 'quadratic' && <LevelCurves A={A} r={r} />}
        {mode === 'basis' && <BasisPicture B={B} x={x} setB={setB} basisVec={basisVec} lim={lim} />}

        {/* original basis vectors, faint */}
        {(mode === 'transform' || mode === 'eigen') && (
          <>
            <Arrow x1={0} y1={0} x2={1} y2={0} color="var(--plot-axis)" width={1.5} head={7} />
            <Arrow x1={0} y1={0} x2={0} y2={1} color="var(--plot-axis)" width={1.5} head={7} />
          </>
        )}
        {showColumnHandles && (
          <>
            <Arrow x1={0} y1={0} x2={a1[0]} y2={a1[1]} color={C.a1} width={mode === 'transform' ? 2.75 : 2} />
            <Arrow x1={0} y1={0} x2={a2[0]} y2={a2[1]} color={C.a2} width={mode === 'transform' ? 2.75 : 2} />
            <Label x={a1[0]} y={a1[1]} color={C.a1} dx={8} dy={14} weight={600}>
              {`${name}e₁`}
            </Label>
            <Label x={a2[0]} y={a2[1]} color={C.a2} dx={8} dy={-8} weight={600}>
              {`${name}e₂`}
            </Label>
          </>
        )}

        {mode === 'powers' ? (
          <PowerTrail A={A} x={x} k={k} rescale={rescale} vec={vec} name={name} />
        ) : (
          <>
            {mode !== 'basis' && mode !== 'quadratic' && <Arrow x1={0} y1={0} x2={Ax[0]} y2={Ax[1]} color={C.Ax} width={2.5} />}
            {mode === 'basis' && <Arrow x1={0} y1={0} x2={Ax[0]} y2={Ax[1]} color={C.Ax} width={2} opacity={0.75} />}
            <Arrow x1={0} y1={0} x2={x[0]} y2={x[1]} color={C.x} width={2} />
            {mode !== 'quadratic' && (
              <Label x={Ax[0]} y={Ax[1]} color={C.Ax} dx={8} dy={-8} weight={600}>
                {`${name}${vec}`}
              </Label>
            )}
            <Label x={x[0]} y={x[1]} color={C.x} dx={-10} dy={-10} anchor="end" weight={600}>
              {vec}
            </Label>
          </>
        )}
        {draggableColumns && (
          <>
            <Draggable x={a1[0]} y={a1[1]} color={C.a1} step={0.1} label={`Tip of ${name}e1, the first column`} onChange={(px, py) => setA(fromCols2([lim(px), lim(py)], a2))} />
            <Draggable x={a2[0]} y={a2[1]} color={C.a2} step={0.1} label={`Tip of ${name}e2, the second column`} onChange={(px, py) => setA(fromCols2(a1, [lim(px), lim(py)]))} />
          </>
        )}
        <Draggable x={x[0]} y={x[1]} color={C.x} r={6} step={mode === 'svd' ? 0.05 : 0.1} label={`Test vector ${vec}`} onChange={moveX} />
      </Plot>

      {mode === 'powers' && <Slider label={<Tex>{`k \\text{ (power of } ${name})`}</Tex>} value={k} min={0} max={kMax} step={1} onChange={setK} />}
      {mode === 'svd' && (
        <Slider
          label={`Angle of ${vec} on the unit circle`}
          value={Math.round((((Math.atan2(x[1], x[0]) * 180) / Math.PI + 360) % 360) * 10) / 10}
          min={0}
          max={360}
          step={1}
          onChange={(deg) => setX([Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)])}
          format={(v) => `${fmt(v, 3)}°`}
        />
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <MatrixEditor A={A} name={name} onChange={setEntry} colors={[C.a1, C.a2]} />
        {mode === 'basis' && (
          <MatrixEditor
            A={B}
            name={basisName}
            colors={[C.b1, C.b2]}
            onChange={(i, j, v) =>
              setB((M) => {
                const N: M2 = [[...M[0]], [...M[1]]] as M2;
                N[i][j] = v;
                return N;
              })
            }
          />
        )}
        <div className="flex flex-wrap gap-1.5">
          <Button onClick={() => (setA(A0), setX(x0), setB(B0), setK(clamp(k0, 0, kMax)))} title="Back to the lesson's matrix">
            Reset
          </Button>
          {presetNames
            .filter((p) => !sym || isSym(PRESETS[p].A))
            .map((p) => (
              <Button key={p} onClick={() => setA(PRESETS[p].A)}>
                {PRESETS[p].label}
              </Button>
            ))}
        </div>
      </div>
      {mode === 'powers' && <Toggle label={`Rescale each ${vec}ₖ to the length of ${vec}₀ (direction only)`} checked={rescale} onChange={setRescale} />}

      <ModeReadouts mode={mode} A={A} B={B} x={x} k={k} name={name} vec={vec} basisName={basisName} basisVec={basisVec} bracket={bracket} />
      {sym && !symParam && <Note>The quadratic form needs a symmetric matrix, so editing one off-diagonal entry also sets the other.</Note>}
      {mode === 'transform' && (
        <Note tone={Math.abs(det) < 1e-9 ? 'warn' : 'info'}>
          {Math.abs(det) < 1e-9 ? (
            <>det {name} = 0: the plane is flattened onto a line (or a point), so {name} has no inverse.</>
          ) : det < 0 ? (
            <>det {name} &lt; 0: the image of the square is flipped (orientation reversed), shaded amber. Its area is |det {name}| = {fmt(Math.abs(det))}.</>
          ) : (
            <>det {name} &gt; 0: orientation is kept (cyan). The unit square becomes a parallelogram of area det {name} = {fmt(det)}.</>
          )}
        </Note>
      )}
    </Frame>
  );
}

const isSym = (A: M2) => Math.abs(A[0][1] - A[1][0]) < 1e-12;

/* ------------------------------------------------------------------ drawing pieces ------------------------------------------------------------------ */

function TransformedGrid({ A, r, color = 'var(--plot-1)' }: { A: M2; r: number; color?: string }) {
  const s = svd2(A).s;
  const N = Math.min(30, Math.ceil(r / Math.max(0.12, s[1])) + 1);
  const lines = [];
  for (let i = -N; i <= N; i++) {
    const p = mul2(A, [i, -N]);
    const q = mul2(A, [i, N]);
    const u = mul2(A, [-N, i]);
    const v = mul2(A, [N, i]);
    const main = i === 0;
    lines.push(<Segment key={`v${i}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} color={color} width={main ? 1.6 : 1} opacity={main ? 0.7 : 0.3} />);
    lines.push(<Segment key={`h${i}`} x1={u[0]} y1={u[1]} x2={v[0]} y2={v[1]} color={color} width={main ? 1.6 : 1} opacity={main ? 0.7 : 0.3} />);
  }
  return <g>{lines}</g>;
}

function UnitSquare({ A, faint }: { A: M2; faint?: boolean }) {
  const [a1, a2] = cols2(A);
  const d = det2(A);
  const col = d >= 0 ? C.pos : C.neg;
  return <Poly points={[[0, 0], a1, [a1[0] + a2[0], a1[1] + a2[1]], a2]} closed fill={col} fillOpacity={faint ? 0.1 : 0.22} color={col} width={faint ? 1 : 1.5} opacity={faint ? 0.6 : 1} />;
}

function EigenLine({ dir, lambda, r, hot }: { dir: V2; lambda: number; r: number; hot: boolean }) {
  const slope = Math.abs(dir[0]) < 1e-12 ? Infinity : dir[1] / dir[0];
  const t = r * 0.86;
  const lx = dir[0] * t;
  const ly = dir[1] * t;
  return (
    <g>
      <Line x={0} y={0} slope={slope} color={hot ? C.Ax : C.eig} width={hot ? 3 : 2} dash={hot ? undefined : '6 5'} opacity={hot ? 0.55 : 0.9} />
      <Label x={lx} y={ly} color={C.eig} dx={6} dy={dir[0] * dir[1] >= 0 ? 16 : -8} weight={600}>
        {`λ = ${fmt(lambda)}`}
      </Label>
    </g>
  );
}

function SvdPicture({ A }: { A: M2 }) {
  const { s, u, v } = svd2(A);
  const circle: [number, number][] = [];
  const ell: [number, number][] = [];
  for (let i = 0; i <= 160; i++) {
    const t = (2 * Math.PI * i) / 160;
    const p: V2 = [Math.cos(t), Math.sin(t)];
    circle.push(p);
    ell.push(mul2(A, p));
  }
  return (
    <g>
      <Poly points={circle} color="var(--plot-axis)" width={1.5} dash="5 4" />
      <Poly points={ell} closed fill="var(--plot-5)" fillOpacity={0.12} color="var(--plot-5)" width={2} />
      {[0, 1].map((i) => (
        <g key={i}>
          <Arrow x1={0} y1={0} x2={v[i][0]} y2={v[i][1]} color={i ? C.s2 : C.s1} width={2} dash="5 3" head={8} />
          <Arrow x1={0} y1={0} x2={s[i] * u[i][0]} y2={s[i] * u[i][1]} color={i ? C.s2 : C.s1} width={3} />
          <Label x={v[i][0]} y={v[i][1]} color={i ? C.s2 : C.s1} dx={-6} dy={14} anchor="end" size={12}>
            {i ? 'v₂' : 'v₁'}
          </Label>
          <Label x={s[i] * u[i][0]} y={s[i] * u[i][1]} color={i ? C.s2 : C.s1} dx={6} dy={-6} weight={600}>
            {i ? 'σ₂u₂' : 'σ₁u₁'}
          </Label>
        </g>
      ))}
    </g>
  );
}

function BasisPicture({ B, x, setB, basisVec, lim }: { B: M2; x: V2; setB: (B: M2) => void; basisVec: string; lim: (v: number) => number }) {
  const [b1, b2] = cols2(B);
  const Bi = inv2(B);
  const c = Bi ? mul2(Bi, x) : null;
  const p1: V2 | null = c ? [c[0] * b1[0], c[0] * b1[1]] : null;
  return (
    <g>
      {p1 && c && (
        <>
          <Segment x1={0} y1={0} x2={p1[0]} y2={p1[1]} color={C.b1} width={3} opacity={0.45} />
          <Segment x1={p1[0]} y1={p1[1]} x2={x[0]} y2={x[1]} color={C.b2} width={3} opacity={0.45} />
        </>
      )}
      <Arrow x1={0} y1={0} x2={b1[0]} y2={b1[1]} color={C.b1} width={2.75} />
      <Arrow x1={0} y1={0} x2={b2[0]} y2={b2[1]} color={C.b2} width={2.75} />
      <Label x={b1[0]} y={b1[1]} color={C.b1} dx={8} dy={14} weight={600}>
        {sub(`${basisVec}1`)}
      </Label>
      <Label x={b2[0]} y={b2[1]} color={C.b2} dx={8} dy={-8} weight={600}>
        {sub(`${basisVec}2`)}
      </Label>
      <Draggable x={b1[0]} y={b1[1]} color={C.b1} step={0.1} label={`Tip of basis vector ${basisVec}1`} onChange={(px, py) => setB(fromCols2([lim(px), lim(py)], b2))} />
      <Draggable x={b2[0]} y={b2[1]} color={C.b2} step={0.1} label={`Tip of basis vector ${basisVec}2`} onChange={(px, py) => setB(fromCols2(b1, [lim(px), lim(py)]))} />
    </g>
  );
}

function PowerTrail({ A, x, k, rescale, vec, name }: { A: M2; x: V2; k: number; rescale: boolean; vec: string; name: string }) {
  const { view, sx, sy } = usePlot();
  const L = norm2(x) || 1;
  const pts: V2[] = [];
  let p: V2 = x;
  for (let j = 0; j <= k; j++) {
    const n = norm2(p);
    pts.push(rescale && n > 0 ? [(p[0] / n) * L, (p[1] / n) * L] : p);
    p = mul2(A, p);
  }
  const R = Math.max(view[1], view[3]) * 4;
  const vis = pts.map(([a, b]) => [clamp(a, -R, R), clamp(b, -R, R)] as [number, number]);
  return (
    <g>
      {rescale && <Poly points={Array.from({ length: 121 }, (_, i) => [L * Math.cos((i * Math.PI) / 60), L * Math.sin((i * Math.PI) / 60)] as [number, number])} color="var(--plot-axis)" width={1} dash="3 4" />}
      {pts.slice(0, -1).map((_, j) => (
        <Arrow key={j} x1={0} y1={0} x2={vis[j][0]} y2={vis[j][1]} color={C.Ax} width={1.25} opacity={0.18 + (0.5 * j) / Math.max(1, k)} head={6} />
      ))}
      {!rescale && <Poly points={vis} color={C.Ax} width={1.25} dash="2 3" opacity={0.7} />}
      {vis.map(([a, b], j) => (
        <circle key={j} cx={sx(a)} cy={sy(b)} r={2.5} fill={C.Ax} opacity={0.6} />
      ))}
      <Arrow x1={0} y1={0} x2={vis[vis.length - 1][0]} y2={vis[vis.length - 1][1]} color={C.Ax} width={3} />
      <Label x={vis[vis.length - 1][0]} y={vis[vis.length - 1][1]} color={C.Ax} dx={8} dy={-8} weight={600}>
        {k === 0 ? '' : `${name}${k > 1 ? sup(k) : ''}${vec}₀${rescale ? ' (rescaled)' : ''}`}
      </Label>
      <Arrow x1={0} y1={0} x2={x[0]} y2={x[1]} color={C.x} width={2} />
      <Label x={x[0]} y={x[1]} color={C.x} dx={-10} dy={-10} anchor="end" weight={600}>
        {`${vec}₀`}
      </Label>
    </g>
  );
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (n: number) => String(n).replace(/\d/g, (d) => SUP[Number(d)]);
const SUBD = '₀₁₂₃₄₅₆₇₈₉';
const subN = (n: number) => String(n).replace(/\d/g, (d) => SUBD[Number(d)]);

function LevelCurves({ A, r }: { A: M2; r: number }) {
  const { values, vectors } = symEig2(A[0][0], A[0][1], A[1][1]);
  const [l1, l2] = values;
  const [q1, q2] = vectors;
  const at = (y1: number, y2: number): [number, number] => [y1 * q1[0] + y2 * q2[0], y1 * q1[1] + y2 * q2[1]];
  const tiny = 1e-9 * (1 + Math.abs(l1) + Math.abs(l2));
  const curves: { pts: [number, number][]; c: number }[] = [];
  const levels = [0.25, 1, 2.25, 4, 6.25, 9, 12.25, 16];
  const R = r * 1.6;
  const ellipse = (c: number, la: number, lb: number) => {
    const ra = Math.sqrt(c / la);
    const rb = Math.sqrt(c / lb);
    if (Math.min(ra, rb) > R) return null;
    return Array.from({ length: 145 }, (_, i) => {
      const t = (i * 2 * Math.PI) / 144;
      return at(ra * Math.cos(t), rb * Math.sin(t));
    });
  };
  const hyper = (c: number, branchSign: number, onFirst: boolean, la: number, lb: number) => {
    // la*y1^2 + lb*y2^2 = c with la*c > 0 on the first axis (onFirst) or the second.
    const a = Math.sqrt(Math.abs(c / (onFirst ? la : lb)));
    const b = Math.sqrt(Math.abs(c / (onFirst ? lb : la)));
    const U = Math.asinh(R / Math.max(1e-6, b)) + 0.1;
    return Array.from({ length: 121 }, (_, i) => {
      const u = -U + (2 * U * i) / 120;
      const main = branchSign * a * Math.cosh(u);
      const other = b * Math.sinh(u);
      return onFirst ? at(main, other) : at(other, main);
    });
  };
  const asym: V2[] = [];
  if (l1 > tiny && l2 > tiny) for (const c of levels) { const e = ellipse(c, l1, l2); if (e) curves.push({ pts: e, c }); }
  else if (l1 < -tiny && l2 < -tiny) for (const c of levels) { const e = ellipse(c, -l1, -l2); if (e) curves.push({ pts: e, c: -c }); }
  else if (l1 > tiny && l2 < -tiny) {
    for (const c of levels.slice(0, 5)) {
      for (const s of [1, -1]) {
        curves.push({ pts: hyper(c, s, true, l1, l2), c });
        curves.push({ pts: hyper(c, s, false, l1, l2), c: -c });
      }
    }
    const m = Math.sqrt(l1 / -l2);
    asym.push(unit2(at(1, m)), unit2(at(1, -m)));
  } else if (Math.abs(l2) <= tiny && Math.abs(l1) > tiny) {
    // semidefinite: lines y1 = +-sqrt(c/l1) parallel to q2
    for (const c of levels.slice(0, 5)) {
      for (const s of [1, -1]) {
        const y1 = s * Math.sqrt(c / Math.abs(l1));
        curves.push({ pts: [at(y1, -R * 2), at(y1, R * 2)], c: Math.sign(l1) * c });
      }
    }
    asym.push(q2);
  }
  return (
    <g>
      {asym.map((d, i) => (
        <Line key={i} x={0} y={0} slope={Math.abs(d[0]) < 1e-12 ? Infinity : d[1] / d[0]} color="var(--plot-axis)" dash="4 4" width={1.25} />
      ))}
      {curves.map(({ pts, c }, i) => (
        <Poly key={i} points={pts} color={c > 0 ? 'var(--plot-5)' : 'var(--plot-4)'} width={Math.abs(c) === 1 ? 2.5 : 1.25} opacity={Math.abs(c) === 1 ? 1 : 0.75} />
      ))}
      {[0, 1].map((i) => {
        const l = values[i];
        const q = vectors[i];
        if (!(l > tiny)) return <Line key={i} x={0} y={0} slope={Math.abs(q[0]) < 1e-12 ? Infinity : q[1] / q[0]} color={i ? C.s2 : C.s1} width={1} dash="2 4" />;
        const a = 1 / Math.sqrt(l);
        return (
          <g key={i}>
            <Arrow x1={0} y1={0} x2={a * q[0]} y2={a * q[1]} color={i ? C.s2 : C.s1} width={2.5} />
            <Label x={a * q[0]} y={a * q[1]} color={i ? C.s2 : C.s1} dx={6} dy={i ? 14 : -6} weight={600}>
              {`1/√λ${i ? '₂' : '₁'} = ${fmt(a)}`}
            </Label>
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ readouts ------------------------------------------------------------------ */

function ModeReadouts({ mode, A, B, x, k, name, vec, basisName, basisVec, bracket }: { mode: Mode; A: M2; B: M2; x: V2; k: number; name: string; vec: string; basisName: string; basisVec: string; bracket: Bracket }) {
  const Ax = mul2(A, x);
  const det = det2(A);
  const tr = tr2(A);
  const e = eig2(A);
  const tx = (v: V2) => texTuple(v);
  const eigText = () => {
    if (e.kind === 'complex') return `\\lambda = ${texComplex(e.re, e.im)},\\ ${texComplex(e.re, -e.im)}`;
    if (e.kind === 'real') return `\\lambda_1 = ${texNum(e.values[0])},\\ \\lambda_2 = ${texNum(e.values[1])}`;
    return `\\lambda = ${texNum(e.value)} \\text{ (twice)}`;
  };
  if (mode === 'transform')
    return (
      <Controls cols={3}>
        <MR label={`det ${name}`} value={fmt(det)} tone={Math.abs(det) < 1e-9 ? undefined : det > 0 ? C.pos : C.neg} />
        <MR label={`${vec}`} value={`(${fmt(x[0])}, ${fmt(x[1])})`} />
        <MR label={`${name}${vec} = ${vec}₁·${name}e₁ + ${vec}₂·${name}e₂`} value={`(${fmt(Ax[0])}, ${fmt(Ax[1])})`} tone={C.Ax} />
      </Controls>
    );
  if (mode === 'eigen') {
    const par = norm2(x) > 0.05 && Math.abs(cross2(unit2(x), unit2(Ax.some((v) => v !== 0) ? Ax : x))) < 1e-6;
    const lam = norm2(x) > 0 ? dot2(Ax, x) / dot2(x, x) : 0;
    return (
      <>
        <Controls cols={3}>
          <MR label="Eigenvalues" value={<Tex>{eigText()}</Tex>} />
          <MR label="Trace = sum, det = product" value={<Tex>{`${texNum(tr)},\\ ${texNum(det)}`}</Tex>} />
          <MR label={`${vec} → ${name}${vec}`} value={`(${fmt(x[0])}, ${fmt(x[1])}) → (${fmt(Ax[0])}, ${fmt(Ax[1])})`} />
        </Controls>
        {e.kind === 'complex' ? (
          <Note>
            Complex eigenvalues: no real direction is kept. {name} turns every vector (by about {fmt((Math.atan2(e.im, e.re) * 180) / Math.PI, 3)}° per application, with scale factor |λ| = {fmt(Math.hypot(e.re, e.im))}).
          </Note>
        ) : e.kind === 'scalar' ? (
          <Note>{name} = {fmt(e.value)}I: every vector is an eigenvector.</Note>
        ) : par || (e.kind !== 'real' && norm2(x) > 0.05 && Math.abs(cross2(unit2(x), e.vector)) < 1e-6) ? (
          <Note tone="good">
            {vec} lies on an eigenline: {name}{vec} = {fmt(lam)}·{vec}, so {name}{vec} is parallel to {vec}{Math.abs(Ax[0]) + Math.abs(Ax[1]) < 1e-9 ? ' (it is sent to 0, eigenvalue 0)' : ''}.
          </Note>
        ) : (
          <Note>
            Drag {vec} until {name}{vec} points along {vec} (or straight back). It snaps onto the dashed eigenlines{e.kind === 'repeated' ? '; this matrix is defective, with only one eigenline' : ''}.
          </Note>
        )}
      </>
    );
  }
  if (mode === 'svd') {
    const { s, u, v } = svd2(A);
    const dir = (w: V2) => {
      const nd = niceDir(w);
      return nd === w ? `= ${tx(w)}` : `\\propto ${tx(nd as V2)}`;
    };
    return (
      <>
      <div className="overflow-x-auto text-sm">
        <Tex display>{`${name}v_1 = \\sigma_1 u_1:\\ v_1 ${dir(v[0])},\\ u_1 ${dir(u[0])};\\qquad ${name}v_2 = \\sigma_2 u_2:\\ v_2 ${dir(v[1])},\\ u_2 ${dir(u[1])}`}</Tex>
      </div>
      <Controls cols={3}>
        <MR label="σ₁, σ₂" value={`${fmt(s[0])}, ${fmt(s[1])}`} />
        <MR label={`|${name}${vec}| on the unit circle`} value={`${fmt(norm2(Ax))}   (σ₂ ≤ |${name}${vec}| ≤ σ₁)`} tone={C.Ax} />
        <MR label="σ₁σ₂ = |det|" value={`${fmt(s[0] * s[1])} = ${fmt(Math.abs(det))}`} />
        <MR label="Condition number σ₁/σ₂" value={s[1] > 1e-12 ? fmt(s[0] / s[1]) : '∞ (singular)'} />
        <MR label="|eigenvalues|" value={e.kind === 'complex' ? `${fmt(Math.hypot(e.re, e.im))} (twice)` : e.kind === 'real' ? `${fmt(Math.abs(e.values[0]))}, ${fmt(Math.abs(e.values[1]))}` : fmt(Math.abs(e.value))} />
      </Controls>
      </>
    );
  }
  if (mode === 'basis') {
    const Bi = inv2(B);
    if (!Bi) return <Note tone="warn">The columns of {basisName} are parallel, so they are not a basis and {basisName} has no inverse.</Note>;
    const c = mul2(Bi, x);
    const Ap = mmul2(Bi, mmul2(A, B));
    const cAx = mul2(Bi, Ax);
    return (
      <>
        <Controls cols={3}>
          <MR label={`${vec} in standard coordinates`} value={`(${fmt(x[0])}, ${fmt(x[1])})`} />
          <MR label={`[${vec}] = ${basisName}⁻¹${vec} (coordinates in ${basisVec}₁, ${basisVec}₂)`} value={<Tex>{`${texTuple([...c])}`}</Tex>} />
          <MR label={`${name}${vec}: standard, and new coordinates`} value={<Tex>{`${texTuple([...Ax])},\\ ${texTuple([...cAx])}`}</Tex>} tone={C.Ax} />
        </Controls>
        <div className="overflow-x-auto text-sm">
          <Tex display>{`${name}' = ${basisName}^{-1}${name}${basisName} = ${texMatrix(Ap, bracket)},\\qquad \\operatorname{tr} = ${texNum(tr2(Ap))},\\ \\det = ${texNum(det2(Ap))}`}</Tex>
        </div>
        <Note>
          {vec} = {fmt(c[0])}·{basisVec}₁ + {fmt(c[1])}·{basisVec}₂: walk {fmt(c[0])} steps along {basisVec}₁ (amber) and {fmt(c[1])} along {basisVec}₂ (purple). {name}′ acts on new coordinates: {name}′·[{vec}] = [{name}{vec}].
        </Note>
      </>
    );
  }
  if (mode === 'powers') {
    const Ak = matPow2(A, k);
    const xk = mul2(Ak, x);
    let decomp = '';
    if (e.kind === 'real') {
      const P = fromCols2(e.vectors[0], e.vectors[1]);
      const Pi = inv2(P);
      if (Pi) {
        const n1 = niceDir(e.vectors[0]);
        const n2 = niceDir(e.vectors[1]);
        const s1 = norm2(e.vectors[0]) / norm2([n1[0], n1[1]]);
        const s2 = norm2(e.vectors[1]) / norm2([n2[0], n2[1]]);
        const c = mul2(Pi, x);
        const c1 = c[0] * s1;
        const c2 = c[1] * s2;
        decomp = `${vec}_0 = ${texNum(c1)}${texTuple(n1)} ${c2 < 0 ? '-' : '+'} ${texNum(Math.abs(c2))}${texTuple(n2)}|${name}^{${k}}${vec}_0 =${texNum(c1)}(${texNum(e.values[0])})^{${k}}${texTuple(n1)} ${c2 < 0 ? '-' : '+'} ${texNum(Math.abs(c2))}(${texNum(e.values[1])})^{${k}}${texTuple(n2)}`;
      }
    }
    const domVec: V2 | null = e.kind === 'real' ? e.vectors[Math.abs(e.values[0]) >= Math.abs(e.values[1]) ? 0 : 1] : null;
    const dom = domVec ? 0 : -1;
    const ang = domVec && norm2(xk) > 0 ? (Math.asin(Math.min(1, Math.abs(cross2(unit2(xk), domVec)))) * 180) / Math.PI : NaN;
    return (
      <>
        <Controls cols={3}>
          <MR label={`${vec}${subN(k)} = ${name}${sup(k)}${vec}₀`} value={`(${fmt(xk[0], 4)}, ${fmt(xk[1], 4)})`} tone={C.Ax} />
          <MR label="Eigenvalues" value={<Tex>{eigText()}</Tex>} />
          <MR
            label={dom >= 0 ? `Angle to dominant eigenline; ratio of entries` : `Ratio of entries`}
            value={`${dom >= 0 ? `${fmt(ang, 3)}°;  ` : ''}${Math.abs(xk[1]) > 1e-12 ? fmt(xk[0] / xk[1], 4) : '—'}`}
          />
        </Controls>
        <div className="overflow-x-auto text-sm">
          <Tex display>{`${name}^{${k}} = ${texMatrix(Ak, bracket, 4)}`}</Tex>
          {decomp &&
            decomp.split('|').map((line, i) => (
              <Tex key={i} display>
                {line}
              </Tex>
            ))}
        </div>
      </>
    );
  }
  // quadratic
  const a = A[0][0];
  const b = A[0][1];
  const d = A[1][1];
  const q = a * x[0] * x[0] + 2 * b * x[0] * x[1] + d * x[1] * x[1];
  const { values } = symEig2(a, b, d);
  const tiny = 1e-9 * (1 + Math.abs(a) + Math.abs(d));
  const [l1, l2] = values;
  const realCls =
    l2 > tiny ? 'positive definite' : l1 < -tiny ? 'negative definite' : l1 > tiny && l2 < -tiny ? 'indefinite' : l1 > tiny ? 'positive semidefinite' : l2 < -tiny ? 'negative semidefinite' : 'zero';
  return (
    <>
      <Controls cols={3}>
        <MR label={`${vec}ᵀ${name}${vec}`} value={fmt(q)} tone={q > 0 ? 'var(--plot-5)' : q < 0 ? 'var(--plot-4)' : undefined} />
        <MR label="Eigenvalues" value={`${fmt(values[0])}, ${fmt(values[1])}`} />
        <MR label={`Rayleigh quotient ${vec}ᵀ${name}${vec}/${vec}ᵀ${vec}`} value={norm2(x) > 0 ? fmt(q / dot2(x, x)) : '—'} />
        <MR label="Pivots" value={Math.abs(a) > 1e-12 ? `${fmt(a)}, ${fmt(det2(A) / a)}` : 'zero first pivot'} />
        <MR label="Leading minors" value={`${fmt(a)}, ${fmt(det2(A))}`} />
        <MR label="Verdict" value={realCls} tone={realCls === 'positive definite' ? 'var(--plot-3)' : undefined} />
      </Controls>
      <Note>
        Cyan curves are {vec}ᵀ{name}{vec} = 1/4, 1, 9/4, … (the thick one is 1); amber curves are negative levels. {realCls === 'positive definite' ? `Every level set is an ellipse with axes along the eigenvectors and semi-axes 1/√λ on the level 1.` : realCls === 'indefinite' ? 'An indefinite form has hyperbolas, and the dashed lines where it is 0.' : 'A zero eigenvalue stretches the ellipses into parallel lines.'}
      </Note>
    </>
  );
}



/** A Readout whose label keeps its case (the kit upper-cases labels, which garbles maths). */
function MR({ label, value, tone }: { label: string; value: ReactNode; tone?: string }) {
  return <Readout label={<span className="normal-case tracking-normal">{label}</span>} value={value} tone={tone} />;
}
