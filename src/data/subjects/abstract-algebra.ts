import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const judson = (note: string): ResourceInput => ({
  title: 'Abstract Algebra: Theory and Applications (Judson)',
  url: 'https://math.libretexts.org/Bookshelves/Abstract_and_Geometric_Algebra/Abstract_Algebra%3A_Theory_and_Applications_(Judson)',
  type: 'textbook',
  cost: 'free',
  provider: 'LibreTexts',
  note,
  primary: true,
});

const ocw703 = (note: string): ResourceInput => ({
  title: 'MIT 18.703 Modern Algebra',
  url: 'https://ocw.mit.edu/courses/18-703-modern-algebra-spring-2013/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const ocw701 = (note: string): ResourceInput => ({
  title: 'MIT 18.701 Algebra I',
  url: 'https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const ocw702 = (note: string): ResourceInput => ({
  title: 'MIT 18.702 Algebra II',
  url: 'https://ocw.mit.edu/courses/18-702-algebra-ii-spring-2011/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const conrad = (path: string, title: string, note: string): ResourceInput => ({
  title: `Keith Conrad: ${title}`,
  url: `https://kconrad.math.uconn.edu/blurbs/${path}`,
  type: 'article',
  cost: 'free',
  provider: 'University of Connecticut',
  note,
});

const sympyGroups = (note: string): ResourceInput => ({
  title: 'SymPy documentation: Combinatorics',
  url: 'https://docs.sympy.org/latest/modules/combinatorics/index.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SymPy',
  note,
});

const sympyPolys = (note: string): ResourceInput => ({
  title: 'SymPy documentation: Polynomial manipulation',
  url: 'https://docs.sympy.org/latest/modules/polys/index.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SymPy',
  note,
});

