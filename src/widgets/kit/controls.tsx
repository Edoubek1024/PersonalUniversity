/**
 * Layout and controls shared by widgets, styled to match the site. A widget is usually:
 *
 *   <Frame title="Riemann sums" caption="Drag n and watch the error shrink.">
 *     <Plot ...>...</Plot>
 *     <Controls>
 *       <Slider label="n" value={n} min={1} max={100} step={1} onChange={setN} />
 *       <Readout label="Error" value={fmt(err)} />
 *     </Controls>
 *   </Frame>
 */
import { useId, useMemo, type ReactNode } from 'react';
import katex from 'katex';
import { MousePointerClick } from 'lucide-react';
import { fmt } from './num';

export function Frame({ title, caption, children, actions }: { title: ReactNode; caption?: ReactNode; children: ReactNode; actions?: ReactNode }) {
  return (
    <figure className="card my-6 overflow-hidden p-0 not-italic">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2/60 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <MousePointerClick size={15} className="shrink-0 text-accent" aria-hidden />
          <span className="text-sm font-semibold">{title}</span>
        </div>
        {actions && <div className="flex flex-wrap items-center gap-1.5">{actions}</div>}
      </header>
      <div className="space-y-3 p-3 sm:p-4">{children}</div>
      {caption && <figcaption className="border-t border-line px-4 py-2.5 text-[13px] leading-6 text-ink-2">{caption}</figcaption>}
    </figure>
  );
}

/** A responsive grid for sliders, toggles and readouts. */
export function Controls({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const c = cols === 1 ? '' : cols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';
  return <div className={`grid gap-x-5 gap-y-3 ${c}`}>{children}</div>;
}

export function Slider({
  label,
  value,
  min,
  max,
  step = (max - min) / 100,
  onChange,
  format = (v) => fmt(v),
  disabled,
}: {
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className={disabled ? 'opacity-50' : ''}>
      <div className="flex items-baseline justify-between gap-2 text-[13px]">
        <label htmlFor={id} className="text-ink-2">
          {label}
        </label>
        <span className="font-mono text-xs tabular-nums text-ink">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1 h-5 w-full cursor-pointer accent-[var(--color-accent)]"
      />
    </div>
  );
}

/** A row of mutually exclusive buttons. */
export function Segmented<T extends string>({ label, options, value, onChange }: { label?: ReactNode; options: readonly { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      {label && <div className="mb-1 text-[13px] text-ink-2">{label}</div>}
      <div role="radiogroup" className="inline-flex flex-wrap gap-1 rounded-lg border border-line bg-surface-2 p-0.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={o.value === value}
            onClick={() => onChange(o.value)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${o.value === value ? 'bg-surface text-ink shadow-sm' : 'text-ink-2 hover:text-ink'}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Toggle({ label, checked, onChange }: { label: ReactNode; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] text-ink-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 cursor-pointer accent-[var(--color-accent)]" />
      {label}
    </label>
  );
}

/** A labelled value. `tone` colours the value (e.g. "var(--plot-2)" to match a curve). */
export function Readout({ label, value, tone }: { label: ReactNode; value: ReactNode; tone?: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-surface-2 px-3 py-1.5">
      <div className="text-xs text-ink-3">{label}</div>
      <div className="font-mono text-sm tabular-nums [overflow-wrap:anywhere]" style={tone ? { color: tone } : undefined}>
        {value}
      </div>
    </div>
  );
}

export function Button({ children, onClick, disabled, primary, title }: { children: ReactNode; onClick: () => void; disabled?: boolean; primary?: boolean; title?: string }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} title={title} className={`${primary ? 'btn-primary' : 'btn-outline'} px-2.5 py-1.5 text-xs`}>
      {children}
    </button>
  );
}

/** KaTeX-rendered maths. Bad TeX renders in red rather than throwing. */
export function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const html = useMemo(() => katex.renderToString(children, { displayMode: display, throwOnError: false }), [children, display]);
  return <span className={display ? 'block overflow-x-auto' : undefined} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A short message line under a widget, e.g. a parse error or a "converged" note. */
export function Note({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' | 'good' }) {
  const cls = tone === 'warn' ? 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300' : tone === 'good' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'border-line bg-surface-2 text-ink-2';
  return <div className={`rounded-lg border px-3 py-2 text-[13px] ${cls}`}>{children}</div>;
}

/** A text input for an expression; shows `error` under it. */
export function ExprInput({ label, value, onChange, error, placeholder }: { label: ReactNode; value: string; onChange: (v: string) => void; error?: string; placeholder?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] text-ink-2">
        {label}
      </label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} spellCheck={false} autoCapitalize="off" autoComplete="off" className="input font-mono text-[13px]" aria-invalid={!!error} />
      {error && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{error}</div>}
    </div>
  );
}
