import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const axler: ResourceInput = {
  title: 'Linear Algebra Done Right',
  url: 'https://linear.axler.net/',
  type: 'textbook',
  cost: 'free',
  provider: 'Sheldon Axler',
};
const hefferon: ResourceInput = {
  title: 'Linear Algebra (Hefferon)',
  url: 'https://hefferon.net/linearalgebra/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jim Hefferon',
};
const mit18700: ResourceInput = {
  title: 'MIT 18.700 Linear Algebra',
  url: 'https://ocw.mit.edu/courses/18-700-linear-algebra-fall-2013/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const mit18701: ResourceInput = {
  title: 'MIT 18.701 Algebra I',
  url: 'https://ocw.mit.edu/courses/18-701-algebra-i-fall-2010/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const treil: ResourceInput = {
  title: 'Linear Algebra Done Wrong',
  url: 'https://sites.google.com/a/brown.edu/sergei-treil-homepage/linear-algebra-done-wrong',
  type: 'textbook',
  cost: 'free',
  provider: 'Sergei Treil',
};
const bookOfProof: ResourceInput = {
  title: 'Book of Proof',
  url: 'https://richardhammack.github.io/BookOfProof/',
  type: 'textbook',
  cost: 'free',
  provider: 'Richard Hammack',
};
const conradDimension: ResourceInput = {
  title: 'The Dimension of a Vector Space',
  url: 'https://kconrad.math.uconn.edu/blurbs/linmultialg/dimension.pdf',
  type: 'article',
  cost: 'free',
  provider: 'Keith Conrad',
};
const conradDual: ResourceInput = {
  title: 'Dual Modules',
  url: 'https://kconrad.math.uconn.edu/blurbs/linmultialg/dualmod.pdf',
  type: 'article',
  cost: 'free',
  provider: 'Keith Conrad',
};
const conradMinpoly: ResourceInput = {
  title: 'The Minimal Polynomial and Some Applications',
  url: 'https://kconrad.math.uconn.edu/blurbs/linmultialg/minpolyandappns.pdf',
  type: 'article',
  cost: 'free',
  provider: 'Keith Conrad',
};
const conradBilinear: ResourceInput = {
  title: 'Bilinear Forms',
  url: 'https://kconrad.math.uconn.edu/blurbs/linmultialg/bilinearform.pdf',
  type: 'article',
  cost: 'free',
  provider: 'Keith Conrad',
};

const main = (r: ResourceInput, note: string): ResourceInput => ({ ...r, note, primary: true });
const also = (r: ResourceInput, note: string): ResourceInput => ({ ...r, note });

