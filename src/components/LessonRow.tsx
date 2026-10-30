import { Link } from 'react-router-dom';
import { Bookmark, CheckCircle2, Circle, Clock } from 'lucide-react';
import type { Lesson } from '@/data/types';
import { useProgress } from '@/store/progress';
import { hours } from '@/lib/format';
import { Inline } from '@/lib/markdown';

export function LessonRow({ lesson, index, subtitle }: { lesson: Lesson; index?: number; subtitle?: string }) {
  const { completedLessons, bookmarks } = useProgress();
  const done = !!completedLessons[lesson.id];
  return (
    <li>
      <Link
        to={`/subjects/${lesson.id}`}
        className={`group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-surface-2 ${done ? 'text-ink-2' : ''}`}
      >
        {done ? (
          <CheckCircle2 size={18} className="shrink-0 text-emerald-500" aria-label="Completed" />
        ) : (
          <Circle size={18} className="shrink-0 text-ink-3 group-hover:text-accent" aria-label="Not completed" />
        )}
        {index !== undefined && <span className="w-6 shrink-0 text-right font-mono text-xs text-ink-3">{index + 1}</span>}
        <div className="min-w-0 flex-1">
          <div className={`truncate text-sm font-medium ${done ? 'line-through decoration-ink-3/50' : ''}`}><Inline>{lesson.title}</Inline></div>
          {subtitle && <div className="truncate text-xs text-ink-3">{subtitle}</div>}
        </div>
        {lesson.status === 'outline' && <span className="chip">Outline</span>}
        {bookmarks[lesson.id] && <Bookmark size={14} className="shrink-0 fill-current text-amber-500" aria-label="Bookmarked" />}
        <span className="hidden shrink-0 items-center gap-1 text-xs text-ink-3 sm:inline-flex">
          <Clock size={12} aria-hidden /> {hours(lesson.estimatedMinutes)}
        </span>
      </Link>
    </li>
  );
}
