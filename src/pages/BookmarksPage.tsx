import { Link } from 'react-router-dom';
import { lessonById, subjectById } from '@/data/subjects';
import { useProgress } from '@/store/progress';
import { relativeTime } from '@/lib/format';
import { SubjectCard } from '@/components/SubjectCard';
import { LessonRow } from '@/components/LessonRow';
import { Empty, SectionTitle } from '@/components/ui';

export function BookmarksPage() {
  const { bookmarks } = useProgress();
  const entries = Object.entries(bookmarks).sort((a, b) => b[1].localeCompare(a[1]));
  const subjects = entries.map(([id]) => subjectById.get(id)).filter(Boolean);
  const lessons = entries.map(([id, at]) => ({ lesson: lessonById.get(id), at })).filter((x) => x.lesson);

  return (
    <div className="space-y-8 animate-rise">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Bookmarks</h1>
        <p className="mt-2 text-sm text-ink-2">Subjects and lessons you saved to come back to.</p>
      </header>
      {entries.length === 0 && <Empty title="Nothing bookmarked yet" body="Use the bookmark button on any subject or lesson page." cta={{ to: '/subjects', label: 'Browse subjects' }} />}
      {subjects.length > 0 && (
        <section aria-labelledby="bm-subjects">
          <SectionTitle id="bm-subjects">Subjects</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {subjects.map((s) => (
              <SubjectCard key={s!.id} subject={s!} compact />
            ))}
          </div>
        </section>
      )}
      {lessons.length > 0 && (
        <section aria-labelledby="bm-lessons">
          <SectionTitle id="bm-lessons">Lessons</SectionTitle>
          <ol className="card p-2">
            {lessons.map(({ lesson, at }) => (
              <LessonRow key={lesson!.id} lesson={lesson!} subtitle={`${subjectById.get(lesson!.subjectId)?.title} · saved ${relativeTime(at)}`} />
            ))}
          </ol>
        </section>
      )}
      <p className="text-xs text-ink-3">
        Looking for notes? They live on the <Link to="/notes" className="text-accent hover:underline">Notes</Link> page.
      </p>
    </div>
  );
}
