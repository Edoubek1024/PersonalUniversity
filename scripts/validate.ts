/**
 * Validates every subject file in src/data/subjects.
 *
 *   npm run validate                 # all subjects
 *   npm run validate -- operating-systems compilers   # only report on these
 *
 * Exit code 1 if any ERROR is found in the selected subjects.
 */
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { attachCoursework } from '../src/data/define';
import type { CourseworkInput, CourseworkItem, Subject } from '../src/data/types';

const SUBJECT_DIR = resolve(__dirname, '../src/data/subjects');
const COURSEWORK_DIR = resolve(__dirname, '../src/data/coursework');
const KNOWN_SUBJECT_IDS = [
  'programming-fundamentals',
  'discrete-mathematics',
  'data-structures-algorithms',
  'computer-architecture',
  'operating-systems',
  'computer-networks',
  'databases',
  'software-engineering',
  'compilers',
  'machine-learning',
  'deep-learning',
  'probability-statistics',
  'systems-programming',
  'theory-of-computation',
  'cybersecurity',
  'embedded-systems-iot',
  'distributed-systems',
  'math-methods',
  'classical-mechanics',
  'waves-optics',
  'electromagnetism',
  'thermodynamics-statistical-mechanics',
  'quantum-mechanics',
  'relativity',
  'computational-physics',
  'intro-astronomy',
  'observational-astronomy',
  'planetary-science-exoplanets',
  'stellar-astrophysics',
  'galaxies-cosmology',
  'high-energy-astrophysics',
  'cpp-programming',
  'typescript-web',
  'go-programming',
  'bash-scripting',
];

type Level = 'ERROR' | 'WARN';
interface Finding {
  level: Level;
  subject: string;
  where: string;
  message: string;
}

const findings: Finding[] = [];
const err = (subject: string, where: string, message: string) =>
  findings.push({ level: 'ERROR', subject, where, message });
const warn = (subject: string, where: string, message: string) =>
  findings.push({ level: 'WARN', subject, where, message });

