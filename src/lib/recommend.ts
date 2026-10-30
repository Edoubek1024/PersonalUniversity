import { subjects, subjectById } from '@/data/subjects';
import type { Lesson, Subject } from '@/data/types';
import { subjectCompletion, subjectStatus } from '@/store/progress';

export interface Recommendation {
  lesson: Lesson;
  subject: Subject;
  reason: string;
}

/** Share of a subject's prerequisites that are at least 60% complete. */
export function prerequisiteReadiness(s: Subject, completed: Record<string, string>): number {
  if (s.prerequisites.length === 0) return 1;
  let ready = 0;
  for (const p of s.prerequisites) {
    const ps = subjectById.get(p);
    if (!ps) {
      ready += 1;
      continue;
    }
    if (subjectCompletion(ps, completed).pct >= 60) ready += 1;
  }
  return ready / s.prerequisites.length;
}

export function nextLessonIn(s: Subject, completed: Record<string, string>): Lesson | undefined {
  return s.lessons.find((l) => !completed[l.id]);
}

/**
 * Suggests what to do next:
 *  1. continue active subjects (most recently visited first)
 *  2. start subjects whose prerequisites are satisfied
 */
export function recommend(
  completed: Record<string, string>,
  lastVisited: Record<string, string>,
  limit = 5,
): Recommendation[] {
  const out: Recommendation[] = [];
  const active = subjects
    .filter((s) => subjectStatus(s, completed) === 'active')
    .map((s) => {
      const last = Math.max(0, ...s.lessons.map((l) => (lastVisited[l.id] ? new Date(lastVisited[l.id]).getTime() : 0)));
      return { s, last };
    })
    .sort((a, b) => b.last - a.last);
  for (const { s } of active) {
    const l = nextLessonIn(s, completed);
    if (l) out.push({ lesson: l, subject: s, reason: `Continue ${s.title}` });
    if (out.length >= limit) return out;
  }
  const startable = subjects
    .filter((s) => subjectStatus(s, completed) === 'not-started')
    .map((s) => ({ s, readiness: prerequisiteReadiness(s, completed) }))
    .filter((x) => x.readiness === 1)
    .sort((a, b) => {
      const rank = (x: Subject) => (x.core ? 0 : 1) * 10 + x.prerequisites.length;
      return rank(a.s) - rank(b.s);
    });
  for (const { s } of startable) {
    const l = s.lessons[0];
    if (l) out.push({ lesson: l, subject: s, reason: s.prerequisites.length ? 'Prerequisites met' : 'No prerequisites' });
    if (out.length >= limit) break;
  }
  return out;
}

export function recentlyCompleted(completed: Record<string, string>, limit = 6): { lesson: Lesson; subject: Subject; at: string }[] {
  const all: { lesson: Lesson; subject: Subject; at: string }[] = [];
  for (const s of subjects) for (const l of s.lessons) if (completed[l.id]) all.push({ lesson: l, subject: s, at: completed[l.id] });
  return all.sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
}
