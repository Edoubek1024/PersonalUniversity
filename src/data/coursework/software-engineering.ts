import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org and tick "Add python.exe to PATH". In the project folder run `python -m venv .venv`, then select that interpreter in VS Code so new terminals activate it.',
  'Install Git for Windows, and create a free GitHub account for the pull requests and Actions workflows.',
];

export default defineCoursework({
  subjectId: 'software-engineering',
  machineProblems: [
    {
      slug: 'mp1-twig',
      title: 'twig: a Git-compatible version control core',
      afterModule: 'design-principles-and-patterns',
      coversModules: ['version-control-and-collaboration', 'design-principles-and-patterns'],
      summary: 'Design a small version control tool whose commits match real Git hash for hash, with immutable data types, injected dependencies, pluggable merge strategies and undo.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `The best way to understand Git's model is to build it, and the best way to practise design is on a domain with exact rules. \`twig\` is a small version control tool that writes real Git objects into a real \`.git\` directory. Git itself can read the result: \`git log\` shows your history, \`git fsck --strict\` passes, and your commit hashes match the ones Git produces for the same content, digit for digit.

That compatibility is a strict and impartial specification. You cannot wave your hands about whether a tree is correct, because one misplaced byte changes the hash.

The real subject of this MP is design. A blob, a tree and a commit are abstract data types with specifications and rep invariants. The object store hides how objects reach the disk, so the same \`Repository\` code runs against a folder or against memory. Merge policy is a strategy. Undo is a command. Errors have a hierarchy. \`docs/DESIGN.md\` must name the secret each module hides and the patterns you considered and rejected.

**Constraints.** Use only the standard library in \`src/\`, including \`hashlib\` and \`zlib\`, and never call the \`git\` program there. Tests may call \`git\` to check your work. Read and write files as bytes, so that line endings are never altered. Support only file mode \`100644\` and directories, since Windows has no executable bit. The staging area is your own simple file, \`.git/twig-index\`, rather than Git's binary index, so \`git status\` will not be meaningful in a twig repository. Everything else follows Git's on-disk format. Do the work in this repository's own Git history, with atomic commits, because that history is part of what you hand in.`,
      setup: {
        extensions: [...pythonExtensions, 'ms-python.debugpy'],
        toolchain: [
          ...pythonToolchain,
          'Install the test tools with `pip install -e ".[dev]"`. Set `git config core.autocrlf false` in any repository your tests compare against, so that Git for Windows does not rewrite line endings.',
        ],
        structure: `twig/
├── src/twig/objects.py    # Blob, Tree, Commit: immutable ADTs with check_rep
├── src/twig/store.py      # ObjectStore base class, FileStore, MemoryStore
├── src/twig/refs.py       # HEAD, branches, reflog
├── src/twig/graph.py      # history walks and merge base
├── src/twig/merge.py      # three-way tree merge and strategies
├── src/twig/commands.py   # undoable commands
├── src/twig/repo.py       # Repository facade
├── src/twig/errors.py     # TwigError hierarchy
├── src/twig/cli.py        # thin argparse layer
├── tests/                 # including tests that compare with real Git
├── docs/DESIGN.md         # modules and secrets, ADTs, patterns, API policy
├── docs/BISECT.md         # a recorded git bisect run session
├── CHANGELOG.md
└── pyproject.toml`,
        commands: [
          { label: 'Install in editable mode', command: 'pip install -e ".[dev]"' },
          { label: 'Run the tests', command: 'pytest' },
          { label: 'Make a commit with twig', command: 'twig commit -m "first commit"' },
          { label: 'Read twig history with real Git', command: 'git log --oneline --graph --all' },
          { label: 'Check the repository with real Git', command: 'git fsck --strict' },
          { label: 'Find a seeded bug by bisection', command: 'git bisect run pytest -x -q' },
        ],
      },
      requirements: [
        '`Blob`, `Tree` and `Commit` are immutable. Each has a documented specification, a `check_rep` for its rep invariant, and `serialize` and `parse` methods that are inverses.',
        'An object ID is the SHA-1 of `<type> <size>\\0<content>`. `FileStore` writes zlib-compressed loose objects to `.git/objects/ab/cdef...`, and it never rewrites an existing object.',
        'Tree entries follow Git\'s order, in which a directory name sorts as if it ended in `/`. The rep invariant rejects duplicate names and unsorted entries.',
        '`ObjectStore` is an abstract base class, and `FileStore` and `MemoryStore` pass one shared test suite. `Repository` receives its store, refs and clock through its constructor, and `repo.py` imports no file-handling code.',
        '`twig init` creates a valid `.git` directory. HEAD and branches are stored in Git\'s own files, and every ref move appends a line to `.git/logs/HEAD` in Git\'s reflog format. Author and committer come from the standard `GIT_AUTHOR_*` and `GIT_COMMITTER_*` variables.',
        '`twig log` follows first parents from HEAD, `twig branch` and `twig checkout` work, and `merge_base(a, b)` returns a best common ancestor on any commit graph, including graphs with earlier merges.',
        '`twig merge` fast-forwards when it can, and otherwise merges at file level: a path changed on one side takes that side, and a path changed differently on both sides is a conflict. The conflict policy is a plain function chosen with `--strategy=manual`, `ours` or `theirs`.',
        '`twig undo` is implemented with a Command object and moves the branch to its previous reflog position, keeping all objects, so a mistaken commit or merge can be recovered.',
        'All expected failures derive from `TwigError`, and low-level exceptions are wrapped using `raise ... from`. The CLI prints a one-line message and exits 1, never a traceback. The public API is listed in `__all__`, and `CHANGELOG.md` follows semantic versioning.',
        '`docs/DESIGN.md` covers each module\'s secret, the rep invariants, and the patterns used and rejected. The repository history has at least three merged pull requests of atomic commits, and `docs/BISECT.md` records `git bisect run` finding a bug you seeded.',
      ],
      acceptanceTests: [
        'The ID of the blob `hello\\n` is `ce013625030ba8dba906f756967f9e9ca394464a`, of the empty blob is `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`, and of the empty tree is `4b825dc642cb6eb9a060e54bf8d69288fbee4904`.',
        'With author and committer `Ada Lovelace <ada@example.com>` and date `1700000000 +0000`, committing `hello.txt` containing `hello\\n` and `src/a.py` containing `x = 1\\n` with message `first commit`, stored with a trailing newline as Git does, gives tree `6c168a82bd9a9babdb3d7eeb3e0ca40aaed6e748` and commit `ed9898ec53c7987f964c6ef302b4692398747309`. Changing `hello.txt` to `hello\\nworld\\n` and committing `second commit` at `1700000060 +0000` gives tree `203065eaf25a52e4990f31c01a10a6d3b372a5a5` and commit `3a98aeb2245dbdf6442161be03272aa60f0b34b5`. Then `git fsck --strict` reports no errors, and `git log` shows both messages.',
        'A tree with `a.txt`, `a/b.txt` and `a0.txt` lists its entries as `a.txt`, `a`, `a0.txt` and has the ID `1c44d02181b6632ce0323948132fd13c8dd25e2d`, given file contents `1\\n`, `2\\n` and `3\\n`. Sorting by plain name instead makes `git fsck --strict` fail with `treeNotSorted`.',
        'Starting from A then B on `main`, with C on `feature` adding `g.txt` and D on `main` adding `h.txt`: `merge_base` returns B, and `twig merge feature` makes a commit with two parents whose tree has all the files. Merging a branch that is strictly ahead moves the ref and creates no commit.',
        'When `f.txt` is `a\\n` at the base, `b\\n` on `main` and `c\\n` on `feature`, `--strategy=manual` exits 1, writes conflict markers and creates no commit. `ours` commits `b\\n`, and `theirs` commits `c\\n`.',
        'After three commits, `twig undo` moves `main` to the second commit, `git reflog` shows the move, and `git cat-file -t` on the third still prints `commit`. A full commit-and-merge flow passes on `MemoryStore` with `builtins.open` patched to raise, and flipping one byte of a stored object raises `CorruptObjectError` rather than `zlib.error`.',
      ],
      resources: [
        {
          title: 'Pro Git: Git Objects',
          url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects',
          type: 'textbook',
          cost: 'free',
          provider: 'Scott Chacon and Ben Straub',
          note: 'Shows the exact bytes of blob, tree and commit objects. The Object Storage section walks through the header, hash and compression steps.',
        },
      ],
      stretchGoals: [
        'Add line-level three-way merging using `difflib`, and compare the results with `git merge-file`.',
        'Read packed objects, so that twig can open a repository that Git has garbage-collected.',
        'Add `twig bisect` on top of your own graph walks.',
      ],
    },
    {
      slug: 'mp2-pennant',
      title: 'pennant: a feature-flag service and its delivery pipeline',
      afterModule: 'build-ci-cd-and-deployment',
      coversModules: ['testing-strategy', 'code-quality-and-refactoring', 'build-ci-cd-and-deployment'],
      supersedesProject: true,
      summary: 'Build a small feature-flag service with a rule language and sticky percentage rollouts, then ship it through a pipeline with gated merges, tagged releases, zero-downtime deploys and rollback.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Teams that deploy many times a day separate deploying code from releasing a feature, and feature flags are how they do it. \`pennant\` is a small self-hosted flag service. It stores flags, evaluates a targeting rule such as \`plan in ["pro", "team"] and not country == "US"\`, and rolls a feature out to a stable percentage of users.

The service is deliberately small. Its core has real logic that rewards good tests: a parser, an evaluator and a hash-based bucketing function, all pure. Around that core you build what this part of the course is about: a test suite with measured strength, strict static analysis, and a pipeline from pull request to a running container that a colleague could trust.

Bucketing is exact, so that tests can check it. \`bucket(flag, user)\` takes the first 8 hex digits of the SHA-256 of \`flag:user\` in UTF-8, reads them as an integer, and takes it modulo 100. A user is in the rollout when \`bucket < rollout\`. Evaluation returns a reason, checked in this order: \`unknown_flag\`, \`disabled\`, \`rule_miss\`, \`rollout_miss\`, \`match\`. Only the last one enables the feature.

**Constraints.** \`pennant.core\` is pure Python with no I/O imports, and it is the target for coverage and mutation testing. FastAPI and SQLite live outside it. The deployment target is free: Docker on your own machine and on the GitHub Actions runner, with images on GitHub Container Registry. Use a public repository, so that branch protection and Actions are free.`,
      setup: {
        extensions: [...pythonExtensions, 'ms-azuretools.vscode-docker', 'github.vscode-github-actions', 'redhat.vscode-yaml'],
        toolchain: [
          ...pythonToolchain,
          'Install Docker Desktop with the WSL 2 backend, which is free for personal use.',
          'Install the project with `pip install -e ".[dev]"`, and use `pip-compile --generate-hashes` from pip-tools for the lock file.',
          '`mutmut` relies on `fork`, so run it in WSL 2 with Ubuntu or let the Ubuntu CI job run it.',
        ],
        structure: `pennant/
├── src/pennant/core/rollout.py   # bucketing, pure functions
├── src/pennant/core/rules.py     # rule parser, printer, evaluator
├── src/pennant/core/flags.py     # Flag type and evaluation order
├── src/pennant/store.py          # SQLite repository, plus an in-memory fake
├── src/pennant/api.py            # FastAPI application
├── tests/unit/  tests/property/  tests/integration/
├── deploy/compose.yaml           # proxy, blue and green services
├── deploy/deploy.py              # blue-green switch with a health gate
├── deploy/rollback.py
├── Dockerfile
├── .github/workflows/            # ci.yml, release.yml, deploy.yml
├── docs/PIPELINE.md              # stage diagram and measured timings
├── pyproject.toml
└── requirements.lock`,
        commands: [
          { label: 'Install in editable mode', command: 'pip install -e ".[dev]"' },
          { label: 'Run the unit and property tests', command: 'pytest -m "unit or property"' },
          { label: 'Run all tests with branch coverage', command: 'pytest --cov=pennant.core --cov-branch --cov-fail-under=85' },
          { label: 'Lint and check formatting', command: 'ruff check . ; ruff format --check .' },
          { label: 'Type-check strictly', command: 'mypy --strict src' },
          { label: 'Build the image', command: 'docker build -t pennant:dev .' },
          { label: 'Start the local environment', command: 'docker compose -f deploy/compose.yaml up -d' },
          { label: 'Deploy a tagged version', command: 'python deploy/deploy.py v1.1.0' },
        ],
      },
      requirements: [
        '`bucket` follows the definition above, and rollout is an integer from 0 to 100. A test using `ast` fails the build if `pennant.core` imports `fastapi`, `sqlite3`, `os` or `socket`.',
        'The rule language has `and`, `or`, `not`, parentheses, the comparisons `==`, `!=`, `<`, `<=`, `>`, `>=`, and `in` with a list of literals. `parse`, `to_text` and `evaluate` are separate functions, a syntax error reports its column, and a comparison on a missing attribute is false.',
        'The API offers `PUT`, `GET` and `DELETE /flags/{key}`, `POST /evaluate`, `GET /healthz` returning the status and version, and `GET /readyz` returning 503 when the database is unreachable. A bad rule or rollout returns 422.',
        'Storage is SQLite behind a small interface with an in-memory fake, the clock is injected, and configuration comes only from environment variables.',
        'Tests run separately by marker as unit, property and integration. Integration tests are hermetic and use a temporary database. Branch coverage of `pennant.core` is at least 85 percent and fails the build below that, and the mutation score on `pennant.core` is at least 80 percent, with surviving mutants explained.',
        '`ruff check`, `ruff format --check` and `mypy --strict` pass in pre-commit and in CI, and any `noqa` or `type: ignore` carries a comment giving its reason.',
        'The package uses a `src` layout with a `pennant` console script and a hash-pinned lock file. The image is a multi-stage build from a pinned base, runs as a non-root user, has a `HEALTHCHECK`, and is under 250 MB.',
        'Pull requests run lint, types and tests on Ubuntu and Windows with Python 3.12 and 3.13, using dependency caching and finishing in under 10 minutes. Those checks are required by branch protection on `main`.',
        'A merge to `main` publishes `ghcr.io/<you>/pennant:latest` and a `sha-` tag. A `v*.*.*` tag publishes a versioned image and a GitHub Release with the wheel and a changelog generated from conventional commits.',
        '`deploy/deploy.py` starts the idle colour, waits for `/readyz`, switches the proxy and keeps the old colour running. It exits 1 and leaves traffic alone if the new version is not ready. `deploy/rollback.py` returns to the previous tag. `deploy.yml` runs the same scripts on the runner, and `docs/PIPELINE.md` has a stage diagram and the measured time from merge to running.',
      ],
      acceptanceTests: [
        'For flag `new-checkout`, `user-42` has bucket 0, `user-1` has 83, and `user-3` has 40, so `user-3` is out at rollout 40 and in at 41. Among `user-0` to `user-9999`, exactly 91 are in at rollout 1, 2,466 at 25, 4,933 at 50, none at 0, and all 10,000 at 100.',
        '`plan in ["pro", "team"] and not country == "US"` is true for `{plan: pro, country: CA}`, false for `{plan: pro, country: US}`, false for `{plan: free, country: CA}`, and false when `plan` is missing. `plan in ["pro"` is a syntax error at column 15.',
        'Hypothesis shows that `parse(to_text(r)) == r` for generated rules, that raising a rollout never removes a user, and, in a stateful test, that the store and a plain dictionary agree after any sequence of put, get and delete.',
        'Through HTTP, `POST /evaluate` returns the reasons `unknown_flag`, `disabled`, `rule_miss`, `rollout_miss` and `match` for five prepared cases, `enabled` is true only for `match`, and `PUT` with rollout 101 or the rule `plan ==` returns 422.',
        'A pull request with a ruff violation shows a failed required check and cannot be merged. Pushing `v1.0.0` produces a GitHub Release with a wheel that installs into a clean virtual environment, where `pennant --version` prints 1.0.0. `docker run` on the published image serves `/healthz` with `{"status": "ok", "version": "1.0.0"}`.',
        'While a probe sends 20 requests per second, deploying `v1.1.0` over `v1.0.0` causes 0 failed requests. Deploying an image whose `/readyz` returns 503 exits 1 and leaves `/healthz` reporting 1.1.0. `deploy/rollback.py` then returns `/healthz` to 1.0.0 in under 30 seconds.',
      ],
      resources: [
        {
          title: 'FastAPI: Testing',
          url: 'https://fastapi.tiangolo.com/tutorial/testing/',
          type: 'documentation',
          cost: 'free',
          provider: 'FastAPI',
          note: 'Shows `TestClient`, which is what the hermetic integration tests need.',
        },
      ],
      stretchGoals: [
        'Add a canary mode that sends 10 percent of traffic to the new colour and promotes it after a clean five minutes.',
        'Scan the image and locked dependencies in CI with `pip-audit` and Trivy, and fail on known high-severity issues.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-churnmap',
    title: 'churnmap: find the riskiest code in any Git repository',
    repoName: 'churnmap',
    summary: 'Ship a tool that any developer can install in one line and point at a repository to find its hotspots, hidden coupling and bus-factor risks, delivered with design records, CI/CD, a documentation site and a public release.',
    language: 'Python 3.12',
    estimatedHours: 55,
    overview: `Every long-lived codebase has a few files where bugs gather, changes collide and only one person knows how things work. Git already holds the evidence. \`churnmap\` extracts it. A stranger should be able to run \`pipx install churnmap\`, type \`churnmap scan\` in any repository, and within seconds see the files that change most and are largest, the files that secretly change together, and the code that one person owns alone. \`churnmap review main..HEAD\` then tells a pull request author which touched files are risky and who should review them.

The definitions are simple and exact. A file's **hotspot score** is its commit count multiplied by its non-blank lines at HEAD. **Coupling** between two files is shared commits divided by commits touching either one (Jaccard similarity). **Bus factor** is the smallest number of authors who together made more than half of a file's commits. Analysis skips merge commits and any commit touching more than 50 files, and it follows renames.

This project is about process as much as code, and the process is graded. You work as a single engineer on a professional team. Requirements come first. Decisions go in ADRs. Everything lands through small pull requests on a protected \`main\`. The test suite has several layers and is measured. CI gates every change, and a release is one tag. The documentation is a real site whose tutorial is run by CI. You profile with evidence, write an SLO, and run a game day on purpose, then write the blameless postmortem.

The final check is the only one that really matters for a release: someone who has never seen the project installs it from the public index on their own machine and gets a useful result. Keep the code to about 2,000-5,000 lines. If the name \`churnmap\` is taken on PyPI when you publish, choose another.`,
    setup: {
      extensions: [...pythonExtensions, 'github.vscode-github-actions', 'redhat.vscode-yaml', 'tamasfe.even-better-toml'],
      toolchain: [
        ...pythonToolchain,
        'Install the project with `pip install -e ".[dev]"`, which brings in pytest, Hypothesis, coverage, ruff, mypy, import-linter and MkDocs.',
        '`mutmut` relies on `fork`, so run it in WSL 2 with Ubuntu or let the Ubuntu CI job run it.',
        'Publishing uses free accounts on TestPyPI and PyPI, with trusted publishing from GitHub Actions rather than stored passwords.',
      ],
      structure: `churnmap/
├── src/churnmap/core/         # pure metrics: hotspots, coupling, bus factor
├── src/churnmap/ports.py      # Protocols for history, cache and output
├── src/churnmap/adapters/     # git log parser, SQLite cache, table, JSON, HTML
├── src/churnmap/cli.py
├── tests/unit/  tests/property/  tests/integration/
├── bench/gen_repo.py          # synthetic repository built with git fast-import
├── docs/                      # MkDocs site: tutorial, how-to, reference, explanation
├── docs/requirements.md       # stories, acceptance criteria, quality targets
├── docs/architecture/         # C4 diagrams and ADRs
├── docs/operations/           # SLO, profiles, game-day postmortem
├── action.yml                 # reusable GitHub Action
├── .github/workflows/         # ci.yml, release.yml, docs.yml, smoke.yml
├── pyproject.toml
└── CHANGELOG.md`,
      commands: [
        { label: 'Install in editable mode', command: 'pip install -e ".[dev]"' },
        { label: 'Scan a repository', command: 'churnmap scan . --top 10' },
        { label: 'Write the HTML report', command: 'churnmap scan . --format html --out report.html' },
        { label: 'Review a branch', command: 'churnmap review main..HEAD' },
        { label: 'Run all tests with branch coverage', command: 'pytest --cov=churnmap --cov-branch --cov-fail-under=85' },
        { label: 'Run the static checks', command: 'ruff check . ; mypy --strict src ; lint-imports' },
        { label: 'Preview the documentation', command: 'mkdocs serve' },
      ],
    },
    requirements: [
      '`docs/requirements.md` has stakeholders, at least 8 user stories with Given/When/Then criteria, and numeric quality targets. `docs/architecture/` has C4 context, container and component diagrams and at least 5 ADRs.',
      '`churnmap scan` reports hotspots, coupled pairs with at least 3 shared commits and a Jaccard value of at least 0.5, and bus factor, using the definitions above. It takes `--since` and `--top` and exits 2 on a path that is not a repository.',
      '`churnmap review <base>..<head>` lists each changed file with its risk and up to two suggested reviewers, excluding the authors of the change. `--format` offers table, JSON and a single self-contained HTML file that makes no network requests.',
      'The architecture is hexagonal: `core` imports no I/O, adapters sit behind Protocols, and import-linter enforces this in CI. Extra metrics plug in through a `churnmap.metrics` entry point, documented as a versioned public API.',
      'A SQLite cache makes repeat scans incremental. It rebuilds automatically after a force-push, and a corrupted cache is replaced with a warning rather than a crash. `git` calls have timeouts, and a missing `git` gives a clear message.',
      'The suite has unit tests, Hypothesis tests of the log parser and metrics, and integration tests that drive the real CLI against hermetic repositories built in temporary folders. Branch coverage is at least 85 percent, and the mutation score on `core` is reported in CI output.',
      'All work lands through small pull requests on a protected `main` with conventional commits. CI runs ruff, `mypy --strict`, import-linter, the tests on Windows, macOS and Linux, and the docs build, with all of them required. CI also runs churnmap on its own repository and uploads the report.',
      'One `v*.*.*` tag builds the wheel and sdist, publishes to TestPyPI, runs an install smoke test on all three operating systems, publishes to PyPI by trusted publishing, and creates a GitHub Release with a generated changelog. `action.yml` lets another repository use churnmap in a few lines.',
      'The documentation site on GitHub Pages follows Diátaxis, with a tutorial, at least two how-to guides, reference generated from docstrings, and an explanation of the metrics and their limits. CI executes every command in the tutorial and checks links.',
      '`docs/operations/` holds before and after profiles of the two hottest paths with a benchmark regression test, an SLO for `scan` with its error budget, and the postmortem of a game day. `--log-format json` emits structured logs with a run ID, and `--metrics-out` writes counters and histograms.',
    ],
    acceptanceTests: [
      'In a fixture repository where `a.py` has 10 lines and 8 commits, `b.py` has 50 lines and 2 commits, and `c.py` has 5 lines and 1 commit, `scan --format json` gives hotspot scores of 100, 80 and 5, in the order `b.py`, `a.py`, `c.py`.',
      'When `api.py` has 4 commits and `client.py` has 3, all 3 of them shared with `api.py`, coupling is 0.75. Files with commits by authors in the ratios 6:3:1, 5:3:2 and 4:4:2 have bus factors of 1, 2 and 2.',
      'A file changed in 3 commits as `old.py`, renamed in a fourth with `git mv`, then changed in 2 more as `new.py` is reported once, as `new.py` with 6 commits. A merge commit adds nothing to any file\'s count. A commit touching 51 files is skipped, and one touching 50 is counted. A commit with a Latin-1 author name is processed without error, using a replacement character.',
      'In `review main..feature`, when Alice authored the branch and `api.py` has history from Alice (5), Bob (3) and Carol (1), the suggested reviewers are Bob then Carol. An empty repository prints a friendly message and exits 0, and a folder that is not a repository exits 2 with no traceback.',
      'On a generated repository of 20,000 commits, `bench/gen_repo.py --commits 20000`, a cold `scan` finishes in under 20 seconds and a repeat scan in under 2 seconds. After one new commit, only that commit is parsed. Truncating the cache file produces a warning and the same results as a clean run.',
      'A scheduled `smoke.yml` runs `pipx install churnmap==1.0.0` from the public index on `windows-latest`, `macos-latest` and `ubuntu-latest`, then clones a public repository and runs `churnmap scan`, and it passes on all three. At least one person who has never seen the project follows the README and tutorial while you watch silently, and what they got stuck on is recorded and fixed.',
    ],
    coverage: [
      { module: 'version-control-and-collaboration', demonstrates: 'The tool mines the commit graph itself, and the project history shows atomic commits, small pull requests and protected trunk-based work.' },
      { module: 'design-principles-and-patterns', demonstrates: 'The metric types have specifications and invariants, adapters and strategies keep modules decoupled, and the plugin API is versioned.' },
      { module: 'testing-strategy', demonstrates: 'Unit, Hypothesis and hermetic integration layers are measured with branch coverage and a mutation score reported in CI.' },
      { module: 'code-quality-and-refactoring', demonstrates: 'Ruff, strict mypy and import-linter gate every change, and churnmap\'s own report picks the refactoring targets in its code.' },
      { module: 'build-ci-cd-and-deployment', demonstrates: 'A single tag takes the code through build, TestPyPI, multi-platform smoke tests, PyPI trusted publishing and a GitHub Release.' },
      { module: 'requirements-architecture-and-documentation', demonstrates: 'User stories, C4 diagrams, ADRs and a tested Diátaxis site record what was built and why.' },
      { module: 'performance-profiling-and-reliability', demonstrates: 'Evidence-based profiling, structured logs and metrics, an SLO with an error budget, and a game-day postmortem show operational care.' },
    ],
    portfolio: [
      'The README opens with the one-line install and a screenshot of a report on a well-known open-source repository, with badges for CI, the PyPI version and the docs.',
      'The project has a published `v1.0.0` on PyPI, a GitHub Release with a changelog, a LICENSE, and a CONTRIBUTING guide that explains the workflow.',
      'The documentation site is live on GitHub Pages, and the README links directly to its five-minute tutorial.',
      '`docs/architecture/` and `docs/operations/` are linked from the README, so a reader can see the ADRs, the SLO and the postmortem as evidence of how you work.',
      'The protected `main` branch and the closed pull requests are public, so anyone can read the review trail behind each change.',
      'A short write-up presents what churnmap found on two or three well-known repositories, with the findings checked against their issue trackers.',
    ],
    stretchGoals: [
      'Compare a hotspot score with bug-fix commits and report how well it predicts where the next fixes land.',
      'Add language-aware complexity using `tree-sitter`, and show whether it ranks hotspots better than line counts.',
      'Have the GitHub Action post the review as a pull request comment.',
    ],
    resources: [
      {
        title: 'PyPI: Trusted Publishers',
        url: 'https://docs.pypi.org/trusted-publishers/',
        type: 'documentation',
        cost: 'free',
        provider: 'PyPI',
        note: 'Publish from GitHub Actions with no stored token. Set up TestPyPI first.',
      },
      {
        title: 'Diátaxis',
        url: 'https://diataxis.fr/',
        type: 'documentation',
        cost: 'free',
        provider: 'Daniele Procida',
        note: 'The structure the documentation site follows. Read the compass page first.',
      },
    ],
  },
});
