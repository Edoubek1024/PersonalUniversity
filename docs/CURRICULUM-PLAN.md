# Curriculum plan

Nine categories, 25 core tracks, 48 additional recommended subjects. Each subject file in
`src/data/subjects/` is the source of truth for its own content; this document fixes the
subject IDs, categories, prerequisite graph and the module outline each subject must cover.
Subject IDs below are final and are referenced by `src/data/paths.ts` and by
`prerequisites` arrays.

Legend: **Diff** = difficulty, **Hrs** = estimated hours, **Core** = one of the 25 core tracks.

## Computer Science (`cs`)

| ID | Title | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|
| `programming-fundamentals` | Programming Fundamentals with Python | beginner | 80 | — | yes |
| `discrete-mathematics` | Discrete Mathematics for Computer Science | beginner | 70 | — | yes |
| `data-structures-algorithms` | Data Structures and Algorithms | intermediate | 110 | programming-fundamentals, discrete-mathematics | yes |
| `computer-architecture` | Computer Architecture: From NAND to Tetris | intermediate | 90 | programming-fundamentals | yes |
| `operating-systems` | Operating Systems | advanced | 100 | computer-architecture, systems-programming | yes |
| `computer-networks` | Computer Networks | intermediate | 70 | programming-fundamentals | yes |
| `databases` | Database Systems | intermediate | 70 | programming-fundamentals, data-structures-algorithms | yes |
| `software-engineering` | Software Engineering and Testing | intermediate | 80 | programming-fundamentals, data-structures-algorithms | yes |
| `compilers` | Compilers and Programming Languages | advanced | 110 | data-structures-algorithms, computer-architecture, theory-of-computation | yes |
| `machine-learning` | Machine Learning | advanced | 100 | programming-fundamentals, math-methods, probability-statistics | yes |
| `deep-learning` | Deep Learning | advanced | 90 | machine-learning | yes |
| `systems-programming` | Systems Programming in C and Rust | intermediate | 80 | programming-fundamentals, computer-architecture | additional |
| `theory-of-computation` | Theory of Computation | advanced | 70 | discrete-mathematics | additional |
| `cybersecurity` | Cybersecurity | advanced | 90 | computer-networks, operating-systems, systems-programming | additional |
| `embedded-systems-iot` | Embedded Systems and IoT | intermediate | 90 | systems-programming, computer-architecture | additional |
| `distributed-systems` | Distributed Systems | advanced | 90 | operating-systems, computer-networks, databases | additional |
| `rust-programming` | Rust Programming | intermediate | 80 | programming-fundamentals | additional |
| `cpp-programming` | Modern C++ | intermediate | 130 | programming-fundamentals | additional |
| `typescript-web` | TypeScript for the Web | intermediate | 30 | programming-fundamentals | additional |
| `go-programming` | Go for Backend Services | intermediate | 32 | programming-fundamentals | additional |
| `bash-scripting` | Bash and the Command Line | beginner | 28 | programming-fundamentals | additional |

Every CS subject also has two machine problems and a final project in `src/data/coursework/`.
In the UI the final project replaces the subject's capstone; the `capstone` data stays in the
subject file. See "Coursework" in `docs/AUTHORING.md`.

## Data Science (`data-science`)

These eight courses follow the Data Science core of the University of Illinois Urbana-Champaign
BS in Information Sciences + Data Science (2026-27 catalog). The topics come from the public
catalog descriptions, and the content here is original. It is not affiliated with Illinois.

| ID | Title | Follows | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|---|
| `data-science-discovery` | Data Science Discovery | STAT/CS/IS 107 | beginner | 70 | — | additional |
| `calculus-for-data-science` | Calculus for Data Science | MATH 220 | beginner | 80 | — | additional |
| `linear-algebra-for-data-science` | Linear Algebra for Data Science | MATH 227 | intermediate | 60 | data-science-discovery | additional |
| `data-science-exploration` | Data Science Exploration | STAT 207 | intermediate | 80 | data-science-discovery | additional |
| `algorithms-for-data-science` | Algorithms and Data Structures for Data Science | CS 277 | intermediate | 80 | data-science-exploration, calculus-for-data-science | additional |
| `modeling-and-learning` | Modeling and Learning in Data Science | CS 307 | intermediate | 90 | data-science-exploration, linear-algebra-for-data-science | additional |
| `data-management-reproducibility` | Data Management, Curation and Reproducibility | IS 477 | intermediate | 60 | data-science-exploration | additional |
| `data-ethics-and-policy` | Ethics and Policy for Data Science | IS 467 | intermediate | 50 | data-science-discovery | additional |

Every data science subject also has two machine problems and a final project, like the CS
subjects. These are practical, applied courses. They lead into `probability-statistics`,
`machine-learning`, `data-structures-algorithms` and `math-methods`, which go deeper, and they
link to those courses instead of competing with them.

## Mathematics (`math`)

These follow University of Illinois Urbana-Champaign MATH courses, chosen to cover the calculus
sequence and all the groups of the mathematics minor (MATH 241 plus five electives, 2026-27
catalog). Topics come from public catalog descriptions, and the content here is original. It is
not affiliated with Illinois. Math subjects use module projects and a capstone, like the physics
subjects, and do not have machine problems.

| ID | Title | Follows | Minor group | Diff | Hrs | Prerequisites |
|---|---|---|---|---|---|---|
| `calculus-1` | Calculus I | MATH 220/221 | prerequisite | beginner | 100 | — |
| `calculus-2` | Calculus II | MATH 231 | prerequisite | beginner | 80 | calculus-1 |
| `calculus-3` | Calculus III | MATH 241 | required | intermediate | 100 | calculus-2 |
| `linear-algebra-computational` | Linear Algebra with Computational Applications | MATH 257 | algebra | intermediate | 70 | calculus-1 |
| `differential-equations` | Introduction to Differential Equations | MATH 285 | analysis | intermediate | 80 | calculus-3 |
| `higher-mathematics` | Introduction to Higher Mathematics | MATH 314 | fundamentals | intermediate | 90 | calculus-3 |
| `abstract-linear-algebra` | Abstract Linear Algebra | MATH 416 | algebra | advanced | 80 | higher-mathematics, linear-algebra-computational |
| `ode-theory` | Differential Equations | MATH 441 | analysis | advanced | 70 | differential-equations, higher-mathematics |
| `partial-differential-equations` | Introduction to Partial Differential Equations | MATH 442 | analysis | advanced | 70 | differential-equations |
| `abstract-algebra` | Introduction to Abstract Algebra | MATH 417 | algebra | advanced | 80 | higher-mathematics |
| `real-analysis` | Elementary Real Analysis | MATH 444 | analysis | advanced | 90 | higher-mathematics |
| `complex-variables` | Applied Complex Variables | MATH 446 | analysis | advanced | 70 | calculus-3 |
| `number-theory` | Number Theory | MATH 453 | algebra | intermediate | 60 | higher-mathematics |
| `graph-theory` | Graph Theory | MATH 412 | discrete | intermediate | 60 | higher-mathematics |
| `combinatorics` | Introduction to Combinatorics | MATH 413 | discrete | intermediate | 60 | higher-mathematics |
| `probability-theory` | Probability Theory | MATH 461 | probability | intermediate | 70 | calculus-3 |
| `optimization` | Linear and Nonlinear Programming | MATH 482, 484 | discrete, analysis | advanced | 80 | calculus-3, linear-algebra-computational |
| `differential-geometry` | Differential Geometry | MATH 423 | geometry | advanced | 70 | calculus-3, linear-algebra-computational |
| `applied-linear-algebra` | Applied Linear Algebra | MATH 415 | algebra | intermediate | 70 | calculus-3 |

