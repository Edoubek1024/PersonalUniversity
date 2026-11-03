import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. A laptop CPU is enough, and no GPU is needed.',
];

export default defineCoursework({
  subjectId: 'modeling-and-learning',
  machineProblems: [
    {
      slug: 'mp1-peerwatt',
      title: 'peerwatt: how much energy should this building use?',
      afterModule: 'model-selection',
      coversModules: ['modeling-and-linear-models', 'model-selection'],
      summary:
        'Use public facts about 3,400 large Chicago buildings to predict their energy use with linear models, catch four kinds of leakage, and find out what the leftover residual really measures.',
      language: 'Python 3.12',
      estimatedHours: 14,
      overview: `Chicago requires its large buildings to report their energy use each year, and it publishes the results. That makes a practical question possible: given only what a city already knows about a building, its type, size, age and neighbourhood, how much energy should it use? A building far above its prediction might be worth a visit from an energy auditor. That idea, comparing a building with its statistical peers, is the whole basis of energy benchmarking.

You will build \`peerwatt\`, a study that predicts the logarithm of site energy use intensity (EUI) with linear models only. You climb a ladder from a mean, to a mean by property type, to least squares, splines and interactions, then ridge and lasso, and each rung must earn its place in a table.

The results teach more than a high score would. In a test run, property type alone took holdout RMSE from 0.52 to 0.42 log units, and every further feature added almost nothing. The best honest model has an $R^2$ of about 0.33 and is typically off by a factor of 1.5. Then the traps appear. Adding the weather-normalised EUI column lifts $R^2$ to 0.93, because it is the target in disguise. Giving ridge a one-hot building ID looks like an error of 0.25 under ordinary k-fold, and 0.40 under grouped folds, because the same building appears in many years.

The most interesting finding comes last. About 89% of the residual variance is stable between buildings rather than noise from year to year. So what is left over is a real, persistent property of each building, even though your features cannot explain it. The question for your report is what it means, and what it does not.

**Constraints.** Use scikit-learn \`Pipeline\`, \`ColumnTransformer\`, \`LinearRegression\`, \`Ridge\` and \`Lasso\`, and write your own baselines. No trees, no nearest neighbours and no neural networks, since this MP stays with what Modules 1 and 2 teach. Hyperparameters come from grouped cross-validation on training buildings, and the holdout is scored once, at the end.

**Frozen snapshot.** The portal updates this table, so save one CSV, record its SHA-256, and keep \`Data Year\` at 2023 or earlier. Later edits can move results slightly, which is why the tests use ranges.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas scikit-learn matplotlib pytest ruff jupyter ipykernel`.', 'Download the data from `https://data.cityofchicago.org/api/views/xq83-jr8c/rows.csv?accessType=DOWNLOAD`. It is about 7 MB and needs no login.'],
        structure: `peerwatt/
├── peerwatt/data.py       # snapshot, cleaning, leak guard
├── peerwatt/features.py   # the ColumnTransformers for each rung
├── peerwatt/baselines.py  # mean, mean by type, last-year persistence
├── peerwatt/ladder.py     # runs every rung, writes results/ladder.csv
├── peerwatt/leakage.py    # canary features and the building ID test
├── peerwatt/residuals.py  # residual table and variance split
├── notebooks/figures.ipynb
├── tests/                 # your acceptance tests, written with pytest
├── data/                  # the frozen CSV and its hash, not committed
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install the package in editable mode', command: 'pip install -e .' },
          { label: 'Run the whole ladder', command: 'python -m peerwatt.ladder --seed 0 --out results/' },
          { label: 'Run the leakage checks', command: 'python -m peerwatt.leakage --out results/' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`data.py` saves a CSV with its SHA-256 and keeps rows with `Data Year` at most 2023, `Reporting Status` of `Submitted` or `Submitted Data`, non-missing site EUI, floor area, year built, property type and community area, site EUI from 10 to 1,000, and year built from 1850 to the data year. The target is $\\log$ of site EUI.',
        'The loader has an allow list of feature columns and raises an error if `Source EUI`, either weather-normalised EUI, GHG columns, any fuel use column, `Water Use`, `ENERGY STAR Score` or `Chicago Energy Rating` reaches a feature matrix.',
        'Features are $\\log$ floor area, building age, $\\log$ of `# of Buildings` with missing as 1 and clipped at 20, data year, a flag for 2020, property type and community area. Categories use `OneHotEncoder(handle_unknown="ignore", min_frequency=30)`, and missing values never force a row out after cleaning.',
        'The holdout is every row of `numpy.random.default_rng(0).choice(sorted_ids, size=int(0.2 * n), replace=False)`, where `sorted_ids` are the unique building IDs after cleaning. Every other split inside training uses `GroupKFold(5)` on building ID.',
        'The ladder has at least these rungs: mean, mean by property type, least squares on numeric features, least squares with property type, then with community area, then with `SplineTransformer(n_knots=6, degree=3)` on $\\log$ area and age, then ridge and lasso with the splines plus interactions of property type with $\\log$ area and age, for each type with at least 100 training rows.',
        'Ridge and lasso choose alpha on a log grid by grouped CV, and also report the one-standard-error choice. Each rung of the ladder reports grouped CV mean and standard deviation of RMSE, plain k-fold RMSE, and the holdout RMSE and $R^2$ measured once.',
        'All preprocessing sits in a `Pipeline`, so scalers and encoders are fitted within each fold. One test proves this by showing that replacing holdout rows with garbage does not change any fitted parameter.',
        '`leakage.py` adds each suspect column to a `Ridge(alpha=1)` model on the numeric features, property type and community area, one column at a time, with missing values set to the training median and $\\log$ applied where the column is positive, and reports the holdout $R^2$ for each. It also fits `Ridge(alpha=1)` with a one-hot building ID added, under both grouped and plain k-fold, and reports a last-year persistence baseline for rows with a record in the year before.',
        '`residuals.py` gives holdout residuals by property type and splits residual variance into between-building and within-building parts, using the variance of building means as the share. It lists the 10 holdout buildings with the highest mean residual by ID, without naming owners.',
        '`REPORT.md` is about 3 pages: the ladder table, coefficients read as percent changes, a residual plot, why the extra features add little, what the persistent residual might be (equipment, occupancy, poor data), and what it cannot show, including why it does not prove a building is wasteful.',
      ],
      acceptanceTests: [
        'The cleaned table has 22,000 to 22,600 rows from 3,380 to 3,480 buildings, with about 22,322 and 3,430 expected, and about 54 property types. No building is on both sides of the holdout, which has 660 to 710 buildings and about 4,460 rows. The target has a standard deviation of 0.45 to 0.50.',
        'Holdout RMSE lies in these ranges: mean 0.50 to 0.54, mean by type 0.40 to 0.44, least squares on numeric features 0.49 to 0.53, with type 0.41 to 0.45, and with splines, type and area 0.40 to 0.44. Grouped CV RMSE for the same rungs is 0.45 to 0.48, 0.39 to 0.42, 0.45 to 0.48, 0.39 to 0.42 and 0.38 to 0.41.',
        'Best ridge and best lasso each have a grouped CV RMSE of 0.38 to 0.41 and a holdout RMSE of 0.40 to 0.44, and no rung beats mean by type on the holdout by more than 0.02. The lasso keeps fewer coefficients than ridge, with about 107 of 146 at alpha near 3e-4, and about 66 under the one-standard-error rule. Your report shows that its choice of coefficients varies across folds.',
        'Canary features lift holdout $R^2$ from about 0.33 to above 0.88 for weather-normalised site EUI, above 0.75 for source EUI, above 0.72 for GHG intensity, above 0.50 for ENERGY STAR score, and above 0.40 for electricity per square foot. The normal loader raises an error for each of those columns.',
        'Ridge with a one-hot building ID gives a plain k-fold RMSE of 0.22 to 0.27 and a grouped RMSE of 0.38 to 0.42. The last-year persistence baseline gives an RMSE of 0.21 to 0.26 and a correlation of 0.84 to 0.90 on about 17,000 rows. Your report explains why persistence is not a fair competitor for a building with no history.',
        'At least 80% of holdout residual variance is between buildings, with about 89% expected. Between-building standard deviation of mean residuals is 0.35 to 0.45, and the mean within-building standard deviation is 0.14 to 0.22. Scaler parameters are unchanged when holdout rows are replaced with garbage.',
      ],
      resources: [
        {
          title: 'Chicago Energy Benchmarking',
          url: 'https://data.cityofchicago.org/Environment-Sustainable-Development/Chicago-Energy-Benchmarking/xq83-jr8c',
          type: 'dataset',
          cost: 'free',
          provider: 'City of Chicago Data Portal',
          note: 'Read the column descriptions first. Several columns are functions of the target.',
          primary: true,
        },
      ],
      stretchGoals: [
        'Compare the plain residual with a split in time: train through 2021, test on held-out buildings in 2022 and 2023, and measure the bias, which was about 0.014 log units in a test run.',
        'Fit the model separately to Multifamily Housing and K-12 School, and explain which features change meaning between them.',
      ],
    },
    {
      slug: 'mp2-backin30',
      title: 'backin30: who comes back to hospital within 30 days?',
      afterModule: 'unsupervised-learning',
      coversModules: ['classification', 'trees-and-non-linear-models', 'unsupervised-learning'],
      summary:
        'Rank 100,000 real hospital stays by readmission risk, compare every classical model under one honest protocol, set a budget-based operating point, and test whether patient clusters are worth anything.',
      language: 'Python 3.12',
      estimatedHours: 18,
      overview: `Hospitals in the US pay attention to patients who return within 30 days, because a return can mean that discharge went wrong and because payment can depend on it. A care team can only follow up with so many people. So the useful question is not "will this patient return?" but "if we can call 10% of patients, which 10%?"

You will answer it with \`backin30\`, built on a public table of 101,766 diabetic hospital encounters from 130 US hospitals between 1999 and 2008. You compare every classical model from this course under one protocol, then turn scores into a decision and find out what clusters add.

This is a good dataset because it is hard. In a test run, the number of prior admissions alone reached an AUC of 0.60. A full logistic regression reached 0.66, and the best boosted trees and forests reached about 0.67. An unrestricted decision tree scored 1.0 on training data and 0.53 on the test set. An RBF SVM on a 10,000 row subsample only got 0.59, and that is its practical limit here. Even so, a ranking with an AUC of 0.67 has real use: the top 10% of patients had a readmission rate of 27%, against 11% overall, and held a quarter of all returns. You will have to say honestly what that does and does not achieve.

The data also holds traps. Some discharge codes mean the patient died or went to hospice, so they cannot be at risk in the same way. Almost half the rows belong to patients with more than one stay. Class weighting leaves AUC alone and wrecks the probabilities. Calibrating an already calibrated model made it slightly worse. And clusters look persuasive in a UMAP plot while their silhouette scores stay below 0.2.

**Constraints.** Use scikit-learn plus \`umap-learn\`. Neural networks are not allowed, since they come in the next module. Every number comes from splits grouped by patient. The whole pipeline must run in under 20 minutes on a laptop CPU.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas scikit-learn umap-learn matplotlib pytest ruff jupyter ipykernel`.'],
        structure: `backin30/
├── backin30/data.py        # load, scope, diagnosis groups, features
├── backin30/split.py       # patient holdout and grouped folds
├── backin30/models.py      # every model with its tuning grid
├── backin30/evaluate.py    # AUC, AP, budget metrics, ECE, curves
├── backin30/calibrate.py   # Platt and isotonic on a separate fold
├── backin30/importance.py  # permutation importance on the holdout
├── backin30/clusters.py    # PCA, k-means, GMM, Ward, t-SNE, UMAP
├── backin30/__main__.py    # CLI: fetch, compare, cluster, report
├── tests/                  # your acceptance tests, written with pytest
├── data/                   # the UCI files, not committed
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Fetch the data', command: 'python -m backin30 fetch' },
          { label: 'Compare the models', command: 'python -m backin30 compare --seed 0 --out results/' },
          { label: 'Run the clustering study', command: 'python -m backin30 cluster --seed 0 --out results/' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`data.py` reads `diabetic_data.csv` with `?` as missing and removes rows with `discharge_disposition_id` of 11, 13, 14, 19, 20 or 21, using `IDS_mapping.csv` to justify each code. The target is `readmitted == "<30"`. It drops `weight`, which is 97% missing, and `encounter_id`.',
        'Numeric features are the 8 count columns, age as the midpoint of its band, the number of diabetes drugs in use, and the number changed up or down. Categorical features are race, gender, glucose and A1C results, insulin, `change`, `diabetesMed`, admission type, discharge disposition, admission source, payer, specialty with its 12 most common values kept, and `diag_1` to `diag_3` mapped to 9 ICD-9 groups, with missing as its own level.',
        'The holdout is every encounter of `numpy.random.default_rng(0).choice(sorted_patients, size=int(0.2 * n), replace=False)`. All tuning uses `GroupKFold` on `patient_nbr`, and a test proves that no patient crosses a split.',
        '`models.py` compares at least these under one protocol: the base rate, logistic regression on `number_inpatient` alone, full logistic regression, kNN, a shallow decision tree, an unrestricted tree, a random forest, `HistGradientBoostingClassifier`, `LinearSVC`, and an RBF `SVC` on 10,000 training rows. Each has a stated grid or a fixed setting with a reason.',
        '`evaluate.py` reports ROC AUC, average precision, Brier score and precision, recall and lift at budgets of 5%, 10% and 20%, each on the holdout. It also draws ROC and PR curves, and the report states the threshold each budget implies.',
        'A class-weighted fit of logistic regression and of boosting is compared with the unweighted fit. The report shows mean predicted probability, Brier score and expected calibration error over 10 equal-count bins for each, and explains the result.',
        '`calibrate.py` keeps 20% of training patients aside, fits Platt scaling and isotonic regression on them, and compares reliability diagrams on the holdout, then states whether to keep calibration. A plain row-level k-fold AUC is reported beside the grouped one, whatever the gap.',
        '`importance.py` gives permutation importance on the holdout for the best model, with AUC as the score and at least 5 repeats, and a table of the budget metrics by age band and race, with the sample size of each cell.',
        '`clusters.py` standardises the 11 numeric features on training rows, reads the first two principal components from their loadings, then runs k-means for k from 2 to 10 with inertia and silhouette on a 5,000 row sample, a diagonal Gaussian mixture with BIC, and Ward linkage on that sample with adjusted Rand index against k-means. It draws t-SNE and UMAP on that sample.',
        '`REPORT.md` is about 4 pages: the model table, one budget recommendation in plain words, the calibration verdict, named clusters with sizes and rates, whether cluster labels improve the model, and limits. Limits include data from 1999 to 2008, nothing about what happens after discharge, return to a different hospital possibly going unseen, and that a risk score does not show which patients a call would help.',
      ],
      acceptanceTests: [
        'The raw file has 101,766 rows, 71,518 patients and 11,357 positives. Removing 2,423 rows leaves 99,343 rows and 69,990 patients with a positive rate of 0.114, and about 46% of those rows belong to patients with more than one stay. The removed rows have a positive rate of about 0.018. The holdout has 19,500 to 19,800 rows.',
        'Holdout ROC AUC lies in these ranges: `number_inpatient` alone 0.59 to 0.62, full logistic regression 0.65 to 0.675, kNN with $k = 101$ on standardised features 0.62 to 0.65, a tree of depth 6 with at least 50 rows per leaf 0.63 to 0.66, an unrestricted tree 0.51 to 0.56 with training AUC above 0.99, a random forest 0.66 to 0.685, boosting 0.66 to 0.685, `LinearSVC` 0.65 to 0.675, and RBF `SVC` on 10,000 rows 0.56 to 0.64.',
        'For the best model, precision in the top 10% is 0.25 to 0.29 and recall is 0.22 to 0.27, against a base rate near 0.11, so lift is 2.2 to 2.7. In the top 20%, precision is 0.20 to 0.23 and recall is 0.36 to 0.42. Average precision is 0.21 to 0.24.',
        'With `class_weight="balanced"`, AUC moves by less than 0.01, mean predicted probability rises from about 0.11 to above 0.40, Brier score rises from below 0.10 to above 0.20, and expected calibration error rises above 0.30. Unweighted boosting has an ECE below 0.012 with no calibration. If Platt or isotonic does not lower it on the holdout, your report keeps the raw model and says why. In a test run neither did.',
        'Grouped and row-level k-fold AUC for boosting differ by less than 0.01, with about 0.673 and 0.672 expected, and your report explains why the grouped version is still the right protocol. Permutation importance puts `number_inpatient` first with an AUC drop of 0.06 to 0.10, then discharge disposition at 0.03 to 0.06, and no other feature above 0.015.',
        'The first two principal components hold 30% to 36% of the variance, with PC1 loading on length of stay and medications and PC2 on prior visits. Silhouette is below 0.20 for every k from 2 to 10. At $k = 5$ the highest-rate cluster is under 8% of rows with a rate of 0.22 to 0.30, and the lowest has a rate of 0.06 to 0.09. BIC for the diagonal mixture keeps falling through 14 components. Ward and k-means agree only partly, with an ARI of 0.2 to 0.6. Adding cluster labels changes boosting AUC by less than 0.01.',
      ],
      resources: [
        {
          title: 'Diabetes 130-US Hospitals for Years 1999-2008',
          url: 'https://archive.ics.uci.edu/dataset/296/diabetes+130-us+hospitals+for+years+1999-2008',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'The zip holds `diabetic_data.csv` and `IDS_mapping.csv`. Read the variable table on this page before you build features.',
          primary: true,
        },
      ],
      stretchGoals: [
        'Keep only the first encounter of each patient, and measure how much the top features and AUC change.',
        'Set a threshold from a stated cost of a missed return and of an unnecessary call, and show how the choice moves as the ratio changes.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-trialstop',
    title: 'trialstop: can a registry record tell you a trial will stop early?',
    repoName: 'trialstop',
    summary:
      'Use 40,000 public clinical trial records to predict which trials will stop early, audit every leak, compare classical and neural models on a CPU, and explain what the model can and cannot say.',
    language: 'Python 3.12',
    estimatedHours: 55,
    overview: `Clinical trials stop early more often than you might expect. Volunteers have given their time, and funding is spent, with no complete answer at the end. ClinicalTrials.gov publishes a record for each trial, so a real question can be asked in public: on the day a trial starts, does its record already say anything about whether it will finish?

You will build \`trialstop\`, a complete modeling study on a frozen snapshot of the registry. It has a regression, a set of classifiers under one protocol, an atlas of trials from text embeddings, neural models you train on a CPU, and a report that is honest about cause. Every module of the course is in it.

The hook is how the number falls as you remove what the model should not know. Add the enrolment count to a boosted model and test AUC reaches 0.81. That looks like a breakthrough, but for a finished trial the field holds the actual number enrolled, so a stopped trial has already written its fate there. Remove it and AUC is about 0.67. The feature that now leads is the gap between the start date and the first posting, and it hides a second, subtler leak. Trials posted more than a year after they started were stopped only 7% of the time, because someone who registers a finished trial has usually finished it. Keep only trials on the record by 30 days after the start, and the honest answer is an AUC of 0.64, with a 95% interval of 0.625 to 0.656.

That is the result, and the report defends it. The top 10% of test trials stopped 38% of the time, against 22% overall. Text embeddings from a pretrained model help predict enrolment, taking RMSE from 1.05 to 0.98, but their gain on stopping has an interval that includes zero. A CNN trained from scratch on the text is the weakest of the text models at 0.60. In a test run, the model under-predicted the stopping rate on the test years because the sample changes over time, and part of that is that long trials that started recently have not finished yet.

**What the model cannot tell you.** The API gives today's version of each record, not the version at registration, so fields can be edited after the fact, and that limit cannot be removed here. A SHAP value says what the model used, not why a trial stopped. The \`whyStopped\` text gives reasons, and it cannot be a feature. No result here should guide a decision about a real trial or participant, and the project is independent of the NIH and the National Library of Medicine.

**Frozen windows.** Train on starts from 2008 to 2016, tune on 2017, and evaluate once on 2018 and 2019.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...pyToolchain,
        'Install the CPU build of PyTorch first: `pip install torch --index-url https://download.pytorch.org/whl/cpu`. Then `pip install numpy scipy pandas pyarrow scikit-learn umap-learn shap sentence-transformers plotly matplotlib pytest ruff jupyter ipykernel`, and freeze them with `pip freeze > requirements.lock`.',
        'The data comes from `https://clinicaltrials.gov/api/v2/studies`, with no login. Ask for pages of 1,000 with `query.term=AREA[StudyType]INTERVENTIONAL AND AREA[StartDate]RANGE[2008-01-01,2019-12-31]`, `filter.overallStatus=COMPLETED,TERMINATED,WITHDRAWN,UNKNOWN` and a `fields` list, and follow `nextPageToken`. About 200,000 records took under 4 minutes and came to 220 MB of gzip. Save them once, record the SHA-256 and the `dataTimestamp` from `/api/v2/version`, and never refetch in the pipeline.',
        'The first run of the embedding step downloads `all-MiniLM-L6-v2`, about 90 MB, with no login. With 128 tokens per text it encoded about 100 trials a second on 10 CPU threads. Expect 7 to 30 minutes for the study set, depending on your laptop, then cache the result to disk.',
      ],
      structure: `trialstop/
├── trialstop/fetch.py      # paged API download, hash and version
├── trialstop/scope.py      # flatten records, apply the scope rules
├── trialstop/features.py   # allow list, leak guard, ColumnTransformers
├── trialstop/enrolment.py  # regression ladder on completed trials
├── trialstop/classify.py   # classical models under one protocol
├── trialstop/embed.py      # sentence embeddings with a disk cache
├── trialstop/neural.py     # MLP and 1-D text CNN in PyTorch
├── trialstop/atlas.py      # PCA, k-means, UMAP, interactive HTML map
├── trialstop/evaluate.py   # budget metrics, shift, bootstrap, subgroups
├── trialstop/explain.py    # permutation, PDP, ICE, SHAP
├── trialstop/reasons.py    # whyStopped keyword analysis
├── trialstop/__main__.py   # CLI: fetch, build, all, explain, score
├── tests/                  # includes a 2,000 record fixture
├── docs/MODEL_CARD.md
├── report/report.md        # 8 to 12 pages
├── .github/workflows/ci.yml
├── requirements.lock
└── README.md`,
      commands: [
        { label: 'Fetch and freeze the snapshot', command: 'python -m trialstop fetch --out data/' },
        { label: 'Build the study table and embeddings', command: 'python -m trialstop build --seed 0' },
        { label: 'Run the whole study and rebuild the report tables', command: 'python -m trialstop all --seed 0 --out results/' },
        { label: 'Explain one trial in the snapshot', command: 'python -m trialstop explain NCT01533753' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
        { label: 'Lint', command: 'ruff check .' },
      ],
    },
    requirements: [
      '`fetch.py` pages through the API, retries on failure, and writes gzip JSON lines with a SHA-256 and the API `dataTimestamp`. `scope.py` keeps `COMPLETED` and `TERMINATED` trials in phases `PHASE1+PHASE2`, `PHASE2`, `PHASE2+PHASE3`, `PHASE3` and `PHASE4`, with `TERMINATED` as the positive class. A month-only date takes the first of that month. Withdrawn and unknown trials are excluded and counted.',
      '`scope.py` also removes any trial first posted more than 30 days after its start. The report shows the stopping rate by registration lag before this filter, and AUC with the lag, without it, and on the filtered scope, to explain why the filter exists.',
      '`features.py` has an allow list: sponsor class, phase, allocation, model, masking, purpose, healthy volunteers, counts of collaborators, conditions, keywords, arms, primary and secondary outcomes and each main intervention type, criteria length, minimum and maximum age in years, and days from first posting to start. The loader raises an error if enrolment, `hasResults`, any completion date, `whyStopped` or status reaches a feature matrix.',
      '`enrolment.py` predicts $\\log$ actual enrolment for completed trials: mean, mean by phase, ridge, lasso, boosting, and ridge with embeddings. It reads coefficients as percent changes, and shows residuals by phase and year. Alpha is tuned on the 2017 trials.',
      '`classify.py` compares logistic regression on phase and sponsor, logistic regression on all features, TF-IDF with logistic regression, a random forest, `HistGradientBoostingClassifier`, an SVM of your choice with a stated subsample, and kNN, under the frozen windows. Hyperparameters use 2017 only, and the test years are scored once.',
      '`embed.py` encodes the title plus the first 600 characters of the summary with `all-MiniLM-L6-v2` at 128 tokens, normalised, and caches by a hash of the text. `neural.py` trains an MLP on features plus embeddings with early stopping on 2017, over 3 seeds, and a 1-D CNN with a trainable `nn.Embedding` on tokenised text. It reports wall-clock time for each, with `torch.set_num_threads` set.',
      '`atlas.py` runs k-means with $k = 20$ on training embeddings, names each cluster from its top TF-IDF terms, gives its stopping rate with a train-to-test rank correlation, and writes an interactive UMAP map to HTML. It also reports silhouette and states how weak the structure is. Cluster labels are descriptions, and the report says so.',
      '`evaluate.py` gives AUC, average precision and precision and recall at the top 10%, with a 1,000 resample bootstrap for AUC and for the difference between the two best models. It compares mean predicted risk with the observed rate by year, tries an intercept shift fitted on 2017, and gives metrics by sponsor class and phase, with cells under 100 trials marked as too small.',
      '`explain.py` gives permutation importance on the test years, PDP and ICE for the lag and criteria length, and SHAP with `TreeExplainer` with an additivity check. A correlated feature pair is permuted as a group. `reasons.py` groups `whyStopped` into recruitment, business or funding, efficacy or futility, safety and COVID-19 by stated keywords, by sponsor class, and the report notes that the keywords overlap.',
      '`report/report.md` has a causal diagram for one feature and explains why the model cannot say that changing it would prevent a stop. `docs/MODEL_CARD.md` covers intended use, data, metrics by group, the edited-record limit, the change in the sample over time, and uses that are out of scope. One command regenerates all tables and figures.',
    ],
    acceptanceTests: [
      'The snapshot has about 200,000 records. The study scope before the lag filter has 58,000 to 64,000 trials, and after it 38,000 to 42,500, with about 61,309 and 40,321 expected. Windows have about 29,650, 3,760 and 6,900 trials with stopping rates of 0.15 to 0.175, 0.18 to 0.205 and 0.20 to 0.235. Before the filter, trials posted more than 365 days after start have a rate of 0.05 to 0.09, and those posted more than 180 days before start have a rate of 0.21 to 0.27.',
      'Test AUC for boosting with the leak guard off for enrolment is at least 0.76 both before and after the filter, with about 0.81 and 0.79 expected. After the filter, adding `hasResults`, the site count or a US site flag gives 0.64 to 0.67. Before the filter, boosting gets 0.66 to 0.69 with the lag and at least 0.01 less without it. After the filter, it gets 0.625 to 0.655 with the lag. The normal loader raises an error for enrolment and `hasResults`.',
      'Test AUC after the filter lies in these ranges: logistic regression on phase and sponsor 0.55 to 0.58, on all features 0.605 to 0.635, TF-IDF 0.62 to 0.65, embeddings alone 0.60 to 0.635, the MLP on features and embeddings 0.63 to 0.655 by seed and 0.635 to 0.665 averaged over 3 seeds, and the CNN 0.58 to 0.625. The bootstrap interval for boosting has a width of 0.02 to 0.04. The interval for the MLP minus boosting includes 0 in your run or your report explains why it does not.',
      'For boosting, precision in the top 10% is 0.35 to 0.41 and recall is 0.16 to 0.19, against a test rate near 0.217. Mean predicted risk on the test years is 0.15 to 0.19, below the observed rate. An intercept shift fitted on 2017 raises it and lowers Brier score below the unshifted model, and both beat the Brier score of about 0.173 from a constant at the training rate. Your report separates the possible causes of the shift: 2018 starts still running at snapshot time, about 1,300 of all phases against about 200 for 2012, plus changes in the sample and COVID-19.',
      'Permutation importance puts the lag first, with an AUC drop of 0.015 to 0.035, and SHAP additivity holds within 1e-6. On completed trials, RMSE in log units is 1.36 to 1.46 for the mean, 1.20 to 1.30 for mean by phase, 1.00 to 1.10 for ridge, 0.96 to 1.05 for boosting, and 0.93 to 1.02 for ridge with embeddings, which beats ridge alone by at least 0.03.',
      'k-means with $k = 20$ has a silhouette below 0.10. Cluster stopping rates in training run from under 0.06 for a vaccine cluster to over 0.22 for at least two oncology clusters, with a train-to-test Spearman correlation of at least 0.7. Of stopped trials in the scope before the lag filter, at least 30% of `whyStopped` texts match recruitment terms, and these make up a larger share for `OTHER` sponsors than for `INDUSTRY`, with about 0.49 and 0.23 expected, while business or funding terms show the opposite. Two runs with one seed give identical classical tables.',
    ],
    coverage: [
      { module: 'modeling-and-linear-models', demonstrates: 'The enrolment study has a log target, engineered features, baselines, percent-change coefficients and residual plots.' },
      { module: 'model-selection', demonstrates: 'Ridge and lasso are tuned on a held-out year inside pipelines, with leakage audited by canary features and a registration filter.' },
      { module: 'classification', demonstrates: 'Logistic regression, budget metrics at the top 10%, and calibration under a changing base rate replace a single accuracy number.' },
      { module: 'trees-and-non-linear-models', demonstrates: 'Boosting, a random forest, an SVM and kNN compete under the same frozen windows, with results read honestly.' },
      { module: 'unsupervised-learning', demonstrates: 'k-means, PCA and UMAP on embeddings give a named atlas of trials, with silhouette stating how weak the structure is.' },
      { module: 'deep-learning', demonstrates: 'Pretrained sentence embeddings, an MLP and a 1-D CNN are trained and cached on a CPU, and compared with simpler models.' },
      { module: 'interpretability-and-communication', demonstrates: 'Permutation importance, PDP, SHAP, a causal diagram and a model card explain the model and state what it cannot show.' },
    ],
    portfolio: [
      'The README opens with the falling AUC chart, from 0.81 with the leak to 0.64 honest, and a link to the interactive trial atlas, followed by reproduction steps that work on a fresh Windows machine.',
      'GitHub Actions runs the tests, lint and the classical pipeline on the 2,000 record fixture on every push, with a status badge in the README.',
      'The repository has a LICENSE, a data attribution note, `requirements.lock`, the snapshot hash and date, and a tagged `v1.0.0` release with the embeddings cache or the steps to rebuild it.',
      '`docs/MODEL_CARD.md` states clearly that this is an independent study and is not for decisions about a real trial or participant.',
      'The report is published as a PDF, and a one-page summary in plain language explains the result to someone who has never trained a model.',
    ],
    resources: [
      {
        title: 'ClinicalTrials.gov API',
        url: 'https://clinicaltrials.gov/data-api/api',
        type: 'documentation',
        cost: 'free',
        provider: 'US National Library of Medicine',
        note: 'Read how `query.term`, `fields` and `nextPageToken` work. The study data structure page explains each field.',
        primary: true,
      },
      {
        title: 'all-MiniLM-L6-v2',
        url: 'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2',
        type: 'tool',
        cost: 'free',
        provider: 'Sentence Transformers',
        note: 'The pretrained model behind `embed.py`. Check its token limit and intended use.',
      },
    ],
    stretchGoals: [
      'Fetch record history for a sample of trials from the website, and measure how many feature values changed after registration.',
      'Fit a discrete-time survival model to include still-running trials instead of dropping them, and compare the base rates by start year.',
    ],
  },
});
