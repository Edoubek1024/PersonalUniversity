import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { CategoryId, Difficulty } from '@/data/types';
import { categoryById } from '@/data/categories';
import { difficultyLabel } from '@/lib/format';

export const accentClasses: Record<string, { text: string; bg: string; ring: string; bar: string; dot: string }> = {
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-300',
    bg: 'bg-indigo-500/10',
    ring: 'ring-indigo-500/30',
    bar: 'bg-indigo-500',
    dot: 'bg-indigo-500',
  },
  sky: {
    text: 'text-sky-600 dark:text-sky-300',
    bg: 'bg-sky-500/10',
    ring: 'ring-sky-500/30',
    bar: 'bg-sky-500',
    dot: 'bg-sky-500',
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-300',
    bg: 'bg-violet-500/10',
    ring: 'ring-violet-500/30',
    bar: 'bg-violet-500',
    dot: 'bg-violet-500',
  },
};

export function accentFor(category: CategoryId) {
  return accentClasses[categoryById[category].accent];
}

export function CategoryBadge({ category }: { category: CategoryId }) {
  const c = categoryById[category];
  const a = accentFor(category);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${a.bg} ${a.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${a.dot}`} aria-hidden />
      {c.title}
    </span>
  );
}

const difficultyStyle: Record<Difficulty, string> = {
  beginner: 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10',
  intermediate: 'text-amber-600 dark:text-amber-300 bg-amber-500/10',
  advanced: 'text-orange-600 dark:text-orange-300 bg-orange-500/10',
  expert: 'text-rose-600 dark:text-rose-300 bg-rose-500/10',
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${difficultyStyle[difficulty]}`}>
      {difficultyLabel[difficulty]}
    </span>
  );
}

export function ProgressBar({ pct, accent = 'indigo', label }: { pct: number; accent?: string; label?: string }) {
  const a = accentClasses[accent] ?? accentClasses.indigo;
  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? 'Progress'}
    >
      <div className={`h-full rounded-full ${a.bar} transition-[width] duration-500 ease-out`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function ProgressRing({ pct, size = 56, stroke = 5, accent = 'indigo', children }: { pct: number; size?: number; stroke?: number; accent?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const colors: Record<string, string> = { indigo: 'stroke-indigo-500', sky: 'stroke-sky-500', violet: 'stroke-violet-500', emerald: 'stroke-emerald-500' };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={`${pct}% complete`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} className="fill-none stroke-surface-2" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeLinecap="round"
          className={`fill-none ${colors[accent] ?? colors.indigo} transition-[stroke-dashoffset] duration-700 ease-out`}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">{children ?? `${pct}%`}</div>
    </div>
  );
}

export function SectionTitle({ children, action, id }: { children: ReactNode; action?: ReactNode; id?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <h2 id={id} className="text-base font-semibold tracking-tight">
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Empty({ title, body, cta }: { title: string; body?: string; cta?: { to: string; label: string } }) {
  return (
    <div className="card flex flex-col items-center justify-center gap-2 p-10 text-center">
      <p className="font-medium">{title}</p>
      {body && <p className="max-w-md text-sm text-ink-2">{body}</p>}
      {cta && (
        <Link to={cta.to} className="btn-primary mt-2">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

export function Checkbox({ checked, onChange, label, id }: { checked: boolean; onChange: () => void; label: ReactNode; id: string }) {
  return (
    <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-2">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-indigo-500" />
      <span className={`text-sm leading-6 ${checked ? 'text-ink-3 line-through decoration-ink-3/60' : 'text-ink'}`}>{label}</span>
    </label>
  );
}
