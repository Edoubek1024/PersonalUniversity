import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const bookOfProof: ResourceInput = {
  title: 'Book of Proof (Hammack)',
  url: 'https://richardhammack.github.io/BookOfProof/',
  type: 'textbook',
  cost: 'free',
  provider: 'Richard Hammack',
};

const infiniteDescent: ResourceInput = {
  title: 'An Infinite Descent into Pure Mathematics (Newstead)',
  url: 'https://infinitedescent.xyz/',
  type: 'textbook',
  cost: 'free',
  provider: 'Clive Newstead',
};

const sundstrom: ResourceInput = {
  title: 'Mathematical Reasoning: Writing and Proof (Sundstrom)',
  url: 'https://scholarworks.gvsu.edu/books/24/',
  type: 'textbook',
  cost: 'free',
  provider: 'Grand Valley State University',
};

const hutchings: ResourceInput = {
  title: 'Introduction to Mathematical Arguments (Hutchings)',
  url: 'https://math.berkeley.edu/~hutching/teach/proofs.pdf',
  type: 'article',
  cost: 'free',
  provider: 'UC Berkeley',
};

const mitMathForCs: ResourceInput = {
  title: 'MIT 6.042J Mathematics for Computer Science',
  url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-fall-2010/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};

const steinNumberTheory: ResourceInput = {
  title: 'Elementary Number Theory: Primes, Congruences and Secrets (Stein)',
  url: 'https://wstein.org/ent/',
  type: 'textbook',
  cost: 'free',
  provider: 'William Stein',
};

const leblAnalysis: ResourceInput = {
  title: 'Basic Analysis: Introduction to Real Analysis (Lebl)',
  url: 'https://www.jirka.org/ra/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jiri Lebl',
};

