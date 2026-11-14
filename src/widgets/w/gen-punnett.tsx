/**
 * gen-punnett: a cross between two parents for one to three genes. Shows each parent's gametes
 * with their probabilities, the Punnett square (one or two genes; a forked-line table for three),
 * and the genotype and phenotype ratios in lowest terms, as fractions and as counts out of
 * 4, 16 or 64. Dominance can be complete, incomplete or codominant per gene; one gene can be
 * X-linked (offspring split by sex); and for two genes an epistasis mode collapses the
 * 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb classes into 9:7, 9:3:4, 12:3:1, 15:1, 13:3 or 9:6:1.
 * Click a square (or a row of the phenotype table) to highlight that class.
 *
 * Params:
 *   p1         string     parent 1 genotype, allele pairs per gene ("Aa", "AaBb", "AaBbCc");
 *                         uppercase = dominant allele. With xLinked, the mother, e.g. "XAXa"   default "Aa" ("XAXa" with xLinked)
 *   p2         string     parent 2 genotype, same genes. With xLinked, the father, e.g. "XaY"  default "Aa" ("XaY" with xLinked)
 *   dominance  string[]   per gene: "complete" | "incomplete" | "codominant"           default all "complete"
 *   traits     object     phenotype names per gene letter: {"A": ["round", "wrinkled"]}
 *                         = [dominant/AA, recessive/aa, optional heterozygote name]     default none (genotype symbols such as A_ and aa)
 *   xLinked    boolean    one gene on the X chromosome (p1 = mother, p2 = father)      default false
 *   epistasis  string     two genes only: "none" | "9:7" | "9:3:4" | "12:3:1" | "15:1" | "13:3" | "9:6:1".
 *                         The FIRST gene written is the epistatic one where it matters: 9:3:4 means
 *                         aa masks B; 12:3:1 means A_ masks B; 13:3 means A_ suppresses B_    default "none"
 *   epiNames   string[]   phenotype names for the epistatic classes, in the order of the
 *                         ratio (e.g. ["black", "brown", "yellow"] for 9:3:4)          default classic examples
 *   editable   boolean    controls for genotypes, dominance and epistasis              default true
 *   title      string                                                                  default "Punnett square"
 *   caption    string     what to try
 */
