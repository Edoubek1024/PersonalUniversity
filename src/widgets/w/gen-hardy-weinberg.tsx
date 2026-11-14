/**
 * gen-hardy-weinberg: allele and genotype frequencies in a population.
 *
 * "simulate" mode: starting from allele frequency p of A, shows the Hardy-Weinberg genotype
 * frequencies p², 2pq, q² and follows p over the generations. The thick line is the deterministic
 * (infinite-population) path under selection (relative fitnesses of AA, Aa, aa), mutation A → a at
 * rate μ and migration at rate m from a source with frequency p_m; each thin line is one
 * Wright-Fisher replicate population of N diploids (2N gene copies drawn binomially each
 * generation), showing genetic drift. Order within a generation: selection, mutation, migration,
 * then drift in sampling the next generation.
 *
 * "counts" mode: observed genotype counts in, allele frequencies, Hardy-Weinberg expected
 * counts, a chi-square test with 1 degree of freedom (3 classes − 1 − 1 estimated p), the verdict,
 * and observed versus expected heterozygosity.
 *
 * Params:
 *   mode         string   "simulate" | "counts"                                default "simulate"
 *   p            number   simulate: starting frequency of A (0 to 1)          default 0.5
 *   N            number   simulate: diploid population size (10 to 10000)     default 100
 *   generations  number   simulate: generations to run (10 to 500)            default 100
 *   replicates   number   simulate: replicate populations (0 to 30)           default 10
 *   wAA, wAa, waa number  simulate: relative fitnesses (0 to 1.5)            default 1, 1, 1
 *   mu           number   simulate: mutation rate A → a per generation (0 to 0.01)   default 0
 *   m            number   simulate: migration rate (0 to 0.2)                 default 0
 *   pm           number   simulate: frequency of A among migrants             default 0.5
 *   seed         number   simulate: random seed                               default 1
 *   AA, Aa, aa   number   counts: observed genotype counts                    default 298, 489, 213
 *   editable     boolean  sliders / count inputs                              default true
 *   title        string                                                       default "Hardy-Weinberg and evolutionary forces" / "Testing Hardy-Weinberg proportions"
 *   caption      string   what to try
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Slider } from '../kit/controls';
import { Plot, Poly } from '../kit/Plot';
import { fmt } from '../kit/num';
import { binomial, chiSqTest, fmtP, rng } from '../kit/gen-stats';
import { GC, NumField } from '../kit/gen-ui';

export default function GenHardyWeinberg({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['simulate', 'counts'] as const, 'simulate');
  return mode === 'simulate' ? <Simulate params={params} /> : <Counts params={params} />;
}

function inRange(name: string, v: number, lo: number, hi: number) {
  if (!(v >= lo && v <= hi)) throw new Error(`parameter "${name}" should be between ${lo} and ${hi}, got ${v}`);
  return v;
}

function GenotypeBars({ p }: { p: number }) {
  const q = 1 - p;
  const rows = [
    { g: 'AA', f: p * p, t: 'p²', c: GC.a },
    { g: 'Aa', f: 2 * p * q, t: '2pq', c: GC.c },
    { g: 'aa', f: q * q, t: 'q²', c: GC.d },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {rows.map((r) => (
        <div key={r.g} className="rounded-lg border border-line bg-surface-2 px-2 py-1.5">
          <div className="flex items-baseline justify-between text-xs text-ink-3">
            <span className="font-mono italic text-ink">{r.g}</span>
            <span>{r.t}</span>
          </div>
          <div className="mt-1 h-2 rounded bg-surface">
            <div className="h-2 rounded" style={{ width: `${r.f * 100}%`, background: r.c }} />
          </div>
          <div className="mt-0.5 font-mono text-[13px] tabular-nums">{fmt(r.f, 3)}</div>
        </div>
      ))}
    </div>
  );
}

interface SimParams {
  p: number;
  N: number;
  gens: number;
  reps: number;
  w: [number, number, number];
  mu: number;
  m: number;
  pm: number;
  seed: number;
}

function step(p: number, s: SimParams): number {
  const q = 1 - p;
  const [wAA, wAa, waa] = s.w;
  const wbar = p * p * wAA + 2 * p * q * wAa + q * q * waa;
  let x = wbar > 0 ? (p * p * wAA + p * q * wAa) / wbar : p;
  x = x * (1 - s.mu);
  x = (1 - s.m) * x + s.m * s.pm;
  return Math.min(1, Math.max(0, x));
}

function runSim(s: SimParams) {
  const det: [number, number][] = [[0, s.p]];
  let p = s.p;
  for (let t = 1; t <= s.gens; t++) {
    p = step(p, s);
    det.push([t, p]);
  }
  const u = rng(s.seed);
  const reps: [number, number][][] = [];
  const twoN = 2 * s.N;
  for (let r = 0; r < s.reps; r++) {
    let x = s.p;
    const path: [number, number][] = [[0, x]];
    for (let t = 1; t <= s.gens; t++) {
      x = binomial(twoN, step(x, s), u) / twoN;
      path.push([t, x]);
    }
    reps.push(path);
  }
  return { det, reps };
}

const REP_COLORS = ['var(--plot-2)', 'var(--plot-3)', 'var(--plot-4)', 'var(--plot-5)', 'var(--plot-6)'];

function Simulate({ params }: { params: Record<string, unknown> }) {
  const editable = bool(params, 'editable', true);
  const init: SimParams = {
    p: inRange('p', num(params, 'p', 0.5), 0, 1),
    N: Math.round(inRange('N', num(params, 'N', 100), 10, 10000)),
    gens: Math.round(inRange('generations', num(params, 'generations', 100), 10, 500)),
    reps: Math.round(inRange('replicates', num(params, 'replicates', 10), 0, 30)),
    w: [inRange('wAA', num(params, 'wAA', 1), 0, 1.5), inRange('wAa', num(params, 'wAa', 1), 0, 1.5), inRange('waa', num(params, 'waa', 1), 0, 1.5)],
    mu: inRange('mu', num(params, 'mu', 0), 0, 0.01),
    m: inRange('m', num(params, 'm', 0), 0, 0.2),
    pm: inRange('pm', num(params, 'pm', 0.5), 0, 1),
    seed: num(params, 'seed', 1),
  };
  const [s, setS] = useState(init);
  const set = <K extends keyof SimParams>(k: K, v: SimParams[K]) => setS((x) => ({ ...x, [k]: v }));
  const sim = useMemo(() => runSim(s), [s]);
  const finals = sim.reps.map((r) => r[r.length - 1][1]);
  const fixed = finals.filter((x) => x >= 1).length;
  const lost = finals.filter((x) => x <= 0).length;
  const meanFinal = finals.length ? finals.reduce((a, b) => a + b, 0) / finals.length : NaN;
  const detFinal = sim.det[sim.det.length - 1][1];

  return (
    <Frame title={str(params, 'title', 'Hardy-Weinberg and evolutionary forces')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="text-xs text-ink-3">Genotype frequencies in the first generation, from p = {fmt(s.p, 3)}, q = {fmt(1 - s.p, 3)}</div>
      <GenotypeBars p={s.p} />
      <Plot view={[0, s.gens, -0.03, 1.03]} aspect={0.5} minHeight={200} maxHeight={340} yStep={0.25} label="Frequency of allele A over generations" yTickFormat={(v) => fmt(v, 2)}>
        {sim.reps.map((r, i) => (
          <Poly key={i} points={r} color={REP_COLORS[i % REP_COLORS.length]} width={1.25} opacity={0.75} />
        ))}
        <Poly points={sim.det} color={GC.a} width={3.5} />
      </Plot>
      <div className="flex flex-wrap gap-x-4 text-[12px] text-ink-3">
        <span>
          <span className="mr-1 inline-block h-1 w-5 align-middle" style={{ background: GC.a }} />
          deterministic (no drift)
        </span>
        <span>thin lines: replicate populations of N = {s.N} (2N = {2 * s.N} gene copies)</span>
        <span>x: generation, y: frequency of A</span>
      </div>
      <Controls cols={3}>
        <Readout label="Replicates fixed for A / lost A / segregating" value={`${fixed} / ${lost} / ${sim.reps.length - fixed - lost}`} />
        <Readout label={`Mean p after ${s.gens} generations (replicates)`} value={Number.isFinite(meanFinal) ? fmt(meanFinal, 3) : '—'} tone={GC.b} />
        <Readout label="Deterministic p at the end" value={fmt(detFinal, 3)} tone={GC.a} />
      </Controls>
      {editable && (
        <>
          <Controls cols={3}>
            <Slider label="Starting p (frequency of A)" value={s.p} min={0} max={1} step={0.01} onChange={(v) => set('p', v)} />
            <Slider label="Population size N" value={Math.log10(s.N)} min={1} max={4} step={0.05} format={(v) => `${Math.round(Math.pow(10, v))}`} onChange={(v) => set('N', Math.round(Math.pow(10, v)))} />
            <Slider label="Generations" value={s.gens} min={10} max={500} step={10} onChange={(v) => set('gens', v)} />
            <Slider label="Replicates" value={s.reps} min={0} max={30} step={1} onChange={(v) => set('reps', v)} />
            <Slider label="Fitness of AA" value={s.w[0]} min={0} max={1.5} step={0.01} onChange={(v) => set('w', [v, s.w[1], s.w[2]])} />
            <Slider label="Fitness of Aa" value={s.w[1]} min={0} max={1.5} step={0.01} onChange={(v) => set('w', [s.w[0], v, s.w[2]])} />
            <Slider label="Fitness of aa" value={s.w[2]} min={0} max={1.5} step={0.01} onChange={(v) => set('w', [s.w[0], s.w[1], v])} />
            <Slider label="Mutation rate A → a (μ)" value={s.mu} min={0} max={0.01} step={0.0001} format={(v) => fmt(v, 4)} onChange={(v) => set('mu', v)} />
            <Slider label="Migration rate m" value={s.m} min={0} max={0.2} step={0.005} onChange={(v) => set('m', v)} />
            <Slider label="p among migrants" value={s.pm} min={0} max={1} step={0.01} onChange={(v) => set('pm', v)} />
          </Controls>
          <div className="flex flex-wrap gap-2">
            <Button primary onClick={() => set('seed', s.seed + 1)}>
              New replicates
            </Button>
            <Button onClick={() => setS(init)}>Reset</Button>
          </div>
        </>
      )}
      <Note>
        With equal fitnesses, no mutation and no migration, the deterministic line stays flat: Hardy-Weinberg. Drift alone moves each small population at random, and the chance of fixing A equals its starting frequency.
      </Note>
    </Frame>
  );
}

function Counts({ params }: { params: Record<string, unknown> }) {
  const editable = bool(params, 'editable', true);
  const c0 = [num(params, 'AA', 298), num(params, 'Aa', 489), num(params, 'aa', 213)];
  if (c0.some((c) => !(c >= 0) || !Number.isInteger(c))) throw new Error('parameters "AA", "Aa" and "aa" should be whole-number counts ≥ 0');
  const [c, setC] = useState(c0);
  const n = c[0] + c[1] + c[2];
  const p = n ? (2 * c[0] + c[1]) / (2 * n) : NaN;
  const q = 1 - p;
  const exp = [p * p, 2 * p * q, q * q];
  const ok = n > 0 && p > 0 && p < 1;
  const res = ok ? chiSqTest(c, exp, 0.05, 1) : null;
  const names = ['AA', 'Aa', 'aa'];
  return (
    <Frame title={str(params, 'title', 'Testing Hardy-Weinberg proportions')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-right text-[13px] tabular-nums">
          <thead className="text-ink-3">
            <tr>
              <th className="py-1 text-left font-medium">Genotype</th>
              <th className="font-medium">Observed</th>
              <th className="font-medium">HW frequency</th>
              <th className="font-medium">Expected</th>
              <th className="font-medium">(O − E)²/E</th>
            </tr>
          </thead>
          <tbody>
            {names.map((g, i) => (
              <tr key={g} className="border-t border-line">
                <td className="py-1 text-left font-mono italic">{g}</td>
                <td>{editable ? <NumField label={<span className="sr-only">Observed {g}</span>} value={c[i]} onChange={(v) => setC((x) => x.map((y, j) => (j === i ? Math.round(v) : y)))} /> : c[i]}</td>
                <td>
                  {['p²', '2pq', 'q²'][i]} = {ok ? fmt(exp[i], 4) : '—'}
                </td>
                <td>{res ? fmt(res.expected[i], 4) : '—'}</td>
                <td style={{ color: GC.b }}>{res ? fmt(res.terms[i], 4) : '—'}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-line font-semibold">
              <td className="py-1 text-left">Total</td>
              <td>{n}</td>
              <td>1</td>
              <td>{n}</td>
              <td style={{ color: GC.b }}>{res ? `χ² = ${fmt(res.chi2, 4)}` : ''}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {ok && res ? (
        <>
          <Controls cols={3}>
            <Readout label="p = (2·AA + Aa) / 2n" value={`(${2 * c[0]} + ${c[1]}) / ${2 * n} = ${fmt(p, 4)}`} tone={GC.a} />
            <Readout label="q = 1 − p" value={fmt(q, 4)} tone={GC.d} />
            <Readout label="df = 3 classes − 1 − 1 estimated (p)" value="1" />
            <Readout label="p-value" value={fmtP(res.p)} tone={GC.c} />
            <Readout label="Heterozygosity observed / expected" value={`${fmt(c[1] / n, 3)} / ${fmt(2 * p * q, 3)}`} />
            <Readout label="F = 1 − H_obs / H_exp" value={fmt(1 - c[1] / n / (2 * p * q), 3)} />
          </Controls>
          <Note tone={res.reject ? 'warn' : 'good'}>
            {res.reject
              ? `χ² = ${fmt(res.chi2, 4)} > 3.841: reject Hardy-Weinberg proportions at α = 0.05. ${c[1] / n < 2 * p * q ? 'There are too few heterozygotes, as inbreeding, population structure or selection against heterozygotes would cause.' : 'There are too many heterozygotes, as heterozygote advantage or mixing of two populations with different frequencies could cause.'}`
              : `χ² = ${fmt(res.chi2, 4)} ≤ 3.841: do not reject Hardy-Weinberg proportions at α = 0.05. The genotype counts are consistent with random mating at this locus (which does not prove that no force is acting).`}
          </Note>
        </>
      ) : (
        <Note tone="warn">Enter counts with both alleles present.</Note>
      )}
    </Frame>
  );
}