export default defineSubject({
  id: 'abstract-linear-algebra',
  title: 'Abstract Linear Algebra',
  category: 'math',
  tagline:
    'Vector spaces over any field, linear maps, canonical forms and the spectral theorems, developed through proof.',
  description: `This course follows the University of Illinois course MATH 416, Abstract Linear Algebra, and is based on its public catalog description. The content here is original and is not affiliated with the University of Illinois.

\`linear-algebra-computational\` taught you to compute with matrices. This course asks why the computations work and what they mean apart from any choice of coordinates. The central objects are vector spaces and the linear maps between them, and a matrix appears only once you choose bases. Working this way shows what is really true: which results hold over every field, which need an algebraically closed field, which fail in characteristic 2, and which need finite dimension.

So the field matters here, and you should read hypotheses carefully. The first four modules work over a general field $F$, with finite fields such as $\\mathbb{F}_2$ and $\\mathbb{F}_5$ used often as test cases, because they break the habits you formed over $\\mathbb{R}$. Inner product spaces then restrict to $\\mathbb{R}$ and $\\mathbb{C}$. The main results are rank-nullity, duality, the determinant as the unique alternating form, the Cayley-Hamilton theorem, primary decomposition, Jordan form, the spectral theorems, the singular value decomposition and Sylvester's law of inertia.

This is a proof course, and most exercises are proofs. Write them out in full. A proof you have only thought through is usually a proof with a gap. The prerequisites are \`higher-mathematics\`, for proof technique, and \`linear-algebra-computational\`, for fluency with matrices. Each lesson teaches its material on the page, and Axler's free *Linear Algebra Done Right* is the best companion, though its order differs from the order here.`,
  difficulty: 'advanced',
  estimatedHours: 80,
  prerequisites: ['higher-mathematics', 'linear-algebra-computational'],
  recommendedBackground: [
    'Comfort writing proofs by induction and by contradiction',
    'Experience with row reduction, eigenvalues and the SVD on concrete matrices',
    'Python, for the optional finite-field experiments and the project code',
  ],
  tags: ['linear algebra', 'proofs', 'fields', 'duality', 'canonical forms', 'spectral theorem', 'bilinear forms'],
  core: false,
  modules: [
    {
      slug: 'vector-spaces-over-fields',
      title: 'Vector Spaces over Fields',
      description:
        'Set up vector spaces over an arbitrary field, and prove from the axioms the results on subspaces, bases and dimension that you have been using.',
      lessons: [
        {
          slug: 'fields-and-vector-spaces',
          title: 'Fields and vector spaces',
          summary:
            'Define fields and vector spaces, meet finite fields, and prove basic consequences of the axioms.',
          estimatedMinutes: 120,
          objectives: [
            'State the field and vector space axioms and give examples of each',
            'Do arithmetic in the prime fields $\\mathbb{F}_p$',
            'Prove elementary consequences of the axioms carefully',
            'Explain how a property such as singularity depends on the field',
          ],
          concepts: [
            'Field',
            'Prime field and characteristic',
            'Vector space axioms',
            'Function spaces',
            'Polynomials versus polynomial functions',
          ],
          explanation: `A **field** $F$ is a set with addition and multiplication in which both operations are commutative and associative, multiplication distributes over addition, there are distinct identities 0 and 1, every element has an additive inverse, and every non-zero element has a multiplicative inverse. Examples are $\\mathbb{Q}$, $\\mathbb{R}$, $\\mathbb{C}$ and, for $p$ prime, the integers modulo $p$, written $\\mathbb{F}_p$. The ring $\\mathbb{Z}/6$ is not a field, since $2 \\cdot 3 = 0$ rules out an inverse for 2. The **characteristic** of $F$ is the least positive $n$ with $1 + \\dots + 1 = 0$ ($n$ terms), or 0 if there is no such $n$. In $\\mathbb{F}_2$, $1 + 1 = 0$, so $-1 = 1$, and dividing by 2 is impossible. Many proofs fail at exactly that point.

A **vector space** over $F$ is an abelian group $(V, +)$ with a scalar multiplication satisfying $c(u + v) = cu + cv$, $(c + d)v = cv + dv$, $(cd)v = c(dv)$ and $1v = v$. The examples go well beyond $F^n$: all functions $S \\to F$ on a set $S$, the polynomials $F[t]$, the $m \\times n$ matrices, and $\\mathbb{C}$ as a space over $\\mathbb{R}$.

Everything must follow from the axioms, including facts that look obvious.

**Worked example: a proof.** Claim: $0v = 0$ for every $v \\in V$. Here the first 0 is a scalar and the second a vector. In $F$, $0 + 0 = 0$, so $0v = (0 + 0)v = 0v + 0v$. Add the additive inverse of $0v$ to both sides, which gives $0 = 0v$. Then $(-1)v$ is the additive inverse of $v$, because $v + (-1)v = (1 + (-1))v = 0v = 0$.

**Worked example: the field matters.** Let
$$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}.$$
Its determinant is 5. Over $\\mathbb{Q}$ it is invertible. Over $\\mathbb{F}_5$ the determinant is 0, and indeed $3 \\cdot (2, 1) = (6, 3) = (1, 3)$, so the second row is a multiple of the first. Over $\\mathbb{F}_7$ it is invertible again. An integer matrix can change its rank when you reduce it modulo $p$.

One more warning: polynomials are not the same as functions. Over $\\mathbb{F}_2$, $t^2 + t$ is a non-zero polynomial, but it takes the value 0 at both elements of $\\mathbb{F}_2$. So the map from polynomials to functions is not injective, although it is injective over any infinite field. In this course, an element of $F[t]$ is a formal polynomial.`,
          resources: [
            main(axler, 'The opening chapter on vector spaces. Note that Axler works over $\\mathbb{R}$ and $\\mathbb{C}$; the same proofs work over any field wherever no division by 2 or ordering is used.'),
            also(hefferon, 'The definition of a vector space, with many examples and non-examples.'),
            also(bookOfProof, 'Review this if your proof writing needs refreshing.'),
          ],
          exercises: [
            {
              slug: 'axiom-consequences',
              title: 'Consequences of the axioms',
              prompt:
                'From the vector space axioms alone, prove: (a) the zero vector and additive inverses are unique; (b) $c0 = 0$ for every scalar $c$; (c) if $cv = 0$ then $c = 0$ or $v = 0$. Say exactly where you use that $F$ is a field in (c), and give a module over $\\mathbb{Z}/6$ in which the statement fails.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'integers-mod-n',
              title: 'When the integers mod n form a field',
              prompt:
                'Prove that $\\mathbb{Z}/n$ is a field if and only if $n$ is prime. Then prove that the characteristic of any field is 0 or a prime.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the inverse, use Bezout: if $\\gcd(a, n) = 1$ then $ax + ny = 1$ for some integers $x, y$.',
            },
            {
              slug: 'unit-axiom-independent',
              title: 'The axiom you might think is redundant',
              prompt:
                'On $\\mathbb{R}^2$ keep the usual addition and define $c \\odot (x, y) = (cx, 0)$. Verify that every vector space axiom holds except $1v = v$. What does this show about the role of that axiom?',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'primes-where-singular',
              title: 'Primes where a matrix is singular',
              prompt:
                'Find all primes $p$ for which the matrix with rows $(3, 1, 2)$, $(1, 4, 1)$, $(2, 1, 5)$ is singular over $\\mathbb{F}_p$, and prove that your list is complete. Confirm with a short Python rank computation modulo $p$ for each $p$ below 50.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The determinant over $\\mathbb{Z}$ reduces modulo $p$ to the determinant over $\\mathbb{F}_p$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $2 \\cdot 3 = 0$ stop $\\mathbb{Z}/6$ from being a field?',
              answerOutline: 'If 2 had an inverse then $3 = 2^{-1} \\cdot 2 \\cdot 3 = 0$, which is false. A field has no zero divisors.',
            },
            {
              question: 'Give a non-zero polynomial over a field that is zero as a function.',
              answerOutline: '$t^p - t$ over $\\mathbb{F}_p$, by Fermat. For $p = 2$ this is $t^2 + t$.',
            },
            {
              question: 'What is $1 + 1$ in a field of characteristic 2, and what fails as a result?',
              answerOutline: 'It is 0, so 2 has no inverse. Anything that divides by 2 fails, and $v = -v$ for every vector $v$.',
            },
          ],
        },
        {
          slug: 'subspaces-sums-and-direct-sums',
          title: 'Subspaces, sums and direct sums',
          summary:
            'Build new spaces from old with sums and direct sums, and learn exactly when a sum is direct.',
          estimatedMinutes: 110,
          objectives: [
            'Prove that a subset is a subspace',
            'Describe the sum of subspaces as the smallest subspace containing them',
            'State and prove the criterion for a sum to be direct',
            'Identify where a decomposition depends on the characteristic',
          ],
          concepts: [
            'Subspace',
            'Sum of subspaces',
            'Direct sum',
            'Complementary subspaces',
            'Even and odd functions',
          ],
          explanation: `A **subspace** of $V$ is a subset containing 0 that is closed under addition and scalar multiplication. An intersection of any family of subspaces is a subspace. A union usually is not. The **sum** $U + W = \\{u + w : u \\in U, w \\in W\\}$ is the smallest subspace containing both.

The sum $U_1 + \\dots + U_m$ is **direct**, written $U_1 \\oplus \\dots \\oplus U_m$, if every element of it can be written as $u_1 + \\dots + u_m$ with $u_i \\in U_i$ in only one way.

**Theorem.** The sum is direct if and only if the only way to write 0 is with every $u_i = 0$. For two subspaces, $U + W$ is direct if and only if $U \\cap W = \\{0\\}$.

*Proof.* If two expressions give the same vector, subtracting gives an expression for 0, so the first criterion follows. For two subspaces, suppose $U \\cap W = \\{0\\}$ and $0 = u + w$. Then $u = -w \\in U \\cap W$, so $u = w = 0$. Conversely, if $v \\in U \\cap W$ then $0 = v + (-v)$ forces $v = 0$. $\\square$

The two-subspace test does not generalise as you might expect. In $\\mathbb{R}^2$, take the $x$-axis, the $y$-axis and the line $y = x$. All pairwise intersections are $\\{0\\}$, but the sum is not direct: $(1, 0) + (0, 1) + (-1, -1) = 0$.

**Worked example.** Let $V$ be the space of all functions $\\mathbb{R} \\to \\mathbb{R}$, $E$ the even functions and $O$ the odd functions. Claim: $V = E \\oplus O$. Any $f$ splits as
$$f(x) = \\frac{f(x) + f(-x)}{2} + \\frac{f(x) - f(-x)}{2},$$
with the first term even and the second odd, so $V = E + O$. If $f \\in E \\cap O$, then $f(x) = f(-x) = -f(x)$, so $2f(x) = 0$ and $f = 0$. So the sum is direct.

Look at where that used the field: division by 2 twice. It fails in characteristic 2. Over $\\mathbb{F}_2$, $-x = x$ for every $x$, so every function $\\mathbb{F}_2 \\to \\mathbb{F}_2$ is both even and odd. Then $E = O = V$, and $E \\cap O \\neq \\{0\\}$. So when you use a familiar decomposition, ask what it needs from $F$.

A **complement** of $U$ in $V$ is a $W$ with $V = U \\oplus W$. Complements exist in finite dimension, as you will prove, but they are almost never unique. Thinking of a complement as *the* perpendicular is a habit from $\\mathbb{R}^n$, and there is no notion of perpendicular here yet.`,
          resources: [
            main(axler, 'The sections on subspaces and direct sums.'),
            also(mit18700, 'The early lecture notes on subspaces and sums.'),
            also(treil, 'A second account of subspaces and sums, with a slightly different emphasis.'),
          ],
          exercises: [
            {
              slug: 'smallest-subspace',
              title: 'The sum is the smallest subspace',
              prompt:
                'Prove that $U + W$ is a subspace, that it contains $U$ and $W$, and that any subspace containing both contains $U + W$. Then prove that the sum $U_1 + \\dots + U_m$ is direct if and only if $U_j \\cap \\sum_{i \\neq j} U_i = \\{0\\}$ for every $j$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'counting-complements',
              title: 'Complements are not unique',
              prompt:
                'Let $L$ be a line through 0 in $\\mathbb{F}_q^2$. Prove that $L$ has exactly $q$ complements. List them for $q = 3$ and $L$ the span of $(1, 0)$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'First count the lines through 0 in $\\mathbb{F}_q^2$: count non-zero vectors, and divide by the number on each line.',
            },
            {
              slug: 'finite-unions',
              title: 'Unions of subspaces',
              prompt:
                'Show that $\\mathbb{F}_2^2$ is a union of three proper subspaces. Then prove that a vector space over an infinite field is never a finite union of proper subspaces.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Take a cover with as few subspaces as possible. Pick $u$ in $U_1$ only and $v \\notin U_1$, and show that each $U_i$ contains at most one point of the infinite set $\\{v + cu : c \\in F\\}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the criterion for $U + W$ to be direct.',
              answerOutline: '$U \\cap W = \\{0\\}$. This two-subspace criterion does not extend to pairwise intersections for three or more subspaces.',
            },
            {
              question: 'Why does the even and odd decomposition fail over $\\mathbb{F}_2$?',
              answerOutline: 'It divides by 2. Moreover $-x = x$, so every function is both even and odd, and the intersection is everything.',
            },
            {
              question: 'Give three subspaces of $\\mathbb{R}^2$ with pairwise trivial intersection whose sum is not direct.',
              answerOutline: 'The lines spanned by $(1,0)$, $(0,1)$, $(1,1)$, since $(1,0) + (0,1) - (1,1) = 0$.',
            },
          ],
        },
        {
          slug: 'span-independence-and-bases',
          title: 'Span, independence and bases',
          summary:
            'Prove the linear dependence lemma and the exchange argument, the engine behind the theory of dimension.',
          estimatedMinutes: 120,
          objectives: [
            'Prove the linear dependence lemma',
            'Use the exchange argument to compare independent and spanning sets',
            'Characterise a basis by unique representation',
            'Explain how independence depends on the field',
          ],
          concepts: [
            'Linear combination and span',
            'Linear independence',
            'Linear dependence lemma',
            'Exchange argument',
            'Basis',
          ],
          explanation: `Throughout, a list is finite unless stated otherwise. A list $v_1, \\dots, v_m$ is **linearly independent** if $a_1 v_1 + \\dots + a_m v_m = 0$ forces every $a_i = 0$. A **basis** is an independent list that spans $V$. Equivalently, every $v \\in V$ is a combination of the list in exactly one way, as you will prove.

**Linear dependence lemma.** If $v_1, \\dots, v_m$ is dependent and $v_1 \\neq 0$, then some $v_j$ with $j \\ge 2$ lies in the span of $v_1, \\dots, v_{j-1}$, and removing it does not change the span of the list.

*Proof.* Take a non-trivial relation, and let $j$ be the largest index with $a_j \\neq 0$. Since $v_1 \\neq 0$, $j \\ge 2$, as $j = 1$ would give $a_1 v_1 = 0$. Because $F$ is a field, we can divide by $a_j$:
$$v_j = -\\frac{a_1}{a_j}v_1 - \\dots - \\frac{a_{j-1}}{a_j}v_{j-1}.$$
In any combination, replace $v_j$ by this expression to see that the span is unchanged. $\\square$

**Exchange lemma.** In a space spanned by $w_1, \\dots, w_n$, every independent list has length at most $n$.

*Proof.* Let $u_1, \\dots, u_m$ be independent. Prepend $u_1$ to the $w$ list. This list spans and is dependent, and $u_1 \\neq 0$. The lemma removes some vector, and it cannot be $u_1$, so it is a $w$. The result is a spanning list of length $n$. Now prepend $u_2$ and repeat. The removed vector cannot be a $u$, because each $u_j$ is not in the span of earlier $u$s. So a $w$ always remains to remove. If $m > n$, the $w$s run out after $n$ steps, and $u_1, \\dots, u_n$ spans, which makes $u_{n+1}$ a combination of them, a contradiction. $\\square$

**Worked example.** Are $(1, 1, 0)$, $(0, 1, 1)$, $(1, 0, 1)$ independent? The answer depends on the field. The matrix with these rows has determinant 2. Over $\\mathbb{Q}$, or any field of characteristic other than 2, the vectors are independent. Over $\\mathbb{F}_2$, their sum is $(2, 2, 2) = (0, 0, 0)$, so they are dependent, and that is a non-trivial relation with all coefficients 1.

The lemma's division step is why these results hold for vector spaces and not for modules over a general ring. In $\\mathbb{Z}$ as a module over itself, $\\{2, 3\\}$ spans, yet no subset of it is a basis.

Infinite-dimensional spaces need one more care. In the space of all real sequences, the vectors $e_i$ are independent, but they do not span, since a linear combination is a *finite* sum. Every vector space has a basis if you accept Zorn's lemma, but we will not use this.`,
          resources: [
            main(axler, 'The chapter on finite-dimensional vector spaces.'),
            also(conradDimension, 'A careful account of why dimension is well defined, including the exchange idea.'),
            also(mit18701, 'The lectures on vector spaces, which treat a general field.'),
          ],
          exercises: [
            {
              slug: 'unique-representation',
              title: 'Basis means unique representation',
              prompt:
                'Prove that a list $v_1, \\dots, v_n$ is a basis of $V$ if and only if every $v \\in V$ can be written uniquely as a combination of it. Then prove that every finite spanning list contains a basis, and that every independent list in a finite-dimensional space extends to a basis.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'independence-by-prime',
              title: 'Independence modulo primes',
              prompt:
                'For which primes $p$ are $(1, 2, 3)$, $(4, 5, 6)$, $(7, 8, 10)$ independent over $\\mathbb{F}_p$? Give a proof. For each failing prime, write down an explicit dependence relation with coefficients in $\\mathbb{F}_p$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'square-roots-independent',
              title: 'Square roots over the rationals',
              prompt:
                'Prove that $1, \\sqrt{2}, \\sqrt{3}$ are independent over $\\mathbb{Q}$. Then prove that $\\mathbb{R}$ is infinite-dimensional over $\\mathbb{Q}$, using a countability argument. Explain why the same real numbers are dependent over $\\mathbb{R}$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the first part, write $a + b\\sqrt{2} = -c\\sqrt{3}$ and square. For the second, a finite-dimensional space over $\\mathbb{Q}$ is countable.',
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the proof of the dependence lemma use that $F$ is a field?',
              answerOutline: 'In dividing by the coefficient $a_j$. Over a ring, that coefficient may have no inverse.',
            },
            {
              question: 'Are $e_1, e_2, \\dots$ a basis of the space of all real sequences?',
              answerOutline: 'No. Linear combinations are finite sums, so the span is only the sequences with finitely many non-zero terms.',
            },
            {
              question: 'What does the exchange lemma say?',
              answerOutline: 'In a space with a spanning list of length $n$, any independent list has length at most $n$.',
            },
          ],
          relatedLessons: ['discrete-mathematics/logic-and-proofs/proof-techniques'],
        },
        {
          slug: 'dimension',
          title: 'Dimension',
          summary:
            'Show that dimension is well defined, prove the sum formula, and count subspaces and bases over finite fields.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that any two bases have the same length',
            'Prove and use the dimension formula for a sum',
            'Count vectors, bases and subspaces over a finite field',
            'Relate dimensions over a field and a subfield',
          ],
          concepts: [
            'Dimension',
            'Dimension of a sum',
            'General linear group over a finite field',
            'Gaussian binomial coefficient',
            'Restriction of scalars',
          ],
          explanation: `By the exchange lemma, a basis of length $m$ and a basis of length $n$ satisfy $m \\le n$ and $n \\le m$. So all bases of a finite-dimensional $V$ have the same length, and that number is $\\dim V$. Dimension depends on the field: $\\dim_{\\mathbb{C}} \\mathbb{C} = 1$, $\\dim_{\\mathbb{R}} \\mathbb{C} = 2$, and $\\mathbb{R}$ is infinite-dimensional over $\\mathbb{Q}$. Write $\\dim_F$ when there is any doubt.

If $\\dim V = n$, then a list of $n$ vectors that is independent, or that spans, is automatically a basis. So you need only check one condition.

**Theorem.** For subspaces of a finite-dimensional space,
$$\\dim(U + W) = \\dim U + \\dim W - \\dim(U \\cap W).$$
*Proof.* Take a basis $v_1, \\dots, v_k$ of $U \\cap W$. Extend it to a basis $v_i, u_1, \\dots, u_r$ of $U$ and to a basis $v_i, w_1, \\dots, w_s$ of $W$. The combined list spans $U + W$. For independence, suppose $\\sum a_i v_i + \\sum b_j u_j + \\sum c_\\ell w_\\ell = 0$. Then $\\sum c_\\ell w_\\ell = -\\sum a_i v_i - \\sum b_j u_j$ lies in $U$, hence in $U \\cap W$, so it is a combination of the $v_i$. The basis of $W$ then forces all $c_\\ell = 0$, and the basis of $U$ forces the rest to be zero. Counting gives $k + r + s = (k + r) + (k + s) - k$. $\\square$

Finite fields turn dimension into counting. If $\\dim V = n$ over $\\mathbb{F}_q$, then $|V| = q^n$, since a vector is determined by $n$ coordinates.

**Worked example.** Count the invertible $2 \\times 2$ matrices over $\\mathbb{F}_3$. A matrix is invertible exactly when its columns form a basis. The first column can be any non-zero vector: $9 - 1 = 8$ choices. The second can be anything outside the span of the first, which has 3 elements: $9 - 3 = 6$ choices. So $|GL_2(\\mathbb{F}_3)| = 48$. In general,
$$|GL_n(\\mathbb{F}_q)| = (q^n - 1)(q^n - q)\\cdots(q^n - q^{n-1}).$$
The same idea counts subspaces. Ordered independent $k$-lists in $\\mathbb{F}_q^n$ number $(q^n - 1)\\cdots(q^n - q^{k-1})$, and each $k$-dimensional subspace contains $(q^k - 1)\\cdots(q^k - q^{k-1})$ of them. Their quotient is the **Gaussian binomial coefficient**. For $\\mathbb{F}_2^3$, you get 7 lines and 7 planes, which are the points and lines of the Fano plane. A brute-force enumeration confirms that $\\mathbb{F}_2^4$ has 35 planes.

Dimension is the only invariant a finite-dimensional space has: two spaces over $F$ of equal finite dimension are isomorphic, as the next module shows.`,
          resources: [
            main(conradDimension, 'Why dimension is well defined, in a short and careful note.'),
            also(axler, 'The sections on dimension and the sum formula.'),
            also(hefferon, 'The dimension section, with worked examples.'),
          ],
          exercises: [
            {
              slug: 'symmetric-and-skew',
              title: 'Symmetric and skew-symmetric matrices',
              prompt:
                'Find the dimension of the space of symmetric $n \\times n$ matrices over a field $F$, and of the space of matrices with $A^T = -A$, in the cases $\\operatorname{char} F \\neq 2$ and $\\operatorname{char} F = 2$. Prove that every square matrix is uniquely a symmetric matrix plus a skew-symmetric one when $\\operatorname{char} F \\neq 2$, and show that this fails in characteristic 2 for $n = 2$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'count-subspaces',
              title: 'Count subspaces',
              prompt:
                'Derive the formula for the number of $k$-dimensional subspaces of $\\mathbb{F}_q^n$. Evaluate it for $(n, k, q) = (4, 2, 2)$ and $(4, 2, 3)$, which give 35 and 130. Write a program that lists all 2-dimensional subspaces of $\\mathbb{F}_2^4$ and confirms the first count. Prove the symmetry between $k$ and $n - k$ from the formula.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tower-law',
              title: 'Changing the field',
              prompt:
                'Let $F \\subseteq E$ be fields with $[E : F] = \\dim_F E$ finite, and let $V$ be a finite-dimensional space over $E$. Prove that $\\dim_F V = [E : F] \\cdot \\dim_E V$. Deduce that a finite field has order $p^m$ for a prime $p$ and an integer $m \\geq 1$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'If $e_i$ is a basis of $E$ over $F$ and $v_j$ is a basis of $V$ over $E$, try the products $e_i v_j$. For a finite field, take $F$ to be the subfield generated by 1.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the dimension formula for a sum, and name the key step in its proof.',
              answerOutline: '$\\dim(U+W) = \\dim U + \\dim W - \\dim(U \\cap W)$. Extend a basis of $U \\cap W$ to bases of $U$ and of $W$ and show that the combined list is independent.',
            },
            {
              question: 'How many invertible matrices are in $M_2(\\mathbb{F}_2)$? Why?',
              answerOutline: '$(4 - 1)(4 - 2) = 6$: any non-zero first column, then a second column outside its span.',
            },
            {
              question: 'What are $\\dim_{\\mathbb{R}}$ and $\\dim_{\\mathbb{C}}$ of $\\mathbb{C}^n$?',
              answerOutline: '$2n$ and $n$.',
            },
          ],
        },
      ],
      project: {
        slug: 'finite-field-toolkit',
        title: 'A linear algebra toolkit over finite fields',
        description: `Write a small exact linear algebra library over $\\mathbb{F}_p$ in Python, using integers rather than floating point, and use it to test the theory of this module by exhaustive counting. Implement row reduction, rank, null space and matrix inversion modulo $p$. Then enumerate subspaces of small spaces, confirm the Gaussian binomial formula and the order of $GL_n(\\mathbb{F}_q)$, and look for the places where intuition from $\\mathbb{R}$ fails. A written section records each surprising example, with a proof that it behaves as computed.`,
        deliverables: [
          'A tested module with `rref`, `rank`, `null_space` and `inverse` working over $\\mathbb{F}_p$, with tests against hand-computed cases',
          'A brute-force enumeration confirming $|GL_n(\\mathbb{F}_q)|$ for $(n, q) = (2, 3), (2, 5), (3, 2)$, and the Gaussian binomial for all $k$ with $n \\le 4$ and $q \\le 3$',
          'A table of integer matrices whose rank differs between $\\mathbb{Q}$ and $\\mathbb{F}_p$, with the primes explained by the determinant or by minors',
          'A short document with proofs of the counting formulas you confirmed, and at least three examples of a true statement over $\\mathbb{R}$ that fails over $\\mathbb{F}_2$',
        ],
        estimatedHours: 7,
        stretchGoals: ['Extend the library to $\\mathbb{F}_4$ or $\\mathbb{F}_9$ using polynomial arithmetic', 'Count self-orthogonal subspaces of $\\mathbb{F}_2^n$ for the dot product and find a formula'],
      },
    },
    {
      slug: 'linear-maps',
      title: 'Linear Maps',
      description:
        'Study maps instead of matrices: rank-nullity, the matrix of a map, dual spaces and quotients, the tools that make later proofs short.',
      lessons: [
        {
          slug: 'rank-nullity',
          title: 'Kernels, images and rank-nullity',
          summary:
            'Prove the fundamental theorem of linear maps and see why finite dimension is essential to its consequences.',
          estimatedMinutes: 110,
          objectives: [
            'Define the kernel and image of a linear map and prove they are subspaces',
            'Prove the rank-nullity theorem',
            'Prove that injective, surjective and bijective coincide for operators on finite-dimensional spaces',
            'Give counterexamples in infinite dimension',
          ],
          concepts: [
            'Linear map',
            'Kernel and image',
            'Rank-nullity theorem',
            'Isomorphism',
            'Operators on infinite-dimensional spaces',
          ],
          explanation: `A **linear map** $T : V \\to W$ between spaces over the same field satisfies $T(u + v) = Tu + Tv$ and $T(cv) = cTv$. A linear map is determined by its values on a basis, and those values can be chosen freely. The maps from $V$ to $W$ themselves form a vector space, $\\mathcal{L}(V, W)$. Its kernel and image are subspaces, and $T$ is injective if and only if $\\ker T = \\{0\\}$.

**Rank-nullity theorem.** If $V$ is finite-dimensional, then
$$\\dim V = \\dim \\ker T + \\dim \\operatorname{im} T.$$
*Proof.* Take a basis $u_1, \\dots, u_k$ of $\\ker T$ and extend it to a basis $u_1, \\dots, u_k, v_1, \\dots, v_r$ of $V$. We show that $Tv_1, \\dots, Tv_r$ is a basis of $\\operatorname{im} T$. It spans, since the images of the $u_i$ are zero. If $\\sum b_j Tv_j = 0$, then $\\sum b_j v_j \\in \\ker T$, so it equals some $\\sum a_i u_i$, and independence of the whole basis forces $b_j = 0$. So $r = \\dim \\operatorname{im} T$. $\\square$

**Corollary.** If $\\dim V = \\dim W < \\infty$, then $T$ is injective if and only if it is surjective. This is a pure dimension count, and it has real force: it says that if $Ax = 0$ has only the trivial solution, then $Ax = b$ always has a solution. Two spaces of the same finite dimension are isomorphic, since you can send a basis to a basis.

The corollary fails in infinite dimension. On sequences, the right shift $(a_1, a_2, \\dots) \\mapsto (0, a_1, a_2, \\dots)$ is injective and not surjective. On $\\mathbb{R}[t]$, differentiation is surjective and not injective.

**Worked example.** Let $V$ be the polynomials of degree at most 3, with $D = d/dt$. Over $\\mathbb{R}$, $\\ker D$ is the constants, of dimension 1, and the image is the polynomials of degree at most 2, of dimension 3. Now work over $\\mathbb{F}_3$. We have $D(t^3) = 3t^2 = 0$, so $\\ker D$ contains both $1$ and $t^3$, and it has dimension 2 (spanned by those). The image is spanned by $D(t) = 1$ and $D(t^2) = 2t$, since $D(t^3)$ contributes nothing, so it has dimension 2. Rank-nullity holds in both cases: $1 + 3 = 2 + 2 = 4$. Only the split has moved. So a statement such as "a polynomial with zero derivative is constant" is a fact about characteristic 0, not about polynomials in general.`,
          resources: [
            main(axler, 'The section on null spaces and ranges, including the fundamental theorem of linear maps.'),
            also(mit18700, 'The lecture notes on linear operators.'),
            also(hefferon, 'The chapter on maps between spaces, with a different route to the theorem.'),
          ],
          exercises: [
            {
              slug: 'kernel-criterion',
              title: 'Injective means trivial kernel',
              prompt:
                'Prove that $\\ker T$ and $\\operatorname{im} T$ are subspaces and that $T$ is injective if and only if $\\ker T = \\{0\\}$. Prove that a linear map is determined by its values on a basis, and that any assignment of values on a basis extends to a linear map.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'rank-inequalities',
              title: 'Rank inequalities',
              prompt:
                'For $T : U \\to V$ and $S : V \\to W$ with all spaces finite-dimensional, prove that $\\dim\\ker(ST) \\le \\dim\\ker S + \\dim\\ker T$. Deduce $\\operatorname{rank} S + \\operatorname{rank} T - \\dim V \\le \\operatorname{rank}(ST) \\le \\min(\\operatorname{rank} S, \\operatorname{rank} T)$. Prove that if $T^2 = 0$ on an $n$-dimensional space then $\\operatorname{rank} T \\leq n/2$, and show that this bound is attained for every even $n$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the first inequality, restrict $T$ to $\\ker(ST)$ and apply rank-nullity to the restriction.',
            },
            {
              slug: 'one-sided-inverses',
              title: 'One-sided inverses',
              prompt:
                'Prove that if $S, T$ are operators on a finite-dimensional space and $ST = I$, then $TS = I$. Give operators on an infinite-dimensional space for which $ST = I$ and $TS \\neq I$, and verify the claim for your example.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State rank-nullity and sketch how the basis is chosen in its proof.',
              answerOutline: '$\\dim V = \\dim\\ker T + \\dim\\operatorname{im} T$. Extend a basis of the kernel to one of $V$, and the images of the added vectors form a basis of the image.',
            },
            {
              question: 'What is $\\ker(d/dt)$ on $\\mathbb{F}_p[t]$?',
              answerOutline: 'All polynomials in $t^p$, an infinite-dimensional space, because $D(t^{kp}) = kp\\,t^{kp-1} = 0$.',
            },
            {
              question: 'Give an operator that is injective but not surjective.',
              answerOutline: 'The right shift on sequences, or multiplication by $t$ on $F[t]$.',
            },
          ],
        },
        {
          slug: 'matrices-of-maps',
          title: 'Matrices of linear maps',
          summary:
            'Identify maps with matrices relative to chosen bases, prove the rank theorem, and meet the trace.',
          estimatedMinutes: 110,
          objectives: [
            'Compute the matrix of a map relative to arbitrary bases',
            'Prove that composition corresponds to matrix multiplication',
            'Prove that row rank equals column rank',
            'Define the trace of an operator and prove it is well defined',
          ],
          concepts: [
            'Matrix of a map relative to bases',
            'Isomorphism between maps and matrices',
            'Change of basis',
            'Row rank and column rank',
            'Trace',
          ],
          explanation: `Choose bases $v_1, \\dots, v_n$ of $V$ and $w_1, \\dots, w_m$ of $W$. The **matrix** of $T$ relative to these bases is the $m \\times n$ array with $Tv_j = \\sum_i a_{ij} w_i$, so column $j$ holds the coordinates of $Tv_j$. The map $T \\mapsto [T]$ is an isomorphism $\\mathcal{L}(V, W) \\to F^{m \\times n}$, and hence $\\dim \\mathcal{L}(V, W) = mn$. Matrix multiplication is defined to make $[ST] = [S][T]$, with compatible bases.

Everything depends on the choice of bases. If $P$ converts coordinates from a new basis of $V$ into the old, and $Q$ does so for $W$, then the new matrix is $Q^{-1}AP$. For an operator, using one basis on both sides, this is $P^{-1}AP$.

**Worked example.** Let $D : P_2 \\to P_1$ be differentiation over $\\mathbb{Q}$, with basis $1, t, t^2$ of $P_2$ and basis $1, t - 1$ of $P_1$. Then $D1 = 0$, $Dt = 1$ and $Dt^2 = 2t = 2 \\cdot 1 + 2(t - 1)$. So
$$[D] = \\begin{bmatrix} 0 & 1 & 2 \\\\ 0 & 0 & 2 \\end{bmatrix}.$$
Test it on $f = 3 + t + 4t^2$, with coordinates $(3, 1, 4)$. The product is $(9, 8)$, meaning $9 + 8(t - 1) = 1 + 8t$, which is $f'$.

**Theorem: row rank equals column rank.** Let $A$ be $m \\times n$ with column rank $r$. Let the columns of an $m \\times r$ matrix $C$ be a basis of the column space. Every column of $A$ is a combination of those, so $A = CR$ for an $r \\times n$ matrix $R$. Reading this equation by rows, every row of $A$ is a combination of the $r$ rows of $R$. So row rank $\\le r$. Applying this to $A^T$ gives the reverse inequality. $\\square$

The **trace** of a square matrix is the sum of its diagonal entries, and $\\operatorname{tr}(AB) = \\operatorname{tr}(BA)$ holds for any sizes for which both products are square. It follows that $\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr}(APP^{-1}) = \\operatorname{tr}A$, so the trace of an *operator* is well defined, independent of the basis. Beware that trace is not multiplicative, and $\\operatorname{tr}(ABC) = \\operatorname{tr}(ACB)$ fails in general: only cyclic permutations are allowed.

The trace also shows something striking about the field. Taking traces, the equation $ST - TS = I$ on an $n$-dimensional space would give $0 = n$. So it has no solutions in characteristic 0. In characteristic $p$ with $p \\mid n$ it can have solutions, as an exercise below shows.`,
          resources: [
            main(axler, 'The sections on matrices and on invertibility, and on the trace.'),
            also(treil, 'The material on change of coordinates.'),
            also(mit18700, 'The notes on matrices and change of basis.'),
          ],
          exercises: [
            {
              slug: 'composition-is-multiplication',
              title: 'Composition is multiplication',
              prompt:
                'Prove directly from the definition that $[ST] = [S][T]$ with compatible bases. Deduce that $\\dim\\mathcal{L}(V, W) = \\dim V \\cdot \\dim W$. Then show that every invertible $n \\times n$ matrix is a change-of-basis matrix: given a basis of $V$ and invertible $P$, construct the new basis.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'normal-form',
              title: 'The simplest form of a map',
              prompt:
                'Prove that for any $T : V \\to W$ of rank $r$, there are bases of $V$ and $W$ in which $[T]$ has $I_r$ in the top-left corner and zeros elsewhere. Conclude that two $m \\times n$ matrices satisfy $B = Q^{-1}AP$ for invertible $P, Q$ if and only if they have the same rank. Why is the classification of operators much harder?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Reuse the basis from the proof of rank-nullity, listing the kernel vectors last.',
            },
            {
              slug: 'commutator-identity',
              title: 'When a commutator equals the identity',
              prompt:
                'Prove that $ST - TS = I$ has no solution on a finite-dimensional space of dimension $n \\geq 1$ when $\\operatorname{char}F = 0$. Give an infinite-dimensional example over $\\mathbb{R}$. Now let $p$ be prime and let $V = \\mathbb{F}_p[t]/(t^p)$, with $S = d/dt$ and $T$ multiplication by $t$. Prove that $S$ is well defined on $V$ and that $ST - TS = I$. Check this with explicit matrices for $p = 2, 3, 5$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Well defined means $S$ sends multiples of $t^p$ to multiples of $t^p$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does column $j$ of the matrix of $T$ contain?',
              answerOutline: 'The coordinates of $Tv_j$ in the chosen basis of the target.',
            },
            {
              question: 'Why is the trace of an operator independent of basis?',
              answerOutline: 'Because $\\operatorname{tr}(XY) = \\operatorname{tr}(YX)$ gives $\\operatorname{tr}(P^{-1}AP) = \\operatorname{tr}(A)$.',
            },
            {
              question: 'Is $\\operatorname{tr}(ABC) = \\operatorname{tr}(BAC)$ always true?',
              answerOutline: 'No. Only cyclic rotations such as $\\operatorname{tr}(BCA)$ are guaranteed.',
            },
          ],
        },
        {
          slug: 'duality',
          title: 'Dual spaces',
          summary:
            'Study the linear functionals on a space, and use them to explain transposes, annihilators and interpolation.',
          estimatedMinutes: 130,
          objectives: [
            'Define the dual space and compute dual bases',
            'Define the annihilator and prove its dimension formula',
            'Identify the dual map with the transpose and relate its kernel and image to those of $T$',
            'Explain the canonical isomorphism between $V$ and its double dual',
          ],
          concepts: [
            'Linear functional',
            'Dual space and dual basis',
            'Annihilator',
            'Dual map',
            'Double dual',
          ],
          explanation: `A **linear functional** on $V$ is a linear map $V \\to F$. The functionals form the **dual space** $V^* = \\mathcal{L}(V, F)$. If $v_1, \\dots, v_n$ is a basis of $V$, the **dual basis** $\\varphi_1, \\dots, \\varphi_n$ of $V^*$ is defined by $\\varphi_i(v_j) = 1$ if $i = j$ and 0 otherwise. So $\\dim V^* = \\dim V$ in finite dimension. The dual basis reads coordinates: $v = \\sum_i \\varphi_i(v) v_i$.

Functionals include more than coordinate functions. Evaluation at a point, integration and taking a derivative at a point are all functionals on polynomials.

**Worked example: Simpson's rule from a dual basis.** Let $V = P_2$ over $\\mathbb{Q}$, and let $\\varphi_i(f) = f(i)$ for $i = 0, 1, 2$. These three functionals are a basis of $V^*$, and they are dual to the Lagrange polynomials
$$L_0 = \\tfrac12(t - 1)(t - 2), \\quad L_1 = -t(t - 2), \\quad L_2 = \\tfrac12 t(t - 1),$$
since $L_i(j)$ is 1 when $i = j$ and 0 otherwise. Since the $\\varphi_i$ form a basis, *every* functional is a combination of them. Take $I(f) = \\int_0^2 f$. If $I = \\sum c_i \\varphi_i$, then applying both sides to $L_j$ gives $c_j = I(L_j)$. Integrating gives $c = (\\tfrac13, \\tfrac43, \\tfrac13)$, so
$$\\int_0^2 f = \\tfrac13 f(0) + \\tfrac43 f(1) + \\tfrac13 f(2)$$
for every $f$ of degree at most 2. That is Simpson's rule, obtained by pure linear algebra. (It even holds for cubics, but not for $t^4$.) The construction needs enough points: over $\\mathbb{F}_2$, a degree-2 polynomial cannot be pinned down by evaluation at the 2 elements of the field.

The **annihilator** of $U \\le V$ is $U^0 = \\{\\varphi \\in V^* : \\varphi|_U = 0\\}$, and $\\dim U^0 = \\dim V - \\dim U$. To see this, extend a basis of $U$ to one of $V$; the dual vectors of the added basis elements form a basis of $U^0$.

A map $T : V \\to W$ has a **dual map** $T' : W^* \\to V^*$ with $T'(\\varphi) = \\varphi \\circ T$. In dual bases, its matrix is the transpose of the matrix of $T$. The key relations in finite dimension are
$$\\ker T' = (\\operatorname{im} T)^0, \\qquad \\operatorname{im} T' = (\\ker T)^0.$$
From these, $\\operatorname{rank} T' = \\operatorname{rank} T$, which is the coordinate-free reason that row rank equals column rank.

Each $v \\in V$ gives a functional on $V^*$, namely evaluation $\\varphi \\mapsto \\varphi(v)$. This map $V \\to V^{**}$ is injective, hence an isomorphism in finite dimension, and it needs no choice of basis. By contrast, an isomorphism $V \\cong V^*$ exists but depends on a basis. In infinite dimension, $V$ is never isomorphic to $V^{**}$ through this map.`,
          resources: [
            main(axler, 'The section on duality.'),
            also(conradDual, 'Dual spaces in the wider setting of modules, including the double dual and what can go wrong.'),
            also(treil, 'The chapter on dual spaces, a useful alternative to Axler.'),
          ],
          exercises: [
            {
              slug: 'find-a-dual-basis',
              title: 'Find a dual basis',
              prompt:
                'Find the dual basis of $(1, 1)$, $(1, 2)$ in $\\mathbb{R}^2$, writing each functional as a row vector. Explain why the rows of the inverse of the basis matrix always give the dual basis. You should get $(2, -1)$ and $(-1, 1)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'annihilator-formulas',
              title: 'Annihilators and the dual map',
              prompt:
                'Prove $\\dim U^0 = \\dim V - \\dim U$ in finite dimension. Prove $\\ker T\' = (\\operatorname{im} T)^0$ and $\\operatorname{im} T\' = (\\ker T)^0$. Deduce that $T$ is surjective if and only if $T\'$ is injective, and that $T$ is injective if and only if $T\'$ is surjective.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For $\\operatorname{im} T\' = (\\ker T)^0$, prove one inclusion directly, then compare dimensions.',
            },
            {
              slug: 'double-dual',
              title: 'The double dual',
              prompt:
                'Define $\\iota : V \\to V^{**}$ by $\\iota(v)(\\varphi) = \\varphi(v)$. Prove that $\\iota$ is linear, and injective when $\\dim V < \\infty$, hence an isomorphism. Show that it is natural: for $T : V \\to W$, one has $T\'\' \\circ \\iota_V = \\iota_W \\circ T$. Under this identification, show that $(U^0)^0$ corresponds to $U$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'quadrature-from-duals',
              title: 'Build a quadrature rule',
              prompt:
                'Use the method of the lesson to find $c_0, c_1, c_2$ with $\\int_{-1}^{1} f = c_0 f(-1) + c_1 f(0) + c_2 f(1)$ for all polynomials of degree at most 2. Prove that the weights are unique. Find the highest degree for which your rule is exact, and explain why that degree is larger than the one you built it for.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the dual basis, and how do you use it to read coordinates?',
              answerOutline: '$\\varphi_i(v_j) = \\delta_{ij}$. The coordinate of $v$ along $v_i$ is $\\varphi_i(v)$.',
            },
            {
              question: 'Why does a general functional on $P_2$ equal a combination of evaluations at three points?',
              answerOutline: 'Three evaluations at distinct points are a basis of the 3-dimensional dual, since they are dual to the Lagrange basis.',
            },
            {
              question: 'What makes $V \\cong V^{**}$ more natural than $V \\cong V^*$?',
              answerOutline: 'The first needs no choice of basis: $v$ maps to evaluation at $v$. The second depends on a basis.',
            },
          ],
        },
        {
          slug: 'quotient-spaces',
          title: 'Quotient spaces',
          summary:
            'Collapse a subspace to zero, prove the isomorphism theorems, and see how quotients let you induct on dimension.',
          estimatedMinutes: 110,
          objectives: [
            'Define the quotient space and show its operations are well defined',
            'Compute the dimension of a quotient',
            'Prove the first isomorphism theorem',
            'Use an induced map on a quotient',
          ],
          concepts: [
            'Coset',
            'Quotient space',
            'Well-definedness',
            'First isomorphism theorem',
            'Induced operator',
          ],
          explanation: `Let $U \\le V$. Declare $v \\sim v'$ if $v - v' \\in U$. The equivalence classes are the **cosets** $v + U$, and the set of cosets is the **quotient space** $V/U$, with
$$(v + U) + (w + U) = (v + w) + U, \\qquad c(v + U) = cv + U.$$
These definitions use representatives, so you must check that the result does not depend on the representative. If $v + U = v' + U$ and $w + U = w' + U$, then $(v + w) - (v' + w') = (v - v') + (w - w') \\in U$, so the sum is well defined. The same goes for scalar multiplication. The **quotient map** $\\pi : V \\to V/U$, $\\pi(v) = v + U$, is linear and surjective, with kernel $U$, so rank-nullity gives
$$\\dim V/U = \\dim V - \\dim U.$$

Geometrically, $V/U$ is what remains after you ignore differences along $U$. In $\\mathbb{R}^3$ with $U$ a line through 0, cosets are the parallel lines, and they form a 2-dimensional space. There is no need to choose a complement, which is the point. Any complement of $U$ is isomorphic to $V/U$, but $V/U$ itself involves no choice.

**First isomorphism theorem.** For linear $T : V \\to W$, the map $\\tilde{T} : V/\\ker T \\to \\operatorname{im} T$ given by $\\tilde{T}(v + \\ker T) = Tv$ is a well-defined isomorphism.

*Proof.* If $v + \\ker T = v' + \\ker T$, then $v - v' \\in \\ker T$, so $Tv = Tv'$, and $\\tilde{T}$ is well defined. Linearity follows from that of $T$. It is surjective by definition. If $\\tilde{T}(v + \\ker T) = 0$, then $v \\in \\ker T$, so the coset is zero, and $\\tilde{T}$ is injective. $\\square$

This theorem gives another proof of rank-nullity, and it works in infinite dimension too.

**Worked example.** Let $V = \\mathbb{R}[t]$ and let $U$ be the set of all multiples of $t^2 + 1$. The space $V$ is infinite-dimensional, but the quotient is not. Division with remainder gives $f = q(t^2 + 1) + a + bt$, with $a, b$ unique, so each coset contains exactly one polynomial of degree at most 1. Thus $V/U$ has basis $1 + U$, $t + U$, and dimension 2. In the quotient, $t^2 = -1$, and $V/U$ is $\\mathbb{C}$ with $t + U$ playing the role of $i$. Equivalently, the map $f \\mapsto f(i)$ from $\\mathbb{R}[t]$ to $\\mathbb{C}$ (as real vector spaces) is surjective with kernel $U$.

**Induced operators.** If $T$ on $V$ satisfies $T(U) \\subseteq U$, then $T/U : v + U \\mapsto Tv + U$ is well defined on $V/U$. If you extend a basis of $U$ to a basis of $V$, the matrix of $T$ has a block triangular form, with $T|_U$ in the top left and $T/U$ in the bottom right. That is how quotients let you induct on dimension, which the next module does.`,
          resources: [
            main(axler, 'The section on products and quotients of vector spaces.'),
            also(treil, 'See the quotient space material for another perspective.'),
            also(mit18701, 'The treatment of quotient groups and rings gives the same pattern one level up.'),
          ],
          exercises: [
            {
              slug: 'universal-property',
              title: 'The universal property',
              prompt:
                'Let $U \\leq V$ and $T : V \\to W$ with $U \\subseteq \\ker T$. Prove that there is a unique linear $\\bar{T} : V/U \\to W$ with $\\bar{T} \\circ \\pi = T$. Determine $\\ker\\bar{T}$ and use it to rederive the first isomorphism theorem. Then find a natural isomorphism between $(V/U)^*$ and $U^0$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'second-and-third',
              title: 'Second and third isomorphism theorems',
              prompt:
                'Prove that $(U + W)/W \\cong U/(U \\cap W)$, and deduce the dimension formula for a sum. Prove that if $W \\leq U \\leq V$ then $(V/W)/(U/W) \\cong V/U$. In each case, define the map first and verify that it is well defined.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the first, map $u \\mapsto u + W$ and find the kernel.',
            },
            {
              slug: 'block-triangular-charpoly',
              title: 'Blocks from an invariant subspace',
              prompt:
                'Let $U$ be $T$-invariant in a finite-dimensional space. Choose a basis of $U$ and extend it to $V$. Prove that $[T]$ is block upper triangular, with diagonal blocks $[T|_U]$ and $[T/U]$. Using the theorem that the determinant of a block triangular matrix is the product of the block determinants, express the characteristic polynomial of $T$ in terms of those of $T|_U$ and $T/U$. Compute all three for $T$ with rows $(1, 1, 0)$, $(0, 2, 1)$, $(0, 0, 3)$ and $U$ the span of $e_1$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What must you check whenever you define a map on a quotient?',
              answerOutline: 'That it does not depend on the chosen representative of the coset.',
            },
            {
              question: 'How does $V/U$ differ from a complement of $U$?',
              answerOutline: 'They are isomorphic, but a complement is a choice of subspace of $V$, whereas $V/U$ is determined by $U$ alone and is not a subspace of $V$.',
            },
            {
              question: 'What is $\\mathbb{R}[t]$ modulo the multiples of $t^2 + 1$?',
              answerOutline: 'A 2-dimensional real space, naturally identified with $\\mathbb{C}$, with $t$ mapping to $i$.',
            },
          ],
        },
      ],
    },
    {
      slug: 'determinants-and-eigenvalues',
      title: 'Determinants and Eigenvalues',
      description:
        'Define the determinant without coordinates, define the characteristic polynomial, and find invariant subspaces.',
      lessons: [
        {
          slug: 'multilinear-forms-and-the-determinant',
          title: 'Multilinear forms and the determinant',
          summary:
            'Show that alternating forms in top degree form a line, then define the determinant from that fact.',
          estimatedMinutes: 130,
          objectives: [
            'Define multilinear and alternating forms',
            'Distinguish alternating from skew-symmetric, including in characteristic 2',
            'Prove that alternating $n$-forms on an $n$-dimensional space form a line',
            'Derive the product rule and the invertibility criterion from that fact',
          ],
          concepts: [
            'Multilinear form',
            'Alternating form',
            'Skew-symmetric form',
            'Determinant of an operator',
            'Leibniz formula',
          ],
          explanation: `A function $D$ of $k$ vectors in $V$ is **multilinear** if it is linear in each slot, and **alternating** if it vanishes whenever two inputs are equal. Expanding $D(\\dots, u + v, \\dots, u + v, \\dots) = 0$ shows that an alternating form changes sign when two inputs swap. It also follows that an alternating form vanishes on any dependent list.

The converse needs care. A form with the swap-sign property is called **skew-symmetric**. If $D(v, v) = -D(v, v)$, then $2D(v, v) = 0$, which gives $D(v, v) = 0$ only when $\\operatorname{char} F \\neq 2$. In characteristic 2, signs do nothing: on $\\mathbb{F}_2^2$, the form $D(x, y) = x_1 y_1$ satisfies $D(x, y) = -D(y, x)$ but $D(e_1, e_1) = 1$. Alternating is therefore the right definition over every field.

**Theorem.** If $\\dim V = n$, the alternating $n$-linear forms on $V$ are a one-dimensional space. Such a form is determined by its value on one basis.

**Worked example.** Take $n = 2$ with basis $e_1, e_2$, and any alternating $D$. For $u = ae_1 + ce_2$ and $v = be_1 + de_2$, expand by linearity:
$$D(u, v) = ab\\,D(e_1, e_1) + ad\\,D(e_1, e_2) + cb\\,D(e_2, e_1) + cd\\,D(e_2, e_2).$$
The first and last terms vanish, and $D(e_2, e_1) = -D(e_1, e_2)$. So $D(u, v) = (ad - bc)\\,D(e_1, e_2)$. There is the familiar formula, derived from the axioms. For general $n$, expanding gives one term for each function from positions to basis vectors, and alternation kills all but the permutations, which gives
$$D(v_1, \\dots, v_n) = \\Big(\\sum_{\\sigma \\in S_n} \\operatorname{sgn}(\\sigma) \\prod_{j} a_{\\sigma(j), j}\\Big) D(e_1, \\dots, e_n).$$
Conversely, this formula does define an alternating form, so the space has dimension exactly 1.

**Definition.** Let $T$ be an operator on $V$ and $D \\neq 0$ an alternating $n$-form. The function $(v_1, \\dots, v_n) \\mapsto D(Tv_1, \\dots, Tv_n)$ is again an alternating $n$-form, so it equals a scalar times $D$. That scalar is $\\det T$. No basis enters, and $\\det T$ does not depend on which non-zero $D$ you pick, since any other is a multiple of it.

The main properties now take one line each. Applying the definition twice gives $\\det(ST) = \\det S \\det T$, and $\\det I = 1$. If $T$ is invertible, then $\\det T \\det T^{-1} = 1$, so $\\det T \\neq 0$. If $T$ is not invertible, then the images of a basis are dependent, so $D(Te_1, \\dots, Te_n) = 0$, and $\\det T = 0$. So $T$ is invertible if and only if $\\det T \\neq 0$, over every field.`,
          resources: [
            main(axler, 'The chapter on multilinear algebra and determinants.'),
            also(treil, 'The determinants chapter, which builds from the desired properties.'),
            also(mit18701, 'The lectures on determinants and permutations.'),
          ],
          exercises: [
            {
              slug: 'alternating-and-skew',
              title: 'Alternating and skew-symmetric',
              prompt:
                'Prove that an alternating multilinear form is skew-symmetric, that it vanishes on any dependent list, and that a skew-symmetric form is alternating when $\\operatorname{char} F \\neq 2$. Give the counterexample in characteristic 2 in full.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'transpose-from-leibniz',
              title: 'Determinant of the transpose',
              prompt:
                'Use the Leibniz formula to prove $\\det(A^T) = \\det A$ over any field. Then prove that the determinant of a block upper triangular matrix is the product of the determinants of its diagonal blocks.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Substitute $\\tau = \\sigma^{-1}$, and note that $\\operatorname{sgn}(\\sigma^{-1}) = \\operatorname{sgn}(\\sigma)$.',
            },
            {
              slug: 'vandermonde',
              title: 'The Vandermonde determinant',
              prompt:
                'Prove by induction that the Vandermonde matrix with rows $(1, x_i, x_i^2, \\dots, x_i^{n-1})$ has determinant $\\prod_{i < j}(x_j - x_i)$ over any field. Deduce that a non-zero polynomial of degree at most $n - 1$ cannot have $n$ distinct roots in $F$, and explain how this relates to interpolation and to the example $t^2 + t$ over $\\mathbb{F}_2$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Subtract $x_1$ times each column from the next column, working from the right.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is alternating the right notion, rather than skew-symmetric?',
              answerOutline: 'Alternating implies skew-symmetric over every field, but the converse fails in characteristic 2, where signs carry no information.',
            },
            {
              question: 'How is $\\det T$ defined without coordinates?',
              answerOutline: 'It is the unique scalar with $D(Tv_1, \\dots, Tv_n) = (\\det T)D(v_1, \\dots, v_n)$ for all alternating $n$-forms $D$.',
            },
            {
              question: 'How does the product rule follow from the definition?',
              answerOutline: '$D(STv_1, \\dots) = (\\det S) D(Tv_1, \\dots) = (\\det S)(\\det T) D(v_1, \\dots)$.',
            },
          ],
        },
        {
          slug: 'the-characteristic-polynomial',
          title: 'The characteristic polynomial',
          summary:
            'Define eigenvalues through a polynomial, and see how their existence depends entirely on the field.',
          estimatedMinutes: 110,
          objectives: [
            'Define the characteristic polynomial of an operator',
            'Identify its leading coefficients with the trace and determinant',
            'Explain how eigenvalues depend on the field',
            'Show that every monic polynomial is a characteristic polynomial',
          ],
          concepts: [
            'Eigenvalue and eigenvector',
            'Characteristic polynomial',
            'Splitting of a polynomial',
            'Algebraically closed field',
            'Companion matrix',
          ],
          explanation: `An **eigenvalue** of an operator $T$ is a $\\lambda \\in F$ for which $T - \\lambda I$ is not injective. In finite dimension that is the same as $\\det(T - \\lambda I) = 0$. So define the **characteristic polynomial**
$$\\chi_T(t) = \\det(tI - T),$$
which is monic of degree $n = \\dim V$ with coefficients in $F$. It is defined through the matrix of $T$ in any basis, and similar matrices give the same polynomial. Its roots **in $F$** are exactly the eigenvalues of $T$. Expanding gives
$$\\chi_T(t) = t^n - (\\operatorname{tr} T)\\, t^{n-1} + \\dots + (-1)^n \\det T.$$

The phrase *in $F$* carries all the weight. An operator on a non-zero space need not have any eigenvalues unless $\\chi_T$ has a root. A field is **algebraically closed** if every non-constant polynomial over it has a root, and then every polynomial **splits** into linear factors. $\\mathbb{C}$ is the main example.

**Worked example.** Let
$$J = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}, \\qquad \\chi_J(t) = t^2 + 1.$$
The same matrix behaves quite differently across fields.

- Over $\\mathbb{R}$ and over $\\mathbb{F}_3$: no root, because $t^2 + 1$ is irreducible there. (In $\\mathbb{F}_3$, the squares are 0 and 1.) So there are no eigenvalues and no invariant lines.
- Over $\\mathbb{C}$: roots $\\pm i$, and $J$ is diagonalisable.
- Over $\\mathbb{F}_5$: since $2^2 = 4 = -1$, the roots are 2 and 3. The eigenvectors are $(1, 3)$ for $\\lambda = 2$ and $(1, 2)$ for $\\lambda = 3$. Two distinct eigenvalues mean $J$ is diagonalisable over $\\mathbb{F}_5$.
- Over $\\mathbb{F}_2$: $t^2 + 1 = (t + 1)^2$, so the only eigenvalue is 1. The eigenspace is the kernel of $J + I$, which has rows $(1, 1), (1, 1)$, so it has dimension 1, spanned by $(1, 1)$. Thus $J$ is not diagonalisable over $\\mathbb{F}_2$, even though it is over $\\mathbb{F}_5$ and $\\mathbb{C}$.

The characteristic polynomial does not determine an operator up to similarity. The matrices $I_2$ and the matrix with rows $(1, 1), (0, 1)$ both have $\\chi = (t - 1)^2$ but are not similar. Finding invariants that do classify operators is the aim of the next module.

Every monic polynomial $t^n + a_{n-1}t^{n-1} + \\dots + a_0$ over $F$ is the characteristic polynomial of something: its **companion matrix**, with 1s below the diagonal and last column $(-a_0, \\dots, -a_{n-1})$. So asking for eigenvalues of matrices is as hard as finding roots of polynomials. Since degree 5 and above has no general formula in radicals, eigenvalue algorithms must be iterative.`,
          resources: [
            main(treil, 'The chapter on spectral theory, which uses the characteristic polynomial directly.'),
            also(axler, 'Compare the eigenvalue chapter, which proves existence without determinants.'),
            also(mit18700, 'The notes on eigenvalues and the characteristic polynomial.'),
          ],
          exercises: [
            {
              slug: 'products-have-same-charpoly',
              title: 'AB and BA',
              prompt:
                'Prove that $AB$ and $BA$ have the same characteristic polynomial for $n \\times n$ matrices over any field. Deduce that they have the same trace and determinant. Then show by example that $AB$ and $BA$ need not be similar.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $A$ is invertible, then $BA = A^{-1}(AB)A$. In general, work over the field $F(x)$, where $A + xI$ is invertible, then set $x = 0$ in the polynomial identity. For the example, try $A = E_{11}$ and $B = E_{12}$.',
            },
            {
              slug: 'odd-dimension',
              title: 'Eigenvalues over the reals',
              prompt:
                'Prove that every operator on an odd-dimensional real space has an eigenvalue. Give an even-dimensional counterexample. Then prove that every operator on a non-zero real finite-dimensional space has an invariant subspace of dimension 1 or 2.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the second part, a real polynomial factors into real linear and quadratic factors. Apply them to a non-zero vector.',
            },
            {
              slug: 'companion-matrix',
              title: 'The companion matrix',
              prompt:
                'Prove by induction that the companion matrix of a monic polynomial $p$ has characteristic polynomial $p$. Check it in SymPy for $t^3 + 2t^2 - t + 5$. Prove that a companion matrix has every eigenspace of dimension 1, so it is diagonalisable if and only if $p$ splits with distinct roots.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the coefficients of $\\chi_T$ at $t^{n-1}$ and at $t^0$ in terms of familiar quantities.',
              answerOutline: '$-\\operatorname{tr}T$ and $(-1)^n\\det T$.',
            },
            {
              question: 'What is $\\chi_J$ for the rotation $J$ over $\\mathbb{F}_2$, and is $J$ diagonalisable there?',
              answerOutline: '$(t+1)^2$. Not diagonalisable, since the eigenspace for 1 has dimension 1.',
            },
            {
              question: 'Does equal characteristic polynomial imply similarity?',
              answerOutline: 'No. $I_2$ and the matrix with rows $(1,1),(0,1)$ are a counterexample.',
            },
          ],
        },
        {
          slug: 'invariant-subspaces',
          title: 'Invariant subspaces and triangular form',
          summary:
            'Prove that operators over an algebraically closed field have eigenvalues and can be made triangular.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that eigenvectors with distinct eigenvalues are independent',
            'Prove the existence of eigenvalues over an algebraically closed field without determinants',
            'Prove that such operators have an upper triangular matrix',
            'Find invariant subspaces of small operators',
          ],
          concepts: [
            'Invariant subspace',
            'Polynomials in an operator',
            'Existence of eigenvalues',
            'Triangularisation',
            'Commuting operators',
          ],
          explanation: `A subspace $U$ is **invariant** under $T$ if $T(U) \\subseteq U$. Invariant subspaces let you split a problem into smaller ones. Kernels and images of polynomials in $T$ are always invariant, because $p(T)$ commutes with $T$.

Polynomials in an operator behave as they should: the map $p \\mapsto p(T)$ from $F[t]$ to operators respects sums and products, because powers of a single operator commute. So a factorisation of $p$ gives a factorisation of $p(T)$.

**Theorem.** Let $F$ be algebraically closed and let $V \\neq 0$ be finite-dimensional. Then every operator $T$ on $V$ has an eigenvalue.

*Proof.* Let $n = \\dim V$ and take $v \\neq 0$. The $n + 1$ vectors $v, Tv, \\dots, T^n v$ are dependent, so there are scalars, not all zero, with $a_0 v + a_1 Tv + \\dots + a_n T^n v = 0$. Let $p(t) = \\sum a_i t^i$. If $a_1, \\dots, a_n$ all vanished, we would have $a_0 v = 0$ with $a_0 \\neq 0$, which is impossible. So $p$ is non-constant, and it splits: $p = c(t - \\lambda_1)\\cdots(t - \\lambda_m)$. Then
$$0 = p(T)v = c(T - \\lambda_1 I)\\cdots(T - \\lambda_m I)v.$$
A composition of injective maps is injective, and this one kills $v \\neq 0$. So some $T - \\lambda_j I$ is not injective, and $\\lambda_j$ is an eigenvalue. $\\square$

The proof uses no determinants, and it shows where the hypotheses go. Finite dimension gives dependence, and algebraic closure gives the factorisation.

**Theorem: triangular form.** Under the same hypotheses, $V$ has a basis in which $T$ is upper triangular.

*Proof.* Induct on $\\dim V$. Take an eigenvector $v$ and let $U = \\operatorname{span}(v)$, which is invariant. On $V/U$, the induced operator has an upper triangular matrix by induction, in a basis $w_2 + U, \\dots, w_n + U$. Then $v, w_2, \\dots, w_n$ is a basis of $V$, and $Tw_j \\in \\operatorname{span}(v, w_2, \\dots, w_j)$. $\\square$

The diagonal entries of a triangular matrix are exactly the eigenvalues, counted with multiplicity in $\\chi_T$.

**Worked example.** Find all invariant subspaces of $T$ on $\\mathbb{R}^2$ with rows $(1, 1), (0, 1)$. The subspaces 0 and $\\mathbb{R}^2$ always qualify. A 1-dimensional invariant subspace is exactly the span of an eigenvector. Here $\\chi_T = (t - 1)^2$, and $T - I$ has kernel spanned by $e_1$. So the list is complete: $0$, $\\operatorname{span}(e_1)$, $\\mathbb{R}^2$. By comparison, $\\mathrm{diag}(1, 2)$ has four, and the rotation $J$ over $\\mathbb{R}$ has only the two trivial ones.

**Commuting operators.** If $ST = TS$, then every eigenspace of $T$ is $S$-invariant, because $T(Sv) = S(Tv) = \\lambda Sv$. Over an algebraically closed field, $S$ and $T$ thus have a common eigenvector, since $S$ restricted to an eigenspace of $T$ has an eigenvector.`,
          resources: [
            main(axler, 'The chapter on eigenvalues, including the determinant-free existence proof and upper triangular matrices.'),
            also(mit18700, 'The notes on invariant subspaces.'),
            also(treil, 'Compare the triangularisation proof in the spectral theory chapter.'),
          ],
          exercises: [
            {
              slug: 'distinct-eigenvalues',
              title: 'Distinct eigenvalues give independence',
              prompt:
                'Prove that eigenvectors with distinct eigenvalues are independent, over any field. Deduce that eigenspaces for distinct eigenvalues form a direct sum, and that an $n$-dimensional operator has at most $n$ eigenvalues.',
              kind: 'derivation',
              difficulty: 1,
              hint: 'Take a shortest dependence and apply $T - \\lambda_1 I$ to it.',
            },
            {
              slug: 'all-invariant-subspaces',
              title: 'Listing invariant subspaces',
              prompt:
                'Prove that if $T$ on an $n$-dimensional space has $n$ distinct eigenvalues, then it has exactly $2^n$ invariant subspaces. Now take $T$ with a single Jordan block of size $n$ and eigenvalue 0. Prove that its invariant subspaces are exactly the kernels of $T^k$, so there are $n + 1$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the first part, show that an invariant subspace is the sum of its intersections with the eigenlines. Use the projections, which are polynomials in $T$.',
            },
            {
              slug: 'common-eigenvector',
              title: 'Commuting families',
              prompt:
                'Over an algebraically closed field, prove that any finite family of pairwise commuting operators has a common eigenvector, and is simultaneously upper triangularisable. Give two operators on $\\mathbb{C}^2$ with no common eigenvector, and verify that they do not commute.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the existence proof use algebraic closure, and where does it use finite dimension?',
              answerOutline: 'Closure lets $p$ factor into linear factors. Finite dimension makes $v, Tv, \\dots, T^n v$ dependent.',
            },
            {
              question: 'What can you read from the diagonal of a triangular matrix of $T$?',
              answerOutline: 'The eigenvalues of $T$, each repeated according to its multiplicity in $\\chi_T$.',
            },
            {
              question: 'Why is an eigenspace of $T$ invariant under any $S$ commuting with $T$?',
              answerOutline: 'If $Tv = \\lambda v$ then $T(Sv) = STv = \\lambda Sv$, so $Sv$ lies in the same eigenspace.',
            },
          ],
        },
      ],
    },
    {
      slug: 'canonical-forms',
      title: 'Diagonalisation and Canonical Forms',
      description:
        'Use the minimal polynomial to decide diagonalisability, split a space into generalised eigenspaces, and reach Jordan form.',
      lessons: [
        {
          slug: 'minimal-polynomial',
          title: 'The minimal polynomial',
          summary:
            'Find the smallest polynomial that kills an operator, prove the Cayley-Hamilton theorem, and characterise diagonalisability.',
          estimatedMinutes: 130,
          objectives: [
            'Define the minimal polynomial and prove it divides every annihilating polynomial',
            'State and prove the Cayley-Hamilton theorem',
            'Show that the minimal and characteristic polynomials have the same roots',
            'Decide diagonalisability from the minimal polynomial',
          ],
          concepts: [
            'Annihilating polynomial',
            'Minimal polynomial',
            'Cayley-Hamilton theorem',
            'Adjugate',
            'Diagonalisability criterion',
          ],
          explanation: `For an operator $T$ on an $n$-dimensional space, the powers $I, T, \\dots, T^{n^2}$ are dependent in the $n^2$-dimensional space $\\mathcal{L}(V)$, so some non-zero polynomial kills $T$. The **minimal polynomial** $m_T$ is the monic polynomial of least degree with $m_T(T) = 0$.

It divides every polynomial $p$ with $p(T) = 0$. Write $p = qm_T + r$ with $\\deg r < \\deg m_T$. Then $r(T) = 0$, which forces $r = 0$ by minimality. In particular, $m_T$ is unique.

**Cayley-Hamilton theorem.** Over any field, $\\chi_T(T) = 0$. So $m_T$ divides $\\chi_T$, and $\\deg m_T \\le n$.

Beware the tempting false proof, which substitutes $t = A$ in $\\det(tI - A)$ to get $\\det(A - A) = 0$. That confuses a scalar (the determinant) with a matrix: $\\chi_A(A)$ is a matrix, and the substitution is not legitimate inside the determinant. A real proof uses the adjugate identity $(tI - A)\\operatorname{adj}(tI - A) = \\chi_A(t)I$, as an exercise below shows.

The two polynomials have the same roots. If $\\lambda$ is an eigenvalue with eigenvector $v$, then $0 = m_T(T)v = m_T(\\lambda)v$, so $m_T(\\lambda) = 0$. Conversely, $m_T$ divides $\\chi_T$, so its roots are roots of $\\chi_T$. Multiplicities can differ, and the difference is exactly what detects non-diagonalisability.

**Theorem.** $T$ is diagonalisable over $F$ if and only if $m_T$ splits over $F$ into **distinct** linear factors.

*One direction.* If $V$ has an eigenbasis with distinct eigenvalues $\\lambda_1, \\dots, \\lambda_k$, then $\\prod_i (T - \\lambda_i I)$ kills every basis vector, so it is zero, and $m_T$ divides this squarefree product. The converse uses primary decomposition, in the next lesson.

**Worked example.** Let
$$A = \\begin{bmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{bmatrix}, \\qquad \\chi_A = (t - 1)^2(t - 2).$$
The minimal polynomial has the same roots and divides $\\chi_A$, so it is $(t - 1)(t - 2)$ or $\\chi_A$ itself. Compute $(A - I)(A - 2I)$: it has a single non-zero entry, $-1$, in position $(1, 2)$. So $m_A = (t - 1)^2(t - 2)$, which has a repeated root, and $A$ is not diagonalisable.

The criterion gives results that have nothing to do with computing eigenvectors. If $T^2 = T$, then $m_T$ divides $t(t - 1)$, so $T$ is diagonalisable over every field. If $T^p = T$ over $\\mathbb{F}_p$, then $m_T$ divides $t^p - t = \\prod_{a \\in \\mathbb{F}_p}(t - a)$, so $T$ is diagonalisable. If $T^2 = I$, then $m_T$ divides $(t - 1)(t + 1)$, which has distinct roots only when $\\operatorname{char} F \\neq 2$. Over $\\mathbb{F}_2$, the matrix with rows $(1, 1), (0, 1)$ squares to $I$ but is not diagonalisable, since $t^2 + 1 = (t + 1)^2$.`,
          resources: [
            main(conradMinpoly, 'The minimal polynomial and its uses, over a general field, with many examples.'),
            also(axler, 'The sections on the minimal polynomial.'),
            also(mit18700, 'The notes on the Cayley-Hamilton theorem.'),
          ],
          exercises: [
            {
              slug: 'cayley-hamilton-proof',
              title: 'Prove Cayley-Hamilton',
              prompt:
                'Let $A$ be an $n \\times n$ matrix over a field. Write $\\operatorname{adj}(tI - A) = \\sum_{i=0}^{n-1} B_i t^i$ with $B_i$ matrices over $F$, and $\\chi_A(t) = \\sum_i c_i t^i$. By comparing coefficients in $(tI - A)\\operatorname{adj}(tI - A) = \\chi_A(t)I$, prove that $\\chi_A(A) = 0$. Then explain exactly why the argument substituting $t = A$ into the determinant is invalid.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'You get $B_{i-1} - AB_i = c_iI$. Multiply the $i$th equation by $A^i$ on the left and add, and the sum telescopes.',
            },
            {
              slug: 'annihilator-consequences',
              title: 'Diagonalisability without eigenvectors',
              prompt:
                'Using the criterion, prove: (a) any $T$ with $T^2 = T$ is diagonalisable; (b) any $T$ over $\\mathbb{F}_p$ with $T^p = T$ is diagonalisable; (c) over $\\mathbb{C}$, any $T$ with $T^k = I$ for some $k \\geq 1$ is diagonalisable; (d) the restriction of a diagonalisable operator to an invariant subspace is diagonalisable. Show that (c) fails over $\\mathbb{F}_p$ when $p$ divides $k$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'simultaneous-diagonalisation',
              title: 'Simultaneous diagonalisation',
              prompt:
                'Prove that two commuting diagonalisable operators on a finite-dimensional space are simultaneously diagonalisable. Show that commutativity is necessary. Give two diagonalisable $2 \\times 2$ real matrices that do not commute.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the relationship between $m_T$ and $\\chi_T$?',
              answerOutline: '$m_T$ divides $\\chi_T$ by Cayley-Hamilton, and they have the same roots, possibly with different multiplicities.',
            },
            {
              question: 'State the criterion for diagonalisability in terms of $m_T$.',
              answerOutline: '$T$ is diagonalisable over $F$ exactly when $m_T$ is a product of distinct linear factors over $F$.',
            },
            {
              question: 'Is every operator with $T^2 = I$ diagonalisable?',
              answerOutline: 'Yes if $\\operatorname{char}F \\neq 2$. No in characteristic 2, for example rows $(1,1),(0,1)$ over $\\mathbb{F}_2$.',
            },
          ],
        },
        {
          slug: 'generalised-eigenspaces',
          title: 'Generalised eigenspaces',
          summary:
            'Split a space using coprime factors of a polynomial, and separate any operator into diagonalisable and nilpotent parts.',
          estimatedMinutes: 130,
          objectives: [
            'Prove the primary decomposition theorem using Bezout',
            'Define generalised eigenspaces and compute their dimensions',
            'Find the projections onto generalised eigenspaces as polynomials in $T$',
            'Write an operator as a commuting sum of diagonalisable and nilpotent parts',
          ],
          concepts: [
            'Primary decomposition',
            'Generalised eigenvector',
            'Nilpotent operator',
            'Spectral projections',
            'Jordan-Chevalley decomposition',
          ],
          explanation: `**Primary decomposition theorem.** Let $p, q \\in F[t]$ be coprime. Then $\\ker\\big(p(T)q(T)\\big) = \\ker p(T) \\oplus \\ker q(T)$.

*Proof.* Bezout gives polynomials with $ap + bq = 1$, so $a(T)p(T) + b(T)q(T) = I$. Take $x$ in the left side, and write $x = a(T)p(T)x + b(T)q(T)x$. The first term is killed by $q(T)$, since all these polynomials in $T$ commute, and the second is killed by $p(T)$. So the sum of the kernels is everything. If $x$ lies in both kernels, the same identity gives $x = 0$. $\\square$

Applying this repeatedly to a factorisation $\\chi_T = \\prod_i p_i^{e_i}$ into powers of distinct irreducibles splits $V$ into $T$-invariant pieces $\\ker p_i(T)^{e_i}$. It needs no algebraic closure.

If $\\chi_T$ splits, as it does over $\\mathbb{C}$, the pieces are the **generalised eigenspaces**
$$G(\\lambda) = \\ker (T - \\lambda I)^n,$$
and $V = \\bigoplus_\\lambda G(\\lambda)$. The dimension of $G(\\lambda)$ equals the multiplicity of $\\lambda$ in $\\chi_T$, and on $G(\\lambda)$, the operator $T - \\lambda I$ is **nilpotent**. The ordinary eigenspace may be smaller. This completes the diagonalisability theorem: if $m_T$ is squarefree and splits, then each piece is $\\ker(T - \\lambda_i I)$, which is an eigenspace, so $V$ is a direct sum of eigenspaces.

**Worked example.** Let
$$A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 3 \\end{bmatrix}, \\qquad \\chi_A = (t - 2)^2(t - 3).$$
Then $G(2)$ is the kernel of
$$(A - 2I)^2 = \\begin{bmatrix} 0 & 0 & 2 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix},$$
which is the span of $e_1, e_2$, and $G(3) = \\ker(A - 3I)$ is the span of $(2, 1, 1)$. The projections are polynomials in $A$. Since $(t - 2)^2 - (t - 1)(t - 3) = 1$, set
$$P_3 = (A - 2I)^2, \\qquad P_2 = -(A - I)(A - 3I).$$
Then $P_2 + P_3 = I$. The matrix $P_3$ kills $G(2)$ and fixes $(2, 1, 1)$, as a projection onto $G(3)$ along $G(2)$ should. So does $P_2$ with the roles reversed.

Set $S = 2P_2 + 3P_3$ and $N = A - S$. Then
$$S = \\begin{bmatrix} 2 & 0 & 2 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 3 \\end{bmatrix}, \\qquad N = \\begin{bmatrix} 0 & 1 & -1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}.$$
Here $S$ is diagonalisable, $N^2 = 0$, and $SN = NS$. This is the **Jordan-Chevalley decomposition**, and when $\\chi_T$ splits, it exists and is unique. Note that $S$ is not the diagonal part of $A$. The split $A = \\mathrm{diag}(2, 2, 3) + (\\text{rest})$ is not commuting, as you can check. That commutation is what gives $e^{tA} = e^{tS}e^{tN}$, a finite computation.`,
          resources: [
            main(axler, 'The chapter on operators on complex vector spaces, on generalised eigenvectors and their decomposition.'),
            also(conradMinpoly, 'See its treatment of generalised eigenspaces and related applications.'),
            also(treil, 'The chapter on the structure of operators.'),
          ],
          exercises: [
            {
              slug: 'dimension-of-generalised-eigenspace',
              title: 'Dimension of a generalised eigenspace',
              prompt:
                'Let $\\chi_T$ split. Prove that the spaces $\\ker(T - \\lambda I)^k$ increase with $k$ and stabilise by $k = n$. Prove that $\\dim G(\\lambda)$ equals the multiplicity of $\\lambda$ in $\\chi_T$, and that the exponent of $(t - \\lambda)$ in $m_T$ is the least $k$ with $\\ker(T - \\lambda I)^k = G(\\lambda)$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'jordan-chevalley-existence',
              title: 'Existence and uniqueness of the decomposition',
              prompt:
                'Assume $\\chi_T$ splits. Prove that there are commuting $S$ diagonalisable and $N$ nilpotent with $T = S + N$, and that $S$ and $N$ are polynomials in $T$. Prove uniqueness.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For uniqueness, suppose $S + N = S\' + N\'$. Show that $S\'$ and $N\'$ commute with $T$, hence with $S$ and $N$. Then $S - S\' = N\' - N$ is both diagonalisable and nilpotent.',
            },
            {
              slug: 'matrix-exponential',
              title: 'An exponential by hand',
              prompt:
                'Let $A$ have rows $(3, 1), (-1, 1)$. Show that $\\chi_A = (t - 2)^2$ and that $N = A - 2I$ satisfies $N^2 = 0$. Deduce that $e^{tA} = e^{2t}(I + tN)$, and solve $x\' = Ax$ with $x(0) = (1, 0)$. Check with SymPy. Explain why this method needs $2I$ and $N$ to commute, and give an example of non-commuting $X, Y$ with $e^{X + Y} \\neq e^Xe^Y$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between an eigenspace and a generalised eigenspace?',
              answerOutline: 'The first is $\\ker(T - \\lambda I)$, and the second is $\\ker(T - \\lambda I)^n$, which has dimension equal to the algebraic multiplicity.',
            },
            {
              question: 'Where does the proof of primary decomposition use coprimality?',
              answerOutline: 'To get Bezout: $ap + bq = 1$, which writes the identity as a sum of two operators built from $p(T)$ and $q(T)$.',
            },
            {
              question: 'Why does $S$ in Jordan-Chevalley commute with $N$?',
              answerOutline: 'Both are polynomials in $T$. Concretely, $S$ acts as a scalar on each generalised eigenspace.',
            },
          ],
        },
        {
          slug: 'jordan-form',
          title: 'Jordan form',
          summary:
            'Classify operators with a split characteristic polynomial, computing the block sizes from ranks.',
          estimatedMinutes: 150,
          objectives: [
            'State the Jordan form theorem with its hypotheses',
            'Compute block sizes from the dimensions of kernels of powers',
            'Decide whether two matrices are similar',
            'Explain why Jordan form is unstable numerically',
          ],
          concepts: [
            'Jordan block',
            'Jordan chain',
            'Jordan form theorem',
            'Block size formula',
            'Similarity classification',
          ],
          explanation: `A **Jordan block** $J_k(\\lambda)$ is the $k \\times k$ matrix with $\\lambda$ on the diagonal, 1s just above it, and zeros elsewhere. A basis $v_1, \\dots, v_k$ puts $T$ in this form when $(T - \\lambda I)v_1 = 0$ and $(T - \\lambda I)v_{i} = v_{i-1}$. Such a list is a **Jordan chain**.

**Jordan form theorem.** If $\\chi_T$ splits over $F$, then $V$ has a basis in which $T$ is a direct sum of Jordan blocks, and the blocks are unique up to order. So two such operators are similar if and only if they have the same blocks.

The hypothesis is needed. Over $\\mathbb{R}$, the rotation $J$ has no Jordan form, since $\\chi_J$ does not split. The capstone treats the general case.

*Proof outline.* By generalised eigenspaces, it suffices to treat a nilpotent $N$ on a space $W$. Induct on $\\dim W$. Since $N$ is not surjective, $N(W)$ is smaller, and it has a basis of chains by induction. For the top $u$ of each chain, choose $w$ with $Nw = u$, which lengthens the chain by one. Then extend the bottoms of the chains to a basis of $\\ker N$, adding each new vector as a chain of length 1. A count using rank-nullity shows that all these vectors form a basis. $\\square$

**Block sizes from ranks.** Let $N = T - \\lambda I$ and $d_k = \\dim \\ker N^k$, with $d_0 = 0$. Each block of size at least $k$ contributes exactly 1 to $d_k - d_{k-1}$. So
$$\\#\\{\\text{blocks for } \\lambda \\text{ of size} \\ge k\\} = d_k - d_{k-1}.$$
This shows uniqueness, because $d_k$ does not depend on any basis. It also gives an algorithm that avoids finding chains.

**Worked example.** A nilpotent $N$ on a 6-dimensional space has $\\operatorname{rank} N = 3$, $\\operatorname{rank} N^2 = 1$ and $\\operatorname{rank} N^3 = 0$. So the kernels have dimensions $d_1 = 3$, $d_2 = 5$, $d_3 = 6$. The differences are $3, 2, 1$. There are 3 blocks of size at least 1, 2 of size at least 2 and 1 of size at least 3, and none larger. So the blocks have sizes $3, 2, 1$.

The minimal polynomial and characteristic polynomial read off some of this. The exponent of $t - \\lambda$ in $m_T$ is the largest block size for $\\lambda$, and the exponent in $\\chi_T$ is the sum of the block sizes. The dimension of the eigenspace is the number of blocks. These data determine the form in dimension at most 3 but not in general: $J_2(0) \\oplus J_2(0)$ and $J_2(0) \\oplus J_1(0) \\oplus J_1(0)$ have the same $\\chi$ and $m$.

Jordan form is exact mathematics and useless numerics. The matrix with rows $(0, 1), (\\varepsilon, 0)$ is diagonalisable with eigenvalues $\\pm\\sqrt{\\varepsilon}$ for every $\\varepsilon > 0$, and it is a single Jordan block at $\\varepsilon = 0$. An arbitrarily small rounding error changes the form. Compute it only in exact arithmetic, for example with SymPy's \`jordan_form\`.`,
          resources: [
            main(axler, 'The sections on nilpotent operators and on Jordan form.'),
            also(treil, 'The chapter on the structure of operators, with its pictorial approach to chains.'),
            also(mit18701, 'The material on Jordan form in the linear operators lectures.'),
          ],
          exercises: [
            {
              slug: 'nilpotent-existence',
              title: 'Prove the nilpotent case',
              prompt:
                'Write the proof that a nilpotent operator on a finite-dimensional space has a basis of Jordan chains in full, including the count that shows that the constructed list is a basis. State clearly what each induction hypothesis gives you.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $N(W)$ has $c$ chains of total length $m$, then the bottoms are $c$ independent vectors of $\\ker N$. Count: $\\dim W = m + \\dim\\ker N$, and the construction gives $m + c + (\\dim\\ker N - c)$ vectors.',
            },
            {
              slug: 'compute-a-jordan-form',
              title: 'Compute a Jordan form',
              prompt:
                'Find the Jordan form of the matrix with rows $(2, 1, -1, 1)$, $(0, 2, 0, 0)$, $(0, 0, 2, 1)$, $(0, 0, 0, 3)$ by computing ranks of powers of $A - \\lambda I$ by hand. Then find a basis of chains, and verify your answer with SymPy\'s `jordan_form`. State $\\chi_A$ and $m_A$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'similar-to-transpose',
              title: 'What determines similarity',
              prompt:
                'Over an algebraically closed field: (a) prove that in dimension at most 3, $\\chi_T$ and $m_T$ determine the similarity class; (b) give two non-similar $4 \\times 4$ matrices with the same $\\chi$ and $m$; (c) prove that every square matrix is similar to its transpose; (d) prove that $T$ and $cT$ are similar for nilpotent $T$ and $c \\neq 0$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), reverse the order of the basis of a Jordan chain.',
            },
          ],
          selfAssessment: [
            {
              question: 'What hypothesis does the Jordan form theorem need?',
              answerOutline: 'The characteristic polynomial must split over $F$. Every operator over $\\mathbb{C}$ qualifies.',
            },
            {
              question: 'What do the exponents in $\\chi_T$ and $m_T$ say about the blocks, and how do you read off the number of blocks?',
              answerOutline: 'The exponent in $\\chi_T$ is the total block size, the exponent in $m_T$ is the largest block size, and the number of blocks is the dimension of the eigenspace.',
            },
            {
              question: 'Why is Jordan form not computed in floating point?',
              answerOutline: 'It is discontinuous: arbitrarily small perturbations change the block structure.',
            },
          ],
        },
      ],
      project: {
        slug: 'exact-jordan-form',
        title: 'An exact Jordan form calculator',
        description: `Write a Python program using SymPy's exact arithmetic that computes the Jordan form of a rational matrix from first principles, with no call to a built-in Jordan routine. It should factor the characteristic polynomial, compute the ranks of powers of $A - \\lambda I$ to find block sizes, construct Jordan chains, and return both $J$ and the change-of-basis matrix. It should refuse a matrix whose characteristic polynomial does not split over the rationals and say why. Then use it to find a smallest pair of matrices that the common invariants fail to distinguish.`,
        deliverables: [
          'A function `jordan(A)` returning exact $P$ and $J$ with $A = PJP^{-1}$, verified exactly in tests on at least 20 matrices, including some built from a known $J$ by a random integer change of basis with determinant 1',
          'A function reporting $\\chi_A$, $m_A$, and the geometric multiplicities, with tests against hand-computed cases',
          'A demonstration of the failure in dimension 4: a pair of non-similar matrices with the same $\\chi$ and $m$, and the rank that separates them',
          'A short note with proofs of the block size formula and of the correctness of the chain construction your code uses',
          'A demonstration of numerical instability: floating-point eigenvalues of a perturbed Jordan block of size 10, compared with the circle of radius about $\\varepsilon^{1/10}$ that theory predicts',
        ],
        estimatedHours: 8,
        stretchGoals: ['Handle algebraic eigenvalues by working in an extension field', 'Compute $e^{tA}$ exactly from your output'],
      },
    },
    {
      slug: 'inner-product-spaces',
      title: 'Inner Product Spaces',
      description:
        'Add lengths and angles over the real and complex numbers, define adjoints, and prove the spectral theorems.',
      lessons: [
        {
          slug: 'inner-products-and-orthonormal-bases',
          title: 'Inner products and orthonormal bases',
          summary:
            'Define inner products abstractly, prove Cauchy-Schwarz, and build orthonormal bases and orthogonal projections.',
          estimatedMinutes: 120,
          objectives: [
            'State the axioms of an inner product over $\\mathbb{R}$ or $\\mathbb{C}$',
            'Prove the Cauchy-Schwarz and triangle inequalities',
            'Apply Gram-Schmidt in a function space',
            'Prove that $V = U \\oplus U^\\perp$ when $U$ is finite-dimensional',
          ],
          concepts: [
            'Inner product',
            'Norm',
            'Cauchy-Schwarz inequality',
            'Orthonormal basis',
            'Orthogonal complement',
            'Best approximation',
          ],
          explanation: `From here on, $F$ is $\\mathbb{R}$ or $\\mathbb{C}$, because positivity requires an ordering. An **inner product** on $V$ assigns a scalar $\\langle u, v\\rangle$ to each pair, so that it is linear in the first slot, $\\langle v, u\\rangle = \\overline{\\langle u, v\\rangle}$, and $\\langle v, v\\rangle > 0$ for $v \\neq 0$. It follows that the second slot is conjugate-linear. This is the usual mathematics convention. Physics usually reverses it, so check any source you read. The **norm** is $\\|v\\| = \\sqrt{\\langle v, v\\rangle}$.

The examples go beyond the dot product. For positive definite $G$, the formula $\\langle x, y\\rangle = y^*Gx$ is an inner product on $F^n$, and all inner products on $F^n$ are of this form. On continuous functions, $\\langle f, g\\rangle = \\int_0^1 f\\bar{g}$ is an inner product.

**Cauchy-Schwarz.** $|\\langle u, v\\rangle| \\le \\|u\\|\\|v\\|$, with equality exactly when $u, v$ are dependent.

*Proof.* If $v = 0$ both sides are 0. Otherwise, let $c = \\langle u, v\\rangle / \\|v\\|^2$ and $w = u - cv$. Then $\\langle w, v\\rangle = 0$, so by Pythagoras, $\\|u\\|^2 = \\|w\\|^2 + |c|^2\\|v\\|^2 \\ge |\\langle u, v\\rangle|^2 / \\|v\\|^2$. Equality holds if and only if $w = 0$. $\\square$

**Gram-Schmidt** turns any independent list into an orthonormal list with the same successive spans. So every finite-dimensional inner product space has an orthonormal basis, and in such a basis, coordinates are $\\langle v, e_i\\rangle$.

For a subspace $U$, the **orthogonal complement** is $U^\\perp = \\{v : \\langle v, u\\rangle = 0 \\text{ for all } u \\in U\\}$. If $U$ is finite-dimensional with orthonormal basis $e_1, \\dots, e_m$, then for any $v$, the vector $Pv = \\sum_i \\langle v, e_i\\rangle e_i$ lies in $U$, and $v - Pv$ lies in $U^\\perp$. So $V = U \\oplus U^\\perp$, and $Pv$ is the closest point of $U$ to $v$. The finiteness hypothesis matters. In $C[0, 1]$ with the integral inner product, let $U$ be the polynomials. By the Weierstrass theorem, $U^\\perp = \\{0\\}$, so $U \\oplus U^\\perp = U \\neq V$.

**Worked example.** Find the best approximation to $t^2$ by a polynomial of degree at most 1 on $[0, 1]$, using $\\langle f, g\\rangle = \\int_0^1 fg$. Apply Gram-Schmidt to $1, t$. First, $e_1 = 1$. Then $t - \\langle t, 1\\rangle = t - \\tfrac12$, whose squared norm is $\\tfrac{1}{12}$, so $e_2 = \\sqrt{3}(2t - 1)$. Next, $\\langle t^2, e_1\\rangle = \\tfrac13$, and $\\langle t^2, e_2\\rangle = \\sqrt{3}(\\tfrac12 - \\tfrac13) = \\tfrac{\\sqrt{3}}{6}$. Hence
$$Pt^2 = \\tfrac13 + \\tfrac{\\sqrt{3}}{6}\\sqrt{3}(2t - 1) = t - \\tfrac16.$$
The squared error is $\\|t^2 - t + \\tfrac16\\|^2 = \\tfrac{1}{180}$. This differs from the Taylor approximation, because it minimises error over the whole interval.`,
          resources: [
            main(axler, 'The chapter on inner product spaces.'),
            also(treil, 'The chapter on inner product spaces, including orthogonal projection.'),
            also(mit18700, 'The notes on inner products and orthonormal bases.'),
          ],
          exercises: [
            {
              slug: 'parallelogram-law',
              title: 'Which norms come from inner products',
              prompt:
                'Prove the parallelogram law, $\\|u + v\\|^2 + \\|u - v\\|^2 = 2\\|u\\|^2 + 2\\|v\\|^2$, and the polarisation identity over $\\mathbb{R}$ and over $\\mathbb{C}$. Show that the norm $\\|x\\|_1 = |x_1| + |x_2|$ on $\\mathbb{R}^2$ does not come from an inner product.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'next-orthogonal-polynomial',
              title: 'The next orthogonal polynomial',
              prompt:
                'Continue the worked example: find $e_3$, and confirm that it is proportional to $6t^2 - 6t + 1$. Use the three polynomials to find the best quadratic approximation to $e^t$ on $[0, 1]$. Check your coefficients with SymPy and compare the maximum error with that of the Taylor polynomial of degree 2 at $t = \\tfrac12$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'double-complement',
              title: 'Complements of complements',
              prompt:
                'For a finite-dimensional inner product space, prove that $(U^\\perp)^\\perp = U$ and $\\dim U^\\perp = \\dim V - \\dim U$. Then, in $C[0, 1]$ with the integral inner product, use the polynomials to show that $(U^\\perp)^\\perp = U$ can fail in infinite dimension.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which slot is linear in this course, and how does it matter in practice?',
              answerOutline: 'The first. Scalars come out of the second slot conjugated: $\\langle u, cv\\rangle = \\bar{c}\\langle u, v\\rangle$. Physics reverses the convention.',
            },
            {
              question: 'What fails about $V = U \\oplus U^\\perp$ in infinite dimension?',
              answerOutline: 'For an infinite-dimensional $U$, the sum may be a proper subspace, as with polynomials inside $C[0,1]$.',
            },
            {
              question: 'Why is $Pv$ the closest point of $U$ to $v$?',
              answerOutline: 'For $u \\in U$, $v - Pv$ is perpendicular to $Pv - u$, and Pythagoras gives $\\|v - u\\|^2 = \\|v - Pv\\|^2 + \\|Pv - u\\|^2$.',
            },
          ],
        },
        {
          slug: 'adjoints',
          title: 'Adjoints',
          summary:
            'Represent functionals by vectors, define the adjoint of an operator, and see what the conjugate transpose really depends on.',
          estimatedMinutes: 110,
          objectives: [
            'Prove the Riesz representation theorem in finite dimension',
            'Define the adjoint and derive its algebraic properties',
            'Compute an adjoint for a non-standard inner product',
            'Relate kernels and images of $T$ and $T^*$',
          ],
          concepts: [
            'Riesz representation',
            'Adjoint',
            'Self-adjoint operator',
            'Normal operator',
            'Conjugate transpose',
          ],
          explanation: `In a finite-dimensional inner product space, every functional comes from a vector.

**Riesz representation.** For each $\\varphi \\in V^*$ there is a unique $u \\in V$ with $\\varphi(v) = \\langle v, u\\rangle$ for all $v$. With an orthonormal basis $e_i$, take $u = \\sum_i \\overline{\\varphi(e_i)}e_i$. If $u$ and $u'$ both work, then $\\langle v, u - u'\\rangle = 0$ for all $v$, and taking $v = u - u'$ gives $u = u'$.

Given $T : V \\to W$ between such spaces, fix $w \\in W$. The map $v \\mapsto \\langle Tv, w\\rangle$ is a functional, so it equals $\\langle v, T^*w\\rangle$ for a unique vector $T^*w$. This defines the **adjoint** $T^* : W \\to V$, with
$$\\langle Tv, w\\rangle = \\langle v, T^*w\\rangle.$$
It is linear, and $(S + T)^* = S^* + T^*$, $(cT)^* = \\bar{c}T^*$, $(ST)^* = T^*S^*$, $(T^*)^* = T$. It also satisfies
$$\\ker T^* = (\\operatorname{im} T)^\\perp, \\qquad \\operatorname{im} T^* = (\\ker T)^\\perp.$$
The adjoint is the dual map, transported to $V$ and $W$ by Riesz.

An operator is **self-adjoint** if $T^* = T$, and **normal** if $TT^* = T^*T$. Self-adjoint operators are normal. Over $\\mathbb{C}$, $T$ is self-adjoint if and only if $\\langle Tv, v\\rangle$ is real for every $v$.

The familiar statement that the adjoint is the conjugate transpose holds **only in an orthonormal basis**.

**Worked example.** On $\\mathbb{R}^2$, take $\\langle x, y\\rangle = y^TGx$ with
$$G = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix},$$
which is positive definite. Let $T$ have standard matrix $A$ with rows $(1, 1), (0, 1)$. The defining equation reads $y^TGAx = (A^*y)^TGx$ for all $x, y$, where $A^*$ is the matrix of $T^*$. That is, $GA = (A^*)^TG$. Taking transposes and using $G = G^T$ gives
$$A^* = G^{-1}A^TG = \\begin{bmatrix} -1 & -1 \\\\ 4 & 3 \\end{bmatrix}.$$
This is nothing like $A^T$. So whether $T$ is self-adjoint depends on the inner product: $A$ is not self-adjoint here, and neither is it for the dot product, but a different $G$ can make a non-symmetric matrix self-adjoint.

Riesz needs finite dimension. On $\\mathbb{R}[t]$ with $\\langle f, g\\rangle = \\int_0^1 fg$, the functional $f \\mapsto f(0)$ is represented by no polynomial, as an exercise shows. That is the source of the Dirac delta in applications.`,
          resources: [
            main(axler, 'The sections on linear functionals and adjoints.'),
            also(treil, 'The adjoint material in the inner product chapter.'),
            also(mit18700, 'The notes on adjoints and self-adjoint operators.'),
          ],
          exercises: [
            {
              slug: 'adjoint-properties',
              title: 'Kernels and images of the adjoint',
              prompt:
                'Prove that $T^*$ is linear, that $(ST)^* = T^*S^*$, that $\\ker T^* = (\\operatorname{im} T)^\\perp$ and that $\\operatorname{im} T^* = (\\ker T)^\\perp$. Deduce that $\\lambda$ is an eigenvalue of $T$ if and only if $\\bar{\\lambda}$ is an eigenvalue of $T^*$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'no-representing-polynomial',
              title: 'When Riesz fails',
              prompt:
                'On $\\mathbb{R}[t]$ with $\\langle f, g\\rangle = \\int_0^1 fg$, prove that no polynomial $u$ satisfies $\\int_0^1 fu = f(0)$ for all polynomials $f$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Take $f = t\\,u$ or $f = t^2 u$, chosen to make $f(0) = 0$ and the integral of a non-negative quantity.',
            },
            {
              slug: 'real-quadratic-form-test',
              title: 'What the quadratic form detects',
              prompt:
                'Over $\\mathbb{C}$, prove that $\\langle Tv, v\\rangle = 0$ for all $v$ implies $T = 0$, and that $T$ is self-adjoint if and only if $\\langle Tv, v\\rangle$ is real for all $v$. Show that the first statement fails over $\\mathbb{R}$, with a rotation. Prove that the statement does hold over $\\mathbb{R}$ if $T$ is assumed self-adjoint.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use polarisation: over $\\mathbb{C}$, $\\langle Tu, w\\rangle$ is a combination of values $\\langle Tv, v\\rangle$ at $v = u + i^k w$.',
            },
            {
              slug: 'derivative-adjoint',
              title: 'The adjoint of the derivative',
              prompt:
                'Let $V$ be the span of $1, \\cos t, \\sin t, \\cos 2t, \\sin 2t$ with $\\langle f, g\\rangle = \\int_0^{2\\pi} fg$. Prove by integration by parts that $D = d/dt$ has $D^* = -D$. Deduce that $D^2$ is self-adjoint, and find its eigenvalues on $V$. Confirm that the matrix of $D$ in the normalised basis is antisymmetric.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When is the matrix of $T^*$ the conjugate transpose of the matrix of $T$?',
              answerOutline: 'When the bases used are orthonormal. Otherwise it is not, as the formula $G^{-1}A^TG$ shows.',
            },
            {
              question: 'Define self-adjoint and normal. Which implies which?',
              answerOutline: 'Self-adjoint: $T^* = T$. Normal: $TT^* = T^*T$. Self-adjoint implies normal, but not conversely.',
            },
            {
              question: 'Give the relation between $\\ker T^*$ and $\\operatorname{im} T$.',
              answerOutline: '$\\ker T^* = (\\operatorname{im} T)^\\perp$.',
            },
          ],
        },
        {
          slug: 'spectral-theorems',
          title: 'The spectral theorems',
          summary:
            'Prove which operators have orthonormal eigenbases, which differs between the real and complex cases.',
          estimatedMinutes: 140,
          objectives: [
            'State the real and complex spectral theorems exactly',
            'Prove Schur triangularisation',
            'Prove the complex spectral theorem',
            'Prove the real spectral theorem',
          ],
          concepts: [
            'Schur triangularisation',
            'Normal operator',
            'Complex spectral theorem',
            'Real spectral theorem',
            'Unitary operator',
          ],
          explanation: `**Complex spectral theorem.** Let $V$ be a finite-dimensional complex inner product space. Then $V$ has an orthonormal basis of eigenvectors of $T$ if and only if $T$ is normal.

**Real spectral theorem.** Let $V$ be a finite-dimensional real inner product space. Then $V$ has an orthonormal basis of eigenvectors of $T$ if and only if $T$ is self-adjoint.

The real case needs the stronger hypothesis, because a real diagonal matrix in an orthonormal basis is self-adjoint. A rotation of $\\mathbb{R}^2$ by $90^\\circ$ is normal but has no real eigenvectors.

**Schur's theorem.** Every operator on a finite-dimensional complex inner product space has an upper triangular matrix in some orthonormal basis.

*Proof.* Take a basis that makes $T$ upper triangular, and apply Gram-Schmidt. The successive spans do not change, so each is still invariant, and that is what upper triangular means. $\\square$

*Proof of the complex spectral theorem.* If an orthonormal eigenbasis exists, then $[T]$ is diagonal, $[T^*]$ is its conjugate transpose, and diagonal matrices commute. Conversely, let $T$ be normal, and take a Schur basis, so that $[T] = (a_{ij})$ is upper triangular. First note that $\\|Tv\\| = \\|T^*v\\|$ for normal $T$, since $\\langle Tv, Tv\\rangle = \\langle T^*Tv, v\\rangle = \\langle TT^*v, v\\rangle = \\langle T^*v, T^*v\\rangle$. Apply this with $v = e_1$. The first column of $[T]$ gives $\\|Te_1\\|^2 = |a_{11}|^2$. The first row gives $\\|T^*e_1\\|^2 = \\sum_j |a_{1j}|^2$. So $a_{1j} = 0$ for $j > 1$. Now use $e_2$, and so on. The matrix is diagonal. $\\square$

*Proof of the real spectral theorem.* We have already handled the easy direction. Suppose $T^* = T$, and induct on the dimension. The matrix $A$ of $T$ in an orthonormal basis is real symmetric. As a complex matrix, it has an eigenvalue $\\lambda$ with eigenvector $x$, and $\\lambda\\|x\\|^2 = x^*Ax = (Ax)^*x = \\bar{\\lambda}\\|x\\|^2$. So $\\lambda$ is real, and $A - \\lambda I$ is a singular real matrix, which gives a real eigenvector $v$, which we scale to a unit vector. If $u \\perp v$, then $\\langle Tu, v\\rangle = \\langle u, Tv\\rangle = \\lambda\\langle u, v\\rangle = 0$. So $v^\\perp$ is invariant. $T$ restricted to it is self-adjoint, and induction finishes the proof. $\\square$

**Worked example.** Let
$$A = \\begin{bmatrix} 1 & -1 \\\\ 1 & 1 \\end{bmatrix}.$$
Then $AA^T = A^TA = 2I$, so $A$ is normal, and it is not symmetric. Its characteristic polynomial is $t^2 - 2t + 2$, with roots $1 \\pm i$. For $\\lambda = 1 + i$, $v = (1, -i)$ works, since $A(1, -i) = (1 + i, 1 - i) = (1 + i)(1, -i)$. For $\\lambda = 1 - i$, $w = (1, i)$. These are orthogonal in the complex inner product: $\\langle v, w\\rangle = 1 \\cdot 1 + (-i)\\overline{(i)} = 1 + (-i)(-i) = 0$. Dividing each by $\\sqrt{2}$ gives an orthonormal eigenbasis over $\\mathbb{C}$. Over $\\mathbb{R}$, there are no eigenvectors, as the real theorem predicts for a non-symmetric matrix.`,
          resources: [
            main(axler, 'The chapter on operators on inner product spaces.'),
            also(mit18700, 'The notes on normal operators and the spectral theorem.'),
            also(treil, 'The structure of operators in inner product spaces, including Schur form.'),
          ],
          exercises: [
            {
              slug: 'normal-consequences',
              title: 'Consequences of normality',
              prompt:
                'Let $T$ be normal. Prove that $\\ker T = \\ker T^*$, that $Tv = \\lambda v$ implies $T^*v = \\bar{\\lambda}v$, and that eigenvectors for different eigenvalues are orthogonal. Show that $T$ normal on a complex space with $T^k = 0$ for some $k$ implies $T = 0$. Show that a normal operator with all eigenvalues real is self-adjoint.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'real-normal-two-by-two',
              title: 'Real normal matrices of size two',
              prompt:
                'Prove that a real $2 \\times 2$ normal matrix is either symmetric or of the form with rows $(a, -b), (b, a)$ with $b \\neq 0$. Interpret the second kind geometrically as a scaling times a rotation, and find its eigenvalues.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'courant-fischer',
              title: 'The min-max principle',
              prompt:
                'Let $T$ be self-adjoint on an $n$-dimensional space with eigenvalues $\\lambda_1 \\geq \\dots \\geq \\lambda_n$. Prove that $\\lambda_k = \\max_{\\dim U = k} \\min_{v \\in U, \\|v\\| = 1} \\langle Tv, v\\rangle$. Deduce that for self-adjoint $S, T$, each eigenvalue satisfies $|\\lambda_k(S) - \\lambda_k(T)| \\leq \\|S - T\\|$, where the norm is the largest absolute eigenvalue of $S - T$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Any $U$ of dimension $k$ meets the span of the eigenvectors for $\\lambda_k, \\dots, \\lambda_n$, by a dimension count.',
            },
          ],
          selfAssessment: [
            {
              question: 'State both spectral theorems, with the key difference.',
              answerOutline: 'Complex: orthonormal eigenbasis if and only if normal. Real: orthonormal eigenbasis if and only if self-adjoint.',
            },
            {
              question: 'Why does a normal upper triangular matrix have to be diagonal?',
              answerOutline: 'Comparing $\\|Te_1\\|$ and $\\|T^*e_1\\|$ shows the first row is zero off the diagonal, and induction handles the rest.',
            },
            {
              question: 'Is a real orthogonal matrix diagonalisable over $\\mathbb{R}$? Over $\\mathbb{C}$?',
              answerOutline: 'Not always over $\\mathbb{R}$, as rotations show. Always over $\\mathbb{C}$, since it is normal.',
            },
          ],
        },
        {
          slug: 'positive-operators',
          title: 'Positive operators and isometries',
          summary:
            'Develop the operator analogues of non-negative numbers and of the unit circle.',
          estimatedMinutes: 110,
          objectives: [
            'Define positive operators and give equivalent conditions',
            'Prove the existence and uniqueness of a positive square root',
            'Characterise isometries',
            'Show that $T^*T$ is always positive',
          ],
          concepts: [
            'Positive operator',
            'Square root of an operator',
            'Isometry',
            'Unitary operator',
            'Gram matrix',
          ],
          explanation: `Operators behave like numbers in an instructive way: self-adjoint operators resemble real numbers, positive operators resemble non-negative reals, and isometries resemble numbers on the unit circle.

An operator $T$ on a finite-dimensional inner product space is **positive** if it is self-adjoint and $\\langle Tv, v\\rangle \\ge 0$ for all $v$. Self-adjointness is part of the definition, and on real spaces it does real work: the $90^\\circ$ rotation has $\\langle Tv, v\\rangle = 0$ for all $v$ but is not positive.

**Theorem.** The following are equivalent: (a) $T$ is positive; (b) $T$ is self-adjoint with all eigenvalues non-negative; (c) $T$ has a positive square root; (d) $T$ has a self-adjoint square root; (e) $T = R^*R$ for some operator $R$.

*Proof.* (a) ⟹ (b): if $Tv = \\lambda v$ with $\\|v\\| = 1$, then $\\lambda = \\langle Tv, v\\rangle \\ge 0$. (b) ⟹ (c): take an orthonormal eigenbasis with $Te_i = \\lambda_i e_i$, and define $Se_i = \\sqrt{\\lambda_i}e_i$. (c) ⟹ (d) ⟹ (e): take $R$ to be the self-adjoint root. (e) ⟹ (a): $(R^*R)^* = R^*R$, and $\\langle R^*Rv, v\\rangle = \\|Rv\\|^2 \\ge 0$. $\\square$

**Uniqueness.** A positive operator has exactly one positive square root. If $S$ is positive with $S^2 = T$, then $S$ commutes with $T$, so $S$ preserves each eigenspace of $T$. On the $\\lambda$-eigenspace, $S$ is diagonalisable with eigenvalues $\\mu \\ge 0$ satisfying $\\mu^2 = \\lambda$. So $S = \\sqrt{\\lambda}I$ there. Non-positive roots are plentiful: the identity on $\\mathbb{R}^2$ has infinitely many self-adjoint square roots, the reflections among them.

**Worked example.** Let
$$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}.$$
Its eigenvalues are 3 and 1, with unit eigenvectors $(1, 1)/\\sqrt{2}$ and $(1, -1)/\\sqrt{2}$. So
$$\\sqrt{A} = \\frac{\\sqrt{3}}{2}\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} + \\frac12\\begin{bmatrix} 1 & -1 \\\\ -1 & 1 \\end{bmatrix} = \\frac12\\begin{bmatrix} \\sqrt{3} + 1 & \\sqrt{3} - 1 \\\\ \\sqrt{3} - 1 & \\sqrt{3} + 1 \\end{bmatrix}.$$
Squaring recovers $A$: for example, the top-left entry is $\\tfrac14\\big((\\sqrt{3} + 1)^2 + (\\sqrt{3} - 1)^2\\big) = \\tfrac14 \\cdot 8 = 2$.

An operator $S$ is an **isometry** if $\\|Sv\\| = \\|v\\|$ for all $v$. By polarisation, it then preserves inner products. On a finite-dimensional space, the following are equivalent: $S$ is an isometry; $S^*S = I$; $SS^* = I$; $S$ sends some orthonormal basis to an orthonormal basis; $S$ sends every orthonormal basis to one. These are the **orthogonal** matrices over $\\mathbb{R}$ and the **unitary** matrices over $\\mathbb{C}$. Isometries are normal, and their eigenvalues satisfy $|\\lambda| = 1$. Over $\\mathbb{C}$, the spectral theorem says that an isometry is a list of independent rotations of orthogonal complex lines.

A **Gram matrix** $(\\langle v_j, v_i\\rangle)$ of vectors is positive, and it is invertible exactly when the vectors are independent, which reproves the positivity of $A^TA$ from a more general view.`,
          resources: [
            main(axler, 'The sections on positive operators and isometries.'),
            also(treil, 'The material on positive definite operators and on unitary operators.'),
            also(mit18700, 'The notes on unitary and orthogonal operators.'),
          ],
          exercises: [
            {
              slug: 'square-root-uniqueness',
              title: 'Roots and products',
              prompt:
                'Write out the uniqueness proof for positive square roots in full. Then prove that if $A, B$ are positive then $\\operatorname{tr}(AB) \\geq 0$, and show that $AB$ need not be positive. Prove that $AB$ does have only non-negative real eigenvalues.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For both results, compare $AB$ with $\\sqrt{A}B\\sqrt{A}$, using that $XY$ and $YX$ have the same characteristic polynomial.',
            },
            {
              slug: 'isometry-equivalences',
              title: 'Equivalent descriptions of isometries',
              prompt:
                'Prove the equivalence of the conditions for an isometry listed in the lesson on a finite-dimensional space. Show that $S^*S = I$ does not imply $SS^* = I$ in infinite dimension. Prove that every eigenvalue of an isometry has modulus 1, and that a real isometry of odd dimension has eigenvalue $1$ or $-1$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gram-matrix',
              title: 'Gram matrices',
              prompt:
                'Let $v_1, \\dots, v_n$ be vectors in an inner product space, with Gram matrix $G$ given by $G_{ij} = \\langle v_j, v_i\\rangle$. Prove that $G$ is positive, and that it is invertible if and only if the $v_i$ are independent. Prove that $\\det G$ equals the squared volume of the parallelepiped they span in the case of $\\mathbb{R}^n$, and compute $G$ and $\\det G$ for $1, t, t^2$ in $L^2[0, 1]$. You should get the $3 \\times 3$ Hilbert matrix, with determinant $1/2160$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must positive operators be defined as self-adjoint?',
              answerOutline: 'Over $\\mathbb{R}$, a rotation by $90^\\circ$ has $\\langle Tv, v\\rangle = 0 \\geq 0$ for all $v$, and it is not self-adjoint, so the inequality alone is too weak.',
            },
            {
              question: 'How many positive square roots does a positive operator have? How many self-adjoint ones?',
              answerOutline: 'Exactly one positive root. There can be many self-adjoint ones, by changing signs on eigenspaces.',
            },
            {
              question: 'What are the eigenvalues of an isometry?',
              answerOutline: 'Complex numbers of modulus 1, because $\\|Sv\\| = \\|v\\|$ gives $|\\lambda| = 1$.',
            },
          ],
        },
      ],
      project: {
        slug: 'orthogonal-polynomials-and-quadrature',
        title: 'Gaussian quadrature from the spectral theorem',
        description: `Multiplication by $t$ is a self-adjoint operator on polynomials with the inner product $\\int_{-1}^{1} fg$, and that one fact produces orthogonal polynomials, their three-term recurrence and Gaussian quadrature. In this project you prove that chain of results and implement it. Truncating the operator gives a symmetric tridiagonal matrix, whose eigenvalues are the quadrature nodes and whose eigenvectors give the weights. For two nodes, you should get $\\pm 1/\\sqrt{3}$. You will then test the rule against the theory, and explain why $n$ nodes integrate polynomials of degree up to $2n - 1$ exactly.`,
        deliverables: [
          'A written proof that the orthonormal polynomials satisfy a three-term recurrence, using self-adjointness of multiplication by $t$',
          'A written proof that the zeros of the degree-$n$ orthonormal polynomial are real, simple and lie in $(-1, 1)$, and are the eigenvalues of the truncated Jacobi matrix',
          'A written proof that the $n$-point rule built on those zeros is exact up to degree $2n - 1$',
          'A Python implementation that builds the Jacobi matrix, computes nodes and weights with `eigh`, and matches `numpy.polynomial.legendre.leggauss` to $10^{-12}$ for $n$ up to 50',
          'A plot of the error for $\\int_{-1}^{1} e^t\\,dt$ and for $\\int_{-1}^{1} |t|\\,dt$ against $n$, with an explanation of the difference',
        ],
        estimatedHours: 9,
        stretchGoals: ['Repeat with the weight $e^{-t^2}$ on the whole line, which gives Hermite polynomials', 'Prove that the weights are all positive and explain why this matters numerically'],
      },
    },
    {
      slug: 'further-structure',
      title: 'Further Structure',
      description:
        'Finish with the singular value decomposition, bilinear forms over general fields, and applications to codes and recurrences.',
      lessons: [
        {
          slug: 'singular-values',
          title: 'Singular values and polar decomposition',
          summary:
            'Prove the SVD and the polar decomposition from the spectral theorem, and use them to analyse operator norms.',
          estimatedMinutes: 120,
          objectives: [
            'Define singular values through $\\sqrt{T^*T}$',
            'Prove the singular value decomposition',
            'Prove the polar decomposition',
            'Relate singular values to the operator norm and the determinant',
          ],
          concepts: [
            'Singular values',
            'SVD of a map',
            'Polar decomposition',
            'Operator norm',
            'Eckart-Young theorem',
          ],
          explanation: `Let $T : V \\to W$ be a linear map between finite-dimensional inner product spaces. Then $T^*T$ is positive on $V$. The **singular values** of $T$ are the eigenvalues of $\\sqrt{T^*T}$, that is, the square roots of the eigenvalues of $T^*T$, in decreasing order.

**Singular value decomposition.** There are orthonormal lists $v_1, \\dots, v_r$ in $V$ and $u_1, \\dots, u_r$ in $W$, and positive $\\sigma_1 \\ge \\dots \\ge \\sigma_r$, with
$$Tv = \\sum_{i=1}^r \\sigma_i \\langle v, v_i\\rangle u_i.$$
*Proof.* Take an orthonormal eigenbasis $v_1, \\dots, v_n$ of $T^*T$, with eigenvalues $\\sigma_i^2$, ordered so that the first $r$ are positive. Set $u_i = Tv_i/\\sigma_i$ for $i \\leq r$. Then
$$\\langle u_i, u_j\\rangle = \\frac{\\langle T^*Tv_i, v_j\\rangle}{\\sigma_i\\sigma_j} = \\frac{\\sigma_i}{\\sigma_j}\\langle v_i, v_j\\rangle,$$
which is 1 if $i = j$ and 0 otherwise. For $i > r$, $\\|Tv_i\\|^2 = \\langle T^*Tv_i, v_i\\rangle = 0$, so $Tv_i = 0$. Expanding $v = \\sum_i \\langle v, v_i\\rangle v_i$ and applying $T$ gives the formula. $\\square$

**Polar decomposition.** Every operator $T$ on a finite-dimensional inner product space can be written as $T = S\\sqrt{T^*T}$ with $S$ an isometry. To see this, extend $u_1, \\dots, u_r$ to an orthonormal basis of $V$, using a basis of $(\\operatorname{im} T)^{\\perp}$, and let $S$ send each $v_i$ to the corresponding $u_i$. This is the operator version of $z = e^{i\\theta}|z|$. If $T$ is invertible, $S$ is unique, and $S = T(T^*T)^{-1/2}$. If $T$ is not invertible, $S$ is not unique.

**Worked example.** Let
$$A = \\begin{bmatrix} 0 & 2 \\\\ 1 & 0 \\end{bmatrix}.$$
Then $A^TA = \\mathrm{diag}(1, 4)$, so $\\sqrt{A^TA} = \\mathrm{diag}(1, 2)$, and the singular values are 2 and 1. The isometry is
$$S = A\\,\\mathrm{diag}(1, \\tfrac12) = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix},$$
a reflection, and indeed $S\\,\\mathrm{diag}(1, 2) = A$. The eigenvalues of $A$ are $\\pm\\sqrt{2}$, not $\\pm 2$ or $\\pm 1$, so singular values are not absolute values of eigenvalues. Their product does agree: $\\sigma_1\\sigma_2 = 2 = |\\det A|$. That is a general fact, which follows from $|\\det T|^2 = \\det(T^*T)$.

The **operator norm** $\\|T\\| = \\max_{\\|v\\| = 1}\\|Tv\\|$ equals $\\sigma_1$. Likewise $\\sum_i \\sigma_i^2 = \\operatorname{tr}(T^*T)$, the squared Frobenius norm, for any matrix of $T$ in orthonormal bases. If $T$ is normal, then the singular values are the absolute values of the eigenvalues, by the spectral theorem.

The SVD also gives the best low-rank approximation, as you saw on the computational side. An exercise proves this with a short dimension argument.`,
          resources: [
            main(axler, 'The sections on the polar decomposition and singular values.'),
            also(treil, 'The material on singular values and polar decomposition.'),
            also(mit18700, 'The notes on the singular value decomposition.'),
          ],
          exercises: [
            {
              slug: 'norm-and-trace-identities',
              title: 'Norm and trace identities',
              prompt:
                'Prove that $\\|T\\| = \\sigma_1$, that $\\sum_i \\sigma_i^2 = \\operatorname{tr}(T^*T)$, and that $\\prod_i \\sigma_i = |\\det T|$ for an operator. Prove that if $T$ is normal, its singular values are the absolute values of its eigenvalues. Give a non-normal $2 \\times 2$ matrix for which all these eigenvalue relationships fail except the product.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'polar-uniqueness',
              title: 'Polar decomposition in detail',
              prompt:
                'Prove the polar decomposition, and that $S$ is unique when $T$ is invertible. Show by example that it need not be unique when $T$ is singular. Prove that if $T = SP$ is the polar decomposition with $T$ invertible, then $T$ is normal if and only if $SP = PS$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'eckart-young-spectral',
              title: 'Eckart-Young in the operator norm',
              prompt:
                'Let $T$ have SVD as in the lesson, let $T_k$ be the truncation to the first $k$ terms, with $k < r$, and let $B$ have rank at most $k$. Prove that $\\|T - T_k\\| = \\sigma_{k+1}$ and that $\\|T - B\\| \\geq \\sigma_{k+1}$.',
              kind: 'derivation',
              difficulty: 3,
              hint: '$\\ker B$ has dimension at least $n - k$, so it meets the span of $v_1, \\dots, v_{k+1}$ in a non-zero vector. Estimate $\\|Tv\\|$ on that vector.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the singular values of $T$, in terms of $T^*T$?',
              answerOutline: 'The square roots of the eigenvalues of the positive operator $T^*T$.',
            },
            {
              question: 'State the polar decomposition and its scalar analogue.',
              answerOutline: '$T = S\\sqrt{T^*T}$ with $S$ an isometry, like $z = e^{i\\theta}|z|$.',
            },
            {
              question: 'Do $|\\det T|$ and $\\operatorname{tr}T$ relate to singular values in the same way?',
              answerOutline: 'No. $|\\det T|$ is the product of the singular values, but $\\operatorname{tr}T$ is the sum of the eigenvalues, and in general it is not the sum of the singular values.',
            },
          ],
        },
        {
          slug: 'bilinear-forms',
          title: 'Bilinear forms',
          summary:
            'Classify symmetric and alternating forms, prove Sylvester\'s law of inertia, and see how the classification depends on the field.',
          estimatedMinutes: 130,
          objectives: [
            'Represent a bilinear form by a matrix and describe a change of basis as congruence',
            'Diagonalise a symmetric form when $\\operatorname{char} F \\neq 2$',
            'State and prove Sylvester\'s law of inertia',
            'Describe the canonical form of an alternating form',
          ],
          concepts: [
            'Bilinear form',
            'Congruence',
            'Quadratic form and polarisation',
            'Sylvester\'s law of inertia',
            'Signature',
            'Alternating form and symplectic basis',
          ],
          explanation: `A **bilinear form** on $V$ is a map $b : V \\times V \\to F$ linear in each slot. In a basis with matrix $B = (b(v_i, v_j))$, we have $b(x, y) = x^TBy$ in coordinates. Under a change of basis $P$, the matrix becomes $P^TBP$. This is **congruence**, not similarity, so eigenvalues of $B$ mean nothing here. Rank and symmetry are preserved, and the determinant changes by a square. The **radical** $\\{v : b(v, w) = 0 \\text{ for all } w\\}$ is the kernel of $B$, and $b$ is **non-degenerate** if the radical is 0.

**Polarisation.** If $\\operatorname{char} F \\neq 2$, a symmetric form is determined by its quadratic form $q(v) = b(v, v)$:
$$b(u, v) = \\tfrac12\\big(q(u + v) - q(u) - q(v)\\big).$$

**Theorem.** If $\\operatorname{char} F \\neq 2$, every symmetric form has an orthogonal basis, meaning that its matrix is diagonal.

*Proof.* If $b = 0$, any basis works. Otherwise, polarisation gives a $v$ with $q(v) \\neq 0$. Then $V = \\operatorname{span}(v) \\oplus v^{\\perp}$, since any $w$ equals $\\frac{b(w, v)}{q(v)}v$ plus an element of $v^\\perp$. Now induct on $v^\\perp$. $\\square$

The characteristic hypothesis is essential. Over $\\mathbb{F}_2$, the form with matrix rows $(0, 1), (1, 0)$ is non-zero and symmetric, but $b(v, v) = 2xy = 0$ for all $v$. So no orthogonal basis exists.

The classification then depends on which diagonal entries are equivalent. Rescaling a basis vector by $c$ multiplies an entry by $c^2$. Over $\\mathbb{C}$, every non-zero number is a square, so rank is the only invariant. Over $\\mathbb{R}$, each entry can be made $0$ or $\\pm 1$.

**Sylvester's law of inertia.** Over $\\mathbb{R}$, the numbers $p$ of $+1$ entries and $q$ of $-1$ entries do not depend on the diagonalising basis.

*Proof.* Suppose two bases give $(p, q)$ and $(p', q')$, with $p > p'$. Let $U$ be the span of the $p$ basis vectors from the first basis on which the form is positive. Let $W$ be the span of those vectors of the second basis with entries $-1$ or 0. Then $\\dim U + \\dim W = p + (n - p') > n$, so a non-zero $v$ lies in both. But $b(v, v) > 0$ from $U$ and $b(v, v) \\le 0$ from $W$, a contradiction. So $p = p'$, and rank gives $q = q'$. $\\square$

**Worked example.** Let $q(x, y) = x^2 + 4xy + y^2$, with matrix rows $(1, 2), (2, 1)$. Completing the square gives $(x + 2y)^2 - 3y^2$. So in the variables $u = x + 2y$ and $v = y$, the form is $\\mathrm{diag}(1, -3)$. Over $\\mathbb{R}$, scaling gives signature $(1, 1)$. As a check, the matrix has eigenvalues $3$ and $-1$, one of each sign.
An **alternating** form has $b(v, v) = 0$ for all $v$. Over any field, it has a basis in which its matrix is a sum of blocks with rows $(0, 1), (-1, 0)$, plus zeros, so its rank is even.`,
          resources: [
            main(conradBilinear, 'A thorough account over general fields, including characteristic 2 issues.'),
            also(mit18701, 'The lectures on bilinear forms.'),
            also(hefferon, 'Use for review of matrix congruence and change of basis.'),
          ],
          exercises: [
            {
              slug: 'signature-computation',
              title: 'Signatures',
              prompt:
                'Diagonalise the symmetric form with matrix rows $(0, 1, 1), (1, 0, 1), (1, 1, 0)$ over $\\mathbb{Q}$ by a sequence of congruences, and find its signature over $\\mathbb{R}$. It should be $(1, 2)$. Check using the signs of the eigenvalues, and explain why that check is valid even though congruence does not preserve eigenvalues.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Since the diagonal is zero, first replace $e_1$ by $e_1 + e_2$. The check is valid because of the spectral theorem and Sylvester\'s law.',
            },
            {
              slug: 'symplectic-basis',
              title: 'Alternating forms have even rank',
              prompt:
                'Let $b$ be an alternating form on a finite-dimensional space over any field. Prove that there is a basis in which the matrix of $b$ is a direct sum of blocks with rows $(0, 1), (-1, 0)$ and a zero block. Deduce that its rank is even, and that a non-degenerate alternating form exists only in even dimension. Why is this valid in characteristic 2 too?',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Choose $u, v$ with $b(u, v) = 1$. Show that $V = \\operatorname{span}(u, v) \\oplus \\{w : b(w, u) = b(w, v) = 0\\}$, and induct.',
            },
            {
              slug: 'field-dependence-of-forms',
              title: 'How the classification depends on the field',
              prompt:
                'Show that the forms $x^2$ and $2x^2$ on a 1-dimensional space are equivalent over $\\mathbb{R}$ and over $\\mathbb{C}$ but not over $\\mathbb{Q}$. Over $\\mathbb{F}_p$ with $p$ odd, prove that exactly half of the non-zero elements are squares, and deduce that non-degenerate symmetric forms of a fixed dimension have exactly two classes, separated by the determinant modulo squares. Over $\\mathbb{F}_5$, decide whether $\\mathrm{diag}(1, 2)$ and $\\mathrm{diag}(1, 3)$ are congruent, and find an explicit $P$ if they are.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For two dimensions, first show that $ax^2 + by^2$ with $a, b \\neq 0$ takes every non-zero value, by counting the sizes of the sets of values of $ax^2$ and of $c - by^2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How does the matrix of a bilinear form change with the basis, and how does this differ from an operator?',
              answerOutline: 'As $P^TBP$ (congruence), not $P^{-1}BP$ (similarity). So eigenvalues are not invariant.',
            },
            {
              question: 'Why can a symmetric form over $\\mathbb{F}_2$ fail to have an orthogonal basis?',
              answerOutline: 'Polarisation divides by 2. The form with rows $(0,1),(1,0)$ is non-zero, but has $b(v,v) = 0$ for all $v$.',
            },
            {
              question: 'What is the complete invariant of a real symmetric form?',
              answerOutline: 'The pair $(p, q)$, equivalently rank and signature, by Sylvester\'s law.',
            },
          ],
        },
        {
          slug: 'applications-codes-and-recurrences',
          title: 'Applications to codes and recurrences',
          summary:
            'Use duality over $\\mathbb{F}_2$ to build an error-correcting code, and Jordan form to solve recurrences with repeated roots.',
          estimatedMinutes: 120,
          objectives: [
            'Define a linear code and its parity-check matrix',
            'Use rank-nullity and duality to find a code\'s dimension and its dual',
            'Decode a single error using the syndrome',
            'Solve a linear recurrence with a repeated characteristic root',
          ],
          concepts: [
            'Linear code',
            'Parity-check matrix',
            'Minimum distance',
            'Syndrome decoding',
            'Dual code',
            'Linear recurrence',
          ],
          explanation: `Two applications show why abstraction pays.

**Linear codes.** A **linear code** of length $n$ is a subspace $C \\le \\mathbb{F}_2^n$. Its elements are the valid messages. The **weight** of a vector is its number of 1s. Since $C$ is a subspace, the smallest distance between codewords equals the smallest weight of a non-zero codeword. If that distance is $d$, the code corrects up to $\\lfloor (d - 1)/2 \\rfloor$ errors.

Describe $C$ as the kernel of a **parity-check matrix** $H$.

**Worked example: the Hamming code.** Let $H$ be the $3 \\times 7$ matrix over $\\mathbb{F}_2$ whose $j$th column is $j$ written in binary, with the least significant bit on top. The columns include the three standard basis vectors, so $\\operatorname{rank} H = 3$, and rank-nullity gives $\\dim C = 7 - 3 = 4$. So $C$ has 16 codewords. A word of weight 1 has $Hx$ equal to one column, which is non-zero. A word of weight 2 has $Hx$ equal to the sum of two different columns, which is also non-zero. Column 1 + column 2 = column 3, so there is a word of weight 3. So $d = 3$, and $C$ corrects one error.

If $r = c + e_j$ is a codeword with an error in position $j$, then the **syndrome** is $Hr = Hc + He_j = He_j$, which is column $j$, the binary form of $j$. Suppose you receive $r = (1, 0, 1, 1, 0, 1, 1)$. Then $Hr = (1, 1, 1)^T$, which is $1 + 2 + 4 = 7$. So the error is in position 7, and the codeword sent was $(1, 0, 1, 1, 0, 1, 0)$. The balls of radius 1 around codewords have $1 + 7 = 8$ elements, and $16 \\times 8 = 2^7$, so they fill the whole space exactly. Such a code is called **perfect**.

Duality gives more. The dot product on $\\mathbb{F}_2^n$ is not an inner product, since $(1, 1) \\cdot (1, 1) = 0$. A non-zero vector can be perpendicular to itself. But it is a non-degenerate form, so $\\dim C^\\perp = n - \\dim C$, by the same annihilator argument. The dual of the Hamming code is the row space of $H$, with 8 elements, and all 7 of its non-zero words have weight exactly 4.

**Recurrences.** The sequence defined by $a_{n+2} = 4a_{n+1} - 4a_n$, with $a_0 = 1$ and $a_1 = 4$, has state matrix $A$ with rows $(4, -4), (1, 0)$. Here $\\chi_A = (t - 2)^2$, and $A \\neq 2I$, so $A$ is similar to $J_2(2)$, not to a diagonal matrix. Since
$$J_2(2)^n = \\begin{bmatrix} 2^n & n2^{n-1} \\\\ 0 & 2^n \\end{bmatrix},$$
solutions have the form $(\\alpha + \\beta n)2^n$. The initial values give $\\alpha = \\beta = 1$, so $a_n = (n + 1)2^n$. The factor $n$ arises directly from the Jordan block. That is the source of the rule from differential equations that a repeated root gives $te^{\\lambda t}$.`,
          resources: [
            main(mit18701, 'The linear algebra and finite field material, for background.'),
            also(hefferon, 'The topics at the ends of chapters include applications of this kind.'),
            also(treil, 'Review the sections on the structure of operators for the Jordan form used here.'),
          ],
          exercises: [
            {
              slug: 'hamming-general',
              title: 'General Hamming codes',
              prompt:
                'For $r \\geq 2$, let $H_r$ be the $r \\times (2^r - 1)$ matrix over $\\mathbb{F}_2$ whose columns are all non-zero vectors. Prove that its kernel is a code of dimension $2^r - 1 - r$ with minimum distance exactly 3, and that it is perfect. Prove that all non-zero words of the dual code have weight $2^{r-1}$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the dual, a non-zero functional on $\\mathbb{F}_2^r$ takes the value 1 on exactly half the vectors.',
            },
            {
              slug: 'self-orthogonal-vectors',
              title: 'Duality without positivity',
              prompt:
                'Let $C \\leq \\mathbb{F}_2^n$. Prove that $\\dim C^\\perp = n - \\dim C$ and that $(C^\\perp)^\\perp = C$. Show by example that $C \\cap C^\\perp$ can be non-zero, unlike the real case. Find which vectors of $\\mathbb{F}_2^n$ satisfy $v \\cdot v = 0$, and verify by program that the dual of the $[7, 4]$ Hamming code is contained in the code itself.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'recurrence-by-jordan',
              title: 'Recurrences with repeated roots',
              prompt:
                'Prove that if a linear recurrence of order $k$ has characteristic polynomial $\\prod_i (t - \\lambda_i)^{m_i}$ over $\\mathbb{C}$, then its solutions are exactly the sums $\\sum_i p_i(n)\\lambda_i^n$, with $\\deg p_i < m_i$, assuming every $\\lambda_i \\neq 0$. Use this to solve $a_{n+3} = 3a_{n+2} - 3a_{n+1} + a_n$ with $a_0 = 0$, $a_1 = 1$, $a_2 = 4$, and verify it numerically for 20 terms.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The companion matrix has one Jordan block for each distinct root, since each of its eigenspaces has dimension 1.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the minimum distance of a linear code equal to the minimum non-zero weight?',
              answerOutline: 'The distance between $x, y \\in C$ is the weight of $x - y$, which is itself in $C$.',
            },
            {
              question: 'Why is the dot product on $\\mathbb{F}_2^n$ not an inner product, and what survives?',
              answerOutline: 'Vectors can be self-orthogonal, so there is no positivity, and $C \\oplus C^\\perp$ can fail. Non-degeneracy survives, so the dimension formula holds.',
            },
            {
              question: 'Where does the factor $n$ in $(\\alpha + \\beta n)2^n$ come from?',
              answerOutline: 'From the superdiagonal entry of the power of a Jordan block, $n\\lambda^{n-1}$.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'classify-matrices-over-finite-fields',
    title: 'Classifying matrices over a finite field',
    description: `Jordan form needs a characteristic polynomial that splits, and over a finite field it usually does not. In this capstone you answer the full question: when are two matrices over $\\mathbb{F}_q$ similar? Write a short mathematical paper that states and proves a classification by invariant factors (the rational canonical form), building on primary decomposition from this course, and find a suitable published proof of the module structure theorem to cite or adapt in your own words. Back the paper with exact computation. Your program enumerates small matrix algebras, sorts matrices into similarity classes by brute force, and checks each class against your invariants. The number of classes should come out as 6, 12 and 14 for $M_2(\\mathbb{F}_2)$, $M_2(\\mathbb{F}_3)$ and $M_3(\\mathbb{F}_2)$.`,
    deliverables: [
      'A typeset paper of 8 to 12 pages stating the classification theorem, with complete proofs of each step you claim as your own and clear citations for anything you use without proof',
      'A worked section computing the invariant factors of at least three matrices over $\\mathbb{F}_2$ or $\\mathbb{F}_3$, one of which does not split',
      'A program that enumerates $M_2(\\mathbb{F}_2)$, $M_2(\\mathbb{F}_3)$ and $M_3(\\mathbb{F}_2)$, computes similarity classes directly from the group action, and confirms the invariants separate them',
      'A derivation of the number of similarity classes of $M_2(\\mathbb{F}_q)$ as $q^2 + q$, checked against the program',
      'A one-page discussion of what Jordan form, the rational canonical form and the spectral theorem each classify, and under which hypotheses',
    ],
    estimatedHours: 18,
    stretchGoals: [
      'Prove a formula for the number of similarity classes of $M_3(\\mathbb{F}_q)$ and check it for $q = 2, 3$',
      'Count the similarity classes of $GL_2(\\mathbb{F}_q)$, the invertible case',
    ],
  },
  masteryChecklist: [
    'I can state, with exact hypotheses, whether a linear algebra result needs an algebraically closed field, characteristic other than 2, or finite dimension',
    'I can prove rank-nullity, the dimension formula and the first isomorphism theorem from the definitions',
    'I can work with dual spaces, annihilators and quotients without choosing coordinates',
    'I can define the determinant from alternating forms and derive its main properties',
    'I can compute a minimal polynomial and use it to decide whether an operator is diagonalisable',
    'I can find the Jordan form of an operator from the ranks of powers, and explain when it exists',
    'I can prove the real and complex spectral theorems and use positive square roots and the singular value decomposition',
    'I can diagonalise a symmetric bilinear form when the characteristic allows and compute a signature',
  ],
});
