import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Route } from 'lucide-react';
import { learningPaths } from '@/data/paths';
import { subjectById } from '@/data/subjects';
import { categoryById } from '@/data/categories';
import { subjectCompletion, useProgress } from '@/store/progress';
import { nextLessonIn } from '@/lib/recommend';
import { ProgressBar, ProgressRing, CategoryBadge, DifficultyBadge, accentFor } from '@/components/ui';
import { NotFound } from './NotFound';

function pathStats(subjectIds: string[], completed: Record<string, string>) {
  const subs = subjectIds.map((id) => subjectById.get(id)).filter(Boolean);
  const total = subs.reduce((n, s) => n + s!.lessonCount, 0);
  const done = subs.reduce((n, s) => n + subjectCompletion(s!, completed).done, 0);
  const hoursTotal = subs.reduce((n, s) => n + s!.estimatedHours, 0);
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0, hours: hoursTotal, missing: subjectIds.length - subs.length };
}

export function PathsPage() {
  const { completedLessons } = useProgress();
  return (
    <div className="space-y-6 animate-rise">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Learning paths</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          Suggested orders through the catalog. A subject can appear in several paths; your progress in it is shared.
        </p>
      </header>
      <ul className="grid gap-4 md:grid-cols-2">
        {learningPaths.map((p) => {
          const st = pathStats(p.subjectIds, completedLessons);
          return (
            <li key={p.id}>
              <Link to={`/paths/${p.id}`} className="card group flex h-full flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <ProgressRing pct={st.pct} />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold tracking-tight group-hover:text-accent">{p.title}</h2>
                    <p className="mt-1 text-sm text-ink-2">{p.description}</p>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-3 text-xs text-ink-3">
                  <span>{p.subjectIds.length} subjects</span>
                  <span>≈ {st.hours} h</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-accent">
                    View path <ArrowRight size={12} aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function PathPage() {
  const { pathId = '' } = useParams();
  const path = learningPaths.find((p) => p.id === pathId);
  const { completedLessons } = useProgress();
  if (!path) return <NotFound />;
  const st = pathStats(path.subjectIds, completedLessons);
  const firstIncomplete = path.subjectIds.map((id) => subjectById.get(id)).find((s) => s && subjectCompletion(s, completedLessons).pct < 100);

  return (
    <article className="space-y-8 animate-rise">
      <header className="space-y-3">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-3">
          <Link to="/paths" className="hover:text-ink">
            Learning paths
          </Link>
        </nav>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-3">
              <Route size={14} aria-hidden /> Learning path
            </div>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{path.title}</h1>
            <p className="mt-2 text-sm text-ink-2">{path.description}</p>
            <p className="mt-3 rounded-lg border border-line bg-surface-2/60 p-3 text-sm">
              <span className="font-semibold">Outcome. </span>
              {path.outcome}
            </p>
          </div>
          <div className="card flex items-center gap-4 p-4">
            <ProgressRing pct={st.pct} size={64} stroke={6} />
            <div className="text-sm">
              <div className="font-semibold">
                {st.done} / {st.total} lessons
              </div>
              <div className="text-xs text-ink-3">≈ {st.hours} h total</div>
              {firstIncomplete && (
                <Link to={`/subjects/${nextLessonIn(firstIncomplete, completedLessons)?.id ?? firstIncomplete.id}`} className="btn-primary mt-2 px-3 py-1.5 text-xs">
                  Continue
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <ol className="relative space-y-3 border-l border-line pl-6">
        {path.subjectIds.map((id, i) => {
          const s = subjectById.get(id);
          if (!s) {
            return (
              <li key={id} className="relative">
                <span className="absolute -left-[31px] top-3 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-surface text-[10px] font-semibold text-ink-3">{i + 1}</span>
                <div className="card p-4 text-sm text-ink-3">{id} (planned, not yet written)</div>
              </li>
            );
          }
          const c = subjectCompletion(s, completedLessons);
          const a = accentFor(s.category);
          return (
            <li key={id} className="relative">
              <span className={`absolute -left-[31px] top-4 flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold ${c.pct === 100 ? 'border-emerald-500 bg-emerald-500 text-white' : c.pct > 0 ? `border-accent bg-accent-soft ${a.text}` : 'border-line bg-surface text-ink-3'}`}>
                {i + 1}
              </span>
              <Link to={`/subjects/${s.id}`} className="card flex flex-col gap-2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={s.category} />
                  <DifficultyBadge difficulty={s.difficulty} />
                  <span className="ml-auto text-xs tabular-nums text-ink-3">
                    {c.done}/{c.total} · {s.estimatedHours} h
                  </span>
                </div>
                <div className="text-base font-semibold">{s.title}</div>
                <p className="text-sm text-ink-2">{s.tagline}</p>
                <ProgressBar pct={c.pct} accent={categoryById[s.category].accent} label={`${s.title} progress`} />
              </Link>
            </li>
          );
        })}
      </ol>
    </article>
  );
}
