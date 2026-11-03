import { defineCoursework } from '../define';

const extensions = ['ms-python.python', 'ms-toolsai.jupyter'];

/** Written for someone who has never installed a programming tool. */
const beginnerToolchain = [
  'Install VS Code from https://code.visualstudio.com and accept the default options.',
  'Install Python 3.13, the version these results were checked on. Open https://www.python.org/downloads/windows/, find the newest 3.13 release that lists a *Windows installer (64-bit)*, and run it. On the first screen tick *Add python.exe to PATH*, then choose *Install Now*.',
  'Open VS Code, press Ctrl+Shift+X to open Extensions, search for *Python* and *Jupyter*, and install both. Each one is published by Microsoft.',
  'Create a new empty folder for this project. In VS Code choose File > Open Folder and select it. Then choose Terminal > New Terminal. All the commands below go in that terminal, one at a time.',
  'Run `python --version` in the terminal. It should print 3.13 and a bit more. If it says Python was not found, or the Microsoft Store opens, close VS Code, run the installer again with *Add python.exe to PATH* ticked, and reopen VS Code.',
  'The commands below call `.venv\\Scripts\\python` directly, so you never need to activate anything. If the terminal shows a red message saying that running scripts is disabled, you can ignore it. On macOS or Linux, write `.venv/bin/python` instead.',
  'To make the notebook, press Ctrl+Shift+P, run *Create: New Jupyter Notebook*, save it into your folder under the name given below, then click *Select Kernel* at the top right, choose *Python Environments*, and pick `.venv`. Press the Run All button to run every cell.',
];

