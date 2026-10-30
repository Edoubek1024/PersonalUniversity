import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock,
  ExternalLink,
  Link2,
} from 'lucide-react';
import { lessonById, subjectById } from '@/data/subjects';
import type { Exercise, Resource, SelfCheck } from '@/data/types';
import { useProgress } from '@/store/progress';
import { Inline, Markdown } from '@/lib/markdown';
import { hours } from '@/lib/format';
import { accentFor } from '@/components/ui';
import { NotFound } from './NotFound';

const costLabel = { free: 'Free', paid: 'Paid', freemium: 'Freemium' } as const;
const costStyle = {
  free: 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10',
  paid: 'text-rose-600 dark:text-rose-300 bg-rose-500/10',
  freemium: 'text-amber-600 dark:text-amber-300 bg-amber-500/10',
} as const;
const kindLabel: Record<Exercise['kind'], string> = {
  problem: 'Problem',
  coding: 'Code',
  derivation: 'Derivation',
  simulation: 'Simulation',
  'data-analysis': 'Data',
  reading: 'Reading',
  writing: 'Writing',
};

export function LessonPage() {
  const { subjectId = '', moduleSlug = '', lessonSlug = '' } = useParams();
  const lessonId = `${subjectId}/${moduleSlug}/${lessonSlug}`;
  const lesson = lessonById.get(lessonId);
  const subject = subjectById.get(subjectId);
  const { completedLessons, toggleLesson, checks, toggleCheck, notes, setNote, bookmarks, toggleBookmark, visit, selfChecks, setSelfCheck } = useProgress();
  const [noteDraft, setNoteDraft] = useState(notes[lessonId] ?? '');

  useEffect(() => {
    if (lesson) visit(lesson.id);
    setNoteDraft(notes[lessonId] ?? '');
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (noteDraft !== (notes[lessonId] ?? '')) setNote(lessonId, noteDraft);
    }, 500);
    return () => clearTimeout(t);
  }, [noteDraft, lessonId, notes, setNote]);

  if (!lesson || !subject) return <NotFound />;

  const mod = subject.modules.find((m) => m.id === lesson.moduleId)!;
  const done = !!completedLessons[lesson.id];
  const prev = subject.lessons[lesson.index - 1];
  const next = subject.lessons[lesson.index + 1];
  const accent = accentFor(subject.category);
  const bookmarked = !!bookmarks[lesson.id];
  const exercisesDone = lesson.exercises.filter((e) => checks[e.id]).length;
  const related = (lesson.relatedLessons ?? []).map((id) => ({ id, lesson: lessonById.get(id) }));
  const prereqLessons = (lesson.prerequisiteLessons ?? []).map((id) => ({ id, lesson: lessonById.get(id) }));

  return (
    <article className="mx-auto max-w-3xl space-y-10 animate-rise">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-ink-3">
          <Link to="/subjects" className="hover:text-ink">
            Subjects
          </Link>
          <span>/</span>
          <Link to={`/subjects/${subject.id}`} className={`hover:text-ink ${accent.text}`}>
            {subject.title}
          </Link>
          <span>/</span>
          <span>{mod.title}</span>
        </nav>
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
            <span className="font-mono">
              Lesson {lesson.index + 1} of {subject.lessonCount}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} aria-hidden /> {hours(lesson.estimatedMinutes)}
            </span>
            {lesson.status === 'outline' && <span className="chip">Outline only</span>}
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{lesson.title}</h1>
          <p className="mt-3 text-base text-ink-2">
            <Inline>{lesson.summary}</Inline>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => toggleLesson(lesson.id)} className={done ? 'btn-outline' : 'btn-primary'} aria-pressed={done}>
            {done ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} />}
            {done ? 'Completed' : 'Mark complete'}
          </button>
          <button type="button" onClick={() => toggleBookmark(lesson.id)} className="btn-outline" aria-pressed={bookmarked}>
            {bookmarked ? <BookmarkCheck size={16} className="text-amber-500" /> : <Bookmark size={16} />}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </header>

      {(prereqLessons.length > 0 || related.length > 0) && (
        <section aria-labelledby="links" className="card p-4">
          <h2 id="links" className="text-sm font-semibold">
            Connected lessons
          </h2>
          {prereqLessons.length > 0 && (
            <div className="mt-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-3">Do first</div>
              <ul className="mt-1 space-y-1">
                {prereqLessons.map((r) => (
                  <li key={r.id}>
                    <LessonLink id={r.id} title={r.lesson?.title} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {related.length > 0 && (
            <div className="mt-2">
              <div className="text-xs font-semibold uppercase tracking-widest text-ink-3">Canonical lessons for shared concepts</div>
              <ul className="mt-1 space-y-1">
                {related.map((r) => (
                  <li key={r.id}>
                    <LessonLink id={r.id} title={r.lesson?.title} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section aria-labelledby="objectives" className="grid gap-6 sm:grid-cols-2">
        <div className="card p-4">
          <h2 id="objectives" className="text-sm font-semibold">
            After this lesson you can
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">
            {lesson.objectives.map((o, i) => (
              <li key={i}>
                <Inline>{o}</Inline>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="text-sm font-semibold">Concepts to understand</h2>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {lesson.concepts.map((c, i) => (
              <li key={i} className="rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs text-ink-2">
                <Inline>{c}</Inline>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="explanation">
        <h2 id="explanation" className="mb-2 text-xl font-semibold tracking-tight">
          What to learn
        </h2>
        <Markdown>{lesson.explanation}</Markdown>
      </section>

      <section aria-labelledby="resources">
        <h2 id="resources" className="mb-3 text-xl font-semibold tracking-tight">
          Resources
        </h2>
        <ul className="space-y-2">
          {lesson.resources.map((r) => (
            <ResourceItem key={r.id} r={r} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="exercises">
        <div className="mb-3 flex items-end justify-between">
          <h2 id="exercises" className="text-xl font-semibold tracking-tight">
            Exercises
          </h2>
          <span className="text-xs tabular-nums text-ink-3">
            {exercisesDone}/{lesson.exercises.length} done
          </span>
        </div>
        <ol className="space-y-3">
          {lesson.exercises.map((ex, i) => (
            <ExerciseItem key={ex.id} ex={ex} n={i + 1} checked={!!checks[ex.id]} onToggle={() => toggleCheck(ex.id)} />
          ))}
        </ol>
      </section>

      <section aria-labelledby="self-check">
        <h2 id="self-check" className="mb-1 text-xl font-semibold tracking-tight">
          Self-assessment
        </h2>
        <p className="mb-3 text-sm text-ink-2">Answer each question out loud or on paper before revealing the outline. Be honest about whether you got it.</p>
        <ol className="space-y-2">
          {lesson.selfAssessment.map((s, i) => (
            <SelfCheckItem key={s.id} s={s} n={i + 1} value={selfChecks[s.id] ?? null} onChange={(v) => setSelfCheck(s.id, v)} />
          ))}
        </ol>
      </section>

      <section aria-labelledby="notes">
        <h2 id="notes" className="mb-2 text-xl font-semibold tracking-tight">
          Your notes
        </h2>
        <textarea
          value={noteDraft}
          onChange={(e) => setNoteDraft(e.target.value)}
          rows={6}
          placeholder="Write your own summary, derivations, questions, or links. Saved automatically in this browser."
          className="input min-h-[140px] resize-y font-mono text-[13px] leading-6"
          aria-label="Personal notes for this lesson"
        />
      </section>

      <footer className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {prev ? (
          <Link to={`/subjects/${prev.id}`} className="btn-outline">
            <ArrowLeft size={16} aria-hidden />
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-2 sm:justify-end">
          {!done && (
            <button type="button" onClick={() => toggleLesson(lesson.id)} className="btn-primary">
              <CheckCircle2 size={16} aria-hidden /> Complete
            </button>
          )}
          {next ? (
            <Link to={`/subjects/${next.id}`} className="btn-outline">
              <span className="truncate">{next.title}</span>
              <ArrowRight size={16} aria-hidden />
            </Link>
          ) : (
            <Link to={`/subjects/${subject.id}#capstone`} className="btn-outline">
              Capstone <ArrowRight size={16} aria-hidden />
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}

function LessonLink({ id, title }: { id: string; title?: string }) {
  const subjectId = id.split('/')[0];
  const s = subjectById.get(subjectId);
  if (!title) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-ink-3">
        <Link2 size={14} aria-hidden /> {id} <span className="chip">not yet written</span>
      </span>
    );
  }
  return (
    <Link to={`/subjects/${id}`} className="inline-flex items-center gap-2 text-sm text-accent hover:underline">
      <Link2 size={14} aria-hidden /> {title}
      {s && <span className="text-xs text-ink-3">· {s.title}</span>}
    </Link>
  );
}

function ResourceItem({ r }: { r: Resource }) {
  return (
    <li className={`card flex items-start gap-3 p-3 ${r.primary ? 'border-accent/40' : ''}`}>
      <div className="min-w-0 flex-1">
        <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent">
          {r.title}
          <ExternalLink size={12} className="shrink-0 text-ink-3" aria-label="(opens in a new tab)" />
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-3">
          {r.provider && <span>{r.provider}</span>}
          <span className="chip">{r.type}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${costStyle[r.cost]}`}>{costLabel[r.cost]}</span>
          {r.primary && <span className="text-accent">Primary</span>}
        </div>
        {r.note && <p className="mt-1 text-sm text-ink-2">{r.note}</p>}
      </div>
    </li>
  );
}

function ExerciseItem({ ex, n, checked, onToggle }: { ex: Exercise; n: number; checked: boolean; onToggle: () => void }) {
  const [showHint, setShowHint] = useState(false);
  return (
    <li className="card p-4">
      <div className="flex items-start gap-3">
        <input id={ex.id} type="checkbox" checked={checked} onChange={onToggle} className="mt-1 h-4 w-4 cursor-pointer accent-indigo-500" aria-label={`Mark exercise ${n} done`} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={ex.id} className={`cursor-pointer text-sm font-semibold ${checked ? 'text-ink-3 line-through' : ''}`}>
              {n}. <Inline>{ex.title}</Inline>
            </label>
            <span className="chip">{kindLabel[ex.kind]}</span>
            <span className="text-[11px] text-ink-3" aria-label={`Difficulty ${ex.difficulty} of 3`}>
              {'●'.repeat(ex.difficulty)}
              {'○'.repeat(3 - ex.difficulty)}
            </span>
          </div>
          <Markdown className="mt-1 text-sm">{ex.prompt}</Markdown>
          {ex.hint && (
            <div className="mt-2">
              <button type="button" onClick={() => setShowHint((s) => !s)} className="text-xs text-accent hover:underline" aria-expanded={showHint}>
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              {showHint && <p className="mt-1 rounded-lg bg-surface-2 p-2 text-sm text-ink-2 animate-fade">{ex.hint}</p>}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function SelfCheckItem({ s, n, value, onChange }: { s: SelfCheck; n: number; value: 'yes' | 'no' | null; onChange: (v: 'yes' | 'no' | null) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="card p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium">
          {n}. <Inline>{s.question}</Inline>
        </p>
        <button type="button" onClick={() => setOpen((o) => !o)} className="btn-ghost shrink-0 px-2 py-1 text-xs" aria-expanded={open}>
          <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
          {open ? 'Hide' : 'Reveal'}
        </button>
      </div>
      {open && (
        <div className="mt-2 space-y-2 animate-fade">
          <Markdown className="rounded-lg bg-surface-2 p-3 text-sm">{s.answerOutline}</Markdown>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-3">Did you get it?</span>
            <button type="button" onClick={() => onChange(value === 'yes' ? null : 'yes')} className={`rounded-md px-2 py-1 ${value === 'yes' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300' : 'bg-surface-2 text-ink-2'}`} aria-pressed={value === 'yes'}>
              Yes
            </button>
            <button type="button" onClick={() => onChange(value === 'no' ? null : 'no')} className={`rounded-md px-2 py-1 ${value === 'no' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-300' : 'bg-surface-2 text-ink-2'}`} aria-pressed={value === 'no'}>
              Not yet
            </button>
          </div>
        </div>
      )}
      {!open && value && <div className={`mt-1 text-xs ${value === 'yes' ? 'text-emerald-500' : 'text-rose-500'}`}>{value === 'yes' ? 'Got it' : 'Revisit'}</div>}
    </li>
  );
}

