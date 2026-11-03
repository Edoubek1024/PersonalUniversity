/**
 * Small UI pieces shared by the computer-architecture widgets: a row of clickable bits, a
 * labelled text field, and monospace "column arithmetic" rows.
 */
import { useId, type ReactNode } from 'react';

/** Background tint for a cell coloured by a CSS colour variable. */
export const tint = (color: string, pct = 22) => `color-mix(in oklab, ${color} ${pct}%, transparent)`;

export interface BitRowProps {
  /** Bit values, index 0 = least significant. */
  value: bigint;
  width: number;
  onToggle?: (i: number) => void;
  /** Colour (CSS var) of bit i, e.g. for float fields. */
  color?: (i: number) => string | undefined;
  /** Small label above bit i (default: the bit index). */
  above?: (i: number) => ReactNode;
  /** Small label below bit i (e.g. its place value). */
  below?: (i: number) => ReactNode;
  /** Bits per visual group (default 8); a wider gap separates groups, a small gap nibbles. */
  group?: number;
  /** Highlight ring on these bits. */
  mark?: (i: number) => boolean;
  label?: string;
}

/** A row of bit buttons, most significant first, wrapping by groups on narrow screens. */
export function BitRow({ value, width, onToggle, color, above, below, group = 8, mark, label }: BitRowProps) {
  const groups: number[][] = [];
  for (let hi = width - 1; hi >= 0; hi -= group) {
    const g: number[] = [];
    for (let i = hi; i > hi - group && i >= 0; i--) g.push(i);
    groups.push(g);
  }
  return (
    <div role="group" aria-label={label ?? `${width}-bit pattern`} className="flex flex-wrap gap-x-3 gap-y-2">
      {groups.map((g) => (
        <div key={g[0]} className="flex">
          {g.map((i, k) => {
            const on = ((value >> BigInt(i)) & 1n) === 1n;
            const c = color?.(i);
            const nibbleGap = k > 0 && (g[0] - i) % 4 === 0;
            return (
              <div key={i} className={`flex w-[26px] flex-col items-center sm:w-7 ${nibbleGap ? 'ml-1.5' : k > 0 ? 'ml-0.5' : ''}`}>
                <span className="h-3.5 text-[9px] leading-3 tabular-nums" style={{ color: c ?? 'var(--color-ink-3)' }}>
                  {above ? above(i) : i}
                </span>
                <button
                  type="button"
                  disabled={!onToggle}
                  onClick={() => onToggle?.(i)}
                  aria-pressed={on}
                  aria-label={`bit ${i}: ${on ? 1 : 0}`}
                  className={`h-9 w-full rounded-md border font-mono text-sm font-semibold tabular-nums transition-colors disabled:cursor-default ${onToggle ? 'cursor-pointer hover:brightness-110' : ''} ${mark?.(i) ? 'ring-2 ring-[var(--plot-4)]' : ''}`}
                  style={{
                    borderColor: c ?? (on ? 'var(--color-accent)' : 'var(--color-line)'),
                    background: on ? tint(c ?? 'var(--color-accent)', 30) : c ? tint(c, 7) : 'var(--color-surface)',
                    color: on ? 'var(--color-ink)' : 'var(--color-ink-3)',
                  }}
                >
                  {on ? 1 : 0}
                </button>
                {below && <span className="mt-0.5 h-3.5 whitespace-nowrap text-[9px] leading-3 tabular-nums text-ink-3">{below(i)}</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** A labelled single-line text input. */
export function Field({ label, value, onChange, error, placeholder, mono = true, onEnter }: { label: ReactNode; value: string; onChange: (v: string) => void; error?: string | null; placeholder?: string; mono?: boolean; onEnter?: () => void }) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-[13px] text-ink-2">
        {label}
      </label>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        className={`input py-1.5 ${mono ? 'font-mono text-[13px]' : ''}`}
      />
      {error && <div className="mt-1 text-xs text-rose-600 dark:text-rose-300">{error}</div>}
    </div>
  );
}

/**
 * Rows of right-aligned monospace digits for column arithmetic. Each row: a short label, the
 * digit string (characters are rendered individually so some can be coloured), and a note.
 */
export interface MonoRow {
  label: ReactNode;
  text: string;
  /** Colour for character k of `text` (spaces included), or undefined. */
  color?: (k: number, ch: string) => string | undefined;
  note?: ReactNode;
  rule?: boolean;
  dim?: boolean;
}

export function MonoRows({ rows }: { rows: MonoRow[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-grid min-w-0 grid-cols-[auto_auto] items-baseline gap-x-3 gap-y-0.5 font-mono text-[12.5px] leading-6 sm:grid-cols-[auto_auto_1fr]">
        {rows.map((r, i) => (
          <Row key={i} r={r} />
        ))}
      </div>
    </div>
  );
}

function Row({ r }: { r: MonoRow }) {
  return (
    <>
      <span className={`text-right text-[11px] ${r.dim ? 'text-ink-3' : 'text-ink-2'}`}>{r.label}</span>
      <span className={`whitespace-pre tabular-nums ${r.rule ? 'border-t border-ink-3' : ''} ${r.dim ? 'text-ink-3' : 'text-ink'}`}>
        {r.color
          ? [...r.text].map((ch, k) => {
              const c = r.color!(k, ch);
              return c ? (
                <span key={k} style={{ color: c, fontWeight: 700 }}>
                  {ch}
                </span>
              ) : (
                ch
              );
            })
          : r.text}
      </span>
      <span className="col-span-2 -mt-1 mb-1 pl-1 font-sans text-[12px] text-ink-2 sm:col-span-1 sm:mt-0 sm:mb-0">{r.note}</span>
    </>
  );
}