`optimization` merges MATH 482 and 484 into one course. `applied-linear-algebra` (MATH 415) is
the engineering route, with equilibrium problems and linear dynamical systems, worked mostly by
hand. `linear-algebra-computational` (MATH 257) is the computing route, and the two overlap. `calculus-for-data-science` and
`linear-algebra-for-data-science` remain as the data-driven versions, and `math-methods` remains
the fast physics-oriented review.

## Statistics (`statistics`)

Moved out of Computer Science and Mathematics on 2026-11-03. IDs did not change, so progress is
unaffected. `probability-statistics` keeps its machine problems and final project.

| ID | Title | Follows | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|---|
| `probability-statistics` | Probability and Statistics for Scientists | — | intermediate | 70 | math-methods | additional |
| `statistics-and-probability-2` | Statistics and Probability II | STAT 410 | advanced | 80 | probability-theory, calculus-3 | additional |

## Economics (`economics`)

These follow the University of Illinois Urbana-Champaign principles courses ECON 102 and 103.
Topics come from the public catalog descriptions, and the content here is original. It is not
affiliated with Illinois. The two courses can be taken in either order, as at Illinois. They use
module projects and a capstone built on real data, and have no machine problems.

| ID | Title | Follows | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|---|
| `microeconomic-principles` | Microeconomic Principles | ECON 102 | beginner | 80 | — | additional |
| `macroeconomic-principles` | Macroeconomic Principles | ECON 103 | beginner | 76 | — | additional |

## Physics (`physics`)

| ID | Title | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|
| `math-methods` | Mathematical Methods for Physics | intermediate | 120 | — | yes |
| `classical-mechanics` | Classical Mechanics | intermediate | 100 | math-methods | yes |
| `waves-optics` | Waves, Oscillations and Optics | intermediate | 60 | classical-mechanics | yes |
| `electromagnetism` | Electromagnetism | advanced | 100 | classical-mechanics, math-methods | yes |
| `thermodynamics-statistical-mechanics` | Thermodynamics and Statistical Mechanics | advanced | 90 | classical-mechanics, probability-statistics | yes |
| `quantum-mechanics` | Quantum Mechanics | advanced | 110 | waves-optics, math-methods | yes |
| `relativity` | Special and General Relativity | expert | 100 | electromagnetism, classical-mechanics | yes |
| `computational-physics` | Computational Physics | advanced | 80 | programming-fundamentals, classical-mechanics, math-methods | yes |
| `physics-mechanics` | University Physics: Mechanics (PHYS 211) | beginner | 100 | calculus-1 | additional |
| `physics-electricity-magnetism` | University Physics: Electricity and Magnetism (PHYS 212) | intermediate | 100 | physics-mechanics, calculus-2 | additional |
| `physics-thermal` | University Physics: Thermal Physics (PHYS 213) | intermediate | 50 | physics-mechanics | additional |
| `physics-quantum` | University Physics: Quantum Physics (PHYS 214) | intermediate | 50 | physics-electricity-magnetism | additional |

## Chemistry (`chemistry`)

These follow the University of Illinois Urbana-Champaign first-semester general chemistry
lecture (CHEM 102) and lab (CHEM 103). Topics come from the public catalog descriptions, the
department's CHEM 102 topic sheet and the CHEM 103 lab schedule; the content is original and not
affiliated with Illinois. Every lesson ends with a multiple-choice quiz. The lab is taken
alongside the lecture and replaces the bench with simulated experiments and written lab reports.

| ID | Title | Follows | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|---|
| `general-chemistry-1` | General Chemistry I | CHEM 102 | beginner | 88 | — | additional |
| `general-chemistry-lab-1` | General Chemistry Lab I | CHEM 103 | beginner | 86 | — (take alongside `general-chemistry-1`) | additional |

## Astronomy (`astronomy`)

| ID | Title | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|
| `intro-astronomy` | Introduction to Astronomy | beginner | 60 | — | yes |
| `observational-astronomy` | Observational Astronomy and Data Analysis | intermediate | 80 | intro-astronomy, programming-fundamentals, probability-statistics | yes |
| `planetary-science-exoplanets` | Planetary Science and Exoplanets | intermediate | 70 | intro-astronomy, classical-mechanics | yes |
| `stellar-astrophysics` | Stellar Astrophysics | advanced | 80 | intro-astronomy, thermodynamics-statistical-mechanics, quantum-mechanics | yes |
| `galaxies-cosmology` | Galaxies and Cosmology | advanced | 90 | stellar-astrophysics, relativity | yes |
| `high-energy-astrophysics` | High-Energy Astrophysics and Compact Objects | expert | 70 | stellar-astrophysics, relativity, electromagnetism | yes |

## Miscellaneous (`misc`)

| ID | Title | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|
| `startup-founding-and-funding` | Building and Funding a Startup | beginner | 70 | — | additional |

## Module outlines

Each subject must cover at least the modules listed (authors may add one or two more).
3-8 lessons per module. Module slugs are suggestions; lesson slugs are the author's choice.

### programming-fundamentals
1. `getting-started` — setup, REPL, variables, types, expressions, errors
2. `control-flow-functions` — conditionals, loops, functions, scope, recursion intro
3. `data-collections` — lists, dicts, sets, tuples, strings, comprehensions
4. `programs-and-files` — modules, files, CSV/JSON, CLI programs, exceptions
5. `objects-and-abstraction` — classes, dataclasses, interfaces, composition
6. `testing-debugging-tooling` — pytest, debugging, virtual envs, git basics, style
7. `thinking-like-an-engineer` — complexity intuition, decomposition, a second language glimpse (C or JS)
Capstone: a complete command-line application with tests and a README.

### discrete-mathematics
1. `logic-and-proofs` 2. `sets-functions-relations` 3. `number-theory-modular` 4. `counting-combinatorics` 5. `graphs-and-trees` 6. `recurrences-induction-and-growth` 7. `discrete-probability-intro` (link to probability-statistics)
Capstone: a written portfolio of proofs plus a program that verifies or explores a combinatorial result.

### data-structures-algorithms
1. `analysis-foundations` 2. `linear-structures` 3. `sorting-and-searching` 4. `trees-and-heaps` 5. `hashing` 6. `graphs` 7. `dynamic-programming-and-greedy` 8. `advanced-topics` (string algorithms, amortized analysis, NP-hardness link)
Capstone: an algorithms library with benchmarks and a report on measured vs predicted complexity.

