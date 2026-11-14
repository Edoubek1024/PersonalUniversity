import { useRef, useState } from 'react';
import { Download, Moon, RotateCcw, Sun, Upload } from 'lucide-react';
import { subjects, totalLessonCount } from '@/data/subjects';
import { useProgress } from '@/store/progress';
import { useTheme } from '@/store/theme';
import { useSettings } from '@/store/settings';
import { universities, universityById, type UniversityId } from '@/data/universities';

export function SettingsPage() {
  const p = useProgress();
  const { theme, toggle } = useTheme();
  const { courseCodes, setCourseCodes, university, setUniversity } = useSettings();
  const mapped = subjects.filter((s) => universityById[university].codes[s.id]).length;
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<'merge' | 'replace'>('merge');
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const download = () => {
    const blob = new Blob([p.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teach-me-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    const text = await file.text();
    const r = p.importJson(text, mode);
    setMsg(r.ok ? { kind: 'ok', text: `Imported (${mode}).` } : { kind: 'err', text: r.error ?? 'Import failed.' });
    if (fileRef.current) fileRef.current.value = '';
  };

  const counts = {
    lessons: Object.keys(p.completedLessons).length,
    checks: Object.keys(p.checks).length,
    notes: Object.keys(p.notes).length,
    bookmarks: Object.keys(p.bookmarks).length,
  };
  const outline = subjects.reduce((n, s) => n + (s.lessonCount - s.completeLessonCount), 0);

  return (
    <div className="mx-auto max-w-2xl space-y-8 animate-rise">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-ink-2">Progress is stored only in this browser. Export regularly if you care about it.</p>
      </header>

      <section className="card p-5" aria-labelledby="appearance">
        <h2 id="appearance" className="text-base font-semibold">
          Appearance
        </h2>
        <button type="button" onClick={toggle} className="btn-outline mt-3">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </button>
      </section>

      <section className="card p-5" aria-labelledby="codes">
        <h2 id="codes" className="text-base font-semibold">
          Course codes
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          Label subjects that are essentially a university course by that course&apos;s code, for example &ldquo;MATH 241 (Calculus III)&rdquo;, and list them before the rest on the Subjects page.
        </p>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={courseCodes} onChange={(e) => setCourseCodes(e.target.checked)} className="h-4 w-4 cursor-pointer accent-indigo-500" />
          Show course codes
        </label>
        <label className="mt-3 block text-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink-3">University</span>
          <select className="input mt-1 max-w-sm" value={university} onChange={(e) => setUniversity(e.target.value as UniversityId)}>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.short})
              </option>
            ))}
          </select>
        </label>
        <p className="mt-2 text-xs text-ink-3">
          {mapped} of {subjects.length} subjects match a {universityById[university].short} course. Codes follow the university&apos;s catalog; the content here is original and not affiliated with the university.
        </p>
      </section>

      <section className="card p-5" aria-labelledby="data">
        <h2 id="data" className="text-base font-semibold">
          Your data
        </h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-4">
          <dt className="text-ink-3">Lessons done</dt>
          <dd className="font-semibold tabular-nums">{counts.lessons}</dd>
          <dt className="text-ink-3">Checklist items</dt>
          <dd className="font-semibold tabular-nums">{counts.checks}</dd>
          <dt className="text-ink-3">Notes</dt>
          <dd className="font-semibold tabular-nums">{counts.notes}</dd>
          <dt className="text-ink-3">Bookmarks</dt>
          <dd className="font-semibold tabular-nums">{counts.bookmarks}</dd>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={download} className="btn-primary">
            <Download size={16} aria-hidden /> Export JSON
          </button>
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline">
            <Upload size={16} aria-hidden /> Import JSON
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} aria-label="Choose a progress file to import" />
        </div>
        <fieldset className="mt-3 text-sm">
          <legend className="text-xs font-semibold uppercase tracking-widest text-ink-3">Import mode</legend>
          <div className="mt-1 flex gap-4">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="mode" checked={mode === 'merge'} onChange={() => setMode('merge')} className="accent-indigo-500" /> Merge with existing
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="mode" checked={mode === 'replace'} onChange={() => setMode('replace')} className="accent-indigo-500" /> Replace everything
            </label>
          </div>
        </fieldset>
        {msg && (
          <p role="status" className={`mt-3 text-sm ${msg.kind === 'ok' ? 'text-emerald-500' : 'text-rose-500'}`}>
            {msg.text}
          </p>
        )}
      </section>

      <section className="card border-rose-500/30 p-5" aria-labelledby="danger">
        <h2 id="danger" className="text-base font-semibold">
          Reset
        </h2>
        <p className="mt-1 text-sm text-ink-2">Removes all completion, checklists, notes and bookmarks from this browser. Export first if unsure.</p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset ALL progress? This cannot be undone.')) {
              p.resetAll();
              setMsg({ kind: 'ok', text: 'All progress reset.' });
            }
          }}
          className="btn-outline mt-3 border-rose-500/40 text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
        >
          <RotateCcw size={16} aria-hidden /> Reset all progress
        </button>
      </section>

      <section className="card p-5" aria-labelledby="about">
        <h2 id="about" className="text-base font-semibold">
          About this curriculum
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          {subjects.length} subjects · {totalLessonCount} lessons · {outline} lessons still marked as outline. Curriculum data lives in <code className="rounded bg-surface-2 px-1 font-mono text-xs">src/data/subjects/</code>; see <code className="rounded bg-surface-2 px-1 font-mono text-xs">docs/AUTHORING.md</code> to add or edit lessons.
        </p>
      </section>
    </div>
  );
}
