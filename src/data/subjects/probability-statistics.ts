import { defineSubject } from '../define';

export default defineSubject({
  id: 'probability-statistics',
  title: 'Probability and Statistics for Scientists',
  category: 'cs',
  tagline:
    'Probability theory, distributions, estimation, hypothesis tests, Bayesian inference and MCMC: how to reason quantitatively under uncertainty and extract conclusions from data.',
  description: `Every measurement has noise, every simulation has randomness, and every scientific claim is a statement about what the data can and cannot support. Probability is the mathematics of uncertainty; statistics is the discipline of turning data into justified conclusions. Together they are the foundation of experimental physics, observational astronomy, machine learning and every form of data analysis, and this subject is the canonical home for them: other subjects link here whenever they need a distribution, a likelihood, a confidence interval or a sampler.

The curriculum builds from the axioms through random variables and the great limit theorems to the two working toolkits of the modern scientist, frequentist estimation and testing on one hand and Bayesian inference with Markov chain Monte Carlo on the other. Each idea is derived properly, then immediately simulated in Python, because random sampling is the fastest way to develop statistical intuition and the best way to catch a wrong formula. The final module is about practice: cleaning real data, propagating uncertainty, fitting models robustly and reporting results honestly.

Primary free sources are MIT 18.05 and 18.650, Allen Downey's *Think Stats* and *Think Bayes*, Blitzstein and Hwang's *Introduction to Probability* (Harvard Stat 110), OpenStax and OpenIntro statistics, and the SciPy, NumPy and emcee documentation. Richard McElreath's *Statistical Rethinking* lectures are free and strongly recommended for the Bayesian module. By the end you should be able to analyse a real dataset from raw files to a reproducible report with defensible uncertainties.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['math-methods'],
  recommendedBackground: [
    'Comfortable with integrals, sums and basic linear algebra (math-methods modules 1-3)',
    'Python with NumPy and Matplotlib',
    'Counting and sets from discrete mathematics help for the first module',
  ],
  tags: ['probability', 'statistics', 'bayesian', 'MCMC', 'data analysis', 'uncertainty'],
  core: false,
  modules: [
    {
      slug: 'probability-foundations',
      title: 'Probability Foundations',
      description:
        'Sample spaces, the axioms, counting, conditional probability, independence and Bayes\' theorem: the rules for reasoning about uncertain events.',
      lessons: [
        {
          slug: 'sample-spaces-and-axioms',
          title: 'Sample spaces, events and the axioms of probability',
          summary:
            'What probability is as a mathematical object: sample spaces, events as sets, Kolmogorov\'s axioms, and the interpretations (frequentist and Bayesian) that give the numbers meaning.',
          estimatedMinutes: 120,
          objectives: [
            'Describe an experiment by its sample space and represent events as subsets',
            'State Kolmogorov\'s axioms and derive the basic rules (complement, union, inclusion-exclusion, monotonicity)',
            'Distinguish frequentist and Bayesian interpretations of a probability and explain why both obey the same axioms',
            'Translate a word problem into events and compute probabilities of unions and intersections',
            'Simulate simple experiments in Python and compare empirical frequencies with computed probabilities',
          ],
          concepts: [
            'Sample space $\\Omega$, outcome, event',
            'Set operations: union, intersection, complement',
            'Kolmogorov axioms: non-negativity, normalisation, countable additivity',
            'Inclusion-exclusion $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$',
            'Mutually exclusive (disjoint) events',
            'Frequentist vs Bayesian interpretation',
            'Law of large numbers (preview)',
            'Simulation as empirical probability',
          ],
          explanation: `Probability starts by describing what *could* happen. The **sample space** $\\Omega$ is the set of all possible outcomes of an experiment: $\\{H, T\\}$ for a coin, $\\{1, \\dots, 6\\}^2$ for two dice, the positive reals for a decay time. An **event** is a subset of $\\Omega$, and "A or B", "A and B", "not A" are the set operations union, intersection and complement. Drawing the sample space as a table or tree before computing anything prevents most beginner errors.

A probability is a function $P$ from events to numbers satisfying **Kolmogorov's axioms**: $P(A) \\ge 0$; $P(\\Omega) = 1$; and for disjoint events $P(A_1\\cup A_2\\cup\\dots) = \\sum P(A_i)$. Everything else is a theorem. $P(A^c) = 1 - P(A)$. If $A \\subseteq B$ then $P(A) \\le P(B)$. For arbitrary events, $P(A\\cup B) = P(A) + P(B) - P(A\\cap B)$ (**inclusion-exclusion**), because the overlap is counted twice by the naive sum; the complement trick ("probability of at least one" equals one minus "probability of none") is used constantly.

What does the number *mean*? The **frequentist** reading says $P(A)$ is the long-run fraction of repetitions in which $A$ occurs, which the law of large numbers (module 3) justifies for repeatable experiments. The **Bayesian** reading says $P(A)$ is a degree of belief that $A$ is true, which applies also to one-off propositions such as "this hypothesis is correct" or "the mass of this particle is below 1 TeV". The remarkable fact is that any coherent system of beliefs must obey the same axioms (Cox's theorem, Dutch-book arguments), so the mathematics is shared and only the interpretation differs. This subject uses both, and later modules make clear when it matters.

The habit to build from day one is **simulation**: write five lines of NumPy that repeat the experiment $10^5$ times and count. If the empirical frequency disagrees with your calculation, one of them is wrong, and it is usually the calculation. Read 18.05 Unit 1 (Readings 1-2) and Blitzstein and Hwang chapter 1, then do the exercises in the order given.`,
          resources: [
            {
              title: 'MIT 18.05 Introduction to Probability and Statistics (Spring 2022) — Unit 1: Probability',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Class 1-2 readings, slides, problem sets with solutions. The whole course is used throughout this subject.',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Introduction to Probability (Blitzstein and Hwang)',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
              note: 'Free lecture videos and the textbook PDF; chapter 1 for this lesson.',
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — free PDF',
              url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS',
              note: 'Chapter 1 includes historical simulation examples and many exercises.',
            },
            {
              title: 'Seeing Theory — a visual introduction to probability and statistics',
              url: 'https://seeing-theory.brown.edu/',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'Interactive chapter 1 for sample spaces and the law of large numbers.',
            },
          ],
          exercises: [
            {
              slug: 'two-dice-events',
              title: 'Events for two dice',
              prompt:
                'For two fair dice list the sample space and compute: $P(\\text{sum} = 7)$, $P(\\text{sum} \\ge 10)$, $P(\\text{at least one 6})$, $P(\\text{sum} = 7 \\text{ or at least one 6})$ via inclusion-exclusion. Simulate $10^6$ rolls with NumPy and compare; the discrepancies should be of order $10^{-3}$. Explain where that size comes from.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'derive-rules-from-axioms',
              title: 'Derive the rules from the axioms',
              prompt:
                'Using only the three axioms, prove: (a) $P(\\emptyset) = 0$; (b) $P(A^c) = 1 - P(A)$; (c) $A \\subseteq B \\Rightarrow P(A) \\le P(B)$; (d) inclusion-exclusion for two events; (e) the union bound $P(\\cup A_i) \\le \\sum P(A_i)$. Then state inclusion-exclusion for three events and verify it numerically on random subsets of $\\{1,\\dots,20\\}$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'at-least-one',
              title: 'The complement trick',
              prompt:
                'How many times must you roll a die to have probability at least 0.99 of seeing a six? How many people must be in a room for the probability that at least one shares your birthday to exceed 1/2 (answer: 253)? In each case use the complement, then confirm by simulation.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'State Kolmogorov\'s three axioms.',
              answerOutline:
                'Non-negativity $P(A) \\ge 0$; normalisation $P(\\Omega) = 1$; countable additivity for pairwise disjoint events.',
            },
            {
              question: 'Why is $P(A\\cup B) \\ne P(A) + P(B)$ in general, and what is the correction?',
              answerOutline:
                'Outcomes in both events are counted twice; subtract $P(A\\cap B)$. Equality holds only for disjoint events.',
            },
            {
              question: 'Give one statement a frequentist can assign a probability to and one only a Bayesian would.',
              answerOutline:
                'Frequentist: "this coin lands heads" (repeatable). Bayesian also: "the Hubble constant is below 70 km/s/Mpc" (a fixed but unknown fact; degree of belief).',
            },
          ],
        },
        {
          slug: 'counting-and-equally-likely-outcomes',
          title: 'Counting and equally likely outcomes',
          summary:
            'Computing probabilities by counting: permutations, combinations, the multiplication rule and the classic problems (birthday, poker hands, sampling without replacement).',
          estimatedMinutes: 120,
          objectives: [
            'Apply the multiplication rule and count permutations and combinations',
            'Compute probabilities as ratios of counts when outcomes are equally likely',
            'Solve the birthday problem, hypergeometric sampling and arrangement problems',
            'Recognise when outcomes are not equally likely and avoid the "two outcomes so 50/50" fallacy',
            'Use binomial coefficients and Stirling\'s approximation for large counts',
          ],
          concepts: [
            'Multiplication rule',
            'Permutations $n!$, $n!/(n-k)!$',
            'Combinations $\\binom{n}{k}$',
            'Sampling with and without replacement',
            'Equally likely outcomes: $P = |A|/|\\Omega|$',
            'Birthday problem',
            'Hypergeometric counting',
            'Stirling\'s approximation',
          ],
          explanation: `When every outcome in a finite sample space is equally likely, probability is counting: $P(A) = |A|/|\\Omega|$. The skill is counting correctly, and three tools do most of the work. The **multiplication rule**: a sequence of choices with $n_1, n_2, \\dots$ options has $n_1n_2\\cdots$ outcomes. **Permutations**: $n$ distinct objects can be ordered in $n!$ ways, and $k$ of them chosen in order in $n!/(n-k)!$ ways. **Combinations**: $k$ objects chosen *without* regard to order in $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ ways. Ask yourself every time: does order matter, and is there replacement? Those two questions select the formula.

The **birthday problem** is the model calculation. With $n$ people, the probability that all birthdays differ is $\\frac{365\\cdot364\\cdots(365-n+1)}{365^n}$, which drops below $1/2$ at $n = 23$. The reason it is so small is that there are $\\binom{n}{2}$ pairs, each a chance for a match; the answer is approximately $e^{-n^2/730}$, a bound that extends to hash collisions and to spurious coincidences in data. Poker hands and lottery odds are combinations: the number of hands with exactly $k$ aces is $\\binom{4}{k}\\binom{48}{5-k}$, the **hypergeometric** count that governs any sampling without replacement (defective items, marked animals, galaxies in a survey).

The most common error is assuming outcomes are equally likely when they are not. "Either it rains or it doesn't" does not give 50%; the sum of two dice has 11 values but $7$ is six times more likely than $2$. Always count at the level where symmetry genuinely holds (the ordered pair of dice), not at the level of the quantity you care about. For large $n$, $n!$ overflows and you need **Stirling's approximation** $\\ln n! \\approx n\\ln n - n + \\tfrac12\\ln 2\\pi n$ or \`scipy.special.gammaln\`; this is also the route to the entropy formulas of statistical mechanics.

Counting is covered in more depth in discrete-mathematics; here you need enough to compute probabilities. Read 18.05 Class 1 reading and Blitzstein chapter 1 (the "story proofs" are worth studying), then do the exercises and simulate every answer.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 1: Counting and sets',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Lectures 1-2 and textbook chapter 1',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
              note: 'The "naive definition of probability" and story proofs for binomial identities.',
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 3: Combinatorics',
              url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS',
            },
          ],
          exercises: [
            {
              slug: 'poker-hands',
              title: 'Poker hand probabilities',
              prompt:
                'Compute the probability of a 5-card hand being: exactly one pair, two pairs, three of a kind, a flush, a full house. Express each as a ratio of binomial coefficients, evaluate, and verify by dealing $10^6$ random hands in Python (classify hands with `numpy.unique` counts). Report the relative error of each estimate and relate it to $1/\\sqrt{N p}$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'birthday-generalised',
              title: 'The birthday problem and its approximation',
              prompt:
                'Derive the exact probability of no shared birthday among $n$ people and the approximation $e^{-n(n-1)/730}$ via $\\ln(1 - k/365) \\approx -k/365$. Plot both against $n$ and find the smallest $n$ with $P(\\text{match}) > 0.5$ and $> 0.99$. Generalise to $d$ equally likely "days" and show the crossover is at $n \\approx 1.18\\sqrt{d}$; test with $d = 10^6$ by simulation.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'hypergeometric-sampling',
              title: 'Sampling without replacement',
              prompt:
                'A box has 20 resistors of which 5 are out of tolerance. You draw 6 at random. Find the probability that exactly $k$ are bad for $k = 0..5$ by counting, compare with `scipy.stats.hypergeom`, and with the binomial approximation (sampling with replacement) to see how much it errs. Repeat with 2000 resistors of which 500 are bad to see the approximation improve.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you decide between $n!/(n-k)!$ and $\\binom{n}{k}$?',
              answerOutline:
                'Ordered selection without replacement uses $n!/(n-k)!$; unordered uses $\\binom{n}{k}$, which divides out the $k!$ orderings.',
            },
            {
              question: 'Why is the birthday probability so much larger than intuition suggests?',
              answerOutline:
                'There are $\\binom{n}{2}$ pairs, each with chance $1/365$ of matching; the expected number of matching pairs reaches 1 around $n \\approx 27$.',
            },
            {
              question: 'Give an example where "two possible outcomes" are not equally likely and explain how to count correctly.',
              answerOutline:
                'Sum of two dice being 7 vs 2; count at the level of ordered pairs (36 equally likely), giving 6/36 vs 1/36.',
            },
          ],
        },
        {
          slug: 'conditional-probability-and-independence',
          title: 'Conditional probability and independence',
          summary:
            'Updating probabilities on information: the definition of conditional probability, the multiplication and total-probability rules, independence, and the classic paradoxes that test understanding.',
          estimatedMinutes: 120,
          objectives: [
            'Define conditional probability and compute it from a joint table or tree',
            'Apply the multiplication rule and the law of total probability',
            'Define independence precisely and distinguish it from disjointness and from conditional independence',
            'Solve the Monty Hall problem, the two-child problem and similar puzzles by careful conditioning',
            'Compute reliability of series and parallel systems using independence',
          ],
          concepts: [
            'Conditional probability $P(A|B) = P(A\\cap B)/P(B)$',
            'Multiplication rule $P(A\\cap B) = P(A|B)P(B)$',
            'Law of total probability',
            'Probability trees',
            'Independence $P(A\\cap B) = P(A)P(B)$',
            'Conditional independence',
            'Pairwise vs mutual independence',
            'Monty Hall and the importance of the information mechanism',
          ],
          explanation: `Learning that $B$ has occurred shrinks the sample space to $B$. The **conditional probability** of $A$ given $B$ is the fraction of $B$'s probability that lies in $A$:

$$P(A|B) = \\frac{P(A\\cap B)}{P(B)}, \\qquad P(B) > 0 .$$

Rearranged, the **multiplication rule** $P(A\\cap B) = P(A|B)P(B)$ lets you build joint probabilities along a **tree** of sequential events, and the **law of total probability** $P(A) = \\sum_i P(A|B_i)P(B_i)$ over a partition $\\{B_i\\}$ lets you compute an unconditional probability by cases. Trees and tables are not beginner crutches; experienced statisticians draw them because conditioning errors are subtle and common.

Two events are **independent** if $P(A\\cap B) = P(A)P(B)$, equivalently $P(A|B) = P(A)$: learning $B$ tells you nothing about $A$. Independence is an assumption about the physical mechanism (separate coin flips, uncorrelated noise), not a property you can read off a Venn diagram, and it is *not* the same as being disjoint; disjoint events with positive probability are maximally dependent, since one occurring rules out the other. Independence of many events requires the product rule for every subset (mutual independence), which is stronger than pairwise independence. Events may also be **conditionally independent** given $C$ while being dependent overall, or vice versa; the symptoms of a disease are independent given the diagnosis but correlated in the population. This distinction is the backbone of Bayesian networks and of the "naive Bayes" classifier.

The classic puzzles are tests of whether you condition on the right thing. In the **Monty Hall** problem, the host's door-opening is informative because he *knows* where the car is and never opens it; switching wins with probability 2/3. Change the mechanism (the host opens a random door that happens to be empty) and the answer changes to 1/2. The lesson generalises: you must condition on the *event that actually occurred*, including how the information was generated, not on a convenient paraphrase of it. The same error produces the prosecutor's fallacy in court and selection effects in astronomy.

Read 18.05 Class 3 and Blitzstein chapter 2, which has the best collection of conditioning paradoxes. Then do the exercises, including simulating Monty Hall under both host behaviours.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 3: Conditional probability, independence and Bayes\' theorem',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Chapter 2: Conditional Probability',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
              note: 'Includes Monty Hall, the two-envelope and conditional-independence examples, and Blitzstein\'s "conditioning is the soul of statistics".',
            },
            {
              title: 'Seeing Theory — Compound probability',
              url: 'https://seeing-theory.brown.edu/',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'Interactive set operations and conditional probability.',
            },
          ],
          exercises: [
            {
              slug: 'monty-hall-two-ways',
              title: 'Monty Hall under two host behaviours',
              prompt:
                'Compute by conditioning the probability that switching wins when (a) the host always opens an empty door he knows about, (b) the host opens a random other door and it happens to be empty. Simulate both for $10^5$ games, confirming 2/3 and 1/2. Explain in one paragraph why the outcome differs even though the observed door is empty in both cases.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'independence-vs-disjoint',
              title: 'Independence versus disjointness and the three-event trap',
              prompt:
                'Give a concrete example of two independent events and two disjoint events and show numerically they cannot coincide unless one has probability zero. Then construct three events (two fair coins: $A$ = first heads, $B$ = second heads, $C$ = both equal) that are pairwise independent but not mutually independent, verifying all four product conditions.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'system-reliability',
              title: 'Reliability of a detector array',
              prompt:
                'A detector has three independent channels each working with probability 0.9. Compute the probability the system works if it needs (a) all three, (b) at least one, (c) at least two (majority logic). Then suppose channel failures share a common cause so that given "power glitch" (probability 0.05) each channel fails with probability 0.5 independently, and otherwise with probability 0.05. Recompute (c) using the law of total probability and show the channels are no longer unconditionally independent.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define conditional probability and state the law of total probability.',
              answerOutline:
                '$P(A|B) = P(A\\cap B)/P(B)$; for a partition $B_i$, $P(A) = \\sum_i P(A|B_i)P(B_i)$.',
            },
            {
              question: 'Why are disjoint events (with positive probability) never independent?',
              answerOutline:
                '$P(A\\cap B) = 0 \\ne P(A)P(B) > 0$; knowing $B$ occurred tells you $A$ did not.',
            },
            {
              question: 'What changes the Monty Hall answer from 2/3 to 1/2?',
              answerOutline:
                'The information mechanism: a host who knowingly avoids the car conveys information about the remaining door; a host opening at random does not.',
            },
            {
              question: 'What does conditional independence mean and give a physical example.',
              answerOutline:
                '$P(A\\cap B|C) = P(A|C)P(B|C)$; e.g. two thermometers\' readings are independent given the true temperature but correlated unconditionally.',
            },
          ],
        },
        {
          slug: 'bayes-theorem',
          title: 'Bayes\' theorem',
          summary:
            'Inverting conditional probabilities: Bayes\' theorem, base rates, the odds form, sequential updating, and why medical tests and particle searches are misread without it.',
          estimatedMinutes: 120,
          objectives: [
            'Derive Bayes\' theorem from the definition of conditional probability',
            'Compute posterior probabilities for diagnostic tests and explain the base-rate effect',
            'Use the odds form with likelihood ratios (Bayes factors) for sequential updating',
            'Identify the prosecutor\'s fallacy and the confusion of $P(E|H)$ with $P(H|E)$',
            'Set up a simple Bayesian update over a discrete set of hypotheses in Python',
          ],
          concepts: [
            'Bayes\' theorem $P(H|E) = P(E|H)P(H)/P(E)$',
            'Prior, likelihood, posterior, evidence',
            'Base rate / prior probability',
            'Sensitivity and specificity',
            'Odds form and likelihood ratio',
            'Sequential updating',
            'Prosecutor\'s fallacy',
            'Discrete hypothesis space',
          ],
          explanation: `Science mostly needs the probability of a hypothesis given the evidence, $P(H|E)$, but what a model or an experiment supplies is the other direction, $P(E|H)$: the probability of this data if the hypothesis were true. **Bayes' theorem** connects them. From $P(H\\cap E) = P(E|H)P(H) = P(H|E)P(E)$,

$$P(H|E) = \\frac{P(E|H)\\,P(H)}{P(E)}, \\qquad P(E) = \\sum_i P(E|H_i)P(H_i) .$$

The names matter: $P(H)$ is the **prior**, $P(E|H)$ the **likelihood**, $P(E)$ the **evidence** (a normalising constant from the law of total probability), and $P(H|E)$ the **posterior**. The theorem is a one-line consequence of the definition of conditional probability; its importance comes from what it says about reasoning.

The standard example is a diagnostic test with 99% sensitivity ($P(+|\\text{disease})$) and 99% specificity ($P(-|\\text{healthy})$) for a disease with prevalence 1 in 1000. A positive result gives $P(\\text{disease}|+) = \\frac{0.99\\times0.001}{0.99\\times0.001 + 0.01\\times0.999} \\approx 9\\%$. Most people, including most physicians, guess 99%. The **base rate** dominates because false positives among the many healthy people outnumber true positives among the few sick. The same arithmetic governs a "5-sigma" bump in a particle search among thousands of analysed bins, a candidate exoplanet transit among millions of stars, and a positive match in a DNA database: confusing $P(E|H)$ with $P(H|E)$ is the **prosecutor's fallacy**.

The **odds form** makes updating transparent: $\\frac{P(H|E)}{P(\\neg H|E)} = \\frac{P(E|H)}{P(E|\\neg H)}\\times\\frac{P(H)}{P(\\neg H)}$, posterior odds equal **likelihood ratio** times prior odds. Each new independent piece of evidence multiplies the odds by its likelihood ratio, so evidence accumulates in logarithms (decibans, in Turing's usage). A likelihood ratio of 100 is strong evidence, but it still cannot overcome prior odds of 1 in a million on its own.

Bayes' theorem with a discrete set of hypotheses and a prior is already full Bayesian inference; module 6 extends it to continuous parameters and to sampling the posterior when it cannot be computed by hand. Read 18.05 Class 3 and the opening chapters of *Think Bayes*, which do exactly these computations in Python, and watch 3Blue1Brown's video for the geometric picture.`,
          resources: [
            {
              title: 'Think Bayes (Downey) — Chapters 1-2: Probability and Bayes\'s theorem',
              url: 'https://allendowney.github.io/ThinkBayes2/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              note: 'Free online; every example is a runnable Python notebook.',
              primary: true,
            },
            {
              title: '3Blue1Brown — Bayes\' theorem',
              url: 'https://www.3blue1brown.com/lessons/bayes-theorem',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'The area-of-rectangles picture of priors and likelihoods.',
            },
            {
              title: 'MIT 18.05 — Class 3 reading: Conditional probability, independence and Bayes\' theorem',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Includes the base-rate fallacy and the "Bayes table" method.',
            },
          ],
          exercises: [
            {
              slug: 'diagnostic-test-table',
              title: 'Diagnostic tests and base rates',
              prompt:
                'For a test with sensitivity 0.99 and specificity 0.99, compute $P(\\text{disease}|+)$ for prevalences $10^{-1}, 10^{-2}, 10^{-3}, 10^{-4}$ using a Bayes table (prior, likelihood, unnormalised posterior, posterior). Plot posterior against prevalence on a log axis. Then compute the posterior after a *second* independent positive test. Simulate a population of $10^6$ to confirm one of the numbers.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'odds-and-likelihood-ratios',
              title: 'Sequential updating in odds form',
              prompt:
                'Derive the odds form of Bayes\' theorem. A coin is either fair or biased with $P(H) = 0.7$; prior odds 1:1. Compute the likelihood ratio contributed by each flip, then process the sequence HHTHHHTHHH one flip at a time, plotting the log posterior odds. Repeat with a prior of 1000:1 in favour of fair and comment on how many flips it takes to overturn.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'which-die',
              title: 'Which die am I rolling?',
              prompt:
                'A bag holds a 4-, 6-, 8-, 12- and 20-sided die. One is drawn at random and rolled, giving 6, then 7, then 3. After each roll compute the posterior over the five dice (the likelihood of a roll $r$ is $1/n$ if $r \\le n$ else 0). Implement the update as a NumPy loop and plot the posterior after each observation. This is the *Think Bayes* dice problem; extend it to a 10-roll simulated sequence.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'look-elsewhere',
              title: 'The look-elsewhere effect as a base-rate problem',
              prompt:
                'A search scans 1000 independent mass bins for a new particle. Under the null, each bin shows a "3-sigma" excess with probability 0.00135. Compute the probability that at least one bin shows such an excess by chance. Then suppose the prior probability that a real particle exists in the scanned range is 0.1 and that a real particle would produce a 3-sigma excess in its bin with probability 0.5; compute the posterior probability that an observed single 3-sigma bump is real. Comment on why particle physics demands 5 sigma.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write Bayes\' theorem and name each term.',
              answerOutline:
                '$P(H|E) = P(E|H)P(H)/P(E)$: posterior = likelihood times prior over evidence, where evidence $= \\sum_i P(E|H_i)P(H_i)$.',
            },
            {
              question: 'Why is a positive result from a 99%-accurate test for a rare disease probably a false positive?',
              answerOutline:
                'With prevalence $10^{-3}$, false positives (1% of the 99.9% healthy) outnumber true positives (99% of the 0.1% sick) roughly 10 to 1; the base rate dominates.',
            },
            {
              question: 'State the odds form of Bayes\' theorem and explain its advantage for sequential evidence.',
              answerOutline:
                'Posterior odds = likelihood ratio times prior odds; independent evidence multiplies odds, so log-odds simply add.',
            },
            {
              question: 'What is the prosecutor\'s fallacy?',
              answerOutline:
                'Treating $P(\\text{evidence}|\\text{innocent})$ (small) as if it were $P(\\text{innocent}|\\text{evidence})$, ignoring the prior / base rate of innocent people who could match.',
            },
          ],
        },
      ],
    },
    {
      slug: 'random-variables-and-distributions',
      title: 'Random Variables and Distributions',
      description:
        'Random variables, expectation and variance, the standard discrete and continuous distributions and where they come from physically, and joint distributions with covariance and correlation.',
      lessons: [
        {
          slug: 'random-variables-and-expectation',
          title: 'Random variables, expectation and variance',
          summary:
            'Random variables as numerical outcomes, probability mass and density functions, cumulative distributions, and the moments (mean, variance) that summarise them.',
          estimatedMinutes: 150,
          objectives: [
            'Define discrete and continuous random variables with their PMF, PDF and CDF',
            'Compute expectation and variance from a distribution and prove linearity of expectation',
            'Use the law of the unconscious statistician to compute $E[g(X)]$',
            'Transform random variables and find the distribution of $Y = g(X)$',
            'Estimate means and variances from samples and understand why sample moments fluctuate',
          ],
          concepts: [
            'Random variable as a function on $\\Omega$',
            'PMF $p(x)$, PDF $f(x)$, CDF $F(x)$',
            'Expectation $E[X]$ and linearity',
            'Variance $\\operatorname{Var}(X) = E[X^2] - E[X]^2$, standard deviation',
            'Law of the unconscious statistician $E[g(X)] = \\int g f\\,dx$',
            'Change of variables for densities',
            'Quantiles and the median',
            'Moments and moment generating function (preview)',
          ],
          explanation: `A **random variable** is a number attached to each outcome: the sum of two dice, the number of photons in a pixel, the decay time of a nucleus. It is a function $X: \\Omega \\to \\mathbb{R}$, and probabilities of events like $\\{X \\le x\\}$ are inherited from $P$. The **cumulative distribution function** $F(x) = P(X \\le x)$ exists for every random variable and is the cleanest way to describe one. A **discrete** variable has a **probability mass function** $p(x) = P(X = x)$; a **continuous** one has a **probability density function** $f(x) = F'(x)$, so that $P(a < X \\le b) = \\int_a^b f\\,dx$. A density is not a probability: $f(x)$ can exceed 1, and $P(X = x) = 0$ for continuous $X$. Only $f(x)\\,dx$ is a probability, which is why densities pick up Jacobians when you change variables.

The **expectation** $E[X] = \\sum xp(x)$ or $\\int xf(x)\\,dx$ is the probability-weighted average, the centre of mass of the distribution. Its most useful property is **linearity**, $E[aX + bY] = aE[X] + bE[Y]$, which holds *whether or not* $X$ and $Y$ are independent and makes many hard-looking expectations trivial (write the quantity as a sum of indicators and add their expectations). The **variance** $\\operatorname{Var}(X) = E[(X - \\mu)^2] = E[X^2] - \\mu^2$ measures spread; its square root, the standard deviation, has the units of $X$ and is the "error bar" of physics. Variance is *not* linear: $\\operatorname{Var}(aX) = a^2\\operatorname{Var}(X)$, and variances add only for uncorrelated variables.

To compute $E[g(X)]$ you do not need the distribution of $g(X)$: $E[g(X)] = \\int g(x)f(x)\\,dx$ (the "law of the unconscious statistician"). But sometimes you do need the distribution of $Y = g(X)$, for instance the energy distribution from a speed distribution; for monotonic $g$, $f_Y(y) = f_X(g^{-1}(y))\\,|d g^{-1}/dy|$, the one-dimensional Jacobian rule, and in general work through the CDF.

Sample moments ($\\bar x$, $s^2$) estimate population moments and fluctuate from sample to sample; the size of that fluctuation is the subject of module 3. Note $E[X]$ need not exist: the Cauchy distribution (a Lorentzian line shape) has no mean, and sample averages of it never settle down, a fact worth seeing by simulation once.

Read 18.05 Classes 4-5 and Blitzstein chapters 3-5 (skipping the named distributions for the next lesson), and work through the OpenStax chapters for drill. The exercises emphasise computing moments both analytically and from samples.`,
          resources: [
            {
              title: 'MIT 18.05 — Classes 4-5: Discrete and continuous random variables, expectation and variance',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Chapters 3-5: Random variables, expectation, continuous random variables',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
            },
            {
              title: 'OpenStax Introductory Statistics 2e — Chapters 4-5',
              url: 'https://openstax.org/details/books/introductory-statistics-2e',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Elementary drill on discrete and continuous random variables.',
            },
            {
              title: 'SciPy — Statistics tutorial (scipy.stats distributions)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/stats.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'pdf, cdf, ppf, rvs, mean, var and the loc/scale conventions used in every later exercise.',
            },
          ],
          exercises: [
            {
              slug: 'moments-by-hand-and-sample',
              title: 'Moments analytically and from samples',
              prompt:
                'For $X$ with PDF $f(x) = 3x^2$ on $[0,1]$: find the CDF, $E[X]$, $\\operatorname{Var}(X)$, the median and $E[1/X]$. Sample $10^5$ values by inverse-CDF sampling ($X = U^{1/3}$) and compare sample mean, variance and median with the exact values. Plot a histogram against the PDF.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'linearity-of-expectation',
              title: 'Linearity of expectation with indicators',
              prompt:
                'Prove linearity of expectation for discrete variables. Use indicator variables to compute (a) the expected number of fixed points of a random permutation of $n$ items (answer 1, for any $n$), (b) the expected number of distinct birthdays among $n$ people, (c) the expected number of empty boxes when $m$ balls are thrown into $n$ boxes. Verify each by simulation for $n = 10$, $m = 15$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'transform-a-density',
              title: 'Transforming a density',
              prompt:
                'If speed $v$ has the Maxwell-Boltzmann density $f(v) \\propto v^2e^{-mv^2/2kT}$, derive the density of kinetic energy $E = \\tfrac12mv^2$ (answer: $\\propto \\sqrt{E}e^{-E/kT}$, the Gamma distribution with shape 3/2). Verify by sampling speeds, transforming, and comparing a histogram of $E$ with your formula. Compute the mean energy and confirm $\\langle E\\rangle = \\tfrac32kT$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cauchy-has-no-mean',
              title: 'A distribution with no mean',
              prompt:
                'Show that $\\int x\\frac{1}{\\pi(1 + x^2)}dx$ diverges. Sample Cauchy variables (`numpy.random.standard_cauchy`) and plot the running mean for $n$ up to $10^6$ on three independent runs; compare with the running mean of standard normals. Explain why the Cauchy running mean does not converge and why the median still works.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a probability density exceed 1 and what is the actual probability associated with it?',
              answerOutline:
                'Only $f(x)dx$ is a probability; $f$ has units of 1/$x$ and integrates to 1, so it can be large on a narrow interval.',
            },
            {
              question: 'Does linearity of expectation require independence? Does additivity of variance?',
              answerOutline:
                'No for expectation (always linear). Variances add only for uncorrelated variables; in general $\\operatorname{Var}(X+Y) = \\operatorname{Var}X + \\operatorname{Var}Y + 2\\operatorname{Cov}(X,Y)$.',
            },
            {
              question: 'How do you find the density of $Y = g(X)$ for monotonic $g$?',
              answerOutline:
                '$f_Y(y) = f_X(g^{-1}(y))|dg^{-1}/dy|$; the Jacobian keeps $f_Y\\,dy = f_X\\,dx$.',
            },
            {
              question: 'What is the law of the unconscious statistician?',
              answerOutline:
                '$E[g(X)] = \\int g(x)f_X(x)dx$: you can average $g$ against the distribution of $X$ without finding the distribution of $g(X)$.',
            },
          ],
        },
        {
          slug: 'discrete-distributions',
          title: 'Discrete distributions: Bernoulli, binomial, Poisson, geometric',
          summary:
            'The standard discrete distributions, the random processes that generate them, their moments, and the Poisson limit that governs photon counting and radioactive decay.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the binomial PMF from independent Bernoulli trials and compute its mean and variance',
            'Derive the Poisson distribution as the limit of the binomial and from a rate process, and state its mean-equals-variance property',
            'Apply the geometric and negative binomial distributions to waiting times',
            'Explain shot noise ($\\sigma = \\sqrt{N}$) in counting experiments and compute signal-to-noise ratios',
            'Fit and compare these distributions to count data using scipy.stats',
          ],
          concepts: [
            'Bernoulli trial',
            'Binomial $\\binom{n}{k}p^k(1-p)^{n-k}$, mean $np$, variance $np(1-p)$',
            'Poisson $e^{-\\lambda}\\lambda^k/k!$, mean = variance = $\\lambda$',
            'Poisson limit of the binomial',
            'Poisson process and rate $\\lambda$',
            'Geometric and negative binomial waiting times',
            'Shot noise and $\\sqrt{N}$ statistics',
            'Memorylessness',
          ],
          explanation: `A few distributions appear everywhere because a few random mechanisms appear everywhere. The **Bernoulli** variable is a single yes/no trial with success probability $p$. Sum $n$ independent Bernoulli trials and the number of successes is **binomial**: $P(K = k) = \\binom{n}{k}p^k(1-p)^{n-k}$, with mean $np$ and variance $np(1-p)$ (both immediate from linearity and independence applied to the sum of indicators). Binomial models anything counted out of a fixed number of independent chances: detector hits out of $n$ particles, heads out of $n$ flips, defective chips out of a batch.

Now let the number of chances grow, $n \\to \\infty$, while the expected count $\\lambda = np$ stays fixed. The binomial becomes the **Poisson** distribution

$$P(K = k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}, \\qquad E[K] = \\operatorname{Var}(K) = \\lambda .$$

The derivation (do it once) uses $\\binom{n}{k}p^k \\to \\lambda^k/k!$ and $(1 - \\lambda/n)^{n-k} \\to e^{-\\lambda}$. Physically, Poisson counts arise from events occurring independently at a constant rate: photons arriving at a CCD pixel, nuclear decays in a second, cosmic rays, website requests. The property **variance equals mean** is the origin of **shot noise**: a measurement of $N$ counts has uncertainty $\\sqrt{N}$, so the fractional precision improves as $1/\\sqrt{N}$ and the signal-to-noise ratio of a faint source is $S/\\sqrt{S + B}$ with $B$ the background counts. Every exposure-time calculator in astronomy is this formula. For large $\\lambda$ the Poisson distribution is approximately normal with that variance.

Waiting times come from the same trials. The number of trials until the first success is **geometric**, $P(T = t) = (1-p)^{t-1}p$, the only discrete distribution that is **memoryless**: having waited already does not change the remaining wait, a property shared by radioactive nuclei and the continuous exponential distribution. Waiting for the $r$-th success gives the negative binomial, which also serves as an "overdispersed Poisson" when counts have more variance than their mean.

The practical skill is recognising which mechanism is operating and checking the data against it: a Poisson fit is tested by comparing the sample variance with the sample mean, and overdispersion signals a varying rate. Read 18.05 Class 4 and Blitzstein chapter 4 (and 4.8 for the Poisson limit), then do the exercises, which include the detector calculation you will use repeatedly in observational astronomy.`,
          resources: [
            {
              title: 'Harvard Stat 110 — Chapter 4: Expectation (binomial, geometric, Poisson, and the Poisson approximation)',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
              primary: true,
            },
            {
              title: 'MIT 18.05 — Class 4 reading: Discrete random variables',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: '3Blue1Brown — Binomial distributions',
              url: 'https://www.3blue1brown.com/lessons/binomial-distributions',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
            },
            {
              title: 'Think Stats (Downey) — Distributions chapters',
              url: 'https://allendowney.github.io/ThinkStats/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              note: 'Empirical distributions and comparing data to models in Python.',
            },
          ],
          exercises: [
            {
              slug: 'poisson-limit-derivation',
              title: 'Derive the Poisson limit',
              prompt:
                'Derive the Poisson PMF as the limit of the binomial with $np = \\lambda$ fixed, and derive its mean and variance from the PMF (use $\\sum\\lambda^k/k! = e^\\lambda$). Then plot binomial($n$, $\\lambda/n$) for $\\lambda = 3$ and $n = 5, 20, 100, 1000$ against Poisson(3) and quantify the maximum PMF difference versus $n$.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'shot-noise-snr',
              title: 'Shot noise and exposure time',
              prompt:
                'A telescope collects 2 photons/s from a star and 50 photons/s of sky background in the same aperture. Derive the signal-to-noise ratio after exposure $t$, $S/N = 2t/\\sqrt{52t}$, and find the exposure needed for $S/N = 10$. Simulate 1000 exposures of that length with `numpy.random.poisson` for star+sky and sky-only frames, subtract, and confirm the empirical S/N. Then show how S/N scales if the aperture is shrunk to halve the background.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'overdispersion-test',
              title: 'Is it Poisson? Testing dispersion',
              prompt:
                'Generate (a) Poisson counts with $\\lambda = 5$ and (b) counts whose rate is itself random (Gamma-distributed with mean 5, i.e. negative binomial). For 500 samples of each compute the index of dispersion $s^2/\\bar x$. Show (a) gives values near 1 and (b) above 1. Fit both datasets with `scipy.stats.poisson` and `nbinom` by maximum likelihood (use `fit` or a direct likelihood maximisation) and compare the log-likelihoods.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'geometric-memoryless',
              title: 'Memorylessness',
              prompt:
                'Prove that the geometric distribution satisfies $P(T > s + t\\,|\\,T > s) = P(T > t)$ and that it is the only discrete distribution on $\\{1,2,\\dots\\}$ with this property. Simulate a radioactive sample of $10^4$ nuclei each decaying per time step with probability $p = 0.01$; show the lifetime distribution is geometric and the surviving number decays exponentially with mean lifetime $1/p$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Under what conditions does the Poisson distribution describe counts, and what is its signature?',
              answerOutline:
                'Independent events at a constant rate (or many rare independent chances); variance equals the mean.',
            },
            {
              question: 'Why does the signal-to-noise ratio of a counting measurement scale as $\\sqrt{t}$?',
              answerOutline:
                'Signal grows as $t$ while Poisson noise grows as $\\sqrt{\\text{counts}} \\propto \\sqrt t$; ratio $\\propto \\sqrt t$.',
            },
            {
              question: 'What are the mean and variance of a binomial variable and how are they derived?',
              answerOutline:
                '$np$ and $np(1-p)$; from the sum of $n$ independent indicators each with mean $p$ and variance $p(1-p)$.',
            },
            {
              question: 'What does overdispersion indicate?',
              answerOutline:
                'Variance exceeding the mean; the rate is not constant or events are not independent (clustering), e.g. a negative-binomial model.',
            },
          ],
        },
        {
          slug: 'continuous-distributions',
          title: 'Continuous distributions: uniform, exponential, normal and friends',
          summary:
            'The key continuous distributions, the normal distribution and its ubiquity, the exponential and its relation to Poisson processes, and the chi-square, Student-t, Gamma and power-law families that statistics uses.',
          estimatedMinutes: 150,
          objectives: [
            'Work with the uniform, exponential and normal distributions: PDFs, CDFs, moments, and the standardisation $Z = (X-\\mu)/\\sigma$',
            'Derive the exponential distribution from the Poisson process and explain its memorylessness',
            'Use the normal CDF and quantiles for probability calculations and know the 68-95-99.7 rule and sigma levels',
            'Recognise the Gamma, chi-square, Student-t, log-normal and power-law distributions and where each arises',
            'Generate samples from any distribution by inverse-CDF and by scipy.stats',
          ],
          concepts: [
            'Uniform distribution and inverse-CDF sampling',
            'Exponential distribution, rate, memorylessness',
            'Normal (Gaussian) $N(\\mu,\\sigma^2)$ and the standard normal',
            'Error function and sigma levels',
            'Gamma and chi-square distributions',
            'Student-t and heavy tails',
            'Log-normal and multiplicative processes',
            'Power laws and the Pareto distribution',
          ],
          explanation: `The **uniform** distribution on $[0,1]$ is what random number generators produce, and every other distribution is manufactured from it: if $U$ is uniform and $F$ is any CDF, then $X = F^{-1}(U)$ has CDF $F$ (**inverse-CDF sampling**). The **exponential** distribution $f(t) = \\lambda e^{-\\lambda t}$ is the waiting time between events of a Poisson process with rate $\\lambda$: $P(T > t) = P(\\text{no events in } t) = e^{-\\lambda t}$. It is memoryless, has mean $1/\\lambda$, and describes radioactive lifetimes, times between photon arrivals and the free path of a particle.

The **normal** distribution

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\left[-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right]$$

is everywhere because of the central limit theorem (next module): anything that is a sum of many small independent contributions is approximately normal. Its CDF has no closed form; it is written with the error function, $F(x) = \\tfrac12[1 + \\operatorname{erf}((x-\\mu)/\\sigma\\sqrt2)]$, and you compute it with \`scipy.stats.norm.cdf\`. Standardising, $Z = (X - \\mu)/\\sigma$, reduces every normal to $N(0,1)$, which is why results are quoted in "sigmas": 68.3% of the probability lies within $1\\sigma$, 95.4% within $2\\sigma$, 99.7% within $3\\sigma$, and a one-sided $5\\sigma$ tail has probability $2.9\\times10^{-7}$, the particle-physics discovery threshold. A linear combination of independent normals is normal, with variances adding; this is the mathematical content of error propagation in quadrature.

Several other families recur. The **Gamma** distribution generalises the exponential (sum of $k$ exponentials; Maxwell-Boltzmann energies); the **chi-square** with $\\nu$ degrees of freedom is the distribution of a sum of $\\nu$ squared standard normals and therefore of goodness-of-fit statistics; **Student's t** is what replaces the normal when the variance is estimated from few samples, and its heavy tails are the honest description of small-sample uncertainty. The **log-normal** arises from products of many factors (particle sizes, incomes, luminosities of some populations) and is recognised by a Gaussian histogram of $\\log x$. **Power laws** $f(x) \\propto x^{-\\alpha}$ (Pareto, Zipf) describe earthquake magnitudes, stellar initial masses and citation counts; they have infinite variance for $\\alpha \\le 3$ and infinite mean for $\\alpha \\le 2$, so sample averages can be meaningless, and they are badly fitted by eye on log-log histograms. For all of these, \`scipy.stats\` provides pdf, cdf, ppf (quantile), rvs and fit; learn the \`loc\`/\`scale\` convention once and you can use every distribution it offers.

Read 18.05 Class 5 and Blitzstein chapter 5, then Think Stats chapters on modelling distributions. The exercises make you compute tail probabilities and generate samples by hand before trusting the library.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 5 reading: Continuous random variables (uniform, exponential, normal)',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Chapter 5: Continuous random variables',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
              note: 'Universality of the uniform (inverse-CDF sampling), normal, exponential, and the Poisson process.',
            },
            {
              title: 'Think Stats (Downey) — Modeling distributions',
              url: 'https://allendowney.github.io/ThinkStats/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              note: 'Exponential, normal, log-normal and Pareto fits to real data, with probability plots.',
            },
            {
              title: 'SciPy — scipy.stats tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/stats.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
          ],
          exercises: [
            {
              slug: 'inverse-cdf-sampling',
              title: 'Inverse-CDF sampling from scratch',
              prompt:
                'Prove that $F^{-1}(U)$ has CDF $F$. Implement samplers for the exponential ($-\\ln(1-U)/\\lambda$), the Pareto ($x_m U^{-1/\\alpha}$) and the Cauchy ($\\tan(\\pi(U - 1/2))$) using only `numpy.random.random`. Compare histograms of $10^5$ samples to the PDFs, and compare the sample mean of the Pareto for $\\alpha = 1.5, 2.5, 3.5$ with the theoretical mean (noting when it does not exist).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'sigma-levels',
              title: 'Tail probabilities and sigma levels',
              prompt:
                'Using `scipy.stats.norm`, compute the two-sided probability outside $1, 2, 3, 5\\sigma$ and the one-sided $5\\sigma$ tail; compute the $z$ value corresponding to one-sided $p = 0.05, 0.01, 10^{-3}, 10^{-7}$. Then compare the tails of Student-t with $\\nu = 3, 10, 30$ degrees of freedom to the normal at $3\\sigma$ and discuss what a "3-sigma result" means when the standard deviation was estimated from 4 measurements.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'exponential-from-poisson-process',
              title: 'Exponential waiting times from a Poisson process',
              prompt:
                'Simulate a Poisson process with rate $\\lambda = 2$ per second for $10^4$ seconds by drawing exponential inter-arrival times; verify that counts in 1-second bins are Poisson(2) and that the time to the $k$-th event is Gamma($k$, $\\lambda$). Then verify memorylessness numerically: among waits longer than 1 s, the excess wait is again exponential with the same mean.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'fit-families-to-data',
              title: 'Which family fits?',
              prompt:
                'Generate three datasets of 2000 points: log-normal, Gamma(shape 3) and Pareto($\\alpha = 2.5$) with similar medians. For each, make a histogram on linear and log-log axes and a normal probability plot of $x$ and of $\\log x$, then fit all three families by `scipy.stats.<dist>.fit` and compare maximised log-likelihoods. Write a short note on which diagnostics distinguish the families and which do not.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does inverse-CDF sampling work?',
              answerOutline:
                '$P(F^{-1}(U) \\le x) = P(U \\le F(x)) = F(x)$ because $U$ is uniform on [0,1] and $F$ is non-decreasing.',
            },
            {
              question: 'Give the 68-95-99.7 rule and the one-sided tail probability at $5\\sigma$.',
              answerOutline:
                'Within $1,2,3\\sigma$: 68.3%, 95.4%, 99.7%; one-sided $5\\sigma$ tail $\\approx 2.9\\times10^{-7}$.',
            },
            {
              question: 'How is the exponential distribution related to the Poisson distribution?',
              answerOutline:
                'Inter-arrival times of a Poisson process with rate $\\lambda$ are exponential($\\lambda$); $P(T > t) = P(\\text{zero events in } t) = e^{-\\lambda t}$.',
            },
            {
              question: 'When does a power-law distribution have no finite variance, and why does that matter?',
              answerOutline:
                'For exponent $\\alpha \\le 3$ (density $\\propto x^{-\\alpha}$); sample variances and means (for $\\alpha \\le 2$) then fail to converge and Gaussian intuition is wrong.',
            },
          ],
        },
        {
          slug: 'joint-distributions-and-covariance',
          title: 'Joint distributions, covariance and correlation',
          summary:
            'Several random variables at once: joint, marginal and conditional distributions, covariance and correlation, the multivariate normal, and why correlation is not causation and not independence.',
          estimatedMinutes: 150,
          objectives: [
            'Work with joint PMFs/PDFs, compute marginals by summing/integrating and conditionals by dividing',
            'Define covariance and correlation, compute them, and state their properties and limits',
            'Derive $\\operatorname{Var}(X + Y)$ and the variance of a general linear combination using the covariance matrix',
            'Describe the bivariate normal, its covariance matrix and the geometry of its contours',
            'Explain why zero correlation does not imply independence and why correlation does not imply causation',
          ],
          concepts: [
            'Joint distribution $f(x,y)$',
            'Marginal and conditional distributions',
            'Independence of random variables $f(x,y) = f_X(x)f_Y(y)$',
            'Covariance $\\operatorname{Cov}(X,Y) = E[XY] - E[X]E[Y]$',
            'Correlation coefficient $\\rho \\in [-1,1]$',
            'Covariance matrix and variance of linear combinations',
            'Multivariate normal and its elliptical contours',
            'Correlation vs independence vs causation',
          ],
          explanation: `Real measurements come in bundles: position and velocity, flux in several bands, the parameters of a fitted model. A **joint distribution** $f(x, y)$ describes the pair; the **marginal** of $X$ is obtained by integrating out $Y$, $f_X(x) = \\int f(x,y)\\,dy$, and the **conditional** by dividing, $f(y|x) = f(x,y)/f_X(x)$, exactly as for events. $X$ and $Y$ are **independent** if the joint factorises into the product of marginals, and then every function of $X$ is independent of every function of $Y$.

The first-order summary of dependence is the **covariance** $\\operatorname{Cov}(X,Y) = E[(X - \\mu_X)(Y - \\mu_Y)] = E[XY] - \\mu_X\\mu_Y$, positive when $X$ and $Y$ tend to be above their means together. Scaling it gives the **correlation coefficient** $\\rho = \\operatorname{Cov}(X,Y)/\\sigma_X\\sigma_Y$, which lies in $[-1, 1]$ (Cauchy-Schwarz) and equals $\\pm1$ only for an exact linear relation. Covariance is bilinear, which gives the formula you will use most often:

$$\\operatorname{Var}\\left(\\sum_i a_iX_i\\right) = \\sum_i a_i^2\\operatorname{Var}(X_i) + 2\\sum_{i<j}a_ia_j\\operatorname{Cov}(X_i,X_j) = \\mathbf{a}^T\\Sigma\\mathbf{a},$$

with $\\Sigma$ the **covariance matrix**. Independent errors add in quadrature; correlated ones do not, and ignoring the covariance term is the most common error in uncertainty propagation. $\\Sigma$ is symmetric and positive semidefinite, so it has orthogonal eigenvectors (the principal axes) with non-negative eigenvalues (the variances along them): linear algebra's spectral theorem applied to data.

The **multivariate normal** is defined entirely by its mean vector and covariance matrix, $f(\\mathbf{x}) \\propto \\exp[-\\tfrac12(\\mathbf{x} - \\boldsymbol\\mu)^T\\Sigma^{-1}(\\mathbf{x} - \\boldsymbol\\mu)]$; its contours are ellipses whose axes are the eigenvectors of $\\Sigma$, and its marginals and conditionals are again normal. The "error ellipse" of a two-parameter fit is this object, and for normals, and only for normals, zero correlation implies independence.

In general it does not: $Y = X^2$ with symmetric $X$ has zero covariance but total dependence, because covariance sees only *linear* relationships. Nor does correlation imply causation: a common cause (confounder) or selection effect induces correlation between unrelated quantities, a problem addressed by experimental design and causal reasoning rather than by more data.

Read 18.05 Class 7 (joint distributions, covariance and correlation) and Blitzstein chapter 7, then the eigen-decomposition lesson in math-methods if the covariance-matrix geometry is unfamiliar. The exercises build the error ellipse you will see in every fitting problem.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 7 reading: Joint distributions, independence, covariance and correlation',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Chapter 7: Joint distributions (and the multivariate normal)',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
            },
            {
              title: 'Seeing Theory — Correlation and regression',
              url: 'https://seeing-theory.brown.edu/',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'Interactive scatter plots that show what each value of $\\rho$ looks like.',
            },
            {
              title: 'NumPy — Random sampling (numpy.random), including multivariate_normal',
              url: 'https://numpy.org/doc/stable/reference/random/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
            },
          ],
          exercises: [
            {
              slug: 'joint-table-computations',
              title: 'Marginals, conditionals and covariance from a joint table',
              prompt:
                'For the joint PMF of $(X, Y)$ given by the table $P(X=0,Y=0) = 0.3$, $P(0,1) = 0.1$, $P(1,0) = 0.2$, $P(1,1) = 0.4$, compute both marginals, $P(Y|X=1)$, $E[XY]$, $\\operatorname{Cov}(X,Y)$ and $\\rho$. Decide whether $X, Y$ are independent. Then do the same for the continuous joint density $f(x,y) = 6xy^2$ on the unit square and $f(x,y) = 2$ on the triangle $0 < x < y < 1$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'error-ellipse',
              title: 'The error ellipse of a bivariate normal',
              prompt:
                'Sample $10^4$ points from a bivariate normal with $\\sigma_x = 2$, $\\sigma_y = 1$, $\\rho = 0.7$. Estimate the covariance matrix with `numpy.cov`, diagonalise it, and draw the $1\\sigma$ and $2\\sigma$ ellipses (semi-axes $\\sqrt{\\lambda_i}$ scaled by the chi-square quantile for 2 degrees of freedom: 1.515 and 2.486 for 68% and 95%) over the scatter. Count the fraction of points inside each ellipse and compare with 68% and 95%.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'correlated-error-propagation',
              title: 'Variance of a linear combination with correlated errors',
              prompt:
                'Derive $\\operatorname{Var}(aX + bY)$ from bilinearity of covariance. Two measurements of a quantity have $\\sigma_1 = \\sigma_2 = 1$ and correlation $\\rho$. Show the variance of their average is $(1 + \\rho)/2$ and plot it against $\\rho$; comment on $\\rho = 1$ (no gain from averaging) and $\\rho = -1$. Then find the weights $(w, 1-w)$ minimising the variance of the combination when $\\sigma_1 = 1$, $\\sigma_2 = 2$, $\\rho = 0.5$, and compare with the uncorrelated inverse-variance weights.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'zero-correlation-dependence',
              title: 'Uncorrelated but dependent',
              prompt:
                'Let $X \\sim N(0,1)$ and $Y = X^2$. Show analytically that $\\operatorname{Cov}(X,Y) = 0$ and verify with $10^5$ samples. Show $X$ and $Y$ are dependent by comparing $P(Y > 1 | |X| < 0.5)$ with $P(Y > 1)$. Then generate a dataset where $X$ and $Y$ are both driven by a hidden $Z$ (e.g. $X = Z + \\epsilon_1$, $Y = Z + \\epsilon_2$) and show the strong correlation that results from a common cause.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you obtain a marginal and a conditional distribution from a joint one?',
              answerOutline:
                'Marginal: integrate/sum out the other variable. Conditional: divide the joint by the marginal of the conditioning variable.',
            },
            {
              question: 'Write the variance of $\\sum a_iX_i$ in terms of the covariance matrix and say when the cross terms vanish.',
              answerOutline:
                '$\\mathbf{a}^T\\Sigma\\mathbf{a}$; cross terms vanish when the variables are uncorrelated (in particular independent).',
            },
            {
              question: 'Does zero correlation imply independence? For which family is it true?',
              answerOutline:
                'No in general (e.g. $Y = X^2$); true for jointly normal variables.',
            },
            {
              question: 'What determines the orientation and size of a bivariate-normal error ellipse?',
              answerOutline:
                'The eigenvectors of the covariance matrix give the axes; the square roots of eigenvalues (times a chi-square factor for the desired confidence) give the semi-axes.',
            },
          ],
        },
      ],
      project: {
        slug: 'distribution-zoo',
        title: 'Module project: a distribution zoo with physical origins',
        description:
          'Build a notebook that, for each of ten distributions (Bernoulli, binomial, Poisson, geometric, uniform, exponential, normal, Gamma/chi-square, log-normal, Pareto), (1) states the generating mechanism, (2) simulates that mechanism directly in NumPy without using the library sampler, (3) overlays the resulting histogram on the scipy.stats PDF/PMF, and (4) checks mean and variance against theory. Include at least two "limits" (binomial to Poisson, Poisson to normal) shown as animated or multi-panel figures.',
        deliverables: [
          'Notebook with one section per distribution: mechanism, simulation, overlay, moment check',
          'A one-page cheat sheet (PDF or Markdown) of PMF/PDF, mean, variance and typical physical use for each distribution',
        ],
        estimatedHours: 6,
      },
    },
    {
      slug: 'limit-theorems-and-sampling',
      title: 'Limit Theorems and Sampling',
      description:
        'Why averages work: the law of large numbers, the central limit theorem, the sampling distributions of statistics, and how to generate and use random numbers in simulation.',
      lessons: [
        {
          slug: 'law-of-large-numbers',
          title: 'The law of large numbers and concentration',
          summary:
            'Why sample averages converge to expectations, how fast ($1/\\sqrt n$), the Chebyshev inequality, and the situations in which averaging fails.',
          estimatedMinutes: 120,
          objectives: [
            'State the weak law of large numbers and prove it with Chebyshev\'s inequality',
            'Derive the $1/\\sqrt{n}$ scaling of the standard error of the mean',
            'Use Markov and Chebyshev inequalities to bound tail probabilities',
            'Explain the gambler\'s fallacy and regression to the mean in terms of the law',
            'Identify when averaging fails: infinite variance, correlated samples, nonstationarity',
          ],
          concepts: [
            'Sample mean $\\bar X_n$ and its expectation',
            'Standard error $\\sigma/\\sqrt n$',
            'Markov inequality $P(X \\ge a) \\le E[X]/a$',
            'Chebyshev inequality $P(|X - \\mu| \\ge k\\sigma) \\le 1/k^2$',
            'Weak and strong laws of large numbers',
            'Convergence in probability',
            'Gambler\'s fallacy and regression to the mean',
            'Effective sample size for correlated data',
          ],
          explanation: `The **law of large numbers** is the reason measurement works. If $X_1, X_2, \\dots$ are independent with mean $\\mu$ and variance $\\sigma^2$, the sample mean $\\bar X_n = \\frac1n\\sum X_i$ has $E[\\bar X_n] = \\mu$ (linearity) and $\\operatorname{Var}(\\bar X_n) = \\sigma^2/n$ (independence). The standard deviation of the average, the **standard error**, is therefore $\\sigma/\\sqrt n$: averaging 100 measurements improves precision by a factor of 10, and the next factor of 10 costs 10,000. Every error bar on a mean in a physics paper rests on this formula, and its slow $1/\\sqrt n$ scaling is why Monte Carlo methods converge slowly and why systematic errors eventually dominate.

To turn the shrinking variance into a statement about probability you need an inequality. **Markov**: for non-negative $X$, $P(X \\ge a) \\le E[X]/a$. Apply it to $(X - \\mu)^2$ and you get **Chebyshev**: $P(|X - \\mu| \\ge k\\sigma) \\le 1/k^2$, valid for *any* distribution with finite variance. Applied to $\\bar X_n$,

$$P(|\\bar X_n - \\mu| \\ge \\epsilon) \\le \\frac{\\sigma^2}{n\\epsilon^2} \\to 0,$$

which is the **weak law**: the sample mean converges in probability to $\\mu$. The strong law (almost-sure convergence) is deeper but says the same thing in practice: the running average of a simulation settles down. Chebyshev's bound is loose (the normal tail at $3\\sigma$ is 0.27%, Chebyshev allows 11%), but it is universal; the central limit theorem gives the sharp version.

The law is misread in two opposite ways. The **gambler's fallacy** imagines that a run of heads must be "balanced" by tails; in fact the law works by *dilution* (the excess becomes negligible relative to $n$), not by compensation, and the absolute excess typically grows like $\\sqrt n$. **Regression to the mean** is real but not a force: an extreme measurement is partly noise, so the next one is expected to be closer to the mean, which is why "treatments" applied after an extreme look effective.

The law can fail. If the variance is infinite (Cauchy, Pareto with $\\alpha \\le 2$) the average never converges. If samples are **correlated** (a time series, an MCMC chain) the variance of the mean is larger than $\\sigma^2/n$ by a factor related to the correlation time, and the **effective sample size** $n_{\\text{eff}} = n/\\tau$ is what counts; the MCMC lessons return to this. If the process is **nonstationary** (drift in a detector) there is no fixed $\\mu$ to converge to. Checking these three conditions is part of every analysis.

Read 18.05 Class 6 (the LLN and CLT reading) and Blitzstein chapter 10, then do the exercises; the running-average plots make the $\\sqrt n$ law and its failures visible in minutes.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 6 reading: Central limit theorem and the law of large numbers',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Harvard Stat 110 — Chapter 10: Inequalities and limit theorems',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
              note: 'Markov, Chebyshev, Chernoff; weak and strong laws.',
            },
            {
              title: 'Seeing Theory — Basic probability: expectation and the law of large numbers',
              url: 'https://seeing-theory.brown.edu/',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
            },
          ],
          exercises: [
            {
              slug: 'running-averages',
              title: 'Running averages and the $1/\\sqrt n$ law',
              prompt:
                'Simulate 50 independent sequences of $10^5$ exponential(1) variables and plot their running means on log-$n$ axes with the envelope $1 \\pm 2/\\sqrt n$. Then compute the standard deviation of $\\bar X_n$ across the 50 runs at $n = 10, 100, 1000, 10^4, 10^5$ and fit a power law to confirm the exponent $-1/2$. Repeat with Pareto($\\alpha = 1.5$) samples and describe what breaks.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'prove-chebyshev',
              title: 'Markov, Chebyshev and the weak law',
              prompt:
                'Prove Markov\'s inequality from the definition of expectation, derive Chebyshev\'s from it, and then prove the weak law of large numbers. Compare the Chebyshev bound with the exact normal tail probability at $k = 1, 2, 3, 5$ and with the empirical tails of a uniform and an exponential variable to see how loose it is.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'correlated-samples',
              title: 'Averaging correlated samples',
              prompt:
                'Generate an AR(1) time series $x_{t+1} = \\phi x_t + \\epsilon_t$ with $\\phi = 0.9$ and unit-variance white noise $\\epsilon$. Show empirically (over many realisations) that the variance of the mean of $n = 1000$ samples is much larger than $\\sigma^2/n$, derive the factor $(1+\\phi)/(1-\\phi)$ for large $n$, and compute the effective sample size. Explain why this matters for MCMC output.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'gamblers-fallacy',
              title: 'Dilution, not compensation',
              prompt:
                'Simulate $10^4$ sequences of $10^4$ fair coin flips. Plot the distribution of the absolute excess of heads over tails at $n = 100, 1000, 10^4$ and show it grows like $\\sqrt n$ while the fractional excess shrinks like $1/\\sqrt n$. Then condition on sequences that start with 10 heads and show the subsequent flips are unaffected.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the standard error of the mean and what two facts does it rest on?',
              answerOutline:
                '$\\sigma/\\sqrt n$; linearity of expectation (unbiased) and additivity of variance for independent samples.',
            },
            {
              question: 'State Chebyshev\'s inequality and explain why it applies to every distribution with finite variance.',
              answerOutline:
                '$P(|X-\\mu| \\ge k\\sigma) \\le 1/k^2$; it follows from Markov\'s inequality applied to $(X-\\mu)^2$ with no assumption on the shape.',
            },
            {
              question: 'Name three situations where the sample mean fails to converge to a useful value.',
              answerOutline:
                'Infinite variance/mean (heavy tails), strongly correlated samples (needs effective sample size), nonstationary process (no fixed mean).',
            },
            {
              question: 'Why is the gambler\'s fallacy wrong even though the law of large numbers is true?',
              answerOutline:
                'The fraction converges because early deviations are diluted by many later independent flips, not because later flips compensate; the absolute deviation actually grows as $\\sqrt n$.',
            },
          ],
        },
        {
          slug: 'central-limit-theorem',
          title: 'The central limit theorem',
          summary:
            'Why sums of many independent variables are normal, how fast the approximation becomes good, the conditions that must hold, and the consequences for error bars and for noise in experiments.',
          estimatedMinutes: 150,
          objectives: [
            'State the central limit theorem precisely and explain what converges to what',
            'Sketch the proof via moment generating or characteristic functions',
            'Assess how many terms are needed for a good normal approximation for different parent distributions',
            'Explain why measurement noise and errors are so often Gaussian, and why heavy tails break the theorem',
            'Apply the CLT to the binomial (de Moivre-Laplace) and Poisson distributions and to the sum of uniform random numbers',
          ],
          concepts: [
            'Standardised sum $(S_n - n\\mu)/\\sigma\\sqrt n \\to N(0,1)$',
            'Convergence in distribution',
            'Moment generating function / characteristic function',
            'Normal approximation to the binomial and Poisson',
            'Continuity correction',
            'Berry-Esseen rate ($\\propto 1/\\sqrt n$, depends on skewness)',
            'Heavy tails and stable distributions',
            'Gaussian noise as a sum of many small contributions',
          ],
          explanation: `The law of large numbers says the sample mean converges; the **central limit theorem** says what the fluctuations around the limit look like. For independent, identically distributed $X_i$ with mean $\\mu$ and finite variance $\\sigma^2$,

$$\\frac{\\bar X_n - \\mu}{\\sigma/\\sqrt n} \\;\\xrightarrow{d}\\; N(0, 1) \\qquad\\text{as } n \\to \\infty,$$

whatever the shape of the parent distribution. Dice sums, photon counts, measurement errors made of many small contributions, the displacement of a random walker: all become Gaussian. This is why the normal distribution is the default model of noise, why error bars are quoted as $\\pm\\sigma/\\sqrt n$ with Gaussian confidence levels, and why the chi-square and least-squares machinery of later modules works at all.

The proof idea is worth knowing. The **characteristic function** $\\phi_X(t) = E[e^{itX}]$ (the Fourier transform of the density) turns sums of independent variables into products. Expand $\\ln\\phi$ of the standardised summand to second order: $-t^2/2n + O(n^{-3/2})$; raise to the $n$-th power and the limit is $e^{-t^2/2}$, the characteristic function of $N(0,1)$. The first-order term vanishes by centring, the second gives the variance, and all higher cumulants are suppressed by powers of $1/\\sqrt n$. The Gaussian is the fixed point of adding and rescaling.

How fast? The Berry-Esseen theorem says the error of the normal approximation is bounded by a constant times (third absolute moment)/$(\\sigma^3\\sqrt n)$: skewed parents converge slowly, symmetric ones fast. Twelve uniforms give an excellent Gaussian (a classic generator); an exponential needs $n \\sim 50$ before its skew is hidden; a Poisson with mean 3 is visibly skewed, with mean 100 it is Gaussian. For the **binomial**, the de Moivre-Laplace theorem gives $N(np, np(1-p))$, improved by the **continuity correction** of half a unit at the edges of a discrete interval.

The theorem has hypotheses, and the real world breaks them. Infinite variance (power-law tails with $\\alpha \\le 3$) replaces the normal with a **stable** (Lévy) distribution; sums are then dominated by the single largest term, and "$5\\sigma$" events are routine. Strong dependence among the summands also defeats it. When a histogram of residuals shows tails far heavier than Gaussian, one of these is usually the reason, and the standard error formula is then wrong, not merely approximate.

Watch the 3Blue1Brown video for the convolution picture, read 18.05 Class 6 and Blitzstein section 10.3, then run the simulation exercises; the "CLT dashboard" exercise is a tool you will reuse to judge whether a Gaussian approximation is safe.`,
          resources: [
            {
              title: '3Blue1Brown — But what is the central limit theorem?',
              url: 'https://www.3blue1brown.com/lessons/clt',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Convolution picture of repeated sums; the companion convolution video is linked from the page.',
              primary: true,
            },
            {
              title: 'MIT 18.05 — Class 6 reading: Central limit theorem and the law of large numbers',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Harvard Stat 110 — Section 10.3: Central limit theorem (with MGF proof)',
              url: 'https://projects.iq.harvard.edu/stat110/home',
              type: 'course',
              cost: 'free',
              provider: 'Harvard',
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 9: Central Limit Theorem',
              url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS',
              note: 'Careful treatment of the binomial case and the continuity correction.',
            },
          ],
          exercises: [
            {
              slug: 'clt-dashboard',
              title: 'A CLT dashboard',
              prompt:
                'Write a function that takes a sampler and $n$, draws $10^4$ standardised sample means, and plots a histogram against $N(0,1)$ with a normal probability (Q-Q) plot and the Kolmogorov-Smirnov distance. Run it for uniform, exponential, Bernoulli($p = 0.05$), log-normal($\\sigma = 1$) and Pareto($\\alpha = 1.5$) parents with $n = 2, 5, 30, 300$. Tabulate the KS distance and explain the ordering by skewness; explain what the Pareto case shows.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'characteristic-function-proof',
              title: 'Sketch the proof',
              prompt:
                'Define the characteristic function, show that it turns sums of independent variables into products and that $\\phi_{aX}(t) = \\phi_X(at)$. Expand $\\ln\\phi$ for the standardised summand to second order and carry out the limit to obtain $e^{-t^2/2}$. Identify where finite variance is used, and show what goes wrong for the Cauchy distribution ($\\phi(t) = e^{-|t|}$).',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'normal-approximation-binomial',
              title: 'Normal approximation to the binomial',
              prompt:
                'A detector registers each of 10,000 particles with probability 0.3. Compute $P(2900 \\le K \\le 3100)$ exactly with `scipy.stats.binom`, with the normal approximation, and with the continuity correction; report the errors. Repeat for $n = 100$, $p = 0.03$ ($P(1 \\le K \\le 5)$) and show the Poisson approximation beats the normal there. State a rule of thumb.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'random-walk-gaussian',
              title: 'Random walk displacement becomes Gaussian',
              prompt:
                'Simulate $10^4$ one-dimensional random walks of $N$ steps with step lengths drawn from (a) $\\pm1$, (b) uniform$(-1,1)$, (c) a Student-t with 2 degrees of freedom. For $N = 10, 100, 1000$ plot the displacement histogram and the scaling of its standard deviation with $N$. Show (a) and (b) give $\\sigma \\propto \\sqrt N$ with Gaussian shape, and (c) does not (what exponent do you measure?). Relate (a)-(b) to diffusion.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the central limit theorem including its hypotheses.',
              answerOutline:
                'For i.i.d. variables with finite mean and variance, the standardised sum/mean converges in distribution to $N(0,1)$; independence and finite variance are essential.',
            },
            {
              question: 'Why do characteristic functions make the proof easy?',
              answerOutline:
                'Independence turns the characteristic function of a sum into a product; expanding the log to second order and taking the limit gives $e^{-t^2/2}$.',
            },
            {
              question: 'What controls how large $n$ must be for the normal approximation to be good?',
              answerOutline:
                'The skewness (third moment) of the parent and tail heaviness: Berry-Esseen error $\\propto E|X-\\mu|^3/(\\sigma^3\\sqrt n)$.',
            },
            {
              question: 'What replaces the Gaussian when the summands have infinite variance?',
              answerOutline:
                'A stable (Lévy) distribution with power-law tails; sums are dominated by the largest term and the $\\sqrt n$ scaling fails.',
            },
          ],
        },
        {
          slug: 'sampling-distributions',
          title: 'Sampling distributions: chi-square, Student-t and F',
          summary:
            'The distributions of statistics computed from normal samples: the sample variance and chi-square, the t statistic for a mean with unknown variance, and the F ratio of variances.',
          estimatedMinutes: 150,
          objectives: [
            'Define a statistic and its sampling distribution, and distinguish it from the data distribution',
            'Show that $(n-1)s^2/\\sigma^2$ is chi-square with $n-1$ degrees of freedom for normal data and explain the $n-1$',
            'Derive the Student-t distribution for $(\\bar x - \\mu)/(s/\\sqrt n)$ and explain its heavy tails for small $n$',
            'Use the F distribution to compare variances',
            'Simulate sampling distributions and compare them with the theoretical ones',
          ],
          concepts: [
            'Statistic and sampling distribution',
            'Sample variance $s^2 = \\frac{1}{n-1}\\sum(x_i - \\bar x)^2$ and Bessel\'s correction',
            'Chi-square distribution with $\\nu$ degrees of freedom',
            'Independence of $\\bar x$ and $s^2$ for normal data',
            'Student-t distribution',
            'F distribution',
            'Degrees of freedom',
            'Standard error of a variance estimate',
          ],
          explanation: `A **statistic** is any number computed from a sample: the mean, the variance, the maximum, a fitted slope. Because the sample is random, so is the statistic, and its distribution over repeated samples is its **sampling distribution**. Inference is entirely about sampling distributions: a confidence interval or a p-value is a statement about how a statistic would behave if the experiment were repeated. Keep the two distributions separate in your head: the data have one distribution (with spread $\\sigma$), the sample mean has another (with spread $\\sigma/\\sqrt n$).

For normal data three sampling distributions carry the load. First, the **sample variance** $s^2 = \\frac{1}{n-1}\\sum(x_i - \\bar x)^2$ satisfies

$$\\frac{(n-1)s^2}{\\sigma^2} \\sim \\chi^2_{n-1},$$

a sum of $n - 1$ squared standard normals. The **degrees of freedom** are $n - 1$ rather than $n$ because the residuals $x_i - \\bar x$ satisfy one linear constraint (they sum to zero); geometrically the residual vector lives in an $(n-1)$-dimensional subspace. The $n - 1$ in the definition (Bessel's correction) is exactly what makes $E[s^2] = \\sigma^2$. The same counting rule gives the degrees of freedom of every chi-square goodness-of-fit statistic: data points minus fitted parameters.

Second, if $\\sigma$ is unknown and replaced by $s$, the standardised mean $t = (\\bar x - \\mu)/(s/\\sqrt n)$ is no longer normal but follows **Student's t** with $n - 1$ degrees of freedom. It is the ratio of a standard normal to the square root of an independent chi-square over its degrees of freedom (the independence of $\\bar x$ and $s^2$ for normal data is a special fact). For small $n$ the $t$ distribution has much heavier tails: the 95% interval uses $t_{0.975} = 12.7$ for $n = 2$, 2.78 for $n = 5$, 2.26 for $n = 10$ and tends to 1.96. Quoting $\\pm1.96\\,s/\\sqrt n$ from three measurements is a classic error. Third, the ratio of two independent chi-squares over their degrees of freedom is the **F distribution**, used to compare variances and in analysis of variance and nested-model tests.

Degrees of freedom are not a mystical quantity; they count independent squared normal deviations. When a statistic's sampling distribution is not available in closed form, simulate it (the next lesson) or bootstrap it (module 4); and when the data are not normal, the chi-square and t results are only approximations whose accuracy you should check by simulation.

Read 18.05 Classes 10-11 (reading on the $t$ and $\\chi^2$ distributions), 18.650 lecture 2, and the Penn State STAT 415 notes, then do the simulation exercises.`,
          resources: [
            {
              title: 'MIT 18.05 — Unit 2 readings: Confidence intervals and the t and chi-square distributions',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'MIT 18.650 Statistics for Applications (Fall 2016) — Lecture 2: Parametric inference',
              url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Rigorous treatment of sample mean, sample variance, chi-square and Student-t (Cochran\'s theorem).',
            },
            {
              title: 'Penn State STAT 415 — Introduction to Mathematical Statistics (online notes)',
              url: 'https://online.stat.psu.edu/stat415/',
              type: 'textbook',
              cost: 'free',
              provider: 'Penn State',
              note: 'Sections on sampling distributions, the t distribution and the F distribution with worked examples.',
            },
          ],
          exercises: [
            {
              slug: 'simulate-sampling-distributions',
              title: 'Simulate the three distributions',
              prompt:
                'Draw $10^5$ samples of size $n = 5$ from $N(10, 4)$. Compute for each sample $\\bar x$, $s^2$ and $t = (\\bar x - 10)/(s/\\sqrt n)$. Overlay histograms of $(n-1)s^2/\\sigma^2$ on $\\chi^2_4$, of $t$ on Student-t(4) and on $N(0,1)$, and of $\\bar x$ on $N(10, 4/5)$. Then verify numerically that $\\bar x$ and $s^2$ are uncorrelated. Repeat with exponential data and see which approximations fail.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'bessel-correction',
              title: 'Why $n - 1$?',
              prompt:
                'Prove that $E\\left[\\sum(x_i - \\bar x)^2\\right] = (n-1)\\sigma^2$ for i.i.d. data, hence that $s^2$ with $n-1$ is unbiased while the $1/n$ version is biased low by the factor $(n-1)/n$. Verify by simulation for $n = 2, 3, 5, 10$. Then show that $s$ itself is biased as an estimator of $\\sigma$ (Jensen\'s inequality) and measure the bias for normal data with $n = 3$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 't-vs-normal-coverage',
              title: 'Coverage of t versus normal intervals',
              prompt:
                'For $n = 3, 5, 10, 30$ and $10^4$ repetitions, build intervals $\\bar x \\pm 1.96\\,s/\\sqrt n$ and $\\bar x \\pm t_{0.975,n-1}\\,s/\\sqrt n$ from normal samples and count how often each contains the true mean. Show the normal interval under-covers badly for small $n$ (about 82% at $n = 3$) while the t interval achieves 95%. Repeat for skewed (exponential) data and report both coverages.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a sampling distribution and why is it central to inference?',
              answerOutline:
                'The distribution of a statistic over repeated samples; confidence intervals and tests are statements about this distribution, not about the data distribution.',
            },
            {
              question: 'Why does the sample variance have $n - 1$ degrees of freedom?',
              answerOutline:
                'The $n$ residuals $x_i - \\bar x$ obey one linear constraint (sum to zero), leaving $n-1$ independent squared normal deviations; this also makes $s^2$ unbiased.',
            },
            {
              question: 'When must you use the t distribution rather than the normal for a mean?',
              answerOutline:
                'When $\\sigma$ is estimated from the same small sample; for $n \\lesssim 30$ the extra uncertainty in $s$ makes the tails substantially heavier.',
            },
            {
              question: 'How is the t statistic constructed from a normal and a chi-square?',
              answerOutline:
                '$t = Z/\\sqrt{\\chi^2_\\nu/\\nu}$ with $Z$ and $\\chi^2_\\nu$ independent; for normal data $\\bar x$ and $s^2$ provide exactly this.',
            },
          ],
        },
        {
          slug: 'random-numbers-and-simulation',
          title: 'Random numbers and Monte Carlo simulation',
          summary:
            'How pseudo-random generators work, seeding and reproducibility, generating samples from arbitrary distributions, and using simulation to estimate probabilities and sampling distributions with error bars.',
          estimatedMinutes: 120,
          objectives: [
            'Explain what a pseudo-random number generator is, why seeds matter, and how to use NumPy\'s Generator API correctly',
            'Generate samples by inverse-CDF, rejection sampling and the Box-Muller transform',
            'Estimate a probability or expectation by Monte Carlo and attach a standard error to it',
            'Simulate the sampling distribution of any statistic and read off bias and spread',
            'Test a generator or a sampler with simple statistical checks',
          ],
          concepts: [
            'Pseudo-random generator, state, seed, period',
            'numpy.random.default_rng and reproducibility',
            'Inverse-CDF sampling',
            'Rejection sampling and acceptance rate',
            'Box-Muller transform for normals',
            'Monte Carlo estimate and its standard error $s/\\sqrt N$',
            'Variance reduction (preview): antithetic and control variates',
            'Testing randomness: uniformity, independence, runs',
          ],
          explanation: `A computer cannot produce truly random numbers, but it can produce **pseudo-random** sequences that pass every statistical test you will apply: deterministic functions of an internal state, started from a **seed**. Modern generators (NumPy's default PCG64) have enormous periods and good statistical properties; the historical ones (linear congruential generators) are instructive failures whose points fall on hyperplanes. Two practical rules: always create a generator with \`numpy.random.default_rng(seed)\` so results are reproducible and independent streams do not collide, and never use the system time as a seed in scientific code you may need to rerun.

From uniform numbers you build everything. **Inverse-CDF** sampling works whenever $F^{-1}$ is cheap (exponential, Cauchy, Pareto, any discrete distribution via cumulative weights). The **Box-Muller** transform turns two uniforms into two independent standard normals via $R = \\sqrt{-2\\ln U_1}$, $\\Theta = 2\\pi U_2$, a direct consequence of the polar form of the Gaussian integral. **Rejection sampling** handles any density $f$ you can evaluate: draw from a proposal $g$ with $f \\le Mg$, accept with probability $f/Mg$; the acceptance rate $1/M$ is the efficiency, and it collapses in high dimensions, which is why MCMC exists (module 6).

A **Monte Carlo** estimate replaces an integral or probability by a sample average: $P(A) \\approx \\frac{1}{N}\\sum\\mathbb{1}[A]$, $E[g(X)] \\approx \\frac1N\\sum g(X_i)$. By the law of large numbers it converges, and by the central limit theorem its **standard error** is $s/\\sqrt N$ where $s$ is the sample standard deviation of the summands. Always report it; a Monte Carlo number without an error bar is not a result. For a probability $p$ estimated from $N$ trials the standard error is $\\sqrt{p(1-p)/N}$, so rare events need enormous $N$ (or importance sampling). The $1/\\sqrt N$ rate is independent of dimension, the key advantage over grid integration.

The most useful application in this subject is simulating a **sampling distribution**: generate fake datasets from a model, compute your statistic on each, and look at the histogram. This gives bias, standard error and coverage for any estimator, however complicated, with no theory required, and it is the basis of the parametric bootstrap and of every "fake data" test of an analysis pipeline.

Read the NumPy random documentation (the Generator API, not the legacy functions), the SciPy Lecture Notes section on random numbers, and Grinstead and Snell chapter 1 for the historical view. Then do the exercises; writing Box-Muller and a rejection sampler by hand takes 20 minutes and is worth it.`,
          resources: [
            {
              title: 'NumPy — Random sampling (numpy.random) documentation',
              url: 'https://numpy.org/doc/stable/reference/random/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
              note: 'Read the Generator quick start, bit generators and the section on parallel streams.',
              primary: true,
            },
            {
              title: 'Scientific Python Lectures — NumPy and SciPy chapters',
              url: 'https://lectures.scientific-python.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Scientific Python',
              note: 'Random numbers and scipy.stats examples.',
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 1 and Chapter 5.2 (simulation)',
              url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS',
            },
            {
              title: 'MIT 6.0002 Introduction to Computational Thinking and Data Science — Monte Carlo lectures',
              url: 'https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures 6-8 on random walks, Monte Carlo simulation and confidence intervals from simulation.',
            },
          ],
          exercises: [
            {
              slug: 'box-muller-and-rejection',
              title: 'Write your own samplers',
              prompt:
                'Implement Box-Muller from two uniforms and verify the output is $N(0,1)$ (histogram, sample moments up to the fourth, and the independence of the two outputs). Implement rejection sampling for the density $f(x) \\propto \\sin^2(x)e^{-x}$ on $[0, \\infty)$ using an exponential proposal; measure the acceptance rate and compare with the theoretical $1/M$. Derive the Box-Muller transform from the polar form of the Gaussian integral.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'monte-carlo-with-error-bars',
              title: 'Monte Carlo estimates with error bars',
              prompt:
                'Estimate $\\pi$ by throwing $N$ random points into a square and counting those inside the inscribed circle, for $N = 10^2..10^7$. Report each estimate with its standard error $\\sqrt{p(1-p)/N}\\times4$ and plot the error against $N$ on log-log axes with the $N^{-1/2}$ line. Then estimate $P(\\text{sum of 10 dice} \\ge 45)$ and the expected number of distinct values in 20 draws from 1..10, each with an error bar.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'bad-generator',
              title: 'Detecting a bad generator',
              prompt:
                'Implement the linear congruential generator RANDU ($x_{n+1} = 65539x_n \\bmod 2^{31}$). Plot consecutive triples $(x_n, x_{n+1}, x_{n+2})/2^{31}$ in 3D and rotate to see the planes. Run a chi-square uniformity test on $10^5$ outputs, which it will pass, and explain why passing one test does not mean a generator is good. Compare with `default_rng`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sampling-distribution-of-median',
              title: 'Sampling distribution of a messy statistic',
              prompt:
                'For $n = 15$ samples from a log-normal distribution, use simulation ($10^4$ fake datasets) to find the sampling distributions of the mean, median and trimmed mean (drop the top and bottom 2). Report bias and standard error of each as estimators of the population median, and decide which is best. Explain why no formula was needed.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should scientific code use an explicit seed and the Generator API?',
              answerOutline:
                'Reproducibility (same seed, same results), independent streams for parallel runs, and avoidance of the global-state pitfalls of the legacy API.',
            },
            {
              question: 'What is the standard error of a Monte Carlo estimate and how does it scale with sample size and dimension?',
              answerOutline:
                '$s/\\sqrt N$ ($\\sqrt{p(1-p)/N}$ for a probability); scales as $N^{-1/2}$ regardless of dimension.',
            },
            {
              question: 'How does rejection sampling work and when does it become inefficient?',
              answerOutline:
                'Propose from $g$ with $f \\le Mg$, accept with probability $f/(Mg)$; efficiency $1/M$ collapses when $g$ is a poor match or in high dimensions.',
            },
            {
              question: 'How would you find the standard error of an estimator with no known formula?',
              answerOutline:
                'Simulate many datasets from the model (or bootstrap the data), compute the estimator on each, and take the standard deviation of the results.',
            },
          ],
        },
      ],
      project: {
        slug: 'clt-and-sampling-laboratory',
        title: 'Module project: a sampling-distribution laboratory',
        description:
          'Build a reusable Python module that, given a sampler for a parent distribution and a statistic, simulates the sampling distribution and reports bias, standard error, a histogram against the relevant theoretical distribution (normal, chi-square, t) when one exists, and coverage of the corresponding interval. Use it to produce a report on how sample size, skewness and tail weight of the parent affect the validity of the normal and t approximations, including at least one heavy-tailed case where they fail.',
        deliverables: [
          'Python module with a documented function `sampling_distribution(sampler, statistic, n, reps)` and tests',
          'Report with figures for six parents times four sample sizes, and a recommendation table for when the Gaussian approximation is safe',
        ],
        estimatedHours: 6,
      },
    },
    {
      slug: 'estimation-and-confidence',
      title: 'Estimation and Confidence',
      description:
        'Turning data into parameter estimates with known uncertainty: estimator properties, maximum likelihood and its asymptotics, confidence intervals, and the bootstrap.',
      lessons: [
        {
          slug: 'point-estimation-and-estimator-properties',
          title: 'Point estimation: bias, variance and consistency',
          summary:
            'What makes an estimator good: bias, variance, mean squared error, consistency and efficiency, with the method of moments as a first construction and the Cramér-Rao bound as the limit.',
          estimatedMinutes: 120,
          objectives: [
            'Define estimator, bias, variance, mean squared error and consistency, and compute them for simple estimators',
            'Construct estimators by the method of moments',
            'Explain the bias-variance decomposition and give examples where a biased estimator has lower MSE',
            'State the Cramér-Rao bound and the role of Fisher information',
            'Compare estimators by simulation',
          ],
          concepts: [
            'Parameter, estimator, estimate',
            'Bias $E[\\hat\\theta] - \\theta$',
            'Mean squared error = variance + bias$^2$',
            'Consistency',
            'Method of moments',
            'Efficiency and the Cramér-Rao lower bound',
            'Fisher information',
            'Sufficient statistics (brief)',
          ],
          explanation: `Statistics inverts probability: given data that came from a model with unknown parameter $\\theta$, produce a number $\\hat\\theta$ that is close to $\\theta$. An **estimator** is a rule (a function of the data); an **estimate** is its value on your data. Since the data are random, so is $\\hat\\theta$, and its quality is described by its sampling distribution: the **bias** $b = E[\\hat\\theta] - \\theta$, the **variance** $\\operatorname{Var}(\\hat\\theta)$, and their combination, the **mean squared error**

$$\\text{MSE} = E[(\\hat\\theta - \\theta)^2] = \\operatorname{Var}(\\hat\\theta) + b^2 .$$

An estimator is **consistent** if it converges to $\\theta$ as $n \\to \\infty$ (the sample mean, by the law of large numbers). Unbiasedness is pleasant but not sacred: the bias-variance decomposition shows that accepting a little bias can reduce the MSE, which is the principle behind shrinkage, regularisation and most of machine learning. The $1/n$ sample variance has lower MSE than the unbiased $1/(n-1)$ version for normal data; the James-Stein estimator beats the sample mean in three or more dimensions.

The simplest construction is the **method of moments**: equate sample moments to theoretical moments and solve. For a Gamma distribution, $\\bar x = k\\theta$ and $s^2 = k\\theta^2$ give $\\hat k = \\bar x^2/s^2$. It is quick, consistent, and usually inefficient; maximum likelihood (next lesson) does better and includes it as a special case for exponential families.

How good can an estimator be? The **Cramér-Rao bound** says that for any unbiased estimator, $\\operatorname{Var}(\\hat\\theta) \\ge 1/I(\\theta)$, where the **Fisher information** $I(\\theta) = -E\\left[\\partial^2\\ln L/\\partial\\theta^2\\right]$ measures how sharply the likelihood peaks. Information adds over independent observations, so the bound scales as $1/n$ and gives the best possible standard error $1/\\sqrt{nI_1}$. An estimator that attains it is **efficient**; the sample mean for a normal with known variance is one, and maximum likelihood is asymptotically efficient in general. The Fisher information is also the curvature of the log-likelihood, which is exactly how the standard errors of a fit are computed in practice, so this bound is not academic: it tells you what precision your experiment can possibly reach before you build it.

Read 18.650 lectures 2-3 and the Penn State STAT 415 estimation notes, then do the exercises; the simulation comparison of estimators is the habit to acquire.`,
          resources: [
            {
              title: 'MIT 18.650 Statistics for Applications — Lectures 2-3: Parametric inference, estimators and their properties',
              url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Penn State STAT 415 — Point estimation (method of moments, MLE, properties)',
              url: 'https://online.stat.psu.edu/stat415/',
              type: 'textbook',
              cost: 'free',
              provider: 'Penn State',
            },
            {
              title: 'All of Statistics (Wasserman) — book site',
              url: 'https://www.stat.cmu.edu/~larry/all-of-statistics/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Springer',
              note: 'Chapter 6 (models, statistical inference) is the clearest short account; the free sources above cover the same material.',
            },
          ],
          exercises: [
            {
              slug: 'compare-estimators-uniform',
              title: 'Estimating the endpoint of a uniform',
              prompt:
                'Data are $n$ draws from Uniform$(0, \\theta)$. Consider three estimators: $2\\bar x$ (method of moments), the maximum $x_{(n)}$, and $\\frac{n+1}{n}x_{(n)}$. Derive the bias and variance of each (the maximum has CDF $(x/\\theta)^n$). Simulate with $\\theta = 1$, $n = 10$ and $10^4$ repetitions, tabulate bias, variance and MSE, and rank them. Explain why the biased maximum beats the unbiased moment estimator.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bias-variance-tradeoff',
              title: 'Shrinkage and the bias-variance trade-off',
              prompt:
                'For normal data with known $\\sigma = 1$ and $n = 5$, consider the shrunken mean $\\hat\\mu_c = c\\bar x$ for $c \\in [0, 1]$. Derive MSE$(c) = c^2/n + (1-c)^2\\mu^2$, find the optimal $c$ as a function of $\\mu$, and plot MSE against $c$ for $\\mu = 0.5, 1, 3$. Verify one curve by simulation. Explain why the optimal $c$ cannot be used directly and how regularisation approximates it.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fisher-information-poisson',
              title: 'Fisher information and the Cramér-Rao bound',
              prompt:
                'For $n$ Poisson($\\lambda$) counts, compute the Fisher information $I(\\lambda) = n/\\lambda$ and the Cramér-Rao bound $\\lambda/n$. Show the sample mean attains it. Then compute the Fisher information for the rate $\\lambda$ of an exponential from $n$ waiting times and for the probability $p$ of a binomial, and simulate to confirm the variance of each MLE approaches the bound for $n = 100$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the bias-variance decomposition of the MSE and explain why a biased estimator can be preferable.',
              answerOutline:
                'MSE = Var + bias$^2$; a small bias that greatly reduces variance lowers the total error (shrinkage, regularisation).',
            },
            {
              question: 'What is the Fisher information and what bound does it provide?',
              answerOutline:
                'Expected curvature of the log-likelihood, $-E[\\partial^2\\ln L/\\partial\\theta^2]$; any unbiased estimator has variance at least $1/I(\\theta)$ (Cramér-Rao).',
            },
            {
              question: 'What does consistency mean and how does it differ from unbiasedness?',
              answerOutline:
                'Consistency: converges to the true value as $n \\to \\infty$. Unbiasedness: correct on average at any $n$. An estimator can be either without the other.',
            },
            {
              question: 'Describe the method of moments and its main weakness.',
              answerOutline:
                'Equate sample moments to model moments and solve for parameters; it is consistent but typically inefficient and can give impossible values.',
            },
          ],
        },
        {
          slug: 'maximum-likelihood-estimation',
          title: 'Maximum likelihood estimation',
          summary:
            'The likelihood function, maximising it analytically and numerically, the asymptotic normality of the MLE with standard errors from the Hessian, and the link between least squares and Gaussian likelihoods.',
          estimatedMinutes: 180,
          objectives: [
            'Write down the likelihood and log-likelihood for i.i.d. data and for a regression model',
            'Derive MLEs for the normal, exponential, Poisson and binomial by setting the score to zero',
            'Maximise a likelihood numerically with scipy.optimize and obtain standard errors from the observed information (inverse Hessian)',
            'State the asymptotic properties of the MLE (consistency, normality, efficiency, invariance)',
            'Show that least squares is maximum likelihood with Gaussian errors and weighted least squares with heteroscedastic errors',
          ],
          concepts: [
            'Likelihood $L(\\theta) = \\prod f(x_i|\\theta)$ and log-likelihood',
            'Score $\\partial\\ell/\\partial\\theta$ and MLE',
            'Observed information and the Hessian',
            'Asymptotic normality $\\hat\\theta \\sim N(\\theta, I^{-1})$',
            'Invariance of the MLE',
            'Least squares as Gaussian MLE; $\\chi^2 = -2\\ln L + $ const',
            'Profile likelihood',
            'Numerical optimisation pitfalls (local maxima, parametrisation)',
          ],
          explanation: `The **likelihood** is the probability of the observed data viewed as a function of the parameters: $L(\\theta) = \\prod_i f(x_i|\\theta)$ for independent observations. It is *not* a probability distribution over $\\theta$ (that needs a prior; module 6), but it ranks parameter values by how well they explain the data, and the **maximum likelihood estimator** picks the best. Work with the log-likelihood $\\ell(\\theta) = \\sum\\ln f(x_i|\\theta)$: products become sums, and the maximisation condition is the **score equation** $\\partial\\ell/\\partial\\theta = 0$.

For the standard distributions the MLE is what you would guess: the sample mean for a normal mean, Poisson rate or Bernoulli probability; $1/\\bar x$ for an exponential rate; the $1/n$ sample variance for a normal variance (biased, illustrating that MLEs need not be unbiased). For a model $y_i = f(x_i;\\theta) + \\epsilon_i$ with Gaussian errors of known $\\sigma_i$,

$$\\ell(\\theta) = -\\frac12\\sum_i\\frac{(y_i - f(x_i;\\theta))^2}{\\sigma_i^2} + \\text{const} = -\\frac12\\chi^2(\\theta) + \\text{const},$$

so **least squares is maximum likelihood** under Gaussian errors, weighted by inverse variances, and minimising $\\chi^2$ is maximising $\\ell$. This single identity connects curve fitting, this module and the next, and it tells you when least squares is wrong: non-Gaussian errors (Poisson counts at low rates, outliers) call for the actual likelihood.

Why prefer the MLE? Under regularity conditions it is consistent, asymptotically efficient (it attains the Cramér-Rao bound), and asymptotically normal:

$$\\hat\\theta \\approx N\\left(\\theta, \\; I(\\hat\\theta)^{-1}\\right), \\qquad I(\\hat\\theta) = -\\frac{\\partial^2\\ell}{\\partial\\theta\\,\\partial\\theta^T}\\bigg|_{\\hat\\theta},$$

so the inverse of the Hessian of $-\\ell$ at the maximum is the covariance matrix of the estimates. This is how \`curve_fit\` and every fitting package produce error bars. The MLE is also **invariant**: the MLE of $g(\\theta)$ is $g(\\hat\\theta)$. Beware that the Gaussian approximation is only asymptotic; for small samples or parameters near a boundary, profile the likelihood ($\\Delta\\ell = -1/2$ gives the 68% interval) or go Bayesian.

Numerically, write $-\\ell$ as a function and hand it to \`scipy.optimize.minimize\`; use a good starting point (method of moments), check for multiple maxima, and parametrise so the parameters are unconstrained (log of a rate, logit of a probability). The Hessian can be obtained from the optimiser or by finite differences.

Read 18.05 Class 10 (maximum likelihood), 18.650 lectures 3-4, and the Hogg, Bovy and Lang "Fitting a model to data" paper, which is the best practical account of likelihoods for scientists.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 10 reading: Maximum likelihood estimates',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'MIT 18.650 — Lectures 3-4: Maximum likelihood estimation and its asymptotics',
              url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy and Lang)',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections 1-4: the likelihood view of least squares, with exercises on a real dataset. Essential for scientists.',
            },
            {
              title: 'SciPy — scipy.optimize.minimize documentation',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Use BFGS or Nelder-Mead; note which methods return an inverse Hessian estimate.',
            },
          ],
          exercises: [
            {
              slug: 'derive-standard-mles',
              title: 'Derive the standard MLEs',
              prompt:
                'Derive the MLEs for: the mean and variance of a normal (jointly), the rate of an exponential, the rate of a Poisson, and the probability of a binomial. For each, compute the Fisher information and the asymptotic standard error. Then show that the MLE of the normal variance is biased by the factor $(n-1)/n$ and that the MLE of $\\sigma$ (not $\\sigma^2$) follows from invariance.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'numerical-mle-with-hessian',
              title: 'Numerical MLE with errors from the Hessian',
              prompt:
                'Generate 200 samples from a Gamma distribution with shape 2.5 and scale 1.3. Write the negative log-likelihood, minimise it with `scipy.optimize.minimize` over (log shape, log scale), and obtain standard errors from the inverse Hessian (compute it by finite differences). Compare with `scipy.stats.gamma.fit` and with the spread of MLEs over 500 simulated datasets. Then profile the likelihood in the shape parameter and compare the $\\Delta\\ell = -1/2$ interval with the Hessian interval.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'least-squares-is-mle',
              title: 'Least squares as maximum likelihood',
              prompt:
                'Show that for $y_i = a + bx_i + \\epsilon_i$ with $\\epsilon_i \\sim N(0, \\sigma_i^2)$, maximising the likelihood is minimising $\\chi^2 = \\sum(y_i - a - bx_i)^2/\\sigma_i^2$, and derive the weighted normal equations and the covariance matrix $(A^TWA)^{-1}$. Generate data with heteroscedastic errors and show that unweighted least squares gives correct-looking but wrong error bars (check coverage over 1000 simulations) while weighted least squares is correct.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'poisson-likelihood-vs-chi2',
              title: 'Poisson likelihood versus chi-square for low counts',
              prompt:
                'Simulate a histogram of a decaying exponential signal with few counts per bin (mean 0.5-5). Fit the decay rate by (a) minimising Neyman\'s $\\chi^2$ with $\\sigma_i^2 = n_i$ (dropping empty bins), (b) Pearson\'s $\\chi^2$ with $\\sigma_i^2 = \\mu_i$, and (c) the Poisson likelihood. Repeat over 1000 simulations and report the bias of each; (a) should be biased significantly. Explain why.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the likelihood, and why is it not a probability distribution over the parameters?',
              answerOutline:
                '$L(\\theta) = f(\\text{data}|\\theta)$ as a function of $\\theta$; it does not integrate to 1 over $\\theta$ and needs a prior (Bayes) to become a posterior.',
            },
            {
              question: 'How are standard errors of MLEs obtained numerically?',
              answerOutline:
                'From the inverse of the observed information matrix, i.e. the Hessian of the negative log-likelihood at the maximum; valid asymptotically.',
            },
            {
              question: 'Explain the relation between $\\chi^2$ minimisation and maximum likelihood.',
              answerOutline:
                'With independent Gaussian errors, $\\ell = -\\chi^2/2 + $ const, so minimising weighted $\\chi^2$ is MLE; the identity fails for non-Gaussian errors such as low Poisson counts.',
            },
            {
              question: 'List three asymptotic properties of the MLE.',
              answerOutline:
                'Consistent, asymptotically normal with covariance $I^{-1}$, asymptotically efficient (attains Cramér-Rao); plus invariance under reparametrisation.',
            },
          ],
        },
        {
          slug: 'confidence-intervals',
          title: 'Confidence intervals',
          summary:
            'What a confidence interval is and is not, constructing intervals for means, proportions and MLEs, coverage, and the pitfalls of interpreting them.',
          estimatedMinutes: 150,
          objectives: [
            'Define a confidence interval through its coverage property and explain the frequentist meaning precisely',
            'Construct $z$, $t$ and proportion intervals and intervals from the asymptotic normality of MLEs',
            'Check coverage by simulation and recognise when nominal intervals under-cover',
            'Use likelihood-based (profile) intervals when the normal approximation fails',
            'Explain the difference between a confidence interval and a Bayesian credible interval',
          ],
          concepts: [
            'Coverage probability and confidence level',
            'Pivotal quantity',
            '$z$-interval and $t$-interval for a mean',
            'Wald and Wilson intervals for a proportion',
            'Intervals from the MLE and the Hessian',
            'Profile-likelihood intervals',
            'Interval width $\\propto 1/\\sqrt n$',
            'Confidence vs credible intervals',
          ],
          explanation: `A point estimate without an uncertainty is useless, and the frequentist way to express uncertainty is the **confidence interval**: a rule that, applied to data, produces an interval $[L, U]$ such that, over repeated experiments, the interval contains the true parameter a fraction $1 - \\alpha$ of the time. The probability statement is about the *procedure*, not about any particular interval; once computed, the interval either contains $\\theta$ or it does not. "There is a 95% probability that $\\theta$ is in [2.1, 2.9]" is a Bayesian statement that requires a prior; the frequentist statement is "95% of intervals constructed this way contain the truth".

Intervals are built from **pivotal quantities**, statistics whose distribution does not depend on the unknown parameter. For a normal mean with known $\\sigma$, $(\\bar x - \\mu)/(\\sigma/\\sqrt n) \\sim N(0,1)$ gives $\\bar x \\pm z_{\\alpha/2}\\,\\sigma/\\sqrt n$; with unknown $\\sigma$, the t pivot gives $\\bar x \\pm t_{\\alpha/2,n-1}\\,s/\\sqrt n$. For an MLE with asymptotic variance $I^{-1}$, the **Wald interval** is $\\hat\\theta \\pm z_{\\alpha/2}/\\sqrt{I(\\hat\\theta)}$; this is what fitting routines report, and it is only as good as the normal approximation. For a proportion the Wald interval $\\hat p \\pm z\\sqrt{\\hat p(1-\\hat p)/n}$ performs badly for small $n$ or $p$ near 0 or 1 (it can even be empty when $\\hat p = 0$); the **Wilson** interval fixes this and should be your default.

The honest test of any interval is its **coverage**, which you can always check by simulation: generate data from a known truth, build the interval, count. Nominal 95% intervals that cover 85% are common when sample sizes are small, errors are non-Gaussian, or parameters sit near boundaries. When the Wald interval is suspect, use the **profile likelihood**: the set of $\\theta$ with $\\ell(\\theta) \\ge \\ell(\\hat\\theta) - \\tfrac12 z_{\\alpha/2}^2$ (that is, $\\Delta\\chi^2 \\le 1$ for 68%, $\\le 3.84$ for 95%), which respects asymmetry and boundaries. In several dimensions, $\\Delta\\chi^2$ thresholds come from the chi-square with as many degrees of freedom as jointly constrained parameters (2.30 for 68% of two parameters), which is why error ellipses are larger than the product of 1D intervals.

Two interpretive rules. The width scales as $1/\\sqrt n$, so halving an error bar costs four times the data. And a confidence interval says nothing about where inside it the truth is most likely to be; that, again, is the Bayesian credible interval of module 6, which for flat priors and Gaussian likelihoods happens to coincide numerically with the confidence interval, a coincidence that causes most of the confusion between the two.

Read 18.05 Classes 11-12 and the 18.650 lecture on confidence intervals, then do the coverage simulations; they will make you distrust nominal levels in the right way.`,
          resources: [
            {
              title: 'MIT 18.05 — Classes 11-12 readings: Confidence intervals based on normal data; confidence intervals for the mean, proportions and the bootstrap',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'MIT 18.650 — Lecture on confidence intervals and the delta method',
              url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'OpenStax Introductory Statistics 2e — Chapter 8: Confidence intervals',
              url: 'https://openstax.org/details/books/introductory-statistics-2e',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Elementary intervals with many worked examples; good for drill.',
            },
            {
              title: 'Seeing Theory — Frequentist inference: confidence intervals',
              url: 'https://seeing-theory.brown.edu/',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'The interactive coverage demonstration is the best picture of what "95%" means.',
            },
          ],
          exercises: [
            {
              slug: 'coverage-simulation',
              title: 'Coverage of five intervals',
              prompt:
                'For each of the following, simulate $10^4$ datasets and report the empirical coverage of the nominal 95% interval: (a) $z$-interval for a normal mean, $n = 10$; (b) $t$-interval, $n = 10$; (c) $t$-interval for exponential data, $n = 10$ and $n = 100$; (d) Wald interval for a proportion with $n = 20$, $p = 0.05$; (e) Wilson interval, same setting. Present a table and explain each departure from 95%.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'profile-vs-wald',
              title: 'Profile-likelihood versus Wald intervals near a boundary',
              prompt:
                'Observe $k = 2$ counts from a Poisson with unknown mean $\\lambda$. Compute the Wald interval $\\hat\\lambda \\pm 1.96\\sqrt{\\hat\\lambda}$ (which goes negative) and the profile-likelihood 95% interval from $2[\\ell(\\hat\\lambda) - \\ell(\\lambda)] \\le 3.84$. Then simulate: for $\\lambda_{true} = 2$, what fraction of each interval type covers the truth? Repeat for $k = 0$ and comment on upper limits.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'two-parameter-ellipse',
              title: 'Joint versus marginal intervals',
              prompt:
                'Fit a straight line to 20 noisy points by weighted least squares and compute the covariance matrix of $(a, b)$. Draw the 68% and 95% joint confidence ellipses ($\\Delta\\chi^2 = 2.30, 5.99$) and the 1D marginal intervals ($\\Delta\\chi^2 = 1, 3.84$), and show the marginal interval is the projection of the $\\Delta\\chi^2 = 1$ ellipse, not of the 68% joint ellipse. Verify coverage of both by simulation.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'interpretation-quiz',
              title: 'What a confidence interval does not say',
              prompt:
                'For a reported interval "mass = $125.1 \\pm 0.2$ GeV (95% CL)", write three statements about it that are correct under the frequentist definition and three common statements that are incorrect, explaining each error. Then describe an experiment design (prior and data) under which the Bayesian 95% credible interval would differ substantially from the confidence interval.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State precisely what "95% confidence" means.',
              answerOutline:
                'The procedure produces intervals that contain the true parameter in 95% of repetitions; it is not a probability that this particular interval contains it.',
            },
            {
              question: 'What is a pivotal quantity and why is it useful?',
              answerOutline:
                'A statistic whose distribution does not depend on unknown parameters (e.g. the t statistic); inverting a probability statement about it gives an interval.',
            },
            {
              question: 'When should you distrust a Wald interval and what should you use instead?',
              answerOutline:
                'Small samples, parameters near boundaries, skewed likelihoods; use profile-likelihood intervals ($\\Delta\\chi^2$) or Bayesian credible intervals and check coverage by simulation.',
            },
            {
              question: 'Why is the $\\Delta\\chi^2$ threshold for a joint 68% region of two parameters 2.30 rather than 1?',
              answerOutline:
                'The joint region must cover both parameters simultaneously; the threshold comes from the chi-square distribution with 2 degrees of freedom.',
            },
          ],
        },
        {
          slug: 'bootstrap-resampling',
          title: 'The bootstrap and resampling methods',
          summary:
            'Estimating uncertainty without formulas: the nonparametric and parametric bootstrap, bootstrap confidence intervals, the jackknife, and when resampling fails.',
          estimatedMinutes: 120,
          objectives: [
            'Explain the bootstrap principle (the sample stands in for the population) and implement the nonparametric bootstrap',
            'Compute bootstrap standard errors and percentile confidence intervals for any statistic',
            'Use the parametric bootstrap to validate a fit and propagate uncertainty through a pipeline',
            'Apply the jackknife and compare it with the bootstrap',
            'Recognise situations where the bootstrap fails (extremes, dependence, small samples)',
          ],
          concepts: [
            'Plug-in principle',
            'Nonparametric bootstrap: resample with replacement',
            'Bootstrap standard error and bias estimate',
            'Percentile and basic bootstrap intervals',
            'Parametric bootstrap',
            'Jackknife',
            'Block bootstrap for dependent data',
            'Failure cases: extremes, heavy tails, tiny samples',
          ],
          explanation: `The sampling distribution of a statistic is what you need for its standard error and confidence interval, and for most statistics there is no formula. The **bootstrap** replaces the unknown population by the best estimate you have of it, the sample itself, and simulates. Draw $n$ points from your $n$ data points *with replacement*, compute the statistic, repeat $B \\sim 1000$ times; the spread of the results estimates the standard error, their mean minus the original estimate approximates the bias, and the 2.5th and 97.5th percentiles give the **percentile interval**. This works for medians, correlation coefficients, fitted parameters, ratios, eigenvalues of covariance matrices, anything you can compute, and it is correct to first order whenever the statistic is a smooth function of the empirical distribution.

The **parametric bootstrap** replaces the resampling step with simulation from the fitted model: fit, generate fake datasets from the fit, refit each. It is the standard way to check that a fitting procedure returns honest error bars (compare the spread of refitted parameters with the reported Hessian errors), to propagate uncertainty through a complicated downstream calculation, and to obtain the null distribution of a test statistic. In astronomy and particle physics it is often called "fake data" or "toy Monte Carlo" studies.

The older **jackknife** leaves out one observation at a time: with $\\hat\\theta_{(i)}$ the estimate without point $i$, the variance estimate is $\\frac{n-1}{n}\\sum(\\hat\\theta_{(i)} - \\bar\\theta_{(\\cdot)})^2$. It is deterministic and cheap, works well for smooth statistics, and fails for non-smooth ones like the median; the bootstrap is more general.

The bootstrap is not magic. It fails for **extremes** (the maximum of a sample: resamples never exceed the observed maximum), for heavy-tailed data where the sample is a poor proxy for the population, for **dependent** data unless you resample blocks (the block bootstrap for time series, or whole objects when data are clustered), and for very small samples where the empirical distribution is too coarse. Percentile intervals can also under-cover for skewed statistics; bias-corrected (BCa) intervals or studentised versions help. The rule is the same as always: when in doubt, check coverage with a simulation from a known truth.

Read 18.05 Class 13 (bootstrap), the Think Stats chapters on estimation, and the resampling sections of Hogg, Bovy and Lang. Then implement the bootstrap yourself; it is ten lines, and once written you will use it in every analysis.`,
          resources: [
            {
              title: 'MIT 18.05 — Class 13 reading: Bootstrap confidence intervals',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Think Stats (Downey) — Estimation and resampling',
              url: 'https://allendowney.github.io/ThinkStats/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              note: 'Resampling-based estimation and hypothesis testing in plain Python.',
            },
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy and Lang) — bootstrap and jackknife section',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'SciPy — scipy.stats tutorial (including scipy.stats.bootstrap)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/stats.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Use the library version to check your own implementation, including the BCa method.',
            },
          ],
          exercises: [
            {
              slug: 'bootstrap-from-scratch',
              title: 'Bootstrap from scratch',
              prompt:
                'Implement `bootstrap(data, statistic, B)` returning the bootstrap distribution. Apply it to $n = 30$ log-normal samples for the mean, median, standard deviation and the 90th percentile. For each report the bootstrap SE and the 95% percentile interval, compare the mean\'s SE with $s/\\sqrt n$, and check coverage of each interval by repeating the whole procedure for 500 datasets from the known truth.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'parametric-bootstrap-fit-validation',
              title: 'Validate a fit with the parametric bootstrap',
              prompt:
                'Fit a Gaussian peak plus linear background to a simulated spectrum with Poisson noise using `curve_fit`. Then generate 500 fake spectra from the fitted model, refit each, and compare the spread of the peak position and width with the errors `curve_fit` reports. Identify any bias. Repeat with the peak amplitude reduced until the fit becomes unreliable, and show how the bootstrap reveals it while the Hessian errors do not.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'bootstrap-failure-maximum',
              title: 'Where the bootstrap fails',
              prompt:
                'For $n = 50$ uniform$(0, 1)$ samples, bootstrap the sample maximum and compare the bootstrap distribution with the true sampling distribution (CDF $x^n$). Show the bootstrap puts about 63% of its mass on the observed maximum and badly underestimates the variability. Then bootstrap the mean of an AR(1) series ($\\phi = 0.9$) naively and with blocks of length 20, comparing both to the true standard error from repeated simulation.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'jackknife-correlation',
              title: 'Jackknife versus bootstrap for a correlation coefficient',
              prompt:
                'Generate 40 bivariate normal points with $\\rho = 0.6$. Estimate the standard error of the sample correlation by the jackknife, by the bootstrap, and by the Fisher z-transform formula $1/\\sqrt{n-3}$ (on the transformed scale). Compare all three with the empirical SE over 2000 simulated datasets.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the bootstrap principle in one sentence.',
              answerOutline:
                'Treat the empirical distribution of the sample as the population and simulate the sampling distribution of a statistic by resampling with replacement.',
            },
            {
              question: 'What is the parametric bootstrap used for?',
              answerOutline:
                'Simulating fake datasets from a fitted model to check error bars, bias and the reliability of a fitting pipeline, or to get null distributions.',
            },
            {
              question: 'Give three situations where the naive bootstrap fails.',
              answerOutline:
                'Extreme-value statistics (maximum), dependent data (needs block bootstrap), heavy tails or very small samples where the sample misrepresents the population.',
            },
            {
              question: 'How does the jackknife estimate variance?',
              answerOutline:
                'Leave one point out at a time, recompute, and use $\\frac{n-1}{n}\\sum(\\hat\\theta_{(i)} - \\bar\\theta_{(\\cdot)})^2$; works for smooth statistics only.',
            },
          ],
        },
      ],
      project: {
        slug: 'estimator-validation-pipeline',
        title: 'Module project: an estimator validation pipeline',
        description:
          'Write a reusable module that, given a generative model, a fitting function and true parameters, runs a fake-data study: simulate many datasets, fit each, and report bias, standard error, coverage of Wald, profile and bootstrap intervals, and pull distributions $(\\hat\\theta - \\theta)/\\hat\\sigma$ (which should be $N(0,1)$ if errors are honest). Apply it to three problems: a Gaussian peak on a background with Poisson noise, a power-law fit to binned data, and a straight line with outliers. Document where each interval type fails.',
        deliverables: [
          'Python module with tests and a command-line or notebook interface',
          'Report with pull plots and coverage tables for the three problems and a discussion of failures',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Add a BCa bootstrap interval and compare its coverage with the percentile interval',
          'Add a mixture model with outliers and show the effect on the straight-line fit',
        ],
      },
    },
    {
      slug: 'hypothesis-testing-and-regression',
      title: 'Hypothesis Testing and Regression',
      description:
        'Deciding between hypotheses with controlled error rates: p-values and power, chi-square and goodness-of-fit, linear regression as a statistical model, and the problems of model selection and multiple comparisons.',
      lessons: [
        {
          slug: 'hypothesis-testing-and-p-values',
          title: 'Hypothesis tests, p-values and power',
          summary:
            'The Neyman-Pearson framework: null and alternative hypotheses, test statistics, significance level, p-values, Type I and II errors and power, with the z- and t-tests as the working examples.',
          estimatedMinutes: 150,
          objectives: [
            'Formulate null and alternative hypotheses and choose an appropriate test statistic',
            'Define the p-value correctly and list the common misinterpretations',
            'Perform one- and two-sample z- and t-tests and interpret the results',
            'Compute Type I and Type II error rates and the power of a test, and plan a sample size',
            'Explain the relation between tests and confidence intervals and why statistical significance is not scientific importance',
          ],
          concepts: [
            'Null hypothesis $H_0$ and alternative $H_1$',
            'Test statistic and its null distribution',
            'Significance level $\\alpha$, rejection region',
            'p-value: $P(\\text{data at least this extreme} | H_0)$',
            'Type I error (false positive), Type II error (false negative)',
            'Power $1 - \\beta$ and sample-size planning',
            'One- and two-sample t-tests, paired tests',
            'Significance vs effect size',
          ],
          explanation: `A **hypothesis test** asks whether the data are consistent with a specific claim, the **null hypothesis** $H_0$ (no effect, no difference, the standard model). Choose a **test statistic** $T$ whose distribution under $H_0$ you know, compute it from the data, and reject $H_0$ if $T$ falls in a **rejection region** of probability $\\alpha$ under the null. The **p-value** is the probability, *if $H_0$ were true*, of obtaining a statistic at least as extreme as the one observed. It is a tail probability of the sampling distribution, nothing more. It is not the probability that $H_0$ is true (that is a posterior, needing a prior), not the probability that the result is due to chance, and $1 - p$ is not the probability that the alternative is true. A small p-value means the data would be surprising under $H_0$, which is evidence against it only to the extent that the alternatives make the data less surprising.

For a normal mean, $z = (\\bar x - \\mu_0)/(\\sigma/\\sqrt n)$ with known $\\sigma$, or $t = (\\bar x - \\mu_0)/(s/\\sqrt n)$ compared with the t distribution. Two samples give the two-sample t-test (Welch's version does not assume equal variances and should be the default); paired measurements give a one-sample test on the differences, which is far more powerful when the pairing removes a common source of variance. Rejecting at level $\\alpha$ is equivalent to the $1 - \\alpha$ confidence interval excluding $\\mu_0$, so you can always read a test off an interval, and the interval tells you more.

Two errors are possible. A **Type I** error rejects a true null; its probability is $\\alpha$ by construction. A **Type II** error fails to reject a false null; its probability $\\beta$ depends on the true effect size, the noise and $n$, and $1 - \\beta$ is the **power**. Before an experiment, compute the power for the effect you care about; a test with 20% power that fails to reject has told you almost nothing, and most "null results" in small studies are of this kind. The sample size needed to detect an effect $\\delta$ at power 80% and $\\alpha = 0.05$ is roughly $n \\approx 8\\sigma^2/\\delta^2$ per group.

Significance is a property of the evidence, not of the effect. With enough data any nonzero difference becomes "significant"; with too little, no real effect does. Always report the **effect size** with its confidence interval alongside the p-value, and never dichotomise at 0.05 as if $p = 0.049$ and $p = 0.051$ were different worlds. Particle physics uses $5\\sigma$ ($p \\approx 3\\times10^{-7}$) precisely because of the look-elsewhere effect and the cost of false discoveries; psychology's replication crisis is what happens when $\\alpha = 0.05$ meets flexible analysis.

Read 18.05 Classes 17-19 (NHST readings), the OpenStax chapter 9-10 for drill, and *Statistics Done Wrong* for the failure modes. The power exercise is the one to internalise.`,
          resources: [
            {
              title: 'MIT 18.05 — Classes 17-19 readings: Null hypothesis significance testing (z, t, chi-square tests), p-values and power',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Statistics Done Wrong (Reinhart) — free online book',
              url: 'https://www.statisticsdonewrong.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'Alex Reinhart',
              note: 'Chapters on statistical power, p-values and the base-rate fallacy; short and essential.',
            },
            {
              title: 'OpenStax Introductory Statistics 2e — Chapters 9-10: Hypothesis testing with one and two samples',
              url: 'https://openstax.org/details/books/introductory-statistics-2e',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'SciPy — scipy.stats.ttest_ind documentation',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Note the `equal_var=False` (Welch) option and the `alternative` argument.',
            },
          ],
          exercises: [
            {
              slug: 'p-value-distribution',
              title: 'The distribution of p-values',
              prompt:
                'Simulate $10^4$ two-sample t-tests ($n = 20$ per group) with no true difference and plot the histogram of p-values; show it is uniform and that exactly 5% fall below 0.05. Repeat with a true difference of $0.5\\sigma$ and of $1\\sigma$; the histogram piles up near zero and the fraction below 0.05 is the power. Compare with the analytic power from the noncentral t (or a normal approximation).',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'power-and-sample-size',
              title: 'Power curves and sample-size planning',
              prompt:
                'For a one-sample z-test with $\\sigma = 1$ and $\\alpha = 0.05$ (two-sided), derive the power as a function of the true mean $\\mu$ and $n$: $1 - \\beta = \\Phi(-z_{\\alpha/2} + \\mu\\sqrt n) + \\Phi(-z_{\\alpha/2} - \\mu\\sqrt n)$. Plot power curves for $n = 5, 20, 100$. Find the $n$ needed for 80% and 95% power to detect $\\mu = 0.3$. Verify one point by simulation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'paired-vs-unpaired',
              title: 'Paired versus unpaired tests',
              prompt:
                'Simulate 15 samples measured before and after a treatment, where each sample has a large random baseline (SD 5) and the treatment adds 1 unit with noise SD 1. Run an unpaired Welch t-test and a paired t-test on the same data, many times, and compare their power. Explain in terms of variance which source of noise the pairing removes.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'garden-of-forking-paths',
              title: 'Flexible analysis inflates false positives',
              prompt:
                'Simulate a null dataset with one outcome and three covariates. Implement an "analyst" who tries: the raw test, excluding outliers beyond $2.5\\sigma$, splitting by each covariate\'s median, and log-transforming, reporting the smallest p-value found. Over $10^4$ null datasets, measure the actual false-positive rate at nominal $\\alpha = 0.05$. Then describe two pre-registration or correction strategies and show numerically that one of them restores 5%.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Define the p-value and give two things it is not.',
              answerOutline:
                '$P(\\text{statistic at least as extreme} | H_0)$. It is not $P(H_0|\\text{data})$ and not the probability the result is due to chance; $1-p$ is not the probability of the alternative.',
            },
            {
              question: 'What are Type I and Type II errors and which one does $\\alpha$ control?',
              answerOutline:
                'Type I: rejecting a true null (rate $\\alpha$, controlled). Type II: failing to reject a false null (rate $\\beta$, depends on effect size and $n$); power is $1-\\beta$.',
            },
            {
              question: 'Why is a non-significant result from a low-power study weak evidence for the null?',
              answerOutline:
                'With low power, the test would usually fail to reject even if the effect were real, so failing to reject barely changes the odds; the confidence interval shows what effects remain compatible.',
            },
            {
              question: 'How are a two-sided test at level $\\alpha$ and a $1-\\alpha$ confidence interval related?',
              answerOutline:
                'The test rejects $H_0: \\theta = \\theta_0$ exactly when $\\theta_0$ lies outside the interval; the interval gives the set of non-rejected values.',
            },
          ],
        },
        {
          slug: 'chi-square-and-goodness-of-fit',
          title: 'Chi-square tests and goodness of fit',
          summary:
            'Testing whether a model fits: Pearson\'s chi-square for counts and contingency tables, chi-square per degree of freedom for fitted curves, the likelihood-ratio test, and the Kolmogorov-Smirnov test for distributions.',
          estimatedMinutes: 150,
          objectives: [
            'Perform Pearson\'s chi-square test for categorical counts and for independence in contingency tables',
            'Use $\\chi^2/\\nu$ (reduced chi-square) and the chi-square distribution to judge the goodness of a fitted model and interpret values far from 1',
            'State Wilks\' theorem and use the likelihood-ratio test to compare nested models',
            'Apply the Kolmogorov-Smirnov and Anderson-Darling tests to compare distributions',
            'Recognise when the chi-square approximation fails (low counts) and use exact or simulated null distributions instead',
          ],
          concepts: [
            'Pearson statistic $\\sum(O - E)^2/E$',
            'Degrees of freedom = bins $-$ 1 $-$ fitted parameters',
            'Contingency tables and tests of independence',
            'Reduced chi-square $\\chi^2/\\nu$ and its expected spread $\\sqrt{2/\\nu}$',
            'Likelihood-ratio statistic $-2\\ln\\Lambda$ and Wilks\' theorem',
            'Nested models',
            'Kolmogorov-Smirnov and Anderson-Darling tests',
            'Low-count regime and Monte Carlo p-values',
          ],
          explanation: `The commonest question in experimental science is "does this model fit?" For counts in $k$ categories with expected values $E_i$ under a hypothesis, **Pearson's statistic**

$$\\chi^2 = \\sum_{i=1}^{k}\\frac{(O_i - E_i)^2}{E_i}$$

is approximately chi-square distributed under the null with $\\nu = k - 1 - m$ degrees of freedom, where $m$ parameters were estimated from the data. Each term is a squared standardised deviation (for Poisson counts the variance is $E_i$), which is where the chi-square distribution comes from. The same statistic tests **independence** in a contingency table, with $E_{ij} = (\\text{row total})(\\text{column total})/N$ and $\\nu = (r-1)(c-1)$. The approximation needs expected counts of at least about 5 per cell; below that, use an exact test or simulate the null by Monte Carlo (generate tables or histograms under $H_0$ and compute the statistic many times).

For a curve fitted to data with Gaussian errors $\\sigma_i$, the minimum $\\chi^2 = \\sum(y_i - f_i)^2/\\sigma_i^2$ should be chi-square with $\\nu = N - m$: expected value $\\nu$, standard deviation $\\sqrt{2\\nu}$. The **reduced chi-square** $\\chi^2/\\nu$ should therefore be near 1, with scatter $\\sqrt{2/\\nu}$. A value much greater than 1 means the model is wrong or the errors are underestimated; much less than 1 means the errors are overestimated (or correlated, or the fit has too many parameters). Physicists look at this number first, and so should you, but remember it is only meaningful if the $\\sigma_i$ are honest; many people "fix" a bad fit by inflating the errors, which hides rather than solves the problem.

To compare two **nested** models (the simpler one is a special case of the richer, e.g. line versus parabola, no-signal versus signal), compute the **likelihood ratio** $\\Lambda = L_{\\text{simple}}/L_{\\text{rich}}$. **Wilks' theorem**: under the simpler model, $-2\\ln\\Lambda$ (which equals $\\Delta\\chi^2$ for Gaussian errors) is approximately chi-square with degrees of freedom equal to the number of extra parameters. This is the basis of the "$\\Delta\\chi^2 = 25$ means $5\\sigma$" reasoning in particle searches, with the caveat that Wilks fails when the extra parameter sits on a boundary (a signal strength constrained to be non-negative) or is undefined under the null (the mass of a particle that does not exist), where simulation of the null is again the answer.

For continuous data, binning throws away information; the **Kolmogorov-Smirnov** test uses the maximum distance between empirical and model CDFs (or between two empirical CDFs) and is distribution-free, though insensitive in the tails, where **Anderson-Darling** does better. Both lose validity if the model's parameters were fitted to the same data.

Read 18.05 Class 18-19 (chi-square tests), the NIST handbook sections on goodness of fit, and Hogg, Bovy and Lang on the meaning of $\\chi^2$. The exercises include the low-count failure, which you must see once to believe.`,
          resources: [
            {
              title: 'MIT 18.05 — Chi-square tests for goodness of fit and independence (Class 18-19 readings)',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'NIST/SEMATECH e-Handbook of Statistical Methods — Chapter 1.3.5: Quantitative techniques (chi-square, KS, Anderson-Darling)',
              url: 'https://www.itl.nist.gov/div898/handbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'NIST',
              note: 'Reference definitions and worked examples for every goodness-of-fit test.',
            },
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy and Lang)',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The discussion of what chi-square does and does not tell you about a model.',
            },
            {
              title: 'SciPy — scipy.stats tutorial (chisquare, chi2_contingency, kstest, anderson)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/stats.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
          ],
          exercises: [
            {
              slug: 'pearson-tests',
              title: 'Pearson\'s test: dice and a contingency table',
              prompt:
                'Roll a simulated die 600 times with faces weighted (0.15, 0.15, 0.15, 0.15, 0.15, 0.25) and test for fairness with Pearson\'s chi-square; repeat with 60 rolls and compare power. Then construct a $3\\times3$ contingency table of galaxy morphology versus environment from simulated data with a mild dependence, test independence with `chi2_contingency`, and verify the degrees of freedom by simulating the null distribution of the statistic.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'reduced-chi-square-diagnosis',
              title: 'Diagnosing fits with reduced chi-square',
              prompt:
                'Generate 50 data points from a quadratic with Gaussian noise $\\sigma = 1$. Fit (a) a line, (b) a quadratic, (c) a degree-8 polynomial, each with correct $\\sigma$, and report $\\chi^2/\\nu$ with its expected spread $\\sqrt{2/\\nu}$. Then refit (b) with the errors mis-stated as $\\sigma = 0.5$ and $\\sigma = 2$. Make a table and write a sentence interpreting each case. Finally compute the p-value of each $\\chi^2$ from the chi-square CDF.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'likelihood-ratio-wilks',
              title: 'Likelihood-ratio test and Wilks\' theorem',
              prompt:
                'Simulate a flat background spectrum of 1000 counts in 50 bins with no signal. Fit "background only" and "background + Gaussian peak of fixed width at fixed position" by maximum likelihood and compute $-2\\ln\\Lambda$. Repeat 5000 times and compare the distribution with chi-square(1); it should match. Then let the peak position float freely over the spectrum and show the distribution no longer matches (the look-elsewhere effect) and that the apparent significance is inflated.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'ks-vs-chi2',
              title: 'KS versus binned chi-square for a distribution test',
              prompt:
                'Draw 200 samples from a Student-t with 5 degrees of freedom and test the hypothesis that they are standard normal using (a) a binned chi-square with 10 bins, (b) the KS test, (c) the Anderson-Darling test. Repeat 1000 times and report the power of each at $\\alpha = 0.05$. Explain why (c) is most sensitive to this heavy-tailed alternative.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many degrees of freedom does a chi-square goodness-of-fit test have and why?',
              answerOutline:
                'Bins minus 1 (normalisation constraint) minus the number of parameters fitted to the same data; each constraint removes an independent squared deviation.',
            },
            {
              question: 'Interpret $\\chi^2/\\nu = 3.2$ with $\\nu = 40$ and $\\chi^2/\\nu = 0.3$ with $\\nu = 40$.',
              answerOutline:
                'Expected scatter is $\\sqrt{2/40} \\approx 0.22$; 3.2 means the model is wrong or errors underestimated; 0.3 means errors are overestimated or correlated, or the model is overfitting.',
            },
            {
              question: 'State Wilks\' theorem and one situation where it fails.',
              answerOutline:
                'For nested models under the simpler one, $-2\\ln\\Lambda \\sim \\chi^2_k$ with $k$ extra parameters; fails when a parameter is on a boundary or undefined under the null (look-elsewhere), requiring simulation.',
            },
            {
              question: 'What should you do when expected counts per bin are small?',
              answerOutline:
                'Use the Poisson likelihood directly, merge bins, use an exact test, or obtain the null distribution of the statistic by Monte Carlo rather than trusting the chi-square approximation.',
            },
          ],
        },
        {
          slug: 'linear-regression-and-least-squares',
          title: 'Linear regression and least squares',
          summary:
            'Fitting lines and linear models: the least-squares solution, parameter uncertainties and correlations, residual diagnostics, errors in both variables, and the limits of extrapolation.',
          estimatedMinutes: 180,
          objectives: [
            'Derive the least-squares estimates for a straight line and for a general linear model $\\mathbf{y} = A\\boldsymbol\\beta + \\boldsymbol\\epsilon$',
            'Compute the covariance matrix of the fitted parameters and interpret parameter correlations',
            'Diagnose a fit with residual plots, leverage and influence, and detect heteroscedasticity and nonlinearity',
            'Interpret $R^2$ correctly and explain why it is not a measure of fit quality for physical models',
            'Handle errors in both variables and intrinsic scatter, at least approximately',
          ],
          concepts: [
            'Linear model: linear in parameters, not necessarily in $x$',
            'Design matrix $A$ and normal equations $A^TWA\\boldsymbol\\beta = A^TW\\mathbf{y}$',
            'Parameter covariance $(A^TWA)^{-1}$',
            'Residuals, leverage, influential points',
            'Heteroscedasticity and weighting',
            '$R^2$ and its misuse',
            'Errors in variables and regression dilution',
            'Intrinsic scatter and the inflated-error model',
          ],
          explanation: `**Linear regression** fits a model that is linear in its parameters, $y = \\sum_j\\beta_jg_j(x)$, where the basis functions $g_j$ can be anything: $1, x$ for a line, $1, x, x^2$ for a parabola, $\\sin\\omega t, \\cos\\omega t$ for a fixed-frequency sinusoid. Stack the basis functions evaluated at the data into the **design matrix** $A$ (one row per point, one column per parameter); then $\\mathbf{y} = A\\boldsymbol\\beta + \\boldsymbol\\epsilon$ and, with Gaussian errors of variance $\\sigma_i^2$ in the weight matrix $W = \\operatorname{diag}(1/\\sigma_i^2)$, maximum likelihood gives the **normal equations**

$$\\hat{\\boldsymbol\\beta} = (A^TWA)^{-1}A^TW\\mathbf{y}, \\qquad \\operatorname{Cov}(\\hat{\\boldsymbol\\beta}) = (A^TWA)^{-1} .$$

This is projection onto the column space of $A$ (linear-algebra module), and the covariance matrix is the inverse Fisher information. Solve it with \`numpy.linalg.lstsq\` or a QR decomposition, never by forming the inverse explicitly for large problems. The off-diagonal elements of the covariance are **parameter correlations**: slope and intercept of a line are strongly anticorrelated unless $x$ is centred, which is why you should fit $y = a + b(x - \\bar x)$ and why error ellipses are tilted.

A fit is not finished when the numbers come out. Plot the **residuals** $y_i - \\hat y_i$ against $x$ and against $\\hat y$: structure means the model is wrong, a funnel means **heteroscedastic** errors (then weight properly), and a few points with large **leverage** (extreme $x$) or influence can dominate a fit, which you detect by refitting without them. $R^2$, the fraction of variance explained, measures how much $y$ varies compared with the noise, not whether the model is right: a physically wrong model can have $R^2 = 0.99$ and a correct one $0.3$ if the noise is large. Use $\\chi^2/\\nu$ and residual plots instead.

Ordinary least squares assumes $x$ is known exactly. When $x$ has errors too, the fitted slope is biased toward zero (**regression dilution**), by the factor $\\operatorname{Var}(x_{true})/[\\operatorname{Var}(x_{true}) + \\sigma_x^2]$; correct it, or use an errors-in-variables (orthogonal or likelihood-based) fit. When the data scatter more than their error bars, there is **intrinsic scatter**: add a variance term $s^2$ to each $\\sigma_i^2$ and fit it as a parameter by maximum likelihood (it then appears in the normalisation, not just the exponent). Hogg, Bovy and Lang treat all of this with worked data.

Finally, extrapolation: a linear model is a local description, and its uncertainty grows quadratically outside the data. Compute the prediction interval, not just the parameter errors, before extrapolating. Read 18.05 Class 20 (linear regression), Penn State STAT 501 chapters 1-4 and 11 (diagnostics), and Hogg, Bovy and Lang sections 1-7.`,
          resources: [
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy and Lang)',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections 1-7 with the standard exercise dataset; covers outliers, errors in both variables and intrinsic scatter.',
              primary: true,
            },
            {
              title: 'Penn State STAT 501 — Regression Methods (online notes)',
              url: 'https://online.stat.psu.edu/stat501/',
              type: 'textbook',
              cost: 'free',
              provider: 'Penn State',
              note: 'Lessons 1-4 (simple linear regression, inference) and 9-11 (diagnostics, influential points).',
            },
            {
              title: 'MIT 18.05 — Class 20 reading: Linear regression',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'NumPy — numpy.linalg.lstsq documentation',
              url: 'https://numpy.org/doc/stable/reference/generated/numpy.linalg.lstsq.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
            },
          ],
          exercises: [
            {
              slug: 'design-matrix-fit',
              title: 'General linear fit with a design matrix',
              prompt:
                'Generate 40 points from $y = 2 + 0.5x - 0.1x^2 + 3\\sin x$ with heteroscedastic Gaussian noise. Build the design matrix with columns $1, x, x^2, \\sin x$, solve the weighted normal equations, and compute the parameter covariance. Compare with `numpy.linalg.lstsq` on the whitened problem and with `scipy.optimize.curve_fit`. Plot the correlation matrix of the parameters and explain the strongest correlation.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'residual-diagnostics',
              title: 'Residual diagnostics',
              prompt:
                'Fit a straight line to (a) genuinely linear data, (b) data from $y = e^{x/3}$, (c) linear data with noise proportional to $x$, (d) linear data with one high-leverage outlier. For each, plot residuals against $x$ and a Q-Q plot of residuals, compute $\\chi^2/\\nu$ and $R^2$, and compute the leverage $h_{ii}$ of each point from the hat matrix $A(A^TA)^{-1}A^T$. Write one sentence per case on what the diagnostics reveal that $R^2$ hides.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'regression-dilution',
              title: 'Errors in both variables',
              prompt:
                'Generate $x_{true}$ uniform on [0, 10], $y = 1 + 2x_{true}$ with noise 1, and observed $x = x_{true} + N(0, \\sigma_x^2)$ for $\\sigma_x = 0, 1, 2, 3$. Fit $y$ on $x$ by OLS and plot the slope against $\\sigma_x$; show it follows the dilution factor $\\operatorname{Var}(x_{true})/(\\operatorname{Var}(x_{true}) + \\sigma_x^2)$. Then implement an orthogonal-distance (total least squares) fit via the SVD of the centred data matrix and show it recovers the slope when $\\sigma_x = \\sigma_y$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'intrinsic-scatter-likelihood',
              title: 'Fitting a line with intrinsic scatter',
              prompt:
                'Take the Hogg, Bovy and Lang table of 20 points with $y$ errors. Fit a line by weighted least squares and compute $\\chi^2/\\nu$. Then write the likelihood with an extra intrinsic variance $s^2$ added to each $\\sigma_i^2$ (including the $\\ln(\\sigma_i^2 + s^2)$ normalisation term), maximise over $(a, b, s)$, and compare slopes and errors. Plot the data with both fits and the $\\pm s$ band.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the weighted least-squares solution and its covariance matrix in terms of the design matrix.',
              answerOutline:
                '$\\hat\\beta = (A^TWA)^{-1}A^TW\\mathbf{y}$, $\\operatorname{Cov} = (A^TWA)^{-1}$ with $W = \\operatorname{diag}(1/\\sigma_i^2)$.',
            },
            {
              question: 'Why is $R^2$ a poor measure of whether a physical model is correct?',
              answerOutline:
                'It compares explained to total variance and depends on the spread of $x$ and the noise level; a wrong model can have high $R^2$ and a right one low. Use $\\chi^2/\\nu$ and residual plots.',
            },
            {
              question: 'What is regression dilution and what causes it?',
              answerOutline:
                'Bias of the OLS slope toward zero when $x$ has measurement error; the error in $x$ inflates its apparent variance, reducing the covariance-to-variance ratio.',
            },
            {
              question: 'Why are slope and intercept correlated, and how do you reduce the correlation?',
              answerOutline:
                'Rotating the line about a point far from $x = 0$ changes both; centring $x$ at its mean makes the two parameters nearly independent.',
            },
          ],
        },
        {
          slug: 'model-selection-and-multiple-comparisons',
          title: 'Model selection and multiple comparisons',
          summary:
            'Choosing between models without fooling yourself: overfitting, cross-validation, AIC and BIC, the Bayesian evidence preview, and controlling false discoveries when many tests are run.',
          estimatedMinutes: 150,
          objectives: [
            'Explain overfitting and why training error always decreases with model complexity',
            'Use cross-validation to estimate out-of-sample error and select model complexity',
            'Apply AIC and BIC and explain the penalties they impose',
            'Control the family-wise error rate (Bonferroni) and the false discovery rate (Benjamini-Hochberg) across many tests',
            'Recognise the look-elsewhere effect, p-hacking and publication bias as multiple-comparison problems',
          ],
          concepts: [
            'Overfitting and the bias-variance trade-off in model complexity',
            'Training vs test error',
            'k-fold and leave-one-out cross-validation',
            'AIC $= 2k - 2\\ln L$ and BIC $= k\\ln n - 2\\ln L$',
            'Occam\'s razor and the Bayesian evidence (preview)',
            'Family-wise error rate and Bonferroni correction',
            'False discovery rate and Benjamini-Hochberg',
            'Look-elsewhere effect, p-hacking, publication bias',
          ],
          explanation: `A richer model always fits the data at hand at least as well as a simpler one nested within it, so goodness of fit alone cannot choose between them; a polynomial of degree $n - 1$ passes through every point and predicts nothing. **Overfitting** is fitting the noise. The quantity you want is the error on *new* data, and the most honest estimate of it is **cross-validation**: hold out part of the data, fit on the rest, score the prediction on the held-out part, and rotate ($k$-fold, or leave-one-out). The held-out error first falls with complexity as bias decreases, then rises as variance takes over; choose the minimum, or the simplest model within one standard error of it.

When refitting is expensive or data are few, information criteria approximate the same trade-off from a single fit. **AIC** $= 2k - 2\\ln\\hat L$ estimates out-of-sample predictive loss and penalises each parameter by 2 units of $-2\\ln L$; **BIC** $= k\\ln n - 2\\ln\\hat L$ approximates minus twice the log Bayesian evidence and penalises more harshly for large $n$, favouring the true model if it is in the set. Differences of a few units are meaningful; differences of 10 or more are decisive. Both require the models to be fitted to the same data by maximum likelihood, and both assume the sample is large. The fully Bayesian alternative, the **evidence** $P(D|M) = \\int L(\\theta)\\pi(\\theta)\\,d\\theta$, automatically penalises parameters that the data do not need (Occam's razor) and is treated in module 6.

A second kind of self-deception comes from running many tests. If you test 20 null hypotheses at $\\alpha = 0.05$, you expect one "significant" result by chance, and the probability of at least one is $1 - 0.95^{20} = 64\\%$. **Bonferroni** restores the family-wise error rate by testing each at $\\alpha/m$, which is simple but conservative for large $m$. The **Benjamini-Hochberg** procedure instead controls the **false discovery rate**, the expected fraction of rejections that are false: sort the $m$ p-values, find the largest $k$ with $p_{(k)} \\le k\\alpha/m$, reject the $k$ smallest. It is the standard in genomics and in any survey producing thousands of candidates. The **look-elsewhere effect** in physics (a bump could appear at any mass) is the same problem with a continuum of tests, handled by calibrating the global significance with simulations.

Finally, the invisible comparisons: analysts who try several analyses and report the one that "worked" (p-hacking, the garden of forking paths) and journals that publish only significant results (publication bias) both produce literatures full of false positives. Pre-registration, blind analysis (particle physics opens the signal region last) and reporting everything you tried are the remedies.

Read 18.05 Class 19-20 notes on multiple testing, the Statistics Done Wrong chapters on multiple comparisons and the garden of forking paths, and the Penn State STAT 501 chapter on model selection. The exercises make overfitting and multiplicity quantitative.`,
          resources: [
            {
              title: 'Statistics Done Wrong (Reinhart) — chapters on multiple comparisons, p-hacking and publication bias',
              url: 'https://www.statisticsdonewrong.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'Alex Reinhart',
              primary: true,
            },
            {
              title: 'Penn State STAT 501 — Model building and selection (stepwise, information criteria, cross-validation)',
              url: 'https://online.stat.psu.edu/stat501/',
              type: 'textbook',
              cost: 'free',
              provider: 'Penn State',
            },
            {
              title: 'MIT 18.650 — Lectures on regression and model selection',
              url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'xkcd 882: Significant',
              url: 'https://xkcd.com/882/',
              type: 'article',
              cost: 'free',
              provider: 'xkcd',
              note: 'The green-jelly-bean cartoon; the multiple-comparisons problem in one page.',
            },
          ],
          exercises: [
            {
              slug: 'polynomial-cross-validation',
              title: 'Polynomial degree by cross-validation',
              prompt:
                'Generate 30 points from $y = \\sin(2x)$ on $[0, 3]$ with noise 0.3. Fit polynomials of degree 0..12 and plot training $\\chi^2$, 5-fold cross-validation error, AIC and BIC against degree. Show training error decreases monotonically while the others have a minimum; report which degree each criterion selects. Repeat with 300 points and comment on how the selected degree and the AIC/BIC disagreement change.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'multiple-testing-corrections',
              title: 'Bonferroni versus Benjamini-Hochberg',
              prompt:
                'Simulate 1000 hypotheses of which 100 have a true effect ($1.5\\sigma$ shift, $n = 20$). Compute p-values, then apply no correction, Bonferroni, and Benjamini-Hochberg at $\\alpha = 0.05$. For each, report the number of true and false discoveries, the family-wise error rate and the realised FDR over 200 repetitions. Explain when you would prefer each procedure.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'look-elsewhere-calibration',
              title: 'Calibrating a global significance',
              prompt:
                'In a 100-bin null spectrum, fit a Gaussian bump of fixed width at each bin position and record the maximum local significance $\\sqrt{\\Delta\\chi^2}$. Repeat 2000 times to get the distribution of the maximum. Show that a local $3\\sigma$ corresponds to a global p-value of order 0.1-0.3, and estimate the local significance needed for a global $3\\sigma$. Relate the trials factor to the number of independent bump positions.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'publication-bias-funnel',
              title: 'Publication bias by simulation',
              prompt:
                'Simulate 500 studies of a true effect of 0.1 (in units of $\\sigma$) with sample sizes between 10 and 500, and suppose only studies with $p < 0.05$ are published. Plot the published effect sizes against their standard errors (a funnel plot) and compute the mean published effect; show it is several times the true value and that small studies are most biased. Then compute what a meta-analysis of the published results would conclude.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can training error not be used to choose model complexity?',
              answerOutline:
                'It decreases monotonically with complexity because richer models fit noise; only out-of-sample (held-out or cross-validated) error reveals overfitting.',
            },
            {
              question: 'Compare the penalties in AIC and BIC and what each criterion targets.',
              answerOutline:
                'AIC: $2k$, targets predictive accuracy. BIC: $k\\ln n$, approximates Bayesian evidence and targets the true model; BIC penalises more for $n > 7$.',
            },
            {
              question: 'What is the difference between controlling the family-wise error rate and the false discovery rate?',
              answerOutline:
                'FWER: probability of any false rejection (Bonferroni, conservative). FDR: expected fraction of rejections that are false (Benjamini-Hochberg, more powerful, appropriate for screening).',
            },
            {
              question: 'What is the look-elsewhere effect and how is it handled?',
              answerOutline:
                'Searching over many positions/parameters inflates the chance of a fluctuation; calibrate global significance with simulations of the null or a trials factor.',
            },
          ],
        },
      ],
      project: {
        slug: 'fit-and-test-report',
        title: 'Module project: fit, test and report on a real dataset',
        description:
          'Take a real published dataset (for example the Hogg, Bovy and Lang table, a Cepheid period-luminosity sample, or a pendulum/spring dataset you measure yourself) and produce a complete frequentist analysis: fit competing models by weighted least squares and maximum likelihood, diagnose residuals, test the models with chi-square and likelihood-ratio tests, select between them with cross-validation and information criteria, report parameters with correctly propagated and bootstrap-validated uncertainties, and discuss every multiplicity issue. The deliverable is a short paper-style report with reproducible code.',
        deliverables: [
          'Reproducible notebook or script that regenerates every number and figure from the raw data',
          'A 4-6 page report with methods, results (tables of fits with errors and $\\chi^2/\\nu$), diagnostics and a model-selection discussion',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'bayesian-inference-and-mcmc',
      title: 'Bayesian Inference and MCMC',
      description:
        'Inference as probability over parameters: priors and posteriors, conjugate and numerical updating, Markov chain Monte Carlo sampling with Metropolis-Hastings and modern samplers, convergence diagnostics and Bayesian model comparison.',
      lessons: [
        {
          slug: 'bayesian-updating-and-priors',
          title: 'Bayesian updating, priors and posteriors',
          summary:
            'Bayes\' theorem for continuous parameters: the posterior as prior times likelihood, conjugate updating with the beta-binomial and normal-normal models, the choice and influence of priors, and credible intervals.',
          estimatedMinutes: 150,
          objectives: [
            'Write the posterior for a continuous parameter and compute it on a grid for simple models',
            'Perform conjugate updates: beta-binomial, Gamma-Poisson, normal-normal, and interpret the prior as pseudo-data',
            'Compute posterior means, MAP estimates and credible intervals (equal-tailed and highest density)',
            'Discuss the choice of priors (flat, Jeffreys, weakly informative) and show how prior influence vanishes with data',
            'Contrast credible and confidence intervals and explain when they coincide',
          ],
          concepts: [
            'Posterior $\\propto$ likelihood $\\times$ prior',
            'Grid approximation',
            'Conjugate priors: beta-binomial, Gamma-Poisson, normal-normal',
            'Prior as pseudo-observations',
            'Posterior mean, median, MAP',
            'Credible interval; highest posterior density',
            'Flat, Jeffreys and weakly informative priors',
            'Posterior predictive distribution',
          ],
          explanation: `Bayesian inference treats the unknown parameter $\\theta$ as having a probability distribution that encodes what you know. Before the data you have a **prior** $\\pi(\\theta)$; the data enter through the likelihood; and Bayes' theorem gives the **posterior**

$$p(\\theta|D) = \\frac{L(\\theta)\\,\\pi(\\theta)}{\\int L(\\theta')\\pi(\\theta')\\,d\\theta'} \\propto L(\\theta)\\,\\pi(\\theta) .$$

Everything you might want (a point estimate, an error bar, the probability that $\\theta > 0$) is a summary of this distribution: the posterior mean or median, the **maximum a posteriori** (MAP) value, and a **credible interval** containing 95% of the posterior probability, either equal-tailed or the highest-density region. Unlike a confidence interval, "95% probability that $\\theta$ lies in the interval" is exactly what it means.

For one or two parameters you can compute the posterior on a **grid**: evaluate prior times likelihood at each grid point, normalise. This is how *Think Bayes* does everything, and it is the right first approach because it is transparent. For a few models the algebra closes: a **beta** prior on a probability updated with binomial data stays beta, $\\text{Beta}(a + k, b + n - k)$, so the prior acts like $a + b$ pseudo-observations; a **Gamma** prior on a Poisson rate stays Gamma; a **normal** prior on a normal mean with known variance stays normal, with precisions (inverse variances) adding and the posterior mean a precision-weighted average of prior mean and data mean. These **conjugate** families show in closed form how the data overwhelm the prior: after $n$ observations the prior's weight is $\\sim 1/n$ of the total.

The prior is the controversial ingredient. A **flat** prior seems neutral but is not invariant (flat in $\\sigma$ is not flat in $\\sigma^2$) and can be improper; the **Jeffreys** prior $\\propto\\sqrt{I(\\theta)}$ is reparametrisation-invariant and gives $1/\\sigma$ for a scale. In practice, **weakly informative** priors that exclude absurd values but are broad over the plausible range are the sensible default, and the test of any prior is a **sensitivity analysis**: change it within reason and see whether the conclusions move. With informative data they will not; with weak data the prior matters and you should say so, since the alternative, pretending to have no prior, is not available.

For flat priors and Gaussian likelihoods the posterior is centred on the MLE with the Hessian covariance, so credible and confidence intervals coincide numerically; that is why the two schools agree on most well-measured quantities and disagree on upper limits, boundaries and small samples. Read *Think Bayes* chapters 1-4 and 18.05 Classes 14-15, and watch the first two Statistical Rethinking lectures for the philosophy.`,
          resources: [
            {
              title: 'Think Bayes (Downey) — Chapters 1-4: Bayes\'s theorem, distributions, estimation',
              url: 'https://allendowney.github.io/ThinkBayes2/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              note: 'Grid-based posteriors in Python for every example; do the exercises in the notebooks.',
              primary: true,
            },
            {
              title: 'MIT 18.05 — Classes 14-15 readings: Bayesian updating with continuous priors; conjugate priors',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Statistical Rethinking 2024 (McElreath) — lectures and course materials',
              url: 'https://github.com/rmcelreath/stat_rethinking_2024',
              type: 'lecture',
              cost: 'free',
              provider: 'Richard McElreath',
              note: 'Lectures 1-2 (the Golem of Prague, Bayesian updating with the globe-tossing example). The book is paid; the lectures are free on YouTube and linked from this repo.',
            },
            {
              title: 'Bayesian Data Analysis (Gelman et al.) — free PDF from the authors',
              url: 'http://www.stat.columbia.edu/~gelman/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Columbia University',
              note: 'Chapters 1-2 for single-parameter models and conjugate families; the standard reference.',
            },
          ],
          exercises: [
            {
              slug: 'grid-posterior-coin',
              title: 'Grid posterior for a coin',
              prompt:
                'A coin gives 7 heads in 10 flips. Compute the posterior for $p$ on a grid of 1000 points under (a) a flat prior, (b) Beta(2,2), (c) Beta(50,50). Report the posterior mean, MAP and 95% equal-tailed and HPD intervals for each, and overlay the three posteriors. Repeat for 70 heads in 100 and 700 in 1000 to show the priors converging. Verify (a)-(c) against the closed-form Beta posteriors.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'normal-normal-derivation',
              title: 'Derive the normal-normal update',
              prompt:
                'With prior $\\mu \\sim N(\\mu_0, \\tau^2)$ and $n$ observations $x_i \\sim N(\\mu, \\sigma^2)$ with known $\\sigma$, derive the posterior $N(\\mu_n, \\tau_n^2)$ with $1/\\tau_n^2 = 1/\\tau^2 + n/\\sigma^2$ and $\\mu_n = \\tau_n^2(\\mu_0/\\tau^2 + n\\bar x/\\sigma^2)$ by completing the square. Interpret the prior as $\\sigma^2/\\tau^2$ pseudo-observations. Apply it to combining a previous measurement $10.0 \\pm 0.5$ with a new sample of 5 values with $\\bar x = 11.0$, $\\sigma = 1$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'prior-sensitivity-upper-limit',
              title: 'Prior sensitivity for an upper limit',
              prompt:
                'A counting experiment observes 3 events with an expected background of 2.8; the signal rate $s \\ge 0$ is unknown. Compute the posterior for $s$ under a flat prior on $s$ and under a Jeffreys-like $1/\\sqrt{s + b}$ prior, and report the 95% upper limit in each case. Compare with the frequentist Feldman-Cousins-style upper limit obtained by simulation (find the largest $s$ such that $P(k \\le 3 | s + b) \\ge 0.05$). Discuss why the answers differ and what each one means.',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'posterior-predictive-check',
              title: 'Posterior predictive check',
              prompt:
                'For the coin data above (7 of 10) with a Beta(2,2) prior, compute the posterior predictive distribution of the number of heads in the next 10 flips (the beta-binomial), both analytically and by sampling $p$ from the posterior then flipping. Then do a predictive check: for data that are actually from an overdispersed process (e.g. two different coins mixed), show that the observed variance of counts across repeated batches lies in the tail of the predictive distribution.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write Bayes\' theorem for a continuous parameter and identify the normalising constant.',
              answerOutline:
                '$p(\\theta|D) = L(\\theta)\\pi(\\theta)/\\int L\\pi\\,d\\theta$; the denominator is the evidence (marginal likelihood) and is independent of $\\theta$.',
            },
            {
              question: 'In the beta-binomial model, what do the prior parameters $a, b$ represent?',
              answerOutline:
                'Pseudo-counts of successes and failures: the posterior after $k$ successes in $n$ trials is Beta($a + k$, $b + n - k$).',
            },
            {
              question: 'Why is a flat prior not "no prior"?',
              answerOutline:
                'Flatness depends on the parametrisation (flat in $\\sigma$ is not flat in $\\ln\\sigma$); the Jeffreys prior is the invariant choice, and any prior should be tested by sensitivity analysis.',
            },
            {
              question: 'When do credible and confidence intervals coincide, and when do they differ?',
              answerOutline:
                'Coincide for flat priors with Gaussian likelihoods (large samples, interior parameters); differ near boundaries, for small samples, for upper limits, and with informative priors.',
            },
          ],
        },
        {
          slug: 'bayesian-parameter-estimation',
          title: 'Bayesian parameter estimation for physical models',
          summary:
            'Multi-parameter posteriors: writing likelihoods for real measurement models, marginalising nuisance parameters, hierarchical models, and the Laplace approximation as the bridge to MCMC.',
          estimatedMinutes: 150,
          objectives: [
            'Write the log-posterior for a multi-parameter physical model with Gaussian, Poisson or mixture likelihoods',
            'Marginalise over nuisance parameters and explain why marginalisation differs from profiling',
            'Compute and interpret a 2D posterior with its marginals and correlation',
            'Apply the Laplace (Gaussian) approximation to a posterior and know when it fails',
            'Set up a simple hierarchical model and explain partial pooling',
          ],
          concepts: [
            'Log-posterior $\\ln p = \\ln L + \\ln\\pi + $ const',
            'Nuisance parameters and marginalisation',
            'Marginal vs profile likelihood',
            'Corner plots: 1D and 2D marginals',
            'Laplace approximation',
            'Mixture likelihoods for outliers',
            'Hierarchical (multilevel) models and partial pooling',
            'Posterior predictive checks',
          ],
          explanation: `Real inference problems have several parameters, most of which you do not care about. A spectral line has an amplitude, centre and width you want, plus a background level and slope you must fit but will never report. These **nuisance parameters** are handled in the Bayesian framework by **marginalisation**: integrate the posterior over them,

$$p(\\theta_{\\text{interest}}|D) = \\int p(\\theta_{\\text{interest}}, \\theta_{\\text{nuisance}}|D)\\,d\\theta_{\\text{nuisance}},$$

which propagates their uncertainty into the parameters you report. Frequentists instead *profile* (maximise over nuisance parameters at each value of the parameter of interest). The two agree for Gaussian posteriors and differ when the nuisance parameter is poorly constrained or correlated; marginalisation is the probabilistically correct operation and is what MCMC gives you for free.

Build the model by writing the **log-posterior** as a function: $\\ln p(\\theta|D) = \\ln L(\\theta) + \\ln\\pi(\\theta) + \\text{const}$, with $\\ln L$ the Gaussian sum $-\\tfrac12\\chi^2 - \\sum\\ln\\sigma_i$ (the second term matters if $\\sigma$ is a parameter), the Poisson sum $\\sum(k_i\\ln\\mu_i - \\mu_i)$, or whatever the measurement process dictates. Outliers are handled by a **mixture likelihood**: each point is "good" with probability $1 - f$ and drawn from a broad "bad" distribution with probability $f$, and $f$ is marginalised. This is more honest than sigma-clipping and is treated in detail in Hogg, Bovy and Lang.

With two or three parameters, evaluate the log-posterior on a grid and plot the **corner plot**: 2D contours for each pair and 1D marginals on the diagonal. The 2D contours show correlations and non-Gaussian shapes (bananas, multimodality) that a covariance matrix cannot. Beyond three or four parameters grids become impossible ($100^6$ evaluations), which is the reason for the next lesson.

The **Laplace approximation** fits a Gaussian at the MAP with covariance from the inverse Hessian of the negative log-posterior, exactly as for the MLE; it is cheap, often adequate, and the standard check on whether MCMC was necessary. It fails for skewed, bounded or multimodal posteriors.

**Hierarchical models** go one level up: when many objects (stars, patients, detectors) each have a parameter drawn from a population distribution with its own hyperparameters, fit everything jointly. Each object's estimate is then pulled toward the population mean by an amount depending on its individual uncertainty (**partial pooling**), which reduces noise for poorly measured objects and estimates the population scatter properly. This is the structure of most modern astronomical population studies.

Read *Think Bayes* chapters 5-9 and the Statistical Rethinking lectures 3-4 and 12-13 (multilevel models), with Hogg, Bovy and Lang for the mixture model. Then do the 2D-posterior exercise with a grid before touching a sampler.`,
          resources: [
            {
              title: 'Think Bayes (Downey) — Chapters 5-9: Estimation with several parameters',
              url: 'https://allendowney.github.io/ThinkBayes2/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              primary: true,
            },
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy and Lang) — mixture model for outliers and marginalisation',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Statistical Rethinking 2024 (McElreath) — lectures on multivariate and multilevel models',
              url: 'https://github.com/rmcelreath/stat_rethinking_2024',
              type: 'lecture',
              cost: 'free',
              provider: 'Richard McElreath',
            },
            {
              title: 'corner.py documentation',
              url: 'https://corner.readthedocs.io/en/latest/',
              type: 'tool',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
              note: 'The standard library for corner plots; use it with grid samples now and MCMC chains later.',
            },
          ],
          exercises: [
            {
              slug: 'two-parameter-grid-posterior',
              title: 'A 2D posterior on a grid',
              prompt:
                'Fit a line $y = a + bx$ to 15 points with Gaussian errors by evaluating the log-posterior on a $300\\times300$ grid in $(a, b)$ with flat priors. Plot the 68% and 95% contours (sort probabilities, accumulate) and the two marginals. Compare the marginal standard deviations and the correlation with the least-squares covariance matrix. Then add a third parameter, a constant unknown error scale $\\sigma$, with a $1/\\sigma$ prior, marginalise it over a grid and show how the marginals of $(a,b)$ widen.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'marginal-vs-profile',
              title: 'Marginalising versus profiling',
              prompt:
                'Construct a two-parameter posterior that is a banana: $\\ln p = -\\tfrac12[(x - y^2)^2/0.1 + y^2]$. Compute the marginal posterior of $y$ by integrating over $x$ and the profile by maximising over $x$ at each $y$; plot both normalised. Explain the difference in terms of the volume of the posterior at each $y$, and why MCMC produces the marginal automatically.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'outlier-mixture-model',
              title: 'Outliers with a mixture likelihood',
              prompt:
                'Generate 30 linear data points and replace 5 with outliers. Fit a line by (a) ordinary least squares, (b) sigma-clipping at $3\\sigma$ iterated, (c) the mixture model with outlier fraction $f$ and outlier variance $V_b$ as nuisance parameters, maximising then marginalising on a grid. Compare the slopes and their uncertainties with the truth, and plot the posterior probability of each point being an outlier.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'laplace-approximation-check',
              title: 'When the Laplace approximation fails',
              prompt:
                'For the Poisson rate posterior with $k = 2$ counts and a flat prior (a Gamma(3,1) posterior), compute the Laplace approximation at the MAP and compare its 95% interval with the exact credible interval. Repeat for $k = 20$ and $k = 200$. Then try it on the banana posterior above and explain the failure.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a nuisance parameter and how does Bayesian inference handle it?',
              answerOutline:
                'A parameter needed by the model but not of interest; marginalise (integrate) the posterior over it, propagating its uncertainty into the parameters reported.',
            },
            {
              question: 'When do marginal and profile likelihoods differ?',
              answerOutline:
                'When the posterior is non-Gaussian in the nuisance direction, so that volume (not just height) varies with the parameter of interest; they agree for Gaussian posteriors.',
            },
            {
              question: 'Describe the Laplace approximation and two cases where it fails.',
              answerOutline:
                'Gaussian centred at the MAP with inverse-Hessian covariance; fails for skewed/bounded posteriors (small counts, rates near zero) and for multimodal or banana-shaped ones.',
            },
            {
              question: 'What is partial pooling in a hierarchical model?',
              answerOutline:
                'Individual estimates are shrunk toward the population mean by an amount set by their uncertainty relative to the population scatter, which is itself estimated from the data.',
            },
          ],
        },
        {
          slug: 'mcmc-sampling',
          title: 'Markov chain Monte Carlo: the Metropolis-Hastings algorithm',
          summary:
            'Sampling a posterior you cannot integrate: Markov chains and detailed balance, the Metropolis-Hastings algorithm implemented from scratch, Gibbs sampling, and the affine-invariant ensemble sampler (emcee).',
          estimatedMinutes: 180,
          objectives: [
            'Explain why sampling replaces integration in high dimensions and what properties a Markov chain needs to work',
            'Derive detailed balance and show the Metropolis-Hastings acceptance rule satisfies it',
            'Implement Metropolis-Hastings from scratch for a multi-parameter posterior and tune the proposal',
            'Explain Gibbs sampling and ensemble (affine-invariant) samplers and when each is appropriate',
            'Use emcee to sample a physical model\'s posterior and summarise the chain with a corner plot',
          ],
          concepts: [
            'Monte Carlo integration with posterior samples',
            'Markov chain, stationary distribution, ergodicity',
            'Detailed balance',
            'Metropolis-Hastings acceptance ratio',
            'Proposal distribution, step size, acceptance rate',
            'Random walk behaviour and the curse of dimensionality',
            'Gibbs sampling',
            'Affine-invariant ensemble sampler (emcee)',
          ],
          explanation: `Every Bayesian quantity is an integral over the posterior, and for more than a few parameters no grid can compute it. But if you had samples $\\theta^{(1)}, \\dots, \\theta^{(N)}$ drawn from the posterior, every integral would become an average: the posterior mean is the sample mean, a credible interval comes from sample percentiles, and marginalising a nuisance parameter is simply *ignoring its column*. **Markov chain Monte Carlo** produces such samples from any posterior you can evaluate up to a constant, which is exactly what $L(\\theta)\\pi(\\theta)$ is.

A **Markov chain** moves from state to state with transition probabilities depending only on the current state. If the chain is ergodic and has the posterior as its **stationary distribution**, then after an initial transient the visited states are (correlated) samples from the posterior. The cleanest sufficient condition for stationarity is **detailed balance**: $p(\\theta)T(\\theta \\to \\theta') = p(\\theta')T(\\theta' \\to \\theta)$, flow between any pair of states is equal in both directions.

**Metropolis-Hastings** builds such a chain. From the current $\\theta$, propose $\\theta'$ from a proposal density $q(\\theta'|\\theta)$ and accept it with probability

$$\\alpha = \\min\\left(1, \\frac{p(\\theta')\\,q(\\theta|\\theta')}{p(\\theta)\\,q(\\theta'|\\theta)}\\right),$$

otherwise stay at $\\theta$ (and record it again). For a symmetric proposal (a Gaussian step) the $q$'s cancel and the rule is: always accept moves uphill, accept downhill moves with probability $p(\\theta')/p(\\theta)$. Checking detailed balance takes three lines and is an exercise below. The normalising constant cancels in the ratio, which is why MCMC never needs the evidence. Work in log space to avoid underflow.

The algorithm always works eventually; the art is making it work *quickly*. Too small a step and the chain creeps, highly correlated; too large and almost everything is rejected. An acceptance rate around 25-50% is the usual target, with the proposal covariance matched to the posterior's (use a pilot run or the Laplace approximation). In many dimensions a random walk explores slowly, and strongly correlated parameters make an isotropic proposal hopeless. **Gibbs sampling** updates one parameter at a time from its exact conditional distribution when those conditionals are available (conjugate hierarchical models). The **affine-invariant ensemble sampler** of Goodman and Weare, implemented in \`emcee\`, runs many "walkers" that propose moves along lines through each other, which automatically adapts to linear correlations and scales; it is the workhorse of astrophysics and needs essentially no tuning for posteriors of a few dozen parameters. Hamiltonian Monte Carlo (Stan, PyMC) uses gradients to make long informed moves and is the state of the art for hundreds of parameters; the next lesson introduces it.

Read Hogg and Foreman-Mackey's "Using MCMC" (the practical companion to the fitting paper), the emcee documentation and its line-fitting tutorial, and watch the Statistical Rethinking MCMC lecture. Write Metropolis yourself first; the ten lines will teach you more than any library.`,
          resources: [
            {
              title: 'Data analysis recipes: Using Markov Chain Monte Carlo (Hogg and Foreman-Mackey)',
              url: 'https://arxiv.org/abs/1710.06068',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The practical guide: when to use MCMC, Metropolis-Hastings, tuning, convergence and reporting results.',
              primary: true,
            },
            {
              title: 'emcee: The MCMC Hammer — documentation and tutorials',
              url: 'https://emcee.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
              note: 'Start with the "Fitting a model to data" tutorial; the affine-invariant algorithm is explained in the paper linked from the docs.',
            },
            {
              title: 'emcee tutorial: Fitting a model to data',
              url: 'https://emcee.readthedocs.io/en/stable/tutorials/line/',
              type: 'interactive',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
            },
            {
              title: 'The Markov-chain Monte Carlo Interactive Gallery',
              url: 'https://chi-feng.github.io/mcmc-demo/',
              type: 'interactive',
              cost: 'free',
              provider: 'Chi Feng',
              note: 'Watch random-walk Metropolis, Gibbs, HMC and others explore bananas and multimodal targets in the browser.',
            },
          ],
          exercises: [
            {
              slug: 'metropolis-from-scratch',
              title: 'Metropolis-Hastings from scratch',
              prompt:
                'Implement random-walk Metropolis for an arbitrary log-posterior function. Test it on a 2D correlated Gaussian ($\\rho = 0.9$): run $10^5$ steps with step sizes 0.05, 0.5, 2.0 and 10, record acceptance rates, plot the first 1000 steps of each chain and the autocorrelation of one parameter. Verify the sample mean and covariance against the truth for the best step size. Then prove on paper that the Metropolis rule satisfies detailed balance.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'line-fit-with-emcee',
              title: 'Fit a line with outliers and intrinsic scatter using emcee',
              prompt:
                'Using the Hogg, Bovy and Lang dataset, sample the posterior of the mixture model (line parameters, intrinsic scatter, outlier fraction, outlier mean and variance: 6 parameters) with emcee using 32 walkers. Produce a corner plot, report the median and 16th-84th percentiles of the slope, and plot 100 posterior lines over the data. Compare the slope with the grid-based result from the previous lesson for the 3-parameter version.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'gibbs-normal-model',
              title: 'Gibbs sampling for a normal model',
              prompt:
                'For data $x_i \\sim N(\\mu, \\sigma^2)$ with prior $\\mu \\sim N(0, 100)$ and $\\sigma^2 \\sim$ Inverse-Gamma(1, 1), derive the two conditional posteriors $p(\\mu|\\sigma^2, x)$ (normal) and $p(\\sigma^2|\\mu, x)$ (inverse-Gamma). Implement the Gibbs sampler, run it on 50 simulated points, and compare the marginal posteriors with those from your Metropolis sampler on the same model. Note which is faster to decorrelate.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'multimodal-trap',
              title: 'A multimodal posterior',
              prompt:
                'Sample the bimodal density $p(x) \\propto e^{-(x-3)^2/2} + e^{-(x+3)^2/2}$ with Metropolis using step sizes 0.5 and 5, and with emcee. Show that the small-step chain gets stuck in one mode for long stretches, that the estimated mode weights are wrong unless the chain is very long, and that running several chains from dispersed starting points reveals the problem. Describe one strategy (tempering or a mixture proposal) for multimodal targets.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does MCMC not need the normalising constant of the posterior?',
              answerOutline:
                'The acceptance ratio involves only ratios $p(\\theta\')/p(\\theta)$, in which the evidence cancels.',
            },
            {
              question: 'State the Metropolis acceptance rule for a symmetric proposal and the condition it ensures.',
              answerOutline:
                'Accept with probability $\\min(1, p(\\theta\')/p(\\theta))$; this satisfies detailed balance, so the posterior is the stationary distribution.',
            },
            {
              question: 'What goes wrong with step sizes that are too small or too large?',
              answerOutline:
                'Too small: high acceptance but tiny moves, strongly autocorrelated chain. Too large: most proposals rejected, chain stuck. Aim for roughly 25-50% acceptance with a proposal shaped like the posterior.',
            },
            {
              question: 'What advantage does the affine-invariant ensemble sampler have over random-walk Metropolis?',
              answerOutline:
                'Walkers propose along directions defined by other walkers, so the sampler adapts to the posterior\'s linear correlations and scales without hand-tuning the proposal covariance.',
            },
          ],
        },
        {
          slug: 'mcmc-diagnostics-and-model-comparison',
          title: 'MCMC diagnostics, Hamiltonian Monte Carlo and Bayesian model comparison',
          summary:
            'Knowing when a chain can be trusted: burn-in, autocorrelation time and effective sample size, Gelman-Rubin $\\hat R$, trace plots; a first look at Hamiltonian Monte Carlo; and comparing models with the Bayesian evidence and Bayes factors.',
          estimatedMinutes: 150,
          objectives: [
            'Diagnose convergence with trace plots, burn-in removal, autocorrelation time, effective sample size and $\\hat R$ across chains',
            'Quote posterior summaries with Monte Carlo error and decide how long to run a chain',
            'Explain how Hamiltonian Monte Carlo uses gradients and why it scales to many parameters',
            'Define the Bayesian evidence and Bayes factor, interpret them, and explain the Occam penalty',
            'Estimate evidence or use approximations (BIC, nested sampling, WAIC) appropriately',
          ],
          concepts: [
            'Burn-in / warm-up',
            'Trace plots and mixing',
            'Autocorrelation time $\\tau$ and effective sample size $N/\\tau$',
            'Gelman-Rubin $\\hat R$',
            'Monte Carlo standard error',
            'Hamiltonian Monte Carlo and NUTS',
            'Evidence $Z = \\int L\\pi\\,d\\theta$ and Bayes factor',
            'Occam penalty; nested sampling; WAIC/LOO',
          ],
          explanation: `A chain that has not converged produces confident, wrong answers, so diagnostics are not optional. Start by discarding the **burn-in**, the initial steps during which the chain moves from its starting point into the typical set; a trace plot (parameter value versus step) shows when it has settled. Then quantify the correlation between successive samples with the **autocorrelation time** $\\tau$, the number of steps over which the autocorrelation function decays; the chain of length $N$ contains only about $N/\\tau$ **effective samples**, and the Monte Carlo error on a posterior mean is $\\sigma_{\\text{post}}/\\sqrt{N/\\tau}$. emcee estimates $\\tau$ and recommends running at least $50\\tau$ steps; a chain shorter than that cannot even estimate its own $\\tau$ reliably. Finally, run several chains from dispersed starting points and compute the **Gelman-Rubin** statistic $\\hat R$, the ratio of between-chain to within-chain variance; values above about 1.01 mean the chains disagree and have not converged, which is also the only practical way to detect multimodality. Report posterior summaries (median, 16th and 84th percentiles) together with the effective sample size, and never report more digits than the Monte Carlo error justifies.

Random-walk samplers struggle beyond a few dozen parameters because the step size must shrink with dimension. **Hamiltonian Monte Carlo** treats $-\\ln p$ as a potential energy, gives the parameters a momentum, and integrates Hamilton's equations (with a leapfrog integrator, the same one used in molecular dynamics) to propose distant points that are accepted with high probability because energy is nearly conserved. It needs gradients of the log-posterior, which automatic differentiation provides in Stan and PyMC, and the **NUTS** variant tunes the trajectory length automatically. For hierarchical models with hundreds of parameters it is the only practical choice.

Comparing models is where Bayesian inference is most distinctive. The **evidence** $Z = P(D|M) = \\int L(\\theta)\\pi(\\theta)\\,d\\theta$ is the average likelihood over the prior, and the **Bayes factor** $Z_1/Z_2$ updates the prior odds of two models. A model with an extra parameter spreads its prior over a larger volume; unless the data genuinely need that parameter, the average likelihood falls: this is the automatic **Occam penalty**, with the prior width acting as the number of "wasted" parameter values. Bayes factors are therefore sensitive to prior widths in a way parameter estimates are not, and must be reported with the priors used. Computing $Z$ is hard; MCMC does not provide it. Options are the Laplace approximation (which gives BIC in the large-$n$ limit), **nested sampling** (designed for evidence; \`dynesty\`, \`UltraNest\`), or for predictive comparison **WAIC** and leave-one-out cross-validation computed from posterior samples (\`arviz\`), which McElreath recommends over Bayes factors for most applied work.

Read Hogg and Foreman-Mackey sections on convergence and reporting, the emcee autocorrelation tutorial, and Betancourt's "Conceptual Introduction to HMC" (first half). Then do the exercises; the $\\hat R$ and autocorrelation exercise should become part of every MCMC analysis you ever run.`,
          resources: [
            {
              title: 'emcee tutorial: Autocorrelation analysis and convergence',
              url: 'https://emcee.readthedocs.io/en/stable/tutorials/autocorr/',
              type: 'interactive',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
              note: 'How to estimate the autocorrelation time and why chains must be much longer than it.',
              primary: true,
            },
            {
              title: 'A Conceptual Introduction to Hamiltonian Monte Carlo (Betancourt)',
              url: 'https://arxiv.org/abs/1701.02434',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections 1-4 for the typical set, why random walks fail in high dimensions and how HMC works.',
            },
            {
              title: 'Data analysis recipes: Using Markov Chain Monte Carlo (Hogg and Foreman-Mackey)',
              url: 'https://arxiv.org/abs/1710.06068',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections on convergence diagnostics, reporting posteriors and when MCMC is the wrong tool.',
            },
            {
              title: 'ArviZ documentation — diagnostics (r_hat, ess, trace plots) and model comparison (WAIC, LOO)',
              url: 'https://arviz-devs.github.io/arviz/',
              type: 'documentation',
              cost: 'free',
              provider: 'ArviZ',
            },
          ],
          exercises: [
            {
              slug: 'convergence-diagnostics',
              title: 'Full diagnostics on a chain',
              prompt:
                'Run your Metropolis sampler and emcee on the 6-parameter mixture model from the previous lesson. For each: plot traces, estimate the autocorrelation time for every parameter (via the integrated autocorrelation function), compute effective sample sizes, run 4 chains from dispersed starts and compute $\\hat R$. Determine how many steps are needed for 1000 effective samples, and report the slope with its Monte Carlo error. Compare the two samplers\' efficiency per log-posterior evaluation.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hmc-from-scratch',
              title: 'A minimal Hamiltonian Monte Carlo',
              prompt:
                'Implement HMC for a 50-dimensional Gaussian with variances spread from 0.01 to 100 (analytic gradient), using a leapfrog integrator with $L = 20$ steps. Compare its autocorrelation time with random-walk Metropolis on the same target. Show the acceptance depends on the step size through energy conservation and plot the Hamiltonian error along a trajectory. Explain why the leapfrog integrator (not Euler) is required.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'evidence-and-occam',
              title: 'Evidence by direct integration and the Occam penalty',
              prompt:
                'For 20 data points generated from a constant, compute the evidence for (a) a constant model and (b) a line, with flat priors on the slope of width $w = 0.1, 1, 10, 100$, by direct numerical integration on a grid. Show the Bayes factor in favour of the constant grows with $w$, and that for a dataset with a true slope of 0.3 the line wins only for moderate $w$. Compare with BIC and with the likelihood-ratio test.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'waic-model-comparison',
              title: 'Predictive model comparison with WAIC/LOO',
              prompt:
                'Fit polynomials of degree 1-5 to 30 noisy points with emcee (flat priors), and compute WAIC and PSIS-LOO from the posterior samples using ArviZ (or implement WAIC from the pointwise log-likelihoods). Compare the ranking with 5-fold cross-validation and with BIC from the MAP fits. Write a paragraph on when you would trust Bayes factors versus predictive criteria.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the autocorrelation time and how does it determine the Monte Carlo error?',
              answerOutline:
                'The number of steps over which samples decorrelate; effective samples $\\approx N/\\tau$, and the error on a posterior mean is $\\sigma/\\sqrt{N/\\tau}$.',
            },
            {
              question: 'What does $\\hat R$ measure and what value indicates convergence?',
              answerOutline:
                'The ratio of between-chain to within-chain variance across chains from dispersed starts; values close to 1 (below about 1.01) indicate agreement; larger values indicate non-convergence or multimodality.',
            },
            {
              question: 'Why does Hamiltonian Monte Carlo scale better than random-walk Metropolis?',
              answerOutline:
                'It uses gradients to follow energy-conserving trajectories to distant proposals that are accepted with high probability, avoiding the diffusive random walk whose step size must shrink with dimension.',
            },
            {
              question: 'What is the Bayesian evidence and why does it penalise complexity?',
              answerOutline:
                '$Z = \\int L\\pi\\,d\\theta$, the likelihood averaged over the prior; extra parameters spread prior mass over regions of low likelihood, lowering the average unless the data require them.',
            },
          ],
        },
      ],
      project: {
        slug: 'bayesian-analysis-of-a-physical-dataset',
        title: 'Module project: a full Bayesian analysis with MCMC',
        description:
          'Choose a physical dataset with a nontrivial model (an exoplanet radial-velocity curve, a radioactive decay chain, a damped-oscillator ringdown, a spectral line on a background) and carry out a complete Bayesian analysis: write the likelihood from the measurement process, choose and justify priors, obtain the posterior with emcee, run full convergence diagnostics, produce a corner plot and posterior predictive checks, and compare at least two competing models with both the evidence (or BIC) and a predictive criterion. Report results with a prior sensitivity analysis.',
        deliverables: [
          'Reproducible notebook with model, sampler configuration, diagnostics and all figures',
          'Written report (4-6 pages) stating priors, posterior summaries with Monte Carlo errors, convergence evidence, model comparison and sensitivity analysis',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Repeat the analysis with a Hamiltonian Monte Carlo sampler (PyMC or Stan) and compare efficiency',
          'Extend to a hierarchical model over several objects and demonstrate partial pooling',
        ],
      },
    },
    {
      slug: 'statistics-in-practice',
      title: 'Statistics in Practice',
      description:
        'The craft of real data analysis: loading and cleaning data, exploratory visualisation, propagating uncertainties through calculations, handling systematic errors, and reporting reproducible results honestly.',
      lessons: [
        {
          slug: 'data-cleaning-and-exploration',
          title: 'Data cleaning and exploratory data analysis',
          summary:
            'Getting from raw files to a trustworthy table: loading with pandas, missing values, units, outliers and selection effects, and the exploratory plots that should precede every fit.',
          estimatedMinutes: 150,
          objectives: [
            'Load tabular scientific data with pandas, inspect types and units, and document every transformation',
            'Handle missing values, sentinel values, duplicates and unit inconsistencies explicitly',
            'Produce exploratory plots (histograms, scatter matrices, ECDFs, box plots) and read them critically',
            'Identify outliers and decide on principled grounds whether to keep, model or remove them',
            'Recognise selection effects and survivorship bias (e.g. Malmquist bias) in observational samples',
          ],
          concepts: [
            'Tidy data: one observation per row, one variable per column',
            'pandas DataFrame, dtypes, groupby',
            'Missing data and sentinel values (-99, NaN)',
            'Empirical CDF and histogram binning choices',
            'Scatter-matrix and log-scaled plots',
            'Robust summaries: median, MAD, IQR',
            'Outliers: errors versus real tails',
            'Selection effects and Malmquist bias',
          ],
          explanation: `Most of the time in a real analysis is spent before any statistics happen. Data arrive in inconsistent formats with missing values coded as $-99$ or 9999, columns in mixed units, duplicated rows, and undocumented cuts. The first rule is to treat cleaning as part of the analysis: do it in code (never by hand in a spreadsheet), keep the raw file untouched, and make every step reproducible and commented. **Tidy data** (one observation per row, one variable per column) makes everything downstream easy; pandas is the standard tool, and \`df.info()\`, \`df.describe()\` and \`df.isna().sum()\` should be the first three things you run.

**Exploratory data analysis** comes next, and its purpose is to find out what the data are actually like before you assume a model. Plot histograms of every variable (try several bin widths; or use the **empirical CDF**, which needs no binning), scatter plots of every pair, and log axes for anything spanning orders of magnitude. Look for impossible values, unexpected clusters, discreteness (rounded measurements), and relations you did not expect. Summarise with **robust statistics** when tails are heavy: the median and the median absolute deviation (MAD, scaled by 1.4826 to estimate $\\sigma$ for Gaussian data) are barely affected by a few wild values, whereas the mean and standard deviation can be dominated by them.

**Outliers** demand a decision, and the decision must be principled. A value can be wrong (a typo, a saturated detector, a cosmic ray) or a real member of a heavy tail. Removing points because they disagree with your model is how false results are made; removing them because an independent criterion flags them (a quality flag, a physical impossibility) is legitimate, and modelling them with a mixture likelihood (module 6) is usually best. Always report how many points were removed and why.

The subtlest problem is **selection**: the sample is not a random draw from the population you care about. A flux-limited survey sees only the brightest distant objects, so distant objects appear more luminous on average (**Malmquist bias**); only surviving companies, published studies or detected planets appear in the data (survivorship bias). No amount of statistics on the observed sample fixes this; you must model the selection function or restrict to a complete subsample.

Work through the pandas getting-started tutorials, the Python Data Science Handbook chapters on pandas and visualisation, and *Think Stats* on exploratory analysis. Then do the exercises on a real public dataset of your choice.`,
          resources: [
            {
              title: 'Python Data Science Handbook (VanderPlas) — Chapters 3-4: pandas and Matplotlib',
              url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jake VanderPlas',
              note: 'Free online; missing data, groupby, pivoting and visualisation.',
              primary: true,
            },
            {
              title: 'pandas documentation',
              url: 'https://pandas.pydata.org/docs/',
              type: 'documentation',
              cost: 'free',
              provider: 'pandas',
              note: 'The "Getting started" tutorials and the user guide on missing data.',
            },
            {
              title: 'Think Stats (Downey) — Exploratory data analysis chapters',
              url: 'https://allendowney.github.io/ThinkStats/',
              type: 'textbook',
              cost: 'free',
              provider: 'Green Tea Press',
              note: 'Uses a real survey dataset from cleaning to analysis.',
            },
            {
              title: 'NIST/SEMATECH e-Handbook — Chapter 1: Exploratory Data Analysis',
              url: 'https://www.itl.nist.gov/div898/handbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'NIST',
            },
          ],
          exercises: [
            {
              slug: 'clean-a-real-dataset',
              title: 'Clean a real dataset',
              prompt:
                'Download a public scientific table (e.g. the NASA Exoplanet Archive planetary systems table as CSV, or a NOAA weather-station record). Write a script that loads it, documents dtypes and units, converts sentinel values to NaN, removes exact duplicates, converts all quantities to SI or a single consistent unit system, and writes a cleaned file. Produce a log listing every row-count change and its reason.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'eda-report',
              title: 'An exploratory report',
              prompt:
                'For the cleaned dataset, produce histograms and ECDFs of five key variables (linear and log axes as appropriate), a scatter matrix, and robust summaries (median, MAD, IQR) alongside mean and SD. Identify at least three features of the data (clusters, correlations, discreteness, impossible values) and write one paragraph each on what physical or instrumental cause could produce them.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'malmquist-simulation',
              title: 'Simulate a selection effect',
              prompt:
                'Simulate a population of standard candles with absolute magnitude $M \\sim N(-19.3, 0.3^2)$, uniformly distributed in volume out to 500 Mpc. Apply a survey limit $m < 17$ and compute the mean $M$ of detected objects in distance bins; show it becomes brighter with distance (Malmquist bias). Fit $H_0$-style distance estimates naively and show the bias in the inferred distances. Propose and test one correction.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should cleaning be done in code rather than by hand?',
              answerOutline:
                'Reproducibility and auditability: every change is documented and can be rerun on new or corrected raw data; hand edits are invisible and unrepeatable.',
            },
            {
              question: 'When is it legitimate to remove an outlier?',
              answerOutline:
                'When an independent criterion (quality flag, physical impossibility, known instrumental fault) identifies it, not merely because it disagrees with the model; otherwise model it, and always report removals.',
            },
            {
              question: 'What is Malmquist bias?',
              answerOutline:
                'In a flux-limited sample, distant objects are detected only if intrinsically bright, so mean luminosity appears to increase with distance; it is a selection effect.',
            },
            {
              question: 'Why use the median and MAD for heavy-tailed data?',
              answerOutline:
                'They have high breakdown points: a few extreme values barely change them, whereas the mean and SD can be dominated by a single outlier.',
            },
          ],
        },
        {
          slug: 'uncertainty-propagation',
          title: 'Propagation of uncertainty and systematic errors',
          summary:
            'Carrying errors through calculations: the linear (first-order) propagation formula with covariances, Monte Carlo propagation, statistical versus systematic errors, and combining measurements.',
          estimatedMinutes: 150,
          objectives: [
            'Derive and apply the first-order propagation formula including covariance terms, in matrix form $J\\Sigma J^T$',
            'Recognise when linear propagation fails (nonlinear functions, large relative errors) and use Monte Carlo propagation instead',
            'Distinguish statistical from systematic uncertainties and treat systematics as nuisance parameters',
            'Combine independent and correlated measurements with inverse-variance weighting and test their consistency',
            'Report results following the GUM conventions (standard uncertainty, coverage factor, significant figures)',
          ],
          concepts: [
            'First-order propagation $\\sigma_f^2 = \\sum(\\partial f/\\partial x_i)^2\\sigma_i^2 + $ covariance terms',
            'Jacobian form $\\Sigma_f = J\\Sigma_xJ^T$',
            'Relative errors for products and powers',
            'Monte Carlo propagation',
            'Statistical vs systematic uncertainty',
            'Systematics as nuisance parameters',
            'Inverse-variance weighted mean and its error',
            'Consistency checks (Birge ratio / chi-square)',
          ],
          explanation: `If you measure $x$ and $y$ with uncertainties and compute $f(x, y)$, what is the uncertainty on $f$? Linearise: $\\delta f \\approx \\frac{\\partial f}{\\partial x}\\delta x + \\frac{\\partial f}{\\partial y}\\delta y$ (the total differential from math-methods), square and take expectations:

$$\\sigma_f^2 \\approx \\left(\\frac{\\partial f}{\\partial x}\\right)^2\\sigma_x^2 + \\left(\\frac{\\partial f}{\\partial y}\\right)^2\\sigma_y^2 + 2\\frac{\\partial f}{\\partial x}\\frac{\\partial f}{\\partial y}\\operatorname{Cov}(x,y) .$$

In matrix form, for a vector of outputs $\\mathbf{f}(\\mathbf{x})$, $\\Sigma_f = J\\Sigma_xJ^T$ with $J$ the Jacobian. For products and quotients the relative errors add in quadrature; for a power $x^n$ the relative error is multiplied by $|n|$. The covariance term is the one people forget, and it can dominate: the difference of two strongly positively correlated quantities is much better determined than the quadrature sum suggests, their sum much worse.

Linear propagation assumes $f$ is close to linear over the error range. When relative errors are large or $f$ is strongly nonlinear (a ratio with a denominator consistent with zero, a logarithm, an exponential), it fails, sometimes grotesquely. **Monte Carlo propagation** is the general solution: draw many samples of the inputs from their (joint) distribution, compute $f$ for each, and summarise the output distribution with percentiles. It handles correlations, nonlinearity and non-Gaussian inputs automatically and is how you should check any analytic propagation. The \`uncertainties\` package does linear propagation automatically, including correlations, which is convenient for routine work.

**Statistical** uncertainties shrink with more data; **systematic** uncertainties (calibration offsets, model assumptions, unknown backgrounds) do not, and they eventually dominate every precise measurement. Quote them separately ($g = 9.812 \\pm 0.004_{\\text{stat}} \\pm 0.010_{\\text{sys}}$), estimate them by varying the assumption within its plausible range, and, in a likelihood or Bayesian analysis, represent each as a **nuisance parameter** with a prior and marginalise, which propagates it correctly and correlates it properly across results.

To combine independent measurements $x_i \\pm \\sigma_i$ of the same quantity, use the **inverse-variance weighted mean** $\\bar x = \\sum w_ix_i/\\sum w_i$ with $w_i = 1/\\sigma_i^2$ and error $(\\sum w_i)^{-1/2}$, which is the MLE. Then check consistency: $\\chi^2 = \\sum(x_i - \\bar x)^2/\\sigma_i^2$ should be about $N - 1$. If it is much larger, the errors are underestimated or there is an unaccounted systematic; the Particle Data Group scales errors by the Birge ratio $\\sqrt{\\chi^2/(N-1)}$, which is a practical patch, not an explanation.

Read the NIST uncertainty guidelines (Taylor and Kuyatt, the summary of the GUM), the GUM documents at BIPM for reference, and the \`uncertainties\` package documentation. Then do the Monte Carlo comparison exercise; it will make you suspicious of every error bar computed with the linear formula on a strongly nonlinear quantity.`,
          resources: [
            {
              title: 'NIST — Essentials of expressing measurement uncertainty',
              url: 'https://physics.nist.gov/cuu/Uncertainty/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The practical summary of the GUM: standard uncertainty, Type A/B evaluation, combined and expanded uncertainty.',
              primary: true,
            },
            {
              title: 'JCGM / BIPM — Guide to the Expression of Uncertainty in Measurement (GUM) and supplements',
              url: 'https://www.bipm.org/en/committees/jc/jcgm/publications',
              type: 'documentation',
              cost: 'free',
              provider: 'BIPM',
              note: 'JCGM 100 (GUM) and JCGM 101 (propagation by Monte Carlo); reference documents.',
            },
            {
              title: 'uncertainties — Python package documentation',
              url: 'https://uncertainties.readthedocs.io/en/latest/',
              type: 'tool',
              cost: 'free',
              provider: 'Eric O. Lebigot',
              note: 'Automatic first-order propagation with correlations.',
            },
            {
              title: 'MIT 18.05 — Unit on propagation of error / delta method (Class 6 and 13 readings)',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'linear-vs-monte-carlo',
              title: 'Linear versus Monte Carlo propagation',
              prompt:
                'For $f = x/y$ with $x = 10 \\pm 1$ and $y = 2 \\pm \\sigma_y$, compare the linear propagated error with the Monte Carlo distribution of $f$ (10^5 samples) for $\\sigma_y = 0.1, 0.5, 1.0$. Plot the MC histograms, report the 16th/50th/84th percentiles against the linear $f \\pm \\sigma_f$, and identify where linear propagation breaks down. Repeat for $f = \\ln x$ and $f = e^{x/3}$.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'covariance-in-propagation',
              title: 'Correlated inputs',
              prompt:
                'A line fit gives $a = 1.20 \\pm 0.10$, $b = 0.50 \\pm 0.02$ with correlation $\\rho = -0.85$. Compute the predicted value $y = a + bx$ and its error at $x = 0, 10, 20$ using $J\\Sigma J^T$, with and without the covariance term. Explain why ignoring the covariance gives the wrong answer and in which direction at each $x$. Verify with the `uncertainties` package using `correlated_values`.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'combine-measurements',
              title: 'Combining measurements of a constant',
              prompt:
                'Take seven published measurements of a physical constant (e.g. historical values of $G$ or of the neutron lifetime, with their quoted errors). Compute the inverse-variance weighted mean and its error, the $\\chi^2$ of consistency and its p-value, and the Birge ratio. Plot the measurements with the combined value. Write a paragraph on what the inconsistency implies and how you would report the combination.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'systematic-as-nuisance',
              title: 'A systematic error as a nuisance parameter',
              prompt:
                'A pendulum experiment measures periods with statistical error, but the length $L$ has a calibration uncertainty of 2 mm common to all trials. Simulate 20 trials, estimate $g$ (a) ignoring the calibration, (b) adding it in quadrature at the end, (c) treating the calibration offset as a nuisance parameter with a Gaussian prior and marginalising (by MC). Show (b) and (c) agree here and explain a situation (several experiments sharing the calibration) where only (c) handles the correlation correctly.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the first-order propagation formula in matrix form.',
              answerOutline:
                '$\\Sigma_f = J\\Sigma_xJ^T$, with $J_{ij} = \\partial f_i/\\partial x_j$ evaluated at the best estimates.',
            },
            {
              question: 'When does linear propagation fail and what do you use instead?',
              answerOutline:
                'When the function is strongly nonlinear over the error range or relative errors are large (e.g. a denominator near zero); use Monte Carlo propagation and quote percentiles.',
            },
            {
              question: 'Why must systematic and statistical errors be reported separately?',
              answerOutline:
                'Statistical errors shrink with more data and are independent between experiments; systematics do not shrink and may be correlated across results, which matters for combinations and future improvements.',
            },
            {
              question: 'How do you combine independent measurements and test whether they agree?',
              answerOutline:
                'Inverse-variance weighted mean with error $(\\sum 1/\\sigma_i^2)^{-1/2}$; check $\\chi^2 = \\sum(x_i - \\bar x)^2/\\sigma_i^2$ against $N - 1$ degrees of freedom.',
            },
          ],
        },
        {
          slug: 'visualisation-and-reproducible-reporting',
          title: 'Visualising uncertainty and reproducible reporting',
          summary:
            'Making figures that show data and uncertainty honestly, reporting numbers with appropriate precision, and structuring an analysis so anyone can rerun it from raw data to final figure.',
          estimatedMinutes: 120,
          objectives: [
            'Produce publication-quality figures with error bars, confidence bands and posterior samples that represent uncertainty honestly',
            'Choose axes, scales and plot types that reveal rather than hide structure, and avoid common misleading practices',
            'Report results with sensible significant figures and complete statements of method, priors and cuts',
            'Structure an analysis as a reproducible pipeline: version control, environment files, fixed seeds, scripted figures',
            'Write a methods and results section that another scientist could reproduce',
          ],
          concepts: [
            'Error bars: what they represent (1$\\sigma$, 95%, SE vs SD)',
            'Confidence and credible bands; spaghetti plots of posterior draws',
            'Residual panels and pulls',
            'Log scales, aspect ratio and colour maps (perceptually uniform)',
            'Significant figures and rounding of uncertainties',
            'Reproducible environment (requirements, conda)',
            'Version control and data provenance',
            'Notebooks versus scripts; literate analysis',
          ],
          explanation: `A figure is often the only part of an analysis anyone looks at, so it must carry the uncertainty along with the data. Every error bar needs a stated meaning: one standard deviation of the data, one standard error of a mean, or a 95% interval are all common and differ by factors of several, so say which in the caption. For fitted curves show the **uncertainty band** (from the parameter covariance or, better, a "spaghetti" of curves drawn from the posterior), and add a **residual panel** beneath, plotting $(y - \\hat y)/\\sigma$ (pulls), which reveals systematic misfit invisible in the main panel. Use log axes for quantities spanning decades, label axes with units, choose aspect ratios that do not exaggerate slopes, and use perceptually uniform colour maps (viridis, cividis) rather than rainbow maps that create false features and fail for colour-blind readers.

Numbers deserve the same honesty. Round the uncertainty to one or two significant figures and the value to the same decimal place: $9.812 \\pm 0.004$, not $9.81234 \\pm 0.00387$. State what the interval is (68% credible, 95% CL), the priors and likelihood used, every data cut, and any blinding. A result is not reproducible if a reader cannot tell which of the many reasonable analysis choices you made.

**Reproducibility** is a property of the workflow. Keep raw data immutable and separate from derived data; generate every figure and number with a script from raw data (no manual steps, no copy-pasted numbers); fix random seeds; record the exact software environment (a \`requirements.txt\` or conda \`environment.yml\` with versions); and keep everything in git, committing as you go. Notebooks are excellent for exploration and for presenting a narrative, but restart-and-run-all must work, and functions you reuse belong in a module that the notebook imports and that has tests. The Turing Way and the Software Carpentry lessons cover these practices in depth; adopting even half of them makes your future self's life immeasurably easier.

Finally, write. A good methods section states the data source, cleaning steps, model and likelihood, priors, fitting or sampling method with convergence evidence, and how uncertainties were propagated; a good results section gives numbers with uncertainties, the key figure, and the checks (residuals, coverage, sensitivity) that justify trusting them. Read the Matplotlib tutorials, the Turing Way guide to reproducible research and Software Carpentry's version control lesson, and then apply them to the capstone.`,
          resources: [
            {
              title: 'The Turing Way — Guide for reproducible research',
              url: 'https://the-turing-way.netlify.app/',
              type: 'textbook',
              cost: 'free',
              provider: 'The Alan Turing Institute',
              note: 'Chapters on version control, reproducible environments, data management and code testing.',
              primary: true,
            },
            {
              title: 'Matplotlib — Tutorials',
              url: 'https://matplotlib.org/stable/tutorials/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Matplotlib',
              note: 'Read the tutorials on artists, colormaps (choosing colormaps) and arranging subplots.',
            },
            {
              title: 'Software Carpentry — Lessons (Version control with Git, Plotting and programming in Python)',
              url: 'https://software-carpentry.org/lessons/',
              type: 'course',
              cost: 'free',
              provider: 'The Carpentries',
            },
            {
              title: 'Matplotlib — Examples gallery',
              url: 'https://matplotlib.org/stable/gallery/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Matplotlib',
              note: 'Error bars, fill_between bands and multi-panel layouts with shared axes.',
            },
          ],
          exercises: [
            {
              slug: 'honest-figure',
              title: 'Make an honest figure',
              prompt:
                'Take a fit from an earlier lesson (e.g. the line with intrinsic scatter fitted by emcee). Produce a two-panel figure: data with error bars, the best fit, a 68% band from 200 posterior draws, and a pulls panel underneath sharing the x axis. Use a perceptually uniform colour map for any colour-coded variable, label axes with units, and write a caption that states what every error bar and band represents.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'misleading-plots',
              title: 'Diagnose misleading plots',
              prompt:
                'Recreate three misleading figures from the same simulated dataset: (a) a truncated y-axis exaggerating a small effect, (b) a rainbow colour map creating spurious bands in a smooth field, (c) error bars showing SD where SE was implied (or vice versa) so that two groups look different or identical. For each, make the corrected version and write two sentences on the deception.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'reproducible-repo',
              title: 'Turn an analysis into a reproducible repository',
              prompt:
                'Take one of your earlier module projects and restructure it into a git repository with: `data/raw` (read-only), `data/derived`, `src/` with importable functions and pytest tests, a `make` or `snakemake` (or simple Python driver) target that regenerates every figure from raw data, a pinned environment file, and a README explaining how to reproduce the results. Verify by cloning into a fresh directory and environment and running the pipeline end to end.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must a caption state what the error bars represent?',
              answerOutline:
                'SD, SE and 95% intervals differ by factors of $\\sqrt n$ or about 2; without the definition a reader cannot judge significance or overlap.',
            },
            {
              question: 'What is a pulls panel and what does it reveal?',
              answerOutline:
                'A plot of $(y - \\hat y)/\\sigma$ under the main plot; systematic trends or a spread far from 1 reveal misfit or wrong errors that the main panel hides.',
            },
            {
              question: 'How should a measurement with an uncertainty be rounded?',
              answerOutline:
                'Uncertainty to one or two significant figures, value to the same decimal place; e.g. $9.812 \\pm 0.004$.',
            },
            {
              question: 'List four practices that make an analysis reproducible.',
              answerOutline:
                'Immutable raw data, scripted pipeline from raw data to every figure/number, version control, pinned software environment, fixed random seeds, tests for reused code.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'statistical-analysis-of-real-data',
    title: 'Capstone: a statistical analysis of a real scientific dataset',
    description: `Choose a real, public scientific dataset with a question worth answering and carry it from raw download to a reproducible, paper-style report. Good candidates: the Cepheid period-luminosity relation from published photometry; a supernova Hubble diagram (e.g. the Pantheon sample) fitted for $H_0$ or $\\Omega_m$; radioactive decay or muon-lifetime data from a teaching lab; a long climate time series from NOAA; exoplanet radial-velocity data from the NASA Exoplanet Archive.

The analysis must include: documented cleaning and exploratory analysis; a justified generative model and likelihood (with outliers or intrinsic scatter treated explicitly where relevant); a frequentist fit with properly propagated and bootstrap-validated uncertainties; a Bayesian analysis with stated priors, MCMC sampling and full convergence diagnostics; at least one model-comparison question answered with both a predictive criterion and an evidence-type criterion; a treatment of at least one systematic uncertainty as a nuisance parameter; posterior predictive checks; and a fake-data study showing your pipeline recovers known inputs with honest error bars. Everything must regenerate from raw data with one command.`,
    deliverables: [
      'A git repository containing raw-data download scripts, cleaning code, analysis modules with tests, and a single command that regenerates all results',
      'A pinned environment file and README with reproduction instructions',
      'A 8-12 page report in the structure of a short paper: introduction, data, methods, results with uncertainties, model comparison, systematics, validation (fake-data study), discussion',
      'Publication-quality figures including a corner plot, a data-plus-model figure with uncertainty band and pulls panel, and a convergence-diagnostics figure',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Fit a hierarchical model that pools information across subsamples (e.g. host galaxies or observing seasons)',
      'Reproduce a published result from the same data and explain any difference',
      'Implement the analysis in both emcee and a Hamiltonian Monte Carlo framework (PyMC or Stan) and compare efficiency',
    ],
  },
  masteryChecklist: [
    'I can compute probabilities with counting, conditioning, independence and Bayes\' theorem, and I avoid the base-rate and prosecutor\'s fallacies',
    'I can derive the mean and variance of the standard discrete and continuous distributions and explain the physical mechanism behind each',
    'I can work with joint distributions, covariance matrices and the multivariate normal, including error ellipses',
    'I can state and use the law of large numbers and the central limit theorem, and recognise when they fail',
    'I can derive maximum likelihood estimators, obtain standard errors from the Hessian, and construct and check the coverage of confidence intervals',
    'I can use the bootstrap and fake-data simulations to validate any estimator or fitting pipeline',
    'I can perform hypothesis tests, compute power, apply chi-square and likelihood-ratio tests, and correct for multiple comparisons',
    'I can fit linear models with weights, diagnose residuals, and handle outliers, intrinsic scatter and errors in both variables',
    'I can write a log-posterior for a physical model, sample it with MCMC, diagnose convergence and compare models',
    'I can propagate uncertainties (linear and Monte Carlo), treat systematics as nuisance parameters, and produce a reproducible analysis with honest figures',
  ],
});
