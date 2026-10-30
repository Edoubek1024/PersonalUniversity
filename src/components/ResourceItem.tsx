import { ExternalLink } from 'lucide-react';
import type { ResourceInput } from '@/data/types';

const costLabel = { free: 'Free', paid: 'Paid', freemium: 'Freemium' } as const;
const costStyle = {
  free: 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10',
  paid: 'text-rose-600 dark:text-rose-300 bg-rose-500/10',
  freemium: 'text-amber-600 dark:text-amber-300 bg-amber-500/10',
} as const;
export function ResourceItem({ r }: { r: ResourceInput }) {
  return (
    <li className={`card flex items-start gap-3 p-3 ${r.primary ? 'border-accent/40' : ''}`}>
      <div className="min-w-0 flex-1">
        <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent">
          {r.title}
          <ExternalLink size={12} className="shrink-0 text-ink-3" aria-label="(opens in a new tab)" />
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-3">
          {r.provider && <span>{r.provider}</span>}
          <span className="chip">{r.type}</span>
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${costStyle[r.cost]}`}>{costLabel[r.cost]}</span>
          {r.primary && <span className="text-accent">Primary</span>}
        </div>
        {r.note && <p className="mt-1 text-sm text-ink-2">{r.note}</p>}
      </div>
    </li>
  );
}
