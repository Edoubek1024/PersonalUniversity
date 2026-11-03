import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** Builds a resource from a shared source, so each lesson only says which part to use and why. */
const source =
  (base: Omit<ResourceInput, 'note' | 'primary'>) =>
  (note: string, primary = false): ResourceInput => ({ ...base, note, ...(primary ? { primary } : {}) });

const grinsteadSnell = source({
  title: 'Grinstead and Snell, Introduction to Probability',
  url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf',
  type: 'textbook',
  cost: 'free',
  provider: 'Dartmouth College',
});
const blitzsteinHwang = source({
  title: 'Blitzstein and Hwang, Introduction to Probability',
  url: 'http://probabilitybook.net/',
  type: 'textbook',
  cost: 'free',
  provider: 'Harvard Stat 110 authors (free PDF)',
});
const mit18600 = source({
  title: 'MIT 18.600 Probability and Random Variables',
  url: 'https://ocw.mit.edu/courses/18-600-probability-and-random-variables-fall-2019/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
});
const mit6041 = source({
  title: 'MIT 6.041SC Probabilistic Systems Analysis and Applied Probability',
  url: 'https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
});
const pishroNik = source({
  title: 'Pishro-Nik, Introduction to Probability, Statistics, and Random Processes',
  url: 'https://www.probabilitycourse.com/',
  type: 'textbook',
  cost: 'free',
  provider: 'probabilitycourse.com',
});
const randomServices = source({
  title: 'Siegrist, Random: Probability, Mathematical Statistics, Stochastic Processes',
  url: 'https://www.randomservices.org/random/',
  type: 'textbook',
  cost: 'free',
  provider: 'University of Alabama in Huntsville',
});
const seeingTheory = source({
  title: 'Seeing Theory',
  url: 'https://seeing-theory.brown.edu/',
  type: 'interactive',
  cost: 'free',
  provider: 'Brown University',
});
const scipyStats = source({
  title: 'SciPy statistical functions (scipy.stats)',
  url: 'https://docs.scipy.org/doc/scipy/reference/stats.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
});
const numpyRandom = source({
  title: 'NumPy random sampling',
  url: 'https://numpy.org/doc/stable/reference/random/index.html',
  type: 'documentation',
  cost: 'free',
  provider: 'NumPy',
});
const levinPeres = source({
  title: 'Levin, Peres and Wilmer, Markov Chains and Mixing Times',
  url: 'https://pages.uoregon.edu/dlevin/MARKOV/',
  type: 'textbook',
  cost: 'free',
  provider: 'University of Oregon',
});

