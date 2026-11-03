import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. A laptop CPU is enough, and no GPU is needed.',
];

export default defineCoursework({
  subjectId: 'algorithms-for-data-science',
  machineProblems: [
    {
      slug: 'mp1-wattwindow',
      title: 'wattwindow: four years of one household, a minute at a time',
      afterModule: 'lists-stacks-and-queues',
      coversModules: ['analysing-algorithms', 'lists-stacks-and-queues'],
      summary:
        'Build a pure-Python streaming library for sliding windows, peak prominence and alerts, run it over 2 million minutes of real electricity use in almost no memory, and measure every cost claim you make.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `A smart meter in a house in Sceaux, France, recorded the household's power use once a minute for almost four years: 2,075,259 rows, from December 2006 to November 2010. The file is small enough to load, but it stands in for a stream you could never hold in memory. Your job is to answer questions about it with one row at a time and a fixed amount of state.

You write \`wattwindow\`, a small library with no NumPy or pandas in its streaming path. It has growable and circular buffers with counted copies, sliding mean, variance and maximum that cost $O(1)$ amortised per minute, an $O(n)$ monotonic-stack computation of peak prominence, and an alert rule built from those windows. Then you benchmark it against the naive way of writing each one.

The data rewards the work. The maximum over a 24-hour window, written naively, took 18 seconds on the first 200,000 minutes in a test run. The monotonic deque took 0.11 seconds and made fewer than 2 pushes and pops per row on the full file. A complete pass over all 2 million rows with a 24-hour window took about 2 seconds and 0.1 MB of Python allocations. You will also find a family holiday in August 2008 without being told about it, because the lowest 7-day mean in the file sits right there, and you will find that 1.25% of the minutes are missing, including one gap of more than five days that every window has to survive.

**Constraints.** The code in \`wattwindow/\` uses only the Python standard library. NumPy, pandas and SciPy may appear only in \`tests/\`, \`bench/\` and the report notebook, where they serve as the checks you compare against. Do not use heaps or anything from later modules, since nothing here needs them. Treat a Python \`list\` as a fixed-capacity block when you build your own containers: preallocate it, and never call \`append\` or \`insert\` on it.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas matplotlib pytest ruff jupyter ipykernel`.'],
        structure: `wattwindow/
├── wattwindow/structures.py  # DynArray, RingQueue, LinkedQueue
├── wattwindow/stream.py      # read_minutes generator
├── wattwindow/windows.py     # SlidingMean, SlidingVar, SlidingMax
├── wattwindow/peaks.py       # prominence with a monotonic stack
├── wattwindow/alerts.py      # streaming alert rule and episode count
├── wattwindow/__main__.py    # CLI: summary, extremes, alerts
├── bench/doubling.py         # doubling experiments and log-log slopes
├── bench/pandas_costs.py     # iterrows, itertuples, vectorised, concat
├── tests/                    # your acceptance tests, written with pytest
├── data/                     # household_power_consumption.txt, not committed
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install the package in editable mode', command: 'pip install -e .' },
          { label: 'Summarise the file with a 24-hour window', command: 'python -m wattwindow summary data/household_power_consumption.txt --window 1440' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Run the benchmarks', command: 'python bench/doubling.py --out results/doubling.csv' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`structures.py` has `DynArray(growth)` with `append`, `pop` and `__getitem__` that takes the growth rule as a function and counts element copies and resizes, plus `RingQueue(capacity)` on a preallocated list and `LinkedQueue` on singly linked nodes, each with `push`, `pop` and `__len__`.',
        '`stream.py` provides `read_minutes(path)`, a generator that reads one line at a time, skips the header, splits on `;`, and yields `Global_active_power` as a float or `None` when the field is `?`. It keeps no reference to earlier rows.',
        '`windows.py` provides `SlidingMean(w, min_valid)`, `SlidingVar(w, min_valid)` and `SlidingMax(w)`. Each has `push(x)` that returns the statistic over the last `w` minutes, or `None` if fewer than `min_valid` of those minutes have values. A missing minute takes up a slot in the window but is not counted. State is at most $O(w)$.',
        '`SlidingMean` and `SlidingVar` keep running totals of values and squared values, with a sample variance (`ddof=1`). `SlidingMax` uses a monotonic deque built on your own `RingQueue` and counts its pushes and pops.',
        '`peaks.py` computes the prominence of every point in $O(n)$ with a monotonic stack. Missing minutes are removed first. A walk from a peak stops at the first strictly higher value on each side, and if there is none, it runs to the end of the sequence. Plateaus are not special cased.',
        '`alerts.py` raises an alert at minute $t$ when the 5-minute mean (at least 4 valid) exceeds $\\mu + 3\\sigma$ of the 1,440 minutes that end 5 minutes before $t$ (at least 1,080 valid), and it counts alert minutes and episodes, where an episode is a run of consecutive alert minutes.',
        '`bench/doubling.py` fits a log-log slope to each of: `list.pop(0)` against `deque.popleft` for $n$ from 25,000 to 200,000, naive `max` over a slice against `SlidingMax`, and your three queues. Each measurement is the median of at least 3 runs on `time.perf_counter`.',
        '`bench/pandas_costs.py` compares `iterrows`, `itertuples` and a vectorised product for the sum of `Global_active_power` times `Voltage` at 5,000, 10,000 and 20,000 rows, and compares `pandas.concat` in a loop with collect-then-concat for 2,000, 4,000 and 8,000 frames of 100 rows.',
        'One `cProfile` run of the full summary command is saved, the two most expensive functions are named in the report, and one change you made because of it is shown with before and after timings.',
        '`REPORT.md` is about 3 pages: a predicted against measured table for every structure, a plot of the rolling 24-hour mean over the four years, the top peaks by prominence, when alerts happen by hour of day, and a paragraph on what a rule like this cannot tell you about the household.',
      ],
      acceptanceTests: [
        'The file has 2,075,259 data rows, one per minute with no skipped timestamps, and 25,979 missing values. The longest run of missing minutes is 7,226, from 2010-08-17 21:02 to 2010-08-22 21:27. Over valid minutes the mean is 1.0916 kW and the maximum is 11.122 kW at 2009-02-22 17:09.',
        'For 1,000,000 appends from capacity 1, `DynArray` reports 1,048,575 copies in 20 resizes for doubling, 2,099,753 copies in 34 resizes for $\\lfloor 1.5c \\rfloor$ with a minimum increase of 1, and 499,501,000 copies in 1,000 resizes for adding 1,000.',
        'On the full file, `SlidingMax(60)` equals `pandas.Series.rolling(60, min_periods=1).max()` exactly on every row and makes fewer than $2n$ deque operations. On a strictly decreasing and a strictly increasing list of 1,000,000 values with $w = 1000$, it also stays at or below $2n$. `SlidingMean` stays within 1e-9 of pandas and the standard deviation from `SlidingVar` stays within 1e-4 of pandas at $w = 60$ and $w = 1440$.',
        'Extremes match to 4 decimal places. The 60-minute mean (at least 45 valid) peaks at 7.0634 kW for the window ending 2009-01-16 20:45. The 1,440-minute mean (at least 1,080 valid) peaks at 3.5054 ending 2006-12-24 02:14 and bottoms at 0.1723 ending 2008-08-26 02:18. The 10,080-minute mean (at least 7,560 valid) bottoms at 0.1789 ending 2008-08-29 10:25.',
        'On the 2,049,280 valid values, `scipy.signal.find_peaks` finds 364,156 peaks. Your prominences match `scipy.signal.peak_prominences` within 1e-9 on the first 200,000 values. Over the whole series, 4,446 peaks have prominence at least 3 kW, 1,189 at least 5 kW and 188 at least 7 kW, and the largest is 11.0 kW at 2009-02-22 17:09. The alert rule gives 39,000 to 39,300 alert minutes in 4,450 to 4,550 episodes, with about 39,141 and 4,496 expected.',
        'Slopes and ratios on your machine: `list.pop(0)` at least 1.6 and `deque.popleft` at most 1.2, `concat` in a loop at least 1.5 and collect-then-concat at most 1.3. Naive 24-hour max on the first 200,000 minutes is at least 30 times slower than `SlidingMax`. At 20,000 rows `iterrows` is at least 1,000 times and `itertuples` at least 20 times slower than the vectorised product. A full pass with $w = 1440$ peaks below 1 MB in `tracemalloc`.',
      ],
      resources: [
        {
          title: 'Individual Household Electric Power Consumption',
          url: 'https://archive.ics.uci.edu/dataset/235/individual+household+electric+power+consumption',
          type: 'dataset',
          cost: 'free',
          provider: 'UCI Machine Learning Repository',
          note: 'The page explains each column. Download the 20 MB zip and do not commit the 133 MB text file.',
          primary: true,
        },
      ],
      stretchGoals: [
        'Add a sliding minimum, then use it with `SlidingMax` to report the widest swing in every 24-hour window.',
        'Stream the three `Sub_metering` columns as well, and find which circuit explains the morning and evening peaks.',
      ],
    },
    {
      slug: 'mp2-wikirace',
      title: 'wikirace: 51,000 human games against the graph they were played on',
      afterModule: 'design-paradigms',
      coversModules: ['trees-and-hashing', 'graphs', 'design-paradigms'],
      summary:
        'Rebuild the Wikispeedia graph with your own hash table, sketches and heaps, then measure how humans navigate it: BFS for the optimum, Dijkstra for the most human route, and alignment to compare paths.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Wikispeedia is a game: you are dropped on one Wikipedia article and told to reach another by clicking links, as fast as you can. Over several years, people finished 51,318 games on a 4,604-article snapshot, and gave up on another 24,875. The data is a rare gift, because it holds the graph, the true all-pairs distances, and tens of thousands of real attempts to navigate it.

So you can ask algorithmic questions with measured answers. How far from optimal are people? In a test run, the average finished game took 5.76 clicks where 2.85 were possible, and only one game in five was optimal. Can you recover the way people think? If you weight each link by $-\\log$ of how often people click it, Dijkstra's shortest path becomes the most probable route, and it sits closer to held-out human paths than a BFS path does, by an edit distance measure you write yourself. Does a simple rule beat them? A greedy navigator that picks the link whose neighbours overlap most with the target's reached the goal 99% of the time at 3.6 clicks, though it sees the whole graph and people do not.

The graph is small on purpose. Building it from your own structures keeps every cost visible, and BFS from every article finishes in seconds if you use a frontier of sparse boolean matrices. The file of true distances lets you prove your BFS is right to the last cell.

**Constraints.** The name table, Bloom filter, count-min sketch, binary heap, union-find, edit distance and Hirschberg alignment are all yours, written without \`dict\`-based shortcuts inside those classes and without \`heapq\`. Use NumPy and SciPy for arrays and for checks, and \`scipy.sparse\` for the all-pairs frontier. Do not use NetworkX in \`wikirace/\`. Nothing here needs an optimisation solver. The whole pipeline must finish in under 10 minutes on a laptop CPU.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [...pyToolchain, 'Install the packages: `pip install numpy scipy pandas matplotlib pytest ruff jupyter ipykernel`.', 'Download `wikispeedia_paths-and-graph.tar.gz` from the SNAP page. Windows 10 includes `tar`, so `tar -xzf wikispeedia_paths-and-graph.tar.gz -C data` works in the terminal.'],
        structure: `wikirace/
├── wikirace/intern.py      # open-addressing name table
├── wikirace/load.py        # parse files, resolve back clicks with a stack
├── wikirace/sketches.py    # BloomFilter, CountMin
├── wikirace/heap.py        # BinaryHeap and top_k
├── wikirace/graph.py       # CSR arrays, BFS, frontier all-pairs, shortest path counts
├── wikirace/components.py  # union-find and BFS components
├── wikirace/routes.py      # click weights and Dijkstra
├── wikirace/align.py       # edit distance, banded, traceback, Hirschberg
├── wikirace/navigators.py  # random, degree and overlap navigators
├── wikirace/__main__.py    # CLI: stats, route, race
├── tests/                  # your acceptance tests, written with pytest
├── data/                   # the SNAP files, not committed
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Print graph and game statistics', command: 'python -m wikirace stats --data data/wikispeedia_paths-and-graph' },
          { label: 'Find the most human route between two articles', command: 'python -m wikirace route Brain Telephone --data data/wikispeedia_paths-and-graph' },
          { label: 'Race the navigators on the test pairs', command: 'python -m wikirace race --seed 0 --out results/race.csv' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Lint', command: 'ruff check .' },
        ],
      },
      requirements: [
        '`intern.py` maps article names to integer ids with open addressing over preallocated arrays, resizes above a load factor of 0.7, and reports probe counts. All other modules work with those integers. Ids follow the order of `articles.tsv`.',
        '`load.py` reads every file, skips `#` comments, and replays each game with a stack so that `<` returns to the previous page. It gives the forward clicks made, including those later undone, and the surviving path after undone clicks are removed.',
        '`BloomFilter` uses 10 bits per link and 7 hash positions from double hashing of a `hashlib.blake2b` digest, stores every link in `links.tsv`, and is used to flag forward clicks that follow no listed link.',
        '`CountMin` has width 2,048 and depth 4. It counts every forward click as a (source, target) pair in one pass, and `top_k` keeps the 20 largest estimates in your own `BinaryHeap`. Exact counts exist only in tests.',
        '`graph.py` stores CSR arrays with neighbours sorted by id, runs single-source BFS on them, and computes all pairs with a frontier that advances by sparse boolean matrix products. A dynamic program over BFS layers counts shortest paths between a pair.',
        '`components.py` finds weak components with union-find using path compression and union by size, checks them with BFS on the undirected graph, and reports strong components through `scipy.sparse.csgraph.connected_components`.',
        '`routes.py` splits games by `int(sha256(f"{source}>{target}".encode()).hexdigest(), 16) % 5`, with 0 as test, using raw names from the files. Link weights come from training forward clicks as $w(u,v) = -\\log\\big((c(u,v) + 0.5)/(c(u) + 0.5\\,d(u))\\big)$, where $d(u)$ is the out-degree. Dijkstra uses your `BinaryHeap`.',
        '`align.py` provides edit distance with a traceback, a banded version that returns the exact distance when it is at most the band, and Hirschberg alignment that uses $O(\\min(n,m))$ extra memory and returns an alignment of the same cost. The normalised distance divides by the longer path.',
        '`navigators.py` plays pairs with a limit of 30 clicks and no repeat visits. It stops when the target is one click away. Scores break ties toward the lower id. The overlap navigator picks the neighbour $v$ with the highest Jaccard similarity between $\\text{out}(v) \\cup \\{v\\}$ and $\\text{in}(t) \\cup \\{t\\}$, and the degree navigator picks the highest out-degree.',
        '`REPORT.md` is about 4 pages: the human against optimal distribution, the most used hubs, routes for the four most played pairs with both BFS and Dijkstra, a section on survivorship from the 24,875 unfinished games, and what the navigator comparison does not show, given that it sees the whole graph.',
      ],
      acceptanceTests: [
        'There are 4,604 articles and 119,882 links, of which 110 are self-loops. 17 articles have no out-links and 469 have no in-links. United_States has both the largest out-degree (294) and in-degree (1,551). There are 51,318 finished and 24,875 unfinished games (15,552 restarts and 9,323 timeouts), 20,561 of the 295,460 clicks are back clicks, and 46 forward clicks follow no listed link.',
        'Your all-pairs BFS equals `shortest-path-distance-matrix.txt` in all 21,196,816 cells. The longest distance is 9, 18,592,839 cells are finite, and the counts at distances 1, 2 and 3 are 119,772, 2,977,875 and 9,675,454. There are 14 weak components with the largest at 4,589, and 531 strong components with the largest at 4,051.',
        'The Bloom filter finds every stored link, and its false positive rate on 300,000 random non-links is 0.7% to 1.0%, against 0.82% from the formula. Over the 274,898 forward clicks in the 51,306 games with reachable, distinct endpoints, `CountMin` never underestimates, its mean overestimate is 60 to 95, no error exceeds $eN/w \\approx 365$, and at least 17 of the exact top 20 pairs appear in its top 20. The most used pair is Communication to Telephone with 536 clicks.',
        'Across those 51,306 games, the mean is 5.76 clicks for humans against 2.85 for the optimum, the median ratio is 1.67, and 20.0% of games are optimal. Asteroid to Viking has distance 3, 15 shortest paths and 1,043 games at a mean of 6.52 clicks. Brain to Telephone has distance 3, 15 paths and 1,040 games at 6.10. Theatre to Zebra has 3 paths and Pyramid to Bean has 4.',
        '`kitten` to `sitting` costs 3. On 1,000 random pairs of surviving paths, Hirschberg, the full table and the band (when wide enough) give equal costs. Of those 51,306 games, the test split has 10,490 over 5,717 pairs. On it, the mean normalised edit distance to the surviving human path is 0.52 to 0.56 for the BFS path and 0.47 to 0.51 for the Dijkstra route, Dijkstra is strictly closer on 25% to 30% of games and farther on 10% to 13%, and its mean route has 3.0 to 3.25 clicks.',
        'On `random.Random(0).sample(sorted(test_pairs), 2000)`, the overlap navigator succeeds on at least 98% of pairs at a mean of 3.4 to 3.8 clicks, with 99.2% and 3.60 expected. The degree navigator succeeds on 40% to 50%, a random walk on 30% to 42%, and on those pairs the mean is 5.28 clicks for humans and 2.82 for the optimum.',
      ],
      resources: [
        {
          title: 'Wikispeedia navigation paths',
          url: 'https://snap.stanford.edu/data/wikispeedia.html',
          type: 'dataset',
          cost: 'free',
          provider: 'Stanford SNAP',
          note: 'Use `wikispeedia_paths-and-graph.tar.gz`. The page gives the format and the two papers to cite in your report.',
          primary: true,
        },
      ],
      stretchGoals: [
        'Treat each game as an aligned sequence, and find which positions in a path people change most when they replay a pair.',
        'Use the 24,875 unfinished games to estimate which targets are hardest, and compare that with their in-degree.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-nightshift',
    title: 'nightshift: where should the bike truck go tonight?',
    repoName: 'nightshift',
    summary:
      'Predict tomorrow\'s demand at 300 bike-share stations, plan overnight truck routes with exact and heuristic optimisers, and replay a month of real trips to show how many riders each plan actually serves.',
    language: 'Python 3.12',
    estimatedHours: 50,
    overview: `Every bike-share system has the same problem. In the morning the bikes leave the neighbourhoods and pile up downtown, and by evening some stations are empty and others are full. Riders walk away, and a truck spends the night moving bikes back. Chicago's system publishes every trip, so you can replay a real month and put a number on the value of a plan.

You will build \`nightshift\`, a planner that goes from raw trips to a truck route, and an honest simulator that scores it on data the plan never saw. The whole course is in it. A station list comes from a messy name join solved with edit distance and coordinates. A travel-time graph comes from ride durations, repaired with shortest paths because a detour beats the direct median on over half the edges. Demand comes from a Poisson model you fit with gradient descent, SGD and Newton's method. Routes come from a mixed-integer program on a small instance, then greedy construction, local search and simulated annealing at full size, each checked against an exact answer.

The hook is the curve. In a test run on August 2024, with trips replayed against 300 stations and no truck at all, 19.0% of riders were lost or had to dock somewhere else. Teleporting bikes to perfect targets every night, the best any plan could do, gave 4.8%. One truck gave 10.7%. Two gave 7.7%, four gave 6.1%, and eight gave 5.8%. That curve is what a planner would actually want to see.

The optimisers also give an honest surprise. Annealing beats greedy by about 4% on the planning objective for one truck, and that gain nearly vanishes in the replay. With four trucks it shows up clearly. Your report has to explain why a better plan on paper does not always mean more riders served.

**Limits you must state.** The trips are censored, since a rider who found no bike left no record. They also already include the real operator's rebalancing, so the replay is a comparison between plans and not a forecast. Capacities come from today's feed rather than 2024's. Truck time is approximated by bike time. The project is independent of the bike-share operator.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...pyToolchain,
        'Install the packages: `pip install numpy scipy pandas pyarrow scikit-learn matplotlib pytest ruff jupyter ipykernel`, then freeze them with `pip freeze > requirements.lock`. `scipy.optimize.milp` uses the HiGHS solver bundled with SciPy, so nothing else is needed.',
        'Trips: `https://divvy-tripdata.s3.amazonaws.com/202407-divvy-tripdata.zip` and the same name with `202408`, about 30 MB each with no login. Stations: save one copy of `https://gbfs.lyft.com/gbfs/2.3/chi/en/station_information.json`, which is a live feed, and commit its hash and date. Do not commit the trip data.',
      ],
      structure: `nightshift/
├── nightshift/data.py      # fetch, hash, clean, parquet snapshot
├── nightshift/match.py     # join trip stations to the feed
├── nightshift/stream.py    # OD heavy hitters and trailing windows
├── nightshift/graph.py     # travel-time graph, Dijkstra, components
├── nightshift/demand.py    # Poisson objective, gradient and Hessian
├── nightshift/solvers.py   # GD, SGD, Newton, L-BFGS wrapper
├── nightshift/replay.py    # day-by-day trip replay with an event heap
├── nightshift/targets.py   # safe intervals and overnight targets
├── nightshift/route.py     # plan value, greedy, 2-opt, annealing
├── nightshift/exact.py     # DFS, Held-Karp, knapsack, assignment, MILP
├── nightshift/__main__.py  # CLI: fetch, fit, plan, replay, curve
├── tests/                  # includes a one-week fixture
├── report/report.md        # 6 to 10 pages
├── .github/workflows/ci.yml
├── requirements.lock
└── README.md`,
      commands: [
        { label: 'Fetch and freeze the snapshot', command: 'python -m nightshift fetch' },
        { label: 'Fit the demand models', command: 'python -m nightshift fit --seed 0' },
        { label: 'Plan one night and print the route', command: 'python -m nightshift plan --date 2024-08-15 --trucks 2' },
        { label: 'Replay August and draw the value-of-a-truck curve', command: 'python -m nightshift curve --trucks 0,1,2,4,8 --out results/' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
        { label: 'Lint', command: 'ruff check .' },
      ],
    },
    requirements: [
      '`data.py` hashes each zip, keeps trips with both station names, 1 to 360 minutes long and starting in July or August 2024 (the July file has rows from June 29), and saves parquet with categorical station columns. A `cProfile` run of the pipeline is saved, with one fix shown with before and after timings.',
      '`match.py` keeps the top stations by July departures, skipping names that begin with `Public Rack`. A name matches the feed exactly, or else by edit distance of at most 3 within 150 m, or else by the nearest feed station within 60 m. Others are dropped and listed, and the first 300 matched stations are the study set.',
      '`stream.py` finds the top 20 origin-destination pairs in one pass with a count-min sketch and a heap, and it keeps each station\'s trailing 7-day departures with a deque, checked against pandas `rolling`.',
      '`graph.py` builds undirected edges from the median classic-bike minutes of pairs with at least 5 July rides, keeping the smaller of the two directions, confirms that the graph has one component, and runs Dijkstra with a binary heap from every station for the truck time matrix.',
      '`demand.py` models hourly departures and arrivals at each station with a log link and L2 penalty. The small model has one-hot station, hour by weekday-or-weekend, and those hour terms crossed with four groups, set by quartile of the share of a station\'s July arrivals on weekdays from 07:00 to 09:59: 540 parameters. The large model adds station by hour by day type: 14,940 parameters. Fit on July and test on August.',
      '`solvers.py` fits the small model with gradient descent, mini-batch SGD, and Newton\'s method with backtracking, all with an analytic gradient that passes a finite-difference check, and plots loss against time for all three. Every solver minimises the mean of $\\mu - y \\log \\mu$ plus $\\tfrac{1}{2}\\lambda\\lVert\\beta\\rVert^2$ with $\\lambda = 10^{-3}$, starting with every station term at the log of the mean rate. The large model uses `scipy.optimize.minimize(method="L-BFGS-B")` with your gradient, because a dense Hessian would need about 1.8 GB and a cubic solve.',
      '`replay.py` plays each day in start-time order with a heap of arrivals. A start at an empty station is lost. An arrival at a full station is blocked, and the bike goes to the nearest station with a free dock. Bikes in transit carry over midnight. August 1 starts at half of each capacity, and later days carry over.',
      '`targets.py` takes the July mean rate by station, hour and day type, and computes the cumulative net flow $c_h$ for tomorrow. The safe interval is $[-\\min(0, \\min c),\\ \\text{cap} - \\max(0, \\max c)]$, the target is its midpoint clipped to the capacity, and the loss at inventory $I$ is the distance from $I$ to the interval. The teleport baseline resets all stations to targets scaled to the current total of bikes, with no truck limit.',
      '`route.py` plans each truck overnight with capacity 30, a 360-minute shift, and 5 minutes per stop, starting at any station. A stop takes bikes above target or drops bikes below target up to its load, and a route\'s value is the reduction in loss. It has greedy by value per minute, 2-opt, and simulated annealing with insert, remove, reverse and move steps over the 80 largest imbalances, with trucks planned in turn. Moves apply at midnight.',
      '`exact.py` provides, on a 12-station instance built from weekday targets with inventory at half of capacity, an exhaustive route search and a MILP with Miller-Tucker-Zemlin constraints in `scipy.optimize.milp` that maximise bikes delivered within a time budget. It also has a Held-Karp DP over the 12 stations, a 0/1 knapsack on minutes that bounds the stops worth visiting, and `linear_sum_assignment` pairing surplus with deficit stations.',
    ],
    acceptanceTests: [
      'The two zip files have 748,962 and 755,639 rows, and cleaning leaves 1,074,015 trips. On your feed snapshot, McClurg Ct & Erie St is rejected even though a different feed name is within edit distance 3, because that name is more than 150 m away. Streeter Dr & Grand Ave stays in the study set through the coordinate rule or a name match. The 300 stations hold 380,000 to 450,000 trips in each month, with both ends inside the set, and about 419,000 and 416,000 expected.',
      'The travel graph is connected with 9,000 to 10,500 edges, and shortest paths beat the direct median on 50% to 60% of them. The count-min top 20 over those trips with width 8,192 and depth 4 contains at least 17 of the exact top 20, whose top pair is the round trip from Streeter Dr & Grand Ave to itself, with about 3,300 trips.',
      'On the small model, Newton\'s method reaches a gradient norm below 1e-8 in at most 12 iterations, and matches scikit-learn `PoissonRegressor(alpha=1e-3, fit_intercept=False)` within 1e-4 on every coefficient. After 3,000 gradient steps at learning rate 0.3, the objective is still 0.005 to 0.015 above the optimum. Ten epochs of SGD with batch size 1,024 and rate 0.1 divided by 1 plus the epoch reach 0.1 to 0.3 above it, at under a tenth of that time.',
      'August mean Poisson deviance on departures is 3.3 to 3.8 for one global rate, 1.5 to 1.7 for the small model, 1.45 to 1.6 for a July table of station by hour by day type with rates floored at 0.001, and 1.42 to 1.50 for the large model at $\\lambda = 3 \\times 10^{-5}$. The large model beats the table and the small model loses to it. Your report says why.',
      'On the 12-station instance, the exhaustive search and the MILP agree at budgets of 30, 45 and 60 minutes, with the MILP status optimal and a gap of 0. In a test run they gave 9, 17 and 25 bikes. Annealing reaches the optimum on at least 5 of 10 seeds at every budget, and your report lists any misses. In a test run it reached 10 of 10, 10 of 10 and 6 of 10. The Held-Karp 12-station path is at least 1% shorter than the best nearest-neighbour start, with about 6% expected, and the 40 by 40 assignment of the largest surplus and deficit stations costs at least 10% less than matching each surplus station to its nearest free deficit in turn.',
      'Over August, the share of riders lost or blocked is 17% to 21% with no truck, 4% to 6% with teleported targets, 9.5% to 12% with one truck, 7% to 9% with two trucks by annealing, and 5.5% to 7% with four. Annealing beats greedy on mean plan value by at least 2% with one truck, and on replay with four trucks. Two runs with one seed give identical tables.',
    ],
    coverage: [
      { module: 'analysing-algorithms', demonstrates: 'A saved profile, a measured fix to the pipeline, and categorical columns that keep a million-row load and group-by cheap.' },
      { module: 'lists-stacks-and-queues', demonstrates: 'A deque-based trailing 7-day window per station runs over the trip stream and is checked against pandas.' },
      { module: 'trees-and-hashing', demonstrates: 'A count-min sketch with a top-k heap finds heavy origin-destination pairs, and a heap of arrivals drives the replay.' },
      { module: 'graphs', demonstrates: 'A travel-time graph built from rides is checked for connectivity and repaired into a metric by Dijkstra from every station.' },
      { module: 'design-paradigms', demonstrates: 'Edit distance joins messy station names, greedy builds the baseline route, and a Held-Karp DP certifies a route exactly.' },
      { module: 'discrete-optimisation', demonstrates: 'A MILP, a knapsack bound, an assignment and simulated annealing plan routes, each checked against an exact answer on a small instance.' },
      { module: 'continuous-optimisation', demonstrates: 'A convex Poisson likelihood is fitted with gradient descent, SGD, Newton and L-BFGS, and the choice of solver follows from problem size.' },
    ],
    portfolio: [
      'The README opens with the value-of-a-truck curve and one night\'s route drawn on a station map, followed by reproduction steps that work on a fresh Windows machine.',
      'GitHub Actions runs the tests, lint and the whole pipeline on a one-week fixture on every push, with a status badge in the README.',
      'The repository has a LICENSE, `requirements.lock`, a data attribution note that follows the operator\'s data license, the feed snapshot date and hash, and a tagged `v1.0.0` release.',
      '`report/report.md` is published as a PDF with the replay assumptions, the censoring limit and the plan-versus-replay gap stated plainly.',
      'A results table in the README lists solver, optimality gap on the small instance, run time, and riders served, so a reader can see each trade-off at a glance.',
    ],
    resources: [
      {
        title: 'Divvy system data',
        url: 'https://divvybikes.com/system-data',
        type: 'dataset',
        cost: 'free',
        provider: 'Divvy, Lyft and the Chicago Department of Transportation',
        note: 'Describes the trip files and links the data license, which you should read before publishing results.',
        primary: true,
      },
      {
        title: 'scipy.optimize.milp',
        url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html',
        type: 'documentation',
        cost: 'free',
        provider: 'SciPy',
        note: 'The interface to HiGHS. Read how integrality, bounds and constraints are passed.',
      },
    ],
    stretchGoals: [
      'Add 2023 or a winter month as a second test window, and report how the targets and truck curve change.',
      'Replace the midpoint target with a target from a simulation of Poisson demand, and measure whether the extra work serves more riders.',
    ],
  },
});
