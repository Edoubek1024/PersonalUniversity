import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const lebl: ResourceInput = {
  title: 'Basic Analysis: Introduction to Real Analysis (Lebl)',
  url: 'https://www.jirka.org/ra/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jiri Lebl',
};

const trench: ResourceInput = {
  title: 'Introduction to Real Analysis (Trench)',
  url: 'https://digitalcommons.trinity.edu/mono/7/',
  type: 'textbook',
  cost: 'free',
  provider: 'Trinity University',
};

const mit18100a: ResourceInput = {
  title: 'MIT 18.100A Real Analysis',
  url: 'https://ocw.mit.edu/courses/18-100a-real-analysis-fall-2020/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};

const suLectures: ResourceInput = {
  title: 'Real Analysis: Lectures by Francis Su',
  url: 'https://www.youtube.com/playlist?list=PL0E754696F72137EC',
  type: 'lecture',
  cost: 'free',
  provider: 'Harvey Mudd College',
};

const hunter: ResourceInput = {
  title: 'An Introduction to Real Analysis (Hunter)',
  url: 'https://www.math.ucdavis.edu/~hunter/intro_analysis_pdf/intro_analysis.pdf',
  type: 'textbook',
  cost: 'free',
  provider: 'UC Davis',
};

const interactiveAnalysis: ResourceInput = {
  title: 'Interactive Real Analysis (Wachsmuth)',
  url: 'https://mathcs.org/analysis/reals/',
  type: 'interactive',
  cost: 'free',
  provider: 'MathCS.org',
};

export default defineSubject({
  id: 'real-analysis',
  title: 'Elementary Real Analysis',
  category: 'math',
  tagline:
    'Calculus rebuilt from the axioms of the real numbers, with every theorem stated exactly and proved: limits, continuity, derivatives, the Riemann integral and uniform convergence.',
  description: `Calculus tells you how to compute. Analysis tells you why the computations are right, and when they are not. Why does a continuous function on a closed interval attain a maximum? Why can you integrate a power series term by term, but not every series? Why can a rearranged series have a different sum? This course answers such questions from one assumption: the completeness of the real numbers.

This course follows the public catalog description of University of Illinois MATH 444, Elementary Real Analysis: a careful treatment of the theory of the calculus of functions of a real variable, covering the real number system, limits, continuity, derivatives and the Riemann integral. It adds a final module on sequences of functions and metric spaces. The sequence, explanations and exercises are original. This site is not affiliated with the University of Illinois, and nothing here is taken from that course's materials.

The course is fully rigorous. Each theorem is given with every hypothesis, and most theorems are proved in the lesson or in an exercise. A counterexample is shown wherever a hypothesis matters, because analysis is largely the study of what fails when you drop one. Most exercises are proofs. The prerequisite is higher-mathematics: you should already be able to write epsilon arguments and handle quantifiers without help.

Lebl's *Basic Analysis* and Trench's *Introduction to Real Analysis* are free and cover the whole course, and MIT 18.100A and Francis Su's recorded lectures offer a second voice. Try each theorem yourself before reading its proof, and afterwards close the page and rebuild the plan from memory.`,
  difficulty: 'advanced',
  estimatedHours: 90,
  prerequisites: ['higher-mathematics'],
  recommendedBackground: [
    'Comfort with writing proofs, including negating quantified statements',
    'Calculus I-III, for intuition and examples',
  ],
  tags: ['analysis', 'proofs', 'limits', 'continuity', 'Riemann integral', 'uniform convergence', 'metric spaces'],
  core: false,
  modules: [
    {
      slug: 'the-real-numbers',
      title: 'The Real Numbers',
      description:
        'The ordered field axioms, the completeness axiom and the facts that follow: the Archimedean property, density and nested intervals.',
      lessons: [
        {
          slug: 'ordered-fields-and-completeness',
          title: 'Ordered fields and completeness',
          summary:
            'Why $\\mathbb{Q}$ has gaps, a precise proof of that fact, and the completeness axiom that closes them.',
          estimatedMinutes: 150,
          objectives: [
            'List the ordered field axioms and derive basic facts from them',
            'Define supremum and prove that it is unique when it exists',
            'Prove that $\\mathbb{Q}$ does not have the least upper bound property',
            'State the completeness axiom and derive the infimum version',
          ],
          concepts: [
            'Ordered field',
            'Upper bound and supremum',
            'Least upper bound property',
            'Greatest lower bound',
            'Absolute value and triangle inequality',
            'Gaps in the rationals',
          ],
          explanation: `The real numbers are an **ordered field** with one further property. Field axioms govern $+$ and $\\cdot$. Order axioms say that $\\le$ is a total order, that $x\\le y$ implies $x+z\\le y+z$, and that $x,y\\ge0$ implies $xy\\ge0$. From these you can derive everything algebraic: $x^2\\ge0$, $0<1$, and the **triangle inequality** $|x+y|\\le|x|+|y|$. However, $\\mathbb{Q}$ satisfies all of them too, so analysis needs more.

**Completeness axiom.** Every non-empty subset of $\\mathbb{R}$ that is bounded above has a least upper bound.

A set has at most one supremum: if $s,s'$ are both least upper bounds, then $s\\le s'$ and $s'\\le s$. Applying the axiom to $-A$ gives that every non-empty set bounded below has an infimum, $\\inf A=-\\sup(-A)$.

**Worked example.** The set $S=\\{x\\in\\mathbb{Q}:x>0,\\ x^2<2\\}$ has no supremum in $\\mathbb{Q}$.

*Proof.* Note that $1\\in S$, and $2$ is an upper bound of $S$ in $\\mathbb{Q}$. Suppose $s\\in\\mathbb{Q}$ is the least upper bound of $S$ in $\\mathbb{Q}$. Then $s\\ge1>0$. Define the rational number
$$t=s-\\frac{s^2-2}{s+2}=\\frac{2s+2}{s+2}>0.$$
A direct computation gives
$$t^2-2=\\frac{2(s^2-2)}{(s+2)^2}.$$
So $t^2-2$ has the same sign as $s^2-2$.

*Case $s^2<2$.* Then $t>s$ and $t^2<2$, so $t\\in S$ and $t$ exceeds the upper bound $s$, a contradiction.

*Case $s^2>2$.* Then $t<s$ and $t^2>2$. If $x\\in S$, then $x^2<2<t^2$ with $x,t>0$, so $x<t$. Thus $t$ is a smaller upper bound, a contradiction.

*Case $s^2=2$.* This is impossible, because no rational number squares to 2. $\\square$

Look at what is special here: the formula for $t$ is rational in $s$, so the proof stays inside $\\mathbb{Q}$, and it shows a gap, not merely that a certain equation has no rational solution.

**Pitfall.** Do not confuse a supremum with a maximum. $\\sup(0,1)=1$, and $1\\notin(0,1)$. Do not write $\\sup A$ until you have checked that $A$ is non-empty and bounded above. And "the supremum exists in $\\mathbb{Q}$" and "the supremum exists in $\\mathbb{R}$" are different questions: $S$ above is bounded in both, and only in $\\mathbb{R}$ is the supremum there.`,
          resources: [
            { ...lebl, primary: true, note: 'The opening chapter, on the real numbers, covers ordered fields and the least upper bound property.' },
            { ...suLectures, note: 'The first lectures cover ordered sets, fields and the least upper bound property.' },
            { ...hunter, note: 'Its chapter on the real numbers gives a second, slightly fuller treatment.' },
          ],
          exercises: [
            {
              slug: 'axioms-to-facts',
              title: 'Deriving facts from the axioms',
              prompt: `In an ordered field, prove using only the axioms: (a) $x\\cdot0=0$. (b) $(-1)x=-x$. (c) $x^2\\ge0$, and hence $0<1$. (d) If $0<x<y$, then $0<\\frac1y<\\frac1x$. (e) $||x|-|y||\\le|x-y|$. Then prove that no order on the field $\\mathbb{Z}_5$ can satisfy the axioms.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the last part: in an ordered field, $0<1<1+1<\\dots$, and so a sum of 1s can never be 0.',
            },
            {
              slug: 'sup-epsilon-form',
              title: 'The epsilon form of the supremum',
              prompt: `Let $A\\subseteq\\mathbb{R}$ be non-empty, and let $s$ be an upper bound of $A$. Prove that $s=\\sup A$ if and only if for each $\\varepsilon>0$ there is an $a\\in A$ with $a>s-\\varepsilon$. Deduce that if $s=\\sup A$ and $s\\notin A$, then each interval $(s-\\varepsilon,s)$ contains infinitely many points of $A$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'roots-exist',
              title: 'Roots exist',
              prompt: `Let $y>0$ and let $n\\ge1$ be an integer. Prove that there is a unique $x>0$ with $x^n=y$, using $x=\\sup\\{t>0:t^n<y\\}$. Handle both directions by an explicit estimate. Use the identity $b^n-a^n=(b-a)(b^{n-1}+b^{n-2}a+\\dots+a^{n-1})$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the completeness axiom a statement about subsets, unlike the other axioms?',
              answerOutline: `The field and order axioms speak about individual elements, and they hold in $\\mathbb{Q}$. Completeness quantifies over sets, and it is the axiom $\\mathbb{Q}$ fails. It is what creates new numbers such as $\\sqrt2$.`,
            },
            {
              question: 'What are the two hypotheses of the axiom, and what happens if each one is dropped?',
              answerOutline: `Non-empty: every real is an upper bound of $\\varnothing$, so there is no least one. Bounded above: $\\mathbb{N}$ has no upper bound at all.`,
            },
            {
              question: 'In the worked proof, why is it important that $t$ is rational?',
              answerOutline: `The claim is about upper bounds in $\\mathbb{Q}$. A contradiction needs a rational element or a rational upper bound. Choosing $\\sqrt2$ would be circular, and the formula for $t$ uses only field operations on $s$.`,
            },
          ],
        },
        {
          slug: 'archimedean-property-and-density',
          title: 'The Archimedean property, density and nested intervals',
          summary:
            'First consequences of completeness: no infinitely large numbers, rationals everywhere, and a proof that nested intervals share a point.',
          estimatedMinutes: 130,
          objectives: [
            'Prove the Archimedean property from completeness',
            'Prove that rationals and irrationals are dense',
            'Prove the nested interval theorem and know why closed and bounded are needed',
            'Use nested intervals to show that $\\mathbb{R}$ is uncountable',
          ],
          concepts: [
            'Archimedean property',
            'Floor function',
            'Density of $\\mathbb{Q}$',
            'Density of the irrationals',
            'Nested interval theorem',
            'Uncountability of $\\mathbb{R}$',
          ],
          explanation: `**Archimedean property.** For each real $x$, there is an $n\\in\\mathbb{N}$ with $n>x$. Equivalently, for $\\varepsilon>0$ there is an $n$ with $\\frac1n<\\varepsilon$. The proof uses completeness: if $\\mathbb{N}$ were bounded above, with supremum $s$, then some $n>s-1$, so $n+1>s$, a contradiction. It really does need completeness, since there are ordered fields, such as rational functions in one variable, in which it fails.

**Density.** For reals $a<b$, there is a rational $r$ with $a<r<b$. Choose $n$ with $\\frac1n<b-a$. Let $m$ be the least integer with $m>na$, which exists by the Archimedean property and well-ordering. Then $m-1\\le na$, so $a<\\frac mn\\le a+\\frac1n<b$. Applying this to $(a-\\sqrt2,b-\\sqrt2)$ and adding $\\sqrt2$ gives an irrational between $a$ and $b$.

**Worked example (nested interval theorem).** Let $I_n=[a_n,b_n]$ with $a_n\\le b_n$ and $I_1\\supseteq I_2\\supseteq\\cdots$. Then $\\bigcap_nI_n\\ne\\varnothing$. If also $b_n-a_n\\to0$, the intersection is a single point.

*Proof.* Nesting gives $a_m\\le a_{\\max(m,n)}\\le b_{\\max(m,n)}\\le b_n$ for all $m,n$. So each $b_n$ is an upper bound of $A=\\{a_m\\}$. Let $x=\\sup A$. Then $a_n\\le x$ for all $n$, and $x\\le b_n$ for all $n$, since $x$ is the least upper bound. So $x\\in I_n$ for each $n$.

For the second claim, if $x<y$ both lie in the intersection, then $y-x\\le b_n-a_n$ for all $n$, which forces $y-x\\le 0$. $\\square$

Both conditions matter. For $I_n=(0,\\frac1n)$ (not closed), the intersection is empty. For $I_n=[n,\\infty)$ (not bounded), it is empty too. In $\\mathbb{Q}$, the theorem fails: intervals of rationals that close in on $\\sqrt2$ have no common rational point.

**An application.** $\\mathbb{R}$ is uncountable, with no decimals. Given any list $x_1,x_2,\\dots$, choose $I_1$ closed, bounded and non-degenerate with $x_1\\notin I_1$, then $I_2\\subseteq I_1$ of the same type with $x_2\\notin I_2$, and so on. A point of the intersection is not on the list.

**Pitfall.** "A sequence of nested non-empty sets has non-empty intersection" is false in general. When you use the theorem, say why each set is closed, bounded and non-empty.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on real numbers, on properties of the real numbers.' },
            { ...trench, note: 'Its first chapter gives another treatment of the real number system.' },
          ],
          exercises: [
            {
              slug: 'floor-and-density',
              title: 'Floor and density',
              prompt: `Prove: (a) for each real $x$ there is a unique integer $n$ with $n\\le x<n+1$. (b) Each real $x$ is the limit of a sequence of rationals. (c) The set $\\{\\frac{m}{2^k}:m\\in\\mathbb{Z},\\ k\\in\\mathbb{N}\\}$ is dense in $\\mathbb{R}$. (d) If $\\alpha$ is irrational, then $\\{m+n\\alpha:m,n\\in\\mathbb{Z}\\}$ is dense in $\\mathbb{R}$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (d), use the pigeonhole principle on the fractional parts of $k\\alpha$ for $k=0,\\dots,N$.',
            },
            {
              slug: 'non-archimedean',
              title: 'A non-Archimedean field',
              prompt: `Let $F$ be the field of rational functions $p(x)/q(x)$ with real coefficients. Declare $f>0$ if the leading coefficients of its numerator and denominator have the same sign. Take as given that this makes $F$ an ordered field. Show that $x$ is larger than every natural number in $F$, and that $\\frac1x$ is positive and smaller than every $\\frac1n$. Then show directly that $\\mathbb{N}\\subset F$ is bounded above but has no least upper bound in $F$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'nested-failures',
              title: 'Where the nested theorem fails',
              prompt: `Decide whether each intersection is empty, and prove it. (a) $\\bigcap_n(0,\\frac1n]$. (b) $\\bigcap_n[0,\\frac1n)$. (c) $\\bigcap_n(-\\frac1n,1+\\frac1n)$. (d) $\\bigcap_n[n,n+1]$. (e) Give a nested sequence of non-empty closed bounded subsets of $\\mathbb{Q}$, in the sense of rational points of intervals with rational ends, whose intersection is empty in $\\mathbb{Q}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where in the proof of density is the Archimedean property used?',
              answerOutline: `Twice: to get $n$ with $\\frac1n<b-a$, and to know that some integer exceeds $na$, so that a least such integer exists. Taking the average of $a,b$ does not work, as it need not be rational.`,
            },
            {
              question: 'What does the nested interval theorem use from completeness?',
              answerOutline: `The existence of $\\sup\\{a_n\\}$. A point in all the intervals is created by the supremum. In $\\mathbb{Q}$, that is exactly what may not exist.`,
            },
            {
              question: 'If each $I_n$ is a closed bounded interval, but they are not nested, can the intersection be empty? Why does nesting matter in the proof?',
              answerOutline: `Yes: $[n,n+1]$ and $[n+2,n+3]$ are disjoint. Nesting gives $a_m\\le b_n$ for all $m,n$, which makes each $b_n$ an upper bound of $\\{a_m\\}$.`,
            },
          ],
        },
        {
          slug: 'working-with-suprema',
          title: 'Working with suprema of functions and sets',
          summary:
            'Standard techniques for suprema, including inequalities on functions, which appear throughout the rest of the course.',
          estimatedMinutes: 110,
          objectives: [
            'Prove inequalities between suprema',
            'Prove the rules for sums and scalar multiples of suprema',
            'Show when an inequality between suprema is strict',
            'Use the "fix one variable" technique for double suprema',
          ],
          concepts: [
            'Supremum of a function',
            'Upper bound technique',
            'Sum of suprema',
            'Iterated suprema',
            'Bounded functions',
          ],
          explanation: `For a bounded function $f:D\\to\\mathbb{R}$ with $D\\ne\\varnothing$, write $\\sup_Df=\\sup\\{f(x):x\\in D\\}$. Integrals, uniform norms and upper sums are all built from such suprema, so these tricks will recur.

Most proofs use one of two patterns.

- **To show $\\sup A\\le c$:** show that $c$ is an upper bound of $A$.
- **To show $\\sup A\\ge c$:** show, for each $\\varepsilon>0$, that some $a\\in A$ has $a>c-\\varepsilon$.

**Worked example.** Let $f,g:D\\to\\mathbb{R}$ be bounded. Then
$$\\sup_D(f+g)\\le\\sup_Df+\\sup_Dg,$$
and the inequality can be strict.

*Proof.* Let $x\\in D$. Then $f(x)\\le\\sup f$ and $g(x)\\le\\sup g$, so $f(x)+g(x)\\le\\sup f+\\sup g$. Thus the right side is an upper bound of $f+g$, and so it is at least the least upper bound. $\\square$

*Strictness.* On $D=[0,1]$, take $f(x)=x$ and $g(x)=1-x$. Then $\\sup(f+g)=1$, whereas $\\sup f+\\sup g=2$. The two suprema are reached at different points.

Compare this with sets. For the set sum $A+B=\\{a+b\\}$, equality does hold: $\\sup(A+B)=\\sup A+\\sup B$. Given $\\varepsilon>0$, pick $a>\\sup A-\\frac\\varepsilon2$ and $b>\\sup B-\\frac\\varepsilon2$, and then $a+b$ beats $\\sup A+\\sup B-\\varepsilon$. Why the difference? In $A+B$, the two terms are chosen independently, while in $f+g$, they share one $x$.

**Scalars.** For $c\\ge0$, $\\sup(cf)=c\\sup f$. For $c<0$, $\\sup(cf)=c\\inf f$. Forgetting the sign flip is a common slip.

**Double suprema.** $\\sup_x\\sup_yh(x,y)=\\sup_y\\sup_xh(x,y)=\\sup_{x,y}h(x,y)$. However, $\\sup_x\\inf_yh\\le\\inf_y\\sup_xh$ can be strict, which mirrors the rule on swapping quantifiers. For $h(x,y)=(x-y)^2$ on $[0,1]^2$, the left side is $0$, and the right side is $\\frac14$.

**Pitfall.** "$f(x)<g(x)$ for all $x$ implies $\\sup f<\\sup g$" is false: only $\\le$ survives. With $f(x)=x$ and $g(x)=x+\\frac{1-x}{2}$ on $[0,1)$, $f<g$, but both suprema equal 1. Strict inequalities can turn into equalities when you pass to suprema, just as they do with limits.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on using suprema and infima, and on bounded functions.' },
            { ...interactiveAnalysis, note: 'Use its section on the real numbers for a second set of examples.' },
          ],
          exercises: [
            {
              slug: 'sup-inf-identities',
              title: 'Supremum identities',
              prompt: `For bounded functions on a non-empty set $D$, prove: (a) $\\inf f+\\inf g\\le\\inf(f+g)\\le\\inf f+\\sup g\\le\\sup(f+g)\\le\\sup f+\\sup g$. (b) $|\\sup f-\\sup g|\\le\\sup|f-g|$. (c) $\\sup|f|-\\inf|f|\\le\\sup f-\\inf f$. (d) $\\sup f-\\inf f=\\sup\\{|f(x)-f(y)|:x,y\\in D\\}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sup-products',
              title: 'Products and strictness',
              prompt: `For non-empty bounded $A,B\\subseteq[0,\\infty)$, prove that $\\sup(AB)=\\sup A\\sup B$. Give an example with general real sets for which this fails. Then, for bounded non-negative functions $f,g$ on $D$, prove $\\sup(fg)\\le\\sup f\\sup g$, and show by example that it can be strict.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'minimax-example',
              title: 'Sup of inf versus inf of sup',
              prompt: `Prove that $\\sup_{x\\in X}\\inf_{y\\in Y}h(x,y)\\le\\inf_{y\\in Y}\\sup_{x\\in X}h(x,y)$ for any bounded $h$ on $X\\times Y$. Compute both sides for $h(x,y)=(x-y)^2$ on $[0,1]^2$, and for $h(x,y)=xy$ on $[-1,1]^2$. In which is the inequality strict?`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\sup(f+g)$ only at most $\\sup f+\\sup g$, while $\\sup(A+B)$ equals $\\sup A+\\sup B$?',
              answerOutline: `In $f+g$ both functions are evaluated at the same $x$, so the two peaks may be at different points. In $A+B$, $a$ and $b$ are chosen independently, so each term can be near its own supremum.`,
            },
            {
              question: 'To show $\\sup A\\ge c$, is it enough to find one element of $A$ that is at least $c$?',
              answerOutline: `It is enough, but not always possible, as the sup may not be attained. The general method is to find, for each $\\varepsilon>0$, an element above $c-\\varepsilon$.`,
            },
            {
              question: 'What is $\\sup_{[0,1]}(-f)$, in terms of $f$?',
              answerOutline: `$-\\inf_{[0,1]}f$. Multiplying by a negative number swaps sup and inf.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'sequences-and-series',
      title: 'Sequences and Series',
      description:
        'Limit theorems, limsup and liminf, Bolzano-Weierstrass, Cauchy sequences, and series, with care over conditional convergence.',
      lessons: [
        {
          slug: 'limits-and-subsequences',
          title: 'Limits of sequences and subsequences',
          summary:
            'Rigorous limit arguments for non-trivial sequences, using Bernoulli-style estimates, the squeeze theorem and subsequences.',
          estimatedMinutes: 130,
          objectives: [
            'Prove limits by estimates obtained from the binomial theorem or Bernoulli\'s inequality',
            'Use the squeeze theorem and the limit laws with their hypotheses stated',
            'Prove that subsequences of a convergent sequence converge to the same limit',
            'Use subsequences to prove divergence',
          ],
          concepts: [
            'Epsilon-N definition',
            'Limit laws',
            'Squeeze theorem',
            'Subsequence',
            'Standard limits',
            'Divergence through subsequences',
          ],
          explanation: `Recall that $a_n\\to L$ means that for each $\\varepsilon>0$ there is an $N$ with $|a_n-L|<\\varepsilon$ for all $n\\ge N$. You have proved the limit laws: sums, products and quotients (with a non-zero limit in the denominator) behave as expected, and $a_n\\le b_n$ passes to the limit as $\\lim a_n\\le\\lim b_n$, with strict inequality possibly lost. The squeeze theorem is similar. Each law needs the limits to *exist* to begin with.

A **subsequence** is $(a_{n_k})$ with $n_1<n_2<\\cdots$. Note that $n_k\\ge k$, by induction. If $a_n\\to L$, then each subsequence tends to $L$, since $k\\ge N$ gives $n_k\\ge N$. Hence two subsequences with different limits prove divergence.

**Worked example.** Prove that $\\lim n^{1/n}=1$.

*Proof.* For $n\\ge2$ we have $n^{1/n}>1$. Write $n^{1/n}=1+h_n$ with $h_n>0$. By the binomial theorem, all of whose terms are positive here,
$$n=(1+h_n)^n\\ge\\binom n2h_n^2=\\frac{n(n-1)}2h_n^2.$$
Therefore $h_n^2\\le\\frac2{n-1}$, and $0<h_n\\le\\sqrt{\\frac2{n-1}}$. Let $\\varepsilon>0$. Choose an integer $N>1+\\frac2{\\varepsilon^2}$. For $n\\ge N$, we get $\\frac2{n-1}<\\varepsilon^2$, so $0<h_n<\\varepsilon$. So $n^{1/n}\\to1$. $\\square$

The technique is to isolate a small quantity $h_n$, then use a single term of an expansion to bound it. Keeping one term is enough. The first-order term would give only $h_n\\le\\frac{n-1}{n}$, which is not good enough, so the second-order term is the right one.

The same approach shows that for $0<r<1$, $r^n\\to0$: write $\\frac1r=1+h$ with $h>0$, and Bernoulli's inequality gives $r^{-n}\\ge1+nh$. For a real $p$ and $|r|<1$, $n^pr^n\\to0$. And $\\frac{r^n}{n!}\\to0$ for each real $r$. Exponentials beat powers, and factorials beat exponentials. Each of these can be proved by the same style of estimate, or by the ratio argument in the exercises.

**Pitfall.** You cannot apply the limit laws to an unbounded number of terms. "$\\frac1n+\\dots+\\frac1n$ ($n$ terms) tends to $0+\\dots+0=0$" is wrong, because the sum is 1. The limit laws apply to a fixed, finite number of sequences. A similar error is $\\lim(1+\\frac1n)^n=1^\\infty=1$. In this expression, the number of factors grows with $n$. In fact the limit is $e\\approx2.718$.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on sequences and series: sequences and limits, facts about limits.' },
            { ...mit18100a, note: 'The lectures and notes on sequences and their limits.' },
          ],
          exercises: [
            {
              slug: 'standard-limits',
              title: 'Standard limits',
              prompt: `Prove: (a) for $a>0$, $a^{1/n}\\to1$. (b) For $|r|<1$ and a fixed integer $p\\ge1$, $n^pr^n\\to0$. (c) For each real $r$, $\\frac{r^n}{n!}\\to0$. (d) $\\frac{n!}{n^n}\\to0$. (e) $(n!)^{1/n}\\to\\infty$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (b), consider the ratio of consecutive terms. For (e), keep only the largest $\\lceil n/2\\rceil$ factors.',
            },
            {
              slug: 'cesaro-means',
              title: 'Cesaro means',
              prompt: `If $a_n\\to L$, prove that the averages $c_n=\\frac1n(a_1+\\dots+a_n)$ tend to $L$. Show that the converse fails. Then use the result to find $\\lim\\frac1n\\sum_{k=1}^nk^{1/k}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'subsequence-facts',
              title: 'Subsequences',
              prompt: `Prove: (a) if the even-indexed and odd-indexed subsequences of $(a_n)$ both tend to $L$, then $a_n\\to L$. (b) $(\\sin n)$ has no limit. (c) If each subsequence of $(a_n)$ has a further subsequence tending to $L$, then $a_n\\to L$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), suppose $\\sin n\\to L$. Then $\\sin(n+1)-\\sin(n-1)=2\\cos n\\sin1$ forces $\\cos n\\to0$, so $|L|=1$, and then $\\sin2n=2\\sin n\\cos n\\to0$ gives a contradiction. For (c), negate the conclusion.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is wrong with $\\lim(1+\\frac1n)^n=(\\lim(1+\\frac1n))^n=1$?',
              answerOutline: `The exponent still contains $n$. The limit law for products needs a fixed number of factors. The limit is $e$, not 1.`,
            },
            {
              question: 'Why does $n_k\\ge k$ matter?',
              answerOutline: `It says that a subsequence's terms go at least as far out as their index. It gives directly that if the terms are within $\\varepsilon$ of $L$ for $n\\ge N$, then the subsequence is too for $k\\ge N$.`,
            },
            {
              question: 'In the worked example, why does one use the $\\binom n2$ term and not the linear term?',
              answerOutline: `The linear term gives $h_n\\le\\frac{n-1}{n}$, which does not tend to 0. The quadratic term gives $h_n^2\\le\\frac2{n-1}$, and that does.`,
            },
          ],
        },
        {
          slug: 'monotone-sequences-and-limsup',
          title: 'Monotone sequences, limsup and liminf',
          summary:
            'Monotone convergence, and two quantities that exist for every bounded sequence and decide convergence.',
          estimatedMinutes: 140,
          objectives: [
            'Prove the monotone convergence theorem',
            'Define limsup and liminf and compute them',
            'Prove that a bounded sequence converges exactly when limsup equals liminf',
            'Explain limsup as the largest subsequential limit',
          ],
          concepts: [
            'Monotone convergence theorem',
            'Tail suprema',
            'Limit superior',
            'Limit inferior',
            'Subsequential limit',
            'The number $e$',
          ],
          explanation: `Every bounded monotone sequence converges: an increasing bounded sequence tends to its supremum. That is how we get limits without knowing their values, as in the definition $e=\\lim(1+\\frac1n)^n$.

A general bounded sequence need not converge, but it has two monotone shadows. Let
$$t_n=\\sup_{k\\ge n}a_k,\\qquad s_n=\\inf_{k\\ge n}a_k.$$
The sets shrink with $n$, so $(t_n)$ is decreasing and $(s_n)$ is increasing, and both are bounded. Thus both converge, and we define $\\limsup a_n=\\lim t_n$ and $\\liminf a_n=\\lim s_n$. These always exist for bounded sequences, which is why they are so useful. Clearly $\\liminf a_n\\le\\limsup a_n$.

**Worked example.** Theorem: a bounded sequence converges to $L$ if and only if $\\limsup a_n=\\liminf a_n=L$.

*Proof.* ($\\Leftarrow$) Since $s_n\\le a_n\\le t_n$, and both outer sequences tend to $L$, the squeeze theorem gives $a_n\\to L$.

($\\Rightarrow$) Let $\\varepsilon>0$, and choose $N$ with $L-\\varepsilon<a_k<L+\\varepsilon$ for all $k\\ge N$. For $n\\ge N$, taking sup and inf over $k\\ge n$ gives $L-\\varepsilon\\le s_n\\le t_n\\le L+\\varepsilon$. Passing to the limit, $L-\\varepsilon\\le\\liminf a_n\\le\\limsup a_n\\le L+\\varepsilon$. As $\\varepsilon$ was arbitrary, both equal $L$. $\\square$

*Computing.* For $a_n=(-1)^n(1+\\frac1n)$: the even terms $1+\\frac1n$ decrease to 1, and the odd terms increase to $-1$. Then $t_n=1+\\frac{1}{n}$ for even $n$, and $t_n=1+\\frac1{n+1}$ for odd $n$. So $t_n\\to1$. Likewise $s_n\\to-1$. So $\\limsup a_n=1$ and $\\liminf a_n=-1$. Note that $t_n$ is a supremum over a tail, and not the same as $a_n$.

**Interpretation.** $\\limsup a_n$ is the largest limit of any subsequence, and $\\liminf a_n$ the smallest. In the example, the subsequences tend to $1$ or $-1$.

An equivalent working form: $\\limsup a_n<c$ implies $a_n<c$ for all large $n$. And $\\limsup a_n>c$ implies $a_n>c$ for infinitely many $n$. These two are what the root test uses.

**Pitfall.** $\\limsup(a_n+b_n)$ need not equal $\\limsup a_n+\\limsup b_n$. It is only $\\le$, which is the same phenomenon as sup of a sum. With $a_n=(-1)^n$ and $b_n=-a_n$, the left is 0, and the right is 2. Also, $\\sup a_n$ and $\\limsup a_n$ are different: $\\frac1n$ has supremum 1 and limsup 0. The limsup ignores any finite number of terms.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on monotone sequences and on limit superior, limit inferior and Bolzano-Weierstrass.' },
            { ...interactiveAnalysis, note: 'Its sequences chapter has interactive examples of lim sup and lim inf.' },
          ],
          exercises: [
            {
              slug: 'compute-limsup',
              title: 'Compute limsup and liminf',
              prompt: `Find the limsup and liminf, with proof. (a) $a_n=\\cos\\frac{n\\pi}{3}$. (b) $a_n=(-1)^n\\frac{n}{n+1}$. (c) $a_n=(1+(-1)^n)n^{1/n}$. (d) $a_n=\\frac{1}{n}+\\sin\\frac{n\\pi}{2}$. For each, give the set of all subsequential limits.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'limsup-properties',
              title: 'Properties of limsup',
              prompt: `For bounded sequences, prove: (a) $\\limsup(a_n+b_n)\\le\\limsup a_n+\\limsup b_n$. (b) If $a_n\\to a$, then $\\limsup(a_n+b_n)=a+\\limsup b_n$. (c) There is a subsequence tending to $\\limsup a_n$. (d) Every subsequential limit lies between $\\liminf a_n$ and $\\limsup a_n$. (e) If $a_n>0$, then $\\limsup a_n^{1/n}\\le\\limsup\\frac{a_{n+1}}{a_n}$, when the right side is finite.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'e-exists',
              title: 'The number e',
              prompt: `Let $a_n=(1+\\frac1n)^n$ and $b_n=\\sum_{k=0}^n\\frac1{k!}$. (a) Show that $(a_n)$ is increasing and $a_n\\le b_n<3$, expanding by the binomial theorem. (b) Show that for each fixed $m$, $\\liminf a_n\\ge b_m$. (c) Deduce that both sequences have the same limit $e$. (d) Prove $0<e-b_n<\\frac1{n\\cdot n!}$, and use it to prove that $e$ is irrational.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $(t_n)$ decreasing?',
              answerOutline: `$t_{n+1}$ is the sup of a smaller set than $t_n$, and shrinking a set cannot raise its supremum.`,
            },
            {
              question: 'What does $\\limsup a_n=+\\infty$ mean, and why is it excluded here?',
              answerOutline: `It means that the sequence is not bounded above. Then $t_n$ is not defined as a real number. Some texts extend the definition, but this lesson works with bounded sequences.`,
            },
            {
              question: 'Give a bounded sequence with $\\limsup a_n=2$ and $\\sup a_n=5$.',
              answerOutline: `For example, $a_1=5$ and $a_n=2$ for $n\\ge2$. The limsup ignores finitely many terms, and the sup does not.`,
            },
          ],
        },
        {
          slug: 'bolzano-weierstrass-and-cauchy',
          title: 'Bolzano-Weierstrass and Cauchy sequences',
          summary:
            'Every bounded sequence has a convergent subsequence, and a sequence converges exactly when it is Cauchy.',
          estimatedMinutes: 140,
          objectives: [
            'Prove that every sequence has a monotone subsequence',
            'Prove the Bolzano-Weierstrass theorem',
            'Prove that a real sequence converges if and only if it is Cauchy',
            'Use the Cauchy criterion to prove convergence without knowing the limit',
          ],
          concepts: [
            'Peak index',
            'Monotone subsequence',
            'Bolzano-Weierstrass theorem',
            'Cauchy sequence',
            'Completeness of $\\mathbb{R}$',
            'Contractive sequences',
          ],
          explanation: `**Worked example 1.** Every real sequence has a monotone subsequence.

*Proof.* Call $n$ a **peak** if $a_n\\ge a_k$ for all $k>n$. If there are infinitely many peaks $n_1<n_2<\\cdots$, then $a_{n_1}\\ge a_{n_2}\\ge\\cdots$ is a decreasing subsequence. If there are only finitely many, pick $n_1$ greater than all of them. Since $n_1$ is not a peak, there is $n_2>n_1$ with $a_{n_2}>a_{n_1}$. Then $n_2$ is not a peak, and so on. This gives an increasing subsequence. $\\square$

**Bolzano-Weierstrass theorem.** Every bounded real sequence has a convergent subsequence. It follows directly: a bounded monotone subsequence converges. This theorem is the main tool for compactness arguments. Whenever a proof needs a limit point to exist, it probably comes from here.

**Cauchy sequences.** $(a_n)$ is **Cauchy** if for each $\\varepsilon>0$ there is an $N$ with $|a_m-a_n|<\\varepsilon$ for all $m,n\\ge N$. The definition does not mention a limit: the terms get close to *each other*.

**Worked example 2.** A real sequence converges if and only if it is Cauchy.

*Proof.* ($\\Rightarrow$) If $a_n\\to L$, then choose $N$ with $|a_n-L|<\\frac\\varepsilon2$ for $n\\ge N$. Then for $m,n\\ge N$, $|a_m-a_n|\\le|a_m-L|+|L-a_n|<\\varepsilon$.

($\\Leftarrow$) Let $(a_n)$ be Cauchy. It is bounded: taking $\\varepsilon=1$, all terms from $N$ on lie within 1 of $a_N$, and finitely many terms remain. By Bolzano-Weierstrass, some subsequence $a_{n_k}\\to L$. Let $\\varepsilon>0$. Choose $N$ so that $|a_m-a_n|<\\frac\\varepsilon2$ for $m,n\\ge N$, and choose $k$ with $n_k\\ge N$ and $|a_{n_k}-L|<\\frac\\varepsilon2$. For $n\\ge N$,
$$|a_n-L|\\le|a_n-a_{n_k}|+|a_{n_k}-L|<\\varepsilon.\\ \\square$$

The second direction fails in $\\mathbb{Q}$: decimal truncations of $\\sqrt2$ are Cauchy, with no rational limit. It uses completeness, through monotone convergence. In fact, "every Cauchy sequence converges" together with the Archimedean property is equivalent to the least upper bound property, and in the metric space module, it becomes the definition of completeness.

**Pitfall.** "$|a_{n+1}-a_n|\\to0$" does not make a sequence Cauchy. For $a_n=\\sqrt n$, consecutive terms get close, but the sequence diverges. A Cauchy condition controls all pairs $m,n\\ge N$. A different but valid test: if $|a_{n+1}-a_n|\\le cr^n$ with $0<r<1$, then the sequence is Cauchy, because the geometric series bounds $|a_m-a_n|$.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on Bolzano-Weierstrass and on Cauchy sequences.' },
            { ...suLectures, note: 'The lectures on sequences, subsequences and Cauchy sequences give a metric-space flavour.' },
          ],
          exercises: [
            {
              slug: 'bisection-proof',
              title: 'A second proof of Bolzano-Weierstrass',
              prompt: `Prove the Bolzano-Weierstrass theorem by repeated bisection: at each stage, keep a half containing infinitely many terms. Use the nested interval theorem, and be careful to choose strictly increasing indices. Then deduce the theorem from the limsup construction, with no bisection.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'contractive',
              title: 'Contractive sequences',
              prompt: `Suppose that $|a_{n+2}-a_{n+1}|\\le r|a_{n+1}-a_n|$ for all $n$, with $0<r<1$. Prove that $(a_n)$ converges. Apply this to $a_1=1$, $a_{n+1}=\\frac1{1+a_n}$: show that $r=\\frac49$ works for all $n\\ge 2$, and find the limit. Then show that, for this sequence, the terms are not monotone.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'All terms from $a_2$ on lie in $[\\frac12,1]$, so $(1+a_n)(1+a_{n+1})\\ge\\frac94$.',
            },
            {
              slug: 'cauchy-not-consecutive',
              title: 'Consecutive terms are not enough',
              prompt: `(a) Show that $a_n=\\sum_{k=1}^n\\frac1k$ has $|a_{n+1}-a_n|\\to0$ but is not Cauchy, by bounding $a_{2n}-a_n$ below. (b) Prove that if $\\sum|a_{n+1}-a_n|$ converges, then $(a_n)$ is Cauchy. (c) Give a convergent sequence for which $\\sum|a_{n+1}-a_n|$ diverges.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do Cauchy sequences matter if they are the same as convergent sequences?',
              answerOutline: `Their definition does not mention the limit. You can prove convergence when you cannot name the limit. It also carries over to spaces where the two notions differ, which is what completeness means.`,
            },
            {
              question: 'Does Bolzano-Weierstrass need boundedness? Does it give a limit in the same set?',
              answerOutline: `Yes: $a_n=n$ has no convergent subsequence. The limit need not lie in a set containing the terms: $\\frac1n$ in $(0,1]$ tends to 0. Closed sets fix this, which leads to compactness.`,
            },
            {
              question: 'Where does the proof that Cauchy implies convergent use completeness?',
              answerOutline: `In Bolzano-Weierstrass, which uses monotone convergence and thus the supremum. The other steps hold in any ordered field.`,
            },
          ],
        },
        {
          slug: 'series-and-convergence-tests',
          title: 'Series and convergence tests',
          summary:
            'Partial sums, the Cauchy criterion, comparison, condensation, and the ratio and root tests with exact hypotheses.',
          estimatedMinutes: 150,
          objectives: [
            'Define convergence of a series and use the Cauchy criterion',
            'Prove the comparison and Cauchy condensation tests',
            'State and apply the ratio and root tests, including their inconclusive cases',
            'Decide convergence of $\\sum n^{-p}$ with proof',
          ],
          concepts: [
            'Partial sums',
            'Term test',
            'Geometric series',
            'Comparison test',
            'Cauchy condensation',
            'Root test',
            'Ratio test',
          ],
          explanation: `A series $\\sum a_n$ **converges** if its partial sums $s_n=\\sum_{k=1}^na_k$ converge. All series facts are sequence facts about $(s_n)$. The Cauchy criterion becomes: for each $\\varepsilon>0$ there is an $N$ with $|a_{m+1}+\\dots+a_n|<\\varepsilon$ for $n>m\\ge N$. Taking $n=m+1$ gives the **term test**: if $\\sum a_n$ converges, then $a_n\\to0$. The converse is false, as the harmonic series shows.

For non-negative terms, $(s_n)$ is increasing, so the series converges if and only if the partial sums are bounded. That gives the **comparison test**: if $0\\le a_n\\le b_n$ and $\\sum b_n$ converges, then so does $\\sum a_n$.

**Worked example (Cauchy condensation).** Let $(a_n)$ be decreasing and non-negative. Then $\\sum a_n$ converges if and only if $\\sum2^ka_{2^k}$ converges.

*Proof.* Group the terms in dyadic blocks. Since $(a_n)$ decreases,
$$a_{2^k+1}+\\dots+a_{2^{k+1}}\\le2^ka_{2^k},\\qquad a_{2^{k}}+\\dots+a_{2^{k+1}-1}\\ge2^ka_{2^{k+1}}=\\tfrac12\\,2^{k+1}a_{2^{k+1}}.$$
Summing over $k=0,\\dots,K-1$:
$$\\sum_{n=2}^{2^K}a_n\\le\\sum_{k=0}^{K-1}2^ka_{2^k},\\qquad\\sum_{n=1}^{2^K-1}a_n\\ge\\frac12\\sum_{k=1}^{K}2^ka_{2^k}.$$
So one set of partial sums is bounded exactly when the other is. $\\square$

*Consequence.* For $a_n=n^{-p}$ with $p>0$, the condensed series is $\\sum2^{k(1-p)}$, a geometric series with ratio $2^{1-p}$. It converges exactly when $p>1$. For $p\\le0$, the term test applies. So $\\sum n^{-p}$ converges if and only if $p>1$.

**Root and ratio tests.** Let $\\alpha=\\limsup|a_n|^{1/n}$. If $\\alpha<1$, the series converges absolutely. If $\\alpha>1$, it diverges, since $|a_n|>1$ infinitely often. For the ratio test with $a_n\\ne0$: if $\\limsup|\\frac{a_{n+1}}{a_n}|<1$, it converges absolutely. If $|\\frac{a_{n+1}}{a_n}|\\ge1$ for all large $n$, it diverges.

**Pitfalls.**

- Each test says nothing in the boundary case. For both $\\sum\\frac1n$ and $\\sum\\frac1{n^2}$, the ratio and root limits equal 1, yet one diverges and the other converges.
- "$\\frac{a_{n+1}}{a_n}<1$ for all $n$" is not enough. It must stay below some $r<1$. For $\\frac1n$, the ratio is always less than 1.
- The ratio test with $\\limsup>1$ does not prove divergence. It needs the ratio $\\ge 1$ for all large $n$, or $\\liminf>1$. The root test is stronger, and it often decides such cases.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on series and on absolute convergence and tests for series.' },
            { ...trench, note: 'Its chapter on infinite sequences and series has many graded examples.' },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/taylor-series'],
          exercises: [
            {
              slug: 'decide-convergence',
              title: 'Decide convergence',
              prompt: `Decide whether each converges, naming the test and checking its hypotheses. (a) $\\sum\\frac{n^2}{2^n}$. (b) $\\sum\\frac{n!}{n^n}$. (c) $\\sum\\frac1{n\\ln n}$ for $n\\ge2$. (d) $\\sum\\frac{1}{n(\\ln n)^2}$ for $n\\ge2$. (e) $\\sum\\left(\\frac{n}{n+1}\\right)^{n^2}$. (f) $\\sum\\frac{1}{\\sqrt{n(n+1)}}$. (g) $\\sum(\\sqrt{n+1}-\\sqrt n)$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'tests-proved',
              title: 'Prove the tests',
              prompt: `Prove: (a) the root test, both directions. (b) The ratio test, both directions, as stated in this lesson. (c) Find a series for which the ratio test is inconclusive, while the root test decides it. (d) Show that if $a_n\\ge0$ is decreasing and $\\sum a_n$ converges, then $na_n\\to0$. Show by example that "decreasing" is needed.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'telescoping-values',
              title: 'Exact values',
              prompt: `Find the exact sum and prove it: (a) $\\sum_{n=1}^\\infty\\frac1{n(n+1)}$. (b) $\\sum_{n=1}^\\infty\\frac1{n(n+2)}$. (c) $\\sum_{n=1}^\\infty nr^n$ for $|r|<1$. (d) $\\sum_{n=0}^\\infty\\frac{2^n+3^n}{6^n}$. Expected values: 1, $\\frac34$, $\\frac{r}{(1-r)^2}$, $\\frac{7}{2}$.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is "$a_{n+1}/a_n<1$ for all $n$" not enough?',
              answerOutline: `The ratio needs a uniform bound $r<1$, so that the terms are dominated by a geometric series. For $\\frac1n$, the ratio is below 1, but it tends to 1, and the series diverges.`,
            },
            {
              question: 'State the term test and its limitation.',
              answerOutline: `Convergence implies $a_n\\to0$, so if $a_n\\not\\to0$ the series diverges. If $a_n\\to0$, nothing follows: the harmonic series is the standard example.`,
            },
            {
              question: 'What is the hypothesis of Cauchy condensation, and why is it needed?',
              answerOutline: `$a_n$ is non-negative and decreasing. Without monotonicity, the sampled values $a_{2^k}$ do not represent the rest. Take $a_n=1$ for $n$ odd and $0$ for $n$ even: all sampled values with $k\\ge1$ are zero, but the series diverges.`,
            },
          ],
        },
        {
          slug: 'absolute-and-conditional-convergence',
          title: 'Absolute and conditional convergence',
          summary:
            'Alternating series, why absolute convergence behaves like a finite sum, and how rearranging a conditionally convergent series changes its value.',
          estimatedMinutes: 140,
          objectives: [
            'Prove the alternating series test with its error bound',
            'Prove that absolute convergence implies convergence',
            'Prove that absolutely convergent series can be rearranged',
            'Compute a rearranged conditionally convergent sum and state Riemann\'s theorem',
          ],
          concepts: [
            'Absolute convergence',
            'Conditional convergence',
            'Alternating series test',
            'Rearrangement',
            'Riemann rearrangement theorem',
            'Cauchy product',
          ],
          explanation: `$\\sum a_n$ **converges absolutely** if $\\sum|a_n|$ converges. Then it converges, by the Cauchy criterion, since $|a_{m+1}+\\dots+a_n|\\le|a_{m+1}|+\\dots+|a_n|$. A series that converges but not absolutely is **conditionally convergent**.

**Alternating series test.** If $(b_n)$ decreases to 0, then $\\sum(-1)^{n+1}b_n$ converges, and the error after $n$ terms is at most $b_{n+1}$.

**Worked example.** Proof of this test. Let $s_n$ be the partial sums. Then
$$s_{2n+2}-s_{2n}=b_{2n+1}-b_{2n+2}\\ge0,\\qquad s_{2n+1}-s_{2n-1}=-b_{2n}+b_{2n+1}\\le0.$$
So even partial sums increase, and odd ones decrease. Also $s_{2n+1}-s_{2n}=b_{2n+1}\\ge0$. Thus each $[s_{2n},s_{2n+1}]$ contains the next one, and the lengths $b_{2n+1}$ tend to 0. By the nested interval theorem, both sequences tend to a common limit $s$. Since $s$ lies between consecutive partial sums, $|s-s_n|\\le|s_{n+1}-s_n|=b_{n+1}$. $\\square$

Both hypotheses are needed. Tending to 0 alone is not enough. For $b_n$ with $b_{2k-1}=\\frac1k$ and $b_{2k}=\\frac1{k^2}$, the terms tend to 0 but do not decrease, and the partial sums diverge.

**Rearrangement.** A rearrangement is $\\sum a_{\\sigma(n)}$, with $\\sigma:\\mathbb{N}\\to\\mathbb{N}$ a bijection. If $\\sum a_n$ converges absolutely, then each rearrangement converges to the same sum. Given $\\varepsilon$, choose $N$ with $\\sum_{n>N}|a_n|<\\varepsilon$. Beyond some point, partial sums of the rearrangement include all of $a_1,\\dots,a_N$, so the difference from the sum is less than $2\\varepsilon$.

This fails for conditional convergence. Let $A=1-\\frac12+\\frac13-\\frac14+\\dots=\\ln2$. Take two positive terms for each negative one:
$$1+\\tfrac13-\\tfrac12+\\tfrac15+\\tfrac17-\\tfrac14+\\dots$$
The partial sum after $3k$ terms is $H_{4k}-\\frac12H_{2k}-\\frac12H_k$, where $H_m=\\sum_{j\\le m}\\frac1j=\\ln m+\\gamma+o(1)$. So it tends to
$$\\ln(4k)-\\tfrac12\\ln(2k)-\\tfrac12\\ln k=\\ln4-\\tfrac12\\ln2=\\tfrac32\\ln2.$$
The same terms give a different sum. **Riemann's theorem** says that a conditionally convergent real series can be rearranged to converge to any real value, or to diverge.

**Pitfall.** Do not reorder or group series casually. Inserting parentheses in a convergent series is safe. Removing them is not: $(1-1)+(1-1)+\\dots$ converges, and $1-1+1-1+\\dots$ does not. Before you swap the order of summation, multiply series or rearrange terms, check absolute convergence. **Mertens' theorem** requires only one factor to be absolutely convergent for a Cauchy product, but two conditionally convergent series can have a divergent product.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on absolute convergence, rearrangements and more on series.' },
            { ...hunter, note: 'Its chapter on series has a thorough treatment of absolute and conditional convergence.' },
          ],
          exercises: [
            {
              slug: 'classify-absolute',
              title: 'Absolute, conditional or divergent',
              prompt: `Classify each. (a) $\\sum\\frac{(-1)^n}{\\sqrt n}$. (b) $\\sum\\frac{(-1)^n}{n^2}$. (c) $\\sum(-1)^n\\frac{n}{n+1}$. (d) $\\sum\\frac{\\sin n}{n^2}$. (e) $\\sum\\frac{(-1)^n}{n\\ln n}$, from $n=2$. (f) $\\sum(-1)^n(n^{1/n}-1)$. Hint for (f): compare with $\\frac{\\ln n}{n}$ and check monotonicity for large $n$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'rearrangement-proofs',
              title: 'Rearrangement proofs',
              prompt: `(a) Write the proof that an absolutely convergent series has all rearrangements equal in full. (b) Show that the positive terms and negative terms of a conditionally convergent series each have a divergent sum. (c) Using (b), prove Riemann's theorem for a target real value $T$: describe the algorithm and show that it converges. (d) Why does the terms' convergence to 0 matter in (c)?`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'error-of-alternating',
              title: 'Using the error bound',
              prompt: `How many terms of $\\sum_{n\\ge 1}\\frac{(-1)^{n+1}}{n^2}$ guarantee an error below $10^{-4}$ from the alternating bound? Find the true sum ($\\frac{\\pi^2}{12}$) and the actual error at that $n$. Also, use the formula $H_{4k}-\\frac12H_{2k}-\\frac12H_k$ to compute the rearranged partial sum for $k=1000$ and compare it with $\\frac32\\ln2$.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Is $\\sum\\frac{(-1)^n}{n}$ safe to rearrange? Is $\\sum\\frac{(-1)^n}{n^2}$?',
              answerOutline: `The first is conditionally convergent, so a rearrangement may change its sum. The second is absolutely convergent, so all its rearrangements have the same sum.`,
            },
            {
              question: 'Which hypotheses does the alternating series test need? Give a failure.',
              answerOutline: `$b_n\\ge0$, decreasing, with limit 0. Dropping "decreasing" fails, as the example in this lesson shows. If the limit is not 0, the term test gives divergence.`,
            },
            {
              question: 'Why does a rearrangement not violate "addition is commutative"?',
              answerOutline: `Commutativity is a statement on finite sums. An infinite sum is a limit of partial sums, and a rearrangement changes that sequence. So there is no contradiction.`,
            },
          ],
        },
      ],
      project: {
        slug: 'series-laboratory',
        title: 'A series laboratory',
        description: `Write a short report, mixing proof and computation, on how series behave near the boundary of convergence. The computation must support the proofs, not replace them. In particular, show how slowly some series converge, and why a numerical sum can mislead.`,
        deliverables: [
          'Proofs and numerical tables for $\\sum\\frac1{n\\ln n}$ and $\\sum\\frac1{n(\\ln n)^2}$, explaining why $10^6$ terms cannot tell you which one converges',
          'An implementation of the rearrangement algorithm of Riemann\'s theorem applied to the alternating harmonic series, for three targets, with a plot of partial sums',
          'A verified computation of the $\\frac32\\ln2$ rearrangement',
          'A two-page discussion of which step of each proof the numbers illustrate',
        ],
        estimatedHours: 10,
        stretchGoals: ['Produce an example of a divergent Cauchy product of two convergent series and prove it'],
      },
    },
    {
      slug: 'limits-and-continuity',
      title: 'Limits and Continuity',
      description:
        'Open and closed sets, compactness, continuity through sequences and epsilon-delta, and what compactness gives a continuous function.',
      lessons: [
        {
          slug: 'topology-of-the-line',
          title: 'Open sets, closed sets and limit points',
          summary:
            'The vocabulary for talking about "nearby": neighbourhoods, open and closed sets, limit points and closure.',
          estimatedMinutes: 130,
          objectives: [
            'Define open and closed sets, limit points and closure',
            'Prove the closure properties of open and closed sets, and give failures for infinite families',
            'Prove that a set is closed exactly when it contains its limit points',
            'Characterise closed sets through convergent sequences',
          ],
          concepts: [
            'Neighbourhood',
            'Open set',
            'Closed set',
            'Limit point',
            'Isolated point',
            'Closure',
            'Interior',
          ],
          explanation: `A set $U\\subseteq\\mathbb{R}$ is **open** if for each $x\\in U$ there is an $\\varepsilon>0$ with $(x-\\varepsilon,x+\\varepsilon)\\subseteq U$. A set is **closed** if its complement is open. These are not opposites: $\\varnothing$ and $\\mathbb{R}$ are both, and $[0,1)$ and $\\mathbb{Q}$ are neither.

Any union of open sets is open, and a *finite* intersection of open sets is open (take the smallest $\\varepsilon$). Infinite intersections can fail: $\\bigcap_n(-\\frac1n,\\frac1n)=\\{0\\}$. Dually, any intersection of closed sets is closed, and finite unions of closed sets are closed, whereas $\\bigcup_n[\\frac1n,1]=(0,1]$ is not.

A point $x$ is a **limit point** of $A$ if every interval $(x-\\varepsilon,x+\\varepsilon)$ contains a point of $A$ other than $x$. Equivalently, there is a sequence in $A\\setminus\\{x\\}$ tending to $x$. The point need not lie in $A$: 0 is a limit point of $\\{\\frac1n\\}$. A point of $A$ that is not a limit point is **isolated**. The **closure** $\\bar A$ is $A$ together with its limit points, and it is the smallest closed set containing $A$.

**Worked example.** Theorem: $F$ is closed if and only if it contains all its limit points.

*Proof.* ($\\Rightarrow$) Let $F$ be closed, and let $x\\notin F$. As $F^c$ is open, there is $\\varepsilon>0$ with $(x-\\varepsilon,x+\\varepsilon)\\subseteq F^c$. This interval contains no point of $F$, so $x$ is not a limit point of $F$. Thus every limit point of $F$ lies in $F$.

($\\Leftarrow$) Suppose that $F$ contains all its limit points, and let $x\\in F^c$. Then $x$ is not a limit point of $F$. So there is $\\varepsilon>0$ such that $(x-\\varepsilon,x+\\varepsilon)$ has no point of $F$ other than possibly $x$. But $x\\notin F$. So the interval lies in $F^c$, and $F^c$ is open. $\\square$

The sequential version is often the most useful: $F$ is closed exactly when each convergent sequence in $F$ has its limit in $F$. To prove that a set is closed, take a convergent sequence in it, and show that the limit stays in it. For instance, for continuous $f$, the set $\\{x:f(x)\\ge0\\}$ is closed, since $f(x_n)\\ge0$ and $x_n\\to x$ give $f(x)\\ge0$.

**Pitfalls.** "Not open" does not mean "closed". An infinite intersection of open sets, or an infinite union of closed sets, can be anything. And a limit point is not the same as a limit of a sequence in general: for a constant sequence at $x$, the limit is $x$, but $x$ need not be a limit point of the set of terms.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on the topology of the real line and, later, on metric spaces.' },
            { ...suLectures, note: 'The lectures on open and closed sets, which are in the setting of metric spaces.' },
          ],
          exercises: [
            {
              slug: 'classify-sets',
              title: 'Open, closed, both or neither',
              prompt: `Classify each set and find its limit points and closure. (a) $\\{\\frac1n:n\\in\\mathbb{N}\\}$. (b) $\\{\\frac1n:n\\in\\mathbb{N}\\}\\cup\\{0\\}$. (c) $\\mathbb{Z}$. (d) $\\mathbb{Q}\\cap[0,1]$. (e) $\\mathbb{R}\\setminus\\mathbb{Z}$. (f) $\\{\\frac1m+\\frac1n:m,n\\in\\mathbb{N}\\}$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'closure-properties',
              title: 'Closure and interior',
              prompt: `Prove: (a) $\\bar A$ is closed. (b) $\\bar A$ is the intersection of all closed sets containing $A$. (c) $\\overline{A\\cup B}=\\bar A\\cup\\bar B$. (d) $\\overline{A\\cap B}\\subseteq\\bar A\\cap\\bar B$, and the inclusion may be strict. (e) $A$ is dense in $\\mathbb{R}$ exactly when $\\bar A=\\mathbb{R}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'open-sets-structure',
              title: 'Structure of open sets',
              prompt: `Prove that every open subset of $\\mathbb{R}$ is a countable union of disjoint open intervals. For $x\\in U$, let $I_x$ be the union of all open intervals in $U$ containing $x$. Then show that the only subsets of $\\mathbb{R}$ that are both open and closed are $\\varnothing$ and $\\mathbb{R}$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For countability, each disjoint interval contains a rational. For the second part, use a supremum.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a finite intersection of open sets stay open, and where does the argument break for infinite ones?',
              answerOutline: `Take the minimum of finitely many positive $\\varepsilon_i$, which is positive. An infinite set of positive numbers can have infimum 0, as for $\\frac1n$.`,
            },
            {
              question: 'Is $\\{0\\}$ open, closed, both or neither? What are its limit points?',
              answerOutline: `It is closed and not open, and has no limit points. 0 itself is an isolated point. This shows that a closed set need not have limit points.`,
            },
            {
              question: 'How would you prove that $\\{(x):\\sin x\\ge\\frac12\\}$ is closed?',
              answerOutline: `Take $x_n$ in the set with $x_n\\to x$. Continuity gives $\\sin x_n\\to\\sin x$, and limits preserve $\\ge$. So $x$ is in the set.`,
            },
          ],
        },
        {
          slug: 'compactness',
          title: 'Compactness',
          summary:
            'What it means for every open cover to have a finite subcover, why closed bounded intervals have the property, and three equivalent forms.',
          estimatedMinutes: 150,
          objectives: [
            'Define compactness by open covers',
            'Prove that $[a,b]$ is compact',
            'Prove the Heine-Borel theorem',
            'Show that a set is not compact with an explicit cover',
          ],
          concepts: [
            'Open cover',
            'Finite subcover',
            'Compact set',
            'Heine-Borel theorem',
            'Sequential compactness',
            'Finite intersection property',
          ],
          explanation: `An **open cover** of $K$ is a family of open sets whose union contains $K$. $K$ is **compact** if each open cover has a finite subcover. Why care? Compactness turns local information into global information. If something holds near each point, you need only finitely many of those neighbourhoods, and for finitely many, you can take a minimum or maximum.

A non-example: $(0,1)$ is covered by the sets $(\\frac1n,1)$, and no finite subfamily covers it, since a finite subfamily has a largest $n$, and points near 0 are missed. $\\mathbb{R}$ is covered by $(-n,n)$, again with no finite subcover.

**Worked example.** Every closed bounded interval $[a,b]$ is compact.

*Proof.* Let $\\mathcal{U}$ be an open cover. Let $S$ be the set of $x\\in[a,b]$ such that $[a,x]$ is covered by finitely many members of $\\mathcal{U}$. Then $a\\in S$, and $S$ is bounded above by $b$. Let $c=\\sup S$, so $c\\in[a,b]$. Choose $U_0\\in\\mathcal{U}$ with $c\\in U_0$, and $\\delta>0$ with $(c-\\delta,c+\\delta)\\subseteq U_0$.

Since $c=\\sup S$, there is an $x\\in S$ with $x>c-\\delta$. Finitely many members cover $[a,x]$. Adding $U_0$ covers $[a,y]$ for each $y\\in[c,c+\\delta)\\cap[a,b]$. So $c\\in S$, and if $c<b$, some $y>c$ lies in $S$, contradicting $c=\\sup S$. Therefore $c=b\\in S$. $\\square$

**Heine-Borel theorem.** For $K\\subseteq\\mathbb{R}$, the following are equivalent.

1. $K$ is compact.
2. $K$ is closed and bounded.
3. Each sequence in $K$ has a subsequence converging to a point of $K$.

*(2 implies 1):* $K$ sits inside some $[a,b]$. An open cover of $K$, together with $K^c$, covers $[a,b]$. A finite subcover exists, and removing $K^c$ leaves a finite cover of $K$.

*(1 implies 2):* the sets $(-n,n)$ cover $K$, so $K$ is bounded. If $x\\notin K$, the sets $\\{y:|y-x|>\\frac1n\\}$ cover $K$, and finitely many suffice, which gives a neighbourhood of $x$ missing $K$. So $K^c$ is open.

*(2 is equivalent to 3):* (2 implies 3) comes from Bolzano-Weierstrass, plus closedness to keep the limit in $K$. The converse is an exercise.

**Pitfall.** "Compact" does not mean "closed and bounded" in general. That equivalence belongs to $\\mathbb{R}$ and $\\mathbb{R}^n$. In the metric space lesson, you will see closed bounded sets that are not compact. When you want to show non-compactness, give one bad cover or sequence. To show compactness from the definition, you must handle *every* cover. Some useful consequences: a nested sequence of non-empty compact sets has a non-empty intersection, which extends the nested interval theorem.`,
          resources: [
            { ...lebl, primary: true, note: 'See the metric-space chapter on compactness, and the earlier chapter on sequences.' },
            { ...interactiveAnalysis, note: 'Its topology section has a clear page on compact sets.' },
            { ...hunter, note: 'Its chapter on the topology of the real numbers treats compact sets in detail.' },
          ],
          exercises: [
            {
              slug: 'cover-examples',
              title: 'Covers',
              prompt: `For each set, either give an open cover with no finite subcover, or prove that it is compact. (a) $\\{\\frac1n:n\\in\\mathbb{N}\\}$. (b) $\\{\\frac1n:n\\in\\mathbb{N}\\}\\cup\\{0\\}$, directly from the definition. (c) $\\mathbb{N}$. (d) $[0,1]\\cap\\mathbb{Q}$. (e) The Cantor set.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sequential-to-closed-bounded',
              title: 'Finish Heine-Borel',
              prompt: `Prove that if each sequence in $K$ has a subsequence converging in $K$, then $K$ is closed and bounded. Then prove: (a) a closed subset of a compact set is compact. (b) A finite union of compact sets is compact. (c) If $K_1\\supseteq K_2\\supseteq\\cdots$ are non-empty and compact, then $\\bigcap K_n\\ne\\varnothing$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lebesgue-number',
              title: 'The Lebesgue number',
              prompt: `Let $K$ be compact, with open cover $\\mathcal{U}$. Prove that there is a $\\delta>0$ such that each $x\\in K$ has $(x-\\delta,x+\\delta)$ contained in a single member of $\\mathcal{U}$. Show by example that this fails for the non-compact set $(0,1)$ with the cover by sets $(\\frac1{n+2},\\frac1n)$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What fails in the worked proof if the interval is open?',
              answerOutline: `$c=\\sup S$ may be an endpoint that does not lie in $(a,b)$, so no member of the cover contains $c$, and the step using $U_0$ fails. The cover $(\\frac1n,1)$ shows that the result is false.`,
            },
            {
              question: 'Compactness is used to pass from local to global. Give an example of this.',
              answerOutline: `Continuity on a compact set gives boundedness: each point has a neighbourhood where $f$ is bounded, and finitely many neighbourhoods cover. The maximum of finitely many bounds is a global bound.`,
            },
            {
              question: 'Is the empty set compact? A finite set?',
              answerOutline: `Yes to both. Any cover of a finite set needs at most one set per point. The empty set is covered by no sets at all.`,
            },
          ],
        },
        {
          slug: 'continuous-functions',
          title: 'Limits of functions and continuity',
          summary:
            'Definitions, the sequential criterion, the open-set form, and a function that is continuous exactly at the irrationals.',
          estimatedMinutes: 140,
          objectives: [
            'State and use the sequential criterion for limits and continuity',
            'Prove that compositions of continuous functions are continuous',
            'Characterise continuity by preimages of open sets',
            'Analyse the continuity of pathological functions',
          ],
          concepts: [
            'Limit of a function at a limit point',
            'Sequential criterion',
            'Continuity',
            'Preimage of open sets',
            'Removable and jump discontinuities',
            'Thomae function',
          ],
          explanation: `Let $f:D\\to\\mathbb{R}$. $f$ is **continuous at $c\\in D$** if for each $\\varepsilon>0$ there is a $\\delta>0$ with $|f(x)-f(c)|<\\varepsilon$ for all $x\\in D$ with $|x-c|<\\delta$. At an isolated point of $D$, continuity holds automatically. For a limit point $c$ of $D$, the limit $\\lim_{x\\to c}f(x)=L$ means the same with $0<|x-c|<\\delta$ and $L$ in place of $f(c)$. So $f$ is continuous at such a $c$ exactly when the limit exists and equals $f(c)$.

**Sequential criterion.** $f$ is continuous at $c$ if and only if $x_n\\to c$ in $D$ implies $f(x_n)\\to f(c)$. This is the easiest way to show discontinuity: exhibit two sequences with different limits. For $f(x)=\\sin\\frac1x$ near 0, take $x_n=\\frac1{n\\pi}$ and $y_n=\\frac1{2n\\pi+\\pi/2}$, giving 0 and 1. So $f$ has no limit at 0.

**Global continuity.** $f:\\mathbb{R}\\to\\mathbb{R}$ is continuous if and only if the preimage of each open set is open. This form has no epsilons, and it is the one that generalises.

**Worked example (Thomae's function).** Define $T$ on $\\mathbb{R}$ by $T(x)=0$ for irrational $x$, $T(0)=1$, and $T(\\frac pq)=\\frac1q$ when $\\frac pq\\ne 0$ is in lowest terms with $q\\ge1$. Then $T$ is continuous at each irrational and discontinuous at each rational.

*Discontinuous at rational $c$.* $T(c)>0$. Since irrationals are dense, there are irrationals $x_n\\to c$. Then $T(x_n)=0\\not\\to T(c)$.

*Continuous at irrational $c$.* Let $\\varepsilon>0$, and choose $n$ with $\\frac1n<\\varepsilon$. In the bounded interval $(c-1,c+1)$, there are only finitely many rationals with denominator at most $n$, as each denominator gives finitely many numerators. None of them equals $c$. Let $\\delta\\le1$ be positive and smaller than the distance from $c$ to each of them. If $|x-c|<\\delta$, then either $x$ is irrational, and $T(x)=0$, or $x$ is rational with denominator above $n$, and $T(x)<\\frac1n$. In both cases, $|T(x)-T(c)|<\\varepsilon$. $\\square$

So the set of discontinuities can be a countable dense set. It cannot be just anything: no function is continuous exactly on $\\mathbb{Q}$. That needs the Baire category theorem.

**Pitfalls.** The domain matters: $\\frac1x$ is continuous on its domain $\\mathbb{R}\\setminus\\{0\\}$. There is no jump, since 0 is not in the domain. And one must take care of the sequence test: checking one sequence, or only rational sequences, does not show continuity. It must hold for every sequence tending to $c$.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on continuous functions: limits of functions and continuity.' },
            { ...mit18100a, note: 'The lecture notes on limits of functions and continuity.' },
          ],
          exercises: [
            {
              slug: 'sequential-criterion-proof',
              title: 'Prove the criteria',
              prompt: `Prove: (a) the sequential criterion for continuity at a point, both directions. Which direction needs a contradiction or a choice of $\\delta=\\frac1n$? (b) $f:\\mathbb{R}\\to\\mathbb{R}$ is continuous exactly when $f^{-1}(U)$ is open for every open $U$. (c) The composition of continuous functions is continuous, with two proofs: one using sequences, one using open sets.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'where-continuous',
              title: 'Where is it continuous?',
              prompt: `Determine the points of continuity, with proof. (a) $f(x)=x$ on $\\mathbb{Q}$ and $0$ on $\\mathbb{R}\\setminus\\mathbb{Q}$. (b) $g(x)=x^2$ on $\\mathbb{Q}$ and $x$ on $\\mathbb{R}\\setminus\\mathbb{Q}$. (c) $h(x)=x\\sin\\frac1x$ for $x\\ne0$, with $h(0)=0$. (d) $k(x)=\\lfloor x\\rfloor$. (e) $\\ell(x)=\\lfloor\\frac1x\\rfloor^{-1}$ on $(0,1]$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'monotone-discontinuities',
              title: 'Monotone functions',
              prompt: `Let $f:\\mathbb{R}\\to\\mathbb{R}$ be increasing. (a) Prove that the one-sided limits exist at each point, by using suprema. (b) Prove that $f$ has at most countably many discontinuities. (c) Build an increasing function that is discontinuous at each rational, using an enumeration $r_1,r_2,\\dots$ and $f(x)=\\sum_{r_n<x}2^{-n}$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is Thomae\'s function continuous at $\\sqrt2$, although it is non-zero on a dense set?',
              answerOutline: `Its non-zero values near $\\sqrt2$ have large denominators and hence are small. Only finitely many rationals in a bounded interval have $T$ at least $\\frac1n$, and these can be kept away by a small $\\delta$.`,
            },
            {
              question: 'How do you prove that a function is discontinuous at $c$ with sequences?',
              answerOutline: `Find one sequence $x_n\\to c$ with $f(x_n)\\not\\to f(c)$. For a limit that does not exist, find two sequences with different limits.`,
            },
            {
              question: 'Is $f(x)=\\frac1x$ on $(0,\\infty)$ continuous?',
              answerOutline: `Yes, at every point of its domain, and it is unbounded. Continuity is checked at points of the domain. It is not uniformly continuous, which is a separate question.`,
            },
          ],
        },
        {
          slug: 'continuity-on-compact-sets',
          title: 'Continuity on compact sets',
          summary:
            'Why continuous functions attain extrema on compact sets, the intermediate value theorem, and uniform continuity.',
          estimatedMinutes: 150,
          objectives: [
            'Prove that the continuous image of a compact set is compact',
            'Prove the extreme value theorem with all hypotheses',
            'Distinguish continuity from uniform continuity',
            'Prove the Heine-Cantor theorem',
          ],
          concepts: [
            'Extreme value theorem',
            'Intermediate value theorem',
            'Uniform continuity',
            'Heine-Cantor theorem',
            'Lipschitz functions',
            'Continuous extension',
          ],
          explanation: `Compactness makes continuous functions behave well.

**Theorem.** If $K$ is compact and $f:K\\to\\mathbb{R}$ is continuous, then $f(K)$ is compact. *Proof.* Let $y_n=f(x_n)$ be a sequence in $f(K)$. By compactness, a subsequence $x_{n_k}\\to x\\in K$, and continuity gives $y_{n_k}\\to f(x)\\in f(K)$. $\\square$

**Extreme value theorem.** If also $K\\ne\\varnothing$, then $f$ attains a maximum and a minimum on $K$: $f(K)$ is non-empty, closed and bounded, so it contains its supremum. All hypotheses matter: $\\frac1x$ on $(0,1]$ is unbounded (not closed), $x$ on $[0,\\infty)$ has no max (not bounded), and a function with a jump at the top can miss its supremum (not continuous).

**Intermediate value theorem.** If $f$ is continuous on $[a,b]$ and $y$ lies between $f(a)$ and $f(b)$, then $f(c)=y$ for some $c\\in[a,b]$. This relies on the interval being connected, and it fails on a set with a gap, or on $\\mathbb{Q}$.

**Uniform continuity.** $f$ is **uniformly continuous** on $D$ if
$$\\forall\\varepsilon>0\\ \\exists\\delta>0\\ \\forall x,y\\in D,\\ |x-y|<\\delta\\Rightarrow|f(x)-f(y)|<\\varepsilon.$$
Compared with continuity, $\\delta$ is chosen before the point, so one $\\delta$ works everywhere. $x^2$ on $\\mathbb{R}$ is continuous but not uniformly so. Take $x_n=n$, $y_n=n+\\frac1n$. Then $|x_n-y_n|\\to0$, while $|x_n^2-y_n^2|>2$. The same happens for $\\sin\\frac1x$ and $\\frac1x$ on $(0,1)$.

**Worked example (Heine-Cantor theorem).** A continuous function on a compact set $K$ is uniformly continuous.

*Proof.* Suppose not. The negation gives $\\varepsilon>0$ such that for each $n$, there are $x_n,y_n\\in K$ with $|x_n-y_n|<\\frac1n$ and $|f(x_n)-f(y_n)|\\ge\\varepsilon$. By compactness, a subsequence $x_{n_k}\\to c\\in K$. Since $|x_{n_k}-y_{n_k}|\\to0$, also $y_{n_k}\\to c$. Continuity at $c$ gives $f(x_{n_k})-f(y_{n_k})\\to f(c)-f(c)=0$, contradicting the lower bound $\\varepsilon$. $\\square$

Note how the two sequences collapse to one point. Without compactness, they can escape to a boundary or to infinity, as in the examples above.

**Lipschitz** functions, those with $|f(x)-f(y)|\\le M|x-y|$, are uniformly continuous with $\\delta=\\frac\\varepsilon M$. Not every uniformly continuous function is Lipschitz: $\\sqrt x$ on $[0,1]$ is continuous on a compact set, so it is uniformly continuous, but its difference quotient at 0 is unbounded.

**Pitfall.** On $(0,1)$, a continuous function may fail to be uniformly continuous. However, a function is uniformly continuous on $(0,1)$ exactly when it extends to a continuous function on $[0,1]$. So being bounded is not the issue: $\\sin\\frac1x$ is bounded, and it fails.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on the extreme and intermediate value theorems, and on uniform continuity.' },
            { ...trench, note: 'The relevant chapter on functions of a real variable, for additional examples.' },
          ],
          exercises: [
            {
              slug: 'uniform-or-not',
              title: 'Uniformly continuous or not',
              prompt: `Decide and prove. (a) $x^2$ on $[0,5]$. (b) $x^3$ on $\\mathbb{R}$. (c) $\\sin x$ on $\\mathbb{R}$. (d) $\\frac1x$ on $[1,\\infty)$. (e) $\\ln x$ on $(0,1)$. (f) $\\sqrt x$ on $[0,\\infty)$. (g) $x\\sin\\frac1x$ on $(0,1)$. Give an explicit $\\delta$ for a yes, and a pair of sequences for a no, wherever this is possible.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'extension-theorem',
              title: 'Extending to the closure',
              prompt: `Prove that a uniformly continuous $f$ on $(a,b)$ maps Cauchy sequences to Cauchy sequences. Deduce that $f$ extends continuously to $[a,b]$. Give an example of a continuous function that does not map Cauchy sequences to Cauchy sequences.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'ivt-applications',
              title: 'Using the two theorems',
              prompt: `Prove: (a) if $f:[0,1]\\to\\mathbb{R}$ is continuous with $f(0)=f(1)$, then there is $x\\in[0,\\frac12]$ with $f(x)=f(x+\\frac12)$. (b) A continuous injective function on an interval is strictly monotone. (c) If $f:\\mathbb{R}\\to\\mathbb{R}$ is continuous and $\\lim_{x\\to\\pm\\infty}f(x)=+\\infty$, then $f$ attains a minimum. (d) There is no continuous function $f:[0,1]\\to(0,1)$ that is surjective.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write continuity and uniform continuity side by side with quantifiers. What moved?',
              answerOutline: `Continuity on $D$: $\\forall x\\ \\forall\\varepsilon\\ \\exists\\delta\\ \\forall y$. Uniform: $\\forall\\varepsilon\\ \\exists\\delta\\ \\forall x\\ \\forall y$. The $\\forall x$ moved past $\\exists\\delta$, so $\\delta$ can no longer depend on $x$.`,
            },
            {
              question: 'Name each hypothesis of the extreme value theorem and give a counterexample without it.',
              answerOutline: `Closed: $x$ on $(0,1)$. Bounded: $x$ on $\\mathbb{R}$. Continuous: $x$ on $[0,1)$ and $0$ at $1$. Non-empty is needed to have a maximum at all.`,
            },
            {
              question: 'In the Heine-Cantor proof, where does compactness enter?',
              answerOutline: `It gives a convergent subsequence with limit in $K$, so that $f$ is continuous at that limit. Without it, the limit might be outside the domain, as at 0 for $\\frac1x$.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'differentiation',
      title: 'Differentiation',
      description:
        'The derivative done properly: the chain rule without a division gap, the mean value theorem, Taylor\'s theorem with remainder, and a proof of L\'Hopital\'s rule.',
      lessons: [
        {
          slug: 'the-derivative',
          title: 'The derivative and the chain rule',
          summary:
            'Definition, a form with no division that makes the chain rule safe, and a differentiable function with a discontinuous derivative.',
          estimatedMinutes: 130,
          objectives: [
            'Define the derivative and prove that differentiable implies continuous',
            'Use the Caratheodory form of differentiability',
            'Prove the chain rule without dividing by zero',
            'Give an example of a differentiable function whose derivative is not continuous',
          ],
          concepts: [
            'Difference quotient',
            'Differentiability at a point',
            'Caratheodory form',
            'Chain rule',
            'Continuously differentiable functions',
          ],
          explanation: `Let $f:I\\to\\mathbb{R}$ with $I$ an interval and $c\\in I$. $f$ is **differentiable at $c$** if $f'(c)=\\lim_{x\\to c}\\frac{f(x)-f(c)}{x-c}$ exists. Then $f$ is continuous at $c$, since $f(x)-f(c)=\\frac{f(x)-f(c)}{x-c}(x-c)\\to f'(c)\\cdot0$. The converse fails: $|x|$ at 0.

The form without division is safer. **Caratheodory's form:** $f$ is differentiable at $c$ if and only if there is a function $\\varphi:I\\to\\mathbb{R}$, continuous at $c$, with
$$f(x)-f(c)=\\varphi(x)(x-c)\\quad\\text{for all }x\\in I.$$
In that case $\\varphi(c)=f'(c)$. To see this, let $\\varphi(x)$ be the difference quotient for $x\\ne c$, and $\\varphi(c)=f'(c)$. Continuity of $\\varphi$ at $c$ is exactly the definition of the limit.

**Worked example (chain rule).** Let $f$ be differentiable at $c$, and let $g$ be differentiable at $f(c)$, with the range of $f$ inside the domain of $g$. Then $(g\\circ f)'(c)=g'(f(c))\\,f'(c)$.

*The tempting bad proof.* "Write
$$\\frac{g(f(x))-g(f(c))}{x-c}=\\frac{g(f(x))-g(f(c))}{f(x)-f(c)}\\cdot\\frac{f(x)-f(c)}{x-c}$$
and let $x\\to c$." This divides by $f(x)-f(c)$, which can be zero for $x$ arbitrarily near $c$, even for non-constant $f$. An example is $f(x)=x^2\\sin\\frac1x$ at 0.

*Proof.* Write $f(x)-f(c)=\\varphi(x)(x-c)$, with $\\varphi$ continuous at $c$ and $\\varphi(c)=f'(c)$. Write $g(y)-g(f(c))=\\psi(y)(y-f(c))$, with $\\psi$ continuous at $f(c)$ and $\\psi(f(c))=g'(f(c))$. Substituting $y=f(x)$,
$$g(f(x))-g(f(c))=\\psi(f(x))\\,(f(x)-f(c))=\\psi(f(x))\\,\\varphi(x)\\,(x-c).$$
Now $\\psi\\circ f$ is continuous at $c$, because $f$ is continuous at $c$ and $\\psi$ at $f(c)$. So the product $(\\psi\\circ f)\\cdot\\varphi$ is continuous at $c$, and its value at $c$ is $g'(f(c))f'(c)$. By the Caratheodory form, this is the derivative. $\\square$

**A derivative need not be continuous.** Let $f(x)=x^2\\sin\\frac1x$ for $x\\ne0$, with $f(0)=0$. At 0, $|\\frac{f(x)}{x}|\\le|x|$, so $f'(0)=0$. For $x\\ne0$, $f'(x)=2x\\sin\\frac1x-\\cos\\frac1x$, which has no limit at 0. So $f$ is differentiable everywhere, and $f'$ is discontinuous at 0.

**Pitfall.** $f'(c)>0$ does not make $f$ increasing near $c$. For $f(x)=x+2x^2\\sin\\frac1x$, $f(0)=0$, we have $f'(0)=1$, yet $f$ is not monotone on any neighbourhood of 0. Pointwise derivative information is weak unless it holds on an interval.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on the derivative, which treats the definition and the chain rule.' },
            { ...trench, note: 'Its material on differentiable functions of one variable gives another careful treatment.' },
          ],
          relatedLessons: ['calculus-for-data-science/derivatives/the-chain-rule'],
          exercises: [
            {
              slug: 'rules-from-caratheodory',
              title: 'Rules from the definition',
              prompt: `Prove with the Caratheodory form: (a) the product rule. (b) The quotient rule when $g(c)\\ne0$. (c) The inverse function theorem in one variable: if $f$ is continuous and strictly monotone on an interval, $f$ is differentiable at $c$ and $f'(c)\\ne0$, then $f^{-1}$ is differentiable at $f(c)$, with derivative $\\frac1{f'(c)}$. Say where you need $f^{-1}$ to be continuous, and why it is.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'smoothness-ladder',
              title: 'A ladder of smoothness',
              prompt: `Let $f_a(x)=|x|^a\\sin\\frac1x$ for $x\\ne0$, with $f_a(0)=0$ and $a>0$. Find the $a$ for which: (a) $f_a$ is continuous at 0. (b) $f_a$ is differentiable at 0. (c) $f_a'$ is continuous at 0. (d) $f_a'$ is bounded near 0. Prove each.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'non-monotone-positive-derivative',
              title: 'Positive derivative at a point',
              prompt: `For $f(x)=x+2x^2\\sin\\frac1x$ with $f(0)=0$: (a) compute $f'(0)$ from the definition. (b) Show that $f'(\\frac1{2k\\pi})=-1$ for each positive integer $k$. (c) Conclude that $f$ is not increasing on any interval around 0. (d) If $f'$ is continuous and $f'(c)>0$, prove that $f$ is increasing near $c$, assuming the mean value theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly is the gap in the two-fraction proof of the chain rule?',
              answerOutline: `$f(x)-f(c)$ may be zero for $x$ arbitrarily close to $c$, so the first fraction is undefined there. This is not a matter of taste: $x^2\\sin\\frac1x$ has zeros accumulating at 0.`,
            },
            {
              question: 'Is $f(x)=|x|$ differentiable at 0? Is it Lipschitz?',
              answerOutline: `It is not differentiable at 0, because the left and right difference quotients are $-1$ and $1$. It is Lipschitz with constant 1. So Lipschitz does not imply differentiable.`,
            },
            {
              question: 'Does differentiability on $\\mathbb{R}$ imply that $f\'$ is continuous?',
              answerOutline: `No. $x^2\\sin\\frac1x$ is the example. But $f'$ still has the intermediate value property by Darboux's theorem, so it cannot have a jump.`,
            },
          ],
        },
        {
          slug: 'mean-value-theorem',
          title: 'The mean value theorem',
          summary:
            'Fermat, Rolle and the mean value theorem, and how the last one turns pointwise derivative facts into global ones.',
          estimatedMinutes: 140,
          objectives: [
            'Prove Fermat\'s interior extremum theorem, Rolle\'s theorem and the mean value theorem',
            'Deduce monotonicity and constancy from sign of the derivative',
            'Use the mean value theorem to prove inequalities',
            'Prove Darboux\'s theorem',
          ],
          concepts: [
            'Interior extremum',
            'Rolle\'s theorem',
            'Mean value theorem',
            'Cauchy\'s mean value theorem',
            'Darboux\'s theorem',
            'Lipschitz bound',
          ],
          explanation: `**Interior extremum theorem.** If $f$ has a local maximum at an interior point $c$ and is differentiable there, then $f'(c)=0$. For $x>c$ close to $c$, the difference quotient is at most 0; for $x<c$, it is at least 0. So the limit is both.

**Rolle's theorem.** If $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then $f'(c)=0$ for some $c\\in(a,b)$. By the extreme value theorem, $f$ attains a max and a min on $[a,b]$. If both are at endpoints, $f$ is constant, and any interior $c$ works. Otherwise, one occurs at an interior point, and the previous theorem applies.

**Worked example (mean value theorem).** If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, with $a<b$, there is $c\\in(a,b)$ such that
$$f(b)-f(a)=f'(c)(b-a).$$

*Proof.* Tilt the graph so that the endpoints are level. Define
$$h(x)=f(x)-f(a)-\\frac{f(b)-f(a)}{b-a}(x-a).$$
Then $h$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $h(a)=h(b)=0$. By Rolle, $h'(c)=0$ for some $c\\in(a,b)$, which says $f'(c)=\\frac{f(b)-f(a)}{b-a}$. $\\square$

**Consequences** on an interval $I$:

- If $f'=0$ on $I$, then $f$ is constant. Apply the theorem between any two points.
- If $f'\\ge0$ on $I$, then $f$ is increasing. If $f'>0$ on $I$, it is strictly increasing. The converse of the second fails: $x^3$ is strictly increasing, and its derivative vanishes at 0.
- If $|f'|\\le M$ on $I$, then $f$ is Lipschitz: $|f(x)-f(y)|\\le M|x-y|$.

**An inequality.** For all real $x,y$, $|\\sin x-\\sin y|\\le|x-y|$. Here $f'=\\cos$ is bounded by 1. And for $x>0$, $\\frac{x}{1+x}<\\ln(1+x)<x$. Apply the theorem to $\\ln$ on $[1,1+x]$: $\\ln(1+x)=\\frac xc$, where $1<c<1+x$.

**Cauchy's mean value theorem.** Under the same hypotheses on $f,g$, some $c\\in(a,b)$ has
$$(f(b)-f(a))g'(c)=(g(b)-g(a))f'(c).$$
Apply Rolle to $(f(b)-f(a))g(x)-(g(b)-g(a))f(x)$. This will prove L'Hopital's rule.

**Pitfall.** The hypothesis "on an interval" is essential. $f(x)=\\frac{x}{|x|}$ has derivative 0 on its domain, $\\mathbb{R}\\setminus\\{0\\}$, and it is not constant. A similar case: $\\frac1x$ has a negative derivative everywhere on its domain, but $f(-1)<f(1)$, so it is not decreasing on that domain. Also, the point $c$ is not unique and usually unknown, and you cannot choose it: the theorem gives only existence. Finally, continuity at the endpoints is required: $f(x)=x$ on $[0,1)$ and $f(1)=0$ is differentiable on $(0,1)$, with $f(0)=f(1)$, and $f'$ is never 0.`,
          resources: [
            { ...lebl, primary: true, note: 'The section on the mean value theorem, including applications.' },
            { ...suLectures, note: 'The lectures on differentiation and the mean value theorem.' },
          ],
          exercises: [
            {
              slug: 'mvt-inequalities',
              title: 'Inequalities from the theorem',
              prompt: `Prove: (a) for $x>0$, $\\frac{x}{1+x^2}<\\arctan x<x$. (b) For $0<a<b$ and $p>1$, $pa^{p-1}(b-a)<b^p-a^p<pb^{p-1}(b-a)$. (c) $\\sqrt{101}$ lies between $10+\\frac1{22}$ and $10+\\frac1{20}$. (d) If $f'(x)\\to L$ as $x\\to\\infty$, then $f(x+1)-f(x)\\to L$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'darboux-theorem',
              title: 'Darboux\'s theorem',
              prompt: `Let $f$ be differentiable on $[a,b]$, with $f'(a)<y<f'(b)$. Prove that $f'(c)=y$ for some $c\\in(a,b)$. Consider $g(x)=f(x)-yx$, and show that its minimum on $[a,b]$ cannot be at an endpoint. Deduce that a derivative cannot have a jump discontinuity. Then explain why this does not contradict the example in the previous lesson.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'unique-root-counts',
              title: 'Counting roots',
              prompt: `Use Rolle's theorem to prove: (a) $x^5+3x-7=0$ has exactly one real root. (b) If a polynomial of degree $n$ has $n$ distinct real roots, then all roots of its derivative are real. (c) $e^x=ax+b$ has at most two real solutions, for any real $a,b$. (d) If $f$ is twice differentiable on $[0,1]$ with $f(0)=f(1)=f'(0)=0$, then $f''(c)=0$ for some $c\\in(0,1)$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Rolle\'s theorem need continuity on the closed interval and not differentiability there?',
              answerOutline: `Continuity on $[a,b]$ gives the extreme values through the extreme value theorem. Differentiability is only needed at interior points, so $\\sqrt{x(1-x)}$ on $[0,1]$ qualifies. Without continuity at the ends, the example in the pitfall fails.`,
            },
            {
              question: 'Is $f$ constant if $f\'=0$ on a domain that is not an interval?',
              answerOutline: `Not necessarily: $\\frac{x}{|x|}$ is locally constant, with different constants on each piece. The proof needs the segment between two points to be in the domain.`,
            },
            {
              question: 'What does the auxiliary function in the proof of the mean value theorem do?',
              answerOutline: `It subtracts the secant line, so that $h(a)=h(b)=0$. Then Rolle applies, and $h'(c)=0$ is exactly the statement that the slope matches the secant.`,
            },
          ],
        },
        {
          slug: 'taylors-theorem',
          title: 'Taylor\'s theorem',
          summary:
            'The Lagrange remainder, proved by repeated Rolle, how to use it, and why a smooth function need not equal its Taylor series.',
          estimatedMinutes: 130,
          objectives: [
            'State Taylor\'s theorem with Lagrange remainder and exact hypotheses',
            'Prove it from Rolle\'s theorem',
            'Estimate approximation errors with the remainder',
            'Give a smooth non-analytic function and prove its properties',
          ],
          concepts: [
            'Taylor polynomial',
            'Lagrange remainder',
            'Peano form of the remainder',
            'Second derivative test',
            'Smooth function',
            'Analytic function',
          ],
          explanation: `The **Taylor polynomial** of $f$ at $x_0$ is $P_n(x)=\\sum_{k=0}^n\\frac{f^{(k)}(x_0)}{k!}(x-x_0)^k$. It matches $f$ and its first $n$ derivatives at $x_0$.

**Taylor's theorem.** Let $x\\ne x_0$, and let $J$ be the closed interval with these endpoints. If $f^{(n)}$ exists and is continuous on $J$, and $f^{(n+1)}$ exists on the interior of $J$, then some $c$ strictly between $x_0$ and $x$ satisfies
$$f(x)=P_n(x)+\\frac{f^{(n+1)}(c)}{(n+1)!}(x-x_0)^{n+1}.$$
For $n=0$, this is the mean value theorem.

**Worked example (proof).** Define $M$ by $f(x)=P_n(x)+M(x-x_0)^{n+1}$, which we can do as $x\\ne x_0$. We must show that $(n+1)!\\,M=f^{(n+1)}(c)$. Set
$$g(t)=f(t)-P_n(t)-M(t-x_0)^{n+1}.$$
By construction, $g^{(k)}(x_0)=0$ for $k=0,\\dots,n$, and $g(x)=0$. Apply Rolle's theorem to $g$ on the interval between $x_0$ and $x$: this gives $x_1$ strictly between them, with $g'(x_1)=0$. Now $g'(x_0)=g'(x_1)=0$, so Rolle gives $x_2$ between $x_0$ and $x_1$ with $g''(x_2)=0$. Continuing, we reach $x_{n+1}=c$ with $g^{(n+1)}(c)=0$. Finally, since $P_n$ has degree at most $n$,
$$g^{(n+1)}(t)=f^{(n+1)}(t)-(n+1)!\\,M.$$
So $M=\\frac{f^{(n+1)}(c)}{(n+1)!}$. $\\square$

**Using it.** For $f=e^x$ on $[0,1]$, $0<c<1$, so $e^c<3$, and
$$0<e-\\sum_{k=0}^n\\frac1{k!}<\\frac3{(n+1)!}.$$
With $n=8$, the error is below $10^{-5}$. In the same way, the Taylor series of $\\sin$ and $\\cos$ converge to them on all of $\\mathbb{R}$, since all the derivatives are bounded by 1 and $\\frac{|x|^n}{n!}\\to0$.

**Second derivative test.** If $f'(c)=0$ and $f''$ is continuous at $c$ with $f''(c)>0$, then for $x$ near $c$, the remainder $\\frac12f''(\\xi)(x-c)^2$ is positive, so $c$ is a strict local minimum. If $f''(c)=0$, nothing follows: $x^3$, $x^4$ and $-x^4$ each have $f'(0)=f''(0)=0$.

**Pitfall: smooth does not mean analytic.** Let $f(x)=e^{-1/x^2}$ for $x\\ne0$, with $f(0)=0$. Each derivative at $x\\neq0$ has the form $Q(\\frac1x)e^{-1/x^2}$, with $Q$ a polynomial. Since exponential decay beats any power, all derivatives at 0 exist and equal 0. So the Taylor series at 0 is identically 0, and it converges everywhere, but not to $f$. The theorem says that $f(x)-P_n(x)$ equals the remainder. A series converges to $f$ only if the remainder tends to 0, and this needs a proof.`,
          resources: [
            { ...lebl, primary: true, note: 'The section on Taylor\'s theorem in the chapter on the derivative.' },
            { ...hunter, note: 'Its chapter on the derivative includes Taylor\'s theorem and the Peano form.' },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/taylor-series'],
          exercises: [
            {
              slug: 'remainder-estimates',
              title: 'Estimates with the remainder',
              prompt: `(a) Find an $n$ such that $P_n$ for $\\sin$ at 0 approximates $\\sin1$ with error below $10^{-6}$, using the remainder only. (b) Use the $n=1$ Taylor polynomial of $\\sqrt{1+x}$ to approximate $\\sqrt{1.1}$, and bound the error with the remainder. (c) Prove $|\\ln(1+x)-x+\\frac{x^2}2|\\le\\frac{x^3}{3}$ for $x\\ge0$. (d) Prove $\\cos x\\ge1-\\frac{x^2}{2}$ for all real $x$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'flat-function',
              title: 'A flat function',
              prompt: `Let $f(x)=e^{-1/x^2}$ for $x\\ne0$, $f(0)=0$. (a) Prove by induction that $f^{(n)}(x)=Q_n(\\frac1x)e^{-1/x^2}$ for $x\\ne0$, with $Q_n$ a polynomial. (b) Prove that $f^{(n)}(0)=0$ for all $n$. (c) Conclude that $f$ is not represented by its Taylor series near 0. (d) Show that the theorem's remainder does not tend to 0 for $x\\ne 0$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'peano-and-uniqueness',
              title: 'Peano remainder and order of contact',
              prompt: `(a) Suppose $f^{(n)}$ is continuous near $x_0$. Prove that $\\lim_{x\\to x_0}\\frac{f(x)-P_n(x)}{(x-x_0)^n}=0$. (b) Show that if a polynomial $Q$ of degree at most $n$ also satisfies this limit, then $Q=P_n$. (c) Use (b) to find the $P_4$ of $\\cos(x^2)$ at 0 without computing derivatives. (d) Find $\\lim_{x\\to0}\\frac{\\sin x-x}{x^3}$ with Taylor's theorem.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How many times is Rolle\'s theorem used in the proof, and why does each use have the needed hypotheses?',
              answerOutline: `$n+1$ times, on nested intervals. At each stage, $g^{(k)}$ vanishes at $x_0$ and at the previous point, and it is continuous and differentiable there by the assumptions on $f$.`,
            },
            {
              question: 'Is the point $c$ in the remainder fixed, independent of $x$?',
              answerOutline: `No, $c$ depends on $x$ and on $n$. To bound the remainder, you take a bound for $|f^{(n+1)}|$ over all possible $c$.`,
            },
            {
              question: 'Can a function be smooth with Taylor series that converges everywhere, but to the wrong function?',
              answerOutline: `Yes: $e^{-1/x^2}$. The series at 0 is 0. A function that equals its series near each point is called analytic, and this is a stronger property than smooth.`,
            },
          ],
        },
        {
          slug: 'lhopitals-rule',
          title: 'L\'Hopital\'s rule proved',
          summary:
            'A careful statement and proof, the role of each hypothesis, and why the converse fails.',
          estimatedMinutes: 110,
          objectives: [
            'State L\'Hopital\'s rule with exact hypotheses',
            'Prove the 0/0 case from Cauchy\'s mean value theorem',
            'Identify when the rule does not apply',
            'Explain the infinity/infinity case',
          ],
          concepts: [
            'Indeterminate form',
            'Cauchy mean value theorem',
            'One-sided limits',
            'Hypothesis on $g\'$',
            'Failure of the converse',
          ],
          explanation: `**L'Hopital's rule (0/0 form).** Let $f,g$ be differentiable on $(a,b)$, with $g'(x)\\ne0$ on $(a,b)$. Suppose that $\\lim_{x\\to a^+}f(x)=\\lim_{x\\to a^+}g(x)=0$, and $\\lim_{x\\to a^+}\\frac{f'(x)}{g'(x)}=L$. Then $\\lim_{x\\to a^+}\\frac{f(x)}{g(x)}=L$. Here $a$ is finite, $L$ is real, and the same result holds for left-hand limits, and so for two-sided limits.

**Worked example (proof).** Extend $f$ and $g$ to $[a,b)$ by setting $f(a)=g(a)=0$. Both are now continuous on $[a,b)$, since their limits at $a$ are 0. Fix $x\\in(a,b)$. On $[a,x]$, we can apply the mean value theorems.

*First, $g(x)\\ne0$.* If $g(x)=0=g(a)$, then Rolle's theorem would give a zero of $g'$ in $(a,x)$, which contradicts the hypothesis. So the quotient $\\frac{f(x)}{g(x)}$ is defined on $(a,b)$.

*Then,* Cauchy's mean value theorem gives $c_x\\in(a,x)$ with
$$\\big(f(x)-f(a)\\big)g'(c_x)=\\big(g(x)-g(a)\\big)f'(c_x).$$
That is, $\\frac{f(x)}{g(x)}=\\frac{f'(c_x)}{g'(c_x)}$, dividing by non-zero quantities.

*Finally,* let $\\varepsilon>0$. Choose $\\delta>0$ with $|\\frac{f'(t)}{g'(t)}-L|<\\varepsilon$ for $a<t<a+\\delta$. If $a<x<a+\\delta$, then $a<c_x<x<a+\\delta$. So $|\\frac{f(x)}{g(x)}-L|<\\varepsilon$. $\\square$

The proof uses $\\varepsilon$ and not a substitution $c_x\\to a$, because $c_x$ need not depend continuously on $x$. The $\\varepsilon$ form deals with that.

**The other forms.** If $|g(x)|\\to\\infty$ and $\\frac{f'}{g'}\\to L$, then $\\frac fg\\to L$, with no assumption on $f$. The proof is harder: fix a point near $a$, and apply Cauchy's theorem between it and $x$. For limits at $\\infty$, substitute $t=\\frac1x$.

**When the rule fails.**

- *The limit of $\\frac{f'}{g'}$ must exist.* The conclusion can hold when it does not. For $f(x)=x^2\\sin\\frac1x$, $g(x)=x$ at 0, $\\frac fg\\to0$. But $\\frac{f'}{g'}=2x\\sin\\frac1x-\\cos\\frac1x$ has no limit. So the rule is one-directional.
- *The form must be indeterminate.* $\\lim_{x\\to0}\\frac{x+1}{x+2}=\\frac12$, while the ratio of derivatives is 1.
- *$g'\\ne0$ near $a$ matters.* For limits at infinity, there are examples with $\\frac{f'}{g'}\\to0$ and $\\frac fg$ with no limit, because $g'$ has zeros that cancel with those of $f'$.
- *Circular use.* Using the rule for $\\lim\\frac{\\sin x}{x}$ needs the derivative of $\\sin$ at 0, which is that same limit.`,
          resources: [
            { ...lebl, primary: true, note: 'See the section on L\'Hopital\'s rule in the chapter on the derivative.' },
            { ...hunter, note: 'Its chapter on the derivative treats Cauchy\'s mean value theorem and this rule.' },
          ],
          exercises: [
            {
              slug: 'apply-with-checks',
              title: 'Apply it, checking hypotheses',
              prompt: `Find each limit if it exists, naming the form and checking the hypotheses. (a) $\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$. (b) $\\lim_{x\\to0^+}x\\ln x$. (c) $\\lim_{x\\to\\infty}\\frac{x^3}{e^x}$. (d) $\\lim_{x\\to0}\\frac{x-\\sin x}{x^3}$. (e) $\\lim_{x\\to\\infty}\\frac{x+\\sin x}{x}$, where the rule does not help. (f) $\\lim_{x\\to0^+}x^x$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'infinity-form',
              title: 'Prove the infinity form',
              prompt: `Prove: if $f,g$ are differentiable on $(a,b)$, $g'\\ne0$, $|g(x)|\\to\\infty$ as $x\\to a^+$, and $\\frac{f'}{g'}\\to L$ (real), then $\\frac fg\\to L$. Fix $y$ near $a$ with $\\frac{f'}{g'}$ within $\\varepsilon$ of $L$ on $(a,y)$, apply Cauchy's theorem on $[x,y]$, and let $x\\to a^+$ with $y$ fixed.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Write $\\frac{f(x)}{g(x)}=\\frac{f(x)-f(y)}{g(x)-g(y)}\\cdot\\frac{g(x)-g(y)}{g(x)}+\\frac{f(y)}{g(x)}$.',
            },
            {
              slug: 'derivative-limit-theorem',
              title: 'A corollary',
              prompt: `(a) Let $f$ be continuous on $[a,b)$, differentiable on $(a,b)$, with $\\lim_{x\\to a^+}f'(x)=L$. Prove that $f'(a)$ exists and equals $L$. (b) Deduce that a derivative can have no removable discontinuity. (c) Why does this not apply to $x^2\\sin\\frac1x$? (d) Use (a) to show that $f(x)=e^{-1/x}$ for $x>0$, $f(x)=0$ for $x\\le0$ is differentiable at 0.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the hypothesis "$\\frac{f\'}{g\'}$ has a limit" not a conclusion to check after?',
              answerOutline: `It is a hypothesis of the theorem. If that limit fails to exist, the rule says nothing, and $\\frac fg$ may still converge, as for $x^2\\sin\\frac1x$ over $x$.`,
            },
            {
              question: 'Where in the proof do we use $g\'\\ne0$?',
              answerOutline: `Twice: to show that $g(x)\\ne0$ by Rolle, and to divide by $g'(c_x)$. It also makes the quotient $\\frac{f'}{g'}$ meaningful near $a$.`,
            },
            {
              question: 'Why not simply say "let $c_x\\to a$ and take limits"?',
              answerOutline: `As $x$ tends to $a$, $c_x$ tends to $a$ by squeezing, but $c_x$ need not run through all values, and its choice can jump. The $\\varepsilon$ argument only needs $c_x\\in(a,x)$, which is enough. The sequential criterion handles it too.`,
            },
          ],
        },
      ],
      project: {
        slug: 'derivative-counterexamples',
        title: 'A gallery of counterexamples for the derivative',
        description: `Assemble your own reference on what can go wrong with derivatives. For each pathology, write the statement, the function, a proof that it behaves as claimed, and a short plot. Each entry should say which hypothesis of which theorem it shows to be necessary.`,
        deliverables: [
          'At least eight entries, each with a rigorous proof, including: a differentiable function with a discontinuous derivative, a function with $f\'(0)>0$ that is not monotone near 0, a smooth non-analytic function and a case of a failing mean value theorem',
          'A construction, with proof, of a function differentiable exactly at one point',
          'A statement of the theorem each example limits, with the hypothesis in question identified',
          'Plots at several scales, used to illustrate and not to prove',
        ],
        estimatedHours: 10,
        stretchGoals: ['Prove that the Weierstrass function $\\sum2^{-n}\\cos(3^n x)$ is continuous, and study the claim that it is nowhere differentiable, reading a full proof'],
      },
    },
    {
      slug: 'the-riemann-integral',
      title: 'The Riemann Integral',
      description:
        'Darboux sums, which functions are integrable, and full proofs of both parts of the fundamental theorem of calculus.',
      lessons: [
        {
          slug: 'darboux-sums',
          title: 'Darboux sums and the integral',
          summary:
            'Upper and lower sums, refinements, and the definition of the Riemann integral, tried on one easy and one impossible function.',
          estimatedMinutes: 150,
          objectives: [
            'Define upper and lower sums for a bounded function',
            'Prove that refining a partition improves both sums',
            'Prove that each lower sum is at most each upper sum',
            'Compute an integral from the definition, and show that a function is not integrable',
          ],
          concepts: [
            'Partition and refinement',
            'Upper and lower Darboux sums',
            'Upper and lower integrals',
            'Riemann integrable',
            'Dirichlet function',
            'Riemann sums',
          ],
          explanation: `Let $f:[a,b]\\to\\mathbb{R}$ be **bounded**. A **partition** $P$ is a finite list $a=x_0<x_1<\\dots<x_n=b$. On each piece, with $\\Delta x_i=x_i-x_{i-1}$, let
$$m_i=\\inf_{[x_{i-1},x_i]}f,\\qquad M_i=\\sup_{[x_{i-1},x_i]}f.$$
The **lower** and **upper sums** are $L(f,P)=\\sum m_i\\Delta x_i$ and $U(f,P)=\\sum M_i\\Delta x_i$. Boundedness is what makes these finite. Clearly $L(f,P)\\le U(f,P)$.

If $P'$ refines $P$ (adds points), then $L(f,P)\\le L(f,P')\\le U(f,P')\\le U(f,P)$. To see this, split one piece in two: the infimum on each part is at least the infimum on the whole. Consequently, for *any* partitions $P,Q$,
$$L(f,P)\\le L(f,P\\cup Q)\\le U(f,P\\cup Q)\\le U(f,Q).$$
So each lower sum is at most each upper sum. Define the **lower integral** $\\underline{\\int}f=\\sup_PL(f,P)$ and the **upper integral** $\\overline{\\int}f=\\inf_PU(f,P)$. Then $\\underline{\\int}f\\le\\overline{\\int}f$. We call $f$ **Riemann integrable** if they are equal, and write the common value as $\\int_a^bf$.

**Worked example 1.** $\\int_0^1x^2\\,dx=\\frac13$.

Let $P_n=\\{\\frac kn:0\\le k\\le n\\}$. Since $f(x)=x^2$ is increasing on $[0,1]$, $M_k=(\\frac kn)^2$ and $m_k=(\\frac{k-1}n)^2$. Therefore, using $\\sum_{k=1}^nk^2=\\frac{n(n+1)(2n+1)}{6}$,
$$U(f,P_n)=\\frac1{n^3}\\sum_{k=1}^nk^2=\\frac{(n+1)(2n+1)}{6n^2},\\qquad L(f,P_n)=\\frac{(n-1)(2n-1)}{6n^2}.$$
Both tend to $\\frac13$. So $\\overline{\\int}f\\le\\frac13\\le\\underline{\\int}f$, and the two are equal to $\\frac13$. Note that $U-L=\\frac1n$. Here, we used limits only to identify the sup and inf bounds.

**Worked example 2.** Let $D(x)=1$ for $x\\in\\mathbb{Q}$ and $D(x)=0$ otherwise, on $[0,1]$. Each subinterval contains rationals and irrationals, so $M_i=1$ and $m_i=0$. Thus $U(D,P)=1$ and $L(D,P)=0$ for every $P$. So $\\overline{\\int}D=1\\ne0=\\underline{\\int}D$, and $D$ is not Riemann integrable.

**Riemann sums.** A sum $\\sum f(t_i)\\Delta x_i$ with $t_i\\in[x_{i-1},x_i]$ lies between $L$ and $U$. For bounded $f$, integrability is equivalent to convergence of Riemann sums as the mesh tends to 0.

**Pitfalls.** Unbounded functions are not Riemann integrable, even when an improper integral exists: $\\frac1{\\sqrt x}$ on $(0,1]$, however $f(0)$ is defined, has infinite upper sums. Improper integrals are a limit of proper ones, and they are a further definition. Also, the limit of $U(f,P_n)$ along one sequence of partitions is not enough for integrability, unless $U-L\\to0$ or you compare upper with lower.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on the Riemann integral uses this Darboux approach.' },
            { ...suLectures, note: 'The lectures on the Riemann-Stieltjes integral present a generalisation of this construction.' },
          ],
          relatedLessons: ['calculus-for-data-science/integration/riemann-sums-and-the-definite-integral'],
          exercises: [
            {
              slug: 'from-the-definition',
              title: 'Integrals from the definition',
              prompt: `Using partitions into $n$ equal pieces and $U-L\\to0$, compute: (a) $\\int_0^1x\\,dx$. (b) $\\int_0^2x^3\\,dx$, using $\\sum k^3=(\\frac{n(n+1)}{2})^2$. (c) $\\int_0^1e^x\\,dx$, using a geometric sum. (d) For $f$ equal to 1 at $x=\\frac12$ and 0 elsewhere on $[0,1]$, show directly that $\\int_0^1f=0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'refinement-proof',
              title: 'Prove the refinement lemma',
              prompt: `Write in full: (a) adding one point to a partition does not decrease $L$ and does not increase $U$. (b) If $P'$ refines $P$ by adding $k$ points, and $|f|\\le M$, then $U(f,P)-U(f,P')\\le2Mk\\cdot\\text{mesh}(P)$. (c) Give an example in which the refinement strictly improves $U$, and one where it makes no difference.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'non-integrable-variants',
              title: 'Integrable or not',
              prompt: `Decide whether each is Riemann integrable on $[0,1]$ and prove your answer. (a) $f(x)=x$ on $\\mathbb{Q}$ and $0$ otherwise. (b) $g(x)=\\frac1x$ for $x>0$, with $g(0)=0$. (c) $h(x)=\\sin\\frac1x$ for $x>0$, with $h(0)=0$. Find the upper and lower integrals in (a).`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a), the upper sums converge to $\\int_0^1x\\,dx$, and the lower sums are all 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must $f$ be bounded in the definition?',
              answerOutline: `Otherwise some $M_i$ or $m_i$ is infinite, so the sums are not finite. Without a bound on $f$, you do not have a well-defined upper sum.`,
            },
            {
              question: 'Why do we pass through $P\\cup Q$ to compare $L(f,P)$ and $U(f,Q)$?',
              answerOutline: `Two partitions need not be related. A common refinement of the two gives $L(f,P)\\le L(f,P\\cup Q)\\le U(f,P\\cup Q)\\le U(f,Q)$. This gives lower integral at most upper integral.`,
            },
            {
              question: 'Is the Dirichlet function a limit of integrable functions?',
              answerOutline: `Yes: let $D_n$ be 1 on the first $n$ rationals in a list, and 0 elsewhere. Each is integrable with integral 0, and $D_n\\to D$ pointwise. So pointwise limits can destroy integrability, which motivates uniform convergence.`,
            },
          ],
        },
        {
          slug: 'integrable-functions',
          title: 'Which functions are integrable',
          summary:
            'The epsilon criterion, integrability of monotone and continuous functions, and the basic properties of the integral.',
          estimatedMinutes: 150,
          objectives: [
            'State and prove the epsilon criterion for integrability',
            'Prove that monotone functions and continuous functions are integrable',
            'Prove linearity, monotonicity and additivity over intervals',
            'State Lebesgue\'s criterion, and apply it',
          ],
          concepts: [
            'Riemann criterion',
            'Integrability of continuous functions',
            'Integrability of monotone functions',
            'Linearity and additivity',
            'Integral inequality for absolute values',
            'Measure zero and Lebesgue\'s criterion',
          ],
          explanation: `**Criterion.** A bounded $f$ is integrable on $[a,b]$ if and only if for each $\\varepsilon>0$, there is a partition $P$ with $U(f,P)-L(f,P)<\\varepsilon$.

*Proof.* If $f$ is integrable, choose $P_1$ with $U(f,P_1)<\\int f+\\frac\\varepsilon2$, and $P_2$ with $L(f,P_2)>\\int f-\\frac\\varepsilon2$, and let $P=P_1\\cup P_2$. Conversely, $0\\le\\overline{\\int}f-\\underline{\\int}f\\le U(f,P)-L(f,P)<\\varepsilon$ for all $\\varepsilon$. $\\square$

The criterion's advantage is that it does not need to know the value of the integral.

**Worked example.** Every continuous function on $[a,b]$, with $a<b$, is integrable.

*Proof.* $f$ is bounded by the extreme value theorem, and uniformly continuous by Heine-Cantor. Let $\\varepsilon>0$. Choose $\\delta>0$ with $|f(x)-f(y)|<\\frac\\varepsilon{b-a}$ whenever $|x-y|<\\delta$. Take a partition with all $\\Delta x_i<\\delta$. On each piece, $f$ attains its extremes: $M_i=f(s_i)$ and $m_i=f(t_i)$, with $|s_i-t_i|<\\delta$. So $M_i-m_i<\\frac\\varepsilon{b-a}$, and
$$U(f,P)-L(f,P)=\\sum(M_i-m_i)\\Delta x_i<\\frac\\varepsilon{b-a}\\sum\\Delta x_i=\\varepsilon.\\ \\square$$

For *monotone* $f$, with $f(a)<f(b)$ (increasing): on a partition of equal width $h$, the sum telescopes, and $U-L=h(f(b)-f(a))$. So monotone functions are integrable, even with infinitely many jumps.

**Properties.** For integrable $f,g$ and a constant $c$:

- Linearity: $\\int(f+g)=\\int f+\\int g$ and $\\int cf=c\\int f$.
- Monotonicity: $f\\le g$ gives $\\int f\\le\\int g$.
- Additivity: $\\int_a^bf=\\int_a^cf+\\int_c^bf$ for $a<c<b$. Also, $f$ is integrable on $[a,b]$ exactly when it is on both pieces.
- $|f|$ and $fg$ are integrable, and $|\\int f|\\le\\int|f|$.
- Changing $f$ at finitely many points does not affect integrability or the integral.

For linearity, recall the earlier result: $\\sup(f+g)\\le\\sup f+\\sup g$, which gives $U(f+g,P)\\le U(f,P)+U(g,P)$.

**Lebesgue's criterion.** (Stated here without proof.) A bounded function on $[a,b]$ is Riemann integrable exactly when its set of discontinuities has **measure zero**, meaning that for each $\\varepsilon>0$, it can be covered by countably many open intervals of total length under $\\varepsilon$. Countable sets have measure zero, so Thomae's function is integrable, and the Dirichlet function is not, being discontinuous everywhere.

**Pitfalls.** $|f|$ integrable does not imply $f$ integrable: try $1$ on $\\mathbb{Q}$, $-1$ off it. A composition of integrable functions need not be integrable, though a continuous function of an integrable function is. And $\\int|f|=0$ does not give $f=0$: only that $f$ is 0 at its continuity points. If $f\\ge 0$ is continuous and $\\int f=0$, then $f=0$.`,
          resources: [
            { ...lebl, primary: true, note: 'The sections on properties of the integral in the chapter on the Riemann integral.' },
            { ...trench, note: 'Its chapter on integral calculus of functions of one variable, on existence of the integral.' },
          ],
          exercises: [
            {
              slug: 'thomae-integrable',
              title: 'Thomae\'s function is integrable',
              prompt: `Let $T$ be Thomae's function on $[0,1]$. Directly from the epsilon criterion (not from Lebesgue's theorem), prove that $T$ is integrable and that $\\int_0^1T=0$. Note that $T$ is discontinuous on a dense set. How do your partitions handle the finitely many points where $T\\ge\\varepsilon$?`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'integral-properties',
              title: 'Prove the properties',
              prompt: `Prove: (a) if $f$ is integrable, then so is $f^2$. (b) If $f,g$ are integrable, then so is $fg$, using $4fg=(f+g)^2-(f-g)^2$. (c) If $f$ is integrable, then so is $|f|$, and $|\\int f|\\le\\int|f|$. (d) If $f\\ge 0$ is continuous on $[a,b]$ and $\\int_a^bf=0$, then $f=0$. (e) If $f$ is continuous on $[a,b]$ and $\\int_a^bfg=0$ for each continuous $g$, then $f=0$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'measure-zero-practice',
              title: 'Measure zero',
              prompt: `(a) Prove that each countable set has measure zero. (b) Prove that a countable union of measure-zero sets has measure zero. (c) Show that the Cantor set has measure zero, and that it is uncountable, so that the converse of (a) fails. (d) Using Lebesgue's criterion, show that the indicator function of the Cantor set is integrable, and find its integral.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the proof that continuous functions are integrable need from the previous module?',
              answerOutline: `Boundedness and attained extremes from the extreme value theorem, and uniform continuity from Heine-Cantor. Plain continuity would not give one $\\delta$ for all pieces.`,
            },
            {
              question: 'Can an integrable function be discontinuous on a dense set?',
              answerOutline: `Yes, as with Thomae's function, and a monotone function with jumps at all rationals. What matters is the size of the set, as a set of measure zero, and not its density.`,
            },
            {
              question: 'If $f$ is integrable and $g$ agrees with $f$ except at countably many points, is $g$ integrable?',
              answerOutline: `No. The Dirichlet function agrees with 0 except at countably many points, and it is not integrable. Finitely many points are safe. Countably many are not.`,
            },
          ],
        },
        {
          slug: 'fundamental-theorem-of-calculus',
          title: 'The fundamental theorem of calculus',
          summary:
            'Both parts proved from the definitions, with exact hypotheses, and what fails if they are weakened.',
          estimatedMinutes: 150,
          objectives: [
            'State and prove both forms of the fundamental theorem',
            'Prove the mean value theorem for integrals',
            'Prove integration by parts and substitution from the theorem',
            'Give examples showing the role of each hypothesis',
          ],
          concepts: [
            'Accumulation function',
            'Continuity of the integral',
            'First and second forms of the theorem',
            'Integrable derivative hypothesis',
            'Integration by parts',
            'Substitution',
          ],
          explanation: `Differentiation and integration undo each other, but the exact conditions matter.

**Form 1 (evaluating integrals).** Let $f$ be integrable on $[a,b]$. Let $F$ be continuous on $[a,b]$ and differentiable on $(a,b)$, with $F'=f$ on $(a,b)$. Then $\\int_a^bf=F(b)-F(a)$.

**Worked example (proof).** Let $P$ be any partition. On each piece, the mean value theorem gives $t_i\\in(x_{i-1},x_i)$ with $F(x_i)-F(x_{i-1})=f(t_i)\\Delta x_i$. Summing, the left side telescopes:
$$F(b)-F(a)=\\sum_if(t_i)\\Delta x_i.$$
Since $m_i\\le f(t_i)\\le M_i$, we have $L(f,P)\\le F(b)-F(a)\\le U(f,P)$ for each $P$. Taking the supremum of the lower sums and the infimum of the upper sums, and using integrability, $F(b)-F(a)=\\int_a^bf$. $\\square$

Notice that integrability of $f$ is a *hypothesis*. It does not come for free. For $F(x)=x^2\\sin\\frac1{x^2}$, with $F(0)=0$, $F$ is differentiable on $[0,1]$, but $F'$ is unbounded near 0, so it is not Riemann integrable. Bounded derivatives can also fail to be integrable, as Volterra's function shows.

**Form 2 (differentiating integrals).** Let $f$ be integrable on $[a,b]$, and let $F(x)=\\int_a^xf$. Then $F$ is continuous, and even Lipschitz. If $f$ is continuous at $c\\in(a,b)$, then $F'(c)=f(c)$.

*Proof.* If $|f|\\le M$, then $|F(y)-F(x)|=|\\int_x^yf|\\le M|y-x|$. For the derivative, let $\\varepsilon>0$, and choose $\\delta$ with $|f(t)-f(c)|<\\varepsilon$ for $|t-c|<\\delta$. For $0<|h|<\\delta$,
$$\\left|\\frac{F(c+h)-F(c)}h-f(c)\\right|=\\left|\\frac1h\\int_c^{c+h}(f(t)-f(c))\\,dt\\right|\\le\\varepsilon.\\ \\square$$
The constant $f(c)$ was rewritten as $\\frac1h\\int_c^{c+h}f(c)\\,dt$, which is the key move.

So continuous functions have antiderivatives. Continuity at the point is needed: for $f=0$ on $[0,1)$ and $f=1$ on $[1,2]$, $F(x)=\\max(0,x-1)$ is continuous, but not differentiable at 1.

**Consequences.** *Integration by parts:* for $u,v$ with continuous derivatives, integrate $(uv)'=u'v+uv'$. *Substitution:* if $g$ has a continuous derivative on $[a,b]$ and $f$ is continuous on the range of $g$, then $\\int_a^bf(g(x))g'(x)\\,dx=\\int_{g(a)}^{g(b)}f$. Let $F$ be an antiderivative of $f$, and apply Form 1 to $F\\circ g$. *Mean value theorem for integrals:* if $f$ is continuous on $[a,b]$, then $\\int_a^bf=f(c)(b-a)$ for some $c\\in[a,b]$.

**Pitfall.** Form 1 needs $F$ to be continuous on the closed interval. The formula $\\int_{-1}^1\\frac{dx}{x^2}=[-\\frac1x]_{-1}^{1}=-2$ is nonsense, because $\\frac1{x^2}$ is positive and not bounded on $[-1,1]$, and the "antiderivative" is not continuous at 0. Always check the hypotheses before evaluating.`,
          resources: [
            { ...lebl, primary: true, note: 'The section on the fundamental theorem of calculus, and the following one on the logarithm and exponential.' },
            { ...hunter, note: 'Its chapter on properties and fundamental theorem of the integral has both forms.' },
          ],
          relatedLessons: ['calculus-for-data-science/integration/the-fundamental-theorem'],
          exercises: [
            {
              slug: 'accumulation-functions',
              title: 'Accumulation functions',
              prompt: `(a) Find $F(x)=\\int_0^x\\lfloor t\\rfloor\\,dt$ on $[0,3]$ and state where $F'$ exists. (b) Find $\\frac{d}{dx}\\int_{x}^{x^2}e^{-t^2}\\,dt$ and prove your answer. (c) If $f$ is continuous and $\\int_0^xf=\\int_x^1f$ for all $x\\in[0,1]$, find $f$. (d) Find a function that is continuous on $[0,1]$ and solves $f(x)=1+\\int_0^xf(t)\\,dt$. Is it unique?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mean-value-integrals',
              title: 'Mean value results',
              prompt: `Prove: (a) the mean value theorem for integrals, and show by example that continuity is required. (b) The weighted version: if $f$ is continuous, $g\\ge0$ is integrable, then $\\int fg=f(c)\\int g$ for some $c\\in[a,b]$. (c) Using (b), obtain the integral form of Taylor's remainder and the Lagrange form from it, given that $f^{(n+1)}$ is continuous.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'non-integrable-derivative',
              title: 'A derivative that is not integrable',
              prompt: `Let $F(x)=x^2\\sin\\frac1{x^2}$ for $x\\in(0,1]$, with $F(0)=0$. (a) Prove that $F$ is differentiable on $[0,1]$. (b) Prove that $F'$ is unbounded on $(0,1]$, and hence not Riemann integrable. (c) Say why this does not contradict Form 1. (d) Show that the improper integral $\\lim_{t\\to0^+}\\int_t^1F'$ still exists, and compute it.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In Form 1, is it true that $F\'$ is automatically integrable?',
              answerOutline: `No. It must be assumed. The example $x^2\\sin\\frac1{x^2}$ has an unbounded derivative. When $F'$ is continuous, it is integrable, and the problem disappears.`,
            },
            {
              question: 'Does every Riemann integrable function have an antiderivative?',
              answerOutline: `No. $\\lfloor x\\rfloor$ is integrable, but it has a jump, and derivatives cannot have jumps by Darboux's theorem. Its accumulation function fails to be differentiable at integers.`,
            },
            {
              question: 'What is wrong with $\\int_{-1}^1x^{-2}\\,dx=-2$?',
              answerOutline: `The integrand is unbounded, and $-\\frac1x$ is not continuous on $[-1,1]$. So Form 1 does not apply. The improper integral diverges.`,
            },
          ],
        },
      ],
      project: {
        slug: 'integrals-from-scratch',
        title: 'Integrals from scratch',
        description: `Compute Darboux sums numerically and link them with the theory. Implement upper and lower sums on non-uniform partitions and estimate $U-L$ for functions of increasing difficulty, then explain the numbers using the theorems of this module. Your code gives evidence, and proofs must come separately.`,
        deliverables: [
          'Code that computes $U(f,P)$ and $L(f,P)$ for a function and partition, with exact sup and inf for monotone pieces',
          'Tables of $U-L$ against $n$ for $x^2$, $\\sqrt x$, a step function and Thomae\'s function, with the rate for each explained',
          'A proof for each rate that you report, in the form $U-L\\le C n^{-p}$ or an equivalent',
          'A note on why floating-point evaluation cannot distinguish the Dirichlet function from a constant',
        ],
        estimatedHours: 10,
        stretchGoals: ['Implement a Riemann-Stieltjes sum, and compare it with the integral of $fg\'$ when $g$ is smooth'],
      },
    },
    {
      slug: 'sequences-of-functions',
      title: 'Sequences of Functions',
      description:
        'Uniform convergence and when limits commute with calculus, power series, polynomial approximation and a first look at metric spaces.',
      lessons: [
        {
          slug: 'uniform-convergence',
          title: 'Pointwise and uniform convergence',
          summary:
            'Why pointwise convergence is too weak, the definition of uniform convergence, and the Weierstrass M-test.',
          estimatedMinutes: 140,
          objectives: [
            'Define pointwise and uniform convergence with quantifiers',
            'Decide uniform convergence with the supremum of the difference',
            'State and prove the Cauchy criterion for uniform convergence',
            'State and prove the Weierstrass M-test',
          ],
          concepts: [
            'Pointwise convergence',
            'Uniform convergence',
            'Sup norm',
            'Uniform Cauchy criterion',
            'Weierstrass M-test',
          ],
          explanation: `Let $f_n:D\\to\\mathbb{R}$. We say $f_n\\to f$ **pointwise** if $f_n(x)\\to f(x)$ for each $x\\in D$. Then $N$ may depend on $x$ and $\\varepsilon$. We say $f_n\\to f$ **uniformly** on $D$ if
$$\\forall\\varepsilon>0\\ \\exists N\\ \\forall n\\ge N\\ \\forall x\\in D,\\ |f_n(x)-f(x)|<\\varepsilon.$$
Now $N$ depends on $\\varepsilon$ only. This is once more a quantifier swap. Writing $\\|g\\|_D=\\sup_D|g|$, uniform convergence means exactly that $\\|f_n-f\\|_D\\to0$. Geometrically, the graph of $f_n$ eventually lies inside a band of width $2\\varepsilon$ around $f$.

**Worked example.** Let $f_n(x)=x^n$ on $[0,1]$.

*Pointwise limit.* For $0\\le x<1$, $x^n\\to0$, and at $x=1$, $f_n(1)=1$. So $f_n\\to f$, with $f=0$ on $[0,1)$ and $f(1)=1$.

*Not uniform.* For each $n$, $\\sup_{[0,1]}|f_n-f|\\ge\\sup_{[0,1)}x^n=1$. So $\\|f_n-f\\|\\not\\to0$. Continuous functions have converged pointwise to a discontinuous one.

*Uniform on smaller sets.* For a fixed $a\\in(0,1)$, $\\sup_{[0,a]}|x^n|=a^n\\to0$. So convergence is uniform on $[0,a]$. Yet it is not uniform on $[0,1)$: the sup there is 1 for each $n$.

*Method.* First find the pointwise limit $f$. Then compute or bound $\\sup|f_n-f|$. A sequence of points $x_n$ at which $|f_n(x_n)-f(x_n)|$ stays away from 0 disproves uniformity.

A second example: $g_n(x)=\\frac{nx}{1+n^2x^2}$ on $[0,\\infty)$ tends to 0 pointwise, yet $g_n(\\frac1n)=\\frac12$. So the convergence is not uniform. A bump of fixed height slides towards 0.

**Cauchy criterion.** $(f_n)$ converges uniformly on $D$ if and only if for each $\\varepsilon>0$ there is an $N$ with $\\|f_m-f_n\\|_D<\\varepsilon$ for $m,n\\ge N$. For the harder direction: each $(f_n(x))$ is Cauchy, so a limit $f(x)$ exists. Letting $m\\to\\infty$ in $|f_m(x)-f_n(x)|<\\varepsilon$ gives $|f(x)-f_n(x)|\\le\\varepsilon$ for all $x$.

**Weierstrass M-test.** If $|g_k(x)|\\le M_k$ for all $x\\in D$, and $\\sum M_k$ converges, then $\\sum g_k$ converges absolutely and uniformly on $D$. *Proof.* For $n>m$, $\\|\\sum_{k=m+1}^ng_k\\|\\le\\sum_{k=m+1}^nM_k$, which is small for large $m$. Apply the Cauchy criterion. $\\square$ For instance, $\\sum\\frac{\\sin kx}{k^2}$ converges uniformly on $\\mathbb{R}$.

**Pitfall.** The test is one-directional. The series $\\sum(-1)^k\\frac{x^2+k}{k^2}$ converges uniformly on bounded sets, yet the test does not apply, since it is not absolutely convergent at any point.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on sequences of functions, starting with pointwise and uniform convergence.' },
            { ...mit18100a, note: 'The final lectures on sequences and series of functions.' },
          ],
          exercises: [
            {
              slug: 'decide-uniform',
              title: 'Uniform or not',
              prompt: `Find the pointwise limit, and decide if the convergence is uniform. (a) $f_n(x)=\\frac{x}{n}$ on $[0,1]$, and on $\\mathbb{R}$. (b) $f_n(x)=\\frac{x^n}{1+x^n}$ on $[0,\\frac12]$, and on $[0,1]$. (c) $f_n(x)=x^n(1-x)$ on $[0,1]$. (d) $f_n(x)=nx(1-x^2)^n$ on $[0,1]$. (e) $f_n(x)=\\sqrt{x^2+\\frac1{n^2}}$ on $\\mathbb{R}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (c), maximise $x^n(1-x)$ by calculus: the sup is under $\\frac1{n+1}$.',
            },
            {
              slug: 'm-test-applications',
              title: 'Using the M-test',
              prompt: `Prove uniform convergence, and say on what set. (a) $\\sum_{k=1}^\\infty\\frac{\\cos kx}{k^3}$. (b) $\\sum_{k=0}^\\infty x^k$ on $[-r,r]$, for $0<r<1$. Show that it is not uniform on $(-1,1)$. (c) $\\sum_{k=1}^\\infty\\frac{x}{k^2+x^2}$ on $[-R,R]$ for $R>0$. (d) Define $\\zeta(s)=\\sum k^{-s}$ on $[a,\\infty)$ with $a>1$, and explain why it is continuous on $(1,\\infty)$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'dini-theorem',
              title: 'Dini\'s theorem',
              prompt: `Let $K$ be compact, $f_n,f:K\\to\\mathbb{R}$ continuous, $f_n(x)\\le f_{n+1}(x)$ for all $x$, $n$, and $f_n\\to f$ pointwise. Prove that the convergence is uniform. Use an open cover or a sequence argument. Show that each hypothesis (compact, continuous limit, monotone) is needed, with an example for each.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write pointwise and uniform convergence side by side. What moved?',
              answerOutline: `Pointwise: $\\forall x\\,\\forall\\varepsilon\\,\\exists N\\,\\forall n\\ge N$. Uniform: $\\forall\\varepsilon\\,\\exists N\\,\\forall x\\,\\forall n\\ge N$. The $\\forall x$ moved past $\\exists N$, so that $N$ does not depend on $x$.`,
            },
            {
              question: 'How do you disprove uniform convergence without computing a sup?',
              answerOutline: `Find $x_n$ with $|f_n(x_n)-f(x_n)|\\ge c>0$ for infinitely many $n$. For $x^n$ on $[0,1)$, take $x_n=2^{-1/n}$, where the value is $\\frac12$.`,
            },
            {
              question: 'Is the uniform limit on $[0,1)$ the same as on $[0,1]$?',
              answerOutline: `Not in general, but uniformity can depend on a single point or a boundary. For continuous $f_n$ on $[0,1]$, uniform convergence on $[0,1)$ implies it on $[0,1]$. For $x^n$, it fails on both.`,
            },
          ],
        },
        {
          slug: 'uniform-limits-and-calculus',
          title: 'Uniform limits, continuity, integrals and derivatives',
          summary:
            'When you may swap a limit with continuity, integration or differentiation, and counterexamples for each.',
          estimatedMinutes: 150,
          objectives: [
            'Prove that uniform limits of continuous functions are continuous',
            'Prove that limits and integrals can be swapped under uniform convergence',
            'State and prove the theorem on differentiating a limit',
            'Give counterexamples for each swap without uniformity',
          ],
          concepts: [
            'Epsilon over three',
            'Interchange of limits',
            'Limit under the integral',
            'Differentiating a limit',
            'Moving bumps',
          ],
          explanation: `**Worked example.** If $f_n\\to f$ uniformly on $D$ and each $f_n$ is continuous at $c\\in D$, then $f$ is continuous at $c$.

*Proof.* Let $\\varepsilon>0$. Choose $n$ with $\\|f_n-f\\|_D<\\frac\\varepsilon3$. Fix that $n$. Since $f_n$ is continuous at $c$, choose $\\delta>0$ with $|f_n(x)-f_n(c)|<\\frac\\varepsilon3$ for $x\\in D$, $|x-c|<\\delta$. Then
$$|f(x)-f(c)|\\le|f(x)-f_n(x)|+|f_n(x)-f_n(c)|+|f_n(c)-f(c)|<\\varepsilon.\\ \\square$$

This **three-epsilon** argument is the model for many others. It uses one fixed good $f_n$ to transfer a property to $f$, and it needs the bound to be uniform in $x$, because the first term has a moving point. Thus $x^n$ on $[0,1]$ cannot converge uniformly: the limit is discontinuous.

**Integrals.** If $f_n$ is integrable on $[a,b]$ and $f_n\\to f$ uniformly, then $f$ is integrable, and $\\int_a^bf_n\\to\\int_a^bf$. With $\\varepsilon_n=\\|f_n-f\\|$, we have $f_n-\\varepsilon_n\\le f\\le f_n+\\varepsilon_n$. So the upper and lower integrals of $f$ differ by at most $2\\varepsilon_n(b-a)$, and $|\\int f_n-\\int f|\\le\\varepsilon_n(b-a)$.

*Counterexample without uniformity.* Let $f_n(x)=2n^2xe^{-n^2x^2}$ on $[0,1]$. For each $x$, $f_n(x)\\to0$. However, $\\int_0^1f_n=1-e^{-n^2}\\to1$, whereas $\\int_0^10=0$. The mass of the bump stays constant as it concentrates at 0.

**Derivatives.** Uniform convergence of $f_n$ tells you nothing about $f_n'$. For $f_n(x)=\\frac{\\sin(nx)}{\\sqrt n}$, $\\|f_n\\|\\to0$, while $f_n'(x)=\\sqrt n\\cos(nx)$ does not converge at $x=0$. The hypothesis has to be placed on the derivatives.

**Theorem.** Let $f_n$ be differentiable on $[a,b]$, let $f_n'\\to g$ uniformly, and let $(f_n(x_0))$ converge for some $x_0\\in[a,b]$. Then $f_n$ converges uniformly to a differentiable $f$, with $f'=g$.

*Proof when each $f_n'$ is continuous.* By the fundamental theorem, $f_n(x)=f_n(x_0)+\\int_{x_0}^xf_n'$. Let $L=\\lim f_n(x_0)$ and $f(x)=L+\\int_{x_0}^xg$. The integral estimate gives $f_n\\to f$ uniformly. Since $g$ is continuous, as a uniform limit of continuous functions, $f'=g$. $\\square$ The general case needs the mean value theorem applied to $f_n-f_m$.

**Pitfall.** Convergence of a series of functions means convergence of partial sums. So, to integrate or differentiate a series term by term, check uniform convergence of the series, or of the differentiated series. A swap such as $\\lim_n\\lim_x\\ne\\lim_x\\lim_n$ is possible: for $a_{mn}=\\frac{m}{m+n}$, the two iterated limits are 1 and 0. Every swap is a theorem, not a habit.`,
          resources: [
            { ...lebl, primary: true, note: 'The section on interchange of limits in the chapter on sequences of functions.' },
            { ...hunter, note: 'Its chapter on sequences and series of functions covers each interchange, with examples.' },
          ],
          exercises: [
            {
              slug: 'swap-or-not',
              title: 'Swap or not',
              prompt: `For each, compute both sides and say why they agree or differ. (a) $\\lim\\int_0^1x^n\\,dx$ and $\\int_0^1\\lim x^n\\,dx$. (b) $\\lim\\int_0^1n^2x(1-x)^n\\,dx$ and $\\int_0^1\\lim n^2x(1-x)^n\\,dx$. (c) $\\lim\\int_0^{1}\\frac{nx}{1+n^2x^2}\\,dx$ and the integral of the limit. (d) $\\lim\\frac{d}{dx}\\frac{\\sin(n^2x)}{n}\\big|_{x=0}$ and the derivative of the limit.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'general-derivative-theorem',
              title: 'The derivative theorem in general',
              prompt: `Prove the theorem from this lesson with no continuity assumption on $f_n'$. (a) Use the mean value theorem on $f_n-f_m$ to show that $(f_n)$ is uniformly Cauchy. (b) Fix $c$, define $\\varphi_n(x)=\\frac{f_n(x)-f_n(c)}{x-c}$ for $x\\ne c$ and $\\varphi_n(c)=f_n'(c)$, and show that $(\\varphi_n)$ is uniformly Cauchy on $[a,b]$. (c) Conclude that $f'(c)=g(c)$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'nowhere-swapping',
              title: 'Using the theorems',
              prompt: `(a) Prove that $\\sum_{k=1}^\\infty\\frac{\\sin kx}{k^3}$ has a continuous derivative. Find it. (b) Prove that $\\int_0^\\pi\\sum_{k=1}^\\infty\\frac{\\sin kx}{k^2}\\,dx=\\sum_{k\\ \\text{odd}}\\frac2{k^3}$. (c) If each $f_n$ is uniformly continuous on $\\mathbb{R}$ and $f_n\\to f$ uniformly, prove that $f$ is uniformly continuous.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the point of fixing one $n$ in the three-epsilon proof?',
              answerOutline: `$\\delta$ depends on the function $f_n$. Fixing $n$ first gives a single $\\delta$. A proof that lets $n$ vary with $x$ would lose this.`,
            },
            {
              question: 'Give a sequence that tends to 0 uniformly while its derivatives diverge.',
              answerOutline: `$\\frac{\\sin(nx)}{\\sqrt n}$. Its size is at most $\\frac1{\\sqrt n}$, but it oscillates fast, so the slopes grow like $\\sqrt n$.`,
            },
            {
              question: 'Does pointwise convergence with bounded integrands allow swapping limit and integral?',
              answerOutline: `Not in general for the Riemann integral, as the limit may not be integrable (rationals example). If the limit is integrable and there is a uniform bound, the swap does hold (Arzela's bounded convergence theorem), but this is beyond this course and is not obvious.`,
            },
          ],
        },
        {
          slug: 'power-series',
          title: 'Power series',
          summary:
            'The radius of convergence, uniform convergence inside it, term-by-term calculus, and Abel\'s theorem at the endpoint.',
          estimatedMinutes: 140,
          objectives: [
            'Compute a radius of convergence with the root formula',
            'Prove uniform convergence on compact subsets of the interval',
            'Prove term-by-term differentiation and integration',
            'State Abel\'s theorem, and use it at an endpoint',
          ],
          concepts: [
            'Radius of convergence',
            'Cauchy-Hadamard formula',
            'Endpoint behaviour',
            'Term-by-term differentiation',
            'Abel\'s theorem',
            'Real analytic functions',
          ],
          explanation: `A **power series** is $\\sum_{n=0}^\\infty c_n(x-a)^n$. Let $\\alpha=\\limsup|c_n|^{1/n}$, and let $R=\\frac1\\alpha$, with $R=\\infty$ if $\\alpha=0$ and $R=0$ if the sequence is unbounded. This is the **Cauchy-Hadamard formula**.

**Worked example.** Theorem: the series converges absolutely for $|x-a|<R$, diverges for $|x-a|>R$, and converges uniformly on $|x-a|\\le r$ for each $r<R$.

*Proof.* By the root test, $\\limsup|c_n(x-a)^n|^{1/n}=\\alpha|x-a|$. That is less than 1 when $|x-a|<R$, and more than 1 when $|x-a|>R$. So the first two claims hold. Let $0<r<R$. Then $\\sum|c_n|r^n$ converges, by the first claim. For $|x-a|\\le r$, we have $|c_n(x-a)^n|\\le|c_n|r^n$. By the Weierstrass M-test, convergence is uniform there. $\\square$

Uniformity holds on closed sub-intervals, but not necessarily on $(a-R,a+R)$. For $\\sum x^n=\\frac1{1-x}$ on $(-1,1)$, partial sums are bounded and the limit is not, so convergence cannot be uniform.

**Endpoints** must be checked by hand. With $R=1$, $\\sum x^n$ diverges at both ends, $\\sum\\frac{x^n}{n}$ converges at $-1$ and diverges at $1$, and $\\sum\\frac{x^n}{n^2}$ converges at both.

**Calculus.** On $(a-R,a+R)$, a power series is a continuous function. The differentiated series $\\sum nc_n(x-a)^{n-1}$ has the same radius, since $n^{1/n}\\to1$. So the derivative theorem applies on each closed sub-interval, and
$$\\frac{d}{dx}\\sum c_n(x-a)^n=\\sum nc_n(x-a)^{n-1},\\qquad\\int_a^x\\sum c_n(t-a)^n\\,dt=\\sum\\frac{c_n}{n+1}(x-a)^{n+1}.$$
Repeating this, $f$ is infinitely differentiable, and $c_n=\\frac{f^{(n)}(a)}{n!}$. So a power series is the Taylor series of its sum, and coefficients are unique.

**Abel's theorem.** If $\\sum c_nR^n$ converges, then the series converges uniformly on $[0,R]$ (taking $a=0$). So its sum is continuous at $R$ from the left: $\\lim_{x\\to R^-}\\sum c_nx^n=\\sum c_nR^n$.

*Example.* For $|x|<1$, integrating $\\frac1{1+t}=\\sum(-t)^n$ gives $\\ln(1+x)=\\sum_{n\\ge1}\\frac{(-1)^{n+1}x^n}{n}$. At $x=1$, the series converges by the alternating test, and Abel's theorem then gives $\\ln2=1-\\frac12+\\frac13-\\dots$. Integrating term by term up to $x=1$ directly would not be justified, because $1$ lies on the boundary.

**Pitfall.** Do not use the ratio formula $R=\\lim|\\frac{c_n}{c_{n+1}}|$ when the limit does not exist or some $c_n=0$. For $\\sum x^{2n}$, half of the coefficients vanish, and $R=1$ by the root formula. And $f$ analytic near each point does not imply that $R$ is infinite: $\\frac1{1+x^2}$ is smooth on $\\mathbb{R}$, yet its series at 0 has $R=1$. The obstruction is the complex poles at $\\pm i$.`,
          resources: [
            { ...lebl, primary: true, note: 'The section on power series, in the chapter on sequences of functions or the second volume.' },
            { ...trench, note: 'Its section on power series gives detailed proofs of the term-by-term results.' },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/taylor-series'],
          exercises: [
            {
              slug: 'radii',
              title: 'Radius and interval',
              prompt: `Find the radius and the exact interval of convergence. (a) $\\sum\\frac{x^n}{n2^n}$. (b) $\\sum n!x^n$. (c) $\\sum\\frac{x^n}{n!}$. (d) $\\sum\\frac{(x-1)^n}{n^2}$. (e) $\\sum x^{n^2}$. (f) $\\sum2^{(-1)^n n}x^n$, for which the ratio formula fails.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'abel-proof',
              title: 'Abel\'s theorem',
              prompt: `Prove Abel's theorem with $R=1$, $a=0$. Let $s_n=\\sum_{k=n}^\\infty c_k$, and use summation by parts on $\\sum_{k=m}^nc_kx^k$ to show that the series is uniformly Cauchy on $[0,1]$. Then use it to find $\\sum_{n=0}^\\infty\\frac{(-1)^n}{2n+1}$, justifying each step.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'series-solutions',
              title: 'Summing with calculus',
              prompt: `Find a closed form and justify each interchange. (a) $\\sum_{n\\ge1}nx^{n-1}$ for $|x|<1$. (b) $\\sum_{n\\ge1}\\frac{x^n}{n}$ for $|x|<1$. (c) $\\sum_{n\\ge1}n^2x^n$ for $|x|<1$. (d) Show that $y=\\sum\\frac{x^n}{n!}$ satisfies $y'=y$ and $y(0)=1$. (e) Find $\\sum_{n\\ge1}\\frac{n}{2^n}$ and $\\sum_{n\\ge1}\\frac{n^2}{2^n}$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does a power series converge uniformly on its open interval of convergence?',
              answerOutline: `Not in general: $\\sum x^n$ on $(-1,1)$. It converges uniformly on each closed sub-interval. Continuity on the open interval still follows, as continuity is local.`,
            },
            {
              question: 'Why does the differentiated series have the same radius?',
              answerOutline: `$\\limsup|nc_n|^{1/n}=\\limsup|c_n|^{1/n}$, because $n^{1/n}\\to1$. Endpoint behaviour can change, though: $\\sum\\frac{x^n}{n}$ converges at $-1$, while its derivative $\\sum x^{n-1}$ does not.`,
            },
            {
              question: 'What does Abel\'s theorem add to the alternating series test for $\\ln2$?',
              answerOutline: `The test says that the series converges to some number, and Abel's theorem identifies that number as $\\lim_{x\\to1^-}\\ln(1+x)=\\ln2$.`,
            },
          ],
        },
        {
          slug: 'weierstrass-approximation',
          title: 'The Weierstrass approximation theorem',
          summary:
            'Every continuous function on a closed interval is a uniform limit of polynomials, proved with Bernstein polynomials.',
          estimatedMinutes: 140,
          objectives: [
            'State the Weierstrass approximation theorem',
            'Define Bernstein polynomials and derive their moment identities',
            'Prove the theorem with uniform continuity',
            'Explain how this differs from Taylor approximation',
          ],
          concepts: [
            'Uniform approximation',
            'Bernstein polynomials',
            'Moment identities',
            'Binomial mass near $x$',
            'Density of polynomials',
          ],
          explanation: `**Weierstrass approximation theorem.** If $f$ is continuous on $[a,b]$, then for each $\\varepsilon>0$ there is a polynomial $p$ with $\\|f-p\\|_{[a,b]}<\\varepsilon$.

This is a surprise: $f$ may be nowhere differentiable, so Taylor polynomials do not exist, and yet polynomials approximate it uniformly. Linear change of variables reduces to $[0,1]$.

**Bernstein polynomials.** Let
$$B_nf(x)=\\sum_{k=0}^nf\\!\\left(\\frac kn\\right)p_{n,k}(x),\\qquad p_{n,k}(x)=\\binom nkx^k(1-x)^{n-k}.$$
The $p_{n,k}$ are binomial probabilities: non-negative on $[0,1]$. $B_nf(x)$ is a weighted average of the values of $f$ with weights concentrated around $k\\approx nx$. From the binomial theorem, differentiated in the usual way, one gets:
$$\\sum_kp_{n,k}=1,\\qquad\\sum_k\\frac knp_{n,k}=x,\\qquad\\sum_k\\left(\\frac kn-x\\right)^2p_{n,k}=\\frac{x(1-x)}n.$$
The last identity is the variance of a binomial proportion. Since $x(1-x)\\le\\frac14$, this is at most $\\frac1{4n}$.

**Worked example (proof).** Let $f$ be continuous on $[0,1]$, with $|f|\\le M$. Let $\\varepsilon>0$. By uniform continuity, choose $\\delta>0$ with $|f(s)-f(t)|<\\frac\\varepsilon2$ whenever $|s-t|<\\delta$. Fix $x\\in[0,1]$. Using the first identity,
$$|f(x)-B_nf(x)|=\\left|\\sum_k\\left(f(x)-f\\!\\left(\\frac kn\\right)\\right)p_{n,k}(x)\\right|\\le\\sum_k\\left|f(x)-f\\!\\left(\\frac kn\\right)\\right|p_{n,k}(x).$$
Split the sum. If $|\\frac kn-x|<\\delta$, the factor is less than $\\frac\\varepsilon2$, and these weights add up to at most 1. If $|\\frac kn-x|\\ge\\delta$, the factor is at most $2M$, and also $1\\le\\frac{(k/n-x)^2}{\\delta^2}$. So the far terms contribute at most
$$\\frac{2M}{\\delta^2}\\sum_k\\left(\\frac kn-x\\right)^2p_{n,k}(x)\\le\\frac{2M}{\\delta^2}\\cdot\\frac1{4n}=\\frac{M}{2n\\delta^2}.$$
This bound does not depend on $x$. Choose $N$ with $\\frac M{2N\\delta^2}<\\frac\\varepsilon2$. For $n\\ge N$, $\\|f-B_nf\\|<\\varepsilon$. $\\square$

The proof has the usual analyst's shape: near points are controlled by continuity, far points by a small mass.

**Consequences and limits.** The result says that polynomials are *dense* in $C[a,b]$. It does not say that a single power series converges to $f$. The polynomials change entirely as $\\varepsilon$ shrinks, and their coefficients do not stabilise. It also fails on non-compact sets: on $\\mathbb{R}$, a uniform limit of polynomials must itself be a polynomial, so $\\sin x$ is not one. Bernstein polynomials converge slowly, typically at rate $\\frac1n$ for smooth functions. They are valued for their shape properties, as in Bezier curves, rather than speed.`,
          resources: [
            { ...lebl, primary: true, note: 'The second volume covers the Stone-Weierstrass theorem, and the first has polynomial approximation exercises.' },
            { ...hunter, note: 'Its chapter on the Weierstrass approximation theorem gives a Bernstein polynomial proof and more.' },
          ],
          exercises: [
            {
              slug: 'moment-identities',
              title: 'Moment identities',
              prompt: `Prove the three identities: start from $(x+y)^n=\\sum\\binom nkx^ky^{n-k}$. Apply $x\\partial_x$ once and twice, then set $y=1-x$. Then compute $B_n$ of $1$, $x$ and $x^2$ explicitly. Expected: $B_n(x^2)=x^2+\\frac{x(1-x)}n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bernstein-numerics',
              title: 'Measure the rate',
              prompt: `Compute $\\|f-B_nf\\|_{[0,1]}$ numerically for $f(x)=|x-\\frac12|$ and for $f(x)=x^2$, with $n=10,100,1000$. Estimate the order of the rate in each case. (For $x^2$, the exact value is $\\frac1{4n}$.) Which smoothness gives which rate? For $|x-\\frac12|$, the rate should be close to $n^{-1/2}$.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'density-consequences',
              title: 'Consequences',
              prompt: `Prove: (a) if $f$ is continuous on $[0,1]$ and $\\int_0^1f(x)x^n\\,dx=0$ for all $n\\ge0$, then $f=0$. (b) If $(p_n)$ are polynomials and $p_n\\to f$ uniformly on $\\mathbb{R}$, then $f$ is a polynomial. (c) There is a sequence of polynomials tending uniformly to $|x|$ on $[-1,1]$. Can they all have $p_n(0)=0$? (d) $C[0,1]$ with the sup norm has a countable dense subset.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a), use the theorem to show that $\\int f^2=0$. For (b), for large $n$ the differences $p_n-p_m$ are bounded polynomials on $\\mathbb{R}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the theorem not contradict non-analyticity?',
              answerOutline: `The polynomials need not be partial sums of one power series. Each approximation may be unrelated to the last, so the limit can be any continuous function.`,
            },
            {
              question: 'Where does the proof use compactness?',
              answerOutline: `Uniform continuity and boundedness on $[0,1]$. Together, these make the bound independent of $x$.`,
            },
            {
              question: 'Explain the three identities in terms of a binomial random variable.',
              answerOutline: `$S\\sim\\text{Bin}(n,x)$ has total probability 1, $E[S/n]=x$, and $\\text{Var}(S/n)=\\frac{x(1-x)}n$. The proof is Chebyshev's inequality in disguise.`,
            },
          ],
        },
        {
          slug: 'metric-spaces',
          title: 'Metric spaces and completeness',
          summary:
            'The ideas of this course in general form, with function spaces as examples, and the contraction mapping theorem.',
          estimatedMinutes: 150,
          objectives: [
            'State the axioms of a metric space and give examples',
            'Prove that $C[a,b]$ with the sup metric is complete',
            'Prove the contraction mapping theorem',
            'Explain why closed and bounded need not imply compact',
          ],
          concepts: [
            'Metric',
            'Convergence in a metric space',
            'Completeness',
            'Sup metric on $C[a,b]$',
            'Contraction mapping theorem',
            'Compactness in general',
          ],
          explanation: `A **metric space** is a set $X$ with a distance $d:X\\times X\\to[0,\\infty)$ such that $d(x,y)=0$ exactly when $x=y$, $d(x,y)=d(y,x)$, and $d(x,z)\\le d(x,y)+d(y,z)$. Examples: $\\mathbb{R}$ with $|x-y|$; $\\mathbb{R}^n$ with Euclidean, sum or max distance; and $C[a,b]$ with $d(f,g)=\\|f-g\\|$.

Open sets, convergence, continuity, Cauchy sequences and compactness transfer word for word, with $d(x,y)$ in place of $|x-y|$. In this language, uniform convergence is just convergence in $C[a,b]$. Also, $X$ is **complete** if every Cauchy sequence converges in $X$. $\\mathbb{R}$ is complete, and $\\mathbb{Q}$ is not.

$C[a,b]$ is complete. A Cauchy sequence for the sup metric is uniformly Cauchy, so it converges uniformly, and the uniform limit is continuous. By contrast, with $d_1(f,g)=\\int|f-g|$, $C[0,1]$ is not complete. Sequences approximating a step function are $d_1$-Cauchy, with no continuous limit.

**Worked example (contraction mapping theorem).** Let $(X,d)$ be a non-empty complete metric space and $T:X\\to X$ with $d(Tx,Ty)\\le qd(x,y)$ for all $x,y$, for a fixed $q<1$. Then $T$ has exactly one fixed point, and for any $x_0$, the iterates $x_{n+1}=Tx_n$ converge to it.

*Proof.* By induction, $d(x_{n+1},x_n)\\le q^nd(x_1,x_0)$. For $m>n$, the triangle inequality gives
$$d(x_m,x_n)\\le\\sum_{k=n}^{m-1}q^kd(x_1,x_0)\\le\\frac{q^n}{1-q}d(x_1,x_0),$$
so $(x_n)$ is Cauchy. By completeness, $x_n\\to x$. Since $T$ is continuous, as it is Lipschitz, $Tx=\\lim Tx_n=\\lim x_{n+1}=x$. If also $Ty=y$, then $d(x,y)=d(Tx,Ty)\\le qd(x,y)$, which forces $d(x,y)=0$. $\\square$

*Example.* $\\cos$ maps $[0,1]$ to itself, and $|\\cos'|=|\\sin|\\le\\sin1<1$ on $[0,1]$. So $\\cos x=x$ has a unique solution there, and iterating $\\cos$ finds $0.739085\\ldots$

The theorem also proves that $y'=F(t,y)$ has a unique local solution when $F$ is Lipschitz in $y$: the map $Ty(t)=y_0+\\int_{t_0}^tF(s,y(s))\\,ds$ is a contraction on a closed ball of a space of continuous functions, on a short enough interval. This is why $C[a,b]$ being complete matters.

**Pitfalls.** All three hypotheses are needed. *Completeness:* $x\\mapsto\\frac x2$ on $(0,1]$ has no fixed point. *A uniform $q<1$:* $x\\mapsto x+\\frac1x$ on $[1,\\infty)$ satisfies $d(Tx,Ty)<d(x,y)$ and has no fixed point. *Closed and bounded is not compact in general:* in $C[0,1]$, the closed unit ball contains $x^n$, a sequence with no uniformly convergent subsequence. So it is not compact. Heine-Borel is a special theorem about $\\mathbb{R}^n$.`,
          resources: [
            { ...lebl, primary: true, note: 'The chapter on metric spaces, including the fixed point theorem.' },
            { ...suLectures, note: 'These lectures develop analysis in metric spaces from the start.' },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/first-order-odes'],
          exercises: [
            {
              slug: 'check-metrics',
              title: 'Check the axioms',
              prompt: `Decide if each is a metric, and prove it. (a) On $\\mathbb{R}$: $d(x,y)=|x-y|^2$. (b) On $\\mathbb{R}$: $d(x,y)=\\sqrt{|x-y|}$. (c) On $\\mathbb{R}$: $d(x,y)=\\frac{|x-y|}{1+|x-y|}$. (d) On any set: $d(x,y)=1$ if $x\\ne y$, and 0 otherwise. (e) On $C[0,1]$: $d(f,g)=|\\int_0^1(f-g)|$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'completeness-examples',
              title: 'Complete or not',
              prompt: `Decide and prove. (a) $(0,1)$ with the usual metric. (b) $[0,\\infty)$ with the usual metric. (c) $C[0,1]$ with $d_1(f,g)=\\int_0^1|f-g|$, giving an explicit Cauchy sequence with no limit in the space. (d) Bounded real sequences with $d(a,b)=\\sup_n|a_n-b_n|$. (e) Polynomials on $[0,1]$ with the sup metric.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'fixed-point-application',
              title: 'Applying the contraction theorem',
              prompt: `(a) Show that $T(x)=\\frac12(x+\\frac2x)$ is a contraction on $[\\sqrt2,\\infty)$ with constant $\\frac12$, and name its fixed point. (b) Iterate $\\cos$ starting from 1 and find the fixed point to six decimals. Use the bound $\\frac{q^n}{1-q}d(x_1,x_0)$ to find how many iterations guarantee this accuracy, with $q=\\sin1$, and compare that with what you observe. (c) Show that $Ty(t)=1+\\int_0^ty(s)\\,ds$ is a contraction on $C[0,\\frac12]$, and identify the iterates and the fixed point.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is completeness a property of: a set, or a metric?',
              answerOutline: `Of the metric. $C[0,1]$ is complete for the sup metric, and not for $d_1$. Bounded and unbounded metrics can be equivalent for convergence, too.`,
            },
            {
              question: 'Why does the contraction theorem need $q<1$ to be fixed?',
              answerOutline: `Without a uniform $q$, the geometric bound fails. $x+\\frac1x$ on $[1,\\infty)$ shrinks distances, and it moves every point to the right, with no fixed point.`,
            },
            {
              question: 'Why is the unit ball of $C[0,1]$ not compact?',
              answerOutline: `The sequence $x^n$ lies in it. Any subsequence converges pointwise to a discontinuous function. So no subsequence converges in the sup metric.`,
            },
          ],
        },
      ],
      project: {
        slug: 'approximation-and-iteration',
        title: 'Approximation and iteration in function space',
        description: `Use the ideas of this module computationally and prove what you observe. Compare Bernstein and Taylor approximation, and run Picard iteration as a contraction in $C[0,a]$, with theory giving the bound and numerics showing how sharp it is.`,
        deliverables: [
          'A comparison of Bernstein, Taylor and interpolating polynomials for three functions, including $|x-\\frac12|$, in the sup norm',
          'Picard iterates for $y\'=y$ and $y\'=1+y^2$ with $y(0)=0$, with the interval on which your contraction argument is valid, and a discussion of the blow-up of the second solution',
          'Proofs of each convergence statement that you make, with the theorem used and its hypotheses checked',
          'A short statement of what the numerical evidence does not show',
        ],
        estimatedHours: 10,
        stretchGoals: ['Read a proof of the Arzela-Ascoli theorem and apply it to the unit ball of Lipschitz functions'],
      },
    },
  ],
  capstone: {
    slug: 'elementary-functions-from-scratch',
    title: 'The elementary functions from scratch',
    description: `Write a paper of 15-20 pages that builds the exponential, logarithm and trigonometric functions from the completeness axiom and power series, without any appeal to prior calculus facts. You may assume only the results proved in this course. Your paper should be organised as a sequence of numbered theorems, each with a full proof. Mark which theorem from the course each proof uses.

Required path. Define $E(x)=\\sum_{n\\ge0}\\frac{x^n}{n!}$. Prove convergence for all real $x$, that $E'=E$, that $E(x+y)=E(x)E(y)$, and that $E:\\mathbb{R}\\to(0,\\infty)$ is an increasing bijection. Define $\\ln$ as its inverse and prove $\\ln'(x)=\\frac1x$. Define $x^a=E(a\\ln x)$ for $x>0$, and check that it matches roots for rational $a$.

Define $C(x)=\\sum\\frac{(-1)^nx^{2n}}{(2n)!}$ and $S(x)=\\sum\\frac{(-1)^nx^{2n+1}}{(2n+1)!}$. Prove $C'=-S$, $S'=C$, $C^2+S^2=1$ and the addition formulas. Prove that $C$ has a smallest positive zero, and define $\\pi$ as twice that zero. Prove that $S$ and $C$ are periodic with period $2\\pi$. Finally, prove that the area under $\\sqrt{1-x^2}$ on $[-1,1]$ equals your $\\pi$ divided by 2.`,
    deliverables: [
      'The paper with all the required theorems proved, using only results from this course',
      'A dependency diagram showing which theorem relies on which',
      'An estimate of $e$ and $\\pi$ to 8 digits from your definitions, with a rigorous error bound from the remainder or a series tail',
      'An appendix on three places where a hypothesis mattered, for example why term-by-term differentiation is justified, each with a counterexample to the hypothesis-free claim',
      'A list of exactly which theorems of this course were used',
    ],
    estimatedHours: 35,
    stretchGoals: [
      'Prove that $\\pi$ is irrational using Niven\'s integral argument',
      'Extend $E$ to complex arguments, and derive Euler\'s formula from your definitions',
    ],
  },
  masteryChecklist: [
    'I can derive the main properties of the reals from the completeness axiom, including the Archimedean property and nested intervals',
    'I can prove sequence and series results, including Bolzano-Weierstrass and the Cauchy criterion, and compute limsup and liminf',
    'I can use the correct test for a series and tell conditional from absolute convergence, and I know why rearrangement can change a sum',
    'I can use open covers and sequences to work with compact sets, and I can prove the extreme value theorem and the Heine-Cantor theorem',
    'I can state the mean value theorem, Taylor\'s theorem and L\'Hopital\'s rule with exact hypotheses, and give counterexamples to weaker versions',
    'I can prove integrability from Darboux sums, and both forms of the fundamental theorem of calculus',
    'I can decide uniform convergence, and I justify any swap of limits, integrals or derivatives with a theorem',
    'I can work with power series, including their endpoints, and prove the Weierstrass approximation theorem',
    'I can define a metric space, prove completeness in simple cases and use the contraction mapping theorem',
  ],
});