export default defineSubject({
  id: 'probability-theory',
  title: 'Probability Theory',
  category: 'math',
  tagline:
    'Calculus-based probability from the axioms to the central limit theorem, with proofs, exact computation and simulation side by side.',
  description: `This course follows the topics in the public catalog description of University of Illinois MATH 461, Probability Theory: the calculus of probability, combinatorial analysis, random variables, expectation, distribution functions, moment generating functions and the central limit theorem. It is an original course written for self-study. It is not affiliated with or endorsed by the University of Illinois, and it does not reproduce any course's or textbook's materials.

You start from three axioms and derive everything else. Each module moves between a theorem, a computation and a simulation: you prove a statement, work out an exact answer, then check that answer with a few lines of Python. The two kinds of evidence catch different mistakes. A proof tells you why and under what hypotheses, and a simulation tells you when your algebra has gone wrong.

The level is calculus-based and proof-aware. You will use multiple integrals, series and change of variables freely, and you will prove most results that do not need measure theory. Where a full proof does need it, such as the strong law of large numbers or the uniqueness of moment generating functions, the lesson states the theorem with every hypothesis and says what is being assumed. Hypotheses get particular attention, because most errors in probability come from using a theorem where it does not apply.

The separate course \`probability-statistics\` is aimed at working scientists and moves on to estimation, testing and Bayesian computation. This one stays with the mathematics of probability and goes further into proofs, conditional expectation, generating functions, Markov chains and Poisson processes. Take this one if you want the theory that sits under statistics, stochastic processes and randomised algorithms.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['calculus-3'],
  recommendedBackground: [
    'Series, improper integrals and double integrals, including change of variables',
    'Reading and writing short proofs, including induction',
    'Basic Python with NumPy for the simulation checks',
  ],
  tags: ['probability', 'random variables', 'limit theorems', 'markov chains', 'poisson processes', 'simulation', 'proofs'],
  core: false,
  modules: [
    {
      slug: 'foundations',
      title: 'Foundations',
      description:
        'The axioms and what follows from them, counting for equally likely outcomes, conditional probability, independence and Bayes\' theorem.',
      lessons: [
        {
          slug: 'axioms-and-events',
          title: 'Sample spaces, events and the axioms',
          summary:
            'A probability model is a sample space, a family of events and a countably additive measure. Every rule you will use follows from three axioms.',
          estimatedMinutes: 105,
          objectives: [
            'State the axioms of probability and explain why events form a sigma-algebra',
            'Derive the complement rule, monotonicity, the union bound and inclusion-exclusion from the axioms',
            'Prove continuity of probability for increasing and decreasing sequences of events',
            'Distinguish probability zero from impossible',
          ],
          concepts: [
            'Sample space and outcomes',
            'Events and sigma-algebras',
            'Countable additivity',
            'Inclusion-exclusion',
            'Union bound',
            'Continuity of probability',
          ],
          explanation: `A **probability space** has three parts: a sample space $\\Omega$ of outcomes, a collection $\\mathcal{F}$ of subsets of $\\Omega$ called events, and a function $P:\\mathcal{F}\\to[0,1]$. The collection $\\mathcal{F}$ must be a **sigma-algebra**: it contains $\\Omega$ and is closed under complements and countable unions. The function must satisfy three axioms:

1. $P(A)\\ge 0$ for every event $A$.
2. $P(\\Omega)=1$.
3. If $A_1,A_2,\\dots$ are pairwise disjoint events, then $P\\big(\\bigcup_{i} A_i\\big)=\\sum_{i} P(A_i)$.

Why not let every subset be an event? On $\\Omega=[0,1]$ there is no countably additive, translation-invariant length defined on all subsets, so some restriction is unavoidable. Every set you meet in this course is an event, so you can note this and move on.

Everything else is a theorem. Taking $A_i=\\emptyset$ for all $i$ in axiom 3 gives $P(\\emptyset)=0$, and then finite additivity follows. From $\\Omega=A\\cup A^c$ you get $P(A^c)=1-P(A)$. Splitting $A\\cup B$ into disjoint pieces gives
$$P(A\\cup B)=P(A)+P(B)-P(A\\cap B),$$
and the same idea gives the **union bound** $P(\\bigcup_i A_i)\\le\\sum_i P(A_i)$ and **inclusion-exclusion** for $n$ events.

**Worked example.** Pick an integer uniformly from $1,\\dots,1000$. What is the probability it is divisible by 2, 3 or 5? Let $A_d$ be divisibility by $d$. Then $P(A_d)=\\lfloor 1000/d\\rfloor/1000$, and $A_2\\cap A_3=A_6$ because 2 and 3 are coprime, and similarly for the other pairs. So the count is
$$500+333+200-166-100-66+33=734,$$
giving probability $0.734$. Independence would predict $1-\\tfrac12\\cdot\\tfrac23\\cdot\\tfrac45=\\tfrac{11}{15}\\approx0.7333$, which is close but not exact, because 1000 is not a multiple of 30.

**Pitfall.** Probability zero does not mean impossible. For a uniform point on $[0,1]$, every single point has probability zero, yet some point occurs. Countable additivity does not contradict this, because $[0,1]$ is uncountable.`,
          resources: [
            grinsteadSnell('Read the opening chapter on discrete probability distributions for finite and countable models.', true),
            blitzsteinHwang('The first chapter on probability and counting gives the same axioms with many examples.'),
            seeingTheory('The Basic Probability and Probability Distributions chapters give a visual picture of events and additivity.'),
          ],
          exercises: [
            {
              slug: 'derive-basic-rules',
              title: 'Rules from the axioms',
              prompt: `Using only the three axioms, prove in order: (a) $P(\\emptyset)=0$; (b) finite additivity; (c) $P(A^c)=1-P(A)$; (d) if $A\\subseteq B$ then $P(A)\\le P(B)$; (e) $P(\\bigcup_{i=1}^\\infty A_i)\\le\\sum_{i=1}^\\infty P(A_i)$ for arbitrary events. State exactly where countable additivity is used.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'For (e), set $B_1=A_1$ and $B_n=A_n\\setminus\\bigcup_{i<n}A_i$. The $B_n$ are disjoint with the same union.',
            },
            {
              slug: 'continuity-of-probability',
              title: 'Continuity of probability',
              prompt: `Prove: if $A_1\\subseteq A_2\\subseteq\\cdots$ then $P(\\bigcup_n A_n)=\\lim_n P(A_n)$, and if $A_1\\supseteq A_2\\supseteq\\cdots$ then $P(\\bigcap_n A_n)=\\lim_n P(A_n)$. Then use the second statement to show that in an infinite sequence of independent fair coin tosses, the event that no head ever appears has probability 0.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the increasing case, write the union as a disjoint union of the differences $A_n\\setminus A_{n-1}$. For the decreasing case, take complements.',
            },
            {
              slug: 'no-uniform-on-integers',
              title: 'No uniform distribution on the integers',
              prompt: `Prove that there is no probability measure on the positive integers (with every subset an event) that gives every singleton $\\{n\\}$ the same probability. Which axiom forces this? Explain why the same argument does not rule out the uniform distribution on $[0,1]$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sieve-count',
              title: 'A sieve by inclusion-exclusion',
              prompt: `Pick an integer uniformly from $1,\\dots,2310$. Use inclusion-exclusion to find the exact probability that it is divisible by none of 2, 3, 5, 7, 11. Compare your answer with the product $\\prod_p (1-1/p)$ and explain why the two agree exactly here, though they did not in the example with 1000.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answer: $16/77$. Note that $2310=2\\cdot3\\cdot5\\cdot7\\cdot11$.',
            },
            {
              slug: 'exactly-two-fixed-points',
              title: 'Exactly two fixed points',
              prompt: `A uniformly random permutation of $\\{1,\\dots,n\\}$ has $D_n$ derangements among its $n!$ outcomes, where a derangement has no fixed point. (a) Prove $D_n=n!\\sum_{k=0}^n(-1)^k/k!$ by inclusion-exclusion. (b) Find the exact probability that a random permutation of six objects has exactly two fixed points. (c) Show that $P(\\text{no fixed point})\\to 1/e$ as $n\\to\\infty$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), choose the two fixed points, then derange the other four. Answer: $3/16$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the third axiom use countably many events and not just two?',
              answerOutline:
                'Finite additivity cannot handle limits. Countable additivity gives continuity of probability, which is needed for infinite experiments and every limit theorem.',
            },
            {
              question: 'What does inclusion-exclusion give for $P(A\\cup B\\cup C)$?',
              answerOutline:
                '$P(A)+P(B)+P(C)-P(A\\cap B)-P(A\\cap C)-P(B\\cap C)+P(A\\cap B\\cap C)$.',
            },
            {
              question: 'Give an event with probability zero that is not empty.',
              answerOutline:
                'Any single point, or any countable set, under the uniform distribution on $[0,1]$. An example is that a uniform point is rational.',
            },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/sample-spaces-and-axioms'],
        },
        {
          slug: 'counting',
          title: 'Counting for equally likely outcomes',
          summary:
            'When outcomes are equally likely, probability is counting. The skill lies in choosing a sample space where they really are equally likely.',
          estimatedMinutes: 105,
          objectives: [
            'Use the multiplication principle and identify ordered or unordered sampling, with or without replacement',
            'Count with binomial and multinomial coefficients',
            'Use bars-and-stars counts while recognising that those configurations need not be equally likely',
            'Prove counting identities by double counting',
          ],
          concepts: [
            'Multiplication principle',
            'Permutations and combinations',
            'Multinomial coefficients',
            'Sampling with and without replacement',
            'Bars and stars',
            'Double counting',
          ],
          explanation: `If $\\Omega$ is finite and all outcomes are equally likely, then $P(A)=|A|/|\\Omega|$. All the work is in counting, and nearly all errors come from counting $A$ and $\\Omega$ under different conventions. Decide first whether order matters, then count both in that same convention.

Four cases cover most problems. Choosing $k$ items from $n$ gives:

- ordered, with replacement: $n^k$
- ordered, without replacement: $n(n-1)\\cdots(n-k+1)$
- unordered, without replacement: $\\binom{n}{k}=\\frac{n!}{k!(n-k)!}$
- unordered, with replacement: $\\binom{n+k-1}{k}$

The last is **bars and stars**: $k$ stars and $n-1$ bars in a row. A warning comes with it. These configurations count occupancy patterns, and when $k$ distinguishable balls fall independently into $n$ boxes, the patterns are *not* equally likely. Equally likely outcomes come from the physical process, not from the count.

The **multinomial coefficient** $\\frac{n!}{n_1!\\cdots n_r!}$, with $n_1+\\dots+n_r=n$, counts the ways to split $n$ labelled objects into groups of those sizes. It also counts arrangements of a word with repeated letters.

**Worked example.** What is the probability that a 13-card hand from a standard deck has suit lengths 5, 4, 3, 1 in some order? There are $\\binom{52}{13}$ equally likely hands, unordered and without replacement. To build a favourable hand, first decide which suit gets which length. The four lengths are all different, so there are $4!=24$ assignments. Then choose the cards within each suit:
$$P=\\frac{24\\binom{13}{5}\\binom{13}{4}\\binom{13}{3}\\binom{13}{1}}{\\binom{52}{13}}\\approx0.1293.$$
For lengths 4, 4, 3, 2 the same idea has a trap. Two suits share a length, so swapping them gives the same assignment, and there are $4!/2!=12$ assignments, not 24. The probability is about $0.2155$.

Check every count on a smaller case you can list by hand, or by sampling random hands in NumPy.`,
          resources: [
            grinsteadSnell('Read the chapter on combinatorics for permutations, combinations and binomial coefficients.', true),
            mit18600('The early lectures on permutations, combinations and the multinomial theorem, with problem sets.'),
          ],
          exercises: [
            {
              slug: 'tile-draws',
              title: 'With and without replacement',
              prompt: `A bag has 5 red, 4 green and 3 blue tiles. You draw 4 tiles. Find the probability of exactly 2 red, 1 green and 1 blue (a) without replacement and (b) with replacement. Explain why the two formulas have different shapes, and confirm both by simulation.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) $8/33$, (b) $25/144$.',
            },
            {
              slug: 'tennessee-arrangements',
              title: 'Arrangements with repeated letters',
              prompt: `A uniformly random arrangement of the letters of TENNESSEE is formed. Find (a) the number of distinct arrangements, and (b) the probability that no two E's are adjacent. Justify why every distinct arrangement is equally likely when the nine tiles are shuffled.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Place the five non-E letters first, then pick gaps for the E\'s. Answers: 3780 and $5/42$.',
            },
            {
              slug: 'occupancy-not-uniform',
              title: 'Occupancy patterns are not equally likely',
              prompt: `Three distinguishable balls are dropped independently and uniformly into three boxes. (a) How many occupancy patterns $(n_1,n_2,n_3)$ with $n_1+n_2+n_3=3$ are there? (b) Find the exact probability of the pattern $(1,1,1)$ and of the pattern $(3,0,0)$. (c) Explain in one or two sentences what mistake gives $1/10$ for the first of these.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'There are 27 equally likely assignments of balls to boxes.',
            },
            {
              slug: 'vandermonde',
              title: 'Vandermonde and the hypergeometric',
              prompt: `Prove by double counting that $\\sum_{k}\\binom{m}{k}\\binom{n}{r-k}=\\binom{m+n}{r}$. Deduce that the probabilities of drawing $k$ red items when sampling $r$ without replacement from $m$ red and $n$ blue items sum to 1.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'no-consecutive-numbers',
              title: 'Lottery numbers with no neighbours',
              prompt: `Six numbers are chosen uniformly without replacement from $1,\\dots,49$. Prove that the number of selections with no two consecutive numbers is $\\binom{44}{6}$ by building an explicit bijection, then compute the probability to four decimal places. State the general formula for choosing $k$ from $n$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $a_1<\\dots<a_6$ has no neighbours, consider $b_i=a_i-(i-1)$. Answer: about $0.5048$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\binom{n}{k}$ used for hands of cards even though cards arrive one at a time?',
              answerOutline:
                'Each unordered hand corresponds to exactly $k!$ ordered deals, so unordered hands are equally likely. Either convention works if $A$ and $\\Omega$ use the same one.',
            },
            {
              question: 'When can you not treat bars-and-stars configurations as equally likely?',
              answerOutline:
                'Whenever the physical process assigns distinguishable items independently. Then the patterns have multinomial probabilities.',
            },
            {
              question: 'How many ways can 12 people be split into three named groups of sizes 5, 4 and 3?',
              answerOutline: '$12!/(5!\\,4!\\,3!)=27720$.',
            },
          ],
          relatedLessons: [
            'discrete-mathematics/counting-combinatorics/permutations-combinations-and-binomial-coefficients',
            'probability-statistics/probability-foundations/counting-and-equally-likely-outcomes',
          ],
        },
        {
          slug: 'conditional-probability',
          title: 'Conditional probability and total probability',
          summary:
            'Conditioning restricts the sample space. The chain rule and the law of total probability let you solve problems by breaking them into stages.',
          estimatedMinutes: 95,
          objectives: [
            'Define conditional probability and prove that it is a probability measure',
            'Use the multiplication rule for sequential experiments',
            'Apply the law of total probability over a partition',
            'Set up first-step analysis for a recursive problem',
          ],
          concepts: [
            'Conditional probability',
            'Multiplication (chain) rule',
            'Partition of the sample space',
            'Law of total probability',
            'First-step analysis',
            'Exchangeability',
          ],
          explanation: `For $P(B)>0$, the **conditional probability** of $A$ given $B$ is
$$P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}.$$
Think of it as renormalising: you discard outcomes outside $B$ and rescale what is left to total 1. For fixed $B$, the map $A\\mapsto P(A\\mid B)$ satisfies all the axioms, so every rule you know also holds conditionally. For example, $P(A^c\\mid B)=1-P(A\\mid B)$.

Rearranging gives the **chain rule**:
$$P(A_1\\cap\\cdots\\cap A_n)=P(A_1)\\,P(A_2\\mid A_1)\\cdots P(A_n\\mid A_1\\cap\\cdots\\cap A_{n-1}),$$
valid when the conditioning events have positive probability. Use it for any experiment that runs in stages.

If $B_1,B_2,\\dots$ partition $\\Omega$ and each $P(B_i)>0$, the **law of total probability** says
$$P(A)=\\sum_i P(A\\mid B_i)\\,P(B_i).$$
This is the most useful formula in the module. When a probability is hard to find directly, ask what you wish you knew, and condition on it. Conditioning on the first step of a process often gives an equation for the answer itself, a method called **first-step analysis**.

**Worked example.** An urn holds 2 red balls and 1 blue. You draw a ball, note its colour, and return it with one extra ball of the same colour. This is a Pólya urn. What is the probability that the second draw is red? Write $R_i$ for red on draw $i$. Condition on the first draw. After a red draw the urn is 3 red and 1 blue, and after a blue draw it is 2 red and 2 blue, so
$$P(R_2)=P(R_2\\mid R_1)P(R_1)+P(R_2\\mid R_1^c)P(R_1^c)=\\tfrac34\\cdot\\tfrac23+\\tfrac12\\cdot\\tfrac13=\\tfrac23.$$
The marginal chance of red has not changed, even though the draws are dependent. You can also condition backwards: $P(R_1\\mid R_2)=P(R_1\\cap R_2)/P(R_2)=(1/2)/(2/3)=3/4$. Conditioning measures information, not causation, so a later draw can inform you about an earlier one.

**Pitfall.** $P(A\\mid B)$ and $P(B\\mid A)$ are different quantities. The next lesson but one relates them.`,
          resources: [
            grinsteadSnell('Read the chapter on conditional probability, up to the discussion of independent events.', true),
            mit6041('The opening lectures on conditioning and Bayes, with recitation problems and video solutions.'),
            blitzsteinHwang('The chapter on conditional probability has a long section on conditioning as a problem-solving strategy.'),
          ],
          exercises: [
            {
              slug: 'conditional-is-a-measure',
              title: 'Conditioning gives a probability measure',
              prompt: `Fix an event $B$ with $P(B)>0$. Prove that $Q(A)=P(A\\mid B)$ satisfies all three axioms. Then prove that conditioning $Q$ on an event $C$ with $Q(C)>0$ gives $P(\\,\\cdot\\mid B\\cap C)$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'four-suits-chain-rule',
              title: 'Chain rule with cards',
              prompt: `You draw 4 cards without replacement from a standard deck. Use the chain rule to find the exact probability that all four suits appear. Check your answer by counting with binomial coefficients.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answer: $2197/20825\\approx0.1055$.',
            },
            {
              slug: 'first-step-ruin',
              title: 'First-step analysis of a ruin problem',
              prompt: `A gambler starts with $k$ units and bets one unit per round, winning with probability $p$ and losing with probability $q=1-p$, independently. Play stops at 0 or at $N$. Let $h(k)$ be the probability of reaching $N$. (a) Show $h(k)=p\\,h(k+1)+q\\,h(k-1)$ with $h(0)=0$ and $h(N)=1$. (b) Solve to get $h(k)=k/N$ for $p=1/2$, and $h(k)=(1-r^k)/(1-r^N)$ with $r=q/p$ for $p\\ne1/2$. (c) Evaluate for $p=0.48$, $k=10$, $N=20$ and confirm by simulation.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Part (c): about $0.310$. Set $d_k=h(k+1)-h(k)$ and show $d_k=r\\,d_{k-1}$.',
            },
            {
              slug: 'polya-marginal',
              title: 'The marginal in a Pólya urn',
              prompt: `An urn starts with $a$ red and $b$ blue balls. At each step a ball is drawn and returned with $c$ extra balls of its colour, where $c\\ge0$ is an integer. Prove by induction on $n$ that the probability of red on draw $n$ equals $a/(a+b)$ for every $n$ and every starting pair $(a,b)$ with $a,b\\ge 0$ and $a+b>0$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Condition on draw 1. After it, the remaining process is the same kind of urn with new counts, so the induction hypothesis must cover all starting pairs at once.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the law of total probability and its hypotheses.',
              answerOutline:
                '$P(A)=\\sum_i P(A\\mid B_i)P(B_i)$ where the $B_i$ are disjoint, their union is $\\Omega$, and each has positive probability.',
            },
            {
              question: 'Is $P(A\\mid B)+P(A\\mid B^c)=1$ in general?',
              answerOutline:
                'No. The correct identity is $P(A\\mid B)+P(A^c\\mid B)=1$. The first sum can be anything from 0 to 2.',
            },
            {
              question: 'What is first-step analysis?',
              answerOutline:
                'Condition on the first move of a process, then use the fact that the process restarts from its new state. This gives a recursion or linear system for the unknown.',
            },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/conditional-probability-and-independence'],
        },
        {
          slug: 'independence',
          title: 'Independence',
          summary:
            'Independence is defined by a product rule. Pairwise independence, mutual independence and conditional independence are all different.',
          estimatedMinutes: 90,
          objectives: [
            'Define independence for two events and for a collection of events',
            'Give examples showing pairwise independence does not imply mutual independence',
            'Separate independence from disjointness and from conditional independence',
            'Compute reliability of systems of independent components by conditioning',
          ],
          concepts: [
            'Independence of two events',
            'Mutual independence',
            'Pairwise independence',
            'Conditional independence',
            'Independent trials',
          ],
          explanation: `Events $A$ and $B$ are **independent** if $P(A\\cap B)=P(A)P(B)$. When $P(B)>0$ this says $P(A\\mid B)=P(A)$: learning $B$ tells you nothing about $A$. The product form is the definition because it also covers events of probability zero.

Do not confuse this with disjointness. If $A$ and $B$ are disjoint with positive probabilities, then $P(A\\cap B)=0\\ne P(A)P(B)$, so they are dependent. Knowing one occurred tells you the other did not.

A collection of events is **mutually independent** if the product rule holds for every finite subcollection:
$$P(A_{i_1}\\cap\\cdots\\cap A_{i_k})=P(A_{i_1})\\cdots P(A_{i_k}).$$
For three events that means four equations: three pairs and one triple. None of them is redundant.

**Worked example.** Toss two fair coins. Let $A$ be "first is heads", $B$ be "second is heads" and $C$ be "exactly one head". Each has probability $\\tfrac12$. For the pairs, $A\\cap B$ is the outcome HH, $A\\cap C$ is HT, and $B\\cap C$ is TH, each with probability $\\tfrac14=\\tfrac12\\cdot\\tfrac12$. So the three are pairwise independent. But $A\\cap B\\cap C=\\emptyset$, so
$$P(A\\cap B\\cap C)=0\\ne\\tfrac18.$$
Any two of the events determine the third, so they are not mutually independent. This construction is the idea behind a parity bit: one extra bit that looks independent of each data bit on its own, yet is fixed by all of them together.

Independence also survives complements: if $A$ and $B$ are independent, then
$$P(A\\cap B^c)=P(A)-P(A)P(B)=P(A)P(B^c).$$
That is why "at least one success in $n$ independent trials" equals $1-(1-p)^n$.

**Conditional independence** means $P(A\\cap B\\mid C)=P(A\\mid C)P(B\\mid C)$. It neither implies nor follows from independence. Two tosses of a coin of unknown bias are conditionally independent given the bias, yet dependent unconditionally, because the first toss teaches you about the coin.`,
          resources: [
            grinsteadSnell('Use the part of the conditional probability chapter on independent events and joint distributions.', true),
            pishroNik('The sections on independence and conditional independence have short solved problems.'),
          ],
          exercises: [
            {
              slug: 'complement-closure',
              title: 'Complements preserve independence',
              prompt: `Let $A_1,\\dots,A_n$ be mutually independent. Prove that if you replace any subset of them by their complements, the resulting collection is still mutually independent.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Replace one event at a time, and show the single-replacement step for every subcollection that contains it.',
            },
            {
              slug: 'triple-product-not-enough',
              title: 'The triple product alone is not enough',
              prompt: `Construct a finite probability space with three events such that $P(A\\cap B\\cap C)=P(A)P(B)P(C)$ with all probabilities positive, yet no pair among them is independent. Verify all the equations explicitly. Any correct example earns full credit.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Try $\\Omega=\\{1,\\dots,8\\}$ with equally likely outcomes and three events of size 4 sharing exactly one point.',
            },
            {
              slug: 'bridge-network',
              title: 'Reliability of a bridge network',
              prompt: `Nodes $s$ and $t$ are linked by five independent components, each working with probability $p$: $a$ from $s$ to $u$, $b$ from $s$ to $v$, $c$ from $u$ to $t$, $d$ from $v$ to $t$, and a bridge $e$ between $u$ and $v$. Condition on $e$ to show that the probability of a working path from $s$ to $t$ is $R(p)=2p^2+2p^3-5p^4+2p^5$. Evaluate at $p=0.9$ and confirm by listing all 32 states in code.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'If $e$ works, the system is two parallel pairs in series. If $e$ fails, it is two series pairs in parallel. $R(0.9)\\approx0.97848$.',
            },
            {
              slug: 'coin-from-a-bag',
              title: 'Conditional independence versus independence',
              prompt: `A bag holds a fair coin and a two-headed coin. You pick one at random and toss it twice. Let $H_i$ be heads on toss $i$. (a) Compute $P(H_1)$, $P(H_1\\cap H_2)$ and $P(H_2\\mid H_1)$. (b) Show the tosses are conditionally independent given the coin but not independent.`,
              kind: 'problem',
              difficulty: 1,
              hint: '$P(H_1)=3/4$, $P(H_1\\cap H_2)=5/8$, $P(H_2\\mid H_1)=5/6$.',
            },
            {
              slug: 'long-run-of-heads',
              title: 'A run of five heads',
              prompt: `Find the exact probability that 20 independent fair coin tosses contain a run of at least 5 consecutive heads. Do it with a recursion on the length of the current run, compute the answer as an exact fraction in Python, and confirm by simulation with $10^6$ trials. Report the Monte Carlo standard error.`,
              kind: 'simulation',
              difficulty: 3,
              hint: 'Track the probability of each state "current run of length $j$, no run of 5 yet" for $j=0,\\dots,4$. The answer is about $0.2499$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Can two events of positive probability be both disjoint and independent?',
              answerOutline: 'No. Disjoint means $P(A\\cap B)=0$, but independence would need $P(A)P(B)>0$.',
            },
            {
              question: 'How many equations define mutual independence of $n$ events?',
              answerOutline: 'One for each subset of size at least 2, which is $2^n-n-1$ equations.',
            },
            {
              question: 'Is an event independent of itself ever?',
              answerOutline: 'Only if $P(A)=P(A)^2$, so $P(A)$ is 0 or 1.',
            },
          ],
        },
        {
          slug: 'bayes-theorem',
          title: 'Bayes\' theorem and sequential updating',
          summary:
            'Bayes\' theorem inverts conditional probabilities. The odds form makes base rates and the strength of evidence easy to see.',
          estimatedMinutes: 95,
          objectives: [
            'Derive Bayes\' theorem for a partition and state its hypotheses',
            'Use the odds form with likelihood ratios',
            'Update sequentially and state when conditional independence is needed',
            'Compute a predictive probability from a posterior',
          ],
          concepts: [
            'Prior and posterior',
            'Likelihood',
            'Bayes\' theorem',
            'Odds and likelihood ratio',
            'Sequential updating',
            'Predictive probability',
          ],
          explanation: `Let $H_1,\\dots,H_n$ be a partition with $P(H_i)>0$, and let $E$ be an event with $P(E)>0$. Combining the definition of conditional probability with total probability gives **Bayes' theorem**:
$$P(H_i\\mid E)=\\frac{P(E\\mid H_i)\\,P(H_i)}{\\sum_j P(E\\mid H_j)\\,P(H_j)}.$$
$P(H_i)$ is the **prior**, $P(E\\mid H_i)$ the **likelihood**, and the left side the **posterior**. The denominator only normalises, so the posterior is proportional to prior times likelihood.

For two hypotheses, dividing the two versions gives the **odds form**:
$$\\frac{P(H\\mid E)}{P(H^c\\mid E)}=\\frac{P(H)}{P(H^c)}\\cdot\\frac{P(E\\mid H)}{P(E\\mid H^c)}.$$
Posterior odds are prior odds times the **likelihood ratio**. This shows why base rates matter: strong evidence for a very rare hypothesis can still leave it unlikely. Confusing $P(E\\mid H)$ with $P(H\\mid E)$ is the classic error known as the prosecutor's fallacy.

**Worked example.** A box holds three coins with heads probabilities $\\tfrac14,\\tfrac12,\\tfrac34$. You pick one uniformly and toss it three times, getting H, H, T. Given the coin, tosses are independent, so the likelihoods are
$$\\tfrac14\\cdot\\tfrac14\\cdot\\tfrac34=\\tfrac{3}{64},\\qquad\\tfrac12\\cdot\\tfrac12\\cdot\\tfrac12=\\tfrac{8}{64},\\qquad\\tfrac34\\cdot\\tfrac34\\cdot\\tfrac14=\\tfrac{9}{64}.$$
The prior is uniform, so the posterior is proportional to $3:8:9$, which gives $\\tfrac{3}{20},\\tfrac{8}{20},\\tfrac{9}{20}$. Now predict the next toss. By total probability under the posterior,
$$P(\\text{next H}\\mid\\text{data})=\\tfrac{3}{20}\\cdot\\tfrac14+\\tfrac{8}{20}\\cdot\\tfrac12+\\tfrac{9}{20}\\cdot\\tfrac34=\\tfrac{23}{40}=0.575.$$
Conditional independence given the coin is what licenses this step: once you condition on a coin, the old tosses say nothing more about the next toss. The prediction, 0.575, is not any of the three heads probabilities. It is their posterior-weighted average.

**Sequential updating.** If pieces of evidence are conditionally independent given each hypothesis, you may update one at a time, using each posterior as the next prior, in any order. Without conditional independence this fails. Two reports that copy one another are not two independent pieces of evidence.`,
          resources: [
            blitzsteinHwang('The conditional probability chapter develops Bayes\' rule, odds and conditional independence with care.', true),
            {
              title: '3Blue1Brown: Bayes theorem',
              url: 'https://www.3blue1brown.com/lessons/bayes-theorem',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'A geometric view of why the base rate matters.',
            },
            mit18600('The lectures on conditional probability and Bayes\' rule, with problem sets.'),
          ],
          exercises: [
            {
              slug: 'factory-lines',
              title: 'Three production lines',
              prompt: `Lines A, B and C make 50%, 30% and 20% of a factory's output, with defect rates 1%, 2% and 4%. (a) Find the overall defect rate. (b) Given that an item is defective, find the probability it came from each line. Note how the line with the smallest share ends up the most likely source.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $0.019$. (b) $5/19$, $6/19$, $8/19$.',
            },
            {
              slug: 'detector-evidence',
              title: 'Likelihood ratios and repeated evidence',
              prompt: `An event has prior probability $1/1000$. A detector fires with likelihood ratio 50 in its favour. (a) Find the posterior probability after one alarm. (b) A second detector, conditionally independent of the first given the truth, also fires with likelihood ratio 50. Find the posterior now. (c) Suppose instead the second alarm is a copy of the first, firing exactly when the first does. Find the posterior, and explain the difference.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $50/1049\\approx0.0477$. (b) $2500/3499\\approx0.7145$. (c) Same as (a).',
            },
            {
              slug: 'host-variants',
              title: 'What the host knows',
              prompt: `A prize is behind one of three doors, uniformly. You pick door 1. (a) A host who knows where the prize is opens door 3 from among the doors that are unpicked and have no prize, choosing door 3 with probability $u$ when both doors 2 and 3 qualify. Given that he opens door 3, find the probability that switching to door 2 wins. (b) A host who knows nothing opens door 2 or 3 at random, and it happens to reveal no prize. Find the probability that switching wins. Explain why (b) differs from (a) at $u=1/2$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $1/(1+u)$. (b) $1/2$.',
            },
            {
              slug: 'rule-of-succession',
              title: 'From urns to the rule of succession',
              prompt: `There are $N+1$ urns numbered $0,\\dots,N$. Urn $k$ has $k$ red balls and $N-k$ blue. An urn is picked uniformly, and $n$ balls are drawn with replacement, all red. (a) Write the exact probability that the next draw is red. (b) Interpret the numerator and denominator as Riemann sums and prove the limit as $N\\to\\infty$ is $(n+1)/(n+2)$. (c) Compute the exact value for $N=100$, $n=10$, and compare with the limit.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The answer to (a) is $\\sum_k (k/N)^{n+1}\\big/\\sum_k (k/N)^{n}$. For (c), the exact value is about $0.9212$ and the limit is $11/12\\approx0.9167$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State Bayes\' theorem for a two-element partition $\\{H,H^c\\}$.',
              answerOutline:
                '$P(H\\mid E)=P(E\\mid H)P(H)/[P(E\\mid H)P(H)+P(E\\mid H^c)P(H^c)]$, assuming $P(E)>0$ and $0<P(H)<1$.',
            },
            {
              question: 'What does a likelihood ratio of 1 mean?',
              answerOutline: 'The evidence is equally likely under both hypotheses, so the odds do not change.',
            },
            {
              question: 'When may you update on two pieces of evidence one at a time?',
              answerOutline:
                'Always, if you use $P(E_2\\mid H,E_1)$ at the second step. You may use $P(E_2\\mid H)$ only when they are conditionally independent given each hypothesis.',
            },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/bayes-theorem'],
        },
      ],
    },
    {
      slug: 'discrete-random-variables',
      title: 'Discrete Random Variables',
      description:
        'Random variables as functions, expectation and variance, the standard discrete families, and probability generating functions.',
      lessons: [
        {
          slug: 'random-variables-and-expectation',
          title: 'Random variables, distributions and expectation',
          summary:
            'A random variable is a function on the sample space. Its mass function and CDF describe it, and expectation is defined only when a series converges absolutely.',
          estimatedMinutes: 105,
          objectives: [
            'Define a random variable, its probability mass function and its CDF',
            'State the defining properties of a CDF',
            'Compute expectations, using the law of the unconscious statistician where it helps',
            'Explain why expectation needs absolute convergence',
          ],
          concepts: [
            'Random variable',
            'Probability mass function',
            'Cumulative distribution function',
            'Expectation and absolute convergence',
            'Law of the unconscious statistician',
            'Tail-sum formula',
          ],
          explanation: `A **random variable** is a function $X:\\Omega\\to\\mathbb{R}$ such that $\\{X\\le x\\}$ is an event for every $x$. The randomness lives in the outcome $\\omega$, and $X$ is a fixed rule that reads off a number. $X$ is **discrete** if it takes countably many values. Its **mass function** is $p(x)=P(X=x)$, and its **CDF** is $F(x)=P(X\\le x)$. Every CDF is non-decreasing and right-continuous, with limits 0 at $-\\infty$ and 1 at $+\\infty$. For a discrete variable it is a step function.

The **expectation** of a discrete $X$ is
$$E[X]=\\sum_x x\\,p(x),\\qquad\\text{provided }\\sum_x|x|\\,p(x)<\\infty.$$
The proviso matters. A conditionally convergent series can be rearranged to any sum, and a random variable's values have no natural order, so $E[X]$ would not be well defined. If $X\\ge 0$, the sum always makes sense but may be $+\\infty$.

To compute $E[g(X)]$ you do not need the distribution of $g(X)$. The **law of the unconscious statistician** says $E[g(X)]=\\sum_x g(x)\\,p(x)$, again given absolute convergence. For $X$ with values in $\\{0,1,2,\\dots\\}$, swapping the order of summation gives the **tail-sum formula**
$$E[X]=\\sum_{k=1}^\\infty P(X\\ge k).$$

**Worked example.** Roll a fair four-sided die three times and let $X$ be the maximum. The direct route to a maximum goes through the CDF, since $X\\le k$ exactly when all three rolls are at most $k$. So $F(k)=(k/4)^3$ for $k=1,\\dots,4$. Differences give the mass function:
$$p(k)=F(k)-F(k-1)=\\frac{k^3-(k-1)^3}{64},$$
that is, $\\tfrac{1}{64},\\tfrac{7}{64},\\tfrac{19}{64},\\tfrac{37}{64}$, which sum to 1. Then
$$E[X]=\\frac{1+14+57+148}{64}=\\frac{220}{64}=\\frac{55}{16}=3.4375.$$
The tail-sum formula agrees: $\\sum_{k=1}^4\\big(1-F(k-1)\\big)=4-\\tfrac{1+8+27}{64}=\\tfrac{55}{16}$.

**Pitfall.** $E[g(X)]\\ne g(E[X])$ in general. Taking $g(x)=x^2$, the two sides differ by the variance, which you will meet next.`,
          resources: [
            grinsteadSnell('Read the chapter on expected value and variance, first the sections on discrete variables.', true),
            mit18600('The lectures on random variables, expectation and the St. Petersburg paradox.'),
            scipyStats('Use the discrete distribution objects to check mass functions and CDFs.'),
          ],
          exercises: [
            {
              slug: 'max-of-four-dice',
              title: 'Maximum of four dice',
              prompt: `Roll a fair six-sided die four times and let $X$ be the maximum. Find the CDF, the mass function and $E[X]$ as an exact fraction, by two methods. Confirm by listing all 1296 outcomes in code.`,
              kind: 'problem',
              difficulty: 1,
              hint: '$E[X]=6797/1296\\approx5.2446$.',
            },
            {
              slug: 'tail-sum-proof',
              title: 'The tail-sum formula',
              prompt: `Prove that $E[X]=\\sum_{k\\ge1}P(X\\ge k)$ for $X$ with values in $\\{0,1,2,\\dots\\}$, including the case where both sides are infinite, and justify the interchange of sums. Use it to find $E[X]$ when $P(X\\ge k)=q^{k-1}$ for $k\\ge 1$, with $0<q<1$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Write $k=\\sum_{j=1}^{k}1$. Terms are non-negative, so the order of summation may be swapped. The second part gives $1/(1-q)$.',
            },
            {
              slug: 'no-expectation',
              title: 'A convergent series that is not an expectation',
              prompt: `Let $P(X=(-1)^{k+1}k)=\\dfrac{6}{\\pi^2k^2}$ for $k=1,2,\\dots$. (a) Check this is a mass function. (b) Show $\\sum_x|x|p(x)=\\infty$, so $E[X]$ does not exist. (c) Show that summing $x\\,p(x)$ in the order $k=1,2,3,\\dots$ gives $6\\ln2/\\pi^2\\approx0.4214$, and describe a rearrangement giving a different sum. (d) Simulate sample means of size $10^6$ and describe what you see.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'truncated-st-petersburg',
              title: 'St. Petersburg with a finite bank',
              prompt: `Toss a fair coin until the first head, at toss $T$, and receive $2^T$ units. (a) Show the expected payoff is infinite. (b) If the bank can pay at most $2^{20}$ units, show that the expected payoff is exactly 21. (c) Simulate the untruncated game $10^6$ times and report why the sample mean is unstable.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What properties characterise a CDF?',
              answerOutline: 'Non-decreasing, right-continuous, with limit 0 at $-\\infty$ and limit 1 at $+\\infty$.',
            },
            {
              question: 'Why does the definition of expectation require absolute convergence?',
              answerOutline:
                'Values have no canonical order, and a conditionally convergent series changes its sum under rearrangement.',
            },
            {
              question: 'How do you recover $P(X=x)$ from the CDF?',
              answerOutline: '$P(X=x)=F(x)-F(x^-)$, the size of the jump at $x$.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/random-variables-and-expectation'],
        },
        {
          slug: 'linearity-and-variance',
          title: 'Linearity, indicators and variance',
          summary:
            'Linearity of expectation needs no independence. Combined with indicator variables, it solves problems whose distributions are hopeless to write down.',
          estimatedMinutes: 105,
          objectives: [
            'Prove linearity of expectation and use it without independence',
            'Write counts as sums of indicators to find means and variances',
            'Compute variance and use its scaling rule',
            'Define independence of random variables and prove the product rule for expectations',
          ],
          concepts: [
            'Linearity of expectation',
            'Indicator random variables',
            'Variance and standard deviation',
            'Independent random variables',
            'Product rule for independent variables',
          ],
          explanation: `**Linearity** says $E[aX+bY]=aE[X]+bE[Y]$ whenever $E[X]$ and $E[Y]$ exist. On a countable sample space, $E[X]=\\sum_\\omega X(\\omega)P(\\{\\omega\\})$, and linearity is just linearity of absolutely convergent sums. No independence is needed.

An **indicator** $I_A$ equals 1 on $A$ and 0 otherwise, so $E[I_A]=P(A)$. To find the mean of a count, write it as a sum of indicators and add the probabilities. The dependence among the indicators does not matter for the mean.

The **variance** is $\\mathrm{Var}(X)=E[(X-\\mu)^2]=E[X^2]-\\mu^2$, defined when $E[X^2]<\\infty$. It obeys $\\mathrm{Var}(aX+b)=a^2\\mathrm{Var}(X)$, so the units of $\\sqrt{\\mathrm{Var}(X)}$ match those of $X$.

Discrete $X$ and $Y$ are **independent** if $P(X=x,Y=y)=P(X=x)P(Y=y)$ for all $x,y$. Then $E[XY]=E[X]E[Y]$, given that both expectations exist, because the double sum factors. The converse is false.

For a sum of indicators, expanding the square gives
$$\\mathrm{Var}\\Big(\\sum_i I_i\\Big)=\\sum_i\\mathrm{Var}(I_i)+\\sum_{i\\ne j}\\big(E[I_iI_j]-E[I_i]E[I_j]\\big),$$
and the second sum vanishes for independent variables.

**Worked example.** Shuffle $m$ red and $n$ blue cards into a row. A **run** is a maximal block of one colour. For example, RRBRBB has 4 runs. What is the expected number of runs? The distribution is messy, but the number of runs is 1 plus the number of colour changes. Let $I_i$ indicate that positions $i$ and $i+1$ differ, for $i=1,\\dots,m+n-1$. By symmetry each ordered pair of positions is equally likely to hold any ordered pair of distinct cards, so
$$E[I_i]=\\frac{2mn}{(m+n)(m+n-1)}.$$
The $I_i$ are dependent, but linearity does not care:
$$E[\\text{runs}]=1+(m+n-1)\\cdot\\frac{2mn}{(m+n)(m+n-1)}=1+\\frac{2mn}{m+n}.$$
With $m=n=5$ this is 6. Listing all 252 arrangements gives the same. For the variance you would need the pair probabilities $E[I_iI_j]$, and neighbouring positions share a card, so those pairs must be treated separately.

**Pitfall.** $\\mathrm{Var}(X+Y)=\\mathrm{Var}(X)+\\mathrm{Var}(Y)$ needs uncorrelated variables, while $E[X+Y]=E[X]+E[Y]$ needs nothing.`,
          resources: [
            blitzsteinHwang('The chapter on expectation covers indicators and linearity with many examples.', true),
            mit6041('The lectures on discrete random variables and their expectations.'),
            grinsteadSnell('The chapter on expected value and variance, for proofs of the sum rules.'),
          ],
          exercises: [
            {
              slug: 'linearity-and-product-proofs',
              title: 'Two proofs',
              prompt: `Let $X$ and $Y$ be discrete with finite expectations on a countable sample space. (a) Prove $E[X+Y]=E[X]+E[Y]$, justifying each rearrangement. (b) If they are independent, prove $E[XY]=E[X]E[Y]$, first showing that $\\sum_{x,y}|xy|\\,P(X=x,Y=y)<\\infty$. (c) Give $X,Y$ with $E[XY]=E[X]E[Y]$ that are not independent.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), try $X$ uniform on $\\{-1,0,1\\}$ and $Y=X^2$.',
            },
            {
              slug: 'distinct-faces',
              title: 'Distinct faces in ten rolls',
              prompt: `Roll a fair die 10 times and let $D$ be the number of distinct faces seen. Use indicators of each face being missing to find $E[D]$ and $\\mathrm{Var}(D)$ exactly as formulas, then numerically. Confirm with $10^6$ simulated experiments.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'With $a=(5/6)^{10}$ and $b=(4/6)^{10}$: $E[D]=6(1-a)\\approx5.031$ and $\\mathrm{Var}(D)=6a(1-a)+30(b-a^2)\\approx0.5503$.',
            },
            {
              slug: 'fixed-point-moments',
              title: 'Fixed points of a permutation',
              prompt: `Let $F_n$ be the number of fixed points of a uniform random permutation of $n$ objects, $n\\ge2$. Prove $E[F_n]=1$ and $\\mathrm{Var}(F_n)=1$ for every such $n$. Explain why the indicators are dependent and why that does not spoil the clean result.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'zero-variance',
              title: 'Zero variance means constant',
              prompt: `Prove that a discrete $X$ with finite second moment has $\\mathrm{Var}(X)=0$ if and only if $P(X=c)=1$ for some constant $c$. Then prove that $c=E[X]$ minimises $E[(X-c)^2]$ and find the minimum value.`,
              kind: 'derivation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does linearity of expectation assume about dependence?',
              answerOutline: 'Nothing. It only needs the expectations to exist.',
            },
            {
              question: 'What is $\\mathrm{Var}(3X-2)$ in terms of $\\mathrm{Var}(X)$?',
              answerOutline: '$9\\,\\mathrm{Var}(X)$.',
            },
            {
              question: 'Does $E[XY]=E[X]E[Y]$ imply independence?',
              answerOutline: 'No. It says only that $X$ and $Y$ are uncorrelated.',
            },
          ],
          relatedLessons: ['discrete-mathematics/discrete-probability-intro/random-variables-and-expectation'],
        },
        {
          slug: 'bernoulli-trial-distributions',
          title: 'Distributions from independent trials',
          summary:
            'The Bernoulli, binomial, geometric and negative binomial families all count something in independent trials. The hypergeometric is what sampling without replacement looks like.',
          estimatedMinutes: 105,
          objectives: [
            'Derive the mass function, mean and variance of the binomial and geometric families',
            'Use the negative binomial for waiting-time problems',
            'Prove the memoryless property of the geometric',
            'Compare hypergeometric and binomial sampling',
          ],
          concepts: [
            'Bernoulli and binomial',
            'Geometric and memorylessness',
            'Negative binomial',
            'Hypergeometric',
            'Finite population correction',
          ],
          explanation: `A **Bernoulli**($p$) variable is 1 with probability $p$ and 0 with probability $q=1-p$. Its mean is $p$ and its variance $pq$. Everything here is built from independent copies.

The **binomial**($n,p$) counts successes in $n$ trials:
$$P(X=k)=\\binom{n}{k}p^kq^{n-k},\\qquad E[X]=np,\\qquad\\mathrm{Var}(X)=npq.$$
The moments follow at once from writing $X$ as a sum of $n$ independent indicators.

The **geometric**($p$) counts trials up to and including the first success: $P(T=k)=q^{k-1}p$ for $k\\ge1$, with $E[T]=1/p$ and $\\mathrm{Var}(T)=q/p^2$. It is **memoryless**: $P(T>m+n\\mid T>m)=P(T>n)$, because $P(T>k)=q^k$. Conventions differ, and some software counts failures before the first success instead, which shifts the support by 1. Always check which one you are using. NumPy's generator and SciPy's geom count trials, while SciPy's nbinom counts failures.

The **negative binomial**($r,p$) counts trials up to the $r$-th success: $P(T_r=k)=\\binom{k-1}{r-1}p^rq^{k-r}$ for $k\\ge r$. The last trial must be a success, and the $r-1$ earlier ones can sit anywhere among the first $k-1$. As a sum of $r$ independent geometrics, $E[T_r]=r/p$.

The **hypergeometric** counts successes in $n$ draws without replacement from $N$ items, of which $K$ are successes. It has mean $nK/N$, the same as the binomial, but a variance smaller by the factor $(N-n)/(N-1)$.

**Worked example.** Team A wins each game independently with probability $p=0.6$. The series ends when a team reaches 4 wins. What is the probability that A wins the series? Team A wins in game $4+k$ when its fourth win falls there, with $k$ losses among the first $3+k$ games. The negative binomial mass function gives
$$P(\\text{A wins})=\\sum_{k=0}^{3}\\binom{3+k}{k}p^4q^k=p^4(1+4q+10q^2+20q^3).$$
With $q=0.4$ this is $0.1296\\times5.48\\approx0.7102$. A second route is a useful check. Imagine all seven games are played regardless. A wins the series exactly when it wins at least 4 of the 7, so the answer is also $P(\\text{Bin}(7,0.6)\\ge4)$, which gives the same number. The two calculations describe the same event.`,
          resources: [
            grinsteadSnell('The chapter on discrete distributions and the section on important distributions.', true),
            pishroNik('The section on special discrete distributions, for compact derivations.'),
            scipyStats('Read the parameter conventions for binom, geom, nbinom and hypergeom before using them.'),
          ],
          exercises: [
            {
              slug: 'binomial-mode',
              title: 'Where the binomial peaks',
              prompt: `Let $X\\sim\\text{Bin}(n,p)$ with $0<p<1$. By studying the ratio $P(X=k)/P(X=k-1)$, prove the mass function increases then decreases, with its maximum at $\\lfloor(n+1)p\\rfloor$, and that when $(n+1)p$ is an integer the maximum is attained at two adjacent values. Find the mode for $n=20$, $p=0.3$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'The ratio is $\\frac{(n-k+1)p}{kq}$. Compare it with 1. The mode for the example is 6.',
            },
            {
              slug: 'coupon-collector',
              title: 'Coupon collecting',
              prompt: `Each box holds one of $n$ coupon types, uniformly and independently. Let $T$ be the number of boxes needed to see every type. (a) Write $T$ as a sum of independent geometric variables and prove $E[T]=nH_n$, where $H_n$ is the $n$-th harmonic number. (b) Find $\\mathrm{Var}(T)$ as a sum. (c) Evaluate both for $n=50$ and compare with a simulation of $10^5$ runs.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For $n=50$: $E[T]\\approx224.96$ and $\\mathrm{Var}(T)\\approx3838$',
            },
            {
              slug: 'series-length',
              title: 'Length of a best-of-seven series',
              prompt: `For the series in the worked example with $p=0.6$, find the distribution of the number of games played and its mean as exact decimals. Explain why $p=1/2$ gives the largest mean, and find that mean as an exact fraction.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For $p=0.6$ the mean is about $5.6973$. For $p=1/2$ it is $93/16$.',
            },
            {
              slug: 'hypergeometric-variance',
              title: 'Hypergeometric variance by indicators',
              prompt: `Derive the mean and variance of the hypergeometric distribution from indicators $I_i$ of "draw $i$ is a success". Show that $\\mathrm{Var}(X)=n\\frac{K}{N}\\big(1-\\frac{K}{N}\\big)\\frac{N-n}{N-1}$ and explain why the variance is 0 when $n=N$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'By symmetry, $P(\\text{draws }i,j\\text{ both succeed})=\\frac{K(K-1)}{N(N-1)}$ for $i\\ne j$.',
            },
            {
              slug: 'memoryless-characterisation',
              title: 'Only the geometric is memoryless',
              prompt: `Let $T$ take values in the positive integers, with $P(T>n)>0$ for all $n$, and $P(T>m+n\\mid T>m)=P(T>n)$ for all non-negative integers $m,n$. Prove that $T$ is geometric. What is $p$ in terms of the distribution of $T$? What fails if $P(T>1)=0$?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Let $g(n)=P(T>n)$, so that $g(m+n)=g(m)g(n)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the hypergeometric have the same mean as the binomial but a smaller variance?',
              answerOutline:
                'Each draw is marginally a success with probability $K/N$, so means match. Draws are negatively correlated, which reduces the variance by $(N-n)/(N-1)$.',
            },
            {
              question: 'What is $P(T>5\\mid T>3)$ for a geometric $T$?',
              answerOutline: '$P(T>2)=q^2$, by memorylessness.',
            },
            {
              question: 'Why is the last trial fixed in the negative binomial count?',
              answerOutline:
                'The $r$-th success ends the experiment on trial $k$, so only the first $k-1$ trials are free to arrange.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/discrete-distributions'],
        },
        {
          slug: 'poisson-distribution',
          title: 'The Poisson distribution',
          summary:
            'The Poisson law is the limit of many rare, nearly independent chances. It has a clean sum rule and thinning rule, and a quantitative error bound.',
          estimatedMinutes: 95,
          objectives: [
            'Derive the Poisson mass function as a limit of binomials',
            'Compute Poisson moments and prove the sum and thinning rules',
            'Use Le Cam\'s inequality to bound the approximation error',
            'Apply the Poisson heuristic to collision problems',
          ],
          concepts: [
            'Poisson limit theorem',
            'Sum of independent Poisson variables',
            'Thinning',
            'Le Cam\'s inequality',
            'Total variation distance',
          ],
          explanation: `A variable $X$ is **Poisson**($\\lambda$), for $\\lambda>0$, if
$$P(X=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!},\\qquad k=0,1,2,\\dots$$
The exponential series shows the probabilities sum to 1, and both the mean and the variance equal $\\lambda$.

It arises as a limit. Fix $k$, let $n\\to\\infty$ and set $p=\\lambda/n$. Then
$$\\binom{n}{k}p^k(1-p)^{n-k}=\\frac{\\lambda^k}{k!}\\cdot\\frac{n(n-1)\\cdots(n-k+1)}{n^k}\\Big(1-\\frac{\\lambda}{n}\\Big)^{n}\\Big(1-\\frac{\\lambda}{n}\\Big)^{-k}\\to e^{-\\lambda}\\frac{\\lambda^k}{k!},$$
because the fraction and the last factor tend to 1 and the middle factor to $e^{-\\lambda}$. So the Poisson describes the count of many rare events. In practice it fits counts such as typing errors per page or decays per second, provided the events are rare, roughly independent and occur at a stable rate.

The approximation does not need equal probabilities. If $S$ is a sum of independent Bernoulli($p_i$) variables and $\\lambda=\\sum_i p_i$, **Le Cam's inequality** says
$$\\sum_{k\\ge0}\\Big|P(S=k)-e^{-\\lambda}\\frac{\\lambda^k}{k!}\\Big|<2\\sum_i p_i^2.$$
Half of that left side is the **total variation distance**: the largest possible difference in the probability of any event. So the error is controlled by how small the $p_i$ are, not by $n$ alone.

Two closure rules make the family easy to use. If $X\\sim$ Poisson($\\lambda$) and $Y\\sim$ Poisson($\\mu$) are independent, then $X+Y\\sim$ Poisson($\\lambda+\\mu$). And if each of a Poisson($\\lambda$) number of items is kept independently with probability $p$, the kept count is Poisson($\\lambda p$), the discarded count is Poisson($\\lambda(1-p)$), and the two are independent, which is a surprise.

**Worked example.** In a batch of $n=1000$ items, each is faulty independently with probability $p=0.002$. Find the probability of at least 3 faults. Here $\\lambda=2$. Taking the complement,
$$P(X\\ge3)\\approx1-e^{-2}\\big(1+2+2\\big)=1-5e^{-2}\\approx0.32332.$$
The exact binomial value is about $0.32332$ as well, agreeing to four decimal places. Le Cam's bound guarantees a total variation distance below $np^2=0.004$, and the true error is much smaller.`,
          resources: [
            blitzsteinHwang('The sections on the Poisson distribution and Poisson approximation.', true),
            randomServices('The chapter on the Poisson process connects this law to arrival counts.'),
            {
              title: 'Le Cam\'s theorem',
              url: 'https://en.wikipedia.org/wiki/Le_Cam%27s_theorem',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'A statement of the inequality, with references to its sharper forms.',
            },
          ],
          exercises: [
            {
              slug: 'factorial-moments',
              title: 'Factorial moments',
              prompt: `For $X\\sim$ Poisson($\\lambda$), prove $E[X(X-1)\\cdots(X-r+1)]=\\lambda^r$ for each positive integer $r$. Use the cases $r=1,2,3$ to find the mean, the variance and $E[X^3]$.`,
              kind: 'derivation',
              difficulty: 1,
              hint: '$E[X^3]=\\lambda^3+3\\lambda^2+\\lambda$.',
            },
            {
              slug: 'sum-thinning-splitting',
              title: 'Sums, thinning and splitting',
              prompt: `(a) Prove the sum rule by convolution and the binomial theorem. (b) Prove the thinning rule, including the independence of the kept and discarded counts, by computing their joint mass function. (c) Let $X,Y$ be independent Poisson($\\lambda$), Poisson($\\mu$). Prove that given $X+Y=n$, $X$ is Bin($n,\\lambda/(\\lambda+\\mu)$).`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'le-cam-in-practice',
              title: 'Testing Le Cam\'s bound',
              prompt: `For $n=100$, $p=0.03$, compute the exact total variation distance between Bin($n,p$) and Poisson($np$) with SciPy, and compare with the bound $np^2$. Repeat for $n=1000$, $p=0.003$ and for $n=10$, $p=0.3$. Report all three as a table and comment on what controls the error.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'The true distances are about $0.0076$, $0.00075$ and $0.0864$ respectively, against bounds of $0.09$, $0.009$ and $0.9$.',
            },
            {
              slug: 'hash-collisions',
              title: 'Hash collisions',
              prompt: `You hash $n=10^5$ items uniformly into $M=2^{32}$ buckets. (a) Find the exact probability of no collision, as a product evaluated with logarithms. (b) Compare with the Poisson heuristic $\\exp(-\\binom{n}{2}/M)$. (c) Why is the heuristic reasonable when the pairwise collision events are not independent?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Both are about $0.3121$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does Le Cam\'s inequality say controls the Poisson approximation?',
              answerOutline: 'The sum of the squared success probabilities, $\\sum_i p_i^2$.',
            },
            {
              question: 'If arrivals are Poisson(10) and each is a bus with probability 0.2, what is the distribution of bus arrivals?',
              answerOutline: 'Poisson(2), independent of the non-bus arrivals, which are Poisson(8).',
            },
            {
              question: 'Why is mean equal to variance a quick diagnostic for Poisson counts, and is it conclusive?',
              answerOutline:
                'Poisson variables have equal mean and variance, so a large mismatch rules the model out. A match alone does not prove the data are Poisson.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/discrete-distributions'],
        },
        {
          slug: 'generating-functions',
          title: 'Probability generating functions',
          summary:
            'Packing a mass function into a power series turns convolutions into products, gives moments by differentiation, and solves branching processes.',
          estimatedMinutes: 110,
          objectives: [
            'Define the probability generating function and recover probabilities and moments from it',
            'Use products of generating functions for sums of independent variables',
            'Compute generating functions of random sums by composition',
            'Find extinction probabilities of a branching process',
          ],
          concepts: [
            'Probability generating function',
            'Uniqueness of coefficients',
            'Factorial moments from derivatives',
            'Random sums',
            'Galton-Watson branching process',
            'Extinction probability',
          ],
          explanation: `For $X$ with values in $\\{0,1,2,\\dots\\}$, the **probability generating function** is
$$G_X(s)=E[s^X]=\\sum_{k\\ge0}P(X=k)\\,s^k,$$
which converges at least for $|s|\\le1$. Power series coefficients are unique, so $G_X$ determines the distribution. Moments come from derivatives at $s=1$: $G'(1)=E[X]$ and $G''(1)=E[X(X-1)]$, read as limits as $s\\uparrow1$, and possibly infinite.

Two facts drive the applications. If $X$ and $Y$ are independent, then $G_{X+Y}=G_XG_Y$, so products replace convolutions. And for a **random sum** $S=X_1+\\dots+X_N$, where the $X_i$ are i.i.d. and independent of $N$, conditioning on $N$ gives
$$G_S(s)=G_N\\big(G_X(s)\\big).$$

**Branching processes.** Start with one individual. Each individual independently has a random number of children with generating function $G$ and mean $\\mu$, and the population $Z_n$ evolves by generations. Because generation $n+1$ is a random sum, the generating function of $Z_n$ is the $n$-fold composition of $G$. Let $q_n=P(Z_n=0)$. Then $q_{n+1}=G(q_n)$ with $q_0=0$, and $q_n$ increases to the extinction probability $q$. Since $G$ is continuous, $q$ solves $s=G(s)$. It is the *smallest* root in $[0,1]$. When $p_1=P(\\text{one child})<1$, extinction is certain if and only if $\\mu\\le1$, so the critical case $\\mu=1$ also dies out.

**Worked example.** Let a parent have 0, 1 or 2 children with probabilities $\\tfrac14,\\tfrac14,\\tfrac12$. Then $G(s)=\\tfrac14+\\tfrac14s+\\tfrac12s^2$, and $\\mu=G'(1)=\\tfrac14+1=\\tfrac54>1$. Solve $s=G(s)$:
$$2s^2-3s+1=0\\quad\\Longrightarrow\\quad(2s-1)(s-1)=0,$$
so the roots are $\\tfrac12$ and 1, and $q=\\tfrac12$. Check by iterating: $q_1=G(0)=0.25$, $q_2=G(0.25)\\approx0.34$, and the sequence climbs to $0.5$. Starting from three unrelated individuals, the lines die out independently, so the extinction probability is $(1/2)^3=\\tfrac18$.

**Pitfall.** The root $s=1$ always exists, and it is not always the answer. You must take the smallest root.`,
          resources: [
            grinsteadSnell('The chapter on generating functions, including the section on branching processes.', true),
            {
              title: 'Galton-Watson process',
              url: 'https://en.wikipedia.org/wiki/Galton%E2%80%93Watson_process',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'History and extinction criterion.',
            },
          ],
          exercises: [
            {
              slug: 'standard-pgfs',
              title: 'Standard generating functions',
              prompt: `Find $G$ for Bernoulli($p$), Bin($n,p$), geometric($p$) on $\\{1,2,\\dots\\}$ and Poisson($\\lambda$), giving the domain for the geometric. Derive the mean and variance of the geometric by differentiating.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'For the geometric, $G(s)=ps/(1-qs)$ for $|s|<1/q$.',
            },
            {
              slug: 'dice-by-factoring',
              title: 'Dice sums by factoring',
              prompt: `(a) Find $P(\\text{sum of three fair dice}=10)$ as a coefficient of a generating function. (b) Factor $s+s^2+\\dots+s^6$ over the integers, and use the factorisation to show that a die numbered $1,2,2,3,3,4$ and a die numbered $1,3,4,5,6,8$ together give the same distribution of sums as two ordinary dice.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $1/8$. (b) $s(s+1)(s^2+s+1)(s^2-s+1)$.',
            },
            {
              slug: 'even-or-odd',
              title: 'Parity from a generating function',
              prompt: `Show $P(X\\text{ even})=\\tfrac12(1+G_X(-1))$. Use this to find $P(X$ even$)$ for Poisson($\\lambda$) and for Bin($n,p$). What does the binomial answer tell you when $p=1/2$?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Poisson: $\\tfrac12(1+e^{-2\\lambda})$. Binomial: $\\tfrac12(1+(1-2p)^n)$.',
            },
            {
              slug: 'extinction-theorem',
              title: 'The extinction theorem',
              prompt: `Let $G$ be the offspring generating function of a branching process, with $p_1<1$. (a) Prove $q_n=G(q_{n-1})$ and that $q_n\\uparrow q$. (b) Prove $q$ is the smallest root of $s=G(s)$ in $[0,1]$, using that $G$ is non-decreasing. (c) Use convexity to prove $q=1$ if and only if $\\mu\\le1$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), if $r$ is any root in $[0,1]$, show $q_n\\le r$ by induction. For (c), treat the case that $G$ is linear separately, and note that $\\mu\\le1$ with $p_1<1$ forces $p_0>0$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you find $P(X=3)$ from $G_X$?',
              answerOutline: '$G_X^{(3)}(0)/3!$, the coefficient of $s^3$.',
            },
            {
              question: 'Find $E[S]$ for a random sum with $N$ independent of the i.i.d. $X_i$.',
              answerOutline: 'Differentiating $G_N(G_X(s))$ at 1 gives $E[S]=E[N]E[X]$.',
            },
            {
              question: 'Does a branching process with $\\mu=1$ survive?',
              answerOutline: 'No, extinction is certain unless every individual has exactly one child.',
            },
          ],
          relatedLessons: ['discrete-mathematics/counting-combinatorics/generating-functions-intro'],
        },
      ],
      project: {
        slug: 'branching-process-lab',
        title: 'Branching process lab',
        description: `Build a small Python library for Galton-Watson branching processes and use it to compare theory with simulation. Offspring distributions are supplied as a finite mass function or as a Poisson mean. Your code computes the exact extinction probability by iterating the generating function, simulates whole family trees by generation, and compares the two.

Use three required test cases: offspring law $(\\tfrac14,\\tfrac14,\\tfrac12)$ on $\\{0,1,2\\}$, with $q=\\tfrac12$; Poisson(1.5), with $q\\approx0.4172$; and the critical Poisson(1). In the critical case, measure $P(Z_n>0)$ and compare it with the asymptotic $2/(n\\sigma^2)$, which for Poisson(1) gives $2/n$. At $n=100$ the exact iteration gives about $0.0194$.

Branching models appear in the spread of infections, nuclear chain reactions and the survival of family names, and the critical case explains why large outbreaks can follow a basic reproduction number close to 1.`,
        deliverables: [
          'A tested Python module computing $q_n$ and $q$ by iteration, and the mean and variance of $Z_n$',
          'A simulator that returns the population by generation, capped so that supercritical runs stop when extinction becomes implausible',
          'Plots of $q_n$ against $n$, with simulated values and standard errors overlaid, for all three test cases',
          'A check that $E[Z_n]=\\mu^n$, and a note on why the sample mean is a poor estimate for large $n$ when $\\mu>1$',
          'A short report explaining the smallest-root rule with a plot of $y=G(s)$ against $y=s$',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Condition a supercritical process on extinction and show that it behaves like a subcritical process',
          'Estimate the distribution of the total progeny for a subcritical law and compare with its generating function equation',
        ],
      },
    },
    {
      slug: 'continuous-random-variables',
      title: 'Continuous Random Variables',
      description:
        'Densities and CDFs, the uniform, exponential, gamma, beta and normal families, and how densities change under transformations.',
      lessons: [
        {
          slug: 'densities-and-cdfs',
          title: 'Densities, CDFs and moments',
          summary:
            'For continuous variables, probability is area under a density. Expectation becomes an integral, with the same absolute convergence condition as before.',
          estimatedMinutes: 95,
          objectives: [
            'Define a density and compute probabilities and CDFs from it',
            'Compute expectations and variances by integration',
            'Use the tail integral formula for non-negative variables',
            'Recognise mixed distributions and heavy tails',
          ],
          concepts: [
            'Probability density function',
            'CDF of a continuous variable',
            'Expectation as an integral',
            'Tail integral formula',
            'Quantiles and the median',
            'Mixed distributions',
          ],
          explanation: `A random variable $X$ is **continuous** with density $f$ if $f\\ge0$, $\\int_{-\\infty}^\\infty f(x)\\,dx=1$ and
$$P(a\\le X\\le b)=\\int_a^b f(x)\\,dx.$$
Then the CDF $F(x)=\\int_{-\\infty}^x f(t)\\,dt$ is continuous, and $F'(x)=f(x)$ wherever $f$ is continuous. Every single point has probability 0, so it does not matter whether the inequalities are strict.

A density is not a probability. $f(x)$ may exceed 1, and may even be unbounded, as long as the total area is 1. Its units are probability per unit of $x$, and $f(x)\\,\\Delta x$ approximates $P(x<X<x+\\Delta x)$ for a small interval at a point of continuity.

The expectation is
$$E[X]=\\int_{-\\infty}^\\infty x\\,f(x)\\,dx,\\quad\\text{provided }\\int_{-\\infty}^\\infty|x|\\,f(x)\\,dx<\\infty,$$
and $E[g(X)]=\\int g(x)f(x)\\,dx$ under the same kind of condition. For $X\\ge0$ there is a continuous version of the tail-sum formula:
$$E[X]=\\int_0^\\infty P(X>x)\\,dx.$$

**Worked example.** Let $f(x)=cx^2$ on $[0,2]$ and 0 elsewhere. Normalising, $1=c\\int_0^2x^2\\,dx=8c/3$, so $c=\\tfrac38$. The CDF on $[0,2]$ is $F(x)=x^3/8$. The median $m$ solves $m^3/8=\\tfrac12$, so $m=2^{2/3}\\approx1.587$. The moments are
$$E[X]=\\tfrac38\\int_0^2x^3\\,dx=\\tfrac32,\\qquad E[X^2]=\\tfrac38\\int_0^2x^4\\,dx=\\tfrac{12}{5},$$
so $\\mathrm{Var}(X)=\\tfrac{12}{5}-\\tfrac94=\\tfrac{3}{20}$. The tail integral confirms the mean:
$$\\int_0^2(1-x^3/8)\\,dx=2-\\tfrac12=\\tfrac32.$$
Note that the median, $1.587$, sits above the mean, $1.5$. The density has its long tail on the left.

**Not everything has a density.** Some variables are **mixed**. A wait that is 0 with probability $\\tfrac14$ and otherwise exponential has a CDF with a jump at 0, so it has no density. CDFs handle all cases, which is why they are the safe tool when you are unsure.

**Heavy tails.** A density can integrate to 1 while $\\int|x|f(x)\\,dx$ diverges. You will see that the Cauchy distribution has no mean at all.`,
          resources: [
            grinsteadSnell('The chapter on continuous probability densities and the continuous part of the expected value chapter.', true),
            mit18600('The lectures on continuous random variables.'),
            seeingTheory('The Probability Distributions chapter shows how CDFs and densities relate.'),
          ],
          exercises: [
            {
              slug: 'tail-integral-proof',
              title: 'The tail integral formula',
              prompt: `Let $X\\ge0$ have density $f$. Prove $E[X]=\\int_0^\\infty(1-F(x))\\,dx$, justifying the interchange of integrals, and prove $E[X^2]=2\\int_0^\\infty x(1-F(x))\\,dx$. Check both for the exponential with rate $\\lambda$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Write $x=\\int_0^x dt$. The integrand is non-negative, so Tonelli\'s theorem applies.',
            },
            {
              slug: 'unbounded-and-mixed',
              title: 'An unbounded density and a mixed variable',
              prompt: `(a) Show $f(x)=\\frac{1}{2\\sqrt{x}}$ on $(0,1)$ is a density, and find $E[X]$ and $\\mathrm{Var}(X)$. (b) Let $Y=0$ with probability $\\tfrac14$ and otherwise be exponential with mean 1. Write the CDF of $Y$, and find $E[Y]$ and $\\mathrm{Var}(Y)$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $1/3$ and $4/45$. (b) $3/4$ and $15/16$.',
            },
            {
              slug: 'pareto-moments',
              title: 'Moments of a Pareto law',
              prompt: `Let $f(x)=\\alpha x^{-\\alpha-1}$ for $x\\ge1$, with $\\alpha>0$. Determine exactly for which $\\alpha$ the mean and the variance exist, and find them. Evaluate at $\\alpha=3$. For $\\alpha=1.5$, simulate sample variances for increasing sample size and describe what happens.`,
              kind: 'derivation',
              difficulty: 2,
              hint: '$E[X]=\\alpha/(\\alpha-1)$ for $\\alpha>1$, and $\\mathrm{Var}(X)=\\alpha/((\\alpha-1)^2(\\alpha-2))$ for $\\alpha>2$. At $\\alpha=3$ these are $3/2$ and $3/4$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Can a density exceed 1? Can a mass function?',
              answerOutline: 'A density can, because only its area must be 1. A mass function cannot, because each value is a probability.',
            },
            {
              question: 'How do you get a density from a CDF?',
              answerOutline: 'Differentiate, $f=F\'$, at points where $F$ is differentiable. This requires $F$ to have no jumps or singular part.',
            },
            {
              question: 'What is $P(X=2)$ for a continuous $X$?',
              answerOutline: '0, because the integral over a single point vanishes.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/continuous-distributions'],
        },
        {
          slug: 'exponential-gamma-beta',
          title: 'Uniform, exponential, gamma and beta',
          summary:
            'The exponential is the continuous memoryless waiting time, the gamma adds up such waits, and the beta lives on the unit interval.',
          estimatedMinutes: 105,
          objectives: [
            'Compute moments of the uniform, exponential, gamma and beta families',
            'Prove the memoryless property and use hazard rates',
            'Relate gamma waiting times to Poisson counts',
            'Identify the rate and scale conventions used by software',
          ],
          concepts: [
            'Uniform distribution',
            'Exponential and memorylessness',
            'Gamma function',
            'Gamma distribution',
            'Beta distribution',
            'Hazard rate',
          ],
          explanation: `The **uniform** on $(a,b)$ has density $1/(b-a)$, mean $(a+b)/2$ and variance $(b-a)^2/12$.

The **exponential** with rate $\\lambda>0$ has density $\\lambda e^{-\\lambda x}$ on $x>0$, so $P(X>x)=e^{-\\lambda x}$. Its mean is $1/\\lambda$ and its variance $1/\\lambda^2$. It is **memoryless**: $P(X>s+t\\mid X>s)=P(X>t)$. More generally, the **hazard rate** $h(t)=f(t)/(1-F(t))$ measures the instantaneous failure rate given survival to $t$, and the exponential is exactly the case of a constant hazard.

The **gamma function** is $\\Gamma(\\alpha)=\\int_0^\\infty x^{\\alpha-1}e^{-x}\\,dx$ for $\\alpha>0$. Integration by parts gives $\\Gamma(\\alpha+1)=\\alpha\\Gamma(\\alpha)$, so $\\Gamma(n)=(n-1)!$. The **gamma distribution** with shape $\\alpha$ and rate $\\lambda$ has density
$$f(x)=\\frac{\\lambda^\\alpha}{\\Gamma(\\alpha)}x^{\\alpha-1}e^{-\\lambda x},\\quad x>0,$$
with mean $\\alpha/\\lambda$ and variance $\\alpha/\\lambda^2$. For integer $\\alpha$ it is the sum of $\\alpha$ independent exponential waits, as Module 4 will prove. SciPy and NumPy use shape and *scale*, where scale is $1/\\lambda$, so a rate of 2 means scale $0.5$.

The **beta distribution** on $(0,1)$ has density proportional to $x^{a-1}(1-x)^{b-1}$ for $a,b>0$, with normalising constant $\\Gamma(a+b)/(\\Gamma(a)\\Gamma(b))$. Its mean is $a/(a+b)$.

**Worked example.** Calls arrive at rate 2 per minute, and you wait for the third call. The wait $X$ is gamma with $\\alpha=3$ and $\\lambda=2$. Find $P(X>2)$. Directly,
$$P(X>2)=\\int_2^\\infty\\frac{8}{2}x^2e^{-2x}\\,dx,$$
which needs two integrations by parts. There is a better way. The third call comes after time 2 exactly when at most two calls arrive in $[0,2]$, and that count is Poisson with mean $2\\times2=4$. So
$$P(X>2)=e^{-4}\\Big(1+4+\\frac{4^2}{2}\\Big)=13e^{-4}\\approx0.2381.$$
The integral gives the same value. This **gamma-Poisson duality** turns continuous waiting problems into discrete counts, and Module 6 explains why it holds.

**Pitfall.** Memorylessness is special. A part with an increasing hazard wears out, so its remaining life does shrink with age, and the exponential model would be wrong.`,
          resources: [
            blitzsteinHwang('The chapters on continuous random variables and on the gamma and beta families develop the stories behind them.', true),
            randomServices('The chapter on special distributions has interactive pictures of the gamma and beta densities.'),
            {
              title: 'NIST Digital Library of Mathematical Functions: Gamma function',
              url: 'https://dlmf.nist.gov/5',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'A reference for the gamma function identities used here.',
            },
          ],
          exercises: [
            {
              slug: 'memoryless-continuous',
              title: 'Only the exponential is memoryless',
              prompt: `Let $T>0$ with $G(t)=P(T>t)>0$ for all $t\\geq 0$, $G$ right-continuous, and $G(s+t)=G(s)G(t)$ for all $s,t\\ge0$. Prove that $T$ is exponential, by first treating rational $t$ and then using right-continuity. Assume $G$ is not identically 1.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Show $G(m/n)=G(1)^{m/n}$, and note $0<G(1)<1$.',
            },
            {
              slug: 'gamma-moments',
              title: 'Gamma moments',
              prompt: `For $X$ gamma with shape $\\alpha$ and rate $\\lambda$, prove $E[X^k]=\\dfrac{\\Gamma(\\alpha+k)}{\\Gamma(\\alpha)\\lambda^k}$ for $k>-\\alpha$. Deduce the mean and variance, and find $E[1/X]$, stating when it exists. Evaluate each for $\\alpha=5/2$, $\\lambda=2$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Mean $5/4$, variance $5/8$, and $E[1/X]=\\lambda/(\\alpha-1)=4/3$, which exists for $\\alpha>1$.',
            },
            {
              slug: 'beta-gamma-identity',
              title: 'The beta integral',
              prompt: `Prove $\\int_0^1x^{a-1}(1-x)^{b-1}dx=\\dfrac{\\Gamma(a)\\Gamma(b)}{\\Gamma(a+b)}$ by writing $\\Gamma(a)\\Gamma(b)$ as a double integral and substituting $u=x+y$, $v=x/(x+y)$. Deduce the mean and variance of Beta($a,b$), and evaluate for $a=3$, $b=5$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Variance $=ab/((a+b)^2(a+b+1))$, here $5/192$.',
            },
            {
              slug: 'hazard-to-survival',
              title: 'From hazard to survival',
              prompt: `(a) Show that $P(T>t)=\\exp(-\\int_0^th(s)\\,ds)$. (b) A part has hazard $h(t)=2t$. Find $P(T>t)$, $E[T]$, and compare $P(T>1)$ with $P(T>2\\mid T>1)$. (c) Interpret the comparison and contrast with the exponential.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Survival $e^{-t^2}$, mean $\\sqrt{\\pi}/2$, and the two probabilities are $e^{-1}\\approx0.368$ and $e^{-3}\\approx0.050$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\Gamma(4)$? What is $\\Gamma(1/2)$?',
              answerOutline: '$\\Gamma(4)=3!=6$ and $\\Gamma(1/2)=\\sqrt{\\pi}$.',
            },
            {
              question: 'State the relation between the gamma waiting time and the Poisson count.',
              answerOutline:
                'For arrivals at rate $\\lambda$, the $n$-th arrival comes after $t$ exactly when the Poisson($\\lambda t$) count in $[0,t]$ is below $n$.',
            },
            {
              question: 'What hazard rate does the exponential have?',
              answerOutline: 'The constant $\\lambda$, for every $t>0$.',
            },
          ],
        },
        {
          slug: 'normal-distribution',
          title: 'The normal distribution',
          summary:
            'The normal family is closed under linear maps, standardises to one table, and has tails that fall off faster than any exponential.',
          estimatedMinutes: 95,
          objectives: [
            'Prove the normal density integrates to 1 and compute its moments',
            'Standardise to compute probabilities and quantiles',
            'Bound normal tails with the Mills ratio',
            'Use the second parameter correctly as a variance or a scale',
          ],
          concepts: [
            'Standard normal',
            'Gaussian integral',
            'Standardisation',
            'Normal quantiles',
            'Mills ratio and tail bounds',
          ],
          explanation: `The **standard normal** density is $\\varphi(z)=\\frac{1}{\\sqrt{2\\pi}}e^{-z^2/2}$. It has no elementary antiderivative, but its total integral does have a closed form. Squaring the integral and moving to polar coordinates gives
$$\\Big(\\int_{-\\infty}^\\infty e^{-z^2/2}\\,dz\\Big)^2=\\int_0^{2\\pi}\\int_0^\\infty e^{-r^2/2}\\,r\\,dr\\,d\\theta=2\\pi.$$
The CDF is written $\\Phi$. By symmetry $E[Z]=0$ and $\\Phi(-z)=1-\\Phi(z)$. Integration by parts gives $E[Z^2]=1$, and in general $E[Z^{2k}]=(2k-1)!!$.

$X\\sim N(\\mu,\\sigma^2)$ means $X=\\mu+\\sigma Z$ for $\\sigma>0$, with density $\\frac{1}{\\sigma}\\varphi((x-\\mu)/\\sigma)$. The second parameter is the variance in this notation, while SciPy's scale and NumPy's normal argument are the standard deviation $\\sigma$. Any non-constant linear function of a normal variable is normal, so every question reduces to $\\Phi$ through **standardisation**: $P(X\\le x)=\\Phi((x-\\mu)/\\sigma)$. About $68.27\\%$, $95.45\\%$ and $99.73\\%$ of the probability lies within 1, 2 and 3 standard deviations of the mean.

Normal variables are common because of the central limit theorem of Module 5, not because of anything special about the quantities being measured. A sum of many small independent effects is close to normal. A product or a maximum of such effects usually is not, so check that the additive story fits before assuming a normal model.

**Worked example.** Let lengths be $X\\sim N(175,8^2)$ in mm. Find three things. First, $P(X>190)$. Standardising gives $z=15/8=1.875$, and $1-\\Phi(1.875)\\approx0.0304$. Second, $P(170<X<185)$:
$$\\Phi(1.25)-\\Phi(-0.625)=0.8944-0.2660\\approx0.6284.$$
Third, the 90th percentile. Since $\\Phi(1.2816)\\approx0.9$, it is $175+1.2816\\times8\\approx185.25$ mm. Always transform the value to a $z$-score before using $\\Phi$, and transform back after using its inverse.

**Tails.** For $x>0$,
$$\\Big(\\frac1x-\\frac1{x^3}\\Big)\\varphi(x)\\le1-\\Phi(x)\\le\\frac{\\varphi(x)}{x}.$$
So the tail falls like $e^{-x^2/2}$, far faster than an exponential. At $x=3$ the bounds are $0.00131$ and $0.00148$, around the true $0.00135$. This is why rare events under normal models look far rarer than they do under heavy-tailed ones, and why a normal model should not be trusted far out in the tail without evidence.`,
          resources: [
            mit18600('The lectures on normal random variables and the De Moivre-Laplace theorem.', true),
            grinsteadSnell('The section on important densities in the chapter on continuous densities.'),
            scipyStats('Use scipy.stats.norm, with its loc and scale arguments, for sf, cdf and ppf.'),
          ],
          exercises: [
            {
              slug: 'normal-moments',
              title: 'Normal moments',
              prompt: `Prove that $E[Z^{n+2}]=(n+1)E[Z^n]$ for $n\\ge0$ and deduce $E[Z^4]=3$ and $E[Z^6]=15$. Then compute $E[|Z|]$ exactly, and find $E[|X-\\mu|]$ for $X\\sim N(\\mu,\\sigma^2)$.`,
              kind: 'derivation',
              difficulty: 1,
              hint: '$E[|Z|]=\\sqrt{2/\\pi}$, and the second answer is $\\sigma\\sqrt{2/\\pi}$.',
            },
            {
              slug: 'mills-ratio',
              title: 'Tail bounds',
              prompt: `For $x>0$ prove the two bounds on $1-\\Phi(x)$ stated in the lesson. Use $\\varphi'(t)=-t\\varphi(t)$ for the upper bound, then integrate by parts for the lower bound. Tabulate both bounds and the true tail at $x=2,3,4$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the upper bound: $1-\\Phi(x)=\\int_x^\\infty\\varphi(t)\\,dt\\le\\int_x^\\infty\\frac{t}{x}\\varphi(t)\\,dt$.',
            },
            {
              slug: 'binary-signalling',
              title: 'Detecting a signal in noise',
              prompt: `A bit $B$ is $\\pm1$ with equal probability, and you observe $Y=B+W$, with $W\\sim N(0,\\sigma^2)$ independent of $B$. (a) Prove $P(B=1\\mid Y=y)=1/(1+e^{-2y/\\sigma^2})$, using densities in Bayes' rule. (b) Deciding by the sign of $Y$, show the error probability is $1-\\Phi(1/\\sigma)$. (c) Find $\\sigma$ giving an error of $10^{-3}$ and check by simulation.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Part (c): $\\sigma\\approx0.3236$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Does $N(0,4)$ have standard deviation 4?',
              answerOutline: 'No. Its variance is 4, and its standard deviation is 2.',
            },
            {
              question: 'Express $P(|X-\\mu|\\le2\\sigma)$ using $\\Phi$.',
              answerOutline: '$2\\Phi(2)-1\\approx0.9545$.',
            },
            {
              question: 'Why can you not evaluate $\\Phi$ by a closed-form antiderivative?',
              answerOutline: '$e^{-z^2/2}$ has no elementary antiderivative, so $\\Phi$ is computed numerically.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/continuous-distributions'],
        },
        {
          slug: 'transformations',
          title: 'Transformations of random variables',
          summary:
            'To find the density of a function of a variable, go through the CDF or use the change-of-variables formula. The inverse CDF turns uniform samples into any distribution.',
          estimatedMinutes: 105,
          objectives: [
            'Find the density of $g(X)$ by the CDF method',
            'Apply the change-of-variables formula, stating its hypotheses',
            'Handle transformations that are not one-to-one',
            'Prove and use the probability integral transform',
          ],
          concepts: [
            'CDF method',
            'Change-of-variables formula',
            'Non-monotone transformations',
            'Probability integral transform',
            'Generalised inverse CDF',
          ],
          explanation: `Given a density for $X$ and a function $g$, how do you find the density of $Y=g(X)$? The dependable method is to go through the CDF: write $P(Y\\le y)$ as a probability about $X$, then differentiate.

If $g$ is differentiable and strictly monotone on an interval containing the values of $X$, with $g'\\ne0$ there, this gives the **change-of-variables formula**
$$f_Y(y)=f_X\\big(g^{-1}(y)\\big)\\,\\Big|\\frac{d}{dy}g^{-1}(y)\\Big|$$
for $y$ in the image of $g$, and $f_Y(y)=0$ elsewhere. The absolute value keeps the density positive when $g$ decreases, and the derivative factor accounts for how $g$ stretches intervals. If $g$ is not one-to-one, add a term for each branch, or use the CDF directly.

**Worked example.** Let $Z$ be standard normal and $Y=Z^2$. The map $z\\mapsto z^2$ is not one-to-one, so use the CDF. For $y>0$,
$$F_Y(y)=P(-\\sqrt y\\le Z\\le\\sqrt y)=2\\Phi(\\sqrt y)-1.$$
Differentiating with the chain rule,
$$f_Y(y)=2\\varphi(\\sqrt y)\\cdot\\frac{1}{2\\sqrt y}=\\frac{1}{\\sqrt{2\\pi y}}\\,e^{-y/2},\\quad y>0.$$
This is the gamma density with shape $\\tfrac12$ and rate $\\tfrac12$, known as chi-square with one degree of freedom. Note the density blows up at $y=0$, which is allowed, and that the factor 2 came from the two branches.

**Probability integral transform.** If $X$ has a continuous CDF $F$, then $F(X)$ is uniform on $(0,1)$. In the other direction, define the generalised inverse $F^{-1}(u)=\\inf\\{x:F(x)\\ge u\\}$. If $U$ is uniform on $(0,1)$, then $F^{-1}(U)$ has CDF $F$, for *every* CDF, because $F^{-1}(u)\\le x$ exactly when $u\\le F(x)$. This is **inverse transform sampling**. For the exponential with rate $\\lambda$, $F^{-1}(u)=-\\ln(1-u)/\\lambda$, so $-\\ln(1-U)/\\lambda$ is an exponential sample.

**Pitfall.** Do not forget the support. If $X$ is uniform on $(-1,2)$ and $Y=X^2$, then $y$ in $(0,1)$ has two preimages but $y$ in $(1,4)$ has only one, so the density has different forms on the two ranges.`,
          resources: [
            pishroNik('The sections on functions of continuous random variables, with the method of transformations.', true),
            blitzsteinHwang('The chapter on transformations, for the change-of-variables formula in one and several dimensions.'),
            {
              title: 'Inverse transform sampling',
              url: 'https://en.wikipedia.org/wiki/Inverse_transform_sampling',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Short statement and examples of the sampling method.',
            },
          ],
          exercises: [
            {
              slug: 'lognormal',
              title: 'The lognormal',
              prompt: `Let $X=e^{Z}$ with $Z$ standard normal. Find the density of $X$ by the change-of-variables formula. Compute $E[X]$ and $\\mathrm{Var}(X)$ by evaluating $E[e^{tZ}]$. Find the median of $X$ and compare it with the mean.`,
              kind: 'problem',
              difficulty: 1,
              hint: '$E[X]=e^{1/2}\\approx1.649$, $\\mathrm{Var}(X)=(e-1)e\\approx4.671$, and the median is 1.',
            },
            {
              slug: 'cauchy-from-angle',
              title: 'The Cauchy distribution',
              prompt: `Let $\\Theta$ be uniform on $(-\\pi/2,\\pi/2)$ and $X=\\tan\\Theta$. Show $X$ has density $\\frac{1}{\\pi(1+x^2)}$. Prove $E[|X|]=\\infty$, so the mean does not exist even though the density is symmetric. Plot running means of $10^6$ samples, and describe how they differ from running means of normal samples.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'two-branches',
              title: 'Branches and supports',
              prompt: `Let $X$ be uniform on $(-1,2)$ and $Y=X^2$. Find the density of $Y$ on $(0,1)$ and on $(1,4)$, and verify that it integrates to 1. Find $P(Y>1)$ two ways.`,
              kind: 'problem',
              difficulty: 1,
              hint: '$f_Y(y)=\\frac{1}{3\\sqrt y}$ on $(0,1)$ and $\\frac{1}{6\\sqrt y}$ on $(1,4)$. $P(Y>1)=1/3$.',
            },
            {
              slug: 'integral-transform-proof',
              title: 'The probability integral transform',
              prompt: `(a) Prove that for every CDF $F$ and every $u\\in(0,1)$ and $x$, $F^{-1}(u)\\le x$ if and only if $u\\le F(x)$, using right-continuity. Deduce that $F^{-1}(U)$ has CDF $F$. (b) Prove that $F(X)$ is uniform when $F$ is continuous. (c) Show by example that (b) fails if $F$ has a jump.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), take $u\\in(0,1)$ and show $P(F(X)\\ge u)=P(X\\ge F^{-1}(u))=1-u$, using continuity to get $F(F^{-1}(u))=u$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there an absolute value in the change-of-variables formula?',
              answerOutline:
                'A decreasing $g$ has a negative derivative, but densities are non-negative. The factor measures length scaling, which is positive.',
            },
            {
              question: 'How would you sample from a distribution with CDF $F(x)=x^3$ on $[0,1]$?',
              answerOutline: 'Take $U$ uniform on $(0,1)$ and return $U^{1/3}$.',
            },
            {
              question: 'What goes wrong with the formula if $g$ is not one-to-one?',
              answerOutline: 'One $y$ has several preimages. You must sum over branches or use the CDF.',
            },
          ],
        },
      ],
    },
    {
      slug: 'joint-distributions',
      title: 'Joint Distributions',
      description:
        'Several variables at once: joint densities, covariance, conditional distributions, conditional expectation as a random variable, sums and order statistics.',
      lessons: [
        {
          slug: 'joint-densities',
          title: 'Joint, marginal and independent',
          summary:
            'A joint density describes several variables together. You integrate out to get marginals, and the Jacobian handles changes of variables.',
          estimatedMinutes: 105,
          objectives: [
            'Compute marginals and probabilities of regions from a joint density',
            'Test independence, including the role of the support',
            'Apply the two-dimensional change-of-variables formula',
          ],
          concepts: [
            'Joint density and joint CDF',
            'Marginal distributions',
            'Independence and factorisation',
            'Support of a joint density',
            'Jacobian change of variables',
          ],
          explanation: `Variables $X,Y$ have **joint density** $f$ if $f\\ge0$, it integrates to 1 over the plane, and
$$P((X,Y)\\in A)=\\iint_A f(x,y)\\,dx\\,dy$$
for reasonable regions $A$. The **marginal** density of $X$ comes from integrating out the other variable: $f_X(x)=\\int f(x,y)\\,dy$. Discrete variables work the same way with sums.

$X$ and $Y$ are **independent** when $f(x,y)=f_X(x)f_Y(y)$ for all $x,y$, except possibly on a set of area zero. A convenient criterion is that the joint density factors as $g(x)h(y)$ on a *product* set $A\\times B$ and is zero elsewhere. The support matters as much as the formula: if the support is not a product set, the variables are dependent, however the formula looks.

**Worked example.** Let $(X,Y)$ be uniform on the triangle $0<x<y<1$. The area is $\\tfrac12$, so $f=2$ on the triangle. For the marginals, fix $x$ and integrate over the allowed $y$:
$$f_X(x)=\\int_x^1 2\\,dy=2(1-x),\\qquad f_Y(y)=\\int_0^y 2\\,dx=2y.$$
Their product is not 2, and the support is not a rectangle, so they are dependent: knowing $Y=y$ forces $X<y$. For $P(X+Y<1)$, the region inside the triangle has $x$ from 0 to $\\tfrac12$ and $y$ from $x$ to $1-x$, so
$$\\int_0^{1/2}\\int_x^{1-x}2\\,dy\\,dx=\\int_0^{1/2}2(1-2x)\\,dx=\\tfrac12.$$
Drawing the region first is what makes the limits right. Almost every error in this lesson is a wrong limit of integration.

**Change of variables.** Let $(U,V)=T(X,Y)$, where $T$ is one-to-one and continuously differentiable on an open set containing the support, with inverse $(x,y)=T^{-1}(u,v)$ and non-zero Jacobian. Then
$$f_{U,V}(u,v)=f_{X,Y}(x(u,v),y(u,v))\\,\\Big|\\det\\frac{\\partial(x,y)}{\\partial(u,v)}\\Big|$$
on the image of $T$. To get the density of a single function such as $X+Y$, invent a convenient second variable, transform, then integrate it out.

The polar substitution in the Gaussian integral is an example of this, with Jacobian $r$. The factor $r$ is why the density of a radius is not flat, and it is also what makes the Box-Muller method work.`,
          resources: [
            mit18600('The lectures on joint distributions and on sums and independence.', true),
            grinsteadSnell('The sections on joint distributions and independence in the chapter on continuous densities.'),
          ],
          exercises: [
            {
              slug: 'product-criterion',
              title: 'Factorisation and support',
              prompt: `(a) Prove: if $f(x,y)=g(x)h(y)$ on $A\\times B$ and is zero elsewhere, then $X$ and $Y$ are independent. (b) Consider $f(x,y)=8xy$ on $0<x<y<1$. Show it is a density, find both marginals, and show $X$ and $Y$ are dependent even though the formula looks like a product.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'Marginals: $f_X(x)=4x(1-x^2)$ and $f_Y(y)=4y^3$.',
            },
            {
              slug: 'exponential-ratio',
              title: 'Sum and ratio of exponentials',
              prompt: `Let $X,Y$ be independent exponential with rate $\\lambda$. Let $U=X+Y$ and $V=X/(X+Y)$. Use the Jacobian formula to prove $U$ is gamma with shape 2 and rate $\\lambda$, $V$ is uniform on $(0,1)$, and $U$ and $V$ are independent.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'The inverse is $x=uv$, $y=u(1-v)$, with Jacobian determinant of absolute value $u$.',
            },
            {
              slug: 'box-muller',
              title: 'Box-Muller',
              prompt: `Let $E$ be exponential with rate $\\tfrac12$ and $\\Theta$ uniform on $(0,2\\pi)$, independent. Put $X=\\sqrt E\\cos\\Theta$ and $Y=\\sqrt E\\sin\\Theta$. Prove that $X,Y$ are independent standard normals. Implement it and compare sample moments and quantiles with the normal.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'buffon-needle',
              title: 'Buffon\'s needle',
              prompt: `A needle of length $\\ell$ falls on a floor with parallel lines spaced $d\\ge\\ell$ apart. Model the distance from its centre to the nearest line as uniform on $(0,d/2)$, and the acute angle with the lines as uniform on $(0,\\pi/2)$, independent. Prove $P(\\text{crossing})=2\\ell/(\\pi d)$. Simulate this to estimate $\\pi$, and find how many drops are needed for a standard error of $0.001$ when $\\ell=d$.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'With $p=2/\\pi$ and estimator $\\hat\\pi=2/\\hat p$, the delta method gives a standard error of about $\\pi\\sqrt{(1-p)/(pn)}$, so about $5.6\\times10^6$ drops.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $f(x,y)=2$ on a triangle not a product density?',
              answerOutline: 'The support is not a product set, so the range of $X$ depends on $Y$.',
            },
            {
              question: 'How do you get $P(X<Y)$ from a joint density?',
              answerOutline: 'Integrate $f$ over the region $\\{x<y\\}$.',
            },
            {
              question: 'What does the Jacobian measure?',
              answerOutline: 'The local factor by which the map scales area, which densities must absorb.',
            },
          ],
          relatedLessons: ['math-methods/multivariable-calculus/coordinate-systems-and-jacobians'],
        },
        {
          slug: 'covariance-and-correlation',
          title: 'Covariance and correlation',
          summary:
            'Covariance measures linear dependence. Bilinearity gives the variance of any sum, and the Cauchy-Schwarz inequality bounds correlation by 1.',
          estimatedMinutes: 90,
          objectives: [
            'Compute covariance and use bilinearity',
            'Find the variance of a sum of dependent variables',
            'Prove $|\\rho|\\le1$ and characterise equality',
            'Explain why uncorrelated does not imply independent',
          ],
          concepts: [
            'Covariance',
            'Bilinearity',
            'Correlation coefficient',
            'Cauchy-Schwarz inequality',
            'Covariance matrix',
          ],
          explanation: `The **covariance** of $X$ and $Y$ with finite second moments is
$$\\mathrm{Cov}(X,Y)=E[(X-\\mu_X)(Y-\\mu_Y)]=E[XY]-E[X]E[Y].$$
Covariance is symmetric and bilinear, and $\\mathrm{Cov}(X,X)=\\mathrm{Var}(X)$. Bilinearity gives the general rule
$$\\mathrm{Var}\\Big(\\sum_i a_iX_i\\Big)=\\sum_i\\sum_j a_ia_j\\,\\mathrm{Cov}(X_i,X_j)=a^T\\Sigma a,$$
where $\\Sigma$ is the **covariance matrix**. A variance cannot be negative, so $\\Sigma$ is positive semidefinite. Here is one consequence. If $n$ variables share a variance $\\sigma^2$ and a pairwise correlation $\\rho$, then $\\mathrm{Var}(\\bar X_n)=\\sigma^2(1+(n-1)\\rho)/n$, which tends to $\\rho\\sigma^2$ and not to 0. Averaging cannot remove an error that all the measurements share.

Covariance carries the units of $X$ times the units of $Y$, so its size alone means little: changing metres to millimetres multiplies it by 1000. The **correlation** $\\rho=\\mathrm{Cov}(X,Y)/(\\sigma_X\\sigma_Y)$, defined for positive variances, does not change with units. The Cauchy-Schwarz inequality $E[XY]^2\\le E[X^2]E[Y^2]$ gives $|\\rho|\\le1$, and $|\\rho|=1$ exactly when $Y=aX+b$ with probability 1. To prove the inequality, use that $E[(tX+Y)^2]\\ge0$ for every $t$, so this quadratic in $t$ has non-positive discriminant.

**Worked example.** Take the uniform distribution on the triangle $0<x<y<1$, with density 2. You already have the marginals $2(1-x)$ and $2y$, which give
$$E[X]=\\tfrac13,\\quad E[Y]=\\tfrac23,\\quad E[X^2]=\\tfrac16,\\quad E[Y^2]=\\tfrac12.$$
So $\\mathrm{Var}(X)=\\tfrac16-\\tfrac19=\\tfrac1{18}$, and likewise $\\mathrm{Var}(Y)=\\tfrac1{18}$. The cross term needs the joint density:
$$E[XY]=\\int_0^1\\int_0^y2xy\\,dx\\,dy=\\int_0^1y^3\\,dy=\\tfrac14.$$
Then $\\mathrm{Cov}(X,Y)=\\tfrac14-\\tfrac29=\\tfrac1{36}$, and
$$\\rho=\\frac{1/36}{1/18}=\\tfrac12.$$
These are the minimum and maximum of two independent uniforms, so the positive correlation makes sense: a large minimum forces a large maximum.

**Uncorrelated is weaker than independent.** Independence implies $\\mathrm{Cov}(X,Y)=0$, given finite second moments, but the converse fails. If $X$ is uniform on $(-1,1)$ and $Y=X^2$, then $\\mathrm{Cov}(X,Y)=E[X^3]-0=0$, yet $Y$ is a function of $X$. Correlation detects only the linear part of a relationship. Variances of sums add for uncorrelated variables, so that weaker property is all the rule needs.`,
          resources: [
            blitzsteinHwang('The chapter on joint distributions has sections on covariance and correlation.', true),
            mit6041('The lecture on covariance and iterated expectations.'),
            {
              title: 'Seeing Theory',
              url: 'https://seeing-theory.brown.edu/',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'The Basic Probability chapter has visual sections on expectation and variance.',
            },
          ],
          exercises: [
            {
              slug: 'cauchy-schwarz-proof',
              title: 'Cauchy-Schwarz and equality',
              prompt: `Assume $E[X^2]$ and $E[Y^2]$ are finite and positive. Prove $E[XY]^2\\le E[X^2]E[Y^2]$. Then prove that $|\\rho(X,Y)|=1$ if and only if $Y=aX+b$ with probability 1 for constants $a\\ne0$ and $b$, and that the sign of $\\rho$ equals the sign of $a$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Equality needs $E[(tX+Y)^2]=0$ for some $t$, and a non-negative variable with mean 0 is 0 with probability 1. Apply this to centred variables.',
            },
            {
              slug: 'min-max-dice',
              title: 'Minimum and maximum of two dice',
              prompt: `Roll two fair dice, and let $U$ be the smaller value and $V$ the larger. Find $E[U]$, $E[V]$ and $\\mathrm{Cov}(U,V)$ exactly. Use the fact that $UV$ equals the product of the two rolls to save work.`,
              kind: 'problem',
              difficulty: 2,
              hint: '$E[U]=91/36$, $E[V]=161/36$, and $\\mathrm{Cov}(U,V)=1225/1296$.',
            },
            {
              slug: 'unit-disk',
              title: 'Uniform on a disk',
              prompt: `Let $(X,Y)$ be uniform on the unit disk. Show that $\\mathrm{Cov}(X,Y)=0$ by symmetry. Find the marginal density of $X$, then prove $X$ and $Y$ are not independent.`,
              kind: 'derivation',
              difficulty: 1,
              hint: '$f_X(x)=\\frac{2}{\\pi}\\sqrt{1-x^2}$ on $(-1,1)$. Compare $P(X>0.8,Y>0.8)$ with the product of marginals.',
            },
            {
              slug: 'minimum-variance-mix',
              title: 'The minimum-variance mixture',
              prompt: `Let $X,Y$ have standard deviations $\\sigma_X,\\sigma_Y>0$ and correlation $\\rho$, and assume they are not perfectly correlated. Find the weight $w$ minimising $\\mathrm{Var}(wX+(1-w)Y)$. Evaluate for $\\sigma_X=0.2$, $\\sigma_Y=0.3$, $\\rho=0.25$, and give the resulting standard deviation.`,
              kind: 'problem',
              difficulty: 2,
              hint: '$w^*=\\dfrac{\\sigma_Y^2-\\rho\\sigma_X\\sigma_Y}{\\sigma_X^2+\\sigma_Y^2-2\\rho\\sigma_X\\sigma_Y}=0.75$, with standard deviation about $0.1837$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\mathrm{Var}(X-Y)$?',
              answerOutline: '$\\mathrm{Var}(X)+\\mathrm{Var}(Y)-2\\mathrm{Cov}(X,Y)$.',
            },
            {
              question: 'Does zero correlation imply independence?',
              answerOutline: 'No. For example, $X$ symmetric about 0 and $Y=X^2$, with a finite fourth moment.',
            },
            {
              question: 'What does a correlation of $-1$ mean?',
              answerOutline: '$Y=aX+b$ with probability 1 for some $a<0$.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/joint-distributions-and-covariance'],
        },
        {
          slug: 'conditional-distributions',
          title: 'Conditional distributions',
          summary:
            'Conditional densities extend conditioning to events of probability zero. Bayes\' rule for densities and the bivariate normal are the key examples.',
          estimatedMinutes: 95,
          objectives: [
            'Define conditional mass functions and densities',
            'Update a continuous prior from discrete data',
            'State the conditional distribution of a bivariate normal',
            'Distinguish jointly normal variables from variables with normal marginals',
          ],
          concepts: [
            'Conditional density',
            'Conditioning on an event of probability zero',
            'Beta-binomial updating',
            'Bivariate normal',
            'Regression to the mean',
          ],
          explanation: `For $f_Y(y)>0$, the **conditional density** of $X$ given $Y=y$ is
$$f_{X\\mid Y}(x\\mid y)=\\frac{f(x,y)}{f_Y(y)}.$$
$P(Y=y)=0$ for continuous $Y$, so this cannot come from the elementary definition. It is a limit of conditioning on $y<Y<y+\\Delta y$, and it should be read as a family of densities in $x$, one for each $y$. Only the family as a whole is meaningful, since conditioning on a zero-probability event depends on the limiting procedure.

Bayes' rule carries over: the posterior density is proportional to prior density times likelihood. The same pattern works when one variable is discrete and the other continuous.

**Worked example.** A coin has unknown heads probability $P$, with uniform prior on $(0,1)$. You toss it 10 times and see 7 heads. Given $P=p$, the data have probability $\\binom{10}{7}p^7(1-p)^3$, so the posterior density is proportional to $p^7(1-p)^3$ on $(0,1)$. That is Beta(8, 4). The constant does not need to be computed, because the beta family supplies it. The posterior mean is
$$E[P\\mid\\text{data}]=\\frac{8}{8+4}=\\frac23.$$
The chance that the next toss is heads is the same quantity, by total probability, integrating over the posterior. It is shrunk from the raw fraction $0.7$ towards the prior mean $\\tfrac12$. With 700 heads in 1000 tosses the posterior mean would be $701/1002\\approx0.6996$, so the prior's influence fades as data accumulate.

**The bivariate normal.** Let $X,Y$ be jointly normal with means $\\mu_X,\\mu_Y$, standard deviations $\\sigma_X,\\sigma_Y>0$ and correlation $|\\rho|<1$. Then
$$Y\\mid X=x\\ \\sim\\ N\\Big(\\mu_Y+\\rho\\frac{\\sigma_Y}{\\sigma_X}(x-\\mu_X),\\ \\sigma_Y^2(1-\\rho^2)\\Big).$$
The conditional mean is linear in $x$, and the conditional variance does not depend on $x$ at all. When $|\\rho|<1$ the conditional mean sits fewer standard deviations from its mean than $x$ does, which is **regression to the mean**. For jointly normal variables, $\\rho=0$ implies independence.

**Pitfall.** Joint normality is more than normal marginals. The rule "uncorrelated implies independent" needs the pair to be jointly normal, and it is false otherwise.`,
          resources: [
            blitzsteinHwang('The chapters on joint distributions and on the beta distribution, including conjugacy.', true),
            pishroNik('The section on the bivariate normal distribution, with worked conditional calculations.'),
          ],
          exercises: [
            {
              slug: 'triangle-conditional',
              title: 'Conditionals on the triangle',
              prompt: `For the uniform density on $0<x<y<1$, find $f_{X\\mid Y}(x\\mid y)$ and $f_{Y\\mid X}(y\\mid x)$. Identify each as a named distribution. Compute $E[X\\mid Y=y]$ and $E[Y\\mid X=x]$ and verify each against $E[X]$ and $E[Y]$ by integrating.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Both are uniform: $X\\mid Y=y$ on $(0,y)$, and $Y\\mid X=x$ on $(x,1)$.',
            },
            {
              slug: 'bivariate-normal-conditional',
              title: 'The conditional normal',
              prompt: `(a) Starting from the bivariate normal density with zero means and unit variances, complete the square in $y$ to derive $Y\\mid X=x\\sim N(\\rho x,1-\\rho^2)$. (b) Heights of parent and child are jointly normal with both means 175, both standard deviations 7 and $\\rho=0.5$. Given a parent of height 190, find the conditional mean and standard deviation for the child and the probability the child is taller than 190. Check by simulation.`,
              kind: 'derivation',
              difficulty: 2,
              hint: '(b) Mean $182.5$, standard deviation about $6.062$, probability about $0.108$.',
            },
            {
              slug: 'uniform-count',
              title: 'A surprising uniform count',
              prompt: `Let $P$ be uniform on $(0,1)$ and, given $P=p$, let $X\\sim$ Bin($n,p$). Prove that $P(X=k)=\\frac{1}{n+1}$ for each $k=0,\\dots,n$, using the beta integral. Then give a direct argument: throw $n+1$ uniform points on $(0,1)$, and think of the first point as $P$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'normal-marginals-not-joint',
              title: 'Normal marginals are not enough',
              prompt: `Let $Z$ be standard normal and $S=\\pm1$ with equal probability, independent of $Z$. Put $Y=SZ$. (a) Show $Y$ is standard normal and $\\mathrm{Cov}(Z,Y)=0$. (b) Show $Z$ and $Y$ are not independent. (c) Show $Z+Y$ is not normal.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (b), note $|Y|=|Z|$. For (c), find $P(Z+Y=0)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the posterior after 3 heads in 5 tosses with a Beta(2, 2) prior?',
              answerOutline: 'Beta(5, 4), with mean $5/9$.',
            },
            {
              question: 'In a bivariate normal, how does the conditional variance of $Y$ depend on $x$?',
              answerOutline: 'It does not. It is $\\sigma_Y^2(1-\\rho^2)$ for every $x$.',
            },
            {
              question: 'Why does $f_{X\\mid Y}$ not contradict $P(Y=y)=0$?',
              answerOutline: 'It is defined as a ratio of densities and arises as a limit, not from the event formula.',
            },
          ],
          relatedLessons: ['probability-statistics/bayesian-inference-and-mcmc/bayesian-updating-and-priors'],
        },
        {
          slug: 'conditional-expectation',
          title: 'Conditional expectation',
          summary:
            '$E[X\\mid Y]$ is itself a random variable. The tower property, the law of total variance and random sums all follow from treating it that way.',
          estimatedMinutes: 110,
          objectives: [
            'Explain $E[X\\mid Y]$ as a random variable and compute it',
            'Prove and apply the tower property',
            'Use the law of total variance',
            'Find the mean and variance of a random sum',
          ],
          concepts: [
            'Conditional expectation as a random variable',
            'Tower property',
            'Taking out what is known',
            'Law of total variance',
            'Random sums (Wald\'s identity)',
            'Best mean-square predictor',
          ],
          explanation: `For each value $y$, $E[X\\mid Y=y]$ is a number, the mean of the conditional distribution. Call it $g(y)$. Then **$E[X\\mid Y]$ is the random variable $g(Y)$**: you do not know its value until you see $Y$.

Its key properties, assuming $E[|X|]<\\infty$ and in the last case that $E[|h(Y)X|]<\\infty$ too:

- **Tower property:** $E\\big[E[X\\mid Y]\\big]=E[X]$.
- **Taking out what is known:** $E[h(Y)X\\mid Y]=h(Y)E[X\\mid Y]$.

The tower property is the law of total probability for expectations: to average $X$, first average within each level of $Y$, then average over the levels.

If $E[X^2]<\\infty$, then $g(Y)=E[X\\mid Y]$ is also the best predictor of $X$ from $Y$, in that it minimises $E[(X-h(Y))^2]$ over all functions $h$. Geometrically, it is an orthogonal projection.

The **law of total variance** splits the variance into two parts:
$$\\mathrm{Var}(X)=E\\big[\\mathrm{Var}(X\\mid Y)\\big]+\\mathrm{Var}\\big(E[X\\mid Y]\\big).$$
The first term is the spread within groups, and the second the spread between group means.

**Worked example.** Claims arrive in a year: $N\\sim$ Poisson(3), and sizes $X_1,X_2,\\dots$ are i.i.d. exponential with mean 2, independent of $N$. Let $S=\\sum_{i=1}^NX_i$, with $S=0$ when $N=0$. Condition on $N$. Given $N=n$, independence gives $E[S\\mid N=n]=2n$ and $\\mathrm{Var}(S\\mid N=n)=4n$, because an exponential with mean 2 has variance 4. So $E[S\\mid N]=2N$ and $\\mathrm{Var}(S\\mid N)=4N$. Then
$$E[S]=E[2N]=6,$$
$$\\mathrm{Var}(S)=E[4N]+\\mathrm{Var}(2N)=12+4\\cdot3=24.$$
The standard deviation is about $4.90$. Note that the randomness of $N$ contributes half of the total variance. Treating $N$ as fixed at its mean would give only 12.

In general, with $N$ independent of the i.i.d. $X_i$,
$$E[S]=E[N]E[X],\\qquad\\mathrm{Var}(S)=E[N]\\mathrm{Var}(X)+\\mathrm{Var}(N)E[X]^2.$$

**Pitfall.** The independence of $N$ from the $X_i$ matters. If you stop summing based on the values seen, this form of the argument does not apply as it stands. Wald's identity for stopping times needs its own hypotheses.`,
          resources: [
            blitzsteinHwang('The chapter on conditional expectation, including Adam\'s and Eve\'s laws.', true),
            mit6041('The lecture on iterated expectations and random sums, with recitation problems.'),
            mit18600('The lectures on conditional expectation.'),
          ],
          exercises: [
            {
              slug: 'tower-proof',
              title: 'Proving the tower property',
              prompt: `Prove $E[E[X\\mid Y]]=E[X]$, first for discrete $(X,Y)$ and then for a joint density, assuming $E[|X|]<\\infty$. State where you use Fubini's theorem. Then prove the law of total variance from the tower property.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Start the variance proof from $\\mathrm{Var}(X\\mid Y)=E[X^2\\mid Y]-E[X\\mid Y]^2$.',
            },
            {
              slug: 'best-predictor',
              title: 'The best predictor',
              prompt: `Assume $E[X^2]<\\infty$ and $E[h(Y)^2]<\\infty$. Prove that $E[(X-h(Y))^2]=E[(X-g(Y))^2]+E[(g(Y)-h(Y))^2]$, where $g(Y)=E[X\\mid Y]$. Conclude that $g$ is the best predictor. Explain the identity as Pythagoras' theorem.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Show that the cross term vanishes by conditioning on $Y$ and taking out what is known.',
            },
            {
              slug: 'patterns-in-tosses',
              title: 'Waiting for a pattern',
              prompt: `Toss a fair coin until a pattern appears. (a) Use first-step analysis to show the expected number of tosses is 6 for HH and 4 for HT. (b) Explain in words why these differ, though each pattern has probability $\\tfrac14$ at any given position. (c) Simulate to confirm.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'total-variance-check',
              title: 'Total variance checks a known answer',
              prompt: `Let $P$ be uniform on $(0,1)$ and $X\\mid P=p\\sim$ Bin($n,p$). Use the tower property and the law of total variance to find $E[X]$ and $\\mathrm{Var}(X)$. Check the result against the discrete uniform distribution on $\\{0,\\dots,n\\}$, and evaluate for $n=10$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '$E[X]=n/2$ and $\\mathrm{Var}(X)=n(n+2)/12$, which is 10 at $n=10$.',
            },
            {
              slug: 'random-sum-variance',
              title: 'Variance of a random sum',
              prompt: `Prove the formula for $\\mathrm{Var}(S)$ for a random sum, stating every use of independence. Then take $N$ geometric with parameter $p$ on $\\{1,2,\\dots\\}$ and $X_i$ exponential with rate $\\lambda$. Show from generating functions or by conditioning that $S$ is exponential with rate $p\\lambda$, and confirm that the variance formula gives $1/(p\\lambda)^2$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What kind of object is $E[X\\mid Y]$?',
              answerOutline: 'A random variable, namely a function of $Y$.',
            },
            {
              question: 'What is $E[XY\\mid Y]$?',
              answerOutline: '$Y\\,E[X\\mid Y]$, given the required moments exist.',
            },
            {
              question: 'Interpret the two terms of the law of total variance.',
              answerOutline: 'Average variance within groups, plus the variance of the group means.',
            },
          ],
        },
        {
          slug: 'sums-and-order-statistics',
          title: 'Sums and order statistics',
          summary:
            'Convolution gives the distribution of a sum. Order statistics describe the sorted sample, and exponential races have a clean solution.',
          estimatedMinutes: 105,
          objectives: [
            'Compute densities of sums by convolution',
            'Prove closure of normal and gamma families under independent sums',
            'Derive the distributions of order statistics',
            'Solve races between independent exponential variables',
          ],
          concepts: [
            'Convolution',
            'Closure under sums',
            'Order statistics',
            'Minimum and maximum',
            'Exponential races',
          ],
          explanation: `If $X$ and $Y$ are independent with densities, the density of $X+Y$ is the **convolution**
$$f_{X+Y}(z)=\\int_{-\\infty}^\\infty f_X(x)\\,f_Y(z-x)\\,dx.$$
Intuitively, you add up all the ways to split $z$ into $x$ and $z-x$. The discrete version is $P(X+Y=z)=\\sum_xP(X=x)P(Y=z-x)$, which is the sum hidden inside a product of generating functions. For a sum of independent gamma variables with the same rate, the shapes add. For independent normals, means and variances both add. Different rates break the gamma rule.

**Worked example.** Let $X,Y$ be independent and uniform on $(0,1)$. The integrand is 1 when $0<x<1$ and $0<z-x<1$, which means $\\max(0,z-1)<x<\\min(1,z)$. So $f_{X+Y}(z)$ is the length of that interval:
$$f_{X+Y}(z)=\\begin{cases}z,&0<z\\le1,\\\\2-z,&1<z<2,\\end{cases}$$
and 0 elsewhere. This is a triangle with area 1. So $P(X+Y>1.5)=\\tfrac12\\cdot\\tfrac12\\cdot\\tfrac12=\\tfrac18$, by the area of a small triangle. Notice how limits come from the supports, not from a formula you can write down without thinking.

**Order statistics.** Sort an i.i.d. sample $X_1,\\dots,X_n$ into $X_{(1)}\\le\\dots\\le X_{(n)}$. With CDF $F$, the extremes have simple CDFs:
$$P(X_{(n)}\\le x)=F(x)^n,\\qquad P(X_{(1)}>x)=(1-F(x))^n.$$
The maximum goes through the CDF and the minimum through the survival function, because "all below $x$" and "all above $x$" are intersections of independent events. With density $f$, the $k$-th order statistic has density
$$f_{(k)}(x)=\\frac{n!}{(k-1)!\\,(n-k)!}\\,F(x)^{k-1}(1-F(x))^{n-k}f(x).$$
For this formula, one sample point must land near $x$, with $k-1$ below and $n-k$ above, and the coefficient counts the assignments. For uniforms, $U_{(k)}\\sim$ Beta($k,n-k+1$).

**Exponential races.** Let $T_1,\\dots,T_n$ be independent exponentials with rates $\\lambda_1,\\dots,\\lambda_n$. Then $\\min_iT_i$ is exponential with rate $\\lambda=\\sum_i\\lambda_i$, because $P(\\min_iT_i>t)=\\prod_ie^{-\\lambda_it}=e^{-\\lambda t}$. Also $P(T_i\\text{ is smallest})=\\lambda_i/\\lambda$, and which one wins is independent of when it happens. This fact is the basis of continuous-time Markov chains.`,
          resources: [
            grinsteadSnell('The chapter on sums of independent random variables, for discrete and continuous convolution.', true),
            blitzsteinHwang('The sections on convolutions and order statistics.'),
          ],
          exercises: [
            {
              slug: 'normal-sum',
              title: 'Sum of independent normals',
              prompt: `Prove by the convolution integral, completing the square, that if $X\\sim N(\\mu_1,\\sigma_1^2)$ and $Y\\sim N(\\mu_2,\\sigma_2^2)$ are independent, then $X+Y\\sim N(\\mu_1+\\mu_2,\\sigma_1^2+\\sigma_2^2)$. Reduce to mean 0 first.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gamma-sum',
              title: 'Sum of independent gammas',
              prompt: `Prove that a sum of independent gamma variables with shapes $a,b$ and the same rate $\\lambda$ is gamma with shape $a+b$ and rate $\\lambda$. Use the substitution $x=zt$ and recognise the beta integral. Deduce that a sum of $n$ independent exponentials with rate $\\lambda$ is gamma with shape $n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'exponential-race',
              title: 'A race among three servers',
              prompt: `Three servers finish at independent exponential times with rates 1, 2, 3 per minute. Find (a) the probability that server 3 finishes first, (b) the expected time to the first finish, (c) the expected time until all have finished, by inclusion-exclusion on the maximum. Confirm by simulation.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $1/2$. (b) $1/6$. (c) $73/60$.',
            },
            {
              slug: 'uniform-median',
              title: 'Sample median of uniforms',
              prompt: `Derive the density of $U_{(k)}$ for $n$ i.i.d. uniforms and identify it as a beta. For $n=5$, find the mean and variance of the sample median exactly. Compare the variance with that of the sample mean of 5 uniforms.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The median is Beta(3, 3), with variance $1/28$, against $1/60$ for the sample mean.',
            },
            {
              slug: 'sums-past-one',
              title: 'How many uniforms to exceed 1?',
              prompt: `Add independent uniforms on $(0,1)$ until the total exceeds 1. Let $N$ be the number used. Prove by induction that $P(U_1+\\dots+U_n\\le t)=t^n/n!$ for $0\\le t\\le1$. Deduce $E[N]=e$, and find $\\mathrm{Var}(N)$. Confirm both by simulation.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use $E[N]=\\sum_{n\\ge0}P(N>n)$ and $P(N>n)=1/n!$. $\\mathrm{Var}(N)=3e-e^2\\approx0.7658$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Is a sum of two independent exponentials with different rates gamma?',
              answerOutline: 'No. The gamma rule needs equal rates, and this sum is hypoexponential.',
            },
            {
              question: 'What is the distribution of the maximum of $n$ i.i.d. uniforms on $(0,1)$?',
              answerOutline: 'CDF $x^n$ on $(0,1)$, which is Beta($n$, 1).',
            },
            {
              question: 'Why does the convolution need independence?',
              answerOutline: 'The joint density of $(X,Y)$ must factor as $f_Xf_Y$ for the integrand to take that form.',
            },
          ],
        },
      ],
      project: {
        slug: 'compound-sums-lab',
        title: 'Exact and simulated compound sums',
        description: `An insurer's yearly total $S=\\sum_{i=1}^NX_i$ has a compound Poisson distribution, with $N\\sim$ Poisson($\\lambda$) and integer claim sizes with mass function $p_1,p_2,\\dots$ on the positive integers. Since $N$ is random, there is no simple closed form for the mass function of $S$. You will compute it exactly with the Panjer recursion
$$P(S=k)=\\frac{\\lambda}{k}\\sum_{j\\ge1}j\\,p_j\\,P(S=k-j),\\qquad P(S=0)=e^{-\\lambda},$$
and compare it with Monte Carlo and with normal approximation.

Start by deriving the recursion. Differentiate the generating function $G_S(s)=\\exp(\\lambda(G_X(s)-1))$, and match coefficients. Use the test case $\\lambda=3$ with claims uniform on $\\{1,2,3\\}$: here $E[S]=6$, $\\mathrm{Var}(S)=14$, $P(S=0)=e^{-3}$, $P(S=1)=e^{-3}$ and $P(S=2)=\\tfrac32e^{-3}$.

Then study the stop-loss premium $E[(S-d)_+]$, the expected amount above a deductible $d$. This is the price of reinsurance, and small tail errors change it a lot.`,
        deliverables: [
          'A written derivation of the recursion from the generating function',
          'A tested implementation that reproduces the five test values above and whose mass function sums to 1 within $10^{-10}$',
          'A simulation with $10^6$ draws, and a plot comparing the simulated and exact mass functions, with standard errors',
          'A check of $E[S]$ and $\\mathrm{Var}(S)$ from the exact mass function against the random-sum formulas',
          'A table of $E[(S-d)_+]$ for $d=6,10,14$, computed exactly, by simulation and by the normal approximation, with a paragraph on where the normal approximation fails',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Compute the same distribution with a fast Fourier transform of the generating function, and compare accuracy and speed',
          'Replace Poisson by a negative binomial count, and derive and test the corresponding recursion',
        ],
      },
    },
    {
      slug: 'limit-theorems',
      title: 'Inequalities and Limit Theorems',
      description:
        'Tail bounds, modes of convergence, the laws of large numbers, moment generating functions and the central limit theorem, with its hypotheses and its limits.',
      lessons: [
        {
          slug: 'probability-inequalities',
          title: 'Markov, Chebyshev, Chernoff and Jensen',
          summary:
            'A few moments control how far a variable can stray. The stronger the assumption, the sharper the bound.',
          estimatedMinutes: 95,
          objectives: [
            'Prove and apply Markov\'s and Chebyshev\'s inequalities',
            'Derive Chernoff bounds by optimising over the exponent',
            'Prove Jensen\'s inequality and use it',
            'Compare bounds with exact tail probabilities',
          ],
          concepts: [
            'Markov\'s inequality',
            'Chebyshev\'s inequality',
            'Chernoff bound',
            'Hoeffding\'s inequality',
            'Jensen\'s inequality',
          ],
          explanation: `**Markov's inequality.** If $X\\ge0$ and $a>0$, then $P(X\\ge a)\\le E[X]/a$. The proof is one line: $a\\,I_{\\{X\\ge a\\}}\\le X$, then take expectations.

Everything else here comes from applying Markov to a function of $X$.

**Chebyshev's inequality.** If $X$ has mean $\\mu$ and finite variance $\\sigma^2$, then for $k>0$,
$$P(|X-\\mu|\\ge k)\\le\\frac{\\sigma^2}{k^2}.$$
Apply Markov to $(X-\\mu)^2$ at level $k^2$.

**Chernoff's bound.** For any $t>0$ with finite moment generating function $M(t)=E[e^{tX}]$,
$$P(X\\ge a)=P(e^{tX}\\ge e^{ta})\\le e^{-ta}M(t).$$
You then pick the $t$ that makes this smallest. For sums of independent variables, $M$ factors, so the bound decays exponentially in $n$. In the same family, **Hoeffding's inequality** says that for independent $X_i$ in $[0,1]$ with sample mean $\\bar X_n$ and mean $\\mu=E[\\bar X_n]$, and $\\varepsilon>0$,
$$P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\le2e^{-2n\\varepsilon^2}.$$

**Jensen's inequality.** If $\\varphi$ is convex on an interval containing the values of $X$, and $X$ and $\\varphi(X)$ have finite expectations, then $\\varphi(E[X])\\le E[\\varphi(X)]$. Taking $\\varphi(x)=x^2$ recovers $\\mathrm{Var}(X)\\ge0$. The proof uses a line of support at $E[X]$.

**Worked example.** Let $X\\sim$ Bin(100, 1/2), so $\\mu=50$, $\\sigma^2=25$. Bound $P(X\\ge70)$ in three ways.

- Markov: $50/70\\approx0.714$.
- Chebyshev: $P(|X-50|\\ge20)\\le25/400=0.0625$. By symmetry the one-sided tail is at most half of that, $0.03125$.
- Chernoff: $M(t)=(\\tfrac12+\\tfrac12e^t)^{100}$. Minimising $e^{-70t}M(t)$ gives $e^t=7/3$, and the bound $e^{-100D}$ with $D=0.7\\ln1.4+0.3\\ln0.6\\approx0.0823$, which is about $2.67\\times10^{-4}$.

The exact value is about $3.93\\times10^{-5}$. Each bound uses more information, and each is much tighter than the last. Chernoff is within a factor of 7, while Markov knows only the mean and cannot do better than a constant.

**Pitfall.** These are upper bounds, valid for all distributions meeting the hypotheses. They can be far from the truth for a specific one, and Chernoff requires a finite $M(t)$ for some $t>0$.`,
          resources: [
            blitzsteinHwang('The chapter on inequalities and limit theorems proves these results in order.', true),
            mit18600('The lectures on weak and strong laws cover Markov and Chebyshev.'),
            {
              title: 'Chernoff bound',
              url: 'https://en.wikipedia.org/wiki/Chernoff_bound',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Generic form and multiplicative versions for sums of Bernoulli variables.',
            },
          ],
          exercises: [
            {
              slug: 'markov-is-tight',
              title: 'Markov and Chebyshev are tight',
              prompt: `Prove Markov's and Chebyshev's inequalities. Then, for given $0<m\\le a$, construct $X\\ge0$ with $E[X]=m$ and $P(X\\ge a)=m/a$ exactly. For given $k\\geq\\sigma>0$, construct $X$ with mean 0 and variance $\\sigma^2$ and $P(|X|\\ge k)=\\sigma^2/k^2$ exactly.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use a variable with at most three values. For Chebyshev, put probability $\\sigma^2/(2k^2)$ at each of $\\pm k$.',
            },
            {
              slug: 'jensen-applications',
              title: 'Jensen in action',
              prompt: `Prove Jensen's inequality using a supporting line at $E[X]$. Use it to prove (a) $E[1/X]\\ge1/E[X]$ for $X>0$ with the expectations finite, (b) the arithmetic mean-geometric mean inequality, and (c) that $E[\\ln(1/p(X))]\\le\\ln n$ for $X$ with mass function $p$ on $n$ points.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'chernoff-binomial',
              title: 'Chernoff for the binomial',
              prompt: `For $X\\sim$ Bin($n,p$) and $p<a<1$, prove $P(X\\ge an)\\le e^{-nD(a\\|p)}$, where $D(a\\|p)=a\\ln\\frac ap+(1-a)\\ln\\frac{1-a}{1-p}$. Identify the optimal $t$, and reproduce the numbers in the worked example.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Optimal $e^t=\\dfrac{a(1-p)}{p(1-a)}$.',
            },
            {
              slug: 'how-many-tosses',
              title: 'How many tosses are enough?',
              prompt: `You estimate a coin's heads probability $p$ by $\\bar X_n$ and want $P(|\\bar X_n-p|\\ge0.01)\\le0.05$ for all $p$. Find the $n$ guaranteed by (a) Chebyshev, (b) Hoeffding, and (c) the $n$ suggested by the normal approximation. State which of these are guarantees and which is not.`,
              kind: 'problem',
              difficulty: 2,
              hint: '$50000$, $18445$ and $9604$. Part (c) is an approximation, not a guarantee.',
            },
            {
              slug: 'cantelli',
              title: 'One-sided Chebyshev',
              prompt: `Prove Cantelli's inequality: for $k>0$, $P(X-\\mu\\ge k)\\le\\dfrac{\\sigma^2}{\\sigma^2+k^2}$. For Bin(100, 1/2) and $k=20$, evaluate this bound and compare it with the symmetric bound from the worked example.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For $u\\ge0$, apply Markov to $(X-\\mu+u)^2$ and optimise over $u$. The value here is $1/17\\approx0.0588$, so symmetry does better in this case.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which inequality uses only the mean, and what does it assume?',
              answerOutline: 'Markov. It assumes $X\\ge0$ and $a>0$.',
            },
            {
              question: 'What does Chebyshev give for the probability of being 3 standard deviations or more from the mean?',
              answerOutline: 'At most $1/9$, for any distribution with finite variance.',
            },
            {
              question: 'Is $E[\\ln X]$ larger or smaller than $\\ln E[X]$?',
              answerOutline: 'Smaller or equal, because $\\ln$ is concave.',
            },
          ],
          relatedLessons: ['discrete-mathematics/discrete-probability-intro/tail-bounds-and-randomised-algorithms'],
        },
        {
          slug: 'laws-of-large-numbers',
          title: 'Laws of large numbers',
          summary:
            'Sample means settle down to the true mean. The weak law is a statement about probabilities at each $n$, and the strong law is about whole sequences.',
          estimatedMinutes: 105,
          objectives: [
            'Define convergence in probability, almost surely and in distribution',
            'Prove the weak law for finite variance',
            'State the strong law with its hypothesis',
            'Prove and use the Borel-Cantelli lemmas',
          ],
          concepts: [
            'Convergence in probability',
            'Almost sure convergence',
            'Convergence in distribution',
            'Weak law of large numbers',
            'Strong law of large numbers',
            'Borel-Cantelli lemmas',
          ],
          explanation: `Random variables can converge in several senses. Let $X_n$ and $X$ be defined on one probability space.

- **In probability:** $P(|X_n-X|>\\varepsilon)\\to0$ for every $\\varepsilon>0$.
- **Almost surely:** $P(X_n\\to X)=1$.
- **In distribution:** $F_{X_n}(x)\\to F_X(x)$ at every point where $F_X$ is continuous.

Almost sure convergence implies convergence in probability, which implies convergence in distribution. Neither converse holds in general.

Let $X_1,X_2,\\dots$ be i.i.d. with mean $\\mu$, and let $\\bar X_n=(X_1+\\dots+X_n)/n$.

**Weak law of large numbers.** $\\bar X_n\\to\\mu$ in probability. If the variance $\\sigma^2$ is finite, the proof is immediate: independence gives $\\mathrm{Var}(\\bar X_n)=\\sigma^2/n$, and Chebyshev gives
$$P(|\\bar X_n-\\mu|\\ge\\varepsilon)\\le\\frac{\\sigma^2}{n\\varepsilon^2}\\to0.$$
The law holds with only $E[|X_1|]<\\infty$, using a truncation argument.

**Strong law of large numbers.** If the $X_i$ are i.i.d. with $E[|X_1|]<\\infty$, then $\\bar X_n\\to\\mu$ almost surely. Almost every individual sequence of outcomes has running means that converge. The law does not hold without a mean: for Cauchy samples, $\\bar X_n$ has the same Cauchy distribution for every $n$, so averaging gains nothing.

**Borel-Cantelli lemmas.** Let $\\{A_n\\text{ i.o.}\\}$ be the event that infinitely many $A_n$ occur. If $\\sum_nP(A_n)<\\infty$, then $P(A_n\\text{ i.o.})=0$, with no independence needed. If the $A_n$ are independent and $\\sum_nP(A_n)=\\infty$, then $P(A_n\\text{ i.o.})=1$. These lemmas are the standard tool for upgrading a tail estimate to an almost sure statement.

**Worked example.** How many rolls of a fair die does Chebyshev guarantee for the sample mean to be within $0.1$ of $3.5$ with probability at least $0.95$? One roll has variance $35/12$. So we need
$$\\frac{35/12}{n(0.1)^2}\\le0.05,\\quad\\text{which means }n\\ge\\frac{35/12}{0.0005}\\approx5833.3,$$
so $n=5834$ suffices. This is a guarantee, but a conservative one. The central limit theorem suggests about $1.96^2(35/12)/0.01\\approx1121$ rolls.

**Pitfall.** The law of large numbers is not a law of averages in the sense of compensation. After 10 heads in a row, future tosses are still fair. The proportion approaches $\\tfrac12$ because the early surplus is swamped, not because it is repaid.`,
          resources: [
            mit18600('The lectures on the weak and strong laws of large numbers.', true),
            grinsteadSnell('The chapter on the law of large numbers, for the discrete and continuous forms.'),
            {
              title: 'Borel-Cantelli lemma',
              url: 'https://en.wikipedia.org/wiki/Borel%E2%80%93Cantelli_lemma',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Statement, proof and applications of both lemmas.',
            },
          ],
          exercises: [
            {
              slug: 'modes-of-convergence',
              title: 'Separating the modes',
              prompt: `(a) Prove almost sure convergence implies convergence in probability. (b) Let $X_n$ be independent with $P(X_n=1)=1/n$, otherwise 0. Show $X_n\\to0$ in probability but not almost surely. (c) Let $Y_n=n$ with probability $1/n$, otherwise 0. Show $Y_n\\to0$ in probability while $E[Y_n]=1$ for all $n$. What does this say about expectations of limits?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a), the events $\\{\\sup_{m\\ge n}|X_m-X|>\\varepsilon\\}$ decrease with $n$, so use continuity of probability. For (b), use the second Borel-Cantelli lemma.',
            },
            {
              slug: 'borel-cantelli-proofs',
              title: 'The Borel-Cantelli lemmas',
              prompt: `Prove both lemmas. For the second, bound $P(\\bigcap_{n=N}^{M}A_n^c)$ using $1-x\\le e^{-x}$. Then apply them: independent tosses have $P(\\text{heads on toss }n)=1/n^2$ in one experiment and $1/n$ in another. How many heads occur in each?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Finitely many heads almost surely in the first, and infinitely many almost surely in the second.',
            },
            {
              slug: 'strong-law-fourth-moment',
              title: 'A proof of the strong law',
              prompt: `Let $X_i$ be i.i.d. with mean 0, variance $\\sigma^2$ and $E[X_1^4]<\\infty$, and $S_n=\\sum_{i\\leq n}X_i$. (a) Show $E[S_n^4]=nE[X_1^4]+3n(n-1)\\sigma^4$. (b) Use Markov and Borel-Cantelli to show $P(|S_n/n|>\\varepsilon\\text{ i.o.})=0$ for each $\\varepsilon>0$. (c) Conclude that $S_n/n\\to0$ almost surely, taking care to combine countably many $\\varepsilon$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'three-running-means',
              title: 'Three running means',
              prompt: `Plot running means for $10^6$ samples of (a) standard normal, (b) Pareto with $\\alpha=1.5$ on $x\\ge1$, with mean 3 and infinite variance, (c) standard Cauchy. Use several independent runs per plot. For each, state which theorem applies and whether the picture matches it.`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the hypothesis of the strong law for i.i.d. variables.',
              answerOutline: '$E[|X_1|]<\\infty$. No finite variance is needed.',
            },
            {
              question: 'Does the first Borel-Cantelli lemma need independence?',
              answerOutline: 'No. Only the second one does.',
            },
            {
              question: 'Why is the gambler\'s fallacy not implied by the law of large numbers?',
              answerOutline: 'The proportion converges by dilution. Future tosses remain independent, and the absolute surplus need not shrink.',
            },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/law-of-large-numbers'],
        },
        {
          slug: 'moment-generating-functions',
          title: 'Moment generating functions',
          summary:
            'When it is finite near zero, the moment generating function determines a distribution, multiplies under independent sums, and gives a route to limit theorems.',
          estimatedMinutes: 95,
          objectives: [
            'Compute moment generating functions and read off moments',
            'Identify distributions of sums by uniqueness',
            'State the continuity theorem with its hypotheses',
            'Recognise when moments do not determine a distribution',
          ],
          concepts: [
            'Moment generating function',
            'Uniqueness theorem',
            'Product rule for independent sums',
            'Continuity theorem',
            'Characteristic function',
            'Moment problem',
          ],
          explanation: `The **moment generating function** of $X$ is $M_X(t)=E[e^{tX}]$, for $t$ where this is finite. It always equals 1 at $t=0$, but it may be infinite everywhere else. Suppose $M_X$ is finite on an open interval around 0. Then:

1. All moments exist, and $E[X^k]=M_X^{(k)}(0)$.
2. **Uniqueness:** if another variable has the same $M$ on an open interval around 0, it has the same distribution.
3. If $X,Y$ are independent, then $M_{X+Y}=M_XM_Y$ wherever both are finite.
4. **Continuity theorem:** if $M_{X_n}(t)\\to M_X(t)$ on an open interval around 0, then $X_n\\to X$ in distribution.

Facts 2 and 4 are stated without proof, since they need analytic machinery. Fact 3 is immediate from $E[e^{tX}e^{tY}]=E[e^{tX}]E[e^{tY}]$.

**Worked example.** Find $M$ for $X\\sim N(\\mu,\\sigma^2)$. For $Z$ standard normal, complete the square in the exponent:
$$E[e^{tZ}]=\\int\\frac{1}{\\sqrt{2\\pi}}e^{tz-z^2/2}\\,dz=e^{t^2/2}\\int\\frac{1}{\\sqrt{2\\pi}}e^{-(z-t)^2/2}\\,dz=e^{t^2/2}.$$
The last integral is a shifted normal density, which integrates to 1. Since $X=\\mu+\\sigma Z$,
$$M_X(t)=e^{\\mu t}E[e^{\\sigma tZ}]=\\exp\\big(\\mu t+\\tfrac12\\sigma^2t^2\\big),\\quad\\text{for all }t.$$
Checking moments: $M'(0)=\\mu$ and $M''(0)=\\sigma^2+\\mu^2$, as expected. For independent normals, multiplying gives $\\exp\\big((\\mu_1+\\mu_2)t+\\tfrac12(\\sigma_1^2+\\sigma_2^2)t^2\\big)$. By uniqueness the sum is normal, which took a page of integrals by convolution. For example, if $X\\sim N(1,4)$ and $Y\\sim N(-1,1)$ are independent, then $2X+3Y\\sim N(-1,25)$, so $P(2X+3Y>4)=1-\\Phi(1)\\approx0.1587$.

**Limits of the tool.** Some distributions have no useful $M$. For the Cauchy, $M(t)=\\infty$ for every $t\\ne0$. The lognormal is subtler: all its moments are finite, yet $M(t)=\\infty$ for all $t>0$, and other distributions share exactly the same moments. So a list of moments need not determine a distribution when $M$ fails to exist near 0.

The fix is the **characteristic function** $\\phi_X(t)=E[e^{itX}]$. It always exists, since $|e^{itX}|=1$. It determines the distribution, and it has its own continuity theorem. That is the tool used to prove the central limit theorem in full generality.`,
          resources: [
            blitzsteinHwang('The chapter on moments introduces moment generating functions and their properties.', true),
            pishroNik('The sections on moment generating functions and characteristic functions.'),
            {
              title: 'Moment problem',
              url: 'https://en.wikipedia.org/wiki/Moment_problem',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'When a sequence of moments determines a distribution.',
            },
          ],
          exercises: [
            {
              slug: 'mgf-table',
              title: 'A table of generating functions',
              prompt: `Derive $M(t)$, with its domain, for Bernoulli($p$), Bin($n,p$), Poisson($\\lambda$), exponential with rate $\\lambda$, gamma with shape $\\alpha$ and rate $\\lambda$, and uniform on $(0,1)$. Use each to verify the mean and variance.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'The gamma has $M(t)=(\\lambda/(\\lambda-t))^\\alpha$ for $t<\\lambda$.',
            },
            {
              slug: 'normal-higher-moments',
              title: 'Higher normal moments',
              prompt: `From $M(t)=\\exp(\\mu t+\\sigma^2t^2/2)$, find $E[X^3]$ and $E[X^4]$ for $X\\sim N(\\mu,\\sigma^2)$. Check your formulas by quadrature at $\\mu=1$, $\\sigma=2$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '$E[X^3]=\\mu^3+3\\mu\\sigma^2$ and $E[X^4]=\\mu^4+6\\mu^2\\sigma^2+3\\sigma^4$.',
            },
            {
              slug: 'limits-by-mgf',
              title: 'Two limits through generating functions',
              prompt: `Use the continuity theorem to prove (a) that Bin($n,\\lambda/n$) converges in distribution to Poisson($\\lambda$), and (b) that if $X_\\lambda\\sim$ Poisson($\\lambda$), then $(X_\\lambda-\\lambda)/\\sqrt\\lambda$ converges in distribution to $N(0,1)$ as $\\lambda\\to\\infty$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lognormal-moment-problem',
              title: 'Same moments, different distributions',
              prompt: `Let $f$ be the density of $X=e^Z$. (a) Show $E[X^k]=e^{k^2/2}$ for every positive integer $k$, but $E[e^{tX}]=\\infty$ for all $t>0$. (b) For $|a|\\le1$, let $f_a(x)=f(x)(1+a\\sin(2\\pi\\ln x))$. Show $f_a$ is a density with the same moments as $f$ for every $a$. (c) Confirm by numerical integration for $a=0.5$ and $k=1,2,3$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Substitute $x=e^y$, and use that $\\int e^{ky}\\varphi(y)\\sin(2\\pi y)\\,dy=0$ after shifting $y$ by $k$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What hypothesis makes the uniqueness theorem for moment generating functions work?',
              answerOutline: 'Finiteness on an open interval containing 0.',
            },
            {
              question: 'Why does every distribution have a characteristic function?',
              answerOutline: 'Because $|e^{itX}|=1$, so the expectation always converges.',
            },
            {
              question: 'Find the distribution with $M(t)=e^{4(e^t-1)}$.',
              answerOutline: 'Poisson(4), by uniqueness.',
            },
          ],
        },
        {
          slug: 'central-limit-theorem',
          title: 'The central limit theorem',
          summary:
            'Standardised sums of i.i.d. variables with finite variance converge to the normal, whatever the original distribution. Here is the proof, and what breaks it.',
          estimatedMinutes: 110,
          objectives: [
            'State the central limit theorem with every hypothesis',
            'Prove it assuming a finite moment generating function',
            'Apply it to approximate probabilities of sums and means',
            'Identify situations where it does not apply',
          ],
          concepts: [
            'Standardised sum',
            'Central limit theorem',
            'Proof by generating functions',
            'Infinite variance',
            'Sample size calculations',
          ],
          explanation: `**Central limit theorem.** Let $X_1,X_2,\\dots$ be i.i.d. with mean $\\mu$ and variance $\\sigma^2$, where $0<\\sigma^2<\\infty$, and let $S_n=\\sum_{i\\le n}X_i$. Then for every real $x$,
$$P\\Big(\\frac{S_n-n\\mu}{\\sigma\\sqrt n}\\le x\\Big)\\to\\Phi(x)\\quad\\text{as }n\\to\\infty.$$
This is convergence in distribution. It describes the probability of events at the scale $\\sqrt n$ around the mean, and it is not a claim that the density of the sum converges, nor about extreme tails.

**Proof, assuming $M$ is finite near 0.** Standardise so that $\\mu=0$, $\\sigma=1$, and let $Z_n=S_n/\\sqrt n$. By independence, $M_{Z_n}(t)=M(t/\\sqrt n)^n$. Taylor's theorem gives $M(s)=1+\\tfrac12s^2+o(s^2)$ as $s\\to0$, since $M(0)=1$, $M'(0)=0$ and $M''(0)=1$. So for fixed $t$,
$$n\\ln M\\Big(\\frac{t}{\\sqrt n}\\Big)=n\\ln\\Big(1+\\frac{t^2}{2n}+o\\Big(\\frac1n\\Big)\\Big)\\to\\frac{t^2}{2}.$$
Thus $M_{Z_n}(t)\\to e^{t^2/2}$, the generating function of $N(0,1)$, and the continuity theorem finishes the proof. The same argument with characteristic functions, which always exist, removes the assumption, leaving only finite variance.

Notice why the normal appears. The first-order term vanishes by centring, the second is universal, and higher terms die with $n$. Only the mean and variance survive.

**Worked example.** One hundred numbers are each rounded to the nearest integer, with errors modelled as independent and uniform on $(-\\tfrac12,\\tfrac12)$. What is the chance that the total error exceeds 3 in absolute value? Each error has mean 0 and variance $\\tfrac1{12}$, so $S_{100}$ has standard deviation $\\sqrt{100/12}\\approx2.887$. Then
$$P(|S_{100}|>3)\\approx2\\big(1-\\Phi(3/2.887)\\big)=2\\big(1-\\Phi(1.039)\\big)\\approx0.299.$$
A simulation with $2\\times10^6$ repetitions agrees to within its standard error.

**When it fails.** Each hypothesis does work. Without finite variance, sums of Cauchy variables never become normal, and heavy-tailed sums can converge to other stable laws. Strong dependence changes the variance of the sum, so a formula using $n\\sigma^2$ is wrong even if a normal limit survives. The limit also concerns fixed $x$ as $n\\to\\infty$, so it gives no assurance about tail probabilities that shrink with $n$.`,
          resources: [
            {
              title: '3Blue1Brown: But what is the Central Limit Theorem?',
              url: 'https://www.3blue1brown.com/lessons/clt',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Build a visual picture of repeated convolution before reading the proof.',
              primary: true,
            },
            grinsteadSnell('The chapter on the central limit theorem covers the discrete and continuous cases.'),
            mit18600('The lectures on the central limit theorem and characteristic functions.'),
          ],
          exercises: [
            {
              slug: 'clt-proof-details',
              title: 'Filling in the proof',
              prompt: `Write the proof in the lesson in full. Justify the expansion $M(s)=1+\\tfrac12s^2+o(s^2)$, and show carefully that if $a_n\\to a$ then $(1+a_n/n)^n\\to e^a$. Explain what changes if you use the characteristic function: why is $\\phi(s)=1-\\tfrac12s^2+o(s^2)$ available with only a finite second moment?`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cauchy-stays-cauchy',
              title: 'Averaging does nothing to a Cauchy',
              prompt: `The Cauchy distribution has characteristic function $\\phi(t)=e^{-|t|}$. Use this to show that the mean of $n$ i.i.d. standard Cauchy variables is standard Cauchy. Which hypothesis of the central limit theorem and the law of large numbers fails? Plot sample quantiles of the mean for $n=1,10,1000$ to confirm that they do not change.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lot-of-bolts',
              title: 'A batch of bolts',
              prompt: `Bolt weights are i.i.d. with mean 10 g and standard deviation $0.5$ g. (a) Approximate the probability that the mean of 400 bolts exceeds $10.05$ g. (b) What is the smallest $n$ with $P(|\\bar X_n-10|\\le0.02)\\ge0.99$, according to the normal approximation?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $1-\\Phi(2)\\approx0.0228$. (b) $n=4147$.',
            },
            {
              slug: 'stirling-from-clt',
              title: 'Stirling\'s formula from the CLT',
              prompt: `Let $S_n$ be Poisson($n$), a sum of $n$ independent Poisson(1) variables. (a) Give the heuristic: $P(S_n=n)$ is about the normal density at the mean, which suggests $e^{-n}n^n/n!\\approx1/\\sqrt{2\\pi n}$. (b) Explain why this is a heuristic: which stronger statement than the central limit theorem would it need? (c) Check numerically at $n=10,100,1000$ that the ratio tends to 1, and find the rate of the error.`,
              kind: 'simulation',
              difficulty: 3,
              hint: 'The ratio of the two sides is about $1-1/(12n)$. It needs a local limit theorem.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the central limit theorem, with hypotheses.',
              answerOutline:
                'i.i.d., with finite non-zero variance. Then $(S_n-n\\mu)/(\\sigma\\sqrt n)$ converges in distribution to $N(0,1)$.',
            },
            {
              question: 'Why does the normal appear, not some other law?',
              answerOutline:
                'After centring and scaling, only the second-order term of the log generating function survives, and $e^{t^2/2}$ is the normal.',
            },
            {
              question: 'Does the theorem need the $X_i$ to be continuous?',
              answerOutline: 'No. The convergence is of CDFs, and it applies to discrete variables as well.',
            },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/central-limit-theorem'],
        },
        {
          slug: 'normal-approximation-in-practice',
          title: 'Using the normal approximation',
          summary:
            'How large is large enough? The continuity correction and the Berry-Esseen theorem make the central limit theorem quantitative, and the tails show where it stops working.',
          estimatedMinutes: 90,
          objectives: [
            'Apply the continuity correction to integer-valued variables',
            'State the Berry-Esseen theorem and compute its bound',
            'Explain why skewness slows convergence',
            'Identify when relative accuracy in the tails is lost',
          ],
          concepts: [
            'De Moivre-Laplace theorem',
            'Continuity correction',
            'Berry-Esseen theorem',
            'Skewness and speed of convergence',
            'Absolute and relative tail error',
          ],
          explanation: `The **De Moivre-Laplace theorem** is the central limit theorem for $X\\sim$ Bin($n,p$): $(X-np)/\\sqrt{npq}$ converges in distribution to $N(0,1)$. To use it for an integer-valued variable, note that the event $X\\ge k$ is the same as $X\\ge k-\\tfrac12$. The normal curve is smooth, so the half-way point gives the best match to the area of the histogram bar. This is the **continuity correction**.

**Worked example.** Let $X\\sim$ Bin(100, 0.3), with mean 30 and standard deviation $\\sqrt{21}\\approx4.583$. Approximate $P(X\\ge35)$. Without the correction,
$$1-\\Phi\\big(5/4.583\\big)=1-\\Phi(1.091)\\approx0.1376.$$
With it,
$$1-\\Phi\\big(4.5/4.583\\big)=1-\\Phi(0.982)\\approx0.1631.$$
The exact value is $0.1629$. The correction is worth much more than extra decimals in $\\Phi$. For a single value such as $P(X=35)$ the uncorrected approximation is 0, which is absurd, while the corrected one uses the interval from $34.5$ to $35.5$.

**How fast is the limit?** The **Berry-Esseen theorem** says that if the $X_i$ are i.i.d. with mean $\\mu$, variance $\\sigma^2>0$ and $\\rho=E[|X_1-\\mu|^3]<\\infty$, then
$$\\sup_x\\Big|P\\Big(\\frac{S_n-n\\mu}{\\sigma\\sqrt n}\\le x\\Big)-\\Phi(x)\\Big|\\le\\frac{C\\rho}{\\sigma^3\\sqrt n},$$
for an absolute constant $C$, and it is known that $C<0.48$ works. The error shrinks like $1/\\sqrt n$, and a bigger $\\rho/\\sigma^3$ means a slower approach. For Bernoulli($p$), $\\rho=pq(p^2+q^2)$, so $\\rho/\\sigma^3=(p^2+q^2)/\\sqrt{pq}$ blows up as $p\\to0$. This explains the rule of thumb that $npq$ should be at least about 10, and why the Poisson approximation takes over for rare events. For the example, the bound with $C=0.48$ is about $0.061$, and the actual largest gap is about $0.049$, without continuity correction. Remember the theorem bounds a difference of CDFs over all $x$, so it is a worst-case statement.

**Tails.** A small absolute error can be a huge relative error. For Bin(1000, 1/2), the continuity-corrected normal estimate of $P(X\\ge550)$ is within 1% of the truth. At 600 it is 14% too large, and at 700 it is about 10 times too large. When the probability of a rare event is the whole point, the central limit theorem is the wrong tool. Use exact computation, Chernoff-type estimates or importance sampling.`,
          resources: [
            mit18600('The lecture on the De Moivre-Laplace limit theorem.', true),
            {
              title: 'Berry-Esseen theorem',
              url: 'https://en.wikipedia.org/wiki/Berry%E2%80%93Esseen_theorem',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Statement and the history of the bounds on the constant.',
            },
            scipyStats('Use binom and norm to compute exact and approximate values side by side.'),
          ],
          exercises: [
            {
              slug: 'continuity-correction-table',
              title: 'The effect of the correction',
              prompt: `For (a) $P(\\text{Bin}(50,0.5)\\ge30)$ and (b) $P(\\text{Bin}(200,0.1)\\ge25)$, compute the exact value, the normal approximation without correction, and with it. Report all to four decimals. Which approximation is better, and by how much, in each case?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $0.1013$, $0.0786$, $0.1015$. (b) $0.1449$, $0.1193$, $0.1444$.',
            },
            {
              slug: 'berry-esseen-experiment',
              title: 'Testing Berry-Esseen',
              prompt: `For the binomial with $(n,p)$ equal to $(100,0.3)$, $(100,0.01)$, $(1000,0.01)$, $(1000,0.5)$ and $(10,0.5)$, compute the exact value of the supremum in the theorem, checking both sides of each jump in the CDF, and compare with the bound using $C=0.48$. Tabulate and explain the pattern.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'The suprema are about $0.0491$, $0.2358$, $0.0830$, $0.0126$ and $0.1230$.',
            },
            {
              slug: 'margin-of-error',
              title: 'Margin of error',
              prompt: `In a poll of $n$ people with sample proportion $\\hat p$, show that $\\sqrt{p(1-p)}$ is largest at $p=1/2$, and derive the worst-case 95% margin $1.96/(2\\sqrt n)$. Evaluate at $n=1000$, and find how $n$ must change to halve the margin. What assumptions about the sampling does this use?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'About $0.031$. Halving needs four times the sample.',
            },
            {
              slug: 'relative-tail-error',
              title: 'Relative error in the tail',
              prompt: `For Bin(1000, 1/2), compute the exact value of $P(X\\ge k)$, the corrected normal estimate and the Chernoff bound at $k=550,600,700$. Report each estimate's ratio to the exact value. Explain why the normal estimate degrades with $k$ while the exponent of Chernoff's bound remains correct.`,
              kind: 'simulation',
              difficulty: 3,
              hint: 'At $k=700$: exact $8.83\\times10^{-38}$, normal $8.46\\times10^{-37}$, Chernoff $1.84\\times10^{-36}$. The normal uses the exponent $2n(a-\\tfrac12)^2$ in place of $nD(a\\|\\tfrac12)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the corrected normal approximation for $P(X\\le12)$ when $X$ is integer valued?',
              answerOutline: 'Standardise at $12.5$.',
            },
            {
              question: 'At what rate does the Berry-Esseen bound shrink with $n$?',
              answerOutline: '$1/\\sqrt n$.',
            },
            {
              question: 'When is the Poisson better than the normal for a binomial?',
              answerOutline: 'When $p$ is small and $np$ is moderate, because the binomial is then strongly skewed.',
            },
          ],
        },
      ],
      project: {
        slug: 'how-large-is-large-enough',
        title: 'How large is large enough?',
        description: `Build a report that answers one question with evidence: for a given distribution and sample size, how good is the normal approximation to the mean, and which tail bound should you trust?

Take four parent distributions: Bernoulli(0.5), Bernoulli(0.02), exponential(1) and Pareto with $\\alpha=2.5$. The last has a finite variance but an infinite third moment, so Berry-Esseen does not apply to it. For each and for $n=5,20,100,1000$, estimate the distribution of the standardised sample mean. Use exact computation for the binomial, the gamma distribution for the exponential sum, and simulation for the Pareto with $10^6$ replications. Measure the Kolmogorov distance to the normal and compare it with the Berry-Esseen bound where the third moment is finite. Then fix a target $P(\\bar X_n-\\mu\\ge\\varepsilon)$ and compare Chebyshev, Chernoff or Hoeffding where they apply, the normal estimate and the truth.

This matters in practice. Every confidence interval and A/B test relies on an implicit answer to the same question.`,
        deliverables: [
          'A reproducible script or notebook that generates all results from a single seed',
          'A table of Kolmogorov distance by distribution and sample size, with simulation standard errors where relevant',
          'A plot of the distance against $n$ on log-log axes, with the slope fitted and compared with $-\\tfrac12$',
          'A table comparing tail bounds with exact values at $\\varepsilon$ equal to 1 and 3 standard errors, with each bound\'s hypotheses stated',
          'A two-page summary, in your own words, giving a practical rule for skewed data and saying where your rule is uncertain',
        ],
        estimatedHours: 5,
        stretchGoals: [
          'Add a heavy-tailed case with $\\alpha=1.5$, and show empirically that normalising by $\\sqrt n$ is wrong',
          'Estimate the skewness correction from the Edgeworth expansion, and test whether it improves the approximation',
        ],
      },
    },
    {
      slug: 'further-topics',
      title: 'Further Topics',
      description:
        'Random processes built from what you know: Markov chains, their long-run behaviour, Poisson processes, and simulation done with honest error bars.',
      lessons: [
        {
          slug: 'markov-chains',
          title: 'Markov chains',
          summary:
            'A Markov chain forgets everything except its current state. Matrix powers give its distribution at any time, and state classification explains what it can do in the long run.',
          estimatedMinutes: 105,
          objectives: [
            'State the Markov property and write a transition matrix',
            'Use matrix powers and the Chapman-Kolmogorov equations',
            'Compute hitting probabilities and expected hitting times',
            'Classify states as transient or recurrent and find their periods',
          ],
          concepts: [
            'Markov property',
            'Transition matrix',
            'Chapman-Kolmogorov equations',
            'Communicating classes',
            'Transient and recurrent states',
            'Period',
          ],
          explanation: `A sequence $X_0,X_1,\\dots$ on a countable state space is a **Markov chain** if, for all $n$ and all states,
$$P(X_{n+1}=j\\mid X_n=i,X_{n-1}=i_{n-1},\\dots,X_0=i_0)=P(X_{n+1}=j\\mid X_n=i),$$
whenever the conditioning event has positive probability. In the time-homogeneous case, this equals a fixed number $P_{ij}$, and the numbers form a **transition matrix** whose rows each sum to 1. The future depends on the past only through the present.

Conditioning on the state at time $m$ gives the **Chapman-Kolmogorov equations**: $P^{(m+n)}_{ij}=\\sum_kP^{(m)}_{ik}P^{(n)}_{kj}$. So the $n$-step probabilities are the entries of the matrix power $P^n$. If $\\mu$ is the distribution of $X_0$ as a row vector, then $X_n$ has distribution $\\mu P^n$.

**Worked example.** Let a machine be up (state 0) or down (state 1), with
$$P=\\begin{pmatrix}1-a&a\\\\b&1-b\\end{pmatrix},\\quad a=0.1,\\ b=0.5.$$
The eigenvalues are 1 and $1-a-b=0.4$. Diagonalising gives, for $0<a+b<2$,
$$P^n=\\frac{1}{a+b}\\begin{pmatrix}b&a\\\\b&a\\end{pmatrix}+\\frac{(1-a-b)^n}{a+b}\\begin{pmatrix}a&-a\\\\-b&b\\end{pmatrix}.$$
Starting up, $P(X_2=0)=(0.5+0.1\\times0.16)/0.6=0.86$, which matches the direct sum $0.9^2+0.1\\times0.5$. As $n$ grows, the second term dies at rate $0.4^n$, and $P^n$ tends to a matrix with both rows $(\\tfrac56,\\tfrac16)$. The chain forgets where it started. By $n=10$, the starting state changes these probabilities by less than $2\\times10^{-4}$.

**Classifying states.** State $j$ is **accessible** from $i$ if $P^{(n)}_{ij}>0$ for some $n\\ge0$, and $i$ and $j$ **communicate** if each is accessible from the other. This splits states into classes. A state is **recurrent** if the chain returns to it with probability 1, and **transient** otherwise. Equivalently, $i$ is recurrent exactly when $\\sum_nP^{(n)}_{ii}=\\infty$. Recurrence and transience are class properties. In a finite chain, a class is recurrent exactly when no probability leaves it. The **period** of $i$ is the greatest common divisor of $\\{n\\ge1:P^{(n)}_{ii}>0\\}$, and all states in a class share it.

To find hitting probabilities or expected hitting times, use first-step analysis. It turns them into a system of linear equations, one for each state.`,
          resources: [
            grinsteadSnell('The chapter on Markov chains, up to absorbing chains.', true),
            {
              title: 'Markov Chains: A Visual Explanation',
              url: 'https://setosa.io/ev/markov-chains/',
              type: 'interactive',
              cost: 'free',
              provider: 'Setosa',
              note: 'Play with small transition matrices and watch the chain move.',
            },
            mit6041('The lectures on Markov chains, with recitations on classification and absorption.'),
          ],
          exercises: [
            {
              slug: 'path-probabilities',
              title: 'Path probabilities and Chapman-Kolmogorov',
              prompt: `Prove from the Markov property that $P(X_0=i_0,\\dots,X_n=i_n)=\\mu(i_0)P_{i_0i_1}\\cdots P_{i_{n-1}i_n}$. Deduce the Chapman-Kolmogorov equations. Then verify the closed form for $P^n$ in the lesson by induction or by diagonalisation.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'pattern-chains',
              title: 'Patterns as Markov chains',
              prompt: `Model waiting for a pattern in fair coin tosses as a chain whose state is the length of the longest pattern prefix matched so far. Set up and solve the linear system for HHH, HHT and HTH, then explain why the three answers differ. Check by simulation.`,
              kind: 'problem',
              difficulty: 2,
              hint: '14, 8 and 10.',
            },
            {
              slug: 'classify-five-states',
              title: 'Classifying a chain',
              prompt: `On $\\{1,2,3,4,5\\}$, let $1\\to2$ and $1\\to3$ with probability $\\tfrac12$ each; $2\\to1$ and $2\\to5$ with probability $\\tfrac12$ each; $3\\to4$ and $4\\to3$ with probability 1; and $5\\to5$ with probability 1. (a) Find the communicating classes, whether each is transient or recurrent, and the periods. (b) From state 1, find the probability of absorption in $\\{3,4\\}$. (c) Does $\\lim_nP^n$ exist? Why or why not?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) $2/3$. (c) No: the class $\\{3,4\\}$ has period 2.',
            },
            {
              slug: 'walk-recurrence',
              title: 'Random walks in one and two dimensions',
              prompt: `(a) For the simple symmetric walk on $\\mathbb Z$, show $P^{(2n)}_{00}=\\binom{2n}{n}4^{-n}\\sim1/\\sqrt{\\pi n}$, and conclude that it is recurrent. (b) For the walk on $\\mathbb Z^2$, use the rotation $(x,y)\\mapsto(x+y,x-y)$ to show that the two new coordinates are independent one-dimensional walks, so that $P^{(2n)}_{00}=\\big(\\binom{2n}{n}4^{-n}\\big)^2$. Conclude that it is recurrent. (c) What does the analogous sum do in three dimensions, stated without proof?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use Stirling\'s formula. In $\\mathbb Z^3$ the sum converges, so the walk is transient.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Markov property say in words?',
              answerOutline: 'Given the present state, the future is independent of the past.',
            },
            {
              question: 'How do you find the distribution of $X_5$ given the distribution of $X_0$?',
              answerOutline: 'Multiply the row vector by $P^5$.',
            },
            {
              question: 'Can a finite chain have all its states transient?',
              answerOutline: 'No. Otherwise each state is visited finitely often, which is impossible in infinite time with finitely many states.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/eigenvalues-and-networks/markov-chains'],
        },
        {
          slug: 'stationary-distributions',
          title: 'Stationary distributions and convergence',
          summary:
            'An irreducible finite chain has one stationary distribution, which gives long-run time averages. Aperiodicity is what makes the distribution itself converge.',
          estimatedMinutes: 105,
          objectives: [
            'Define and compute stationary distributions',
            'State the convergence and ergodic theorems with hypotheses',
            'Use detailed balance for reversible chains',
            'Relate stationary probabilities to mean return times',
          ],
          concepts: [
            'Stationary distribution',
            'Irreducibility and aperiodicity',
            'Convergence theorem',
            'Ergodic theorem',
            'Detailed balance',
            'Mean return time',
          ],
          explanation: `A row vector $\\pi$ with non-negative entries summing to 1 is **stationary** if $\\pi P=\\pi$: starting from $\\pi$, the distribution stays $\\pi$ forever. It is a left eigenvector of $P$ with eigenvalue 1.

A chain is **irreducible** if all states communicate, and **aperiodic** if every state has period 1. For a finite-state chain:

- **Existence and uniqueness.** If it is irreducible, there is exactly one stationary distribution, with all entries positive.
- **Mean return times.** If it is irreducible, $\\pi_i=1/E_i[T_i]$, where $T_i\\geq 1$ is the first return time to $i$ when starting at $i$.
- **Ergodic theorem.** If it is irreducible, the long-run fraction of time in state $i$ converges to $\\pi_i$ almost surely, from any start.
- **Convergence theorem.** If it is irreducible and aperiodic, then $P^{(n)}_{ij}\\to\\pi_j$ for all $i,j$.

Aperiodicity matters only for the last one. A chain that flips deterministically between two states has $\\pi=(\\tfrac12,\\tfrac12)$ and time averages of $\\tfrac12$, but $P^{(n)}_{00}$ alternates between 0 and 1.

Solving $\\pi P=\\pi$ can be replaced by something simpler when the chain is **reversible**. If $\\pi_iP_{ij}=\\pi_jP_{ji}$ for all $i,j$, which is **detailed balance**, then summing over $i$ gives $\\pi P=\\pi$. Detailed balance is sufficient but not necessary.

**Worked example.** Take a random walk on a connected undirected graph with no isolated vertices: from a vertex, move to a uniformly chosen neighbour. Let $\\pi_v=\\deg(v)/(2|E|)$. For an edge $vw$,
$$\\pi_vP_{vw}=\\frac{\\deg v}{2|E|}\\cdot\\frac1{\\deg v}=\\frac1{2|E|},$$
which is symmetric in $v,w$, so detailed balance holds. Take vertices $A,B,C,D$ with edges $AB,AC,BC,CD$. The degrees are $2,2,3,1$ and $2|E|=8$, so $\\pi=(\\tfrac14,\\tfrac14,\\tfrac38,\\tfrac18)$. The mean return time to $D$ is $1/\\pi_D=8$ steps. A check by hand: from $D$ you must go to $C$, so this says the expected time from $C$ back to $D$ is 7. The triangle makes the walk aperiodic, so here the distribution converges as well.

**Speed of convergence.** For a reversible chain, the rate is governed by the second-largest eigenvalue modulus, as in the $0.4^n$ of the previous lesson. This idea sits behind PageRank and Markov chain Monte Carlo, where you design a chain with a chosen stationary distribution, and the question is how long it takes to get close.`,
          resources: [
            levinPeres('The opening chapters on the convergence theorem and random walks on graphs. Later chapters go well beyond this course.', true),
            grinsteadSnell('The sections on ergodic chains in the Markov chains chapter.'),
          ],
          exercises: [
            {
              slug: 'knight-return',
              title: 'A knight\'s return',
              prompt: `A knight moves on an empty chessboard by choosing uniformly among its legal moves. (a) Find the total degree of the knight's move graph by a short program. (b) Find the expected number of moves for a knight starting in a corner to return to that corner. (c) This chain has period 2. Explain which theorem you used and why periodicity does not affect it, and why $P^{(n)}_{ii}$ does not converge.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Total degree 336, corner degree 2, so the answer is 168.',
            },
            {
              slug: 'ehrenfest-urn',
              title: 'The Ehrenfest urn',
              prompt: `$N$ balls are in two urns. At each step a ball is picked uniformly and moved to the other urn. Let $X_n$ be the number in urn 1. (a) Write the transition probabilities. (b) Use detailed balance to prove that the stationary distribution is Bin($N,\\tfrac12$). (c) Find the period, and say which theorems apply. (d) For $N=20$, find the expected return time to state 0, and explain what this has to do with entropy.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For $N=20$ the mean return time to 0 is $2^{20}$ steps.',
            },
            {
              slug: 'lazy-cycle-mixing',
              title: 'Mixing on a cycle',
              prompt: `Take the lazy walk on a cycle of 6 vertices: stay with probability $\\tfrac12$, and move to each neighbour with probability $\\tfrac14$. (a) Find the eigenvalues and the stationary distribution. (b) Starting from one vertex, find the smallest $n$ with total variation distance to stationarity at most $0.01$. (c) Why is laziness used in the design of this chain?`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'Eigenvalues $1,\\tfrac34,\\tfrac34,\\tfrac14,\\tfrac14,0$. The answer to (b) is $n=15$.',
            },
            {
              slug: 'ergodic-simulation',
              title: 'Time averages',
              prompt: `For the graph example in the lesson, simulate $10^6$ steps and compare the time spent at each vertex with $\\pi$. Estimate a standard error by the method of batch means. Explain why the naive formula $\\sqrt{\\pi_i(1-\\pi_i)/n}$ is wrong here.`,
              kind: 'simulation',
              difficulty: 3,
              hint: 'The steps are dependent, so successive indicators are correlated.',
            },
          ],
          selfAssessment: [
            {
              question: 'What extra hypothesis does the convergence theorem need beyond the ergodic theorem?',
              answerOutline: 'Aperiodicity.',
            },
            {
              question: 'Is every stationary distribution reversible?',
              answerOutline: 'No. Detailed balance is sufficient, not necessary. A biased walk around a cycle is a counterexample.',
            },
            {
              question: 'What does $\\pi_i=0.2$ tell you about returns to $i$?',
              answerOutline: 'The mean return time is 5 steps.',
            },
          ],
          relatedLessons: [
            'linear-algebra-for-data-science/eigenvalues-and-networks/pagerank',
            'probability-statistics/bayesian-inference-and-mcmc/mcmc-sampling',
          ],
        },
        {
          slug: 'poisson-processes',
          title: 'Poisson processes',
          summary:
            'Random arrivals in continuous time. Three descriptions turn out to be equivalent: Poisson counts, exponential gaps, and uniform scattering.',
          estimatedMinutes: 105,
          objectives: [
            'Define a Poisson process by its counts and by its gaps',
            'Use independent increments to compute joint probabilities',
            'Apply thinning and superposition',
            'Use the conditional uniform property and explain the inspection paradox',
          ],
          concepts: [
            'Counting process',
            'Independent and stationary increments',
            'Exponential interarrival times',
            'Thinning and superposition',
            'Conditional uniformity',
            'Inspection paradox',
          ],
          explanation: `A **Poisson process** with rate $\\lambda>0$ is a counting process $N(t)$ such that:

1. $N(0)=0$.
2. Increments over disjoint time intervals are independent.
3. $N(s+t)-N(s)\\sim$ Poisson($\\lambda t$) for all $s\\ge0$ and $t>0$.

An equivalent description: the gaps between arrivals are i.i.d. exponential with rate $\\lambda$. The time of the $n$-th arrival is then a gamma variable with shape $n$, which is the duality you used in Module 3: $\\{S_n>t\\}=\\{N(t)<n\\}$.

Three properties make the process easy to work with.

- **Superposition:** independent Poisson processes with rates $\\lambda$ and $\\mu$ merge into a Poisson process with rate $\\lambda+\\mu$, and each arrival is of the first type with probability $\\lambda/(\\lambda+\\mu)$, independently.
- **Thinning:** if each arrival is kept independently with probability $p$, then the kept and discarded arrivals form independent Poisson processes with rates $\\lambda p$ and $\\lambda(1-p)$.
- **Conditional uniformity:** given $N(t)=n$, the $n$ arrival times are distributed as the order statistics of $n$ i.i.d. uniforms on $(0,t)$.

**Worked example.** Buses arrive as a Poisson process with rate 3 per hour. Find the probability of exactly 2 buses in the first hour and exactly 5 in the first three hours. The events overlap in time, so split them over disjoint intervals: 2 in the first hour, and 3 in the next two hours. By independent increments,
$$P(N(1)=2,N(3)=5)=P(N(1)=2)\\,P(N(3)-N(1)=3)=e^{-3}\\frac{3^2}{2!}\\cdot e^{-6}\\frac{6^3}{3!}.$$
This is $0.2240\\times0.0892\\approx0.0200$. Now suppose you turn up at the stop at a fixed time long after the start. The memoryless property says your expected wait is $1/\\lambda=20$ minutes, the same as the mean gap. Yet the time back to the previous bus also has mean about 20 minutes. So the gap you landed in has mean length near 40 minutes, twice the average gap.

This is the **inspection paradox**. You are more likely to land in a long gap than a short one, because long gaps cover more time. Exact value: the gap containing time $t$ has mean $(2-e^{-\\lambda t})/\\lambda$.

**Pitfall.** Do not assume arrivals in real data form a Poisson process. Clustering, schedules and changing rates all break the model. Check the exponential gaps and the independence before using it.`,
          resources: [
            mit6041('The lectures on the Bernoulli and Poisson processes, with recitations.', true),
            randomServices('The chapter on the Poisson process gives both definitions and has simulations.'),
            {
              title: 'MIT 6.262 Discrete Stochastic Processes',
              url: 'https://ocw.mit.edu/courses/6-262-discrete-stochastic-processes-spring-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'A more advanced treatment if you want to go further into arrival processes and renewal theory.',
            },
          ],
          exercises: [
            {
              slug: 'gaps-from-increments',
              title: 'From increments to gaps',
              prompt: `From the definition by counts: (a) prove the first arrival $T_1$ is exponential with rate $\\lambda$. (b) Show that the second gap, given $T_1=s$, is also exponential with rate $\\lambda$. Explain which property does the work, and what extra care is needed since you are conditioning on an event of probability zero. (c) Deduce that the $n$-th arrival time has the gamma density with shape $n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'merged-arrivals',
              title: 'Red and blue arrivals',
              prompt: `Red customers arrive at rate 2 and blue at rate 3, as independent Poisson processes. Find (a) the probability that the first two customers are both red, (b) the expected number of blue arrivals before the first red, (c) the distribution of the number of red arrivals in $[0,1]$ given 10 arrivals in total in $[0,1]$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $0.16$. (b) $3/2$. (c) Bin(10, 0.4).',
            },
            {
              slug: 'conditional-uniformity',
              title: 'Conditional uniformity',
              prompt: `(a) Prove that given $N(t)=1$, the arrival time is uniform on $(0,t)$. (b) For general $n$, verify by computing the joint density of $(S_1,\\dots,S_n)$ on the event $N(t)=n$, and show it is constant on $0<s_1<\\dots<s_n<t$. (c) Use this to prove $E[\\sum_{i=1}^{N(t)}S_i]=\\lambda t^2/2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'infinite-servers',
              title: 'A queue with no waiting',
              prompt: `Customers arrive at a large call centre as a Poisson process with rate 2 per minute, and each independently takes a uniform time on $(0,6)$ minutes. There is no waiting. (a) Show that the number in service at time $t\\geq 6$ is Poisson with mean 6, by thinning with a time-dependent keep probability. (b) Find the probability that at least 10 are in service at time $t=10$. (c) Confirm by simulation.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'An arrival at time $s$ is still in service at $t$ with probability $P(\\text{service}>t-s)$. The mean is $\\lambda\\int_0^tP(\\text{service}>u)\\,du$. The answer to (b) is about $0.0839$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give the two equivalent definitions of a Poisson process.',
              answerOutline: 'Independent, stationary, Poisson-distributed increments, or i.i.d. exponential gaps.',
            },
            {
              question: 'What is the distribution of the time to the 5th arrival at rate 2?',
              answerOutline: 'Gamma with shape 5 and rate 2, with mean $5/2$.',
            },
            {
              question: 'Why is your bus gap longer than average?',
              answerOutline: 'A random time falls in an interval with probability proportional to its length. This is length-biased sampling.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/discrete-distributions'],
        },
        {
          slug: 'simulation',
          title: 'A first look at simulation',
          summary:
            'Monte Carlo is the law of large numbers put to work, and the central limit theorem tells you its error. Rejection and importance sampling handle what plain sampling cannot.',
          estimatedMinutes: 105,
          objectives: [
            'Estimate an expectation with a standard error and confidence interval',
            'Explain the $1/\\sqrt n$ convergence rate',
            'Implement rejection sampling and justify it',
            'Use importance sampling for rare events',
          ],
          concepts: [
            'Monte Carlo estimator',
            'Standard error',
            'Rejection sampling',
            'Importance sampling',
            'Seeds and reproducibility',
          ],
          explanation: `To estimate $\\theta=E[g(X)]$, draw i.i.d. copies and average: $\\hat\\theta_n=\\frac1n\\sum_ig(X_i)$. The law of large numbers gives convergence if $E[|g(X)|]<\\infty$. If $\\sigma^2=\\mathrm{Var}(g(X))$ is finite, the central limit theorem gives the error: an approximate 95% interval is $\\hat\\theta_n\\pm1.96\\,\\hat\\sigma/\\sqrt n$, using the sample standard deviation $\\hat\\sigma$. Always report this. To gain one decimal place you need 100 times the samples, whatever the dimension. That is both the strength of Monte Carlo and its weakness.

Random number generators in software are deterministic, and they pass statistical tests rather than being truly random. Create one with a recorded seed so that a result can be reproduced. In NumPy, use np.random.default_rng(seed).

**Inverse transform sampling**, from Module 3, needs a computable inverse CDF. When there is none, use **rejection sampling**. Suppose $f\\le c\\,g$ for a density $g$ you can sample and a constant $c$. Draw $Y\\sim g$ and $U$ uniform on $(0,1)$, and accept $Y$ if $U\\le f(Y)/(c\\,g(Y))$; otherwise try again. Accepted values have density $f$, and each try succeeds with probability $1/c$, so you want $c$ as small as possible. The method needs $f$ only up to a constant.

**Worked example.** Sample from Beta(2, 2), with density $f(x)=6x(1-x)$ on $(0,1)$, using uniform proposals, so $g=1$. The maximum of $f$ is $\\tfrac32$, at $x=\\tfrac12$, so take $c=\\tfrac32$. Accept $Y$ when $U\\le4Y(1-Y)$. The acceptance probability is
$$P(\\text{accept})=\\int_0^14y(1-y)\\,dy=\\frac23=\\frac1c,$$
so you need $1.5$ proposals per sample on average. A million proposals gives about 667,000 samples. Their mean should be $\\tfrac12$ and their variance $\\tfrac1{20}$.

**Importance sampling.** For rare events, plain Monte Carlo fails: to estimate $p=P(Z>4)\\approx3.17\\times10^{-5}$ with 10% relative error needs about $3\\times10^6$ samples. Instead, sample from a density $h$ concentrated where the event happens, and reweight:
$$E_f[g(X)]=E_h\\Big[g(X)\\frac{f(X)}{h(X)}\\Big],$$
which requires $h>0$ wherever $gf\\ne0$. With $h$ the density of $N(4,1)$, the weight is $e^{-4x+8}$, and $10^5$ samples give a relative error below 1%. A poor choice of $h$ can give infinite variance, so check the spread of the weights.`,
          resources: [
            numpyRandom('Read how to create a Generator with a seed, and how to use its distribution methods.', true),
            {
              title: 'Rejection sampling',
              url: 'https://en.wikipedia.org/wiki/Rejection_sampling',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'The algorithm, its proof, and a comparison with other methods.',
            },
            {
              title: 'Importance sampling',
              url: 'https://en.wikipedia.org/wiki/Importance_sampling',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'The basic estimator and its use for rare events.',
            },
          ],
          exercises: [
            {
              slug: 'rejection-proof',
              title: 'Why rejection sampling works',
              prompt: `Prove that an accepted $Y$ has density $f$ and that the acceptance probability on each try is $1/c$. Find the distribution and mean of the number of proposals per accepted sample. What changes if $f$ is known only up to a constant, and you use a bound $\\tilde f\\le\\tilde c\\,g$ for the unnormalised $\\tilde f$?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Compute $P(Y\\le x\\mid\\text{accept})$ directly as a ratio of integrals.',
            },
            {
              slug: 'monte-carlo-integral',
              title: 'An integral with error bars',
              prompt: `Estimate $\\int_0^1e^{x^2}dx$ by Monte Carlo with $n=10^6$, giving a 95% interval, and compare with quadrature. Repeat 1000 times with $n=10^4$ and check that about 95% of your intervals contain the quadrature value. Then use antithetic pairs $(U,1-U)$ and report the variance reduction.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'The value is about $1.46265$. The per-sample standard deviation is about $0.4745$, which gives a standard error near $4.7\\times10^{-4}$.',
            },
            {
              slug: 'importance-tail',
              title: 'A tail probability by importance sampling',
              prompt: `Estimate $P(Z>4)$ for a standard normal $Z$ with (a) plain Monte Carlo at $n=10^6$, and (b) importance sampling from $N(a,1)$ at $n=10^5$, for $a=2,3,4,5,6$. Derive the weight. Plot relative error against $a$ and explain why the best $a$ is near 4.`,
              kind: 'simulation',
              difficulty: 3,
              hint: 'The weight is $e^{-ax+a^2/2}$. Exact value: $3.167\\times10^{-5}$.',
            },
            {
              slug: 'test-your-sampler',
              title: 'Test your sampler',
              prompt: `Write inverse-CDF samplers for the exponential, Weibull with $P(T>t)=e^{-t^2}$, and Cauchy, using a seeded generator. Test each with a Kolmogorov-Smirnov test at $n=10^5$, and compare sample moments with exact values where they exist. Then plant a deliberate bug, such as a wrong rate, and confirm that the test catches it.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'By what factor must $n$ grow to cut the Monte Carlo error by 10?',
              answerOutline: '100.',
            },
            {
              question: 'What must hold for rejection sampling to work?',
              answerOutline: '$f\\le c\\,g$ everywhere, for some finite $c$.',
            },
            {
              question: 'Why is a seed useful if the output is meant to be random?',
              answerOutline: 'It makes a run reproducible, so results can be checked and bugs can be repeated.',
            },
          ],
          relatedLessons: [
            'probability-statistics/limit-theorems-and-sampling/random-numbers-and-simulation',
            'computational-physics/monte-carlo-methods/monte-carlo-integration',
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'ruin-of-an-insurer',
    title: 'The ruin of an insurer',
    description: `An insurer starts with capital $u$ and collects premiums continuously at rate $c$. Claims arrive as a Poisson process with rate $\\lambda$, and sizes are i.i.d. with mean $\\mu$, so the surplus at time $t$ is
$$U(t)=u+ct-\\sum_{i=1}^{N(t)}X_i.$$
This is the Cramér-Lundberg model. Ruin occurs if $U(t)<0$ at some time. Your project is to derive, compute and simulate the probability of ruin $\\psi(u)$, using nearly everything in the course.

For exponential claims with mean $\\mu$, there is an exact answer when $c>\\lambda\\mu$:
$$\\psi(u)=\\frac{\\lambda\\mu}{c}\\exp\\Big(-\\big(\\tfrac1\\mu-\\tfrac\\lambda c\\big)u\\Big).$$
Use the base case $\\lambda=1$, $\\mu=1$, $c=1.2$ as a benchmark. It gives $\\psi(0)\\approx0.8333$, $\\psi(5)\\approx0.3622$, $\\psi(10)\\approx0.1574$ and $\\psi(20)\\approx0.0297$. The Lundberg exponent $R$, defined by $\\lambda(M_X(R)-1)=cR$, is $\\tfrac16$ here.

The course connects as follows. The claim count is a Poisson process (Module 6), the aggregate claim is a random sum (Module 4), and the net profit condition $c>\\lambda\\mu$ comes from the strong law (Module 5). Observing the surplus at claim times gives a random walk, and ruin is the event that the walk exceeds $u$. The exponent $R$ comes from the moment generating function (Module 5), the bound $\\psi(u)\\le e^{-Ru}$ is a Chernoff-style result, and direct simulation fails for large $u$ because ruin is rare, which makes it a natural use of importance sampling.

For that last step, change measure by exponential tilting: under the tilted law, the walk drifts upward and ruin is certain, so each path contributes a weight of $\\exp(-R\\,(\\text{level reached at ruin}))$ and the estimator has low variance.`,
    deliverables: [
      'A derivation, in your own words, of the net profit condition from the strong law, and of the equation for $R$ from the random walk at claim times',
      'A proof of the Lundberg bound $\\psi(u)\\le e^{-Ru}$, or a clear exposition of the martingale or induction argument, with every hypothesis stated',
      'A tested simulator of surplus paths, with a truncation rule that you justify and whose bias you estimate',
      'A table of $\\psi(u)$ for $u=0,5,10,20$ from direct simulation and from importance sampling, each with a 95% interval, compared with the exact values for the base case',
      'An estimate of the sample size each method needs for 5% relative error at $u=20$',
      'A second experiment with a claim distribution of your choice, such as gamma with shape 2, or a discussion of why heavy-tailed claims such as Pareto have no Lundberg exponent, with simulations showing how $\\psi(u)$ then decays',
      'A written report of about 6-10 pages that is reproducible from a seeded script',
    ],
    estimatedHours: 10,
    stretchGoals: [
      'Compute $P(\\text{ruin before time }T)$ by simulation and compare with a normal approximation to the surplus',
      'Add reinsurance, and find the premium loading needed to keep $\\psi(u)$ below a target',
      'Derive the exact exponential formula from a renewal equation for $\\psi$',
    ],
  },
  masteryChecklist: [
    'I can build a probability model from the axioms and derive the standard rules from them',
    'I can solve counting problems and check them by exact enumeration or simulation',
    'I can use conditioning, total probability and Bayes\' theorem to break a hard problem into stages',
    'I can compute expectations with indicators, even when the distribution is out of reach',
    'I can work with the standard discrete and continuous families and state their parameter conventions',
    'I can find the distribution of a transformed variable, a sum or an order statistic',
    'I can treat $E[X\\mid Y]$ as a random variable and use the tower property and the law of total variance',
    'I can prove the weak law of large numbers and the central limit theorem under stated assumptions, and say what each hypothesis does',
    'I can choose a suitable tail bound and compare it with the exact value',
    'I can analyse a finite Markov chain and a Poisson process',
    'I can write a simulation with a seed and an honest error bar, and use importance sampling for rare events',
  ],
});
