/**
 * truth-table: type a propositional formula and see its full truth table, one column per
 * subformula, with a tautology / contradiction / contingent verdict. Two further modes: compare
 * two formulas (rows where they differ are highlighted) and check an argument form (premises and a
 * conclusion; a row with every premise true and the conclusion false is a counterexample).
 *
 * Params:
 *   mode        "table" | "compare" | "argument"   starting mode                 default "table"
 *   modes       string[]   modes offered as tabs (subset of the three)           default [mode]
 *   f           string     formula for table and compare modes     default "(P -> Q) & (Q -> R) -> (P -> R)"
 *   g           string     second formula for compare mode                       default "~P | Q"
 *   premises    string[]   premises for argument mode                            default ["P -> Q", "P"]
 *   conclusion  string     conclusion for argument mode                          default "Q"
 *   steps       boolean    show a column for every subformula at first           default true
 *   examples    boolean    show the menu of standard examples                    default true
 *   arrows      "single" | "double"   print → ↔ or ⇒ ⇔                           default "single"
 *   title       string                                                           default "Truth table"
 *   caption     string     what to try
 *
 * Formulas accept ¬ ∧ ∨ → ↔ ⊕, the ASCII forms ~ & | -> <-> and the words not, and, or, xor,
 * implies, iff (see kit/discrete-logic.ts).
 */
import { useMemo, useRef, useState } from 'react';
import type { WidgetProps } from '../types';
import { bool, oneOf, str, strArray } from '../kit/params';
import { Button, Frame, Note, Segmented, Toggle } from '../kit/controls';
import { DOUBLE, SYMBOL, assignments, classify, evaluate, show as showWith, subformulas, tryParseFormula, variables, type Formula } from '../kit/discrete-logic';

type Mode = 'table' | 'compare' | 'argument';
const MODES: readonly Mode[] = ['table', 'compare', 'argument'];
const MODE_LABEL: Record<Mode, string> = { table: 'Truth table', compare: 'Equivalence', argument: 'Argument' };
const MAX_VARS = 6;

const EXAMPLES: Record<Mode, { label: string; f?: string; g?: string; premises?: string[]; conclusion?: string }[]> = {
  table: [
    { label: 'Hypothetical syllogism', f: '(P → Q) ∧ (Q → R) → (P → R)' },
    { label: 'Implication', f: 'P → Q' },
    { label: 'Excluded middle', f: 'P ∨ ¬P' },
    { label: 'Contradiction', f: 'P ∧ ¬P' },
    { label: 'Exclusive or', f: 'P ⊕ Q' },
    { label: 'SAT exercise', f: '(x1 ∨ x2) ∧ (¬x1 ∨ x3) ∧ (¬x2 ∨ ¬x3) ∧ (x1 ∨ ¬x3)' },
  ],
  compare: [
    { label: 'Implication rewrite', f: 'P → Q', g: '¬P ∨ Q' },
    { label: 'Contrapositive', f: 'P → Q', g: '¬Q → ¬P' },
    { label: 'Converse', f: 'P → Q', g: 'Q → P' },
    { label: 'Inverse', f: 'P → Q', g: '¬P → ¬Q' },
    { label: 'De Morgan (and)', f: '¬(P ∧ Q)', g: '¬P ∨ ¬Q' },
    { label: 'De Morgan (or)', f: '¬(P ∨ Q)', g: '¬P ∧ ¬Q' },
    { label: 'Negated implication', f: '¬(P → Q)', g: 'P ∧ ¬Q' },
    { label: 'Tempting mistake', f: '¬(P ∧ Q)', g: '¬P ∧ ¬Q' },
    { label: 'Distributivity', f: 'P ∧ (Q ∨ R)', g: '(P ∧ Q) ∨ (P ∧ R)' },
    { label: 'Two implications', f: '(P → Q) ∧ (P → R)', g: 'P → (Q ∧ R)' },
  ],
  argument: [
    { label: 'Modus ponens', premises: ['P → Q', 'P'], conclusion: 'Q' },
    { label: 'Modus tollens', premises: ['P → Q', '¬Q'], conclusion: '¬P' },
    { label: 'Hypothetical syllogism', premises: ['P → Q', 'Q → R'], conclusion: 'P → R' },
    { label: 'Disjunctive syllogism', premises: ['P ∨ Q', '¬P'], conclusion: 'Q' },
    { label: 'Affirming the consequent (fallacy)', premises: ['P → Q', 'Q'], conclusion: 'P' },
    { label: 'Denying the antecedent (fallacy)', premises: ['P → Q', '¬P'], conclusion: '¬Q' },
  ],
};