import { useMemo, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { bool, oneOf, str, strArray } from '../kit/params';
import { Controls, Frame, Note, Segmented } from '../kit/controls';
import {
  EPI_GROUPS,
  EPI_NAMES,
  EPI_RULE,
  EPISTASIS,
  crossAutosomal,
  crossX,
  genotypeRank,
  klassOf,
  parseAutosomal,
  parseX,
  tally,
  type Dominance,
  type Epistasis,
  type Gamete,
  type GenePair,
  type TraitNames,
} from '../kit/gen-cross';
import { SERIES, frac, lowestTerms } from '../kit/gen-ui';

const DOMS: Dominance[] = ['complete', 'incomplete', 'codominant'];
type Zyg = 'hom-dom' | 'het' | 'hom-rec';

const zygOf = ([a, b]: GenePair): Zyg => (a === a.toUpperCase() && b === b.toUpperCase() ? 'hom-dom' : a !== a.toUpperCase() && b !== b.toUpperCase() ? 'hom-rec' : 'het');
const pairFor = (G: string, z: Zyg): GenePair => (z === 'hom-dom' ? [G, G] : z === 'het' ? [G, G.toLowerCase()] : [G.toLowerCase(), G.toLowerCase()]);

function readTraits(v: unknown): TraitNames | undefined {
  if (v === undefined) return undefined;
  if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('parameter "traits" should be an object such as {"A": ["round", "wrinkled"]}');
  const out: TraitNames = {};
  for (const [k, names] of Object.entries(v as Record<string, unknown>)) {
    if (!Array.isArray(names) || names.length < 2 || names.length > 3 || !names.every((n) => typeof n === 'string'))
      throw new Error(`parameter "traits.${k}" should be ["dominant name", "recessive name"] or with a third heterozygote name`);
    out[k.toUpperCase()] = names as string[];
  }
  return out;
}

/** Allele with an X superscript, e.g. X^A. */
function XAl({ a }: { a: string }) {
  if (a === 'Y') return <span>Y</span>;
  return (
    <span>
      X<sup className="text-[0.75em]">{a}</sup>
    </span>
  );
}

function XGeno({ g }: { g: string }) {
  // "XAXa" or "XaY"
  const m = g.match(/^X(.)(?:X(.)|Y)$/);
  if (!m) return <span>{g}</span>;
  return (
    <span className="italic">
      <XAl a={m[1]} />
      {m[2] ? <XAl a={m[2]} /> : 'Y'}
    </span>
  );
}

export default function GenPunnett({ params }: WidgetProps) {
  const xLinked = bool(params, 'xLinked', false);
  const p1s = str(params, 'p1', xLinked ? 'XAXa' : 'Aa');
  const p2s = str(params, 'p2', xLinked ? 'XaY' : 'Aa');
  const editable = bool(params, 'editable', true);
  const traits = readTraits(params.traits);
  const epi0 = oneOf(params, 'epistasis', EPISTASIS, 'none');
  const epiNames = params.epiNames === undefined ? undefined : strArray(params, 'epiNames', []);

  // initial parse (throws readable errors)
  const init = useMemo(() => {
    if (xLinked) {
      const x = parseX(p1s, p2s);
      return { genes: [x.gene], m: x.mother, f: x.father };
    }
    const a = parseAutosomal(p1s, 'p1');
    const b = parseAutosomal(p2s, 'p2');
    if (a.genes.join() !== b.genes.join()) throw new Error(`parents must use the same genes in the same order (p1 has ${a.genes.join(', ')}, p2 has ${b.genes.join(', ')})`);
    return { genes: a.genes, a: a.pairs, b: b.pairs };
  }, [xLinked, p1s, p2s]);
  const genes = init.genes;
  const dom0 = strArray(params, 'dominance', genes.map(() => 'complete'));
  if (dom0.length !== genes.length) throw new Error(`parameter "dominance" needs ${genes.length} entries, one per gene`);
  dom0.forEach((d) => {
    if (!DOMS.includes(d as Dominance)) throw new Error(`parameter "dominance" entries should be complete, incomplete or codominant, got "${d}"`);
  });
  if (epi0 !== 'none' && genes.length !== 2) throw new Error('parameter "epistasis" needs exactly two genes');
  if (epi0 !== 'none' && xLinked) throw new Error('parameter "epistasis" cannot be combined with xLinked');
  if (epiNames && epi0 !== 'none' && epiNames.length !== EPI_GROUPS[epi0].length) throw new Error(`parameter "epiNames" needs ${EPI_GROUPS[epi0].length} names for ${epi0}`);
  if (xLinked && genes.length !== 1) throw new Error('xLinked crosses use one gene');

  const [z1, setZ1] = useState<Zyg[]>(() => (init.a ? init.a.map(zygOf) : [zygOf(init.m!)]));
  const [z2, setZ2] = useState<Zyg[]>(() => (init.b ? init.b.map(zygOf) : []));
  const [fatherDom, setFatherDom] = useState(() => (init.f ? init.f === init.f.toUpperCase() : false));
  const [dom, setDom] = useState<Dominance[]>(dom0 as Dominance[]);
  const [epi, setEpi] = useState<Epistasis>(epi0);
  const [sel, setSel] = useState<string | null>(null);

  const G0 = genes[0];
  const result = useMemo(() => {
    if (xLinked) {
      const mother = pairFor(G0, z1[0]);
      const father = fatherDom ? G0 : G0.toLowerCase();
      return crossX({ gene: G0, mother, father }, { dominance: dom[0], names: traits?.[G0] });
    }
    const a = { genes, pairs: genes.map((G, i) => pairFor(G, z1[i])) };
    const b = { genes, pairs: genes.map((G, i) => pairFor(G, z2[i])) };
    return crossAutosomal(a, b, { dominance: epi !== 'none' ? ['complete', 'complete'] : dom, traits, epistasis: epi, epiNames: epi === epi0 ? epiNames : undefined });
  }, [xLinked, G0, z1, z2, fatherDom, dom, epi, epi0, genes, traits, epiNames]);

  const nGenes = genes.length;
  const denom = Math.pow(4, nGenes);
  const children = result.children;
  const genoT = tally(children, (c) => c.genotype, (c) => c.p).sort((x, y) => (xLinked ? 0 : genotypeRank(x.key) - genotypeRank(y.key)));
  const phenoOrder = (() => {
    if (epi !== 'none') return epi === epi0 && epiNames ? epiNames : EPI_NAMES[epi];
    return null;
  })();
  const phenoT = tally(children, (c) => c.phenotype, (c) => c.p);
  if (phenoOrder) phenoT.sort((x, y) => phenoOrder.indexOf(x.key) - phenoOrder.indexOf(y.key));
  const allPhenos = phenoOrder ?? phenoT.map((x) => x.key);
  const colorOf = (ph: string) => SERIES[Math.max(0, allPhenos.indexOf(ph)) % SERIES.length];

  const gLabel = (g: Gamete) => (xLinked ? <XAl a={g.alleles[0]} /> : <span className="italic">{g.alleles.join('')}</span>);
  const parentLabel = (which: 1 | 2): ReactNode => {
    if (xLinked) {
      if (which === 1) {
        const [a, b] = pairFor(G0, z1[0]);
        return <XGeno g={`X${a}X${b}`} />;
      }
      return <XGeno g={`X${fatherDom ? G0 : G0.toLowerCase()}Y`} />;
    }
    const z = which === 1 ? z1 : z2;
    return <span className="italic">{genes.map((G, i) => pairFor(G, z[i]).join('')).join('')}</span>;
  };

  const zygOptions = (G: string) => [
    { value: 'hom-dom' as Zyg, label: <span className="italic">{G + G}</span> },
    { value: 'het' as Zyg, label: <span className="italic">{G + G.toLowerCase()}</span> },
    { value: 'hom-rec' as Zyg, label: <span className="italic">{G.toLowerCase() + G.toLowerCase()}</span> },
  ];

  const ratioLine = (rows: { key: string; p: number }[]) => lowestTerms(rows.map((r) => r.p * denom)).join(' : ');

  const sexTables = xLinked
    ? (['F', 'M'] as const).map((sex) => {
        const sub = children.filter((c) => c.sex === sex);
        const tot = sub.reduce((s, c) => s + c.p, 0);
        return { sex, rows: tally(sub, (c) => c.phenotype, (c) => c.p / tot), geno: tally(sub, (c) => c.genotype, (c) => c.p / tot) };
      })
    : [];

  const showSquare = nGenes <= 2;
  const cellPx = nGenes === 2 ? 'min-w-[3.4rem]' : 'min-w-[4.5rem]';

  return (
    <Frame title={str(params, 'title', 'Punnett square')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {editable && (
        <div className="space-y-3">
          <Controls cols={nGenes === 1 ? 2 : nGenes === 2 ? 2 : 3}>
            {xLinked ? (
              <>
                <Segmented
                  label="Mother"
                  options={(['hom-dom', 'het', 'hom-rec'] as Zyg[]).map((z) => {
                    const [a, b] = pairFor(G0, z);
                    return { value: z, label: <XGeno g={`X${a}X${b}`} /> };
                  })}
                  value={z1[0]}
                  onChange={(v) => setZ1([v])}
                />
                <Segmented
                  label="Father"
                  options={[
                    { value: 'dom', label: <XGeno g={`X${G0}Y`} /> },
                    { value: 'rec', label: <XGeno g={`X${G0.toLowerCase()}Y`} /> },
                  ]}
                  value={fatherDom ? 'dom' : 'rec'}
                  onChange={(v) => setFatherDom(v === 'dom')}
                />
              </>
            ) : (
              genes.map((G, i) => (
                <div key={G} className="space-y-2">
                  <Segmented label={`Parent 1, gene ${G}`} options={zygOptions(G)} value={z1[i]} onChange={(v) => setZ1((z) => z.map((x, j) => (j === i ? v : x)))} />
                  <Segmented label={`Parent 2, gene ${G}`} options={zygOptions(G)} value={z2[i]} onChange={(v) => setZ2((z) => z.map((x, j) => (j === i ? v : x)))} />
                </div>
              ))
            )}
          </Controls>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {epi === 'none' &&
              genes.map((G, i) => (
                <Segmented
                  key={G}
                  label={`Dominance, gene ${G}`}
                  options={DOMS.map((d) => ({ value: d, label: d }))}
                  value={dom[i]}
                  onChange={(v) => setDom((ds) => ds.map((x, j) => (j === i ? v : x)))}
                />
              ))}
            {nGenes === 2 && !xLinked && <Segmented label="Gene interaction" options={EPISTASIS.map((e) => ({ value: e, label: e === 'none' ? 'independent' : e }))} value={epi} onChange={setEpi} />}
          </div>
        </div>
      )}

      <div className="text-[13px] text-ink-2">
        Cross: {parentLabel(1)} × {parentLabel(2)}
        {xLinked && ' (mother × father)'}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {[result.rows, result.cols].map((gs, k) => (
          <div key={k} className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px]">
            <div className="mb-1 text-xs text-ink-3">{xLinked ? (k === 0 ? 'Mother' : 'Father') : `Parent ${k + 1}`} gametes</div>
            <div className="flex flex-wrap gap-1.5">
              {gs.map((g, i) => (
                <span key={i} className="rounded-md border border-line bg-surface px-2 py-0.5 font-mono">
                  {gLabel(g)} <span className="text-ink-3">{frac(g.p * 64, 64)}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showSquare ? (
        <div className="overflow-x-auto">
          <table className="mx-auto border-collapse text-center text-[13px]">
            <thead>
              <tr>
                <th className="p-1 text-[11px] font-normal text-ink-3">
                  {xLinked ? '♀ / ♂' : 'P1 / P2'}
                </th>
                {result.cols.map((c, j) => (
                  <th key={j} className={`border border-line bg-surface-2 px-1 py-1 font-mono font-semibold ${cellPx}`}>
                    {gLabel(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.square.map((row, i) => (
                <tr key={i}>
                  <th className="border border-line bg-surface-2 px-2 py-1 font-mono font-semibold">{gLabel(result.rows[i])}</th>
                  {row.map((cell, j) => {
                    const ch = cell.child;
                    const hit = sel !== null && (sel === ch.genotype || sel === `ph:${ch.phenotype}`);
                    const c = colorOf(ch.phenotype);
                    return (
                      <td key={j} className="border border-line p-0">
                        <button
                          type="button"
                          onClick={() => setSel(sel === ch.genotype ? null : ch.genotype)}
                          aria-pressed={hit}
                          aria-label={`${ch.genotype}, ${ch.phenotype}`}
                          className={`block w-full px-1 py-1.5 font-mono ${cellPx}`}
                          style={{
                            background: `color-mix(in srgb, ${c} ${hit ? 42 : 14}%, transparent)`,
                            outline: hit ? `2px solid ${c}` : undefined,
                            outlineOffset: -2,
                          }}
                        >
                          {xLinked ? <XGeno g={ch.genotype} /> : <span className="italic">{ch.genotype}</span>}
                          {nGenes === 1 && <span className="block text-[10px] not-italic leading-3 text-ink-2">{ch.phenotype}</span>}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-1 text-center text-[11px] text-ink-3">
            Each square has probability {frac(64 / (result.rows.length * result.cols.length), 64)}
            {result.rows.length * result.cols.length !== denom && !xLinked ? ` (a homozygous parent makes fewer kinds of gamete; counts below are still out of ${denom})` : ''}.
          </div>
        </div>
      ) : (
        <ForkedLine genes={genes} z1={z1} z2={z2} dom={dom} traits={traits} />
      )}

      {xLinked ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {sexTables.map((t) => (
            <div key={t.sex} className="rounded-lg border border-line px-3 py-2 text-[13px]">
              <div className="mb-1 font-semibold">{t.sex === 'F' ? 'Daughters' : 'Sons'}</div>
              {t.geno.map((g) => (
                <div key={g.key} className="flex justify-between gap-2 font-mono">
                  <XGeno g={g.key} />
                  <span>{frac(g.p * 4, 4)}</span>
                </div>
              ))}
              <div className="mt-1 border-t border-line pt-1">
                {t.rows.map((r) => (
                  <div key={r.key} className="flex justify-between gap-2">
                    <span style={{ color: colorOf(r.key) }}>{r.key}</span>
                    <span className="font-mono">{frac(r.p * 4, 4)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          <RatioTable title={`Genotypes (out of ${denom})`} rows={genoT} denom={denom} italic onPick={(k) => setSel(sel === k ? null : k)} sel={sel} />
          <RatioTable title={`Phenotypes (out of ${denom})`} rows={phenoT} denom={denom} colorOf={colorOf} onPick={(k) => setSel(sel === `ph:${k}` ? null : `ph:${k}`)} sel={sel?.startsWith('ph:') ? sel.slice(3) : null} />
        </div>
      )}
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
        {!xLinked && (
          <span>
            Genotype ratio <span className="font-mono">{ratioLine(genoT)}</span>
          </span>
        )}
        <span>
          Phenotype ratio <span className="font-mono">{ratioLine(phenoT)}</span>
          {xLinked && ' (all offspring)'}
        </span>
      </div>
      {epi !== 'none' && <EpiNote epi={epi} genes={genes} names={epi === epi0 && epiNames ? epiNames : EPI_NAMES[epi]} result={result} colorOf={colorOf} />}
      {epi === 'none' && nGenes === 2 && dom.every((d) => d === 'complete') && z1.every((z) => z === 'het') && z2.every((z) => z === 'het') && (
        <Note>Two independent genes, each 3:1, give (3:1)×(3:1) = 9:3:3:1. Choose a gene interaction to see how epistasis merges these classes.</Note>
      )}
    </Frame>
  );
}

function RatioTable({ title, rows, denom, italic, colorOf, onPick, sel }: { title: string; rows: { key: string; p: number }[]; denom: number; italic?: boolean; colorOf?: (k: string) => string; onPick: (k: string) => void; sel: string | null }) {
  return (
    <div className="rounded-lg border border-line px-3 py-2 text-[13px]">
      <div className="mb-1 text-xs text-ink-3">{title}</div>
      <div className="max-h-80 overflow-y-auto">
        {rows.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => onPick(r.key)}
            aria-pressed={sel === r.key}
            className={`flex w-full items-baseline justify-between gap-2 rounded px-1 text-left ${sel === r.key ? 'bg-surface-2 font-semibold' : 'hover:bg-surface-2'}`}
          >
            <span className={`${italic ? 'font-mono italic' : ''} min-w-0 [overflow-wrap:anywhere]`} style={colorOf ? { color: colorOf(r.key) } : undefined}>
              {r.key}
            </span>
            <span className="shrink-0 font-mono tabular-nums text-ink-2">
              {Math.round(r.p * denom * 1000) / 1000} <span className="text-ink-3">({frac(r.p * denom, denom)})</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function EpiNote({ epi, genes, names, result, colorOf }: { epi: Exclude<Epistasis, 'none'>; genes: string[]; names: string[]; result: ReturnType<typeof crossAutosomal>; colorOf: (k: string) => string }) {
  const [G1, G2] = genes;
  const g1 = G1.toLowerCase();
  const g2 = G2.toLowerCase();
  const map: Record<string, string> = { A_: `${G1}_`, aa: g1 + g1, B_: `${G2}_`, bb: g2 + g2, 'gene B': `gene ${G2}` };
  const pretty = (k: string) => k.replace(/gene B|A_|aa|B_|bb/g, (m) => map[m]);
  const counts: Record<string, number> = {};
  for (const row of result.square) for (const cell of row) {
    const k = klassOf(G1, G2, cell.row.alleles, cell.col.alleles);
    counts[k] = (counts[k] ?? 0) + cell.child.p * 16;
  }
  return (
    <div className="rounded-lg border border-line bg-surface-2 px-3 py-2 text-[13px] leading-6">
      <div>
        <span className="font-semibold">{epi}</span>: {pretty(EPI_RULE[epi])}.
      </div>
      {EPI_GROUPS[epi].map((grp, i) => (
        <div key={i}>
          <span style={{ color: colorOf(names[i]) }} className="font-semibold">
            {names[i]}
          </span>{' '}
          = {grp.map((k) => `${Math.round((counts[k] ?? 0) * 100) / 100} ${pretty(k)}`).join(' + ')} ={' '}
          <span className="font-mono">{Math.round(grp.reduce((s, k) => s + (counts[k] ?? 0), 0) * 100) / 100}</span>
        </div>
      ))}
    </div>
  );
}

/** Three genes: multiply the per-gene probabilities along each branch instead of drawing 64 squares. */
function ForkedLine({ genes, z1, z2, dom, traits }: { genes: string[]; z1: Zyg[]; z2: Zyg[]; dom: Dominance[]; traits?: TraitNames }) {
  const per = genes.map((G, i) => {
    const r = crossAutosomal({ genes: [G], pairs: [pairFor(G, z1[i])] }, { genes: [G], pairs: [pairFor(G, z2[i])] }, { dominance: [dom[i]], traits, epistasis: 'none' });
    return tally(r.children, (c) => c.phenotype, (c) => c.p);
  });
  const branches: { names: string[]; ps: number[] }[] = [];
  const rec = (i: number, names: string[], ps: number[]) => {
    if (i === genes.length) return void branches.push({ names, ps });
    for (const o of per[i]) rec(i + 1, [...names, o.key], [...ps, o.p]);
  };
  rec(0, [], []);
  return (
    <div className="overflow-x-auto">
      <div className="mb-1 text-xs text-ink-3">Forked-line method: each gene segregates independently, so multiply along each branch</div>
      <table className="w-full min-w-[300px] text-[13px] tabular-nums">
        <thead className="text-ink-3">
          <tr>
            {genes.map((G) => (
              <th key={G} className="py-1 text-left font-medium">
                gene {G}
              </th>
            ))}
            <th className="text-right font-medium">probability</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((b, i) => (
            <tr key={i} className="border-t border-line">
              {b.names.map((n, j) => (
                <td key={j} className="py-0.5 pr-2">
                  {n} <span className="text-ink-3">{frac(b.ps[j] * 4, 4)}</span>
                </td>
              ))}
              <td className="text-right font-mono">
                {b.ps.map((p) => frac(p * 4, 4)).join(' × ')} = {frac(b.ps.reduce((s, p) => s * p, 1) * 64, 64)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
