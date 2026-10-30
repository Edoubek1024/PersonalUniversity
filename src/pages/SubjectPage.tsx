import { Link, useParams } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Clock, Layers, Lock, RotateCcw, Route } from 'lucide-react';
import { subjectById, subjects } from '@/data/subjects';
import { learningPaths } from '@/data/paths';
import { categoryById } from '@/data/categories';
import { moduleCompletion, subjectCompletion, useProgress } from '@/store/progress';
import { Inline, Markdown } from '@/lib/markdown';
import { nextLessonIn } from '@/lib/recommend';
import { LessonRow } from '@/components/LessonRow';
import { CategoryBadge, Checkbox, DifficultyBadge, ProgressBar, ProgressRing, SectionTitle, accentFor } from '@/components/ui';
import { NotFound } from './NotFound';

export function SubjectPage() {
  const { subjectId = '' } = useParams();
  const subject = subjectById.get(subjectId);
  const { completedLessons, checks, toggleCheck, bookmarks, toggleBookmark, resetSubject } = useProgress();
  if (!subject) return <NotFound />;

  const c = subjectCompletion(subject, completedLessons);
  const accent = categoryById[subject.category].accent;
  const a = accentFor(subject.category);
  const next = nextLessonIn(subject, completedLessons);
  const dependents = subjects.filter((s) => s.prerequisites.includes(subject.id));
  const paths = learningPaths.filter((p) => p.subjectIds.includes(subject.id));
  const outline = subject.lessonCount - subject.completeLessonCount;
  const bookmarked = !!bookmarks[subject.id];
  const masteryDone = subject.masteryChecklist.filter((_, i) => checks[`${subject.id}#mastery:${i}`]).length;

  return (
    <article className="space-y-10 animate-rise">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-3">
          <Link to="/subjects" className="hover:text-ink">
            Subjects
          </Link>{' '}
          / <span>{categoryById[subject.category].title}</span>
        </nav>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={subject.category} />
              <DifficultyBadge difficulty={subject.difficulty} />
              {!subject.core && <span className="chip">Additional subject</span>}
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{subject.title}</h1>
            <p className="mt-2 text-base text-ink-2">{subject.tagline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-2">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} aria-hidden /> ≈ {subject.estimatedHours} hours
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Layers size={14} aria-hidden /> {subject.modules.length} modules · {subject.lessonCount} lessons
              </span>
              {outline > 0 && <span className="chip">{outline} lessons still outline</span>}
            </div>
          </div>
          <div className="card flex items-center gap-4 p-4 lg:min-w-[260px]">
            <ProgressRing pct={c.pct} accent={accent} size={64} stroke={6} />
            <div className="flex-1 text-sm">
              <div className="font-semibold">
                {c.done} / {c.total} lessons
              </div>
              <div className="text-xs text-ink-3">
                Mastery {masteryDone}/{subject.masteryChecklist.length}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {next ? (
                  <Link to={`/subjects/${next.id}`} className="btn-primary px-3 py-1.5 text-xs">
                    {c.done === 0 ? 'Start' : 'Continue'}
                  </Link>
                ) : (
                  <span className="text-xs font-medium text-emerald-500">All lessons complete</span>
                )}
                <button type="button" onClick={() => toggleBookmark(subject.id)} className="btn-outline px-2.5 py-1.5 text-xs" aria-pressed={bookmarked}>
                  {bookmarked ? <BookmarkCheck size={14} className="text-amber-500" /> : <Bookmark size={14} />}
                  {bookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <section aria-labelledby="about">
            <SectionTitle id="about">About this subject</SectionTitle>
            <Markdown>{subject.description}</Markdown>
          </section>

          <section aria-labelledby="curriculum">
            <SectionTitle id="curriculum">Curriculum</SectionTitle>
            <ol className="space-y-4">
              {subject.modules.map((m, mi) => {
                const mc = moduleCompletion(m, completedLessons);
                return (
                  <li key={m.id} className="card overflow-hidden">
                    <div className="border-b border-line p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-widest text-ink-3">Module {mi + 1}</div>
                          <h3 className="mt-0.5 text-base font-semibold">{m.title}</h3>
                          <p className="mt-1 text-sm text-ink-2">{m.description}</p>
                        </div>
                        <span className="shrink-0 text-xs tabular-nums text-ink-3">
                          {mc.done}/{mc.total}
                        </span>
                      </div>
                      <div className="mt-3">
                        <ProgressBar pct={mc.pct} accent={accent} label={`${m.title} progress`} />
                      </div>
                    </div>
                    <ol className="p-2">
                      {m.lessons.map((l) => (
                        <LessonRow key={l.id} lesson={l} index={l.index} />
                      ))}
                    </ol>
                    {m.project && (
                      <div className="border-t border-line bg-surface-2/50 p-4">
                        <div className="text-xs font-semibold uppercase tracking-widest text-ink-3">Module project · ≈ {m.project.estimatedHours} h</div>
                        <h4 className="mt-1 text-sm font-semibold">{m.project.title}</h4>
                        <Markdown className="mt-1 text-sm">{m.project.description}</Markdown>
                        <ul className="mt-2">
                          {m.project.deliverables.map((d, i) => (
                            <Checkbox key={i} id={`${m.project!.id}#d:${i}`} checked={!!checks[`${m.project!.id}#d:${i}`]} onChange={() => toggleCheck(`${m.project!.id}#d:${i}`)} label={<Inline>{d}</Inline>} />
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>

          <section aria-labelledby="capstone" className="card p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-3">Capstone project · ≈ {subject.capstone.estimatedHours} h</div>
            <h2 id="capstone" className="mt-1 text-xl font-semibold tracking-tight">
              {subject.capstone.title}
            </h2>
            <Markdown className="mt-2">{subject.capstone.description}</Markdown>
            <h3 className="mt-4 text-sm font-semibold">Deliverables</h3>
            <ul className="mt-1">
              {subject.capstone.deliverables.map((d, i) => (
                <Checkbox key={i} id={`${subject.capstone.id}#d:${i}`} checked={!!checks[`${subject.capstone.id}#d:${i}`]} onChange={() => toggleCheck(`${subject.capstone.id}#d:${i}`)} label={<Inline>{d}</Inline>} />
              ))}
            </ul>
            {subject.capstone.stretchGoals && subject.capstone.stretchGoals.length > 0 && (
              <>
                <h3 className="mt-4 text-sm font-semibold">Stretch goals</h3>
                <ul className="mt-1 list-disc pl-6 text-sm text-ink-2">
                  {subject.capstone.stretchGoals.map((g, i) => (
                    <li key={i}>
                      <Inline>{g}</Inline>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section aria-labelledby="mastery" className="card p-5">
            <SectionTitle id="mastery">Mastery checklist</SectionTitle>
            <p className="mb-2 text-sm text-ink-2">Tick these only when you could demonstrate them to a sceptical examiner.</p>
            <ul>
              {subject.masteryChecklist.map((item, i) => (
                <Checkbox key={i} id={`${subject.id}#mastery:${i}`} checked={!!checks[`${subject.id}#mastery:${i}`]} onChange={() => toggleCheck(`${subject.id}#mastery:${i}`)} label={<Inline>{item}</Inline>} />
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section aria-labelledby="prereqs" className="card p-4">
            <h2 id="prereqs" className="text-sm font-semibold">
              Prerequisites
            </h2>
            {subject.prerequisites.length === 0 ? (
              <p className="mt-2 text-sm text-ink-2">None. You can start here.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {subject.prerequisites.map((p) => {
                  const ps = subjectById.get(p);
                  const pc = ps ? subjectCompletion(ps, completedLessons) : null;
                  return (
                    <li key={p}>
                      {ps ? (
                        <Link to={`/subjects/${p}`} className="flex items-center justify-between gap-2 rounded-md px-2 py-1 text-sm hover:bg-surface-2">
                          <span className="inline-flex items-center gap-1.5">
                            {pc && pc.pct < 60 && <Lock size={12} className="text-amber-500" aria-label="Not yet met" />}
                            {ps.title}
                          </span>
                          <span className="text-xs tabular-nums text-ink-3">{pc?.pct}%</span>
                        </Link>
                      ) : (
                        <span className="px-2 text-sm text-ink-3">{p} (planned)</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            {subject.recommendedBackground && subject.recommendedBackground.length > 0 && (
              <>
                <h3 className="mt-4 text-xs font-semibold uppercase tracking-widest text-ink-3">Helpful background</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-ink-2">
                  {subject.recommendedBackground.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

          {dependents.length > 0 && (
            <section aria-labelledby="unlocks" className="card p-4">
              <h2 id="unlocks" className="text-sm font-semibold">
                Unlocks
              </h2>
              <ul className="mt-2 space-y-1">
                {dependents.map((d) => (
                  <li key={d.id}>
                    <Link to={`/subjects/${d.id}`} className="block rounded-md px-2 py-1 text-sm hover:bg-surface-2">
                      {d.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {paths.length > 0 && (
            <section aria-labelledby="in-paths" className="card p-4">
              <h2 id="in-paths" className="text-sm font-semibold">
                Part of
              </h2>
              <ul className="mt-2 space-y-1">
                {paths.map((p) => (
                  <li key={p.id}>
                    <Link to={`/paths/${p.id}`} className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-surface-2 ${a.text}`}>
                      <Route size={14} aria-hidden /> {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="card p-4">
            <h2 className="text-sm font-semibold">Tags</h2>
            <ul className="mt-2 flex flex-wrap gap-1">
              {subject.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Reset all progress, notes and checklists for “${subject.title}”? This cannot be undone.`)) resetSubject(subject);
            }}
            className="btn-ghost w-full justify-center text-xs text-ink-3"
          >
            <RotateCcw size={12} aria-hidden /> Reset subject progress
          </button>
        </aside>
      </div>
    </article>
  );
}
