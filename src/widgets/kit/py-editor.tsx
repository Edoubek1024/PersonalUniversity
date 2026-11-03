/**
 * A small code editor for Python cells: a monospace textarea with line numbers.
 *   Tab           indent (4 spaces; indents every selected line when the selection spans lines)
 *   Shift+Tab     dedent the current or selected lines
 *   Enter         keep the current indentation, plus 4 spaces after a line ending in ":"
 *   Backspace     in leading spaces, delete back to the previous multiple of 4
 *   Ctrl/Cmd+Enter  run (onRun)
 *   Esc, then Tab   move focus out of the editor (keyboard users are never trapped)
 * Edits go through execCommand('insertText') where available so the browser's undo works.
 */
import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';

const IND = '    ';

export function CodeEditor({
  value,
  onChange,
  onRun,
  label,
  readOnly,
  minLines = 3,
  maxLines = 28,
  highlight,
}: {
  value: string;
  onChange?: (v: string) => void;
  onRun?: () => void;
  label: string;
  readOnly?: boolean;
  minLines?: number;
  maxLines?: number;
  /** 1-based line to mark in the gutter (e.g. a traceback line). */
  highlight?: number;
}) {
  const ta = useRef<HTMLTextAreaElement>(null);
  const gutter = useRef<HTMLDivElement>(null);
  const escaped = useRef(false);
  const id = useId();
  const lines = value.split('\n').length;
  const rows = Math.max(minLines, Math.min(maxLines, lines));
  // Height of a horizontal scrollbar, when long lines need one, so it never hides the last line.
  const [bar, setBar] = useState(0);
  useLayoutEffect(() => {
    const el = ta.current;
    if (!el) return;
    const measure = () => setBar(el.scrollWidth > el.clientWidth + 1 ? el.offsetHeight - el.clientHeight : 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [value]);

  const replace = (el: HTMLTextAreaElement, start: number, end: number, text: string, selStart: number, selEnd: number) => {
    el.focus();
    el.setSelectionRange(start, end);
    let ok = false;
    try {
      ok = document.execCommand('insertText', false, text);
    } catch {
      ok = false;
    }
    if (!ok || el.value.slice(start, start + text.length) !== text) {
      el.setRangeText(text, start, end, 'end');
      onChange?.(el.value);
    }
    el.setSelectionRange(selStart, selEnd);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
      return;
    }
    if (e.key === 'Escape') {
      escaped.current = true;
      return;
    }
    if (readOnly) return;
    if (e.key === 'Tab' && escaped.current) {
      escaped.current = false;
      return;
    }
    escaped.current = false;
    const v = el.value;
    const s = el.selectionStart;
    const t = el.selectionEnd;
    const lineStart = v.lastIndexOf('\n', s - 1) + 1;
    if (e.key === 'Tab') {
      e.preventDefault();
      const multi = v.slice(s, t).includes('\n');
      if (!e.shiftKey && !multi) {
        replace(el, s, t, IND, s + 4, s + 4);
        return;
      }
      const endBase = t > s && v[t - 1] === '\n' ? t - 1 : t;
      const lineEndIdx = v.indexOf('\n', endBase);
      const blockEnd = lineEndIdx === -1 ? v.length : lineEndIdx;
      const block = v.slice(lineStart, blockEnd).split('\n');
      let firstDelta = 0;
      let total = 0;
      const out = block.map((ln, i) => {
        let d: number;
        let res: string;
        if (e.shiftKey) {
          const n = Math.min(4, ln.length - ln.trimStart().length);
          d = -n;
          res = ln.slice(n);
        } else {
          d = ln.length ? 4 : 0;
          res = ln.length ? IND + ln : ln;
        }
        if (i === 0) firstDelta = d;
        total += d;
        return res;
      });
      const text = out.join('\n');
      const ns = multi ? lineStart : Math.max(lineStart, s + firstDelta);
      const ne = multi ? lineStart + text.length : Math.max(lineStart, t + total);
      replace(el, lineStart, blockEnd, text, ns, ne);
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      const before = v.slice(lineStart, s);
      let indent = before.match(/^ */)![0];
      if (/:\s*(#.*)?$/.test(before)) indent += IND;
      const text = `\n${indent}`;
      replace(el, s, t, text, s + text.length, s + text.length);
      return;
    }
    if (e.key === 'Backspace' && s === t && s > lineStart) {
      const before = v.slice(lineStart, s);
      if (/^ +$/.test(before)) {
        e.preventDefault();
        const n = before.length % 4 || 4;
        replace(el, s - n, s, '', s - n, s - n);
      }
    }
  };

  const numbers = Array.from({ length: lines }, (_, i) => i + 1);
  return (
    <div className="flex overflow-hidden rounded-lg border border-line bg-surface-2 font-mono text-[13px] leading-5 [font-variant-ligatures:none] focus-within:border-accent">
      <div ref={gutter} aria-hidden className="pointer-events-none select-none overflow-hidden border-r border-line py-2 text-right text-ink-3" style={{ minWidth: lines >= 100 ? '3.2rem' : '2.6rem', height: rows * 20 + 16 }}>
        <div className="px-2">
          {numbers.map((n) => (
            <div key={n} className={n === highlight ? 'rounded-sm bg-rose-500/20 text-rose-600 dark:text-rose-300' : undefined}>
              {n}
            </div>
          ))}
        </div>
      </div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        ref={ta}
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={(e) => {
          if (gutter.current) gutter.current.scrollTop = e.currentTarget.scrollTop;
        }}
        rows={rows}
        wrap="off"
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="block min-w-0 flex-1 resize-none overflow-auto whitespace-pre bg-transparent px-3 py-2 text-ink outline-none [tab-size:4]"
        style={{ height: rows * 20 + 16 + bar }}
      />
    </div>
  );
}