### computer-architecture (Nand2Tetris + CS:APP data representation)
1. `boolean-logic-and-gates` 2. `arithmetic-and-alu` 3. `sequential-logic-and-memory` 4. `machine-language-and-cpu` 5. `assembler` 6. `performance-pipelining-caches` 7. `data-representation` (ints, floats, endianness)
Capstone: the full Hack computer built in HDL, running a program you wrote and assembled.

### operating-systems — written (see src/data/subjects/operating-systems.ts)

### computer-networks
1. `internet-architecture` 2. `application-layer` (HTTP, DNS, email, sockets) 3. `transport-layer` (UDP, TCP, congestion control) 4. `network-layer` (IP, routing, NAT, IPv6) 5. `link-layer-and-wireless` 6. `network-security-and-measurement`
Capstone: a reliable transport protocol over UDP plus an HTTP server, with Wireshark analysis.

### databases
1. `relational-model-and-sql` 2. `advanced-sql-and-design` (normalization, indexes) 3. `storage-and-indexing` 4. `query-processing-and-optimization` 5. `transactions-and-concurrency` 6. `recovery-and-distributed-data` 7. `beyond-relational` (NoSQL, key-value, document, graph)
Capstone: a small relational engine (storage, B+tree, simple SQL) or a full data-backed application with benchmarks.

### software-engineering
1. `version-control-and-collaboration` 2. `design-principles-and-patterns` 3. `testing-strategy` (unit, property, integration, TDD) 4. `code-quality-and-refactoring` 5. `build-ci-cd-and-deployment` 6. `requirements-architecture-and-documentation` 7. `performance-profiling-and-reliability`
Capstone: a multi-week project delivered with CI, tests, docs and a release.

### compilers
1. `overview-and-lexing` 2. `parsing` 3. `semantic-analysis-and-types` 4. `intermediate-representations` 5. `optimization` 6. `code-generation-and-runtime` 7. `programming-language-concepts` (interpreters, closures, GC, type systems)
Capstone: a working compiler for a small language to a real target (x86-64, RISC-V, WebAssembly or LLVM IR).

### machine-learning
1. `foundations-and-workflow` 2. `linear-models` 3. `classification-and-evaluation` 4. `trees-ensembles-and-kernels` 5. `unsupervised-learning` 6. `optimization-and-generalization-theory` 7. `ml-engineering` (pipelines, leakage, deployment)
Capstone: an end-to-end project on a real dataset with a written report and reproducible code.

### deep-learning (fast.ai top-down + theory bottom-up)
1. `neural-network-foundations` 2. `training-deep-networks` 3. `convolutional-networks-and-vision` 4. `sequence-models-and-transformers` 5. `generative-models` 6. `practical-deep-learning` (fast.ai, transfer learning, deployment) 7. `scaling-and-frontier-topics`
Capstone: train, evaluate and deploy a model on a real task, with an ablation study.

### probability-statistics
1. `probability-foundations` 2. `random-variables-and-distributions` 3. `limit-theorems-and-sampling` 4. `estimation-and-confidence` 5. `hypothesis-testing-and-regression` 6. `bayesian-inference-and-mcmc` 7. `statistics-in-practice` (data cleaning, visualisation, uncertainty propagation)
Capstone: a statistical analysis of a real scientific dataset with a reproducible notebook.

### systems-programming
1. `c-fundamentals` 2. `pointers-and-memory` 3. `the-toolchain` (compiler, linker, make, debuggers) 4. `unix-system-calls` (files, processes, signals) 5. `performance-and-undefined-behaviour` 6. `rust-fundamentals` 7. `ownership-and-safe-concurrency`
Capstone: a Unix shell in C and a reimplementation in Rust, with benchmarks.

### theory-of-computation
1. `finite-automata-and-regular-languages` 2. `context-free-languages` 3. `turing-machines-and-computability` 4. `undecidability-and-reductions` 5. `complexity-classes` 6. `np-completeness` 7. `beyond-np` (space complexity, randomness, a glance at quantum)
Capstone: a formal write-up of reductions plus a simulator for automata and Turing machines.

### cybersecurity
1. `security-mindset-and-threat-models` 2. `applied-cryptography` 3. `memory-safety-and-binary-exploitation` 4. `web-security` 5. `network-and-system-security` 6. `authentication-and-access-control` 7. `secure-development-and-incident-response`
Capstone: a full security assessment of a deliberately vulnerable application with fixes and a report.

### embedded-systems-iot
1. `microcontroller-foundations` 2. `gpio-timers-interrupts` 3. `serial-protocols-and-sensors` (UART, I2C, SPI) 4. `real-time-systems-and-rtos` 5. `power-and-analog` 6. `connectivity-and-iot-protocols` (BLE, WiFi, MQTT) 7. `firmware-engineering-and-security`
Capstone: a sensor node that logs and transmits data to a dashboard, with OTA update and power budget.

### distributed-systems
1. `models-and-fundamentals` 2. `rpc-and-time` 3. `replication-and-consensus` (Raft, Paxos) 4. `consistency-and-transactions` 5. `storage-and-data-processing` (GFS, MapReduce, Spanner) 6. `fault-tolerance-and-observability` 7. `case-studies`
Capstone: a replicated key-value store with Raft, tested under partitions.

### data-science-discovery (STAT/CS/IS 107)
No programming assumed. Project-driven on real datasets, with short reflections on privacy and
design throughout. Teaches only the Python it needs; `programming-fundamentals` goes deeper.
1. DataFrames and Python basics: what data science is, notebooks, pandas, row selection, types of data, conditionals, lists and functions
2. Study design: experiments, blocking, observational studies, confounders, stratification
3. Exploratory data analysis: descriptive statistics, adding rows and columns, grouping, histograms, quartiles and box plots, basic visualisation
4. Simulation: random numbers, for-loops, sample spaces, simple simulations, the normal distribution, the law of large numbers
5. Probability for prediction: addition and multiplication rules, complements, conditional probability, Bayes' theorem
6. Towards machine learning: correlation, simple linear regression, scikit-learn, train/test splits, clustering
7. Polling and inference: random variables, Bernoulli and binomial, the central limit theorem, polling and sampling, confidence intervals, hypothesis tests
Stops at the idea of inference. Does not teach multiple regression, Git or formal estimation.

### calculus-for-data-science (MATH 220)
A complete first calculus course for someone with algebra and no calculus, with applications
drawn from data. Python is used for checks, and the course can be followed without it.
1. Functions and limits: algebra review, exponentials and logarithms, trigonometric functions, limits, continuity
2. Derivatives: definition, rules, product, quotient and chain rules, implicit differentiation
3. Applications of derivatives: curve sketching, optimisation, Newton's method, loss functions on one parameter
4. Integration: antiderivatives, Riemann sums, the fundamental theorem, substitution, integration by parts
5. Applications of integrals: area, densities and cumulative distributions, expected value, numerical integration
6. Towards many variables: Taylor approximation, partial derivatives, the gradient, gradient descent, the chain rule behind backpropagation
Module 6 goes past MATH 220 because every later modeling course needs it.

