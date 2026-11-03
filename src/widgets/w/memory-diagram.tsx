/**
 * memory-diagram: steps through a short Python program the way Python Tutor does. The code runs
 * in the same in-browser interpreter as the python widget, under sys.settrace; at every line
 * (and every return and raised exception) it records the call stack with each frame's names, the
 * objects those names reach (lists, tuples, dicts, sets, instances of the program's classes),
 * and what has been printed. Small values (numbers, strings, booleans, None) and functions are
 * shown inline; everything else is a box in the Objects column with an arrow from every name or
 * slot that refers to it (the program's own classes are boxes too, listing their class attributes), so two names bound to one list point at one box, and a mutation through
 * either changes that box. Values that changed since the previous step are highlighted.
 *
 * Params:
 *   title     string     default "Memory diagram"
 *   caption   string     what to step through and what to notice
 *   maxSteps  number     recorded steps before stopping (10-1000)            default 300
 *   timeout   number     seconds before the program is stopped (1-60)        default 10
 *   editable  boolean    let the learner edit the code and visualise again   default true
 *   stdin     string[]   lines returned by input()                           default []
 *
 * Body (after `---`): the program.
 */
import { Fragment, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Eye, Pencil, Square } from 'lucide-react';
import type { WidgetProps } from '../types';
import { bool, num, str, strArray } from '../kit/params';
import { Button, Frame, Slider } from '../kit/controls';
import { CodeEditor } from '../kit/py-editor';
import { runPython } from '../kit/py-runtime';
import { StatusLine, stoppedMessage } from '../kit/py-ui';
import { useElementSize } from '../kit/hooks';

type Val = ['p', string] | ['f', string] | ['r', number];
interface HeapObj {
  k: 'list' | 'tuple' | 'set' | 'dict' | 'instance' | 'class';
  t: string;
  items: (Val | [Val, Val])[];
  n: number;
}
interface FrameSnap {
  name: string;
  vars: [string, Val][];
}
interface Step {
  line: number;
  event: 'line' | 'return' | 'exception';
  frames: FrameSnap[];
  heap: Record<string, HeapObj | null>;
  out: number;
  ret?: Val;
  exc?: string;
}
interface Trace {
  steps: Step[];
  stdout: string;
  error: string | null;
  truncated: boolean;
  code: string;
}