export default defineCoursework({
  subjectId: 'data-science-discovery',
  machineProblems: [
    {
      slug: 'mp1-star-class-size',
      title: 'Small Classes, Big Claim: reading the STAR experiment',
      afterModule: 'study-design',
      coversModules: ['dataframes-and-python-basics', 'study-design'],
      summary:
        'Use row selection and small functions to analyse a famous randomised experiment on class size, then show how an observational comparison from the same table misleads.',
      language: 'Python 3.13 with pandas',
      estimatedHours: 12,
      overview: `Between 1985 and 1989, Tennessee ran one of the largest education experiments ever done. Project STAR randomly assigned kindergarten children, within each school, to a small class, a regular class, or a regular class with a teacher's aide. The data is public, so you can check the claim yourself.

In this MP you act as the independent reader of that study. You will check that randomisation worked, measure the effect of small classes, and repeat the comparison inside four kinds of school. Then you will use the same table to make comparisons that were **not** randomised, such as teachers with and without a master's degree, and see how an average can hide opposite results in different kinds of school.

The goal is to make study design concrete. By the end you can point to a number and say *this is evidence of cause* and to another and say *this is only an association*, and explain why.

**Constraints.** Use only Modules 1 and 2: \`read_csv\`, selection with masks, \`isin\`, \`notna\`, \`value_counts\`, \`len\`, \`.mean()\`, \`.sum()\`, lists, functions, \`if\`, and \`assert\`. **No for-loops, no \`groupby\` and no new columns.** Those come later in the course. If you need the same thing for four school types, write one function and call it four times. This is meant to make functions earn their keep.

You analyse kindergarten only. \`stark\` is the class type, \`mathk\` and \`readk\` are test scores, \`lunchk\` is free-lunch status, \`schoolk\` is the school type, and \`degreek\` is the teacher's degree.`,
      setup: {
        extensions,
        toolchain: beginnerToolchain,
        structure: `star-mp/
├── .venv/                 # your private Python, made by the first command
├── data/
│   └── STAR.csv           # downloaded once, never edited
└── star.ipynb             # the notebook you hand in, with assert cells at the end`,
        commands: [
          { label: '1. Create the private Python environment (once)', command: 'python -m venv .venv' },
          { label: '2. Install the packages (once)', command: '.venv\\Scripts\\python -m pip install pandas ipykernel nbconvert' },
          { label: '3. Make the data folder (once)', command: 'mkdir data' },
          { label: '4. Download the data (once)', command: 'curl.exe -L -o data\\STAR.csv https://vincentarelbundock.github.io/Rdatasets/csv/AER/STAR.csv' },
          { label: 'Test: run the whole notebook from the top. It stops with an error if any assert fails', command: '.venv\\Scripts\\python -m nbconvert --to notebook --execute --inplace star.ipynb' },
        ],
      },
      requirements: [
        '`star.ipynb` loads `data/STAR.csv` with `pd.read_csv`, and a Markdown cell states where the data came from, what one row represents, and one privacy consideration for data about young children.',
        'A variable `k` holds the kindergarten sample: exactly the rows where `stark` is not missing. All later analysis uses `k`, and `star` is left unchanged.',
        'Define and use `arm_mean(frame, arm, column)`, `effect(frame, column)` for small minus regular, `free_share(frame)` for the share of `free` among rows with a known `lunchk`, and `in_school_type(frame, school_type)`.',
        'Print a balance report with one line per class type showing the number of students, the free-lunch share and the share female, and write two sentences on whether randomisation looks to have worked.',
        'Report the small-minus-regular effect on `mathk` and `readk`, and the aide-minus-regular difference on both, each in a sentence with units.',
        'Compute the math effect separately for the four values of `schoolk`, count the students with a math score in the small and regular arms of each, and combine the four effects into a weighted average, all without a loop.',
        'Define `degree_gap(frame)`, the mean `mathk` for teachers with `degreek` of `master` minus `bachelor`, and report it overall and for each of the four school types.',
        'Compute the non-free minus free lunch gap in `mathk`, and the suburban minus inner-city gap overall and within each lunch group, then name what these comparisons cannot establish and why.',
        'Count missing `mathk` values in each class type, and explain in two sentences why outcomes missing unevenly would threaten an experiment.',
        'A final Markdown section of 150 to 250 words says which results are causal evidence, which are associations, and one limit of the study. The last code cell holds your `assert` checks, and the notebook passes the test command in the setup.',
      ],
      acceptanceTests: [
        '`star.shape == (11598, 48)`, `len(k) == 6325`, and the class type counts are small 1,900, regular 2,194 and regular+aide 2,231.',
        '`free_share` gives 0.471 for small, 0.477 for regular and 0.503 for regular+aide, each to within 0.001, and missing `mathk` counts are 138, 162 and 154 in that order.',
        '`effect(k, \'mathk\')` is 7.73 and `effect(k, \'readk\')` is 5.82, each to within 0.01. Aide minus regular is -0.40 for math and +0.70 for reading.',
        'The math effect is 9.47 for inner-city, 1.44 for suburban, 8.90 for rural and 7.08 for urban, from 826, 828, 1,812 and 328 students. The weighted average is 7.24, each to within 0.01.',
        '`degree_gap(k)` is +0.43 overall, -8.18 for inner-city, +8.22 for suburban, -1.65 for rural and +2.86 for urban, each to within 0.01.',
        'The lunch gap is 23.27 overall. Suburban minus inner-city is 23.50 overall, 14.02 among free-lunch students and 14.16 among non-free students, each to within 0.01.',
      ],
      resources: [
        { title: 'Project STAR data documentation', url: 'https://vincentarelbundock.github.io/Rdatasets/doc/AER/STAR.html', type: 'documentation', cost: 'free', provider: 'Rdatasets, from the AER package', note: 'What every column means. Keep it open while you work.' },
        { title: 'Observational Studies, Confounders and Stratification', url: 'https://discovery.cs.illinois.edu/learn/Basics-of-Data-Science-with-Python/Observational-Studies-Confounders-and-Stratification/', type: 'interactive', cost: 'free', provider: 'University of Illinois, DISCOVERY' },
      ],
      stretchGoals: [
        'Repeat the effect for first grade with `star1` and `math1`, and investigate how many students changed class type after kindergarten.',
        'Use `value_counts` to find the ten largest schools, compute `effect` for each with one call per school, and explain why they vary so much.',
      ],
    },
    {
      slug: 'mp2-rain-streaks',
      title: 'Do Wet Days Come in Streaks? Fifty years of Champaign rain',
      afterModule: 'probability-for-prediction',
      coversModules: ['exploratory-data-analysis', 'simulation', 'probability-for-prediction'],
      summary:
        'Measure whether rain has memory using 50 years of daily records, then build two simulated climates and test which one reproduces the real streaks.',
      language: 'Python 3.13 with pandas and NumPy',
      estimatedHours: 16,
      overview: `People feel that weather comes in runs. Is that real, or do we just notice streaks that chance would produce anyway? Coin flips produce streaks too, as you found in Module 4, so a feeling cannot answer this. A careful comparison can.

You will use the daily precipitation record of the weather station at Champaign, Illinois, from the Global Historical Climatology Network, for the 50 years from 1975 to 2024. A **wet day** has at least 1.0 mm of precipitation, a standard definition in climate work.

First you explore: how much rain falls, and when. Next you measure conditional probabilities: how much does yesterday's rain change the chance of rain today? Then comes the main part. You write two simulated climates with for-loops. The *coin climate* flips a biased coin each day, with no memory. The *memory climate* has a chance of rain that depends on yesterday. You run each one 200 times and compare the streaks they produce with the real streaks.

Neither model is perfect, and the interesting result is how each one fails. A reader of your notebook should learn something true about rain and something about what it means to test a model.

**Constraints.** Use what is taught through Module 5: selection, new columns, \`groupby\`, \`pd.to_datetime\`, \`.dt\`, \`shift\`, plots, for-loops, functions, conditionals, and a seeded \`np.random.default_rng\`. Spell lengths must be found by your own for-loop, and each simulated day must come from an explicit decision in a for-loop.

**Freeze your data.** The station file grows every few days and old values are occasionally corrected. Download it once, never replace it, and write the download date in a Markdown cell. Tests below use ranges for this reason.`,
      setup: {
        extensions,
        toolchain: beginnerToolchain,
        structure: `rain-mp/
├── .venv/
├── data/
│   └── USC00118740.csv    # the frozen station file, never edited
├── figures/               # PNG charts saved by the notebook
└── rain.ipynb             # the notebook you hand in, with assert cells at the end`,
        commands: [
          { label: '1. Create the private Python environment (once)', command: 'python -m venv .venv' },
          { label: '2. Install the packages (once)', command: '.venv\\Scripts\\python -m pip install pandas numpy matplotlib ipykernel nbconvert' },
          { label: '3. Make the folders (once)', command: 'mkdir data, figures' },
          { label: '4. Download the station file once. It is about 12 MB', command: 'curl.exe -L -o data\\USC00118740.csv https://www.ncei.noaa.gov/data/global-historical-climatology-network-daily/access/USC00118740.csv' },
          { label: 'Test: run the whole notebook from the top', command: '.venv\\Scripts\\python -m nbconvert --to notebook --execute --inplace rain.ipynb' },
        ],
      },
      requirements: [
        'Load the file with `usecols=[\'DATE\', \'NAME\', \'PRCP\']`, keep dates from 1975-01-01 to 2024-12-31, parse `DATE` with `pd.to_datetime`, and add `mm` equal to `PRCP / 10`, because the file stores tenths of a millimetre. Drop rows with missing `PRCP` and report how many there were.',
        'Add a boolean column `wet` (`mm >= 1`) and `month` and `year` columns. Report the share of wet days and the mean annual total in millimetres.',
        'Use `groupby` to produce a month-by-month table of wet-day share and mean rainfall, and save a labelled bar chart of wet-day share by month to `figures/`.',
        'Use `shift(1)` to compute P(wet today given wet yesterday), P(wet today given dry yesterday) and P(wet on both days). Compare the last with what independence would predict, and state the conclusion in plain English.',
        'Write `spell_lengths(flags)` with a for-loop. It takes a list of True and False and returns two lists: the lengths of wet spells and of dry spells, in order. Test it with `assert` on at least four small cases, including an all-wet list.',
        'Report the real number of wet spells, their mean and longest length, how many last 4 days or more, and the mean and longest dry spell. Save a histogram of wet spell lengths to `figures/`.',
        'Write `simulate_coin(rng, n_days, p)` and `simulate_memory(rng, n_days, p_after_wet, p_after_dry, p_start)`, each returning a list of True and False, using a for-loop and the probabilities you measured.',
        'Using one seeded generator, run each model 200 times with the real number of days. For each run, record the mean wet spell, the longest wet spell, and the number of wet spells of 4 days or more. Report the average and the 2.5 and 97.5 percentiles of each.',
        'Use Bayes\' theorem to compute P(June given wet) from P(wet given June), P(June) and P(wet), and confirm it equals a direct count. Do the same for P(June given heavy), where a heavy day has at least 25 mm.',
        'A closing Markdown section of 200 to 300 words says which model fits better, where each one fails, and one real feature of weather that both ignore. The last code cell holds your `assert` checks, and the notebook passes the test command.',
      ],
      acceptanceTests: [
        'The window has 18,263 rows from one station named `CHAMPAIGN 3 S, IL US`. After dropping missing `PRCP`, between 18,200 and 18,263 rows remain, and the mean annual total, summed by year and averaged, is 1,035 mm to within 15 mm.',
        'P(wet) is 0.260 to within 0.005. May has the highest monthly wet share, about 0.32, and September the lowest, about 0.21.',
        'P(wet given wet yesterday) is 0.374 and P(wet given dry yesterday) is 0.219, each to within 0.01. P(wet on both days) is about 0.097, while independence predicts about 0.068.',
        '`spell_lengths([True, True, False, True])` returns `([2, 1], [1])`. On the real data there are 2,966 wet spells to within 30, with mean length 1.60 to within 0.02, longest 8, and 125 of 4 days or more to within 10. The mean dry spell is 4.55 to within 0.06.',
        'Averaged over its 200 runs, the coin climate gives a mean wet spell between 1.33 and 1.37 and 55 to 70 wet spells of 4 days or more. The memory climate gives a mean wet spell between 1.56 and 1.64 and 145 to 170 such spells. The 2.5 to 97.5 percentile ranges for that count are about 46 to 74 and 131 to 180, so the real count of about 125 lies above the coin range and below the memory range.',
        'Bayes and direct counting agree on P(June given wet), about 0.086, to within 0.000001. There are 512 heavy days to within 10, and P(June given heavy) is 0.141 to within 0.01.',
      ],
      resources: [
        { title: 'Global Historical Climatology Network Daily', url: 'https://www.ncei.noaa.gov/products/land-based-station/global-historical-climatology-network-daily', type: 'dataset', cost: 'free', provider: 'NOAA NCEI', note: 'Background on the dataset and its quality flags.' },
        { title: 'GHCN-Daily readme', url: 'https://www.ncei.noaa.gov/pub/data/ghcn/daily/readme.txt', type: 'documentation', cost: 'free', provider: 'NOAA NCEI', note: 'Confirms that PRCP is in tenths of a millimetre.' },
      ],
      stretchGoals: [
        'Give the memory climate a different pair of probabilities for each month, and see whether that fixes the count of long wet spells.',
        'Repeat for another GHCN station with a different climate, such as Seattle or Phoenix, and compare the conditional probabilities.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-margin-of-error',
    title: 'Margin of Error: an audit of 17,000 election polls',
    repoName: 'margin-of-error',
    summary:
      'Measure how often stated margins of error really cover election results, find out why they fall short, and publish the findings as a public report.',
    language: 'Python 3.13 with pandas, NumPy, matplotlib and scikit-learn',
    estimatedHours: 40,
    overview: `Every poll comes with a promise: plus or minus a few points, 95 times out of 100. Does that promise hold? Using more than 17,000 final-stretch polls of US general elections from 1998 to 2022, each matched to the actual result, you can test it. Your project is an audit, and it has a clear headline. The stated margin of error covered the result far less than 95% of the time.

The question leads to the whole course. You will load and clean a real table, reason about how polls are designed and why polls from one race are not independent, explore errors over time and by type of race, simulate a world where sampling is the only source of error, and use probability to ask how safe a lead is. Then you will try to do better with a regression trained on the past and tested on later elections, cluster pollsters, and put honest intervals around your claims.

Nothing about this project takes a political side. A positive error means the polls overstated the first-listed candidate, usually the Democrat, and you will report errors in both directions as the data shows them.

**Why this matters.** People use polls to decide where to spend money, whom to fund, and how worried to be. A clear account of how much to trust a poll is useful to any reader, and it is the sort of analysis that belongs in public.

**Publishing without Git.** This course does not teach Git, so you will publish through the GitHub website: create a repository, then use *Add file > Upload files*. Data Science Exploration teaches the proper workflow, and you can move this project over to it later.

**Data.** Use FiveThirtyEight's pollster-ratings table at the fixed commit in the setup, so your numbers match these tests. It is licensed CC BY 4.0, so you must credit FiveThirtyEight. Keep to polls of \`type_simple\` \`Pres-G\`, \`Sen-G\`, \`Gov-G\` and \`House-G\`.`,
    setup: {
      extensions,
      toolchain: [
        ...beginnerToolchain,
        'Create a free account at https://github.com if you do not have one. No other paid or signed-up service is needed.',
        'In VS Code choose File > New Text File, type these seven package names on separate lines, and save the file as `requirements.txt` in your folder: pandas, numpy, matplotlib, scikit-learn, scipy, ipykernel, nbconvert.',
      ],
      structure: `margin-of-error/
├── .venv/                 # not uploaded
├── data/
│   └── raw_polls.csv      # frozen copy, never edited
├── figures/               # PNG charts saved by the notebook
├── results/               # summary tables saved by the notebook
├── audit.ipynb            # the whole analysis, top to bottom
├── requirements.txt       # one package name per line
├── LICENSE
└── README.md              # the report people will read`,
      commands: [
        { label: '1. Create the private Python environment (once)', command: 'python -m venv .venv' },
        { label: '2. Install the packages listed in requirements.txt (once)', command: '.venv\\Scripts\\python -m pip install -r requirements.txt' },
        { label: '3. Make the folders (once)', command: 'mkdir data, figures, results' },
        { label: '4. Download the polls at a fixed commit (once)', command: 'curl.exe -L -o data\\raw_polls.csv https://raw.githubusercontent.com/fivethirtyeight/data/46b626e9292587ff394d7aa6d02f45dc06697cc8/pollster-ratings/raw_polls.csv' },
        { label: 'Test: run the whole notebook from the top', command: '.venv\\Scripts\\python -m nbconvert --to notebook --execute --inplace audit.ipynb' },
      ],
    },
    requirements: [
      'Load the data and keep the four general-election types. Add `error` (`margin_poll - margin_actual`), `abs_error`, `moe` (`196 / np.sqrt(samplesize)`, the 95% margin on a lead from Module 7) and a boolean `covered` (`abs_error <= moe`). Explain each column in Markdown.',
      'Report mean and median absolute error and overall coverage, then save tables of coverage and mean error by race type and by even-numbered election year to `results/`.',
      'A study design section explains why this data is observational, gives two sources of poll error that a printed margin leaves out, and explains why polls of the same race are not independent. It also compares polls sponsored by each party with non-partisan polls, and names a confounder for that comparison.',
      'Save at least four labelled charts with finding-style titles: a histogram of `error`, a line chart of coverage by election year with a line at 95%, a chart of how error changes with `time_to_election`, and one of your choice.',
      'Simulate a sampling-only world with a for-loop: 200 times, draw every poll\'s result from a 50/50 race at its own sample size, rounded to a whole number, with `rng.binomial`, then compute mean absolute error and coverage. Compare these with the real values, and report how many times `moe` would need multiplying to reach 95% on the real data.',
      'Use `pd.cut` to compute how often the poll leader won in bands of lead of 0-2, 2-5, 5-10, 10-20 and over 20 points, leaving out exact ties. Use Bayes\' theorem to turn P(lead of 5 or more given a right call) into P(right call given a lead of 5 or more), and check it by direct count.',
      'Train `LinearRegression` to predict `margin_actual` from `margin_poll` on cycles up to 2015, and test on 2016 onwards. Compare the test mean absolute error of the model with that of the raw polls, and explain what you find.',
      'Cluster pollsters with at least 50 polls with k-means (k=3) on standardised mean `error` and mean `abs_error`, summarise each cluster, and say what the clusters do and do not show.',
      'Make a more honest coverage estimate with one random poll per race, using `g.sample(frac=1, random_state=107).drop_duplicates(\'race\')`. Give a 95% interval and a z-statistic against the promised 0.95. Test whether live-phone and online-panel polls differ in mean `abs_error`, with an interval for the difference.',
      '`README.md` states the headline, shows at least three charts, describes the data and its source, gives a plain-English summary for a non-technical reader, and lists at least three limits of the analysis.',
    ],
    acceptanceTests: [
      'The file has 20,466 rows and 30 columns. After filtering there are 17,367 polls, 2,167 races and 556 pollsters from 1998 to 2022.',
      'Mean absolute error is 5.44 and median 4.39 points. Overall coverage is 0.738. By type it is 0.777 for Pres-G, 0.714 for Sen-G, 0.722 for Gov-G and 0.720 for House-G. By year, 1998 is 0.458, 2004 is 0.847 and 2020 is 0.662. All are to within 0.005, and using `2 * moe` gives coverage of 0.954.',
      'Averaged over its 200 runs, the sampling-only simulation gives a mean absolute error between 3.05 and 3.17 and coverage between 0.945 and 0.955, which shows the printed margin is right for a world that does not exist: real absolute error is about 1.75 times as large.',
      'There are 678 exact ties and 16,689 leads. The leader won 0.810 of the time. By band the share is 0.589, 0.686, 0.863, 0.961 and 0.996, each to within 0.005. P(right call given lead of 5 or more) is 0.912 by both Bayes and direct count, using P(right) 0.810, P(lead of 5 or more) 0.650 and P(lead of 5 or more given right) 0.731.',
      'The training set has 11,212 polls and the test set 6,155. The fitted slope is 0.920 and intercept 0.66, with $R^2$ of 0.778 on training data and 0.701 on test data. Test mean absolute error is 5.41 for raw polls and 5.59 for the model, so the adjustment does not help. The clustering uses 63 pollsters, and the smallest cluster has 5.',
      'The one-poll-per-race sample has 2,167 rows, with coverage between 0.68 and 0.72 and $z$ below -50 against 0.95. Live-phone (6,134 polls, 5.33) minus online-panel (2,404 polls, 5.42) is -0.09 points, with an interval of about -0.30 to +0.11 that includes zero.',
    ],
    coverage: [
      { module: 'dataframes-and-python-basics', demonstrates: 'The notebook loads a real CSV, filters it with masks, and uses functions and assert checks throughout.' },
      { module: 'study-design', demonstrates: 'The design section explains why polls are observational, why they are not independent, and how sponsorship is confounded.' },
      { module: 'exploratory-data-analysis', demonstrates: 'Grouped tables and labelled charts of error by race type, year and time before the election.' },
      { module: 'simulation', demonstrates: 'A seeded for-loop simulation of a sampling-only world gives the benchmark that real polls fail.' },
      { module: 'probability-for-prediction', demonstrates: 'Conditional win rates by size of lead, and a Bayes calculation checked by direct count.' },
      { module: 'towards-machine-learning', demonstrates: 'A regression tested on later elections, and k-means clustering of pollsters with a critical reading of each.' },
      { module: 'polling-and-inference', demonstrates: 'Margin of error, coverage, an interval and a z-statistic on one poll per race, and a comparison of methods.' },
    ],
    portfolio: [
      'Create a public GitHub repository named `margin-of-error` from the website, then use *Add file > Upload files* to add everything except `.venv`.',
      'Open the README with one sentence stating your headline finding and your best chart directly below it, followed by a short plain-English summary.',
      'Choose a license with *Add file > Create new file*, naming it `LICENSE` and using the template picker, and credit FiveThirtyEight and CC BY 4.0 in a data section of the README.',
      'Add a section on how to re-run the project, listing the exact commands from the setup, and test those instructions in a new empty folder.',
      'Create a release tagged `v1.0.0` from the Releases page, and describe in its notes what the analysis found.',
    ],
    resources: [
      { title: 'FiveThirtyEight pollster ratings data', url: 'https://github.com/fivethirtyeight/data/tree/master/pollster-ratings', type: 'dataset', cost: 'free', provider: 'FiveThirtyEight', note: 'The README defines every column.' },
      { title: 'Adding a file to a repository', url: 'https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository', type: 'documentation', cost: 'free', provider: 'GitHub', note: 'How to upload files through the website with no Git commands.' },
      { title: 'Managing releases in a repository', url: 'https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository', type: 'documentation', cost: 'free', provider: 'GitHub' },
    ],
    stretchGoals: [
      'Average all polls of a race and measure how much that shrinks the error, then explain why the improvement stops well short of what independent polls would give.',
      'Estimate how much of the error is shared across a race and how much is unique to a poll, by comparing variation within races and between them.',
    ],
  },
});
