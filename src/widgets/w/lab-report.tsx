/**
 * lab-report: a lab-report template to write into. It shows the standard sections (abstract,
 * introduction, materials and methods, results, calculations, discussion with error analysis,
 * conclusion, references) with prompts specific to the experiment, a results-table skeleton the
 * learner can insert, and a grading rubric to tick as a self-check. Everything typed is saved in
 * this browser (localStorage, per experiment) and can be copied as Markdown or downloaded as a
 * .md file. Nothing is uploaded anywhere.
 *
 * Params:
 *   experiment  "practice" | "density" | "beers-law" | "titration" | "empirical-formula" |
 *               "gas-constant" | "calorimetry" | "hess-law" | "le-chatelier" | "capstone"
 *                                                                     default "practice"
 *   title       string   frame title                                 default "Lab report: <experiment title>"
 *   caption     string
 */
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import type { WidgetProps } from '../types';
import { oneOf, str } from '../kit/params';
import { Button, Frame, Note } from '../kit/controls';
import { GENERAL_RUBRIC, SECTIONS, TEMPLATES } from '../kit/chemlab-reports';

const KEYS = ['practice', 'density', 'beers-law', 'titration', 'empirical-formula', 'gas-constant', 'calorimetry', 'hess-law', 'le-chatelier', 'capstone'] as const;

interface Saved {
  title: string;
  author: string;
  date: string;
  sections: Record<string, string>;
  rubric: boolean[];
}

function load(key: string): Saved | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function save(key: string, v: Saved | null) {
  try {
    if (v === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(v));
  } catch {
    // Private mode or storage full: the report still works for this visit.
  }
}

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

export default function LabReport({ params }: WidgetProps) {
  const exp = oneOf(params, 'experiment', KEYS, 'practice');
  const tpl = TEMPLATES[exp];
  const rubric = useMemo(() => [...GENERAL_RUBRIC, ...tpl.rubric], [tpl]);
  const total = rubric.reduce((s, r) => s + r.points, 0);
  const storeKey = `teachme:chemlab-report:v1:${exp}`;
  const blank = (): Saved => ({ title: tpl.title, author: '', date: '', sections: {}, rubric: rubric.map(() => false) });
  const [doc, setDoc] = useState<Saved>(() => {
    const s = load(storeKey);
    return s ? { ...blank(), ...s, rubric: rubric.map((_, i) => !!s.rubric?.[i]) } : blank();
  });
  const [status, setStatus] = useState<string | null>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => save(storeKey, doc), 300);
    return () => clearTimeout(t);
  }, [doc, storeKey]);

  const setSection = (id: string, text: string) => setDoc((d) => ({ ...d, sections: { ...d.sections, [id]: text } }));
  const score = rubric.reduce((s, r, i) => s + (doc.rubric[i] ? r.points : 0), 0);

  const markdown = () => {
    const out = [`# ${doc.title || tpl.title}`, ''];
    const by = [doc.author, doc.date].filter(Boolean).join(', ');
    if (by) out.push(`*${by}*`, '');
    for (const s of SECTIONS) {
      out.push(`## ${s.heading}`, '', (doc.sections[s.id] ?? '').trim() || '_(not written yet)_', '');
    }
    out.push('## Rubric self-check', '', ...rubric.map((r, i) => `- [${doc.rubric[i] ? 'x' : ' '}] ${r.text} (${r.points} pts)`), '', `Self-assessed: ${score} / ${total}`, '');
    return out.join('\n');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markdown());
      setStatus('Copied the report as Markdown.');
    } catch {
      setStatus('Copying was blocked by the browser; use Download instead.');
    }
  };

  const download = () => {
    const blob = new Blob([markdown()], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exp}-lab-report.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Downloaded the report as a .md file.');
  };

  const clear = () => {
    if (!window.confirm('Delete everything typed in this report? This cannot be undone.')) return;
    save(storeKey, null);
    setDoc(blank());
    setStatus('Cleared.');
  };

  return (
    <Frame
      title={str(params, 'title', `Lab report: ${tpl.title}`)}
      caption={typeof params.caption === 'string' ? params.caption : undefined}
      actions={
        <>
          <Button onClick={copy}>Copy as Markdown</Button>
          <Button onClick={download}>Download (.md)</Button>
        </>
      }
    >
      <Note>Saved automatically in this browser only (nothing is uploaded). Copy or download it to keep a copy elsewhere.</Note>
      <div className="grid gap-2 sm:grid-cols-3">
        <Field label="Title" value={doc.title} onChange={(v) => setDoc((d) => ({ ...d, title: v }))} />
        <Field label="Author" value={doc.author} onChange={(v) => setDoc((d) => ({ ...d, author: v }))} />
        <Field label="Date of the experiment" value={doc.date} onChange={(v) => setDoc((d) => ({ ...d, date: v }))} />
      </div>
      {SECTIONS.map((s) => (
        <SectionBox
          key={s.id}
          heading={s.heading}
          prompt={tpl.prompts[s.id] ?? s.prompt}
          guide={s.words}
          value={doc.sections[s.id] ?? ''}
          onChange={(v) => setSection(s.id, v)}
          extra={
            s.id === 'results' ? (
              <Button onClick={() => setSection('results', `${(doc.sections.results ?? '').trim()}\n\n${tpl.table}\n`.trimStart())}>Insert table skeleton</Button>
            ) : undefined
          }
        />
      ))}
      <div className="rounded-lg border border-line p-3">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <span className="text-sm font-semibold">Grading rubric (self-check)</span>
          <span className="font-mono text-sm tabular-nums">
            {score} / {total}
          </span>
        </div>
        <ul className="space-y-1.5">
          {rubric.map((r, i) => (
            <li key={i}>
              <label className="flex cursor-pointer items-start gap-2 text-[13px] text-ink-2">
                <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent)]" checked={doc.rubric[i]} onChange={(e) => setDoc((d) => ({ ...d, rubric: d.rubric.map((x, j) => (j === i ? e.target.checked : x)) }))} />
                <span>
                  {r.text} <span className="text-ink-3">({r.points} pts)</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={copy}>Copy as Markdown</Button>
        <Button onClick={download}>Download (.md)</Button>
        <Button onClick={clear}>Clear report</Button>
        {status && <span className="text-[13px] text-ink-2" role="status">{status}</span>}
      </div>
    </Frame>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] text-ink-2">
        {label}
      </label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className="input text-[13px]" />
    </div>
  );
}

function SectionBox({ heading, prompt, guide, value, onChange, extra }: { heading: string; prompt: string; guide: string; value: string; onChange: (v: string) => void; extra?: ReactNode }) {
  const id = useId();
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-sm font-semibold">
          {heading}
        </label>
        <span className="text-xs text-ink-3">
          {words(value)} words · aim for {guide}
        </span>
      </div>
      <p className="mb-1 text-[13px] leading-5 text-ink-2">{prompt}</p>
      <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={heading === 'Results' || heading === 'Calculations' ? 8 : 5} spellCheck className="input min-h-24 font-mono text-[13px] leading-5" data-section={heading} />
      {extra && <div className="mt-1">{extra}</div>}
    </div>
  );
}