export default defineSubject({
  id: 'higher-mathematics',
  title: 'Introduction to Higher Mathematics',
  category: 'math',
  tagline:
    'The gateway from computing answers to proving them: how to read mathematics, find a proof, write it well and see exactly why a bad one fails.',
  description: `Up to now you have mostly computed. From here on you will be asked why. This course teaches the skill every later mathematics course assumes: reading a precise statement, finding an argument for it, writing that argument so that another person can check it, and judging whether someone else's argument is valid. Finding a proof is treated as a learnable craft. You will see scratch work next to the finished proof, bad proofs next to the repairs, and feedback-style answers that name the mistakes people really make.

This course follows the public catalog description of University of Illinois MATH 314, Introduction to Higher Mathematics: the skills needed to identify and produce valid proofs, with first looks at modular arithmetic, group theory, combinatorial reasoning, solving equations, epsilon-delta arguments and limits. The sequence, explanations and exercises are original. This site is not affiliated with the University of Illinois, and nothing here is taken from that course's materials.

The route is logic, proof techniques, induction, sets and functions, number systems, cardinality and finally the real numbers and limits, where you write your first real analysis proofs. Calculus III is the stated prerequisite, mainly for maturity: the ideas are built from scratch. The free books by Hammack, Newstead and Sundstrom support every lesson, but the lessons are written so that you can learn from the page.

Write every proof out in full sentences. A proof that you only thought through is usually not a proof yet. When your attempt differs from an answer outline, the question to ask is whether your argument has a gap, not whether it matches.`,
  difficulty: 'intermediate',
  estimatedHours: 90,
  prerequisites: ['calculus-3'],
  recommendedBackground: [
    'Fluent algebra and a working knowledge of calculus',
    'Willingness to rewrite: most proofs need two or three drafts',
    'discrete-mathematics covers some of the same logic with a computing slant, and is optional here',
  ],
  tags: ['proofs', 'logic', 'induction', 'sets', 'functions', 'number theory', 'cardinality', 'limits'],
  core: false,
  modules: [
    {
      slug: 'logic-and-reading-mathematics',
      title: 'Logic and How to Read Mathematics',
      description:
        'The language of proof: statements, implication, quantifiers and negation, and a method for reading definitions and theorems actively.',
      lessons: [
        {
          slug: 'statements-and-implication',
          title: 'Statements, connectives and implication',
          summary:
            'What counts as a statement, how and, or and not behave, and why the implication is false in only one case.',
          estimatedMinutes: 120,
          objectives: [
            'Tell statements from open sentences',
            'Apply De Morgan\'s laws and verify logical equivalences with truth tables',
            'State the converse, contrapositive and negation of an implication',
            'Translate "necessary", "sufficient" and "if and only if" into symbols',
          ],
          concepts: [
            'Statement and open sentence',
            'Inclusive or',
            'De Morgan\'s laws',
            'Implication and vacuous truth',
            'Converse and contrapositive',
            'Necessary and sufficient conditions',
            'Logical equivalence',
          ],
          explanation: `Mathematics is built from **statements**: sentences that are definitely true or definitely false. "7 is prime" is a statement. "$x > 2$" is not, until you say what $x$ is; it is an **open sentence**. Statements combine with *and* ($\\wedge$), *or* ($\\vee$, always inclusive) and *not* ($\\neg$). **De Morgan's laws** say how *not* passes through: $\\neg(P\\wedge Q)\\equiv\\neg P\\vee\\neg Q$ and $\\neg(P\\vee Q)\\equiv\\neg P\\wedge\\neg Q$.

The connective that drives proof is the **implication** $P\\Rightarrow Q$. Treat it as a promise: it is broken only when $P$ is true and $Q$ is false. When $P$ is false, the promise is not broken, so the implication counts as true, which is called *vacuous* truth. This is what makes "if $n$ is a multiple of 4, then $n$ is even" true for every integer, including $n=3$.

Three relatives matter. The **contrapositive** $\\neg Q\\Rightarrow\\neg P$ is equivalent to $P\\Rightarrow Q$. The **converse** $Q\\Rightarrow P$ is a different claim. The **negation** is $P\\wedge\\neg Q$, which is not an implication at all. "$P$ if and only if $Q$" means both directions hold. In $P\\Rightarrow Q$, we call $P$ *sufficient* for $Q$ and $Q$ *necessary* for $P$.

**Worked example.** For real $x$, take $x>2\\Rightarrow x^2>4$.

- It is true: if $x>2$, then $x^2 = x\\cdot x>2x>4$, using $x>0$ in the first inequality.
- Contrapositive: $x^2\\le 4\\Rightarrow x\\le 2$. It must be true, and it is.
- Converse: $x^2>4\\Rightarrow x>2$. False: $x=-3$ gives $9>4$ but $-3\\not>2$.
- Negation: "$x>2$ and $x^2\\le 4$". This describes a counterexample, and none exists.

So one true implication gives one guaranteed companion (the contrapositive) and tells you nothing about the converse.

**A bad argument.** "If $x=1$ then $x^2=1$. Therefore $x^2=1$ tells us $x=1$." This proves the converse of what it concludes, and $x=-1$ shows the conclusion is false. Whenever you finish a proof, check that you went from the hypothesis to the conclusion, not the other way round.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on logic. Work the truth-table exercises until they are automatic.' },
            { ...sundstrom, note: 'The opening chapters on statements and logical reasoning give a second explanation with progress checks.' },
          ],
          relatedLessons: ['discrete-mathematics/logic-and-proofs/propositions-and-connectives'],
          exercises: [
            {
              slug: 'statement-or-not',
              title: 'Statement, open sentence or neither',
              prompt: `Classify each as a statement (say whether true or false), an open sentence or neither: (a) $2^{10}>1000$, (b) $x^2+1=0$, (c) Is 91 prime? (d) Every even integer greater than 2 is a sum of two primes, (e) For all real $x$, $x^2+1>0$. Item (d) needs care: decide what being a statement requires, and whether you need to know the truth value.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'A statement has a truth value whether or not anyone knows it.',
            },
            {
              slug: 'equivalences-by-table',
              title: 'Equivalences by truth table',
              prompt: `Use truth tables to prove (a) $P\\Rightarrow Q\\equiv\\neg P\\vee Q$, (b) $P\\Rightarrow Q\\equiv\\neg Q\\Rightarrow\\neg P$, (c) $P\\vee(Q\\wedge R)\\equiv(P\\vee Q)\\wedge(P\\vee R)$. Then decide whether $(P\\Rightarrow Q)\\Rightarrow R$ and $P\\Rightarrow(Q\\Rightarrow R)$ are equivalent, giving a row of the truth table that proves your answer.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'necessary-sufficient',
              title: 'Necessary, sufficient, both or neither',
              prompt: `For a real function $f$ and real numbers: (a) Is differentiability at $a$ necessary, sufficient, both or neither for continuity at $a$? (b) For integers, is "6 divides $n$" necessary, sufficient, both or neither for "3 divides $n$"? (c) For real $x$, is $x^2=x$ necessary, sufficient, both or neither for $x=1$? (d) For integers, is "$n^2$ is odd" necessary, sufficient, both or neither for "$n$ is odd"? Justify each answer, with a counterexample for every "not".`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the negation of "if it rains, the match is cancelled". Is "if it rains, the match is not cancelled" correct?',
              answerOutline: `Correct: "it rains and the match is not cancelled". If you wrote the second sentence, you kept the "if". A negated implication is one specific situation, $P\\wedge\\neg Q$. The two "if" sentences can both be true when it does not rain, so they cannot be negations of each other.`,
            },
            {
              question: 'A student says: "I proved the converse, so the theorem follows." When is this valid?',
              answerOutline: `Only if the theorem was the converse. $Q\\Rightarrow P$ never implies $P\\Rightarrow Q$ by itself. A full answer gives an example, such as $P$: $x=1$ and $Q$: $x^2=1$, where one direction holds and the other fails.`,
            },
            {
              question: 'Why is "if $n$ is an even prime greater than 2, then $n=17$" true?',
              answerOutline: `No integer satisfies the hypothesis, so no case can break the promise. This is vacuous truth. If you called it false because 17 is odd, you tested the conclusion alone. An implication is judged only on cases where the hypothesis holds.`,
            },
          ],
        },
        {
          slug: 'quantifiers',
          title: 'Quantifiers and why their order matters',
          summary:
            'For all and there exists, what each one asks you to do in a proof, and how swapping them changes the meaning.',
          estimatedMinutes: 120,
          objectives: [
            'Translate English statements into quantified form, including hidden quantifiers',
            'Explain how to prove a universal and an existential statement',
            'Decide when swapping quantifiers changes the truth value',
            'Read a nested quantifier statement as a game',
          ],
          concepts: [
            'Universal and existential quantifiers',
            'Domain of a quantifier',
            'Hidden quantifiers',
            'Order of quantifiers',
            'Arbitrary element',
            'Witness',
          ],
          explanation: `An open sentence becomes a statement once its variables are **quantified**. $\\forall x\\in S,\\ P(x)$ says $P$ holds for every element of $S$. $\\exists x\\in S,\\ P(x)$ says at least one element works. The domain matters: $\\exists x,\\ x^2=2$ is true in $\\mathbb{R}$ and false in $\\mathbb{Q}$.

Each quantifier tells you what a proof must do.

- To prove $\\forall x\\in S,\\ P(x)$: write "Let $x\\in S$ be arbitrary". Assume nothing else about $x$, and prove $P(x)$.
- To prove $\\exists x\\in S,\\ P(x)$: produce a specific **witness** and check that it works.

English often hides quantifiers. "If $n$ is even then $n^2$ is even" means *for all* integers $n$. "The square of a real number is non-negative" does too.

**Order matters.** Read a statement as a game. You choose the $\\exists$ variables and an opponent chooses the $\\forall$ variables, taking turns from left to right. A later choice may depend on earlier ones.

**Worked example.** Over the reals, compare

$$A:\\ \\forall x\\ \\exists y,\\ x+y=0\\qquad\\text{and}\\qquad B:\\ \\exists y\\ \\forall x,\\ x+y=0.$$

*$A$ is true.* Let $x$ be arbitrary. Choose $y=-x$. Then $x+y=0$. Notice that $y$ depends on $x$, which is allowed, since the opponent moved first.

*$B$ is false.* Here you must commit to one $y$ before seeing $x$. Suppose such a $y$ exists. Taking $x=0$ gives $y=0$, and taking $x=1$ gives $y=-1$. Since $y$ cannot be both, no such $y$ exists.

In general $\\exists y\\,\\forall x\\,P(x,y)$ implies $\\forall x\\,\\exists y\\,P(x,y)$, and the reverse can fail. This distinction is the whole difference between continuity and uniform continuity, which you will meet in analysis.

**A bad proof.** Claim: there is a real $M$ with $x<M$ for all real $x$. "Let $x$ be real and take $M=x+1$. Then $x<M$." The claim is $\\exists M\\,\\forall x$, but this $M$ was chosen after $x$. The writer has proved $\\forall x\\,\\exists M$, a true but different statement, while the original claim is false. A useful check: if your witness mentions a variable, that variable must be quantified earlier in the statement.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The part of the logic chapter on quantifiers and translating English into symbols.' },
            { ...hutchings, note: 'A short, careful introduction to logic and proofs. Its quantifier discussion is worth reading slowly.' },
          ],
          relatedLessons: ['discrete-mathematics/logic-and-proofs/predicates-and-quantifiers'],
          exercises: [
            {
              slug: 'hidden-quantifiers',
              title: 'Find the hidden quantifiers',
              prompt: `Rewrite with explicit quantifiers and domains, then decide true or false, with a short reason: (a) The sum of two rational numbers is rational. (b) A positive real number has a square root. (c) Some real number equals its own cube, other than 0. (d) A continuous function on $[0,1]$ is bounded.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'order-swaps',
              title: 'Swap the quantifiers',
              prompt: `Decide each and prove your answer, with variables in $\\mathbb{Z}$: (a) $\\forall a\\,\\exists b,\\ b>a$. (b) $\\exists b\\,\\forall a,\\ b>a$. (c) $\\forall a\\,\\exists b,\\ ab=1$. (d) $\\exists a\\,\\forall b,\\ ab=b$. (e) $\\exists a\\,\\forall b,\\ ab=a$. Repeat (c) over $\\mathbb{Q}$ and over $\\mathbb{Q}\\setminus\\{0\\}$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For a false "for all", name the failing case. For a false "there exists", show that every candidate fails.',
            },
            {
              slug: 'prove-the-implication',
              title: 'Prove the implication between quantifier orders',
              prompt: `Prove that if $\\exists y\\,\\forall x\\,P(x,y)$ holds, then $\\forall x\\,\\exists y\\,P(x,y)$ holds, for any predicate $P$ on non-empty domains. Then give your own predicate on $\\mathbb{N}$, different from the ones in this lesson, where the first fails and the second holds.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the first sentence of a proof of $\\forall\\varepsilon>0\\ \\exists N$ ...?',
              answerOutline: `"Let $\\varepsilon>0$ be arbitrary." You then construct $N$, which may depend on $\\varepsilon$. If you began "Let $\\varepsilon=0.01$", you checked one case, not all of them.`,
            },
            {
              question: 'Is it fair for $y$ to depend on $x$ in $\\forall x\\,\\exists y$? What about in $\\exists y\\,\\forall x$?',
              answerOutline: `In the first, yes, because $x$ is chosen first. In the second, no: $y$ is fixed before $x$ is chosen, so it must work for all $x$ at once. Mentioning the rule "a choice may depend only on what came to its left" gets full credit.`,
            },
            {
              question: 'Does $\\forall x\\in\\varnothing,\\ P(x)$ hold? Does $\\exists x\\in\\varnothing,\\ P(x)$?',
              answerOutline: `The universal is vacuously true, since no element can fail. The existential is false, since no witness exists. If you were unsure, rewrite the first as "if $x\\in\\varnothing$ then $P(x)$".`,
            },
          ],
        },
        {
          slug: 'negating-statements',
          title: 'Negating quantified statements',
          summary:
            'A mechanical rule for negation, and why negating a definition tells you what you must do to prove that something fails.',
          estimatedMinutes: 100,
          objectives: [
            'Negate nested quantified statements mechanically',
            'Keep the domain of a bounded quantifier unchanged when negating',
            'Turn a negated definition into a proof plan',
            'Prove that a function is unbounded or a sequence does not have a given limit',
          ],
          concepts: [
            'Negation swaps for all and there exists',
            'Bounded quantifiers',
            'Negation of an implication inside a quantifier',
            'Bounded and unbounded function',
            'Negation of the limit definition',
          ],
          explanation: `To negate, push $\\neg$ inward. Each quantifier flips as it passes:
$$\\neg(\\forall x,\\ P(x))\\equiv\\exists x,\\ \\neg P(x),\\qquad \\neg(\\exists x,\\ P(x))\\equiv\\forall x,\\ \\neg P(x).$$
Then negate what remains, using De Morgan's laws and $\\neg(P\\Rightarrow Q)\\equiv P\\wedge\\neg Q$. The domain does **not** change: the negation of "$\\forall\\varepsilon>0,\\ P(\\varepsilon)$" is "$\\exists\\varepsilon>0,\\ \\neg P(\\varepsilon)$", and not something about $\\varepsilon\\le 0$.

This is more than symbol-pushing, because the negated form is a plan. It tells you exactly what you must build to prove that something fails.

**Worked example.** A function $f:\\mathbb{R}\\to\\mathbb{R}$ is *bounded above* if $\\exists M\\,\\forall x,\\ f(x)\\le M$. Its negation is
$$\\forall M\\ \\exists x,\\ f(x)>M.$$
So to show that $f(x)=x^2$ is not bounded above, your opponent names $M$ and you answer with an $x$.

*Proof.* Let $M\\in\\mathbb{R}$ be arbitrary. Take $x=|M|+1$. Since $x\\ge 1$, we have $x^2\\ge x=|M|+1>|M|\\ge M$. So $f(x)>M$. Since $M$ was arbitrary, $f$ is not bounded above. $\\square$

Now a harder one. The definition $\\lim a_n=L$ reads
$$\\forall\\varepsilon>0\\ \\exists N\\ \\forall n\\ge N,\\ |a_n-L|<\\varepsilon.$$
Its negation is
$$\\exists\\varepsilon>0\\ \\forall N\\ \\exists n\\ge N,\\ |a_n-L|\\ge\\varepsilon.$$
In words: some fixed tolerance is violated infinitely far out. For $a_n=(-1)^n$ and $L=1$, take $\\varepsilon=1$. Given $N$, pick an odd $n\\ge N$, and then $|a_n-L|=2\\ge 1$.

**A bad negation.** "The negation of $\\forall\\varepsilon>0\\ \\exists N$ ... is: for some $\\varepsilon\\le0$, ..." Here the writer has negated the domain as well. In "$\\forall\\varepsilon>0$", the condition $\\varepsilon>0$ is part of the range, and the true form is $\\forall\\varepsilon\\,(\\varepsilon>0\\Rightarrow\\cdots)$. Negating that gives $\\exists\\varepsilon\\,(\\varepsilon>0\\wedge\\neg\\cdots)$, so $\\varepsilon$ stays positive. Another common error is to flip a strict inequality to the wrong strict one: the negation of $<$ is $\\ge$, not $>$.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The end of the logic chapter covers negating statements, including quantified ones.' },
            { ...infiniteDescent, note: 'The logic appendix and early chapters show how quantifier negation is used inside proofs.' },
          ],
          exercises: [
            {
              slug: 'negation-drill',
              title: 'Negation drill',
              prompt: `Negate, moving $\\neg$ all the way in, and then say in plain English what the negation claims. (a) $\\forall x\\in\\mathbb{R}\\ \\exists n\\in\\mathbb{N},\\ n>x$. (b) $\\exists M>0\\ \\forall x\\in S,\\ |x|\\le M$. (c) $\\forall x,y\\in\\mathbb{R},\\ (f(x)=f(y)\\Rightarrow x=y)$. (d) $\\forall y\\in\\mathbb{R}\\ \\exists x\\in\\mathbb{R},\\ f(x)=y$. (e) $\\forall\\varepsilon>0\\ \\exists\\delta>0\\ \\forall x,\\ (|x-a|<\\delta\\Rightarrow|f(x)-f(a)|<\\varepsilon)$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'not-bounded-proofs',
              title: 'Using the negation as a plan',
              prompt: `Using the negated definition, prove: (a) $g(x)=x-\\sin x$ is not bounded above on $\\mathbb{R}$. (b) $h(x)=1/x$ is not bounded above on $(0,1)$. (c) The sequence $a_n=n$ does not converge to any real $L$. Your proof of (c) must begin by fixing an arbitrary $L$, then choose one $\\varepsilon$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'In (a), use $\\sin x\\le 1$. In (c), try $\\varepsilon=1$.',
            },
            {
              slug: 'diagnose-negation',
              title: 'Diagnose three wrong negations',
              prompt: `For each pair, say why the proposed negation is wrong and give the right one. (a) "$\\forall n$, $n$ is odd or $n$ is prime" negated as "$\\forall n$, $n$ is even and $n$ is composite". (b) "If $x>0$ then $x^2>0$" (for all real $x$) negated as "If $x\\le 0$ then $x^2\\le 0$". (c) "$\\exists x>0,\\ f(x)=0$" negated as "$\\forall x\\le0,\\ f(x)\\ne0$".`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Negate: every student in the class has read some book that no other student has read.',
              answerOutline: `Some student has the property that every book they have read has also been read by another student. If you ended with "no student has read a unique book", you flipped the wrong quantifier: only one student must fail. Students who have read nothing also count, vacuously.`,
            },
            {
              question: 'To prove that $a_n$ does not converge to $L$, what do you choose and what does the opponent choose?',
              answerOutline: `You choose $\\varepsilon>0$ once and for all. The opponent names $N$. You then find $n\\ge N$ with $|a_n-L|\\ge\\varepsilon$. A common error is to pick $\\varepsilon$ after $N$, which allows $\\varepsilon$ to depend on $N$, and that is not the negation.`,
            },
            {
              question: 'What is the negation of $a<x\\le b$?',
              answerOutline: `It is $x\\le a$ or $x>b$. This is "and" under De Morgan, so it becomes "or". Writing $a\\ge x>b$ says both at once, which is impossible when $a<b$.`,
            },
          ],
        },
        {
          slug: 'reading-mathematics',
          title: 'How to read a definition, a theorem and a proof',
          summary:
            'An active reading method: build examples and non-examples, drop hypotheses to see them matter, and track where each one is used.',
          estimatedMinutes: 100,
          objectives: [
            'Unpack a definition into quantified form and generate examples and non-examples',
            'Identify the hypotheses and conclusion of a theorem and test what each hypothesis does',
            'Read a proof by finding its plan and where each hypothesis is used',
            'Explain why a false variant fails when a hypothesis is dropped',
          ],
          concepts: [
            'Definition as an if and only if',
            'Example and non-example',
            'Hypothesis and conclusion',
            'Sharpness of a hypothesis',
            'Proof outline',
            'Lemma, theorem, corollary',
          ],
          explanation: `Reading mathematics at speed does not work. One page can take an hour, and that is normal. Read with a pencil and use this routine.

**For a definition:** rewrite it with explicit quantifiers. Find two examples and two non-examples, including an extreme one such as the empty set, 0 or a constant function. A definition you have no examples for is a definition you do not yet have.

**For a theorem:** separate hypotheses from conclusion. Test it on an example. Then remove each hypothesis in turn and look for a counterexample. If you cannot find one, either the hypothesis is not needed or you have not understood it yet.

**For a proof:** first find the plan: what technique, and what is the key step? Then mark where each hypothesis is used. A hypothesis that is never used is a warning.

**Worked example.** Definition: a set $S\\subseteq\\mathbb{Z}$ is *closed under subtraction* if $\\forall a,b\\in S,\\ a-b\\in S$. Examples: $\\mathbb{Z}$, the multiples of 3, and $\\{0\\}$. Non-examples: $\\mathbb{N}$, because $1-2\\notin\\mathbb{N}$, and $\\{1\\}$, because $1-1\\notin\\{1\\}$. The empty set is an example, vacuously.

Theorem: if $S\\subseteq\\mathbb{Z}$ is non-empty and closed under subtraction, then $0\\in S$ and $S$ is closed under addition.

*Proof.* Since $S\\ne\\varnothing$, pick $a\\in S$. Then $0=a-a\\in S$. Now let $b,c\\in S$. Then $-c=0-c\\in S$, so $b+c=b-(-c)\\in S$. $\\square$

*Reading it.* The hypothesis "non-empty" is used once, in picking $a$. Dropping it breaks the theorem: $\\varnothing$ is closed under subtraction and does not contain 0. Closure is used three times. Note the order: $0\\in S$ had to come first, since it is needed to get $-c$. And notice the trick: the addition $b+c$ was rewritten as a subtraction, the only operation we are told about.

**A bad reading.** "I followed every line, so I understand the proof." Following lines is checking, not understanding. Close the book and reproduce the plan in two sentences, then rebuild the details. If you cannot, read it again. Likewise, never use a theorem whose hypotheses you have not checked. Most wrong applications come from exactly that.`,
          resources: [
            { ...hutchings, primary: true, note: 'Read it the way this lesson describes, with a pencil, marking where each hypothesis is used.' },
            { ...sundstrom, note: 'The sections on constructing and writing proofs include a "know-show" table that matches this reading routine.' },
          ],
          exercises: [
            {
              slug: 'unpack-three-definitions',
              title: 'Unpack three definitions',
              prompt: `For each, write the definition with explicit quantifiers and give two examples and two non-examples, one of them extreme. (a) $f:\\mathbb{R}\\to\\mathbb{R}$ is *strictly increasing*. (b) $f:\\mathbb{R}\\to\\mathbb{R}$ is *periodic*: you must get right that the period is non-zero. (c) A set $S\\subseteq\\mathbb{R}$ is *dense in* $\\mathbb{R}$ if every open interval $(a,b)$ with $a<b$ contains a point of $S$. Then negate each definition.`,
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'drop-a-hypothesis',
              title: 'Drop a hypothesis',
              prompt: `Theorem: if $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, with $f(a)=f(b)$, then $f'(c)=0$ for some $c\\in(a,b)$ (Rolle's theorem). Give one function for each of these failures: (a) not continuous at an endpoint, (b) not differentiable at one interior point, (c) $f(a)\\ne f(b)$. In each case show that the hypotheses you kept hold and the conclusion fails. Then say what each hypothesis is doing, in one sentence each.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'multiples-from-subtraction',
              title: 'Extend the worked theorem',
              prompt: `Let $S\\subseteq\\mathbb{Z}$ be non-empty and closed under subtraction. Prove that $na\\in S$ for every $a\\in S$ and every $n\\in\\mathbb{Z}$. Then, assuming $S\\ne\\{0\\}$ and letting $d$ be the least positive element of $S$, prove that $S=\\{nd:n\\in\\mathbb{Z}\\}$. Why does $d$ exist? Mark where you use each hypothesis.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the last part use division with remainder: write $s=qd+r$ and show $r\\in S$.',
            },
          ],
          selfAssessment: [
            {
              question: 'You finish a proof without using one of the hypotheses. What are the possibilities?',
              answerOutline: `Either the proof has a gap, or the hypothesis is not needed and the theorem can be strengthened. To tell which, look for a counterexample with that hypothesis removed. If you find one, your proof must be wrong.`,
            },
            {
              question: 'Why should non-examples include extreme cases such as the empty set?',
              answerOutline: `Definitions are often unclear at the edges, and vacuous truth lives there. Checking extremes finds out whether a statement needs "non-empty" or "non-zero". In the worked theorem, $\\varnothing$ is exactly what forces the "non-empty" hypothesis.`,
            },
            {
              question: 'What does "reproduce the plan in two sentences" look like for the worked proof?',
              answerOutline: `Something like: "Get 0 as $a-a$, then get negatives as $0-c$. Then write a sum as subtraction of a negative." A line-by-line copy misses the point. A plan names the key moves and leaves out the routine details.`,
            },
          ],
        },
      ],
      project: {
        slug: 'logic-field-guide',
        title: 'A field guide to five definitions',
        description: `Build your own reference for the definitions that later courses lean on. Pick five from: bounded set, strictly increasing function, even function, limit of a sequence, continuity at a point, uniform continuity, injective, surjective, dense subset. For each, write the quantified form, its negation, what a proof and a disproof must each do, and examples at the boundary.`,
        deliverables: [
          'For each definition: the English form, the quantified form and the fully negated form',
          'For each: one example, one non-example with a proof based on the negated definition, and one extreme case',
          'One page on a pair of definitions that differ only by quantifier order, with a function that separates them',
          'A short script or table that brute-force checks the logical equivalences used in the guide over all truth assignments',
        ],
        estimatedHours: 6,
        stretchGoals: ['Formalise two of the negations in the Lean Natural Number Game style, or in another proof assistant'],
      },
    },
    {
      slug: 'proof-techniques',
      title: 'Proof Techniques',
      description:
        'How to find and write direct proofs, contrapositives, contradictions, counterexamples and uniqueness arguments, and how to tell a proof from something that only looks like one.',
      lessons: [
        {
          slug: 'direct-proof-and-cases',
          title: 'Direct proof, scratch work and cases',
          summary:
            'The difference between finding a proof and writing one: working from both ends on scratch paper, then writing forward. Includes proof by cases.',
          estimatedMinutes: 150,
          objectives: [
            'Use a given-and-goal table to find a direct proof',
            'Turn backward scratch work into a forward proof',
            'Explain why deducing something true from the claim proves nothing',
            'Write a proof by cases with cases that cover everything',
          ],
          concepts: [
            'Given and goal',
            'Unpacking definitions',
            'Scratch work versus final proof',
            'Even, odd, divides',
            'Proof by cases',
            'Exhaustive cases',
            'Without loss of generality',
          ],
          explanation: `A **direct proof** of $P\\Rightarrow Q$ assumes $P$ and reaches $Q$ through steps that each follow from what came before. Finding it and writing it are different activities. On scratch paper, make two columns, **Given** and **Goal**, and replace every term by its definition: $n$ is *even* means $n=2k$ for some integer $k$, and $a\\mid b$ means $b=ak$ for some integer $k$. Then work from both ends until they meet. You may write anything on scratch paper. Only afterwards write the argument forward.

**Worked example.** Theorem: for real $x,y\\ge0$, $\\ \\frac{x+y}{2}\\ge\\sqrt{xy}$.

*Scratch.* The goal is the same as $x+y\\ge2\\sqrt{xy}$, which is the same as $x-2\\sqrt{xy}+y\\ge0$. That left side is $(\\sqrt x-\\sqrt y)^2$, and squares are non-negative. So the idea is to start from the square.

*Proof.* Let $x,y\\ge0$. Since the square of a real number is non-negative, $(\\sqrt x-\\sqrt y)^2\\ge0$. Expanding gives $x-2\\sqrt{xy}+y\\ge0$, so $x+y\\ge2\\sqrt{xy}$. Dividing by 2 gives the result. $\\square$

**A bad proof of the same theorem.** "$\\frac{x+y}{2}\\ge\\sqrt{xy}$. Squaring, $\\frac{(x+y)^2}{4}\\ge xy$. So $(x-y)^2\\ge0$, which is true. QED." This starts from what it wants and ends with something true. But a false statement can imply a true one: from $1=-1$, squaring gives $1=1$. What the writer has shown is the wrong direction: claim $\\Rightarrow$ true fact. The steps happen to be reversible here, but that has to be checked and said. The clean fix is the forward proof above.

**Cases.** If a single argument does not fit, split the hypothesis into cases that together cover everything. Claim: $n^2+n$ is even for every integer $n$.

*Proof.* Every integer is even or odd. If $n=2k$, then $n^2+n=2(2k^2+k)$. If $n=2k+1$, then $n^2+n=(2k+1)(2k+2)=2(2k+1)(k+1)$. Either way the result is even. $\\square$

The danger is a missing case: "every positive integer is prime or composite" forgets 1. Use "without loss of generality" only when the omitted case really is the same argument with names swapped.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on direct proof, including its treatment of cases and working from definitions.' },
            { ...sundstrom, note: 'Its know-show tables are the given-and-goal method in full detail.' },
          ],
          relatedLessons: ['discrete-mathematics/logic-and-proofs/proof-techniques'],
          exercises: [
            {
              slug: 'divisibility-direct',
              title: 'Direct proofs from the definition of divides',
              prompt: `Let $a,b,c,d,m,n$ be integers. Prove: (a) if $a\\mid b$ and $a\\mid c$, then $a\\mid(mb+nc)$. (b) If $a\\mid b$ and $c\\mid d$, then $ac\\mid bd$. (c) If $a\\mid b$ and $b\\mid c$, then $a\\mid c$. For (a), show your given-and-goal table as well as the final proof.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'inequalities-both-ends',
              title: 'Work from both ends',
              prompt: `For each, hand in the scratch work and a forward proof. (a) For all real $a,b$: $a^2+b^2\\ge2ab$. (b) For all real $a>0$: $a+\\frac1a\\ge2$, with equality exactly when $a=1$. (c) For all real $x,y$: $x^2+xy+y^2\\ge0$, with equality exactly when $x=y=0$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), complete the square in $x$.',
            },
            {
              slug: 'cases-practice',
              title: 'Cases',
              prompt: `Prove by cases. (a) For every integer $n$, 3 divides $n^3-n$. (b) For all real $x,y$: $|x+y|\\le|x|+|y|$. (c) For all real $a,b$: $\\max(a,b)=\\frac{a+b+|a-b|}{2}$. State your cases in advance and say why they cover everything.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a), every integer has the form $3k$, $3k+1$ or $3k+2$.',
            },
            {
              slug: 'repair-backward-proof',
              title: 'Repair a backward proof',
              prompt: `A student writes, for positive $a,b$: "$\\frac ab+\\frac ba\\ge2$. Multiply by $ab$: $a^2+b^2\\ge2ab$. Rearrange: $(a-b)^2\\ge0$. True, so done." Say exactly what is wrong with this as written, name the hypothesis it needs and where, and write a correct forward proof.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'You derived $0=0$ from the statement you wanted to prove. Have you proved it?',
              answerOutline: `No. You have shown claim $\\Rightarrow$ true, which holds for many false claims too. It becomes a proof only if every step is reversible and you run it forward. If you answered yes, try the same steps on $1=-1$ with squaring.`,
            },
            {
              question: 'What makes a set of cases valid?',
              answerOutline: `Together they must cover every possibility allowed by the hypothesis. They do not need to be mutually exclusive, but their union must be everything. Each case must also reach the same conclusion. A good answer also says what to check: the edge values, such as $0$, $1$ and equality.`,
            },
            {
              question: 'Why replace "even" with $n=2k$ right at the start?',
              answerOutline: `The definition is the only thing you may use. It turns a word into an equation you can manipulate. Most early stuck moments come from not unpacking a definition. Remember that $k$ must be stated to be an integer: that is what the result has to preserve.`,
            },
          ],
        },
        {
          slug: 'contrapositive-and-contradiction',
          title: 'Contrapositive and contradiction',
          summary:
            'Two indirect methods, how to tell when each helps, and why a proof by contradiction can hide a mistake.',
          estimatedMinutes: 150,
          objectives: [
            'Prove an implication through its contrapositive',
            'Set up a proof by contradiction with the correct negation',
            'Choose between direct, contrapositive and contradiction proofs',
            'Recognise a contradiction proof that should be a contrapositive',
          ],
          concepts: [
            'Contrapositive proof',
            'Proof by contradiction',
            'Negating the conclusion',
            'Negative conclusions as a signal',
            'Masked contrapositive',
            'Parity and divisibility contradictions',
          ],
          explanation: `Sometimes a direct attack stalls. Take "if $n^2$ is even then $n$ is even". Directly you get $n^2=2k$, so $n=\\sqrt{2k}$, and that is a dead end. The **contrapositive** is easier: if $n$ is odd, then $n^2$ is odd. Write $n=2k+1$, and then $n^2=2(2k^2+2k)+1$, which is odd. Since the contrapositive is equivalent to the original, you are done. Contrapositives help when $\\neg Q$ gives you something concrete to work with and $P$ does not.

**Proof by contradiction** assumes the claim is false and derives an impossibility. To prove $P\\Rightarrow Q$, assume $P$ and $\\neg Q$ together. Getting the negation right is the first step, so use the rules from the logic module. Negative conclusions ("irrational", "no solution", "infinitely many") are the usual signal, since they give nothing to start from.

**Worked example.** Theorem: $\\log_2 3$ is irrational.

*Scratch.* "Irrational" means "not a ratio of integers", so there is nothing direct to work with. Assume the opposite and use the definition of a logarithm.

*Proof.* Suppose $\\log_23$ is rational. Since $3>1$, it is positive, so $\\log_23=p/q$ with positive integers $p,q$. Then $2^{p/q}=3$, and raising to the power $q$ gives $2^p=3^q$. As $p\\ge1$, the left side is even, while the right side is odd. This is a contradiction, so $\\log_23$ is irrational. $\\square$

**Choosing a method.** Try direct first. If the hypothesis is weak or the conclusion is negative, consider the contrapositive. Use contradiction when both are awkward. If your contradiction ends by contradicting $P$ only, using $\\neg Q$ alone, then you have a contrapositive in disguise, and you should rewrite it that way.

**A bad proof.** Claim: if $x^2=x$ then $x=1$. "Suppose $x^2=x$ and $x\\ne1$. Dividing by $x$ gives $x=1$, a contradiction." The claim is false, since $x=0$ works. The division by $x$ is the error, and the method gave no warning. That is the risk of contradiction: *any* slip also produces an impossibility, so a contradiction may mean the assumption is false, or may only mean you made an error. A correct version factors: $x(x-1)=0$, so $x\\in\\{0,1\\}$. Check each step with extra care, because no sanity check from the final line is available.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapters on contrapositive proof and proof by contradiction, read one after the other.' },
            { ...infiniteDescent, note: 'Its chapter on logic and proof compares the two methods with worked examples.' },
          ],
          exercises: [
            {
              slug: 'contrapositive-three',
              title: 'Three contrapositives',
              prompt: `Prove by contrapositive. (a) For integers $x,y$: if $xy$ is even, then $x$ is even or $y$ is even. (b) For reals $a,b$: if $a+b\\ge100$, then $a\\ge50$ or $b\\ge50$. (c) For an integer $n$: if $8\\nmid(n^2-1)$, then $n$ is even. Write out the contrapositive before you prove it.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'For (c), with $n=2k+1$, note that $k(k+1)$ is even.',
            },
            {
              slug: 'contradiction-four',
              title: 'Four contradictions',
              prompt: `Prove by contradiction. (a) $\\log_6 10$ is irrational. (b) There are no integers $a,b$ with $15a+21b=5$. (c) There is no smallest positive real number. (d) If $r$ is rational and $x$ is irrational, then $r+x$ is irrational. State the assumption you make in each case explicitly.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'unmask-contrapositive',
              title: 'Unmask a contrapositive',
              prompt: `Here is a proof: "Suppose $n^2$ is divisible by 3 and $n$ is not. Then $n=3k\\pm1$, so $n^2=3(3k^2\\pm2k)+1$ is not divisible by 3, which is a contradiction." Show that this is a contrapositive in disguise, then rewrite it as a direct contrapositive proof. Say which version you think is clearer, and why.`,
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'find-the-missed-solution',
              title: 'Find what the contradiction missed',
              prompt: `Claim: $\\sqrt{x+2}=-x$ has no real solution. "Proof: suppose $x$ is a solution. Squaring gives $x+2=x^2$, so $(x-2)(x+1)=0$. Taking $x=2$ gives $\\sqrt4=-2$, a contradiction." Find the exact error, decide whether the claim is true, and write the correct result with proof.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'To prove "no integer is both even and odd" by contradiction, what do you assume?',
              answerOutline: `That there is an integer $n$ which is both even and odd. Then $n=2a=2b+1$ gives $2(a-b)=1$, impossible as $a-b$ is an integer. If you assumed "all integers are both", your negation of "no" is wrong. It should be "some".`,
            },
            {
              question: 'When should you rewrite a contradiction proof?',
              answerOutline: `When it never uses $P$ until the last line, which contradicts $P$. In that case it proves $\\neg Q\\Rightarrow\\neg P$, so say so. Also when the assumption $\\neg Q$ is never used: then you have a direct proof wrapped in a needless "suppose".`,
            },
            {
              question: 'Why is an error harder to spot in a proof by contradiction?',
              answerOutline: `The final line is meant to be false. In a direct proof, a false line warns you. In contradiction, a false line is what you were hoping for, so a slip looks like success. Good habits: check divisions by possibly-zero quantities and test your steps on a concrete case.`,
            },
          ],
        },
        {
          slug: 'counterexamples-and-existence',
          title: 'Counterexamples and existence proofs',
          summary:
            'How to search for a counterexample, what a valid one must satisfy, and the difference between constructive and non-constructive existence.',
          estimatedMinutes: 110,
          objectives: [
            'Disprove a universal claim with a valid counterexample',
            'Search systematically for counterexamples',
            'Give constructive and non-constructive proofs of existence',
            'Decide whether to prove or disprove an unfamiliar claim',
          ],
          concepts: [
            'Counterexample',
            'Hypothesis true, conclusion false',
            'Evidence versus proof',
            'Constructive existence',
            'Non-constructive existence',
            'Prove or disprove',
          ],
          explanation: `One counterexample destroys a universal claim. A thousand examples never prove one. A valid **counterexample** to $\\forall x,\\ (P(x)\\Rightarrow Q(x))$ makes $P$ true and $Q$ false.

To search for one, try small and extreme values: $0,1,-1,2$, the empty set, constant functions. Then ask *why* the claim might be true, and push on that reason.

**Worked example.** Is $n^2+n+41$ prime for every integer $n\\ge0$? It gives 41, 43, 47, 53, 61, ... and in fact it is prime for every $n$ from 0 to 39. Checking cases can look convincing, so think about structure instead. To force a factor of 41, make every term a multiple of 41. At $n=40$,
$$40^2+40+41=40\\cdot 41+41=41\\cdot 41,$$
which is not prime. So the claim is false. Forty successes did not help, and a little algebra found the failure.

**Existence.** To prove $\\exists x,\\ P(x)$, a **constructive** proof names $x$. A **non-constructive** proof shows that one must exist without saying which.

*Theorem:* there are irrational numbers $a,b$ with $a^b$ rational.

*Proof.* Consider $c=\\sqrt2^{\\sqrt2}$. Either $c$ is rational or it is not. If it is rational, take $a=b=\\sqrt2$. If it is irrational, take $a=c$ and $b=\\sqrt2$. Then $a^b=\\sqrt2^{\\sqrt2\\cdot\\sqrt2}=\\sqrt2^{\\,2}=2$. Either way, a suitable pair exists. $\\square$

This proof does not tell you which pair works. It uses only that $\\sqrt2$ is irrational and the law of excluded middle. The intermediate value theorem is another non-constructive tool, and you will meet many more.

**A bad counterexample.** To disprove "every prime is odd", a student offers 9: "it's odd but not prime." That tests the converse. Here $P$ is "prime", and 9 fails $P$, so it says nothing. The right counterexample is 2, which is prime and not odd. Before you present a counterexample, write out both checks: hypothesis true, conclusion false.

**Prove or disprove.** Do not commit early. Try examples first. If they survive, look for a reason. If a proof attempt stalls at some step, the stuck point often shows you how to build the counterexample.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapters on non-conditional statements and on disproof cover existence, uniqueness and counterexamples.' },
            { ...sundstrom, note: 'Use its section on existence and uniqueness for extra examples.' },
          ],
          exercises: [
            {
              slug: 'disprove-these',
              title: 'Disprove these',
              prompt: `Give a counterexample and check both parts. (a) If $a\\mid bc$, then $a\\mid b$ or $a\\mid c$. (b) $\\sqrt{x^2}=x$ for all real $x$. (c) Every continuous function on $(0,1)$ is bounded. (d) $2^{2^n}+1$ is prime for all integers $n\\ge0$ (you may compute). (e) Every differentiable function $f:\\mathbb{R}\\to\\mathbb{R}$ has a differentiable derivative.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'For (d), try $n=5$. For (e), think about $x|x|$.',
            },
            {
              slug: 'prove-or-disprove-mixed',
              title: 'Prove or disprove',
              prompt: `Decide and justify each. (a) The sum of two irrational numbers is irrational. (b) If $a,b$ are positive integers with $a\\mid b$ and $b\\mid a$, then $a=b$. (c) The product of three consecutive integers is divisible by 6. (d) For real $x$, if $x^2>x$ then $x>1$. (e) For positive integers, if $n$ is composite then $2^n-1$ is composite. (f) For positive integers, if $2^n-1$ is composite then $n$ is composite.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (e), if $n=ab$ then $2^a-1$ divides $2^{ab}-1$. For (f), test small primes $n$.',
            },
            {
              slug: 'constructive-pair',
              title: 'Make the existence proof constructive',
              prompt: `Using the irrationality of $\\log_23$, name explicit irrational numbers $a,b$ with $a^b$ rational. Prove that your numbers are irrational and compute $a^b$. Then give a non-constructive proof that $x^5+x-1=0$ has a real root in $(0,1)$, and say which theorem you are relying on and why its hypotheses hold.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Try $a=\\sqrt2$ and $b=2\\log_23$.',
            },
          ],
          selfAssessment: [
            {
              question: 'A statement holds for $n=1,\\dots,10^6$. What do you now know?',
              answerOutline: `Only that those cases hold. Evidence can suggest what to prove, but for a universal claim it is not a proof. The worked example failed at $n=40$. A good answer adds that real conjectures have failed first at much larger values.`,
            },
            {
              question: 'What two checks must each counterexample pass?',
              answerOutline: `The hypothesis is true of it, and the conclusion is false of it. If yours fails the first check, you have tested a different statement, usually the converse, and shown nothing.`,
            },
            {
              question: 'In the $\\sqrt2^{\\sqrt2}$ proof, do we learn which case holds?',
              answerOutline: `No, and we do not need to. The proof covers both cases, and each yields a pair. That is what non-constructive means. (Deep theorems show it is irrational, but the proof makes no use of this.)`,
            },
          ],
        },
        {
          slug: 'uniqueness-and-solving-equations',
          title: 'Uniqueness and solving equations as proof',
          summary:
            'Proving that exactly one thing works, and why solving an equation is a two-way proof that certain numbers are all the solutions.',
          estimatedMinutes: 110,
          objectives: [
            'Prove exists-unique statements by proving existence and uniqueness separately',
            'Treat "solve" as a proof that two sets are equal',
            'Identify which algebra steps can add or lose solutions',
            'Write up a solution with its logic stated',
          ],
          concepts: [
            'Exists a unique',
            'Solution set',
            'Necessary conditions and checking candidates',
            'Reversible and irreversible steps',
            'Extraneous solutions',
            'Lost solutions',
          ],
          explanation: `"There is exactly one $x$ with $P(x)$" hides two claims, and a proof has two parts.

- **Existence:** some $x$ satisfies $P$.
- **Uniqueness:** if $x$ and $y$ both satisfy $P$, then $x=y$.

**Solving an equation is the same kind of proof.** "The solutions are exactly the elements of $S$" is a set equality with two directions. *Every solution is in $S$*: you assume $x$ is a solution and deduce that it must lie in $S$. *Every element of $S$ is a solution*: you check them. Ordinary algebra mostly proves the first direction. The second is what "check your answer" is really doing, and it is part of the proof, not a precaution.

**Worked example.** Solve $\\sqrt{x+6}=x$ over the reals.

*Necessary conditions.* Suppose $x$ is a real solution. Squaring gives $x+6=x^2$, so $(x-3)(x+2)=0$ and $x\\in\\{3,-2\\}$.

*Checking.* For $x=3$: $\\sqrt9=3$, which holds. For $x=-2$: $\\sqrt4=2\\ne-2$, which fails.

*Conclusion.* The solution set is exactly $\\{3\\}$. So there is exactly one solution, and this argument is both the existence and the uniqueness proof.

Why did $-2$ appear? Squaring is not reversible: $a^2=b^2$ does not give $a=b$. The step $x+6=x^2$ follows from the equation, but not the other way round.

**Steps that change the answer.**

- *Squaring* and other non-injective operations can **add** solutions. Check them.
- *Dividing by an expression that may be zero* can **lose** solutions. From $x^2=2x$, dividing by $x$ gives only $x=2$, losing $x=0$. Factor instead: $x(x-2)=0$.
- *Multiplying by an expression that may be zero* can add solutions. Clearing denominators in $\\frac{x}{x-1}=\\frac{1}{x-1}$ gives $x=1$, which is not in the domain, so that equation has no solution.
- *Taking logarithms or restricting the domain* can change what is allowed. State the domain first.

**A bad write-up.** "$\\sqrt{x+6}=x$, $x+6=x^2$, $x^2-x-6=0$, $x=3,-2$." These lines have no logical connectives, so nobody can say what is being claimed, and it is false as a final answer. Say at each stage whether you are claiming "if" or "if and only if". The word "so" means a one-way step, and "$\\iff$" must be earned by a reversibility check.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on proving non-conditional statements includes if-and-only-if and existence and uniqueness proofs.' },
            { ...infiniteDescent, note: 'See its treatment of proving uniqueness and of bi-implication.' },
          ],
          exercises: [
            {
              slug: 'solve-with-proof',
              title: 'Solve with proof',
              prompt: `Find every real solution, and write your solution as a proof with the direction of each step clear. (a) $\\sqrt{2x+3}=x$. (b) $|x-2|=2x+1$. (c) $x^3=4x$. (d) $\\ln x+\\ln(x-3)=\\ln4$. (Expected solution sets: $\\{3\\}$, $\\{1/3\\}$, $\\{-2,0,2\\}$, $\\{4\\}$.)`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'exists-unique-proofs',
              title: 'Exactly one',
              prompt: `Prove: (a) for every real $c$, the equation $x^3+x=c$ has exactly one real solution (use the intermediate value theorem for existence and monotonicity for uniqueness). (b) $e^x=1+x$ has exactly one real solution. (c) Given that an integer $n$ with $n\\le x<n+1$ exists for each real $x$, prove that this $n$ is unique.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (b), use the sign of the derivative of $e^x-1-x$. For (c), if $n<m$ both work then $m\\ge n+1>x$.',
            },
            {
              slug: 'diagnose-solutions',
              title: 'Diagnose two solutions',
              prompt: `For each, find the error, say which direction of the logic failed, and give the correct solution set. (a) "$(x-1)(x+2)=4(x-1)$. Cancel $x-1$: $x+2=4$, so $x=2$." (b) "$x+\\sqrt{x-1}=1$. Then $\\sqrt{x-1}=1-x$, so $x-1=(1-x)^2$, so $(x-1)(x-2)=0$. Thus $x=1$ or $x=2$."`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'You have shown that if $x$ solves an equation then $x=5$. Have you solved it?',
              answerOutline: `Not yet. You know that no other number works, but the equation may have no solution at all. You still need to check that 5 works. Missing this step is the commonest error in "solve" problems.`,
            },
            {
              question: 'A uniqueness proof starts "Suppose $x$ and $y$ are both solutions." What is it allowed to assume, and where must it end?',
              answerOutline: `It may assume only that both satisfy $P$, and it must end with $x=y$. Assuming $x\\ne y$ and reaching a contradiction is also fine. Using one specific formula for the solution is not a uniqueness proof unless every solution has been shown to have that form.`,
            },
            {
              question: 'Which step can add solutions and which can lose them: squaring both sides, dividing by $x-2$?',
              answerOutline: `Squaring can add them, because $a^2=b^2$ also holds when $a=-b$. Dividing by $x-2$ can lose $x=2$. A good answer gives the repair: check candidates after squaring, and factor instead of dividing.`,
            },
          ],
        },
        {
          slug: 'writing-proofs-well',
          title: 'Writing proofs well, and how proofs fail',
          summary:
            'A catalogue of the failures that appear most often, a before-and-after rewrite, and a checklist for your own drafts.',
          estimatedMinutes: 120,
          objectives: [
            'Identify the common failures of a flawed proof',
            'Rewrite a flawed proof so that another reader can check it',
            'Follow the conventions of mathematical prose',
            'Grade a proof against a clear rubric',
          ],
          concepts: [
            'Assuming the conclusion',
            'Proof by example',
            'Reused variable',
            'Undeclared variable',
            'Hidden key step',
            'Proof as prose',
            'Revision',
          ],
          explanation: `A proof is an argument addressed to a skeptical reader. It must be correct, and the reader must be able to see that it is. Most failures fall into a few families.

1. **Assuming the conclusion.** Starting from the claim, or using it midway.
2. **Proof by example.** Checking cases and declaring the general result.
3. **The reused letter.** Using one $k$ for two different unknowns.
4. **Undeclared symbols.** A letter appears with no "let" and no "for some".
5. **Wrong direction.** Proving the converse.
6. **The hidden key step.** "Clearly" or "it follows easily" hides the only hard part.
7. **Symbol soup.** Chains of arrows with no words, so that the logic cannot be read.

**Worked example: failure 3.** Claim: the product of two odd integers is odd.

*Bad.* "Let $m,n$ be odd, so $m=2k+1$ and $n=2k+1$. Then $mn=4k^2+4k+1=2(2k^2+2k)+1$, which is odd."

*What went wrong.* Using one $k$ forces $m=n$, so the argument only covers squares. It checks one special case and claims the general result. The algebra is right, which is why this error is hard to see.

*Rewrite.* "Let $m$ and $n$ be odd integers. By definition there are integers $k,\\ell$ with $m=2k+1$ and $n=2\\ell+1$. Then
$$mn=4k\\ell+2k+2\\ell+1=2(2k\\ell+k+\\ell)+1.$$
Since $2k\\ell+k+\\ell$ is an integer, $mn$ is odd. $\\square$"

Notice what changed. Each variable is introduced with what it is. The reason each step holds is stated. The integer status of the bracket is mentioned, since that is what the definition of odd requires.

**Conventions to adopt.**

- Write full sentences. Symbols go inside sentences, and "$\\Rightarrow$" is not a substitute for words.
- Say what you are assuming and what you will show. State the method if it is not direct.
- Declare every letter, and say what it is: integer, real, fixed or arbitrary.
- Give a reason for each step that is not routine. Say which hypothesis you are using.
- Do not include scratch work or the history of what you tried.
- Finish by stating what has been proved.

**Revise.** Put a draft away for an hour, then read it as a skeptical stranger who wants to find the gap. Ask of each sentence: why is this true? If the answer is not on the page, add it. Reading aloud finds many errors.`,
          resources: [
            { ...hutchings, primary: true, note: 'Pay attention to how each proof is phrased, and imitate the prose.' },
            { ...bookOfProof, note: 'Its early proof chapters include practical advice on mathematical writing.' },
            { ...mitMathForCs, note: 'The early lectures on proofs give a second view on what makes a good proof.' },
          ],
          exercises: [
            {
              slug: 'name-the-failure',
              title: 'Name the failure',
              prompt: `Each proof has a flaw. Name it from this lesson's list, say whether the claim is true, and write a correct proof or a counterexample. (a) Claim: if $a\\mid b$ and $a\\mid c$, then $a\\mid(b+c)$. "$b=ak$ and $c=ak$, so $b+c=2ak$." (b) Claim: $n^2-n$ is even for all integers $n$. "For $n=1,2,3$ we get $0,2,6$, all even." (c) Claim: if $x+y$ is irrational then $x$ or $y$ is irrational. "Clearly, since rationals add to rationals." (d) Claim: if $n^2$ is divisible by 4, then $n$ is. "If $n=4k$, then $n^2=16k^2$ is divisible by 4." Careful: decide (d) first.`,
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'rewrite-symbol-soup',
              title: 'Rewrite symbol soup',
              prompt: `Turn this into a proof in sentences, adding anything that is missing: "$A$: $a,b\\in\\mathbb{Q}$, $b\\ne0$ $\\Rightarrow$ $a=p/q$, $b=r/s$ $\\Rightarrow$ $a/b=ps/qr$ $\\Rightarrow$ $a/b\\in\\mathbb{Q}$." State what each letter is and identify the place where $b\\ne0$ is used.`,
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'grade-with-a-rubric',
              title: 'Grade a proof',
              prompt: `Claim: if $a,b$ are integers and $a^2+b^2$ is odd, then exactly one of $a,b$ is odd. A student's proof: "By cases. If both are even, $a^2+b^2$ is even. If both are odd, $a^2+b^2$ is even too. So one is even and one is odd." Grade this out of 10, using 5 points for correctness, 3 for completeness and 2 for writing. State what is missing, then write the 10/10 version with every step justified.`,
              kind: 'writing',
              difficulty: 2,
              hint: 'Is this really a contrapositive? What about the claim that odd plus odd is even in this setting: is it justified?',
            },
          ],
          selfAssessment: [
            {
              question: 'A proof begins "Let $x=2k$ and $y=2k+1$" for an even $x$ and an odd $y$. What is your feedback?',
              answerOutline: `Same $k$ means $y=x+1$, so only consecutive pairs are covered. Use two names, such as $x=2k$ and $y=2\\ell+1$. Rule: each object that the definition gives you gets its own new letter.`,
            },
            {
              question: 'Is "clearly" ever acceptable?',
              answerOutline: `Yes, but only for steps your intended reader can verify in a moment. It is a failure when it replaces the key step. Test: if you removed the sentence and asked why, could you answer at once? If you would have to think, write out the reason.`,
            },
            {
              question: 'What does a reader need from the first two lines of a proof?',
              answerOutline: `What is being assumed, what the letters are, and, unless the proof is direct, which method is being used. For instance: "We prove the contrapositive. Suppose $n$ is odd." A reader who has to guess at the plan cannot check the steps.`,
            },
          ],
        },
      ],
      project: {
        slug: 'proof-clinic',
        title: 'A proof clinic',
        description: `Build a personal record of how proofs fail. Collect your own early attempts from this module and make them better, then set flawed proofs for your future self. The aim is to practise the skeptical reading that lets you check your own work.`,
        deliverables: [
          'Six of your own proofs from this module in first draft and final form, with a note on each saying what changed and why',
          'A bestiary of seven flawed proofs that you wrote yourself, one per failure family, with a diagnosis and a corrected version on a separate page',
          'A one-page personal checklist of the mistakes you make most',
          'One theorem proved in two different ways, such as directly and by contradiction, with a comment on which is better',
        ],
        estimatedHours: 8,
        stretchGoals: ['Swap bestiaries with someone else and grade each other, or read your own again a month later'],
      },
    },
    {
      slug: 'induction',
      title: 'Induction',
      description:
        'Weak and strong induction, well-ordering and recursive definitions, with close attention to why broken induction proofs look so convincing.',
      lessons: [
        {
          slug: 'weak-induction',
          title: 'Mathematical induction',
          summary:
            'The base case and inductive step, how to find the step by locating the old case inside the new one, and how to write it up.',
          estimatedMinutes: 130,
          objectives: [
            'State the principle of induction',
            'Write a correctly structured induction proof',
            'Find the inductive step by locating the case $k$ inside the case $k+1$',
            'Identify which hypotheses are used in the step',
          ],
          concepts: [
            'Base case',
            'Inductive hypothesis',
            'Inductive step',
            'Starting from a value other than 1',
            'Bernoulli\'s inequality',
            'Fixing $k$ versus assuming for all $n$',
          ],
          explanation: `**Induction** proves a statement $P(n)$ for all integers $n\\ge n_0$ in two steps.

1. **Base case:** prove $P(n_0)$.
2. **Inductive step:** let $k\\ge n_0$ be arbitrary, assume $P(k)$, and prove $P(k+1)$.

Together these give $P(n_0)$, then $P(n_0+1)$, and so on, reaching every integer. The step proves an implication, and it does not claim $P(k)$ is true on its own.

*Finding the step.* On scratch paper, write $P(k+1)$ in full. Find $P(k)$ inside it. Whatever is left over is the work you have to do.

**Worked example (Bernoulli's inequality).** For every real $x\\ge-1$ and every integer $n\\ge1$, $\\ (1+x)^n\\ge1+nx$.

*Scratch.* In $(1+x)^{k+1}=(1+x)^k(1+x)$ the old quantity appears, so multiply the hypothesis by $1+x$. The inequality must survive that, which needs $1+x\\ge0$. That is where $x\\ge-1$ comes from.

*Proof.* Fix a real $x\\ge-1$. We induct on $n$.

*Base case.* For $n=1$, both sides equal $1+x$.

*Inductive step.* Let $k\\ge1$ and assume $(1+x)^k\\ge1+kx$. Since $1+x\\ge0$, multiplying both sides by $1+x$ keeps the direction:
$$(1+x)^{k+1}\\ge(1+kx)(1+x)=1+(k+1)x+kx^2\\ge1+(k+1)x,$$
where the last step uses $kx^2\\ge0$. This is $P(k+1)$. By induction, the inequality holds for all $n\\ge1$. $\\square$

Notice three things: $x$ was fixed before the induction began, the hypothesis was used at a visible point, and the term $kx^2$ was thrown away on purpose. Many inductive steps for inequalities need a small loss like this.

**A bad proof.** "Assume $P(n)$ is true for all $n$. Then $(1+x)^{n+1}=\\dots$" The opening assumes the whole theorem. The correct opening is "let $k\\ge1$ and assume $P(k)$", for one fixed $k$. Another common failure begins with $P(k+1)$ and manipulates it until it becomes something true. That is the backward error from the proof techniques module. And never omit the base case, which the next lesson shows matters.

Also, the sentence "by induction" is not a proof by itself. Say what $P(n)$ is, what variable you induct on and where the hypothesis enters.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on mathematical induction, with its examples of sums and inequalities.' },
            {
              title: 'Induction (Conrad)',
              url: 'https://kconrad.math.uconn.edu/blurbs/proofs/induction.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Keith Conrad, University of Connecticut',
              note: 'A short expository note with non-routine examples of induction.',
            },
            { ...mitMathForCs, note: 'The lectures on induction give a computer-science view and more examples.' },
          ],
          exercises: [
            {
              slug: 'sums-by-induction',
              title: 'Sums',
              prompt: `Prove for all $n\\ge1$: (a) $1+3+\\dots+(2n-1)=n^2$. (b) $\\sum_{k=1}^nk^3=\\left(\\frac{n(n+1)}{2}\\right)^2$. (c) $\\sum_{k=1}^nk\\cdot k!=(n+1)!-1$. Check each formula for $n=1,\\dots,5$ first.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'divisibility-by-induction',
              title: 'Divisibility',
              prompt: `Prove by induction for all $n\\ge1$: (a) $7\\mid8^n-1$. (b) $6\\mid n^3+5n$. (c) $9\\mid4^n+15n-1$. In each case, identify exactly how the expression for $k+1$ was rewritten to expose the expression for $k$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (b), $n(n+1)$ is even. For (c), write $4^{k+1}=4\\cdot4^k$ and use the hypothesis to replace $4^k$.',
            },
            {
              slug: 'inequalities-by-induction',
              title: 'Inequalities with a later base case',
              prompt: `Find the smallest $n_0$ for which each holds for all $n\\ge n_0$, then prove it: (a) $2^n>n^2$. (b) $n!>2^n$. (c) $3^n>n^3$. Be careful: (a) and (c) have small cases where the inequality holds and then fails.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'power-rule',
              title: 'Calculus by induction',
              prompt: `Using only the product rule and $\\frac{d}{dx}x=1$, prove that $\\frac{d}{dx}x^n=nx^{n-1}$ for all integers $n\\ge1$. Then prove that if $f_1,\\dots,f_n$ are differentiable and non-zero, $\\frac{(f_1\\cdots f_n)'}{f_1\\cdots f_n}=\\sum_{i=1}^n\\frac{f_i'}{f_i}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is wrong with "Assume $P(n)$ for all $n$, and show $P(n+1)$"?',
              answerOutline: `It assumes the whole theorem. The hypothesis is about one fixed $k$. Rewrite it as "Let $k\\ge1$ and assume $P(k)$." If you can only spot this by comparing with a template, try saying what is known and what is not at that moment of the proof.`,
            },
            {
              question: 'In Bernoulli\'s inequality, why must $x\\ge-1$? Does the conclusion actually fail without it?',
              answerOutline: `It keeps $1+x\\ge0$ so that multiplying preserves the inequality. It does fail: at $x=-4$, $n=3$ we get $(-3)^3=-27$ while $1+nx=-11$, and $-27<-11$. Since the case matters, the hypothesis is not decoration.`,
            },
            {
              question: 'How do you know where to use the inductive hypothesis?',
              answerOutline: `Write out $P(k+1)$, and look for the $P(k)$ quantity inside it: the sum up to $k$, or a factor $(1+x)^k$. If you have to rewrite the expression to reveal it, do so. A step that never uses the hypothesis is either not induction or a sign of an error.`,
            },
          ],
        },
        {
          slug: 'where-induction-goes-wrong',
          title: 'Where induction goes wrong, and strengthening',
          summary:
            'Broken induction proofs, a step that fails at one value, and the surprising fact that proving more can be easier.',
          estimatedMinutes: 110,
          objectives: [
            'Find the exact value at which a flawed inductive step fails',
            'Explain why both the base case and the step are required',
            'Strengthen a statement so that an inductive step goes through',
            'Check the transition from the base case to the next case',
          ],
          concepts: [
            'Failure at the first step',
            'Missing base case',
            'Step valid for all $k$',
            'Strengthening the hypothesis',
            'Telescoping bounds',
          ],
          explanation: `Induction fails in instructive ways.

**A bad proof.** "All horses have the same colour." Let $P(n)$ say: in any set of $n$ horses, all have the same colour. $P(1)$ is clear. Assume $P(k)$, and take $k+1$ horses. Remove horse $a$: the remaining $k$ have one colour. Remove horse $b$: the remaining $k$ have one colour. The two groups overlap, so all $k+1$ match.

The base case is true, and the step looks right. The flaw is in "the two groups overlap". The groups are $S\\setminus\\{a\\}$ and $S\\setminus\\{b\\}$. If $k=1$ then $S=\\{a,b\\}$, so the groups are $\\{b\\}$ and $\\{a\\}$, with nothing in common. The step fails for exactly one value of $k$, and since $P(1)\\Rightarrow P(2)$ is what starts the chain, everything collapses. So the inductive step must hold for *every* $k\\ge n_0$. Test the smallest $k$ by hand.

**A missing base case.** "$n=n+1$ for all $n$: if $k=k+1$, add 1 to get $k+1=k+2$." The step is valid. No base case exists, so nothing follows. The step only proves an implication.

**Strengthening.** Surprisingly, proving more can be easier, because you have a stronger hypothesis to work with.

**Worked example.** Claim: $\\sum_{k=1}^n\\frac1{k^2}\\le2$ for all $n\\ge1$.

*Attempt.* Assume the sum up to $n$ is at most 2. Adding $\\frac1{(n+1)^2}$ gives at most $2+\\frac1{(n+1)^2}$, which is more than 2. The step fails, as the hypothesis leaves no room.

*Strengthen.* Prove instead $S_n=\\sum_{k=1}^n\\frac1{k^2}\\le2-\\frac1n$.

*Base case.* For $n=1$: $1\\le2-1$.

*Step.* Assume $S_n\\le2-\\frac1n$. Then
$$S_{n+1}\\le2-\\frac1n+\\frac1{(n+1)^2}.$$
We want this to be at most $2-\\frac1{n+1}$, that is, $\\frac1{(n+1)^2}\\le\\frac1n-\\frac1{n+1}=\\frac1{n(n+1)}$. This holds because $n(n+1)\\le(n+1)^2$. So $S_{n+1}\\le 2-\\frac1{n+1}$. Since $2-\\frac1n<2$, the original claim follows. $\\square$

How do you find the stronger form? Look for a quantity that shrinks at the rate you are adding terms. Here, the differences of $1/n$ have size about $1/n^2$, the same as the terms.`,
          resources: [
            { ...infiniteDescent, primary: true, note: 'The induction chapter includes variations and common difficulties.' },
            { ...bookOfProof, note: 'Look at the chapter-end exercises on induction once you have read this lesson.' },
          ],
          exercises: [
            {
              slug: 'broken-exponent',
              title: 'Find the first failing value',
              prompt: `Claim: for every real $a>0$ and integer $n\\ge1$, $a^{n-1}=1$. "Proof by strong induction. For $n=1$, $a^0=1$. Assume it for all values up to $n$. Then $a^{n}=\\frac{a^{n-1}\\cdot a^{n-1}}{a^{n-2}}=\\frac{1\\cdot1}{1}=1$." Identify the precise value of $n$ at which this step fails, and say why.`,
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'strengthen-cubes',
              title: 'Strengthen a bound',
              prompt: `Prove that $\\sum_{k=1}^n\\frac1{k^3}\\le\\frac32$ for all $n\\ge1$ by first showing that the direct induction stalls, then proving the stronger bound $\\sum_{k=1}^n\\frac1{k^3}\\le\\frac32-\\frac1{2n^2}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'strengthen-odds-over-evens',
              title: 'A sharper strengthening',
              prompt: `Let $r_n=\\frac{1\\cdot3\\cdot5\\cdots(2n-1)}{2\\cdot4\\cdot6\\cdots(2n)}$. (a) Show why an attempted induction for $r_n\\le\\frac1{\\sqrt{3n}}$ does not go through as it stands. (b) Prove $r_n\\le\\frac1{\\sqrt{3n+1}}$ by induction. (c) Explain why (b) implies the bound in (a).`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'After squaring, (b) reduces to comparing $(2n+1)^2(3n+4)$ with $(2n+2)^2(3n+1)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which single implication in the chain breaks in the horses argument?',
              answerOutline: `$P(1)\\Rightarrow P(2)$. It holds for all $k\\ge2$, because the groups then share a horse. The feedback to remember: "true in general" is not enough, and the first link matters most. If you said "the base case is wrong", check again: it is true.`,
            },
            {
              question: 'Why can a stronger claim be easier to prove by induction?',
              answerOutline: `Because you get to assume more in the step. A bound of 2 leaves no slack. A bound of $2-\\frac1n$ leaves a margin of $\\frac1n$, which pays for the next term. You must also prove more, but here the extra margin more than covers it.`,
            },
            {
              question: 'How would you test whether your inductive step is valid at the smallest $k$?',
              answerOutline: `Set $k=n_0$ and work through the step with actual objects, such as two horses. Check that every sentence still makes sense, including words like "the other" and quantities like $k-1$. Failures commonly appear when a set or index runs out.`,
            },
          ],
        },
        {
          slug: 'strong-induction-and-well-ordering',
          title: 'Strong induction and well-ordering',
          summary:
            'Assuming all earlier cases, using minimal counterexamples, and the division algorithm as a first serious application.',
          estimatedMinutes: 130,
          objectives: [
            'Use strong induction with the right number of base cases',
            'State the well-ordering principle and recognise where it applies',
            'Write a minimal counterexample proof',
            'Prove the division algorithm',
          ],
          concepts: [
            'Strong induction',
            'Multiple base cases',
            'Well-ordering principle',
            'Minimal counterexample',
            'Division algorithm',
            'Equivalence of induction forms',
          ],
          explanation: `In **strong induction** the step assumes $P(j)$ for *all* $j$ with $n_0\\le j\\le k$, and proves $P(k+1)$. Use it when the next case depends on some earlier case, not on the previous one.

**Worked example 1.** Every integer $n\\ge2$ is a product of primes (a single prime counts).

*Proof.* We use strong induction. $n=2$ is prime. Let $k\\ge2$ and assume the claim for all $j$ with $2\\le j\\le k$. If $k+1$ is prime, we are done. Otherwise $k+1=ab$ with $2\\le a,b\\le k$. Both $a$ and $b$ are products of primes by hypothesis, so $ab$ is too. $\\square$

Weak induction would not work here, as $k+1$ has no useful relation to $k$.

**A bad proof.** Claim: each integer $n\\ge12$ equals $4a+5b$ with integers $a,b\\ge0$. "Base: $12=4\\cdot3$. Step: $k+1=(k-3)+4$, and $k-3$ works by strong induction." For $k+1=13$, the argument needs $k-3=9$, which is below 12 and not covered. The fix is to prove four base cases: $12=4\\cdot 3$, $13=4\\cdot 2+5$, $14=4+2\\cdot 5$, $15=3\\cdot 5$. Then the step is valid for $k+1\\ge16$. Rule: if the step reaches back $m$ places, you need $m$ consecutive base cases.

**Well-ordering.** Every non-empty subset of $\\mathbb{N}$ has a least element. It is equivalent to induction, and it gives a useful style: to prove something for all $n$, consider the smallest counterexample and find a smaller one.

**Worked example 2 (division algorithm).** For integers $a$ and $b\\ge1$, there are integers $q,r$ with $a=bq+r$ and $0\\le r<b$.

*Proof.* Let $S=\\{a-bq:q\\in\\mathbb{Z},\\ a-bq\\ge0\\}$. It is a set of non-negative integers. It is non-empty, because $q=-|a|$ gives $a+b|a|\\ge a+|a|\\ge0$. By well-ordering, $S$ has a least element $r=a-bq$. If $r\\ge b$, then $r-b=a-b(q+1)$ is a smaller element of $S$, a contradiction. So $0\\le r<b$. $\\square$

Well-ordering needs a set of non-negative integers or a set bounded below in $\\mathbb{Z}$. "Let $x$ be the smallest positive rational" is meaningless, as no such number exists. Before using a minimum, say why the set is non-empty and well-ordered.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The later part of the induction chapter covers strong induction and smallest counterexamples.' },
            { ...mitMathForCs, note: 'Its material on well-ordering and strong induction is a good second source.' },
          ],
          exercises: [
            {
              slug: 'postage-style',
              title: 'Representations with strong induction',
              prompt: `(a) Prove that every integer $n\\ge24$ can be written as $5a+7b$ with integers $a,b\\ge0$, and that 23 cannot. Say how many base cases your proof needs, and list all the positive integers that cannot be written this way. (b) Prove that every positive integer is a sum of distinct powers of 2.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a), step back by 5. For (b), if $n$ is even use $n/2$, and if $n$ is odd use $n-1$.',
            },
            {
              slug: 'recurrence-bound',
              title: 'A recurrence bound',
              prompt: `Let $a_1=1$, $a_2=3$ and $a_{n}=3a_{n-1}-2a_{n-2}$ for $n\\ge3$. Conjecture a formula, then prove it by strong induction. Say how many base cases your step needs, and why.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'division-uniqueness',
              title: 'Uniqueness in the division algorithm',
              prompt: `Prove that the $q$ and $r$ in the division algorithm are unique. Then use a minimal counterexample to prove that every integer $n\\ge2$ has a prime divisor, without using the product-of-primes theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'descent-root-two',
              title: 'A proof by descent',
              prompt: `Use well-ordering to prove that there are no positive integers $a,b$ with $a^2=2b^2$: consider the least possible $b$, show that $a$ and then $b$ must be even, and get a smaller solution. Explain how this relates to "take $a/b$ in lowest terms".`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When do you need more than one base case?',
              answerOutline: `When the step uses cases more than one place back. If $P(k+1)$ uses $P(k-3)$, you need four consecutive base cases, or some $k$ will reach below your start. Test: for the smallest $k+1$ handled by the step, is each case it uses already covered?`,
            },
            {
              question: 'Give a set where the well-ordering principle does not apply, and say why.',
              answerOutline: `$\\mathbb{Z}$ has no least element, and $(0,1)$ has none. The positive rationals have none either. It needs a non-empty set of natural numbers, or integers bounded below. A good answer names the reason: for $(0,1)$, $x/2$ is always smaller.`,
            },
            {
              question: 'Why did the division algorithm proof need $S$ non-empty, and how was that shown?',
              answerOutline: `Well-ordering says nothing about the empty set. $q=-|a|$ gives $a+b|a|\\ge0$ because $b\\ge1$. Forgetting the non-empty check is the most common gap in such proofs.`,
            },
          ],
        },
        {
          slug: 'recursive-definitions',
          title: 'Recursive definitions',
          summary:
            'Defining sequences and sets recursively, and using induction that follows the shape of the definition.',
          estimatedMinutes: 110,
          objectives: [
            'Write a recursive definition with base and recursive parts',
            'Decide whether a recursive definition is well-defined',
            'Prove identities for recursively defined sequences',
            'Use structural induction on a recursively defined set',
          ],
          concepts: [
            'Recursive definition',
            'Well-definedness of a recursion',
            'Fibonacci numbers',
            'Recursively defined sets',
            'Structural induction',
            'Closed form',
          ],
          explanation: `A **recursive definition** gives a starting value and a rule for producing the next from earlier ones. Sums are really recursive: $\\sum_{i=1}^1a_i=a_1$ and $\\sum_{i=1}^{n+1}a_i=\\left(\\sum_{i=1}^na_i\\right)+a_{n+1}$. So are powers and factorials: $0!=1$ and $(n+1)!=(n+1)\\cdot n!$. The ellipsis "$\\dots$" in a formula is often a recursion in disguise. Induction is the matching proof method, as both go up one step at a time.

The Fibonacci numbers are $F_1=F_2=1$ and $F_{n+2}=F_{n+1}+F_n$.

**Worked example.** For $n\\ge1$, $\\ F_1+F_2+\\dots+F_n=F_{n+2}-1$.

*Scratch.* Try $n=4$: $1+1+2+3=7$ and $F_6-1=8-1=7$. Good. In the step, the new sum equals the old sum plus $F_{k+1}$, and the Fibonacci rule should then combine terms.

*Proof.* We induct on $n$. For $n=1$: $F_1=1=F_3-1$, as $F_3=2$. Let $k\\ge1$ and assume $\\sum_{i=1}^kF_i=F_{k+2}-1$. Then
$$\\sum_{i=1}^{k+1}F_i=(F_{k+2}-1)+F_{k+1}=(F_{k+2}+F_{k+1})-1=F_{k+3}-1.$$
The last step is the recursive rule. So the claim holds for $k+1$. $\\square$

**Recursive sets and structural induction.** Define $S\\subseteq\\mathbb{Z}$ as follows: $3\\in S$; if $x,y\\in S$, then $x+y\\in S$; and nothing else is in $S$. Claim: each element of $S$ is divisible by 3. Check the base element, 3. Then assume $3\\mid x$ and $3\\mid y$ and deduce $3\\mid(x+y)$. Each element of $S$ is built in finitely many steps, so the property reaches all of them. The clause "nothing else" is what makes this valid.

**A bad definition.** "$a_0=1$ and $a_n=a_{n-2}+1$ for $n\\ge 1$." This fails: $a_1$ needs $a_{-1}$, which is undefined, and all the odd terms depend on it. Similarly, "$a_n=a_{n+1}/2$" defines nothing, because it never reaches a base value. A recursion is well-defined only if each term reaches the base cases in finitely many steps, using exactly one rule each time. Also, do not confuse a recursion with a closed form. Having a pattern from data is a conjecture until you prove it by induction.`,
          resources: [
            { ...infiniteDescent, primary: true, note: 'Its material on recursive definitions and induction, including the formal definition of sums and products.' },
            { ...mitMathForCs, note: 'The lectures on recursive data types and structural induction.' },
          ],
          exercises: [
            {
              slug: 'fibonacci-identities',
              title: 'Fibonacci identities',
              prompt: `Prove the following facts about Fibonacci numbers, for all $n\\ge1$ unless stated otherwise: (a) $\\sum_{i=1}^nF_i^2=F_nF_{n+1}$. (b) $\\sum_{i=1}^nF_{2i-1}=F_{2n}$. (c) $\\gcd(F_n,F_{n+1})=1$. (d) $F_{n+1}F_{n-1}-F_n^2=(-1)^n$ for $n\\ge2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'hanoi-and-binet',
              title: 'From recursion to closed form',
              prompt: `(a) Let $T_0=0$ and $T_{n+1}=2T_n+1$. Conjecture and prove a closed form. (b) Prove Binet's formula $F_n=\\frac{\\varphi^n-\\psi^n}{\\sqrt5}$, with $\\varphi=\\frac{1+\\sqrt5}{2}$ and $\\psi=\\frac{1-\\sqrt5}{2}$, by strong induction. Explain why you need two base cases, and what equation $\\varphi$ and $\\psi$ satisfy that makes the step work.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'balanced-parentheses',
              title: 'Structural induction',
              prompt: `Define a set $B$ of strings of parentheses: the empty string is in $B$; if $u,v\\in B$, then $(u)v\\in B$; nothing else is in $B$. Prove by structural induction: (a) each string in $B$ has equally many left and right parentheses. (b) In every prefix of a string in $B$, the number of left parentheses is at least the number of right ones. Then decide whether $())($ is in $B$, and justify your answer.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Is $a_1=1,\\ a_n=a_{\\lceil n/2\\rceil}+1$ for $n\\ge2$ well-defined? Why?',
              answerOutline: `Yes. For $n\\ge2$, $\\lceil n/2\\rceil<n$, so each term depends on a strictly earlier one and reaches $a_1$. You should check that the index really decreases at the smallest case, $n=2$, where $\\lceil 2/2\\rceil=1$.`,
            },
            {
              question: 'Why does the set definition need the clause "nothing else is in $S$"?',
              answerOutline: `Without it, $S$ might contain other elements, such as 7. Then "each element is built from 3 by addition" is unjustified, and structural induction has no footing. The clause says that $S$ is the smallest set closed under the rules.`,
            },
            {
              question: 'What is the relationship between a recursive definition and an inductive proof?',
              answerOutline: `They have the same shape: base value to base case, recursive rule to inductive step. In the step, you apply the definition once to expose the earlier term, then use the hypothesis on that term.`,
            },
          ],
        },
      ],
      project: {
        slug: 'conjecture-and-prove',
        title: 'Conjecture, test, prove',
        description: `Practise the whole cycle on sequences of your own. Use a short program to generate data, form conjectures, and test them on many cases. Then prove what survives and explain what failed. Pick at least two of: sums of powers, Lucas numbers, Tribonacci numbers, or a recurrence you invent.`,
        deliverables: [
          'A program printing at least 30 terms of each sequence and testing each conjecture for at least 1000 values of $n$',
          'At least six conjectures, including at least two that turned out false, with counterexamples',
          'Written induction proofs for the surviving conjectures: at least one weak, one strong and one strengthened',
          'A note on which proof needed the most base cases, and why',
        ],
        estimatedHours: 10,
        stretchGoals: ['Find a closed form by the characteristic-root method and prove it'],
      },
    },
    {
      slug: 'sets-functions-relations',
      title: 'Sets, Functions and Relations',
      description:
        'Element-chasing proofs for sets, images and preimages, injections and surjections, and the equivalence relations and orders that organise later mathematics.',
      lessons: [
        {
          slug: 'sets-and-set-proofs',
          title: 'Sets and element-chasing proofs',
          summary:
            'How to prove that one set is contained in another or that two sets are equal, including infinite unions and intersections.',
          estimatedMinutes: 130,
          objectives: [
            'Prove subset and equality statements by element chasing',
            'Distinguish membership from inclusion',
            'Compute and prove infinite unions and intersections',
            'Disprove a set identity with a small counterexample',
          ],
          concepts: [
            'Subset and proper subset',
            'Double inclusion',
            'Union, intersection, difference, complement',
            'Cartesian product',
            'Power set',
            'Indexed families',
            'Membership versus inclusion',
          ],
          explanation: `Sets are compared by their elements. To prove $A\\subseteq B$, write "Let $x\\in A$" and deduce $x\\in B$. To prove $A=B$, prove both $A\\subseteq B$ and $B\\subseteq A$; this is **double inclusion**. Translate each set operation into logic: $x\\in A\\cup B$ means $x\\in A$ *or* $x\\in B$, $x\\in A\\cap B$ means *and*, and $x\\in A\\setminus B$ means $x\\in A$ and $x\\notin B$.

**Worked example.** Theorem: $A\\setminus(B\\cup C)=(A\\setminus B)\\cap(A\\setminus C)$.

*Proof.* ($\\subseteq$) Let $x\\in A\\setminus(B\\cup C)$. Then $x\\in A$ and $x\\notin B\\cup C$. So $x\\notin B$ and $x\\notin C$. Since $x\\in A$ and $x\\notin B$, we get $x\\in A\\setminus B$, and likewise $x\\in A\\setminus C$. Thus $x$ lies in the intersection.

($\\supseteq$) Let $x\\in(A\\setminus B)\\cap(A\\setminus C)$. Then $x\\in A$, $x\\notin B$ and $x\\notin C$. As $x$ lies in neither $B$ nor $C$, we have $x\\notin B\\cup C$, so $x\\in A\\setminus(B\\cup C)$. $\\square$

Each direction is De Morgan's law in disguise. Most set proofs are logic with a new notation.

**Infinite families.** $\\bigcup_{n\\in I}A_n$ collects all $x$ lying in *some* $A_n$, and $\\bigcap_{n\\in I}A_n$ collects those in *every* $A_n$. The quantifiers carry over directly. For example, $\\bigcup_{n\\ge1}[\\frac1n,1]=(0,1]$. Each $[\\frac1n,1]$ lies in $(0,1]$. Conversely, if $x\\in(0,1]$, pick an integer $n\\ge\\frac1x$, and then $x\\in[\\frac1n,1]$. Notice that 0 is not in the union, although the left ends tend to 0. Limits of sets need the same care as limits of numbers.

**Bad proofs.**

- *A Venn diagram.* It is a good way to guess, but it shows one arrangement and does not deal with general sets. It may help you find the proof, but it is not the proof.
- *Half a union.* "Let $x\\in A\\cup B$. Then $x\\in A$, so ..." You do not know which one holds, so you need cases.
- *Confusing $\\in$ with $\\subseteq$.* $1\\in\\{1,2\\}$, while $\\{1\\}\\subseteq\\{1,2\\}$. Also $\\varnothing\\subseteq A$ for every $A$, but $\\varnothing\\in A$ only if the empty set is listed as an element. For the power set, $X\\in\\mathcal{P}(A)$ means $X\\subseteq A$.

For a set identity, try small examples first. A false identity usually fails on sets with one or two elements.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapters on sets and on proofs involving sets.' },
            { ...infiniteDescent, note: 'Its chapter on sets introduces indexed families carefully.' },
          ],
          relatedLessons: ['discrete-mathematics/sets-functions-relations/sets-and-set-operations'],
          exercises: [
            {
              slug: 'double-inclusion-practice',
              title: 'Double inclusion',
              prompt: `Prove for all sets: (a) $A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C)$. (b) $A\\subseteq B$ if and only if $A\\cap B=A$. (c) $A\\times(B\\cap C)=(A\\times B)\\cap(A\\times C)$. (d) $A\\setminus(A\\setminus B)=A\\cap B$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'prove-or-disprove-sets',
              title: 'Prove or find a small counterexample',
              prompt: `For all sets, prove or disprove. (a) If $A\\cup B=A\\cup C$, then $B=C$. (b) If $A\\cup B=A\\cup C$ and $A\\cap B=A\\cap C$, then $B=C$. (c) $\\mathcal{P}(A\\cap B)=\\mathcal{P}(A)\\cap\\mathcal{P}(B)$. (d) $\\mathcal{P}(A\\cup B)=\\mathcal{P}(A)\\cup\\mathcal{P}(B)$. (e) $(A\\times B)\\cup(C\\times D)=(A\\cup C)\\times(B\\cup D)$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'infinite-families',
              title: 'Infinite unions and intersections',
              prompt: `Find each set and prove your answer by double inclusion. (a) $\\bigcup_{n\\ge1}[0,1-\\frac1n]$. (b) $\\bigcap_{n\\ge1}[0,1+\\frac1n)$. (c) $\\bigcap_{n\\ge1}(0,\\frac1n)$. (d) $\\bigcup_{n\\ge1}(\\frac1n,2-\\frac1n)$. You may use that for each real $x>0$ there is a positive integer $n$ with $\\frac1n<x$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), any $x$ in the intersection would need $0<x<\\frac1n$ for every $n$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $A\\subseteq B$ proved with "Let $x\\in A$" and not by naming an element of $A$?',
              answerOutline: `It is a universal statement: $\\forall x,\\ x\\in A\\Rightarrow x\\in B$. So $x$ must be arbitrary. If you checked one element, that is proof by example. If $A$ is empty, nothing is needed, and the proof still reads correctly.`,
            },
            {
              question: 'Is $\\varnothing\\in\\{\\varnothing\\}$? Is $\\varnothing\\subseteq\\{\\varnothing\\}$? Is $\\{\\varnothing\\}\\subseteq\\varnothing$?',
              answerOutline: `Yes, since it is listed as an element. Yes, since the empty set is a subset of every set. No: $\\{\\varnothing\\}$ has an element, and the empty set has none. If you mixed these up, go back to the definitions of $\\in$ and $\\subseteq$ every time.`,
            },
            {
              question: 'In the proof that $\\bigcup[\\frac1n,1]=(0,1]$, what would go wrong if you claimed $0$ was included?',
              answerOutline: `$0$ would have to lie in some $[\\frac1n,1]$, but $\\frac1n>0$ for every $n$. The union only requires a single $n$, and none exists. Reaching a boundary "in the limit" is not the same as being in a set.`,
            },
          ],
        },
        {
          slug: 'functions-images-and-preimages',
          title: 'Functions, images and preimages',
          summary:
            'What a function is, how images and preimages interact with set operations, and the most tempting mistake in the subject.',
          estimatedMinutes: 120,
          objectives: [
            'State the definition of a function, including its domain and codomain',
            'Compute images and preimages',
            'Prove inclusions involving images and preimages',
            'Give examples showing when an inclusion is strict',
          ],
          concepts: [
            'Domain and codomain',
            'Well-defined function',
            'Image of a set',
            'Preimage of a set',
            'Preimage does not need an inverse',
            'Composition',
          ],
          explanation: `A **function** $f:A\\to B$ assigns to each $a\\in A$ exactly one element of $B$. The domain and codomain are part of the data, so $x\\mapsto x^2$ on $\\mathbb{R}$ and on $[0,\\infty)$ are different functions. For $X\\subseteq A$ and $Y\\subseteq B$, define the

- **image** $f(X)=\\{f(x):x\\in X\\}$, so $y\\in f(X)$ means $\\exists x\\in X,\\ f(x)=y$;
- **preimage** $f^{-1}(Y)=\\{a\\in A:f(a)\\in Y\\}$, so $a\\in f^{-1}(Y)$ means $f(a)\\in Y$.

The preimage exists for every function. The notation does not mean that $f$ has an inverse. For $f(x)=x^2$ on $\\mathbb{R}$: $f([-1,2])=[0,4]$, $\\ f^{-1}([1,4])=[-2,-1]\\cup[1,2]$ and $f^{-1}(\\{-1\\})=\\varnothing$.

**Preimages are well behaved:** $f^{-1}(Y_1\\cap Y_2)=f^{-1}(Y_1)\\cap f^{-1}(Y_2)$, and the same holds for unions and complements. Images are less so.

**Worked example.** Theorem: $f(X_1\\cap X_2)\\subseteq f(X_1)\\cap f(X_2)$, and the inclusion can be strict.

*Scratch.* Unpack: an element of the left side is $f(x)$ with $x$ in both sets. An element of the right side must be an image of something in $X_1$ and an image of something in $X_2$. The same $x$ will do both jobs.

*Proof.* Let $y\\in f(X_1\\cap X_2)$. Then $y=f(x)$ for some $x\\in X_1\\cap X_2$. Since $x\\in X_1$, $y\\in f(X_1)$. Since $x\\in X_2$, $y\\in f(X_2)$. So $y\\in f(X_1)\\cap f(X_2)$. $\\square$

*Strictness.* Take $f(x)=x^2$, $X_1=\\{-1\\}$, $X_2=\\{1\\}$. Then $X_1\\cap X_2=\\varnothing$, so the left side is empty, but the right side is $\\{1\\}$.

**A bad proof of the reverse inclusion.** "Let $y\\in f(X_1)\\cap f(X_2)$. Then $y=f(x)$ with $x\\in X_1$ and $x\\in X_2$, so $y\\in f(X_1\\cap X_2)$." The letter $x$ is doing two jobs. All we know is that $y=f(x_1)$ with $x_1\\in X_1$, and $y=f(x_2)$ with $x_2\\in X_2$. Nothing says $x_1=x_2$. This is the reused-letter failure again, and the example above shows the claim is false. Give each "there exists" its own new letter, and the error cannot happen. If $f$ is injective, then $x_1=x_2$, and the reverse inclusion does hold.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on functions, including images and preimages at its end.' },
            { ...infiniteDescent, note: 'Its chapter on functions treats images and preimages with worked proofs.' },
          ],
          relatedLessons: ['discrete-mathematics/sets-functions-relations/functions'],
          exercises: [
            {
              slug: 'compute-images',
              title: 'Compute images and preimages',
              prompt: `For $f(x)=x^2$ on $\\mathbb{R}$, find $f((-1,3))$, $f^{-1}((1,9))$ and $f^{-1}((-\\infty,0])$. For $g(x)=\\sin x$ on $\\mathbb{R}$, find $g([0,\\pi])$ and $g^{-1}(\\{0\\})$. For $h:\\mathbb{Z}\\to\\mathbb{Z}$, $h(n)=n^2\\bmod 5$ (taking a remainder in $\\{0,\\dots,4\\}$), find $h(\\mathbb{Z})$ and describe $h^{-1}(\\{1\\})$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'image-preimage-identities',
              title: 'Which identities hold',
              prompt: `Prove: (a) $f(X_1\\cup X_2)=f(X_1)\\cup f(X_2)$. (b) $f^{-1}(Y_1\\cup Y_2)=f^{-1}(Y_1)\\cup f^{-1}(Y_2)$. (c) $f^{-1}(B\\setminus Y)=A\\setminus f^{-1}(Y)$. Then prove that $f(A\\setminus X)$ and $B\\setminus f(X)$ need not be related by inclusion in either direction, with two small examples.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'round-trips',
              title: 'Round trips',
              prompt: `Let $f:A\\to B$. Prove: (a) $X\\subseteq f^{-1}(f(X))$, with equality for all $X$ if and only if $f$ is injective. (b) $f(f^{-1}(Y))\\subseteq Y$, with equality for all $Y$ if and only if $f$ is surjective. Use $f(x)=x^2$ on $\\mathbb{R}$ to show strictness in each case. (Injective means $f(a)=f(a')$ forces $a=a'$, and surjective means each element of $B$ is hit.)`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $x\\in f^{-1}(Y)$ mean? Do you need $f$ to be invertible?',
              answerOutline: `$f(x)\\in Y$. No invertibility is needed. If you started from "apply $f^{-1}$", you are treating a set operation as a function. In a proof, replace membership by this definition straight away.`,
            },
            {
              question: 'Why does $y\\in f(X_1)\\cap f(X_2)$ not give one $x$ in both sets?',
              answerOutline: `Each membership gives its own witness. Two "there exists" statements give two letters. Only if $f$ is injective can they be identified. Example: $x^2$ with $\\{-1\\}$ and $\\{1\\}$.`,
            },
            {
              question: 'What is $f^{-1}(\\varnothing)$, and what is $f(\\varnothing)$?',
              answerOutline: `Both are empty. For the first, no $a$ has $f(a)\\in\\varnothing$. For the second, there is no element to take the image of. These can be checked from the definitions, with no special convention.`,
            },
          ],
        },
        {
          slug: 'injections-surjections-bijections',
          title: 'Injections, surjections and bijections',
          summary:
            'The definitions as proof templates, composition, and the theorem linking bijections to inverse functions.',
          estimatedMinutes: 130,
          objectives: [
            'Prove or disprove that a function is injective or surjective',
            'Find an inverse and check it on both sides',
            'Prove how composition interacts with injectivity and surjectivity',
            'Explain why a function has a two-sided inverse exactly when it is a bijection',
          ],
          concepts: [
            'Injective',
            'Surjective',
            'Bijective',
            'Composition',
            'Inverse function',
            'Identity function',
          ],
          explanation: `Each definition is a proof template.

- $f:A\\to B$ is **injective** if $f(x)=f(y)\\Rightarrow x=y$. Template: "Let $x,y\\in A$ with $f(x)=f(y)$," and then deduce $x=y$.
- $f$ is **surjective** if $\\forall b\\in B\\ \\exists a\\in A,\\ f(a)=b$. Template: "Let $b\\in B$," then give $a$ and verify it.
- $f$ is **bijective** if it is both. This holds exactly when $f$ has an **inverse** $g:B\\to A$, with $g\\circ f=\\mathrm{id}_A$ and $f\\circ g=\\mathrm{id}_B$.

**Worked example.** Let $S=\\mathbb{R}\\setminus\\{1\\}$ and define $f:S\\to S$ by $f(x)=\\frac{x+1}{x-1}$. Show that $f$ is a bijection.

*First, is the codomain right?* We need $f(x)\\ne1$. If $\\frac{x+1}{x-1}=1$, then $x+1=x-1$, which is impossible. So $f$ does map into $S$.

*Injective.* Let $x,y\\in S$ with $f(x)=f(y)$. Cross-multiplying, $(x+1)(y-1)=(y+1)(x-1)$. Expanding, $xy-x+y-1=xy-y+x-1$, so $2y=2x$ and $x=y$.

*Surjective.* Scratch: solve $y=\\frac{x+1}{x-1}$ for $x$. This gives $x(y-1)=y+1$. Now the proof: let $y\\in S$ and put $x=\\frac{y+1}{y-1}$. By the check above, $x\\in S$. Also
$$f(x)=\\frac{\\frac{y+1}{y-1}+1}{\\frac{y+1}{y-1}-1}=\\frac{2y}{2}=y.$$
So $f$ is a bijection, and in fact $f$ is its own inverse. $\\square$

The domain work matters: the same formula on $\\mathbb{R}\\setminus\\{1\\}\\to\\mathbb{R}$ is not surjective, because 1 is missed.

**Bad proofs.**

- *Wrong direction.* "If $x=y$ then $f(x)=f(y)$, so $f$ is injective." That holds for every function. It says only that $f$ is well defined.
- *Solving without verifying.* Solving $y=f(x)$ for $x$ shows only what $x$ would have to be. You must check that it is in the domain and that it really maps to $y$. With $f(x)=x^2$ on $\\mathbb{R}$, "$x=\\sqrt y$" fails for $y<0$.
- *Graph arguments.* "It passes the horizontal line test" is fine for intuition, but a proof needs the algebra or a monotonicity argument.

To disprove injectivity, give two different inputs with equal outputs. To disprove surjectivity, give one element of the codomain and prove that nothing maps to it.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on functions covers injections, surjections, composition and inverses.' },
            { ...sundstrom, note: 'Use its chapter on functions for further examples with progress checks.' },
          ],
          exercises: [
            {
              slug: 'classify-functions',
              title: 'Classify with proof',
              prompt: `Determine whether each is injective, surjective, both or neither, and prove it. (a) $f:\\mathbb{Z}\\to\\mathbb{Z}$, $f(n)=2n+3$. (b) $g:\\mathbb{R}\\to\\mathbb{R}$, $g(x)=x^3-x$. (c) $h:\\mathbb{R}\\to[0,\\infty)$, $h(x)=x^2$. (d) $k:\\mathbb{Z}\\times\\mathbb{Z}\\to\\mathbb{Z}$, $k(m,n)=m+n$. (e) $p:\\mathbb{R}\\to(0,\\infty)$, $p(x)=e^x$. (f) $q:\\mathbb{N}\\to\\mathbb{N}$, $q(n)=n+1$, with $\\mathbb{N}=\\{1,2,\\dots\\}$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'composition-theorems',
              title: 'Composition',
              prompt: `Let $f:A\\to B$ and $g:B\\to C$. Prove: (a) if $f,g$ are injective, then so is $g\\circ f$. (b) If $f,g$ are surjective, then so is $g\\circ f$. (c) If $g\\circ f$ is injective, then $f$ is injective. (d) If $g\\circ f$ is surjective, then $g$ is surjective. (e) Give an example where $g\\circ f$ is bijective, but $f$ is not surjective and $g$ is not injective.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'inverse-theorem',
              title: 'Bijections are exactly the invertible functions',
              prompt: `Prove that $f:A\\to B$ has a two-sided inverse if and only if it is a bijection, and that the inverse is unique. Then, for finite sets with $|A|=|B|$, prove that $f$ is injective if and only if it is surjective, and give an infinite example showing that this fails.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'A student proves $f$ injective by writing "suppose $x\\ne y$; then clearly $f(x)\\ne f(y)$". What is your feedback?',
              answerOutline: `The form is right, as this is the contrapositive. But "clearly" hides the whole content. Say why. Usually the equivalent form "$f(x)=f(y)$ implies $x=y$" is easier, since it gives you an equation to work with.`,
            },
            {
              question: 'How do you show $f:\\mathbb{R}\\to\\mathbb{R}$, $f(x)=x^2+1$, is not surjective?',
              answerOutline: `Name a value, such as 0, and prove that no $x$ works: $x^2+1\\ge1>0$ for all $x$. Saying "the graph does not reach 0" is the idea but not the argument. The inequality is what makes it a proof.`,
            },
            {
              question: 'Why check both $g\\circ f=\\mathrm{id}$ and $f\\circ g=\\mathrm{id}$?',
              answerOutline: `One side alone does not give a bijection when the sets are infinite. With $f(n)=n+1$ and $g(n)=\\max(n-1,1)$ on $\\mathbb{N}$, $g\\circ f=\\mathrm{id}$, yet $f$ is not surjective. So $g$ is only a left inverse.`,
            },
          ],
        },
        {
          slug: 'equivalence-relations-and-orders',
          title: 'Equivalence relations and orders',
          summary:
            'Relations that behave like equality and partition a set, and relations that behave like less-than-or-equal.',
          estimatedMinutes: 140,
          objectives: [
            'Prove that a relation is an equivalence relation and describe its classes',
            'Prove that equivalence classes partition a set',
            'Define partial orders and distinguish maximal from greatest',
            'Find bounds in a partial order',
          ],
          concepts: [
            'Reflexive, symmetric, transitive',
            'Equivalence class',
            'Partition',
            'Antisymmetric',
            'Partial and total order',
            'Maximal and greatest',
            'Upper bound and least upper bound',
          ],
          explanation: `A relation $\\sim$ on $X$ is an **equivalence relation** if it is reflexive ($x\\sim x$), symmetric ($x\\sim y\\Rightarrow y\\sim x$) and transitive ($x\\sim y$ and $y\\sim z$ imply $x\\sim z$). It captures "the same in the respect I care about". The **class** of $x$ is $[x]=\\{y:y\\sim x\\}$.

**Worked example.** On $\\mathbb{R}$, let $x\\sim y$ if $x-y\\in\\mathbb{Z}$.

*Equivalence relation.* $x-x=0\\in\\mathbb{Z}$. If $x-y\\in\\mathbb{Z}$, then $y-x=-(x-y)\\in\\mathbb{Z}$. If $x-y$ and $y-z$ are integers, so is their sum $x-z$.

*Classes.* $[x]=\\{x+n:n\\in\\mathbb{Z}\\}$. Each class has exactly one element in $[0,1)$, so the classes correspond to points of $[0,1)$.

*Theorem.* Two classes are either equal or disjoint.

*Proof.* Suppose $[x]\\cap[y]\\ne\\varnothing$, and pick $z$ in both. So $z\\sim x$ and $z\\sim y$. Let $w\\in[x]$. Then $w\\sim x$, and $x\\sim z$ by symmetry, and $z\\sim y$. By transitivity, $w\\sim y$, so $[x]\\subseteq[y]$. Swapping names gives equality. $\\square$

This holds for any equivalence relation. Thus the classes **partition** $X$, and conversely each partition defines an equivalence relation.

**A bad proof.** "Reflexivity follows from symmetry and transitivity: if $x\\sim y$, then $y\\sim x$, so $x\\sim x$." This assumes that $x$ is related to something. On $X=\\{1,2\\}$, the relation $\\{(1,1)\\}$ is symmetric and transitive, but it fails $2\\sim2$. Always check whether a step needs an element that might not exist.

**Orders.** A **partial order** $\\preceq$ is reflexive, *antisymmetric* ($x\\preceq y$ and $y\\preceq x$ imply $x=y$) and transitive. It is **total** if any two elements are comparable. Divisibility on the positive integers is partial but not total: $2\\nmid3$ and $3\\nmid2$. On $\\mathbb{Z}$ it is not antisymmetric, as $1\\mid-1$ and $-1\\mid1$.

An element is *maximal* if nothing is strictly above it, and *greatest* if everything is below it. Take $S=\\{2,3,4,6,9,12\\}$ under divisibility. The maximal elements are 9 and 12, and there is no greatest element, because $9\\nmid12$. An **upper bound** of $T\\subseteq S$ lies above every element of $T$, and it need not be in $T$. A **least upper bound** is an upper bound below all the others. This idea, on the real line, is the heart of the last module.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on relations covers equivalence relations and partitions.' },
            { ...infiniteDescent, note: 'See its material on relations, equivalence and orders.' },
          ],
          relatedLessons: ['discrete-mathematics/sets-functions-relations/relations-equivalence-and-order'],
          exercises: [
            {
              slug: 'check-the-axioms',
              title: 'Check the properties',
              prompt: `For each relation, decide which of reflexive, symmetric, transitive and antisymmetric hold, with a proof or counterexample for each. (a) On $\\mathbb{R}$: $x\\sim y$ if $|x-y|\\le1$. (b) On $\\mathbb{Z}$: $a\\sim b$ if $a+b$ is even. (c) On $\\mathbb{R}^2$: $(a,b)\\sim(c,d)$ if $a^2+b^2=c^2+d^2$. (d) On the positive integers: $a\\sim b$ if $a\\mid b$. Describe the classes for those that are equivalence relations.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'partition-bijection',
              title: 'Partitions and equivalence relations',
              prompt: `Let $\\mathcal{P}$ be a partition of $X$. Define $x\\sim y$ if $x$ and $y$ lie in the same block. Prove that $\\sim$ is an equivalence relation whose classes are exactly the blocks. Then let $f:X\\to Y$ be any function, and prove that $x\\sim y$ if $f(x)=f(y)$ defines an equivalence relation. Describe its classes in terms of preimages.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'divisibility-lattice',
              title: 'Bounds under divisibility',
              prompt: `On the positive integers ordered by divisibility: (a) find all upper bounds and the least upper bound of $\\{4,6\\}$. (b) Find the greatest lower bound of $\\{12,18\\}$. (c) In $\\{2,3,4,5,6,10,12\\}$, list the minimal and maximal elements, and say whether least and greatest elements exist. (d) Prove that a greatest element, when one exists, is unique, and that it is then the only maximal element.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is the empty relation on a non-empty set an equivalence relation?',
              answerOutline: `No. It is symmetric and transitive, both vacuously, but $x\\sim x$ fails. On the empty set it is an equivalence relation. Noticing that the answer depends on whether the set is empty is what makes this a full answer.`,
            },
            {
              question: 'How do "maximal" and "greatest" differ?',
              answerOutline: `Greatest is above everything. Maximal has nothing above it. In a total order they agree. In a partial order, there can be several maximal elements and no greatest, as there are in $\\{2,3,4,6,9,12\\}$.`,
            },
            {
              question: 'A student says that symmetry fails for $\\le$ on $\\mathbb{R}$ since $1\\le2$ and $2\\not\\le1$, so $\\le$ is not antisymmetric. Evaluate this.',
              answerOutline: `The first part is right: $\\le$ is not symmetric. The conclusion does not follow. Antisymmetric is not the negation of symmetric. $\\le$ is antisymmetric: $x\\le y$ and $y\\le x$ force $x=y$. Equality on any set is both symmetric and antisymmetric.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'number-systems',
      title: 'Number Systems',
      description:
        'Divisibility and primes, modular arithmetic and congruence equations, a first look at groups, the construction of the rationals, and irrationality.',
      lessons: [
        {
          slug: 'divisibility-gcd-and-primes',
          title: 'Divisibility, the gcd and primes',
          summary:
            'The Euclidean algorithm, Bezout\'s identity and Euclid\'s lemma, which together give unique factorisation.',
          estimatedMinutes: 130,
          objectives: [
            'Run the Euclidean algorithm and back-substitute to get Bezout coefficients',
            'Prove that the gcd is the least positive integer combination',
            'Prove Euclid\'s lemma from Bezout\'s identity',
            'Explain what the uniqueness in the fundamental theorem of arithmetic rests on',
          ],
          concepts: [
            'Greatest common divisor',
            'Euclidean algorithm',
            'Bezout\'s identity',
            'Coprime integers',
            'Euclid\'s lemma',
            'Fundamental theorem of arithmetic',
          ],
          explanation: `The **gcd** of integers $a,b$, not both zero, is the largest integer dividing both. The **Euclidean algorithm** computes it using one fact: if $a=bq+r$, then $\\gcd(a,b)=\\gcd(b,r)$, because the common divisors of the two pairs are the same.

**Worked example.** Find $\\gcd(252,198)$ and integers $x,y$ with $252x+198y=\\gcd(252,198)$.
$$252=1\\cdot198+54,\\quad198=3\\cdot54+36,\\quad54=1\\cdot36+18,\\quad36=2\\cdot18.$$
The last non-zero remainder is 18, so the gcd is 18. Now substitute backward:
$$18=54-36=54-(198-3\\cdot54)=4\\cdot54-198=4(252-198)-198=4\\cdot252-5\\cdot198.$$
Check: $1008-990=18$.

**Bezout's identity.** For $a,b$ not both zero, $\\gcd(a,b)=ax+by$ for some integers $x,y$. In fact, it is the least positive element of $S=\\{ax+by\\}$. Let $d$ be that least element, which exists by well-ordering. Dividing $a$ by $d$ gives a remainder that lies in $S$ and is less than $d$, so it must be 0. Thus $d\\mid a$, and likewise $d\\mid b$. Any common divisor of $a,b$ divides $ax+by=d$, so $d$ is the greatest.

**Euclid's lemma.** If $p$ is prime and $p\\mid ab$, then $p\\mid a$ or $p\\mid b$.

*Proof.* Suppose $p\\nmid a$. The only positive divisors of $p$ are 1 and $p$, so $\\gcd(p,a)=1$. By Bezout, $1=px+ay$. Multiply by $b$: $b=pxb+(ab)y$. Since $p$ divides both terms, $p\\mid b$. $\\square$

This lemma is exactly what gives uniqueness in the **fundamental theorem of arithmetic**. If $p_1\\cdots p_r=q_1\\cdots q_s$, then $p_1$ divides some $q_j$, so it equals $q_j$. Cancel it and continue. You already proved the existence of a factorisation with strong induction.

**A bad proof.** "Euclid's lemma is clear: the prime factors of $ab$ are those of $a$ together with those of $b$, so $p$ must be among them." This uses unique factorisation, which is proved from Euclid's lemma. The argument is circular. Whether a proof is valid depends on what is allowed to be assumed at that point. In the ring of numbers $a+b\\sqrt{-5}$, factorisation is not unique: $6=2\\cdot3=(1+\\sqrt{-5})(1-\\sqrt{-5})$. So uniqueness is a real theorem, not an obvious fact.`,
          resources: [
            { ...steinNumberTheory, primary: true, note: 'The opening chapter on prime numbers proves the fundamental theorem of arithmetic with this approach.' },
            {
              title: 'Divisibility and Greatest Common Divisors (Conrad)',
              url: 'https://kconrad.math.uconn.edu/blurbs/ugradnumthy/divgcd.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Keith Conrad, University of Connecticut',
              note: 'A clear expository note on the same material.',
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/divisibility-and-the-euclidean-algorithm'],
          exercises: [
            {
              slug: 'euclid-computations',
              title: 'Euclidean algorithm',
              prompt: `For each pair, find the gcd and integers $x,y$ with $ax+by=\\gcd(a,b)$, and check them: (a) $(1071,462)$. (b) $(89,55)$. (c) $(1001,429)$. How many division steps does (b) need? What is special about these two numbers?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gcd-proofs',
              title: 'Proofs from Bezout',
              prompt: `Prove for integers: (a) if $a\\mid bc$ and $\\gcd(a,b)=1$, then $a\\mid c$. (b) If $\\gcd(a,b)=1$, $a\\mid c$ and $b\\mid c$, then $ab\\mid c$. (c) If $d=\\gcd(a,b)$, then $\\gcd(a/d,b/d)=1$. (d) $\\gcd(n,n+1)=1$ and $\\gcd(2n+1,3n+1)=1$ for every integer $n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'infinitely-many-primes',
              title: 'Infinitely many primes, and a variant',
              prompt: `(a) Prove that there are infinitely many primes. (b) Prove that there are infinitely many primes of the form $4k+3$, by supposing there are finitely many, $p_1,\\dots,p_m$, and considering $N=4p_1\\cdots p_m-1$. (c) Explain why the same idea does not obviously work for primes of the form $4k+1$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), a product of numbers of the form $4k+1$ has that form too, and $N$ is odd.',
            },
          ],
          selfAssessment: [
            {
              question: 'Does $\\gcd(a,b)=ax+by$ have only one solution $(x,y)$?',
              answerOutline: `No. If $(x,y)$ works, so does $(x+tb/d,\\ y-ta/d)$ for each integer $t$, where $d$ is the gcd. So asserting that a pair is "the" Bezout pair is an error. And $ax+by=c$ does not make $c$ the gcd. It only shows that the gcd divides $c$.`,
            },
            {
              question: 'Where does the proof of Euclid\'s lemma use that $p$ is prime? Is primality needed?',
              answerOutline: `It uses it to get $\\gcd(p,a)=1$ from $p\\nmid a$. It is needed: $6\\mid3\\cdot4$, while $6\\nmid3$ and $6\\nmid4$. A full answer points to the line and gives a counterexample.`,
            },
            {
              question: 'Why is "unique factorisation implies Euclid\'s lemma, which implies unique factorisation" a problem?',
              answerOutline: `It is circular if neither has been proved independently. The route here is well-ordering to Bezout, then Euclid's lemma, then uniqueness. Each step uses only earlier ones. Knowing what comes before what is part of knowing a proof.`,
            },
          ],
        },
        {
          slug: 'modular-arithmetic-and-congruences',
          title: 'Modular arithmetic and solving congruences',
          summary:
            'Why arithmetic mod $n$ is well defined, when division is allowed, and how to find all solutions of a linear congruence.',
          estimatedMinutes: 130,
          objectives: [
            'Prove that addition and multiplication respect congruence',
            'Decide when an element has a multiplicative inverse mod $n$',
            'Solve a linear congruence and prove the answer is complete',
            'Explain when cancellation is valid',
          ],
          concepts: [
            'Congruence mod $n$',
            'Residue classes',
            'Well-defined operations',
            'Multiplicative inverse',
            'Zero divisors',
            'Linear congruence',
            'Fast exponent patterns',
          ],
          explanation: `We write $a\\equiv b\\pmod n$ when $n\\mid(a-b)$. This is an equivalence relation, whose classes are the **residues** mod $n$, written $\\mathbb{Z}_n$. Addition and multiplication are well defined on classes: if $a\\equiv a'$ and $b\\equiv b'$, then $a+b\\equiv a'+b'$ and $ab\\equiv a'b'$. For the product, $ab-a'b'=a(b-b')+b'(a-a')$, and both terms are multiples of $n$.

So you may reduce at any stage. To find the last digit of $7^{100}$: mod 10, $7^2\\equiv-1$, so $7^4\\equiv1$, and $7^{100}=(7^4)^{25}\\equiv1$. The last digit is 1.

**Inverses and cancellation.** An inverse of $a$ mod $n$ is a $b$ with $ab\\equiv1$. It exists exactly when $\\gcd(a,n)=1$, because $ab+ny=1$ is Bezout's identity. In that case you may cancel $a$. Otherwise you may not: $6\\cdot1\\equiv6\\cdot6\\pmod{10}$, but $1\\not\\equiv6$.

**Worked example.** Solve $6x\\equiv4\\pmod{10}$. Solving is a two-way proof, as usual.

*Reduction.* $6x\\equiv 4\\pmod{10}$ means $6x-4=10y$ for some integer $y$. Dividing by 2, this is $3x-2=5y$, that is, $3x\\equiv2\\pmod5$. This step is reversible, since it is multiplying or dividing an equation of integers by 2.

*Using an inverse.* Mod 5, $\\gcd(3,5)=1$, and $2\\cdot3\\equiv1$, so 2 is the inverse of 3. Multiplying, $x\\equiv2\\cdot2\\equiv4\\pmod5$. Multiplying by an invertible element is reversible too.

*Conclusion.* The solutions are exactly $x\\equiv4\\pmod5$, that is, $x\\equiv4$ or $9\\pmod{10}$. Check: $6\\cdot4=24\\equiv4$ and $6\\cdot9=54\\equiv4$.

In general, with $d=\\gcd(a,n)$, the congruence $ax\\equiv b\\pmod n$ has a solution exactly when $d\\mid b$, and then it has exactly $d$ solutions mod $n$.

**A bad proof.** "$6x\\equiv4\\pmod{10}$. Divide by 2: $3x\\equiv2\\pmod{10}$, so $x\\equiv4$." Dividing the coefficients without dividing the modulus is not valid. $3x\\equiv2\\pmod{10}$ has only one solution, $x\\equiv4$, so the solution $x\\equiv9$ was lost. You can see it in the check: $3\\cdot9=27\\not\\equiv2\\pmod{10}$, though $6\\cdot9\\equiv4$. The rule: from $ca\\equiv cb\\pmod n$ you get $a\\equiv b\\pmod{n/\\gcd(c,n)}$.`,
          resources: [
            { ...steinNumberTheory, primary: true, note: 'The chapter on the ring of integers modulo $n$.' },
            { ...bookOfProof, note: 'Congruence appears through the proof chapters and in the chapter on relations.' },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/modular-arithmetic-and-inverses'],
          exercises: [
            {
              slug: 'congruence-computations',
              title: 'Solve these',
              prompt: `Find all solutions, or prove that there are none. (a) $5x\\equiv3\\pmod{17}$. (b) $6x\\equiv9\\pmod{15}$. (c) $4x\\equiv2\\pmod{10}$. (d) $4x\\equiv3\\pmod{10}$. (e) $x^2\\equiv1\\pmod8$. (f) $x^2\\equiv-1\\pmod7$. Also find the last two digits of $3^{400}$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'linear-congruence-theorem',
              title: 'The linear congruence theorem',
              prompt: `Let $d=\\gcd(a,n)$. Prove that $ax\\equiv b\\pmod n$ has a solution if and only if $d\\mid b$, and that, when it does, it has exactly $d$ incongruent solutions mod $n$. Write it as a two-direction proof, and identify which part uses Bezout.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'squares-mod-small',
              title: 'Using residues to prove impossibility',
              prompt: `Prove: (a) no integer of the form $4k+3$ is a sum of two squares. (b) no integer of the form $8k+7$ is a sum of three squares. (c) If $p>3$ is prime, then $24\\mid p^2-1$. (d) A number's remainder mod 9 equals that of its digit sum.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fermat-prime-mod',
              title: 'A quick theorem',
              prompt: `Let $p$ be prime and $0<k<p$. Prove that $p$ divides $\\binom pk$. Deduce that $(a+b)^p\\equiv a^p+b^p\\pmod p$, and then prove $a^p\\equiv a\\pmod p$ for all integers $a\\ge0$ by induction on $a$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must we prove that addition mod $n$ is well defined?',
              answerOutline: `A class has many names: $[3]=[13]$ mod 10. The rule $[a]+[b]=[a+b]$ uses names, so it must give the same class for each choice. Otherwise it would not be a function on classes. If you said "because it's obvious", try the same on exponents: $2^3$ and $2^{13}$ mod 10 differ, so exponents are not well defined mod 10.`,
            },
            {
              question: 'When does $ab\\equiv ac\\pmod n$ imply $b\\equiv c$?',
              answerOutline: `When $\\gcd(a,n)=1$. Then multiply by the inverse of $a$. Without that, it fails, as in $2\\cdot3\\equiv2\\cdot8\\pmod{10}$. A primes-only answer is too narrow: the condition is on the gcd, and it is not about $n$ being prime.`,
            },
            {
              question: 'How many solutions does $6x\\equiv4\\pmod{10}$ have mod 10? Why that number?',
              answerOutline: `Two: $x\\equiv4,9$. Here $\\gcd(6,10)=2$ and $2\\mid4$, so there are two solutions. If you found only one, then you likely divided without changing the modulus.`,
            },
          ],
        },
        {
          slug: 'first-look-at-groups',
          title: 'A first look at groups',
          summary:
            'The group axioms, with $\\mathbb{Z}_n$ and its units as first examples, and how to prove things from axioms alone.',
          estimatedMinutes: 120,
          objectives: [
            'State the group axioms and check them on examples',
            'Prove uniqueness of identities and inverses from the axioms',
            'Avoid assuming commutativity',
            'Use the group of units of $\\mathbb{Z}_n$',
          ],
          concepts: [
            'Group axioms',
            'Abelian group',
            'Identity and inverse',
            'Cancellation law',
            'Units of $\\mathbb{Z}_n$',
            'Order of an element',
            'Proof from axioms',
          ],
          explanation: `A **group** is a set $G$ with an operation such that: (1) the operation is closed and associative; (2) there is an identity $e$ with $ea=ae=a$ for all $a$; (3) each $a$ has an inverse $a^{-1}$ with $aa^{-1}=a^{-1}a=e$. If also $ab=ba$ always, $G$ is **abelian**.

Examples: $\\mathbb{Z}$ under addition, $\\mathbb{Z}_n$ under addition, the non-zero rationals under multiplication, invertible $2\\times2$ matrices under multiplication. Non-examples: $\\mathbb{N}$ under addition, which has no inverses, and $\\mathbb{Z}_{10}$ under multiplication, in which 2 has no inverse. The **units** $U(n)$, the elements of $\\mathbb{Z}_n$ coprime to $n$, do form a group under multiplication. Inverses exist by the previous lesson, and a product of units is a unit.

Why bother? A theorem proved from the axioms holds in every group at once. The new skill is using only what the axioms give you.

**Worked example.** In any group, (a) inverses are unique, and (b) $(ab)^{-1}=b^{-1}a^{-1}$.

*(a)* Suppose $b$ and $c$ are both inverses of $a$. Then
$$b=be=b(ac)=(ba)c=ec=c,$$
using in turn the identity, $ac=e$, associativity, $ba=e$ and the identity.

*(b)* By (a), it is enough to show that $b^{-1}a^{-1}$ acts as an inverse of $ab$:
$$(ab)(b^{-1}a^{-1})=a(bb^{-1})a^{-1}=aea^{-1}=aa^{-1}=e.$$
Likewise $(b^{-1}a^{-1})(ab)=e$. $\\square$

The method in (b) is a good habit: to show that $x$ is the inverse of $y$, multiply them and get $e$. Note that the order reverses, as with socks and shoes.

**A small example.** $U(8)=\\{1,3,5,7\\}$. Each element squares to 1: $3^2=9\\equiv1$, $5^2=25\\equiv1$, $7^2=49\\equiv1$. Compare $U(5)=\\{1,2,3,4\\}$, where $2$ has order 4, because powers of 2 run $2,4,3,1$. Both groups have 4 elements, but they are different in structure.

**A bad proof.** "$(ab)^2=a^2b^2$." Writing it out, $(ab)^2=abab$, and turning that into $aabb$ swaps $b$ and $a$ in the middle, which requires commutativity. In general groups this is false. If you catch yourself rearranging a product, ask which axiom allows it. Similarly, "dividing" by $a$ means multiplying by $a^{-1}$ on one specific side.`,
          resources: [
            {
              title: 'MIT 18.703 Modern Algebra',
              url: 'https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Look at the first lecture notes on groups if you want to go further than this lesson.',
              primary: true,
            },
            { ...steinNumberTheory, note: 'Use the discussion of units and Euler\'s theorem as a concrete group in action.' },
          ],
          exercises: [
            {
              slug: 'is-it-a-group',
              title: 'Is it a group?',
              prompt: `Decide, with reasons, and name a failing axiom when not. (a) $\\mathbb{Z}$ under subtraction. (b) $\\mathbb{Q}\\setminus\\{0\\}$ under multiplication. (c) $\\mathbb{R}$ under $a*b=a+b+ab$. (d) $\\mathbb{R}\\setminus\\{-1\\}$ under the same operation. (e) $U(10)$ under multiplication mod 10. Find the order of each element of $U(10)$ for (e).`,
              kind: 'problem',
              difficulty: 1,
              hint: 'For (c) and (d), note that $a*b+1=(a+1)(b+1)$.',
            },
            {
              slug: 'proofs-from-axioms',
              title: 'Proofs from axioms',
              prompt: `In a group $G$, prove: (a) the identity is unique. (b) If $ab=ac$, then $b=c$. (c) $(a^{-1})^{-1}=a$. (d) If $x^2=e$ for all $x\\in G$, then $G$ is abelian. (e) If $G$ is finite and $a\\in G$, then $a^n=e$ for some $n\\ge1$. Name the axiom used at every step of (b).`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (d), apply the hypothesis to $ab$. For (e), the powers of $a$ cannot all be different.',
            },
            {
              slug: 'euler-theorem-proof',
              title: 'Euler\'s theorem by a group argument',
              prompt: `Let $G=U(n)$ with $|G|=\\varphi(n)$, and fix $a\\in G$. (a) Prove that $x\\mapsto ax$ is a bijection $G\\to G$. (b) Multiply all elements of $G$ in two ways to prove that $a^{\\varphi(n)}\\equiv1\\pmod n$. (c) Use this to find $3^{1000}$ mod 7. (d) Where did you use that $G$ is abelian?`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\mathbb{Z}_6$ under multiplication, with the zero removed, not a group?',
              answerOutline: `It is not closed: $2\\cdot3=0$, which has been removed. Also 2, 3 and 4 have no inverses. The elements with inverses are 1 and 5, which form $U(6)$. A complete answer names at least one failing axiom and gives an explicit instance.`,
            },
            {
              question: 'You want to show that $(a^{-1}ba)^2=a^{-1}b^2a$. What do you do, and do you need commutativity?',
              answerOutline: `Write out the product: $a^{-1}ba\\,a^{-1}ba=a^{-1}b(aa^{-1})ba=a^{-1}b^2a$, using associativity and $aa^{-1}=e$. No commutativity is needed. If you moved letters past each other, redo it.`,
            },
            {
              question: 'What is the difference between proving something in $\\mathbb{Z}_7$ and proving it from the group axioms?',
              answerOutline: `A check in $\\mathbb{Z}_7$ applies only to that group, and may use special facts, such as commutativity. A proof from the axioms applies to every group. The price is that you can use nothing beyond the axioms and what you have proved from them.`,
            },
          ],
        },
        {
          slug: 'constructing-the-integers-and-rationals',
          title: 'Constructing the integers and rationals',
          summary:
            'How equivalence classes of pairs build $\\mathbb{Z}$ from $\\mathbb{N}$ and $\\mathbb{Q}$ from $\\mathbb{Z}$, and why well-definedness is the key check.',
          estimatedMinutes: 110,
          objectives: [
            'Construct $\\mathbb{Q}$ as equivalence classes of pairs of integers',
            'Prove that the operations on classes are well defined',
            'Describe the construction of $\\mathbb{Z}$ from $\\mathbb{N}$',
            'Detect a function on classes that is not well defined',
          ],
          concepts: [
            'Pairs as formal differences or fractions',
            'Equivalence classes as numbers',
            'Well-defined operation',
            'Embedding the old system in the new',
            'Field axioms',
          ],
          explanation: `You have used fractions for years, but what *is* $\\frac12$, given that $\\frac12=\\frac24$? The answer uses equivalence classes.

Let $X=\\{(a,b):a,b\\in\\mathbb{Z},\\ b\\ne0\\}$. Define $(a,b)\\sim(c,d)$ if $ad=bc$. This says $\\frac ab=\\frac cd$, but it uses no division, so it is available before we have fractions. A **rational number** is an equivalence class $[(a,b)]$, written $a/b$.

**Worked example.** We prove that $\\sim$ is transitive and that addition is well defined.

*Transitive.* Suppose $(a,b)\\sim(c,d)$ and $(c,d)\\sim(e,f)$, so $ad=bc$ and $cf=de$. Then
$$(af)d=(ad)f=(bc)f=b(cf)=b(de)=(be)d.$$
Since $d\\ne0$ and $\\mathbb{Z}$ has no zero divisors, we may cancel $d$, so $af=be$, meaning $(a,b)\\sim(e,f)$. This is where $d\\ne0$ is needed. Allow denominator 0, and every pair is related to $(0,0)$, which collapses everything.

*Addition.* Define $[(a,b)]+[(c,d)]=[(ad+bc,bd)]$. Different names for the same class must give the same answer. So suppose $(a,b)\\sim(a',b')$, that is, $ab'=a'b$. Then we must show $(ad+bc,bd)\\sim(a'd+b'c,b'd)$, which is
$$(ad+bc)b'd=(a'd+b'c)bd.$$
Expanding, the left side is $ab'd^2+bb'cd$, and the right side is $a'bd^2+bb'cd$. These agree because $ab'=a'b$. The same check works in the second slot.

From there, the field laws follow from those of $\\mathbb{Z}$, and the map $n\\mapsto n/1$ places $\\mathbb{Z}$ inside $\\mathbb{Q}$.

**The integers.** The same recipe builds $\\mathbb{Z}$ from $\\mathbb{N}$. Think of $(a,b)$ as a formal $a-b$ and define $(a,b)\\sim(c,d)$ if $a+d=b+c$. Subtraction comes from pairs just as division does.

**A bad definition.** "Define $f:\\mathbb{Q}\\to\\mathbb{Z}$ by $f(a/b)=a+b$." Since $\\frac12=\\frac24$, we would need $f$ to return both 3 and 6, so this is not a function. Whenever you define something on classes through a representative, you owe a proof that the choice does not matter. Compare with $g(a/b)=a^2/b^2$, which is well defined: if $ab'=a'b$, then $a^2b'^2=a'^2b^2$.`,
          resources: [
            { ...infiniteDescent, primary: true, note: 'Its appendix on constructing the number sets builds these systems step by step.' },
            { ...leblAnalysis, note: 'The early material describes the ordered fields that this construction produces.' },
          ],
          exercises: [
            {
              slug: 'finish-the-rationals',
              title: 'Finish the construction',
              prompt: `With the definitions in this lesson: (a) prove that $\\sim$ is reflexive and symmetric. (b) Define multiplication by $[(a,b)][(c,d)]=[(ac,bd)]$, and prove that it is well defined. (c) Show that $[(a,b)]$ has a multiplicative inverse exactly when $a\\ne0$. (d) Prove that $n\\mapsto[(n,1)]$ is injective and respects both operations.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'well-defined-or-not',
              title: 'Well defined or not',
              prompt: `Decide whether each is well defined, and prove your answer. (a) On $\\mathbb{Q}$: $f(a/b)=a/(a+b)$ when $a+b\\ne0$ (take $\\mathbb{Q}\\setminus\\{-1\\}$ as domain). (b) On $\\mathbb{Q}$: the numerator $n(a/b)=a$. (c) From $\\mathbb{Z}_6$ to $\\mathbb{Z}_3$: $[a]_6\\mapsto[a]_3$. (d) From $\\mathbb{Z}_3$ to $\\mathbb{Z}_6$: $[a]_3\\mapsto[a]_6$. (e) From $\\mathbb{Z}_3$ to $\\mathbb{Z}_6$: $[a]_3\\mapsto[2a]_6$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'integers-from-pairs',
              title: 'Build the integers',
              prompt: `On $\\mathbb{N}\\times\\mathbb{N}$, let $(a,b)\\sim(c,d)$ if $a+d=b+c$. (a) Prove that this is an equivalence relation. (b) Define addition and multiplication on classes so that they match the formal idea of $a-b$. Find the formula for the product, and prove that addition is well defined. (c) Identify which classes play the roles of $0$, $1$ and $-1$. (d) Prove that $[(a,b)]+[(b,a)]$ is the zero class.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why define $(a,b)\\sim(c,d)$ by $ad=bc$ and not by $a/b=c/d$?',
              answerOutline: `Because rationals do not exist yet. The definition must use only integers and multiplication. Using $a/b$ would be circular. If you said "they are equal anyway", you are right in hindsight, but a construction cannot rely on what it is building.`,
            },
            {
              question: 'What does a well-definedness proof look like in general?',
              answerOutline: `Assume two representatives of the same class, using the equivalence condition as hypothesis. Show that the formula yields equivalent or equal outputs. It is not enough to test one example, though one failing example is enough to show that something is not well defined.`,
            },
            {
              question: 'Where in the construction of $\\mathbb{Q}$ is $b\\ne0$ used?',
              answerOutline: `In transitivity, for cancelling a denominator. Also, to ensure the sum's denominator $bd$ is non-zero, using that $\\mathbb{Z}$ has no zero divisors. A good answer says what goes wrong otherwise: with $(0,0)$ allowed, everything is related to it.`,
            },
          ],
        },
        {
          slug: 'irrationality',
          title: 'Irrationality',
          summary:
            'The classic proofs, what makes them work, a general theorem on rational roots, and why decimal arguments do not count.',
          estimatedMinutes: 110,
          objectives: [
            'Prove $\\sqrt p$ irrational for prime $p$',
            'State where lowest terms and primality are used',
            'Use the rational root theorem',
            'Combine irrationality results, for example for $\\sqrt2+\\sqrt3$',
          ],
          concepts: [
            'Rational and irrational',
            'Lowest terms',
            'Rational root theorem',
            'Algebraic numbers',
            'Closure properties',
          ],
          explanation: `A real number is **rational** if it equals $a/b$ for integers $a,b$ with $b\\ne0$. Every rational can be written in **lowest terms**, with $\\gcd(a,b)=1$. Almost all irrationality proofs start from that.

**Worked example.** Theorem: $\\sqrt3$ is irrational, and so is $\\sqrt2+\\sqrt3$.

*Proof for $\\sqrt3$.* Suppose $\\sqrt3=a/b$ with integers $a,b$, $b>0$, and $\\gcd(a,b)=1$. Then $a^2=3b^2$, so $3\\mid a^2$. Since 3 is prime, Euclid's lemma gives $3\\mid a$. Write $a=3c$. Then $9c^2=3b^2$, so $b^2=3c^2$, and the same reasoning gives $3\\mid b$. Now 3 divides both $a$ and $b$, contradicting $\\gcd(a,b)=1$. $\\square$

*Proof for $\\sqrt2+\\sqrt3$.* Suppose $r=\\sqrt2+\\sqrt3$ is rational. Squaring, $r^2=5+2\\sqrt6$, so $\\sqrt6=\\frac{r^2-5}{2}$ is rational. But $\\sqrt6$ is irrational. Indeed, if $a^2=6b^2$ in lowest terms, then $2\\mid a$, so $a=2c$ and $2c^2=3b^2$. Then $2\\mid3b^2$, so $2\\mid b$, a contradiction. $\\square$

Note that the proof for $\\sqrt6$ has to use 2 specifically. The same lines with a perfect square, such as $\\sqrt4$, must fail, so check where: in $a^2=4b^2$, we get $2\\mid a$ and then $c^2=b^2$, where nothing forces $2\\mid b$. Testing a proof on a false variant shows you which step does the work.

**The rational root theorem** gives a general tool. If $\\frac ab$ is in lowest terms and is a root of $c_nx^n+\\dots+c_1x+c_0$, with integer coefficients, then $a\\mid c_0$ and $b\\mid c_n$. So the only possible rational roots of $x^3-2$ are $\\pm1,\\pm2$. None works, so $\\sqrt[3]{2}$ is irrational. In the same way, any root of a monic integer polynomial is either an integer or irrational.

**Closure.** Sums and products of rationals are rational. A rational plus an irrational is irrational, and a non-zero rational times an irrational is irrational. Two irrationals can give anything: $\\sqrt2\\cdot\\sqrt2=2$.

**A bad proof.** "$\\sqrt2=1.41421\\dots$ does not repeat, so it is irrational." It is true that rationals have repeating decimals. But nobody has inspected infinitely many digits, so that non-repeating claim is what needs proof. Another: "$a^2=3b^2$, so $3\\mid a$," with no reason given. This step needs Euclid's lemma. It is false for a composite such as 4 in place of 3: $4\\mid2^2$, but $4\\nmid 2$.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on proof by contradiction includes the classic irrationality arguments.' },
            { ...steinNumberTheory, note: 'Use it for prime factorisation as the tool behind these results.' },
          ],
          exercises: [
            {
              slug: 'irrational-roots',
              title: 'Irrational roots',
              prompt: `Prove: (a) $\\sqrt p$ is irrational for each prime $p$. (b) If $n$ is a positive integer that is not a perfect square, then $\\sqrt n$ is irrational. (c) $\\sqrt[3]{2}+\\sqrt[3]{4}$ is irrational. (d) $\\log_{10}2$ is irrational.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (b), use the rational root theorem on $x^2-n$. For (c), let $t=\\sqrt[3]{2}+\\sqrt[3]{4}$ and compute $t^3$.',
            },
            {
              slug: 'rational-root-theorem',
              title: 'Prove and use the rational root theorem',
              prompt: `Prove the rational root theorem for a polynomial of degree $n$. Then find all rational roots of $2x^3-3x^2-11x+6$, and show that $\\sqrt2+\\sqrt3$ is a root of $x^4-10x^2+1$. Deduce its irrationality a second way.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'closure-claims',
              title: 'Prove or disprove',
              prompt: `For real numbers, prove or disprove. (a) If $x^2$ is irrational, then $x$ is irrational. (b) If $x$ is irrational, then $x^2$ is irrational. (c) If $xy$ is rational and $x$ is rational, then $y$ is rational. (d) If $x+y$ and $x-y$ are rational, then $x$ and $y$ are rational. (e) If $x+y$ and $xy$ are rational, then $x$ and $y$ are rational.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Watch for the case $x=0$ in (c). For (e), think of the roots of a quadratic with rational coefficients.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does "lowest terms" not need a separate assumption in the proof that $\\sqrt3$ is irrational?',
              answerOutline: `Each fraction reduces by dividing out the gcd. So if any representation exists, then one in lowest terms exists. A fully careful answer says that this is proved using $\\gcd(a/d,b/d)=1$. Alternatively, descent avoids lowest terms completely.`,
            },
            {
              question: 'Run the irrationality proof on $\\sqrt4$. Which step fails?',
              answerOutline: `From $a^2=4b^2$ we get $2\\mid a$, so $a=2c$, and then $c^2=b^2$. Nothing makes $b$ even, so the contradiction never comes. If your version seems to work for $\\sqrt4$, then it has an error, since $\\sqrt4=2$.`,
            },
            {
              question: 'What does "the proof uses that 3 is prime" mean, exactly?',
              answerOutline: `$3\\mid a^2$ implies $3\\mid a$ via Euclid's lemma. For a non-prime, this can fail, for example with 4 and $a=2$. For square-free $n$ a variant works by using a prime factor of $n$, as in the proof for $\\sqrt6$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'arithmetic-of-z-n',
        title: 'Exploring the arithmetic of the integers mod n',
        description: `Build a small program that prints addition and multiplication tables, units and element orders for $\\mathbb{Z}_n$. Use the output to form conjectures, and then prove them with the tools of this module.`,
        deliverables: [
          'A program that, given $n$, prints the units, the order of each unit and the solutions of a linear congruence $ax\\equiv b\\pmod n$',
          'Proofs of at least four conjectures from your data, including a statement on when every unit squares to 1',
          'A table for $n\\le30$ showing the number of solutions of $x^2\\equiv1\\pmod n$, with a proof for $n$ prime',
          'A brief note on how a false conjecture was found out by the data',
        ],
        estimatedHours: 10,
        stretchGoals: ['Find every $n$ for which some unit has order $\\varphi(n)$, and read about primitive roots'],
      },
    },
    {
      slug: 'cardinality',
      title: 'Cardinality',
      description:
        'Counting finite sets by reasoning, then using bijections to compare infinite sets: countable sets, Cantor\'s diagonal argument and an unending ladder of sizes.',
      lessons: [
        {
          slug: 'finite-sets-and-combinatorial-reasoning',
          title: 'Finite sets and combinatorial reasoning',
          summary:
            'The pigeonhole principle and proof by counting two ways, which replace algebra with an argument about objects.',
          estimatedMinutes: 130,
          objectives: [
            'Apply the pigeonhole principle by choosing suitable boxes',
            'Prove identities by counting a set in two ways',
            'Check that a counting argument counts each object exactly once',
            'Describe finite cardinality in terms of bijections',
          ],
          concepts: [
            'Cardinality of a finite set',
            'Pigeonhole principle',
            'Double counting',
            'Binomial coefficient',
            'Pascal\'s identity',
            'Combinatorial proof',
            'Overcounting',
          ],
          explanation: `A set has **cardinality** $n$ if there is a bijection from it to $\\{1,\\dots,n\\}$. So counting is really a theorem about bijections, and two finite sets have the same size exactly when a bijection connects them. Two forms of combinatorial reasoning follow.

**Pigeonhole principle.** If more than $n$ objects go into $n$ boxes, some box holds at least two. The whole art is in choosing the boxes.

**Worked example 1.** Choose any $n+1$ integers from $\\{1,2,\\dots,2n\\}$. Then two of them are coprime.

*Proof.* Use the $n$ boxes $\\{1,2\\},\\{3,4\\},\\dots,\\{2n-1,2n\\}$. With $n+1$ numbers, two land in one box. These two are consecutive, and $\\gcd(m,m+1)=1$. $\\square$

The result cannot be improved: choosing $2,4,\\dots,2n$ gives $n$ numbers with no coprime pair (when $n\\ge2$). So $n+1$ is the exact threshold.

**Double counting.** Count one set in two ways, and the two answers must agree. Here $\\binom nk$ is the number of $k$-element subsets of an $n$-element set.

**Worked example 2.** Pascal's identity: for $1\\le k\\le n-1$, $\\ \\binom nk=\\binom{n-1}{k-1}+\\binom{n-1}k$.

*Proof.* Count the $k$-element subsets of $\\{1,\\dots,n\\}$. The left side is their number by definition. Otherwise, split on whether a subset contains $n$. Those that contain $n$ correspond to choosing the other $k-1$ elements from $\\{1,\\dots,n-1\\}$: that is $\\binom{n-1}{k-1}$ subsets. Those that do not contain $n$ are $k$-element subsets of $\\{1,\\dots,n-1\\}$: that is $\\binom{n-1}{k}$ subsets. Each subset is in exactly one group. $\\square$

In the same way, $\\sum_{k=0}^n\\binom nk=2^n$: both sides count all subsets, the left by size and the right by deciding for each element whether it is in or out.

**A bad proof.** "There are $n(n-1)$ handshakes among $n$ people: pick one person in $n$ ways, then another in $n-1$ ways." This counts ordered pairs, so each handshake appears twice. The right count is $\\binom n2=\\frac{n(n-1)}2$. A valid counting argument must make it clear that each object is produced *exactly once*. Test a formula on small $n$, here $n=2$: one handshake, not two. An argument can also undercount, by assuming that cases are exhaustive when they are not. So state your rule for assigning each object to one choice.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on counting, and the sections that use counting in proofs.' },
            { ...infiniteDescent, note: 'Its chapter on finite sets and counting treats bijections and double counting formally.' },
            { ...mitMathForCs, note: 'The counting lectures, including the pigeonhole principle and combinatorial proof.' },
          ],
          exercises: [
            {
              slug: 'pigeonhole-problems',
              title: 'Choose the boxes',
              prompt: `Prove: (a) among any five points in a unit square, two lie at a distance of at most $\\frac{\\sqrt2}{2}$. (b) Among any $n$ integers, there is a non-empty subset whose sum is divisible by $n$. (c) Among any $n+1$ integers from $\\{1,\\dots,2n\\}$, one divides another. (d) Any sequence of 10 distinct reals contains an increasing or decreasing subsequence of length 4.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), use partial sums mod $n$. For (c), write each number as $2^a m$ with $m$ odd. For (d), label each term with the pair: longest increasing run ending there, longest decreasing run ending there.',
            },
            {
              slug: 'count-two-ways',
              title: 'Count two ways',
              prompt: `Give combinatorial proofs, not algebra. (a) $k\\binom nk=n\\binom{n-1}{k-1}$. (Count committees with a chair.) (b) $\\sum_{k=0}^nk\\binom nk=n2^{n-1}$. (c) $\\sum_{k=0}^n\\binom nk^2=\\binom{2n}{n}$. (d) In any finite group of people, the number who have shaken an odd number of hands is even.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'binomial-theorem',
              title: 'The binomial theorem, two ways',
              prompt: `Prove $(x+y)^n=\\sum_{k=0}^n\\binom nkx^{n-k}y^k$ twice: once by induction using Pascal's identity, and once by a counting argument that interprets the coefficient of $x^{n-k}y^k$. Say which proof explains the result better for you, and why.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In a pigeonhole proof, what must you state?',
              answerOutline: `What the boxes are, why there are fewer boxes than objects, and why two objects in the same box give the conclusion. Many attempts skip the third. If you wrote "by pigeonhole, two are close" with no boxes, there is no proof yet.`,
            },
            {
              question: 'How do you check that a counting argument is valid?',
              answerOutline: `Ask whether each object is counted exactly once. Test small cases, such as $n=2$ or $3$, and list them. If the formula gives twice the true value, then you have counted ordered choices of an unordered object.`,
            },
            {
              question: 'What does a combinatorial proof of an identity need that an algebraic one does not?',
              answerOutline: `A specific set, and a description of how each side counts it. "Both sides count the same thing" is not enough without saying what the thing is. Its reward is that it explains why the identity holds.`,
            },
          ],
        },
        {
          slug: 'countable-sets',
          title: 'Infinite sets and countability',
          summary:
            'Same size means a bijection. Why $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ and $\\mathbb{N}\\times\\mathbb{N}$ all have the same size.',
          estimatedMinutes: 130,
          objectives: [
            'Define equal cardinality for arbitrary sets',
            'Write explicit bijections with $\\mathbb{N}$',
            'Prove that subsets and images of countable sets are countable',
            'Prove that a countable union of countable sets is countable',
          ],
          concepts: [
            'Equal cardinality',
            'Countably infinite',
            'Countable',
            'Listing a set',
            'Pairing function',
            'Countable unions',
            'A proper subset of the same size',
          ],
          explanation: `We say $|A|=|B|$ if a bijection $A\\to B$ exists. This is the only definition that extends to infinite sets, and it has surprising results. Let $\\mathbb{N}=\\{1,2,3,\\dots\\}$ here. A set is **countably infinite** if $|A|=|\\mathbb{N}|$, and **countable** if it is finite or countably infinite. In practice, a countably infinite set is one you can list as $a_1,a_2,a_3,\\dots$ with each element appearing exactly once.

The set $\\mathbb{N}$ has the same size as its proper subset $\\{2,4,6,\\dots\\}$, via $n\\mapsto2n$. So "a proper subset is smaller" is false for infinite sets, and that fact is a defining feature of them.

**Worked example.** Theorems: $\\mathbb{Z}$ and $\\mathbb{N}\\times\\mathbb{N}$ are countably infinite.

*$\\mathbb{Z}$.* List $0,1,-1,2,-2,\\dots$. Formally, let $f(n)=\\frac n2$ for even $n$, and $f(n)=-\\frac{n-1}2$ for odd $n$. The even inputs give each positive integer once. The odd inputs give $0$ and each negative integer once. So $f$ is a bijection.

*$\\mathbb{N}\\times\\mathbb{N}$.* Define $g(m,n)=2^{m-1}(2n-1)$. Every positive integer factors uniquely as a power of 2 times an odd number: that gives both surjectivity and injectivity. So $g$ is a bijection from $\\mathbb{N}\\times\\mathbb{N}$ to $\\mathbb{N}$.

From there, $\\mathbb{Q}$ follows. Each positive rational has a unique lowest-terms form $a/b$, so $a/b\\mapsto(a,b)$ is an injection into $\\mathbb{N}\\times\\mathbb{N}$. An infinite subset of a countable set is countably infinite, because you can list it in the order inherited from the list of the bigger set. Adding 0 and the negatives then works as for $\\mathbb{Z}$.

Likewise, a countable union of countable sets is countable. If $A_i=\\{a_{i1},a_{i2},\\dots\\}$, map $(i,j)\\mapsto a_{ij}$ from a subset of $\\mathbb{N}\\times\\mathbb{N}$ onto the union. A set is countable as soon as a surjection onto it from $\\mathbb{N}$ exists, or an injection from it into $\\mathbb{N}$.

**A bad proof.** "List the positive rationals: $\\frac11,\\frac12,\\frac13,\\dots$, then $\\frac21,\\frac22,\\dots$." The first run never ends, so $\\frac21$ never receives a position. Every element of a list must appear after finitely many steps. The fix is to go through by $a+b$: first sum 2, then sum 3, and so on. Each sum has finitely many fractions. Similarly, "Hilbert's hotel can always shift everyone" works as a map, but only once you give the formula and check bijectivity.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The chapter on cardinality of sets, up to countable sets and comparing sizes.' },
            { ...infiniteDescent, note: 'Its chapter on infinity covers countable sets with care.' },
          ],
          relatedLessons: ['discrete-mathematics/sets-functions-relations/cardinality-and-infinity'],
          exercises: [
            {
              slug: 'explicit-bijections',
              title: 'Explicit bijections',
              prompt: `Give a formula, and prove it is a bijection. (a) $\\mathbb{N}\\to\\{n\\in\\mathbb{N}:n\\ge5\\}$. (b) $\\mathbb{Z}\\to2\\mathbb{Z}$. (c) $(0,1)\\to(a,b)$, for reals $a<b$. (d) $(-1,1)\\to\\mathbb{R}$. (e) $\\mathbb{R}\\to(0,\\infty)$.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'For (d), try $x/(1-x^2)$, or a tangent.',
            },
            {
              slug: 'countability-closure',
              title: 'Closure of countability',
              prompt: `Prove: (a) a subset of a countable set is countable. (b) If there is a surjection $\\mathbb{N}\\to A$, then $A$ is countable. (c) A finite product of countable sets is countable. (d) The set of finite subsets of $\\mathbb{N}$ is countable. (e) The set of polynomials with integer coefficients is countable.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (d), write the set as a union over the largest element, or map a finite set to its binary number.',
            },
            {
              slug: 'algebraic-numbers',
              title: 'Algebraic numbers',
              prompt: `A real number is *algebraic* if it is a root of a non-zero integer polynomial. Prove that the set of algebraic numbers is countable. Say exactly which earlier results you use, and where you use that a non-zero polynomial has finitely many roots.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\frac11,\\frac12,\\frac13,\\dots,\\frac21,\\dots$ not a list of the positive rationals?',
              answerOutline: `Because $\\frac21$ never gets a finite position. A list means a function on $\\mathbb{N}$, so each element needs a finite index. Your repair should give each element a finite position, for example by ordering by $a+b$.`,
            },
            {
              question: '$\\mathbb{Z}$ looks twice as big as $\\mathbb{N}$. How do you answer this intuition?',
              answerOutline: `For infinite sets, "bigger" must be defined. With bijections as the definition, they have the same size. A proper subset having the same size is exactly what happens with infinite sets. Intuition from finite sets does not apply.`,
            },
            {
              question: 'To show that a set is countable, is it enough to give an injection from it to $\\mathbb{N}$?',
              answerOutline: `Yes: the set is then in bijection with a subset of $\\mathbb{N}$, and each subset of $\\mathbb{N}$ is countable. Countable includes finite. To prove "countably infinite", also show the set is infinite.`,
            },
          ],
        },
        {
          slug: 'uncountable-sets-and-cantors-theorem',
          title: 'Uncountable sets and Cantor\'s theorem',
          summary:
            'The diagonal argument, Cantor\'s theorem on power sets, and how to compare sizes with injections.',
          estimatedMinutes: 140,
          objectives: [
            'Prove that $(0,1)$ is uncountable with care over decimal expansions',
            'Prove Cantor\'s theorem for every set',
            'Use the Cantor-Schroeder-Bernstein theorem',
            'Explain why the diagonal argument does not apply to $\\mathbb{Q}$',
          ],
          concepts: [
            'Uncountable',
            'Diagonal argument',
            'Cantor\'s theorem',
            'Power set',
            'Cantor-Schroeder-Bernstein theorem',
            'Continuum hypothesis',
            'Transcendental numbers',
          ],
          explanation: `Not all infinite sets have the same size. Suppose someone claims to list every real number in $(0,1)$ as $x_1,x_2,x_3,\\dots$. Write each in decimal, $x_i=0.d_{i1}d_{i2}d_{i3}\\dots$. Build a new number $y=0.e_1e_2e_3\\dots$ by letting $e_i=5$ if $d_{ii}\\ne5$, and $e_i=6$ if $d_{ii}=5$. Then $y$ differs from $x_i$ in the $i$th digit, for every $i$. Using only digits 5 and 6 matters: decimals are not unique ($0.4999\\dots=0.5$), but two numbers can share a value with different digits only if one ends in repeating 9s, and $y$ has no 0s or 9s. So $y$ is not on the list, and the list was incomplete. Hence $(0,1)$ is **uncountable**.

**Worked example (Cantor's theorem).** For each set $A$, no function $f:A\\to\\mathcal{P}(A)$ is surjective. So $|A|<|\\mathcal{P}(A)|$.

*Scratch.* We want a subset of $A$ that $f$ misses. For each $a$, the set $f(a)$ is a subset, and we can ask whether $a$ belongs to it. To differ from every $f(a)$, disagree with it about $a$ itself. This is the diagonal idea, without digits.

*Proof.* Let $f:A\\to\\mathcal{P}(A)$ be any function, and define $D=\\{a\\in A:a\\notin f(a)\\}$. Suppose $D=f(b)$ for some $b\\in A$. If $b\\in D$, then by the definition of $D$, $b\\notin f(b)=D$. If $b\\notin D$, then $b\\notin f(b)$, so $b\\in D$. Both cases are contradictions. So $D$ is not in the image of $f$. $\\square$

Since $a\\mapsto\\{a\\}$ is an injection, $|A|\\le|\\mathcal{P}(A)|$, and the theorem makes this strict. Repeating gives an endless ladder of infinities: $\\mathbb{N},\\mathcal{P}(\\mathbb{N}),\\mathcal{P}(\\mathcal{P}(\\mathbb{N})),\\dots$

**Comparing sizes.** Write $|A|\\le|B|$ if an injection $A\\to B$ exists. The **Cantor-Schroeder-Bernstein theorem** says that if $|A|\\le|B|$ and $|B|\\le|A|$, then $|A|=|B|$. So you need not build a bijection directly. For instance, $x\\mapsto x$ injects $(0,1)$ into $[0,1]$, and $x\\mapsto\\frac{x+1}{3}$ injects $[0,1]$ into $(0,1)$, so they are the same size. It turns out that $|\\mathbb{R}|=|\\mathcal{P}(\\mathbb{N})|$. Whether any size lies strictly between $\\mathbb{N}$ and $\\mathbb{R}$ is the **continuum hypothesis**, which the standard axioms can neither prove nor refute.

**A bad proof.** "Apply the diagonal argument to a list of $\\mathbb{Q}\\cap(0,1)$. It gives a new number, so $\\mathbb{Q}$ is uncountable." The new number $y$ is real, but need not be rational, so it is not a missing *rational*. No contradiction arises. For a diagonal argument, always check that the object you build lies in the set being listed.`,
          resources: [
            { ...bookOfProof, primary: true, note: 'The second half of the chapter on cardinality: uncountable sets, comparing cardinalities and the Cantor-Bernstein-Schroeder theorem.' },
            { ...infiniteDescent, note: 'Its chapter on infinity includes a proof of the Cantor-Schroeder-Bernstein theorem.' },
          ],
          exercises: [
            {
              slug: 'diagonal-binary',
              title: 'The set of binary sequences',
              prompt: `Prove directly by a diagonal argument that the set of infinite sequences of 0s and 1s is uncountable. Then build a bijection between this set and $\\mathcal{P}(\\mathbb{N})$. Finally, explain why the same argument does not show that the set of *eventually zero* sequences is uncountable, and prove that this set is countable.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bijection-half-open',
              title: 'An explicit shift',
              prompt: `Define $h:[0,1)\\to(0,1)$ by $h(0)=\\frac12$, $h(\\frac1n)=\\frac1{n+1}$ for integers $n\\ge2$, and $h(x)=x$ otherwise. Prove that $h$ is a bijection. Then adapt the idea to build a bijection $[0,1]\\to(0,1)$. Compare this with the shorter proof from the Cantor-Schroeder-Bernstein theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'transcendental-exist',
              title: 'Transcendental numbers exist',
              prompt: `Using the countability of the algebraic numbers, prove that transcendental (non-algebraic) real numbers exist, and that they are uncountable. Is your proof constructive? Then show that $|\\mathbb{R}\\times\\mathbb{R}|=|\\mathbb{R}|$ with Cantor-Schroeder-Bernstein, interleaving digits and stating how you deal with non-unique decimals.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If the transcendentals were countable, then $\\mathbb{R}$ would be a union of two countable sets.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the decimal diagonal proof use digits 5 and 6, and not "add 1 to each digit"?',
              answerOutline: `Because a real number can have two decimal expansions, one ending in 9s and one in 0s. Having different digits does not guarantee a different number unless those tails are avoided. Using 5 and 6 avoids them. "Add 1" also produces digits outside 0-9 from 9.`,
            },
            {
              question: 'In Cantor\'s theorem, what if $A$ is empty?',
              answerOutline: `Then $\\mathcal{P}(A)=\\{\\varnothing\\}$ has one element, and the only function from $\\varnothing$ has empty image. So it is not surjective, and $D=\\varnothing$ is the missed subset. The proof handles this without change, since there is no $b$ with $f(b)=D$.`,
            },
            {
              question: 'Is the diagonal number for a list of the rationals a rational number?',
              answerOutline: `It need not be. So the argument does not contradict countability. This is the point at which a false proof of "$\\mathbb{Q}$ is uncountable" fails. Lists of rationals do exist, and for such a list the diagonal number is irrational.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'real-numbers-and-limits',
      title: 'Real Numbers and Limits',
      description:
        'The property that separates $\\mathbb{R}$ from $\\mathbb{Q}$, and your first real analysis proofs: epsilon arguments for sequences and functions.',
      lessons: [
        {
          slug: 'least-upper-bounds',
          title: 'Least upper bounds and the Archimedean property',
          summary:
            'Completeness as the defining property of the reals, how to prove that a number is a supremum, and the facts that follow.',
          estimatedMinutes: 150,
          objectives: [
            'State the definition of supremum and the epsilon form',
            'Prove that a given number is the supremum of a set',
            'State the completeness axiom and show that it fails in $\\mathbb{Q}$',
            'Prove the Archimedean property and the density of the rationals',
          ],
          concepts: [
            'Upper bound',
            'Supremum and infimum',
            'Completeness axiom',
            'Epsilon characterisation of supremum',
            'Archimedean property',
            'Density of $\\mathbb{Q}$',
          ],
          explanation: `Both $\\mathbb{Q}$ and $\\mathbb{R}$ are ordered fields. What separates them is **completeness**.

For $A\\subseteq\\mathbb{R}$, a number $u$ is an **upper bound** if $a\\le u$ for all $a\\in A$. A number $s$ is the **supremum** of $A$, written $\\sup A$, if (i) $s$ is an upper bound, and (ii) $s\\le u$ for every upper bound $u$.

**Completeness axiom.** Every non-empty subset of $\\mathbb{R}$ that is bounded above has a supremum.

This fails in $\\mathbb{Q}$: the set $\\{x\\in\\mathbb{Q}:x^2<2\\}$ is bounded above but has no rational supremum. In $\\mathbb{R}$, its supremum is $\\sqrt2$. Completeness is what fills the gaps, and it is behind every existence theorem in calculus.

A working form of (ii): an upper bound $s$ is the supremum exactly when
$$\\forall\\varepsilon>0\\ \\exists a\\in A,\\ a>s-\\varepsilon.$$
That is, nothing smaller than $s$ is an upper bound.

**Archimedean property.** $\\mathbb{N}$ is not bounded above. *Proof.* Suppose it were, and let $s=\\sup\\mathbb{N}$. Since $s-1$ is not an upper bound, there is an $n\\in\\mathbb{N}$ with $n>s-1$. Then $n+1>s$, and $n+1\\in\\mathbb{N}$, which is a contradiction. $\\square$ So for each $\\varepsilon>0$, there is an $n$ with $\\frac1n<\\varepsilon$.

**Worked example.** Let $A=\\{1-\\frac1n:n\\in\\mathbb{N}\\}$. Then $\\sup A=1$.

*Scratch.* Clearly $1$ is above everything. To beat $1-\\varepsilon$, I need $1-\\frac1n>1-\\varepsilon$, that is, $\\frac1n<\\varepsilon$.

*Proof.* For all $n$, $1-\\frac1n<1$, so 1 is an upper bound. Let $\\varepsilon>0$. By the Archimedean property, choose $n$ with $\\frac1n<\\varepsilon$. Then $1-\\frac1n>1-\\varepsilon$, so the element $1-\\frac1n$ of $A$ exceeds $1-\\varepsilon$. Hence $1=\\sup A$. $\\square$

Note that $1\\notin A$. The supremum need not belong to the set.

**Bad proofs.**

- *"$\\sup A=1$ because 1 is an upper bound."* So is 2. An argument must also rule out smaller bounds.
- *"$\\sup A=1$ because the sequence tends to 1."* That might be proved in this way later, but here it relies on what is being proved.
- *"The sup is the largest element."* Then $A$ above would have none. A largest element, if one exists, is the sup, but the converse fails.

**Density.** Between any reals $a<b$ lies a rational. Choose $n$ with $\\frac1n<b-a$, and let $m$ be the least integer greater than $na$. Then $a<\\frac mn\\le a+\\frac1n<b$. A tempting bad proof takes "$\\frac{a+b}{2}$", which is not rational in general. The proof has to use the structure of $\\mathbb{Q}$, so it uses denominators.`,
          resources: [
            { ...leblAnalysis, primary: true, note: 'The opening chapter on the real numbers: the same ideas in a more advanced style.' },
            { ...bookOfProof, note: 'The chapter on proofs in calculus gives extra practice with these definitions.' },
          ],
          exercises: [
            {
              slug: 'find-sups',
              title: 'Find and prove suprema',
              prompt: `Find the sup and inf, say whether each is attained, and prove your answer. (a) $\\{\\frac{n}{n+1}:n\\in\\mathbb{N}\\}$. (b) $\\{(-1)^n+\\frac1n:n\\in\\mathbb{N}\\}$. (c) $\\{x\\in\\mathbb{R}:x^2<3\\}$. (d) $\\{\\frac1n+\\frac1m:n,m\\in\\mathbb{N}\\}$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'In (b), the even and odd terms behave differently. List a few.',
            },
            {
              slug: 'sup-algebra',
              title: 'Arithmetic of suprema',
              prompt: `Let $A,B\\subseteq\\mathbb{R}$ be non-empty and bounded above. Prove: (a) if $A\\subseteq B$, then $\\sup A\\le\\sup B$. (b) $\\sup(A+B)=\\sup A+\\sup B$, where $A+B=\\{a+b\\}$. (c) For $c>0$, $\\sup(cA)=c\\sup A$. (d) If $A$ is bounded below, then $\\inf A=-\\sup(-A)$. (e) Show by example that $\\sup(AB)=\\sup A\\sup B$ can fail.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'square-root-of-two-exists',
              title: 'The square root of two exists',
              prompt: `Let $S=\\{x\\in\\mathbb{R}:x>0,\\ x^2<2\\}$ and $s=\\sup S$. Explain why $s$ exists, then prove $s^2=2$ by ruling out $s^2<2$ and $s^2>2$. In each case, build an explicit element or upper bound, such as $s+\\frac1n$ or $s-\\frac1n$ for a large $n$. Say how large $n$ must be.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For $s^2<2$, use $(s+\\frac1n)^2\\le s^2+\\frac{2s+1}{n}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'A student proves $s=\\sup A$ by showing $s$ is an upper bound and $s\\in A$. Is this valid?',
              answerOutline: `Yes. If $s\\in A$ is an upper bound, then each upper bound $u$ satisfies $u\\ge s$. So $s$ is the maximum, and thus the sup. But it applies only when the sup is attained. It cannot be used for $\\{1-\\frac1n\\}$.`,
            },
            {
              question: 'Why does the empty set not have a supremum in $\\mathbb{R}$?',
              answerOutline: `Each real number is an upper bound of $\\varnothing$, vacuously, and there is no least real number. That is why the axiom needs "non-empty". "Bounded above" is needed too, for $\\mathbb{N}$.`,
            },
            {
              question: 'In the density proof, why does $\\frac mn\\le a+\\frac1n$ hold?',
              answerOutline: `$m$ is the least integer above $na$, so $m-1\\le na$. So $m\\le na+1$, and dividing by $n$ gives this bound. If you did not use minimality, then your $m$ might jump past $b$. That step is where the choice of $m$ matters.`,
            },
          ],
        },
        {
          slug: 'limits-of-sequences',
          title: 'Limits of sequences',
          summary:
            'The epsilon-N definition, how to find $N$ on scratch paper, how to write the proof forward, and how limit proofs go wrong.',
          estimatedMinutes: 150,
          objectives: [
            'State the definition of the limit of a sequence',
            'Find $N$ in terms of $\\varepsilon$ by bounding $|a_n-L|$',
            'Write a correct epsilon-N proof',
            'Prove that a sequence diverges using the negated definition',
          ],
          concepts: [
            'Sequence',
            'Limit, epsilon-N definition',
            'Simplifying an upper bound',
            'Choice of $N$ depends on $\\varepsilon$',
            'Uniqueness of limits',
            'Divergence',
          ],
          explanation: `A sequence $(a_n)$ **converges** to $L$ if
$$\\forall\\varepsilon>0\\ \\exists N\\in\\mathbb{N}\\ \\forall n\\ge N,\\ |a_n-L|<\\varepsilon.$$
As a game: your opponent names a tolerance $\\varepsilon$, however small, and you name a point $N$ beyond which all terms stay within $\\varepsilon$ of $L$. So $N$ may depend on $\\varepsilon$, but not on $n$.

Every limit proof has two parts: scratch work to find $N$, and a forward proof in which $N$ appears as if by magic. On scratch paper, simplify $|a_n-L|$, then replace it with a simpler upper bound. You are free to be generous: you need *a* valid $N$, not the smallest.

**Worked example.** Prove $\\lim\\frac{3n+1}{n+2}=3$.

*Scratch.* We have
$$\\left|\\frac{3n+1}{n+2}-3\\right|=\\left|\\frac{3n+1-3n-6}{n+2}\\right|=\\frac5{n+2}<\\frac5n.$$
To make this less than $\\varepsilon$, it is enough to have $n>\\frac5\\varepsilon$.

*Proof.* Let $\\varepsilon>0$. By the Archimedean property, choose an integer $N>\\frac5\\varepsilon$. Let $n\\ge N$. Then
$$\\left|\\frac{3n+1}{n+2}-3\\right|=\\frac5{n+2}<\\frac5n\\le\\frac5N<\\varepsilon.\\quad\\square$$

Check the structure: arbitrary $\\varepsilon$ first, then $N$ defined from it, then arbitrary $n\\ge N$, and finally a chain ending in $<\\varepsilon$.

For a messier fraction, restrict $n$ first. For $\\frac{n^2+1}{2n^2-3}\\to\\frac12$, the difference is $\\frac5{2(2n^2-3)}$. The minus sign in the denominator is a nuisance, but when $n\\ge2$, $n^2\\ge 4>3$ and so $2n^2-3\\ge n^2$. Thus the difference is at most $\\frac{5}{2n^2}$. Then you need $N$ to be at least 2, as well as large enough for $\\varepsilon$, and the max of the two conditions does both jobs.

**Bad proofs.**

- *Using the limit in the proof.* "As $n\\to\\infty$, $\\frac5{n+2}\\to0$, so the limit is 3." This assumes the kind of thing that is being proved. For a first proof, go back to $\\varepsilon$.
- *Picking one $\\varepsilon$.* "Take $\\varepsilon=0.01$, then $N=500$ works." That covers one opponent's move only.
- *$N$ depending on $n$.* "Choose $N=n+1$." $N$ must be fixed before $n$ is. This is the quantifier-order failure from the logic module.
- *Going backward without saying so.* Starting from $|a_n-L|<\\varepsilon$ and deriving $n>\\dots$ is scratch work, not proof.

**Divergence.** To show $a_n=(-1)^n$ has no limit, take any $L$ and use the negation with $\\varepsilon=1$. Consecutive terms differ by 2, so they cannot both be within 1 of $L$: otherwise $2=|a_n-a_{n+1}|<2$. So for each $N$, some $n\\ge N$ has $|a_n-L|\\ge1$.`,
          resources: [
            { ...leblAnalysis, primary: true, note: 'The chapter on sequences and series begins with these definitions and examples.' },
            { ...bookOfProof, note: 'The chapter on proofs in calculus works through limit definitions with beginners in mind.' },
          ],
          exercises: [
            {
              slug: 'epsilon-n-proofs',
              title: 'Epsilon-N proofs',
              prompt: `Prove from the definition, showing scratch work and then a forward proof. (a) $\\lim\\frac{2n-1}{n}=2$. (b) $\\lim\\frac{n^2+1}{2n^2-3}=\\frac12$. (c) $\\lim\\frac{\\sin n}{n}=0$. (d) $\\lim(\\sqrt{n+1}-\\sqrt n)=0$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (d), multiply and divide by $\\sqrt{n+1}+\\sqrt n$.',
            },
            {
              slug: 'n-for-epsilon',
              title: 'Compute an $N$',
              prompt: `For $a_n=\\frac{3n+1}{n+2}$ and limit 3: (a) find the smallest $N$ that works for $\\varepsilon=0.01$. (b) Find the $N$ given by the formula in the worked proof, and compare. (c) Explain why the difference between them does not matter for the proof.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'limit-uniqueness',
              title: 'Limits are unique, and basic facts',
              prompt: `Prove: (a) a sequence has at most one limit, using $\\varepsilon=\\frac{|L-M|}{2}$ if $L\\ne M$. (b) If $a_n\\to L$, then $|a_n|\\to|L|$. Is the converse true? (c) If $a_n\\to L$ and $L>0$, then $a_n>\\frac L2$ for all large $n$. (d) $a_n=n^2$ does not converge. (e) $a_n=\\cos(n\\pi/2)$ does not converge.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the first and last lines of an epsilon-N proof?',
              answerOutline: `First: "Let $\\varepsilon>0$." Then "Choose $N=\\dots$" Last: "Thus $|a_n-L|<\\varepsilon$ for all $n\\ge N$." If you began with $|a_n-L|<\\varepsilon$, you wrote scratch work and not the final proof. The order of the sentences mirrors the order of the quantifiers.`,
            },
            {
              question: 'Is it acceptable to use a bound like $\\frac5{n+2}<\\frac5n$, which throws away information?',
              answerOutline: `Yes. You only need some valid $N$, not the best one. Simplifying is the point. The only constraint is direction: you may only replace by something *larger*, since the chain must end below $\\varepsilon$.`,
            },
            {
              question: 'Why must you use the Archimedean property in the proof that $\\frac1n\\to0$?',
              answerOutline: `You need an integer above $\\frac1\\varepsilon$. That such an integer exists for every real $\\varepsilon>0$ is exactly the Archimedean property. So even this simple limit depends on the completeness of $\\mathbb{R}$, and on non-Archimedean ordered fields it fails.`,
            },
          ],
        },
        {
          slug: 'limit-laws-and-monotone-sequences',
          title: 'Limit laws and monotone sequences',
          summary:
            'Splitting epsilon, the add-and-subtract trick, and how completeness proves that a limit exists without knowing its value.',
          estimatedMinutes: 150,
          objectives: [
            'Prove the sum and product limit laws',
            'Use the epsilon-over-two and add-and-subtract techniques',
            'Prove the monotone convergence theorem from completeness',
            'Compute a recursive limit after proving that it exists',
          ],
          concepts: [
            'Bounded sequences',
            'Sum law, epsilon over two',
            'Product law, adding and subtracting',
            'Monotone sequences',
            'Monotone convergence theorem',
            'Existence before computation',
          ],
          explanation: `Limit laws say that limits respect arithmetic. Their proofs contain the two standard tricks of analysis.

**Epsilon over two.** If $a_n\\to A$ and $b_n\\to B$, then $a_n+b_n\\to A+B$. *Proof.* Let $\\varepsilon>0$. Choose $N_1$ with $|a_n-A|<\\frac\\varepsilon2$ for $n\\ge N_1$, and $N_2$ with $|b_n-B|<\\frac\\varepsilon2$ for $n\\ge N_2$. Let $N=\\max(N_1,N_2)$. For $n\\ge N$, the triangle inequality gives
$$|(a_n+b_n)-(A+B)|\\le|a_n-A|+|b_n-B|<\\varepsilon.\\ \\square$$
We can demand $\\frac\\varepsilon2$, since the definition holds for *every* positive tolerance.

**Add and subtract.** For products, write
$$a_nb_n-AB=a_n(b_n-B)+B(a_n-A).$$
Each piece has a small factor. The coefficient $a_n$ is under control because convergent sequences are bounded: take $\\varepsilon=1$ in the definition, and only finitely many terms remain outside $(A-1,A+1)$.

**Monotone convergence theorem.** A bounded increasing sequence converges. This is the place where completeness creates a limit.

*Proof.* Let $s=\\sup\\{a_n\\}$, which exists by completeness. Let $\\varepsilon>0$. Since $s-\\varepsilon$ is not an upper bound, some $a_N>s-\\varepsilon$. For $n\\ge N$, monotonicity gives $s-\\varepsilon<a_N\\le a_n\\le s$, so $|a_n-s|<\\varepsilon$. $\\square$

**Worked example.** Let $a_1=1$ and $a_{n+1}=\\sqrt{2+a_n}$. Find the limit.

*Bounded.* By induction, $0<a_n<2$: true for $n=1$, and if $0<a_k<2$, then $0<a_{k+1}<\\sqrt{2+2}=2$.

*Increasing.* $a_{n+1}^2-a_n^2=2+a_n-a_n^2=(2-a_n)(1+a_n)>0$, using $0<a_n<2$. Both terms are positive, so $a_{n+1}>a_n$.

*Limit.* By the theorem, $a_n\\to L$ for some $L$. Also $a_{n+1}\\to L$, and $a_{n+1}^2=2+a_n$. The limit laws give $L^2=2+L$, so $L=2$ or $L=-1$. Since $a_n>0$, $L\\ge0$. Thus $L=2$.

**A bad proof.** "Let $L=\\lim a_n$. Then $L=\\sqrt{2+L}$, so $L=2$." This assumes that the limit exists. The danger is plain from $a_1=1$, $a_{n+1}=2a_n$. The same trick gives $L=2L$, so "$L=0$", but $a_n=2^{n-1}$ diverges. Solving the equation only tells you what the limit must be *if* there is one. Existence comes first. This has the same logic as solving equations: necessary conditions do not give existence.`,
          resources: [
            { ...leblAnalysis, primary: true, note: 'The sections on limit laws and monotone sequences in the chapter on sequences.' },
            { ...infiniteDescent, note: 'Its chapter on real numbers treats limits and completeness at the level of this course.' },
          ],
          exercises: [
            {
              slug: 'prove-limit-laws',
              title: 'Prove the laws',
              prompt: `Prove: (a) a convergent sequence is bounded. (b) If $a_n\\to A$ and $b_n\\to B$, then $a_nb_n\\to AB$. (c) If $b_n\\to B\\ne0$, then $b_n\\ne 0$ for all large $n$ and $\\frac1{b_n}\\to\\frac1B$. (d) If $a_n\\le b_n$ for all $n$, then $A\\le B$. (e) Give an example showing that strict inequality can be lost in the limit in (d).`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'squeeze',
              title: 'The squeeze theorem',
              prompt: `Prove that if $a_n\\le c_n\\le b_n$ and $a_n,b_n\\to L$, then $c_n\\to L$. Use it to find, with proof, $\\lim\\frac{n}{n^2+1}$ and $\\lim\\frac{1}{n}\\sum_{k=1}^{n}\\frac{k}{n+k^2}$, or show that the second is bounded above by something that tends to 0.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the second: $\\frac{k}{n+k^2}\\le\\frac{1}{2\\sqrt n}$ by the inequality between the means.',
            },
            {
              slug: 'recursive-limits',
              title: 'Recursive sequences',
              prompt: `(a) Let $a_1=3$ and $a_{n+1}=\\frac12\\left(a_n+\\frac2{a_n}\\right)$. Prove that $a_n\\ge\\sqrt2$, that $(a_n)$ is decreasing, and that $a_n\\to\\sqrt2$. (b) Let $a_1=0$, $a_{n+1}=\\frac{1+a_n}{2}$ . Find the limit, and a closed form for $a_n$. (c) Let $a_1=2$, $a_{n+1}=a_n^2$. Show that the equation for the limit has solutions, and explain why neither is the limit.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why not choose the same $N$ in the sum law at once?',
              answerOutline: `Each sequence has its own $N$. Taking the max makes both conditions hold from then on. If you wrote "choose $N$ with both", that is fine as long as you say why such an $N$ exists. The max is that reason.`,
            },
            {
              question: 'Where is completeness used in the monotone convergence theorem, and what fails over $\\mathbb{Q}$?',
              answerOutline: `It is used for the existence of the supremum. Over $\\mathbb{Q}$, the decimal truncations $1,1.4,1.41,\\dots$ of $\\sqrt2$ are increasing and bounded, but have no rational limit.`,
            },
            {
              question: 'What must you prove before writing "let $L=\\lim a_n$"?',
              answerOutline: `That the limit exists, usually through monotone convergence. The equation for $L$ gives only candidates. A full answer includes the use of a sign or range condition to choose among them, as with $L=2$ and $L=-1$.`,
            },
          ],
        },
        {
          slug: 'epsilon-delta-continuity',
          title: 'Epsilon-delta and continuity',
          summary:
            'Limits and continuity of functions, how to find delta, and a proof of the intermediate value theorem.',
          estimatedMinutes: 160,
          objectives: [
            'State the epsilon-delta definition of continuity and of a function limit',
            'Find $\\delta$ for polynomials and simple rational functions',
            'Prove that a function is discontinuous from the negated definition',
            'Follow and write a proof of the intermediate value theorem from completeness',
          ],
          concepts: [
            'Limit of a function',
            'Continuity at a point',
            'Restricting $\\delta$ first',
            'Minimum of two conditions',
            'Discontinuity',
            'Intermediate value theorem',
          ],
          explanation: `$f$ is **continuous at $a$** if
$$\\forall\\varepsilon>0\\ \\exists\\delta>0\\ \\forall x,\\ |x-a|<\\delta\\Rightarrow|f(x)-f(a)|<\\varepsilon.$$
For a limit, $\\lim_{x\\to a}f(x)=L$, replace $f(a)$ with $L$ and require $0<|x-a|<\\delta$, because the value at $a$ does not matter. The game is as before: the opponent names $\\varepsilon$, and you answer with $\\delta$, which may depend on $\\varepsilon$ and on $a$, but not on $x$.

**Worked example.** Prove that $f(x)=x^2$ is continuous at $3$.

*Scratch.* We need $|x^2-9|=|x-3|\\,|x+3|$ to be small. The first factor is controlled by $\\delta$. The second varies with $x$, so I must bound it. Restrict first: if $\\delta\\le1$, then $|x-3|<1$ gives $2<x<4$, so $|x+3|<7$. Then $|x^2-9|<7\\delta$, and I want $7\\delta\\le\\varepsilon$.

*Proof.* Let $\\varepsilon>0$, and put $\\delta=\\min(1,\\frac\\varepsilon7)$. Let $|x-3|<\\delta$. Since $\\delta\\le 1$, we have $2<x<4$, so $|x+3|<7$. Then
$$|x^2-9|=|x-3|\\,|x+3|<7\\delta\\le\\varepsilon.\\ \\square$$

The $\\min$ is the standard pattern: one condition keeps the varying factor bounded, and the other meets the tolerance.

**A bad proof.** "Choose $\\delta=\\frac{\\varepsilon}{|x+3|}$." This makes $\\delta$ depend on $x$, but $\\delta$ has to be chosen before $x$. It looks plausible since the algebra closes up. This is the quantifier-order failure, and it is the most common error in the subject. If $x$ appears in your $\\delta$, then you must bound that factor first.

**Discontinuity.** Let $H(x)=0$ for $x<0$ and $H(x)=1$ for $x\\ge0$. It is not continuous at 0. The negation says that there is $\\varepsilon>0$ such that for every $\\delta>0$, some $x$ has $|x|<\\delta$ and $|H(x)-H(0)|\\ge\\varepsilon$. Take $\\varepsilon=\\frac12$ and $x=-\\frac\\delta2$.

**The intermediate value theorem.** If $f$ is continuous on $[a,b]$ and $f(a)<0<f(b)$, then $f(c)=0$ for some $c\\in(a,b)$. This is where completeness and continuity meet. Let $S=\\{x\\in[a,b]:f(x)<0\\}$, a non-empty set bounded above, and let $c=\\sup S$. If $f(c)<0$, continuity gives points just to the right of $c$ that are in $S$, contradicting that $c$ is an upper bound. If $f(c)>0$, continuity gives an interval to the left of $c$ with no points of $S$, contradicting that $c$ is the least upper bound. So $f(c)=0$. Over $\\mathbb{Q}$, the same theorem fails: $x^2-2$ changes sign on $[1,2]$ with no rational root. This is the same gap as in the first lesson of this module. Calculus depends on completeness.`,
          resources: [
            { ...leblAnalysis, primary: true, note: 'The chapter on continuous functions has this definition and the intermediate value theorem.' },
            { ...bookOfProof, note: 'The chapter on proofs in calculus has epsilon-delta examples at this level.' },
          ],
          exercises: [
            {
              slug: 'epsilon-delta-proofs',
              title: 'Find delta',
              prompt: `Prove from the definition. (a) $f(x)=5x-2$ is continuous at every $a$. (b) $f(x)=x^2+x$ is continuous at $2$. (c) $f(x)=\\frac1x$ is continuous at $2$. (d) $\\lim_{x\\to1}\\frac{x^2-1}{x-1}=2$. (e) $f(x)=\\sqrt x$ is continuous at each $a>0$. Give an explicit $\\delta$ in each case.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), restrict to $\\delta\\le1$ so that $x>1$. For (e), multiply by $\\frac{\\sqrt x+\\sqrt a}{\\sqrt x+\\sqrt a}$.',
            },
            {
              slug: 'continuity-theorems',
              title: 'Continuity theorems',
              prompt: `Prove from the definition: (a) if $f$ and $g$ are continuous at $a$, then so is $f+g$. (b) If $f$ is continuous at $a$ and $f(a)>0$, then $f>0$ on some interval around $a$. (c) If $g$ is continuous at $a$ and $f$ is continuous at $g(a)$, then $f\\circ g$ is continuous at $a$. (d) The function equal to $1$ on $\\mathbb{Q}$ and $0$ off $\\mathbb{Q}$ is continuous nowhere.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'ivt-in-full',
              title: 'The intermediate value theorem in full',
              prompt: `Write the proof of the intermediate value theorem in full, filling in both cases in the sketch with an explicit $\\varepsilon$ and $\\delta$. Deduce: (a) every odd-degree real polynomial has a real root. (b) Any continuous $f:[0,1]\\to[0,1]$ has a fixed point. (c) Mark where completeness is used, then explain what fails over $\\mathbb{Q}$ for $f(x)=x^2-2$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Take $\\varepsilon=|f(c)|$ in each case.',
            },
          ],
          selfAssessment: [
            {
              question: 'Is $\\delta=\\min(1,\\varepsilon/7)$ the only right answer in the worked example?',
              answerOutline: `No. Any smaller positive $\\delta$ also works, and other restrictions, such as $\\delta\\le2$ with $|x+3|<8$, are fine too. Feedback for a different answer: check the chain of inequalities. If it holds, your answer is right.`,
            },
            {
              question: 'What does it mean to "bound the varying factor first"?',
              answerOutline: `A factor like $|x+3|$ depends on $x$, and it cannot appear in $\\delta$. So first restrict $x$ near $a$ to get a constant bound on it. Only then choose $\\delta$. A $\\delta$ that contains $x$ is the error this step prevents.`,
            },
            {
              question: 'Why does the proof of the intermediate value theorem need a supremum instead of "the first point where $f$ is zero"?',
              answerOutline: `There may be no first such point described by finite means, and existence is exactly what is at issue. The sup exists by completeness, and is shown to be a zero. An answer that says "the graph must cross" restates the theorem and does not prove it.`,
            },
          ],
        },
      ],
      project: {
        slug: 'first-analysis-notebook',
        title: 'A first analysis notebook',
        description: `Write your own short set of analysis notes, proving everything from the completeness axiom. The aim is to see a connected chain of results, each one depending on the previous ones, and to write it for someone reading after you.`,
        deliverables: [
          'A written chain of proofs: the Archimedean property, density of the rationals, monotone convergence, the existence of $\\sqrt2$, and the intermediate value theorem',
          'For each proof, a note on which earlier result it uses',
          'Three flawed proofs from this module, with a diagnosis, including one with a $\\delta$ that depends on $x$',
          'A numerical table for one recursive sequence and one epsilon-delta example, comparing your $N$ or $\\delta$ with the best possible value',
        ],
        estimatedHours: 12,
        stretchGoals: ['Add the extreme value theorem, using a supremum argument or subsequences'],
      },
    },
  ],
  capstone: {
    slug: 'cantor-set-paper',
    title: 'The Cantor set: an expository paper with full proofs',
    description: `Write a 10-15 page paper on the Cantor set that uses all of the course. Let $C_0=[0,1]$, and form $C_{n+1}$ by deleting the open middle third of each interval of $C_n$. Then $C=\\bigcap_nC_n$. This set looks small and is large: it has total length zero, yet it is uncountable.

The paper must state every definition in precise form and prove every claim, for a reader who has taken this course. Drafts count: at least one draft has to be reviewed against the failure list from the proof techniques module, either by you after a week away or by another person. Numerical work may be used to explore, but not as a proof.

Required results: the total length of $C_n$ is $(\\frac23)^n$, by induction; $C$ is non-empty and contains no interval; $x\\in C$ exactly when $x$ has a base-3 expansion that uses only the digits 0 and 2; $C$ has the same cardinality as $\\mathcal{P}(\\mathbb{N})$, and so is uncountable; the endpoints of the removed intervals form a countable set, so $C$ has points that are not endpoints (name one, such as $\\frac14$); and every point of $C$ is a limit of a sequence of other points of $C$.`,
    deliverables: [
      'The paper with all required results proved, in full sentences, with a list of definitions at the start',
      'A proof that $\\frac14\\in C$, with its base-3 expansion, and of how non-unique ternary expansions are handled',
      'One result of your choice beyond the required list, such as $C+C=[0,2]$ or the Cantor function, with proof',
      'A table of which module of this course each result draws on',
      'A review log: at least five specific faults found in earlier drafts, each named by failure type, and how it was fixed',
      'A short script drawing $C_n$ for small $n$, used to explain the construction, not to prove anything',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Build a set that has the same construction but positive total length, and prove that its length is positive',
      'Prove that $C$ with the usual metric is compact, using the definitions you will meet in real analysis',
    ],
  },
  masteryChecklist: [
    'I can write statements with quantifiers, negate them and use the negation as a proof plan',
    'I can find a proof with scratch work and then write it forward in clear sentences',
    'I can choose between direct, contrapositive, contradiction and induction proofs, and say why',
    'I can identify the flaw in an invalid proof and name its type, and I check my own proofs in the same way',
    'I can give a valid counterexample and check both its hypothesis and its conclusion',
    'I can prove set identities, and facts about images, preimages, injections and surjections',
    'I can prove that operations on equivalence classes are well defined',
    'I can solve linear congruences and prove from the axioms in a group',
    'I can prove that a number is irrational and that a set is countable or uncountable',
    'I can write epsilon-N and epsilon-delta proofs, including the order of choices, and use completeness to prove existence',
  ],
});
