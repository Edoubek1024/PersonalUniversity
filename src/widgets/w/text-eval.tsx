/**
 * text-eval: a ranked list of retrieved documents; click a rank to mark it relevant (or, in graded
 * mode, to cycle its grade 0 → 1 → 2 → 3). Shows P@k, R@k, F1@k, average precision with its terms,
 * nDCG@k, and the precision-recall curve with interpolated precision as a step line.
 *
 * Definitions match src/widgets/kit/text-ir.ts: AP = (1/R) sum of P@k over the ranks k that hold
 * a relevant document, where R counts every relevant document for the query, retrieved or not.
 * nDCG@k uses linear gain g / log2(i + 1); the ideal list is built from every judged relevant
 * document, including those never retrieved.
 *
 * Params:
 *   grades       number[]  grades of the ranked list, top first (5 to 20 entries; 0 = not relevant)
 *                          default [1, 0, 1, 1, 0, 0, 1, 0, 0, 0]
 *   missing      number    relevant documents that were never retrieved          default 1
 *   missingGrade number    the grade given to each of those (graded mode)        default 1
 *   graded       boolean   clicks cycle grades 0-3 instead of toggling 0/1       default false
 *   k            number    cutoff for P@k, R@k, F1@k and nDCG@k                  default the list length
 *   curve        boolean   draw the precision-recall curve                       default true
 *   title        string                                                         default "Ranked-list evaluation"
 *   caption      string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, str } from '../kit/params';
import { Button, Controls, Frame, Readout, Slider } from '../kit/controls';
import { Dot, Label, Plot, Poly } from '../kit/Plot';
import { clamp, fmt } from '../kit/num';
import { averagePrecision, interpolated, ndcg, prPoints } from '../kit/text-ir';

const GRADE_BG = ['', 'color-mix(in srgb, var(--plot-3) 35%, transparent)', 'color-mix(in srgb, var(--plot-3) 60%, transparent)', 'color-mix(in srgb, var(--plot-3) 90%, transparent)'];

export default function TextEval({ params }: WidgetProps) {
  const initGrades = numArray(params, 'grades', [1, 0, 1, 1, 0, 0, 1, 0, 0, 0]);
  if (initGrades.length < 5 || initGrades.length > 20) throw new Error('parameter "grades" should have 5 to 20 entries');
  const graded = bool(params, 'graded', false);
  const maxGrade = graded ? 3 : 1;
  if (initGrades.some((g) => !Number.isInteger(g) || g < 0 || g > maxGrade)) throw new Error(`parameter "grades" should hold whole numbers from 0 to ${maxGrade}`);
  const initMissing = num(params, 'missing', 1);
  if (!Number.isInteger(initMissing) || initMissing < 0 || initMissing > 20) throw new Error('parameter "missing" should be a whole number from 0 to 20');
  const missingGrade = clamp(Math.round(num(params, 'missingGrade', 1)), 1, maxGrade);
  const n = initGrades.length;
  const initK = num(params, 'k', n);
  if (!Number.isInteger(initK) || initK < 1 || initK > n) throw new Error(`parameter "k" should be a whole number from 1 to ${n}`);
  const showCurve = bool(params, 'curve', true);

  const [grades, setGrades] = useState(initGrades);
  const [missing, setMissing] = useState(initMissing);
  const [k, setK] = useState(initK);

  const R = grades.filter((g) => g > 0).length + missing;
  const pts = useMemo(() => prPoints(grades, R), [grades, R]);
  const ap = averagePrecision(grades, R);
  const allGrades = [...grades.filter((g) => g > 0), ...Array(missing).fill(missingGrade)];
  const nd = ndcg(grades, allGrades, k);
  const pk = pts[k - 1].p;
  const rk = pts[k - 1].r;
  const f1 = pk + rk > 0 ? (2 * pk * rk) / (pk + rk) : 0;
  const apTerms: string[] = [];
  grades.forEach((g, i) => {
    if (g > 0) apTerms.push(`${apTerms.length + 1}/${i + 1}`);
  });

  const toggle = (i: number) => setGrades((gs) => gs.map((g, j) => (j === i ? (g + 1) % (maxGrade + 1) : g)));

  // Curve: (0, P@1) is not a real point, so start from recall 0 at the interpolated maximum.
  const curve: [number, number][] = pts.map((pt) => [pt.r, pt.p]);
  const steps: [number, number][] = [];
  const levels = Array.from({ length: 11 }, (_, i) => i / 10);
  const interp = levels.map((r) => interpolated(pts, r));
  levels.forEach((r, i) => {
    steps.push([r, interp[i]]);
    if (i < 10) steps.push([levels[i + 1], interp[i]]);
  });

  return (
    <Frame
      title={str(params, 'title', 'Ranked-list evaluation')}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <Button onClick={() => (setGrades(initGrades), setMissing(initMissing), setK(initK))} title="Back to the starting list">
          Reset
        </Button>
      }
    >
      <div>
        <div className="mb-1 text-[13px] text-ink-2">{graded ? 'Click a rank to change its grade (0 to 3)' : 'Click a rank to mark it relevant or not'}</div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Ranked list">
          {grades.map((g, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={g > 0}
              aria-label={`Rank ${i + 1}, ${graded ? `grade ${g}` : g > 0 ? 'relevant' : 'not relevant'}`}
              className={`flex h-11 w-11 flex-col items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${i < k ? 'border-line' : 'border-dashed border-line opacity-60'} ${g > 0 ? 'text-ink' : 'bg-surface-2 text-ink-3'}`}
              style={g > 0 ? { background: GRADE_BG[g] } : undefined}
            >
              <span className="font-mono">{i + 1}</span>
              <span className="text-[10px] font-normal">{graded ? `g=${g}` : g > 0 ? 'rel' : '–'}</span>
            </button>
          ))}
        </div>
      </div>
      <Controls cols={2}>
        <Slider label="Cutoff k" value={k} min={1} max={n} step={1} onChange={setK} format={(v) => String(v)} />
        <Slider label="Relevant documents never retrieved" value={missing} min={0} max={10} step={1} onChange={setMissing} format={(v) => String(v)} />
      </Controls>
      <Controls cols={3}>
        <Readout label={`P@${k}`} value={fmt(pk)} tone="var(--plot-1)" />
        <Readout label={`R@${k} (R = ${R})`} value={fmt(rk)} />
        <Readout label={`F1@${k}`} value={fmt(f1)} />
        <Readout label="Average precision" value={fmt(ap, 4)} tone="var(--plot-2)" />
        <Readout label={`nDCG@${k}`} value={fmt(nd, 4)} tone="var(--plot-3)" />
        <Readout label="Relevant retrieved" value={`${R - missing} of ${R}`} />
      </Controls>
      <div className="overflow-x-auto rounded-lg border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-ink-2">
        AP = ({apTerms.length ? apTerms.join(' + ') : '0'}) / {R || 1} = {fmt(ap, 4)}
      </div>
      {showCurve && (
        <Plot view={[0, 1.16, 0, 1.1]} aspect={0.55} minHeight={200} maxHeight={320} xStep={0.2} yStep={0.2} xLabel="recall" yLabel="precision" label="Precision-recall curve">
          <Poly points={steps} color="var(--plot-2)" width={1.75} dash="5 4" />
          <Poly points={curve} color="var(--plot-1)" width={2} />
          {pts.map((pt, i) => (
            <Dot key={i} x={pt.r} y={pt.p} r={grades[i] > 0 ? 4.5 : 3} color="var(--plot-1)" hollow={grades[i] === 0} />
          ))}
          <Label x={1.0} y={1.04} anchor="end" dx={0} dy={0} size={11} color="var(--plot-2)">
            dashed: interpolated precision
          </Label>
        </Plot>
      )}
    </Frame>
  );
}
