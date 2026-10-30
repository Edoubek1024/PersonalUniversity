import type { Lesson, Subject } from '../types';

/**
 * Every file in this directory (except index.ts) default-exports a Subject built
 * with `defineSubject`. Vite's glob import discovers them automatically, so adding
 * a subject is just adding a file.
 */
const modules = import.meta.glob<{ default: Subject }>('./*.ts', { eager: true });

export const subjects: Subject[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('/index.ts'))
  .map(([, m]) => m.default)
  .sort((a, b) => a.title.localeCompare(b.title));

export const subjectById: Map<string, Subject> = new Map(subjects.map((s) => [s.id, s]));

export const lessonById: Map<string, Lesson> = new Map(
  subjects.flatMap((s) => s.lessons.map((l) => [l.id, l] as const)),
);

export function getSubject(id: string): Subject | undefined {
  return subjectById.get(id);
}

export function getLesson(id: string): Lesson | undefined {
  return lessonById.get(id);
}

export const totalLessonCount = subjects.reduce((n, s) => n + s.lessonCount, 0);