### linear-algebra-for-data-science (MATH 227)
Practical and computer-based, as the catalog says: data analysis first, with Python and NumPy
throughout, and honest about what linear methods cannot do.
1. Vectors and matrices as data: NumPy, feature matrices, norms, distances, cosine similarity, matrix multiplication as an operation
2. Linear systems: elimination, LU, rank, null space, basis and dimension, conditioning
3. Orthogonality and regression: projections, QR, least squares, linear regression, residuals
4. Eigenvalues and networks: eigenvectors, Markov chains, PageRank, graph Laplacians, network analysis
5. SVD and PCA: the singular value decomposition, low-rank approximation, PCA, recommender-style factorisation
6. Linear methods at scale and their limits: sparse matrices, iterative and randomised methods, outliers, non-linear structure

### data-science-exploration (STAT 207)
The whole pipeline from hypothesis to report, in Python and Git. Assumes Discovery.
1. The data science pipeline: forming questions and hypotheses, data collection, Git and GitHub for analyses, project structure
2. Data wrangling: loading, joining and reshaping, types, checking for and handling missing data
3. Summary and visualisation: multivariate summaries, a visual grammar, honest graphics, written interpretation
4. Sampling and probability models: random sampling, sampling bias, discrete and continuous models, fitting and checking a model
5. Estimation and uncertainty: estimators, standard errors, maximum likelihood in practice, the bootstrap, confidence intervals
6. Hypothesis testing: test logic, p-values, power, permutation tests, t and chi-square tests, multiple comparisons
7. Regression: multiple linear regression, diagnostics, interactions, logistic regression, interpreting coefficients
8. Classification and high-dimensional data: classifiers, cross-validation, ROC, regularisation, PCA for many features, reporting

### algorithms-for-data-science (CS 277)
Classical structures and algorithms applied to data work, in Python. Links to
`data-structures-algorithms` for proofs and depth. Assumes Exploration and Calculus.
1. Analysing algorithms: Big-O, timing and profiling, why vectorised code is fast, the cost of pandas operations
2. Lists, stacks and queues: dynamic arrays, linked lists, stacks, queues, sliding windows on streams
3. Trees and hashing: binary search trees, heaps and top-k, hash tables, sketches such as Bloom filters and count-min
4. Graphs: representations, BFS, DFS, shortest paths, connected components, graph data at real sizes
5. Design paradigms: divide and conquer, greedy, dynamic programming, sequence alignment and edit distance
6. Discrete optimisation: knapsack and assignment, integer programs with a solver, local search, simulated annealing
7. Continuous optimisation: convexity, gradient descent, stochastic and mini-batch methods, Newton's method, fitting a model as optimisation

### modeling-and-learning (CS 307)
Classical modeling and machine learning, applied in Python with heavy emphasis on interpreting
results. No derivations of learning theory; `machine-learning` has those. Assumes Exploration
and Linear Algebra.
1. Modeling and linear models: the modeling workflow, linear regression as a model, feature engineering, baselines
2. Model selection: bias and variance, cross-validation, ridge and lasso, pipelines, avoiding leakage
3. Classification: logistic regression, metrics and thresholds, imbalance, calibration
4. Trees and non-linear models: k-nearest neighbours, decision trees, random forests, gradient boosting, support vector machines
5. Unsupervised learning: k-means, hierarchical clustering, mixture models, PCA, t-SNE and UMAP, choosing k
6. Deep learning: neurons and layers, training with PyTorch, convolutional networks, transfer learning, embeddings, working on a CPU
7. Interpretability and communication: coefficients, permutation importance, partial dependence, SHAP, correlation versus cause, reporting a model

### data-management-reproducibility (IS 477)
The data science life cycle as seen by someone who must keep work usable. One running case study
across the course. Assumes Exploration.
1. The data science life cycle: stages and roles, why results fail to reproduce, the running case study
2. Research artifacts: identifying artifacts, file formats, tidy data, naming and organisation, versioning data and code
3. Metadata and documentation: descriptive, structural and administrative metadata, standards and schemas, data dictionaries, data validation
4. Reproducible workflows: environments and lockfiles, containers, workflow managers, provenance, literate reports, automation
5. Repositories and preservation: FAIR principles, repositories, identifiers and citation, licences, the economics of preservation
6. Data management plans: funder requirements, writing a plan, sensitive data, reviewing another project

### data-ethics-and-policy (IS 467)
Common ethical challenges around privacy, bias and data access, taught through real cases from
companies, nonprofits, governments, academia and healthcare. Trade-offs are treated as real, and
the question of who carries the burden comes up throughout.
1. Ethics for data work: ethical frameworks, stakeholders, harms and benefits, trade-offs, sharing the burden
2. Privacy: what privacy protects, de-identification and its failures, k-anonymity, differential privacy, surveillance
3. Bias and fairness: where bias enters, fairness definitions and why they conflict, auditing, mitigation, recourse
4. Data access: consent, research ethics and review boards, ownership, scraping, open data versus restricted data
5. Sector cases: healthcare, government and public services, companies, academia, nonprofits
6. Policy responses: organisational governance, institutional rules, US law (HIPAA, FERPA, state privacy law including Illinois BIPA), supranational law (GDPR, EU AI Act)
This course gives no legal advice, and all laws must be stated as of a date.

### startup-founding-and-funding
How to start a company, fund it and run it as a private company, with US law and practice as the
default and an honest account of the odds. Education, not legal, tax or investment advice. No
programming is needed: calculations are done by hand or in a spreadsheet. There are no machine
problems; module projects and a capstone apply the material, and every lesson ends with a short
multiple-choice quiz.
1. Startups and founders: what makes a startup different from a small business, base rates and risk, founder motives, choosing co-founders, when not to start one
2. Finding a problem worth solving: where good ideas come from, customer interviews, market sizing, competition, validation
3. Building to product-market fit: the minimum viable product, iteration, pricing, retention and activation, recognising product-market fit
4. Reaching customers and staying alive: distribution channels, sales, customer acquisition cost, lifetime value, churn, burn, runway, a simple financial model
5. Forming the company: choosing an entity, why a Delaware C corporation is the venture default, founder equity and vesting, the 83(b) election, assigning intellectual property, banking and basic compliance
6. Funding options and how they work: bootstrapping, grants, friends and family, angels, accelerators, venture capital fund economics, debt and revenue-based finance, SAFEs and convertible notes, priced rounds, cap tables and dilution
7. Running a fundraise: whether to raise, targeting investors, the pitch deck and narrative, the process, term sheets, due diligence and closing, securities law basics
8. Running a private company: boards and fiduciary duties, hiring and employment, option plans and 409A valuations, taxes and compliance, investor updates, secondary sales
9. Exits and endings: acquisitions, IPOs, liquidation waterfalls, down rounds, pivots, shutting a company down well