export default defineSubject({
  id: 'abstract-algebra',
  title: 'Introduction to Abstract Algebra',
  category: 'math',
  tagline:
    'Groups, rings and fields from the axioms up: symmetry, quotients, the Sylow theorems, factorisation, finite fields and what they make possible.',
  description: `Abstract algebra studies structure rather than particular numbers. Once you know that the integers modulo $n$, the symmetries of a square and the invertible matrices are all groups, a single theorem about groups tells you something about each of them, and the same habit of mind later explains why some polynomials factor, why an angle cannot be trisected with straightedge and compass, and how a scratched disc can still be read.

This course follows the topics in the public catalog description of University of Illinois MATH 417, Introduction to Abstract Algebra. It is an original course and is not affiliated with the University of Illinois, and nothing here is taken from that course's materials. The six modules run through groups, homomorphisms and quotients, group actions and the Sylow theorems, rings and ideals, polynomials and factorisation, and fields, ending with finite fields, classical constructions and Reed-Solomon codes.

It assumes the proof course \`higher-mathematics\`: you should be comfortable with induction, equivalence relations, functions and the division algorithm. Most exercises are proofs, and the point of them is that you write the proof out in full sentences. Finite examples you can check by machine are mixed in, because computing with a small group is the fastest way to find out whether you believe a statement. There are no machine problems. Instead, module projects build a small algebra toolkit in Python, and the capstone uses it to build a working error-correcting code.

Two conventions hold throughout. Rings have a multiplicative identity, and ring homomorphisms preserve it. Products of permutations are composed right to left, so $\\sigma\\tau$ means apply $\\tau$ first. Some books and some software (including SymPy) use other conventions, so check before comparing answers.`,
  difficulty: 'advanced',
  estimatedHours: 80,
  prerequisites: ['higher-mathematics'],
  recommendedBackground: [
    'Comfort writing proofs by induction and contradiction',
    'Equivalence relations, bijections and the division algorithm',
    'Basic matrix arithmetic, for examples',
    'A little Python, for the module projects',
  ],
  tags: ['groups', 'rings', 'fields', 'Sylow theorems', 'polynomials', 'finite fields', 'proofs'],
  core: false,
  modules: [
    {
      slug: 'groups',
      title: 'Groups',
      description:
        'The axioms, the standard examples, subgroups, and the two families you will use constantly: cyclic groups and permutation groups.',
      lessons: [
        {
          slug: 'group-axioms-and-examples',
          title: 'The group axioms and first examples',
          summary:
            'What a group is, the small consequences of the axioms, and how to tell two groups of the same size apart.',
          estimatedMinutes: 150,
          objectives: [
            'State the group axioms and test whether a given set and operation form a group',
            'Prove uniqueness of the identity and of inverses, cancellation, and the formula for $(ab)^{-1}$',
            'Compute in $\\mathbb{Z}_n$ and in the unit group $U(n)$',
            'Use element orders to show that two groups of the same size are different',
          ],
          concepts: [
            'Binary operation and closure',
            'Associativity, identity, inverses',
            'Abelian group',
            'The groups $\\mathbb{Z}_n$ and $U(n)$',
            'General linear group $GL_n(\\mathbb{R})$',
            'Cancellation law',
            'Order of a group and of an element',
          ],
          explanation: `A **group** is a set $G$ with a binary operation $G\\times G\\to G$ such that the operation is associative, there is an identity $e$ with $ea=ae=a$ for all $a$, and every $a$ has an inverse $a^{-1}$ with $aa^{-1}=a^{-1}a=e$. Because the operation must land in $G$, closure is the first thing to check in any example. Commutativity is not an axiom. Groups in which $ab=ba$ always are called **abelian**, and many important groups are not.

Why these axioms? The reversible transformations of any object form a group: composition is associative, doing nothing is the identity, and undoing a move is the inverse. Permutations, rotations and invertible matrices all arise this way, and so do number systems: $(\\mathbb{Z},+)$, $(\\mathbb{Z}_n,+)$, $(\\mathbb{Q}^\\times,\\cdot)$ and the unit group $U(n)=\\{a\\in\\mathbb{Z}_n:\\gcd(a,n)=1\\}$ under multiplication.

Non-examples are just as useful. $(\\mathbb{Z},-)$ fails associativity. $(\\mathbb{Z}\\setminus\\{0\\},\\cdot)$ has no inverse for $2$. The nonzero classes in $\\mathbb{Z}_6$ are not even closed under multiplication, since $2\\cdot 3=0$.

A few consequences hold in every group. The identity is unique, and so is each inverse. Cancellation holds: $ab=ac$ implies $b=c$. Inverses reverse order: $(ab)^{-1}=b^{-1}a^{-1}$, because you take off your shoes before your socks. The **order** of an element $a$ is the least $n\\ge 1$ with $a^n=e$, if one exists.

**Worked example.** Compare $U(8)=\\{1,3,5,7\\}$ and $U(10)=\\{1,3,7,9\\}$. Both have four elements and both are abelian. In $U(8)$ we get $3^2=9\\equiv 1$, $5^2=25\\equiv 1$ and $7^2=49\\equiv 1$, so every non-identity element has order $2$. In $U(10)$ the powers of $3$ are $3,9,7,1$, so $3$ has order $4$ and generates the whole group. Any structure-preserving bijection would have to preserve element orders, so these groups differ. Size alone does not determine a group.

Read the chapters on groups in Judson, and build the multiplication table of at least one small group by hand before reading on.`,
          resources: [
            judson('Read the chapter on groups for definitions, the integers mod $n$ and basic properties.'),
            conrad('grouptheory/whygroups.pdf', 'Why groups?', 'A short account of what groups are for, useful before the formal development.'),
            ocw703('Use the early lecture notes as a second presentation of the axioms and examples.'),
          ],
          exercises: [
            {
              slug: 'axioms-consequences',
              title: 'Consequences of the axioms',
              prompt: `Prove from the axioms alone that in any group the identity is unique, inverses are unique, and $(ab)^{-1}=b^{-1}a^{-1}$. Then give a specific group and specific elements for which $(ab)^{-1}\\ne a^{-1}b^{-1}$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'unit-tables',
              title: 'Tables of two unit groups',
              prompt: `Write out the multiplication tables of $U(12)$ and $U(14)$. Give the order of every element. Decide whether each group is generated by one element, and name a generator if so.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'exponent-two',
              title: 'Every square is trivial',
              prompt: `Let $G$ be a group with $x^2=e$ for all $x\\in G$. Prove that $G$ is abelian.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Expand the square of the product xy, and use that every element is its own inverse.',
            },
            {
              slug: 'even-order-involution',
              title: 'Even order forces an involution',
              prompt: `Let $G$ be a finite group of even order. Prove that $G$ has an element of order $2$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Pair each element with its inverse and count the elements left unpaired.',
            },
            {
              slug: 'one-sided-axioms',
              title: 'One-sided axioms are enough',
              prompt: `Let $G$ be a set with an associative operation, an element $e$ with $ea=a$ for all $a$, and for each $a$ an element $b$ with $ba=e$. Prove that $G$ is a group: that is, $ae=a$ and $ab=e$ also hold. Then show that a left identity together with right inverses is not enough, by finding a set with an associative operation, a left identity $e$, and $ab=e$ solvable for each $a$, that is not a group.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the first part, let c be a left inverse of b and compute cbab in two ways. For the second, try the operation ab = b on a set with two elements.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\mathbb{Z}_n\\setminus\\{0\\}$ under multiplication a group for $n=7$ but not for $n=6$?',
              answerOutline: `For prime $n$ every nonzero class is coprime to $n$ and so has an inverse, and products of nonzero classes are nonzero. For $n=6$, $2\\cdot 3=0$ breaks closure and $2$ has no inverse.`,
            },
            {
              question: 'What must an isomorphism preserve that distinguishes $U(8)$ from $U(10)$?',
              answerOutline: `Element orders. $U(10)$ has an element of order $4$, and every non-identity element of $U(8)$ has order $2$.`,
            },
            {
              question: 'Which axiom fails for $(\\mathbb{Z},-)$, and which for $(\\mathbb{Z}\\setminus\\{0\\},\\cdot)$?',
              answerOutline: `Subtraction is not associative, and it has no two-sided identity. Nonzero integers under multiplication lack inverses except for $\\pm 1$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/modular-arithmetic-and-inverses'],
        },
        {
          slug: 'subgroups-and-cyclic-groups',
          title: 'Subgroups and cyclic groups',
          summary:
            'The subgroup test, the order of a power, and the complete description of subgroups of a cyclic group.',
          estimatedMinutes: 170,
          objectives: [
            'Apply the one-step subgroup test',
            'Prove that every subgroup of a cyclic group is cyclic',
            'Compute $|a^k|$ from $|a|$ and $k$',
            'List all subgroups and generators of $\\mathbb{Z}_n$',
          ],
          concepts: [
            'Subgroup and the one-step test',
            'Cyclic subgroup $\\langle a\\rangle$',
            'Order of an element',
            'Generators of $\\mathbb{Z}_n$',
            'Euler function $\\varphi(n)$',
            'Subgroup lattice',
          ],
          explanation: `A **subgroup** $H\\le G$ is a subset that is a group under the same operation. You need not recheck everything: a nonempty subset $H$ is a subgroup exactly when $x,y\\in H$ implies $xy^{-1}\\in H$. Associativity is inherited, taking $y=x$ gives $e$, taking $x=e$ gives inverses, and closure follows.

For any $a\\in G$, the set $\\langle a\\rangle=\\{a^k:k\\in\\mathbb{Z}\\}$ is the **cyclic subgroup** generated by $a$. A group is **cyclic** if it equals $\\langle a\\rangle$ for some $a$. If $a$ has finite order $n$, then $a^i=a^j$ exactly when $n\\mid i-j$, so $\\langle a\\rangle$ has $n$ elements and behaves like $\\mathbb{Z}_n$. If $a$ has infinite order, it behaves like $\\mathbb{Z}$. So these two are the only cyclic groups up to isomorphism.

Two facts do most of the work. First, if $|a|=n$ then
$$|a^k|=\\frac{n}{\\gcd(n,k)}.$$
Second, **every subgroup of a cyclic group is cyclic**. The proof is the division algorithm. Let $H\\le\\langle a\\rangle$ be nontrivial, and let $d$ be the least positive integer with $a^d\\in H$. If $a^m\\in H$, write $m=qd+r$ with $0\\le r<d$. Then $a^r=a^m(a^d)^{-q}\\in H$, so $r=0$ by minimality, and $H=\\langle a^d\\rangle$. For $\\mathbb{Z}_n$ this gives exactly one subgroup of order $d$ for each divisor $d$ of $n$, namely $\\langle n/d\\rangle$.

**Worked example.** Take $G=\\mathbb{Z}_{12}$. The generators are the $k$ with $\\gcd(k,12)=1$: that is $1,5,7,11$, so there are $\\varphi(12)=4$ of them. The element $8$ has order $12/\\gcd(12,8)=3$, and $\\langle 8\\rangle=\\{0,8,4\\}=\\langle 4\\rangle$, which shows that different elements can generate the same subgroup. The divisors $1,2,3,4,6,12$ give the six subgroups $\\langle 0\\rangle$, $\\langle 6\\rangle$, $\\langle 4\\rangle$, $\\langle 3\\rangle$, $\\langle 2\\rangle$, $\\langle 1\\rangle$, with those orders. Containment reverses divisibility of the generators: $\\langle 4\\rangle\\subseteq\\langle 2\\rangle$ because $2\\mid 4$.

A warning: the union of two subgroups is usually not a subgroup. In $\\mathbb{Z}$, the set $2\\mathbb{Z}\\cup 3\\mathbb{Z}$ contains $2$ and $3$ but not $5$. Intersections always are subgroups.`,
          resources: [
            judson('Read the chapter on cyclic groups, including the classification of subgroups.'),
            conrad('grouptheory/cyclicgp.pdf', 'Subgroups of cyclic groups', 'A careful treatment of the subgroup structure described here.'),
            conrad('grouptheory/order.pdf', 'Order of elements', 'Collects the rules for the order of a power and of a product, with the caveats.'),
          ],
          exercises: [
            {
              slug: 'finite-subgroup-test',
              title: 'Closure is enough when finite',
              prompt: `Prove that a nonempty finite subset $H$ of a group, closed under the operation, is a subgroup. Show by example that finiteness is needed.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'order-of-power',
              title: 'Order of a power',
              prompt: `Let $|a|=n$. Prove that $|a^k|=n/\\gcd(n,k)$, and deduce that $a^k$ generates $\\langle a\\rangle$ exactly when $\\gcd(n,k)=1$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lattice-z30',
              title: 'The subgroups of Z30',
              prompt: `List every subgroup of $\\mathbb{Z}_{30}$ by a generator and its order, and list all generators of the whole group. Draw the containment diagram and explain why it has the shape of a cube.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'phi-sum',
              title: 'Counting by order',
              prompt: `Prove that $\\sum_{d\\mid n}\\varphi(d)=n$ by sorting the elements of $\\mathbb{Z}_n$ according to their order, and say exactly how many elements have each order $d$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'union-of-subgroups',
              title: 'When a union is a subgroup',
              prompt: `Let $H,K\\le G$. Prove that $H\\cup K$ is a subgroup if and only if $H\\subseteq K$ or $K\\subseteq H$. Then prove that no group is the union of two proper subgroups.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Assume neither contains the other, pick h in H outside K and k in K outside H, and ask where hk lives.',
            },
          ],
          selfAssessment: [
            {
              question: 'How does the division algorithm enter the proof that subgroups of cyclic groups are cyclic?',
              answerOutline: `Take the least positive exponent $d$ with $a^d\\in H$. Dividing any exponent $m$ of an element of $H$ by $d$ leaves a remainder $r$ with $a^r\\in H$ and $0\\le r<d$, so $r=0$.`,
            },
            {
              question: 'How many elements of order $6$ does $\\mathbb{Z}_{12}$ have, and which are they?',
              answerOutline: `$\\varphi(6)=2$: the elements $2$ and $10$.`,
            },
            {
              question: 'Why does $\\mathbb{Z}_{12}$ have exactly one subgroup of order $4$, while $U(8)$ has three subgroups of order $2$?',
              answerOutline: `A cyclic group has exactly one subgroup per divisor of its order. $U(8)$ is not cyclic: it has three subgroups of order $2$.`,
            },
          ],
        },
        {
          slug: 'symmetric-groups',
          title: 'Symmetric groups and permutations',
          summary:
            'Cycle notation, composing permutations, parity, and the alternating group.',
          estimatedMinutes: 170,
          objectives: [
            'Write a permutation as a product of disjoint cycles and compute products by hand',
            'Find the order of a permutation from its cycle type',
            'Explain why the sign of a permutation is well defined',
            'Describe the alternating group $A_n$ and its generators',
          ],
          concepts: [
            'Symmetric group $S_n$',
            'Cycle notation and disjoint cycles',
            'Cycle type',
            'Transposition',
            'Sign (parity)',
            'Alternating group $A_n$',
            'Composition convention',
          ],
          explanation: `The **symmetric group** $S_n$ is the group of all bijections of $\\{1,\\dots,n\\}$ under composition, with $n!$ elements. It is non-abelian for $n\\ge 3$. A later theorem of Cayley shows that every finite group sits inside some $S_n$, so permutations are a universal testing ground.

A **cycle** $(a_1\\ a_2\\ \\dots\\ a_k)$ sends $a_1\\mapsto a_2\\mapsto\\dots\\mapsto a_k\\mapsto a_1$ and fixes everything else. Every permutation is a product of disjoint cycles, uniquely up to order, and disjoint cycles commute. The order of a permutation is the lcm of its cycle lengths. The list of cycle lengths is its **cycle type**.

We compose right to left, as with functions: $\\sigma\\tau$ means apply $\\tau$ first. SymPy multiplies left to right, so its product of two permutations is the reverse of ours.

Every cycle is a product of transpositions: $(a_1\\ a_2\\ \\dots\\ a_k)=(a_1\\ a_k)\\cdots(a_1\\ a_3)(a_1\\ a_2)$. A permutation can be written with transpositions in many ways, but the parity of the number used never changes. One clean proof uses the polynomial $\\Delta=\\prod_{i<j}(x_i-x_j)$: permuting the variables sends $\\Delta$ to $\\pm\\Delta$, a transposition always gives $-\\Delta$, and so the **sign** $\\operatorname{sgn}:S_n\\to\\{\\pm1\\}$ is a well-defined multiplicative function. A $k$-cycle has sign $(-1)^{k-1}$, which is the opposite of what the word "odd" suggests about its length. The even permutations form the **alternating group** $A_n$, of order $n!/2$ for $n\\ge 2$.

**Worked example.** Let $\\sigma=(1\\ 3\\ 5)(2\\ 4)$ and $\\tau=(1\\ 2\\ 3\\ 4\\ 5)$. Compute $\\sigma\\tau$ by following each point through $\\tau$ then $\\sigma$. We get $1\\to 2\\to 4$, then $4\\to 5\\to 1$, closing the cycle $(1\\ 4)$. Next $2\\to 3\\to 5$, then $5\\to 1\\to 3$, then $3\\to 4\\to 2$, giving $(2\\ 5\\ 3)$. So
$$\\sigma\\tau=(1\\ 4)(2\\ 5\\ 3),$$
of order $\\operatorname{lcm}(2,3)=6$. Its sign is $(-1)(+1)=-1$. As a check, $\\operatorname{sgn}\\sigma=(+1)(-1)=-1$ and $\\operatorname{sgn}\\tau=+1$ since a $5$-cycle is even, and the product is $-1$ as it must be.`,
          resources: [
            judson('Read the chapter on permutation groups, including the dihedral groups at its end.'),
            conrad('grouptheory/sign.pdf', 'Sign of permutations', 'Several proofs that the sign is well defined.'),
            sympyGroups('The Permutation class lets you check products, but note its left-to-right multiplication.'),
          ],
          exercises: [
            {
              slug: 'conjugating-a-cycle',
              title: 'Conjugating a cycle',
              prompt: `Prove that $\\tau(a_1\\ a_2\\ \\dots\\ a_k)\\tau^{-1}=(\\tau(a_1)\\ \\tau(a_2)\\ \\dots\\ \\tau(a_k))$ for any $\\tau\\in S_n$. Deduce that two permutations are conjugate in $S_n$ if and only if they have the same cycle type.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'two-generators',
              title: 'Two generators for Sn',
              prompt: `Prove that $S_n$ is generated by the transposition $(1\\ 2)$ and the $n$-cycle $(1\\ 2\\ \\dots\\ n)$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Conjugating (1 2) by powers of the long cycle gives all adjacent transpositions. Then show adjacent transpositions generate all transpositions.',
            },
            {
              slug: 'largest-order',
              title: 'Largest order in S7 and S10',
              prompt: `Find the largest order of an element of $S_7$ and of $S_{10}$, and give a cycle type achieving each. Explain why no other cycle type does better.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'count-cycle-types',
              title: 'Counting a cycle type',
              prompt: `Derive a formula for the number of elements of $S_n$ with a given cycle type. Use it to count the elements of $S_6$ of cycle type $(3,2,1)$ and of cycle type $(2,2,2)$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'three-cycles-generate',
              title: 'Three-cycles generate the alternating group',
              prompt: `For $n\\ge 3$, prove that every element of the alternating group $A_n$ can be written as a product of $3$-cycles.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Handle a product of two transpositions in the cases where they share zero, one or two points.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a $4$-cycle have sign $-1$?',
              answerOutline: `It is a product of $3$ transpositions, and in general a $k$-cycle needs $k-1$, so the sign is $(-1)^{k-1}$.`,
            },
            {
              question: 'What is the order of $(1\\ 2\\ 3)(4\\ 5\\ 6\\ 7)$, and why does this need the cycles to be disjoint?',
              answerOutline: `$12$, the lcm of $3$ and $4$. Disjoint cycles commute, so powers distribute and each cycle returns to the identity independently.`,
            },
            {
              question: 'How does SymPy\'s product of permutations differ from the convention used here?',
              answerOutline: `SymPy multiplies left to right, so its $p*q$ applies $p$ first. Here $\\sigma\\tau$ applies $\\tau$ first.`,
            },
          ],
        },
        {
          slug: 'dihedral-groups-and-generators',
          title: 'Dihedral groups, generators and small groups',
          summary:
            'Symmetries of polygons, working from generators and relations, and a first census of small groups.',
          estimatedMinutes: 150,
          objectives: [
            'Compute in $D_n$ using $r^n=s^2=e$ and $srs=r^{-1}$',
            'List the subgroups of a small non-abelian group',
            'Distinguish $D_4$ from the quaternion group $Q_8$',
            'Explain what it means for a set to generate a group',
          ],
          concepts: [
            'Dihedral group $D_n$ of order $2n$',
            'Rotation and reflection',
            'Generating set',
            'Relations and presentations',
            'Quaternion group $Q_8$',
            'Centre of a group',
          ],
          explanation: `The **dihedral group** $D_n$ ($n\\ge 3$) is the group of symmetries of a regular $n$-gon. It has $2n$ elements: $n$ rotations and $n$ reflections. Be aware that some books write this group as $D_{2n}$. We name it by the polygon. Let $r$ be rotation by $2\\pi/n$ and $s$ any reflection. Then every element is uniquely $r^i$ or $r^is$ with $0\\le i<n$, and all computation follows from
$$r^n=e,\\quad s^2=e,\\quad srs=r^{-1}.$$
The last relation says that a reflection reverses the sense of rotation. It lets you push every $s$ to the right, since $sr^i=r^{-i}s$. For instance, every $r^is$ has order $2$, because $(r^is)(r^is)=r^i(sr^is)=r^ir^{-i}=e$.

A subset $S$ **generates** $G$ if every element is a product of elements of $S$ and their inverses. A list of relations that determines the group is a **presentation**: the lines above present $D_n$. Generators are how you describe a large group briefly, and a homomorphism out of a group is determined by its values on generators.

**Worked example: the subgroups of $D_4$.** Lagrange's theorem, coming soon, says that orders divide $8$, so sort by order. Order $1$: $\\{e\\}$. Order $2$: each element of order $2$ gives one subgroup, and those elements are $r^2,s,rs,r^2s,r^3s$, so there are five. Order $4$: the cyclic group $\\langle r\\rangle$, and two Klein four-groups $\\{e,r^2,s,r^2s\\}$ and $\\{e,r^2,rs,r^3s\\}$. A subgroup of order $4$ cannot be cyclic unless it contains $r$ or $r^3$, as no other element has order $4$, so that is $\\langle r\\rangle$. A non-cyclic one consists of $e$ and three commuting involutions, and two reflections $r^is$ and $r^js$ commute only if $i-j$ is even. Order $8$: $D_4$ itself. The total is $1+5+3+1=10$.

Compare the **quaternion group** $Q_8=\\{\\pm1,\\pm i,\\pm j,\\pm k\\}$ with $i^2=j^2=k^2=ijk=-1$. It also has order $8$ and is non-abelian, but $-1$ is its only element of order $2$. So $Q_8$ and $D_4$ are not isomorphic, and $Q_8$ has only six subgroups.`,
          resources: [
            judson('The dihedral groups appear in the chapter on permutation groups.'),
            conrad('grouptheory/dihedral.pdf', 'Dihedral groups I', 'A full development from $r$ and $s$, including subgroups and conjugacy.'),
            conrad('grouptheory/gpisomlist.pdf', 'Small groups up to isomorphism', 'A list to compare your own census against.'),
          ],
          exercises: [
            {
              slug: 'product-of-reflections',
              title: 'Two reflections make a rotation',
              prompt: `Show that in $D_n$, $(r^is)(r^js)=r^{i-j}$. Explain the geometric meaning, and prove that $D_n$ is generated by any two adjacent reflections.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'centre-dn',
              title: 'The centre of a dihedral group',
              prompt: `The **centre** of $G$ is $Z(G)=\\{z:zg=gz\\text{ for all }g\\}$. Prove that for $n\\ge 3$, $Z(D_n)$ is trivial when $n$ is odd and equals $\\{e,r^{n/2}\\}$ when $n$ is even.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'count-subgroups-dn',
              title: 'All subgroups of a dihedral group',
              prompt: `Prove that $D_n$ has exactly $\\tau(n)+\\sigma(n)$ subgroups, where $\\tau(n)$ is the number of positive divisors of $n$ and $\\sigma(n)$ is their sum. Check the formula against $D_4$ and work it out for $D_6$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'A subgroup is either inside the rotations, or it contains a reflection. In the second case, describe it by its rotation part and one reflection, and count the choices.',
            },
            {
              slug: 'q8-order-census',
              title: 'Order census of D4 and Q8',
              prompt: `Count the elements of each order in $D_4$ and in $Q_8$. Show that all proper subgroups of $Q_8$ are normal in the sense that $gHg^{-1}=H$ for all $g$, and find a subgroup of $D_4$ for which this fails.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Simplify $s r^3 s r^2$ in $D_n$.',
              answerOutline: `$sr^3s=r^{-3}$, so the product is $r^{-3}r^2=r^{-1}$.`,
            },
            {
              question: 'What does $srs=r^{-1}$ say geometrically?',
              answerOutline: `Conjugating a rotation by a reflection reverses its direction, because a reflection reverses orientation.`,
            },
            {
              question: 'Name two non-abelian groups of order $8$ and an invariant separating them.',
              answerOutline: `$D_4$ has five elements of order $2$, and $Q_8$ has one.`,
            },
          ],
        },
      ],
      project: {
        slug: 'group-explorer',
        title: 'A finite group explorer',
        description: `Write a small Python library that represents a finite group by its elements and operation, verifies the axioms, and computes the things this module taught. This becomes the base for the later projects, so keep the interface clean. Use a Cayley table as the internal form, and provide constructors for cyclic groups, unit groups, dihedral groups, symmetric and alternating groups, $Q_8$ and direct products. Your subgroup finder should work by closing up small generating sets, not by testing all subsets. As a check, your program should report $6$, $30$, $10$, $16$ and $6$ subgroups for $S_3$, $S_4$, $A_4$, $D_6$ and $Q_8$.`,
        deliverables: [
          'A `FiniteGroup` class that builds a Cayley table and checks closure, associativity, identity and inverses',
          'Constructors for $\\mathbb{Z}_n$, $U(n)$, $D_n$, $S_n$, $A_n$, $Q_8$ and direct products',
          'Functions returning element orders, the centre, and all subgroups',
          'A table of element-order counts and subgroup counts for at least eight groups',
          'A one-page note on one pattern you noticed in the table and a proof of it',
        ],
        estimatedHours: 8,
        stretchGoals: ['Draw subgroup lattices as images', 'Search for pairs of non-isomorphic groups of the same order with identical order counts'],
      },
    },
    {
      slug: 'homomorphisms-and-quotients',
      title: 'Homomorphisms and Quotients',
      description:
        'Maps that respect structure, the partition of a group into cosets, and the quotient construction that turns a normal subgroup into a new group.',
      lessons: [
        {
          slug: 'homomorphisms-and-isomorphisms',
          title: 'Homomorphisms and isomorphisms',
          summary:
            'Structure-preserving maps, their kernels and images, and Cayley\'s theorem.',
          estimatedMinutes: 160,
          objectives: [
            'Verify that a map is a homomorphism and find its kernel and image',
            'Prove that a homomorphism is injective exactly when its kernel is trivial',
            'Classify homomorphisms out of a cyclic group',
            'Prove Cayley\'s theorem',
          ],
          concepts: [
            'Homomorphism',
            'Kernel and image',
            'Isomorphism',
            'Automorphism',
            'Isomorphism invariants',
            'Left regular representation',
            'Cayley\'s theorem',
          ],
          explanation: `A **homomorphism** is a map $\\varphi:G\\to H$ with $\\varphi(ab)=\\varphi(a)\\varphi(b)$. The operation on the left is in $G$ and the one on the right is in $H$. Automatically $\\varphi(e)=e$ and $\\varphi(a^{-1})=\\varphi(a)^{-1}$, and if $a$ has finite order then $|\\varphi(a)|$ divides $|a|$. The **kernel** $\\ker\\varphi=\\{a:\\varphi(a)=e\\}$ and the **image** are subgroups. Familiar examples are $\\det:GL_n(\\mathbb{R})\\to\\mathbb{R}^\\times$, the sign $S_n\\to\\{\\pm1\\}$, reduction $\\mathbb{Z}\\to\\mathbb{Z}_n$, and $\\exp:(\\mathbb{R},+)\\to(\\mathbb{R}_{>0},\\cdot)$.

The kernel measures how far $\\varphi$ is from injective. If $\\varphi(a)=\\varphi(b)$ then $a^{-1}b\\in\\ker\\varphi$, so the fibres of $\\varphi$ are the cosets of the kernel, all of the same size. In particular $\\varphi$ is injective exactly when $\\ker\\varphi=\\{e\\}$.

An **isomorphism** is a bijective homomorphism, and its inverse is automatically one too. Isomorphic groups are the same group with renamed elements, so they share every structural property: order, commutativity, element orders, number of subgroups. To prove two groups are not isomorphic, find such an invariant that differs. To prove they are, write down a map.

**Cayley's theorem.** Every group $G$ is isomorphic to a subgroup of $\\operatorname{Sym}(G)$. For each $g$, the map $\\lambda_g(x)=gx$ is a bijection of $G$, $\\lambda_{gh}=\\lambda_g\\lambda_h$, and $\\lambda_g$ is the identity only for $g=e$. So $g\\mapsto\\lambda_g$ is an injective homomorphism.

**Worked example.** Find all homomorphisms $\\mathbb{Z}_{12}\\to\\mathbb{Z}_{18}$. Since $1$ generates $\\mathbb{Z}_{12}$, a homomorphism is determined by $a=\\varphi(1)$, and the only condition is that $12a\\equiv 0\\pmod{18}$, because $12\\cdot 1=0$ in the domain. That condition is $18\\mid 12a$, or $3\\mid 2a$, or $3\\mid a$. So $a\\in\\{0,3,6,9,12,15\\}$, giving six homomorphisms, and in general $\\gcd(n,m)$ of them from $\\mathbb{Z}_n$ to $\\mathbb{Z}_m$. Take $a=3$, so $\\varphi(k)=3k$. The kernel is the set of $k$ with $18\\mid 3k$, which is $6\\mid k$, so $\\ker\\varphi=\\{0,6\\}$. The image is $\\langle 3\\rangle$, of order $6$. Note that $2\\cdot 6=12$: kernel size times image size equals the size of the domain, which the first isomorphism theorem will explain. No homomorphism here is injective, because that would give $\\mathbb{Z}_{18}$ a subgroup of order $12$, and $12\\nmid 18$.`,
          resources: [
            judson('Read the chapters on isomorphisms and on homomorphisms.'),
            conrad('grouptheory/homomorphisms.pdf', 'Homomorphisms', 'Many examples, and how to construct homomorphisms from cyclic groups.'),
            conrad('grouptheory/isomorphisms.pdf', 'Isomorphisms', 'How to prove and disprove that two groups are isomorphic.'),
          ],
          exercises: [
            {
              slug: 'injective-kernel',
              title: 'Injective iff trivial kernel',
              prompt: `Prove that $\\ker\\varphi$ is a subgroup, that $\\varphi$ is injective if and only if $\\ker\\varphi=\\{e\\}$, and that $|\\varphi(a)|$ divides $|a|$ when $a$ has finite order.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'automorphisms-zn',
              title: 'Automorphisms of a cyclic group',
              prompt: `Prove that the automorphism group of $\\mathbb{Z}_n$ is isomorphic to $U(n)$. Identify $\\operatorname{Aut}(\\mathbb{Z}_8)$ and $\\operatorname{Aut}(\\mathbb{Z}_{10})$ up to isomorphism as standard groups.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'inversion-map',
              title: 'Inversion as a homomorphism',
              prompt: `Prove that $x\\mapsto x^{-1}$ is a homomorphism $G\\to G$ if and only if $G$ is abelian.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'non-isomorphism',
              title: 'Separating infinite groups',
              prompt: `Prove that $(\\mathbb{Q},+)$ is not isomorphic to $(\\mathbb{Z},+)$, and that $(\\mathbb{R},+)$ is not isomorphic to $(\\mathbb{R}\\setminus\\{0\\},\\cdot)$. Name the invariant used each time.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'One group is cyclic and the other is not. For the second pair, compare the number of elements of order 2.',
            },
            {
              slug: 'cayley-into-alternating',
              title: 'Embedding into an alternating group',
              prompt: `Prove that every group of order $n$ is isomorphic to a subgroup of the alternating group $A_{n+2}$, so that even permutations alone can represent any finite group.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Start from Cayley. Fix each odd permutation by multiplying it with the transposition of the two new points.',
            },
          ],
          selfAssessment: [
            {
              question: 'How many homomorphisms are there from $\\mathbb{Z}_{15}$ to $\\mathbb{Z}_{20}$?',
              answerOutline: `$\\gcd(15,20)=5$. They send $1$ to a multiple of $4$.`,
            },
            {
              question: 'What does the size of a kernel tell you about the fibres of a homomorphism?',
              answerOutline: `Each nonempty fibre is a coset of the kernel, so all fibres have the size of the kernel.`,
            },
            {
              question: 'Is $x\\mapsto x+1$ a homomorphism of $\\mathbb{Z}$? Why or why not?',
              answerOutline: `No. A homomorphism must send $0$ to $0$, and this map sends $0$ to $1$.`,
            },
          ],
        },
        {
          slug: 'cosets-and-lagrange',
          title: 'Cosets and Lagrange\'s theorem',
          summary:
            'A subgroup slices a group into equal pieces, which forces orders to divide and gives Euler\'s theorem at once.',
          estimatedMinutes: 160,
          objectives: [
            'Compute left and right cosets of a subgroup',
            'Prove Lagrange\'s theorem and its corollaries',
            'Deduce Fermat\'s and Euler\'s theorems',
            'Show that the converse of Lagrange\'s theorem fails',
          ],
          concepts: [
            'Left and right cosets',
            'Index $[G:H]$',
            'Lagrange\'s theorem',
            'Order of an element divides group order',
            'Groups of prime order',
            'Converse failure in $A_4$',
          ],
          explanation: `For $H\\le G$ and $a\\in G$, the **left coset** is $aH=\\{ah:h\\in H\\}$, and the **right coset** is $Ha$. Define $a\\sim b$ when $a^{-1}b\\in H$. This is an equivalence relation whose classes are the left cosets, so the left cosets partition $G$. Each has the same size as $H$, since $h\\mapsto ah$ is a bijection. The number of left cosets is the **index** $[G:H]$. Therefore, for finite $G$,
$$|G|=[G:H]\\,|H|,$$
which is **Lagrange's theorem**. Its corollaries are used constantly. The order of an element divides $|G|$, because $|a|=|\\langle a\\rangle|$. So $a^{|G|}=e$. A group of prime order $p$ is cyclic, because any non-identity element generates a subgroup of order greater than $1$, hence $p$. Applying $a^{|G|}=e$ to $U(n)$ gives **Euler's theorem** $a^{\\varphi(n)}\\equiv 1\\pmod n$ for $\\gcd(a,n)=1$, and $n=p$ gives Fermat's little theorem.

**Worked example.** Let $G=S_3$ and $H=\\{e,(1\\ 2)\\}$. Composing right to left, $(1\\ 3)(1\\ 2)=(1\\ 2\\ 3)$ and $(2\\ 3)(1\\ 2)=(1\\ 3\\ 2)$. The left cosets are
$$H,\\quad (1\\ 3)H=\\{(1\\ 3),(1\\ 2\\ 3)\\},\\quad (2\\ 3)H=\\{(2\\ 3),(1\\ 3\\ 2)\\}.$$
There are three, matching $6=3\\cdot 2$. Now $(1\\ 2)(1\\ 3)=(1\\ 3\\ 2)$, so the right coset $H(1\\ 3)=\\{(1\\ 3),(1\\ 3\\ 2)\\}$, which is not $(1\\ 3)H$. Left and right cosets need not agree. The next lesson is about when they do.

**The converse fails.** Lagrange says subgroup orders divide $|G|$, but not every divisor occurs. $A_4$ has order $12$ and no subgroup of order $6$. Suppose $H$ were one. It has index $2$, so for any $g\\in A_4$ the cosets $H$ and $gH$ are the only two, and $g^2\\in H$: if $g\\notin H$ then $g^2\\in gH$ would give $g\\in H$. Every $3$-cycle $c$ equals $(c^{2})^{2}$, so it is a square and lies in $H$. But $A_4$ has eight $3$-cycles, more than $|H|=6$. This is a contradiction.

For infinite groups the index can still make sense: $[\\mathbb{Z}:n\\mathbb{Z}]=n$ even though both groups are infinite.`,
          resources: [
            judson('Read the chapter on cosets and Lagrange\'s theorem, with the number-theoretic corollaries.'),
            conrad('grouptheory/coset.pdf', 'Cosets and Lagrange\'s theorem', 'A careful treatment including the applications to modular arithmetic.'),
            conrad('grouptheory/A4noindex2.pdf', 'No subgroup of A4 has index 2', 'Several separate proofs of the example used here.'),
          ],
          exercises: [
            {
              slug: 'coset-relation',
              title: 'Cosets as equivalence classes',
              prompt: `Prove that $a\\sim b\\iff a^{-1}b\\in H$ is an equivalence relation whose classes are the left cosets of $H$. Prove also that $aH\\mapsto Ha^{-1}$ is a well-defined bijection from left to right cosets. Explain why the tempting map $aH\\mapsto Ha$ can fail to be well defined.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'product-formula',
              title: 'Counting a product of subgroups',
              prompt: `For finite subgroups $H,K\\le G$, prove that $|HK|=|H||K|/|H\\cap K|$, where $HK=\\{hk\\}$ need not be a subgroup. Use this to show that a group of order $75$ has at most one subgroup of order $25$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Show that HK is a union of left cosets of K, and count how many distinct ones arise.',
            },
            {
              slug: 'coprime-intersection',
              title: 'Coprime orders',
              prompt: `Let $H,K\\le G$ be finite with $\\gcd(|H|,|K|)=1$. Prove that $H\\cap K=\\{e\\}$. Prove that if also $|H||K|=|G|$ then every element of $G$ is uniquely $hk$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'euler-computation',
              title: 'Reducing a large power',
              prompt: `Use Lagrange's theorem in $U(15)$ to find $7^{222}\\bmod 15$. Then find the actual order of $7$ modulo $15$, and explain why it divides $\\varphi(15)$ but need not equal it.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'cosets-d4',
              title: 'Left and right cosets in D4',
              prompt: `Let $H=\\{e,s\\}\\le D_4$. List all left cosets and all right cosets of $H$. How many left cosets are also right cosets? Repeat for $H=\\{e,r^2\\}$, and say what is different.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State Lagrange\'s theorem and give one way the converse fails.',
              answerOutline: `If $H\\le G$ with $G$ finite then $|H|$ divides $|G|$. $A_4$ has order $12$ but no subgroup of order $6$.`,
            },
            {
              question: 'Why is every group of order $p$ prime cyclic and abelian?',
              answerOutline: `A non-identity element generates a subgroup whose order divides $p$ and exceeds $1$, so it is everything. Cyclic groups are abelian.`,
            },
            {
              question: 'Why must $aH=bH$ imply $a^{-1}b\\in H$?',
              answerOutline: `$b=b e\\in bH=aH$, so $b=ah$ for some $h\\in H$, and $a^{-1}b=h$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/fermat-euler-and-rsa'],
        },
        {
          slug: 'normal-subgroups-and-quotients',
          title: 'Normal subgroups and quotient groups',
          summary:
            'Which subgroups let you multiply cosets, and the group of cosets that results.',
          estimatedMinutes: 170,
          objectives: [
            'State equivalent conditions for a subgroup to be normal',
            'Explain exactly why normality makes coset multiplication well defined',
            'Compute a quotient group and identify it up to isomorphism',
            'Use the commutator subgroup to find the largest abelian quotient',
          ],
          concepts: [
            'Normal subgroup $N\\trianglelefteq G$',
            'Conjugate $gNg^{-1}$',
            'Quotient group $G/N$',
            'Natural projection',
            'Centre and commutator subgroup',
            'Simple group',
          ],
          explanation: `A subgroup $N\\le G$ is **normal**, written $N\\trianglelefteq G$, if $gNg^{-1}=N$ for all $g$. Equivalently $gN=Ng$ for all $g$, or $gng^{-1}\\in N$ for all $g\\in G$ and $n\\in N$. Every subgroup of an abelian group is normal, and kernels are always normal. A subgroup of index $2$ is normal, because its one non-trivial left coset and its one non-trivial right coset are both its complement.

Normality is exactly the condition needed to multiply cosets by $(aN)(bN)=abN$. Suppose $aN=a'N$ and $bN=b'N$, so $a'=an_1$ and $b'=bn_2$. Then
$$a'b'=an_1bn_2=ab\\,(b^{-1}n_1b)\\,n_2,$$
and $b^{-1}n_1b\\in N$ by normality, so $a'b'N=abN$. The cosets then form the **quotient group** $G/N$, of order $[G:N]$, with identity $N$. The **natural projection** $g\\mapsto gN$ is a homomorphism with kernel $N$, so normal subgroups are precisely the kernels of homomorphisms.

**Worked example 1: failure without normality.** In $S_3$ let $H=\\{e,(1\\ 2)\\}$. The previous lesson showed that $(1\\ 3)H=(1\\ 2\\ 3)H$. Multiply each representative on the left by $(1\\ 3)$. With the first we get $(1\\ 3)(1\\ 3)=e\\in H$. With the second we get $(1\\ 2\\ 3)(1\\ 3)$, which as a right-to-left product is $(2\\ 3)$, and $(2\\ 3)\\notin H$. Same cosets, different answers, so the product is not defined.

**Worked example 2: a real quotient.** In $D_4$ the centre is $Z=\\{e,r^2\\}$, which is normal. The quotient has order $8/2=4$, with cosets $Z$, $rZ=\\{r,r^3\\}$, $sZ=\\{s,r^2s\\}$ and $rsZ=\\{rs,r^3s\\}$. Each square is trivial: $(rZ)^2=r^2Z=Z$, and $(sZ)^2=Z$, and $(rsZ)^2=Z$. A group of order $4$ with all squares trivial is the Klein group, so $D_4/Z\\cong\\mathbb{Z}_2\\times\\mathbb{Z}_2$.

A quotient of a non-abelian group can be abelian, and the **commutator subgroup** $G'$, generated by all $aba^{-1}b^{-1}$, controls this: $G/N$ is abelian exactly when $G'\\le N$. A non-trivial group whose only normal subgroups are $\\{e\\}$ and itself is **simple**. Simple groups are the atoms from which finite groups are built.`,
          resources: [
            judson('Read the chapter on normal subgroups and factor groups.'),
            conrad('grouptheory/quotientgroups.pdf', 'Quotient groups', 'The best single account of why well-definedness is the issue.'),
            ocw701('Use the lectures on quotient groups for a second view, including correspondence of subgroups.'),
          ],
          exercises: [
            {
              slug: 'index-two',
              title: 'Index two implies normal',
              prompt: `Prove that a subgroup of index $2$ is normal, and show by example that a subgroup of index $3$ need not be.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'cyclic-mod-centre',
              title: 'Cyclic modulo the centre',
              prompt: `Prove that if $G/Z(G)$ is cyclic then $G$ is abelian. Deduce that $|G/Z(G)|$ can never be a prime.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'commutator-subgroup',
              title: 'The commutator subgroup',
              prompt: `Prove that $G'$ is normal and that $G/N$ is abelian if and only if $G'\\le N$. Compute $G'$ for $S_3$, $D_4$ and $Q_8$, and identify $G/G'$ in each case.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'identify-quotients',
              title: 'Identify three quotients',
              prompt: `Identify each quotient as a standard group, with justification: (a) $\\mathbb{Z}_{12}/\\langle 4\\rangle$; (b) $(\\mathbb{Z}_4\\times\\mathbb{Z}_4)/\\langle(2,2)\\rangle$; (c) $(\\mathbb{Z}_4\\times\\mathbb{Z}_2)/\\langle(2,1)\\rangle$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Find the order of the quotient, then the largest order of an element in it.',
            },
            {
              slug: 'normal-subgroups-s4',
              title: 'All normal subgroups of S4',
              prompt: `A normal subgroup is a union of conjugacy classes that contains $e$. Using the cycle types in $S_4$ and their sizes, find all normal subgroups of $S_4$, and justify that there are no others.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The classes have sizes 1, 3, 6, 6 and 8. Which sums including the 1 divide 24? Then check that those sets really are subgroups.',
            },
          ],
          selfAssessment: [
            {
              question: 'Is the rotation subgroup of $D_n$ normal? What is the quotient?',
              answerOutline: `Yes, it has index $2$. The quotient is $\\mathbb{Z}_2$.`,
            },
            {
              question: 'Where exactly does the proof that coset multiplication is well defined use normality?',
              answerOutline: `In moving $n_1$ past $b$: it needs $b^{-1}n_1b\\in N$.`,
            },
            {
              question: 'What is the order of $\\mathbb{Z}/6\\mathbb{Z}$ as a quotient of $\\mathbb{Z}$, and is $\\mathbb{Z}/6\\mathbb{Z}$ a subgroup of $\\mathbb{Z}$?',
              answerOutline: `Order $6$. It is not a subgroup: $\\mathbb{Z}$ has no nontrivial finite subgroups. Quotients need not embed in the original group.`,
            },
          ],
        },
        {
          slug: 'isomorphism-theorems',
          title: 'The isomorphism theorems',
          summary:
            'The first isomorphism theorem identifies every homomorphic image with a quotient, and the others follow from it.',
          estimatedMinutes: 170,
          objectives: [
            'Prove the first isomorphism theorem',
            'Use it to identify quotients by constructing a surjection with the right kernel',
            'State and apply the second and third isomorphism theorems',
            'Use the correspondence theorem to count subgroups',
          ],
          concepts: [
            'First isomorphism theorem',
            'Induced map on the quotient',
            'Second (diamond) isomorphism theorem',
            'Third isomorphism theorem',
            'Correspondence theorem',
          ],
          explanation: `**First isomorphism theorem.** If $\\varphi:G\\to H$ is a homomorphism with kernel $K$, then $K\\trianglelefteq G$ and
$$G/K\\cong\\operatorname{im}\\varphi,\\qquad gK\\mapsto\\varphi(g).$$
The proof has four parts, and each is one line. Well defined: if $gK=g'K$ then $g'=gk$, so $\\varphi(g')=\\varphi(g)\\varphi(k)=\\varphi(g)$. Homomorphism: $gKg'K=gg'K\\mapsto\\varphi(g)\\varphi(g')$. Injective: if $\\varphi(g)=e$ then $g\\in K$, so $gK$ is the identity coset. Surjective onto the image by construction. For finite $G$, this gives $|G|=|\\ker\\varphi|\\,|\\operatorname{im}\\varphi|$.

This changes how you identify quotients. To show $G/N\\cong Q$, do not work with cosets. Instead construct a surjection $G\\to Q$ whose kernel is $N$.

**Worked example.** Show that $\\mathbb{R}/\\mathbb{Z}$ is the circle group $S^1=\\{z\\in\\mathbb{C}:|z|=1\\}$. The map $\\varphi(t)=e^{2\\pi it}$ is a homomorphism from $(\\mathbb{R},+)$ to $(S^1,\\cdot)$, since $e^{2\\pi i(s+t)}=e^{2\\pi is}e^{2\\pi it}$. It is surjective, and $e^{2\\pi it}=1$ exactly when $t\\in\\mathbb{Z}$. So $\\mathbb{R}/\\mathbb{Z}\\cong S^1$. Likewise $\\det$ gives $GL_n(\\mathbb{R})/SL_n(\\mathbb{R})\\cong\\mathbb{R}^\\times$, and the sign gives $S_n/A_n\\cong\\mathbb{Z}_2$ for $n\\ge 2$.

A finite check: define $\\psi:\\mathbb{Z}\\to\\mathbb{Z}_4\\times\\mathbb{Z}_6$ by $k\\mapsto(k\\bmod 4,k\\bmod 6)$. Its kernel is $4\\mathbb{Z}\\cap 6\\mathbb{Z}=12\\mathbb{Z}$, so the image is a copy of $\\mathbb{Z}_{12}$. The codomain has $24$ elements, so $\\psi$ is not surjective, and $\\mathbb{Z}_4\\times\\mathbb{Z}_6$ is not cyclic.

**Second theorem.** If $H\\le G$ and $N\\trianglelefteq G$, then $HN$ is a subgroup, $H\\cap N\\trianglelefteq H$, and $HN/N\\cong H/(H\\cap N)$. **Third theorem.** If $N\\le M$ are both normal in $G$, then $(G/N)/(M/N)\\cong G/M$. Both follow by applying the first theorem to an obvious map.

**Correspondence.** If $N\\trianglelefteq G$, then subgroups of $G/N$ correspond bijectively to subgroups of $G$ containing $N$, by $M\\mapsto M/N$. The correspondence preserves inclusion, index and normality. So the subgroup lattice of a quotient is the part of the lattice of $G$ above $N$.`,
          resources: [
            judson('Read the chapter on homomorphisms for all three theorems.'),
            ocw701('The lectures on the correspondence theorem and quotient groups cover this with examples.'),
            conrad('grouptheory/quotientgroups.pdf', 'Quotient groups', 'Revisit the section on the first isomorphism theorem and its use.'),
          ],
          exercises: [
            {
              slug: 'second-theorem',
              title: 'Prove the second theorem',
              prompt: `Let $H\\le G$ and $N\\trianglelefteq G$. Prove that $HN$ is a subgroup, $H\\cap N\\trianglelefteq H$, and $HN/N\\cong H/(H\\cap N)$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Apply the first theorem to the map from H to G/N given by h goes to hN.',
            },
            {
              slug: 'third-theorem',
              title: 'Prove the third theorem',
              prompt: `Let $N\\le M$ be normal subgroups of $G$. Prove that $M/N\\trianglelefteq G/N$ and $(G/N)/(M/N)\\cong G/M$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 's4-mod-v4',
              title: 'S4 modulo the Klein group',
              prompt: `Let $V=\\{e,(1\\ 2)(3\\ 4),(1\\ 3)(2\\ 4),(1\\ 4)(2\\ 3)\\}\\trianglelefteq S_4$. Show that $S_4$ acts on the three ways of splitting $\\{1,2,3,4\\}$ into two pairs, and use the first isomorphism theorem to prove that $S_4/V\\cong S_3$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'correspondence-count',
              title: 'Counting with the correspondence',
              prompt: `How many subgroups of $\\mathbb{Z}_{36}$ contain $\\langle 12\\rangle$? Answer in two ways: directly from divisors, and through the correspondence theorem.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'circle-torsion',
              title: 'Torsion in the circle group',
              prompt: `Under $\\mathbb{R}/\\mathbb{Z}\\cong S^1$, identify the subgroup of elements of finite order on each side, and prove it equals $\\mathbb{Q}/\\mathbb{Z}$. Show that $\\mathbb{Q}/\\mathbb{Z}$ has exactly one subgroup of each finite order $n$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the four things to check in the proof of the first isomorphism theorem?',
              answerOutline: `The induced map is well defined, a homomorphism, injective, and onto the image.`,
            },
            {
              question: 'Give a one-line proof that $GL_n(\\mathbb{R})/SL_n(\\mathbb{R})\\cong\\mathbb{R}^\\times$.',
              answerOutline: `$\\det$ is a surjective homomorphism onto $\\mathbb{R}^\\times$ with kernel $SL_n(\\mathbb{R})$.`,
            },
            {
              question: 'If $G$ has a homomorphism onto $\\mathbb{Z}_5$, what must be true of $|G|$ when $G$ is finite?',
              answerOutline: `$5$ divides $|G|$, since $|G|=|\\ker\\varphi|\\cdot 5$.`,
            },
          ],
        },
        {
          slug: 'direct-products-and-finite-abelian-groups',
          title: 'Direct products and finite abelian groups',
          summary:
            'Building groups from smaller ones, and the classification of all finite abelian groups.',
          estimatedMinutes: 160,
          objectives: [
            'Compute orders of elements in a direct product',
            'Prove that $\\mathbb{Z}_m\\times\\mathbb{Z}_n\\cong\\mathbb{Z}_{mn}$ exactly when $\\gcd(m,n)=1$',
            'Recognise an internal direct product',
            'List all abelian groups of a given order in both standard forms',
          ],
          concepts: [
            'External direct product',
            'Internal direct product',
            'Order in a product is an lcm',
            'Fundamental theorem of finite abelian groups',
            'Elementary divisors',
            'Invariant factors',
          ],
          explanation: `The **direct product** $G\\times H$ has componentwise operation. The order of $(g,h)$ is $\\operatorname{lcm}(|g|,|h|)$. So $\\mathbb{Z}_m\\times\\mathbb{Z}_n$ has an element of order $mn$ exactly when $\\gcd(m,n)=1$, and
$$\\mathbb{Z}_m\\times\\mathbb{Z}_n\\cong\\mathbb{Z}_{mn}\\iff\\gcd(m,n)=1.$$
This is the group form of the Chinese remainder theorem.

Products also appear from the inside. If $N,K\\trianglelefteq G$ with $N\\cap K=\\{e\\}$ and $NK=G$, then $G\\cong N\\times K$. The key step: for $n\\in N$ and $k\\in K$, the commutator $nkn^{-1}k^{-1}$ lies in both $N$ and $K$, so it is $e$, and so $N$ and $K$ commute with each other. Both subgroups must be normal. In $S_3$, $A_3$ and $\\langle(1\\ 2)\\rangle$ meet trivially and have product $S_3$, but $S_3$ is not $\\mathbb{Z}_3\\times\\mathbb{Z}_2$, which is abelian. The hypothesis that fails is that $\\langle(1\\ 2)\\rangle$ is normal.

**Fundamental theorem of finite abelian groups.** Every finite abelian group is a direct product of cyclic groups of prime power order, and these prime powers (the **elementary divisors**) are unique up to order. Equivalently, it is uniquely $\\mathbb{Z}_{n_1}\\times\\dots\\times\\mathbb{Z}_{n_k}$ with $n_i>1$ and $n_1\\mid n_2\\mid\\dots\\mid n_k$ (the **invariant factors**). We take the proof from the references. For a prime power $p^a$, abelian groups of order $p^a$ correspond to partitions of $a$.

**Worked example.** List the abelian groups of order $72=2^3\\cdot 3^2$. The partitions of $3$ are $3$, $2+1$, $1+1+1$, and the partitions of $2$ are $2$, $1+1$. Choosing one of each gives $3\\cdot 2=6$ groups. In elementary divisor form the $2$-part is one of $\\mathbb{Z}_8$, $\\mathbb{Z}_2\\times\\mathbb{Z}_4$, $\\mathbb{Z}_2^3$, and the $3$-part is $\\mathbb{Z}_9$ or $\\mathbb{Z}_3^2$. To convert to invariant factors, write the prime powers for each prime in a row, right-aligned with the largest last, and multiply down each column. For $\\mathbb{Z}_2\\times\\mathbb{Z}_4\\times\\mathbb{Z}_3\\times\\mathbb{Z}_3$:
$$\\begin{matrix}2&4\\\\3&3\\end{matrix}\\quad\\Rightarrow\\quad\\mathbb{Z}_6\\times\\mathbb{Z}_{12}.$$
The six invariant factor forms are $\\mathbb{Z}_{72}$, $\\mathbb{Z}_2\\times\\mathbb{Z}_{36}$, $\\mathbb{Z}_3\\times\\mathbb{Z}_{24}$, $\\mathbb{Z}_6\\times\\mathbb{Z}_{12}$, $\\mathbb{Z}_2\\times\\mathbb{Z}_2\\times\\mathbb{Z}_{18}$ and $\\mathbb{Z}_2\\times\\mathbb{Z}_6\\times\\mathbb{Z}_6$. In each the $n_i$ divide in a chain and multiply to $72$. The largest invariant factor is the **exponent**, the least $m$ with $mx=0$ for all $x$.`,
          resources: [
            judson('Read the chapters on isomorphisms (direct products) and on the structure of groups.'),
            conrad('grouptheory/finite-abelian.pdf', 'Decomposition of finite abelian groups', 'A proof of the structure theorem to read after the statement is familiar.'),
            ocw703('Use the notes on products and abelian groups for further examples.'),
          ],
          exercises: [
            {
              slug: 'product-cyclic',
              title: 'When a product is cyclic',
              prompt: `Prove that $\\mathbb{Z}_m\\times\\mathbb{Z}_n\\cong\\mathbb{Z}_{mn}$ if and only if $\\gcd(m,n)=1$. Include a proof that the order of $(g,h)$ in a direct product is $\\operatorname{lcm}(|g|,|h|)$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'internal-direct',
              title: 'Internal direct products',
              prompt: `Let $N,K\\trianglelefteq G$ with $N\\cap K=\\{e\\}$ and $NK=G$. Prove that $(n,k)\\mapsto nk$ is an isomorphism $N\\times K\\to G$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'classify-360',
              title: 'Abelian groups of order 360',
              prompt: `List all abelian groups of order $360$ up to isomorphism, in both elementary divisor and invariant factor form. Which of them have an element of order $60$? Which have exponent $30$?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'unit-group-structure',
              title: 'Structure of three unit groups',
              prompt: `Decompose $U(15)$, $U(16)$ and $U(24)$ as products of cyclic groups. Which of the three are isomorphic to each other?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Count solutions of x^2 = 1, and use the group form of the Chinese remainder theorem for U(15) and U(24).',
            },
            {
              slug: 'count-elements-by-order',
              title: 'Counting elements of each order',
              prompt: `In $G=\\mathbb{Z}_2\\times\\mathbb{Z}_4\\times\\mathbb{Z}_6$ count the solutions of $2x=0$, of $4x=0$ and of $3x=0$. Deduce the number of elements of order $2$, of order $3$ and of order $4$. Prove in general that a finite abelian group is cyclic if and only if, for each $n$, the equation $nx=0$ has at most $n$ solutions.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How many abelian groups of order $p^4$ are there for a prime $p$?',
              answerOutline: `Five, one for each partition of $4$: $4$, $3+1$, $2+2$, $2+1+1$, $1+1+1+1$.`,
            },
            {
              question: 'Why is $S_3$ not the internal direct product of $A_3$ and $\\langle(1\\ 2)\\rangle$?',
              answerOutline: `$\\langle(1\\ 2)\\rangle$ is not normal in $S_3$. An internal direct product of two abelian groups would be abelian.`,
            },
            {
              question: 'Is $\\mathbb{Z}_4\\times\\mathbb{Z}_6$ cyclic? What are its invariant factors?',
              answerOutline: `No, because $\\gcd(4,6)=2$. It is $\\mathbb{Z}_2\\times\\mathbb{Z}_{12}$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'quotient-lab',
        title: 'Quotient lab',
        description: `Extend your group explorer with normal subgroups and quotients, and use it to test the theorems of this module on every small case you can reach. The program should find all normal subgroups, build quotient groups as new \`FiniteGroup\` objects, and give an identification of small groups by their order statistics. Then verify the first isomorphism theorem by machine: for every homomorphism between two small groups, build the quotient by the kernel and an explicit isomorphism to the image. As a check, you should find $4$ normal subgroups in $S_4$, $6$ in $D_4$, $6$ in $Q_8$ and $3$ in $A_4$.`,
        deliverables: [
          'A function that lists normal subgroups and one that builds $G/N$ with its Cayley table',
          'A homomorphism finder that searches assignments on generators and verifies each candidate',
          'A verification of the first isomorphism theorem for all homomorphisms among at least four pairs of groups',
          'A table of quotients of $S_4$, $D_6$ and $Q_8$ identified up to isomorphism',
          'A list of the abelian groups of order at most $100$ produced from partitions, cross-checked by order statistics for order $16$',
        ],
        estimatedHours: 8,
        stretchGoals: ['Compute composition series and check the uniqueness of composition factors on examples'],
      },
    },
    {
      slug: 'group-actions',
      title: 'Group Actions and the Sylow Theorems',
      description:
        'Letting a group act on a set turns counting into structure: orbit-stabiliser, Burnside\'s lemma, the class equation and the Sylow theorems.',
      lessons: [
        {
          slug: 'orbits-and-stabilisers',
          title: 'Actions, orbits and stabilisers',
          summary:
            'A group acting on a set, and the orbit-stabiliser theorem that links the size of an orbit to the group.',
          estimatedMinutes: 160,
          objectives: [
            'Define a group action and translate it into a homomorphism to a symmetric group',
            'Prove the orbit-stabiliser theorem',
            'Compute the orders of geometric symmetry groups by orbit-stabiliser',
            'Use the action on cosets to find normal subgroups',
          ],
          concepts: [
            'Group action',
            'Orbit and stabiliser',
            'Transitive and faithful actions',
            'Orbit-stabiliser theorem',
            'Action on cosets',
            'Permutation representation',
          ],
          explanation: `A (left) **action** of $G$ on a set $X$ is a map $G\\times X\\to X$, written $(g,x)\\mapsto g\\cdot x$, with $e\\cdot x=x$ and $(gh)\\cdot x=g\\cdot(h\\cdot x)$. Each $g$ then permutes $X$, with inverse given by $g^{-1}$, and $g\\mapsto(x\\mapsto g\\cdot x)$ is a homomorphism $G\\to\\operatorname{Sym}(X)$. Conversely any such homomorphism is an action. Its kernel is the set of elements that fix everything. If that kernel is trivial the action is **faithful**.

The **orbit** of $x$ is $Gx=\\{g\\cdot x:g\\in G\\}$, and the **stabiliser** is $G_x=\\{g:g\\cdot x=x\\}$, which is a subgroup. Orbits partition $X$. If there is one orbit the action is **transitive**.

**Orbit-stabiliser theorem.** The map $gG_x\\mapsto g\\cdot x$ is a well-defined bijection from left cosets of $G_x$ to the orbit $Gx$. So for finite $G$,
$$|G|=|Gx|\\cdot|G_x|.$$
Indeed $g\\cdot x=h\\cdot x$ exactly when $g^{-1}h\\in G_x$ exactly when $gG_x=hG_x$, which proves both well-definedness and injectivity at once.

**Worked example.** How many rotations does a cube have? Let the rotation group $G$ act on the six faces. Any face can be rotated to any other, so the orbit has size $6$. The stabiliser of the top face consists of rotations about the vertical axis by $0^\\circ,90^\\circ,180^\\circ,270^\\circ$, so it has size $4$. Thus $|G|=6\\cdot 4=24$. You did not have to list anything, and you can cross-check: acting on the $8$ vertices, a stabiliser has size $3$ (rotations about a long diagonal), and $8\\cdot 3=24$. Acting on the $12$ edges, a stabiliser has size $2$, and $12\\cdot 2=24$.

**Action on cosets.** $G$ acts on the left cosets of a subgroup $H$ by $g\\cdot aH=gaH$. This is transitive with stabiliser $H$ at the coset $H$. If $[G:H]=n$ we get a homomorphism $G\\to S_n$ whose kernel lies inside $H$ and is normal in $G$. If $|G|$ does not divide $n!$, that kernel cannot be trivial. This is a simple but powerful way of proving that groups have proper non-trivial normal subgroups.`,
          resources: [
            judson('Read the chapter on group actions, including the examples on colourings.'),
            conrad('grouptheory/gpaction.pdf', 'Group actions', 'Many examples, and the consequences used through this module.'),
            conrad('grouptheory/transitive.pdf', 'Transitive group actions', 'What transitivity means and how to detect it.'),
          ],
          exercises: [
            {
              slug: 'stabiliser-subgroup',
              title: 'Stabilisers along an orbit',
              prompt: `Prove that $G_x$ is a subgroup and that $G_{g\\cdot x}=gG_xg^{-1}$. Deduce that a transitive action has stabilisers that are all conjugate. Give the action of $S_4$ on $\\{1,2,3,4\\}$ as an example, naming the stabiliser of $1$ and of $3$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'tetrahedron-rotations',
              title: 'Rotations of a tetrahedron',
              prompt: `Use orbit-stabiliser to show that the rotation group of a regular tetrahedron has order $12$. By acting on the four vertices, prove that this group is isomorphic to $A_4$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'smallest-prime-index',
              title: 'Index the smallest prime',
              prompt: `Let $H\\le G$ with $G$ finite and $[G:H]=p$, where $p$ is the smallest prime dividing $|G|$. Prove that $H$ is normal. State where the assumption on $p$ is used.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Let G act on the cosets of H, with kernel N inside H. Then [H:N] divides (p-1)!, and also divides the order of G.',
            },
            {
              slug: 'p-group-fixed-points',
              title: 'Fixed points of a p-group',
              prompt: `Let a group of order $p^k$ act on a finite set $X$. Prove that $|X|\\equiv|X^G|\\pmod p$, where $X^G$ is the set of fixed points. Deduce that if $p\\nmid|X|$ then there is a fixed point.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'no-simple-of-index-small',
              title: 'A small-index subgroup forces a normal subgroup',
              prompt: `Prove that a group $G$ with a subgroup of index $n>1$, where $|G|\\nmid n!$, is not simple. Apply this to show that no group of order $48$ with a subgroup of order $16$ is simple.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the orbit-stabiliser theorem and give the bijection behind it.',
              answerOutline: `$|G|=|Gx||G_x|$. The map from left cosets of $G_x$ to the orbit is $gG_x\\mapsto g\\cdot x$.`,
            },
            {
              question: 'What is the kernel of the action of $G$ on the cosets of $H$?',
              answerOutline: `$\\bigcap_{g\\in G}gHg^{-1}$, the largest normal subgroup of $G$ inside $H$.`,
            },
            {
              question: 'How big is the stabiliser of a vertex in the rotation group of the cube, and what does it consist of?',
              answerOutline: `Size $3$: rotations by $0^\\circ,120^\\circ,240^\\circ$ about the diagonal through that vertex.`,
            },
          ],
        },
        {
          slug: 'burnside-counting',
          title: 'Burnside\'s lemma and counting with symmetry',
          summary:
            'Counting orbits by averaging fixed points, with necklaces and coloured cubes as the main examples.',
          estimatedMinutes: 150,
          objectives: [
            'Prove Burnside\'s lemma by double counting',
            'Count colourings up to symmetry',
            'Classify a symmetry group by cycle type on the objects being coloured',
            'Check small counts by brute force',
          ],
          concepts: [
            'Fixed set $\\operatorname{Fix}(g)$',
            'Burnside\'s lemma',
            'Double counting',
            'Colourings as functions',
            'Cycles of a permutation on positions',
          ],
          explanation: `Suppose a finite group $G$ acts on a finite set $X$. **Burnside's lemma** says the number of orbits is the average number of fixed points:
$$\\#\\text{orbits}=\\frac{1}{|G|}\\sum_{g\\in G}|\\operatorname{Fix}(g)|,\\qquad\\operatorname{Fix}(g)=\\{x:g\\cdot x=x\\}.$$
The proof counts the pairs $(g,x)$ with $g\\cdot x=x$ in two ways. Summing over $g$ gives $\\sum_g|\\operatorname{Fix}(g)|$. Summing over $x$ gives $\\sum_x|G_x|=\\sum_x|G|/|Gx|$. Each orbit $O$ contributes $|O|\\cdot|G|/|O|=|G|$ to this sum, so the total is $|G|$ times the number of orbits.

Its main use is counting things up to symmetry. When $X$ is the set of colourings of some positions with $k$ colours, and $g$ permutes the positions, a colouring is fixed by $g$ exactly when it is constant on each cycle of $g$. So
$$|\\operatorname{Fix}(g)|=k^{c(g)},$$
where $c(g)$ is the number of cycles of $g$ on the positions, counting fixed positions as cycles. You work with the action on positions, grouping elements of $G$ with the same cycle structure.

**Worked example.** How many necklaces have $6$ beads in $2$ colours, if rotations count as the same? Take $G=\\mathbb{Z}_6$ acting on the positions. The rotation by $j$ places has $\\gcd(6,j)$ cycles.

| rotation $j$ | cycles | fixed colourings |
|---|---|---|
| $0$ | $6$ | $64$ |
| $1,5$ | $1$ | $2$ each |
| $2,4$ | $2$ | $4$ each |
| $3$ | $3$ | $8$ |

The sum is $64+2+2+4+4+8=84$, and $84/6=14$. So there are $14$ necklaces. If reflections also count as the same, the group is $D_6$. The three reflections through opposite beads have $4$ cycles, and the three through opposite gaps have $3$ cycles. So the sum is $84+3\\cdot 16+3\\cdot 8=156$, and $156/12=13$ bracelets.

Do not forget hypotheses: if $G$ acts non-faithfully, the formula still holds as long as you sum over all of $G$. Also, the group must really act on the set you count, so "colourings using each colour exactly twice" works only because symmetries preserve that condition. In that case you must count fixed colourings directly, and the formula $k^{c(g)}$ no longer applies.`,
          resources: [
            judson('The chapter on group actions ends with this counting theorem and its use on colourings.'),
            conrad('grouptheory/gpaction.pdf', 'Group actions', 'See the part on counting orbits.'),
            ocw703('Use the notes on group actions and counting for further worked cases.'),
          ],
          exercises: [
            {
              slug: 'burnside-proof',
              title: 'Write the proof',
              prompt: `Write out a full proof of Burnside's lemma, stating where the finiteness of $G$ and $X$ is used.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'necklaces-and-fermat',
              title: 'Necklaces prove Fermat',
              prompt: `For a prime $p$ and an integer $a\\ge 1$, show that the number of necklaces of $p$ beads in $a$ colours under rotation is $(a^p+(p-1)a)/p$. Deduce Fermat's little theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cube-faces',
              title: 'Colouring the faces of a cube',
              prompt: `The rotation group of the cube has $24$ elements. Sort them by type of axis and angle, find the number of cycles each has on the six faces, and derive a polynomial formula in $k$ for the number of face-colourings up to rotation. Evaluate it for $k=2$ and $k=3$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'grid-colourings',
              title: 'Black and white grids',
              prompt: `Count the black-and-white colourings of a $3\\times 3$ grid up to the $8$ symmetries of the square. Verify your answer by a short brute-force program.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fixed-point-free',
              title: 'A fixed-point-free element',
              prompt: `Let a finite group act transitively on a set with at least two elements. Prove that some element of the group has no fixed point.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For a transitive action the average number of fixed points is 1, and the identity is well above average.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $|\\operatorname{Fix}(g)|=k^{c(g)}$ for colourings?',
              answerOutline: `A colouring is fixed by $g$ exactly when it is constant on each cycle of $g$, and each of the $c(g)$ cycles may get any of $k$ colours.`,
            },
            {
              question: 'How many cycles does rotation by $j$ have on $n$ positions?',
              answerOutline: `$\\gcd(n,j)$, each of length $n/\\gcd(n,j)$.`,
            },
            {
              question: 'How many $5$-bead necklaces in $2$ colours are there up to rotation?',
              answerOutline: `$(32+4\\cdot 2)/5=8$.`,
            },
          ],
        },
        {
          slug: 'conjugacy-and-the-class-equation',
          title: 'Conjugacy and the class equation',
          summary:
            'A group acting on itself by conjugation, and what the resulting count says about p-groups.',
          estimatedMinutes: 160,
          objectives: [
            'Compute conjugacy classes and centralisers',
            'State and use the class equation',
            'Prove that a non-trivial $p$-group has non-trivial centre',
            'Use class sizes to prove that $A_5$ is simple',
          ],
          concepts: [
            'Conjugacy class',
            'Centraliser $C_G(x)$',
            'Class equation',
            '$p$-group',
            'Normaliser $N_G(H)$',
            'Simplicity of $A_5$',
          ],
          explanation: `A group acts on itself by **conjugation**: $g\\cdot x=gxg^{-1}$. The orbits are the **conjugacy classes**. The stabiliser of $x$ is its **centraliser** $C_G(x)=\\{g:gx=xg\\}$. So orbit-stabiliser gives $|\\operatorname{cl}(x)|=[G:C_G(x)]$, and every class size divides $|G|$. An element has a class of size $1$ exactly when it lies in the centre $Z(G)$.

Partitioning $G$ into classes gives the **class equation**: if $x_1,\\dots,x_k$ represent the classes of size greater than $1$, then
$$|G|=|Z(G)|+\\sum_{i=1}^k[G:C_G(x_i)].$$

**Worked example.** In $D_4$ we have $Z=\\{e,r^2\\}$. Since $srs=r^{-1}$, the class of $r$ is $\\{r,r^3\\}$, with centraliser $\\langle r\\rangle$. For $s$, conjugating by $r$ gives $rsr^{-1}=r^2s$, so the class is $\\{s,r^2s\\}$, and likewise $\\{rs,r^3s\\}$. The equation reads $8=2+2+2+2$. In $S_n$ the classes are exactly the cycle types, by the conjugation formula for cycles. So $S_4$ has classes of sizes $1,6,3,8,6$ for types $(1^4)$, $(2,1,1)$, $(2,2)$, $(3,1)$, $(4)$, which sum to $24$.

**$p$-groups.** A group of order $p^n$ with $n\\ge 1$ has non-trivial centre. Every term $[G:C_G(x_i)]$ is greater than $1$ and divides $p^n$, so it is divisible by $p$. Then $p$ divides $|G|$ and the sum, so $p$ divides $|Z(G)|$, which is therefore not $1$. A consequence: every group of order $p^2$ is abelian. If not, $|Z(G)|=p$ and $G/Z(G)$ has order $p$, so it is cyclic, and a group that is cyclic modulo its centre is abelian.

**Normal subgroups and classes.** A normal subgroup is a union of conjugacy classes. So class sizes can rule out normal subgroups. In $A_5$, the classes have sizes $1,12,12,15,20$. The $5$-cycles split into two classes, because a $5$-cycle's centraliser in $S_5$ has order $5$ and contains no odd permutation. A normal subgroup has order dividing $60$ and is a union of classes including $\\{e\\}$. No proper non-trivial sum of those sizes including the $1$ divides $60$. So $A_5$ is simple, the smallest non-abelian simple group.`,
          resources: [
            judson('The chapter on group actions covers the class equation and $p$-groups.'),
            conrad('grouptheory/conjclass.pdf', 'Conjugation in a group', 'Conjugacy classes in many examples.'),
            conrad('grouptheory/Ansimple.pdf', 'Simplicity of An', 'Proofs that the alternating groups are simple, starting with $A_5$.'),
          ],
          exercises: [
            {
              slug: 'class-sizes-s5',
              title: 'The classes of S5',
              prompt: `List the conjugacy classes of $S_5$ with their sizes and the order of a centraliser in each. Find every normal subgroup of $S_5$ using the fact that $A_5$ is simple.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'p-squared-abelian',
              title: 'Groups of order p squared',
              prompt: `Prove that a group of order $p^2$, for a prime $p$, is isomorphic to either $\\mathbb{Z}_{p^2}$ or $\\mathbb{Z}_p\\times\\mathbb{Z}_p$, and that these two groups are not isomorphic.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'normal-meets-centre',
              title: 'Normal subgroups meet the centre',
              prompt: `Let $G$ be a finite $p$-group and $N\\ne\\{e\\}$ a normal subgroup of $G$. Prove that $N$ meets the centre non-trivially, that is, $N\\cap Z(G)\\ne\\{e\\}$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Let G act on N by conjugation and use the fixed-point congruence for p-groups.',
            },
            {
              slug: 'a5-simple',
              title: 'Prove A5 is simple',
              prompt: `Verify the class sizes $1,12,12,15,20$ of $A_5$, including the split of the $5$-cycles, and complete the proof that $A_5$ is simple. Show by example that a similar argument cannot rule out the subgroup $V$ in $A_4$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'commuting-probability',
              title: 'The five-eighths bound',
              prompt: `Let $k(G)$ be the number of conjugacy classes of a finite group. Prove that the number of commuting pairs $(x,y)\\in G\\times G$ is $k(G)|G|$. Deduce that in a non-abelian group, two uniformly random elements commute with probability at most $5/8$, and show that $D_4$ attains this.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If G is non-abelian then G/Z(G) is not cyclic, so the centre has at most a quarter of the elements. Non-central classes have size at least 2.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a class size always divide $|G|$?',
              answerOutline: `It equals the index $[G:C_G(x)]$ by orbit-stabiliser.`,
            },
            {
              question: 'Is a conjugacy class ever a subgroup?',
              answerOutline: `Only $\\{e\\}$: every other class omits the identity, because $e$ is alone in its own class.`,
            },
            {
              question: 'How does the class equation give a non-trivial centre for a $p$-group?',
              answerOutline: `Non-central class sizes are powers of $p$ greater than $1$, so $p$ divides $|Z(G)|=|G|-\\sum[G:C_G(x_i)]$.`,
            },
          ],
        },
        {
          slug: 'sylow-theorems',
          title: 'The Sylow theorems',
          summary:
            'A partial converse to Lagrange: the existence, conjugacy and number of maximal p-subgroups, and how to use them.',
          estimatedMinutes: 200,
          objectives: [
            'State the three Sylow theorems with every hypothesis',
            'Follow a proof of existence using a group action',
            'Compute the possible values of $n_p$',
            'Prove that groups of given small orders are not simple',
          ],
          concepts: [
            'Sylow $p$-subgroup',
            '$n_p$, the number of Sylow $p$-subgroups',
            'Conjugacy of Sylow subgroups',
            'Normaliser',
            'Cauchy\'s theorem',
            'Element-counting arguments',
          ],
          explanation: `Let $|G|=p^am$ with $p$ prime, $a\\ge 1$ and $p\\nmid m$. A subgroup of order $p^a$ is a **Sylow $p$-subgroup**. Let $n_p$ be the number of them.

**Sylow's theorems.** (1) Sylow $p$-subgroups exist. (2) Any two are conjugate, and every $p$-subgroup lies in one. (3) $n_p\\equiv 1\\pmod p$ and $n_p\\mid m$. Also $n_p=[G:N_G(P)]$ for any Sylow subgroup $P$.

**Why they exist.** Let $G$ act by left multiplication on the set of all subsets of size $p^a$. There are $\\binom{p^am}{p^a}$ of them, and this number is congruent to $m$ modulo $p$, so it is not divisible by $p$. Hence some orbit has size not divisible by $p$. Let $A$ be in that orbit, with stabiliser $S$. Then $|S|$ equals $|G|$ divided by the size of that orbit, so it is divisible by $p^a$. But $SA=A$, so $A$ is a union of right cosets $Sa$, and $|S|$ divides $|A|=p^a$. So $|S|=p^a$.

For (2) and (3), fix a Sylow subgroup $P$ and let it act on the Sylow subgroups by conjugation. The only fixed point is $P$ itself, which gives the congruence by the fixed-point lemma. The full proof is in the references, and you should read it once.

A useful corollary: a Sylow $p$-subgroup is normal exactly when $n_p=1$, since conjugation permutes the Sylow subgroups transitively.

**Worked example 1.** Every group of order $15$ is cyclic. Here $n_3\\mid 5$ and $n_3\\equiv 1\\pmod 3$ force $n_3=1$. Also $n_5\\mid 3$ and $n_5\\equiv 1\\pmod 5$ force $n_5=1$. So $G$ has normal subgroups $P_3$ and $P_5$ with trivial intersection and product of size $15$, and $G\\cong\\mathbb{Z}_3\\times\\mathbb{Z}_5\\cong\\mathbb{Z}_{15}$.

**Worked example 2.** No group of order $12$ is simple. We have $n_3\\in\\{1,4\\}$. If $n_3=1$ we are done. If $n_3=4$, the four subgroups of order $3$ meet pairwise trivially, which gives $4\\cdot 2=8$ elements of order $3$. Only $4$ elements remain, and a Sylow $2$-subgroup of order $4$ consists of elements outside that set. So it must be exactly those $4$ elements, and hence it is unique, thus normal. $A_4$ is the second case.

Element counting of this kind, together with the action on Sylow subgroups giving $G\\to S_{n_p}$, settles most small orders.`,
          resources: [
            judson('Read the chapter on the Sylow theorems, including the applications to finite simple groups.'),
            conrad('grouptheory/sylowpf.pdf', 'The Sylow theorems: proof', 'Complete proofs of the three theorems.'),
            conrad('grouptheory/sylowapp.pdf', 'The Sylow theorems: consequences', 'Applications to groups of small order.'),
            sympyGroups('`PermutationGroup.sylow_subgroup(p)` computes one Sylow subgroup, which is handy for checks.'),
          ],
          exercises: [
            {
              slug: 'cauchy-by-tuples',
              title: 'Cauchy\'s theorem',
              prompt: `Let $p$ be a prime dividing $|G|$. Let $\\mathbb{Z}_p$ act by cyclic shift on the set of tuples $(g_1,\\dots,g_p)\\in G^p$ with $g_1\\cdots g_p=e$. Use the fixed-point congruence to prove that $G$ has an element of order $p$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'The tuple set has size equal to |G| to the power p-1. Fixed points are constant tuples, and the all-e tuple is one of them.',
            },
            {
              slug: 'order-pq',
              title: 'Groups of order pq',
              prompt: `Let $p<q$ be primes with $p\\nmid q-1$. Prove that every group of order $pq$ is cyclic. Which orders among $33$, $35$, $39$ and $51$ does this settle?`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'no-simple-56',
              title: 'No simple group of order 56',
              prompt: `Prove that no group of order $56$ is simple, by considering the possible values of $n_7$ and counting the elements of order $7$ in the larger case.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'no-simple-30-36',
              title: 'Orders 30 and 36',
              prompt: `Prove that no group of order $30$ is simple, by an element count. Then prove that no group of order $36$ is simple, using the action on the Sylow $3$-subgroups.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'sylow-census',
              title: 'A Sylow census',
              prompt: `Find $n_2$, $n_3$ and, where relevant, $n_5$ for $S_4$, $A_5$ and $S_5$, by counting elements or by computer. Give one Sylow $2$-subgroup of each explicitly, and name its isomorphism type.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the possible values of $n_7$ in a group of order $84$?',
              answerOutline: `$84=7\\cdot 12$, so $n_7\\mid 12$ and $n_7\\equiv 1\\pmod 7$, leaving $n_7=1$.`,
            },
            {
              question: 'What does $n_p=1$ tell you?',
              answerOutline: `The unique Sylow $p$-subgroup is normal, as every conjugate is also Sylow.`,
            },
            {
              question: 'Why may subgroups of prime order be counted by element counts without overlap?',
              answerOutline: `Two distinct subgroups of prime order meet trivially, as their intersection is a proper subgroup of a group of prime order. Larger Sylow subgroups may overlap.`,
            },
          ],
        },
      ],
      project: {
        slug: 'symmetry-census',
        title: 'Symmetry census',
        description: `Combine your group explorer with Burnside's lemma. Write a program that accepts a permutation group acting on positions and counts colourings up to symmetry, both by Burnside and by enumerating orbits directly, and confirm that the two agree. Then add a Sylow finder and tabulate $n_p$ for small groups, checking that each number obeys the theorems. Your outputs should include $14$ necklaces and $13$ bracelets for $6$ beads in $2$ colours, $10$ and $57$ face-colourings of a cube for $2$ and $3$ colours, and $102$ colourings of a $3\\times 3$ grid.`,
        deliverables: [
          'A function that computes orbit counts by Burnside from a list of generators',
          'A brute-force orbit counter that agrees with it on at least six examples',
          'A polynomial in $k$ for the colourings of the cube\'s faces, vertices and edges',
          'A table of $n_2,n_3,n_5$ for $S_3$, $S_4$, $S_5$, $A_4$, $A_5$, $D_6$ and $Q_8$',
          'A short proof, in your own words, of one non-simplicity result from the data',
        ],
        estimatedHours: 7,
        stretchGoals: ['Find all conjugacy classes and print the class equation for each group'],
      },
    },
    {
      slug: 'rings',
      title: 'Rings',
      description:
        'Two operations at once: rings, ideals, quotient rings and the prime and maximal ideals that decide when a quotient is a domain or a field.',
      lessons: [
        {
          slug: 'rings-and-integral-domains',
          title: 'Rings, units and integral domains',
          summary:
            'The ring axioms, zero divisors and units, and why a finite domain is a field.',
          estimatedMinutes: 150,
          objectives: [
            'State the ring axioms and test examples',
            'Classify elements of $\\mathbb{Z}_n$ as units or zero divisors',
            'Use a norm to find units',
            'Prove that a finite integral domain is a field',
          ],
          concepts: [
            'Ring with identity',
            'Commutative ring',
            'Unit and group of units',
            'Zero divisor',
            'Integral domain',
            'Field',
            'Norm on $\\mathbb{Z}[i]$',
          ],
          explanation: `A **ring** is a set $R$ with addition and multiplication such that $(R,+)$ is an abelian group, multiplication is associative with an identity $1$, and both distributive laws hold. In this course every ring has a $1$. Be aware that some books drop that requirement. A ring is **commutative** if $ab=ba$ for all $a,b$. Examples: $\\mathbb{Z}$, $\\mathbb{Z}_n$, $\\mathbb{Q}$, $\\mathbb{Z}[i]$, polynomial rings, and $M_n(\\mathbb{R})$, which is non-commutative for $n\\ge 2$.

From the axioms, $0\\cdot a=0$, because $0a=(0+0)a=0a+0a$, and $(-a)b=-(ab)$. If $1=0$ then $R=\\{0\\}$, the zero ring, so we usually assume $1\\ne 0$.

An element $u$ is a **unit** if it has a two-sided inverse. The units form a group $R^\\times$. A nonzero $a$ is a **zero divisor** if $ab=0$ or $ba=0$ for some nonzero $b$. A commutative ring with $1\\ne 0$ and no zero divisors is an **integral domain**. There you can cancel: $ab=ac$ and $a\\ne 0$ give $a(b-c)=0$, so $b=c$. A commutative ring with $1\\ne 0$ in which every nonzero element is a unit is a **field**. A unit is never a zero divisor, so fields are domains.

**Finite domains are fields.** If $R$ is a finite domain and $a\\ne 0$, then $x\\mapsto ax$ is injective by cancellation, so it is surjective because $R$ is finite, and some $x$ has $ax=1$. Finiteness is essential: $\\mathbb{Z}$ is a domain that is not a field. So $\\mathbb{Z}_n$ is a domain exactly when it is a field, exactly when $n$ is prime.

**Worked example.** Classify the elements of $\\mathbb{Z}_{12}$. An element $a$ is a unit exactly when $\\gcd(a,12)=1$, which gives $1,5,7,11$. Each is its own inverse: for example $5\\cdot 5=25\\equiv 1$. If $g=\\gcd(a,12)>1$ and $a\\ne 0$, then $a\\cdot(12/g)\\equiv 0$, with $12/g\\not\\equiv 0$, so $a$ is a zero divisor. For example, $8\\cdot 3=24\\equiv 0$. This gives seven zero divisors $2,3,4,6,8,9,10$. With $0$ that accounts for $4+7+1=12$ elements. Every nonzero element of $\\mathbb{Z}_n$ is one or the other. That fails in infinite rings: $2\\in\\mathbb{Z}$ is neither.

To find units in $\\mathbb{Z}[i]$, use the norm $N(a+bi)=a^2+b^2$, which is multiplicative. If $uv=1$ then $N(u)N(v)=1$, so $N(u)=1$, and the units are $\\pm1,\\pm i$.`,
          resources: [
            judson('Read the chapter on rings, through integral domains and fields.'),
            conrad('ringtheory/ringdefs.pdf', 'Standard definitions for rings', 'A reference for the terms, and for how conventions differ.'),
            ocw702('Use the opening lectures on rings for a second presentation.'),
          ],
          exercises: [
            {
              slug: 'unit-groups',
              title: 'Units through the norm',
              prompt: `Find all units of $\\mathbb{Z}[\\sqrt{-5}]$, using a multiplicative norm. Then show that $\\mathbb{Z}[\\sqrt 2]$ has infinitely many units.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For the second part, consider powers of 1 + sqrt 2.',
            },
            {
              slug: 'nilpotent-plus-one',
              title: 'Nilpotent plus unit',
              prompt: `In a commutative ring let $n$ be nilpotent and $u$ a unit. Prove that $u+n$ is a unit. Find the inverse of $1+2x$ in $\\mathbb{Z}_4[x]$. Then show with $2\\times 2$ matrices that $u+n$ can fail to be a unit when $u$ and $n$ do not commute.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the matrix example, take u to be the matrix swapping the two basis vectors, and choose a nilpotent n that cancels one of its entries.',
            },
            {
              slug: 'boolean-rings',
              title: 'Boolean rings',
              prompt: `Let $R$ be a ring in which $x^2=x$ for all $x$. Prove that $2x=0$ for all $x$ and that $R$ is commutative. Give an example with more than two elements.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'count-z30',
              title: 'Units and zero divisors of Z30',
              prompt: `Count the units and the zero divisors of $\\mathbb{Z}_{30}$. How many idempotents does it have ($a^2=a$), and how many nilpotents? List the idempotents.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a unit never a zero divisor?',
              answerOutline: `If $ub=0$ with $u$ a unit, multiplying by $u^{-1}$ gives $b=0$.`,
            },
            {
              question: 'Where does finiteness enter the proof that finite domains are fields?',
              answerOutline: `An injective map from a finite set to itself is surjective.`,
            },
            {
              question: 'Is $\\mathbb{Z}_7[x]$ a field?',
              answerOutline: `No. It is a domain, but $x$ has no inverse, by degrees.`,
            },
          ],
        },
        {
          slug: 'ideals-and-quotient-rings',
          title: 'Ideals and quotient rings',
          summary:
            'Ideals are to rings what normal subgroups are to groups, and quotient rings are how new number systems get built.',
          estimatedMinutes: 170,
          objectives: [
            'Test whether a subset is an ideal',
            'Compute sums, products and intersections of ideals in $\\mathbb{Z}$',
            'Compute in $R/I$',
            'Recognise when a quotient of a polynomial ring is a field',
          ],
          concepts: [
            'Ideal',
            'Principal ideal $(a)$',
            'Ideal generated by a set',
            'Quotient ring $R/I$',
            'Sum, product and intersection of ideals',
            'Principal ideal domain',
          ],
          explanation: `An **ideal** of a commutative ring $R$ is a subset $I$ that is an additive subgroup and absorbs multiplication: $r\\in R$ and $a\\in I$ imply $ra\\in I$. Absorption is much stronger than closure. $\\mathbb{Z}$ is a subring of $\\mathbb{Q}$, but not an ideal, since $\\tfrac12\\cdot 1\\notin\\mathbb{Z}$. An ideal containing a unit is all of $R$.

The ideal generated by $a_1,\\dots,a_n$ is $(a_1,\\dots,a_n)=\\{\\sum r_ia_i\\}$. A **principal** ideal is $(a)$. Every ideal of $\\mathbb{Z}$ is principal, by the division algorithm, and a domain with this property is a **principal ideal domain**. In $\\mathbb{Z}$, $(m)+(n)=(\\gcd(m,n))$, $(m)\\cap(n)=(\\operatorname{lcm}(m,n))$ and $(m)(n)=(mn)$.

Ideals are exactly what is needed to form a quotient. The cosets $a+I$ add as in groups, and we define $(a+I)(b+I)=ab+I$. This is well defined: if $a'=a+i$ and $b'=b+j$ with $i,j\\in I$, then $a'b'=ab+aj+ib+ij$, and the last three terms lie in $I$ precisely because $I$ absorbs multiplication. The result $R/I$ is the **quotient ring**. Think of it as $R$ with the rule "elements of $I$ are zero". The ring $\\mathbb{Z}_n=\\mathbb{Z}/(n)$ is the model.

Quotients of polynomial rings build new number systems. In $\\mathbb{R}[x]/(x^2+1)$, every class has a unique representative $a+bx$ by the division algorithm, and $x^2=-1$. So this is $\\mathbb{C}$, with $x$ playing the part of $i$. You have constructed $i$ out of real polynomials.

**Worked example.** Let $R=\\mathbb{F}_2[x]/(x^2+x+1)$. Each class has a unique representative of degree less than $2$, so $R=\\{0,1,x,x+1\\}$. Write $\\bar x$ for the class of $x$. The rule is $\\bar x^2=\\bar x+1$, since $-1=1$ in $\\mathbb{F}_2$. Then
$$\\bar x\\cdot\\bar x=\\bar x+1,\\quad\\bar x(\\bar x+1)=\\bar x^2+\\bar x=1,\\quad(\\bar x+1)^2=\\bar x^2+1=\\bar x.$$
Every nonzero element has an inverse, so $R$ is a field with four elements. It is not $\\mathbb{Z}_4$, in which $2$ has no inverse. Whether a quotient by $(f)$ is a field comes down to whether $f$ is irreducible, as Module 5 explains. Compare $\\mathbb{F}_2[x]/(x^2+1)$. Here $x^2+1=(x+1)^2$, and the class of $x+1$ is a nonzero element with square $0$.`,
          resources: [
            judson('Read the sections of the chapter on rings that cover ideals and quotient rings.'),
            conrad('ringtheory/ideals.pdf', 'Notes on ideals', 'Works through ideals in $\\mathbb{Z}$, polynomial rings and quotient rings.'),
            ocw702('Use the lectures on ideals and quotient rings.'),
          ],
          exercises: [
            {
              slug: 'spot-the-ideals',
              title: 'Spot the ideals',
              prompt: `Decide which of these subsets of $\\mathbb{Z}[x]$ are ideals, with a proof or a counterexample in each case: (a) polynomials with constant term $0$; (b) polynomials with even constant term; (c) polynomials of degree at most $3$, with $0$; (d) polynomials whose coefficients sum to $0$; (e) polynomials with leading coefficient even, with $0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'only-two-ideals',
              title: 'Fields by their ideals',
              prompt: `Prove that a nonzero commutative ring is a field if and only if its only ideals are $(0)$ and $R$. Deduce that every ring homomorphism from a field to a nonzero ring is injective.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'ideals-in-z',
              title: 'Ideal arithmetic in the integers',
              prompt: `Find a generator of $(12)+(18)$, $(12)\\cap(18)$ and $(12)(18)$ in $\\mathbb{Z}$. Prove the general formulas for $(m)+(n)$ and $(m)\\cap(n)$. For which $m,n$ does $(m)\\cap(n)=(m)(n)$?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'not-principal',
              title: 'An ideal that is not principal',
              prompt: `Prove that $(2,x)$ is not a principal ideal of $\\mathbb{Z}[x]$. Describe its elements explicitly, by a condition on the constant term of a polynomial.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'field-or-not',
              title: 'Field or not',
              prompt: `For each ring, decide whether it is a field, and give its size. If it is not a field, give a zero divisor. (a) $\\mathbb{Z}_3[x]/(x^2+1)$; (b) $\\mathbb{Z}_7[x]/(x^2-2)$; (c) $\\mathbb{Z}_5[x]/(x^2+x+1)$; (d) $\\mathbb{Z}_2[x]/(x^3+x+1)$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly makes the product on $R/I$ well defined?',
              answerOutline: `Absorption: the error terms $aj$, $ib$ and $ij$ all lie in $I$. For a subring that is not an ideal, this fails.`,
            },
            {
              question: 'Why does an ideal containing a unit equal $R$?',
              answerOutline: `If $u\\in I$ then $1=u^{-1}u\\in I$, so $r=r\\cdot 1\\in I$ for all $r$.`,
            },
            {
              question: 'Why does every class in $F[x]/(f)$ have a unique representative of degree less than $\\deg f$?',
              answerOutline: `By division with remainder. Two such representatives in one class differ by a multiple of $f$ of degree below $\\deg f$, which must be $0$.`,
            },
          ],
        },
        {
          slug: 'ring-homomorphisms-and-crt',
          title: 'Ring homomorphisms and the Chinese remainder theorem',
          summary:
            'Maps between rings, the first isomorphism theorem for rings, characteristic, and splitting a ring into a product.',
          estimatedMinutes: 170,
          objectives: [
            'Verify ring homomorphisms and find their kernels',
            'Apply the first isomorphism theorem for rings',
            'Determine the characteristic of a ring',
            'State and apply the Chinese remainder theorem for ideals',
          ],
          concepts: [
            'Ring homomorphism',
            'Kernel as an ideal',
            'First isomorphism theorem for rings',
            'Evaluation homomorphism',
            'Characteristic',
            'Comaximal ideals',
            'Chinese remainder theorem',
            'Frobenius map',
          ],
          explanation: `A **ring homomorphism** $\\varphi:R\\to S$ preserves addition and multiplication and sends $1$ to $1$. Its kernel is an ideal, and conversely each ideal is the kernel of the projection $R\\to R/I$. The **first isomorphism theorem** says $R/\\ker\\varphi\\cong\\operatorname{im}\\varphi$, proved as for groups. Every commutative ring $R$ with $a\\in R$ has an **evaluation** map $R[x]\\to R$, $f\\mapsto f(a)$. Its kernel is $(x-a)$ by the factor theorem, so $R[x]/(x-a)\\cong R$.

There is a unique homomorphism $\\mathbb{Z}\\to R$, sending $1$ to $1$. Its kernel is $(n)$ for some $n\\ge 0$, and that $n$ is the **characteristic** of $R$. So $R$ contains a copy of $\\mathbb{Z}$ or of $\\mathbb{Z}_n$. A domain has characteristic $0$ or a prime. In a commutative ring of prime characteristic $p$, the binomial coefficients $\\binom{p}{k}$ for $0<k<p$ are divisible by $p$, so $(a+b)^p=a^p+b^p$, and the **Frobenius map** $a\\mapsto a^p$ is a ring homomorphism.

**Chinese remainder theorem.** Let $I,J$ be ideals of a commutative ring $R$ with $I+J=R$ (they are **comaximal**). Then $I\\cap J=IJ$, and
$$R/(I\\cap J)\\cong R/I\\times R/J,\\qquad a+I\\cap J\\mapsto(a+I,a+J).$$
Injectivity is immediate from the kernel. For surjectivity, comaximality gives $u\\in I$ and $v\\in J$ with $u+v=1$. Then $v\\mapsto(1,0)$ and $u\\mapsto(0,1)$, since $v=1-u\\equiv 1$ modulo $I$. Thus $av+bu\\mapsto(a,b)$. The elements $u,v$ act as a basis for the product.

**Worked example.** Take $R=\\mathbb{Z}$, $I=(3)$, $J=(5)$, and solve $x\\equiv 2\\pmod 3$, $x\\equiv 4\\pmod 5$. Since $(3)+(5)=\\mathbb{Z}$, we find a decomposition of $1$: $6-5=1$ with $6\\in(3)$, $-5\\in(5)$. So $u=6$ and $v=-5\\equiv 10\\pmod{15}$. Check: $10\\equiv 1\\pmod 3$ and $10\\equiv 0\\pmod 5$, and $6\\equiv 0\\pmod 3$ and $6\\equiv 1\\pmod 5$. Then $x=2\\cdot 10+4\\cdot 6=44\\equiv 14\\pmod{15}$. Indeed $14\\equiv 2\\pmod 3$ and $14\\equiv 4\\pmod 5$. As rings, $\\mathbb{Z}_{15}\\cong\\mathbb{Z}_3\\times\\mathbb{Z}_5$, with $10$ and $6$ as the idempotents $(1,0)$ and $(0,1)$. Note $10^2=100\\equiv 10$ and $6^2=36\\equiv 6$ and $10\\cdot 6\\equiv 0\\pmod{15}$.

The theorem applies far beyond the integers. If $f,g\\in F[x]$ are coprime, then $F[x]/(fg)\\cong F[x]/(f)\\times F[x]/(g)$. Taking $f$ and $g$ linear explains interpolation: to choose a polynomial's values at distinct points is to pick an element of a product.`,
          resources: [
            judson('Read the sections of the chapter on rings on homomorphisms and the Chinese remainder theorem.'),
            conrad('ugradnumthy/crt.pdf', 'Chinese remainder theorem', 'The theorem in $\\mathbb{Z}$, which you can compare with the ideal version.'),
            ocw702('Lectures on ring homomorphisms and the product of rings give further examples.'),
          ],
          exercises: [
            {
              slug: 'characteristic-domain',
              title: 'Characteristic of a domain',
              prompt: `Prove that the characteristic of an integral domain is $0$ or a prime. Give a commutative ring of characteristic $6$, and a ring of characteristic $2$ that is infinite.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'freshman-dream',
              title: 'The Frobenius map',
              prompt: `Let $R$ be a commutative ring of prime characteristic $p$. Prove that $a\\mapsto a^p$ is a ring homomorphism. Prove that it is an automorphism if $R$ is a finite field. Show that it is not surjective on $\\mathbb{F}_p(t)$, the field of rational functions.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'no-such-map',
              title: 'A homomorphism that cannot exist',
              prompt: `Prove that there is no ring homomorphism $\\mathbb{Z}[\\sqrt 2]\\to\\mathbb{Z}[\\sqrt 3]$. Then find all ring homomorphisms $\\mathbb{Z}[i]\\to\\mathbb{Z}_5$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'A homomorphism is decided by the image of the square root or of i, and that image must solve a fixed equation.',
            },
            {
              slug: 'crt-polynomial',
              title: 'Splitting a polynomial quotient',
              prompt: `Show that $\\mathbb{F}_5[x]/(x^2-1)\\cong\\mathbb{F}_5\\times\\mathbb{F}_5$, and find the two idempotents corresponding to $(1,0)$ and $(0,1)$ as polynomials of degree at most $1$. Explain why the same argument fails for $\\mathbb{F}_2[x]/(x^2-1)$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'crt-general-proof',
              title: 'Prove the theorem',
              prompt: `Prove the Chinese remainder theorem for two comaximal ideals in a commutative ring, including $I\\cap J=IJ$. Extend it by induction to $n$ pairwise comaximal ideals, proving that $I_1$ and $I_2\\cdots I_n$ are comaximal.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the kernel of evaluation at $i$ from $\\mathbb{R}[x]$ to $\\mathbb{C}$?',
              answerOutline: `$(x^2+1)$, so $\\mathbb{R}[x]/(x^2+1)\\cong\\mathbb{C}$.`,
            },
            {
              question: 'Why is $(a+b)^p=a^p+b^p$ in characteristic $p$?',
              answerOutline: `The middle coefficients $\\binom{p}{k}$ are divisible by $p$ for $0<k<p$, because $p$ divides $p!$ but not $k!(p-k)!$.`,
            },
            {
              question: 'Why is $\\mathbb{Z}_{12}$ isomorphic to $\\mathbb{Z}_3\\times\\mathbb{Z}_4$ but not to $\\mathbb{Z}_2\\times\\mathbb{Z}_6$?',
              answerOutline: `$\\gcd(3,4)=1$, so CRT applies. $\\gcd(2,6)=2$, and $\\mathbb{Z}_2\\times\\mathbb{Z}_6$ has no element of additive order $12$.`,
            },
          ],
        },
        {
          slug: 'prime-and-maximal-ideals',
          title: 'Prime and maximal ideals',
          summary:
            'The two kinds of ideal whose quotients are domains and fields.',
          estimatedMinutes: 160,
          objectives: [
            'Prove that $R/P$ is a domain exactly when $P$ is prime',
            'Prove that $R/M$ is a field exactly when $M$ is maximal',
            'Give prime ideals that are not maximal',
            'Find the prime and maximal ideals of small rings',
          ],
          concepts: [
            'Prime ideal',
            'Maximal ideal',
            'Quotient criteria',
            'Maximal implies prime',
            'Non-zero primes are maximal in a PID',
            'Nilradical',
          ],
          explanation: `Let $R$ be commutative with $1\\ne 0$. A proper ideal $P$ is **prime** if $ab\\in P$ implies $a\\in P$ or $b\\in P$. A proper ideal $M$ is **maximal** if there is no ideal strictly between $M$ and $R$. Each is designed to match a property of the quotient:
$$P\\text{ is prime}\\iff R/P\\text{ is a domain},\\qquad M\\text{ is maximal}\\iff R/M\\text{ is a field}.$$
The first is the definition translated: $\\bar a\\bar b=0$ means $ab\\in P$. For the second, the correspondence theorem says that ideals of $R/M$ correspond to ideals of $R$ containing $M$. So $M$ is maximal exactly when $R/M$ has only the two trivial ideals, which is exactly when it is a field.

Since fields are domains, every maximal ideal is prime. The converse fails. In $\\mathbb{Z}$, $(0)$ is prime because $\\mathbb{Z}$ is a domain, but it is not maximal. In a principal ideal domain, though, every nonzero prime ideal is maximal: if $(p)\\subseteq(a)$ then $p=ab$, so $p\\mid a$ or $p\\mid b$. In the first case $(a)=(p)$. In the second $b=pc$, so $ac=1$ after cancelling $p$, and $(a)=R$.

**Worked example.** Consider the chain $(0)\\subset(x)\\subset(2,x)$ in $\\mathbb{Z}[x]$. Evaluation at $0$ gives $\\mathbb{Z}[x]/(x)\\cong\\mathbb{Z}$. That is a domain and not a field, so $(x)$ is prime and not maximal. Then reducing mod $2$ after evaluating at $0$ gives a surjection $\\mathbb{Z}[x]\\to\\mathbb{F}_2$ with kernel $(2,x)$, because $f(0)$ is even exactly when $f=2c+xh$ for an integer $c$ and a polynomial $h$. So $\\mathbb{Z}[x]/(2,x)\\cong\\mathbb{F}_2$, and $(2,x)$ is maximal. The chain shows that $\\mathbb{Z}[x]$ has more layers than $\\mathbb{Z}$, which has only $(0)\\subset(p)$. Since a nonzero prime ideal, $(x)$, fails to be maximal, it also proves that $\\mathbb{Z}[x]$ is not a principal ideal domain.

Now look at $\\mathbb{Z}_{12}$. Its ideals correspond to divisors of $12$: $(d)$ for $d\\mid 12$. The quotient by $(d)$ is $\\mathbb{Z}_d$, so $(d)$ is prime or maximal exactly when $d$ is prime. Thus $(2)$ and $(3)$ are the prime ideals, and both are maximal. In a finite commutative ring every prime ideal is maximal, because a finite domain is a field. In $\\mathbb{Z}_{12}$ the elements in every prime ideal are the multiples of $6$, and these are exactly the nilpotent elements, $0$ and $6$.

Does every nonzero ring have a maximal ideal? For rings with $1$, yes, by Zorn's lemma, which we accept without proof. All the rings you meet here have them by inspection.`,
          resources: [
            judson('Read the sections of the chapter on rings on maximal and prime ideals.'),
            conrad('ringtheory/maxideal-polyring.pdf', 'Maximal ideals in polynomial rings', 'What maximal ideals look like in polynomial rings over a field.'),
            ocw702('Use the lectures on maximal ideals and factoring.'),
          ],
          exercises: [
            {
              slug: 'quotient-criteria',
              title: 'Prove the quotient criteria',
              prompt: `Prove both equivalences: $P$ is prime iff $R/P$ is a domain, and $M$ is maximal iff $R/M$ is a field. Say where you use that $1\\ne 0$ in the quotient.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'ideals-z60',
              title: 'Prime ideals of Z60',
              prompt: `Find all ideals, prime ideals and maximal ideals of $\\mathbb{Z}_{60}$. Find its set of nilpotents, and show that this set is the intersection of the prime ideals.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gaussian-quotients',
              title: 'Quotients of the Gaussian integers',
              prompt: `Identify $\\mathbb{Z}[i]/(1+i)$ and $\\mathbb{Z}[i]/(3)$ as fields, giving their sizes. Show that $(5)$ is not prime in $\\mathbb{Z}[i]$, and identify $\\mathbb{Z}[i]/(5)$ as a product of fields.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Write the Gaussian integers as Z[x]/(x^2+1), and swap the order of the two quotients.',
            },
            {
              slug: 'continuous-functions',
              title: 'Maximal ideals of continuous functions',
              prompt: `Let $R=C[0,1]$ be the ring of continuous real functions. Prove that $M_a=\\{f:f(a)=0\\}$ is maximal for each $a$, and prove that every maximal ideal has this form. Point to where compactness is used.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If an ideal is in no M_a, each point has an f in the ideal not vanishing there. Use compactness and sum finitely many squares to get a unit.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give a prime ideal that is not maximal, and say which ring you are in.',
              answerOutline: `$(0)$ in $\\mathbb{Z}$, or $(x)$ in $\\mathbb{Z}[x]$.`,
            },
            {
              question: 'Why is every maximal ideal prime?',
              answerOutline: `$R/M$ is a field, hence a domain, so $M$ is prime.`,
            },
            {
              question: 'Is $(x^2+1)$ maximal in $\\mathbb{R}[x]$? In $\\mathbb{C}[x]$?',
              answerOutline: `Maximal in $\\mathbb{R}[x]$, as the quotient is $\\mathbb{C}$. Not even prime in $\\mathbb{C}[x]$, as $x^2+1=(x+i)(x-i)$.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'polynomials-and-factorisation',
      title: 'Polynomials and Factorisation',
      description:
        'Division in polynomial rings, the chain from Euclidean domains to unique factorisation, and practical tests for irreducibility.',
      lessons: [
        {
          slug: 'polynomial-rings-and-division',
          title: 'Polynomial rings and division',
          summary:
            'Degree, the division algorithm over a field, roots, and the Euclidean algorithm in F[x].',
          estimatedMinutes: 150,
          objectives: [
            'Divide polynomials with remainder over a field',
            'Prove the factor theorem and the bound on the number of roots',
            'Run the Euclidean algorithm in $F[x]$',
            'Explain which of these facts fail over rings with zero divisors',
          ],
          concepts: [
            'Polynomial ring $R[x]$',
            'Degree formula in a domain',
            'Division algorithm',
            'Factor theorem',
            'Root bound',
            'Greatest common divisor in $F[x]$',
          ],
          explanation: `A polynomial over a commutative ring $R$ is a formal expression $a_0+a_1x+\\dots+a_nx^n$, not a function. Over $\\mathbb{F}_2$ the polynomials $x^2+x$ and $0$ are different, even though they take the same values. If $R$ is a domain, then $\\deg(fg)=\\deg f+\\deg g$, so $R[x]$ is a domain and its units are the units of $R$. With zero divisors this fails: in $\\mathbb{Z}_4[x]$, $(1+2x)^2=1$.

**Division algorithm.** Let $F$ be a field and $g\\ne 0$. For each $f\\in F[x]$ there are unique $q,r$ with $f=qg+r$ and $r=0$ or $\\deg r<\\deg g$. The proof is induction on $\\deg f$: subtract a multiple of $g$ that kills the leading term. This is where we need to invert the leading coefficient of $g$. Over a general ring it works when $g$ is monic. So over $\\mathbb{Z}$ you can divide by $x+1$ but not, in general, by $2x+1$.

Two consequences follow by taking $g=x-a$. The **factor theorem**: $f(a)$ is the remainder, so $f(a)=0$ iff $(x-a)\\mid f$. The **root bound**: in a domain, a nonzero polynomial of degree $n$ has at most $n$ roots. Both hypotheses matter. In $\\mathbb{Z}_8$ the polynomial $x^2-1$ has four roots: $1,3,5,7$.

As in $\\mathbb{Z}$, repeated division gives the **Euclidean algorithm**, so $\\gcd(f,g)$ exists and can be written $uf+vg$, and every ideal of $F[x]$ is principal.

**Worked example.** Divide $f=x^4+2x^3+3x+1$ by $g=2x^2+1$ in $\\mathbb{F}_5[x]$. The inverse of $2$ is $3$, because $2\\cdot 3=6\\equiv 1$. The first quotient term is $3\\cdot x^2$, since $3x^2\\cdot 2x^2=6x^4=x^4$. Subtracting $3x^2g=x^4+3x^2$ leaves
$$2x^3-3x^2+3x+1=2x^3+2x^2+3x+1.$$
Next take $3\\cdot 2\\cdot x=x$: subtracting $xg=2x^3+x$ leaves $2x^2+2x+1$. Finally take $1$: subtracting $g$ leaves $2x$. So
$$f=(3x^2+x+1)(2x^2+1)+2x.$$
Check by expanding: $(3x^2+x+1)(2x^2+1)=6x^4+2x^3+5x^2+x+1=x^4+2x^3+x+1$, and adding $2x$ gives $f$. The remainder has degree $1<2$, as required.

Keep the analogy between $\\mathbb{Z}$ and $F[x]$ in mind: primes become irreducible polynomials, size becomes degree, and $\\mathbb{Z}_p$ becomes $F[x]/(f)$ with $f$ irreducible.`,
          resources: [
            judson('Read the chapter on polynomials.'),
            conrad('ringtheory/divthm.pdf', 'Division theorem in Z and R[T]', 'Exact conditions for the division theorem over a general ring.'),
            conrad('ringtheory/countroots.pdf', 'Counting roots of polynomials', 'Examples of polynomials with too many roots.'),
            sympyPolys('Use `Poly(..., modulus=p)` with `div` and `gcd` to check hand computations.'),
          ],
          exercises: [
            {
              slug: 'division-uniqueness',
              title: 'Uniqueness in the division algorithm',
              prompt: `Prove existence and uniqueness of $q$ and $r$ in the division algorithm over a field. Show that uniqueness can fail over $\\mathbb{Z}_6$ for a divisor that is not monic, by exhibiting two different pairs.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'Try dividing 0 or a low degree polynomial by a polynomial with leading coefficient 2.',
            },
            {
              slug: 'too-many-roots',
              title: 'Too many roots',
              prompt: `Prove that a nonzero polynomial of degree $n$ over a domain has at most $n$ roots. Find all roots of $x^2-1$ in $\\mathbb{Z}_8$ and of $x^2-x$ in $\\mathbb{Z}_6$, and name the step of your proof that breaks.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'euclid-f7',
              title: 'Euclid over F7',
              prompt: `In $\\mathbb{F}_7[x]$ find the monic gcd of $f=x^4+3x^3+x+3$ and $g=x^3+x^2+2x+2$ by the Euclidean algorithm, and express it as $uf+vg$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'wilson-from-polynomials',
              title: 'Wilson from polynomials',
              prompt: `Show that $x^{p-1}-1=\\prod_{a=1}^{p-1}(x-a)$ in $\\mathbb{F}_p[x]$. Compare constant terms to deduce Wilson's theorem, and compare the coefficient of $x$ to show that $\\sum_{a=1}^{p-1}1/a=0$ in $\\mathbb{F}_p$ for $p>2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'functions-versus-polynomials',
              title: 'Polynomials and polynomial functions',
              prompt: `Prove that two polynomials in $\\mathbb{F}_p[x]$ define the same function on $\\mathbb{F}_p$ if and only if they differ by a multiple of $x^p-x$. Deduce that every function $\\mathbb{F}_p\\to\\mathbb{F}_p$ is given by exactly one polynomial of degree less than $p$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\deg(fg)=\\deg f+\\deg g$ false in $\\mathbb{Z}_4[x]$?',
              answerOutline: `Leading coefficients can multiply to zero: $(2x+1)(2x+1)=1$.`,
            },
            {
              question: 'What hypothesis on the divisor makes the division algorithm work over any commutative ring?',
              answerOutline: `Its leading coefficient is a unit, for example the divisor is monic.`,
            },
            {
              question: 'What is the remainder when $f$ is divided by $x-a$?',
              answerOutline: `$f(a)$: put $x=a$ in $f=q(x-a)+r$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/divisibility-and-the-euclidean-algorithm'],
        },
        {
          slug: 'euclidean-domains-and-unique-factorisation',
          title: 'Euclidean domains and unique factorisation',
          summary:
            'Euclidean domain implies principal ideal domain implies unique factorisation domain, and an example of what goes wrong without them.',
          estimatedMinutes: 180,
          objectives: [
            'Distinguish irreducible and prime elements',
            'Prove that a Euclidean domain is a principal ideal domain',
            'Prove that irreducibles are prime in a principal ideal domain',
            'Compute gcds and factorisations in $\\mathbb{Z}[i]$',
          ],
          concepts: [
            'Associates',
            'Irreducible element',
            'Prime element',
            'Euclidean domain',
            'Principal ideal domain',
            'Unique factorisation domain',
            'Gaussian integers',
            'Failure in $\\mathbb{Z}[\\sqrt{-5}]$',
          ],
          explanation: `In a domain $R$, elements that differ by a unit are **associates**. A nonzero non-unit $a$ is **irreducible** if $a=bc$ forces $b$ or $c$ to be a unit. It is **prime** if $a\\mid bc$ forces $a\\mid b$ or $a\\mid c$. In any domain primes are irreducible. The converse is the deep part, and it fails in general.

A **unique factorisation domain** (UFD) is a domain in which every nonzero non-unit is a product of irreducibles, uniquely up to order and associates. A **Euclidean domain** has a function $N$ to the non-negative integers, such that for $a$ and $b\\ne 0$ we can write $a=qb+r$ with $r=0$ or $N(r)<N(b)$. Examples are $\\mathbb{Z}$, $F[x]$ and $\\mathbb{Z}[i]$. The chain is
$$\\text{Euclidean}\\Rightarrow\\text{PID}\\Rightarrow\\text{UFD}.$$
For the first step, take a nonzero element of least norm in an ideal. Division shows that it generates the ideal, exactly as for $\\mathbb{Z}$. For the second, in a PID, if $a$ is irreducible and $a\\mid bc$ with $a\\nmid b$, then the ideal $(a,b)=(d)$ must be $R$, since $d$ divides the irreducible $a$. So $ua+vb=1$, and multiplying by $c$ shows that $a\\mid c$. Thus irreducibles are prime, which gives uniqueness. Existence comes from the fact that ascending chains of ideals stabilise.

Neither implication reverses. $\\mathbb{Z}[x]$ is a UFD and not a PID, and $\\mathbb{Z}[(1+\\sqrt{-19})/2]$ is a PID that is not Euclidean, though that is harder to prove.

**A failure.** In $\\mathbb{Z}[\\sqrt{-5}]$ with $N(a+b\\sqrt{-5})=a^2+5b^2$,
$$6=2\\cdot 3=(1+\\sqrt{-5})(1-\\sqrt{-5}).$$
The norms are $4,9,6,6$. No element has norm $2$ or $3$, so all four factors are irreducible, and they are not associates as the only units are $\\pm1$. So $2$ is irreducible, but not prime. It divides the product $(1+\\sqrt{-5})(1-\\sqrt{-5})$ and neither factor.

**Worked example.** Compute $\\gcd(11+3i,1+8i)$ in $\\mathbb{Z}[i]$, with norm $N(a+bi)=a^2+b^2$. To divide, compute the exact quotient in $\\mathbb{C}$ and round each part to the nearest integer. This gives a remainder of norm at most $N(b)/2$. First,
$$\\frac{11+3i}{1+8i}=\\frac{(11+3i)(1-8i)}{65}=\\frac{35-85i}{65}\\approx 0.54-1.31i,$$
so $q=1-i$, and $r=(11+3i)-(1-i)(1+8i)=(11+3i)-(9+7i)=2-4i$, of norm $20<65$. Next,
$$\\frac{1+8i}{2-4i}=\\frac{(1+8i)(2+4i)}{20}=\\frac{-30+20i}{20}=-1.5+i.$$
Round to $q=-2+i$. Then $(-2+i)(2-4i)=10i$, and $r=1+8i-10i=1-2i$, of norm $5$. Finally $2-4i=2(1-2i)$, so the remainder is $0$. The gcd is $1-2i$, up to multiplying by a unit.`,
          resources: [
            judson('Read the chapter on integral domains, covering factorisation, PIDs and Euclidean domains.'),
            conrad('ringtheory/euclideanrk.pdf', 'Euclidean domains', 'Remarks on which rings are Euclidean and which are not.'),
            conrad('ugradnumthy/Zinotes.pdf', 'Gaussian integers', 'A full treatment of arithmetic in $\\mathbb{Z}[i]$, including primes.'),
          ],
          exercises: [
            {
              slug: 'prime-is-irreducible',
              title: 'Primes are irreducible',
              prompt: `Prove that in an integral domain every prime element is irreducible. Prove that $a$ is prime if and only if $(a)$ is a nonzero prime ideal.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'euclidean-is-pid',
              title: 'Euclidean implies PID',
              prompt: `Prove that a Euclidean domain is a principal ideal domain. Then show that $\\mathbb{Z}[i]$ is Euclidean under the norm, proving the bound on the remainder.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'z-root-minus-five',
              title: 'Working in a ring without unique factorisation',
              prompt: `In $R=\\mathbb{Z}[\\sqrt{-5}]$, prove that $2$, $3$ and $1\\pm\\sqrt{-5}$ are irreducible and not associates. Prove that the ideal $(2,1+\\sqrt{-5})$ is not principal, and conclude once more that $R$ is not a PID.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gaussian-factorisations',
              title: 'Factoring Gaussian integers',
              prompt: `Factor into irreducibles in $\\mathbb{Z}[i]$: $2$, $5$, $7$, $13$, $1+3i$ and $4+7i$. Use the norm to find or to rule out factors. Which rational primes among these remain irreducible, and what is the pattern?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'two-squares-via-gaussian',
              title: 'Two squares from a Euclidean domain',
              prompt: `Let $p\\equiv 1\\pmod 4$ be prime. Assume that $x^2\\equiv -1\\pmod p$ has a solution. Prove that $p$ is not irreducible in $\\mathbb{Z}[i]$, and deduce that $p=a^2+b^2$ for integers $a,b$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'p divides (x+i)(x-i) but neither factor. So p is not prime, hence not irreducible, as Z[i] is a PID. Now apply the norm.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the three-step chain and give an example showing the last implication does not reverse.',
              answerOutline: `Euclidean $\\Rightarrow$ PID $\\Rightarrow$ UFD. $\\mathbb{Z}[x]$ is a UFD that is not a PID.`,
            },
            {
              question: 'Why is $1+i$ irreducible in $\\mathbb{Z}[i]$?',
              answerOutline: `Its norm is the prime $2$. If $1+i=uv$ then $N(u)N(v)=2$, so one factor has norm $1$ and is a unit.`,
            },
            {
              question: 'How does $2\\cdot 3=(1+\\sqrt{-5})(1-\\sqrt{-5})$ show that $2$ is not prime?',
              answerOutline: `$2$ divides the right side, but divides neither factor, as $(1\\pm\\sqrt{-5})/2\\notin\\mathbb{Z}[\\sqrt{-5}]$.`,
            },
          ],
        },
        {
          slug: 'irreducibility-tests',
          title: 'Irreducibility tests',
          summary:
            'Gauss\'s lemma, Eisenstein\'s criterion and reduction modulo a prime, and how to choose among them.',
          estimatedMinutes: 170,
          objectives: [
            'Decide irreducibility of low-degree polynomials by finding roots',
            'State and apply Gauss\'s lemma',
            'State Eisenstein\'s criterion with all its hypotheses, and use a shift',
            'Use reduction modulo a prime, including its limits',
          ],
          concepts: [
            'Irreducible polynomial',
            'Rational root test',
            'Primitive polynomial and content',
            'Gauss\'s lemma',
            'Eisenstein\'s criterion',
            'Reduction modulo $p$',
            'Cyclotomic polynomial $\\Phi_p$',
          ],
          explanation: `Over a field, an element of $F[x]$ of degree at least $1$ is **irreducible** if it is not a product of two polynomials of lower degree. A polynomial of degree $2$ or $3$ is reducible exactly when it has a root in $F$, because some factor would be linear. This test does not extend to degree $4$: $x^4+4=(x^2+2x+2)(x^2-2x+2)$ has no rational root.

Over $\\mathbb{Q}$ the **rational root test** applies: a root $r/s$ in lowest terms of an integer polynomial has $r$ dividing the constant term and $s$ dividing the leading coefficient.

A polynomial in $\\mathbb{Z}[x]$ is **primitive** if the gcd of its coefficients is $1$. **Gauss's lemma** says a product of primitive polynomials is primitive. Consequently, a non-constant $f\\in\\mathbb{Z}[x]$ that factors over $\\mathbb{Q}$ into lower degree polynomials also factors over $\\mathbb{Z}$ into polynomials of those degrees. So you never need fractions, and if $R$ is a UFD then so is $R[x]$.

**Eisenstein's criterion.** Let $f=a_nx^n+\\dots+a_0\\in\\mathbb{Z}[x]$, and suppose a prime $p$ has $p\\mid a_i$ for all $i<n$, $p\\nmid a_n$ and $p^2\\nmid a_0$. Then $f$ does not factor into polynomials of lower degree over $\\mathbb{Q}$. So $x^n-2$ is irreducible for every $n\\ge 1$. Note that all three conditions are needed: $x^2+4x+4=(x+2)^2$ meets the first two for $p=2$, and fails the third.

**Reduction mod $p$.** If $p\\nmid a_n$ and the reduction of $f$ is irreducible in $\\mathbb{F}_p[x]$, then $f$ does not factor into lower degree polynomials over $\\mathbb{Q}$. The converse is false.

**Worked example.** Take $x^4+1$. No Eisenstein prime works directly, but a substitution preserves irreducibility, because $f(x)=g(x)h(x)$ if and only if $f(x+1)=g(x+1)h(x+1)$. We get
$$(x+1)^4+1=x^4+4x^3+6x^2+4x+2,$$
and $p=2$ satisfies Eisenstein: $2$ divides $4,6,4,2$, does not divide the leading $1$, and $4\\nmid 2$. So $x^4+1$ is irreducible over $\\mathbb{Q}$. Reduction would not have helped, because $x^4+1$ is reducible modulo every prime. For example, modulo $2$ it is $(x+1)^4$.

Now take $f=x^4+x+1$ over $\\mathbb{F}_2$. It has no root, because $f(0)=f(1)=1$. So it has no linear factor. The only irreducible quadratic over $\\mathbb{F}_2$ is $x^2+x+1$, and dividing gives $x^4+x+1=(x^2+x)(x^2+x+1)+1$. So $f$ is irreducible over $\\mathbb{F}_2$. Hence any integer polynomial congruent to it modulo $2$ with odd leading coefficient and degree $4$ is irreducible over $\\mathbb{Q}$, such as $3x^4+2x^2+5x+1$.`,
          resources: [
            judson('The chapter on polynomials covers irreducibility, Gauss\'s lemma and Eisenstein\'s criterion.'),
            conrad('ringtheory/irredtestsoverQ.pdf', 'Irreducibility tests in Q[T]', 'All the tests here, with examples.'),
            conrad('ringtheory/reducibleallp.pdf', 'An irreducible that factors modulo all primes', 'Explains the limit of reduction mod $p$.'),
            conrad('ugradnumthy/irredtestFpT.pdf', 'Irreducibility tests in Fp[T]', 'Tests that work for large degree over finite fields.'),
          ],
          exercises: [
            {
              slug: 'gauss-lemma-proof',
              title: 'Prove Gauss\'s lemma',
              prompt: `Prove that the product of two primitive polynomials is primitive, by reducing modulo a prime. Deduce that a non-constant polynomial in $\\mathbb{Z}[x]$ that factors over $\\mathbb{Q}$ into lower degree polynomials factors over $\\mathbb{Z}$ into polynomials of the same degrees.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'eisenstein-proof',
              title: 'Prove Eisenstein\'s criterion',
              prompt: `Prove Eisenstein's criterion by reducing a supposed integer factorisation modulo $p$. Point out where each of the three hypotheses is used.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Modulo p the polynomial becomes a constant times x to the n. In F_p[x] with unique factorisation, each factor reduces to a constant times a power of x.',
            },
            {
              slug: 'cyclotomic-prime',
              title: 'The prime cyclotomic polynomial',
              prompt: `Prove that $\\Phi_p(x)=x^{p-1}+x^{p-2}+\\dots+x+1$ is irreducible over $\\mathbb{Q}$ for prime $p$, by a substitution and Eisenstein's criterion. Show that the same polynomial shape with $n=4$, namely $x^3+x^2+x+1$, is reducible.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sort-the-batch',
              title: 'Sort a batch of polynomials',
              prompt: `Decide whether each is irreducible over $\\mathbb{Q}$, naming your test, and give the factorisation if it is reducible: (a) $x^3-2x+1$; (b) $x^4+10x+5$; (c) $x^4+4$; (d) $x^5+x+1$; (e) $3x^3-5x+1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (d), try to find a factor of the form x^2 + x + 1 by checking the value at a cube root of unity.',
            },
            {
              slug: 'small-irreducibles',
              title: 'Small irreducibles over small fields',
              prompt: `List all monic irreducible polynomials of degree at most $4$ over $\\mathbb{F}_2$. List those of degree $2$ over $\\mathbb{F}_3$, and find how many of degree $3$ there are over $\\mathbb{F}_3$ by counting products.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does having no root prove irreducibility for a cubic, but not for a quartic?',
              answerOutline: `A cubic that factors has a linear factor. A quartic can factor as two quadratics with no roots.`,
            },
            {
              question: 'State Eisenstein\'s criterion precisely.',
              answerOutline: `$p$ divides all coefficients but the leading one, $p$ does not divide the leading one, and $p^2$ does not divide the constant term. Then $f$ has no factorisation into lower degree polynomials over $\\mathbb{Q}$.`,
            },
            {
              question: 'If $f$ is reducible modulo $p$, can you conclude that it is reducible over $\\mathbb{Q}$?',
              answerOutline: `No. $x^4+1$ is reducible mod every prime and irreducible over $\\mathbb{Q}$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'polynomial-workbench',
        title: 'Polynomial workbench over finite fields',
        description: `Write a Python module for arithmetic in $\\mathbb{F}_p[x]$: addition, multiplication, division with remainder, gcd with Bezout coefficients, and an irreducibility test. Use it to count monic irreducible polynomials by degree and compare with what you predict. You should find $2,1,2,3,6,9,18,30$ monic irreducibles of degrees $1$ to $8$ over $\\mathbb{F}_2$ and $3,3,8,18,48$ of degrees $1$ to $5$ over $\\mathbb{F}_3$. Then add arithmetic in the Gaussian integers, with division by rounding and a gcd. The capstone builds on this module, so test it thoroughly.`,
        deliverables: [
          'A tested module for $\\mathbb{F}_p[x]$ with division, gcd and Bezout coefficients',
          'An irreducibility test, using trial division first and then a faster method based on gcds with $x^{p^k}-x$',
          'Tables of irreducible counts over $\\mathbb{F}_2$ and $\\mathbb{F}_3$',
          'A Gaussian integer class with gcd, and a factoriser for elements of small norm',
          'A short note explaining the analogy between $\\mathbb{Z}$ and $\\mathbb{F}_p[x]$, using your data',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add distinct-degree factorisation', 'Implement the Cantor-Zassenhaus algorithm for odd $p$'],
      },
    },
    {
      slug: 'fields',
      title: 'Fields',
      description:
        'Field extensions and their degrees, the construction and structure of finite fields, and two applications: impossible constructions and error-correcting codes.',
      lessons: [
        {
          slug: 'field-extensions-and-degree',
          title: 'Field extensions and degree',
          summary:
            'Adjoining roots, minimal polynomials, degree as a dimension, and the tower law.',
          estimatedMinutes: 170,
          objectives: [
            'Find the minimal polynomial of an algebraic number',
            'Compute degrees with the tower law',
            'Compute inverses in $F(\\alpha)$',
            'Prove that finite extensions are algebraic',
          ],
          concepts: [
            'Field extension $K/F$',
            'Degree $[K:F]$',
            'Algebraic and transcendental elements',
            'Minimal polynomial',
            'Simple extension $F(\\alpha)$',
            'Tower law',
          ],
          explanation: `A **field extension** $K/F$ is a field $K$ containing $F$. Then $K$ is a vector space over $F$, and its dimension is the **degree** $[K:F]$. An element $\\alpha\\in K$ is **algebraic** over $F$ if it is a root of a nonzero polynomial over $F$. Otherwise it is **transcendental**. If $\\alpha$ is algebraic, the monic polynomial $m$ of least degree with $m(\\alpha)=0$ is the **minimal polynomial**. It is irreducible, and it divides every polynomial vanishing at $\\alpha$.

Evaluation at $\\alpha$ is a homomorphism $F[x]\\to K$ with kernel $(m)$ and image $F[\\alpha]$. Since $m$ is irreducible and $F[x]$ is a PID, $(m)$ is maximal, so by the first isomorphism theorem
$$F[x]/(m)\\cong F[\\alpha]=F(\\alpha),\\qquad[F(\\alpha):F]=\\deg m.$$
A basis is $1,\\alpha,\\dots,\\alpha^{\\deg m-1}$. This is the central fact: a polynomial quotient and a concrete number field are the same thing. Also, given any irreducible $f\\in F[x]$, the quotient $F[x]/(f)$ is a field in which the class of $x$ is a root of $f$, so roots can always be created.

**Tower law.** If $F\\subseteq E\\subseteq K$ are finite extensions then $[K:F]=[K:E][E:F]$. If $u_i$ is a basis of $E$ over $F$ and $v_j$ a basis of $K$ over $E$, then the products $u_iv_j$ form a basis of $K$ over $F$. A finite extension is algebraic: the powers of $\\alpha$ cannot all be independent.

**Worked example.** Let $K=\\mathbb{Q}(\\sqrt2,\\sqrt3)$. First, $[\\mathbb{Q}(\\sqrt2):\\mathbb{Q}]=2$, since $x^2-2$ is irreducible. Next, $\\sqrt3\\notin\\mathbb{Q}(\\sqrt2)$: if $(a+b\\sqrt2)^2=3$ with $a,b$ rational, then $2ab=0$, so $a^2=3$ or $2b^2=3$, neither of which has a rational solution. So $x^2-3$ stays irreducible over $\\mathbb{Q}(\\sqrt2)$, and the tower law gives $[K:\\mathbb{Q}]=2\\cdot 2=4$, with basis $1,\\sqrt2,\\sqrt3,\\sqrt6$.

Let $\\alpha=\\sqrt2+\\sqrt3$. Then $\\alpha^2=5+2\\sqrt6$, so $(\\alpha^2-5)^2=24$, that is, $\\alpha^4-10\\alpha^2+1=0$. Is $x^4-10x^2+1$ the minimal polynomial? Since $\\alpha^3=11\\sqrt2+9\\sqrt3$, we have $\\alpha^3-9\\alpha=2\\sqrt2$. So $\\sqrt2\\in\\mathbb{Q}(\\alpha)$, and then $\\sqrt3=\\alpha-\\sqrt2\\in\\mathbb{Q}(\\alpha)$. Thus $\\mathbb{Q}(\\alpha)=K$ has degree $4$, and the minimal polynomial has degree $4$, so it is this quartic.

**Inverses.** To invert in $F(\\alpha)$, use the Euclidean algorithm with $m$, or spot a factorisation. With $\\beta=\\sqrt[3]{2}$, we have $(1+\\beta)(1-\\beta+\\beta^2)=1+\\beta^3=3$, so $(1+\\beta)^{-1}=(1-\\beta+\\beta^2)/3$.`,
          resources: [
            judson('Read the chapter on fields, through algebraic extensions.'),
            conrad('galoistheory/rootirred.pdf', 'Roots and irreducible polynomials', 'How the degree of a root relates to irreducibility.'),
            { title: 'Milne: Fields and Galois Theory', url: 'https://www.jmilne.org/math/CourseNotes/ft.html', type: 'textbook', cost: 'free', provider: 'J. S. Milne', note: 'The opening chapters give a concise treatment at a slightly higher level.' },
          ],
          exercises: [
            {
              slug: 'tower-law-proof',
              title: 'Prove the tower law',
              prompt: `Prove that if $F\\subseteq E\\subseteq K$ with both $[E:F]$ and $[K:E]$ finite, then the products of basis elements form a basis of $K$ over $F$, and so $[K:F]=[K:E][E:F]$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'minimal-polynomials',
              title: 'Three minimal polynomials',
              prompt: `Find the minimal polynomial over $\\mathbb{Q}$ of (a) $\\sqrt2+i$; (b) $\\sqrt{1+\\sqrt2}$; (c) $\\cos(2\\pi/7)$. Prove that your polynomial is irreducible in each case.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (c), the seventh roots of unity other than 1 are the roots of z^6 + z^5 + ... + 1. Divide by z^3 and put y = z + 1/z.',
            },
            {
              slug: 'inverses-in-extensions',
              title: 'Inverses in a quotient',
              prompt: `Let $\\alpha^3=2$ with $\\alpha$ real, and find $(\\alpha^2+\\alpha+1)^{-1}$ as a polynomial in $\\alpha$. Let $\\beta$ be a root of the irreducible polynomial $x^3+x+1$ over $\\mathbb{Q}$, and find $(\\beta^2+1)^{-1}$. Then find $(\\beta+1)^{-1}$ using the Euclidean algorithm.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'coprime-degrees',
              title: 'Coprime degrees multiply',
              prompt: `Suppose that $[F(\\alpha):F]=m$ and $[F(\\beta):F]=n$ with $\\gcd(m,n)=1$. Prove that $[F(\\alpha,\\beta):F]=mn$. Use this to find the degree $[\\mathbb{Q}(\\sqrt[3]{2},\\sqrt[5]{3}):\\mathbb{Q}]$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'algebraic-numbers',
              title: 'The field of algebraic numbers',
              prompt: `Prove that if $\\alpha,\\beta$ are algebraic over $F$ then so are $\\alpha+\\beta$, $\\alpha\\beta$ and $\\alpha^{-1}$ (for $\\alpha\\ne 0$). Conclude that the algebraic numbers form a field, and prove that this field has infinite degree over $\\mathbb{Q}$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the minimal polynomial irreducible?',
              answerOutline: `If $m=gh$ with lower degree, then $g(\\alpha)h(\\alpha)=0$ in a field, so one of them vanishes at $\\alpha$, contradicting minimality.`,
            },
            {
              question: 'Can $\\mathbb{Q}(\\sqrt[3]{2})$ contain $\\sqrt2$?',
              answerOutline: `No. That would make $2=[\\mathbb{Q}(\\sqrt2):\\mathbb{Q}]$ divide $3$, by the tower law.`,
            },
            {
              question: 'Give a basis for $\\mathbb{Q}(\\sqrt[4]{2})$ over $\\mathbb{Q}$ and state its degree.',
              answerOutline: `$1,\\alpha,\\alpha^2,\\alpha^3$ where $\\alpha=\\sqrt[4]{2}$. The degree is $4$, since $x^4-2$ is Eisenstein at $2$.`,
            },
          ],
        },
        {
          slug: 'finite-fields',
          title: 'Finite fields',
          summary:
            'Exactly one field of each prime power order, its cyclic multiplicative group, and its subfields.',
          estimatedMinutes: 180,
          objectives: [
            'Prove that a finite field has prime power order',
            'Build $\\mathbb{F}_{p^n}$ as a polynomial quotient and compute in it',
            'Prove that the multiplicative group is cyclic',
            'Describe the subfields of $\\mathbb{F}_{p^n}$',
          ],
          concepts: [
            'Prime subfield',
            'Order $p^n$',
            'Existence and uniqueness',
            'Cyclic multiplicative group',
            'Primitive element',
            'Frobenius automorphism',
            'Subfield criterion $d\\mid n$',
          ],
          explanation: `Let $F$ be a finite field. Its characteristic is a prime $p$, so $F$ contains $\\mathbb{F}_p$. As a vector space of some dimension $n$ over $\\mathbb{F}_p$, it has $p^n$ elements. So the order of a finite field is a prime power, and there is no field of order $6$.

**Existence and uniqueness.** For every prime power $q=p^n$ there is a field of order $q$, unique up to isomorphism. It is the set of roots of $x^q-x$ in a splitting field. To work in practice, choose an irreducible $f\\in\\mathbb{F}_p[x]$ of degree $n$. Then $\\mathbb{F}_q=\\mathbb{F}_p[x]/(f)$. Different choices of $f$ give isomorphic fields with different coordinates. Note that $\\mathbb{F}_4$ is not $\\mathbb{Z}_4$: $\\mathbb{Z}_4$ is not a field.

**The multiplicative group is cyclic.** Let $G=F^\\times$, of order $q-1$. For $d\\mid q-1$, the equation $x^d=1$ has at most $d$ solutions by the root bound. A finite abelian group with at most $d$ solutions to $x^d=e$ for every $d$ is cyclic. A generator is a **primitive element**, and there are $\\varphi(q-1)$ of them. Every nonzero element is a power of a primitive element, which turns multiplication into addition of exponents.

**Frobenius.** The map $\\sigma(a)=a^p$ is an automorphism of $\\mathbb{F}_{p^n}$ with $\\sigma^n=\\mathrm{id}$, because $a^{p^n}=a$. Its fixed points are the roots of $x^p-x$, which are exactly $\\mathbb{F}_p$.

**Subfields.** $\\mathbb{F}_{p^n}$ contains a subfield of order $p^d$ if and only if $d\\mid n$, and then exactly one. One direction is the tower law. The other uses $x^{p^d}-x\\mid x^{p^n}-x$ when $d\\mid n$.

**Worked example.** Build $\\mathbb{F}_8=\\mathbb{F}_2[x]/(x^3+x+1)$. The cubic has no roots in $\\mathbb{F}_2$, so it is irreducible. Let $\\alpha$ be the class of $x$, so $\\alpha^3=\\alpha+1$. Since signs do not matter in characteristic $2$, the powers are:

| power | value |
|---|---|
| $\\alpha^3$ | $\\alpha+1$ |
| $\\alpha^4$ | $\\alpha^2+\\alpha$ |
| $\\alpha^5$ | $\\alpha^3+\\alpha^2=\\alpha^2+\\alpha+1$ |
| $\\alpha^6$ | $\\alpha^3+\\alpha^2+\\alpha=\\alpha^2+1$ |
| $\\alpha^7$ | $\\alpha^3+\\alpha=1$ |

So $\\alpha$ has order $7$ and is primitive. All six non-identity elements of a group of order $7$ are generators, consistent with $\\varphi(7)=6$. To multiply, add exponents: $(\\alpha^2+1)(\\alpha+1)=\\alpha^6\\cdot\\alpha^3=\\alpha^9=\\alpha^2$. To find an inverse, $(\\alpha^2+\\alpha)^{-1}=\\alpha^{-4}=\\alpha^3=\\alpha+1$.

There is a beautiful factorisation behind all of this: $x^{p^n}-x$ is the product of all monic irreducible polynomials over $\\mathbb{F}_p$ of degree dividing $n$. Comparing degrees gives a count of irreducibles.`,
          resources: [
            judson('Read the chapter on finite fields.'),
            conrad('galoistheory/finitefields.pdf', 'Finite fields', 'Proofs of existence, uniqueness and the subfield structure.'),
            conrad('grouptheory/cyclicmodp.pdf', 'Cyclicity of (Z/(p))×', 'Several proofs that the multiplicative group is cyclic.'),
            sympyPolys('`GF(p)` and `Poly(..., modulus=p)` help you check tables like the one here.'),
          ],
          exercises: [
            {
              slug: 'multiplicative-group',
              title: 'Prove the group is cyclic',
              prompt: `Prove that a finite subgroup of the multiplicative group of any field is cyclic. Use the counting in $\\sum_{d\\mid n}\\varphi(d)=n$ or the structure of finite abelian groups.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'f9-table',
              title: 'Computing in F9',
              prompt: `Let $\\mathbb{F}_9=\\mathbb{F}_3[x]/(x^2+1)$ with $\\theta$ the class of $x$. Find the order of $\\theta$ and of $1+\\theta$. List the powers of a primitive element. How many primitive elements are there?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'subfield-lattice',
              title: 'A subfield lattice',
              prompt: `Draw the subfield lattice of $\\mathbb{F}_{2^{12}}$. Is $\\mathbb{F}_{16}$ a subfield of $\\mathbb{F}_{64}$? Prove the "only if" direction of the subfield criterion.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'count-irreducibles',
              title: 'Counting irreducible polynomials',
              prompt: `Assume the factorisation of $x^{p^n}-x$ into irreducibles of degree dividing $n$. Let $N_d$ be the number of monic irreducibles of degree $d$ over $\\mathbb{F}_p$. Show $p^n=\\sum_{d\\mid n}dN_d$. Use this to find $N_4$ and $N_6$ for $p=2$, and $N_5$ for $p=3$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'primitive-polynomials',
              title: 'Primitive polynomials',
              prompt: `Call an irreducible polynomial of degree $n$ over $\\mathbb{F}_p$ **primitive** if its roots generate the multiplicative group of $\\mathbb{F}_{p^n}$. Show that there are $\\varphi(p^n-1)/n$ of them. Find them for $p=2$, $n=4$, and show that $x^4+x^3+x^2+x+1$ is irreducible but not primitive.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'The roots of an irreducible polynomial of degree n form a single orbit of Frobenius, of size n.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there no field with $6$ elements?',
              answerOutline: `A finite field is a vector space over its prime subfield $\\mathbb{F}_p$, so it has $p^n$ elements, and $6$ is not a prime power.`,
            },
            {
              question: 'What is the difference between $\\mathbb{Z}_{16}$ and $\\mathbb{F}_{16}$?',
              answerOutline: `$\\mathbb{Z}_{16}$ has zero divisors and characteristic $16$. $\\mathbb{F}_{16}$ is a field of characteristic $2$.`,
            },
            {
              question: 'Is $\\mathbb{F}_4$ a subfield of $\\mathbb{F}_8$?',
              answerOutline: `No, since $2\\nmid 3$. The tower law would force $2$ to divide $3$.`,
            },
          ],
        },
        {
          slug: 'straightedge-and-compass',
          title: 'Straightedge and compass constructions',
          summary:
            'How field degrees settled problems that stood open for two thousand years.',
          estimatedMinutes: 150,
          objectives: [
            'Define constructible numbers and describe what the tools can do algebraically',
            'Prove that a constructible number has degree a power of $2$ over $\\mathbb{Q}$',
            'Prove the impossibility of doubling the cube and of trisecting $60^\\circ$',
            'State the criterion for constructible regular polygons',
          ],
          concepts: [
            'Constructible number',
            'Quadratic tower',
            'Doubling the cube',
            'Trisecting an angle',
            'Squaring the circle',
            'Fermat primes',
            'Gauss-Wantzel theorem',
          ],
          explanation: `Start with the points $(0,0)$ and $(1,0)$. You may draw the line through two known points and the circle centred at a known point through another known point. Intersections of these give new known points. A real number is **constructible** if it is a coordinate of a point you can reach (equivalently, if a segment of that length can be built).

**The constructible numbers form a field closed under square roots.** Sums, products and inverses come from similar triangles, and $\\sqrt a$ from the semicircle on a segment of length $1+a$. So we can construct a great deal, including every number in a tower of quadratic extensions.

**Nothing else is constructible.** Let $K$ be a field containing the coordinates of the known points. A line through two points of $K^2$ has an equation with coefficients in $K$, and a circle too. Intersecting two lines stays in $K$. Intersecting a line with a circle, or two circles (subtracting their equations gives a line), reduces to a quadratic over $K$, so the new coordinates lie in $K$ or in an extension of degree $2$. So every constructible $\\alpha$ lies at the top of a tower
$$\\mathbb{Q}=K_0\\subset K_1\\subset\\dots\\subset K_m,\\qquad[K_{i+1}:K_i]=2.$$
By the tower law, **$[\\mathbb{Q}(\\alpha):\\mathbb{Q}]$ divides $2^m$, so it is a power of $2$.** This is necessary but not sufficient: a degree of $4$ does not guarantee that a number is constructible.

**Worked example: trisecting $60^\\circ$.** An angle $60^\\circ$ is constructible, since an equilateral triangle is. If it could be trisected, then $\\cos 20^\\circ$ would be constructible. The identity $\\cos 3\\theta=4\\cos^3\\theta-3\\cos\\theta$ with $\\theta=20^\\circ$ gives $\\tfrac12=4c^3-3c$, where $c=\\cos 20^\\circ$. Put $y=2c$. Then $y^3-3y-1=0$. A rational root must be $\\pm1$, and $1-3-1=-3$, and $-1+3-1=1$, so there is none. A cubic with no rational root is irreducible, so $[\\mathbb{Q}(y):\\mathbb{Q}]=3$, which is not a power of $2$. So $y$, and hence $c$, is not constructible. This does not say that no angle can be trisected ($90^\\circ$ can), but it shows that no method works for all angles.

**The others.** Doubling the cube needs $\\sqrt[3]{2}$, of degree $3$. Squaring the circle needs $\\sqrt\\pi$, and since $\\pi$ is transcendental (Lindemann's theorem, which we do not prove) it has infinite degree. For polygons, the regular $n$-gon is constructible exactly when $\\cos(2\\pi/n)$ is, and the **Gauss-Wantzel theorem** says this happens exactly when $n$ is a power of $2$ times a product of distinct Fermat primes $2^{2^k}+1$. The known ones are $3,5,17,257,65537$.`,
          resources: [
            judson('The chapter on fields ends with geometric constructions.'),
            { title: 'Milne: Fields and Galois Theory', url: 'https://www.jmilne.org/math/CourseNotes/ft.html', type: 'textbook', cost: 'free', provider: 'J. S. Milne', note: 'See the part on constructions with ruler and compass.' },
            ocw702('The lectures on field extensions and constructions treat this same application.'),
          ],
          exercises: [
            {
              slug: 'double-the-cube',
              title: 'Doubling the cube',
              prompt: `State the problem of doubling the cube as a statement about a constructible number, and prove that it is impossible. Then decide whether $\\sqrt[4]{2}$ and $\\sqrt[6]{2}$ are constructible, with reasons.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'constructible-closure',
              title: 'Closure of constructible numbers',
              prompt: `Assuming you can draw perpendiculars and parallels, give explicit constructions proving that the constructible numbers are closed under multiplication, division and taking square roots of positive numbers. Prove each by similar triangles or by coordinates.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'which-polygons',
              title: 'Which polygons',
              prompt: `Show that $\\cos(2\\pi/5)=(\\sqrt5-1)/4$, and so the regular pentagon is constructible. Prove that the regular $7$-gon and $9$-gon are not constructible, using a cubic in each case. Explain why the degree test alone cannot rule out the $17$-gon.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'trisect-the-right-angle',
              title: 'Which multiples of a degree',
              prompt: `Show that the angles of $3^\\circ$ can be constructed but those of $1^\\circ$ cannot. Use that $72^\\circ$ and $60^\\circ$ are constructible for the first part, and the impossibility of trisecting $60^\\circ$ for the second.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the second part, if 1 degree were constructible then 20 degrees would be, by repeated addition.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a single construction step raise the degree by at most $2$?',
              answerOutline: `New points come from intersecting lines and circles, which amounts to solving linear or quadratic equations over the current field.`,
            },
            {
              question: 'Does degree $4$ over $\\mathbb{Q}$ imply that a number is constructible?',
              answerOutline: `No. A power of $2$ is necessary, but not sufficient.`,
            },
            {
              question: 'Which identity turns trisection into a cubic?',
              answerOutline: `$\\cos 3\\theta=4\\cos^3\\theta-3\\cos\\theta$.`,
            },
          ],
        },
        {
          slug: 'reed-solomon-codes',
          title: 'Reed-Solomon codes',
          summary:
            'Polynomials over finite fields make error-correcting codes, and the root bound gives their guarantee.',
          estimatedMinutes: 170,
          objectives: [
            'Define the length, dimension and distance of a linear code',
            'Encode a message with a Reed-Solomon code',
            'Prove the distance of a Reed-Solomon code',
            'Describe cyclic codes as ideals in a quotient ring',
          ],
          concepts: [
            'Linear code $[n,k,d]$',
            'Hamming distance',
            'Singleton bound',
            'Reed-Solomon code',
            'Error correction radius',
            'Cyclic code',
            'Berlekamp-Welch decoding',
          ],
          explanation: `A **code** over a finite field $\\mathbb{F}_q$ is a set of words of length $n$. It is **linear** if it is a subspace of $\\mathbb{F}_q^n$, of dimension $k$. The **Hamming distance** between two words is the number of positions where they differ, and the **minimum distance** $d$ of a code is the least distance between two different codewords. For a linear code, $d$ is the least number of nonzero entries in a nonzero codeword. We call this an $[n,k,d]$ code. If a word is sent and at most $t$ positions change, with $2t<d$, then the sent word is still the unique nearest codeword. So the code corrects $\\lfloor(d-1)/2\\rfloor$ errors.

**Reed-Solomon codes.** Choose $n\\le q$ distinct points $a_1,\\dots,a_n\\in\\mathbb{F}_q$. A message is a polynomial $f$ of degree less than $k$, with its $k$ coefficients as the data. The codeword is $(f(a_1),\\dots,f(a_n))$.

This is a linear map. If $f\\ne 0$ then $f$ has at most $k-1$ roots, by the root bound in a field, so at most $k-1$ entries of the codeword vanish. So there are at least $n-k+1$ nonzero entries, and $d\\ge n-k+1$. The **Singleton bound** says $d\\le n-k+1$ for every linear code. So Reed-Solomon codes are as good as possible for their length and dimension, and $d=n-k+1$ exactly.

**Worked example.** Work over $\\mathbb{F}_7$, with $k=2$ and evaluation points $1,2,3,4,5,6$, so $n=6$ and $d=5$. This corrects $2$ errors. The message $(3,2)$ means $f(x)=3+2x$, and the codeword is
$$(5,0,2,4,6,1).$$
Suppose the last two positions are corrupted, so you receive $(5,0,2,4,0,0)$. The polynomial $f$ agrees with this in $4$ places. Any other polynomial $g$ of degree less than $2$ has $g-f\\ne 0$ of degree at most $1$, so it agrees with $f$ in at most $1$ place. So $g$ agrees with the received word in at most $1+2=3$ places. Therefore $f$ is the only polynomial agreeing in $4$ places, and it is what was sent.

Trying all polynomials is exponential in $k$, so we need a better decoder. **Berlekamp-Welch** looks for an **error locator** $E(x)=\\prod(x-a_i)$ over bad positions, and $Q=fE$. Then $Q(a_i)=y_iE(a_i)$ holds at every position, whether or not it is in error. With $E$ of degree $t$ and $Q$ of degree less than $k+t$, this is a linear system in the coefficients. Solving it and dividing gives $f=Q/E$.

**Cyclic codes.** Word vectors of length $n$ correspond to polynomials in $R=\\mathbb{F}_q[x]/(x^n-1)$, where multiplication by $x$ is a cyclic shift. A subspace closed under cyclic shift is therefore an ideal of $R$. Since $\\mathbb{F}_q[x]$ is a PID, each ideal is generated by a monic divisor of $x^n-1$. So quotient rings describe real codes directly.`,
          resources: [
            judson('Read the chapter on algebraic coding theory.'),
            { title: 'Essential Coding Theory', url: 'https://cse.buffalo.edu/faculty/atri/courses/coding-theory/book/', type: 'textbook', cost: 'free', provider: 'Guruswami, Radhakrishnan and Sudan', note: 'A free book. See the chapters on Reed-Solomon codes and on decoding them.' },
            ocw703('The notes on finite fields and their applications connect this to the algebra here.'),
          ],
          exercises: [
            {
              slug: 'singleton-bound',
              title: 'The Singleton bound',
              prompt: `Prove that a linear $[n,k,d]$ code over any field satisfies $d\\le n-k+1$, by showing that deleting $d-1$ coordinates is injective on the code.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'rs-encode-f11',
              title: 'Encoding over F11',
              prompt: `Over $\\mathbb{F}_{11}$ take $k=3$ and evaluation points $1,\\dots,10$. Find the parameters $[n,k,d]$ and the number of errors corrected. Encode the message $f(x)=1+2x+3x^2$. Confirm that your codeword has at most two zero entries, and say why that had to be so.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'berlekamp-welch-small',
              title: 'Berlekamp-Welch by hand',
              prompt: `Work over $\\mathbb{F}_7$ with $k=2$ and points $1,2,3,4,5$. You receive $(5,0,5,4,6)$, known to have at most one error. Write $E(x)=x-e$ and $Q(x)=q_2x^2+q_1x+q_0$, and solve $Q(a_i)=y_iE(a_i)$ as a linear system. Recover $f=Q/E$, the error position and the sent word.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'binary-cyclic-length-seven',
              title: 'Binary cyclic codes of length seven',
              prompt: `Factor $x^7-1$ into irreducibles over $\\mathbb{F}_2$. How many binary cyclic codes of length $7$ are there? For the code generated by $x^3+x+1$, find the dimension and the minimum distance, and identify it as the Hamming code.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cyclic-codes-ideals',
              title: 'Cyclic codes are ideals',
              prompt: `Prove that a subspace of $\\mathbb{F}_q^n$ is closed under cyclic shift if and only if the corresponding set is an ideal of $\\mathbb{F}_q[x]/(x^n-1)$. Prove that every such ideal is generated by a unique monic divisor $g$ of $x^n-1$, and that the code has dimension $n-\\deg g$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the root bound give the distance of a Reed-Solomon code?',
              answerOutline: `A nonzero $f$ of degree less than $k$ has at most $k-1$ roots, so its codeword has at least $n-k+1$ nonzero entries.`,
            },
            {
              question: 'Why must $n\\le q$ in this construction?',
              answerOutline: `The evaluation points must be distinct elements of $\\mathbb{F}_q$.`,
            },
            {
              question: 'A code has minimum distance $7$. How many errors can it correct?',
              answerOutline: `$\\lfloor(7-1)/2\\rfloor=3$.`,
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'reed-solomon-from-the-ground-up',
    title: 'A Reed-Solomon codec from the ground up',
    description: `Build a working error-correcting code using nothing but the algebra in this course, and write up why each step works. You will construct the finite field $\\mathbb{F}_{256}$ as a quotient $\\mathbb{F}_2[x]/(m(x))$ for an irreducible polynomial $m$ of degree $8$, implement polynomial arithmetic over it, encode messages by evaluating polynomials, and decode corrupted codewords using the Berlekamp-Welch algorithm. The decoder reduces to solving a linear system over the field, so every part is something you can check by hand on a small field such as $\\mathbb{F}_7$ or $\\mathbb{F}_{16}$ first.

The write-up matters as much as the code. Prove that your $m(x)$ is irreducible, prove the distance of the code from the fact that a nonzero polynomial of degree less than $k$ has fewer than $k$ roots, and identify each result you relied on, such as the division algorithm in $F[x]$, the structure of finite fields and the tower law where it appears.`,
    deliverables: [
      'Python modules for $\\mathbb{F}_p$, $\\mathbb{F}_p[x]$ and $\\mathbb{F}_{256}$, with tests against SymPy or hand computations',
      'A verified proof that your degree-8 modulus is irreducible, and a generator of the multiplicative group of $\\mathbb{F}_{256}$',
      'An encoder and a Berlekamp-Welch decoder for a code of parameters $n=255$, $k=223$, plus a small version over $\\mathbb{F}_7$ with a worked example by hand',
      'An experiment measuring decoding success as the number of random symbol errors rises past $16$, with a plot',
      'A written report of 4-8 pages with the proofs of field construction, code distance and decoder correctness',
    ],
    estimatedHours: 18,
    stretchGoals: [
      'Add erasure decoding and show that twice as many erasures as errors can be corrected',
      'Implement the Gao or Berlekamp-Massey decoder and compare running times',
      'Use the code to recover a corrupted image file',
    ],
  },
  masteryChecklist: [
    'I can state and prove Lagrange\'s theorem and the first isomorphism theorem from memory',
    'I can decide whether a subgroup is normal and identify a quotient group up to isomorphism',
    'I can classify the finite abelian groups of a given order',
    'I can use orbit-stabiliser, Burnside and the class equation in concrete problems',
    'I can use the Sylow theorems to prove that groups of a given order are not simple',
    'I can compute in quotient rings and identify prime and maximal ideals',
    'I can prove that a Euclidean domain is a principal ideal domain and a unique factorisation domain',
    'I can decide irreducibility over $\\mathbb{Q}$ and $\\mathbb{F}_p$ with the right test',
    'I can compute degrees of field extensions and construct and calculate in a finite field',
    'I can explain why trisecting the angle and doubling the cube are impossible',
  ],
});
