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
  category: 'cs',                       // 'cs' | 'data-science' | 'math' | 'statistics' | 'economics' | 'physics' | 'chemistry' | 'astronomy' | 'misc'
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
   CS exercises: write, debug, test and measure code. Data science: analyse real data, check
   the result and say what it does and does not show. Physics: derive, solve, simulate.
   Astronomy: explain physically, compute, work with real data (SDSS, Gaia, NASA
   Exoplanet Archive, HEASARC, MAST, Planck, etc.).
6. **Shared concepts link to a canonical lesson.** If a subject needs e.g. eigenvalues,
   Fourier series or probability distributions, keep the lesson short and point to the
   canonical lesson via `relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors']`
   while explaining the subject-specific application. Canonical homes:
   - calculus, linear algebra, ODE/PDE, vector calculus, Fourier -> `math-methods`, for physics
     subjects. The `math` category teaches these properly from the start, so a first course in
     that category does not lean on `math-methods`.
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

## Quizzes

A lesson may end with multiple-choice questions, checked on the page. The learner's choice is
saved with their progress, and the explanation appears once they answer.

```ts
quiz: [
  {
    question: 'A founder owns 4,000,000 of 10,000,000 shares. After a round that issues 2,500,000 new shares, what does she own?',
    options: ['40%', '32%', '30%', '25%'],
    answer: 1, // 0-based: '32%'
    explanation: '4,000,000 / 12,500,000 = 32%. Her share count is unchanged; the total grew by 25%.',
  },
],
```

- 3-5 options, exactly one correct, all plausible: each wrong option should be a real mistake
  a learner might make, not filler. Vary which position holds the correct answer; the validator
  warns when more than half of a subject's answers share one position.
- Test understanding, not recall of a phrase from the explanation. A good question applies the
  idea to a small new case or separates two ideas that are easy to confuse.
- `explanation` says why the answer is right and why the most tempting wrong option is wrong.
- Questions and explanations are Markdown with maths, options are inline Markdown. As
  everywhere, a bare `$` starts maths, so write amounts as `USD 20` or `20 dollars`.

## Interactive widgets

A lesson explanation, exercise prompt or hint can embed an interactive widget with a fenced
block. Explanations are template literals, so the backticks are escaped in the source:

```ts
explanation: `...the paragraph that introduces the idea.

\`\`\`interactive
riemann-sum
{"f": "x^2", "a": 0, "b": 2, "n": 8, "caption": "Raise n and watch the error shrink like 1/n."}
\`\`\`

The next paragraph...`,
```

- Line 1 names the widget: the file `src/widgets/w/<name>.tsx`. Each widget's header comment
  lists its parameters, types and defaults; that comment is the reference.
- Then a JSON object of parameters. Optionally, a line containing only `---` followed by free
  text (the starter code of a `python` cell, for example). Inside a template literal, double
  every backslash and never write `${`.
- Place the block right after the paragraph it illustrates, and give it a `caption` that says
  what to try and what to notice, in the lesson's own notation.
- Functions are written in the expression syntax of `src/widgets/kit/expr.ts`: `+ - * / ^`,
  implicit multiplication after numbers and brackets (`2x`, `3sin(x)`), `pi`, `e`, `sqrt`,
  `ln`/`log` (natural), `exp`, trig and hyperbolic functions, `abs` or `|x|`. Write `x*y`, not
  `xy`.
- `npm run validate` fails on an unknown widget name or invalid JSON, and the word count of an
  explanation ignores interactive blocks. A widget that receives a bad parameter shows a red
  error box in place of the widget.

Each widget is its own chunk, loaded only when a lesson that uses it is opened. New widgets go
in `src/widgets/w/`, built from the shared kit in `src/widgets/kit/` (plotting, controls,
parameter readers, the expression compiler). They use no npm dependencies beyond React, and
the colours come from the `--plot-*` and site CSS variables so both themes work.

## Coursework: machine problems and final projects

Every CS and data science subject has one coursework file, `src/data/coursework/<subject-id>.ts`, which
default-exports `defineCoursework({...})`. It is discovered automatically. The types in
`src/data/types.ts` (`MachineProblemInput`, `FinalProjectInput`, `VsCodeSetup`) are the contract.
`src/data/coursework/systems-programming.ts` is the reference for length, tone and specificity.
Match it.

Coursework is optional for `statistics`, `economics`, `chemistry` and `misc` subjects, and validated the same way when present. A final
project replaces the subject's `capstone` in the UI. Do not edit the capstone in the
subject file.

### Machine problems (MPs)

1. **Exactly two per course, evenly spaced.** MP 1 follows module `round(n/3)` and MP 2 follows
   module `round(2n/3)`, where `n` is the module count. The final project closes the course.
   `npm run validate` enforces the spacing.
2. **Match the learner's progress.** An MP may use only what is taught at or before its
   `afterModule`. `coversModules` lists the modules it practises. Check each requirement against
   the lesson list: if it needs a concept from a later module, change the requirement. MP 2 is
   harder than MP 1 and should draw on modules after MP 1. Typical size is 8-20 hours.
3. **A spec, not a blurb.** Someone should be able to build it from the page alone. State the
   constraints, the required behaviour, file formats and numeric targets. Avoid "implement X
   well". Give 6-10 requirements, each one a thing that is checkably true or false.
4. **Testable.** `acceptanceTests` gives 4-6 specific inputs with their expected results, which
   the learner writes as automated tests. Numbers must be correct. Work them out.
5. **Build on what exists.** If the module's existing project is the natural MP, expand it and
   set `supersedesProject: true`, which hides the short version. Otherwise write something new
   that does not repeat a module project.

### Final projects

1. **Covers the whole course.** `coverage` has one entry for every module, saying what in the
   project proves that module. Validation fails if a module is missing.
2. **Worth putting on GitHub.** It must be an original, runnable piece of software or analysis
   that someone can clone and try. It needs a clear hook, a design with real decisions, and
   results it can show. Do not make it a clone of a tutorial, or a published solution to another
   university's assignment. `portfolio` gives 4-6 steps such as a README with a demo, CI with a
   badge, a license, a tagged release and a results or design write-up.
3. **Bigger than either MP.** Typical size is 25-60 hours. It may reuse code from the MPs. Give
   8-10 requirements and 5-6 acceptance tests.

### Building in VS Code

- Everything must be buildable on Windows 10 with VS Code. Linux-only tools go through WSL 2 and
  the `ms-vscode-remote.remote-wsl` extension, and the `toolchain` entry says so.
- `setup.extensions` may only use IDs on the allowlist in `scripts/validate.ts`.
- `setup.commands` are real commands for the integrated terminal, with at least one to build or
  run and one to test.
- No paid services and no required hardware. Embedded work uses a simulator such as Wokwi or
  QEMU, with physical boards as an optional stretch goal. Anything needing a GPU must also work
  on a CPU or on a free Colab or Kaggle notebook opened from VS Code.
- Security work runs only against targets the learner owns, such as local Docker containers.

Run `npm run validate -- <subject-id>` after writing a file. Only add `resources` you are
confident exist, and keep them to three or fewer.
