import { defineSubject } from '../define';

export default defineSubject({
  id: 'discrete-mathematics',
  title: 'Discrete Mathematics for Computer Science',
  category: 'cs',
  tagline:
    'Logic, proof, sets, number theory, counting, graphs, recurrences and discrete probability: the mathematics that computing is made of, learned by proving and by programming.',
  description: `Computer science is built on discrete mathematics the way physics is built on calculus. Every algorithm's correctness is a proof by induction, every data structure is a graph or a relation, every cryptographic key is a fact about modular arithmetic, and every running-time bound is a recurrence or a counting argument. This subject teaches that mathematics directly, with the emphasis a computer scientist needs: precise definitions, rigorous but readable proofs, and the habit of checking a claim by computing small cases.

The spine is *Mathematics for Computer Science* by Lehman, Leighton and Meyer, the free MIT 6.042J text, supplemented by Hammack's *Book of Proof* for proof technique, Levin's *Discrete Mathematics: An Open Introduction* for counting and graphs, Stein's *Elementary Number Theory* for RSA, and Grinstead and Snell for probability. Every lesson pairs reading and proof exercises with a short program: you will write a truth-table generator, a proof checker for a tiny logic, a modular-exponentiation and RSA toolkit, a combinatorics verifier, a graph library, and a Monte Carlo simulator to check probabilities you computed by hand.

By the end you should be able to read and write proofs confidently (direct, contrapositive, contradiction, induction, strong induction, invariants), count anything finite, reason about graphs and trees, solve recurrences, and compute probabilities and expectations for discrete processes. That is exactly the preparation Data Structures and Algorithms and Theory of Computation assume.`,
  difficulty: 'beginner',
  estimatedHours: 70,
  prerequisites: [],
  recommendedBackground: [
    'Secondary-school algebra: manipulating expressions, exponents and logarithms',
    'Basic Python (the first three modules of Programming Fundamentals) for the computational exercises',
    'Patience for reading slowly: a page of mathematics takes ten times longer than a page of prose',
  ],
  tags: ['logic', 'proofs', 'sets', 'number theory', 'combinatorics', 'graph theory', 'recurrences', 'probability'],
  core: true,
  modules: [
    {
      slug: 'logic-and-proofs',
      title: 'Logic and Proofs',
      description:
        'Propositions, connectives, quantifiers and the rules of inference, then the standard proof techniques: direct, contrapositive, contradiction and cases, written clearly enough for another person to check.',
      lessons: [
        {
          slug: 'propositions-and-connectives',
          title: 'Propositions, connectives and truth tables',
          summary:
            'What a proposition is, the five connectives and their truth tables, and how to test whether two compound propositions mean the same thing.',
          estimatedMinutes: 90,
          objectives: [
            'Translate English statements into propositional formulas and back',
            'Build the truth table of any formula and identify tautologies, contradictions and contingencies',
            'Prove logical equivalences with truth tables and with the algebraic laws (De Morgan, distributivity, implication)',
            'Explain the truth table of implication and why a false hypothesis makes it true',
          ],
          concepts: [
            'Proposition: a statement that is true or false',
            'Connectives: not, and, or, implies, iff',
            'Truth table; 2^n rows for n variables',
            'Tautology, contradiction, contingency',
            'Logical equivalence and the laws of propositional logic',
            'Implication: converse, inverse, contrapositive',
            'Exclusive or; inclusive or in mathematics',
            'Satisfiability (preview of SAT)',
          ],
          explanation: `A **proposition** is a statement that is definitely true or false: "17 is prime" (true), "$2 + 2 = 5$" (false). "x > 3" is not a proposition until x is fixed. Propositional logic studies how truth flows through **connectives**: $\\neg P$ (not), $P \\wedge Q$ (and), $P \\vee Q$ (or, inclusive), $P \\to Q$ (implies), $P \\leftrightarrow Q$ (if and only if). Each is *defined* by its **truth table**, and a formula with $n$ variables has a table of $2^n$ rows.

The table for **implication** is the one that surprises everyone: $P \\to Q$ is false only when $P$ is true and $Q$ is false. "If it rains, the ground is wet" is not refuted by a dry day. The consequence is that a false hypothesis makes any implication true (*vacuous truth*), which is exactly what lets a theorem about "all even primes greater than 2" be true. Keep the four related statements straight: the **converse** $Q \\to P$ and **inverse** $\\neg P \\to \\neg Q$ are *not* equivalent to $P \\to Q$; the **contrapositive** $\\neg Q \\to \\neg P$ *is*, and that equivalence is the basis of a whole proof technique.

Two formulas are **logically equivalent** when their truth tables agree on every row. You can check by table, or you can rewrite using laws: De Morgan ($\\neg(P \\wedge Q) \\equiv \\neg P \\vee \\neg Q$), distributivity, double negation, and the key rewrite $P \\to Q \\equiv \\neg P \\vee Q$. A formula true on every row is a **tautology**; false on every row a **contradiction**; true on at least one row **satisfiable**. Deciding satisfiability efficiently is the famous SAT problem, which Theory of Computation returns to.

Read MCS chapter 3 (sections 3.1-3.4) and forall x chapters on truth tables. Then write the truth-table generator in the exercises: it is twenty lines of Python and it will settle every equivalence question you have for the rest of the subject.`,
          resources: [
            {
              title: 'Mathematics for Computer Science (Lehman, Leighton, Meyer) — Chapter 3: Logical Formulas',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The free textbook PDF for MIT 6.042J; used throughout this subject.',
              primary: true,
            },
            {
              title: 'forall x: Calgary — An Introduction to Formal Logic',
              url: 'https://forallx.openlogicproject.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Open Logic Project',
              note: 'Part II (truth-functional logic): symbolisation and truth tables.',
            },
            {
              title: 'Discrete Mathematics: An Open Introduction (Levin) — Chapter 3: Symbolic Logic and Proofs',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
            {
              title: 'MIT 6.042J Mathematics for Computer Science (Spring 2015) — course home',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture videos, problem sets with solutions.',
            },
          ],
          exercises: [
            {
              slug: 'truth-table-generator',
              title: 'Write a truth-table generator',
              prompt:
                'Write a Python function truth_table(formula, variables) where formula is a Python lambda over booleans, that prints all 2^n rows and reports whether the formula is a tautology, contradiction or contingency. Use it to verify: P -> Q is equivalent to not P or Q; (P -> Q) and (Q -> R) -> (P -> R) is a tautology; P -> Q is not equivalent to Q -> P. Expected: the first and third comparisons agree on all 4 rows / differ on 2 rows respectively.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'translate-english',
              title: 'Translate English into logic',
              prompt:
                'Translate into propositional formulas with named atoms: "You can access the site only if you are registered and not banned"; "Either the test fails or the build succeeds, but not both"; "If it is not raining then I will walk, and if it rains I will take the bus". Then write the converse, inverse and contrapositive of the third sentence in English and say which are equivalent to the original.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'algebraic-equivalences',
              title: 'Prove equivalences algebraically',
              prompt:
                'Using only the named laws (De Morgan, distributivity, absorption, implication rewrite, double negation), show step by step that (P -> Q) and (P -> R) is equivalent to P -> (Q and R), and that not (P -> Q) is equivalent to P and not Q. Check each with your truth-table generator.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'satisfiability-brute-force',
              title: 'Brute-force SAT',
              prompt:
                'Write is_satisfiable(clauses, n) for formulas in conjunctive normal form (a list of clauses, each a list of signed variable indices) by trying all 2^n assignments. Test on (x1 or x2) and (not x1 or x3) and (not x2 or not x3) and (x1 or not x3) (satisfiable) and on a small unsatisfiable set. Time n = 10, 15, 20 and extrapolate to n = 50.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When is P -> Q false?',
              answerOutline: 'Only when P is true and Q is false; in every other row it is true, including when P is false (vacuous truth).',
            },
            {
              question: 'Which of converse, inverse, contrapositive is equivalent to P -> Q?',
              answerOutline: 'Only the contrapositive, not Q -> not P. Converse and inverse are equivalent to each other but not to the original.',
            },
            {
              question: 'State De Morgan\'s laws.',
              answerOutline: 'not (P and Q) = (not P) or (not Q); not (P or Q) = (not P) and (not Q).',
            },
            {
              question: 'How many rows does the truth table of a formula with 6 variables have?',
              answerOutline: '2^6 = 64.',
            },
          ],
        },
        {
          slug: 'predicates-and-quantifiers',
          title: 'Predicates and quantifiers',
          summary:
            'Statements with variables, the universal and existential quantifiers, how to negate them, and why the order of quantifiers changes meaning.',
          estimatedMinutes: 90,
          objectives: [
            'Write mathematical statements with for-all and there-exists over a stated domain',
            'Negate a quantified statement correctly by pushing the negation inward',
            'Explain why switching the order of two different quantifiers changes the meaning',
            'Prove or refute simple quantified statements with a witness or a counterexample',
          ],
          concepts: [
            'Predicate P(x); domain of discourse',
            'Universal quantifier (for all) and existential quantifier (there exists)',
            'Negation rules: not forall = exists not; not exists = forall not',
            'Nested quantifiers and order (forall x exists y vs exists y forall x)',
            'Counterexample refutes a universal; witness proves an existential',
            'Bounded quantifiers and restricting the domain',
            'Uniqueness (there exists exactly one)',
            'Reading definitions such as the epsilon-delta limit as quantified statements',
          ],
          explanation: `Propositional logic cannot say "every integer has a successor" because it has no variables. A **predicate** is a statement with a free variable, $P(x)$: "$x$ is prime". It becomes a proposition when you plug in a value or **quantify**: $\\forall x \\in \\mathbb{N}.\\, P(x)$ ("for all natural numbers $x$, $P(x)$") or $\\exists x \\in \\mathbb{N}.\\, P(x)$ ("there exists an $x$ with $P(x)$"). Always state the **domain**; "$\\forall x.\\, x^2 \\ge 0$" is true over the reals and meaningless without that.

The **negation rules** are the ones you will use daily: $\\neg \\forall x. P(x) \\equiv \\exists x. \\neg P(x)$ and $\\neg \\exists x. P(x) \\equiv \\forall x. \\neg P(x)$. To refute "all swans are white" you exhibit one non-white swan: a **counterexample**. To prove "there is a prime above 100" you exhibit one: a **witness**. Pushing a negation through several quantifiers flips each one and finally negates the predicate; practise until it is mechanical, because "assume the statement is false" in a proof by contradiction means exactly this.

**Order matters** when quantifiers differ. $\\forall x\\, \\exists y.\\, y > x$ ("every number has a bigger one") is true over the integers; $\\exists y\\, \\forall x.\\, y > x$ ("some number is bigger than all numbers") is false. Picture it as a game: the $\\forall$ player moves first and the $\\exists$ player responds knowing that move. Many famous definitions are nested quantifiers: a function is continuous at $a$ when $\\forall \\varepsilon > 0\\, \\exists \\delta > 0\\, \\forall x\\, (|x - a| < \\delta \\to |f(x) - f(a)| < \\varepsilon)$, and "not continuous" is obtained by the mechanical flip.

Read MCS 3.5-3.6 and Book of Proof chapter 2.7-2.10. The programming exercise builds a checker for quantified statements over small finite domains; it makes the quantifier-order difference tangible.`,
          resources: [
            {
              title: 'Book of Proof (Hammack) — Chapter 2: Logic (sections 2.7-2.10 on quantifiers and negation)',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
              primary: true,
            },
            {
              title: 'MCS — Chapter 3.5-3.6: Predicate Formulas and quantifier order',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'forall x: Calgary — Part IV: First-order logic',
              url: 'https://forallx.openlogicproject.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Open Logic Project',
            },
          ],
          exercises: [
            {
              slug: 'finite-domain-checker',
              title: 'Quantifier checker over finite domains',
              prompt:
                'Using Python all() and any(), evaluate over the domain D = range(1, 11): forall x exists y: y > x (False, no y for x=10); exists y forall x: y >= x (True, y=10); forall x exists y: x + y == 11 (True); exists x forall y: x * y == y (True, x=1). Then write negate() that prints the negation of each statement in words and confirm the truth values flip.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'negation-drills',
              title: 'Negation drills',
              prompt:
                'Negate, pushing the negation all the way inward, and then say which (statement or negation) is true over the integers: (a) forall x exists y: x + y = 0; (b) exists x forall y: x <= y; (c) forall x forall y: (x < y -> exists z: x < z < y); (d) forall epsilon > 0 exists N forall n >= N: 1/n < epsilon (over naturals and positive reals).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'witness-or-counterexample',
              title: 'Witness or counterexample',
              prompt:
                'Decide each and justify with a witness or counterexample: every integer n has n^2 + n + 41 prime; there is an integer n > 1 with 2^n - 1 composite and n prime; every even number from 4 to 1000 is a sum of two primes (write code to check Goldbach up to 1000 and report the largest even number tested).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the negation of "for all x there exists y such that P(x, y)"?',
              answerOutline: 'There exists x such that for all y, not P(x, y).',
            },
            {
              question: 'Give an example where swapping quantifier order changes the truth value.',
              answerOutline: 'Over integers: forall x exists y (y > x) is true; exists y forall x (y > x) is false.',
            },
            {
              question: 'What does it take to refute a universal statement? To prove an existential one?',
              answerOutline: 'One counterexample; one witness.',
            },
          ],
        },
        {
          slug: 'proof-techniques',
          title: 'Direct proof, contrapositive, contradiction and cases',
          summary:
            'The standard shapes of a proof, how to choose among them, and how to write a proof that another person can check line by line.',
          estimatedMinutes: 120,
          objectives: [
            'Write a direct proof of an implication from definitions (even, odd, divides, rational)',
            'Choose between contrapositive and contradiction and explain why each is valid',
            'Structure a proof by cases and make sure the cases are exhaustive',
            'Critique a flawed proof and name the error (circularity, unjustified step, missing case)',
          ],
          concepts: [
            'Definitions as the starting point (even, odd, divides, rational, prime)',
            'Direct proof: assume P, derive Q',
            'Proof by contrapositive: assume not Q, derive not P',
            'Proof by contradiction: assume not (statement), derive absurdity',
            'Proof by cases and exhaustiveness',
            'Existence proofs: constructive and non-constructive',
            'Disproof by counterexample',
            'Proof writing: words, structure, signposting',
          ],
          explanation: `A **proof** is an argument so precise that a skeptical reader can check every step from the definitions and previously proved facts. Learning to write one starts with the **definitions**: $n$ is *even* iff $n = 2k$ for some integer $k$; $a$ *divides* $b$ iff $b = ac$ for some integer $c$; $x$ is *rational* iff $x = p/q$ with integers $p, q \\neq 0$. Most elementary proofs are "unpack the definition, do algebra, repack the definition".

**Direct proof** of $P \\to Q$: assume $P$, derive $Q$. To show the sum of two odds is even: write $a = 2k + 1$, $b = 2m + 1$, then $a + b = 2(k + m + 1)$, done. **Contrapositive**: to prove $P \\to Q$, assume $\\neg Q$ and derive $\\neg P$; it is valid because the two are equivalent. Use it when $\\neg Q$ is easier to work with, as in "if $n^2$ is even then $n$ is even" (assume $n$ odd, show $n^2$ odd). **Contradiction**: assume the whole statement is false and derive something impossible; the proof that $\\sqrt{2}$ is irrational is the classic. Contradiction is powerful but produces less information; prefer direct or contrapositive when you can.

**Cases** split the world (n even or odd; $x \\ge 0$ or $x < 0$) and prove the claim in each; the danger is a missing case, so state why the cases are exhaustive. **Existence** is proved by exhibiting a witness (constructive) or by showing non-existence is impossible (non-constructive); **universal claims** are disproved by one counterexample.

Writing matters as much as logic. Start by stating what you will prove and which technique; introduce every variable ("let $k$ be an integer with $n = 2k$"); justify each step briefly; end by saying what was shown. Read Book of Proof chapters 4-7 (they are short and have many worked examples) and MCS chapter 1. The exercises ask for written proofs and for critiques of bad proofs; do both, because finding the hole in a wrong proof is how you learn to avoid it.`,
          resources: [
            {
              title: 'Book of Proof — Chapters 4-7: Direct Proof, Contrapositive, Contradiction, Non-conditional statements',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
              note: 'The best free source for proof technique; do the odd-numbered exercises (solutions in the back).',
              primary: true,
            },
            {
              title: 'MCS — Chapter 1: What is a Proof?',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Includes the "proof writing" advice section; follow it.',
            },
            {
              title: 'Stanford CS103 — Mathematical Foundations of Computing (proof writing guides)',
              url: 'https://web.stanford.edu/class/cs103/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'The course site hosts guides to proof style and common mistakes.',
            },
            {
              title: 'Berkeley CS70 — Discrete Mathematics and Probability Theory (Notes 1-2)',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'six-proofs',
              title: 'Write six proofs',
              prompt:
                'Prove, choosing the technique and naming it: (1) the product of two odd integers is odd; (2) if n^2 is divisible by 3 then n is divisible by 3; (3) sqrt(3) is irrational; (4) for every integer n, n^2 + n is even (cases); (5) there is no largest prime (contradiction, Euclid); (6) if a divides b and b divides c then a divides c. Each proof in full sentences, under half a page.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'find-the-flaw',
              title: 'Find the flaw',
              prompt:
                'Each "proof" below has an error; name it. (a) "Claim: 1 = 2. Let a = b. Then a^2 = ab, a^2 - b^2 = ab - b^2, (a-b)(a+b) = b(a-b), a+b = b, 2b = b, 2 = 1." (b) "Claim: all horses are the same colour" (look up the induction version and identify the failing step). (c) "If x^2 = 4 then x = 2, since sqrt(x^2) = x." (d) A direct proof of "if n is even then n^2 is even" that starts "assume n^2 is even".',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'proof-by-computation',
              title: 'Check before you prove',
              prompt:
                'Before proving that n^3 - n is divisible by 6 for all integers n, write a script checking it for n from -1000 to 1000. Then prove it (hint: factor as (n-1)n(n+1) and use cases mod 2 and mod 3). Then test the false claim "n^2 + n + 41 is prime for all n >= 0" by computation and report the first counterexample.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'rewrite-a-proof',
              title: 'Rewrite a proof for a reader',
              prompt:
                'Take your proof of (2) from the six-proofs exercise and rewrite it with: a first sentence stating the claim and technique, every variable introduced before use, one justification per step, and a closing sentence. Give both versions to someone else (or re-read after a day) and note which steps they could not follow.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is proof by contrapositive valid?',
              answerOutline: 'P -> Q and not Q -> not P are logically equivalent (same truth table), so proving one proves the other.',
            },
            {
              question: 'What must you check in a proof by cases?',
              answerOutline: 'That the cases cover every possibility (exhaustive) and that the claim is proved in each.',
            },
            {
              question: 'How does a proof by contradiction of "sqrt 2 is irrational" begin and end?',
              answerOutline: 'Assume sqrt 2 = p/q in lowest terms; derive that p and q are both even, contradicting lowest terms.',
            },
            {
              question: 'What is the first thing to write down when asked to prove a statement about even numbers?',
              answerOutline: 'The definition: n is even iff n = 2k for some integer k; then introduce the variables.',
            },
          ],
        },
        {
          slug: 'rules-of-inference-and-formal-proofs',
          title: 'Rules of inference and formal proof systems',
          summary:
            'Modus ponens and friends, natural deduction as a game with rules, and what a proof checker does, with a taste of proof assistants.',
          estimatedMinutes: 90,
          objectives: [
            'State and apply the basic rules of inference (modus ponens, modus tollens, syllogism, introduction/elimination rules)',
            'Construct a short natural-deduction proof and check each line cites a rule',
            'Explain soundness and completeness of a proof system in one sentence each',
            'Use a proof assistant or checker on a toy problem and relate it to informal proofs',
          ],
          concepts: [
            'Modus ponens, modus tollens, hypothetical and disjunctive syllogism',
            'Introduction and elimination rules for each connective',
            'Natural deduction and subproofs (assumption discharge)',
            'Soundness: every provable formula is valid; completeness: every valid formula is provable',
            'Axioms vs rules; proof as a finite object',
            'Proof checkers and proof assistants (Lean)',
            'Fallacies: affirming the consequent, denying the antecedent',
            'Informal proof as a sketch of a formal one',
          ],
          explanation: `Informal proofs are sketches; underneath each one is a sequence of steps each justified by a **rule of inference**. The most basic is **modus ponens**: from $P$ and $P \\to Q$, conclude $Q$. Its partner **modus tollens**: from $\\neg Q$ and $P \\to Q$, conclude $\\neg P$ (this is contrapositive reasoning in one step). **Hypothetical syllogism** chains implications; **disjunctive syllogism** goes from $P \\vee Q$ and $\\neg P$ to $Q$. Two tempting *fallacies* are not rules: from $Q$ and $P \\to Q$ you cannot conclude $P$ (affirming the consequent), and from $\\neg P$ and $P \\to Q$ you cannot conclude $\\neg Q$ (denying the antecedent); check them with a truth table.

**Natural deduction** organises these into **introduction** and **elimination** rules for each connective. To prove $P \\wedge Q$, prove both ($\\wedge$-intro); from $P \\wedge Q$ you may take either ($\\wedge$-elim). To prove $P \\to Q$, open a **subproof** assuming $P$, derive $Q$, then close it and conclude $P \\to Q$ ($\\to$-intro): this is exactly "assume $P$" in a direct proof, made precise, and it explains *why* assumptions inside a subproof may not be used outside it. Proof by contradiction is $\\neg$-intro: assume $P$, derive $\\bot$, conclude $\\neg P$.

A proof system is **sound** if everything it proves is actually valid, and **complete** if everything valid can be proved. Propositional and first-order natural deduction are both; Gödel's theorems (Theory of Computation) concern what happens when arithmetic is added.

Because a formal proof is a finite object with mechanical rules, a program can **check** it. Proof assistants such as Lean take this seriously: you write the proof interactively and the machine verifies every step. The Natural Number Game is a gentle way to feel this; play a few levels and compare with your written proofs from the previous lesson. Read forall x Part III and MCS 3.4 on proving validity; the exercises include writing a tiny checker.`,
          resources: [
            {
              title: 'forall x: Calgary — Part III: Natural deduction for TFL',
              url: 'https://forallx.openlogicproject.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Open Logic Project',
              primary: true,
            },
            {
              title: 'The Open Logic Project (textbook on logic, proof systems, soundness and completeness)',
              url: 'https://openlogicproject.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Open Logic Project',
              note: 'Reference for the soundness/completeness discussion; dip in, do not read cover to cover.',
            },
            {
              title: 'Lean Game Server — Natural Number Game',
              url: 'https://adam.math.hhu.de/',
              type: 'interactive',
              cost: 'free',
              provider: 'Lean community',
              note: 'Play the Natural Number Game: tutorial and addition worlds (an hour or two).',
            },
            {
              title: 'MCS — Chapter 3.4: Proving validity (and rules of inference in Chapter 1)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'rule-validity',
              title: 'Validate the rules, refute the fallacies',
              prompt:
                'Using your truth-table generator, confirm that modus ponens, modus tollens, hypothetical syllogism and disjunctive syllogism are valid (the conjunction of premises implies the conclusion is a tautology), and show affirming the consequent and denying the antecedent are invalid by printing the countermodel rows.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'natural-deduction-proofs',
              title: 'Three natural-deduction proofs',
              prompt:
                'Write line-by-line natural deduction proofs (each line: formula, rule, lines cited) for: (P -> Q), (Q -> R) entail P -> R; P and (Q or R) entail (P and Q) or (P and R); not (P or Q) entails not P and not Q. Mark the subproofs and where assumptions are discharged.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'tiny-proof-checker',
              title: 'A tiny proof checker',
              prompt:
                'Represent a proof as a list of (formula, justification) where justification is "premise", ("MP", i, j), ("MT", i, j), ("AND_I", i, j), ("AND_E1", i), ("AND_E2", i) over formulas as nested tuples. Write check(proof) that verifies every line follows by the cited rule from earlier lines. Test with a correct 6-line proof and three broken ones (wrong rule, forward reference, wrong lines).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'natural-number-game',
              title: 'Natural Number Game: tutorial and addition worlds',
              prompt:
                'Complete the tutorial world and the addition world of the Natural Number Game. For the proof of add_comm (commutativity of addition), write out the corresponding informal induction proof in English and mark which Lean tactic corresponds to which informal step.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State modus tollens and explain why it is valid.',
              answerOutline: 'From P -> Q and not Q, infer not P; valid because P -> Q is equivalent to its contrapositive not Q -> not P, then modus ponens.',
            },
            {
              question: 'Why can an assumption made inside a subproof not be used after the subproof closes?',
              answerOutline: 'It was only hypothetically assumed to derive an implication; outside the subproof it has not been established.',
            },
            {
              question: 'What do soundness and completeness mean for a proof system?',
              answerOutline: 'Sound: everything provable is true/valid. Complete: everything valid is provable.',
            },
          ],
        },
      ],
      project: {
        slug: 'logic-toolkit',
        title: 'Module project: a propositional logic toolkit',
        description:
          'Write a small Python library that parses propositional formulas from strings (with not, and, or, ->, <->), builds truth tables, decides tautology/satisfiability/equivalence, converts to conjunctive normal form, and checks natural-deduction proofs for modus ponens, modus tollens and the and/or rules. Use it to verify every equivalence and inference rule from this module.',
        deliverables: [
          'A parser (recursive descent over a tokenised string) with tests for precedence and parentheses',
          'truth_table, is_tautology, is_equivalent and to_cnf functions with tests',
          'A proof checker and at least three checked proofs, plus a README listing every law verified',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'sets-functions-relations',
      title: 'Sets, Functions and Relations',
      description:
        'The language in which everything else is written: sets and their operations, functions and their properties, relations, equivalence and order, and the sizes of infinite sets.',
      lessons: [
        {
          slug: 'sets-and-set-operations',
          title: 'Sets and set operations',
          summary:
            'Membership, subsets, union, intersection, complement, power set and Cartesian product, with proofs of set identities by the element method.',
          estimatedMinutes: 90,
          objectives: [
            'Use set-builder notation and the membership and subset relations precisely',
            'Prove set identities with the element method (double inclusion) and with membership tables',
            'Compute power sets and Cartesian products and state their sizes',
            'Map set operations onto Python sets and comprehensions',
          ],
          concepts: [
            'Set, element, membership, the empty set',
            'Subset vs element; equality by double inclusion',
            'Union, intersection, difference, complement, symmetric difference',
            'Set-builder notation',
            'Power set and its size 2^n',
            'Cartesian product and ordered pairs',
            'Venn diagrams as intuition, not proof',
            'Russell\'s paradox and why "the set of all sets" is forbidden',
          ],
          explanation: `A **set** is an unordered collection of distinct objects; $x \\in A$ says $x$ is an element. $\\{1, 2, 2\\} = \\{1, 2\\}$. The **empty set** $\\emptyset$ has no elements. $A \\subseteq B$ means every element of $A$ is in $B$; two sets are **equal** exactly when each is a subset of the other, which gives the standard proof pattern: to prove $A = B$, prove $A \\subseteq B$ and $B \\subseteq A$, each by taking an arbitrary element. Watch the distinction between $\\in$ and $\\subseteq$: $1 \\in \\{1, 2\\}$, $\\{1\\} \\subseteq \\{1, 2\\}$, $\\{1\\} \\in \\{\\{1\\}, 2\\}$.

**Set-builder notation** $\\{x \\in \\mathbb{Z} : x^2 < 10\\}$ reads "the set of integers $x$ such that $x^2 < 10$" and is exactly a Python comprehension \`{x for x in range(-10, 11) if x*x < 10}\`. The operations are $A \\cup B$, $A \\cap B$, $A \\setminus B$, the complement $\\overline{A}$ relative to a universe, and the symmetric difference $A \\triangle B$; the identities (De Morgan, distributivity, absorption) mirror the logical laws because membership in a union is an *or*, in an intersection an *and*. That correspondence gives a second proof method: a **membership table** with a row for each combination of "in $A$ / in $B$ / in $C$", which is just a truth table.

The **power set** $\\mathcal{P}(A)$ is the set of all subsets of $A$; if $|A| = n$ then $|\\mathcal{P}(A)| = 2^n$, because each element is independently in or out. The **Cartesian product** $A \\times B$ is the set of ordered pairs $(a, b)$, with $|A \\times B| = |A| \\cdot |B|$; $\\mathbb{R}^2$ is a Cartesian product and so is every database table.

Finally, not every description defines a set: Russell's $\\{x : x \\notin x\\}$ leads to contradiction, which is why set theory restricts set formation. Read MCS chapter 4.1 and Book of Proof chapters 1 and 8 (proofs involving sets). The exercises prove identities both ways and compute with Python sets.`,
          resources: [
            {
              title: 'Book of Proof — Chapter 1: Sets, and Chapter 8: Proofs Involving Sets',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
              primary: true,
            },
            {
              title: 'MCS — Chapter 4: Mathematical Data Types (4.1 Sets)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Python set types reference',
              url: 'https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'double-inclusion-proofs',
              title: 'Prove set identities by double inclusion',
              prompt:
                'Prove with the element method: A \\ (B ∪ C) = (A \\ B) ∩ (A \\ C); A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C); if A ⊆ B then P(A) ⊆ P(B). Then verify the first two with a membership table and with random Python sets (1000 random triples of subsets of range(10)).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'power-set-generator',
              title: 'Generate power sets and products',
              prompt:
                'Write powerset(s) returning a list of frozensets (use itertools or binary counting) and verify len(powerset(range(n))) == 2**n for n = 0..10. Write product(a, b) by comprehension and check len is |a|*|b|. Then count subsets of range(10) with exactly 3 elements and compare with math.comb(10, 3).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'element-vs-subset',
              title: 'Element or subset?',
              prompt:
                'Let A = {1, {1}, {1, 2}, ∅}. Decide true/false and justify: 1 ∈ A; {1} ∈ A; {1} ⊆ A; {{1}} ⊆ A; ∅ ∈ A; ∅ ⊆ A; {1, 2} ⊆ A; {∅} ⊆ A. State |A| and |P(A)|. Then encode A in Python with frozensets and check each answer with in and <=.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you prove two sets are equal?',
              answerOutline: 'Show each is a subset of the other: take an arbitrary element of one and show it is in the other, both directions.',
            },
            {
              question: 'What is the size of the power set of a 7-element set and why?',
              answerOutline: '2^7 = 128; each element is independently included or excluded.',
            },
            {
              question: 'Is the empty set a subset of every set? An element of every set?',
              answerOutline: 'Subset of every set (vacuously); element only of sets that contain it.',
            },
            {
              question: 'Why do De Morgan laws hold for sets?',
              answerOutline: 'Membership in union/intersection is defined by or/and, so the logical De Morgan laws transfer element-wise.',
            },
          ],
        },
        {
          slug: 'functions',
          title: 'Functions: injections, surjections and bijections',
          summary:
            'Functions as special relations, the properties injective, surjective and bijective, composition and inverses, and why bijections are how we count.',
          estimatedMinutes: 100,
          objectives: [
            'Define a function with its domain, codomain and image, and distinguish codomain from image',
            'Prove a given function is or is not injective, surjective or bijective',
            'Compose functions and prove the composition of injections is injective',
            'Use the existence of a bijection to show two finite sets have the same size',
          ],
          concepts: [
            'Function as a set of pairs with exactly one output per input',
            'Domain, codomain, image (range)',
            'Injective (one-to-one), surjective (onto), bijective',
            'Composition and its associativity',
            'Inverse function exists iff bijective',
            'Bijection principle for counting',
            'Pigeonhole principle (preview)',
            'Functions in code: pure functions, hash functions as non-injective maps',
          ],
          explanation: `A **function** $f : A \\to B$ assigns to every element of the **domain** $A$ exactly one element of the **codomain** $B$. Formally it is a set of pairs with the "exactly one output" property. The **image** $f(A) = \\{f(a) : a \\in A\\}$ is the set of outputs actually hit; it can be smaller than the codomain, and keeping the two apart is the key to the definitions that follow.

$f$ is **injective** (one-to-one) if different inputs give different outputs: $f(a_1) = f(a_2) \\Rightarrow a_1 = a_2$. To prove it, assume $f(a_1) = f(a_2)$ and derive $a_1 = a_2$; to disprove, exhibit two inputs with the same output. $f$ is **surjective** (onto) if every element of the codomain is hit: $\\forall b \\in B\\, \\exists a \\in A\\, f(a) = b$; prove it by solving $f(a) = b$ for $a$ in general. **Bijective** means both, and exactly then an **inverse** $f^{-1} : B \\to A$ exists. Note how the properties depend on the stated domain and codomain: $x \\mapsto x^2$ is not injective on $\\mathbb{R}$, is injective on $\\mathbb{R}_{\\ge 0}$, and is surjective onto $\\mathbb{R}_{\\ge 0}$ but not onto $\\mathbb{R}$.

**Composition** $(g \\circ f)(x) = g(f(x))$ is associative; the composition of injections is an injection, of surjections a surjection (prove both: they are two-line proofs from the definitions).

The reason computer scientists care: a **bijection** between finite sets $A$ and $B$ means $|A| = |B|$. Most clever counting arguments are bijections in disguise ("subsets of an $n$-set correspond to binary strings of length $n$"). An injection $A \\to B$ gives $|A| \\le |B|$, and its contrapositive is the **pigeonhole principle**: if $|A| > |B|$ there is no injection, so two elements of $A$ share an image. A hash function is a deliberately non-injective map, and collisions are the pigeonhole principle in action.

Read MCS 4.3-4.5 and Book of Proof chapter 12. The exercises prove properties for specific functions and test them exhaustively on finite domains in Python.`,
          resources: [
            {
              title: 'Book of Proof — Chapter 12: Functions',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
              primary: true,
            },
            {
              title: 'MCS — Chapter 4.3-4.5: Functions, binary relations and the mapping rules',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — Section 0.4 Functions',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
          ],
          exercises: [
            {
              slug: 'classify-functions',
              title: 'Classify eight functions',
              prompt:
                'For each, decide injective/surjective/bijective and prove or give a counterexample: f(n) = 2n on Z -> Z; f(n) = n mod 5 on Z -> {0..4}; f(x) = x^3 on R -> R; f(x) = e^x on R -> R; f(n) = floor(n/2) on N -> N; f(a, b) = 2^a 3^b on N x N -> N; f(S) = |S| on P({1,2,3}) -> {0,1,2,3}; f(s) = s reversed on binary strings of length 4.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'finite-function-checker',
              title: 'Check properties on finite domains',
              prompt:
                'Represent a function on a finite domain as a dict. Write is_injective, is_surjective(f, codomain), is_bijective, compose(g, f) and inverse(f). Enumerate all functions from a 3-element set to a 3-element set (27 of them) and count how many are injective (expected 6), surjective (6) and bijective (6). Repeat for domain 4 to codomain 3 and explain the surjection count (36).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'composition-proofs',
              title: 'Composition proofs',
              prompt:
                'Prove: if f: A -> B and g: B -> C are injective then g ∘ f is injective; if both surjective then g ∘ f is surjective; if g ∘ f is injective then f is injective (but g need not be: give an example). Verify the last claim by searching all small examples in Python.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bijection-counting',
              title: 'Count by bijection',
              prompt:
                'Describe an explicit bijection between subsets of {1..n} and binary strings of length n, and between binary strings of length n with exactly k ones and k-element subsets. Implement both directions in Python and verify round trips for n = 6. Use the first to explain why |P(A)| = 2^n without induction.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you prove a function is injective?',
              answerOutline: 'Assume f(a1) = f(a2) and derive a1 = a2 (or show the contrapositive: a1 != a2 implies different outputs).',
            },
            {
              question: 'What is the difference between codomain and image?',
              answerOutline: 'Codomain is the declared target set; image is the set of values actually attained. Surjective means they coincide.',
            },
            {
              question: 'When does a function have an inverse?',
              answerOutline: 'Exactly when it is a bijection: injective so the inverse is well defined, surjective so it is defined everywhere.',
            },
            {
              question: 'How does a bijection help counting?',
              answerOutline: 'A bijection between two finite sets shows they have the same size; count the easier one.',
            },
          ],
        },
        {
          slug: 'relations-equivalence-and-order',
          title: 'Relations, equivalence relations and partial orders',
          summary:
            'Binary relations and their properties, equivalence relations as partitions, partial orders and Hasse diagrams, and the relations that organise software (dependencies, type hierarchies).',
          estimatedMinutes: 100,
          objectives: [
            'Determine whether a relation is reflexive, symmetric, antisymmetric or transitive and prove it',
            'Prove a relation is an equivalence relation and describe its equivalence classes',
            'Explain the correspondence between equivalence relations and partitions',
            'Recognise partial and total orders, draw a Hasse diagram and find minimal/maximal elements',
          ],
          concepts: [
            'Binary relation as a subset of A x B; relation on a set',
            'Reflexive, symmetric, antisymmetric, transitive',
            'Equivalence relation and equivalence classes',
            'Partition; the quotient set',
            'Congruence mod n as an equivalence relation',
            'Partial order, total order, Hasse diagram',
            'Minimal/maximal, least/greatest, chains and antichains',
            'Relations as directed graphs and as boolean matrices',
          ],
          explanation: `A **relation** $R$ on a set $A$ is just a set of ordered pairs, $R \\subseteq A \\times A$; we write $a R b$ for $(a, b) \\in R$. "$\\le$", "divides", "is a subset of", "has the same remainder mod 5 as" and "imports" (between modules) are all relations. Relations are the same thing as directed graphs (edge $a \\to b$ iff $a R b$) and as boolean matrices, and both pictures help.

Four properties matter. **Reflexive**: $a R a$ for all $a$. **Symmetric**: $a R b \\Rightarrow b R a$. **Antisymmetric**: $a R b$ and $b R a$ imply $a = b$. **Transitive**: $a R b$ and $b R c$ imply $a R c$. Each is a quantified statement, so proving one means taking arbitrary elements and unpacking the definition of $R$; disproving one means a counterexample.

An **equivalence relation** is reflexive, symmetric and transitive. It is the mathematical way of saying "same in some respect": congruence mod $n$, "same length" on strings, "same connected component" on a graph. Its **equivalence classes** $[a] = \\{b : a R b\\}$ **partition** the set: every element lies in exactly one class, and conversely every partition defines an equivalence relation. This is why "mod 12 arithmetic" works on the 12 classes rather than on the integers, and why a union-find structure tracks equivalence classes.

A **partial order** is reflexive, antisymmetric and transitive: $\\le$ on numbers, $\\subseteq$ on sets, "divides" on positive integers, "is a prerequisite of" on courses. Not every pair need be comparable (neither $\\{1\\} \\subseteq \\{2\\}$ nor the reverse); if every pair is, the order is **total**. The **Hasse diagram** draws the order with transitivity and reflexivity implied; from it you read **minimal** elements (nothing below) versus a **least** element (below everything). Topological sorting of a dependency graph (Data Structures and Algorithms) is linearising a partial order into a total one.

Read MCS 4.4 and chapter 10 (partial orders), and Book of Proof chapter 11. The exercises classify real relations and compute equivalence classes and Hasse diagrams programmatically.`,
          resources: [
            {
              title: 'Book of Proof — Chapter 11: Relations',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
              primary: true,
            },
            {
              title: 'MCS — Chapter 4.4 Binary Relations and Chapter 10: Directed graphs and Partial Orders',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Applied Discrete Structures (Doerr and Levasseur) — Chapter 6: Relations',
              url: 'https://discretemath.org/ads/',
              type: 'textbook',
              cost: 'free',
              provider: 'Doerr and Levasseur',
            },
          ],
          exercises: [
            {
              slug: 'classify-relations',
              title: 'Classify ten relations',
              prompt:
                'For each relation decide reflexive/symmetric/antisymmetric/transitive with proof or counterexample, and name it (equivalence, partial order, total order, none): <= on Z; < on Z; divides on positive integers; divides on Z; congruence mod 7; "has the same birthday as"; subset on P(X); "is a friend of"; "x - y is rational" on R; "|x - y| < 1" on R.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'relation-property-checker',
              title: 'Property checker and equivalence classes',
              prompt:
                'Represent a relation on a finite set as a set of pairs. Write is_reflexive, is_symmetric, is_antisymmetric, is_transitive, and equivalence_classes(R, A) that returns the partition. Test on congruence mod 4 over range(20) (expected 4 classes of 5) and on "same number of set bits" over range(32) (expected 6 classes with sizes 1,5,10,10,5,1). Then write transitive_closure(R) and verify closure of "x -> x+1" on range(6) is <.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hasse-diagram',
              title: 'Hasse diagram of divisibility',
              prompt:
                'For the divisors of 60 under "divides", compute the covering relation (a covers b if a | b, a != b, and nothing strictly between), print it as edges, and draw the Hasse diagram by hand or with graphviz. Identify minimal, maximal, least and greatest elements, the longest chain (expected length 5: 1,2,4,12,60 or similar) and a largest antichain.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'partition-equivalence-correspondence',
              title: 'Partitions and equivalence relations',
              prompt:
                'Prove that the equivalence classes of an equivalence relation partition the set (every element in a class; two classes are equal or disjoint). Then count: how many equivalence relations are there on a 3-element set? On a 4-element set? Enumerate partitions in Python to check (expected 5 and 15, the Bell numbers).',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What three properties define an equivalence relation, and what structure do its classes form?',
              answerOutline: 'Reflexive, symmetric, transitive; the classes form a partition of the set.',
            },
            {
              question: 'What is the difference between symmetric and antisymmetric? Can a relation be both?',
              answerOutline: 'Symmetric: aRb implies bRa; antisymmetric: aRb and bRa imply a = b. Both hold for the equality relation (and subsets of it).',
            },
            {
              question: 'What is the difference between a minimal and a least element of a partial order?',
              answerOutline: 'Minimal: nothing strictly below it (there may be several). Least: below every element (unique if it exists).',
            },
            {
              question: 'Why is "divides" on positive integers a partial order but not a total order?',
              answerOutline: 'It is reflexive, antisymmetric and transitive, but 2 and 3 are incomparable.',
            },
          ],
        },
        {
          slug: 'cardinality-and-infinity',
          title: 'Cardinality: countable and uncountable sets',
          summary:
            'Comparing sizes of infinite sets with bijections, why the rationals are countable and the reals are not, and what diagonalisation has to do with computation.',
          estimatedMinutes: 90,
          objectives: [
            'Define same cardinality via bijections and show N, Z and Q have the same cardinality',
            'Reproduce Cantor\'s diagonal argument for the uncountability of the reals (or of infinite binary strings)',
            'Prove that the power set of any set is strictly larger than the set',
            'Explain why there are uncomputable functions by a counting argument',
          ],
          concepts: [
            'Same cardinality iff a bijection exists',
            'Countably infinite: bijection with N; listing arguments',
            'Z and Q are countable; countable unions of countable sets',
            'Cantor\'s diagonal argument',
            'Uncountability of R and of infinite binary strings',
            'Cantor\'s theorem: |A| < |P(A)|',
            'Schroeder-Bernstein (statement)',
            'Programs are countable, functions N -> {0,1} are not',
          ],
          explanation: `Two sets have the **same cardinality** when a bijection exists between them. For finite sets this is counting; for infinite sets it gives surprises. $\\mathbb{N}$ and the even numbers have the same size ($n \\mapsto 2n$), as do $\\mathbb{N}$ and $\\mathbb{Z}$ (interleave $0, 1, -1, 2, -2, \\dots$). A set is **countable** when it is finite or in bijection with $\\mathbb{N}$, i.e. when its elements can be **listed** $a_0, a_1, a_2, \\dots$ so that every element appears at some finite position. The rationals are countable: arrange $p/q$ in a grid and walk the diagonals, skipping repeats. More generally, a countable union of countable sets is countable, and the set of all finite strings over a finite alphabet is countable (list by length, then alphabetically). Every Python program is a finite string, so **the set of programs is countable**.

**Cantor's diagonal argument** shows some sets are not. Suppose the infinite binary strings were listed $s_0, s_1, s_2, \\dots$. Build $d$ by making its $i$-th bit the opposite of the $i$-th bit of $s_i$. Then $d$ differs from every $s_i$ at position $i$, so $d$ is not in the list: contradiction. The real numbers in $[0, 1]$ are uncountable by the same argument on decimal expansions (with care about $0.4999\\ldots = 0.5$). The same idea proves **Cantor's theorem**: no function $f : A \\to \\mathcal{P}(A)$ is surjective, because $D = \\{a : a \\notin f(a)\\}$ is not in the image. Hence $|A| < |\\mathcal{P}(A)|$ always, and there is an infinite hierarchy of infinities.

The consequence for computing is immediate and profound: functions from $\\mathbb{N}$ to $\\{0, 1\\}$ are in bijection with infinite binary strings, hence uncountable, while programs are countable. So **most functions are not computable by any program**. Theory of Computation makes this concrete with the halting problem, whose proof is diagonalisation again.

Read MCS 8.1 (the chapter on infinite sets) and Book of Proof chapter 14. The exercises implement the countability bijections and let you watch the diagonal argument defeat any listing you write.`,
          resources: [
            {
              title: 'Book of Proof — Chapter 14: Cardinality of Sets',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
              primary: true,
            },
            {
              title: 'MCS — Chapter 8: Infinite Sets (8.1 countability, 8.2 the halting problem preview)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter on universality and uncomputability',
              url: 'https://introtcs.org/public/lec_08_uncomputability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              note: 'Skim the counting argument for uncomputable functions; the rest belongs to Theory of Computation.',
            },
          ],
          exercises: [
            {
              slug: 'countability-bijections',
              title: 'Implement the bijections',
              prompt:
                'Write nat_to_int(n) and int_to_nat(z) realising the bijection N <-> Z and verify round trips for 10^4 values. Write nat_to_rational(n) that enumerates positive rationals without repeats via the diagonal walk (skip non-reduced fractions) and its inverse; verify the first 20 outputs and the round trip. Write pair(a, b) = Cantor pairing and its inverse.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'diagonal-defeats-listing',
              title: 'Diagonalise any listing',
              prompt:
                'Write a function listing(i, j) -> bit that defines the j-th bit of the i-th string in some infinite listing of your choice (e.g. binary expansion of i, or of some computable sequence). Write diagonal(j) that returns the flipped (j, j) bit. For the first 50 rows, verify programmatically that diagonal differs from row i at position i. Explain why no choice of listing can escape this.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'cantor-theorem-proof',
              title: 'Prove Cantor\'s theorem and apply it',
              prompt:
                'Write out the proof that no function f: A -> P(A) is surjective, handling the case analysis "is a0 in D?" explicitly. Then deduce that the set of functions N -> {0,1} is uncountable, that the set of Python programs is countable, and conclude that some function N -> {0,1} has no program computing it. Write the chain of reasoning as a numbered list.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you show a set is countably infinite?',
              answerOutline: 'Exhibit a bijection with N, i.e. a listing in which every element appears at a finite position.',
            },
            {
              question: 'Sketch the diagonal argument.',
              answerOutline: 'Assume a complete list of infinite binary strings; construct one differing from the i-th string at bit i; it is missing from the list.',
            },
            {
              question: 'Why must uncomputable functions exist?',
              answerOutline: 'Programs are finite strings, hence countable; functions N -> {0,1} are uncountable; so not every function has a program.',
            },
          ],
          relatedLessons: ['theory-of-computation/turing-machines-and-computability/countability-and-uncomputable-functions'],
        },
      ],
    },
    {
      slug: 'number-theory-modular',
      title: 'Number Theory and Modular Arithmetic',
      description:
        'Divisibility, primes, gcd and the Euclidean algorithm, modular arithmetic and inverses, Fermat and Euler, and the RSA cryptosystem built from them.',
      lessons: [
        {
          slug: 'divisibility-and-the-euclidean-algorithm',
          title: 'Divisibility, gcd and the Euclidean algorithm',
          summary:
            'The division theorem, greatest common divisors, Euclid\'s algorithm and its extended form, and Bezout\'s identity.',
          estimatedMinutes: 100,
          objectives: [
            'State and use the division theorem and the definition of divisibility',
            'Compute gcd by the Euclidean algorithm and prove the algorithm correct',
            'Run the extended Euclidean algorithm to find Bezout coefficients',
            'Prove basic facts: gcd(a, b) = gcd(b, a mod b); if a | bc and gcd(a, b) = 1 then a | c',
          ],
          concepts: [
            'a divides b; the division theorem q, r with 0 <= r < b',
            'Greatest common divisor and least common multiple',
            'Euclidean algorithm and its termination',
            'Extended Euclidean algorithm and Bezout\'s identity',
            'Relatively prime (coprime)',
            'Linear Diophantine equations ax + by = c',
            'Number of steps of Euclid and Fibonacci (Lame)',
            'Python: divmod, math.gcd, pow',
          ],
          explanation: `Number theory begins with the **division theorem**: for integers $a$ and $b > 0$ there are unique $q$ and $r$ with $a = qb + r$ and $0 \\le r < b$. Python's \`divmod(a, b)\` returns them (with the floor convention that keeps $r \\ge 0$ even for negative $a$). $b$ **divides** $a$, written $b \\mid a$, when $r = 0$.

The **greatest common divisor** $\\gcd(a, b)$ is the largest integer dividing both. The **Euclidean algorithm** computes it without factoring, using one fact: $\\gcd(a, b) = \\gcd(b, a \\bmod b)$. Proof: any common divisor of $a$ and $b$ divides $a - qb = r$, and any common divisor of $b$ and $r$ divides $qb + r = a$, so the two pairs have the same common divisors. Iterate until the remainder is 0; the last nonzero remainder is the gcd. It terminates because remainders strictly decrease, and it is fast: the number of steps is at most about $\\log_\\phi(b)$ (worst case consecutive Fibonacci numbers, Lamé's theorem), so a 1000-digit gcd takes a few thousand steps.

Running the algorithm backwards, or better, carrying coefficients forward, gives the **extended Euclidean algorithm**: integers $x, y$ with $ax + by = \\gcd(a, b)$ (**Bezout's identity**). This is the workhorse of the module: it finds modular inverses (next lesson), solves $ax + by = c$ (solvable iff $\\gcd(a, b) \\mid c$), and proves the lemma behind unique factorisation: if $a \\mid bc$ and $\\gcd(a, b) = 1$, write $1 = ax + by$, multiply by $c$, and $a$ divides both terms on the right.

Read MCS 9.1-9.2 and Stein chapter 1 or 2. Implement everything in the exercises with a timing table; the contrast between Euclid and factoring is the first lesson of computational number theory, and the extended algorithm you write will be used unchanged in the RSA lesson.`,
          resources: [
            {
              title: 'MCS — Chapter 9: Number Theory (9.1-9.4)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Elementary Number Theory: Primes, Congruences, and Secrets (Stein) — Chapter 1',
              url: 'https://wstein.org/ent/',
              type: 'textbook',
              cost: 'free',
              provider: 'William Stein',
              note: 'Free PDF; chapter 1 covers divisibility, gcd and the algorithms with Sage/Python flavour.',
            },
            {
              title: 'Berkeley CS70 — Note on modular arithmetic and Euclid',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
            {
              title: 'Project Euler',
              url: 'https://projecteuler.net/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Project Euler',
              note: 'Problems 1-30 are a good computational companion to this module.',
            },
          ],
          exercises: [
            {
              slug: 'euclid-and-extended',
              title: 'Implement Euclid and extended Euclid',
              prompt:
                'Write gcd(a, b) iteratively with a step counter and egcd(a, b) -> (g, x, y) with a x + b y = g. Verify against math.gcd on 10^4 random pairs and check Bezout for each. Report the step count for consecutive Fibonacci numbers F(30), F(31) and compare with log_phi(F(31)). Time gcd on two random 1000-digit integers.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'euclid-correctness-proof',
              title: 'Prove the algorithm correct',
              prompt:
                'Prove the lemma gcd(a, b) = gcd(b, a mod b) in full. Then prove that the Euclidean algorithm terminates and returns gcd(a, b), structuring the argument as a loop invariant (gcd of the current pair equals gcd(a, b)) plus a termination measure.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'diophantine-solver',
              title: 'Solve linear Diophantine equations',
              prompt:
                'Write solve(a, b, c) that returns all integer solutions of a x + b y = c as a parametric family (x0 + k b/g, y0 - k a/g) or None. Use it to answer: in how many ways can 1000 be paid with 7-unit and 11-unit coins with non-negative counts? (Enumerate k and count; check by brute force.)',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coprime-lemma',
              title: 'The coprime lemma and its uses',
              prompt:
                'Prove: if a | bc and gcd(a, b) = 1 then a | c, using Bezout. Deduce Euclid\'s lemma: if a prime p divides bc then p | b or p | c. Then show by counterexample that the lemma fails without coprimality (find a, b, c with a | bc, a not dividing b or c).',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does gcd(a, b) = gcd(b, a mod b)?',
              answerOutline: 'Common divisors of (a, b) and (b, r) coincide since r = a - qb and a = qb + r.',
            },
            {
              question: 'What does the extended Euclidean algorithm produce and why is it useful?',
              answerOutline: 'Integers x, y with ax + by = gcd(a, b); used to find modular inverses and solve linear Diophantine equations.',
            },
            {
              question: 'When does ax + by = c have integer solutions?',
              answerOutline: 'Exactly when gcd(a, b) divides c.',
            },
            {
              question: 'Roughly how many steps does Euclid take on two 100-digit numbers?',
              answerOutline: 'On the order of a few hundred (logarithmic in the inputs), not exponential.',
            },
          ],
        },
        {
          slug: 'primes-and-factorisation',
          title: 'Primes, factorisation and the infinitude of primes',
          summary:
            'The fundamental theorem of arithmetic, why primes are infinite, how to find them with a sieve, and why factoring is hard while testing primality is easy.',
          estimatedMinutes: 90,
          objectives: [
            'Prove that every integer greater than 1 has a unique prime factorisation',
            'Prove there are infinitely many primes and reproduce the proof from memory',
            'Implement trial division, the sieve of Eratosthenes and a probabilistic primality test, and compare their costs',
            'Explain why primality testing is fast but factoring is believed hard, and why that asymmetry matters',
          ],
          concepts: [
            'Prime, composite, unit',
            'Fundamental theorem of arithmetic: existence and uniqueness',
            'Euclid\'s proof of infinitely many primes',
            'Sieve of Eratosthenes and its cost',
            'Prime number theorem: density about 1 / ln n',
            'Fermat test and Miller-Rabin (probabilistic primality)',
            'Factoring vs primality testing',
            'Prime gaps, twin primes, Mersenne primes (as curiosities)',
          ],
          explanation: `A **prime** is an integer $p > 1$ whose only positive divisors are 1 and $p$. The **fundamental theorem of arithmetic** says every integer $n > 1$ is a product of primes in exactly one way up to order. *Existence* is a strong-induction argument (if $n$ is not prime it factors as $ab$ with smaller factors, which factor by hypothesis); *uniqueness* needs Euclid's lemma from the previous lesson (if $p \\mid q_1 q_2 \\cdots q_k$ then $p$ divides some $q_i$, hence equals it), and then cancel and repeat. Uniqueness is the deep part; in some number systems it fails, which is why the lemma matters.

**Euclid's proof** that primes are infinite: given any finite list $p_1, \\dots, p_k$, the number $N = p_1 p_2 \\cdots p_k + 1$ leaves remainder 1 on division by each $p_i$, so its prime factors (it has some, by existence) are not in the list. Note what it does *not* say: $N$ need not itself be prime ($2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 + 1 = 30031 = 59 \\cdot 509$).

Computationally, the **sieve of Eratosthenes** finds all primes up to $n$ in about $n \\log \\log n$ operations: mark multiples of each prime starting at its square. The **prime number theorem** says about $n / \\ln n$ of the numbers below $n$ are prime, so a random 100-digit number is prime with probability about $1/230$, which is how RSA keys are generated: pick random odd numbers and test.

Testing is fast because of Fermat's little theorem (next lesson): if $a^{n-1} \\not\\equiv 1 \\pmod n$ then $n$ is composite, with no factor exhibited. **Miller-Rabin** strengthens this into a test that errs with probability at most $4^{-k}$ after $k$ rounds. **Factoring**, by contrast, has no known fast algorithm on classical computers; trial division is exponential in the number of digits and the best known methods are still super-polynomial. Primality easy, factoring hard: that gap is the foundation of RSA.

Read MCS 9.3-9.4 and Stein chapter 1.2 and 2.4. The exercises make you measure all three algorithms.`,
          resources: [
            {
              title: 'Elementary Number Theory (Stein) — 1.2 Primes, 2.4 Probabilistic primality testing',
              url: 'https://wstein.org/ent/',
              type: 'textbook',
              cost: 'free',
              provider: 'William Stein',
              primary: true,
            },
            {
              title: 'MCS — Chapter 9.3-9.4: Prime mysteries and the fundamental theorem of arithmetic',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'The On-Line Encyclopedia of Integer Sequences (A000040: the primes)',
              url: 'https://oeis.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'OEIS Foundation',
              note: 'Check any sequence your code produces against the database.',
            },
          ],
          exercises: [
            {
              slug: 'sieve-and-pnt',
              title: 'Sieve and the prime number theorem',
              prompt:
                'Implement the sieve of Eratosthenes with a bytearray. Count primes below 10^k for k = 2..8 (pi(10^8) = 5761455) and tabulate pi(n) / (n / ln n) to watch it approach 1. Time the sieve for each n and confirm near-linear growth. Compare with trial division up to 10^6.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'miller-rabin',
              title: 'Miller-Rabin primality test',
              prompt:
                'Implement is_probable_prime(n, k=20) via Miller-Rabin using pow(a, d, n). Verify it agrees with the sieve for all n < 10^6, then find the first Carmichael number (561) that fools the plain Fermat test with base 2 but not Miller-Rabin. Generate a random 512-bit prime and report how many candidates you tested (expected around 512 ln 2 / 2 ~ 177 odd candidates).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'factoring-cost',
              title: 'Measure factoring cost',
              prompt:
                'Implement trial-division factorisation. Factor products of two random primes of 8, 10, 12, 14 digits each (make them with Miller-Rabin) and time each. Fit the growth and extrapolate to a 100-digit semiprime. Then verify unique factorisation numerically: factor 10^4 random integers and multiply the factors back.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fta-and-euclid-proofs',
              title: 'Write the two classic proofs',
              prompt:
                'Write complete proofs of (a) existence of prime factorisation by strong induction, (b) uniqueness using Euclid\'s lemma, (c) infinitude of primes. For (c), compute p1...pk + 1 for the first k primes, k = 1..8, and mark which are prime (expected: prime for k = 1..5, composite for k = 6).',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which part of the fundamental theorem of arithmetic needs Euclid\'s lemma?',
              answerOutline: 'Uniqueness: a prime dividing a product divides a factor, which lets you match primes between two factorisations.',
            },
            {
              question: 'Is p1 p2 ... pk + 1 always prime?',
              answerOutline: 'No; it merely has a prime factor outside the list. 30031 = 59 x 509 is a counterexample.',
            },
            {
              question: 'Why is primality testing fast while factoring is slow?',
              answerOutline: 'Fermat/Miller-Rabin certify compositeness without a factor using modular exponentiation; no comparably fast method finds factors.',
            },
            {
              question: 'About how many primes are there below n?',
              answerOutline: 'Approximately n / ln n (prime number theorem).',
            },
          ],
        },
        {
          slug: 'modular-arithmetic-and-inverses',
          title: 'Modular arithmetic, inverses and the Chinese remainder theorem',
          summary:
            'Congruences as an equivalence relation compatible with + and x, fast modular exponentiation, when inverses exist, and solving simultaneous congruences.',
          estimatedMinutes: 100,
          objectives: [
            'Prove that congruence mod n respects addition and multiplication and compute in Z_n',
            'Implement fast modular exponentiation and explain its logarithmic cost',
            'Determine when a has an inverse mod n and compute it with extended Euclid',
            'Solve systems of congruences with the Chinese remainder theorem and explain the bijection behind it',
          ],
          concepts: [
            'a ≡ b (mod n) iff n | (a - b)',
            'Z_n and arithmetic on residues',
            'Repeated squaring: a^k mod n in O(log k) multiplications',
            'Multiplicative inverse exists iff gcd(a, n) = 1',
            'Units group Z_n^* and Euler\'s phi',
            'Cancellation law and its failure mod composites',
            'Chinese remainder theorem as a bijection',
            'Hashing and checksums as modular arithmetic',
          ],
          explanation: `$a \\equiv b \\pmod n$ means $n \\mid (a - b)$: $a$ and $b$ have the same remainder. This is an equivalence relation on $\\mathbb{Z}$ with $n$ classes, $\\mathbb{Z}_n = \\{0, 1, \\dots, n-1\\}$, and the crucial property is **compatibility**: if $a \\equiv a'$ and $b \\equiv b'$ then $a + b \\equiv a' + b'$ and $ab \\equiv a'b'$. (Proof: $a - a'$ and $b - b'$ are multiples of $n$; expand.) So you may reduce mod $n$ at every step of a computation, which is why $7^{1000} \\bmod 13$ is easy by hand and why hash functions and checksums never overflow.

**Fast exponentiation**: to compute $a^k \\bmod n$, square repeatedly and multiply in the bits of $k$: about $2 \\log_2 k$ multiplications of numbers below $n$, instead of $k$. Python's \`pow(a, k, n)\` does exactly this; \`pow(3, 10**18, 10**9+7)\` is instant. Implement it once yourself to see why.

Division is the subtle operation. $a$ has a **multiplicative inverse** mod $n$ (a $b$ with $ab \\equiv 1$) iff $\\gcd(a, n) = 1$: Bezout gives $ax + ny = 1$, so $x$ is the inverse; conversely an inverse implies $\\gcd = 1$. Compute it with your extended Euclid. The elements with inverses form the **units** $\\mathbb{Z}_n^*$, of size $\\varphi(n)$ (Euler's totient). Without coprimality, cancellation fails: $2 \\cdot 3 \\equiv 2 \\cdot 0 \\pmod 6$ but $3 \\not\\equiv 0$.

The **Chinese remainder theorem**: if $m$ and $n$ are coprime, then for any $a, b$ there is a unique $x \\bmod mn$ with $x \\equiv a \\pmod m$ and $x \\equiv b \\pmod n$. The proof is a bijection $\\mathbb{Z}_{mn} \\to \\mathbb{Z}_m \\times \\mathbb{Z}_n$, $x \\mapsto (x \\bmod m, x \\bmod n)$: it is injective (if two values agree in both coordinates, $m$ and $n$ both divide the difference, so $mn$ does), and the sets have equal size, so it is a bijection. The constructive solution uses inverses: $x = a \\cdot n \\cdot (n^{-1} \\bmod m) + b \\cdot m \\cdot (m^{-1} \\bmod n)$. CRT lets you compute with huge numbers in several small moduli in parallel.

Read MCS 9.5-9.8 and Stein 2.1-2.3; the exercises implement all four algorithms and measure the speed of repeated squaring.`,
          resources: [
            {
              title: 'MCS — Chapter 9.5-9.9: Modular arithmetic, inverses, Euler\'s theorem',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Elementary Number Theory (Stein) — Chapter 2: The Ring of Integers Modulo n',
              url: 'https://wstein.org/ent/',
              type: 'textbook',
              cost: 'free',
              provider: 'William Stein',
            },
            {
              title: 'Python built-in pow(base, exp, mod)',
              url: 'https://docs.python.org/3/library/functions.html#pow',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Negative exponents give modular inverses when they exist.',
            },
          ],
          exercises: [
            {
              slug: 'modpow-and-inverse',
              title: 'Implement modpow and modinv',
              prompt:
                'Write modpow(a, k, n) by repeated squaring with a multiplication counter, and modinv(a, n) via egcd raising ValueError when gcd != 1. Verify modpow against pow on 10^4 random triples and report the multiplication count for k = 10^6 (expected about 40). Verify a * modinv(a, n) % n == 1 for all units a < n for n = 97 and n = 100, and count the units (96 and 40).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'crt-solver',
              title: 'Chinese remainder solver',
              prompt:
                'Implement crt(residues, moduli) for pairwise coprime moduli. Solve x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7) (expected 23). Then verify the bijection claim: for m = 4, n = 9, map every x in range(36) to (x % 4, x % 9) and check the 36 images are distinct. Finally show what goes wrong for m = 4, n = 6.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'compatibility-proofs',
              title: 'Prove compatibility and the inverse criterion',
              prompt:
                'Prove: (a) if a ≡ a\' and b ≡ b\' (mod n) then ab ≡ a\'b\' (mod n); (b) a has an inverse mod n iff gcd(a, n) = 1; (c) if gcd(a, n) = 1 and ab ≡ ac (mod n) then b ≡ c. Give a counterexample to (c) when gcd(a, n) > 1.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'checksum-design',
              title: 'Design and break a checksum',
              prompt:
                'Implement the ISBN-10 check digit (weighted sum mod 11) and verify it detects every single-digit error and every adjacent transposition (prove why: 11 is prime so weights are invertible). Then implement a naive "sum of digits mod 10" checksum and find errors it misses. Report detection rates over 10^5 random corruptions of each kind.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can you reduce mod n after every step of a long computation?',
              answerOutline: 'Congruence is compatible with addition and multiplication, so intermediate reductions do not change the final residue.',
            },
            {
              question: 'When does a have an inverse mod n and how do you find it?',
              answerOutline: 'Iff gcd(a, n) = 1; the x from extended Euclid with ax + ny = 1.',
            },
            {
              question: 'How many multiplications does repeated squaring use for a^k?',
              answerOutline: 'About 2 log2 k: one squaring per bit plus one multiply per set bit.',
            },
            {
              question: 'State the Chinese remainder theorem and the idea of its proof.',
              answerOutline: 'For coprime m, n, x -> (x mod m, x mod n) is a bijection Z_mn -> Z_m x Z_n (injective by divisibility, equal sizes), so any pair of residues has a unique solution.',
            },
          ],
        },
        {
          slug: 'fermat-euler-and-rsa',
          title: 'Fermat, Euler and the RSA cryptosystem',
          summary:
            'Fermat\'s little theorem and Euler\'s theorem, their proofs by counting, and how they make RSA encryption and decryption inverse operations.',
          estimatedMinutes: 120,
          objectives: [
            'Prove Fermat\'s little theorem and Euler\'s theorem by the "multiply all units by a" argument',
            'Compute Euler\'s phi for n = pq and explain why factoring n reveals it',
            'Implement RSA key generation, encryption, decryption and signing and prove decryption inverts encryption',
            'Explain what an attacker must do to break RSA and why key size matters',
          ],
          concepts: [
            'Fermat\'s little theorem: a^(p-1) ≡ 1 (mod p) for p not dividing a',
            'Euler\'s theorem: a^phi(n) ≡ 1 for gcd(a, n) = 1',
            'phi(pq) = (p-1)(q-1)',
            'RSA: n = pq, e coprime to phi, d = e^-1 mod phi',
            'Correctness: (m^e)^d ≡ m (mod n)',
            'Public key vs private key; signing as decryption',
            'Security assumption: factoring n is hard',
            'Practical issues: padding, key sizes, side channels (awareness)',
          ],
          explanation: `**Fermat's little theorem**: if $p$ is prime and $p \\nmid a$, then $a^{p-1} \\equiv 1 \\pmod p$. The proof is a counting argument worth memorising. The numbers $1, 2, \\dots, p-1$, each multiplied by $a$ and reduced mod $p$, are again $1, 2, \\dots, p-1$ in some order (multiplication by a unit is a bijection: it has an inverse). Multiply them all: $a^{p-1}(p-1)! \\equiv (p-1)! \\pmod p$, and cancel $(p-1)!$, which is a unit. **Euler's theorem** is the same argument over the units of $\\mathbb{Z}_n$: $a^{\\varphi(n)} \\equiv 1 \\pmod n$ when $\\gcd(a, n) = 1$, where $\\varphi(n) = |\\mathbb{Z}_n^*|$. For $n = pq$ with distinct primes, $\\varphi(n) = (p-1)(q-1)$ (count the multiples of $p$ and $q$ below $n$ and subtract).

**RSA** is Euler's theorem turned into a lock. Choose large primes $p, q$; let $n = pq$ and $\\varphi = (p-1)(q-1)$. Pick $e$ coprime to $\\varphi$ (commonly 65537) and compute $d = e^{-1} \\bmod \\varphi$ with extended Euclid. Publish $(n, e)$; keep $d$ secret. Encrypt a message $m < n$ as $c = m^e \\bmod n$; decrypt as $c^d \\bmod n$. **Correctness**: $ed = 1 + k\\varphi$, so $(m^e)^d = m \\cdot (m^{\\varphi})^k \\equiv m$ by Euler when $\\gcd(m, n) = 1$ (and a CRT argument handles the rare other case). **Signing** reverses the roles: $s = m^d$, and anyone checks $s^e \\equiv m$.

**Security** rests on one assumption: computing $d$ from $(n, e)$ requires $\\varphi(n)$, and knowing $\\varphi(n)$ is equivalent to factoring $n$ (you can solve for $p$ and $q$ from $n$ and $p + q$). Since factoring is believed hard, 2048-bit $n$ is considered safe today. Textbook RSA as described is **not** secure in practice: without randomised padding it is deterministic and malleable, and naive implementations leak $d$ through timing. Real systems use OAEP padding and constant-time code; your implementation here is for understanding only.

Read MCS 9.9-9.11 and Stein chapter 3. The exercises build the full system with your own modpow, modinv and Miller-Rabin, then break a toy key by factoring.`,
          resources: [
            {
              title: 'Elementary Number Theory (Stein) — Chapter 3: Public-key Cryptography',
              url: 'https://wstein.org/ent/',
              type: 'textbook',
              cost: 'free',
              provider: 'William Stein',
              primary: true,
            },
            {
              title: 'MCS — Chapter 9.9-9.11: Euler\'s theorem and RSA',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Berkeley CS70 — Notes on RSA',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
              note: 'A compact derivation with the CRT fix for messages not coprime to n.',
            },
            {
              title: 'Python secrets module (cryptographically strong randomness)',
              url: 'https://docs.python.org/3/library/secrets.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'rsa-from-scratch',
              title: 'RSA from scratch',
              prompt:
                'Using your Miller-Rabin, modinv and pow, write keygen(bits) -> (n, e, d), encrypt, decrypt, sign and verify. Generate a 1024-bit key (two 512-bit primes), round-trip 100 random messages, sign and verify one, and show that a one-bit change in the message fails verification. Time keygen, encrypt and decrypt.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'break-a-toy-key',
              title: 'Break a toy key by factoring',
              prompt:
                'Generate RSA keys with 20-, 30-, 40- and 50-bit n. For each, recover p and q by trial division (or Pollard rho if you like), compute phi and d, and decrypt a ciphertext without the private key. Tabulate the time to break versus key size and extrapolate to 2048 bits.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fermat-euler-proofs',
              title: 'Prove Fermat and Euler',
              prompt:
                'Write the bijection proof of Fermat\'s little theorem in full, then generalise to Euler\'s theorem. Verify numerically: for n = 15 list the units, multiply each by a = 7 mod 15, and show the result is a permutation of the units. Prove phi(pq) = (p-1)(q-1) and check with a brute-force phi for p = 11, q = 13.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rsa-correctness-and-pitfalls',
              title: 'Correctness proof and textbook-RSA pitfalls',
              prompt:
                'Prove that decryption inverts encryption when gcd(m, n) = 1. Then demonstrate two weaknesses of textbook RSA: (a) determinism (encrypt "yes"/"no" and show an attacker can match ciphertexts), (b) malleability (multiply a ciphertext by 2^e and show the decryption is 2m). Write one paragraph on how padding addresses both.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Sketch the proof of Fermat\'s little theorem.',
              answerOutline: 'Multiplying the units 1..p-1 by a permutes them; take the product of both sides and cancel (p-1)!.',
            },
            {
              question: 'Why does RSA decryption recover the message?',
              answerOutline: 'ed = 1 + k phi(n), so m^(ed) = m (m^phi)^k = m by Euler\'s theorem (with CRT for the non-coprime case).',
            },
            {
              question: 'What would an attacker need to compute d from the public key?',
              answerOutline: 'phi(n), which is equivalent to factoring n = pq.',
            },
            {
              question: 'Why is textbook RSA insecure in practice?',
              answerOutline: 'Deterministic encryption allows guessing, multiplicative structure allows malleability, and naive implementations leak timing; padding (OAEP) and constant-time code are needed.',
            },
          ],
        },
      ],
      project: {
        slug: 'number-theory-toolkit',
        title: 'Module project: a number-theory and RSA toolkit',
        description:
          'Package the algorithms from this module into a tested Python library: gcd/egcd, modpow, modinv, CRT, sieve, Miller-Rabin, prime generation, Euler phi, and RSA keygen/encrypt/decrypt/sign/verify with a simple padding scheme. Include a benchmark script that tabulates the cost of each operation against input size and a short written note on which operations are polynomial and which exponential in the number of digits.',
        deliverables: [
          'A package with tests for every function including edge cases (0, 1, negative, non-coprime)',
          'A benchmark table and plot for gcd, modpow, Miller-Rabin and trial-division factoring',
          'A written note proving correctness of RSA decryption and discussing key-size choice',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'counting-combinatorics',
      title: 'Counting and Combinatorics',
      description:
        'The rules of counting: sum, product, bijection, division, inclusion-exclusion and the pigeonhole principle; permutations, combinations and binomial coefficients; and generating functions as a glimpse of the algebra of counting.',
      lessons: [
        {
          slug: 'basic-counting-rules',
          title: 'The basic counting rules',
          summary:
            'Sum rule, product rule, bijection rule and the division (generalised product) rule, with the discipline of checking a count by enumeration.',
          estimatedMinutes: 90,
          objectives: [
            'Apply the sum, product and bijection rules to count sequences, subsets and functions',
            'Use the division rule to count when each object is counted k times',
            'Decide whether order matters and whether repetition is allowed, and pick the right rule',
            'Verify any count below ten thousand by enumerating with itertools',
          ],
          concepts: [
            'Sum rule for disjoint sets; product rule for sequences of choices',
            'Bijection rule: count an easier set',
            'Division rule: k-to-1 maps',
            'Counting functions |B|^|A|, injections, subsets 2^n',
            'Passwords, licence plates, lattice paths as templates',
            'Order matters vs not; repetition allowed vs not',
            'Overcounting and double counting as errors',
            'itertools.product, permutations, combinations for verification',
          ],
          explanation: `Counting is about never listing. The **sum rule**: if $A$ and $B$ are disjoint, $|A \\cup B| = |A| + |B|$. The **product rule**: a sequence of $k$ independent choices with $n_1, \\dots, n_k$ options has $n_1 n_2 \\cdots n_k$ outcomes, so there are $|B|^{|A|}$ functions from $A$ to $B$, $2^n$ subsets of an $n$-set (each element in or out), and $26 \\cdot 25 \\cdot 24$ three-letter strings with distinct letters. The **bijection rule** says that if you can match the objects one-to-one with something you can count, you are done; lattice paths from $(0,0)$ to $(m, n)$ with unit steps correspond to strings of $m$ R's and $n$ U's.

The **division rule** handles symmetry: if a $k$-to-1 function maps a set you can count onto the set you want, divide by $k$. Seating $n$ people at a round table: $n!$ linear arrangements, each circular arrangement counted $n$ times by rotation, so $(n-1)!$. Choosing a committee of 3 from 10: $10 \\cdot 9 \\cdot 8$ ordered choices, each committee counted $3! = 6$ times, so 120.

Two questions decide which template applies: *Does order matter?* and *Can an item be reused?* Ordered with repetition: $n^k$. Ordered without: $n(n-1)\\cdots(n-k+1)$. Unordered without: the binomial coefficient (next lesson). Unordered with repetition: stars and bars (next lesson). Most mistakes are **overcounting** (treating distinct-looking sequences as different when the problem does not) or breaking a set into pieces that overlap, violating the sum rule's disjointness.

The discipline that makes you reliable: for every count, write a Python enumeration with \`itertools\` for a small instance and compare. If the formula says 120 and the enumeration says 720, you forgot to divide. Read MCS 15.1-15.5 and Levin chapter 1.1-1.2; Bogart's book teaches counting by guided discovery if you want more problems.`,
          resources: [
            {
              title: 'MCS — Chapter 15: Cardinality Rules (15.1-15.5)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — Chapter 1: Counting',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
              note: 'Sections 1.1-1.3 (additive and multiplicative principles, binomial coefficients).',
            },
            {
              title: 'Combinatorics Through Guided Discovery (Bogart)',
              url: 'https://bogart.openmathbooks.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Kenneth Bogart',
              note: 'Chapter 1 problems; a problem-driven approach that pairs well with the exercises here.',
            },
            {
              title: 'itertools — Functions creating iterators for efficient looping',
              url: 'https://docs.python.org/3/library/itertools.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'count-and-verify',
              title: 'Count, then verify by enumeration',
              prompt:
                'Count, with the rule named, then verify with itertools for the small case: (a) 4-digit PINs with no repeated digit; (b) functions from a 3-set to a 4-set; (c) injections from a 3-set to a 4-set; (d) subsets of a 6-set containing element 1; (e) ways to seat 5 people at a round table; (f) lattice paths from (0,0) to (4,3); (g) binary strings of length 8 with no two adjacent 1s (find the pattern for lengths 1..8).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'order-and-repetition-matrix',
              title: 'The order/repetition matrix',
              prompt:
                'Fill a 2x2 table (order matters / not; repetition allowed / not) with the formula for choosing k from n, a real example of each, and the count for n = 5, k = 3 (expected 125, 60, 10, 35). Verify all four by enumeration.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'find-the-overcount',
              title: 'Find the overcount',
              prompt:
                'Each "solution" is wrong; find the error and give the correct count with enumeration check: (a) "committees of 3 from 10 with a chair: 10*9*8"; (b) "5-card hands with at least one ace: 4 * C(51,4)"; (c) "arrangements of the letters of BANANA: 6!"; (d) "ways to put 3 distinct balls into 2 boxes with no box empty: 2^3".',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When does the product rule apply?',
              answerOutline: 'When outcomes are sequences of choices and the number of options at each step does not depend on earlier choices (only the count must be constant).',
            },
            {
              question: 'Explain the division rule with the round-table example.',
              answerOutline: 'n! linear seatings map n-to-1 onto circular seatings (rotations), giving (n-1)!.',
            },
            {
              question: 'How many functions are there from a set of size a to a set of size b? Injections?',
              answerOutline: 'b^a functions; b(b-1)...(b-a+1) injections (0 if a > b).',
            },
          ],
        },
        {
          slug: 'permutations-combinations-and-binomial-coefficients',
          title: 'Permutations, combinations and the binomial theorem',
          summary:
            'Binomial coefficients, their identities proved by counting two ways, the binomial theorem, multinomials, and stars and bars.',
          estimatedMinutes: 100,
          objectives: [
            'Compute C(n, k) and prove the symmetry and Pascal identities combinatorially',
            'State and apply the binomial theorem and derive sum identities from it',
            'Count arrangements with repeated items (multinomial coefficients)',
            'Count non-negative integer solutions of x1 + ... + xk = n with stars and bars',
          ],
          concepts: [
            'n! and k-permutations',
            'Binomial coefficient C(n, k) = n! / (k!(n-k)!)',
            'Symmetry C(n, k) = C(n, n-k) and Pascal\'s rule',
            'Double counting (combinatorial proof)',
            'Binomial theorem and consequences (sum of row = 2^n, alternating sum = 0)',
            'Multinomial coefficients and anagrams',
            'Stars and bars: C(n + k - 1, k - 1)',
            'Pascal\'s triangle and computing C(n, k) without overflow',
          ],
          explanation: `A **$k$-permutation** of $n$ items is an ordered selection: $n(n-1)\\cdots(n-k+1) = n!/(n-k)!$. A **combination** is unordered: divide by $k!$ to get the **binomial coefficient** $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$, read "$n$ choose $k$", the number of $k$-element subsets.

The identities are best proved by **counting two ways**. Symmetry $\\binom{n}{k} = \\binom{n}{n-k}$: choosing which $k$ to include is the same as choosing which $n-k$ to exclude (a bijection). **Pascal's rule** $\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}$: either element $n$ is in the subset (choose $k-1$ more) or it is not (choose all $k$ from the rest); the sum rule applies because the cases are disjoint. Pascal's rule is also a recursive algorithm, and memoised it computes $\\binom{n}{k}$ with only additions, avoiding the overflow that factorials cause in fixed-width languages (Python's big integers hide this, but \`math.comb\` is still the right tool).

The **binomial theorem** $(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^k y^{n-k}$ is itself a counting statement: expanding the product, each term picks $x$ from $k$ of the $n$ factors. Setting $x = y = 1$ gives $\\sum_k \\binom{n}{k} = 2^n$ (all subsets); $x = -1, y = 1$ gives the alternating sum $0$ (as many even-sized subsets as odd). **Multinomial coefficients** $\\binom{n}{k_1, \\dots, k_m} = \\frac{n!}{k_1! \\cdots k_m!}$ count arrangements with repeated items: MISSISSIPPI has $\\frac{11!}{1!\\,4!\\,4!\\,2!} = 34650$ anagrams, by the division rule.

**Stars and bars** counts unordered selections *with* repetition, equivalently non-negative integer solutions of $x_1 + \\cdots + x_k = n$: picture $n$ stars and $k - 1$ bars in a row; the answer is $\\binom{n + k - 1}{k - 1}$. With each $x_i \\ge 1$, substitute $y_i = x_i - 1$ first. Read MCS 15.6-15.8 and Levin 1.2-1.5; the exercises prove identities both ways and check all of them with \`math.comb\`.`,
          resources: [
            {
              title: 'Discrete Mathematics: An Open Introduction — 1.2 Binomial Coefficients, 1.4 Combinatorial Proofs, 1.5 Stars and Bars',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
              primary: true,
            },
            {
              title: 'MCS — Chapter 15.6-15.8: Binomial theorem, multinomials, counting with repetition',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Combinatorics Through Guided Discovery (Bogart) — Chapter 1-2',
              url: 'https://bogart.openmathbooks.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Kenneth Bogart',
            },
            {
              title: 'math.comb and math.perm',
              url: 'https://docs.python.org/3/library/math.html#math.comb',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'pascal-and-identities',
              title: 'Pascal\'s triangle and identities',
              prompt:
                'Build Pascal\'s triangle to row 30 with the recurrence only. Verify numerically for every row: symmetry, row sum 2^n, alternating sum 0, the hockey-stick identity sum_{i=k}^{n} C(i, k) = C(n+1, k+1), and Vandermonde C(m+n, k) = sum_j C(m, j) C(n, k-j) for m = 7, n = 9. Then give combinatorial proofs of hockey-stick and Vandermonde.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'anagrams-and-multinomials',
              title: 'Anagrams and multinomials',
              prompt:
                'Write anagram_count(word) using the multinomial formula and verify for BANANA (60), MISSISSIPPI (34650) and a 7-letter word by enumerating distinct permutations with set(itertools.permutations(...)). Count the arrangements of MISSISSIPPI in which no two I\'s are adjacent (place the other letters, then choose gaps).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stars-and-bars',
              title: 'Stars and bars',
              prompt:
                'Count: non-negative solutions of a + b + c + d = 20; solutions with each variable at least 2; ways to buy a dozen doughnuts from 5 flavours; ways to place 10 identical balls in 4 distinct boxes with no box empty. Verify each by brute-force enumeration in Python.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'binomial-theorem-derivations',
              title: 'Derive from the binomial theorem',
              prompt:
                'From (1 + x)^n, derive by substitution or differentiation: sum C(n,k) = 2^n; sum (-1)^k C(n,k) = 0; sum k C(n,k) = n 2^(n-1); sum C(n,k)^2 = C(2n, n) (compare coefficients of x^n in (1+x)^n (1+x)^n). Check each for n = 10 with math.comb.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give a combinatorial proof of Pascal\'s rule.',
              answerOutline: 'k-subsets of an n-set either contain a fixed element (C(n-1, k-1) ways) or not (C(n-1, k)); the cases are disjoint and exhaustive.',
            },
            {
              question: 'How many anagrams does a word with letter multiplicities k1..km have?',
              answerOutline: 'n! / (k1! ... km!), by the division rule applied to n! orderings.',
            },
            {
              question: 'How many non-negative integer solutions does x1 + x2 + x3 = 10 have?',
              answerOutline: 'C(12, 2) = 66 by stars and bars.',
            },
            {
              question: 'Why does the alternating row sum of Pascal\'s triangle vanish?',
              answerOutline: 'Set x = -1 in the binomial theorem; combinatorially, even- and odd-sized subsets are in bijection (toggle a fixed element).',
            },
          ],
        },
        {
          slug: 'inclusion-exclusion-and-pigeonhole',
          title: 'Inclusion-exclusion and the pigeonhole principle',
          summary:
            'Counting unions of overlapping sets, derangements, and the pigeonhole principle as a proof tool for existence statements.',
          estimatedMinutes: 90,
          objectives: [
            'State inclusion-exclusion for two, three and n sets and apply it to count by complement',
            'Derive the number of derangements and the number of surjections',
            'State the pigeonhole principle and its generalised form and apply it to existence proofs',
            'Recognise problems where pigeonhole gives a bound and where it does not',
          ],
          concepts: [
            'Inclusion-exclusion for 2, 3, n sets',
            'Counting by complement',
            'Derangements and the 1/e limit',
            'Counting surjections',
            'Euler\'s phi via inclusion-exclusion',
            'Pigeonhole principle and generalised pigeonhole (ceil(n/m))',
            'Classic applications: same remainder, subset sums, Erdos-Szekeres',
            'Hash collisions and the birthday bound as pigeonhole in probability',
          ],
          explanation: `The sum rule needs disjoint sets. When sets overlap, **inclusion-exclusion** corrects for the overlap: $|A \\cup B| = |A| + |B| - |A \\cap B|$, and for three sets add the singles, subtract the pairs, add back the triple. In general, $|A_1 \\cup \\cdots \\cup A_n| = \\sum_{\\emptyset \\ne S} (-1)^{|S|+1} |\\bigcap_{i \\in S} A_i|$. The proof counts how often an element in exactly $m$ of the sets is counted: $\\binom{m}{1} - \\binom{m}{2} + \\cdots = 1$ by the alternating binomial sum. In practice you use it to **count by complement**: the number of things with *none* of some properties is the total minus the union of the "bad" sets.

Two classic results fall out. **Derangements** (permutations with no fixed point): let $A_i$ be permutations fixing $i$; $|\\bigcap_{i \\in S} A_i| = (n - |S|)!$, so $D_n = n! \\sum_{k=0}^{n} (-1)^k / k!$, which tends to $n!/e$. The probability that a random permutation has no fixed point is about $0.368$ for any $n \\ge 5$: a striking fact you can check by simulation. **Surjections** from an $n$-set onto a $k$-set: $\\sum_{j} (-1)^j \\binom{k}{j} (k - j)^n$, by excluding the functions that miss element $j$. Euler's $\\varphi(n)$ has the same shape over the prime divisors.

The **pigeonhole principle** says that if $n$ objects go into $m < n$ boxes, some box gets at least two; the generalised form gives at least $\\lceil n/m \\rceil$. It is trivial to state and surprisingly powerful because the boxes can be anything: among 13 people two share a birth month; among any $n+1$ integers two have the same remainder mod $n$, so their difference is divisible by $n$; among any $n$ integers some non-empty subset sums to a multiple of $n$ (boxes: remainders of prefix sums); any sequence of $n^2 + 1$ distinct numbers has a monotone subsequence of length $n+1$ (Erdős–Szekeres). The art is choosing the boxes. The same principle, made probabilistic, is the birthday bound that governs hash collisions.

Read MCS 15.9-15.10 and 16 (pigeonhole appears in 15.10), Levin 1.6. The exercises combine formula, proof and simulation for each result.`,
          resources: [
            {
              title: 'MCS — Chapter 15.9-15.10: Inclusion-Exclusion and the Pigeonhole Principle',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — 1.6 Advanced Counting Using PIE',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
            {
              title: 'Berkeley CS70 — Counting notes (includes pigeonhole and inclusion-exclusion)',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'derangements',
              title: 'Derangements three ways',
              prompt:
                'Compute D(n) for n = 1..12 by (a) the inclusion-exclusion formula, (b) the recurrence D(n) = (n-1)(D(n-1) + D(n-2)), (c) brute force over permutations for n <= 8. Confirm all agree and that D(n)/n! approaches 1/e. Simulate 10^5 random shuffles of 52 cards and estimate the probability of no fixed point.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'inclusion-exclusion-problems',
              title: 'Count by complement',
              prompt:
                'Using inclusion-exclusion, count: integers 1..1000 divisible by none of 2, 3, 5 (expected 266); surjections from a 6-set onto a 3-set (540, verify by enumeration); permutations of 1..8 in which neither 1 nor 2 is in its own position; 8-letter strings over {a,b,c} using every letter. Verify each small case by enumeration.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pigeonhole-proofs',
              title: 'Pigeonhole proofs',
              prompt:
                'Prove: (a) among any n+1 integers from 1..2n, one divides another (boxes: odd parts); (b) among any n integers some non-empty subset sums to a multiple of n; (c) any 5 points in a unit square have two within distance 1/sqrt(2) ... hint: four quarter-squares; (d) any sequence of 10 distinct reals has a monotone subsequence of length 4. For (b), write a function that finds the subset and test it on random inputs.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'birthday-collisions',
              title: 'From pigeonhole to birthdays',
              prompt:
                'Pigeonhole guarantees a shared birthday among 367 people. Compute exactly the probability that among n people some two share a birthday, find the smallest n with probability above 1/2 (23), and simulate to confirm. Then relate: how many random 32-bit hash values before a collision is likely (about 2^16 = 65536)? Simulate with random.getrandbits(32).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State inclusion-exclusion for three sets.',
              answerOutline: '|A u B u C| = |A| + |B| + |C| - |A n B| - |A n C| - |B n C| + |A n B n C|.',
            },
            {
              question: 'What fraction of permutations are derangements for large n?',
              answerOutline: 'About 1/e, approximately 0.368.',
            },
            {
              question: 'State the generalised pigeonhole principle.',
              answerOutline: 'If n objects are placed in m boxes, some box contains at least ceil(n/m) objects.',
            },
            {
              question: 'What are the "boxes" in the proof that some subset of n integers sums to a multiple of n?',
              answerOutline: 'The n possible remainders of the n+1 prefix sums (including the empty sum); two prefix sums share a remainder and their difference is the subset.',
            },
          ],
        },
        {
          slug: 'generating-functions-intro',
          title: 'Generating functions: counting with polynomials',
          summary:
            'Encode a counting sequence as the coefficients of a power series, multiply series to combine choices, and extract closed forms for sequences like Fibonacci.',
          estimatedMinutes: 100,
          objectives: [
            'Write the ordinary generating function of a simple sequence and recognise 1/(1-x), 1/(1-x)^k and (1+x)^n',
            'Model a counting problem with constraints as a product of generating functions and extract a coefficient',
            'Solve a linear recurrence (Fibonacci) with generating functions and partial fractions',
            'Compute coefficients numerically with polynomial multiplication in Python',
          ],
          concepts: [
            'Ordinary generating function sum a_n x^n as a formal power series',
            'Geometric series 1/(1-x) and its derivatives',
            'Product rule: convolution of coefficients',
            'Modelling choices with constraints (coins, dice, bounded multiplicities)',
            'Coefficient extraction [x^n]',
            'Generating function of Fibonacci and partial fractions',
            'Binet formula',
            'Polynomial multiplication as the computational engine',
          ],
          explanation: `A **generating function** packages a sequence $a_0, a_1, a_2, \\dots$ into a single object $A(x) = \\sum_n a_n x^n$, treated as a *formal* power series: we never evaluate it, only manipulate coefficients. The payoff is that operations on sequences become algebra. The sequence $1, 1, 1, \\dots$ is $\\frac{1}{1-x}$; $1, 2, 3, \\dots$ is $\\frac{1}{(1-x)^2}$; the row of Pascal's triangle is $(1 + x)^n$; and multiplying two series **convolves** their coefficients: $[x^n] A(x) B(x) = \\sum_k a_k b_{n-k}$, which is exactly the product rule for "choose $k$ of one kind and $n - k$ of the other".

That makes constrained counting mechanical. Ways to make $n$ cents from pennies, nickels and dimes: $\\frac{1}{(1-x)(1-x^5)(1-x^{10})}$, and the coefficient of $x^n$ is the answer. Selections of fruit with an even number of apples, at most 2 bananas and any number of cherries: $(1 + x^2 + x^4 + \\cdots)(1 + x + x^2)\\frac{1}{1-x}$. Each factor encodes the allowed multiplicities of one item; the product encodes all combinations. Computationally, multiply polynomials truncated at degree $n$; a 20-line Python function does it, and the same convolution is what numpy's \`polymul\` computes.

Generating functions also **solve recurrences**. For Fibonacci, $F(x) = \\sum F_n x^n$ satisfies $F(x) = x + x F(x) + x^2 F(x)$ (multiply the recurrence by $x^n$ and sum), so $F(x) = \\frac{x}{1 - x - x^2}$. Partial fractions over the roots $\\phi, \\psi$ of $x^2 = x + 1$ give $F_n = \\frac{\\phi^n - \\psi^n}{\\sqrt{5}}$, **Binet's formula**, with the growth rate $\\phi \\approx 1.618$ you measured when timing naive recursion. The method generalises to every linear recurrence with constant coefficients and is the reason their solutions are sums of exponentials.

This lesson is an introduction; Wilf's *generatingfunctionology* is the free full treatment. Read MCS chapter 16 and Levin 5.1, then do the exercises, which end with you solving a recurrence you choose yourself.`,
          resources: [
            {
              title: 'MCS — Chapter 16: Generating Functions',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — 5.1 Generating Functions',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
            {
              title: 'generatingfunctionology (Wilf) — free second edition',
              url: 'https://www2.math.upenn.edu/~wilf/DownldGF.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Herbert Wilf',
              note: 'Chapters 1-2 for the full theory; the rest when you need it.',
            },
            {
              title: 'SymPy — series and rational function tools',
              url: 'https://docs.sympy.org/latest/index.html',
              type: 'tool',
              cost: 'free',
              provider: 'SymPy',
              note: 'Use series() and apart() to check your partial fractions.',
            },
          ],
          exercises: [
            {
              slug: 'polynomial-coin-change',
              title: 'Coin change by polynomial multiplication',
              prompt:
                'Write a truncated power-series multiplier and compute the number of ways to make 1..100 cents from 1, 5, 10, 25 cent coins (ways(100) = 242). Verify against a direct dynamic-programming count. Then count selections of 12 fruits with an even number of apples, at most 2 bananas and at least 1 cherry.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fibonacci-closed-form',
              title: 'Derive and verify Binet',
              prompt:
                'Derive F(x) = x / (1 - x - x^2) from the recurrence, do the partial fraction decomposition by hand, and obtain Binet\'s formula. Verify in Python that round(Binet(n)) == F(n) for n up to 70 and find the first n where floating-point error breaks it. Check the partial fractions with sympy.apart.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'dice-sums',
              title: 'Sums of dice',
              prompt:
                'The generating function of one die is x + x^2 + ... + x^6. Compute the distribution of the sum of 5 dice by raising it to the fifth power; verify the coefficient of x^17 against a brute-force enumeration (6^5 outcomes) and against 10^5 simulated rolls.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'solve-your-own-recurrence',
              title: 'Solve a recurrence of your own',
              prompt:
                'Pick a linear recurrence with constant coefficients of order 2 or 3 (e.g. a_n = 2 a_{n-1} + 3 a_{n-2}, a_0 = 1, a_1 = 1). Find its generating function, the closed form via partial fractions, and verify the first 30 terms by iteration. State the asymptotic growth rate.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does multiplying generating functions correspond to the product rule?',
              answerOutline: 'The coefficient of x^n in the product sums a_k b_{n-k} over all splits: choose k from the first kind and n-k from the second.',
            },
            {
              question: 'What is the generating function of 1, 1, 1, ... and of 1, 2, 3, ...?',
              answerOutline: '1/(1-x) and 1/(1-x)^2 (its derivative).',
            },
            {
              question: 'How do generating functions solve the Fibonacci recurrence?',
              answerOutline: 'Translate the recurrence into F(x) = x/(1 - x - x^2), split into partial fractions over the roots, and read off a sum of geometric series: Binet\'s formula.',
            },
          ],
        },
      ],
      project: {
        slug: 'combinatorics-verifier',
        title: 'Module project: a combinatorics verifier',
        description:
          'Write a library that, for a family of counting problems (k-subsets, k-permutations, multisets, anagrams, derangements, surjections, lattice paths, compositions, coin change), provides both a closed-form or generating-function count and a brute-force enumerator, and a test suite that checks they agree on every instance up to a size limit. Add a report that plots how long enumeration takes versus the formula and identifies the size where enumeration becomes infeasible.',
        deliverables: [
          'Formula and enumerator for at least nine problem families with property-based tests comparing them',
          'A generating-function engine (truncated series multiply, coefficient extraction) with tests',
          'A short report with timing plots and a discussion of one identity you discovered or confirmed computationally',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'graphs-and-trees',
      title: 'Graphs and Trees',
      description:
        'Graphs as the universal model of relationships: definitions and the handshake lemma, connectivity and traversal, Euler and Hamilton paths, trees and their characterisations, planarity and colouring.',
      lessons: [
        {
          slug: 'graph-basics-and-the-handshake-lemma',
          title: 'Graph basics and the handshake lemma',
          summary:
            'Vertices, edges, degree, simple graphs, subgraphs and isomorphism, with the first graph theorem proved by double counting.',
          estimatedMinutes: 90,
          objectives: [
            'Define simple graphs, multigraphs and directed graphs and represent them as adjacency lists and matrices',
            'Prove the handshake lemma and use it to show the number of odd-degree vertices is even',
            'Recognise standard graphs (complete, cycle, path, bipartite, hypercube) and count their edges',
            'Decide whether two small graphs are isomorphic and justify with invariants',
          ],
          concepts: [
            'Vertex, edge, degree, neighbourhood',
            'Simple graph vs multigraph vs directed graph',
            'Adjacency list and adjacency matrix',
            'Handshake lemma: sum of degrees = 2|E|',
            'Complete graph K_n, cycle C_n, path P_n, bipartite K_{m,n}, hypercube Q_n',
            'Subgraph, induced subgraph, complement',
            'Isomorphism and isomorphism invariants',
            'Degree sequence',
          ],
          explanation: `A **graph** $G = (V, E)$ is a set of **vertices** and a set of **edges**, each edge a pair of vertices. In a *simple* graph edges are unordered pairs with no loops or repeats; a *multigraph* allows parallel edges and loops; a *directed graph* (digraph) uses ordered pairs. The **degree** of a vertex is the number of edge ends at it. Everything from social networks to road maps to the dependency graph of your code is a graph, and the vocabulary is what lets you reason about them all at once.

Store a graph as an **adjacency list** (a dict mapping each vertex to a set of neighbours, which is what you want for sparse graphs and traversal) or an **adjacency matrix** ($n \\times n$ booleans, good for dense graphs and for algebra: the $(i, j)$ entry of $A^k$ counts walks of length $k$). The relation lesson already showed these are two views of the same thing.

The first theorem is the **handshake lemma**: $\\sum_{v} \\deg(v) = 2|E|$, because each edge contributes exactly two to the degree total. It is a double-counting argument (count edge-ends two ways), and its corollary is that the number of odd-degree vertices is even. So no graph has exactly one vertex of odd degree, a 7-vertex graph cannot be 3-regular, and in any party an even number of people shook hands an odd number of times.

Learn the **named graphs**: $K_n$ (complete, $\\binom{n}{2}$ edges), $C_n$ (cycle, $n$ edges), $P_n$ (path, $n - 1$ edges), $K_{m,n}$ (complete bipartite, $mn$ edges), and the hypercube $Q_n$ (vertices are $n$-bit strings, adjacent when differing in one bit; $n 2^{n-1}$ edges by the handshake lemma). **Isomorphism** is "the same graph with relabelled vertices": a bijection on vertices preserving adjacency. To prove two graphs are *not* isomorphic, find an **invariant** that differs (vertex count, edge count, degree sequence, number of triangles, connectivity); to prove they *are*, exhibit the bijection. Read MCS 11.1-11.3 and Levin 4.1, then build the small graph library in the exercises; every later lesson extends it.`,
          resources: [
            {
              title: 'MCS — Chapter 11: Simple Graphs (11.1-11.4)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — Chapter 4: Graph Theory (4.1 Definitions)',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
            {
              title: 'Graph Theory (Diestel) — free online preview edition, Chapter 1: The Basics',
              url: 'https://diestel-graph-theory.com/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Reinhard Diestel',
              note: 'The graduate reference; the online preview of the main text is free, the eBook is paid. Use for precise definitions only.',
            },
            {
              title: 'NetworkX documentation',
              url: 'https://networkx.org/documentation/stable/',
              type: 'tool',
              cost: 'free',
              provider: 'NetworkX',
              note: 'Use to cross-check your own implementations, not to replace them.',
            },
          ],
          exercises: [
            {
              slug: 'graph-library-v1',
              title: 'Start a graph library',
              prompt:
                'Write a Graph class with add_edge, neighbours, degree, vertices, edges, from an adjacency-list dict, plus constructors complete(n), cycle(n), path(n), bipartite(m, n) and hypercube(n). Assert the handshake lemma for every constructed graph and random graphs, and verify edge counts C(n,2), n, n-1, mn and n 2^(n-1).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'handshake-consequences',
              title: 'Handshake lemma consequences',
              prompt:
                'Prove the handshake lemma and its corollary. Then decide, with proof or construction: is there a graph with degree sequence (3,3,3,3,3,3,3)? (4,4,4,4,4)? (5,5,4,3,2,1)? Write is_graphical(seq) using the Havel-Hakimi algorithm and check these and 100 random sequences against brute-force realisation for n <= 6.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'isomorphism-by-invariants',
              title: 'Isomorphism testing',
              prompt:
                'Write invariants(G) returning (|V|, |E|, sorted degree sequence, triangle count). Enumerate all simple graphs on 4 vertices (64 labelled graphs), group them by invariants, and then by brute-force isomorphism (try all 24 vertex permutations); confirm there are 11 isomorphism classes. Find a pair of non-isomorphic graphs on 6 vertices with identical invariants.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State and prove the handshake lemma.',
              answerOutline: 'Sum of degrees equals 2|E| because each edge contributes one to the degree of each endpoint; count edge-ends two ways.',
            },
            {
              question: 'Why can a graph not have exactly three vertices of odd degree?',
              answerOutline: 'The degree sum would be odd, contradicting the handshake lemma.',
            },
            {
              question: 'How many edges does the hypercube Q_n have?',
              answerOutline: 'Each of 2^n vertices has degree n, so n 2^n / 2 = n 2^(n-1).',
            },
            {
              question: 'How do you prove two graphs are not isomorphic?',
              answerOutline: 'Exhibit an invariant (degree sequence, edge count, triangle count, connectivity) on which they differ.',
            },
          ],
        },
        {
          slug: 'paths-connectivity-and-traversal',
          title: 'Walks, paths, connectivity and traversal',
          summary:
            'Walks versus paths, connected components as equivalence classes, and breadth-first and depth-first search as the algorithms that make connectivity computable.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish walks, trails, paths and cycles and prove that a walk between two vertices contains a path',
            'Prove that "connected to" is an equivalence relation and that components partition the vertices',
            'Implement BFS and DFS and prove BFS finds shortest paths in unweighted graphs',
            'Bound the number of edges of a connected graph below and of a graph with k components above',
          ],
          concepts: [
            'Walk, trail, path, cycle, closed walk',
            'Connected graph; connected components',
            'Reachability as an equivalence relation',
            'Breadth-first search, levels, shortest paths',
            'Depth-first search, discovery order, recursion vs explicit stack',
            'Connected graph has at least n-1 edges',
            'Cut vertices and bridges',
            'Directed graphs: strong connectivity, DAGs (preview)',
          ],
          explanation: `A **walk** is a sequence of vertices with each consecutive pair adjacent; it may repeat vertices and edges. A **trail** repeats no edge; a **path** repeats no vertex; a **cycle** is a closed path. The first lemma: if there is a walk from $u$ to $v$ there is a path, obtained by cutting out the loop between any repeated vertex (induction on walk length). This matters because "reachable" is naturally defined by walks but theorems are proved about paths.

"$u$ is reachable from $v$" is **reflexive** (empty walk), **symmetric** (reverse the walk; in undirected graphs), and **transitive** (concatenate walks), so it is an equivalence relation and its classes are the **connected components**: a partition of $V$. A graph is **connected** if there is one component. A connected graph on $n$ vertices has at least $n - 1$ edges (induction: removing an edge creates at most two components), and a graph with $k$ components and $n$ vertices has at most $\\binom{n - k + 1}{2}$ edges (cram everything into one big clique).

Connectivity is computed by **traversal**. **Breadth-first search** from $s$ explores by levels using a queue: all vertices at distance 1, then 2, and so on. The invariant "when a vertex is dequeued, its recorded distance is its true shortest distance" is proved by induction on distance, so BFS gives shortest paths in unweighted graphs and the level structure. **Depth-first search** goes as deep as possible using recursion or an explicit stack; it finds the same components but visits in a different order, and that order (discovery and finish times) is what later algorithms exploit for cycle detection, topological sort and strong components. Both run in $O(|V| + |E|)$ with adjacency lists.

In **directed** graphs reachability is not symmetric; "mutually reachable" is the equivalence relation, with **strongly connected components** as classes, and a digraph with no directed cycle is a **DAG**, the structure of every dependency and scheduling problem. Read MCS 11.5-11.7 and 10.1-10.5 (digraphs), Levin 4.2. Implement BFS and DFS in your library; Data Structures and Algorithms is their canonical home, so aim for correctness and the proofs here.`,
          resources: [
            {
              title: 'MCS — Chapter 11.5-11.7: Walks, paths, connectivity; Chapter 10: Directed graphs',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Berkeley CS70 — Note on graphs (connectivity, Euler tours)',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — 4.2-4.3 Trees and Planar Graphs (connectivity background)',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
          ],
          exercises: [
            {
              slug: 'bfs-dfs-components',
              title: 'BFS, DFS and components',
              prompt:
                'Add bfs(s) returning distances and parents, dfs(s) returning discovery order, and components() to your graph library. On a random graph with 1000 vertices and 1500 edges, report the number and sizes of components. Verify bfs distances against networkx.shortest_path_length on 20 random pairs and that every component is a maximal connected set.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'walk-to-path-and-bounds',
              title: 'Walk-to-path and the edge bounds',
              prompt:
                'Prove: (a) every walk from u to v contains a path from u to v; (b) a connected graph on n vertices has at least n-1 edges; (c) a graph with n vertices and k components has at most C(n-k+1, 2) edges. Verify (b) and (c) numerically on all graphs with up to 6 vertices by enumeration.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bfs-correctness',
              title: 'Prove BFS finds shortest paths',
              prompt:
                'State the BFS loop invariant (the queue holds vertices in non-decreasing distance with at most two distinct distances; every vertex at distance d is discovered before any at d+1) and prove by induction that the recorded distance equals the true distance. Then instrument your BFS to assert the invariant at every dequeue and run on 100 random graphs.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'random-graph-threshold',
              title: 'When does a random graph become connected?',
              prompt:
                'For n = 200, generate random graphs with m edges for m from 0 to 1500 in steps of 50 (20 trials each) and plot the fraction that are connected and the size of the largest component. Identify the sharp transition and compare the connectivity threshold with (n/2) ln n ~ 530.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a walk, a trail and a path?',
              answerOutline: 'Walk: any sequence of adjacent vertices; trail: no repeated edge; path: no repeated vertex.',
            },
            {
              question: 'Why do connected components partition the vertex set?',
              answerOutline: 'Reachability is an equivalence relation (reflexive, symmetric, transitive), and equivalence classes partition.',
            },
            {
              question: 'Why does BFS find shortest paths but DFS does not?',
              answerOutline: 'BFS explores in order of distance (queue), so the first discovery of a vertex is along a shortest path; DFS may reach a vertex by a long route first.',
            },
            {
              question: 'What is the minimum number of edges in a connected graph on n vertices?',
              answerOutline: 'n - 1, achieved exactly by trees.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/graphs/graph-representations-bfs-dfs'],
        },
        {
          slug: 'euler-and-hamilton',
          title: 'Euler trails, Hamilton cycles and the difference between them',
          summary:
            'The bridges of Konigsberg, the degree condition for Euler circuits and its constructive proof, and why Hamilton cycles have no such characterisation.',
          estimatedMinutes: 90,
          objectives: [
            'State and prove Euler\'s theorem: a connected graph has an Euler circuit iff every degree is even',
            'Implement Hierholzer\'s algorithm to construct an Euler circuit',
            'Explain the Hamilton cycle problem and why no simple degree condition decides it',
            'Apply Dirac\'s sufficient condition and construct graphs where it fails yet a Hamilton cycle exists',
          ],
          concepts: [
            'Euler trail and Euler circuit',
            'Konigsberg bridges as a multigraph',
            'Necessity: even degrees; sufficiency via splicing cycles',
            'Hierholzer\'s algorithm',
            'Euler trail: exactly 0 or 2 odd vertices',
            'Hamilton path and cycle',
            'Dirac\'s theorem (degree >= n/2) as a sufficient condition',
            'Easy vs hard: Euler is polynomial, Hamilton is NP-complete',
          ],
          explanation: `Graph theory began with a puzzle: can one walk through Königsberg crossing each of its seven bridges exactly once? Model land masses as vertices and bridges as edges (a multigraph) and the question is whether an **Euler trail** (a trail using every edge) exists. Euler's 1736 answer is the first theorem of the subject and a model of a necessary-and-sufficient proof.

**Necessity**: in an Euler circuit (closed trail using every edge), each visit to a vertex uses two edge-ends, so every degree is even; for an open trail exactly the two endpoints are odd. Königsberg had four odd vertices, so no trail exists. **Sufficiency**, the harder direction: if a connected graph has all degrees even, start anywhere and walk without reusing edges; because degrees are even you can never get stuck except back at the start, so you obtain a closed trail. If it does not use all edges, some vertex on it has unused edges (by connectivity); walk a second closed trail from there and **splice** it in. Repeat; each splice strictly enlarges the trail, so the process terminates with an Euler circuit. That proof *is* **Hierholzer's algorithm**, which runs in $O(|E|)$.

A **Hamilton cycle** visits every *vertex* exactly once. The definitions look parallel, but the problems are not: no degree condition is both necessary and sufficient, and deciding whether a Hamilton cycle exists is NP-complete (Theory of Computation), so the best known algorithms are exponential. **Dirac's theorem** gives a sufficient condition: if $n \\ge 3$ and every vertex has degree at least $n/2$, a Hamilton cycle exists; the proof extends a longest path into a cycle by a clever counting argument on neighbours. But many graphs with small degrees (the cycle $C_n$ itself) are Hamiltonian, and dense-looking graphs can fail (two cliques joined at a single vertex).

The lesson is a recurring one: two problems that look alike can sit on opposite sides of the tractability line. Read MCS 11.8 and Levin 4.5 (Euler paths and circuits), then implement Hierholzer and a backtracking Hamilton search and measure the gap.`,
          resources: [
            {
              title: 'Discrete Mathematics: An Open Introduction — 4.5 Euler Paths and Circuits',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
              primary: true,
            },
            {
              title: 'MCS — Chapter 11.8: Euler tours (and Hamilton cycles in the problems)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Berkeley CS70 — Graphs note (Euler tour proof)',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'hierholzer',
              title: 'Implement Hierholzer\'s algorithm',
              prompt:
                'Add has_euler_circuit() (connected and all degrees even) and euler_circuit() via Hierholzer to your library. Verify on K_5 (circuit of 10 edges), the Konigsberg multigraph (none), K_4 (none; 4 odd vertices), and 100 random connected even-degree graphs (construct them by unioning random cycles). Check every returned circuit uses each edge exactly once.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'euler-proof',
              title: 'Write Euler\'s theorem proof',
              prompt:
                'Write the full proof of Euler\'s theorem (both directions) and the variant for open trails (exactly two odd vertices). Then answer: for which n does K_n have an Euler circuit? For which m, n does K_{m,n}? Which hypercubes Q_n? Verify your answers with has_euler_circuit for small cases.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'hamilton-backtracking',
              title: 'Hamilton cycles by backtracking',
              prompt:
                'Write hamilton_cycle(G) by backtracking search. Confirm Dirac\'s condition on random graphs (every graph with min degree >= n/2 for n = 8..12 returns a cycle), find a graph on 8 vertices with min degree 2 that is Hamiltonian, and one with min degree 3 that is not (two K_4s sharing a vertex). Time the search on random graphs with n = 10, 14, 18, 22 and edge probability 0.3 to observe exponential growth.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the condition for a connected graph to have an Euler circuit? An Euler trail?',
              answerOutline: 'All degrees even; exactly zero or two odd-degree vertices (trail starts and ends at the odd ones).',
            },
            {
              question: 'Sketch the sufficiency proof of Euler\'s theorem.',
              answerOutline: 'Walk without repeating edges; even degrees mean you only get stuck at the start, giving a closed trail; splice in closed trails from vertices with unused edges until all edges are used.',
            },
            {
              question: 'Why is the Hamilton cycle problem considered hard while Euler is easy?',
              answerOutline: 'Euler has a checkable degree characterisation and a linear algorithm; Hamilton is NP-complete with no known polynomial algorithm.',
            },
            {
              question: 'Does Dirac\'s theorem give a necessary condition?',
              answerOutline: 'No, only sufficient: C_n is Hamiltonian with degree 2.',
            },
          ],
        },
        {
          slug: 'trees',
          title: 'Trees',
          summary:
            'The many equivalent definitions of a tree, why every tree on n vertices has n-1 edges, spanning trees, rooted trees, and Cayley\'s formula.',
          estimatedMinutes: 100,
          objectives: [
            'Prove the equivalence of the standard characterisations of a tree (connected and acyclic; connected with n-1 edges; unique path between any two vertices)',
            'Prove every tree with at least two vertices has at least two leaves and use it in inductions on trees',
            'Construct a spanning tree with BFS or DFS and explain why every connected graph has one',
            'Count labelled trees via Cayley\'s formula and Prufer codes',
          ],
          concepts: [
            'Tree: connected and acyclic; forest',
            'Leaf; every tree with n >= 2 has >= 2 leaves',
            'Equivalent characterisations of trees',
            '|E| = |V| - 1 and induction by leaf removal',
            'Spanning tree; existence via traversal',
            'Rooted trees: parent, child, depth, height; binary trees',
            'Cayley\'s formula n^(n-2) and the Prufer bijection',
            'Trees as data structures and as recursion skeletons',
          ],
          explanation: `A **tree** is a connected graph with no cycles; a **forest** is any acyclic graph (its components are trees). Trees are the simplest connected graphs and the skeleton of recursion, file systems, parse trees and search structures, so their theory is worth knowing cold.

The basic lemma: a tree with at least two vertices has at least two **leaves** (degree-1 vertices). Proof: a longest path cannot be extended at either end, and a neighbour of an endpoint outside the path would create a cycle, so both endpoints have degree 1. The lemma powers **induction on trees**: remove a leaf, apply the hypothesis to the smaller tree, put the leaf back. That is how you prove that every tree on $n$ vertices has exactly $n - 1$ edges.

The characterisations are all equivalent for a graph $G$ on $n$ vertices: (1) $G$ is connected and acyclic; (2) $G$ is connected with $n - 1$ edges; (3) $G$ is acyclic with $n - 1$ edges; (4) any two vertices are joined by exactly one path; (5) $G$ is connected but removing any edge disconnects it; (6) $G$ is acyclic but adding any edge creates a cycle. Proving a cycle of implications among these is a classic exercise, and each one is a tool: (4) says tree-structured networks have unique routes, (5) says every edge of a tree is a bridge.

A **spanning tree** of a connected graph is a subgraph that is a tree containing every vertex. BFS and DFS parent pointers form one, which proves existence constructively; minimum-weight spanning trees are an algorithms topic. **Rooted trees** add a distinguished root and hence parent/child, depth and height; a binary tree of height $h$ has at most $2^{h+1} - 1$ vertices, which is where logarithmic bounds on search trees come from.

How many labelled trees on $n$ vertices are there? **Cayley's formula**: $n^{n-2}$. The neatest proof is a bijection with **Prüfer codes**, sequences of length $n - 2$ over the labels: repeatedly remove the smallest leaf and record its neighbour. Implement both directions and the count verifies itself. Read MCS 11.9-11.10 and Levin 4.2.`,
          resources: [
            {
              title: 'Discrete Mathematics: An Open Introduction — 4.2 Trees',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
              primary: true,
            },
            {
              title: 'MCS — Chapter 11.9-11.10: Forests and trees, spanning trees',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Graph Theory (Diestel) — Chapter 1.5 Trees and forests (online preview)',
              url: 'https://diestel-graph-theory.com/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Reinhard Diestel',
            },
            {
              title: 'OEIS A000272: number of labelled trees on n nodes',
              url: 'https://oeis.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'OEIS Foundation',
              note: 'Search A000272 to confirm your Cayley counts.',
            },
          ],
          exercises: [
            {
              slug: 'tree-characterisations',
              title: 'Prove the tree characterisations',
              prompt:
                'Prove the leaf lemma and then prove (1) => (4) => (2) => (1) for the characterisations in the lesson (connected acyclic; unique paths; connected with n-1 edges). Write is_tree(G) that checks (1) and separately checks (2) and (4), and assert all three agree on 1000 random graphs with n <= 8.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'spanning-trees',
              title: 'Spanning trees from traversal',
              prompt:
                'Add spanning_tree(G, method="bfs"|"dfs") using parent pointers. Verify the result is a tree with n-1 edges spanning each connected graph, and compare BFS and DFS tree heights on a 30x30 grid graph (expected: BFS height ~58, DFS much larger). Count all spanning trees of K_4 by enumeration (16) and compare with Cayley.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'prufer-codes',
              title: 'Prufer codes and Cayley\'s formula',
              prompt:
                'Implement tree_to_prufer and prufer_to_tree. Verify round trips for 1000 random trees on 10 vertices, and that iterating over all n^(n-2) codes for n = 5 produces 125 distinct trees (as edge sets) and every tree on 5 labelled vertices. Explain why the bijection proves Cayley\'s formula.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tree-inductions',
              title: 'Inductions on trees',
              prompt:
                'Prove by leaf-removal induction: (a) every tree on n vertices has n-1 edges; (b) a binary tree of height h has at most 2^(h+1) - 1 vertices; (c) a full binary tree with L leaves has L-1 internal vertices. Check (c) by generating random full binary trees in Python.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does every tree with at least two vertices have a leaf?',
              answerOutline: 'The endpoints of a longest path have no neighbours outside the path (else extend it) and only one on it (else a cycle), so they have degree 1.',
            },
            {
              question: 'Give three equivalent definitions of a tree.',
              answerOutline: 'Connected and acyclic; connected with n-1 edges; a unique path between every pair of vertices.',
            },
            {
              question: 'How many labelled trees are there on n vertices and what proves it?',
              answerOutline: 'n^(n-2) (Cayley); the Prufer bijection between trees and sequences of length n-2 over n labels.',
            },
            {
              question: 'Why does every connected graph have a spanning tree?',
              answerOutline: 'BFS/DFS from any vertex reaches all vertices and its parent edges form a connected acyclic subgraph.',
            },
          ],
        },
        {
          slug: 'planarity-and-colouring',
          title: 'Planar graphs and colouring',
          summary:
            'Euler\'s formula for planar graphs and its consequences, why K5 and K3,3 are not planar, graph colouring, bipartite graphs and the chromatic number.',
          estimatedMinutes: 90,
          objectives: [
            'State Euler\'s formula V - E + F = 2 and prove it by induction',
            'Derive E <= 3V - 6 and use it to show K5 and K3,3 are non-planar',
            'Define proper colouring and chromatic number and prove a graph is bipartite iff it has no odd cycle',
            'Implement greedy colouring and 2-colouring via BFS, and explain why optimal colouring is hard',
          ],
          concepts: [
            'Planar graph, plane drawing, faces',
            'Euler\'s formula V - E + F = 2 for connected planar graphs',
            'Edge bounds: E <= 3V - 6 (and 2V - 4 for triangle-free)',
            'K5 and K3,3 are not planar; Kuratowski (statement)',
            'Proper colouring, chromatic number',
            'Bipartite iff no odd cycle; 2-colouring by BFS',
            'Greedy colouring uses at most max degree + 1 colours',
            'Four colour theorem (statement); colouring as scheduling',
          ],
          explanation: `A graph is **planar** if it can be drawn in the plane with no edges crossing; the drawing divides the plane into **faces** (including the unbounded outer face). **Euler's formula**: for a connected planar graph, $V - E + F = 2$. Proof by induction on $E$: a tree has $F = 1$ and $E = V - 1$; adding an edge to a connected graph that creates a cycle splits a face into two, raising $E$ and $F$ by one each. Try it on a cube ($8 - 12 + 6 = 2$) and a dodecahedron.

The formula has sharp consequences. Each face is bounded by at least 3 edges and each edge borders at most 2 faces, so $3F \\le 2E$; substituting, $E \\le 3V - 6$ for $V \\ge 3$. $K_5$ has $V = 5$, $E = 10 > 9$: **not planar**. For triangle-free graphs faces have at least 4 edges, giving $E \\le 2V - 4$; $K_{3,3}$ has $E = 9 > 8$: not planar. Remarkably those two are the whole story: **Kuratowski's theorem** says a graph is planar iff it contains no subdivision of $K_5$ or $K_{3,3}$. Another corollary: every planar graph has a vertex of degree at most 5 (else $2E \\ge 6V$), which is the induction step for the easy six-colour theorem.

A **proper colouring** assigns colours to vertices so adjacent vertices differ; the **chromatic number** $\\chi(G)$ is the minimum number needed. Colouring is scheduling in disguise: vertices are tasks, edges are conflicts, colours are time slots. $\\chi(G) = 2$ exactly when $G$ is **bipartite**, and a graph is bipartite iff it has **no odd cycle**: necessity is immediate (colours alternate around a cycle), sufficiency is BFS: colour by parity of distance, and an edge within a level would close an odd cycle. So 2-colourability is decided in linear time. The **greedy** algorithm (colour vertices in some order with the smallest free colour) uses at most $\\Delta + 1$ colours, but finding $\\chi(G)$ exactly, or even deciding 3-colourability, is NP-complete. The **four colour theorem** says every planar graph has $\\chi \\le 4$; its proof is famously computer-assisted.

Read MCS 11.11 (colouring appears early in the chapter as well), Levin 4.3-4.4, and do the exercises, which include the classic exam-scheduling application.`,
          resources: [
            {
              title: 'Discrete Mathematics: An Open Introduction — 4.3 Planar Graphs and 4.4 Coloring',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
              primary: true,
            },
            {
              title: 'MCS — Chapter 11: Coloring (11.3-11.4) and Chapter 12: Planar Graphs',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'NetworkX — graph colouring and planarity functions',
              url: 'https://networkx.org/documentation/stable/',
              type: 'tool',
              cost: 'free',
              provider: 'NetworkX',
              note: 'check_planarity and greedy_color for cross-checking your implementations.',
            },
          ],
          exercises: [
            {
              slug: 'euler-formula-checks',
              title: 'Euler\'s formula and the edge bound',
              prompt:
                'Prove Euler\'s formula by induction on edges and derive E <= 3V - 6. Verify the formula for the five Platonic solids (compute F from V and E, compare with the known face counts) and use the bound to show K5 and K3,3 are non-planar. Use networkx.check_planarity to test 1000 random graphs with n = 10 and plot the fraction planar versus edge count; mark 3V - 6 = 24 on the plot.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'two-colouring-and-odd-cycles',
              title: 'Bipartite test by BFS',
              prompt:
                'Implement is_bipartite(G) by BFS parity colouring that returns either a 2-colouring or an odd cycle as a witness. Prove the theorem (bipartite iff no odd cycle). Test on C_6, C_7, the Petersen graph, Q_4, and random graphs; always verify the witness (colouring is proper, or the cycle is odd and real).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exam-scheduling',
              title: 'Exam scheduling by colouring',
              prompt:
                'Build a conflict graph for 30 courses with random student enrolments (an edge when two courses share a student). Colour it greedily in three vertex orders (arbitrary, decreasing degree, smallest-last) and compare the number of time slots. Find the exact chromatic number by backtracking for a 12-course instance and compare with greedy.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State Euler\'s formula and the idea of its proof.',
              answerOutline: 'V - E + F = 2 for connected planar graphs; induction on edges from a spanning tree (F = 1), each added edge splits a face.',
            },
            {
              question: 'Why is K_{3,3} not planar?',
              answerOutline: 'It is triangle-free so E <= 2V - 4 = 8 would be required, but it has 9 edges.',
            },
            {
              question: 'When is a graph 2-colourable?',
              answerOutline: 'Exactly when it is bipartite, i.e. has no odd cycle; BFS parity decides it.',
            },
            {
              question: 'What does greedy colouring guarantee and what does it not?',
              answerOutline: 'At most max degree + 1 colours; it does not guarantee the chromatic number, and finding that exactly is NP-hard.',
            },
          ],
        },
      ],
      project: {
        slug: 'graph-library',
        title: 'Module project: a tested graph library',
        description:
          'Consolidate the module into a package: Graph and DiGraph classes with adjacency-list storage, standard constructors, BFS/DFS, components, bipartite testing with witnesses, Euler circuits (Hierholzer), spanning trees, Prufer codes, greedy and exact colouring, and planarity bounds. Every theorem from the module becomes a property test (handshake lemma, tree edge count, Euler formula on planar inputs, Cayley counts). Apply it to a real network (e.g. a road network from OpenStreetMap or a social network dataset) and report degrees, components, diameter and chromatic bounds.',
        deliverables: [
          'A package with tests that encode at least eight theorems as properties checked on random graphs',
          'Cross-validation against NetworkX for components, shortest paths, bipartiteness and planarity',
          'A short analysis of one real network with plots of the degree distribution and component sizes',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'recurrences-induction-and-growth',
      title: 'Recurrences, Induction and Growth',
      description:
        'Induction in all its forms as the proof method of computer science, invariants for algorithms and state machines, solving the recurrences that describe recursive algorithms, and comparing growth rates asymptotically.',
      lessons: [
        {
          slug: 'induction',
          title: 'Mathematical induction',
          summary:
            'Ordinary induction: base case, inductive step, and the discipline of stating the hypothesis exactly; sums, inequalities and divisibility claims.',
          estimatedMinutes: 100,
          objectives: [
            'Write an induction proof with an explicit predicate P(n), base case and inductive step',
            'Prove closed forms for sums, inequalities like 2^n > n^2 for n >= 5, and divisibility claims by induction',
            'Explain why induction is valid in terms of the well-ordering principle',
            'Diagnose broken induction proofs (wrong base case, hypothesis used for a case it does not cover)',
          ],
          concepts: [
            'Predicate P(n); base case; inductive step P(n) -> P(n+1)',
            'The induction principle and the well-ordering principle',
            'Sums: arithmetic, geometric, sum of squares',
            'Inequalities by induction and the need for a late base case',
            'Divisibility by induction',
            'Strengthening the hypothesis',
            'Common errors: all horses are the same colour',
            'Induction as recursion read backwards',
          ],
          explanation: `**Induction** proves that $P(n)$ holds for every natural number $n$ by proving two things: the **base case** $P(0)$ (or $P(1)$), and the **inductive step**: for every $n$, $P(n) \\Rightarrow P(n+1)$. Picture dominoes: the first falls, and each knocks over the next. Its validity rests on the **well-ordering principle** (every non-empty set of naturals has a least element): if $P$ failed somewhere, take the least failure $m$; $m$ is not the base case, so $P(m-1)$ holds, and the step gives $P(m)$, a contradiction.

The discipline that makes induction proofs correct is **stating $P(n)$ exactly** as a sentence with $n$ free, and in the step, writing "assume $P(n)$: [the sentence]. We show $P(n+1)$: [the sentence with $n+1$]." Most failed proofs skip this and silently prove something else. The classic sum $1 + 2 + \\cdots + n = n(n+1)/2$ is the first exercise; sums of squares and geometric series follow the same pattern: add the next term to both sides of the hypothesis and simplify.

Inequalities need care about *where to start*: $2^n > n^2$ fails at $n = 2, 3, 4$ and holds from $n = 5$, so the base case is $P(5)$ and the step must use $n \\ge 5$. Divisibility claims ($n^3 - n$ is divisible by 6; $7^n - 1$ is divisible by 6) are proved by writing $f(n+1) - f(n)$ or $f(n+1) = 7 f(n) + 6$ and using the hypothesis.

Sometimes the step does not go through because $P(n)$ is too weak to imply $P(n+1)$; the fix is to **strengthen** the claim, which gives you more to work with. A famous example: proving $\\sum 1/k^2 < 2$ directly fails, but $\\sum_{k \\le n} 1/k^2 \\le 2 - 1/n$ succeeds. And study the "all horses are the same colour" fallacy: the step from $n = 1$ to $n = 2$ is the one that fails, because the two overlapping sets do not overlap. Read MCS chapter 5.1-5.2 and Book of Proof chapter 10; the exercises are proofs plus a Python checker that evaluates $P(n)$ for small $n$ before you commit to proving it.`,
          resources: [
            {
              title: 'MCS — Chapter 5: Induction (5.1 ordinary induction)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Book of Proof — Chapter 10: Mathematical Induction',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
            },
            {
              title: 'MCS — Chapter 2: The Well Ordering Principle',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Lean Game Server — Natural Number Game (induction in Advanced Addition and Multiplication worlds)',
              url: 'https://adam.math.hhu.de/',
              type: 'interactive',
              cost: 'free',
              provider: 'Lean community',
            },
          ],
          exercises: [
            {
              slug: 'six-inductions',
              title: 'Six induction proofs',
              prompt:
                'Prove by induction, stating P(n) explicitly each time: sum of first n odd numbers is n^2; sum of k^2 from 1 to n is n(n+1)(2n+1)/6; sum of r^k from 0 to n is (r^(n+1) - 1)/(r - 1); 2^n > n^2 for n >= 5; 3 divides n^3 + 2n; n! > 2^n for n >= 4. Before each proof, check P(n) numerically for n up to 50 with a script.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'strengthen-the-hypothesis',
              title: 'Strengthen the hypothesis',
              prompt:
                'Try to prove sum_{k=1}^{n} 1/k^2 < 2 directly by induction and explain precisely why the step fails. Then prove the stronger statement sum_{k=1}^{n} 1/k^2 <= 2 - 1/n and deduce the original. Compute the partial sums numerically to see how much room there is.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'broken-inductions',
              title: 'Broken inductions',
              prompt:
                'Find the error in each: (a) "all horses are the same colour"; (b) a "proof" that every integer n >= 2 is prime that checks only n = 2 and claims P(n) -> P(n+1) without using the hypothesis; (c) a proof of 2^n > n^2 for all n >= 1 with base case n = 1; (d) a proof that n lines in the plane always have a common point. For each, say which component (base, step, or hypothesis use) is wrong.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'tiling-induction',
              title: 'L-tromino tiling',
              prompt:
                'Prove that a 2^n x 2^n board with one square removed can be tiled by L-shaped trominoes, by induction on n. Then implement the proof as a recursive Python function that produces an actual tiling for n = 1..5 and prints it, verifying each tile covers exactly three empty squares.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What two things must an induction proof establish?',
              answerOutline: 'The base case P(n0), and for all n >= n0 the implication P(n) -> P(n+1), with P stated explicitly.',
            },
            {
              question: 'Why is induction valid?',
              answerOutline: 'By well-ordering: a least counterexample m would have P(m-1) true (m is not the base), and the step forces P(m).',
            },
            {
              question: 'Where does the "all horses" proof fail?',
              answerOutline: 'The step from 1 to 2: the two subsets of size 1 do not overlap, so transitivity of same-colour cannot be applied.',
            },
            {
              question: 'When should you strengthen the induction hypothesis?',
              answerOutline: 'When P(n) alone does not give enough to derive P(n+1); a stronger, more specific claim often has an easier step.',
            },
          ],
        },
        {
          slug: 'strong-induction-and-invariants',
          title: 'Strong induction, invariants and state machines',
          summary:
            'Strong induction for claims that depend on several earlier cases, and the invariant method for proving that algorithms and state machines never reach a bad state.',
          estimatedMinutes: 100,
          objectives: [
            'Write strong-induction proofs (prime factorisation, postage stamps, game strategies) and explain when strong beats ordinary induction',
            'Prove a property of a state machine or loop by exhibiting a preserved invariant',
            'Prove termination with a strictly decreasing measure (derived variable)',
            'Prove the correctness of a simple algorithm (Euclid, binary search, fast exponentiation) with invariant plus termination',
          ],
          concepts: [
            'Strong induction: assume P(k) for all k < n',
            'Equivalence of strong and ordinary induction (via a stronger predicate)',
            'State machine: states, transitions, start state',
            'Invariant: a predicate preserved by every transition',
            'Partial correctness vs termination',
            'Termination via a well-founded decreasing measure',
            'Loop invariants in code',
            'Reachability and unreachable states (puzzles: die hard jugs, 15-puzzle)',
          ],
          explanation: `**Strong induction** assumes $P(k)$ for *all* $k < n$ when proving $P(n)$. It is needed when the case $n$ depends on cases other than $n - 1$: every integer $\\ge 2$ has a prime factorisation (if $n = ab$, use the hypothesis on $a$ and $b$); every amount of postage $\\ge 12$ can be made from 4- and 5-cent stamps (use $n - 4$, with base cases 12, 13, 14, 15); the Fibonacci bound $F_n \\le \\phi^{n-1}$ (uses $n-1$ and $n-2$). Strong induction is not more powerful in principle (apply ordinary induction to "P(k) for all $k \\le n$"), but it is more convenient, and it clarifies that the base cases must cover every $n$ the step cannot reach back from.

The most important application for a programmer is the **invariant method**. Model a program or system as a **state machine**: a set of states, a start state, and transitions. A predicate on states is an **invariant** if it holds at the start and every transition preserves it. By induction on the number of steps, it then holds in every reachable state. To show a bad state is unreachable, find an invariant that the bad state violates. The *Die Hard* jug puzzle: with 3- and 6-gallon jugs, every reachable state has both amounts divisible by 3, so 4 gallons is impossible. The 15-puzzle: parity of permutation plus blank row is invariant, so half the configurations are unreachable.

Algorithm correctness has two halves. **Partial correctness**: if the loop terminates, the answer is right; prove it with a loop invariant that holds before the loop, is preserved by the body, and together with the exit condition implies the postcondition. For Euclid: $\\gcd(x, y) = \\gcd(a, b)$. For binary search: the target, if present, lies in $[lo, hi]$. For fast exponentiation: $r \\cdot x^k = a^n$. **Termination**: exhibit a natural-number measure that strictly decreases every iteration (well-ordering again): $y$ in Euclid, $hi - lo$ in binary search, $k$ in exponentiation. Writing the invariant as an \`assert\` in your code turns the proof into a test. Read MCS 5.2-5.4 and chapter 6 (state machines); the exercises are a mix of puzzles and real algorithm proofs.`,
          resources: [
            {
              title: 'MCS — Chapter 5.2-5.4: Strong induction, state machines, invariants; Chapter 6: Recursive Data Types',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Book of Proof — Chapter 10.1 Proof by strong induction',
              url: 'https://richardhammack.github.io/BookOfProof/',
              type: 'textbook',
              cost: 'free',
              provider: 'Richard Hammack',
            },
            {
              title: 'Berkeley CS70 — Note on induction (includes strong induction and invariants)',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'strong-induction-proofs',
              title: 'Strong induction proofs',
              prompt:
                'Prove: (a) every n >= 12 is 4a + 5b with a, b >= 0 (find and justify the base cases); (b) F_n <= phi^(n-1) and F_n >= phi^(n-2) for n >= 1; (c) every positive integer is a sum of distinct powers of 2 (binary representation exists); (d) in the game where players remove 1-3 stones and the taker of the last stone wins, the player to move loses iff the pile is a multiple of 4. Verify (a) and (d) by exhaustive computation to n = 200.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'jug-invariant',
              title: 'Jug puzzles by invariant and by search',
              prompt:
                'For jugs of sizes a and b, write a BFS over states (x, y) to find all reachable amounts. Run for (3, 5), (3, 6), (4, 6), (5, 7). Prove the invariant "x and y are multiples of gcd(a, b)" and conjecture and prove when every multiple of gcd up to max(a, b) is reachable. Compare BFS results with your theorem.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'algorithm-correctness-proofs',
              title: 'Invariant proofs of three algorithms',
              prompt:
                'For iterative Euclid, binary search and fast exponentiation: state the loop invariant, prove initialisation, preservation and that invariant + exit implies correctness, and give a decreasing termination measure. Then add assert statements for the invariants to your Python implementations and run them on 10^4 random inputs.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fifteen-puzzle-parity',
              title: 'Unreachable states of the 15-puzzle',
              prompt:
                'Implement the 15-puzzle (or the 8-puzzle for tractability) and compute by BFS the number of reachable configurations from the solved state (8-puzzle: 181440 of 362880). Prove the parity invariant that explains why exactly half are reachable.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When do you need strong induction rather than ordinary induction?',
              answerOutline: 'When P(n) depends on P(k) for k other than n-1, e.g. factorisation (n = ab) or recurrences using several earlier terms.',
            },
            {
              question: 'What makes a predicate an invariant of a state machine, and what does it buy you?',
              answerOutline: 'True at the start and preserved by every transition; then by induction it holds in all reachable states, so states violating it are unreachable.',
            },
            {
              question: 'What are the two parts of an algorithm correctness proof?',
              answerOutline: 'Partial correctness via a loop invariant, and termination via a strictly decreasing well-founded measure.',
            },
            {
              question: 'Why can you not measure 4 gallons with 3- and 6-gallon jugs?',
              answerOutline: 'The invariant "both amounts are multiples of 3" holds initially and under every pour, and 4 is not a multiple of 3.',
            },
          ],
        },
        {
          slug: 'recursive-definitions-and-structural-induction',
          title: 'Recursive definitions and structural induction',
          summary:
            'Defining sets, sequences and data types recursively, and proving properties of them by structural induction: strings, trees, expressions.',
          estimatedMinutes: 90,
          objectives: [
            'Give recursive definitions of sequences, sets of strings, trees and arithmetic expressions',
            'Prove properties of recursively defined objects by structural induction',
            'Relate structural induction to recursive functions over the same data type',
            'Define well-formed expressions or matched parentheses recursively and prove a closure property',
          ],
          concepts: [
            'Recursive definition: base elements and constructor rules',
            'Structural induction: one case per constructor',
            'Strings over an alphabet; recursive definition of length and reversal',
            'Matched parentheses and the balance invariant',
            'Binary trees and expression trees as recursive data',
            'Recursive functions mirror the definition; proofs mirror the function',
            'Ambiguity and unique readability',
            'Induction on derivations (preview of grammars)',
          ],
          explanation: `Many objects in computer science are defined **recursively**: give the base elements and the rules that build bigger objects from smaller ones, and declare that nothing else is in the set. The natural numbers: $0$ is in, and if $n$ is in so is $n + 1$. Strings over an alphabet $\\Sigma$: the empty string $\\lambda$ is a string, and if $s$ is a string and $a \\in \\Sigma$ then $as$ is a string. Matched parentheses: $\\lambda$ is matched; if $s$ is matched so is $(s)$; if $s$ and $t$ are matched so is $st$. Binary trees: the empty tree, or a root with two binary subtrees. Arithmetic expressions: a number, or $(e_1 + e_2)$, or $(e_1 \\times e_2)$.

A recursive definition comes with its own proof principle, **structural induction**: to show every object has property $P$, show the base elements have it and each constructor preserves it. There is one case per rule, and in each case you may assume $P$ of the components. For matched parentheses: "every matched string has equal numbers of ( and )" is three one-line cases. The stronger claim "every prefix has at least as many ( as )" is what you need to show that the obvious counter-based checker is correct, and strengthening is as common here as in ordinary induction.

Structural induction and **recursive functions** are mirror images. \`length(as) = 1 + length(s)\`, \`reverse(as) = reverse(s) + a\`, \`eval\` on expression trees: each follows the definition case by case, and a proof of a property of the function (\`reverse(reverse(s)) = s\`; \`length(s + t) = length(s) + length(t)\`) follows the same cases. Once you see this, writing the function and writing the proof become the same activity; this is also the reason functional languages and proof assistants look alike.

A subtlety: for the proof principle to be sound the definition must have **unique readability**: each object is built in exactly one way. Ambiguous expression grammars without parentheses violate it, which is why compilers care about ambiguity. Read MCS chapter 7 (recursive data types) and Levin 2.1-2.2 (sequences). The exercises define a tiny expression language, write its evaluator, and prove properties of it.`,
          resources: [
            {
              title: 'MCS — Chapter 7: Recursive Data Types (7.1-7.4)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — 2.1 Describing Sequences, 2.2 Arithmetic and Geometric Sequences',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
            {
              title: 'Composing Programs — 2.3 Sequences and 2.9 Recursive Objects (recursion over data in Python)',
              url: 'https://www.composingprograms.com/pages/23-sequences.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
            },
          ],
          exercises: [
            {
              slug: 'matched-parentheses',
              title: 'Matched parentheses: definition, checker, proof',
              prompt:
                'Write is_matched(s) by the recursive definition (try all splits; exponential) and by a counter (linear). Prove by structural induction that every matched string has equal counts and every prefix has count ( >= count ). Prove the converse (a string with those two properties is matched) by strong induction on length. Verify both implementations agree on all strings of length <= 12.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'expression-language',
              title: 'A tiny expression language',
              prompt:
                'Define expressions as nested tuples (number, ("+", e1, e2), ("*", e1, e2)). Write eval(e), size(e) (number of nodes), depth(e), and simplify(e) that folds constant sub-expressions. Prove by structural induction that eval(simplify(e)) == eval(e) and that size(e) <= 2^(depth(e)+1) - 1. Check both on 10^4 random expressions.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'string-function-proofs',
              title: 'Proofs about recursive string functions',
              prompt:
                'With strings defined recursively and length, concat and reverse defined by recursion on the first argument, prove: length(concat(s, t)) = length(s) + length(t); reverse(concat(s, t)) = concat(reverse(t), reverse(s)); reverse(reverse(s)) = s. Each by structural induction on s, using earlier results.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the parts of a recursive definition of a set?',
              answerOutline: 'Base elements, constructor rules building new elements from existing ones, and the closure clause that nothing else is included.',
            },
            {
              question: 'How does structural induction work?',
              answerOutline: 'Prove the property for base elements and show each constructor preserves it, assuming it for the components.',
            },
            {
              question: 'Why is unique readability important?',
              answerOutline: 'If an object could be built two ways, a function defined by cases might be ill-defined and the induction cases might conflict.',
            },
          ],
        },
        {
          slug: 'solving-recurrences',
          title: 'Solving recurrences',
          summary:
            'From recursive algorithms to recurrences, and from recurrences to closed forms: unrolling, guess-and-verify, linear recurrences with characteristic equations, and divide-and-conquer with the master method.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the recurrence for the running time of a recursive algorithm (merge sort, binary search, Hanoi)',
            'Solve recurrences by unrolling and by guess-and-check with induction',
            'Solve linear homogeneous recurrences with the characteristic equation, including repeated roots',
            'Apply the master method to divide-and-conquer recurrences and justify it with a recursion tree',
          ],
          concepts: [
            'From algorithm to recurrence: T(n) = a T(n/b) + f(n)',
            'Unrolling / iteration and telescoping',
            'Guess and verify by induction (substitution method)',
            'Linear homogeneous recurrences; characteristic polynomial; repeated roots',
            'Particular solutions for simple inhomogeneous terms',
            'Recursion trees',
            'Master theorem (three cases)',
            'Towers of Hanoi, merge sort, binary search, Karatsuba as examples',
          ],
          explanation: `A recursive algorithm's running time satisfies a **recurrence**: binary search does constant work and recurses on half, $T(n) = T(n/2) + 1$; merge sort does linear work and recurses on two halves, $T(n) = 2T(n/2) + n$; the Towers of Hanoi needs $H(n) = 2H(n-1) + 1$ moves. Writing the recurrence is mechanical once you can read the algorithm; solving it tells you the growth rate.

**Unrolling** substitutes the recurrence into itself until a pattern appears: $H(n) = 2H(n-1) + 1 = 4H(n-2) + 2 + 1 = \\cdots = 2^n H(0) + 2^n - 1 = 2^n - 1$. Always *verify* the pattern by induction, because unrolling is guessing. The **substitution method** goes straight to the guess: claim $T(n) \\le c\\, n \\log n$, substitute into the recurrence, and check that the inequality survives for a suitable $c$; a failed check tells you which way to adjust the guess.

**Linear homogeneous recurrences** $a_n = c_1 a_{n-1} + \\cdots + c_k a_{n-k}$ have solutions that are sums of exponentials $r^n$ where $r$ is a root of the **characteristic polynomial** $r^k = c_1 r^{k-1} + \\cdots + c_k$. For Fibonacci, $r^2 = r + 1$, giving Binet again; a repeated root $r$ contributes $r^n$ and $n r^n$. Initial conditions fix the coefficients. An inhomogeneous term (a constant, $n$, $2^n$) is handled by adding a particular solution of the same shape, exactly as for linear ODEs; generating functions (module 4) are the systematic version.

**Divide-and-conquer** recurrences $T(n) = a T(n/b) + f(n)$ are best understood by the **recursion tree**: level $i$ has $a^i$ subproblems of size $n/b^i$, so the work at level $i$ is $a^i f(n/b^i)$ and there are $\\log_b n$ levels. Comparing the per-level work with $n^{\\log_b a}$ (the number of leaves) gives the **master theorem**'s three cases: leaves dominate ($T = \\Theta(n^{\\log_b a})$), all levels equal ($T = \\Theta(n^{\\log_b a} \\log n)$, merge sort), or the root dominates ($T = \\Theta(f(n))$). Karatsuba's $T(n) = 3T(n/2) + n$ gives $n^{\\log_2 3} \\approx n^{1.585}$, a real speed-up over schoolbook multiplication that you can measure. Read MCS chapter 22 and Levin 2.4; the canonical algorithmic treatment lives in Data Structures and Algorithms.`,
          resources: [
            {
              title: 'MCS — Chapter 22: Recurrences',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Discrete Mathematics: An Open Introduction — 2.4 Solving Recurrence Relations',
              url: 'https://discrete.openmathbooks.org/dmoi3.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Oscar Levin',
            },
            {
              title: 'MIT 6.006 Introduction to Algorithms (Spring 2020) — recurrences and the master method',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The early lectures and recitations on asymptotics and recurrences.',
            },
            {
              title: 'SymPy — rsolve for recurrence relations',
              url: 'https://docs.sympy.org/latest/index.html',
              type: 'tool',
              cost: 'free',
              provider: 'SymPy',
              note: 'sympy.rsolve checks closed forms of linear recurrences.',
            },
          ],
          exercises: [
            {
              slug: 'recurrence-zoo',
              title: 'Solve a recurrence zoo',
              prompt:
                'Solve with the method named and verify the first 20 terms by iteration in Python: H(n) = 2H(n-1) + 1 (unroll); a_n = 5a_{n-1} - 6a_{n-2}, a_0 = 1, a_1 = 2 (characteristic); a_n = 4a_{n-1} - 4a_{n-2}, a_0 = 1, a_1 = 4 (repeated root); a_n = 2a_{n-1} + n (particular solution); T(n) = 3T(n/2) + n (master); T(n) = T(n/2) + 1 (master); T(n) = 2T(n/2) + n log n (not master: recursion tree).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'measure-karatsuba',
              title: 'Measure merge sort and Karatsuba',
              prompt:
                'Implement merge sort with a comparison counter and Karatsuba multiplication with a single-digit-multiplication counter. For n = 2^8 .. 2^16 tabulate the counts, divide by the predicted n log2 n and n^(log2 3), and confirm the ratios stabilise. Then time Karatsuba against schoolbook multiplication on 4096-digit numbers.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'substitution-method',
              title: 'Guess and verify',
              prompt:
                'For T(n) = 2T(n/2) + n with T(1) = 1, attempt to prove T(n) <= c n by substitution and show exactly where it fails; then prove T(n) <= c n log2 n and determine the smallest c that works for n a power of 2 (compute exact T(n) and compare). Then prove the lower bound T(n) >= c\' n log n.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'recursion-tree-pictures',
              title: 'Draw recursion trees',
              prompt:
                'For T(n) = 2T(n/2) + n, T(n) = 4T(n/2) + n, T(n) = T(n/2) + n: draw the recursion tree, write the work per level, sum the levels, and identify the master-theorem case. Write a function that computes T(n) exactly for powers of 2 and plot T(n)/prediction for each.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you solve a linear homogeneous recurrence with constant coefficients?',
              answerOutline: 'Find roots of the characteristic polynomial; the general solution is a combination of r^n (and n r^n for repeated roots); fit initial conditions.',
            },
            {
              question: 'State the three cases of the master theorem intuitively.',
              answerOutline: 'Compare f(n) with n^(log_b a): leaves dominate, every level equal (extra log factor), or root dominates.',
            },
            {
              question: 'Why must an unrolled pattern be verified by induction?',
              answerOutline: 'Unrolling a few steps only suggests a pattern; induction proves it holds for all n.',
            },
            {
              question: 'What is the recurrence for merge sort and its solution?',
              answerOutline: 'T(n) = 2T(n/2) + n, so T(n) = Theta(n log n).',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/recurrences-and-divide-and-conquer'],
        },
        {
          slug: 'asymptotic-growth',
          title: 'Asymptotic growth: comparing functions',
          summary:
            'Big-O, big-Omega, big-Theta and little-o as precise statements about eventual growth, the hierarchy of common functions, and sums and products via Stirling and integration bounds.',
          estimatedMinutes: 90,
          objectives: [
            'State the definitions of O, Omega, Theta, o and prove relationships from the definitions',
            'Order the standard functions (log, polynomial, n log n, exponential, factorial) and justify with limits',
            'Estimate sums by integral bounds and n! by Stirling\'s approximation',
            'Avoid the common abuses of big-O (one-sided equality, dropping the quantifiers, confusing best and worst case)',
          ],
          concepts: [
            'f = O(g): exists c, n0 with f(n) <= c g(n) for n >= n0',
            'Omega, Theta, little-o, little-omega',
            'Limit test f/g -> 0, constant, infinity',
            'Growth hierarchy: 1, log n, sqrt n, n, n log n, n^2, 2^n, n!',
            'Logarithm base does not matter; exponential base does',
            'Harmonic sum ~ ln n; integral bounds for sums',
            'Stirling: n! ~ sqrt(2 pi n) (n/e)^n; log n! = Theta(n log n)',
            'Abuses: O as equality, O for lower bounds',
          ],
          explanation: `**Asymptotic notation** compares functions by eventual growth, ignoring constants and small inputs. $f(n) = O(g(n))$ means there are constants $c, n_0$ such that $f(n) \\le c\\, g(n)$ for all $n \\ge n_0$: $g$ is an eventual upper bound up to a constant. $\\Omega$ is the lower-bound version, $\\Theta$ both at once, and little-$o$ means $f/g \\to 0$ (strictly smaller growth). To *prove* $f = O(g)$ you exhibit $c$ and $n_0$; to *disprove* it you show that for every $c$, $f(n) > c\\,g(n)$ for infinitely many $n$. The **limit test** is faster when it applies: if $f/g \\to L$ with $0 < L < \\infty$ then $f = \\Theta(g)$; $L = 0$ gives $o$; $L = \\infty$ gives $\\omega$.

The **hierarchy** you must know: $1 \\ll \\log n \\ll \\sqrt{n} \\ll n \\ll n \\log n \\ll n^2 \\ll n^3 \\ll 2^n \\ll n! \\ll n^n$, where $\\ll$ is little-$o$. Every polynomial beats every power of a log; every exponential beats every polynomial (use l'Hôpital or compare $\\log$s). The **base of a logarithm** does not matter ($\\log_a n = \\log_b n / \\log_b a$, a constant), but the base of an exponential does: $3^n$ is not $O(2^n)$.

Two tools estimate the sums and products that appear in analyses. For a monotone $f$, the sum $\\sum_{k=1}^{n} f(k)$ is sandwiched between $\\int_0^n f$ and $\\int_1^{n+1} f$ (or the reverse), which gives the **harmonic sum** $H_n = \\ln n + O(1)$ and $\\sum k^2 = \\Theta(n^3)$. **Stirling's approximation** $n! \\sim \\sqrt{2\\pi n}\\,(n/e)^n$ gives $\\log_2 n! = \\Theta(n \\log n)$, which is the lower bound for comparison sorting, and $\\binom{2n}{n} \\sim 4^n / \\sqrt{\\pi n}$.

Abuses to avoid: "$=$" in $f = O(g)$ is one-directional (never write $O(g) = f$); $O$ is an upper bound, so "the algorithm is $O(n^2)$" says nothing about it being slow, and "at least $O(n^2)$" is meaningless (you mean $\\Omega$); and the notation describes a *function*, so you must say which one (worst-case time, average-case, space). Read MCS chapter 14 (sums and asymptotics) and the first section of Levin on sequences; Data Structures and Algorithms is the canonical home for applying this to algorithms.`,
          resources: [
            {
              title: 'MCS — Chapter 14: Sums and Asymptotics (14.1-14.7)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'MIT 6.006 Introduction to Algorithms (Spring 2020) — Lecture 1-2 on asymptotics',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Jeff Erickson, Algorithms — Appendix on growth rates and recurrences',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson',
            },
          ],
          exercises: [
            {
              slug: 'prove-from-definitions',
              title: 'Prove from the definitions',
              prompt:
                'Prove with explicit constants: 3n^2 + 10n + 5 = O(n^2); n log n = O(n^2) but n^2 != O(n log n); 2^(n+1) = O(2^n) but 2^(2n) != O(2^n); log(n!) = Theta(n log n) without Stirling (bound n! between (n/2)^(n/2) and n^n). Then order 15 given functions (include log^2 n, n^(1/log n), 2^(log n), n^log n, (3/2)^n) and justify each adjacent pair.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'integral-bounds-and-harmonic',
              title: 'Integral bounds and the harmonic sum',
              prompt:
                'Derive ln(n+1) <= H_n <= 1 + ln n from integral bounds. Compute H_n for n = 10^k and tabulate H_n - ln n to watch it converge to the Euler-Mascheroni constant 0.5772. Then bound sum_{k<=n} sqrt(k) and sum_{k<=n} 1/sqrt(k) and verify numerically.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stirling-numerics',
              title: 'Stirling in practice',
              prompt:
                'Compute the ratio n! / (sqrt(2 pi n) (n/e)^n) for n = 1, 10, 100, 1000 using log-space arithmetic (math.lgamma) and show it approaches 1. Use Stirling to estimate C(2n, n) and the number of bits needed to write 1000! Compare with exact values.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'spot-the-abuse',
              title: 'Spot the abuse',
              prompt:
                'Each statement misuses asymptotic notation; explain why and rewrite correctly: "the running time is at least O(n log n)"; "O(n) = O(n^2), so O(n^2) = O(n)"; "since f = O(n^2) the algorithm takes quadratic time"; "sum_{i=1}^{n} O(i) = O(n)"; "2^n = O(2^n) hence 4^n = O(2^n)"; "binary search is O(log n) on an unsorted list".',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define f = O(g) precisely.',
              answerOutline: 'There exist constants c > 0 and n0 such that f(n) <= c g(n) for all n >= n0.',
            },
            {
              question: 'Is 3^n = O(2^n)? Is log_3 n = O(log_2 n)?',
              answerOutline: 'No: (3/2)^n is unbounded. Yes: logs differ by a constant factor.',
            },
            {
              question: 'What is Stirling\'s approximation used for in CS?',
              answerOutline: 'log n! = Theta(n log n): the comparison-sort lower bound and estimates of binomial coefficients.',
            },
            {
              question: 'Why is "at least O(n^2)" meaningless?',
              answerOutline: 'O gives an upper bound; a lower bound requires Omega.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/asymptotic-notation'],
        },
      ],
      project: {
        slug: 'verified-algorithms',
        title: 'Module project: verified algorithms',
        description:
          'Implement five classic algorithms (Euclid, binary search, fast exponentiation, merge sort, Karatsuba) each with: a stated loop or structural invariant enforced by assertions, a termination measure printed per iteration, a written correctness proof, a derived recurrence with its solution, and measurements of operation counts that are compared against the predicted growth with a ratio table.',
        deliverables: [
          'A package with the five algorithms, invariant assertions, and property-based tests',
          'A document with the five correctness proofs and five recurrence solutions',
          'A measurement notebook or script producing ratio tables (observed / predicted) for each algorithm',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'discrete-probability-intro',
      title: 'Discrete Probability',
      description:
        'Probability on finite and countable sample spaces: counting-based probability, conditional probability and independence, random variables and expectation, and the tail bounds that make randomised algorithms analysable. Probability and Statistics is the canonical home; this module gives the discrete core that computer science needs.',
      lessons: [
        {
          slug: 'sample-spaces-and-counting-probability',
          title: 'Sample spaces, events and probability by counting',
          summary:
            'The four-step method: sample space, events, outcome probabilities, event probability, with counting as the engine and simulation as the check.',
          estimatedMinutes: 90,
          objectives: [
            'Model an experiment with a sample space and assign probabilities, using tree diagrams for sequential experiments',
            'Compute probabilities of events in uniform spaces by counting (cards, dice, birthdays)',
            'Apply the axioms and their consequences (complement, union bound, inclusion-exclusion)',
            'Write a Monte Carlo simulation to check a computed probability and judge its accuracy',
          ],
          concepts: [
            'Sample space, outcome, event',
            'Probability axioms; probability function on a countable space',
            'Uniform spaces: P(E) = |E| / |S|',
            'Tree diagrams and the four-step method',
            'Complement rule, union bound, inclusion-exclusion for probabilities',
            'Monty Hall as a modelling exercise',
            'Monte Carlo simulation and its 1/sqrt(N) error',
            'Birthday problem revisited',
          ],
          explanation: `A **probability space** is a **sample space** $S$ of outcomes with a function $\\Pr$ assigning each outcome a non-negative weight, summing to 1. An **event** is a subset of $S$ and its probability is the sum of its outcomes' weights. That is the whole theory for discrete spaces; everything else is bookkeeping and counting. In a **uniform** space, $\\Pr[E] = |E| / |S|$, so module 4 did most of the work already: the probability of a full house is (number of full houses)/$\\binom{52}{5}$.

MCS's **four-step method** keeps you honest on sequential experiments: (1) find the sample space, usually by a **tree diagram** with one level per stage; (2) define the event of interest as a set of leaves; (3) assign probabilities to outcomes by multiplying along the branches; (4) add up. **Monty Hall** is the canonical example: the tree makes it obvious that switching wins with probability $2/3$, while intuition fails. Modelling is where real mistakes happen; "equally likely" is an assumption, not a law, and two dice summing to 7 is not one of eleven equally likely sums.

The axioms give the rules you use constantly: $\\Pr[\\overline{E}] = 1 - \\Pr[E]$ (compute "at least one" via "none"); the **union bound** $\\Pr[A \\cup B] \\le \\Pr[A] + \\Pr[B]$ (crude but always valid, and the workhorse of randomised-algorithm analysis); and **inclusion-exclusion** when you need exactness. The **birthday problem** uses the complement: $\\Pr[\\text{all distinct}] = \\prod_{i<n} (1 - i/365)$, below $1/2$ at $n = 23$.

A **simulation** is a sanity check, not a proof: run the experiment $N$ times and count. The estimate's error shrinks like $1/\\sqrt{N}$, so $10^4$ trials give about two digits; if your formula and your simulation disagree beyond that, one of them is wrong, and it is usually the model. Read MCS chapter 17 and Grinstead and Snell chapter 1; every exercise pairs an exact calculation with a simulation.`,
          resources: [
            {
              title: 'MCS — Chapter 17: Events and Probability Spaces',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 1 and 3',
              url: 'https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/book.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS (GNU FDL)',
              note: 'Free PDF; chapter 1 (discrete probability) and chapter 3 (combinatorics) with many simulation exercises.',
            },
            {
              title: 'Berkeley CS70 — Probability notes (Note 13 onwards)',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
            {
              title: 'Python random module',
              url: 'https://docs.python.org/3/library/random.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Seed your simulations so they are reproducible.',
            },
          ],
          exercises: [
            {
              slug: 'poker-hands',
              title: 'Poker hand probabilities',
              prompt:
                'Compute exactly, by counting, the probability of a 5-card hand being: one pair, two pair, three of a kind, straight, flush, full house, four of a kind, straight flush. Check that the counts sum with "high card" to C(52, 5). Simulate 10^6 hands and compare each frequency with the exact value; report the maximum absolute error and compare with 1/sqrt(10^6).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'monty-hall-tree',
              title: 'Monty Hall by tree and by simulation',
              prompt:
                'Draw the tree diagram for Monty Hall (prize location, initial pick, host door) and compute the win probability for stay and switch. Simulate 10^5 games for both strategies. Then analyse the variant where the host opens a random non-chosen door (which may reveal the prize): what is the switch probability conditional on the prize not being revealed?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'union-bound-practice',
              title: 'Complement and union bound',
              prompt:
                'Compute exactly the probability that in 10 rolls of a fair die every face appears at least once (inclusion-exclusion over missing faces; expected ~0.272). Then compute the union-bound estimate of the probability some face is missing and compare with the exact value. Simulate to confirm the exact answer.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'modelling-mistakes',
              title: 'Modelling mistakes',
              prompt:
                'Three wrong arguments: "two dice sum to 7 with probability 1/11"; "a family with two children, at least one a boy, has two boys with probability 1/2"; "if I flip until heads the expected number of flips is infinite because it could go on forever". For each, build the correct sample space, compute the right answer, and simulate.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the four steps of the four-step method?',
              answerOutline: 'Find the sample space (tree), define the event as outcomes, assign outcome probabilities (multiply along branches), sum over the event.',
            },
            {
              question: 'State the union bound and when it is useful.',
              answerOutline: 'P(A1 u ... u An) <= sum P(Ai); always valid, useful to show a bad event is unlikely when the Ai are hard to analyse jointly.',
            },
            {
              question: 'Why does switching win in Monty Hall?',
              answerOutline: 'Switching wins exactly when the initial pick was wrong, probability 2/3; the host\'s reveal carries information.',
            },
            {
              question: 'How accurate is a Monte Carlo estimate with N trials?',
              answerOutline: 'Error of order 1/sqrt(N): 10^4 trials give roughly 2 significant digits.',
            },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/sample-spaces-and-axioms'],
        },
        {
          slug: 'conditional-probability-and-independence',
          title: 'Conditional probability, Bayes and independence',
          summary:
            'Updating probabilities on evidence, the law of total probability, Bayes\' rule and the base-rate fallacy, and what independence really means.',
          estimatedMinutes: 100,
          objectives: [
            'Compute conditional probabilities from the definition and from tree diagrams',
            'Apply the law of total probability and Bayes\' rule to diagnostic-test and spam-filter problems',
            'Define independence and mutual independence and test them from a joint distribution',
            'Explain the base-rate fallacy and Simpson\'s paradox with worked numbers',
          ],
          concepts: [
            'Conditional probability P(A|B) = P(A and B) / P(B)',
            'Product rule / chain rule',
            'Law of total probability',
            'Bayes\' rule; prior, likelihood, posterior',
            'Base-rate fallacy; medical test example',
            'Independence: P(A and B) = P(A) P(B); pairwise vs mutual',
            'Conditional independence',
            'Simpson\'s paradox',
          ],
          explanation: `**Conditional probability** $\\Pr[A \\mid B] = \\Pr[A \\cap B] / \\Pr[B]$ is the probability of $A$ in the world where $B$ is known to have happened: restrict the sample space to $B$ and renormalise. In a tree diagram, the branch probabilities *are* conditional probabilities, and the **product rule** $\\Pr[A \\cap B] = \\Pr[B] \\Pr[A \\mid B]$ is multiplying along a path. Chained, it lets you compute the probability of any sequence of dependent events.

The **law of total probability** splits on a partition: $\\Pr[A] = \\sum_i \\Pr[A \\mid B_i] \\Pr[B_i]$, and **Bayes' rule** reverses a conditional: $\\Pr[B \\mid A] = \\Pr[A \\mid B] \\Pr[B] / \\Pr[A]$. The classic application exposes the **base-rate fallacy**: a test with 99% sensitivity and 99% specificity for a disease with prevalence 1 in 10,000 gives a positive result that is still less than 1% likely to be a true case, because false positives among the healthy majority swamp the true positives. Work it with a population of a million people in a table rather than with formulas, and it becomes obvious. The same arithmetic runs spam filters: prior (spam rate) times likelihood (word frequencies given spam) gives a posterior.

**Independence** means conditioning changes nothing: $\\Pr[A \\mid B] = \\Pr[A]$, equivalently $\\Pr[A \\cap B] = \\Pr[A]\\Pr[B]$. It is a *property of the probability model*, not of causation, and it must be checked, not assumed: two events can be pairwise independent without the whole collection being **mutually independent** (the parity example with three coin flips). Mutual independence is what you need to multiply probabilities of many events, and it is exactly the assumption behind "the probability of $n$ heads is $2^{-n}$".

**Simpson's paradox** finishes the lesson with a warning: a treatment can be better in every subgroup and worse overall when the subgroups are unequally mixed. Conditional probabilities do not aggregate naively. Read MCS chapter 18 and Grinstead and Snell chapter 4; the exercises compute every example exactly and by simulation.`,
          resources: [
            {
              title: 'MCS — Chapter 18: Conditional Probability',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 4: Conditional Probability',
              url: 'https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/book.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS (GNU FDL)',
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Probability Theory 101',
              url: 'https://introtcs.org/public/lec_15_probability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              note: 'A compact CS-oriented recap of exactly the probability used in this module.',
            },
          ],
          exercises: [
            {
              slug: 'diagnostic-test',
              title: 'The diagnostic test, three ways',
              prompt:
                'A disease has prevalence 1/10000; a test has sensitivity 0.99 and specificity 0.99. Compute P(disease | positive) by Bayes, by a natural-frequency table for 1,000,000 people, and by simulating 10^7 people. Then plot the posterior as a function of prevalence from 10^-5 to 0.5 and find the prevalence at which a positive test is 50% reliable.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'naive-bayes-spam',
              title: 'A naive Bayes spam filter',
              prompt:
                'Build a tiny spam filter: from 40 labelled sentences you write, estimate P(word | spam) and P(word | ham) with add-one smoothing, and classify 10 new sentences using the product rule under a conditional-independence assumption. Report the log-posterior for each and discuss where the independence assumption is clearly false.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'independence-tests',
              title: 'Pairwise vs mutual independence',
              prompt:
                'For three fair coin flips let A = flip1 heads, B = flip2 heads, C = flips 1 and 2 agree. Show by enumeration that A, B, C are pairwise independent but not mutually independent. Then write is_independent(events, space) that tests every subset of a collection and run it on this and on 10 random joint distributions.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'simpsons-paradox',
              title: 'Construct Simpson\'s paradox',
              prompt:
                'Construct a 2-treatment, 2-subgroup data set in which treatment X has the higher success rate in both subgroups but the lower rate overall. Explain with conditional probabilities and the law of total probability why this happens, and state what question each number actually answers.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State Bayes\' rule and name its parts.',
              answerOutline: 'P(B|A) = P(A|B) P(B) / P(A): posterior = likelihood x prior / evidence.',
            },
            {
              question: 'Why is a positive result from a 99%-accurate test for a rare disease usually a false positive?',
              answerOutline: 'False positives among the large healthy population outnumber true positives among the tiny sick population; the base rate dominates.',
            },
            {
              question: 'What is the difference between pairwise and mutual independence?',
              answerOutline: 'Pairwise: every pair multiplies; mutual: every subset multiplies. Pairwise does not imply mutual.',
            },
            {
              question: 'What is the law of total probability?',
              answerOutline: 'P(A) = sum over a partition B_i of P(A|B_i) P(B_i).',
            },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/bayes-theorem'],
        },
        {
          slug: 'random-variables-and-expectation',
          title: 'Random variables, expectation and linearity',
          summary:
            'Random variables as functions on the sample space, the distributions that recur (Bernoulli, binomial, geometric, uniform), expectation, and linearity of expectation as the most useful trick in the subject.',
          estimatedMinutes: 110,
          objectives: [
            'Define random variables and their distributions and compute PMFs for binomial and geometric variables',
            'Compute expectations from the definition and via linearity, including with indicator variables',
            'Solve classic problems (expected fixed points, coupon collector, hat check, expected comparisons) with indicators',
            'Compute variance and explain what it measures; apply it to sums of independent variables',
          ],
          concepts: [
            'Random variable as a function S -> R; PMF',
            'Bernoulli, binomial, geometric, uniform distributions',
            'Expectation E[X] = sum x P(X = x)',
            'Linearity of expectation (no independence needed)',
            'Indicator random variables',
            'Coupon collector and the harmonic number',
            'Variance, standard deviation; variance of a sum of independent variables',
            'Expected running time of a randomised algorithm',
          ],
          explanation: `A **random variable** is a function from the sample space to numbers: the number of heads in 10 flips, the position of the first ace, the running time of quicksort on a random input. Its **distribution** (PMF) is $\\Pr[X = x]$ for each value. Four distributions recur: **Bernoulli** (one success/failure trial), **binomial** $\\binom{n}{k} p^k (1-p)^{n-k}$ (successes in $n$ independent trials), **geometric** $(1-p)^{k-1} p$ (trials until the first success), and **uniform** on a finite set.

The **expectation** $\\mathbb{E}[X] = \\sum_x x \\Pr[X = x]$ is the probability-weighted average, the long-run mean of repeated trials. Computing it from the definition is often painful; **linearity of expectation** makes it easy: $\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ *always*, with no independence required. Combined with **indicator variables** ($I_A = 1$ if event $A$ happens, $\\mathbb{E}[I_A] = \\Pr[A]$) it dispatches problems that look hard. Expected number of fixed points of a random permutation: $\\sum_i \\Pr[\\text{i fixed}] = n \\cdot \\frac{1}{n} = 1$, for every $n$. Expected number of people who get their own hat back: 1. Expected number of comparisons in quicksort: sum over pairs of the probability they are compared, giving $2n \\ln n$. The **coupon collector** (draws to see all $n$ coupons) is a sum of geometric variables with expectation $n H_n \\approx n \\ln n$, which is also how long random probing takes to touch every bucket.

**Variance** $\\mathrm{Var}[X] = \\mathbb{E}[(X - \\mathbb{E}X)^2] = \\mathbb{E}[X^2] - (\\mathbb{E}X)^2$ measures spread; its square root, the standard deviation, is in the units of $X$. Variance is *not* linear in general, but for **independent** variables $\\mathrm{Var}[X + Y] = \\mathrm{Var}[X] + \\mathrm{Var}[Y]$, so the sum of $n$ independent trials has standard deviation growing like $\\sqrt{n}$ while the mean grows like $n$: the reason averages of many samples are reliable and the quantitative content of the next lesson. Read MCS chapters 19-20.1 and Grinstead and Snell chapter 6; the exercises make you compute expectations three ways (definition, indicators, simulation) until linearity is a reflex.`,
          resources: [
            {
              title: 'MCS — Chapter 19: Random Variables and Chapter 20: Deviation from the Mean (20.1-20.2)',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 6: Expected Value and Variance',
              url: 'https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/book.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS (GNU FDL)',
            },
            {
              title: 'Berkeley CS70 — Random variables and expectation notes',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
            {
              title: 'Python statistics module',
              url: 'https://docs.python.org/3/library/statistics.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'indicators-three-ways',
              title: 'Expectation three ways',
              prompt:
                'For (a) fixed points of a random permutation of 20, (b) number of pairs of people sharing a birthday among 30, (c) number of empty bins when 100 balls are thrown into 50 bins: compute E[X] by indicator variables, by the exact distribution where feasible, and by simulation (10^5 trials). Expected: 1, C(30,2)/365 ~ 1.19, 50 (49/50)^100 ~ 6.6.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coupon-collector',
              title: 'Coupon collector',
              prompt:
                'Derive E[T] = n H_n for the coupon collector by writing T as a sum of geometric variables. Simulate for n = 10, 50, 100, 500 and compare with n H_n and with n ln n. Compute the variance via the independent geometric variables and compare with the sample variance.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'quicksort-comparisons',
              title: 'Expected comparisons in quicksort',
              prompt:
                'Prove that elements of rank i and j (i < j) are compared with probability 2/(j - i + 1) in randomised quicksort, and sum to get E[comparisons] ~ 2n ln n. Instrument a quicksort with a comparison counter and average over 1000 random permutations for n = 100, 1000, 10000; tabulate the ratio to 2n ln n.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'binomial-geometric-pmfs',
              title: 'PMFs and moments',
              prompt:
                'Implement the binomial and geometric PMFs, verify they sum to 1, and compute E and Var from the PMF for Binomial(20, 0.3) and Geometric(0.2); compare with the formulas np, np(1-p), 1/p, (1-p)/p^2. Plot each PMF and overlay a histogram of 10^5 samples.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Does linearity of expectation require independence?',
              answerOutline: 'No; E[X + Y] = E[X] + E[Y] always. Independence is needed for E[XY] = E[X]E[Y] and for adding variances.',
            },
            {
              question: 'What is the expected number of fixed points of a random permutation and why?',
              answerOutline: '1: sum of n indicators each with probability 1/n.',
            },
            {
              question: 'What is the expectation of a geometric variable with success probability p?',
              answerOutline: '1/p.',
            },
            {
              question: 'How does the standard deviation of a sum of n independent identical variables scale?',
              answerOutline: 'Like sqrt(n), while the mean scales like n, so relative spread shrinks as 1/sqrt(n).',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/random-variables-and-expectation'],
        },
        {
          slug: 'tail-bounds-and-randomised-algorithms',
          title: 'Tail bounds and randomised algorithms',
          summary:
            'Markov, Chebyshev and Chernoff bounds: how to prove that a random quantity is almost surely near its mean, and how that analyses hashing, sampling and randomised algorithms.',
          estimatedMinutes: 100,
          objectives: [
            'State and prove Markov\'s and Chebyshev\'s inequalities and apply them to bound tail probabilities',
            'State the Chernoff bound for sums of independent indicators and compare its strength with Chebyshev',
            'Analyse the load of hashing n items into n buckets and the accuracy of polling by sampling',
            'Explain how randomisation gives expected-time guarantees (quicksort, Freivalds, Miller-Rabin) and what "with high probability" means',
          ],
          concepts: [
            'Markov\'s inequality for non-negative variables',
            'Chebyshev\'s inequality via variance',
            'Weak law of large numbers',
            'Chernoff bound: exponentially small tails for sums of independent indicators',
            'Sampling and polling: how many samples for a given accuracy',
            'Balls into bins; maximum load',
            'Monte Carlo vs Las Vegas algorithms',
            'With high probability; amplification by repetition',
          ],
          explanation: `Expectation tells you the average; **tail bounds** tell you how often a random variable strays far from it, which is what you need to say that a randomised algorithm is *reliably* fast or a sample is *reliably* accurate. **Markov's inequality** is the weakest and most general: for non-negative $X$, $\\Pr[X \\ge a] \\le \\mathbb{E}[X]/a$. The proof is one line (the part of the expectation above $a$ is at least $a \\Pr[X \\ge a]$). **Chebyshev's inequality** applies Markov to $(X - \\mu)^2$: $\\Pr[|X - \\mu| \\ge k\\sigma] \\le 1/k^2$. It uses the variance and already proves the **weak law of large numbers**: the average of $n$ independent samples has variance $\\sigma^2/n$, so it concentrates around the mean as $n$ grows.

For sums of **independent** indicators (a binomial, or the number of samples that satisfy a property), the **Chernoff bound** is exponentially stronger: $\\Pr[X \\ge (1 + \\delta)\\mu] \\le e^{-\\delta^2 \\mu / 3}$ for $0 < \\delta \\le 1$, and similarly below. Where Chebyshev says "within 10 standard deviations with probability 99%", Chernoff says the probability of a constant-factor deviation falls off like $e^{-cn}$. This is why a poll of 1,000 people estimates a proportion to within 3% with 95% confidence regardless of the population size, and why hashing $n$ items into $n$ buckets gives a maximum load of only $O(\\log n / \\log \\log n)$ with high probability (union bound over buckets plus Chernoff per bucket).

Randomised algorithms come in two flavours. **Las Vegas** algorithms (randomised quicksort) are always correct and fast in expectation; Markov turns the expected time into a bound on the probability of a slow run, and repeating or restarting amplifies it. **Monte Carlo** algorithms (Miller-Rabin, Freivalds' matrix-product check) are always fast and correct with probability at least some $p$; independent repetition drives the error to $(1-p)^k$, exponentially small. "**With high probability**" conventionally means probability at least $1 - 1/n^c$, so that a union bound over polynomially many events still leaves high probability.

Read MCS chapter 20 and Grinstead and Snell chapter 8; Barak's chapters on probabilistic computation give the CS perspective. The exercises measure every bound against simulation so you see how loose Markov is and how tight Chernoff can be.`,
          resources: [
            {
              title: 'MCS — Chapter 20: Deviation from the Mean (20.3-20.6) and Chapter 21: Random Walks',
              url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/resources/mit6_042js15_textbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Introduction to Probability (Grinstead and Snell) — Chapter 8: Law of Large Numbers',
              url: 'https://chance.dartmouth.edu/teaching_aids/books_articles/probability_book/book.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth / AMS (GNU FDL)',
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Probabilistic computation',
              url: 'https://introtcs.org/public/lec_16_randomized_alg.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              note: 'Randomised algorithms and amplification; uses Chernoff.',
            },
            {
              title: 'Berkeley CS70 — Concentration inequalities notes',
              url: 'https://www.eecs70.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'bounds-vs-reality',
              title: 'Bounds versus reality',
              prompt:
                'For X ~ Binomial(1000, 0.5), tabulate for a = 550, 600, 650, 700: the exact P(X >= a) (sum the PMF), the Markov bound, the Chebyshev bound and the Chernoff bound. Plot all four on a log scale and comment on which bound is useful where.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'polling-sample-size',
              title: 'How many samples?',
              prompt:
                'Using Chebyshev, derive a sample size n guaranteeing that the sample proportion is within 0.03 of the true proportion with probability 0.95; then do the same with the Chernoff bound. Simulate polls of each size from a population with p = 0.52 (10^4 polls) and report the empirical failure rate for both n.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'balls-into-bins',
              title: 'Maximum load of hashing',
              prompt:
                'Throw n balls into n bins uniformly for n = 10^2, 10^3, 10^4, 10^5, 10^6 and record the maximum load over 100 trials each. Compare with ln n / ln ln n and with 3 ln n / ln ln n. Prove with a union bound and the simple estimate P(bin has >= k balls) <= C(n, k) / n^k <= 1/k! that the maximum load is O(ln n / ln ln n) with high probability.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'freivalds',
              title: 'Freivalds\' algorithm',
              prompt:
                'Implement Freivalds\' check: to test whether AB = C for n x n matrices, pick a random 0/1 vector r and compare A(Br) with Cr. Prove the error probability is at most 1/2 when AB != C. Measure the false-accept rate over 10^4 trials on a C that differs from AB in one entry, then show k = 20 repetitions make it negligible, and compare the running time with computing AB for n = 500.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State Markov\'s inequality and its one-line proof.',
              answerOutline: 'For X >= 0, P(X >= a) <= E[X]/a; since E[X] >= a P(X >= a) by dropping the part of the expectation below a.',
            },
            {
              question: 'Why is the Chernoff bound so much stronger than Chebyshev for sums of independent indicators?',
              answerOutline: 'It uses all moments (via the moment generating function) and independence, giving exponentially small tails instead of polynomial.',
            },
            {
              question: 'What is the difference between Las Vegas and Monte Carlo algorithms?',
              answerOutline: 'Las Vegas: always correct, random running time. Monte Carlo: bounded running time, may be wrong with small probability (reducible by repetition).',
            },
            {
              question: 'What does "with high probability" mean?',
              answerOutline: 'Probability at least 1 - 1/n^c for some constant c, so it survives union bounds over polynomially many events.',
            },
          ],
        },
      ],
      project: {
        slug: 'probability-lab',
        title: 'Module project: a discrete probability laboratory',
        description:
          'Build a small simulation framework (seeded, reproducible, with confidence intervals from repeated runs) and use it to study five problems exactly and empirically: the birthday problem, Monty Hall and its variants, the coupon collector, balls-into-bins maximum load, and randomised quicksort comparisons. For each, present the exact derivation, the simulation, the agreement within error bars, and the applicable tail bound.',
        deliverables: [
          'A simulation module with a results dataclass (mean, standard error, trials) and tests',
          'A report with derivations, plots of simulation versus exact or asymptotic formulas, and tail-bound comparisons',
          'One additional problem of your choice studied the same way',
        ],
        estimatedHours: 8,
      },
    },
  ],
  capstone: {
    slug: 'proof-portfolio-and-explorer',
    title: 'Capstone: a proof portfolio and a combinatorial explorer',
    description: `Part one is a written portfolio of twelve proofs, typeset (LaTeX or Markdown with maths), that demonstrates every technique in the subject: at least one direct proof, contrapositive, contradiction, cases, induction, strong induction, a loop or state-machine invariant, a combinatorial double-counting proof, a pigeonhole argument, a proof about relations or functions (equivalence classes, bijection), a number-theory proof (something using Bezout or Fermat), and a graph-theory proof (a tree or Euler property). Each proof is preceded by a statement of the claim and the technique, and followed by a short "what could go wrong" note identifying the step a careless reader would skip. At least four of the claims must be ones you discovered computationally first (a pattern noticed in the output of a program) and then proved.

Part two is a program that explores or verifies a combinatorial result of your choice: for example, verifying a Ramsey number bound by exhaustive search, computing Catalan numbers five ways and proving the bijections, enumerating spanning trees of small graphs to confirm Cayley's formula, searching for counterexamples to a conjecture about graphs or sequences, or simulating random structures (graphs, permutations) to estimate a probability you then compute exactly. The program must be tested, must state its hypothesis and result clearly, and must include a written discussion connecting what it found to a proof (yours or cited).`,
    deliverables: [
      'A typeset portfolio of twelve proofs covering every technique listed, with technique labels and pitfall notes',
      'A tested Python program (repository with README) that verifies or explores a combinatorial result, with reproducible output',
      'A written report (3-5 pages) stating the result, the method, the evidence, and the connection to a proof',
      'A one-page reflection on which proof technique you found hardest and what finally made it click',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Formalise two of the portfolio proofs in Lean using the Natural Number Game or Mathlib',
      'Find and prove a bijection between two families of objects that you first matched by counting',
      'Submit a sequence your program produced to the OEIS if it is not already there (or document the match if it is)',
    ],
  },
  masteryChecklist: [
    'I can translate English claims into quantified logical statements and negate them mechanically',
    'I can write direct, contrapositive, contradiction, cases and (strong) induction proofs that a skeptical reader can check',
    'I can prove set identities, classify relations, and prove that a function is injective, surjective or bijective',
    'I can run the extended Euclidean algorithm, compute modular inverses, apply Fermat and Euler, and implement and explain RSA',
    'I can count with the sum, product, division, bijection, inclusion-exclusion and pigeonhole rules, and verify counts by enumeration',
    'I can model counting problems and linear recurrences with generating functions and extract closed forms',
    'I can prove properties of graphs and trees (handshake, Euler circuits, tree edge count) and apply them to real graphs in code',
    'I can solve recurrences arising from algorithms and compare growth rates asymptotically',
    'I can compute probabilities, conditional probabilities and expectations for discrete processes and check them by simulation',
    'I notice when a computational pattern needs a proof, and when a proof deserves a computational sanity check',
  ],
});