export default function MemoryDiagram({ params, body }: WidgetProps) {
  const title = str(params, 'title', 'Memory diagram');
  const caption = str(params, 'caption', '');
  const maxSteps = num(params, 'maxSteps', 300);
  const timeout = num(params, 'timeout', 10);
  const editable = bool(params, 'editable', true);
  const stdin = strArray(params, 'stdin', []);
  if (maxSteps < 10 || maxSteps > 1000) throw new Error('parameter "maxSteps" should be between 10 and 1000');
  if (timeout < 1 || timeout > 60) throw new Error('parameter "timeout" should be between 1 and 60 seconds');
  const starter = useMemo(() => body.replace(/\r\n/g, '\n').replace(/^\n+|\s+$/g, ''), [body]);
  if (!starter.trim()) throw new Error('the memory-diagram block has no code after its --- line');

  const [code, setCode] = useState(starter);
  const [editing, setEditing] = useState(false);
  const [trace, setTrace] = useState<Trace | null>(null);
  const [i, setI] = useState(0);
  const [status, setStatus] = useState<{ busy: boolean; text: string; tone?: 'good' | 'warn' } | null>(null);
  const handle = useRef<{ stop(): void } | null>(null);
  useEffect(() => () => handle.current?.stop(), []);

  const visualise = async () => {
    if (handle.current) return;
    setEditing(false);
    setStatus({ busy: true, text: 'Starting…' });
    const src = code;
    const h = runPython({ mode: 'trace', code: src, stdin, timeout, maxSteps }, { onStatus: (text) => setStatus({ busy: true, text }), onStart: () => setStatus({ busy: true, text: 'Tracing…' }) });
    handle.current = h;
    const r = await h.result;
    handle.current = null;
    if (r.kind === 'failed') return setStatus({ busy: false, text: r.message, tone: 'warn' });
    if (r.kind === 'stopped') return setStatus({ busy: false, text: stoppedMessage(r.reason, timeout), tone: 'warn' });
    const t = { ...(r.data as Omit<Trace, 'code'>), code: src };
    setTrace(t);
    setI(0);
    if (t.steps.length === 0) setStatus({ busy: false, text: t.error ? 'The code did not run:' : 'Nothing to show: the program has no lines to run.', tone: 'warn' });
    else setStatus(t.truncated ? { busy: false, text: `Recorded the first ${maxSteps} steps; the program was stopped there.`, tone: 'warn' } : null);
  };

  const steps = trace?.steps ?? [];
  const n = steps.length;
  const step = n ? steps[Math.min(i, n - 1)] : null;
  const prev = n && i > 0 ? steps[i - 1] : null;
  const stale = trace !== null && trace.code !== code;
  const last = n > 0 && i === n - 1;

  const describe = (s: Step): string => {
    const where = s.frames.length > 1 ? `in ${s.frames[s.frames.length - 1].name}()` : 'at the top level';
    if (s.event === 'exception') return `${s.exc} raised on line ${s.line} ${where}`;
    if (s.event === 'return') return s.frames.length > 1 ? `${s.frames[s.frames.length - 1].name}() is returning (line ${s.line})` : 'The program has finished';
    return `About to run line ${s.line} ${where}`;
  };

  return (
    <Frame
      title={title}
      caption={caption || undefined}
      actions={
        <>
          <Button primary onClick={visualise} disabled={!!status?.busy}>
            <span className="inline-flex items-center gap-1">
              <Eye size={13} aria-hidden /> {trace ? 'Visualise again' : 'Visualise'}
            </span>
          </Button>
          {status?.busy && (
            <Button onClick={() => handle.current?.stop()}>
              <span className="inline-flex items-center gap-1">
                <Square size={12} aria-hidden /> Stop
              </span>
            </Button>
          )}
          {editable && (
            <Button onClick={() => setEditing((e) => !e)} disabled={!!status?.busy}>
              <span className="inline-flex items-center gap-1">
                <Pencil size={12} aria-hidden /> {editing ? 'Done editing' : 'Edit code'}
              </span>
            </Button>
          )}
        </>
      }
    >
      {editing ? (
        <>
          <CodeEditor value={code} onChange={setCode} onRun={visualise} label={`${title}: code editor`} />
          {code !== starter && (
            <button type="button" className="text-[12.5px] text-accent hover:underline" onClick={() => setCode(starter)}>
              Restore the original code
            </button>
          )}
        </>
      ) : (
        <CodeView code={trace && !stale ? trace.code : code} cur={step && !stale ? step.line : undefined} prevLine={prev && !stale ? prev.line : undefined} event={step?.event} />
      )}

      {status && (
        <StatusLine busy={status.busy} tone={status.tone}>
          {status.text}
        </StatusLine>
      )}
      {!trace && !status && <p className="m-0 text-[12px] text-ink-3">Press Visualise to step through this code line by line. The first time loads Python (about 10 MB, once).</p>}
      {stale && !editing && <StatusLine tone="warn">The code has changed since it was traced: press Visualise again.</StatusLine>}
      {trace && trace.steps.length === 0 && trace.error && <pre className="m-0 overflow-auto rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 font-mono text-[12px] text-rose-700 dark:text-rose-300">{trace.error}</pre>}

      {step && trace && !stale && (
        <>
          <div className="flex flex-wrap items-center gap-1.5">
            <Button onClick={() => setI(0)} disabled={i === 0} title="First step">
              <ChevronFirst size={14} aria-label="First step" />
            </Button>
            <Button onClick={() => setI((x) => Math.max(0, x - 1))} disabled={i === 0} title="Previous step">
              <span className="inline-flex items-center gap-0.5">
                <ChevronLeft size={14} aria-hidden /> Prev
              </span>
            </Button>
            <Button primary onClick={() => setI((x) => Math.min(n - 1, x + 1))} disabled={last} title="Next step">
              <span className="inline-flex items-center gap-0.5">
                Next <ChevronRight size={14} aria-hidden />
              </span>
            </Button>
            <Button onClick={() => setI(n - 1)} disabled={last} title="Last step">
              <ChevronLast size={14} aria-label="Last step" />
            </Button>
            <div className="min-w-[10rem] flex-1">
              <Slider label="Step" value={i + 1} min={1} max={Math.max(2, n)} step={1} onChange={(v) => setI(Math.min(n - 1, Math.round(v) - 1))} format={(v) => `${v} of ${n}`} disabled={n < 2} />
            </div>
          </div>
          <div aria-live="polite" className={`text-[13px] font-medium ${step.event === 'exception' ? 'text-rose-600 dark:text-rose-300' : 'text-ink'}`}>
            {describe(step)}
          </div>
          <Diagram step={step} prev={prev} />
          <div>
            <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-ink-3">Printed so far</div>
            <pre className="m-0 max-h-40 min-h-[2.25rem] overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[12.5px] leading-5 [overflow-wrap:anywhere]">
              {trace.stdout.slice(0, step.out) || <span className="text-ink-3">nothing yet</span>}
            </pre>
          </div>
          {last && trace.error && <pre className="m-0 overflow-auto whitespace-pre-wrap rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 font-mono text-[12px] text-rose-700 dark:text-rose-300">{trace.error}</pre>}
        </>
      )}
    </Frame>
  );
}