### calculus-1 (MATH 220/221)
A complete first course, starting from algebra and assuming no calculus. Geometric and physical
reasoning, with every technique practised by hand.
1. Functions and precalculus review: functions, graphs, trigonometry, exponentials, logarithms, inverse functions
2. Limits and continuity: the intuitive limit, limit laws, one-sided and infinite limits, continuity, the intermediate value theorem, the epsilon-delta definition
3. The derivative: rates of change, definition, rules, trigonometric functions, the chain rule
4. More differentiation: implicit differentiation, inverse, exponential and logarithmic functions, related rates, linear approximation
5. Applications of the derivative: extrema, the mean value theorem, curve sketching, optimisation, L'Hopital's rule, Newton's method
6. The integral: antiderivatives, Riemann sums, the definite integral, the fundamental theorem, substitution
7. Applications of the integral: area, volumes, average value, work

### calculus-2 (MATH 231)
1. Techniques of integration: by parts, trigonometric integrals, trigonometric substitution, partial fractions, strategy
2. Improper integrals and numerical methods: improper integrals, comparison, the trapezoid and Simpson rules, error
3. More applications: arc length, surface area, moments, probability, simple differential equations
4. Sequences and series: sequences, series, the integral, comparison, ratio and root tests, alternating series, absolute convergence
5. Power series: radius of convergence, Taylor and Maclaurin series, Taylor's theorem and error, the binomial series, applications
6. Parametric and polar curves: conic sections, parametric curves, calculus in polar coordinates

### calculus-3 (MATH 241)
1. Vectors and geometry of space: vectors, dot and cross products, lines and planes, surfaces, cylindrical and spherical coordinates
2. Vector functions: curves, derivatives and integrals, arc length, curvature, motion in space
3. Partial derivatives: limits, partials, tangent planes, the chain rule, directional derivatives, the gradient
4. Optimisation in several variables: critical points, the second derivative test, Lagrange multipliers
5. Multiple integrals: double integrals, polar coordinates, triple integrals, change of variables and Jacobians
6. Vector fields and line integrals: vector fields, line integrals, conservative fields, Green's theorem
7. Surface integrals and the integral theorems: parametric surfaces, flux, curl and divergence, Stokes' theorem, the divergence theorem

### linear-algebra-computational (MATH 257)
Concepts with computation throughout, in Python. Proof-based linear algebra is in `abstract-linear-algebra`.
1. Linear systems: Gaussian elimination, matrix arithmetic, LU, computing with NumPy and floating point
2. Vector spaces: subspaces, span, independence, basis, dimension, the four fundamental subspaces
3. Linear transformations and determinants: matrices of maps, change of basis, determinants
4. Orthogonality: inner products, projections, Gram-Schmidt, QR, least squares and regression
5. Eigenvalues: eigenvectors, diagonalisation, the power method, linear dynamical systems, Markov chains
6. Symmetric matrices and the SVD: the spectral theorem, positive definite matrices, the singular value decomposition, low-rank approximation, applications

### differential-equations (MATH 285)
Assumes Calculus III. Introduces just enough linear algebra for systems.
1. First-order equations: modeling, separable and linear equations, direction fields, existence, autonomous equations, Euler's method
2. Second-order linear equations: homogeneous equations, characteristic roots, undetermined coefficients, variation of parameters, oscillators and resonance
3. Higher-order equations and series: linear independence, series solutions near ordinary points
4. Laplace transforms: definition, solving initial value problems, step functions, impulses, convolution
5. Systems: matrices and eigenvalues, linear systems, phase portraits, a first look at non-linear stability
6. Fourier series and boundary value problems: eigenvalue problems, Fourier series, sine and cosine series, convergence
7. Introduction to PDEs: separation of variables for heat, wave and Laplace equations

### higher-mathematics (MATH 314)
The gateway to proof. Every later proof course assumes it.
1. Logic and how to read mathematics: statements, quantifiers, negation, implication
2. Proof techniques: direct proof, contrapositive, contradiction, cases, counterexamples, writing proofs well
3. Induction: weak and strong induction, well-ordering, recursive definitions
4. Sets, functions and relations: set operations, functions, injections and surjections, equivalence relations, orders
5. Number systems: divisibility, modular arithmetic, the integers, the rationals, irrationality
6. Cardinality: finite and infinite sets, countability, Cantor's theorem
7. Real numbers and limits: least upper bounds, sequences, epsilon arguments, the first analysis proofs

### abstract-linear-algebra (MATH 416)
Proof-oriented.
1. Vector spaces over fields: axioms, subspaces, bases and dimension
2. Linear maps: rank-nullity, matrices of maps, duality, quotients
3. Determinants and eigenvalues: multilinear forms, the characteristic polynomial, invariant subspaces
4. Diagonalisation and canonical forms: minimal polynomial, generalised eigenspaces, Jordan form
5. Inner product spaces: orthonormal bases, adjoints, the spectral theorems, positive operators
6. Further structure: singular values, bilinear forms, applications

### ode-theory (MATH 441)
Rigorous theory, with an eye to dynamics.
1. Existence and uniqueness: the initial value problem, Picard iteration, Gronwall's inequality, continuous dependence
2. Linear systems: the matrix exponential, fundamental matrices, variation of constants, Floquet theory
3. Stability: equilibria, Lyapunov functions, linearisation, the Hartman-Grobman statement
4. Phase plane analysis: limit cycles, Poincare-Bendixson, bifurcations
5. Boundary value problems: Sturm-Liouville theory, eigenfunction expansions, Green's functions

### partial-differential-equations (MATH 442)
1. Modeling and first-order equations: conservation laws, derivations, characteristics, classification
2. The wave equation: d'Alembert's solution, energy, domains of dependence, reflections
3. The diffusion equation: the maximum principle, the heat kernel, uniqueness
4. Separation of variables and Fourier series: boundary conditions, convergence, eigenfunction expansions
5. Laplace's equation: harmonic functions, the mean value property, the Poisson formula, Green's identities
6. Fourier transforms and higher dimensions: transforms, circular and spherical domains, Bessel functions, numerical methods

### abstract-algebra (MATH 417)
1. Groups: definitions, examples, subgroups, cyclic and symmetric groups
2. Homomorphisms: cosets, Lagrange's theorem, normal subgroups, quotients, isomorphism theorems
3. Group actions: orbits and stabilisers, Burnside's lemma, conjugacy, the Sylow theorems
4. Rings: ideals, quotients, homomorphisms, integral domains
5. Polynomials and factorisation: polynomial rings, Euclidean domains, unique factorisation, irreducibility
6. Fields: extensions, finite fields, an application to coding or constructions

### real-analysis (MATH 444)
1. The real numbers: completeness, supremum, density, the Archimedean property
2. Sequences and series: limits, monotone sequences, Bolzano-Weierstrass, Cauchy sequences, convergence tests
3. Limits and continuity: topology of the line, compactness, continuous functions, uniform continuity
4. Differentiation: the mean value theorem, Taylor's theorem, L'Hopital's rule proved
5. The Riemann integral: Darboux sums, integrability, the fundamental theorem
6. Sequences of functions: uniform convergence, power series, Weierstrass approximation, metric spaces

