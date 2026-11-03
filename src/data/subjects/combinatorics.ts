import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const morris = (note: string): ResourceInput => ({
  title: 'Combinatorics (Morris)',
  url: 'https://www.cs.uleth.ca/~morris/Combinatorics/Combinatorics.html',
  type: 'textbook',
  cost: 'free',
  provider: 'University of Lethbridge',
  note,
  primary: true,
});

const guichard = (note: string): ResourceInput => ({
  title: 'Combinatorics and Graph Theory (Guichard)',
  url: 'https://www.whitman.edu/mathematics/cgt_online/book/',
  type: 'textbook',
  cost: 'free',
  provider: 'Whitman College',
  note,
});

const bogart = (note: string): ResourceInput => ({
  title: 'Combinatorics Through Guided Discovery (Bogart)',
  url: 'https://bogart.openmathbooks.org/',
  type: 'textbook',
  cost: 'free',
  provider: 'Open Math Books',
  note,
});

const wilf = (note: string): ResourceInput => ({
  title: 'generatingfunctionology (Wilf)',
  url: 'https://www2.math.upenn.edu/~wilf/DownldGF.html',
  type: 'textbook',
  cost: 'free',
  provider: 'University of Pennsylvania',
  note,
});

const trotter = (note: string): ResourceInput => ({
  title: 'Applied Combinatorics (Keller and Trotter)',
  url: 'https://www.appliedcombinatorics.org/',
  type: 'textbook',
  cost: 'free',
  provider: 'Mitchel T. Keller and William T. Trotter',
  note,
});

const oeis = (note: string): ResourceInput => ({
  title: 'The On-Line Encyclopedia of Integer Sequences',
  url: 'https://oeis.org/',
  type: 'tool',
  cost: 'free',
  provider: 'OEIS Foundation',
  note,
});

const zhaoPm = (note: string): ResourceInput => ({
  title: 'Probabilistic Methods in Combinatorics (Zhao)',
  url: 'https://yufeizhao.com/pm/',
  type: 'textbook',
  cost: 'free',
  provider: 'Yufei Zhao',
  note,
});

