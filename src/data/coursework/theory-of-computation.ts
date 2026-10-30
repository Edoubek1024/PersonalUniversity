import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org. On Windows, tick "Add python.exe to PATH". On macOS or Linux, use `python3` to create the environment below.',
  'In the project folder, run `python -m venv .venv`, then activate it with `.venv\\Scripts\\Activate.ps1`, or `source .venv/bin/activate` on macOS or Linux. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
];

export default defineCoursework({
  subjectId: 'theory-of-computation',
  machineProblems: [
    {
      slug: 'mp1-gramlab',
      title: 'gramlab: a grammar workbench from regex lexer to parse forest',
      afterModule: 'context-free-languages',
      coversModules: ['finite-automata-and-regular-languages', 'context-free-languages'],
      supersedesProject: true,
      summary: 'Build a workbench that reads a grammar file, generates a DFA lexer, converts to Chomsky normal form, counts parse trees with CYK, and checks a pushdown automaton against it.',
      language: 'Python 3.12',
      estimatedHours: 18,
      overview: `Module 1 gave you the machines that split text into tokens, and Module 2 gave you the machines that find structure in those tokens. \`gramlab\` joins them into one tool that does what a compiler front end does, but with every theorem from the lessons exposed and tested. You write a grammar in a file:

\`\`\`text
# grammars/expr.cfg
%token NUM  [0-9]+
%token ID   [a-z]+
%skip       [ \\t\\n]+
%start Expr

Expr   -> Expr "+" Term | Term
Term   -> Term "*" Factor | Factor
Factor -> "(" Expr ")" | NUM | ID
\`\`\`

Quoted strings are literal tokens, which may be whole keywords such as \`"if"\`, and \`%empty\` is the empty string. \`%token\` and \`%skip\` patterns use the regular expression syntax from Module 1, and spaces are skipped when a grammar has no \`%skip\` line.

\`gramlab\` builds a lexer through your own chain of regex, NFA, DFA and minimised DFA. It then answers the questions the course has been asking: Is this string in the language? How many parse trees does it have, and is this grammar therefore ambiguous on it? What are all of the strings up to a given length? What does a pushdown automaton for this grammar do on this input?

The important design choice is that CYK counts parses and does not just answer yes or no. Counting takes the same table with integers in it, and it turns ambiguity into a number. The ambiguous grammar \`E -> E "+" E | "a"\` has a Catalan number of parses, which is a satisfying result to see appear.

**Constraints.** Do not use Python's \`re\` module for tokens: every pattern goes through your own automata, and you should reuse your Module 1 toolkit. \`lark\` is allowed only in the benchmark. Parse counts are counts of derivations in the CNF grammar, which equal the counts in the original grammar when it has no empty or unit rules, so use such grammars for counting tests.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install pytest hypothesis lark matplotlib`.'],
        structure: `gramlab/
├── gramlab/
│   ├── automata.py        # regex to NFA to minimal DFA, from your Module 1 toolkit
│   ├── lexer.py           # longest-match lexer built from those DFAs
│   ├── grammar.py         # grammar file parser and the Grammar type
│   ├── enumerate.py       # bounded string and derivation enumeration
│   ├── cnf.py             # START, TERM, BIN, DEL and UNIT steps
│   ├── cyk.py             # table, parse counts and tree recovery
│   ├── pda.py             # CFG to PDA, and a nondeterministic simulator
│   ├── closure.py         # union, concatenation, star, intersection with a DFA
│   └── __main__.py        # the command line
├── grammars/              # expr.cfg, ambiguous.cfg, dangling.cfg, parens.cfg, mini.cfg
├── bench/
├── tests/
└── NOTES.md`,
        commands: [
          { label: 'Parse a string and print its tree', command: 'python -m gramlab parse grammars/expr.cfg --input "1 + 2 * 3"' },
          { label: 'Count the parse trees of a string', command: 'python -m gramlab count grammars/ambiguous.cfg --input "a + a + a + a"' },
          { label: 'List the language up to a length', command: 'python -m gramlab enum grammars/parens.cfg --max-length 10' },
          { label: 'Run the tests', command: 'python -m pytest' },
          { label: 'Run the benchmark', command: 'python bench/run.py --seed 1' },
        ],
      },
      requirements: [
        'The lexer compiles each `%token` and `%skip` pattern through Thompson NFA, subset construction and minimisation, uses longest match with earlier tokens winning ties, and reports the position of any character it cannot match.',
        'The grammar parser supports the file format above and rejects undefined variables, unreachable rules and a missing `%start` with clear messages.',
        '`enum` lists every string in the language up to a given length, and a property test confirms it agrees with CYK on all strings up to that length over small alphabets.',
        '`cnf.py` performs the five standard steps as separate tested functions and preserves the language, checked by bounded enumeration before and after on at least 10 grammars.',
        '`cyk.py` fills the table with exact integer parse counts, recovers one tree or all trees on request, and hides the helper variables made by the TERM and BIN steps when printing a tree.',
        '`pda.py` builds the leftmost-derivation PDA from a grammar. Its simulator explores configurations breadth first with a visited set and a stack bound, so that left-recursive grammars still terminate.',
        '`closure.py` implements union, concatenation and star on grammars, and intersection of a grammar with a DFA using the triple construction with variables $[p, A, q]$.',
        '`grammars/mini.cfg` is an unambiguous grammar for a small language with assignments, `if`, `while`, blocks and arithmetic. `NOTES.md` gives bounded evidence for its unambiguity and explains which constructs needed layering.',
        '`bench/run.py` compares your CYK with Lark Earley and LALR on the same inputs, fits a growth exponent for each, and `NOTES.md` explains the differences.',
      ],
      acceptanceTests: [
        'For `E -> E "+" E | "a"`, the strings with 1 to 6 copies of `a` have 1, 1, 2, 5, 14 and 42 parses, and the string with 17 copies has 35,357,670.',
        'In `expr.cfg`, `1 + 2 * 3` and `(1 + 2) * 3 + 4` each have exactly 1 parse, with `2 * 3` grouped under the `+` in the first, and `1 + * 2` has 0. A CNF parse tree of a string of length $n$ has $2n - 1$ internal nodes.',
        'For `S -> "if" "b" "then" S | "if" "b" "then" S "else" S | "a"`, the input `if b then if b then a else a` has 2 parses and `if b then if b then if b then a else a` has 3. Your rewritten matched and unmatched grammar gives 1 for the first.',
        'For `S -> "(" S ")" S | %empty`, there are 1, 1, 2, 5, 14, 42 and 132 strings of lengths 0, 2, 4, 6, 8, 10 and 12, each with exactly 1 parse.',
        'For the palindrome grammar over `a` and `b`, CYK and the PDA simulator agree on all 2,047 strings of length at most 10, accepting exactly 125.',
        'Intersecting `S -> "a" S "b" | %empty` with a DFA for `(aa)*(bb)*` gives exactly the empty string, `aabb`, `aaaabbbb` and `aaaaaabbbbbb` up to length 12. On expression inputs from 50 to 400 tokens, the fitted CYK exponent is between 2.2 and 3.3.',
      ],
      resources: [
        {
          title: 'Regular Expression Matching Can Be Simple And Fast',
          url: 'https://swtch.com/~rsc/regexp/regexp1.html',
          type: 'article',
          cost: 'free',
          provider: 'Russ Cox',
          note: 'A clear walk through Thompson\'s construction, useful if your Module 1 lexer needs rework.',
        },
      ],
      stretchGoals: [
        'Add an Earley parser and compare it with CYK on the same grammars without converting to CNF.',
        'Show a parse forest for an ambiguous string as a Graphviz graph that shares subtrees.',
      ],
    },
    {
      slug: 'mp2-bbhunt',
      title: 'bbhunt: hunting Busy Beavers at the edge of the computable',
      afterModule: 'complexity-classes',
      coversModules: ['turing-machines-and-computability', 'undecidability-and-reductions', 'complexity-classes'],
      summary: 'Enumerate every small Turing machine, prove most of the non-halting ones never stop, recompute the Busy Beaver values, and see where deciding halting runs out.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Of all Turing machines with $n$ states and two symbols, which one runs longest before halting on a blank tape? That number is the **Busy Beaver** value $S(n)$. It is known that $S(2) = 6$, $S(3) = 21$ and $S(4) = 107$. $S(5) = 47{,}176{,}870$ was proved only in 2024, by an online collaboration with a proof checked in Coq. $S$ grows faster than any computable function, because a program that computed it would solve the halting problem.

\`bbhunt\` recreates that hunt at small scale, so the halting problem stops being an abstract theorem and becomes a pile of machines on your desk. Most fall to simple arguments. Some need cleverer ones. A few resist every decider you write, and you have to reason about them by hand.

**Notation.** Machines use the community text format, one group per state, with the entries for reading 0 and 1 in order: \`1RB1LB_1LA1RZ\`. An entry \`1RB\` means write 1, move right, go to state B. \`Z\` is the halt. The tape starts blank, the machine starts in state A, and the halting transition counts as one step.

**Enumeration.** Do not list every table. Use *tree normal form*. Start with only \`A0 = 1RB\` defined and all other entries undefined. Run the machine. If it reaches an undefined entry after $s$ steps, record a halting candidate with $s + 1$ steps, where that entry writes a 1 and halts. If at least two entries are still undefined, fill the reached entry with every combination of write, move and next state, where next state is any state already named in the table or the first unnamed one, and recurse on each. Each table you run counts as one machine.

**Certificates.** A decider that says a machine never halts must return a certificate that a separate verifier checks by simulation, in time polynomial in the size of the certificate. This is the verifier definition of NP from Module 5, used for a real purpose: you do not have to trust your deciders.

**Constraints.** Python standard library, plus \`matplotlib\` for plots. Reuse your Module 3 simulator if you like. Use a step limit of 300 for enumeration.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [...pythonToolchain, 'With the environment active, run `pip install pytest matplotlib`.'],
        structure: `bbhunt/
├── bbhunt/
│   ├── machine.py         # format parser and simulator
│   ├── enumerate.py       # tree normal form enumeration
│   ├── deciders.py        # cycler, translated cycler, backward reasoning
│   ├── certificates.py    # independent verifiers
│   ├── reduction.py       # from Busy Beaver values to a halting decider
│   ├── diagonal.py        # time-bounded diagonalisation on the enumerated machines
│   └── steps.py           # step counts for single-tape deciders
├── machines/              # your .tm files for the complexity experiment
├── results/               # classification tables and plots
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Run one machine and show its result', command: 'python -m bbhunt run 1RB1LB_1LA0LC_1RZ1LD_1RD0RA' },
          { label: 'Hunt all 3-state machines', command: 'python -m bbhunt hunt --states 3 --limit 300 --out results/3.json' },
          { label: 'Hunt all 4-state machines', command: 'python -m bbhunt hunt --states 4 --limit 300 --out results/4.json' },
          { label: 'Verify every certificate in a results file', command: 'python -m bbhunt verify results/3.json' },
          { label: 'Run the tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`machine.py` parses the text format, simulates with an unbounded tape in both directions, and reports the steps taken, the ones left on the tape and the final state.',
        '`enumerate.py` implements tree normal form exactly as described, so that its machine counts match the tests below.',
        'A **cycler** decider proves non-halting by finding two steps with an identical state, head position and tape, and returns those two step numbers as its certificate.',
        'A **translated cycler** decider handles machines that repeat while drifting. It compares records where the head reaches a new extreme, requires the tape to match across the whole distance the head travelled back between them, and returns the two steps and the shift.',
        'A **backward reasoning** decider searches for chains of predecessor configurations from each undefined entry. If every chain dies out within a depth limit, and the machine has run past that depth, it cannot reach a halt.',
        '`certificates.py` verifies each kind of certificate by simulating from scratch, shares no code with the deciders, and rejects any certificate that does not hold.',
        '`reduction.py` implements `halts(machine)` for up to 4 states by running a machine for $S(n)$ steps. `REPORT.md` states this as a reduction, and uses it to prove that $S$ is not computable.',
        '`diagonal.py` runs every enumerated 2-state machine on the binary encoding of every machine index under a step budget, builds the halts-or-not table, and flips its diagonal to produce a language that no machine in the list decides within the budget.',
        'For $\\{a^n b^n\\}$, write a zig-zag single-tape decider and a crossing-off decider that halves the counts on each pass. Fit their step counts on $n$ from 16 to 512, and relate them to $TIME(n^2)$ and $TIME(n \\log n)$.',
        '`REPORT.md` includes a results table for 2, 3 and 4 states, written non-halting proofs for at least 3 holdouts, an explanation of why no finite set of deciders can finish the job for all $n$, and why a step bound written in unary and one written in binary change the complexity of bounded halting.',
      ],
      acceptanceTests: [
        '`1RB1LB_1LA1RZ` halts in 6 steps with 4 ones, `1RB1RZ_1LB0RC_1LC1LA` in 21 steps with 5 ones, and `1RB1LB_1LA0LC_1RZ1LD_1RD0RA` in 107 steps with 13 ones.',
        'Tree normal form visits 41 machines for 2 states, 4,057 for 3 states and 620,261 for 4 states. Of these, 15, 1,379 and 183,983 reach an undefined entry. The best step counts are 6, 21 and 107, and the most ones are 4, 6 and 13.',
        'From a blank tape, `1RB1RB_0LA1RZ` repeats its configuration at steps 1 and 3, and passes as a cycler. `1RB1RZ_1RA1RZ` marches right forever, and passes as a translated cycler with period 2 and shift +2. The verifier rejects false certificates, such as steps 1 and 4 for the first machine or a shift of +3 for the second.',
        'All 26 non-halting 2-state machines are proved, leaving 0 holdouts. At most 100 of the 2,678 non-halting 3-state machines and at most 21,800 of the 436,278 non-halting 4-state machines remain as holdouts, and every holdout runs 10,000 steps without halting.',
        '`halts(machine)` from `reduction.py` agrees with your enumeration on all 4,057 3-state machines, and treats a run past 21 steps as proof of non-halting.',
        'The diagonal language differs from row $i$ of the 2-state table at position $i$ for every $i$. The fitted slope for the zig-zag decider, which takes $2n^2 + 2n + 1$ steps in the standard construction, is between 1.9 and 2.1, and the crossing-off decider\'s slope is at most 1.35.',
      ],
      resources: [
        {
          title: 'The Busy Beaver Challenge: Story',
          url: 'https://bbchallenge.org/story',
          type: 'article',
          cost: 'free',
          provider: 'bbchallenge.org',
          note: 'How the collaboration settled the 5-state case, including the deciders used here. Read it once your cycler works.',
        },
        {
          title: 'Busy beaver',
          url: 'https://en.wikipedia.org/wiki/Busy_beaver',
          type: 'article',
          cost: 'free',
          provider: 'Wikipedia',
          note: 'Use it for the proof that the function is not computable, and for the known values.',
        },
      ],
      stretchGoals: [
        'Write a decider for bouncers, which sweep back and forth over a growing tape, and report how many holdouts it clears.',
        'Write a short standalone checker that replays your whole results file, so that a friend can confirm the table without trusting any of your deciders.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-allroads',
    title: 'allroads: every problem in this course, compiled to SAT',
    repoName: 'allroads',
    summary: 'Build a SAT solver, then compile regexes, grammars, Turing machines and NP-complete puzzles into it, and measure exactly where the method stops working.',
    language: 'Python 3.12',
    estimatedHours: 55,
    overview: `The Cook-Levin theorem says that every problem in NP reduces to SAT. \`allroads\` takes that literally. You write a CDCL SAT solver, the same algorithm inside industrial tools, and then put a different front end on it for each level of the course.

Give it a regex crossword, and it compiles the regexes into DFAs and unrolls them into clauses. Give it a grammar and a pattern, and it finds a string in both languages. Give it a Sudoku or a graph, and it uses the classic gadgets. The centrepiece is \`allroads tm\`, which is the Cook-Levin proof running as a program: it takes any Turing machine and a time bound, compiles the computation tableau to CNF, and hands it to your solver. The effect is that **the machine runs backwards**. Instead of giving it an input and asking for the output, you give it the accepting state and it finds the input.

The project then heads for the walls. A bounded version of the Post correspondence problem compiles to SAT for any bound, so raising the bound forever gives a recogniser. It always finds a match if one exists, but on some instances with no match it runs forever, and no improvement can fix that for every instance. Quantified Boolean formulas cannot be compiled without exponential blow-up, so they get a polynomial-space evaluator. Schöning's random walk trades certainty for simplicity, and a state-vector simulation runs Grover's algorithm on the same formulas. Each one is a measured demonstration of a theorem.

**The trust rule.** Nothing is believed because the solver said so. Every front end decodes a model back into its own terms, such as a filled grid, a string or a computation history, and an independent verifier checks it in polynomial time without sharing code with the encoder. This is the definition of NP used as an engineering practice.

**Constraints.** The solver and encoders are your own and use only the standard library. \`z3-solver\` is allowed in tests as an oracle, and \`matplotlib\` for plots. Pure Python is slow, so a large part of the challenge is choosing compact encodings and measuring them. All instances in the tests solve in seconds on a laptop with a sound two-watched-literal implementation.`,
    setup: {
      extensions: [...pythonExtensions, 'ms-python.debugpy', 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        'With the environment active, run `pip install -e ".[dev]"` to install the project with pytest, hypothesis, z3-solver (tests only), matplotlib and ruff.',
        'Install Git and create a free GitHub account for the repository and CI. Graphviz from graphviz.org is optional, for automaton diagrams.',
      ],
      structure: `allroads/
├── src/allroads/
│   ├── sat/               # cnf builder, DIMACS, CDCL, WalkSAT, Schoening
│   ├── regular.py         # regex to minimal DFA, and unrolling to clauses
│   ├── grammar.py         # CNF grammars, and CYK as clauses
│   ├── turing.py          # simulator and the Cook-Levin compiler
│   ├── puzzles/           # sudoku, queens, colouring, Hamiltonian path, subset sum
│   ├── karp.py            # polynomial-time reductions between problems
│   ├── pcp.py             # bounded PCP, and the breadth-first recogniser
│   ├── beyond/            # QBF, Savitch reachability, Grover simulator
│   ├── verify.py          # independent certificate checkers
│   └── cli.py
├── examples/              # .cnf, .tm, .cfg, puzzles
├── bench/                 # one script per theorem
├── tests/
├── docs/REPORT.md         # theorem by theorem measurements
├── docs/LIMITS.md         # the proofs of what this tool cannot do
├── .github/workflows/ci.yml
├── pyproject.toml
└── README.md`,
      commands: [
        { label: 'Solve a DIMACS file', command: 'allroads sat examples/php-5-4.cnf' },
        { label: 'Solve a regex crossword', command: 'allroads regex examples/crossword.txt' },
        { label: 'Run a Turing machine backwards', command: 'allroads tm examples/anbn.tm --input-length 6 --steps 36' },
        { label: 'Search for a PCP match up to a bound', command: 'allroads pcp examples/sipser.pcp --max-length 12' },
        { label: 'Run the tests with coverage', command: 'pytest --cov=allroads' },
        { label: 'Regenerate every measurement', command: 'python bench/run_all.py --seed 1' },
      ],
    },
    requirements: [
      'The CDCL solver has two-watched-literal propagation, first-UIP clause learning, non-chronological backtracking, an activity-based variable order and restarts. It reads DIMACS, prints a model or UNSAT, and agrees with brute force on all random formulas of up to 16 variables in the test suite.',
      'One `CNF` builder with named variables, at-most-one and Tseitin helpers serves every front end. Every satisfying result is decoded and checked by a verifier in `verify.py` that shares no code with the encoder.',
      '`allroads regex` supports character classes and negated classes, compiles patterns through NFA, subset construction and minimisation, and unrolls each DFA over a fixed length with one state variable per position, which solves regex crosswords and reports the DFA sizes.',
      '`allroads grammar` converts a grammar to CNF and encodes the CYK table as clauses, finding strings of a given length in $L(G) \\cap L(R)$, and counts them with blocking clauses.',
      '`allroads tm` reads a single-tape machine that may be nondeterministic, with a time bound $t$ and an input length, and builds a tableau with $O(t^2)$ variables, returning an accepted input and its computation history. The history is checked by your simulator, step by step.',
      '`puzzles/` includes Sudoku, N-queens, graph colouring, Hamiltonian path and subset sum. `karp.py` implements SAT to 3SAT, 3SAT to CLIQUE, CLIQUE to INDEPENDENT-SET, 3SAT to VERTEX-COVER, 3SAT to SUBSET-SUM, and one further reduction of your own, each tested on random instances in both directions with solutions mapped back.',
      '`allroads pcp` encodes matches of up to $k$ dominoes as SAT for a chosen $k$ and reports a match or `UNKNOWN up to k`. A breadth-first search over overhang strings cross-checks it, and may report `NO MATCH` only if it runs out of overhangs. `docs/LIMITS.md` proves why this cannot be extended to a decider, and explains the reduction from $A_{TM}$ using computation histories.',
      '`beyond/` evaluates QBF recursively in space polynomial in the formula, reporting the maximum depth used, and compares this with expanding it to SAT. It also includes generalised geography compiled to QBF, and Savitch reachability with its $O(\\log^2 n)$ recursion measured against breadth-first search.',
      'Schöning\'s random walk for 3-SAT and a state-vector Grover simulator run on the same formulas as the CDCL solver. The tool measures success rate against repetitions, and oracle queries against $\\sqrt{N}$.',
      '`docs/REPORT.md` connects each measurement to a theorem: subset-construction blow-up, cubic CYK, $t^2$ tableau size, polynomial reduction sizes, verify time against solve time, and SAT cost at the 4.26 clause ratio. It ends with a map that separates what is proven from what is conjectured.',
    ],
    acceptanceTests: [
      'The pigeonhole formula for 5 pigeons and 4 holes has 20 variables and 45 clauses and is UNSAT. Sudoku uses 729 variables and 11,988 clauses before the givens, and the puzzle `8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4..` has a unique solution beginning `812753649`. N-queens for $n = 8$ has 92 solutions.',
      'The crossword with rows `HE|LL|O+` and `[PLEASE]+` and columns `[^SPEAK]+` and `EP|IP|EF` has the unique solution `HE` over `LP`. The pattern `(a|b)*a` followed by $k - 1$ copies of `(a|b)` gives a minimal DFA of $2^k$ states, so 1,024 for $k = 10$.',
      'For the grammar `S -> "(" S ")" S | %empty`, there are 5 strings of length 6, and exactly 3 of them match `\\(\\(.*`: `((()))`, `(()())` and `(())()`.',
      'With the zig-zag decider for $\\{a^n b^n : n \\ge 1\\}$, which takes $2n^2 + 2n + 1$ steps, `allroads tm` with input length 6 and $t = 36$ finds only `aaabbb`, in under 60 seconds. With input length 5 and $t = 40$ it reports UNSAT.',
      'The Petersen graph is 3-colourable but not 2-colourable, and has a Hamiltonian path but no Hamiltonian cycle. $K_4$ is not 3-colourable. Subset sum on `{3, 34, 4, 12, 5, 2}` says yes for 9 and no for 30.',
      'Sipser\'s dominoes `b/ca`, `a/ab`, `ca/a`, `abc/c` give a match of 5 dominoes spelling `abcaaabc`. For `abc/ab`, `ca/a`, `acc/ba`, the breadth-first search reports `NO MATCH` after 1 overhang. For `ab/a`, `ba/b`, both searches report `UNKNOWN up to 12`, even though a length argument shows there is no match. $\\forall x \\exists y (x \\leftrightarrow y)$ is true, and $\\exists y \\forall x (x \\leftrightarrow y)$ is false. Grover on 10 qubits with one marked item succeeds with probability above 0.99 after 25 iterations.',
    ],
    coverage: [
      { module: 'finite-automata-and-regular-languages', demonstrates: 'Regex crosswords use your NFA, subset construction and minimisation, and the blow-up benchmark measures the exponential worst case.' },
      { module: 'context-free-languages', demonstrates: 'Grammar conversion to CNF and CYK as clauses find strings in the intersection of a context-free and a regular language.' },
      { module: 'turing-machines-and-computability', demonstrates: 'The simulator runs single-tape and nondeterministic machines, and machine descriptions are data that the compiler reads.' },
      { module: 'undecidability-and-reductions', demonstrates: 'Bounded PCP gives a recogniser that cannot settle every instance, and `docs/LIMITS.md` proves why by reduction.' },
      { module: 'complexity-classes', demonstrates: 'Independent polynomial-time verifiers embody NP, and the benchmarks compare verification cost with search cost.' },
      { module: 'np-completeness', demonstrates: 'The Cook-Levin compiler, Karp reductions with gadgets, and the CDCL solver are the heart of the project.' },
      { module: 'beyond-np', demonstrates: 'QBF and geography show PSPACE, Savitch shows space-bounded reachability, Schöning shows randomness, and Grover shows the quantum square-root speedup.' },
    ],
    portfolio: [
      'The README opens with a terminal recording of `allroads tm` finding an input for a machine, and a table of everything the tool can compile.',
      'A stranger can clone the repository and run every command in the README in under five minutes, with results that match.',
      'GitHub Actions runs ruff and the test suite on every push, with a status badge in the README and at least 85% coverage on `src`.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, and a commit history made of small, descriptive commits.',
      '`docs/REPORT.md` shows every plot beside the theorem it illustrates, and `docs/LIMITS.md` is linked from the README as the honest list of what cannot be done.',
    ],
    resources: [
      {
        title: 'SATLIB Benchmark Problems',
        url: 'https://www.cs.ubc.ca/~hoos/SATLIB/benchm.html',
        type: 'dataset',
        cost: 'free',
        provider: 'University of British Columbia',
        note: 'Standard DIMACS instances. The uniform random `uf50` and `uf100` sets are good tests for a Python solver.',
      },
      {
        title: 'Conflict-driven clause learning',
        url: 'https://en.wikipedia.org/wiki/Conflict-driven_clause_learning',
        type: 'article',
        cost: 'free',
        provider: 'Wikipedia',
        note: 'A worked example of first-UIP learning on an implication graph.',
      },
    ],
    stretchGoals: [
      'Output DRAT proofs of UNSAT results, so that an external checker can confirm them.',
      'Compile a universal Turing machine into the tableau, and report how large the formula becomes.',
      'Add a small web page that shows the tableau of a satisfying run as a grid.',
    ],
  },
});
