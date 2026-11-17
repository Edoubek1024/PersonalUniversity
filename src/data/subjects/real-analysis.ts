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
              prompt: `In an ordered field, prove each statement using only the axioms.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$x\\cdot0=0$.`, answer: `$x\\cdot0=x\\cdot(0+0)=x\\cdot0+x\\cdot0$ by distributivity. Adding $-(x\\cdot0)$ to both sides gives $0=x\\cdot0$.` },
                { prompt: `$(-1)x=-x$.`, answer: `$x+(-1)x=1\\cdot x+(-1)x=(1+(-1))x=0\\cdot x=0$, using the first part. So $(-1)x$ is an additive inverse of $x$, and additive inverses are unique, so $(-1)x=-x$.` },
                { prompt: `$x^2\\ge0$, and hence $0<1$.`, answer: `If $x\\ge0$, then $x\\cdot x\\ge0$ by the product axiom. If $x\\le0$, adding $-x$ gives $0\\le-x$, so $(-x)(-x)\\ge0$, and $(-x)(-x)=(-1)(-1)x^2=x^2$ by the second part, since $(-1)(-1)=-(-1)=1$. Then $1=1^2\\ge0$, and $1\\ne0$ is a field axiom, so $0<1$.` },
                { prompt: `If $0<x<y$, then $0<\\frac1y<\\frac1x$.`, answer: `First, $x>0$ forces $\\frac1x>0$: if $\\frac1x<0$, then $-\\frac1x>0$ and $x\\cdot(-\\frac1x)=-1\\ge0$, contradicting $0<1$. So $\\frac1x,\\frac1y>0$ and $c=\\frac1{xy}=\\frac1x\\cdot\\frac1y>0$. Multiplying by $c>0$ preserves strict inequality, since $(y-x)c\\ge0$ and it is non-zero. So $x<y$ gives $\\frac1y<\\frac1x$.` },
                { prompt: `$||x|-|y||\\le|x-y|$.`, answer: `By the triangle inequality, $|x|=|(x-y)+y|\\le|x-y|+|y|$, so $|x|-|y|\\le|x-y|$. Swapping $x$ and $y$ gives $|y|-|x|\\le|y-x|=|x-y|$. Since $|t|=\\max(t,-t)$, the two together give the claim.` },
                { prompt: `No order on the field $\\mathbb{Z}_5$ can satisfy the axioms.`, answer: `In an ordered field, $0<1$. Adding $1$ repeatedly preserves strict inequality, so $0<1<1+1<1+1+1<\\cdots$, and a sum of $1$s can never be $0$. In $\\mathbb{Z}_5$, $1+1+1+1+1=0$, a contradiction.` },
              ],
            },
            {
              slug: 'sup-epsilon-form',
              title: 'The epsilon form of the supremum',
              prompt: `Let $A\\subseteq\\mathbb{R}$ be non-empty, and let $s$ be an upper bound of $A$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that if $s=\\sup A$, then for each $\\varepsilon>0$ there is an $a\\in A$ with $a>s-\\varepsilon$.`, answer: `$s-\\varepsilon<s$, and $s$ is the least upper bound, so $s-\\varepsilon$ is not an upper bound. That means some $a\\in A$ has $a>s-\\varepsilon$.` },
                { prompt: `Prove the converse: if every $\\varepsilon>0$ has such an $a$, then $s=\\sup A$.`, answer: `Let $t$ be an upper bound with $t<s$, and put $\\varepsilon=s-t>0$. Some $a\\in A$ has $a>s-\\varepsilon=t$, so $t$ is not an upper bound after all. Hence $s\\le t$ for every upper bound $t$, and $s=\\sup A$.` },
                { prompt: `Deduce that if $s=\\sup A$ and $s\\notin A$, then each interval $(s-\\varepsilon,s)$ contains infinitely many points of $A$.`, answer: `Every $a\\in A$ has $a<s$, since $a\\le s$ and $s\\notin A$. Suppose $(s-\\varepsilon,s)$ held only the points $a_1,\\dots,a_k$ of $A$ (maybe none). Let $\\delta=\\min(\\varepsilon,s-a_1,\\dots,s-a_k)>0$. By the first part some $a\\in A$ has $s-\\delta<a<s$, and this $a$ is in $(s-\\varepsilon,s)$ but is none of the $a_i$, a contradiction.` },
              ],
            },
            {
              slug: 'roots-exist',
              title: 'Roots exist',
              prompt: `Let $y>0$ and let $n\\ge1$ be an integer. You will prove that there is a unique $x>0$ with $x^n=y$, using $x=\\sup E$ for $E=\\{t>0:t^n<y\\}$. Handle both directions by an explicit estimate. Use the identity $b^n-a^n=(b-a)(b^{n-1}+b^{n-2}a+\\dots+a^{n-1})$, which gives $b^n-a^n\\le(b-a)\\,nb^{n-1}$ for $0\\le a<b$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $E$ is non-empty and bounded above, so that $x$ exists and $x>0$.`, answer: `$t_0=\\frac{y}{1+y}$ has $0<t_0<1$, so $t_0^n\\le t_0<y$ and $t_0\\in E$. If $t\\ge1+y$, then $t>1$ and $t^n\\ge t>y$, so $1+y$ is an upper bound. Completeness gives $x=\\sup E\\ge t_0>0$.` },
                { prompt: `Rule out $x^n<y$.`, answer: `Pick $0<h<1$ with $h<\\dfrac{y-x^n}{n(x+1)^{n-1}}$. Then $(x+h)^n-x^n\\le h\\,n(x+h)^{n-1}<h\\,n(x+1)^{n-1}<y-x^n$, so $(x+h)^n<y$. Then $x+h\\in E$ exceeds the upper bound $x$, a contradiction.` },
                { prompt: `Rule out $x^n>y$.`, answer: `Let $k=\\dfrac{x^n-y}{nx^{n-1}}$. Then $0<k<x$, since $x^n-y<x^n\\le nx^n$. If $x-k\\le t<x$, then $x^n-t^n\\le(x-t)nx^{n-1}\\le knx^{n-1}=x^n-y$, so $t^n\\ge y$. If $t\\ge x$, then $t^n\\ge x^n>y$. So no $t\\ge x-k$ lies in $E$, and $x-k$ is an upper bound smaller than $x$, a contradiction. Hence $x^n=y$.` },
                { prompt: `Prove uniqueness.`, answer: `If $0<x_1<x_2$, the identity writes $x_2^n-x_1^n$ as $(x_2-x_1)$ times a sum of positive terms, so $x_1^n<x_2^n$. Thus $t\\mapsto t^n$ is strictly increasing on $(0,\\infty)$, and at most one positive $x$ has $x^n=y$.` },
              ],
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
          quiz: [
            {
              question: `Which of these subsets of $\\mathbb{Q}$ has a least upper bound **in $\\mathbb{Q}$**?`,
              options: ['$\\{x\\in\\mathbb{Q}:x^3<2\\}$', '$\\{x\\in\\mathbb{Q}:x^2<9\\}$', '$\\{x\\in\\mathbb{Q}:2x^2<1\\}$', '$\\{x\\in\\mathbb{Q}:x<\\pi\\}$'],
              answer: 1,
              explanation: `$\\{x\\in\\mathbb{Q}:x^2<9\\}$ is the set of rationals in $(-3,3)$, and its least upper bound is the rational number $3$. The other three are bounded above, but their least upper bounds in $\\mathbb{R}$ are $\\sqrt[3]2$, $\\frac1{\\sqrt2}$ and $\\pi$, all irrational. By density, any rational upper bound can then be lowered to a smaller rational one, so no least one exists in $\\mathbb{Q}$. The set below $\\pi$ is tempting because it is bounded by a familiar number, but that number is not rational.`,
            },
            {
              question: `Let $A=\\{\\frac{n}{n+1}:n\\in\\mathbb{N}\\}$, with $\\mathbb{N}=\\{1,2,3,\\dots\\}$. Which statement is true?`,
              options: ['$A$ has no supremum, because $1\\notin A$', '$\\max A=1$', '$\\sup A=1$, and $A$ has no maximum', '$\\sup A=\\frac12$'],
              answer: 2,
              explanation: `Each $\\frac{n}{n+1}<1$, so $1$ is an upper bound, and $1-\\frac1{n+1}>1-\\varepsilon$ once $n+1>\\frac1\\varepsilon$, so no smaller number is one. Thus $\\sup A=1$. Since $1\\notin A$, there is no maximum. A supremum need not belong to the set, which is why the first option is wrong. $\\frac12$ is the minimum, at $n=1$.`,
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
              prompt: `Prove each statement about the integers and rationals inside $\\mathbb{R}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `For each real $x$ there is a unique integer $n$ with $n\\le x<n+1$.`, answer: `Existence: by the Archimedean property some integer exceeds $x$, and some integer $-k$ is below $x$. So $\\{m\\in\\mathbb{Z}:m>x\\}$ is non-empty and bounded below by $-k$, and well-ordering gives a least element $m_0$. Then $n=m_0-1\\le x<m_0$. Uniqueness: if $n,n'$ both work, then $n'<n+1$ and $n<n'+1$, so $|n-n'|<1$, and integers that close are equal.` },
                { prompt: `Each real $x$ is the limit of a sequence of rationals.`, answer: `Let $r_n=\\frac{\\lfloor nx\\rfloor}{n}$. From $\\lfloor nx\\rfloor\\le nx<\\lfloor nx\\rfloor+1$ you get $x-\\frac1n<r_n\\le x$, so $|r_n-x|<\\frac1n\\to0$ by the Archimedean property.` },
                { prompt: `The set $\\{\\frac{m}{2^k}:m\\in\\mathbb{Z},\\ k\\in\\mathbb{N}\\}$ is dense in $\\mathbb{R}$.`, answer: `Let $a<b$. Since $2^k>k$, the Archimedean property gives $k$ with $\\frac1{2^k}<b-a$. Let $m=\\lfloor2^ka\\rfloor+1$, so $m-1\\le2^ka<m$. Then $a<\\frac m{2^k}\\le a+\\frac1{2^k}<b$.` },
                { prompt: `If $\\alpha$ is irrational, then $G=\\{m+n\\alpha:m,n\\in\\mathbb{Z}\\}$ is dense in $\\mathbb{R}$.`, answer: `Use the pigeonhole principle on the fractional parts $\\{k\\alpha\\}=k\\alpha-\\lfloor k\\alpha\\rfloor$ for $k=0,\\dots,N$: these $N+1$ numbers lie in the $N$ intervals $[\\frac iN,\\frac{i+1}N)$, so two of them, for $j<k$, differ by less than $\\frac1N$. Their difference $d=(k-j)\\alpha-(\\lfloor k\\alpha\\rfloor-\\lfloor j\\alpha\\rfloor)$ lies in $G$, and $0<|d|<\\frac1N$, where $d\\ne0$ because $\\alpha$ is irrational. $G$ contains every integer multiple $q|d|$. Given $a<b$, choose $N$ with $\\frac1N<b-a$. As in the density proof, the least $q$ with $q|d|>a$ has $q|d|\\le a+|d|<b$.` },
              ],
            },
            {
              slug: 'non-archimedean',
              title: 'A non-Archimedean field',
              prompt: `Let $F$ be the field of rational functions $p(x)/q(x)$ with real coefficients. Declare $f>0$ if the leading coefficients of its numerator and denominator have the same sign. Take as given that this makes $F$ an ordered field.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $x$ is larger than every natural number in $F$.`, answer: `$x-n=\\frac{x-n}{1}$ has leading coefficients $1$ and $1$, which have the same sign, so $x-n>0$ for each $n\\in\\mathbb{N}$.` },
                { prompt: `Show that $\\frac1x$ is positive and smaller than every $\\frac1n$.`, answer: `$\\frac1x$ has leading coefficients $1$ and $1$, so it is positive. And $\\frac1n-\\frac1x=\\frac{x-n}{nx}$ has leading coefficients $1$ and $n>0$, so it is positive too.` },
                { prompt: `Show directly that $\\mathbb{N}\\subset F$ is bounded above but has no least upper bound in $F$.`, answer: `$x$ is an upper bound by the first part. Suppose $u$ were a least upper bound. Then $u-1<u$ is not an upper bound, so some $n\\in\\mathbb{N}$ has $n>u-1$. But then $n+1\\in\\mathbb{N}$ and $n+1>u$, contradicting that $u$ is an upper bound. So $F$ is not complete, and the Archimedean property fails in it.` },
              ],
            },
            {
              slug: 'nested-failures',
              title: 'Where the nested theorem fails',
              prompt: `Decide whether each intersection is empty, and prove it.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\bigcap_n(0,\\frac1n]$`, answer: `Empty. No $x\\le0$ is in $(0,1]$. If $x>0$, the Archimedean property gives $n$ with $\\frac1n<x$, so $x\\notin(0,\\frac1n]$. The intervals are nested and bounded, but not closed.` },
                { prompt: `$\\bigcap_n[0,\\frac1n)$`, answer: `Not empty: it is $\\{0\\}$. $0$ lies in every interval. A negative $x$ is in none, and a positive $x$ fails once $\\frac1n<x$.` },
                { prompt: `$\\bigcap_n(-\\frac1n,1+\\frac1n)$`, answer: `Not empty: it is $[0,1]$. Each $x\\in[0,1]$ lies in every interval. If $x<0$, it fails once $\\frac1n<-x$, and if $x>1$, once $\\frac1n<x-1$.` },
                { prompt: `$\\bigcap_n[n,n+1]$`, answer: `Empty: already $[1,2]\\cap[3,4]=\\varnothing$. Each interval is closed and bounded, but they are not nested, so the theorem does not apply.` },
                { prompt: `Give a nested sequence of non-empty closed bounded subsets of $\\mathbb{Q}$, in the sense of rational points of intervals with rational ends, whose intersection is empty in $\\mathbb{Q}$.`, answer: `Let $a_n$ be $\\sqrt2$ truncated to $n$ decimal places and $b_n=a_n+10^{-n}$, and let $I_n=\\{q\\in\\mathbb{Q}:a_n\\le q\\le b_n\\}$. The $a_n$ increase, and $b_{n+1}\\le b_n$ because the next digit is at most 9, so the sets are nested, and each contains $a_n$. A common rational point $q$ would satisfy $a_n\\le q\\le b_n$ for all $n$. Since $b_n-a_n\\to0$, the nested interval theorem in $\\mathbb{R}$ forces $q=\\sqrt2$, which is not rational.` },
              ],
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
          quiz: [
            {
              question: `Follow the density proof for $a=0.31$, $b=0.34$: take the least $n$ with $\\frac1n<b-a$, then the least integer $m$ with $m>na$. Which rational $\\frac mn$ does it produce?`,
              options: ['$\\frac{10}{34}$', '$\\frac{11}{33}$', '$\\frac{11}{34}$', '$\\frac{12}{34}$'],
              answer: 2,
              explanation: `$\\frac1n<0.03$ needs $n>33.3$, so $n=34$. Then $na=10.54$, and the least integer above it is $m=11$, giving $\\frac{11}{34}\\approx0.324$, which is in $(0.31,0.34)$. $\\frac{11}{33}$ comes from $n=33$, but $\\frac1{33}\\approx0.0303$ is not below $0.03$. $\\frac{10}{34}$ uses $m-1$, which is at most $na$ and so lands below $a$.`,
            },
            {
              question: `Which nested sequence of intervals must have a non-empty intersection?`,
              options: ['$I_n=[1-\\frac1n,\\,2+\\frac1n]$', '$I_n=(1,1+\\frac1n)$', '$I_n=[n,\\,n+\\frac1n]$', '$I_n=[n^2,\\infty)$'],
              answer: 0,
              explanation: `The intervals $[1-\\frac1n,2+\\frac1n]$ are closed, bounded and nested, so the nested interval theorem applies, and the intersection is $[1,2]$. $[n,n+\\frac1n]$ is tempting because each interval is closed and bounded, but they are not nested ($[1,2]$, then $[2,2.5]$, then $[3,3.\\overline3]$), and the intersection is empty. $(1,1+\\frac1n)$ is not closed, and $[n^2,\\infty)$ is not bounded: both have empty intersection.`,
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
              prompt: `Let $f,g$ be bounded functions on a non-empty set $D$. Prove each statement.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\inf f+\\inf g\\le\\inf(f+g)\\le\\inf f+\\sup g\\le\\sup(f+g)\\le\\sup f+\\sup g$.`, answer: `First: $f(x)+g(x)\\ge\\inf f+\\inf g$ for each $x$, so it is a lower bound of $f+g$. Second: $\\inf(f+g)\\le f(x)+g(x)\\le f(x)+\\sup g$, so $\\inf(f+g)-\\sup g$ is a lower bound of $f$, hence at most $\\inf f$. Third: $g(x)\\le\\sup(f+g)-f(x)\\le\\sup(f+g)-\\inf f$, so taking the sup over $x$ gives $\\sup g\\le\\sup(f+g)-\\inf f$. Fourth: the worked example.` },
                { prompt: `$|\\sup f-\\sup g|\\le\\sup|f-g|$.`, answer: `$f(x)=g(x)+(f-g)(x)\\le\\sup g+\\sup|f-g|$ for every $x$, so $\\sup f-\\sup g\\le\\sup|f-g|$. Swap $f$ and $g$ for the other sign.` },
                { prompt: `$\\sup|f|-\\inf|f|\\le\\sup f-\\inf f$.`, answer: `For $x,y\\in D$, both $f(x)$ and $f(y)$ lie in $[\\inf f,\\sup f]$, so $|f(x)|-|f(y)|\\le|f(x)-f(y)|\\le\\sup f-\\inf f$. Take the sup over $x$: $\\sup|f|-|f(y)|\\le\\sup f-\\inf f$ for every $y$. Then take the sup over $y$ of $-|f(y)|$, which is $-\\inf|f|$.` },
                { prompt: `$\\sup f-\\inf f=\\sup\\{|f(x)-f(y)|:x,y\\in D\\}$.`, answer: `$\\ge$: for all $x,y$, $f(x)-f(y)\\le\\sup f-\\inf f$, and the same with $x,y$ swapped, so $|f(x)-f(y)|\\le\\sup f-\\inf f$. $\\le$: given $\\varepsilon>0$, pick $x$ with $f(x)>\\sup f-\\frac\\varepsilon2$ and $y$ with $f(y)<\\inf f+\\frac\\varepsilon2$. Then $|f(x)-f(y)|>\\sup f-\\inf f-\\varepsilon$.` },
              ],
            },
            {
              slug: 'sup-products',
              title: 'Products and strictness',
              prompt: `Products of suprema behave well only for non-negative sets and functions.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `For non-empty bounded $A,B\\subseteq[0,\\infty)$, prove that $\\sup(AB)=\\sup A\\sup B$.`, answer: `Let $\\alpha=\\sup A$, $\\beta=\\sup B$, $s=\\sup(AB)$. $\\le$: $0\\le a\\le\\alpha$ and $0\\le b\\le\\beta$ give $ab\\le\\alpha\\beta$. $\\ge$: fix $b\\in B$ with $b>0$. Then $a\\le\\frac sb$ for all $a$, so $\\alpha b\\le s$, and this holds for $b=0$ too, as $s\\ge0$. If $\\alpha>0$, then $b\\le\\frac s\\alpha$ for all $b$, so $\\alpha\\beta\\le s$. If $\\alpha=0$, then $\\alpha\\beta=0\\le s$.` },
                { prompt: `Give an example with general real sets for which this fails.`, answer: `$A=B=\\{-2,1\\}$. Then $AB=\\{4,-2,1\\}$, so $\\sup(AB)=4$, while $\\sup A\\sup B=1$.` },
                { prompt: `For bounded non-negative functions $f,g$ on $D$, prove $\\sup(fg)\\le\\sup f\\sup g$.`, answer: `For each $x$, $0\\le f(x)\\le\\sup f$ and $0\\le g(x)\\le\\sup g$, so $f(x)g(x)\\le\\sup f\\sup g$. The right side is an upper bound of $fg$.` },
                { prompt: `Show by example that it can be strict.`, answer: `On $[0,1]$, take $f(x)=x$ and $g(x)=1-x$. Then $\\sup(fg)=\\sup x(1-x)=\\frac14$, while $\\sup f\\sup g=1$.` },
              ],
            },
            {
              slug: 'minimax-example',
              title: 'Sup of inf versus inf of sup',
              prompt: `Let $h$ be bounded on $X\\times Y$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $\\sup_{x\\in X}\\inf_{y\\in Y}h(x,y)\\le\\inf_{y\\in Y}\\sup_{x\\in X}h(x,y)$.`, answer: `For any $x_0\\in X$ and $y_0\\in Y$: $\\inf_yh(x_0,y)\\le h(x_0,y_0)\\le\\sup_xh(x,y_0)$. So every value of $\\varphi(x)=\\inf_yh(x,y)$ is at most every value of $\\psi(y)=\\sup_xh(x,y)$. Hence $\\sup\\varphi\\le\\psi(y_0)$ for each $y_0$, and so $\\sup\\varphi\\le\\inf\\psi$.` },
                { prompt: `Compute both sides for $h(x,y)=(x-y)^2$ on $[0,1]^2$. Is the inequality strict?`, answer: `$\\inf_y(x-y)^2=0$ (take $y=x$), so the left side is $0$. $\\sup_x(x-y)^2=\\max(y^2,(1-y)^2)$, which is smallest at $y=\\frac12$, so the right side is $\\frac14$. Strict.` },
                { prompt: `Compute both sides for $h(x,y)=xy$ on $[-1,1]^2$. Is the inequality strict?`, answer: `$\\inf_yxy=-|x|$, whose sup is $0$ (at $x=0$). $\\sup_xxy=|y|$, whose inf is $0$ (at $y=0$). Both sides are $0$, so the inequality is an equality here.` },
              ],
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
          quiz: [
            {
              question: `Let $f(x)=x^2-x$ on $[0,1]$. What is $\\sup_{[0,1]}(-3f)$?`,
              options: ['$0$', '$-\\frac34$', '$\\frac14$', '$\\frac34$'],
              answer: 3,
              explanation: `$f$ takes values in $[-\\frac14,0]$, with $\\inf f=f(\\frac12)=-\\frac14$. For $c<0$, $\\sup(cf)=c\\inf f$, so $\\sup(-3f)=-3\\cdot(-\\frac14)=\\frac34$. The tempting $0$ is $-3\\sup f$, which forgets that a negative factor swaps sup and inf. $\\frac14$ drops the factor 3.`,
            },
            {
              question: `On $[0,1]$ let $f(x)=x^2$ and $g(x)=(1-x)^2$, with ranges $A=f([0,1])$ and $B=g([0,1])$. What are $\\sup(f+g)$ and $\\sup(A+B)$?`,
              options: ['Both are 2', '$\\sup(f+g)=1$ and $\\sup(A+B)=2$', 'Both are 1', '$\\sup(f+g)=2$ and $\\sup(A+B)=1$'],
              answer: 1,
              explanation: `$f+g=2x^2-2x+1$, which is largest at the ends, so $\\sup(f+g)=1$: the two peaks are at different points, $x=1$ and $x=0$. As sets, $A=B=[0,1]$, so $A+B=[0,2]$ and $\\sup(A+B)=2=\\sup A+\\sup B$. "Both are 2" treats the function sum like the set sum, where the two terms are chosen independently.`,
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
              prompt: `Prove each standard limit.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `For $a>0$, $a^{1/n}\\to1$.`, answer: `If $a\\ge1$, write $a^{1/n}=1+h_n$ with $h_n\\ge0$. Bernoulli's inequality gives $a=(1+h_n)^n\\ge1+nh_n$, so $0\\le h_n\\le\\frac{a-1}n\\to0$. If $0<a<1$, then $a^{1/n}=1/(1/a)^{1/n}\\to1$ by the quotient law, since the denominator tends to $1\\ne0$.` },
                { prompt: `For $|r|<1$ and a fixed integer $p\\ge1$, $n^pr^n\\to0$.`, answer: `Consider the ratio of consecutive terms. For $r\\ne0$, $\\left|\\frac{a_{n+1}}{a_n}\\right|=(1+\\frac1n)^p|r|\\to|r|<1$. Fix $q$ with $|r|<q<1$ and $N$ with the ratio below $q$ for $n\\ge N$. Then $|a_n|\\le|a_N|q^{n-N}\\to0$, since $q^n\\to0$. The case $r=0$ is trivial.` },
                { prompt: `For each real $r$, $\\frac{r^n}{n!}\\to0$.`, answer: `The ratio of consecutive terms is $\\frac{|r|}{n+1}\\to0$, so it is below $\\frac12$ for $n\\ge N$. Then $|a_n|\\le|a_N|2^{-(n-N)}\\to0$.` },
                { prompt: `$\\frac{n!}{n^n}\\to0$.`, answer: `$\\frac{n!}{n^n}=\\frac1n\\cdot\\frac2n\\cdots\\frac nn\\le\\frac1n$, since every factor after the first is at most 1. Squeeze between $0$ and $\\frac1n$.` },
                { prompt: `$(n!)^{1/n}\\to\\infty$.`, answer: `Keep only the largest $\\lceil n/2\\rceil$ factors of $n!$, those $k>\\lfloor n/2\\rfloor$, each at least $\\frac n2$. For $n\\ge2$, $n!\\ge(\\frac n2)^{\\lceil n/2\\rceil}\\ge(\\frac n2)^{n/2}$, so $(n!)^{1/n}\\ge\\sqrt{n/2}\\to\\infty$.` },
              ],
            },
            {
              slug: 'cesaro-means',
              title: 'Cesaro means',
              prompt: `Let $c_n=\\frac1n(a_1+\\dots+a_n)$ be the averages of a sequence $(a_n)$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `If $a_n\\to L$, prove that $c_n\\to L$.`, answer: `Given $\\varepsilon>0$, choose $N$ with $|a_k-L|<\\frac\\varepsilon2$ for $k>N$. Then $|c_n-L|\\le\\frac Cn+\\frac1n\\sum_{k=N+1}^n|a_k-L|$, where $C=\\sum_{k\\le N}|a_k-L|$ is fixed. The second term is below $\\frac\\varepsilon2$, and $\\frac Cn<\\frac\\varepsilon2$ for large $n$.` },
                { prompt: `Show that the converse fails.`, answer: `$a_n=(-1)^n$ diverges, but $c_n$ is $-\\frac1n$ or $0$, so $c_n\\to0$.` },
                { prompt: `Use the result to find $\\lim\\frac1n\\sum_{k=1}^nk^{1/k}$.`, answer: `$1$, because $k^{1/k}\\to1$ by the worked example, and the averages of a convergent sequence have the same limit.` },
              ],
            },
            {
              slug: 'subsequence-facts',
              title: 'Subsequences',
              prompt: `Prove each statement about subsequences.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `If the even-indexed and odd-indexed subsequences of $(a_n)$ both tend to $L$, then $a_n\\to L$.`, answer: `Given $\\varepsilon>0$, choose $K$ with $|a_{2k}-L|<\\varepsilon$ and $|a_{2k+1}-L|<\\varepsilon$ for $k\\ge K$. Every $n\\ge2K$ is $2k$ or $2k+1$ with $k\\ge K$, so $|a_n-L|<\\varepsilon$.` },
                { prompt: `$(\\sin n)$ has no limit.`, answer: `Suppose $\\sin n\\to L$. Then $\\sin(n+1)-\\sin(n-1)=2\\cos n\\sin1\\to0$, and $\\sin1\\ne0$, so $\\cos n\\to0$. From $\\sin^2n+\\cos^2n=1$, $L^2=1$. But $\\sin2n=2\\sin n\\cos n\\to0$, and $(\\sin2n)$ is a subsequence of $(\\sin n)$, so $L=0$, a contradiction.` },
                { prompt: `If each subsequence of $(a_n)$ has a further subsequence tending to $L$, then $a_n\\to L$.`, answer: `Negate the conclusion. If $a_n\\not\\to L$, there is an $\\varepsilon>0$ with $|a_n-L|\\ge\\varepsilon$ for infinitely many $n$. Those terms form a subsequence, and every further subsequence of it stays at least $\\varepsilon$ from $L$, so none tends to $L$, a contradiction.` },
              ],
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
          quiz: [
            {
              question: `What is $\\lim_{n\\to\\infty}(2^n+5^n)^{1/n}$?`,
              options: ['$1$', '$7$', '$\\sqrt{10}$', '$5$'],
              answer: 3,
              explanation: `$5^n\\le2^n+5^n\\le2\\cdot5^n$, so the $n$th root lies between $5$ and $5\\cdot2^{1/n}$, and $2^{1/n}\\to1$. The squeeze theorem gives $5$: the larger term dominates. The tempting $1$ misapplies $a^{1/n}\\to1$, which holds for a fixed base $a$, not for a base that grows with $n$.`,
            },
            {
              question: `Which fact about a sequence $(a_n)$ proves that it diverges?`,
              options: ['The terms with even index tend to 1, and so do the terms with odd index', '$(a_n)$ is not monotone', 'The terms $a_{n^2}$ tend to 0, and the terms $a_{2n}$ tend to 1', 'Every subsequence has a further subsequence tending to 0'],
              answer: 2,
              explanation: `$(a_{n^2})$ and $(a_{2n})$ are both subsequences, since $n^2$ and $2n$ strictly increase. If $a_n\\to L$, both would tend to $L$, so two different limits prove divergence. "Not monotone" is tempting but proves nothing: $\\frac{(-1)^n}n$ is not monotone and tends to 0. The first and last options actually force convergence, to 1 and to 0.`,
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
              prompt: `Find the limsup and liminf, with proof, and give the set of all subsequential limits.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$a_n=\\cos\\frac{n\\pi}{3}$`, answer: `The values repeat with period 6: $\\frac12,-\\frac12,-1,-\\frac12,\\frac12,1$. Every tail contains all of them, so $t_n=1$ and $s_n=-1$: limsup $1$, liminf $-1$. Subsequential limits: $\\{-1,-\\frac12,\\frac12,1\\}$, one for each value taken infinitely often (any convergent subsequence is eventually constant).` },
                { prompt: `$a_n=(-1)^n\\frac{n}{n+1}$`, answer: `Even terms $\\frac n{n+1}\\to1$ and odd terms $\\to-1$, and every term is in $(-1,1)$. So $t_n\\to1$ and $s_n\\to-1$: limsup $1$, liminf $-1$. Subsequential limits: $\\{-1,1\\}$.` },
                { prompt: `$a_n=(1+(-1)^n)n^{1/n}$`, answer: `Odd terms are $0$, and even terms are $2n^{1/n}\\to2$. Limsup $2$, liminf $0$. Subsequential limits: $\\{0,2\\}$.` },
                { prompt: `$a_n=\\frac{1}{n}+\\sin\\frac{n\\pi}{2}$`, answer: `$\\sin\\frac{n\\pi}2$ cycles through $1,0,-1,0$, and $\\frac1n\\to0$. Along each residue class mod 4 the terms tend to $1$, $0$, $-1$ or $0$. Limsup $1$, liminf $-1$. Subsequential limits: $\\{-1,0,1\\}$.` },
              ],
            },
            {
              slug: 'limsup-properties',
              title: 'Properties of limsup',
              prompt: `For bounded sequences, prove each property. Write $t_n=\\sup_{k\\ge n}a_k$ and $s_n=\\inf_{k\\ge n}a_k$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `$\\limsup(a_n+b_n)\\le\\limsup a_n+\\limsup b_n$.`, answer: `For each $n$, $\\sup_{k\\ge n}(a_k+b_k)\\le\\sup_{k\\ge n}a_k+\\sup_{k\\ge n}b_k$, by the sup of a sum of functions on the tail. Let $n\\to\\infty$.` },
                { prompt: `If $a_n\\to a$, then $\\limsup(a_n+b_n)=a+\\limsup b_n$.`, answer: `Given $\\varepsilon>0$, $a-\\varepsilon<a_k<a+\\varepsilon$ for $k\\ge N$. For $n\\ge N$, $\\sup_{k\\ge n}b_k+a-\\varepsilon\\le\\sup_{k\\ge n}(a_k+b_k)\\le\\sup_{k\\ge n}b_k+a+\\varepsilon$. Let $n\\to\\infty$, then $\\varepsilon\\to0$.` },
                { prompt: `There is a subsequence tending to $\\limsup a_n$.`, answer: `Let $L=\\limsup a_n$, so $t_n$ decreases to $L$. Given $n_{k-1}$, choose $N>n_{k-1}$ with $t_N<L+\\frac1k$. Since $t_N$ is a supremum, some $m\\ge N$ has $a_m>t_N-\\frac1k\\ge L-\\frac1k$, and $a_m\\le t_N<L+\\frac1k$. Put $n_k=m$. Then $n_k$ strictly increases and $|a_{n_k}-L|<\\frac1k$.` },
                { prompt: `Every subsequential limit lies between $\\liminf a_n$ and $\\limsup a_n$.`, answer: `If $a_{n_k}\\to\\ell$, then $s_{n_k}\\le a_{n_k}\\le t_{n_k}$. As $k\\to\\infty$, $s_{n_k}\\to\\liminf a_n$ and $t_{n_k}\\to\\limsup a_n$, being subsequences of convergent sequences. Pass to the limit.` },
                { prompt: `If $a_n>0$, then $\\limsup a_n^{1/n}\\le\\limsup\\frac{a_{n+1}}{a_n}$, when the right side is finite.`, answer: `Let $R$ be the right side and $r>R$. Then $a_{n+1}\\le ra_n$ for $n\\ge N$, so $a_n\\le a_Nr^{n-N}=Cr^n$ for $n\\ge N$. Hence $a_n^{1/n}\\le C^{1/n}r\\to r$, and $\\limsup a_n^{1/n}\\le r$. Since $r>R$ was arbitrary, it is at most $R$.` },
              ],
            },
            {
              slug: 'e-exists',
              title: 'The number e',
              prompt: `Let $a_n=(1+\\frac1n)^n$ and $b_n=\\sum_{k=0}^n\\frac1{k!}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $(a_n)$ is increasing and $a_n\\le b_n<3$, expanding by the binomial theorem.`, answer: `$a_n=\\sum_{k=0}^n\\frac1{k!}\\prod_{j=0}^{k-1}(1-\\frac jn)$. Each factor $1-\\frac jn$ grows with $n$, and $a_{n+1}$ has one more positive term, so $a_n<a_{n+1}$. Each product is at most 1, so $a_n\\le b_n$. Since $k!\\ge2^{k-1}$, $b_n\\le1+1+\\frac12+\\frac14+\\dots<3$.` },
                { prompt: `Show that for each fixed $m$, $\\liminf a_n\\ge b_m$.`, answer: `For $n\\ge m$, drop the terms with $k>m$: $a_n\\ge\\sum_{k=0}^m\\frac1{k!}\\prod_{j<k}(1-\\frac jn)$. This is a fixed finite number of terms, each tending to $\\frac1{k!}$, so the right side tends to $b_m$.` },
                { prompt: `Deduce that both sequences have the same limit $e$.`, answer: `Both are increasing and bounded by 3, so they converge, to $e$ and $b$ say. From $a_n\\le b_n$, $e\\le b$. From the second part, $e\\ge b_m$ for every $m$, so $e\\ge b$.` },
                { prompt: `Prove $0<e-b_n<\\frac1{n\\cdot n!}$, and use it to prove that $e$ is irrational.`, answer: `$e-b_n=\\sum_{k>n}\\frac1{k!}=\\frac1{(n+1)!}\\left(1+\\frac1{n+2}+\\frac1{(n+2)(n+3)}+\\cdots\\right)<\\frac1{(n+1)!}\\sum_{j\\ge0}\\frac1{(n+1)^j}=\\frac1{(n+1)!}\\cdot\\frac{n+1}n=\\frac1{n\\cdot n!}$. If $e=\\frac pq$, then $q!(e-b_q)$ is an integer, as $q!e$ and $q!b_q$ are, and it lies strictly between $0$ and $\\frac1q\\le1$, which is impossible.` },
              ],
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
          quiz: [
            {
              question: `For $a_n=2(-1)^n+\\frac3n$, what are $\\sup a_n$ and $\\limsup a_n$?`,
              options: ['$\\sup a_n=\\limsup a_n=2$', '$\\sup a_n=\\frac72$ and $\\limsup a_n=2$', '$\\sup a_n=5$ and $\\limsup a_n=2$', '$\\sup a_n=\\frac72$ and $\\limsup a_n=-2$'],
              answer: 1,
              explanation: `The terms are $1,\\frac72,-1,\\frac{11}4,\\dots$: odd terms are $-2+\\frac3n$, even terms $2+\\frac3n$. The largest is $a_2=\\frac72$, but the tail suprema $t_n$ decrease to $2$, the limit of the even terms. The supremum sees every term, and the limsup ignores any finite number of them. $5$ adds $2$ and $\\frac31$, but at $n=1$ the sign is negative.`,
            },
            {
              question: `Let $a_n=\\sin\\frac{n\\pi}2$ and $b_n=\\cos\\frac{n\\pi}2$. What is $\\limsup(a_n+b_n)$?`,
              options: ['$1$', '$2$', '$0$', '$\\sqrt2$'],
              answer: 0,
              explanation: `The pairs $(a_n,b_n)$ cycle through $(1,0),(0,-1),(-1,0),(0,1)$, so $a_n+b_n$ cycles through $1,-1,-1,1$, and the limsup is $1$. The tempting $2$ is $\\limsup a_n+\\limsup b_n$, which is only an upper bound: the two sequences reach 1 at different $n$. $\\sqrt2$ is the maximum of $\\sin x+\\cos x$ over all real $x$, which these integer multiples of $\\frac\\pi2$ never reach.`,
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
              prompt: `Give two further proofs of the Bolzano-Weierstrass theorem for a bounded sequence $(a_n)$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove the theorem by repeated bisection: at each stage, keep a half containing infinitely many terms. Use the nested interval theorem, and be careful to choose strictly increasing indices.`, answer: `Let $I_0=[c,d]$ contain all terms. If $I_k$ contains $a_n$ for infinitely many $n$, one of its two closed halves does too; call it $I_{k+1}$. The $I_k$ are closed, bounded and nested, with length $\\frac{d-c}{2^k}\\to0$, so they share a point $x$. Choose $n_1$ with $a_{n_1}\\in I_1$, then $n_{k+1}>n_k$ with $a_{n_{k+1}}\\in I_{k+1}$, possible because infinitely many indices qualify. Then $|a_{n_k}-x|\\le\\frac{d-c}{2^k}\\to0$.` },
                { prompt: `Deduce the theorem from the limsup construction, with no bisection.`, answer: `$L=\\limsup a_n$ exists since $(a_n)$ is bounded, and the tail suprema $t_N$ decrease to $L$. Given $n_{k-1}$, choose $N>n_{k-1}$ with $t_N<L+\\frac1k$, then $m\\ge N$ with $a_m>t_N-\\frac1k$, and set $n_k=m$. Then $|a_{n_k}-L|<\\frac1k$, so this subsequence converges to $L$.` },
              ],
            },
            {
              slug: 'contractive',
              title: 'Contractive sequences',
              prompt: `Suppose that $|a_{n+2}-a_{n+1}|\\le r|a_{n+1}-a_n|$ for all $n$, with $0<r<1$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $(a_n)$ converges.`, answer: `By induction, $|a_{k+1}-a_k|\\le r^{k-1}|a_2-a_1|$. For $m>n$, $|a_m-a_n|\\le\\sum_{k=n}^{m-1}r^{k-1}|a_2-a_1|\\le\\frac{r^{n-1}}{1-r}|a_2-a_1|\\to0$. So $(a_n)$ is Cauchy, and it converges.` },
                { prompt: `Apply this to $a_1=1$, $a_{n+1}=\\frac1{1+a_n}$: show that $r=\\frac49$ works for all $n\\ge 2$, and find the limit.`, answer: `All terms from $a_2$ on lie in $[\\frac12,1]$: $a_2=\\frac12$, and $a_n\\in[\\frac12,1]$ gives $a_{n+1}\\in[\\frac12,\\frac23]$. Then $|a_{n+2}-a_{n+1}|=\\frac{|a_n-a_{n+1}|}{(1+a_n)(1+a_{n+1})}$, and $(1+a_n)(1+a_{n+1})\\ge\\frac94$, so $r=\\frac49$ works. The limit satisfies $L=\\frac1{1+L}$ with $L>0$, so $L^2+L-1=0$ and $L=\\frac{\\sqrt5-1}2\\approx0.618$.` },
                { prompt: `Show that, for this sequence, the terms are not monotone.`, answer: `$a_1=1$, $a_2=\\frac12$, $a_3=\\frac23$, $a_4=\\frac35$: down, up, down. In general $a_{n+2}-a_{n+1}$ has the opposite sign to $a_{n+1}-a_n$, by the formula above, so the terms alternate around $L$.` },
              ],
            },
            {
              slug: 'cauchy-not-consecutive',
              title: 'Consecutive terms are not enough',
              prompt: `Consecutive differences that shrink do not make a sequence Cauchy, but summable ones do.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show that $a_n=\\sum_{k=1}^n\\frac1k$ has $|a_{n+1}-a_n|\\to0$ but is not Cauchy, by bounding $a_{2n}-a_n$ below.`, answer: `$|a_{n+1}-a_n|=\\frac1{n+1}\\to0$. But $a_{2n}-a_n=\\sum_{k=n+1}^{2n}\\frac1k\\ge n\\cdot\\frac1{2n}=\\frac12$ for every $n$, so the Cauchy condition fails for $\\varepsilon=\\frac12$.` },
                { prompt: `Prove that if $\\sum|a_{n+1}-a_n|$ converges, then $(a_n)$ is Cauchy.`, answer: `For $m>n$, $|a_m-a_n|\\le\\sum_{k=n}^{m-1}|a_{k+1}-a_k|\\le\\sum_{k\\ge n}|a_{k+1}-a_k|$, a tail of a convergent series, which tends to 0 as $n\\to\\infty$.` },
                { prompt: `Give a convergent sequence for which $\\sum|a_{n+1}-a_n|$ diverges.`, answer: `$a_n=\\frac{(-1)^n}n\\to0$, but $|a_{n+1}-a_n|=\\frac1{n+1}+\\frac1n\\ge\\frac1n$, and $\\sum\\frac1n$ diverges.` },
              ],
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
          quiz: [
            {
              question: `Suppose $|a_{n+1}-a_n|\\le3\\cdot2^{-n}$ for all $n$. Summing the geometric series, what bound do you get on $|a_m-a_{10}|$ for every $m>10$?`,
              options: ['$3\\cdot2^{-10}$', '$3\\cdot2^{-9}$', '$3\\cdot2^{-11}$', '$6\\cdot2^{-9}$'],
              answer: 1,
              explanation: `$|a_m-a_{10}|\\le\\sum_{k=10}^{m-1}3\\cdot2^{-k}<3\\cdot2^{-10}\\cdot\\frac1{1-\\frac12}=3\\cdot2^{-9}$. The tempting $3\\cdot2^{-10}$ bounds only the first step, $|a_{11}-a_{10}|$, not the whole chain of steps out to $a_m$.`,
            },
            {
              question: `Which sequence is Cauchy?`,
              options: ['$a_n=\\ln n$', '$a_n=(-1)^n$', '$a_n=\\sum_{k=1}^n\\frac1{\\sqrt k}$', '$a_n=\\sum_{k=1}^n\\frac1{k^2}$'],
              answer: 3,
              explanation: `For $m>n$, $\\sum_{k=n+1}^m\\frac1{k^2}<\\sum_{k>n}\\frac1{k(k-1)}=\\frac1n$, so the partial sums of $\\sum\\frac1{k^2}$ are Cauchy. $\\ln n$ is tempting because $\\ln(n+1)-\\ln n\\to0$, but it is unbounded: consecutive terms getting close is not enough. $(-1)^n$ is bounded and has convergent subsequences, yet its terms stay 2 apart.`,
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
              prompt: `Decide whether each series converges, naming the test and checking its hypotheses.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\sum\\frac{n^2}{2^n}$`, answer: `Converges, by the ratio test: $\\frac{a_{n+1}}{a_n}=\\frac{(n+1)^2}{2n^2}\\to\\frac12<1$.` },
                { prompt: `$\\sum\\frac{n!}{n^n}$`, answer: `Converges, by the ratio test: $\\frac{a_{n+1}}{a_n}=\\left(\\frac n{n+1}\\right)^n=\\frac1{(1+\\frac1n)^n}\\to\\frac1e<1$.` },
                { prompt: `$\\sum\\frac1{n\\ln n}$ for $n\\ge2$`, answer: `Diverges, by Cauchy condensation: the terms are positive and decreasing, and $2^ka_{2^k}=\\frac1{k\\ln2}$, a multiple of the harmonic series.` },
                { prompt: `$\\sum\\frac{1}{n(\\ln n)^2}$ for $n\\ge2$`, answer: `Converges, by Cauchy condensation: the terms are positive and decreasing, and $2^ka_{2^k}=\\frac1{k^2(\\ln2)^2}$, which is summable.` },
                { prompt: `$\\sum\\left(\\frac{n}{n+1}\\right)^{n^2}$`, answer: `Converges, by the root test: $a_n^{1/n}=\\left(\\frac n{n+1}\\right)^n\\to\\frac1e<1$.` },
                { prompt: `$\\sum\\frac{1}{\\sqrt{n(n+1)}}$`, answer: `Diverges, by comparison: $\\sqrt{n(n+1)}\\le n+1$, so the terms are at least $\\frac1{n+1}$, and $\\sum\\frac1{n+1}$ diverges.` },
                { prompt: `$\\sum(\\sqrt{n+1}-\\sqrt n)$`, answer: `Diverges, although the terms $\\frac1{\\sqrt{n+1}+\\sqrt n}\\to0$: the sum telescopes, and the $N$th partial sum is $\\sqrt{N+1}-1\\to\\infty$.` },
              ],
            },
            {
              slug: 'tests-proved',
              title: 'Prove the tests',
              prompt: `Prove the tests, then probe their limits.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove the root test, both directions.`, answer: `Let $\\alpha=\\limsup|a_n|^{1/n}$. If $\\alpha<1$, pick $\\alpha<r<1$. Then $|a_n|^{1/n}<r$ for large $n$, so $|a_n|<r^n$, and comparison with $\\sum r^n$ gives absolute convergence. If $\\alpha>1$, then $|a_n|^{1/n}>1$ for infinitely many $n$, so $|a_n|>1$ infinitely often, $a_n\\not\\to0$, and the term test gives divergence.` },
                { prompt: `Prove the ratio test, both directions, as stated in this lesson.`, answer: `If $\\limsup|\\frac{a_{n+1}}{a_n}|<r<1$, then $|a_{n+1}|\\le r|a_n|$ for $n\\ge N$, so $|a_n|\\le|a_N|r^{n-N}$, and compare with a geometric series. If $|\\frac{a_{n+1}}{a_n}|\\ge1$ for $n\\ge N$, then $|a_n|\\ge|a_N|>0$ for $n\\ge N$, so $a_n\\not\\to0$ and the series diverges.` },
                { prompt: `Find a series for which the ratio test is inconclusive, while the root test decides it.`, answer: `$a_n=2^{-n+(-1)^n}$. The ratio $\\frac{a_{n+1}}{a_n}$ alternates between $\\frac18$ (for even $n$) and $2$ (for odd $n$), so its limsup is 2 and it is not eventually $\\ge1$: neither half of the ratio test applies. But $a_n^{1/n}=2^{-1+(-1)^n/n}\\to\\frac12<1$, so the root test gives convergence.` },
                { prompt: `Show that if $a_n\\ge0$ is decreasing and $\\sum a_n$ converges, then $na_n\\to0$. Show by example that "decreasing" is needed.`, answer: `By the Cauchy criterion, for $n\\ge N$, $\\sum_{k=n+1}^{2n}a_k<\\varepsilon$, and each term is at least $a_{2n}$, so $na_{2n}<\\varepsilon$ and $2na_{2n}<2\\varepsilon$. Also $(2n+1)a_{2n+1}\\le3na_{2n}<3\\varepsilon$. So $na_n\\to0$. Without monotonicity: $a_n=\\frac1n$ when $n$ is a perfect square and $\\frac1{n^2}$ otherwise. The series converges, as it is at most $2\\sum\\frac1{k^2}$, but $na_n=1$ at every square.` },
              ],
            },
            {
              slug: 'telescoping-values',
              title: 'Exact values',
              prompt: `Find the exact sum of each series and prove it.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\sum_{n=1}^\\infty\\frac1{n(n+1)}$`, answer: `$1$. Since $\\frac1{n(n+1)}=\\frac1n-\\frac1{n+1}$, the partial sum telescopes to $1-\\frac1{N+1}\\to1$.` },
                { prompt: `$\\sum_{n=1}^\\infty\\frac1{n(n+2)}$`, answer: `$\\frac34$. Since $\\frac1{n(n+2)}=\\frac12\\left(\\frac1n-\\frac1{n+2}\\right)$, the partial sum is $\\frac12\\left(1+\\frac12-\\frac1{N+1}-\\frac1{N+2}\\right)\\to\\frac34$.` },
                { prompt: `$\\sum_{n=1}^\\infty nr^n$ for $|r|<1$`, answer: `$\\frac{r}{(1-r)^2}$. With $S_N=\\sum_{n=1}^Nnr^n$, $S_N-rS_N=\\sum_{n=1}^Nr^n-Nr^{N+1}=\\frac{r(1-r^N)}{1-r}-Nr^{N+1}$. As $N\\to\\infty$, $r^N\\to0$ and $Nr^{N+1}\\to0$, so $(1-r)S_N\\to\\frac r{1-r}$.` },
                { prompt: `$\\sum_{n=0}^\\infty\\frac{2^n+3^n}{6^n}$`, answer: `$\\frac72$. Split into two convergent geometric series: $\\sum(\\frac13)^n+\\sum(\\frac12)^n=\\frac32+2$.` },
              ],
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
          quiz: [
            {
              question: `Apply the root test to $\\sum\\frac{n^5}{3^n}$. What is $\\alpha=\\limsup|a_n|^{1/n}$, and what follows?`,
              options: ['$\\alpha=\\frac13$, so the series converges', '$\\alpha=1$, so the test is inconclusive', '$\\alpha=3$, so the series diverges', '$\\alpha=0$, so the series converges'],
              answer: 0,
              explanation: `$\\left(\\frac{n^5}{3^n}\\right)^{1/n}=\\frac{(n^{1/n})^5}{3}\\to\\frac13<1$, since $n^{1/n}\\to1$. So the series converges absolutely. The polynomial factor is tempting to worry about, but it contributes only $(n^{1/n})^5\\to1$: exponentials beat powers. $\\alpha=3$ inverts the ratio.`,
            },
            {
              question: `Which statement is true for every real sequence $(a_n)$?`,
              options: ['If $a_n\\to0$, then $\\sum a_n$ converges', 'If $a_n>0$ and $\\frac{a_{n+1}}{a_n}<1$ for every $n$, then $\\sum a_n$ converges', 'If $\\sum a_n$ converges, then $a_n\\to0$', 'If $\\left|\\frac{a_{n+1}}{a_n}\\right|\\to1$, then $\\sum a_n$ diverges'],
              answer: 2,
              explanation: `The term test: if $s_n\\to s$, then $a_n=s_n-s_{n-1}\\to s-s=0$. Its converse, the first option, is the classic error: $\\frac1n\\to0$ but $\\sum\\frac1n$ diverges. The same series breaks the second option, since $\\frac n{n+1}<1$ but does not stay below a fixed $r<1$. $\\sum\\frac1{n^2}$ breaks the last one.`,
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
              prompt: `Classify each series as absolutely convergent, conditionally convergent or divergent.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\sum\\frac{(-1)^n}{\\sqrt n}$`, answer: `Conditionally convergent. $\\frac1{\\sqrt n}$ decreases to 0, so the alternating series test applies, but $\\sum\\frac1{\\sqrt n}$ diverges ($p=\\frac12\\le1$).` },
                { prompt: `$\\sum\\frac{(-1)^n}{n^2}$`, answer: `Absolutely convergent: $\\sum\\frac1{n^2}$ converges ($p=2>1$).` },
                { prompt: `$\\sum(-1)^n\\frac{n}{n+1}$`, answer: `Divergent: $|a_n|=\\frac n{n+1}\\to1$, so the terms do not tend to 0.` },
                { prompt: `$\\sum\\frac{\\sin n}{n^2}$`, answer: `Absolutely convergent: $\\left|\\frac{\\sin n}{n^2}\\right|\\le\\frac1{n^2}$.` },
                { prompt: `$\\sum\\frac{(-1)^n}{n\\ln n}$, from $n=2$`, answer: `Conditionally convergent. $\\frac1{n\\ln n}$ decreases to 0, so the alternating series test applies, and $\\sum\\frac1{n\\ln n}$ diverges by condensation.` },
                { prompt: `$\\sum(-1)^n(n^{1/n}-1)$`, answer: `Conditionally convergent. Compare with $\\frac{\\ln n}{n}$: $n^{1/n}-1=e^{\\ln n/n}-1\\ge\\frac{\\ln n}n\\ge\\frac1n$ for $n\\ge3$, so the absolute series diverges. For monotonicity, $\\frac{\\ln x}x$ decreases for $x>e$, so $n^{1/n}-1$ decreases for $n\\ge3$, and it tends to 0. The alternating series test gives convergence.` },
              ],
            },
            {
              slug: 'rearrangement-proofs',
              title: 'Rearrangement proofs',
              prompt: `Prove the rearrangement theorems for absolutely and conditionally convergent series.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Write the proof that an absolutely convergent series has all rearrangements equal in full.`, answer: `Let $S=\\sum a_n$, $s_N$ its partial sums, $\\sigma$ a bijection and $t_m=\\sum_{n\\le m}a_{\\sigma(n)}$. Given $\\varepsilon>0$, choose $N$ with $\\sum_{n>N}|a_n|<\\varepsilon$. Let $M=\\max\\{\\sigma^{-1}(1),\\dots,\\sigma^{-1}(N)\\}$. For $m\\ge M$, $t_m-s_N$ is a sum of distinct $a_k$ with $k>N$, so $|t_m-s_N|\\le\\sum_{k>N}|a_k|<\\varepsilon$. Also $|s_N-S|\\le\\sum_{n>N}|a_n|<\\varepsilon$. Hence $|t_m-S|<2\\varepsilon$ for $m\\ge M$.` },
                { prompt: `Show that the positive terms and negative terms of a conditionally convergent series each have a divergent sum.`, answer: `Let $p_n=\\max(a_n,0)$ and $q_n=\\max(-a_n,0)$, so $a_n=p_n-q_n$ and $|a_n|=p_n+q_n$. If $\\sum p_n$ converged, then so would $\\sum q_n=\\sum(p_n-a_n)$, and then $\\sum|a_n|$, a contradiction. The same argument works with $p$ and $q$ swapped.` },
                { prompt: `Using the previous part, prove Riemann's theorem for a target real value $T$: describe the algorithm and show that it converges.`, answer: `Take positive terms (with any zero terms among them), in order, until the partial sum first exceeds $T$. Then take negative terms until it first drops below $T$, and repeat. Each stage ends, because the unused positive terms, and the unused negative ones, still have divergent sums. Each stage uses at least one new term, so every term is eventually used once: this is a rearrangement. After the first crossing, every partial sum lies within $|a|$ of $T$, where $a$ is the term that made the most recent crossing. Those crossing terms have indices tending to infinity, so their sizes tend to 0, and the partial sums tend to $T$.` },
                { prompt: `Why does the terms' convergence to 0 matter in the previous part?`, answer: `The distance from $T$ after each crossing is bounded only by the size of the term that crossed. If the terms did not tend to 0, the partial sums could keep overshooting by a fixed amount and oscillate. Since the series converges, the term test guarantees $a_n\\to0$.` },
              ],
            },
            {
              slug: 'error-of-alternating',
              title: 'Using the error bound',
              prompt: `Use the alternating series error bound on $\\sum_{n\\ge 1}\\frac{(-1)^{n+1}}{n^2}$, whose true sum is $\\frac{\\pi^2}{12}$, and then test the rearrangement formula numerically.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `How many terms guarantee an error below $10^{-4}$ from the alternating bound?`, answer: `$n=100$. The bound after $n$ terms is $b_{n+1}=\\frac1{(n+1)^2}$, which is below $10^{-4}$ exactly when $n+1>100$. At $n=99$ the bound is $10^{-4}$, which is not below.` },
                { prompt: `Find the true sum and the actual error at that $n$.`, answer: `$\\frac{\\pi^2}{12}\\approx0.8224670$, and $s_{100}\\approx0.8224175$, so the actual error is about $4.95\\times10^{-5}$. That is roughly half the guaranteed bound $\\frac1{101^2}\\approx9.8\\times10^{-5}$.` },
                { prompt: `Use the formula $H_{4k}-\\frac12H_{2k}-\\frac12H_k$ to compute the rearranged partial sum for $k=1000$, and compare it with $\\frac32\\ln2$.`, answer: `$H_{4000}-\\frac12H_{2000}-\\frac12H_{1000}\\approx1.039471$, while $\\frac32\\ln2\\approx1.039721$. The difference is about $-2.5\\times10^{-4}$, roughly $-\\frac1{4k}$.` },
              ],
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
          quiz: [
            {
              question: `How many terms of $\\sum_{n\\ge1}\\frac{(-1)^{n+1}}{n^3}$ does the alternating series bound need to guarantee an error below $10^{-3}$?`,
              options: ['$10$', '$9$', '$11$', '$31$'],
              answer: 0,
              explanation: `The error after $n$ terms is at most $b_{n+1}=\\frac1{(n+1)^3}$, which is below $10^{-3}$ when $n+1>10$, so $n=10$ terms suffice. With $9$ terms the bound is exactly $\\frac1{1000}$, not below it. $31$ comes from using $\\frac1{(n+1)^2}$ instead of the cube.`,
            },
            {
              question: `Which statement about rearrangements is true?`,
              options: ['Every rearrangement of $\\sum\\frac{(-1)^{n+1}}{n}$ has sum $\\ln2$', 'The series $\\sum\\frac{(-1)^n}{\\sqrt n}$ can be rearranged to converge to $\\pi$, but no rearrangement diverges', 'The series $\\sum\\frac{(-1)^n}{n^3}$ can be rearranged to have any real sum', 'Every rearrangement of $\\sum\\frac{(-1)^n}{n^3}$ has the same sum'],
              answer: 3,
              explanation: `$\\sum\\frac1{n^3}$ converges, so $\\sum\\frac{(-1)^n}{n^3}$ converges absolutely, and absolutely convergent series can be rearranged freely. The third option applies Riemann's theorem to the wrong kind of series: it needs conditional convergence. The alternating harmonic series is conditionally convergent, and one rearrangement sums to $\\frac32\\ln2$. Riemann's theorem also allows divergent rearrangements of $\\sum\\frac{(-1)^n}{\\sqrt n}$.`,
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
              prompt: `Classify each set as open, closed, both or neither, and find its limit points and closure.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\{\\frac1n:n\\in\\mathbb{N}\\}$`, answer: `Neither. Not open: no interval around $1$ lies in the set. Not closed: $0$ is a limit point outside it. Limit points: $\\{0\\}$. Closure: $\\{\\frac1n\\}\\cup\\{0\\}$.` },
                { prompt: `$\\{\\frac1n:n\\in\\mathbb{N}\\}\\cup\\{0\\}$`, answer: `Closed, not open. Its only limit point is $0$, which it contains. Limit points: $\\{0\\}$. Closure: the set itself.` },
                { prompt: `$\\mathbb{Z}$`, answer: `Closed, not open: its complement $\\bigcup_n(n,n+1)$ is open. No limit points, since $(n-\\frac12,n+\\frac12)$ meets $\\mathbb{Z}$ only in $n$. Closure: $\\mathbb{Z}$.` },
                { prompt: `$\\mathbb{Q}\\cap[0,1]$`, answer: `Neither. Not open: every interval contains irrationals. Not closed: each irrational in $[0,1]$ is a limit point, by density. Limit points: $[0,1]$. Closure: $[0,1]$.` },
                { prompt: `$\\mathbb{R}\\setminus\\mathbb{Z}$`, answer: `Open, not closed: it is $\\bigcup_n(n,n+1)$, and each integer is a limit point outside it. Limit points: $\\mathbb{R}$. Closure: $\\mathbb{R}$.` },
                { prompt: `$\\{\\frac1m+\\frac1n:m,n\\in\\mathbb{N}\\}$`, answer: `Neither. Limit points: $\\{0\\}\\cup\\{\\frac1m:m\\in\\mathbb{N}\\}$, since $\\frac1m+\\frac1n\\to\\frac1m$ as $n\\to\\infty$ and $\\to0$ as both grow. No other point is one: along distinct terms, one index must be unbounded, so a subsequence tends to some $\\frac1m$ or to $0$. Each $\\frac1m=\\frac1{2m}+\\frac1{2m}$ is already in the set, so the closure is the set together with $0$. Not closed, since $0$ is missing, and not open, since it is countable.` },
              ],
            },
            {
              slug: 'closure-properties',
              title: 'Closure and interior',
              prompt: `Prove each property of the closure $\\bar A$ of a set $A\\subseteq\\mathbb{R}$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\bar A$ is closed.`, answer: `Let $x\\notin\\bar A$. Then $x\\notin A$ and $x$ is not a limit point, so some open interval $J$ around $x$ misses $A$. Every $y\\in J$ has a smaller interval inside $J$, which also misses $A$, so $y\\notin\\bar A$. Hence $J\\subseteq\\bar A^c$, and $\\bar A^c$ is open.` },
                { prompt: `$\\bar A$ is the intersection of all closed sets containing $A$.`, answer: `$\\bar A$ is one of those closed sets, so it contains the intersection. Conversely, if $F\\supseteq A$ is closed, each limit point of $A$ is a limit point of $F$, so it lies in $F$. Hence $\\bar A\\subseteq F$ for every such $F$.` },
                { prompt: `$\\overline{A\\cup B}=\\bar A\\cup\\bar B$.`, answer: `$\\supseteq$: closure is monotone, by the previous part, and $A,B\\subseteq A\\cup B$. $\\subseteq$: $\\bar A\\cup\\bar B$ is closed, as a finite union of closed sets, and contains $A\\cup B$, so it contains $\\overline{A\\cup B}$.` },
                { prompt: `$\\overline{A\\cap B}\\subseteq\\bar A\\cap\\bar B$, and the inclusion may be strict.`, answer: `$A\\cap B\\subseteq A$ gives $\\overline{A\\cap B}\\subseteq\\bar A$, and the same for $B$. Strict: $A=\\mathbb{Q}$, $B=\\mathbb{R}\\setminus\\mathbb{Q}$. Then $\\overline{A\\cap B}=\\varnothing$, and $\\bar A\\cap\\bar B=\\mathbb{R}$.` },
                { prompt: `$A$ is dense in $\\mathbb{R}$ exactly when $\\bar A=\\mathbb{R}$.`, answer: `If $A$ meets every open interval, then for $x\\notin A$ each interval around $x$ contains a point of $A$ other than $x$, so $x$ is a limit point. Hence $\\bar A=\\mathbb{R}$. Conversely, given $(a,b)$, pick $x$ in it. Either $x\\in A$, or $x$ is a limit point and an interval around $x$ inside $(a,b)$ contains a point of $A$.` },
              ],
            },
            {
              slug: 'open-sets-structure',
              title: 'Structure of open sets',
              prompt: `Let $U\\subseteq\\mathbb{R}$ be open. For $x\\in U$, let $I_x$ be the union of all open intervals in $U$ containing $x$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $I_x$ is an open interval contained in $U$.`, answer: `Since $U$ is open, some $(x-\\varepsilon,x+\\varepsilon)\\subseteq U$, so $I_x\\ne\\varnothing$. A union of intervals that all contain $x$ is an interval: any point between $y$ and $x$ lies in the interval that contains both. A union of open sets is open, so $I_x$ is an open interval, possibly with infinite ends, inside $U$.` },
                { prompt: `Prove that every open subset of $\\mathbb{R}$ is a union of disjoint open intervals.`, answer: `$U=\\bigcup_{x\\in U}I_x$. If $I_x$ and $I_y$ meet, then $I_x\\cup I_y$ is an open interval in $U$ containing $x$, so it lies in $I_x$ by maximality, and likewise in $I_y$. So $I_x=I_y$: any two of these intervals are equal or disjoint.` },
                { prompt: `Show that there are only countably many of these intervals.`, answer: `Each interval contains a rational, by density; choose one for each. Distinct intervals are disjoint, so they get distinct rationals. This is an injection into $\\mathbb{Q}$, which is countable.` },
                { prompt: `Show that the only subsets of $\\mathbb{R}$ that are both open and closed are $\\varnothing$ and $\\mathbb{R}$.`, answer: `Use a supremum. Suppose $A$ is open and closed, with $a\\in A$ and $b\\notin A$. If $a>b$, replace $A$ by $A^c$, which is also open and closed, so assume $a<b$. Let $s=\\sup(A\\cap[a,b])$. The set $A\\cap[a,b]$ is closed, so $s\\in A$, and $s<b$ since $b\\notin A$. As $A$ is open, $(s,s+\\varepsilon)\\cap[a,b]\\subseteq A$ for some $\\varepsilon>0$, which contradicts $s$ being the supremum.` },
              ],
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
          quiz: [
            {
              question: `Let $A=\\{(-1)^n+\\frac1n:n\\in\\mathbb{N}\\}$. What is $\\bar A$?`,
              options: ['$A\\cup\\{0\\}$', '$[-1,\\frac32]$', '$A\\cup\\{-1,1\\}$', '$A$ itself, as it is already closed'],
              answer: 2,
              explanation: `The odd terms $-1+\\frac1n$ tend to $-1$, and the even terms $1+\\frac1n$ tend to $1$. These are the only limit points, and neither is in $A$, so $\\bar A=A\\cup\\{-1,1\\}$. $A\\cup\\{0\\}$ copies the closure of $\\{\\frac1n\\}$, and $0$ is in $A$ anyway, as the term for $n=1$. The closure adds only limit points, not the gaps between terms, so it is not an interval.`,
            },
            {
              question: `Which set is neither open nor closed?`,
              options: ['$\\bigcap_n(-\\frac1n,1+\\frac1n)$', '$\\bigcup_n(\\frac1n,2)$', '$\\mathbb{R}\\setminus\\mathbb{N}$', '$\\bigcup_n[\\frac1n,2]$'],
              answer: 3,
              explanation: `$\\bigcup_n[\\frac1n,2]=(0,2]$. It is not open, since no interval around $2$ fits inside, and not closed, since $0$ is a limit point outside it. An infinite union of closed sets need not be closed. The first option is tempting because it intersects open sets, but the result is $[0,1]$, which is closed. $\\bigcup_n(\\frac1n,2)=(0,2)$ and $\\mathbb{R}\\setminus\\mathbb{N}$ are open.`,
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
              prompt: `For each set, either give an open cover with no finite subcover, or prove that it is compact.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\{\\frac1n:n\\in\\mathbb{N}\\}$`, answer: `Not compact. Take $U_1=(\\frac12,2)$ and $U_n=(\\frac1{n+1},\\frac1{n-1})$ for $n\\ge2$. $U_n$ contains $\\frac1k$ only for $n-1<k<n+1$, that is $k=n$, so each $U_n$ holds exactly one point of the set, and finitely many cover only finitely many points.` },
                { prompt: `$\\{\\frac1n:n\\in\\mathbb{N}\\}\\cup\\{0\\}$, directly from the definition.`, answer: `Compact. Given an open cover, pick a member $U_0\\ni0$ and $\\varepsilon>0$ with $(-\\varepsilon,\\varepsilon)\\subseteq U_0$. It contains every $\\frac1n$ with $n>\\frac1\\varepsilon$. The finitely many remaining points each lie in some member, and these with $U_0$ form a finite subcover.` },
                { prompt: `$\\mathbb{N}$`, answer: `Not compact: the intervals $(n-\\frac12,n+\\frac12)$ cover $\\mathbb{N}$, each contains exactly one natural number, and no finite subfamily covers it.` },
                { prompt: `$[0,1]\\cap\\mathbb{Q}$`, answer: `Not compact. Let $U_n=\\{x:|x-\\frac1{\\sqrt2}|>\\frac1n\\}$. Their union is everything except the irrational number $\\frac1{\\sqrt2}$, so they cover the set. Any finite subfamily is contained in the largest $U_N$, which misses the rationals within $\\frac1N$ of $\\frac1{\\sqrt2}$, and density gives such rationals in $[0,1]$.` },
                { prompt: `The Cantor set`, answer: `Compact. It is $\\bigcap_nC_n$, where each $C_n$ is a finite union of closed intervals, hence closed. An intersection of closed sets is closed, and it lies in $[0,1]$, so it is closed and bounded, and Heine-Borel applies.` },
              ],
            },
            {
              slug: 'sequential-to-closed-bounded',
              title: 'Finish Heine-Borel',
              prompt: `Finish the proof of Heine-Borel, then derive some consequences.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that if each sequence in $K$ has a subsequence converging in $K$, then $K$ is closed and bounded.`, answer: `Bounded: otherwise choose $x_n\\in K$ with $|x_n|>n$. Every subsequence is unbounded, so none converges. Closed: if $x_n\\in K$ and $x_n\\to x$, then every subsequence tends to $x$, and some subsequence tends to a point of $K$. Limits are unique, so $x\\in K$.` },
                { prompt: `A closed subset of a compact set is compact.`, answer: `Let $F\\subseteq K$ be closed. Given an open cover of $F$, add the open set $F^c$, which gives a cover of $K$. Take a finite subcover, and remove $F^c$: what remains is a finite cover of $F$.` },
                { prompt: `A finite union of compact sets is compact.`, answer: `An open cover of $K_1\\cup\\dots\\cup K_n$ covers each $K_i$, so each $K_i$ has a finite subcover. The union of these $n$ finite families is a finite subcover of the union.` },
                { prompt: `If $K_1\\supseteq K_2\\supseteq\\cdots$ are non-empty and compact, then $\\bigcap K_n\\ne\\varnothing$.`, answer: `Pick $x_n\\in K_n\\subseteq K_1$. A subsequence $x_{n_k}\\to x\\in K_1$. For each $m$, the terms with $n_k\\ge m$ lie in $K_m$, by nesting, and $K_m$ is closed, so $x\\in K_m$. Hence $x\\in\\bigcap K_m$.` },
              ],
            },
            {
              slug: 'lebesgue-number',
              title: 'The Lebesgue number',
              prompt: `A Lebesgue number for an open cover is a $\\delta>0$ that works uniformly over the set.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Let $K$ be compact, with open cover $\\mathcal{U}$. Prove that there is a $\\delta>0$ such that each $x\\in K$ has $(x-\\delta,x+\\delta)$ contained in a single member of $\\mathcal{U}$.`, answer: `Suppose not. For each $n$, choose $x_n\\in K$ such that $(x_n-\\frac1n,x_n+\\frac1n)$ lies in no single member. A subsequence $x_{n_k}\\to x\\in K$. Pick $U\\in\\mathcal{U}$ and $\\varepsilon>0$ with $(x-\\varepsilon,x+\\varepsilon)\\subseteq U$. For large $k$, $|x_{n_k}-x|<\\frac\\varepsilon2$ and $\\frac1{n_k}<\\frac\\varepsilon2$, so $(x_{n_k}-\\frac1{n_k},x_{n_k}+\\frac1{n_k})\\subseteq U$, a contradiction.` },
                { prompt: `Show by example that this fails for the non-compact set $(0,1)$ with the cover by sets $(\\frac1{n+2},\\frac1n)$.`, answer: `These sets cover $(0,1)$, since consecutive ones overlap in $(\\frac1{n+2},\\frac1{n+1})$ and the left ends tend to 0. Given $\\delta>0$, let $x=\\frac\\delta2$. The interval $(x-\\delta,x+\\delta)$ contains all of $(0,\\frac\\delta2]$, even after intersecting with $(0,1)$. Every member $(\\frac1{n+2},\\frac1n)$ has a positive left end, so none contains the points of $(0,\\frac\\delta2]$ near 0. No $\\delta$ works.` },
              ],
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
          quiz: [
            {
              question: `Which of these sets is compact?`,
              options: ['$\\{\\frac1{n^2}:n\\in\\mathbb{N}\\}$', '$\\{0\\}\\cup\\{\\frac{(-1)^n}{n}:n\\in\\mathbb{N}\\}$', '$[0,1]\\cap\\mathbb{Q}$', '$[0,\\infty)$'],
              answer: 1,
              explanation: `$\\{0\\}\\cup\\{\\frac{(-1)^n}n\\}$ is bounded, and its only limit point, $0$, belongs to it, so it is closed and bounded, and Heine-Borel gives compactness. $\\{\\frac1{n^2}\\}$ is bounded but misses its limit point $0$, so it is not closed. $[0,1]\\cap\\mathbb{Q}$ is not closed, and $[0,\\infty)$ is not bounded.`,
            },
            {
              question: `To prove from the definition that a set $K$ is compact, what must you show?`,
              options: ['Every open cover of $K$ has a finite subcover', 'Some open cover of $K$ has a finite subcover', '$K$ can be covered by finitely many open intervals', 'Every open cover of $K$ has only finitely many members'],
              answer: 0,
              explanation: `Compactness is a statement about **every** open cover. "Some open cover has a finite subcover" holds for every set, since the cover $\\{\\mathbb{R}\\}$ is already finite. The same goes for "finitely many open intervals" for every bounded set, including the non-compact $(0,1)$. A cover may have infinitely many members: the point is that finitely many of them suffice.`,
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
              prompt: `Prove the criteria for continuity.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove the sequential criterion for continuity at a point, both directions. Which direction needs a contradiction or a choice of $\\delta=\\frac1n$?`, answer: `($\\Rightarrow$) Given $\\varepsilon$, take $\\delta$ from continuity. If $x_n\\to c$, then $|x_n-c|<\\delta$ for $n\\ge N$, so $|f(x_n)-f(c)|<\\varepsilon$. ($\\Leftarrow$) This is the direction that needs a contradiction. If $f$ is not continuous at $c$, some $\\varepsilon>0$ defeats every $\\delta$. With $\\delta=\\frac1n$, choose $x_n$ with $|x_n-c|<\\frac1n$ and $|f(x_n)-f(c)|\\ge\\varepsilon$. Then $x_n\\to c$, but $f(x_n)\\not\\to f(c)$.` },
                { prompt: `$f:\\mathbb{R}\\to\\mathbb{R}$ is continuous exactly when $f^{-1}(U)$ is open for every open $U$.`, answer: `($\\Rightarrow$) Let $c\\in f^{-1}(U)$. As $U$ is open, $(f(c)-\\varepsilon,f(c)+\\varepsilon)\\subseteq U$ for some $\\varepsilon$, and continuity gives $\\delta$ with $(c-\\delta,c+\\delta)\\subseteq f^{-1}(U)$. ($\\Leftarrow$) Given $c$ and $\\varepsilon$, the preimage of the open interval $(f(c)-\\varepsilon,f(c)+\\varepsilon)$ is open and contains $c$, so it contains some $(c-\\delta,c+\\delta)$. That is the required $\\delta$.` },
                { prompt: `The composition of continuous functions is continuous, with two proofs: one using sequences, one using open sets.`, answer: `Sequences: if $x_n\\to c$, then $f(x_n)\\to f(c)$ by continuity of $f$, and then $g(f(x_n))\\to g(f(c))$ by continuity of $g$. Open sets: $(g\\circ f)^{-1}(U)=f^{-1}(g^{-1}(U))$, and $g^{-1}(U)$ is open, so its preimage under $f$ is open.` },
              ],
            },
            {
              slug: 'where-continuous',
              title: 'Where is it continuous?',
              prompt: `Determine the points of continuity of each function, with proof.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$f(x)=x$ on $\\mathbb{Q}$ and $0$ on $\\mathbb{R}\\setminus\\mathbb{Q}$`, answer: `Continuous only at $0$. At $0$, $|f(x)-f(0)|\\le|x|$. At $c\\ne0$, rationals $r_n\\to c$ give $f(r_n)\\to c$, and irrationals $s_n\\to c$ give $f(s_n)\\to0$. These two limits differ, so $f$ is not continuous at $c$.` },
                { prompt: `$g(x)=x^2$ on $\\mathbb{Q}$ and $x$ on $\\mathbb{R}\\setminus\\mathbb{Q}$`, answer: `Continuous exactly at $0$ and $1$, where $x^2=x$. At such $c$, $g(c)=c=c^2$, and $|g(x)-g(c)|\\le\\max(|x^2-c^2|,|x-c|)\\to0$ as $x\\to c$. Elsewhere, rational sequences give the limit $c^2$ and irrational ones give $c$, which differ.` },
                { prompt: `$h(x)=x\\sin\\frac1x$ for $x\\ne0$, with $h(0)=0$`, answer: `Continuous everywhere. At $x\\ne0$, it is a product and composition of continuous functions. At $0$, $|h(x)-h(0)|\\le|x|$.` },
                { prompt: `$k(x)=\\lfloor x\\rfloor$`, answer: `Continuous exactly at the non-integers, since $k$ is constant on each $(n,n+1)$. At an integer $n$, $n-\\frac1j\\to n$ while $k(n-\\frac1j)=n-1\\ne n=k(n)$.` },
                { prompt: `$\\ell(x)=\\lfloor\\frac1x\\rfloor^{-1}$ on $(0,1]$`, answer: `For $x\\in(\\frac1{n+1},\\frac1n]$, $\\frac1x\\in[n,n+1)$, so $\\ell(x)=\\frac1n$: a step function. It is discontinuous exactly at $x=\\frac1n$ for $n\\ge2$, where $\\ell=\\frac1n$ but the values just to the right are $\\frac1{n-1}$. It is continuous everywhere else, including at $x=1$, where it is constant on $(\\frac12,1]$.` },
              ],
            },
            {
              slug: 'monotone-discontinuities',
              title: 'Monotone functions',
              prompt: `Let $f:\\mathbb{R}\\to\\mathbb{R}$ be increasing.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that the one-sided limits exist at each point, by using suprema.`, answer: `Let $L=\\sup\\{f(x):x<c\\}$, which exists, since $f(c)$ is an upper bound. Given $\\varepsilon>0$, some $x_0<c$ has $f(x_0)>L-\\varepsilon$, and for $x_0<x<c$, $L-\\varepsilon<f(x_0)\\le f(x)\\le L$. So $f(c^-)=L$. Likewise $f(c^+)=\\inf\\{f(x):x>c\\}$.` },
                { prompt: `Prove that $f$ has at most countably many discontinuities.`, answer: `$f(c^-)\\le f(c)\\le f(c^+)$, and $f$ is continuous at $c$ exactly when $f(c^-)=f(c^+)$. At each discontinuity, choose a rational $q_c\\in(f(c^-),f(c^+))$. For $c<d$, picking $x\\in(c,d)$ gives $f(c^+)\\le f(x)\\le f(d^-)$, so these intervals are disjoint and the $q_c$ are distinct. This injects the discontinuities into $\\mathbb{Q}$.` },
                { prompt: `Build an increasing function that is discontinuous at each rational, using an enumeration $r_1,r_2,\\dots$ and $f(x)=\\sum_{r_n<x}2^{-n}$.`, answer: `The sum has positive terms with total at most 1, so $f$ is well defined, and it is increasing because a larger $x$ adds terms. At $r_m$, the term $2^{-m}$ is excluded from $f(r_m)$, since the inequality is strict, but included for every $x>r_m$. So $f(x)\\ge f(r_m)+2^{-m}$ for $x>r_m$, and $f(r_m^+)>f(r_m)$: a jump at every rational.` },
              ],
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
          quiz: [
            {
              question: `Let $f(x)=x$ for rational $x$ and $f(x)=2-x$ for irrational $x$. Where is $f$ continuous?`,
              options: ['Only at $x=0$', 'Nowhere', 'At every irrational', 'Only at $x=1$'],
              answer: 3,
              explanation: `Near $c$, rational points give values near $c$ and irrational points give values near $2-c$. These agree only when $c=2-c$, so $c=1$, and there $|f(x)-1|=|x-1|$ for every $x$. At any other $c$, two sequences give different limits. $x=0$ is tempting from the similar example with $0$ off $\\mathbb{Q}$, but here the two formulas meet at $1$.`,
            },
            {
              question: `What is enough to prove that $f$ is discontinuous at $c$?`,
              options: ['A point $x$ near $c$ with $f(x)\\ne f(c)$', 'A sequence $x_n\\to c$ along which $f(x_n)\\to f(c)$', 'A single sequence $x_n\\to c$ in the domain with $f(x_n)\\not\\to f(c)$', 'That $f(x_n)\\to f(c)$ for every sequence of rationals $x_n\\to c$'],
              answer: 2,
              explanation: `By the sequential criterion, continuity needs $f(x_n)\\to f(c)$ for **every** sequence $x_n\\to c$, so one bad sequence proves discontinuity. A sequence along which things go well proves nothing, and the rational sequences of the last option are still only some of the sequences. A single nearby point with a different value is normal: $f(x)=x$ is continuous, but $f(x)\\ne f(c)$ for every $x\\ne c$.`,
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
              prompt: `Decide whether each function is uniformly continuous on the given set, and prove it. Give an explicit $\\delta$ for a yes, and a pair of sequences for a no, wherever this is possible.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$x^2$ on $[0,5]$`, answer: `Yes. $|x^2-y^2|=|x+y||x-y|\\le10|x-y|$, so $\\delta=\\frac\\varepsilon{10}$.` },
                { prompt: `$x^3$ on $\\mathbb{R}$`, answer: `No. Take $x_n=n$ and $y_n=n+\\frac1n$. Then $|x_n-y_n|\\to0$, but $y_n^3-x_n^3=3n+\\frac3n+\\frac1{n^3}>3$.` },
                { prompt: `$\\sin x$ on $\\mathbb{R}$`, answer: `Yes. $|\\sin x-\\sin y|=2|\\cos\\frac{x+y}2\\sin\\frac{x-y}2|\\le|x-y|$, so $\\delta=\\varepsilon$.` },
                { prompt: `$\\frac1x$ on $[1,\\infty)$`, answer: `Yes. $\\left|\\frac1x-\\frac1y\\right|=\\frac{|x-y|}{xy}\\le|x-y|$ for $x,y\\ge1$, so $\\delta=\\varepsilon$.` },
                { prompt: `$\\ln x$ on $(0,1)$`, answer: `No. Take $x_n=e^{-n}$ and $y_n=e^{-n-1}$. Then $|x_n-y_n|\\to0$, but $|\\ln x_n-\\ln y_n|=1$.` },
                { prompt: `$\\sqrt x$ on $[0,\\infty)$`, answer: `Yes. For $x\\ge y\\ge0$, $\\sqrt x\\le\\sqrt y+\\sqrt{x-y}$ (square both sides), so $|\\sqrt x-\\sqrt y|\\le\\sqrt{|x-y|}$, and $\\delta=\\varepsilon^2$.` },
                { prompt: `$x\\sin\\frac1x$ on $(0,1)$`, answer: `Yes, but with no simple explicit $\\delta$. Setting the value $0$ at $0$ and $\\sin1$ at $1$ extends it to a continuous function on the compact set $[0,1]$, since $|x\\sin\\frac1x|\\le x$. The Heine-Cantor theorem makes the extension uniformly continuous, and so is its restriction.` },
              ],
            },
            {
              slug: 'extension-theorem',
              title: 'Extending to the closure',
              prompt: `Let $f$ be uniformly continuous on $(a,b)$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $f$ maps Cauchy sequences to Cauchy sequences.`, answer: `Given $\\varepsilon>0$, take $\\delta$ from uniform continuity. If $(x_n)$ is Cauchy, there is $N$ with $|x_m-x_n|<\\delta$ for $m,n\\ge N$, and then $|f(x_m)-f(x_n)|<\\varepsilon$.` },
                { prompt: `Deduce that $f$ extends continuously to $[a,b]$.`, answer: `If $x_n\\to a$ in $(a,b)$, then $(x_n)$ is Cauchy, so $(f(x_n))$ is Cauchy and converges, to $L$ say. Another sequence $y_n\\to a$ gives the same limit: the interleaved sequence $x_1,y_1,x_2,y_2,\\dots$ also tends to $a$, so its image converges, and its two subsequences share that limit. Set $F(a)=L$, likewise $F(b)$, and $F=f$ inside. By the sequential criterion, $F$ is continuous at $a$ and $b$.` },
                { prompt: `Give an example of a continuous function that does not map Cauchy sequences to Cauchy sequences.`, answer: `$f(x)=\\frac1x$ on $(0,1)$. The sequence $x_n=\\frac1{n+1}$ is Cauchy, but $f(x_n)=n+1$ is not.` },
              ],
            },
            {
              slug: 'ivt-applications',
              title: 'Using the two theorems',
              prompt: `Use the intermediate and extreme value theorems to prove each statement.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `If $f:[0,1]\\to\\mathbb{R}$ is continuous with $f(0)=f(1)$, then there is $x\\in[0,\\frac12]$ with $f(x)=f(x+\\frac12)$.`, answer: `Let $g(x)=f(x+\\frac12)-f(x)$ on $[0,\\frac12]$, which is continuous. Then $g(0)=f(\\frac12)-f(0)$ and $g(\\frac12)=f(1)-f(\\frac12)=-g(0)$. So $g$ changes sign or vanishes at an end, and the intermediate value theorem gives a zero.` },
                { prompt: `A continuous injective function on an interval is strictly monotone.`, answer: `Fix $a<b$ in $I$, say with $f(a)<f(b)$. For any $x<y$ in $I$, let $h(t)=f((1-t)y+tb)-f((1-t)x+ta)$ for $t\\in[0,1]$. The two points stay in $I$ and satisfy $(1-t)x+ta<(1-t)y+tb$, so injectivity gives $h(t)\\ne0$. $h$ is continuous with $h(1)>0$, so by the intermediate value theorem it never changes sign, and $h(0)=f(y)-f(x)>0$. So $f$ is strictly increasing. If $f(a)>f(b)$, it is strictly decreasing.` },
                { prompt: `If $f:\\mathbb{R}\\to\\mathbb{R}$ is continuous and $\\lim_{x\\to\\pm\\infty}f(x)=+\\infty$, then $f$ attains a minimum.`, answer: `Choose $R>0$ with $f(x)>f(0)$ for $|x|>R$. On the compact set $[-R,R]$, $f$ attains a minimum $m=f(x_0)$, and $m\\le f(0)$. For $|x|>R$, $f(x)>f(0)\\ge m$. So $m$ is the minimum over $\\mathbb{R}$.` },
                { prompt: `There is no continuous function $f:[0,1]\\to(0,1)$ that is surjective.`, answer: `By the extreme value theorem, $f$ attains a maximum $M=f(x_0)\\in(0,1)$. Then $\\frac{M+1}2\\in(0,1)$ is not a value of $f$. Equivalently, the continuous image of the compact $[0,1]$ is compact, and $(0,1)$ is not.` },
              ],
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
          quiz: [
            {
              question: `For $f(x)=x^3$ on $[-2,2]$, which $\\delta$ guarantees $|f(x)-f(y)|<\\varepsilon$ whenever $|x-y|<\\delta$, for every $\\varepsilon>0$?`,
              options: ['$\\frac\\varepsilon{12}$', '$\\frac\\varepsilon4$', '$\\frac\\varepsilon8$', '$\\sqrt[3]\\varepsilon$'],
              answer: 0,
              explanation: `$|x^3-y^3|=|x-y|\\,|x^2+xy+y^2|\\le12|x-y|$ on $[-2,2]$, so $f$ is Lipschitz with constant 12 and $\\delta=\\frac\\varepsilon{12}$ works. $\\frac\\varepsilon8$ uses the size of $f$, which is $8$ at most, instead of the slope, which reaches $3\\cdot2^2=12$ at $x=\\pm2$. Near $x=2$, a gap of $\\frac\\varepsilon8$ or $\\frac\\varepsilon4$ changes $x^3$ by about $\\frac{3\\varepsilon}2$ or $3\\varepsilon$.`,
            },
            {
              question: `Which function is continuous but **not** uniformly continuous on the given domain?`,
              options: ['$\\sqrt x$ on $[0,\\infty)$', '$\\sin(x^2)$ on $\\mathbb{R}$', '$x\\sin\\frac1x$ on $(0,1)$', '$\\arctan x$ on $\\mathbb{R}$'],
              answer: 1,
              explanation: `Take $x_n=\\sqrt{n\\pi}$ and $y_n=\\sqrt{n\\pi+\\frac\\pi2}$. Then $y_n-x_n=\\frac{\\pi/2}{y_n+x_n}\\to0$, but $|\\sin y_n^2-\\sin x_n^2|=1$: the oscillations get faster and faster. $\\sqrt x$ is tempting because its slope is unbounded at 0, but $|\\sqrt x-\\sqrt y|\\le\\sqrt{|x-y|}$. $x\\sin\\frac1x$ extends continuously to $[0,1]$, and $\\arctan$ is Lipschitz with constant 1.`,
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
              prompt: `Prove each rule with the Caratheodory form. Write $f(x)-f(c)=\\varphi(x)(x-c)$ and $g(x)-g(c)=\\psi(x)(x-c)$, with $\\varphi,\\psi$ continuous at $c$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `The product rule.`, answer: `$f(x)g(x)-f(c)g(c)=(f(x)-f(c))g(x)+f(c)(g(x)-g(c))=\\big[\\varphi(x)g(x)+f(c)\\psi(x)\\big](x-c)$. The bracket is continuous at $c$, as $g$ is continuous there, and its value at $c$ is $f'(c)g(c)+f(c)g'(c)$.` },
                { prompt: `The quotient rule when $g(c)\\ne0$.`, answer: `By continuity, $g\\ne0$ near $c$, so work there. $\\frac1{g(x)}-\\frac1{g(c)}=\\left[-\\frac{\\psi(x)}{g(x)g(c)}\\right](x-c)$, and the bracket is continuous at $c$ with value $-\\frac{g'(c)}{g(c)^2}$. So $(\\frac1g)'(c)=-\\frac{g'(c)}{g(c)^2}$, and the product rule applied to $f\\cdot\\frac1g$ gives $\\frac{f'(c)g(c)-f(c)g'(c)}{g(c)^2}$.` },
                { prompt: `The inverse function theorem in one variable: if $f$ is continuous and strictly monotone on an interval, $f$ is differentiable at $c$ and $f'(c)\\ne0$, then $f^{-1}$ is differentiable at $f(c)$, with derivative $\\frac1{f'(c)}$. Say where you need $f^{-1}$ to be continuous, and why it is.`, answer: `Let $d=f(c)$. $\\varphi(x)\\ne0$ for all $x$: for $x\\ne c$, strict monotonicity gives $f(x)\\ne f(c)$, and $\\varphi(c)=f'(c)\\ne0$. For $y$ in the range, put $x=f^{-1}(y)$: then $f^{-1}(y)-f^{-1}(d)=\\frac{1}{\\varphi(f^{-1}(y))}(y-d)$. The factor $\\frac1{\\varphi\\circ f^{-1}}$ must be continuous at $d$, and this is where $f^{-1}$ must be continuous at $d$. Its value there is $\\frac1{f'(c)}$. It is continuous because $f^{-1}$ is strictly monotone on the interval $f(I)$ (an interval by the intermediate value theorem), and its range $I$ is an interval, so it has no jumps.` },
              ],
            },
            {
              slug: 'smoothness-ladder',
              title: 'A ladder of smoothness',
              prompt: `Let $f_a(x)=|x|^a\\sin\\frac1x$ for $x\\ne0$, with $f_a(0)=0$ and $a>0$. Find the $a$ for which each property holds, and prove it.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$f_a$ is continuous at 0.`, answer: `Every $a>0$: $|f_a(x)|\\le|x|^a\\to0$.` },
                { prompt: `$f_a$ is differentiable at 0.`, answer: `Exactly $a>1$. The difference quotient is $\\frac{f_a(x)}x$, of size $|x|^{a-1}|\\sin\\frac1x|$. For $a>1$ this is at most $|x|^{a-1}\\to0$, so $f_a'(0)=0$. For $a\\le1$, it is $0$ at $x=\\frac1{n\\pi}$ but has size $|x|^{a-1}\\ge1$ at $x=\\frac1{2n\\pi+\\pi/2}$, so it has no limit.` },
                { prompt: `$f_a'$ is continuous at 0.`, answer: `Exactly $a>2$. For $x>0$, $f_a'(x)=ax^{a-1}\\sin\\frac1x-x^{a-2}\\cos\\frac1x$, and for $x<0$ the same with $|x|$ and signs changed. The first term tends to 0 when $a>1$. The second tends to 0 when $a>2$. For $1<a\\le2$, at $x=\\frac1{2n\\pi}$ it is $-x^{a-2}$, which does not tend to 0, while $f_a'(0)=0$.` },
                { prompt: `$f_a'$ is bounded near 0.`, answer: `Exactly $a\\ge2$. For $a\\ge2$, $|f_a'(x)|\\le a|x|^{a-1}+|x|^{a-2}$, which is bounded near 0. For $a<2$, $|f_a'|$ at $x=\\frac1{2n\\pi}$ is $|x|^{a-2}\\to\\infty$.` },
              ],
            },
            {
              slug: 'non-monotone-positive-derivative',
              title: 'Positive derivative at a point',
              prompt: `Let $f(x)=x+2x^2\\sin\\frac1x$ for $x\\ne0$, with $f(0)=0$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Compute $f'(0)$ from the definition.`, answer: `$\\frac{f(x)}x=1+2x\\sin\\frac1x\\to1$, since $|2x\\sin\\frac1x|\\le2|x|$. So $f'(0)=1$.` },
                { prompt: `Show that $f'(\\frac1{2k\\pi})=-1$ for each positive integer $k$.`, answer: `For $x\\ne0$, $f'(x)=1+4x\\sin\\frac1x-2\\cos\\frac1x$. At $x=\\frac1{2k\\pi}$, $\\sin\\frac1x=0$ and $\\cos\\frac1x=1$, so $f'=1-2=-1$.` },
                { prompt: `Conclude that $f$ is not increasing on any interval around 0.`, answer: `Each interval around 0 contains some $x_k=\\frac1{2k\\pi}$. $f'$ is continuous at $x_k\\ne0$ and $f'(x_k)=-1<0$, so $f'<0$ on a small interval around $x_k$, and the mean value theorem makes $f$ strictly decreasing there.` },
                { prompt: `If $f'$ is continuous and $f'(c)>0$, prove that $f$ is increasing near $c$, assuming the mean value theorem.`, answer: `By continuity, $f'>0$ on some $(c-\\delta,c+\\delta)$. For $x<y$ in it, $f(y)-f(x)=f'(\\xi)(y-x)>0$. So $f$ is strictly increasing there.` },
              ],
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
          quiz: [
            {
              question: `Let $f(x)=x^3\\sin\\frac1x$ for $x\\ne0$, with $f(0)=0$. Which statement is true?`,
              options: ['$f\'(0)$ does not exist', '$f\'(0)=0$, but $f\'$ is discontinuous at $0$', '$f\'(0)=0$, and $f\'$ is continuous at $0$', '$f\'(0)=1$'],
              answer: 2,
              explanation: `$\\left|\\frac{f(x)}x\\right|=|x^2\\sin\\frac1x|\\le x^2\\to0$, so $f'(0)=0$. For $x\\ne0$, $f'(x)=3x^2\\sin\\frac1x-x\\cos\\frac1x$, and both terms tend to 0, so $f'$ is continuous at 0. The tempting second option is the behaviour of $x^2\\sin\\frac1x$, whose derivative contains $-\\cos\\frac1x$. The extra power of $x$ damps that term.`,
            },
            {
              question: `Which statement holds for every function $f:\\mathbb{R}\\to\\mathbb{R}$?`,
              options: ['If $f$ is continuous at $c$, then $f$ is differentiable at $c$', 'If $f$ is differentiable at $c$, then $f$ is continuous at $c$', 'If $f$ is differentiable everywhere, then $f\'$ is continuous', 'If $f\'(c)>0$, then $f$ is increasing on some interval around $c$'],
              answer: 1,
              explanation: `$f(x)-f(c)=\\frac{f(x)-f(c)}{x-c}(x-c)\\to f'(c)\\cdot0=0$. The converse, the first option, fails for $|x|$ at 0. The third fails for $x^2\\sin\\frac1x$, and the last for $x+2x^2\\sin\\frac1x$ at 0: a positive derivative at one point says nothing about monotonicity nearby.`,
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
              prompt: `Prove each inequality or limit with the mean value theorem.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `For $x>0$, $\\frac{x}{1+x^2}<\\arctan x<x$.`, answer: `On $[0,x]$, $\\arctan x-\\arctan0=\\frac{x}{1+c^2}$ for some $0<c<x$. Since $1<1+c^2<1+x^2$, this lies strictly between $\\frac x{1+x^2}$ and $x$.` },
                { prompt: `For $0<a<b$ and $p>1$, $pa^{p-1}(b-a)<b^p-a^p<pb^{p-1}(b-a)$.`, answer: `$b^p-a^p=pc^{p-1}(b-a)$ for some $a<c<b$, and $t^{p-1}$ is strictly increasing because $p-1>0$, so $a^{p-1}<c^{p-1}<b^{p-1}$.` },
                { prompt: `$\\sqrt{101}$ lies between $10+\\frac1{22}$ and $10+\\frac1{20}$.`, answer: `On $[100,101]$, $\\sqrt{101}-10=\\frac1{2\\sqrt c}$ with $100<c<101$. So $2\\sqrt c>20$, and $2\\sqrt c<2\\sqrt{101}<22$, as $\\sqrt{101}<11$. Hence $\\frac1{22}<\\sqrt{101}-10<\\frac1{20}$. (Indeed $\\sqrt{101}\\approx10.0499$.)` },
                { prompt: `If $f'(x)\\to L$ as $x\\to\\infty$, then $f(x+1)-f(x)\\to L$.`, answer: `$f(x+1)-f(x)=f'(c_x)$ for some $c_x\\in(x,x+1)$. Given $\\varepsilon$, choose $X$ with $|f'(t)-L|<\\varepsilon$ for $t\\ge X$. For $x\\ge X$, $c_x>X$, so $|f(x+1)-f(x)-L|<\\varepsilon$.` },
              ],
            },
            {
              slug: 'darboux-theorem',
              title: 'Darboux\'s theorem',
              prompt: `Let $f$ be differentiable on $[a,b]$, with $f'(a)<y<f'(b)$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $f'(c)=y$ for some $c\\in(a,b)$. Consider $g(x)=f(x)-yx$, and show that its minimum on $[a,b]$ cannot be at an endpoint.`, answer: `$g$ is continuous on $[a,b]$, so it attains a minimum. $g'(a)=f'(a)-y<0$, so the difference quotient $\\frac{g(x)-g(a)}{x-a}$ is negative for $x$ just above $a$, and $g(x)<g(a)$ there. Likewise $g'(b)>0$ gives $g(x)<g(b)$ for $x$ just below $b$. So the minimum is at an interior $c$, where $g'(c)=0$, that is $f'(c)=y$.` },
                { prompt: `Deduce that a derivative cannot have a jump discontinuity.`, answer: `Suppose $f'(c^+)=B$ exists and $B\\ne f'(c)$. Pick $y$ strictly between $f'(c)$ and $B$, and $\\delta$ with $|f'(x)-B|<\\frac{|B-y|}2$ on $(c,c+\\delta)$. Then $y$ lies between $f'(c)$ and $f'(c+\\frac\\delta2)$, so Darboux gives a point of $(c,c+\\frac\\delta2)$ where $f'=y$. But $f'$ is within $\\frac{|B-y|}2$ of $B$ there, a contradiction. The left side is the same.` },
                { prompt: `Explain why this does not contradict the example $x^2\\sin\\frac1x$ in the previous lesson.`, answer: `Its derivative $2x\\sin\\frac1x-\\cos\\frac1x$ is discontinuous at 0 because it oscillates: the one-sided limits do not exist. That is not a jump, and Darboux's theorem rules out only discontinuities where the one-sided limits exist.` },
              ],
            },
            {
              slug: 'unique-root-counts',
              title: 'Counting roots',
              prompt: `Use Rolle's theorem to prove each statement.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$x^5+3x-7=0$ has exactly one real root.`, answer: `$p(1)=-3<0<31=p(2)$, so the intermediate value theorem gives a root. $p'(x)=5x^4+3>0$, and two roots would give a zero of $p'$ between them, by Rolle.` },
                { prompt: `If a polynomial of degree $n$ has $n$ distinct real roots, then all roots of its derivative are real.`, answer: `Let the roots be $x_1<\\dots<x_n$. Rolle gives a root of $p'$ in each $(x_i,x_{i+1})$: $n-1$ distinct real roots. $p'$ has degree $n-1$, so it has no others.` },
                { prompt: `$e^x=ax+b$ has at most two real solutions, for any real $a,b$.`, answer: `Let $h(x)=e^x-ax-b$. Three zeros would give two zeros of $h'$ by Rolle, and then a zero of $h''$. But $h''(x)=e^x>0$.` },
                { prompt: `If $f$ is twice differentiable on $[0,1]$ with $f(0)=f(1)=f'(0)=0$, then $f''(c)=0$ for some $c\\in(0,1)$.`, answer: `Rolle on $f$ gives $\\xi\\in(0,1)$ with $f'(\\xi)=0$. Now $f'$ is differentiable, with $f'(0)=f'(\\xi)=0$, so Rolle on $f'$ over $[0,\\xi]$ gives $c\\in(0,\\xi)$ with $f''(c)=0$.` },
              ],
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
          quiz: [
            {
              question: `For $f(x)=x^3$ on $[0,3]$, which $c\\in(0,3)$ does the mean value theorem provide?`,
              options: ['$\\frac32$', '$9$', '$3$', '$\\sqrt3$'],
              answer: 3,
              explanation: `The secant slope is $\\frac{27-0}{3-0}=9$, and $f'(c)=3c^2=9$ gives $c=\\sqrt3\\approx1.73$, which is in $(0,3)$. $\\frac32$ is the midpoint, which is the right answer only for quadratics. $9$ is the slope itself, not the point, and $3$ is $c^2$.`,
            },
            {
              question: `Suppose $f$ is differentiable on $(0,1)\\cup(2,3)$ with $f'=0$ there. What follows?`,
              options: ['$f$ is constant on each of the two intervals, possibly with different constants', '$f$ is constant on its whole domain', '$f(\\frac12)=f(\\frac52)$', 'Nothing, since the domain is not an interval'],
              answer: 0,
              explanation: `The mean value theorem applies between any two points of the same interval, so $f$ is constant on $(0,1)$ and on $(2,3)$. It cannot compare a point of one with a point of the other, since the segment between them leaves the domain. For example $f=0$ on $(0,1)$ and $f=1$ on $(2,3)$. "Nothing follows" goes too far the other way.`,
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
              prompt: `Use the Lagrange remainder to get explicit error bounds and inequalities.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find an $n$ such that $P_n$ for $\\sin$ at 0 approximates $\\sin1$ with error below $10^{-6}$, using the remainder only.`, answer: `All derivatives of $\\sin$ are bounded by 1, so $|\\sin1-P_n(1)|\\le\\frac1{(n+1)!}$. Since $9!=362880$ and $10!=3628800$, $n=9$ is the first that works, with bound $\\frac1{10!}\\approx2.8\\times10^{-7}$. ($P_9(1)=1-\\frac16+\\frac1{120}-\\frac1{5040}+\\frac1{362880}\\approx0.84147101$, and the actual error is about $2.5\\times10^{-8}$.)` },
                { prompt: `Use the $n=1$ Taylor polynomial of $\\sqrt{1+x}$ to approximate $\\sqrt{1.1}$, and bound the error with the remainder.`, answer: `$P_1(x)=1+\\frac x2$, so $\\sqrt{1.1}\\approx1.05$. The remainder is $\\frac{f''(c)}2x^2=-\\frac{1}{8}(1+c)^{-3/2}(0.1)^2$ with $0<c<0.1$, so its size is below $\\frac{0.01}8=0.00125$, and $1.05$ is an overestimate. (In fact $\\sqrt{1.1}\\approx1.04881$, an error of about $0.00119$.)` },
                { prompt: `Prove $|\\ln(1+x)-x+\\frac{x^2}2|\\le\\frac{x^3}{3}$ for $x\\ge0$.`, answer: `With $n=2$ at $0$: $f'''(t)=\\frac2{(1+t)^3}$, so $\\ln(1+x)-x+\\frac{x^2}2=\\frac{2}{(1+c)^3}\\cdot\\frac{x^3}{6}=\\frac{x^3}{3(1+c)^3}$ for some $c\\in(0,x)$. This is between $0$ and $\\frac{x^3}3$. At $x=0$ both sides are 0.` },
                { prompt: `Prove $\\cos x\\ge1-\\frac{x^2}{2}$ for all real $x$.`, answer: `Use $n=1$ at $0$: $\\cos x=1-0\\cdot x-\\frac{\\cos c}{2}x^2$ for some $c$ between $0$ and $x$. Since $\\cos c\\le1$, $\\cos x\\ge1-\\frac{x^2}2$. At $x=0$ it is an equality.` },
              ],
            },
            {
              slug: 'flat-function',
              title: 'A flat function',
              prompt: `Let $f(x)=e^{-1/x^2}$ for $x\\ne0$, $f(0)=0$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove by induction that $f^{(n)}(x)=Q_n(\\frac1x)e^{-1/x^2}$ for $x\\ne0$, with $Q_n$ a polynomial.`, answer: `$Q_0=1$. If $f^{(n)}(x)=Q_n(\\frac1x)e^{-1/x^2}$, differentiating gives $\\left(-\\frac1{x^2}Q_n'(\\frac1x)+\\frac2{x^3}Q_n(\\frac1x)\\right)e^{-1/x^2}$. So $Q_{n+1}(u)=-u^2Q_n'(u)+2u^3Q_n(u)$, again a polynomial.` },
                { prompt: `Prove that $f^{(n)}(0)=0$ for all $n$.`, answer: `Induction on $n$. If $f^{(n)}(0)=0$, then $\\frac{f^{(n)}(x)-0}{x}=\\frac1xQ_n(\\frac1x)e^{-1/x^2}=uQ_n(u)e^{-u^2}$ with $u=\\frac1x$. As $x\\to0$, $|u|\\to\\infty$, and $e^{u^2}\\ge\\frac{u^{2k}}{k!}$ beats any polynomial, so the quotient tends to 0. Hence $f^{(n+1)}(0)=0$.` },
                { prompt: `Conclude that $f$ is not represented by its Taylor series near 0.`, answer: `Every Taylor coefficient at 0 is 0, so the series is identically 0. It converges everywhere, but $f(x)>0$ for every $x\\ne0$.` },
                { prompt: `Show that the theorem's remainder does not tend to 0 for $x\\ne 0$.`, answer: `$P_n=0$ for every $n$, so the remainder is $f(x)-P_n(x)=e^{-1/x^2}$, a positive number independent of $n$.` },
              ],
            },
            {
              slug: 'peano-and-uniqueness',
              title: 'Peano remainder and order of contact',
              prompt: `The Peano form of the remainder, and what it says about Taylor polynomials.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Suppose $f^{(n)}$ is continuous near $x_0$. Prove that $\\lim_{x\\to x_0}\\frac{f(x)-P_n(x)}{(x-x_0)^n}=0$.`, answer: `Taylor's theorem with $n-1$ gives $f(x)=P_{n-1}(x)+\\frac{f^{(n)}(c_x)}{n!}(x-x_0)^n$, with $c_x$ between $x_0$ and $x$. Subtracting the last term of $P_n$: $\\frac{f(x)-P_n(x)}{(x-x_0)^n}=\\frac{f^{(n)}(c_x)-f^{(n)}(x_0)}{n!}$. As $x\\to x_0$, $c_x\\to x_0$, and continuity of $f^{(n)}$ makes this tend to 0.` },
                { prompt: `Show that if a polynomial $Q$ of degree at most $n$ also satisfies this limit, then $Q=P_n$.`, answer: `Then $R=P_n-Q$ has $\\frac{R(x)}{(x-x_0)^n}\\to0$. Write $R=\\sum_{k\\le n}r_k(x-x_0)^k$. If $R\\ne0$, let $k$ be the least index with $r_k\\ne0$. Then $\\frac{R(x)}{(x-x_0)^n}=(x-x_0)^{k-n}(r_k+O(x-x_0))$, which tends to $r_k\\ne0$ if $k=n$, and is unbounded if $k<n$. So $R=0$.` },
                { prompt: `Use the previous part to find the $P_4$ of $\\cos(x^2)$ at 0 without computing derivatives.`, answer: `$P_4=1-\\frac{x^4}2$. By the first part for $\\cos$ with $n=3$, $\\cos u-(1-\\frac{u^2}2)=o(u^3)$. Putting $u=x^2$ gives $\\cos(x^2)-(1-\\frac{x^4}2)=o(x^6)$, which is certainly $o(x^4)$. The polynomial $1-\\frac{x^4}2$ has degree 4, so by uniqueness it is $P_4$.` },
                { prompt: `Find $\\lim_{x\\to0}\\frac{\\sin x-x}{x^3}$ with Taylor's theorem.`, answer: `$-\\frac16$. With $n=4$, $\\sin x=x-\\frac{x^3}6+\\frac{\\cos c}{120}x^5$, so $\\frac{\\sin x-x}{x^3}=-\\frac16+\\frac{\\cos c}{120}x^2\\to-\\frac16$.` },
              ],
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
          quiz: [
            {
              question: `Using $0<e-\\sum_{k=0}^n\\frac1{k!}<\\frac3{(n+1)!}$, what is the smallest $n$ that guarantees an error below $10^{-3}$?`,
              options: ['$n=4$', '$n=5$', '$n=6$', '$n=7$'],
              answer: 2,
              explanation: `You need $(n+1)!>3000$. Since $6!=720$ and $7!=5040$, $n+1=7$, so $n=6$. The tempting $n=7$ solves $n!>3000$ instead, forgetting that the remainder after $P_n$ involves $(n+1)!$.`,
            },
            {
              question: `Suppose $f'''$ is continuous near 0, with $f'(0)=f''(0)=0$ and $f'''(0)=6$. What is the point $0$ for $f$?`,
              options: ['A strict local minimum', 'A strict local maximum', 'Nothing can be said, since $f\'\'(0)=0$', 'Neither a local maximum nor a local minimum'],
              answer: 3,
              explanation: `Taylor's theorem with $n=2$ gives $f(x)-f(0)=\\frac{f'''(c)}6x^3$ with $c$ between 0 and $x$. By continuity, $f'''(c)>0$ for $x$ near 0, so $f(x)-f(0)$ has the sign of $x^3$: positive on one side, negative on the other. The second derivative test is silent here, which makes "nothing can be said" tempting, but the next derivative does decide it.`,
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
              prompt: `Find each limit if it exists, naming the form and checking the hypotheses of L'Hopital's rule.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}$`, answer: `$\\frac12$. Form $\\frac00$, and $g'(x)=2x\\ne0$ for $x\\ne0$. $\\frac{f'}{g'}=\\frac{\\sin x}{2x}\\to\\frac12$, using the known limit $\\frac{\\sin x}x\\to1$.` },
                { prompt: `$\\lim_{x\\to0^+}x\\ln x$`, answer: `$0$. Rewrite as $\\frac{\\ln x}{1/x}$, form $\\frac{\\infty}{\\infty}$ with $|g|\\to\\infty$ and $g'=-\\frac1{x^2}\\ne0$. $\\frac{f'}{g'}=\\frac{1/x}{-1/x^2}=-x\\to0$.` },
                { prompt: `$\\lim_{x\\to\\infty}\\frac{x^3}{e^x}$`, answer: `$0$. Form $\\frac\\infty\\infty$, and $g'=e^x\\ne0$. Applying the rule three times gives $\\frac{3x^2}{e^x}$, $\\frac{6x}{e^x}$, $\\frac6{e^x}\\to0$, and each step is justified once the next limit exists.` },
                { prompt: `$\\lim_{x\\to0}\\frac{x-\\sin x}{x^3}$`, answer: `$\\frac16$. Form $\\frac00$, with $g'=3x^2\\ne0$ for $x\\ne0$. $\\frac{f'}{g'}=\\frac{1-\\cos x}{3x^2}\\to\\frac13\\cdot\\frac12$, by the first part.` },
                { prompt: `$\\lim_{x\\to\\infty}\\frac{x+\\sin x}{x}$, where the rule does not help.`, answer: `$1$, since $\\frac{x+\\sin x}x=1+\\frac{\\sin x}x$ and $|\\frac{\\sin x}x|\\le\\frac1x$. The rule does not help, because $\\frac{f'}{g'}=1+\\cos x$ has no limit, and the rule needs that limit to exist.` },
                { prompt: `$\\lim_{x\\to0^+}x^x$`, answer: `$1$. $x^x=e^{x\\ln x}$, and $x\\ln x\\to0$ by the second part, so continuity of $\\exp$ gives $e^0=1$.` },
              ],
            },
            {
              slug: 'infinity-form',
              title: 'Prove the infinity form',
              prompt: `Prove: if $f,g$ are differentiable on $(a,b)$, $g'\\ne0$, $|g(x)|\\to\\infty$ as $x\\to a^+$, and $\\frac{f'}{g'}\\to L$ (real), then $\\frac fg\\to L$. Fix $y$ near $a$ with $\\frac{f'}{g'}$ within $\\varepsilon$ of $L$ on $(a,y)$, apply Cauchy's theorem on $[x,y]$, and let $x\\to a^+$ with $y$ fixed.`,
              kind: 'derivation',
              difficulty: 3,
              answer: `Write $\\frac{f(x)}{g(x)}=\\frac{f(x)-f(y)}{g(x)-g(y)}\\cdot\\frac{g(x)-g(y)}{g(x)}+\\frac{f(y)}{g(x)}$, valid for $x$ near $a$, where $g(x)\\ne0$. Here $g(x)\\ne g(y)$, since otherwise Rolle would give a zero of $g'$. Cauchy's theorem on $[x,y]$ makes the first factor $q=\\frac{f'(c)}{g'(c)}$ for some $c\\in(x,y)$, so $|q-L|<\\varepsilon$. With $y$ fixed and $x\\to a^+$, $|g(x)|\\to\\infty$ gives $\\frac{g(x)-g(y)}{g(x)}=1-\\frac{g(y)}{g(x)}\\to1$ and $\\frac{f(y)}{g(x)}\\to0$. So $\\left|\\frac fg-L\\right|\\le|q-L|+|q|\\left|\\frac{g(y)}{g(x)}\\right|+\\left|\\frac{f(y)}{g(x)}\\right|<\\varepsilon+(|L|+\\varepsilon)\\left|\\frac{g(y)}{g(x)}\\right|+\\left|\\frac{f(y)}{g(x)}\\right|$, which is below $2\\varepsilon$ for $x$ close enough to $a$.`,
            },
            {
              slug: 'derivative-limit-theorem',
              title: 'A corollary',
              prompt: `A corollary of the mean value theorem about limits of derivatives.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Let $f$ be continuous on $[a,b)$, differentiable on $(a,b)$, with $\\lim_{x\\to a^+}f'(x)=L$. Prove that $f'(a)$ exists and equals $L$.`, answer: `For $x\\in(a,b)$, the mean value theorem on $[a,x]$ gives $\\frac{f(x)-f(a)}{x-a}=f'(c_x)$ with $a<c_x<x$. Given $\\varepsilon$, choose $\\delta$ with $|f'(t)-L|<\\varepsilon$ for $a<t<a+\\delta$. For $a<x<a+\\delta$, also $a<c_x<a+\\delta$, so the difference quotient is within $\\varepsilon$ of $L$. Thus the (one-sided) derivative $f'(a)$ is $L$.` },
                { prompt: `Deduce that a derivative can have no removable discontinuity.`, answer: `Let $f$ be differentiable on an interval around $c$ with $\\lim_{x\\to c}f'(x)=L$. Applying the first part on each side of $c$ gives $f'(c)=L$. So whenever the limit of $f'$ exists, it equals the value, and $f'$ is continuous there.` },
                { prompt: `Why does this not apply to $x^2\\sin\\frac1x$?`, answer: `Its derivative $2x\\sin\\frac1x-\\cos\\frac1x$ has no limit at 0, so the hypothesis fails. The theorem says nothing about it, and its discontinuity is an oscillation, not a removable one.` },
                { prompt: `Use the first part to show that $f(x)=e^{-1/x}$ for $x>0$, $f(x)=0$ for $x\\le0$ is differentiable at 0.`, answer: `$f$ is continuous at 0, since $e^{-1/x}\\to0$ as $x\\to0^+$. For $x<0$, $f'(x)=0$. For $x>0$, $f'(x)=\\frac{e^{-1/x}}{x^2}=u^2e^{-u}$ with $u=\\frac1x\\to\\infty$, which tends to 0. The first part, on each side, gives both one-sided derivatives equal to 0, so $f'(0)=0$.` },
              ],
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
          quiz: [
            {
              question: `What is $\\lim_{x\\to0}\\frac{e^x-1-x}{x^2}$?`,
              options: ['$1$', '$\\frac12$', '$0$', 'It does not exist'],
              answer: 1,
              explanation: `The form is $\\frac00$. One application gives $\\frac{e^x-1}{2x}$, again $\\frac00$, and a second gives $\\frac{e^x}2\\to\\frac12$. The tempting $1$ stops after one step and treats $\\frac{e^x-1}{2x}$ as if it were $\\frac{e^x-1}{x}$, losing the factor 2.`,
            },
            {
              question: `What is $\\lim_{x\\to0}\\frac{x+\\cos x}{x+2}$?`,
              options: ['$\\frac12$', '$1$', '$0$', 'It does not exist'],
              answer: 0,
              explanation: `The function is continuous at 0, so the limit is $\\frac{0+1}{0+2}=\\frac12$. The tempting $1$ comes from applying L'Hopital's rule, $\\frac{1-\\sin x}{1}\\to1$, to a form that is not indeterminate. The rule needs $\\frac00$ or $\\frac{\\cdot}{\\infty}$.`,
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
              prompt: `Using partitions into $n$ equal pieces and $U-L\\to0$, compute each integral.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\int_0^1x\\,dx$`, answer: `$\\frac12$. $x$ is increasing, so $U=\\frac1{n^2}\\sum_{k=1}^nk=\\frac{n+1}{2n}$ and $L=\\frac{n-1}{2n}$. Then $U-L=\\frac1n\\to0$, and both tend to $\\frac12$.` },
                { prompt: `$\\int_0^2x^3\\,dx$, using $\\sum k^3=(\\frac{n(n+1)}{2})^2$`, answer: `$4$. With width $\\frac2n$, $U=\\sum_{k=1}^n\\left(\\frac{2k}n\\right)^3\\frac2n=\\frac{16}{n^4}\\left(\\frac{n(n+1)}2\\right)^2=\\frac{4(n+1)^2}{n^2}$ and $L=\\frac{4(n-1)^2}{n^2}$. So $U-L=\\frac{16}n\\to0$, and both tend to $4$.` },
                { prompt: `$\\int_0^1e^x\\,dx$, using a geometric sum`, answer: `$e-1$. $L=\\frac1n\\sum_{k=0}^{n-1}e^{k/n}=\\frac1n\\cdot\\frac{e-1}{e^{1/n}-1}$ and $U=e^{1/n}L$, so $U-L=\\frac{e-1}n\\to0$. Since $\\frac{e^{1/n}-1}{1/n}\\to1$ (the derivative of $e^x$ at 0), $L\\to e-1$.` },
                { prompt: `For $f$ equal to 1 at $x=\\frac12$ and 0 elsewhere on $[0,1]$, show directly that $\\int_0^1f=0$.`, answer: `Every piece contains points where $f=0$, so $L(f,P)=0$ for every $P$. In the equal partition, $\\frac12$ lies in one piece, or in two when it is an endpoint, so $U\\le\\frac2n$. Hence $U-L\\le\\frac2n\\to0$, and the integral is $\\sup L=0$.` },
              ],
            },
            {
              slug: 'refinement-proof',
              title: 'Prove the refinement lemma',
              prompt: `Write the refinement lemma for upper and lower sums in full.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Adding one point to a partition does not decrease $L$ and does not increase $U$.`, answer: `Add $y$ inside $[x_{i-1},x_i]$. The infima $m'$ on $[x_{i-1},y]$ and $m''$ on $[y,x_i]$ are both at least $m_i$, the infimum over the larger set. So $m'(y-x_{i-1})+m''(x_i-y)\\ge m_i\\Delta x_i$, and all other terms are unchanged. For $U$, the suprema on the halves are at most $M_i$, which gives the reverse inequality.` },
                { prompt: `If $P'$ refines $P$ by adding $k$ points, and $|f|\\le M$, then $U(f,P)-U(f,P')\\le2Mk\\cdot\\text{mesh}(P)$.`, answer: `Adding one point $y$ to piece $i$ lowers $U$ by $(M_i-M')(y-x_{i-1})+(M_i-M'')(x_i-y)\\le2M\\Delta x_i$, since all suprema lie in $[-M,M]$. Add the $k$ points one at a time. Each lies in a piece of an intermediate partition, whose mesh is at most $\\text{mesh}(P)$, so each step costs at most $2M\\,\\text{mesh}(P)$.` },
                { prompt: `Give an example in which the refinement strictly improves $U$, and one where it makes no difference.`, answer: `Strict: $f(x)=x$ on $[0,1]$. With $P=\\{0,1\\}$, $U=1$; adding $\\frac12$ gives $U=\\frac12\\cdot\\frac12+1\\cdot\\frac12=\\frac34$. No difference: for a constant function $f=c$, every partition has $U=L=c(b-a)$.` },
              ],
            },
            {
              slug: 'non-integrable-variants',
              title: 'Integrable or not',
              prompt: `Decide whether each function is Riemann integrable on $[0,1]$, and prove your answer.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$f(x)=x$ on $\\mathbb{Q}$ and $0$ otherwise. Find its upper and lower integrals.`, answer: `Not integrable. Each piece contains irrationals, where $f=0$, and all values are $\\ge0$, so $m_i=0$ and every lower sum is 0: the lower integral is $0$. By density of rationals, $M_i=x_i$, so $U(f,P)=\\sum x_i\\Delta x_i$, which is an upper sum of the identity function. These are all at least $\\int_0^1x\\,dx=\\frac12$, and the equal partitions give $\\frac{n+1}{2n}\\to\\frac12$. So the upper sums converge to $\\int_0^1x\\,dx$: the upper integral is $\\frac12\\ne0$.` },
                { prompt: `$g(x)=\\frac1x$ for $x>0$, with $g(0)=0$.`, answer: `Not integrable: $g$ is unbounded, so the supremum on the first piece of every partition is infinite and no upper sum is defined. The Riemann integral is only for bounded functions.` },
                { prompt: `$h(x)=\\sin\\frac1x$ for $x>0$, with $h(0)=0$.`, answer: `Integrable. Given $\\varepsilon>0$, let $\\delta=\\frac\\varepsilon4$. On $[0,\\delta]$, $M-m\\le2$, contributing at most $2\\delta=\\frac\\varepsilon2$ to $U-L$. On $[\\delta,1]$, $h$ is continuous, hence integrable, so some partition there has $U-L<\\frac\\varepsilon2$. Together with the piece $[0,\\delta]$, this gives $U-L<\\varepsilon$.` },
              ],
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
          quiz: [
            {
              question: `Let $f(x)=2x+1$ on $[0,1]$, and let $P$ split $[0,1]$ into 4 equal pieces. What is $U(f,P)$?`,
              options: ['$\\frac74$', '$2$', '$\\frac94$', '$\\frac52$'],
              answer: 2,
              explanation: `$f$ is increasing, so each $M_i$ is the value at the right end: $U=\\frac14(1.5+2+2.5+3)=\\frac94$. $\\frac74$ uses the left ends, which is $L(f,P)$, and $2$ is the integral itself, which lies between the two. As a check, $U-L=\\frac14\\big(f(1)-f(0)\\big)=\\frac12$.`,
            },
            {
              question: `Which function is **not** Riemann integrable on $[0,1]$?`,
              options: ['$f(x)=x^2$', 'A step function with ten jumps', '$f=1$ at $x=\\frac12$ and $0$ elsewhere', '$f(x)=\\frac1{\\sqrt x}$ for $x>0$, with $f(0)=0$'],
              answer: 3,
              explanation: `$\\frac1{\\sqrt x}$ is unbounded near 0, so its upper sums are infinite, and the Riemann integral is defined only for bounded functions. It is tempting to call it integrable because the improper integral $\\lim_{t\\to0^+}\\int_t^1\\frac{dx}{\\sqrt x}=2$ exists, but that is a separate definition. The other three are bounded with finitely many discontinuities, so they are integrable.`,
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
              answer: `Every piece contains irrationals, so $L(T,P)=0$ for every $P$. Given $\\varepsilon>0$, only finitely many points of $[0,1]$ have $T\\ge\\frac\\varepsilon2$: the $\\frac pq$ with $q\\le\\frac2\\varepsilon$. Call them $N$ points. Choose a partition in which these points lie in pieces of total length below $\\frac\\varepsilon2$, for example by surrounding each with pieces of length under $\\frac\\varepsilon{4N}$. On those pieces $M_i\\le1$, contributing less than $\\frac\\varepsilon2$. On all other pieces $M_i<\\frac\\varepsilon2$, and their total length is at most 1, so they contribute less than $\\frac\\varepsilon2$. Hence $U-L=U<\\varepsilon$: $T$ is integrable, and $\\int_0^1T=\\sup L=0$.`,
            },
            {
              slug: 'integral-properties',
              title: 'Prove the properties',
              prompt: `Prove each property of the Riemann integral.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `If $f$ is integrable, then so is $f^2$.`, answer: `Let $|f|\\le M$. On a piece, $|f(x)^2-f(y)^2|=|f(x)+f(y)|\\,|f(x)-f(y)|\\le2M(M_i-m_i)$. So the oscillation of $f^2$ there is at most $2M(M_i-m_i)$, and $U(f^2,P)-L(f^2,P)\\le2M\\big(U(f,P)-L(f,P)\\big)$, which can be made small.` },
                { prompt: `If $f,g$ are integrable, then so is $fg$, using $4fg=(f+g)^2-(f-g)^2$.`, answer: `$f\\pm g$ are integrable by linearity, their squares by the previous part, and then $fg=\\frac14\\big((f+g)^2-(f-g)^2\\big)$ by linearity again.` },
                { prompt: `If $f$ is integrable, then so is $|f|$, and $|\\int f|\\le\\int|f|$.`, answer: `$||f(x)|-|f(y)||\\le|f(x)-f(y)|$, so on each piece the oscillation of $|f|$ is at most that of $f$, and $U-L$ for $|f|$ is at most $U-L$ for $f$. Then $-|f|\\le f\\le|f|$ and monotonicity give $-\\int|f|\\le\\int f\\le\\int|f|$.` },
                { prompt: `If $f\\ge 0$ is continuous on $[a,b]$ and $\\int_a^bf=0$, then $f=0$.`, answer: `If $f(c)>0$, continuity gives an interval $[\\alpha,\\beta]\\subseteq[a,b]$ of positive length on which $f\\ge\\frac{f(c)}2$. Since $f\\ge0$ elsewhere, additivity and monotonicity give $\\int_a^bf\\ge\\frac{f(c)}2(\\beta-\\alpha)>0$, a contradiction.` },
                { prompt: `If $f$ is continuous on $[a,b]$ and $\\int_a^bfg=0$ for each continuous $g$, then $f=0$.`, answer: `Take $g=f$. Then $\\int_a^bf^2=0$, and $f^2\\ge0$ is continuous, so $f^2=0$ by the previous part, and $f=0$.` },
              ],
            },
            {
              slug: 'measure-zero-practice',
              title: 'Measure zero',
              prompt: `A set has measure zero if, for each $\\varepsilon>0$, it can be covered by countably many open intervals of total length under $\\varepsilon$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that each countable set has measure zero.`, answer: `List the set as $x_1,x_2,\\dots$ and cover $x_n$ by an open interval of length $\\frac\\varepsilon{2^{n+1}}$. The total length is $\\frac\\varepsilon2<\\varepsilon$.` },
                { prompt: `Prove that a countable union of measure-zero sets has measure zero.`, answer: `Cover $A_n$ by countably many intervals of total length below $\\frac\\varepsilon{2^n}$. All these intervals together form a countable family, a countable union of countable families, covering $\\bigcup A_n$ with total length below $\\sum\\frac\\varepsilon{2^n}=\\varepsilon$.` },
                { prompt: `Show that the Cantor set has measure zero, and that it is uncountable, so that the converse of the first part fails.`, answer: `$C\\subseteq C_n$, which is $2^n$ closed intervals of length $3^{-n}$, total $(\\frac23)^n$. Enlarging each slightly to an open interval gives a cover of total length below $2(\\frac23)^n$, which is less than any $\\varepsilon$ for large $n$. Uncountable: the points of $C$ are exactly the numbers with a ternary expansion using only the digits 0 and 2, and that expansion is unique. Replacing 2 by 1 gives a bijection with all 0-1 sequences, which are uncountable by the diagonal argument.` },
                { prompt: `Using Lebesgue's criterion, show that the indicator function of the Cantor set is integrable, and find its integral.`, answer: `$\\chi_C$ is bounded. Off $C$ it is continuous, since $C^c$ is open and $\\chi_C=0$ near each such point. So its discontinuities lie in $C$, which has measure zero, and it is integrable. Its integral is $0$: $C$ contains no interval, as it has measure zero, so every piece of every partition contains points outside $C$, and all lower sums are 0.` },
              ],
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
          quiz: [
            {
              question: `Let $f$ be increasing on $[0,2]$ with $f(0)=1$ and $f(2)=5$. With $n$ equal pieces, what is the least $n$ that guarantees $U(f,P)-L(f,P)<0.01$?`,
              options: ['$n=401$', '$n=801$', '$n=800$', '$n=1601$'],
              answer: 1,
              explanation: `For monotone $f$ on equal pieces of width $h=\\frac2n$, $U-L=h\\big(f(2)-f(0)\\big)=\\frac8n$. You need $\\frac8n<0.01$, so $n>800$, giving $n=801$. $n=800$ gives exactly $0.01$, not less. $n=401$ uses width $\\frac1n$, forgetting that the interval has length 2.`,
            },
            {
              question: `Which function is Riemann integrable on $[0,1]$?`,
              options: ['The indicator of $\\{\\frac1n:n\\in\\mathbb{N}\\}$', '$f=1$ on $\\mathbb{Q}$ and $f=-1$ off $\\mathbb{Q}$', 'The indicator of $\\mathbb{Q}\\cap[0,1]$', '$f(x)=\\frac1x$ for $x>0$, with $f(0)=0$'],
              answer: 0,
              explanation: `The indicator of $\\{\\frac1n\\}$ is bounded and discontinuous only on $\\{\\frac1n\\}\\cup\\{0\\}$, a countable set, so Lebesgue's criterion makes it integrable (with integral 0). The second option is tempting because $|f|=1$ is integrable, but $f$ itself is discontinuous everywhere: every upper sum is $1$ and every lower sum is $-1$. The indicator of $\\mathbb{Q}$ is Dirichlet's function, and $\\frac1x$ is unbounded.`,
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
              prompt: `Work with functions defined by integrals.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find $F(x)=\\int_0^x\\lfloor t\\rfloor\\,dt$ on $[0,3]$ and state where $F'$ exists.`, answer: `$F(x)=0$ on $[0,1]$, $x-1$ on $[1,2]$, and $2x-3$ on $[2,3]$. $F$ is continuous, and $F'=\\lfloor x\\rfloor$ exists everywhere except at $x=1$ and $x=2$, where the one-sided slopes are $0,1$ and $1,2$, the jumps of the integrand.` },
                { prompt: `Find $\\frac{d}{dx}\\int_{x}^{x^2}e^{-t^2}\\,dt$ and prove your answer.`, answer: `$2xe^{-x^4}-e^{-x^2}$. Let $G(u)=\\int_0^ue^{-t^2}\\,dt$. The integrand is continuous, so $G'(u)=e^{-u^2}$ by Form 2. The integral is $G(x^2)-G(x)$, and the chain rule gives $2xG'(x^2)-G'(x)$.` },
                { prompt: `If $f$ is continuous and $\\int_0^xf=\\int_x^1f$ for all $x\\in[0,1]$, find $f$.`, answer: `$f=0$. Differentiating with Form 2 gives $f(x)=-f(x)$ for $x\\in(0,1)$, so $f=0$ there, and at the ends by continuity. Conversely $f=0$ satisfies the equation.` },
                { prompt: `Find a function that is continuous on $[0,1]$ and solves $f(x)=1+\\int_0^xf(t)\\,dt$. Is it unique?`, answer: `$f(x)=e^x$, and it is unique. Any continuous solution makes the right side differentiable by Form 2, so $f'=f$ with $f(0)=1$. Then $(e^{-x}f)'=e^{-x}(f'-f)=0$, so $e^{-x}f$ is constant, equal to its value $1$ at 0.` },
              ],
            },
            {
              slug: 'mean-value-integrals',
              title: 'Mean value results',
              prompt: `Prove the mean value theorems for integrals and use them for Taylor's remainder.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove the mean value theorem for integrals, and show by example that continuity is required.`, answer: `$f$ attains a minimum $m$ and maximum $M$, so $m(b-a)\\le\\int_a^bf\\le M(b-a)$. The average $\\frac1{b-a}\\int_a^bf$ lies in $[m,M]$, and the intermediate value theorem gives $c$ with $f(c)$ equal to it. Without continuity: $f=0$ on $[0,1)$ and $f=1$ on $[1,2]$ has average $\\frac12$, which $f$ never takes.` },
                { prompt: `The weighted version: if $f$ is continuous and $g\\ge0$ is integrable, then $\\int fg=f(c)\\int g$ for some $c\\in[a,b]$.`, answer: `$fg$ is integrable, and $mg\\le fg\\le Mg$ since $g\\ge0$, so $m\\int g\\le\\int fg\\le M\\int g$. If $\\int g=0$, then $\\int fg=0$ and any $c$ works. Otherwise $\\frac{\\int fg}{\\int g}\\in[m,M]$, and the intermediate value theorem gives $c$.` },
                { prompt: `Using the weighted version, obtain the integral form of Taylor's remainder and the Lagrange form from it, given that $f^{(n+1)}$ is continuous.`, answer: `Integral form: $f(x)=P_n(x)+\\frac1{n!}\\int_{x_0}^xf^{(n+1)}(t)(x-t)^n\\,dt$. For $n=0$ it is Form 1. Integrating by parts, $\\frac1{n!}\\int_{x_0}^xf^{(n+1)}(t)(x-t)^ndt=\\frac{f^{(n+1)}(x_0)}{(n+1)!}(x-x_0)^{n+1}+\\frac1{(n+1)!}\\int_{x_0}^xf^{(n+2)}(t)(x-t)^{n+1}dt$, which is the induction step. For Lagrange, the weight $(x-t)^n$ has constant sign between $x_0$ and $x$, so the weighted theorem gives $\\int_{x_0}^xf^{(n+1)}(t)(x-t)^ndt=f^{(n+1)}(c)\\frac{(x-x_0)^{n+1}}{n+1}$. Dividing by $n!$ gives $\\frac{f^{(n+1)}(c)}{(n+1)!}(x-x_0)^{n+1}$.` },
              ],
            },
            {
              slug: 'non-integrable-derivative',
              title: 'A derivative that is not integrable',
              prompt: `Let $F(x)=x^2\\sin\\frac1{x^2}$ for $x\\in(0,1]$, with $F(0)=0$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $F$ is differentiable on $[0,1]$.`, answer: `On $(0,1]$, by the product and chain rules: $F'(x)=2x\\sin\\frac1{x^2}-\\frac2x\\cos\\frac1{x^2}$. At 0, $\\left|\\frac{F(x)}x\\right|=|x\\sin\\frac1{x^2}|\\le x\\to0$, so $F'(0)=0$.` },
                { prompt: `Prove that $F'$ is unbounded on $(0,1]$, and hence not Riemann integrable.`, answer: `At $x_k=\\frac1{\\sqrt{2k\\pi}}$, $\\sin\\frac1{x_k^2}=0$ and $\\cos\\frac1{x_k^2}=1$, so $F'(x_k)=-\\frac2{x_k}=-2\\sqrt{2k\\pi}\\to-\\infty$. Riemann integrable functions are bounded.` },
                { prompt: `Say why this does not contradict Form 1.`, answer: `Form 1 assumes that $f=F'$ is integrable. That hypothesis fails here, so the theorem makes no claim.` },
                { prompt: `Show that the improper integral $\\lim_{t\\to0^+}\\int_t^1F'$ still exists, and compute it.`, answer: `$\\sin1\\approx0.841$. On $[t,1]$, $F'$ is continuous, so Form 1 gives $\\int_t^1F'=F(1)-F(t)=\\sin1-t^2\\sin\\frac1{t^2}$, and $|t^2\\sin\\frac1{t^2}|\\le t^2\\to0$.` },
              ],
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
          quiz: [
            {
              question: `What is $\\frac{d}{dx}\\int_0^{x^3}\\cos(t^2)\\,dt$?`,
              options: ['$\\cos(x^6)$', '$3x^2\\cos(x^3)$', '$\\cos(x^6)-1$', '$3x^2\\cos(x^6)$'],
              answer: 3,
              explanation: `With $G(u)=\\int_0^u\\cos(t^2)\\,dt$, Form 2 gives $G'(u)=\\cos(u^2)$, since the integrand is continuous. The integral is $G(x^3)$, so the chain rule gives $\\cos\\big((x^3)^2\\big)\\cdot3x^2$. $\\cos(x^6)$ forgets the inner derivative, and $3x^2\\cos(x^3)$ substitutes $x^3$ for $t^2$ instead of for $t$.`,
            },
            {
              question: `Let $f(t)=1$ for $0\\le t<1$ and $f(t)=3$ for $1\\le t\\le2$, and $F(x)=\\int_0^xf$. Which statement is true?`,
              options: ['$F$ is discontinuous at $1$', '$F\'(1)=2$, the average of the two values', '$F$ is continuous on $[0,2]$ but not differentiable at $1$', '$F\'(1)=3$, since $f(1)=3$'],
              answer: 2,
              explanation: `$F(x)=x$ on $[0,1]$ and $F(x)=1+3(x-1)$ on $[1,2]$. $F$ is Lipschitz, hence continuous, but its one-sided slopes at 1 are $1$ and $3$, so $F'(1)$ does not exist. "$F'(1)=f(1)$" is tempting, but Form 2 gives $F'=f$ only where $f$ is continuous, and changing $f(1)$ would not change $F$ at all.`,
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
              prompt: `Find the pointwise limit, and decide if the convergence is uniform.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$f_n(x)=\\frac{x}{n}$ on $[0,1]$, and on $\\mathbb{R}$`, answer: `Limit $0$. Uniform on $[0,1]$, since $\\sup|f_n|=\\frac1n$. Not uniform on $\\mathbb{R}$: $f_n(n)=1$ for every $n$.` },
                { prompt: `$f_n(x)=\\frac{x^n}{1+x^n}$ on $[0,\\frac12]$, and on $[0,1]$`, answer: `On $[0,\\frac12]$, the limit is $0$ and $|f_n|\\le2^{-n}$, so it is uniform. On $[0,1]$, the limit is $0$ on $[0,1)$ and $\\frac12$ at $1$. That limit is discontinuous, so the convergence is not uniform: indeed $\\sup_{[0,1)}f_n=\\frac12$.` },
                { prompt: `$f_n(x)=x^n(1-x)$ on $[0,1]$`, answer: `Limit $0$, uniformly. Maximise by calculus: the derivative $x^{n-1}(n-(n+1)x)$ vanishes at $x=\\frac n{n+1}$, where the value is $\\left(\\frac n{n+1}\\right)^n\\frac1{n+1}<\\frac1{n+1}\\to0$.` },
                { prompt: `$f_n(x)=nx(1-x^2)^n$ on $[0,1]$`, answer: `Limit $0$: at $x=0$ and $x=1$ every term is 0, and for $0<x<1$, $nr^n\\to0$ with $r=1-x^2$. Not uniform: at $x=\\frac1{\\sqrt n}$, $f_n=\\sqrt n(1-\\frac1n)^n\\ge\\frac{\\sqrt n}4$ for $n\\ge2$, which is unbounded.` },
                { prompt: `$f_n(x)=\\sqrt{x^2+\\frac1{n^2}}$ on $\\mathbb{R}$`, answer: `Limit $|x|$, uniformly: $\\sqrt{x^2+\\frac1{n^2}}-|x|=\\frac{1/n^2}{\\sqrt{x^2+1/n^2}+|x|}\\le\\frac{1/n^2}{1/n}=\\frac1n$ for all $x$.` },
              ],
            },
            {
              slug: 'm-test-applications',
              title: 'Using the M-test',
              prompt: `Prove uniform convergence with the Weierstrass M-test, and say on what set.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\sum_{k=1}^\\infty\\frac{\\cos kx}{k^3}$`, answer: `Uniform on all of $\\mathbb{R}$: $\\left|\\frac{\\cos kx}{k^3}\\right|\\le\\frac1{k^3}$, and $\\sum\\frac1{k^3}$ converges.` },
                { prompt: `$\\sum_{k=0}^\\infty x^k$ on $[-r,r]$, for $0<r<1$. Show that it is not uniform on $(-1,1)$.`, answer: `On $[-r,r]$, $|x^k|\\le r^k$, and $\\sum r^k$ converges. On $(-1,1)$, $\\sup|\\frac1{1-x}-s_n(x)|=\\sup\\frac{|x|^{n+1}}{1-x}=\\infty$ for every $n$. Equivalently, each partial sum is bounded by $n+1$, but the limit $\\frac1{1-x}$ is unbounded, and a uniform limit of bounded functions is bounded.` },
                { prompt: `$\\sum_{k=1}^\\infty\\frac{x}{k^2+x^2}$ on $[-R,R]$ for $R>0$`, answer: `Uniform on $[-R,R]$: $\\left|\\frac x{k^2+x^2}\\right|\\le\\frac R{k^2}$, and $\\sum\\frac R{k^2}$ converges.` },
                { prompt: `Define $\\zeta(s)=\\sum k^{-s}$ on $[a,\\infty)$ with $a>1$, and explain why it is continuous on $(1,\\infty)$.`, answer: `For $s\\ge a$, $k^{-s}\\le k^{-a}$, and $\\sum k^{-a}$ converges because $a>1$. So the series converges uniformly on $[a,\\infty)$, and $\\zeta$ is continuous there, as a uniform limit of continuous partial sums. Any $s>1$ lies in some $(a,\\infty)$ with $1<a<s$, and continuity is a local property.` },
              ],
            },
            {
              slug: 'dini-theorem',
              title: 'Dini\'s theorem',
              prompt: `Let $K$ be compact, $f_n,f:K\\to\\mathbb{R}$ continuous, $f_n(x)\\le f_{n+1}(x)$ for all $x$, $n$, and $f_n\\to f$ pointwise.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that the convergence is uniform. Use an open cover or a sequence argument.`, answer: `Let $g_n=f-f_n$: continuous, $\\ge0$, decreasing in $n$, tending to 0 pointwise. Given $\\varepsilon>0$, the sets $U_n=\\{x\\in K:g_n(x)<\\varepsilon\\}$ are open in $K$ by continuity, increase with $n$, and cover $K$ by pointwise convergence. A finite subcover exists, and since they are nested, $U_N=K$ for some $N$. For $n\\ge N$, $0\\le g_n\\le g_N<\\varepsilon$ on $K$.` },
                { prompt: `Show that each hypothesis (compact, continuous limit, monotone) is needed, with an example for each.`, answer: `Compact: $f_n(x)=1-x^n$ on $[0,1)$ increases to the continuous limit $1$, but $\\sup|1-f_n|=1$. Continuous limit: $f_n(x)=-x^n$ on $[0,1]$ increases to $0$ on $[0,1)$ and $-1$ at $1$, not uniformly. Monotone: $f_n(x)=nxe^{-nx}$ on $[0,1]$ tends to the continuous limit $0$, but $f_n(\\frac1n)=e^{-1}$.` },
              ],
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
          quiz: [
            {
              question: `Let $f_n(x)=\\frac{x}{1+nx^2}$ on $[0,\\infty)$, which tends to 0 pointwise. What is $\\sup|f_n|$, and is the convergence uniform?`,
              options: ['$\\frac1{2\\sqrt n}$, so the convergence is uniform', '$\\frac12$, so the convergence is not uniform', '$\\frac1n$, so the convergence is uniform', '$\\infty$, so the convergence is not uniform'],
              answer: 0,
              explanation: `$f_n'(x)=\\frac{1-nx^2}{(1+nx^2)^2}$ vanishes at $x=\\frac1{\\sqrt n}$, where $f_n=\\frac{1/\\sqrt n}{2}=\\frac1{2\\sqrt n}\\to0$. So the convergence is uniform. The tempting $\\frac12$ is the height of the sliding bump $\\frac{nx}{1+n^2x^2}$, where the factor $n$ is in the numerator. Here the bump shrinks.`,
            },
            {
              question: `Continuous functions $f_n$ on $[0,1]$ converge pointwise to a **continuous** $f$. What follows?`,
              options: ['The convergence must be uniform, since the limit is continuous', 'The convergence may still fail to be uniform', 'The convergence is uniform if each $f_n$ is bounded', 'The convergence is uniform on every $[0,a]$ with $a<1$'],
              answer: 1,
              explanation: `A continuous limit is necessary for uniform convergence, not sufficient. The sliding bump $\\frac{nx}{1+n^2x^2}$ tends to $0$ at every point, yet equals $\\frac12$ at $x=\\frac1n$. Each $f_n$ is bounded, and the bump lies inside every $[0,a]$ for large $n$, so the last two options fail as well. Dini's theorem gives uniformity only with monotonicity added.`,
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
              prompt: `For each pair, compute both sides and say why they agree or differ.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\lim\\int_0^1x^n\\,dx$ and $\\int_0^1\\lim x^n\\,dx$`, answer: `Both are $0$: $\\int_0^1x^n=\\frac1{n+1}\\to0$, and the limit is $0$ except at $x=1$, so its integral is $0$. They agree although the convergence is not uniform: the integral theorem is sufficient, not necessary.` },
                { prompt: `$\\lim\\int_0^1n^2x(1-x)^n\\,dx$ and $\\int_0^1\\lim n^2x(1-x)^n\\,dx$`, answer: `They differ: $1$ and $0$. $\\int_0^1n^2x(1-x)^n\\,dx=\\frac{n^2}{(n+1)(n+2)}\\to1$, while $n^2x(1-x)^n\\to0$ for every $x$. The convergence is not uniform: at $x=\\frac1{n+1}$ the value is about $\\frac ne$.` },
                { prompt: `$\\lim\\int_0^{1}\\frac{nx}{1+n^2x^2}\\,dx$ and the integral of the limit`, answer: `Both are $0$: the integral is $\\frac{\\ln(1+n^2)}{2n}\\to0$, and the pointwise limit is $0$. They agree although the convergence is not uniform, since the bump has height $\\frac12$ but its width shrinks.` },
                { prompt: `$\\lim\\frac{d}{dx}\\frac{\\sin(n^2x)}{n}\\big|_{x=0}$ and the derivative of the limit`, answer: `They differ. $\\frac{\\sin(n^2x)}n\\to0$ uniformly, as it is at most $\\frac1n$, so the limit has derivative $0$. But the derivative at $0$ is $n\\cos0=n\\to\\infty$. Uniform convergence of $f_n$ says nothing about $f_n'$.` },
              ],
            },
            {
              slug: 'general-derivative-theorem',
              title: 'The derivative theorem in general',
              prompt: `Prove the derivative theorem from this lesson with no continuity assumption on $f_n'$: $f_n$ differentiable on $[a,b]$, $f_n'\\to g$ uniformly, and $(f_n(x_0))$ convergent.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Use the mean value theorem on $f_n-f_m$ to show that $(f_n)$ is uniformly Cauchy.`, answer: `$|(f_n-f_m)(x)-(f_n-f_m)(x_0)|\\le|x-x_0|\\,\\|f_n'-f_m'\\|$. So $\\|f_n-f_m\\|\\le|f_n(x_0)-f_m(x_0)|+(b-a)\\|f_n'-f_m'\\|$, and both terms tend to 0. Hence $f_n\\to f$ uniformly for some $f$.` },
                { prompt: `Fix $c$, define $\\varphi_n(x)=\\frac{f_n(x)-f_n(c)}{x-c}$ for $x\\ne c$ and $\\varphi_n(c)=f_n'(c)$, and show that $(\\varphi_n)$ is uniformly Cauchy on $[a,b]$.`, answer: `For $x\\ne c$, the mean value theorem on $f_n-f_m$ between $c$ and $x$ gives $\\varphi_n(x)-\\varphi_m(x)=(f_n-f_m)'(\\xi)$, so $|\\varphi_n(x)-\\varphi_m(x)|\\le\\|f_n'-f_m'\\|$. At $x=c$ the same bound holds directly.` },
                { prompt: `Conclude that $f'(c)=g(c)$.`, answer: `$\\varphi_n$ converges uniformly to $\\varphi$, where $\\varphi(x)=\\frac{f(x)-f(c)}{x-c}$ for $x\\ne c$ and $\\varphi(c)=g(c)$. Each $\\varphi_n$ is continuous at $c$, because $f_n$ is differentiable there. A uniform limit of functions continuous at $c$ is continuous at $c$, by the three-epsilon argument. So $\\lim_{x\\to c}\\frac{f(x)-f(c)}{x-c}=g(c)$.` },
              ],
            },
            {
              slug: 'nowhere-swapping',
              title: 'Using the theorems',
              prompt: `Use the theorems on uniform limits.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $\\sum_{k=1}^\\infty\\frac{\\sin kx}{k^3}$ has a continuous derivative. Find it.`, answer: `The derivative is $\\sum_{k=1}^\\infty\\frac{\\cos kx}{k^2}$. The differentiated series converges uniformly on $\\mathbb{R}$ by the M-test with $\\frac1{k^2}$, and the original converges, at $x=0$ for instance. The derivative theorem gives term-by-term differentiation, and the result is continuous as a uniform limit of continuous functions.` },
                { prompt: `Prove that $\\int_0^\\pi\\sum_{k=1}^\\infty\\frac{\\sin kx}{k^2}\\,dx=\\sum_{k\\ \\text{odd}}\\frac2{k^3}$.`, answer: `The series converges uniformly by the M-test with $\\frac1{k^2}$, so it can be integrated term by term. $\\int_0^\\pi\\sin kx\\,dx=\\frac{1-\\cos k\\pi}k$, which is $\\frac2k$ for odd $k$ and $0$ for even $k$. Dividing by $k^2$ gives $\\frac2{k^3}$ for odd $k$.` },
                { prompt: `If each $f_n$ is uniformly continuous on $\\mathbb{R}$ and $f_n\\to f$ uniformly, prove that $f$ is uniformly continuous.`, answer: `Three epsilons. Choose $N$ with $\\|f_N-f\\|<\\frac\\varepsilon3$, and $\\delta$ from the uniform continuity of $f_N$ for $\\frac\\varepsilon3$. For $|x-y|<\\delta$, $|f(x)-f(y)|\\le|f(x)-f_N(x)|+|f_N(x)-f_N(y)|+|f_N(y)-f(y)|<\\varepsilon$. The $\\delta$ does not depend on $x$.` },
              ],
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
          quiz: [
            {
              question: `What is $\\lim_{n\\to\\infty}\\int_0^1nxe^{-nx^2}\\,dx$?`,
              options: ['$0$', '$1$', '$\\frac12$', '$\\infty$'],
              answer: 2,
              explanation: `Substituting $u=nx^2$, $\\int_0^1nxe^{-nx^2}\\,dx=\\frac12(1-e^{-n})\\to\\frac12$. The tempting $0$ swaps the limit and the integral: the integrand tends to 0 at every point, but not uniformly, as a bump of height about $\\sqrt{n/(2e)}$ near $x=\\frac1{\\sqrt{2n}}$ keeps its area.`,
            },
            {
              question: `Differentiable functions $f_n$ converge uniformly to $f$ on $\\mathbb{R}$. What must be true?`,
              options: ['$f$ is differentiable, with $f\'=\\lim f_n\'$', '$f_n\'$ converges at every point', '$f$ is differentiable, though perhaps $f\'\\ne\\lim f_n\'$', '$f$ is continuous'],
              answer: 3,
              explanation: `Each $f_n$ is continuous, and a uniform limit of continuous functions is continuous. Nothing more is guaranteed: $\\sqrt{x^2+\\frac1{n^2}}\\to|x|$ uniformly, and $|x|$ is not differentiable at 0, which rules out the first and third options. $\\frac{\\sin(n^2x)}n\\to0$ uniformly, while its derivative $n\\cos(n^2x)$ diverges at 0. The derivative theorem needs uniform convergence of the derivatives.`,
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
              prompt: `Find the radius and the exact interval of convergence of each power series.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\sum\\frac{x^n}{n2^n}$`, answer: `$R=2$, since $\\left(\\frac1{n2^n}\\right)^{1/n}=\\frac1{2n^{1/n}}\\to\\frac12$. At $x=2$ it is $\\sum\\frac1n$, divergent. At $x=-2$ it is $\\sum\\frac{(-1)^n}n$, convergent. Interval: $[-2,2)$.` },
                { prompt: `$\\sum n!x^n$`, answer: `$R=0$, since $(n!)^{1/n}\\to\\infty$. It converges only at $x=0$.` },
                { prompt: `$\\sum\\frac{x^n}{n!}$`, answer: `$R=\\infty$, since $(n!)^{-1/n}\\to0$. It converges on all of $\\mathbb{R}$.` },
                { prompt: `$\\sum\\frac{(x-1)^n}{n^2}$`, answer: `$R=1$, centred at $1$. At both ends $|\\text{term}|=\\frac1{n^2}$, so it converges absolutely there. Interval: $[0,2]$.` },
                { prompt: `$\\sum x^{n^2}$`, answer: `The coefficients are $1$ at perfect squares and $0$ otherwise, so $\\limsup|c_k|^{1/k}=1$ and $R=1$. At $x=\\pm1$ the terms have size 1 and do not tend to 0. Interval: $(-1,1)$.` },
                { prompt: `$\\sum2^{(-1)^n n}x^n$, for which the ratio formula fails`, answer: `$c_n=2^n$ for even $n$ and $2^{-n}$ for odd $n$, so $|c_n|^{1/n}$ alternates between $2$ and $\\frac12$. The limsup is 2, so $R=\\frac12$. The ratios $|\\frac{c_n}{c_{n+1}}|$ alternate between $2^{2n+1}$ and $2^{-2n-1}$, with no limit. At $x=\\pm\\frac12$ the even terms have size 1, so it diverges. Interval: $(-\\frac12,\\frac12)$.` },
              ],
            },
            {
              slug: 'abel-proof',
              title: 'Abel\'s theorem',
              prompt: `Prove Abel's theorem with $R=1$, $a=0$: if $\\sum c_k$ converges, then $\\sum c_kx^k$ converges uniformly on $[0,1]$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Let $s_n=\\sum_{k=n}^\\infty c_k$, and use summation by parts on $\\sum_{k=m}^nc_kx^k$ to show that the series is uniformly Cauchy on $[0,1]$.`, answer: `$c_k=s_k-s_{k+1}$, so $\\sum_{k=m}^nc_kx^k=s_mx^m-s_{n+1}x^n+\\sum_{k=m+1}^ns_k(x^k-x^{k-1})$. Let $\\sigma_m=\\sup_{k\\ge m}|s_k|$, which tends to 0. For $x\\in[0,1]$, $x^{k-1}-x^k\\ge0$, and these differences sum to $x^m-x^n\\le1$. So $\\left|\\sum_{k=m}^nc_kx^k\\right|\\le3\\sigma_m$ for all $x\\in[0,1]$, which is the uniform Cauchy criterion. Hence the sum is continuous on $[0,1]$, and $\\lim_{x\\to1^-}\\sum c_kx^k=\\sum c_k$.` },
                { prompt: `Use it to find $\\sum_{n=0}^\\infty\\frac{(-1)^n}{2n+1}$, justifying each step.`, answer: `$\\frac\\pi4$. For $|t|<1$, $\\frac1{1+t^2}=\\sum(-1)^nt^{2n}$, uniformly on $[0,x]$ for $x<1$, so integrating term by term gives $\\arctan x=\\sum\\frac{(-1)^nx^{2n+1}}{2n+1}$. At $x=1$ the series converges by the alternating series test. Abel's theorem then gives $\\sum\\frac{(-1)^n}{2n+1}=\\lim_{x\\to1^-}\\arctan x=\\arctan1=\\frac\\pi4$, using the continuity of $\\arctan$.` },
              ],
            },
            {
              slug: 'series-solutions',
              title: 'Summing with calculus',
              prompt: `Find a closed form for each series, and justify each interchange of limits.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\sum_{n\\ge1}nx^{n-1}$ for $|x|<1$`, answer: `$\\frac1{(1-x)^2}$. Differentiate $\\sum_{n\\ge0}x^n=\\frac1{1-x}$ term by term, which is allowed inside the radius of convergence $1$.` },
                { prompt: `$\\sum_{n\\ge1}\\frac{x^n}{n}$ for $|x|<1$`, answer: `$-\\ln(1-x)$. Integrate $\\sum t^{n-1}=\\frac1{1-t}$ term by term from $0$ to $x$, which is allowed because the convergence is uniform on the closed interval between 0 and $x$.` },
                { prompt: `$\\sum_{n\\ge1}n^2x^n$ for $|x|<1$`, answer: `$\\frac{x(1+x)}{(1-x)^3}$. From the first part, $\\sum nx^n=\\frac x{(1-x)^2}$. Differentiate term by term again and multiply by $x$: $x\\frac{d}{dx}\\frac x{(1-x)^2}=\\frac{x(1+x)}{(1-x)^3}$.` },
                { prompt: `Show that $y=\\sum\\frac{x^n}{n!}$ satisfies $y'=y$ and $y(0)=1$.`, answer: `The radius is $\\infty$, so term-by-term differentiation is valid on all of $\\mathbb{R}$: $y'=\\sum_{n\\ge1}\\frac{nx^{n-1}}{n!}=\\sum_{n\\ge1}\\frac{x^{n-1}}{(n-1)!}=y$. At $x=0$ only the $n=0$ term survives, so $y(0)=1$.` },
                { prompt: `Find $\\sum_{n\\ge1}\\frac{n}{2^n}$ and $\\sum_{n\\ge1}\\frac{n^2}{2^n}$.`, answer: `$2$ and $6$. Put $x=\\frac12$, inside the radius, into $\\frac x{(1-x)^2}=\\frac{1/2}{1/4}=2$ and $\\frac{x(1+x)}{(1-x)^3}=\\frac{3/4}{1/8}=6$.` },
              ],
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
          quiz: [
            {
              question: `What is the radius of convergence of $\\sum_{n\\ge1}\\frac{3^n}{n}x^{2n}$?`,
              options: ['$\\frac13$', '$\\frac1{\\sqrt3}$', '$3$', '$\\sqrt3$'],
              answer: 1,
              explanation: `As a power series in $x$, the coefficient of $x^{2n}$ is $\\frac{3^n}n$ and the odd coefficients are 0. So $\\limsup|c_k|^{1/k}=\\lim\\left(\\frac{3^n}n\\right)^{1/(2n)}=\\sqrt3$, and $R=\\frac1{\\sqrt3}$. Equivalently, the series in $u=x^2$ has radius $\\frac13$, so $|x|^2<\\frac13$. The tempting $\\frac13$ is that radius in $u$, not in $x$.`,
            },
            {
              question: `The series $\\sum_{n\\ge1}\\frac{x^n}n$ has radius 1. Which statement is true?`,
              options: ['It converges uniformly on $(-1,1)$', 'It converges at $x=1$, since its terms tend to $0$', 'It diverges at $x=-1$, since $|x|=R$ there', 'Its sum is continuous from the right at $x=-1$'],
              answer: 3,
              explanation: `At $x=-1$ the series is $\\sum\\frac{(-1)^n}n$, which converges, so Abel's theorem (applied to $\\sum\\frac{(-1)^n}{n}y^n$ on $[0,1]$) makes the sum $-\\ln(1-x)$ continuous at $-1$ from the right, with value $-\\ln2$. Endpoints are decided case by case, so "$|x|=R$ forces divergence" is wrong. At $x=1$ it is the harmonic series, which diverges although its terms tend to 0. The sum is unbounded near 1, so the convergence is not uniform on $(-1,1)$.`,
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
              prompt: `Prove the three moment identities for $p_{n,k}(x)=\\binom nkx^k(1-x)^{n-k}$, then compute some Bernstein polynomials.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove the identities: start from $(x+y)^n=\\sum\\binom nkx^ky^{n-k}$. Apply $x\\partial_x$ once and twice, then set $y=1-x$.`, answer: `$x\\partial_x$ once: $nx(x+y)^{n-1}=\\sum k\\binom nkx^ky^{n-k}$. Twice: $nx(x+y)^{n-1}+n(n-1)x^2(x+y)^{n-2}=\\sum k^2\\binom nkx^ky^{n-k}$. With $y=1-x$: $\\sum p_{n,k}=1$, $\\sum kp_{n,k}=nx$, $\\sum k^2p_{n,k}=nx+n(n-1)x^2$. So $\\sum\\frac knp_{n,k}=x$, and $\\sum(\\frac kn-x)^2p_{n,k}=\\frac{nx+n(n-1)x^2}{n^2}-2x^2+x^2=\\frac{x(1-x)}n$.` },
                { prompt: `Compute $B_n$ of $1$, $x$ and $x^2$ explicitly.`, answer: `$B_n1=\\sum p_{n,k}=1$ and $B_nx=\\sum\\frac knp_{n,k}=x$. $B_n(x^2)=\\sum\\frac{k^2}{n^2}p_{n,k}=\\frac xn+\\frac{n-1}nx^2=x^2+\\frac{x(1-x)}n$.` },
              ],
            },
            {
              slug: 'bernstein-numerics',
              title: 'Measure the rate',
              prompt: `Compute $\\|f-B_nf\\|_{[0,1]}$ numerically for $f(x)=|x-\\frac12|$ and for $f(x)=x^2$, with $n=10,100,1000$, and estimate the rate in each case.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Write code that evaluates $B_nf$ on a fine grid of $[0,1]$ and returns the maximum error.`, answer: `A sketch in Python: \`k = np.arange(n+1)\`, \`B = [np.dot(f(k/n), binom.pmf(k, n, x)) for x in xs]\`, then \`max(abs(B - f(xs)))\`, using \`scipy.stats.binom\` for the weights. Make sure the grid contains $x=\\frac12$, where the error for $|x-\\frac12|$ is largest. For $x^2$ the error should come out as $\\frac1{4n}$ to rounding.` },
                { prompt: `Report the errors for $f(x)=x^2$ and estimate the order of the rate. (The exact value is $\\frac1{4n}$.)`, answer: `$0.025$, $0.0025$, $0.00025$: each tenfold increase in $n$ divides the error by 10, a rate of order $n^{-1}$. This matches $B_n(x^2)-x^2=\\frac{x(1-x)}n$, largest at $x=\\frac12$.` },
                { prompt: `Report the errors for $f(x)=|x-\\frac12|$ and estimate the order of the rate. It should be close to $n^{-1/2}$.`, answer: `About $0.1230$, $0.0398$ and $0.0126$, attained at $x=\\frac12$: each tenfold increase in $n$ divides the error by about $\\sqrt{10}\\approx3.16$, a rate of order $n^{-1/2}$. The values are close to $\\frac1{\\sqrt{2\\pi n}}$, the mean distance of a binomial proportion from $\\frac12$.` },
                { prompt: `Which smoothness gives which rate?`, answer: `For a function with a continuous second derivative, the error is of order $\\frac1n$ (it is about $\\frac{f''(x)}2\\cdot\\frac{x(1-x)}n$), and this does not improve with more smoothness. A corner, as in $|x-\\frac12|$, where $f$ is only Lipschitz, slows it to order $n^{-1/2}$, matching the standard deviation of $\\frac kn$.` },
              ],
            },
            {
              slug: 'density-consequences',
              title: 'Consequences',
              prompt: `Prove each consequence of the Weierstrass approximation theorem.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `If $f$ is continuous on $[0,1]$ and $\\int_0^1f(x)x^n\\,dx=0$ for all $n\\ge0$, then $f=0$.`, answer: `Use the theorem to show that $\\int f^2=0$. By linearity, $\\int fp=0$ for every polynomial $p$. Choose polynomials $p_n\\to f$ uniformly. Then $\\left|\\int f^2-\\int fp_n\\right|\\le\\|f\\|\\,\\|f-p_n\\|\\to0$, so $\\int f^2=0$. As $f^2\\ge0$ is continuous, $f^2=0$, so $f=0$.` },
                { prompt: `If $(p_n)$ are polynomials and $p_n\\to f$ uniformly on $\\mathbb{R}$, then $f$ is a polynomial.`, answer: `The sequence is uniformly Cauchy, so for $n,m\\ge N$, $\\|p_n-p_m\\|_{\\mathbb{R}}\\le1$. A polynomial bounded on $\\mathbb{R}$ is constant, so $p_n-p_N=c_n$, a constant, for $n\\ge N$. Then $c_n=p_n(0)-p_N(0)\\to f(0)-p_N(0)=c$, and $f=p_N+c$.` },
                { prompt: `There is a sequence of polynomials tending uniformly to $|x|$ on $[-1,1]$. Can they all have $p_n(0)=0$?`, answer: `The theorem gives polynomials $q_n\\to|x|$ uniformly on $[-1,1]$. Yes, they can: $p_n=q_n-q_n(0)$ has $p_n(0)=0$, and $|q_n(0)|=|q_n(0)-|0||\\le\\|q_n-|x|\\|\\to0$, so $p_n\\to|x|$ uniformly as well.` },
                { prompt: `$C[0,1]$ with the sup norm has a countable dense subset.`, answer: `Polynomials with rational coefficients form a countable set. Given $f$ and $\\varepsilon$, take a polynomial $p=\\sum_{k\\le d}a_kx^k$ with $\\|f-p\\|<\\frac\\varepsilon2$. Choose rationals $r_k$ with $|a_k-r_k|<\\frac{\\varepsilon}{2(d+1)}$. Since $|x^k|\\le1$ on $[0,1]$, $q=\\sum r_kx^k$ has $\\|p-q\\|<\\frac\\varepsilon2$, so $\\|f-q\\|<\\varepsilon$.` },
              ],
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
          quiz: [
            {
              question: `For $f(x)=|x-\\frac12|$ on $[0,1]$, what is $B_2f(\\frac12)$?`,
              options: ['$0$', '$\\frac14$', '$\\frac12$', '$\\frac18$'],
              answer: 1,
              explanation: `$B_2f(x)=f(0)(1-x)^2+f(\\frac12)\\cdot2x(1-x)+f(1)x^2$. At $x=\\frac12$ the weights are $\\frac14,\\frac12,\\frac14$, and the values are $\\frac12,0,\\frac12$, so $B_2f(\\frac12)=\\frac18+0+\\frac18=\\frac14$. The tempting $0$ is $f(\\frac12)$ itself: Bernstein polynomials average nearby values and do not interpolate. The error at the corner is largest, as the numerics in this lesson show.`,
            },
            {
              question: `Let $f$ be continuous on $[0,1]$ and nowhere differentiable. Which statement is true?`,
              options: ['For every $\\varepsilon>0$, some polynomial is within $\\varepsilon$ of $f$ on all of $[0,1]$', 'Its Taylor polynomials at $0$ converge uniformly to $f$', 'A single power series converges to $f$ on $[0,1]$', 'No polynomial can be uniformly close to $f$, since $f$ has no derivatives'],
              answer: 0,
              explanation: `The Weierstrass theorem needs only continuity on a compact interval. The polynomials need not be Taylor polynomials, and they change entirely as $\\varepsilon$ shrinks. Taylor polynomials do not even exist here, and a power series would make $f$ infinitely differentiable. The last option is tempting, but uniform closeness of values says nothing about derivatives.`,
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
              prompt: `Decide if each is a metric, and prove it.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `On $\\mathbb{R}$: $d(x,y)=|x-y|^2$`, answer: `Not a metric: the triangle inequality fails, since $d(0,2)=4>2=d(0,1)+d(1,2)$.` },
                { prompt: `On $\\mathbb{R}$: $d(x,y)=\\sqrt{|x-y|}$`, answer: `A metric. Positivity and symmetry are clear. Since $\\sqrt{a+b}\\le\\sqrt a+\\sqrt b$ (square both sides), $\\sqrt{|x-z|}\\le\\sqrt{|x-y|+|y-z|}\\le\\sqrt{|x-y|}+\\sqrt{|y-z|}$.` },
                { prompt: `On $\\mathbb{R}$: $d(x,y)=\\frac{|x-y|}{1+|x-y|}$`, answer: `A metric. $\\varphi(t)=\\frac t{1+t}$ is increasing, and $\\varphi(a+b)=\\frac a{1+a+b}+\\frac b{1+a+b}\\le\\varphi(a)+\\varphi(b)$. So $\\varphi(|x-z|)\\le\\varphi(|x-y|+|y-z|)\\le\\varphi(|x-y|)+\\varphi(|y-z|)$.` },
                { prompt: `On any set: $d(x,y)=1$ if $x\\ne y$, and 0 otherwise`, answer: `A metric (the discrete metric). For the triangle inequality, if $x\\ne z$ then $y$ differs from at least one of them, so the right side is at least 1.` },
                { prompt: `On $C[0,1]$: $d(f,g)=|\\int_0^1(f-g)|$`, answer: `Not a metric: $d(f,0)=0$ for $f(x)=x-\\frac12$, although $f\\ne0$. (Symmetry and the triangle inequality do hold, so it is a pseudometric.)` },
              ],
            },
            {
              slug: 'completeness-examples',
              title: 'Complete or not',
              prompt: `Decide whether each metric space is complete, and prove it.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `$(0,1)$ with the usual metric`, answer: `Not complete: $\\frac1{n+1}$ is Cauchy, and its only possible limit, $0$, is not in the space.` },
                { prompt: `$[0,\\infty)$ with the usual metric`, answer: `Complete: a Cauchy sequence in it converges in $\\mathbb{R}$, and the limit of non-negative numbers is non-negative. A closed subset of a complete space is complete.` },
                { prompt: `$C[0,1]$ with $d_1(f,g)=\\int_0^1|f-g|$, giving an explicit Cauchy sequence with no limit in the space`, answer: `Not complete. Let $f_n=0$ on $[0,\\frac12]$, rising linearly to $1$ on $[\\frac12,\\frac12+\\frac1n]$, and $1$ after. Then $d_1(f_n,f_m)=\\left|\\frac1{2n}-\\frac1{2m}\\right|$, so it is Cauchy. If $d_1(f_n,f)\\to0$ with $f$ continuous, then $\\int_0^{1/2}|f|=0$, so $f=0$ on $[0,\\frac12]$, and $\\int_{1/2+\\delta}^1|f-1|=0$ for each $\\delta>0$, so $f=1$ on $(\\frac12,1]$. No continuous $f$ does both.` },
                { prompt: `Bounded real sequences with $d(a,b)=\\sup_n|a_n-b_n|$`, answer: `Complete. If $(a^{(m)})$ is Cauchy, each coordinate sequence is Cauchy in $\\mathbb{R}$, with limit $a_n$. Given $\\varepsilon$, $|a^{(m)}_n-a^{(k)}_n|<\\varepsilon$ for $m,k\\ge N$ and all $n$; letting $k\\to\\infty$ gives $|a^{(m)}_n-a_n|\\le\\varepsilon$ for all $n$. So $a$ is bounded, being within $\\varepsilon$ of $a^{(N)}$, and $d(a^{(m)},a)\\le\\varepsilon$ for $m\\ge N$.` },
                { prompt: `Polynomials on $[0,1]$ with the sup metric`, answer: `Not complete. The Taylor polynomials $\\sum_{k\\le n}\\frac{x^k}{k!}$ converge uniformly on $[0,1]$ to $e^x$, so they are Cauchy. If they converged to a polynomial $p$ in this space, uniqueness of uniform limits would give $p=e^x$ on $[0,1]$. But differentiating $\\deg p+1$ times gives $0$ on one side and $e^x\\ne0$ on the other.` },
              ],
            },
            {
              slug: 'fixed-point-application',
              title: 'Applying the contraction theorem',
              prompt: `Apply the contraction mapping theorem.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $T(x)=\\frac12(x+\\frac2x)$ is a contraction on $[\\sqrt2,\\infty)$ with constant $\\frac12$, and name its fixed point.`, answer: `$T$ maps the set into itself, since $T(x)\\ge\\sqrt{x\\cdot\\frac2x}=\\sqrt2$ by the AM-GM inequality. $T'(x)=\\frac12(1-\\frac2{x^2})\\in[0,\\frac12)$ there, so the mean value theorem gives $|Tx-Ty|\\le\\frac12|x-y|$. The set is closed in $\\mathbb{R}$, hence complete. The fixed point solves $x=\\frac2x$, so it is $\\sqrt2$: this is Newton's method for $x^2=2$.` },
                { prompt: `Iterate $\\cos$ starting from 1 and find the fixed point to six decimals. Use the bound $\\frac{q^n}{1-q}d(x_1,x_0)$ to find how many iterations guarantee this accuracy, with $q=\\sin1$, and compare that with what you observe.`, answer: `The fixed point is $0.739085$ (more precisely $0.7390851\\ldots$). With $x_0=1$, $x_1=\\cos1\\approx0.5403$ and $q=\\sin1\\approx0.8415$, the bound $\\frac{q^n}{1-q}(1-\\cos1)$ drops below $5\\times10^{-7}$ only at $n=91$. In practice the error is below $5\\times10^{-7}$ after $34$ iterations, because near the fixed point the contraction factor is $\\sin(0.739)\\approx0.674$, not $\\sin1$.` },
                { prompt: `Show that $Ty(t)=1+\\int_0^ty(s)\\,ds$ is a contraction on $C[0,\\frac12]$, and identify the iterates and the fixed point.`, answer: `$|Ty(t)-Tz(t)|\\le\\int_0^t|y-z|\\le t\\|y-z\\|\\le\\frac12\\|y-z\\|$, so $q=\\frac12$, and $C[0,\\frac12]$ with the sup metric is complete. Starting from $y_0=1$, the iterates are $y_n(t)=\\sum_{k=0}^n\\frac{t^k}{k!}$, the Taylor polynomials of $e^t$. The fixed point is $e^t$, the solution of $y'=y$, $y(0)=1$.` },
              ],
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
          quiz: [
            {
              question: `Let $T(x)=\\frac12\\cos x$ on $\\mathbb{R}$, a contraction with $q=\\frac12$, and start from $x_0=0$. How many iterations does the bound $d(x_n,x)\\le\\frac{q^n}{1-q}d(x_1,x_0)$ need to guarantee an error below $10^{-3}$?`,
              options: ['$n=9$', '$n=11$', '$n=10$', '$n=20$'],
              answer: 2,
              explanation: `$x_1=\\frac12$, so the bound is $\\frac{2^{-n}}{1/2}\\cdot\\frac12=2^{-n}$. Since $2^{-9}=\\frac1{512}$ and $2^{-10}=\\frac1{1024}<10^{-3}$, $n=10$ is the first that works. The tempting $n=9$ drops the factor $\\frac1{1-q}=2$: $q^nd(x_1,x_0)=2^{-n-1}$ bounds only the next step, not the whole tail of steps out to the limit.`,
            },
            {
              question: `Which metric space is complete?`,
              options: ['$C[0,1]$ with the sup metric', '$(0,1]$ with the usual metric', '$\\mathbb{Q}$ with the usual metric', '$C[0,1]$ with $d_1(f,g)=\\int_0^1|f-g|$'],
              answer: 0,
              explanation: `A sup-metric Cauchy sequence in $C[0,1]$ is uniformly Cauchy, so it converges uniformly, and the uniform limit is continuous. The same set with $d_1$ is not complete: continuous ramps can converge in $d_1$ to a step. Completeness depends on the metric, not only on the set. $(0,1]$ loses the limit of $\\frac1n$, and $\\mathbb{Q}$ loses the limit of the decimal truncations of $\\sqrt2$.`,
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
