import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const ims = (note: string): ResourceInput => ({
  title: 'Introduction to Modern Statistics',
  url: 'https://openintro-ims.netlify.app/',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenIntro',
  note,
});

const pda = (note: string): ResourceInput => ({
  title: 'Python for Data Analysis, 3rd edition',
  url: 'https://wesmckinney.com/book/',
  type: 'textbook',
  cost: 'free',
  provider: 'Wes McKinney',
  note,
});

const thinkStats = (note: string): ResourceInput => ({
  title: 'Think Stats, 3rd edition',
  url: 'https://allendowney.github.io/ThinkStats/',
  type: 'textbook',
  cost: 'free',
  provider: 'Allen Downey',
  note,
});

const dataviz = (note: string): ResourceInput => ({
  title: 'Fundamentals of Data Visualization',
  url: 'https://clauswilke.com/dataviz/',
  type: 'textbook',
  cost: 'free',
  provider: 'Claus O. Wilke',
  note,
});

const islp = (note: string): ResourceInput => ({
  title: 'An Introduction to Statistical Learning, with Applications in Python',
  url: 'https://www.statlearning.com/',
  type: 'textbook',
  cost: 'free',
  provider: 'James, Witten, Hastie, Tibshirani and Taylor',
  note,
});

const docs = (title: string, url: string, provider: string, note: string): ResourceInput => ({
  title,
  url,
  type: 'documentation',
  cost: 'free',
  provider,
  note,
});

