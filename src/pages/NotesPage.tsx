import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { lessonById, subjectById } from '@/data/subjects';
import { useProgress } from '@/store/progress';
import { Markdown } from '@/lib/markdown';
import { Empty } from '@/components/ui';

export function NotesPage() {
  const { notes } = useProgress();
  const [q, setQ] = useState('');
  const entries = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return Object.entries(notes)
      .map(([id, text]) => ({ id, text, lesson: lessonById.get(id) }))
      .filter((e) => !ql || e.text.toLowerCase().includes(ql) || e.lesson?.title.toLowerCase().includes(ql))
      .sort((a, b) => (a.lesson?.title ?? a.id).localeCompare(b.lesson?.title ?? b.id));
  }, [notes, q]);

  return (
    <div className="space-y-6 animate-rise">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Notes</h1>
          <p className="mt-2 text-sm text-ink-2">Everything you wrote on lesson pages, in one place. Markdown and LaTeX render here.</p>
        </div>
        <label className="sm:w-72">
          <span className="sr-only">Search notes</span>
          <input className="input" placeholder="Search notes…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </header>
      {entries.length === 0 ? (
        <Empty title={q ? 'No notes match' : 'No notes yet'} body="Open any lesson and write in the notes box; it saves automatically." cta={{ to: '/subjects', label: 'Browse subjects' }} />
      ) : (
        <ul className="space-y-4">
          {entries.map((e) => (
            <li key={e.id} className="card p-4">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <Link to={`/subjects/${e.id}`} className="text-sm font-semibold hover:text-accent">
                  {e.lesson?.title ?? e.id}
                </Link>
                <span className="text-xs text-ink-3">{e.lesson ? subjectById.get(e.lesson.subjectId)?.title : 'lesson removed'}</span>
              </div>
              <Markdown className="text-sm">{e.text}</Markdown>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