export default defineSubject({
  id: 'combinatorics',
  title: 'Introduction to Combinatorics',
  category: 'math',
  tagline:
    'The art of counting and of structure: bijections, inclusion-exclusion, generating functions, recurrences, symmetry, designs and the probabilistic method.',
  description: `Combinatorics counts and constructs finite structures. How many ways can a word be rearranged, a sum be split, a necklace be coloured, a tournament be scheduled? When must a pattern appear, and how can you build an object with no such pattern? The answers use a small set of powerful ideas: bijections, inclusion-exclusion, generating functions, symmetry and probability. These ideas reach well beyond pure mathematics, into algorithms, statistics, physics and coding.

This course follows the topics in the public catalog description of University of Illinois MATH 413, Intro to Combinatorics. It is an original course and is not affiliated with the University of Illinois, and nothing here is taken from that course's materials. The six modules cover basic counting and bijective proof, inclusion-exclusion and the pigeonhole principle, generating functions with partitions and Catalan numbers, recurrences, symmetry and designs (Polya counting, block designs, Latin squares, finite geometries), and Ramsey theory with the probabilistic method.

It assumes the proof course \`higher-mathematics\`, and it goes well beyond the counting module of \`discrete-mathematics\`. Exercises ask for proofs, very often bijective ones, and for computations that you then check by brute force. That habit is part of the method: in combinatorics a short program that enumerates the small cases catches most wrong formulas before you spend an hour trying to prove them, and the On-Line Encyclopedia of Integer Sequences tells you whether the sequence is already known.

A course on graph theory runs alongside this one. Ramsey theory appears in both: this course concentrates on Ramsey's theorem in general, on arithmetic Ramsey theory and on probabilistic constructions.`,
  difficulty: 'intermediate',
  estimatedHours: 60,
  prerequisites: ['higher-mathematics'],
  recommendedBackground: [
    'Induction and the binomial theorem',
    'Comfort with sums and power series manipulations',
    'Basic probability: expectation and linearity',
    'Python, for brute-force checks',
  ],
  tags: ['counting', 'bijections', 'generating functions', 'recurrences', 'designs', 'Ramsey theory', 'probabilistic method'],
  core: false,
  modules: [
    {
      slug: 'basic-counting',
      title: 'Basic Counting',
      description:
        'Permutations, combinations and multisets, the binomial coefficients and their identities, and proof by bijection.',
      lessons: [
        {
          slug: 'counting-principles-and-multisets',
          title: 'Counting principles, arrangements and multisets',
          summary:
            'The sum and product rules, permutations and combinations, words with repeated letters, and stars and bars.',
          estimatedMinutes: 130,
          objectives: [
            'Apply the sum, product and division rules correctly',
            'Count arrangements with repeated objects using multinomial coefficients',
            'Count multisets and solutions of equations with stars and bars',
            'Identify which of the standard models a counting problem fits',
          ],
          concepts: [
            'Sum and product rules',
            'Division rule',
            'Permutations and $k$-permutations',
            'Combinations',
            'Multinomial coefficients',
            'Multisets',
            'Stars and bars',
          ],
          explanation: `Most counting reduces to three rules. The **sum rule** counts a disjoint union by adding. The **product rule** counts a sequence of choices by multiplying, provided the number of options at each step does not depend on earlier choices, even if the options themselves do. The **division rule** counts objects that each appear exactly $d$ times in a larger count by dividing by $d$.

From these: the number of orderings of $n$ distinct objects is $n!$, the number of ordered selections of $k$ of them is $n(n-1)\\cdots(n-k+1)$, and the number of $k$-subsets is
$$\\binom nk=\\frac{n!}{k!(n-k)!},$$
since each subset corresponds to $k!$ ordered selections.

**Repeated objects.** The number of arrangements of $n$ objects, with $n_1$ of type $1$, $n_2$ of type $2$, and so on, is the **multinomial coefficient** $\\frac{n!}{n_1!n_2!\\cdots n_r!}$. Label the identical objects to make them distinct, and divide out the relabelings.

**Multisets.** How many ways are there to choose $k$ objects from $n$ types, with repetition allowed and order ignored? Encode a choice as a row of $k$ stars and $n-1$ bars, the bars separating the types. So the count is
$$\\binom{n+k-1}{k}=\\binom{n+k-1}{n-1}.$$
Equivalently, this counts the solutions of $x_1+\\dots+x_n=k$ in non-negative integers. For positive integers, substitute $y_i=x_i-1$ to get $\\binom{k-1}{n-1}$.

**Worked example.** (a) The letters of MISSISSIPPI, with four I, four S, two P and one M, can be arranged in
$$\\frac{11!}{4!\\,4!\\,2!\\,1!}=34650$$
ways. (b) The equation $x_1+x_2+x_3+x_4=10$ has $\\binom{13}{3}=286$ solutions in non-negative integers, and $\\binom93=84$ in positive integers. (c) A box of $5$ doughnuts chosen from $3$ flavours can be filled in $\\binom{7}{2}=21$ ways.

Be careful with the product rule when steps interact. To count $5$-card hands with exactly one pair, do not pick "the first card, then a matching card, then three others", which counts each hand several times in different orders. Instead choose the rank of the pair in $13$ ways, its two suits in $\\binom42$, the three other ranks in $\\binom{12}3$, and a suit for each in $4^3$. That gives $13\\cdot 6\\cdot 220\\cdot 64=1098240$.

These models fit together in the **twelvefold way**: distributing $k$ balls into $n$ boxes, with balls and boxes each distinguishable or not, and with no restriction, at most one per box, or at least one per box. You have now met four of the twelve. Stirling numbers and partitions supply most of the rest, later in this course.`,
          resources: [
            morris('Read the opening chapters of the part on enumeration.'),
            bogart('Work the guided problems of the first chapter. They are designed to make you discover these rules.'),
            trotter('The chapter on strings, sets and binomial coefficients gives further examples.'),
          ],
          exercises: [
            {
              slug: 'words-and-hands',
              title: 'Words and hands',
              prompt: `Count: (a) arrangements of BOOKKEEPER; (b) arrangements of MISSISSIPPI with no two S adjacent; (c) $5$-card hands with two pairs; (d) $5$-card hands that are a full house. Verify (a) and (b) by brute force.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'For (b), arrange the seven other letters first, and then choose four of the eight gaps for the S.',
            },
            {
              slug: 'bounded-solutions',
              title: 'Solutions with bounds',
              prompt: `Count the solutions of $x_1+x_2+x_3=15$ in integers with $0\\le x_i\\le 6$, by stars and bars and complementary counting. Then count the solutions of $x_1+x_2+x_3+x_4=20$ with $x_1\\ge 2$, $x_2\\ge 0$, $x_3\\ge 5$, $x_4\\ge 1$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'multiset-identity',
              title: 'A multiset identity',
              prompt: `Write $\\left(\\!\\binom nk\\!\\right)=\\binom{n+k-1}k$ for the number of $k$-multisets from $n$ types. Prove $\\left(\\!\\binom nk\\!\\right)=\\left(\\!\\binom{n-1}k\\!\\right)+\\left(\\!\\binom n{k-1}\\!\\right)$ by a combinatorial argument, without using the formula.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'circular-arrangements',
              title: 'Round tables',
              prompt: `Count the ways to seat $n$ people at a round table, where rotations count as the same. Then count the ways to seat $5$ couples so that each couple sits together. Then count the necklaces of $n$ distinct beads, where rotations and reflections count as the same, and say why your answer is wrong for $n\\le 2$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many non-negative integer solutions has $x+y+z=7$?',
              answerOutline: `$\\binom92=36$.`,
            },
            {
              question: 'When can the product rule be used for a sequence of choices?',
              answerOutline: `When the number of options at each step is the same whatever was chosen earlier, and each outcome arises from exactly one sequence of choices.`,
            },
            {
              question: 'Why is the number of arrangements of AAB equal to $3$, not $3!$?',
              answerOutline: `Swapping the two A's gives the same word, so each word is counted $2!$ times among the $3!$ orderings of labelled letters.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/counting-combinatorics/basic-counting-rules'],
        },
        {
          slug: 'binomial-coefficients-and-identities',
          title: 'Binomial coefficients and identities',
          summary:
            'The binomial theorem, Pascal\'s rule, and identities proved by algebra and by double counting.',
          estimatedMinutes: 140,
          objectives: [
            'Prove the binomial theorem combinatorially',
            'Prove identities by double counting',
            'Use differentiation and substitution in the binomial theorem',
            'Prove Vandermonde\'s identity and the hockey stick identity',
          ],
          concepts: [
            'Binomial theorem',
            'Pascal\'s rule',
            'Double counting',
            'Vandermonde\'s identity',
            'Hockey stick identity',
            'Generalised binomial coefficients',
          ],
          explanation: `The **binomial theorem** says
$$(x+y)^n=\\sum_{k=0}^n\\binom nkx^ky^{n-k}.$$
To see this, expand the product of $n$ factors $(x+y)$. Each term picks $x$ from some set of factors and $y$ from the rest, and the term $x^ky^{n-k}$ arises once for each $k$-subset. Substituting values gives identities at once: $x=y=1$ gives $\\sum_k\\binom nk=2^n$, and $x=-1$, $y=1$ gives $\\sum_k(-1)^k\\binom nk=0$ for $n\\ge 1$.

**Pascal's rule** $\\binom nk=\\binom{n-1}{k-1}+\\binom{n-1}k$ splits the $k$-subsets of $\\{1,\\dots,n\\}$ by whether they contain $n$.

**Double counting** proves an identity by counting one set in two ways. It is often much more illuminating than algebra.

**Worked example 1.** Prove $\\sum_kk\\binom nk=n2^{n-1}$. Count pairs (committee, chair), where the committee is a subset of $n$ people and the chair is a member of it. Choosing the committee first, of size $k$, and then its chair, gives $\\sum_kk\\binom nk$. Choosing the chair first in $n$ ways, and then any subset of the other $n-1$ people to join, gives $n2^{n-1}$. For $n=4$: $4+12+12+4=32=4\\cdot 8$. The algebraic route differentiates $(1+x)^n=\\sum\\binom nkx^k$ and sets $x=1$.

**Worked example 2: Vandermonde.** We have
$$\\binom{m+n}k=\\sum_j\\binom mj\\binom n{k-j}.$$
Choose $k$ people from $m$ women and $n$ men, and sort by the number $j$ of women chosen. Taking $m=n=k$ and using $\\binom n{n-j}=\\binom nj$ gives $\\sum_j\\binom nj^2=\\binom{2n}n$.

**Hockey stick.** $\\sum_{i=k}^n\\binom ik=\\binom{n+1}{k+1}$. Sort the $(k+1)$-subsets of $\\{1,\\dots,n+1\\}$ by their largest element $i+1$. The remaining $k$ elements come from $\\{1,\\dots,i\\}$.

**Beyond integers.** For any number $\\alpha$, define $\\binom\\alpha k=\\alpha(\\alpha-1)\\cdots(\\alpha-k+1)/k!$. Then Newton's binomial series
$$(1+x)^\\alpha=\\sum_{k\\ge 0}\\binom\\alpha kx^k$$
holds as formal power series, and as convergent series for $|x|<1$. With $\\alpha=-n$ it gives $(1-x)^{-n}=\\sum_k\\binom{n+k-1}kx^k$, which is stars and bars in a new form. This is the bridge to generating functions in Module 3.

When an identity is proved algebraically, ask for a combinatorial proof too. It usually reveals why the identity is true, and it generalises better.`,
          resources: [
            morris('In the part on enumeration, read the material on the binomial theorem and on combinatorial proofs.'),
            guichard('The chapter on fundamentals covers binomial coefficients, choice with repetition and Stirling numbers.'),
            bogart('The guided problems on binomial coefficients lead you to discover these identities yourself.'),
          ],
          exercises: [
            {
              slug: 'squared-coefficients',
              title: 'Squares and weights',
              prompt: `Prove $\\sum_k\\binom nk^2=\\binom{2n}n$ by a lattice path argument, and $\\sum_kk^2\\binom nk=n(n+1)2^{n-2}$ by a double counting argument with a committee, a chair and a secretary who may be the same person.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'hockey-stick',
              title: 'The hockey stick identity',
              prompt: `Prove the hockey stick identity combinatorially and by induction with Pascal's rule. Use it to find a closed form for $\\sum_{i=1}^ni(i+1)$ by writing $i(i+1)=2\\binom{i+1}2$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'alternating-sums',
              title: 'Alternating sums',
              prompt: `Prove that $\\sum_{k=0}^m(-1)^k\\binom nk=(-1)^m\\binom{n-1}m$ for $n\\ge 1$. Give a combinatorial proof that the number of even subsets of an $n$-set equals the number of odd subsets, by a bijection that toggles one fixed element.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'central-coefficient-bounds',
              title: 'Bounds on the central coefficient',
              prompt: `Prove that $\\frac{4^n}{2n+1}\\le\\binom{2n}n\\le 4^n$ for all $n\\ge 1$, using the binomial theorem for $(1+1)^{2n}$. Compare with Stirling's formula, $\\binom{2n}n\\sim 4^n/\\sqrt{\\pi n}$, numerically for $n=10,100,1000$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lucas-theorem',
              title: 'Binomial coefficients modulo a prime',
              prompt: `Prove that $(1+x)^p\\equiv 1+x^p$ modulo $p$ as polynomials, and deduce Lucas' theorem: if $n$ and $k$ have base $p$ digits $n_i$ and $k_i$, then $\\binom nk\\equiv\\prod_i\\binom{n_i}{k_i}\\pmod p$. Use it to count the odd entries in row $100$ of Pascal's triangle.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Write n in base p and expand (1+x)^n as a product of the powers (1+x^(p^i))^(n_i).',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\sum_k\\binom{10}k$?',
              answerOutline: `$2^{10}=1024$.`,
            },
            {
              question: 'What does Vandermonde\'s identity count?',
              answerOutline: `$k$-subsets of a union of an $m$-set and an $n$-set, sorted by how many come from the first.`,
            },
            {
              question: 'What is the coefficient of $x^3$ in $(1-x)^{-4}$?',
              answerOutline: `$\\binom{4+3-1}3=\\binom63=20$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/counting-combinatorics/permutations-combinations-and-binomial-coefficients'],
        },
        {
          slug: 'bijective-proofs-and-set-partitions',
          title: 'Bijective proofs, compositions and set partitions',
          summary:
            'Proving two counts equal by matching objects, with compositions, lattice paths and Stirling numbers as examples.',
          estimatedMinutes: 150,
          objectives: [
            'Construct and verify a bijection, including its inverse',
            'Count compositions of an integer, with and without restrictions',
            'Define Stirling numbers of the second kind and Bell numbers, and prove their recurrences',
            'Count surjections using Stirling numbers',
          ],
          concepts: [
            'Bijective proof',
            'Composition of an integer',
            'Lattice paths',
            'Set partition',
            'Stirling numbers of the second kind $S(n,k)$',
            'Bell numbers',
            'Surjections',
          ],
          explanation: `A **bijective proof** shows $|A|=|B|$ by giving maps $f:A\\to B$ and $g:B\\to A$ and checking that each undoes the other. Both checks are needed. Showing that $f$ is injective and that the sets have equal size is circular when the size of $B$ is what you want to know.

**Compositions.** A composition of $n$ is an ordered sequence of positive integers summing to $n$, such as $2+1+3$ for $6$. Write $n$ as a row of $n$ ones. Each of the $n-1$ gaps between them is either a plus sign or a comma, and choosing which gives a composition. So there are $2^{n-1}$ compositions, and $\\binom{n-1}{k-1}$ with exactly $k$ parts.

**Worked example.** Show that the number of compositions of $n$ into odd parts equals the Fibonacci number $F_n$, with $F_1=F_2=1$. Let $c_n$ be the count. A composition of $n$ into odd parts either ends in a part $1$, or ends in a part of size at least $3$. In the first case, deleting that part leaves a composition of $n-1$. In the second, reducing the last part by $2$ leaves a composition of $n-2$ into odd parts. Each of these operations has an obvious inverse: append a $1$, or add $2$ to the last part. So $c_n=c_{n-1}+c_{n-2}$, with $c_1=1$ (just $1$) and $c_2=1$ (just $1+1$). Hence $c_n=F_n$. For $n=6$ this predicts $8$, and indeed the compositions are $5+1$, $1+5$, $3+3$, $3+1+1+1$ with its $4$ arrangements, and $1+1+1+1+1+1$. That gives $1+1+1+4+1=8$.

**Lattice paths.** Paths from $(0,0)$ to $(a,b)$ using unit steps right and up correspond to words with $a$ letters R and $b$ letters U, so there are $\\binom{a+b}a$. Many identities become statements about where a path crosses a line.

**Set partitions.** The **Stirling number of the second kind** $S(n,k)$ counts the partitions of an $n$-set into $k$ nonempty blocks. Sorting by whether $n$ is alone in its block gives
$$S(n,k)=S(n-1,k-1)+kS(n-1,k).$$
If $n$ is alone, remove it. If not, remove it from its block, and remember which of the $k$ blocks of the rest it was in. The **Bell number** $B_n=\\sum_kS(n,k)$ counts all partitions. The values are $B_0,\\dots,B_6=1,1,2,5,15,52,203$, and $S(5,k)$ for $k=1,\\dots,5$ is $1,15,25,10,1$.

A **surjection** from an $n$-set onto a $k$-set is a set partition into $k$ blocks together with an assignment of the $k$ values to the blocks. So there are $k!\\,S(n,k)$ surjections. Since every function onto some image, $x^n=\\sum_kS(n,k)\\,x(x-1)\\cdots(x-k+1)$ for positive integers $x$, and hence as polynomials. These numbers return in the next module, where inclusion-exclusion gives a formula for them.`,
          resources: [
            morris('The part on enumeration covers bijections and combinatorial proofs.'),
            bogart('The chapter on distribution problems treats Stirling and Bell numbers through guided problems.'),
            oeis('Look up each sequence you compute, for example the Bell numbers, to see related results.'),
          ],
          exercises: [
            {
              slug: 'no-consecutive',
              title: 'Subsets with no two consecutive elements',
              prompt: `Prove that the number of subsets of $\\{1,\\dots,n\\}$ with no two consecutive elements is $F_{n+2}$, and that the number with exactly $k$ elements is $\\binom{n-k+1}k$. Give a bijection for the second count, and check both by computer for $n\\le 12$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'stirling-recurrence',
              title: 'Stirling numbers of the second kind',
              prompt: `Prove the recurrence for $S(n,k)$, and compute the table for $n\\le 7$. Prove that $S(n,2)=2^{n-1}-1$ and $S(n,n-1)=\\binom n2$ by direct arguments.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'bell-recurrence',
              title: 'The Bell recurrence',
              prompt: `Prove that $B_{n+1}=\\sum_{k=0}^n\\binom nkB_k$, by considering the block containing the element $n+1$. Use it to compute $B_7$ and $B_8$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'falling-factorials',
              title: 'Powers as falling factorials',
              prompt: `Prove $x^n=\\sum_kS(n,k)\\,x(x-1)\\cdots(x-k+1)$ by counting functions from an $n$-set to an $x$-set according to the size of the image. Use it to find a formula for $\\sum_{i=1}^mi^3$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Write i^3 in falling factorials of i, then sum each term with the hockey stick identity.',
            },
            {
              slug: 'compositions-bijection',
              title: 'Compositions and parts of size two',
              prompt: `Find a bijection proving that the number of compositions of $n$ with all parts at least $2$ equals the number of compositions of $n-1$ with all parts odd. Verify for $n\\le 12$ by computer.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How many compositions has $5$ with exactly $3$ parts?',
              answerOutline: `$\\binom42=6$.`,
            },
            {
              question: 'What is $S(4,2)$, and why?',
              answerOutline: `$7=2^3-1$: choose which other elements join element $1$, but not all of them.`,
            },
            {
              question: 'How many surjections are there from a $5$-set onto a $3$-set?',
              answerOutline: `$3!\\,S(5,3)=6\\cdot 25=150$.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'inclusion-exclusion-and-pigeonhole',
      title: 'Inclusion-Exclusion and the Pigeonhole Principle',
      description:
        'Counting by alternating corrections, its generalisation to Mobius inversion on posets, and the pigeonhole principle as a source of existence proofs.',
      lessons: [
        {
          slug: 'inclusion-exclusion',
          title: 'The principle of inclusion-exclusion',
          summary:
            'Counting what avoids every bad property, with derangements, surjections and Euler\'s function as examples.',
          estimatedMinutes: 150,
          objectives: [
            'State and prove inclusion-exclusion',
            'Count derangements and surjections',
            'Count integer solutions with upper bounds',
            'Use the symmetric form when intersections depend only on their size',
          ],
          concepts: [
            'Inclusion-exclusion',
            'Bad properties',
            'Symmetric form',
            'Derangements',
            'Surjections',
            'Bonferroni inequalities',
          ],
          explanation: `Let $A_1,\\dots,A_n$ be subsets of a finite set $U$, thought of as "bad" properties. For $I\\subseteq\\{1,\\dots,n\\}$ write $A_I=\\bigcap_{i\\in I}A_i$, with $A_\\varnothing=U$. Then the number of elements with no bad property is
$$\\Bigl|U\\setminus\\bigcup_iA_i\\Bigr|=\\sum_{I}(-1)^{|I|}|A_I|.$$
**Proof.** Take $x\\in U$, and let $J$ be the set of properties it has, with $|J|=j$. Then $x$ is counted in $A_I$ exactly when $I\\subseteq J$. So its total contribution is $\\sum_{i=0}^j(-1)^i\\binom ji$, which is $1$ if $j=0$ and $0$ otherwise. Truncating the sum after an even or odd number of terms gives upper and lower bounds, the **Bonferroni inequalities**.

**Symmetric form.** If $|A_I|$ depends only on $|I|=i$, say $|A_I|=N_i$, then the count is $\\sum_i(-1)^i\\binom niN_i$.

**Worked example 1.** How many integers in $\\{1,\\dots,1000\\}$ are divisible by none of $2,3,5$? Let $A_p$ be the multiples of $p$, so $|A_p|=\\lfloor 1000/p\\rfloor$, and intersections are multiples of products. The count is
$$1000-(500+333+200)+(166+100+66)-33=266.$$
That is the same idea that gives $\\varphi(n)=n\\prod_{p\\mid n}(1-1/p)$, where the floors are exact.

**Worked example 2: derangements.** A **derangement** is a permutation with no fixed point. Let $A_i$ be the permutations fixing $i$. Then $|A_I|=(n-|I|)!$, so
$$D_n=\\sum_{i=0}^n(-1)^i\\binom ni(n-i)!=n!\\sum_{i=0}^n\\frac{(-1)^i}{i!}.$$
So $D_4=24-24+12-4+1=9$, and $D_5=44$. Since the sum is a truncated series for $e^{-1}$, a random permutation is a derangement with probability close to $1/e$, and in fact $D_n$ is the nearest integer to $n!/e$ for $n\\ge 1$.

**Surjections.** Let $A_i$ be the functions from an $m$-set to $\\{1,\\dots,k\\}$ that miss $i$. Then the number of surjections is
$$\\sum_{i=0}^k(-1)^i\\binom ki(k-i)^m.$$
For $m=5$ and $k=3$ this is $243-3\\cdot 32+3\\cdot 1-0=150$, which agrees with $3!\\,S(5,3)$ from the previous module.

**Bounded solutions.** To count solutions of $x_1+x_2+x_3=15$ with $0\\le x_i\\le 6$, take $A_i$ to be the solutions with $x_i\\ge 7$. Substituting $x_i'=x_i-7$ gives stars and bars again. The count is $\\binom{17}2-3\\binom{10}2+3\\binom32=136-135+9=10$. Three variables cannot all be at least $7$, so the last term is zero.

The hard part of an inclusion-exclusion problem is choosing the properties so that intersections are easy to count. If they are not, choose different properties.`,
          resources: [
            morris('The part on enumeration includes the principle of inclusion-exclusion.'),
            guichard('The chapter on inclusion-exclusion includes forbidden position permutations such as derangements.'),
            trotter('The chapter on inclusion-exclusion counts surjections and derangements.'),
          ],
          exercises: [
            {
              slug: 'derangement-recurrences',
              title: 'Derangement recurrences',
              prompt: `Prove $D_n=(n-1)(D_{n-1}+D_{n-2})$ and $D_n=nD_{n-1}+(-1)^n$ combinatorially or from the formula, and prove that $D_n$ is the integer nearest to $n!/e$ for $n\\ge 1$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'partial-derangements',
              title: 'Exactly k fixed points',
              prompt: `Count the permutations of $\\{1,\\dots,n\\}$ with exactly $k$ fixed points, and use it to prove $\\sum_k\\binom nkD_{n-k}=n!$. Show that the expected number of fixed points of a random permutation is $1$ for every $n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pie-batch',
              title: 'A batch of inclusion-exclusion problems',
              prompt: `Count: (a) integers in $\\{1,\\dots,10000\\}$ that are not perfect squares, cubes or fifth powers; (b) arrangements of the letters AABBCC with no two equal letters adjacent; (c) $5$-card hands containing at least one card of every suit.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'menage-lite',
              title: 'Couples apart',
              prompt: `Four couples sit in a row of $8$ chairs. Use inclusion-exclusion to count the seatings in which no couple sits side by side, and check your answer by brute force.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'If a set of i couples are glued together, there are 8 - i blocks to arrange and 2 to the i internal orders.',
            },
            {
              slug: 'bonferroni',
              title: 'The Bonferroni inequalities',
              prompt: `Prove that truncating the inclusion-exclusion sum after the terms with $|I|\\le t$ gives an upper bound for even $t$ and a lower bound for odd $t$. Use the first two terms to bound the probability that some pair among $23$ people shares a birthday.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $D_3$, and which permutations are they?',
              answerOutline: `$2$: the two $3$-cycles.`,
            },
            {
              question: 'In the proof of inclusion-exclusion, why does an element with $j\\ge 1$ bad properties contribute $0$?',
              answerOutline: `Its contribution is $\\sum_i(-1)^i\\binom ji=(1-1)^j=0$.`,
            },
            {
              question: 'How many surjections are there from a $4$-set onto a $2$-set?',
              answerOutline: `$2^4-2=14$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/counting-combinatorics/inclusion-exclusion-and-pigeonhole'],
        },
        {
          slug: 'mobius-inversion',
          title: 'Mobius inversion on posets',
          summary:
            'The structure behind inclusion-exclusion, with applications to divisors and to counting aperiodic words.',
          estimatedMinutes: 140,
          objectives: [
            'Define the Mobius function of a finite poset',
            'State and prove Mobius inversion',
            'Recover inclusion-exclusion and number-theoretic inversion as special cases',
            'Count aperiodic words, Lyndon words and necklaces',
          ],
          concepts: [
            'Partially ordered set',
            'Incidence algebra',
            'Zeta function',
            'Mobius function',
            'Mobius inversion',
            'Boolean lattice and divisor lattice',
            'Aperiodic and Lyndon words',
          ],
          explanation: `Let $P$ be a finite partially ordered set. Its **Mobius function** is defined on pairs $x\\le y$ by
$$\\mu(x,x)=1,\\qquad\\mu(x,y)=-\\sum_{x\\le z<y}\\mu(x,z)\\quad\\text{for }x<y.$$
It is the inverse of the **zeta function** $\\zeta(x,y)=1$ (for $x\\le y$) under convolution in the incidence algebra, and this gives:

**Mobius inversion.** For functions $f,g$ on $P$,
$$g(y)=\\sum_{x\\le y}f(x)\\ \\text{ for all }y\\quad\\iff\\quad f(y)=\\sum_{x\\le y}\\mu(x,y)g(x)\\ \\text{ for all }y.$$
To prove the forward direction, substitute and swap sums: $\\sum_{x\\le y}\\mu(x,y)\\sum_{z\\le x}f(z)=\\sum_{z\\le y}f(z)\\sum_{z\\le x\\le y}\\mu(x,y)$. The inner sum is $1$ if $z=y$ and $0$ otherwise. That follows from the dual form of the recursion, which holds because $\\mu$ is a two-sided inverse.

**Two key posets.** In the **Boolean lattice** of subsets of a set ordered by inclusion, $\\mu(A,B)=(-1)^{|B\\setminus A|}$. Inversion then becomes inclusion-exclusion. In the **divisor lattice** of $n$, ordered by divisibility, $\\mu(d,n)$ is the number-theoretic $\\mu(n/d)$. That is $(-1)^r$ if $n/d$ is a product of $r$ distinct primes, and $0$ if it has a square factor. For a product of posets, the Mobius function is the product, which is why the divisor lattice is so simple: it is a product of chains.

**Worked example: aperiodic words.** A word of length $n$ is **aperiodic** if it is not a repetition $u^{n/d}$ of a shorter word $u$, with $d<n$. Every word of length $n$ is uniquely $u^{n/d}$ for an aperiodic $u$ of length $d\\mid n$. So if $M(d)$ is the number of aperiodic words of length $d$ over a $q$-letter alphabet, then
$$q^n=\\sum_{d\\mid n}M(d),\\qquad\\text{and so}\\qquad M(n)=\\sum_{d\\mid n}\\mu(n/d)q^d.$$
For binary words of length $6$, $M(6)=2^6-2^3-2^2+2^1=64-8-4+2=54$. Rotations act freely on aperiodic words, so the number of aperiodic necklaces, or **Lyndon words**, is $M(6)/6=9$. For length $4$ there are $(16-4)/4=3$: $0001$, $0011$ and $0111$. The same formula counts monic irreducible polynomials of degree $n$ over $\\mathbb{F}_q$, a coincidence that is explained by a bijection.

**Necklaces.** Counting all binary necklaces of length $n$, with rotations equivalent, gives $\\frac1n\\sum_{d\\mid n}\\varphi(d)q^{n/d}$. This can be obtained by summing Lyndon words over the divisors of $n$, or by Burnside's lemma in Module 5. For $n=6$, $q=2$ it gives $14$.`,
          resources: [
            { title: 'Enumerative Combinatorics (Stanley)', url: 'https://math.mit.edu/~rstan/ec/', type: 'textbook', cost: 'freemium', provider: 'Richard Stanley', note: 'The chapter on partially ordered sets is the standard treatment of Mobius inversion. Check the author\'s page for what is available online.' },
            oeis('Look up the counts of binary Lyndon words to compare with your own.'),
          ],
          exercises: [
            {
              slug: 'boolean-mobius',
              title: 'The Boolean lattice',
              prompt: `Prove that in the lattice of subsets of a finite set, $\\mu(A,B)=(-1)^{|B\\setminus A|}$ for $A\\subseteq B$. Use inversion on this lattice to derive inclusion-exclusion.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'product-posets',
              title: 'Products of posets',
              prompt: `Prove that the Mobius function of a product poset is the product of the Mobius functions. Deduce the formula for $\\mu$ on the divisor lattice from the case of a chain $\\{1,p,p^2,\\dots\\}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lyndon-count',
              title: 'Counting Lyndon words',
              prompt: `Compute the number of binary Lyndon words of each length up to $12$ with the formula, and verify by generating them by brute force. Then list the ternary Lyndon words of length $3$.`,
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'necklace-formula',
              title: 'The necklace formula',
              prompt: `Prove that the number of $q$-ary necklaces of length $n$ is $\\frac1n\\sum_{d\\mid n}\\varphi(d)q^{n/d}$, using the Lyndon word count and the identity $\\sum_{d\\mid m}\\varphi(d)=m$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\mu(1,12)$ in the divisor lattice?',
              answerOutline: `$0$, since $12$ has the square factor $4$.`,
            },
            {
              question: 'How does inclusion-exclusion arise from Mobius inversion?',
              answerOutline: `Use the Boolean lattice, where $\\mu(A,B)=(-1)^{|B\\setminus A|}$.`,
            },
            {
              question: 'How many binary Lyndon words have length $3$?',
              answerOutline: `$(8-2)/3=2$: $001$ and $011$.`,
            },
          ],
        },
        {
          slug: 'pigeonhole-principle',
          title: 'The pigeonhole principle',
          summary:
            'If there are more pigeons than holes, two share a hole, and with the right choice of holes this proves surprising things.',
          estimatedMinutes: 130,
          objectives: [
            'Apply the basic and generalised pigeonhole principles',
            'Choose pigeons and holes to make an argument work',
            'Prove the Erdos-Szekeres theorem and show it is sharp',
            'Use pigeonhole for approximation and divisibility arguments',
          ],
          concepts: [
            'Pigeonhole principle',
            'Generalised pigeonhole',
            'Averaging argument',
            'Erdos-Szekeres theorem',
            'Dirichlet approximation',
            'Subset sums',
          ],
          explanation: `**Pigeonhole principle.** If more than $k$ objects go into $k$ boxes, some box gets at least two. More generally, if $N$ objects go into $k$ boxes, some box gets at least $\\lceil N/k\\rceil$. The proof is one line. The skill is in choosing the boxes.

**Divisibility.** Among any $n+1$ numbers from $\\{1,\\dots,2n\\}$, one divides another. The boxes are the odd parts: write each number as $2^am$ with $m$ odd. There are only $n$ odd numbers up to $2n$, so two chosen numbers share $m$, and the smaller divides the larger. And $n+1$ is needed, as $\\{n+1,\\dots,2n\\}$ shows.

**Subset sums.** Any $n$ integers have a nonempty consecutive block whose sum is divisible by $n$. Take the prefix sums $s_0=0,s_1,\\dots,s_n$, which are $n+1$ numbers in $n$ residue classes modulo $n$. Two agree, and their difference is a block sum.

**Approximation.** For any real $\\alpha$ and integer $N\\ge 1$, there are integers $p$ and $1\\le q\\le N$ with $|q\\alpha-p|<1/N$. Divide $[0,1)$ into $N$ intervals, and place the fractional parts of $0,\\alpha,2\\alpha,\\dots,N\\alpha$. Two of these $N+1$ points share an interval. This is **Dirichlet's theorem**, and it gives infinitely many fractions with $|\\alpha-p/q|<1/q^2$ for irrational $\\alpha$.

**Worked example: Erdos-Szekeres.** Every sequence of $rs+1$ distinct real numbers contains an increasing subsequence of length $r+1$ or a decreasing subsequence of length $s+1$.

Label each term $a_i$ with the pair $(x_i,y_i)$, where $x_i$ is the length of the longest increasing subsequence ending at $a_i$, and $y_i$ the length of the longest decreasing one ending there. For $i<j$ the labels differ: if $a_i<a_j$, then $a_j$ can extend any increasing subsequence ending at $a_i$, so $x_j>x_i$. If $a_i>a_j$, then similarly $y_j>y_i$. Now suppose that no increasing subsequence has length $r+1$ and no decreasing one has length $s+1$. Then every label lies in $\\{1,\\dots,r\\}\\times\\{1,\\dots,s\\}$, with only $rs$ possible values for $rs+1$ distinct labels, which is impossible.

The bound is sharp. For $r=s=3$, the sequence $3,2,1,6,5,4,9,8,7$ has $9$ terms. Its increasing subsequences take at most one term from each block, so have length at most $3$. Its decreasing subsequences stay within a block, so they also have length at most $3$.

**Generalised version.** If the average of some numbers is $a$, then one of them is at least $a$. This "averaging" form of pigeonhole is used constantly, and its probabilistic version, that some outcome is at least the expected value, starts the probabilistic method in Module 6.`,
          resources: [
            guichard('See the section on the pigeonhole principle.'),
            trotter('The pigeonhole principle appears early, with many applications.'),
            bogart('Guided problems on the pigeonhole principle appear in the first chapter.'),
          ],
          exercises: [
            {
              slug: 'coprime-pair',
              title: 'Dividing and coprime pairs',
              prompt: `Prove that any $n+1$ numbers chosen from $\\{1,\\dots,2n\\}$ include two that are coprime, and two of which one divides the other. Show that $n$ numbers need not have either property.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'points-in-square',
              title: 'Points in a square',
              prompt: `Prove that among any $5$ points in a unit square, two are at distance at most $\\sqrt2/2$. Prove that among any $10$ points in a unit square, two are at distance at most $\\sqrt2/3$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'erdos-szekeres-sharp',
              title: 'Sharpness of Erdos-Szekeres',
              prompt: `For every $r,s\\ge 1$, construct a sequence of $rs$ distinct numbers with no increasing subsequence of length $r+1$ and no decreasing one of length $s+1$. Then count, by computer, the permutations of $\\{1,\\dots,9\\}$ with longest increasing and longest decreasing subsequences both of length $3$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'divisible-subset',
              title: 'Divisible subset sums',
              prompt: `Prove that any $n$ integers have a nonempty subset whose sum is divisible by $n$. Then prove that among any $2n-1$ integers there are $n$ whose sum is divisible by $n$ for $n=2$ and $n=3$, by checking all residue patterns.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The second statement is the Erdos-Ginzburg-Ziv theorem. For n = 3 you can argue with three equal residues or one of each.',
            },
          ],
          selfAssessment: [
            {
              question: 'How many people must be in a room to guarantee that two share a birthday month?',
              answerOutline: `$13$.`,
            },
            {
              question: 'What are the boxes in the proof that one of $n+1$ numbers in $\\{1,\\dots,2n\\}$ divides another?',
              answerOutline: `The odd parts $m$ in the factorisation $2^am$.`,
            },
            {
              question: 'Why do the labels in the Erdos-Szekeres proof differ?',
              answerOutline: `For $i<j$, either $a_i<a_j$, which makes $x_j>x_i$, or $a_i>a_j$, which makes $y_j>y_i$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/counting-combinatorics/inclusion-exclusion-and-pigeonhole'],
        },
      ],
    },
    {
      slug: 'generating-functions',
      title: 'Generating Functions',
      description:
        'Power series as bookkeeping: ordinary generating functions, integer partitions, exponential generating functions for labelled structures, and the Catalan numbers.',
      lessons: [
        {
          slug: 'ordinary-generating-functions',
          title: 'Ordinary generating functions',
          summary:
            'Encoding a sequence as a formal power series, and how sums and products of series count combinations of choices.',
          estimatedMinutes: 150,
          objectives: [
            'Manipulate formal power series',
            'Translate sum and product constructions into generating functions',
            'Extract coefficients using known series',
            'Solve change-making and dice problems with generating functions',
          ],
          concepts: [
            'Formal power series',
            'Ordinary generating function',
            'Product rule for generating functions',
            'Coefficient extraction $[x^n]$',
            'Geometric and binomial series',
            'Partial sums via $1/(1-x)$',
          ],
          explanation: `The **ordinary generating function** of a sequence $a_0,a_1,\\dots$ is the formal power series $A(x)=\\sum_na_nx^n$. "Formal" means that we never need to substitute a value for $x$. The series is just a way to store the sequence, with addition and multiplication defined by the usual rules:
$$A(x)B(x)=\\sum_n\\Bigl(\\sum_{k=0}^na_kb_{n-k}\\Bigr)x^n.$$
A series has a multiplicative inverse exactly when its constant term is nonzero. So $1/(1-x)=1+x+x^2+\\cdots$ is a legitimate identity, whatever $x$ is. We write $[x^n]A(x)$ for the coefficient of $x^n$.

**Why products count.** If $a_k$ counts the ways to make a choice of size $k$ of one kind, and $b_k$ a choice of size $k$ of another kind, then the coefficient of $x^n$ in $A(x)B(x)$ counts pairs of choices with total size $n$. So a problem that splits into independent parts has a generating function that is a product.

**Worked example 1: change.** In how many ways can you pay $50$ cents with coins of $1$, $5$, $10$ and $25$ cents? Each coin type contributes a factor counting how much of the total it pays: $1+x^c+x^{2c}+\\cdots=1/(1-x^c)$. So the answer is
$$[x^{50}]\\frac1{(1-x)(1-x^5)(1-x^{10})(1-x^{25})}=49.$$
To compute this, multiply the factors one at a time and keep coefficients up to $x^{50}$. Each multiplication by $1/(1-x^c)$ replaces $a_n$ by $a_n+a_{n-c}$, working upwards, which is the standard dynamic programme. For $100$ cents the answer is $242$, and adding half-dollars gives $292$.

**Worked example 2: dice.** The number of ways to roll a total of $10$ with three dice is $[x^{10}](x+\\cdots+x^6)^3$. Write
$$(x+\\cdots+x^6)^3=x^3\\Bigl(\\frac{1-x^6}{1-x}\\Bigr)^3=x^3(1-3x^6+3x^{12}-x^{18})\\sum_k\\binom{k+2}2x^k.$$
We need $[x^7]$ of the product after the $x^3$. That is $\\binom92-3\\binom32=36-9=27$.

**Useful series.** These are worth knowing by heart:
$$\\frac1{1-x}=\\sum x^n,\\qquad\\frac1{(1-x)^k}=\\sum_n\\binom{n+k-1}{k-1}x^n,\\qquad\\frac{A(x)}{1-x}=\\sum_n\\Bigl(\\sum_{j\\le n}a_j\\Bigr)x^n.$$
The last one says that dividing by $1-x$ takes partial sums, and multiplying by $1-x$ takes differences. Differentiating and multiplying by $x$ replaces $a_n$ by $na_n$.

Generating functions turn combinatorial structure into algebra. When an algebraic identity between series holds, it is a theorem about the counts, and the algebra can often be translated back into a bijective proof.`,
          resources: [
            wilf('Read the first two chapters, on introductory ideas and on series. The book is free from the author\'s page.'),
            morris('The part on enumeration includes generating functions.'),
            guichard('The chapter on generating functions has many worked problems.'),
          ],
          exercises: [
            {
              slug: 'making-change',
              title: 'Making change',
              prompt: `Write the generating function for the number of ways to pay $n$ cents with coins of $1$, $5$, $10$, $25$ and $50$ cents. Implement the coefficient computation, and confirm the values $49$ for $n=50$ with the first four coins, and $292$ for $n=100$ with all five.`,
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'restricted-selections',
              title: 'Restricted selections',
              prompt: `Find the generating function, and then the number for $n=20$, of the ways to choose $n$ fruits from apples, bananas, cherries and dates, if apples come in even numbers, bananas in multiples of $5$, at most $4$ cherries, and at most $1$ date. Simplify the product to a single fraction.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The product telescopes: the factors for apples and dates combine, and so do those for bananas and cherries.',
            },
            {
              slug: 'sum-of-squares-gf',
              title: 'Sums by generating functions',
              prompt: `Use the operator $x\\frac d{dx}$ on $1/(1-x)$, and division by $1-x$, to find a closed form for $\\sum_{k=0}^nk^2$. Then find the generating function of the Fibonacci numbers and use it to prove $\\sum_{k=0}^nF_k=F_{n+2}-1$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sicherman-dice',
              title: 'Strange dice',
              prompt: `Find two six-sided dice with positive integer labels, different from standard dice, whose sum has the same distribution as two standard dice. Use the factorisation of $x+x^2+\\cdots+x^6$ into irreducible polynomials, and prove that your pair is the only other one.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What sequence does $1/(1-2x)$ generate?',
              answerOutline: `$a_n=2^n$.`,
            },
            {
              question: 'Why does a product of generating functions count combined choices?',
              answerOutline: `The coefficient of $x^n$ in the product sums $a_kb_{n-k}$ over the ways to split the total size $n$.`,
            },
            {
              question: 'What does multiplying a generating function by $1/(1-x)$ do?',
              answerOutline: `It replaces each coefficient by the sum of all coefficients up to that index.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/counting-combinatorics/generating-functions-intro'],
        },
        {
          slug: 'integer-partitions',
          title: 'Integer partitions',
          summary:
            'Partitions of an integer, Ferrers diagrams, and identities proved by generating functions and by bijections.',
          estimatedMinutes: 160,
          objectives: [
            'Write the generating function for partitions with restricted parts',
            'Prove Euler\'s theorem on distinct and odd parts',
            'Use Ferrers diagrams and conjugation',
            'State the pentagonal number theorem and use it to compute $p(n)$',
          ],
          concepts: [
            'Partition $p(n)$',
            'Ferrers diagram',
            'Conjugate partition',
            'Partitions into distinct parts',
            'Partitions into odd parts',
            'Euler\'s pentagonal number theorem',
          ],
          explanation: `A **partition** of $n$ is a way of writing $n$ as a sum of positive integers where order does not matter, such as $4+2+1$ for $7$. Let $p(n)$ be the number of partitions. Then $p(0),\\dots,p(10)$ are $1,1,2,3,5,7,11,15,22,30,42$, and the growth is fast: $p(100)=190569292$. There is no simple closed formula, but generating functions give everything.

A partition is determined by how many parts of each size it has. So
$$\\sum_np(n)x^n=\\prod_{k\\ge1}\\frac1{1-x^k},$$
where the factor $1/(1-x^k)=1+x^k+x^{2k}+\\cdots$ chooses the number of parts equal to $k$. Restricting the parts changes the factors. For parts that are distinct, use $\\prod_k(1+x^k)$. For odd parts, use $\\prod_{k\\text{ odd}}1/(1-x^k)$.

**Euler's theorem.** The number of partitions of $n$ into distinct parts equals the number into odd parts. In generating functions,
$$\\prod_k(1+x^k)=\\prod_k\\frac{1-x^{2k}}{1-x^k}=\\prod_{k\\text{ odd}}\\frac1{1-x^k},$$
since all the even factors in the denominator cancel the numerator. A bijection behind this is to take a partition into odd parts, and merge equal parts in pairs repeatedly. Equivalently, write the multiplicity $m$ of each odd part $k$ in binary, $m=\\sum2^{j}$, and replace the copies by parts $2^jk$. These are distinct, since every integer is uniquely $2^j$ times an odd number.

**Worked example.** Take $n=6$. Its $11$ partitions are $6$, $5+1$, $4+2$, $4+1+1$, $3+3$, $3+2+1$, $3+1+1+1$, $2+2+2$, $2+2+1+1$, $2+1+1+1+1$ and $1+1+1+1+1+1$. Those with distinct parts are $6$, $5+1$, $4+2$ and $3+2+1$. Those with odd parts are $5+1$, $3+3$, $3+1+1+1$ and $1+1+1+1+1+1$. Both lists have $4$ elements. The bijection sends $3+3\\mapsto 6$, $1^6\\mapsto 4+2$ (since $6=4+2$ in binary), $3+1+1+1\\mapsto 3+2+1$ and $5+1\\mapsto 5+1$.

**Ferrers diagrams.** Draw a partition as left-justified rows of dots, with row lengths the parts, largest first. Reflecting in the diagonal gives the **conjugate** partition. So the number of partitions of $n$ into at most $k$ parts equals the number with largest part at most $k$. Ferrers diagrams turn many identities into pictures.

**The pentagonal number theorem.** Euler proved
$$\\prod_{k\\ge1}(1-x^k)=\\sum_{j\\in\\mathbb{Z}}(-1)^jx^{j(3j-1)/2}=1-x-x^2+x^5+x^7-x^{12}-x^{15}+\\cdots.$$
Multiplying by the partition generating function gives the recurrence
$$p(n)=p(n-1)+p(n-2)-p(n-5)-p(n-7)+p(n-12)+\\cdots,$$
which is how $p(n)$ was first computed for large $n$. Franklin found a beautiful bijective proof by Ferrers diagrams.`,
          resources: [
            wilf('The chapter on series includes the partition generating function and Euler\'s identity.'),
            guichard('See the section on partitions of integers in the chapter on generating functions.'),
            oeis('Compare your partition counts with the entries for $p(n)$ and its variants.'),
          ],
          exercises: [
            {
              slug: 'distinct-odd-bijection',
              title: 'Distinct parts and odd parts',
              prompt: `Describe both directions of the bijection between partitions into odd parts and partitions into distinct parts, and prove they are inverse. List the pairs for $n=8$, where each side has $6$ partitions.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'conjugation',
              title: 'Conjugation identities',
              prompt: `Use Ferrers diagrams to prove: the number of partitions of $n$ into exactly $k$ parts equals the number with largest part exactly $k$; and the number of self-conjugate partitions of $n$ equals the number of partitions of $n$ into distinct odd parts.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pentagonal-recurrence',
              title: 'Computing p(n)',
              prompt: `Implement the pentagonal number recurrence and compute $p(n)$ up to $n=100$, confirming $p(100)=190569292$. Compare its speed with expanding the product of the factors $1/(1-x^k)$ directly.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'restricted-partitions',
              title: 'Restricted partitions',
              prompt: `Find the generating function for partitions into parts of size $1$, $2$ and $3$. By partial fractions or otherwise, show that this number is the integer nearest to $(n+3)^2/12$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'glaisher',
              title: 'Glaisher\'s theorem',
              prompt: `Prove that for each $d\\ge 2$, the number of partitions of $n$ in which no part appears $d$ or more times equals the number in which no part is divisible by $d$. Check the case $d=3$ by computer for $n\\le 20$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $p(5)$?',
              answerOutline: `$7$: $5$, $4+1$, $3+2$, $3+1+1$, $2+2+1$, $2+1+1+1$, $1^5$.`,
            },
            {
              question: 'Which factor in the partition generating function counts the parts of size $3$?',
              answerOutline: `$1/(1-x^3)=1+x^3+x^6+\\cdots$, where $x^{3m}$ means $m$ parts of size $3$.`,
            },
            {
              question: 'What does conjugation do to a Ferrers diagram?',
              answerOutline: `It reflects in the diagonal, swapping rows and columns, so the number of parts and the largest part change places.`,
            },
          ],
        },
        {
          slug: 'exponential-generating-functions',
          title: 'Exponential generating functions',
          summary:
            'The right series for labelled structures, and the exponential formula.',
          estimatedMinutes: 150,
          objectives: [
            'Explain when to use exponential rather than ordinary generating functions',
            'Multiply exponential generating functions for labelled products',
            'Derive the exponential generating functions of derangements, surjections and set partitions',
            'Count words with parity conditions',
          ],
          concepts: [
            'Exponential generating function',
            'Labelled product and binomial convolution',
            'The exponential formula',
            'Set partitions and $e^{e^x-1}$',
            'Derangements and $e^{-x}/(1-x)$',
            'Words with restrictions',
          ],
          explanation: `The **exponential generating function** of $a_0,a_1,\\dots$ is $\\hat A(x)=\\sum_na_n\\frac{x^n}{n!}$. It is the right tool for **labelled** objects, where the $n$ elements are distinguishable, as in permutations, set partitions and words. The product rule becomes
$$\\hat A(x)\\hat B(x)=\\sum_n\\Bigl(\\sum_k\\binom nka_kb_{n-k}\\Bigr)\\frac{x^n}{n!}.$$
The coefficient counts the ways to split a labelled $n$-set into two parts, of sizes $k$ and $n-k$, with an $A$-structure on the first and a $B$-structure on the second. The binomial coefficient chooses which labels go where. The basic series are $e^x=\\sum x^n/n!$, which has a single structure on each set, and $1/(1-x)=\\sum n!\\,x^n/n!$, which counts linear orders.

**The exponential formula.** If $\\hat C(x)$ counts connected structures, such as blocks or cycles, and a general structure is a set of connected ones on a partition of the labels, then the general structures have exponential generating function $e^{\\hat C(x)}$.

Here are some consequences. A set partition is a set of nonempty blocks, and a block has the series $e^x-1$, so the Bell numbers have $\\sum B_nx^n/n!=e^{e^x-1}$. A permutation is a set of cycles, and there are $(k-1)!$ cycles on $k$ labels, so cycles have the series $\\sum_k x^k/k=-\\ln(1-x)$, and $e^{-\\ln(1-x)}=1/(1-x)$ recovers $n!$. A derangement is a set of cycles of length at least $2$, which gives
$$\\sum_nD_n\\frac{x^n}{n!}=e^{-\\ln(1-x)-x}=\\frac{e^{-x}}{1-x},$$
and extracting coefficients gives the inclusion-exclusion formula again. Surjections onto a $k$-set are sequences of $k$ nonempty blocks, which gives $(e^x-1)^k$.

**Worked example.** How many words of length $n$ over $\\{a,b,c\\}$ contain an even number of $a$'s? A word is a labelled product: the positions are labels, split into those holding $a$, $b$ and $c$. The positions holding $a$ must be an even number, giving $\\sum_{k\\text{ even}}x^k/k!=\\cosh x=\\frac{e^x+e^{-x}}2$. The others are unrestricted, giving $e^x$ each. So the series is
$$\\frac{e^x+e^{-x}}2\\,e^{2x}=\\frac{e^{3x}+e^{x}}2,$$
and the count is $\\frac{3^n+1}2$. For $n=2$ this is $5$: $bb,bc,cb,cc,aa$. For $n=4$ it is $41$, which a brute-force count confirms. If $b$ also had to appear an even number of times, the series would be $\\cosh^2x\\,e^x$, giving $\\frac{3^n+2+(-1)^n}4$.

Ordinary generating functions are for unlabelled objects, and exponential ones for labelled objects. Using the wrong kind is the most common error. The product of two ordinary series does not account for how labels are shared.`,
          resources: [
            wilf('Read the chapter on the exponential formula.'),
            { title: 'Analytic Combinatorics (Flajolet and Sedgewick)', url: 'https://ac.cs.princeton.edu/home/', type: 'textbook', cost: 'free', provider: 'Princeton University', note: 'The chapter on labelled structures develops the symbolic method for exponential generating functions.' },
            guichard('See the section on exponential generating functions.'),
          ],
          exercises: [
            {
              slug: 'two-even-letters',
              title: 'Two letters of even multiplicity',
              prompt: `Derive the formula $\\frac{3^n+2+(-1)^n}4$ for words over $\\{a,b,c\\}$ with both $a$ and $b$ appearing an even number of times. Then count the words over $\\{a,b,c,d\\}$ of length $n$ in which $a$ appears an odd number of times and $b$ at least once.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'bell-egf',
              title: 'The Bell numbers',
              prompt: `Prove that $\\sum B_nx^n/n!=e^{e^x-1}$. Differentiate to recover the recurrence $B_{n+1}=\\sum_k\\binom nkB_k$, and prove Dobinski's formula $B_n=\\frac1e\\sum_{k\\ge 0}k^n/k!$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'involutions',
              title: 'Involutions',
              prompt: `An involution is a permutation with $\\sigma^2=\\mathrm{id}$, made of fixed points and $2$-cycles. Show that the number of involutions has exponential generating function $e^{x+x^2/2}$, and derive the recurrence $t_n=t_{n-1}+(n-1)t_{n-2}$. Check $t_n$ for $n\\le 8$ by brute force.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'labelled-forests',
              title: 'Rooted labelled trees',
              prompt: `Let $T(x)$ be the exponential generating function of rooted labelled trees. Explain why $T(x)=xe^{T(x)}$. Assume Lagrange inversion, which gives $n^{n-1}$ rooted trees on $n$ labels, and check that this agrees with Cayley's formula.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When should you use an exponential generating function?',
              answerOutline: `When the objects are labelled and are built by splitting the set of labels among components.`,
            },
            {
              question: 'What is the exponential generating function of permutations?',
              answerOutline: `$1/(1-x)$, since there are $n!$ permutations of $n$ labels.`,
            },
            {
              question: 'What does the exponential formula say?',
              answerOutline: `If connected structures have series $\\hat C(x)$, then sets of them have series $e^{\\hat C(x)}$.`,
            },
          ],
        },
        {
          slug: 'catalan-numbers',
          title: 'Catalan numbers',
          summary:
            'One sequence counting dozens of structures, its formula by the reflection principle, and its generating function.',
          estimatedMinutes: 150,
          objectives: [
            'Prove $C_n=\\frac1{n+1}\\binom{2n}n$ by the reflection principle',
            'Derive the Catalan recurrence and the generating function',
            'Prove that several families are counted by the Catalan numbers',
            'Build bijections between Catalan families',
          ],
          concepts: [
            'Dyck path',
            'Reflection principle',
            'Catalan recurrence',
            'Quadratic generating function',
            'Binary trees',
            'Triangulations and bracketings',
            'Non-crossing partitions',
          ],
          explanation: `A **Dyck path** of length $2n$ is a lattice path from $(0,0)$ to $(2n,0)$, with steps $(1,1)$ and $(1,-1)$, that never goes below the axis. The number of them is the **Catalan number** $C_n$. Its values from $C_0$ are $1,1,2,5,14,42,132,429,1430$.

**Formula by reflection.** All paths with $n$ up-steps and $n$ down-steps number $\\binom{2n}n$. A bad path touches the line $y=-1$. Reflect the part of it after its first touch in that line. The result is a path ending at $(2n,-2)$, which has $n-1$ up-steps and $n+1$ down-steps. This is a bijection between bad paths and all paths ending at $-2$, since every such path must cross $y=-1$, and reflecting back undoes it. So
$$C_n=\\binom{2n}n-\\binom{2n}{n+1}=\\frac1{n+1}\\binom{2n}n.$$

**Worked example.** For $n=3$, $\\binom63-\\binom64=20-15=5$. The five Dyck paths, written with U and D, are UUUDDD, UUDUDD, UUDDUD, UDUUDD and UDUDUD. The same number counts the ways to bracket a product of $4$ factors: $((ab)c)d$, $(a(bc))d$, $(ab)(cd)$, $a((bc)d)$ and $a(b(cd))$. It counts the triangulations of a pentagon, and the binary trees with $3$ internal nodes. Matching these lists to each other is the best way to understand them.

**Recurrence.** Split a nonempty Dyck path at its first return to the axis. It has the form U $P$ D $Q$, where $P$ is a Dyck path of length $2k$ and $Q$ one of length $2(n-1-k)$. So
$$C_n=\\sum_{k=0}^{n-1}C_kC_{n-1-k},\\qquad C_0=1.$$
In generating functions, with $C(x)=\\sum C_nx^n$, this says $C(x)=1+xC(x)^2$. Solving the quadratic, and taking the root that is finite at $x=0$,
$$C(x)=\\frac{1-\\sqrt{1-4x}}{2x}.$$
Expanding $\\sqrt{1-4x}$ with the binomial series recovers the formula. Many structures that decompose into a root and two independent substructures satisfy this same quadratic equation. That is the quickest way to recognise a Catalan family: binary trees, bracketings, triangulations (the edge on a fixed side of the polygon is in a triangle that splits the rest), and non-crossing matchings.

**Cycle lemma.** Another proof explains the factor $\\frac1{n+1}$. Among the $2n+1$ cyclic shifts of any sequence of $n+1$ up-steps and $n$ down-steps, exactly one has all partial sums positive. Removing its first step gives a Dyck path. So $(2n+1)C_n=\\binom{2n+1}n$.

The Catalan numbers grow like $4^n/(n^{3/2}\\sqrt\\pi)$, which can be read off from the square root singularity of $C(x)$ at $x=1/4$.`,
          resources: [
            { title: 'Enumerative Combinatorics (Stanley)', url: 'https://math.mit.edu/~rstan/ec/', type: 'textbook', cost: 'freemium', provider: 'Richard Stanley', note: 'The second volume is the classic source on Catalan numbers. See the author\'s page for what is available online.' },
            guichard('See the section on Catalan numbers.'),
            oeis('The entry for the Catalan numbers lists hundreds of interpretations to explore.'),
          ],
          exercises: [
            {
              slug: 'reflection-principle',
              title: 'The reflection principle',
              prompt: `Write the reflection proof carefully, proving that the map is a bijection. Then use reflection to count the paths from $(0,0)$ to $(a+b,a-b)$, with $a>b$, that stay strictly above the axis after the start. This is the ballot theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'catalan-bijections',
              title: 'Three Catalan families',
              prompt: `Give explicit bijections between Dyck paths of length $2n$, binary trees with $n$ internal nodes, and triangulations of an $(n+2)$-gon. Draw all $14$ objects of each kind for $n=4$, or have a program draw them, and match them up.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'generating-function-catalan',
              title: 'From the quadratic to the formula',
              prompt: `From $C(x)=1+xC(x)^2$, derive $C(x)=(1-\\sqrt{1-4x})/(2x)$, explaining the choice of sign. Expand $\\sqrt{1-4x}$ with the generalised binomial theorem to obtain $C_n=\\frac1{n+1}\\binom{2n}n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'non-crossing',
              title: 'Non-crossing partitions',
              prompt: `A partition of $\\{1,\\dots,n\\}$, placed around a circle, is non-crossing if no two blocks cross. Prove that there are $C_n$ non-crossing partitions, and verify for $n\\le 8$ by computer. Then show that the number of non-crossing perfect matchings of $2n$ points is also $C_n$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $C_4$?',
              answerOutline: `$\\frac15\\binom84=14$.`,
            },
            {
              question: 'Where does the first return decomposition of a Dyck path give the recurrence?',
              answerOutline: `It writes the path as U $P$ D $Q$, with $P$ and $Q$ Dyck paths of total length $2n-2$.`,
            },
            {
              question: 'Why take the minus sign in the formula for $C(x)$?',
              answerOutline: `With the plus sign the expression has a pole at $x=0$. The minus sign gives a power series with constant term $1$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'power-series-engine',
        title: 'A power series engine',
        description: `Write a small library for truncated formal power series with integer or rational coefficients: addition, multiplication, inversion, composition, derivatives, square roots, and the exponential and logarithm of a series with suitable constant term. Use it to compute, from generating functions alone, the partition numbers and their restricted versions, Bell numbers, derangements, involutions, Catalan numbers and the change-making counts. For each family, compare with a brute-force count for small sizes, and with a recurrence for large sizes.`,
        deliverables: [
          'A tested power series class with the operations listed, using exact arithmetic',
          'Generating function computations for at least eight families, with brute-force checks',
          'A demonstration of Euler\'s distinct-odd identity and Glaisher\'s theorem up to $n=200$',
          'A function that returns the Catalan numbers from the quadratic equation by fixed-point iteration',
          'A short report on two identities your engine confirmed and how you proved them',
        ],
        estimatedHours: 8,
        stretchGoals: ['Guess a linear recurrence from a sequence, and test the guess against more terms'],
      },
    },
    {
      slug: 'recurrences',
      title: 'Recurrences',
      description:
        'Linear recurrences with constant coefficients, solved by characteristic roots, by particular solutions, and by generating functions.',
      lessons: [
        {
          slug: 'linear-homogeneous-recurrences',
          title: 'Linear homogeneous recurrences',
          summary:
            'The characteristic polynomial, distinct and repeated roots, and setting up recurrences from counting problems.',
          estimatedMinutes: 140,
          objectives: [
            'Set up a recurrence from a counting problem',
            'Solve linear homogeneous recurrences with distinct roots',
            'Handle repeated roots',
            'Prove that the solution space has dimension equal to the order',
          ],
          concepts: [
            'Linear recurrence with constant coefficients',
            'Order and initial conditions',
            'Characteristic polynomial',
            'Distinct and repeated roots',
            'Solution space',
            'Tiling recurrences',
          ],
          explanation: `A **linear homogeneous recurrence** of order $k$ with constant coefficients has the form
$$a_n=c_1a_{n-1}+c_2a_{n-2}+\\dots+c_ka_{n-k},\\qquad c_k\\ne 0.$$
The $k$ initial values $a_0,\\dots,a_{k-1}$ determine the sequence. Sums of solutions and multiples of solutions are solutions, so the solutions form a vector space of dimension $k$.

Try $a_n=r^n$. It is a solution exactly when $r$ is a root of the **characteristic polynomial**
$$r^k-c_1r^{k-1}-\\dots-c_k.$$
If the roots $r_1,\\dots,r_k$ are distinct, the general solution is $a_n=\\sum\\alpha_ir_i^n$. The $k$ constants are fitted to the initial values. This always works, because the matrix of the system is a Vandermonde matrix, which is invertible for distinct $r_i$. If a root $r$ has multiplicity $m$, then $r^n,nr^n,\\dots,n^{m-1}r^n$ are all solutions, and together they still give a basis.

**Worked example 1.** Solve $a_n=5a_{n-1}-6a_{n-2}$, with $a_0=1$ and $a_1=4$. The polynomial $r^2-5r+6=(r-2)(r-3)$ has roots $2$ and $3$, so $a_n=\\alpha 2^n+\\beta 3^n$. The initial values give $\\alpha+\\beta=1$ and $2\\alpha+3\\beta=4$, so $\\beta=2$ and $\\alpha=-1$. Thus $a_n=2\\cdot 3^n-2^n$. Check: the recurrence gives $a_2=20-6=14$, and the formula gives $18-4=14$.

**Worked example 2.** Solve $a_n=4a_{n-1}-4a_{n-2}$, with $a_0=1$ and $a_1=6$. Here $r^2-4r+4=(r-2)^2$ has a double root, so $a_n=(\\alpha+\\beta n)2^n$. Then $\\alpha=1$ and $2(1+\\beta)=6$, so $\\beta=2$, and $a_n=(1+2n)2^n$. Check: the recurrence gives $a_2=24-4=20$, and the formula gives $5\\cdot 4=20$.

**Setting up recurrences.** Decide what the last step of a construction can be. A $2\\times n$ strip can be tiled with dominoes by ending in a vertical domino, leaving a $2\\times(n-1)$ strip, or in two horizontal ones, leaving $2\\times(n-2)$. So $t_n=t_{n-1}+t_{n-2}$, with $t_1=1$ and $t_2=2$, which are Fibonacci numbers. For a $3\\times n$ strip, the counts for even $n$ are $1,3,11,41,153$ for $n=0,2,4,6,8$, satisfying $t_n=4t_{n-2}-t_{n-4}$. Finding that recurrence requires introducing a second sequence for strips with a missing corner, which is typical: a system of recurrences is often easier to find than a single one.

**Binary strings without $00$.** A string either ends in $1$, after any valid string of length $n-1$, or ends in $10$, after any valid string of length $n-2$. So $b_n=b_{n-1}+b_{n-2}$ with $b_1=2$, $b_2=3$, and $b_n=F_{n+2}$.

The roots also tell you growth: the root of largest absolute value dominates. Fibonacci numbers grow like $\\phi^n/\\sqrt5$, with $\\phi=(1+\\sqrt5)/2$, so $F_n$ is the integer nearest to $\\phi^n/\\sqrt5$.`,
          resources: [
            morris('The part on enumeration treats recursion and solving recurrence relations.'),
            trotter('The chapter on recurrence equations covers the same methods with many examples.'),
            guichard('See the section on recurrence relations.'),
          ],
          exercises: [
            {
              slug: 'solve-batch',
              title: 'Solve a batch',
              prompt: `Solve: (a) $a_n=2a_{n-1}+3a_{n-2}$ with $a_0=0$, $a_1=1$; (b) $a_n=6a_{n-1}-9a_{n-2}$ with $a_0=1$, $a_1=0$; (c) $a_n=a_{n-1}+a_{n-2}-a_{n-3}$ with $a_0=0$, $a_1=1$, $a_2=2$. Check each formula against the first ten terms.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'three-by-n-tilings',
              title: 'Tiling a three-row strip',
              prompt: `Let $t_n$ be the number of domino tilings of a $3\\times n$ strip, and $u_n$ the number for a $3\\times n$ strip with one corner square removed. Set up a system of recurrences, deduce $t_n=4t_{n-2}-t_{n-4}$ for even $n$, and solve it. Confirm $t_8=153$ by a brute-force count.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'repeated-roots-proof',
              title: 'Repeated roots',
              prompt: `Prove that if $r$ is a root of multiplicity $m$ of the characteristic polynomial, then $n^jr^n$ is a solution for $0\\le j<m$. Prove that the $k$ solutions obtained from all the roots are linearly independent.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Apply the operator x d/dx to x^(n-k) times the characteristic polynomial, and use that r is also a root of the derivative.',
            },
            {
              slug: 'strings-without-patterns',
              title: 'Strings avoiding a pattern',
              prompt: `Find and solve a recurrence for: (a) ternary strings of length $n$ with no two consecutive equal symbols; (b) binary strings of length $n$ with no three consecutive $1$s. For (b), find the growth rate and check by brute force for $n\\le 15$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the characteristic polynomial of $a_n=a_{n-1}+a_{n-2}$?',
              answerOutline: `$r^2-r-1$, with roots $(1\\pm\\sqrt5)/2$.`,
            },
            {
              question: 'How many initial values are needed for a recurrence of order $k$?',
              answerOutline: `$k$.`,
            },
            {
              question: 'If $2$ is a double root, what are the basic solutions?',
              answerOutline: `$2^n$ and $n2^n$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/recurrences-induction-and-growth/solving-recurrences'],
        },
        {
          slug: 'nonhomogeneous-recurrences',
          title: 'Nonhomogeneous recurrences',
          summary:
            'Adding a forcing term: particular solutions, resonance, and some classic recurrences.',
          estimatedMinutes: 130,
          objectives: [
            'Write the general solution as homogeneous plus particular',
            'Guess particular solutions for polynomial and exponential forcing',
            'Handle resonance when the forcing matches a characteristic root',
            'Solve classic recurrences such as the Tower of Hanoi and regions cut by lines',
          ],
          concepts: [
            'Forcing term',
            'Particular solution',
            'Superposition',
            'Resonance',
            'Summation recurrences',
            'Divide and conquer recurrences',
          ],
          explanation: `A **nonhomogeneous** linear recurrence is $a_n=c_1a_{n-1}+\\dots+c_ka_{n-k}+f(n)$. If $p_n$ is any one solution (a **particular solution**), then every solution is $p_n$ plus a solution of the homogeneous recurrence. The difference of two solutions solves the homogeneous one.

**Guessing.** For forcing $f(n)=s^n$, try $p_n=cs^n$. For a polynomial of degree $d$, try a polynomial of degree $d$. If $s$ is a root of the characteristic polynomial of multiplicity $m$, the trial fails, and this is called **resonance**. Then multiply the guess by $n^m$. The same rule applies to polynomial forcing when $1$ is a root.

**Worked example 1.** Solve $a_n=3a_{n-1}+2^n$, with $a_0=1$. Try $p_n=c2^n$: we need $c2^n=3c2^{n-1}+2^n$. Dividing by $2^{n-1}$ gives $2c=3c+2$, so $c=-2$, and $p_n=-2^{n+1}$. The general solution is $a_n=A3^n-2^{n+1}$, and $a_0=1$ gives $A=3$. So
$$a_n=3^{n+1}-2^{n+1}.$$
Check: $a_1=3\\cdot 1+2=5$, and $9-4=5$. Also $a_2=15+4=19$, and $27-8=19$.

**Worked example 2: resonance.** Solve $a_n=2a_{n-1}+2^n$, with $a_0=0$. The guess $c2^n$ fails, since $2$ is the characteristic root. Try $p_n=cn2^n$: then $cn2^n=2c(n-1)2^{n-1}+2^n$, which gives $cn=c(n-1)+1$, so $c=1$. The general solution is $(A+n)2^n$, and $a_0=0$ gives $A=0$. So $a_n=n2^n$. Check: $a_1=2$ and $a_2=4+4=8$, matching $1\\cdot 2$ and $2\\cdot 4$.

**Classic examples.** The Tower of Hanoi with $n$ discs takes $h_n=2h_{n-1}+1$ moves, as you must move $n-1$ discs off, move the largest, and move the $n-1$ back. With $h_0=0$, this gives $h_n=2^n-1$. Next, $n$ lines in general position, with no two parallel and no three through a point, cut the plane into $L_n$ regions. The $n$th line meets the earlier ones in $n-1$ points, which cut it into $n$ pieces, and each piece splits a region in two. So $L_n=L_{n-1}+n$, which gives $L_n=1+\\frac{n(n+1)}2$.

**Divide and conquer.** Recurrences such as $T(n)=2T(n/2)+n$ are not of constant order, but substituting $n=2^m$ and $a_m=T(2^m)$ gives $a_m=2a_{m-1}+2^m$. That is the resonant example above, so $T(2^m)=m2^m+2^mT(1)$, or $T(n)=n\\log_2n+nT(1)$. This is the source of the $n\\log n$ running time of merge sort.

When a guess for the particular solution seems to fail for no reason, check whether the forcing term is itself a solution of the homogeneous equation.`,
          resources: [
            wilf('The opening chapter shows how generating functions handle recurrences with a forcing term.'),
            trotter('The chapter on recurrence equations treats particular solutions and resonance.'),
            guichard('See the section on recurrence relations in the chapter on generating functions.'),
          ],
          exercises: [
            {
              slug: 'particular-solutions',
              title: 'Particular solutions',
              prompt: `Solve: (a) $a_n=2a_{n-1}+n$, $a_0=1$; (b) $a_n=a_{n-1}+n^2$, $a_0=0$; (c) $a_n=4a_{n-1}-4a_{n-2}+2^n$, $a_0=a_1=0$. Check each against the first ten terms.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'regions-of-plane',
              title: 'Regions cut by lines and circles',
              prompt: `Prove that $n$ lines in general position cut the plane into $1+n(n+1)/2$ regions. Then find and solve the recurrence for the number of regions formed by $n$ circles, each two meeting in two points and no three through a point.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'variable-coefficients',
              title: 'Summation factors',
              prompt: `Solve $a_n=na_{n-1}+n!$ with $a_0=0$ by dividing by $n!$. Then solve the recurrence $D_n=nD_{n-1}+(-1)^n$ for derangements in the same way, and recover the inclusion-exclusion formula.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'master-theorem-lite',
              title: 'Divide and conquer',
              prompt: `Solve $T(n)=3T(n/2)+n$ for $n$ a power of $2$, with $T(1)=1$, exactly. Explain why the answer grows like $n^{\\log_23}$, and connect this with the running time of Karatsuba multiplication.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does every solution equal a particular solution plus a homogeneous one?',
              answerOutline: `The difference of two solutions satisfies the homogeneous recurrence, by linearity.`,
            },
            {
              question: 'What should you try for $a_n=3a_{n-1}+3^n$?',
              answerOutline: `$cn3^n$, since $3$ is a characteristic root.`,
            },
            {
              question: 'How many moves does the Tower of Hanoi take with $10$ discs?',
              answerOutline: `$2^{10}-1=1023$.`,
            },
          ],
        },
        {
          slug: 'recurrences-via-generating-functions',
          title: 'Solving recurrences with generating functions',
          summary:
            'Turning a recurrence into an equation for a series, solving it, and reading off coefficients by partial fractions.',
          estimatedMinutes: 150,
          objectives: [
            'Convert a recurrence with initial values into an equation for its generating function',
            'Extract coefficients by partial fractions',
            'Solve systems of recurrences',
            'Explain why the method always gives a rational function for linear recurrences',
          ],
          concepts: [
            'Generating function of a recurrence',
            'Rational generating functions',
            'Partial fractions',
            'Coefficient of $(1-rx)^{-m}$',
            'Systems of recurrences',
            'Transfer matrices',
          ],
          explanation: `Generating functions solve recurrences without guessing. The method has four steps. Multiply the recurrence by $x^n$, sum over the $n$ for which it holds, express each sum in terms of $A(x)=\\sum a_nx^n$, and solve for $A(x)$. Then extract coefficients.

**Worked example.** Solve $a_n=3a_{n-1}+2^n$ for $n\\ge 1$, with $a_0=1$. Summing over $n\\ge 1$,
$$\\sum_{n\\ge1}a_nx^n=3x\\sum_{n\\ge1}a_{n-1}x^{n-1}+\\sum_{n\\ge1}2^nx^n.$$
This says $A(x)-1=3xA(x)+\\frac{2x}{1-2x}$, so
$$A(x)=\\frac{1+\\frac{2x}{1-2x}}{1-3x}=\\frac1{(1-2x)(1-3x)}.$$
For partial fractions, write $\\frac1{(1-2x)(1-3x)}=\\frac P{1-2x}+\\frac Q{1-3x}$. Setting $x=1/2$ in $1=P(1-3x)+Q(1-2x)$ gives $P=-2$, and setting $x=1/3$ gives $Q=3$. So
$$a_n=3\\cdot 3^n-2\\cdot 2^n=3^{n+1}-2^{n+1},$$
which matches the previous lesson, with no guess needed.

**Why it always works.** For a linear recurrence with constant coefficients, the generating function is a rational function $P(x)/Q(x)$, where $Q(x)=1-c_1x-\\dots-c_kx^k$ is the reversed characteristic polynomial. Its roots are the reciprocals of the characteristic roots. Partial fractions and the expansion
$$\\frac1{(1-rx)^m}=\\sum_n\\binom{n+m-1}{m-1}r^nx^n$$
produce the same polynomial-times-exponential solutions as before, and they explain where the factors of $n$ come from with repeated roots. Conversely, every rational generating function satisfies a linear recurrence, which is a good test of whether a sequence can be "nice".

**Systems.** Many problems naturally give several interlocking sequences. Domino tilings of a $3\\times n$ strip are an example, as are strings avoiding a pattern, where you track the current state. Write one equation per sequence, solve the linear system for the generating functions, and you have the answer. This is the **transfer matrix** method: if a word is built letter by letter with allowed transitions between states given by a matrix $M$, the counts are entries of $M^n$, and the generating function is an entry of $(I-xM)^{-1}$.

**Beyond linear.** The method extends to some nonlinear recurrences. The Catalan recurrence gave a quadratic equation for $C(x)$. Recurrences with coefficients polynomial in $n$ give differential equations for the generating function. That is how the exponential generating function of derangements, $e^{-x}/(1-x)$, can be obtained from $D_n=(n-1)(D_{n-1}+D_{n-2})$.`,
          resources: [
            wilf('The opening chapter solves recurrences by generating functions, which is the book\'s central theme.'),
            morris('The part on enumeration uses generating functions to solve recurrence relations.'),
            { title: 'Analytic Combinatorics (Flajolet and Sedgewick)', url: 'https://ac.cs.princeton.edu/home/', type: 'textbook', cost: 'free', provider: 'Princeton University', note: 'The chapter on rational and meromorphic asymptotics shows how the roots of the denominator give growth rates.' },
          ],
          exercises: [
            {
              slug: 'fibonacci-gf',
              title: 'Fibonacci by generating function',
              prompt: `Use generating functions to derive Binet's formula $F_n=(\\phi^n-\\psi^n)/\\sqrt5$, where $\\phi$ and $\\psi$ are the roots of $r^2=r+1$. Use the generating function to prove $\\sum_{k=0}^nF_kF_{n-k}=\\frac{nL_n-F_n}{5}$, where $L_n=F_{n-1}+F_{n+1}$, after checking it numerically.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'gf-batch',
              title: 'A batch by generating functions',
              prompt: `Solve with generating functions: (a) $a_n=a_{n-1}+2a_{n-2}$, $a_0=2$, $a_1=1$; (b) $a_n=2a_{n-1}-a_{n-2}+1$, $a_0=a_1=0$. For (b), explain the factor $(1-x)^3$ in the denominator, and what it says about the growth of $a_n$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pattern-avoidance-system',
              title: 'A transfer matrix count',
              prompt: `Count binary strings of length $n$ that do not contain $011$, using states that record the relevant suffix. Write the transfer matrix, find the generating function, and solve. Check against brute force for $n\\le 16$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'derangement-differential',
              title: 'A differential equation',
              prompt: `From $D_n=(n-1)(D_{n-1}+D_{n-2})$, with $D_0=1$ and $D_1=0$, derive a first-order differential equation for $D(x)=\\sum D_nx^n/n!$. Solve it to get $e^{-x}/(1-x)$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What denominator does the generating function of $a_n=5a_{n-1}-6a_{n-2}$ have?',
              answerOutline: `$1-5x+6x^2=(1-2x)(1-3x)$.`,
            },
            {
              question: 'What is $[x^n](1-3x)^{-2}$?',
              answerOutline: `$(n+1)3^n$.`,
            },
            {
              question: 'Why does a linear recurrence with constant coefficients give a rational generating function?',
              answerOutline: `Multiplying $A(x)$ by $1-c_1x-\\dots-c_kx^k$ cancels all coefficients beyond the initial ones, leaving a polynomial.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'symmetry-and-designs',
      title: 'Symmetry and Designs',
      description:
        'Counting up to symmetry with Burnside and Polya, and the combinatorial designs, Latin squares and finite geometries that arise when structure is perfectly balanced.',
      lessons: [
        {
          slug: 'polya-counting',
          title: 'Burnside and Polya counting',
          summary:
            'Counting colourings up to symmetry, and keeping track of how many of each colour with the cycle index.',
          estimatedMinutes: 160,
          objectives: [
            'Apply Burnside\'s lemma to count orbits',
            'Compute the cycle index of a permutation group',
            'Apply Polya\'s theorem to count colourings by colour content',
            'Count graphs up to isomorphism with the cycle index',
          ],
          concepts: [
            'Group action on positions',
            'Burnside\'s lemma',
            'Cycle type',
            'Cycle index $Z(G)$',
            'Pattern inventory',
            'Polya enumeration theorem',
          ],
          explanation: `Let a finite group $G$ of permutations act on a set of positions, and so on the colourings of those positions. **Burnside's lemma** counts the colourings up to symmetry as the average number of colourings each group element fixes:
$$\\#\\text{orbits}=\\frac1{|G|}\\sum_{g\\in G}|\\operatorname{Fix}(g)|.$$
A colouring is fixed by $g$ exactly when it is constant on each cycle of $g$. So with $k$ colours, $|\\operatorname{Fix}(g)|=k^{c(g)}$, where $c(g)$ is the number of cycles of $g$, including fixed points. The proof double counts the pairs $(g,x)$ with $gx=x$.

**The cycle index.** To count by colour content, record the full cycle structure. If $g$ has $j_i$ cycles of length $i$, assign it the monomial $x_1^{j_1}x_2^{j_2}\\cdots$, and average:
$$Z(G)=\\frac1{|G|}\\sum_{g\\in G}x_1^{j_1(g)}x_2^{j_2(g)}\\cdots.$$
**Polya's theorem.** Substitute $x_i=r^i+b^i$ (for two colours red and blue, or the analogous sum for more colours). The coefficient of $r^sb^t$ is then the number of orbits of colourings with $s$ red and $t$ blue positions. The reason is that a cycle of length $i$ must be all red or all blue, contributing $r^i$ or $b^i$.

**Worked example.** Count necklaces of $6$ beads with $3$ black and $3$ white, first up to rotation. The rotation group $C_6$ has the identity, two rotations of order $6$ (one cycle of length $6$), two of order $3$ (two $3$-cycles), and one of order $2$ (three $2$-cycles). So
$$Z(C_6)=\\tfrac16\\bigl(x_1^6+x_2^3+2x_3^2+2x_6\\bigr).$$
We want the coefficient of $r^3b^3$ after substituting $x_i=r^i+b^i$. From $x_1^6$ it is $\\binom63=20$. From $x_2^3$ it is $0$, since every exponent would be even. From $x_3^2=(r^3+b^3)^2$ it is $2$, and there are two such terms. From $x_6$ it is $0$. The total is $(20+0+2\\cdot 2+0)/6=4$.

Up to rotations and reflections, the group is $D_6$, with $12$ elements. The $3$ reflections through opposite beads have type $x_1^2x_2^2$. For them, $(r+b)^2(r^2+b^2)^2$ has $r^3b^3$ coefficient $2\\cdot 2=4$, from $2rb$ times $2r^2b^2$. The $3$ reflections through opposite gaps have type $x_2^3$, contributing $0$. So the count is $(24+3\\cdot 4)/12=3$. The three bracelets are $BBBWWW$, $BBWBWW$ and $BWBWBW$, and the rotation count of $4$ splits $BBWBWW$ from its mirror image.

**Counting graphs.** Graphs on $n$ unlabelled vertices are $2$-colourings (edge or non-edge) of the $\\binom n2$ pairs, up to the action of $S_n$ on pairs. Computing the cycle index of $S_4$ acting on the $6$ pairs and substituting $x_i=1+y^i$ gives
$$1+y+2y^2+3y^3+2y^4+y^5+y^6,$$
which sums to $11$, the number of graphs on $4$ vertices, sorted by number of edges.`,
          resources: [
            bogart('The chapter on groups acting on sets develops Burnside and Polya-Redfield counting through guided problems.'),
            guichard('The chapter on Polya-Redfield counting covers Burnside, the cycle index and the theorem.'),
            { title: 'SymPy documentation: Combinatorics', url: 'https://docs.sympy.org/latest/modules/combinatorics/index.html', type: 'documentation', cost: 'free', provider: 'SymPy', note: 'Permutation groups let you compute cycle structures for checks.' },
          ],
          exercises: [
            {
              slug: 'cube-colourings',
              title: 'Colouring the cube',
              prompt: `Find the cycle index of the rotation group of the cube acting on its faces. Use Polya's theorem to count the face colourings with $2$ red and $4$ blue faces, and with $2$ red, $2$ blue and $2$ green faces. Confirm by brute force.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'graphs-on-four',
              title: 'Graphs on four vertices',
              prompt: `Compute the cycle index of $S_4$ acting on the $6$ unordered pairs of $\\{1,2,3,4\\}$, by finding the cycle type on pairs of each of the five types of permutation. Substitute to obtain the edge-count polynomial $1+y+2y^2+3y^3+2y^4+y^5+y^6$, and draw the $11$ graphs.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'necklaces-by-content',
              title: 'Necklaces by content',
              prompt: `Count the necklaces of $8$ beads under rotation with $4$ black and $4$ white beads, and the bracelets under the dihedral group. Then count necklaces of $7$ beads with $2$ red, $2$ blue and $3$ green beads under rotation, and explain why the answer is $\\frac17\\binom7{2,2,3}$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'polya-proof',
              title: 'Prove Polya\'s theorem',
              prompt: `Prove Polya's theorem from Burnside's lemma, by applying Burnside to the set of colourings with a fixed colour content, and computing the fixed colourings of $g$ by its cycles.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $|\\operatorname{Fix}(g)|=k^{c(g)}$?',
              answerOutline: `A fixed colouring is constant on each cycle of $g$, and each cycle may take any of the $k$ colours.`,
            },
            {
              question: 'What is the cycle index of the cyclic group of order $3$ acting on $3$ positions?',
              answerOutline: `$\\tfrac13(x_1^3+2x_3)$.`,
            },
            {
              question: 'How many binary necklaces of length $6$ are there up to rotation?',
              answerOutline: `$(2^6+2^3+2\\cdot 2^2+2\\cdot 2)/6=84/6=14$, from the identity, the half turn, the two rotations of order $3$ and the two of order $6$.`,
            },
          ],
        },
        {
          slug: 'block-designs',
          title: 'Block designs',
          summary:
            'Balanced incomplete block designs, their parameter conditions, Fisher\'s inequality and Steiner triple systems.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the parameter relations $bk=vr$ and $r(k-1)=\\lambda(v-1)$',
            'Prove Fisher\'s inequality',
            'Construct designs from difference sets',
            'State when Steiner triple systems exist, and construct small ones',
          ],
          concepts: [
            'Balanced incomplete block design $(v,b,r,k,\\lambda)$',
            'Incidence matrix',
            'Parameter conditions',
            'Fisher\'s inequality',
            'Symmetric design',
            'Difference set',
            'Steiner triple system',
          ],
          explanation: `A **balanced incomplete block design** with parameters $(v,k,\\lambda)$ is a collection of $k$-element subsets (**blocks**) of a $v$-element set of points, with $2\\le k<v$, such that every pair of distinct points lies in exactly $\\lambda$ blocks. Designs began in the planning of agricultural experiments, where each block is a set of treatments tested together, and every pair of treatments must be compared equally often.

**Parameter relations.** Each point lies in the same number $r$ of blocks. Fix a point $p$ and count pairs $(q,B)$ with $q\\ne p$ and $p,q\\in B$. There are $v-1$ choices of $q$, each in $\\lambda$ blocks with $p$, and there are $r$ blocks through $p$, each containing $k-1$ other points. So $r(k-1)=\\lambda(v-1)$. Counting incident point-block pairs gives $bk=vr$, where $b$ is the number of blocks. So $r$ and $b$ are determined by $v,k,\\lambda$, and both must be integers. This rules out many parameter sets.

**Fisher's inequality.** Every design has $b\\ge v$. Let $N$ be the $v\\times b$ incidence matrix. Then $NN^{\\mathsf T}=(r-\\lambda)I+\\lambda J$, and since $r>\\lambda$ (because $k<v$), this matrix is invertible: its eigenvalues are $r-\\lambda$ and $r-\\lambda+\\lambda v$. So $N$ has rank $v$, which needs $b\\ge v$ columns. A design with $b=v$ is called **symmetric**.

**Difference sets.** A $k$-subset $D$ of $\\mathbb{Z}_v$ is a $(v,k,\\lambda)$ **difference set** if every nonzero residue occurs exactly $\\lambda$ times as a difference $d-d'$ of elements of $D$. Then the translates $D+i$, for $i\\in\\mathbb{Z}_v$, are the blocks of a symmetric design.

**Worked example: the Fano plane.** Take $D=\\{1,2,4\\}\\subset\\mathbb{Z}_7$. Its six differences are $\\pm1$ (from $2-1$), $\\pm2$ (from $4-2$) and $\\pm3$ (from $4-1$). Modulo $7$ these are $1,6,2,5,3,4$, each nonzero residue exactly once. So $D$ is a $(7,3,1)$ difference set, and its translates
$$\\{1,2,4\\},\\{2,3,5\\},\\{3,4,6\\},\\{4,5,0\\},\\{5,6,1\\},\\{6,0,2\\},\\{0,1,3\\}$$
form a design with $v=b=7$, $k=r=3$ and $\\lambda=1$. Check the relations: $r(k-1)=3\\cdot 2=6=1\\cdot(7-1)$, and $bk=21=vr$. This design is the **Fano plane**, the smallest projective plane, and it returns in the last lesson of this module.

**Steiner triple systems.** A design with $k=3$ and $\\lambda=1$ is a **Steiner triple system**. The relations give $r=(v-1)/2$ and $b=v(v-1)/6$, so we need $v\\equiv 1$ or $3\\pmod 6$. Kirkman proved in 1847 that this condition is also sufficient. The smallest examples are $v=7$ (Fano) and $v=9$, which are the lines of the affine plane over $\\mathbb{F}_3$. A famous refinement is Kirkman's schoolgirl problem: arrange $15$ girls in triples on $7$ days so that each pair walks together exactly once, with the triples on each day covering everyone.`,
          resources: [
            morris('The part on design theory covers block designs and Steiner triple systems.'),
            trotter('The chapter on combinatorial applications of finite fields discusses Latin squares and projective planes.'),
            guichard('The chapter on systems of distinct representatives includes Latin squares, a first example of balanced structure.'),
          ],
          exercises: [
            {
              slug: 'parameter-checks',
              title: 'Parameter checks',
              prompt: `Prove the relations $r(k-1)=\\lambda(v-1)$ and $bk=vr$. For each of $(v,k,\\lambda)=(8,3,1)$, $(9,3,1)$, $(16,6,2)$, $(11,5,2)$ and $(22,7,2)$, find $r$ and $b$, or show that no design exists by these conditions or by Fisher's inequality. Passing these tests does not guarantee existence: one of the five parameter sets passes both, yet no such design exists, by the Bruck-Ryser-Chowla theorem. Look up that theorem and say which set it is.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'fisher-proof',
              title: 'Fisher\'s inequality',
              prompt: `Prove $NN^{\\mathsf T}=(r-\\lambda)I+\\lambda J$ for the incidence matrix of a design. Find the eigenvalues of this matrix, prove that it is invertible, and conclude $b\\ge v$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'difference-sets',
              title: 'Difference sets',
              prompt: `Verify that $\\{0,1,3,9\\}$ is a $(13,4,1)$ difference set and that $\\{1,3,4,5,9\\}$, the squares modulo $11$, is an $(11,5,2)$ difference set. For each, list the blocks and check the design property by computer.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'steiner-nine',
              title: 'A Steiner triple system on nine points',
              prompt: `Take the points of $\\mathbb{Z}_3\\times\\mathbb{Z}_3$, and as blocks the lines $\\{(x,y):ax+by=c\\}$ with $(a,b)\\ne(0,0)$, counted once each. Show that this gives a Steiner triple system on $9$ points with $12$ blocks, which splits into $4$ classes of $3$ disjoint blocks.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are $r$ and $b$ for a Steiner triple system on $15$ points?',
              answerOutline: `$r=7$ and $b=35$.`,
            },
            {
              question: 'Why must $v\\equiv 1$ or $3\\pmod 6$ for a Steiner triple system?',
              answerOutline: `$r=(v-1)/2$ and $b=v(v-1)/6$ must be integers.`,
            },
            {
              question: 'What does Fisher\'s inequality say?',
              answerOutline: `A balanced incomplete block design has at least as many blocks as points.`,
            },
          ],
        },
        {
          slug: 'latin-squares',
          title: 'Latin squares',
          summary:
            'Latin squares, orthogonality, constructions from finite fields, and Euler\'s problem of the $36$ officers.',
          estimatedMinutes: 140,
          objectives: [
            'Define Latin squares and orthogonal Latin squares',
            'Prove that there are at most $n-1$ mutually orthogonal Latin squares of order $n$',
            'Construct $q-1$ mutually orthogonal Latin squares from a field with $q$ elements',
            'Describe the history and resolution of Euler\'s conjecture',
          ],
          concepts: [
            'Latin square',
            'Reduced Latin square',
            'Orthogonality',
            'Mutually orthogonal Latin squares',
            'Construction from $\\mathbb{F}_q$',
            'Euler\'s $36$ officers problem',
          ],
          explanation: `A **Latin square** of order $n$ is an $n\\times n$ array of $n$ symbols in which each symbol appears once in every row and every column. The multiplication table of any group is one. Every partial Latin rectangle with fewer than $n$ rows can be completed, by Hall's theorem, so Latin squares exist in great numbers: $576$ of order $4$, and the count grows faster than exponentially.

Two Latin squares $L$ and $M$ of order $n$ are **orthogonal** if the $n^2$ pairs $(L_{ij},M_{ij})$ are all different. A set of squares, each two orthogonal, is a set of **mutually orthogonal Latin squares** (MOLS).

**At most $n-1$.** Relabelling the symbols of a square does not affect orthogonality, so make every square in the set have first row $1,2,\\dots,n$. Now look at position $(2,1)$. Its entry in each square is not $1$, because $1$ is already in the first column. And two squares cannot share that entry $s$, because the pair $(s,s)$ already occurs in the first row, in column $s$. So the squares have different entries from $\\{2,\\dots,n\\}$ there, and there are at most $n-1$ of them.

**Construction from a field.** Let $q$ be a prime power and $\\mathbb{F}_q$ the field with $q$ elements. For each nonzero $a\\in\\mathbb{F}_q$, define $L_a(x,y)=ax+y$, with rows and columns indexed by the field. Each $L_a$ is Latin: fixing $x$, the map $y\\mapsto ax+y$ is a bijection, and fixing $y$, so is $x\\mapsto ax+y$ since $a\\ne 0$. For $a\\ne b$, the pair $(ax+y,bx+y)$ determines $(x,y)$, because subtracting gives $(a-b)x$, which determines $x$. So we get $q-1$ MOLS, the maximum.

**Worked example.** For $q=3$, take $\\mathbb{F}_3=\\{0,1,2\\}$ with $L_1=x+y$ and $L_2=2x+y$:
$$L_1=\\begin{pmatrix}0&1&2\\\\1&2&0\\\\2&0&1\\end{pmatrix},\\qquad L_2=\\begin{pmatrix}0&1&2\\\\2&0&1\\\\1&2&0\\end{pmatrix}.$$
Superimposing them gives the pairs $00,11,22,12,20,01,21,02,10$. All nine are distinct, so the squares are orthogonal. For $q=4$ the construction needs $\\mathbb{F}_4$, not $\\mathbb{Z}_4$, and it gives $3$ MOLS of order $4$. With $\\mathbb{Z}_4$, the map $x\\mapsto 2x+y$ is not a bijection, so $L_2$ would not even be Latin.

**Euler's officers.** Euler asked whether $36$ officers, of $6$ ranks and $6$ regiments, can stand in a $6\\times 6$ square so that each row and column has one of each rank and each regiment. That asks for two orthogonal Latin squares of order $6$. Euler conjectured that none exist when $n\\equiv 2\\pmod 4$. Tarry confirmed in 1900, by exhaustive search, that there is no pair for $n=6$. But in 1959-60 Bose, Shrikhande and Parker showed that a pair exists for every $n$ except $2$ and $6$, disproving the rest of Euler's conjecture. Parker found a pair of order $10$ partly by computer.

Orthogonal Latin squares are used in experimental design, where they let two nuisance factors, such as rows and columns of a field, be balanced at once, and in coding theory.`,
          resources: [
            trotter('The chapter on applications of finite fields constructs MOLS and connects them to designs.'),
            morris('The part on design theory treats Latin squares and orthogonality.'),
            oeis('Look up the number of Latin squares of order $n$ to see how fast it grows.'),
          ],
          exercises: [
            {
              slug: 'count-small-latin',
              title: 'Small Latin squares',
              prompt: `Find all reduced Latin squares of order $4$, with first row and first column $1,2,3,4$. There are $4$. Deduce that there are $576$ Latin squares of order $4$, explaining the factor $4!\\cdot 3!$. Confirm by brute force.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mols-bound',
              title: 'At most n minus one',
              prompt: `Write out the proof that there are at most $n-1$ MOLS of order $n$. Then verify that the field construction for $q=5$ gives $4$ MOLS by computer, checking every pair.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'mols-order-four',
              title: 'Three MOLS of order four',
              prompt: `Construct $\\mathbb{F}_4$ as $\\mathbb{F}_2[\\omega]/(\\omega^2+\\omega+1)$, and write out the three squares $L_a(x,y)=ax+y$. Check their orthogonality. Explain why the same formula over $\\mathbb{Z}_4$ fails.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'product-construction',
              title: 'The product construction',
              prompt: `Prove that if there are $m$ MOLS of order $a$ and $m$ MOLS of order $b$, then there are $m$ MOLS of order $ab$, by taking the Kronecker product of squares. Deduce that a pair of orthogonal Latin squares exists for every $n\\not\\equiv 2\\pmod 4$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Factor n as a product of prime powers. If n is not 2 mod 4, every prime power factor is at least 3.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the most MOLS of order $7$, and how is it achieved?',
              answerOutline: `$6$, from $L_a(x,y)=ax+y$ over $\\mathbb{F}_7$ for $a=1,\\dots,6$.`,
            },
            {
              question: 'Is there a pair of orthogonal Latin squares of order $2$?',
              answerOutline: `No. The two Latin squares of order $2$ are not orthogonal.`,
            },
            {
              question: 'For which orders is there no pair of orthogonal Latin squares?',
              answerOutline: `Only $2$ and $6$.`,
            },
          ],
        },
        {
          slug: 'finite-geometries',
          title: 'Finite projective planes',
          summary:
            'Geometries with finitely many points, their construction from finite fields, and their equivalence with complete sets of Latin squares.',
          estimatedMinutes: 150,
          objectives: [
            'State the axioms of a projective plane and derive its parameters',
            'Construct the projective plane over $\\mathbb{F}_q$',
            'Explain the equivalence between affine planes of order $n$ and $n-1$ MOLS',
            'State the Bruck-Ryser theorem and the status of the order $10$ problem',
          ],
          concepts: [
            'Projective plane',
            'Order of a projective plane',
            'Affine plane',
            'Projective plane over $\\mathbb{F}_q$',
            'Duality',
            'Bruck-Ryser theorem',
            'Prime power conjecture',
          ],
          explanation: `A **projective plane** is a set of points and a collection of subsets called lines such that any two points lie on exactly one line, any two lines meet in exactly one point, and there are four points with no three on a line. The last axiom rules out degenerate cases.

**Parameters.** In a finite projective plane, all lines have the same number $n+1$ of points, and every point is on $n+1$ lines. The number $n$ is the **order**. Counting the points on the lines through a fixed point $p$ gives $1+(n+1)n=n^2+n+1$ points in all, and by duality the same number of lines. As a design, a projective plane of order $n$ is a symmetric $(n^2+n+1,\\,n+1,\\,1)$ design.

**Construction from a field.** Let $q$ be a prime power. The points of $PG(2,q)$ are the $1$-dimensional subspaces of $\\mathbb{F}_q^3$, and the lines are the $2$-dimensional subspaces. Two distinct $1$-dimensional subspaces span exactly one $2$-dimensional subspace, and two distinct $2$-dimensional subspaces meet in exactly one $1$-dimensional subspace, since $2+2-3=1$. The number of points is $(q^3-1)/(q-1)=q^2+q+1$, so this is a projective plane of order $q$.

**Worked example: $q=2$.** The nonzero vectors of $\\mathbb{F}_2^3$ are $7$, and each spans its own line, so there are $7$ points. A $2$-dimensional subspace has $3$ nonzero vectors, and they always sum to zero. So the lines are the triples $\\{u,v,u+v\\}$. Label the points by the binary numbers $1$ to $7$. The lines are then the triples whose bitwise XOR is zero:
$$\\{1,2,3\\},\\{1,4,5\\},\\{1,6,7\\},\\{2,4,6\\},\\{2,5,7\\},\\{3,4,7\\},\\{3,5,6\\}.$$
There are $7$ lines of $3$ points each, and each pair of points, say $3$ and $5$, determines one line, here $\\{3,5,6\\}$, since $3\\oplus 5=6$. This is the Fano plane again, isomorphic to the difference set construction of the block designs lesson.

**Affine planes and Latin squares.** Deleting one line and its points from a projective plane of order $n$ gives an **affine plane**, with $n^2$ points, in which lines fall into $n+1$ parallel classes. Conversely, an affine plane can be completed by adding a point at infinity for each class. An affine plane of order $n$ is equivalent to a set of $n-1$ MOLS of order $n$. Two parallel classes index rows and columns, and each further class gives a Latin square, whose symbol in position $(i,j)$ is the line of that class through the point $(i,j)$.

**Which orders occur?** Projective planes exist for every prime power order. No plane of any other order is known, and the **prime power conjecture** says there is none. The **Bruck-Ryser theorem** says that if $n\\equiv 1$ or $2\\pmod 4$ and a plane of order $n$ exists, then $n$ is a sum of two squares. This rules out $6$ and $14$, among others. Order $10$ passes this test, as $10=1+9$. Lam and coauthors showed in 1989, by a massive computer search, that no plane of order $10$ exists. Order $12$ is open.`,
          resources: [
            trotter('The chapter on applications of finite fields constructs projective planes and relates them to Latin squares.'),
            morris('The part on design theory relates Latin squares, designs and finite planes.'),
            { title: 'MIT 18.212 Algebraic Combinatorics', url: 'https://ocw.mit.edu/courses/18-212-algebraic-combinatorics-spring-2019/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'For background on the linear algebra methods used in combinatorics.' },
          ],
          exercises: [
            {
              slug: 'plane-parameters',
              title: 'Parameters of a projective plane',
              prompt: `From the axioms, prove that all lines of a finite projective plane have the same number of points, that this equals the number of lines through each point, and that there are $n^2+n+1$ points. Show that the dual of a projective plane is a projective plane.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pg-two-three',
              title: 'The plane of order three',
              prompt: `Construct $PG(2,3)$ by computer, listing its $13$ points as normalised vectors and its $13$ lines. Check the axioms. Show that it is isomorphic to the design from the $(13,4,1)$ difference set $\\{0,1,3,9\\}$.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'affine-from-mols',
              title: 'Affine planes and MOLS',
              prompt: `Using the two MOLS of order $3$ from the previous lesson, construct an affine plane of order $3$: $9$ points and $12$ lines in $4$ parallel classes. Then complete it to a projective plane of order $3$ by adding points at infinity, and check the axioms.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'bruck-ryser-check',
              title: 'Applying Bruck-Ryser',
              prompt: `For each $n\\le 30$, decide whether a projective plane of order $n$ is known to exist, is ruled out by the Bruck-Ryser theorem, or is open. Which $n$ in this range are not prime powers and not ruled out?`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How many points and lines has a projective plane of order $4$?',
              answerOutline: `$21$ of each, with $5$ points on each line.`,
            },
            {
              question: 'What is an affine plane of order $n$ equivalent to?',
              answerOutline: `A set of $n-1$ mutually orthogonal Latin squares of order $n$.`,
            },
            {
              question: 'Why does $PG(2,q)$ satisfy the axiom that two lines meet in a point?',
              answerOutline: `Two distinct $2$-dimensional subspaces of a $3$-dimensional space meet in a $1$-dimensional subspace.`,
            },
          ],
        },
      ],
      project: {
        slug: 'design-builder',
        title: 'Design builder',
        description: `Build and verify combinatorial designs by computer. Implement finite fields of prime order, and of order $4$, $8$ and $9$ as polynomial quotients. Use them to build complete sets of MOLS, affine and projective planes, and designs from difference sets. Write an independent checker for each kind of object that tests its definition directly. Then search for a difference set with given parameters by backtracking, and implement a Polya counter that, given generators of a permutation group, returns the pattern inventory of colourings.`,
        deliverables: [
          'Finite field arithmetic for orders $2,3,4,5,7,8,9$, with tests',
          'Complete sets of MOLS for each of those orders, verified by the checker',
          'Projective planes of orders $2$, $3$, $4$ and $5$, checked against the axioms and the counts $n^2+n+1$',
          'A difference set search that finds a $(13,4,1)$ and a $(21,5,1)$ difference set',
          'A Polya counter that reproduces the counts from the lessons, including the edge-count polynomial of graphs on $4$ vertices',
        ],
        estimatedHours: 8,
        stretchGoals: ['Search for a Steiner triple system on $15$ points and solve Kirkman\'s schoolgirl problem'],
      },
    },
    {
      slug: 'ramsey-and-probabilistic-method',
      title: 'Ramsey Theory and the Probabilistic Method',
      description:
        'Ramsey\'s theorem for hypergraphs and its arithmetic relatives, and how random constructions prove that objects exist.',
      lessons: [
        {
          slug: 'ramsey-theorem',
          title: 'Ramsey\'s theorem and its relatives',
          summary:
            'The general Ramsey theorem, Schur\'s theorem, van der Waerden\'s theorem, and the happy ending problem.',
          estimatedMinutes: 160,
          objectives: [
            'State and prove Ramsey\'s theorem for colourings of $k$-sets',
            'Prove Schur\'s theorem from Ramsey\'s theorem',
            'State van der Waerden\'s theorem and compute small cases',
            'Apply Ramsey\'s theorem to points in convex position',
          ],
          concepts: [
            'Ramsey number',
            'Colourings of $k$-subsets',
            'Infinite Ramsey theorem',
            'Schur numbers',
            'Van der Waerden numbers',
            'Erdos-Szekeres happy ending problem',
          ],
          explanation: `**Ramsey's theorem.** For all positive integers $k$, $r$ and $m$ there is an $N$ such that whenever the $k$-element subsets of an $N$-set are coloured with $r$ colours, there is an $m$-element subset all of whose $k$-subsets have the same colour. For $k=2$ this is the graph version: every $r$-colouring of the edges of a large enough complete graph has a monochromatic $K_m$. The graph theory course proves $R(3,3)=6$ and the bounds for $k=2$, and the same proof idea extends by induction on $k$. Pick a point, colour each $(k-1)$-set of the others by the colour of its union with that point, and apply the theorem for $k-1$ to find a large set where that colour is constant.

There is also an infinite version. If the $k$-subsets of an infinite set are finitely coloured, there is an infinite set with all its $k$-subsets of one colour.

**Schur's theorem.** For every $r$ there is an $S$ such that every $r$-colouring of $\\{1,\\dots,S\\}$ has $x,y,z$ of one colour with $x+y=z$ (and $x=y$ allowed). Derive it from Ramsey: given a colouring $c$ of $\\{1,\\dots,N\\}$, colour the edge $ij$ of $K_{N+1}$ by $c(|i-j|)$. A monochromatic triangle $i<j<l$ gives $x=j-i$, $y=l-j$ and $z=l-i$, all of one colour, with $x+y=z$.

**Worked example: the Schur number $S(2)$.** What is the largest $n$ such that $\\{1,\\dots,n\\}$ can be $2$-coloured with no monochromatic solution of $x+y=z$? For $n=4$, use red $\\{1,4\\}$ and blue $\\{2,3\\}$. The red sums are $1+1=2$, $1+4=5$, $4+4=8$, none of which is red. The blue sums are $2+2=4$, $2+3=5$, $3+3=6$, none of which is blue. For $n=5$, suppose $1$ is red. Then $2=1+1$ must be blue, and so $4=2+2$ must be red. Then $3=4-1$ must be blue, as $1+3=4$. But now $5$ is neither: $5=1+4$ rules out red, and $5=2+3$ rules out blue. So the answer is $4$. With three colours the answer is $13$.

**Van der Waerden's theorem.** For all $r$ and $k$ there is a $W(r,k)$ such that every $r$-colouring of $\\{1,\\dots,W\\}$ contains a monochromatic arithmetic progression of length $k$. For example, $W(2,3)=9$: there is a $2$-colouring of $\\{1,\\dots,8\\}$ with no monochromatic $3$-term progression, such as $RRBBRRBB$, and none of $\\{1,\\dots,9\\}$. The known bounds on these numbers are enormous, and finding good bounds is a deep problem.

**The happy ending problem.** Erdos and Szekeres showed that for each $m$, any large enough set of points in the plane, no three collinear, contains $m$ points in convex position. Among any $5$ such points, $4$ are in convex position. Colour each triple of points by whether it contains a further point inside, and Ramsey's theorem for $k=3$ gives a proof, with poor bounds. The truth for $m=5$ is $9$ points, and the conjectured general value is $2^{m-2}+1$.`,
          resources: [
            trotter('Treats Ramsey numbers, including the probabilistic lower bound.'),
            { title: 'Small Ramsey Numbers (Radziszowski)', url: 'https://www.combinatorics.org/ojs/index.php/eljc/article/view/DS1', type: 'article', cost: 'free', provider: 'Electronic Journal of Combinatorics', note: 'The survey includes Schur and van der Waerden numbers as well as graph Ramsey numbers.' },
            guichard('The section on the pigeonhole principle is the starting point for Ramsey arguments.'),
          ],
          exercises: [
            {
              slug: 'hypergraph-ramsey-proof',
              title: 'Ramsey for k-sets',
              prompt: `Prove Ramsey's theorem for colourings of $k$-subsets by induction on $k$, for two colours. Write the argument so that it gives an explicit, if huge, bound.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'schur-from-ramsey',
              title: 'Schur from Ramsey',
              prompt: `Prove Schur's theorem from the multicolour Ramsey theorem for triangles, and deduce $S(r)\\le R_r(3)-1$. Find by computer a $3$-colouring of $\\{1,\\dots,13\\}$ with no monochromatic solution of $x+y=z$, and confirm that none exists for $\\{1,\\dots,14\\}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'van-der-waerden-small',
              title: 'Van der Waerden for small cases',
              prompt: `Prove by hand that every $2$-colouring of $\\{1,\\dots,9\\}$ has a monochromatic $3$-term arithmetic progression, and check that $RRBBRRBB$ avoids one on $\\{1,\\dots,8\\}$. Find by computer how many colourings of $\\{1,\\dots,8\\}$ avoid one.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'convex-position',
              title: 'Four points in convex position',
              prompt: `Prove that among any $5$ points in the plane, no three collinear, some $4$ form a convex quadrilateral. Show by an example that $4$ points are not enough to guarantee this.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Look at the convex hull of the five points. It has 5, 4 or 3 vertices.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does Ramsey\'s theorem say for $k=1$?',
              answerOutline: `It is the pigeonhole principle: an $r$-colouring of a large enough set has $m$ elements of one colour.`,
            },
            {
              question: 'What is the Schur number $S(2)$?',
              answerOutline: `$4$. For example, colour $\\{1,4\\}$ red and $\\{2,3\\}$ blue.`,
            },
            {
              question: 'How does Schur\'s theorem follow from Ramsey\'s?',
              answerOutline: `Colour edge $ij$ by the colour of $|i-j|$. A monochromatic triangle gives $x+y=z$ in one colour.`,
            },
          ],
        },
        {
          slug: 'probabilistic-method',
          title: 'The probabilistic method',
          summary:
            'Proving that an object exists by showing that a random one works with positive probability.',
          estimatedMinutes: 160,
          objectives: [
            'Use the union bound to prove existence',
            'Use linearity of expectation to prove that some outcome is at least the average',
            'Prove Erdos\'s lower bound for Ramsey numbers',
            'Apply the method to cuts, hypergraph colouring and tournaments',
          ],
          concepts: [
            'Probability space on combinatorial objects',
            'Union bound',
            'Linearity of expectation',
            'Erdos lower bound for $R(k,k)$',
            'Property B',
            'Large cuts',
            'Tournaments',
          ],
          explanation: `To show that some object has a property, choose an object at random and show that it has the property with positive probability. Then at least one object has it. The method gives existence without construction, and for many problems nobody knows how to construct an object that is anywhere near as good.

**The union bound.** If bad events $B_1,\\dots,B_m$ have $\\sum\\Pr(B_i)<1$, then with positive probability none occurs.

**Worked example: Ramsey lower bound.** Colour each edge of $K_n$ red or blue independently with probability $\\frac12$. A fixed set of $k$ vertices is monochromatic with probability $2\\cdot 2^{-\\binom k2}$. By the union bound,
$$\\Pr(\\text{some monochromatic }K_k)\\le\\binom nk2^{1-\\binom k2}.$$
If this is less than $1$, some colouring has no monochromatic $K_k$, and $R(k,k)>n$. For $n=\\lfloor 2^{k/2}\\rfloor$ and $k\\ge 3$, use $\\binom nk\\le n^k/k!\\le 2^{k^2/2}/k!$. Then the bound is at most $2^{1+k/2}/k!$, which is less than $1$ for $k\\ge 3$. So $R(k,k)>2^{k/2}$. Take $k=10$: then $n=32$, and $\\binom{32}{10}2^{-44}\\approx 3.7\\times 10^{-6}$. So most colourings of $K_{32}$ have no monochromatic $K_{10}$, though no one can write one down explicitly.

**Linearity of expectation.** If a random variable has expectation $\\mu$, then some outcome has value at least $\\mu$ and some at most $\\mu$. Expectation is linear even for dependent variables, which makes it easy to compute.

**Cuts.** Every graph with $m$ edges has a bipartition of its vertices that cuts at least $m/2$ edges. Put each vertex on a random side. Each edge is cut with probability $\\frac12$, so the expected number of cut edges is $m/2$.

**Property B.** A family of $k$-element sets has property B if some $2$-colouring of the ground set leaves no set monochromatic. Every family of fewer than $2^{k-1}$ sets has it: under a random colouring, each set is monochromatic with probability $2^{1-k}$, and the union bound applies.

**Tournaments.** A tournament gives each edge of $K_n$ a direction, interpreted as the winner of a game. Choose a random tournament. A fixed ordering of the $n$ players is a Hamiltonian path with probability $2^{-(n-1)}$, so the expected number of Hamiltonian paths is $n!/2^{n-1}$, and some tournament has at least that many. Szele's result was the first application of the probabilistic method. In the same way, for each $k$ there are tournaments in which every set of $k$ players is beaten by some other player.

The method extends far beyond these examples. The next lesson modifies random objects to remove their few defects, which already gives much better results.`,
          resources: [
            zhaoPm('Read the chapters on the basic method and on linearity of expectation.'),
            { title: 'MIT 18.226 Probabilistic Methods in Combinatorics', url: 'https://ocw.mit.edu/courses/18-226-probabilistic-methods-in-combinatorics-fall-2022/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture videos and notes for a full course on this method.' },
            trotter('The chapters on probability and on applying probability to combinatorics give a gentler introduction.'),
          ],
          exercises: [
            {
              slug: 'ramsey-bound-details',
              title: 'The Ramsey bound in detail',
              prompt: `Prove that $\\binom nk2^{1-\\binom k2}<1$ when $n=\\lfloor 2^{k/2}\\rfloor$ and $k\\ge 3$. Compute the exact largest $n$ for which the bound gives $R(k,k)>n$ when $k=4,5,6$, and compare with the known values and bounds.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'property-b',
              title: 'Property B',
              prompt: `Prove that every family of fewer than $2^{k-1}$ sets of size $k$ has property B. Show that the $7$ lines of the Fano plane do not have property B, so the bound is sharp for $k=3$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'large-cut',
              title: 'Large cuts',
              prompt: `Prove that every graph with $m$ edges has a bipartition cutting at least $m/2$ edges. Improve this to $\\frac{m}2\\cdot\\frac n{n-1}$ for even $n$, by choosing a random balanced bipartition. Check that $K_4$ attains this bound.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sum-free-subsets',
              title: 'Sum-free subsets',
              prompt: `Prove that every set $A$ of $n$ nonzero integers contains a sum-free subset of size more than $n/3$. Choose a prime $p=3k+2$ larger than all $|a|$, and a random multiplier $x$ in $\\{1,\\dots,p-1\\}$, and look at the $a$ with $xa\\bmod p$ in the middle third.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The middle third, from k+1 to 2k+1, is sum-free modulo p. Each a lands there with probability more than 1/3.',
            },
            {
              slug: 'tournament-paths',
              title: 'Tournaments with many Hamiltonian paths',
              prompt: `Show that some tournament on $n$ players has at least $n!/2^{n-1}$ Hamiltonian paths. Check by computing the average over all tournaments for $n\\le 5$, and compare with the maximum over tournaments, found by brute force.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the logic of the probabilistic method?',
              answerOutline: `If a random object has a property with positive probability, then some object has it.`,
            },
            {
              question: 'Why can a random variable not always be below its expectation?',
              answerOutline: `Then its expectation would be below itself. Some outcome is at least the mean.`,
            },
            {
              question: 'What lower bound does the method give for $R(k,k)$?',
              answerOutline: `$R(k,k)>2^{k/2}$ for $k\\ge 3$.`,
            },
          ],
        },
        {
          slug: 'alterations-and-independent-sets',
          title: 'Alterations and independent sets',
          summary:
            'Improving random constructions by deleting what goes wrong, and bounds on independent sets.',
          estimatedMinutes: 150,
          objectives: [
            'Use the deletion method to improve existence bounds',
            'Prove the Caro-Wei bound on independent sets with a random ordering',
            'Derive Turan\'s theorem from the Caro-Wei bound',
            'Outline the existence of graphs with large girth and large chromatic number',
          ],
          concepts: [
            'Deletion (alteration) method',
            'Random ordering',
            'Caro-Wei inequality',
            'Turan\'s theorem',
            'Dominating sets',
            'Girth and chromatic number',
          ],
          explanation: `A random object usually has a few defects. The **deletion method** chooses a random object, and then removes one element from each defect. If the expected number of defects is small compared with the size, the result is large and defect-free.

**Ramsey again.** Colour $K_n$ randomly. The expected number of monochromatic $K_k$ is $\\binom nk2^{1-\\binom k2}$. So some colouring has at most that many. Delete a vertex from each, and you have a colouring of $K_m$ with no monochromatic $K_k$, where
$$m\\ge n-\\binom nk2^{1-\\binom k2}.$$
Optimising over $n$ improves the earlier bound by a factor of about $\\sqrt2$.

**Independent sets.** For a graph $G$, the **Caro-Wei** inequality says
$$\\alpha(G)\\ge\\sum_v\\frac1{d(v)+1}.$$
Choose a uniformly random ordering of the vertices, and let $I$ be the set of vertices that come before all their neighbours. Then $I$ is independent, since of two adjacent vertices only the earlier one can be in $I$. A vertex $v$ is in $I$ when it comes first among the $d(v)+1$ vertices of $v$ and its neighbours, which has probability $1/(d(v)+1)$. By linearity, $\\mathbb{E}|I|=\\sum_v1/(d(v)+1)$, and some ordering does at least that well.

**Worked example.** Take the path $P_5$, with degrees $1,2,2,2,1$. Caro-Wei gives $\\alpha\\ge\\frac12+\\frac13+\\frac13+\\frac13+\\frac12=2$, and in fact $\\alpha(P_5)=3$, so the bound is not tight here. For $C_5$ it gives $5/3$, so $\\alpha\\ge 2$, which is exact. For a disjoint union of cliques the bound is exact: on $K_a$, each vertex contributes $1/a$, and the clique contributes $1$.

**Turan from Caro-Wei.** By convexity of $1/(x+1)$, the bound gives $\\alpha(G)\\ge n/(\\bar d+1)$, where $\\bar d=2m/n$ is the average degree. Apply this to the complement of a $K_{r+1}$-free graph $H$. The complement has independence number at most $r$, since an independent set in the complement is a clique in $H$. Rearranging gives that $H$ has at most $\\bigl(1-\\frac1r\\bigr)\\frac{n^2}2$ edges, which is Turan's theorem in its asymptotic form.

**Dominating sets.** A dominating set meets every closed neighbourhood. If $\\delta\\ge 1$, then $G$ has a dominating set of size at most $\\frac{1+\\ln(\\delta+1)}{\\delta+1}n$. Pick each vertex with probability $p$, then add every vertex that is not yet dominated. The expected size is at most $np+n(1-p)^{\\delta+1}\\le np+ne^{-p(\\delta+1)}$. Choosing $p=\\ln(\\delta+1)/(\\delta+1)$ gives the bound.

**Girth and chromatic number.** Erdos used deletion to prove that for all $g$ and $k$ there are graphs with girth greater than $g$ and chromatic number greater than $k$. Take a random graph with edge probability $n^{\\theta-1}$ for small $\\theta>0$. It has few short cycles, and a small independence number. Delete a vertex from each short cycle. Local sparsity does not imply that few colours suffice, which shows that colouring is a global property.`,
          resources: [
            zhaoPm('Read the chapter on alterations, including the Ramsey and girth applications.'),
            { title: 'MIT 18.226 Probabilistic Methods in Combinatorics', url: 'https://ocw.mit.edu/courses/18-226-probabilistic-methods-in-combinatorics-fall-2022/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'The lectures on alterations and the second moment method extend this lesson.' },
            guichard('The graph theory chapters supply background on independence and colouring.'),
          ],
          exercises: [
            {
              slug: 'caro-wei-proof',
              title: 'The Caro-Wei inequality',
              prompt: `Write the proof of the Caro-Wei inequality in full. Evaluate the bound for $C_n$, the Petersen graph and $K_{3,3}$, compare with the true independence numbers, and characterise the graphs for which it is exact.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'turan-from-caro-wei',
              title: 'Turan from Caro-Wei',
              prompt: `Complete the derivation of the bound $m\\le\\bigl(1-\\frac1r\\bigr)\\frac{n^2}2$ for $K_{r+1}$-free graphs from the Caro-Wei inequality, including the convexity step. Check it against the Turan graph $T(n,r)$ when $r$ divides $n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'deletion-ramsey',
              title: 'Deletion for Ramsey numbers',
              prompt: `Use the deletion method to show $R(k,k)>n-\\binom nk2^{1-\\binom k2}$ for every $n$. For $k=10$, find by computer the $n$ that maximises this, and compare the result with the bound $2^{k/2}$ from the union bound.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'dominating-sets',
              title: 'Small dominating sets',
              prompt: `Prove that a graph with minimum degree $\\delta\\ge 1$ has a dominating set of size at most $\\frac{1+\\ln(\\delta+1)}{\\delta+1}n$. Evaluate the bound for the $3$-regular Petersen graph, and find a smallest dominating set of the Petersen graph by computer.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use 1 - p <= e^(-p), and minimise np + n e^(-p(delta+1)) over p.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the set of vertices preceding all their neighbours independent?',
              answerOutline: `If two such vertices were adjacent, each would have to precede the other.`,
            },
            {
              question: 'What does the deletion method add to the basic method?',
              answerOutline: `It lets you accept a random object with a few defects, and then remove one element per defect.`,
            },
            {
              question: 'Does large girth force small chromatic number?',
              answerOutline: `No. Erdos proved that graphs with arbitrarily large girth and chromatic number exist.`,
            },
          ],
        },
      ],
      project: {
        slug: 'random-constructions',
        title: 'Random constructions',
        description: `Test the probabilistic method on real instances. Implement random colourings of $K_n$ and the deletion method, and search for $2$-colourings of $K_n$ without monochromatic $K_4$ or $K_5$ for $n$ as large as you can, comparing random search, deletion and local search against the known Ramsey bounds. Implement the random-ordering independent set algorithm and compare it with the Caro-Wei bound on random graphs and on real network data. Finally, estimate how many random tournaments on $10$ players have every pair of players beaten by a third player.`,
        deliverables: [
          'Code for random colourings, monochromatic clique counting and deletion',
          'The largest colourings found avoiding monochromatic $K_4$ and $K_5$, verified by an independent checker',
          'A plot of the random-ordering independent set size against the Caro-Wei bound on at least three families of graphs',
          'A Monte Carlo estimate, with confidence interval, for the tournament property',
          'A report explaining where random constructions beat your explicit attempts and where they did not',
        ],
        estimatedHours: 7,
        stretchGoals: ['Use simulated annealing to find a colouring of $K_{17}$ with no monochromatic $K_4$'],
      },
    },
  ],
  capstone: {
    slug: 'enumeration-workbench',
    title: 'An enumeration workbench',
    description: `Build a Python library that counts combinatorial families in three independent ways, and use it to discover and prove results. For each family, implement a brute-force enumerator for small sizes, a recurrence or formula, and a generating function computed with power series arithmetic that you write yourself. The library should cover at least twelve families from the course: compositions with restrictions, set partitions, integer partitions with restrictions, derangements, surjections, Catalan families, necklaces counted with Polya's theorem, and Latin squares of small order.

Use the workbench for one piece of real exploration. For instance, take a family of restricted partitions or lattice paths, compute its sequence, find a generating function from the data, look it up in the OEIS, and prove a bijective or generating function identity that explains what you found. The report should present at least three proofs that you wrote, each confirmed numerically.`,
    deliverables: [
      'A tested library in which every family has a brute-force count, a formula or recurrence, and a generating function, and all three agree for every size you can reach',
      'Truncated power series arithmetic with multiplication, inversion, composition and exponential, written from scratch',
      'A Polya counter that takes a permutation group and a weight and returns the pattern inventory',
      'A small design toolkit that builds projective planes of prime order and checks them',
      'A report of 5-8 pages with at least three original proofs and the numerical evidence behind them',
    ],
    estimatedHours: 18,
    stretchGoals: [
      'Add asymptotic estimates from singularity analysis and compare them with exact counts',
      'Search for a pair of orthogonal Latin squares of order $10$, as Parker did, and time your search',
    ],
  },
  masteryChecklist: [
    'I can choose the right model, among words, subsets, multisets and partitions, for a counting problem',
    'I can prove binomial identities both algebraically and by double counting or bijection',
    'I can apply inclusion-exclusion to derangements, surjections and bounded equations',
    'I can use Mobius inversion and the pigeonhole principle in proofs',
    'I can set up and manipulate ordinary and exponential generating functions',
    'I can prove partition identities with Ferrers diagrams and generating functions',
    'I can solve linear recurrences by characteristic roots and by generating functions',
    'I can count colourings up to symmetry with Polya\'s theorem',
    'I can check the parameters of a block design and build finite projective planes and orthogonal Latin squares',
    'I can prove lower bounds by the probabilistic method, including the deletion method',
  ],
});
