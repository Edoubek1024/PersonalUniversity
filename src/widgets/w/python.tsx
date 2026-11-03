/**
 * python: a runnable Python cell (CPython 3.13 via Pyodide, run in a Web Worker).
 *
 * Nothing is downloaded until the learner first presses Run or Check; every later cell on the
 * page reuses the same interpreter. Each run starts from a fresh namespace. Stop, or the time
 * limit, terminates and restarts the interpreter, so `while True: pass` cannot freeze the page.
 * Edits are saved in localStorage per cell (page route + hash of the starter code); Reset
 * restores the starter code (with an Undo).
 *
 * Params:
 *   title    string     default "Python"
 *   caption  string     what to change and what to notice
 *   stdin    string[]   lines that input() returns, one per call, prefilled in the Input box
 *                       (the box also appears whenever the code mentions input( )   default []
 *   timeout  number     seconds of running time before the program is stopped (1-60)  default 10
 *
 * Body (after the `---` line): the starter code. To add hidden tests, put a line
 *
 *   # --- tests ---
 *
 * after the starter code; everything below it is test code that is not shown, and a Check button
 * appears. Check runs the learner's code, then each top-level statement of the tests in the same
 * namespace:
 *   - each `assert` is one check, listed as passed or failed. Its label is the assert message if
 *     there is one (write it as a friendly sentence), otherwise the asserted expression;
 *     for `assert f(x) == y` a failure says "expected y, got <actual>";
 *     an exception inside the assert is reported as "raised NameError: ..." etc.
 *   - any other statement (imports, helper functions, building inputs) is setup and is silent
 *     unless it raises.
 * Helpers available to tests: `_output` (everything the code printed), `_code` (the learner's
 * source text), `_capture(fn, *args)`
 * (what one call prints), `_raises(Exc, fn, *args)` (True if the call raises Exc) and
 * `_rerun(lines)` (stdout of running the whole program again with those input() lines).
 *
 * Example:
 *   ```interactive
 *   python
 *   {"title": "Exercise: is_leap", "caption": "Write is_leap(year), then press Check."}
 *   ---
 *   def is_leap(year):
 *       pass
 *   # --- tests ---
 *   assert is_leap(2024) == True, "2024 is a leap year (divisible by 4)"
 *   assert is_leap(1900) == False, "1900 is not (divisible by 100 but not by 400)"
 *   ```
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCheck, Play, RotateCcw, Square } from 'lucide-react';
import type { WidgetProps } from '../types';
import { num, str, strArray } from '../kit/params';
import { Button, Frame } from '../kit/controls';
import { CodeEditor } from '../kit/py-editor';
import { runPython, type RunMode } from '../kit/py-runtime';
import { appendChunk, errorLine, hash, loadSaved, OutputPanel, routeKey, save, StatusLine, stoppedMessage, type Chunk } from '../kit/py-ui';

const TESTS_LINE = /^#\s*-{3,}\s*tests\s*-{3,}\s*$/i;

function splitBody(body: string): { starter: string; tests: string | null } {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const i = lines.findIndex((l) => TESTS_LINE.test(l.trim()));
  const head = i === -1 ? lines : lines.slice(0, i);
  while (head.length && head[head.length - 1].trim() === '') head.pop();
  while (head.length && head[0].trim() === '') head.shift();
  return { starter: head.join('\n'), tests: i === -1 ? null : lines.slice(i + 1).join('\n') };
}

interface CheckItem {
  label: string;
  code: string;
  ok: boolean;
  detail: string | null;
}
interface CheckData {
  ok: boolean;
  stage: 'code' | 'tests';
  results: CheckItem[];
  error?: string;
}

type Status = { busy: boolean; text: string; tone?: 'good' | 'warn' | 'info' } | null;

export default function PythonCell({ params, body }: WidgetProps) {
  const title = str(params, 'title', 'Python');
  const caption = str(params, 'caption', '');
  const stdinDefault = strArray(params, 'stdin', []);
  const timeout = num(params, 'timeout', 10);
  if (timeout < 1 || timeout > 60) throw new Error('parameter "timeout" should be between 1 and 60 seconds');
  const { starter, tests } = useMemo(() => splitBody(body), [body]);
  if (!starter.trim() && tests === null) throw new Error('the python block has no code after its --- line');

  const key = useMemo(() => `py-cell:${routeKey()}:${hash(starter)}`, [starter]);
  const [code, setCode] = useState(() => loadSaved(key) ?? starter);
  const [stdin, setStdin] = useState(stdinDefault.join('\n'));
  const [out, setOut] = useState<Chunk[]>([]);
  const [status, setStatus] = useState<Status>(null);
  const [checks, setChecks] = useState<CheckData | null>(null);
  const [undo, setUndo] = useState<string | null>(null);
  const [ran, setRan] = useState(false);
  const handle = useRef<{ stop(): void } | null>(null);
  const busy = !!status?.busy;
  const codeRef = useRef(code);
  codeRef.current = code;

  useEffect(() => () => handle.current?.stop(), []);

  const edit = (v: string) => {
    setCode(v);
    setUndo(null);
    save(key, v === starter ? null : v);
  };

  const go = async (mode: RunMode) => {
    if (handle.current) return;
    setOut([]);
    setChecks(null);
    setRan(true);
    setStatus({ busy: true, text: 'Starting…' });
    const lines = stdin === '' ? [] : stdin.replace(/\r\n/g, '\n').split('\n');
    const h = runPython(
      { mode, code: codeRef.current, tests: tests ?? '', stdin: lines, timeout },
      {
        onStatus: (text) => setStatus({ busy: true, text }),
        onStart: () => setStatus({ busy: true, text: mode === 'check' ? 'Checking…' : 'Running…' }),
        onOutput: (stream, text) => setOut((prev) => appendChunk(prev, stream, text)),
      },
    );
    handle.current = h;
    const r = await h.result;
    handle.current = null;
    if (r.kind === 'failed') return setStatus({ busy: false, text: r.message, tone: 'warn' });
    if (r.kind === 'stopped') return setStatus({ busy: false, text: stoppedMessage(r.reason, timeout), tone: 'warn' });
    const secs = r.seconds < 0.01 ? '< 0.01 s' : `${r.seconds.toFixed(2)} s`;
    if (mode === 'run') {
      const ok = (r.data as { ok: boolean }).ok;
      setStatus(ok ? { busy: false, text: `Finished in ${secs}.`, tone: 'good' } : { busy: false, text: 'The program stopped with an error: read the traceback from the bottom up.', tone: 'warn' });
      return;
    }
    const d = r.data as CheckData;
    setChecks(d);
    if (d.stage === 'code') setStatus({ busy: false, text: 'Your code raised an error before the checks could run: see the traceback in the output.', tone: 'warn' });
    else if (d.error) setStatus({ busy: false, text: d.error, tone: 'warn' });
    else {
      const passed = d.results.filter((x) => x.ok).length;
      setStatus(
        d.ok
          ? { busy: false, text: `All ${d.results.length} checks passed.`, tone: 'good' }
          : { busy: false, text: `${passed} of ${d.results.length} checks passed.`, tone: 'warn' },
      );
    }
  };

  const reset = () => {
    setUndo(code);
    setCode(starter);
    save(key, null);
  };

  const showInput = stdinDefault.length > 0 || /\binput\s*\(/.test(code);
  const hl = errorLine(out);

  return (
    <Frame
      title={title}
      caption={caption || undefined}
      actions={
        <>
          <Button primary onClick={() => go('run')} disabled={busy} title="Run (Ctrl+Enter)">
            <span className="inline-flex items-center gap-1">
              <Play size={13} aria-hidden /> Run
            </span>
          </Button>
          {tests !== null && (
            <Button onClick={() => go('check')} disabled={busy} title="Run your code and the hidden checks">
              <span className="inline-flex items-center gap-1">
                <CheckCheck size={13} aria-hidden /> Check
              </span>
            </Button>
          )}
          <Button onClick={() => handle.current?.stop()} disabled={!busy} title="Stop the running program">
            <span className="inline-flex items-center gap-1">
              <Square size={12} aria-hidden /> Stop
            </span>
          </Button>
          <Button onClick={reset} disabled={busy || code === starter} title="Restore the starter code">
            <span className="inline-flex items-center gap-1">
              <RotateCcw size={13} aria-hidden /> Reset
            </span>
          </Button>
        </>
      }
    >
      <CodeEditor value={code} onChange={edit} onRun={() => go('run')} label={`${title}: code editor`} highlight={hl} />
      {undo !== null && (
        <div className="flex items-center gap-2 text-[12.5px] text-ink-2">
          Reset to the starter code.
          <button type="button" className="text-accent hover:underline" onClick={() => edit(undo)}>
            Undo
          </button>
        </div>
      )}
      {showInput && (
        <label className="block">
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-ink-3">Input: one line per input() call</span>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            rows={Math.max(2, Math.min(6, stdin.split('\n').length))}
            spellCheck={false}
            className="input resize-y font-mono text-[13px] leading-5"
          />
        </label>
      )}
      {status ? (
        <StatusLine busy={status.busy} tone={status.tone}>
          {status.text}
        </StatusLine>
      ) : (
        <p className="m-0 text-[12px] text-ink-3">
          Press Run (or Ctrl+Enter){tests !== null ? ', or Check to test your answer' : ''}. The first run loads Python (about 10 MB, once). Tab indents; Esc then Tab leaves the editor.
        </p>
      )}
      {checks && checks.results.length > 0 && <CheckList items={checks.results} />}
      {(ran || out.length > 0) && <OutputPanel chunks={out} empty={busy ? 'Waiting for output…' : 'The program printed nothing.'} />}
    </Frame>
  );
}

function CheckList({ items }: { items: CheckItem[] }) {
  return (
    <ul className="m-0 list-none space-y-1.5 p-0" aria-label="Check results">
      {items.map((c, i) => (
        <li key={i} className={`m-0 list-none rounded-lg border px-3 py-1.5 text-[13px] ${c.ok ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-rose-500/40 bg-rose-500/10'}`}>
          <div className="flex items-start gap-2">
            <span aria-hidden className={`mt-px font-semibold ${c.ok ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-300'}`}>
              {c.ok ? '✓' : '✗'}
            </span>
            <span className="sr-only">{c.ok ? 'Passed:' : 'Failed:'}</span>
            <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
              <span className={c.code ? 'text-ink' : 'font-mono text-[12.5px] text-ink'}>{c.label}</span>
              {c.code && <code className="ml-2 font-mono text-[11.5px] text-ink-3">{c.code}</code>}
              {!c.ok && c.detail && <div className="text-[12.5px] text-rose-700 dark:text-rose-300">{c.detail}</div>}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
