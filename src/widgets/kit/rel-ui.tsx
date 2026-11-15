/** Small UI helpers for the rel-* widgets: captions with inline $TeX$ and a compact legend. */
import { Fragment, type ReactNode } from 'react';
import { Tex } from './controls';

/** Plain text in which $...$ spans are rendered with KaTeX. */
export function Rich({ text }: { text: string }) {
  const parts = text.split('$');
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <Tex key={i}>{p}</Tex> : <Fragment key={i}>{p}</Fragment>))}
    </>
  );
}

export function relCaption(params: Record<string, unknown>): ReactNode {
  return typeof params.caption === 'string' ? <Rich text={params.caption} /> : undefined;
}

export function Key({ items }: { items: { color: string; label: ReactNode; dash?: boolean }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          <svg width="18" height="6" aria-hidden>
            <line x1="1" y1="3" x2="17" y2="3" stroke={it.color} strokeWidth="2.5" strokeDasharray={it.dash ? '4 3' : undefined} strokeLinecap="round" />
          </svg>
          {it.label}
        </span>
      ))}
    </div>
  );
}

/** Grid of readouts that wraps to two columns on a phone. */
export function ReadGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const c = cols === 2 ? 'sm:grid-cols-2' : cols === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4';
  return <div className={`grid grid-cols-2 gap-2 ${c}`}>{children}</div>;
}
