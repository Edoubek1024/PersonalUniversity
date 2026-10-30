import { defineSubject } from '../define';

export default defineSubject({
  id: 'data-structures-algorithms',
  title: 'Data Structures and Algorithms',
  category: 'cs',
  tagline:
    'How to organise data and design procedures whose cost you can predict, prove and measure.',
  description: `Every program is an algorithm operating on data structures. Choosing the right ones is the difference between a query that returns in a millisecond and one that never returns, between a service that scales and one that falls over at ten thousand users. This subject teaches you to reason about that choice *before* you write code, to prove that your reasoning is right, and then to measure whether the machine agrees.

The curriculum follows the arc of MIT 6.006 and 6.046 with Jeff Erickson's free *Algorithms* and Pat Morin's *Open Data Structures* as texts: asymptotic analysis and recurrences first, then the core structures (arrays, lists, trees, heaps, hash tables), the core paradigms (divide and conquer, dynamic programming, greedy) and the graph algorithms that underlie routing, scheduling and dependency resolution. Every lesson has you implement the structure or algorithm, test it against a reference, and benchmark it so that the $O(\\cdot)$ on paper meets the nanoseconds on the chip.

You will leave able to look at a problem, name the structure it needs, bound the cost of a solution, implement it correctly with tests, and explain any gap between predicted and measured performance in terms of constants, caches and input distributions.`,
  difficulty: 'intermediate',
  estimatedHours: 110,
  prerequisites: ['programming-fundamentals', 'discrete-mathematics'],
  recommendedBackground: [
    'Fluent Python (functions, classes, lists, dicts) or an equivalent language',
    'Proof by induction and basic counting from discrete mathematics',
    'Comfort with logarithms and summations',
  ],
  tags: ['algorithms', 'data structures', 'complexity', 'graphs', 'dynamic programming', 'Python'],
  core: true,
  modules: [
    {
      slug: 'analysis-foundations',
      title: 'Analysis Foundations',
      description:
        'Asymptotic notation, recurrences, and the discipline of measuring what you predicted: the tools every later lesson relies on.',
      lessons: [
        {
          slug: 'asymptotic-notation',
          title: 'Asymptotic notation and the cost model',
          summary:
            'Big-O, Theta and Omega as statements about growth, the RAM cost model, and how to count operations in real code.',
          estimatedMinutes: 90,
          objectives: [
            'Define O, Omega and Theta formally and prove simple membership claims from the definitions',
            'State the word-RAM cost model and explain which operations count as constant time',
            'Derive the running time of nested loops and simple recursive functions by counting',
            'Rank the common growth functions and explain why constants and lower-order terms are dropped',
            'Spot hidden costs such as string concatenation, list slicing and len() on a generator',
          ],
          concepts: [
            'Big-O: asymptotic upper bound',
            'Big-Omega and Big-Theta',
            'Word-RAM model: constant-time arithmetic on machine words',
            'Worst, average and best case',
            'Input size n and what it measures',
            'Growth hierarchy: 1, log n, n, n log n, n^2, 2^n, n!',
            'Hidden linear operations in library calls',
          ],
          explanation: `Asymptotic notation lets you talk about an algorithm's cost without talking about a particular computer. We say $f(n) = O(g(n))$ if there exist constants $c > 0$ and $n_0$ such that $f(n) \\le c \\cdot g(n)$ for all $n \\ge n_0$. $\\Omega$ is the mirror-image lower bound and $\\Theta$ means both hold. The notation deliberately throws away constants and lower-order terms because those depend on the compiler, the cache and the language, while the *growth rate* does not: an $n^2$ algorithm will eventually lose to an $n \\log n$ one no matter how clever the constants.

The costs you count come from the **word-RAM model**: reading or writing a memory word, arithmetic on words, and comparisons each cost one unit. This is a model, not the truth: a cache miss is roughly a hundred times slower than a hit, which is why the measurement lesson exists. But it predicts the shape of running time well enough to guide design.

Counting is mechanical once you are honest about what each line does. A loop from 1 to $n$ containing a loop from 1 to $i$ executes $\\sum_{i=1}^{n} i = n(n+1)/2 = \\Theta(n^2)$ inner iterations. A loop that halves $n$ each step runs $\\Theta(\\log n)$ times. The pitfalls are library calls that look atomic but are linear: \`list.insert(0, x)\`, \`s + t\` on strings, \`x in some_list\`, slicing. A loop that builds a string by repeated \`+=\` is quadratic in CPython unless the interpreter happens to optimise it.

Work through Erickson's introduction and the 6.006 first lecture, then do the counting exercises below by hand before confirming with timing. Keep a one-page table of the growth hierarchy with the largest $n$ each class can handle in a second at $10^9$ operations per second; you will consult it for the rest of the subject.`,
          resources: [
            {
              title: 'MIT 6.006 Introduction to Algorithms (Spring 2020) — Lecture 1 and 2',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture 1 (algorithms and computation) and Lecture 2 (data structures) with the lecture notes.',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Algorithms (free textbook): Chapter 0, Introduction',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Chapter 0 for what an algorithm is and how we analyse it. The whole book is a free PDF.',
            },
            {
              title: 'Open Data Structures — Chapter 1, Introduction',
              url: 'https://opendatastructures.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              note: 'Sections 1.3 (mathematical background) and 1.4 (the model of computation).',
            },
            {
              title: 'Introduction to Algorithms (CLRS), 4th edition',
              url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/',
              type: 'textbook',
              cost: 'paid',
              provider: 'MIT Press',
              note: 'Chapters 2-3 if you own it. Not required; Erickson and Open Data Structures cover the same ground for free.',
            },
          ],
          exercises: [
            {
              slug: 'prove-from-definition',
              title: 'Prove bounds from the definition',
              prompt:
                'Using only the definition of O and Omega, prove: (a) $3n^2 + 10n + 7 = O(n^2)$ giving explicit $c$ and $n_0$; (b) $n \\log n = O(n^2)$; (c) $2^{n+1} = O(2^n)$ but $2^{2n} \\ne O(2^n)$; (d) $\\log_2 n = \\Theta(\\log_{10} n)$. For each, state the constants you chose.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'count-the-operations',
              title: 'Count operations in five snippets',
              prompt:
                'For each of five Python snippets you write yourself (a triple nested loop, a loop that halves n, a loop with list.insert(0, x), a loop that builds a string with +=, and a recursive function that calls itself twice on n-1), derive the Theta running time by counting. Then time each for n = 1000, 2000, 4000, 8000 with timeit and check that the ratio between successive runs matches the prediction (2x for linear, 4x for quadratic, and so on). Report a table of predicted vs measured ratios.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The doubling ratio is the cleanest empirical signature of a growth class; a ratio drifting upward with n suggests a hidden extra factor such as log n or cache effects.',
            },
            {
              slug: 'largest-feasible-n',
              title: 'Largest feasible n table',
              prompt:
                'Assuming $10^9$ simple operations per second, compute the largest n solvable in 1 second, 1 minute and 1 day for running times $\\log n$, $n$, $n \\log n$, $n^2$, $n^3$, $2^n$ and $n!$. Then write a short paragraph on which classes are "fast enough" for inputs of size $10^5$ and $10^8$.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Is it correct to say that an O(n^2) algorithm is always slower than an O(n log n) one?',
              answerOutline:
                'No. O gives only an upper bound and hides constants; for small n or a loose bound the quadratic algorithm can be faster. It is only asymptotically (large n) and only for tight bounds that the n log n algorithm must win.',
            },
            {
              question: 'Why is binary search O(log n) and what does the base of the logarithm matter?',
              answerOutline:
                'Each probe halves the remaining range, so after k probes the range is n/2^k; it ends when that is 1, k = log2 n. The base does not matter asymptotically because logs of different bases differ by a constant factor.',
            },
            {
              question: 'Name three Python operations that look constant time but are linear.',
              answerOutline:
                'list.insert(0, x) / list.pop(0), x in list, list slicing a[i:j], string concatenation, min/max/sum over a list, len() on something that must be materialised.',
            },
            {
              question: 'What assumption of the word-RAM model does a real CPU violate most badly?',
              answerOutline:
                'Uniform memory access cost: real memory is a hierarchy of caches, so a random access can be 100x slower than a sequential one.',
            },
          ],
        },
        {
          slug: 'recurrences-and-divide-and-conquer',
          title: 'Recurrences and divide and conquer',
          summary:
            'Writing a recurrence for a recursive algorithm and solving it by recursion trees, substitution and the master theorem.',
          estimatedMinutes: 120,
          objectives: [
            'Write the recurrence that describes a given recursive algorithm',
            'Solve recurrences with recursion trees and verify by substitution (induction)',
            'Apply the master theorem and recognise when it does not apply',
            'Design a divide-and-conquer algorithm and analyse it (merge sort, Karatsuba, closest pair)',
          ],
          concepts: [
            'Recurrence relation T(n) = aT(n/b) + f(n)',
            'Recursion tree: work per level, number of levels',
            'Substitution method (guess and prove by induction)',
            'Master theorem and its three cases',
            'Divide, conquer, combine',
            'Karatsuba multiplication',
            'Base cases and floors/ceilings',
          ],
          explanation: `A recursive algorithm's running time is itself defined recursively: merge sort on $n$ items does two merge sorts on $n/2$ items plus $\\Theta(n)$ work to merge, so $T(n) = 2T(n/2) + \\Theta(n)$. Solving the recurrence means turning that into a closed form, here $\\Theta(n \\log n)$.

The most reliable tool is the **recursion tree**. Draw the root doing $f(n)$ work, its $a$ children each doing $f(n/b)$, and so on down $\\log_b n$ levels. Sum the work per level and add the levels. For merge sort every level does $n$ work and there are $\\log_2 n$ levels, hence $n \\log n$. For $T(n) = 2T(n/2) + n^2$ the levels shrink geometrically ($n^2, n^2/2, n^2/4, \\ldots$) so the root dominates and $T(n) = \\Theta(n^2)$. For $T(n) = 4T(n/2) + n$ the levels grow geometrically and the $n^2$ leaves dominate. These three behaviours (root-heavy, balanced, leaf-heavy) are exactly the three cases of the **master theorem**: compare $f(n)$ with $n^{\\log_b a}$.

Once you have a guess, prove it by **substitution**: assume $T(k) \\le c\\,k \\log k$ for $k < n$ and show it for $n$. Watch for the classic trap where the induction fails by a lower-order term; strengthen the hypothesis (subtract a term) instead of weakening the claim. Floors, ceilings and small base cases never change the asymptotic answer, which is why we write $n/2$ freely.

Divide and conquer earns its keep when the combine step is cheap relative to the subproblems. Karatsuba multiplies two $n$-digit numbers with three half-size multiplications instead of four, giving $T(n) = 3T(n/2) + O(n) = O(n^{\\log_2 3}) \\approx O(n^{1.585})$. Implement it and you will see the crossover with schoolbook multiplication is in the hundreds of digits.

Read Erickson chapter 1 (recursion) and the 6.046 lecture on divide and conquer. If the proof by induction in the recurrences lesson of discrete mathematics is rusty, revisit it: substitution is exactly that proof.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 1: Recursion',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Sections 1.1-1.7: towers of Hanoi, merge sort, quicksort, recursion trees, and Karatsuba.',
              primary: true,
            },
            {
              title: 'MIT 6.046J Design and Analysis of Algorithms (Spring 2015) — Lecture 2, Divide and Conquer',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Convex hull and median finding by divide and conquer; recurrence solving in recitation notes.',
            },
            {
              title: 'Open Data Structures — Chapter 11, Sorting Algorithms (merge sort analysis)',
              url: 'https://opendatastructures.org/ods-python/11_Sorting_Algorithms.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
            },
          ],
          exercises: [
            {
              slug: 'solve-ten-recurrences',
              title: 'Solve ten recurrences three ways',
              prompt:
                'Solve each recurrence with a recursion tree, then check with the master theorem where it applies, then verify one of them by substitution: T(n)=2T(n/2)+n; T(n)=T(n/2)+1; T(n)=2T(n/2)+1; T(n)=4T(n/2)+n; T(n)=4T(n/2)+n^2; T(n)=3T(n/2)+n; T(n)=T(n-1)+n; T(n)=2T(n-1)+1; T(n)=T(n/2)+T(n/4)+n; T(n)=2T(n/2)+n log n. For the last two explain why the master theorem does not apply directly.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'karatsuba',
              title: 'Implement and benchmark Karatsuba',
              prompt:
                'Implement schoolbook and Karatsuba multiplication on lists of base-10 digits (do not use Python big integers for the arithmetic itself). Verify both against int multiplication on 1000 random pairs. Time both for n = 64, 128, ..., 4096 digits, plot on log-log axes, measure the slopes (expect about 2.0 and 1.585), and find the crossover size. Add a cutoff that switches to schoolbook below a threshold and tune it.',
              kind: 'coding',
              difficulty: 3,
              hint: 'On a log-log plot a running time of c n^k is a straight line of slope k; fit the slope using the largest few sizes.',
            },
            {
              slug: 'closest-pair',
              title: 'Closest pair of points in O(n log n)',
              prompt:
                'Implement the divide-and-conquer closest-pair algorithm for 2D points. Test against brute force O(n^2) on 500 random sets of up to 200 points, then time both for n up to 10^5. Explain in a paragraph why the strip step only needs to check 7 neighbours per point.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the master theorem cases in terms of comparing f(n) with n^(log_b a).',
              answerOutline:
                'If f is polynomially smaller, T = Theta(n^(log_b a)) (leaves dominate). If f is Theta(n^(log_b a)), T = Theta(f(n) log n) (balanced). If f is polynomially larger and satisfies the regularity condition, T = Theta(f(n)) (root dominates).',
            },
            {
              question: 'Why does T(n) = 2T(n/2) + n log n not fall under the basic master theorem, and what is its solution?',
              answerOutline:
                'n log n is larger than n^(log_2 2) = n but not polynomially larger (no n^epsilon gap). The recursion tree gives Theta(n log^2 n).',
            },
            {
              question: 'Why does Karatsuba beat schoolbook multiplication asymptotically?',
              answerOutline:
                'It replaces four half-size multiplications with three (using (a+b)(c+d) - ac - bd for the middle term), so the recurrence 3T(n/2) + O(n) gives n^(log2 3) instead of n^2.',
            },
            {
              question: 'In a substitution proof, what do you do when the induction step leaves an extra +1 you cannot absorb?',
              answerOutline:
                'Strengthen the inductive hypothesis by subtracting a lower-order term (e.g. guess T(n) <= cn - d) so the step closes.',
            },
          ],
          relatedLessons: ['discrete-mathematics/recurrences-induction-and-growth/solving-recurrences'],
        },
        {
          slug: 'measuring-and-benchmarking',
          title: 'Measuring: benchmarking, profiling and the memory hierarchy',
          summary:
            'How to time code honestly, why measured constants differ from the RAM model, and how caches, allocation and interpreters bend the curves.',
          estimatedMinutes: 100,
          objectives: [
            'Write a benchmark harness that controls for warm-up, noise and garbage collection',
            'Fit a growth exponent to timing data and compare with the predicted bound',
            'Explain cache effects, branch prediction and allocation cost as sources of constant-factor differences',
            'Profile a program to find where time actually goes',
          ],
          concepts: [
            'timeit and perf_counter_ns',
            'Warm-up, repetitions, median vs mean',
            'Doubling experiment and log-log slope',
            'Cache lines, locality, prefetching',
            'Interpreter overhead vs compiled code',
            'Profiler: cProfile, sampling profilers',
            'Micro-benchmark pitfalls (dead code, constant folding)',
          ],
          explanation: `Analysis predicts the shape of a running-time curve; measurement tells you the constants and whether the shape survived contact with hardware. The two must be done together or you will learn the wrong lessons from either.

A trustworthy benchmark does four things. It **repeats** the measurement many times and reports a robust statistic (the minimum or median, not the mean, because noise only ever adds time). It **warms up** so that caches, JIT compilers and lazy imports are settled. It runs on inputs **large enough** that the fixed overhead of a function call is negligible. And it **varies $n$ geometrically** (doubling) so that the ratio of successive timings exposes the growth class: ratio 2 means linear, 4 means quadratic, just over 2 means $n \\log n$. Plot time against $n$ on log-log axes; the slope is the exponent.

Measured results diverge from the RAM model for well-understood reasons. **Caches**: a sequential pass over an array touches each 64-byte line once, while a linked list or random index pattern misses on nearly every access; the same $O(n)$ loop can differ by 10-50x. **Branch prediction**: sorting data before a branchy loop can double speed. **Allocation**: each node you allocate costs far more than the arithmetic on it. **Interpreters**: in CPython a loop iteration costs around 50-100 ns, so a C-implemented \`sorted()\` or \`dict\` beats a hand-written "better" algorithm until $n$ is large.

Profiling is the complement: instead of timing a function you chose, let the profiler tell you which function matters. \`cProfile\` instruments every call (and distorts tiny functions); sampling profilers such as py-spy are lower overhead and show where wall-clock time goes.

Read the Python timeit documentation and the 6.006 notes on the model of computation, then build the harness in the exercises. You will reuse it in every later module and in the capstone, so make it a small importable module with tests.`,
          resources: [
            {
              title: 'Python documentation: timeit — measure execution time of small code snippets',
              url: 'https://docs.python.org/3/library/timeit.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Python documentation: the Python profilers (cProfile)',
              url: 'https://docs.python.org/3/library/profile.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'pyperf — a toolkit for writing and running reliable benchmarks',
              url: 'https://pyperf.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Victor Stinner',
              note: 'Read the "pyperf user guide" section on system tuning and why it reports the mean and standard deviation of many runs.',
            },
            {
              title: 'py-spy sampling profiler for Python programs',
              url: 'https://github.com/benfred/py-spy',
              type: 'tool',
              cost: 'free',
              provider: 'GitHub',
            },
          ],
          exercises: [
            {
              slug: 'benchmark-harness',
              title: 'Build a reusable benchmark harness',
              prompt:
                'Write a module bench.py with a function bench(fn, make_input, sizes, repeats) that for each n generates a fresh input, times fn with perf_counter_ns over repeats runs, reports the minimum and median, and returns a table. Add a fit_exponent(sizes, times) function that fits a line on log-log axes. Test it on list.sort (expect slope near 1.0-1.1) and on a deliberately quadratic function (slope near 2.0). Include pytest tests that the exponent estimates are within 0.2 of the expected value.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cache-effects',
              title: 'See the memory hierarchy',
              prompt:
                'Sum the elements of a Python array.array (or NumPy array) of 2^24 integers three ways: sequentially, with stride 16, and in a random permutation order. All three are O(n). Time them, report the ratios, and explain them with cache-line size and prefetching. Repeat the sequential and random versions in C or Rust if you can and compare the ratio.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Precompute the random index order so that generating it is not inside the timed region.',
            },
            {
              slug: 'profile-and-fix',
              title: 'Profile, then fix the right thing',
              prompt:
                'Write a program that reads a 50 MB text file, counts word frequencies with a naive approach (string += and a list of (word, count) pairs searched linearly), and prints the top 20. Profile it with cProfile and py-spy, identify the top two hotspots, fix only those, and measure the speed-up. Then describe in 150 words what the profiler told you that intuition would not have.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why report the minimum or median of repeated timings rather than the mean?',
              answerOutline:
                'Noise from other processes, GC and scheduling only adds time, so the distribution is skewed right; the minimum best estimates the intrinsic cost and the median is robust to outliers.',
            },
            {
              question: 'Two O(n) loops over the same data differ by 20x in measured time. Give two plausible causes.',
              answerOutline:
                'Memory access pattern (sequential vs random: cache misses), branch mispredictions, allocation inside the loop, interpreter overhead vs a C-implemented builtin.',
            },
            {
              question: 'How do you turn a table of (n, time) into an estimate of the exponent k in c n^k?',
              answerOutline:
                'Take logs of both; log t = log c + k log n is linear, so fit the slope (least squares or the ratio of successive doublings: k = log2(t(2n)/t(n))).',
            },
          ],
        },
      ],
    },
    {
      slug: 'linear-structures',
      title: 'Linear Structures',
      description:
        'Arrays, dynamic arrays, linked lists, stacks, queues and deques: the building blocks, their invariants and their real costs.',
      lessons: [
        {
          slug: 'arrays-and-dynamic-arrays',
          title: 'Arrays and dynamic arrays',
          summary:
            'Contiguous memory, constant-time indexing, and how geometric resizing makes append amortised O(1).',
          estimatedMinutes: 90,
          objectives: [
            'Explain why array indexing is O(1) in terms of address arithmetic',
            'Implement a dynamic array with geometric growth and prove append is amortised O(1)',
            'Compare growth factors (1.5 vs 2) and show why additive growth is quadratic',
            'Describe how CPython lists and NumPy arrays are laid out in memory',
          ],
          concepts: [
            'Contiguous storage and address = base + i * size',
            'Capacity vs length',
            'Geometric resizing and amortised cost',
            'Insert/delete in the middle: O(n) shifting',
            'Array of pointers (Python list) vs array of values (array.array, NumPy)',
            'Locality and cache friendliness',
          ],
          explanation: `An **array** is a block of contiguous memory holding fixed-size elements, so element $i$ lives at address $\\text{base} + i \\cdot \\text{size}$. That one multiplication and addition is why indexing is $O(1)$ and why arrays are the fastest structure for scanning: consecutive elements share cache lines.

Fixed size is the limitation, and the **dynamic array** (Python \`list\`, Java \`ArrayList\`, C++ \`vector\`) fixes it with a trick you must understand, not just use. Keep a backing array with *capacity* larger than the *length*. Append writes into the spare slot. When full, allocate a new array of double the capacity and copy everything across. A single append can therefore cost $O(n)$, but doubling means that after a copy of $n$ elements you get $n$ free appends before the next copy. Summing over $n$ appends, the total copying is $n + n/2 + n/4 + \\cdots < 2n$, so the **amortised** cost per append is $O(1)$. Growing by a constant amount instead (say 100 slots) makes the copies $n/100$ in number and $O(n)$ each: quadratic total. Growth factor 1.5 wastes less memory and lets freed blocks be reused; CPython uses roughly 1.125 with extra slack, which still works because any factor $> 1$ gives a geometric series.

Insertion or deletion in the middle shifts everything after the position: $O(n)$. That is the trade you make for $O(1)$ indexing; the linked list makes the opposite trade.

Note the difference between an array *of values* and an array *of pointers*. A Python list stores pointers to boxed objects scattered through the heap, so a scan still misses the cache on every element; \`array.array\` and NumPy store raw values contiguously and run 10-100x faster for numeric loops.

Read Open Data Structures chapter 2 and implement \`ArrayStack\`. Then do the resizing experiment; seeing the staircase in the timing plot is worth more than any proof.`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 2, Array-Based Lists',
              url: 'https://opendatastructures.org/ods-python/2_Array_Based_Lists.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              note: 'ArrayStack, ArrayQueue, ArrayDeque, and the amortised analysis of resize in section 2.1.2.',
              primary: true,
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 2: Data Structures (sequence interface, dynamic arrays)',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'CPython source: Objects/listobject.c (list_resize)',
              url: 'https://github.com/python/cpython/blob/main/Objects/listobject.c',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Find list_resize and read the comment explaining the over-allocation pattern.',
            },
          ],
          exercises: [
            {
              slug: 'dynamic-array',
              title: 'Implement a dynamic array from a fixed array',
              prompt:
                'Using ctypes or array.array as a fixed-capacity backing store, implement class DynArray with append, pop, insert(i, x), delete(i), get and set, and __len__. Grow by factor 2 when full and shrink by half when a quarter full. Write pytest tests comparing against a Python list on 10,000 random operations. Count copies performed during 10^6 appends and show the total is below 2 * 10^6.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'growth-factor-experiment',
              title: 'Growth factor experiment',
              prompt:
                'Parameterise your DynArray by growth strategy: multiply by 2, multiply by 1.5, add 64. Time 10^6 appends for each and plot the cumulative time against the number of appends. Explain the staircase shape, the slope for additive growth, and measure peak memory with tracemalloc for each strategy.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'amortised-proof',
              title: 'Amortised cost proof',
              prompt:
                'Prove using the aggregate method that n appends to a doubling array cost O(n) total, then re-prove it with the accounting method by charging 3 units per append (1 to write, 2 saved for future copying). Explain where the saved credits are spent.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is append amortised O(1) but a single append possibly O(n)?',
              answerOutline:
                'Most appends write into spare capacity; occasionally a resize copies all n elements. Because capacity doubles, copies happen only at powers of two and sum to under 2n over n appends.',
            },
            {
              question: 'What goes wrong if the array grows by a constant 100 slots each time?',
              answerOutline:
                'There are n/100 resizes each costing O(n), so n appends cost O(n^2); amortised O(n) per append.',
            },
            {
              question: 'Why is a NumPy sum over 10^7 floats much faster than a sum over a Python list of the same floats?',
              answerOutline:
                'NumPy stores raw contiguous doubles and loops in C; the list holds pointers to boxed float objects scattered in memory, so each element costs a pointer chase, a cache miss and interpreter overhead.',
            },
          ],
        },
        {
          slug: 'linked-lists',
          title: 'Linked lists and pointer-based structures',
          summary:
            'Singly and doubly linked lists, sentinel nodes, the invariants that keep pointer code correct, and when a linked list is actually the right choice.',
          estimatedMinutes: 90,
          objectives: [
            'Implement singly and doubly linked lists with insert, delete, reverse and find',
            'Use sentinel nodes to eliminate special cases',
            'Compare the real costs of linked lists and arrays with measurements',
            'Solve classic pointer problems: cycle detection, k-th from end, merging sorted lists',
          ],
          concepts: [
            'Node = value + reference(s)',
            'Head, tail, sentinel (dummy) nodes',
            'O(1) insert/delete given a node, O(n) to find it',
            'Doubly linked list and backward traversal',
            'Floyd cycle detection (tortoise and hare)',
            'Pointer invariants and loop invariants',
            'Cache behaviour of pointer chasing',
          ],
          explanation: `A **linked list** stores each element in its own node with a reference to the next (and, for a doubly linked list, the previous) node. Insertion or deletion *at a node you already hold* is $O(1)$: rewire two pointers. That is the whole appeal, and it is why linked lists appear inside LRU caches, memory allocators and schedulers, where some other structure (a hash table, a free-list head) hands you the node directly. Finding the $k$-th element, by contrast, is $O(k)$, and the nodes are scattered across the heap so each hop is likely a cache miss. In an interpreted language a plain Python list beats a linked list for nearly every operation at any size you will meet; measure it in the exercises and remember the result.

Correct pointer code is about **invariants**. Write down what must be true of \`head\`, \`tail\` and each node's links before and after every operation, and make each operation restore it. Most bugs come from the empty list, the one-element list, and the first or last node; a **sentinel** node that is always present at the head (and tail) removes those special cases entirely, which is why real implementations such as the Linux kernel's \`list_head\` use them.

Reversing a list in place, merging two sorted lists, and finding the middle with a slow and a fast pointer are the standard drills. **Floyd's cycle detection** moves one pointer one step and another two steps per iteration; if there is a cycle they meet inside it. Prove why: once both are in the cycle their gap shrinks by one each step.

Read Open Data Structures chapter 3, implement \`SLList\` and \`DLList\` with sentinels and tests, then do the timing comparison. The correct lesson is not "linked lists are bad" but "linked lists are for when you hold the node".`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 3, Linked Lists',
              url: 'https://opendatastructures.org/ods-python/3_Linked_Lists.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              note: 'SLList, DLList with a dummy node, and the space-efficient SEList.',
              primary: true,
            },
            {
              title: 'Data Structure Visualization (University of San Francisco)',
              url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
              type: 'interactive',
              cost: 'free',
              provider: 'David Galles',
              note: 'Step through list, stack and queue operations to see pointer updates.',
            },
            {
              title: 'Python documentation: collections.deque',
              url: 'https://docs.python.org/3/library/collections.html#collections.deque',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'deque is a doubly linked list of fixed-size blocks: the compromise real libraries make.',
            },
          ],
          exercises: [
            {
              slug: 'doubly-linked-list',
              title: 'Doubly linked list with sentinel',
              prompt:
                'Implement DLList with a single circular sentinel node: push_front, push_back, insert_before(node, x), remove(node), find(x), reverse() and iteration in both directions. Write a check_invariants() method that walks the list verifying node.next.prev is node, and call it in every test. Test with 10,000 random operations against a reference Python list.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pointer-drills',
              title: 'Classic pointer problems',
              prompt:
                'On a singly linked list implement: reverse in place (iterative and recursive), merge two sorted lists, find the k-th node from the end in one pass, detect a cycle with Floyd and return the node where the cycle begins. Prove the cycle-start claim: after the pointers meet, resetting one to the head and advancing both one step at a time meets at the cycle entry.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'list-vs-array-timing',
              title: 'Linked list vs array, measured',
              prompt:
                'Using your benchmark harness, compare DLList against Python list and collections.deque for: append at end, insert at front, insert in the middle given an index, sequential iteration, and random access by index, for n = 10^3 to 10^6. Present a table and explain each winner in terms of pointer chasing, shifting and interpreter overhead.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When is a linked list genuinely the right structure?',
              answerOutline:
                'When you already hold a reference to the node to be removed or inserted after (LRU cache, intrusive lists in kernels, free lists), need O(1) splicing of whole lists, or need stable node identity.',
            },
            {
              question: 'What does a sentinel node buy you?',
              answerOutline:
                'The list is never empty from the pointer code\'s point of view, so insert/remove at head or tail need no special cases and the invariant node.next.prev == node holds everywhere.',
            },
            {
              question: 'Why does the tortoise-and-hare algorithm terminate if there is a cycle?',
              answerOutline:
                'Once both pointers are in the cycle the fast one closes the gap by exactly one each step, so they meet within one cycle length.',
            },
          ],
        },
        {
          slug: 'stacks-queues-and-deques',
          title: 'Stacks, queues and deques',
          summary:
            'LIFO and FIFO abstract data types, their array and list implementations, and the algorithms that are really a stack or queue in disguise.',
          estimatedMinutes: 80,
          objectives: [
            'Specify stack, queue and deque as abstract data types independent of implementation',
            'Implement a circular-buffer queue and a two-stack queue, and analyse both',
            'Recognise problems solved by a stack (matching, evaluation, DFS) or a queue (BFS, buffering)',
            'Use a monotonic stack to solve next-greater-element type problems in O(n)',
          ],
          concepts: [
            'Abstract data type vs implementation',
            'Stack: push, pop, peek (LIFO)',
            'Queue: enqueue, dequeue (FIFO)',
            'Circular buffer with head and tail indices',
            'Two-stack queue and its amortised cost',
            'Call stack and recursion elimination',
            'Monotonic stack',
          ],
          explanation: `A **stack** and a **queue** are abstract data types: they are defined by what operations do, not by how they are stored. A stack returns the most recently inserted element (push, pop, peek); a queue returns the least recent (enqueue, dequeue). A **deque** allows both ends. Separating the interface from the implementation is the point of this lesson: the same \`Queue\` interface can be a linked list, a circular array or two stacks, and your tests should not care which.

The **circular buffer** is the implementation you will meet in every ring buffer, audio driver and network card: a fixed array with \`head\` and \`tail\` indices that wrap around modulo capacity. Both operations are $O(1)$ with no allocation, which is why it is used where latency matters. Growing it means copying in order, starting from \`head\`.

The **two-stack queue** is a beautiful amortised argument: push onto an inbox stack; to dequeue, if the outbox is empty, pour the whole inbox into it (reversing order) and pop. Each element moves at most twice, so $n$ operations cost $O(n)$ even though one dequeue can cost $O(n)$. This is the same argument as the dynamic array in another costume.

Stacks are everywhere once you know to look: matching brackets, evaluating postfix expressions, the function call stack itself, depth-first search, undo histories. Any recursive algorithm can be rewritten with an explicit stack, which is how you avoid recursion-depth limits. The **monotonic stack** solves "next greater element", stock-span and largest-rectangle-in-histogram problems in linear time by maintaining a stack whose values are sorted; every element is pushed and popped once.

Queues are the natural structure for breadth-first search, producer-consumer buffers and round-robin scheduling. Read Open Data Structures section 2.3 and 2.4 and implement all three queues in the exercise, with one shared test suite.`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 2.3-2.4, ArrayQueue and ArrayDeque',
              url: 'https://opendatastructures.org/ods-python/2_Array_Based_Lists.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition (Sedgewick & Wayne) — 1.3 Bags, Queues and Stacks',
              url: 'https://algs4.cs.princeton.edu/13stacks/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              note: 'The booksite is free (code, exercises); the printed book is paid.',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 2 and Problem Set 1',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'three-queues',
              title: 'Three queues, one test suite',
              prompt:
                'Define a Queue protocol (enqueue, dequeue, peek, __len__) and implement it three ways: a doubly linked list, a resizable circular buffer, and two stacks. Write one parametrised pytest suite that runs the same 10,000 random operations against collections.deque for all three. Benchmark 10^6 enqueue/dequeue pairs and explain the ranking.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'expression-evaluator',
              title: 'Shunting-yard calculator',
              prompt:
                'Implement Dijkstra\'s shunting-yard algorithm to convert infix arithmetic with +, -, *, /, parentheses and unary minus to postfix, then evaluate the postfix with a stack. Test on 30 expressions including precedence and associativity edge cases, comparing against Python eval on safe inputs. Report the running time as a function of expression length.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'monotonic-stack',
              title: 'Monotonic stack problems',
              prompt:
                'Solve next-greater-element, daily-temperatures and largest-rectangle-in-histogram with a monotonic stack. Argue that each is O(n) because each index is pushed and popped at most once. Verify on random arrays of length up to 10^6 against an O(n^2) brute force for small n and time the linear version.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a two-stack queue have an O(n) dequeue yet amortised O(1) operations?',
              answerOutline:
                'Each element is pushed to the inbox once, moved to the outbox once, and popped once; the expensive pour only happens after many cheap pushes paid for it.',
            },
            {
              question: 'How would you convert a recursive depth-first traversal to an iterative one?',
              answerOutline:
                'Use an explicit stack of frames (node plus the state of where you are in its children); push the root, loop popping and pushing children. The explicit stack replaces the call stack.',
            },
            {
              question: 'Why does the circular buffer need to track either a count or leave one slot empty?',
              answerOutline:
                'With only head and tail indices, head == tail is ambiguous between empty and full; a count or the empty-slot convention disambiguates.',
            },
          ],
        },
      ],
      project: {
        slug: 'text-editor-buffer',
        title: 'Module project: a text editor buffer',
        description: `Implement the core data structure of a text editor: a sequence of characters supporting insert and delete at a cursor, cursor movement, and undo. Build it three ways (plain array, gap buffer, and a piece table or rope) behind one interface, and drive all three with a replayed log of 100,000 realistic edit operations (typing, backspacing, jumping to a random position). Compare throughput and memory and write a one-page recommendation.`,
        deliverables: [
          'Three implementations sharing one interface and one test suite',
          'A replay script and a results table (ops/second and peak memory per implementation)',
          'One page explaining the measured differences in terms of shifting, allocation and locality',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add line indexing so "go to line n" is O(log n)', 'Add redo and measure memory for 10,000 undo steps'],
      },
    },
    {
      slug: 'sorting-and-searching',
      title: 'Sorting and Searching',
      description:
        'From insertion sort and binary search to merge sort, quicksort, the comparison lower bound, linear-time sorts and selection.',
      lessons: [
        {
          slug: 'elementary-sorts-and-binary-search',
          title: 'Elementary sorts, invariants and binary search',
          summary:
            'Insertion and selection sort as exercises in loop invariants, and binary search done correctly for once.',
          estimatedMinutes: 90,
          objectives: [
            'State and prove the loop invariant of insertion sort and selection sort',
            'Explain why insertion sort is O(n) on nearly sorted input and why that matters in practice',
            'Implement binary search without off-by-one errors and justify it with an invariant',
            'Use bisect to solve "find the first x such that P(x)" problems on monotone predicates',
          ],
          concepts: [
            'Loop invariant: initialisation, maintenance, termination',
            'Insertion sort: O(n + inversions)',
            'Selection sort: fewest writes',
            'Stability of a sort',
            'In-place vs extra memory',
            'Binary search invariant on a half-open interval [lo, hi)',
            'Binary search on the answer',
          ],
          explanation: `The elementary sorts are worth your time for two reasons: they are the base case inside every fast sort (CPython's Timsort uses binary insertion sort on runs of under 64 elements), and they are the cleanest place to learn **loop invariants**, the technique that makes you certain code is right.

**Insertion sort** maintains the invariant "the prefix \`a[0..i)\` is sorted and contains the original first $i$ elements". Each step inserts \`a[i]\` by shifting larger elements right. Its cost is $n$ plus the number of **inversions** (pairs out of order), so it is $O(n^2)$ in the worst case but $O(n)$ when the input is nearly sorted, which real data often is. **Selection sort** repeatedly finds the minimum of the suffix; it is always $\\Theta(n^2)$ but performs only $n$ swaps, which matters when writes are expensive. Note which sorts are **stable** (equal keys keep their relative order): insertion yes, selection no. Stability is what lets you sort by one key, then another, and get a multi-key sort.

**Binary search** is famously easy to get wrong. Use a half-open interval and state the invariant: "every index below \`lo\` has value $< x$; every index at or above \`hi\` has value $\\ge x$". The loop picks \`mid = lo + (hi - lo) // 2\`, and moves exactly one bound; it terminates when \`lo == hi\`, which is then the first position with value $\\ge x$ (what \`bisect_left\` returns). This formulation handles duplicates, absent keys and empty arrays without special cases. Note the overflow-safe midpoint formula, which matters in C and Java.

The generalisation is **binary search on a monotone predicate**: if $P(x)$ is false up to some point and true after it, binary search finds the boundary in $O(\\log(\\text{range}))$ evaluations. That turns "minimum capacity so that the tasks fit", "largest square root" and many optimisation problems into search problems.

Read Sedgewick's 2.1 and the Python sorting HOWTO on stability, then do the invariant proofs on paper before coding.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 2.1 Elementary Sorts',
              url: 'https://algs4.cs.princeton.edu/21elementary/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              primary: true,
            },
            {
              title: 'Python documentation: bisect — array bisection algorithm',
              url: 'https://docs.python.org/3/library/bisect.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Study the pure-Python source of bisect_left; it is the canonical half-open implementation.',
            },
            {
              title: 'Python Sorting HOWTO (stability, key functions)',
              url: 'https://docs.python.org/3/howto/sorting.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 3: Sorting',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'invariant-proofs',
              title: 'Loop invariant proofs',
              prompt:
                'Write the loop invariant for insertion sort, selection sort and bubble sort, and for each give the three-part proof (initialisation, maintenance, termination). Then show that insertion sort performs exactly n - 1 + I comparisons where I is the number of inversions, and compute the expected number of inversions in a random permutation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'binary-search-variants',
              title: 'Binary search family',
              prompt:
                'Implement lower_bound (first index with a[i] >= x), upper_bound (first index with a[i] > x), count of x, and search on a rotated sorted array. Test each with hypothesis (random sorted lists including duplicates and empties) against a linear scan. Then solve "minimum ship capacity to deliver packages within D days" by binary search on the answer and state the predicate and its monotonicity.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Never write while lo <= hi with a closed interval unless you can state its invariant; the half-open form has fewer ways to be wrong.',
            },
            {
              slug: 'nearly-sorted-timing',
              title: 'Insertion sort on nearly sorted data',
              prompt:
                'Generate arrays of 10^5 elements that are sorted with k random swaps applied, for k = 0, 10, 100, 1000, 10^4. Time insertion sort on each and plot time against k. Compare to list.sort and explain where Timsort gets its advantage on the same inputs.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does stability matter and which elementary sort is stable?',
              answerOutline:
                'Stability preserves the relative order of equal keys, enabling multi-key sorting by successive passes. Insertion sort is stable; selection sort (with swaps) is not.',
            },
            {
              question: 'State the invariant that makes a half-open binary search correct.',
              answerOutline:
                'All indices < lo hold values < x and all indices >= hi hold values >= x; the loop shrinks [lo, hi) by moving one bound per step based on a[mid] and ends with lo == hi as the boundary.',
            },
            {
              question: 'How does "binary search on the answer" work and what property must the problem have?',
              answerOutline:
                'Define a predicate P(v) = "a solution with value v is feasible"; if P is monotone (false then true), binary search over v finds the threshold in logarithmically many feasibility checks.',
            },
          ],
        },
        {
          slug: 'mergesort-and-quicksort',
          title: 'Merge sort and quicksort',
          summary:
            'The two great divide-and-conquer sorts: guaranteed n log n with extra memory versus expected n log n in place, plus what production sorts actually do.',
          estimatedMinutes: 120,
          objectives: [
            'Implement merge sort (top-down and bottom-up) and quicksort (Lomuto and Hoare partition)',
            'Analyse quicksort expected cost with randomised pivots and explain the worst case',
            'Explain three-way partitioning and why it handles many duplicates',
            'Describe Timsort and introsort and why libraries use hybrids',
          ],
          concepts: [
            'Merge step and its linear cost',
            'Bottom-up merge sort',
            'Partition schemes: Lomuto, Hoare',
            'Randomised pivot and expected O(n log n)',
            'Three-way (Dutch national flag) partition',
            'Cutoff to insertion sort',
            'Timsort runs and galloping; introsort depth limit',
          ],
          explanation: `**Merge sort** splits, sorts both halves recursively and merges two sorted sequences in linear time. Its recurrence $T(n) = 2T(n/2) + \\Theta(n)$ gives $\\Theta(n \\log n)$ in every case, it is stable, and it is the natural sort for linked lists and for data on disk. Its cost is the auxiliary $O(n)$ array. The bottom-up form merges runs of length 1, 2, 4, ... with no recursion at all.

**Quicksort** does the work before recursing: pick a pivot, **partition** so that smaller elements are left of it and larger right, and recurse on both sides. It sorts in place with tiny constants, which is why it is the default in most libraries. The price is that cost depends on pivot quality. A pivot that always lands at an end gives $T(n) = T(n-1) + n = \\Theta(n^2)$; this happens on sorted input with a first-element pivot, so **choose the pivot randomly**. The expected number of comparisons is then about $2n \\ln n \\approx 1.39\\, n \\log_2 n$; the proof sums, over all pairs, the probability they are compared, which is $2/(j - i + 1)$ for the $i$-th and $j$-th smallest. Know the two partition schemes: Lomuto (simple, one pointer) and Hoare (two pointers, fewer swaps). With many equal keys both degrade; **three-way partitioning** (less, equal, greater) fixes it and makes quicksort linear when there are few distinct keys.

Production sorts are hybrids. CPython's **Timsort** is a merge sort that detects existing sorted runs, extends short runs with binary insertion sort, and merges with galloping, so it is $O(n)$ on sorted or reverse-sorted data and $O(n \\log n)$ otherwise. C++'s **introsort** is quicksort that switches to heapsort if the recursion gets too deep and to insertion sort for small ranges. Read \`listsort.txt\` from the CPython repo: it is one of the best engineering documents in any codebase.

Work through Erickson 1.4-1.5 and Sedgewick 2.2-2.3, then implement, test and benchmark all variants in the exercises.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 2.2 Mergesort and 2.3 Quicksort',
              url: 'https://algs4.cs.princeton.edu/23quicksort/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              note: 'Includes three-way partitioning and the analysis of expected comparisons.',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Algorithms, Chapter 1 (merge sort and quicksort sections)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
            },
            {
              title: 'CPython Objects/listsort.txt — Tim Peters on Timsort',
              url: 'https://github.com/python/cpython/blob/main/Objects/listsort.txt',
              type: 'article',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Read it in full once; it explains runs, minrun, galloping and the benchmarks that justified them.',
            },
            {
              title: 'MIT 6.046J — Lecture on randomised algorithms (quicksort analysis)',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'sort-suite',
              title: 'A tested sorting suite',
              prompt:
                'Implement top-down merge sort, bottom-up merge sort, quicksort with Lomuto partition, quicksort with Hoare partition and random pivot, and three-way quicksort. Test all with hypothesis against sorted() on random lists, including lists with only 3 distinct values and lists of length 0 and 1. Add a stability test that sorts (key, index) pairs by key only.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'quicksort-benchmarks',
              title: 'Benchmark the sorts on five input distributions',
              prompt:
                'Benchmark each sort for n = 2^10 ... 2^20 on: random, sorted, reverse sorted, few distinct keys (5 values), and organ-pipe (ascending then descending). Produce one plot per distribution. Demonstrate the quadratic blow-up of first-element-pivot quicksort on sorted input and the three-way partition win on few distinct keys. Add an insertion-sort cutoff and find the best cutoff experimentally.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'expected-comparisons',
              title: 'Expected comparisons of randomised quicksort',
              prompt:
                'Prove that randomised quicksort makes 2(n+1)H_n - 4n comparisons in expectation, where H_n is the n-th harmonic number, using indicator variables for each pair of elements. Then instrument your implementation to count comparisons and confirm the formula for n = 10^3, 10^4, 10^5 averaged over 20 runs.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does quicksort usually beat merge sort in practice despite the same n log n?',
              answerOutline:
                'It sorts in place with sequential access, no auxiliary array, fewer data moves, and a tight inner loop; merge sort pays for allocation and copying.',
            },
            {
              question: 'What input defeats quicksort with a deterministic first-element pivot and how is it fixed?',
              answerOutline:
                'Already sorted (or reverse sorted) input: every partition is 0 vs n-1, giving O(n^2). Fix with random pivot or median-of-three; introsort adds a depth limit fallback to heapsort.',
            },
            {
              question: 'What makes Timsort linear on already-sorted input?',
              answerOutline:
                'It scans for existing monotone runs; a sorted array is one run and needs no merging.',
            },
            {
              question: 'Why is merge sort the natural choice for sorting a linked list or data on disk?',
              answerOutline:
                'Merging needs only sequential access and no random indexing; for lists it needs no extra array, and for disk it reads and writes in streams.',
            },
          ],
        },
        {
          slug: 'lower-bounds-and-linear-time-sorts',
          title: 'The comparison lower bound and linear-time sorting',
          summary:
            'Why no comparison sort can beat n log n, and how counting sort, radix sort and bucket sort sidestep the bound by not comparing.',
          estimatedMinutes: 90,
          objectives: [
            'Prove the Omega(n log n) lower bound for comparison sorting with a decision tree',
            'Implement counting sort and LSD radix sort and state exactly when they apply',
            'Explain why radix sort is stable-sort-dependent and how to choose the digit size',
            'Decide, for a given key type and n, whether a non-comparison sort will actually be faster',
          ],
          concepts: [
            'Decision tree model',
            'n! leaves imply height >= log2(n!) = Theta(n log n)',
            'Counting sort: O(n + k)',
            'LSD and MSD radix sort',
            'Bucket sort and the uniform-input assumption',
            'Word size and digit size trade-off',
            'Stability as a correctness requirement',
          ],
          explanation: `Every sorting algorithm you have seen so far learns about the input only by comparing two elements. Model such an algorithm as a **decision tree**: each internal node is a comparison, each leaf is a final permutation. To be correct on every input, the tree needs at least $n!$ leaves, one per possible ordering. A binary tree with $n!$ leaves has height at least $\\log_2 n!$, and by Stirling's approximation $\\log_2 n! = \\Theta(n \\log n)$. So any comparison sort makes $\\Omega(n \\log n)$ comparisons in the worst case. Merge sort and heapsort are therefore optimal, up to constants, *in this model*.

The escape is to stop comparing. **Counting sort** assumes keys are integers in $[0, k)$: count how many of each key there are, prefix-sum the counts to get each key's starting position, and place each element directly. That costs $O(n + k)$ and is stable if you place elements in input order. For $k$ much larger than $n$ it is useless, which is where **radix sort** comes in: sort by the least significant digit with a stable counting sort, then the next digit, and so on. After $d$ passes the array is sorted, in $O(d(n + b))$ time for base $b$. For 32-bit integers with 8-bit digits that is four passes over the data, often faster than quicksort for $n$ beyond about $10^5$, and it is the algorithm behind sorting on GPUs. Stability of each pass is not optional: it is what makes earlier digits break ties correctly.

**Bucket sort** distributes keys assumed uniform over $[0, 1)$ into $n$ buckets and insertion-sorts each; expected $O(n)$, but a skewed distribution puts everything into one bucket and degrades to quadratic.

The practical question is not "which is asymptotically faster" but "does my key type and size justify it". Strings, floats and objects with comparators are comparison territory; dense integer keys, fixed-width records and suffix array construction are radix territory. Read Sedgewick 5.1 (string sorts) and the Erickson lower-bound section, then run the crossover experiment.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 5.1 String Sorts (LSD and MSD radix sort)',
              url: 'https://algs4.cs.princeton.edu/51radix/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              primary: true,
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 5: Linear Sorting',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Comparison lower bound, counting sort, radix sort.',
            },
            {
              title: 'Open Data Structures — Chapter 11.2, Counting Sort and Radix Sort',
              url: 'https://opendatastructures.org/ods-python/11_Sorting_Algorithms.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
            },
          ],
          exercises: [
            {
              slug: 'decision-tree-bound',
              title: 'Lower bound proofs',
              prompt:
                'Write out the decision-tree proof that comparison sorting needs ceil(log2 n!) comparisons, and show log2 n! >= (n/2) log2 (n/2). Then draw the full decision tree for n = 3 and verify that its height, 3, equals ceil(log2 6). Finally, prove that finding the maximum of n elements requires n - 1 comparisons (an adversary argument).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'radix-sort',
              title: 'LSD radix sort on 32-bit integers',
              prompt:
                'Implement counting sort (stable) and LSD radix sort on 32-bit non-negative integers using 8-bit, 11-bit and 16-bit digits. Test against sorted() on 10^6 random values and on values with many duplicates. Benchmark against list.sort and your quicksort for n = 10^4 ... 10^7 and report the crossover points for each digit size. Explain the trade-off between number of passes and counting-array size using cache sizes.',
              kind: 'coding',
              difficulty: 2,
              hint: 'In pure Python the interpreter overhead will dominate; use array.array or NumPy for the buffers, or implement in C/Rust, to see the real crossover.',
            },
            {
              slug: 'stability-matters',
              title: 'Break radix sort by breaking stability',
              prompt:
                'Replace the stable counting sort inside your LSD radix sort with an unstable placement (iterate the input backwards when placing). Find the smallest input on which the result is wrong, explain exactly which tie was broken, and write a test that would have caught it.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the decision-tree argument not apply to counting sort?',
              answerOutline:
                'Counting sort does not compare elements; it uses the key values directly as array indices, so its behaviour is not a path in a comparison tree.',
            },
            {
              question: 'Why must each pass of LSD radix sort be stable?',
              answerOutline:
                'After sorting on digit i, elements with equal digit i must stay in the order established by less significant digits; an unstable pass would scramble those earlier orderings.',
            },
            {
              question: 'When would you not use radix sort on integers even though it is O(n)?',
              answerOutline:
                'When n is small (comparison sorts have smaller constants), keys are very wide relative to n (many passes), memory for counting arrays and the output buffer is tight, or the data are not plain fixed-width keys.',
            },
          ],
        },
        {
          slug: 'selection-and-order-statistics',
          title: 'Selection and order statistics',
          summary:
            'Finding the k-th smallest element in expected and worst-case linear time, and using it for medians, percentiles and pivots.',
          estimatedMinutes: 80,
          objectives: [
            'Implement quickselect and analyse its expected linear cost',
            'Explain the median-of-medians algorithm and why the groups of five give a linear recurrence',
            'Use selection to compute percentiles on large data without a full sort',
            'Compare quickselect, heap-based top-k and sorting for the top-k problem',
          ],
          concepts: [
            'Order statistic: k-th smallest',
            'Quickselect: partition and recurse on one side',
            'Expected O(n) via geometric shrinking',
            'Median of medians (BFPRT) and the recurrence T(n) = T(n/5) + T(7n/10) + O(n)',
            'Top-k with a heap: O(n log k)',
            'Introselect',
          ],
          explanation: `Sorting to find a median is wasteful: you only need one element, not all of them in order. **Quickselect** reuses quicksort's partition but recurses into just the side that contains the $k$-th element. With a random pivot the expected remaining size after a partition is at most $3n/4$, so the expected total work is a geometric series $n + 3n/4 + 9n/16 + \\cdots = O(n)$. The worst case is still $O(n^2)$, for the same bad-pivot reason as quicksort.

The **median of medians** algorithm (Blum, Floyd, Pratt, Rivest, Tarjan, 1973) guarantees linear time by choosing the pivot carefully: split into groups of five, find each group's median by brute force, recursively find the median of those $n/5$ medians, and use it as the pivot. That pivot is guaranteed to be larger than at least $3n/10$ elements and smaller than at least $3n/10$, so the recursion is on at most $7n/10$. The recurrence $T(n) = T(n/5) + T(7n/10) + O(n)$ solves to $O(n)$ because $1/5 + 7/10 < 1$: the work shrinks geometrically. Groups of three do not work ($1/3 + 2/3 = 1$), which is a lovely exercise. In practice the constant is large; libraries use **introselect** (quickselect with a fallback to median of medians if too many bad partitions happen), exactly as introsort does.

For **top-k** on a stream, where you cannot hold all $n$ elements, keep a min-heap of size $k$: $O(n \\log k)$ time and $O(k)$ memory. On data you can hold, quickselect to find the $k$-th largest and then partition is $O(n)$ and usually faster. Full sorting at $O(n \\log n)$ is right only when you also need the order.

Read Erickson section 1.8 and the 6.046 lecture on median finding; then implement both selections and measure the constant factors, which is the whole point of knowing both.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 1.8: Linear-time selection',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/01-recursion.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture 2: Divide and Conquer (median finding)',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Python documentation: heapq.nlargest and nsmallest',
              url: 'https://docs.python.org/3/library/heapq.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'The implementation notes describe when it switches to sorting.',
            },
          ],
          exercises: [
            {
              slug: 'quickselect-and-bfprt',
              title: 'Quickselect and median of medians',
              prompt:
                'Implement randomised quickselect and median-of-medians selection. Test with hypothesis against sorted(a)[k] for random lists including duplicates. Count comparisons for n = 10^4, 10^5, 10^6 and report the ratio comparisons/n for each; expect roughly 3-4 for quickselect and much more for BFPRT. Then benchmark both against sorted() and heapq.nsmallest for k = 10 and k = n/2.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'groups-of-three',
              title: 'Why groups of five?',
              prompt:
                'Derive the recurrence for median of medians with groups of 3, 5 and 7. Show that groups of 3 gives T(n) = T(n/3) + T(2n/3) + O(n) = O(n log n), while 5 and 7 give O(n). Explain geometrically where the guaranteed 3n/10 fraction comes from for groups of 5.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'streaming-percentiles',
              title: 'Percentiles of a large file',
              prompt:
                'Generate a file of 10^7 floats. Compute the 50th, 95th and 99th percentiles three ways: full sort, quickselect, and a size-k heap for the top 1 percent. Measure wall time and peak memory for each (tracemalloc or /usr/bin/time) and write a short recommendation for which to use in a monitoring system that must compute p99 latency every minute.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is quickselect expected O(n) when quicksort is expected O(n log n)?',
              answerOutline:
                'Quickselect recurses on only one side, so the work per level shrinks geometrically (n, 3n/4, ...) and sums to O(n); quicksort recurses on both sides and does n work per level for log n levels.',
            },
            {
              question: 'What does the median-of-medians pivot guarantee?',
              answerOutline:
                'At least about 3n/10 elements are smaller and 3n/10 larger, so the recursive call is on at most 7n/10 elements, giving a geometrically shrinking recurrence.',
            },
            {
              question: 'For top-10 of a 10^9-element stream that does not fit in memory, which method and why?',
              answerOutline:
                'A min-heap of size 10: O(n log 10) time, O(10) memory, single pass; quickselect needs all data in memory.',
            },
          ],
        },
      ],
      project: {
        slug: 'sort-shootout',
        title: 'Module project: sorting shootout',
        description: `Produce a reproducible comparison of eight sorting algorithms (insertion, selection, merge top-down, merge bottom-up, quicksort random pivot, three-way quicksort, heapsort, LSD radix) on six input distributions across five orders of magnitude of n. Automate the whole thing: one script generates the data, runs the benchmarks with your harness, fits exponents, and renders the plots and a Markdown table. Write a two-page interpretation that a colleague choosing a sort for a specific workload could act on.`,
        deliverables: [
          'A single command that regenerates all plots and tables',
          'Fitted exponents for each (algorithm, distribution) pair with the theoretical prediction alongside',
          'A two-page write-up with explicit recommendations per workload',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add Timsort-style run detection to your merge sort and show the gain on partially sorted data'],
      },
    },
    {
      slug: 'trees-and-heaps',
      title: 'Trees and Heaps',
      description:
        'Binary search trees, the balancing schemes that keep them logarithmic, binary heaps, and B-trees for data that lives on disk.',
      lessons: [
        {
          slug: 'binary-search-trees',
          title: 'Binary search trees',
          summary:
            'The BST invariant, search/insert/delete, traversals, and why an unbalanced tree degenerates to a linked list.',
          estimatedMinutes: 90,
          objectives: [
            'State the BST invariant and implement search, insert, delete, min, max, successor and predecessor',
            'Implement in-order, pre-order, post-order and level-order traversals iteratively and recursively',
            'Explain why random insertion gives expected O(log n) height but sorted insertion gives O(n)',
            'Augment a BST with subtree sizes to support rank and select',
          ],
          concepts: [
            'BST invariant: left < node < right',
            'Height and its effect on every operation',
            'Delete with two children: replace with successor',
            'In-order traversal yields sorted order',
            'Expected height of a random BST is O(log n)',
            'Augmentation: subtree size for rank/select',
            'Ordered-map ADT: floor, ceiling, range queries',
          ],
          explanation: `A **binary search tree** stores keys so that for every node, all keys in its left subtree are smaller and all keys in its right subtree are larger. Search follows one path from the root, comparing at each node, so it costs $O(h)$ where $h$ is the height. So does insert (search, then attach a leaf) and delete. The structure's whole value is that it supports the **ordered map** operations a hash table cannot: minimum, maximum, successor, predecessor, floor, ceiling and range queries, all in $O(h)$, and an in-order traversal yields the keys in sorted order in $O(n)$.

Delete is the operation people get wrong. A leaf is simply removed. A node with one child is replaced by that child. A node with two children is replaced by its **in-order successor** (the minimum of the right subtree), which has at most one child and can be removed by the easy cases. Write the invariant check and run it after every operation in tests.

Everything hinges on $h$. If keys arrive in random order the expected height is $O(\\log n)$ (about $2 \\ln n$, by the same analysis as quicksort, since the root is a random pivot). If keys arrive sorted, each new key becomes the rightmost leaf and the tree is a linked list: $h = n$ and every operation is linear. That is why the next lesson exists. Measure it: insert $10^5$ sorted keys and watch the tree take seconds where a random order takes milliseconds.

**Augmentation** is how BSTs become more than maps. Store in each node the size of its subtree, maintain it on insert and delete, and you can answer "what is the rank of key $x$" and "which key has rank $k$" in $O(h)$. The same idea with interval endpoints gives interval trees, with sums gives order-statistic range sums.

Read Open Data Structures chapter 6 and Sedgewick 3.2, then build the tree with the invariant checker and the traversal suite.`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 6, Binary Trees',
              url: 'https://opendatastructures.org/ods-python/6_Binary_Trees.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition — 3.2 Binary Search Trees',
              url: 'https://algs4.cs.princeton.edu/32bst/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              note: 'Includes rank, select, floor, ceiling and the analysis of random BSTs.',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 6: Binary Trees, Part 1',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'bst-with-invariant-checker',
              title: 'BST with an invariant checker',
              prompt:
                'Implement a BST map with insert, get, delete, min, max, floor, ceiling, successor, rank and select (using subtree sizes), plus all four traversals (in/pre/post-order iterative with an explicit stack, level-order with a queue). Write check() that verifies the ordering invariant with min/max bounds passed down and verifies every size field. Run 10,000 random operations against a sorted-list reference, calling check() after each.',
              kind: 'coding',
              difficulty: 2,
              hint: 'A common wrong invariant check compares each node only with its immediate children; pass (lo, hi) bounds down the recursion instead.',
            },
            {
              slug: 'height-experiment',
              title: 'Height of random vs sorted insertion',
              prompt:
                'Insert n = 2^10 ... 2^17 keys in random order and in sorted order, recording the final height and the total time. Plot height against n for both; fit the random-case heights to c * ln n and report c (expect roughly 2-3). Explain the sorted case in terms of the recurrence for a degenerate tree.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'range-query',
              title: 'Range counting and iteration',
              prompt:
                'Add range(lo, hi) returning the keys in [lo, hi] in order, and count_range(lo, hi) using rank. Show count_range is O(h) and range is O(h + k) for k results. Test with hypothesis against a sorted list and bisect.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a hash table not replace a BST for every use?',
              answerOutline:
                'Hash tables give no ordering: no min/max, successor, floor/ceiling or range queries, and no sorted iteration. BSTs support all of these in O(h).',
            },
            {
              question: 'How do you delete a node with two children?',
              answerOutline:
                'Find the in-order successor (min of right subtree), copy its key into the node, then delete the successor, which has no left child.',
            },
            {
              question: 'What is the expected height of a BST built from n random keys, and why?',
              answerOutline:
                'O(log n), about 2 ln n: the root is a random element splitting the rest like a random quicksort pivot, so the same recurrence applies.',
            },
          ],
        },
        {
          slug: 'balanced-trees',
          title: 'Balanced search trees: AVL, red-black and friends',
          summary:
            'Rotations, the AVL and red-black balance rules, how they guarantee logarithmic height, and what real libraries pick.',
          estimatedMinutes: 120,
          objectives: [
            'Perform left and right rotations and show they preserve the BST invariant',
            'Implement AVL insertion (and deletion) with rebalancing and prove the height bound',
            'Explain the red-black invariants and the equivalence with 2-3 trees (left-leaning red-black trees)',
            'Compare AVL, red-black, treaps and skip lists on cost, simplicity and use in real systems',
          ],
          concepts: [
            'Rotation: O(1) local restructuring',
            'AVL balance factor and the four cases (LL, RR, LR, RL)',
            'AVL height bound via Fibonacci numbers',
            '2-3 trees and red-black trees',
            'Left-leaning red-black tree',
            'Treap: BST by key, heap by random priority',
            'Skip list as a randomised alternative',
          ],
          explanation: `A balanced tree keeps $h = O(\\log n)$ no matter the insertion order, by doing a little local repair after each update. The repair primitive is the **rotation**: pivot a parent and child so the child moves up, preserving in-order sequence and therefore the BST invariant, in $O(1)$ pointer changes.

**AVL trees** (1962) store in each node the heights of its subtrees and insist they differ by at most 1. After an insertion, walk back up updating heights; the first node whose balance factor reaches $\\pm 2$ is fixed with one rotation (LL or RR case) or two (LR or RL). The height bound comes from a counting argument: the minimum number of nodes in an AVL tree of height $h$ satisfies $N(h) = N(h-1) + N(h-2) + 1$, which is Fibonacci-like, so $n \\ge \\phi^h$ and $h \\le 1.44 \\log_2 n$. Deletion is similar but may need rotations all the way up.

**Red-black trees** colour each node and enforce: the root is black, no red node has a red child, and every root-to-leaf path has the same number of black nodes. Those rules bound the height by $2 \\log_2(n+1)$. They are easiest to understand as a binary encoding of a **2-3 tree** (a red link glues two binary nodes into one 3-node), which is exactly Sedgewick's **left-leaning red-black tree**, where insertion needs only three local fixes. Red-black trees do fewer rotations on update than AVL and are the choice of C++ \`std::map\`, Java \`TreeMap\` and the Linux scheduler; AVL is slightly faster for lookup-heavy workloads.

Two randomised alternatives are worth knowing because they are so much simpler to implement correctly: a **treap** assigns each key a random priority and keeps the tree a heap on priorities, which makes it a random BST regardless of insertion order; a **skip list** is a linked list with randomised express lanes and the same expected bounds. Redis and LevelDB use skip lists for their sorted structures.

Read Sedgewick 3.3 for LLRB and Open Data Structures chapters 7 and 9, then implement AVL with the invariant checker from the previous lesson extended with balance checks.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 3.3 Balanced Search Trees (2-3 trees, left-leaning red-black BSTs)',
              url: 'https://algs4.cs.princeton.edu/33balanced/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              primary: true,
            },
            {
              title: 'Open Data Structures — Chapter 7 (Random Binary Search Trees / treaps) and Chapter 9 (Red-Black Trees)',
              url: 'https://opendatastructures.org/ods-python/9_Red_Black_Trees.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 7: Binary Trees, Part 2 (AVL)',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Data Structure Visualization — AVL and red-black trees',
              url: 'https://www.cs.usfca.edu/~galles/visualization/Algorithms.html',
              type: 'interactive',
              cost: 'free',
              provider: 'David Galles',
              note: 'Insert sorted keys and watch the rotations happen.',
            },
          ],
          exercises: [
            {
              slug: 'avl-tree',
              title: 'AVL tree with insert and delete',
              prompt:
                'Extend your BST into an AVL tree: store heights, implement rotate_left/rotate_right, and rebalance on insert and delete. Extend check() to verify every balance factor is in {-1, 0, 1} and every stored height is correct. Run 10^5 random insert/delete operations with check() every 100 operations. Then insert 10^6 sorted keys and verify height <= 1.44 log2(n) + 2.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'avl-height-proof',
              title: 'Prove the AVL height bound',
              prompt:
                'Let N(h) be the minimum number of nodes in an AVL tree of height h. Derive N(h) = N(h-1) + N(h-2) + 1, relate it to Fibonacci numbers, and conclude h < 1.4405 log2(n + 2). Then show that a red-black tree has height at most 2 log2(n + 1) using the black-height.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'treap-vs-avl',
              title: 'Treap, and a measured comparison',
              prompt:
                'Implement a treap (split/merge style or rotation style). Benchmark AVL, treap, your unbalanced BST and Python dict for 10^6 random inserts followed by 10^6 lookups, and for sorted inserts. Report time, height, and rotations performed. Explain why dict wins on lookups and what the trees give you that it cannot.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a rotation preserve the BST invariant?',
              answerOutline:
                'It reorders parent/child locally but keeps the in-order sequence of keys identical; the middle subtree (child\'s inner subtree) moves to the other side while staying between the two keys.',
            },
            {
              question: 'What are the three red-black invariants and what height do they imply?',
              answerOutline:
                'Root black; no red-red parent-child; equal black count on all root-to-null paths. The shortest path is all black and the longest alternates, so height <= 2 * black-height <= 2 log2(n+1).',
            },
            {
              question: 'When would you pick a treap or skip list over AVL/red-black in a real system?',
              answerOutline:
                'When implementation simplicity and low bug risk matter more than worst-case guarantees, when you need cheap split/merge (treaps), or lock-free/concurrent variants (skip lists).',
            },
          ],
        },
        {
          slug: 'heaps-and-priority-queues',
          title: 'Binary heaps and priority queues',
          summary:
            'The implicit array tree, sift-up and sift-down, O(n) heap construction, heapsort, and the priority queue ADT behind schedulers and Dijkstra.',
          estimatedMinutes: 90,
          objectives: [
            'Implement a binary min-heap in an array with insert, extract-min, decrease-key and build-heap',
            'Prove that build-heap is O(n) despite n sift-down calls',
            'Implement heapsort and explain its in-place O(n log n) guarantee and poor cache behaviour',
            'Use a priority queue for k-way merging, event simulation and top-k',
          ],
          concepts: [
            'Heap-order invariant (parent <= children)',
            'Implicit tree: children of i at 2i+1 and 2i+2',
            'Sift-up (insert) and sift-down (extract) in O(log n)',
            'Build-heap in O(n) via the sum of heights',
            'Heapsort',
            'Decrease-key and index maps',
            'd-ary heaps and cache behaviour',
          ],
          explanation: `A **priority queue** supports insert and extract-min (or max). A sorted array makes extract $O(1)$ but insert $O(n)$; an unsorted array the reverse. The **binary heap** makes both $O(\\log n)$ by relaxing full ordering to a single invariant: every parent is no larger than its children. That makes the minimum the root, and nothing else is promised.

The heap is a complete binary tree stored **implicitly** in an array: the children of index $i$ are $2i+1$ and $2i+2$ and the parent is $(i-1)/2$. No pointers, perfect locality for small heaps, and the "tree" shape is enforced by the array being filled left to right. Insert appends at the end and **sifts up** while smaller than its parent. Extract-min swaps the last element into the root and **sifts down**, choosing the smaller child each time. Each walk is the height, $\\lfloor \\log_2 n \\rfloor$.

**Build-heap** from an unordered array of $n$ items is $O(n)$, not $O(n \\log n)$, which surprises everyone the first time: sift down every node from the last internal node to the root. Most nodes are near the bottom and sift only a little; the sum $\\sum_h n/2^{h+1} \\cdot O(h) = O(n)$. **Heapsort** builds a max-heap then repeatedly swaps the root to the end and sifts down: in place, worst-case $O(n \\log n)$, no recursion, but each sift-down jumps around memory, so it loses to quicksort by a factor of two or three in practice. It is the safety net inside introsort.

Priority queues are everywhere: Dijkstra and Prim (with **decrease-key**, which requires an index map from item to heap position), discrete event simulation (next event time), operating-system schedulers (earliest deadline), $k$-way merging of sorted streams, and Huffman coding. Python's \`heapq\` has no decrease-key; the standard workaround is lazy deletion: push a new entry and skip stale ones on pop.

Read Sedgewick 2.4 and the heapq documentation (its implementation notes are a small essay), then build the heap with decrease-key and the $O(n)$ build-heap experiment.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 2.4 Priority Queues',
              url: 'https://algs4.cs.princeton.edu/24pq/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              primary: true,
            },
            {
              title: 'Python documentation: heapq — heap queue algorithm',
              url: 'https://docs.python.org/3/library/heapq.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Read the "Theory" and "Priority Queue Implementation Notes" sections, including lazy deletion.',
            },
            {
              title: 'Open Data Structures — Chapter 10, Heaps',
              url: 'https://opendatastructures.org/ods-python/10_Heaps.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              note: 'Binary heaps and meldable (randomised) heaps.',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 8: Binary Heaps',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'indexed-heap',
              title: 'Indexed binary heap with decrease-key',
              prompt:
                'Implement IndexedMinHeap supporting push(item, key), pop() -> (item, key), decrease_key(item, new_key), contains(item) and build(pairs) in O(n). Maintain a dict from item to position. Write check() verifying the heap-order invariant and the index map. Test with 10^5 random operations against a reference using sorted lists, and confirm build is linear by timing it for n up to 10^7 and fitting the exponent.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'build-heap-proof',
              title: 'Build-heap is linear',
              prompt:
                'Prove that bottom-up build-heap does O(n) work by bounding the sum over levels of (number of nodes at height h) * h. Evaluate the sum exactly for n = 2^k - 1 and show it is below 2n. Then count sift-down swaps in your implementation for n = 2^10 ... 2^20 and compare with the bound.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'event-simulation',
              title: 'Discrete event simulation',
              prompt:
                'Simulate a bank with 3 tellers and Poisson arrivals (mean 1/minute) with exponential service times (mean 2.5 minutes) using a priority queue of events keyed by time. Run for 10^6 simulated minutes and report mean wait time and queue length. Compare with the M/M/3 queueing formula. Report the simulation throughput (events/second) with your heap versus heapq.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is build-heap O(n) when each sift-down can cost O(log n)?',
              answerOutline:
                'Half the nodes are leaves (cost 0), a quarter sift at most 1 level, an eighth at most 2, ...; the weighted sum n * sum(h / 2^(h+1)) converges to O(n).',
            },
            {
              question: 'How do you implement decrease-key when the heap stores items by array position?',
              answerOutline:
                'Keep a map from item to its current index, update it on every swap, and after lowering the key sift the item up from its position.',
            },
            {
              question: 'Why does heapsort tend to lose to quicksort despite the better worst case?',
              answerOutline:
                'Sift-down accesses indices 2i and 2i+1, jumping across the array with poor cache locality, and it does more data movement per element; quicksort scans sequentially.',
            },
          ],
        },
        {
          slug: 'b-trees-and-external-memory',
          title: 'B-trees and external memory',
          summary:
            'When data lives on disk, the cost model changes: B-trees and B+ trees minimise block transfers and underlie every database index and file system.',
          estimatedMinutes: 90,
          objectives: [
            'State the external-memory (I/O) model and explain why block transfers, not comparisons, are the cost',
            'Describe the B-tree invariants, search, insertion with splits and deletion with merges',
            'Explain the B+ tree variant with linked leaves and why databases use it',
            'Estimate the height of a B-tree for realistic fan-out and data sizes',
          ],
          concepts: [
            'I/O model: block size B, memory M, cost in block transfers',
            'B-tree of order t: between t-1 and 2t-1 keys per node',
            'Height O(log_t n)',
            'Node split on insert, merge or borrow on delete',
            'B+ tree: keys in leaves, leaves linked for range scans',
            'Cache-oblivious structures (introduction)',
            'Write amplification and LSM trees as an alternative',
          ],
          explanation: `Once data is larger than memory the RAM model is wrong by orders of magnitude: a disk read costs milliseconds (or tens of microseconds on an SSD) and moves a whole block of 4-64 KB, while a comparison costs a nanosecond. The **external-memory model** therefore counts **block transfers**. A balanced binary tree with $h = \\log_2 n \\approx 27$ for a billion keys costs 27 random reads per lookup. A **B-tree** fixes this by making each node a whole block: with 500 keys per node the height is $\\log_{500} 10^9 \\approx 3$-4, and the top levels stay cached, so a lookup costs one or two disk reads.

A B-tree of minimum degree $t$ keeps every node (except the root) with between $t - 1$ and $2t - 1$ keys and all leaves at the same depth. Search is a multi-way version of BST search, with a binary search inside each node. **Insertion** descends to a leaf; if a node on the way is full it is **split** around its median key, pushing that key up to the parent (splitting on the way down keeps the recursion simple). **Deletion** borrows a key from a sibling or **merges** two underfull siblings, the mirror image. Every operation touches $O(\\log_t n)$ nodes.

The **B+ tree** stores all records in the leaves, keeps only separator keys in internal nodes, and links the leaves in a list. That gives higher fan-out (internal nodes are smaller) and makes range scans a sequential walk along the leaves, which is why every relational database index and most file systems (ext4, NTFS, Btrfs) use it. Databases pair it with a buffer pool of cached pages; you will build that pairing in the databases subject.

The one weakness is write cost: each insert rewrites a whole block, and random inserts touch random blocks. Log-structured merge trees trade read cost for sequential writes, which is the other half of modern storage engines. Read Open Data Structures chapter 14 and the CMU 15-445 tree index lecture, then build an in-memory B-tree with an explicit block-read counter so you can see the I/O model in action.`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 14, External Memory Searching (B-trees)',
              url: 'https://opendatastructures.org/ods-python/14_External_Memory_Searchin.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              primary: true,
            },
            {
              title: 'CMU 15-445/645 Intro to Database Systems — Tree Indexes lecture',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The "B+Tree Index" lecture: slides, notes and video.',
            },
            {
              title: 'Algorithms, 4th edition — 6.2 B-trees (context section)',
              url: 'https://algs4.cs.princeton.edu/62btree/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture on cache-oblivious algorithms',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Optional: the two lectures on cache-oblivious algorithms generalise the I/O model.',
            },
          ],
          exercises: [
            {
              slug: 'b-plus-tree',
              title: 'In-memory B+ tree with an I/O counter',
              prompt:
                'Implement a B+ tree of configurable order (max keys per node) with search, insert (split), delete (borrow/merge) and range(lo, hi) via the leaf links. Wrap node access in a function that counts "block reads". Verify invariants (key counts, leaf depth, ordering) after every operation in tests. For n = 10^6 random keys, report the height and mean block reads per lookup for orders 4, 16, 64 and 256.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'height-estimates',
              title: 'B-tree height arithmetic',
              prompt:
                'A table has 10^9 rows with 8-byte keys and 8-byte child pointers in 8 KB pages. Compute the maximum fan-out of an internal node, the minimum height of a B+ tree index, how many pages the top two levels occupy, and how many disk reads a lookup costs if those levels are cached. Repeat for 16 KB pages and 16-byte keys.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'disk-backed-tree',
              title: 'Put the tree on disk',
              prompt:
                'Serialise your B+ tree nodes as fixed-size 4 KB pages in a file, reading and writing nodes with seek/read/write (no caching except the root). Insert 10^6 keys and time 10^5 random lookups; measure actual syscalls with strace or equivalent. Then add an LRU cache of 100 pages and measure again. Compare with a sorted file and binary search over pages.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a B-tree beat a balanced binary tree on disk even though both are O(log n)?',
              answerOutline:
                'The base of the logarithm is the fan-out (hundreds) rather than 2, so the height, which equals the number of block transfers per operation, drops from ~30 to ~3-4.',
            },
            {
              question: 'What does a B+ tree add over a B-tree and why do databases prefer it?',
              answerOutline:
                'Records only in leaves, separator keys in internal nodes (higher fan-out), leaves linked in order so range scans are sequential.',
            },
            {
              question: 'What happens when inserting into a full B-tree node?',
              answerOutline:
                'The node splits into two around its median key, which moves up into the parent; if the root splits, the tree grows one level taller.',
            },
          ],
          relatedLessons: ['databases/storage-and-indexing/b-plus-tree-indexes'],
        },
      ],
    },
    {
      slug: 'hashing',
      title: 'Hashing',
      description:
        'Hash functions, chaining and open addressing, the probabilistic analysis behind expected O(1), and the structures hashing makes possible.',
      lessons: [
        {
          slug: 'hash-tables-and-hash-functions',
          title: 'Hash tables and hash functions',
          summary:
            'The dictionary ADT, what a good hash function does, chaining, load factor, and the expected-O(1) argument.',
          estimatedMinutes: 90,
          objectives: [
            'Implement a chained hash table with resizing and measure its performance against dict',
            'Explain the simple uniform hashing assumption and derive expected O(1 + alpha) search',
            'Describe what makes a hash function good and how Python hashes ints, strings and tuples',
            'Explain why mutable objects must not be dictionary keys',
          ],
          concepts: [
            'Dictionary ADT: insert, lookup, delete by key',
            'Hash function h: U -> {0, ..., m-1}',
            'Collisions are unavoidable (pigeonhole)',
            'Separate chaining',
            'Load factor alpha = n/m and resizing',
            'Simple uniform hashing assumption',
            'Hash/equality contract and immutability of keys',
          ],
          explanation: `A **hash table** gives expected constant-time insert, lookup and delete by key, which is why \`dict\` and \`set\` are the most used data structures in Python and why most of this subject's structures end up stored inside one. The idea: a **hash function** maps each key to a slot in an array of $m$ slots; a key is stored at (or near) its slot. Because the key universe is far larger than $m$, **collisions** (two keys, one slot) are unavoidable by the pigeonhole principle, and a hash table design is really a collision strategy.

**Separate chaining** keeps a linked list (or small array) per slot. With $n$ keys in $m$ slots the **load factor** is $\\alpha = n/m$. Under the **simple uniform hashing assumption** (each key equally likely to land in any slot, independently), an unsuccessful search examines $\\alpha$ items on average and a successful one about $1 + \\alpha/2$. Keep $\\alpha$ bounded by doubling $m$ when it exceeds a threshold, and the amortised argument from dynamic arrays makes everything expected $O(1)$. The worst case is still $O(n)$ if all keys collide, which an adversary who knows your hash function can arrange; Python salts string hashing per process for exactly that reason.

A good hash function is fast, spreads keys uniformly, and makes nearby keys land far apart. Integers in Python hash to themselves (so \`dict\` with small int keys is nearly a direct-address table); strings use SipHash; tuples combine element hashes with multiplication by odd constants and XOR. The **contract** you must never break: equal objects must have equal hashes, and the hash must not change while the object is in a table, which is why lists are unhashable and why defining \`__eq__\` without \`__hash__\` makes a class unhashable.

Read Open Data Structures chapter 5 and the 6.006 hashing lecture, then implement chaining, instrument chain lengths and compare the measured distribution with the Poisson prediction.`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 5, Hash Tables',
              url: 'https://opendatastructures.org/ods-python/5_Hash_Tables.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              note: 'Chaining, linear probing, multiplicative hashing and hash codes for compound objects.',
              primary: true,
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lecture 4: Hashing',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Algorithms, 4th edition — 3.4 Hash Tables',
              url: 'https://algs4.cs.princeton.edu/34hash/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'CPython Objects/dictobject.c (and dictnotes.txt)',
              url: 'https://github.com/python/cpython/blob/main/Objects/dictobject.c',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'The header comment explains the compact, insertion-ordered layout and the probing sequence.',
            },
          ],
          exercises: [
            {
              slug: 'chained-hash-map',
              title: 'Chained hash map with resizing',
              prompt:
                'Implement ChainedMap with __getitem__, __setitem__, __delitem__, __len__ and iteration, resizing when alpha > 0.75 and shrinking when alpha < 0.125. Test with hypothesis against dict on random string and int keys. Instrument it to record chain lengths and compare the histogram after inserting 10^5 random keys at alpha = 0.75 with the Poisson(0.75) distribution.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bad-hash-functions',
              title: 'Break a hash table',
              prompt:
                'Using your ChainedMap with a pluggable hash function, insert 10^5 keys using (a) Python hash, (b) hash = len(key) for strings, (c) hash = key mod 2^k for ints that are all multiples of 1024 with m a power of two. Measure mean lookup time for each. Then construct 10^4 distinct strings that collide under a simple polynomial hash with base 31 modulo 2^32 and demonstrate the O(n) lookup.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hash-equality-contract',
              title: 'The hash/equality contract',
              prompt:
                'Write a class Point with __eq__ comparing coordinates but no __hash__; show it cannot be a dict key. Add a correct __hash__. Then make Point mutable, insert one into a set, mutate it, and show that "p in s" becomes False while p is still in the set. Explain what invariant was violated and how dataclass(frozen=True) prevents it.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Under simple uniform hashing, what is the expected cost of an unsuccessful search with chaining, and why does resizing keep it O(1)?',
              answerOutline:
                'Theta(1 + alpha) where alpha = n/m; doubling m when alpha exceeds a constant keeps alpha bounded, with amortised O(1) resize cost.',
            },
            {
              question: 'Why must equal objects have equal hashes, and what about the converse?',
              answerOutline:
                'Lookup finds the slot by hash then checks equality; if equal objects hashed differently a lookup would search the wrong slot. The converse is not required: unequal objects may collide.',
            },
            {
              question: 'Why does Python randomise string hashing per process?',
              answerOutline:
                'To prevent hash-flooding denial of service where an attacker sends many keys that collide under a known hash function, degrading dict to O(n) per operation.',
            },
          ],
        },
        {
          slug: 'open-addressing-and-practical-hashing',
          title: 'Open addressing and practical hash table engineering',
          summary:
            'Linear probing, tombstones, Robin Hood hashing, and why cache-friendly open addressing wins in practice.',
          estimatedMinutes: 90,
          objectives: [
            'Implement linear probing with tombstone deletion and resizing',
            'Explain primary clustering and derive the expected probe counts for linear probing',
            'Compare open addressing with chaining on memory and cache behaviour',
            'Describe how CPython dict and Swiss tables lay out their slots and why',
          ],
          concepts: [
            'Open addressing: all keys in the slot array',
            'Linear, quadratic and double hashing probe sequences',
            'Primary clustering',
            'Tombstones for deletion',
            'Knuth\'s linear probing bounds: ~(1 + 1/(1-alpha)^2)/2 unsuccessful',
            'Robin Hood hashing',
            'Compact dict layout and Swiss tables',
          ],
          explanation: `**Open addressing** stores every key directly in the slot array: on a collision, probe a sequence of alternative slots until an empty one is found. **Linear probing** tries $h(k), h(k)+1, h(k)+2, \\ldots$ modulo $m$. It is the simplest and, on modern hardware, usually the fastest, because the probe sequence walks consecutive memory and stays within a cache line or two. Its enemy is **primary clustering**: runs of occupied slots grow, because any key hashing into a run extends it. Knuth's 1963 analysis gives expected probes of roughly $\\frac{1}{2}(1 + \\frac{1}{(1-\\alpha)^2})$ for an unsuccessful search, which explodes as $\\alpha \\to 1$: at $\\alpha = 0.9$ that is about 50 probes. So open-addressed tables keep $\\alpha$ below about $2/3$ (CPython) or $7/8$ (Swiss tables).

**Deletion** cannot simply empty a slot, because that would break probe chains passing through it. The standard fix is a **tombstone** marker: lookups step over it, inserts may reuse it, and a rebuild clears them once they accumulate. **Quadratic probing** and **double hashing** ($h_1(k) + i \\cdot h_2(k)$) reduce clustering at the cost of locality. **Robin Hood hashing** keeps linear probing but, on insert, lets a key steal the slot of one that is closer to its home, equalising probe lengths so that the variance drops sharply; it also allows deletion by backward shifting with no tombstones.

Study two production designs. CPython's \`dict\` keeps a sparse index array of small integers pointing into a dense array of entries, which saves memory, preserves insertion order and improves locality; its probe sequence mixes in higher hash bits to avoid clustering. Google's **Swiss table** (abseil \`flat_hash_map\`) stores one byte of metadata per slot and probes 16 slots at a time with SIMD instructions, which is why it beats chaining by a large factor.

Read Open Data Structures 5.2 and the dictobject.c header, then run the probe-length experiment: the curve as $\\alpha$ approaches 1 is the whole lesson in one plot.`,
          resources: [
            {
              title: 'Open Data Structures — Chapter 5.2, LinearHashTable',
              url: 'https://opendatastructures.org/ods-python/5_Hash_Tables.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              primary: true,
            },
            {
              title: 'CPython Objects/dictnotes.txt — design notes for dict',
              url: 'https://github.com/python/cpython/blob/main/Objects/dictnotes.txt',
              type: 'article',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Algorithms, 4th edition — 3.4 Hash Tables (linear probing analysis)',
              url: 'https://algs4.cs.princeton.edu/34hash/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'Stanford CS166 Data Structures — lecture materials on hashing',
              url: 'https://web.stanford.edu/class/cs166/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford University',
              note: 'The linear probing and cuckoo hashing slides go deeper than you need now; return for the advanced module.',
            },
          ],
          exercises: [
            {
              slug: 'linear-probing-map',
              title: 'Linear probing with tombstones',
              prompt:
                'Implement OpenMap with linear probing, tombstone deletion, resizing at alpha > 2/3, and a rebuild when tombstones exceed 1/4 of slots. Test with hypothesis against dict including heavy insert/delete churn. Measure mean probes per unsuccessful lookup at alpha = 0.1, 0.3, 0.5, 0.7, 0.9 and plot against Knuth\'s formula.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'robin-hood',
              title: 'Robin Hood hashing',
              prompt:
                'Add Robin Hood insertion (swap with the resident key if your probe distance exceeds its) and backward-shift deletion to OpenMap. Compare the distribution of probe lengths (mean, max, variance) with plain linear probing at alpha = 0.9 on 10^6 keys. Explain why max probe length matters more than mean for latency-sensitive systems.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'chaining-vs-probing-benchmark',
              title: 'Chaining vs probing, measured',
              prompt:
                'Benchmark your ChainedMap, OpenMap, Robin Hood map and dict on 10^6 inserts then 10^6 lookups (half hits, half misses), for int keys and for 20-character string keys. Report time and memory (tracemalloc). Explain the differences in terms of cache lines touched per operation and allocation count.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is primary clustering and why does it hurt linear probing specifically?',
              answerOutline:
                'Contiguous runs of occupied slots grow because any hash landing in a run extends it; probe sequences are consecutive slots so every key in the run pays the run length.',
            },
            {
              question: 'Why are tombstones necessary and what is the alternative?',
              answerOutline:
                'Emptying a slot would terminate probe sequences early and make later keys unreachable; tombstones preserve chains. Backward-shift deletion (as in Robin Hood) moves keys back instead.',
            },
            {
              question: 'Why can open addressing beat chaining in practice despite worse theoretical probe counts at high load?',
              answerOutline:
                'No per-entry allocation, one contiguous array, probes within the same cache line, and SIMD-friendly metadata; it is kept at moderate load factor so probe counts stay small.',
            },
          ],
        },
        {
          slug: 'hashing-applications',
          title: 'Applications of hashing: sets, Bloom filters, rolling hashes and consistent hashing',
          summary:
            'Hashing beyond the dictionary: set algebra, probabilistic membership, string fingerprints, and distributing keys across servers.',
          estimatedMinutes: 90,
          objectives: [
            'Use hash sets to turn O(n^2) pair problems into O(n)',
            'Implement a Bloom filter and derive its false-positive rate',
            'Implement Rabin-Karp rolling hash search and explain its expected cost',
            'Explain consistent hashing and why it minimises key movement when servers change',
          ],
          concepts: [
            'Hash set and set operations in O(n)',
            'Two-sum / deduplication / grouping patterns',
            'Bloom filter: k hash functions, m bits, false positive rate (1 - e^{-kn/m})^k',
            'Rolling hash and Rabin-Karp',
            'Universal hashing (introduction)',
            'Consistent hashing and virtual nodes',
            'HyperLogLog and count-min sketch (overview)',
          ],
          explanation: `Once you have constant-time membership, a whole class of problems collapses from quadratic to linear. "Do any two numbers sum to $t$?" becomes one pass with a set of seen values. Deduplication, intersection, grouping by key, counting frequencies and detecting duplicates in a stream are all one hash table away. Learn to see the pattern: whenever an inner loop asks "have I seen this before", replace it with a set.

Sometimes even one pointer per key is too much memory. A **Bloom filter** answers membership with no false negatives and a tunable false-positive rate using a bit array of $m$ bits and $k$ hash functions: insert by setting $k$ bits, query by checking them. After $n$ insertions the false-positive probability is approximately $(1 - e^{-kn/m})^k$, minimised at $k = (m/n) \\ln 2$; 10 bits per element gives about 1 percent. Browsers, databases (to skip SSTables that cannot contain a key) and CDNs use them. Count-min sketches and HyperLogLog apply the same idea to frequencies and cardinality.

A **rolling hash** lets you hash every window of length $m$ in a string in $O(1)$ each: treat the window as a number in base $b$ modulo $p$, and sliding it is one multiply, one subtract and one add. **Rabin-Karp** compares the pattern's hash with each window's and verifies matches character by character; expected $O(n + m)$ and it extends naturally to searching for many patterns at once. The same trick underlies rsync's block matching and plagiarism detection.

**Consistent hashing** solves distribution: hashing keys to servers with $h(k) \\bmod N$ moves almost every key when $N$ changes. Instead, place servers and keys on a ring by hash and assign each key to the next server clockwise; adding a server moves only $1/N$ of the keys. Virtual nodes (many ring positions per server) even out the load. This is how Dynamo, Cassandra and most caches shard data.

Read the Stanford CS166 Bloom filter notes and Sedgewick 5.3 for Rabin-Karp, then build all three structures with measured error rates.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 5.3 Substring Search (Rabin-Karp)',
              url: 'https://algs4.cs.princeton.edu/53substring/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              primary: true,
            },
            {
              title: 'Stanford CS166 — Bloom filters, count-min sketch and cuckoo hashing lecture slides',
              url: 'https://web.stanford.edu/class/cs166/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford University',
            },
            {
              title: 'Dynamo: Amazon\'s Highly Available Key-value Store (SOSP 2007)',
              url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
              note: 'Section 4.2 on partitioning with consistent hashing and virtual nodes.',
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture on hashing (universal and perfect hashing)',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'bloom-filter',
              title: 'Bloom filter with measured false positives',
              prompt:
                'Implement a Bloom filter using a bytearray/bitarray and k hash functions derived from two base hashes (Kirsch-Mitzenmacher: h1 + i*h2). Insert 10^5 random strings; query 10^5 other strings and measure the false-positive rate for m/n = 4, 8, 12, 16 bits per element with the optimal k. Plot measured vs predicted (1 - e^{-kn/m})^k.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rabin-karp',
              title: 'Rabin-Karp and multi-pattern search',
              prompt:
                'Implement Rabin-Karp with base 256 modulo a large prime, verifying candidate matches. Test against str.find on random texts with planted patterns. Extend to search for a set of 1000 patterns of equal length in one pass using a hash set of pattern fingerprints. Benchmark single-pattern search against str.find and KMP (from the advanced module) on a 100 MB text.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'consistent-hashing',
              title: 'Consistent hashing ring',
              prompt:
                'Implement a consistent hash ring with v virtual nodes per server using a sorted list and bisect. With 10 servers and 10^6 keys, measure load balance (max/mean keys per server) for v = 1, 10, 100, 1000. Add an 11th server and measure the fraction of keys that move; compare with mod-N hashing.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a Bloom filter have false positives but never false negatives?',
              answerOutline:
                'Bits are only ever set, never cleared, so every inserted key\'s bits remain set (no false negatives); other keys may have all their bits set by coincidence (false positives).',
            },
            {
              question: 'How does a rolling hash update in O(1) when the window slides?',
              answerOutline:
                'Subtract the contribution of the outgoing character (c_out * b^(m-1)), multiply by b, add the incoming character, all modulo p.',
            },
            {
              question: 'What fraction of keys move when a server is added under consistent hashing versus mod-N?',
              answerOutline:
                'About 1/(N+1) under consistent hashing (only keys between the new node and its predecessor); nearly all keys under mod-N.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/random-variables-and-expectation'],
        },
      ],
    },
    {
      slug: 'graphs',
      title: 'Graphs',
      description:
        'Representations, breadth-first and depth-first search and their applications, shortest paths, minimum spanning trees and union-find.',
      lessons: [
        {
          slug: 'graph-representations-bfs-dfs',
          title: 'Graph representations, BFS and DFS',
          summary:
            'Adjacency lists and matrices, the two fundamental traversals, and what each one reveals about a graph.',
          estimatedMinutes: 110,
          objectives: [
            'Choose between adjacency list and matrix based on density and the operations needed',
            'Implement BFS and use it for shortest paths in unweighted graphs and for bipartiteness',
            'Implement DFS iteratively and recursively and classify edges (tree, back, forward, cross)',
            'Compute connected components and detect cycles in directed and undirected graphs',
          ],
          concepts: [
            'Graph G = (V, E), directed/undirected, weighted',
            'Adjacency list O(V + E) vs matrix O(V^2)',
            'BFS: layers, queue, shortest paths in unweighted graphs',
            'DFS: discovery/finish times, edge classification',
            'Connected components',
            'Cycle detection via back edges',
            'Bipartite check by 2-colouring',
          ],
          explanation: `A **graph** is a set of vertices and a set of edges between them. Road networks, dependency graphs, social networks, state spaces of puzzles, and the call graph of your program are all graphs, and the same handful of algorithms work on all of them. Modelling a problem as a graph is often the entire solution.

Pick the **representation** by density and by which operations you need. An **adjacency list** (for each vertex, the list of its neighbours) uses $O(V + E)$ space and iterates neighbours in time proportional to their number, which is what traversals want. An **adjacency matrix** uses $O(V^2)$ space but answers "is there an edge $(u, v)$?" in $O(1)$ and suits dense graphs or matrix-based algorithms. In Python, a dict of lists or sets is the adjacency list; for performance-critical work use compressed sparse row arrays.

**Breadth-first search** explores in layers using a queue. It visits vertices in order of their distance from the source, so the layer number *is* the shortest path length in an unweighted graph; keep a parent pointer to reconstruct the path. BFS also tests bipartiteness: colour layers alternately and look for an edge within a layer. Cost: $O(V + E)$.

**Depth-first search** goes as deep as possible before backtracking, naturally via recursion or an explicit stack. Recording **discovery and finish times** turns DFS into a precise instrument: in a directed graph, an edge to a vertex that is discovered but not finished is a **back edge**, and a back edge exists if and only if there is a cycle. Finish order gives topological sort (next lesson); the parenthesis structure of discovery/finish intervals gives the component structure. Recursion depth is a real limit in Python ($10^3$ by default), so write the iterative version with an explicit stack that also tracks finish events.

Read Erickson chapters 5 and 6 and Sedgewick 4.1-4.2, then build a graph class with both representations, both traversals and the edge classifier, and verify everything with NetworkX.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 5: Basic Graph Algorithms',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/05-graphs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Representations, whatever-first search, BFS and DFS as instances.',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Algorithms, Chapter 6: Depth-First Search',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/06-dfs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lectures 9 and 10: Breadth-First Search, Depth-First Search',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'NetworkX documentation',
              url: 'https://networkx.org/documentation/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'NetworkX',
              note: 'Use as a reference implementation to test yours against, not as a substitute for writing it.',
            },
          ],
          exercises: [
            {
              slug: 'graph-class',
              title: 'Graph class with BFS, DFS and edge classification',
              prompt:
                'Implement Graph with add_edge, neighbours, bfs(s) returning distances and parents, dfs() returning discovery/finish times and the edge classification, connected_components(), has_cycle() and is_bipartite(). Use adjacency lists; add a to_matrix() method. Test on hand-built graphs with known answers and on 200 random graphs against NetworkX (shortest path lengths, component counts, cycle existence).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'word-ladder',
              title: 'Word ladder as BFS',
              prompt:
                'Given a dictionary of 5-letter words, build the graph where words differing in one letter are adjacent (do it in O(n * 5 * 26) using wildcard buckets, not O(n^2)), then find the shortest ladder between two words with BFS and print the path. Report the number of edges, the time to build the graph, and the diameter of the largest component.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'maze-and-state-space',
              title: 'Search a state space',
              prompt:
                'Model the 8-puzzle as an implicit graph (states as tuples, neighbours generated on demand). BFS from a random solvable state to the goal; report the solution length, states expanded and memory used. Explain why DFS is a poor choice here and why BFS from both ends (bidirectional) expands far fewer states; implement it and measure.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does BFS find shortest paths in unweighted graphs but not weighted ones?',
              answerOutline:
                'BFS visits vertices in order of edge count from the source; with weights, a path with more edges can be shorter, so a priority queue on distance (Dijkstra) is needed.',
            },
            {
              question: 'How does DFS detect a cycle in a directed graph, and why is the same test wrong for undirected graphs?',
              answerOutline:
                'A back edge (to a vertex on the current recursion stack, discovered but not finished) exists iff there is a cycle. In undirected graphs the edge back to the parent must be excluded or it looks like a back edge.',
            },
            {
              question: 'When would you choose an adjacency matrix?',
              answerOutline:
                'Dense graphs (E near V^2), when O(1) edge existence queries are needed, or for algorithms that are naturally matrix operations (Floyd-Warshall, spectral methods).',
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/graph-basics-and-the-handshake-lemma'],
        },
        {
          slug: 'topological-sort-and-strong-connectivity',
          title: 'Topological sort, DAGs and strongly connected components',
          summary:
            'Ordering a DAG, detecting when no order exists, and collapsing a directed graph into its strongly connected components.',
          estimatedMinutes: 90,
          objectives: [
            'Topologically sort a DAG by DFS finish times and by Kahn\'s algorithm',
            'Explain why a topological order exists if and only if the graph is acyclic',
            'Compute strongly connected components with Kosaraju or Tarjan and build the condensation DAG',
            'Apply these to build systems, package managers, spreadsheets and 2-SAT',
          ],
          concepts: [
            'DAG and topological order',
            'Reverse postorder of DFS',
            'Kahn\'s algorithm: repeatedly remove in-degree-0 vertices',
            'Strongly connected component (SCC)',
            'Kosaraju: DFS, transpose, DFS in finish order',
            'Tarjan\'s single-pass SCC with low-links',
            'Condensation graph',
          ],
          explanation: `A **directed acyclic graph** models any set of tasks with dependencies: compile targets, package installs, spreadsheet cells, course prerequisites. A **topological order** lists the vertices so that every edge points forward. One exists if and only if the graph has no cycle, which is why your build tool complains about "circular dependency" rather than guessing.

The DFS method is a one-liner once you own DFS: output vertices in **reverse order of finish time**. Why it works: for an edge $(u, v)$, either $v$ finishes before $u$ (it was visited during $u$'s exploration or earlier) or $v$ is on the stack when $u$ reaches it, which is a back edge and a cycle. So in a DAG, finish time of $u$ is always after $v$, and reversing finish order puts $u$ first. **Kahn's algorithm** is the alternative: maintain in-degrees, repeatedly emit a vertex with in-degree 0 and decrement its neighbours; if you run out of zero-in-degree vertices before emitting everything, there is a cycle. Kahn's version is easy to make deterministic (use a priority queue on names) and parallel (all in-degree-0 vertices can run at once), which is what \`make -j\` does.

When the graph has cycles, the next question is which vertices are mutually reachable. Those sets are the **strongly connected components**, and contracting each to a single vertex gives the **condensation**, which is always a DAG. **Kosaraju's algorithm** runs DFS to get finish times, transposes the graph, and runs DFS again in decreasing finish order; each tree in the second pass is an SCC. The proof rests on the fact that the vertex finishing last lies in a source component of the condensation. **Tarjan's algorithm** does it in one DFS with low-link values, and is the version you will find in compilers. Both are $O(V + E)$.

The classic payoff is **2-SAT**: build an implication graph with vertices $x$ and $\\neg x$; the formula is satisfiable iff no variable shares an SCC with its negation. Read Erickson 6.4-6.6 and Sedgewick 4.2, then implement both SCC algorithms and verify against each other.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 6.4-6.6: Topological sort and strong connectivity',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/06-dfs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition — 4.2 Directed Graphs',
              url: 'https://algs4.cs.princeton.edu/42digraph/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              note: 'Topological sort, Kosaraju-Sharir SCC with proof.',
            },
            {
              title: 'Python documentation: graphlib.TopologicalSorter',
              url: 'https://docs.python.org/3/library/graphlib.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'A standard-library Kahn-style sorter designed for parallel task scheduling; compare its API to yours.',
            },
          ],
          exercises: [
            {
              slug: 'topo-sort-both-ways',
              title: 'Topological sort two ways and a build scheduler',
              prompt:
                'Implement topological sort via DFS finish times and via Kahn\'s algorithm (deterministic with a heap on vertex name). Both must raise CycleError naming a cycle when one exists. Then write a tiny build scheduler: given a Makefile-like dependency list and per-task durations, compute the minimum makespan with unlimited parallelism (longest path in the DAG) and simulate execution with k workers using Kahn\'s frontier. Report makespans for k = 1, 2, 4, infinity on a 1000-task random DAG.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'scc-two-ways',
              title: 'Kosaraju and Tarjan',
              prompt:
                'Implement both SCC algorithms and verify they produce the same partition on 500 random digraphs (compare as sets of frozensets) and against NetworkX. Build the condensation DAG and check it is acyclic with your topological sort. Benchmark both on a 10^6-edge graph and report the iterative Tarjan\'s advantage in memory.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Write Tarjan iteratively; the recursive version overflows the Python stack on long chains.',
            },
            {
              slug: 'two-sat',
              title: '2-SAT via SCCs',
              prompt:
                'Implement a 2-SAT solver: build the implication graph, compute SCCs, report unsatisfiable if x and not-x share a component, otherwise extract an assignment from the component topological order. Test on 100 random instances by brute force (n <= 15 variables), then solve an instance with 10^5 variables and 3 * 10^5 clauses and report the time.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does reverse DFS finish order give a topological order of a DAG?',
              answerOutline:
                'For every edge (u, v) in a DAG, v finishes before u (v is either already finished or explored during u); reversing finish order therefore places u before v.',
            },
            {
              question: 'How does Kahn\'s algorithm detect a cycle?',
              answerOutline:
                'Vertices in a cycle never reach in-degree 0, so the algorithm terminates having emitted fewer than V vertices.',
            },
            {
              question: 'Why is the condensation of a directed graph always a DAG?',
              answerOutline:
                'If two SCCs had a cycle between them in the condensation, all their vertices would be mutually reachable and they would be one SCC, a contradiction.',
            },
          ],
        },
        {
          slug: 'shortest-paths',
          title: 'Shortest paths: Dijkstra, Bellman-Ford and A*',
          summary:
            'Relaxation as the common core, Dijkstra for non-negative weights, Bellman-Ford for negative edges and cycle detection, and A* with heuristics.',
          estimatedMinutes: 120,
          objectives: [
            'Explain edge relaxation and the triangle inequality for shortest-path distances',
            'Implement Dijkstra with a binary heap and prove its correctness for non-negative weights',
            'Implement Bellman-Ford, detect negative cycles, and explain the DAG shortest-path special case',
            'Implement A* with an admissible heuristic and measure the reduction in expanded nodes',
          ],
          concepts: [
            'Relaxation: d[v] = min(d[v], d[u] + w(u, v))',
            'Dijkstra: greedy by current distance, O((V + E) log V) with a heap',
            'Why negative edges break Dijkstra',
            'Bellman-Ford: V - 1 rounds of relaxing all edges, O(VE)',
            'Negative cycle detection',
            'Single-source on a DAG in O(V + E)',
            'A*: f = g + h, admissible and consistent heuristics',
            'Floyd-Warshall for all pairs (overview)',
          ],
          explanation: `Every shortest-path algorithm is built from one operation, **relaxation**: if going through $u$ gives a shorter route to $v$, update $d[v] = d[u] + w(u, v)$ and record $u$ as $v$'s parent. Distances only ever decrease, never below the true value, and the algorithms differ only in the *order* in which they relax edges.

**Dijkstra's algorithm** relaxes edges out of the unfinished vertex with the smallest tentative distance, using a min-priority queue. With non-negative weights, that vertex's distance is already final: any other path to it would have to leave the finished set through a vertex with a larger or equal tentative distance and could only get longer. That invariant is the correctness proof, and it is exactly what a negative edge breaks. With a binary heap and decrease-key (or lazy insertion with stale-entry skipping) the cost is $O((V + E) \\log V)$; with a Fibonacci heap $O(E + V \\log V)$, which is rarely worth its constants. Dijkstra on an unweighted graph *is* BFS with a heap in place of a queue.

**Bellman-Ford** handles negative weights by relaxing every edge $V - 1$ times. After round $i$, all shortest paths using at most $i$ edges are correct, and a simple path has at most $V - 1$ edges. If a $V$-th round still relaxes something, a **negative cycle** is reachable, which is how arbitrage detection in currency graphs works (weights $-\\log$ rate). Cost $O(VE)$. On a **DAG** you can do better than either: relax vertices in topological order, once each, in $O(V + E)$, negative weights included; this is also how the longest path (critical path) is found.

**A*** is Dijkstra with a heuristic $h(v)$ estimating the remaining distance; it pops by $g + h$. If $h$ never overestimates (**admissible**) the result is optimal, and if it is **consistent** no vertex is popped twice. On grid maps with Euclidean or Manhattan distance it expands a small fraction of what Dijkstra does, which is the whole of game and robot pathfinding.

Read Erickson chapter 8 and Sedgewick 4.4, then implement all four on the same graph interface and compare expanded vertices on a grid with obstacles.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 8: Shortest Paths',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/08-sssp.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'The "generic SSSP" framing makes Dijkstra and Bellman-Ford instances of one algorithm.',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition — 4.4 Shortest Paths',
              url: 'https://algs4.cs.princeton.edu/44sp/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lectures 11-14: Weighted shortest paths, Bellman-Ford, Dijkstra, APSP',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Jeff Erickson — Algorithms, Chapter 9: All-Pairs Shortest Paths',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/09-apsp.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Floyd-Warshall and Johnson\'s algorithm; optional extension.',
            },
          ],
          exercises: [
            {
              slug: 'shortest-path-suite',
              title: 'Dijkstra, Bellman-Ford and DAG shortest paths',
              prompt:
                'Implement dijkstra(g, s) with your indexed heap (and a second version with lazy deletion on heapq), bellman_ford(g, s) that returns distances or a negative cycle, and dag_shortest_paths(g, s). All return distances and parents and reconstruct paths. Test against NetworkX on 300 random weighted graphs, including ones with negative edges (Bellman-Ford only) and planted negative cycles. Benchmark Dijkstra on a 10^6-edge sparse graph with both heap variants.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'a-star-grid',
              title: 'A* on a grid map',
              prompt:
                'Generate 512 x 512 grid maps with 30 percent random obstacles. Implement A* with Manhattan heuristic (4-neighbour) and octile heuristic (8-neighbour). For 100 random start/goal pairs compare path length (must be equal to Dijkstra), vertices expanded and time, for Dijkstra, A*, and A* with an inadmissible heuristic 2h (report how often it is suboptimal and by how much).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'arbitrage',
              title: 'Currency arbitrage with Bellman-Ford',
              prompt:
                'Given a table of exchange rates between 10 currencies (make one up or download a snapshot), build the graph with weights -log(rate) and use Bellman-Ford to detect a negative cycle. Print the cycle and the profit factor. Explain why the log transform is necessary and why Dijkstra cannot be used.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'dijkstra-proof',
              title: 'Prove Dijkstra correct and break it',
              prompt:
                'Write the inductive proof that when Dijkstra pops a vertex its distance is final, assuming non-negative weights. Then construct the smallest graph (3 vertices) with one negative edge where Dijkstra returns a wrong answer and trace the execution.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Dijkstra fail with negative edge weights?',
              answerOutline:
                'Its correctness relies on a popped vertex having a final distance because any other path leaves the finished set via a vertex with larger tentative distance; a negative edge can make such a path shorter after all.',
            },
            {
              question: 'Why are V - 1 rounds enough for Bellman-Ford, and what does a V-th improving round mean?',
              answerOutline:
                'A shortest simple path has at most V - 1 edges and round i finalises paths of i edges. Further improvement implies a reachable negative cycle.',
            },
            {
              question: 'What property must an A* heuristic have for optimality, and what does consistency add?',
              answerOutline:
                'Admissible: never overestimates the true remaining distance. Consistent: h(u) <= w(u,v) + h(v), which guarantees each vertex is settled once (no reopening).',
            },
          ],
        },
        {
          slug: 'minimum-spanning-trees-and-union-find',
          title: 'Minimum spanning trees and union-find',
          summary:
            'The cut property, Kruskal and Prim, and the union-find structure whose near-constant amortised cost makes Kruskal fast.',
          estimatedMinutes: 100,
          objectives: [
            'State and prove the cut property and use it to justify any greedy MST algorithm',
            'Implement Kruskal and Prim and analyse both',
            'Implement union-find with union by rank and path compression and explain the inverse-Ackermann bound',
            'Apply MST and union-find to clustering, network design and dynamic connectivity',
          ],
          concepts: [
            'Spanning tree, minimum spanning tree',
            'Cut property and cycle property',
            'Kruskal: sort edges, add if it joins two components',
            'Prim: grow one tree with a priority queue',
            'Union-find: find with path compression, union by rank/size',
            'Amortised O(alpha(n)) per operation',
            'Single-linkage clustering as MST',
          ],
          explanation: `A **minimum spanning tree** connects all vertices of a weighted undirected graph with the least total edge weight. It is the cheapest network, the backbone of single-linkage clustering, an approximation step for the travelling salesman problem, and a clean example of a greedy algorithm you can actually prove correct.

The proof tool is the **cut property**: for any partition of the vertices into two sets, the lightest edge crossing the partition belongs to some MST. (Suppose not; add it to the MST, which creates a cycle; the cycle crosses the cut again on some heavier edge; swap them and get a lighter tree.) Every MST algorithm is just a sequence of cut-property applications.

**Kruskal** sorts edges by weight and adds each one that connects two different components. "Different components" is the question union-find answers, and with it Kruskal is $O(E \\log E)$, dominated by the sort. **Prim** grows a single tree from a start vertex, always adding the lightest edge leaving the tree, via a priority queue keyed on each outside vertex's best connecting edge; it looks exactly like Dijkstra and costs $O(E \\log V)$. Prim suits dense graphs and adjacency matrices; Kruskal suits sparse graphs and edge lists, and gives you the clustering for free: stop after $k - 1$ merges and the components are the $k$ clusters.

**Union-find** maintains a partition under two operations: find the set containing $x$, and union two sets. Represent sets as trees of parent pointers. **Union by rank** (attach the shorter tree under the taller) keeps height $O(\\log n)$; **path compression** (point every node on a find path directly at the root) flattens trees as a side effect. Together they give an amortised cost of $O(\\alpha(n))$ per operation, where $\\alpha$ is the inverse Ackermann function, below 5 for any input that fits in the universe. The analysis is deep; the implementation is ten lines, and you should measure how close to constant it is in practice.

Read Erickson chapter 7 and Sedgewick 1.5 and 4.3, then implement everything and verify MST weights against NetworkX.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 7: Minimum Spanning Trees',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/07-mst.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition — 1.5 Case Study: Union-Find',
              url: 'https://algs4.cs.princeton.edu/15uf/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              note: 'The empirical progression from quick-find to weighted quick-union with path compression.',
            },
            {
              title: 'Algorithms, 4th edition — 4.3 Minimum Spanning Trees',
              url: 'https://algs4.cs.princeton.edu/43mst/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture 12: Greedy Algorithms: Minimum Spanning Tree',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'union-find-variants',
              title: 'Union-find, four ways, measured',
              prompt:
                'Implement union-find as: quick-find, quick-union, union by size, union by size with path compression. For n = 10^6 elements and 10^6 random unions followed by 10^6 finds, measure time for each and the maximum tree height before and after compression. Confirm the last variant is effectively constant per operation by showing the time per op is flat from n = 10^4 to 10^7.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'kruskal-and-prim',
              title: 'Kruskal and Prim',
              prompt:
                'Implement both and verify equal MST weights on 300 random connected graphs against NetworkX. Benchmark on sparse (E = 3V) and dense (E = V^2/4) graphs for V up to 10^4 and explain the winner on each. Then use Kruskal for single-linkage clustering of 2000 2D points into k = 5 clusters and plot the result.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cut-property-proof',
              title: 'Cut and cycle properties',
              prompt:
                'Prove the cut property and the cycle property (the heaviest edge on any cycle is in no MST, assuming distinct weights). Use them to prove Kruskal and Prim correct in one paragraph each. Then explain what changes when edge weights are not distinct.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the cut property and explain why it justifies Prim.',
              answerOutline:
                'The lightest edge crossing any cut is in some MST. Prim\'s cut is (tree, not tree) and it always adds the lightest crossing edge.',
            },
            {
              question: 'What do union by rank and path compression each contribute?',
              answerOutline:
                'Union by rank alone bounds tree height by log n; path compression flattens paths during finds; together the amortised cost per operation is O(alpha(n)), effectively constant.',
            },
            {
              question: 'How does Kruskal give you k-clustering?',
              answerOutline:
                'Stop after V - k edge additions; the remaining components are the clusters, and the first skipped edge weight is the maximum spacing (single-linkage).',
            },
          ],
        },
      ],
      project: {
        slug: 'route-planner',
        title: 'Module project: a road-network route planner',
        description: `Download an OpenStreetMap extract for a city (via osmnx or a raw PBF), build a weighted graph of intersections and road segments, and implement a route planner with Dijkstra, A* (haversine heuristic) and bidirectional Dijkstra. Compare the three on 100 random origin-destination pairs by vertices settled and wall time, verify identical distances, and render the routes on a map.`,
        deliverables: [
          'Graph loader and a serialised graph file',
          'Three correct routing algorithms with a shared test suite',
          'A results table and plots of settled vertices vs path length for each algorithm',
          'Rendered maps for five example routes',
        ],
        estimatedHours: 10,
        stretchGoals: ['Implement contraction hierarchies or ALT landmarks and show the speed-up', 'Add turn restrictions and one-way streets'],
      },
    },
    {
      slug: 'dynamic-programming-and-greedy',
      title: 'Dynamic Programming and Greedy Algorithms',
      description:
        'Recognising optimal substructure, turning a recurrence into a table, and knowing when a greedy choice is provably safe.',
      lessons: [
        {
          slug: 'dynamic-programming-principles',
          title: 'Dynamic programming: from recursion to tables',
          summary:
            'Overlapping subproblems, memoisation versus tabulation, and a repeatable recipe for designing a DP.',
          estimatedMinutes: 120,
          objectives: [
            'Recognise optimal substructure and overlapping subproblems in a problem statement',
            'Follow a fixed recipe: define subproblems, write the recurrence, order the evaluation, bound the cost',
            'Implement both memoised recursion and bottom-up tables and recover the solution, not just its value',
            'Analyse DP cost as (number of subproblems) x (time per subproblem)',
          ],
          concepts: [
            'Optimal substructure',
            'Overlapping subproblems',
            'Memoisation (top-down) vs tabulation (bottom-up)',
            'Subproblem graph must be a DAG',
            'Parent pointers for reconstruction',
            'Space optimisation by keeping only needed rows',
            'Fibonacci, rod cutting, weighted interval scheduling',
          ],
          explanation: `**Dynamic programming** is recursion with a memory. A naive recursive solution to Fibonacci does $2^n$ work because it recomputes the same values; storing each result the first time it is computed makes it $O(n)$. That is the whole trick, and the art lies in finding the recursion to begin with.

Two properties signal that DP applies. **Optimal substructure**: an optimal solution contains optimal solutions to subproblems (the shortest path from $s$ to $t$ via $v$ contains the shortest path from $s$ to $v$). **Overlapping subproblems**: the recursion revisits the same subproblems, so caching pays. If subproblems do not overlap you have plain divide and conquer; if there is no optimal substructure (longest simple path, for instance) DP does not apply.

Erickson's recipe is worth following rigidly until it is instinct. (1) **Define the subproblems** in English, with explicit parameters: "$\\text{OPT}(i)$ is the maximum value using only the first $i$ items." (2) **Write the recurrence** including base cases, by considering the last decision: either item $i$ is used or it is not. (3) **Order the evaluation** so that every subproblem's dependencies are computed first; the dependency graph must be a DAG, and the order is its topological sort. (4) **Bound the cost**: number of subproblems times the time to evaluate one recurrence. (5) **Reconstruct** the solution by storing which choice won, or by re-deriving it from the table.

**Memoisation** (a recursive function with a cache, \`functools.lru_cache\` in Python) writes itself from the recurrence and only visits needed subproblems; it costs recursion depth and dictionary overhead. **Tabulation** fills an array in the evaluation order; it is faster, allows space optimisation (only the previous row of a 2D table may be needed), and has no recursion limit. Write the memoised version first to get it right, then convert.

Practice on rod cutting, weighted interval scheduling and the text segmentation problem from Erickson chapter 3 before attempting the classics in the next lesson.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 3: Dynamic Programming',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'The best treatment of the design recipe anywhere; sections 3.1-3.5 for this lesson.',
              primary: true,
            },
            {
              title: 'MIT 6.006 (Spring 2020) — Lectures 15-18: Dynamic Programming, Parts 1-4',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Uses the SRTBOT framework (Subproblems, Relate, Topological order, Base, Original, Time).',
            },
            {
              title: 'Python documentation: functools.lru_cache and functools.cache',
              url: 'https://docs.python.org/3/library/functools.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'three-classics-both-ways',
              title: 'Rod cutting, weighted interval scheduling, text segmentation',
              prompt:
                'For each problem write (a) the subproblem definition in one sentence, (b) the recurrence with base cases, (c) a memoised implementation, (d) a tabulated implementation with reconstruction of the actual solution. Test memoised against tabulated and against brute-force enumeration for small inputs with hypothesis. Measure the time ratio of memoised vs tabulated at n = 10^4.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'count-subproblems',
              title: 'Cost by counting subproblems',
              prompt:
                'For five DPs (Fibonacci, rod cutting, LCS, 0/1 knapsack, matrix-chain multiplication) state the number of subproblems, the time per subproblem, the total time and the space; then state the space after keeping only the rows needed. Explain for which of these you lose the ability to reconstruct the solution after the space optimisation, and how Hirschberg\'s trick recovers it for LCS.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'recursion-explosion',
              title: 'Measure the explosion',
              prompt:
                'Time naive recursive Fibonacci for n = 20, 25, 30, 35 and fit the growth base (expect about 1.618^n). Add lru_cache and show the time becomes linear; then show the recursion limit is hit at n ~ 1000 and that the tabulated version handles n = 10^6 in under a second.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What two properties must a problem have for DP to apply and what does each buy?',
              answerOutline:
                'Optimal substructure (lets you build the answer from subproblem answers via a recurrence) and overlapping subproblems (makes caching reduce exponential work to polynomial).',
            },
            {
              question: 'Why does DP fail for the longest simple path in a graph?',
              answerOutline:
                'No optimal substructure: the longest simple path from s to t via v need not contain the longest simple path from s to v, since the subpaths must avoid sharing vertices. The problem is NP-hard.',
            },
            {
              question: 'When would you prefer memoisation over tabulation?',
              answerOutline:
                'When only a sparse subset of subproblems is reachable, when the evaluation order is hard to express, or for a first correct version; tabulation when speed, memory or recursion depth matter.',
            },
          ],
        },
        {
          slug: 'classic-dp-problems',
          title: 'Classic DP problems: sequences, knapsack and intervals',
          summary:
            'LCS and edit distance, 0/1 and unbounded knapsack, matrix-chain and optimal BST: the patterns that most DP problems reduce to.',
          estimatedMinutes: 120,
          objectives: [
            'Implement longest common subsequence and edit distance with reconstruction, in O(mn) time and O(min(m, n)) space',
            'Implement 0/1 knapsack and explain why its O(nW) cost is pseudo-polynomial',
            'Implement interval DPs such as matrix-chain multiplication and explain the O(n^3) cost',
            'Map a new problem onto one of the standard DP shapes: prefix, two-sequence, subset-with-capacity, interval, tree',
          ],
          concepts: [
            'Prefix DP (one index)',
            'Two-sequence DP: LCS, edit distance, alignment',
            'Capacity DP: 0/1 and unbounded knapsack, coin change',
            'Pseudo-polynomial time',
            'Interval DP: matrix-chain, optimal BST, palindromes',
            'Tree DP: independent set on trees',
            'Bitmask DP: TSP in O(2^n n^2)',
          ],
          explanation: `Most DP problems you will meet are one of a few **shapes**, distinguished by what the subproblem parameters are. Learning the shapes lets you recognise a disguised classic in an interview or a research problem.

**Two-sequence DP.** Subproblem $(i, j)$ is "the first $i$ characters of $A$ and first $j$ of $B$". **Longest common subsequence**: if $A_i = B_j$ extend by one, else take the better of dropping $A_i$ or $B_j$. **Edit distance** (Levenshtein) adds a substitution option and costs per operation; it is the basis of spell checkers, diff tools and DNA alignment (Needleman-Wunsch is edit distance with a scoring matrix). Both cost $O(mn)$, and since each row depends only on the previous, $O(\\min(m, n))$ space suffices for the value; reconstruction needs the full table or Hirschberg's divide-and-conquer.

**Capacity DP.** Subproblem $(i, w)$ is "best value using items $1..i$ with capacity $w$". **0/1 knapsack** chooses to take item $i$ (if it fits) or not, in $O(nW)$ time. That bound is **pseudo-polynomial**: it is polynomial in the *value* of $W$, not in its number of bits, which is why knapsack is NP-hard yet solvable in practice for modest $W$. Coin change and subset sum are the same shape with unbounded or unit-value items.

**Interval DP.** Subproblem $(i, j)$ is "the best way to handle the contiguous range $i..j$", solved by choosing the split point $k$: **matrix-chain multiplication**, optimal binary search trees, and palindrome partitioning all cost $O(n^3)$ for $O(n^2)$ subproblems with $O(n)$ choices each (Knuth's optimisation drops some to $O(n^2)$).

**Tree DP** does recursion over children (maximum independent set on a tree in $O(n)$), and **bitmask DP** uses a subset as a parameter (Held-Karp TSP in $O(2^n n^2)$, which beats $n!$ by an enormous margin and is the right tool for $n \\le 20$).

Work through Erickson 3.6-3.10 and the 6.006 DP lectures, implementing each with tests against brute force. The goal is the reflex "this is a capacity DP" rather than memorised code.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 3.6-3.10 (edit distance, subset sum, optimal BST, tree DP)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/03-dynprog.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'MIT 6.006 (Spring 2020) — DP lectures: LCS, knapsack, subset sum, pseudo-polynomial time',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture 15: Dynamic Programming (Held-Karp TSP, parenthesisation)',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Python difflib source (SequenceMatcher) — a production LCS-style diff',
              url: 'https://docs.python.org/3/library/difflib.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Compare its "longest matching block" heuristic with the exact LCS you implement.',
            },
          ],
          exercises: [
            {
              slug: 'edit-distance-diff',
              title: 'Edit distance and a diff tool',
              prompt:
                'Implement LCS and Levenshtein distance with full reconstruction, then an O(min(m,n))-space version returning only the value. Test with hypothesis (distance is 0 iff equal, symmetric, triangle inequality, and matches brute force for short strings). Build a line-based diff of two text files from the LCS and compare its output with difflib.unified_diff. Time the O(mn) algorithm for two 5000-line files.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'knapsack-variants',
              title: 'Knapsack and pseudo-polynomial time',
              prompt:
                'Implement 0/1 knapsack (with item reconstruction), unbounded knapsack and coin change (count ways and minimum coins). Verify against brute-force subsets for n <= 15. Then show pseudo-polynomial time empirically: fix n = 100 and time the solver for W = 10^3, 10^4, 10^5, 10^6, then fix W and scale n. Explain why multiplying all weights and W by 1000 makes the problem 1000x slower despite being "the same" problem.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'held-karp-tsp',
              title: 'Bitmask DP for TSP',
              prompt:
                'Implement Held-Karp for the travelling salesman problem on n <= 18 cities with random coordinates, reconstructing the tour. Verify against brute-force permutations for n <= 9. Plot time against n and confirm the 2^n growth; compare with the nearest-neighbour heuristic\'s tour length on the same instances.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the LCS recurrence and state its base cases.',
              answerOutline:
                'L(i, j) = L(i-1, j-1) + 1 if A_i = B_j, else max(L(i-1, j), L(i, j-1)); L(0, j) = L(i, 0) = 0.',
            },
            {
              question: 'What does it mean that knapsack\'s O(nW) algorithm is pseudo-polynomial?',
              answerOutline:
                'The running time is polynomial in the numeric value W but exponential in the input size measured in bits (log W); so the problem can still be NP-hard.',
            },
            {
              question: 'Why does an interval DP cost O(n^3) and what parameterisation gives O(n^2) subproblems?',
              answerOutline:
                'Subproblems are ranges (i, j), O(n^2) of them, and each tries O(n) split points k; so O(n^3) total.',
            },
          ],
        },
        {
          slug: 'greedy-algorithms',
          title: 'Greedy algorithms and when they are safe',
          summary:
            'The exchange argument, interval scheduling, Huffman coding and the counterexamples that show why greedy usually fails.',
          estimatedMinutes: 90,
          objectives: [
            'Prove a greedy choice safe with an exchange argument or a "greedy stays ahead" argument',
            'Implement interval scheduling, fractional knapsack and Huffman coding',
            'Produce a counterexample when a greedy strategy is wrong (coin change, 0/1 knapsack)',
            'Decide between greedy and DP for a new problem and justify the choice',
          ],
          concepts: [
            'Greedy choice property',
            'Exchange argument',
            'Greedy stays ahead',
            'Interval scheduling by earliest finish time',
            'Fractional vs 0/1 knapsack',
            'Huffman coding and optimal prefix codes',
            'Matroids (mention) as the general theory',
          ],
          explanation: `A **greedy algorithm** makes the locally best choice at each step and never reconsiders. When it works it is simpler and faster than DP; when it does not work it is wrong in a way that is easy to miss, because it still returns an answer. The discipline is: never trust a greedy algorithm without a proof or a solid counterexample search.

The standard proof is the **exchange argument**. Take any optimal solution; show that you can swap in the greedy choice without making it worse; repeat until the optimal solution has become the greedy one. **Interval scheduling** (maximum number of non-overlapping intervals) is the canonical example: pick the interval that finishes earliest. Any optimal solution's first interval finishes no earlier than the greedy one, so replacing it with the greedy choice keeps everything feasible; induct on the rest. The alternative **greedy stays ahead** argument shows by induction that after $k$ choices greedy is at least as far along as any other solution.

Counterexamples are just as important. Coin change by largest coin first is optimal for 1, 5, 10, 25 but not for 1, 3, 4 (6 = 3 + 3, greedy gives 4 + 1 + 1). **Fractional knapsack** is greedy by value per unit weight; **0/1 knapsack** is not, because you cannot take the "best" fraction, and that is precisely why it needs DP. Before writing a proof, run your greedy against brute force on thousands of random small instances; a counterexample found in seconds saves an afternoon.

**Huffman coding** builds an optimal prefix code by repeatedly merging the two least frequent symbols with a priority queue; the proof shows that some optimal tree has the two rarest symbols as sibling leaves at the deepest level, then inducts after merging them. It is the compression step inside DEFLATE (zip, PNG) and JPEG. Dijkstra, Prim and Kruskal are all greedy too, as you have already proved.

Read Erickson chapter 4, then do the counterexample hunt before the proofs; it changes how you think about correctness.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 4: Greedy Algorithms',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/04-greedy.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Scheduling, stable matching, Huffman codes, and a candid warning about greedy proofs.',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition — 5.5 Data Compression (Huffman)',
              url: 'https://algs4.cs.princeton.edu/55compression/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture 12 (greedy and MST) and 13 (incremental improvement)',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'counterexample-hunt',
              title: 'Counterexample hunt',
              prompt:
                'Write a brute-force optimiser and a greedy solver for: coin change (fewest coins), 0/1 knapsack (by value density), interval scheduling (by earliest start, by shortest, by earliest finish), and job scheduling to minimise total completion time (by shortest processing time). Run 10,000 random small instances each and report, for every greedy rule, whether a counterexample exists and the smallest one found. Which rules survived?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'huffman-compressor',
              title: 'Huffman compressor',
              prompt:
                'Implement Huffman coding: build the tree with heapq, emit a canonical code table, encode a file to a bitstream with the table in a header, and decode it back. Verify round-trips on text and binary files. Report compression ratio against gzip on a 10 MB text file and explain the gap (Huffman does no repetition modelling). Prove the two rarest symbols are siblings in some optimal tree.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exchange-proofs',
              title: 'Exchange arguments',
              prompt:
                'Write complete exchange-argument proofs for: interval scheduling by earliest finish time; minimising total completion time by shortest job first; fractional knapsack by value density. Then explain in one paragraph why the 0/1 knapsack exchange fails.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Outline the exchange argument for earliest-finish-time interval scheduling.',
              answerOutline:
                'Let O be optimal with first interval o1 and greedy pick g1; g1 finishes no later than o1, so O with o1 replaced by g1 is still feasible and optimal; induct on the remaining intervals after g1.',
            },
            {
              question: 'Give a coin system where greedy change-making fails.',
              answerOutline:
                'Coins {1, 3, 4}, amount 6: greedy gives 4+1+1 (3 coins), optimal is 3+3 (2 coins).',
            },
            {
              question: 'Why is fractional knapsack greedy but 0/1 knapsack not?',
              answerOutline:
                'With fractions you can always fill remaining capacity with the best-density item, so the exchange goes through; with indivisible items a high-density item may not fit and leaving it out can be better.',
            },
          ],
        },
      ],
      project: {
        slug: 'sequence-aligner',
        title: 'Module project: a DNA sequence aligner',
        description: `Implement global (Needleman-Wunsch) and local (Smith-Waterman) alignment with affine gap penalties as dynamic programs, with traceback and Hirschberg's linear-space variant for the global case. Test on short sequences against brute force and on real sequences (download two homologous gene sequences from NCBI GenBank). Measure time and memory for sequences up to 20,000 bases and compare the quadratic-space and linear-space versions.`,
        deliverables: [
          'Aligner library with tests, including property tests (score symmetry, identical sequences score maximally)',
          'Alignment output for a real pair of sequences with the scoring parameters documented',
          'Timing and memory plots for the three variants',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add banded alignment and measure the speed-up for similar sequences'],
      },
    },
    {
      slug: 'advanced-topics',
      title: 'Advanced Topics',
      description:
        'String algorithms, amortised analysis done rigorously, and what to do when a problem is NP-hard.',
      lessons: [
        {
          slug: 'string-algorithms',
          title: 'String algorithms: KMP, tries and suffix arrays',
          summary:
            'Linear-time pattern matching with failure functions, tries for prefix queries, and suffix arrays for repeated substring queries.',
          estimatedMinutes: 110,
          objectives: [
            'Implement Knuth-Morris-Pratt and explain the failure function as the longest proper border',
            'Implement a trie and use it for prefix search and autocomplete',
            'Build a suffix array (and LCP array) and use it to count occurrences of a pattern in O(m log n)',
            'Choose between KMP, Rabin-Karp, Boyer-Moore-style skipping, tries and suffix structures for a given task',
          ],
          concepts: [
            'Border / failure function (prefix function)',
            'KMP: O(n + m) with no backtracking in the text',
            'Trie: O(L) insert and lookup, prefix enumeration',
            'Suffix array and LCP array',
            'Longest repeated substring via LCP',
            'Z-algorithm (mention)',
            'Aho-Corasick for many patterns (mention)',
          ],
          explanation: `Naive substring search slides the pattern along the text and compares at each position: $O(nm)$ in the worst case because it re-examines text characters after every partial match. **Knuth-Morris-Pratt** never moves backwards in the text. Its secret is the **failure function** (also called the prefix function) $\\pi[i]$: the length of the longest proper prefix of the pattern that is also a suffix of \`P[0..i]\`, called a border. When a mismatch happens after matching $i$ characters, the border tells you how many of those characters are still a valid match of a pattern prefix, so you shift the pattern to that position without rechecking the text. Computing $\\pi$ is itself a KMP-style loop over the pattern in $O(m)$, and the search is $O(n)$ by an amortised argument: the matched length increases at most once per text character and each failure-function jump decreases it.

A **trie** stores a set of strings as a tree where each edge is a character. Insert and lookup cost $O(L)$ for a string of length $L$, independent of how many strings are stored, and enumerating all strings with a prefix is a subtree walk: autocomplete, IP routing tables (longest prefix match) and spell-checking. Memory is the cost; compressed tries (Patricia) and ternary search tries address it.

A **suffix array** is the lexicographically sorted list of all suffixes of a text, stored as starting indices. With it, every occurrence of a pattern is a contiguous range found by binary search in $O(m \\log n)$; combined with the **LCP array** (longest common prefix of adjacent suffixes) it answers longest repeated substring, number of distinct substrings and more. Construction by sorting suffixes with a comparison sort is $O(n^2 \\log n)$ in the worst case; the prefix-doubling method is $O(n \\log^2 n)$ and sufficient here, and linear-time constructions exist. Suffix arrays are the engine of genome search tools and of Burrows-Wheeler compression.

Read Sedgewick 5.2-5.3 and the cp-algorithms pages for prefix function and suffix array, then implement all three with property tests against the naive methods.`,
          resources: [
            {
              title: 'Algorithms, 4th edition — 5.3 Substring Search (KMP, Boyer-Moore, Rabin-Karp)',
              url: 'https://algs4.cs.princeton.edu/53substring/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
              primary: true,
            },
            {
              title: 'Algorithms, 4th edition — 5.2 Tries',
              url: 'https://algs4.cs.princeton.edu/52trie/',
              type: 'textbook',
              cost: 'free',
              provider: 'Princeton University',
            },
            {
              title: 'cp-algorithms: Prefix function (Knuth-Morris-Pratt)',
              url: 'https://cp-algorithms.com/string/prefix-function.html',
              type: 'article',
              cost: 'free',
              provider: 'cp-algorithms',
              note: 'Clean derivation and the amortised proof; also see the suffix array page on the same site.',
            },
            {
              title: 'cp-algorithms: Suffix Array',
              url: 'https://cp-algorithms.com/string/suffix-array.html',
              type: 'article',
              cost: 'free',
              provider: 'cp-algorithms',
              note: 'The O(n log n) prefix-doubling construction and Kasai\'s LCP algorithm.',
            },
          ],
          exercises: [
            {
              slug: 'kmp',
              title: 'KMP with a tested failure function',
              prompt:
                'Implement prefix_function(p) and kmp_search(text, p) returning all match positions. Test with hypothesis against a naive search and str.find on random texts over a small alphabet (to force many partial matches). Count character comparisons for text length 10^6 and confirm they are below 2n. Benchmark against str.find and your Rabin-Karp on a 100 MB file with a pattern of length 20 and one of length 2000.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'trie-autocomplete',
              title: 'Trie-based autocomplete',
              prompt:
                'Build a trie over a 100,000-word dictionary with per-node counts. Implement insert, contains, starts_with(prefix) returning all completions, and top_k(prefix, k) using stored frequencies. Measure memory (number of nodes and bytes via sys.getsizeof or pympler) and compare lookup time with a sorted list plus bisect for the same prefix queries.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'suffix-array',
              title: 'Suffix array and LCP',
              prompt:
                'Implement suffix array construction by prefix doubling (O(n log^2 n) with sort, or O(n log n) with radix) and Kasai\'s LCP algorithm. Verify against sorting suffixes directly for n <= 2000. Use them to find the longest repeated substring and count distinct substrings of a 1 MB text, and to count occurrences of 1000 random patterns with binary search; compare the total query time with running KMP 1000 times.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the KMP failure function store and why does it avoid re-examining text characters?',
              answerOutline:
                'pi[i] is the length of the longest proper border of P[0..i]; on mismatch the matched prefix is known to end with that border, so the pattern can shift to align the border without rereading the text.',
            },
            {
              question: 'Why is KMP O(n + m) despite the inner while loop?',
              answerOutline:
                'Amortisation: the matched length increases by at most 1 per text character and every failure jump strictly decreases it, so total decreases are bounded by total increases, which is n.',
            },
            {
              question: 'When is a suffix array better than running KMP repeatedly?',
              answerOutline:
                'When the text is fixed and queried many times: after O(n log n) preprocessing each pattern costs O(m log n) rather than O(n + m).',
            },
          ],
        },
        {
          slug: 'amortized-analysis',
          title: 'Amortised analysis: aggregate, accounting and potential methods',
          summary:
            'Rigorous tools for bounding the cost of a sequence of operations, applied to counters, dynamic arrays, splay trees and union-find.',
          estimatedMinutes: 90,
          objectives: [
            'Apply the aggregate, accounting and potential methods to the same structure and relate them',
            'Define a potential function and prove amortised bounds for a binary counter and a dynamic array with shrinking',
            'Explain the amortised bound of splay trees and of union-find at a high level',
            'Distinguish amortised, expected and worst-case bounds and when each is the right guarantee',
          ],
          concepts: [
            'Amortised cost over a sequence of operations',
            'Aggregate method',
            'Accounting method: credits stored on elements',
            'Potential method: Phi(D) and amortised cost = actual + delta Phi',
            'Binary counter: O(1) amortised increment',
            'Hysteresis in shrinking arrays',
            'Splay trees and the access lemma (overview)',
          ],
          explanation: `An **amortised bound** says that any sequence of $n$ operations costs at most $n \\cdot c$ in total, even though a single operation may cost far more than $c$. It is a worst-case guarantee on the total (no probability involved) and it is the natural guarantee for data structures that occasionally reorganise themselves. You have already met three instances: dynamic arrays, two-stack queues and union-find. This lesson makes the arguments rigorous.

The **aggregate method** simply sums the total cost over the sequence and divides. For a binary counter incremented $n$ times, bit 0 flips every time, bit 1 every second time, bit $i$ every $2^i$-th time, so total flips are under $2n$ and increment is $O(1)$ amortised despite a single increment possibly flipping $\\log n$ bits.

The **accounting method** charges each operation an amortised cost, possibly more than its actual cost, and stores the excess as credit on specific parts of the structure to pay for later expensive operations. For the counter, charge 2 per increment: one pays for setting a bit to 1, the other sits on that bit to pay for clearing it later. Every 1-bit carries a credit, so clearing is prepaid. The invariant "credit is never negative" is the proof.

The **potential method** replaces credits with a function $\\Phi$ of the whole structure, with $\\Phi(D_0) = 0$ and $\\Phi \\ge 0$. Amortised cost $= \\text{actual} + \\Phi(D_i) - \\Phi(D_{i-1})$; summing telescopes, so total actual cost $\\le$ total amortised cost. For the counter $\\Phi$ is the number of 1-bits; for a dynamic array $\\Phi = 2 \\cdot \\text{size} - \\text{capacity}$ once it is at least half full. A shrinking array must shrink at one quarter full, not one half, or an adversary alternating push and pop at the boundary forces a copy every operation; the potential function makes this precise.

**Splay trees** restructure on every access so that the accessed node becomes the root; they have no balance invariant yet achieve $O(\\log n)$ amortised per operation, via a potential based on the sum of log subtree sizes. Read Erickson's amortisation notes and the 6.046 lecture, then do the potential proofs by hand; the exercises instrument the structures to watch the potential rise and fall.`,
          resources: [
            {
              title: 'MIT 6.046J (Spring 2015) — Lecture 10: Amortization: Amortized Analysis',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Table doubling, binary counter and the potential method, with 2-3 tree examples.',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Algorithms: additional notes on amortised analysis',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'From the "More Algorithms" notes linked on the book page: amortisation, scapegoat trees and splay trees.',
            },
            {
              title: 'Open Data Structures — Chapter 8, Scapegoat Trees (amortised rebuilding)',
              url: 'https://opendatastructures.org/ods-python/8_Scapegoat_Trees.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
            },
          ],
          exercises: [
            {
              slug: 'three-methods-three-structures',
              title: 'Three methods on three structures',
              prompt:
                'For the binary counter, the growing-and-shrinking dynamic array (grow at full, shrink at 1/4), and the two-stack queue, write out the aggregate, accounting and potential proofs. For the dynamic array, show by example what goes wrong when shrinking at 1/2 instead of 1/4: give a sequence of 2n operations that costs Theta(n^2).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'watch-the-potential',
              title: 'Instrument the potential',
              prompt:
                'Instrument your DynArray to log actual cost (elements copied + 1) and the potential 2*size - capacity after each of 10^5 random pushes and pops. Plot actual cost, potential and the running amortised cost. Verify numerically that total actual cost <= total amortised cost and that amortised cost per operation never exceeds 3.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'splay-tree',
              title: 'Splay tree, measured',
              prompt:
                'Implement a splay tree (zig, zig-zig, zig-zag). Verify it as a BST with your invariant checker. Compare with AVL on three access patterns of 10^6 operations: uniform random, Zipf-distributed keys, and sequential sweeps. Report total time and total rotations and explain where splaying wins (locality of reference) and where it loses.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does an amortised bound differ from an expected bound?',
              answerOutline:
                'Amortised is a deterministic worst-case bound on the total cost of any sequence; expected is an average over random choices (or inputs) and a single run may be worse.',
            },
            {
              question: 'Why must the potential function be non-negative and zero initially?',
              answerOutline:
                'So that the telescoping sum gives total actual cost = total amortised cost - Phi(final) + Phi(initial) <= total amortised cost.',
            },
            {
              question: 'Why shrink a dynamic array at one quarter full rather than one half?',
              answerOutline:
                'With the shrink threshold at 1/2, alternating push/pop at a capacity boundary triggers a resize every operation (Theta(n) each); 1/4 guarantees Theta(n) cheap operations between resizes.',
            },
          ],
        },
        {
          slug: 'np-hardness-and-coping',
          title: 'NP-hardness in practice: reductions, approximation and heuristics',
          summary:
            'What it means that a problem is NP-hard, how to recognise one, and the practical toolkit: exact search with pruning, approximation algorithms, and SAT/ILP solvers.',
          estimatedMinutes: 110,
          objectives: [
            'Explain P, NP, NP-hard and NP-complete informally and state what a polynomial-time reduction shows',
            'Recognise common NP-hard problems (SAT, vertex cover, TSP, knapsack, graph colouring) in disguise',
            'Implement a 2-approximation for vertex cover and the MST-based 2-approximation for metric TSP, and verify the ratio empirically',
            'Solve a moderately sized NP-hard instance with backtracking plus pruning, and with a SAT or ILP solver',
          ],
          concepts: [
            'Decision problems, P and NP, polynomial-time reduction',
            'NP-complete vs NP-hard',
            'Cook-Levin: SAT is NP-complete',
            'Approximation ratio',
            'Vertex cover 2-approximation; metric TSP via MST',
            'Branch and bound, backtracking with pruning',
            'SAT solvers and integer linear programming as practical tools',
            'Fixed-parameter and special-case tractability',
          ],
          explanation: `Some problems have resisted every attempt at a polynomial-time algorithm for fifty years: satisfiability, travelling salesman, graph colouring, knapsack, scheduling with constraints. **NP** is the class of decision problems whose yes-answers can be *verified* in polynomial time given a certificate. A problem is **NP-hard** if every problem in NP reduces to it in polynomial time, and **NP-complete** if it is also in NP. The Cook-Levin theorem makes SAT NP-complete; thousands of problems have been shown NP-complete by **reduction** from a known one. Whether P = NP is open, but the practical content is this: if you find a polynomial algorithm for one NP-complete problem, you have found one for all of them, which is why you should stop looking and change strategy.

Recognising NP-hardness is the first skill: "choose a subset subject to a budget", "find a path visiting everything", "assign colours with no conflicts", "schedule with precedence and deadlines" are warning signs. Confirm by reducing a known hard problem to yours, mapping instances so that yes maps to yes. The theory-of-computation subject does this carefully; here you need the recognition and the response.

The response is a toolkit. **Exact search with pruning** (backtracking, branch and bound) is often fine for the sizes you actually have: Held-Karp solves TSP to $n = 20$, DP solves knapsack for modest capacities, and a good SAT solver handles millions of clauses from industrial instances. **Approximation algorithms** give provable ratios: taking both endpoints of a maximal matching is a 2-approximation for vertex cover; doubling an MST and shortcutting is a 2-approximation for metric TSP (Christofides gets 1.5). **Heuristics** such as local search, simulated annealing and greedy construction give no guarantee but good answers in practice; measure them against the exact solver on small instances. **Special cases** are tractable: many NP-hard graph problems are polynomial on trees or bounded-treewidth graphs, and 2-SAT is linear.

Read Erickson chapter 12 and the 6.046 lectures on NP-completeness and approximation, then build the vertex cover and TSP approximations and measure their real ratios, which are typically far better than the worst-case bound.`,
          resources: [
            {
              title: 'Jeff Erickson — Algorithms, Chapter 12: NP-Hardness',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/12-nphard.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Reductions explained with unusual clarity; read the chapter then do the reduction exercise.',
              primary: true,
            },
            {
              title: 'MIT 6.046J (Spring 2015) — Lectures 16-17: Complexity, P, NP, NP-completeness and approximation algorithms',
              url: 'https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'PySAT — Python toolkit for SAT solving',
              url: 'https://pysathq.github.io/',
              type: 'tool',
              cost: 'free',
              provider: 'PySAT',
              note: 'Encode graph colouring or scheduling as CNF and let a real solver handle it.',
            },
            {
              title: 'OR-Tools (Google) — constraint programming and MIP solvers',
              url: 'https://developers.google.com/optimization',
              type: 'tool',
              cost: 'free',
              provider: 'Google',
              note: 'The CP-SAT solver is a practical exact tool for scheduling and assignment problems.',
            },
          ],
          exercises: [
            {
              slug: 'approximation-ratios',
              title: 'Vertex cover and TSP approximations, measured',
              prompt:
                'Implement the maximal-matching 2-approximation for vertex cover and an exact solver (backtracking with pruning or ILP) for graphs up to 30 vertices; report the measured ratio over 200 random graphs (expect ~1.1-1.4, never above 2). Implement the MST-doubling 2-approximation for metric TSP plus 2-opt local search, and compare with Held-Karp for n <= 15 and with each other for n = 200.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'reduce-and-solve-with-sat',
              title: 'Reduce to SAT and solve',
              prompt:
                'Encode graph 3-colouring as CNF (one variable per vertex-colour, clauses for "at least one colour", "at most one colour", and "adjacent vertices differ"). Solve with PySAT for random graphs of 50-500 vertices at edge density near the colourability threshold, and compare with a backtracking colourer with forward checking. Plot solve time against density for both and identify the hard region.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'recognise-and-reduce',
              title: 'Recognise the hard problem',
              prompt:
                'For each of five problem statements you write or find (e.g. "pick the fewest cameras to see every corridor", "split a list of numbers into two equal-sum halves", "find whether a set of jobs with durations and deadlines can be scheduled on one machine"), name the NP-hard problem it is, sketch the reduction direction, and state the practical approach you would take at n = 20, n = 2000 and n = 2 million.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a polynomial-time reduction from A to B show, and in which direction does hardness flow?',
              answerOutline:
                'If A reduces to B then B is at least as hard as A: a polynomial algorithm for B would give one for A. So reduce a known NP-hard problem TO your problem to show yours is NP-hard.',
            },
            {
              question: 'Why does doubling an MST give a TSP tour at most twice optimal, and what assumption is required?',
              answerOutline:
                'MST weight <= optimal tour (a tour minus an edge is a spanning tree); an Euler tour of the doubled MST has weight 2 * MST; shortcutting repeated vertices does not increase length under the triangle inequality (metric assumption).',
            },
            {
              question: 'Name three practical responses to an NP-hard problem and when each is appropriate.',
              answerOutline:
                'Exact search with pruning / SAT / ILP for small or structured instances; approximation algorithms when a guaranteed ratio matters; heuristics and local search for large instances where good-enough suffices; exploit special structure (trees, small parameters).',
            },
          ],
          relatedLessons: ['theory-of-computation/np-completeness/classic-np-complete-problems'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'algorithms-library-with-benchmarks',
    title: 'Capstone: an algorithms library with benchmarks and a measured-vs-predicted report',
    description: `Assemble the structures and algorithms you implemented during the subject into a single, tested, documented library: dynamic array, linked list, stack/queue/deque, binary heap, balanced BST, hash table (two collision strategies), sorting suite (insertion, merge, quick, heap, radix), union-find, graph with BFS/DFS/topological sort/Dijkstra/Bellman-Ford/Kruskal/Prim, a dynamic programming toolkit (LCS, edit distance, knapsack) and KMP string search.

Then do the science. For every structure and algorithm, write a benchmark that varies $n$ geometrically over at least four doublings on at least two input distributions (random, sorted or adversarial), fit the growth exponent, and compare with the theoretical bound. Where measurement and theory disagree (they will, for hash tables under cache pressure, for quicksort on sorted input, for linked lists at every size) explain why with evidence. Deliver a report with plots and a discussion section a reviewer could check.`,
    deliverables: [
      'A Python (or C++/Rust) package with a public API, docstrings, type hints and a README',
      'A pytest suite with at least one property-based test per structure and over 90 percent line coverage',
      'A benchmark script that regenerates every plot from scratch with one command',
      'A 6-10 page report: methods, results table of fitted exponents vs predicted, plots, discussion of discrepancies',
    ],
    estimatedHours: 40,
    stretchGoals: [
      'Port the three hottest routines to C or Rust via an extension module and quantify the speed-up',
      'Add a cache-oblivious or external-memory sort and measure it on a file larger than RAM',
      'Implement a persistent (immutable) balanced tree and compare its constant factors with the mutable one',
    ],
  },
  masteryChecklist: [
    'I can derive the asymptotic running time of code by counting and of recursive algorithms by solving recurrences',
    'I can benchmark an implementation honestly, fit its growth exponent and explain discrepancies from the model',
    'I can implement dynamic arrays, linked lists, heaps, balanced search trees and hash tables from scratch with tests',
    'I can choose and justify a sorting algorithm for a given input distribution, stability and memory constraint',
    'I can model a problem as a graph and apply BFS, DFS, topological sort, shortest-path and MST algorithms correctly',
    'I can recognise optimal substructure, write a DP recurrence, implement it top-down and bottom-up, and bound its cost',
    'I can argue that a greedy choice is safe with an exchange argument, or give a counterexample when it is not',
    'I can do an amortised analysis with the aggregate, accounting or potential method',
    'I can explain what NP-hardness means for a problem I face and choose an approximation, heuristic or exact approach accordingly',
  ],
});
