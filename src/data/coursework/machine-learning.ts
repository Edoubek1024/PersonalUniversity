import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. A laptop CPU is enough, and no GPU is needed.',
];

export default defineCoursework({
  subjectId: 'machine-learning',
  machineProblems: [
    {
      slug: 'mp1-glmkit',
      title: 'glmkit: how far can a linear model go?',
      afterModule: 'linear-models',
      coversModules: ['foundations-and-workflow', 'linear-models'],
      supersedesProject: true,
      summary: 'Implement the linear family in NumPy, validate it against scikit-learn, then climb a ladder of features and link functions on real bike-share demand.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `Linear models are often dismissed as a baseline, yet on the right features with the right link function they are hard to beat. In this MP you will find out how far they can go.

First you write \`glmkit\`, a small NumPy library with preprocessing, grouped cross-validation, k-nearest neighbours, least squares, ridge, logistic and softmax regression, and Poisson regression. Each one is checked against scikit-learn on a small known dataset, because a model you cannot verify is a model you cannot trust.

Then you use it on the UCI **Bike Sharing** dataset: 17,379 hourly rental counts from Washington, D.C., in 2011 and 2012. You climb a ladder, starting from the mean and ending at a Poisson model with splines and interactions, and each rung must earn its place in a results table. In a test run, the climb took holdout RMSE from about 182 to about 53 bikes per hour. The most striking step changes no features at all. Switching from squared error to a Poisson likelihood cuts the error by about a third, because a count target with variance that grows with its mean is exactly what a Poisson model expects.

The dataset also has a trap. The columns \`casual\` and \`registered\` sum to the target, so they must never reach a model.

**Constraints.** Implement everything in \`glmkit\` with NumPy, plus \`scipy.optimize.minimize\` for the Poisson fit. Treat that optimizer as a black box, since the theory behind it comes later. Use scikit-learn only for checks, for \`SplineTransformer\`, and for \`Lasso\`, because the lasso solver is taught in a later module. No trees and no ensembles, since this MP is about the linear family.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas scikit-learn matplotlib pytest ruff jupyter ipykernel`.'],
        structure: `glmkit/
├── glmkit/preprocess.py   # StandardScaler, OneHotEncoder
├── glmkit/validate.py     # group_kfold, holdout by day
├── glmkit/knn.py          # brute-force kNN regressor and classifier
├── glmkit/linear.py       # LeastSquares, Ridge
├── glmkit/logistic.py     # LogisticRegression, SoftmaxRegression
├── glmkit/poisson.py      # PoissonRegression with analytic gradient
├── study/ladder.py        # runs every rung and writes results/ladder.csv
├── study/figures.ipynb    # paths, residuals, calibration, rate ratios
├── tests/                 # your acceptance tests, written with pytest
├── data/                  # hour.csv, downloaded by study/fetch.py
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install the package in editable mode', command: 'pip install -e .' },
          { label: 'Fetch the Bike Sharing data', command: 'python study/fetch.py' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Run the whole ladder', command: 'python study/ladder.py --seed 0 --out results/' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`preprocess.py` implements `StandardScaler` and `OneHotEncoder` with `fit` and `transform`. Unseen categories encode as all zeros, and nothing is learned at transform time.',
        '`validate.py` provides `group_kfold(groups, k, seed)`, and the study holds out 146 days chosen by `numpy.random.default_rng(0).choice(sorted_days, 146, replace=False)`. Every hour of a day stays on one side of each split.',
        '`knn.py` implements brute-force regression and classification with vectorized Euclidean distances, and a validation curve on the bike data chooses k.',
        '`linear.py` solves least squares with QR or SVD rather than an explicit inverse, and `Ridge` has a closed form that does not penalize the intercept.',
        '`logistic.py` trains binary logistic and softmax regression by full-batch gradient descent at a fixed learning rate with an L2 penalty, and it plots the loss curve.',
        '`poisson.py` fits a log-link model by passing your own loss and analytic gradient to `scipy.optimize.minimize(method="L-BFGS-B")`, and it has a finite-difference gradient check.',
        'The study drops `casual` and `registered`, and the loader raises an error if either column reaches a feature matrix. The target is `cnt`.',
        'The ladder has at least these rungs: mean, least squares on raw columns, kNN, least squares with one-hot `hr` and calendar columns, ridge and lasso with temperature and humidity splines and an `hr` by `workingday` interaction, and Poisson regression on those same features.',
        'Every rung reports grouped 5-fold mean and standard deviation of RMSE and mean Poisson deviance. Hyperparameters are chosen in cross-validation, and the 146-day holdout is scored once, at the end.',
        '`REPORT.md` is about 3 pages with ridge and lasso paths, residual and calibration plots, Poisson coefficients as rate ratios, and a section on what the linear family cannot capture.',
      ],
      acceptanceTests: [
        'On `load_diabetes`, `LeastSquares` matches `numpy.linalg.lstsq` and `Ridge(10)` matches scikit-learn `Ridge(alpha=10)` within 1e-8. With orthonormal columns and no intercept, ridge returns the least-squares weights divided by 1 + lambda, within 1e-10.',
        'On `load_breast_cancer` with a stratified 80/20 split at `random_state=0`, standardized on the training rows, 20,000 gradient steps at learning rate 0.25 and L2 strength 1/n on the mean loss match scikit-learn `LogisticRegression(C=1.0, tol=1e-10)` coefficients within 1e-3. Test accuracy is at least 0.97, against 0.63 for the majority class.',
        'On `load_digits` scaled to [0, 1] with the same split settings, softmax regression reaches at least 0.95 test accuracy, and your kNN with k = 3 is within 0.005 of scikit-learn `KNeighborsClassifier(3)`, at about 0.986.',
        'The analytic Poisson gradient matches finite differences with relative error below 1e-5 at a random point, and on the ladder features the fit matches scikit-learn `PoissonRegressor(alpha=1e-4)` within 1% on holdout mean Poisson deviance.',
        'Holdout RMSE lies in these ranges: mean 170 to 195, raw least squares 130 to 150, kNN at k = 10 on standardized raw columns 105 to 125, one-hot least squares 95 to 110, ridge 70 to 82, Poisson 47 to 60. Poisson RMSE is at least 20% below ridge on the same features, and its mean deviance is below 16 against above 45 for ridge, with ridge predictions clipped to at least 0.001 first.',
        'Adding `casual` and `registered` directly to a fit gives a least-squares RMSE below 1, which your test uses to show the leak, and the normal loader raises an error for those columns. Scaler parameters do not change when holdout rows are replaced with garbage, and no `dteday` appears on both sides of any split.',
      ],
      resources: [
        {
          title: 'Bike Sharing dataset',
          url: 'https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'Use `hour.csv` from the zip. The dataset page explains each column.',
          primary: true,
        },
      ],
      stretchGoals: [
        'Add a negative binomial likelihood to handle overdispersion, and compare its holdout deviance with the Poisson model.',
        'Repeat the ladder on the dataset you chose for your Module 1 brief, and explain which rungs matter there.',
      ],
    },
    {
      slug: 'mp2-reelrank',
      title: 'reelrank: a two-stage movie recommender',
      afterModule: 'unsupervised-learning',
      coversModules: ['classification-and-evaluation', 'trees-ensembles-and-kernels', 'unsupervised-learning'],
      summary: 'Build the architecture real recommenders use: matrix factorization to retrieve candidates, gradient boosting to re-rank them, and honest ranking metrics to prove each stage adds value.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Recommendation systems at large companies usually have two stages. A fast **retrieval** model narrows millions of items to a few hundred, and a richer **ranking** model orders those. In this MP you build that architecture on **MovieLens 1M**: one million ratings from 6,040 users on about 3,700 movies.

You start by writing two matrix factorization models in NumPy using alternating least squares. One fits explicit star ratings and one treats every rating as an implicit signal of interest. They teach the surprise at the centre of this field. The explicit model wins on RMSE, and it then loses to plain popularity at ranking, with NDCG@10 near 0.09 against 0.12 in a test run. The implicit model nearly doubles popularity at about 0.22.

Next you add a gradient boosting re-ranker. It is trained on interactions the retrieval model has never seen, so that its most important feature is not inflated by rows it was fitted on. You then evaluate it as a classifier, with ROC and PR curves and calibration, and you find out whether calibration is worth doing here.

Finally you read the learned item factors with PCA and k-means, and you defend the system against fake users with an anomaly score.

**Constraints.** Implement both ALS models and every metric in NumPy. Use scikit-learn for gradient boosting, random forests, PCA, k-means and isolation forests, and do not use a recommender library. The whole pipeline must run in under 15 minutes on a laptop CPU. Do not commit the data, since the MovieLens license forbids redistribution.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas scikit-learn matplotlib pytest jupyter ipykernel`.'],
        structure: `reelrank/
├── reelrank/data.py       # load, split, encode ids, build sparse matrices
├── reelrank/baselines.py  # global mean, item mean, biases, popularity
├── reelrank/als.py        # explicit matrix factorization
├── reelrank/ials.py       # implicit-feedback matrix factorization
├── reelrank/metrics.py    # RMSE, NDCG@k, Recall@k, ECE
├── reelrank/rerank.py     # features and the second-stage model
├── reelrank/explore.py    # PCA, clusters, nearest neighbours
├── reelrank/shilling.py   # fake-profile injection and detection
├── reelrank/__main__.py   # CLI: fetch, train, evaluate, recommend
├── tests/                 # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Fetch MovieLens 1M', command: 'python -m reelrank fetch' },
          { label: 'Train every stage', command: 'python -m reelrank train --seed 0' },
          { label: 'Evaluate and write the report tables', command: 'python -m reelrank evaluate --out results/' },
          { label: 'Get recommendations for one user', command: 'python -m reelrank recommend --user 42 --k 10' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        '`data.py` reads the `::`-separated files, reading `movies.dat` as Latin-1, and splits rating rows 80/10/10 with `default_rng(0).random(n)` in file order. Validation and test rows whose user or movie is absent from training are dropped.',
        '`baselines.py` provides the global mean, item mean, regularized user and item biases fitted by alternating updates, and a popularity ranker.',
        '`als.py` fits the residuals after biases with alternating closed-form solves for user and item factors, and logs the regularized objective and validation RMSE after each sweep.',
        '`ials.py` fits implicit feedback with confidence weight $1 + \\alpha$ on observed pairs. It uses the shared Gram matrix so that a sweep costs far less than a full dense solve per user.',
        '`metrics.py` computes NDCG@10 and Recall@10 for users with at least one test rating of 4 or more. The candidates are all movies absent from that user\'s training and validation rows, and both the ideal DCG and the recall denominator use min(relevant, 10).',
        '`rerank.py` takes the top 100 implicit candidates per user and labels a candidate positive if it is a validation rating of 4 or more. It computes at least 10 features from training data only and fits `HistGradientBoostingClassifier`, tuned with user-grouped folds and compared against `RandomForestClassifier`.',
        'A random 25% of validation users are reserved for calibration. Report ROC and PR curves, a reliability diagram, and 10-bin expected calibration error before and after Platt scaling and isotonic regression, then state whether calibration was worth keeping.',
        '`explore.py` runs PCA on item factors, compares k-means for k from 5 to 30 with silhouette scores, names at least six clusters, and states how weak or strong the structure is.',
        '`shilling.py` injects 100 fake users who each give 5 to one target movie with 20 to 40 training ratings, plus ratings on 50 movies drawn from the 150 most rated, set to that movie\'s training mean plus Gaussian noise with standard deviation 0.3, rounded to 1 through 5. It scores users with an isolation forest and with their mean absolute deviation from item means, where lowest is most suspicious.',
        '`REPORT.md` has the results table for every stage, an error analysis sliced by user activity and movie popularity, a note on cold start and feedback loops, and an ablation that removes one feature group at a time from the re-ranker.',
      ],
      acceptanceTests: [
        'Test RMSE at seed 0 is 1.105 to 1.125 for the global mean, 0.97 to 0.99 for item means, and 0.90 to 0.92 for biases.',
        'Explicit ALS with k = 20 and lambda = 20 over 12 sweeps never increases its regularized objective, and test RMSE is at most 0.870, with about 0.861 expected.',
        'Test NDCG@10 is 0.10 to 0.13 for popularity, 0.06 to 0.10 for explicit ALS, and 0.20 to 0.24 for implicit ALS with k = 32, lambda = 20, alpha = 10 and 6 sweeps. Explicit ALS ranks below popularity, and your report explains why.',
        'The re-ranker raises test NDCG@10 by at least 0.02 over implicit ALS on the same candidates, with about 0.265 expected, and ROC AUC on test candidates is 0.78 to 0.83, against a positive rate near 0.057. Report a second run trained on the rows used to fit retrieval beside it. In a test run it lost about 0.01 of AUC, so the gap is real but smaller than you might expect.',
        'Expected calibration error on test candidates is below 0.02 after whichever calibration you keep. The cosine neighbours of Toy Story (1995) among movies with at least 50 ratings include Toy Story 2 (1999) in the top 5, and the top 2 for Star Wars: Episode IV are Episodes V and VI.',
        'With 100 injected users, mean absolute deviation achieves precision@100 of at least 0.85. Report the isolation forest beside it, and explain the difference, which in a test run was large because shills look average on most generic features.',
      ],
      resources: [
        {
          title: 'MovieLens 1M dataset',
          url: 'https://files.grouplens.org/datasets/movielens/ml-1m-README.txt',
          type: 'dataset',
          cost: 'free',
          provider: 'GroupLens, University of Minnesota',
          note: 'The README gives the file formats and license. Download from `https://files.grouplens.org/datasets/movielens/ml-1m.zip`.',
          primary: true,
        },
        {
          title: 'Collaborative Filtering for Implicit Feedback Datasets',
          url: 'http://yifanhu.net/PUB/cf.pdf',
          type: 'article',
          cost: 'free',
          provider: 'Hu, Koren and Volinsky',
          note: 'The paper behind `ials.py`. Sections 2 and 4 give the confidence weights and the fast update.',
        },
      ],
      stretchGoals: [
        'Replace the random split with a per-user chronological split using the timestamps, and measure how much the metrics fall.',
        'Add a diversity constraint that limits recommendations per genre, and plot NDCG@10 against diversity.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-inspectrank',
    title: 'inspectrank: which Chicago restaurants should be inspected first?',
    repoName: 'inspectrank',
    summary: 'Turn 15 years of public food inspection records into a leak-audited ranking model, a served and monitored system, and an honest fairness report on real neighbourhoods.',
    language: 'Python 3.12',
    estimatedHours: 55,
    overview: `Chicago publishes every food inspection since 2010, over 300,000 rows, and it has fewer inspectors than it has kitchens to visit. If a model could put the likely failures at the top of the list, unsafe kitchens would be found sooner with the same staff. The city piloted that idea years ago. You will build a modern, public, fully audited version, using data you can download today.

The hook is how much an honest model finds. In a test run on routine inspections from 2024 and 2025, the official risk tier scored an AUC of only 0.52, barely better than chance. A leak-free model built on inspection history reached about 0.64, and it found about 40% more failures than the risk tier in the first 30% of inspections.

The project is full of the traps that separate real ML from tutorials:

- **Leakage.** Violations recorded on the same row as the result push AUC to about 0.79, and none of that is real.
- **Validation.** A random split reports about 0.66, while a split in time gives 0.64.
- **Concept drift.** After Chicago changed its food code in July 2018, the share of Pass with Conditions results among routine inspections jumped from about 15% to 55%.
- **Fairness.** Precision is nearly equal across neighbourhoods grouped by hardship, while recall differs by more than 20 points. Your report has to explain how both can be true and what the city should do about it.

The result is a repository a stranger can clone to reproduce the numbers, score a fresh month of inspections, and see the ranked list on a map.

**Frozen windows.** Train on inspections through 2022, tune on 2023, and evaluate once on 2024 and 2025. The portal updates daily, so freeze one snapshot and record its hash.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions', 'humao.rest-client'],
      toolchain: [
        ...pyToolchain,
        'Install the packages: `pip install numpy scipy pandas pyarrow scikit-learn shapely mlflow fastapi uvicorn pydantic folium matplotlib httpx pytest ruff jupyter ipykernel`, then freeze them with `pip freeze > requirements.lock`.',
        'Data sources on the Chicago Data Portal: inspections from `https://data.cityofchicago.org/api/views/4ijn-s7e5/rows.csv?accessType=DOWNLOAD` (about 350 MB), community areas from `https://data.cityofchicago.org/resource/igwz-8jzy.geojson?$limit=100`, and hardship from `https://data.cityofchicago.org/api/views/kn9c-c2s2/rows.csv?accessType=DOWNLOAD`.',
        'Docker Desktop on WSL 2 is optional for packaging the service. The project runs without it.',
      ],
      structure: `inspectrank/
├── inspectrank/data.py       # fetch, hash, schema checks, parquet snapshot
├── inspectrank/features.py   # point-in-time features only
├── inspectrank/text.py       # past-violation TF-IDF, SVD and themes
├── inspectrank/priors.py     # empirical Bayes failure rates
├── inspectrank/models.py     # model families and forward-chaining CV
├── inspectrank/optim.py      # your proximal gradient L1 logistic solver
├── inspectrank/evaluate.py   # budget metrics, calibration, ablations, bootstrap
├── inspectrank/fairness.py   # hardship terciles and group metrics
├── inspectrank/monitor.py    # PSI, KS, and retraining triggers
├── inspectrank/serve.py      # FastAPI service
├── inspectrank/__main__.py   # CLI: fetch, all, score
├── configs/                  # one YAML per experiment
├── tests/                    # includes a 2,000 row sample fixture
├── api.http                  # sample requests for the REST Client extension
├── docs/MODEL_CARD.md
├── report/report.md          # 8 to 12 pages
├── .github/workflows/ci.yml
├── requirements.lock
└── README.md`,
      commands: [
        { label: 'Fetch and freeze a snapshot', command: 'python -m inspectrank fetch' },
        { label: 'Run the whole pipeline and rebuild the report tables', command: 'python -m inspectrank all --seed 0 --out results/' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
        { label: 'Start the API', command: 'uvicorn inspectrank.serve:app --port 8000' },
        { label: 'Score a batch and draw the map', command: 'python -m inspectrank score --month 2025-12 --budget 0.3 --map results/map.html' },
        { label: 'Browse tracked experiments', command: 'mlflow ui --backend-store-uri ./mlruns' },
      ],
    },
    requirements: [
      '`data.py` freezes a snapshot with its SHA-256, runs schema checks, and scopes the problem to `Inspection Type` exactly `Canvass`, a valid `License #`, and `Results` of Pass, Pass w/ Conditions or Fail, with Fail as the positive class.',
      '`features.py` builds at least 12 features using only rows strictly before each inspection date: failure history, previous violation counts, days since last inspection, license age, facility type, risk tier, ZIP and season. A property test proves this.',
      '`text.py` turns only past violation text into TF-IDF features and SVD components fitted inside each training fold, and k-means themes are named and shown in the report.',
      '`priors.py` fits a Beta prior to failure counts per license by marginal likelihood, and adds the posterior mean as an empirically shrunk failure rate.',
      '`models.py` compares at least four families under identical forward-chaining CV with tuning inside it: regularized logistic regression, gradient boosting, a random forest, and an RBF kernel model through Nystroem features, alongside baselines from the risk tier and raw failure rate.',
      '`optim.py` solves L1 logistic regression with your own proximal gradient method in NumPy, shows its convergence curve, and includes a learning curve that separates bias from variance for the chosen model.',
      'The chosen model is calibrated, and an operating point is set from an inspector budget and a stated cost of a missed failure. The results table has bootstrap confidence intervals resampled by license, and an ablation table covers feature groups and pipeline steps.',
      'Error analysis finds at least three failure categories, and one intervention is executed with its measured effect. `fairness.py` joins inspections to 77 community areas and reports selection rate, precision, recall and calibration by hardship tercile, noting that the hardship index comes from 2008 to 2012 census data.',
      '`serve.py` provides `/score` and `/rank` with Pydantic validation and loads the same pipeline artifact used offline. The batch command writes a ranked list and a Folium map, and every run is tracked in a local MLflow store with config, data hash and metrics.',
      '`monitor.py` reports PSI and KS statistics on features and the label rate against a reference window with a stated retraining trigger. `docs/MODEL_CARD.md` and an 8 to 12 page report are generated from tracked results, and one command regenerates all of it.',
    ],
    acceptanceTests: [
      'The 2024 and 2025 test window has 16,000 to 18,000 rows and a failure rate of 0.21 to 0.25. For 1,000 random inspections, every feature is unchanged after all rows on or after that inspection date are deleted from the raw table.',
      'A canary test adds the same-row violation count as a feature: test AUC rises above 0.75 and your leakage audit flags it. A random 80/20 split reports an AUC at least 0.01 above the split in time.',
      'On the test window, AUC is at most 0.55 for the risk tier, 0.58 to 0.62 for the raw prior failure rate, and at least 0.63 for the final model. Recall in the top 30% of inspections is at most 0.34 for the risk tier and at least 0.42 for the final model. Reordering each month by score moves failures 2 to 4 days earlier on average.',
      'At a 30% budget across terciles of the test rows by hardship index, precision differs by at most 0.06 between terciles, recall differs by at least 0.10, and the highest-hardship tercile is selected at least 1.5 times as often as the lowest. If your model differs, the report explains why.',
      'Offline and API scores agree within 1e-9 on 1,000 rows, malformed input returns HTTP 422, and p95 single-request latency on a laptop CPU is below 100 ms. Your proximal gradient solver reaches an objective within 1e-4 of scikit-learn on a fixed L1 logistic problem.',
      'Replaying history with fixed bins on the same-row violation count gives PSI below 0.05 for 2016 against 2015 and for 2017 against 2016, and above 0.25 for 2019 against 2017, which fires the retraining trigger. Two runs with one seed produce identical metric tables.',
    ],
    coverage: [
      { module: 'foundations-and-workflow', demonstrates: 'Baselines, a frozen split in time, and a written leakage audit frame the whole project before any model is tuned.' },
      { module: 'linear-models', demonstrates: 'Regularized logistic regression is a serious contender, and its coefficients are interpreted as odds ratios.' },
      { module: 'classification-and-evaluation', demonstrates: 'Budget-based operating points, PR curves, calibration and an executed error analysis replace a single accuracy number.' },
      { module: 'trees-ensembles-and-kernels', demonstrates: 'Gradient boosting, random forests and a Nystroem RBF model compete under identical cross-validation.' },
      { module: 'unsupervised-learning', demonstrates: 'SVD and k-means turn violation text into named themes that become useful, leak-free features.' },
      { module: 'optimization-and-generalization-theory', demonstrates: 'A proximal gradient solver, a bias-variance learning curve and a Beta prior fitted by marginal likelihood apply the theory directly.' },
      { module: 'ml-engineering', demonstrates: 'Point-in-time pipelines, tracked experiments, a tested API, drift monitoring, a fairness audit and a model card make it a system.' },
    ],
    portfolio: [
      'The README opens with a screenshot of the ranked map and a three-row table: risk tier, leaky model and honest model, followed by reproduction steps that work on a fresh machine.',
      'GitHub Actions runs the tests, lint and a smoke pipeline on the 2,000 row fixture on every push, with a status badge in the README.',
      'The repository has a LICENSE, a data attribution note, `requirements.lock`, and a tagged `v1.0.0` release with the trained pipeline attached as a release asset.',
      '`docs/MODEL_CARD.md` covers intended use, data, metrics by group and known failure modes, and it states clearly that the project is independent of the City of Chicago.',
      'The report is published as a PDF with the leakage, drift and fairness findings summarized in the README.',
    ],
    resources: [
      {
        title: 'Food Inspections',
        url: 'https://data.cityofchicago.org/Health-Human-Services/Food-Inspections/4ijn-s7e5',
        type: 'dataset',
        cost: 'free',
        provider: 'City of Chicago Data Portal',
        note: 'Read the description of each column and of the July 2018 food code change before you build features.',
        primary: true,
      },
      {
        title: 'Food inspections evaluation',
        url: 'https://github.com/Chicago/food-inspections-evaluation',
        type: 'tool',
        cost: 'free',
        provider: 'City of Chicago',
        note: 'The city\'s own earlier forecasting work. Read it for context, and compare your choices with it instead of copying them.',
      },
    ],
    stretchGoals: [
      'Add 311 sanitation complaints and weather as features, each joined point in time, and report what they add in the ablation table.',
      'Simulate a year of inspections with the model in the loop, and measure the feedback effect of only observing outcomes for the kitchens you visit.',
    ],
  },
});
