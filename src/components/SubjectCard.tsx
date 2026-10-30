import { Link } from 'react-router-dom';
import { Clock, Layers, Lock } from 'lucide-react';
import type { Subject } from '@/data/types';
import { categoryById } from '@/data/categories';
import { subjectById } from '@/data/subjects';
import { subjectCompletion, useProgress } from '@/store/progress';
import { prerequisiteReadiness } from '@/lib/recommend';
import { CategoryBadge, DifficultyBadge, ProgressBar, accentFor } from './ui';

export function SubjectCard({ subject, compact = false }: { subject: Subject; compact?: boolean }) {
  const { completedLessons } = useProgress();
  const c = subjectCompletion(subject, completedLessons);
  const accent = categoryById[subject.category].accent;
  const a = accentFor(subject.category);
  const readiness = prerequisiteReadiness(subject, completedLessons);
  const unmet = subject.prerequisites.filter((p) => {
    const ps = subjectById.get(p);
    return ps && subjectCompletion(ps, completedLessons).pct < 60;
  });

  return (
    <Link
      to={`/subjects/${subject.id}`}
      className={`card group flex flex-col gap-3 p-4 transition-all hover:-translate-y-0.5 hover:border-ink-3/40 hover:shadow-lg focus-visible:ring-2 ${a.ring} ${compact ? '' : 'min-h-[180px]'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <CategoryBadge category={subject.category} />
        <div className="flex items-center gap-1">
          {!subject.core && <span className="chip">Additional</span>}
          <DifficultyBadge difficulty={subject.difficulty} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-[15px] font-semibold leading-snug tracking-tight group-hover:text-accent">{subject.title}</h3>
        {!compact && <p className="mt-1 line-clamp-2 text-sm text-ink-2">{subject.tagline}</p>}
      </div>
      <div className="flex items-center gap-3 text-xs text-ink-3">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden /> {subject.estimatedHours} h
        </span>
        <span className="inline-flex items-center gap-1">
          <Layers size={12} aria-hidden /> {subject.lessonCount} lessons
        </span>
        {readiness < 1 && (
          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-300" title={`Prerequisites not yet met: ${unmet.join(', ')}`}>
            <Lock size={12} aria-hidden /> {unmet.length} prereq
          </span>
        )}
        <span className="ml-auto tabular-nums">
          {c.done}/{c.total}
        </span>
      </div>
      <ProgressBar pct={c.pct} accent={accent} label={`${subject.title} progress`} />
    </Link>
  );
}
