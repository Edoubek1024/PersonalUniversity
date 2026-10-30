# Curriculum plan

Three categories, 25 core tracks, 6 additional recommended subjects. Each subject file in
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
| `probability-statistics` | Probability and Statistics for Scientists | intermediate | 70 | math-methods | additional |
| `systems-programming` | Systems Programming in C and Rust | intermediate | 80 | programming-fundamentals, computer-architecture | additional |
| `theory-of-computation` | Theory of Computation | advanced | 70 | discrete-mathematics | additional |
| `cybersecurity` | Cybersecurity | advanced | 90 | computer-networks, operating-systems, systems-programming | additional |
| `embedded-systems-iot` | Embedded Systems and IoT | intermediate | 90 | systems-programming, computer-architecture | additional |
| `distributed-systems` | Distributed Systems | advanced | 90 | operating-systems, computer-networks, databases | additional |

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

## Astronomy (`astronomy`)

| ID | Title | Diff | Hrs | Prerequisites | Core |
|---|---|---|---|---|---|
| `intro-astronomy` | Introduction to Astronomy | beginner | 60 | — | yes |
| `observational-astronomy` | Observational Astronomy and Data Analysis | intermediate | 80 | intro-astronomy, programming-fundamentals, probability-statistics | yes |
| `planetary-science-exoplanets` | Planetary Science and Exoplanets | intermediate | 70 | intro-astronomy, classical-mechanics | yes |
| `stellar-astrophysics` | Stellar Astrophysics | advanced | 80 | intro-astronomy, thermodynamics-statistical-mechanics, quantum-mechanics | yes |
| `galaxies-cosmology` | Galaxies and Cosmology | advanced | 90 | stellar-astrophysics, relativity | yes |
| `high-energy-astrophysics` | High-Energy Astrophysics and Compact Objects | expert | 70 | stellar-astrophysics, relativity, electromagnetism | yes |

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

All 31 subjects are written. Every lesson is fully populated: none is marked `outline`.
`npm run validate` reports no errors and no warnings.

| Category | Subjects | Lessons |
|---|---|---|
| Computer Science | 17 | 457 |
| Physics | 8 | 221 |
| Astronomy | 6 | 158 |
| **Total** | **31** | **836** |

Run `npm run validate` for the per-subject table (modules, lessons, hours).

### Resource links

The last full `npm run check-links` run covered 1,825 unique URLs (3,225 references).
All true 404s found were replaced. Remaining non-OK results fall into two groups:

- **Unverified (about 150).** Sites such as the Feynman Lectures, NASA ADS, Wiley and some
  university pages return 403 or 429 to scripts but work in a browser.
- **Unreachable from the authoring machine (about 12).** Requests to gnu.org, SIMBAD,
  in-the-sky.org, LIGO, Penn State STAT courses, Fourmilab and a few others failed at the
  network level. These are long-standing sites and are expected to work in a normal browser.

Offline academic pages (Nearing's *Mathematical Tools for Physics*, Abadi et al.'s column-store
survey, Kreps's "The Log") point at Internet Archive snapshots.

Writers verified most URLs while authoring, but some deep links were taken from memory. If a link
is dead when you reach it, the resource title is specific enough to search for.
