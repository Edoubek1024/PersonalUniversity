/**
 * newton-method: Newton's method drawn step by step. Drag the starting guess x₀ along the x-axis;
 * each Step follows the tangent at (xₙ, f(xₙ)) down to the axis to get xₙ₊₁. A table lists the
 * iterates. Failure cases are flagged: a horizontal tangent, divergence and cycling.
 *
 * Params:
 *   f         string    expression in x                          default "x^2 - 2"
 *   x0        number    starting guess                           default 1
 *   view      [xMin, xMax, yMin, yMax]                           default [-0.5, 3, -2.5, 4]
 *   maxSteps  number    most iterates allowed                    default 12
 *   name      string    TeX name of the function                 default "f(x)"
 *   examples  [{label, ...any of the above}]  tabs, e.g. a cycling or diverging case
 *   title, caption
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { num, str, view as readView } from '../kit/params';
import { Plot, FnPath, Line, Segment, Dot, Label, Draggable } from '../kit/Plot';
import { Button, Controls, Frame, Note, Readout, Slider, Tex } from '../kit/controls';
import { clamp } from '../kit/num';
import { compile1, d1, sig, type Fn } from '../kit/calc1-math';
import { ExampleTabs, Legend, NumTable, readExamples, ReadoutGrid } from '../kit/calc1-ui';

type Params = Record<string, unknown>;
type Status = 'running' | 'converged' | 'flat' | 'diverged' | 'cycle' | 'limit';

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (n: number) => String(n).split('').map((c) => SUB[+c]).join('');

function status(f: Fn, xs: number[], maxSteps: number): Status {
  const n = xs.length - 1;
  const x = xs[n];
  if (!Number.isFinite(x) || Math.abs(x) > 1e8) return 'diverged';
  const fx = f(x);
  if (Math.abs(fx) < 1e-13 || (n > 0 && Math.abs(x - xs[n - 1]) < 1e-14 * (1 + Math.abs(x)))) return 'converged';
  const d = d1(f, x);
  if (!Number.isFinite(d) || Math.abs(d) < 1e-12) return 'flat';
  if (n >= 3 && Math.abs(x - xs[n - 2]) < 1e-7 * (1 + Math.abs(x)) && Math.abs(xs[n - 1] - x) > 1e-4 * (1 + Math.abs(x))) return 'cycle';
  // Steps growing three times running while |f| grows: the iterates are running away.
  if (n >= 3) {
    const st = [1, 2, 3].map((k) => Math.abs(xs[n - k + 1] - xs[n - k]));
    const fs = [0, 1, 2].map((k) => Math.abs(f(xs[n - k])));
    if (st[0] > 1.5 * st[1] && st[1] > 1.5 * st[2] && fs[0] > fs[1] && fs[1] > fs[2]) return 'diverged';
  }
  if (n >= maxSteps) return 'limit';
  return 'running';
}

function Inner({ p }: { p: Params }) {
  const src = str(p, 'f', 'x^2 - 2');
  const f = useMemo(() => compile1(src, 'f'), [src]);
  const v = readView(p, 'view', [-0.5, 3, -2.5, 4]);
  const maxSteps = Math.max(1, Math.round(num(p, 'maxSteps', 12)));
  const name = str(p, 'name', 'f(x)');
  const start = num(p, 'x0', 1);
  const [xs, setXs] = useState<number[]>([start]);
  const st = status(f, xs, maxSteps);
  const last = xs[xs.length - 1];

  const step = (k = 1) =>
    setXs((cur) => {
      let out = cur;
      for (let i = 0; i < k; i++) {
        if (status(f, out, maxSteps) !== 'running' && !(status(f, out, maxSteps) === 'cycle' && out.length < maxSteps + 1)) break;
        const x = out[out.length - 1];
        const d = d1(f, x);
        if (!Number.isFinite(d) || Math.abs(d) < 1e-12) break;
        out = [...out, x - f(x) / d];
      }
      return out;
    });
  const restart = (x0: number) => setXs([clamp(x0, v[0], v[1])]);

  const steps = xs.slice(0, -1).map((x, i) => ({ x, y: f(x), next: xs[i + 1] }));
  const curD = d1(f, last);

  return (
    <>
      <Plot view={v} aspect={0.62} minHeight={260} maxHeight={440} label="Graph of f with the tangent lines of Newton's method">
        <FnPath f={f} />
        {st === 'running' && Number.isFinite(curD) && Number.isFinite(f(last)) && <Line x={last} y={f(last)} slope={curD} color="var(--plot-2)" width={1.25} dash="5 5" opacity={0.6} />}
        {steps.map((s, i) => {
          const o = 0.35 + (0.65 * (i + 1)) / steps.length;
          return (
            <g key={i} opacity={o}>
              <Segment x1={s.x} y1={0} x2={s.x} y2={s.y} color="var(--color-ink-3)" width={1.25} dash="3 3" />
              <Segment x1={s.x} y1={s.y} x2={s.next} y2={0} color="var(--plot-2)" width={2} />
              <Dot x={s.x} y={s.y} color="var(--plot-1)" r={3.5} />
            </g>
          );
        })}
        {Number.isFinite(f(last)) && <Segment x1={last} y1={0} x2={last} y2={f(last)} color="var(--color-ink-3)" width={1.25} dash="3 3" />}
        {xs.map((x, i) =>
          i === 0 ? null : (
            <g key={i}>
              <Dot x={x} y={0} color="var(--plot-4)" r={4} />
              {i <= 3 && (
                <Label x={x} y={0} dy={i % 2 ? 16 : -8} anchor="middle" size={11} color="var(--plot-4)">
                  x{sub(i)}
                </Label>
              )}
            </g>
          ),
        )}
        <Label x={xs[0]} y={0} dy={16} anchor="middle" size={11} color="var(--color-accent)" weight={600}>
          x₀
        </Label>
        <Draggable x={xs[0]} y={0} color="var(--color-accent)" label="Starting guess x₀" onChange={(x) => restart(x)} constrain={(x) => [x, 0]} />
      </Plot>
      <Legend items={[{ color: 'var(--plot-1)', label: <Tex>{`y=${name}`}</Tex> }, { color: 'var(--plot-2)', label: 'tangent lines' }, { color: 'var(--plot-4)', label: 'iterates on the x-axis' }]} />
      <ReadoutGrid>
        <Readout label={`x${sub(xs.length - 1)}`} value={sig(last, 10)} tone="var(--plot-4)" />
        <Readout label={`f(x${sub(xs.length - 1)})`} value={sig(f(last), 4)} />
        <Readout label="Steps" value={String(xs.length - 1)} />
      </ReadoutGrid>
      <Controls>
        <Slider label="x₀" value={xs[0]} min={v[0]} max={v[1]} step={(v[1] - v[0]) / 500} onChange={restart} />
        <div className="flex flex-wrap items-end gap-2 pb-1">
          <Button primary onClick={() => step(1)} disabled={(st !== 'running' && st !== 'cycle') || xs.length > maxSteps}>
            Step
          </Button>
          <Button onClick={() => step(maxSteps)} disabled={(st !== 'running' && st !== 'cycle') || xs.length > maxSteps}>
            Run
          </Button>
          <Button onClick={() => restart(xs[0])}>Reset</Button>
        </div>
      </Controls>
      {st === 'converged' && <Note tone="good">Converged after {xs.length - 1} steps: f(x) is zero to machine precision. Look at the table: near the root the number of correct digits roughly doubles each step.</Note>}
      {st === 'flat' && <Note tone="warn">The tangent at x{sub(xs.length - 1)} is horizontal (f′ = 0), so it never meets the x-axis: the next iterate is undefined.</Note>}
      {st === 'diverged' && <Note tone="warn">The iterates are running away: each tangent sends the next guess further from the root. Newton's method diverges from this start.</Note>}
      {st === 'cycle' && <Note tone="warn">The iterates are cycling: x{sub(xs.length - 1)} is back where x{sub(xs.length - 3)} was, so the method will repeat forever.</Note>}
      {st === 'limit' && <Note>Stopped after {maxSteps} steps without converging.</Note>}
      <NumTable
        head={['n', 'xₙ', 'f(xₙ)', "f′(xₙ)"]}
        rows={xs.map((x, i) => [String(i), sig(x, 12), sig(f(x), 4), sig(d1(f, x), 5)])}
        highlight={xs.length - 1}
      />
    </>
  );
}

export default function NewtonMethod({ params }: WidgetProps) {
  const examples = readExamples(params);
  const [ex, setEx] = useState(0);
  const p = examples.length ? examples[Math.min(ex, examples.length - 1)].params : params;
  return (
    <Frame title={str(params, 'title', "Newton's method")} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <ExampleTabs examples={examples} value={ex} onChange={setEx} />
      <Inner key={ex} p={p} />
    </Frame>
  );
}