async function loadSubjects(): Promise<{ subjects: Subject[]; files: Map<string, string> }> {
  const files = readdirSync(SUBJECT_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
  const subjects: Subject[] = [];
  const fileOf = new Map<string, string>();
  for (const f of files) {
    const url = pathToFileURL(join(SUBJECT_DIR, f)).href;
    try {
      const mod = (await import(url)) as { default: Subject };
      if (!mod.default || typeof mod.default !== 'object' || !('id' in mod.default)) {
        err(f, 'module', 'does not default-export a Subject built with defineSubject()');
        continue;
      }
      subjects.push(mod.default);
      fileOf.set(mod.default.id, f);
      if (f !== `${mod.default.id}.ts`) err(mod.default.id, 'file', `file name should be ${mod.default.id}.ts (got ${f})`);
    } catch (e) {
      err(f.replace(/.ts$/, ''), 'module', `failed to load: ${(e as Error).message}`);
    }
  }
  return { subjects, files: fileOf };
}

/** Machine problems per course, and the extensions a spec may name. */
const MP_COUNT = 2;
const KNOWN_EXTENSIONS = new Set([
  'ms-vscode.cpptools',
  'ms-vscode.cpptools-extension-pack',
  'ms-vscode.cmake-tools',
  'llvm-vs-code-extensions.vscode-clangd',
  'vadimcn.vscode-lldb',
  'ms-python.python',
  'ms-python.vscode-pylance',
  'ms-python.debugpy',
  'charliermarsh.ruff',
  'ms-toolsai.jupyter',
  'rust-lang.rust-analyzer',
  'golang.go',
  'dbaeumer.vscode-eslint',
  'esbenp.prettier-vscode',
  'timonwong.shellcheck',
  'foxundermoon.shell-format',
  'ms-azuretools.vscode-docker',
  'ms-vscode-remote.remote-wsl',
  'ms-vscode-remote.remote-containers',
  'mtxr.sqltools',
  'mtxr.sqltools-driver-sqlite',
  'mtxr.sqltools-driver-pg',
  'qwtel.sqlite-viewer',
  'platformio.platformio-ide',
  'wokwi.wokwi-vscode',
  'mshr-h.veriloghdl',
  'marus25.cortex-debug',
  'redhat.vscode-yaml',
  'github.vscode-github-actions',
  'tamasfe.even-better-toml',
  'james-yu.latex-workshop',
  'humao.rest-client',
  'ms-vscode.hexeditor',
]);

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

function checkSubject(s: Subject, allLessonIds: Set<string>, presentSubjects: Set<string>) {
  const id = s.id;
  if (!KNOWN_SUBJECT_IDS.includes(id)) warn(id, 'id', 'subject id is not in the curriculum plan (docs/CURRICULUM-PLAN.md)');
  if (!s.title) err(id, 'title', 'missing');
  if (!['cs', 'physics', 'astronomy'].includes(s.category)) err(id, 'category', `invalid "${s.category}"`);
  if (!s.tagline) err(id, 'tagline', 'missing');
  if (wordCount(s.description) < 60) warn(id, 'description', `short (${wordCount(s.description)} words; aim for 2-4 paragraphs)`);
  if (!(s.estimatedHours > 0)) err(id, 'estimatedHours', 'must be > 0');
  if (s.modules.length < 4) warn(id, 'modules', `only ${s.modules.length} modules (aim for 4-8)`);
  if (s.masteryChecklist.length < 4) warn(id, 'masteryChecklist', `only ${s.masteryChecklist.length} items`);
  if (!s.capstone?.title || s.capstone.deliverables.length === 0) err(id, 'capstone', 'needs a title and deliverables');
  for (const p of s.prerequisites) {
    if (p === id) err(id, 'prerequisites', 'subject lists itself');
    else if (!KNOWN_SUBJECT_IDS.includes(p)) err(id, 'prerequisites', `unknown subject id "${p}"`);
    else if (!presentSubjects.has(p)) warn(id, 'prerequisites', `"${p}" is planned but its file is not written yet`);
  }

  for (const m of s.modules) {
    if (m.lessons.length < 3) warn(id, m.id, `only ${m.lessons.length} lessons (aim for 3-8)`);
    if (m.lessons.length > 8) warn(id, m.id, `${m.lessons.length} lessons (consider splitting)`);
    if (!m.description) err(id, m.id, 'module description missing');
    for (const l of m.lessons) {
      const w = l.id;
      if (l.status === 'outline') {
        warn(id, w, 'lesson is marked outline (stub)');
        continue;
      }
      if (!l.summary) err(id, w, 'summary missing');
      if (!(l.estimatedMinutes > 0)) err(id, w, 'estimatedMinutes must be > 0');
      if (l.objectives.length < 3) err(id, w, `only ${l.objectives.length} objectives (need 3-6)`);
      if (l.concepts.length < 4) err(id, w, `only ${l.concepts.length} concepts (need 4-10)`);
      const wc = wordCount(l.explanation);
      if (wc < 120) err(id, w, `explanation too short (${wc} words; need 150-400)`);
      else if (wc > 600) warn(id, w, `explanation long (${wc} words)`);
      if (l.resources.length < 2) err(id, w, `only ${l.resources.length} resources (need 2-5)`);
      if (l.exercises.length < 2) err(id, w, `only ${l.exercises.length} exercises (need 2-5)`);
      if (l.selfAssessment.length < 3) err(id, w, `only ${l.selfAssessment.length} self-assessment items (need 3-5)`);
      for (const r of l.resources) {
        if (!/^https?:\/\//.test(r.url)) err(id, w, `resource "${r.title}" has invalid url "${r.url}"`);
        if (!r.title) err(id, w, 'resource missing title');
        if (!['free', 'paid', 'freemium'].includes(r.cost)) err(id, w, `resource "${r.title}" has invalid cost`);
      }
      if (l.resources.some((r) => r.cost === 'paid') && !l.resources.some((r) => r.cost !== 'paid')) {
        warn(id, w, 'all resources are paid; add a free alternative');
      }
      for (const ex of l.exercises) {
        if (wordCount(ex.prompt) < 15) warn(id, w, `exercise "${ex.slug}" prompt is very short`);
      }
      for (const sa of l.selfAssessment) {
        if (!sa.answerOutline) err(id, w, 'self-assessment item missing answerOutline');
      }
      for (const ref of [...(l.relatedLessons ?? []), ...(l.prerequisiteLessons ?? [])]) {
        if (allLessonIds.has(ref)) continue;
        const refSubject = ref.split('/')[0];
        if (!presentSubjects.has(refSubject)) {
          if (KNOWN_SUBJECT_IDS.includes(refSubject)) warn(id, w, `reference "${ref}" points at a subject not written yet`);
          else err(id, w, `reference "${ref}" points at unknown subject "${refSubject}"`);
        } else {
          err(id, w, `reference "${ref}" does not exist`);
        }
      }
    }
  }
}

async function loadCoursework(): Promise<Map<string, CourseworkInput>> {
  const out = new Map<string, CourseworkInput>();
  for (const f of readdirSync(COURSEWORK_DIR).filter((n) => n.endsWith('.ts') && n !== 'index.ts')) {
    try {
      const mod = (await import(pathToFileURL(join(COURSEWORK_DIR, f)).href)) as { default: CourseworkInput };
      out.set(mod.default.subjectId, mod.default);
      if (f !== `${mod.default.subjectId}.ts`) err(mod.default.subjectId, 'file', `coursework file should be ${mod.default.subjectId}.ts (got ${f})`);
    } catch (e) {
      err(f.replace(/.ts$/, ''), 'coursework', `failed to load: ${(e as Error).message}`);
    }
  }
  return out;
}

function checkItem(s: Subject, item: CourseworkItem) {
  const id = s.id;
  const w = item.id;
  const minWords = item.kind === 'final' ? 100 : 70;
  if (!item.summary) err(id, w, 'summary missing');
  if (wordCount(item.overview) < minWords) err(id, w, `overview too short (${wordCount(item.overview)} words; need ${minWords}+)`);
  if (!item.language) err(id, w, 'language missing');
  if (!(item.estimatedHours > 0)) err(id, w, 'estimatedHours must be > 0');
  if (item.requirements.length < 6) err(id, w, `only ${item.requirements.length} requirements (need 6+)`);
  if (item.acceptanceTests.length < 4) err(id, w, `only ${item.acceptanceTests.length} acceptance tests (need 4+)`);
  for (const r of item.requirements) if (wordCount(r) < 6) warn(id, w, `requirement is very short: "${r}"`);
  if (item.setup.extensions.length === 0) err(id, w, 'setup needs at least one VS Code extension');
  for (const e of item.setup.extensions) if (!KNOWN_EXTENSIONS.has(e)) err(id, w, `unknown VS Code extension "${e}"`);
  if (item.setup.toolchain.length === 0) err(id, w, 'setup.toolchain is empty');
  if (!item.setup.structure.trim()) err(id, w, 'setup.structure is empty');
  if (item.setup.commands.length < 2) err(id, w, 'setup.commands needs at least build/run and test');
  for (const r of item.resources ?? []) {
    if (!r.url.startsWith('http')) err(id, w, `resource "${r.title}" has invalid url "${r.url}"`);
  }
}

function checkCoursework(s: Subject) {
  const id = s.id;
  const cw = s.coursework;
  if (!cw) {
    if (s.category === 'cs') err(id, 'coursework', 'CS subject has no machine problems or final project');
    return;
  }
  if (cw.machineProblems.length !== MP_COUNT) err(id, 'coursework', `has ${cw.machineProblems.length} machine problems (need ${MP_COUNT})`);

  // Even spacing: the gaps from the start, between MPs, and to the final project must be level.
  const n = s.modules.length;
  const stops = [0, ...cw.machineProblems.map((mp) => s.modules.findIndex((m) => m.slug === mp.afterModule) + 1), n];
  const widest = Math.ceil(n / (MP_COUNT + 1));
  stops.slice(1).forEach((stop, i) => {
    const gap = stop - stops[i];
    if (gap < 1 || gap > widest) err(id, 'coursework', `uneven spacing: module stops ${stops.join(', ')} of ${n} (gaps must be 1-${widest})`);
  });

  cw.items.forEach((item) => checkItem(s, item));
  const f = cw.finalProject;
  if (f.estimatedHours < Math.max(...cw.machineProblems.map((mp) => mp.estimatedHours))) {
    err(id, f.id, 'final project should be at least as large as the largest machine problem');
  }
  if (!/^[A-Za-z0-9._-]+$/.test(f.repoName)) err(id, f.id, `invalid repoName "${f.repoName}"`);
  if (f.portfolio.length < 4) err(id, f.id, `only ${f.portfolio.length} portfolio steps (need 4+)`);
  for (const c of f.coverage) if (wordCount(c.demonstrates) < 5) warn(id, f.id, `coverage for "${c.module}" is very short`);
  for (const mp of cw.machineProblems) {
    if (mp.coversModules.length === 0) err(id, mp.id, 'coversModules is empty');
  }
}

async function main() {
  const only = process.argv.slice(2);
  const loaded = await loadSubjects();
  const courseworkInputs = await loadCoursework();
  const subjects = loaded.subjects.map((s) => {
    const input = courseworkInputs.get(s.id);
    if (!input) return s;
    try {
      return attachCoursework(s, input);
    } catch (e) {
      err(s.id, 'coursework', (e as Error).message);
      return s;
    }
  });
  for (const id of courseworkInputs.keys()) {
    if (!subjects.some((s) => s.id === id)) err(id, 'coursework', 'no subject with this id');
  }
  const presentSubjects = new Set(subjects.map((s) => s.id));
  const allLessonIds = new Set(subjects.flatMap((s) => s.lessons.map((l) => l.id)));

  for (const s of subjects) {
    checkSubject(s, allLessonIds, presentSubjects);
    checkCoursework(s);
  }

  // learning paths
  try {
    const paths = (await import(pathToFileURL(resolve(__dirname, '../src/data/paths.ts')).href)) as {
      learningPaths: { id: string; subjectIds: string[] }[];
    };
    for (const p of paths.learningPaths) {
      for (const sid of p.subjectIds) {
        if (!KNOWN_SUBJECT_IDS.includes(sid)) err('paths', p.id, `unknown subject "${sid}"`);
        else if (!presentSubjects.has(sid)) warn('paths', p.id, `subject "${sid}" not written yet`);
      }
    }
  } catch (e) {
    err('paths', 'paths.ts', (e as Error).message);
  }

  const selected = only.length ? findings.filter((f) => only.includes(f.subject)) : findings;
  const errors = selected.filter((f) => f.level === 'ERROR');
  const warns = selected.filter((f) => f.level === 'WARN');

  console.log('\nSubjects present: ' + subjects.length + ' / ' + KNOWN_SUBJECT_IDS.length);
  const missing = KNOWN_SUBJECT_IDS.filter((k) => !presentSubjects.has(k));
  if (missing.length) console.log('Missing: ' + missing.join(', '));

  const row = (a: string, b: string | number, c: string | number, d: string | number, e: string | number) =>
    console.log(a.padEnd(40) + String(b).padStart(8) + String(c).padStart(9) + String(d).padStart(8) + String(e).padStart(7));
  console.log('');
  row('subject', 'modules', 'lessons', 'outline', 'hours');
  let totalLessons = 0;
  let totalOutline = 0;
  for (const s of [...subjects].sort((a, b) => a.id.localeCompare(b.id))) {
    if (only.length && !only.includes(s.id)) continue;
    const outline = s.lessonCount - s.completeLessonCount;
    totalLessons += s.lessonCount;
    totalOutline += outline;
    row(s.id, s.modules.length, s.lessonCount, outline, s.estimatedHours);
  }
  row('TOTAL', '', totalLessons, totalOutline, '');

  if (warns.length) {
    console.log(`\n${warns.length} warning(s):`);
    for (const f of warns) console.log(`  WARN  [${f.subject}] ${f.where}: ${f.message}`);
  }
  if (errors.length) {
    console.log(`\n${errors.length} error(s):`);
    for (const f of errors) console.log(`  ERROR [${f.subject}] ${f.where}: ${f.message}`);
    process.exit(1);
  }
  console.log('\nOK: no errors.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
