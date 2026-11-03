/** Small pieces shared by the python and memory-diagram widgets. */
import type { ReactNode } from 'react';

export type Chunk = { stream: 'out' | 'err'; text: string };

/** Append streamed text, merging with the previous chunk when it is the same stream. */
export function appendChunk(prev: Chunk[], stream: 'out' | 'err', text: string): Chunk[] {
  const last = prev[prev.length - 1];
  if (last && last.stream === stream) return [...prev.slice(0, -1), { stream, text: last.text + text }];
  return [...prev, { stream, text }];
}

/** The line number of the innermost main.py frame in a traceback, if any. */
export function errorLine(chunks: Chunk[]): number | undefined {
  const err = chunks.filter((c) => c.stream === 'err').map((c) => c.text).join('');
  const all = [...err.matchAll(/File "main\.py", line (\d+)/g)];
  return all.length ? Number(all[all.length - 1][1]) : undefined;
}

export function OutputPanel({ chunks, empty, label = 'Output' }: { chunks: Chunk[]; empty?: ReactNode; label?: string }) {
  return (
    <div>
      <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">{label}</div>
      <pre aria-live="polite" className="m-0 max-h-80 min-h-[2.75rem] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-line bg-surface px-3 py-2 font-mono text-[12.5px] leading-5 text-ink [overflow-wrap:anywhere]">
        {chunks.length === 0 ? (
          <span className="text-ink-3">{empty ?? 'Nothing printed yet.'}</span>
        ) : (
          chunks.map((c, i) => (
            <span key={i} className={c.stream === 'err' ? 'text-rose-600 dark:text-rose-300' : undefined}>
              {c.text}
            </span>
          ))
        )}
      </pre>
    </div>
  );
}

/** A one-line status: spinner while busy, coloured by outcome. */
export function StatusLine({ busy, tone, children }: { busy?: boolean; tone?: 'good' | 'warn' | 'info'; children: ReactNode }) {
  const color = tone === 'good' ? 'text-emerald-700 dark:text-emerald-300' : tone === 'warn' ? 'text-amber-700 dark:text-amber-300' : 'text-ink-2';
  return (
    <div role="status" className={`flex min-h-5 items-center gap-2 text-[12.5px] ${color}`}>
      {busy && <span aria-hidden className="inline-block h-3 w-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent" />}
      <span>{children}</span>
    </div>
  );
}

/** A short stable hash (FNV-1a) of a string, for storage keys. */
export function hash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/** The current lesson route (HashRouter), used to scope saved code to a page. */
export function routeKey(): string {
  try {
    return window.location.hash.replace(/^#/, '').split('?')[0] || '/';
  } catch {
    return '/';
  }
}

export function loadSaved(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function save(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode, quota): edits simply are not remembered.
  }
}

export function stoppedMessage(reason: 'user' | 'timeout', timeout: number): string {
  return reason === 'timeout'
    ? `Stopped after ${timeout} s: the program was still running (an infinite loop?). Python was restarted; your code is unchanged.`
    : 'Stopped. Python was restarted; your code is unchanged.';
}