### complex-variables (MATH 446)
Applied emphasis, as MATH 446 is. Assumes Calculus III.
1. Complex numbers and functions: arithmetic, polar form, elementary functions, branches
2. Analytic functions: complex differentiation, Cauchy-Riemann equations, harmonic functions
3. Contour integration: line integrals, Cauchy's theorem and formula, Liouville's theorem
4. Series: Taylor and Laurent series, zeros and singularities
5. Residues: the residue theorem, real integrals, the argument principle
6. Conformal maps and applications: Mobius transformations, potential flow, heat and electrostatics, transforms

### number-theory (MATH 453)
1. Divisibility: the Euclidean algorithm, primes, unique factorisation
2. Congruences: modular arithmetic, linear congruences, the Chinese remainder theorem
3. Fermat and Euler: Euler's theorem, Wilson's theorem, RSA
4. Primitive roots: orders, the existence of primitive roots, discrete logarithms
5. Quadratic reciprocity: residues, the Legendre symbol, the law and its proof
6. Further topics: arithmetic functions, sums of squares, continued fractions, Diophantine equations

### graph-theory (MATH 412)
Proof-based, going beyond `discrete-mathematics`.
1. Fundamentals: definitions, degree, paths, Eulerian circuits, isomorphism
2. Trees: characterisations, spanning trees, Cayley's formula, optimisation on trees
3. Connectivity and matching: Menger's theorem, Hall's theorem, Konig's theorem, Tutte's theorem
4. Colouring: greedy bounds, Brooks' theorem, chromatic polynomials, edge colouring and Vizing's theorem
5. Planarity: Euler's formula, Kuratowski's theorem, the five colour theorem
6. Further topics: Hamiltonian cycles, Ramsey theory, extremal graphs

### combinatorics (MATH 413)
1. Basic counting: permutations, combinations, multisets, binomial identities, bijective proof
2. Inclusion-exclusion and the pigeonhole principle: derangements, Euler's function, Mobius inversion
3. Generating functions: ordinary and exponential, partitions, Catalan numbers
4. Recurrences: linear recurrences, solving by generating functions
5. Symmetry and designs: Burnside and Polya counting, block designs, Latin squares, finite geometries
6. Ramsey theory and the probabilistic method: Ramsey numbers, expectation arguments

### probability-theory (MATH 461)
Calculus-based and proof-aware. `probability-statistics` is aimed at scientists and goes on to statistics.
1. Foundations: axioms, counting, conditional probability, independence, Bayes
2. Discrete random variables: expectation, variance, standard distributions, generating functions
3. Continuous random variables: densities, standard distributions, transformations
4. Joint distributions: covariance, conditional distributions and expectation, sums of random variables
5. Inequalities and limit theorems: Markov, Chebyshev, laws of large numbers, moment generating functions, the central limit theorem
6. Further topics: Markov chains, Poisson processes, a first look at simulation

### optimization (MATH 482 and 484)
1. Linear programming: modeling, geometry, standard form, the simplex method
2. Duality: weak and strong duality, complementary slackness, sensitivity
3. Network and integer programming: flows, total unimodularity, branch and bound, cutting planes
4. Unconstrained non-linear optimisation: optimality conditions, gradient and Newton methods, line search
5. Constrained optimisation: Lagrange multipliers, the Karush-Kuhn-Tucker theorem, penalty and barrier methods
6. Convex programming: convex sets and functions, duality, applications to machine learning

### differential-geometry (MATH 423)
1. Curves: arc length, curvature, torsion, the Frenet frame, the fundamental theorem of curves
2. Surfaces: regular surfaces, the first fundamental form, area
3. Curvature of surfaces: the Gauss map, the second fundamental form, Gaussian and mean curvature
4. Intrinsic geometry: Gauss's Theorema Egregium, geodesics
5. The Gauss-Bonnet theorem: local and global forms, Euler characteristic
6. Differential forms: vector fields, forms, a modern view of curvature

### rust-programming
A full course in Rust for someone who can already program. `systems-programming` has one module of
Rust basics; this course goes much further and links to it rather than repeating it.
1. Getting started: Cargo, the syntax, types, control flow, functions, rustfmt, Clippy and tests
2. Ownership and borrowing: moves, Copy and Clone, references, slices, String and str, how the borrow checker reasons
3. Modelling data: structs, enums, pattern matching, Option and Result, errors and the ? operator, modules and crates
4. Generics, traits and lifetimes: generic functions and types, trait bounds, trait objects, lifetime annotations, the common standard traits
5. Collections, iterators and smart pointers: Vec and HashMap, iterator adapters, closures and the Fn traits, Box, Rc, RefCell and interior mutability
6. Concurrency: threads, Send and Sync, channels, Arc and Mutex, async and await with Tokio
7. Beyond safe Rust: unsafe code and its contract, FFI with C, declarative macros, benchmarks, documentation and publishing a crate

### applied-linear-algebra (MATH 415)
Linear algebra for engineering and science, as MATH 415 is. Worked mainly by hand, with short
computational checks. Applications are physical: structures, circuits, networks, vibrations.
1. Matrices and linear systems: Gaussian elimination, matrix algebra, inverses, LU factorisation, pivoting and its cost
2. Vector spaces: subspaces, independence, basis, dimension, the four fundamental subspaces
3. Linear transformations and determinants: matrix representations, change of basis, determinant properties and uses
4. Inner products, norms and orthogonality: norms, inner products, orthogonal bases, Gram-Schmidt, QR, least squares
5. Equilibrium: minimisation principles, positive definite systems, mass-spring chains, electrical networks, trusses
6. Eigenvalues and eigenvectors: diagonalisation, symmetric matrices and the spectral theorem, the SVD in outline
7. Linear dynamical systems: iterative systems, Markov processes, linear systems of ODEs, the matrix exponential, stability, vibrations and normal modes

### statistics-and-probability-2 (STAT 410)
A continuation of STAT 400: the mathematical theory of estimation and testing. Assumes probability
at the level of `probability-theory`. Module 1 reviews the STAT 400 statistics it needs.
1. Review and moment-generating functions: point estimates, intervals and tests from STAT 400, moment-generating functions, uniqueness, sums of independent variables
2. Transformations of random variables: one-to-one and many-to-one transformations, Jacobians, order statistics
3. Normal sampling theory: chi-square, t and F distributions, independence of sample mean and variance, limiting distributions
4. Sufficiency and best estimators: sufficiency, factorisation, exponential families, completeness, Rao-Blackwell, Lehmann-Scheffe, the Cramer-Rao bound
5. Maximum likelihood: likelihood, Fisher information, consistency and asymptotic normality, the delta method, numerical maximisation
6. Confidence intervals: pivots, exact and large-sample intervals, intervals from likelihood
7. Hypothesis testing: the Neyman-Pearson lemma, uniformly most powerful and unbiased tests, likelihood ratio tests, chi-square tests

