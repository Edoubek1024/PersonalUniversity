import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { subjects, totalLessonCount } from '@/data/subjects';
import { categories } from '@/data/categories';
import { subjectCompletion, subjectStatus, useProgress } from '@/store/progress';
import { recentlyCompleted, recommend } from '@/lib/recommend';
import { relativeTime } from '@/lib/format';
import { SubjectCard } from '@/components/SubjectCard';
import { ProgressRing, SectionTitle, accentFor } from '@/components/ui';

export function Dashboard() {
  const { completedLessons, lastVisited } = useProgress();
  const doneCount = Object.keys(completedLessons).filter((id) => subjects.some((s) => s.lessons.some((l) => l.id === id))).length;
  const overallPct = totalLessonCount ? Math.round((doneCount / totalLessonCount) * 100) : 0;
  const active = subjects.filter((s) => subjectStatus(s, completedLessons) === 'active');
  const complete = subjects.filter((s) => subjectStatus(s, completedLessons) === 'complete');
  const recs = recommend(completedLessons, lastVisited, 5);
  const recent = recentlyCompleted(completedLessons, 6);
  const totalHours = subjects.reduce((n, s) => n + s.estimatedHours, 0);
  const hoursDone = subjects.reduce((n, s) => n + (s.estimatedHours * subjectCompletion(s, completedLessons).pct) / 100, 0);

  return (
    <div className="space-y-10 animate-rise">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-3">Your personal university</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-2">
            {subjects.length} subjects, {totalLessonCount} lessons and about {totalHours.toLocaleString()} hours of study across computer science, physics and astronomy.
          </p>
        </div>
        <div className="card flex items-center gap-4 px-5 py-4">
          <ProgressRing pct={overallPct} size={64} stroke={6} accent="emerald" />
          <div className="text-sm">
            <div className="font-semibold">Overall progress</div>
            <div className="text-ink-2">
              {doneCount} of {totalLessonCount} lessons
            </div>
            <div className="text-xs text-ink-3">≈ {Math.round(hoursDone)} h of {totalHours.toLocaleString()} h</div>
          </div>
        </div>
      </header>

      <section aria-labelledby="categories">
        <SectionTitle id="categories">Categories</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {categories.map((c) => {
            const subs = subjects.filter((s) => s.category === c.id);
            const total = subs.reduce((n, s) => n + s.lessonCount, 0);
            const done = subs.reduce((n, s) => n + subjectCompletion(s, completedLessons).done, 0);
            const pct = total ? Math.round((done / total) * 100) : 0;
            const a = accentFor(c.id);
            return (
              <Link key={c.id} to={`/subjects?category=${c.id}`} className={`card group flex items-center gap-4 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 ${a.ring}`}>
                <ProgressRing pct={pct} accent={c.accent} />
                <div className="min-w-0">
                  <div className={`text-[15px] font-semibold ${a.text}`}>{c.title}</div>
                  <div className="text-xs text-ink-3">
                    {subs.length} subjects · {total} lessons
                  </div>
                </div>
                <ArrowRight size={16} className="ml-auto text-ink-3 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="next">
          <SectionTitle id="next">Recommended next</SectionTitle>
          {recs.length === 0 ? (
            <p className="text-sm text-ink-2">Everything is complete. Remarkable.</p>
          ) : (
            <ul className="card divide-y divide-line">
              {recs.map((r) => {
                const a = accentFor(r.subject.category);
                return (
                  <li key={r.lesson.id}>
                    <Link to={`/subjects/${r.lesson.id}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-surface-2">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.bg} ${a.text}`}>
                        <Sparkles size={16} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{r.lesson.title}</div>
                        <div className="truncate text-xs text-ink-3">
                          {r.subject.title} · {r.reason}
                        </div>
                      </div>
                      <ArrowRight size={16} className="shrink-0 text-ink-3" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section aria-labelledby="recent">
          <SectionTitle id="recent">Recently completed</SectionTitle>
          {recent.length === 0 ? (
            <p className="text-sm text-ink-2">No lessons completed yet. Pick a recommendation to begin.</p>
          ) : (
            <ul className="card divide-y divide-line">
              {recent.map((r) => (
                <li key={r.lesson.id}>
                  <Link to={`/subjects/${r.lesson.id}`} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-surface-2">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm">{r.lesson.title}</div>
                      <div className="truncate text-xs text-ink-3">{r.subject.title}</div>
                    </div>
                    <span className="shrink-0 text-xs text-ink-3">{relativeTime(r.at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-labelledby="active">
        <SectionTitle
          id="active"
          action={
            <Link to="/subjects" className="text-sm text-accent hover:underline">
              All subjects
            </Link>
          }
        >
          Active subjects
        </SectionTitle>
        {active.length === 0 ? (
          <p className="text-sm text-ink-2">No active subjects. Start one from the catalog or a learning path.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {active.map((s) => (
              <SubjectCard key={s.id} subject={s} compact />
            ))}
          </div>
        )}
      </section>

      {complete.length > 0 && (
        <section aria-labelledby="done">
          <SectionTitle id="done">Completed subjects</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {complete.map((s) => (
              <SubjectCard key={s.id} subject={s} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
