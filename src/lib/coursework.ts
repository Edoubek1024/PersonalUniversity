import type { CourseworkItem, MachineProblem, Subject } from '@/data/types';
import type { Completion } from '@/store/progress';

export function courseworkHref(item: CourseworkItem): string {
  return `/subjects/${item.subjectId}/coursework/${item.slug}`;
}

export function courseworkLabel(item: CourseworkItem): string {
  return item.kind === 'mp' ? `MP ${item.number}` : 'Final project';
}

export function requirementCheckId(item: CourseworkItem, i: number): string {
  return `${item.id}#req:${i}`;
}

export function portfolioCheckId(item: CourseworkItem, i: number): string {
  return `${item.id}#gh:${i}`;
}

/** Progress counts every requirement, plus the GitHub steps on a final project. */
export function courseworkProgress(item: CourseworkItem, checks: Record<string, true>): Completion {
  const ids = item.requirements.map((_, i) => requirementCheckId(item, i));
  if (item.kind === 'final') ids.push(...item.portfolio.map((_, i) => portfolioCheckId(item, i)));
  const done = ids.filter((id) => checks[id]).length;
  return { done, total: ids.length, pct: ids.length ? Math.round((done / ids.length) * 100) : 0 };
}

export function findCoursework(subject: Subject, slug: string): CourseworkItem | undefined {
  return subject.coursework?.items.find((item) => item.slug === slug);
}

/** Subject hours leave out coursework, so course pages show this figure beside them. */
export function courseworkHours(subject: Subject): number {
  return subject.coursework?.items.reduce((sum, item) => sum + item.estimatedHours, 0) ?? 0;
}

/** The machine problems that fall due when a module ends. */
export function machineProblemsAfter(subject: Subject, moduleSlug: string): MachineProblem[] {
  return subject.coursework?.machineProblems.filter((mp) => mp.afterModule === moduleSlug) ?? [];
}

/** Lessons still to do before the learner has been taught everything an item needs. */
export function lessonsRemainingBefore(item: CourseworkItem, subject: Subject, completed: Record<string, string>): number {
  const end = item.kind === 'mp' ? subject.modules.findIndex((m) => m.slug === item.afterModule) : subject.modules.length - 1;
  return subject.modules.slice(0, end + 1).flatMap((m) => m.lessons).filter((l) => !completed[l.id]).length;
}
