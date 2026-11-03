/**
 * Web Worker that hosts Pyodide (CPython compiled to WebAssembly) for the python and
 * memory-diagram widgets. It is created by py-runtime.ts, which can terminate it at any time
 * (Stop button, time limit), so an infinite loop in learner code never freezes the page.
 *
 * Messages in:  {type: 'job', id, mode: 'run' | 'check' | 'trace', code, tests, stdin, maxSteps}
 * Messages out: {type: 'status', text}            loading progress
 *               {type: 'ready'}                    Pyodide loaded
 *               {type: 'fatal', message}           Pyodide could not be loaded
 *               {type: 'started', id}              the job's code is now running (timer starts)
 *               {type: 'out', id, chunks}          batched stdout/stderr
 *               {type: 'done', id, json, error?}   the harness's JSON result
 */
import { HARNESS } from './py-harness';

/** Pinned Pyodide release (Python 3.13). Served by jsDelivr with CORS, no special headers needed. */
export const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/';

interface PyProxy {
  (...args: unknown[]): unknown;
  get(key: string): PyProxy;
  destroy(): void;
}
interface Pyodide {
  globals: PyProxy & { set(key: string, v: unknown): void };
  runPython(code: string): unknown;
  loadPackagesFromImports(code: string, opts?: { messageCallback?: (m: string) => void; errorCallback?: (m: string) => void }): Promise<unknown>;
  toPy(v: unknown): PyProxy;
}
interface Job {
  type: 'job';
  id: number;
  mode: 'run' | 'check' | 'trace';
  code: string;
  tests: string;
  stdin: string[];
  maxSteps: number;
}

const ctx = self as unknown as { postMessage(m: unknown): void; onmessage: ((e: MessageEvent<Job>) => void) | null };
const post = (m: unknown) => ctx.postMessage(m);
const MAX_OUTPUT = 200_000;

let harness: PyProxy | null = null;

async function boot(): Promise<PyProxy> {
  post({ type: 'status', text: 'Loading Python… (about 10 MB, once)' });
  const mod = (await import(/* @vite-ignore */ `${PYODIDE_URL}pyodide.mjs`)) as { loadPyodide(o: { indexURL: string }): Promise<Pyodide> };
  const py = await mod.loadPyodide({ indexURL: PYODIDE_URL });
  pyodide = py;
  py.globals.set('_pf_src', HARNESS);
  py.runPython("_pf_ns = {'__name__': '_pf'}\nexec(compile(_pf_src, '<harness>', 'exec'), _pf_ns)\ndel _pf_src");
  harness = py.globals.get('_pf_ns');
  post({ type: 'ready' });
  return harness;
}

let pyodide: Pyodide | null = null;
const booting = boot().catch((e: unknown) => {
  post({ type: 'fatal', message: `Python could not be loaded (${e instanceof Error ? e.message : String(e)}). Check your connection and try again.` });
  throw e;
});

let queue: Promise<void> = Promise.resolve();

ctx.onmessage = (e) => {
  const job = e.data;
  if (job?.type !== 'job') return;
  queue = queue.then(() => handle(job)).catch(() => undefined);
};

async function handle(job: Job) {
  let h: PyProxy;
  try {
    h = await booting;
  } catch {
    return;
  }
  const py = pyodide!;
  try {
    await py.loadPackagesFromImports(`${job.code}\n${job.tests}`, {
      messageCallback: (m) => {
        if (/^Loading /.test(m)) post({ type: 'status', text: `${m.replace(/,? ?$/, '')}…` });
      },
      errorCallback: () => undefined,
    });
  } catch {
    // An import that is not a Pyodide package fails later with an ordinary ImportError.
  }

  let chunks: { stream: 'out' | 'err'; text: string }[] = [];
  let total = 0;
  let cut = false;
  let last = performance.now();
  const flush = () => {
    if (chunks.length) post({ type: 'out', id: job.id, chunks });
    chunks = [];
    last = performance.now();
  };
  const emit = (stream: 'out' | 'err', text: string) => {
    if (cut) return;
    total += text.length;
    if (total > MAX_OUTPUT) {
      cut = true;
      text = `${text.slice(0, Math.max(0, text.length - (total - MAX_OUTPUT)))}\n[output stopped: more than ${MAX_OUTPUT.toLocaleString('en')} characters]\n`;
      stream = 'err';
    }
    const tail = chunks[chunks.length - 1];
    if (tail && tail.stream === stream) tail.text += text;
    else chunks.push({ stream, text });
    // Post at once while output is slow (so a print before an infinite loop is seen), but
    // batch a flood of prints into at most ~20 messages per 50 ms.
    const now = performance.now();
    if (now - windowStart > 50) {
      windowStart = now;
      posts = 0;
    }
    if (posts < 20 || now - last > 50) {
      posts++;
      flush();
    }
  };
  let windowStart = 0;
  let posts = 0;

  post({ type: 'started', id: job.id });
  let json = '';
  let error: string | undefined;
  const stdin = py.toPy(job.stdin);
  let fn: PyProxy | null = null;
  try {
    fn = h.get(job.mode);
    const res = job.mode === 'run' ? fn(job.code, stdin, emit) : job.mode === 'check' ? fn(job.code, job.tests, stdin, emit) : fn(job.code, stdin, job.maxSteps);
    json = String(res);
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  } finally {
    fn?.destroy();
    stdin.destroy();
  }
  flush();
  post({ type: 'done', id: job.id, json, error });
}