function CodeView({ code, cur, prevLine, event }: { code: string; cur?: number; prevLine?: number; event?: Step['event'] }) {
  const lines = code.split('\n');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = ref.current;
    const row = box?.querySelector<HTMLElement>('[data-current]');
    if (box && row && (row.offsetTop < box.scrollTop || row.offsetTop + row.offsetHeight > box.scrollTop + box.clientHeight)) {
      box.scrollTop = row.offsetTop - box.clientHeight / 2;
    }
  }, [cur]);
  return (
    <div ref={ref} className="relative max-h-[22rem] overflow-auto rounded-lg border border-line bg-surface-2 py-2 font-mono text-[13px] leading-5 [font-variant-ligatures:none]" aria-label="Program being traced">
      {lines.map((l, k) => {
        const ln = k + 1;
        const isCur = ln === cur;
        const isPrev = ln === prevLine && !isCur;
        return (
          <div key={k} data-current={isCur || undefined} className={`flex whitespace-pre ${isCur ? (event === 'exception' ? 'bg-rose-500/15' : 'bg-[var(--color-accent-soft)]') : ''}`}>
            <span aria-hidden className={`w-5 shrink-0 text-center ${isCur ? (event === 'exception' ? 'text-rose-500' : 'text-accent') : 'text-ink-3'}`}>
              {isCur ? '➜' : isPrev ? '→' : ''}
            </span>
            <span aria-hidden className="w-7 shrink-0 select-none pr-2 text-right text-ink-3">
              {ln}
            </span>
            <span className="pr-3 text-ink">
              {isCur && <span className="sr-only">current line: </span>}
              {l || ' '}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const key = (v: Val | undefined) => (v ? `${v[0]}:${v[1]}` : '');

function Diagram({ step, prev }: { step: Step; prev: Step | null }) {
  const [wrapRef, size] = useElementSize<HTMLDivElement>();
  const uid = useId().replace(/:/g, '');
  const [paths, setPaths] = useState<{ d: string; dim: boolean }[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Which names and objects changed since the previous step.
  const changed = useMemo(() => {
    const vars = new Set<string>();
    const objs = new Set<string>();
    if (!prev) return { vars, objs };
    step.frames.forEach((f, fi) => {
      const pf = prev.frames[fi];
      const pm = new Map(pf && pf.name === f.name ? pf.vars : []);
      for (const [nm, v] of f.vars) if (key(pm.get(nm)) !== key(v)) vars.add(`${fi}:${nm}`);
    });
    for (const [id, o] of Object.entries(step.heap)) if (JSON.stringify(prev.heap[id]) !== JSON.stringify(o)) objs.add(id);
    return { vars, objs };
  }, [step, prev]);

  // Objects in rows: each object directly named by a frame starts a row, followed by the objects
  // it reaches that have not been placed yet.
  const rows = useMemo(() => {
    const placed = new Set<number>();
    const out: number[][] = [];
    const refs = (o: HeapObj): number[] =>
      o.items.flatMap((it) => {
        const pair = Array.isArray(it[0]) ? (it as [Val, Val]) : [it as Val];
        return pair.filter((v) => v[0] === 'r').map((v) => v[1] as number);
      });
    const visit = (id: number, row: number[]) => {
      const o = step.heap[id];
      if (placed.has(id) || !o) return;
      placed.add(id);
      row.push(id);
      for (const r of refs(o)) visit(r, row);
    };
    const roots: number[] = [];
    for (const f of step.frames) for (const [, v] of f.vars) if (v[0] === 'r') roots.push(v[1]);
    if (step.ret?.[0] === 'r') roots.push(step.ret[1]);
    for (const r of roots) {
      const row: number[] = [];
      visit(r, row);
      if (row.length) out.push(row);
    }
    return out;
  }, [step]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const base = wrap.getBoundingClientRect();
    const next: { d: string; dim: boolean }[] = [];
    wrap.querySelectorAll<HTMLElement>('[data-to]').forEach((el) => {
      const target = wrap.querySelector<HTMLElement>(`[data-obj="${el.dataset.to}"]`);
      if (!target) return;
      const a = el.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const sx = a.left + a.width / 2 - base.left;
      const sy = a.top + a.height / 2 - base.top;
      const L = b.left - base.left;
      const T = b.top - base.top;
      const R = b.right - base.left;
      const B = b.bottom - base.top;
      let d: string;
      if (L >= sx + 14) {
        const tx = L - 1;
        const ty = Math.min(Math.max(sy, T + 10), Math.min(B - 10, T + 22));
        const dx = Math.max(24, (tx - sx) / 2);
        d = `M${sx},${sy} C${sx + dx},${sy} ${tx - dx},${ty} ${tx},${ty}`;
      } else if (T > sy + 8 && R + 30 < base.width) {
        // Target below with room on its right (the one-column phone layout): run down the right
        // gutter and enter the box from its right edge, so the arrow does not cross other boxes.
        const tx = R + 1;
        const ty = T + 12;
        const gx = Math.min(base.width - 4, Math.max(R, sx) + 26);
        d = `M${sx},${sy} C${gx},${sy} ${gx},${ty} ${tx},${ty}`;
      } else if (T > sy + 8) {
        const tx = Math.min(Math.max(L + 16, sx - 60), R - 16);
        const ty = T - 1;
        d = `M${sx},${sy} C${sx + 36},${sy} ${tx},${ty - 36} ${tx},${ty}`;
      } else if (B < sy - 8) {
        const tx = Math.min(Math.max(L + 16, sx), R - 16);
        const ty = B + 1;
        d = `M${sx},${sy} C${sx + 36},${sy} ${tx},${ty + 36} ${tx},${ty}`;
      } else {
        const tx = R + 1;
        const ty = T + 14;
        d = `M${sx},${sy} C${sx + 40},${sy} ${tx + 40},${ty} ${tx},${ty}`;
      }
      next.push({ d, dim: el.dataset.dim === '1' });
    });
    setPaths(next);
    setBox({ w: wrap.scrollWidth, h: wrap.scrollHeight });
  }, [step, rows, size.width, size.height, wrapRef]);

  const top = step.frames.length - 1;
  return (
    <div ref={wrapRef} className="relative">
      <div className="grid gap-x-14 gap-y-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <section aria-label="Frames">
          <h4 className="mb-1.5 mt-0 text-[11px] font-medium uppercase tracking-wide text-ink-3">Frames</h4>
          <div className="space-y-2.5">
            {step.frames.map((f, fi) => (
              <div key={fi} className={`rounded-lg border bg-surface ${fi === top ? 'border-accent' : 'border-line'}`}>
                <div className={`border-b border-line px-2.5 py-1 text-[12px] font-semibold ${fi === top ? 'text-accent' : 'text-ink-2'}`}>{fi === 0 ? f.name : `${f.name}()`}</div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)] text-[12.5px] leading-5">
                  {f.vars.length === 0 && !(fi === top && step.ret) && <div className="col-span-2 px-2.5 py-1 text-ink-3">no names yet</div>}
                  {f.vars.map(([nm, v]) => {
                    const hl = changed.vars.has(`${fi}:${nm}`) ? 'bg-amber-400/20' : '';
                    return (
                      <Fragment key={nm}>
                        <div className={`whitespace-nowrap py-0.5 pl-2.5 pr-2 text-right font-mono text-ink-2 ${hl}`}>{nm}</div>
                        <div className={`min-w-0 border-l border-line py-0.5 pl-2 pr-2.5 ${hl}`}>
                          <ValView v={v} dim={fi !== top && fi !== 0} />
                        </div>
                      </Fragment>
                    );
                  })}
                  {fi === top && step.ret && (
                    <>
                      <div className="whitespace-nowrap bg-emerald-500/10 py-0.5 pl-2.5 pr-2 text-right italic text-ink-2">return value</div>
                      <div className="min-w-0 border-l border-line bg-emerald-500/10 py-0.5 pl-2 pr-2.5">
                        <ValView v={step.ret} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section aria-label="Objects">
          <h4 className="mb-1.5 mt-0 text-[11px] font-medium uppercase tracking-wide text-ink-3">Objects</h4>
          {rows.length === 0 ? (
            <p className="m-0 text-[12.5px] text-ink-3">No lists, tuples, dicts, sets or instances yet. Numbers and strings are shown next to their names.</p>
          ) : (
            <div className="space-y-4">
              {rows.map((row, ri) => (
                <div key={ri} className="flex flex-wrap items-start gap-x-12 gap-y-4">
                  {row.map((id) => (
                    <ObjView key={id} id={id} o={step.heap[id]!} changed={changed.objs.has(String(id))} />
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <svg aria-hidden className="pointer-events-none absolute left-0 top-0 overflow-visible" width={box.w} height={box.h}>
        <defs>
          <marker id={`${uid}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--color-accent)' }} />
          </marker>
          <marker id={`${uid}-d`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" style={{ fill: 'var(--color-ink-3)' }} />
          </marker>
        </defs>
        {paths.map((p, k) => (
          <path key={k} d={p.d} fill="none" style={{ stroke: p.dim ? 'var(--color-ink-3)' : 'var(--color-accent)' }} strokeWidth={1.5} markerEnd={`url(#${uid}-${p.dim ? 'd' : 'a'})`} />
        ))}
      </svg>
    </div>
  );
}

function ValView({ v, dim }: { v: Val; dim?: boolean }): ReactNode {
  if (v[0] === 'r')
    return (
      <span className="inline-flex h-5 items-center">
        <span data-to={v[1]} data-dim={dim ? '1' : undefined} className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: dim ? 'var(--color-ink-3)' : 'var(--color-accent)' }} />
        <span className="sr-only">reference to object {v[1]}</span>
      </span>
    );
  if (v[0] === 'f') return <span className="font-mono text-[12px] italic text-ink-2">{v[1]}</span>;
  return <span className="font-mono text-ink [overflow-wrap:anywhere]">{v[1]}</span>;
}

function ObjView({ id, o, changed }: { id: number; o: HeapObj; changed: boolean }) {
  const ring = changed ? 'ring-2 ring-amber-400/70' : '';
  const more = o.n > o.items.length ? <div className="px-2 py-0.5 text-[11px] text-ink-3">… {o.n - o.items.length} more</div> : null;
  const head = (
    <div className="mb-0.5 text-[11px] text-ink-3">
      {o.k === 'instance' ? `${o.t} object` : o.k === 'class' ? `class ${o.t}` : o.t}
      {o.k === 'tuple' && ' (immutable)'}
      <span className="sr-only"> object {id}</span>
    </div>
  );
  if (o.k === 'list' || o.k === 'tuple' || o.k === 'set') {
    return (
      <div data-obj={id} className="max-w-full">
        {head}
        {o.items.length === 0 ? (
          <div className={`rounded-md border border-line bg-surface px-2 py-1 text-[12px] text-ink-3 ${ring}`}>empty</div>
        ) : (
          <div className={`flex flex-wrap rounded-md border border-line ${o.k === 'tuple' ? 'bg-surface-2' : 'bg-surface'} ${ring}`}>
            {(o.items as Val[]).map((v, k) => (
              <div key={k} className={`min-w-[2.25rem] border-line px-2 py-0.5 text-center text-[12.5px] ${k > 0 ? 'border-l' : ''}`}>
                {o.k !== 'set' && <div className="text-[10px] leading-3 text-ink-3">{k}</div>}
                <ValView v={v} />
              </div>
            ))}
            {more}
          </div>
        )}
      </div>
    );
  }
  const pairs = o.items as [Val, Val][];
  return (
    <div data-obj={id} className="max-w-full">
      {head}
      <div className={`overflow-hidden rounded-md border border-line bg-surface ${ring}`}>
        {pairs.length === 0 && <div className="px-2 py-1 text-[12px] text-ink-3">{o.k === 'dict' ? 'empty' : o.k === 'class' ? 'no class attributes' : 'no attributes yet'}</div>}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] text-[12.5px] leading-5">
          {pairs.map(([k, v], j) => (
            <Fragment key={j}>
              <div className={`whitespace-nowrap border-r border-line px-2 py-0.5 text-right font-mono text-ink-2 ${j > 0 ? 'border-t' : ''}`}>{o.k === 'dict' ? <ValView v={k} /> : k[1]}</div>
              <div className={`min-w-0 border-line px-2 py-0.5 ${j > 0 ? 'border-t' : ''}`}>
                <ValView v={v} />
              </div>
            </Fragment>
          ))}
        </div>
        {more}
      </div>
    </div>
  );
}
