import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Clock, FlagTriangleRight, Hammer } from 'lucide-react';
import type { CourseworkItem } from '@/data/types';
import { useProgress } from '@/store/progress';
import { courseworkHref, courseworkLabel, courseworkProgress } from '@/lib/coursework';
import { Inline } from '@/lib/markdown';

/** A machine problem or final project, placed in the course at the point it falls due. */
export function CourseworkRow({ item, compact = false }: { item: CourseworkItem; compact?: boolean }) {
  const { checks } = useProgress();
  const p = courseworkProgress(item, checks);
  const finished = p.total > 0 && p.done === p.total;
  const Icon = finished ? CheckCircle2 : item.kind === 'final' ? FlagTriangleRight : Hammer;
  return (
    <Link
      to={courseworkHref(item)}
      className={`group flex items-center gap-3 rounded-xl border transition-colors hover:border-accent/50 ${
        compact ? 'border-transparent px-2 py-1.5 hover:bg-surface-2' : 'border-accent/25 bg-accent-soft/40 p-4'
      }`}
    >
      <Icon size={compact ? 16 : 20} className={`shrink-0 ${finished ? 'text-emerald-500' : 'text-accent'}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-widest text-ink-3">{courseworkLabel(item)}</div>
        <div className={`font-semibold ${compact ? 'truncate text-sm' : 'text-base'}`}>
          <Inline>{item.title}</Inline>
        </div>
        {!compact && (
          <>
            <p className="mt-0.5 text-sm text-ink-2">
              <Inline>{item.summary}</Inline>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink-3">
              <span className="chip">{item.language}</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} aria-hidden /> ≈ {item.estimatedHours} h
              </span>
              <span className="tabular-nums">
                {p.done}/{p.total} done
              </span>
            </div>
          </>
        )}
      </div>
      {compact ? (
        <span className="shrink-0 text-xs tabular-nums text-ink-3">
          {p.done}/{p.total}
        </span>
      ) : (
        <ChevronRight size={18} className="shrink-0 text-ink-3 group-hover:text-accent" aria-hidden />
      )}
    </Link>
  );
}
