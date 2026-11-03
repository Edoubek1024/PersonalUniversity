import { defineSubject } from '../define';

export default defineSubject({
  id: 'algorithms-for-data-science',
  title: 'Algorithms and Data Structures for Data Science',
  category: 'data-science',
  tagline:
    'The classical structures and algorithms applied to real data work in Python: measure the cost, choose the right structure, and solve discrete and continuous optimisation problems.',
  description: `This is the applied course on algorithms for people who work with data. Your notebook stalls at ten million rows, a join produces more rows than either input, a graph no longer fits in memory, or a model will not converge. Each of those has an algorithmic cause, and each one becomes much easier once you can name the cost, measure it and pick a better structure. The course teaches use and measurement rather than proof, and it points to Data Structures and Algorithms whenever you want the formal treatment.

The seven modules start with how to measure a program, then cover lists, stacks and queues, trees and hashing, including sketches that answer questions in fixed memory, and graphs at the sizes real datasets reach. The second half turns to design and optimisation: divide and conquer, greedy choices and dynamic programming, then discrete problems handed to a solver or attacked with local search, and finally the continuous optimisation that sits inside every model you fit. Everything is in Python with NumPy, SciPy and pandas, and most exercises end with something you measured and reported.

The course follows the topics of the University of Illinois course CS 277, based on its public catalog description. The material here is original, and the course is not affiliated with the University of Illinois. Two machine problems and a final project close the course, so you finish with working code and measurements you can show. It assumes Data Science Exploration and Calculus for Data Science.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['data-science-exploration', 'calculus-for-data-science'],
  recommendedBackground: [
    'Comfortable writing Python functions and loops',
    'Everyday use of NumPy arrays and pandas DataFrames',
    'Derivatives and gradients at the level of a first calculus course',
    'Basic linear algebra: matrix products and solving a linear system',
  ],
  tags: ['algorithms', 'data structures', 'python', 'numpy', 'pandas', 'graphs', 'optimisation', 'performance'],
  core: false,
  modules: [
    {
      slug: 'analysing-algorithms',
      title: 'Analysing Algorithms',
      description:
        'How to reason about cost in rows, columns and groups, how to measure time and memory honestly, and why NumPy is fast while some pandas habits are quadratic.',
      lessons: [
        {
          slug: 'big-o-for-data-work',
          title: 'Big-O for data work',
          summary:
            'Express the cost of a data operation in rows, columns and groups, find the hidden loops, and estimate a growth exponent from a doubling experiment.',
          estimatedMinutes: 75,
          objectives: [
            'State the cost of common data operations using separate size variables',
            'Find the hidden loop behind a slow membership test or repeated copy',
            'Run a doubling experiment and estimate an exponent from a log-log slope',
            'Say when a measured slope should not be trusted',
            'Use an estimated exponent to predict the run time of a larger job',
          ],
          concepts: [
            'Big-O as a growth rate, not a time',
            'Several size variables: rows, columns, groups',
            'Hidden loops',
            'Doubling experiment',
            'Log-log slope as an exponent estimate',
            'Constant factors',
            'Mixed cost terms and crossovers',
            'Extrapolating run time',
          ],
          explanation: `Big-O describes how cost grows with size and ignores constant factors. In data work there is rarely a single size. A table has $n$ rows, $p$ columns and $k$ distinct keys, so sorting one column is $O(n \\log n)$, a covariance matrix is $O(np^2)$, and comparing every pair of rows is $O(n^2 p)$. Keep the variables separate, because they tell you which one hurts as the data grows.

Most slow analysis code hides a loop. \`x in some_list\` scans the list, so doing it once per row is $O(n^2)$ overall.

You can estimate an exponent without reading any code. If $T(n) \\approx a n^b$ then
$$\\log T = \\log a + b \\log n,$$
so the slope on a log-log plot estimates $b$. Equivalently, doubling $n$ multiplies the time by about $2^b$.

\`\`\`python
import time
import numpy as np

def slope(f, sizes):
    times = []
    for n in sizes:
        start = time.perf_counter()
        f(n)
        times.append(time.perf_counter() - start)
    return np.polyfit(np.log(sizes), np.log(times), 1)[0]
\`\`\`

Use at least four sizes, each double the last, and start where one run takes more than a few milliseconds. Below that you are measuring noise and setup cost. An $n \\log n$ method shows a slope a little above 1. A mixed cost such as $an + bn^2$ looks linear at small sizes and quadratic later, so extrapolating from small runs can be badly optimistic.

The slope is a planning tool. If $10^6$ rows take 20 seconds and $b = 2$, then $10^7$ rows take about 2000 seconds. Read Erickson's introduction for the formal view, and use the Python time complexity table to look up the operations you use every day.`,
          resources: [
            { title: 'Algorithms, Chapter 0: Introduction', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/00-intro.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Read for what counts as an algorithm and how running time is described. Skim the historical sections.', primary: true },
            { title: 'TimeComplexity', url: 'https://wiki.python.org/moin/TimeComplexity', type: 'documentation', cost: 'free', provider: 'Python Wiki', note: 'The cost of list, deque, set and dict operations. Keep it open while you do the exercises.' },
            { title: 'NumPy fundamentals', url: 'https://numpy.org/doc/stable/user/basics.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'Review array creation and indexing if they feel rusty.' },
          ],
          exercises: [
            {
              slug: 'measure-four-exponents',
              title: 'Measure four exponents',
              prompt:
                'Use `slope` on four functions of `n`, drawing random floats with NumPy: `x.sum()`, `np.sort(x)`, the all-pairs comparison `(x[:, None] < x).sum()`, and a Python loop that tests `v in lst` for every `v` in a list of `n` values. Choose sizes for each so the largest run takes about a second. Report a table with the measured slope and the exponent you expected, and explain any gap larger than 0.2.',
              kind: 'coding',
              difficulty: 1,
              hint: 'The sizes for `np.sort` will be thousands of times larger than the sizes for the all-pairs comparison.',
            },
            {
              slug: 'hidden-loop',
              title: 'Remove a hidden loop',
              prompt:
                'Deduplicate a list of $n$ random integers drawn from a range of $10n$ values, once keeping `seen` as a list and once as a set, preserving first-seen order. Run $n$ = 2,000, 4,000, 8,000 and 16,000 for both, then report both slopes. Use the slopes to predict how long each version would take at $n = 10^6$, run the set version at that size, and report the prediction error.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mixed-cost-trap',
              title: 'Catch a mixed cost',
              prompt:
                'Write `f(n)`, which draws `n` random floats, calls `x.sum()` 2,000 times, then runs the all-pairs comparison `(x[:, None] < x).sum()` once. Measure the slope over sizes 100 to 800 and again over 4,000 to 16,000. Report both slopes and say what dominates in each range, counting the fixed call overhead of `x.sum()` as a third term. Then estimate the size where the sums and the comparison cost the same by timing them separately.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why write $O(np^2)$ for a covariance matrix rather than treating everything as one size?',
              answerOutline: 'Rows and columns grow independently. Doubling rows doubles the work, while doubling columns multiplies it by four. A single variable hides that.',
            },
            {
              question: 'Doubling $n$ multiplies your run time by about 8. What exponent does that suggest, and how would you confirm it?',
              answerOutline: 'About 3, because $2^3 = 8$. Confirm with at least four doubled sizes and a log-log fit, not one ratio.',
            },
            {
              question: 'Give two reasons a measured log-log slope can mislead you.',
              answerOutline: 'Runs too short to rise above noise, and mixed terms where the small-size slope misses a term that dominates later. Cache or memory limits can also shift the slope.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/asymptotic-notation'],
        },
        {
          slug: 'timing-and-profiling',
          title: 'Timing and profiling',
          summary:
            'Use time.perf_counter, timeit, cProfile and tracemalloc to find out where time and memory really go, and learn how much of a measurement is noise.',
          estimatedMinutes: 75,
          objectives: [
            'Choose the right tool for timing a block, a statement, a program or its memory',
            'Read cProfile output and tell tottime from cumtime',
            'Measure current and peak allocation with tracemalloc',
            'Estimate the noise floor of a timing before comparing two methods',
            'Follow a measure, fix, re-measure loop',
          ],
          concepts: [
            'time.perf_counter',
            'timeit and repeated measurement',
            'Taking the minimum of repeats',
            'cProfile: tottime and cumtime',
            'Profiler overhead',
            'tracemalloc: current and peak',
            'Noise floor',
            'Optimising the hottest line first',
          ],
          explanation: `Guessing where a program spends its time is usually wrong, so measure first. Four tools in the standard library answer four different questions.

**\`time.perf_counter()\`** is a high-resolution clock for timing one block. Prefer it to \`time.time()\`, which can jump when the system clock is adjusted. **\`timeit\`** repeats a small statement many times and turns off garbage collection while it runs. Noise only ever adds time, so the minimum of several repeats is the most stable summary for small code.

**\`cProfile\`** counts calls and time per function. \`tottime\` is time inside the function itself, and \`cumtime\` includes everything it calls. Sort by \`tottime\` to find where to fix, and by \`cumtime\` to see which step of the pipeline is expensive. Every Python call pays profiler overhead, so call-heavy code looks worse than it is, and one C function appears as a single opaque line. **\`tracemalloc\`** records Python allocations, including NumPy buffers, and reports current and peak bytes. Peak is what crashes your laptop.

\`\`\`python
import cProfile, pstats, tracemalloc

with cProfile.Profile() as prof:
    result = pipeline(rows)
pstats.Stats(prof).sort_stats("tottime").print_stats(10)

tracemalloc.start()
result = pipeline(rows)
current, peak = tracemalloc.get_traced_memory()
tracemalloc.stop()
\`\`\`

Do not time code with \`tracemalloc\` running, because it slows allocation heavily. Measure on realistic data, since a pipeline's bottleneck often moves as sizes change. Repeat every measurement, because the first run also pays for cold caches and lazy imports. Before you claim one method beats another, repeat the same method and see how much it varies against itself.

Work in a loop: profile, fix the top line, re-measure, stop when it is fast enough. Read the \`timeit\` note on minimums and the profiler's instant user manual. The Data Structures and Algorithms lesson on measuring goes deeper into the memory hierarchy.`,
          resources: [
            { title: 'timeit: measure execution time of small code snippets', url: 'https://docs.python.org/3/library/timeit.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Read the note on why the minimum of the repeats is the useful number.', primary: true },
            { title: 'The Python profilers', url: 'https://docs.python.org/3/library/profile.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Read the instant user manual and the section on pstats.' },
            { title: 'tracemalloc: trace memory allocations', url: 'https://docs.python.org/3/library/tracemalloc.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'The examples on snapshots and top allocators are the useful part.' },
            { title: 'time: time access and conversions', url: 'https://docs.python.org/3/library/time.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Find perf_counter and compare it with time.time.' },
          ],
          exercises: [
            {
              slug: 'profile-a-word-count',
              title: 'Profile, fix, re-measure',
              prompt:
                'Download the plain text of *Moby-Dick* from Project Gutenberg (ebook 2701) and write a deliberately naive word counter: lowercase the text, split it with the regular expression `[a-z\']+`, and keep parallel lists `words` and `counts`, using `words.index(w)` to find each word. Profile it with `cProfile` and report the top five rows by `tottime`. Replace the slow part, re-measure and report the speed-up. The top 10 words must be identical before and after, and there are about 220,000 tokens to count.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'memory-of-a-table',
              title: 'What a table costs in memory',
              prompt:
                'Store $10^6$ rows of three random floats four ways: a list of dicts, a list of tuples, three Python lists, and a NumPy array of shape `(n, 3)`. For each, use `tracemalloc` to report peak bytes per row, then in a separate run with `tracemalloc` off, use `time.perf_counter` to report nanoseconds per row to sum the second column. Say what the ratio between the largest and smallest layout would mean for a dataset of 50 million rows.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'noise-floor',
              title: 'Find your noise floor',
              prompt:
                'Use `timeit.repeat` to time `sum(xs)` on a list of 10,000 floats, with 30 repeats of 1,000 loops each. Report the minimum, median and maximum, and the ratio of maximum to minimum. Repeat while another program is busy, such as a video or a large file copy. State the smallest speed-up you could claim from a single before-and-after run on your machine, and how your answer changes if you compare minimums.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between tottime and cumtime in cProfile, and when do you sort by each?',
              answerOutline: 'tottime excludes callees and shows where the work happens. cumtime includes callees and shows which high-level step is expensive. Sort by tottime to choose a fix, cumtime to understand the pipeline.',
            },
            {
              question: 'Why is the minimum of repeated timings often more useful than the mean for small code?',
              answerOutline: 'Interference from other processes and the system only adds time, so the minimum is closest to the true cost of the code.',
            },
            {
              question: 'Why should you not report run times from a run with tracemalloc enabled?',
              answerOutline: 'Tracking every allocation adds large overhead, so timings are distorted. Measure memory and time in separate runs.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/measuring-and-benchmarking'],
        },
        {
          slug: 'vectorisation-and-the-cost-of-pandas',
          title: 'Vectorisation and the cost of pandas',
          summary:
            'Why NumPy is fast, why iterrows is slow, why concatenating in a loop is quadratic, and what groupby, merge and categorical columns do underneath.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why NumPy loops beat Python loops using memory layout and dispatch',
            'Rank iterrows, itertuples and vectorised code, and measure the gaps',
            'Replace repeated pd.concat with collect-then-concat',
            'Describe groupby and merge as hash operations and predict their cost',
            'Decide from measurement when a categorical dtype pays off',
          ],
          concepts: [
            'Contiguous memory',
            'Boxed Python objects',
            'C loops and type dispatch',
            'Cache locality',
            'iterrows, itertuples, vectorised columns',
            'Quadratic concat in a loop',
            'Hashing in groupby and merge',
            'Many-to-many join blow-up',
            'Categorical dtype: codes plus labels',
          ],
          explanation: `A Python list of floats is an array of pointers to separate heap objects, each with a header. A loop over it follows a pointer, checks a type and dispatches an operation for every element. A NumPy array is one contiguous block of unboxed values of a single dtype, so \`a + b\` runs a compiled C loop with no per-element dispatch. Contiguous data also suits the CPU cache, which fetches neighbours together. That is why the gap is so large.

pandas sits on those arrays, so the same ladder applies. \`iterrows\` builds a Series per row, \`itertuples\` builds a tuple per row, and column arithmetic stays in C. \`df.apply(f, axis=1)\` is still a Python loop.

Repeated concatenation is the classic quadratic trap, because each call copies every row so far:

\`\`\`python
out = frames[0]
for frame in frames[1:]:
    out = pd.concat([out, frame])    # quadratic

out = pd.concat(frames, ignore_index=True)    # linear
\`\`\`

\`groupby\` and \`merge\` are hash operations. \`groupby\` turns each key into an integer code using a hash table and then aggregates by code, about $O(n)$ for simple aggregates. \`merge\` builds a hash table on one side and probes it with the other, costing $O(n + m)$ plus the size of the output. That last term matters: duplicate keys on both sides multiply rows. Pass \`validate="one_to_many"\` when you know the shape.

A **categorical** column stores integer codes plus a table of distinct labels, so the hashing is already done. It saves memory and speeds up grouping when distinct values are few, and gives little when almost every value is distinct. String storage differs between pandas versions, so measure on yours. Read the pandas guide on enhancing performance, then the categorical guide.`,
          resources: [
            { title: 'What is NumPy?', url: 'https://numpy.org/doc/stable/user/whatisnumpy.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'Short, and explains why vectorised code is both shorter and faster.', primary: true },
            { title: 'Enhancing performance', url: 'https://pandas.pydata.org/docs/user_guide/enhancingperf.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Read the opening sections on profiling and on moving loops out of Python.' },
            { title: 'Categorical data', url: 'https://pandas.pydata.org/docs/user_guide/categorical.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Focus on the memory usage section and the gotchas.' },
            { title: 'Merge, join, concatenate and compare', url: 'https://pandas.pydata.org/docs/user_guide/merging.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Read the warning about concatenating in a loop and the validate argument of merge.' },
          ],
          exercises: [
            {
              slug: 'iteration-ladder',
              title: 'Climb the iteration ladder',
              prompt:
                'Create a DataFrame with $10^6$ rows and float columns `a` and `b`. Compute the sum of `a * b` with `iterrows` (on the first 20,000 rows only), with `itertuples`, with column arithmetic, and with `to_numpy()` and a dot product. Report nanoseconds per row for each and confirm the answers agree where they cover the same rows. Estimate how long `iterrows` would take on the full table.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'concat-in-a-loop',
              title: 'Measure the concat trap',
              prompt:
                'Build a table from $m$ small frames of 100 rows each, once by calling `pd.concat` inside a loop and once by collecting the frames in a list and concatenating at the end. Use $m$ = 500, 1,000, 2,000, 4,000 and 8,000. Report the slope of each method and the time ratio at the largest $m$. The two results must be equal when compared with `assert_frame_equal` after resetting the index. Explain why the slope of the loop version keeps rising as $m$ grows.',
              kind: 'coding',
              difficulty: 2,
              hint: 'At small $m$ the fixed cost of each call hides the copying.',
            },
            {
              slug: 'groupby-merge-categorical',
              title: 'Groupby, merge and categoricals',
              prompt:
                'Simulate 2 million rows with a string key and a float value, once with 1,000 distinct keys and once with 1 million. For each case report `memory_usage(deep=True)` of the key column as your default string dtype and as `category`, and the time of `groupby(key, observed=True)[value].sum()` with each. Then merge the table with a lookup holding one row per key as $n$ doubles from 250,000 to 2,000,000, and report the slope. State where the categorical helped and where it did not.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give three separate reasons a NumPy sum beats a Python loop over a list.',
              answerOutline: 'No boxing, so values sit directly in memory. A single compiled loop with no per-element type dispatch. Contiguous layout that suits the cache and SIMD.',
            },
            {
              question: 'Why is calling pd.concat once per chunk quadratic in the number of chunks?',
              answerOutline: 'Each call allocates a new table and copies all rows so far, so total copying is proportional to $1 + 2 + \\dots + m$ chunks, which is $O(m^2)$.',
            },
            {
              question: 'A merge on a key returns far more rows than either input. What happened, and how do you catch it?',
              answerOutline: 'The key is duplicated on both sides, so matches multiply. Check key uniqueness first or pass the validate argument so merge raises an error.',
            },
          ],
        },
      ],
    },
    {
      slug: 'lists-stacks-and-queues',
      title: 'Lists, Stacks and Queues',
      description:
        'The linear structures behind everyday Python, what growth policy costs, the monotonic stack and deque, and sliding-window statistics on streams in constant memory per window.',
      lessons: [
        {
          slug: 'dynamic-arrays-and-linked-lists',
          title: 'Dynamic arrays and linked lists',
          summary:
            'Count the copies behind append for different growth factors, see why fixed increments are quadratic, and learn when a linked list loses to an array.',
          estimatedMinutes: 75,
          objectives: [
            'Explain amortised constant append with a copy count',
            'Compare growth factors of 2 and 1.5 with a fixed increment',
            'Predict the cost of building an array one element at a time',
            'Describe when linked lists lose to arrays, and the cases where they win',
          ],
          concepts: [
            'Capacity and size',
            'Growth factor',
            'Amortised cost',
            'Fixed increment is quadratic',
            'np.append allocates every time',
            'Linked list nodes',
            'Pointer chasing and cache misses',
            'Splicing at a known node',
          ],
          explanation: `A Python list is a **dynamic array**: a block of memory with spare capacity. Appending is usually one write. When the block is full you allocate a larger one and copy everything across. Single appends are occasionally expensive, but the average over many appends is constant, which is what **amortised** $O(1)$ means.

The growth policy decides the bill. Growing by a factor $r$ means the copies form a geometric series, so reaching $n$ elements costs roughly between $n/(r-1)$ and $rn/(r-1)$ copies. For $r = 2$ that is between $n$ and $2n$. For $r = 1.5$ it is between $2n$ and $3n$, with less unused memory. Growing by a fixed $c$ slots is a different world: about $n^2/(2c)$ copies, which is quadratic. You can count them directly:

\`\`\`python
def copies(n, grow):
    cap, size, total = 1, 0, 0
    for _ in range(n):
        if size == cap:
            total += size
            cap = grow(cap)
        size += 1
    return total

copies(10**6, lambda c: 2 * c) / 10**6
copies(10**6, lambda c: c + 1000) / 10**6
\`\`\`

\`\`\`interactive
dynamic-array
{"title": "Doubling vs fixed growth", "policy": "factor", "g": 2, "c": 4, "n": 64, "caption": "Press Play. Each spike on the left is a resize that copies every element. The widget charges 1 for each write plus 1 for each copied element, so total cost / n is the copies per element plus 1: it stays below 3 for doubling (r = 2), while the dashed +4 policy keeps climbing because its copies grow like n²/(2c). Try ×1.5 and compare with the 2n to 3n copies estimated above."}
\`\`\`

CPython grows lists by roughly an eighth, trading more copies for less waste. \`np.append\` has no spare capacity at all, so it copies the whole array on each call. Preallocate when you know $n$, or collect into a list and convert once.

A **linked list** gives every value its own node with a pointer to the next one. Inserting or deleting at a node you already hold is $O(1)$, while reaching the $i$th element is $O(i)$. In Python each node is a heap object, so you pay in memory, and scanning chases pointers across memory with poor cache behaviour. Arrays win nearly every data workload. Linked structures earn their place when you hold references and splice often, as in an LRU cache. Read the first sections of Open Data Structures, chapters 2 and 3.`,
          resources: [
            { title: 'Open Data Structures, Chapter 2: Array-Based Lists', url: 'https://opendatastructures.org/ods-python/2_Array_Based_Lists.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'Read ArrayStack, including the growth argument.', primary: true },
            { title: 'Open Data Structures, Chapter 3: Linked Lists', url: 'https://opendatastructures.org/ods-python/3_Linked_Lists.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'Read SLList and compare it with ArrayStack.' },
            { title: 'Amortized Analysis (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/09-amortize.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'Optional, for the proof techniques this course only uses informally.' },
          ],
          exercises: [
            {
              slug: 'growth-factor-table',
              title: 'Tabulate growth policies',
              prompt:
                'Using `copies`, report copies per element for factor 2, factor 1.5 and a fixed increment of 1,000, at $n$ = 100,000, 200,000, 400,000 and 1,000,000. Add a column for the unused capacity as a share of the capacity at the end of each run. Check every factor result against the bounds $n/(r-1)$ and $rn/(r-1)$, and explain why copies per element jumps around rather than settling for the factor policies. For factor 1.5 use `max(c + 1, int(1.5 * c))` so that capacity always grows.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'build-an-array',
              title: 'Three ways to build an array',
              prompt:
                'Build a NumPy array of $n$ floats by repeated `np.append`, by list append then `np.array`, and by preallocating and assigning. Use $n$ = 10,000, 20,000, 40,000 and 80,000 and report the log-log slope of each. Then append 1,000 items to an empty list while recording `sys.getsizeof`, list the sizes at which capacity changes, and estimate the growth factor CPython uses on your version.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'linked-list-measured',
              title: 'A linked list, measured',
              prompt:
                'Implement a singly linked list with a `__slots__` node class holding $10^6$ floats. Report bytes per element with `tracemalloc` and nanoseconds per element to sum the values, next to a Python list and a NumPy array. Then delete every second element: from the linked list by splicing while walking, from a Python list with `del` in a loop (use 50,000 elements for that one), and from a list with a comprehension. Report which approach wins and at what cost.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is append amortised $O(1)$ with a factor of 2 but not with a fixed increment?',
              answerOutline: 'With a factor, resize sizes form a geometric series summing to $O(n)$. With a fixed increment there are $n/c$ resizes each copying up to $n$, which sums to about $n^2/(2c)$.',
            },
            {
              question: 'What does a smaller growth factor trade away?',
              answerOutline: 'Less unused memory in exchange for more copies, so slightly slower appends with the same amortised class.',
            },
            {
              question: 'Name a case where a linked structure beats an array, and why it rarely applies to scanning data.',
              answerOutline: 'Frequent splicing at nodes you already hold, such as an LRU list. Scanning needs locality and low overhead per element, which arrays provide.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/linear-structures/arrays-and-dynamic-arrays',
            'data-structures-algorithms/linear-structures/linked-lists',
          ],
        },
        {
          slug: 'stacks-and-queues',
          title: 'Stacks and queues',
          summary:
            'Use stacks, queues, ring buffers and deques correctly, then apply the monotonic stack to previous greater elements and to peak prominence in linear time.',
          estimatedMinutes: 90,
          objectives: [
            'Choose a list, a deque or a ring buffer for a given access pattern',
            'Explain why list.pop(0) makes a queue quadratic',
            'Implement a ring buffer with wrap-around indexing',
            'Use a monotonic stack to find the previous greater element in O(n)',
            'Compute peak prominence for a whole series in O(n)',
          ],
          concepts: [
            'Last in, first out',
            'First in, first out',
            'list.pop(0) shifts every element',
            'collections.deque',
            'Ring buffer',
            'Monotonic stack',
            'Previous greater element',
            'Peak prominence',
            'Each element pushed and popped once',
          ],
          explanation: `A **stack** is last in, first out, and a Python list does it well with \`append\` and \`pop\`. A **queue** is first in, first out, and a list does it badly: \`list.pop(0)\` shifts every remaining element, so draining a queue is $O(n^2)$. Use \`collections.deque\`, which is $O(1)$ at both ends. A **ring buffer** is the fixed-size version: one array, a head index and wrap-around with \`%\`. It never allocates after setup, which suits keeping the last $w$ values in a NumPy array.

The **monotonic stack** answers "what is the nearest earlier value larger than this one?" for every position. Keep a stack whose values strictly decrease. Each new value pops everything less than or equal to it, and whatever remains on top is its previous greater element. Every element is pushed once and popped at most once, so the total is $O(n)$ even though one step can pop many.

**Peak prominence** measures how far a peak stands above its surroundings. From the peak, walk each way until you hit a strictly higher value or the edge, and note the lowest point on each side. The prominence is the height minus the larger of those two lows. Doing that walk per peak is quadratic in the worst case. Instead, store with each stack entry the lowest point since the entry below it, and merge those lows while popping:

\`\`\`python
def left_low(x):
    out, stack = [0.0] * len(x), []
    for i, v in enumerate(x):
        low = v
        while stack and stack[-1][0] <= v:
            low = min(low, stack.pop()[1])
        out[i] = low
        stack.append((v, low))
    return out

def prominences(x):
    left = left_low(x)
    right = left_low(x[::-1])[::-1]
    return [v - max(a, b) for v, a, b in zip(x, left, right)]
\`\`\`

Non-peaks come out as 0. \`scipy.signal.peak_prominences\` is your reference to test against. Read the deque docs, then trace ArrayQueue from Open Data Structures by hand.`,
          resources: [
            { title: 'collections: deque objects', url: 'https://docs.python.org/3/library/collections.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Read the deque section, including maxlen.', primary: true },
            { title: 'Open Data Structures, Chapter 2: Array-Based Lists', url: 'https://opendatastructures.org/ods-python/2_Array_Based_Lists.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'ArrayQueue is a ring buffer. Trace its wrap-around on paper.' },
            { title: 'scipy.signal.peak_prominences', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.peak_prominences.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'The definition used here, with a diagram of the walk and its bases.' },
            { title: 'Minimum stack and minimum queue', url: 'https://cp-algorithms.com/data_structures/stack_queue_modification.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'The same idea of storing an extra value with each stack entry.' },
          ],
          exercises: [
            {
              slug: 'queue-three-ways',
              title: 'A queue three ways',
              prompt:
                'Implement a ring buffer class with `push`, `pop` and `__len__` on a fixed-capacity NumPy array. Fill and drain a queue of $n$ items using `list.pop(0)`, `collections.deque` and your ring buffer, with $n$ = 25,000, 50,000, 100,000 and 200,000. Report the slope of each method and the time ratio at the largest size. Your ring buffer must pass a randomised test against `deque` over 100,000 mixed operations.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'previous-greater',
              title: 'Previous greater element',
              prompt:
                'Write `previous_greater(x)`, returning for each index the index of the nearest earlier strictly greater value, or -1. On `[3, 1, 4, 1, 5, 2]` it must return `[-1, 0, -1, 2, -1, 4]`. Test it against an $O(n^2)$ brute force on 1,000 random lists of length 50, including lists with many repeated values. Count stack pops on random walks of length $10^5$ and $10^6$, and report pops per element.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'prominence-linear',
              title: 'Peak prominence in linear time',
              prompt:
                'Implement `prominences`. On `[1, 3, 2, 5, 1, 4, 0]` the peaks at values 3, 5 and 4 must have prominence 1, 4 and 3. Test it against `scipy.signal.peak_prominences` at the indices from `find_peaks`, on 50 simulated series that include integer plateaus and random walks. Write the naive walk-per-peak version too, and run both on a slowly rising series with small noise at $n$ = 10,000, 20,000, 40,000 and 80,000. Report both slopes, then rank the peaks of a $10^6$-step random walk.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Compare only at real peaks. The convention for flat runs can differ between methods elsewhere.',
            },
          ],
          selfAssessment: [
            {
              question: 'One step of a monotonic stack can pop many items. Why is the whole pass still $O(n)$?',
              answerOutline: 'Each element is pushed once and popped at most once, so total pops across the pass are at most $n$.',
            },
            {
              question: 'When would you choose a ring buffer over a deque?',
              answerOutline: 'When the capacity is fixed and you want numeric values in one contiguous array with no allocation after setup.',
            },
            {
              question: 'What does prominence measure that height alone does not, and what extra value does the stack store?',
              answerOutline: 'How far a peak rises above the higher of the two lows separating it from higher ground, so a small bump on a high plateau scores low. The stack stores the lowest value since the entry below.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/linear-structures/stacks-queues-and-deques'],
        },
        {
          slug: 'sliding-windows-on-streams',
          title: 'Sliding windows on streams',
          summary:
            'Maintain rolling mean, variance and maximum in constant time per step with memory proportional to the window, and handle floating-point drift, time windows and missing values.',
          estimatedMinutes: 90,
          objectives: [
            'Maintain rolling mean and variance from a running sum and sum of squares',
            'Explain floating-point drift and choose a remedy',
            'Compute a sliding-window maximum with a monotonic deque in O(1) amortised',
            'Write stream processors as generators using O(w) memory',
            'Choose between row windows and time windows and handle missing values',
          ],
          concepts: [
            'Running sum and sum of squares',
            'Floating-point drift',
            'Periodic recomputation',
            'Monotonic deque',
            'Amortised O(1) per step',
            'Generators and O(w) memory',
            'Row windows and time windows',
            'NaN poisoning a running sum',
          ],
          explanation: `Recomputing a window statistic from scratch costs $O(w)$ per step. If a statistic can be updated, you pay $O(1)$. Keep the running sum $S$ and sum of squares $Q$ of the current window. Add the new value, subtract the oldest, and read off
$$\\bar{x} = \\frac{S}{w}, \\qquad s^2 = \\frac{Q - w\\bar{x}^2}{w - 1}.$$

The catch is **floating-point drift**. Subtraction does not exactly undo addition, so rounding errors accumulate. Data with a large offset is worst, because $Q$ loses its low digits, and one huge value passing through the window leaves permanent damage. A running variance can even go negative. The remedies are to recompute from the buffer every so often, or to subtract a fixed centre first.

Maximum cannot be updated this way, because removing the maximum tells you nothing about the runner-up. Use a **monotonic deque** of candidates with decreasing values. A new value evicts smaller candidates from the back, expired ones leave the front, and the front is the answer. Each value enters and leaves once, so the cost is $O(1)$ amortised.

\`\`\`python
from collections import deque

def sliding_max(stream, w):
    dq = deque()
    for i, x in enumerate(stream):
        while dq and dq[-1][1] <= x:
            dq.pop()
        dq.append((i, x))
        if dq[0][0] <= i - w:
            dq.popleft()
        if i >= w - 1:
            yield dq[0][1]
\`\`\`

Written as a **generator**, this uses $O(w)$ memory however long the stream runs.

A row window of 60 and a time window of 60 minutes differ as soon as rows are irregular or absent. In pandas, \`rolling(60)\` counts rows and \`rolling("60min")\` uses the time index. Missing data needs a decision too: a single \`NaN\` added to a running sum poisons it forever, so skip missing values, count the valid ones, and require a minimum count, as \`min_periods\` does. Use the pandas windowing guide as your reference implementation.`,
          resources: [
            { title: 'Windowing operations', url: 'https://pandas.pydata.org/docs/user_guide/window.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Your reference implementation. Read the sections on rolling windows, time-based windows and min_periods.', primary: true },
            { title: 'Functional Programming HOWTO', url: 'https://docs.python.org/3/howto/functional.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Read the sections on iterators and generators.' },
            { title: 'Minimum stack and minimum queue', url: 'https://cp-algorithms.com/data_structures/stack_queue_modification.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'The minimum-queue section is the monotonic deque in another form.' },
          ],
          exercises: [
            {
              slug: 'rolling-from-scratch',
              title: 'Rolling statistics from scratch',
              prompt:
                'Simulate an AR(1) series of $10^6$ values with coefficient 0.9. Write a generator yielding rolling mean and sample variance for $w = 1000$, and check it against `pd.Series.rolling` with a maximum absolute difference you report. Time it against recomputing `np.var` for every window, using 20,000 values, at $w$ = 100, 1,000 and 10,000. Report how each method scales with $w$, and use `tracemalloc` to confirm your generator\'s peak memory does not grow with stream length.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'drift-hunt',
              title: 'Hunt floating-point drift',
              prompt:
                'Run your rolling variance on 2 million standard normal values plus an offset of $10^9$, with $w = 100$, and compare the last value with the variance computed directly from the last window. Next run $w = 50$ on 1,000 normal values where the value at position 100 is replaced by $10^{16}$, and report the mean and variance at the end against the exact ones. Add recomputation from the buffer every $r$ steps, and find the largest $r$ that keeps relative error under 1% for the first case. Then try subtracting the first value from the stream instead, and report which fix you prefer.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'windows-and-gaps',
              title: 'Time windows with gaps',
              prompt:
                'Simulate 100,000 readings with exponentially spaced timestamps averaging 5 seconds, and set 5% of the values to `NaN`. Write a generator for a 60-second window mean that keeps a deque of `(timestamp, value)` pairs, skips missing values and treats the window as excluding its left edge. Check it against `Series.rolling("60s", min_periods=1).mean()` and report the largest difference. Report the largest number of readings ever in the window. Then use the sliding maximum on the same series with a row window of 12, and report how often the row window and a 60-second window give different answers.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Fill missing values in a copy or skip them before calling the maximum, and state which you did.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a mean be updated in $O(1)$ but a maximum needs a deque?',
              answerOutline: 'Sum can be undone by subtraction. When the maximum leaves, you need the runner-up, so you must keep the candidates that could become the maximum later.',
            },
            {
              question: 'Why does a running sum of squares drift, and what are two fixes?',
              answerOutline: 'Each add and subtract rounds, and the errors do not cancel, especially with a large offset or huge value. Recompute periodically or centre the data first.',
            },
            {
              question: 'Your sensor drops rows for an hour. How does that affect a row window of 60 compared with a 60-minute window?',
              answerOutline: 'The row window silently spans more than an hour of real time. The time window contains fewer rows, so you must check a minimum count.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/linear-structures/stacks-queues-and-deques'],
        },
      ],
    },
    {
      slug: 'trees-and-hashing',
      title: 'Trees and Hashing',
      description:
        'Ordered lookup with trees and sorted arrays, top-k with heaps, constant-time lookup with hash tables, and sketches that trade a small, known error for fixed memory.',
      lessons: [
        {
          slug: 'binary-search-trees',
          title: 'Binary search trees',
          summary:
            'Insert, search and traverse a binary search tree, watch sorted input destroy it, and see why a sorted array with bisect is often the better answer in Python.',
          estimatedMinutes: 75,
          objectives: [
            'Implement insert, search and in-order traversal iteratively',
            'Explain how tree height controls cost',
            'Show that sorted input produces a degenerate tree',
            'Answer point and range queries on sorted data with bisect',
            'Decide between a tree and a sorted array for a workload',
          ],
          concepts: [
            'BST ordering invariant',
            'Height and O(h) operations',
            'In-order traversal gives sorted output',
            'Degenerate tree from sorted input',
            'Balanced trees exist',
            'bisect_left and bisect_right',
            'Range queries on sorted arrays',
            'np.searchsorted',
          ],
          explanation: `A **binary search tree** stores a key in each node with one rule: everything in the left subtree is smaller and everything in the right subtree is larger. Search walks down from the root, going left or right at each node. Insert does the same and attaches a new leaf. Both cost $O(h)$, where $h$ is the height. **In-order** traversal (left, node, right) visits keys in sorted order.

Everything depends on $h$. Random insertion order gives a height proportional to $\\log n$. Sorted insertion order gives a chain of height $n$, so each insert walks the whole tree and building it is quadratic. Timestamps, sorted IDs and any already-ordered file produce exactly that. A recursive insert will also hit Python's recursion limit.

\`\`\`interactive
tree-lab
{"title": "Insertion order decides the height", "mode": "bst", "modes": ["bst", "avl"], "keys": [50, 30, 70, 20, 40, 60, 80], "key": 45, "caption": "Search and Insert walk one root-to-leaf path, so the comparison count is at most h + 1. Press Random under the list, then Sorted, and compare the height readout with log₂ n: sorted keys build a chain with h = n − 1. Switch to AVL to see rotations keep the same keys near log₂ n."}
\`\`\`

**Balanced trees** such as AVL and red-black trees fix this by rotating nodes to keep the height near $\\log n$. You need to know they exist and that they guarantee $O(\\log n)$ updates, and the Data Structures and Algorithms course covers how they work.

In Python, a pointer tree of objects is rarely the best tool, because every node is a heap object and every step chases a pointer. If your data changes rarely, keep a sorted array and use binary search:

\`\`\`python
from bisect import bisect_left, bisect_right

def in_range(sorted_ts, start, end):
    i = bisect_left(sorted_ts, start)
    j = bisect_right(sorted_ts, end)
    return sorted_ts[i:j]
\`\`\`

That is $O(\\log n + r)$ for $r$ results. \`np.searchsorted\` does many lookups at once in C. Inserting into a sorted list costs $O(n)$ because elements must shift, but that shift is a fast memory move, so measure before you assume a tree wins. Trees earn their place when ordered data changes constantly, which is why database indexes use a wide variant. Read Open Data Structures 6.2 with a pencil, drawing the tree for a few insert orders.`,
          resources: [
            { title: 'Open Data Structures, 6.2: Unbalanced Binary Search Trees', url: 'https://opendatastructures.org/ods-python/6_2_BinarySearchTree_Unbala.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'Read find and add. Remove is optional here.', primary: true },
            { title: 'bisect: array bisection algorithm', url: 'https://docs.python.org/3/library/bisect.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Read the searching sorted lists recipes.' },
            { title: 'numpy.searchsorted', url: 'https://numpy.org/doc/stable/reference/generated/numpy.searchsorted.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'The vectorised form of bisect, including the side argument.' },
            { title: 'Open Data Structures, Chapter 9: Red-Black Trees', url: 'https://opendatastructures.org/ods-python/9_Red_Black_Trees.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'Optional. Skim to see what balancing involves.' },
          ],
          exercises: [
            {
              slug: 'bst-height',
              title: 'Height under two orders',
              prompt:
                'Implement a BST with iterative `insert` and `search`, an in-order traversal using an explicit stack, and a `height` function. Insert 5,000 keys in random order and in sorted order, and report the height and the total build time of each. Then run 100,000 random keys and report height and nanoseconds per insert. Check that in-order output equals `sorted(keys)`. Finally write a recursive `insert` and show what happens on the sorted input.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'range-queries',
              title: 'Range queries on timestamps',
              prompt:
                'Simulate $10^6$ sorted event timestamps. Answer 100,000 random queries asking how many events fall in a range of one hour, three ways: a linear NumPy mask (use 100 queries and scale up), `bisect` in a Python loop, and `np.searchsorted` on arrays of starts and ends. All three must agree on the shared queries. Report microseconds per query for each method.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'tree-or-sorted-list',
              title: 'Tree or sorted list?',
              prompt:
                'Maintain a sorted collection under random inserts, using your BST and `bisect.insort` on a Python list. Multiply $n$ by 4 from 1,000 to 256,000 and report the total time and the log-log slope of each. `insort` is $O(n)$ per insert and your BST is $O(\\log n)$ on average, yet the list should win at the smallest sizes. Find the size at which the tree overtakes it on your machine, explain the crossover using constant factors, and name a workload that would change your conclusion.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the insertion order of keys matter so much for a plain BST?',
              answerOutline: 'Order determines shape. Sorted input makes a chain of height $n$, so operations cost $O(n)$. Random order gives height near $\\log n$.',
            },
            {
              question: 'How do you find all rows in a time range using a sorted array, and what does it cost?',
              answerOutline: 'Use bisect_left for the start and bisect_right for the end, then slice. That is $O(\\log n)$ plus the number of results.',
            },
            {
              question: 'When is a sorted list a better choice than a balanced tree in Python?',
              answerOutline: 'When reads dominate or data arrives in batches you can sort. It has no per-node overhead, good locality, and a fast memory shift for occasional inserts.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/trees-and-heaps/binary-search-trees'],
        },
        {
          slug: 'heaps-and-top-k',
          title: 'Heaps and top-k',
          summary:
            'Store a binary heap in an array, use heapq correctly, and find the top k of n items in O(n log k) time with only k items in memory.',
          estimatedMinutes: 75,
          objectives: [
            'Move between a heap array and its tree using index arithmetic',
            'Implement push and pop with sift-up and sift-down',
            'Use heapq, including max-heaps by negation and safe tie-breaking',
            'Find the top k of a stream in O(n log k) time and O(k) memory',
            'Choose between a heap, sorting and np.partition',
          ],
          concepts: [
            'Heap property',
            'Array layout: children at 2i+1 and 2i+2',
            'Sift-up and sift-down',
            'heapify in O(n)',
            'heapq is a min-heap',
            'Tie-breaking with tuples',
            'Min-heap of size k',
            'O(n log k) time and O(k) memory',
            'np.partition',
          ],
          explanation: `A **binary heap** keeps the smallest item at the root and requires only that each parent is no larger than its children. It needs no pointers, because the tree fits in an array: the children of index $i$ are at $2i + 1$ and $2i + 2$, and the parent is at $\\lfloor (i-1)/2 \\rfloor$. To push, append at the end and sift up. To pop, move the last item to the root and sift down. Both cost $O(\\log n)$, and building a heap from an array is $O(n)$.

\`\`\`interactive
heap
{"title": "A min-heap in an array", "kind": "min", "values": [4, 10, 3, 5, 1, 8, 7, 2, 9], "caption": "The tree and the array row are the same list, the layout heapq uses. The outlined node's parent and children indices are printed under the picture. Insert 0 to watch it sift up from the end; Extract-min moves the last item to the root and sifts it down. Load an unordered list to see the O(n) bottom-up build count its swaps."}
\`\`\`

Python's \`heapq\` works on a plain list and is a min-heap only, so negate numbers for a max-heap. Tuples on a heap compare field by field, which fails when scores tie and the next field cannot be compared. Use \`(score, counter, item)\` with a running counter.

**Top-k** is the workhorse use. To keep the $k$ largest of a stream, hold a *min*-heap of size $k$. Its root is the weakest item you are keeping, and anything better replaces it:

\`\`\`python
import heapq

def top_k(stream, k):
    heap = []
    for x in stream:
        if len(heap) < k:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            heapq.heapreplace(heap, x)
    return sorted(heap, reverse=True)
\`\`\`

Each item costs at most $O(\\log k)$, so the total is $O(n \\log k)$ with $O(k)$ memory, and most items fail the comparison and cost $O(1)$. The min-heap feels backwards at first, so trace it on a short list.

Compare the alternatives. Sorting is $O(n \\log n)$ and needs everything in memory. \`np.partition\` is $O(n)$ on average and very fast, but it also needs all the data in one array. Use the heap when data arrives as a stream or does not fit. Otherwise \`np.partition\` is usually the fastest answer. \`heapq.nlargest\` implements the pattern above. Read the heapq notes on priority queues, then draw one push and one pop from Open Data Structures 10.1.`,
          resources: [
            { title: 'heapq: heap queue algorithm', url: 'https://docs.python.org/3/library/heapq.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'Read the priority queue implementation notes on tie-breaking.', primary: true },
            { title: 'Open Data Structures, 10.1: BinaryHeap', url: 'https://opendatastructures.org/ods-python/10_1_BinaryHeap_Implicit_Bi.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'The implicit tree layout and the bubble and trickle operations.' },
            { title: 'numpy.partition', url: 'https://numpy.org/doc/stable/reference/generated/numpy.partition.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'What is and is not ordered after partitioning.' },
          ],
          exercises: [
            {
              slug: 'heap-from-scratch',
              title: 'A heap from scratch',
              prompt:
                'Implement a min-heap class on a Python list with `push`, `pop` and `peek`, writing sift-up and sift-down yourself. Test it against `heapq` with 10,000 random mixed operations, comparing every popped value. Add an assertion mode that checks the heap property after each step. Report nanoseconds per operation for your class and for `heapq`, and explain the difference.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'top-k-three-ways',
              title: 'Top-k three ways',
              prompt:
                'Draw $10^7$ lognormal values. Find the top $k$ with a Python heap fed from `arr.tolist()`, with `np.sort`, and with `np.partition`, for $k$ = 10, 1,000 and 100,000. All methods must give the same set. Report time for each, and peak memory for the heap when values are generated one at a time instead of stored. Count how often `heapreplace` ran, compare that to $n$, and explain how the count changes with $k$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'deterministic-top-words',
              title: 'A deterministic top list',
              prompt:
                'Using the word counts from *Moby-Dick* (Project Gutenberg ebook 2701), produce the 20 most frequent words, breaking ties by alphabetical order, using a heap of size 20 and not a full sort. Check the result against sorting all pairs with a key of `(-count, word)`. Then do the same for word pairs that occur next to each other. Report the top 5 of each and the number of distinct pairs.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The weakest item on the heap has the lowest count and, among equal counts, the alphabetically latest word. A small wrapper class with `__lt__` is one clean way to express that.',
            },
          ],
          selfAssessment: [
            {
              question: 'To keep the $k$ largest items, why use a min-heap rather than a max-heap?',
              answerOutline: 'You need quick access to the weakest item kept, because that is the one a new item must beat and replace.',
            },
            {
              question: 'When would you choose np.partition over a heap for top-k?',
              answerOutline: 'When all values already sit in memory in a numeric array, because it is $O(n)$ on average in C. Use a heap for streams or when memory is limited.',
            },
            {
              question: 'Why can pushing (score, item) tuples onto a heap raise an error, and what is the fix?',
              answerOutline: 'Equal scores make Python compare the items, which may not support ordering. Insert a unique counter between them.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/trees-and-heaps/heaps-and-priority-queues'],
        },
        {
          slug: 'hash-tables',
          title: 'Hash tables',
          summary:
            'Understand chaining, open addressing and load factor, why dict lookups are O(1) on average, and how interning strings to integers makes data pipelines smaller and faster.',
          estimatedMinutes: 90,
          objectives: [
            'Explain how a hash function and an array give average constant-time lookup',
            'Compare chaining with open addressing',
            'Relate load factor to probe counts and to resizing',
            'Say what breaks the constant-time guarantee',
            'Intern strings to integer ids and work on the ids',
          ],
          concepts: [
            'Hash function and bucket index',
            'Collision',
            'Chaining',
            'Open addressing and probing',
            'Load factor',
            'Resizing and amortised cost',
            'Worst-case O(n) under collisions',
            'Randomised string hashing',
            'Interning strings to integer ids',
          ],
          explanation: `A hash table turns a key into an array index with a hash function, then stores the entry at that index. Two keys can land on the same slot, which is a **collision**, and the two families of hash table differ in how they handle it.

**Chaining** keeps a small list in each bucket. **Open addressing** stores everything in the array itself and, on a collision, probes other slots in a fixed sequence. CPython's \`dict\` uses open addressing with a scrambled probe sequence. Deleting under open addressing needs a tombstone marker, or later probes would stop too early.

The key number is the **load factor** $\\alpha = n/m$, entries per slot. With chaining the expected chain length is $\\alpha$. With linear probing, a failed search takes about
$$\\frac{1}{2}\\left(1 + \\frac{1}{(1-\\alpha)^2}\\right)$$
probes, which explodes near $\\alpha = 1$. Tables therefore resize when $\\alpha$ crosses a threshold, copying everything in a geometric pattern, just as dynamic arrays do. Keeping $\\alpha$ bounded is why lookups are $O(1)$ on average. That is an average: if many keys collide, a lookup degrades to $O(n)$. Python randomises string hashes per process to stop attackers forcing this, which also means \`hash(s)\` differs between runs, so never store it.

\`\`\`interactive
hash-table
{"title": "Chaining vs open addressing", "strategy": "linear", "strategies": ["chaining", "linear"], "hash": "mod", "m": 11, "keys": [10, 22, 31, 4, 15, 28, 17, 88, 59], "key": "26", "caption": "Insert 26 and count the probes as it walks the long run of occupied slots. Delete a key: open addressing leaves a tombstone ⊠ so later searches do not stop early. Switch to chaining to see the same keys as short lists. Then set m = 61 and press Fill to α 0.5, 0.8, 0.9: the measured miss cost for linear probing follows ½(1 + 1/(1 − α)²) and explodes near α = 1."}
\`\`\`

**Interning** puts this to work. Strings are costly to store, compare and hash. Give each distinct string a small integer once, then work on integers:

\`\`\`python
ids = {}
codes = np.fromiter(
    (ids.setdefault(w, len(ids)) for w in tokens),
    dtype=np.int32, count=len(tokens),
)
counts = np.bincount(codes)
\`\`\`

Every repeated string becomes four bytes in a NumPy array. Now sorting, grouping and joining all run in C. \`pd.factorize\` does this for a column, and it is what a categorical stores. Read Open Data Structures chapter 5 for chaining and linear probing.`,
          resources: [
            { title: 'Open Data Structures, Chapter 5: Hash Tables', url: 'https://opendatastructures.org/ods-python/5_Hash_Tables.html', type: 'textbook', cost: 'free', provider: 'Pat Morin', note: 'Read ChainedHashTable and LinearHashTable.', primary: true },
            { title: 'Hashing (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/05-hashing.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'Optional, for the analysis behind the average-case claims.' },
            { title: 'pandas.factorize', url: 'https://pandas.pydata.org/docs/reference/api/pandas.factorize.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Interning for a whole column.' },
          ],
          exercises: [
            {
              slug: 'probes-versus-load',
              title: 'Probes against load factor',
              prompt:
                'Implement a chained table and a linear-probing table with $m = 2^{16}$ slots, without resizing, holding random 64-bit integers. For $\\alpha$ = 0.1, 0.3, 0.5, 0.7, 0.8, 0.9 and 0.95, measure the mean number of slots examined in 10,000 searches for absent keys. Report the table beside the formula for linear probing and $\\alpha$ for chaining. Then define a key class whose `__hash__` always returns 1, insert $n$ = 500 to 4,000 of them into a real `dict`, and report the slope.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'intern-a-book',
              title: 'Intern a book',
              prompt:
                'Tokenise *Moby-Dick* (Project Gutenberg ebook 2701) with `[a-z\']+` on the lowercased text, which gives about 220,000 tokens and about 17,000 distinct words. Intern the tokens to `int32` codes. With `tracemalloc`, report bytes per token for a list of fresh string objects against the codes plus the `ids` dict. Time word counting with `collections.Counter` on strings and `np.bincount` on codes. Decode the top 10 and check they match. Then scale the token list up ten times by repetition and report how each measurement changes.',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'Strings from `re.findall` are separate objects even when equal. Plain `str.split` output is the same.',
            },
            {
              slug: 'hash-join',
              title: 'A hash join by hand',
              prompt:
                'Simulate a left table of $n$ rows and a right table of $n/10$ rows with unique integer keys. Implement an inner join as a hash join with a dict, and as a sort-merge join on sorted NumPy arrays. Both must return the same rows as `pd.merge`. Double $n$ from 250,000 to 2,000,000 and report the time and slope for all three methods. Then duplicate keys on both sides so that each key appears 10 times, predict the output size, and confirm it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a dict lookup $O(1)$ on average, and when is it not?',
              answerOutline: 'Hashing jumps straight to a slot, and resizing keeps the load factor bounded so probes stay few. Under heavy collisions it degrades to $O(n)$.',
            },
            {
              question: 'What goes wrong with linear probing as the load factor approaches 1?',
              answerOutline: 'Occupied runs merge into long clusters, so probe counts grow roughly as $1/(1-\\alpha)^2$. Tables resize well before that.',
            },
            {
              question: 'What does interning buy you in a text pipeline?',
              answerOutline: 'Each repeated token becomes a small fixed-size integer, so memory shrinks and counting, sorting and joining can run on NumPy arrays. You keep one mapping for decoding.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/hashing/hash-tables-and-hash-functions',
            'data-structures-algorithms/hashing/hashing-applications',
          ],
        },
        {
          slug: 'sketches-bloom-and-count-min',
          title: 'Sketches: Bloom filters and count-min',
          summary:
            'Answer "have I seen this?" and "how often?" in fixed memory, with an error you can compute in advance, then find heavy hitters with a sketch and a heap.',
          estimatedMinutes: 100,
          objectives: [
            'Implement a Bloom filter with m bits and k hash functions',
            'Predict the false positive rate and choose m and k',
            'Derive k hash functions from two by double hashing',
            'Implement a count-min sketch and explain its one-sided error',
            'Size width and depth from the eN/w bound',
            'Find heavy hitters with a sketch and a heap',
          ],
          concepts: [
            'Sketch: fixed memory, bounded error',
            'Bloom filter: m bits, k hashes',
            'No false negatives',
            'False positive formula',
            'Optimal k',
            'Double hashing',
            'Count-min: width and depth',
            'One-sided error',
            'The eN/w bound',
            'Heavy hitters',
          ],
          explanation: `An exact set or counter needs memory for every distinct key. A **sketch** uses fixed memory and accepts a small error you can compute in advance.

A **Bloom filter** is an array of $m$ bits and $k$ hash functions. To add an item, set its $k$ bits. To query, check them: any clear bit means definitely absent, and all set means probably present. So there are no false negatives. After $n$ inserts a given bit is still clear with probability about $e^{-kn/m}$, so the false positive rate is about
$$\\left(1 - e^{-kn/m}\\right)^k,$$
which is lowest at $k = (m/n)\\ln 2$. You rarely need $k$ independent hashes. **Double hashing** derives them from two: $g_i(x) = h_1(x) + i\\,h_2(x) \\bmod m$.

\`\`\`interactive
hash-table
{"mode": "bloom", "title": "Bloom filter", "m": 64, "k": 3, "n": 20, "caption": "Each item sets the k bits gᵢ(x) = h₁(x) + i·h₂(x) mod m. Query words you never inserted: a clear bit proves absence; all bits set is a false positive. Press Fill and measure and compare the measured rate with (1 − e^(−kn/m))^k, then vary k to find the minimum near (m/n) ln 2."}
\`\`\`

\`\`\`python
import hashlib

def positions(item, k, m):
    d = hashlib.blake2b(item.encode(), digest_size=16).digest()
    h1 = int.from_bytes(d[:8], "little")
    h2 = int.from_bytes(d[8:], "little") | 1
    return [(h1 + i * h2) % m for i in range(k)]
\`\`\`

Use a stable hash like this one, because built-in \`hash\` changes between runs.

A **count-min sketch** is a table of depth $d$ and width $w$ with one hash per row. Adding $x$ increments one counter in each row. The estimate is the minimum of $x$'s $d$ counters. Collisions only ever add, so the estimate never falls below the truth: the error is **one-sided**. For a stream of $N$ items,
$$\\hat{c}(x) \\le c(x) + \\frac{eN}{w} \\quad \\text{with probability at least } 1 - e^{-d}.$$
Width sets the size of the error, and depth sets how rarely you exceed it. Choose $w$ from the error you can tolerate relative to $N$.

For **heavy hitters**, update the sketch for each token, then keep the $k$ largest estimates in a heap, with a dict to track what is already inside. Memory is $O(wd + k)$ however many distinct items arrive. Read Erickson's filtering notes, then the Stanford CS168 lecture on count-min.`,
          resources: [
            { title: 'Filtering and Streaming (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/06-bloom.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'Short notes on filters and streaming counts.', primary: true },
            { title: 'CS168 Lecture 2: Approximate Heavy Hitters and the Count-Min Sketch', url: 'https://web.stanford.edu/class/cs168/l/l2.pdf', type: 'lecture', cost: 'free', provider: 'Stanford University', note: 'The clearest route from the problem to the structure. Skip the proof details on a first read.' },
            { title: 'Bloom filter', url: 'https://en.wikipedia.org/wiki/Bloom_filter', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'Read the section on the probability of false positives, then check it against your measurements.' },
            { title: 'hashlib: secure hashes and message digests', url: 'https://docs.python.org/3/library/hashlib.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'BLAKE2 and its digest_size argument.' },
          ],
          exercises: [
            {
              slug: 'bloom-versus-formula',
              title: 'Bloom filter against the formula',
              prompt:
                'Implement a Bloom filter on a `bytearray` using `positions`. Insert 100,000 keys, then query 200,000 different keys, for bits per key and $k$ of (10, 7), (10, 3) and (5, 3). Assert there are no false negatives. Report measured false positive rate beside the formula, which gives about 0.0082 for (10, 7). Report the bytes used against a Python `set` of the same keys, measured with `tracemalloc`. Finally, sweep $k$ from 1 to 12 at 10 bits per key and report which $k$ does best.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'count-min-on-text',
              title: 'Count-min on a real text',
              prompt:
                'Build a count-min sketch on the *Moby-Dick* tokens from the previous lesson, with $w = 2000$ and $d = 4$, using double hashing per row and a NumPy table. Compare every word\'s estimate with `Counter`. Confirm that no estimate is below the truth, then report the median error, the maximum error, the bound $eN/w$, and the share of words whose error exceeds the bound. Repeat for $w$ = 500 and 8,000 and for $d$ = 1 and 2. Explain what each change did to the error.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'heavy-hitters',
              title: 'Heavy hitters in fixed memory',
              prompt:
                'Simulate a stream of 2 million tokens drawn from a Zipf distribution over $10^6$ possible ids (use `rng.zipf` with exponent 1.3 and discard values above $10^6$). Find the top 50 with a count-min sketch plus a heap of size 50, processing tokens one at a time. Compare with the exact top 50 from `Counter`. Report how many of the 50 you found, and the sketch\'s bytes against the Counter\'s, for several widths. Find the smallest width at which you recover at least 45 of 50.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'Update the estimate of an item already in the heap rather than pushing a duplicate. A dict from item to current estimate plus a periodic rebuild is enough.',
            },
          ],
          selfAssessment: [
            {
              question: 'A Bloom filter says an item is absent. How sure are you, and why?',
              answerOutline: 'Certain, given the filter is intact. Adding an item sets all its bits and bits never clear, so a clear bit proves it was not added.',
            },
            {
              question: 'Why does a count-min estimate never undercount, and why take the minimum over rows?',
              answerOutline: 'Each counter is the true count plus any colliding counts, which are non-negative. The minimum picks the row with the least collision noise.',
            },
            {
              question: 'What do width and depth each control in a count-min sketch?',
              answerOutline: 'Width sets the error size, $eN/w$. Depth sets the failure probability, $e^{-d}$. Memory is their product.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/hashing/hashing-applications'],
        },
      ],
    },
    {
      slug: 'graphs',
      title: 'Graphs',
      description:
        'How to store graphs in memory, how to traverse them, how to find shortest paths and components, and what has to change when the edge count reaches millions.',
      lessons: [
        {
          slug: 'representations-bfs-and-dfs',
          title: 'Representations, BFS and DFS',
          summary:
            'Store a graph as an edge list, adjacency lists, CSR or a dense matrix, traverse it with BFS and iterative DFS, and run all-pairs BFS with sparse boolean matrix products.',
          estimatedMinutes: 100,
          objectives: [
            'Compare the memory and access cost of four graph representations',
            'Read the neighbours of a node from CSR arrays',
            'Implement BFS and iterative DFS in O(V + E)',
            'Explain frontier BFS as sparse boolean matrix products',
            'Compute all-pairs hop distances on a graph with thousands of nodes',
          ],
          concepts: [
            'Edge list',
            'Adjacency list',
            'Compressed sparse row (CSR)',
            'Dense adjacency matrix',
            'BFS levels as hop distance',
            'Iterative DFS with a stack',
            'Frontier as a sparse matrix',
            'Boolean matrix product as one BFS step',
            'Relabelling node ids',
          ],
          explanation: `A graph with $V$ nodes and $E$ edges can live in memory four ways. An **edge list** is two integer columns: ideal for loading, poor for finding neighbours. **Adjacency lists** in Python are easy to write and cost a lot per edge. **CSR** (compressed sparse row) packs the same thing into two arrays, where the neighbours of $v$ are \`indices[indptr[v]:indptr[v + 1]]\`, costing about one integer per edge. A **dense matrix** takes $V^2$ cells, which only suits small or nearly complete graphs.

**BFS** visits nodes in rings using a queue, so its levels are hop distances, in $O(V + E)$. **DFS** dives along one path. Write it with an explicit stack, because recursion hits Python's limit on long paths.

BFS has a matrix form. If row $i$ of a sparse boolean matrix $F$ marks the frontier of source $i$, then $FA$ marks one step further from every source at once. Drop the nodes already seen and repeat. SciPy does the work in C, so running all sources together is practical on thousands of nodes:

\`\`\`python
import numpy as np
import scipy.sparse as sp

def bfs_levels(A, sources):
    n, k = A.shape[0], len(sources)
    dist = np.full((k, n), -1, dtype=np.int16)
    dist[np.arange(k), sources] = 0
    frontier = sp.csr_array(
        (np.ones(k, bool), (np.arange(k), sources)), shape=(k, n))
    level = 0
    while frontier.nnz:
        level += 1
        rows, cols = (frontier @ A).nonzero()
        new = dist[rows, cols] < 0
        rows, cols = rows[new], cols[new]
        dist[rows, cols] = level
        frontier = sp.csr_array(
            (np.ones(len(rows), bool), (rows, cols)), shape=(k, n))
    return dist
\`\`\`

The result is a $k \\times V$ table, so process sources in batches once $V$ grows. Node ids in real files have gaps, so relabel first with \`np.unique(..., return_inverse=True)\`. Work through Erickson's graph chapter for vocabulary and the SciPy sparse docs for formats.`,
          resources: [
            { title: 'Algorithms, Chapter 5: Basic Graph Algorithms', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/05-graphs.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Representations and traversal. Read for the ideas and skip the proofs.', primary: true },
            { title: 'scipy.sparse.csr_array', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.csr_array.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'The indptr, indices and data arrays, and how to construct them.' },
            { title: 'Breadth-first search', url: 'https://cp-algorithms.com/graph/breadth-first-search.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'A compact description, including path recovery.' },
            { title: 'ca-GrQc collaboration network', url: 'https://snap.stanford.edu/data/ca-GrQc.html', type: 'dataset', cost: 'free', provider: 'SNAP, Stanford', note: 'The graph used in this lesson. No login needed.' },
          ],
          exercises: [
            {
              slug: 'one-graph-four-ways',
              title: 'One graph, four ways',
              prompt:
                'Load SNAP `ca-GrQc` with pandas, skipping the comment lines, and relabel its ids to 0 through $V - 1$. You should get 5,242 nodes and 28,980 rows, of which 12 are self-loops. Check whether the file is already symmetric, despite what its header says. Build an edge list array, adjacency lists, a CSR array and a dense boolean array. Report the bytes each takes (`nbytes` for arrays, `tracemalloc` for lists) and microseconds per lookup for 10,000 random "are $u$ and $v$ linked?" queries and "list the neighbours of $u$" queries.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'bfs-and-dfs',
              title: 'BFS and iterative DFS',
              prompt:
                'Implement BFS returning a distance dict and iterative DFS returning a visit order, on adjacency lists of `ca-GrQc`. From the highest-degree node, report the histogram of hop distances, and check that BFS and DFS reach the same set of nodes. Check BFS against `scipy.sparse.csgraph.shortest_path` with `unweighted=True`. Then write a recursive DFS and run it on a path graph of 100,000 nodes to see the failure.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'all-pairs-by-frontiers',
              title: 'All-pairs distances by frontiers',
              prompt:
                'Run `bfs_levels` on `ca-GrQc` with self-loops removed, for every node as a source. Report the time, the largest finite distance (it should be 17), and the mean distance within the largest component. Compare the time with running your Python BFS from 500 random sources and scaling up. Check 100 random rows against `shortest_path(A, unweighted=True, indices=...)`. Finally, estimate the table size if the graph had 1 million nodes, and describe how you would batch the sources.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is CSR both smaller and faster to scan than Python adjacency lists?',
              answerOutline: 'It holds unboxed integers in contiguous arrays, with no per-list or per-integer object overhead, and scanning neighbours is sequential memory access.',
            },
            {
              question: 'What does the product $FA$ represent in frontier BFS?',
              answerOutline: 'For each source row, the set of nodes one step from the current frontier, computed for all sources in one C-level operation.',
            },
            {
              question: 'Why write DFS with an explicit stack in Python?',
              answerOutline: 'Deep graphs exceed the recursion limit, and an explicit stack is limited only by memory.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/graphs/graph-representations-bfs-dfs'],
        },
        {
          slug: 'shortest-paths',
          title: 'Shortest paths',
          summary:
            'Implement Dijkstra with a binary heap, turn probabilities into additive edge weights with a negative log, and repair a broken distance table with shortest paths.',
          estimatedMinutes: 90,
          objectives: [
            'Implement Dijkstra with a heap and lazy deletion',
            'State when Dijkstra is valid',
            'Convert probabilities to edge weights so the shortest path is the most probable',
            'Repair triangle-inequality violations in a distance table',
            'Use SciPy shortest-path routines and avoid the zero-weight pitfall',
          ],
          concepts: [
            'Dijkstra with a binary heap',
            'Relaxation',
            'Lazy deletion of stale entries',
            'Non-negative weights',
            'Negative log transform',
            'Most probable path',
            'Triangle inequality',
            'Metric repair by all-pairs shortest paths',
            'Explicit zeros in sparse graphs',
          ],
          explanation: `**Dijkstra's algorithm** finds shortest paths from one source when all weights are non-negative. Take the closest unfinished node from a priority queue and relax its out-edges. \`heapq\` has no decrease-key operation, so push a new entry and skip stale ones when popped:

\`\`\`python
import heapq, math

def dijkstra(adj, s):
    dist, prev, pq = {s: 0.0}, {}, [(0.0, s)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            nd = d + w
            if nd < dist.get(v, math.inf):
                dist[v], prev[v] = nd, u
                heapq.heappush(pq, (nd, v))
    return dist, prev
\`\`\`

This is $O((V + E) \\log V)$. Negative weights break the greedy argument.

**Probabilities become weights with a logarithm.** If each edge works independently with probability $p_e$, a path succeeds with probability $\\prod p_e$. Shortest paths add, so use $w_e = -\\log p_e$. Then
$$\\min \\sum_e -\\log p_e = -\\log \\max \\prod_e p_e,$$
and the shortest path is the most probable one. Weights are non-negative, because $p \\le 1$, so Dijkstra applies. Recover the probability with $e^{-d}$. Logs also avoid the underflow you get multiplying many small numbers.

**Shortest paths can repair a metric.** A table of measured distances should satisfy $d(a,c) \\le d(a,b) + d(b,c)$. When a detour through $b$ beats the direct entry, the direct entry is wrong or stale. Replacing the table with all-pairs shortest paths, as \`scipy.sparse.csgraph.shortest_path\` does, enforces the inequality everywhere. It only lowers entries, so it fixes overestimates, while one bad underestimate spreads to its neighbours.

SciPy has one trap. In a dense array, 0 means no edge. In a sparse array, an explicit stored zero is a real edge of weight zero, which is what $p = 1$ gives you. Remove $p = 0$ edges entirely. Read Erickson's chapter on shortest paths for why Dijkstra works.`,
          resources: [
            { title: 'Algorithms, Chapter 8: Shortest Paths', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/08-sssp.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Read the sections on relaxation and on Dijkstra.', primary: true },
            { title: 'Dijkstra on sparse graphs', url: 'https://cp-algorithms.com/graph/dijkstra_sparse.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'Why a heap with stale entries is fine in practice.' },
            { title: 'scipy.sparse.csgraph', url: 'https://docs.scipy.org/doc/scipy/reference/sparse.csgraph.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Read the section on graph representations, including how zeros are treated.' },
          ],
          exercises: [
            {
              slug: 'dijkstra-with-a-heap',
              title: 'Dijkstra with a heap',
              prompt:
                'Scatter 2,000 random points in the unit square and link pairs closer than 0.05, with Euclidean weights. Implement Dijkstra with lazy deletion and path recovery. Check all distances from node 0 against `scipy.sparse.csgraph.dijkstra`, to within $10^{-9}$. Report the share of heap pops that were stale, and the slope of run time as the number of points doubles from 2,000 to 16,000, shrinking the radius so the average degree stays fixed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'most-reliable-route',
              title: 'The most reliable route',
              prompt:
                'Simulate a communications network: 300 random points, linked when closer than 0.15, and each directed link working with probability drawn uniformly from 0.5 to 0.999. Find the most reliable route between two far-apart nodes using weights $-\\log p$, and also the route with the fewest hops. Report both route probabilities. Confirm the better one with 100,000 Monte Carlo trials, reporting a confidence interval. Then add links with $p = 1$ and show that a sparse array and a dense array give different answers.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'repair-a-distance-table',
              title: 'Repair a distance table',
              prompt:
                'Generate 60 random points and their exact distance matrix. Inflate a random 10% of pairs by a factor between 2 and 5, keeping the matrix symmetric, and repair it with `shortest_path(obs, method="FW", directed=False)`. Report how many cells changed, how many corrupted cells were missed, and the mean absolute error before and after. Then instead shrink 5 random pairs to a tenth of their value, repair, and report how many other cells became wrong. Say what this means for using the repair on real measurements.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the transform $-\\log p$ give a valid Dijkstra problem, and how do you read back the probability?',
              answerOutline: 'Sums of logs match products of probabilities, and $p \\le 1$ makes weights non-negative. The path probability is $e^{-d}$.',
            },
            {
              question: 'Why does a stale entry in the heap do no harm?',
              answerOutline: 'When popped, its distance is larger than the recorded best, so it is skipped. Each edge pushes at most once, so the heap stays $O(E)$.',
            },
            {
              question: 'What can all-pairs shortest paths repair in a distance table, and what can it not?',
              answerOutline: 'It lowers entries that exceed a detour, so it fixes overestimates. It cannot raise an entry, and an underestimate pulls other entries down.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/graphs/shortest-paths'],
        },
        {
          slug: 'components-and-graphs-at-real-sizes',
          title: 'Components and graphs at real sizes',
          summary:
            'Find connected components by BFS and by union-find, separate weak from strong components, and learn what has to change when a graph reaches millions of edges.',
          estimatedMinutes: 90,
          objectives: [
            'Label connected components by BFS and by union-find',
            'Explain the difference between weak and strong components',
            'Use scipy.sparse.csgraph for traversal and components',
            'Estimate memory needs before loading a large graph',
            'Replace all-pairs questions with sampling at scale',
          ],
          concepts: [
            'Connected component',
            'Union-find: find and union',
            'Path halving and union by size',
            'Incremental components on an edge stream',
            'Weak and strong components',
            'scipy.sparse.csgraph',
            'Bytes per edge',
            'Sampling sources instead of all-pairs',
          ],
          explanation: `A **connected component** is a maximal set of nodes that can all reach each other. There are two standard ways to find them. With **BFS**, loop over the nodes, start a traversal from each unlabelled one, and stamp everything it reaches: $O(V + E)$.

**Union-find** works from the edges alone, which suits a stream of edges with no adjacency structure:

\`\`\`python
def components(n, edges):
    parent, size = list(range(n)), [1] * n

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]
    return [find(x) for x in range(n)]
\`\`\`

Path halving and union by size make each operation nearly constant in practice. You can also stop partway and ask how components have grown so far.

In a directed graph there are two notions. **Weak** components ignore direction. **Strong** components require a directed path both ways, so a one-way link joins two weak neighbours without making them strongly connected. Web and citation graphs have one huge weak component and a much smaller strong core. Use \`connected_components(A, directed=True, connection="strong")\` and leave the algorithm itself to the Data Structures and Algorithms course.

At millions of edges the rules change. Budget memory first: a dict of Python lists takes tens of bytes per edge or more, while a boolean CSR array takes under ten. Load with \`dtype=np.int32\` and never call \`.toarray()\`. \`scipy.sparse.csgraph\` handles traversal and components in C. All-pairs answers need $V^2$ cells, which is $10^{12}$ at a million nodes, so sample sources and estimate distributions. Python loops over edges become the bottleneck, and each one you move into a library call counts. Check your counts against each SNAP dataset page.`,
          resources: [
            { title: 'scipy.sparse.csgraph.connected_components', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.csgraph.connected_components.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'The directed and connection arguments.', primary: true },
            { title: 'Disjoint Set Union', url: 'https://cp-algorithms.com/data_structures/disjoint_set_union.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'Path compression, union by size and practical applications.' },
            { title: 'Strongly connected components', url: 'https://cp-algorithms.com/graph/strongly-connected-components.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'Read the definition and the condensation graph. The algorithm is optional.' },
            { title: 'SNAP datasets', url: 'https://snap.stanford.edu/data/', type: 'dataset', cost: 'free', provider: 'SNAP, Stanford', note: 'Each dataset page lists node, edge and component counts you can check your results against.' },
          ],
          exercises: [
            {
              slug: 'two-ways-to-components',
              title: 'Components two ways',
              prompt:
                'Compute the connected components of `ca-GrQc` with BFS labelling and with union-find, then compare with `connected_components`. You should find 355 components with the largest holding 4,158 nodes. Add edges one at a time in random order with union-find and record the size of the largest component after each 5% of the edges. Report that curve and say how far along the largest component passed half of all nodes.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'three-million-rows',
              title: 'Three million rows',
              prompt:
                'Download SNAP `roadNet-PA` (about 10 MB compressed, 3,083,796 rows). Time `pd.read_csv` with `dtype=np.int32`, relabel the ids with `np.unique`, build a CSR array and run `connected_components`. There should be 1,088,092 nodes and a largest component of 1,087,562. Report each step\'s time and the CSR bytes per row. Load the first 300,000 rows into a dict of lists, measure bytes per row with `tracemalloc`, and extrapolate to the whole file. Then estimate the hop-distance distribution from 20 sampled sources, and say how close it could be to the true one.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Using `breadth_first_order` with `return_predecessors=True` gives you the visit order and the parents, from which levels follow in one pass.',
            },
            {
              slug: 'weak-and-strong',
              title: 'Weak and strong components',
              prompt:
                'Load the directed SNAP graph `wiki-Vote`. Report the number of weak and strong components and the share of nodes in the largest of each, and check these against the statistics on the dataset page. Compute the sizes of the set reachable from the largest strong component and the set that can reach it, using `breadth_first_order` on the graph and its transpose. Explain in a few sentences what these numbers say about how voting flows in the graph.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When would you use union-find rather than BFS for components?',
              answerOutline: 'When edges arrive as a stream, or you want component sizes as edges are added, or you have no adjacency structure. BFS needs the whole graph first.',
            },
            {
              question: 'A directed graph has one weak component but many strong ones. What does that tell you?',
              answerOutline: 'Everything is linked if you ignore direction, but one-way links mean most pairs cannot reach each other both ways.',
            },
            {
              question: 'Why does all-pairs analysis stop working at a million nodes, and what do you do instead?',
              answerOutline: 'It needs about $10^{12}$ cells and a traversal per node. Sample a modest number of sources and estimate the distribution, stating the sampling error.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/graphs/minimum-spanning-trees-and-union-find',
            'data-structures-algorithms/graphs/graph-representations-bfs-dfs',
          ],
        },
      ],
    },
    {
      slug: 'design-paradigms',
      title: 'Design Paradigms',
      description:
        'Divide and conquer, greedy choices and dynamic programming as working tools, from quantiles and scheduling through small exact routes to fuzzy string matching and alignment.',
      lessons: [
        {
          slug: 'divide-and-conquer',
          title: 'Divide and conquer',
          summary:
            'Split, solve and combine: merge sort, recurrences read from a recursion tree, and quickselect for medians and quantiles without a full sort.',
          estimatedMinutes: 75,
          objectives: [
            'Write merge sort and use its merge step to compute something useful',
            'Read the cost of a recurrence from a recursion tree',
            'Classify a recurrence by comparing work across levels',
            'Implement quickselect and explain its linear expected cost',
            'Choose between sorting and selection for quantiles',
          ],
          concepts: [
            'Split, solve, combine',
            'Merge sort',
            'Recurrence',
            'Recursion tree',
            'Master theorem intuition',
            'Quickselect',
            'Random pivot',
            'Counting inversions',
          ],
          explanation: `Divide and conquer splits a problem into smaller copies, solves them, and combines the answers. **Merge sort** halves a list, sorts each half and merges in linear time, which gives the recurrence
$$T(n) = 2T(n/2) + O(n).$$

You can read the cost from a **recursion tree**. Level $i$ has $2^i$ pieces of size $n/2^i$, so each level does $O(n)$ work, and there are $\\log_2 n$ levels, giving $O(n \\log n)$.

The master theorem generalises this. For $T(n) = aT(n/b) + O(n^d)$, each level does $a/b^d$ times the work of the level above, and three cases follow. If $a < b^d$ the work shrinks going down, so the top dominates and the cost is $O(n^d)$. If $a = b^d$ all levels tie, giving $O(n^d \\log n)$. If $a > b^d$ the work grows, so the leaves dominate at $O(n^{\\log_b a})$. You need that picture, not the proof.

**Quickselect** finds the $k$th smallest item. Partition around a random pivot and continue only into the side holding $k$. The expected recurrence is about $T(n) = T(n/2) + O(n)$, which is the first case, so the cost is $O(n)$:

\`\`\`python
import numpy as np

def quickselect(a, k, rng):
    a = np.asarray(a)
    while True:
        p = a[rng.integers(len(a))]
        lo, eq, hi = a[a < p], a[a == p], a[a > p]
        if k < len(lo):
            a = lo
        elif k < len(lo) + len(eq):
            return p
        else:
            k -= len(lo) + len(eq)
            a = hi
\`\`\`

A random pivot makes bad splits unlikely on any input. \`np.partition\` is the production version, and it gives you medians and quantiles without sorting everything.

The combine step can also compute things. While merging, every time an item from the right half passes the rest of the left half, you have counted those inversions. That count measures disagreement between two rankings. Read Erickson's recursion chapter for merge sort and selection, keeping the proofs for the Data Structures and Algorithms course.`,
          resources: [
            { title: 'Algorithms, Chapter 1: Recursion', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Read mergesort, quicksort, and the section on recursion trees.', primary: true },
            { title: 'Solving Recurrences (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/99-recurrences.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'Optional. A fuller treatment of recursion trees.' },
            { title: 'numpy.partition', url: 'https://numpy.org/doc/stable/reference/generated/numpy.partition.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'Read the note on the selection algorithms it uses.' },
          ],
          exercises: [
            {
              slug: 'ranking-disagreement',
              title: 'Measure ranking disagreement',
              prompt:
                'Extend merge sort to return the inversion count, and test it against an $O(n^2)$ brute force on 1,000 random items. Draw $n = 100,000$ scores $x$, and rank items by $x$ and by $x + \\epsilon$ with Gaussian noise of standard deviation 0.1, 0.5 and 2 times the standard deviation of $x$. Compute Kendall\'s $\\tau = 1 - 2I/\\binom{n}{2}$ from the inversion count $I$ and check it against `scipy.stats.kendalltau`. Report how $\\tau$ falls with the noise.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'predict-then-count',
              title: 'Predict, then count',
              prompt:
                'For $T(n) = 2T(n/2) + n$, $T(n) = 2T(n/2) + 1$, $T(n) = 4T(n/2) + n$ and $T(n) = T(n/2) + n$, write down the predicted growth using the three cases. Then write a recursive function for each that counts its unit operations, run it at $n = 2^{10}$ to $2^{18}$ (stop earlier for the third), and report the log-log slope. Explain why the first one\'s slope is a little above 1.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'median-at-scale',
              title: 'A median at scale',
              prompt:
                'On $10^7$ random floats, find the median with `np.sort`, `np.partition` and your `quickselect`, and check that they agree. Report the time of each, and for `quickselect` report the total number of elements examined divided by $n$ across 20 runs. Then compute the 1st, 50th and 99th percentiles with one `np.partition` call and with three separate calls. Report the saving.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does comparing $a$ with $b^d$ tell you about a recurrence?',
              answerOutline: 'Whether work per level shrinks, stays level or grows going down, which says whether the top, all levels or the leaves dominate the cost.',
            },
            {
              question: 'Why is quickselect $O(n)$ when quicksort is $O(n \\log n)$?',
              answerOutline: 'It recurses into one side only, so the work is a geometric series instead of $n$ on each of $\\log n$ levels.',
            },
            {
              question: 'When would you still sort instead of selecting?',
              answerOutline: 'When you need many order statistics or the full order, or will do repeated range queries on the same data.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/recurrences-and-divide-and-conquer'],
        },
        {
          slug: 'greedy-algorithms',
          title: 'Greedy algorithms',
          summary:
            'Take the best-looking step and never look back: when an exchange argument shows that works, when it fails on knapsack, and why nearest-neighbour routing is a baseline rather than an answer.',
          estimatedMinutes: 75,
          objectives: [
            'Write a greedy algorithm and state the rule it uses',
            'Sketch an exchange argument for interval scheduling',
            'Construct an instance where a plausible greedy rule fails',
            'Use nearest-neighbour routing as a baseline and measure how far it is from optimal',
          ],
          concepts: [
            'Greedy choice',
            'Exchange argument',
            'Interval scheduling',
            'Earliest finish time',
            'Knapsack by value density',
            'Counterexample search',
            'Nearest-neighbour routing',
            'Greedy as a baseline',
          ],
          explanation: `A greedy algorithm builds a solution one step at a time, always taking the choice that looks best now and never undoing it. It is fast and often wrong, so the rule needs a justification.

The standard justification is an **exchange argument**. Take any optimal solution and compare it with greedy's first choice. If you can swap that choice in without making things worse, greedy's first step is safe. Repeat on what remains.

**Interval scheduling** is the model example. Given requests with start and end times, accept as many non-overlapping ones as possible. Sort by finish time and take each one that fits:

\`\`\`python
def max_intervals(intervals):
    chosen, last_end = [], float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):
        if start >= last_end:
            chosen.append((start, end))
            last_end = end
    return chosen
\`\`\`

The exchange is easy to see: in any optimal schedule, the first request can be swapped for the one finishing earliest, because that leaves at least as much room. Choosing the shortest request or the earliest start both fail.

Change the problem slightly and greedy breaks. In 0/1 **knapsack** with capacity 10 and items of (weight, value) (6, 9), (5, 7), (5, 7), picking by value per unit of weight takes the first item, and nothing else fits, for a value of 9. The best choice is the other two items, worth 14. An early choice blocks better combinations, and the exchange argument fails exactly there.

**Nearest-neighbour routing** goes to the closest unvisited point each time, in $O(n^2)$ with no guarantee on quality. Late in the route it pays for its early choices with long jumps. It is still useful as a fast baseline and as a starting route for improvement later in the course. Without a proof, treat any greedy result as a baseline, and compare it with an exact answer on small instances. Read Erickson's opening greedy sections for more exchange arguments.`,
          resources: [
            { title: 'Algorithms, Chapter 4: Greedy Algorithms', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/04-greedy.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Read the opening sections and the scheduling example, and pay attention to how each exchange argument is built.', primary: true },
            { title: 'Approximation Algorithms (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/J-approx.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'Optional, for what can be guaranteed about heuristics on hard problems.' },
            { title: 'itertools: permutations', url: 'https://docs.python.org/3/library/itertools.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'You will need permutations and combinations for the brute-force checks.' },
          ],
          exercises: [
            {
              slug: 'observing-schedule',
              title: 'Schedule a night of observations',
              prompt:
                'Simulate 100,000 telescope requests with uniform start times over 10 hours and exponential durations averaging 5 minutes. Compare three rules: earliest finish, earliest start and shortest duration. Report the number accepted by each. On 200 instances of 15 requests, check with brute force over all subsets that earliest finish is always optimal, and report how often each of the other two rules falls short and by how much.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'break-a-greedy',
              title: 'Break a greedy rule',
              prompt:
                'Implement greedy knapsack by value density and an exact solver by trying all subsets. Check the example from the lesson: 9 against 14. Search 100,000 random instances of up to 10 items for the worst ratio of greedy value to optimal value, and report the instance and its ratio. Then show that the ratio can be made arbitrarily small by constructing a family of instances, and write three sentences on exactly where the interval exchange argument fails for knapsack.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'nearest-neighbour-baseline',
              title: 'Measure a routing baseline',
              prompt:
                'Generate 200 instances of 9 random points in the unit square. For each, compute the nearest-neighbour route from point 0 and the shortest route starting at point 0 by trying all orders with `itertools.permutations`. Report the mean, 95th percentile and worst ratio of the two lengths. Then at 500 points, run nearest neighbour from 20 different starts and report the spread of lengths. Plot one route and point out where the long jumps come from.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does an exchange argument show?',
              answerOutline: 'That some optimal solution agrees with greedy\'s first choice, because swapping it in does not hurt. Applying that repeatedly shows greedy is optimal.',
            },
            {
              question: 'Why does sorting by finish time work for interval scheduling when sorting by duration does not?',
              answerOutline: 'Finishing earliest leaves the most room for the rest. A short request can straddle two longer compatible ones and block both.',
            },
            {
              question: 'Greedy gives you a route with no proof of quality. What do you do with it?',
              answerOutline: 'Use it as a baseline or starting solution, measure its gap to an exact answer on small instances, and report that gap instead of claiming it is good.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/dynamic-programming-and-greedy/greedy-algorithms',
            'data-structures-algorithms/advanced-topics/np-hardness-and-coping',
          ],
        },
        {
          slug: 'dynamic-programming',
          title: 'Dynamic programming',
          summary:
            'Turn a recursion into a table by computing each subproblem once: memoisation and tables, DP on a DAG, counting shortest paths over BFS layers, and an exact small route with Held-Karp.',
          estimatedMinutes: 100,
          objectives: [
            'Identify subproblems and write a recurrence',
            'Choose between memoisation and a bottom-up table',
            'See a DP as a computation over a DAG in topological order',
            'Count shortest paths using BFS layers',
            'Implement Held-Karp with bitmasks and state its cost',
          ],
          concepts: [
            'Overlapping subproblems',
            'Memoisation with functools.cache',
            'Bottom-up tables',
            'Subproblem DAG',
            'Topological order',
            'Counting paths over BFS layers',
            'Bitmask state',
            'Held-Karp',
            'O(2^n n^2) time',
          ],
          explanation: `Dynamic programming is recursion with a memory. If a recursive solution meets the same subproblems repeatedly, compute each one once and reuse it.

**Memoisation** keeps the recursion and caches results with \`functools.cache\`. It is quick to write and visits only the states you need, but pays for Python calls and can hit the recursion limit. A **bottom-up table** fills states in an order where dependencies come first, which runs faster, can often be vectorised, and can drop rows it no longer needs.

Every DP is a computation on a **DAG**: states are nodes, dependencies are edges, and any topological order works. BFS layers give one such order. To count shortest paths from $s$, note that a node's shortest paths arrive through neighbours one layer closer:
$$\\text{ways}(v) = \\sum_{u \\in N(v),\\ \\text{dist}(u) = \\text{dist}(v) - 1} \\text{ways}(u).$$
So add \`ways[v] += ways[u]\` to BFS whenever \`dist[v] == dist[u] + 1\`.

**Held-Karp** solves a travelling-salesman path exactly. Trying all orders takes $(n-1)!$ steps, but the future depends only on which nodes you have visited and where you stand. So the state is $(S, v)$:
$$L(S, v) = \\min_{u \\in S \\setminus \\{v\\}} \\left[ L(S \\setminus \\{v\\}, u) + d(u, v) \\right].$$
Sets become bitmasks. With $2^n n$ states and $n$ choices each, the cost is $O(2^n n^2)$ time.

\`\`\`python
def held_karp_path(d):
    n = len(d)
    dp = np.full((1 << n, n), np.inf)
    dp[1, 0] = 0.0
    for S in range(1, 1 << n, 2):
        for last in range(n):
            if dp[S, last] == np.inf:
                continue
            for nxt in range(n):
                if not S >> nxt & 1:
                    T = S | 1 << nxt
                    dp[T, nxt] = min(dp[T, nxt], dp[S, last] + d[last][nxt])
    return dp[-1].min()
\`\`\`

Odd masks contain the start, node 0, and the last row of \`dp\` holds complete paths. Memory is $2^n n$ floats, which is usually the real limit. Read the opening of Erickson's chapter on dynamic programming.`,
          resources: [
            { title: 'Algorithms, Chapter 3: Dynamic Programming', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Read the opening sections on memoisation and on the pattern of smart recursion.', primary: true },
            { title: 'functools: cache', url: 'https://docs.python.org/3/library/functools.html', type: 'documentation', cost: 'free', provider: 'Python', note: 'cache and lru_cache, and what they require of arguments.' },
            { title: 'Held-Karp algorithm', url: 'https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A compact statement of the recurrence and its cost.' },
          ],
          exercises: [
            {
              slug: 'memo-versus-table',
              title: 'Memoisation against a table',
              prompt:
                'Count the ways to make a total from coins 1, 2, 5, 10, 20, 50, 100 and 200, where order does not matter. A total of 200 must give 73,682. Write a memoised version with `functools.cache` and a bottom-up version using one list of Python integers, so that large counts cannot overflow. Time both at totals of 200, 2,000 and 20,000, and report what happens to the memoised version as the total grows and how you would work around it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'count-shortest-paths',
              title: 'Count shortest paths',
              prompt:
                'Add path counting to BFS. On a grid graph with 8 rows and 6 columns of nodes, opposite corners must have 792 shortest paths, which is $\\binom{12}{5}$. Test it against brute-force enumeration on small random graphs. Then on the largest component of `ca-GrQc`, take the highest-degree node as the source. Report the largest path count, and the share of reachable nodes with exactly one shortest path. Say what a high count suggests about redundancy between those two authors.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'held-karp-small-route',
              title: 'An exact small route',
              prompt:
                'Implement `held_karp_path` with path recovery. It must match brute force over permutations on 5 random instances of 8 points. Run $n$ = 10 to 16 on random points in the unit square and report seconds and bytes of `dp`, then the ratio of time from each $n$ to the next and what ratio the formula predicts. Predict the time and memory at $n = 25$. Use the exact answer to report how far nearest neighbour is from optimal at $n = 14$ over 20 instances.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When would you prefer memoisation to a bottom-up table, and the reverse?',
              answerOutline: 'Memoisation when few states are reachable or the order is awkward. A table when most states are needed, for speed, for vectorising, and to avoid recursion limits.',
            },
            {
              question: 'Why does adding path counts during BFS work?',
              answerOutline: 'BFS finishes all nodes of a layer before the next, so each predecessor\'s count is final by the time it is used. Layers are a topological order of the shortest-path DAG.',
            },
            {
              question: 'What is the state in Held-Karp, and why is it enough?',
              answerOutline: 'The set of visited nodes and the current node. The order used to reach that state cannot affect the cost of completing the path.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/dynamic-programming-and-greedy/dynamic-programming-principles',
            'data-structures-algorithms/dynamic-programming-and-greedy/classic-dp-problems',
          ],
        },
        {
          slug: 'edit-distance-and-alignment',
          title: 'Edit distance and alignment',
          summary:
            'Compute edit distance with a table and traceback, speed it up with a band, score alignments, recover them in linear space, and learn why a small distance does not mean the same thing.',
          estimatedMinutes: 100,
          objectives: [
            'Fill an edit distance table and trace back the edits',
            'Use a band when you only care about small distances',
            'Score an alignment with Needleman-Wunsch',
            'Normalise a distance so strings of different lengths compare',
            'Explain how Hirschberg recovers an alignment in linear space',
            'Say why fuzzy matching needs evidence beyond distance',
          ],
          concepts: [
            'Edit distance table',
            'Traceback',
            'Two-row space saving',
            'Banded edit distance',
            'Needleman-Wunsch scoring',
            'Normalised edit distance',
            "Hirschberg's divide and conquer",
            'Distance does not imply identity',
          ],
          explanation: `**Edit distance** counts the fewest insertions, deletions and substitutions turning string $a$ into string $b$. Let $D_{i,j}$ be the distance between the first $i$ characters of $a$ and the first $j$ of $b$. The last column is a deletion, an insertion, or a match or substitution:
$$D_{i,j} = \\min(D_{i-1,j} + 1,\\ D_{i,j-1} + 1,\\ D_{i-1,j-1} + [a_i \\ne b_j]).$$
Filling the table costs $O(mn)$, and walking back from the corner recovers the edits.

\`\`\`interactive
dp-table
{"title": "Edit distance table and traceback", "problem": "edit", "a": "intention", "b": "execution", "caption": "Cell D[i][j] is D_{i,j} above. Each cell takes the minimum of the cell above + 1 (delete), the cell to the left + 1 (insert) and the diagonal + [aᵢ ≠ bⱼ]; the winning neighbour is drawn solid. Step to the end for the traceback: intention → execution needs 5 edits. Notice that each row only reads the row above it, which is why two rows are enough for the distance alone."}
\`\`\`

If you only need the distance, two rows are enough:

\`\`\`python
def edit_distance(a, b):
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1,
                           prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]
\`\`\`

If you only care whether the distance is at most $k$, a **band** is enough: cells with $|i - j| > k$ cannot matter, so the cost falls to $O(k \\min(m, n))$.

**Needleman-Wunsch** uses the same table but maximises a score, with values for match, mismatch and gap. To compare strings of different lengths, **normalise** by dividing the distance by the longer length.

**Hirschberg's method** recovers the alignment in linear space. One forward pass and one backward pass, each keeping only two rows, score the left half of $a$ against every prefix of $b$ and the right half against every suffix. The best split point of $b$ maximises their sum. Recurse on both halves. Time stays $O(mn)$ and space falls to $O(m + n)$.

"McClurg Ct & Erie St" and "McClurg Ct & Ohio St" have edit distance 3, and normalised distance 0.15, yet they are different intersections. A small distance shows that spellings are similar, not that two things are the same. Before merging records on it, choose the threshold from labelled pairs and use other evidence, such as location or an id. Read Erickson's edit distance section first.`,
          resources: [
            { title: 'Algorithms, Chapter 3: Dynamic Programming', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Read the edit distance section.', primary: true },
            { title: 'Advanced Dynamic Programming (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/D-faster-dynprog.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'The opening section on saving space explains the divide-and-conquer idea.' },
            { title: 'Needleman-Wunsch algorithm', url: 'https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A worked scoring table to check yours against.' },
            { title: "Hirschberg's algorithm", url: 'https://en.wikipedia.org/wiki/Hirschberg%27s_algorithm', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'Pseudocode with a small trace.' },
          ],
          exercises: [
            {
              slug: 'table-and-traceback',
              title: 'Table and traceback',
              prompt:
                'Implement the full table with a traceback that returns the list of edits. `kitten` to `sitting` must give 3 and `intention` to `execution` must give 5. Replaying your edits on the first string must produce the second, on 1,000 random pairs. Report the distance and normalised distance for "McClurg Ct & Erie St" against "McClurg Ct & Ohio St", then write down two other pairs where distance misleads, one in each direction.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'banded-near-duplicates',
              title: 'Near-duplicates with a band',
              prompt:
                'Take distinct words of length 6 or more from *Moby-Dick*. Find all pairs with edit distance at most 2 among a random sample of 3,000 words, first with the full computation and then with a band that also skips pairs whose lengths differ by more than 2. The two pair sets must be identical, and you should report the time saved. Then review 40 pairs at random, labelling each as a real variant (plural, tense) or as different words, and report the precision. State a rule that would raise it, and test the rule.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'hirschberg-on-dna',
              title: 'Linear-space alignment',
              prompt:
                'Implement Needleman-Wunsch scoring (+1 match, -1 mismatch, -1 gap) and Hirschberg alignment. `GATTACA` and `GCATGCU` must score 0. Simulate a random DNA string of length 2,000 and mutate 10% of its positions, including some insertions and deletions. Hirschberg\'s alignment must, when you remove the gaps, give back both strings, and its score must equal the full table\'s score. Report time and peak memory from `tracemalloc` for both methods at lengths 500, 1,000 and 2,000.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a band of width $k$ lose nothing if the distance is at most $k$?',
              answerOutline: 'Each step off the diagonal costs one edit, so any path through a cell with $|i - j| > k$ already costs more than $k$.',
            },
            {
              question: 'How does Hirschberg recover an alignment without storing the table?',
              answerOutline: 'Forward and backward scoring with two rows finds where the optimal path crosses the middle row of $a$. Recursing on both halves gives the path in $O(mn)$ time and linear space.',
            },
            {
              question: 'Two station names have a normalised distance of 0.15. Are they the same station?',
              answerOutline: 'Not necessarily. Similar spelling is not identity, as Erie St and Ohio St show. Use labelled pairs to set thresholds, and add evidence such as coordinates.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/advanced-topics/string-algorithms'],
        },
      ],
    },
    {
      slug: 'discrete-optimisation',
      title: 'Discrete Optimisation',
      description:
        'Choosing the best from a huge set of combinations: dynamic programming and bounds, problems with polynomial solvers, integer programs handed to HiGHS, and local search when exact methods stop being practical.',
      lessons: [
        {
          slug: 'knapsack-and-assignment',
          title: 'Knapsack and assignment',
          summary:
            'Solve 0/1 knapsack in O(nW) and see what pseudo-polynomial means, bound it with the fractional relaxation, and solve assignment problems directly with SciPy.',
          estimatedMinutes: 90,
          objectives: [
            'Solve 0/1 knapsack with a DP over capacity and recover the items',
            'Explain why O(nW) is pseudo-polynomial',
            'Compute the fractional relaxation bound and use it to judge a solution',
            'Formulate a matching task as an assignment problem',
            'Solve square, rectangular and forbidden-pair cases with linear_sum_assignment',
          ],
          concepts: [
            '0/1 knapsack',
            'DP over capacity',
            'Pseudo-polynomial time',
            'Fractional relaxation',
            'Upper bound and gap',
            'Assignment problem',
            'Cost matrix',
            'scipy.optimize.linear_sum_assignment',
          ],
          explanation: `In 0/1 **knapsack** you choose items with weights $w_i$ and values $v_i$ to maximise value within capacity $W$. Let $B_i(c)$ be the best value from the first $i$ items in capacity $c$. Item $i$ is either skipped or taken:
$$B_i(c) = \\max\\left(B_{i-1}(c),\\ B_{i-1}(c - w_i) + v_i\\right).$$

\`\`\`interactive
dp-table
{"title": "The knapsack table", "problem": "knapsack", "letter": "B", "weights": [6, 5, 5], "values": [9, 7, 7], "W": 10, "caption": "Rows are items, columns capacities c = 0..10. Each cell compares skipping item i (the cell above) with taking it (vᵢ plus the cell wᵢ columns to the left in the row above). On the items (6, 9), (5, 7), (5, 7) the traceback takes the two 5s for 14, beating the greedy first pick of the densest item. Raise W to watch the table, and the cost O(nW), widen."}
\`\`\`

NumPy computes each item's row in one line. The right side is built from the old row, so no item is used twice:

\`\`\`python
def knapsack_value(values, weights, W):
    best = np.zeros(W + 1, dtype=np.int64)
    for v, w in zip(values, weights):
        best[w:] = np.maximum(best[w:], best[:W + 1 - w] + v)
    return best[W]
\`\`\`

This costs $O(nW)$, which looks polynomial and is not. $W$ is a number, and the input only needs $\\log W$ digits to write it down. Measuring weights in grams rather than kilograms makes the same problem a thousand times more expensive. That is **pseudo-polynomial** time. Knapsack is NP-hard, and this DP works because $W$ happens to be small and weights are integers.

The **fractional relaxation** lets you take part of an item. Sort by $v_i/w_i$, fill the knapsack, and take a fraction of the first item that does not fit. It costs $O(n \\log n)$, and because it relaxes the rules, its value is an **upper bound** on the true optimum. If a heuristic scores within 1% of that bound, it is within 1% of optimal, and you never had to solve the hard problem.

The **assignment problem** is different in kind. Given an $n \\times n$ cost matrix, match each worker to one task at the lowest total cost. Among $n!$ matchings the best can be found in about $O(n^3)$ time, as \`scipy.optimize.linear_sum_assignment(C)\` does. It returns row and column indices, accepts rectangular matrices, takes \`maximize=True\`, and treats \`np.inf\` as a forbidden pair. One is NP-hard and the other polynomial, so recognising which you have matters. Work through the CP-Algorithms knapsack page, then the SciPy example.`,
          resources: [
            { title: 'Knapsack problem', url: 'https://cp-algorithms.com/dynamic_programming/knapsack.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'The 0/1 case, including the single-row version.', primary: true },
            { title: 'scipy.optimize.linear_sum_assignment', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linear_sum_assignment.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Arguments, return values and a short example.' },
            { title: 'Algorithms, Chapter 12: NP-Hardness', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/12-nphard.pdf', type: 'textbook', cost: 'free', provider: 'Jeff Erickson', note: 'Optional. Read the opening for what NP-hard means.' },
          ],
          exercises: [
            {
              slug: 'knapsack-with-a-bound',
              title: 'Knapsack with a bound',
              prompt:
                'Extend `knapsack_value` to recover the chosen items. On (weight, value) items (6, 9), (5, 7), (5, 7) with $W = 10$ it must return 14, and the fractional bound must be 14.6. Generate 200 items with integer weights from 10 to 199 and values correlated with weight, and $W$ equal to a third of the total weight. Report the optimum, the fractional bound, the gap between them, and the value of greedy by density. Multiply all weights and $W$ by 10 and 100, confirm the optimum is unchanged, and report the time each took.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'match-reviewers',
              title: 'Match reviewers to papers',
              prompt:
                'Simulate 200 reviewers and 200 papers, each with a random unit vector of 10 topic weights, using negative dot product as cost. Compare `linear_sum_assignment` with a greedy that repeatedly takes the cheapest remaining pair, and report total cost and the ratio. Time the solver on random matrices at $n$ = 500, 1,000, 2,000 and 4,000 and report the slope. Then make 5% of pairs forbidden with `np.inf`, and solve a rectangular case of 150 reviewers and 200 papers.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $O(nW)$ not polynomial in the size of the input?',
              answerOutline: '$W$ takes only $\\log W$ digits to write, so the cost is exponential in that input length. Scaling units raises the cost without changing the problem.',
            },
            {
              question: 'How does a fractional bound let you judge a solution without solving the problem exactly?',
              answerOutline: 'The relaxation can only do better than any integer solution, so bound minus your value caps how far you are from optimal.',
            },
            {
              question: 'Knapsack and assignment are both discrete. What is the difference that matters in practice?',
              answerOutline: 'Assignment has a polynomial exact algorithm at sizes of thousands. Knapsack is NP-hard and solved by a pseudo-polynomial DP or a solver.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/dynamic-programming-and-greedy/classic-dp-problems',
            'data-structures-algorithms/advanced-topics/np-hardness-and-coping',
          ],
        },
        {
          slug: 'integer-programs-with-a-solver',
          title: 'Integer programs with a solver',
          summary:
            'Model decisions as variables and linear constraints, use big-M and subtour constraints, read the MIP gap, and let HiGHS do the search through scipy.optimize.milp.',
          estimatedMinutes: 100,
          objectives: [
            'Write a problem as decision variables, an objective and linear constraints',
            'Link a binary decision to a continuous one with big-M',
            'Explain the LP relaxation and branch and bound at an intuitive level',
            'Read solver status, the MIP gap and the node count',
            'Solve an integer program with scipy.optimize.milp',
            'Eliminate subtours from a small route with Miller-Tucker-Zemlin constraints',
          ],
          concepts: [
            'Decision variables',
            'Linear constraints',
            'Big-M',
            'LP relaxation',
            'Branch and bound',
            'MIP gap',
            'scipy.optimize.milp and HiGHS',
            'Subtours',
            'Miller-Tucker-Zemlin constraints',
          ],
          explanation: `An **integer program** states a problem as decision variables, a linear objective and linear constraints, with some variables forced to be integers. You write the model, and a solver such as HiGHS does the search. Read the \`milp\` reference and its knapsack example first.

\`\`\`python
import numpy as np
from scipy.optimize import milp, LinearConstraint, Bounds

res = milp(
    c=-values,
    constraints=LinearConstraint(weights, -np.inf, W),
    integrality=np.ones(len(values)),
    bounds=Bounds(0, 1),
    options={"mip_rel_gap": 0.0, "time_limit": 60},
)
chosen = np.flatnonzero(res.x > 0.5)
print(-res.fun, res.mip_gap, res.mip_node_count)
\`\`\`

\`milp\` minimises, so negate values to maximise. Solutions come back as floats near 0 and 1, so threshold them.

**Big-M** links a yes/no decision to a quantity. To allow flow $x$ only when site $y$ is open, write $x \\le My$. $M$ must be at least the largest possible $x$, and larger values weaken the model.

Dropping integrality gives the **LP relaxation**, which solves quickly and bounds the optimum. **Branch and bound** picks a fractional variable, splits into two subproblems, and discards any branch whose bound cannot beat the best solution found. Tight relaxations prune more. The **MIP gap** is the relative distance between the best solution and the best bound, and it proves quality: a gap of 0.5% means nothing better than 0.5% exists. Check \`res.status\`, because a time limit can leave an open gap.

Routes need one more idea. Requiring one edge in and one out of each node still allows separate loops, called **subtours**. Miller-Tucker-Zemlin adds an order variable $u_i \\in [1, n-1]$ for each non-start node:
$$u_i - u_j + (n - 1)x_{ij} \\le n - 2 \\quad (i, j \\ne 0,\\ i \\ne j).$$
If $x_{ij} = 1$, then $u_j \\ge u_i + 1$, so order must rise along the route, which rules out loops avoiding node 0. For a path with a free end, make every return to the start cost zero. The relaxation is weak, so this only suits small routes.`,
          resources: [
            { title: 'scipy.optimize.milp', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Read the parameters, the result fields and the knapsack example.', primary: true },
            { title: 'HiGHS documentation', url: 'https://ergo-code.github.io/HiGHS/stable/', type: 'documentation', cost: 'free', provider: 'HiGHS', note: 'The solver behind milp. See the terminology and the solver options.' },
            { title: 'Linear Programming (lecture notes)', url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/notes/H-lp.pdf', type: 'article', cost: 'free', provider: 'Jeff Erickson', note: 'Optional. The first sections explain LPs and why relaxations bound the optimum.' },
            { title: 'Optimization Methods in Management Science', url: 'https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'The notes on integer programming modelling are a good source of further practice.' },
          ],
          exercises: [
            {
              slug: 'model-the-knapsack',
              title: 'Model a knapsack',
              prompt:
                'Solve your 200-item instance from the previous lesson with `milp`. The value must match your DP exactly. Report `mip_gap`, `mip_node_count` and the time. Solve the LP relaxation by setting `integrality` to zeros, and compare its value with your fractional bound. Add two further constraints: items 0 and 1 cannot both be chosen, and at most 40 items may be chosen. Report how the optimum changes, and say which of the two would be awkward to add to the DP.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'depot-location',
              title: 'Where to open depots',
              prompt:
                'Choose which of 12 candidate depots to open to serve 30 customers, all random points in the unit square, with opening costs drawn from 0.5 to 1.5 and shipping cost equal to distance. Let $y_i$ be binary and $x_{ij}$ be the share of customer $j$ served by depot $i$. Solve it three ways: with $\\sum_j x_{ij} \\le M y_i$ for $M = 30$, the same with $M = 1000$, and with $x_{ij} \\le y_i$ for each pair. All three must reach the same optimum. Report the LP relaxation value, the node count and the time of each, and explain the differences.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Build the constraint matrix as a `scipy.sparse.csr_array`, and write a helper that maps $(i, j)$ to a variable index.',
            },
            {
              slug: 'mtz-small-route',
              title: 'A small route with MTZ',
              prompt:
                'Write a shortest path visiting all points from a fixed start as an integer program with Miller-Tucker-Zemlin constraints, using zero-cost returns to the start. On random points at $n$ = 8, 10 and 12 the length must match your Held-Karp result to within $10^{-6}$. Remove the MTZ constraints, plot what the solver returns and identify the subtours. Then run $n$ = 14, 16, 18 and 20 with a 60-second limit, and report time, node count and final gap.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a very large big-M a bad idea when any large value is logically correct?',
              answerOutline: 'It allows tiny fractional values of $y$ in the relaxation, which weakens the bound, so branch and bound prunes less and takes longer.',
            },
            {
              question: 'A solver stops at its time limit with a gap of 2%. What do you know?',
              answerOutline: 'You have a feasible solution, and no solution can be better than it by more than about 2%. It is not proven optimal, and the status should say so.',
            },
            {
              question: 'What do the Miller-Tucker-Zemlin variables do?',
              answerOutline: 'They give each node a position in the route. Each used edge forces the position to increase, which cannot hold around a loop missing the start.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/advanced-topics/np-hardness-and-coping'],
        },
        {
          slug: 'local-search-and-simulated-annealing',
          title: 'Local search and simulated annealing',
          summary:
            'Improve a solution by small moves such as 2-opt, insert and remove, escape local optima with restarts and annealing, and always certify a heuristic against an exact answer.',
          estimatedMinutes: 100,
          objectives: [
            'Define a neighbourhood for a route or selection problem',
            'Implement 2-opt with constant-time evaluation of a move',
            'Use restarts and explain what a local optimum is',
            'Implement the simulated annealing acceptance rule and a temperature schedule',
            'Tune annealing from sampled move costs',
            'Certify a heuristic against an exact answer on a small instance',
          ],
          concepts: [
            'Neighbourhood',
            '2-opt move',
            'Insert and remove moves',
            'Delta evaluation',
            'Local optimum',
            'Restarts',
            'Acceptance rule',
            'Temperature schedule',
            'Certifying a heuristic',
          ],
          explanation: `When an exact method runs out of road, start from any feasible solution and improve it. **Local search** defines a **neighbourhood**, a set of small changes, and moves whenever a change helps. For a route, a **2-opt** move reverses a segment, replacing two edges with two others. An **insert** move adds an optional stop or moves one to a new position, and a **remove** move drops one.

Evaluate moves by their change alone. A 2-opt move touches two edges, so computing $\\Delta$ is $O(1)$ where recomputing the route is $O(n)$.

Local search stops at a **local optimum**: no single move helps, though better answers may exist. **Restarts** are the simplest escape: keep the best result.

**Simulated annealing** escapes by sometimes accepting worse moves. Always accept an improvement, and accept a move that worsens the cost by $\\Delta > 0$ with probability $e^{-\\Delta/T}$:

\`\`\`python
import math

def anneal(cost, neighbour, state, T0, alpha, steps, rng):
    cur = best = cost(state)
    best_state, T = state, T0
    for _ in range(steps):
        cand = neighbour(state, rng)
        delta = cost(cand) - cur
        if delta <= 0 or rng.random() < math.exp(-delta / T):
            state, cur = cand, cur + delta
            if cur < best:
                best, best_state = cur, state
        T *= alpha
    return best_state, best
\`\`\`

At high $T$ the search wanders, and at low $T$ it only improves. A geometric schedule multiplies $T$ by $\\alpha$ slightly below 1 each step. To tune it, sample random moves, set $T_0$ so about half of the worsening ones would be accepted, and pick $\\alpha$ so $T$ ends where almost none are. Compare settings over several seeds, because one lucky run proves nothing.

**Always certify a heuristic.** Run it on an instance small enough for Held-Karp, a DP or a solver, and check that it reaches the exact answer. Then report its gap on larger instances against a bound. The CP-Algorithms page gives a compact implementation.`,
          resources: [
            { title: 'Simulated annealing', url: 'https://cp-algorithms.com/num_methods/simulated_annealing.html', type: 'article', cost: 'free', provider: 'CP-Algorithms', note: 'A short implementation-focused account of the acceptance rule and cooling.', primary: true },
            { title: '2-opt', url: 'https://en.wikipedia.org/wiki/2-opt', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The move drawn out, with pseudocode.' },
            { title: 'The Traveling Salesman Problem', url: 'https://www.math.uwaterloo.ca/tsp/', type: 'article', cost: 'free', provider: 'University of Waterloo', note: 'Background on how far exact methods and heuristics reach on this problem.' },
          ],
          exercises: [
            {
              slug: 'two-opt-with-restarts',
              title: '2-opt with restarts',
              prompt:
                'Implement 2-opt for a path with a fixed start, evaluating each move in $O(1)$. On 12 random points, run 50 random restarts. Report the share of restarts that reach the Held-Karp optimum and the mean gap of those that do not. On 60 points, compare 2-opt from a nearest-neighbour start with 2-opt from 50 random starts, and report best, median and worst lengths, along with time per restart.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'anneal-and-tune',
              title: 'Tune an annealer',
              prompt:
                'Add simulated annealing to the same 60-point instance using a random segment reversal as the move. Sample 1,000 random moves to choose $T_0$ and $\\alpha$ using the rule from the lesson. With 200,000 steps per run, compare your setting with $T_0$ ten times lower and ten times higher, over 10 seeds each, reporting median and best length. Add a plot of cost against step for one run of each. Certify the annealer on the 12-point instance: it must reach the Held-Karp optimum in most runs.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'anneal-a-knapsack',
              title: 'Insert and remove on a knapsack',
              prompt:
                'Apply annealing to your 200-item knapsack using three moves: insert an item, remove an item and swap one in for one out, rejecting any move that breaks the capacity. Report the best value over 10 seeds against the DP optimum and the fractional bound. Report the share of proposals accepted, and which of the three moves produced the most improvements. Say what your results would let you claim on an instance too large for the DP, where only the fractional bound is available.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a local optimum, and what are two ways to escape one?',
              answerOutline: 'A solution no single move can improve. Restart from elsewhere, or accept some worsening moves, as annealing does.',
            },
            {
              question: 'What happens to annealing if the temperature is far too high, or far too low, throughout?',
              answerOutline: 'Too high is a random walk that never settles. Too low is plain local search that sticks at the first local optimum.',
            },
            {
              question: 'How do you make a claim about a heuristic you cannot run an exact method on?',
              answerOutline: 'Certify it on small instances against exact answers, and on large ones measure its gap to a bound such as a relaxation.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/advanced-topics/np-hardness-and-coping'],
        },
      ],
    },
    {
      slug: 'continuous-optimisation',
      title: 'Continuous Optimisation',
      description:
        'The optimisation inside model fitting: convexity, gradient descent and its stochastic forms, Newton and L-BFGS, and fitting least squares, logistic and Poisson models with your own gradients.',
      lessons: [
        {
          slug: 'convexity-and-gradient-descent',
          title: 'Convexity and gradient descent',
          summary:
            'Recognise convex problems, know why their local minima are global, and run gradient descent with a sensible step size, seeing how the condition number sets the pace.',
          estimatedMinutes: 90,
          objectives: [
            'Test convexity with second derivatives and Hessian eigenvalues',
            'Explain why a local minimum of a convex function is global',
            'Run gradient descent and choose a stable learning rate',
            'Relate the condition number to the number of iterations',
            'Implement backtracking line search',
          ],
          concepts: [
            'Convex set',
            'Convex function',
            'Second derivative and Hessian tests',
            'Local minimum is global',
            'Gradient descent',
            'Learning rate',
            'Condition number',
            'Feature scaling',
            'Backtracking line search',
          ],
          explanation: `A set is **convex** if the segment between any two of its points stays inside. A function is convex if the chord between two points on its graph lies above the graph:
$$f(\\theta x + (1 - \\theta) y) \\le \\theta f(x) + (1 - \\theta) f(y), \\quad 0 \\le \\theta \\le 1.$$
For a twice-differentiable function the test is $f''(x) \\ge 0$ in one dimension and a positive semidefinite Hessian in many, meaning no negative eigenvalues. Your Calculus for Data Science course covers gradients, which this module uses throughout.

Convexity matters because **every local minimum is global**. If a better point existed, the chord towards it would give lower values arbitrarily close to your point, which contradicts being a local minimum. So when a descent method stalls in a convex problem, you are done.

**Gradient descent** steps downhill: $x_{t+1} = x_t - \\eta \\nabla f(x_t)$. On a quadratic with Hessian eigenvalues from $\\lambda_{\\min}$ to $\\lambda_{\\max}$, it is stable only for $\\eta < 2/\\lambda_{\\max}$. The steep direction limits the step, and the shallow direction then crawls. The **condition number** $\\kappa = \\lambda_{\\max}/\\lambda_{\\min}$ sets the pace, with iterations growing about in proportion to $\\kappa$. That is why standardising features helps: it reduces $\\kappa$.

**Backtracking line search** removes the need to guess $\\eta$. Try a large step and shrink it until the function falls enough:

\`\`\`python
def gd(f, grad, x, c=1e-4, beta=0.5, tol=1e-6, max_iter=100_000):
    for it in range(max_iter):
        g = grad(x)
        if np.linalg.norm(g) < tol:
            break
        t = 1.0
        while f(x - t * g) > f(x) - c * t * (g @ g):
            t *= beta
        x = x - t * g
    return x, it
\`\`\`

The condition demands a real decrease proportional to the step, not just any decrease. Stop on the gradient norm, not on the loss alone. Read Boyd and Vandenberghe chapter 3 for convex functions and sections 9.1 to 9.3 for descent.`,
          resources: [
            { title: 'Convex Optimization', url: 'https://web.stanford.edu/~boyd/cvxbook/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Free PDF. Read the opening of chapter 3 for the tests, and chapter 9 up to gradient descent.', primary: true },
            { title: 'Convex Optimization (course materials)', url: 'https://www.stat.cmu.edu/~ryantibs/convexopt/', type: 'course', cost: 'free', provider: 'Carnegie Mellon University', note: 'Lecture slides on gradient descent, which are good for the pictures.' },
            { title: 'load_diabetes', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_diabetes.html', type: 'dataset', cost: 'free', provider: 'scikit-learn', note: 'Bundled data used in the feature scaling exercise.' },
          ],
          exercises: [
            {
              slug: 'is-it-convex',
              title: 'Is it convex?',
              prompt:
                'For each function, decide by hand whether it is convex, then test it numerically by estimating the Hessian with finite differences at 1,000 random points and recording the smallest eigenvalue: $f(x) = x^4 - 3x^2$, $f(x) = e^{x_1 + 2x_2}$, $f(x) = \\|Ax - b\\|^2$ for a random $A$ of shape (20, 5), and $f(x) = x_1 x_2$. Report the results in a table. Explain why a numerical test can disprove convexity but cannot prove it.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'condition-number-sweep',
              title: 'Sweep the condition number',
              prompt:
                'Take $f(x) = \\frac{1}{2} x^T A x$ with $A$ diagonal of size 20, eigenvalues evenly spaced from 1 to $\\kappa$, and start from the all-ones vector. For $\\kappa$ = 10, 100 and 1,000, count iterations until $\\|\\nabla f\\| < 10^{-6}$, first with $\\eta = 1/\\kappa$ and then with backtracking. Report the slope of iterations against $\\kappa$ on a log-log plot. Then use $A = \\text{diag}(1, 10)$ and report the norm of $x$ after 100 steps for $\\eta$ = 0.05, 0.19 and 0.21, explaining the last one using the stability limit.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'scaling-speeds-descent',
              title: 'Scaling speeds up descent',
              prompt:
                'Fit least squares on `load_diabetes(scaled=False)` with an intercept, minimising $\\frac{1}{2n}\\|Xb - y\\|^2$ by gradient descent with backtracking. Compute $\\kappa$ of $X^T X$ on the raw features and after standardising, then report the iterations to reach a gradient norm of $10^{-3}$ with a cap of 200,000, and the final loss in each case. Compare the coefficients with `np.linalg.lstsq`, converted back to the original units in the standardised case. Say what you would conclude if you had only watched the loss curve of the raw fit.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does stalling mean you are finished in a convex problem but not in a non-convex one?',
              answerOutline: 'In a convex problem a zero gradient is a global minimum. Non-convex problems also have saddle points and poor local minima.',
            },
            {
              question: 'What is the condition number, and how does it affect gradient descent?',
              answerOutline: 'The ratio of largest to smallest Hessian eigenvalue. A high ratio forces a small step for the steep direction, so the shallow direction takes about $\\kappa$ iterations.',
            },
            {
              question: 'What does the backtracking condition check?',
              answerOutline: 'That the step lowers $f$ by at least a fixed share of what the gradient predicts. Otherwise the step shrinks and it tries again.',
            },
          ],
          relatedLessons: [
            'machine-learning/optimization-and-generalization-theory/gradient-descent-and-sgd',
            'machine-learning/optimization-and-generalization-theory/convexity-duality-and-constrained-optimization',
          ],
        },
        {
          slug: 'stochastic-and-mini-batch-methods',
          title: 'Stochastic and mini-batch methods',
          summary:
            'Replace the full gradient with a cheap noisy estimate, and control the noise with batch size, learning-rate schedules and momentum.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why a mini-batch gradient is an unbiased estimate of the full gradient',
            'Measure how gradient noise falls with batch size',
            'Describe the noise ball and use a schedule to shrink it',
            'Implement mini-batch SGD with momentum',
            'Compare methods by wall-clock time as well as by iterations',
          ],
          concepts: [
            'Sum-of-terms objective',
            'Stochastic gradient',
            'Mini-batch',
            'Epoch and shuffling',
            'Gradient noise',
            'Noise ball',
            'Learning-rate schedule',
            'Momentum',
            'Adam, briefly',
          ],
          explanation: `Model fitting usually minimises an average over data points, $f(x) = \\frac{1}{n}\\sum_i f_i(x)$, and a full gradient costs a pass over all $n$ rows. **Stochastic gradient descent** uses a random sample instead. A mini-batch $B$ gives
$$g_B = \\frac{1}{|B|} \\sum_{i \\in B} \\nabla f_i(x),$$
which is **unbiased**: its average is the true gradient. Its variance falls as $1/|B|$, so a batch 100 times larger costs 100 times more and only cuts the standard deviation by 10. Early in training a rough direction is plenty, which is why small batches make fast initial progress.

An **epoch** is one pass through the data, usually in a freshly shuffled order:

\`\`\`python
def minibatch_sgd(X, y, lr, batch, epochs, rng):
    n, p = X.shape
    b = np.zeros(p)
    for _ in range(epochs):
        order = rng.permutation(n)
        for s in range(0, n, batch):
            idx = order[s:s + batch]
            g = X[idx].T @ (X[idx] @ b - y[idx]) / len(idx)
            b -= lr * g
    return b
\`\`\`

With a constant learning rate the noise never disappears, so the iterate settles into a **noise ball** around the minimum, with a size that grows with $\\eta$. A **schedule** shrinks the step over time, for example $\\eta_t = \\eta_0/(1 + t/\\tau)$, trading early speed for late accuracy.

**Momentum** keeps a running direction, $v_{t+1} = \\beta v_t + g_t$ and $x_{t+1} = x_t - \\eta v_{t+1}$, with $\\beta$ near 0.9. Averaging damps zigzags across steep directions and adds up progress along shallow ones. **Adam** goes further, scaling each coordinate by running estimates of its gradient size. It is a strong default for neural networks, which later courses cover.

Compare methods by wall-clock time, because an iteration means different things at different batch sizes. Mini-batches of tens to hundreds also benefit from vectorised matrix products, which makes batch size 1 poor value in Python. Read Ruder's overview, then play with the Distill momentum plots.`,
          resources: [
            { title: 'An overview of gradient descent optimization algorithms', url: 'https://arxiv.org/abs/1609.04747', type: 'article', cost: 'free', provider: 'Sebastian Ruder', note: 'A compact tour of SGD variants, including momentum and Adam.', primary: true },
            { title: 'Why Momentum Really Works', url: 'https://distill.pub/2017/momentum/', type: 'interactive', cost: 'free', provider: 'Distill', note: 'Interactive plots. Try the sliders on an ill-conditioned problem.' },
            { title: 'Stochastic Gradient Descent', url: 'https://scikit-learn.org/stable/modules/sgd.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Practical tips, especially on scaling and learning-rate schedules.' },
          ],
          exercises: [
            {
              slug: 'batch-size-race',
              title: 'Batch-size race',
              prompt:
                'Simulate least squares with $n = 200,000$, $p = 20$, standard normal features and unit noise, and find the exact solution with `np.linalg.lstsq`. At a fixed $b$, estimate the variance of $g_B$ for batch sizes 1, 10, 100 and 1,000 from 500 samples, and report the log-log slope against batch size. Then tune a learning rate for each size, and report the distance to the exact solution after 5 epochs, as well as seconds per epoch. Say which batch size reaches a distance of 0.1 soonest in wall-clock time.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Larger learning rates are safe for larger batches. Batch size 1 in Python is slow, so use 2 epochs there.',
            },
            {
              slug: 'noise-ball-and-schedule',
              title: 'See the noise ball',
              prompt:
                'On the same problem with batch size 10, run a constant learning rate of 0.05, 0.025 and 0.0125 until the distance to the exact solution stops falling. Estimate the plateau from the last epoch\'s average, and report how it changes with $\\eta$. Then run $\\eta_t = \\eta_0/(1 + t/\\tau)$ with $\\eta_0 = 0.05$ and $\\tau = 2000$. Report the distance after 5 epochs against the constant-rate result. Try $\\tau$ ten times larger and smaller, and explain both failures.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'momentum-on-a-valley',
              title: 'Momentum on a narrow valley',
              prompt:
                'Take the quadratic $f(x) = \\frac{1}{2} x^T A x$ with eigenvalues evenly spaced from 1 to 100 in 20 dimensions, and use the true gradient plus Gaussian noise of standard deviation 0.1. Compare plain gradient descent and momentum with $\\beta = 0.9$, tuning $\\eta$ for each over a grid. Report the iterations to bring $\\|x\\|$ below 0.1 over 10 seeds. Then use a noise of 0 and report how the comparison changes, and describe what happens to momentum when $\\eta$ is too large.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'If you increase batch size by a factor of 100, what happens to cost and to gradient noise?',
              answerOutline: 'Cost per step rises by 100, while standard deviation falls by only 10, because variance scales as $1/|B|$.',
            },
            {
              question: 'Why does constant-rate SGD stop improving before it reaches the minimum?',
              answerOutline: 'Gradient noise does not vanish at the minimum for individual batches, so steps keep moving the iterate around, within a region whose size scales with $\\eta$.',
            },
            {
              question: 'What does momentum do on a narrow valley?',
              answerOutline: 'Opposing gradients across the valley cancel in the running average, and consistent gradients along it accumulate, so progress is faster with less zigzag.',
            },
          ],
          relatedLessons: ['machine-learning/optimization-and-generalization-theory/gradient-descent-and-sgd'],
        },
        {
          slug: 'newtons-method',
          title: "Newton's method",
          summary:
            'Use curvature to take much better steps, see digits double each iteration, understand why the cost stops it at large p, and use L-BFGS as a black box instead.',
          estimatedMinutes: 90,
          objectives: [
            "Derive Newton's step from a second-order Taylor approximation",
            'Solve a Newton step in n dimensions without inverting a matrix',
            'Recognise quadratic convergence in a table of errors',
            'Give the cost per step and why it limits p',
            'Describe where Newton fails and how a line search helps',
            'Use L-BFGS through scipy.optimize.minimize and read its result',
          ],
          concepts: [
            'Second-order Taylor model',
            'Newton step',
            'Solving rather than inverting',
            'Quadratic convergence',
            'O(p^3) cost per step',
            'Failure far from the optimum',
            'Damped Newton',
            'Quasi-Newton methods',
            'L-BFGS',
          ],
          explanation: `Gradient descent uses slope alone. **Newton's method** also uses curvature: fit a quadratic at the current point and jump to its minimum. In one dimension,
$$x_{t+1} = x_t - \\frac{f'(x_t)}{f''(x_t)}.$$
In $p$ dimensions, solve the linear system $H d = -g$ and set $x \\leftarrow x + d$. Solve, never invert: use \`np.linalg.solve(H, -g)\`.

Close to a minimum, the error is roughly squared at each step, which is **quadratic convergence**. The number of correct digits about doubles each iteration, so a few steps take you from rough to machine precision. A badly conditioned problem does not slow it down much, because the Hessian rescales the directions for you.

That speed costs something. You must form $H$, with $p^2$ entries, and solve with it at $O(p^3)$ per step. That is routine at $p$ in the hundreds and uncomfortable in the low thousands. At $p = 10^5$ just storing $H$ takes 80 GB, so it is out of the question.

Newton is also only local. If $H$ is not positive definite, the step can head to a saddle or a maximum. Far from the optimum it can overshoot: on a function with $f'(x) = \\arctan x$, starting from $x = 1.3$ converges to 0, and starting from $x = 1.4$ flies away. A line search on the Newton direction, called **damped Newton**, fixes most of this for convex problems.

**L-BFGS** is the practical middle ground. It builds a curvature estimate from recent gradient differences, using only a short history, so each step costs about $O(p)$ per stored pair. Treat it as a black box:

\`\`\`python
from scipy.optimize import minimize

res = minimize(fun_and_grad, x0, jac=True, method="L-BFGS-B")
print(res.success, res.nit, res.fun)
\`\`\`

With \`jac=True\`, your function returns the value and the gradient together. Always check \`res.success\`. Read section 9.5 of Boyd and Vandenberghe for Newton's method and the SciPy minimise tutorial.`,
          resources: [
            { title: 'Convex Optimization', url: 'https://web.stanford.edu/~boyd/cvxbook/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: "Free PDF. Section 9.5 covers Newton's method and its convergence.", primary: true },
            { title: 'scipy.optimize.minimize', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'The result object, jac=True and the choice of method.' },
            { title: 'Optimization and root finding tutorial', url: 'https://docs.scipy.org/doc/scipy/tutorial/optimize.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Worked examples with Rosenbrock, including Newton-type methods.' },
          ],
          exercises: [
            {
              slug: 'watch-digits-double',
              title: 'Watch digits double',
              prompt:
                "Minimise $f(x) = e^x - 2x$ from $x_0 = 0$. The minimum is $\\ln 2$. Print the error at each iteration and the ratio $|e_{t+1}|/e_t^2$, then say which iterations show quadratic convergence and at what iteration rounding takes over. Compare with gradient descent at the best fixed learning rate you can find, reporting the iterations to reach $10^{-10}$. Then apply Newton's iteration to the function with $f'(x) = \\arctan x$, from $x_0$ = 1.0, 1.3, 1.4 and 1.5, and report what happens. Use bisection to find the starting point where behaviour changes, to 3 decimals.",
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'rosenbrock-race',
              title: 'Race on Rosenbrock',
              prompt:
                'Start at $(-1.2, 1)$ on the 2-D Rosenbrock function, using `scipy.optimize.rosen`, `rosen_der` and `rosen_hess`. Compare pure Newton, gradient descent with backtracking, and L-BFGS through `minimize`, stopping at gradient norm $10^{-4}$. Report iterations, function evaluations and seconds for each, with a cap of 200,000 iterations. Plot all three paths on a contour plot. Then repeat in 100 dimensions, starting from alternating values of -1.2 and 1, and report how the comparison changes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'the-cubic-wall',
              title: 'Hit the cubic wall',
              prompt:
                'Time `np.linalg.solve` on random symmetric positive definite matrices at $p$ = 1,000, 2,000, 4,000 and 8,000. Report the log-log slope, noting that a threaded linear algebra library can make it look better than 3 at these sizes. Fit an L2-penalised logistic regression on simulated sparse data with $n = 20,000$ and $p = 5,000$ at 0.2% density, using L-BFGS with a hand-written function and gradient. Report iterations, seconds and `res.success`. Estimate how long one Newton step would take at this $p$, from your timings.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does quadratic convergence look like in a table of errors?',
              answerOutline: 'Each error is about a constant times the square of the last one, so correct digits roughly double per iteration until rounding takes over.',
            },
            {
              question: "Why does Newton's method stop being feasible at large $p$?",
              answerOutline: 'The Hessian needs $p^2$ storage, and each solve costs $O(p^3)$. L-BFGS keeps a short history instead, at about $O(p)$ per step.',
            },
            {
              question: 'Give two ways pure Newton can fail, and a fix.',
              answerOutline: 'It can diverge from a far start, or head to a saddle when the Hessian is not positive definite. A line search fixes the first, and convexity or a modified Hessian fixes the second.',
            },
          ],
          relatedLessons: ['machine-learning/optimization-and-generalization-theory/convexity-duality-and-constrained-optimization'],
        },
        {
          slug: 'fitting-a-model-as-optimisation',
          title: 'Fitting a model as optimisation',
          summary:
            'Write least squares, logistic and Poisson fitting as objectives with analytic gradients and Hessians, check them with finite differences, add an L2 penalty, and choose a solver by problem size.',
          estimatedMinutes: 100,
          objectives: [
            'Write the objective, gradient and Hessian for three models',
            'Compute a negative log-likelihood in a numerically safe way',
            'Check an analytic gradient with finite differences',
            'Add an L2 penalty and explain what it does to the problem',
            'Choose a solver from the size and shape of a problem',
          ],
          concepts: [
            'Fitting as minimisation',
            'Least squares',
            'Logistic negative log-likelihood',
            'Poisson negative log-likelihood',
            'Analytic gradient and Hessian',
            'Finite-difference gradient check',
            'L2 penalty',
            'Perfect separation',
            'Solver choice by problem size',
          ],
          explanation: `Fitting a model means minimising a function of its coefficients $\\beta$. With $\\eta = X\\beta$ and mean $\\mu$, three objectives cover most cases, and all three are convex:

- **Least squares:** $f = \\frac{1}{2}\\|y - \\eta\\|^2$, with $\\nabla f = X^T(\\eta - y)$ and $H = X^T X$.
- **Logistic:** $f = \\sum_i [\\log(1 + e^{\\eta_i}) - y_i \\eta_i]$, $\\mu = 1/(1 + e^{-\\eta})$, with $\\nabla f = X^T(\\mu - y)$ and $H = X^T \\text{diag}(\\mu(1 - \\mu)) X$.
- **Poisson:** $f = \\sum_i [e^{\\eta_i} - y_i \\eta_i]$, up to a constant, $\\mu = e^{\\eta}$, with $\\nabla f = X^T(\\mu - y)$ and $H = X^T \\text{diag}(\\mu) X$.

The gradients share a shape: each residual is passed back through $X$. Use safe forms such as \`logaddexp\` and \`expit\`, so large $\\eta$ does not overflow:

\`\`\`python
from scipy.special import expit

def nll(b):
    eta = X @ b
    return np.sum(np.logaddexp(0, eta) - y * eta) + 0.5 * lam * b @ b

def grad(b):
    return X.T @ (expit(X @ b) - y) + lam * b
\`\`\`

The **L2 penalty** $\\frac{\\lambda}{2}\\|\\beta\\|^2$ adds $\\lambda\\beta$ to the gradient and $\\lambda I$ to the Hessian, which improves conditioning and makes the minimum unique. Leave the intercept out. The penalty also rescues **perfect separation**, where the logistic coefficients grow without limit and Newton never converges.

**Check gradients numerically before you trust them.** A central difference $(f(\\beta + he_i) - f(\\beta - he_i))/(2h)$ with $h$ near $10^{-6}$ should match your gradient. \`scipy.optimize.check_grad(nll, grad, b0)\` reports the error in one number. A wrong gradient rarely crashes, and instead gives a quietly wrong fit.

Choose a solver by size. For least squares, use a direct solver such as \`np.linalg.lstsq\`. With $p$ up to the low thousands, Newton takes a handful of steps. With larger or sparse $p$, use L-BFGS. When $n$ is too large for full passes, use mini-batch SGD. Match your fits against the scikit-learn objectives.`,
          resources: [
            { title: 'scipy.optimize.check_grad', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.check_grad.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'What the returned number means, and how to scale it.', primary: true },
            { title: 'Linear Models', url: 'https://scikit-learn.org/stable/modules/linear_model.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the objective functions for logistic regression and generalised linear models, which you will match.' },
            { title: 'scipy.special.expit', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.expit.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'A safe logistic function.' },
            { title: 'load_breast_cancer', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html', type: 'dataset', cost: 'free', provider: 'scikit-learn', note: 'Bundled data for the logistic exercise.' },
          ],
          exercises: [
            {
              slug: 'logistic-from-scratch',
              title: 'Logistic regression from scratch',
              prompt:
                'Standardise `load_breast_cancer` and add an intercept. Write the L2-penalised logistic objective with $\\lambda = 1$ and the intercept unpenalised, plus its gradient and Hessian. Run `check_grad`, then introduce a bug by doubling the penalty term in the gradient and report how the check changes. Fit with Newton and with L-BFGS. Your coefficients must match `LogisticRegression(C=1.0, tol=1e-10, max_iter=10000)` to at least 3 decimals. Report the iterations and time for both.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'poisson-counts',
              title: 'Fit Poisson counts',
              prompt:
                'Simulate $n = 5,000$ counts with 5 standard normal features, true coefficients (0.3, -0.2, 0.5, 0, 0.1) and intercept 0.5. Write the Poisson objective, gradient and Hessian, with penalty $n\\alpha/2 \\cdot \\|\\beta\\|^2$ on the non-intercept coefficients, and verify them with a finite-difference check. Fit with Newton and compare with `PoissonRegressor(alpha=0.01, tol=1e-10, max_iter=10000)`, which minimises the mean of your objective, so the coefficients must match to at least 5 decimals. Report how close the estimates are to the true values. Then start Newton from an intercept of -10 with all other coefficients 0, and report what happens.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'separation-and-solver-choice',
              title: 'Separation and solver choice',
              prompt:
                'Fit logistic regression by pure Newton on $x$ = -3, -2, -1, 1, 2, 3 with $y$ = 0, 0, 0, 1, 1, 1 and an intercept. Print the slope for 12 iterations, and explain why it keeps growing. Add $\\lambda = 0.1$ and report the result. Then simulate dense logistic data at $p$ = 10, 100 and 1,000 with $n = 10p$, time Newton and L-BFGS at each size, and use your timings to write a short rule for picking a solver.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do the gradients of the three models have in common?',
              answerOutline: 'Each is $X^T$ times a residual, $\\mu - y$, where $\\mu$ is the model\'s mean. Least squares has $\\mu = \\eta$.',
            },
            {
              question: 'Why check a gradient numerically when you derived it carefully?',
              answerOutline: 'An error in a gradient does not crash anything. It gives slow or subtly wrong fits, and a finite-difference check catches it in seconds.',
            },
            {
              question: 'You have $p = 200,000$ sparse features and $n = 10^7$ rows. Which solver do you pick, and why?',
              answerOutline: 'L-BFGS or mini-batch SGD. Newton is impossible at that $p$, and if full gradients are too slow or data keeps arriving, use mini-batches.',
            },
          ],
          relatedLessons: [
            'machine-learning/linear-models/logistic-regression',
            'machine-learning/linear-models/basis-expansions-and-glms',
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'applied-algorithms-study',
    title: 'An applied algorithms study',
    description:
      'Take one real dataset and one question that stretches a naive approach. Measure the naive method, replace it with a better structure or optimiser from this course, and show the improvement with numbers.',
    deliverables: [
      'A runnable repository that reproduces every measurement from one command',
      'A benchmark comparing the naive and improved methods as the data grows',
      'A short report stating what improved, by how much, and what remains unproven',
    ],
    estimatedHours: 40,
  },
  masteryChecklist: [
    'I can estimate an exponent from a doubling experiment and profile a program to find its real bottleneck',
    'I can explain why NumPy is fast and rewrite slow pandas code using vectorised and hash-based operations',
    'I can compute rolling statistics on a stream in O(w) memory, and detect and control floating-point drift',
    'I can use monotonic stacks and deques to compute prominence and sliding-window maxima in linear time',
    'I can choose between a heap, a hash table, a sorted array and a sketch, and size a sketch from its error bound',
    'I can represent a graph with millions of edges in CSR and compute paths and components on it',
    'I can turn probabilities into edge weights and repair a distance table with shortest paths',
    'I can solve small problems exactly with dynamic programming, including Held-Karp and sequence alignment',
    'I can model a discrete problem as an integer program, read its gap, and certify a heuristic against an exact answer',
    'I can fit a model with analytic gradients, check them numerically, and choose between Newton, L-BFGS and SGD',
  ],
});