interface Col {
  key: string;
  head: string;
  f: Formula;
  main?: boolean;
}

export default function TruthTable({ params }: WidgetProps) {
  const mode0 = oneOf(params, 'mode', MODES, 'table');
  const modes = strArray(params, 'modes', [mode0]);
  for (const m of modes) if (!MODES.includes(m as Mode)) throw new Error(`parameter "modes" may contain only ${MODES.join(', ')}, got "${m}"`);
  if (!modes.includes(mode0)) throw new Error(`parameter "mode" ("${mode0}") must be one of "modes"`);
  const [mode, setMode] = useState<Mode>(mode0);
  const [f, setF] = useState(() => str(params, 'f', '(P -> Q) & (Q -> R) -> (P -> R)'));
  const [g, setG] = useState(() => str(params, 'g', '~P | Q'));
  const [premises, setPremises] = useState(() => strArray(params, 'premises', ['P -> Q', 'P']));
  const [conclusion, setConclusion] = useState(() => str(params, 'conclusion', 'Q'));
  const [steps, setSteps] = useState(() => bool(params, 'steps', true));
  const showExamples = bool(params, 'examples', true);
  const double = oneOf(params, 'arrows', ['single', 'double'] as const, 'single') === 'double';
  const sym = double ? DOUBLE : SYMBOL;
  const show = (fm: Formula) => showWith(fm, sym);
  const INSERT = ['¬', '∧', '∨', sym.imp, sym.iff, '⊕', '(', ')'];

  // The input that last had focus receives the symbol buttons' text.
  const target = useRef<{ el: HTMLInputElement; set: (v: string) => void } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const insert = (sym: string) => {
    const t = target.current?.el.isConnected ? target.current : null;
    // Before any field has had focus, insert into the first one.
    const el = t?.el ?? wrap.current?.querySelector('input:not([type])') ?? wrap.current?.querySelector('input');
    if (!(el instanceof HTMLInputElement)) return;
    const set = t?.set ?? (mode === 'argument' ? (v: string) => setPremises((ps) => [v, ...ps.slice(1)]) : setF);
    const a = el.selectionStart ?? el.value.length;
    const b = el.selectionEnd ?? a;
    const v = el.value.slice(0, a) + sym + el.value.slice(b);
    set(v);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + sym.length, a + sym.length);
    });
  };
  const bind = (set: (v: string) => void) => (el: HTMLInputElement) => (target.current = { el, set });

  const sources = mode === 'table' ? [f] : mode === 'compare' ? [f, g] : [...premises, conclusion];
  const parsed = useMemo(() => sources.map((s) => tryParseFormula(s)), [sources.join('\u0000')]); // eslint-disable-line react-hooks/exhaustive-deps
  const ok = parsed.every((p) => p.f);
  const formulas = ok ? parsed.map((p) => p.f!) : [];
  const vars = ok ? variables(...formulas) : [];
  const tooMany = vars.length > MAX_VARS;

  const cols: Col[] = useMemo(() => {
    if (!ok || tooMany) return [];
    const out: Col[] = [];
    const seen = new Set<string>();
    const mains = new Set(formulas.map(show));
    const add = (fm: Formula, main: boolean, key: string) => {
      if (steps) {
        for (const s of subformulas(fm)) {
          const h = show(s);
          if (mains.has(h) || seen.has(h)) continue;
          seen.add(h);
          out.push({ key: `s${out.length}`, head: h, f: s });
        }
      }
      out.push({ key, head: show(fm), f: fm, main });
    };
    if (mode === 'argument') {
      // Premises and conclusion are the point; their parts come first if steps are shown.
      formulas.forEach((fm, i) => add(fm, true, i === formulas.length - 1 ? 'concl' : `p${i}`));
    } else {
      formulas.forEach((fm, i) => add(fm, true, i === 0 ? 'f' : 'g'));
    }
    return out;
  }, [ok, tooMany, steps, mode, double, formulas.map(show).join('\u0000')]); // eslint-disable-line react-hooks/exhaustive-deps

  const rows = useMemo(() => (ok && !tooMany ? assignments(vars) : []), [ok, tooMany, vars.join()]); // eslint-disable-line react-hooks/exhaustive-deps
  const table = useMemo(() => rows.map((env) => cols.map((c) => evaluate(c.f, env))), [rows, cols]);
  const colIndex = (key: string) => cols.findIndex((c) => c.key === key);

  // Row status and verdict per mode.
  let rowTone: ('bad' | 'good' | null)[] = rows.map(() => null);
  let verdict: { tone: 'good' | 'warn' | 'info'; text: string } | null = null;
  let extraHead = '';
  let extra: string[] = [];
  if (ok && !tooMany && rows.length) {
    const n = rows.length;
    if (mode === 'table') {
      const fi = colIndex('f');
      const vals = table.map((r) => r[fi]);
      const k = vals.filter(Boolean).length;
      const c = classify(vals);
      verdict =
        c === 'tautology'
          ? { tone: 'good', text: `Tautology: true on all ${n} rows.` }
          : c === 'contradiction'
            ? { tone: 'warn', text: `Contradiction: false on all ${n} rows, so it is unsatisfiable.` }
            : { tone: 'info', text: `Contingent: true on ${k} of ${n} rows (so satisfiable) and false on ${n - k}.` };
    } else if (mode === 'compare') {
      const fi = colIndex('f');
      const gi = colIndex('g');
      const diff = table.map((r) => r[fi] !== r[gi]);
      rowTone = diff.map((d) => (d ? 'bad' : null));
      extraHead = 'same?';
      extra = diff.map((d) => (d ? '✗' : '✓'));
      const k = diff.filter(Boolean).length;
      verdict = k === 0 ? { tone: 'good', text: `Equivalent: the two columns agree on all ${n} rows.` } : { tone: 'warn', text: `Not equivalent: they differ on ${k} of ${n} rows (highlighted). Any one of those rows is a counterexample.` };
    } else {
      const ci = colIndex('concl');
      const pis = premises.map((_, i) => colIndex(`p${i}`));
      const critical = table.map((r) => pis.every((i) => r[i]));
      const counter = table.map((r, i) => critical[i] && !r[ci]);
      rowTone = critical.map((c, i) => (counter[i] ? 'bad' : c ? 'good' : null));
      extraHead = 'all premises T?';
      extra = critical.map((c, i) => (counter[i] ? 'yes, C false ✗' : c ? 'yes, C true ✓' : '–'));
      const nc = critical.filter(Boolean).length;
      const nx = counter.filter(Boolean).length;
      const rowsList = counter.flatMap((c, i) => (c ? [vars.map((v) => `${v}=${rows[i][v] ? 'T' : 'F'}`).join(', ')] : []));
      verdict =
        nc === 0
          ? { tone: 'info', text: 'The premises are never all true together (they are inconsistent), so the argument is vacuously valid.' }
          : nx === 0
            ? { tone: 'good', text: `Valid: in each of the ${nc} rows where every premise is true, the conclusion is true too. Equivalently, (premises joined by ∧) → conclusion is a tautology.` }
            : { tone: 'warn', text: `Invalid: ${rowsList.join('; ')} makes every premise true and the conclusion false.` };
    }
  }

  const loadExample = (label: string) => {
    const ex = EXAMPLES[mode].find((e) => e.label === label);
    if (!ex) return;
    if (ex.f !== undefined) setF(ex.f);
    if (ex.g !== undefined) setG(ex.g);
    if (ex.premises) setPremises(ex.premises);
    if (ex.conclusion !== undefined) setConclusion(ex.conclusion);
  };

  const errorOf = (i: number) => parsed[i]?.error;

  return (
    <Frame title={str(params, 'title', 'Truth table')} caption={typeof params.caption === 'string' ? params.caption : undefined}>
      {modes.length > 1 && <Segmented options={modes.map((m) => ({ value: m as Mode, label: MODE_LABEL[m as Mode] }))} value={mode} onChange={setMode} />}

      <div ref={wrap} className="space-y-2">
        {mode === 'table' && <FormulaInput label="Formula" value={f} onChange={setF} error={errorOf(0)} bind={bind(setF)} />}
        {mode === 'compare' && (
          <div className="grid gap-2 sm:grid-cols-2">
            <FormulaInput label="First formula" value={f} onChange={setF} error={errorOf(0)} bind={bind(setF)} />
            <FormulaInput label="Second formula" value={g} onChange={setG} error={errorOf(1)} bind={bind(setG)} />
          </div>
        )}
        {mode === 'argument' && (
          <div className="space-y-2">
            {premises.map((pr, i) => {
              const set = (v: string) => setPremises((ps) => ps.map((x, j) => (j === i ? v : x)));
              return (
                <div key={i} className="flex items-end gap-2">
                  <div className="min-w-0 flex-1">
                    <FormulaInput label={`Premise ${i + 1}`} value={pr} onChange={set} error={errorOf(i)} bind={bind(set)} />
                  </div>
                  {premises.length > 1 && (
                    <Button onClick={() => setPremises((ps) => ps.filter((_, j) => j !== i))} title={`Remove premise ${i + 1}`}>
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
            <FormulaInput label="Conclusion" value={conclusion} onChange={setConclusion} error={errorOf(premises.length)} bind={bind(setConclusion)} />
            {premises.length < 5 && <Button onClick={() => setPremises((ps) => [...ps, 'P'])}>Add premise</Button>}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-1" aria-label="Insert a connective">
          {INSERT.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insert(s)}
              className="min-w-8 rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-sm text-ink hover:bg-surface"
              title={`Insert ${s}`}
            >
              {s}
            </button>
          ))}
          <span className="ml-1 text-xs text-ink-3" style={{ fontVariantLigatures: 'none' }}>or type ~ &amp; | -&gt; &lt;-&gt; xor, or not / and / or / implies / iff</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Toggle label="Column for every subformula" checked={steps} onChange={setSteps} />
        {showExamples && (
          <label className="inline-flex items-center gap-2 text-[13px] text-ink-2">
            Examples
            <select className="input w-auto py-1 text-[13px]" value="" onChange={(e) => loadExample(e.target.value)}>
              <option value="">Choose…</option>
              {EXAMPLES[mode].map((e) => (
                <option key={e.label} value={e.label}>
                  {e.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {tooMany && <Note tone="warn">{vars.length} variables would need {2 ** vars.length} rows; this table stops at {MAX_VARS} variables (64 rows).</Note>}

      {ok && !tooMany && (
        <div className="max-h-[480px] overflow-auto rounded-lg border border-line">
          <table className="my-0 w-full border-collapse font-mono text-[13px] tabular-nums">
            <thead className="sticky top-0 z-10 bg-surface-2">
              <tr>
                {vars.map((v) => (
                  <th key={v} scope="col" className="border-b border-line px-2.5 py-1.5 text-center font-semibold text-ink">
                    {v}
                  </th>
                ))}
                {cols.map((c, i) => (
                  <th key={c.key} scope="col" className={`whitespace-nowrap border-b border-line px-2.5 py-1.5 text-center ${i === 0 ? 'border-l' : ''} ${c.main ? 'bg-accent/15 font-semibold text-ink' : 'font-normal text-ink-2'}`}>
                    {mode === 'argument' && c.main ? (c.key === 'concl' ? 'C: ' : `P${Number(c.key.slice(1)) + 1}: `) : ''}
                    {c.head}
                  </th>
                ))}
                {extraHead && (
                  <th scope="col" className="whitespace-nowrap border-b border-l border-line px-2.5 py-1.5 text-center font-sans text-xs font-medium text-ink-2">
                    {extraHead}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((env, r) => {
                const tone = rowTone[r];
                const bg = tone === 'bad' ? 'bg-rose-500/15' : tone === 'good' ? 'bg-emerald-500/10' : r % 2 ? 'bg-surface-2/40' : '';
                return (
                  <tr key={r} className={bg}>
                    {vars.map((v) => (
                      <TV key={v} v={env[v]} />
                    ))}
                    {cols.map((c, i) => (
                      <TV key={c.key} v={table[r][i]} main={c.main} first={i === 0} />
                    ))}
                    {extraHead && <td className={`whitespace-nowrap border-l border-line px-2.5 py-1 text-center font-sans text-xs ${tone === 'bad' ? 'font-semibold text-rose-700 dark:text-rose-300' : 'text-ink-2'}`}>{extra[r]}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {verdict && <Note tone={verdict.tone}>{verdict.text}</Note>}
    </Frame>
  );
}

function TV({ v, main, first }: { v: boolean; main?: boolean; first?: boolean }) {
  return (
    <td className={`px-2.5 py-1 text-center ${first ? 'border-l border-line' : ''} ${main ? 'font-semibold' : ''}`} style={{ color: v ? 'var(--plot-3)' : 'var(--color-ink-3)' }}>
      {v ? 'T' : 'F'}
    </td>
  );
}

function FormulaInput({ label, value, onChange, error, bind }: { label: string; value: string; onChange: (v: string) => void; error?: string; bind: (el: HTMLInputElement) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] text-ink-2">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={(e) => bind(e.currentTarget)}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        className="input font-mono text-[13px]"
        style={{ fontVariantLigatures: 'none' }}
        aria-invalid={!!error}
      />
      {error && <span className="mt-1 block text-xs text-rose-600 dark:text-rose-300">{error}</span>}
    </label>
  );
}
