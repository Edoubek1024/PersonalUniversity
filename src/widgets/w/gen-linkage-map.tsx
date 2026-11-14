/**
 * gen-linkage-map: chromosome mapping from recombination.
 *
 * "three-point" mode: the eight classes of a three-point testcross in, the analysis out. The
 * widget finds the parental classes (the largest reciprocal pair) and the double crossovers (the
 * smallest pair), deduces the gene order (the gene whose allele is switched between the two is in
 * the middle), computes each interval's recombination frequency (single crossovers in that
 * interval plus double crossovers, over the total) in map units, the outer distance both as the
 * sum and as observed directly, the expected number of double crossovers, the coefficient of
 * coincidence and the interference, and draws the map. Edit the counts to see each step respond.
 *
 * "saturation" mode: simulates gametes for a chosen true map distance d (crossovers along the
 * interval are Poisson with mean d, no interference; a gamete is recombinant when the number of
 * crossovers is odd) and plots the observed recombination frequency against d with the Haldane
 * curve r = ½(1 − e^(−2d)), the naive line r = d and the 50% ceiling.
 *
 * Params:
 *   mode      string     "three-point" | "saturation"                                 default "three-point"
 *   genes     string[]   three gene symbols in the order the classes are written       default ["a", "b", "c"]
 *   classes   string[]   eight classes, each three space-separated alleles in the order of
 *                        genes, "+" for wild type or the gene symbol for the mutant allele,
 *                        e.g. "a + c"                                                  default an original dataset (see below)
 *   counts    number[]   eight counts, one per class                                  default [378, 47, 5, 68, 390, 45, 3, 64]
 *   editable  boolean    number inputs for the counts (three-point) / controls (saturation)  default true
 *   distance  number     saturation: starting true distance in Morgans (0 to 1.5)     default 0.3
 *   meioses   number     saturation: gametes scored per simulation                    default 500
 *   seed      number     saturation: random seed                                      default 1
 *   title     string                                                                  default "Three-point mapping" / "Why recombination frequency stops at 50%"
 *   caption   string     what to try
 *
 * Default dataset (1000 testcross progeny, true order a – c – b): classes
 * ["+ b +", "a b c", "a + +", "+ + c", "a + c", "+ + +", "+ b c", "a b +"] with counts
 * [378, 47, 5, 68, 390, 45, 3, 64]. Parentals a + c / + b +; DCOs a + + / + b c; a–c 14.0 cM,
 * c–b 10.0 cM, a–b 24.0 cM by summing (22.4 observed directly); expected DCO 14, c = 0.571, I = 0.429.
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, numArray, oneOf, str, strArray } from '../kit/params';
import { Button, Controls, Frame, Note, Readout, Segmented, Slider } from '../kit/controls';
import { Dot, FnPath, Label, Plot, Segment } from '../kit/Plot';
import { useElementSize } from '../kit/hooks';
import { fmt } from '../kit/num';
import { analyseThreePoint, haldane, parseClasses, type ClassKind } from '../kit/gen-map';
import { poisson, rng } from '../kit/gen-stats';
import { GC, NumField, Swatch } from '../kit/gen-ui';

const DEF_GENES = ['a', 'b', 'c'];
const DEF_CLASSES = ['+ b +', 'a b c', 'a + +', '+ + c', 'a + c', '+ + +', '+ b c', 'a b +'];
const DEF_COUNTS = [378, 47, 5, 68, 390, 45, 3, 64];

const KIND_COLOR: Record<ClassKind, string> = { parental: GC.a, sco1: GC.c, sco2: GC.d, dco: GC.b };

export default function GenLinkageMap({ params }: WidgetProps) {
  const mode = oneOf(params, 'mode', ['three-point', 'saturation'] as const, 'three-point');
  return mode === 'three-point' ? <ThreePointView params={params} /> : <Saturation params={params} />;
}

function ThreePointView({ params }: { params: Record<string, unknown> }) {
  const genes = strArray(params, 'genes', DEF_GENES);
  const classes = strArray(params, 'classes', params.genes ? [] : DEF_CLASSES);
  const counts0 = numArray(params, 'counts', params.genes ? [] : DEF_COUNTS);
  const editable = bool(params, 'editable', true);
  const mutant = useMemo(() => parseClasses(genes, classes), [genes.join(), classes.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  if (counts0.length !== 8) throw new Error('parameter "counts" needs 8 numbers, one per class');
  if (counts0.some((c) => c < 0 || !Number.isInteger(c))) throw new Error('parameter "counts" should be whole numbers ≥ 0');
  const [counts, setCounts] = useState(counts0);
  const a = useMemo(() => analyseThreePoint(genes, mutant, counts), [genes, mutant, counts]);
  const G = (i: number) => genes[i];
  const cls = (i: number) => classes[i].trim().split(/\s+/).join(' ');
  const [o1, mid, o2] = a.order;
  const P = a.parental.map(cls);
  const D = a.dco.map(cls);
  const ok = a.total > 0 && counts[a.parental[0]] + counts[a.parental[1]] > counts[a.dco[0]] + counts[a.dco[1]];
  const kindLabel: Record<ClassKind, string> = {
    parental: 'parental',
    sco1: `single crossover, ${G(o1)}–${G(mid)}`,
    sco2: `single crossover, ${G(mid)}–${G(o2)}`,
    dco: 'double crossover',
  };
  const r = (x: number) => fmt(x * 100, 3);

  return (
    <Frame title={str(params, 'title', 'Three-point mapping')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[300px] text-[13px] tabular-nums">
          <thead className="text-ink-3">
            <tr>
              <th className="py-1 text-left font-medium">Testcross class ({genes.join(' ')})</th>
              <th className="text-right font-medium">Count</th>
              <th className="pl-3 text-left font-medium">Class</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c, i) => (
              <tr key={i} className="border-t border-line align-middle">
                <td className="py-1 font-mono italic" style={{ borderLeft: `4px solid ${KIND_COLOR[a.kind[i]]}`, paddingLeft: 8 }}>
                  {cls(i)}
                </td>
                <td className="text-right">{editable ? <NumField label={<span className="sr-only">Count of {c}</span>} value={counts[i]} onChange={(v) => setCounts((cs) => cs.map((x, j) => (j === i ? Math.round(v) : x)))} /> : counts[i]}</td>
                <td className="pl-3 text-[12px]" style={{ color: KIND_COLOR[a.kind[i]] }}>
                  {ok ? kindLabel[a.kind[i]] : ''}
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-line font-semibold">
              <td className="py-1">Total</td>
              <td className="text-right">{a.total}</td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      {editable && (
        <div>
          <Button onClick={() => setCounts(counts0)}>Reset counts</Button>
        </div>
      )}
      {ok ? (
        <>
          <ol className="list-decimal space-y-1 pl-5 text-[13px] leading-6 text-ink-2">
            <li>
              Parentals (largest reciprocal pair): <i className="whitespace-nowrap pr-0.5 font-mono">{P[0]}</i> and <i className="whitespace-nowrap pr-0.5 font-mono">{P[1]}</i>, {counts[a.parental[0]] + counts[a.parental[1]]} in all.
            </li>
            <li>
              Double crossovers (smallest pair): <i className="whitespace-nowrap pr-0.5 font-mono">{D[0]}</i> and <i className="whitespace-nowrap pr-0.5 font-mono">{D[1]}</i>, {a.dcoN} in all.
            </li>
            <li>
              Compared with the parental they resemble, the double crossovers switch only <i>{G(mid)}</i>, so <i>{G(mid)}</i> is in the middle: order{' '}
              <i className="whitespace-nowrap">
                {G(o1)} – {G(mid)} – {G(o2)}
              </i>
              .
            </li>
            <li>
              <i>{G(o1)}</i>–<i>{G(mid)}</i>: ({a.sco1} + {a.dcoN}) / {a.total} = {r(a.r1)} cM. <i>{G(mid)}</i>–<i>{G(o2)}</i>: ({a.sco2} + {a.dcoN}) / {a.total} = {r(a.r2)} cM.
            </li>
            <li>
              <i>{G(o1)}</i>–<i>{G(o2)}</i>: {r(a.r1 + a.r2)} cM by adding the intervals, but only {r(a.rOuterObserved)} cM if scored directly, because a double crossover leaves the outer genes in parental combination.
            </li>
            <li>
              Expected double crossovers = {fmt(a.r1, 3)} × {fmt(a.r2, 3)} × {a.total} = {fmt(a.expectedDco, 4)}; coefficient of coincidence c = {a.dcoN} / {fmt(a.expectedDco, 4)} = {fmt(a.coc, 3)}; interference I = 1 − c = {fmt(a.interference, 3)}.
            </li>
          </ol>
          <MapDrawing names={[G(o1), G(mid), G(o2)]} d1={a.r1 * 100} d2={a.r2 * 100} />
          <Controls cols={3}>
            <Readout label={`${G(o1)}–${G(mid)}`} value={`${r(a.r1)} cM`} tone={GC.c} />
            <Readout label={`${G(mid)}–${G(o2)}`} value={`${r(a.r2)} cM`} tone={GC.d} />
            <Readout label="Interference I = 1 − c" value={fmt(a.interference, 3)} tone={GC.b} />
          </Controls>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Swatch color={GC.a}>parental</Swatch>
            <Swatch color={GC.c}>single crossover, region I</Swatch>
            <Swatch color={GC.d}>single crossover, region II</Swatch>
            <Swatch color={GC.b}>double crossover</Swatch>
          </div>
          {a.interference < 0 && <Note>Negative interference: more double crossovers than expected from the two single-interval frequencies.</Note>}
        </>
      ) : (
        <Note tone="warn">The parental pair should outnumber the double-crossover pair; enter counts from a testcross.</Note>
      )}
    </Frame>
  );
}

function MapDrawing({ names, d1, d2 }: { names: string[]; d1: number; d2: number }) {
  const [ref, { width }] = useElementSize<HTMLDivElement>();
  const W = width || 600;
  const pad = 30;
  const span = Math.max(1e-9, d1 + d2);
  const xs = [0, d1, d1 + d2].map((d) => pad + (d / span) * (W - 2 * pad));
  const y = 34;
  return (
    <div ref={ref} className="w-full">
      <svg width={W} height={72} viewBox={`0 0 ${W} 72`} className="block rounded-lg bg-surface" role="img" aria-label={`Map: ${names[0]} ${fmt(d1, 3)} cM ${names[1]} ${fmt(d2, 3)} cM ${names[2]}`}>
        <line x1={pad - 12} x2={W - pad + 12} y1={y} y2={y} stroke="var(--color-ink-2)" strokeWidth={3} strokeLinecap="round" />
        {xs.map((x, i) => (
          <g key={i}>
            <line x1={x} x2={x} y1={y - 9} y2={y + 9} stroke="var(--color-ink)" strokeWidth={2} />
            <text x={x} y={y - 14} textAnchor="middle" fontStyle="italic" fontSize={13} fontWeight={600} fill="var(--color-ink)">
              {names[i]}
            </text>
          </g>
        ))}
        <text x={(xs[0] + xs[1]) / 2} y={y + 24} textAnchor="middle" fontSize={12} fill={GC.c}>
          {fmt(d1, 3)} cM
        </text>
        <text x={(xs[1] + xs[2]) / 2} y={y + 24} textAnchor="middle" fontSize={12} fill={GC.d}>
          {fmt(d2, 3)} cM
        </text>
      </svg>
    </div>
  );
}

function simulate(d: number, n: number, seed: number): number {
  const u = rng(seed);
  let rec = 0;
  for (let i = 0; i < n; i++) if (poisson(d, u) % 2 === 1) rec++;
  return rec / n;
}

function Saturation({ params }: { params: Record<string, unknown> }) {
  const d0 = num(params, 'distance', 0.3);
  const n0 = num(params, 'meioses', 500);
  const seed0 = num(params, 'seed', 1);
  const editable = bool(params, 'editable', true);
  if (!(d0 >= 0 && d0 <= 1.5)) throw new Error('parameter "distance" should be between 0 and 1.5 Morgans');
  if (!(n0 >= 10 && n0 <= 100000 && Number.isInteger(n0))) throw new Error('parameter "meioses" should be a whole number from 10 to 100000');
  const [d, setD] = useState(d0);
  const [n, setN] = useState(n0);
  const [seed, setSeed] = useState(seed0);
  const [pts, setPts] = useState<{ d: number; r: number; n: number }[]>([]);
  const last = pts[pts.length - 1];
  const run = () => {
    const r = simulate(d, n, seed);
    setPts((p) => [...p, { d, r, n }]);
    setSeed((s) => s + 1);
  };
  const sweep = () => {
    const out: { d: number; r: number; n: number }[] = [];
    for (let i = 1; i <= 30; i++) out.push({ d: i * 0.05, r: simulate(i * 0.05, n, seed * 1000 + i), n });
    setPts((p) => [...p, ...out]);
    setSeed((s) => s + 1);
  };
  const nOpts = ['100', '500', '2000', '10000'];
  return (
    <Frame title={str(params, 'title', 'Why recombination frequency stops at 50%')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      <Plot view={[0, 1.5, 0, 0.6]} aspect={0.55} xStep={0.25} yStep={0.1} label="Recombination frequency against map distance" xTickFormat={(v) => `${fmt(v * 100)}`} yTickFormat={(v) => fmt(v, 2)}>
        <Segment x1={0} y1={0.5} x2={1.5} y2={0.5} dash="5 4" color="var(--plot-axis)" width={1.25} />
        <FnPath f={(x) => x} to={0.6} color={GC.d} dash="6 4" width={1.75} />
        <FnPath f={haldane} color={GC.a} width={2.5} />
        {pts.map((p, i) => (
          <Dot key={i} x={p.d} y={p.r} r={3.5} color={GC.b} />
        ))}
        <Segment x1={d} y1={0} x2={d} y2={haldane(d)} color={GC.a} dash="3 3" width={1} />
        <Dot x={d} y={haldane(d)} r={5.5} color={GC.a} hollow />
        <Label x={1.48} y={0.5} dx={0} dy={-6} anchor="end" size={11}>
          50% (unlinked)
        </Label>
        <Label x={0.5} y={0.5} dx={8} dy={4} color={GC.d} size={11}>
          r = d
        </Label>
        <Label x={1.05} y={0.3} dx={0} dy={0} anchor="middle" color={GC.a} size={11}>
          Haldane r = ½(1 − e^(−2d))
        </Label>
        <Label x={0} y={0.6} dx={30} dy={14} size={11}>
          recombination frequency r
        </Label>
        <Label x={1.5} y={0} dx={-4} dy={-18} anchor="end" size={11}>
          true distance d (cM)
        </Label>
      </Plot>
      {editable && (
        <Controls>
          <Slider label="True map distance d" value={d} min={0} max={1.5} step={0.01} format={(v) => `${fmt(v * 100, 3)} cM (${fmt(v, 3)} crossovers per gamete)`} onChange={setD} />
          <Segmented label="Gametes per simulation" options={nOpts.map((v) => ({ value: v, label: v }))} value={nOpts.includes(String(n)) ? String(n) : '500'} onChange={(v) => setN(parseInt(v, 10))} />
        </Controls>
      )}
      <div className="flex flex-wrap gap-2">
        <Button primary onClick={run}>
          Simulate {n} gametes at d = {fmt(d * 100, 3)} cM
        </Button>
        <Button onClick={sweep}>Sweep d from 5 to 150 cM</Button>
        <Button onClick={() => setPts([])} disabled={!pts.length}>
          Clear points
        </Button>
      </div>
      <Controls cols={3}>
        <Readout label="True distance d" value={`${fmt(d * 100, 3)} cM`} />
        <Readout label="Expected recombination frequency (Haldane)" value={`${fmt(haldane(d) * 100, 3)} %`} tone={GC.a} />
        <Readout
          label={last ? `Last simulation (d = ${fmt(last.d * 100, 3)} cM, n = ${last.n})` : 'Last simulation'}
          value={last ? `${fmt(last.r * 100, 3)} % ± ${fmt(100 * Math.sqrt((last.r * (1 - last.r)) / last.n), 2)}` : 'press Simulate'}
          tone={GC.b}
        />
      </Controls>
      <Note>
        Odd numbers of crossovers between two genes give a recombinant gamete; even numbers (including 2) restore the parental combination. As d grows, odd and even become equally likely, so the observed frequency levels off at 50% even though the genes are on the same chromosome.
      </Note>
    </Frame>
  );
}
