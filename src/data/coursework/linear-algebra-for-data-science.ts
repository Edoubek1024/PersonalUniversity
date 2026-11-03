import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-toolsai.jupyter'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org. On Windows, tick "Add python.exe to PATH". On macOS or Linux, use `python3` to create the environment below.',
  'In the project folder, run `python -m venv .venv`, then activate it with `.venv\\Scripts\\Activate.ps1`, or `source .venv/bin/activate` on macOS or Linux. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
];

export default defineCoursework({
  subjectId: 'linear-algebra-for-data-science',
  machineProblems: [
    {
      slug: 'mp1-massey',
      title: 'massey: rating NFL teams with one linear system',
      afterModule: 'linear-systems',
      coversModules: ['vectors-and-matrices-as-data', 'linear-systems'],
      summary: 'Rate every NFL team by solving one singular linear system with your own LU code, then use rank, null spaces and condition numbers to see when the schedule can and cannot support a rating.',
      language: 'Python 3.12',
      estimatedHours: 12,
      overview: `A win over a strong team should count for more than a win over a weak one, and strength depends on everyone's results, so the ratings are all tied together. Ken Massey's answer is one linear system. It is also a clean, real example of everything in the first two modules, because that system is singular on purpose, and its rank says something true about the schedule.

**The model.** Give each team a rating $r_i$, and suppose the home margin in a game is about $r_{\\text{home}} - r_{\\text{away}}$. Write each game as one row of a matrix $X$ with $+1$ for the home team and $-1$ for the away team, and let $y$ hold the margins. Massey's system is

$$M r = p, \\quad \\text{where } M = X^TX, \\quad p = X^Ty.$$

Read row $i$: team $i$'s games times its rating, minus the sum of its opponents' ratings, equals its total point difference. You will see in Module 3 why this is the right system, and here you can take it as given.

**Why it is singular.** Every row of $M$ sums to zero, so $M\\mathbf{1} = 0$. Only rating differences matter: add 10 to every team and nothing changes. So the rank is at most $n - 1$. The standard fix replaces the last row of $M$ with all ones and the last entry of $p$ with 0, which forces the ratings to sum to zero.

**Rank is the schedule.** Early in a season the league falls into separate groups that have not played each other. Each group adds one dimension to the null space, and ratings between groups cannot be compared at all. The rank tells you when that ends.

**The data.** Use the nflverse game table at \`https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv\`. It is updated every season, so save it to \`data/\` and treat it as a frozen snapshot. Use the rows with \`game_type == "REG"\` and with scores, for seasons 2019 to 2024. The columns you need are \`season\`, \`week\`, \`home_team\`, \`away_team\`, \`home_score\` and \`away_score\`. Build the team list per season, since franchise codes change. All games count as home games for simplicity, including a few neutral-site ones.

**Constraints.** NumPy and pandas are allowed. Your elimination, LU, solve, rank and null space must be your own, and \`np.linalg.solve\`, \`scipy.linalg\` and \`np.linalg.matrix_rank\` may appear only in tests. \`np.linalg.cond\` is allowed, because singular values come later in the course.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install numpy pandas matplotlib pytest`.', 'Download the data file named in the overview into `data/games.csv`.'],
        structure: `massey/
├── data/
│   └── games.csv           # frozen snapshot, do not refresh
├── massey/
│   ├── data.py             # load_games, team_index, incidence
│   ├── solve.py            # lu, lu_solve, rank, null_space_basis
│   ├── ratings.py          # massey_system, ratings, components
│   └── experiments.py      # weekly table, perturbation, backtest
├── run.py                  # prints tables and writes figures
├── figures/
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Print the ratings for one season', command: 'python run.py ratings --season 2023' },
          { label: 'Regenerate all tables and figures', command: 'python run.py all' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`incidence(games, teams)` builds $X$ and $y$. `massey_system` returns $M$ and $p$ from $X^TX$ and $X^Ty$, and a test confirms that $M$ has games played on its diagonal, minus the head-to-head count off it, and that every row sums to 0.',
        '`lu(A)` does Gaussian elimination with partial pivoting, returning a permutation, a unit lower triangular $L$ and an upper triangular $U$. `lu_solve` uses forward and back substitution. Tests check $PA = LU$ and agreement with `np.linalg.solve` on 100 random systems of size 50.',
        'A test solves $\\begin{bmatrix} 10^{-20} & 1 \\\\ 1 & 1 \\end{bmatrix} x = (1, 2)$ with pivoting on and off, and shows the wrong answer without it.',
        '`rank(A, tol=1e-9)` and `null_space_basis(A, tol=1e-9)` use your own row reduction. Tests confirm that $Av \\approx 0$ for each basis vector, that the basis has $n - r$ vectors, and that they are independent.',
        '`ratings(M, p)` applies the sum-to-zero fix, and solves with your LU. A test confirms that adding the same constant to every rating leaves $Mr$ unchanged.',
        '`components(M)` finds the groups of teams connected by the schedule so far: start a group with any unused team, keep adding any team with a non-zero off-diagonal entry against a team already in the group, then repeat for the teams left over. A test confirms rank $= n -$ components for every week of every season.',
        'The weekly experiment reports, for each week of 2023 and using all games up to that week, the rank, the number of components, and the condition number of the fixed system. `REPORT.md` explains why the condition number falls and what ratings mean before the schedule is connected.',
        'The perturbation experiment adds 7 points to the home score of the first game in the season, then compares the relative change in $r$ with the bound $\\kappa\\,\\|\\Delta b\\|/\\|b\\|$, at week 3, week 4 and week 18.',
        'The backtest rates teams using games through week $w$, then predicts the winners of later games with $r_{\\text{home}} - r_{\\text{away}} \\ge 0$. It compares with two baselines: always pick the home team, and pick the team with more wins so far, with ties to the home team. Tied games are dropped. It runs for $w = 4, 8, 12$ over all six seasons.',
        '`similar_teams` computes cosine similarity between rows of the opponent count matrix, and `REPORT.md` explains the result. `REPORT.md` ends by saying what the ratings show and do not show, including what they ignore, such as injuries and home advantage.',
      ],
      acceptanceTests: [
        'For 2023 there are 272 games, 32 teams and 17 games each. $M$ has rank 31, and its null space is spanned by the all-ones vector. The largest ratings are BAL 13.44, SF 11.48, DAL 8.92 and BUF 6.74, and the smallest are WAS $-11.40$ and CAR $-10.15$. KC is 4.02 with a point difference of 77, and DET is 4.00 with 66. Your LU agrees with `np.linalg.solve` to within $10^{-10}$.',
        'Using 2023 games to date: week 1 gives rank 16 and 16 components, week 2 gives rank 29 and 3 components of sizes 8, 12 and 12, with the smallest being ARI, BUF, DAL, DEN, LV, NYG, NYJ and WAS. From week 3 on, the rank is 31. The condition number of the fixed system is about 54.7 at week 3, 21.2 at week 4, 11.0 at week 8 and 8.10 at week 18.',
        'At week 2 of 2023, the system is consistent, and adding 1 to all 8 teams in the smallest group leaves $Mr$ unchanged, so ratings between groups are not determined.',
        'Adding 7 points to the first game of 2023 (DET at KC, week 1) changes the ratings by a relative 0.0885 at week 3, against a bound of about 3.19, and by 0.0189 at week 18, against about 0.153. The largest single rating change is about 2.42 at week 3 and 0.41 at week 18.',
        'Pooled over 2019 to 2024 with $w = 8$: 867 games, with the Massey rule right on 548 (63.2%), the home team on 476 (54.9%) and the record rule on 538 (62.1%). At $w = 12$, over 526 games, the three are about 65.4%, 53.6% and 66.0%. For 2023 alone at $w = 8$, they are 94, 86 and 96 of 150.',
        'In the 2023 schedule, the highest cosine between two teams is about 0.696, reached by pairs of division rivals such as ATL and NO. For `lu` on random matrices, the time ratio from $n = 400$ to $n = 800$ is between 4 and 16, consistent with $O(n^3)$.',
      ],
      resources: [
        { title: 'nflverse/nfldata', url: 'https://github.com/nflverse/nfldata', type: 'dataset', cost: 'free', provider: 'nflverse', note: 'The repository behind the game table, with a description of its columns.' },
        { title: 'Kenneth Massey', url: 'https://en.wikipedia.org/wiki/Massey_Ratings', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'Background on the rating system you are building.' },
      ],
      stretchGoals: [
        'Add a home advantage as one more unknown, and work out the new system from the new columns of $X$.',
        'Split the league by conference, keep only a few cross-conference games, and watch the condition number rise as the link between the two groups gets thinner.',
      ],
    },
    {
      slug: 'mp2-hubrank',
      title: 'hubrank: what really holds the world\'s air network together?',
      afterModule: 'eigenvalues-and-networks',
      coversModules: ['orthogonality-and-regression', 'eigenvalues-and-networks'],
      summary: 'Rank airports with your own PageRank, explain the rankings with your own QR regression, then use Laplacian eigenvectors and node removal to show why the biggest hubs are not the most irreplaceable ones.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `Amsterdam connects to more airports than any other in the OpenFlights data, 248 of them. Remove it and every other airport can still reach every other. Anchorage connects to 34, and removing it strands 87 airports. So which is more important? It depends on what you mean, and this MP is about making that precise with linear algebra.

You will build a network of world air routes and answer three questions, each with a different matrix. A **Markov chain** asks where a random passenger ends up: PageRank. **Regression** asks whether that is just a function of size, and residuals find the airports that punch above their weight. A **Laplacian** asks where the network is weakest. Each measure tells a different story, and your report has to reconcile them.

**The data.** OpenFlights publishes \`routes.dat\` and \`airports.dat\`, at \`https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat\` and \`airports.dat\` in the same folder. They are comma-separated with no header row, and missing values are written \`\\N\`. The route data have not been updated since 2014, so this is a historical snapshot, and you should say so in your report. Still, save your own copies in \`data/\`.

- In \`routes.dat\`, field 3 is the source airport id and field 5 the destination id, counting from 0.
- In \`airports.dat\`, field 0 is the id, then 1 name, 2 city, 3 country, 4 IATA code, 6 latitude, 7 longitude and 11 time zone.

**Building the graph.** Drop routes with a missing id, an id not in \`airports.dat\`, or the same source and destination. Let $W_{ij}$ be the number of rows from $i$ to $j$, which counts airlines on a route, and let $U$ be the symmetric 0/1 matrix with $U_{ij} = 1$ if there is a route either way. Keep only the largest connected component of $U$, for both $W$ and $U$. The degree of an airport is its row sum in $U$.

**PageRank.** Use $W$ with row sums for the transition matrix, damping $d$, and spread the probability on dangling airports evenly, as in the lesson. Iterate until the $\\ell_1$ change is below $10^{-12}$.

**Householder QR.** The lesson describes this method, and here is the formula. To clear column $k$ below the diagonal, let $a$ be that column from row $k$ down, and set $v = a + \\text{sign}(a_1)\\|a\\| e_1$. Then apply $H = I - 2vv^T/(v^Tv)$ to the remaining rows and columns of $R$, without forming $H$: compute \`A -= 2 * np.outer(v, v @ A) / (v @ v)\`. $Q$ is the product of the reflections, and you can get its thin form by applying them in reverse order to the first $p$ columns of the identity.

**Constraints.** NumPy, pandas and matplotlib are allowed, and $3188 \\times 3188$ dense matrices are fine, at about 80 MB each. Your QR and PageRank must be your own, with \`np.linalg.qr\` and \`np.linalg.lstsq\` in tests only. You may use \`np.linalg.eigh\` for the Laplacian, which takes a few seconds. Sparse matrices are not needed yet.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install numpy pandas matplotlib pytest`.', 'Download the two data files named in the overview into `data/`.'],
        structure: `hubrank/
├── data/
│   ├── routes.dat
│   └── airports.dat
├── hubrank/
│   ├── build.py            # parse, filter, W, U, largest component
│   ├── markov.py           # pagerank, random_walk, stationary
│   ├── qr.py               # householder_qr, solve_upper, least_squares
│   ├── regress.py          # design matrix, R squared, residual tables
│   ├── spectral.py         # laplacians, sweep_cut, region summary
│   └── robustness.py       # node removal experiments
├── run.py
├── figures/
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Rebuild every table and figure', command: 'python run.py all' },
          { label: 'Rank the top airports', command: 'python run.py pagerank --d 0.85 --top 20' },
          { label: 'Remove an airport and report the damage', command: 'python run.py remove ANC' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`build.py` applies the filtering rules exactly, and reports the counts at each stage: rows, rows kept, directed pairs, airports, components and the size of the largest.',
        '`pagerank(W, d, tol)` handles dangling airports correctly, and it returns the vector and the iteration count. Tests confirm that the result sums to 1, and that it is a fixed point of the full update to within $10^{-10}$.',
        '`random_walk(U, start, steps)` starts a walker at one airport on the undirected graph, and records $\\|x_t - \\pi\\|_1$ with $\\pi$ proportional to degree. `REPORT.md` proves that $\\pi$ is stationary, and links the decay rate to the eigenvalues of the walk matrix.',
        'An experiment runs PageRank at $d = 0.5, 0.85, 0.95, 0.99$, reports the iterations and the top 5, and explains how $d$ bounds the convergence rate.',
        '`householder_qr(A)` uses Householder reflections to give a thin $Q$ and $R$. `least_squares` solves $R\\beta = Q^Ty$. Tests check $Q^TQ = I$ to $10^{-12}$ and agreement with `np.linalg.lstsq`. A test compares normal equations and QR on an ill-conditioned example.',
        '`regress.py` fits $\\ln(\\text{PageRank})$ on $\\ln(\\text{degree})$, then adds the mean $\\ln(\\text{degree})$ of an airport\'s neighbours. It reports the coefficients, $R^2$, $\\kappa(X)$ and $\\kappa(X^TX)$, a residual plot and the leverage of the top airports.',
        '`REPORT.md` lists the largest positive residuals among airports with degree at least 20, and explains them in plain language using the structure of the network.',
        '`spectral.py` builds $L$ and the normalised Laplacian, finds the smallest eigenvalues, and confirms that the number of zero eigenvalues is 1. `sweep_cut` sorts nodes by the second eigenvector scaled by $D^{-1/2}$, and finds the threshold with lowest conductance.',
        'The sweep cut is reported as a region. `REPORT.md` says which airports form the small side, and which routes cross the cut, and explains why the weakest cut is not a split between continents.',
        '`robustness.py` removes each airport in turn, and reports the size of the largest remaining component. It compares removing the top 10 by degree, by PageRank, and by airports stranded. `REPORT.md` reconciles the three rankings, and states what a 2014 list of routes without passenger counts cannot show.',
      ],
      acceptanceTests: [
        'Filtering gives 67,663 rows, 66,770 kept, 36,906 distinct directed pairs and 3,214 airports in 7 components, and the largest has 3,188 airports. There it holds 18,833 undirected edges, 36,860 directed pairs and 15 dangling airports. The top degrees are AMS 248, FRA 244, CDG 240, ISL 233 and ATL 217.',
        'PageRank at $d = 0.85$ takes 113 iterations, with ATL 0.986%, ORD 0.620%, LAX 0.593%, DFW 0.569% and CDG 0.520%. The iteration counts for $d = 0.5, 0.85, 0.95, 0.99$ are 32, 113, 275 and 605. The top 5 at $d = 0.5$ are ATL, DME, DFW, ORD, DEN. The Spearman correlation of PageRank at 0.85 with degree is about 0.85.',
        'A walker starting at ATL has $\\|x_t - \\pi\\|_1$ of about 0.0041 at 100 steps, $7.9 \\times 10^{-7}$ at 500 and $1.7 \\times 10^{-10}$ at 1,000. The stationary leader is AMS at 0.658%. The normalised Laplacian has second eigenvalue about 0.0167, so the walk has $|\\lambda_2| \\approx 0.983$.',
        'Regressing $\\ln(\\text{PageRank})$ gives $(-9.66, 0.664)$ with $R^2 = 0.813$ on degree alone, and $(-8.95, 0.687, -0.225)$ with $R^2 = 0.884$ after adding neighbours. With neighbours, $\\kappa(X) \\approx 13.0$ and $\\kappa(X^TX) \\approx 169$. In the simple model, among airports with degree at least 20, the largest residuals are ATL 1.47, ANC 1.39, SYD 1.25, BNE 1.23 and LAX 1.21.',
        'The best sweep cut has conductance about 0.0327, with 131 airports on the small side, all in Alaska, and 13 edges crossing. Of those, 10 leave from ANC, and the others are from JNU, KTN and FAI, all to SEA.',
        'Removing AMS or FRA leaves 3,187 airports in one piece. Removing ATL leaves 11 components, the largest with 3,176. Removing ANC leaves 13 components, the largest with 3,100, so 87 are stranded. The top stranding airports are ANC 87, PPT 26, BOG 24, YZF 19, then DEN and BET with 18. Removing the top 10 by degree leaves a largest component of 3,129, while the top 10 by stranding leaves 2,933.',
      ],
      resources: [
        { title: 'OpenFlights: Airport and airline data', url: 'https://openflights.org/data', type: 'dataset', cost: 'free', provider: 'OpenFlights', note: 'The field definitions and licence for both files.' },
        { title: 'Mining of Massive Datasets', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 5 for PageRank in practice.' },
        { title: 'A Tutorial on Spectral Clustering', url: 'https://arxiv.org/abs/0711.0189', type: 'article', cost: 'free', provider: 'Ulrike von Luxburg', note: 'For the normalised Laplacian and sweep cuts.' },
      ],
      stretchGoals: [
        'Remove Alaska and repeat the sweep cut to find the next weakest region, and continue until the regions stop being interesting.',
        'Compare the undirected walk with the weighted, directed one, and find airports where the two disagree the most.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-congress-on-a-line',
    title: 'Congress on a line: how far can one number explain the House?',
    repoName: 'congress-on-a-line',
    summary: 'Use the full toolkit on every roll call vote in the US House: find how much a single dimension explains, measure the rise of that dimension over 70 years, then show exactly where linear methods break and what replaces them.',
    language: 'Python 3.12',
    estimatedHours: 40,
    overview: `One number per legislator predicts over 94% of US House votes. That is a famous finding from political science, and an SVD will reproduce it in a second. But which part of it comes from linear algebra, and which part from the nature of voting? This project is a careful answer: it shows what linear methods do remarkably well on real data, and finds, with evidence, exactly where they stop working.

**The hook.** The first singular vector of a House vote matrix is a superb summary, and its share of the variance has more than doubled since the 1950s. Yet three things go wrong in ways you can measure.

1. **Votes are steps, not lines.** A rank-1 model predicts along a slope. Real voters flip at a threshold. Fitting a threshold on one dimension does as well on held-out votes as a rank-3 linear model.
2. **The second dimension is mostly a bend.** $\\text{PC}_2$ looks like a second axis of politics. Nearly all of it turns out to be a curved function of position on the first, a horseshoe, as in the lesson on non-linear structure.
3. **Ends against the middle.** On some votes, the far left and the far right vote together against the centre. No single cut along a line can draw that, and in April 2024 this happened on surveillance votes.

Treat this as a study of a mathematical model. A coordinate measures patterns in votes, and it does not measure beliefs, quality or motives. Left and right here are just the two ends of an axis.

**Data.** Voteview publishes every roll call. For Congress number \`NNN\` (with three digits, such as 117), download these to \`data/raw/\`:

\`\`\`text
https://voteview.com/static/data/out/votes/HNNN_votes.csv
https://voteview.com/static/data/out/members/HNNN_members.csv
https://voteview.com/static/data/out/rollcalls/HNNN_rollcalls.csv
\`\`\`

Use Congresses 85, 90, 95, 100, 105, 110, 115, 116, 117 and 118, about 125 MB in total. Record SHA-256 checksums in \`data/MANIFEST.txt\`, and cite Voteview as it asks. Scores can be revised, so results come from your frozen files, and the tests use ranges.

**Building the matrix.** Keep rows of the members file with \`chamber == "House"\`. Code \`cast_code\` 1, 2, 3 as $+1$, codes 4, 5, 6 as $-1$, and everything else as missing. Keep roll calls where the smaller side is at least 2.5% of those voting yes or no. Keep members with at least 25 votes across all roll calls in that Congress. Call the result $A$, with mask $M$.

**Centring.** Subtract each roll call's mean over observed entries, and put 0 in missing entries, giving $Z$. Flip the sign of $\\text{PC}_1$ if needed, so it correlates positively with \`nominate_dim1\`. The score of member $i$ is $x_i = U_{i1}\\sigma_1$.

**The step model.** Start from $x$. Then repeat 8 times. For each roll call, choose the cut and direction that classify the most votes correctly. Then, for each member, choose the position on a grid of 401 points from $\\min x - 1$ to $\\max x + 1$ that classifies the most of that member's votes correctly, taking the median of any tied positions. This is a simplified form of Keith Poole's Optimal Classification, which you should cite.

**Hold-out.** Hide 10% of observed votes with \`hold = M & (np.random.default_rng(seed).random(M.shape) < 0.1)\`, for seeds 0, 1 and 2. Fit everything on the rest. Predict with the sign, with $\\ge 0$ as yes.

**ALS.** Use rank $k$, $\\lambda = 1$, 30 rounds, roll call means from training votes, and factors starting from $0.1$ times normal draws.`,
    setup: {
      extensions: [...pythonExtensions, 'ms-python.debugpy', 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        'With the environment active, run `pip install numpy scipy pandas matplotlib pytest`, then `pip freeze > requirements.txt`.',
        'Install Git and create a free GitHub account for the repository and CI. Everything here runs on a laptop CPU in a few minutes, and no GPU or paid service is needed.',
      ],
      structure: `congress-on-a-line/
├── line/
│   ├── data.py            # download, checksums, matrix building
│   ├── explore.py         # cosines, rank, duplicate votes
│   ├── svd_tools.py       # scores, trend across Congresses, masked projection
│   ├── regress.py         # response curves by QR, residuals
│   ├── graph.py           # agreement network, Laplacian, PageRank
│   ├── als.py             # masked factorisation and baselines
│   ├── step.py            # one-cut and two-cut models, refinement
│   ├── scale.py           # sparse stacking, randomised SVD
│   ├── report.py          # every table and figure
│   └── cli.py
├── data/
│   ├── MANIFEST.txt
│   └── fixture/           # a small sample for CI
├── docs/
│   ├── REPORT.md          # results and limits
│   └── METHODS.md         # the mathematics, with derivations
├── figures/
├── tests/
├── .github/workflows/ci.yml
├── requirements.txt
└── README.md`,
      commands: [
        { label: 'Download and check the data', command: 'python -m line.cli fetch' },
        { label: 'Rebuild the report tables and figures', command: 'python -m line.cli report' },
        { label: 'Explain one vote', command: 'python -m line.cli vote --congress 118 --roll 854' },
        { label: 'Run the tests', command: 'python -m pytest' },
      ],
    },
    requirements: [
      '`data.py` follows the matrix-building rules exactly, verifies checksums, and caches built matrices. `explore.py` reports cosine neighbours for any member, the number of distinct roll call columns, the number of roll call pairs with cosine at least 0.99, and the singular value ratio $\\sigma_1/\\sigma_{10}$. `docs/REPORT.md` explains what near-duplicate votes mean for rank.',
      '`svd_tools.py` reports for each Congress the variance share of the first two singular values, the rank-1 accuracy in-sample, and the correlation with `nominate_dim1`, and plots the trend. `docs/REPORT.md` states what the trend shows and what it cannot show about why.',
      '`regress.py` fits, with QR, each roll call on $x$, and on $x$ and $x^2$, using only members who voted, and reports the distribution of $R^2$. It also regresses $x$ on `nominate_dim1` and `nominate_dim2`.',
      '`graph.py` builds an agreement network, with weight $\\max(a_{ij} - 0.5, 0)$, where $a_{ij}$ is the fraction of shared votes on which two members agree, for pairs with at least 50 shared votes. It computes the Fiedler vector of the normalised Laplacian and compares it to $x$, and it reports PageRank, explaining any result that comes from low attendance.',
      '`svd_tools.py` shows the masking trap. For a named member, hide 80% of their votes, and compare the mean-filled projection $z \\cdot v_1$ with masked least squares on the remaining entries. `docs/REPORT.md` explains why part-term members look moderate.',
      '`als.py` implements masked ALS with the settings in the overview, plus two baselines: the training majority of each roll call, and the training majority of the member\'s party on that roll call. Hold-out accuracy is reported for ranks 1, 2, 3 and 5, for three seeds.',
      '`step.py` implements the step model, fitted on training votes only. `docs/REPORT.md` compares its hold-out accuracy with rank 1 and with rank 3, and states the claim that the data support, including how rank 5 compares.',
      'A test for the horseshoe sorts members by refined position, cuts them into 20 equal bins, and reports the $R^2$ of $\\text{PC}_2$ on the bin means. The report plots $\\text{PC}_2$ against refined position, and says how much of the second linear dimension is left once position is known.',
      '`step.py` also fits a two-cut rule for each roll call on the refined order, in which members inside a band vote one way and those outside it vote the other. `line vote` prints the yes share at the left, middle and right for any roll call. The report lists the roll calls with the largest gain, and reads their descriptions from the roll call file.',
      '`scale.py` stacks all 10 Congresses into one sparse matrix, with one row per `icpsr` and one column per contested roll call, each centred on observed votes. It compares your randomised SVD at $k = 10$, $p = 10$, with $q = 0, 1, 2$, against `scipy.sparse.linalg.svds` and a dense SVD, reporting time and error.',
    ],
    acceptanceTests: [
      'H117 has shape $(447, 840)$ and 5.5% missing, and H118 has shape $(451, 1119)$. For H117, the variance shares are 0.777 and 0.050, the rank-1 in-sample accuracy is 0.946, and $|r|$ with `nominate_dim1` is 0.965. 836 of the 840 columns are distinct, and 634 pairs have cosine at least 0.99. Regressing $x$ on the two NOMINATE dimensions gives $R^2 \\approx 0.93$.',
      'The first variance share is about 0.29, 0.36, 0.30, 0.47, 0.52, 0.70, 0.78, 0.78, 0.78 and 0.75 for Congresses 85, 90, 95, 100, 105, 110, 115, 116, 117 and 118, each within 0.02, and rank-1 accuracy rises from about 0.78 to about 0.94.',
      'H117 hold-out accuracy, over seeds 0, 1 and 2: roll call majority $[0.64, 0.66]$, party $[0.94, 0.95]$, rank 1 $[0.94, 0.95]$, rank 2 $[0.955, 0.963]$, rank 3 $[0.958, 0.964]$, rank 5 $[0.961, 0.967]$, and the step model $[0.958, 0.965]$. H118: party $[0.925, 0.935]$, rank 1 $[0.93, 0.94]$, rank 3 $[0.954, 0.961]$, rank 5 $[0.957, 0.963]$ and the step model $[0.954, 0.961]$. For the same seed, the step model beats rank 1 by at least 0.012, and it is within 0.002 of rank 3.',
      'Thomas Massie moves from about 355th of 447 by $x$ on H117 to about 445th by refined position. On H118 he moves from about 323rd of 451 to about 447th. Full-data training accuracy of the step model rises from about 0.962 to about 0.969 on H117, and from about 0.954 to about 0.966 on H118. The $R^2$ of $\\text{PC}_2$ on 20 bins of refined position is about 0.92 on H117 and 0.90 on H118.',
      'On the refined order, the two-cut rule beats the one-cut rule by at least 3% of votes cast on 8 roll calls of H117 and 25 of H118, and by at least 5% on 0 and 12. The largest gain is roll call 853 of H118, from about 0.65 to about 0.81, a gain of 69 members. For roll call 854, `Fourth Amendment Is Not For Sale Act`, the yes share is about 0.75 on the left, 0.19 in the middle and 0.82 on the right.',
      'Masking: for Alexandria Ocasio-Cortez on H117, $x \\approx -21.5$. Hiding 80% with seed 0 gives a mean-filled projection near $-4.5$ and masked least squares near $-21.7$. The Fiedler vector of the agreement network correlates with $x$ at about 0.98, separates the parties with no errors, and has normalised eigenvalues near 0.004 and 0.86. The stacked matrix has shape $(2328, 8610)$ and 3,535,233 non-zeros, and against `svds`, the relative error in $\\sigma_{10}$ is about 0.50, 0.05 and 0.002 for $q = 0, 1, 2$.',
    ],
    coverage: [
      { module: 'vectors-and-matrices-as-data', demonstrates: 'A vote table becomes a masked matrix with its cosine neighbours, with `@`-based code and explicit handling of what zero means.' },
      { module: 'linear-systems', demonstrates: 'Rank, duplicate roll calls and singular value ratios show how much of the table is redundant, and small solves run inside ALS.' },
      { module: 'orthogonality-and-regression', demonstrates: 'QR fits each roll call on position, residuals and a quadratic term expose non-linear response, and masked least squares fixes mean-filling.' },
      { module: 'eigenvalues-and-networks', demonstrates: 'The agreement network, its Laplacian and Fiedler vector recover the main axis independently, and PageRank shows how a measure can reflect attendance.' },
      { module: 'svd-and-pca', demonstrates: 'The SVD gives scores and a long-run trend, and ALS with honest baselines shows what low rank predicts on held-out votes.' },
      { module: 'scale-and-limits', demonstrates: 'Sparse stacking and a randomised SVD handle 70 years of votes, and the masking, step and horseshoe results document exactly where linear methods fail.' },
    ],
    portfolio: [
      'The README opens with two figures, the trend across Congresses and $\\text{PC}_2$ against refined position, with the main findings in three sentences.',
      '`docs/REPORT.md` reads as a short paper, with a clear claim per section, each stated with its uncertainty, and a section on what the analysis does not show.',
      '`line vote` lets a reader inspect any roll call, and a table of the top ends-against-the-middle votes links to their descriptions.',
      'GitHub Actions runs the tests on a small fixture on every push, with a status badge in the README. No network access is needed in CI.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, a data manifest and instructions to reproduce every figure, and it cites Voteview and the papers it builds on.',
    ],
    resources: [
      { title: 'Voteview: data', url: 'https://voteview.com/data', type: 'dataset', cost: 'free', provider: 'UCLA', note: 'File formats, field definitions and how to cite the data.' },
      { title: 'Horseshoes in multidimensional scaling and local kernel methods', url: 'https://arxiv.org/abs/0811.1477', type: 'article', cost: 'free', provider: 'Diaconis, Goel and Holmes', note: 'The mathematics of the arch, worked on US House votes.' },
      { title: 'Ends Against the Middle', url: 'https://doi.org/10.1017/pan.2022.33', type: 'article', cost: 'free', provider: 'Political Analysis', note: 'A published treatment of this pattern. Compare your simple two-cut rule with its method.' },
    ],
    stretchGoals: [
      'Add the Senate, and compare how much each chamber fits one dimension.',
      'Replace the step with a logistic response on one dimension, fitted by alternating Newton steps, and compare its hold-out log loss with the rank-$k$ models.',
    ],
  },
});
