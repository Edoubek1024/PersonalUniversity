/**
 * text-ranking: a tiny collection and a query, ranked by TF-IDF, BM25 or query likelihood, with
 * every document's score broken down by query term. Move k1, b, mu or lambda (or switch the TF
 * transform) and watch the contributions and the ranking change. Each row also shows how far the
 * document has moved from its rank under the model's starting parameters.
 *
 * Scoring follows src/widgets/kit/text-ir.ts (lower-case, split on non-alphanumerics, drop a short
 * stop list):
 *   TF-IDF  sum c(w,q) TF(c(w,d)) ln((N+1)/df),  TF = c ("raw") or 1 + ln c ("log")
 *   BM25    sum c(w,q) ln(1 + (N - df + 0.5)/(df + 0.5)) c(k1+1)/(c + k1(1 - b + b|d|/avgdl))
 *   QL-Dir  sum c(w,q) ln((c(w,d) + mu p(w|C)) / (|d| + mu))
 *   QL-JM   sum c(w,q) ln((1 - lambda) c(w,d)/|d| + lambda p(w|C))
 *
 * Params:
 *   docs       string[]   the collection, at most 10 short documents   default 5 documents on solar power and batteries
 *   query      string     the starting query                           default "solar battery storage"
 *   model      "tfidf" | "bm25" | "ql-dir" | "ql-jm"                    default "bm25"
 *   models     string[]   models offered in the switcher ([] or one entry hides it)   default all four
 *   tf         "raw" | "log"   TF transform for TF-IDF                  default "raw"
 *   k1         number     BM25 k1 (0 to 3)                              default 1.2
 *   b          number     BM25 b (0 to 1)                               default 0.75
 *   mu         number     Dirichlet prior (0 to muMax)                  default 10
 *   muMax      number     top of the mu slider                          default 200
 *   lambda     number     Jelinek-Mercer weight on the collection model default 0.5
 *   editQuery  boolean    show a box to edit the query                 default true
 *   title      string                                                  default "Ranking explorer"
 *   caption    string
 */
import { useMemo, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, num, oneOf, str, strArray } from '../kit/params';
import { Controls, Frame, Note, Readout, Segmented, Slider, Tex } from '../kit/controls';
import { clamp, fmt } from '../kit/num';
import { buildCollection, rank, tokenize, STOP_WORDS, type Model, type ModelParams } from '../kit/text-ir';

const DEFAULT_DOCS = [
  'solar panels charge the home battery',
  'battery storage for solar power and wind power',
  'wind farms store power in a battery',
  'solar solar solar eclipse photos',
  'home battery prices fall as storage costs fall',
];
const MODELS = ['tfidf', 'bm25', 'ql-dir', 'ql-jm'] as const;
const LABEL: Record<Model, string> = { tfidf: 'TF-IDF', bm25: 'BM25', 'ql-dir': 'QL Dirichlet', 'ql-jm': 'QL Jelinek-Mercer' };
const TERM_COLORS = ['var(--plot-1)', 'var(--plot-2)', 'var(--plot-3)', 'var(--plot-4)', 'var(--plot-5)', 'var(--plot-6)'];

const FORMULA: Record<Model, string> = {
  tfidf: '\\textstyle\\sum_{w \\in q} c(w,q)\\,\\mathrm{TF}(c(w,d))\\,\\ln\\frac{N+1}{df(w)}',
  bm25: '\\textstyle\\sum_{w \\in q} c(w,q)\\,\\mathrm{IDF}(w)\\,\\frac{c(w,d)(k_1+1)}{c(w,d) + k_1(1-b+b\\,|d|/\\overline{|d|})}',
  'ql-dir': '\\textstyle\\sum_{w \\in q} c(w,q) \\ln \\frac{c(w,d) + \\mu\\, p(w \\mid C)}{|d| + \\mu}',
  'ql-jm': '\\textstyle\\sum_{w \\in q} c(w,q) \\ln\\big((1-\\lambda)\\frac{c(w,d)}{|d|} + \\lambda\\, p(w \\mid C)\\big)',
};

