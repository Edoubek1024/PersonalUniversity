/**
 * function-explorer: graphs one or more functions of x with parameter sliders.
 *
 * Params:
 *   f        string | string[]   expressions in x and the slider names, e.g. "a*sin(b*x+c)"
 *   sliders  {name: [initial, min, max, step?]}   default {}
 *   view     [xMin, xMax, yMin, yMax]             default [-6, 6, -4, 4]
 *   equal    boolean   same scale on both axes     default false
 *   trig     boolean   x ticks at multiples of pi/2 default false
 *   title    string                               default "Function explorer"
 *   caption  string   Markdown-free sentence under the plot
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { tryCompile } from '../kit/expr';
import { bool, sliders as readSliders, str, strArray, view as readView } from '../kit/params';
import { Plot, FnPath } from '../kit/Plot';
import { Controls, Frame, Note, Slider } from '../kit/controls';
import { fmt } from '../kit/num';

const COLORS = ['var(--plot-1)', 'var(--plot-2)', 'var(--plot-3)', 'var(--plot-4)', 'var(--plot-5)', 'var(--plot-6)'];

function piFormat(v: number): string {
  const k = Math.round((v / Math.PI) * 2);
  if (Math.abs(v - (k * Math.PI) / 2) > 1e-9) return fmt(v);
  if (k === 0) return '0';
  const [num, den] = k % 2 === 0 ? [k / 2, 1] : [k, 2];
  const n = num === 1 ? '' : num === -1 ? '−' : fmt(num);
  return den === 1 ? `${n}π` : `${n}π/2`;
}

export default function FunctionExplorer({ params }: WidgetProps) {
  const exprs = typeof params.f === 'string' ? [str(params, 'f', 'x')] : strArray(params, 'f', ['x']);
  const defs = readSliders(params, 'sliders');
  const v = readView(params, 'view', [-6, 6, -4, 4]);
  const trig = bool(params, 'trig', false);
  const [values, setValues] = useState<Record<string, number>>(() => Object.fromEntries(defs.map((d) => [d.name, d.value])));
  const names = useMemo(() => ['x', ...defs.map((d) => d.name)], [defs.map((d) => d.name).join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const compiled = useMemo(() => exprs.map((e) => tryCompile(e, names)), [exprs.join('\u0000'), names]); // eslint-disable-line react-hooks/exhaustive-deps
  const errors = compiled.flatMap((c) => (c.error ? [c.error] : []));
  if (errors.length) throw new Error(errors[0]);

  const args = defs.map((d) => values[d.name]);
  const fns = compiled.map((c) => (x: number) => c.fn!(x, ...args));

  return (
    <Frame title={str(params, 'title', 'Function explorer')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={v} equal={bool(params, 'equal', false)} xStep={trig ? Math.PI / 2 : undefined} xTickFormat={trig ? piFormat : undefined} label={`Graph of ${exprs.join(', ')}`}>
        {fns.map((f, i) => (
          <FnPath key={i} f={f} color={COLORS[i % COLORS.length]} />
        ))}
      </Plot>
      {exprs.length > 1 && (
        <div className="flex flex-wrap gap-3 text-xs">
          {exprs.map((e, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 font-mono">
              <span className="inline-block h-0.5 w-4 rounded" style={{ background: COLORS[i % COLORS.length] }} />
              {e}
            </span>
          ))}
        </div>
      )}
      {defs.length > 0 ? (
        <Controls>
          {defs.map((d) => (
            <Slider key={d.name} label={d.name} value={values[d.name]} min={d.min} max={d.max} step={d.step} onChange={(x) => setValues((s) => ({ ...s, [d.name]: x }))} />
          ))}
        </Controls>
      ) : (
        <Note>No sliders: this graph is fixed.</Note>
      )}
    </Frame>
  );
}
