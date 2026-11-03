/**
 * One shared Python runtime per page for the python and memory-diagram widgets.
 *
 * Nothing is downloaded until the first call to runPython(). Jobs run one at a time in a Web
 * Worker (py-worker.ts); every later cell reuses the loaded interpreter. Stop and the time limit
 * terminate the worker, and the next job starts a fresh one (the files come from the HTTP cache,
 * so a restart takes a few seconds rather than a full download).
 */

export type RunMode = 'run' | 'check' | 'trace';

export interface RunRequest {
  mode: RunMode;
  code: string;
  tests?: string;
  stdin?: string[];
  /** Seconds of running time before the worker is terminated. */
  timeout: number;
  maxSteps?: number;
}

export interface RunHandlers {
  onStatus?(text: string): void;
  onStart?(): void;
  onOutput?(stream: 'out' | 'err', text: string): void;
}

export type RunResult =
  | { kind: 'done'; data: unknown; seconds: number }
  | { kind: 'stopped'; reason: 'user' | 'timeout'; seconds: number }
  | { kind: 'failed'; message: string };

interface Pending {
  id: number;
  req: RunRequest;
  h: RunHandlers;
  resolve(r: RunResult): void;
  t0: number;
  done?: boolean;
  timer?: ReturnType<typeof setTimeout>;
}

let worker: Worker | null = null;
let ready = false;
let everLoaded = false;
let current: Pending | null = null;
const waiting: Pending[] = [];
let nextId = 1;

function spawn(): Worker {
  const w = new Worker(new URL('./py-worker.ts', import.meta.url), { type: 'module' });
  ready = false;
  w.onmessage = (e: MessageEvent) => {
    const m = e.data as { type: string; id?: number; text?: string; message?: string; chunks?: { stream: 'out' | 'err'; text: string }[]; json?: string; error?: string };
    const job = current;
    switch (m.type) {
      case 'status':
        job?.h.onStatus?.(everLoaded && m.text?.startsWith('Loading Python') ? 'Restarting Python…' : (m.text ?? ''));
        break;
      case 'ready':
        ready = true;
        everLoaded = true;
        break;
      case 'fatal':
        kill();
        if (job) finish(job, { kind: 'failed', message: m.message ?? 'Python could not be loaded.' });
        break;
      case 'started':
        if (job && job.id === m.id) {
          job.t0 = performance.now();
          job.h.onStart?.();
          job.timer = setTimeout(() => stop(job, 'timeout'), job.req.timeout * 1000);
        }
        break;
      case 'out':
        if (job && job.id === m.id) for (const c of m.chunks ?? []) job.h.onOutput?.(c.stream, c.text);
        break;
      case 'done':
        if (job && job.id === m.id) {
          const seconds = (performance.now() - job.t0) / 1000;
          if (m.error || !m.json) finish(job, { kind: 'failed', message: m.error ?? 'No result from Python.' });
          else {
            try {
              finish(job, { kind: 'done', data: JSON.parse(m.json), seconds });
            } catch {
              finish(job, { kind: 'failed', message: 'Python returned an unreadable result.' });
            }
          }
        }
        break;
    }
  };
  w.onerror = (e) => {
    e.preventDefault();
    const job = current;
    kill();
    if (job) finish(job, { kind: 'failed', message: `The Python worker failed to start${e.message ? `: ${e.message}` : ''}.` });
  };
  return w;
}

function kill() {
  worker?.terminate();
  worker = null;
  ready = false;
}

function finish(job: Pending, r: RunResult) {
  if (job.done) return;
  job.done = true;
  if (job.timer) clearTimeout(job.timer);
  if (current === job) current = null;
  job.resolve(r);
  pump();
}

function pump() {
  if (current || waiting.length === 0) return;
  const job = waiting.shift()!;
  current = job;
  if (!worker) worker = spawn();
  if (!ready) job.h.onStatus?.(everLoaded ? 'Restarting Python…' : 'Loading Python… (about 10 MB, once)');
  else job.h.onStatus?.('Running…');
  worker.postMessage({ type: 'job', id: job.id, mode: job.req.mode, code: job.req.code, tests: job.req.tests ?? '', stdin: job.req.stdin ?? [], maxSteps: job.req.maxSteps ?? 300 });
}

function stop(job: Pending, reason: 'user' | 'timeout') {
  if (job.done) return;
  const seconds = (performance.now() - job.t0) / 1000;
  if (current === job) kill();
  else {
    const i = waiting.indexOf(job);
    if (i >= 0) waiting.splice(i, 1);
  }
  finish(job, { kind: 'stopped', reason, seconds });
}

/** Queue a job. `stop()` cancels it, terminating the worker if it is running. */
export function runPython(req: RunRequest, h: RunHandlers = {}): { result: Promise<RunResult>; stop(): void } {
  let job!: Pending;
  const result = new Promise<RunResult>((resolve) => {
    job = { id: nextId++, req, h, resolve, t0: performance.now() };
  });
  if (current) h.onStatus?.('Waiting for another cell to finish…');
  waiting.push(job);
  pump();
  return { result, stop: () => stop(job, 'user') };
}

/** True once the interpreter has finished loading in the current worker. */
export function pythonReady(): boolean {
  return ready;
}
