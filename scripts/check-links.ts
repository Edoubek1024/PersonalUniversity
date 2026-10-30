/**
 * Checks every resource URL in the curriculum.
 *
 *   npm run check-links                       # all subjects
 *   npm run check-links -- operating-systems  # one or more subjects
 *
 * A URL is reported as BROKEN only on a definitive 404/410 or a network failure;
 * 403/429 and timeouts are reported as UNVERIFIED (many academic sites block bots).
 */
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
import type { CourseworkInput, Subject } from '../src/data/types';

const SUBJECT_DIR = resolve(__dirname, '../src/data/subjects');
const COURSEWORK_DIR = resolve(__dirname, '../src/data/coursework');
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

interface Target {
  url: string;
  lessonId: string;
  title: string;
}

async function loadTargets(only: string[]): Promise<Target[]> {
  const files = readdirSync(SUBJECT_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
  const targets: Target[] = [];
  for (const f of files) {
    const mod = (await import(pathToFileURL(join(SUBJECT_DIR, f)).href)) as { default: Subject };
    const s = mod.default;
    if (only.length && !only.includes(s.id)) continue;
    for (const l of s.lessons) for (const r of l.resources) targets.push({ url: r.url, lessonId: l.id, title: r.title });
  }
  const courseworkFiles = readdirSync(COURSEWORK_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
  for (const f of courseworkFiles) {
    const mod = (await import(pathToFileURL(join(COURSEWORK_DIR, f)).href)) as { default: CourseworkInput };
    const c = mod.default;
    if (only.length && !only.includes(c.subjectId)) continue;
    for (const item of [...c.machineProblems, c.finalProject]) {
      const where = `${c.subjectId}#${item.slug}`;
      for (const r of item.resources ?? []) targets.push({ url: r.url, lessonId: where, title: r.title });
      for (const e of item.setup.extensions) {
        targets.push({ url: `https://marketplace.visualstudio.com/items?itemName=${e}`, lessonId: where, title: e });
      }
    }
  }
  return targets;
}

async function probe(url: string): Promise<{ status: number | 'timeout' | 'error'; detail?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const headers = {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 TeachMeLinkCheck/1.0',
    accept: 'text/html,application/pdf,*/*',
  };
  try {
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers });
    if (res.status === 405 || res.status === 403 || res.status === 404) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers });
    }
    return { status: res.status };
  } catch (e) {
    const msg = (e as Error).name === 'AbortError' ? 'timeout' : 'error';
    return { status: msg, detail: (e as Error).message };
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const only = process.argv.slice(2);
  const targets = await loadTargets(only);
  const unique = new Map<string, Target[]>();
  for (const t of targets) unique.set(t.url, [...(unique.get(t.url) ?? []), t]);
  const urls = [...unique.keys()];
  console.log(`Checking ${urls.length} unique URLs (${targets.length} references)...`);

  const results = new Map<string, Awaited<ReturnType<typeof probe>>>();
  let i = 0;
  async function worker() {
    while (i < urls.length) {
      const url = urls[i++];
      results.set(url, await probe(url));
      process.stdout.write('.');
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  console.log('\n');

  const broken: string[] = [];
  const unverified: string[] = [];
  for (const [url, r] of results) {
    const refs = unique.get(url)!;
    const where = refs.map((x) => x.lessonId).join(', ');
    if (r.status === 404 || r.status === 410 || r.status === 'error') {
      broken.push(`BROKEN     ${r.status}  ${url}\n             used in: ${where}`);
    } else if (typeof r.status !== 'number' || r.status >= 400) {
      unverified.push(`UNVERIFIED ${r.status}  ${url}\n             used in: ${where}`);
    }
  }
  const ok = urls.length - broken.length - unverified.length;
  console.log(`OK: ${ok}   UNVERIFIED: ${unverified.length}   BROKEN: ${broken.length}\n`);
  for (const line of unverified) console.log(line);
  for (const line of broken) console.log(line);
  process.exit(broken.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
