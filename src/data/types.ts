/**
 * Core data model for the Teach Me curriculum.
 *
 * ID conventions (all derived automatically by `defineSubject` in ./define.ts):
 *   subject  : "operating-systems"
 *   module   : "operating-systems/virtualization"               (subjectId/moduleSlug)
 *   lesson   : "operating-systems/virtualization/address-spaces" (moduleId/lessonSlug)
 *   exercise : "<lessonId>#ex:<exerciseSlug>"
 *   resource : "<lessonId>#res:<n>"
 *   project  : "<moduleId>#project:<slug>" or "<subjectId>#capstone:<slug>"
 *
 * Authors write slugs; IDs are computed. Slugs must be kebab-case and unique
 * within their parent. Never rename a slug once progress may exist for it.
 */

export type CategoryId = 'cs' | 'physics' | 'astronomy';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type ResourceType =
  | 'course' // full course (OCW, Stanford, CMU, ...)
  | 'textbook' // open textbook or book page
  | 'lecture' // single lecture / lecture series video
  | 'video' // short explanatory video
  | 'article' // article, blog post, paper
  | 'documentation' // official docs / reference
  | 'tool' // software, simulator, library
  | 'dataset' // real scientific data
  | 'problem-set' // exercises / assignments
  | 'interactive'; // interactive demo, notebook, sandbox

export type ResourceCost = 'free' | 'paid' | 'freemium';

export interface ResourceInput {
  title: string;
  url: string;
  type: ResourceType;
  cost: ResourceCost;
  /** Who publishes it, e.g. "MIT OpenCourseWare", "OpenStax", "NASA". */
  provider?: string;
  /** Why this resource, and what part of it to use ("Chapters 13-16", "Lecture 4"). */
  note?: string;
  /** Mark the canonical/primary resource for the lesson. */
  primary?: boolean;
}

export interface Resource extends ResourceInput {
  id: string;
}

export type ExerciseKind =
  | 'problem' // pencil-and-paper problem
  | 'coding' // write / debug / test code
  | 'derivation' // derive a result mathematically
  | 'simulation' // write or run a simulation
  | 'data-analysis' // work with real data
  | 'reading' // structured reading task with questions
  | 'writing'; // explain / summarise / design document

export interface ExerciseInput {
  slug: string;
  title: string;
  /** Full statement of the task, Markdown + LaTeX allowed. */
  prompt: string;
  kind: ExerciseKind;
  /** 1 = warm-up, 2 = core, 3 = challenge */
  difficulty: 1 | 2 | 3;
  hint?: string;
}

export interface Exercise extends ExerciseInput {
  id: string;
}

export interface SelfCheckInput {
  question: string;
  /** What a correct answer should contain; shown on reveal. */
  answerOutline: string;
}

export interface SelfCheck extends SelfCheckInput {
  id: string;
}

export interface ProjectInput {
  slug: string;
  title: string;
  /** Markdown. Describe the system/analysis to build and why it matters. */
  description: string;
  deliverables: string[];
  estimatedHours: number;
  /** Optional stretch goals. */
  stretchGoals?: string[];
}

export interface Project extends ProjectInput {
  id: string;
}

export type LessonStatus = 'complete' | 'outline';

export interface LessonInput {
  slug: string;
  title: string;
  /** One or two sentences shown on cards and in lists. */
  summary: string;
  estimatedMinutes: number;
  /** 3-6 "After this lesson you can..." statements. */
  objectives: string[];
  /** The specific concepts / vocabulary the learner must understand. */
  concepts: string[];
  /**
   * Markdown + LaTeX ($..$ inline, $$..$$ display). A real explanation of the
   * material: what it is, why it matters, the key ideas and pitfalls, and how
   * the resources below should be worked through. 150-400 words.
   */
  explanation: string;
  resources: ResourceInput[];
  exercises: ExerciseInput[];
  selfAssessment: SelfCheckInput[];
  /**
   * Full lesson IDs elsewhere in the curriculum that cover a shared concept
   * canonically (e.g. "math-methods/linear-algebra/eigenvalues"). Rendered as
   * "See also / canonical lesson" links. Validated at build time.
   */
  relatedLessons?: string[];
  /** Lesson IDs within or outside the subject that should be done first. */
  prerequisiteLessons?: string[];
  /** 'outline' marks a lesson whose body is still a stub. Defaults to 'complete'. */
  status?: LessonStatus;
}

export interface Lesson
  extends Omit<LessonInput, 'resources' | 'exercises' | 'selfAssessment' | 'status'> {
  id: string;
  subjectId: string;
  moduleId: string;
  /** 0-based position in the subject's flattened lesson list. */
  index: number;
  resources: Resource[];
  exercises: Exercise[];
  selfAssessment: SelfCheck[];
  status: LessonStatus;
}

export interface ModuleInput {
  slug: string;
  title: string;
  /** Markdown, 1-3 sentences. */
  description: string;
  lessons: LessonInput[];
  /** Optional hands-on module project. */
  project?: ProjectInput;
}

export interface Module extends Omit<ModuleInput, 'lessons' | 'project'> {
  id: string;
  subjectId: string;
  lessons: Lesson[];
  project?: Project;
}

export interface SubjectInput {
  /** kebab-case, stable forever. */
  id: string;
  title: string;
  category: CategoryId;
  /** One sentence, shown on cards. */
  tagline: string;
  /** Markdown, 2-4 paragraphs: what the subject is, why it matters, how this curriculum approaches it. */
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  /** Subject IDs that should be completed (or mostly completed) first. */
  prerequisites: string[];
  /** Free-text background that is helpful but not a hard prerequisite. */
  recommendedBackground?: string[];
  tags: string[];
  /** true for the 25 core tracks, false for additional recommended subjects. */
  core: boolean;
  modules: ModuleInput[];
  capstone: ProjectInput;
  /** "I can ..." statements that define mastery of the whole subject. */
  masteryChecklist: string[];
}

export interface Subject extends Omit<SubjectInput, 'modules' | 'capstone'> {
  modules: Module[];
  capstone: Project;
  /** Flattened lessons in curriculum order. */
  lessons: Lesson[];
  lessonCount: number;
  completeLessonCount: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  /** Subject IDs in suggested order. Subjects may appear in several paths. */
  subjectIds: string[];
  outcome: string;
}

export interface Category {
  id: CategoryId;
  title: string;
  description: string;
  /** Tailwind color token family, e.g. 'indigo'. */
  accent: string;
}
