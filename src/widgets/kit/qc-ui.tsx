/**
 * Small UI pieces shared by the qc-* widgets: probability bars, phase swatches, a Dirac-notation
 * state line, and a Bloch-sphere backdrop drawn on a calc3-3d canvas.
 */
import type { ReactNode } from 'react';
import { line, text, type Proj, type Vec3 } from './calc3-3d';
import { rgba, type Colors } from './calc3-ui';
import { fmtC, ket, phaseColor, type State } from './qc-sim';

export function ProbBar({ p, color = 'var(--plot-1)', label }: { p: number; color?: string; label?: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="h-3 min-w-[3rem] flex-1 overflow-hidden rounded-sm bg-surface-2" role="presentation">
        <div className="h-full rounded-sm" style={{ width: `${Math.max(0, Math.min(1, p)) * 100}%`, background: color }} />
      </div>
      <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums">{label ?? p.toFixed(3)}</span>
    </div>
  );
}

export function PhaseSwatch({ phase, dark, size = 12 }: { phase: number | null; dark: boolean; size?: number }) {
  if (phase === null) return <span className="inline-block rounded-full border border-line" style={{ width: size, height: size }} />;
  return <span className="inline-block shrink-0 rounded-full" style={{ width: size, height: size, background: phaseColor(phase, dark) }} />;
}

/** Legend: the phase colours at 0, π/2, π and −π/2. */
export function PhaseLegend({ dark }: { dark: boolean }) {
  const items: [number, string][] = [
    [0, '0'],
    [Math.PI / 2, 'π/2'],
    [Math.PI, 'π'],
    [-Math.PI / 2, '−π/2'],
  ];
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-ink-3">
      phase colour:
      {items.map(([t, s]) => (
        <span key={s} className="inline-flex items-center gap-1">
          <PhaseSwatch phase={t} dark={dark} size={10} />
          {s}
        </span>
      ))}
    </span>
  );
}

/** "0.707|00⟩ + 0.707|11⟩" for the non-zero amplitudes (null when there are too many terms). */
export function diracString(s: State, maxTerms = 8): string | null {
  const terms: string[] = [];
  for (let i = 0; i < s.re.length; i++) {
    const p = s.re[i] ** 2 + s.im[i] ** 2;
    if (p < 1e-9) continue;
    let c = fmtC(s.re[i], s.im[i]);
    if (/[+−-] /.test(c.slice(1))) c = `(${c})`;
    terms.push(`${c}|${ket(i, s.n)}⟩`);
  }
  if (terms.length > maxTerms) return null;
  return terms.reduce((acc, t, k) => (k === 0 ? t : t.startsWith('−') ? `${acc} − ${t.slice(1)}` : `${acc} + ${t}`), '');
}

/** Sphere outline, equator and meridians (back halves dashed), axes, and the six cardinal states. */
export function drawBlochBackdrop(ctx: CanvasRenderingContext2D, P: Proj, C: Colors, opts: { labels?: boolean } = {}) {
  const halo = C.surface;
  const [cx, cy] = P.p([0, 0, 0]);
  ctx.beginPath();
  ctx.arc(cx, cy, P.s, 0, 2 * Math.PI);
  ctx.fillStyle = rgba(C.rgb('--plot-1'), C.dark ? 0.07 : 0.05);
  ctx.fill();
  ctx.strokeStyle = rgba(C.rgb('--plot-axis'), 0.8);
  ctx.lineWidth = 1.25;
  ctx.stroke();
  const circle = (f: (t: number) => Vec3) => {
    const N = 96;
    for (let k = 0; k < N; k++) {
      const a = f((2 * Math.PI * k) / N);
      const b = f((2 * Math.PI * (k + 1)) / N);
      const front = P.p(a)[2] + P.p(b)[2] >= 0;
      line(ctx, P, a, b, rgba(C.rgb('--plot-axis'), front ? 0.55 : 0.3), 1, front ? undefined : [3, 4]);
    }
  };
  circle((t) => [Math.cos(t), Math.sin(t), 0]);
  circle((t) => [Math.cos(t), 0, Math.sin(t)]);
  circle((t) => [0, Math.cos(t), Math.sin(t)]);
  const axes: [Vec3, string][] = [
    [[1, 0, 0], 'x'],
    [[0, 1, 0], 'y'],
    [[0, 0, 1], 'z'],
  ];
  for (const [u, nm] of axes) {
    line(ctx, P, [-u[0], -u[1], -u[2]], [u[0] * 1.25, u[1] * 1.25, u[2] * 1.25], rgba(C.rgb('--plot-axis'), 0.6), 1);
    text(ctx, P, [u[0] * 1.36, u[1] * 1.36, u[2] * 1.36], nm, C.text, halo, { size: 12, weight: 600 });
  }
  if (opts.labels !== false) {
    const pts: [Vec3, string, number, number][] = [
      [[0, 0, 1], '|0⟩', 18, -10],
      [[0, 0, -1], '|1⟩', 18, 10],
      [[1, 0, 0], '|+⟩', 0, 14],
      [[-1, 0, 0], '|−⟩', 0, -12],
      [[0, 1, 0], '|+i⟩', 0, 14],
      [[0, -1, 0], '|−i⟩', 0, -12],
    ];
    for (const [v, s, dx, dy] of pts) {
      const [x, y] = P.p(v);
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = C.text;
      ctx.fill();
      text(ctx, P, v, s, C.text, halo, { size: 12, weight: 500, dx, dy });
    }
  }
}
