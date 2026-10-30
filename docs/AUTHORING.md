# Curriculum authoring guide

Every subject lives in one file: `src/data/subjects/<subject-id>.ts`. It exports a single
`Subject` built with `defineSubject(...)` from `../define`. The types in `src/data/types.ts`
are the contract. `npm run validate` checks every subject for structural problems and
cross-reference errors; `npm run check-links` tests every resource URL.

## File skeleton

```ts
import { defineSubject } from '../define';

export default defineSubject({
  id: 'operating-systems',
  title: 'Operating Systems',
  category: 'cs',                       // 'cs' | 'physics' | 'astronomy'
  tagline: 'One sentence shown on the subject card.',
  description: `Markdown, 2-4 paragraphs.`,
  difficulty: 'advanced',               // beginner | intermediate | advanced | expert
  estimatedHours: 100,
  prerequisites: ['computer-architecture', 'systems-programming'],   // subject ids
  recommendedBackground: ['Comfort reading C'],
  tags: ['systems', 'concurrency'],
  core: true,                           // true for the 25 core tracks
  modules: [ /* ModuleInput[] */ ],
  capstone: { slug, title, description, deliverables, estimatedHours, stretchGoals? },
  masteryChecklist: ['I can ...', ...],
});
```

## Rules

1. **IDs are derived from slugs.** Write kebab-case `slug`s for modules, lessons and
   exercises. Never reuse a slug within the same parent. Never rename one later.
2. **Every lesson is a real lesson.** Required: `summary`, `estimatedMinutes`,
   3-6 `objectives`, 4-10 `concepts`, an `explanation` of 150-400 words of Markdown that
   actually teaches the idea (key intuition, the maths where relevant, common pitfalls, and
   how to work through the resources), 2-5 `resources`, 2-5 `exercises`, 3-5
   `selfAssessment` items with an `answerOutline`. A lesson that is only a title and a link
   is a bug.
3. **Resources must be real.** Only use URLs you are confident exist. Prefer stable
   landing pages (course home pages, book pages, chapter PDFs on official sites, GitHub
   repos, NASA/ESA pages) over deep links that rot. Priority sources: MIT OpenCourseWare,
   Stanford, CMU, University of Illinois, OpenStax, Nand2Tetris, OSTEP, fast.ai, NASA, ESA,
   open textbooks (e.g. Feynman Lectures online, LibreTexts, Think Python, SICP, CS:APP
   labs), official documentation. Mark `cost` honestly; when a paid resource is best, add a
   free alternative. Never paste copyrighted chapter text into `explanation`.
4. **Maths uses LaTeX** inside Markdown: `$E = mc^2$` inline, `$$ ... $$` display. Inside
   a TypeScript template literal, write `\\` for a LaTeX backslash (e.g. `$\\nabla \\cdot
   \\mathbf{E}$`). Avoid backticks inside template literals (use `\``) and avoid `${`.
5. **Exercises are concrete.** State inputs, expected outputs, what to measure or derive.
   CS exercises: write, debug, test and measure code. Physics: derive, solve, simulate.
   Astronomy: explain physically, compute, work with real data (SDSS, Gaia, NASA
   Exoplanet Archive, HEASARC, MAST, Planck, etc.).
6. **Shared concepts link to a canonical lesson.** If a subject needs e.g. eigenvalues,
   Fourier series or probability distributions, keep the lesson short and point to the
   canonical lesson via `relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors']`
   while explaining the subject-specific application. Canonical homes:
   - calculus, linear algebra, ODE/PDE, vector calculus, Fourier -> `math-methods`
   - probability, distributions, estimation, hypothesis testing, Bayes, MCMC -> `probability-statistics`
   - Big-O, recursion, graphs, dynamic programming -> `data-structures-algorithms`
   - logic, proofs, sets, counting -> `discrete-mathematics`
   - numerical integration, ODE solvers, Monte Carlo, FFT in practice -> `computational-physics`
   - C, pointers, memory, build tools -> `systems-programming`
   - processes, threads, locks, file systems -> `operating-systems`
   - sockets, TCP/IP, HTTP -> `computer-networks`
   - Maxwell's equations, waves in media -> `electromagnetism`
   - blackbody radiation, spectra, Boltzmann/Saha -> `stellar-astrophysics` (astronomy) / `thermodynamics-statistical-mechanics` (physics)
   Unknown IDs fail validation; if unsure of an exact ID, use the subject id prefix and the
   validator will report it so it can be fixed.
7. **Mark incomplete work.** If a lesson body is not fully written, set `status: 'outline'`.
   The UI shows this honestly. Do not fake completeness.
8. **Progression.** Modules go from prerequisites to advanced material. 4-8 modules per
   subject, 3-8 lessons per module. Every module may have an optional `project`; every
   subject has a `capstone`.

## Style

- Explanations speak to the learner directly ("you"), are precise, and give the *why*.
- Prefer the primary source's own wording for terms (e.g. OSTEP's "limited direct execution").
- Keep each `concepts` entry short: a term or a term with a 3-8 word gloss.
- `answerOutline` is a compact rubric, not an essay.
