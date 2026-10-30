import type {
  Lesson,
  LessonInput,
  Module,
  ModuleInput,
  Project,
  ProjectInput,
  Subject,
  SubjectInput,
} from './types';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertSlug(slug: string, where: string): void {
  if (!SLUG.test(slug)) {
    throw new Error(`Invalid slug "${slug}" in ${where}. Use kebab-case.`);
  }
}

function defineProject(input: ProjectInput, parentId: string, kind: 'project' | 'capstone'): Project {
  assertSlug(input.slug, `${parentId} ${kind}`);
  return { ...input, id: `${parentId}#${kind}:${input.slug}` };
}

function defineLesson(input: LessonInput, moduleId: string, subjectId: string, index: number): Lesson {
  assertSlug(input.slug, `module ${moduleId}`);
  const id = `${moduleId}/${input.slug}`;
  const seenEx = new Set<string>();
  const exercises = input.exercises.map((ex) => {
    assertSlug(ex.slug, `lesson ${id}`);
    if (seenEx.has(ex.slug)) throw new Error(`Duplicate exercise slug "${ex.slug}" in ${id}`);
    seenEx.add(ex.slug);
    return { ...ex, id: `${id}#ex:${ex.slug}` };
  });
  return {
    ...input,
    id,
    subjectId,
    moduleId,
    index,
    status: input.status ?? 'complete',
    resources: input.resources.map((r, i) => ({ ...r, id: `${id}#res:${i + 1}` })),
    exercises,
    selfAssessment: input.selfAssessment.map((s, i) => ({ ...s, id: `${id}#sa:${i + 1}` })),
  };
}

function defineModule(input: ModuleInput, subjectId: string, startIndex: number): Module {
  assertSlug(input.slug, `subject ${subjectId}`);
  const id = `${subjectId}/${input.slug}`;
  const seen = new Set<string>();
  const lessons = input.lessons.map((l, i) => {
    if (seen.has(l.slug)) throw new Error(`Duplicate lesson slug "${l.slug}" in ${id}`);
    seen.add(l.slug);
    return defineLesson(l, id, subjectId, startIndex + i);
  });
  return {
    ...input,
    id,
    subjectId,
    lessons,
    project: input.project ? defineProject(input.project, id, 'project') : undefined,
  };
}

/**
 * Turn an authored SubjectInput into a fully-resolved Subject with stable IDs.
 * Throws on malformed slugs or duplicates so mistakes surface at build time.
 */
export function defineSubject(input: SubjectInput): Subject {
  assertSlug(input.id, 'subject id');
  const seen = new Set<string>();
  let index = 0;
  const modules: Module[] = input.modules.map((m) => {
    if (seen.has(m.slug)) throw new Error(`Duplicate module slug "${m.slug}" in ${input.id}`);
    seen.add(m.slug);
    const mod = defineModule(m, input.id, index);
    index += mod.lessons.length;
    return mod;
  });
  const lessons = modules.flatMap((m) => m.lessons);
  return {
    ...input,
    modules,
    capstone: defineProject(input.capstone, input.id, 'capstone'),
    lessons,
    lessonCount: lessons.length,
    completeLessonCount: lessons.filter((l) => l.status === 'complete').length,
  };
}