### microeconomic-principles (ECON 102)
Individual decision-makers, consumers and producers, within the larger economic system: product
markets, the theory of the firm under competition and monopoly, and government's role in
efficiency. Algebra throughout; calculus helps but is optional.
1. Thinking like an economist: scarcity, opportunity cost, marginal thinking, incentives, models, positive vs normative, the production possibilities frontier
2. Trade and markets: comparative advantage, gains from trade and who loses, the price system
3. Supply and demand: demand, supply, equilibrium, changes in equilibrium
4. Elasticity: price elasticity, total revenue, income, cross-price and supply elasticity, tax incidence
5. Welfare and government in markets: consumer and producer surplus, price ceilings and floors, taxes, subsidies and deadweight loss, international trade and tariffs
6. Consumer choice: utility and the best affordable bundle, income and substitution effects, behavioural economics
7. Production and costs: economic profit, the production function, short-run and long-run costs, scale
8. Market structures: perfect competition in the short and long run, monopoly, price discrimination, regulation and antitrust, monopolistic competition, oligopoly and game theory
9. Market failure and government: externalities, Coase and cap and trade, public goods and common resources, labour markets and the minimum wage, asymmetric information
Capstone: a market and policy analysis with real data.

### macroeconomic-principles (ECON 103)
Aggregate output, employment, prices and growth, with emphasis on monetary and fiscal policy,
inflation, unemployment and the international economy. Real US data with dates throughout.
1. Measuring output: what macroeconomics studies, GDP three ways, real GDP and the deflator, what GDP misses
2. Prices and jobs: the CPI, its biases and indexing, the costs of inflation, measuring unemployment, types of unemployment
3. Long-run growth: compound growth, productivity and its sources, Solow and convergence, institutions and ideas
4. Saving, investment and the financial system: loanable funds, present value and bonds, the financial system
5. Money and banking: what money is, the Federal Reserve, banks and money creation, the quantity theory
6. Short-run fluctuations: business cycles, the Keynesian cross, the multiplier, aggregate demand and supply, shocks and adjustment
7. Monetary policy: how the Fed sets rates, the transmission mechanism, the zero lower bound and QE, inflation targeting and rules
8. Fiscal policy and debt: the federal budget, fiscal policy and automatic stabilisers, debt dynamics
9. Inflation, unemployment and the open economy: the Phillips curve, two great inflations, the balance of payments, exchange rates and PPP
Capstone: a state-of-the-economy report from FRED data, ending in a policy recommendation.

### physics-mechanics (PHYS 211)
Calculus-based. Assumes Calculus I, with Calculus II alongside. `classical-mechanics` is the next step.
1. Kinematics: vectors, motion in one and two dimensions, relative motion
2. Newton's laws: forces, free-body diagrams, friction, circular motion
3. Work and energy: work, kinetic and potential energy, conservation, power
4. Momentum and systems of particles: impulse, collisions, centre of mass
5. Rotation: rotational kinematics and dynamics, torque, angular momentum, statics
6. Gravitation and fluids: universal gravitation, orbits, pressure, buoyancy, Bernoulli's equation
7. Oscillations and waves: simple harmonic motion, damping, waves on strings, sound

### physics-electricity-magnetism (PHYS 212)
Calculus-based. Assumes PHYS 211 and Calculus II, with Calculus III alongside. `electromagnetism` is the next step.
1. Electric fields: charge, Coulomb's law, fields, continuous distributions
2. Gauss's law and electric potential: flux, Gauss's law, potential, conductors
3. Capacitance and circuits: capacitors, dielectrics, current, resistance, Kirchhoff's rules, RC circuits
4. Magnetism: magnetic force, the Biot-Savart law, Ampere's law
5. Induction: Faraday's law, Lenz's law, inductors, RL and LC circuits, alternating current
6. Electromagnetic waves and optics: Maxwell's equations in outline, electromagnetic waves, reflection, refraction, lenses and mirrors

### physics-thermal (PHYS 213)
Calculus-based, and led by the statistical view of entropy. `thermodynamics-statistical-mechanics` is the next step.
1. Temperature and energy: temperature, heat, the first law, heat capacity
2. Kinetic theory: the ideal gas, equipartition, the Maxwell-Boltzmann distribution
3. Entropy and the second law: microstates, counting, entropy, irreversibility
4. Heat engines: Carnot limits, refrigerators, real cycles
5. Free energy and statistical ideas: the Boltzmann factor, free energy, equilibrium, phase changes

### physics-quantum (PHYS 214)
Calculus-based. `quantum-mechanics` is the next step.
1. Waves and interference: superposition, double slits, diffraction, interferometers
2. Photons: the photoelectric effect, Compton scattering, wave-particle duality
3. Matter waves: de Broglie waves, electron diffraction, the uncertainty principle
4. Wave mechanics: the Schrodinger equation, particle in a box, tunnelling
5. Atoms and applications: the Bohr atom, atomic structure, spin, lasers and semiconductors in outline

### math-methods
1. `single-variable-calculus` 2. `multivariable-calculus` 3. `linear-algebra` 4. `ordinary-differential-equations` 5. `vector-calculus` 6. `fourier-and-complex-analysis` 7. `partial-differential-equations-and-special-functions`
Capstone: a solutions portfolio plus a notebook that numerically checks every major derivation.

### classical-mechanics
1. `kinematics-and-newtons-laws` 2. `energy-momentum-and-systems` 3. `rotation-and-rigid-bodies` 4. `oscillations-and-gravitation` 5. `lagrangian-mechanics` 6. `hamiltonian-mechanics-and-symmetry` 7. `nonlinear-dynamics-and-chaos`
Capstone: derive and simulate the dynamics of a nontrivial mechanical system (double pendulum, three-body, spinning top).

### waves-optics
1. `oscillators-and-resonance` 2. `coupled-oscillators-and-normal-modes` 3. `waves-on-strings-and-in-media` 4. `fourier-analysis-of-waves` 5. `electromagnetic-waves-and-geometric-optics` 6. `interference-diffraction-and-polarisation`
Capstone: a numerical wave simulator and a diffraction experiment with a laser pointer and analysis.

### electromagnetism
1. `electrostatics` 2. `potentials-and-conductors` 3. `fields-in-matter` 4. `magnetostatics` 5. `electrodynamics-and-induction` 6. `maxwells-equations-and-waves` 7. `radiation-and-relativistic-electrodynamics`
Capstone: a field solver (relaxation / FDTD) applied to a real device, with derivation of the expected result.

### thermodynamics-statistical-mechanics
1. `temperature-heat-and-the-laws` 2. `entropy-and-thermodynamic-potentials` 3. `statistical-foundations` 4. `canonical-ensembles` 5. `quantum-statistics` 6. `phase-transitions-and-critical-phenomena` 7. `applications` (stars, chemistry, information)
Capstone: an Ising-model Monte Carlo study with finite-size scaling.

### quantum-mechanics
1. `origins-and-wave-mechanics` 2. `one-dimensional-problems` 3. `formalism-and-dirac-notation` 4. `angular-momentum-and-spin` 5. `hydrogen-and-atoms` 6. `approximation-methods` 7. `entanglement-measurement-and-information`
Capstone: a numerical Schrödinger solver and a written treatment of a quantum information protocol.

