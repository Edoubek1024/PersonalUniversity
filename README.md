# Teach Me — a personal university for CS, Physics and Astronomy

A self-directed learning system: a course catalog, a learning-management dashboard and a personal
knowledge base in one local web app. Thirty-one subjects (25 core tracks plus 6 additional
subjects, 836 lessons, about 2,670 study hours), each with a full curriculum of modules, lessons, learning objectives, curated free
resources, exercises, projects, a capstone and a mastery checklist. Progress, notes and bookmarks
are stored in your browser; nothing leaves your machine.

## Running it

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev        # development server with hot reload, usually http://localhost:5173
```

Production build and local preview:

```bash
npm run build      # type-checks, then builds to dist/
npm run preview    # serves dist/ on http://localhost:4173
```

Live site: https://edoubek1024.github.io/PersonalUniversity/

Every push to `main` rebuilds and publishes the site to GitHub Pages through
`.github/workflows/deploy.yml` (which also runs `npm run validate`). The production build uses the
base path `/PersonalUniversity/` (set in `vite.config.ts`); change it there if the repository is
renamed. Routing uses URL hashes (`/#/subjects/...`), so reloading any page works on static hosts
without a server-side fallback.

Progress is stored per site, so the local dev server and the published site keep separate
progress. Use Settings > Export / Import to move it between them.

## Using it

- **Dashboard**: overall progress, the three categories, recommended next lessons (continue active
  subjects, then subjects whose prerequisites you have met), recently completed lessons.
- **Subjects**: filter by category, difficulty and status; sort; or switch to the prerequisite map,
  which arranges subjects in tiers so you can see what unlocks what.
- **Subject page**: description, prerequisites with your completion in each, the full module and
  lesson list, module projects, the capstone with deliverable checkboxes, and the mastery checklist.
- **Lesson page**: objectives, concepts, a real explanation, resources (free/paid marked), exercises
  with checkboxes and hints, a self-assessment with reveal-and-rate, your notes (Markdown + LaTeX),
  previous/next navigation and links to canonical lessons in other subjects.
- **Learning paths**: seven suggested orders through the catalog. Progress is per subject, so a
  subject that appears in several paths is only ever completed once.
- **Bookmarks** and **Notes** pages collect what you saved.
- **Settings**: theme, export/import of all progress as JSON (merge or replace), and reset.

Keyboard: `Ctrl/⌘ K` or `/` opens search. Everything is reachable with Tab and has a visible
focus ring. The layout works down to phone width.

## Project layout

```
src/
  data/
    types.ts            data model (Subject > Module > Lesson > Resource/Exercise/SelfCheck)
    define.ts           defineSubject(): derives stable IDs from slugs, validates structure
    categories.ts       the three categories
    paths.ts            learning paths (ordered subject-id lists)
    subjects/*.ts       one file per subject; discovered automatically by subjects/index.ts
  store/                progress (localStorage) and theme providers
  lib/                  markdown rendering, search index, recommendations, formatting
  components/, pages/   UI
scripts/
  validate.ts           structural + cross-reference validation of every subject
  check-links.ts        HTTP-checks every resource URL
docs/
  AUTHORING.md          how to write or extend a subject
  CURRICULUM-PLAN.md    the fixed subject list, prerequisite graph and module outlines
```

## Extending the curriculum

Add a file in `src/data/subjects/` that default-exports `defineSubject({...})` and it appears
everywhere automatically. IDs are derived from slugs (`subject/module/lesson`), so adding lessons
never disturbs existing progress; renaming a slug would. Read `docs/AUTHORING.md` first, then run:

```bash
npm run validate        # structure, lesson counts, cross-references, outline stubs
npm run check-links     # every resource URL (403/429 are reported as unverified, not broken;
                        # "error" can mean your network blocked the site, so recheck in a browser)
```

Lessons whose body is a stub carry `status: 'outline'` and are labelled as such in the UI; the
validator prints the count per subject.

## Content sources

Resources favour MIT OpenCourseWare, Stanford, CMU and University of Illinois course materials,
OpenStax, Nand2Tetris, OSTEP, fast.ai, NASA and ESA, and reputable open textbooks and official
documentation. Paid resources are marked and paired with free alternatives. No copyrighted text is
reproduced; lessons explain the material in their own words and point to the source.

## Tech

React 19, TypeScript, Tailwind CSS v4, Vite 6, react-router, react-markdown with KaTeX. No backend,
no accounts.
