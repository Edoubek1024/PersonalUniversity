import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-toolsai.jupyter'];
const pythonToolchain = [
  'Install VS Code, then install Python 3.12 or newer from python.org. On Windows, tick "Add python.exe to PATH" in the installer. On macOS or Linux, use `python3` in place of `python` when you create the environment below.',
  'Open your project folder in VS Code, then open the integrated terminal with Terminal > New Terminal. Run `python -m venv .venv` to make a private environment, and activate it with `.venv\\Scripts\\Activate.ps1`, or `source .venv/bin/activate` on macOS or Linux. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once. Your prompt then shows `(.venv)`.',
];

export default defineCoursework({
  subjectId: 'calculus-for-data-science',
  machineProblems: [
    {
      slug: 'mp1-keeling-slope',
      title: 'keeling-slope: how fast is atmospheric CO2 rising?',
      afterModule: 'derivatives',
      coversModules: ['functions-and-limits', 'derivatives'],
      summary: 'Build a small Python lab that checks your hand-derived derivatives numerically, then use both to measure the growth rate of CO2 at Mauna Loa and separate the trend from the seasons.',
      language: 'Python 3.12',
      estimatedHours: 10,
      overview: `The Keeling curve, the monthly record of CO2 at Mauna Loa, is one of the most important graphs in science. Its level gets the headlines, but the number scientists argue about is its slope: the growth rate in parts per million (ppm) per year. In this MP you measure that derivative in two independent ways, from a formula by hand and from the raw data by finite differences, and you find out how much of the slope in any given month is just the seasons.

This course assumes no programming, so here is all the Python you need. A function is a named rule, a list holds values, and a \`for\` loop visits each one. Functions can be passed to other functions, which is how \`central_diff\` below can work on any \`f\`.

\`\`\`python
import math

def central_diff(f, x, h):
    return (f(x + h) - f(x - h)) / (2 * h)

xs = [0.5, 1.0, 2.0]
slopes = []
for x in xs:
    slopes.append(central_diff(math.exp, x, 0.001))
print(slopes)
\`\`\`

To read the data, skip the comment lines that start with \`#\`, then let \`csv.DictReader\` turn each row into a dictionary, so \`row["average"]\` is the text in that column and \`float(...)\` makes it a number. A test is a function named \`test_something\` in the \`tests\` folder, containing \`assert\` lines, and \`python -m pytest\` runs them all. A plot takes three lines: \`plt.plot(xs, ys)\`, \`plt.savefig("out.png")\` and \`plt.close()\`, after \`import matplotlib.pyplot as plt\`.

**The data.** Download the monthly file from NOAA Global Monitoring Laboratory, at \`https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv\`, into \`data/\`. NOAA appends new months and sometimes revises recent ones, so this is your frozen snapshot: never re-download it during the MP. Use only rows up to December 2025. The columns you need are \`year\`, \`month\`, \`decimal date\` and \`average\`.

**The model.** With $t$ in decimal years, this fixed formula was fitted to those rows. Do not refit it:

$$C(t) = 280 + A e^{r(t - 2000)} + s_1 \\sin(2\\pi t) + c_1 \\cos(2\\pi t) + s_2 \\sin(4\\pi t) + c_2 \\cos(4\\pi t),$$

with $A = 87.8$, $r = 0.0209$, $s_1 = 2.66$, $c_1 = -0.98$, $s_2 = -0.44$ and $c_2 = 0.67$. The 280 is the pre-industrial level, so the exponential describes the excess over it.

**Constraints.** Python standard library plus \`matplotlib\` and \`pytest\` only. Every derivative must be derived by hand first, written in \`REPORT.md\`, and then confirmed numerically.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install matplotlib pytest`.', 'Download the data file named in the overview into `data/` with your browser, using Save As.'],
        structure: `keeling-slope/
├── data/
│   └── co2_mm_mlo.csv     # frozen snapshot from NOAA
├── diffquot.py            # forward_diff, central_diff, error_table, limit_table
├── functions.py           # eight functions with hand-derived derivatives
├── keeling.py             # load_co2, model, model_rate, central_rate, summaries
├── make_plots.py          # writes every figure to figures/
├── figures/
├── tests/
│   ├── test_diffquot.py
│   ├── test_functions.py
│   └── test_keeling.py
└── REPORT.md              # derivations, results and interpretation`,
        commands: [
          { label: 'Regenerate the figures', command: 'python make_plots.py' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`forward_diff(f, x, h)` and `central_diff(f, x, h)` implement the two difference quotients for any function `f`.',
        '`error_table(f, dfdx, x, hs)` returns, for each `h` in `hs`, the absolute error of both differences. `REPORT.md` shows the table for $e^x$ at 1 for $h = 10^{-1}$ down to $10^{-12}$, and explains why the error falls and then rises again.',
        '`limit_table(f, xs)` returns `f(x)` for shrinking `x`, and is used on $\\sin(x)/x$, $(1 - \\cos x)/x^2$ and $(e^x - 1)/x$. `REPORT.md` states each limit, and says for which `x` the computer stops being trustworthy.',
        '`functions.py` holds a list of at least 8 tuples `(name, f, df)`, where `df` is your own derivative, covering the power, product, quotient and chain rules. It must include $\\sigma(x) = 1/(1 + e^{-x})$, $x e^{-x^2/2}$, $\\ln(1 + x^2)$, $\\sin(2\\pi x)$ and $x \\ln x$.',
        'A test checks every `df` against `central_diff` with $h = 10^{-5}$ at no fewer than 5 points, and fails if any absolute difference exceeds $10^{-6}$.',
        '`load_co2(path)` skips comments, keeps rows up to December 2025, and returns parallel lists of decimal times and CO2 values.',
        '`model(t)` implements $C(t)$, and `model_rate(t)` implements your hand-derived $C\'(t)$, with `trend_rate(t)` giving the part from the exponential alone. A test checks `model_rate` against `central_diff` at 5 values of `t`.',
        '`central_rate(ts, cs, i, k)` returns $(c_{i+k} - c_{i-k})/(t_{i+k} - t_{i-k})$. The MP uses $k = 1$ for a monthly slope and $k = 6$ for a 12-month slope. `REPORT.md` explains, with a one-line integral-free argument, why the 12-month window removes a yearly wave.',
        'A scan of $t$ over 2020 to 2021 in steps of 0.001 finds the seasonal peak and trough of `model`, and the fastest rise and fall of `model_rate`, by looking for sign changes of the slope. `REPORT.md` converts these to dates and compares the peak with the month the raw data peak most often.',
        '`make_plots.py` writes at least 3 figures: the data with the model, the monthly and 12-month rates over time, and the 12-month mean rate by decade. `REPORT.md` says what the rates show, and at least two things they do not, for example about causes.',
      ],
      acceptanceTests: [
        'For $e^x$ at 1: the forward error is about 0.1406 at $h = 0.1$ and 0.00136 at $h = 0.001$, and the central error is about 0.00453 and $4.53 \\times 10^{-7}$. Shrinking $h$ by 10 cuts the forward error by about 10 and the central error by about 100 in this range. Both errors are above $10^{-4}$ again at $h = 10^{-12}$.',
        '`limit_table` gives $\\sin(x)/x = 0.99998333$ at $x = 0.01$, and $(1 - \\cos x)/x^2 = 0.49999996$ at $x = 0.001$ but exactly 0.0 at $x = 10^{-8}$, even though the limit is 1/2.',
        '`load_co2` returns 814 rows. The first is March 1958 at about 315.71 and the last is December 2025 at about 427.49. Allow 0.1 for NOAA revisions.',
        'Using the given constants: `model(2000.0)` is 367.49 and `model_rate(2000.0)` is 13.02 ppm per year, while `trend_rate(2000.0)` is 1.835. At 2020.0 the values are 413.05, 13.97 and 2.787. The doubling time of the excess, $\\ln 2 / r$, is 33.2 years. The root mean square error of `model` over the 814 rows is $1.53 \\pm 0.03$.',
        'The scan of 2020 finds the model peak near 2020.396 (late May), the trough near 2020.740 (late September), the fastest rise of about 19.05 ppm per year near 2020.896, and the fastest fall of about $-24.94$ near 2020.572.',
        'The $k = 6$ rate averaged over each decade, by decimal time, is about 0.87, 1.26, 1.60, 1.52, 1.99 and 2.40 ppm per year for the 1960s to the 2010s, each within 0.03. Over all rows, the $k = 1$ rate runs from about $-28$ to $21$, while the $k = 6$ rate runs from about $-0.35$ to $4.39$, with its maximum at September 2023.',
      ],
      resources: [
        { title: 'Trends in Atmospheric Carbon Dioxide', url: 'https://gml.noaa.gov/ccgg/trends/data.html', type: 'dataset', cost: 'free', provider: 'NOAA Global Monitoring Laboratory', note: 'The data page, with file formats and the citation to use in your report.' },
        { title: 'The Python Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'documentation', cost: 'free', provider: 'Python Software Foundation', note: 'Sections 3 and 4 cover everything used here, if you want more than the overview gives.' },
      ],
      stretchGoals: [
        'Compare the 12-month rate with the $\\ln$-excess rate $\\frac{d}{dt}\\ln(C - 280)$, by decade, and say whether the excess really grows at a constant percentage.',
        'Find which years the 12-month rate peaked, and read about what the El Nino cycle does to the carbon cycle.',
      ],
    },
    {
      slug: 'mp2-drug-exposure',
      title: 'exposure: how much drug did each patient really get?',
      afterModule: 'integration',
      coversModules: ['applications-of-derivatives', 'integration'],
      summary: 'Turn eleven blood samples from each of twelve volunteers into half-lives, peaks and total exposure, using Newton\'s method, a robust loss, the trapezoid rule and exact integrals derived by hand.',
      language: 'Python 3.12',
      estimatedHours: 14,
      overview: `Drug regulators approve generic medicines by comparing the **area under the concentration curve**, or AUC. It measures total exposure, and it is a definite integral. In this MP you work with a classic data set: twelve volunteers took a single oral dose of the asthma drug theophylline, and each gave 11 blood samples over about 24 hours. Times are irregular, and measurements are noisy. You will analyse it the way a pharmacologist would, without any statistics library. This is an exercise in calculus, not medical advice.

The file has the columns \`Subject\`, \`Wt\` (kg), \`Dose\` (mg/kg), \`Time\` (hours) and \`conc\` (mg/L). Download it from \`https://vincentarelbundock.github.io/Rdatasets/csv/datasets/Theoph.csv\` into \`data/\`.

**One-parameter fit of the decay.** After the drug is absorbed, concentration falls exponentially at some rate $k$. Take each subject's last 3 samples $(t_0, c_0), (t_1, c_1), (t_2, c_2)$, and anchor a curve at the first of them:

$$L(k) = \\sum_{i=0}^{2} \\big(c_i - c_0 e^{-k(t_i - t_0)}\\big)^2.$$

Derive $L'(k)$ and $L''(k)$ by hand. Then run Newton's method on $L'$: $k \\leftarrow k - L'(k)/L''(k)$. Stop when a step is smaller than $10^{-10}$. Call it a failure if $|k| > 50$, or after 50 iterations.

**The curve.** A standard model for a dose taken by mouth, with absorption rate $a$ and elimination rate $k$, is

$$C(t) = A\\big(e^{-kt} - e^{-at}\\big).$$

Keep $k$ from the first step. For a given $a$, the best $A$ has a closed form: differentiate the sum of squares $\\sum_i (c_i - A g_i)^2$ with respect to $A$, where $g_i = e^{-kt_i} - e^{-at_i}$. Then scan $a$ from $k + 0.01$ to 10 in steps of 0.01, using all 11 samples, and keep the $a$ with the smallest sum of squares.

**Exact results.** From $C(t)$, derive by hand: the peak time $t_{\\max} = \\ln(a/k)/(a - k)$, the inflection time $2 t_{\\max}$, the area $\\text{AUC}(T) = \\int_0^T C(t)\\,dt$, its limit as $T \\to \\infty$, $A(1/k - 1/a)$, and the first moment $\\int_0^\\infty t\\,C(t)\\,dt$, which needs integration by parts. The ratio of the last two is the **mean residence time**, and it simplifies to $1/k + 1/a$.

**Constraints.** Python standard library plus \`matplotlib\` and \`pytest\`. No SciPy, no NumPy. Python as in MP 1, plus dictionaries: \`d.setdefault(key, []).append(x)\` groups rows by subject, and \`sorted(d)\` lists the keys.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install matplotlib pytest`.', 'Download the data file named in the overview into `data/`. It is a fixed historical data set, so it should not change.'],
        structure: `exposure/
├── data/
│   └── Theoph.csv
├── sums.py                # left_sum, right_sum, trapezoid, midpoint
├── newton.py              # newton, safe_newton
├── terminal.py            # L, dL, d2L, half_life
├── location.py            # mean, median, huber
├── model.py               # C, best_A, fit_a, t_max, auc, auc_inf, mrt
├── analyse.py             # loads the data and writes results.csv and figures
├── figures/
├── tests/
└── REPORT.md              # all derivations and the interpretation`,
        commands: [
          { label: 'Run the full analysis', command: 'python analyse.py' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`load_subjects(path)` returns a dictionary from subject number to its dose, its weight, and its time and concentration lists in time order.',
        '`left_sum`, `right_sum` and `trapezoid` take lists of times and values, work with uneven spacing, and are tested on a short hand-computed example. `analyse.py` reports the peak concentration and time from the raw samples for each subject.',
        '`L`, `dL` and `d2L` follow your hand derivation, and a test checks `dL` and `d2L` against central differences at $k = 0.05$ and $k = 0.2$ for all 12 subjects.',
        '`newton(g, dg, x0, tol=1e-10, max_iter=50)` returns the root and iteration count, or `None` on failure, following the rule in the overview.',
        '`safe_newton(g, dg, x0, lo, hi)` keeps a bracket with $g(lo) < 0 < g(hi)$, tightens it after every step, and takes a bisection step whenever a Newton step would leave it. It must succeed for every subject from $k = 0.05, 0.5, 1.0$ and $1.9$, with bracket $[0.001, 2]$.',
        '`location.py` computes the mean, the median and the Huber estimate of the 12 half-lives. `huber(xs, delta)` starts at the median and repeats $\\theta \\leftarrow \\theta + \\sum_i \\text{clip}(x_i - \\theta, -\\delta, \\delta) / m$, where $m$ counts points with $|x_i - \\theta| \\le \\delta$, which is Newton on the Huber loss. `REPORT.md` explains why the three differ.',
        '`best_A` uses your closed form, `fit_a` runs the scan in the overview, and `REPORT.md` shows how you derived the closed form from a one-parameter loss.',
        '`t_max`, `c_max`, `auc(T)`, `auc_inf`, `aumc_inf` and `mrt` use your hand-derived formulas. A test confirms that `midpoint` on $C(t)$ with 2,000 pieces matches `auc(24)` to within 0.01, that $C\'(t_{\\max}) = 0$, that $C\'\'(2 t_{\\max}) = 0$ by central differences, and that `mrt` equals $1/k + 1/a$.',
        '`midpoint` at 10, 20, 40 and 80 pieces is compared with `auc(24)` for Subject 1, and the error ratios are reported.',
        '`REPORT.md` has a table for all 12 subjects, a plot of data and fitted curves, and answers three questions: why the trapezoid and model areas differ, what fraction of exposure falls after the last sample and why that matters, and what a fit to 11 points from 12 people does not show.',
      ],
      acceptanceTests: [
        'The file loads as 132 rows, 12 subjects and 11 samples each. For Subject 1, the left, right and trapezoid sums are 167.67, 130.18 and 148.92 mg·h/L. Across subjects, the smallest trapezoid area is 73.78 (Subject 6) and the largest is 148.92, a ratio of 2.02.',
        'For Subject 1, plain Newton from $k = 0.05$ reaches 0.04843 in at most 10 iterations, while from $k = 0.5$ and $k = 1.0$ it fails. For all 12 subjects, plain Newton fails from $k = 1.0$, and `safe_newton` reaches the same root from every start listed in the requirements, within $10^{-8}$.',
        'Half-lives $\\ln 2 / k$ are 14.31 hours for Subject 1, 5.87 for Subject 2 and 9.00 for Subject 10. The 12 half-lives have mean 8.03, median 7.53 and Huber estimate 7.58 with $\\delta = 1$. Dropping Subject 1 moves the mean to 7.46, the median to 7.43 and the Huber estimate to 7.47.',
        'For Subject 1, `fit_a` gives $a \\approx 1.87$ and $A \\approx 10.86$, with $t_{\\max} \\approx 2.01$ hours and $C_{\\max} \\approx 9.60$ mg/L, while the raw peak is 10.5 at 1.12 hours. `auc(24)` is about 148.3 and `auc_inf` about 218.4. The mean residence time is about 21.18 hours.',
        'Midpoint errors against `auc(24)` for Subject 1 are about 2.93, 1.04, 0.288 and 0.074 at 10, 20, 40 and 80 pieces, so the ratio approaches 4.',
        'The share of `auc_inf` after the last sample is about 31.5% for Subject 1 and between 6% and 19% for every other subject. For Subject 2, the trapezoid area over the sampled times is 91.53, while the model area to the last sample is 84.32, the largest relative gap of the 12 subjects at about 8.5%.',
      ],
      resources: [
        { title: 'Theoph data documentation', url: 'https://vincentarelbundock.github.io/Rdatasets/doc/datasets/Theoph.html', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'What each column means, and where the study came from.' },
        { title: 'Area under the curve (pharmacokinetics)', url: 'https://en.wikipedia.org/wiki/Area_under_the_curve_(pharmacokinetics)', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'Why exposure is measured as an integral, and how it is used.' },
        { title: 'Bateman equation', url: 'https://en.wikipedia.org/wiki/Bateman_equation', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The general form of the two-exponential curve you are fitting.' },
      ],
      stretchGoals: [
        'Try the last 4 samples instead of 3 for the terminal fit, and report how much each half-life moves.',
        'Compare the linear trapezoid rule with the log-linear trapezoid that pharmacologists use on the falling part of the curve, by checking both against $C(t)$.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-half-life-of-attention',
    title: 'The half-life of attention: how fast does the internet forget?',
    repoName: 'half-life-of-attention',
    summary: 'Measure how attention fades after 28 world events using Wikipedia pageviews, with every model, gradient, integral and half-life derived by hand, then release it as a tool that reports on any article.',
    language: 'Python 3.12',
    estimatedHours: 35,
    overview: `When something big happens, millions of people look it up, and then, within days, they stop. How fast? Does a death fade like a disaster? Does a film fade like an eclipse? Is the total attention an event receives even finite, or does it keep growing forever? Those are calculus questions, and Wikipedia publishes the data to answer them.

You will measure the shape of forgetting for 28 events in four categories, using daily pageviews. The hook is that the answer turns on a single exponent. If attention decays as $(1 + t)^{-p}$, then by the improper integral you learned in Module 5, its total is finite only if $p > 1$, and the mean age of a view is finite only if $p > 2$. Measured values straddle both lines, and that decides what you can honestly say about "average" attention.

**Data.** Use the Wikimedia pageviews API:

\`\`\`text
https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/ARTICLE/daily/STARTDATE00/ENDDATE00
\`\`\`

Dates are \`YYYYMMDD\`, the window runs from 60 days before the event date to 200 days after, and \`ARTICLE\` comes from \`urllib.parse.quote(title, safe="")\`. Send a \`User-Agent\` header naming your project. The API rate limits quite quickly, so wait 10 seconds between requests, wait 60 seconds and retry on HTTP 429, and save each raw response in \`data/raw/\`. Commit that snapshot and analyse only the saved files. Your results must not change if the API changes.

\`data/events.txt\` holds \`date|category|title\` lines. Use exactly these 28:

\`\`\`text
2018-03-14|death|Stephen_Hawking
2018-08-16|death|Aretha_Franklin
2018-11-12|death|Stan_Lee
2020-01-26|death|Kobe_Bryant
2020-08-29|death|Chadwick_Boseman
2020-11-08|death|Alex_Trebek
2021-12-31|death|Betty_White
2023-10-28|death|Matthew_Perry
2019-04-26|release|Avengers:_Endgame
2021-09-17|release|Squid_Game
2022-02-25|release|Elden_Ring
2022-05-27|release|Top_Gun:_Maverick
2023-04-05|release|The_Super_Mario_Bros._Movie
2023-07-21|release|Barbie_(film)
2023-07-21|release|Oppenheimer_(film)
2024-03-01|release|Dune:_Part_Two
2017-08-21|scheduled|Solar_eclipse_of_August_21,_2017
2022-09-26|scheduled|Double_Asteroid_Redirection_Test
2023-02-12|scheduled|Super_Bowl_LVII
2023-08-23|scheduled|Chandrayaan-3
2024-02-11|scheduled|Super_Bowl_LVIII
2024-04-08|scheduled|Solar_eclipse_of_April_8,_2024
2024-07-26|scheduled|2024_Summer_Olympics
2019-04-15|sudden|Notre-Dame_de_Paris_fire
2021-03-24|sudden|Ever_Given
2023-03-10|sudden|Silicon_Valley_Bank
2023-06-20|sudden|OceanGate
2024-03-26|sudden|Francis_Scott_Key_Bridge_collapse
\`\`\`

These were chosen with care. Views are counted per title, so an article renamed soon after an event splits its count across titles and looks far smaller than it was. That removed several obvious candidates, and your report should say so.

**Method.** The peak day is the largest count from 3 days before the date to 5 days after, and $t$ is days since the peak. Fit $t = 0, \\dots, 150$. Both models have a baseline $B$: the exponential $M(t) = B + A e^{-kt}$ and the power law $M(t) = B + A(1 + t)^{-p}$. The loss is $L = \\frac{1}{n} \\sum_i (\\ln M(t_i) - \\ln V_i)^2$, because views range over four orders of magnitude.

To keep values positive, optimise $\\theta = (\\ln B, \\ln A, \\ln k)$ for the exponential and $(\\ln B, \\ln A, p)$ for the power law. Let $B_0$ be the 10th percentile of the views in the window. Start the exponential at $(\\ln B_0, \\ln V_0, \\ln 0.1)$ and the power law at $(\\ln(B_0/2), \\ln V_0, 1)$. Use gradient descent with backtracking: begin at $\\eta = 0.1$, halve $\\eta$ until $L$ falls by at least $10^{-4}\\,\\eta\\,|\\nabla L|^2$, take the step, then multiply $\\eta$ by 1.1. Stop at $|\\nabla L| < 10^{-6}$ or 60,000 steps. All 28 fits take under a minute on a laptop.

**Python.** Use NumPy from here on. Arrays act like single numbers in formulas, so \`np.log(B + A * (1 + t) ** (-p))\` works on a whole array of \`t\`, and \`.mean()\` averages it. Use \`urllib.request\` to download, and \`json.load\` to read each saved file. No SciPy and no automatic differentiation: every derivative in this project is yours.`,
    setup: {
      extensions: [...pythonExtensions, 'ms-python.debugpy', 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        'With the environment active, run `pip install numpy matplotlib pytest`, then `pip freeze > requirements.txt`.',
        'Install Git and create a free GitHub account for the repository and CI. No other accounts are needed, and the Wikimedia API needs no key.',
      ],
      structure: `half-life-of-attention/
├── attention/
│   ├── fetch.py           # polite download with caching and retry
│   ├── series.py          # peak finding and alignment
│   ├── models.py          # decay curves, derivatives, closed-form results
│   ├── fit.py             # forward and backward passes, gradient descent
│   ├── numeric.py         # trapezoid, Simpson, safe_newton
│   ├── analyse.py         # one article end to end
│   ├── report.py          # all tables and figures
│   └── cli.py
├── data/
│   ├── events.txt
│   └── raw/               # committed snapshot of every API response
├── docs/
│   ├── DERIVATIONS.md     # every formula, by hand
│   └── REPORT.md          # results, with what they do not show
├── figures/
├── tests/
├── .github/workflows/ci.yml
├── requirements.txt
└── README.md`,
      commands: [
        { label: 'Download the snapshot once', command: 'python -m attention.cli fetch data/events.txt' },
        { label: 'Analyse one article', command: 'python -m attention.cli analyse Stephen_Hawking 2018-03-14' },
        { label: 'Rebuild every table and figure', command: 'python -m attention.cli report' },
        { label: 'Run the tests', command: 'python -m pytest' },
      ],
    },
    requirements: [
      '`fetch` downloads each event as specified, waits between requests, retries on 429, never re-downloads a saved file, and records a SHA-256 checksum for each file in `data/raw/MANIFEST.txt`. Analysis code never touches the network.',
      '`series.py` finds the peak and aligns each article by $t$, and rejects any article without all 151 days, with a clear message.',
      '`models.py` has both decay curves with hand-derived $dE/dt$ for the excess $E(t) = M(t) - B$. `docs/DERIVATIONS.md` derives the relative decay rate $-E\'/E$ using logarithmic differentiation: the constant $k$ for the exponential and $p/(1 + t)$ for the power law. The report explains what it means that older attention fades more slowly.',
      '`fit.py` computes $L$ and $\\nabla L$ with an explicit forward pass through $t \\to E \\to M \\to \\ln M \\to r \\to L$ that stores each intermediate, then a backward pass written by hand. A test confirms each gradient component against a central difference, to a relative error below $10^{-5}$, for both models and at least 3 articles.',
      'Gradient descent follows the method in the overview exactly, and reports its loss history. `report.py` plots one curve of loss against step.',
      'For every article, closed forms from `docs/DERIVATIONS.md` give the half-life of the excess ($\\ln 2 / k$ and $2^{1/p} - 1$), the area $\\int_0^T E\\,dt$, the total area to infinity, or a statement that it diverges, and the mean age of a view to infinity, or a statement that it diverges. The divergence conditions are proved in `docs/DERIVATIONS.md`.',
      'Treat $E(t)$ on $[0, 365]$ as a density once it is divided by its area. `analyse` reports its cumulative share after 7 days, its median age and its mean age. The median comes from `safe_newton` solving $F(T) = 1/2$ with $F\' = f$, and it is checked against a closed form. The mean comes from Simpson\'s rule and is checked against an exact integral.',
      'A test compares the trapezoid area of the observed excess $\\max(V - B, 0)$ with the model area. `docs/REPORT.md` explains why fitting in log space under-weights the peak, and what that does to the total.',
      '`docs/DERIVATIONS.md` gives the Taylor expansions of $(1 + t)^{-p}$ and $e^{-pt}$ at 0 and shows they first differ at second order. A test compares $L(\\hat{p} \\pm 0.1)$ with the quadratic model built from a numerical $L\'\'(\\hat{p})$, with $B$ and $A$ held fixed.',
      '`report.py` regenerates all figures and a table with one row per article, with exponents and model comparison. `docs/REPORT.md` compares the four categories, states which model wins where, names at least 3 specific weaknesses of the analysis, and says what the results do not show about causes.',
    ],
    acceptanceTests: [
      '`Stephen_Hawking` peaks on 2018-03-14 with 7.0 to 7.3 million views. Exponential fit: $k$ in $[0.19, 0.21]$, half-life in $[3.3, 3.6]$ days, root mean square log error in $[0.32, 0.34]$. Power fit: $p$ in $[1.75, 1.80]$, $B$ in $[13{,}500, 15{,}000]$, $A$ in $[5.6, 6.1]$ million, error in $[0.21, 0.23]$. So the power law wins.',
      'For `Stephen_Hawking` under the power fit: half-life of the excess in $[0.46, 0.50]$ days, total to infinity in $[7.2, 7.9]$ million views, first-week share of the first year in $[0.79, 0.83]$, median age in $[1.3, 1.5]$ days and mean age on $[0, 365]$ in $[8.0, 9.5]$ days. The observed trapezoid area over $t = 0, \\dots, 150$ is larger than the model area, by a ratio near 1.2.',
      '`Barbie_(film)` has an exponential error near 0.245 against a power error near 0.320, so the exponential wins, with $k$ in $[0.055, 0.059]$. `Top_Gun:_Maverick` has $p$ in $[0.60, 0.66]$, so its total diverges and the tool must say so, with a median age within the first year in $[68, 79]$ days.',
      'The solar eclipse of August 2017 has $p$ in $[1.96, 2.03]$. The fitted relative decay rate at $t = 1$ for `Stephen_Hawking` is in $[0.87, 0.90]$ per day, and at $t = 10$ in $[0.159, 0.164]$, while the exponential rate stays near 0.20.',
      'By category, the power law beats the exponential in 8 of 8 deaths, 5 of 5 sudden events, 6 of 7 scheduled events and 2 of 8 releases, 21 of 28 overall. The median $p$ is near 1.78 for deaths and scheduled events, near 1.66 for sudden events and near 0.97 for releases. Between 18 and 21 articles have $p > 1$, and exactly 2 have $p > 2$.',
      'For `Stephen_Hawking`, $L\'\'(\\hat{p})$ with $B$ and $A$ fixed is about 2.27, and the quadratic model predicts $L(\\hat{p} \\pm 0.1)$ to within 5% of the true loss. All gradient checks pass at the stated tolerance, and the whole `report` command finishes in under 5 minutes on a laptop CPU.',
    ],
    coverage: [
      { module: 'functions-and-limits', demonstrates: 'Exponential, logarithmic and power models are chosen and compared, log loss handles several orders of magnitude, and limits at infinity decide totals.' },
      { module: 'derivatives', demonstrates: 'Hand-derived decay rates, with logarithmic differentiation showing that power-law attention fades more slowly with age.' },
      { module: 'applications-of-derivatives', demonstrates: 'Optimising a model by minimising a loss, and a safeguarded Newton solver that finds the median age.' },
      { module: 'integration', demonstrates: 'Closed-form areas from antiderivatives, substitution for the shifted power, and integration by parts for the mean age.' },
      { module: 'applications-of-integrals', demonstrates: 'Improper integrals decide whether attention is finite, a fitted curve becomes a density with a cumulative share and expected age, and Simpson\'s rule checks them.' },
      { module: 'towards-many-variables', demonstrates: 'Gradient descent on three parameters, a hand-written backward pass checked by finite differences, and a quadratic Taylor model of the loss.' },
    ],
    portfolio: [
      'The README opens with one chart showing all 28 decay curves by category, and states the main finding in one sentence.',
      'The README shows the `analyse` command running on an article the reader chooses, and it explains the rate limit and how the snapshot is used.',
      '`docs/DERIVATIONS.md` renders well on GitHub, using its math support, and contains every formula with its proof.',
      'GitHub Actions runs the tests on every push, using the committed snapshot and no network access, with a status badge in the README.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, the data snapshot with its manifest, and a commit history of small, descriptive commits.',
      '`docs/REPORT.md` ends with a section of limitations, written so that a sceptical reader would trust the rest of it.',
    ],
    resources: [
      { title: 'Wikimedia Analytics API: page views', url: 'https://doc.wikimedia.org/generated-data-platform/aqs/analytics-api/reference/page-views.html', type: 'documentation', cost: 'free', provider: 'Wikimedia', note: 'The endpoint reference. Note the rate limits and the request for a descriptive User-Agent.' },
      { title: 'The universal decay of collective memory and attention', url: 'https://www.nature.com/articles/s41562-018-0474-5', type: 'article', cost: 'free', provider: 'Nature Human Behaviour', note: 'A published study of a similar question, using a two-exponential model. Read it after your own first results, then compare.' },
    ],
    stretchGoals: [
      'Add a two-exponential model, $B + A e^{-kt} + D e^{-mt}$, with its own hand-derived gradient, and report for how many events it beats the power law.',
      'Add a small static website with the 28 interactive curves, published through GitHub Pages.',
    ],
  },
});
