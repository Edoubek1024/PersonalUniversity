import type {
  Coursework,
  CourseworkInput,
  FinalProject,
  Lesson,
  LessonInput,
  MachineProblem,
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

/** Identity helper so a coursework file gets type-checked against the contract. */
export function defineCoursework(input: CourseworkInput): CourseworkInput {
  return input;
}

/**
 * Attach machine problems and the final project to a subject. Throws when a machine
 * problem relies on a later module or the final project skips one, so that a project
 * can never ask for something the learner has not been taught yet.
 */
export function attachCoursework(subject: Subject, input: CourseworkInput): Subject {
  const where = `coursework for ${subject.id}`;
  const order = new Map(subject.modules.map((m, i) => [m.slug, i]));
  const position = (slug: string, context: string): number => {
    const i = order.get(slug);
    if (i === undefined) throw new Error(`Unknown module "${slug}" in ${context} of ${where}`);
    return i;
  };

  const seen = new Set<string>();
  const claim = (slug: string) => {
    assertSlug(slug, where);
    if (seen.has(slug)) throw new Error(`Duplicate coursework slug "${slug}" in ${where}`);
    seen.add(slug);
  };

  const machineProblems: MachineProblem[] = [...input.machineProblems]
    .sort((a, b) => position(a.afterModule, a.slug) - position(b.afterModule, b.slug))
    .map((mp, i) => {
      claim(mp.slug);
      const limit = position(mp.afterModule, mp.slug);
      for (const covered of mp.coversModules) {
        if (position(covered, mp.slug) > limit) {
          throw new Error(`${mp.slug} in ${where} covers "${covered}", which comes after "${mp.afterModule}"`);
        }
      }
      return { ...mp, kind: 'mp', id: `${subject.id}#mp:${mp.slug}`, subjectId: subject.id, number: i + 1 };
    });

  claim(input.finalProject.slug);
  const covered = new Set(input.finalProject.coverage.map((c) => c.module));
  for (const c of covered) position(c, input.finalProject.slug);
  const skipped = subject.modules.filter((m) => !covered.has(m.slug)).map((m) => m.slug);
  if (skipped.length) throw new Error(`Final project in ${where} does not cover: ${skipped.join(', ')}`);

  const finalProject: FinalProject = {
    ...input.finalProject,
    kind: 'final',
    id: `${subject.id}#final:${input.finalProject.slug}`,
    subjectId: subject.id,
  };
  const coursework: Coursework = { machineProblems, finalProject, items: [...machineProblems, finalProject] };

  const hidden = new Set(machineProblems.filter((mp) => mp.supersedesProject).map((mp) => mp.afterModule));
  return {
    ...subject,
    coursework,
    modules: subject.modules.map((m) => (hidden.has(m.slug) ? { ...m, project: undefined } : m)),
  };
}
