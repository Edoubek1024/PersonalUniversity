import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org. On Windows, tick "Add python.exe to PATH". On macOS or Linux, use `python3` to create the environment below.',
  'In the project folder, run `python -m venv .venv`, then activate it with `.venv\\Scripts\\Activate.ps1`, or `source .venv/bin/activate` on macOS or Linux. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
];

export default defineCoursework({
  subjectId: 'discrete-mathematics',
  machineProblems: [
    {
      slug: 'mp1-refute',
      title: 'refute: a counterexample finder for claims about relations',
      afterModule: 'sets-functions-relations',
      coversModules: ['logic-and-proofs', 'sets-functions-relations'],
      summary: 'Build a tool that reads a claim about sets, relations and functions in first-order logic, then searches every small model for a counterexample or counts the structures that satisfy it.',
      language: 'Python 3.12',
      estimatedHours: 14,
      overview: `Before you spend an hour proving a claim, it is worth spending a second trying to break it. Is every symmetric, transitive relation reflexive? It sounds plausible, and many students write a two-line "proof". \`refute\` answers in a moment: no, here is a counterexample on one element.

You will build the idea behind model finders such as Alloy. The input is a file of claims in first-order logic:

\`\`\`text
# claims/relations.txt
relation R/2
relation A/1
define serial(P) := forall x. exists y. P(x,y)
claim symmetric(R) & transitive(R) -> reflexive(R)
claim symmetric(R) & transitive(R) & serial(R) -> reflexive(R)
count equivalence(R)
\`\`\`

**The language.** Connectives from tightest to loosest are \`!\`, \`&\`, \`|\`, \`->\` (right associative) and \`<->\`. Quantifiers are \`forall\`, \`exists\` and \`exists!\` (exactly one). They can bind several variables, as in \`forall x y.\`, and their bodies extend as far right as possible. Atoms are \`R(x,y)\`, \`x = y\`, \`x != y\`, \`true\` and \`false\`.

**The method.** Fix a domain $\\{0, \\dots, n-1\\}$. Replace each quantifier with a finite AND or OR, and treat each fact such as \`R(1,2)\` as one Boolean variable. The claim is now propositional, so a truth table could decide it. But a binary relation on 5 elements has 25 variables and $2^{25}$ rows. So you assign variables one at a time and evaluate after each step, where each subformula is true, false or *unknown*. As soon as the whole formula is decided you stop, skipping every remaining row at once.

**Constraints.** Plain Python: tuples and dictionaries are enough for formulas, and no classes are needed. For input, \`open(path).read().splitlines()\` reads a claim file and \`sys.argv\` holds the command line, and that is all the file handling you need. A result of "no counterexample up to size 4" is evidence, not a proof, and part of this MP is saying which is which.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install pytest`. pytest runs every function named `test_something` in the `tests` folder and reports each `assert` that fails.'],
        structure: `refute/
├── refute.py          # command line: check and count
├── parser.py          # tokeniser and recursive descent parser
├── prelude.txt        # the standard definitions, written in the claim language
├── ground.py          # expands macros and quantifiers over a finite domain
├── search.py          # three-valued evaluation and backtracking
├── semantics.py       # independent direct evaluator used to verify results
├── claims/            # your claim files
├── tests/
└── CLAIMS.md          # your results and proofs`,
        commands: [
          { label: 'Search for counterexamples up to size 4', command: 'python refute.py check claims/relations.txt --max-size 4' },
          { label: 'Count the structures of size 5', command: 'python refute.py count claims/relations.txt --size 5' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        'A tokeniser and recursive descent parser handle the full language with the stated precedence, turn formulas into nested tuples, and report syntax errors with the character position.',
        'Claim files support `relation Name/arity`, `define`, `claim` and `count` lines and `#` comments. Macros such as `serial(P)` take relation names as arguments and expand before grounding.',
        '`prelude.txt` defines `reflexive`, `irreflexive`, `symmetric`, `antisymmetric`, `transitive`, `total`, `equivalence`, `partial_order`, `total_order`, `function`, `injective`, `surjective` and `bijective` in the claim language itself, not in Python.',
        '`ground(formula, n)` removes all quantifiers over a domain of size `n`, decides equalities on the spot, and numbers the Boolean variables in a fixed order: relations as declared, then each relation row by row.',
        '`evaluate(formula, assignment)` returns `True`, `False` or `None` for unknown using three-valued logic. For example, `False & unknown` is `False`, while `True & unknown` is unknown.',
        '`first_model` backtracks through the variables in order, trying `False` before `True`, and stops a branch once the formula is decided. `count_models` adds $2^k$ when a formula is decided with $k$ variables unassigned. Both report the number of search nodes visited.',
        '`check` negates each claim and tries sizes 1, 2, up to `--max-size`, so it reports a smallest counterexample and prints every relation as a set of tuples and as a grid. It exits with 0 if no counterexample was found, 1 if one was, and 2 for a syntax error.',
        '`semantics.py` evaluates a formula directly on Python sets with real quantifier loops and shares no code with the search. Every counterexample is confirmed by it before being printed.',
        'A test generates at least 200 random propositional formulas over at most 10 variables, and confirms that `count_models` matches a plain truth table on every one.',
        '`CLAIMS.md` lists at least 12 claims from Modules 1 and 2 with the result for each, and gives a written proof for at least 3 claims that were not refuted, showing what the proof adds to a bounded search.',
      ],
      acceptanceTests: [
        '`count equivalence(R)` gives 1, 2, 5, 15 and 52 for sizes 1 to 5, the Bell numbers, and size 5 visits at most 335,000 search nodes, which is 1% of the 33,554,432 rows of the truth table.',
        '`count` gives 1, 3, 19, 219 for `partial_order(R)` and 2, 13, 171, 3994 for `transitive(R)` at sizes 1 to 4. It gives 120 for `total_order(R)` and for `bijective(R)` at size 5, and 256 for `function(R)` at size 4.',
        '`symmetric(R) & transitive(R) -> reflexive(R)` has a counterexample at size 1 where `R` is empty. Adding `(forall x. exists y. R(x,y))` to the left side gives no counterexample up to size 4.',
        '`(forall x. exists y. R(x,y)) -> (exists y. forall x. R(x,y))` has its smallest counterexample at size 2, and its converse has none up to size 4. Each counterexample passes the check in `semantics.py`.',
        'For two equivalence relations `R` and `S`, the claim that their union is transitive has its smallest counterexample at size 3, and the same claim for their intersection has none up to size 3.',
        '`(forall x. A(x) & B(x) -> C(x)) -> (forall x. A(x) -> C(x)) | (forall x. B(x) -> C(x))` has the counterexample `A = {1}`, `B = {0}`, `C = {}` at size 2. Cantor\'s diagonal claim `(forall x. D(x) <-> !E(x,x)) -> forall x. exists y. !(D(y) <-> E(x,y))` has none up to size 3.',
      ],
      resources: [
        {
          title: 'Alloy Analyzer',
          url: 'https://alloytools.org/',
          type: 'tool',
          cost: 'free',
          provider: 'MIT',
          note: 'A professional model finder built on the same small-scope idea. Try one of its examples once your tool works.',
        },
        {
          title: 'OEIS A001035: number of partial orders on n labeled elements',
          url: 'https://oeis.org/A001035',
          type: 'documentation',
          cost: 'free',
          provider: 'OEIS',
          note: 'Published values to compare your counts against, along with the related sequences it links to.',
        },
      ],
      stretchGoals: [
        'Convert ground formulas to CNF and replace the search with a DPLL solver using unit propagation, then compare node counts at size 5.',
        'Count structures up to relabelling, and confirm that there are 1, 2, 5 and 16 unlabelled partial orders on 1 to 4 elements.',
      ],
    },
    {
      slug: 'mp2-rhotrace',
      title: 'rhotrace: functional graphs, Pollard rho and breaking toy RSA',
      afterModule: 'graphs-and-trees',
      coversModules: ['number-theory-modular', 'counting-combinatorics', 'graphs-and-trees'],
      summary: 'Analyse the graph of x^2 + c mod n, count such graphs exactly, and turn their shape into a factoring algorithm that breaks a 63-bit RSA key in under a second.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `Take the function $f(x) = x^2 + c \\bmod n$ and draw an arrow from every $x$ to $f(x)$. Every node has exactly one outgoing edge, so by the pigeonhole principle every walk must eventually repeat. The whole graph is therefore a set of cycles with rooted trees flowing into them, and a single walk traces the shape of the Greek letter rho: a tail, then a loop.

That picture is the basis of a real attack. If $n = pq$, the same walk taken mod $p$ lives in a much smaller graph and repeats sooner, after roughly $\\sqrt{p}$ steps by the birthday bound. When two walk positions agree mod $p$ but not mod $n$, then $\\gcd(|x - y|, n)$ reveals $p$. This is **Pollard's rho**.

You will combine all three recent modules. Graph theory describes the structure. Number theory explains it, because the Chinese remainder theorem splits the walk mod $n$ into independent walks mod $p$ and mod $q$, and also tells you how many squares exist. Counting tells you exactly how many functional graphs have each shape.

**The algorithm.** Use Floyd's cycle detection. Set \`x = y = x0\`. On each step, apply $f$ once to \`x\` and twice to \`y\`, then compute $d = \\gcd(|x - y|, n)$. If $1 < d < n$ you have a factor. If $d = n$ the attempt failed, so try the next value of $c$. Count one step per loop, with defaults \`c = 1\` and \`x0 = 2\`.

**Constraints.** Python standard library only. You may reuse your Module 3 toolkit, and \`math.gcd\` and three-argument \`pow\` are allowed. The RSA keys here are toys that you generate or that this page gives you, and the point is to see why real keys are 2048 bits or more.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install pytest matplotlib`.', 'Optional: install Graphviz from graphviz.org to render the `.dot` files.'],
        structure: `rhotrace/
├── rhotrace.py        # command line: graph, factor, crack
├── numtheory.py       # egcd, modinv, crt, is_prime, square_roots
├── funcgraph.py       # build, analyse, trace, to_dot
├── factor.py          # rho, factorise, crack
├── counting.py        # enumeration of all functions, and the formula
├── experiments.py     # regenerates every number and plot in the report
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Analyse one functional graph', command: 'python rhotrace.py graph --c 1 --n 13 --dot out.dot' },
          { label: 'Factor Mersenne 67', command: 'python rhotrace.py factor 147573952589676412927' },
          { label: 'Break the toy key', command: 'python rhotrace.py crack --n 9223372021822390277 --e 65537 --c 2615018332759492482' },
          { label: 'Regenerate the report data', command: 'python experiments.py' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`build(c, n)` returns the function as a list, and `analyse(f)` reports components, sorted cycle lengths, nodes on cycles, longest tail, leaves (in-degree 0), image size and maximum in-degree, in $O(n)$ time and without recursion.',
        'Property tests on random `c` and `n` confirm that in-degrees sum to `n`, each component holds exactly one cycle and has as many edges as nodes, and removing the cycle edges leaves a forest.',
        '`trace(c, n, start)` returns the tail length and cycle length of one walk, and `to_dot` writes the graph in Graphviz format with cycle nodes highlighted.',
        '`egcd`, `modinv` and `crt` are your own, and `is_prime` is Miller-Rabin using the first 12 primes as bases.',
        '`square_roots(a, p, q)` finds all roots of $a$ modulo $pq$ by finding the roots mod $p$ and mod $q$ and combining them with `crt`. A test confirms that the image of $x^2 \\bmod pq$ has $(p+1)(q+1)/4$ elements for odd primes $p \\ne q$, and explains why in a comment.',
        '`rho(n, c=1, x0=2)` follows the algorithm above exactly and returns the factor, or `None`, along with the step count. `factorise(n)` removes small primes first, then recursively splits the rest and returns the prime factors in sorted order.',
        '`crack(n, e, c)` factors `n`, computes `d`, decrypts `c`, and confirms the result by encrypting it again.',
        '`counting.py` enumerates all $n^n$ functions on $\\{0, \\dots, n-1\\}$ for $n \\le 6$, tallies them by number of cycles, and compares the connected count with $\\sum_{k=1}^{n} (n-1)!\\, n^{n-k} / (n-k)!$. `REPORT.md` derives that formula from cycles of length $k$ with rooted forests hanging off them.',
        '`experiments.py` measures the mean of steps divided by $\\sqrt{p}$ over 200 random primes each of 16, 20, 24 and 28 bits, and plots it. `REPORT.md` explains the result using the birthday bound and says why the cost of rho is exponential in the number of digits.',
      ],
      acceptanceTests: [
        'For $x^2 + 1 \\bmod 13$: 3 components, cycle lengths `[1, 1, 4]`, 6 nodes on cycles, longest tail 2, 6 leaves and image size 7. A walk from 2 on $x^2 + 1 \\bmod 1000$ has tail 2 and cycle length 6.',
        'The image of $x^2$ has size 51 mod 101, 24 mod 77 with maximum in-degree 4, and 2,652 mod 10,403, where $10403 = 101 \\cdot 103$.',
        '`rho(8051)` finds 97 in 3 steps. `rho(2**67 - 1)` finds 193707721 in 5,528 steps. `factorise(2**64 + 1)` is `[274177, 67280421310721]`, and `factorise(2**64 - 1)` is `[3, 5, 17, 257, 641, 65537, 6700417]`.',
        '`crack` on `n = 9223372021822390277`, `e = 65537`, `c = 2615018332759492482` finds the primes 2147483647 and 4294967291 in about 27,000 steps, and recovers `m = 27991785299731812`, which as 7 big-endian bytes spells `cracked`.',
        'For functions on 6 points, enumeration gives 46,656 total, split by number of cycles as 21,576, 18,694, 5,595, 745, 45 and 1. The connected counts for $n = 1$ to 6 are 1, 3, 17, 142, 1,569 and 21,576, matching the formula.',
        'For the 28-bit primes, the mean of steps divided by $\\sqrt{p}$ lies between 0.8 and 1.3 with a fixed random seed.',
      ],
      resources: [
        {
          title: 'Pollard\'s rho algorithm',
          url: 'https://en.wikipedia.org/wiki/Pollard%27s_rho_algorithm',
          type: 'article',
          cost: 'free',
          provider: 'Wikipedia',
          note: 'Includes the 8051 worked example, which is a useful test of your step count.',
        },
      ],
      stretchGoals: [
        'Replace Floyd with Brent\'s cycle detection and compare the gcd and function evaluation counts.',
        'Generate RSA keys of 64, 80, 96 and 112 bits, time the attack, and extrapolate to 2048 bits.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-seqsleuth',
    title: 'seqsleuth: paste in a sequence, get its recurrence, closed form and proof',
    repoName: 'seqsleuth',
    summary: 'Build a sequence detective that finds recurrences, generating functions, growth rates and periods, names what a sequence counts, and writes machine-checked induction proofs.',
    language: 'Python 3.12',
    estimatedHours: 50,
    overview: `Paste in \`1 3 11 41 153 571 2131 7953\` and \`seqsleuth\` tells you what you are looking at. It satisfies $a(n) = 4a(n-1) - a(n-2)$, its generating function is rational, it grows like $(2 + \\sqrt{3})^n$, it is periodic mod any $m$, and it counts the domino tilings of a $3 \\times 2n$ board, which the tool confirms by building the tilings. Give it an identity such as Cassini's, and it writes an induction proof whose steps it has checked.

The hook is that last part. For a large family of sequences, a proof by induction can be replaced by a finite calculation. If two sequences satisfy linear recurrences of orders $r$ and $s$, their difference satisfies one of order at most $r + s$, so if they agree on $r + s$ consecutive terms they agree forever. Your tool performs that check and writes out the argument, and you prove the theorem it relies on by hand.

The project is the whole course working together. Recurrences and generating functions do the identifying. Number theory drives fast term computation and period finding. Graphs and counting supply a catalog of real combinatorial objects, built by enumeration, so a match is checked and not just looked up. Probability appears through the waiting time for a pattern in coin flips, computed exactly from a generating function and confirmed by simulation.

**Key facts.** A recurrence of order $r$ is accepted only with at least $2r + 2$ terms, because any $2r$ numbers fit some recurrence of order $r$. Let $a(n)$ count coin-flip strings of length $n$ that avoid a pattern, with generating function $A(x)$, and let $T$ be the number of flips until the pattern appears. Then $E[T] = A(1/2)$ and $\\mathrm{Var}(T) = A'(1/2) + A(1/2) - A(1/2)^2$.

**Order bounds for proofs.** A constant or $c^n$ has order 1. Shifting keeps the order. Adding or subtracting adds orders. Multiplying multiplies them. A running sum adds 1.`,
    setup: {
      extensions: [...pythonExtensions, 'ms-python.debugpy', 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        'With the environment active, run `pip install -e ".[dev]"` to install the project with pytest, hypothesis, matplotlib and ruff.',
        'Install Git and create a free GitHub account for the repository and CI.',
      ],
      structure: `seqsleuth/
├── src/seqsleuth/
│   ├── recurrence.py      # exact recurrence finding and validation
│   ├── genfunc.py         # rational generating functions, roots, closed forms
│   ├── growth.py          # dominant root and Theta class
│   ├── modular.py         # fast terms, periods, CRT
│   ├── catalog/           # enumerators: strings, tilings, trees, graphs, partitions
│   ├── bijections.py      # verified bijections between catalog families
│   ├── prove.py           # identity parser, order bounds, proof writer
│   ├── waiting.py         # exact waiting times and Monte Carlo checks
│   └── cli.py
├── tests/
├── docs/PROOFS.md         # hand-written proofs of what the tool relies on
├── docs/REPORT.md         # results, plots and one discovery
├── examples/              # generated dossiers and proofs
├── .github/workflows/ci.yml
├── pyproject.toml
└── README.md`,
      commands: [
        { label: 'Identify a sequence', command: 'seqsleuth identify 1 3 11 41 153 571 2131 7953' },
        { label: 'Compute a huge term', command: 'seqsleuth term "a(n)=a(n-1)+a(n-2); a(0)=0; a(1)=1" 1000000000000000000 --mod 1000000007' },
        { label: 'Prove an identity', command: 'seqsleuth prove "sum(F, n) == F(n+2) - 1" --output examples/fib-sum.md' },
        { label: 'Compute a waiting time', command: 'seqsleuth waiting HTH --simulate 100000 --seed 1' },
        { label: 'Run the tests with coverage', command: 'pytest --cov=seqsleuth' },
      ],
    },
    requirements: [
      '`identify` finds the smallest-order linear recurrence with exact rational arithmetic, using Berlekamp-Massey or Gaussian elimination over `fractions.Fraction`. It accepts the result only under the $2r + 2$ rule, and otherwise reports that the evidence is insufficient.',
      'For an accepted recurrence, the tool prints the characteristic polynomial and the generating function $P(x)/Q(x)$. It gives an exact closed form when all roots are rational, including repeated roots, or for order 2 with quadratic surds, and it detects polynomial sequences by finite differences.',
      'The growth report gives the dominant root to 6 decimal places with its multiplicity $m$, states the class $\\Theta(n^{m-1} \\lambda^n)$, and checks it by showing that the ratio of $a(n)$ to the prediction settles.',
      '`term` computes $a(N) \\bmod m$ for $N$ up to $10^{18}$ with repeated squaring of the companion matrix, and uses only $O(r^3 \\log N)$ multiplications.',
      '`period` finds the period of a recurrence mod $m$ by walking the state space, whose size is at most $m^r$ by the pigeonhole argument. It also computes the period from the prime-power factors of $m$ using `lcm` and the Chinese remainder theorem, and tests that both methods agree.',
      'The catalog has at least 14 families, each with an enumerator that really builds the objects, and matches sequences up to an index offset. At least 4 families are graph based, including proper colourings of cycles, spanning trees of ladders and labelled trees, and at least 2 are not C-finite, such as Catalan and Bell numbers.',
      'At least 3 bijections between catalog families, such as Prufer codes and labelled trees, are implemented and checked injective and surjective on every object up to a size limit.',
      '`prove` parses identities over named sequences, computes the order bound from the rules above, checks that many consecutive cases with exact integers, and writes a Markdown proof containing the statement, the bound, a table of the cases and the concluding argument. A false identity produces the smallest counterexample and no proof.',
      '`waiting` computes $E[T]$ and $\\mathrm{Var}(T)$ exactly by enumerating avoiding strings, finding their recurrence and evaluating the generating function at $1/2$. It runs a seeded simulation with a standard error, and reports the Chebyshev sample size for a chosen accuracy $\\epsilon$ and failure rate $\\delta$.',
      '`docs/PROOFS.md` holds at least 8 hand-written proofs labelled by technique, including the order bound theorem by strong induction, eventual periodicity by pigeonhole, one combinatorial double-counting proof, and the waiting-time identity using linearity of expectation. `docs/REPORT.md` describes at least one pattern you found with the tool and then proved.',
    ],
    acceptanceTests: [
      '`identify 0 1 1 2 3 5 8 13 21 34` reports $a(n) = a(n-1) + a(n-2)$, generating function $x/(1 - x - x^2)$, dominant root 1.618034, and period 60 mod 10, and matches binary strings with no two adjacent 1s at an index offset of 2.',
      '`identify 1 3 11 41 153 571 2131 7953` reports $a(n) = 4a(n-1) - a(n-2)$, dominant root 3.732051, and a catalog match with domino tilings of $3 \\times 2n$.',
      '`identify 0 2 8 24 64 160 384 896 2048 4608` reports $a(n) = 4a(n-1) - 4a(n-2)$, a double root at 2, closed form $n \\cdot 2^n$ and class $\\Theta(n 2^n)$. `identify 0 1 5 14 30 55 91 140 204 285` reports order 4 with the root 1 repeated four times and closed form $n(n+1)(2n+1)/6$.',
      'The first 16 Catalan numbers are rejected as a recurrence, because the best fit has order 8 and needs 18 terms, and they still match the Dyck path family. The first 16 primes are also rejected, with no catalog match.',
      '`prove "sum(F, n) == F(n+2) - 1"` checks 6 cases and writes a proof. Cassini\'s identity `F(n+1)*F(n-1) - F(n)^2 == (-1)^n` for $n \\ge 1$ checks 9 cases. `prove "sum(F, n) == F(n+2)"` reports a counterexample at $n = 0$.',
      '$F(10^{18}) \\bmod (10^9 + 7)$ is 209783453, and the Fibonacci period is 3, 20, 60 and 1500 mod 2, 5, 10 and 1000. `waiting` gives $E[T] = 6$ and variance 22 for HH, 8 for HHT, 10 and variance 58 for HTH, and 14 for HHH. For HH with $\\epsilon = 0.1$ and $\\delta = 0.05$ the Chebyshev sample size is 44,000, and every simulation of 100,000 trials lies within 3 standard errors of the exact value.',
    ],
    coverage: [
      { module: 'logic-and-proofs', demonstrates: 'The generated proofs and `docs/PROOFS.md` use direct proof, contradiction, cases and counterexample, each labelled by technique.' },
      { module: 'sets-functions-relations', demonstrates: 'Verified bijections between catalog families show injectivity and surjectivity, and matching up to shift is an equivalence relation on sequences.' },
      { module: 'number-theory-modular', demonstrates: 'Fast terms use repeated squaring mod $m$, and period finding uses factorisation, `lcm` and the Chinese remainder theorem.' },
      { module: 'counting-combinatorics', demonstrates: 'The catalog enumerators, rational generating functions and the double-counting proof apply the counting rules directly.' },
      { module: 'graphs-and-trees', demonstrates: 'Graph families in the catalog count colourings, spanning trees and labelled trees, and the Prufer bijection confirms Cayley\'s formula.' },
      { module: 'recurrences-induction-and-growth', demonstrates: 'Recurrence solving, characteristic roots, the $\\Theta$ growth report and the order bound proved by strong induction are the core of the tool.' },
      { module: 'discrete-probability-intro', demonstrates: 'Waiting times use expectation, variance and a Chebyshev sample size, and are confirmed by seeded Monte Carlo simulation with standard errors.' },
    ],
    portfolio: [
      'The README opens with a terminal recording of `identify` on a surprising sequence, followed by a generated proof shown in full.',
      '`examples/` holds at least 5 generated dossiers and 3 generated proofs that render well on GitHub.',
      'GitHub Actions runs ruff and the pytest suite on every push, with a status badge in the README and at least 85% coverage on `src`.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, and a commit history made of small, descriptive commits.',
      'The README links to `docs/PROOFS.md` and states exactly which class of identities the tool can prove and which it cannot.',
    ],
    resources: [
      {
        title: 'The On-Line Encyclopedia of Integer Sequences',
        url: 'https://oeis.org/',
        type: 'documentation',
        cost: 'free',
        provider: 'OEIS Foundation',
        note: 'Use it to confirm your catalog entries by hand. Your tool should work offline and never query it.',
      },
      {
        title: 'Berlekamp-Massey algorithm',
        url: 'https://en.wikipedia.org/wiki/Berlekamp%E2%80%93Massey_algorithm',
        type: 'article',
        cost: 'free',
        provider: 'Wikipedia',
        note: 'One of the two allowed routes to the recurrence finder. It works unchanged over the rationals.',
      },
    ],
    stretchGoals: [
      'Add holonomic recurrences with polynomial coefficients, so the tool can recognise Catalan numbers, derangements and factorials by recurrence.',
      'Find recurrences from thousands of terms by working mod a large prime, then recover the rational coefficients with the Euclidean algorithm.',
    ],
  },
});
