import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org and tick "Add python.exe to PATH". In the project folder run `python -m venv .venv`, then select that interpreter in VS Code so new terminals activate it.',
  'Install Git for Windows, and create a free GitHub account.',
];

export default defineCoursework({
  subjectId: 'data-management-reproducibility',
  machineProblems: [
    {
      slug: 'mp1-hashshelf',
      title: 'hashshelf: a content-addressed snapshot store for the case study',
      afterModule: 'research-artifacts',
      coversModules: ['data-science-life-cycle', 'research-artifacts'],
      summary: 'Build a small tool that freezes raw downloads in a content-addressed store with manifests and fixity checks, then use it to turn the two case study sources into tested, tidy tables.',
      language: 'Python 3.12',
      estimatedHours: 12,
      overview: `The URL still works, but is it the same file? \`hashshelf\` answers that for the running case study. It is a small command-line tool in the spirit of Git's object store and DVC: it downloads or adds files, stores each one under the SHA-256 of its bytes, and writes a manifest that names a snapshot. The manifest is small and goes into Git, while the bytes stay out of it, so that a commit pins an exact version of the data.

On top of the store you build the tidy layer for the ozone and heat case study. Two raw sources become two tidy tables with tested keys, explicit units and identifiers that keep their leading zeros, plus a joined table of one row per day in Cook County.

**Constraints.** Use only the standard library, pandas and pyarrow. The store must never modify a stored object. Hash files as bytes, in chunks. Keep \`data/raw\`, \`data/tidy\` and \`.hashshelf\` out of Git. You may not use anything from later modules: no schema tools, workflow managers or lockfiles yet. A plain \`requirements.txt\` is fine for now, and you will fix that in MP 2.

**Frozen snapshot.** Both sources change. GHCN grows daily, and AirData files are edited after release. So your numbers may drift from those below, which were measured on files downloaded on 2026-11-02. That is why tests use ranges for real data and exact values only for fixtures. Keep your own snapshot, and record any difference in \`docs/DRIFT.md\`.`,
      setup: {
        extensions: [...pythonExtensions, 'mechatroner.rainbow-csv'],
        toolchain: [
          ...pythonToolchain,
          'Install pandas, pyarrow and pytest in the virtual environment with `pip install pandas pyarrow pytest`.',
        ],
        structure: `ozone-heat/
├── src/hashshelf/store.py     # content-addressed object store
├── src/hashshelf/manifest.py  # snapshot manifests and IDs
├── src/hashshelf/cli.py       # add, fetch, verify, diff, restore
├── src/tidy_ozone.py
├── src/tidy_weather.py
├── src/join_days.py
├── tests/
├── data/raw/                 # restored from the store, never edited
├── data/tidy/                # generated
├── snapshots/                # manifests, committed to Git
├── artifacts.csv             # the artifact inventory
├── docs/LIFECYCLE.md
├── docs/DRIFT.md
└── README.md`,
        commands: [
          { label: 'Fetch a raw file into the store', command: 'python -m hashshelf.cli fetch https://aqs.epa.gov/aqsweb/airdata/daily_44201_2023.zip --as raw/daily_44201_2023.zip' },
          { label: 'Create a snapshot', command: 'python -m hashshelf.cli snapshot --tag 2026-11-02' },
          { label: 'Verify every object', command: 'python -m hashshelf.cli verify' },
          { label: 'Compare two snapshots', command: 'python -m hashshelf.cli diff 2026-11-02 2026-12-01' },
          { label: 'Build the tidy tables', command: 'python src/join_days.py' },
          { label: 'Run the tests', command: 'pytest' },
        ],
      },
      requirements: [
        'Objects live at `.hashshelf/objects/<first two hex digits>/<remaining hex digits>`, named by the SHA-256 of their bytes. Adding identical content twice stores one object. Files are written to a temporary name and then renamed, so that an interrupted run leaves no partial object.',
        'A snapshot ID is the first 12 hex digits of the SHA-256 of the UTF-8 text made of one line per file, sorted by logical path, in the form `<sha256>  <path>\\n` with two spaces. It does not depend on retrieval time.',
        'A manifest in `snapshots/<tag>.json` records the snapshot ID and, per file, its logical path, SHA-256, byte size, source URL and UTC retrieval time, written with sorted keys, two-space indent and LF line endings.',
        '`verify` rehashes each object and exits 1 naming every mismatch. `diff A B` lists paths added, removed and changed. `restore <tag>` writes files to `data/raw`, and refuses to overwrite a file whose hash differs unless given `--force`.',
        '`tidy_ozone` keeps state 17 and county 031, May to September, and rows with `Observation Percent` of at least 75. It reads identifier columns as strings, and writes `site_id` as `17-031-0032`, with columns `site_id`, `poc`, `date`, `o3_ppm`, `obs_pct`, `site_name` and the primary key (`site_id`, `poc`, `date`).',
        '`tidy_weather` strips the padding from `TMAX`, converts tenths of a degree to `tmax_c` in exactly one function, and writes one row per date for the same months and years.',
        '`join_days` produces one row per date with `o3_max_ppm` (the highest `o3_ppm` that day), `n_sites` and `tmax_c`. It uses `validate="one_to_one"`, and asserts that no `tmax_c` is missing.',
        'Each tidy table is written as Parquet for work and as CSV with LF endings for archiving, and a test proves that `site_id` values survive the round trip through both.',
        '`artifacts.csv` lists at least 12 artifacts with `id`, `path`, `kind`, `origin`, `regenerate_with`, `keep` and `terms`. `docs/LIFECYCLE.md` maps each life cycle stage to its artifacts and owner.',
        'A `pytest` test enforces a file naming convention across the project, and deleting `data/tidy` then rerunning the build restores identical CSV bytes.',
      ],
      acceptanceTests: [
        'Fixture hashes: the empty file is `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`, and `hello\\n` is `5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03`. The object for `hello\\n` is stored at `.hashshelf/objects/58/91b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03`, and adding it twice leaves one object.',
        'Files `raw/a.txt` containing `a\\n` and `raw/b.txt` containing `b\\n` give snapshot ID `bf563dcddb51`. Changing `raw/b.txt` to `b!\\n` and adding `raw/c.txt` containing `c\\n` gives `14a5782ac39c`, and `diff` reports one added file, one changed file and none removed. Adding the same files in a different order gives the same ID.',
        'Flipping one byte in a stored object makes `verify` exit 1 and name that object. Restoring over a modified file without `--force` exits non-zero and leaves the file alone.',
        'On real data, measured on the 2026-11-02 download: Cook County has 2,511 rows for 2022 and 2,491 for 2023, 2,977 rows fall in May to September, 10 are dropped for completeness, leaving 2,967 rows at 10 distinct sites with no duplicate key. Accept 2,900 to 3,050 kept rows and exactly 10 sites, and explain any difference in `docs/DRIFT.md`. Two distinct `site_id` values must have the name `COOK COUNTY TRAILER`.',
        '`weather` has 306 rows with `tmax_c` from 10.0 to 37.8, mean 26.55 (accept 26.4 to 26.7). `days` has 306 rows, `n_sites` between 8 and 10, and `o3_max_ppm` from 0.021 to 0.099 (accept a maximum from 0.095 to 0.105). The highest day is 2023-07-25.',
        'Loading the raw AirData CSV with no `dtype` turns state, county and site columns into integers, which a test demonstrates, while your tidy `site_id` is always `17-031-` followed by four digits. Parquet is at most one fifth the size of the CSV for the `ozone` table.',
      ],
      resources: [
        {
          title: 'Pro Git: Git Objects',
          url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects',
          type: 'textbook',
          cost: 'free',
          provider: 'Scott Chacon and Ben Straub',
          note: 'The design you are borrowing: objects named by the hash of their content.',
        },
        {
          title: 'AirData file formats',
          url: 'https://aqs.epa.gov/aqsweb/airdata/FileFormats.html',
          type: 'documentation',
          cost: 'free',
          provider: 'US EPA',
          note: 'Definitions of each column in the daily summary files.',
        },
      ],
      stretchGoals: [
        'Add a `gc` command that removes objects no manifest refers to.',
        'Add `fetch --if-changed`, which uses the `ETag` or `Last-Modified` header when the server provides one, and compare with hashing.',
      ],
    },
    {
      slug: 'mp2-ozone-heat-pipeline',
      title: 'ozone-heat: a validated pipeline that gives the same bytes on any machine',
      afterModule: 'reproducible-workflows',
      coversModules: ['metadata-and-documentation', 'reproducible-workflows'],
      summary: 'Turn the case study into a one-command pipeline with a hash-pinned lockfile, a validated Data Package, automatic provenance, a literate report, a container and CI, with byte-identical results on Windows and Linux.',
      language: 'Python 3.12',
      estimatedHours: 18,
      overview: `MP 1 gave you frozen inputs. This MP makes everything downstream of them rebuildable by a stranger with one command.

The analysis is deliberately simple: an ordinary least squares fit of \`o3_max_ppm\`, in parts per billion, on \`tmax_c\`, overall and by year, with a bootstrap interval for the overall slope and a count of days above 0.070 ppm. The work is in the machinery around it. Each table has a schema, and each schema is enforced. A dictionary is generated from the schemas. A Snakemake workflow rebuilds only what changed. The environment is pinned by hash in a universal lockfile. Every output is traced to raw bytes in a provenance record. A Quarto report reads its numbers from results files. A Linux container and a CI run prove that it works away from your machine.

**The strong test.** \`results/summary.csv\` must be byte-identical across repeated runs, across a full rebuild, and between Windows and Linux. That forces real decisions: fixed seeds, sorted rows, LF line endings, and stated rounding. A reference build met this: the same scripts with pandas 3.1.0 and numpy 2.5.4 produced the same SHA-256 for every CSV on Windows 10 with Python 3.13 and on Ubuntu under WSL 2 with Python 3.14.

**Constraints.** Docker runs through Docker Desktop with the WSL 2 backend, which is free for personal use. Everything uses free tools. Only use topics from Modules 1 to 4: FAIR assessment, deposit and DOIs come in the final project. Do not commit raw data. CI runs on a small committed fixture, and the full data runs on your machine.`,
      setup: {
        extensions: [...pythonExtensions, 'ms-azuretools.vscode-docker', 'github.vscode-github-actions', 'redhat.vscode-yaml', 'quarto.quarto'],
        toolchain: [
          ...pythonToolchain,
          'Install uv with `pip install uv`. Lock with `uv pip compile --universal --generate-hashes --python-version 3.12 requirements.in -o requirements.lock`, and install with `uv pip sync requirements.lock`.',
          'List `pandas`, `numpy`, `pyarrow`, `frictionless`, `snakemake`, `pytest`, `quarto-cli`, `nbformat`, `nbclient`, `ipykernel` and `pyyaml` in `requirements.in`. The `quarto-cli` package puts the `quarto` command in your environment, or use the Windows installer from quarto.org.',
          'Install Docker Desktop with the WSL 2 backend, which is free for personal use.',
        ],
        structure: `ozone-heat/
├── workflow/Snakefile
├── src/                       # tidy, join, fit, provenance, trace
├── schemas/                   # one Table Schema per table
├── datapackage.json
├── docs/data-dictionary.md    # generated from schemas
├── report/report.qmd
├── results/                   # summary.csv, provenance.json, report.html
├── tests/
├── tests/fixture/             # at most 200 rows per table
├── requirements.in
├── requirements.lock
├── Dockerfile
└── .github/workflows/ci.yml`,
        commands: [
          { label: 'Rebuild the environment', command: 'uv pip sync requirements.lock' },
          { label: 'Run the whole pipeline', command: 'snakemake -s workflow/Snakefile --cores 1' },
          { label: 'See what would run', command: 'snakemake -s workflow/Snakefile --cores 1 -n' },
          { label: 'Force a full rebuild', command: 'snakemake -s workflow/Snakefile --cores 1 -F' },
          { label: 'Validate the data package', command: 'frictionless validate datapackage.json' },
          { label: 'Trace a result to its raw bytes', command: 'python src/trace.py results/summary.csv' },
          { label: 'Run the tests', command: 'pytest' },
          { label: 'Build the container', command: 'docker build -t ozone-heat:dev .' },
        ],
      },
      requirements: [
        '`requirements.lock` is generated by `uv pip compile --universal --generate-hashes`, is committed, and rebuilds a fresh environment with `uv pip sync`. `requirements.in` lists only direct dependencies.',
        'The Snakefile has separate rules for tidying each source, joining, validating, fitting, writing provenance and rendering the report. Each rule lists its script as an input, and raw inputs are checked against the MP 1 manifest before anything else runs.',
        '`datapackage.json` holds a Table Schema for `ozone`, `weather` and `days`, each with a primary key, required flags and range constraints. Each numeric limit has a reason in its `description`.',
        'Validation runs as a pipeline step, and a failure stops the run with a non-zero exit. Semantic checks in code cover the row count, the `n_sites` range, and the set of years. Dropped rows are counted and reported.',
        '`docs/data-dictionary.md` is generated from the schemas, and a test fails if the dictionary and the tables disagree.',
        '`results/summary.csv` has the columns `period`, `n_days`, `intercept_ppb`, `slope_ppb_per_c`, `r`, `days_over_70ppb`, `slope_ci_low`, `slope_ci_high`, with rows `all`, `2022` and `2023`. Values are rounded to 3 decimals, with LF line endings. The 95 percent interval is a percentile bootstrap of 5,000 day resamples from `numpy.random.default_rng(477)`, for the `all` row only.',
        '`results/provenance.json` uses PROV terms, with `entity`, `activity`, `used` and `wasGeneratedBy`. Each file has a SHA-256, and each activity has the Git commit and the hash of its script. `src/trace.py` walks a result back to raw hashes, recomputes each one, and exits 1 on any mismatch.',
        '`report/report.qmd` renders to one self-contained HTML file. Every number in its prose is computed from `results/`. It contains a limitations section stating that the slope is an association from one weather station, and that a day above 0.070 ppm is not by itself a violation of the standard.',
        'The Dockerfile builds on a base image pinned by digest, installs from the lockfile, runs as a non-root user, and takes data through mounts.',
        'CI runs tests, validation and the fixture pipeline on `ubuntu-latest` and `windows-latest` for every push, and fails on any mismatch. A README gives exact commands, and a clean clone reaches a result by following it.',
      ],
      acceptanceTests: [
        'On the 2026-11-02 snapshot, the `all` row is 306 days, intercept 7.146, slope 1.735 ppb per degree C, r 0.649 and 39 days over 70 ppb. `2022` is 153 days, slope 1.548, r 0.705 and 8 days. `2023` is 153 days, slope 1.934, r 0.631 and 31 days. With a newer snapshot accept slopes within 0.05 of these and day counts within 2, and explain the change.',
        'The bootstrap interval for the `all` slope was 1.520 to 1.982 in a reference run. Accept a lower bound from 1.45 to 1.60 and an upper bound from 1.90 to 2.05, since your resampling loop may consume the generator differently. Your own value must be identical on every run.',
        '`results/summary.csv` has the same SHA-256 after a second run, after `-F`, in the container, and on the CI Linux job given the same inputs and locked versions. Record the hashes in `docs/REPRODUCIBILITY.md`.',
        'Starting from a clean build, a second `snakemake` run reports nothing to do. Editing only `src/fit.py` makes `snakemake -n` list the fit rule and the rules downstream of it, and no tidy or join rule. A reference pipeline with four rules plus `all` listed exactly two jobs, `fit` and `all`.',
        'Corrupting a copy of `ozone.csv` gives these Frictionless errors, with a test for each: ozone 0.5 gives `constraint-error`, a date of `07/04/2023` gives `type-error`, site `17-31-0032` gives `constraint-error`, a blank ozone value gives `constraint-error`, and a duplicated key gives `primary-key`. The clean file gives no errors.',
        '`trace.py results/summary.csv` prints a chain ending at the SHA-256 of each raw file in the manifest and exits 0. Altering one byte of `data/tidy/days.csv` afterwards makes it exit 1 and name that file.',
      ],
      resources: [
        {
          title: 'Snakemake documentation',
          url: 'https://snakemake.readthedocs.io/en/stable/',
          type: 'documentation',
          cost: 'free',
          provider: 'Snakemake',
          note: 'Reference build used version 9.27 on Windows. Avoid Bash-only syntax in `shell:` commands.',
        },
        {
          title: 'Frictionless Framework: validating data',
          url: 'https://framework.frictionlessdata.io/docs/guides/validating-data.html',
          type: 'documentation',
          cost: 'free',
          provider: 'Frictionless Data',
          note: 'Reference results used version 5.21.',
        },
      ],
      stretchGoals: [
        'Package the results folder as an RO-Crate, with `ro-crate-metadata.json` generated by the pipeline.',
        'Add a scheduled CI job that restores the full snapshot from a GitHub release asset, verifies hashes and runs the full pipeline.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-silent-edits',
    title: 'silent-edits: an observatory of how open data changes after publication',
    repoName: 'silent-edits',
    summary: 'Build a public observatory that snapshots open datasets, measures row-level edits, and publishes the evidence as a citable, validated dataset with a cost model and a machine-actionable data management plan.',
    language: 'Python 3.12',
    estimatedHours: 42,
    overview: `Everyone assumes a published dataset stays put. It often does not. The EPA's ozone file for 2023 has 388,607 rows, and 68,720 of them, about 17.7 percent, carry a \`Date of Last Change\` after 30 June 2024, well after the year ended. The URL never changed and no notice appeared. Anyone who downloaded that file twice may hold two different datasets.

\`silent-edits\` measures this properly. It watches a list of public datasets, freezes each new version in a content-addressed store, computes a row-level diff using declared keys, and publishes a ledger of what changed. A stranger can look up a dataset and see how often it changes, what kind of change it is, and whether the edits touch measured values or only metadata.

The findings need to be stated with care, and that is part of the project. In a reference diff of two archived versions of that file, 5,612 rows changed between September and December 2024, yet the headline value \`1st Max Value\` changed on only 10 of them. Most edits were to metadata such as site names and method codes. Agencies correct data for good reasons, and a changed row is not an error. The honest headline is about versioning and provenance, not wrongdoing.

**You do not have to wait months for results.** The Internet Archive holds past versions of many files, so you can seed the ledger with real history on the first day, then let a scheduled GitHub Action extend it. Use the CDX API to list captures, and fetch raw bytes with the \`id_\` form of an archive URL.

**Constraints.** Free tools only. Watch only public, non-personal datasets that need no login, and respect each site's terms and rate limits, with at least a 2-second delay between requests. Do not store full snapshots in Git. Keep hashes and diffs in the repository, and bytes in release assets or your deposit. GitHub disables scheduled workflows after a long period of repository inactivity, so plan for that. Scope: at least 5 datasets from at least 2 organisations.`,
    setup: {
      extensions: [...pythonExtensions, 'github.vscode-github-actions', 'redhat.vscode-yaml', 'tamasfe.even-better-toml', 'quarto.quarto'],
      toolchain: [
        ...pythonToolchain,
        'Install uv with `pip install uv` and lock dependencies as in MP 2.',
        'Create free accounts on `sandbox.zenodo.org` for practice and on Zenodo for the real deposit. Datasets themselves must need no login.',
      ],
      structure: `silent-edits/
├── watch.yaml                # datasets, URLs, keys, formats, terms
├── src/silent_edits/fetch.py
├── src/silent_edits/store.py # reused from MP 1
├── src/silent_edits/rowdiff.py
├── src/silent_edits/ledger.py
├── src/silent_edits/cost.py
├── src/silent_edits/wayback.py
├── ledger/                   # ledger.csv, snapshots.csv, schemas
├── datapackage.json
├── site/                     # generated static report
├── docs/LIFECYCLE.md  docs/COST.md  docs/REVIEW.md  docs/DMP.md
├── dmp.json                  # RDA DMP Common Standard
├── CITATION.cff  .zenodo.json  LICENSE  LICENSE-DATA
├── tests/
├── workflow/Snakefile
├── requirements.in  requirements.lock
└── .github/workflows/        # ci.yml, watch.yml, pages.yml`,
      commands: [
        { label: 'Take a snapshot of every dataset', command: 'python -m silent_edits fetch --config watch.yaml' },
        { label: 'Backfill history from web archives', command: 'python -m silent_edits backfill --dataset airdata-ozone-2023' },
        { label: 'Diff two versions', command: 'python -m silent_edits diff old.zip new.zip --dataset airdata-ozone-2023' },
        { label: 'Rebuild the ledger and site', command: 'snakemake -s workflow/Snakefile --cores 1' },
        { label: 'Estimate preservation costs', command: 'python -m silent_edits cost --config watch.yaml' },
        { label: 'Validate the published package', command: 'frictionless validate datapackage.json' },
        { label: 'Run the tests', command: 'pytest' },
      ],
    },
    requirements: [
      '`watch.yaml` declares, for each dataset, an ID, URL, format, key columns, compared columns, licence or terms with a checked date, and owner organisation. A test rejects any entry without keys or terms.',
      'Fetching stores each new version once by SHA-256, records URL, retrieval time, HTTP status, size and hash in `ledger/snapshots.csv`, waits at least 2 seconds between requests, and records failed fetches as rows rather than crashing.',
      '`rowdiff` compares two versions by key and reports rows inserted, deleted, modified and unchanged, cells changed per column, and columns added or removed. Row order never matters, and numeric columns compare as numbers, so `0.040` equals `0.04`. Rows where only a declared bookkeeping column changed are counted apart.',
      '`ledger/ledger.csv` has one row per version pair per dataset. It is published as a Data Package with Table Schemas, validated in CI, and described in a generated data dictionary. Each row links to the two content hashes it compares.',
      'A backfill command lists archived captures through the Wayback CDX API, deduplicates them by digest, downloads raw bytes with the `id_` URL form, verifies a stored hash and adds them to the ledger marked `source=archive`.',
      'A scheduled GitHub Actions workflow runs at least weekly, uses a hash-pinned lockfile, commits ledger updates, and pushes bytes to release assets rather than to Git. The Snakemake pipeline regenerates the ledger, site and provenance from stored bytes, with byte-identical CSV output on rebuild.',
      'The static site on GitHub Pages shows, per dataset, a timeline of versions and the split between value edits and metadata edits. Every number is generated. A methods page states what the measures cannot show, and that a change is not an error.',
      'A release is deposited on Zenodo, after a sandbox rehearsal, with DataCite metadata from `.zenodo.json`, a version DOI, a `CITATION.cff`, `LICENSE` for code and `LICENSE-DATA` for the ledger. A signed-off FAIR self-assessment gives evidence for each of the 15 principles.',
      '`cost.py` implements the endowment sum from the course and measures real bytes for three strategies on your own snapshots: full copies, full copies compressed, and content-addressed storage. `docs/COST.md` gives a range under at least three price-decline assumptions, says who pays, and states what you would stop keeping if the money ran out.',
      '`dmp.json` validates against the RDA DMP Common Standard schema version 1.2, and `docs/DMP.md` is a two-page plan of decisions with owners. `docs/REVIEW.md` holds a reproducibility review of your repository by someone else, or of another public project by you, with issues filed and at least two fixed.',
    ],
    acceptanceTests: [
      'Fixture diff with key `id`. Version A has rows `1,Aurora,0.040`, `2,Berwyn,0.051`, `3,Cicero,0.047` and `4,Dolton,0.062` under columns `id,city,o3`. Version B has columns `id,qa,city,o3` and rows `4,ok,Dolton,0.062`, `2,ok,Berwyn,0.053`, `1,ok,Aurora,0.04` and `5,ok,Elgin,0.039`. The result is 1 inserted, 1 deleted, 1 modified, 2 unchanged, column `qa` added, none removed, and cells changed `o3`: 1 and `city`: 0.',
      'Real history, on frozen archived bytes. Version A is the Wayback capture `20240927004312` of `https://aqs.epa.gov/aqsweb/airdata/daily_44201_2023.zip` with SHA-256 `71753204864671e67a10623ff2626cc23d7891750006953d2e92a0964853d224`. Version B is capture `20241223082029` with SHA-256 `1ea342a0563174bcb95022068be982d6b9ff3f9b6648c46c1eff75b723cd995b`. With key `State Code`, `County Code`, `Site Num`, `POC`, `Date Local`, `Pollutant Standard`, `Event Type`, and missing `Event Type` kept as empty text: 388,228 and 388,238 rows, 23 inserted, 13 deleted, and 388,215 matched.',
      'For the same pair, comparing `Observation Count`, `Observation Percent`, `Arithmetic Mean`, `1st Max Value`, `1st Max Hour`, `AQI` and `Method Code` as numbers and `Local Site Name` as text, 5,612 rows are modified: 4,019 on each of `Observation Count` and `Observation Percent`, 30 on `Arithmetic Mean`, 10 on `1st Max Value`, 11 on `1st Max Hour`, 10 on `AQI`, 3,643 on `Method Code` and 1,577 on `Local Site Name`. A further 10,182 matched rows differ only in `Date of Last Change`.',
      'For version B against the capture `20260930192753` with SHA-256 `511cff78de12318301399bb8614a774145cb0f95fb9c522bd405acd82e114bbd`, the second file has 388,607 rows, with 1,705 inserted, 1,336 deleted, 26,904 modified (21,887 of them on `Local Site Name`, 14 on `1st Max Value`), and 45,738 changed only in `Date of Last Change`. In that second file, 68,720 of 388,607 rows have a `Date of Last Change` after 2024-06-30.',
      '`cost`: endowment for (100 GiB, 0.023 per GiB-month, 10 years, no decline, no discount) is 276.00; (50 years) is 1,380.00; (10 years, 10 percent decline, 3 percent discount) is 152.35; (50 years, same rates) is 205.48; (50 years, 2 percent decline, 3 percent discount) is 509.63. Ten identical snapshots of a file occupy the space of one in the content-addressed store.',
      '`dmp.json` passes the RDA schema using `jsonschema.Draft202012Validator`. Removing a dataset `title` gives `\'title\' is a required property`, removing `contact` gives `\'contact\' is a required property`, and setting `ethical_issues_exist` to `maybe` fails. The published package passes `frictionless validate`, and CI is green on the default branch with at least 8 weekly or backfilled versions in total across at least 5 datasets.',
    ],
    coverage: [
      { module: 'data-science-life-cycle', demonstrates: '`docs/LIFECYCLE.md` maps the observatory from planning to reuse, and the project itself measures a known failure mode: silent source change.' },
      { module: 'research-artifacts', demonstrates: 'Content-addressed snapshots, an inventory of artifacts, tidy ledgers and a split between Git-tracked metadata and bytes kept elsewhere.' },
      { module: 'metadata-and-documentation', demonstrates: 'Table Schemas, a generated data dictionary, DataCite metadata and validation that gates every ledger update.' },
      { module: 'reproducible-workflows', demonstrates: 'A hash-pinned lockfile, a Snakemake rebuild with identical bytes, provenance links to content hashes, and scheduled automation.' },
      { module: 'repositories-and-preservation', demonstrates: 'A Zenodo deposit with a version DOI, licences, a FAIR self-assessment, and a cost model measured on real bytes.' },
      { module: 'data-management-plans', demonstrates: 'A two-page plan and a schema-valid machine-actionable plan, plus a screened dataset list and a documented review of a project.' },
    ],
    portfolio: [
      'The README opens with the sharpest measured finding and a chart, and links to the live site and the DOI, with badges for CI and the deposit.',
      'The live GitHub Pages site lets a stranger look up a dataset and read its history of edits in under a minute.',
      'A short write-up presents findings from at least three datasets, and states clearly what they do not show, including that edits are often legitimate corrections.',
      'The Zenodo record has complete metadata and a citable version, and `CITATION.cff` makes GitHub show a citation button.',
      'A tagged `v1.0.0` release with a changelog is reproducible from a clean clone, and `docs/REVIEW.md` shows who checked that.',
      'Open an issue or a polite note to one data provider about what you found, and link any reply.',
    ],
    resources: [
      {
        title: 'Wayback CDX Server API',
        url: 'https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server',
        type: 'documentation',
        cost: 'free',
        provider: 'Internet Archive',
        note: 'How to list captures, with `collapse=digest` to skip duplicates.',
      },
      {
        title: 'RDA DMP Common Standard',
        url: 'https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard',
        type: 'documentation',
        cost: 'free',
        provider: 'Research Data Alliance',
        note: 'The schema is at `examples/JSON/JSON-schema/1.2/maDMP-schema-1.2.json`.',
      },
      {
        title: 'Zenodo help',
        url: 'https://help.zenodo.org/docs/',
        type: 'documentation',
        cost: 'free',
        provider: 'Zenodo',
        note: 'Versioning, GitHub integration and the sandbox.',
      },
    ],
    stretchGoals: [
      'Add an API that answers whether a given hash is a known version of a dataset, and when it was current.',
      'Measure whether the edits matter: rerun the MP 2 slope on each historical version and chart how far it moves.',
      'Classify changes by likely cause, such as additions, late quality control or reference data updates, and state your error rate on a sample you checked by hand.',
    ],
  },
});