export default defineSubject({
  id: 'data-science-exploration',
  title: 'Data Science Exploration',
  category: 'data-science',
  tagline:
    'The whole pipeline from a question to a report: Git, wrangling, honest graphics, models, estimation, testing, regression and classification in Python.',
  description: `This course takes you through the whole data science pipeline. You start with a question and a hypothesis, collect and clean data, explore it with honest graphics, fit probability models, measure uncertainty, test claims, build regression and classification models, and finish with a report that someone else can reproduce. Everything happens in Python, and everything lives in a Git repository from the first module onwards.

It follows the topics of **STAT 207, Data Science Exploration** at the University of Illinois Urbana-Champaign, based on the public catalog description. The course here is original: the lessons, exercises and projects were written for this site, and it is not affiliated with or endorsed by Illinois.

It assumes you have finished Data Science Discovery, or can already load and group a DataFrame, simulate with a for-loop, and explain a confidence interval. Where Discovery stopped at the idea of inference, this course makes inference a working tool. You will use maximum likelihood, the bootstrap, permutation tests and multiple regression on real data, and you will learn when each one breaks.

The coursework is built on public records: how Chicago's L trains recovered after 2020, whether the world's earthquakes behave like a random process, and which Illinois bridges are heading for a poor rating. Later courses build on this one: Modeling and Learning in Data Science, Algorithms and Data Structures for Data Science, and Data Management, Curation and Reproducibility. Probability and Statistics for Scientists and Machine Learning go deeper on the theory.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['data-science-discovery'],
  recommendedBackground: [
    'Comfortable with pandas selection, groupby and basic plots',
    'Can write a for-loop and a function, and simulate with a seeded generator',
    'Can explain a confidence interval and a p-value in plain words',
    'High-school algebra; calculus is not required',
  ],
  tags: ['data science', 'python', 'statistics', 'git', 'regression', 'visualisation', 'illinois'],
  core: false,
  modules: [
    {
      slug: 'data-science-pipeline',
      title: 'The Data Science Pipeline',
      description:
        'Turn a vague interest into a testable question, collect data you can account for, and set up a Git repository and project structure that keep your work reproducible.',
      lessons: [
        {
          slug: 'questions-and-hypotheses',
          title: 'Forming questions and hypotheses',
          summary:
            'A good analysis starts with a precise question. Learn to sharpen one, tell description from prediction and cause, and write a hypothesis down before you look.',
          estimatedMinutes: 60,
          objectives: [
            'Sort a question into descriptive, predictive or causal',
            'Rewrite a vague question so that data could answer it',
            'State a hypothesis together with what would count against it',
            'Explain why writing the plan first protects you from yourself',
          ],
          concepts: [
            'The pipeline: question, collect, clean, explore, model, communicate',
            'Descriptive, predictive and causal questions',
            'Measurable outcome and unit of analysis',
            'Hypothesis and falsifiability',
            'Exploratory versus confirmatory analysis',
            'Analysis plan',
          ],
          explanation: `Most failed analyses fail at the start, because the question was vague. *Do small classes work?* cannot be answered. *Do kindergarteners randomly assigned to small classes score higher on a math test at the end of the year than those in regular classes?* can. A good question names the **unit** you study, the **outcome** you measure, the **comparison** you make and the **population** you care about.

Questions come in three kinds, and they demand different evidence:

- **Descriptive**: what happened? How much did ridership fall?
- **Predictive**: what will happen? Which bridges will be rated poor in five years?
- **Causal**: what would change if we acted? Does adding trains raise ridership?

A prediction can be excellent without saying anything about cause. Mixing up these kinds is one of the most common errors in published work.

A **hypothesis** is a claim that data could prove wrong. Write it together with what would count against it: *weekend ridership has recovered more than weekday ridership, and I will conclude otherwise if the median station shows no gap*.

Analysis has two modes. **Exploratory** work wanders through the data looking for patterns. It is essential, and it generates hypotheses. **Confirmatory** work tests a hypothesis you fixed beforehand. The trouble starts when you explore until something looks interesting and then report it as though you had predicted it. With enough looking, something always looks interesting. You saw in Discovery that 1 in 20 true nulls reaches $p < 0.05$ by luck.

The defence is simple. Keep a short written **plan** in your repository before you open the data: question, outcome, comparison, method, and what you would conclude. Later, label each result as planned or exploratory. You are allowed to change the plan, as long as you record why.

Read the sections on study design in the first resource, and use the second for its case studies.`,
          resources: [
            ims('The opening chapters, Hello data and Study design, cover variables, questions and study types.'),
            { title: 'Computational and Inferential Thinking', url: 'https://inferentialthinking.com/chapters/intro.html', type: 'textbook', cost: 'free', provider: 'UC Berkeley Data 8', note: 'Chapter 1 on data science and chapter 2 on causality, as a review.' },
          ],
          exercises: [
            {
              slug: 'sharpen-three-questions',
              title: 'Sharpen three questions',
              prompt:
                'Rewrite each one so data could answer it, naming unit, outcome, comparison and population: (a) Is remote work good? (b) Are bridges in Illinois getting worse? (c) Do earthquakes come in clusters? Label each rewritten question as descriptive, predictive or causal, and say what data you would need.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'one-page-plan',
              title: 'Write a one-page plan',
              prompt:
                'Choose a public dataset you care about. Before opening it, write `PLAN.md` with your question, outcome, comparison, the summary or test you intend to use, and what result would change your mind. Then open the data and record, without editing the plan, the first thing that forced you to change it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What four things does a precise question name?', answerOutline: 'The unit, the outcome, the comparison and the population.' },
            { question: 'Why is a good prediction not evidence of cause?', answerOutline: 'A predictor can work through association or confounding, and changing it might not change the outcome.' },
            { question: 'What goes wrong if you report an exploratory find as confirmed?', answerOutline: 'Searching many patterns guarantees some look striking by chance, so the stated significance or confidence is overstated.' },
          ],
        },
        {
          slug: 'data-collection-and-provenance',
          title: 'Data collection and provenance',
          summary:
            'Know where each number came from: who collected it, why, how, and what happened to it on the way to you.',
          estimatedMinutes: 60,
          objectives: [
            'Find and evaluate a public data source',
            'Record provenance in a data note',
            'Freeze a snapshot of a dataset that changes over time',
            'Check a licence and terms of use before relying on data',
          ],
          concepts: [
            'Primary and secondary data',
            'Provenance',
            'Data dictionary or codebook',
            'Snapshots and revisions',
            'Checksums',
            'Licences and terms of use',
            'Administrative data',
          ],
          explanation: `Data is not found lying around. Someone collected it for a purpose, and that purpose shapes it. Train entry counts exist to run a transit agency, inspection ratings exist to satisfy a federal rule, and earthquake catalogs depend on where the seismometers are. Most of what you will use is **administrative data** collected for another purpose, so before you trust it, find out how it was made.

**Provenance** is the record of where a dataset came from and what was done to it. For each file, write down in a \`DATA.md\` file:

- the source and exact URL,
- the date you downloaded it,
- who collected it, how, and why,
- what one row is,
- the licence or terms of use,
- a checksum, so that anyone can confirm they have the same file.

Live sources change. Agencies append new rows and quietly correct old ones. If your results depend on a file that changes, they cannot be reproduced, so **freeze a snapshot**: download once, never edit it, and analyse only that copy within a stated date window. A checksum proves the file has not changed:

\`\`\`powershell
Get-FileHash data\\raw\\entries.csv -Algorithm SHA256
\`\`\`

Find the **codebook** that defines each column, and read it before you analyse anything. Column names lie. A value of 0 may mean none, or it may mean closed. A rating may use a code such as \`N\` for not applicable. Units may surprise you: daily precipitation in one major dataset is stored in tenths of a millimetre.

**Pitfalls.** A dataset published as open data may still have terms about redistribution, so check before you put a copy on GitHub. Scraping a site can break its terms, even if the data is visible. And data about people carries duties that do not disappear because the data is public, as the Ethics and Policy for Data Science course discusses at length.

Keep raw data separate from anything derived from it. Raw files are read-only evidence, and every change you make to them happens in code, where it can be reviewed and rerun.`,
          resources: [
            { title: 'Chicago Data Portal', url: 'https://data.cityofchicago.org/', type: 'dataset', cost: 'free', provider: 'City of Chicago', note: 'A good example of open administrative data with column descriptions.' },
            { title: 'USGS Earthquake Catalog API', url: 'https://earthquake.usgs.gov/fdsnws/event/1/', type: 'documentation', cost: 'free', provider: 'US Geological Survey', note: 'A data source you query by URL. Note how a query can be recorded as provenance.' },
            { title: 'Choose a License', url: 'https://choosealicense.com/', type: 'article', cost: 'free', provider: 'GitHub', note: 'What common licences allow. See the appendix on data and content licences.' },
          ],
          exercises: [
            {
              slug: 'write-data-md',
              title: 'Write a data note',
              prompt:
                'Pick one dataset on the Chicago Data Portal. Download its CSV, compute its SHA-256 hash with `Get-FileHash`, and write `DATA.md` covering every item in this lesson. Read the column descriptions and find one column whose meaning you would have guessed wrongly from its name.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'snapshot-drift',
              title: 'See a source move',
              prompt:
                'Query the USGS API twice for earthquakes of magnitude 4 or more: once for last week, and once for a full year ending a year ago. Save both CSVs and look at the `updated` and `status` columns. How long after an event do records keep changing? State what this means for how you should freeze the data and write your tests.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What is provenance?', answerOutline: 'The record of where data came from and what happened to it, including who made it, how, when, and what was changed.' },
            { question: 'Why freeze a snapshot?', answerOutline: 'Live sources add and correct records, so results can only be reproduced from a fixed copy and date window.' },
            { question: 'Why treat raw files as read-only?', answerOutline: 'They are the evidence. Every cleaning step should be in code, so it can be reviewed and rerun.' },
          ],
        },
        {
          slug: 'git-and-github-for-analyses',
          title: 'Git and GitHub for analyses',
          summary:
            'Version control for data work: commits, history, branches, GitHub, and what should stay out of a repository.',
          estimatedMinutes: 120,
          objectives: [
            'Create a repository and make small, well-described commits',
            'Push to GitHub from VS Code or the terminal',
            'Use a branch to try an idea safely',
            'Write a `.gitignore` suited to data projects',
            'Say why notebooks and large data need special care in Git',
          ],
          concepts: [
            'Repository, commit, history',
            'Staging area',
            'Remote, push and pull',
            'Branch and merge',
            '.gitignore',
            'Commit messages',
            'Notebooks in Git',
            'Size limits for data files',
          ],
          explanation: `Discovery published through GitHub's website. From now on you will use **Git** itself. Git records snapshots of a project called **commits**, so you can see what changed, when and why, and return to any earlier point. For an analysis, that history is part of the evidence.

Install Git for Windows from git-scm.com with default options, then introduce yourself once:

\`\`\`text
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
\`\`\`

The everyday loop, in a project folder:

\`\`\`text
git init                     # once, to start tracking
git status                   # what changed?
git add src/clean.py         # stage this change
git commit -m "Treat zero-ride days as closures"
git log --oneline            # view history
\`\`\`

The staging step lets you choose exactly what goes into a commit. Make each commit one logical change, and write a message that says why. VS Code's Source Control panel (Ctrl+Shift+G) does all of this with buttons, and its *Publish Branch* button creates a GitHub repository and pushes your work. After that, \`git push\` sends commits up and \`git pull\` brings them down.

A **branch** is a separate line of work. \`git switch -c try-log-scale\` starts one. If the idea works, switch back and run \`git merge try-log-scale\`. If it fails, abandon it. Your main history stays clean.

Every data project needs a \`.gitignore\` listing what not to track:

\`\`\`text
.venv/
__pycache__/
.ipynb_checkpoints/
data/raw/
*.pyc
\`\`\`

**Pitfalls.** GitHub rejects files over 100 MB, and once a large file is committed, removing it from history is painful. Keep raw data out of Git unless it is small and its licence allows sharing, and include a script that downloads it. Commit a checksum instead. Notebooks are JSON with embedded outputs, so their diffs are hard to read. Keep long logic in \`.py\` files, and clear noisy outputs before you commit. **Never commit passwords or API keys.** Deleting them later does not remove them from history.`,
          resources: [
            { title: 'Pro Git', url: 'https://git-scm.com/book/en/v2', type: 'textbook', cost: 'free', provider: 'Scott Chacon and Ben Straub', note: 'Chapter 2, Git Basics, and the first sections of chapter 3 on branching.' },
            docs('Source Control in VS Code', 'https://code.visualstudio.com/docs/sourcecontrol/overview', 'Microsoft', 'The same Git operations through the editor.'),
            docs('Hello World', 'https://docs.github.com/en/get-started/start-your-journey/hello-world', 'GitHub', 'A first walk through branches and pull requests.'),
          ],
          exercises: [
            {
              slug: 'first-repository',
              title: 'A real history',
              prompt:
                'Create a repository for a small analysis with a `.gitignore`, a README and one notebook. Make at least five commits, each one a single logical change with a useful message. Publish to GitHub. Paste your `git log --oneline` into your notes and say which messages would still make sense in a year.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'branch-an-idea',
              title: 'Try an idea on a branch',
              prompt:
                'On a branch, change a chart from a linear to a log axis and commit. Switch back to `main` and see the old version return. Merge the branch, then use `git log --oneline --graph`. Next, deliberately cause a merge conflict by editing the same line on two branches, resolve it in VS Code, and describe what the conflict markers mean.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'what-stays-out',
              title: 'What stays out?',
              prompt:
                'Sort these into commit or ignore, and give a reason for each: a 400 MB CSV, a `.venv` folder, `requirements.txt`, a 2 KB lookup table you typed by hand, a database password in `config.py`, figures for the README, a download script, a SHA-256 hash of the raw file.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'Why does Git have a staging area?', answerOutline: 'So you can choose which changes form one logical commit instead of committing everything at once.' },
            { question: 'Why is a branch useful in an analysis?', answerOutline: 'You can try an idea without disturbing main, and either merge it or abandon it.' },
            { question: 'What should you do if you commit a secret?', answerOutline: 'Treat it as exposed and change it at once, because deleting the file does not remove it from history.' },
          ],
          relatedLessons: ['programming-fundamentals/testing-debugging-tooling/git-basics'],
        },
        {
          slug: 'project-structure-and-tests',
          title: 'Project structure and automated checks',
          summary:
            'A layout that separates raw data, code and results, with pinned dependencies and pytest checks that catch silent data bugs.',
          estimatedMinutes: 90,
          objectives: [
            'Lay out a project so that raw, derived and reported files are separate',
            'Move reusable code from notebooks into a module',
            'Pin dependencies in `requirements.txt`',
            'Write pytest checks on a dataset',
            'Run the checks automatically on GitHub',
          ],
          concepts: [
            'Standard project layout',
            'Importing your own module',
            'requirements.txt and pip freeze',
            'pytest',
            'Data tests and invariants',
            'Small fixture data',
            'GitHub Actions',
          ],
          explanation: `A reader should be able to clone your project and rerun it. A simple, consistent layout gets you most of the way there:

\`\`\`text
my-analysis/
├── data/raw/          # frozen, never edited, not in Git if large
├── data/processed/    # created by code, safe to delete
├── notebooks/         # exploration and final report
├── src/               # reusable functions
├── tests/             # pytest checks
├── figures/
├── DATA.md
├── requirements.txt
└── README.md
\`\`\`

The flow runs in one direction: raw data goes through code to processed data, then to figures and the report. Nothing in \`data/processed\` is ever edited by hand.

Notebooks are good for exploring and for telling a story, but poor for shared logic. When a function is used twice, move it to \`src/clean.py\` and import it, and then it can be tested.

Record exact versions with \`.venv\\Scripts\\python -m pip freeze > requirements.txt\`, and rebuild an environment with \`pip install -r requirements.txt\`. Results can shift between library versions, and pandas 3 in particular behaves differently from older pandas.

Data bugs are silent: a bad join does not crash, it just gives you a wrong number. So write down what must be true, and test it with **pytest**. Install it, put files named \`test_*.py\` in \`tests/\`, and run \`.venv\\Scripts\\python -m pytest\`.

\`\`\`python
import pandas as pd
from src.clean import load_entries

def test_one_row_per_station_day():
    df = load_entries('tests/fixtures/entries_small.csv')
    assert not df.duplicated(['station_id', 'date']).any()

def test_rides_never_negative():
    df = load_entries('tests/fixtures/entries_small.csv')
    assert (df['rides'] >= 0).all()
\`\`\`

For \`from src.clean import ...\` to work, keep an empty \`conftest.py\` in the project root. A small hand-made **fixture** file with a known answer lets tests run fast, and you can check it by eye. Tests on the full data can skip themselves if the raw file is absent.

**GitHub Actions** can run these checks on every push from a short file in \`.github/workflows/\`, with a badge for your README. Make sure that it needs only your small fixtures, since the raw data will not be in the repository.

**Pitfall.** Checks that only confirm the code runs are weak. Test the facts your conclusions depend on.`,
          resources: [
            docs('pytest: Get Started', 'https://docs.pytest.org/en/stable/getting-started.html', 'pytest', 'Install and write your first tests.'),
            docs('GitHub Actions documentation', 'https://docs.github.com/en/actions', 'GitHub', 'Read the quickstart and the guide on building and testing Python.'),
            docs('Python environments in VS Code', 'https://code.visualstudio.com/docs/python/environments', 'Microsoft', 'How VS Code finds and uses `.venv`.'),
          ],
          exercises: [
            {
              slug: 'restructure-a-notebook',
              title: 'Restructure a notebook',
              prompt:
                'Take one Discovery notebook and restructure it into the layout in this lesson. Move at least two functions into `src/`, import them, and run the notebook with Restart and Run All. Add `requirements.txt` and a README stating how to reproduce the result from a fresh clone. Test those steps in a new folder.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'data-invariants',
              title: 'Test what must be true',
              prompt:
                'Using the penguins CSV from Rdatasets, write a `load_penguins` function and at least five pytest checks, such as allowed species names, positive masses, and a unique `rownames` column. Make a 6-row fixture with a known mean mass. Add one deliberately wrong row to see a test fail, then remove it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ci-badge',
              title: 'Automate the checks',
              prompt:
                'Add a GitHub Actions workflow that sets up Python 3.13, installs `requirements.txt` and runs pytest on every push. Confirm it runs on GitHub, add the status badge to your README, then break a test on a branch and observe the failure. Record what would happen if your tests needed files that are not in the repository.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why should processed data be safe to delete?', answerOutline: 'It is entirely regenerated by code from raw data, so it holds no unique information.' },
            { question: 'Why do data projects need tests when the code runs without error?', answerOutline: 'Data bugs are often silent: a bad join or a parsing mistake gives wrong numbers, not a crash.' },
            { question: 'What is a fixture for?', answerOutline: 'A small dataset with a known answer that makes tests fast, readable and independent of large raw files.' },
          ],
          relatedLessons: [
            'programming-fundamentals/testing-debugging-tooling/pytest-basics',
            'programming-fundamentals/testing-debugging-tooling/virtual-environments-and-packaging',
          ],
        },
      ],
    },
    {
      slug: 'data-wrangling',
      title: 'Data Wrangling',
      description:
        'Get data into a form you can analyse: load it correctly, join tables without losing rows, reshape between long and wide, and deal honestly with missing values.',
      lessons: [
        {
          slug: 'loading-and-types',
          title: 'Loading data and fixing types',
          summary:
            'Most wrangling bugs start at the door. Read files with the right types, dates, encodings and missing-value markers.',
          estimatedMinutes: 75,
          objectives: [
            'Control `read_csv` with `dtype`, `usecols`, `na_values` and encoding options',
            'Parse dates with an explicit format',
            'Keep identifiers as strings',
            'Validate a loaded table against expectations',
          ],
          concepts: [
            'read_csv options',
            'dtype and the pandas 3 string type',
            'Identifiers are not numbers',
            'Date parsing with format',
            'Encodings',
            'Quote characters',
            'Sentinel values',
            'Categorical dtype',
          ],
          explanation: `\`pd.read_csv\` guesses, and its guesses can be wrong in ways that never raise an error. Take control of the important options.

\`\`\`python
bridges = pd.read_csv(
    'data/raw/IL24.txt',
    quotechar="'",                         # this file quotes text with apostrophes
    dtype={'STRUCTURE_NUMBER_008': str},   # an ID, so keep it as text
    usecols=['STRUCTURE_NUMBER_008', 'YEAR_BUILT_027', 'DECK_COND_058'],
)
\`\`\`

**Identifiers are labels.** ZIP code 01002 read as a number becomes 1002 and can no longer be joined. Read IDs as strings, and strip stray spaces with \`.str.strip()\`.

**Dates.** Give the format so that nothing is ambiguous, and so that a bad value fails loudly:

\`\`\`python
df['date'] = pd.to_datetime(df['date'], format='%m/%d/%Y')
\`\`\`

Is 03/04/2021 in March or April? Without a format, the answer depends on a guess.

**Types.** Check \`df.dtypes\` straight after loading. A numeric column that arrives as \`str\` usually hides codes or stray characters. In pandas 3, text columns use a dedicated \`str\` type, so old code that tests for \`object\` may miss them. To convert with care, use \`pd.to_numeric(col, errors='coerce')\`, which turns anything unparseable into NaN, then count how many turned into NaN and see why. That count is a finding, not an inconvenience. A condition rating of \`N\`, for example, means *not applicable*.

**Sentinels** are fake values that stand for missing: 999, -1, or a blank. Read the codebook, and pass \`na_values=[-999]\`. If you do not, -999 goes into your averages. For columns with few repeated labels, \`astype('category')\` saves memory and keeps an order if you give one.

**Pitfalls.** A \`UnicodeDecodeError\` means the encoding is wrong, so try \`encoding='latin-1'\`. Rows that seem shifted, or text with stray quote marks, usually mean a wrong quote character or delimiter. After any load, compare the row count with the source's stated count. A file that loads without error may still be wrong, so put these checks into your tests.`,
          resources: [
            pda('Chapter 6, Data Loading, Storage, and File Formats, and chapter 7, Data Cleaning and Preparation.'),
            docs('pandas.read_csv and IO tools', 'https://pandas.pydata.org/docs/user_guide/io.html', 'pandas', 'Reference for every option. Read the sections on dtype and date parsing.'),
            docs('Working with text data', 'https://pandas.pydata.org/docs/user_guide/text.html', 'pandas', 'The pandas 3 string type and the `.str` methods.'),
          ],
          exercises: [
            {
              slug: 'load-the-bridge-file',
              title: 'Load a difficult file',
              prompt:
                'Download `https://www.fhwa.dot.gov/bridge/nbi/2024/delimited/IL24.txt` with `curl.exe -L -o`. Load it with default options and print the first values of `FEATURES_DESC_006A` and `STRUCTURE_NUMBER_008`. The row count is fine, but every text field carries literal apostrophes, and the IDs are padded with spaces. Reload with `quotechar` and `dtype` set as in this lesson. Confirm 26,928 rows and 123 columns, and that all 26,928 `STRUCTURE_NUMBER_008` values are unique after stripping spaces.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'coerce-and-count',
              title: 'Coerce and count',
              prompt:
                'In the bridge file, `DECK_COND_058` holds digits and `N`. Convert it with `pd.to_numeric(errors=\'coerce\')`, count the NaN values (expect 5,211), and use the National Bridge Inventory coding guide at https://www.fhwa.dot.gov/bridge/mtguide.pdf to say what they mean. Why would replacing them with 0 be a serious mistake? Write a pytest check that fails if an unexpected code appears.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why must an identifier stay a string?', answerOutline: 'Numeric parsing drops leading zeros and invites meaningless arithmetic, and it can break joins.' },
            { question: 'What does `errors=\'coerce\'` do, and what must you do next?', answerOutline: 'It turns unparseable values into NaN. You must count them and find out why they failed.' },
            { question: 'What is a sentinel value?', answerOutline: 'A fake code such as 999 that stands for missing and will corrupt statistics unless you convert it.' },
          ],
        },
        {
          slug: 'joining-tables',
          title: 'Joining tables',
          summary:
            'Combine tables on a key, and prove you did not lose or multiply rows along the way.',
          estimatedMinutes: 90,
          objectives: [
            'Choose inner, left, right or outer joins for a purpose',
            'Check key uniqueness before you join',
            'Use `validate` and `indicator` to catch bad joins',
            'Find unmatched rows with an anti-join',
          ],
          concepts: [
            'Primary and foreign keys',
            'merge: inner, left, right, outer',
            'One-to-one, one-to-many, many-to-many',
            'Row explosion',
            'validate=',
            'indicator=True',
            'Anti-join',
          ],
          explanation: `Real questions need several tables: daily counts in one, station locations in another. A **join** matches rows by a shared **key**.

\`\`\`python
merged = entries.merge(stations, left_on='station_id', right_on='MAP_ID',
                       how='left', validate='many_to_one', indicator=True)
\`\`\`

The \`how\` argument decides what happens to unmatched rows. \`inner\` keeps only matches and silently drops the rest. \`left\` keeps every left row, filling NaN where there is no match. \`outer\` keeps everything. In analysis, \`left\` is usually the safe default, because it keeps your unit of analysis intact.

The biggest danger is that a join **changes your row count without warning**. If the right table has two rows for a key, each matching left row appears twice, and totals are inflated. If both sides have repeats, the rows multiply. So always follow this routine:

1. Check that the key is unique where it should be: \`stations['MAP_ID'].is_unique\`.
2. Tidy the table if it is not. A stops table often has one row per platform, and you must reduce it to one row per station first.
3. Pass \`validate='many_to_one'\`, which raises an error if your assumption is false.
4. Pass \`indicator=True\`, then inspect \`_merge\`.
5. Compare row counts before and after.

Unmatched rows are often the most interesting ones. An **anti-join** finds them:

\`\`\`python
unmatched = merged[merged['_merge'] == 'left_only']
unmatched['stationname'].unique()
\`\`\`

These can be typos, closed facilities, or new records. Each reason needs a different response, so investigate them. Do not just drop them.

**Pitfalls.** Keys that look equal may not be: trailing spaces, different capitalisation, a number in one table and a string in the other. pandas raises an error for mismatched dtypes in some cases, but not for stray spaces. If you must join on names, normalise them first, and expect some misses. When the same column name is in both tables, \`merge\` adds \`_x\` and \`_y\`. Use the \`suffixes\` option to give clearer names, such as \`suffixes=('_14', '_19')\`.

The join logic maps directly onto SQL, which the Database Systems course covers in depth.`,
          resources: [
            pda('Chapter 8, Data Wrangling: Join, Combine, and Reshape, on database-style joins.'),
            docs('Merge, join, concatenate and compare', 'https://pandas.pydata.org/docs/user_guide/merging.html', 'pandas', 'Worked pictures of each join type.'),
            docs('DataFrame.merge', 'https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.merge.html', 'pandas', 'Reference for `validate` and `indicator`.'),
          ],
          exercises: [
            {
              slug: 'row-explosion',
              title: 'Cause a row explosion',
              prompt:
                'Build two small DataFrames by hand: three orders with a `customer_id`, and a customers table where one id appears twice. Merge them and watch the row count and total order value change. Now add `validate=\'many_to_one\'` and read the error. Repair the customers table and write a test that would have caught this bug.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'bridge-join',
              title: 'Join two years of bridges',
              prompt:
                'Load Illinois bridge files for 2019 (`.../2019/delimited/IL19.txt`, 26,825 rows) and 2024 (26,928 rows). Strip the structure numbers, then outer-join them with `indicator=True` and clear `suffixes`. How many bridges are in both, only in 2019, and only in 2024? Look at some unmatched records, and write down what might explain them. Would you expect the bridges that vanished to resemble those that stayed?',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'Why is `how=\'inner\'` risky as a default?', answerOutline: 'It silently drops unmatched rows, which can bias the analysis without any warning.' },
            { question: 'What does `validate=\'many_to_one\'` check?', answerOutline: 'That keys are unique on the right side, raising an error if that assumption fails.' },
            { question: 'What is an anti-join used for?', answerOutline: 'Finding rows with no match in the other table, which often reveal data problems.' },
          ],
          relatedLessons: ['databases/relational-model-and-sql/sql-queries-and-joins'],
        },
        {
          slug: 'reshaping-and-tidy-data',
          title: 'Reshaping and tidy data',
          summary:
            'Move between wide and long forms. Tidy data has one variable per column and one observation per row.',
          estimatedMinutes: 75,
          objectives: [
            'Define tidy data and recognise untidy tables',
            'Convert wide to long with `melt`',
            'Convert long to wide with `pivot` and `pivot_table`',
            'Choose the right shape for a given task',
          ],
          concepts: [
            'Tidy data',
            'Wide and long form',
            'melt',
            'pivot and pivot_table',
            'Aggregation when reshaping',
            'Multi-level columns',
          ],
          explanation: `The same data can be arranged in many ways. **Tidy data**, a term from Hadley Wickham's paper, follows three rules: each variable is a column, each observation is a row, and each type of observation is a table. Tidy data works smoothly with \`groupby\`, plotting and modelling, and untidy data makes each of these harder.

A common untidy form has values in the column names, such as columns \`2019\`, \`2020\`, \`2021\`. Those years are values of a variable, so \`melt\` makes the table long:

\`\`\`python
long = wide.melt(id_vars=['station_id'], var_name='year', value_name='mean_rides')
\`\`\`

Going the other way, \`pivot\` spreads a long table out, with one column for each value of a variable:

\`\`\`python
wide = long.pivot(index='station_id', columns='year', values='mean_rides')
wide['recovery'] = wide[2024] / wide[2019]
\`\`\`

Wide is not wrong. It is handy for computing a ratio between two years, and for reading a table by eye. Use wide for computing across columns and for presentation, and long for grouping and plotting. Good analyses move between the two.

\`pivot\` raises an error if an index and column pair appears twice. \`pivot_table\` handles that by aggregating, so it needs an \`aggfunc\`:

\`\`\`python
tbl = entries.pivot_table(index='station_id', columns='year',
                          values='rides', aggfunc='mean')
\`\`\`

**Pitfalls.** An unexpected error from \`pivot\` is a useful warning that your key is not unique, so find out why before you switch to \`pivot_table\`, which would quietly average over the duplicates. The default \`aggfunc\` is the mean, which may not be what you want for counts. Pivoting on two column levels gives a **MultiIndex**, reached by a tuple such as \`wide[('weekday', 2019)]\`. Missing combinations turn into NaN. A station with no 2024 data will have a NaN recovery, and you need to say so, not silently drop it. Year column names produced by \`pivot\` are integers, not strings, so \`wide['2019']\` fails.

Read Wickham's paper. It is short, and it has shaped how a generation of analysts think about tables.`,
          resources: [
            { title: 'Tidy Data', url: 'https://www.jstatsoft.org/article/view/v059i10', type: 'article', cost: 'free', provider: 'Hadley Wickham, Journal of Statistical Software', note: 'The original paper. Read sections 1 to 3.', primary: true },
            docs('Reshaping and pivot tables', 'https://pandas.pydata.org/docs/user_guide/reshaping.html', 'pandas', 'melt, pivot and pivot_table with examples.'),
            pda('Chapter 8, the sections on reshaping and pivoting.'),
          ],
          exercises: [
            {
              slug: 'melt-penguins',
              title: 'Long form for plotting',
              prompt:
                'Melt `bill_length_mm` and `bill_depth_mm` from the penguins data into one `measure` column and one `value` column, keeping `species`. Confirm that the result has 688 rows. Use it to compute the mean of each measure for each species with one `groupby`. Then pivot it back to a wide table and check that the numbers match.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'identify-untidy',
              title: 'Diagnose the untidiness',
              prompt:
                'For each layout, say which tidy rule it breaks and sketch the tidy version: (a) one column per month of sales; (b) a column `sex_age` holding values like `F_34`; (c) one table holding both patient details and repeated visits; (d) a `type` column holding `max` or `min`, with a `value` column beside it. Write the pandas code to fix one of these on a small example you create.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pivot-duplicates',
              title: 'When pivot refuses',
              prompt:
                'Using the tips data, try `pivot(index=\'day\', columns=\'time\', values=\'tip\')` and read the error. Explain what it says about the table. Use `pivot_table` with `aggfunc=\'mean\'` and then `aggfunc=\'count\'`. Which cells are empty, and why? Do the means need the counts next to them?',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What are the three rules of tidy data?', answerOutline: 'Each variable is a column, each observation is a row, and each type of observation forms a table.' },
            { question: 'When is wide form better?', answerOutline: 'For computing across columns, such as a ratio between two years, and for tables people will read.' },
            { question: 'What does a `pivot` duplicate error tell you?', answerOutline: 'The index and column pair is not unique, which may reveal a data problem. Investigate it before you aggregate.' },
          ],
        },
        {
          slug: 'missing-data',
          title: 'Checking for and handling missing data',
          summary:
            'Why values are missing matters more than how many are. Find patterns, choose a response, and say what it costs.',
          estimatedMinutes: 90,
          objectives: [
            'Describe missingness by column and by group',
            'Distinguish MCAR, MAR and MNAR',
            'Spot disguised missing values',
            'Compare complete-case analysis with imputation',
            'Report how missing data could change a conclusion',
          ],
          concepts: [
            'isna summaries',
            'Missing completely at random (MCAR)',
            'Missing at random (MAR)',
            'Missing not at random (MNAR)',
            'Disguised missing values',
            'Complete-case analysis',
            'Imputation',
            'Sensitivity analysis',
          ],
          explanation: `Every real dataset has holes. The first step is to look at them: \`df.isna().mean()\` gives the share missing per column, and \`df.groupby('group')['col'].apply(lambda s: s.isna().mean())\` shows whether a group is missing more than others.

The key question is **why**. Statisticians use three categories:

- **MCAR**, missing completely at random: unrelated to anything. A lab lost some samples by accident. Dropping them costs precision, not validity.
- **MAR**, missing at random: related to variables you observed. Older people skip an online question, and you know their age. You can adjust for it.
- **MNAR**, missing not at random: related to the missing value itself. High earners decline to state their income. No amount of analysis of the observed data can fully fix this.

You usually cannot prove which applies. You argue it from how the data was made.

**Disguised missing values** are harder to see. In transit data, a station closed for rebuilding shows **0 rides** for years. Those zeros are not low demand. They mean *no measurement of demand was possible*, and averaging them in would be wrong. Treat them as missing:

\`\`\`python
df['rides_open'] = df['rides'].where(df['rides'] > 0)
\`\`\`

The opposite also happens: a bridge that disappears from a later file is missing because it was replaced, and those bridges were far more likely to be in poor shape. Rows that are gone leave no NaN behind.

**Your options.** **Complete-case analysis** drops incomplete rows. It is simple, and fine under MCAR, but it can bias results otherwise. **Imputation** fills in values, with a mean, a group mean or a model. Single imputation keeps rows but understates uncertainty, because invented values are treated as real. It also shrinks variability. If you impute, add a flag column saying which values were imputed.

The honest move is a **sensitivity analysis**: run the result under different assumptions, for example dropping the rows, assuming the missing were all low, then all high. If the conclusion survives, say so. If it does not, say that too.

**Pitfall.** pandas methods such as \`mean\` skip NaN by default, so you can drop data without noticing. Always report how many rows went into each number.`,
          resources: [
            docs('Working with missing data', 'https://pandas.pydata.org/docs/user_guide/missing_data.html', 'pandas', 'How pandas represents and handles missing values.'),
            pda('Chapter 7, the section on handling missing data.'),
          ],
          exercises: [
            {
              slug: 'missingness-audit',
              title: 'A missingness audit',
              prompt:
                'For the STAR data, find the share missing in `mathk` in each kindergarten class type, and by `lunchk`. Compare `readk` too. Is the missingness similar across groups? Which of MCAR, MAR or MNAR seems most plausible, and what evidence would help? Do not simply assert it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sensitivity-bounds',
              title: 'Bound a conclusion',
              prompt:
                'A survey of 1,000 people reports 60% satisfied among the 700 who replied. Compute the overall satisfied share if all non-respondents were unsatisfied, and if all were satisfied: 42% and 72%. Then assume non-respondents are satisfied at half the rate of respondents. Explain what this shows about the headline number.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'imputation-damage',
              title: 'What imputation does to spread',
              prompt:
                'Take the known `body_mass_g` values. Using a seed, delete 30% completely at random. Fill those with the overall mean, and separately with the species mean. For each, compare the mean, the standard deviation, and the correlation with `flipper_length_mm` against the original. Then repeat, deleting only the heaviest 30%. Which summaries were damaged in each case?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What is the difference between MAR and MNAR?', answerOutline: 'MAR missingness depends on observed variables. MNAR depends on the missing value itself, which is much harder to correct.' },
            { question: 'Why are zero rides at a closed station missing data?', answerOutline: 'They do not measure demand, so including them treats a closure as if nobody wanted to ride.' },
            { question: 'What does a sensitivity analysis do?', answerOutline: 'It reruns a result under different assumptions about the missing values to see whether the conclusion holds.' },
          ],
          relatedLessons: ['probability-statistics/statistics-in-practice/data-cleaning-and-exploration'],
        },
      ],
    },
    {
      slug: 'summary-and-visualisation',
      title: 'Summary and Visualisation',
      description:
        'Look at several variables at once with multivariate summaries and a grammar of graphics, then make charts and written interpretation that are honest.',
      lessons: [
        {
          slug: 'multivariate-summaries',
          title: 'Multivariate summaries',
          summary:
            'Move beyond one variable at a time: group by several factors, compare rates, and use rank correlation and correlation matrices.',
          estimatedMinutes: 75,
          objectives: [
            'Summarise an outcome by two or more factors',
            'Compute row and column percentages',
            'Use Spearman correlation for skewed or ordered data',
            'Read a correlation matrix without over-reading it',
          ],
          concepts: [
            'Grouped summaries by several factors',
            'Contingency tables',
            'Pooled versus median-of-groups summaries',
            'Pearson and Spearman correlation',
            'Correlation matrix',
            'Standardising to compare',
          ],
          explanation: `Interesting structure usually lives in how variables interact. Two-factor summaries are one line of code:

\`\`\`python
tips.groupby(['day', 'time'])['tip'].agg(['count', 'mean', 'median'])
pd.crosstab(tips['smoker'], tips['day'], normalize='columns')
\`\`\`

Keep \`count\` beside every mean so that readers can see what the mean rests on. With \`crosstab\`, the \`normalize\` option decides what the percentages are *of*, and that can change the story.

Be clear about **what you are averaging over**. If stations differ hugely in size, these two questions have different answers. The *pooled* ratio, total 2024 riders over total 2019 riders, is weighted towards busy stations and describes the system. The *median* of station ratios treats every station equally and describes a typical station. Neither is wrong. They answer different questions, so choose on purpose and say which you used.

For two numeric variables, Pearson's $r$ measures straight-line association. **Spearman's** $\\rho$ computes Pearson's $r$ on the ranks, so it captures any steady upward or downward trend. It also resists outliers and needs no units or normality. That makes it a good choice for skewed variables or for ordered ratings:

\`\`\`python
df['x'].corr(df['y'], method='spearman')
\`\`\`

A **correlation matrix** shows all the pairs at once, and it pays to look at this early. \`numeric.corr()\` gives the table, and \`sns.heatmap\` makes it readable. Strong pairs warn you of redundant variables, which will matter for regression.

**Pitfalls.** With 20 columns there are 190 pairs, so some look strong by chance. Correlations computed with pandas skip rows pair by pair, so different cells may rest on different rows. Grouped data can behave differently from ungrouped data: a correlation between county averages is usually stronger than the same correlation among individuals, and applying a group-level pattern to individuals is called the **ecological fallacy**. Finally, always plot before believing a number, as Anscombe's quartet taught you.`,
          resources: [
            pda('Chapter 10, Data Aggregation and Group Operations.'),
            ims('The chapters on exploring categorical data and numerical data.'),
            docs('Group by: split-apply-combine', 'https://pandas.pydata.org/docs/user_guide/groupby.html', 'pandas', 'Reference for groupby and named aggregation.'),
          ],
          exercises: [
            {
              slug: 'pooled-versus-median',
              title: 'Pooled versus typical',
              prompt:
                'Using the bridge file for 2024 and `BRIDGE_CONDITION`, compute the share of bridges rated poor in each county. Then compute two statewide figures: the pooled share of all bridges, and the median of the county shares. Why do they differ? Which would you report to a state engineer, and which to a county commissioner?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'spearman-versus-pearson',
              title: 'Pearson versus Spearman',
              prompt:
                'On Old Faithful, compute Pearson and Spearman correlation between `eruptions` and `waiting`. Then add one absurd row, (1, 500), and recompute both. Which moves more, and why? Describe a real case where you would prefer Spearman.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'normalize-changes-story',
              title: 'Percentages of what?',
              prompt:
                'For the tips data, make `crosstab` of `smoker` by `day` with `normalize=\'index\'`, `\'columns\'` and `\'all\'`. Write one true sentence from each table. Which one tells you the most about Fridays? Why would a reader be misled if the labels did not say what the percentages are of?',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'How do a pooled ratio and a median of ratios differ?', answerOutline: 'Pooled weights units by size and describes the total. The median treats each unit equally and describes a typical unit.' },
            { question: 'When is Spearman preferable to Pearson?', answerOutline: 'For skewed or ordinal data, outliers, or monotonic relationships that are not straight lines.' },
            { question: 'What is the ecological fallacy?', answerOutline: 'Assuming a relationship among groups holds for individuals in those groups.' },
          ],
        },
        {
          slug: 'a-visual-grammar',
          title: 'A visual grammar',
          summary:
            'A chart is a mapping from variables to visual channels. Think in that grammar, and use seaborn to build layered, faceted plots.',
          estimatedMinutes: 90,
          objectives: [
            'Describe a chart as data, aesthetics, marks, scales and facets',
            'Rank visual channels by how accurately people read them',
            'Build grouped and faceted charts with seaborn',
            'Choose log scales when ratios matter',
          ],
          concepts: [
            'Grammar of graphics',
            'Aesthetics: position, colour, size, shape',
            'Marks',
            'Scales',
            'Facets and small multiples',
            'Channel accuracy',
            'Log scale',
            'seaborn',
          ],
          explanation: `Do not think of charts as a menu of types. Think of a chart as a sentence in a **grammar**: data is mapped to **aesthetics** (position, colour, size), which are drawn with **marks** (points, lines, bars), using **scales** that turn values into visuals, and split into **facets**.

This way of thinking helps because it shows what is possible. A scatter plot is position mapped to two variables. Add colour for a third and facets for a fourth, and you can show four variables in one figure. **seaborn** works this way, using tidy data. Install it with \`.venv\\Scripts\\python -m pip install seaborn\`.

\`\`\`python
import seaborn as sns

sns.relplot(data=penguins, x='flipper_length_mm', y='body_mass_g',
            hue='sex', col='species')
\`\`\`

That one line gives three panels, one per species, each coloured by sex. Its newer \`objects\` interface spells the grammar out:

\`\`\`python
import seaborn.objects as so

(so.Plot(penguins, x='flipper_length_mm', y='body_mass_g', color='species')
   .add(so.Dot())
   .add(so.Line(), so.PolyFit(1))
   .facet(col='island'))
\`\`\`

Not all channels are equally accurate. People judge **position** on a common scale best, then length, then angle and area, and colour worst for exact amounts. So put the variable that matters most on a position axis, and use colour for groups. Do not ask a reader to compare areas or shades when bars or points will do.

**Facets**, also known as **small multiples**, are often better than crowding many lines into one panel, because the eye compares shapes across panels easily. Keep their axes shared, so that comparisons are honest.

**Scales.** If values span orders of magnitude, or you care about ratios, use a log scale: a doubling then looks the same everywhere. Say that the axis is logarithmic, and remember that zero cannot appear. Use a sequential palette for ordered values, a diverging palette when there is a meaningful midpoint such as a ratio of 1, and a qualitative palette for categories.

**Pitfall.** Encoding more variables is not always better. A chart with five aesthetics needs a legend tour. Start with the simplest mapping that answers your question, and make sure the colours survive colour-blindness, using seaborn's \`colorblind\` palette.`,
          resources: [
            docs('seaborn tutorial', 'https://seaborn.pydata.org/tutorial.html', 'seaborn', 'Start with the overview of plotting functions, then the objects interface.'),
            dataviz('Chapter 2 on aesthetics, chapter 3 on coordinate systems and axes, and chapter 21 on multi-panel figures.'),
          ],
          exercises: [
            {
              slug: 'four-variables',
              title: 'Four variables, one figure',
              prompt:
                'Using the tips data, make one faceted figure showing `total_bill` against `tip`, coloured by `smoker`, with a panel for each `day`. Add a fitted line. Write the mapping out in words as data, aesthetics, marks and facets. What does the figure show that a single scatter would hide?',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'channel-swap',
              title: 'Swap the channels',
              prompt:
                'Show mean penguin mass by species and sex in three ways: grouped bars, points on a common axis, and a heatmap coloured by mass. Ask someone to estimate the gap between two cells from each, or do it yourself and check. Which channel gave the most accurate reading? Explain the result with what this lesson says.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'log-axis',
              title: 'When a log axis tells the truth',
              prompt:
                'Using the bridge data, plot the histogram of `ADT_029`, average daily traffic, on a linear axis and on a log axis, after dropping zeros. What does the linear version hide? Then plot the share of poor bridges by bands of traffic. Should that x-axis be logarithmic? Justify your choice.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What are the parts of the grammar of graphics?', answerOutline: 'Data, aesthetic mappings, marks, scales and facets.' },
            { question: 'Which visual channel do people read most accurately?', answerOutline: 'Position along a common scale. Colour and area are much worse for exact amounts.' },
            { question: 'When is a log scale appropriate?', answerOutline: 'When values span orders of magnitude or you care about ratios and not absolute differences.' },
          ],
        },
        {
          slug: 'honest-graphics-and-interpretation',
          title: 'Honest graphics and written interpretation',
          summary:
            'Show the uncertainty, the denominator and the data you left out, and then write what a chart does and does not show.',
          estimatedMinutes: 75,
          objectives: [
            'Identify and fix misleading graphics',
            'Show uncertainty and sample size on a chart',
            'Write a claim, its evidence and its limits in plain language',
            'Distinguish what the data shows from what you infer',
          ],
          concepts: [
            'Truncated axes',
            'Denominators and rates',
            'Overplotting and alpha',
            'Showing the distribution, not only a summary',
            'Chart title as claim',
            'Claim, evidence, limits',
          ],
          explanation: `A chart is an argument, and a reader rarely checks it, so you have a duty to make it fair. Common ways to mislead, often by accident:

- **Truncating a bar axis**, so small gaps look huge.
- **Counts without denominators**: a map of crimes by county is mostly a map of population. Use rates.
- **Cherry-picked windows**: starting a time series at a peak makes anything look like a decline. Show the context, and say why you chose the dates.
- **Summaries that hide the data**: a bar of means hides spread, outliers and sample size. Prefer points, box plots or distributions, and add error bars or intervals.
- **Overplotting**: thousands of overlapping dots hide the density. Use \`alpha\`, hexbins or density plots.
- **Dual axes**: rescaling either axis can create any apparent relationship you like.

Add context that lets people check you: a source line, the sample size, the date range, and a reference line for something meaningful, such as a ratio of 1. If you excluded data, say so on the chart or just below it.

Then write. **A chart does not interpret itself**, and interpretation is a skill you must practise. A strong paragraph has three parts:

1. **Claim**: *Weekend ridership recovered far more than weekday ridership.*
2. **Evidence**: numbers, with units and comparisons. *At the median station, 2024 weekend ridership was 0.76 of 2019, compared with 0.58 on weekdays.*
3. **Limits**: what this does not show. *These are station entries, so they miss bus riders, and the data alone cannot say that remote work caused the gap.*

Keep **observation** and **inference** apart. *Downtown stations fell further* is an observation. *Because of remote work* is an inference, and it needs a separate argument. Words like *caused*, *led to* and *due to* are claims about cause, so use them only when your design supports it. Otherwise write *was associated with*.

**Pitfall.** Do not bury a surprising result, and do not lean on a chart's colour to make your case. Write for a smart reader who was not in the room, and check that your summary sentence would still be true if they looked at the raw numbers.`,
          resources: [
            dataviz('Chapter 16 on visualising uncertainty, and part II on principles of figure design, especially proportional ink.'),
            { title: 'Data to Viz: caveats', url: 'https://www.data-to-viz.com/caveats.html', type: 'article', cost: 'free', provider: 'Yan Holtz and Conor Healy', note: 'A catalogue of common chart mistakes, with fixes.' },
          ],
          exercises: [
            {
              slug: 'redraw-a-bad-chart',
              title: 'Redraw a misleading chart',
              prompt:
                'Find a misleading chart in the wild, or make one from the tips data. Name the specific problem, then redraw it with honest choices and include a source line and sample sizes. Write the same finding as one paragraph with a claim, evidence and limits.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bar-of-means',
              title: 'Replace the bar of means',
              prompt:
                'For penguin body mass by species, draw a bar of means with no error bars, then a strip or box plot showing all the data with the mean marked. What can you now see? Add a 95% interval for each mean. Which chart would you give to a colleague who must decide something from it?',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'observation-or-inference',
              title: 'Observation or inference?',
              prompt:
                'Label each as observation or inference, and rewrite the inferences so that they match what data alone can show: (a) Ridership fell 40% from 2019 to 2024. (b) Remote work reduced ridership. (c) Older bridges are rated lower. (d) Age damages bridges. (e) Poll errors were larger in 2020. (f) Non-response bias caused the 2020 polling miss.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'Why are raw counts often misleading on a map?', answerOutline: 'They usually track population or exposure, so you need a rate with a suitable denominator.' },
            { question: 'What three parts make a strong interpretation?', answerOutline: 'A claim, the evidence with numbers, and its limits.' },
            { question: 'How do observation and inference differ?', answerOutline: 'An observation states what the data shows. An inference explains why, and needs further justification.' },
          ],
          relatedLessons: ['probability-statistics/statistics-in-practice/visualisation-and-reproducible-reporting'],
        },
      ],
    },
    {
      slug: 'sampling-and-probability-models',
      title: 'Sampling and Probability Models',
      description:
        'How a sample relates to a population, how bias enters, and how to fit discrete and continuous probability models to data and check whether they hold.',
      lessons: [
        {
          slug: 'random-sampling-and-bias',
          title: 'Random sampling and sampling bias',
          summary:
            'Simple, stratified and cluster sampling, and the ways a sample can fail to represent what you care about.',
          estimatedMinutes: 75,
          objectives: [
            'Compare simple random, stratified and cluster sampling',
            'Identify selection, survivorship and detection bias',
            'Draw stratified samples in pandas',
            'Explain why a bigger biased sample does not help',
          ],
          concepts: [
            'Population, frame, sample',
            'Simple random sampling',
            'Stratified sampling',
            'Cluster sampling',
            'Selection bias',
            'Survivorship bias',
            'Detection bias',
            'Effective sample size',
          ],
          explanation: `A sample lets you learn about a population only if you can account for how it was chosen.

In **simple random sampling**, every unit has the same chance. In **stratified sampling**, you split the population into groups and sample from each, which guarantees that small groups appear and usually reduces error. In **cluster sampling**, you pick whole groups, such as schools, and study everyone inside. It is cheaper, but units in a cluster resemble each other, so the data holds less information than its size suggests. The **effective sample size** may be much smaller than the row count. Polls from the same race, or students in the same classroom, behave this way.

\`\`\`python
srs = df.sample(n=500, random_state=207)
strat = df.groupby('district').sample(n=50, random_state=207)
\`\`\`

Bias arises when the data-generating process favours some units:

- **Selection bias**: who gets in depends on the outcome or a cause of it. Online reviews come from people with strong feelings.
- **Survivorship bias**: you see only what lasted. In the Second World War, armour was first proposed where returning planes had holes, until Abraham Wald pointed out that the planes hit elsewhere had not come back. Bridges work the same way: a bridge in terrible shape gets replaced and vanishes from later files.
- **Detection bias**: what you see depends on your instrument. Small earthquakes are found mainly near seismometers, so a global catalog is complete only above a magnitude threshold. A histogram of magnitudes that peaks and then falls at small sizes is not telling you about the earth. It is telling you about the instruments.

**How to look for it.** Ask three questions. How did a row get into this table? What would have to happen for a row to be missing? Could the outcome you care about affect that? Compare your sample with a known total if you can.

**Pitfall.** Larger samples shrink random error but leave bias untouched, so a huge biased sample gives a precise wrong answer. *Big data* is often a large convenience sample. Its size can make its bias harder to notice, because the confidence intervals look so tight.`,
          resources: [
            ims('The chapter on study design, especially sampling principles and strategies.'),
            { title: 'Think Stats, 3rd edition', url: 'https://allendowney.github.io/ThinkStats/', type: 'textbook', cost: 'free', provider: 'Allen Downey', note: 'The chapters on sampling and estimation, using real survey data.' },
          ],
          exercises: [
            {
              slug: 'stratified-versus-simple',
              title: 'Does stratifying help?',
              prompt:
                'Treat the Illinois bridges in highway districts 1 to 9 as a population and let the target be the share rated poor, which you can compute exactly. With a for-loop, draw 2,000 simple random samples of 450 and 2,000 stratified samples with 50 per district. Compare each method\'s average estimate and spread with the true share. Stratified samples are not proportional, so reweight them by district size. Which method has the smaller spread, and why?',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'name-the-bias',
              title: 'Name the bias',
              prompt:
                'For each case, name the bias and give the direction of the error: (a) Average lifespan of famous musicians from the charts. (b) Mean rating of a restaurant from an app. (c) Rate of a rare side effect from voluntary reports. (d) Trend in tornado counts since 1950. (e) Returns of mutual funds that exist today. State what extra data would help in each.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'effective-sample-size',
              title: 'When rows are not independent',
              prompt:
                'Simulate 100 clusters of 20 people each, where everyone in a cluster shares a random cluster effect with standard deviation 1, plus individual noise with standard deviation 1. Compute the mean. Repeat 5,000 times and find the standard deviation of the mean. Compare it with the value you would expect from 2,000 independent rows. What is the effective sample size?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'Why can stratified sampling beat simple random sampling?', answerOutline: 'It guarantees representation of each group and removes variation between groups from the error.' },
            { question: 'What is survivorship bias?', answerOutline: 'Analysing only units that survived some selection, so that those that dropped out are invisible.' },
            { question: 'Why does a cluster sample carry less information than its row count?', answerOutline: 'Units in a cluster are similar, so extra rows add less new information than independent rows would.' },
          ],
        },
        {
          slug: 'discrete-models',
          title: 'Discrete probability models',
          summary:
            'Binomial and Poisson models for counts, and the warning sign of overdispersion.',
          estimatedMinutes: 75,
          objectives: [
            'Choose binomial or Poisson for a count',
            'Compute model probabilities with `scipy.stats`',
            'Compare a model with the distribution of real counts',
            'Recognise and explain overdispersion',
          ],
          concepts: [
            'Probability mass function',
            'Binomial model',
            'Poisson model and rate',
            'Mean equals variance for a Poisson',
            'Dispersion index',
            'Overdispersion',
            'Clustering of events',
          ],
          explanation: `A **probability model** is a compact statement of how data is generated. If it fits, you can predict rare events and compare groups. If it does not fit, the way it fails tells you something real.

The **binomial** model counts successes in a fixed number of independent trials. The **Poisson** model counts events in a fixed window of time or space, when they occur independently at a steady average rate $\\lambda$:

$$ P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!} $$

It suits counts with no fixed upper limit, such as calls per hour or accidents per month, and it is the limit of a binomial with many trials and a small chance of success.

\`\`\`python
from scipy import stats

stats.poisson.pmf(3, mu=2.5)      # P(X = 3)
stats.poisson.sf(9, mu=2.5)       # P(X >= 10), survival function
\`\`\`

A defining feature is that a Poisson's mean **equals** its variance. That gives a quick test. The **dispersion index**, variance over mean, should be close to 1:

\`\`\`python
counts = df.groupby('month').size()
counts.var() / counts.mean()
\`\`\`

A value far above 1 is **overdispersion**: the counts vary more than a constant-rate independent process allows. There are two usual reasons. The rate may vary over time or between groups, or events may trigger one another. Either way, the model is wrong, and any probability it gives for extreme counts will be too small, sometimes by a huge factor. For a binomial with the same probability everywhere, there is a similar check: compare the observed variation across groups with what $np(1-p)$ predicts.

To compare a model with data, compute the expected number of periods with each count, $N \\times P(X = k)$, and put it beside the observed number.

**Pitfalls.** Check that the window is fixed: months differ in length, though the effect is small. Remember that independence is what fails most often, because real events cluster. A count of zero-inflated data, with many more zeros than the mean suggests, is another common failure. Do not accept a model because the mean matches. A Poisson is fitted using the mean, so the mean will always match. Test what the fit did not use, such as the variance and the tail.`,
          resources: [
            docs('scipy.stats', 'https://docs.scipy.org/doc/scipy/reference/stats.html', 'SciPy', 'Reference for pmf, cdf, sf and rvs on each distribution.'),
            ims('The sections on distributions used in inference, as a review.'),
          ],
          exercises: [
            {
              slug: 'poisson-by-hand',
              title: 'Poisson by hand and by code',
              prompt:
                'A call centre averages 2.5 calls per minute. By the formula, compute P(0), P(3) and P(at least 1), and check with `scipy.stats`. P(0) should be 0.082. In a simulation of 60,000 minutes, compute the dispersion index. It should be near 1. Now let the rate be 1 for half the minutes and 4 for the other half. What happens to the dispersion index, and why?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'county-overdispersion',
              title: 'Is one rate enough?',
              prompt:
                'In the 2024 Illinois bridge file, count poor bridges in each of the 102 counties. Under a model with one statewide probability, each county\'s count is binomial with its own number of bridges. Compute the Pearson statistic, the sum over counties of $(O-E)^2 / (np(1-p))$, and compare it with the 101 expected under the model. What does the size of your result imply?',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'County codes are in `COUNTY_CODE_003` and the condition is in `BRIDGE_CONDITION`.',
            },
          ],
          selfAssessment: [
            { question: 'What assumptions does a Poisson model make?', answerOutline: 'Events are independent, the rate is constant, and they are counted in fixed windows.' },
            { question: 'What does a dispersion index far above 1 suggest?', answerOutline: 'Overdispersion: the rate varies, or events cluster, so the Poisson model understates extremes.' },
            { question: 'Why is matching the mean weak evidence for a Poisson model?', answerOutline: 'The mean was used to fit it, so it matches by construction. Check the variance and tails.' },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/discrete-distributions'],
        },
        {
          slug: 'continuous-models',
          title: 'Continuous probability models',
          summary:
            'Normal, lognormal, exponential and gamma models: what process produces each one, and how to choose among them.',
          estimatedMinutes: 75,
          objectives: [
            'Interpret a density and a cumulative distribution',
            'Match a continuous model to a data-generating story',
            'Compute probabilities and quantiles with `scipy.stats`',
            'Explain the link between the Poisson process and the exponential distribution',
          ],
          concepts: [
            'Density and CDF',
            'Normal',
            'Lognormal',
            'Exponential and the memoryless property',
            'Gamma',
            'Heavy tails',
            'Survival function',
          ],
          explanation: `For continuous variables, a model gives a **density**, and the probability of a range is the area under it. The **CDF** $F(x) = P(X \\le x)$ is usually easier to compare with data, because it needs no bins. The **survival function** $1 - F(x)$ gives tail chances.

Choose a model from a story about how the data arises.

- **Normal**: the sum of many small independent effects. Used for measurement error and heights.
- **Lognormal**: the *product* of many small independent factors, so the logarithm is normal. Used for incomes, city sizes, traffic counts. It is always positive and right-skewed. If a histogram on a log axis looks symmetric, try this one.
- **Exponential**: waiting times between events of a Poisson process. Its density is $\\lambda e^{-\\lambda x}$, with mean $1/\\lambda$.
- **Gamma**: a flexible positive model with a shape parameter. With shape 1 it is exponential. A shape below 1 means more very short gaps and more long gaps than an exponential, which is what clustering looks like.

The exponential has a striking property: it is **memoryless**. If events follow a Poisson process, then $P(X > s + t \\mid X > s) = P(X > t)$. Having waited a long time makes the next event no more and no less likely. That matches radioactive decay. Whether it matches the world is a question you can test, for instance for earthquakes.

A simple exponential check is the **coefficient of variation**, standard deviation over mean, which equals 1 for an exponential. A value well above 1 points to clustering, and one well below 1 suggests regular spacing.

\`\`\`python
from scipy import stats

stats.norm.cdf(1.96)                      # about 0.975
stats.expon.sf(0.1, scale=0.74)           # P(gap > 0.1) with mean gap 0.74
stats.gamma.ppf(0.5, a=0.64, scale=1.16)  # a median
\`\`\`

\`scale\` means different things for different models: for the exponential it is the mean. \`ppf\` is the inverse CDF, used for quantiles.

**Pitfalls.** A heavy-tailed variable has more extreme values than a normal would allow, so using the normal to judge risk badly understates rare events. Models are descriptions, not laws. The aim is not to find the true distribution, but one that is good enough for your purpose, with known failures.`,
          resources: [
            docs('Statistical functions tutorial', 'https://docs.scipy.org/doc/scipy/tutorial/stats.html', 'SciPy', 'How distributions, parameters and methods work.'),
            thinkStats('The chapters on probability density and on modelling distributions.'),
          ],
          exercises: [
            {
              slug: 'memoryless-check',
              title: 'Check memorylessness',
              prompt:
                'Draw 200,000 exponential waiting times with mean 2 and a seed. Estimate P(X > 3) and P(X > 5 given X > 2), and show that they match, both near 0.223. Repeat with a gamma with shape 0.5, scaled to the same mean. Which way does the conditional probability move, and what does this say about processes that cluster?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'log-transform-bills',
              title: 'Is it lognormal?',
              prompt:
                'Plot the histogram of `total_bill` from the tips data, and of its logarithm. Compute the skewness of each with `scipy.stats.skew`. Then do the same with `ADT_029` for bridges, dropping zeros. For which variable does the log transform help more? Give a story of how each variable arises that fits what you see.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What data-generating story suggests a lognormal?', answerOutline: 'A quantity built from many multiplicative factors, so its logarithm is approximately normal.' },
            { question: 'What does memoryless mean?', answerOutline: 'The chance of waiting a further time t does not depend on how long you have already waited.' },
            { question: 'What does a coefficient of variation above 1 suggest about waiting times?', answerOutline: 'More variation than an exponential gives, usually from clustering of events.' },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/continuous-distributions'],
        },
        {
          slug: 'fitting-and-checking-a-model',
          title: 'Fitting and checking a model',
          summary:
            'Fit a distribution to data, then try to break it with Q-Q plots, tail counts and the Kolmogorov-Smirnov distance.',
          estimatedMinutes: 90,
          objectives: [
            'Fit a distribution with `scipy.stats`',
            'Draw and read a Q-Q plot',
            'Compare an empirical CDF with a fitted CDF',
            'Check a model against tails, which the fit does not guarantee',
          ],
          concepts: [
            'Fitting by moments',
            'Empirical CDF',
            'Q-Q plot',
            'Kolmogorov-Smirnov distance',
            'Tail check',
            'Model comparison',
            'Rounded data',
          ],
          explanation: `Fitting a model is easy, and checking it is the real work.

The simplest fit is the **method of moments**: set the model's mean and variance equal to the sample's. For a normal, that means using $\\bar{x}$ and $s$. \`scipy.stats\` distributions have a \`.fit\` method that uses maximum likelihood, the topic of the next module. Fix any parameter that should not float: \`floc=0\` keeps the location at zero for waiting times.

\`\`\`python
from scipy import stats

mean_gap = gaps.mean()
shape, loc, scale = stats.gamma.fit(gaps, floc=0)
\`\`\`

Now try to break it. A histogram with a curve over it is a weak check, because bins hide tails. Better tools:

- **Empirical CDF**: for each $x$, the share of data at or below $x$. Plot it against the fitted CDF.
- **Q-Q plot**: sort the data and plot it against the model's matching quantiles. If the model fits, the points lie on a straight line. Curving at the ends reveals tails that are too heavy or too light.

\`\`\`python
import matplotlib.pyplot as plt
stats.probplot(gaps, dist=stats.gamma(shape, 0, scale), plot=plt)
\`\`\`

- **Kolmogorov-Smirnov (KS) distance**: the largest vertical gap between the empirical and fitted CDFs. It gives a single number for comparing models. With thousands of rows, even tiny misfits become statistically significant, so treat it as a distance and do not rely on its p-value. Also, the standard KS p-value assumes the parameters were not estimated from the same data.
- **Tail check**: compare observed counts of extreme events with model predictions. That is often the check that matters most, since tails are what risk depends on.

Compare models using the same data, and keep the simplest one that does the job.

**Pitfalls.** Real measurements are rounded. Earthquake magnitudes come in steps of 0.1, and that affects both the fit and the plots, because many values tie. A model that fits the middle may fail badly in the tail, and the reverse also happens. Be wary of fitting many distributions and picking the best. You will always find one that seems to win, and it may not hold up on new data. Finally, a misfit is a finding. When a Poisson model fails on earthquakes, the failure is aftershocks.`,
          resources: [
            docs('scipy.stats.kstest and distributions', 'https://docs.scipy.org/doc/scipy/reference/stats.html', 'SciPy', 'See `probplot`, `kstest`, and the `fit` method on continuous distributions.'),
            { title: 'NIST/SEMATECH e-Handbook of Statistical Methods', url: 'https://www.itl.nist.gov/div898/handbook/eda/eda.htm', type: 'textbook', cost: 'free', provider: 'NIST', note: 'Chapter 1, Exploratory Data Analysis, has clear pages on Q-Q and probability plots.' },
          ],
          exercises: [
            {
              slug: 'qq-gallery',
              title: 'A Q-Q gallery',
              prompt:
                'Make normal Q-Q plots of four samples of 1,000: normal, exponential, a t-distribution with 3 degrees of freedom, and uniform. Describe how each shape bends away from the line. Then make a normal Q-Q plot of Gentoo body mass and of Old Faithful `eruptions`, and use your gallery to interpret them.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'fit-and-break',
              title: 'Fit and break a model',
              prompt:
                'Fit a normal and a lognormal to `total_bill` from the tips data. Compare them with an empirical CDF plot, a Q-Q plot and the KS distance. Then count how many bills exceed 40 and compare with what each model predicts for 244 bills. Which one would you use, and for what purpose? Name one thing neither model captures.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bootstrap-the-ks-idea',
              title: 'Why the KS p-value lies',
              prompt:
                'Simulate 2,000 samples of size 100 from a normal. For each, fit the mean and standard deviation from the same sample and run `stats.kstest`. What share has $p < 0.05$? It should be 5% if the p-value were valid, but it is far lower. Explain why estimating the parameters first makes the fit look too good.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What does a straight Q-Q plot mean?', answerOutline: 'The data quantiles match the model quantiles, so the shape of the model fits.' },
            { question: 'Why might a tail check matter more than a histogram?', answerOutline: 'Risk decisions depend on rare events, and a histogram hides the tail.' },
            { question: 'Why is a misfit useful?', answerOutline: 'How a model fails shows what real process it left out, such as clustering.' },
          ],
        },
      ],
    },
    {
      slug: 'estimation-and-uncertainty',
      title: 'Estimation and Uncertainty',
      description:
        'Turn data into estimates with honest error bars: estimators and standard errors, maximum likelihood in practice, the bootstrap and confidence intervals.',
      lessons: [
        {
          slug: 'estimators-and-standard-errors',
          title: 'Estimators and standard errors',
          summary:
            'An estimator is a recipe that varies from sample to sample. Judge it by its bias and its spread.',
          estimatedMinutes: 75,
          objectives: [
            'Tell a parameter, an estimator and an estimate apart',
            'Measure bias and standard error by simulation',
            'Explain the bias and variance trade-off through mean squared error',
            'Compare two estimators of the same quantity',
          ],
          concepts: [
            'Parameter, estimator, estimate',
            'Sampling distribution',
            'Bias',
            'Standard error',
            'Mean squared error',
            'Consistency',
            'Efficiency',
          ],
          explanation: `A **parameter** is a fixed unknown truth, such as a population mean. An **estimator** is a recipe for guessing it from data, and an **estimate** is what that recipe gives on your sample. Since samples vary, the estimator is itself a random quantity with a sampling distribution. Two numbers describe how good it is:

- **Bias**: on average, how far is the estimator from the truth? $\\text{Bias} = E[\\hat\\theta] - \\theta$.
- **Standard error**: how much does it vary from sample to sample?

Together they make up the **mean squared error**:

$$ \\text{MSE} = \\text{Bias}^2 + \\text{SE}^2 $$

An unbiased estimator is not automatically best. A slightly biased estimator with a much smaller spread can have lower MSE, and this idea returns as regularisation in Module 8.

Simulation lets you measure all of this when you set the truth yourself:

\`\`\`python
rng = np.random.default_rng(207)
samples = rng.normal(100, 15, size=(10000, 25))   # 10,000 samples of 25
means = samples.mean(axis=1)
medians = np.median(samples, axis=1)
means.mean() - 100, means.std()       # bias near 0, SE near 3.0
medians.mean() - 100, medians.std()   # bias near 0, SE near 3.7
\`\`\`

For normal data, both are unbiased, but the mean has a smaller standard error, so it is more **efficient**. On heavy-tailed data the order can flip, and the median wins, which is one reason robust statistics exist.

Sample variance gives another example. Dividing by $n$ gives a biased estimate, too small on average, since distances are measured from the sample's own mean. Dividing by $n-1$ removes that bias. For a large $n$ the difference vanishes, and we call an estimator **consistent** if it closes in on the truth as $n$ grows.

**Standard error versus standard deviation.** SD describes individuals, and SE describes an estimate. For a mean, $\\text{SE} = s/\\sqrt{n}$, assuming independent observations.

**Pitfalls.** The formula's assumption of independence matters. Clustered rows have a larger SE than this formula reports. Bias does not shrink with $n$, while SE does, so with big data the bias dominates. Report an estimate along with its uncertainty, and not as a bare number.`,
          resources: [
            thinkStats('The chapter on estimation, which uses simulation to compare estimators.'),
            ims('The chapters on foundations of inference, for the idea of variability in estimates.'),
          ],
          exercises: [
            {
              slug: 'mean-vs-median-tails',
              title: 'Mean versus median in heavy tails',
              prompt:
                'Using simulation with 10,000 samples of size 25, estimate the bias and SE of the mean and median for three populations: normal, $t$ with 3 degrees of freedom, and an exponential whose true mean is 1. Tabulate the results. Which estimator wins for each? For the exponential, explain why the median is biased for the mean.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'variance-bias',
              title: 'Why n minus 1?',
              prompt:
                'For samples of size 5 from a standard normal, simulate the variance estimator with `ddof=0` and with `ddof=1`. The first should average about 0.8 and the second about 1.0. Compare their MSEs. Which has the lower MSE? Explain how an estimator can be biased and still have a lower MSE.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What is the difference between an estimator and an estimate?', answerOutline: 'An estimator is the rule, a random quantity before seeing data. An estimate is the value from your sample.' },
            { question: 'Write MSE in terms of bias and standard error.', answerOutline: 'MSE = bias squared + SE squared.' },
            { question: 'As n grows, what happens to bias and SE?', answerOutline: 'SE shrinks like $1/\\sqrt{n}$. Bias from the design does not shrink, so it dominates in large data.' },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/point-estimation-and-estimator-properties'],
        },
        {
          slug: 'maximum-likelihood-in-practice',
          title: 'Maximum likelihood in practice',
          summary:
            'Pick the parameter that makes your data most probable. Do it by formula, by a numerical search, and with care around rounded data.',
          estimatedMinutes: 90,
          objectives: [
            'Write a log-likelihood for a simple model',
            'Derive the maximum likelihood estimate for the exponential model',
            'Find an estimate numerically with SciPy',
            'Adjust for rounded data',
            'Compare models with AIC',
          ],
          concepts: [
            'Likelihood',
            'Log-likelihood',
            'Maximum likelihood estimate',
            'Numerical optimisation',
            'Standard error from curvature',
            'AIC',
            'Discretisation correction',
          ],
          explanation: `Given a model with parameter $\\theta$, the **likelihood** $L(\\theta)$ is the probability of your data, viewed as a function of $\\theta$. The **maximum likelihood estimate** (MLE) is the value of $\\theta$ that makes the data most probable. Working with the logarithm turns a product into a sum, and that is easier and numerically safer:

$$ \\ell(\\theta) = \\sum_{i=1}^{n} \\log f(x_i \\mid \\theta) $$

For the exponential model $f(x) = \\beta e^{-\\beta x}$, this gives $\\ell(\\beta) = n\\log\\beta - \\beta\\sum x_i$. Setting the derivative to zero gives

$$ \\hat\\beta = \\frac{1}{\\bar{x}} $$

You do not need calculus for this course, since you can have the computer search for the peak. Many models have no formula anyway:

\`\`\`python
from scipy.optimize import minimize_scalar

def neg_log_lik(beta):
    return -(len(x) * np.log(beta) - beta * x.sum())

fit = minimize_scalar(neg_log_lik, bounds=(1e-6, 100), method='bounded')
fit.x
\`\`\`

We minimise the negative, because optimisers minimise. Plot $\\ell(\\beta)$ near the peak too. A sharp peak means the data pins down the parameter well, and a flat peak means it does not. That curvature gives a standard error, which for this model is $\\hat\\beta/\\sqrt{n}$.

\`scipy.stats\` does this with \`.fit\`, and it returns MLEs for a chosen family. Fix any parameter that is not meant to vary with \`floc=0\`.

**Rounding.** Earthquake magnitudes are rounded to 0.1 and recorded only above a threshold $m_0$. A magnitude above the threshold is modelled as exponential, but because a value of 5.5 stands for anything from 5.45 to 5.55, you measure from $m_0 - 0.05$:

$$ \\hat\\beta = \\frac{1}{\\bar{m} - (m_0 - 0.05)} $$

This is the Aki-Utsu estimator. Ignore the correction and you get a noticeably biased answer. Details of how data was recorded can change the result.

**Comparing models.** More parameters always fit at least as well, so **AIC** penalises them: $\\text{AIC} = 2k - 2\\ell$, where a lower value is better.

**Pitfalls.** MLEs assume the model is right. If it is wrong, you get the best fit within a wrong family. MLEs can be biased in small samples, and optimisers can stop at the wrong place, so always plot, and always start from a sensible value.`,
          resources: [
            thinkStats('The chapter on estimation, for likelihood seen through examples.'),
            docs('scipy.optimize.minimize_scalar', 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize_scalar.html', 'SciPy', 'Bounded one-parameter optimisation.'),
          ],
          exercises: [
            {
              slug: 'exponential-mle',
              title: 'Three ways to one answer',
              prompt:
                'Simulate 500 exponential values with rate 2 and a seed. Find the MLE of the rate in three ways: $1/\\bar{x}$, a `minimize_scalar` search, and `stats.expon.fit` with `floc=0` (take 1 over the scale). They should agree to several decimals. Plot the log-likelihood and mark the estimate. Repeat with 50 values, and describe how the peak changes.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'rounding-correction',
              title: 'What rounding does',
              prompt:
                'Simulate 100,000 exponential excesses with true rate 2.3 above a threshold of 5.45, then round them to one decimal and keep values of at least 5.5. Estimate the rate with $1/(\\bar{m} - 5.5)$ and with $1/(\\bar{m} - 5.45)$. Which is closer to 2.3? Explain why, using what 5.5 really stands for after rounding.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'poisson-mle-derivation',
              title: 'The Poisson MLE',
              prompt:
                'Write down the log-likelihood for $n$ independent Poisson counts. Using the fact that the derivative of $\\log\\lambda$ is $1/\\lambda$, show that $\\hat\\lambda = \\bar{x}$. If you have not done calculus, instead evaluate the log-likelihood on a grid of $\\lambda$ values for the counts 2, 3, 1, 4, 5 and confirm that the peak is at 3.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does a maximum likelihood estimate maximise?', answerOutline: 'The probability of the observed data as a function of the parameter.' },
            { question: 'Why work with the log-likelihood?', answerOutline: 'Products become sums, which avoids numerical underflow and is easier to optimise.' },
            { question: 'What does a flat likelihood tell you?', answerOutline: 'The data does not pin down the parameter well, so its standard error is large.' },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
        },
        {
          slug: 'the-bootstrap',
          title: 'The bootstrap',
          summary:
            'Estimate uncertainty for almost any statistic by resampling your own data.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the logic of the bootstrap',
            'Bootstrap a standard error and a percentile interval',
            'Resample at the right unit',
            'Name situations where the bootstrap fails',
          ],
          concepts: [
            'Resampling with replacement',
            'Bootstrap distribution',
            'Percentile interval',
            'Bootstrap standard error',
            'Resampling the right unit',
            'Failure on extremes',
          ],
          explanation: `Standard error formulas exist for means and proportions, but what about a median, a ratio, or the difference in a fitted coefficient? The **bootstrap** gives you an answer for almost anything.

If you had the whole population, you could draw many samples and watch a statistic vary. You do not, so you use the sample as a stand-in for the population. Resample $n$ rows **with replacement**, compute the statistic, and repeat thousands of times. The spread of those values estimates the sampling variability.

\`\`\`python
rng = np.random.default_rng(207)
bills = tips['total_bill'].to_numpy()
idx = rng.integers(0, len(bills), size=(5000, len(bills)))
boot = np.median(bills[idx], axis=1)

boot.std(ddof=1)                      # SE of the median, about 0.52
np.percentile(boot, [2.5, 97.5])      # about 16.5 to 18.7
\`\`\`

That is the **percentile interval**: the middle 95% of bootstrap values. The sample median is 17.795, so you now have an error bar for it with no formula. SciPy offers \`scipy.stats.bootstrap\` too, which can compute better-behaved intervals.

**Resample the right unit.** The bootstrap assumes that what you resample is independent. If rows come in clusters, such as polls within races or students within schools, resample whole clusters. If you resample rows, your intervals will be too narrow. For a time series, resampling days destroys the order that matters. If you bootstrap a difference between two groups, resample within each group.

**Keep the seed**, and use enough resamples: 2,000 to 10,000 is usually plenty for an interval. More resamples reduce noise from the simulation, but cannot add information your sample lacks.

**Where it fails.** The bootstrap struggles with statistics that depend on extreme values. The maximum of a resample can never exceed the maximum of the sample, so the bootstrap badly understates uncertainty about a maximum. It is also weak with very small samples, or with very skewed data of moderate size, where percentile intervals can undercover. In a machine problem, you will measure this by simulation.

**Pitfall.** The bootstrap handles sampling variation only. If your sample is biased, the bootstrap will centre on that bias with confidence. It is not magic, as the name might suggest. It cannot rescue data you do not have.`,
          resources: [
            ims('The chapter on confidence intervals with bootstrapping.'),
            docs('scipy.stats.bootstrap', 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html', 'SciPy', 'Built-in bootstrap with several interval methods.'),
            { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', type: 'interactive', cost: 'free', provider: 'Brown University', note: 'Chapter 4, Frequentist Inference, has an animation of bootstrapping.' },
          ],
          exercises: [
            {
              slug: 'bootstrap-median-bills',
              title: 'Bootstrap a median',
              prompt:
                'Reproduce the bootstrap of the median `total_bill`, getting a median of 17.795 and an SE near 0.52. Then bootstrap the mean, and compare its SE with $s/\\sqrt{n}$, about 0.57. Finally, bootstrap the ratio of mean tip to mean bill, which has no simple formula, and report a 95% percentile interval in plain language.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'cluster-bootstrap',
              title: 'Resample the right unit',
              prompt:
                'Simulate 30 schools with 40 students each, with a school effect of standard deviation 5 and student noise of standard deviation 10. Estimate the SE of the overall mean by bootstrapping rows and by bootstrapping schools. Compare both with the true SE from repeating the whole simulation 2,000 times. Which is right, and by how much is the other off?',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'bootstrap-the-max',
              title: 'Break the bootstrap',
              prompt:
                'Draw 100 values from a uniform on 0 to 1. Bootstrap the maximum, and plot the bootstrap distribution. What share of resamples have a maximum exactly equal to the sample maximum? It should be near 0.63. Build a 95% percentile interval, and repeat the whole process 2,000 times. How often does the interval contain the true maximum of 1? Why?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'Why resample with replacement?', answerOutline: 'To mimic new samples of size n from the population, using the sample as a stand-in. Without replacement you would get the same sample every time.' },
            { question: 'What goes wrong if you bootstrap rows in clustered data?', answerOutline: 'You treat correlated rows as independent, so the SE is too small. Resample clusters.' },
            { question: 'What can the bootstrap not fix?', answerOutline: 'Bias in the sample, very small samples, and statistics driven by extremes.' },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/bootstrap-resampling'],
        },
        {
          slug: 'confidence-intervals-in-practice',
          title: 'Confidence intervals in practice',
          summary:
            't intervals, intervals for differences, and how to check whether an interval really covers what it claims.',
          estimatedMinutes: 75,
          objectives: [
            'Compute a t interval for a mean',
            'Interpret an interval for a difference in context',
            'Measure coverage by simulation',
            'Choose between formula and bootstrap intervals',
          ],
          concepts: [
            't distribution',
            'Degrees of freedom',
            'Interval for a difference',
            'Welch interval',
            'Coverage',
            'Overlap is not a test',
          ],
          explanation: `In Discovery, you used $\\pm 1.96$ standard errors. That is fine for large samples. For smaller ones, estimating $\\sigma$ with $s$ adds uncertainty, and the **t distribution** handles this. It has heavier tails than the normal, shaped by the **degrees of freedom**, $n-1$ for a mean:

$$ \\bar{x} \\pm t^* \\frac{s}{\\sqrt{n}} $$

\`\`\`python
from scipy import stats

x = penguins.loc[penguins['species'] == 'Chinstrap', 'body_mass_g'].dropna()
se = x.std() / len(x) ** 0.5
t_star = stats.t.ppf(0.975, df=len(x) - 1)
x.mean() - t_star * se, x.mean() + t_star * se
\`\`\`

With 68 values, $t^* \\approx 2.0$, close to 1.96. With 5 values it is 2.78, a real difference.

For a **difference of two means**, the Welch method allows unequal variances, and it should be your default. SciPy will give you the interval:

\`\`\`python
res = stats.ttest_ind(a, b, equal_var=False)
res.confidence_interval()
\`\`\`

For Adelie minus Chinstrap body mass, it runs from about -150 to +86 grams, which includes zero. So these data do not show a difference in mean mass, and they rule out gaps much larger than about 150 g. Saying *which effect sizes are ruled out* is often more useful than saying *not significant*.

**How do you know that a method works?** Measure its **coverage** by simulating from a known truth and counting how often the interval contains it. If a 95% method covers 91%, then your stated confidence is wrong. Coverage suffers with small samples, skewed data, proportions near 0 or 1, and clustering.

**Which interval?** For means with moderate samples, use t or Welch. For medians, ratios or anything odd, use a bootstrap. If the two agree, take comfort. If they disagree, find out why.

**Pitfalls.** Two 95% intervals that overlap do not prove that groups are alike, since a difference can still be significant. Compute the interval for the difference itself. An interval's width says nothing about bias. Reporting intervals for many subgroups invites cherry-picking, so report them all.`,
          resources: [
            ims('The chapters on inference for a single mean and for comparing two independent means.'),
            docs('scipy.stats.ttest_ind', 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html', 'SciPy', 'See `equal_var` and the `confidence_interval` method on the result.'),
          ],
          exercises: [
            {
              slug: 'overlap-trap',
              title: 'The overlap trap',
              prompt:
                'Construct two simulated groups of 100 whose individual 95% intervals overlap, but whose difference has a 95% interval that excludes zero. Report all three intervals. Explain why comparing overlap is too cautious, and write the rule you will use from now on.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'coverage-small-skewed',
              title: 'Coverage on skewed data',
              prompt:
                'For exponential data with $n$ of 10, 30 and 100, run 5,000 simulations and measure the coverage of the 95% t interval and of a bootstrap percentile interval with 1,000 resamples. Tabulate the results. Which suffers more at $n = 10$? How large must $n$ be before the stated confidence is fair?',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'difference-in-context',
              title: 'Report a difference',
              prompt:
                'In the STAR kindergarten data, compute the Welch interval for small minus regular on `mathk` and `readk`. Write a paragraph for a school board that states the estimates with units, the intervals, and what size of effect the data rules out. Add one limit that the interval does not cover.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why use t and not 1.96?', answerOutline: 'Estimating the spread from the sample adds uncertainty, so the interval needs heavier tails, especially for small n.' },
            { question: 'What is coverage and how do you measure it?', answerOutline: 'The share of intervals containing the truth, measured by simulating from a known truth.' },
            { question: 'Do overlapping intervals mean no difference?', answerOutline: 'No. Compute an interval for the difference itself. Overlap is too cautious a check.' },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/confidence-intervals'],
        },
      ],
    },
    {
      slug: 'hypothesis-testing',
      title: 'Hypothesis Testing',
      description:
        'Test claims properly: test logic, p-values, power, permutation tests, t and chi-square tests, and how to stay honest when you run many tests.',
      lessons: [
        {
          slug: 'test-logic-and-p-values',
          title: 'Test logic and p-values',
          summary:
            'Review the logic of a test, the two ways of being wrong, and what the American Statistical Association says a p-value does not mean.',
          estimatedMinutes: 60,
          objectives: [
            'State null and alternative hypotheses before seeing results',
            'Name Type I and Type II errors in context',
            'Choose between one-sided and two-sided tests',
            'Report an effect size with every p-value',
          ],
          concepts: [
            'Null and alternative',
            'Test statistic and null distribution',
            'Type I and Type II errors',
            'One-sided and two-sided tests',
            'Effect size',
            'Practical significance',
          ],
          explanation: `All tests follow one pattern. You choose a **test statistic**, work out its distribution if the null were true, and see where your value falls. The tests in this module differ only in how they get that **null distribution**: by formula, or by simulation.

There are two ways to be wrong:

| | $H_0$ true | $H_0$ false |
|---|---|---|
| Reject | **Type I error** (false positive), rate $\\alpha$ | Correct |
| Do not reject | Correct | **Type II error** (false negative), rate $\\beta$ |

The significance level $\\alpha$ is the rate of false alarms you accept **when the null is true**. Power, $1 - \\beta$, is the chance of detecting a real effect, and it is the subject of the next lesson. Which error is worse depends on context. A missed safety defect differs from a false alarm in a product test.

Choose **one-sided or two-sided** before you see the data. A one-sided test has more power in the stated direction, but it can only be justified if you truly do not care about the other direction, which is rare. Switching after seeing the results doubles your real false-positive rate.

In 2016 the American Statistical Association issued a formal statement, because p-values are so widely misused. Its main points are these:

- A p-value measures how incompatible the data is with a specified model.
- It does **not** measure the probability that the hypothesis is true.
- Decisions should not rest only on whether it passes a threshold.
- Proper inference needs full reporting and transparency.
- It does not measure the size or importance of an effect.
- By itself it is not a good measure of evidence.

So always report an **effect size**: the raw difference with units, or a standardised form such as Cohen's $d$, the difference in standard deviations. Add an interval. With 2 million users, a difference of 0.01 points can give $p < 0.001$ and be worthless. With 30 users, a large and important effect can give $p = 0.2$.

**Pitfall.** *Not significant* does not mean *no effect*. It may simply mean that the study could not tell. Report the interval, which shows which effects are still plausible.`,
          resources: [
            { title: 'ASA Statement on Statistical Significance and P-Values', url: 'https://www.amstat.org/asa/files/pdfs/p-valuestatements.pdf', type: 'article', cost: 'free', provider: 'American Statistical Association', note: 'The six principles, in the Association\'s own words.', primary: true },
            { title: 'Scientists rise up against statistical significance', url: 'https://www.nature.com/articles/d41586-019-00857-9', type: 'article', cost: 'free', provider: 'Nature', note: 'A short, widely read argument about the misuse of thresholds.' },
            ims('The chapters on hypothesis testing with randomization and on decision errors.'),
          ],
          exercises: [
            {
              slug: 'errors-in-context',
              title: 'Errors in context',
              prompt:
                'For (a) a bridge inspection flagging a structural problem, (b) a spam filter, and (c) a court trial, define the null, a Type I error and a Type II error. Which error is worse in each case, and how would you change $\\alpha$ as a result? Write down what would be lost by making the test stricter.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'large-n-trivial',
              title: 'Significant and trivial',
              prompt:
                'Simulate two groups of 1,000,000 where the true difference is 0.01 standard deviations. Compute the p-value, Cohen\'s $d$ and the interval. Now simulate 20 per group with a true difference of 0.5 standard deviations, and do the same. Which result would you act on? Explain in terms of effect size and uncertainty.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does alpha control?', answerOutline: 'The false-positive rate when the null is true, not the chance the null is true.' },
            { question: 'Why decide on one-sided or two-sided before the data?', answerOutline: 'Choosing after seeing the direction doubles the real false-positive rate.' },
            { question: 'Name two things a p-value does not tell you.', answerOutline: 'The probability that the hypothesis is true, and the size or importance of an effect.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/hypothesis-testing-and-p-values'],
        },
        {
          slug: 'power',
          title: 'Power and sample size',
          summary:
            'How likely is your study to detect a real effect? Compute power by simulation before you collect data.',
          estimatedMinutes: 75,
          objectives: [
            'Define power and name what affects it',
            'Estimate power by simulation',
            'Use a power calculation to plan a sample size',
            'Explain why low-powered studies exaggerate effects',
          ],
          concepts: [
            'Statistical power',
            'Effect size',
            'Minimum detectable effect',
            'Simulation-based power',
            'Winner\'s curse',
          ],
          explanation: `**Power** is the probability that a test rejects the null when a real effect exists. It depends on four things: the effect size, the sample size, the noise, and $\\alpha$. Before you run a study, or trust a null result, you should know what the power is.

Simulation is the clearest way to compute power. Assume an effect, generate fake studies, and count how often the test comes up significant:

\`\`\`python
from scipy import stats

rng = np.random.default_rng(207)
n = 64
a = rng.normal(0, 1, size=(5000, n))
b = rng.normal(0.5, 1, size=(5000, n))
pvals = stats.ttest_ind(a, b, axis=1).pvalue
(pvals < 0.05).mean()                # about 0.80
\`\`\`

For an effect of half a standard deviation, 20 per group gives power of only about 0.34, and 64 per group gives about 0.80, the usual target. 100 per group reaches about 0.94. statsmodels has a formula version:

\`\`\`python
from statsmodels.stats.power import TTestIndPower
TTestIndPower().solve_power(effect_size=0.5, alpha=0.05, power=0.8)   # about 63.8
\`\`\`

Simulation is worth learning because it also works for designs with no formula: clustered data, unequal groups, skewed outcomes.

Because SE shrinks like $1/\\sqrt{n}$, halving the effect you want to detect takes **four times** the data. Turning this around, the **minimum detectable effect** is the smallest effect that your sample gives a good chance of finding. If that is larger than anything plausible, the study is not worth running as designed.

**Why low power is dangerous.** You might think that a low-powered study merely misses things. Worse, when it does reach significance, it overstates the effect, since only unusually large estimates can pass the threshold. This is called the **winner's curse**. In a field full of small studies with many hypotheses, a lot of published significant findings are exaggerated or false. Ioannidis made this argument in a famous paper, and it is why replication matters.

**Pitfalls.** Do not compute power after the fact using the effect you observed. This adds no information beyond the p-value. Base power on the smallest effect that would matter to you. Base noise estimates on real pilot data if you can get it.`,
          resources: [
            { title: 'Why Most Published Research Findings Are False', url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124', type: 'article', cost: 'free', provider: 'John Ioannidis, PLOS Medicine', note: 'A short, influential paper on power, prior odds and bias.' },
            docs('statsmodels: Statistics and tests', 'https://www.statsmodels.org/stable/stats.html', 'statsmodels', 'See the power and sample size section.'),
          ],
          exercises: [
            {
              slug: 'power-curve',
              title: 'Draw a power curve',
              prompt:
                'By simulation, compute power for effect sizes 0.2, 0.5 and 0.8, and for 10, 20, 50, 100 and 200 per group. Plot one curve per effect size with labelled axes and a line at 0.8. Check your value at 0.5 and 64 per group against `solve_power`. Write a sentence advising someone who can afford only 30 per group.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'winners-curse',
              title: 'See the winner\'s curse',
              prompt:
                'Simulate 20,000 studies with a true effect of 0.2 standard deviations and 20 per group. Keep only those with $p < 0.05$ and a positive estimate. What is the mean estimated effect among those survivors, and how much bigger is it than 0.2? Repeat with 500 per group. Explain what this implies for reading a surprising, small published study.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What four things determine power?', answerOutline: 'Effect size, sample size, noise and the significance level.' },
            { question: 'To detect an effect half as large, how much more data do you need?', answerOutline: 'About four times as much.' },
            { question: 'What is the winner\'s curse?', answerOutline: 'In low-powered studies, results that reach significance overestimate the true effect, because only large estimates pass.' },
          ],
        },
        {
          slug: 'permutation-tests',
          title: 'Permutation tests',
          summary:
            'If the group labels do not matter, shuffling them should change nothing. Build a null distribution with no formula at all.',
          estimatedMinutes: 75,
          objectives: [
            'Explain the logic of a permutation test',
            'Run one with NumPy and with SciPy',
            'Choose a test statistic that suits the question',
            'State what exchangeability requires',
          ],
          concepts: [
            'Exchangeability',
            'Shuffling labels',
            'Null distribution by simulation',
            'Choice of statistic',
            'Permutation p-value',
            'Restricted permutations',
          ],
          explanation: `A permutation test turns the null hypothesis into a procedure. If the group labels have no connection to the outcome, then any reshuffling of the labels is as likely as the real one. So shuffle the labels many times, recompute your statistic each time, and see where the real value falls.

\`\`\`python
tips['tip_pct'] = tips['tip'] / tips['total_bill'] * 100
smokers = tips.loc[tips['smoker'] == 'Yes', 'tip_pct'].to_numpy()
others = tips.loc[tips['smoker'] == 'No', 'tip_pct'].to_numpy()
observed = smokers.mean() - others.mean()      # about +0.39

pool = np.concatenate([smokers, others])
rng = np.random.default_rng(207)
count = 0
for i in range(10000):
    rng.shuffle(pool)
    diff = pool[:len(smokers)].mean() - pool[len(smokers):].mean()
    count += abs(diff) >= abs(observed)
p = (count + 1) / 10001                        # about 0.63
\`\`\`

Adding 1 to the top and bottom counts the real labelling as one of the permutations, and it guarantees that $p$ is never exactly 0. A p-value of 0.63 means that shuffled labels often produce a gap this large, so this data gives no evidence of a difference in tipping percentage. A Welch test gives 0.68, a similar conclusion.

\`scipy.stats.permutation_test\` does the same job in one call.

**Why use this instead of a t-test?** It needs no normality assumption. It also works with **any statistic**: a difference in medians, a ratio, a correlation, the gap in a trimmed mean. You choose what matches the question. And it mirrors the design. In a randomised experiment, shuffling labels literally repeats the randomisation.

**What it requires.** The assumption is **exchangeability**: under the null, labels could be swapped freely. That fails if observations are grouped or ordered. For students clustered in schools, shuffle labels **within** each school. For matched pairs, flip the sign inside each pair. With a time series, shuffling destroys the autocorrelation and your p-value becomes too small.

**Pitfalls.** A permutation test checks the null of *no relationship at all*, which is a sharper claim than *equal means*. Groups with different spreads and equal means can give misleading results. And it tells you whether a difference could be chance, not why it exists. An observational difference can pass the test and still be confounded.`,
          resources: [
            docs('scipy.stats.permutation_test', 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.permutation_test.html', 'SciPy', 'Built-in permutation tests, including paired designs.'),
            ims('The chapter on hypothesis testing with randomization.'),
          ],
          exercises: [
            {
              slug: 'permute-tips',
              title: 'Permute by hand',
              prompt:
                'Reproduce the permutation test for tip percentage by smoker. Observed should be about +0.39 and $p$ about 0.63. Plot the null distribution and mark the observed value. Then repeat using the difference in **medians** as the statistic. The observed sign flips to about -0.18. What might explain this, and which statistic would you report?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'within-block-permutation',
              title: 'Permute within blocks',
              prompt:
                'In STAR kindergarten data, keep the small and regular arms with known `mathk`. Run a permutation test for the difference in means, once with free shuffling and once shuffling only within `schoolidk`. A for-loop over the schools in each iteration is fine, and 1,000 permutations are enough. Report both p-values. Why does the second one match the actual design of the experiment?',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What does shuffling the labels simulate?', answerOutline: 'The null hypothesis that the labels have no relationship with the outcome.' },
            { question: 'Why add 1 to the numerator and denominator?', answerOutline: 'The real labelling is itself one permutation, and this keeps the p-value from being exactly 0.' },
            { question: 'When are simple permutations invalid?', answerOutline: 'When observations are not exchangeable, as with clusters, pairs or time series.' },
          ],
        },
        {
          slug: 't-and-chi-square-tests',
          title: 't and chi-square tests',
          summary:
            'The classic tests: compare means with Welch\'s t, and compare counts with chi-square.',
          estimatedMinutes: 75,
          objectives: [
            'Run and report a Welch t-test',
            'Use a paired test where appropriate',
            'Run a chi-square test on a contingency table',
            'Check the conditions of each test',
          ],
          concepts: [
            't statistic',
            'Welch t-test',
            'Paired t-test',
            'Chi-square test of independence',
            'Expected counts',
            'Degrees of freedom',
            'Standardised residuals',
          ],
          explanation: `Formula-based tests are fast and are understood everywhere, so you will meet them often.

**Comparing two means.** The t statistic is the estimated difference in units of its standard error:

$$ t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{s_1^2/n_1 + s_2^2/n_2}} $$

Use **Welch's** version, which does not assume equal variances, by passing \`equal_var=False\`.

\`\`\`python
stats.ttest_ind(adelie, chinstrap, equal_var=False)     # p about 0.59
\`\`\`

Adelie and Chinstrap masses differ by about 32 g on average, and $p \\approx 0.59$, so nothing here says they differ. Adelie against Gentoo gives $p$ near $10^{-64}$. When the same units are measured twice, use the **paired** test, \`stats.ttest_rel\`, which works on the differences and removes variation between units. Treating paired data as independent wastes power.

**Comparing counts.** For two categorical variables, the **chi-square test of independence** compares observed counts with those expected if the variables were unrelated. The expected count in a cell is (row total × column total) / grand total, and

$$ \\chi^2 = \\sum \\frac{(O - E)^2}{E} $$

The degrees of freedom are $(r-1)(c-1)$.

\`\`\`python
table = pd.crosstab(tips['smoker'], tips['day'])
chi2, p, dof, expected = stats.chi2_contingency(table)   # 25.8, about 0.00001, 3
\`\`\`

Smoking and day are clearly related here. But that only says *something* differs, not what. Look at the **standardised residuals**, $(O - E)/\\sqrt{E}$, to see which cells drive the result. Here, Friday stands out: 15 of 19 parties had a smoker.

**Conditions.** The t-test needs independent observations and means that are near normal, which is usually fine for moderate $n$ unless there are extreme outliers. The chi-square test needs independent observations, and expected counts of about 5 or more. Check \`expected\`, and not the observed counts. If cells are too small, combine categories or use a permutation test.

**Pitfalls.** Run these only on counts, never on percentages. A chi-square test's p-value on 100,000 rows will flag trivial differences, so report an effect size. The classic pitfall is independence: applying these to polls from the same race or to repeated measurements gives p-values that are far too small.`,
          resources: [
            ims('The chapters on inference for comparing two means and for two-way tables.'),
            docs('scipy.stats.chi2_contingency', 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chi2_contingency.html', 'SciPy', 'Returns the statistic, p-value, degrees of freedom and expected counts.'),
          ],
          exercises: [
            {
              slug: 'welch-three-comparisons',
              title: 'Three Welch comparisons',
              prompt:
                'Run Welch t-tests on `body_mass_g` for Adelie against Chinstrap, Adelie against Gentoo, and males against females within Adelie. Report for each the difference with units, a 95% interval and the p-value. Then compare your Adelie against Chinstrap p-value with a permutation test. They should tell the same story, about 0.59 to 0.61.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'chi-square-by-hand',
              title: 'Chi-square by hand',
              prompt:
                'Compute by hand the expected counts for `smoker` by `day` in the tips data, using the totals. Compute $\\chi^2$ and confirm 25.8 with 3 degrees of freedom. Make a table of standardised residuals. Which cell contributes most? Write a one-sentence conclusion, and say why this does not show that Fridays cause smoking.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'paired-versus-unpaired',
              title: 'Pairing matters',
              prompt:
                'Simulate 30 people, each with a personal baseline drawn with standard deviation 10, measured before and after a treatment that adds 2 points, with measurement noise of standard deviation 3. Test the effect with an unpaired and a paired t-test. Repeat 2,000 times and estimate the power of each. Explain the large difference.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why prefer Welch\'s t-test as a default?', answerOutline: 'It does not assume equal variances, and it loses little when they are equal.' },
            { question: 'How is an expected count computed?', answerOutline: 'Row total times column total, divided by the grand total.' },
            { question: 'What does a significant chi-square not tell you?', answerOutline: 'Which cells differ, how large the difference is, or why it exists.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/chi-square-and-goodness-of-fit'],
        },
        {
          slug: 'multiple-comparisons',
          title: 'Multiple comparisons',
          summary:
            'Run enough tests and something will look significant. Control false discoveries, and watch out for the forking paths you never counted.',
          estimatedMinutes: 75,
          objectives: [
            'Compute the chance of a false positive across many tests',
            'Apply Bonferroni and Benjamini-Hochberg corrections',
            'Tell family-wise error from false discovery rate',
            'Recognise p-hacking and the garden of forking paths',
          ],
          concepts: [
            'Family of tests',
            'Family-wise error rate',
            'Bonferroni correction',
            'False discovery rate',
            'Benjamini-Hochberg',
            'p-hacking',
            'Garden of forking paths',
            'Holdout confirmation',
          ],
          explanation: `A test with $\\alpha = 0.05$ gives a false positive 1 time in 20 when nothing is going on. Run 20 independent tests of true nulls, and the chance of at least one false positive is $1 - 0.95^{20} \\approx 0.64$. Run 1,000, and about 50 will pass. In one simulation here, exactly 50 of 1,000 true nulls reached $p < 0.05$, and each would have made a fine headline.

There are two common ways to control this.

**Bonferroni** keeps the **family-wise error rate**, the chance of *any* false positive, below $\\alpha$, by testing each hypothesis at $\\alpha/m$. It is simple and strict, and it loses power when $m$ is large.

**Benjamini-Hochberg** controls the **false discovery rate**, the expected share of false positives among the results you declare. Sort the p-values, find the largest $k$ with $p_{(k)} \\le \\frac{k}{m}\\alpha$, and reject the $k$ smallest. It is the usual choice when screening many things, where some false leads are acceptable.

\`\`\`python
from statsmodels.stats.multitest import multipletests

reject, adjusted, _, _ = multipletests(pvals, alpha=0.05, method='fdr_bh')
\`\`\`

The harder problem is the tests you never count. **p-hacking** means trying analyses until one reaches significance: dropping outliers, adding a covariate, splitting subgroups, changing an outcome. Even without any bad intent, an analyst makes many reasonable choices, each depending on what the data seems to show. Gelman and Loken call this the **garden of forking paths**. Only one analysis was run, but others would have been run if the data had looked different, so the p-value is not what it claims.

**Defences.**

- Write a plan first, and label each result as planned or exploratory.
- Report the number of tests you ran, not just the winners.
- Correct within each family of related tests.
- Keep a holdout: explore on part of the data and confirm on the rest.
- Replicate on new data, which is the strongest defence.

**Pitfalls.** There is no universal rule for what counts as a family, so state your choice. Corrections cannot rescue a selective report. A subgroup finding after a null overall result is the classic false discovery, so treat it as a hypothesis for future testing.`,
          resources: [
            docs('statsmodels.stats.multitest.multipletests', 'https://www.statsmodels.org/stable/generated/statsmodels.stats.multitest.multipletests.html', 'statsmodels', 'Bonferroni, Benjamini-Hochberg and other corrections.'),
            { title: 'Why Most Published Research Findings Are False', url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124', type: 'article', cost: 'free', provider: 'John Ioannidis, PLOS Medicine', note: 'Links multiple testing to false findings in the research literature.' },
          ],
          exercises: [
            {
              slug: 'null-screen',
              title: 'A screen of pure noise',
              prompt:
                'Simulate 1,000 two-sample t-tests of pure noise with 30 per group. Count how many have $p < 0.05$, expecting about 50. Apply Bonferroni and Benjamini-Hochberg, and count the rejections, which should be at or near 0. Now give 100 of the 1,000 tests a true effect of 0.8 standard deviations. Compare how many true and false discoveries each method keeps.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'forking-paths',
              title: 'Walk the forking paths',
              prompt:
                'Using pure-noise data with one outcome and 10 random yes/no covariates on 100 rows, write a function that tries the overall comparison and every subgroup split, and returns the smallest p-value. Repeat 2,000 times. How often does that smallest p fall below 0.05? Explain what this says about an analysis that reports only what worked.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'holdout-confirm',
              title: 'Explore, then confirm',
              prompt:
                'Split the bridge data at random into exploration and confirmation halves, with a seed. In the first half, test poor-rating differences among all nine highway districts against the rest, and pick the most striking. Test only that one in the second half. Did it hold? Write up what a reader should conclude.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does the false discovery rate control?', answerOutline: 'The expected share of false positives among the results you declare significant.' },
            { question: 'Compare Bonferroni and Benjamini-Hochberg.', answerOutline: 'Bonferroni controls any false positive and is stricter. BH controls the share of false discoveries and keeps more power.' },
            { question: 'What is the garden of forking paths?', answerOutline: 'Data-dependent analysis choices that make a p-value invalid, even though only one analysis was run.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/model-selection-and-multiple-comparisons'],
        },
      ],
    },
    {
      slug: 'regression',
      title: 'Regression',
      description:
        'Model an outcome with many predictors: multiple linear regression, diagnostics, categorical predictors and interactions, and logistic regression, always with careful interpretation of coefficients.',
      lessons: [
        {
          slug: 'multiple-linear-regression',
          title: 'Multiple linear regression',
          summary:
            'Fit several predictors at once, read each coefficient as a comparison holding the others fixed, and see how that changes a story.',
          estimatedMinutes: 90,
          objectives: [
            'Fit a multiple regression with statsmodels',
            'Interpret a coefficient as a partial comparison',
            'Read a summary table: estimates, standard errors, $R^2$',
            'Explain how adjusting for a variable can change an estimate',
          ],
          concepts: [
            'Multiple regression',
            'Formula interface',
            'Partial coefficient',
            'Adjustment',
            'Standard error and interval of a coefficient',
            '$R^2$ and adjusted $R^2$',
            'Omitted variable bias',
          ],
          explanation: `Multiple regression extends a line to several predictors:

$$ \\hat{y} = b_0 + b_1 x_1 + b_2 x_2 + \\dots + b_p x_p $$

Each $b_j$ answers a specific question: *comparing units that differ by one in $x_j$ and match on the other predictors, how much does the prediction differ?* That qualifier is the point of the method.

**statsmodels** reports coefficients with uncertainty, and its formula interface reads almost like a sentence. Install it with \`.venv\\Scripts\\python -m pip install statsmodels\`.

\`\`\`python
import statsmodels.formula.api as smf

url = 'https://vincentarelbundock.github.io/Rdatasets/csv/carData/Salaries.csv'
sal = pd.read_csv(url).rename(columns={'yrs.since.phd': 'yrs_since_phd',
                                       'yrs.service': 'yrs_service'})

simple = smf.ols('salary ~ C(sex)', data=sal).fit()
full = smf.ols('salary ~ C(sex) + C(rank) + C(discipline) + yrs_since_phd + yrs_service',
               data=sal).fit()
full.summary()
\`\`\`

These are 2008-09 salaries of US professors. Alone, the male coefficient is about +14,088 dollars with $p \\approx 0.006$. After adjusting for rank, discipline and experience, it falls to about +4,783 dollars with $p \\approx 0.22$, and $R^2$ rises to about 0.455.

How to read that matters. It does **not** prove that there is no pay discrimination. Rank is itself an outcome, and if promotion is unfair, adjusting for rank hides part of the effect. A variable on the path from cause to outcome is a **mediator**, and adjusting for it answers a different question. Adjustment can reduce confounding, but only if you adjust for the right things, and the choice comes from reasoning about the world, not from the regression.

Leaving out a confounder gives **omitted variable bias**. This is why observational coefficients should not be read as causal effects, unless a strong design supports it.

$R^2$ is the share of variance explained, and it never falls when you add a predictor, even a useless one. **Adjusted** $R^2$ penalises size, and held-out performance is better still.

**Pitfalls.** Coefficients depend on what else is in the model. Their sizes depend on units, so a large number need not be an important one. Do not extrapolate beyond the data. Multiple regression shows comparisons, not what would happen if you intervened.`,
          resources: [
            islp('Chapter 3, Linear Regression.'),
            docs('statsmodels: Formulas', 'https://www.statsmodels.org/stable/example_formulas.html', 'statsmodels', 'Fitting models using formula strings.'),
            ims('The chapter on linear regression with multiple predictors.'),
          ],
          exercises: [
            {
              slug: 'salaries-model',
              title: 'Adjust and interpret',
              prompt:
                'Fit `salary ~ yrs_since_phd`, where the slope should be about 985. Add `yrs_service`: the first slope rises to about 1,563, and the second is about -629. In the full model they are about 535 and -490. Explain why a coefficient can move so much depending on what else is in the model. Fit the two sex models and confirm the values in this lesson. Write a paragraph explaining what the coefficient on sex means before and after adjustment, and why rank might be a mediator.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'omitted-variable',
              title: 'Omitted variable bias by simulation',
              prompt:
                'Simulate 5,000 rows where $z$ is normal, $x$ is $z$ plus noise, and $y$ is $2x + 3z$ plus noise. Fit $y \\sim x$ and $y \\sim x + z$. Report each coefficient on $x$ and compare with the true 2. Now make $z$ a result of $x$ instead, and show how adjusting for it gives the wrong total effect. What does this say about choosing what to control for?',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'log-wage-model',
              title: 'A model of wages',
              prompt:
                'Load `AER/CPS1985.csv` from Rdatasets (534 rows). Fit `np.log(wage) ~ education + experience + C(gender)`. The education coefficient should be about 0.098, and the male coefficient about 0.256. Using the fact that a small log difference is close to a percentage difference, interpret both in plain language. What would you need to add to make any causal claim?',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'How do you read a coefficient in a multiple regression?', answerOutline: 'The predicted difference in y per unit of that predictor, comparing units that match on the other predictors.' },
            { question: 'Why is adjusting for a mediator a problem?', answerOutline: 'It removes part of the effect you may be trying to measure, so you answer a different question.' },
            { question: 'Why can $R^2$ not be used to choose predictors?', answerOutline: 'It never decreases with more predictors. Use adjusted $R^2$ or held-out error.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
        },
        {
          slug: 'regression-diagnostics',
          title: 'Regression diagnostics',
          summary:
            'Check the assumptions behind a fit with residual plots, influence measures and collinearity checks.',
          estimatedMinutes: 90,
          objectives: [
            'List the assumptions of linear regression',
            'Use residual plots to spot non-linearity and unequal spread',
            'Find influential points',
            'Detect collinearity, and apply a transformation or robust errors',
          ],
          concepts: [
            'Linearity, independence, equal variance, normal errors',
            'Residuals versus fitted',
            'Heteroscedasticity',
            'Robust standard errors',
            'Leverage and Cook\'s distance',
            'Collinearity and VIF',
            'Log transformation',
          ],
          explanation: `Regression will always give you numbers. Diagnostics tell you whether to believe them. The assumptions, in order of importance, are: the mean of $y$ is **linear** in the predictors, errors are **independent**, errors have **equal variance**, and errors are roughly **normal**.

**Plot residuals against fitted values.**

\`\`\`python
import matplotlib.pyplot as plt

plt.scatter(full.fittedvalues, full.resid, alpha=0.4)
plt.axhline(0)
plt.xlabel('Fitted salary'); plt.ylabel('Residual')
\`\`\`

You want a shapeless cloud. A curve means a missing non-linear term. A fan that widens with the fitted value means **heteroscedasticity**, or unequal spread. It does not bias coefficients, but it makes standard errors wrong. Fix it with a transformation, or ask for robust standard errors: \`smf.ols(...).fit(cov_type='HC3')\`.

**Log transforms** often fix both curves and fans for positive, right-skewed outcomes such as wages, prices and traffic. A coefficient $b$ on $\\log y$ then means roughly a $100b$% difference in $y$ per unit, for small $b$.

**A Q-Q plot of residuals** checks normality. For large samples this matters little for coefficients, and it matters mostly for prediction intervals.

**Influence.** A point with an unusual $x$ has **leverage**, and if it also sits off the line it can drag the fit. **Cook's distance** measures how much all fitted values change if a row is dropped:

\`\`\`python
infl = full.get_influence()
cooks = infl.cooks_distance[0]
\`\`\`

Investigate the largest. Fit with and without them, and report both. Delete only with a reason, such as a recording error.

**Collinearity.** When predictors move together, the model cannot separate them, so standard errors grow and signs can flip. In the salary data, years since PhD and years of service correlate at 0.91, which is why one coefficient turned negative. The **variance inflation factor** measures this, and values above about 5 to 10 are a warning:

\`\`\`python
from statsmodels.stats.outliers_influence import variance_inflation_factor
\`\`\`

Collinearity does not hurt predictions. It hurts interpretation.

**Independence** is the assumption no plot reliably shows, and it is the most dangerous to violate. Clustered rows need clustered standard errors or a design that respects them.

**Pitfalls.** Do not rely on a p-value test of assumptions. Plots are more informative, and on big data such tests reject trivially. Do not delete points until the fit looks nice.`,
          resources: [
            islp('Section 3.3.3, Potential Problems, in Chapter 3.'),
            docs('statsmodels: Linear Regression', 'https://www.statsmodels.org/stable/regression.html', 'statsmodels', 'Reference, including robust covariance options.'),
          ],
          exercises: [
            {
              slug: 'residuals-of-salary',
              title: 'Diagnose the salary model',
              prompt:
                'For the full salary model, plot residuals against fitted values and make a Q-Q plot of residuals. Is the spread equal across ranks? Refit with `cov_type=\'HC3\'` and compare standard errors. Find the 3 largest Cook\'s distances, look at those rows, refit without them, and report what changed.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'vif-salary',
              title: 'Measure the collinearity',
              prompt:
                'Compute the correlation between `yrs_since_phd` and `yrs_service`, which should be 0.91. Compute a VIF for each in the full model. Then fit the model with each one dropped in turn, and compare the remaining coefficient with its value in the full model. What can and can you not say about years of experience here?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'anscombe-diagnostics',
              title: 'Diagnose Anscombe',
              prompt:
                'For the four Anscombe datasets, fit a line to each, confirming the nearly identical coefficients and $R^2$. Plot the residuals and compute Cook\'s distance. Write down for each dataset what the diagnostic shows, and what model or action you would use instead.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'What does a fan shape in a residual plot mean, and what can you do?', answerOutline: 'Unequal variance. Transform the outcome or use robust standard errors.' },
            { question: 'What does collinearity harm, and what not?', answerOutline: 'It inflates standard errors and makes coefficients unstable, but it does not harm prediction much.' },
            { question: 'Which assumption is most dangerous, and hardest to see in a plot?', answerOutline: 'Independence of errors, as with clusters or time series.' },
          ],
        },
        {
          slug: 'interactions-and-categorical-predictors',
          title: 'Categorical predictors and interactions',
          summary:
            'Use categories in a regression, and let the effect of one variable depend on another.',
          estimatedMinutes: 75,
          objectives: [
            'Interpret dummy variables relative to a baseline',
            'Fit and interpret an interaction',
            'Centre a predictor so that main effects are meaningful',
            'Plot an interaction',
          ],
          concepts: [
            'Dummy coding',
            'Reference level',
            'Interaction term',
            'Main effect in the presence of an interaction',
            'Centring',
            'Parallel and non-parallel lines',
          ],
          explanation: `Categories enter a regression as **dummy variables**. A variable with $k$ levels becomes $k-1$ columns of 0 and 1, and the level left out is the **reference**. In \`C(rank)\` above, the reference was alphabetical, \`AssocProf\`, so the \`Prof\` coefficient of about +32,158 dollars compares full professors with associate professors, holding the rest fixed. Change the reference to change the comparisons, with \`C(rank, Treatment('AsstProf'))\`. The model itself is the same.

An additive model assumes each predictor's effect is the same for everyone, which gives parallel lines. An **interaction** relaxes that. It lets the slope of one variable depend on another:

$$ \\hat{y} = b_0 + b_1 x + b_2 g + b_3 (x \\times g) $$

In a formula, \`*\` means both main effects plus the interaction:

\`\`\`python
m = smf.ols('salary ~ yrs_since_phd * C(discipline)', data=sal).fit()
m.params
\`\`\`

For discipline A (the reference), the slope is about 934 dollars per year. For discipline B, add the interaction of about 365, which gives about 1,299. The interaction's p-value is about 0.08, so there is suggestive, not strong, evidence that the slopes differ. Report that uncertainty, and draw it.

**Interpreting main effects.** With an interaction in the model, $b_2$ is the gap between groups **when $x = 0$**, here at zero years since PhD, which may be off in the corner of the data. **Centring** fixes this. Subtract a meaningful value, such as the mean:

\`\`\`python
sal['yrs_c'] = sal['yrs_since_phd'] - sal['yrs_since_phd'].mean()
\`\`\`

Now the group coefficient compares groups at average experience, and the interaction does not change.

**Always plot an interaction.** Draw one fitted line per group over the data. seaborn's \`lmplot\` with \`hue\` makes that quick. A table of coefficients is hard to read, but non-parallel lines are obvious.

**Pitfalls.** Interactions need far more data than main effects, so detecting one takes about four times the sample of a main effect of the same size, and often more. Searching over many interactions is a forking path. Never fit an interaction without its main effects unless you have a strong reason. Do not read a coefficient from a model with interactions as *the* effect. There is no single effect, and that is exactly what the interaction says.`,
          resources: [
            islp('Section 3.3 on qualitative predictors and interaction terms.'),
            ims('The chapter on linear regression with multiple predictors, on indicator variables.'),
          ],
          exercises: [
            {
              slug: 'change-the-reference',
              title: 'Change the reference',
              prompt:
                'Fit `salary ~ C(rank)` with the default reference, then with `AsstProf` as the reference. Show that fitted values for each rank are identical, and that they match the group means from `groupby`. Explain what changes and what does not when the reference changes.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'plot-an-interaction',
              title: 'Plot and interpret an interaction',
              prompt:
                'Fit `body_mass_g ~ flipper_length_mm * C(species)` on the penguins data, with flipper length centred. Report the slope for each species with a 95% interval. Draw the data with one fitted line per species. Is there good evidence that slopes differ? Explain what the species coefficient means after centring.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'interaction-power',
              title: 'Interactions need more data',
              prompt:
                'Simulate a 2-by-2 design with 100 rows per cell and noise of standard deviation 1. Give each main effect a size of 0.4, and add an interaction of the same size. Over 2,000 simulations, estimate the power to detect the main effect of the first factor and to detect the interaction, with a regression using effect coding of -0.5 and +0.5. Which is lower, and by how much?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What does a dummy coefficient compare?', answerOutline: 'That level against the reference level, holding the other predictors fixed.' },
            { question: 'With an interaction in the model, what does the group coefficient mean?', answerOutline: 'The group gap when the other variable is 0, which is why centring helps.' },
            { question: 'Why should you plot interactions?', answerOutline: 'Non-parallel lines are much easier to read than coefficient tables, and a plot shows where the data lies.' },
          ],
        },
        {
          slug: 'logistic-regression',
          title: 'Logistic regression',
          summary:
            'Model a yes/no outcome with log-odds, read odds ratios, and see how a coefficient can reverse after adjustment.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why a straight line is a poor model for probabilities',
            'Fit a logistic regression with statsmodels',
            'Convert coefficients to odds ratios and to probabilities',
            'Interpret an adjusted coefficient that reverses sign',
          ],
          concepts: [
            'Odds and log-odds',
            'Logistic function',
            'Maximum likelihood fit',
            'Odds ratio',
            'Predicted probability',
            'Confounding in logistic regression',
          ],
          explanation: `When the outcome is yes or no, a straight line can predict probabilities below 0 or above 1. **Logistic regression** instead models the **log-odds** as a line, which keeps probabilities between 0 and 1:

$$ \\log\\frac{p}{1-p} = b_0 + b_1 x_1 + \\dots + b_k x_k, \\qquad p = \\frac{1}{1 + e^{-(b_0 + b_1 x_1 + \\dots)}} $$

Odds are $p/(1-p)$: a probability of 0.75 is odds of 3 to 1. The model is fitted by maximum likelihood, the idea from Module 5.

\`\`\`python
dd = pd.read_csv('https://vincentarelbundock.github.io/Rdatasets/csv/ISLR/Default.csv')
dd['y'] = (dd['default'] == 'Yes').astype(int)
dd['stu'] = (dd['student'] == 'Yes').astype(int)

m1 = smf.logit('y ~ stu', data=dd).fit()
m2 = smf.logit('y ~ stu + balance', data=dd).fit()
\`\`\`

**Interpreting coefficients.** A coefficient $b$ changes the log-odds by $b$ per unit of $x$, so it **multiplies the odds** by $e^b$, the **odds ratio**. In \`m2\`, balance has $b \\approx 0.00574$, so each extra 100 dollars of balance multiplies the odds of default by $e^{0.574} \\approx 1.78$.

Odds ratios are not risk ratios, so convert to probabilities for your reader. Use \`m2.predict\` on specific cases: at a balance of 1,500, the model gives a default probability of about 0.105 for a non-student and 0.054 for a student.

**A reversal.** In \`m1\`, students look **riskier**, with an odds ratio of about 1.50. In \`m2\`, with balance held fixed, students are **less** risky, with an odds ratio of about 0.49. Both are correct. Students carry higher balances on average, 988 against 772 dollars, and balance drives default. So a student is riskier if you know nothing else, but less risky than a non-student with the same balance. This is Simpson's paradox again, in model form, and a lender and a student might want different answers.

Note that a logistic curve changes fastest near $p = 0.5$, so a fixed coefficient implies a different change in probability at different places.

**Pitfalls.** Reading $b$ directly as a change in probability is the most common mistake. If a predictor separates classes perfectly, estimates blow up. With a rare outcome, you need enough events: a rough guide is at least 10 events per predictor. Accuracy alone is a poor measure, which the next module addresses.`,
          resources: [
            islp('Chapter 4, sections on logistic regression. The credit default example is the same.'),
            docs('statsmodels: Regression with Discrete Dependent Variable', 'https://www.statsmodels.org/stable/discretemod.html', 'statsmodels', 'Reference for Logit.'),
            ims('The chapter on logistic regression.'),
          ],
          exercises: [
            {
              slug: 'default-logit',
              title: 'Reverse a coefficient',
              prompt:
                'Fit the two models in this lesson, and confirm the odds ratios for students of about 1.50 and 0.49 and the odds ratio of about 1.78 per 100 dollars of balance. Plot predicted default probability against balance, with one curve for students and one for non-students, and overlay the two overall default rates. Use this plot to explain the reversal to someone with no statistics background.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'odds-by-hand',
              title: 'Odds by hand',
              prompt:
                'From `m2`, with intercept about -10.75 and the coefficients above, compute by hand the predicted probability of default for a non-student at balances of 1,000, 1,500 and 2,000. The value at 1,500 should be about 0.105. Compute how much the probability changes per 100 dollars at each balance. Explain why a constant odds ratio is not a constant change in probability.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does an odds ratio of 1.78 per 100 dollars mean?', answerOutline: 'Each extra 100 dollars multiplies the odds of the outcome by 1.78. It is not a 78% rise in probability.' },
            { question: 'Why do students look riskier overall but safer after adjusting for balance?', answerOutline: 'Students carry higher balances, and balance drives default. Holding balance fixed removes that confounding.' },
            { question: 'How is a logistic model fitted?', answerOutline: 'By maximum likelihood, not least squares.' },
          ],
          relatedLessons: ['machine-learning/linear-models/logistic-regression'],
        },
      ],
    },
    {
      slug: 'classification-and-high-dimensional-data',
      title: 'Classification and High-Dimensional Data',
      description:
        'Build and validate classifiers, choose a threshold on purpose, control many features with regularisation and PCA, and report the result so that someone can trust it.',
      lessons: [
        {
          slug: 'classifiers-and-cross-validation',
          title: 'Classifiers and cross-validation',
          summary:
            'Beat a baseline, estimate performance with k-fold cross-validation, and keep every preprocessing step inside a pipeline.',
          estimatedMinutes: 90,
          objectives: [
            'Compare a classifier with a sensible baseline',
            'Use k-fold cross-validation with stratification',
            'Build a scikit-learn pipeline that prevents leakage',
            'Choose a split that matches how the model will be used',
          ],
          concepts: [
            'Baseline classifier',
            'k-nearest neighbours',
            'k-fold cross-validation',
            'Stratified folds',
            'Pipeline',
            'Preprocessing leakage',
            'Group and time splits',
          ],
          explanation: `A classifier predicts a category. Before you admire one, compare it with a **baseline**. In the credit data, only 3.33% of people default, so predicting *no default* for everyone is 96.67% accurate and entirely useless. A logistic model with balance, income and student status scores about 97.35% in cross-validation, a much smaller gain than the headline suggests.

**k-nearest neighbours** is a simple alternative: to classify a point, find the $k$ closest training points and take a vote. It uses distance, so features must be scaled.

A single train/test split is noisy. **k-fold cross-validation** splits the data into $k$ parts, trains on $k-1$ and tests on the remaining one, and rotates, so that every row is tested once. The average is a steadier estimate, and the spread shows how stable it is. Use **stratified** folds for classes of very different sizes, so that each fold has the same share of positives.

\`\`\`python
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score

X = dd[['balance', 'income', 'stu']]
y = dd['y']
model = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))
cv = StratifiedKFold(5, shuffle=True, random_state=207)
scores = cross_val_score(model, X, y, cv=cv, scoring='roc_auc')
scores.mean(), scores.std()        # mean about 0.949
\`\`\`

The **pipeline** matters. If you scale the whole dataset before splitting, information from test rows leaks into training. Inside a pipeline, the scaler is refit on each training fold. Any step that learns from data, such as scaling, imputing or selecting features, belongs inside the pipeline.

**Match the split to the use.** Random folds assume that future data looks like the past and that rows are independent. If rows are grouped, such as bridges in one county, use \`GroupKFold\`. If you will predict the future, train on the past and test on later data, because a random split lets the model peek ahead. Forward-in-time tests are usually less flattering, and more honest.

**Pitfalls.** If you tune settings using the same cross-validation you report, the score is optimistic. Keep a final test set that you touch once. Do not choose features by looking at the full dataset. A result of near-perfect accuracy should make you suspect leakage before you celebrate.`,
          resources: [
            islp('Chapter 5, Resampling Methods, section on cross-validation.'),
            docs('Cross-validation', 'https://scikit-learn.org/stable/modules/cross_validation.html', 'scikit-learn', 'Strategies, including stratified, group and time splits.'),
            docs('Pipelines and composite estimators', 'https://scikit-learn.org/stable/modules/compose.html', 'scikit-learn', 'How pipelines keep preprocessing inside each fold.'),
          ],
          exercises: [
            {
              slug: 'beat-the-baseline',
              title: 'Beat the baseline',
              prompt:
                'On the credit data, use `cross_val_score` to compare accuracy and AUC for: a `DummyClassifier`, logistic regression, and k-nearest neighbours with $k$ of 5 and 50, each in a pipeline with scaling. Expect the logistic accuracy to be near 0.9735 and the baseline 0.9667. Report the mean and spread across folds. Which metric reveals more about what is going on?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'leakage-demo',
              title: 'Measure the leak',
              prompt:
                'Generate 200 rows with 2,000 random features and a random label, so that no model can truly do better than 0.5. Select the 20 features most correlated with the label on the **whole** dataset, then cross-validate logistic regression on them. Then repeat with the selection inside a pipeline, using `SelectKBest`. Report the two accuracies, and explain the gap.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'group-split',
              title: 'Does the split matter?',
              prompt:
                'Using the 2019 bridge data with a poor-rating label, cross-validate a logistic model on age and traffic with plain `StratifiedKFold` and with `GroupKFold` by county. Compare the AUCs. Which is the right estimate if the model will be applied to a county it has not seen? What about a new year?',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why compare with a baseline?', answerOutline: 'With rare classes, a trivial rule can score high, so accuracy alone says little.' },
            { question: 'Why must scaling sit inside a pipeline?', answerOutline: 'So it is learned only from training folds, and test data cannot leak in.' },
            { question: 'When should you not use random folds?', answerOutline: 'With grouped or time-ordered data, where random splits give optimistic results.' },
          ],
          relatedLessons: [
            'machine-learning/foundations-and-workflow/generalization-and-validation',
            'machine-learning/ml-engineering/pipelines-and-leakage',
          ],
        },
        {
          slug: 'roc-curves-and-thresholds',
          title: 'ROC curves and thresholds',
          summary:
            'A classifier gives scores, and you choose the cut-off. Read confusion matrices, precision and recall, ROC curves and calibration.',
          estimatedMinutes: 90,
          objectives: [
            'Build a confusion matrix and compute precision and recall',
            'Choose a threshold from the costs of each error',
            'Draw and interpret an ROC curve and its AUC',
            'Check calibration',
          ],
          concepts: [
            'Confusion matrix',
            'Precision and recall',
            'False positive rate',
            'Threshold',
            'ROC curve',
            'AUC',
            'Calibration',
            'Top-k evaluation',
          ],
          explanation: `Most classifiers give a score, usually a probability, and you turn it into a decision with a **threshold**. The default of 0.5 is rarely what you want. A **confusion matrix** counts the four outcomes. For the credit model, in-sample:

| Threshold | True positives | False negatives | False positives |
|---|---|---|---|
| 0.5 | 105 | 228 | 39 |
| 0.2 | 202 | 131 | 276 |

At 0.5, the model catches only 105 of 333 defaulters. Lowering the threshold to 0.2 nearly doubles that, at the cost of about seven times as many false alarms. Which is better depends on the costs, and that is a business or policy decision, not a statistical one.

The key rates are these:

$$ \\text{Precision} = \\frac{TP}{TP + FP}, \\quad \\text{Recall} = \\frac{TP}{TP + FN}, \\quad \\text{FPR} = \\frac{FP}{FP + TN} $$

Precision asks *when we flag, how often are we right?* Recall asks *of the real cases, how many did we catch?*

An **ROC curve** plots recall against the false positive rate at every threshold. The **AUC**, the area under it, equals the chance that a random positive gets a higher score than a random negative. So 0.5 is random and 1 is perfect. It measures ranking, without committing to a threshold.

\`\`\`python
from sklearn.metrics import RocCurveDisplay, confusion_matrix, roc_auc_score

model.fit(X_train, y_train)
scores = model.predict_proba(X_test)[:, 1]
roc_auc_score(y_test, scores)
RocCurveDisplay.from_estimator(model, X_test, y_test)
\`\`\`

When positives are rare, AUC can look strong while precision is poor. So also report results that matter for action. If inspectors can visit only 10% of sites, ask what share of problems falls in the **top 10%** of scores.

**Calibration** asks whether scores mean what they say: of cases given 0.2, are about 20% positive? Group predictions into bins, and compare predicted and actual rates. A model can rank well and be badly calibrated. This often happens when a model is applied to a period with a different base rate.

**Pitfalls.** Do not pick the threshold on the test set. Metrics depend on the base rate, so a precision from one population does not transfer to another. Error rates can differ sharply across groups, even when overall numbers look fine, so check that before anyone relies on a model.`,
          resources: [
            docs('Metrics and scoring', 'https://scikit-learn.org/stable/modules/model_evaluation.html', 'scikit-learn', 'Definitions of every classification metric.'),
            docs('ROC example', 'https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html', 'scikit-learn', 'A worked ROC curve.'),
            islp('Chapter 4, the section on assessing classification on the default data.'),
          ],
          exercises: [
            {
              slug: 'threshold-table',
              title: 'Choose a threshold',
              prompt:
                'Fit the credit model in a pipeline on all rows, and reproduce the table in this lesson at thresholds 0.5 and 0.2. Extend it to 0.1 and 0.05, with precision and recall. Suppose a missed default costs 10 times as much as a false alarm. Which threshold minimises total cost? How does the answer change if the ratio is 2 to 1?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'auc-as-probability',
              title: 'AUC as a probability',
              prompt:
                'On held-out credit data, compute `roc_auc_score`. Then estimate the same number directly: draw 100,000 random pairs of one defaulter and one non-defaulter, and count how often the defaulter has the higher score. They should closely agree. Then use your result to explain, in one sentence, what an AUC of 0.95 means.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'calibration-check',
              title: 'Check calibration',
              prompt:
                'Split the credit data 70/30 with a seed, fit the model, and bin test predictions into ten groups by predicted probability. Plot mean predicted against actual default rate. Now multiply the training positives by 10 by duplicating those rows and refit. What happens to calibration, and to AUC? Why?',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'Give the definitions of precision and recall in words.', answerOutline: 'Precision: of those flagged, the share truly positive. Recall: of the true positives, the share flagged.' },
            { question: 'What does an AUC of 0.8 mean?', answerOutline: 'A random positive outranks a random negative 80% of the time.' },
            { question: 'Who should choose a threshold?', answerOutline: 'Those who understand the costs of each error. It is a decision informed by the model, not given by it.' },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/classification-metrics-and-curves'],
        },
        {
          slug: 'regularisation',
          title: 'Regularisation',
          summary:
            'With many features, fits get unstable. Penalties shrink coefficients, reduce variance, and can select features.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the trade-off regularisation makes',
            'Compare ridge and lasso penalties',
            'Fit a penalised logistic regression with a sensible `C`',
            'Choose penalty strength by cross-validation',
          ],
          concepts: [
            'Overfitting with many features',
            'Bias-variance trade-off',
            'Ridge (L2)',
            'Lasso (L1)',
            'Penalty strength and C',
            'Why features must be scaled',
            'Unstable selection',
          ],
          explanation: `With many predictors, plain regression fits noise, and its coefficients become unstable, especially when features are correlated. **Regularisation** adds a cost for large coefficients:

$$ \\text{minimise} \\quad \\text{loss} + \\lambda \\sum_j |b_j|^q $$

With $q=2$ you get **ridge**, and with $q=1$ you get **lasso**. This deliberately adds a little bias to cut variance, the trade-off you met with MSE in Module 5.

**Ridge** shrinks all coefficients towards zero and keeps every feature. It handles collinearity well. **Lasso** can set coefficients exactly to zero, so it also selects features. Its choice among correlated features is close to arbitrary and can change with a small data change, so do not read too much into which feature survived.

In scikit-learn's \`LogisticRegression\`, the strength is set by \`C\`, which is the **inverse** of $\\lambda$: a small \`C\` means a strong penalty. It applies L2 by default. In recent versions an L1 penalty is requested with \`l1_ratio=1.0\`, since the older \`penalty='l1'\` argument is deprecated.

\`\`\`python
from sklearn.datasets import load_breast_cancer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

data = load_breast_cancer(as_frame=True)
X, y = data.data, data.target          # 569 rows, 30 features

lasso = make_pipeline(StandardScaler(),
                      LogisticRegression(l1_ratio=1.0, solver='liblinear', C=0.1))
lasso.fit(X, y)
(lasso[-1].coef_ != 0).sum()           # 8 of 30 features kept
\`\`\`

This dataset ships with scikit-learn, so no download is needed. In 5-fold cross-validation, this 8-feature model has an AUC of about 0.993, about the same as logistic regression on all 30. That tells you that many features are redundant.

**Standardise first.** The penalty applies to coefficient size, and size depends on units, so unscaled features are punished unevenly. Put the scaler in a pipeline.

**Choosing strength.** Try a range of values on a log scale and cross-validate, using \`LogisticRegressionCV\`, \`RidgeCV\` or \`LassoCV\`, or \`GridSearchCV\`. Plot the score against \`C\`. A flat region means that the choice hardly matters, and you can prefer the simpler model.

**Pitfalls.** Regularised coefficients are biased by design, so their standard errors and p-values from ordinary formulas do not apply. Use these models to predict, not to test. Do not tune and report on the same folds. A penalty cannot save you from leakage or from a biased sample. On your final project, regularisation may barely help, and that would be a real finding.`,
          resources: [
            islp('Chapter 6, Linear Model Selection and Regularization.'),
            docs('Linear models', 'https://scikit-learn.org/stable/modules/linear_model.html', 'scikit-learn', 'Ridge, lasso and logistic regression, with the penalty options.'),
          ],
          exercises: [
            {
              slug: 'regularisation-path',
              title: 'Trace the path',
              prompt:
                'On the breast cancer data, fit L1 logistic regression at 10 values of `C` from 0.001 to 10 on a log scale. Plot the number of non-zero coefficients and the cross-validated AUC against `C`. Note where the AUC levels off. Confirm that about 8 features remain at `C=0.1`. Which `C` would you choose, and why might you pick one smaller than the best-scoring value?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'unstable-lasso',
              title: 'How stable is the selection?',
              prompt:
                'Bootstrap the breast cancer data 200 times, fit the L1 model at `C=0.1` each time, and count how often each feature is kept. How many are kept in over 90% of resamples, and how many in under 50%? Look at the correlated groups, such as the radius, perimeter and area features. What does this imply for claims that the lasso found the important features?',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'ridge-on-collinear',
              title: 'Ridge and collinearity',
              prompt:
                'Simulate 100 rows where $x_2 = x_1 +$ small noise, and $y = x_1 + x_2 +$ noise. Fit ordinary least squares and ridge, repeating 1,000 times, and compare the means and spreads of the coefficients. Compute the mean squared prediction error on new data for each. Explain the result in terms of bias and variance.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What is the practical difference between ridge and lasso?', answerOutline: 'Ridge shrinks all coefficients. Lasso can set some to zero, which selects features.' },
            { question: 'In scikit-learn, does a larger `C` mean more or less regularisation?', answerOutline: 'Less. `C` is the inverse of the penalty strength.' },
            { question: 'Why do you need to standardise first?', answerOutline: 'The penalty depends on coefficient size, which depends on units, so unscaled features are penalised unfairly.' },
          ],
          relatedLessons: ['machine-learning/linear-models/regularization-ridge-and-lasso'],
        },
        {
          slug: 'pca-for-many-features',
          title: 'PCA for many features',
          summary:
            'Replace many correlated features with a few directions of greatest variation, for pictures and for simpler models.',
          estimatedMinutes: 75,
          objectives: [
            'Explain what a principal component is',
            'Fit PCA and read explained variance',
            'Interpret loadings',
            'Use PCA within a pipeline and know its limits',
          ],
          concepts: [
            'Dimensionality',
            'Principal component',
            'Explained variance',
            'Loadings',
            'Scree plot',
            'Standardising before PCA',
            'Unsupervised reduction',
          ],
          explanation: `With 30 features you cannot plot your data, and many of the features repeat each other. **Principal component analysis** finds new axes, each a weighted combination of the original features. The first **principal component** points along the direction of greatest variance. The second is the direction of greatest remaining variance, at right angles to the first, and so on.

\`\`\`python
from sklearn.decomposition import PCA

Z = StandardScaler().fit_transform(X)
pca = PCA().fit(Z)
pca.explained_variance_ratio_[:3]     # about 0.443, 0.190, 0.094
\`\`\`

On the breast cancer data, the first two components hold about 63% of the variance in 30 features, and 7 components reach 90%. A **scree plot** of these values shows where they level off.

**Why standardise?** PCA follows variance. Unscaled, area measurements in the thousands would swamp everything else. Scale first, unless all features share units and you want their sizes to count.

**Loadings** say which original features build each component: \`pca.components_\` holds the weights. Interpret a component by reading its largest weights. On this data, the first component's weights all have the same sign, so it works as an overall size-and-irregularity score. The sign itself is arbitrary and can flip between versions. Components are combinations, so they are often harder to name than you would like. Do not force a story onto them.

**Uses.** A scatter of the first two components is a good first look at high-dimensional data. Colour it by a label you know, to see whether it separates. Reduced features can feed a model, inside a pipeline so that PCA is fitted only on training folds:

\`\`\`python
model = make_pipeline(StandardScaler(), PCA(5), LogisticRegression(max_iter=5000))
\`\`\`

Here, 5 components give a cross-validated AUC of about 0.995, as good as all 30 features.

**Pitfalls.** PCA ignores the label, since it is **unsupervised**. The directions with the most variance need not be the ones that predict your outcome, so test whether it helps instead of assuming it does. PCA finds linear structure only. A curved shape stays curved. Outliers can tilt components badly. Explained variance tells you how much of the *features* you kept, not how much of the *signal*. And reduced components make a model harder to explain to the person affected by it, which is a real cost. Linear Algebra for Data Science shows the mathematics behind all of this.`,
          resources: [
            islp('Chapter 12, Unsupervised Learning, the section on principal components analysis.'),
            docs('Decomposing signals in components', 'https://scikit-learn.org/stable/modules/decomposition.html', 'scikit-learn', 'The PCA section.'),
            { title: 'Python Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', type: 'textbook', cost: 'free', provider: 'Jake VanderPlas', note: 'Section 5.9, In Depth: Principal Component Analysis.' },
          ],
          exercises: [
            {
              slug: 'pca-breast-cancer',
              title: 'Explore with PCA',
              prompt:
                'Reproduce the explained variance values, and confirm that 7 components are needed for 90% and 10 for 95%. Plot the data on the first two components, coloured by diagnosis. List the largest 5 loadings on each. Then repeat without scaling. How much of the variance does the first component take now, and which feature dominates it?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pca-vs-scaling-knn',
              title: 'Scaling and dimension for kNN',
              prompt:
                'Cross-validate k-nearest neighbours with $k = 5$ on the breast cancer data in three ways: unscaled, scaled, and scaled with PCA using 5 components. Accuracy should be near 0.937 unscaled and 0.963 scaled. Report the third, and explain why distance-based methods react so strongly to these choices.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pca-can-miss',
              title: 'When PCA misses the signal',
              prompt:
                'Simulate two classes where the label depends only on a low-variance feature, and a second, unrelated feature has ten times the variance. Run PCA to one component, and fit a classifier on it. Compare its accuracy with a classifier on the original features. Explain what this shows about unsupervised reduction.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What does the first principal component represent?', answerOutline: 'The direction of greatest variance in the (usually standardised) features.' },
            { question: 'Why should PCA be inside a pipeline during cross-validation?', answerOutline: 'So components are learned from training folds only, avoiding leakage.' },
            { question: 'Why can PCA hurt a classifier?', answerOutline: 'It ignores the label, so low-variance directions that hold the signal may be discarded.' },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/pca-and-dimensionality-reduction'],
        },
        {
          slug: 'reporting-an-analysis',
          title: 'Reporting an analysis',
          summary:
            'Finish the pipeline: write for a reader who will act on the result, say what could be wrong, and make it reproducible.',
          estimatedMinutes: 75,
          objectives: [
            'Structure a report around findings',
            'State limitations that are specific, not ritual',
            'Report a model with what it should and should not be used for',
            'Verify that a repository reproduces from scratch',
          ],
          concepts: [
            'Lead with the answer',
            'Audience',
            'Specific limitations',
            'Model reporting',
            'Reproducibility check',
            'Exposing assumptions',
          ],
          explanation: `An analysis nobody can read or rerun has no value. The last stage of the pipeline deserves real effort.

**Lead with the answer.** Readers want the finding first, then the evidence. A useful structure is:

1. **Summary**: the question and the answer in a few sentences, with the main number and its uncertainty.
2. **Data**: what it is, where it came from, what was excluded and why, with row counts.
3. **Methods**: what you did, in plain words, with enough detail to repeat it.
4. **Findings**: one idea per section, each with a chart and a claim.
5. **Limitations**: what could make this wrong.
6. **Reproduction**: the exact commands.

Separate planned analyses from exploratory ones, and report results that did not work out. A null result reported honestly is a result.

**Know your reader.** A state engineer wants to know which bridges to inspect, and how often the list is wrong. A journalist wants a sentence that is true. A reviewer wants your code. Write one main report, with a plain-English summary on top.

**Make your limitations specific.** *More data would help* says nothing. Better: *bridges that were replaced are excluded, and they were mostly in poor condition, so the model underestimates decline*. For each limitation, state its likely direction and size.

**Report models fully.** Say what the model predicts, for whom, trained on what period and tested on what. State performance with intervals, compared with a baseline, on a forward-in-time test if it will be used on the future. Say what it should not be used for. Check error rates across important groups, and say what you found. The idea of a short **model card** is a good template for that.

**Prove that it reproduces.** Clone the repository to a new folder, make a fresh environment, follow your own README, and confirm that you get the same numbers. Tag that state as a release. If raw data is not in the repository, your script must fetch it, and \`DATA.md\` must have the checksums.

**Pitfalls.** Do not write a tour of everything you did. Readers care about what you found, not how long it took. Do not hide uncertainty to sound stronger. A claim that survives your own attempts to break it is worth more than a bold one that does not. Finally, ask who might be affected by your conclusions, and read your report as they would.`,
          resources: [
            { title: 'About READMEs', url: 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes', type: 'documentation', cost: 'free', provider: 'GitHub', note: 'What belongs in a README and how GitHub displays it.' },
            docs('Managing releases in a repository', 'https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository', 'GitHub', 'Tagging the exact version that matches your report.'),
          ],
          exercises: [
            {
              slug: 'summary-rewrite',
              title: 'Write the summary last',
              prompt:
                'Take your Machine Problem 2 report. Write a 100-word summary that leads with the finding, gives the main number with its uncertainty, and includes one limit. Give it to someone who has not seen the work, and ask them what they would conclude. Fix what they misread.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'clean-room-run',
              title: 'A clean-room rerun',
              prompt:
                'Clone one of your repositories to a new folder. Create a new environment, and follow only the README. Record every step where you needed knowledge that the README does not give, then fix them. Confirm that one key number is identical. Tag a release once it reproduces.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'specific-limitations',
              title: 'Make limitations specific',
              prompt:
                'Rewrite these vague limitations so that they state a mechanism, a direction and how you might check it: (a) The sample may not be representative. (b) There may be confounders. (c) Data quality may vary. (d) The model may not generalise. Use a project of your own for the details.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'What makes a limitation useful?', answerOutline: 'It names a specific mechanism, the likely direction of the error, and ideally its size.' },
            { question: 'What should a report on a model always state?', answerOutline: 'What it predicts, training and test periods, performance against a baseline with uncertainty, and what it should not be used for.' },
            { question: 'How do you prove that your analysis reproduces?', answerOutline: 'Clone to a new folder, build a fresh environment, follow the README and confirm that the numbers match.' },
          ],
          relatedLessons: ['machine-learning/ml-engineering/experiment-tracking-and-reproducibility'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'exploration-capstone',
    title: 'A reproducible end-to-end analysis',
    description:
      'Take one public dataset from question to report in a Git repository, with data checks, estimated uncertainty, a tested model and clear limits. The final project on the coursework page replaces this in the site.',
    deliverables: ['A Git repository that reproduces from a clean clone', 'A written report with a summary, methods, findings and limitations'],
    estimatedHours: 40,
  },
  masteryChecklist: [
    'I can turn a vague interest into a precise question and a written plan, and label results as planned or exploratory',
    'I can run an analysis from a Git repository with frozen data, pinned dependencies and automated data checks',
    'I can load, join and reshape messy tables, and prove that I did not lose or multiply rows',
    'I can reason about why data is missing and test how much it changes my conclusion',
    'I can make honest multivariate graphics and write a claim with its evidence and limits',
    'I can fit a probability model to data, then try to break it with Q-Q plots and tail checks',
    'I can estimate by maximum likelihood, bootstrap a statistic at the right unit, and check the coverage of an interval',
    'I can choose and interpret a test, plan for power, and control false discoveries across many tests',
    'I can fit, diagnose and interpret linear and logistic regressions, including categorical predictors and interactions',
    'I can validate a classifier honestly, choose a threshold on purpose, use regularisation and PCA, and report what the model should not be used for',
  ],
});
