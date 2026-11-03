import { defineSubject } from '../define';

export default defineSubject({
  id: 'data-management-reproducibility',
  title: 'Data Management, Curation and Reproducibility',
  category: 'data-science',
  tagline:
    'Keep data work usable: the data science life cycle, artifacts, metadata, reproducible workflows, repositories, the economics of preservation and data management plans.',
  description: `Most data projects fail quietly. The analysis worked once, on one laptop, and six months later nobody can say which file produced the figure. This course teaches the discipline that prevents that: treating a data project as a set of artifacts that someone else, including your future self, must be able to find, understand, rerun and trust.

The course follows the topics in the public catalog description of IS 477 (Data Management, Curation and Reproducibility) at the University of Illinois Urbana-Champaign: the data science life cycle, artifact identification and management, metadata, repositories, the economics of preservation and data management plans. The content here is original and the course is not affiliated with Illinois. No Illinois course material was used.

One running case study holds the course together. You ask how much the highest daily ozone reading in Cook County, Illinois rises per degree of daily high temperature at O'Hare, for May to September of 2022 and 2023. The data comes from two US government sources, EPA AirData and NOAA GHCN-Daily, which disagree about nearly everything: units, identifiers, column layout and how often they change. Module by module you inventory that project, document it, automate it, publish it and plan for its future.

Two machine problems and a final project turn this into working software: a content-addressed snapshot tool, a validated pipeline with a hash-pinned lockfile that gives byte-identical results on Windows and Linux, and a public observatory that measures how open datasets change after publication. Funder rules are stated as of 2 November 2026, and they change, so check the current text before relying on them.`,
  difficulty: 'intermediate',
  estimatedHours: 60,
  prerequisites: ['data-science-exploration'],
  recommendedBackground: [
    'Comfortable with pandas: loading, joining, reshaping and summarising tables',
    'Basic Git: commit, branch, push',
    'Basic use of a terminal in VS Code',
  ],
  tags: ['data curation', 'reproducibility', 'metadata', 'fair data', 'workflows', 'provenance', 'data management plans'],
  core: false,
  modules: [
    {
      slug: 'data-science-life-cycle',
      title: 'The Data Science Life Cycle',
      description:
        'The stages a data project passes through, who is responsible at each one, why results fail to reproduce, and the case study used for the rest of the course.',
      lessons: [
        {
          slug: 'stages-and-roles',
          title: 'Stages of the life cycle and who does what',
          summary:
            'Plan, acquire, process, analyse, preserve and share: what each stage produces, who owns it, and why curation runs through all of them rather than coming last.',
          estimatedMinutes: 75,
          objectives: [
            'Name the stages of a data science life cycle and the artifact each stage produces',
            'Distinguish data management, data curation and data preservation',
            'Assign roles such as data producer, analyst, curator and steward to the stages of a real project',
            'Explain why curation decisions made early are cheaper than those made late',
          ],
          concepts: [
            'Data science life cycle',
            'Data management',
            'Data curation',
            'Digital preservation',
            'Data steward',
            'Producer and consumer',
            'Handoffs between stages',
          ],
          explanation: `Models of the data life cycle differ in their labels, but they agree on the shape. The USGS Science Data Lifecycle Model lists **plan, acquire, process, analyse, preserve, publish and share**, with describing, quality management and backup running across all of them. Victoria Stodden's work on the data science life cycle adds a point this course repeats: the life cycle is not only a description of work, but a statement of what must be recorded so that the work can be checked.

Three terms get confused, and it helps to separate them.

- **Data management** is the day-to-day control of data during a project: where files live, who may change them, how they are backed up.
- **Data curation** is the active work of keeping data useful over time: documenting, validating, correcting, and deciding what is worth keeping.
- **Digital preservation** is keeping bits readable and understandable for the long term, after the project has ended.

Every stage produces **artifacts** and hands them on. A plan produces a data management plan. Acquisition produces raw files and a record of where they came from. Processing produces clean tables and the code that made them. Most reproducibility failures are failures at a handoff: the person downstream receives a file, but not the knowledge of how it was made.

Roles matter even when one person holds all of them. A **producer** creates data, an **analyst** transforms it, a **curator** or **steward** answers for its quality and description, and a **consumer** uses it later. On a solo project you play all four, at different times, and your future self is the consumer who has forgotten everything.

The pitfall is treating curation as a final tidying step. Metadata recorded at download takes a minute. Reconstructing it a year later can take days, and sometimes it cannot be done at all. Use the Turing Way chapters to see how the stages look in practice.`,
          resources: [
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'The main free companion for this course. Read the overview of the reproducible research guide now, and use its table of contents as a reference.', primary: true },
            { title: 'Digital Curation Centre: guidance and standards', url: 'https://www.dcc.ac.uk/', type: 'documentation', cost: 'free', provider: 'Digital Curation Centre', note: 'A UK centre of expertise in curation. Browse its guidance to see what the profession considers its job.' },
            { title: 'Good enough practices in scientific computing', url: 'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510', type: 'article', cost: 'free', provider: 'PLOS Computational Biology', note: 'Wilson et al. (2017). A short checklist that maps well onto the life cycle stages.' },
          ],
          exercises: [
            {
              slug: 'map-a-past-project',
              title: 'Map a past project',
              prompt:
                'Take any analysis you finished in Data Science Exploration. Draw its life cycle as a table with one row per stage and the columns stage, artifact produced, where that artifact lives today, and who could explain it. Mark every cell you cannot fill in. Write three sentences on what is lost if you are unavailable for a year.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'roles-in-a-public-dataset',
              title: 'Find the roles in a public dataset',
              prompt:
                "Open the NOAA GHCN-Daily product page and the EPA AirData download page. For each source, identify who produces the measurements, who processes them, who curates the published file and who you would contact about an error. Say what you could not find. One paragraph per source.",
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between data management and data curation?',
              answerOutline:
                'Management is operational control during a project: storage, access, backup. Curation is active work to keep data findable, understandable and trustworthy over time, including description and selection.',
            },
            {
              question: 'Why is a handoff between stages the place where reproducibility usually fails?',
              answerOutline:
                'The file moves but the knowledge of how it was made does not. Undocumented steps, assumptions and versions stay with the person who did the work.',
            },
            {
              question: 'Why is curation cheaper at the start of a project than at the end?',
              answerOutline:
                'Provenance and context are known at creation and cost little to record. Later they must be reconstructed, sometimes impossibly, when people have moved on or sources have changed.',
            },
          ],
        },
        {
          slug: 'why-results-fail-to-reproduce',
          title: 'Why results fail to reproduce',
          summary:
            'Reproducibility versus replicability, the common failure modes, and well-documented cases where data handling changed the conclusion.',
          estimatedMinutes: 80,
          objectives: [
            'Define reproducibility, replicability, robustness and generalisability precisely',
            'Classify a failure as missing data, missing code, environment change, undocumented manual step or nondeterminism',
            'Describe documented cases where a data handling error affected published findings',
            'Write an automated check that would have caught a given failure',
          ],
          concepts: [
            'Reproducibility (same data, same method)',
            'Replicability (new data, same question)',
            'Robustness and generalisability',
            'Computational reproducibility',
            'Bit rot and environment drift',
            'Undocumented manual steps',
            'Nondeterminism and random seeds',
            'Assertions and automated checks',
          ],
          explanation: `Words first, because fields use them differently. The US National Academies' 2019 report defines **reproducibility** as obtaining consistent results using the same input data, code and conditions, and **replicability** as obtaining consistent results across studies aimed at the same question, each with its own data. The Turing Way adds **robust** (same data, different analysis) and **generalisable** (different data, different analysis). This course is mainly about reproducibility, the cheapest of these and the precondition for the others.

Failures fall into a few classes:

- **Missing inputs.** The raw data, or the exact version used, is gone.
- **Missing process.** A cleaning step happened by hand in a spreadsheet.
- **Environment drift.** A library changed a default, so the same code gives a different number.
- **Nondeterminism.** An unseeded random step, or an ordering that depends on the file system.
- **Silent source change.** The URL still works, but the file behind it has been edited.

Real cases show the stakes. Herndon, Ash and Pollin (2013) found a spreadsheet range error, among other issues, in Reinhart and Rogoff's widely cited analysis of debt and growth. Ziemann and colleagues (2016) reported that around a fifth of the papers they screened with Excel gene lists had names converted to dates, and in 2020 the human gene nomenclature committee renamed some genes, partly to avoid this. Pimentel and colleagues (2019) reran hundreds of thousands of public Jupyter notebooks and reported that about a quarter ran without error and only around 4 percent gave the same results. Treat such figures as measurements of a sample at one time.

The fix for each class is a habit you can automate. An **assertion** turns an assumption into a check that fails loudly:

\`\`\`python
assert df["site_id"].str.fullmatch(r"\\d{2}-\\d{3}-\\d{4}").all()
\`\`\`

Put such checks in a \`tests/\` folder as small functions and run them with \`pytest\`. That is all the testing you need for now. Software Engineering covers it in depth.`,
          resources: [
            { title: 'Reproducibility and Replicability in Science', url: 'https://nap.nationalacademies.org/catalog/25303/reproducibility-and-replicability-in-science', type: 'textbook', cost: 'free', provider: 'US National Academies', note: 'Free PDF. Chapter 3 has the definitions used here.', primary: true },
            { title: '1,500 scientists lift the lid on reproducibility', url: 'https://www.nature.com/articles/533452a', type: 'article', cost: 'free', provider: 'Nature', note: "Baker's 2016 survey. It measures opinion and self-report, not failure rates, so read it with that in mind." },
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'See the section defining reproducible, replicable, robust and generalisable.' },
          ],
          relatedLessons: ['machine-learning/ml-engineering/experiment-tracking-and-reproducibility'],
          exercises: [
            {
              slug: 'classify-failures',
              title: 'Classify six failures',
              prompt:
                'For each case say which failure class it is and name one automated check that would catch it: (a) a figure changes when pandas is upgraded; (b) a notebook only works when cells run out of order; (c) a CSV from a government portal gains 40 rows between two downloads with no notice; (d) a bootstrap interval differs on each run; (e) county code 031 becomes 31 after loading; (f) an analyst deleted outliers in Excel.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'leading-zero-test',
              title: 'Reproduce a silent type failure',
              prompt:
                'Write a three-row CSV with a `site` column holding `0032`, `0076` and `1003`. Load it with `pd.read_csv` with no options and show that `0032` becomes `32`. Then load it correctly with `dtype`. Write a `pytest` test that fails on the first load and passes on the second. Keep the test in `tests/test_ids.py`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'rerun-your-own-work',
              title: 'Rerun your own old work',
              prompt:
                'Clone or copy an analysis you finished at least a month ago into a new folder and a new virtual environment, and try to rerun it with only what is in the folder. Time it. Log every failure and how you fixed it, then compare one final number with the original. Say which failure classes you hit.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A colleague reruns your code on your data and gets a different number. Is that a reproducibility or a replicability failure?',
              answerOutline: 'Reproducibility: same data and method. Replicability would involve new data collected for the same question.',
            },
            {
              question: 'Why is reproducibility described as the cheapest and the precondition?',
              answerOutline:
                'It needs only what the author already has, and if an analysis cannot be rerun you cannot tell whether a later disagreement comes from the science or from an error.',
            },
            {
              question: 'Does a reproducible analysis have to be correct?',
              answerOutline: 'No. A wrong method can reproduce perfectly. Reproducibility makes an error checkable, not absent.',
            },
          ],
        },
        {
          slug: 'running-case-study',
          title: 'The running case study: ozone and heat in Chicago',
          summary:
            'The question, the two public sources and the traps in them. You will carry this project through every later module.',
          estimatedMinutes: 90,
          objectives: [
            'State the case study question as a precise, checkable estimate',
            'Describe EPA AirData and GHCN-Daily, their units and identifiers',
            'Identify at least four data traps in the two sources',
            'Record a first provenance note for each raw file',
          ],
          concepts: [
            'Research question as an estimand',
            'EPA AirData daily summary files',
            'GHCN-Daily station files',
            'Daily maximum 8-hour ozone',
            'Monitor identifiers: state, county, site, POC',
            'Event flags and duplicate rows',
            'Provenance note',
          ],
          explanation: `The question: **for May to September of 2022 and 2023, how many parts per billion does the highest daily ozone reading in Cook County rise per degree Celsius of daily high temperature at Chicago O'Hare?** Ground-level ozone forms in sunlight from precursor pollutants, so warmer days tend to have more of it. The relationship is well known, which suits a course about process: the interest lies in handling the data, not in a surprise.

**Source 1: EPA AirData.** Yearly files such as \`daily_44201_2023.zip\` (44201 is the ozone parameter code) hold one row per monitor, per day, per event type. The measure you want is \`1st Max Value\`, the day's highest 8-hour running average, in parts per million.

**Source 2: GHCN-Daily.** Station file \`USW00094846.csv\` is O'Hare. \`TMAX\` is stored in **tenths of a degree Celsius**, padded with spaces, so \`'  144'\` means 14.4 degrees.

These traps are real, and each was measured on files downloaded on 2 November 2026:

- **Identifiers look numeric but are not.** A monitor is state + county + site + POC. Read with default settings, \`0032\` becomes \`32\`.
- **Names are not identifiers.** Two different Cook County sites are both called \`COOK COUNTY TRAILER\`.
- **Rows are not always unique per monitor and day.** Nationally, the 2023 file has 388,607 rows but 387,521 distinct monitor-days, because exceptional-event handling produces \`Included\` and \`Excluded\` rows for the same day, and their values can differ. On one Arizona monitor-day they read 0.077 and 0.056. No Cook County row carries an event flag in these two files, so your filter hides the issue rather than solving it.
- **Completeness varies.** \`Observation Percent\` can be as low as 12.
- **The sources move.** The GHCN file grows daily, and AirData rows carry a \`Date of Last Change\`.

One caution about meaning: a day above 0.070 ppm is not a violation of the ozone standard, whose form is a three-year average of the annual fourth-highest value. Check the EPA's table of standards before writing such a claim.`,
          resources: [
            { title: 'AirData pre-generated data files', url: 'https://aqs.epa.gov/aqsweb/airdata/download_files.html', type: 'dataset', cost: 'free', provider: 'US EPA', note: 'Criteria gases, daily summary data, ozone 44201. No login is needed.', primary: true },
            { title: 'AirData file formats', url: 'https://aqs.epa.gov/aqsweb/airdata/FileFormats.html', type: 'documentation', cost: 'free', provider: 'US EPA', note: 'The data dictionary for the files. Read the daily summary section before loading anything.' },
            { title: 'Global Historical Climatology Network daily', url: 'https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-daily', type: 'dataset', cost: 'free', provider: 'NOAA NCEI', note: 'Find the station-file access link and the readme, which defines the elements and units.' },
            { title: 'NAAQS table', url: 'https://www.epa.gov/criteria-air-pollutants/naaqs-table', type: 'documentation', cost: 'free', provider: 'US EPA', note: 'Shows the form of the ozone standard. This matters for what you may and may not claim.' },
          ],
          exercises: [
            {
              slug: 'first-contact',
              title: 'First contact with the raw files',
              prompt:
                'Download `daily_44201_2022.zip`, `daily_44201_2023.zip` and `USW00094846.csv`. Without cleaning anything, report for Cook County (state 17, county 031): the row count for each year, the number of distinct sites, the date range, and the lowest `Observation Percent`. On files fetched on 2026-11-02 the rows were 2,511 and 2,491 and there were 10 sites. Say whether yours differ and what that would mean.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'provenance-note',
              title: 'Write a provenance note',
              prompt:
                'Write `data/raw/README.md`. For each raw file give the source organisation, URL, date and time of download, file size, SHA-256 checksum and any licence or terms statement you can find. Add one sentence saying how a later reader could detect that the source has changed.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'event-duplicates',
              title: 'Measure the duplicate-row trap',
              prompt:
                'In the national 2023 file, count rows, distinct (state, county, site, POC, date) keys and rows per `Event Type`. Find one monitor-day where `Included` and `Excluded` values differ. Compute the national mean of `1st Max Value` with and without deduplication. Explain which choice is correct for which question, and what the numbers do not show about Cook County.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the question be written as a precise estimate rather than as "does heat affect ozone"?',
              answerOutline:
                'Precision fixes the population, period, measure and unit, so that each data decision can be checked against it and the result can be reproduced or disputed.',
            },
            {
              question: 'Why are the monitor identifiers stored as text?',
              answerOutline: 'They are labels with meaningful leading zeros and no arithmetic meaning. Numeric types destroy them.',
            },
            {
              question: 'If no Cook County row has an event flag, can you ignore the Included and Excluded issue?',
              answerOutline:
                'Your result is unaffected in this snapshot, but the code should still check uniqueness, because a later file or another county could break the assumption silently.',
            },
          ],
        },
      ],
    },
    {
      slug: 'research-artifacts',
      title: 'Research Artifacts',
      description:
        'What a project is made of: identifying and inventorying artifacts, choosing file formats, organising tidy tables, naming things and versioning both data and code.',
      lessons: [
        {
          slug: 'identifying-artifacts',
          title: 'Identifying and inventorying artifacts',
          summary:
            'Everything a project needs or produces, classified by what can be regenerated and what cannot.',
          estimatedMinutes: 70,
          objectives: [
            'Define a research artifact and list the common kinds',
            'Separate primary artifacts from derived artifacts',
            'Build an artifact inventory with an owner and a regeneration rule for each entry',
            'Decide what must be archived and what may be rebuilt',
          ],
          concepts: [
            'Research artifact',
            'Raw, derived and published data',
            'Code, environment, documentation and outputs as artifacts',
            'Source of truth',
            'Regenerable versus irreplaceable',
            'Artifact inventory',
          ],
          explanation: `A **research artifact** is anything a project needs or produces that someone would have to obtain to understand, check or reuse the work. Data is only one kind. A full list includes raw data, derived tables, code, configuration, the software environment, models, figures, reports, documentation, plans, and agreements such as licences or data use terms.

The most useful distinction is between what is **irreplaceable** and what is **regenerable**. Raw inputs are usually irreplaceable: if the source changes or disappears, your exact starting point is gone. A derived table is regenerable if, and only if, you have the inputs, the code and the environment. That gives a working rule: **raw data is read-only, and everything derived should be rebuildable by a command.**

An **artifact inventory** makes this explicit. It is a small table in the repository, one row per artifact:

| id | path | kind | origin | regenerate with | keep? |
|---|---|---|---|---|---|
| raw-ozone-2023 | data/raw/daily_44201_2023.zip | raw data | EPA AirData | irreplaceable snapshot | archive |
| tidy-ozone | data/tidy/ozone.parquet | derived | src/tidy_ozone.py | run the tidy step | rebuild |
| fig-slope | reports/fig1.png | output | src/plot.py | run the plot step | rebuild |

Writing this down exposes problems. Which file is the **source of truth** when two copies disagree? Which figure has no code behind it? Who owns each thing? Hidden artifacts surface too: a manually edited lookup table, an API key in a notebook, or an email in which someone explained a column.

The inventory also tells you what to do at the end of a project. You archive what is irreplaceable, and you keep enough to rebuild the rest. Keeping everything is not free, and Module 5 returns to that cost. Read the data organisation chapters in The Turing Way, then inventory the case study before you write any more code.`,
          resources: [
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'Use the research data management chapters on data organisation.', primary: true },
            { title: 'Good enough practices in scientific computing', url: 'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510', type: 'article', cost: 'free', provider: 'PLOS Computational Biology', note: 'Section 1 argues for saving raw data once and generating everything else.' },
          ],
          exercises: [
            {
              slug: 'inventory-the-case-study',
              title: 'Inventory the case study',
              prompt:
                'Write `artifacts.csv` for the case study with the columns `id`, `path`, `kind`, `origin`, `regenerate_with`, `keep`. Include at least 10 artifacts, covering raw data, code, environment, documentation and outputs. Add an entry for each thing you planned but have not yet built, marked `planned`. Note one artifact you would have forgotten without the exercise.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'find-hidden-artifacts',
              title: 'Find hidden artifacts',
              prompt:
                'Audit an old project folder of yours. List every file with no known origin, every derived file with no script, and every value typed by hand into code. For the worst three, write what it would take to make them regenerable. Estimate the time in minutes, then do one and compare.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Under what conditions is a derived table truly regenerable?',
              answerOutline: 'You still have the exact inputs, the code and an equivalent environment, and running them gives the same result.',
            },
            {
              question: 'Name three artifacts other than data and code.',
              answerOutline: 'Examples: environment specification, documentation, data dictionary, licence, plans, models, figures, data use agreements.',
            },
            {
              question: 'Why should raw data be read-only?',
              answerOutline: 'It is the fixed starting point of the provenance chain. Editing it in place destroys the ability to trace or rerun anything.',
            },
          ],
        },
        {
          slug: 'file-formats',
          title: 'File formats and what they preserve',
          summary:
            'CSV, JSON, Parquet, spreadsheets and archives compared on types, size, longevity and how they fail.',
          estimatedMinutes: 80,
          objectives: [
            'Compare text and binary formats for tabular data',
            'Predict what information each format loses',
            'Choose a working format and a preservation format for a dataset',
            'Measure size and type preservation on real data',
          ],
          concepts: [
            'Open versus proprietary formats',
            'Plain text and character encoding',
            'Delimited text and quoting',
            'Columnar storage (Parquet)',
            'Embedded schema',
            'Compression',
            'Spreadsheet auto-conversion',
            'Format obsolescence',
          ],
          explanation: `A format decides what survives. **CSV** is plain text and will be readable in 50 years, but it stores no types, no units and no schema, and its dialects differ on quoting, encoding and line endings. Every reader guesses, and guessing is where \`0032\` becomes \`32\` and a date becomes a different date.

**Parquet** is a binary, columnar format with an embedded schema. It keeps types, compresses well and reads single columns quickly, which suits analysis. It needs a library to read, though, so you are betting on that software lasting. It is widely adopted and openly specified, which makes that a reasonable bet.

**JSON** suits nested records and metadata, but it is verbose for large tables and has one number type. **Spreadsheets** are a poor primary store, because they mix data with presentation and convert values on entry, but they are fine as an interface when treated with care. Broman and Woo's advice is a good guide: one thing per cell, no merged cells, no colour as data, and a separate data dictionary.

Measure rather than assume. For the case study's tidy table of 2,967 rows, CSV took about 160 KB and Parquet about 12 KB. Your numbers will vary with library version and options. Over one small table the size hardly matters. What matters is that Parquet returned \`site_id\` as a string and dates as declared, with no \`dtype\` argument needed.

A sensible pattern is **two formats for two jobs**:

- Work in Parquet, because it is fast and typed.
- Publish and preserve in CSV with a schema file beside it, because it is plain and durable, and its types are stated explicitly rather than guessed.

Preservation institutions publish advice on this. The Library of Congress Recommended Formats Statement lists preferred formats by content type. Things to prefer are open specifications, wide adoption, no encryption, and no dependence on one vendor. Avoid proprietary binary formats for anything you must keep, and if you receive one, convert a copy and keep the original too.`,
          resources: [
            { title: 'Recommended Formats Statement: datasets', url: 'https://www.loc.gov/preservation/resources/rfs/data.html', type: 'documentation', cost: 'free', provider: 'Library of Congress', note: 'Preferred and acceptable formats for preservation.', primary: true },
            { title: 'Parquet documentation', url: 'https://parquet.apache.org/docs/', type: 'documentation', cost: 'free', provider: 'Apache', note: 'Read the overview and the file format concepts page.' },
            { title: 'Data Organization in Spreadsheets lesson', url: 'https://datacarpentry.github.io/spreadsheet-ecology-lesson/', type: 'course', cost: 'free', provider: 'Data Carpentry', note: 'Short lessons on the common spreadsheet mistakes and how to avoid them.' },
          ],
          relatedLessons: ['databases/beyond-relational/column-stores-and-analytics'],
          exercises: [
            {
              slug: 'format-bake-off',
              title: 'Format bake-off',
              prompt:
                'Write the case study tidy table as CSV, gzipped CSV, Parquet (snappy) and JSON Lines. Report size, write time and read time as the median of 5 runs, and whether `site_id`, `date` and `o3_ppm` come back with the right types without options. Recommend one working format and one archival format in three sentences each.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'excel-damage',
              title: 'Watch a spreadsheet change data',
              prompt:
                'Put these values in a CSV: `0032`, `3-1`, `MARCH1`, `1E5`, `2023-07-25`, `12345678901234567890`. Open it in a spreadsheet program, save it as CSV under a new name, and diff the two files. Report which values changed. If you have no spreadsheet program, use LibreOffice, which is free, and note any differences from what Excel is documented to do.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does CSV fail to preserve?',
              answerOutline: 'Types, units, schema, encoding and missing-value conventions. Readers must guess or be told.',
            },
            {
              question: 'Why might you work in Parquet but archive in CSV?',
              answerOutline: 'Parquet is typed and fast, while plain text with a schema file is more durable and needs no special library. Each format suits its job.',
            },
            {
              question: 'What three properties make a format safer for long-term preservation?',
              answerOutline: 'An open specification, wide adoption and no dependence on a single vendor or on encryption.',
            },
          ],
        },
        {
          slug: 'tidy-data-and-tables',
          title: 'Tidy data and table design',
          summary:
            'One variable per column, one observation per row, one table per observational unit, plus keys that you check instead of assuming.',
          estimatedMinutes: 85,
          objectives: [
            'Apply the tidy data rules to a real file',
            'Identify the observational unit and primary key of a table',
            'Convert units and encodings at a single, tested boundary',
            'Join two tables and prove that the join did not change the row count',
          ],
          concepts: [
            'Tidy data',
            'Observational unit',
            'Primary key',
            'Long and wide layouts',
            'Unit conversion at the boundary',
            'Join validation',
            'Normal forms, informally',
          ],
          explanation: `Wickham's **tidy data** rules are simple: each variable is a column, each observation is a row, and each type of observational unit is a table. The hard part is deciding what an observation is.

Start by naming the **observational unit** in plain words. For AirData it is "one monitor on one day under one event treatment". For GHCN it is "one station on one day". For your analysis table it is "one calendar day in Cook County". Then state the **primary key**, the columns that identify a row, and check it:

\`\`\`python
key = ["site_id", "poc", "date"]
assert not tidy.duplicated(key).any()
\`\`\`

A key you have not tested is a guess. Pandas helps at joins too. Passing \`validate="one_to_one"\` to \`merge\` raises an error if the keys are not what you claim.

\`\`\`python
days = ozone_daily.merge(weather, on="date", how="left", validate="one_to_one")
assert len(days) == len(ozone_daily)
assert days["tmax_c"].notna().all()
\`\`\`

**Convert once, at the boundary.** Raw TMAX is tenths of a degree in a space-padded string. Convert it in exactly one function, name the output with its unit (\`tmax_c\`), and do not store both versions downstream. Put units in column names: \`o3_ppm\`, \`tmax_c\`. It looks fussy, and it prevents an entire class of errors.

Tidy is a working shape, not a universal law. Wide tables are fine for display, and long tables can be awkward for matrix computation. The principle behind the rules is **one fact in one place**, the same idea as normalisation in Database Systems. If a site's name appears on every row, a change of name can leave the table disagreeing with itself. Keep a \`sites\` table with one row per site instead.

In the case study, the county-day table has 306 rows: 153 days in each of two seasons. If your join produces anything else, stop. An unexpected row count is the cheapest bug you will ever find.`,
          resources: [
            { title: 'Tidy Data', url: 'https://www.jstatsoft.org/article/view/v059i10', type: 'article', cost: 'free', provider: 'Journal of Statistical Software', note: "Wickham (2014). Read sections 1 to 3.", primary: true },
            { title: 'R for Data Science: Data tidying', url: 'https://r4ds.hadley.nz/data-tidy.html', type: 'textbook', cost: 'free', provider: 'Wickham, Cetinkaya-Rundel and Grolemund', note: 'The ideas transfer directly to pandas `melt` and `pivot`.' },
          ],
          relatedLessons: ['databases/advanced-sql-and-design/functional-dependencies-and-normalization'],
          exercises: [
            {
              slug: 'tidy-the-case-study',
              title: 'Tidy both sources',
              prompt:
                'Produce `ozone` with key (`site_id`, `poc`, `date`) and `weather` with key `date`, keeping May to September of 2022 and 2023 and dropping ozone rows with `Observation Percent` below 75. Test each key. Reference values on the 2026-11-02 download: 2,977 season rows, 10 dropped, 2,967 kept, and 306 weather days with `tmax_c` from 10.0 to 37.8. Report any difference and explain it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'one-fact-one-place',
              title: 'Normalise the site names',
              prompt:
                'Split the ozone table into `readings` and `sites` (site ID, name, latitude, longitude, datum). Show with a test that each site ID maps to exactly one latitude and longitude. Show that two sites share the name `COOK COUNTY TRAILER`, and explain what would have happened had you grouped by name.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the observational unit of a table, and why state it?',
              answerOutline: 'What one row represents. Stating it determines the key and shows when a table mixes units.',
            },
            {
              question: 'What does `validate="one_to_one"` protect you from?',
              answerOutline: 'Duplicate keys that would multiply rows silently during a join.',
            },
            {
              question: 'Why put the unit in a column name?',
              answerOutline: 'The unit stays attached to the value everywhere the column travels, which prevents silent unit mix-ups.',
            },
          ],
        },
        {
          slug: 'naming-and-organisation',
          title: 'Naming and organising a project',
          summary:
            'File names that sort and parse, a folder layout that separates inputs from outputs, and a rule that a tool can check.',
          estimatedMinutes: 55,
          objectives: [
            'Write file names that are machine-readable, human-readable and sortable',
            'Lay out a project so that raw data, code and outputs are separate',
            'Express a naming convention as a pattern that a program can check',
            'Choose what goes into Git and what does not',
          ],
          concepts: [
            'ISO 8601 dates',
            'Machine-readable names',
            'Project layout',
            'data/raw and data/tidy',
            'README as an entry point',
            '.gitignore',
            'Naming convention as a lint rule',
          ],
          explanation: `Good names do three jobs. They are **machine-readable**, so that a glob or regular expression can select them. They are **human-readable**, so that the name says what is inside. And they **sort usefully**, so that a directory listing is already in order.

The rules are few. Use lowercase letters, digits, hyphens and underscores only. Avoid spaces, which break shell commands, and accented characters, which break across operating systems. Write dates as ISO 8601, \`2026-11-02\`, because they sort correctly as text. Pad numbers: \`fig-01\`, not \`fig-1\`. Never write \`final\`, \`final2\` or \`really-final\`, since version control exists to record that.

\`\`\`text
ozone-heat/
├── README.md             # what this is, how to run it
├── artifacts.csv         # the inventory
├── data/
│   ├── raw/              # read-only, never edited
│   ├── tidy/             # generated, never edited by hand
│   └── README.md         # provenance notes
├── src/                  # code that makes things
├── tests/
├── reports/              # generated outputs
└── docs/
\`\`\`

The layout expresses the rule from earlier: **inputs are separate from outputs, and anything generated can be deleted and rebuilt.** A useful test of a layout is to delete \`data/tidy\` and \`reports\`, then run one command to bring them back. Later modules automate exactly that.

A convention that nobody checks decays. Write it as a pattern and test it:

\`\`\`python
import re
NAME = re.compile(r"[a-z0-9]+([-_][a-z0-9]+)*(\\.[a-z0-9]+)+")
\`\`\`

Then walk the project in a test and fail on any non-matching file. You will need to exempt standard files such as \`README.md\`.

Git is for text you edit: code, configuration, documentation and small metadata files. It is poor at large binary files, whose every version it keeps forever. A \`.gitignore\` should exclude \`data/raw/\`, \`data/tidy/\`, virtual environments and caches. That leaves an obvious question: if the raw data is not in Git, how do you know which version you used? The next lesson answers it.`,
          resources: [
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'Use the sections on data organisation and file naming.', primary: true },
            { title: 'Good enough practices in scientific computing', url: 'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510', type: 'article', cost: 'free', provider: 'PLOS Computational Biology', note: 'Section 4 on project organisation.' },
          ],
          exercises: [
            {
              slug: 'rename-a-mess',
              title: 'Fix a messy folder',
              prompt:
                'Given these names, write a Python script that renames them to a consistent convention and prints a before-and-after table: `Final Report v2.docx`, `data(1).csv`, `Ozone 7-4-23.xlsx`, `fig1.png`, `fig10.png`, `fig2.png`, `notes FINAL final.txt`. Dates must become ISO 8601 and figure numbers must sort correctly. Say which name you could not rename without asking a human, and why.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'naming-lint',
              title: 'A naming lint test',
              prompt:
                'Write a `pytest` test that walks your case study folder, skips `.git` and `.venv`, and fails with a list of every name that breaks your convention. Prove that it works by adding `Bad Name.CSV` and watching it fail, then removing the file.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does ISO 8601 suit file names?',
              answerOutline: 'Year-month-day sorts chronologically as plain text and has no regional ambiguity.',
            },
            {
              question: 'What does deleting `data/tidy` and `reports` test?',
              answerOutline: 'Whether every derived artifact can really be rebuilt from raw inputs and code.',
            },
            {
              question: 'Why not simply commit all data to Git?',
              answerOutline: 'Git stores each version of large binary files permanently in history, which makes clones slow and repositories large. Hosts also limit file size.',
            },
          ],
        },
        {
          slug: 'versioning-data-and-code',
          title: 'Versioning data and code',
          summary:
            'Git for code, content hashes for data, and the content-addressed design behind tools such as Git LFS and DVC.',
          estimatedMinutes: 90,
          objectives: [
            'Compute and verify SHA-256 checksums of files',
            'Explain content addressing and why it deduplicates storage',
            'Record a dataset version as a manifest committed to Git',
            'Compare Git LFS, DVC and a simple manifest for a given project',
          ],
          concepts: [
            'Checksum and fixity',
            'SHA-256',
            'Content-addressed storage',
            'Manifest',
            'Snapshot',
            'Git LFS',
            'DVC',
            'Semantic versioning for data',
          ],
          explanation: `Git answers "which code?" You also need to answer "which data?", and a date or filename will not do it. A **checksum** will. SHA-256 maps any sequence of bytes to a 256-bit value, and changing one byte changes the result completely. For practical purposes, two files with the same hash are the same file.

\`\`\`python
import hashlib

def sha256_file(path, chunk=1 << 20):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while block := f.read(chunk):
            h.update(block)
    return h.hexdigest()
\`\`\`

The bytes \`hello\\n\` always hash to \`5891b5b522d5df08...\`. Read files as bytes, because text mode on Windows can translate line endings and so change the hash. Checking a stored hash against a fresh one is called a **fixity check**, and archives do this routinely to catch silent corruption.

**Content addressing** turns this into a storage design: store each file under the name of its own hash, for example \`objects/58/91b5b5...\`. Identical content lands at the same path, so it is stored once. Nothing can change without changing its address. Git's own object store works this way.

A **manifest** then records a version of a dataset: a small text file listing each logical path and its hash, plus source URL and retrieval time. The manifest is small, so it lives in Git, while the bytes live elsewhere. Commit the manifest and you have tied a code version to an exact data version.

Tools package the same idea. **Git LFS** replaces large files with pointer files and keeps the bytes on a server. **DVC** adds pipelines and many storage back ends. For a small project, a manifest plus a folder is often enough, and building one yourself is the best way to understand what the tools do. MP 1 does exactly that.

Data can also have **release versions**. A common convention borrowed from semantic versioning: major for a changed schema or meaning, minor for added data, patch for corrections.`,
          resources: [
            { title: 'Version control with Git', url: 'https://swcarpentry.github.io/git-novice/', type: 'course', cost: 'free', provider: 'Software Carpentry', note: 'A refresher if your Git is rusty. Do the first six episodes.', primary: true },
            { title: 'Git LFS', url: 'https://git-lfs.com/', type: 'tool', cost: 'free', provider: 'Git LFS project', note: 'See how pointer files work.' },
            { title: 'DVC documentation', url: 'https://dvc.org/doc', type: 'documentation', cost: 'free', provider: 'DVC', note: "Read 'Get Started: Data Versioning' and notice the `.dvc` pointer files." },
          ],
          relatedLessons: [
            'software-engineering/version-control-and-collaboration/git-internals-and-recovery',
            'cybersecurity/applied-cryptography/hashes-macs-and-kdfs',
          ],
          exercises: [
            {
              slug: 'detect-a-change',
              title: 'Detect a one-byte change',
              prompt:
                'Write `sha256_file` and test it: the empty file must give `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` and `hello\\n` must give `5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03`. Then flip one byte in a copy of a raw file and show that a fixity check fails. Show also what happens if you hash `hello\\r\\n` instead, and why that matters on Windows.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'tool-choice',
              title: 'Choose a versioning approach',
              prompt:
                'For three scenarios choose a manifest, Git LFS or DVC and justify the choice in a short paragraph each: (a) 3 CSV files of 5 MB that change yearly; (b) 40 GB of images shared by a team of six; (c) a pipeline with several stages whose intermediate results take hours to rebuild. State what you give up each time.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does content addressing give you that date-stamped folders do not?',
              answerOutline: 'Automatic deduplication and tamper evidence, because identical content has one address and any change produces a new one.',
            },
            {
              question: 'Why read files in binary mode when hashing?',
              answerOutline: 'Text mode may translate line endings or decoding, so the bytes hashed would not be the bytes on disk.',
            },
            {
              question: 'How does a committed manifest connect code and data versions?',
              answerOutline: 'The Git commit contains the hashes, so checking out the commit tells you exactly which data bytes belong with that code.',
            },
          ],
        },
      ],
    },
    {
      slug: 'metadata-and-documentation',
      title: 'Metadata and Documentation',
      description:
        'Descriptive, structural and administrative metadata, the standards and schemas that make it machine-readable, data dictionaries people can use, and validation that enforces what the documentation claims.',
      lessons: [
        {
          slug: 'kinds-of-metadata',
          title: 'Descriptive, structural and administrative metadata',
          summary:
            'What each kind of metadata is for, who needs it, and how to tell what is missing from a dataset you were given.',
          estimatedMinutes: 65,
          objectives: [
            'Define descriptive, structural and administrative metadata and give examples of each',
            'Audit a public dataset for missing metadata',
            'Explain how metadata supports discovery, interpretation and reuse',
            'Decide what metadata to capture automatically',
          ],
          concepts: [
            'Metadata',
            'Descriptive metadata',
            'Structural metadata',
            'Administrative metadata',
            'Technical and rights metadata',
            'Discovery versus reuse',
            'Metadata captured at creation',
          ],
          explanation: `**Metadata** is data about data, and a useful definition is more practical: it is what a stranger needs in order to find your data, trust it and use it correctly. NISO's *Understanding Metadata* divides it into three main kinds.

- **Descriptive metadata** supports discovery and identification: title, creators, abstract, keywords, dates, spatial and temporal coverage.
- **Structural metadata** says how the parts relate: which files make up the dataset, how tables join, what the columns are.
- **Administrative metadata** supports management: provenance, file format and fixity (technical metadata), and licence and access conditions (rights metadata).

Each kind answers a different person's question. A student searching for Chicago air quality data needs descriptive metadata. An analyst joining two tables needs structural metadata. An archivist deciding what to migrate needs administrative metadata.

Look at the case study's raw files with this in mind. AirData's file is excellent on structure, since its file formats page defines every column, and its name carries the parameter and year. It also records administrative information at row level through \`Date of Last Change\`. GHCN-Daily documents units and flags in a long readme, kept apart from the data, so anyone who gets the CSV without it will misread \`TMAX\` by a factor of ten.

That is the central failure of metadata: it gets **separated from the data**. Three habits help:

1. Keep metadata in a file beside the data, under version control.
2. Make it machine-readable, so that software can use and check it.
3. Capture it at creation. Your snapshot tool already knows the URL, time, size and hash, so it should write them down without anyone being asked.

Do not confuse volume with quality. Fifty fields of boilerplate help nobody, and a clear statement that "values are tenths of a degree Celsius" helps everyone. Ask of each field what decision it lets a reader make. Then read the NISO primer quickly, and audit one dataset closely with the exercise below.`,
          resources: [
            { title: 'Understanding Metadata (2017)', url: 'https://www.niso.org/publications/understanding-metadata-2017', type: 'textbook', cost: 'free', provider: 'NISO', note: 'A short primer by Jenn Riley. Read the first two parts.', primary: true },
            { title: 'Disciplinary metadata standards', url: 'https://www.dcc.ac.uk/guidance/standards/metadata', type: 'documentation', cost: 'free', provider: 'Digital Curation Centre', note: 'A directory of standards by discipline, useful for seeing what exists.' },
          ],
          exercises: [
            {
              slug: 'metadata-audit',
              title: 'Audit a public dataset',
              prompt:
                'Choose any dataset from a government open data portal. Fill a table with one row for each of 12 questions: who made it, when, why, what one row means, units, missing-value codes, coverage, update schedule, licence, how to cite it, known issues, and who to contact. Mark each answer found, partly found or missing, and classify it as descriptive, structural or administrative. Finish with the single missing fact that most limits reuse.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'capture-at-creation',
              title: 'Capture metadata automatically',
              prompt:
                'Write a function that takes a downloaded file and its URL and writes a JSON sidecar next to it with the URL, UTC retrieval time, byte size, SHA-256, the `Last-Modified` and `ETag` response headers if the server sends them, and the tool version. Run it on the three case study files and report which servers send which headers.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Classify these: a licence, a column list, an abstract.',
              answerOutline: 'Administrative (rights), structural and descriptive.',
            },
            {
              question: 'Why does separation from the data cause so many failures?',
              answerOutline: 'Files get copied without their documentation, so units and codes are lost and readers guess.',
            },
            {
              question: 'What question should you ask of each metadata field you consider adding?',
              answerOutline: 'What decision does this let a reader or a program make? If none, drop it.',
            },
          ],
        },
        {
          slug: 'standards-and-schemas',
          title: 'Standards and schemas',
          summary:
            'Dublin Core, DataCite, schema.org, Table Schema and Data Package: which one does which job, and why a schema is better than prose.',
          estimatedMinutes: 80,
          objectives: [
            'Choose a suitable standard for discovery metadata and for table structure',
            'Explain what a schema constrains and how it differs from documentation',
            'Write a Frictionless Table Schema for a tidy table',
            'Package a table and its metadata as a Data Package',
          ],
          concepts: [
            'Dublin Core',
            'DataCite metadata schema',
            'schema.org Dataset',
            'CSV on the Web',
            'Table Schema',
            'Data Package',
            'Controlled vocabulary',
            'Machine-actionable metadata',
          ],
          explanation: `Standards exist so that strangers' software can read your description. They split into two groups, and most projects need one of each.

**Discovery standards** describe a dataset as a whole. **Dublin Core** is the small, general ancestor, with 15 core elements. The **DataCite** schema is what you fill in to get a DOI, with required properties for identifier, creator, title, publisher, publication year and resource type. **schema.org/Dataset** is embedded in web pages so that search engines can index a dataset.

**Structural standards** describe tables. **Table Schema**, from the Frictionless project, is a small JSON format listing fields, types, constraints and primary keys. **Data Package** wraps tables and their schemas with a \`datapackage.json\` descriptor. **CSV on the Web** is the W3C equivalent.

A schema differs from prose because a program can enforce it:

\`\`\`json
{
  "primaryKey": ["site_id", "poc", "date"],
  "fields": [
    {"name": "site_id", "type": "string",
     "constraints": {"required": true, "pattern": "17-031-[0-9]{4}"}},
    {"name": "date", "type": "date", "format": "%Y-%m-%d",
     "constraints": {"required": true}},
    {"name": "o3_ppm", "type": "number",
     "constraints": {"required": true, "minimum": 0, "maximum": 0.3}}
  ]
}
\`\`\`

Note what this does. The \`pattern\` states the identifier format, and leading zeros are safe because the type is string. The maximum of 0.3 ppm is a judgement that values above it are errors rather than events, so write down why you chose it.

**Controlled vocabularies** do for values what schemas do for structure. If \`keywords\` are free text, one dataset says "ozone" and another says "O3". Use terms from a shared list where one exists, such as a discipline's thesaurus or a standard's own enumerations.

Do not invent your own format if a standard fits, and do not adopt a heavy standard your community does not use. For a tabular project, a Data Package for structure plus DataCite fields for discovery covers most needs. Choose by asking who will read this, and with what software.`,
          resources: [
            { title: 'Data Package standard', url: 'https://datapackage.org/', type: 'documentation', cost: 'free', provider: 'Frictionless Data', note: 'Read the Table Schema and Data Package specifications.', primary: true },
            { title: 'DataCite Metadata Schema', url: 'https://schema.datacite.org/', type: 'documentation', cost: 'free', provider: 'DataCite', note: 'See which properties are mandatory, recommended and optional.' },
            { title: 'DCMI Metadata Terms', url: 'https://www.dublincore.org/specifications/dublin-core/dcmi-terms/', type: 'documentation', cost: 'free', provider: 'Dublin Core Metadata Initiative' },
            { title: 'schema.org Dataset', url: 'https://schema.org/Dataset', type: 'documentation', cost: 'free', provider: 'schema.org', note: 'Look at the JSON-LD examples at the bottom of the page.' },
          ],
          relatedLessons: ['databases/relational-model-and-sql/ddl-constraints-and-modification'],
          exercises: [
            {
              slug: 'write-the-schema',
              title: 'Write the case study schema',
              prompt:
                'Write a Table Schema for `ozone`, `weather` and `days`, each with a primary key, and combine them in a `datapackage.json`. Add a foreign key from `days.date` if your design allows it. Run `frictionless validate datapackage.json` on your tidy files and fix anything it finds. For every numeric limit, add a one-line reason in the field `description`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'datacite-record',
              title: 'Write a DataCite record by hand',
              prompt:
                'Write a DataCite-style JSON record for the case study dataset, with all mandatory properties plus description, subjects, rights, geographic coverage and related identifiers pointing to the EPA and NOAA sources. Then embed the same facts as schema.org JSON-LD in a small HTML page. List which facts mapped cleanly and which did not.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference in purpose between DataCite and Table Schema?',
              answerOutline: 'DataCite describes the dataset as a citable thing for discovery. Table Schema describes the columns, types and constraints of a table.',
            },
            {
              question: 'What does a schema give you that a README cannot?',
              answerOutline: 'Enforcement. A program can reject data that breaks it, so documentation and data cannot quietly diverge.',
            },
            {
              question: 'When is it right not to adopt a standard?',
              answerOutline: 'When your community does not use it and it costs more than it returns. Reuse depends on what readers and their tools understand.',
            },
          ],
        },
        {
          slug: 'data-dictionaries',
          title: 'Data dictionaries and READMEs',
          summary:
            'Documentation a person can use: column-level definitions, how values were derived, known limitations and a README that gets someone started.',
          estimatedMinutes: 60,
          objectives: [
            'Write a data dictionary with definitions, units, ranges and missing-value rules',
            'Document derivations and limitations, not only names',
            'Write a README that lets a stranger start in minutes',
            'Generate documentation from a schema so that the two stay in step',
          ],
          concepts: [
            'Data dictionary',
            'Codebook',
            'Missing-value semantics',
            'Derivation notes',
            'Known limitations',
            'README structure',
            'Documentation as generated output',
          ],
          explanation: `A **data dictionary** has one row per column. At a minimum it gives the name, a definition in plain words, type, unit, allowed range or values, how missing values appear, and where the column came from.

| column | meaning | type | unit | range | missing | derivation |
|---|---|---|---|---|---|---|
| o3_max_ppm | Highest daily maximum 8-hour ozone among Cook County monitors with at least 75 percent of hours | number | ppm | 0 to 0.3 | never | max of \`1st Max Value\` over sites per date |
| tmax_c | Daily high at O'Hare | number | degrees C | -40 to 50 | never | \`TMAX\` / 10 |

The **derivation** column is the one most often left out and most often needed. "Ozone" is not a definition. Which statistic? Over what window? Across which monitors? After which filter? Each of these changes the number.

**Missing values** deserve explicit rules. An empty cell could mean not measured, not applicable, suppressed or below the detection limit, and those mean different things. Say which applies.

A **README** is the front door. A good one answers, in order:

1. What is this, in one or two sentences?
2. What question or result does it support?
3. How do I run it? Give exact commands.
4. What does each folder contain?
5. Where did the data come from, and under what terms?
6. What are the known limitations?
7. How do I cite it and whom do I contact?

Limitations are a mark of quality, not an admission of failure. For the case study you would state that one O'Hare station stands in for a whole county's weather, that monitors differ in location, that a county maximum is sensitive to which monitors reported that day (between 8 and 10 did), that the data does not separate temperature from stagnation or wildfire smoke, and that the slope is an association.

Finally, reduce duplication. If your schema already holds names, types and limits, **generate** the dictionary table from it with a short script, and write only definitions and derivations once, in the schema's \`description\` fields. Documentation that is generated cannot drift from the data.`,
          resources: [
            { title: 'Good enough practices in scientific computing', url: 'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510', type: 'article', cost: 'free', provider: 'PLOS Computational Biology', note: 'Sections on data management and on writing a README.', primary: true },
            { title: 'Data Organization in Spreadsheets lesson', url: 'https://datacarpentry.github.io/spreadsheet-ecology-lesson/', type: 'course', cost: 'free', provider: 'Data Carpentry', note: 'See the episode on metadata for a compact view of what to record.' },
          ],
          relatedLessons: ['software-engineering/requirements-architecture-and-documentation/documentation-that-works'],
          exercises: [
            {
              slug: 'dictionary-from-schema',
              title: 'Generate the dictionary',
              prompt:
                'Add `description` and `unit` to each field in your Table Schema, then write a script that renders `docs/data-dictionary.md` from it. Add a test that fails if a column in a tidy file has no entry, or if an entry describes a column that no longer exists.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stranger-test',
              title: 'The stranger test',
              prompt:
                'Give your README to someone who has not seen the project, or, failing that, follow it yourself in a fresh folder with no prior files. Time how long it takes to get to the first result. Write down each point of confusion and fix it. Include the timing before and after.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is "ozone" not an adequate column definition?',
              answerOutline: 'It omits the statistic, averaging window, monitors, filters and unit, any of which changes the value.',
            },
            {
              question: 'Name three different meanings an empty cell can have.',
              answerOutline: 'Examples: not measured, not applicable, suppressed for privacy, below detection limit.',
            },
            {
              question: 'Why generate the dictionary from the schema?',
              answerOutline: 'One source of truth. Generated documentation cannot disagree with the schema it comes from.',
            },
          ],
        },
        {
          slug: 'data-validation',
          title: 'Data validation',
          summary:
            'Turn documentation into checks: schema validation, cross-field and cross-table rules, and failing early when the source changes.',
          estimatedMinutes: 85,
          objectives: [
            'Separate structural, value and semantic checks',
            'Run Frictionless validation and read its error report',
            'Write rules that schemas cannot express',
            'Decide what should stop a pipeline and what should only warn',
          ],
          concepts: [
            'Validation levels',
            'Constraint errors',
            'Primary key checks',
            'Cross-table consistency',
            'Row-count expectations',
            'Fail fast versus warn',
            'Quarantining bad rows',
          ],
          explanation: `Validation asks whether data matches what you claim it is. It helps to think in levels.

- **Structural**: are the expected columns present, in the expected types?
- **Value**: is each value in range, in the right format, and present when required?
- **Relational**: are keys unique, and do foreign keys resolve?
- **Semantic**: do the numbers make sense together?

The Frictionless tool covers the first three from your schema.

\`\`\`python
from frictionless import Package

report = Package("datapackage.json").validate()
if not report.valid:
    for row in report.flatten(["rowNumber", "fieldName", "type"]):
        print(row)
    raise SystemExit(1)
\`\`\`

Test the validator by breaking your data on purpose. On the case study table with Frictionless 5.21, each of these gave a specific error: an ozone value of 0.5 gave \`constraint-error\`; a date written \`07/04/2023\` gave \`type-error\`; a site ID of \`17-31-0032\` gave \`constraint-error\`; a blank ozone value gave \`constraint-error\`; a repeated key gave \`primary-key\`. A validator you have never seen fail is one you should not trust.

Semantic rules need code, because a schema cannot express them:

\`\`\`python
assert 0.9 <= (len(days) / 306) <= 1.0        # row-count expectation
assert days["n_sites"].between(8, 10).all()   # coverage of monitors
assert days["year"].isin([2022, 2023]).all()
\`\`\`

Choose the response deliberately. A **hard failure** stops the pipeline, and suits anything that would make the result wrong. A **warning** records something odd but tolerable, such as one fewer monitor. **Quarantining** moves bad rows aside with a reason, and suits large feeds where one bad row should not stop everything. Whatever you drop, count it and report it, as you did with the 10 ozone rows below 75 percent completeness.

Validate at the boundaries: right after reading a source, so that a changed upstream file fails immediately with a clear message, and again before publishing. A failure at ingest costs a minute. The same problem found in a published figure costs far more. The pitfall is writing rules so loose that nothing fails, or so tight that they fail every month and get ignored.`,
          resources: [
            { title: 'Frictionless Framework: validating data', url: 'https://framework.frictionlessdata.io/docs/guides/validating-data.html', type: 'documentation', cost: 'free', provider: 'Frictionless Data', note: 'Shows the report structure and error types.', primary: true },
            { title: 'Pandera documentation', url: 'https://pandera.readthedocs.io/', type: 'documentation', cost: 'free', provider: 'Pandera', note: 'An alternative that validates DataFrames in code. Worth knowing, though this course uses Frictionless.' },
          ],
          relatedLessons: ['probability-statistics/statistics-in-practice/data-cleaning-and-exploration'],
          exercises: [
            {
              slug: 'break-it-on-purpose',
              title: 'Break it on purpose',
              prompt:
                'Write a `pytest` file that copies your clean `ozone.csv`, applies one corruption per test and asserts the expected error type: ozone 0.5 (`constraint-error`), a bad date (`type-error`), a bad site ID (`constraint-error`), a blank required value (`constraint-error`), a duplicated key (`primary-key`), and a removed column (at least `missing-label`). The clean file must pass.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'upstream-change-drill',
              title: 'An upstream change drill',
              prompt:
                'Simulate three upstream changes in a copy of the raw AirData file: rename `1st Max Value` to `First Max Value`, change the units text to `Parts per billion` with values multiplied by 1000, and add a duplicate monitor-day. Say which of your checks catch each one and at which stage. Add checks for any that pass silently.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Give one check at each of the four validation levels for the case study.',
              answerOutline: 'Structural: required columns exist. Value: ozone between 0 and 0.3. Relational: key unique. Semantic: 8 to 10 monitors each day, or 306 days.',
            },
            {
              question: 'Why test a validator by corrupting data?',
              answerOutline: 'A check that has never failed may not be running or may not check what you think.',
            },
            {
              question: 'When should a problem warn rather than fail?',
              answerOutline: 'When it is unusual but does not make the result wrong, and when failing would cause people to stop paying attention. It must still be recorded.',
            },
          ],
        },
      ],
    },
    {
      slug: 'reproducible-workflows',
      title: 'Reproducible Workflows',
      description:
        'From a working analysis to one command that anyone can run: pinned environments, containers, workflow managers, provenance, literate reports and continuous integration.',
      lessons: [
        {
          slug: 'environments-and-lockfiles',
          title: 'Environments and lockfiles',
          summary:
            'Why requirements.txt is not enough, how hash-pinned lockfiles work, and how to make one that works on Windows and Linux.',
          estimatedMinutes: 75,
          objectives: [
            'Separate direct dependencies from the full resolved set',
            'Generate a universal, hash-pinned lockfile with uv',
            'Rebuild an exact environment in a fresh virtual environment',
            'Say what a lockfile does not pin',
          ],
          concepts: [
            'Virtual environment',
            'Direct and transitive dependencies',
            'Version pinning',
            'Lockfile',
            'Hash checking',
            'Universal resolution',
            'Platform markers',
            'Upgrading on purpose',
          ],
          explanation: `A library can change a default between versions, so the same code on a new install can give a different number. Writing \`pandas\` in a requirements file means "whatever is newest today". Even \`pandas==3.1.0\` pins one package among dozens of transitive dependencies.

The fix has two files.

- **\`requirements.in\`** lists what you chose, loosely, and you edit it by hand.
- **\`requirements.lock\`** lists the complete resolved set with exact versions and hashes, and it is generated.

\`\`\`text
uv pip compile --universal --generate-hashes --python-version 3.12 requirements.in -o requirements.lock
uv venv
uv pip sync requirements.lock
\`\`\`

The **hashes** mean an installer refuses any file whose bytes differ from what you locked, so a replaced package on the index cannot slip in. \`--universal\` resolves for all platforms and adds markers, such as \`colorama==0.4.6 ; sys_platform == 'win32'\`, so that one lockfile serves Windows and Linux. A lock for six packages (pandas, pyarrow, numpy, frictionless, snakemake and quarto-cli) came to about 2,300 lines with around 1,800 hashes, which is why you never edit it by hand. A fresh \`uv pip sync\` from it took under a minute.

\`uv pip sync\` differs from install: it makes the environment match the lockfile exactly, removing anything extra. Treat the lockfile as an artifact and commit it. Upgrade on purpose, with a dedicated commit, and compare your results before and after.

Know the limits. A lockfile pins Python packages only, not the Python interpreter, the operating system or native libraries. It does not freeze the wheels' build, though hashes do fix which file you get. Floating-point results can differ between platforms and CPU instruction sets, which is one reason to round published outputs to a stated precision. The same pipeline, using pandas 3.1.0 and numpy 2.5.4 on both, gave byte-identical CSV outputs on Windows 10 with Python 3.13 and on Ubuntu under WSL 2 with Python 3.14. That was one measurement on one pipeline that rounds its outputs, not a guarantee.`,
          resources: [
            { title: 'uv: locking environments', url: 'https://docs.astral.sh/uv/pip/compile/', type: 'documentation', cost: 'free', provider: 'Astral', note: 'Covers `uv pip compile`, universal resolution and `uv pip sync`.', primary: true },
            { title: 'uv documentation', url: 'https://docs.astral.sh/uv/', type: 'documentation', cost: 'free', provider: 'Astral', note: 'Installation on Windows and the overview.' },
          ],
          relatedLessons: [
            'software-engineering/build-ci-cd-and-deployment/packaging-and-dependencies',
            'cybersecurity/secure-development-and-incident-response/software-supply-chain-security',
          ],
          exercises: [
            {
              slug: 'lock-the-case-study',
              title: 'Lock the case study',
              prompt:
                'Create `requirements.in` and `requirements.lock` for the case study. Delete your virtual environment, rebuild it with `uv pip sync`, and rerun the analysis. Record the time taken and the SHA-256 of your summary table before and after. Report the number of packages locked and how many are platform-specific.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'a-default-changed',
              title: 'Find a change between versions',
              prompt:
                'In two separate environments, install an older pandas 2.x and the version you currently use. Run the same script that reads a CSV with text columns and prints `dtypes`, then writes a few floats to CSV. Report every difference, and say which would change a downstream result and which only look different.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a hash in a lockfile protect against?',
              answerOutline: 'Installing different bytes under the same version, whether through corruption or tampering.',
            },
            {
              question: 'Name three things a Python lockfile does not pin.',
              answerOutline: 'The interpreter, the operating system and system libraries or hardware behaviour.',
            },
            {
              question: 'Why keep a separate `requirements.in`?',
              answerOutline: 'It records what you chose and why, separately from the generated full set, which makes upgrades deliberate.',
            },
          ],
        },
        {
          slug: 'containers',
          title: 'Containers',
          summary:
            'What an image does and does not freeze, a small reproducible Dockerfile, and running it through WSL 2 on Windows.',
          estimatedMinutes: 80,
          objectives: [
            'Explain images, containers and layers',
            'Write a Dockerfile that installs from a lockfile on a pinned base image',
            'Run a pipeline in a container with mounted data',
            'Judge when a container is worth the cost',
          ],
          concepts: [
            'Image and container',
            'Layers and build cache',
            'Base image pinning by digest',
            'Bind mounts',
            'Non-root user',
            'Reproducible build versus reproducible run',
            'WSL 2 backend',
          ],
          explanation: `A lockfile pins Python packages, and a **container image** goes further: it packages the interpreter, system libraries and your code in one artifact that runs the same way wherever a compatible runtime exists. On Windows, Docker Desktop's WSL 2 backend runs Linux containers. It is free for personal use.

\`\`\`dockerfile
# Pin by digest in real work: python:3.12-slim@sha256:<digest>
FROM python:3.12-slim
RUN pip install --no-cache-dir uv
WORKDIR /app
COPY requirements.lock .
RUN uv pip sync --system requirements.lock
COPY src/ src/
COPY workflow/ workflow/
RUN useradd --create-home runner
USER runner
ENTRYPOINT ["snakemake", "-s", "workflow/Snakefile", "--cores", "1"]
\`\`\`

\`\`\`text
docker build -t ozone-heat:dev .
docker run --rm -v "./data:/app/data" -v "./results:/app/results" ozone-heat:dev
\`\`\`

Some details matter. \`COPY\` the lockfile before the code, so that editing code does not reinstall everything, because Docker caches each layer. Mount data rather than baking it in, unless you intend to ship it. Run as a non-root user.

Be precise about what is frozen. A **tag** such as \`3.12-slim\` moves when maintainers rebuild it, whereas a **digest** names exact bytes. Rebuilding a Dockerfile next year may not give the same image even with a pinned base, because an \`apt-get install\` gets whatever is current. So the reliable artifact is the **built image**, stored in a registry and identified by its digest, and the Dockerfile is its recipe. For long-term keeping, an image in a registry is a dependency on that registry. \`docker save\` produces a tar file you can archive.

Containers are not always worth it. They add a build step, a daemon and, on Windows, a file-system boundary where bind mounts can be slow. For a pure-Python project with a good lockfile, a container may add little reproducibility. It earns its keep when you depend on system libraries, or need one environment across a team, or must rerun years later. On shared clusters, where Docker's daemon is usually not allowed, Apptainer plays the same role.`,
          resources: [
            { title: 'Docker: get started', url: 'https://docs.docker.com/get-started/', type: 'documentation', cost: 'free', provider: 'Docker', note: 'Concepts and a first image.', primary: true },
            { title: 'Docker Desktop WSL 2 backend', url: 'https://docs.docker.com/desktop/features/wsl/', type: 'documentation', cost: 'free', provider: 'Docker', note: 'Setup on Windows 10.' },
          ],
          relatedLessons: ['software-engineering/build-ci-cd-and-deployment/delivery-deployment-and-release'],
          exercises: [
            {
              slug: 'containerise-the-pipeline',
              title: 'Containerise the case study',
              prompt:
                'Write a Dockerfile as above, build it, and run the analysis on mounted data. Compare the SHA-256 of your summary table from the container with the one from your native Windows run. If they differ, find out why with `diff`, and decide whether the difference is a problem. Record image size and build time.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tag-versus-digest',
              title: 'Tag versus digest',
              prompt:
                'Use `docker image inspect` to find the digest of your base image. Change your `FROM` to pin that digest. Write a paragraph on what could change after six months with a tag-only base, with a digest-pinned base, and with an image saved by `docker save`. Note what each option depends on still existing.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a tag and a digest?',
              answerOutline: 'A tag is a movable name, while a digest is a hash of the exact image content.',
            },
            {
              question: 'Why copy the lockfile before the source code in a Dockerfile?',
              answerOutline: 'Layer caching: code edits then do not invalidate the slow dependency install layer.',
            },
            {
              question: 'When might a container add little beyond a lockfile?',
              answerOutline: 'For a pure-Python project with wheels available and no system dependencies, where a rerun in the near term is the main goal.',
            },
          ],
        },
        {
          slug: 'workflow-managers',
          title: 'Workflow managers',
          summary:
            'Replace a run-these-in-order README with a dependency graph that rebuilds only what changed, using Snakemake.',
          estimatedMinutes: 90,
          objectives: [
            'Express a pipeline as rules with inputs and outputs',
            'Explain how a workflow manager decides what to rerun',
            'Use a dry run to predict what will execute',
            'Make scripts part of the dependency graph',
          ],
          concepts: [
            'Directed acyclic graph',
            'Rule, input, output',
            'Incremental rebuild',
            'Dry run',
            'Rerun triggers',
            'Declaring code as an input',
            'Atomic outputs',
          ],
          explanation: `A numbered list of scripts in a README has two problems. People forget a step, and you have to rerun everything to be safe. A **workflow manager** solves both: you declare what each step reads and writes, and it derives a **directed acyclic graph** and runs only what is out of date.

Snakemake is widely used in research, is written in Python and runs on Windows. Each rule states its files:

\`\`\`python
rule all:
    input: "results/summary.csv"

rule tidy_weather:
    input:
        data="data/raw/USW00094846.csv",
        code="src/tidy_weather.py",
    output: "data/tidy/weather.csv"
    shell: "python {input.code} {output} {input.data}"

rule join:
    input:
        oz="data/tidy/ozone.csv",
        wx="data/tidy/weather.csv",
        code="src/join.py",
    output: "data/tidy/days.csv"
    shell: "python {input.code} {output} {input.oz} {input.wx}"
\`\`\`

\`\`\`text
snakemake -s workflow/Snakefile --cores 1        # build
snakemake -s workflow/Snakefile --cores 1 -n     # dry run: show the plan
snakemake -s workflow/Snakefile --cores 1 -F     # force a full rebuild
\`\`\`

Notice that **code is listed as an input**. If it were not, editing \`src/fit.py\` would not reliably mark results as stale. With the code declared, a dry run after editing \`fit.py\` on the case study listed exactly two jobs: \`fit\` and \`all\`. The tidy and join steps did not rerun.

Be careful about assumptions on what triggers a rerun. Snakemake 9 considers modification times, but in a test on this project, simply using \`touch\` on a small generated file did not cause a rerun, because its content had not changed. Its behaviour depends on the version and on \`--rerun-triggers\`, so check with \`-n\` rather than assume.

Good rules are pure functions of their declared inputs. A step that also reads an undeclared file, or today's date, or the network, breaks the model, because the manager cannot see it. Write outputs completely or not at all, and treat a failed step's partial file as invalid. Snakemake deletes outputs of failed jobs for this reason.

The test of a workflow is simple: delete every generated file, run one command, and get the same bytes back. DVC and Make can play the same role, and the idea transfers.`,
          resources: [
            { title: 'Snakemake documentation', url: 'https://snakemake.readthedocs.io/en/stable/', type: 'documentation', cost: 'free', provider: 'Snakemake', note: 'Do the basic tutorial, using `shell:` rules. On Windows, avoid Bash-specific syntax in commands.', primary: true },
            { title: 'DVC documentation', url: 'https://dvc.org/doc', type: 'documentation', cost: 'free', provider: 'DVC', note: 'Compare its data pipelines with the Snakemake model.' },
          ],
          exercises: [
            {
              slug: 'pipeline-from-scratch',
              title: 'Write the pipeline',
              prompt:
                'Write a Snakefile for the case study with rules for tidying ozone, tidying weather, joining and fitting. Delete `data/tidy` and `results`, and run one command. Run it again and confirm that nothing is done. Then edit `src/fit.py` and show with `-n` that only the fit step and `all` will run. Finally draw the graph with `--dag`, or by hand if you lack Graphviz.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hidden-input',
              title: 'Find a hidden input',
              prompt:
                'Deliberately add a hidden input: make one script read a threshold from an undeclared `config.txt`. Change the threshold and show that Snakemake reports nothing to do while the output is now stale. Fix it by declaring the file. Explain in two sentences why this class of bug is dangerous.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why list the script as an input to its rule?',
              answerOutline: 'So that a change to the code marks the output as out of date and triggers a rebuild.',
            },
            {
              question: 'What does a dry run tell you?',
              answerOutline: 'Which jobs would run and why, without executing them.',
            },
            {
              question: 'What makes a rule a pure function of its inputs, and why does it matter?',
              answerOutline: 'Its output depends only on declared inputs. Hidden inputs are invisible to the manager, so outputs can be stale while reported up to date.',
            },
          ],
        },
        {
          slug: 'provenance',
          title: 'Provenance',
          summary:
            'Record which inputs, code and environment produced each output, using the W3C PROV model and RO-Crate packaging.',
          estimatedMinutes: 70,
          objectives: [
            'Describe the PROV entities, activities and agents',
            'Generate a provenance record during a pipeline run',
            'Trace a result back to the exact raw inputs',
            'Explain what RO-Crate adds',
          ],
          concepts: [
            'Provenance',
            'W3C PROV',
            'Entity, activity, agent',
            'used and wasGeneratedBy',
            'wasDerivedFrom',
            'Retrospective and prospective provenance',
            'RO-Crate',
          ],
          explanation: `**Provenance** is the record of how something came to be. For a data result, it answers: which raw files, which code version, which environment, run by whom, and when.

The W3C PROV standard models this with three kinds of thing:

- An **entity** is a thing, such as a file with a specific hash.
- An **activity** is something that happened, such as a run of \`fit.py\`.
- An **agent** is who or what is responsible, such as a person or a software tool.

Relations connect them: an activity \`used\` an entity, an entity \`wasGeneratedBy\` an activity, an entity \`wasDerivedFrom\` another entity, and an activity \`wasAssociatedWith\` an agent.

\`\`\`json
{
  "entity": {
    "file:results/summary.csv": {"sha256": "46bed589..."},
    "file:data/tidy/days.csv": {"sha256": "e31e4631..."}
  },
  "activity": {
    "run:fit": {"code_sha256": "...", "git_commit": "...", "started": "2026-11-02T16:41:00Z"}
  },
  "used": {"u1": {"activity": "run:fit", "entity": "file:data/tidy/days.csv"}},
  "wasGeneratedBy": {"g1": {"entity": "file:results/summary.csv", "activity": "run:fit"}}
}
\`\`\`

There are two senses of the word. **Prospective provenance** is the recipe: your Snakefile says what should happen. **Retrospective provenance** is the log: this particular run, with these hashes, at this time. You want both, and the Snakefile alone cannot tell you which data version produced last month's figure.

With hashes on every entity, provenance becomes checkable. A test can walk from \`results/summary.csv\` back through \`used\` and \`wasGeneratedBy\` links to the raw SHA-256 values in your snapshot manifest, and recompute each hash along the way. If any link breaks, the record is wrong or a file changed after the run.

**RO-Crate** is a community packaging standard. It puts data, code and a JSON-LD file \`ro-crate-metadata.json\` in one folder, so that a whole research object can be deposited and understood by tools. It uses schema.org terms and can include workflow descriptions.

Keep provenance proportional. Record it automatically in the pipeline. A provenance log that someone maintains by hand will soon be wrong, which is worse than having none.`,
          resources: [
            { title: 'PROV-Overview', url: 'https://www.w3.org/TR/prov-overview/', type: 'documentation', cost: 'free', provider: 'W3C', note: 'A map of the PROV documents.', primary: true },
            { title: 'PROV Primer', url: 'https://www.w3.org/TR/prov-primer/', type: 'documentation', cost: 'free', provider: 'W3C', note: 'Read sections 2 and 3 for the core concepts with examples.' },
            { title: 'RO-Crate', url: 'https://www.researchobject.org/ro-crate/', type: 'documentation', cost: 'free', provider: 'RO-Crate community', note: 'Look at a minimal crate example.' },
          ],
          exercises: [
            {
              slug: 'provenance-in-the-pipeline',
              title: 'Record provenance in the pipeline',
              prompt:
                'Add a final rule that writes `results/provenance.json` in the shape above, with an entity for each file, an activity for each rule, the Git commit, and tool versions. Then write `trace.py results/summary.csv`, which prints the chain back to raw file hashes and exits 1 if any recomputed hash does not match.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'read-a-crate',
              title: 'Read an RO-Crate',
              prompt:
                'Write a minimal `ro-crate-metadata.json` by hand for your results folder following the specification, with a root dataset, two files, a licence and an author. List three things it records that your Data Package does not, and three that it does not.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give an example of each PROV type from the case study.',
              answerOutline: 'Entity: summary.csv with its hash. Activity: a run of fit.py. Agent: you or Snakemake.',
            },
            {
              question: 'What is the difference between prospective and retrospective provenance?',
              answerOutline: 'Prospective is the planned recipe. Retrospective records what actually ran, with exact inputs and versions.',
            },
            {
              question: 'Why must provenance be recorded automatically?',
              answerOutline: 'Manual records drift or get skipped, and a wrong record is worse than none because it is believed.',
            },
          ],
        },
        {
          slug: 'literate-reports-and-automation',
          title: 'Literate reports and automation',
          summary:
            'Reports whose numbers come from the results files, and continuous integration that reruns everything on a clean machine.',
          estimatedMinutes: 85,
          objectives: [
            'Write a Quarto report that takes every number from pipeline outputs',
            'Render a report as a pipeline step',
            'Write a GitHub Actions workflow that runs validation and the pipeline',
            'Decide what CI should use for data it cannot store',
          ],
          concepts: [
            'Literate programming',
            'Quarto',
            'Inline computed values',
            'Self-contained HTML',
            'Continuous integration',
            'Clean-machine test',
            'Small fixture data',
          ],
          explanation: `The most common way for a report to go wrong is a number typed by hand that no longer matches the analysis. **Literate reports** keep narrative and computation together, so that numbers in the text are computed when the report is built.

\`\`\`text
---
title: "Ozone and heat"
format:
  html:
    embed-resources: true
jupyter: python3
---

The slope is \`{python} slope\` ppb per degree.
\`\`\`

Quarto, from Posit, renders such files. It installs from an installer, or from PyPI as \`quarto-cli\`, which means it can go in your lockfile. Rendering Python cells also needs Jupyter's packages, \`nbformat\`, \`nbclient\` and \`ipykernel\`. A rendered test report on this project took about 14 seconds. \`embed-resources: true\` produces one HTML file that can be sent anywhere.

The rule to follow: **the report reads \`results/*.csv\` and computes nothing important itself.** Analysis belongs in pipeline steps, where it is tested. The report presents it. Then make rendering a Snakemake rule, with the results as inputs, so that a changed result rebuilds the report.

**Continuous integration** answers the question "does this work on a machine that is not mine?"

\`\`\`yaml
name: pipeline
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v6
      - run: uv venv && uv pip sync requirements.lock
      - run: uv run --no-sync pytest
      - run: uv run --no-sync snakemake -s workflow/Snakefile --cores 1 --config fixture=true
\`\`\`

CI brings a practical problem: your raw data should not be in Git, and CI should not depend on a server that might be down. The usual answers are a **small fixture**, a few hundred real or synthetic rows committed to the repository, for the everyday run, plus a scheduled full run that fetches the frozen snapshot from a release asset and verifies its hashes.

Automation also makes a promise you must keep: if CI is red for a week and nobody cares, it is decoration. Keep it fast and meaningful. Read Quarto's Python guide and GitHub's Actions quickstart, then connect them to your pipeline.`,
          resources: [
            { title: 'Quarto guide', url: 'https://quarto.org/docs/guide/', type: 'documentation', cost: 'free', provider: 'Posit', note: 'Read Computations with Python and Inline Code.', primary: true },
            { title: 'quarto-cli on PyPI', url: 'https://pypi.org/project/quarto-cli/', type: 'tool', cost: 'free', provider: 'Quarto project', note: 'Installs the Quarto tools through pip or uv, which lets them go in a lockfile.' },
            { title: 'GitHub Actions documentation', url: 'https://docs.github.com/en/actions', type: 'documentation', cost: 'free', provider: 'GitHub', note: 'Free for public repositories.' },
          ],
          relatedLessons: [
            'software-engineering/build-ci-cd-and-deployment/continuous-integration',
            'probability-statistics/statistics-in-practice/visualisation-and-reproducible-reporting',
          ],
          exercises: [
            {
              slug: 'no-typed-numbers',
              title: 'A report with no typed numbers',
              prompt:
                'Write `report/report.qmd` for the case study with a one-paragraph method, the summary table, a scatter plot and a limitations section. Every number in the prose must be inline code. Add a rule to the pipeline to render it. Change one rounding in `fit.py` and show that the sentence in the report changes without editing the report.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'fixture-and-ci',
              title: 'A fixture and a CI run',
              prompt:
                'Create a fixture of at most 200 rows that still passes your validation, and make the pipeline accept it through a config value. Add a GitHub Actions workflow that runs tests, validation and the fixture pipeline on `ubuntu-latest` and `windows-latest`. Push a commit that breaks validation and confirm that CI goes red. Record the run time of each job.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What error does a literate report prevent?',
              answerOutline: 'Numbers in the prose going out of step with the analysis.',
            },
            {
              question: 'Why should real analysis stay out of the report file?',
              answerOutline: 'Pipeline steps are tested, cached and tracked by provenance. A report should present results rather than be the only place they are computed.',
            },
            {
              question: 'How can CI work when raw data is not in Git?',
              answerOutline: 'Use a small committed fixture for routine runs, with a scheduled full run that fetches a frozen snapshot and verifies its hashes.',
            },
          ],
        },
      ],
    },
    {
      slug: 'repositories-and-preservation',
      title: 'Repositories and Preservation',
      description:
        'What happens after the project: the FAIR principles, choosing a repository, persistent identifiers and citation, licences, and who pays to keep data alive.',
      lessons: [
        {
          slug: 'fair-principles',
          title: 'The FAIR principles',
          summary:
            'Findable, Accessible, Interoperable, Reusable: what the principles actually say, what they do not say, and how to assess a dataset against them.',
          estimatedMinutes: 70,
          objectives: [
            'State what each FAIR letter requires',
            'Explain why FAIR is not the same as open',
            'Assess a dataset against FAIR with evidence',
            'Explain how the CARE principles complement FAIR',
          ],
          concepts: [
            'Findable',
            'Accessible',
            'Interoperable',
            'Reusable',
            'Machine-actionability',
            'FAIR versus open',
            'CARE principles',
            'Rich metadata and persistent identifiers',
          ],
          explanation: `Wilkinson and colleagues published the FAIR Guiding Principles in 2016 as 15 short statements. Their distinctive point is **machine-actionability**: computers, not just people, should be able to find and use data with little human help.

- **Findable**: data has a globally unique, persistent identifier and rich metadata, and is registered in a searchable resource.
- **Accessible**: metadata and data can be retrieved by identifier through a standard, open protocol, with authentication where necessary. Metadata should remain available even if the data no longer is.
- **Interoperable**: data and metadata use a formal, shared language and vocabularies, and they refer to other data with qualified references.
- **Reusable**: data carries accurate attributes, a clear licence, detailed provenance, and follows community standards.

The most common misreading is that FAIR means open. It does not. Data about patients can be fully FAIR while tightly restricted, as long as the metadata says it exists and explains how access is decided. Equally, an open CSV on a personal web page with no identifier, licence or description is open but scores badly on every letter.

Apply it to the case study as an exercise in honesty. A CSV on your laptop fails nearly everything. A tidy repository on GitHub is better, but a repository URL is not persistent and Git history can be rewritten. Depositing a Data Package on a repository with a DOI, licence and DataCite metadata addresses most of it.

FAIR is about data handling, and says nothing about who benefits or who decides. The **CARE Principles for Indigenous Data Governance**, from the Global Indigenous Data Alliance (Carroll and colleagues, 2020), add Collective benefit, Authority to control, Responsibility and Ethics. They are a response to the risk that making data easy to reuse can increase harm to communities that never controlled it. The Ethics and Policy course develops this.

Automated FAIR scores exist, and they are useful as a checklist, but treat them with care. They test what can be measured by a program, and a high score does not mean the data is well described or fit for your purpose.`,
          resources: [
            { title: 'The FAIR Guiding Principles for scientific data management and stewardship', url: 'https://www.nature.com/articles/sdata201618', type: 'article', cost: 'free', provider: 'Scientific Data', note: 'Wilkinson et al. (2016). The source. Read Box 2 closely.', primary: true },
            { title: 'The CARE Principles for Indigenous Data Governance', url: 'https://datascience.codata.org/articles/10.5334/dsj-2020-043', type: 'article', cost: 'free', provider: 'Data Science Journal', note: 'Carroll et al. (2020).' },
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'See the chapters on FAIR and on open data.' },
          ],
          exercises: [
            {
              slug: 'fair-assessment',
              title: 'Assess two datasets against FAIR',
              prompt:
                'Assess the EPA AirData ozone file and any dataset on Zenodo against each of the 15 FAIR statements. For each, give met, partly met or not met, with one line of evidence that someone could check. Summarise the two most valuable improvements for each dataset. Do not give an overall score.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'fair-not-open',
              title: 'FAIR but not open',
              prompt:
                'Describe a design for a dataset of student wellbeing surveys that is FAIR but not open. Say exactly what is public, what is restricted, who decides access and by what rule, and what the metadata states. Use one paragraph per FAIR letter.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Can restricted data be FAIR? How?',
              answerOutline: 'Yes. Its metadata can be open and rich, with an identifier and a clear procedure for authorised access.',
            },
            {
              question: 'What does machine-actionable mean here?',
              answerOutline: 'Software can find, read and use the data and metadata with little or no human interpretation.',
            },
            {
              question: 'What does CARE address that FAIR does not?',
              answerOutline: 'People and purpose: collective benefit, authority to control, responsibility and ethics, particularly for Indigenous peoples.',
            },
          ],
        },
        {
          slug: 'repositories-and-identifiers',
          title: 'Repositories, identifiers and citation',
          summary:
            'Choosing where data goes, how DOIs and version DOIs work, and how to cite data so that the credit and the link both last.',
          estimatedMinutes: 75,
          objectives: [
            'Choose a repository using stated criteria',
            'Explain what a DOI guarantees and what it does not',
            'Use concept and version DOIs correctly',
            'Write a machine-readable citation for data and software',
          ],
          concepts: [
            'General and domain repositories',
            'Trustworthy repository certification',
            'DOI',
            'Concept DOI and version DOI',
            'ORCID and ROR',
            'CITATION.cff',
            'Data citation',
            'Link rot',
          ],
          explanation: `GitHub is a development platform, not an archive. A repository there can be deleted, renamed or rewritten at any time. For anything meant to last, deposit in a **repository** that commits to persistence.

Choose in this order. Use a **domain repository** if a respected one exists for your field, since that is where your community looks and its curators know the standards. Otherwise use your **institution's repository**, or a **general repository** such as Zenodo, Dataverse or Dryad. re3data.org is a searchable registry of repositories. Criteria that matter: persistent identifiers, stated preservation commitments, licence options, access controls for sensitive data, size limits and cost. **CoreTrustSeal** certification is one external signal of good practice.

A **DOI** is a persistent identifier that resolves through a central registry to wherever the object currently lives. Note what that means. A DOI is a promise by a person or organisation to keep the redirect working. It is not magic, and it does not store anything. Its strength comes from the institution behind it.

Datasets change, so repositories separate two things. Zenodo gives a **concept DOI** that always points to the latest version, and a **version DOI** for each release. **Cite the version DOI** in anything that depends on exact numbers. Zenodo's GitHub integration can mint a DOI for each tagged release, and offers a sandbox at \`sandbox.zenodo.org\` for practice, whose DOIs are not real.

Identify people and organisations too: **ORCID** for researchers, **ROR** for institutions.

**Data citation** follows the same logic as citing a paper: creators, year, title, version, repository, identifier. A \`CITATION.cff\` file in a repository makes this machine-readable, and GitHub shows a "Cite this repository" button based on it.

\`\`\`yaml
cff-version: 1.2.0
title: "Ozone and heat in Chicago: data and pipeline"
message: "Please cite this version."
authors:
  - family-names: Learner
    given-names: Ada
    orcid: https://orcid.org/0000-0002-1825-0097
version: 1.0.0
doi: 10.5281/zenodo.1234567
date-released: 2026-11-02
\`\`\`

Why bother? Plain URLs decay. Klein and colleagues (2014) reported that about one in five science, technology and medicine articles they examined had reference rot.`,
          resources: [
            { title: 'Zenodo help', url: 'https://help.zenodo.org/docs/', type: 'documentation', cost: 'free', provider: 'Zenodo', note: 'Read about DOI versioning and the GitHub integration.', primary: true },
            { title: 're3data: Registry of Research Data Repositories', url: 'https://www.re3data.org/', type: 'tool', cost: 'free', provider: 're3data', note: 'Search for a repository by subject.' },
            { title: 'Citation File Format', url: 'https://citation-file-format.github.io/', type: 'documentation', cost: 'free', provider: 'CFF project', note: 'Includes a form that generates a valid file.' },
            { title: 'CoreTrustSeal', url: 'https://www.coretrustseal.org/', type: 'documentation', cost: 'free', provider: 'CoreTrustSeal', note: 'See the requirements a certified repository must meet.' },
          ],
          exercises: [
            {
              slug: 'choose-a-repository',
              title: 'Choose a repository',
              prompt:
                'For the case study, compare three candidates from re3data using a table with: subject fit, identifier type, licence options, size limit, stated preservation policy, cost and certification. Choose one and defend the decision in a paragraph, including what you would do if it closed down.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'sandbox-deposit',
              title: 'Make a sandbox deposit',
              prompt:
                'Create a free account on `sandbox.zenodo.org`. Deposit your Data Package with full metadata, then publish a second version with one change. Record the concept DOI and both version DOIs, and resolve each one to show where it goes. Sandbox identifiers are not real DOIs, so do not cite them anywhere.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a DOI guarantee?',
              answerOutline: 'Only that an organisation has committed to maintaining a resolvable identifier. Persistence depends on the registrant and repository.',
            },
            {
              question: 'Which DOI should a paper cite, and why?',
              answerOutline: 'The version DOI, since the concept DOI moves to newer versions whose numbers may differ.',
            },
            {
              question: 'Why is GitHub alone insufficient for preservation?',
              answerOutline: 'Repositories can be deleted or rewritten, and there is no preservation commitment or persistent identifier.',
            },
          ],
        },
        {
          slug: 'licences-for-data-and-code',
          title: 'Licences for data and code',
          summary:
            'Why reuse needs a licence, the common choices for data and for software, and what public-domain government data lets you do.',
          estimatedMinutes: 65,
          objectives: [
            'Explain why an unlicensed dataset is hard to reuse',
            'Choose a licence for data and a separate one for code',
            'Find and record the terms of each source in a project',
            'Check compatibility when combining sources',
          ],
          concepts: [
            'Copyright in facts and databases',
            'CC0',
            'CC BY 4.0',
            'Open Data Commons licences',
            'Permissive and copyleft code licences',
            'US government works',
            'Licence compatibility',
          ],
          explanation: `This lesson is education, not legal advice. Rules differ by country, and they are stated here as of 2 November 2026.

Without a licence, others cannot safely tell what they may do. **Adding one is how you give permission.** Licences for data are unusually subtle, because in the US plain facts are not protected by copyright (*Feist v. Rural*, 1991), though a creative selection or arrangement can be. The EU additionally has a *sui generis* database right. So a dataset's legal status can be complicated, and a clear licence or waiver removes the doubt.

Common choices for **data**:

- **CC0** waives rights as far as law allows, placing data effectively in the public domain. Many repositories favour it because combining datasets then raises no attribution-stacking problem. Citation stays a scholarly norm rather than a legal condition.
- **CC BY 4.0** allows any use with attribution.
- **ODC-By and ODbL**, from Open Data Commons, are database-specific licences, and ODbL adds share-alike conditions.

Avoid non-commercial and no-derivatives terms for research data if you can. They block more reuse than authors expect, since "commercial" is unclear, and combining with other sources becomes hard.

**Code** needs a software licence, not Creative Commons. MIT, BSD and Apache-2.0 are permissive, while the GPL family requires derived works to stay under the same terms. For a project with both, a common setup is MIT for code and CC BY 4.0 or CC0 for data, recorded in \`LICENSE\` and in the metadata.

You must also honour the terms of what you took. Under 17 U.S.C. 105, works of the US federal government are not protected by US copyright, which is generally why EPA and NOAA data is free to reuse in the US, though you should still cite it and read the source's own statements, because a federal site may hold third-party material. Record each source's terms in your inventory. Keep in mind that a licence covers rights in the data, and does not settle privacy. Openly licensing data about people can be lawful under copyright and still wrong, or unlawful, for other reasons.`,
          resources: [
            { title: 'About CC licenses', url: 'https://creativecommons.org/share-your-work/cclicenses/', type: 'documentation', cost: 'free', provider: 'Creative Commons', note: 'Short summaries of each licence, and CC0.', primary: true },
            { title: 'Open Data Commons', url: 'https://opendatacommons.org/', type: 'documentation', cost: 'free', provider: 'Open Knowledge Foundation', note: 'The database-specific licences.' },
            { title: 'Choose a License', url: 'https://choosealicense.com/', type: 'tool', cost: 'free', provider: 'GitHub', note: 'For code. See the comparison table.' },
          ],
          exercises: [
            {
              slug: 'licence-inventory',
              title: 'A licence inventory',
              prompt:
                'Add `terms` and `terms_url` columns to `artifacts.csv`. For each raw source, quote the sentence on the source site that states the terms, or say that you could not find one. Choose licences for your code and derived data, write `LICENSE` and `LICENSE-DATA`, and justify each in two sentences.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'compatibility-puzzle',
              title: 'A compatibility puzzle',
              prompt:
                'You combine a CC BY 4.0 table, an ODbL table and a dataset labelled CC BY-NC 4.0 to build a product a startup will sell. Work through what the combined work may and may not be, what attribution is needed, and which source you would replace first. State what you are unsure about and who you would ask.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do many repositories prefer CC0 for data?',
              answerOutline: 'It removes legal conditions, so combining many datasets does not create attribution stacking or conflict. Citation remains a norm.',
            },
            {
              question: 'Why not use Creative Commons for code?',
              answerOutline: 'It lacks software-specific terms on source code, patents and distribution. Creative Commons itself advises using software licences.',
            },
            {
              question: 'Does an open licence on a dataset settle whether it is ethical or lawful to share?',
              answerOutline: 'No. It covers copyright-type rights, not privacy, consent or other duties.',
            },
          ],
        },
        {
          slug: 'economics-of-preservation',
          title: 'The economics of preservation',
          summary:
            'Storage is the small part. What keeping data really costs, why the cost does not end, who pays, and how to decide what to keep.',
          estimatedMinutes: 85,
          objectives: [
            'Break the cost of preservation into ingest, storage and access',
            'Estimate an endowment for storing data indefinitely',
            'Explain how a slowing fall in storage prices changes the sums',
            'Argue for a selection and appraisal decision',
          ],
          concepts: [
            'Total cost of ownership',
            'Ingest, preservation and access costs',
            'Endowment model',
            'Kryder rate',
            'Discount rate',
            'Appraisal and selection',
            'Sustainability models',
            'LOCKSS',
          ],
          explanation: `Keeping data alive is an unfunded commitment that never ends. A grant pays for three years, and the archive must pay for decades. The Blue Ribbon Task Force on Sustainable Digital Preservation and Access (2010) made the key economic point: digital preservation fails less often for lack of technology than for lack of clear incentives and of an organisation responsible for paying.

**Storage is not the main cost.** David Rosenthal, who works on LOCKSS, has often cited a rough breakdown of ingest at about half, preservation about a third, and access the remainder. Treat that as a rule of thumb, because the mix varies a lot. Human work on description, checking and format migration is usually expensive, and it is why good metadata at creation saves money later.

You can reason about storage with an **endowment**: the money you must set aside today to pay for storage forever. With monthly price $p$, storage price falling at annual rate $k$ (the **Kryder rate**), and a discount rate $d$, the cost over $T$ months is

$$ E = \\sum_{t=0}^{T-1} p \\, \\frac{(1-k)^{t/12}}{(1+d)^{t/12}}. $$

For 100 GiB at an illustrative 0.023 dollars per GiB per month, the undiscounted cost is 276 dollars over 10 years and 1,380 dollars over 50. With prices falling 10 percent a year and a 3 percent discount rate, the 50-year figure drops to about 205 dollars, and it barely grows after that, since the sum converges to about 206 dollars. If the price decline slows to 2 percent, the same 50 years costs about 510 dollars.

That sensitivity is the lesson. Rosenthal has argued for years that the Kryder rate has slowed, so endowments set on old assumptions are too small. Your estimate rests on a forecast, so report a range.

Since not everything can be kept, **appraisal** decides what to keep. Ask whether the data can be regenerated, what a re-creation would cost, and who would use it. Raw observations of something that will not happen again are precious, while intermediate tables that rebuild in a minute are not. **Sustainability models** include institutional funding, consortium membership, deposit fees and endowments. **LOCKSS**, "lots of copies keep stuff safe", is the principle that independent copies protect against technical, organisational and funding failure.`,
          resources: [
            { title: 'Life-Cycle Decisions for Biomedical Data: The Forecast Costs', url: 'https://nap.nationalacademies.org/catalog/25639', type: 'textbook', cost: 'free', provider: 'US National Academies', note: 'A framework for forecasting costs across a data life cycle. Read the summary and one chapter on cost drivers.', primary: true },
            { title: "DSHR's Blog", url: 'https://blog.dshr.org/', type: 'article', cost: 'free', provider: 'David Rosenthal', note: 'Long-running commentary on storage costs and digital preservation. Search for posts on the economics of long-term storage and the Kryder rate.' },
            { title: 'LOCKSS Program', url: 'https://www.lockss.org/', type: 'documentation', cost: 'free', provider: 'Stanford University', note: 'The principle in practice.' },
            { title: 'Digital Preservation Coalition', url: 'https://www.dpconline.org/', type: 'documentation', cost: 'free', provider: 'DPC', note: 'The Digital Preservation Handbook is a good reference for practice.' },
          ],
          exercises: [
            {
              slug: 'endowment-calculator',
              title: 'An endowment calculator',
              prompt:
                'Write `endowment(gib, usd_per_gib_month, years, decline, discount)` using the sum above. Your function must give 276.00 for (100, 0.023, 10, 0, 0), 1380.00 for (100, 0.023, 50, 0, 0), 152.35 for (100, 0.023, 10, 0.10, 0.03) and 205.48 for (100, 0.023, 50, 0.10, 0.03). Plot the 50-year cost against the decline rate from 0 to 20 percent, and say which assumption matters most. Treat 0.023 as an illustrative price rather than a quote.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'appraise-the-case-study',
              title: 'Appraise the case study',
              prompt:
                'Using your `artifacts.csv`, decide for each artifact whether to keep it for 1, 10 or 50 years or to discard it. Give the reason, its size, and the estimated cost to recreate it. Compare with the cost of keeping it. Say who should pay, and what happens to the project if that person leaves.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is storage not the main cost of preservation?',
              answerOutline: 'Ingest, description, checking, migration and support involve people and tend to cost more than the disks.',
            },
            {
              question: 'What happens to an endowment if the Kryder rate slows?',
              answerOutline: 'It must grow, because future storage costs more than forecast. The result is sensitive to that assumption.',
            },
            {
              question: 'What does appraisal weigh?',
              answerOutline: 'Likely future value against the cost of keeping, and whether the data can be regenerated or never recreated.',
            },
          ],
        },
      ],
    },
    {
      slug: 'data-management-plans',
      title: 'Data Management Plans',
      description:
        'Turning everything so far into a plan: what funders require as of late 2026, writing a plan that people use, handling sensitive data, and reviewing another project.',
      lessons: [
        {
          slug: 'funder-requirements',
          title: 'Funder requirements as of November 2026',
          summary:
            'What NIH, NSF and the European Commission ask for, including the 2026 format changes, and how to check the current rules yourself.',
          estimatedMinutes: 65,
          objectives: [
            'Summarise NIH and NSF plan requirements as of a stated date',
            'Explain what changed in 2026',
            'Locate the governing text for any funder',
            'Identify which rules apply to a given proposal',
          ],
          concepts: [
            'NIH Data Management and Sharing Policy',
            'NOT-OD-26-046',
            'NSF DMSP and Research.gov form',
            'NSF 26-202',
            'OSTP 2022 public access memo',
            'Horizon Europe',
            'Directorate-specific guidance',
          ],
          explanation: `Everything here is stated **as of 2 November 2026**, is education rather than advice, and will age. Learn to find the governing text, not to memorise it. Your institution's research office decides how it applies to you.

**NIH.** The Data Management and Sharing Policy (notice NOT-OD-21-013) has applied since 25 January 2023 to NIH-funded research generating scientific data. Notice **NOT-OD-26-046**, released on 25 February 2026, replaced the plan elements with a much shorter format for applications with due dates on or after **25 May 2026**, run as a pilot. It updated the plan format, not the policy. The new elements are largely yes-or-no attestations on maximising sharing, timing and how long data stays available, plus a limited-length explanation of any limits on sharing, questions on protecting human participants, and a short table of data types and repositories. NIH said it had reviewed more than 1,100 plans and found many were longer and more detailed than needed.

**NSF.** Policy notice **NSF 26-202**, on PAPPG 24-1 Supplement 2, took effect on 22 January 2026 for awards made on or after that date. From **27 April 2026**, proposals create the Data Management and Sharing Plan through a **Research.gov tool** rather than uploading a two-page PDF. Topics are the familiar ones: data types, standards, access and privacy, reuse, and archiving. Directorates add their own guidance, and NSF's own pages still mention different PAPPG versions, so read the solicitation and directorate page for your proposal.

**Federal policy.** The White House OSTP memo of August 2022 directed agencies to make funded publications and supporting data freely available, and each agency implements it differently.

**Europe.** Horizon Europe requires a data management plan for projects generating data, aligned with FAIR and the principle "as open as possible, as closed as necessary".

The direction of change is instructive. Funders moved from long narrative plans to short, structured answers, in part because nobody could review the long ones. That makes the plan easier to file. It does not reduce the work. The attestation is still a promise, and you still need the real plan for your project, which the next lesson covers.`,
          resources: [
            { title: 'NIH notice NOT-OD-26-046', url: 'https://grants.nih.gov/grants/guide/notice-files/NOT-OD-26-046.html', type: 'documentation', cost: 'free', provider: 'US National Institutes of Health', note: 'The 2026 plan elements and format.', primary: true },
            { title: 'NIH Data Management and Sharing Policy', url: 'https://sharing.nih.gov/data-management-and-sharing-policy', type: 'documentation', cost: 'free', provider: 'US National Institutes of Health', note: 'Start here for current NIH guidance.' },
            { title: 'NSF: Preparing your data management and sharing plan', url: 'https://www.nsf.gov/funding/data-management-plan', type: 'documentation', cost: 'free', provider: 'US National Science Foundation', note: 'Links to directorate guidance.' },
            { title: 'NSF policy notice on PAPPG 24-1, Supplement 2', url: 'https://www.nsf.gov/policies/document/pappg24-1-supplement-2', type: 'documentation', cost: 'free', provider: 'US National Science Foundation', note: 'The notice that introduced the Research.gov tool.' },
          ],
          exercises: [
            {
              slug: 'find-the-governing-text',
              title: 'Find the governing text',
              prompt:
                'Choose a funder you might apply to, other than NIH or NSF if possible. Find its current data policy, its effective date, and any format requirement. Quote the requirement, link the source, record the date you checked it, and list what you would have to ask your institution. If you cannot find a date, say so.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'nih-format-dry-run',
              title: 'Answer the short NIH format',
              prompt:
                'Using the element list in NOT-OD-26-046, draft answers for the ozone case study as if it were NIH-funded human-free environmental research. Keep to the word limits in the notice. Then list five things your real plan must decide that the short form does not ask about.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Did NIH change its Data Management and Sharing Policy in 2026?',
              answerOutline: 'The policy stayed in place. NOT-OD-26-046 changed the plan elements and format for due dates on or after 25 May 2026.',
            },
            {
              question: 'What changed for NSF applicants on 27 April 2026?',
              answerOutline: 'The plan is created in a Research.gov tool rather than uploaded as a PDF.',
            },
            {
              question: 'Why is a short funder form not a substitute for a real plan?',
              answerOutline: 'It records promises. Decisions on storage, roles, formats, metadata and costs still have to be made and followed.',
            },
          ],
        },
        {
          slug: 'writing-a-plan',
          title: 'Writing a plan that gets used',
          summary:
            'The sections every plan needs, how to cost them, and how to make a plan machine-actionable and keep it alive.',
          estimatedMinutes: 85,
          objectives: [
            'Write a data management plan covering all standard sections',
            'Budget time and money for data work',
            'Express a plan in the RDA DMP Common Standard',
            'Revise a plan as a project changes',
          ],
          concepts: [
            'Plan sections',
            'Roles and responsibilities',
            'Backup rule',
            'Retention period',
            'DMPTool and DMPonline',
            'RDA DMP Common Standard',
            'Machine-actionable DMP',
            'Living document',
          ],
          explanation: `A data management plan is a set of decisions written before they become emergencies. Most guidance converges on the same sections:

1. **Data description**: what data, how much, what formats, reused or new.
2. **Documentation and metadata**: standards, data dictionaries, how quality is assured.
3. **Storage and backup**: where, how many copies, who restores them. A common rule is 3-2-1: three copies, on two kinds of storage, one elsewhere.
4. **Ethics and legal**: personal data, consent, licences, ownership.
5. **Sharing and access**: what, when, where, with what licence and identifier.
6. **Preservation**: what is kept, for how long, by whom.
7. **Responsibilities and resources**: named roles, time and money.

Write decisions, not intentions. "Data will be stored securely" tells nobody anything. "Raw files are on the department's encrypted share, snapshotted nightly, and Ada Learner checks a restore every quarter" can be verified.

**Cost it.** Curation takes staff time. If documentation is not in the budget and schedule, it will not happen. Funders commonly allow data costs, so check what yours allows.

**Tools help.** DMPTool (hosted by the University of California) and DMPonline (from the Digital Curation Centre) provide funder templates and guidance.

**Machine-actionable plans.** A plan in a PDF is read once. The Research Data Alliance's **DMP Common Standard** expresses a plan as JSON, so that software can use it to provision storage or check that a promised deposit took place.

\`\`\`json
{"dmp": {
  "title": "Ozone and heat", "language": "eng",
  "created": "2026-11-02T10:00:00Z", "modified": "2026-11-02T10:00:00Z",
  "ethical_issues_exist": "no",
  "dmp_id": {"identifier": "https://example.org/dmp/1", "type": "url"},
  "contact": {"name": "Ada Learner", "mbox": "ada@example.org",
    "contact_id": {"identifier": "https://orcid.org/0000-0002-1825-0097", "type": "orcid"}},
  "dataset": [{"title": "County-day table", "type": "dataset",
    "dataset_id": {"identifier": "https://doi.org/10.5281/zenodo.1234567", "type": "doi"},
    "personal_data": "no", "sensitive_data": "no"}]
}}
\`\`\`

This record passes the standard's published JSON Schema (version 1.2), and removing a dataset \`title\` makes it fail with \`'title' is a required property\`. So your plan can be tested in CI like anything else.

Finally, a plan is a **living document**. Date each revision, and update it whenever something real changes. A plan frozen at submission tells you only what someone hoped.`,
          resources: [
            { title: 'DMPTool', url: 'https://dmptool.org/', type: 'tool', cost: 'free', provider: 'University of California Curation Center', note: 'Funder templates. A free account works with an ORCID or email.', primary: true },
            { title: 'DMPonline', url: 'https://dmponline.dcc.ac.uk/', type: 'tool', cost: 'free', provider: 'Digital Curation Centre', note: 'The European counterpart, with public example plans.' },
            { title: 'RDA DMP Common Standard', url: 'https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard', type: 'documentation', cost: 'free', provider: 'Research Data Alliance', note: 'The JSON Schema and worked examples are in `examples/JSON`.' },
          ],
          exercises: [
            {
              slug: 'plan-the-case-study',
              title: 'Write the case study plan',
              prompt:
                'Write `docs/DMP.md` for the ozone case study using the seven sections above, in at most two pages. Every statement must be a decision with an owner or a date. Add a table of tasks with estimated hours. Swap with a colleague, or leave it for two days, and underline each sentence that could not be verified later. Rewrite those sentences.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'machine-actionable-plan',
              title: 'Make the plan machine-actionable',
              prompt:
                'Express your plan as `dmp.json`. Download `examples/JSON/JSON-schema/1.2/maDMP-schema-1.2.json` from the RDA repository and validate your file with Python `jsonschema`. Write a test that fails if a dataset loses its title or `ethical_issues_exist` takes a value outside `yes`, `no` and `unknown`. List which parts of your Markdown plan the schema has no place for.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Rewrite "data will be backed up regularly" as a decision.',
              answerOutline: 'State location, frequency, owner and a restore test, for example nightly to a second site, with a named person testing a restore each quarter.',
            },
            {
              question: 'What does the 3-2-1 rule protect against?',
              answerOutline: 'Loss of one copy, one storage type, or one location.',
            },
            {
              question: 'What can a machine-actionable plan do that a PDF cannot?',
              answerOutline: 'Be validated, exchanged between systems and checked automatically against what happened.',
            },
          ],
        },
        {
          slug: 'sensitive-data',
          title: 'Planning for sensitive data',
          summary:
            'Classifying data by risk, controls that match the risk, and writing a plan when you cannot simply publish.',
          estimatedMinutes: 75,
          objectives: [
            'Classify a dataset by sensitivity and likely harm',
            'Match controls to each level',
            'Explain the Five Safes model',
            'Identify which laws and approvals may apply and when to ask for help',
          ],
          concepts: [
            'Data classification',
            'Personal and sensitive data',
            'Identifiability',
            'Five Safes',
            'Data use agreement',
            'Tiered access',
            'Retention and secure deletion',
          ],
          explanation: `Sensitive data changes the plan, not just the storage. This lesson covers planning. The Ethics and Policy course covers the arguments and the law in depth. Nothing here is legal advice, and your institution's privacy office and review board are the people to ask.

Start by **classifying**. Institutions usually have tiers such as public, internal, confidential and restricted. What decides the tier is the harm if data leaked or were misused, to individuals, to groups and to the organisation. Ask what is identifiable, directly or by combination, and what would follow if someone were identified.

Then match controls to the level:

- **Public**: anyone can access it, but integrity still matters.
- **Internal**: access limited to the team, with backups and version control.
- **Confidential**: encryption at rest and in transit, named access, logging, and no personal laptops or unapproved cloud tools.
- **Restricted**: a secure enclave, no download, output checking, and sometimes physical controls.

A well-known model for access decisions is the **Five Safes**, used by the UK Data Service and others: safe **projects**, **people**, **settings**, **data** and **outputs**. It treats risk as a whole. Less protected data can be acceptable in a much safer setting, with trained people and checked outputs.

**Plan for the whole life cycle.** Decide before collection what you may collect, and collect as little as you can. A consent form limits later sharing. Check whether a law or approval applies: research on people in the US usually involves an institutional review board, health data may fall under HIPAA, and student records may fall under FERPA. Say how long you will keep identifiers, and how they will be destroyed.

**Sharing is not all or nothing.** Options include publishing metadata and aggregates, depositing with controlled access under a **data use agreement**, or releasing a de-identified or synthetic version with its limits stated. De-identification is not a guarantee, as the Ethics and Policy course shows with worked attacks.

A common failure is treating the data as the only sensitive thing. Logs, notebook outputs, Git history and CI artifacts can all leak it. A value that was printed in a notebook cell and committed stays in history. Put sensitive paths in \`.gitignore\` before the first commit, not after.`,
          resources: [
            { title: 'What is the Five Safes framework?', url: 'https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/', type: 'documentation', cost: 'free', provider: 'UK Data Service', note: 'A short explanation.', primary: true },
            { title: 'De-Identifying Government Datasets (NIST SP 800-188)', url: 'https://csrc.nist.gov/pubs/sp/800/188/final', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'Practical guidance. Read the overview sections.' },
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'See the chapter on sensitive data.' },
          ],
          relatedLessons: ['cybersecurity/authentication-and-access-control/access-control-models'],
          exercises: [
            {
              slug: 'classify-and-control',
              title: 'Classify four datasets',
              prompt:
                'Classify each dataset and name specific controls and a sharing route: (a) county-level air quality; (b) a survey of students with free-text comments; (c) GPS traces from delivery workers; (d) hospital admission records. For each, write what harm you are guarding against, and who is harmed. Note which case you are least confident about, and who you would ask.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'leak-hunt',
              title: 'Hunt for leaks in a repository',
              prompt:
                'In a test repository, commit a fake CSV of invented names, delete it in a later commit, and show that it can still be recovered from history. Then find where else such data can leak in your project: notebook outputs, logs, caches, CI artifacts. Write a checklist of 6 items and add a `.gitignore` plus a test that fails if notebook outputs are committed. Use only invented data.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the Five Safes.',
              answerOutline: 'Safe projects, people, settings, data and outputs.',
            },
            {
              question: 'Why is deleting a file from a Git repository not enough?',
              answerOutline: 'It remains in history. Purging needs a history rewrite, and any clone or fork still has the file.',
            },
            {
              question: 'List three sharing routes between fully open and not shared at all.',
              answerOutline: 'Metadata only, aggregates, controlled access under an agreement, or de-identified or synthetic versions.',
            },
          ],
        },
        {
          slug: 'reviewing-another-project',
          title: 'Reviewing another project',
          summary:
            'Reproduce someone else\'s work with a fair, structured process, and give feedback that helps.',
          estimatedMinutes: 70,
          objectives: [
            'Apply a reproducibility review protocol',
            'Separate availability, execution and agreement of results',
            'Report findings in a neutral, actionable way',
            'Use what you find to improve your own project',
          ],
          concepts: [
            'Reproducibility review',
            'Artifact badges',
            'Reproduction package',
            'Time-boxing',
            'Levels of agreement',
            'Actionable feedback',
          ],
          explanation: `Reviewing teaches you more than any checklist, because you feel exactly where a project fails a stranger. It is also becoming a formal job. The American Economic Association employs a data editor to check replication packages before publication, and the ACM awards artifact badges to papers whose artifacts are available, evaluated or reproduced.

Use a structured process, in order, and time-box it.

1. **Availability.** Are the data, code, environment, documentation and licence there? Do the links resolve? Do checksums match?
2. **Execution.** Following only the README, in a clean environment, does it run? Log each deviation, however small.
3. **Agreement.** Compare each claimed number and figure with what you produced. Record exact values, not a yes or no.
4. **Understanding.** Could you explain what each step does and why? Is anything undocumented?
5. **Reuse.** Could you apply this to new data? What would you need to change?

Keep **levels of agreement** separate. Byte-identical outputs are the strongest. Numerically identical at the reported precision is the usual target. Qualitatively the same conclusion is weaker, and it should be reported as such. A difference is a finding rather than an accusation, since many have innocent causes, and a floating-point difference in the sixth decimal place means something other than a changed conclusion.

Write the report for someone you want to help. State facts first: "Step 3 failed with this message on this environment". Separate observation from interpretation. Give each issue a severity and a concrete fix. Credit what works. Don't guess at motives, because the commonest cause of failure is that nobody ever tested the instructions.

Then apply the same rubric to yourself. Most people find their own README assumes something they never noticed. If you have no partner, review a public package: find a published dataset with code on Zenodo or a journal replication archive, and treat it as your subject. Be careful and fair when reporting on real researchers' work in public, and consider contacting the authors first.`,
          resources: [
            { title: 'AEA Data Editor', url: 'https://aeadataeditor.github.io/', type: 'documentation', cost: 'free', provider: 'American Economic Association', note: 'Look at the guidance for authors and how reports are structured.', primary: true },
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'See the checklists at the end of the reproducibility chapters.' },
          ],
          exercises: [
            {
              slug: 'review-a-package',
              title: 'Review a public package',
              prompt:
                'Find a dataset with code on Zenodo or a journal replication archive that is small enough to run on your machine. Time-box 3 hours. Write a report in the five parts above, with exact commands, the environment, deviations, and a table comparing at least three reported values with yours. State your level of agreement for each.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'review-yourself',
              title: 'Review yourself',
              prompt:
                'Apply the rubric to your case study. Clone it to a new folder and follow your README exactly. Open at least three issues in your own repository for what you find, each with a severity and fix. Close one of them.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why separate availability, execution and agreement?',
              answerOutline: 'They fail for different reasons and call for different fixes. A single pass or fail hides where the problem lies.',
            },
            {
              question: 'What makes feedback actionable?',
              answerOutline: 'Specific evidence, a severity, a suggested fix, and a separation of observation from interpretation.',
            },
            {
              question: 'How should you treat a small numeric difference?',
              answerOutline: 'Report it precisely, identify its likely cause, and judge whether it changes the conclusion. Do not treat it as misconduct.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'curated-case-study-release',
    title: 'A curated release of the case study',
    description:
      'Publish the ozone and heat case study as a citable, validated data package with a working pipeline, a data management plan and a review from someone else. The final project in the coursework replaces this in the site.',
    deliverables: [
      'A public repository with a one-command pipeline and a lockfile',
      'A validated Data Package deposited with a persistent identifier',
      'A data management plan and a reproducibility review',
    ],
    estimatedHours: 25,
    stretchGoals: ['Extend the case study to a second county and compare slopes.'],
  },
  masteryChecklist: [
    'I can inventory a project\'s artifacts and say which are irreplaceable.',
    'I can version data with checksums and manifests, and connect it to a code version.',
    'I can write a schema, a data dictionary and validation rules that catch real upstream changes.',
    'I can build a hash-pinned environment and a pipeline that rebuilds only what changed.',
    'I can record provenance automatically and trace a result back to raw bytes.',
    'I can deposit data with a licence and a persistent identifier, and cite the right version.',
    'I can estimate what preservation costs and defend what to keep.',
    'I can write a data management plan from current funder rules, stating the date I checked them.',
    'I can review someone else\'s project fairly and report levels of agreement.',
  ],
});
