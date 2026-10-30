import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. All work runs on a CPU, and no GPU is needed.',
];

export default defineCoursework({
  subjectId: 'probability-statistics',
  machineProblems: [
    {
      slug: 'mp1-distlab',
      title: 'distlab: probability and distributions from first principles',
      afterModule: 'random-variables-and-distributions',
      coversModules: ['probability-foundations', 'random-variables-and-distributions'],
      supersedesProject: true,
      summary: 'Build an exact probability engine, ten distributions sampled from their physical mechanisms, and a simulated Geiger counter that decides by Bayes whether a source is present.',
      language: 'Python 3.12',
      estimatedHours: 14,
      overview: `Every formula in the first two modules has a mechanism behind it, and this MP makes you build each one instead of calling a library. \`distlab\` has three parts.

The first part is an **exact** probability engine. You enumerate a finite sample space, store each probability as a \`Fraction\`, and get answers such as 1/6 with no rounding at all. It handles conditioning, independence and Bayes' theorem on discrete hypotheses.

The second part is a **distribution zoo**. Ten distributions are each sampled from the process that creates them: Bernoulli trials for the binomial, exponential gaps for the Poisson, and so on. You then compare each one against theory.

The third part joins the two in a simulated **Geiger counter**. You generate arrival times, apply detector dead time, and use Bayes' theorem to decide whether a radioactive source is present above the background.

**Constraints.** Samplers may call \`rng.random()\` and nothing else from NumPy's random API, where \`rng\` is a \`numpy.random.default_rng(seed)\`. The one exception to building by hand is \`scipy.special.ndtri\`, the inverse normal CDF. Use \`scipy.stats\` only in tests and plots, as an independent check. Confidence intervals and the central limit theorem come later, so every tolerance below is given to you rather than derived.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy matplotlib pytest ruff jupyter ipykernel`.'],
        structure: `distlab/
├── distlab/finite.py      # Space: exact finite probability with Fractions
├── distlab/counting.py    # permutations, combinations, birthday, hypergeometric
├── distlab/bayes.py       # discrete hypothesis updating, odds form
├── distlab/zoo.py         # ten distributions with pmf/pdf, cdf, mean, var, sample
├── distlab/limits.py      # exact total variation distance between distributions
├── distlab/detector.py    # arrivals, dead time, source detection
├── tests/                 # your acceptance tests, written with pytest
├── notebooks/zoo.ipynb    # one section per distribution
├── CHEATSHEET.md
└── pyproject.toml`,
        commands: [
          { label: 'Install the package in editable mode', command: 'pip install -e .' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Lint', command: 'ruff check .' },
          { label: 'Run the notebook from top to bottom', command: 'jupyter nbconvert --to notebook --execute --inplace notebooks/zoo.ipynb' },
        ],
      },
      requirements: [
        '`finite.Space` stores outcomes mapped to `Fraction` probabilities, raises an error unless they sum to exactly 1, and provides `prob(event)`, `given(event)` returning a new `Space`, and `independent(a, b)`.',
        '`counting.py` computes permutations, combinations, the birthday collision probability and hypergeometric probabilities using exact integers, with no floating point until a final conversion.',
        '`bayes.update(prior, likelihood)` works on any dictionary of discrete hypotheses, supports sequential updating, and agrees exactly with a separate odds-form implementation in a test.',
        '`zoo.py` provides Bernoulli, binomial, Poisson, geometric, uniform, exponential, normal, gamma, log-normal and Pareto classes, each with `pmf` or `pdf`, `cdf`, `mean`, `var` and `sample(n, rng)`, and chi-square is a named special case of gamma.',
        'Each sampler uses its generating mechanism: summed Bernoulli trials for the binomial, counted exponential gaps in unit time for the Poisson, counted trials to the first success for the geometric, `-log(U)/rate` for the exponential, `ndtri(U)` for the normal, summed exponentials for integer-shape gamma, `exp` of a normal for the log-normal, and `x_m * exp(E / alpha)` with exponential `E` for the Pareto.',
        '`limits.tv_distance` computes the exact total variation distance between two discrete distributions, including the tail mass beyond the largest support point, and the notebook has multi-panel figures of the binomial to Poisson limit and the Poisson to normal limit.',
        'A function builds correlated normals from independent ones with `X = mu_x + s_x Z1` and `Y = mu_y + s_y (rho Z1 + sqrt(1 - rho^2) Z2)`, and the notebook plots the sample with its theoretical covariance ellipse.',
        '`detector.py` generates arrival times from exponential gaps, applies a non-paralyzable dead time, and returns the posterior probability of a source given a count, using Poisson likelihoods for the background-only and source-plus-background rates.',
        '`notebooks/zoo.ipynb` gives each distribution a section with its mechanism, a histogram over the `scipy.stats` PMF or PDF, and a moment check, and it runs from top to bottom with fixed seeds.',
        '`CHEATSHEET.md` lists the PMF or PDF, mean, variance and typical physical use of all ten distributions on one page.',
      ],
      acceptanceTests: [
        '`birthday(23)` rounds to 0.5073 and `birthday(22)` rounds to 0.4757. A two-dice `Space` gives P(sum = 7) of exactly `Fraction(1, 6)`, and a five-card count gives P(full house) of exactly `Fraction(6, 4165)`.',
        'Exact enumeration of Monty Hall gives P(win by switching) = 2/3 when the host knowingly opens a goat door, and 1/2 when the host opens a random unchosen door that happens to show a goat. With prevalence 1%, sensitivity 99% and specificity 95%, one positive test gives a posterior of exactly 1/6, and a second independent positive gives exactly 99/124.',
        'With `default_rng(0)` and n = 1,000,000, the sample mean is within 0.5% and the sample variance within 3% of theory for Binomial(20, 0.3), Poisson(4), Geometric(0.2), Exponential(rate 2), Normal(3, 2^2), Gamma(shape 3, rate 2), LogNormal(0, 0.5^2) and Pareto(x_m 1, alpha 5). Add a notebook note showing that Pareto with alpha 3 misses the variance by more on some seeds, because its fourth moment is infinite.',
        'Total variation between Binomial(n, 3/n) and Poisson(3) is 0.0262 at n = 30, 0.0076 at n = 100 and 0.00075 at n = 1000, each within 5e-5 and each below the bound 9/n.',
        'For a million correlated pairs with means (1, -1), standard deviations (2, 3) and rho = 0.6, the sample Cov(X, Y) is within 1% of 3.6, Var(X + Y) within 1% of 20.2, and Var(2X - Y) within 1% of 10.6.',
        'With background 5 per minute, source 3 per minute, 10 minutes and prior 0.5, the posterior of a source is 0.142 at 60 counts, 0.634 at 65 and 0.948 at 70, and prior 0.1 at 70 counts gives 0.669. A 1000 per second source with 0.2 ms dead time records 833.3 per second, within 1%, over 500,000 arrivals.',
      ],
      resources: [
        {
          title: 'SciPy statistical functions (scipy.stats)',
          url: 'https://docs.scipy.org/doc/scipy/reference/stats.html',
          type: 'documentation',
          cost: 'free',
          provider: 'SciPy',
          note: 'Your independent check for every PMF, PDF, CDF and moment. Use it in tests and plots only.',
        },
      ],
      stretchGoals: [
        'Add a paralyzable dead-time model and plot observed against true rate for both models, up to the rate where they diverge.',
        'Choose a count threshold for the detector that gives a 1% false alarm rate, then plot detection probability against source strength.',
      ],
    },
    {
      slug: 'mp2-hubblefit',
      title: 'hubblefit: measure the expansion of the universe from public supernova data',
      afterModule: 'hypothesis-testing-and-regression',
      coversModules: ['limit-theorems-and-sampling', 'estimation-and-confidence', 'hypothesis-testing-and-regression'],
      supersedesProject: true,
      summary: 'Write your own fitting and testing toolkit, prove it on two published tables, then use it on 490 Type Ia supernovae to measure the Hubble constant and the deceleration parameter.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `In this MP you build a small frequentist toolkit, then point it at one of the best-known numbers in cosmology. No curve-fitting library is allowed, because the aim is to understand every number it returns.

\`fitkit\` does weighted least squares, maximum likelihood, confidence intervals, the bootstrap, goodness-of-fit and likelihood-ratio tests, cross-validation and multiple-comparison control. You first prove it on two tables with known answers: the 20-point line-fitting table from Hogg, Bovy and Lang, and the 1910 alpha-particle counts of Rutherford and Geiger.

Then comes the real analysis. The **Pantheon+SH0ES** data release gives distance moduli for 1,701 supernova light curves. At low redshift, $d_L \\approx (cz/H_0)[1 + (1-q_0)z/2]$, so with $\\mu = 5\\log_{10}(d_L/\\text{Mpc}) + 25$ you can fit a polynomial in $z$ to

$$y = \\mu - 5\\log_{10}(cz) = a_0 + a_1 z + \\dots$$

Here $c$ is in km/s, $H_0 = 10^{(25 - a_0)/5}$ and $q_0 = 1 - 2 a_1 \\ln(10)/5$. You will find a Hubble constant near 73 km/s/Mpc and evidence that the expansion is accelerating.

**A caution you must carry into your report.** The \`MU_SH0ES\` column already contains the Cepheid calibration of the supernova brightness, so your error bar on $H_0$ is not a full measurement of $H_0$. It excludes that calibration uncertainty and the correlated systematics in the full covariance matrix.

**Constraints.** Use NumPy, SciPy and pandas. Do not use \`curve_fit\`, \`polyfit\`, \`statsmodels\` or \`scipy.stats\` fit methods in \`fitkit\`. \`scipy.optimize.minimize\` and the distribution functions in \`scipy.stats\` are allowed. Use only the diagonal error column. Bayesian methods come in the next module.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas matplotlib pytest ruff jupyter ipykernel`.'],
        structure: `hubblefit/
├── fitkit/wls.py          # weighted least squares, covariance, leverage, pulls
├── fitkit/mle.py          # likelihood fits, Hessian errors, profile intervals
├── fitkit/intervals.py    # Wald and Wilson intervals, exact coverage
├── fitkit/resample.py     # grouped bootstrap and grouped k-fold
├── fitkit/hypothesis.py   # chi-square, likelihood ratio, Bonferroni, Benjamini-Hochberg
├── analysis/fetch.py      # downloads the release file and checks its SHA-256
├── analysis/run.py        # regenerates every table and figure
├── data/known_tables.py   # the Hogg and Rutherford-Geiger tables
├── tests/                 # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Fetch the data and verify its hash', command: 'python analysis/fetch.py' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Regenerate every number and figure', command: 'python analysis/run.py --out results/' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`wls.fit(A, y, sigma)` builds the design matrix solution from the normal equations $A^TWA\\beta = A^TWy$ using a Cholesky or QR factorization, and returns the parameters, covariance $(A^TWA)^{-1}$, $\\chi^2$, degrees of freedom, leverages and pulls.',
        '`mle.py` fits any negative log-likelihood with `scipy.optimize.minimize`, returns Hessian-based standard errors, and computes a profile-likelihood interval for one chosen parameter.',
        '`intervals.py` provides Wald and Wilson intervals for a proportion and computes their exact coverage by summing binomial probabilities over all outcomes.',
        '`resample.py` provides a pairs bootstrap and a k-fold splitter that both accept group labels, so that every row sharing a group stays together. It reports the standard error and the percentile and basic intervals.',
        '`hypothesis.py` provides the Pearson goodness-of-fit test, the likelihood-ratio test using Wilks\' theorem, Bonferroni correction and the Benjamini-Hochberg procedure.',
        '`fetch.py` downloads `Pantheon+SH0ES.dat` from the data release, stores its SHA-256, and selects rows with `0.0233 < zHD < 0.15` and `IS_CALIBRATOR == 0`, then asserts 490 rows and 428 unique `CID` values.',
        'Fit polynomials of degree 0 to 4 to $y$, and report $H_0$ and $q_0$ with errors propagated from the covariance matrix for each degree that has the required terms.',
        'Compare the degrees with $\\Delta\\chi^2$ tests, AIC, BIC and 5-fold cross-validation grouped by `CID`. The score is the mean squared pull on the held-out rows.',
        'Fit the inflated-error model, with $\\sigma_i^2 + \\sigma_{int}^2$ as the variance, by maximum likelihood, and report $\\chi^2/\\nu$ against its expected spread $\\sqrt{2/\\nu}$. Explain in the report why $\\chi^2/\\nu$ is so far below 1 for this column and what that means for your error bars.',
        '`REPORT.md` runs 4 to 6 pages with methods, tables of fits, a Hubble diagram with a residual panel, a pull histogram, model selection, and a discussion of every multiple-comparison issue, and `analysis/run.py` regenerates all of it from the raw file.',
      ],
      acceptanceTests: [
        'Hogg table: fitting $y = b + mx$ with $\\sigma_y$ to all 20 points gives $m = 1.08 \\pm 0.08$, $b = 213 \\pm 14$ and $\\chi^2 = 290$. Dropping the first four points gives $m = 2.24 \\pm 0.11$, $b = 34 \\pm 18$ and $\\chi^2 = 18.7$ on 14 degrees of freedom.',
        'Rutherford-Geiger: for counts k = 0 to 14 seen in 57, 203, 383, 525, 532, 408, 273, 139, 45, 27, 10, 4, 0, 1 and 1 intervals, $\\hat\\lambda = 10097/2608 = 3.8715$, and a Poisson test with bins 0 to 9 and a final bin for 10 or more gives $\\chi^2 = 12.87$ on 9 degrees of freedom and p = 0.168, each within 0.01. Exact coverage of a nominal 95% interval (z = 1.96) at n = 20 and p = 0.05 is 0.639 for Wald and 0.925 for Wilson, within 0.001.',
        'Degree 1 on the 490 rows gives $H_0$ = 73.13 and $q_0$ = -0.44, with $\\sigma_{H_0}$ = 0.54 and $\\sigma_{q_0}$ = 0.21 from the covariance matrix, and $\\chi^2$ = 220.2 on 488 degrees of freedom, each within 1 in the last digit shown.',
        'Going from degree 0 to 1 gives $\\Delta\\chi^2$ = 46.8 with p below 1e-10, and going from 1 to 2 gives $\\Delta\\chi^2$ = 0.2 with p near 0.65. AIC and BIC both pick degree 1. Grouped cross-validation scores near 0.55 for degree 0 and between 0.44 and 0.47 for degrees 1 to 4, on each of three shuffles. The maximum-likelihood $\\sigma_{int}$ is below 0.02.',
        'A 2,000 replicate bootstrap grouped by `CID` with seed 42 gives a standard deviation of $H_0$ between 0.35 and 0.50, and a 95% interval containing 73.1. Over 2,000 fake datasets drawn from the degree 1 fit with Gaussian noise of the listed errors, the 95% interval on $a_0$ covers the truth between 93% and 97% of the time.',
        'A one-sample t-test on the degree 1 residuals of each survey with at least 5 rows covers 14 values of `IDSURVEY`. Three reach p < 0.05, and exactly one survives both Bonferroni and Benjamini-Hochberg at 0.05.',
      ],
      resources: [
        {
          title: 'Pantheon+ and SH0ES data release',
          url: 'https://github.com/PantheonPlusSH0ES/DataRelease',
          type: 'dataset',
          cost: 'free',
          provider: 'Pantheon+ and SH0ES collaborations',
          note: 'The distance table lives in `Pantheon+_Data/4_DISTANCES_AND_COVAR`. Read the column descriptions before you select rows.',
          primary: true,
        },
        {
          title: 'Data analysis recipes: Fitting a model to data',
          url: 'https://arxiv.org/abs/1008.4686',
          type: 'article',
          cost: 'free',
          provider: 'Hogg, Bovy and Lang',
          note: 'Table 1 holds the 20 points for your first known-answer test. Exercises 1 and 2 give the expected fits.',
        },
      ],
      stretchGoals: [
        'Replace the diagonal errors with the full `STAT+SYS` covariance matrix in generalized least squares, and report how $H_0$, $q_0$ and $\\chi^2/\\nu$ change.',
        'Scan the lower redshift cut from 0.01 to 0.05 and show how the choice moves $H_0$, including the multiple-comparison cost of choosing a cut after looking.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-warming-audit',
    title: 'warming-audit: has global warming accelerated?',
    repoName: 'warming-audit',
    summary: 'Audit a live scientific argument with three temperature records and every tool in the course, then publish an analysis that updates itself and shows how the answer depends on the method.',
    language: 'Python 3.12',
    estimatedHours: 50,
    overview: `Scientists are arguing in public about whether global warming sped up after about 2010. The argument is hard because the data are autocorrelated, the breakpoint is chosen after seeing the data, the last two years are unusually hot, and small analysis choices move the answer. That makes it an ideal final project: a real question, public data, and a statistical subtlety at every step.

You will build a one-command pipeline that takes three independent records (NASA GISTEMP, HadCRUT5 and Berkeley Earth) through cleaning, noise modelling, frequentist and Bayesian inference, model comparison and a fake-data study.

The headline is that a careful analysis does not produce one number. In a test run on GISTEMP through December 2024 with ARMA(1,1) noise, a continuous break near 2012 raises the trend from about 0.17 to about 0.36 C per decade. The pointwise p-value is 0.008, the look-elsewhere-corrected p-value is about 0.035, the Bayes factor is only about 2.5, and a rolling forecast gains nothing over a straight line. Stop the data at December 2022 and the evidence disappears. Your repository explains why those facts can all be true at once.

Pin every acceptance test to January 1970 through December 2024, the window all three records share, and use a frozen snapshot. Then report the latest data separately, because the conclusion may keep moving as new months arrive.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...pyToolchain,
        'Install the packages: `pip install numpy scipy pandas matplotlib emcee corner arviz pytest ruff jupyter ipykernel`, then freeze them with `pip freeze > requirements.lock`.',
        'A likelihood evaluation takes about 6 ms on a laptop CPU with a dense Cholesky factorization, so a full MCMC run takes roughly 20 to 30 minutes. If you use `emcee` with a process pool on Windows, keep the entry point under `if __name__ == "__main__":`.',
      ],
      structure: `warming-audit/
├── warming/fetch.py       # downloads records, writes data/MANIFEST.json with SHA-256
├── warming/clean.py       # parsers, sentinels, common baseline, tidy table
├── warming/noise.py       # AR(1) and ARMA(1,1) covariance and exact likelihood
├── warming/freq.py        # GLS fits, block bootstrap, sup-F test
├── warming/bayes.py       # priors, posterior, MCMC, grid reference
├── warming/compare.py     # information criteria, Bayes factors, rolling forecasts
├── warming/fakedata.py    # false positive rate and power curves
├── warming/multiverse.py  # every defensible analysis choice at once
├── warming/__main__.py    # CLI: fetch, all
├── data/                  # manifest and frozen snapshots
├── tests/
├── report/report.md       # 8 to 12 pages, built from generated tables and figures
├── .github/workflows/     # ci.yml and a monthly update job
├── requirements.lock
└── README.md`,
      commands: [
        { label: 'Fetch the data and check the hashes', command: 'python -m warming fetch' },
        { label: 'Regenerate every result', command: 'python -m warming all --seed 2024 --out results/' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
        { label: 'Run only the fast smoke pipeline', command: 'python -m warming all --quick --out results-quick/' },
        { label: 'Lint', command: 'ruff check .' },
      ],
    },
    requirements: [
      '`fetch` stores GISTEMP v4 (`GLB.Ts+dSST.csv`), the HadCRUT5 global monthly summary, Berkeley Earth (`Land_and_Ocean_complete.txt`) and the NOAA Oceanic Nino Index (`oni.ascii.txt`) under `data/raw` with SHA-256 hashes in a manifest, and every run fails loudly if a frozen file changes.',
      '`clean` handles the `***` sentinel in GISTEMP, the `%` comment lines and two sections of the Berkeley file, and the different baselines, rebases each record to 1991-2020, and asserts 660 months with no gaps for January 1970 to December 2024.',
      '`noise.py` computes the exact Gaussian likelihood for AR(1) and ARMA(1,1) noise, where the autocorrelation is $\\rho_k = \\rho_1 \\phi^{k-1}$, and residual autocorrelation plots justify the choice.',
      '`freq.py` fits linear, quadratic and continuous piecewise-linear trends by GLS with the slope change $\\Delta$ as a parameter, and a moving block bootstrap with 24-month blocks gives a second interval for each trend.',
      'The break search runs yearly from 1985 to 9 years before the end of the data, and a sup-F test takes its null distribution from at least 5,000 simulated series, so the look-elsewhere effect is handled by Monte Carlo rather than a formula.',
      'The Bayesian model states its priors, including a uniform break year and a Gaussian prior on $\\Delta$, samples all parameters with `emcee` or your own Metropolis sampler, and reports $\\hat R$, effective sample size, Monte Carlo standard errors, a corner plot and posterior predictive checks.',
      'Model comparison reports AIC, BIC, a Bayes factor for at least three prior scales on $\\Delta$, and a rolling-origin 12-month forecast from 2000 to 2023 for a linear trend, a break model chosen using only past data, and a 15-year local trend. Each forecast is the trend line alone, fitted by ordinary least squares, with no noise model carried forward.',
      'Systematics are explicit: `multiverse.py` crosses dataset, noise model, ENSO adjustment and end year from 2020 to 2024, and plots the resulting estimates and p-values as a specification curve. Include at least one posterior in which dataset choice is a nuisance parameter.',
      '`fakedata.py` runs the full test on simulated series, reports the false positive rate, and draws a power curve of detection probability against true $\\Delta$ for break years 2005, 2010, 2012 and 2015.',
      'The report states one clear conclusion in plain language, including posterior odds for a sceptic and a believer from the odds form of Bayes\' theorem, and `python -m warming all` regenerates every table and figure from the frozen data.',
    ],
    acceptanceTests: [
      'Each cleaned record has 660 months. The ARMA(1,1) GLS linear trend is within 0.19 to 0.215 C per decade for all three records. On GISTEMP the standard error is 0.010 to 0.013 under ARMA(1,1) and 0.007 to 0.010 under AR(1).',
      'On the GISTEMP linear fit, $\\phi$ is 0.80 to 0.90 and $\\rho_1$ is 0.60 to 0.75 under ARMA(1,1), $\\phi$ is 0.62 to 0.72 under AR(1), and twice the log-likelihood gain of ARMA(1,1) exceeds 30.',
      'With ARMA(1,1) noise on GISTEMP through December 2024, the best break year is 2011 to 2014, the pointwise p-value is below 0.02, the sup-F p-value is 0.015 to 0.07 and at least 2.5 times the pointwise value. Through December 2022, the sup-F p-value is above 0.3.',
      'With noise parameters held at their fitted values and seed 2024, the 5% test rejects 3.5% to 6.5% of 2,000 null series. With a true break at 2012, power is 15% to 35% at $\\Delta$ = 0.1, 60% to 80% at 0.2, and above 93% at 0.3 C per decade.',
      'With prior standard deviation 0.2 C per decade on $\\Delta$ and a uniform break year from 1985 to 2015, P($\\Delta$ > 0) is 0.93 to 0.995, the Bayes factor against no break is 1 to 5, and the 90% credible interval for the break spans at least 15 years. Rolling forecast RMSE is 0.14 to 0.17 C for all three models, and they differ by less than 0.01 C.',
      'Every MCMC parameter has $\\hat R$ below 1.01 and effective sample size above 1,000. With noise parameters fixed, the sampled break-year marginal matches a direct grid calculation with total variation below 0.05 on 1-year bins. Two runs with one seed give identical output.',
    ],
    coverage: [
      { module: 'probability-foundations', demonstrates: 'The report turns the Bayes factor into posterior odds from sceptical and believing priors with the odds form of Bayes\' theorem.' },
      { module: 'random-variables-and-distributions', demonstrates: 'The noise model is a multivariate normal with an explicit covariance matrix, and its autocorrelation function is derived and checked.' },
      { module: 'limit-theorems-and-sampling', demonstrates: 'Null distributions come from seeded Monte Carlo with stated standard errors, and autocorrelation is reported as a reduced effective sample size.' },
      { module: 'estimation-and-confidence', demonstrates: 'Exact maximum likelihood, Hessian errors and a block bootstrap give intervals that are compared with each other for coverage.' },
      { module: 'hypothesis-testing-and-regression', demonstrates: 'GLS regression, the sup-F look-elsewhere correction, power analysis and information criteria answer the frequentist question.' },
      { module: 'bayesian-inference-and-mcmc', demonstrates: 'The posterior is sampled with full convergence diagnostics, checked against a grid, and tested with posterior predictive checks and Bayes factors.' },
      { module: 'statistics-in-practice', demonstrates: 'Messy formats are cleaned reproducibly, systematics appear in a specification curve, and one command rebuilds the whole report.' },
    ],
    portfolio: [
      'The README opens with one figure of the three records, the fitted break and its uncertainty, followed by a plain-language answer and a reproduce-in-one-command section.',
      'GitHub Actions runs the tests and the quick pipeline on every push, with a status badge in the README.',
      'A scheduled monthly workflow fetches the newest GISTEMP data and updates a latest-results figure, kept separate from the frozen analysis so that the pinned numbers never move.',
      'The specification curve is published in the README, and `report/report.md` is exported to PDF as a tagged `v1.0.0` release with an MIT LICENSE for the code and a data attribution file.',
      'A methods note explains in your own words why a low p-value, a weak Bayes factor and no forecast gain can all be correct, and it credits the published papers you compare against.',
    ],
    resources: [
      {
        title: 'GISS Surface Temperature Analysis (GISTEMP v4)',
        url: 'https://data.giss.nasa.gov/gistemp/',
        type: 'dataset',
        cost: 'free',
        provider: 'NASA GISS',
        note: 'Use the global land-ocean monthly means CSV. HadCRUT5 and Berkeley Earth publish equivalent global monthly series.',
        primary: true,
      },
      {
        title: 'HadCRUT5 global temperature dataset',
        url: 'https://www.metoffice.gov.uk/hadobs/hadcrut5/',
        type: 'dataset',
        cost: 'free',
        provider: 'Met Office Hadley Centre',
        note: 'Download the monthly global summary series, and record the exact version in your manifest.',
      },
      {
        title: 'A recent surge in global warming is not detectable yet',
        url: 'https://www.nature.com/articles/s43247-024-01711-1',
        type: 'article',
        cost: 'free',
        provider: 'Communications Earth and Environment',
        note: 'A published changepoint analysis of this question. Compare your method and your conclusion with it.',
      },
    ],
    stretchGoals: [
      'Add adjustments for volcanic aerosols and solar irradiance alongside ENSO, and show how much of the apparent acceleration each one absorbs.',
      'Replace the single continuous break with a Gaussian process trend and compare its posterior for the current warming rate.',
    ],
  },
});
