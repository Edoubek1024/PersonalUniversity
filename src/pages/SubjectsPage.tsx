import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { subjects } from '@/data/subjects';
import { categories } from '@/data/categories';
import type { CategoryId, Difficulty } from '@/data/types';
import { subjectStatus, useProgress, type SubjectStatus } from '@/store/progress';
import { difficultyRank } from '@/lib/format';
import { SubjectCard } from '@/components/SubjectCard';
import { PrerequisiteMap } from '@/components/PrerequisiteMap';
import { useCourseCodes, useSettings } from '@/store/settings';
import { compareCodes } from '@/data/universities';
import type { Subject } from '@/data/types';

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
  const cc = useCourseCodes();
  const { setCourseCodes } = useSettings();
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
      if (ql && ![s.title, s.tagline, s.tags.join(' '), cc.code(s.id) ?? ''].join(' ').toLowerCase().includes(ql)) return false;
      return true;
    });
    if (sort === 'difficulty') list = [...list].sort((a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]);
    else if (sort === 'hours') list = [...list].sort((a, b) => a.estimatedHours - b.estimatedHours);
    else if (sort === 'title') list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    else list = [...list].sort((a, b) => a.prerequisites.length - b.prerequisites.length || a.title.localeCompare(b.title));
    return list;
  }, [q, category, difficulty, status, sort, completedLessons, cc]);

  // In course-code mode, subjects with a code come first (in code order unless another sort is
  // chosen), then the subjects with no counterpart at the chosen university.
  const groups = useMemo((): { title: string | null; subjects: Subject[] }[] => {
    if (!cc.enabled) return [{ title: null, subjects: filtered }];
    const coded = filtered.filter((s) => cc.code(s.id));
    const rest = filtered.filter((s) => !cc.code(s.id));
    if (sort === 'order') coded.sort((a, b) => compareCodes(cc.code(a.id)!, cc.code(b.id)!));
    return [
      { title: `${cc.university.short} courses`, subjects: coded },
      { title: `Not matched to a ${cc.university.short} course`, subjects: rest },
    ].filter((g) => g.subjects.length > 0);
  }, [filtered, cc, sort]);

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

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="whitespace-nowrap text-sm text-ink-3" aria-live="polite">
          {filtered.length} subject{filtered.length === 1 ? '' : 's'}
        </p>
        <div className="flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-xs text-ink-2" title={`Label subjects by their ${cc.university.short} course codes`}>
          <input type="checkbox" checked={cc.enabled} onChange={(e) => setCourseCodes(e.target.checked)} className="h-3.5 w-3.5 cursor-pointer accent-indigo-500" />
          {cc.university.short} codes
        </label>
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
              className={`whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ${view === id ? 'bg-surface-2 text-ink' : 'text-ink-3 hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
        </div>
      </div>

      {view === 'map' ? (
        <PrerequisiteMap subjects={filtered} />
      ) : filtered.length === 0 ? (
        <p className="card p-8 text-center text-sm text-ink-2">No subjects match these filters.</p>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.title ?? 'all'} aria-label={g.title ?? undefined}>
              {g.title && (
                <h2 className="mb-3 flex items-baseline gap-2 text-sm font-semibold uppercase tracking-widest text-ink-3">
                  {g.title} <span className="font-normal tabular-nums normal-case tracking-normal">· {g.subjects.length}</span>
                </h2>
              )}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {g.subjects.map((s) => (
                  <SubjectCard key={s.id} subject={s} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