### relativity
1. `special-relativity-foundations` 2. `relativistic-mechanics-and-four-vectors` 3. `tensors-and-curved-spaces` 4. `einsteins-field-equations` 5. `schwarzschild-solution-and-black-holes` 6. `gravitational-waves-and-cosmological-solutions` 7. `experimental-tests`
Capstone: compute and plot geodesics around a black hole and reproduce a classic test (Mercury perihelion, light bending).

### computational-physics
1. `scientific-python-and-numerics` 2. `numerical-calculus-and-linear-algebra` 3. `ode-integrators` 4. `monte-carlo-methods` 5. `pdes-and-field-simulation` 6. `spectral-methods-and-data` 7. `n-body-and-molecular-dynamics` 8. `reproducibility-and-performance`
Capstone: a complete simulation project with validation against analytic results.

### general-chemistry-1 (CHEM 102)
Atomic structure, bonding, states of matter, stoichiometry and chemical equilibrium. No calculus.
1. Measurement, atoms and the mole: significant figures, dimensional analysis, isotopes and atomic mass, the mole
2. Light and the quantum atom: photons, the hydrogen spectrum and Bohr model, quantum numbers and orbitals
3. Electron configurations and periodic trends: configurations, effective nuclear charge and size, ionisation energy and electron affinity
4. Chemical bonding: ionic bonding and lattice energy, covalent bonds and electronegativity, Lewis structures, formal charge and resonance
5. Molecular shape and intermolecular forces: VSEPR, polarity, hybridisation and sigma/pi bonds, intermolecular forces, phase diagrams
6. Stoichiometry and reactions in solution: formulas and composition, balancing, limiting reagents and yield, molarity, precipitation, acid-base and redox, titration
7. Gases: gas laws, the ideal gas law, partial pressures, kinetic-molecular theory and real gases
8. Thermochemistry: enthalpy, calorimetry, Hess's law and formation enthalpies, bond energies
9. Chemical equilibrium: K, Q and ICE tables, Ksp, Le Chatelier's principle
Capstone: the chemistry of a fuel.

### general-chemistry-lab-1 (CHEM 103)
Simulated experiments with realistic, seeded noise, read at real instrument precision, each
written up with a report template and rubric. Says plainly what simulation cannot teach.
1. Lab practice: safety, glassware and balances, significant figures and uncertainty, the notebook, the report format, graphs and linear fits
2. Equipment and the balance
3. Dilutions and Beer's law (food dyes)
4. Titration: standardising NaOH, molar mass of an unknown acid
5. Empirical formula of magnesium oxide
6. Gas collection over water: the gas constant and an unknown metal
7. Calorimetry: calorimeter constant, enthalpy of solution, heat of fusion
8. Hess's law: the enthalpy of formation of MgO
9. Le Chatelier's principle
Capstone: a full formal report, or an experiment designed with the simulators.

### intro-astronomy
1. `the-night-sky` 2. `light-and-telescopes` 3. `the-solar-system` 4. `the-sun-and-stars` 5. `stellar-lives-and-deaths` 6. `galaxies-and-the-universe` 7. `life-in-the-universe-and-how-astronomers-work`
Capstone: an observing log plus a quantitative analysis (e.g. measuring the Moon's distance, the Sun's rotation, or a star cluster's age).

### observational-astronomy
1. `coordinates-time-and-the-celestial-sphere` 2. `telescopes-detectors-and-noise` 3. `photometry` 4. `spectroscopy` 5. `astronomical-data-in-python` (astropy, FITS) 6. `statistics-for-astronomers` 7. `surveys-and-archives` (SDSS, Gaia, MAST, HEASARC)
Capstone: reduce real imaging or spectroscopic data to a measurement with error bars.

### planetary-science-exoplanets
1. `orbits-and-celestial-mechanics` 2. `planetary-interiors-and-surfaces` 3. `atmospheres-and-climate` 4. `small-bodies-and-system-formation` 5. `exoplanet-detection-methods` 6. `exoplanet-characterisation-and-habitability`
Capstone: detect and characterise a transiting exoplanet from real TESS/Kepler light curves.

### stellar-astrophysics
1. `stellar-observables` 2. `radiation-and-spectra` 3. `stellar-structure-equations` 4. `energy-generation-and-transport` 5. `stellar-evolution` 6. `stellar-remnants` 7. `stellar-populations-and-binaries`
Capstone: build a polytrope / simple stellar-structure code and compare to MESA or real HR diagrams.

### galaxies-cosmology
1. `the-milky-way` 2. `galaxy-structure-and-dynamics` 3. `dark-matter` 4. `galaxy-formation-and-evolution` 5. `the-expanding-universe` 6. `the-early-universe-and-cmb` 7. `large-scale-structure-and-dark-energy`
Capstone: measure the Hubble constant from real data and fit a cosmological model.

### high-energy-astrophysics
1. `radiative-processes` 2. `accretion-physics` 3. `neutron-stars-and-pulsars` 4. `black-holes-and-agn` 5. `supernovae-grbs-and-transients` 6. `cosmic-rays-and-multimessenger-astronomy`
Capstone: analyse a real X-ray or gravitational-wave dataset and interpret it physically.

## Completion status

All 73 subjects are written. Every lesson is fully populated: none is marked `outline`.
`npm run validate` reports no errors and no warnings.

| Category | Subjects | Lessons |
|---|---|---|
| Computer Science | 21 | 524 |
| Data Science | 8 | 225 |
| Mathematics | 19 | 468 |
| Statistics | 2 | 56 |
| Economics | 2 | 72 |
| Physics | 12 | 300 |
| Chemistry | 2 | 69 |
| Astronomy | 6 | 158 |
| Miscellaneous | 1 | 35 |
| **Total** | **73** | **1,907** |

Run `npm run validate` for the per-subject table (modules, lessons, hours).

The CS and data science subjects and `probability-statistics` have coursework: 60 machine problems and 30 final
projects, about 2,380 hours on top of the subject hours. Mathematics subjects use module projects
and a capstone instead. Specs were checked by script, by reasoning
or on sample runs. Almost none has been built end to end, so treat numeric targets and timings as
estimates.

### Resource links

The last full `npm run check-links` run covered 3,281 unique URLs (6,392 references): 3,078 OK.
The Rust course was written afterwards; its 97 URLs were checked separately and all returned 200.
All true 404s found were replaced. Remaining non-OK results fall into two groups:

- **Unverified (170).** Sites such as the Feynman Lectures, NASA ADS, Wiley and some
  university pages return 403 or 429 to scripts but work in a browser.
- **Unreachable from the authoring machine (33).** About a dozen are web.stanford.edu pages,
  whose server sends an incomplete certificate chain that browsers repair and scripts do not.
  Others: gnu.org, SIMBAD, DAMTP Cambridge,
  in-the-sky.org, LIGO, Penn State STAT courses, Fourmilab and a few others failed at the
  network level. These are long-standing sites and are expected to work in a normal browser.

Offline academic pages (Nearing's *Mathematical Tools for Physics*, Abadi et al.'s column-store
survey, Kreps's "The Log") point at Internet Archive snapshots.

Writers verified most URLs while authoring, but some deep links were taken from memory. If a link
is dead when you reach it, the resource title is specific enough to search for.
