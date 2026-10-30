import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Hammer, Route, Search as SearchIcon } from 'lucide-react';
import { search } from '@/lib/search';

const icons = { subject: BookOpen, lesson: FileText, project: Hammer, path: Route };

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => search(q), [q]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm animate-fade" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the curriculum"
        className="card w-full max-w-xl overflow-hidden animate-rise"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-line px-3">
          <SearchIcon size={16} className="text-ink-3" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, hits.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter' && hits[active]) {
                go(hits[active].href);
              } else if (e.key === 'Escape') {
                onClose();
              }
            }}
            placeholder="Search subjects, lessons, paths…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-3"
            aria-label="Search"
            aria-activedescendant={hits[active] ? `hit-${active}` : undefined}
            aria-controls="search-results"
            role="combobox"
            aria-expanded={hits.length > 0}
          />
          <span className="kbd">esc</span>
        </div>
        <ul id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-1">
          {q && hits.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-3">No results for “{q}”.</li>}
          {!q && <li className="px-3 py-6 text-center text-sm text-ink-3">Type to search across every subject and lesson.</li>}
          {hits.map((h, i) => {
            const Icon = icons[h.kind];
            return (
              <li
                key={h.id}
                id={`hit-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(h.href)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 ${i === active ? 'bg-surface-2' : ''}`}
              >
                <Icon size={15} className="shrink-0 text-ink-3" aria-hidden />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{h.title}</div>
                  <div className="truncate text-xs text-ink-3">{h.subtitle}</div>
                </div>
                <span className="ml-auto chip">{h.kind}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
