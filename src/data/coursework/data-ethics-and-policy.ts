import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org and tick "Add python.exe to PATH". In the project folder run `python -m venv .venv`, then select that interpreter in VS Code so new terminals activate it.',
  'Install Git for Windows, and create a free GitHub account.',
];

export default defineCoursework({
  subjectId: 'data-ethics-and-policy',
  machineProblems: [
    {
      slug: 'mp1-veil',
      title: 'veil: measure re-identification risk, then pay for reducing it',
      afterModule: 'privacy',
      coversModules: ['ethics-for-data-work', 'privacy'],
      summary: 'Build a tool that measures re-identification risk, runs a linkage attack on a fully synthetic population, reaches k-anonymity on a public benchmark, adds differential privacy, and reports who pays for each protection.',
      language: 'Python 3.12',
      estimatedHours: 12,
      overview: `Claims about anonymisation are easy to make and easy to test, yet few people test them. \`veil\` is a command-line tool that puts numbers on them. It measures how identifying a table is, shows what a linkage attack achieves, searches for a generalisation that reaches a target $k$, adds Laplace noise under a tracked budget, and reports the utility lost, broken down by group.

**Data rules, which are part of the spec.** The linkage attack runs only on a synthetic population that you generate. Every person in it is invented, by the exact method below. The k-anonymity and differential privacy work uses the UCI Adult dataset, an established public research benchmark from a 1994 census extract. You must never try to identify a real person, must never run these tools against real personal data, and must never link any data to outside sources about real people. A test in your repository asserts that the code has no network calls beyond the single Adult download.

**The synthetic population.** For each integer $i$ from 0 to 99,999, compute \`h = sha256(f"person-{i}".encode()).digest()\`. Then \`zip\` is \`10000 + int.from_bytes(h[0:4], "big") % 400\` written as 5 digits, \`dob\` is 1930-01-01 plus \`int.from_bytes(h[4:8], "big") % 27375\` days, \`sex\` is F if \`h[8]\` is odd and otherwise M, \`diag\` is item \`h[9] % 8\` of \`[flu, flu, flu, flu, asthma, asthma, diabetes, depression]\`, \`voter\` is \`h[10] % 100 < 60\`, and \`patient\` is \`h[11] % 100 < 15\`. Hash-derived attributes are exact on every machine. They are uniform by construction, so results here illustrate the mechanism and say nothing about the rate in any real population.

**The ethical memo is part of the build.** A protection is a trade-off. \`docs/MEMO.md\` must say who gains and who pays for your chosen settings, using your measured numbers.`,
      setup: {
        extensions: [...pythonExtensions, 'mechatroner.rainbow-csv'],
        toolchain: [
          ...pythonToolchain,
          'Install the tools with `pip install pandas numpy matplotlib pytest`.',
          'Download `adult.zip` once from the UCI Machine Learning Repository, extract `adult.data` to `data/`, and keep it out of Git.',
        ],
        structure: `veil/
├── src/veil/population.py  # the synthetic population, exactly as specified
├── src/veil/risk.py        # classes, k, prosecutor risk, l-diversity
├── src/veil/linkage.py     # linkage on synthetic data only
├── src/veil/generalise.py  # hierarchies and lattice search
├── src/veil/dp.py          # Laplace mechanism and budget accountant
├── src/veil/utility.py     # information loss, per-group error
├── src/veil/cli.py
├── tests/
├── data/                   # adult.data, not committed
├── docs/MEMO.md
├── docs/DATA.md            # data sources and rules of use
└── README.md`,
        commands: [
          { label: 'Generate the synthetic population', command: 'python -m veil.cli population --n 100000 --out data/population.csv' },
          { label: 'Measure risk on the benchmark', command: 'python -m veil.cli risk data/adult.data' },
          { label: 'Run the synthetic linkage study', command: 'python -m veil.cli linkage --zip-digits 5 --date day' },
          { label: 'Search for a k-anonymous release', command: 'python -m veil.cli anonymise data/adult.data --k 5 --suppress 0.01' },
          { label: 'Run the differential privacy study', command: 'python -m veil.cli dp data/adult.data --epsilon 0.1' },
          { label: 'Run the tests', command: 'pytest' },
        ],
      },
      requirements: [
        '`population.py` follows the method in the overview exactly. Written as CSV with header `pid,zip,dob,sex,diag,voter,patient`, booleans as `True` and `False`, LF line endings and no index, the file hash matches the acceptance test.',
        '`risk.py` computes the equivalence classes for any list of quasi-identifiers, and reports `k`, the number of classes, unique rows, rows in classes smaller than a given size, mean prosecutor risk (classes divided by rows) and maximum risk.',
        '`linkage.py` takes the patient release (rows with `patient`, without `pid` in the attack path) and the voter roll (rows with `voter`), generalises both the same way, joins on `zip`, `dob` and `sex`, and counts a match only when exactly one voter fits. It reports matches, correct matches, wrong matches, the rate over all patients and the precision. The true `pid` is used only to score results.',
        'Generalisation supports ZIP prefixes of 5, 4 and 3 digits, and dates by day, month and year, on the synthetic data. For Adult it uses the hierarchies in the acceptance test, treats missing `native-country` as `unknown`, and searches all 540 lattice nodes.',
        'The search keeps nodes where rows in classes smaller than `k` number at most the suppression limit, and picks the lowest loss, defined as the mean over the six attributes of level divided by maximum level. Ties go to the lowest node tuple in the order age, education, marital status, country, race, sex.',
        '`risk.py` reports distinct l-diversity for a sensitive column, with the count of classes holding one value, and rows in them.',
        '`dp.py` implements the Laplace mechanism on counts, using `numpy.random.Generator`, plus a `BudgetAccountant` that applies sequential composition, treats disjoint histogram cells by parallel composition, and raises `BudgetExceeded` before releasing anything over budget.',
        '`utility.py` reports mean absolute and relative error by group, and an estimate of the income rate by group with the budget split equally between numerator and denominator.',
        '`docs/DATA.md` states the data rules above. A test scans `src/` and fails on imports of `requests`, `urllib` or `socket` outside one named download function.',
        '`docs/MEMO.md` has the headings Stakeholders, Harms and benefits, Who carries the burden, Strongest objection, and Recommendation. It uses at least 5 measured numbers, and a test checks that the headings are present.',
      ],
      acceptanceTests: [
        'Population: `pid` 0 is ZIP 10067, born 1972-10-12, F, flu, not voter, not patient. `pid` 1 is 10281, 1941-03-12, M, asthma, voter, patient. `pid` 99999 is 10098, 1979-08-09, M, asthma, neither. There are 68,794 voters, 17,588 patients, and 49,989 flu, 25,014 asthma, 12,597 diabetes and 12,400 depression. The CSV SHA-256 is `fd468b1c97c5117eb98bdc4c3c377bad6d909af2ffa62da0d891a1a89a4f87bb`. Voters exceed 60 percent because byte values modulo 100 are not uniform, a bias you should be able to explain.',
        'Uniqueness: 99.59 percent of the synthetic population is unique on ZIP, birth date and sex, and 0 percent on ZIP and sex.',
        'Linkage over 17,588 patients, of whom 12,059 are in the roll, as (unique matches, correct, wrong). ZIP5 and day: 12,040, 12,027, 13, a rate of 68.38 percent with precision 99.89 percent. ZIP5 and month: 11,448, 10,959, 489. ZIP5 and year: 5,926, 3,868, 2,058. ZIP3 and day: 10,194, 8,862, 1,332. ZIP3 and month: 3, 1, 2. ZIP3 and year: 0, 0, 0.',
        'Adult (`adult.data`, 32,561 rows) with quasi-identifiers age, education, marital status, native country, race and sex: 8,553 classes, $k=1$, 5,594 unique rows (17.18 percent), 10,138 rows in classes under 5, mean risk 0.2627.',
        'Hierarchies. Age: exact, 5-year, 10-year, 20-year, suppressed. Education: exact, then `no-diploma` (Preschool to 12th), `hs`, `some-college` (Some-college, Assoc-voc, Assoc-acdm), `bachelors`, `advanced` (Masters, Prof-school, Doctorate), then suppressed. Marital: exact, then `married` (three Married- values), `never`, `formerly`, then suppressed. Country: exact, then United-States, unknown and other, then suppressed. Race and sex: exact, suppressed. For $k=5$ and 1 percent suppression, 202 nodes are feasible and the choice is `(2,2,0,2,0,0)`, loss 0.416667, 247 rows suppressed, 203 classes, of which 59 hold one income value, covering 1,671 rows. For $k=5$ with no suppression, 35 are feasible and the choice is `(4,2,1,2,0,0)`, loss 0.583333, 30 classes. For $k=10$ and 1 percent, 150 are feasible and the choice is `(4,2,0,1,0,0)`, 250 suppressed, 85 classes.',
        'Differential privacy: over 20,000 trials the mean absolute error of the Laplace count is within 3 percent of $1/\\varepsilon$ for $\\varepsilon$ of 0.1, 0.5 and 1. On the race by sex histogram, whose smallest cell has 109 people and largest 19,174, relative error at $\\varepsilon = 0.1$ is near 9.2 percent and 0.05 percent. With a budget of 1.0, two releases at 0.5 are allowed and a third raises `BudgetExceeded`, while a 10-cell disjoint histogram at 0.5 costs 0.5 in total.',
      ],
      resources: [
        {
          title: 'UCI Adult dataset',
          url: 'https://archive.ics.uci.edu/dataset/2/adult',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'A public benchmark, free to download with no login.',
        },
        {
          title: 'Programming Differential Privacy',
          url: 'https://programming-dp.com/',
          type: 'textbook',
          cost: 'free',
          provider: 'Near and Abuah',
          note: 'Worked Python for the Laplace mechanism and composition.',
        },
      ],
      stretchGoals: [
        'Add the Mondrian multidimensional algorithm, and compare information loss with the full-domain search.',
        'Add $t$-closeness and show a class that passes $l$-diversity but fails it.',
      ],
    },
    {
      slug: 'mp2-recount',
      title: 'recount: recompute the COMPAS dispute from the original data',
      afterModule: 'data-access',
      coversModules: ['bias-and-fairness', 'data-access'],
      summary: 'Reproduce the published COMPAS figures exactly, show how they depend on the population, quantify uncertainty, test mitigation by counting who pays, and handle sensitive public data under a documented access record.',
      language: 'Python 3.12',
      estimatedHours: 14,
      overview: `Few data ethics debates are as well known as COMPAS, and few people have recomputed it. \`recount\` is a reproducible audit. It begins by matching the published numbers exactly, then goes where the published summaries do not: how results depend on the population, how uncertain they are, and what a mitigation would actually do to real counts.

The data is ProPublica's file \`compas-scores-two-years.csv\`, from its public repository, pinned to commit \`bafff5da3f2e45eca6c2d5055faad269defd135a\`, with SHA-256 \`c451db85908b2f7fef1d83203bedf6b71ecda0d5af468d82ae62178f91d0cc7d\`. ProPublica obtained it through a public records request to Broward County.

**This is sensitive data about real people, and that is part of the assignment.** The file includes names and dates of birth. Being public doesn't make it harmless. Your loader must read only an allowlist of columns, and raw data stays outside Git. You must not look up, identify or contact anyone in it, must not print or publish any row-level records, and every published table must have at least 10 people per cell, except where the spec names a count. You may not combine it with any other data about individuals.

**Report both sides.** ProPublica and Northpointe drew different conclusions from the same data. Your report must give each the strongest fair statement, and say what is established, what is disputed, and which is a judgement of value. The outcome is re-arrest within two years, not reoffending, and you must say why that matters.

**Access record.** \`access-record.yaml\` documents how the data came to exist and on what terms you use it. A test validates its fields. This is what Module 4 looks like as a file in a repository.`,
      setup: {
        extensions: [...pythonExtensions, 'redhat.vscode-yaml', 'mechatroner.rainbow-csv'],
        toolchain: [
          ...pythonToolchain,
          'Install the tools with `pip install pandas numpy scikit-learn matplotlib pyyaml pytest`.',
          'Download the CSV once from the pinned commit at `https://raw.githubusercontent.com/propublica/compas-analysis/bafff5da3f2e45eca6c2d5055faad269defd135a/compas-scores-two-years.csv`, keep it in `data/`, and add `data/` to `.gitignore`.',
        ],
        structure: `recount/
├── src/recount/load.py        # allowlist, hash check, populations
├── src/recount/metrics.py     # confusion matrices and rates
├── src/recount/uncertainty.py # bootstrap
├── src/recount/calibration.py
├── src/recount/mitigate.py    # group thresholds and burden counts
├── src/recount/report.py      # writes docs/REPORT.md tables
├── published.yaml             # the figures being reproduced
├── access-record.yaml
├── tests/
├── data/                      # not committed
├── docs/REPORT.md
└── README.md`,
        commands: [
          { label: 'Reproduce the published figures', command: 'python -m recount.report --check-published' },
          { label: 'Write the full report', command: 'python -m recount.report --out docs/REPORT.md' },
          { label: 'Run the tests', command: 'pytest' },
        ],
      },
      requirements: [
        '`load.py` checks the SHA-256 and reads only these allowlisted columns: `sex`, `age`, `age_cat`, `race`, `priors_count`, `days_b_screening_arrest`, `c_charge_degree`, `is_recid`, `score_text`, `decile_score`, `two_year_recid`. A test fails if `name`, `first`, `last`, `dob` or any case number column appears in a processed frame.',
        '`load.py` exposes two named populations: `all_rows`, and `analysis_rows`, which keeps `days_b_screening_arrest` from -30 to 30, `is_recid` not -1, `c_charge_degree` not O and `score_text` not N/A.',
        '`metrics.py` computes TP, FP, FN, TN, base rate, FPR, FNR, PPV, NPV, accuracy and selection rate for any grouping and any threshold, and returns None rather than a fraction for any group under a stated minimum size.',
        '`published.yaml` lists each reproduced figure with its source, and the check fails if a recomputed value differs at the published precision.',
        'A test verifies the Chouldechova identity on each group from the exact counts.',
        '`uncertainty.py` gives 95 percent percentile bootstrap intervals for gaps between groups, with at least 2,000 resamples within each group and a fixed seed.',
        '`calibration.py` tabulates the observed two-year rate by decile and race, with counts, for Black and white defendants, and computes AUC by group.',
        '`mitigate.py` evaluates any pair of thresholds, and writes a burden table of how many people move into and out of each error type, by group, relative to one shared threshold. A two-feature logistic model on age and priors is compared in 5-fold cross-validation with the score.',
        '`access-record.yaml` has the fields `source`, `how_obtained`, `who_is_in_it`, `consent_status`, `identifiers_present`, `identifiers_removed`, `retention`, `permitted_uses`, `prohibited_uses` and `reviewed_on`. It says that the people in the data did not consent to this use, and that you would seek review before any research use in an institution.',
        '`docs/REPORT.md` has the headings Question, Reproduction, Population sensitivity, Uncertainty, Calibration, Mitigation and who pays, The case for each side, Established and disputed, Limits. Its tables are generated, and a test checks the headings and scans for any row-level identifiers.',
      ],
      acceptanceTests: [
        'On all 7,214 rows, with higher risk meaning `score_text` other than Low, Black defendants (3,696) have TP 1,369, FP 805, FN 532, TN 990, giving FPR 44.85, FNR 27.99 and PPV 0.6297. White defendants (2,454) have TP 505, FP 349, FN 461, TN 1,139, giving FPR 23.45, FNR 47.72 and PPV 0.5913. These match the published 44.9 and 23.5, and 28.0 and 47.7, percent. Base rates are 0.5143 and 0.3936.',
        'The filters leave 6,172 rows. The date window removes all 1,042, including 307 with no value, and the other filters remove none in this file. Black defendants (3,175): TP 1,188, FP 641, FN 473, TN 873, FPR 42.34, FNR 28.48, PPV 0.6495. White defendants (2,103): TP 414, FP 282, FN 408, TN 999, FPR 22.01, FNR 49.64, PPV 0.5948. Hispanic (509): FPR 19.38, FNR 58.20. Other (343): FPR 12.79, FNR 66.13. Asian (31) and Native American (11) are reported as too small to estimate, using a minimum group size of 50.',
        'Chouldechova: for each group, $p/(1-p) \\cdot (1-\\mathrm{PPV})/\\mathrm{PPV} \\cdot (1-\\mathrm{FNR})$ equals FPR to within $10^{-9}$ using exact counts.',
        'Uncertainty on the 6,172 rows: the FPR gap is 20.33 points, with an interval lower bound of 16.5 to 17.5 and upper bound of 23.0 to 24.0. The PPV gap is 5.47 points, with a lower bound of 0.5 to 2.0 and upper bound of 9.0 to 10.5. Both intervals exclude 0.',
        'Calibration and ranking on the 6,172 rows: AUC of `decile_score` is 0.7098 overall, 0.7043 for Black and 0.6928 for white defendants. At decile 1 the observed rates are 0.233 (n=365) and 0.212 (n=605). At decile 10 they are 0.837 (n=227) and 0.700 (n=50). Two-feature logistic regression on `age` and `priors_count` gives a 5-fold accuracy of 0.67 to 0.69, against 0.6607 for the score at decile 5.',
        'Thresholds: one shared threshold at decile 5 gives accuracy 0.6582 over Black and white defendants. Thresholds of 7 for Black and 5 for white defendants give FPR 22.79 and 22.01, FNR 49.25 and 49.64, PPV 0.7096 and 0.5948, and accuracy 0.6489. For Black defendants, FP falls from 641 to 345 and FN rises from 473 to 818, so 296 fewer people are wrongly flagged and 345 more are missed, and the burden table shows exactly these numbers. Among pairs in 2 to 10 with an FPR gap of at most 2 points, the most accurate is (6, 4), at 0.6506.',
      ],
      resources: [
        {
          title: 'ProPublica COMPAS analysis repository',
          url: 'https://github.com/propublica/compas-analysis',
          type: 'dataset',
          cost: 'free',
          provider: 'ProPublica',
          note: 'Contains identifying fields. Read the data rules in this spec before downloading.',
        },
        {
          title: 'How We Analyzed the COMPAS Recidivism Algorithm',
          url: 'https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm',
          type: 'article',
          cost: 'free',
          provider: 'ProPublica',
          note: 'The published table and method.',
        },
        {
          title: 'Fair prediction with disparate impact',
          url: 'https://arxiv.org/abs/1610.07524',
          type: 'article',
          cost: 'free',
          provider: 'Alexandra Chouldechova',
          note: 'The identity checked in your tests.',
        },
      ],
      stretchGoals: [
        'Repeat the fairness metrics for violent recidivism using the file `compas-scores-two-years-violent.csv` with the same data rules, and state what changes.',
        'Simulate how much FPR gaps would change if re-arrest undercounted or overcounted offending differently by group, as a sensitivity analysis with stated assumptions.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-who-pays',
    title: 'who-pays: what privacy noise would do to a real funding formula',
    repoName: 'who-pays-for-privacy',
    summary: 'Build an open simulator that runs a school funding formula on privacy-protected counts, shows which communities would gain and lose money at each privacy level, sets that against a measured privacy benefit, and turns the result into a policy brief.',
    language: 'Python 3.12',
    estimatedHours: 40,
    overview: `Differential privacy is usually argued in the abstract. Yet statistics move money. US federal education funding depends on estimates of children in poverty for each school district, so a choice about privacy is also a choice about budgets. \`who-pays\` makes this concrete: it runs a stylised funding formula on noisy versions of real public counts, and reports who would gain and who would lose, for each privacy setting.

Some results run against intuition, so check yours with care. In a reference run on 13,143 districts with an illustrative pool of 1 billion dollars, Laplace noise at $\\varepsilon = 0.1$ moved about 8.1 million dollars. The smallest fifth of districts gained on net while the largest fifth lost, yet about 396 eligible districts dropped out in a typical draw. Meanwhile, the ordinary change from one year's SAIPE estimates to the next moved about 55.4 million dollars under the same formula. That is a striking comparison, and it does not mean noise is harmless, since yearly change includes real change in poverty, which a formula should follow. The point of the project is to state such things carefully.

**Measure both sides.** A tool that only counts the cost of privacy is an argument for less of it. So you also measure a benefit: how well an attacker reconstructs people from small tables, on a synthetic population only.

**Stay honest about the model.** SAIPE figures are themselves model-based estimates, not exact counts, and the Census Bureau does not publish them with the noise you add. The real Title I formula has further factors, including state expenditure and hold-harmless rules. This is a stylised simulation, the pool is illustrative, and no output is an actual allocation. Say so in the README and on every chart.

**Data rules.** SAIPE district estimates are public aggregates, with no login. Reconstruction work uses only invented blocks. Freeze the input files by hash. The 2023 file's SHA-256 is \`dfe75543379ad2e16f39f82f63f14b5664b5bb0338788478df22ef46309534b0\`, and the 2022 file's is \`8d0a09a4ca1d15d38454a9d4489b485da487a7e83fa6130ea431e2fc0946b930\`. This project is education, not legal or policy advice to any agency.`,
    setup: {
      extensions: [...pythonExtensions, 'redhat.vscode-yaml', 'github.vscode-github-actions', 'tamasfe.even-better-toml'],
      toolchain: [
        ...pythonToolchain,
        'Install with `pip install pandas numpy matplotlib pyyaml python-calamine pytest`. Read the Excel 97 `.xls` files with `pd.read_excel(path, header=None, dtype=str, skiprows=3, engine="calamine")`.',
        'Download the district files from the Census SAIPE datasets pages: `ussd23.xls` under `datasets/2023/2023-school-districts/` and `ussd22.xls` under `datasets/2022/2022-school-districts/` at `www2.census.gov/programs-surveys/saipe/`. No login is required.',
      ],
      structure: `who-pays-for-privacy/
├── policies/                 # YAML: formula, mechanism, epsilon, mitigation
├── src/whopays/data.py       # hash check, parsing, joins
├── src/whopays/formula.py    # pure allocation functions
├── src/whopays/mechanism.py  # Laplace and post-processing
├── src/whopays/simulate.py   # Monte Carlo
├── src/whopays/burden.py     # who gains, who loses
├── src/whopays/reconstruct.py# synthetic blocks only
├── src/whopays/report.py     # static HTML report
├── site/                     # generated
├── docs/POLICY-BRIEF.md
├── docs/STAKEHOLDERS.md
├── docs/DATA-ACCESS.md
├── docs/LEGAL-NOTES.md
├── tests/
├── pyproject.toml
└── .github/workflows/ci.yml`,
      commands: [
        { label: 'Install in editable mode', command: 'pip install -e ".[dev]"' },
        { label: 'Run one policy', command: 'python -m whopays run policies/basic-eps-0.1.yaml --draws 2000 --seed 2020' },
        { label: 'Run every policy', command: 'python -m whopays run-all policies/' },
        { label: 'Run the privacy side', command: 'python -m whopays reconstruct --blocks 20000 --people 5 --cells 8' },
        { label: 'Build the report', command: 'python -m whopays report --out site/' },
        { label: 'Run the tests', command: 'pytest' },
      ],
    },
    requirements: [
      '`data.py` verifies file hashes, parses the sheets, keeps district ID as text with leading zeros, drops the Puerto Rico row for comparability, handles the 6 districts with no children aged 5 to 17, and joins years on state FIPS plus district ID.',
      '`formula.py` holds pure functions. The basic formula makes a district eligible if it has at least 10 counted children and they are more than 2 percent of the population aged 5 to 17, modelled on 20 U.S.C. 6333(b). The concentration formula makes it eligible with more than 6,500 children or more than 15 percent, modelled on 20 U.S.C. 6334(a). Eligible districts share a fixed pool in proportion to their counts.',
      '`mechanism.py` adds Laplace noise of scale $1/\\varepsilon$ independently to each district count, rounds, and clamps at zero. The docs explain why one count per district costs $\\varepsilon$ once under parallel composition, assuming each child counts in one district, and why population denominators are treated as public here.',
      'A policy is a YAML file naming formula, pool, $\\varepsilon$, draws, seed and mitigation. Running a policy needs no code changes, and results record the file hash, the seed and the input hashes.',
      '`burden.py` reports, for each policy, the total misallocated (half the sum of absolute differences), mean net change by size quintile, expected numbers of districts losing and gaining eligibility, the money by state, and the share of districts with a loss above 5 percent of their allocation, by quintile.',
      'At least one mitigation is implemented and costed: a hold-harmless top-up, in which a central pool pays each district any shortfall against its noise-free allocation. The report says that this is computable only in simulation, and explains what a real scheme could use instead. It shows who pays for the top-up.',
      '`reconstruct.py` draws synthetic blocks, publishes noisy cell counts, rebuilds counts by rounding and clamping, and reports recall, precision and F1 against the truth, with a random-guess baseline. No real person or geography appears in it.',
      'The report is one self-contained static site with a chart of privacy benefit against money moved, a table by quintile and state, and a stated caveat on every chart that the model is stylised. A benchmark compares noise with the year-to-year change, and says clearly why these are different things.',
      '`docs/STAKEHOLDERS.md` maps stakeholders and burdens. `docs/DATA-ACCESS.md` records sources, terms and why this project needs no individual-level data. `docs/LEGAL-NOTES.md` gives dated notes on Title 13 confidentiality and the funding statutes, states that it is not legal advice, and lists what was checked and where.',
      '`docs/POLICY-BRIEF.md` has the headings Summary, The decision, Who gains, Who pays, Options, Strongest objection, What is established, What is disputed, Recommendation, Limits. It is at most 2 pages, and a test checks headings and length. It addresses both a Census-side reader and a school-district reader.',
    ],
    acceptanceTests: [
      'Fixture: counts `[100, 50, 9, 10, 200]`, populations aged 5 to 17 `[1000, 1000, 100, 600, 12000]` and a pool of 1,000,000 give allocations of 666,666.67, 333,333.33, 0, 0 and 0. District 3 fails the 10-child test, and districts 4 and 5 fail the more-than-2-percent test at 1.67 percent. Changing the third count to 11 gives 621,118.01, 310,559.01, 68,322.98, 0 and 0.',
      'Real data, excluding Puerto Rico: 13,143 districts in 2023, 13,152 in 2022, 13,137 matched. Total counted children in 2023 are 8,138,784, of whom 8,133,212 are in eligible districts. 12,445 districts are eligible, 644 have under 10 children, and 6 have no children aged 5 to 17. A pool of 1 billion dollars gives 122.95 per child. Size quintiles by ranked population aged 5 to 17, ties broken by file order, have maxima of 320, 823, 1,729, 4,132 and 1,188,989, and true allocations of 7.74, 25.87, 58.24, 124.88 and 783.27 million.',
      'Basic formula with at least 2,000 draws. Total misallocated in millions: $\\varepsilon$ 0.01 gives 69.5 to 73.0; 0.05 gives 15.4 to 16.1; 0.1 gives 7.9 to 8.25; 0.5 gives 1.58 to 1.68; 1 gives 0.76 to 0.81; 10 gives 0.004 to 0.008. Reference means were 71.25, 15.75, 8.06, 1.63, 0.79 and 0.006, across two seeds.',
      'At $\\varepsilon = 0.1$: net change is about +0.485 million in the smallest quintile (accept 0.42 to 0.55) and about -0.36 million in the largest (accept -0.45 to -0.27). Expected districts losing eligibility are 396 (accept 385 to 407) and gaining 221 (accept 212 to 229). At $\\varepsilon = 0.01$ those are 2,236 (accept 2,190 to 2,280) and 329 (accept 315 to 345), with quintile nets of about +12.5 and -20.3 million.',
      'Comparison and second formula: between 2022 and 2023 on matched districts, under the basic formula, 55.41 million moves (5.54 percent). The concentration formula has 5,605 eligible districts, and with 500 or more draws misallocates about 109.7, 12.45 and 1.37 million at $\\varepsilon$ of 0.01, 0.1 and 1 (accept within 3 percent), with about 502 eligible districts lost at 0.1 (accept 485 to 520).',
      'Reconstruction on 20,000 synthetic blocks of 5 people in 8 equally likely cells. F1 is 0.11, 0.40, 0.59, 0.78, 0.95 and 1.00 at $\\varepsilon$ of 0.1, 0.5, 1, 2, 5 and 10 (accept within 0.03), and a random guess of 5 people gives 0.40. So in this toy setting, reconstruction does no better than guessing at $\\varepsilon$ of 0.5 or below. Recall alone is misleading here: it was 0.53 at $\\varepsilon = 0.1$, while precision was 0.06, and the report must explain why.',
    ],
    coverage: [
      { module: 'ethics-for-data-work', demonstrates: 'A stakeholder and burden analysis frames the project, and the brief states the strongest objection to its own recommendation.' },
      { module: 'privacy', demonstrates: 'Laplace noise, budget reasoning, post-processing and a synthetic reconstruction study measure both the benefit and the cost of privacy.' },
      { module: 'bias-and-fairness', demonstrates: 'Disaggregated results by size, state and eligibility margin audit how errors fall, and the report argues which definition of fair applies.' },
      { module: 'data-access', demonstrates: 'A data access record explains why public aggregates suffice, and synthetic blocks replace any individual-level data.' },
      { module: 'sector-cases', demonstrates: 'The project is a worked public-sector case on government statistics and education funding, tied to real public files.' },
      { module: 'policy-responses', demonstrates: 'Dated legal notes on Title 13 and the funding statutes, plus a policy brief with costed options for decision makers.' },
    ],
    portfolio: [
      'The README opens with one chart of privacy benefit against money moved, one sentence of what it shows, and the caveat that this is a stylised simulation.',
      'The site is live on GitHub Pages, and a reader can select a state and privacy level to see who gains and who loses.',
      'Anyone can add a formula with a YAML file, and the README shows this in a five-minute walkthrough.',
      'The policy brief is linked from the top of the README, and is written for a reader who has never heard of differential privacy.',
      'CI runs the tests and rebuilds a small version of the report, and a tagged release records input hashes and seeds so that any chart can be regenerated.',
      'At least one person who works in education or statistics has read the brief, and their strongest disagreement is recorded in the repository, with permission.',
    ],
    resources: [
      {
        title: 'SAIPE datasets',
        url: 'https://www.census.gov/programs-surveys/saipe/data/datasets.html',
        type: 'dataset',
        cost: 'free',
        provider: 'US Census Bureau',
        note: 'Choose a year, then the school district file.',
      },
      {
        title: '20 U.S.C. 6333',
        url: 'https://www.law.cornell.edu/uscode/text/20/6333',
        type: 'documentation',
        cost: 'free',
        provider: 'Legal Information Institute',
        note: 'Basic grants. Eligibility is in subsection (b). See also 6334 for concentration grants.',
      },
      {
        title: 'Census: disclosure avoidance',
        url: 'https://www.census.gov/programs-surveys/decennial-census/decade/2020/planning-management/process/disclosure-avoidance.html',
        type: 'documentation',
        cost: 'free',
        provider: 'US Census Bureau',
        note: 'The real-world policy context.',
      },
    ],
    stretchGoals: [
      'Join NCES locale codes, and report results for rural, town, suburban and city districts.',
      'Add a discrete mechanism, and compare it with rounded Laplace noise.',
      'Treat the published SAIPE estimates as uncertain as well, and compare how much allocation depends on that uncertainty with how much it depends on the privacy noise.',
    ],
  },
});
