import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. A laptop CPU and 8 GB of RAM are enough; no GPU is needed.',
];

export default defineCoursework({
  subjectId: 'data-mining',
  machineProblems: [
    {
      slug: 'mp1-retailcube',
      title: 'retailcube: from a dirty sales log to a data cube',
      afterModule: 'data-warehousing-and-olap',
      coversModules: ['introduction-and-data', 'data-preprocessing', 'data-warehousing-and-olap'],
      summary: 'Clean and profile half a million real invoice lines, build customer features with PCA from scratch, load a star schema, and compute the full and iceberg data cube with your own BUC, checked cell by cell against DuckDB.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `UCI **Online Retail** is the transaction log of a UK gift wholesaler from December 2010 to December 2011: 541,909 invoice lines, with cancellations, negative quantities, postage and fee codes, exact duplicates and a quarter of the rows without a customer ID. It is a realistic first job for a data miner, because almost nothing can be computed on it until it has been cleaned.

In this MP you build \`retailcube\`, a small package that takes the raw spreadsheet to an analysable warehouse. First comes an **audited cleaning pipeline**, where every rule reports how many rows it removed. Then you **profile** the data: attribute types, five-number summaries, and the skew that makes the mean quantity (10.6) more than twice the median (4). You build a **customer feature table** with PCA computed from the SVD, and **Jaccard neighbours** of customers. You load a **star schema** into DuckDB. Finally you compute the **data cube** over country, month, weekday and price band, both in full and as an **iceberg cube** with your own implementation of BUC, and you check it cell by cell against DuckDB's \`GROUP BY CUBE\`.

The finished numbers are concrete: 522,504 clean lines, a cube of 7,616 non-empty cells, and 1,822 cells with at least 100 lines. Your implementation has to reproduce them exactly.

**Constraints.** Use pandas and NumPy for the cleaning, features, PCA and cube algorithms. Use DuckDB, scikit-learn and SciPy only to *check* your results, except that DuckDB also stores the star schema. Do not commit the data; a fetch script downloads it.`,
      setup: {
        extensions: [...pyExtensions, 'mechatroner.rainbow-csv'],
        toolchain: [
          ...pyToolchain,
          'Install the packages: `pip install numpy pandas scipy scikit-learn duckdb openpyxl pyarrow matplotlib pytest ruff jupyter ipykernel`.',
          'Data: the zip at `https://archive.ics.uci.edu/static/public/352/online+retail.zip` contains `Online Retail.xlsx` (about 23 MB). Read it once with `pd.read_excel(..., dtype={"InvoiceNo": str, "StockCode": str})` and cache it as Parquet, because reading the spreadsheet takes a minute.',
        ],
        structure: `retailcube/
├── retailcube/fetch.py      # download, unzip, cache as parquet
├── retailcube/clean.py      # the four cleaning rules, with an audit log
├── retailcube/profile.py    # attribute types, summaries, IQR counts
├── retailcube/similarity.py # sparse Jaccard and cosine neighbours
├── retailcube/features.py   # customer table, log and z-score, PCA by SVD
├── retailcube/schema.py     # star schema in DuckDB
├── retailcube/cube.py       # full cube and BUC iceberg cube
├── retailcube/olap.py       # roll-up, drill-down, slice, dice, pivot on cells
├── retailcube/__main__.py   # CLI
├── tests/                   # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install in editable mode', command: 'pip install -e .' },
          { label: 'Fetch and cache the data', command: 'python -m retailcube fetch' },
          { label: 'Clean, profile, build features and the warehouse', command: 'python -m retailcube build --out results/' },
          { label: 'Compute the iceberg cube', command: 'python -m retailcube cube --min-sup 100 --out results/cube_100.parquet' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`clean.py` applies, in this order: drop invoices whose InvoiceNo starts with "C"; drop rows with Quantity <= 0 or UnitPrice <= 0; drop rows whose StockCode does not start with a digit; drop exact duplicate rows. It adds `Revenue = Quantity * UnitPrice` and writes an audit table with the row count after each rule.',
        '`profile.py` writes a table giving every column\'s attribute type (nominal, binary, ordinal, interval or ratio) with a one-line justification, and the five-number summary, mean, standard deviation and 1.5 IQR outlier count of Quantity, UnitPrice and Revenue.',
        'Derived dimensions are computed once and reused: `Month` as YYYY-MM, `Weekday` as the day name, and `PriceBand` from UnitPrice with left-closed bins [0, 1), [1, 2), [2, 5), [5, 10) and [10, infinity), labelled "<1", "1-2", "2-5", "5-10" and "10+".',
        '`similarity.py` builds a sparse customer-by-product binary matrix with `scipy.sparse` (rows with no CustomerID excluded) and returns the top-k customers by Jaccard and by cosine similarity for a given customer, without forming a dense 4,334 by 3,900 matrix.',
        '`features.py` builds one row per customer: recency (whole days from the last invoice date to 2011-12-10), frequency (distinct invoices), monetary (total revenue), products (distinct stock codes), basket (mean distinct stock codes per invoice) and price (mean UnitPrice over lines). It applies `log1p`, standardises with the population standard deviation, and computes PCA from `numpy.linalg.svd`.',
        '`schema.py` creates `fact_sales` at the grain of one cleaned invoice line, and `dim_date`, `dim_product` and `dim_customer` (with an explicit unknown-customer row), all in a DuckDB file with primary keys. A check confirms that fact revenue equals the cleaned DataFrame\'s revenue.',
        '`cube.py` computes the full cube over (Country, Month, Weekday, PriceBand) with count, sum of Quantity and sum of Revenue in two ways: one group-by per cuboid, and your own recursive BUC with a `min_sup` on count, ordering dimensions by decreasing cardinality. Aggregated dimensions are written as "*".',
        '`olap.py` answers roll-up, drill-down, slice, dice and pivot requests from the stored cube cells, never from the base data. It prints the equivalent SQL, and it computes average revenue per line as sum divided by count at the requested level.',
        '`REPORT.md` (2 to 3 pages) covers the cleaning audit and what each rule removed and why, the skew of the numeric attributes, the first two principal components and their loadings, and three OLAP findings with the cuboid each came from. It also says what the rows without a CustomerID do to customer-level conclusions.',
      ],
      acceptanceTests: [
        'The audit counts are exactly 541,909 raw, then 532,621, 530,104, 527,725 and 522,504 rows. The cleaned data have 19,773 invoices, 3,900 stock codes, 38 countries and 4,334 customers, 131,354 lines have no CustomerID, and total revenue is 10,246,820.87 within 0.5.',
        'Quantity has median 4, mean 10.64 (to 2 decimals) and maximum 80,995. There are no Saturday invoices, so Weekday has 6 values. The PriceBand counts are 109,474 for "<1", 136,718 for "1-2", 193,251 for "2-5", 61,244 for "5-10" and 21,817 for "10+".',
        'The full cube has 7,616 non-empty cells, of which 3,444 are in the base cuboid and 38 in the (Country) cuboid. With `min_sup = 100`, BUC returns exactly 1,822 cells (396 in the base cuboid). Both outputs equal DuckDB\'s `GROUP BY CUBE` and `HAVING COUNT(*) >= 100`, with the same counts and revenues within 1e-6.',
        'The PCA explained variance ratios are 0.508, 0.209, 0.160, 0.090, 0.030 and 0.003 (within 0.001), and they match `sklearn.decomposition.PCA` on the same matrix within 1e-8.',
        'The top Jaccard neighbour of customer 12347 (103 distinct products) is customer 17396, with similarity 0.1351 to 4 decimals. United Kingdom revenue is 8,724,045.22 within 0.5, and November 2011 is the month with the highest revenue at 1,452,112.69 within 0.5.',
        'Rolling the (Country, Month) cuboid up to (Country) inside `olap.py` gives exactly the stored (Country) cuboid. Average revenue per line for France, computed from sum and count, differs from the mean of France\'s monthly averages, and a test asserts the first value.',
      ],
      resources: [
        {
          title: 'Online Retail dataset',
          url: 'https://archive.ics.uci.edu/dataset/352/online+retail',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'Variable descriptions and the download. Read the note about cancellations (InvoiceNo starting with "C").',
          primary: true,
        },
        {
          title: 'DuckDB documentation: GROUPING SETS, ROLLUP and CUBE',
          url: 'https://duckdb.org/docs/stable/sql/query_syntax/grouping_sets',
          type: 'documentation',
          cost: 'free',
          provider: 'DuckDB',
          note: 'The reference your cube is checked against; GROUPING_ID helps tell aggregated cells from real NULLs.',
        },
      ],
      stretchGoals: [
        'Implement multiway array aggregation for the dense (Month, Weekday, PriceBand) sub-cube and compare memory with BUC for two chunk orders.',
        'Run the greedy view-selection algorithm on the 16 cuboids with their real sizes and report which 4 cuboids to materialise.',
      ],
    },
    {
      slug: 'mp2-patternminer',
      title: 'patternminer: itemsets, sequences and trees from scratch',
      afterModule: 'classification-basics',
      coversModules: ['frequent-pattern-mining', 'advanced-pattern-mining', 'classification-basics'],
      summary: 'Implement Apriori, FP-growth, closed and maximal mining, rule ranking with null-invariant measures, PrefixSpan, a C4.5-style decision tree and naive Bayes, and verify every one against a library or a known answer on real baskets, clickstreams and mushrooms.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `This MP is about the core algorithms of the course. You write them yourself and then prove they are right on three real datasets.

**Baskets.** The UK invoices of Online Retail, cleaned with your MP 1 rules, give 17,901 baskets over 3,894 products. You implement **Apriori** (join, prune and one scan per level) and **FP-growth** (FP-tree, conditional pattern bases and the single-path shortcut), and they must match \`mlxtend\` exactly: 412 itemsets at 2% support and 2,211 at 1%. Then you mine **closed and maximal** itemsets and learn something about sparse retail data: every frequent itemset here is closed, so closed patterns compress nothing, while maximal patterns drop 28%. You generate rules and rank them by lift, **Kulczynski and the imbalance ratio**. The Regency teacups (Kulczynski 0.742, IR 0.02) and the jumbo bags (Kulczynski 0.541, IR 0.34) show why one number is not enough.

**Clickstreams.** The UCI MSNBC data hold the page categories of about 990,000 sessions. On the first 100,000, with consecutive repeats collapsed, your **PrefixSpan** must find exactly the 126 patterns a reference package finds at 1% support. It also shows that ⟨frontpage, news⟩ (7,204 sessions) is a different pattern from ⟨news, frontpage⟩ (4,277).

**Mushrooms.** UCI Mushroom has 8,124 tuples with 22 categorical attributes. You implement a multiway **decision tree** with information gain, gain ratio and Gini, and **categorical naive Bayes** with Laplace smoothing. You reproduce the root split on odor (gain 0.906 bits), a perfect 10-fold accuracy for the tree, and naive Bayes's 95.5%, and you explain why the two differ.

**Constraints.** Use only the Python standard library, NumPy and pandas for the algorithms. Use mlxtend, the \`prefixspan\` package and scikit-learn only in tests and comparisons. Each algorithm lives in its own module, has a docstring stating its complexity, and is tested on a hand-checkable example before it runs on real data.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [
          ...pyToolchain,
          'Install the packages: `pip install numpy pandas scipy scikit-learn mlxtend prefixspan matplotlib pytest ruff jupyter ipykernel`.',
          'Data: Online Retail as in MP 1 (reuse its cleaned Parquet file); MSNBC from `https://archive.ics.uci.edu/static/public/133/msnbc+com+anonymous+web+data.zip` (the file `msnbc990928.seq.gz`); Mushroom from `https://archive.ics.uci.edu/static/public/73/mushroom.zip` (the file `agaricus-lepiota.data`, no header; column names are in `agaricus-lepiota.names`).',
        ],
        structure: `patternminer/
├── patternminer/baskets.py     # UK baskets from the MP 1 cleaned data
├── patternminer/apriori.py     # join, prune, count, with per-level stats
├── patternminer/fpgrowth.py    # FP-tree, conditional trees, single path
├── patternminer/summaries.py   # closed and maximal itemsets
├── patternminer/rules.py       # rules, lift, Kulczynski, IR, all-confidence
├── patternminer/prefixspan.py  # pseudo-projection PrefixSpan
├── patternminer/tree.py        # multiway tree: gain, gain ratio, Gini
├── patternminer/bayes.py       # categorical naive Bayes, log space
├── patternminer/__main__.py    # CLI: itemsets, rules, sequences, classify
├── tests/                      # hand examples and acceptance tests
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install in editable mode', command: 'pip install -e .' },
          { label: 'Mine itemsets and rules from the UK baskets', command: 'python -m patternminer itemsets --min-sup 0.02 --algo fpgrowth --rules --min-conf 0.5' },
          { label: 'Mine sequential patterns from MSNBC', command: 'python -m patternminer sequences --n 100000 --collapse --min-sup 0.01' },
          { label: 'Train and cross-validate the classifiers on Mushroom', command: 'python -m patternminer classify --folds 10 --seed 0' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        '`baskets.py` builds one basket per UK InvoiceNo as the sorted set of distinct StockCodes, from data cleaned with the four MP 1 rules, and reports the number of baskets and the mean and median basket size.',
        '`apriori.py` implements level-wise Apriori with the self-join on the first k - 2 items, the prune step and one pass over the baskets per level. It records the number of candidates after the join, after the prune, and frequent at each level, and it takes support as a fraction with the same `>=` rule as mlxtend.',
        '`fpgrowth.py` builds the FP-tree in two scans with a header table and node links, mines conditional pattern bases recursively, and outputs every combination directly when a conditional tree is a single path.',
        '`summaries.py` derives closed and maximal itemsets from the frequent itemsets with a superset index (not by comparing every pair), and a test checks the result against brute force on the 10-basket example from the lessons.',
        '`rules.py` generates all rules with confidence at least min_conf without rescanning, and computes support, confidence, lift, all-confidence, max-confidence, Kulczynski, cosine and the imbalance ratio. A command prints the top rules by any measure with product descriptions.',
        '`prefixspan.py` mines sequences of single-item elements with pseudo-projection (sequence index plus offset), counts support per sequence, and offers a `collapse` preprocessing step that merges repeated consecutive events.',
        '`tree.py` grows a multiway decision tree on categorical attributes with a choice of information gain, gain ratio or Gini, treats "?" as its own value, falls back to the parent majority for unseen values, and supports a minimum leaf size. It can print the tree as rules.',
        '`bayes.py` implements categorical naive Bayes with Laplace smoothing alpha in log space, returning normalised class probabilities.',
        'Evaluation uses `StratifiedKFold(10, shuffle=True, random_state=0)` for cross-validation and a stratified 80/20 split with `random_state=0` for the holdout. It reports accuracy, precision, recall and ROC AUC for the poisonous class, and a confusion matrix.',
        '`REPORT.md` (3 to 4 pages) covers run time against support for Apriori, FP-growth and mlxtend, why closed itemsets do not compress these baskets, the five rules you would show a buyer with their Kulczynski and IR, the clickstream patterns and what order adds, and why naive Bayes trails the tree on Mushroom.',
      ],
      acceptanceTests: [
        'There are 17,901 UK baskets with a mean size of 26.46 and a median of 15. At relative support 0.03, 0.02 and 0.01, both your Apriori and your FP-growth return exactly the itemsets and counts of mlxtend: 148, 412 (301 single items, 106 pairs and 5 triples) and 2,211 (the largest with 5 items). On the 10-basket lesson example at absolute support 3, Apriori reports candidates 5, 10 and 7 → 4, and frequent 5, 7 and 2.',
        'At support 0.02 there are 412 closed and 334 maximal itemsets, and at 0.01 there are 2,211 closed and 1,593 maximal. With min_conf 0.5 at support 0.02 there are 77 rules. The highest lift is 27.02, for WOODEN HEART CHRISTMAS SCANDINAVIAN ⇒ WOODEN STAR CHRISTMAS SCANDINAVIAN (confidence 0.723), and {ROSES REGENCY TEACUP AND SAUCER, GREEN REGENCY TEACUP AND SAUCER} ⇒ PINK REGENCY TEACUP AND SAUCER has confidence 0.703 and lift 17.92.',
        'For the pair 22697 and 22699 (green and roses Regency teacups), Kulczynski is 0.742 and IR is 0.020 (supports 932, 956 and 700 together). For 22386 and 85099B (pink and red jumbo bags), Kulczynski is 0.541 and IR is 0.336 (supports 1,159, 1,935 and 785). Adding 50,000 empty baskets leaves both values unchanged, and a test asserts that lift changes.',
        'On the first 100,000 MSNBC sequences with consecutive repeats collapsed, PrefixSpan at min_sup 0.01 (1,000 sequences) returns 126 patterns with lengths 1 to 5 counted 16, 56, 42, 11 and 1, and at 0.005 it returns 363, both equal to the `prefixspan` package. ⟨frontpage, news⟩ has support 7,204 and ⟨news, frontpage⟩ 4,277. The 4-sequence lesson example at min_sup 3 gives exactly 11 patterns.',
        'On Mushroom the class entropy is 0.9991 bits. At the root, odor has gain 0.9061, gain ratio 0.3906 and Gini reduction 0.4708; spore-print-color comes second with gain 0.4807; and veil-type has gain 0. A one-level tree on odor is 98.52% accurate on all 8,124 tuples. The full information-gain tree has 29 nodes, 24 leaves and depth 4, and its 10-fold accuracy is 1.000.',
        'Naive Bayes with alpha = 1 matches `CategoricalNB(alpha=1)` probabilities within 1e-9. Holdout accuracy is 0.959, with recall 0.918, precision 0.997 and ROC AUC 0.998 for poisonous. 10-fold accuracy is 0.955, falling to 0.896 with odor removed.',
      ],
      resources: [
        {
          title: 'mlxtend user guide: fpgrowth',
          url: 'https://rasbt.github.io/mlxtend/user_guide/frequent_patterns/fpgrowth/',
          type: 'documentation',
          cost: 'free',
          provider: 'Sebastian Raschka',
          note: 'The reference implementation for the itemset tests; the association_rules page documents the rule measures it computes.',
          primary: true,
        },
        {
          title: 'MSNBC.com anonymous web data',
          url: 'https://archive.ics.uci.edu/dataset/133/msnbc+com+anonymous+web+data',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'The file format and the 17 page categories, in order, are described on the page.',
        },
        {
          title: 'Mushroom dataset',
          url: 'https://archive.ics.uci.edu/dataset/73/mushroom',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'Attribute names and value codes; "?" in stalk-root marks a missing value.',
        },
      ],
      stretchGoals: [
        'Add Eclat with diffsets and compare peak memory with FP-growth at support 0.005.',
        'Extend PrefixSpan to elements that are itemsets (invoices as elements, customers as sequences) and mine the Online Retail purchase histories.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-readmit-mining',
    title: 'readmit-mining: a full data-mining study of hospital readmissions',
    repoName: 'readmit-mining',
    summary: 'Take ten years of public diabetes encounter records from 130 US hospitals through every stage of the course, from cleaning and cube-based exploration to patterns, sequences, honest classification, clustering and outliers, and publish what really predicts a readmission within 30 days.',
    language: 'Python 3.12',
    estimatedHours: 50,
    overview: `Hospital readmissions within 30 days are expensive, often preventable, and used to judge hospitals. The UCI **Diabetes 130-US hospitals** dataset records 101,766 inpatient encounters of 71,518 diabetic patients between 1999 and 2008, with demographics, admission and discharge details, up to three ICD-9 diagnoses, lab and medication information, and whether the patient was readmitted within 30 days, after 30 days, or not at all. The original study behind the data asked whether measuring HbA1c (the A1C test) was associated with fewer readmissions.

You will answer a broader question with every tool from this course: **what patterns, groups and anomalies in these encounters are associated with early readmission, and how well can it be predicted honestly?** The answer is humbling, and that is the point. In a test run the best patient-grouped model reached an ROC AUC of about 0.67 and an average precision of 0.23, against a base rate of 0.114. Leaky shortcuts were easy to find. A feature built from the patient's total number of encounters, which uses the future, pushed AUC from 0.63 to 0.76.

The project has a clear arc:

- **Clean and understand** the data. Exclude encounters that ended in death or hospice, because those patients cannot be readmitted. Map ICD-9 codes into a concept hierarchy, and document the 97% missing weight field.
- **Explore with a cube**: readmission rate by age, admission type, diagnosis group and A1C result. Readmission rate is an algebraic measure, so roll it up correctly.
- **Mine patterns**: itemsets and rules that end in "readmitted within 30 days", judged by lift and Kulczynski, plus sequences of diagnosis groups across a patient's encounters.
- **Classify** under patient-grouped cross-validation, with your own tree and naive Bayes against ensembles, and choose an operating point from a follow-up budget, not from 0.5.
- **Cluster and detect outliers** in the utilisation features, and say what the weak cluster structure is still good for.

**Rules.** Every split keeps all of a patient's encounters on one side. All thresholds and parameters are chosen inside training folds. The report states what the data cannot show: this is observational data from 1999 to 2008, and the associations it reveals are not causes.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions', 'mechatroner.rainbow-csv'],
      toolchain: [
        ...pyToolchain,
        'Install the packages: `pip install numpy pandas scipy scikit-learn duckdb mlxtend prefixspan pyarrow matplotlib pytest ruff jupyter ipykernel`, then freeze them with `pip freeze > requirements.lock`.',
        'Data: `https://archive.ics.uci.edu/static/public/296/diabetes+130-us+hospitals+for+years+1999-2008.zip` contains `diabetic_data.csv` (about 18 MB) and `IDS_mapping.csv`. Read it with `na_values="?"`. Record the zip\'s SHA-256 in the repository.',
        'Reuse your MP 1 cube code and your MP 2 FP-growth, PrefixSpan, tree and naive Bayes as installed packages or a vendored copy with tests.',
      ],
      structure: `readmit-mining/
├── readmit/data.py        # load, exclusions, types, missingness report
├── readmit/hierarchy.py   # ICD-9 groups and chapters, age bands
├── readmit/cube.py        # star schema and cube in DuckDB, iceberg cells
├── readmit/patterns.py    # items, FP-growth, rules to readmission, multilevel
├── readmit/sequences.py   # diagnosis-group sequences per patient, PrefixSpan
├── readmit/classify.py    # grouped CV, own tree and NB, ensembles, thresholds
├── readmit/clusters.py    # k-means++, DBSCAN, hierarchical, validation
├── readmit/outliers.py    # Mahalanobis (MCD), LOF, isolation forest
├── readmit/audit.py       # leakage canaries and split checks
├── readmit/__main__.py    # CLI: fetch, all, report
├── tests/                 # includes a 2,000-encounter fixture
├── report/report.md       # 8 to 12 pages, figures generated
├── .github/workflows/ci.yml
├── requirements.lock
└── README.md`,
      commands: [
        { label: 'Fetch the data and check its hash', command: 'python -m readmit fetch' },
        { label: 'Run every stage and regenerate the tables and figures', command: 'python -m readmit all --seed 0 --out results/' },
        { label: 'Rebuild the report from the results', command: 'python -m readmit report --results results/ --out report/' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
        { label: 'Lint', command: 'ruff check .' },
      ],
    },
    requirements: [
      '`data.py` loads the encounters, removes those with discharge_disposition_id in {11, 13, 14, 19, 20, 21} (expired or hospice) and the 3 rows with gender "Unknown/Invalid", sets the target to readmitted == "<30", and writes a table of every attribute\'s type and missing share.',
      '`hierarchy.py` maps diag_1 to diag_3 into nine groups (circulatory 390 to 459 and 785, respiratory 460 to 519 and 786, digestive 520 to 579 and 787, diabetes 250.xx, injury 800 to 999, musculoskeletal 710 to 739, genitourinary 580 to 629 and 788, neoplasms 140 to 239, other including V and E codes) and into three-digit codes. Age is an ordinal of ten bands and three coarse bands (<50, 50 to 69, 70+).',
      '`cube.py` loads a star schema into DuckDB and computes the cube over coarse age band, admission_type_id, primary diagnosis group and A1C result (with "none" for not measured). Readmission rate is rolled up as sum over count, iceberg cells have at least 200 encounters, and the report includes at least three drill-down findings.',
      '`patterns.py` mines, with your FP-growth at min_sup 0.01, the 17 items: med:X for metformin, repaglinide, glimepiride, glipizide, glyburide, pioglitazone, rosiglitazone and insulin (value not "No"), insulin:Up, insulin:Down, change, A1C:>8, age:70+, inpatient>=2, emergency>=1, stay>=7 and readmit<30. It reports rules with consequent readmit<30 ranked by lift and by Kulczynski with IR, and one multilevel comparison of diagnosis group against three-digit code.',
      '`sequences.py` builds, for each patient with at least two encounters, the sequence of primary diagnosis groups ordered by encounter_id. It mines it with your PrefixSpan at 5% support and discusses what repeated circulatory admissions imply.',
      '`classify.py` uses `GroupKFold(5)` on patient_nbr for every estimate. It compares a one-feature baseline (number_inpatient), your MP 2 tree and naive Bayes on discretised features, logistic regression, a random forest and `HistGradientBoostingClassifier`, reporting ROC AUC, average precision and recall in the top 10% of scores.',
      'Imbalance is handled explicitly: class weights against undersampling inside training folds with the prior correction, and an operating point chosen from a stated follow-up budget (calls for 10% of discharges), with precision and recall at that point and bootstrap confidence intervals resampled by patient.',
      '`audit.py` contains leakage canaries: a feature counting each patient\'s total encounters in the whole dataset, and a random (not grouped) split. It reports the inflation each causes, and a test fails if any production feature uses an encounter after the one being predicted.',
      '`clusters.py` runs your k-means++ (from MP 1 or new) for k = 2 to 8 on standardised log utilisation features (time_in_hospital, num_lab_procedures, num_procedures, num_medications, number_outpatient, number_emergency, number_inpatient, number_diagnoses), with silhouette on a 10,000-encounter sample, DBSCAN with a k-distance plot, and Ward clustering on a 5,000 sample. It reports readmission rate per cluster.',
      '`outliers.py` scores the same features with a robust Mahalanobis distance (MinCovDet), LOF on a sample and an isolation forest, compares their top 1% rankings, reports their readmission rates, and profiles the 20 most anomalous encounters. The 8 to 12 page report, regenerated by one command, covers every module and a limitations section.',
    ],
    acceptanceTests: [
      'The raw file has 101,766 encounters of 71,518 patients. After the exclusions there are 99,340 encounters of 69,987 patients with a readmit<30 rate of 0.1139 (within 0.0005). The primary diagnosis group "circulatory" has 29,680 encounters and "diabetes" 8,661, and weight is missing in 96.9% of the raw rows.',
      'The cube over (age band, admission type, diagnosis group, A1C result) has 1,430 non-empty cells, and 507 have at least 200 encounters. Encounters with no A1C measurement have a readmission rate of 0.117, while the measured groups (Norm, >7, >8) lie between 0.097 and 0.102. The report discusses this without claiming that measuring A1C causes fewer readmissions.',
      'At min_sup 0.01 the 17 items give 281 frequent itemsets. The rule {inpatient>=2} ⇒ {readmit<30} has support 0.031 (within 0.002), confidence 0.220 (within 0.005) and lift 1.93 (within 0.05), and adding insulin raises the lift only to about 1.98. Among the 16,341 patients with two or more encounters, ⟨circulatory, circulatory⟩ is the most frequent sequence, with support 3,695.',
      'Under GroupKFold(5), number_inpatient alone gives an AUC of 0.60 to 0.62. Logistic regression gives 0.65 to 0.67, the depth-6 tree 0.64 to 0.66, and the random forest and gradient boosting 0.665 to 0.68. The best average precision is at least 0.21 against a base rate of 0.114, and recall in the top 10% is 0.22 to 0.25.',
      'Gradient boosting on the 8 utilisation features alone gives an AUC of 0.62 to 0.65. Adding the canary feature (total encounters per patient) raises it above 0.75, and the audit flags it. The random split\'s AUC is reported next to the grouped one, and the report explains why they barely differ here while the canary is so large.',
      'k-means silhouettes for k = 2 to 8 lie between 0.15 and 0.21, and the readmission rates of the k = 5 clusters span at least 0.08 (in a test run, 0.088 to 0.184). The isolation forest (200 trees, seed 0) top 1% has a readmission rate of at least 0.24. Two runs with one seed produce identical tables.',
    ],
    coverage: [
      { module: 'introduction-and-data', demonstrates: 'The study is framed as a KDD process, and every attribute is typed and summarised, with distances chosen to fit each type.' },
      { module: 'data-preprocessing', demonstrates: 'Exclusions, missingness handling, ICD-9 concept hierarchies, discretisation and scaling are documented and audited.' },
      { module: 'data-warehousing-and-olap', demonstrates: 'A star schema and an iceberg cube with an algebraic readmission rate drive the exploratory drill-downs.' },
      { module: 'frequent-pattern-mining', demonstrates: 'Your FP-growth mines clinical items, and rules to readmission are ranked by lift, Kulczynski and IR.' },
      { module: 'advanced-pattern-mining', demonstrates: 'Constrained rules with a fixed consequent, a multilevel diagnosis comparison and PrefixSpan sequences over patients.' },
      { module: 'classification-basics', demonstrates: 'Your own tree and naive Bayes compete under patient-grouped cross-validation, with ROC and PR evaluation.' },
      { module: 'advanced-classification', demonstrates: 'Ensembles, class weights and undersampling with prior correction, and a budget-based operating point.' },
      { module: 'cluster-analysis', demonstrates: 'k-means++, DBSCAN and Ward clustering are validated with silhouettes and judged by their clinical usefulness.' },
      { module: 'outlier-detection', demonstrates: 'Robust Mahalanobis, LOF and isolation forest rankings are compared and the most anomalous encounters profiled.' },
    ],
    portfolio: [
      'The README opens with the headline table (baseline, best honest model and leaky canary, with AUC and average precision) and one figure, followed by reproduction steps that work on a fresh Windows machine.',
      'GitHub Actions runs the tests, lint and the whole pipeline on the 2,000-encounter fixture on every push, with a status badge in the README.',
      'The repository has a LICENSE, a data attribution and citation note for the UCI dataset, `requirements.lock` and a tagged `v1.0.0` release.',
      'The report is published as a PDF with a limitations section on observational data, coding changes and fairness across age and race groups.',
      'A short "what I would tell a hospital" summary of no more than one page links each claim to the table or figure that supports it.',
    ],
    resources: [
      {
        title: 'Diabetes 130-US Hospitals for Years 1999-2008',
        url: 'https://archive.ics.uci.edu/dataset/296/diabetes+130-us+hospitals+for+years+1999-2008',
        type: 'dataset',
        cost: 'free',
        provider: 'UCI Machine Learning Repository',
        note: 'Variable table and the citation of the original study on HbA1c measurement and readmission. Read the variable descriptions before building any feature.',
        primary: true,
      },
      {
        title: 'scikit-learn: GroupKFold',
        url: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GroupKFold.html',
        type: 'documentation',
        cost: 'free',
        provider: 'scikit-learn',
        note: 'The splitter that keeps each patient\'s encounters in one fold.',
      },
    ],
    stretchGoals: [
      'Add a chronological evaluation: train on patients whose first encounter has a smaller encounter_id, test on later ones, and compare with the grouped estimate.',
      'Audit the best model for differences in precision and recall across race and age groups and discuss what a hospital should do about them.',
    ],
  },
});
