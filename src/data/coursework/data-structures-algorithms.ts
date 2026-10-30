import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org. On Windows, tick "Add python.exe to PATH". On macOS or Linux, use `python3` to create the environment below.',
  'In the project folder, run `python -m venv .venv`, then activate it with `.venv\\Scripts\\Activate.ps1`, or `source .venv/bin/activate` on macOS or Linux. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
];

export default defineCoursework({
  subjectId: 'data-structures-algorithms',
  machineProblems: [
    {
      slug: 'mp1-sortlab',
      title: 'sortlab: a sorting test bench that breaks its own quicksort',
      afterModule: 'sorting-and-searching',
      coversModules: ['analysis-foundations', 'linear-structures', 'sorting-and-searching'],
      supersedesProject: true,
      summary: 'Implement ten sorts and two selection algorithms behind one instrumented harness, fit their growth from data, then generate an input that makes your quicksort quadratic and defend against it.',
      language: 'Python 3.12',
      estimatedHours: 18,
      overview: `Textbooks say quicksort is $O(n \\log n)$ on average. In this MP you will prove the theory and then attack it. You will build a reproducible test bench for ten sorting algorithms, count every comparison, fit growth exponents from your own data, and compare them with what the analysis predicts.

Then you will play the adversary. In 1999 Doug McIlroy published a short program that makes almost any deterministic quicksort go quadratic. It does not need to know how the sort works. It watches the comparisons and answers them so as to keep the pivot as bad as possible, and whatever answers it gave become the input.

\`\`\`python
GAS = n                          # undecided, and larger than any frozen value
val = [GAS] * n                  # the input being invented, item by item
frozen = 0
candidate = 0

def less(x, y):                  # x and y are item ids, 0 to n - 1
    global frozen, candidate
    if val[x] == GAS and val[y] == GAS:
        i = x if x == candidate else y
        val[i] = frozen
        frozen += 1
    if val[x] == GAS:
        candidate = x
    elif val[y] == GAS:
        candidate = y
    return val[x] < val[y]
\`\`\`

Sort the list \`[0, 1, ..., n - 1]\` with your quicksort using this \`less\`, and \`val\` is then a permutation that your quicksort handles terribly when it is replayed with ordinary comparisons. Every comparison sort must therefore take a \`less(a, b)\` function. Random pivots defeat the attack, and so does a depth limit, and you will show both.

**Constraints.** Implement every algorithm yourself. Python's \`sorted\` is allowed only to check answers. Heaps arrive in the next module, so your introsort falls back to merge sort rather than heapsort. Use Lomuto partitioning, moving items equal to the pivot to the right, so your counts can be compared with the tests below. Top-down merge sort splits at \`n // 2\` and takes from the left run on ties.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install pytest hypothesis numpy matplotlib`.'],
        structure: `sortlab/
├── sortlab/
│   ├── elementary.py      # insertion, selection
│   ├── merge.py           # top-down, bottom-up, linked-list merge sort
│   ├── quick.py           # random, median of three, three-way, introsort
│   ├── radix.py           # LSD radix sort on your own circular-buffer queues
│   ├── select.py          # quickselect and median of medians
│   ├── adversary.py       # McIlroy's killer input generator
│   ├── inputs.py          # seeded input distributions
│   └── harness.py         # counting, timing and fitting
├── run_all.py             # regenerates everything in results/
├── results/               # results.csv, table.md and plots
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Run the fast version of the whole study', command: 'python run_all.py --quick' },
          { label: 'Regenerate every result and plot', command: 'python run_all.py --seed 1' },
          { label: 'Build and replay a killer input', command: 'python -m sortlab.adversary --sort median3 --n 4000' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        'Provide insertion sort, selection sort, top-down merge, bottom-up merge, quicksort with a random pivot, quicksort with a deterministic median of three, three-way quicksort and introsort. Each takes a `less` function, and each is checked against `sorted` on all input distributions.',
        'Introsort uses median of three, switches to insertion sort below 16 items, and falls back to merge sort at depth $2\\lfloor \\lg n \\rfloor$.',
        '`radix_sort` is LSD radix on 8-bit digits for non-negative integers below $2^{32}$, using buckets built on a circular-buffer queue you wrote, with no `collections.deque`.',
        '`linked_merge_sort` sorts a singly linked list you wrote by rewiring `next` references, creating no new nodes, and is stable.',
        '`quickselect` and `median_of_medians` return the $k$-th smallest item and are tested against `sorted` for every $k$ on small inputs, including inputs with duplicates.',
        'A stability test sorts `(key, tag)` records and confirms which algorithms are stable. The list in `REPORT.md` must match the test.',
        '`inputs.py` generates random, sorted, reversed, nearly sorted (1% of items swapped), few distinct (16 values) and organ pipe inputs from a seed, and the killer input is the seventh distribution for each deterministic quicksort.',
        'The harness records comparisons and writes with counting wrappers. It measures time separately with `perf_counter_ns` and `operator.lt`, taking the median of 5 runs.',
        '`run_all.py` doubles $n$ from $2^{10}$ to $2^{20}$, skips a cell when the previous size exceeded a `--budget` in seconds, and writes `results.csv`, plots and a Markdown table of fitted log-log slopes beside the theoretical exponent. `--quick` finishes in under 2 minutes.',
        '`REPORT.md` is about two pages and makes a recommendation for at least four workloads, explains each gap between predicted and measured exponents in terms of the cost model, and compares measured comparison counts with the $\\lceil \\lg n! \\rceil$ lower bound.',
      ],
      acceptanceTests: [
        'For $n = 1000$, insertion sort makes 999 comparisons on sorted input and 499,500 on reversed input, and selection sort makes 499,500 on both.',
        'Insertion sort\'s item moves equal the number of inversions, checked against an $O(n^2)$ inversion count on a shuffled array of 2,000 items.',
        'Top-down merge sort makes 5,120 comparisons on sorted and on reversed input of $n = 1024$, and 4,932 and 5,044 for $n = 1000$. Over 50 random permutations of 1,024 items, the maximum is at most 9,217 and the mean is at least $\\lceil \\lg 1024! \\rceil = 8770$.',
        'For $n = 4000$, the killer input makes median-of-three quicksort use at least 1,000,000 comparisons when replayed, at least 10 times what random-pivot quicksort uses on the same input. Introsort attacked by its own adversary stays under $4n \\lg n$, about 191,000.',
        'With 2,000 equal items, random-pivot Lomuto quicksort makes exactly 1,999,000 comparisons, while three-way quicksort makes at most 8,192 on 4,096 equal items.',
        'Fitting comparisons on random inputs from $2^{10}$ to $2^{14}$ gives a slope of 1.9 to 2.1 for insertion sort and 1.0 to 1.2 for merge sort. `median_of_medians([7, 2, 9, 4, 4, 1], 3)` is 4 with 0-based $k$.',
      ],
      resources: [
        {
          title: 'A Killer Adversary for Quicksort',
          url: 'https://www.cs.dartmouth.edu/~doug/mdmspe.pdf',
          type: 'article',
          cost: 'free',
          provider: 'M. D. McIlroy, Dartmouth',
          note: 'The four-page original. Read it after your adversary works, and compare your count with his.',
        },
      ],
      stretchGoals: [
        'Attack a sort you did not write by running your adversary against the C library `qsort` through `ctypes`.',
        'Add a natural merge sort that detects existing runs, and find the distributions where it beats everything else.',
      ],
    },
    {
      slug: 'mp2-tinylsm',
      title: 'tinylsm: a log-structured key-value store from scratch',
      afterModule: 'hashing',
      coversModules: ['linear-structures', 'trees-and-heaps', 'hashing'],
      summary: 'Build a persistent key-value store in the style of RocksDB, with your own AVL memtable, Bloom filters, block cache and heap-based compaction, and measure its amplification factors.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Most modern storage engines, including RocksDB and Cassandra, are built on the **log-structured merge tree**. The idea is that random writes to disk are slow, so you never do them. New data goes into a sorted structure in memory. When that fills up, it is written to disk as an immutable sorted file, and a background step merges these files together.

This design works only because of the data structures you have just studied, so each one has a real job here:

- An **AVL tree** is the in-memory table, keeping keys sorted while they arrive in any order.
- A **Bloom filter** on each file answers "is this key definitely absent?" without touching the disk.
- **Binary search** over a sparse index finds the one block that could hold a key.
- A **hash table** and a **doubly linked list** form an LRU cache of disk blocks.
- A **binary heap** merges many sorted files into one during compaction and range scans.

**File format.** An SSTable holds records sorted by key: \`<I key_len><I val_len><key><value>\` using \`struct\` in little-endian order, where \`val_len = 0xFFFFFFFF\` marks a tombstone. Records are grouped into 4 KiB blocks. After the data come the sparse index (the first key of each block and its offset), the Bloom filter, and a footer of three \`<Q\` offsets followed by the magic bytes \`TLSM0001\`.

**Constraints.** Keys and values are \`bytes\`. Do not use \`dict\`, \`heapq\`, \`bisect\` or \`collections\` inside the data structures themselves. A dictionary is fine in tests, as the model to compare against, and for the JSON manifest. \`hashlib.blake2b\` is your base hash. This is a single-threaded store, so compaction runs inline.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install pytest hypothesis matplotlib`.'],
        structure: `tinylsm/
├── tinylsm/
│   ├── avl.py             # the memtable
│   ├── bloom.py           # Bloom filter with double hashing
│   ├── hashtable.py       # open addressing, with linear probing and Robin Hood modes
│   ├── lru.py             # LRU block cache
│   ├── heap.py            # binary min-heap and k-way merge
│   ├── sstable.py         # writer, reader and block format
│   ├── wal.py             # write-ahead log
│   └── db.py              # put, get, delete, scan, compaction, manifest
├── bench/                 # workloads and the amplification report
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Run the tests', command: 'python -m pytest' },
          { label: 'Run the model-based test only', command: 'python -m pytest tests/test_model.py -v' },
          { label: 'Run the benchmark and write the report data', command: 'python bench/run.py --keys 200000 --seed 1' },
          { label: 'Measure Bloom and probing behaviour against theory', command: 'python bench/theory.py' },
        ],
      },
      requirements: [
        'The memtable is an AVL tree supporting insert, delete, lookup and ordered iteration from any start key, and `check_invariants()` verifies the ordering, stored heights and balance factors.',
        'Every `put` and `delete` is appended to a write-ahead log before it changes memory. Opening a database replays the log, and flushing the memtable to an SSTable deletes it.',
        'The store flushes the memtable when it reaches a configurable entry limit, writing an SSTable in the exact format above, and deleted keys are stored as tombstones.',
        'The Bloom filter uses $m$ bits and $k$ positions computed as $h_1 + i h_2 \\bmod m$ from `blake2b`, with a default of 10 bits per key and 7 hashes, and is stored in the file.',
        '`get` checks the memtable, then SSTables from newest to oldest, using the Bloom filter and then binary search on the sparse index, so it reads at most one data block per table. The store counts blocks read.',
        'The block cache is an LRU built from your own hash table and a doubly linked list with sentinels, with $O(1)$ lookup and eviction. Its capacity is set in blocks, and it reports its hit rate.',
        '`hashtable.py` implements open addressing with resizing and deletion, in linear probing and Robin Hood modes, and records probe counts.',
        '`scan(lo, hi)` is a generator using a k-way merge on your own binary heap across the memtable and all SSTables. The newest version of each key wins, and tombstones hide older versions.',
        'When 4 SSTables exist in a size tier they are merged into 1 in the next tier, using the same k-way merge. Tombstones are dropped only when the merge includes the oldest data. A JSON manifest replaced with `os.replace` means a crash during compaction loses nothing.',
        '`REPORT.md` gives write, read and space amplification for a mixed workload of 200,000 keys, measured Bloom false-positive rates and probe counts beside the formulas, and explains when you would choose an LSM tree over a B-tree.',
      ],
      acceptanceTests: [
        'Inserting 1 to 1,023 in ascending order gives an AVL tree of exactly 10 levels, and inserting 100,000 keys in shuffled order gives at most 23 levels. `check_invariants()` passes after 10,000 mixed inserts and deletes.',
        'With 100,000 keys at 10 bits per key and 7 hashes, the false-positive rate on 100,000 absent keys is between 0.6% and 1.1%, against a formula value of 0.82%. At 5 bits per key and 3 hashes it is between 8% and 10.5%, against a formula value of 9.18%.',
        'In a table of $2^{16}$ slots at load factor 0.75, linear probing averages $2.5 \\pm 0.25$ probes on successful lookups and $8.5 \\pm 1$ on unsuccessful ones, and Robin Hood has the same successful mean with less than half the variance. At load factor 0.5 the means are near 1.5 and 2.5.',
        'Merging 8 sorted runs of 12,500 records produces 100,000 sorted records with at most 6 heap comparisons per record. A cache of capacity 3 accessed as A, B, C, A, D evicts B, keeping A, C and D.',
        'With a memtable limit of 500 and seed 1, 200,000 random `put`, `get` and `delete` operations on 10,000 keys match a plain dictionary at all times, and every 1,000 operations `scan` of the full range matches it too, including after closing and reopening the store.',
        'A subprocess that writes 1,000 keys and then calls `os._exit(1)` without closing loses none of them on reopen. After loading 100,000 keys, lookups of absent keys read under 0.15 data blocks per lookup with Bloom filters on.',
      ],
      resources: [
        {
          title: 'RocksDB Wiki: Compaction',
          url: 'https://github.com/facebook/rocksdb/wiki/Compaction',
          type: 'documentation',
          cost: 'free',
          provider: 'RocksDB',
          note: 'How a production engine compares compaction policies. Read the sections on leveled and universal compaction.',
        },
      ],
      stretchGoals: [
        'Add leveled compaction as a second policy, and compare write amplification on the same workload.',
        'Replace the AVL memtable with a skip list or treap behind the same interface, and compare the throughput.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-waypoint',
    title: 'waypoint: an offline maps engine for any city, built from scratch',
    repoName: 'waypoint',
    summary: 'Build a maps engine that imports OpenStreetMap data, finds streets despite typos, routes between any two points, plans multi-stop errands, and draws the result, with every data structure hand-made.',
    language: 'Python 3.12',
    estimatedHours: 55,
    overview: `Pick any town on Earth. \`waypoint\` downloads its streets from OpenStreetMap and builds a compact local database. You type \`mian stret\`, and it finds Main Street. You ask for a route, and it returns the shortest path in milliseconds. Give it twelve errands, and it finds the best order to run them in, which is a small instance of an NP-hard problem. The answer comes back as one HTML file with the map drawn as an SVG, so no tile server, API key or network connection is involved.

A maps service is the best single showcase for this course, because a real one needs nearly everything you studied, and each piece has a clear purpose you can demonstrate. **Hashing** maps huge OpenStreetMap ids to dense integers. **Sorting** lays the graph out in flat arrays. **Trees** find the nearest intersection to a clicked point. **Strings and dynamic programming** handle search with typos. **Graphs** do the routing. **Heaps** make it fast. **NP-hardness** shows up the moment you add a second stop.

The real design work is in the trade-offs. A Python dictionary of lists would be simple but enormous, so you store the graph in compressed sparse row form: one flat array of edge targets, one of weights, and one of offsets. You will measure what that saves. You will compare three routing algorithms that must return identical distances while doing very different amounts of work. And you will report how far your heuristic tours are from optimal, with exact answers where they can be computed and proven bounds where they cannot.

Clone the repository and it should work at once on the included sample town, then on your own town with one more command.

**Constraints.** The core uses only the standard library, and \`matplotlib\` is allowed for report plots. You may not use \`heapq\`, \`bisect\`, \`networkx\` or \`osmnx\` in \`src/\`. These are allowed in tests, as oracles. OpenStreetMap data is licensed under the ODbL, so the README and every generated page must credit OpenStreetMap contributors.`,
    setup: {
      extensions: [...pythonExtensions, 'ms-python.debugpy', 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        'With the environment active, run `pip install -e ".[dev]"` to install the project with pytest, hypothesis, networkx (tests only), matplotlib and ruff.',
        'Install Git and create a free GitHub account for the repository, CI and GitHub Pages.',
      ],
      structure: `waypoint/
├── src/waypoint/
│   ├── osm.py             # parses Overpass JSON into nodes and ways
│   ├── hashtable.py       # Robin Hood table for OSM ids
│   ├── graph.py           # CSR storage, counting sort, Tarjan SCC
│   ├── kdtree.py          # nearest intersection, built with quickselect
│   ├── names.py           # trie, suffix array and fuzzy search
│   ├── huffman.py         # compression of the street name table
│   ├── heap.py            # indexed d-ary heap with decrease-key
│   ├── route.py           # Dijkstra, A*, bidirectional Dijkstra
│   ├── tour.py            # Held-Karp, Kruskal, MST tour, 2-opt
│   ├── render.py          # self-contained HTML and SVG
│   └── cli.py
├── scripts/fetch_osm.py   # downloads a bounding box from the Overpass API
├── data/sample-town.json  # a small extract, with attribution
├── bench/                 # doubling experiments and fitted exponents
├── tests/
├── docs/REPORT.md
├── .github/workflows/ci.yml
├── pyproject.toml
└── README.md`,
      commands: [
        { label: 'Download a town (south, west, north, east)', command: 'python scripts/fetch_osm.py --bbox 40.09,-88.26,40.13,-88.20 --out data/town.json' },
        { label: 'Build the database', command: 'waypoint build data/sample-town.json -o town.wp' },
        { label: 'Search with a typo', command: 'waypoint find town.wp "mian stret"' },
        { label: 'Route between two streets and draw it', command: 'waypoint route town.wp "Main Street" "Oak Avenue" --algo astar --html route.html' },
        { label: 'Plan a multi-stop tour', command: 'waypoint tour town.wp stops.txt --html tour.html' },
        { label: 'Run the tests with coverage', command: 'pytest --cov=waypoint' },
        { label: 'Regenerate the benchmarks', command: 'python bench/run_all.py --seed 1' },
      ],
    },
    requirements: [
      '`waypoint build` parses Overpass JSON into a directed graph of intersections with haversine edge lengths, honouring one-way streets. It maps 64-bit OSM ids to dense integers through your own Robin Hood hash table, and keeps only the largest strongly connected component, found with Tarjan\'s algorithm.',
      'The graph is stored in CSR form using `array.array` and built with a counting sort by tail vertex in $O(V + E)$. The report compares its memory with a dictionary of lists, measured with `tracemalloc`, and the `.wp` file is a binary format you define using `struct`.',
      'A k-d tree built with your quickselect answers nearest-intersection queries, which are tested against brute force.',
      '`find` supports prefix search with a trie, substring search with a suffix array, and fuzzy search up to 3 edits using a trie walk that carries a row of the edit-distance table, ranking results by total road length with a top-k heap.',
      '`route` offers Dijkstra with your own indexed 4-ary heap and decrease-key, A* with a haversine heuristic, and bidirectional Dijkstra, all returning identical distances and reporting vertices settled.',
      '`tour` uses Held-Karp bitmask dynamic programming for up to 13 stops. Above that it makes one-way distances symmetric by taking the larger direction, which keeps the triangle inequality, then builds a tour from a minimum spanning tree found with Kruskal and union-find, improves it with 2-opt, and reports the MST lower bound and the proven ratio.',
      'The street name table is stored with Huffman coding you wrote, and the report gives the compression ratio against raw UTF-8.',
      '`--html` writes one self-contained file that draws the road network and result as inline SVG with distances and stats, and requests nothing from the network.',
      '`bench/run_all.py` measures on subgraphs of doubling size, fits growth exponents, compares 2-ary and 4-ary heaps, and compares settled vertices across the three routing algorithms over 100 random pairs.',
      '`docs/REPORT.md` covers fitted against theoretical exponents, a potential-method analysis of your growable array with a measured cost table, and why the tour problem is NP-hard, with the reduction from Hamiltonian cycle stated. The test suite reaches 85% coverage, and each data structure has at least one Hypothesis property test.',
    ],
    acceptanceTests: [
      'On a 100 by 100 grid with 100 m edges in both directions, $(0, 50)$ to $(99, 50)$ is 9,900 m and $(0, 0)$ to $(99, 99)$ is 19,800 m in all three algorithms. On the straight route, A* settles at most 10% as many vertices as Dijkstra.',
      'For the edges 0→1, 1→2, 2→0, 2→3, 3→4 and 4→3, Tarjan\'s algorithm finds the components {0, 1, 2} and {3, 4}. Building a map from them keeps vertices 0, 1 and 2, and reports 2 vertices dropped.',
      'Held-Karp on the matrix `[[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]` returns length 80 for the tour 0, 1, 3, 2, 0. On 20 seeded instances of 12 random points, the MST tour is never more than 2 times optimal, and after 2-opt the mean ratio is at most 1.05.',
      'Edit distance is 3 for `kitten` and `sitting` and 3 for `mian stret` and `main street`. On a table containing `Main Street`, `Maple Avenue` and `Mill Road`, `find "mian stret"` returns `Main Street` first.',
      'Huffman coding of symbols with frequencies 45, 13, 12, 16, 9 and 5 uses 224 bits in total, and every street name in the sample town survives a round trip.',
      'On the sample town, the three routing algorithms agree within 1 m on 1,000 random pairs, and agree with `networkx` on 100 of them. The k-d tree matches brute force on 1,000 random points.',
    ],
    coverage: [
      { module: 'analysis-foundations', demonstrates: 'The benchmark suite fits growth exponents, separates comparisons from wall time, and explains gaps using the cost model.' },
      { module: 'linear-structures', demonstrates: 'CSR arrays, the growable array and its queue-based traversals are built and measured against pointer-heavy layouts.' },
      { module: 'sorting-and-searching', demonstrates: 'Counting sort builds the CSR graph, quickselect builds the k-d tree, and binary search drives suffix array lookups.' },
      { module: 'trees-and-heaps', demonstrates: 'The k-d tree and trie are search trees, and the indexed d-ary heap with decrease-key powers routing.' },
      { module: 'hashing', demonstrates: 'A Robin Hood table with measured probe counts maps 64-bit OSM ids to dense vertex numbers.' },
      { module: 'graphs', demonstrates: 'Tarjan SCC, Dijkstra, A*, bidirectional search, Kruskal and union-find are the core of the engine.' },
      { module: 'dynamic-programming-and-greedy', demonstrates: 'Held-Karp and edit distance are dynamic programs, while Huffman coding and Kruskal are greedy algorithms with exchange arguments.' },
      { module: 'advanced-topics', demonstrates: 'The suffix array handles strings, the potential method analyses the growable array, and the tour planner applies exact, approximate and heuristic methods to an NP-hard problem.' },
    ],
    portfolio: [
      'The README opens with a screenshot or GIF of a route and a tour, and a link to a live example page hosted on GitHub Pages.',
      'A stranger can clone the repository and draw a route on the sample town in under five minutes, and then on their own town with one more command.',
      'GitHub Actions runs ruff and the test suite on every push, with a status badge in the README.',
      'The repository has a LICENSE, OpenStreetMap attribution, a tagged `v1.0.0` release, and a commit history made of small, descriptive commits.',
      '`docs/REPORT.md` is linked from the README, and the README shows the table of settled vertices and the measured memory saving from CSR.',
    ],
    resources: [
      {
        title: 'Overpass API',
        url: 'https://wiki.openstreetmap.org/wiki/Overpass_API',
        type: 'documentation',
        cost: 'free',
        provider: 'OpenStreetMap Wiki',
        note: 'The query language and the public endpoints. Use small bounding boxes and respect the rate limits.',
      },
      {
        title: 'OpenStreetMap Copyright and License',
        url: 'https://www.openstreetmap.org/copyright',
        type: 'documentation',
        cost: 'free',
        provider: 'OpenStreetMap',
        note: 'What attribution your README and generated pages must include.',
      },
    ],
    stretchGoals: [
      'Add landmark-based A* (ALT), precomputing distances from 8 landmarks, and report the reduction in settled vertices.',
      'Add contraction hierarchies, and compare query time and preprocessing cost with bidirectional Dijkstra.',
      'Add travel-time weights from road types, with a penalty for each turn.',
    ],
  },
});
