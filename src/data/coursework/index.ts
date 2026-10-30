import type { CourseworkInput } from '../types';

/**
 * Every file in this directory (except index.ts) default-exports the machine problems
 * and final project for one subject, built with `defineCoursework`. Keeping them apart
 * from the lesson files means a course's projects can be read and edited on their own.
 */
const modules = import.meta.glob<{ default: CourseworkInput }>('./*.ts', { eager: true });

export const courseworkBySubject: Map<string, CourseworkInput> = new Map(
  Object.entries(modules)
    .filter(([path]) => !path.endsWith('/index.ts'))
    .map(([, m]) => [m.default.subjectId, m.default]),
);
