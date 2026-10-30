import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { subjects } from '@/data/subjects';
import { categories } from '@/data/categories';
import type { CategoryId, Difficulty } from '@/data/types';
import { subjectStatus, useProgress, type SubjectStatus } from '@/store/progress';
import { difficultyRank } from '@/lib/format';
import { SubjectCard } from '@/components/SubjectCard';
import { PrerequisiteMap } from '@/components/PrerequisiteMap';

const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced', 'expert'];
const statuses: { id: SubjectStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'Any status' },
  { id: 'not-started', label: 'Not started' },
  { id: 'active', label: 'In progress' },
  { id: 'complete', label: 'Completed' },
];

export function SubjectsPage() {
  const [params, setParams] = useSearchParams();
  const { completedLessons } = useProgress();
  const q = params.get('q') ?? '';
  const category = (params.get('category') ?? 'all') as CategoryId | 'all';
  const difficulty = (params.get('difficulty') ?? 'all') as Difficulty | 'all';
  const status = (params.get('status') ?? 'all') as SubjectStatus | 'all';
  const sort = params.get('sort') ?? 'order';
  const view = params.get('view') ?? 'cards';

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all' || (key === 'sort' && value === 'order') || (key === 'view' && value === 'cards')) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let list = subjects.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (difficulty !== 'all' && s.difficulty !== difficulty) return false;
      if (status !== 'all' && subjectStatus(s, completedLessons) !== status) return false;
      if (ql && ![s.title, s.tagline, s.tags.join(' ')].join(' ').toLowerCase().includes(ql)) return false;
      return true;
    });
    if (sort === 'difficulty') list = [...list].sort((a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]);
    else if (sort === 'hours') list = [...list].sort((a, b) => a.estimatedHours - b.estimatedHours);
    else if (sort === 'title') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else list = [...list].sort((a, b) => a.prerequisites.length - b.prerequisites.length || a.title.localeCompare(b.title));
    return list;
  }, [q, category, difficulty, status, sort, completedLessons]);

  return (
    <div className="space-y-6 animate-rise">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Subjects</h1>
        <p className="mt-2 text-sm text-ink-2">
          {subjects.filter((s) => s.core).length} core tracks and {subjects.filter((s) => !s.core).length} additional subjects. Filter, sort, or view the prerequisite map.
        </p>
      </header>

      <form className="card grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-6" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="sm:col-span-2">
          <span className="sr-only">Search subjects</span>
          <input className="input" placeholder="Filter by title or tag…" value={q} onChange={(e) => set('q', e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Category</span>
          <select className="input" value={category} onChange={(e) => set('category', e.target.value)}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Difficulty</span>
          <select className="input" value={difficulty} onChange={(e) => set('difficulty', e.target.value)}>
            <option value="all">Any difficulty</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d[0].toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Status</span>
          <select className="input" value={status} onChange={(e) => set('status', e.target.value)}>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Sort</span>
          <select className="input" value={sort} onChange={(e) => set('sort', e.target.value)}>
            <option value="order">Suggested order</option>
            <option value="difficulty">Difficulty</option>
            <option value="hours">Estimated hours</option>
            <option value="title">Title</option>
          </select>
        </label>
      </form>

      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-3" aria-live="polite">
          {filtered.length} subject{filtered.length === 1 ? '' : 's'}
        </p>
        <div role="tablist" aria-label="View" className="flex rounded-lg border border-line p-0.5">
          {[
            ['cards', 'Cards'],
            ['map', 'Prerequisite map'],
          ].map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={view === id}
              type="button"
              onClick={() => set('view', id)}
              className={`rounded-md px-3 py-1 text-xs font-medium ${view === id ? 'bg-surface-2 text-ink' : 'text-ink-3 hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === 'map' ? (
        <PrerequisiteMap subjects={filtered} />
      ) : filtered.length === 0 ? (
        <p className="card p-8 text-center text-sm text-ink-2">No subjects match these filters.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <SubjectCard key={s.id} subject={s} />
          ))}
        </div>
      )}
    </div>
  );
}
