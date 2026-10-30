import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import type { Subject } from '@/data/types';
import { subjectById } from '@/data/subjects';
import { subjectCompletion, useProgress } from '@/store/progress';
import { CategoryBadge, ProgressBar, accentFor } from './ui';
import { categoryById } from '@/data/categories';

/**
 * Groups subjects into prerequisite "levels": level 0 has no prerequisites,
 * level n has all prerequisites in levels < n. Rendered as tiers with the
 * prerequisite names listed on each card, which stays readable on mobile.
 */
export function PrerequisiteMap({ subjects }: { subjects: Subject[] }) {
  const { completedLessons } = useProgress();
  const ids = new Set(subjects.map((s) => s.id));
  const level = new Map<string, number>();
  const depth = (s: Subject, seen = new Set<string>()): number => {
    if (level.has(s.id)) return level.get(s.id)!;
    if (seen.has(s.id)) return 0;
    seen.add(s.id);
    const d = s.prerequisites.length ? 1 + Math.max(...s.prerequisites.map((p) => (subjectById.get(p) ? depth(subjectById.get(p)!, seen) : 0))) : 0;
    level.set(s.id, d);
    return d;
  };
  subjects.forEach((s) => depth(s));
  const maxLevel = Math.max(0, ...subjects.map((s) => level.get(s.id) ?? 0));
  const tiers = Array.from({ length: maxLevel + 1 }, (_, i) => subjects.filter((s) => level.get(s.id) === i));

  return (
    <div className="space-y-4">
      {tiers.map((tier, i) =>
        tier.length === 0 ? null : (
          <section key={i} aria-label={`Level ${i}`}>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-3">
              {i > 0 && <ArrowDown size={12} aria-hidden />}
              {i === 0 ? 'Start here · no prerequisites' : `Level ${i}`}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {tier.map((s) => {
                const c = subjectCompletion(s, completedLessons);
                const a = accentFor(s.category);
                return (
                  <Link key={s.id} to={`/subjects/${s.id}`} className={`card flex flex-col gap-2 p-3 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 ${a.ring}`}>
                    <div className="flex items-center justify-between gap-2">
                      <CategoryBadge category={s.category} />
                      <span className="text-xs tabular-nums text-ink-3">{c.pct}%</span>
                    </div>
                    <div className="text-sm font-semibold">{s.title}</div>
                    {s.prerequisites.length > 0 && (
                      <ul className="flex flex-wrap gap-1" aria-label="Prerequisites">
                        {s.prerequisites.map((p) => {
                          const ps = subjectById.get(p);
                          const met = ps ? subjectCompletion(ps, completedLessons).pct >= 60 : false;
                          return (
                            <li key={p} className={`chip ${met ? 'text-emerald-600 dark:text-emerald-300' : ''} ${ids.has(p) ? '' : 'opacity-60'}`}>
                              {ps?.title ?? p}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <ProgressBar pct={c.pct} accent={categoryById[s.category].accent} label={`${s.title} progress`} />
                  </Link>
                );
              })}
            </div>
          </section>
        ),
      )}
    </div>
  );
}
