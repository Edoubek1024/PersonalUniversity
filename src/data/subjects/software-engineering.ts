import { defineSubject } from '../define';

export default defineSubject({
  id: 'software-engineering',
  title: 'Software Engineering and Testing',
  category: 'cs',
  tagline:
    'Version control, design, testing, automation and operations: how code written by one person becomes software a team can trust.',
  description: `Programming is making a computer do something once. Software engineering is making it keep doing the right thing as requirements change, as other people edit the code, as dependencies move under you and as the system runs for years. The difference is not cleverness but discipline: specifications you can test against, tests that catch regressions before users do, version history you can reason about, builds that are reproducible, and operations you can observe.

This subject is organised around the practices of MIT's 6.031 *Software Construction* (safe from bugs, easy to understand, ready for change), Google's published engineering practices and the free *Software Engineering at Google*, the Pro Git book, and the pytest and Hypothesis documentation. Each lesson has you apply the practice to a real repository you keep evolving across the subject, so that by the end the Git history, the test suite, the CI pipeline and the documentation are artefacts you built, not concepts you read about.

Everything here is language-agnostic in principle and Python-first in the examples, because Python's tooling (pytest, Hypothesis, mypy, ruff, cProfile) is free and immediate. You will leave able to take a vague request, turn it into a specification, implement it with tests, review it, ship it through CI with a versioned release, and measure it in production.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['programming-fundamentals', 'data-structures-algorithms'],
  recommendedBackground: [
    'Comfortable writing Python modules, classes and functions',
    'Basic command-line use',
    'Have written at least one program over 500 lines that you later had to change',
  ],
  tags: ['git', 'testing', 'design', 'refactoring', 'CI/CD', 'architecture', 'reliability', 'Python'],
  core: true,
  modules: [
    {
      slug: 'version-control-and-collaboration',
      title: 'Version Control and Collaboration',
      description:
        'Git as a content-addressed graph, the branching and merging workflows teams actually use, code review as an engineering practice, and recovering from mistakes.',
      lessons: [
        {
          slug: 'git-model-and-basics',
          title: 'The Git model: snapshots, the index and the commit graph',
          summary:
            'Git is a directed acyclic graph of snapshots, not a list of diffs. Once you see that, every command makes sense.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the three areas (working tree, index, repository) and what each command moves between them',
            'Explain commits as snapshots identified by content hashes with parent pointers',
            'Write good commit messages and craft small, atomic commits with git add -p',
            'Inspect history with git log, git diff and git show at the level of files and lines',
          ],
          concepts: [
            'Working tree, staging area (index), repository',
            'Commit = snapshot + metadata + parent pointers',
            'SHA-1/SHA-256 content addressing',
            'HEAD and branches as pointers',
            'Atomic commits and commit message conventions',
            'git add -p, git diff --staged, git log --graph',
            '.gitignore and what not to commit',
          ],
          explanation: `Most Git confusion comes from imagining it as a list of diffs. It is not. A **commit** is a complete snapshot of the project tree, stored as a hash of its contents, plus the author, a message, and pointers to its parent commit(s). History is therefore a **directed acyclic graph** of snapshots; a **branch** is nothing more than a movable pointer to one commit, and **HEAD** is a pointer to the branch you are on. \`git log\` walks parents backwards; \`git diff\` computes differences between two snapshots on demand. Nothing is ever a diff at rest.

Every command moves content between three places: the **working tree** (your files), the **index** or staging area (the snapshot you are assembling), and the **repository** (committed snapshots). \`git add\` copies working-tree content into the index; \`git commit\` turns the index into a commit; \`git restore\` and \`git checkout\` copy from a commit or the index back to the working tree. The index exists so you can commit *part* of your changes: \`git add -p\` stages hunk by hunk, which is how you turn an afternoon of hacking into three **atomic commits**, each a single logical change that builds and passes tests on its own. Atomic commits make history readable, \`git bisect\` useful and reverts safe.

A commit message has a subject line of at most about 50 characters in the imperative ("Add retry to HTTP client"), a blank line, then a body explaining *why*, not *what*; the diff already says what. Conventional Commits adds a type prefix (\`fix:\`, \`feat:\`) that tooling can use to generate changelogs and version bumps.

Never commit secrets, build outputs or dependencies; \`.gitignore\` them from the first commit, because removing a secret from history later is painful and the secret is already compromised.

Read Pro Git chapters 1-2 and the 6.031 version-control reading, then do the exercises on a fresh repository that you will keep for the whole subject.`,
          resources: [
            {
              title: 'Pro Git, 2nd edition — Chapter 2: Git Basics',
              url: 'https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
              note: 'Recording changes, viewing history, undoing things. The whole book is free online.',
              primary: true,
            },
            {
              title: 'MIT 6.031 Software Construction — Reading 5: Version Control',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/05-version-control/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'The object graph explained with diagrams; the best short introduction to the model.',
            },
            {
              title: 'Conventional Commits specification',
              url: 'https://www.conventionalcommits.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'conventionalcommits.org',
            },
            {
              title: 'Pro Git — Chapter 10: Git Internals (Git Objects)',
              url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
              note: 'Skim now for the blob/tree/commit picture; return in the recovery lesson.',
            },
          ],
          exercises: [
            {
              slug: 'course-repository',
              title: 'Start the course repository',
              prompt:
                'Create a repository for a small command-line tool you will evolve all subject long (suggested: a personal finance ledger that reads CSV transactions and reports totals). Make the first five commits atomic: project skeleton, README, .gitignore, a parser module with a test, a CLI entry point. Each commit must build and pass tests. Use git add -p at least once to split a change. Show the output of git log --oneline --graph.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'object-graph-by-hand',
              title: 'Walk the object graph by hand',
              prompt:
                'In your repository use git cat-file -p on HEAD, then on its tree, then on a blob, then on the parent commit. Draw the graph of objects for the last three commits (commits, trees, blobs) with their hashes. Change one character in one file, commit, and show which objects are new and which are shared with the previous commit. Explain why Git is still space-efficient despite storing snapshots.',
              kind: 'reading',
              difficulty: 2,
              hint: 'Trees and blobs are shared whenever their content is unchanged; only the modified blob, the trees on its path, and the new commit are new objects.',
            },
            {
              slug: 'rewrite-bad-messages',
              title: 'Commit message review',
              prompt:
                'Take ten commit messages from any open-source project (git log on a clone) and classify each as good or poor against the subject-line and body conventions. Rewrite the five worst. Then write a commit message template (.gitmessage) and configure git to use it.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly is a branch in Git?',
              answerOutline:
                'A file containing the hash of one commit; a movable pointer. Creating a branch is writing 41 bytes; the commit graph is unchanged.',
            },
            {
              question: 'Why does the staging area exist?',
              answerOutline:
                'To assemble a commit that differs from the working tree: commit some hunks and not others, enabling small atomic commits from a larger set of edits.',
            },
            {
              question: 'What makes a commit atomic and why does it matter?',
              answerOutline:
                'It contains exactly one logical change and leaves the project building and passing tests; this makes history readable, bisect precise and reverts safe.',
            },
          ],
        },
        {
          slug: 'branching-merging-and-rebasing',
          title: 'Branching, merging and rebasing',
          summary:
            'Feature branches, three-way merges, conflict resolution, rebase versus merge, and interactive rebase for cleaning up history before sharing it.',
          estimatedMinutes: 100,
          objectives: [
            'Create, switch, merge and delete branches and read the resulting graph',
            'Explain the three-way merge and resolve conflicts deliberately',
            'Rebase a branch and state precisely when rebasing is safe (never rewrite shared history)',
            'Use interactive rebase to squash, reorder and reword commits before review',
          ],
          concepts: [
            'Fast-forward vs three-way merge',
            'Merge base and conflict markers',
            'Rebase: replaying commits onto a new base',
            'Golden rule: do not rebase published commits',
            'Interactive rebase: squash, fixup, reword, reorder',
            'Cherry-pick',
            'Merge strategies and rerere',
          ],
          explanation: `Branches are cheap, so teams use them for everything: each feature or fix lives on its own branch until it is ready. The question is how it gets back. If the main branch has not moved, a **fast-forward** just moves the pointer. If both have new commits, Git performs a **three-way merge**: it finds the **merge base** (the nearest common ancestor), compares each side to it, and combines the changes. Where both sides changed the same lines it stops and writes **conflict markers** into the file. Resolving a conflict means reading both intentions and writing the version that satisfies both, then running the tests; the markers themselves tell you nothing about which side is right.

**Rebase** does something different: it takes the commits on your branch and replays them one by one onto a new base, producing *new* commits with the same changes. The result is a linear history that reads as if you had started your work from the latest main, which is easier to review and bisect. The cost is that the old commits are gone, so anyone who had them is now out of sync. Hence the one rule that matters: **never rebase commits that others may have**. Rebase your private branch freely; never rebase main.

**Interactive rebase** (\`git rebase -i\`) is the tool for tidying your branch before opening a pull request: squash "fix typo" into the commit it fixes, reword messages, reorder so the refactoring comes before the feature. Make a habit of reviewing your own diff, commit by commit, before asking anyone else to.

**Cherry-pick** copies a single commit elsewhere (a hotfix onto a release branch). \`git rerere\` records how you resolved a conflict and replays it if the same conflict recurs, which happens often with long-lived branches.

Read Pro Git chapter 3 carefully, then do the conflict and rebase exercises on your course repository; deliberately creating and resolving conflicts in a safe setting removes the fear of them.`,
          resources: [
            {
              title: 'Pro Git — Chapter 3: Git Branching',
              url: 'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
              note: 'All of chapter 3, especially "Basic Branching and Merging" and "Rebasing".',
              primary: true,
            },
            {
              title: 'Pro Git — Chapter 7.6: Rewriting History',
              url: 'https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
              note: 'Interactive rebase, squashing, splitting commits.',
            },
            {
              title: 'Software Engineering at Google — Chapter 16: Version Control and Branch Management',
              url: 'https://abseil.io/resources/swe-book/html/ch16.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
              note: 'Why Google uses trunk-based development and what long-lived branches cost.',
            },
          ],
          exercises: [
            {
              slug: 'conflict-lab',
              title: 'Conflict laboratory',
              prompt:
                'In your course repository create two branches from the same commit. On one, rename a function and update its callers; on the other, add a new call to the old name and change a line inside the function body. Merge one into main, then try to merge the other. Resolve the conflict so that tests pass, and write down the merge base, the two diffs, and your reasoning. Repeat the same scenario using rebase instead of merge and compare the resulting graphs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tidy-before-review',
              title: 'Interactive rebase before review',
              prompt:
                'Implement a feature on a branch with deliberately messy history: eight commits including "wip", "fix", "oops typo", and a refactoring interleaved with feature code. Use git rebase -i to produce three clean commits: refactoring, feature, tests. Show before and after with git log --oneline, and confirm with git diff that the final tree is identical.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rebase-disaster',
              title: 'Reproduce the rebase disaster',
              prompt:
                'With two clones of the same repository simulating two developers, have both pull a shared branch. Developer A rebases it and force-pushes; developer B then tries to pull. Document exactly what B sees, why, and the two ways to recover (reset to the remote, or rebase local work onto the rewritten branch). Then write the team rule you would adopt.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the merge base and why does a three-way merge need it?',
              answerOutline:
                'The nearest common ancestor of the two branches. Comparing each side to it distinguishes "changed on one side" (take it) from "changed on both" (conflict).',
            },
            {
              question: 'What does rebase produce and why is rebasing shared commits harmful?',
              answerOutline:
                'New commits with the same changes on a new base; the originals are abandoned. Anyone holding the originals now has divergent history and must manually reconcile.',
            },
            {
              question: 'When would you merge rather than rebase?',
              answerOutline:
                'When the branch is shared, when you want to preserve the exact context of the work, or when integrating long-lived branches where replaying many commits would create repeated conflicts.',
            },
          ],
        },
        {
          slug: 'collaboration-workflows-and-code-review',
          title: 'Collaboration workflows and code review',
          summary:
            'Pull requests, trunk-based development, what a reviewer should look for, how to write a change that is easy to review, and how to receive review.',
          estimatedMinutes: 100,
          objectives: [
            'Compare GitHub flow, git-flow and trunk-based development and choose one for a given team',
            'Open a pull request with a description that lets a reviewer verify the change',
            'Review code against a checklist: design, functionality, complexity, tests, naming, comments, style, documentation',
            'Keep changes small and explain why small changes are reviewed faster and better',
          ],
          concepts: [
            'Pull request / change list',
            'Trunk-based development and feature flags',
            'Small CLs',
            'Reviewer checklist (Google eng-practices)',
            'Non-blocking vs blocking comments',
            'Review latency and throughput',
            'CODEOWNERS and required reviews',
          ],
          explanation: `**Code review** is the single practice most correlated with code quality in industry, and it works because a second person reads the change with fresh eyes before it becomes everyone's problem. It also spreads knowledge: after review, two people understand the code.

The workflow that carries it is the **pull request** (GitHub) or change list (Google): a branch, a description, a diff, a conversation, a merge. Teams differ in how long branches live. **Git-flow** keeps develop, release and hotfix branches and suits packaged software with versions in the field. **GitHub flow** is simpler: branch from main, PR, merge, deploy. **Trunk-based development** goes further: everyone commits to main at least daily, incomplete features are hidden behind **feature flags**, and integration pain is paid continuously in small amounts rather than in a merge from hell once a month. Google and most high-velocity teams use it; it depends on good tests and CI, which is why those modules follow.

Writing a reviewable change is a skill. Google's guidance is blunt: **small CLs**. A 100-line change gets careful review in minutes; a 1000-line change gets "LGTM" after a skim. Split refactoring from behaviour change, split mechanical renames from logic. The description should say what and why, link the issue, and tell the reviewer how to verify (which tests, which command).

Reviewing has a checklist: does the **design** fit the codebase, does the code do what the description says, is it more **complex** than needed, are the **tests** meaningful (would they fail if the code were wrong?), are names clear, do comments explain why, does documentation need updating. Comment on the code, not the person; mark nits as non-blocking; approve when the change improves overall code health even if it is not perfect. As an author, respond to every comment, do not take it personally, and push fix-up commits rather than rewriting history mid-review.

Read Google's reviewer and author guides and the 6.031 code review reading, then run two full review cycles with a partner or by reviewing your own PR a day later.`,
          resources: [
            {
              title: "Google Engineering Practices — Code Review Developer Guide",
              url: 'https://google.github.io/eng-practices/',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'Both halves: "How to do a code review" and "The CL author\'s guide".',
              primary: true,
            },
            {
              title: 'Google Engineering Practices — Small CLs',
              url: 'https://google.github.io/eng-practices/review/developer/small-cls.html',
              type: 'article',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'MIT 6.031 — Reading 4: Code Review',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/04-code-review/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'Concrete code smells to look for with examples.',
            },
            {
              title: 'GitHub Docs — GitHub flow',
              url: 'https://docs.github.com/en/get-started/using-github/github-flow',
              type: 'documentation',
              cost: 'free',
              provider: 'GitHub',
            },
            {
              title: 'Software Engineering at Google — Chapter 9: Code Review',
              url: 'https://abseil.io/resources/swe-book/html/ch09.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
            },
          ],
          exercises: [
            {
              slug: 'reviewable-pr',
              title: 'A reviewable pull request',
              prompt:
                'Push your course repository to a remote and open a pull request for a new feature (e.g. monthly category totals). The description must include: summary, motivation, how to test, and screenshots or sample output. Keep the diff under 200 lines; if it grows, split it into stacked PRs (refactor first, feature second). Request review from a peer or, if solo, review it yourself the next day using the Google checklist and leave at least five comments.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'review-an-open-source-pr',
              title: 'Review three real pull requests',
              prompt:
                'Pick three merged pull requests from an open-source Python project. For each, write the review you would have given using the checklist (design, functionality, complexity, tests, naming, comments, style, docs), then compare with the actual review comments. What did the real reviewers catch that you missed, and vice versa?',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'choose-a-workflow',
              title: 'Choose and justify a branching workflow',
              prompt:
                'For three scenarios (a two-person startup deploying a web app daily; a team of 30 shipping a desktop app with quarterly releases and long-term support; an open-source library with hundreds of external contributors), choose git-flow, GitHub flow or trunk-based development and justify in a paragraph each, naming the main risk of your choice and how you mitigate it.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do small changes get better reviews?',
              answerOutline:
                'Reviewers can hold the whole change in their head, find real bugs rather than skimming, respond faster, and conflicts and rollbacks are smaller; large changes get rubber-stamped.',
            },
            {
              question: 'What makes trunk-based development possible without breaking main constantly?',
              answerOutline:
                'Fast reliable CI on every commit, small changes, feature flags to hide incomplete work, and a culture of fixing or reverting breakages immediately.',
            },
            {
              question: 'What is the standard for approving a change, according to Google\'s guide?',
              answerOutline:
                'Approve when the change improves the overall code health of the system, even if it is not perfect; do not block on personal preference or seek perfection.',
            },
          ],
        },
        {
          slug: 'git-internals-and-recovery',
          title: 'Git internals and recovering from mistakes',
          summary:
            'Reflog, reset modes, bisect, stash and blame: the tools that make Git forgiving once you know where the objects are.',
          estimatedMinutes: 80,
          objectives: [
            'Use the reflog to recover commits after a bad reset, rebase or branch deletion',
            'Explain the three reset modes (soft, mixed, hard) in terms of the three areas',
            'Find the commit that introduced a bug with git bisect, automated with a test script',
            'Use stash, blame, log -S and worktrees in daily work',
          ],
          concepts: [
            'Reflog: a log of where HEAD has been',
            'git reset --soft / --mixed / --hard',
            'Detached HEAD',
            'git bisect run',
            'git stash',
            'git blame and git log -S / -L',
            'Garbage collection and unreachable objects',
          ],
          explanation: `Git almost never deletes anything immediately. A "lost" commit is an object that no branch points to, and for at least two weeks (the default before garbage collection prunes unreachable objects) it is still in the repository. The **reflog** records every position HEAD and each branch have occupied, so \`git reflog\` shows the hash of the commit you were on before the rebase or reset that went wrong, and \`git branch rescue <hash>\` brings it back. Learn this once and Git stops being frightening.

The **reset** command is understood through the three areas. \`--soft\` moves the branch pointer only, leaving the index and working tree as they were (useful to recombine commits). \`--mixed\`, the default, also resets the index to the target commit but leaves your files alone (unstage everything). \`--hard\` resets all three, discarding uncommitted work, which is the one case the reflog cannot save because uncommitted changes were never objects. The companion \`git restore\` works on files rather than the branch.

**Bisect** is binary search over history: mark a known good and a known bad commit, and Git checks out the midpoint for you to test; after $\\log_2 n$ steps it names the culprit. With \`git bisect run <script>\` the whole search is automatic, which is why atomic commits that always pass tests are worth the effort: bisect on a history full of broken intermediate states is useless.

Daily tools: \`git stash\` shelves uncommitted work to switch context; \`git blame\` shows who last touched each line and why (follow it with \`git show\` on the commit); \`git log -S "string"\` finds commits that added or removed a string (the "pickaxe"); \`git worktree add\` checks out a second branch in another directory without stashing.

Read Pro Git chapter 7 (stashing, reset demystified, searching, debugging) and chapter 10, then break your course repository on purpose in the exercises and recover it.`,
          resources: [
            {
              title: 'Pro Git — Chapter 7.7: Reset Demystified',
              url: 'https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
              primary: true,
            },
            {
              title: 'Pro Git — Chapter 7.10: Debugging with Git (blame, bisect)',
              url: 'https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
            },
            {
              title: 'Pro Git — Chapter 10: Git Internals',
              url: 'https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain',
              type: 'textbook',
              cost: 'free',
              provider: 'git-scm.com',
              note: 'Objects, references, packfiles, refspecs and maintenance/data recovery.',
            },
          ],
          exercises: [
            {
              slug: 'recovery-drills',
              title: 'Recovery drills',
              prompt:
                'In a throwaway clone of your course repository perform and then recover from: (a) git reset --hard HEAD~3 after committing; (b) deleting a branch with unmerged commits; (c) an interactive rebase that dropped a commit; (d) a commit made in detached HEAD state and then checking out main. For each, write the exact commands used to recover and explain which objects were never actually lost. Then show one situation the reflog cannot rescue.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'automated-bisect',
              title: 'Automated bisect',
              prompt:
                'Create a history of 40 small commits in which one commit silently breaks a function (change a comparison operator). Write a test script that exits 0 when the function is correct and 1 otherwise, and run git bisect run with it. Report how many steps it took and compare with log2(40). Then repeat on a history where three intermediate commits do not even import, and show how bisect skip handles them.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'archaeology',
              title: 'Code archaeology',
              prompt:
                'Clone a mid-sized open-source project. Pick a surprising line of code and use git blame, git log -L on that range, and git log -S on an identifier to reconstruct why it is there. Write a 200-word history of the line, citing commit hashes and linking issues referenced in the commit messages.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'After a bad git rebase, how do you get the original commits back?',
              answerOutline:
                'git reflog shows the pre-rebase HEAD (or branch@{1}); git reset --hard to that hash or create a branch pointing at it. The objects were never deleted.',
            },
            {
              question: 'What is the difference between reset --mixed and reset --hard?',
              answerOutline:
                'Both move HEAD and reset the index; --hard also overwrites the working tree, discarding uncommitted changes, while --mixed leaves files as they are (unstaged).',
            },
            {
              question: 'Why does git bisect depend on good commit hygiene?',
              answerOutline:
                'It assumes each commit can be built and tested; broken intermediate commits must be skipped, and giant commits make the identified culprit too coarse to be useful.',
            },
          ],
        },
      ],
    },
    {
      slug: 'design-principles-and-patterns',
      title: 'Design Principles and Patterns',
      description:
        'Specifications, abstract data types and representation invariants, modularity and coupling, the design patterns worth knowing, and API and error design.',
      lessons: [
        {
          slug: 'specifications-and-abstract-data-types',
          title: 'Specifications and abstract data types',
          summary:
            'A specification is a contract between implementer and client; abstract data types, representation invariants and abstraction functions make that contract enforceable.',
          estimatedMinutes: 110,
          objectives: [
            'Write a specification with preconditions, postconditions and effects, and judge when one spec is stronger than another',
            'Design an abstract data type by its operations (creators, producers, observers, mutators) rather than its fields',
            'State a representation invariant and abstraction function and write a checkRep that enforces the invariant',
            'Explain representation exposure and how immutability and defensive copying prevent it',
          ],
          concepts: [
            'Precondition, postcondition, effects',
            'Stronger vs weaker specifications',
            'Abstract data type: creators, producers, observers, mutators',
            'Representation independence',
            'Rep invariant and abstraction function',
            'checkRep',
            'Representation exposure and immutability',
          ],
          explanation: `A **specification** says what a function does without saying how. It has a **precondition** (what the caller must guarantee), a **postcondition** (what the function promises if the precondition holds) and **effects** (what it mutates, throws or prints). The spec is a contract that lets the implementer change the algorithm and the client change the call site independently, as long as each respects the contract. MIT's 6.031 phrases the goals as code that is *safe from bugs*, *easy to understand* and *ready for change*; specs serve all three.

Specs can be compared. Spec $S_2$ is **stronger** than $S_1$ if it has a weaker precondition (accepts more inputs) and a stronger postcondition (promises more). A stronger spec can replace a weaker one without breaking clients, which is exactly the substitutability rule behind subtyping. Preconditions that are expensive to check (a sorted input) are legitimate; preconditions that are cheap to check should usually become postconditions that raise an exception, because callers forget.

An **abstract data type** is defined by its operations: **creators** make instances, **producers** make new ones from old (immutable types), **observers** read, **mutators** change. Clients should not know the representation, so you can switch a set from a list to a hash table without telling anyone. Two documents make this rigorous. The **representation invariant** states what must be true of the fields for the object to be valid ("the list has no duplicates"). The **abstraction function** maps a valid representation to the abstract value it denotes. Write a \`checkRep()\` that asserts the invariant and call it at the end of every mutator and creator during testing; it turns many silent corruptions into immediate failures.

**Representation exposure** is the enemy: returning a reference to an internal mutable list lets a client break the invariant from outside. Return copies or immutable views, and prefer immutable types where the cost allows.

Work through 6.031 readings 6, 7, 10 and 11, then rebuild one type in your course repository with spec comments, a rep invariant and checkRep.`,
          resources: [
            {
              title: 'MIT 6.031 — Reading 6: Specifications',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/06-specifications/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              primary: true,
            },
            {
              title: 'MIT 6.031 — Reading 10: Abstract Data Types',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/10-abstract-data-types/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'MIT 6.031 — Reading 11: Abstraction Functions and Rep Invariants',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/11-abstraction-functions-rep-invariants/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'A Philosophy of Software Design (John Ousterhout) — book page',
              url: 'https://web.stanford.edu/~ouster/cgi-bin/book.php',
              type: 'textbook',
              cost: 'paid',
              provider: 'Stanford University',
              note: 'Deep modules and information hiding; optional. The 6.031 readings cover the free essentials.',
            },
          ],
          exercises: [
            {
              slug: 'spec-strength',
              title: 'Compare specification strength',
              prompt:
                'For find(list, x) write five different specifications (e.g. returns any index; returns the first index; requires x present; returns -1 if absent; requires list sorted). Arrange them in a partial order by strength, justify each comparison, and state which clients each would break if swapped. Then write the spec you would actually ship and why.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'ledger-adt',
              title: 'Design the Ledger ADT',
              prompt:
                'In your course repository design a Ledger type as an ADT: list its creators, producers, observers and mutators with full specs. Choose a representation, write the rep invariant and abstraction function as comments, implement checkRep, and call it from every mutator. Write tests that violate the invariant through the public interface and show checkRep catches nothing (because the interface protects it) but a deliberate internal bug is caught.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rep-exposure-hunt',
              title: 'Representation exposure hunt',
              prompt:
                'Write a class that returns its internal list from a getter, demonstrate a client corrupting the invariant, then fix it three ways: defensive copy, returning a tuple, and making the class immutable with a frozen dataclass and producers. Measure the cost of defensive copying for a 10^6-element list called 1000 times and discuss when the immutable design is worth it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When is specification S2 stronger than S1, and why does that matter?',
              answerOutline:
                'Weaker (or equal) precondition and stronger (or equal) postcondition. A stronger spec can replace a weaker one without breaking any client; this is the basis of safe substitution and subtyping.',
            },
            {
              question: 'What is the difference between a rep invariant and an abstraction function?',
              answerOutline:
                'The rep invariant says which concrete states are valid; the abstraction function says what abstract value a valid concrete state represents.',
            },
            {
              question: 'What is representation exposure and name two ways to prevent it.',
              answerOutline:
                'Letting clients obtain references to internal mutable state so they can break the invariant. Prevent by defensive copying, returning immutable views, or using immutable representations.',
            },
          ],
        },
        {
          slug: 'modularity-coupling-and-cohesion',
          title: 'Modularity, coupling, cohesion and the SOLID principles',
          summary:
            'Information hiding as the basis of module design, how to measure coupling and cohesion, and the SOLID principles as heuristics rather than laws.',
          estimatedMinutes: 100,
          objectives: [
            'Explain Parnas\'s information-hiding criterion and apply it to decompose a system',
            'Identify high coupling and low cohesion in code and refactor towards the opposite',
            'State the five SOLID principles and give an example and a counter-example for each',
            'Use dependency inversion and dependency injection to make code testable',
          ],
          concepts: [
            'Information hiding: hide decisions likely to change',
            'Coupling (afferent/efferent) and cohesion',
            'Deep vs shallow modules',
            'Single responsibility, open/closed',
            'Liskov substitution',
            'Interface segregation, dependency inversion',
            'Dependency injection',
          ],
          explanation: `Parnas's 1972 paper asked what criteria to use when dividing a system into modules, and the answer still holds: each module should **hide a design decision that is likely to change**. Not "one module per step of the processing" but "one module per secret": the file format, the storage engine, the UI toolkit. When the decision changes, only that module changes. Ousterhout's modern phrasing is that good modules are **deep**: a small interface in front of a lot of functionality. A class with twenty one-line getters and setters is shallow; it hides nothing and adds a layer to read through.

**Coupling** measures how much modules know about each other; **cohesion** measures how much the parts of one module belong together. Count the imports a module needs (efferent coupling) and how many modules import it (afferent). A module with high afferent coupling must be stable; one with high efferent coupling is fragile. Low cohesion shows as a "utils" module or a class whose methods use disjoint subsets of its fields.

The **SOLID** principles are useful heuristics with silly names. **Single responsibility**: a module should have one reason to change (Parnas again). **Open/closed**: extend behaviour by adding code, not editing working code, usually via polymorphism or plugins. **Liskov substitution**: a subtype must honour the supertype's spec (weaker preconditions, stronger postconditions, the rule from the previous lesson); a Square that is-a Rectangle but rejects independent width and height violates it. **Interface segregation**: clients should not depend on methods they do not use. **Dependency inversion**: high-level policy should depend on abstractions, not on concrete low-level modules; in practice, pass dependencies in (**dependency injection**) rather than constructing them inside, which also makes testing with fakes trivial.

Treat these as tools for diagnosis, not commandments. Over-applying them produces layers of indirection that hide nothing. Read Parnas, 6.031 reading on designing specifications, and Ousterhout's chapters on deep modules if you have the book, then do the decomposition exercise on your course project.`,
          resources: [
            {
              title: 'D. L. Parnas — On the Criteria To Be Used in Decomposing Systems into Modules (1972)',
              url: 'https://dl.acm.org/doi/10.1145/361598.361623',
              type: 'article',
              cost: 'free',
              provider: 'ACM Digital Library',
              note: 'A six-page classic; the KWIC example is worth reproducing. Open access in the ACM DL; copies are widely mirrored.',
              primary: true,
            },
            {
              title: 'MIT 6.031 — Reading 7: Designing Specifications',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/07-designing-specs/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'Refactoring.Guru — SOLID principles and design patterns (free section)',
              url: 'https://refactoring.guru/design-patterns',
              type: 'article',
              cost: 'freemium',
              provider: 'Refactoring.Guru',
              note: 'The pattern catalogue is free online; the ebook is paid and not needed.',
            },
            {
              title: 'Hyrum\'s Law',
              url: 'https://www.hyrumslaw.com/',
              type: 'article',
              cost: 'free',
              provider: 'Hyrum Wright',
              note: 'Why every observable behaviour of an interface becomes a dependency; the limit of information hiding.',
            },
          ],
          exercises: [
            {
              slug: 'kwic-two-ways',
              title: 'KWIC two ways',
              prompt:
                'Implement Parnas\'s KWIC index (circular shifts of lines, sorted) twice: once decomposed by processing steps (input, shift, sort, output sharing a data structure) and once by information hiding (line storage, shifter, sorter each hiding its representation). Then apply two changes to both: store lines compressed, and sort lazily on demand. Count the modules touched by each change in each design.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coupling-metrics',
              title: 'Measure coupling in a real codebase',
              prompt:
                'Write a script that parses the imports of every module in a Python project (use the ast module) and computes afferent and efferent coupling per module and instability I = Ce / (Ca + Ce). Run it on your course project and on one open-source project; identify the three most unstable modules that are also heavily depended upon, and propose a fix for one.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'inject-the-dependencies',
              title: 'Dependency inversion for testability',
              prompt:
                'Take a function in your project that reads a file, calls datetime.now() and prints. Refactor so that the file source, clock and output are injected (as parameters or a small protocol). Write tests that run it with an in-memory source, a fixed clock and a captured output without monkeypatching. Explain what Liskov substitution requires of your fake implementations.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What criterion does Parnas propose for decomposing a system into modules?',
              answerOutline:
                'Each module hides a design decision likely to change (its "secret"); decomposition by secrets, not by steps in a flowchart.',
            },
            {
              question: 'Why does Square inheriting from Rectangle violate Liskov substitution?',
              answerOutline:
                'Rectangle\'s spec allows setting width and height independently; Square cannot honour that postcondition, so code written against Rectangle breaks when given a Square.',
            },
            {
              question: 'How does dependency injection help testing?',
              answerOutline:
                'The code depends on an abstraction supplied from outside, so tests pass fakes or in-memory implementations instead of real files, clocks, networks or databases, without patching globals.',
            },
          ],
        },
        {
          slug: 'design-patterns-in-practice',
          title: 'Design patterns in practice',
          summary:
            'The handful of Gang-of-Four patterns that recur in real code, when each earns its complexity, and how Python idioms replace several of them.',
          estimatedMinutes: 100,
          objectives: [
            'Recognise and implement strategy, observer, adapter, decorator, factory, builder, command and iterator',
            'Explain the problem each pattern solves and the cost it adds',
            'Show how first-class functions, generators and dataclasses replace some patterns in Python',
            'Identify pattern misuse (singletons, premature abstraction) in a codebase',
          ],
          concepts: [
            'Pattern = named solution to a recurring design problem in context',
            'Strategy and the function-as-strategy shortcut',
            'Observer / publish-subscribe',
            'Adapter and facade',
            'Decorator (structural) vs Python decorators',
            'Factory and builder',
            'Command and undo',
            'Singleton and why it is usually a mistake',
          ],
          explanation: `A **design pattern** is a named, reusable solution to a problem that keeps recurring in object-oriented design. The value of learning them is mostly vocabulary: "use a strategy here" communicates a whole structure in two words. The danger is applying them where the problem does not exist; a pattern adds indirection, and indirection is only worth it when it hides a decision that actually varies.

The patterns worth internalising. **Strategy** makes an algorithm swappable by putting it behind an interface; in Python a plain function parameter often suffices (\`sorted(key=...)\` is strategy). **Observer** lets objects subscribe to events without the publisher knowing them; it decouples UI from model and is the shape of every event system, with the classic pitfall of forgotten subscriptions keeping objects alive. **Adapter** wraps an interface you do not control to look like one you want, and **facade** gives a simple front to a complex subsystem; both are how you isolate third-party libraries so they can be replaced. **Decorator** adds behaviour to an object by wrapping it with the same interface (logging, caching, retry), and is distinct from Python's \`@decorator\` syntax, which wraps functions but serves the same spirit. **Factory** centralises construction when the concrete class depends on configuration; **builder** assembles complex objects step by step, which dataclasses with defaults and keyword arguments make rarely necessary in Python. **Command** reifies an action as an object so it can be queued, logged or undone; it is the basis of undo stacks and job queues. **Iterator** is built into Python as generators.

**Singleton** deserves a warning: a global instance makes dependencies invisible and tests order-dependent. Pass the object in instead. The broader lesson is Hyrum's Law applied to design: every structure you expose will be depended upon, so expose patterns deliberately.

Read the Refactoring.Guru catalogue for the patterns above (it has Python examples), and the 6.031 readings on interfaces and subtyping. The Gang of Four book is the original and is paid; you do not need it. Then implement the patterns inside your course project where they genuinely fit, and note where you decided they did not.`,
          resources: [
            {
              title: 'Refactoring.Guru — Design Patterns catalogue',
              url: 'https://refactoring.guru/design-patterns',
              type: 'article',
              cost: 'freemium',
              provider: 'Refactoring.Guru',
              note: 'Free catalogue with intent, structure, pros/cons and code in several languages including Python.',
              primary: true,
            },
            {
              title: 'MIT 6.031 — Reading 12: Interfaces, Generics and Enums',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/12-interfaces-generics-enums/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'Interfaces and subtyping as the mechanism most patterns rely on.',
            },
            {
              title: 'Design Patterns (Gamma, Helm, Johnson, Vlissides) — overview and pattern list',
              url: 'https://en.wikipedia.org/wiki/Design_Patterns',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Summary of the original (paid) Gang of Four book and its 23 patterns. The book itself is optional; the free catalogue above covers the same patterns.',
            },
            {
              title: 'Python documentation: functools (lru_cache, partial, singledispatch)',
              url: 'https://docs.python.org/3/library/functools.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Language features that replace decorator, strategy and visitor-style dispatch in Python.',
            },
          ],
          exercises: [
            {
              slug: 'patterns-in-the-ledger',
              title: 'Patterns where they fit',
              prompt:
                'In your course project implement: strategy for report formatting (table, CSV, JSON) first as classes then as plain functions, and argue which is better here; observer so that a budget-exceeded warning can be delivered to the console or a log without the ledger knowing; command with undo for add/remove transaction; adapter for a second input format (OFX or a bank\'s CSV dialect). Each must have tests. Write 100 words on one pattern you considered and rejected.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pattern-spotting',
              title: 'Pattern spotting in the standard library',
              prompt:
                'Find and document five patterns in the Python standard library or a framework you use (e.g. logging handlers as observer/chain of responsibility, csv.DictReader as adapter, contextlib as template method, unittest.mock as proxy, asyncio futures as command). For each: the pattern, where, the problem it solves there, and one way the Python implementation differs from the textbook UML.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'singleton-damage',
              title: 'Demonstrate singleton damage',
              prompt:
                'Write a configuration singleton used by three modules and a test suite where tests pass individually but fail when run in a different order because of shared state. Fix it by injecting the configuration, keep the tests, and show they now pass in any order (pytest -p no:randomly or pytest-randomly).',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'When does a pattern earn its indirection?',
              answerOutline:
                'When it hides a decision that genuinely varies (multiple strategies, multiple observers, a third-party interface that may change); otherwise it is premature abstraction and makes code harder to read.',
            },
            {
              question: 'Why are singletons considered harmful for testability?',
              answerOutline:
                'They are hidden global state: dependencies are invisible in signatures, tests share and leak state, and substituting fakes requires patching globals.',
            },
            {
              question: 'How does Python simplify the strategy pattern?',
              answerOutline:
                'Functions are first-class, so a strategy can be a function passed as a parameter (e.g. key=) instead of a class hierarchy with one method.',
            },
          ],
        },
        {
          slug: 'api-design-and-error-handling',
          title: 'API design, errors and exceptions',
          summary:
            'Designing interfaces other people will call: naming, defaults, immutability, versioning, and a disciplined approach to errors, exceptions and failure.',
          estimatedMinutes: 90,
          objectives: [
            'Design a function or module API that is hard to misuse: clear names, sensible defaults, no boolean traps, minimal surface',
            'Choose between exceptions, result values and sentinel returns, and explain the trade-offs',
            'Define an exception hierarchy for a library and decide what to catch where',
            'Apply semantic versioning and explain what constitutes a breaking change',
          ],
          concepts: [
            'Principle of least astonishment',
            'Minimal, complete, consistent interfaces',
            'Boolean traps and keyword-only arguments',
            'Exceptions vs error returns; checked vs unchecked',
            'Exception hierarchies and wrapping (raise from)',
            'Fail fast; do not swallow exceptions',
            'Semantic versioning and deprecation',
          ],
          explanation: `An **API** is any interface others program against: a function signature, a class, a module, an HTTP endpoint. Good APIs share properties. They are **hard to misuse**: argument order is obvious or arguments are keyword-only; there is no \`process(data, True, False)\` boolean trap; defaults are the common case and safe. They are **minimal** (every public name is a commitment, by Hyrum's Law) yet **complete** (clients should not need to reach into internals). They are **consistent** with the surrounding ecosystem: in Python, raise \`ValueError\` for bad arguments, accept iterables not just lists, return new objects rather than mutating arguments unless the name says so (\`sort\` vs \`sorted\`). Read the standard library as a style guide.

**Error handling** is where API design is most often sloppy. Python's answer is exceptions, and the discipline is: raise early at the point the problem is detected (**fail fast**), with a specific exception type carrying the context a caller needs; catch late, at the level that can actually do something (retry, report, abort); never swallow with a bare \`except: pass\`, which converts a loud failure into a silent wrong answer. When wrapping a lower-level error, use \`raise NewError(...) from e\` so the chain is preserved. A library should define a small **exception hierarchy** rooted in one base class so callers can catch everything from it in one clause.

Exceptions are not the only option. For expected, frequent outcomes ("key not found") a return value (\`dict.get\`, \`Optional\`) is clearer and faster; Rust's \`Result\` and Go's error returns make this explicit, and typed Python can do the same with a small result type. The rule of thumb: exceptions for exceptional conditions, values for expected alternatives.

**Versioning**: once released, an API change that could break a correct client (removing a name, tightening a precondition, changing a return type) is a **major** change under semantic versioning; additions are **minor**; fixes are **patch**. Deprecate first with a warning, document the migration, then remove in the next major version.

Read the 6.031 reading on exceptions (in "Specifications") and the SemVer specification, then audit your project's public surface.`,
          resources: [
            {
              title: 'MIT 6.031 — Reading 6: Specifications (section on exceptions)',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/06-specifications/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'Exceptions for signalling bugs versus special results; checked versus unchecked.',
              primary: true,
            },
            {
              title: 'Semantic Versioning 2.0.0',
              url: 'https://semver.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'semver.org',
            },
            {
              title: 'Python documentation: Errors and Exceptions (tutorial chapter 8)',
              url: 'https://docs.python.org/3/tutorial/errors.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Exception chaining (raise from), clean-up actions and user-defined exceptions.',
            },
            {
              title: 'Google Python Style Guide',
              url: 'https://google.github.io/styleguide/pyguide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'Sections on exceptions, default argument values and function length; a model for a team style guide.',
            },
          ],
          exercises: [
            {
              slug: 'api-audit',
              title: 'Audit and fix your public API',
              prompt:
                'List every public name in your course project (use __all__ or a script). For each, note: is it necessary, is the name clear, are there boolean traps, are defaults safe, does it mutate arguments? Fix at least five problems, converting positional booleans to keyword-only enums and making one mutating function return a new object instead. Record the changes as a CHANGELOG entry with the correct SemVer bump.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exception-hierarchy',
              title: 'Design an exception hierarchy',
              prompt:
                'Define a LedgerError base with subclasses for parse errors (carrying file, line and column), validation errors and I/O errors. Refactor the code to raise them at the point of detection with context, wrap lower-level exceptions with raise from, and catch only at the CLI boundary to print a user-friendly message and exit code. Write tests that assert the exception type, message and chained cause for five failure scenarios.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exceptions-vs-results',
              title: 'Exceptions versus result values, measured and argued',
              prompt:
                'Implement lookup(key) three ways: raising KeyError, returning None, and returning a small Result type. Benchmark 10^6 lookups at 0 percent, 10 percent and 90 percent miss rates. Then write a page arguing which to use for (a) a parser that reports the first error, (b) a cache lookup, (c) a bank transfer that can fail for five reasons.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a boolean trap and how do you avoid it?',
              answerOutline:
                'A positional boolean argument whose meaning is invisible at the call site (f(x, True)). Use keyword-only arguments, enums or separate functions.',
            },
            {
              question: 'Where should exceptions be caught?',
              answerOutline:
                'At the lowest level that can meaningfully handle them (retry, substitute, report to the user); elsewhere let them propagate, possibly wrapping with raise from to add context.',
            },
            {
              question: 'Which of these is a SemVer major change: adding an optional parameter; changing a function to raise on empty input where it previously returned 0; renaming a private helper?',
              answerOutline:
                'Only the second (it tightens the contract and can break correct clients). Adding optional parameters is minor; private renames are not part of the public API.',
            },
          ],
        },
      ],
      project: {
        slug: 'design-document-and-refactor',
        title: 'Module project: a design review of your own code',
        description: `Write a short design document for your course project as it stands: its modules and their secrets, the ADTs with specs and rep invariants, the patterns used and rejected, and the public API with its versioning policy. Then act on it: perform the three most valuable refactorings the review reveals, each as a separate reviewable pull request with tests passing before and after.`,
        deliverables: [
          'A 3-5 page design document with a module diagram and dependency table',
          'Three merged pull requests, each a single refactoring with a description referencing the design document',
          'A before/after coupling report from your import-analysis script',
        ],
        estimatedHours: 8,
        stretchGoals: ['Have a peer review the design document and record what they could not understand from it alone'],
      },
    },
    {
      slug: 'testing-strategy',
      title: 'Testing Strategy',
      description:
        'Unit tests with pytest, systematic test design and coverage, property-based testing with Hypothesis, test doubles, integration tests and test-driven development.',
      lessons: [
        {
          slug: 'unit-testing-with-pytest',
          title: 'Unit testing with pytest',
          summary:
            'What a good unit test looks like, pytest\'s assertion rewriting, fixtures and parametrisation, and how to organise a test suite that stays fast.',
          estimatedMinutes: 100,
          objectives: [
            'Write unit tests with pytest using plain asserts, fixtures and parametrize',
            'Structure tests as arrange-act-assert with one behaviour per test and a name that states it',
            'Use fixtures for setup and teardown, including tmp_path and monkeypatch, with appropriate scope',
            'Keep the suite fast and deterministic, and explain why flaky tests are worse than no tests',
          ],
          concepts: [
            'Unit test: small, fast, isolated, deterministic',
            'Arrange, act, assert',
            'pytest assertion introspection',
            'Fixtures and scopes; conftest.py',
            'Parametrisation',
            'Test naming and one behaviour per test',
            'Flakiness and its causes',
          ],
          explanation: `A **unit test** exercises a small piece of behaviour in isolation, runs in milliseconds, and either passes or fails deterministically. Its purpose is not to prove the code correct but to make a specific claim about behaviour executable, so that when someone changes the code the claim is re-checked automatically. A suite of such claims is what lets you refactor without fear, which is why testing precedes refactoring in this subject.

**pytest** is the standard Python tool. Tests are plain functions named \`test_*\` using plain \`assert\`; pytest rewrites the assertion so a failure shows the actual values of both sides. Structure every test as **arrange, act, assert**: set up inputs, call one thing, check one behaviour. Name the test for the behaviour and the condition (\`test_parse_rejects_negative_amount\`), so that the failure list reads as a specification. Resist the temptation to test several behaviours in one function; when it fails you will not know which.

**Fixtures** provide setup with automatic teardown: a function decorated \`@pytest.fixture\` whose name a test takes as a parameter. Built-in fixtures cover the common needs: \`tmp_path\` for a fresh temporary directory, \`monkeypatch\` for environment variables and attributes, \`capsys\` for captured output. Scope fixtures at \`function\` by default; use \`module\` or \`session\` only for expensive, read-only resources, because shared mutable fixtures are the first source of order-dependent failures. **Parametrisation** runs one test body over a table of inputs and expected outputs, each reported separately.

Speed and determinism are non-negotiable. A suite that takes ten minutes gets run once a day; one that takes ten seconds gets run after every edit. A **flaky** test (fails sometimes) teaches people to ignore failures, which destroys the value of the whole suite; the causes are almost always time, randomness, network, shared state or test order. Make them deterministic (inject the clock, seed the RNG, fake the network) or delete them.

Read the 6.031 testing reading and the pytest how-to pages on fixtures and parametrisation, then build out your course project's suite to the standard in the exercises.`,
          resources: [
            {
              title: 'MIT 6.031 — Reading 3: Testing',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/03-testing/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'Why testing is hard, test-first programming and the mindset of trying to break your own code.',
              primary: true,
            },
            {
              title: 'pytest documentation — How to use fixtures',
              url: 'https://docs.pytest.org/en/stable/how-to/fixtures.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
            {
              title: 'pytest documentation — How to parametrize fixtures and test functions',
              url: 'https://docs.pytest.org/en/stable/how-to/parametrize.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
            {
              title: 'Software Engineering at Google — Chapter 12: Unit Testing',
              url: 'https://abseil.io/resources/swe-book/html/ch12.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
              note: 'Test behaviours not methods; prefer state over interaction testing; DAMP over DRY in tests.',
            },
          ],
          exercises: [
            {
              slug: 'suite-to-standard',
              title: 'Bring the suite to standard',
              prompt:
                'For your course project write or rewrite tests so that: every public function has at least one test per documented behaviour; each test is arrange-act-assert with a behaviour-stating name; parsing tests are parametrised over a table of at least 15 (input, expected) rows including malformed input; file handling uses tmp_path; no test touches the network or the real clock. Run with pytest -q --durations=5 and get the whole suite under 2 seconds.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fixture-scope-bug',
              title: 'Reproduce and fix a fixture-scope bug',
              prompt:
                'Write a module-scoped fixture returning a mutable list used by three tests, one of which appends to it. Show the tests pass in one order and fail in another (use pytest -p no:cacheprovider and reorder, or install pytest-randomly). Fix it by changing scope or by yielding a fresh copy, and explain the trade-off when the resource is expensive to build.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'flaky-test-hunt',
              title: 'Flaky test hunt',
              prompt:
                'Write five deliberately flaky tests, each with a different root cause (wall-clock time, unseeded randomness, dict ordering of a set, a shared temp file name, a sleep-based race between two threads). Run each 100 times with pytest --count (pytest-repeat) or a shell loop and record the failure rate. Fix each one properly and rerun to show 0 failures in 100 runs.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is one behaviour per test a rule worth following?',
              answerOutline:
                'A failure then identifies the broken behaviour by name; multiple assertions on different behaviours stop at the first failure and hide the rest, and the test name cannot describe them all.',
            },
            {
              question: 'Name four common causes of flaky tests and the fix for each.',
              answerOutline:
                'Real time (inject a clock), randomness (seed or inject), shared mutable state or test order (fresh fixtures), network/external services (fakes), concurrency races (deterministic synchronisation).',
            },
            {
              question: 'When is a session-scoped fixture appropriate?',
              answerOutline:
                'For an expensive resource that tests only read (a loaded dataset, a compiled artefact); never for mutable state tests might change.',
            },
          ],
        },
        {
          slug: 'test-design-partitioning-and-coverage',
          title: 'Test design: partitioning, boundaries and what coverage can and cannot tell you',
          summary:
            'Choosing test inputs systematically from the specification, measuring coverage, and using mutation testing to find out whether the tests would notice a bug.',
          estimatedMinutes: 100,
          objectives: [
            'Partition the input space of a function from its specification and pick boundary values',
            'Explain black-box versus glass-box testing and when each finds bugs the other misses',
            'Measure line and branch coverage with coverage.py and interpret the numbers correctly',
            'Run mutation testing and use the surviving mutants to improve tests',
          ],
          concepts: [
            'Input space partitioning and equivalence classes',
            'Boundary values',
            'Black-box (spec-based) vs glass-box (implementation-based) testing',
            'Line, branch and path coverage',
            'Coverage as a necessary-not-sufficient signal',
            'Mutation testing and mutation score',
            'Test oracle problem',
          ],
          explanation: `You cannot test every input, so the question is which inputs to choose. The disciplined answer is **partitioning**: divide the input space into classes that the specification treats alike, and test at least one value from each class, plus the **boundaries** between classes, because off-by-one errors live at boundaries. For \`max(a, b)\` the partitions are $a < b$, $a = b$, $a > b$, with further partitions on sign and magnitude (zero, negative, the largest representable integer). For a function on lists: empty, one element, many; sorted, reverse, duplicates. Write the partitions down as a comment above the tests; this is the single habit that most improves test suites.

Partitioning from the spec is **black-box** testing. **Glass-box** testing reads the implementation and adds cases to exercise paths the spec did not suggest: the fast path for small inputs, the error branch, the cache hit. Both are needed, and glass-box tests must still assert spec behaviour, not implementation details, or they will break on every refactor.

**Coverage** tools report which lines and branches ran during the tests. Low coverage is a reliable signal: untested code is untested. High coverage is *not* a reliable signal of good tests, because a test can execute a line without asserting anything about its result. Use branch coverage rather than line coverage (a one-line \`if\` can be covered without its false branch ever running), aim for high coverage of core logic, and do not chase 100 percent through trivial code.

**Mutation testing** measures what coverage cannot: the tool makes small changes to the code (flip a comparison, delete a statement, change a constant) and reruns the tests; a mutant that survives means no test noticed the change. The **mutation score** is the fraction killed. Surviving mutants point exactly at missing assertions. It is slow (each mutant is a test run), so run it on core modules, not everything.

Read the 6.031 testing reading's section on partitioning and the coverage.py and mutmut documentation, then apply all three techniques to your parser.`,
          resources: [
            {
              title: 'MIT 6.031 — Reading 3: Testing (choosing test cases by partitioning)',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/03-testing/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              primary: true,
            },
            {
              title: 'coverage.py documentation',
              url: 'https://coverage.readthedocs.io/',
              type: 'documentation',
              cost: 'free',
              provider: 'Ned Batchelder',
              note: 'Enable branch coverage (--branch) and read the HTML report.',
            },
            {
              title: 'mutmut — Python mutation tester',
              url: 'https://mutmut.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'mutmut',
            },
            {
              title: 'Google Testing Blog',
              url: 'https://testing.googleblog.com/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
              note: 'The "Testing on the Toilet" posts are one-page lessons on test design; read a dozen.',
            },
          ],
          exercises: [
            {
              slug: 'partition-the-parser',
              title: 'Partition the transaction parser',
              prompt:
                'For your CSV transaction parser write the full partition of inputs as a document: per field (date formats, amount signs and precision, currency codes, descriptions with commas and quotes), per row (missing fields, extra fields, blank lines, BOM, encoding), per file (empty, header only, 10^5 rows). Choose boundary values. Then write tests covering every partition and boundary, parametrised, and count how many bugs the exercise finds in your parser.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coverage-lies',
              title: 'Make coverage lie, then make it honest',
              prompt:
                'Write tests that achieve 100 percent line coverage of a 30-line module with zero meaningful assertions (call everything, assert nothing). Show the coverage report. Then run mutmut on the module and report the mutation score (expect near 0). Add real assertions until the score exceeds 90 percent, and list which surviving mutants were equivalent (behaviour-preserving) rather than untested.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'branch-vs-line',
              title: 'Branch versus line coverage',
              prompt:
                'Write a function with three single-line conditionals and one test that gives 100 percent line coverage but less than 100 percent branch coverage. Show both reports with coverage run --branch. Add the minimal tests to reach full branch coverage and explain which bug class each new test would catch.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why test boundaries specifically?',
              answerOutline:
                'Off-by-one and comparison errors (< vs <=) change behaviour only at the boundary between partitions; interior values of a class would pass either way.',
            },
            {
              question: 'What does 95 percent line coverage tell you, and what does it not?',
              answerOutline:
                'That 5 percent of lines never run under tests (definitely untested). It does not tell you that the 95 percent are meaningfully tested, since execution without assertions counts.',
            },
            {
              question: 'What is a surviving mutant and what should you do about it?',
              answerOutline:
                'A code change the tests did not detect. Either add a test that would fail on it, or recognise it as an equivalent mutant (no behaviour change) and ignore it.',
            },
          ],
        },
        {
          slug: 'property-based-testing',
          title: 'Property-based testing with Hypothesis',
          summary:
            'Stating properties instead of examples, letting a generator search for counterexamples, shrinking, and the standard property patterns.',
          estimatedMinutes: 100,
          objectives: [
            'Write Hypothesis tests using built-in and composite strategies',
            'Apply the standard property patterns: round-trip, invariant, idempotence, oracle, metamorphic',
            'Read a shrunk counterexample and turn it into a regression example test',
            'Use stateful (rule-based) testing to find sequence-dependent bugs in a data structure',
          ],
          concepts: [
            'Property vs example',
            'Strategies and composite strategies',
            'Shrinking to a minimal counterexample',
            'Round-trip: decode(encode(x)) == x',
            'Oracle: compare with a reference implementation',
            'Metamorphic relations',
            'Stateful / rule-based testing',
            'Hypothesis database and @example',
          ],
          explanation: `Example tests check behaviour on inputs you thought of. **Property-based testing** checks a claim about *all* inputs by generating hundreds of random ones, and when it finds a failure it **shrinks** the input to the smallest case that still fails. It finds the inputs you did not think of: empty strings, Unicode, negative zero, lists with duplicates, the integer that overflows. In Python the tool is **Hypothesis**.

A test takes a **strategy** describing the input space (\`st.integers()\`, \`st.lists(st.text())\`, \`st.builds(Transaction, ...)\`) and a function asserting a property. The hard part is finding properties, and a few patterns cover most code. **Round-trip**: serialising then parsing returns the original; this one test finds more parser bugs than any table of examples. **Invariant**: after any operation, the rep invariant holds and the length is what it should be. **Idempotence**: normalising twice equals normalising once. **Oracle**: your fast implementation agrees with a slow obvious one (your sort versus \`sorted\`, your hash map versus \`dict\`), which is how you tested the data structures subject. **Metamorphic**: you cannot say what $f(x)$ should be, but you can say how $f(x')$ relates to $f(x)$ when $x'$ is a known transformation of $x$ (adding a transaction increases the total by its amount; reversing the input reverses the output).

When Hypothesis reports a failure it prints the shrunk example; add it as an explicit \`@example\` so it is tested forever, then fix the bug. Hypothesis also stores failures in a local database and replays them first on the next run.

**Stateful testing** generates *sequences* of operations against your object and a model, checking invariants after each step. It is the right tool for data structures, caches and anything with a lifecycle, and it finds the bug that appears only after delete-then-reinsert of the same key.

Read the Hypothesis quick start and the "What you can generate and how" page, then convert your oracle tests and your parser tests to properties.`,
          resources: [
            {
              title: 'Hypothesis documentation — Welcome and Quick start guide',
              url: 'https://hypothesis.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hypothesis',
              note: 'Quick start, then "What you can generate and how", then "Stateful testing".',
              primary: true,
            },
            {
              title: 'Hypothesis — Stateful testing',
              url: 'https://hypothesis.readthedocs.io/en/latest/stateful.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Hypothesis',
            },
            {
              title: 'MIT 6.031 — Reading 3: Testing (partitioning as a source of properties)',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/03-testing/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
            },
          ],
          exercises: [
            {
              slug: 'parser-round-trip',
              title: 'Round-trip the parser',
              prompt:
                'Write a composite strategy that generates valid Transaction objects (dates across centuries, amounts with 0-4 decimal places including negatives and zero, descriptions with commas, quotes, newlines and Unicode). Test that format then parse returns an equal object. Record every bug Hypothesis finds, add each shrunk counterexample as an @example, and fix the code. Then write the invariant property that parsing any file never raises anything but LedgerParseError.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'metamorphic-ledger',
              title: 'Metamorphic properties of reports',
              prompt:
                'State and test at least five metamorphic relations for the monthly report: adding a transaction changes exactly one month total by its amount; permuting input rows does not change the report; splitting a transaction into two with the same total does not change totals; scaling all amounts by 2 scales all totals by 2; filtering to one category gives a subset of rows. Explain which bug each relation would catch.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stateful-cache',
              title: 'Stateful test of an LRU cache',
              prompt:
                'Implement an LRU cache (dict plus doubly linked list, or OrderedDict) with get, put and capacity eviction. Write a Hypothesis RuleBasedStateMachine with a model (a Python list of keys in recency order) and rules for get, put and resize, checking after each step that contents and eviction order match. Introduce a deliberate bug (not moving a key to the front on get) and show the machine finds a minimal sequence.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does shrinking do and why does it matter?',
              answerOutline:
                'It reduces a failing input to a minimal one that still fails (shorter lists, smaller numbers), turning a random 200-element counterexample into a two-element one you can understand.',
            },
            {
              question: 'Give a property for a function whose exact output you cannot easily compute.',
              answerOutline:
                'A metamorphic relation (e.g. f(reversed(x)) == reversed(f(x)), or f(x + [a]) relates to f(x) in a known way) or an invariant (output is sorted, output length equals input length).',
            },
            {
              question: 'When is stateful testing the right tool?',
              answerOutline:
                'When bugs depend on sequences of operations and internal state (data structures, caches, connection lifecycles), not on a single input.',
            },
          ],
        },
        {
          slug: 'test-doubles-integration-and-tdd',
          title: 'Test doubles, integration tests and test-driven development',
          summary:
            'Fakes, stubs and mocks and when each is appropriate; the test pyramid; testing through real boundaries; and the TDD loop as a design tool.',
          estimatedMinutes: 110,
          objectives: [
            'Distinguish fakes, stubs, mocks and spies and choose the least powerful double that works',
            'Explain the test pyramid and place unit, integration and end-to-end tests on it with costs',
            'Write integration tests against a real file system, SQLite database or subprocess CLI',
            'Practise the red-green-refactor loop and explain what TDD does for design',
          ],
          concepts: [
            'Test double taxonomy: dummy, stub, fake, spy, mock',
            'State verification vs interaction verification',
            'Over-mocking and brittle tests',
            'Test pyramid: many unit, fewer integration, few end-to-end',
            'Contract tests at boundaries',
            'Hermetic integration tests (SQLite in memory, tmp dirs, local servers)',
            'Red-green-refactor',
          ],
          explanation: `Code that talks to a database, a clock, the network or another service cannot be unit tested as-is, so you substitute a **test double**. The taxonomy matters because the doubles differ in what they can break. A **stub** returns canned answers. A **fake** is a working lightweight implementation (an in-memory repository, SQLite instead of Postgres). A **mock** records calls and lets the test assert on them (**interaction verification**). Google's testing guidance and Fowler's classic article agree: prefer **state verification** with real objects or fakes, and reserve mocks for interactions that *are* the behaviour (an email was sent, exactly once). Tests that assert on how a function called its collaborators break on every refactor that preserves behaviour, which is the opposite of what tests are for. In Python, \`unittest.mock\` is powerful and easy to overuse; dependency injection from the design module is what makes fakes easy.

The **test pyramid** describes the mix: many fast unit tests at the bottom, fewer **integration tests** that exercise real boundaries (your code plus the real file system, a real SQLite database, the real CLI run as a subprocess), and very few **end-to-end** tests through the whole system. Integration tests find the bugs that unit tests with doubles cannot: a wrong SQL type, an encoding error on a real file, an argument parser that rejects what your docs promise. Keep them **hermetic**: no shared servers, no network, fresh temp directories, so they are as deterministic as unit tests, just slower. Where two components communicate over an interface, a **contract test** on each side (the consumer's expectations, the provider's guarantees) catches drift without running both together.

**Test-driven development** is a loop: write a failing test for the next small behaviour (red), write the simplest code to pass (green), then **refactor** with the tests as a safety net. Its value is less about testing than about design: writing the test first forces you to decide the interface from the caller's point of view and keeps units small and injectable. It is not mandatory for every line, but you should have done it enough to use it when design is unclear.

Read Fowler's test pyramid and mocks articles and the SWE-at-Google chapter on test doubles, then build the integration layer of your suite and do one feature strictly by TDD.`,
          resources: [
            {
              title: 'Martin Fowler — The Practical Test Pyramid (Ham Vocke)',
              url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
              primary: true,
            },
            {
              title: 'Martin Fowler — Mocks Aren\'t Stubs',
              url: 'https://martinfowler.com/articles/mocksArentStubs.html',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
              note: 'The classical vs mockist distinction and state vs behaviour verification.',
            },
            {
              title: 'Software Engineering at Google — Chapter 13: Test Doubles',
              url: 'https://abseil.io/resources/swe-book/html/ch13.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
            },
            {
              title: 'Python documentation: unittest.mock',
              url: 'https://docs.python.org/3/library/unittest.mock.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Learn patch, MagicMock, spec/autospec; then use them sparingly.',
            },
            {
              title: 'pytest documentation — How to monkeypatch/mock modules and environments',
              url: 'https://docs.pytest.org/en/stable/how-to/monkeypatch.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
          ],
          exercises: [
            {
              slug: 'fake-vs-mock',
              title: 'The same test three ways',
              prompt:
                'Your ledger notifies a "budget exceeded" channel. Test that behaviour with (a) a real in-memory fake channel that records messages, (b) unittest.mock with assert_called_once_with, (c) a mock with autospec. Then refactor the notifier to batch messages (same observable outcome, different call pattern) and report which tests broke and why. Write 150 words on which double you would keep.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'integration-layer',
              title: 'Hermetic integration tests',
              prompt:
                'Add integration tests that: run the CLI as a subprocess on a real CSV file in tmp_path and check stdout and exit code; store and query transactions through a real SQLite database created per test; and run the full import-report pipeline on a 10^5-row generated file with a timing assertion. Mark them with @pytest.mark.integration, make them selectable, and report the unit vs integration run times.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tdd-feature',
              title: 'One feature, strictly TDD',
              prompt:
                'Implement recurring-transaction detection (same payee and amount at roughly monthly intervals) strictly by red-green-refactor: commit after every green with the message prefixed by the cycle number. Produce at least 8 cycles. Afterwards, write 200 words on how the tests shaped the interface, and compare the result to how you would have designed it up front.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a fake and a mock, and which should you prefer by default?',
              answerOutline:
                'A fake is a real working lightweight implementation enabling state verification; a mock records interactions for behaviour verification. Prefer fakes/real objects; use mocks only when the interaction is the behaviour under test.',
            },
            {
              question: 'Why do integration tests belong in the suite even with excellent unit tests?',
              answerOutline:
                'Unit tests with doubles cannot catch mismatches at real boundaries (SQL types, file encodings, CLI parsing, serialisation); integration tests run the real boundary hermetically.',
            },
            {
              question: 'What does TDD contribute beyond test coverage?',
              answerOutline:
                'It forces interface design from the caller\'s perspective, keeps units small and injectable, and provides a refactoring safety net during development rather than after.',
            },
          ],
        },
      ],
      project: {
        slug: 'test-suite-overhaul',
        title: 'Module project: a measured test suite',
        description: `Bring your course project's test suite to a professional standard and measure it. Deliver unit tests organised by partition, property-based tests for every parser and every ADT, hermetic integration tests through the CLI and the database, a branch-coverage report, and a mutation score on the core modules. Then introduce five realistic bugs on a branch (one per category: boundary, encoding, state, concurrency, error handling) and report which layer of the suite caught each and how long it took to localise.`,
        deliverables: [
          'Test suite with unit, property and integration layers, runnable separately by marker',
          'Branch coverage report (target 85 percent on core modules) and mutation score (target 80 percent)',
          'A bug-injection report: five bugs, which test caught each, time to localise',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add contract tests between the CLI layer and the core library and show they catch an interface drift'],
      },
    },
    {
      slug: 'code-quality-and-refactoring',
      title: 'Code Quality and Refactoring',
      description:
        'Readable code, the refactoring catalogue and the smells that call for it, and automation with formatters, linters and static type checkers.',
      lessons: [
        {
          slug: 'readable-code-and-naming',
          title: 'Readable code: naming, comments and structure',
          summary:
            'Code is read far more than written; the concrete habits that make it readable, and the ones that only look like they do.',
          estimatedMinutes: 80,
          objectives: [
            'Choose names that state intent and scope, and recognise names that mislead',
            'Decide what a comment should and should not say, and write docstrings that specify',
            'Structure functions so that each operates at one level of abstraction',
            'Apply a style guide consistently and explain why consistency beats preference',
          ],
          concepts: [
            'Names: intent, scope-proportional length, no encodings',
            'Comments explain why; code explains what',
            'Docstrings as specifications',
            'Single level of abstraction per function',
            'Guard clauses and early return',
            'Magic numbers and named constants',
            'Style guides (PEP 8, Google)',
          ],
          explanation: `Code is read many more times than it is written, by people (including future you) who have less context than the author had. Readability is therefore a performance property of a codebase, and it comes from specific habits rather than taste.

**Names** carry most of the load. A name should say what the thing *is* or *does* in the vocabulary of the problem, and its length should be proportional to its scope: \`i\` is fine for a three-line loop, \`transactions_by_month\` is right for a module-level variable. Avoid encodings and abbreviations that need decoding (\`txnLstMap\`), negated booleans (\`not_ready\`), and names that lie (a \`get_user\` that creates one). When you cannot name a function without "and", it does two things.

**Comments** are for what the code cannot say: *why* this approach, what constraint or bug it works around, what a non-obvious value means. A comment that restates the code (\`i += 1  # increment i\`) is noise that drifts out of date. **Docstrings** are different: they are the specification from the previous module (preconditions, postconditions, effects, exceptions) and belong on every public function.

**Structure**: a function should operate at a single level of abstraction; a function that mixes "parse the date" with "for each row" with "write the report" should be three. Use **guard clauses** to handle edge cases at the top and return early, so the main path is not nested five levels deep. Replace **magic numbers** with named constants. Keep functions short enough to see entirely, but do not fragment logic into ten two-line functions that must be read in sequence; 6.031's standard is "easy to understand", not "short".

A **style guide** (PEP 8 or Google's) settles layout, naming conventions and import order so that reviews are about substance. The next lesson automates it; this one is about the judgement no tool makes. Read the 6.031 code review reading (it is a catalogue of readability smells) and the Google Python style guide's sections on naming and comments, then do the rewrite exercises.`,
          resources: [
            {
              title: 'MIT 6.031 — Reading 4: Code Review (smells and style)',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/04-code-review/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'Magic numbers, one purpose per variable, global variables, comments, fail fast, DRY, and more.',
              primary: true,
            },
            {
              title: 'Google Python Style Guide',
              url: 'https://google.github.io/styleguide/pyguide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'Sections 3.8 (comments and docstrings) and 3.16 (naming).',
            },
            {
              title: 'PEP 8 — Style Guide for Python Code',
              url: 'https://peps.python.org/pep-0008/',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'A Philosophy of Software Design (Ousterhout) — book page',
              url: 'https://web.stanford.edu/~ouster/cgi-bin/book.php',
              type: 'textbook',
              cost: 'paid',
              provider: 'Stanford University',
              note: 'Chapters on comments and naming if you have it; optional.',
            },
          ],
          exercises: [
            {
              slug: 'rename-for-intent',
              title: 'Rename for intent',
              prompt:
                'Take a 150-line function from an open-source project (or write a deliberately bad one). Without changing behaviour (verify with tests), rename every variable and function so a reader needs no comments to follow it, extract helpers so each function has one level of abstraction, convert nested conditionals to guard clauses, and replace magic numbers with constants. Produce a before/after diff and a 100-word note on the two renames that mattered most.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'comment-audit',
              title: 'Comment audit',
              prompt:
                'Classify every comment in a module of 300+ lines (yours or open source) as: explains why (keep), restates code (delete), out of date (fix or delete), commented-out code (delete; git remembers), or TODO (turn into an issue). Apply the decisions and show the diff. Then write proper docstrings for the five most important public functions with preconditions, postconditions and raised exceptions.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'readability-review',
              title: 'Readability review swap',
              prompt:
                'Give a module from your course project to someone else (or read your own six months old code) and have them narrate aloud what each function does without running it. Record every place they hesitate or guess wrong. Fix those places and verify with a second reader or a second pass.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What should a comment contain that the code cannot express?',
              answerOutline:
                'Why: the reason for a choice, the constraint or bug it works around, the meaning of a non-obvious value, references to specs or issues; not what the code does.',
            },
            {
              question: 'How long should a variable name be?',
              answerOutline:
                'Proportional to its scope: single letters for tiny local scopes, descriptive multi-word names for anything visible across a function or module.',
            },
            {
              question: 'What does "single level of abstraction" mean for a function?',
              answerOutline:
                'All statements in the function are at the same conceptual level (e.g. orchestrating steps, or doing byte-level parsing) rather than mixing high-level flow with low-level detail.',
            },
          ],
        },
        {
          slug: 'refactoring-catalog-and-smells',
          title: 'Refactoring: smells, the catalogue and safe small steps',
          summary:
            'Refactoring as behaviour-preserving transformation, the smells that motivate it, the named refactorings from Fowler\'s catalogue, and how to do it without breaking anything.',
          estimatedMinutes: 100,
          objectives: [
            'Define refactoring and explain why it must be separated from behaviour change',
            'Recognise the common code smells: long method, large class, feature envy, data clumps, primitive obsession, shotgun surgery, duplicated code',
            'Apply named refactorings (extract function, move method, replace conditional with polymorphism, introduce parameter object) in small tested steps',
            'Plan a larger restructuring as a sequence of safe steps with the build green throughout',
          ],
          concepts: [
            'Refactoring: behaviour-preserving change',
            'Code smells',
            'Extract/inline function, extract variable',
            'Move function, move field',
            'Replace conditional with polymorphism',
            'Introduce parameter object, replace primitive with object',
            'Strangler fig and branch by abstraction for large changes',
            'IDE-assisted vs manual refactoring',
          ],
          explanation: `**Refactoring** is changing the structure of code without changing its observable behaviour, in small steps, each verified by the tests. The definition has teeth: if you change behaviour and structure in the same commit, a failing test cannot tell you which one broke it, and a reviewer cannot verify the structural change by inspection. Refactoring commits and feature commits should alternate, never mix.

You refactor in response to **smells**, patterns that experience says lead to trouble. A **long method** mixes levels of abstraction. A **large class** has several responsibilities. **Feature envy** is a method more interested in another class's data than its own; it wants to move. **Data clumps** are the same three parameters passed everywhere; they want to be an object. **Primitive obsession** uses strings and floats where a Money or Date type would catch errors. **Shotgun surgery** is one logical change requiring edits in ten places; something is not hidden that should be. **Duplicated code** is the oldest smell, and the cure is extraction, though three similar lines are sometimes clearer than a parameterised helper.

Fowler's **catalogue** gives each refactoring a name and a mechanical recipe: *Extract Function*, *Inline Function*, *Move Function*, *Replace Temp with Query*, *Introduce Parameter Object*, *Replace Conditional with Polymorphism*, *Replace Primitive with Object*. The recipes matter because each step is small enough to be obviously correct and to run tests after. IDEs automate the mechanical ones (rename, extract) reliably; use them.

For changes too large to do in one sitting, keep the build green with **branch by abstraction** (introduce an interface, add the new implementation behind it, switch, remove the old) or the **strangler fig** (route traffic gradually from the old component to the new one). Both let the work land in small merged pull requests rather than a long-lived branch.

Read the catalogue's introduction and the entries above, then do the smell hunt and the step-by-step refactoring on your project, committing after every green step.`,
          resources: [
            {
              title: 'Refactoring.com — Catalog of Refactorings (Martin Fowler)',
              url: 'https://refactoring.com/catalog/',
              type: 'documentation',
              cost: 'free',
              provider: 'martinfowler.com',
              note: 'The online catalogue is free; the book (Refactoring, 2nd ed.) is paid and optional.',
              primary: true,
            },
            {
              title: 'Refactoring.Guru — Code smells and refactoring techniques',
              url: 'https://refactoring.guru/refactoring',
              type: 'article',
              cost: 'freemium',
              provider: 'Refactoring.Guru',
              note: 'Free catalogue of smells with before/after examples.',
            },
            {
              title: 'Martin Fowler — Branch by Abstraction',
              url: 'https://martinfowler.com/bliki/BranchByAbstraction.html',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
            },
            {
              title: 'Martin Fowler — Strangler Fig Application',
              url: 'https://martinfowler.com/bliki/StranglerFigApplication.html',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
            },
          ],
          exercises: [
            {
              slug: 'smell-hunt',
              title: 'Smell hunt with a plan',
              prompt:
                'Read your course project and an open-source module and list every smell you find with file, line and smell name (aim for 15). For each, name the catalogue refactoring that addresses it and estimate the risk. Then order them by value/risk and do the top five in your own project, one commit each, tests green at each commit. Attach the git log.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'polymorphism-refactor',
              title: 'Replace conditional with polymorphism',
              prompt:
                'Find or write a function with a type-switch (if kind == "csv": ... elif kind == "json": ... elif kind == "ofx": ...) appearing in at least two places. Refactor to a class per kind behind a shared interface, following the catalogue recipe step by step with tests after each step. Show the sequence of commits. Then add a fourth format and count the files touched before and after the refactoring.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'branch-by-abstraction',
              title: 'Swap a storage backend by branch by abstraction',
              prompt:
                'Your ledger stores data in CSV; move it to SQLite without a long-lived branch: introduce a Repository interface (PR 1), implement SQLiteRepository with the same tests (PR 2), switch the default behind a flag and run both in CI (PR 3), remove the CSV implementation (PR 4). Every PR must leave main releasable. Report the size of each PR.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must refactoring and behaviour change be in separate commits?',
              answerOutline:
                'So tests and reviewers can verify the refactoring preserved behaviour (all tests unchanged and green) and attribute any failure to the behaviour change.',
            },
            {
              question: 'What smell does "introduce parameter object" address?',
              answerOutline:
                'Data clumps: the same group of values passed together repeatedly; grouping them into an object names the concept and gives behaviour a home.',
            },
            {
              question: 'How does branch by abstraction avoid a long-lived branch?',
              answerOutline:
                'An abstraction layer lets the old and new implementations coexist in main; the switch is a configuration change, so each step merges small and the build stays green.',
            },
          ],
        },
        {
          slug: 'static-analysis-types-and-automation',
          title: 'Static analysis: formatters, linters, type checkers and pre-commit',
          summary:
            'Letting machines enforce style and catch whole bug classes before tests run: ruff, mypy, gradual typing, and hooks that make the checks unavoidable.',
          estimatedMinutes: 90,
          objectives: [
            'Configure a formatter and linter and explain why automatic formatting ends style debates',
            'Add type hints incrementally and run mypy in strict mode on core modules',
            'Interpret type errors and use Protocol, TypedDict, Literal and generics to express real constraints',
            'Wire all checks into pre-commit hooks and CI so they cannot be skipped',
          ],
          concepts: [
            'Formatter vs linter vs type checker',
            'Gradual typing and type hints',
            'mypy strictness levels',
            'Protocols (structural typing), TypedDict, Literal, Optional',
            'Generics and TypeVar',
            'pre-commit hooks',
            'Suppressions (noqa, type: ignore) and their cost',
          ],
          explanation: `Humans should spend review time on design and correctness, not on indentation or on whether a function might return \`None\`. Three categories of tool take that work. A **formatter** (ruff format, black) rewrites code to a canonical layout; its value is not the particular style but that *no one argues about style any more* and diffs show only real changes. A **linter** (ruff, flake8, pylint) flags likely bugs and smells: unused variables, shadowed names, mutable default arguments, bare excepts, overly complex functions. A **type checker** (mypy, pyright) proves, for annotated code, that values have the types the annotations claim, which catches a whole class of bugs (passing a string where a list is expected, forgetting that a lookup can return \`None\`) before any test runs.

Python's typing is **gradual**: unannotated code is dynamically typed and the checker ignores it, so you can adopt types one module at a time. Start with the core data types and public function signatures. Use \`Optional[T]\` (or \`T | None\`) honestly and the checker will force you to handle the \`None\` case at every call site, which alone justifies the effort. **Protocols** give structural typing: a parameter typed as a \`Protocol\` with a \`read()\` method accepts anything with that method, which is how you type the injected dependencies from the design module without inheritance. **TypedDict** types JSON-shaped dicts; **Literal** restricts strings to known values; generics with \`TypeVar\` type containers and higher-order functions. Run mypy with \`--strict\` on core modules; it will complain, and most complaints are real.

Every suppression (\`# noqa\`, \`# type: ignore\`) is a small debt; require a reason in the comment and review them like code. Then make the checks unavoidable: **pre-commit** runs them on changed files before every commit, and CI runs them on everything, so a change that fails lint or types never reaches review. Read the ruff and mypy documentation's getting-started pages and the mypy cheat sheet, then do the typing migration exercise and measure what it finds.`,
          resources: [
            {
              title: 'Ruff documentation — an extremely fast Python linter and formatter',
              url: 'https://docs.astral.sh/ruff/',
              type: 'documentation',
              cost: 'free',
              provider: 'Astral',
              note: 'Tutorial and rule reference; enable a broad rule set and prune.',
              primary: true,
            },
            {
              title: 'mypy documentation — Getting started and the cheat sheet',
              url: 'https://mypy.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'mypy',
            },
            {
              title: 'Python documentation: typing — Support for type hints',
              url: 'https://docs.python.org/3/library/typing.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Protocol, TypedDict, Literal, TypeVar, Generic.',
            },
            {
              title: 'pre-commit — a framework for managing git hooks',
              url: 'https://pre-commit.com/',
              type: 'tool',
              cost: 'free',
              provider: 'pre-commit.com',
            },
          ],
          exercises: [
            {
              slug: 'typing-migration',
              title: 'Type the core modules strictly',
              prompt:
                'Add type hints to your course project\'s core modules until mypy --strict passes with no ignores. Keep a log of every error class mypy reported and whether it was a real bug (expect several Optional-related ones). Use a Protocol for the injected repository and clock, a Literal for category names or a TypedDict for the JSON report. Report lines of code, number of errors found, and number of genuine bugs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lint-rule-triage',
              title: 'Lint rule triage',
              prompt:
                'Run ruff with the full rule set (select ALL) on your project and on one open-source project. Categorise the findings: real bug, readability, false positive, style-only. Decide on a rule set you can justify in a paragraph, write pyproject.toml configuration for it, fix the real bugs, and add noqa comments with reasons for at most three false positives.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'unavoidable-checks',
              title: 'Make the checks unavoidable',
              prompt:
                'Configure pre-commit with ruff format, ruff check and mypy on changed files, plus a hook that blocks commits containing "print(" in library code or a secret-like string. Demonstrate a blocked commit and a passing one. Then add the same checks to CI (next module) and show that a bypassed hook (--no-verify) is still caught before merge.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the main benefit of an automatic formatter, independent of the chosen style?',
              answerOutline:
                'It eliminates style discussion in review and makes diffs show only semantic changes, because everyone\'s code is formatted identically.',
            },
            {
              question: 'What bug class does honest use of Optional eliminate?',
              answerOutline:
                'None-dereference errors: the checker forces every call site to handle the None case before using the value.',
            },
            {
              question: 'Why use Protocol rather than an abstract base class for an injected dependency?',
              answerOutline:
                'Structural typing: any object with the right methods satisfies it without inheriting, so fakes and third-party objects fit without wrapping.',
            },
          ],
        },
      ],
    },
    {
      slug: 'build-ci-cd-and-deployment',
      title: 'Build, CI/CD and Deployment',
      description:
        'Reproducible builds and dependency management, continuous integration that gates every change, and release and deployment pipelines that ship safely.',
      lessons: [
        {
          slug: 'packaging-and-dependencies',
          title: 'Packaging, dependencies and reproducible builds',
          summary:
            'Turning a repository into an installable package, pinning dependencies so builds are reproducible, and the difference between a library and an application.',
          estimatedMinutes: 90,
          objectives: [
            'Package a Python project with pyproject.toml, entry points and a src layout',
            'Explain the difference between abstract dependencies (library) and locked dependencies (application)',
            'Produce a lock file and demonstrate a reproducible install on a clean machine',
            'Audit dependencies for vulnerabilities and licences and set an update policy',
          ],
          concepts: [
            'pyproject.toml, build backends, wheels and sdists',
            'src layout and editable installs',
            'Entry points / console scripts',
            'Version specifiers; abstract vs locked dependencies',
            'Lock files and hash pinning',
            'Virtual environments',
            'Supply-chain risk, vulnerability scanning, licences',
          ],
          explanation: `A **build** turns source into an artefact someone else can install: for Python a **wheel** (built distribution) or **sdist** (source distribution), for other ecosystems a jar, a binary or a container image. The declaration lives in \`pyproject.toml\`: name, version, dependencies, the build backend, and **entry points** that turn a function into a command on the user's PATH. Use the **src layout** (\`src/yourpackage/\`) so tests import the installed package rather than the working directory and catch packaging mistakes; install in editable mode during development.

The central discipline is **reproducibility**: the same source must produce the same behaviour on your laptop, in CI and in production next year. Dependencies are where that breaks. A **library** declares *abstract* dependencies with ranges (\`requests>=2.28,<3\`) because it must coexist with other libraries in the user's environment. An **application** must additionally pin *every* transitive dependency to an exact version and, ideally, a hash, in a **lock file**, because it is the final consumer and wants the identical environment everywhere. Tools such as uv, pip-tools, Poetry and PDM generate and consume lock files; raw \`pip install -r requirements.txt\` with loose ranges is where "works on my machine" comes from. Each project gets its own **virtual environment**; never install into the system interpreter.

Dependencies are also a **supply chain**. Every package you add is code you run with your privileges and update on someone else's schedule. Scan for known vulnerabilities (pip-audit, GitHub Dependabot), check licences for compatibility, prefer well-maintained packages with few transitive dependencies, and set a policy: automated minor updates with CI, deliberate major updates with review.

Read the Python Packaging User Guide tutorial and the SWE-at-Google chapter on dependency management, then package your course project so that \`pipx install\` from a clean machine works, with a lock file for the application and ranges for the library core.`,
          resources: [
            {
              title: 'Python Packaging User Guide — Packaging Python Projects',
              url: 'https://packaging.python.org/en/latest/tutorials/packaging-projects/',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Packaging Authority',
              primary: true,
            },
            {
              title: 'Software Engineering at Google — Chapter 21: Dependency Management',
              url: 'https://abseil.io/resources/swe-book/html/ch21.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
              note: 'Why dependency management is hard and the semantic versioning critique.',
            },
            {
              title: 'The Twelve-Factor App — Dependencies, Config, Build/Release/Run',
              url: 'https://12factor.net/',
              type: 'article',
              cost: 'free',
              provider: '12factor.net',
              note: 'Factors II, III and V for this lesson.',
            },
            {
              title: 'Semantic Versioning 2.0.0',
              url: 'https://semver.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'semver.org',
            },
          ],
          exercises: [
            {
              slug: 'package-the-project',
              title: 'Package the course project',
              prompt:
                'Convert your project to a src layout with pyproject.toml, a console-script entry point, and a version read from one place. Build a wheel and an sdist, install the wheel into a fresh virtual environment on another machine or a clean container, and run the CLI. Check the wheel contents (unzip -l) and ensure tests and data files are handled correctly.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lock-and-reproduce',
              title: 'Lock and reproduce',
              prompt:
                'Generate a lock file with hashes (uv, pip-compile or Poetry). Install from it in two clean environments a day apart and diff pip freeze output: it must be identical. Then simulate the failure mode: remove the lock, install from ranges, and find a package whose newer release changes behaviour (or pin an old one and upgrade). Write a paragraph on when ranges are correct and when pins are.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'dependency-audit',
              title: 'Dependency audit',
              prompt:
                'Produce the full transitive dependency tree of your project (pipdeptree or uv tree). For each direct dependency record: version, licence, last release date, number of transitive dependencies, known vulnerabilities (pip-audit). Remove or replace at least one dependency that is not pulling its weight and document the decision.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should a library not ship a lock file as its dependency declaration?',
              answerOutline:
                'It must coexist with other packages in the user\'s environment; exact pins would conflict. Libraries declare compatible ranges; applications lock exact versions.',
            },
            {
              question: 'What does the src layout protect against?',
              answerOutline:
                'Tests accidentally importing the source tree instead of the installed package, hiding packaging errors (missing files, wrong package data) until a user installs it.',
            },
            {
              question: 'Name three questions to ask before adding a dependency.',
              answerOutline:
                'Is it maintained and widely used; what is its licence; how many transitive dependencies and known vulnerabilities does it bring; could a few lines of your own code do the job.',
            },
          ],
        },
        {
          slug: 'continuous-integration',
          title: 'Continuous integration',
          summary:
            'A pipeline that lints, type-checks, tests and builds every change on a clean machine, fast enough that people actually wait for it.',
          estimatedMinutes: 100,
          objectives: [
            'Write a CI workflow that runs on every push and pull request across a matrix of Python versions',
            'Make the pipeline fast with caching, parallel jobs and test splitting, and keep it under ten minutes',
            'Protect the main branch so merges require green CI and review',
            'Diagnose and fix CI-only failures (environment differences, flaky tests, missing dependencies)',
          ],
          concepts: [
            'CI: integrate every change, verify automatically',
            'Workflow, job, step, runner, matrix',
            'Caching dependencies',
            'Required status checks and branch protection',
            'Fast feedback: the ten-minute build',
            'Artefacts and reports (coverage, test results)',
            'Flakiness quarantine',
          ],
          explanation: `**Continuous integration** is the practice of merging every change into the shared trunk frequently, at least daily, and verifying each merge automatically on a clean machine. The automation is a **pipeline**: check out the commit, install the locked dependencies, run the formatter check, linter and type checker, run the tests with coverage, build the package. If any step fails the change is red and does not merge. The CI server is the only build that counts, precisely because it has no uncommitted files, no stale caches and no "it works on my machine".

On GitHub the pipeline is a **workflow** file: triggers (\`push\`, \`pull_request\`), **jobs** that run on **runners**, **steps** inside jobs. A **matrix** runs the same job across Python versions and operating systems. Cache the dependency install keyed on the lock-file hash, run independent jobs in parallel (lint and types need not wait for tests), and split slow test suites across runners. Fowler's rule of thumb is the **ten-minute build**: longer than that and people stop waiting, batch changes, and the feedback loop CI exists to provide is lost. Upload coverage and test reports as artefacts so failures can be read without rerunning.

Then make it mandatory: **branch protection** on main requires the status checks to pass and at least one review before merging, and forbids force-pushes. This is what turns CI from a dashboard into a gate. The team norm that completes it: a red main is the top priority; fix forward within minutes or revert.

CI-only failures are instructive. They are almost always an undeclared dependency, a reliance on local files or environment variables, a path or line-ending difference between operating systems, or a flaky test that finally got caught. Fix the root cause; retrying until green is how flaky tests become permanent. Quarantine genuinely flaky tests in a separate non-blocking job while you fix them, with a deadline.

Read Fowler's Continuous Integration article and the GitHub Actions quick start, then build the pipeline for your project and tune it until it is under five minutes.`,
          resources: [
            {
              title: 'Martin Fowler — Continuous Integration',
              url: 'https://martinfowler.com/articles/continuousIntegration.html',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
              note: 'The practices: single source repository, automate the build, self-testing build, everyone commits daily, fix broken builds immediately, keep the build fast.',
              primary: true,
            },
            {
              title: 'GitHub Docs — Quickstart for GitHub Actions',
              url: 'https://docs.github.com/en/actions/writing-workflows/quickstart',
              type: 'documentation',
              cost: 'free',
              provider: 'GitHub',
              note: 'Then the "Building and testing Python" guide in the same documentation.',
            },
            {
              title: 'Software Engineering at Google — Chapter 23: Continuous Integration',
              url: 'https://abseil.io/resources/swe-book/html/ch23.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
            },
            {
              title: 'pre-commit — run the same hooks in CI',
              url: 'https://pre-commit.com/',
              type: 'tool',
              cost: 'free',
              provider: 'pre-commit.com',
            },
          ],
          exercises: [
            {
              slug: 'build-the-pipeline',
              title: 'Build the pipeline',
              prompt:
                'Add a GitHub Actions (or GitLab CI) workflow for your project: a lint-and-types job and a test job in parallel, the test job in a matrix of three Python versions on Linux plus one on Windows, dependency caching keyed on the lock file, coverage uploaded as an artefact, and a build job that produces the wheel. Enable branch protection requiring all jobs. Open a pull request that fails lint and show it cannot be merged; fix it and merge.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ten-minute-build',
              title: 'Get under five minutes',
              prompt:
                'Measure your pipeline\'s wall time per job over five runs. Apply at least three optimisations (caching, parallel jobs, pytest -n with xdist, skipping docs build on code-only changes, trimming the matrix) and measure again. Report before/after times and the cost of each optimisation in complexity.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ci-only-failure',
              title: 'Diagnose a CI-only failure',
              prompt:
                'Introduce three faults that pass locally but fail in CI: a test depending on a file outside the repository, a dependency installed locally but missing from the lock file, and a path with a hard-coded forward slash on the Windows runner. For each, read the CI log, identify the cause, and fix the root cause (not the symptom). Then add a test that reads an environment variable with a local default and explain why CI should set it explicitly.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does only the CI build "count"?',
              answerOutline:
                'It starts from a clean checkout with declared dependencies only, so it cannot pass because of local uncommitted files, caches or environment; it is the reproducible verification.',
            },
            {
              question: 'What should happen when main goes red?',
              answerOutline:
                'Fixing it becomes the top priority: fix forward within minutes or revert the offending change; nobody builds on a broken trunk.',
            },
            {
              question: 'Why is retrying a failed CI job until it passes harmful?',
              answerOutline:
                'It normalises flakiness, hides real intermittent bugs, slows everyone, and teaches the team to ignore red builds.',
            },
          ],
        },
        {
          slug: 'delivery-deployment-and-release',
          title: 'Continuous delivery, containers, deployment and release',
          summary:
            'From a green build to running software: containers, environments and configuration, release versioning and changelogs, and deployment strategies that make rollbacks boring.',
          estimatedMinutes: 100,
          objectives: [
            'Build a container image for the project and explain layers, reproducibility and image size',
            'Separate configuration from code and manage secrets outside the repository',
            'Automate releases: version bump, changelog from commits, tag, build, publish',
            'Compare deployment strategies (blue-green, canary, rolling) and feature flags, and design a rollback',
          ],
          concepts: [
            'Continuous delivery vs continuous deployment',
            'Container images, layers, Dockerfile best practice',
            'Configuration via environment; secrets management',
            'Release automation and changelogs',
            'Blue-green, canary and rolling deployment',
            'Feature flags and dark launches',
            'Rollback and forward-fix',
            'Health checks and readiness',
          ],
          explanation: `**Continuous delivery** means every green build is releasable with one action; **continuous deployment** means that action is automatic. Either way the goal is to make releasing so routine that it carries no fear, because small, frequent releases are easier to debug and roll back than quarterly big bangs.

A **container image** packages the application with its exact runtime and dependencies so that the artefact tested in CI is the artefact that runs in production. A \`Dockerfile\` builds it in **layers**; put the slow, stable steps (base image, dependency install from the lock file) first so they cache, and the code last. Use a slim base, a non-root user, a pinned base image tag, and a multi-stage build to keep build tools out of the final image. Treat the image as immutable: **configuration** (ports, database URLs, feature flags) comes from the environment at run time, and **secrets** never go into the image or the repository; they come from the platform's secret store.

**Release automation** removes the error-prone manual steps: a workflow triggered by a tag (or by merging a release pull request) bumps the version, generates a **changelog** from conventional commit messages, builds the wheel and the image, runs the full test suite once more, and publishes to the package index and the container registry. Keep a human-written changelog section for anything users must act on.

**Deployment strategies** decide how the new version meets traffic. **Rolling** replaces instances a few at a time. **Blue-green** runs the new version beside the old and switches traffic at once, giving an instant rollback by switching back. **Canary** sends a small fraction of traffic to the new version and watches error rates and latency before widening. **Feature flags** decouple deploy from release: ship the code dark, turn it on for one percent of users, turn it off without redeploying. In every strategy, **health checks** tell the platform when an instance is ready, and the rollback procedure is tested before it is needed.

Read the SWE-at-Google continuous delivery chapter, Hodgson's feature toggles article and Docker's getting-started guide, then build the release pipeline and perform a rollback drill.`,
          resources: [
            {
              title: 'Software Engineering at Google — Chapter 24: Continuous Delivery',
              url: 'https://abseil.io/resources/swe-book/html/ch24.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
              primary: true,
            },
            {
              title: 'Martin Fowler — Feature Toggles (Pete Hodgson)',
              url: 'https://martinfowler.com/articles/feature-toggles.html',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
            },
            {
              title: 'Docker Docs — Get started',
              url: 'https://docs.docker.com/get-started/',
              type: 'documentation',
              cost: 'free',
              provider: 'Docker',
              note: 'The workshop covers images, layers, volumes and multi-container applications.',
            },
            {
              title: 'Keep a Changelog',
              url: 'https://keepachangelog.com/en/1.1.0/',
              type: 'documentation',
              cost: 'free',
              provider: 'keepachangelog.com',
            },
            {
              title: 'The Twelve-Factor App — Config, Processes, Disposability',
              url: 'https://12factor.net/',
              type: 'article',
              cost: 'free',
              provider: '12factor.net',
            },
          ],
          exercises: [
            {
              slug: 'containerise',
              title: 'Containerise the project',
              prompt:
                'Write a multi-stage Dockerfile for your project with a pinned slim base image, dependency layer from the lock file, a non-root user and a HEALTHCHECK. Measure image size and build time for: naive single-stage, multi-stage, and with the dependency layer cached across a code-only change. Run the container with configuration from environment variables and demonstrate that no secret appears in the image (docker history, grep the layers).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'release-workflow',
              title: 'Automated release',
              prompt:
                'Create a release workflow triggered by pushing a tag v*: verify the tag matches the package version, run tests, build wheel and image, generate the changelog section from conventional commits since the previous tag, create a release with the artefacts attached, and publish to TestPyPI and a container registry. Cut v0.1.0 and v0.2.0 and show the generated changelog.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'canary-and-rollback-drill',
              title: 'Canary and rollback drill',
              prompt:
                'Expose the ledger report over a tiny HTTP endpoint. Run two versions behind a reverse proxy (nginx, Caddy or a 30-line Python proxy) with 90/10 traffic split; version 2 has a deliberate 5 percent error rate. Write a script that sends 1000 requests and computes per-version error rate, then automatically shifts traffic back to version 1 when the canary exceeds 1 percent. Time the rollback from detection to full recovery.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why order Dockerfile steps with dependencies before code?',
              answerOutline:
                'Layers are cached top-down; code changes often, dependencies rarely, so placing the dependency install first keeps that expensive layer cached across most builds.',
            },
            {
              question: 'How do feature flags change the meaning of "release"?',
              answerOutline:
                'Deploying code and exposing behaviour become separate events; features ship dark and are enabled gradually or turned off instantly without a redeploy.',
            },
            {
              question: 'What makes blue-green rollback fast, and what does it cost?',
              answerOutline:
                'The old version is still running, so rollback is a traffic switch. The cost is double capacity during the transition and care with shared state such as database schema changes.',
            },
          ],
        },
      ],
      project: {
        slug: 'pipeline-end-to-end',
        title: 'Module project: from commit to running container',
        description: `Assemble the full path: a pull request that fails lint cannot merge; a merge to main runs the matrix, builds the wheel and image and publishes a "latest" image; a tag publishes a versioned release with changelog; a deploy workflow runs the image on a free-tier host or a local VM with health checks, and a rollback workflow returns to the previous tag. Document the pipeline with a diagram and measure the time from merge to running.`,
        deliverables: [
          'CI, release and deploy workflows in the repository with a diagram of the stages',
          'Two tagged releases visible with artefacts and generated changelogs',
          'A recorded rollback (logs or screen capture) and the measured merge-to-running time',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add a canary stage with automatic promotion or rollback based on a measured error rate'],
      },
    },
    {
      slug: 'requirements-architecture-and-documentation',
      title: 'Requirements, Architecture and Documentation',
      description:
        'Turning vague requests into testable requirements, recording architecture and the decisions behind it, and writing documentation people can actually use.',
      lessons: [
        {
          slug: 'requirements-and-user-stories',
          title: 'Requirements and user stories',
          summary:
            'Eliciting what is actually needed, writing user stories with acceptance criteria, separating functional from non-functional requirements, and managing scope.',
          estimatedMinutes: 80,
          objectives: [
            'Elicit requirements by asking about goals and constraints rather than features',
            'Write user stories with testable acceptance criteria (Given/When/Then)',
            'Distinguish functional requirements from non-functional (quality) requirements and quantify the latter',
            'Prioritise and slice scope into thin vertical increments',
          ],
          concepts: [
            'Stakeholders, goals and constraints',
            'User story: as a / I want / so that',
            'Acceptance criteria and Given/When/Then',
            'Functional vs non-functional requirements',
            'INVEST criteria for stories',
            'Vertical slicing and MVP',
            'Requirements change; the backlog',
          ],
          explanation: `Most failed software fails before the first line of code: it solves the wrong problem, or the right problem for the wrong user, or the right problem with a non-functional requirement (latency, scale, compliance) nobody wrote down. **Requirements engineering** is the practice of finding out what is needed, writing it down in a form that can be checked, and keeping it current as understanding changes.

Elicitation starts with **goals**, not features. "I want an export button" is a feature; "I need to give my accountant quarterly totals" is a goal, and it might be better served by a scheduled email. Ask who the **stakeholders** are (users, operators, the people who pay, regulators), what each is trying to achieve, and what **constraints** are non-negotiable (budget, deadline, existing systems, law).

The **user story** is the standard unit: *As a* (role), *I want* (capability), *so that* (benefit). The benefit clause is what keeps the story honest. A story is not done until it has **acceptance criteria**: concrete, testable statements, often in Given/When/Then form ("Given a ledger with transactions in March and April, when I request the March report, then only March transactions appear and the total matches their sum"). These criteria become integration tests; that is the link between this module and the testing module. Good stories are **INVEST**: independent, negotiable, valuable, estimable, small, testable.

**Non-functional requirements** are the quiet killers. "Fast" is not a requirement; "the monthly report for 100,000 transactions returns in under 2 seconds on the reference machine" is. The same goes for availability, data retention, security, accessibility and portability. Write them with numbers and they become benchmarks and SLOs.

Scope is managed by **slicing**: deliver thin vertical slices (a little UI, a little logic, a little storage, working end to end) rather than horizontal layers, so that every increment can be shown to a user and the backlog can be reordered as you learn. Read the Mountain Goat user stories guide and the 6.031 reading on specifications for the testable mindset, then write the requirements for your capstone.`,
          resources: [
            {
              title: 'Mountain Goat Software — User Stories: what they are and how to write them',
              url: 'https://www.mountaingoatsoftware.com/agile/user-stories',
              type: 'article',
              cost: 'free',
              provider: 'Mountain Goat Software',
              primary: true,
            },
            {
              title: 'MIT 6.031 — Reading 6: Specifications',
              url: 'https://web.mit.edu/6.031/www/sp21/classes/06-specifications/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'Acceptance criteria are specifications at the feature level; the same rigour applies.',
            },
            {
              title: 'Write the Docs — Software documentation guide',
              url: 'https://www.writethedocs.org/guide/',
              type: 'article',
              cost: 'free',
              provider: 'Write the Docs',
              note: 'Useful here for the section on writing for your audience; reused in the documentation lesson.',
            },
          ],
          exercises: [
            {
              slug: 'capstone-requirements',
              title: 'Requirements for the capstone',
              prompt:
                'Write the requirements document for your capstone project: stakeholders and goals, constraints, 12-20 user stories with acceptance criteria in Given/When/Then, and at least six quantified non-functional requirements. Check every story against INVEST and mark which criteria will become integration tests. Have someone else read it and list every question they still have; revise.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'interview-and-rewrite',
              title: 'From feature request to goal',
              prompt:
                'Take five feature requests (from an open-source issue tracker or invented: "add dark mode", "support PDF export", "make it faster"). For each, write the three questions you would ask the requester to find the underlying goal, then rewrite it as a user story with the benefit clause, and propose one alternative solution to the same goal that is not the requested feature.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'slice-the-backlog',
              title: 'Slice and order the backlog',
              prompt:
                'Order your capstone stories into at least four releasable increments where each increment works end to end and delivers visible value. For each increment state what a user could do with it that they could not before. Identify the story you would cut first if the deadline moved forward by half and justify it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a user story need a "so that" clause?',
              answerOutline:
                'It records the goal, which lets you judge whether the proposed capability actually serves it, suggests alternatives, and helps prioritisation.',
            },
            {
              question: 'What makes a non-functional requirement testable?',
              answerOutline:
                'A number, a measurement method and a context: e.g. p95 latency under 200 ms at 100 requests per second on a stated machine.',
            },
            {
              question: 'What is a vertical slice and why slice that way?',
              answerOutline:
                'A thin increment through every layer (UI to storage) that works end to end; it can be demonstrated, tested and released, and reveals integration problems early.',
            },
          ],
        },
        {
          slug: 'architecture-and-decision-records',
          title: 'Architecture and decision records',
          summary:
            'Describing a system at the right levels of abstraction, the quality attributes that drive architecture, common architectural styles, and recording decisions so the reasoning survives.',
          estimatedMinutes: 100,
          objectives: [
            'Draw a system with the C4 model at context, container and component levels',
            'Identify the quality attributes (modifiability, performance, availability, security) that drive a design and the trade-offs between them',
            'Compare layered, hexagonal (ports and adapters), event-driven and microservice styles and choose for a given situation',
            'Write architecture decision records that capture context, options, decision and consequences',
          ],
          concepts: [
            'Architecture = the decisions that are expensive to change',
            'C4: context, containers, components, code',
            'Quality attributes and trade-offs',
            'Layered and hexagonal architectures',
            'Monolith vs modular monolith vs microservices',
            'Event-driven and message queues',
            'Architecture decision records (ADRs)',
            'Conway\'s law',
          ],
          explanation: `**Architecture** is the set of decisions that will be expensive to change later: how the system is split into deployable parts, how they communicate, where state lives, which quality attributes are prioritised. Everything else is design and can be refactored. Because these decisions are hard to reverse, they deserve explicit reasoning and explicit records.

Describe a system at levels. The **C4 model** gives four: **context** (the system as a box among users and other systems), **containers** (the deployable units: a web app, an API, a database, a queue), **components** (the major modules inside a container) and **code**. Most teams need only the first three, drawn simply with labelled boxes and arrows; the point is a shared picture, not UML orthodoxy.

Architecture is driven by **quality attributes**, and they conflict. Modifiability pushes towards small, decoupled parts; performance pushes towards fewer network hops; availability pushes towards redundancy, which costs consistency; security pushes towards boundaries that cost convenience. Writing down which attributes matter most for *this* system is the real architectural act.

The common **styles** are responses to those pressures. A **layered** architecture (presentation, domain, data) is the default and is fine when kept honest. **Hexagonal** (ports and adapters) puts the domain in the middle with interfaces outward, so databases, UIs and external services are swappable adapters, which is the dependency inversion principle at system scale and makes the core testable. A **modular monolith** keeps one deployable with strict module boundaries, and is the right starting point for almost every new system; **microservices** split deployables for independent scaling and team autonomy at the cost of distributed-systems problems (partial failure, versioned contracts, observability) that you should not pay before you need to. **Event-driven** designs decouple producers from consumers through a queue or log, trading immediacy for resilience.

Every significant choice gets an **architecture decision record**: a short file with the context, the options considered, the decision, and its consequences, numbered and kept in the repository. In a year, the ADR is the only way anyone will know *why*, and whether the reasons still hold. Read the C4 model site and the ADR GitHub organisation's templates, then document your capstone's architecture and the decisions that shaped it.`,
          resources: [
            {
              title: 'The C4 model for visualising software architecture',
              url: 'https://c4model.com/',
              type: 'documentation',
              cost: 'free',
              provider: 'Simon Brown',
              primary: true,
            },
            {
              title: 'Architectural Decision Records (ADR) — templates and tooling',
              url: 'https://adr.github.io/',
              type: 'documentation',
              cost: 'free',
              provider: 'adr.github.io',
              note: 'Use the Nygard template or MADR; keep records in docs/adr/.',
            },
            {
              title: 'Martin Fowler — Software Architecture Guide',
              url: 'https://martinfowler.com/architecture/',
              type: 'article',
              cost: 'free',
              provider: 'martinfowler.com',
              note: 'Entry point to articles on microservices, monolith-first and the role of the architect.',
            },
            {
              title: 'Google SRE Book — Chapter 4: Service Level Objectives',
              url: 'https://sre.google/sre-book/service-level-objectives/',
              type: 'textbook',
              cost: 'free',
              provider: 'Google',
              note: 'Quantifying availability and latency as architecture drivers; revisited in the reliability module.',
            },
          ],
          exercises: [
            {
              slug: 'c4-and-adrs',
              title: 'C4 diagrams and ADRs for the capstone',
              prompt:
                'Draw context, container and component diagrams for your capstone (Structurizr DSL, PlantUML, Mermaid or a drawing tool; keep them in the repository). Write at least five ADRs for decisions already made (storage engine, CLI vs HTTP, packaging, testing strategy, configuration) using a standard template, each with at least two rejected options and explicit consequences.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'hexagonal-refactor',
              title: 'Ports and adapters',
              prompt:
                'Restructure your course project into a hexagonal layout: a core package with no imports from I/O libraries, ports defined as Protocols, and adapters for CSV, SQLite and the CLI. Enforce the rule with an import-linter configuration or your own import-analysis script in CI. Show that the core test suite runs with no file system or database at all.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'style-trade-offs',
              title: 'Choose an architecture for three systems',
              prompt:
                'For (a) a personal finance CLI, (b) a ticketing system for a 200-person company, (c) a video-sharing platform with 10 million users, rank the quality attributes, choose a style (modular monolith, hexagonal, event-driven, microservices), draw the container diagram, and write one ADR each explaining the choice and what would make you change it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What distinguishes an architectural decision from a design decision?',
              answerOutline:
                'Cost of change: architectural decisions (deployment units, communication, data ownership, primary quality attributes) are expensive to reverse; design decisions can be refactored.',
            },
            {
              question: 'Why is a modular monolith usually the right starting point?',
              answerOutline:
                'It gives module boundaries and testability without the distributed-systems costs (partial failure, network latency, contract versioning, operational complexity) of microservices, which can be extracted later along the module seams.',
            },
            {
              question: 'What must an ADR contain to be useful in a year?',
              answerOutline:
                'The context and constraints at the time, the options considered with their trade-offs, the decision, and the consequences, so a reader can judge whether the reasons still apply.',
            },
          ],
        },
        {
          slug: 'documentation-that-works',
          title: 'Documentation that works',
          summary:
            'The four kinds of documentation and why mixing them fails, docs as code, README and API reference, and keeping documentation true.',
          estimatedMinutes: 80,
          objectives: [
            'Classify documentation into tutorials, how-to guides, reference and explanation and write each in its own mode',
            'Write a README that gets a new user to success in five minutes',
            'Generate API reference from docstrings and build a docs site in CI',
            'Keep documentation correct with tested examples and review rules',
          ],
          concepts: [
            'Diátaxis: tutorial, how-to, reference, explanation',
            'README structure',
            'Docs as code: in the repository, reviewed, built in CI',
            'API reference from docstrings (Sphinx, MkDocs)',
            'Doctests and tested examples',
            'Changelogs and migration guides',
            'Documentation debt',
          ],
          explanation: `Documentation fails for a predictable reason: a single document tries to be a tutorial, a reference and a design discussion at once, and serves none of those readers. The **Diátaxis** framework separates four kinds by the reader's need. A **tutorial** is a lesson: it takes a beginner through a concrete, guaranteed-to-work sequence to a first success, explaining as little as possible. A **how-to guide** solves a specific problem for someone who already knows the basics ("how to import from bank X"). **Reference** is dry, complete and structured like the code (every function, every option), consulted not read. **Explanation** discusses why: design rationale, trade-offs, background. Decide which one you are writing before you start, and keep them in separate pages.

The **README** is the one document everyone reads. It should say what the project is in one sentence, show the shortest path to a working result (install, one command, expected output), link to the four kinds of documentation, and state how to contribute and which licence applies. If a new user cannot succeed in five minutes from the README alone, that is a bug.

Treat **docs as code**: documentation lives in the repository next to the code it describes, changes in the same pull request as the behaviour it documents (make it a review checklist item), and is built in CI so broken links and bad markup fail the build. Sphinx or MkDocs generates the reference section from docstrings, which is the main reason to write docstrings as specifications. Make examples **executable**: Python's doctest runs the examples in docstrings as tests, so documentation that drifts from behaviour fails CI instead of lying to users.

Changelogs and migration guides are documentation too, and the ones users read most carefully; the release lesson generates the first and you write the second whenever a major version breaks something. Read the Diátaxis site and the SWE-at-Google documentation chapter, then build your project's documentation site with one page of each kind.`,
          resources: [
            {
              title: 'Diátaxis — a systematic approach to technical documentation',
              url: 'https://diataxis.fr/',
              type: 'article',
              cost: 'free',
              provider: 'Daniele Procida',
              primary: true,
            },
            {
              title: 'Software Engineering at Google — Chapter 10: Documentation',
              url: 'https://abseil.io/resources/swe-book/html/ch10.html',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Google (free online)",
            },
            {
              title: 'Write the Docs — Software documentation guide',
              url: 'https://www.writethedocs.org/guide/',
              type: 'article',
              cost: 'free',
              provider: 'Write the Docs',
            },
            {
              title: 'Sphinx documentation generator',
              url: 'https://www.sphinx-doc.org/en/master/',
              type: 'tool',
              cost: 'free',
              provider: 'Sphinx',
              note: 'Or MkDocs with mkdocstrings; either generates reference pages from docstrings.',
            },
            {
              title: 'Python documentation: doctest — Test interactive Python examples',
              url: 'https://docs.python.org/3/library/doctest.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'four-kinds',
              title: 'One page of each kind',
              prompt:
                'For your course project write a tutorial (new user to first report in under five minutes, every command tested), two how-to guides, generated API reference from docstrings, and one explanation page (why the ledger is immutable, or why SQLite). Build the site in CI with link checking. Have a reader with no context follow the tutorial and record where they got stuck.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'readme-test',
              title: 'The five-minute README test',
              prompt:
                'Rewrite your README to the structure in the lesson. Then test it: on a clean machine or container, follow only the README from a blank shell and time how long until the first successful command. Fix every obstacle and repeat until under five minutes. Record both times.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'executable-docs',
              title: 'Make the examples executable',
              prompt:
                'Add doctest examples to the ten most important public functions and run them in CI with pytest --doctest-modules. Deliberately change one function\'s behaviour and show the documentation now fails the build. Then add a CI check that the tutorial\'s shell commands actually run (a script that extracts and executes fenced code blocks).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should a tutorial avoid explanation?',
              answerOutline:
                'The learner needs a reliable path to a first success; explanation interrupts and overwhelms. Link to explanation pages instead and keep the tutorial concrete and guaranteed to work.',
            },
            {
              question: 'What does "docs as code" change in practice?',
              answerOutline:
                'Docs live in the repository, change in the same PR as code, are reviewed, built and link-checked in CI, and reference is generated from docstrings.',
            },
            {
              question: 'How do you keep documentation examples from going stale?',
              answerOutline:
                'Execute them: doctests for docstring examples, scripts that run tutorial commands in CI, so drift fails the build.',
            },
          ],
        },
      ],
    },
    {
      slug: 'performance-profiling-and-reliability',
      title: 'Performance, Profiling and Reliability',
      description:
        'Measuring before optimising, instrumenting a running system with logs, metrics and traces, and the reliability practices of SLOs, error budgets and blameless postmortems.',
      lessons: [
        {
          slug: 'profiling-and-optimisation',
          title: 'Profiling and optimisation with evidence',
          summary:
            'Measure first: profilers, flame graphs, memory profiling, the common wins, and how to prove an optimisation worked without breaking anything.',
          estimatedMinutes: 100,
          objectives: [
            'Profile CPU time with cProfile and a sampling profiler and read a flame graph',
            'Profile memory with tracemalloc and find allocation hot spots and leaks',
            'Apply the standard optimisations in order: algorithm, data structure, I/O batching, caching, native code',
            'Set a performance budget, write a benchmark that guards it in CI, and present before/after evidence',
          ],
          concepts: [
            'Premature optimisation; measure first',
            'Deterministic vs sampling profilers',
            'Flame graphs',
            'Amdahl\'s law',
            'Memory profiling and leaks',
            'I/O-bound vs CPU-bound; batching and concurrency',
            'Caching and invalidation',
            'Benchmark regression tests',
          ],
          explanation: `Optimisation without measurement makes code uglier and usually no faster, because intuition about where time goes is wrong more often than right. The discipline is: set a target, measure, find the largest contributor, fix only that, measure again, and stop when the target is met.

**Profilers** tell you where time goes. \`cProfile\` is deterministic: it instruments every function call, which is accurate for call counts but inflates the cost of tiny functions. **Sampling profilers** (py-spy, perf) interrupt the program periodically and record the stack; low overhead, works on a running process, and their output is best read as a **flame graph**, where width is time and the widest towers at the top are where to look. **Amdahl's law** bounds what any fix can achieve: if a function is 20 percent of runtime, making it infinitely fast saves 20 percent. Always start with the widest bar.

**Memory** has its own profiler: \`tracemalloc\` snapshots allocations by line and diffs them, which finds both the structure that is bigger than it should be and the leak (a cache that never evicts, a list of callbacks never cleared). Memory problems often *are* speed problems: allocation and garbage collection cost time, and a working set larger than cache costs more.

The fixes come in a standard order of leverage. A better **algorithm or data structure** (the previous subject) gives orders of magnitude. **I/O batching** (one query for 1000 rows, not 1000 queries; buffered reads) gives 10-100x on I/O-bound code, and concurrency (threads or asyncio) helps there, while CPU-bound Python needs processes or native code. **Caching** trades memory for recomputation, and the hard part is invalidation. Only after all of these does **native code** (NumPy vectorisation, Cython, Rust extensions) earn its complexity.

Finally, prove it: a benchmark with the harness from the algorithms subject, run before and after, with the test suite green at both points, and a **benchmark regression test** in CI that fails if the hot path gets slower than its budget. Read the profiling documentation and Brendan Gregg's flame graph page, then profile and optimise the two hottest paths in your project.`,
          resources: [
            {
              title: 'Python documentation: The Python Profilers (cProfile and profile)',
              url: 'https://docs.python.org/3/library/profile.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Brendan Gregg — Flame Graphs',
              url: 'https://www.brendangregg.com/flamegraphs.html',
              type: 'article',
              cost: 'free',
              provider: 'Brendan Gregg',
              note: 'How to read them and the tools that produce them.',
            },
            {
              title: 'py-spy — sampling profiler for Python programs',
              url: 'https://github.com/benfred/py-spy',
              type: 'tool',
              cost: 'free',
              provider: 'GitHub',
              note: 'py-spy record produces a flame graph; py-spy top profiles a live process.',
            },
            {
              title: 'Python documentation: tracemalloc — Trace memory allocations',
              url: 'https://docs.python.org/3/library/tracemalloc.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'profile-the-report',
              title: 'Profile and optimise the report pipeline',
              prompt:
                'Generate a 10^6-row transaction file. Profile the import-and-report pipeline with cProfile and py-spy; save the flame graph. Identify the top three contributors and estimate with Amdahl\'s law the maximum gain from each. Optimise only the largest, re-profile, and repeat twice. Report a table of wall time, peak memory (tracemalloc) and the change made at each step. The test suite must stay green throughout.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'find-the-leak',
              title: 'Find the leak',
              prompt:
                'Write a long-running loop that processes files and grows memory because of a cache keyed by file path that never evicts and a logging handler that keeps a reference to each record. Use tracemalloc snapshots to identify both leaks by line number, fix them (LRU bound, proper handler), and show memory stable over 10,000 iterations.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'benchmark-guard',
              title: 'Benchmark regression test in CI',
              prompt:
                'Add a benchmark for the report hot path (pytest-benchmark or your own harness) with a budget 20 percent above the current time on the CI runner. Make CI fail when a deliberately slow change exceeds the budget. Discuss the noise problem of CI runners and how you set the threshold to avoid flakiness.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does Amdahl\'s law tell you about which function to optimise?',
              answerOutline:
                'The maximum speed-up from optimising a part is bounded by that part\'s share of total time; optimise the largest share first and ignore the rest until it is.',
            },
            {
              question: 'When would you use a sampling profiler over cProfile?',
              answerOutline:
                'For low overhead on production or long-running processes, for native code, and when cProfile\'s per-call instrumentation distorts the profile of many tiny functions.',
            },
            {
              question: 'Why does I/O batching often beat any CPU optimisation?',
              answerOutline:
                'Each I/O round trip costs orders of magnitude more than computation; replacing N round trips with one removes the dominant term for I/O-bound code.',
            },
          ],
        },
        {
          slug: 'observability-logging-metrics-tracing',
          title: 'Observability: logging, metrics and tracing',
          summary:
            'Instrumenting a system so that you can answer questions about its behaviour in production that you did not anticipate: structured logs, the right metrics, and distributed traces.',
          estimatedMinutes: 90,
          objectives: [
            'Configure structured logging with levels, context and correlation IDs, and avoid the common logging mistakes',
            'Define and emit metrics (counters, gauges, histograms) and choose the four golden signals for a service',
            'Explain distributed tracing with spans and context propagation and instrument a request path',
            'Build a dashboard and an alert from metrics and explain what an alert should and should not page on',
          ],
          concepts: [
            'Observability vs monitoring',
            'Structured logging, levels, correlation IDs',
            'Metrics: counter, gauge, histogram; cardinality',
            'The four golden signals: latency, traffic, errors, saturation',
            'Traces, spans, context propagation (OpenTelemetry)',
            'Dashboards and alerting on symptoms',
            'Logging cost and sampling',
          ],
          explanation: `A system in production will do things you did not anticipate, and **observability** is the property that lets you work out what from the outside, using the signals it emits. The three signal types answer different questions and you need all of them.

**Logs** are discrete events with context. Make them **structured** (key-value or JSON, not free text) so they can be searched and aggregated; include a **correlation ID** that follows one request through every component, so you can reconstruct its story; use levels honestly (ERROR means someone should act; INFO is the narrative; DEBUG is off in production). Common mistakes: logging secrets, logging inside hot loops (a log line costs microseconds and disk), string-formatting messages that will be filtered out anyway, and \`except: log; pass\`, which turns a failure into a line nobody reads.

**Metrics** are numbers aggregated over time, cheap to store and ideal for dashboards and alerts. The types are **counters** (requests, errors), **gauges** (queue depth, memory) and **histograms** (latency distribution, from which you read p50/p95/p99; never average latencies). Google's **four golden signals**, latency, traffic, errors and saturation, are the minimum for any service. Beware **cardinality**: a label with a user ID per value creates a time series per user and sinks the metrics store.

**Traces** record one request's path as a tree of **spans** (each with a start, duration and attributes) across services; they answer "why was *this* request slow" when logs and metrics cannot. **OpenTelemetry** is the vendor-neutral standard for all three signals, with context propagation through headers so spans join up across process boundaries.

**Alerts** should fire on symptoms users experience (error rate, latency SLO burn) and not on causes (CPU at 80 percent), and every page must be actionable; alerts that are ignored are worse than none. Read the OpenTelemetry primer and the SRE book's monitoring chapter, then instrument your project's HTTP endpoint and build one dashboard and one alert.`,
          resources: [
            {
              title: 'OpenTelemetry — Observability primer',
              url: 'https://opentelemetry.io/docs/concepts/observability-primer/',
              type: 'documentation',
              cost: 'free',
              provider: 'OpenTelemetry',
              primary: true,
            },
            {
              title: 'Google SRE Book — Chapter 6: Monitoring Distributed Systems',
              url: 'https://sre.google/sre-book/monitoring-distributed-systems/',
              type: 'textbook',
              cost: 'free',
              provider: 'Google',
              note: 'The four golden signals and alerting philosophy.',
            },
            {
              title: 'Python documentation: Logging HOWTO',
              url: 'https://docs.python.org/3/howto/logging.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Prometheus — Overview',
              url: 'https://prometheus.io/docs/introduction/overview/',
              type: 'documentation',
              cost: 'free',
              provider: 'Prometheus',
              note: 'Metric types, the pull model and PromQL basics.',
            },
          ],
          exercises: [
            {
              slug: 'structured-logging',
              title: 'Structured logging with correlation IDs',
              prompt:
                'Replace print and ad-hoc logging in your project with structured JSON logs (standard logging with a JSON formatter or structlog). Add a correlation ID per CLI invocation or HTTP request that appears in every log line, including those from the core library. Write a test that captures logs and asserts that a failed import produces exactly one ERROR with the file name, line number and correlation ID. Measure the overhead of logging at DEBUG inside the parsing loop versus guarded logging.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'golden-signals',
              title: 'Golden signals and a dashboard',
              prompt:
                'Expose Prometheus metrics from the HTTP endpoint: a request counter by route and status, a latency histogram, and a gauge for in-flight requests. Run Prometheus and Grafana locally (docker compose), build a dashboard with the four golden signals, and drive load with a script. Show p50 and p99 latency diverging under load and explain why the average hides it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'trace-a-request',
              title: 'Trace a request',
              prompt:
                'Instrument the endpoint and the core library with OpenTelemetry spans (request, parse, store, report), export to Jaeger or the console exporter, and show a trace of one slow request with the slow span identified. Add an attribute for row count and show how it correlates with span duration across 20 requests.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why report latency as percentiles rather than the mean?',
              answerOutline:
                'Latency distributions are skewed; the mean hides the tail that a meaningful fraction of users experience, while p95/p99 show it directly.',
            },
            {
              question: 'What is metric cardinality and why does it matter?',
              answerOutline:
                'The number of distinct label combinations, each a separate time series; high-cardinality labels (user IDs, request IDs) explode storage and query cost.',
            },
            {
              question: 'Give an example of alerting on a symptom versus a cause and say which is better.',
              answerOutline:
                'Symptom: error rate above 1 percent or p99 latency above SLO (page). Cause: CPU above 80 percent (do not page; it may be fine). Alert on symptoms users feel; use causes for diagnosis.',
            },
          ],
        },
        {
          slug: 'reliability-slos-and-postmortems',
          title: 'Reliability: SLOs, error budgets, incidents and postmortems',
          summary:
            'Defining how reliable a system must be, spending the error budget deliberately, responding to incidents, and learning from failure without blame.',
          estimatedMinutes: 90,
          objectives: [
            'Define SLIs and SLOs for a service and compute an error budget',
            'Explain how an error budget turns reliability into a decision rather than an argument',
            'Run an incident: detection, mitigation, communication, resolution, with defined roles',
            'Write a blameless postmortem with timeline, root causes and tracked action items',
            'Apply defensive patterns: timeouts, retries with backoff and jitter, circuit breakers, graceful degradation',
          ],
          concepts: [
            'SLI, SLO, SLA',
            'Error budget and burn rate',
            'Incident roles and communication',
            'Blameless postmortem',
            'Timeouts, retries, exponential backoff with jitter',
            'Circuit breaker and bulkhead',
            'Graceful degradation and load shedding',
            'Chaos and game days',
          ],
          explanation: `Reliability is a feature with a cost, and the first act of engineering it is deciding how much you need. A **service level indicator** is a measurement (fraction of requests under 300 ms, fraction returning success). A **service level objective** is a target for it over a window (99.9 percent over 30 days). An **SLA** is an SLO with consequences written into a contract. The gap between the SLO and perfection is the **error budget**: at 99.9 percent you may be unavailable for about 43 minutes a month. The budget is to be *spent*: on risky deploys, on experiments, on not building redundancy you do not need. When the budget is exhausted, feature work pauses and reliability work takes over. This converts the eternal argument between "ship it" and "make it safe" into a number both sides agreed to in advance. **Burn-rate** alerts page when the budget is being consumed faster than the window allows.

When something breaks, an **incident** process keeps people effective: one person coordinates, others investigate and communicate, the first goal is **mitigation** (roll back, fail over, shed load), not root cause, and status is communicated at regular intervals. Afterwards, the **blameless postmortem** records the timeline, the contributing causes (there are always several), what went well, and action items with owners and deadlines. Blameless is not soft: it is the only way to get an honest timeline, because people who fear punishment omit the facts that matter. Postmortems are shared and read.

Most incidents are failures of dependencies, and the defensive patterns are mechanical. **Timeouts** on every external call, always. **Retries** only for idempotent operations, with **exponential backoff and jitter** so a thousand clients do not retry in lock-step and finish off the recovering service. A **circuit breaker** stops calling a dependency that is failing, giving it room to recover and failing fast for your callers. **Bulkheads** isolate resource pools so one slow dependency cannot exhaust all threads. **Graceful degradation** serves a reduced answer (cached, partial) instead of an error. Practise these with **game days**: break something deliberately in a controlled setting and run the incident process for real.

Read the SRE book chapters on SLOs and postmortem culture and the Principles of Chaos, then define an SLO for your capstone and run a game day.`,
          resources: [
            {
              title: 'Google SRE Book — Chapter 4: Service Level Objectives',
              url: 'https://sre.google/sre-book/service-level-objectives/',
              type: 'textbook',
              cost: 'free',
              provider: 'Google',
              primary: true,
            },
            {
              title: 'Google SRE Book — Chapter 15: Postmortem Culture: Learning from Failure',
              url: 'https://sre.google/sre-book/postmortem-culture/',
              type: 'textbook',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'Google SRE Book — table of contents (full book free online)',
              url: 'https://sre.google/sre-book/table-of-contents/',
              type: 'textbook',
              cost: 'free',
              provider: 'Google',
              note: 'Also read "Managing Incidents" and "Addressing Cascading Failures".',
            },
            {
              title: 'Principles of Chaos Engineering',
              url: 'https://principlesofchaos.org/',
              type: 'article',
              cost: 'free',
              provider: 'principlesofchaos.org',
            },
          ],
          exercises: [
            {
              slug: 'define-the-slo',
              title: 'Define SLIs, SLOs and the error budget',
              prompt:
                'For your capstone\'s main operation define two SLIs (availability and latency) with exact measurement definitions (which requests count, where measured), choose SLOs with justification, compute the 30-day error budget in minutes and requests, and write burn-rate alert rules for 1-hour and 6-hour windows. Implement the SLI computation from your metrics and show a week of (simulated) data against the budget.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'resilience-patterns',
              title: 'Timeouts, retries, backoff and a circuit breaker',
              prompt:
                'Add a dependency (a currency-rate HTTP service you run locally) to the ledger. Implement a client with timeouts, retries with exponential backoff and full jitter for idempotent calls, and a circuit breaker with half-open probing. Write a fault-injecting fake server (slow, 500s, connection refused) and tests that demonstrate each pattern: retries succeed after transient errors, the breaker opens after N failures and recovers, and jitter spreads 1000 simulated clients\' retry times.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'game-day-and-postmortem',
              title: 'Game day and blameless postmortem',
              prompt:
                'Run a game day: a partner (or a script with a random choice you do not look at) breaks one thing in your deployed project: fills the disk, kills the database, corrupts a config value, or introduces 50 percent latency. Run the incident process with a timeline log, mitigate, then write a blameless postmortem using the SRE template with at least three contributing causes and three action items with owners. Complete one action item and link the pull request.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does an error budget resolve the tension between shipping and reliability?',
              answerOutline:
                'It pre-agrees how much unreliability is acceptable; while budget remains, teams ship freely, and when it is spent, reliability work takes priority. The decision becomes data-driven rather than political.',
            },
            {
              question: 'Why add jitter to exponential backoff?',
              answerOutline:
                'Without it, clients that failed together retry together in synchronised waves (thundering herd); jitter spreads retries so the recovering service is not overwhelmed.',
            },
            {
              question: 'What does "blameless" buy you in a postmortem?',
              answerOutline:
                'Honest, complete timelines and causes, because participants are not defending themselves; the focus shifts to systemic fixes rather than individual error.',
            },
            {
              question: 'Why mitigate before diagnosing during an incident?',
              answerOutline:
                'Users are affected now; rollback or failover restores service quickly, and root-cause analysis can proceed afterwards with preserved evidence.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'shipped-project',
    title: 'Capstone: a multi-week project delivered with CI, tests, docs and a release',
    description: `Take your course project (or a new one of similar scope, around 2,000-5,000 lines) from requirements to a public release as a single engineer would in a professional team. Start with a requirements document and user stories with acceptance criteria. Record the architecture in a C4-style diagram and at least five architecture decision records. Build it in small reviewable pull requests on a trunk-based workflow with a protected main branch.

The test suite must include unit tests, property-based tests, integration tests through the real CLI or HTTP interface, and coverage of at least 85 percent with a mutation score you report honestly. CI must run lint, type check, tests and a build on every push and block merges on failure; a release workflow must tag, build a package or container, generate a changelog from conventional commits and publish an artefact. Documentation must follow Diátaxis with a tutorial, how-to guides, reference generated from docstrings and at least one explanation page. Finally, profile the two hottest paths, record the before/after numbers, add structured logging and metrics, write an SLO for the main user-facing operation, and run a game-day where you break something on purpose and write the postmortem.`,
    deliverables: [
      'Public repository with protected main, CI and release workflows, and a tagged v1.0.0 release artefact',
      'Requirements document, C4 diagrams and ADRs in the repository',
      'Test suite with unit, property-based and integration tests; coverage and mutation reports in CI output',
      'Documentation site following Diátaxis, built in CI',
      'Performance report (before/after profiles), SLO document, and one blameless postmortem from a game-day',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Add a second deployable component (a small HTTP API over the core) with contract tests between the two',
      'Set up a canary or blue-green deployment to a free-tier host with automatic rollback on failed health checks',
      'Run a load test with k6 or Locust and tune until the SLO holds at 10x expected traffic',
    ],
  },
  masteryChecklist: [
    'I can explain Git\'s object model and use branching, rebasing, bisect and the reflog with confidence',
    'I can write a reviewable change and review someone else\'s change against a concrete checklist',
    'I can write specifications, abstract data types with rep invariants, and design modules by information hiding',
    'I can recognise and apply common design patterns, and explain when not to',
    'I can design a test suite across the pyramid with unit, property-based and integration tests, and judge its quality by mutation score rather than coverage alone',
    'I can refactor safely in small steps with tests, and use linters, formatters and type checkers as automated guards',
    'I can build a CI/CD pipeline that lints, tests, packages, versions and releases software reproducibly',
    'I can turn vague requirements into user stories with acceptance criteria and record architecture decisions',
    'I can write documentation that serves tutorials, how-tos, reference and explanation separately',
    'I can profile and optimise a hot path with evidence, instrument a service with logs, metrics and traces, define an SLO and run a blameless postmortem',
  ],
});