export default function TextRanking({ params }: WidgetProps) {
  const docsText = strArray(params, 'docs', DEFAULT_DOCS);
  if (docsText.length < 2 || docsText.length > 10) throw new Error('parameter "docs" should list 2 to 10 documents');
  const offered = strArray(params, 'models', [...MODELS]);
  for (const m of offered) if (!(MODELS as readonly string[]).includes(m)) throw new Error(`parameter "models" has unknown model "${m}" (use ${MODELS.join(', ')})`);
  const initialModel = oneOf(params, 'model', MODELS, 'bm25');
  const muMax = num(params, 'muMax', 200);
  if (!(muMax > 0)) throw new Error('parameter "muMax" should be positive');
  const defaults: ModelParams = {
    tf: oneOf(params, 'tf', ['raw', 'log'] as const, 'raw'),
    k1: clamp(num(params, 'k1', 1.2), 0, 3),
    b: clamp(num(params, 'b', 0.75), 0, 1),
    mu: clamp(num(params, 'mu', 10), 0, muMax),
    lambda: clamp(num(params, 'lambda', 0.5), 0.01, 0.99),
  };
  const editQuery = bool(params, 'editQuery', true);

  const [model, setModel] = useState<Model>(initialModel);
  const [query, setQuery] = useState(str(params, 'query', 'solar battery storage'));
  const [p, setP] = useState<ModelParams>(defaults);
  const set = (patch: Partial<ModelParams>) => setP((s) => ({ ...s, ...patch }));

  const coll = useMemo(() => buildCollection(docsText.map((d) => tokenize(d))), [docsText.join('\u0000')]); // eslint-disable-line react-hooks/exhaustive-deps
  const q = useMemo(() => tokenize(query), [query]);
  const { terms, ranked } = useMemo(() => rank(coll, q, model, p), [coll, q, model, p]);
  const baseRank = useMemo(() => {
    const r = rank(coll, q, model, defaults).ranked;
    return new Map(r.map((s, i) => [s.doc, i]));
  }, [coll, q, model]); // eslint-disable-line react-hooks/exhaustive-deps

  const scores = ranked.map((r) => r.score).filter(Number.isFinite);
  const hi = scores.length ? Math.max(...scores) : 0;
  const lo = model.startsWith('ql') ? (scores.length ? Math.min(...scores) : 0) - (scores.length > 1 ? 0 : 1) : 0;
  const span = hi - lo || 1;
  const qset = new Set(terms.map(([w]) => w));
  const colorOf = new Map(terms.map(([w], i) => [w, TERM_COLORS[i % TERM_COLORS.length]]));

  const idfLabel = model === 'tfidf' ? 'ln((N+1)/df)' : model === 'bm25' ? 'IDF' : 'p(w|C)';
  const termStat = (w: string) => {
    const df = coll.df.get(w) ?? 0;
    if (model === 'tfidf') return df ? fmt(Math.log((coll.N + 1) / df)) : '–';
    if (model === 'bm25') return df ? fmt(Math.log(1 + (coll.N - df + 0.5) / (df + 0.5))) : '–';
    return fmt((coll.cf.get(w) ?? 0) / coll.total);
  };

  return (
    <Frame title={str(params, 'title', 'Ranking explorer')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {offered.length > 1 && <Segmented label="Retrieval model" options={offered.map((m) => ({ value: m as Model, label: LABEL[m as Model] }))} value={model} onChange={setModel} />}
      <div className="overflow-x-auto text-[13px]">
        <Tex>{`\\text{score}(q,d) = ${FORMULA[model]}`}</Tex>
      </div>
      {editQuery && (
        <label className="block text-[13px] text-ink-2">
          Query
          <input className="input mt-1 font-mono text-[13px]" value={query} onChange={(e) => setQuery(e.target.value)} spellCheck={false} autoCapitalize="off" autoComplete="off" />
        </label>
      )}
      {terms.length === 0 ? (
        <Note tone="warn">The query has no terms left after removing stop words. Type a content word.</Note>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 text-xs">
            {terms.map(([w, qc]) => (
              <span key={w} className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono">
                <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: colorOf.get(w) }} />
                {w}
                {qc > 1 ? ` ×${qc}` : ''} · df {coll.df.get(w) ?? 0} · {idfLabel} {termStat(w)}
              </span>
            ))}
          </div>
          <ol className="space-y-1.5" aria-label="Ranked documents">
            {ranked.map((r, i) => {
              const moved = (baseRank.get(r.doc) ?? i) - i;
              const matched = terms.some(([w]) => (coll.tf[r.doc].get(w) ?? 0) > 0);
              return (
                <li key={r.doc} className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5">
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="w-5 shrink-0 text-right font-mono text-ink-3">{i + 1}</span>
                    <span className="shrink-0 font-semibold">D{r.doc + 1}</span>
                    <span className="shrink-0 text-xs text-ink-3">|d| = {coll.lengths[r.doc]}</span>
                    <span className="relative h-2 min-w-0 flex-1 overflow-hidden rounded bg-surface">
                      <span className="absolute inset-y-0 left-0 rounded" style={{ width: `${Number.isFinite(r.score) ? (100 * (r.score - lo)) / span : 0}%`, background: 'var(--color-accent)', opacity: 0.7 }} />
                    </span>
                    <span className="w-16 shrink-0 text-right font-mono tabular-nums">{fmt(r.score)}</span>
                    <span className={`w-7 shrink-0 text-right font-mono text-xs ${moved > 0 ? 'text-emerald-600 dark:text-emerald-300' : moved < 0 ? 'text-rose-600 dark:text-rose-300' : 'text-ink-3'}`} title="Places moved since the starting parameters">
                      {moved > 0 ? `↑${moved}` : moved < 0 ? `↓${-moved}` : '·'}
                    </span>
                  </div>
                  <div className="mt-1 pl-7 text-[13px] leading-5 text-ink-2">
                    {docsText[r.doc].split(/(\s+)/).map((tok, j) => {
                      const t = tok.toLowerCase().replace(/[^a-z0-9]/g, '');
                      const hit = t && qset.has(t) && !STOP_WORDS.has(t);
                      return hit ? (
                        <b key={j} style={{ color: colorOf.get(t) }}>
                          {tok}
                        </b>
                      ) : (
                        <span key={j}>{tok}</span>
                      );
                    })}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 pl-7 font-mono text-[11px] text-ink-3">
                    {terms.map(([w], j) => (
                      <span key={w}>
                        <span style={{ color: colorOf.get(w) }}>{w}</span> c={coll.tf[r.doc].get(w) ?? 0} → {fmt(r.parts[j])}
                      </span>
                    ))}
                    {!matched && !model.startsWith('ql') && <span>no query term</span>}
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}
      <Controls cols={3}>
        {model === 'tfidf' && <Segmented label="TF transform" options={[{ value: 'raw', label: 'raw c' }, { value: 'log', label: '1 + ln c' }]} value={p.tf} onChange={(tf) => set({ tf })} />}
        {model === 'bm25' && (
          <>
            <Slider label={<Tex>{'k_1'}</Tex>} value={p.k1} min={0} max={3} step={0.05} onChange={(k1) => set({ k1 })} />
            <Slider label={<Tex>{'b'}</Tex>} value={p.b} min={0} max={1} step={0.01} onChange={(b) => set({ b })} />
          </>
        )}
        {model === 'ql-dir' && <Slider label={<Tex>{'\\mu'}</Tex>} value={p.mu} min={0} max={muMax} step={muMax >= 100 ? 1 : muMax / 100} onChange={(mu) => set({ mu })} />}
        {model === 'ql-jm' && <Slider label={<Tex>{'\\lambda'}</Tex>} value={p.lambda} min={0.01} max={0.99} step={0.01} onChange={(lambda) => set({ lambda })} />}
        <Readout label="N, avg |d|, collection tokens" value={`${coll.N}, ${fmt(coll.avgdl)}, ${coll.total}`} />
      </Controls>
      {model.startsWith('ql') && <Note>Query likelihood scores are log probabilities, so they are negative; only their order matters. Bars run from the lowest finite score to the highest. At mu = 0 the model is the unsmoothed maximum likelihood estimate, and any document missing a query word scores minus infinity.</Note>}
    </Frame>
  );
}
