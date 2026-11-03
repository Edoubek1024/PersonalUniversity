import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const stein = (note: string): ResourceInput => ({
  title: 'Elementary Number Theory: Primes, Congruences, and Secrets (Stein)',
  url: 'https://wstein.org/ent/',
  type: 'textbook',
  cost: 'free',
  provider: 'William Stein',
  note,
  primary: true,
});

const raji = (note: string): ResourceInput => ({
  title: 'Elementary Number Theory (Raji)',
  url: 'https://math.libretexts.org/Bookshelves/Combinatorics_and_Discrete_Mathematics/Elementary_Number_Theory_(Raji)',
  type: 'textbook',
  cost: 'free',
  provider: 'LibreTexts',
  note,
});

const shoup = (note: string): ResourceInput => ({
  title: 'A Computational Introduction to Number Theory and Algebra (Shoup)',
  url: 'https://shoup.net/ntb/',
  type: 'textbook',
  cost: 'free',
  provider: 'Victor Shoup',
  note,
});

const ocw781 = (note: string): ResourceInput => ({
  title: 'MIT 18.781 Theory of Numbers',
  url: 'https://ocw.mit.edu/courses/18-781-theory-of-numbers-spring-2012/',
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

const sympyNt = (note: string): ResourceInput => ({
  title: 'SymPy documentation: Number theory',
  url: 'https://docs.sympy.org/latest/modules/ntheory.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SymPy',
  note,
});

export default defineSubject({
  id: 'number-theory',
  title: 'Number Theory',
  category: 'math',
  tagline:
    'The integers up close: primes, congruences, Euler and Fermat, primitive roots, quadratic reciprocity and the equations they solve.',
  description: `Number theory asks simple questions about whole numbers and answers them with surprisingly deep tools. Which numbers are sums of two squares? When does a quadratic have a solution modulo a prime? Why can you publish a key that lets anyone encrypt a message to you, without giving away how to decrypt it? The tools built here to answer these questions run through modern cryptography, coding theory and much of algebra.

This course follows the topics in the public catalog description of University of Illinois MATH 453, Number Theory. It is an original course and is not affiliated with the University of Illinois, and nothing here is taken from that course's materials. The six modules cover divisibility and primes, congruences and the Chinese remainder theorem, the theorems of Fermat and Euler with RSA, primitive roots and discrete logarithms, quadratic reciprocity with a full proof, and further topics: arithmetic functions, sums of squares, continued fractions and Diophantine equations.

It assumes the proof course \`higher-mathematics\`, and it goes well beyond the number theory module of \`discrete-mathematics\`. Most exercises are proofs. The rest are computations small enough to do by hand, or experiments in Python, because number theory is an experimental subject: you find the pattern first and prove it afterwards. Module projects build a small library, and the capstone uses it to factor integers and solve Pell's equation.

Group theory is not required, but if you have seen it, you will recognise the unit group modulo $n$ in many of the arguments.`,
  difficulty: 'intermediate',
  estimatedHours: 60,
  prerequisites: ['higher-mathematics'],
  recommendedBackground: [
    'Proof by induction and contradiction',
    'Basic properties of divisibility and modular arithmetic',
    'A little Python, for the projects and experiments',
  ],
  tags: ['primes', 'congruences', 'cryptography', 'quadratic reciprocity', 'continued fractions', 'Diophantine equations', 'proofs'],
  core: false,
  modules: [
    {
      slug: 'divisibility',
      title: 'Divisibility',
      description:
        'The division algorithm, greatest common divisors, primes and unique factorisation, and what is known about how primes are distributed.',
      lessons: [
        {
          slug: 'gcd-and-the-euclidean-algorithm',
          title: 'Greatest common divisors and the Euclidean algorithm',
          summary:
            'The division algorithm, Bezout\'s identity, and solving linear Diophantine equations in two variables.',
          estimatedMinutes: 140,
          objectives: [
            'Prove the division algorithm from the well-ordering principle',
            'Run the Euclidean algorithm and back-substitute to get Bezout coefficients',
            'Prove Bezout\'s identity',
            'Find all integer solutions of $ax+by=c$',
          ],
          concepts: [
            'Division algorithm',
            'Greatest common divisor',
            'Euclidean algorithm',
            'Bezout\'s identity',
            'Coprime integers',
            'Linear Diophantine equation',
          ],
          explanation: `For integers $a$ and $b>0$ there are unique $q,r$ with $a=qb+r$ and $0\\le r<b$. This **division algorithm** is the engine of elementary number theory. To prove existence, take the least non-negative element of $\\{a-qb:q\\in\\mathbb{Z}\\}$, which exists by well-ordering.

The **greatest common divisor** $\\gcd(a,b)$ is the largest integer dividing both. Since any common divisor of $a$ and $b$ divides $a-qb$, we have $\\gcd(a,b)=\\gcd(b,r)$. Repeating this until the remainder is $0$ is the **Euclidean algorithm**. The last nonzero remainder is the gcd. Two steps at least halve the larger number, so the number of steps grows only like $\\log$ of the input.

**Bezout's identity.** There are integers $x,y$ with $ax+by=\\gcd(a,b)$. Here is a proof. Let $d$ be the least positive element of $S=\\{ax+by\\}$. Dividing $a$ by $d$ leaves a remainder in $S$ smaller than $d$, so it is $0$. So $d\\mid a$, and likewise $d\\mid b$. Any common divisor of $a$ and $b$ divides every element of $S$, including $d$. So $d$ is the gcd. It also follows that $ax+by$ takes exactly the multiples of $\\gcd(a,b)$.

**Worked example.** Compute $\\gcd(1071,462)$:
$$1071=2\\cdot 462+147,\\quad 462=3\\cdot 147+21,\\quad 147=7\\cdot 21+0.$$
So the gcd is $21$. Now run it backwards:
$$21=462-3\\cdot 147=462-3(1071-2\\cdot 462)=7\\cdot 462-3\\cdot 1071.$$
Check: $3234-3213=21$.

Use this to solve $1071x+462y=105$. A solution exists because $21\\mid 105$, and multiplying by $5$ gives $x_0=-15$, $y_0=35$. In general, if $g=\\gcd(a,b)$ and $g\\mid c$, then all solutions of $ax+by=c$ are
$$x=x_0+\\frac{b}{g}t,\\qquad y=y_0-\\frac{a}{g}t,\\qquad t\\in\\mathbb{Z}.$$
Here that gives $x=-15+22t$ and $y=35-51t$. To see that these are all the solutions, subtract two solutions and divide by $g$. You get $\\frac{a}{g}(x-x_0)=-\\frac{b}{g}(y-y_0)$, and since $a/g$ and $b/g$ are coprime, $b/g$ divides $x-x_0$. That last step uses the fact, from Bezout, that if $m\\mid kn$ and $\\gcd(m,n)=1$ then $m\\mid k$.

If $g\\nmid c$ there is no solution at all, since $g$ divides the left side for every choice of $x,y$.`,
          resources: [
            stein('Read the opening chapter on prime numbers, which starts from divisibility and the gcd.'),
            conrad('ugradnumthy/divgcd.pdf', 'Divisibility and greatest common divisor', 'A careful account of Bezout and its consequences.'),
            shoup('The opening chapters give the algorithmic view, with running times.'),
          ],
          exercises: [
            {
              slug: 'euclid-by-hand',
              title: 'Euclid by hand',
              prompt: `Use the Euclidean algorithm to find $\\gcd(2024,1547)$, and find integers $x,y$ with $2024x+1547y=\\gcd(2024,1547)$. Then find all solutions of $2024x+1547y=1000000$ in positive integers $x,y$, or show that there are none.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gcd-properties',
              title: 'Basic properties of the gcd',
              prompt: `Prove that $\\gcd(ka,kb)=k\\gcd(a,b)$ for $k>0$. Prove that if $\\gcd(a,b)=1$ and $a\\mid bc$ then $a\\mid c$. Prove that $\\gcd(a,bc)=1$ if and only if $\\gcd(a,b)=\\gcd(a,c)=1$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'worst-case-euclid',
              title: 'The worst case of Euclid',
              prompt: `Let $F_n$ be the Fibonacci numbers with $F_1=F_2=1$. Show that Euclid's algorithm on $(F_{n+1},F_n)$ takes $n-1$ division steps for $n\\ge 2$, with every quotient $1$ except the last. Prove that if the algorithm takes $k$ steps on $a>b>0$, then $b\\ge F_{k+1}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'coin-problem',
              title: 'The two-coin problem',
              prompt: `Let $a,b>0$ be coprime. Prove that every integer greater than $ab-a-b$ can be written as $ax+by$ with $x,y\\ge 0$, and that $ab-a-b$ cannot. What is the largest amount that cannot be paid with coins of $7$ and $11$?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Choose the solution with 0 <= x < b, and ask when the matching y is non-negative.',
            },
            {
              slug: 'gcd-of-fibonacci',
              title: 'The gcd of Fibonacci numbers',
              prompt: `Prove that the gcd of two Fibonacci numbers is again a Fibonacci number: $\\gcd(F_m,F_n)=F_{\\gcd(m,n)}$. You may first want the identity $F_{m+n}=F_{m+1}F_n+F_mF_{n-1}$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use the identity to show that gcd(F_(m+n), F_n) = gcd(F_m, F_n), and then imitate the Euclidean algorithm on the indices.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Euclid\'s algorithm terminate, and what does it return?',
              answerOutline: `The remainders strictly decrease and are non-negative. Each step preserves the gcd, so the last nonzero remainder is $\\gcd(a,b)$.`,
            },
            {
              question: 'When does $ax+by=c$ have an integer solution?',
              answerOutline: `Exactly when $\\gcd(a,b)\\mid c$.`,
            },
            {
              question: 'Does $\\gcd(a,b)=1$ imply $\\gcd(a+b,a-b)=1$?',
              answerOutline: `No. It is $1$ or $2$: $\\gcd(a+b,a-b)$ divides $2a$ and $2b$. For $a=3,b=1$ it is $2$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/divisibility-and-the-euclidean-algorithm'],
        },
        {
          slug: 'primes-and-unique-factorisation',
          title: 'Primes and unique factorisation',
          summary:
            'Euclid\'s lemma, the fundamental theorem of arithmetic, and why it is a theorem rather than something obvious.',
          estimatedMinutes: 140,
          objectives: [
            'Prove Euclid\'s lemma from Bezout',
            'Prove the fundamental theorem of arithmetic',
            'Read divisibility, gcd and lcm from prime exponents',
            'Prove that there are infinitely many primes, in several forms',
          ],
          concepts: [
            'Prime and composite',
            'Euclid\'s lemma',
            'Fundamental theorem of arithmetic',
            'Prime exponent $v_p(n)$',
            'gcd and lcm by exponents',
            'Sieve of Eratosthenes',
            'Legendre\'s formula',
          ],
          explanation: `An integer $p>1$ is **prime** if its only positive divisors are $1$ and $p$. **Euclid's lemma** says that if $p$ is prime and $p\\mid ab$, then $p\\mid a$ or $p\\mid b$. Proof: if $p\\nmid a$ then $\\gcd(p,a)=1$, so $px+ay=1$, and multiplying by $b$ gives $b=pbx+aby$, which is divisible by $p$.

**Fundamental theorem of arithmetic.** Every integer $n>1$ is a product of primes, uniquely up to order. Existence is strong induction: either $n$ is prime, or $n=ab$ with smaller factors. For uniqueness, suppose $p_1\\cdots p_r=q_1\\cdots q_s$. By Euclid's lemma $p_1$ divides some $q_j$, so it equals it. Cancel and repeat.

Uniqueness really does need proof, because it can fail in other number systems. Take the set $H=\\{1,5,9,13,\\dots\\}$ of numbers congruent to $1$ modulo $4$, closed under multiplication. Call an element of $H$ irreducible if it is not a product of two smaller elements of $H$ other than $1$. Then $9$, $21$ and $49$ are all irreducible in $H$, and
$$441=9\\cdot 49=21\\cdot 21.$$
What fails is Euclid's lemma: $21\\mid 9\\cdot 49$, but $21$ divides neither factor in $H$.

Write $v_p(n)$ for the exponent of $p$ in $n$. Then $a\\mid b$ exactly when $v_p(a)\\le v_p(b)$ for all $p$. Also $\\gcd$ takes minimum exponents and $\\operatorname{lcm}$ maximum exponents, which gives $\\gcd(a,b)\\operatorname{lcm}(a,b)=ab$.

**Worked example.** We have $360=2^3\\cdot 3^2\\cdot 5$ and $84=2^2\\cdot 3\\cdot 7$. Then
$$\\gcd(360,84)=2^2\\cdot 3=12,\\qquad\\operatorname{lcm}(360,84)=2^3\\cdot 3^2\\cdot 5\\cdot 7=2520.$$
Check: $12\\cdot 2520=30240=360\\cdot 84$. The number of positive divisors of $360$ is $(3+1)(2+1)(1+1)=24$, because a divisor picks an exponent for each prime independently.

**Infinitely many primes.** Given primes $p_1,\\dots,p_k$, the number $p_1\\cdots p_k+1$ has a prime factor, and it is none of the $p_i$, because it leaves remainder $1$ on division by each. A variation shows that there are infinitely many primes congruent to $3$ modulo $4$. Consider $N=4p_1\\cdots p_k-1$. It is congruent to $3$ modulo $4$, so it cannot be a product of primes all congruent to $1$.

To find primes up to $N$, use the **sieve of Eratosthenes**. A composite $n\\le N$ has a prime factor at most $\\sqrt N$, so crossing out multiples of those primes is enough.

**Legendre's formula** gives the exponent of $p$ in $n!$: $v_p(n!)=\\sum_{k\\ge1}\\lfloor n/p^k\\rfloor$. The term $\\lfloor n/p^k\\rfloor$ counts the multiples of $p^k$ up to $n$, so a multiple of exactly $p^j$ is counted $j$ times.`,
          resources: [
            stein('Read the chapter on prime numbers.'),
            conrad('ugradnumthy/uniquefactnZF[T].pdf', 'Unique factorization in Z and F[T]', 'A careful proof, side by side with the polynomial case.'),
            conrad('ugradnumthy/infinitudeofprimes.pdf', 'The infinitude of the primes', 'A collection of proofs.'),
          ],
          exercises: [
            {
              slug: 'roots-irrational',
              title: 'Irrational roots',
              prompt: `Use unique factorisation to prove that for positive integers $n$ and $k$, the number $\\sqrt[k]{n}$ is either an integer or irrational. State clearly which step uses uniqueness.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'three-mod-four-primes',
              title: 'Primes in a residue class',
              prompt: `Write out in full the proof that there are infinitely many primes congruent to $3$ modulo $4$. Then adapt it to primes congruent to $5$ modulo $6$. Explain why this same style of argument does not directly work for primes congruent to $1$ modulo $4$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'legendre-formula',
              title: 'Zeros of a factorial',
              prompt: `Use Legendre's formula to compute $v_2(100!)$ and $v_5(100!)$, and find the number of trailing zeros of $100!$. Prove that $\\binom{2n}{n}$ is even for all $n\\ge 1$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'prime-gaps-exist',
              title: 'Arbitrarily long gaps',
              prompt: `Prove that for each $k$ there are $k$ consecutive composite integers. Find the first gap of length at least $10$ between consecutive primes, by a short program or a sieve by hand.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'hilbert-numbers',
              title: 'Failure of unique factorisation',
              prompt: `Work in the set $H$ of positive integers congruent to $1$ modulo $4$. Show that every element of $H$ other than $1$ is a product of irreducibles of $H$. Find another element of $H$ with two different factorisations into irreducibles, not related to $441$. Characterise the irreducibles of $H$ in terms of ordinary prime factorisation.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'An element of H is irreducible if it is a prime congruent to 1 mod 4, or a product of two primes congruent to 3 mod 4.',
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the proof of uniqueness use Euclid\'s lemma?',
              answerOutline: `To show $p_1$ divides some $q_j$ when it divides their product, so that the primes can be matched and cancelled.`,
            },
            {
              question: 'How many positive divisors does $2^4\\cdot 3^2\\cdot 7$ have?',
              answerOutline: `$(4+1)(2+1)(1+1)=30$.`,
            },
            {
              question: 'Why need a sieve only use primes up to $\\sqrt N$?',
              answerOutline: `If $n=ab$ is composite and at most $N$, then one factor is at most $\\sqrt N$, and it has a prime factor.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/primes-and-factorisation'],
        },
        {
          slug: 'distribution-of-primes',
          title: 'How primes are distributed',
          summary:
            'The prime number theorem, special primes, and the difference between what is proved and what is conjectured.',
          estimatedMinutes: 120,
          objectives: [
            'State the prime number theorem and test it numerically',
            'Prove the necessary conditions for Mersenne and Fermat primes',
            'State Dirichlet\'s theorem and Bertrand\'s postulate',
            'Separate proved results from open problems such as the twin prime conjecture',
          ],
          concepts: [
            'Prime counting function $\\pi(x)$',
            'Prime number theorem',
            'Logarithmic integral',
            'Mersenne numbers',
            'Fermat numbers',
            'Dirichlet\'s theorem',
            'Twin prime conjecture',
          ],
          explanation: `Let $\\pi(x)$ count the primes up to $x$. Primes thin out, but in a predictable way. The **prime number theorem** says
$$\\pi(x)\\sim\\frac{x}{\\ln x},\\qquad\\text{meaning that}\\quad\\lim_{x\\to\\infty}\\frac{\\pi(x)\\ln x}{x}=1.$$
So near $x$, about $1$ in $\\ln x$ integers is prime. We state this without proof, because the proofs use complex analysis or a long elementary argument. The approximation is slow. With $x=10^6$ we get $x/\\ln x\\approx 72382$, while $\\pi(10^6)=78498$. The ratio is $1.08$, and it approaches $1$ very slowly. The logarithmic integral $\\operatorname{Li}(x)=\\int_2^x dt/\\ln t$ is far more accurate.

Some further results are proved and worth knowing. **Bertrand's postulate:** for $n\\ge 1$ there is a prime $p$ with $n<p\\le 2n$. **Dirichlet's theorem:** if $\\gcd(a,m)=1$ then infinitely many primes are congruent to $a$ modulo $m$. The sum $\\sum_p 1/p$ of reciprocals of primes diverges, which is a stronger statement than the infinitude of primes. Many simple statements remain open, however. The **twin prime conjecture** says that $p$ and $p+2$ are both prime infinitely often. **Goldbach's conjecture** says that every even number greater than $2$ is a sum of two primes. Neither is proved, however much numerical evidence supports them.

**Worked example.** Suppose $2^n-1$ is prime. Then $n$ must be prime. If $n=ab$ with $a,b>1$, then using $x^b-1=(x-1)(x^{b-1}+\\dots+1)$ with $x=2^a$,
$$2^{ab}-1=(2^a-1)\\bigl(2^{a(b-1)}+\\dots+2^a+1\\bigr),$$
and both factors exceed $1$. So $2^n-1$ is composite. For instance, $2^6-1=63=7\\cdot 9$, with $a=3$. The converse is false: $n=11$ is prime, but $2^{11}-1=2047=23\\cdot 89$.

A similar argument works for $2^n+1$. If $n$ has an odd factor $b>1$, write $n=ab$. Then $2^a+1$ divides $(2^a)^b+1$, because $x+1\\mid x^b+1$ for odd $b$. So if $2^n+1$ is prime then $n$ is a power of $2$. This motivates the **Fermat numbers** $F_k=2^{2^k}+1$. Fermat knew that $F_0,\\dots,F_4$ were prime, namely $3,5,17,257,65537$, and guessed that all were. But Euler found $F_5=2^{32}+1=641\\cdot 6700417$. No Fermat prime beyond $F_4$ is known.

Primes of the form $2^p-1$ are **Mersenne primes**. The largest known primes are of this form, since there is a very fast test for them.`,
          resources: [
            stein('The chapter on primes discusses their distribution and the prime number theorem.'),
            { title: 'The Prime Pages', url: 'https://t5k.org/', type: 'documentation', cost: 'free', provider: 'University of Tennessee at Martin', note: 'Up-to-date tables of record primes and accounts of conjectures.' },
            conrad('ugradnumthy/heuristics.pdf', 'Heuristics for prime statistics', 'How to predict counts of primes in patterns.'),
            conrad('ugradnumthy/fermat-numbers-and-factors.pdf', 'Fermat numbers and their factors', 'Why factors of Fermat numbers are so restricted.'),
          ],
          exercises: [
            {
              slug: 'mersenne-fermat-conditions',
              title: 'Conditions on the exponent',
              prompt: `Prove both statements: if $2^n-1$ is prime then $n$ is prime, and if $2^n+1$ is prime then $n$ is a power of $2$. More generally, show that if $a^n-1$ is prime with $n\\ge 2$, then $a=2$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'fermat-coprime',
              title: 'Fermat numbers are coprime',
              prompt: `Prove that $F_n=F_0F_1\\cdots F_{n-1}+2$, and deduce that distinct Fermat numbers are coprime. Explain why this gives another proof that there are infinitely many primes.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pi-table',
              title: 'Testing the prime number theorem',
              prompt: `Write a sieve, and tabulate $\\pi(10^k)$ for $k=1,\\dots,7$ against $x/\\ln x$ and $\\operatorname{Li}(x)$. You should get $\\pi(10^3)=168$ and $\\pi(10^7)=664579$. Describe how the relative errors change with $k$.`,
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'polynomial-no-prime',
              title: 'No polynomial gives only primes',
              prompt: `Prove that a non-constant polynomial with integer coefficients and positive leading coefficient takes a composite value at some positive integer. Test the famous polynomial $n^2+n+41$: for which least $n\\ge 0$ is its value composite?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'If f(a) = p is prime, compare f(a + kp) with f(a) modulo p.',
            },
          ],
          selfAssessment: [
            {
              question: 'Roughly how many $100$-digit integers would you try before hitting a prime, if you test at random?',
              answerOutline: `The density is $1/\\ln(10^{100})\\approx 1/230$, so about $230$ tries, or half that using only odd numbers.`,
            },
            {
              question: 'State Dirichlet\'s theorem, with its hypothesis.',
              answerOutline: `If $\\gcd(a,m)=1$, there are infinitely many primes $p\\equiv a\\pmod m$. Without coprimality there can be at most one.`,
            },
            {
              question: 'Is $2^p-1$ always prime for prime $p$?',
              answerOutline: `No: $2^{11}-1=23\\cdot 89$.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'congruences',
      title: 'Congruences',
      description:
        'Arithmetic modulo $n$, solving linear congruences, the Chinese remainder theorem, and lifting solutions of polynomial congruences to prime powers.',
      lessons: [
        {
          slug: 'modular-arithmetic',
          title: 'Modular arithmetic',
          summary:
            'Congruence as an equivalence relation compatible with addition and multiplication, and what it can rule out.',
          estimatedMinutes: 120,
          objectives: [
            'Compute with congruences and reduce large powers',
            'State exactly when you may cancel in a congruence',
            'Derive divisibility tests',
            'Use a congruence to show that an equation has no solution',
          ],
          concepts: [
            'Congruence modulo $m$',
            'Residue classes',
            'Complete residue system',
            'Cancellation rule',
            'Repeated squaring',
            'Local obstructions',
          ],
          explanation: `We write $a\\equiv b\\pmod m$ when $m\\mid a-b$. This is an equivalence relation, whose classes are the **residue classes**. It respects arithmetic: if $a\\equiv a'$ and $b\\equiv b'$, then $a+b\\equiv a'+b'$ and $ab\\equiv a'b'$. So you may reduce at any point in a calculation. It follows that if $f$ is a polynomial with integer coefficients and $a\\equiv b\\pmod m$, then $f(a)\\equiv f(b)\\pmod m$.

Division is the catch. **Cancellation:** if $ac\\equiv bc\\pmod m$, then $a\\equiv b\\pmod{m/\\gcd(c,m)}$. So you may cancel $c$ with the modulus unchanged only if $\\gcd(c,m)=1$. For example, $2\\cdot 3\\equiv 2\\cdot 8\\pmod{10}$, and yet $3\\not\\equiv 8\\pmod{10}$. All you can say is $3\\equiv 8\\pmod 5$.

Powers are computed by **repeated squaring**: to compute $a^k$, write $k$ in binary, square repeatedly, and multiply the needed powers. This takes about $\\log_2k$ multiplications, which is why modular exponentiation is practical with numbers of hundreds of digits.

**Worked example.** Find the last two digits of $7^{2024}$, that is, $7^{2024}\\bmod 100$. We have $7^2=49$ and $7^4=2401\\equiv 1\\pmod{100}$. Since $2024=4\\cdot 506$,
$$7^{2024}=(7^4)^{506}\\equiv 1\\pmod{100},$$
so the last two digits are $01$. Now a harder case: $3^{100}\\bmod 7$. Here $3^2\\equiv 2$, so $3^3\\equiv 6\\equiv -1$ and $3^6\\equiv 1$. Since $100=6\\cdot 16+4$, we get $3^{100}\\equiv 3^4=(3^2)^2\\equiv 4\\pmod 7$.

**Divisibility tests** are congruences. Since $10\\equiv 1\\pmod 9$, a number is congruent to its digit sum modulo $9$. Since $10\\equiv -1\\pmod{11}$, it is congruent to its alternating digit sum modulo $11$. Since $1001=7\\cdot 11\\cdot 13$, we have $1000\\equiv -1$ modulo each of these, and so blocks of three digits can be alternated to test all three at once.

**Local obstructions.** A congruence can prove that an equation has no integer solutions. Every square is $0,1$ or $4$ modulo $8$, so a sum of three squares is never $7$ modulo $8$. Every cube is $0$ or $\\pm1$ modulo $9$, so a sum of three cubes is never $\\pm4$ modulo $9$. The converse is false in general: an equation can be solvable modulo every $m$ and still have no integer solution. So a congruence can only disprove, never prove, solvability.`,
          resources: [
            stein('Read the chapter on the ring of integers modulo $n$.'),
            conrad('ugradnumthy/modarith.pdf', 'Modular arithmetic', 'A complete development, with many examples.'),
            raji('The chapter on congruences has plenty of routine practice.'),
          ],
          exercises: [
            {
              slug: 'cancellation-rule',
              title: 'The cancellation rule',
              prompt: `Prove that $ac\\equiv bc\\pmod m$ implies $a\\equiv b\\pmod{m/\\gcd(c,m)}$. Show that this is the best possible, by finding all $x$ modulo $18$ with $12x\\equiv 12\\cdot 5\\pmod{18}$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'divisibility-by-seven',
              title: 'Testing by blocks of three',
              prompt: `Use $1001=7\\cdot 11\\cdot 13$ to derive a single test for divisibility by $7$, $11$ and $13$. Apply it to $123456789$ and to $1002003$. Prove that a number and its digit reversal differ by a multiple of $9$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'obstructions',
              title: 'Local obstructions',
              prompt: `Prove that no integer of the form $8k+7$ is a sum of three squares, and that no integer congruent to $\\pm 4$ modulo $9$ is a sum of three cubes. Prove that $x^2-5y^2=2$ has no integer solutions, by choosing a suitable modulus.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'repeated-squaring',
              title: 'Repeated squaring',
              prompt: `Find $3^{100}\\bmod 101$ and $5^{117}\\bmod 19$ by repeated squaring, showing each step. Write a function for modular exponentiation that takes about $\\log_2 k$ multiplications, and compare with Python's built-in \`pow(a, k, m)\` on random inputs.`,
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Is $x\\equiv 1\\pmod 6$ implied by $4x\\equiv 4\\pmod 6$?',
              answerOutline: `No. The rule gives only $x\\equiv 1\\pmod 3$. For example, $x=4$ satisfies the hypothesis.`,
            },
            {
              question: 'What are the squares modulo $8$?',
              answerOutline: `$0,1,4$.`,
            },
            {
              question: 'If a polynomial equation has a solution modulo every prime, does it have an integer solution?',
              answerOutline: `Not necessarily. Congruences give only necessary conditions. For instance $(x^2-2)(x^2-3)(x^2-6)=0$ has a root modulo every prime, and none in the integers.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/modular-arithmetic-and-inverses'],
        },
        {
          slug: 'linear-congruences',
          title: 'Linear congruences and inverses',
          summary:
            'When $ax\\equiv b$ can be solved, how many solutions there are, and how to find inverses.',
          estimatedMinutes: 120,
          objectives: [
            'Decide solvability of $ax\\equiv b\\pmod m$',
            'List all solutions modulo $m$',
            'Compute modular inverses with the Euclidean algorithm',
            'Solve small linear systems modulo a prime',
          ],
          concepts: [
            'Linear congruence',
            'Modular inverse',
            'Number of solutions',
            'Unit modulo $m$',
            'Systems of linear congruences',
          ],
          explanation: `A **linear congruence** is $ax\\equiv b\\pmod m$. It says that $ax+my=b$ for some integer $y$, so this is a linear Diophantine equation in disguise. Let $g=\\gcd(a,m)$.

**Theorem.** The congruence has a solution if and only if $g\\mid b$. In that case there are exactly $g$ solutions modulo $m$, and they form a single class modulo $m/g$.

To see this, divide through by $g$: the congruence becomes $(a/g)x\\equiv b/g\\pmod{m/g}$, and now $a/g$ is coprime to $m/g$. So it has an inverse modulo $m/g$, and there is one solution $x_0$ modulo $m/g$. Lifting back gives $x_0,x_0+m/g,\\dots,x_0+(g-1)m/g$ modulo $m$.

The case $g=1$, $b=1$ is the **inverse**: $a$ has an inverse modulo $m$ exactly when $\\gcd(a,m)=1$. Compute it with Bezout: if $ax+my=1$, then $ax\\equiv 1$. In particular, every nonzero class modulo a prime is invertible, so you can divide modulo a prime as in $\\mathbb{Q}$.

**Worked example.** Solve $12x\\equiv 15\\pmod{21}$. Here $g=\\gcd(12,21)=3$, and $3\\mid 15$, so there are three solutions modulo $21$. Dividing by $3$ gives $4x\\equiv 5\\pmod 7$. The inverse of $4$ modulo $7$ is $2$, since $4\\cdot 2=8\\equiv 1$. So $x\\equiv 2\\cdot 5=10\\equiv 3\\pmod 7$. Modulo $21$ the solutions are $x\\equiv 3,10,17$. Check: $12\\cdot 3=36\\equiv 15$, then $12\\cdot 10=120=5\\cdot 21+15$, and $12\\cdot 17=204=9\\cdot 21+15$.

By contrast, $6x\\equiv 4\\pmod 9$ has no solution: $\\gcd(6,9)=3$ does not divide $4$. You can see this directly, as $6x$ is always a multiple of $3$ modulo $9$, and $4$ is not.

To find an inverse with a larger modulus, use the extended Euclidean algorithm. Find $7^{-1}$ modulo $19$. We have $19=2\\cdot 7+5$, $7=5+2$, $5=2\\cdot 2+1$. Back-substituting gives
$$1=5-2\\cdot 2=5-2(7-5)=3\\cdot 5-2\\cdot 7=3(19-2\\cdot 7)-2\\cdot 7=3\\cdot 19-8\\cdot 7.$$
So $7^{-1}\\equiv -8\\equiv 11\\pmod{19}$. Check: $7\\cdot 11=77=4\\cdot 19+1$.

**Systems.** Modulo a prime $p$, you can solve linear systems by Gaussian elimination, since all nonzero pivots are invertible. A square system has a unique solution exactly when its determinant is nonzero modulo $p$. For a composite modulus, the determinant must be a unit.`,
          resources: [
            stein('The chapter on the ring of integers modulo $n$ covers units and linear equations.'),
            raji('See the section on linear congruences for routine practice.'),
            shoup('The chapter on congruences explains the algorithmic details.'),
          ],
          exercises: [
            {
              slug: 'solve-a-batch',
              title: 'Solve a batch',
              prompt: `Solve each congruence, listing all solutions modulo the given modulus: (a) $7x\\equiv 3\\pmod{19}$; (b) $15x\\equiv 9\\pmod{24}$; (c) $6x\\equiv 4\\pmod 9$; (d) $35x\\equiv 14\\pmod{77}$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'count-solutions-proof',
              title: 'Exactly g solutions',
              prompt: `Give a complete proof that $ax\\equiv b\\pmod m$ has exactly $g=\\gcd(a,m)$ solutions modulo $m$ when $g\\mid b$. Be careful to show the listed solutions are distinct modulo $m$, and that there are no others.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'system-mod-seven',
              title: 'A system modulo seven',
              prompt: `Solve the system $x+2y\\equiv 3$, $3x+4y\\equiv 1\\pmod 7$. Then find all solutions of the same system modulo $6$ if any exist, and explain what is different about the determinant there.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'inverse-table',
              title: 'A table of inverses',
              prompt: `Write a program that prints all inverses modulo a prime $p$ in $O(p)$ total multiplications, using the recurrence $i^{-1}\\equiv-\\lfloor p/i\\rfloor\\,(p\\bmod i)^{-1}\\pmod p$. Prove the recurrence, and test your program with $p=1009$.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many solutions does $10x\\equiv 20\\pmod{35}$ have modulo $35$?',
              answerOutline: `$\\gcd(10,35)=5$, and $5\\mid 20$, so there are $5$ solutions: $x\\equiv 2\\pmod 7$.`,
            },
            {
              question: 'When does $a$ have an inverse modulo $m$?',
              answerOutline: `Exactly when $\\gcd(a,m)=1$.`,
            },
            {
              question: 'What is the relation between a linear congruence and a linear Diophantine equation?',
              answerOutline: `$ax\\equiv b\\pmod m$ means $ax+my=b$ for some integer $y$.`,
            },
          ],
        },
        {
          slug: 'chinese-remainder-theorem',
          title: 'The Chinese remainder theorem',
          summary:
            'Solving congruences with coprime moduli at once, and reducing questions modulo $n$ to questions modulo prime powers.',
          estimatedMinutes: 140,
          objectives: [
            'State and prove the Chinese remainder theorem',
            'Solve a system by the constructive formula',
            'Handle systems with non-coprime moduli',
            'Count solutions of a congruence using multiplicativity',
          ],
          concepts: [
            'Pairwise coprime moduli',
            'Constructive formula',
            'Compatibility condition',
            'Reduction to prime powers',
            'Multiplicativity of solution counts',
          ],
          explanation: `**Chinese remainder theorem.** Let $m_1,\\dots,m_k$ be pairwise coprime, with product $M$. For any integers $a_i$, the system $x\\equiv a_i\\pmod{m_i}$ has a solution, and it is unique modulo $M$.

Uniqueness: two solutions differ by a multiple of every $m_i$, hence of their product, because they are coprime. Existence is constructive. Let $M_i=M/m_i$, and let $y_i$ be an inverse of $M_i$ modulo $m_i$. Then
$$x=\\sum_ia_iM_iy_i$$
works, because the $i$th term is $a_i$ modulo $m_i$, and every other term is divisible by $m_i$.

**Worked example.** Solve $x\\equiv 1\\pmod 4$, $x\\equiv 2\\pmod 5$, $x\\equiv 3\\pmod 7$. Here $M=140$.

- $M_1=35\\equiv 3\\pmod 4$, with inverse $y_1=3$.
- $M_2=28\\equiv 3\\pmod 5$, with inverse $y_2=2$.
- $M_3=20\\equiv 6\\pmod 7$, with inverse $y_3=6$.

So
$$x=1\\cdot 35\\cdot 3+2\\cdot 28\\cdot 2+3\\cdot 20\\cdot 6=105+112+360=577\\equiv 17\\pmod{140}.$$
Check: $17\\equiv 1\\pmod 4$, $17\\equiv 2\\pmod 5$, $17\\equiv 3\\pmod 7$.

**Non-coprime moduli.** The system $x\\equiv a\\pmod m$, $x\\equiv b\\pmod n$ is solvable if and only if $\\gcd(m,n)\\mid a-b$, and then the solution is unique modulo $\\operatorname{lcm}(m,n)$. To see this, write $x=a+mt$ and solve $mt\\equiv b-a\\pmod n$.

**Why it matters.** The map $x\\mapsto(x\\bmod m_1,\\dots,x\\bmod m_k)$ is a bijection that respects addition and multiplication. So arithmetic modulo $M$ is the same as arithmetic in each coordinate independently. If $N(m)$ is the number of solutions of a polynomial congruence $f(x)\\equiv 0\\pmod m$, then $N(mn)=N(m)N(n)$ for coprime $m,n$. For this reason, questions modulo $n$ reduce to prime powers.

For example, how many solutions does $x^2\\equiv 1\\pmod{105}$ have? Since $105=3\\cdot 5\\cdot 7$, and $x^2\\equiv 1$ has two solutions modulo each odd prime, the answer is $2^3=8$. Note that this shows a polynomial of degree $2$ can have more than $2$ roots modulo a composite.

The same idea speeds up large computations. To find $2^{100}\\bmod 1001$, work modulo $7$, $11$ and $13$ separately, where the exponent reduces. Then recombine.`,
          resources: [
            stein('The chapter on the ring of integers modulo $n$ covers the theorem and its proof.'),
            conrad('ugradnumthy/crt.pdf', 'Chinese remainder theorem', 'Variations, including non-coprime moduli.'),
            ocw781('Use the lecture notes on congruences as a second presentation.'),
          ],
          exercises: [
            {
              slug: 'crt-proof',
              title: 'Prove the theorem',
              prompt: `Prove the Chinese remainder theorem for two coprime moduli in detail, then extend to $k$ moduli by induction. Point out exactly where pairwise coprimality is used, as opposed to the weaker condition $\\gcd(m_1,\\dots,m_k)=1$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'non-coprime-system',
              title: 'Non-coprime moduli',
              prompt: `Decide which of these systems are solvable, and solve them: (a) $x\\equiv 3\\pmod{12}$, $x\\equiv 9\\pmod{18}$; (b) $x\\equiv 3\\pmod{12}$, $x\\equiv 8\\pmod{18}$. Prove the compatibility condition in general.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'square-roots-of-one',
              title: 'Square roots of one',
              prompt: `Count the solutions of $x^2\\equiv 1\\pmod n$ for general $n$ using the Chinese remainder theorem. Give the answer for $n=105$ and $n=120$, and list the solutions for $n=120$ in the form that shows the structure.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'There are 2 solutions modulo an odd prime power, 1 modulo 2, 2 modulo 4, and 4 modulo higher powers of 2.',
            },
            {
              slug: 'power-via-crt',
              title: 'A large power through three primes',
              prompt: `Find $2^{100}\\bmod 1001$ by working modulo $7$, $11$ and $13$, and combining with the constructive formula. Check against repeated squaring. Compare the number of multiplications done by the two methods.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'consecutive-non-squarefree',
              title: 'Runs of non-squarefree integers',
              prompt: `Prove that for every $k$ there are $k$ consecutive positive integers, none of which is squarefree. Find the first pair by computer and compare it with what the proof constructs for $k=2$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Assign a different prime squared to each position in the run.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the coprimality of the moduli required for existence?',
              answerOutline: `Without it, the system may conflict, as in $x\\equiv 0\\pmod 2$ and $x\\equiv 1\\pmod 4$. Compatibility modulo the gcd is what is required.`,
            },
            {
              question: 'What is the number of solutions of $x^2\\equiv 1\\pmod{77}$?',
              answerOutline: `$2\\cdot 2=4$.`,
            },
            {
              question: 'What does CRT say about the ring $\\mathbb{Z}_{mn}$ when $\\gcd(m,n)=1$?',
              answerOutline: `It is isomorphic to $\\mathbb{Z}_m\\times\\mathbb{Z}_n$, with arithmetic done coordinatewise.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/modular-arithmetic-and-inverses'],
        },
        {
          slug: 'polynomial-congruences-and-hensel',
          title: 'Polynomial congruences and Hensel\'s lemma',
          summary:
            'Moving a root from modulus $p$ up to $p^k$, and what happens when the derivative vanishes.',
          estimatedMinutes: 140,
          objectives: [
            'Reduce a polynomial congruence to prime power moduli',
            'State and use Hensel\'s lemma',
            'Lift roots step by step by hand',
            'Treat singular roots directly',
          ],
          concepts: [
            'Polynomial congruence',
            'Lifting a root',
            'Simple and singular roots',
            'Hensel\'s lemma',
            'Taylor expansion over the integers',
            'Squares modulo powers of $2$',
          ],
          explanation: `To solve $f(x)\\equiv 0\\pmod n$ for a polynomial $f$ with integer coefficients, factor $n$ into prime powers, solve modulo each, and recombine by the Chinese remainder theorem. So the question is how to go from $p$ to $p^k$.

Suppose $f(a)\\equiv 0\\pmod{p^k}$ with $k\\ge1$. Any root modulo $p^{k+1}$ that reduces to $a$ has the form $a+tp^k$. Taylor expansion gives
$$f(a+tp^k)\\equiv f(a)+tp^kf'(a)\\pmod{p^{k+1}},$$
since the later terms contain $p^{2k}$ and integer multiples. (The expansion has integer coefficients, as $f^{(j)}(a)/j!$ is an integer.) Dividing by $p^k$, we need
$$\\frac{f(a)}{p^k}+tf'(a)\\equiv 0\\pmod p.$$

**Hensel's lemma.** If $f(a)\\equiv 0\\pmod{p^k}$ and $f'(a)\\not\\equiv 0\\pmod p$, then there is exactly one $t$ modulo $p$ for which $a+tp^k$ is a root modulo $p^{k+1}$. It is $t\\equiv-(f(a)/p^k)\\,f'(a)^{-1}\\pmod p$. Since the derivative condition persists as you lift, a simple root modulo $p$ extends uniquely to every power of $p$.

**Worked example.** Solve $x^2\\equiv 2\\pmod{343}$. Let $f=x^2-2$, so $f'=2x$. Modulo $7$, the roots are $x\\equiv 3,4$. Start from $a=3$. Here $f(3)=7$ and $f'(3)=6\\not\\equiv 0$. The inverse of $6$ modulo $7$ is $6$, so $t\\equiv-1\\cdot 6\\equiv 1\\pmod 7$, which gives $a=3+7=10$ modulo $49$. Check: $100=2\\cdot 49+2$.

Now lift from $49$ to $343$. We have $f(10)=98=2\\cdot 49$, and $f'(10)=20\\equiv 6\\pmod 7$. So $t\\equiv-2\\cdot 6=-12\\equiv 2\\pmod 7$, which gives $x=10+2\\cdot 49=108$. Check: $108^2=11664=34\\cdot 343+2$. The other root is $-108\\equiv 235\\pmod{343}$, which lifts $4$.

**Singular roots.** If $f'(a)\\equiv 0\\pmod p$, the condition reads $f(a)/p^k\\equiv 0\\pmod p$, with no $t$ involved. So either every $t$ works (when $p^{k+1}\\mid f(a)$), or none does. There may be many lifts or none, and you must look directly. Compare $x^2+9$ and $x^2+3$. Both have the root $0$ modulo $3$, and it is singular for each. Modulo $9$, the first has roots $0,3,6$ and the second has no root at all.

The prime $2$ always needs care for $x^2\\equiv a$, because $f'=2x$ vanishes modulo $2$. An odd $a$ is a square modulo $2^k$, for $k\\ge 3$, if and only if $a\\equiv 1\\pmod 8$, and then it has exactly four square roots.`,
          resources: [
            ocw781('The lecture notes on polynomial congruences and Hensel\'s lemma give a parallel account.'),
            raji('See the material on solving polynomial congruences.'),
            shoup('The later chapters discuss Hensel lifting in algorithms.'),
          ],
          exercises: [
            {
              slug: 'hensel-proof',
              title: 'Prove Hensel\'s lemma',
              prompt: `Prove the expansion $f(a+h)=f(a)+hf'(a)+h^2g(a,h)$, where $g$ has integer values for integer $a,h$. Then prove Hensel's lemma as stated, including that the derivative condition persists at each lift.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lift-by-hand',
              title: 'Lifting by hand',
              prompt: `Find all roots of $x^2+x+1$ modulo $7$, then modulo $49$ and modulo $343$, by lifting. Check each root by substitution. How many roots does the same polynomial have modulo $91$, and which are they?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'singular-roots',
              title: 'Singular roots',
              prompt: `Find all roots of $x^2+9$ and of $x^2+3$ modulo $3$ and $9$, and of $x^2+9$ modulo $27$. Explain each outcome with the criterion for singular roots. Give an example of your own of a polynomial with a singular root that lifts to more than $p$ roots.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'squares-mod-powers-of-two',
              title: 'Squares modulo powers of two',
              prompt: `Prove that for $k\\ge 3$, an odd integer $a$ is a square modulo $2^k$ if and only if $a\\equiv 1\\pmod 8$, and that it then has exactly four square roots modulo $2^k$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If x^2 = a mod 2^k, try x or x + 2^(k-1) to get a root modulo 2^(k+1). A direct count of odd squares also works.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the hypothesis in Hensel\'s lemma, and what does it give?',
              answerOutline: `A root $a$ modulo $p^k$ with $f'(a)\\not\\equiv 0\\pmod p$. It lifts uniquely to a root modulo $p^{k+1}$.`,
            },
            {
              question: 'Why is $2$ a special case for square roots?',
              answerOutline: `The derivative $2x$ vanishes modulo $2$, so the roots are all singular and the lemma as stated does not apply.`,
            },
            {
              question: 'How many square roots has $2$ modulo $7^{10}$?',
              answerOutline: `Two. Each of the two roots $3$ and $4$ modulo $7$ is simple, so it lifts uniquely.`,
            },
          ],
        },
      ],
      project: {
        slug: 'congruence-solver',
        title: 'A congruence solver',
        description: `Write a Python module that solves congruences from first principles. It should find all solutions of $f(x)\\equiv 0\\pmod n$ for a polynomial $f$ and a modulus $n$, by factoring $n$, finding roots modulo each prime, lifting them with Hensel's lemma (treating singular roots by direct search over lifts), and recombining with the Chinese remainder theorem. It should work for moduli far too large for direct search, such as $n=7^{12}\\cdot 11^{9}$. Test it by comparing with a brute-force count for all $n$ up to $5000$ on a handful of polynomials.`,
        deliverables: [
          'Functions for the extended Euclidean algorithm, inverses, and a general CRT that handles non-coprime moduli',
          'A root finder modulo primes, plus Hensel lifting with singular root handling',
          'A brute-force test harness and its output for at least five polynomials',
          'A demonstration on a modulus above $10^{15}$',
          'A note describing how the number of roots of $x^2+1$ modulo $n$ depends on the factorisation of $n$, with a proof',
        ],
        estimatedHours: 7,
        stretchGoals: ['Add a Cantor-Zassenhaus style root finder for large primes', 'Handle systems of two polynomial congruences'],
      },
    },
    {
      slug: 'fermat-and-euler',
      title: 'Fermat and Euler',
      description:
        'The theorems of Fermat, Wilson and Euler, and two applications that run the internet: RSA and fast primality testing.',
      lessons: [
        {
          slug: 'fermat-and-wilson',
          title: 'Fermat\'s little theorem and Wilson\'s theorem',
          summary:
            'Two congruences for prime moduli, with proofs by rearranging residues.',
          estimatedMinutes: 120,
          objectives: [
            'Prove Fermat\'s little theorem in two ways',
            'Prove Wilson\'s theorem and its converse',
            'Use Fermat to reduce exponents',
            'Explain why the converse of Fermat fails',
          ],
          concepts: [
            'Fermat\'s little theorem',
            'Wilson\'s theorem',
            'Reduced residues',
            'Fermat pseudoprime',
            'Exponent reduction',
          ],
          explanation: `**Fermat's little theorem.** If $p$ is prime and $p\\nmid a$, then $a^{p-1}\\equiv 1\\pmod p$. Equivalently, $a^p\\equiv a\\pmod p$ for all $a$.

Proof by rearrangement. The numbers $a,2a,\\dots,(p-1)a$ are nonzero modulo $p$ and distinct, because $ia\\equiv ja$ would give $i\\equiv j$ after cancelling $a$. So they are a rearrangement of $1,2,\\dots,p-1$ modulo $p$. Multiplying them all,
$$a^{p-1}(p-1)!\\equiv(p-1)!\\pmod p,$$
and $(p-1)!$ can be cancelled because it is coprime to $p$.

So exponents can be reduced modulo $p-1$ when $p\\nmid a$. For instance, $3^{1000}\\bmod 13$: since $3^{12}\\equiv 1$ and $1000=83\\cdot 12+4$, we get $3^{1000}\\equiv 3^4=81\\equiv 3$.

**Wilson's theorem.** For a prime $p$, $(p-1)!\\equiv-1\\pmod p$. In the product, pair each $a$ with its inverse. The elements that equal their own inverse satisfy $a^2\\equiv 1$, that is, $p\\mid(a-1)(a+1)$, so $a\\equiv\\pm1$. Everything else cancels in pairs, leaving $1\\cdot(-1)=-1$. The converse also holds: if $n>4$ is composite then $(n-1)!\\equiv 0\\pmod n$, and for $n=4$ we get $3!\\equiv 2$. So Wilson's theorem characterises primes, though it is useless as a test, because computing $(n-1)!$ takes far too long.

**Worked example: the converse of Fermat fails.** Is $341$ prime? Since $2^{10}=1024=3\\cdot 341+1$, we have $2^{10}\\equiv 1\\pmod{341}$, so
$$2^{340}=(2^{10})^{34}\\equiv 1\\pmod{341}.$$
This is what Fermat predicts if $341$ is prime. But $341=11\\cdot 31$. A composite $n$ with $a^{n-1}\\equiv 1\\pmod n$ is a **Fermat pseudoprime** to base $a$. Other bases may still expose it: $3^{340}\\equiv 56\\pmod{341}$, so base $3$ proves that $341$ is composite without finding a factor.

Why does $2$ fool it? Modulo $11$ and modulo $31$, the order of $2$ is $10$ and $5$ respectively, and both of these divide $340$. By the Chinese remainder theorem, that is all that is needed.

**A useful consequence.** Taking $p$ prime and $a,b$ integers, $(a+b)^p\\equiv a^p+b^p\\pmod p$. This follows at once from $a^p\\equiv a$, or from the fact that $p\\mid\\binom pk$ for $0<k<p$, which gives a second proof of Fermat by induction on $a$.`,
          resources: [
            stein('The chapter on the ring of integers modulo $n$ proves Fermat\'s and Euler\'s theorems.'),
            conrad('ugradnumthy/fermatlittletheorem.pdf', 'Fermat\'s little theorem', 'Proofs and applications.'),
            conrad('ugradnumthy/fermattest.pdf', 'Fermat\'s test', 'How the contrapositive is used as a compositeness test.'),
          ],
          exercises: [
            {
              slug: 'fermat-by-induction',
              title: 'A second proof of Fermat',
              prompt: `Prove $a^p\\equiv a\\pmod p$ for all $a\\ge 0$ by induction on $a$, using the binomial theorem. Prove the fact you need about the binomial coefficients $\\binom pk$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'wilson-and-converse',
              title: 'Wilson and its converse',
              prompt: `Prove Wilson's theorem. Prove that if $n>4$ is composite then $n\\mid(n-1)!$, taking care with the case $n=p^2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'square-root-of-minus-one',
              title: 'An explicit square root of minus one',
              prompt: `Let $p$ be an odd prime and $h=(p-1)/2$. Prove that $(h!)^2\\equiv(-1)^{h+1}\\pmod p$. Deduce that if $p\\equiv 1\\pmod 4$, then $h!$ is a square root of $-1$. Find it for $p=13$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'In the product (p-1)!, replace each factor k above h by -(p-k).',
            },
            {
              slug: 'power-sums-mod-p',
              title: 'Power sums modulo a prime',
              prompt: `Let $p$ be prime and $k\\ge 1$. Prove that $\\sum_{a=1}^{p-1}a^k\\equiv-1\\pmod p$ if $(p-1)\\mid k$, and $\\equiv 0$ otherwise.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If some b has b^k not congruent to 1, multiplying the sum by b^k permutes its terms. Use the root bound to find such a b.',
            },
          ],
          selfAssessment: [
            {
              question: 'Find $2^{1000}\\bmod 7$ using Fermat.',
              answerOutline: `$2^6\\equiv 1$ and $1000\\equiv 4\\pmod 6$, so the answer is $2^4=16\\equiv 2$. (In fact $2^3\\equiv 1$ already.)`,
            },
            {
              question: 'Why does the rearrangement proof need $p$ prime?',
              answerOutline: `So that all of $1,\\dots,p-1$ are coprime to $p$, and hence can be cancelled and rearranged. Euler's version restricts to reduced residues.`,
            },
            {
              question: 'What is a Fermat pseudoprime to base $2$? Give an example.',
              answerOutline: `A composite $n$ with $2^{n-1}\\equiv 1\\pmod n$. Example: $341=11\\cdot 31$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/fermat-euler-and-rsa'],
        },
        {
          slug: 'euler-function-and-theorem',
          title: 'Euler\'s function and Euler\'s theorem',
          summary:
            'Counting reduced residues, the formula for $\\varphi$, and the generalisation of Fermat to any modulus.',
          estimatedMinutes: 130,
          objectives: [
            'Compute $\\varphi(n)$ from a factorisation',
            'Prove that $\\varphi$ is multiplicative',
            'Prove Euler\'s theorem',
            'Reduce exponents modulo composites, including towers',
          ],
          concepts: [
            'Euler function $\\varphi(n)$',
            'Reduced residue system',
            'Multiplicativity',
            'Euler\'s theorem',
            'Carmichael function $\\lambda(n)$',
          ],
          explanation: `**Euler's function** $\\varphi(n)$ counts the integers in $\\{1,\\dots,n\\}$ coprime to $n$. These are the **reduced residues**. For a prime power, the non-coprime numbers are the multiples of $p$, so $\\varphi(p^k)=p^k-p^{k-1}$. By the Chinese remainder theorem, $x$ is coprime to $mn$ exactly when it is coprime to both $m$ and $n$, for coprime $m,n$. So $\\varphi(mn)=\\varphi(m)\\varphi(n)$, and
$$\\varphi(n)=n\\prod_{p\\mid n}\\Bigl(1-\\frac1p\\Bigr).$$

**Euler's theorem.** If $\\gcd(a,n)=1$, then $a^{\\varphi(n)}\\equiv 1\\pmod n$. The proof is Fermat's, restricted to reduced residues. If $r_1,\\dots,r_{\\varphi(n)}$ are the reduced residues, then $ar_1,\\dots,ar_{\\varphi(n)}$ are too, in some order. Multiplying and cancelling the product of the $r_i$, which is coprime to $n$, gives the theorem. The hypothesis is needed: $2^{\\varphi(4)}=4\\not\\equiv 1\\pmod 4$.

**Worked example.** First, $\\varphi(360)=360\\cdot\\tfrac12\\cdot\\tfrac23\\cdot\\tfrac45=96$. Next, find the last three digits of $3^{2025}$. Since $\\gcd(3,1000)=1$ and $\\varphi(1000)=400$, the exponent reduces modulo $400$: $2025=5\\cdot 400+25$, so we need $3^{25}\\bmod 1000$. By repeated squaring,
$$3^5=243,\\quad 3^{10}=243^2=59049\\equiv 49,\\quad 3^{20}\\equiv 49^2=2401\\equiv 401.$$
Then $3^{25}=3^{20}\\cdot 3^5\\equiv 401\\cdot 243=97443\\equiv 443\\pmod{1000}$. So the last three digits are $443$.

**Towers.** To compute $a^{b^c}\\bmod n$, first reduce the exponent $b^c$ modulo $\\varphi(n)$, or modulo a smaller exponent that still works. Take the last two digits of $7^{7^7}$. Since $7^4\\equiv 1\\pmod{100}$, only $7^7\\bmod 4$ matters. As $7\\equiv-1\\pmod 4$ and $7$ is odd, $7^7\\equiv 3\\pmod 4$. So the answer is $7^3=343\\equiv 43\\pmod{100}$.

That example used the exponent $4$, far smaller than $\\varphi(100)=40$. In general, the **Carmichael function** $\\lambda(n)$ is the least exponent with $a^{\\lambda(n)}\\equiv 1$ for all $a$ coprime to $n$. By the Chinese remainder theorem, it is the lcm of the $\\lambda(p^k)$, where $\\lambda(p^k)=\\varphi(p^k)$ for odd $p$ and for $p^k=2,4$, and $\\lambda(2^k)=2^{k-2}$ for $k\\ge 3$. For example, $\\lambda(1000)=\\operatorname{lcm}(2,100)=100$. It divides $\\varphi(n)$, usually with room to spare.

Finally, grouping $\\{1,\\dots,n\\}$ by the value of $\\gcd(k,n)$ proves $\\sum_{d\\mid n}\\varphi(d)=n$, an identity that will be used in the next module.`,
          resources: [
            stein('The chapter on the ring of integers modulo $n$ covers Euler\'s function and theorem.'),
            conrad('ugradnumthy/eulerthm.pdf', 'Euler\'s theorem', 'Proofs and extensions, including the Carmichael exponent.'),
            raji('See the chapter on multiplicative number-theoretic functions.'),
          ],
          exercises: [
            {
              slug: 'phi-multiplicative',
              title: 'Multiplicativity of phi',
              prompt: `Prove that $\\varphi(mn)=\\varphi(m)\\varphi(n)$ for coprime $m,n$, and derive the product formula. Compute $\\varphi(1001)$, $\\varphi(1024)$ and $\\varphi(2310)$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'phi-equals-twelve',
              title: 'Solving an equation in phi',
              prompt: `Find all $n$ with $\\varphi(n)=12$, proving that your list is complete. Prove that $\\varphi(n)$ is even for $n>2$, and that the equation $\\varphi(n)=14$ has no solutions.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Any prime factor p of n has p - 1 dividing the value, which leaves very few candidates.',
            },
            {
              slug: 'towers-of-powers',
              title: 'Towers of powers',
              prompt: `Find the last two digits of $7^{7^7}$ and of $3^{3^{3^3}}$. Explain each reduction step, and state which exponent you use modulo $100$ and why it is legitimate.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'carmichael-function',
              title: 'The Carmichael function',
              prompt: `Prove that for $k\\ge 3$, every odd $a$ has $a^{2^{k-2}}\\equiv 1\\pmod{2^k}$. Use this and the Chinese remainder theorem to find $\\lambda(1000)$, $\\lambda(720)$ and $\\lambda(561)$. Note what $\\lambda(561)$ being a divisor of $560$ implies.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\varphi(p^2q)$ for distinct primes $p,q$?',
              answerOutline: `$p(p-1)(q-1)$.`,
            },
            {
              question: 'Why do we need $\\gcd(a,n)=1$ in Euler\'s theorem?',
              answerOutline: `If $d=\\gcd(a,n)>1$ then every positive power of $a$ is divisible by $d$, so no power of $a$ is congruent to $1$ modulo $n$.`,
            },
            {
              question: 'Is $\\varphi$ multiplicative across all pairs? What is $\\varphi(4)$ compared with $\\varphi(2)^2$?',
              answerOutline: `Only coprime pairs. $\\varphi(4)=2$, but $\\varphi(2)^2=1$.`,
            },
          ],
        },
        {
          slug: 'rsa',
          title: 'RSA',
          summary:
            'Public-key encryption from Euler\'s theorem, with a full correctness proof and the classic mistakes.',
          estimatedMinutes: 140,
          objectives: [
            'Set up RSA keys and encrypt and decrypt a small example',
            'Prove correctness, including for messages not coprime to $n$',
            'Show that knowing $\\varphi(n)$ is the same as factoring $n$',
            'Explain several attacks on textbook RSA',
          ],
          concepts: [
            'Public and private keys',
            'RSA modulus',
            'Encryption and decryption exponents',
            'Correctness proof',
            'Decryption with CRT',
            'Textbook RSA attacks',
            'Padding',
          ],
          explanation: `**RSA** lets anyone encrypt a message that only the key owner can read. Choose two large primes $p\\ne q$ and let $n=pq$. Pick $e$ coprime to $\\varphi(n)=(p-1)(q-1)$, and compute $d$ with $ed\\equiv 1\\pmod{\\varphi(n)}$. Publish $(n,e)$, and keep $d$ private. To encrypt a message $0\\le m<n$, compute $c=m^e\\bmod n$. To decrypt, compute $c^d\\bmod n$.

**Correctness.** We need $m^{ed}\\equiv m\\pmod n$. Write $ed=1+k(p-1)(q-1)$. Modulo $p$: if $p\\nmid m$, Fermat gives $m^{ed}=m\\cdot(m^{p-1})^{k(q-1)}\\equiv m$. If $p\\mid m$, both sides are $0$. So the congruence holds modulo $p$ for all $m$, and also modulo $q$ by symmetry. By the Chinese remainder theorem it holds modulo $n$. Notice that this handles messages not coprime to $n$, which Euler's theorem alone would miss. It uses the fact that $n$ is squarefree.

**Worked example.** Take $p=73$ and $q=89$, so $n=6497$ and $\\varphi(n)=72\\cdot 88=6336$. Take $e=5$, which is coprime to $6336=2^6\\cdot 3^2\\cdot 11$. To find $d$, note that $6336=5\\cdot 1267+1$, so $1=6336-1267\\cdot 5$, and $d\\equiv-1267\\equiv 5069\\pmod{6336}$. Check: $5\\cdot 5069=25345=4\\cdot 6336+1$.

Encrypt $m=2024$. Computing by squaring modulo $6497$ gives $c=2024^5\\bmod 6497=1561$. Decrypting, $1561^{5069}\\bmod 6497=2024$, as it must. A computer does this in about a dozen squarings. Only the private key holder can do it, unless $n$ can be factored.

**Why it is believed secure.** Knowing $\\varphi(n)$ is equivalent to factoring $n$. From $\\varphi(n)=n-(p+q)+1$ you get $p+q$, and $p,q$ are then the roots of a quadratic. Finding $d$ also yields a factorisation. It is not proved that breaking RSA requires factoring, nor that factoring is hard, though no efficient classical algorithm is known. A large quantum computer running Shor's algorithm would factor quickly.

**Textbook RSA is not safe to use as it stands.** Encryption is deterministic, so identical messages give identical ciphertexts. It is malleable: $c_1c_2$ decrypts to $m_1m_2$. A small $e$ and a small $m$ may give $m^e<n$, so the plain integer root recovers $m$. The same $m$ sent to three recipients with $e=3$ can be recovered with the Chinese remainder theorem. Real systems use randomised padding such as OAEP, and in practice RSA now mostly protects short keys. Never implement your own cryptography for production use. These exercises are for understanding.`,
          resources: [
            stein('The chapter on public-key cryptography covers RSA, including factoring attacks.'),
            conrad('ugradnumthy/RSAnotes.pdf', 'Number theory and cryptography', 'Introduces RSA with its underlying number theory.'),
            { title: 'Handbook of Applied Cryptography', url: 'https://cacr.uwaterloo.ca/hac/', type: 'textbook', cost: 'free', provider: 'Menezes, van Oorschot and Vanstone', note: 'The free chapters on public-key encryption and on number-theoretic problems are a reliable reference.' },
          ],
          exercises: [
            {
              slug: 'rsa-correctness',
              title: 'Correctness for every message',
              prompt: `Write the full proof that $m^{ed}\\equiv m\\pmod n$ for all integers $m$, when $n=pq$ and $ed\\equiv 1\\pmod{\\operatorname{lcm}(p-1,q-1)}$. Show that it fails when $n=p^2$, with a concrete small example.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'phi-gives-factors',
              title: 'Factoring from phi',
              prompt: `Given $n=10403$ and $\\varphi(n)=10200$, find the factors of $n$ using a quadratic. Write down the general formula. Then explain why the private exponent must be kept as secret as the factors.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'decrypt-with-crt',
              title: 'Decrypting faster with CRT',
              prompt: `Using the example with $p=73$, $q=89$, $e=5$, decrypt $c=1561$ by computing $c^{d\\bmod 72}\\bmod 73$ and $c^{d\\bmod 88}\\bmod 89$, and combining. Show that you recover $2024$, and explain why this is faster by a factor of about $4$ for large keys.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'broadcast-attack',
              title: 'The broadcast attack',
              prompt: `The same message $m$ is encrypted with $e=3$ under three pairwise coprime moduli $35$, $143$ and $323$, giving ciphertexts $13$, $12$ and $113$. Recover $m$ without using any private key. State the conditions under which this attack works.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Combine the ciphertexts with the Chinese remainder theorem to get m^3 exactly, and then take an ordinary cube root.',
            },
            {
              slug: 'common-modulus',
              title: 'The common modulus attack',
              prompt: `Suppose a message $m$ is encrypted under the same modulus $n$ with two coprime public exponents $e_1,e_2$, and $\\gcd(m,n)=1$. Show how to recover $m$ from the two ciphertexts, without any private key. Test your method on a toy example with $n=6497$, $e_1=5$, $e_2=7$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must $e$ be coprime to $\\varphi(n)$?',
              answerOutline: `So that $e$ has an inverse $d$ modulo $\\varphi(n)$. Otherwise $m\\mapsto m^e$ is not a bijection.`,
            },
            {
              question: 'Does RSA correctness need $\\gcd(m,n)=1$?',
              answerOutline: `No. The proof works modulo $p$ and $q$ separately, and it handles $p\\mid m$ directly, as $n$ is squarefree.`,
            },
            {
              question: 'Name two weaknesses of textbook RSA.',
              answerOutline: `It is deterministic, and it is malleable. Also, small messages with small $e$ can be recovered by taking roots.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/number-theory-modular/fermat-euler-and-rsa'],
        },
        {
          slug: 'primality-testing',
          title: 'Primality testing',
          summary:
            'From the Fermat test and Carmichael numbers to the Miller-Rabin test that is used in practice.',
          estimatedMinutes: 140,
          objectives: [
            'State Korselt\'s criterion and test Carmichael numbers',
            'Run a Miller-Rabin step by hand',
            'Prove that a prime passes the Miller-Rabin test',
            'Explain the error bound and what a pass does and does not show',
          ],
          concepts: [
            'Fermat test',
            'Carmichael number',
            'Korselt\'s criterion',
            'Strong pseudoprime',
            'Miller-Rabin test',
            'Witness',
            'Nontrivial square root of $1$',
          ],
          explanation: `Testing whether a number is prime is far easier than factoring it. The **Fermat test** picks $a$ and computes $a^{n-1}\\bmod n$. If it is not $1$, then $n$ is composite, even though no factor has been found. If it is $1$, then $n$ is possibly prime.

A composite $n$ that passes for every $a$ coprime to it is a **Carmichael number**. There are infinitely many, and the smallest is $561$. **Korselt's criterion** says that a composite $n$ is Carmichael if and only if $n$ is squarefree and $p-1\\mid n-1$ for every prime $p\\mid n$. For $561=3\\cdot 11\\cdot 17$, we have $2$, $10$ and $16$ all dividing $560$. So the Fermat test alone cannot be relied on.

**The Miller-Rabin test** adds one observation. Modulo a prime, the only square roots of $1$ are $\\pm1$, as $p\\mid(x-1)(x+1)$. Write $n-1=2^sd$ with $d$ odd. If $n$ is an odd prime and $p\\nmid a$, then the sequence
$$a^d,\\ a^{2d},\\ a^{4d},\\ \\dots,\\ a^{2^sd}\\equiv 1$$
ends at $1$. Each term is the square of the one before. So either the sequence starts at $1$, or the term just before the first $1$ is $-1$. If neither holds, then $n$ is composite, and $a$ is called a **witness**. A composite $n$ that passes for base $a$ is a **strong pseudoprime** to base $a$.

For a composite odd $n>9$, at least three quarters of the bases in $1,\\dots,n-1$ are witnesses (this theorem we quote). So $k$ independent random bases leave error probability at most $4^{-k}$, and for typical large numbers far less. There are no Carmichael-style exceptions. It is a probabilistic test, though. A pass is strong evidence, and it is not a proof. There are deterministic tests, including AKS in polynomial time, and elliptic-curve methods that give certificates.

**Worked example.** Test $n=561$ with base $2$. Here $560=2^4\\cdot 35$, so $s=4$ and $d=35$. By repeated squaring modulo $561$,
$$2^{35}\\equiv 263,\\quad 263^2\\equiv 166,\\quad 166^2\\equiv 67,\\quad 67^2\\equiv 1.$$
The sequence reaches $1$, so the Fermat test would pass. But the term before the first $1$ is $67$, not $-1\\equiv 560$. So $67$ is a nontrivial square root of $1$, which proves that $561$ is composite. It even gives a factor: from $(67-1)(67+1)\\equiv 0\\pmod{561}$, we get $\\gcd(66,561)=33$ and $\\gcd(68,561)=17$.

Only five composites below $10000$ pass as strong pseudoprimes to base $2$: $2047$, $3277$, $4033$, $4681$ and $8321$. Using a few fixed bases gives a proof for numbers below a known bound. For example, bases $2,3,5,7$ are enough for $n<3215031751$.`,
          resources: [
            conrad('ugradnumthy/millerrabin.pdf', 'Miller-Rabin test', 'A complete account, including the proof of the error bound.'),
            conrad('ugradnumthy/carmichaelkorselt.pdf', 'Carmichael numbers and Korselt\'s criterion', 'Proofs and examples.'),
            shoup('The chapter on probabilistic primality testing gives the running time analysis.'),
          ],
          exercises: [
            {
              slug: 'korselt-proof',
              title: 'Korselt\'s criterion',
              prompt: `Prove that a composite $n$ is a Carmichael number if and only if $n$ is squarefree and $p-1\\mid n-1$ for each prime $p\\mid n$. You may use that primitive roots exist modulo $p$ and $p^2$, which is proved in the next module.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'first-carmichaels',
              title: 'The first Carmichael numbers',
              prompt: `Use Korselt's criterion to find the five smallest Carmichael numbers by computer. Prove by hand that a Carmichael number has at least three prime factors.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'If n = pq with p < q, then q - 1 divides n - 1 = p(q - 1) + p - 1, so q - 1 divides p - 1.',
            },
            {
              slug: 'miller-rabin-by-hand',
              title: 'Miller-Rabin by hand',
              prompt: `Run one round of Miller-Rabin on $n=341$ with base $2$, showing the sequence. Does it detect that $341$ is composite even though the Fermat test does not? Explain how your computation gives a factor. Then implement the test and confirm the list of strong pseudoprimes to base $2$ below $10000$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'chernick',
              title: 'A family of Carmichael numbers',
              prompt: `Prove that if $6k+1$, $12k+1$ and $18k+1$ are all prime, then their product is a Carmichael number. Find the two smallest examples with $k\\ge 1$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a Miller-Rabin witness prove, and what does passing the test prove?',
              answerOutline: `A witness proves that $n$ is composite. Passing proves nothing with certainty, but gives strong probabilistic evidence.`,
            },
            {
              question: 'Why does the Miller-Rabin test catch $561$ when the Fermat test does not?',
              answerOutline: `It finds a nontrivial square root of $1$, namely $67$, which cannot exist modulo a prime.`,
            },
            {
              question: 'Can a Carmichael number be even?',
              answerOutline: `No. A Carmichael number is squarefree and composite, so if it were even it would have an odd prime factor $p$, and the even number $p-1$ would have to divide the odd number $n-1$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'toy-cryptography-lab',
        title: 'Toy cryptography lab',
        description: `Build a toy RSA system and attack it, using your own number theory code. Generate primes with Miller-Rabin, create keys, and implement encryption and decryption both directly and with the Chinese remainder theorem, measuring the speed difference. Then demonstrate attacks on badly chosen parameters: a modulus with close primes (Fermat factorisation), a broadcast with $e=3$, a common modulus, and a shared prime between two moduli. This is for learning, so state clearly in your README that it is not safe for real use.`,
        deliverables: [
          'A Miller-Rabin implementation with a prime generator, tested against SymPy',
          'RSA key generation, encryption and decryption with $1024$-bit moduli, and CRT decryption timings',
          'Working demonstrations of at least four attacks on deliberately weak keys',
          'A table of how many of the composites below $10^6$ pass each of the first few bases',
          'A short note on why padding defeats each attack that it does defeat',
        ],
        estimatedHours: 7,
        stretchGoals: ['Implement Pollard p-1 and find a key that it breaks', 'Add a Wiener attack for small private exponents using continued fractions'],
      },
    },
    {
      slug: 'primitive-roots',
      title: 'Primitive Roots',
      description:
        'The order of a residue, the proof that primitive roots exist modulo primes, and discrete logarithms and the cryptography built on them.',
      lessons: [
        {
          slug: 'orders-modulo-n',
          title: 'The order of a residue',
          summary:
            'How often powers of a residue repeat, and what that says about factors and decimal expansions.',
          estimatedMinutes: 120,
          objectives: [
            'Compute the order of a residue, using divisibility to save work',
            'Prove the basic rules for orders',
            'Use orders to restrict possible prime factors of Mersenne numbers',
            'Explain the period of a decimal expansion',
          ],
          concepts: [
            'Order of $a$ modulo $n$',
            'Order divides $\\varphi(n)$',
            'Order of a power',
            'Order of a product',
            'Factors of $2^p-1$',
            'Decimal period',
          ],
          explanation: `For $\\gcd(a,n)=1$, the **order** $\\operatorname{ord}_n(a)$ is the least $k\\ge 1$ with $a^k\\equiv 1\\pmod n$. It exists by Euler's theorem. The key fact is
$$a^k\\equiv 1\\pmod n\\iff\\operatorname{ord}_n(a)\\mid k.$$
To prove it, divide $k$ by the order $d$: $k=qd+r$ with $0\\le r<d$, so $a^r\\equiv 1$, and minimality gives $r=0$. In particular, the order divides $\\varphi(n)$, so you only need to test divisors of $\\varphi(n)$.

Two rules are used constantly. First,
$$\\operatorname{ord}_n(a^k)=\\frac{\\operatorname{ord}_n(a)}{\\gcd(\\operatorname{ord}_n(a),k)}.$$
Second, if $a$ and $b$ have coprime orders $r$ and $s$, then $ab$ has order $rs$. Without coprimality this fails: modulo $7$, both $3$ and $5$ have order $6$, but $3\\cdot 5\\equiv 1$ has order $1$.

**Worked example.** Find the orders of $2$ and $3$ modulo $17$. The order divides $16$, so it is a power of $2$. For base $2$: $2^2=4$, $2^4=16\\equiv-1$, $2^8\\equiv 1$. So the order is $8$. For base $3$: $3^2=9$, $3^4=81\\equiv 13$, and $3^8\\equiv 169\\equiv 16\\equiv-1$. So $3^{16}\\equiv 1$ while $3^8\\not\\equiv 1$. Since the order is a divisor of $16$ that does not divide $8$, it is $16$. This required only a few squarings, and $3$ generates all the nonzero residues modulo $17$.

**Application to Mersenne numbers.** Let $p$ be an odd prime and let $q$ be a prime dividing $2^p-1$. Then $2^p\\equiv 1\\pmod q$, so the order of $2$ modulo $q$ divides $p$. It is not $1$, so it is exactly $p$. Hence $p\\mid q-1$. Since $q$ is odd, $q-1$ is also even, and so $q\\equiv 1\\pmod{2p}$. For $2^{11}-1=2047$, a prime factor must be $1$ modulo $22$. The first candidate is $23$, and indeed $2047=23\\cdot 89$. This is why Mersenne numbers can be tested for small factors so quickly: only a sparse sequence of primes needs checking.

**Decimal expansions.** If $p\\ne 2,5$, then the decimal expansion of $1/p$ is purely periodic, with period $\\operatorname{ord}_p(10)$. To see this, a period $k$ means $10^k\\cdot\\frac1p-\\frac1p$ is an integer, that is, $p\\mid 10^k-1$. So $1/7=0.\\overline{142857}$ has period $6$, because $10$ has order $6$ modulo $7$. The longest possible period is $p-1$.`,
          resources: [
            conrad('ugradnumthy/ordersmodm.pdf', 'Orders in modular arithmetic', 'All the rules here, with proofs and applications.'),
            stein('The discussion of multiplicative orders in the chapter on the ring of integers modulo $n$.'),
            raji('The chapter on primitive roots starts with the order of an integer.'),
          ],
          exercises: [
            {
              slug: 'order-table',
              title: 'A table of orders',
              prompt: `Find the order of every nonzero residue modulo $13$. How many have each order, and how does this compare with $\\varphi(d)$ for each divisor $d$ of $12$? Repeat the count modulo $15$, and say what looks different.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'order-of-a-power',
              title: 'Order of a power',
              prompt: `Prove the rule for the order of a power, $\\operatorname{ord}_n(a^k)=\\operatorname{ord}_n(a)/\\gcd(\\operatorname{ord}_n(a),k)$. Then prove that $\\operatorname{ord}_n(ab)=\\operatorname{ord}_n(a)\\operatorname{ord}_n(b)$ when the two orders are coprime.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'factors-of-mersenne',
              title: 'Factors of a Mersenne number',
              prompt: `Prove that any prime factor $q$ of $2^p-1$, with $p$ an odd prime, has $q\\equiv 1\\pmod{2p}$. Use this to find the smallest prime factor of $2^{23}-1$ with hardly any calculation. Show that $2^{13}-1$ is prime, by testing only candidates up to its square root.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'decimal-periods',
              title: 'Periods of decimals',
              prompt: `Prove that the decimal expansion of $1/p$, for $p\\ne 2,5$, has period $\\operatorname{ord}_p(10)$. Find the periods for $p=7,13,17,19$. Show that if the period is even, then the two halves of the period add to all nines.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If the period is 2k then 10^k is a square root of 1 modulo p other than 1, so it is -1.',
            },
          ],
          selfAssessment: [
            {
              question: 'Without listing powers, what are the possible orders modulo $11$?',
              answerOutline: `Divisors of $10$: $1,2,5,10$.`,
            },
            {
              question: 'If $\\operatorname{ord}_n(a)=12$, what is $\\operatorname{ord}_n(a^8)$?',
              answerOutline: `$12/\\gcd(12,8)=3$.`,
            },
            {
              question: 'Why does a prime factor of $2^p-1$ have $q\\equiv 1\\pmod p$?',
              answerOutline: `The order of $2$ modulo $q$ is $p$, and the order divides $q-1$.`,
            },
          ],
        },
        {
          slug: 'existence-of-primitive-roots',
          title: 'Existence of primitive roots',
          summary:
            'A proof by counting that the nonzero residues modulo a prime are all powers of one element, and which other moduli share this.',
          estimatedMinutes: 150,
          objectives: [
            'Prove that primitive roots exist modulo every prime',
            'Test whether $g$ is a primitive root efficiently',
            'Lift a primitive root to prime powers',
            'State exactly which moduli have primitive roots',
          ],
          concepts: [
            'Primitive root',
            'Counting elements of each order',
            'Primitive root test',
            'Lifting to $p^2$',
            'Moduli with primitive roots',
            'Structure of residues modulo $2^k$',
          ],
          explanation: `A **primitive root** modulo $n$ is an $a$ whose order equals $\\varphi(n)$. Then every reduced residue is a power of $a$. In group language, the unit group modulo $n$ is cyclic.

**Theorem.** Every prime $p$ has exactly $\\varphi(p-1)$ primitive roots.

For $d\\mid p-1$, let $\\psi(d)$ count the elements of order $d$ modulo $p$. Suppose $a$ has order $d$. Then $1,a,\\dots,a^{d-1}$ are $d$ distinct roots of $x^d-1$. A nonzero polynomial of degree $d$ has at most $d$ roots modulo a prime, by the factor theorem, so these are all the roots, and every element of order $d$ is among them. The powers $a^k$ of order exactly $d$ are those with $\\gcd(k,d)=1$, so there are $\\varphi(d)$. Hence $\\psi(d)$ is either $0$ or $\\varphi(d)$. But every nonzero residue has some order, so
$$\\sum_{d\\mid p-1}\\psi(d)=p-1=\\sum_{d\\mid p-1}\\varphi(d).$$
Since $\\psi(d)\\le\\varphi(d)$ termwise, equality holds for each $d$. In particular, $\\psi(p-1)=\\varphi(p-1)>0$. The proof uses primality exactly once, in the root bound.

**Testing.** Given the prime factors $q$ of $p-1$, $g$ is a primitive root exactly when $g^{(p-1)/q}\\not\\equiv 1\\pmod p$ for every such $q$. If the order were a proper divisor of $p-1$, then it would divide $(p-1)/q$ for some prime $q$.

**Worked example.** Find a primitive root modulo $23$. Here $22=2\\cdot 11$, so test exponents $22/2=11$ and $22/11=2$.

- $g=2$: $2^{11}=2048=89\\cdot 23+1$, so $2^{11}\\equiv 1$. Not a primitive root.
- $g=3$: $3^{11}\\equiv 1$ as well. Not a primitive root.
- $g=4$: a square, so $4^{11}=2^{22}\\equiv 1$. Not one.
- $g=5$: $5^2\\equiv 2$, and $5^{11}\\equiv-1$. Neither is $1$, so $5$ is a primitive root.

There are $\\varphi(22)=10$ primitive roots in all, and these are $5^k$ with $k$ coprime to $22$.

**Prime powers.** If $g$ is a primitive root modulo an odd prime $p$, then one of $g$ and $g+p$ is a primitive root modulo $p^2$. Moreover, a primitive root modulo $p^2$ is a primitive root modulo every $p^k$. For $p=23$, we have $5^{22}\\equiv 323\\not\\equiv 1\\pmod{529}$. This is the condition that makes $5$ work modulo $23^2$, and so modulo all powers of $23$.

**Complete answer.** Primitive roots exist modulo $n$ exactly when $n=1,2,4,p^k$ or $2p^k$ for an odd prime $p$. If $n=ab$ with $a,b>2$ coprime, both $\\varphi(a)$ and $\\varphi(b)$ are even, so every order divides $\\varphi(n)/2$. For $k\\ge 3$, the residues modulo $2^k$ are $\\pm5^j$, and no element has order above $2^{k-2}$.`,
          resources: [
            conrad('grouptheory/cyclicmodp.pdf', 'Cyclicity of (Z/(p))×', 'Several proofs of existence, including the one here.'),
            stein('See the section on the existence of primitive roots.'),
            ocw781('The lecture notes on primitive roots include the prime power case.'),
          ],
          exercises: [
            {
              slug: 'find-primitive-roots',
              title: 'Smallest primitive roots',
              prompt: `Find the smallest positive primitive root modulo $41$, $71$, $191$, $25$ and $18$, testing only the exponents required. Prove that there is no primitive root modulo $15$. How many primitive roots does $191$ have?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'lifting-primitive-roots',
              title: 'Lifting to the square of a prime',
              prompt: `Let $g$ be a primitive root modulo an odd prime $p$. Show that the order of $g$ modulo $p^2$ is $p-1$ or $p(p-1)$. Prove that at most one of $g$ and $g+p$ has order $p-1$ modulo $p^2$, and conclude that a primitive root modulo $p^2$ exists.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Expand (g + p)^(p-1) modulo p^2 with the binomial theorem.',
            },
            {
              slug: 'powers-of-two',
              title: 'Residues modulo powers of two',
              prompt: `Prove that for $k\\ge 3$ there is no primitive root modulo $2^k$. Prove that $5$ has order $2^{k-2}$ modulo $2^k$, and deduce that every odd residue is uniquely $\\pm 5^j$ with $0\\le j<2^{k-2}$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'sum-and-product-of-roots',
              title: 'Sums and products of primitive roots',
              prompt: `For a prime $p>3$, prove that the product of all primitive roots modulo $p$ is congruent to $1$. Then show that their sum is congruent to $\\mu(p-1)$ modulo $p$, where $\\mu$ is the Mobius function defined in the final module, for $p=7,11,13$ by direct calculation.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many primitive roots has $p=31$?',
              answerOutline: `$\\varphi(30)=8$.`,
            },
            {
              question: 'Which exponents must you test to show that $g$ is a primitive root modulo $31$?',
              answerOutline: `$30/2=15$, $30/3=10$, $30/5=6$. It is a primitive root if none of those powers is $1$.`,
            },
            {
              question: 'Why does $n=15$ have no primitive root?',
              answerOutline: `$\\varphi(15)=8$, but every unit satisfies $a^4\\equiv 1$, since $a^4\\equiv1$ modulo $3$ and modulo $5$.`,
            },
          ],
        },
        {
          slug: 'discrete-logarithms',
          title: 'Discrete logarithms',
          summary:
            'Exponents as coordinates, solving power congruences, and the hard problem behind Diffie-Hellman.',
          estimatedMinutes: 140,
          objectives: [
            'Use indices to solve power congruences',
            'Count solutions of $x^k\\equiv a\\pmod p$',
            'Carry out baby-step giant-step',
            'Explain Diffie-Hellman key exchange and its assumption',
          ],
          concepts: [
            'Index (discrete logarithm)',
            'Laws of indices',
            'Power residues',
            'Baby-step giant-step',
            'Diffie-Hellman key exchange',
            'Pohlig-Hellman reduction',
          ],
          explanation: `Fix a primitive root $g$ modulo a prime $p$. Every nonzero $a$ is $g^y$ for a unique $y$ modulo $p-1$. This $y$ is the **index** or **discrete logarithm** of $a$, written $\\operatorname{ind}_g a$. It behaves like a logarithm: $\\operatorname{ind}(ab)\\equiv\\operatorname{ind}a+\\operatorname{ind}b$ and $\\operatorname{ind}(a^k)\\equiv k\\operatorname{ind}a\\pmod{p-1}$.

So multiplication modulo $p$ becomes addition modulo $p-1$, and $x^k\\equiv a$ becomes the linear congruence $k\\operatorname{ind}x\\equiv\\operatorname{ind}a\\pmod{p-1}$. By the theory of linear congruences, with $d=\\gcd(k,p-1)$, there are $d$ solutions when $a^{(p-1)/d}\\equiv 1\\pmod p$, and none otherwise.

**Worked example 1.** Solve $x^4\\equiv 3\\pmod{13}$, with primitive root $2$. The powers $2^1,\\dots,2^{12}$ are $2,4,8,3,6,12,11,9,5,10,7,1$. So $\\operatorname{ind}3=4$. Writing $x=2^y$, we need $4y\\equiv 4\\pmod{12}$, that is, $y\\equiv 1\\pmod 3$. So $y=1,4,7,10$, and $x\\equiv 2,3,11,10$. Check: $3^4=81\\equiv 3$.

**Computing logarithms.** Exponentiation is fast, but no comparably fast method for general discrete logarithms is known. **Baby-step giant-step** does much better than trying all exponents. Let $m=\\lceil\\sqrt{p-1}\\rceil$, and write the unknown as $x=im+j$ with $0\\le i,j<m$. Then $g^{x}=a$ becomes $g^j=a\\,g^{-im}$. So tabulate $g^j$, then step through $a\\,g^{-im}$ looking for a match. This takes about $\\sqrt p$ time and memory.

**Worked example 2.** Solve $2^x\\equiv 45\\pmod{101}$, with $m=11$. The baby steps $2^j$ for $j=0,\\dots,10$ are $1,2,4,8,16,32,64,27,54,7,14$. Next, $2^{11}\\equiv 28$, and $28^{-1}\\equiv 83\\pmod{101}$. So the giant steps multiply by $83$, starting from $45$: they are $45,99,36,59,49,27$. The value $27$ occurs at $i=5$, and equals the baby step with $j=7$. Therefore $x=5\\cdot 11+7=62$.

If $p-1$ has only small prime factors, the **Pohlig-Hellman** method reduces the problem to those factors using the Chinese remainder theorem. So safe parameters use a $p$ for which $p-1$ has a large prime factor.

**Diffie-Hellman.** Two people want to agree on a secret over a public channel. They fix a prime $p$ and base $g$. One chooses a secret $a$ and sends $A=g^a$. The other chooses $b$ and sends $B=g^b$. Then each can compute $g^{ab}$, as $B^a=A^b$. An eavesdropper sees $g,A,B$ only. Recovering $g^{ab}$ appears to require a discrete logarithm. This is an assumption, not a theorem. Note that this exchange by itself does not authenticate anyone, so an active attacker in the middle can defeat it.`,
          resources: [
            stein('The chapter on public-key cryptography treats Diffie-Hellman and the discrete log problem.'),
            shoup('See the chapters on finding generators and computing discrete logarithms.'),
            { title: 'Handbook of Applied Cryptography', url: 'https://cacr.uwaterloo.ca/hac/', type: 'textbook', cost: 'free', provider: 'Menezes, van Oorschot and Vanstone', note: 'The chapter on number-theoretic reference problems describes the algorithms here.' },
          ],
          exercises: [
            {
              slug: 'power-congruences',
              title: 'Power congruences',
              prompt: `Using the table of powers of $2$ modulo $13$, solve (a) $x^3\\equiv 8$; (b) $x^6\\equiv 12$; (c) $x^6\\equiv 4\\pmod{13}$. Prove the criterion that $x^k\\equiv a\\pmod p$ is solvable if and only if $a^{(p-1)/d}\\equiv 1$, where $d=\\gcd(k,p-1)$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'baby-step-code',
              title: 'Baby-step giant-step',
              prompt: `Implement baby-step giant-step. Use it to solve $2^x\\equiv 123456\\pmod{1000003}$, and confirm the answer by exponentiation. Then measure the running time for primes near $10^{10}$ and $10^{12}$, and compare with $\\sqrt p$.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'diffie-hellman-toy',
              title: 'A toy key exchange',
              prompt: `With $p=97$ and $g=5$, one party picks $a=36$ and the other $b=58$. Compute the public values $A$ and $B$, and the shared secret, from both sides. Explain the attack if $g$ has small order, for example if $g=96$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'pohlig-hellman',
              title: 'Pohlig-Hellman for a Fermat prime',
              prompt: `Let $p=257$, so $p-1=2^8$, with primitive root $3$. Solve $3^x\\equiv 100\\pmod{257}$ one binary digit at a time: find the low bit of $x$ by raising both sides to the power $128$, then strip it and repeat. Explain why a prime of this form would be a bad choice for Diffie-Hellman.`,
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How many solutions does $x^6\\equiv 1\\pmod{13}$ have?',
              answerOutline: `$\\gcd(6,12)=6$, and $1^{2}=1$, so there are $6$.`,
            },
            {
              question: 'What is the running time of baby-step giant-step, and why?',
              answerOutline: `About $\\sqrt p$ operations and memory, because writing $x=im+j$ splits the search into two lists of size $\\sqrt p$.`,
            },
            {
              question: 'Does Diffie-Hellman protect against an active attacker?',
              answerOutline: `No. Without authentication, an attacker can run separate exchanges with each side.`,
            },
          ],
        },
      ],
      project: {
        slug: 'discrete-log-lab',
        title: 'Discrete logarithm lab',
        description: `Compare algorithms for the discrete logarithm problem on primes of increasing size. Implement a primitive root finder, brute force, baby-step giant-step, Pollard's rho for logarithms, and Pohlig-Hellman, and measure each. Use the data to answer practical questions: how does running time scale with $p$, how much does the factorisation of $p-1$ matter, and how large would $p$ need to be for brute-force baby-step giant-step to be infeasible? Your code should also find the distribution of orders of the elements, and show it matches $\\varphi(d)$.`,
        deliverables: [
          'A primitive root finder that uses the factorisation of $p-1$',
          'Implementations of brute force, baby-step giant-step and Pollard rho for discrete logarithms',
          'A Pohlig-Hellman implementation, demonstrated on a $60$-bit prime whose $p-1$ is smooth',
          'A plot of running time against $p$ for each method, on log-log axes',
          'A paragraph on choosing Diffie-Hellman parameters, based on your measurements',
        ],
        estimatedHours: 6,
        stretchGoals: ['Implement index calculus for a prime near $10^{20}$'],
      },
    },
    {
      slug: 'quadratic-reciprocity',
      title: 'Quadratic Reciprocity',
      description:
        'Which residues are squares, the Legendre symbol, and a complete proof of the law linking $p$ and $q$.',
      lessons: [
        {
          slug: 'quadratic-residues',
          title: 'Quadratic residues and Euler\'s criterion',
          summary:
            'Half of the nonzero residues modulo an odd prime are squares, and a power tells you which half.',
          estimatedMinutes: 130,
          objectives: [
            'List the quadratic residues modulo an odd prime',
            'Define the Legendre symbol',
            'Prove Euler\'s criterion and multiplicativity',
            'Decide when $-1$ is a square modulo $p$',
          ],
          concepts: [
            'Quadratic residue and nonresidue',
            'Legendre symbol',
            'Euler\'s criterion',
            'Multiplicativity',
            'First supplementary law',
          ],
          explanation: `Let $p$ be an odd prime and $p\\nmid a$. We say $a$ is a **quadratic residue** modulo $p$ if $x^2\\equiv a\\pmod p$ is solvable, and a **nonresidue** otherwise. Since $x^2\\equiv y^2$ means $x\\equiv\\pm y$, the squaring map is two-to-one on nonzero residues. So exactly $(p-1)/2$ residues are squares, and exactly as many are not.

The **Legendre symbol** $\\left(\\frac ap\\right)$ is $1$ if $a$ is a residue, $-1$ if a nonresidue, and $0$ if $p\\mid a$.

**Euler's criterion.** $\\left(\\frac ap\\right)\\equiv a^{(p-1)/2}\\pmod p$.

To prove this, let $g$ be a primitive root, and write $a=g^k$. Then $a$ is a square exactly when $k$ is even: if $k=2j$ then $a=(g^j)^2$, and the even powers number $(p-1)/2$, which are all the squares. Now $g^{(p-1)/2}$ squares to $1$ and is not $1$, so it is $-1$. Hence $a^{(p-1)/2}=(-1)^k$, which is $+1$ for even $k$ and $-1$ for odd $k$.

Two consequences follow immediately. First, the symbol is **multiplicative**:
$$\\left(\\frac{ab}p\\right)=\\left(\\frac ap\\right)\\left(\\frac bp\\right).$$
A product of two nonresidues is a residue. This would be surprising without the index picture, where it says that odd plus odd is even. Second, $\\left(\\frac{-1}p\\right)=(-1)^{(p-1)/2}$. So $-1$ is a square modulo $p$ exactly when $p\\equiv 1\\pmod 4$.

**Worked example.** Take $p=11$. The squares of $1,\\dots,5$ are $1,4,9,5,3$, so the residues are $\\{1,3,4,5,9\\}$, and the nonresidues are $\\{2,6,7,8,10\\}$. Check Euler's criterion with $(p-1)/2=5$. We get $5^5=3125=284\\cdot 11+1\\equiv 1$, consistent with $5$ being a residue. Also, $2^5=32\\equiv-1$, consistent with $2$ being a nonresidue. Since $11\\equiv 3\\pmod 4$, $-1\\equiv 10$ is a nonresidue. Notice also that $2\\cdot 6=12\\equiv 1$ and $2\\cdot 7=14\\equiv 3$. The product of two nonresidues is a residue in both cases.

**An application.** If an odd prime $q$ divides $n^2+1$, then $n^2\\equiv-1\\pmod q$, so $q\\equiv 1\\pmod 4$. Take primes $p_1,\\dots,p_k$ all congruent to $1$ modulo $4$, and consider $N=(2p_1\\cdots p_k)^2+1$. It is odd and has a prime factor, which must be $1$ modulo $4$ and cannot be any $p_i$. So there are infinitely many primes congruent to $1$ modulo $4$. This was the case that the earlier simple arguments could not reach.

Euler's criterion gives a fast test: $a^{(p-1)/2}\\bmod p$ takes only about $\\log_2p$ multiplications. But it says nothing about the pattern of which primes have a given $a$ as a residue. That is what reciprocity answers.`,
          resources: [
            stein('Read the chapter on quadratic reciprocity.'),
            conrad('ugradnumthy/minus1squaremodp.pdf', 'When is -1 a square modulo primes?', 'A detailed look at the first supplementary law.'),
            conrad('ugradnumthy/QuadraticResiduePatterns.pdf', 'Quadratic residue patterns modulo a prime', 'How often patterns of residues occur.'),
          ],
          exercises: [
            {
              slug: 'residue-lists',
              title: 'Lists of residues',
              prompt: `List the quadratic residues modulo $13$ and modulo $17$. Check Euler's criterion for two residues and two nonresidues in each case. Why is the list symmetric under $a\\mapsto p-a$ for these primes, and why would it not be for $p=19$?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'euler-without-roots',
              title: 'Euler\'s criterion without primitive roots',
              prompt: `Prove Euler's criterion without using a primitive root: show that every quadratic residue satisfies $x^{(p-1)/2}-1\\equiv 0$, and then count roots. Deduce that a nonresidue must satisfy $a^{(p-1)/2}\\equiv-1$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'character-sum',
              title: 'A character sum',
              prompt: `Prove that $\\sum_{a=1}^{p-1}\\left(\\frac ap\\right)=0$ for an odd prime $p$. Use this to show that $\\sum_{x=0}^{p-1}\\left(\\frac{x^2+1}{p}\\right)$ equals $-1$, or else check it by computer for $p\\le 100$. Use this to count solutions of $x^2+1\\equiv y^2\\pmod p$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Rewrite the equation as (y - x)(y + x) = 1 and count directly, then compare.',
            },
            {
              slug: 'consecutive-residues',
              title: 'Consecutive residues',
              prompt: `Let $R$ count the values $a$ in $1,\\dots,p-2$ for which $a$ and $a+1$ are both quadratic residues modulo the odd prime $p$. Find $R$ by computer for primes up to $50$, guess a formula depending on $p$ modulo $4$, and prove it using the sum $\\sum_a\\left(1+\\left(\\frac ap\\right)\\right)\\left(1+\\left(\\frac{a+1}p\\right)\\right)$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How many quadratic residues are there modulo $101$?',
              answerOutline: `$(101-1)/2=50$ nonzero residues.`,
            },
            {
              question: 'Is $-1$ a square modulo $101$? Modulo $103$?',
              answerOutline: `Yes for $101\\equiv 1\\pmod 4$, and no for $103\\equiv 3\\pmod 4$.`,
            },
            {
              question: 'Is the product of two nonresidues modulo $p$ a residue?',
              answerOutline: `Yes, as the symbol is multiplicative and $(-1)(-1)=1$.`,
            },
          ],
        },
        {
          slug: 'gauss-lemma',
          title: 'Gauss\'s lemma and the symbol of two',
          summary:
            'A counting criterion for the Legendre symbol, and when $2$ is a square.',
          estimatedMinutes: 130,
          objectives: [
            'State and prove Gauss\'s lemma',
            'Compute a Legendre symbol by Gauss\'s lemma',
            'Derive the second supplementary law',
            'Apply the law for $2$ to factor Mersenne numbers',
          ],
          concepts: [
            'Least absolute residue',
            'Gauss\'s lemma',
            'Second supplementary law',
            'Primes modulo $8$',
            'Sophie Germain primes',
          ],
          explanation: `Let $p$ be an odd prime, $h=(p-1)/2$, and $p\\nmid a$. Reduce each of $a,2a,\\dots,ha$ modulo $p$ to the range between $-p/2$ and $p/2$. These are the **least absolute residues**. Let $\\mu$ be the number that are negative.

**Gauss's lemma.** $\\left(\\frac ap\\right)=(-1)^\\mu$.

The idea is that the absolute values of those residues are $1,2,\\dots,h$ in some order. If $ka$ and $la$ had residues equal up to sign, then $k\\equiv\\pm l\\pmod p$, but both lie between $1$ and $h$, so $k=l$. Multiplying all of them, we get
$$a\\cdot 2a\\cdots ha\\equiv(-1)^\\mu\\,h!\\pmod p,$$
so $a^hh!\\equiv(-1)^\\mu h!$. Cancelling $h!$ gives $a^h\\equiv(-1)^\\mu$, and Euler's criterion completes the proof.

**Worked example.** Compute $\\left(\\frac3{11}\\right)$. Here $h=5$, and the multiples are $3,6,9,12,15$. Their least absolute residues are $3,-5,-2,1,4$. Two are negative, so $\\mu=2$, and $\\left(\\frac3{11}\\right)=+1$. Indeed, $5^2=25\\equiv 3\\pmod{11}$. Note that the absolute values $3,5,2,1,4$ are a rearrangement of $1,\\dots,5$, as promised.

**The symbol of $2$.** Take $a=2$. The multiples are $2,4,\\dots,2h=p-1$. These are all positive and less than $p$, and those greater than $p/2$ become negative. The number of even numbers at most $p/2$ is $\\lfloor p/4\\rfloor$, so
$$\\mu=h-\\lfloor p/4\\rfloor.$$
Now check each class modulo $8$.

| $p$ | $\\mu$ | parity |
|---|---|---|
| $8k+1$ | $4k-2k=2k$ | even |
| $8k+3$ | $4k+1-2k$ | odd |
| $8k+5$ | $4k+2-(2k+1)$ | odd |
| $8k+7$ | $4k+3-(2k+1)$ | even |

So $2$ is a residue modulo $p$ exactly when $p\\equiv\\pm1\\pmod 8$. This is the **second supplementary law**:
$$\\left(\\frac2p\\right)=(-1)^{(p^2-1)/8}.$$
For example, $\\left(\\frac27\\right)=1$, since $3^2\\equiv 2$. And $\\left(\\frac25\\right)=-1$, since the squares modulo $5$ are $1,4$.

**An application.** Let $p\\equiv 3\\pmod 4$ with $q=2p+1$ also prime. Then $q\\equiv 7\\pmod 8$, so $2$ is a residue modulo $q$. Euler's criterion then gives $2^{(q-1)/2}=2^p\\equiv 1\\pmod q$. So $q\\mid 2^p-1$. For example, $p=11$ gives $23\\mid 2^{11}-1$, and $p=23$ gives $47\\mid 2^{23}-1$. This explains why those Mersenne numbers were composite, and it means that a prime $p>3$ of this kind can never give a Mersenne prime.`,
          resources: [
            stein('See the proof of Gauss\'s lemma in the chapter on quadratic reciprocity.'),
            raji('See the section on the Legendre symbol and Gauss\'s lemma.'),
            ocw781('The notes on quadratic residues cover the lemma and the symbol of $2$.'),
          ],
          exercises: [
            {
              slug: 'gauss-lemma-proof',
              title: 'Write out the proof',
              prompt: `Write a complete proof of Gauss's lemma, taking care to justify that the absolute values of the reduced multiples are distinct and in the range from $1$ to $h$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'gauss-by-hand',
              title: 'Gauss\'s lemma by hand',
              prompt: `Use Gauss's lemma to compute $\\left(\\frac5{13}\\right)$ and $\\left(\\frac7{17}\\right)$. List the least absolute residues in each case, and check each answer against the list of squares.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'symbol-of-minus-two',
              title: 'Minus two',
              prompt: `Use the two supplementary laws to find which odd primes $p$ have $-2$ as a quadratic residue. Express the answer as a condition on $p$ modulo $8$, and check it for all primes below $50$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'seven-mod-eight',
              title: 'Primes congruent to seven modulo eight',
              prompt: `Prove that there are infinitely many primes congruent to $7$ modulo $8$. Given $p_1,\\dots,p_k$ of this form, let $P$ be their product and study $M=8P^2-1$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Note that 2M + 2 = (4P)^2. Any odd prime factor of M therefore has 2 as a residue, so it is 1 or 7 mod 8. If all were 1 then M would be 1 mod 8.',
            },
            {
              slug: 'mersenne-and-germain',
              title: 'Mersenne numbers and doubled primes',
              prompt: `Prove that if $p\\equiv 3\\pmod 4$ and $q=2p+1$ is prime, then $q\\mid 2^p-1$. Use this to find a factor of $2^{83}-1$ and of $2^{131}-1$, after checking that the conditions apply.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'For which $p$ is $2$ a quadratic residue?',
              answerOutline: `$p\\equiv\\pm1\\pmod 8$.`,
            },
            {
              question: 'What does $\\mu$ count in Gauss\'s lemma?',
              answerOutline: `The number of the multiples $a,2a,\\dots,ha$ whose least absolute residue modulo $p$ is negative.`,
            },
            {
              question: 'Is $2$ a square modulo $31$? Find a square root if so.',
              answerOutline: `Yes, as $31\\equiv 7\\pmod 8$. For example, $8^2=64\\equiv 2$.`,
            },
          ],
        },
        {
          slug: 'proof-of-reciprocity',
          title: 'The law of quadratic reciprocity',
          summary:
            'The statement, how it computes symbols, and Eisenstein\'s lattice point proof.',
          estimatedMinutes: 180,
          objectives: [
            'State quadratic reciprocity and both supplementary laws',
            'Compute Legendre symbols using reciprocity',
            'Describe the set of primes for which a given $a$ is a residue',
            'Prove the law by counting lattice points',
          ],
          concepts: [
            'Law of quadratic reciprocity',
            'Flipping a symbol',
            'Sum of floor functions',
            'Lattice points in a rectangle',
            'Eisenstein\'s proof',
          ],
          explanation: `**Quadratic reciprocity.** For distinct odd primes $p,q$,
$$\\left(\\frac pq\\right)\\left(\\frac qp\\right)=(-1)^{\\frac{p-1}2\\cdot\\frac{q-1}2}.$$
That is, the two symbols are equal unless $p\\equiv q\\equiv 3\\pmod 4$, in which case they are opposite. A question about squares modulo $q$ turns into a question modulo $p$. It is remarkable because nothing obvious connects the two.

**Worked example.** Compute $\\left(\\frac{365}{1847}\\right)$, where $1847$ is prime. Since $365=5\\cdot 73$, it is $\\left(\\frac5{1847}\\right)\\left(\\frac{73}{1847}\\right)$. Both $5$ and $73$ are $1$ modulo $4$, so both symbols flip with no sign:
$$\\left(\\frac5{1847}\\right)=\\left(\\frac{1847}5\\right)=\\left(\\frac25\\right)=-1.$$
Also $1847=25\\cdot 73+22$, so
$$\\left(\\frac{73}{1847}\\right)=\\left(\\frac{1847}{73}\\right)=\\left(\\frac{22}{73}\\right)=\\left(\\frac2{73}\\right)\\left(\\frac{11}{73}\\right).$$
Since $73\\equiv 1\\pmod 8$, $\\left(\\frac2{73}\\right)=1$. Then $\\left(\\frac{11}{73}\\right)=\\left(\\frac{73}{11}\\right)=\\left(\\frac7{11}\\right)$. Both $7$ and $11$ are $3$ modulo $4$, so $\\left(\\frac7{11}\\right)=-\\left(\\frac{11}7\\right)=-\\left(\\frac47\\right)=-1$. The product is $(-1)(1)(-1)=1$. So $365$ is a square modulo $1847$, although this tells you nothing about what its square root is.

**Proof, following Eisenstein.** Let $h=(p-1)/2$, $k=(q-1)/2$.

*Step 1.* Let $a$ be odd with $p\\nmid a$. Then $\\mu\\equiv\\sum_{j=1}^h\\lfloor ja/p\\rfloor\\pmod 2$, where $\\mu$ is the count in Gauss's lemma. Write each $ja=p\\lfloor ja/p\\rfloor+r_j$, and sum. Comparing with the sum of the absolute residues gives a congruence modulo $2$ where $a$ and $p$ both count as odd. Terms cancel and leave this formula.

*Step 2.* So $\\left(\\frac qp\\right)=(-1)^{S_1}$ with $S_1=\\sum_{j=1}^h\\lfloor jq/p\\rfloor$, and $\\left(\\frac pq\\right)=(-1)^{S_2}$ with $S_2=\\sum_{l=1}^k\\lfloor lp/q\\rfloor$.

*Step 3.* Consider the lattice points $(x,y)$ with $1\\le x\\le h$ and $1\\le y\\le k$. There are $hk$ of them. None lies on the line $py=qx$, because $p$ and $q$ are coprime and $x<p$. Below the line, for each $x=j$, the number of points is $\\lfloor jq/p\\rfloor$, as $\\lfloor jq/p\\rfloor\\le k$ here. So $S_1$ counts the points below. Likewise $S_2$ counts the points above. So $S_1+S_2=hk$, which gives
$$\\left(\\frac pq\\right)\\left(\\frac qp\\right)=(-1)^{S_1+S_2}=(-1)^{hk}.$$

There are hundreds of proofs. This one has the virtue of reducing the mystery to a picture: a rectangle divided by its diagonal.`,
          resources: [
            stein('The chapter on quadratic reciprocity contains two proofs.'),
            { title: 'Quadratic reciprocity', url: 'https://en.wikipedia.org/wiki/Quadratic_reciprocity', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A helpful survey, with supplementary laws and history.' },
            ocw781('Use the notes on reciprocity as a second account.'),
          ],
          exercises: [
            {
              slug: 'step-one',
              title: 'From Gauss to floors',
              prompt: `Prove in detail that for odd $a$ with $p\\nmid a$, the number $\\mu$ in Gauss's lemma satisfies $\\mu\\equiv\\sum_{j=1}^h\\lfloor ja/p\\rfloor\\pmod 2$. Say what changes for even $a$, and recover the second supplementary law from this calculation with $a=p+2$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Let m_1,...,m_mu be the residues above p/2 and n_1,...,n_s the others. Then the p - m_i and the n_j together are 1,...,h.',
            },
            {
              slug: 'rectangle-count',
              title: 'Count the rectangle',
              prompt: `Draw the lattice points for $p=7$ and $q=11$ and compute $S_1$ and $S_2$ directly. Show that $S_1+S_2=15$, and find each symbol. Then give a general proof of Step 3 of the proof, including that no lattice point lies on the diagonal.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'compute-symbols',
              title: 'A batch of symbols',
              prompt: `Compute these symbols by hand, using reciprocity: $\\left(\\frac{29}{53}\\right)$, $\\left(\\frac{219}{383}\\right)$, $\\left(\\frac{713}{1009}\\right)$, $\\left(\\frac{3}{31}\\right)$, $\\left(\\frac{11}{71}\\right)$. Decide whether $x^2\\equiv 1001\\pmod{2027}$ and $x^2\\equiv 7\\pmod{2027}$ are solvable, given that $2027$ is prime.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'which-primes',
              title: 'Which primes',
              prompt: `Use reciprocity to describe all primes $p>5$ such that (a) $3$ is a residue; (b) $-3$ is a residue; (c) $5$ is a residue. State each answer as congruence conditions on $p$, and verify for primes below $100$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pepin-test',
              title: 'Pepin\'s test',
              prompt: `Prove that for $n\\ge 1$, the Fermat number $F_n=2^{2^n}+1$ is prime if and only if $3^{(F_n-1)/2}\\equiv-1\\pmod{F_n}$. Use this to verify by computer that $F_4$ is prime and $F_5$ is composite.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For one direction use Euler\'s criterion and reciprocity with F_n = 2 mod 3. For the other, find the order of 3 modulo a prime factor.',
            },
          ],
          selfAssessment: [
            {
              question: 'When do $\\left(\\frac pq\\right)$ and $\\left(\\frac qp\\right)$ differ?',
              answerOutline: `Exactly when both $p$ and $q$ are $3$ modulo $4$.`,
            },
            {
              question: 'What does the lattice proof count?',
              answerOutline: `Lattice points in the $h\\times k$ rectangle, split by the line $py=qx$. Points below and above give the two exponents.`,
            },
            {
              question: 'Does reciprocity help find a square root?',
              answerOutline: `No. It decides whether one exists. Finding it needs an algorithm such as Tonelli-Shanks.`,
            },
          ],
        },
        {
          slug: 'jacobi-symbol',
          title: 'The Jacobi symbol and modular square roots',
          summary:
            'Computing without factoring, and actually finding square roots.',
          estimatedMinutes: 140,
          objectives: [
            'Define the Jacobi symbol and list its properties',
            'Compute it without factoring',
            'Explain why a Jacobi symbol of $1$ does not imply a square',
            'Find square roots modulo a prime',
          ],
          concepts: [
            'Jacobi symbol',
            'Reciprocity for Jacobi symbols',
            'Euclid-style algorithm',
            'Pseudosquares',
            'Square roots for $p\\equiv 3\\pmod 4$',
            'Tonelli-Shanks',
            'Solovay-Strassen test',
          ],
          explanation: `For an odd positive $n=\\prod p_i^{e_i}$ and $\\gcd(a,n)=1$, the **Jacobi symbol** is
$$\\left(\\frac an\\right)=\\prod_i\\left(\\frac a{p_i}\\right)^{e_i}.$$
It is $0$ if $\\gcd(a,n)>1$. It is multiplicative in $a$ and in $n$, depends only on $a$ modulo $n$, and obeys the same laws as the Legendre symbol. For odd positive coprime $m,n$:
$$\\left(\\frac mn\\right)\\left(\\frac nm\\right)=(-1)^{\\frac{m-1}2\\cdot\\frac{n-1}2},\\quad\\left(\\frac{-1}n\\right)=(-1)^{\\frac{n-1}2},\\quad\\left(\\frac2n\\right)=(-1)^{\\frac{n^2-1}8}.$$
This matters because it means you never need to factor. To compute a Legendre symbol with a large numerator, remove factors of $2$, flip, reduce, and repeat. It works like the Euclidean algorithm, in about $\\log n$ steps.

**Worked example.** Compute $\\left(\\frac{610}{987}\\right)$. Here $987=3\\cdot 7\\cdot 47$ is composite, and the method does not care. Write $610=2\\cdot 305$. Since $987\\equiv 3\\pmod 8$, $\\left(\\frac2{987}\\right)=-1$. Since $305\\equiv 1\\pmod 4$, flipping has no sign:
$$\\left(\\frac{305}{987}\\right)=\\left(\\frac{987}{305}\\right)=\\left(\\frac{72}{305}\\right)=\\left(\\frac2{305}\\right)^3\\left(\\frac9{305}\\right)=1,$$
because $305\\equiv 1\\pmod 8$ and $9$ is a square coprime to $305$. So $\\left(\\frac{610}{987}\\right)=-1$, and $610$ is not a square modulo $987$.

**A warning.** If $\\left(\\frac an\\right)=-1$, then $a$ is not a square modulo $n$. But if $\\left(\\frac an\\right)=1$ and $n$ is composite, $a$ may still fail to be a square. For example, $\\left(\\frac2{15}\\right)=\\left(\\frac23\\right)\\left(\\frac25\\right)=(-1)(-1)=1$, while the squares modulo $15$ coprime to $15$ are only $1$ and $4$. Such $a$ are **pseudosquares**. Telling them from squares is believed to be hard without the factorisation of $n$, and some cryptosystems rely on this.

**The Solovay-Strassen test.** For an odd prime $n$, Euler's criterion says that $a^{(n-1)/2}\\equiv\\left(\\frac an\\right)\\pmod n$. The Jacobi symbol is computable without factoring, so you can compare the two sides. If they differ, then $n$ is composite.

**Finding square roots.** Reciprocity decides whether $x^2\\equiv a\\pmod p$ has a solution, and an algorithm finds it. If $p\\equiv 3\\pmod 4$ and $a$ is a residue, then $x=a^{(p+1)/4}$ works, because
$$x^2=a^{(p+1)/2}=a\\cdot a^{(p-1)/2}\\equiv a.$$
For example, take $p=23$ and $a=2$. Then $2^6=64\\equiv 18$, and $18^2=324=14\\cdot 23+2$. So the roots are $\\pm 18\\equiv 18,5$. For $p\\equiv 1\\pmod 4$ the **Tonelli-Shanks** algorithm writes $p-1=2^sd$ with $d$ odd, and uses a nonresidue to correct an initial guess, step by step.`,
          resources: [
            shoup('The chapter on quadratic reciprocity and computing modular square roots gives both algorithms.'),
            conrad('ugradnumthy/solovaystrassen.pdf', 'Solovay-Strassen test', 'A precise account of the test, including its error bound.'),
            sympyNt('Use `jacobi_symbol` and `sqrt_mod` to check your own implementations.'),
          ],
          exercises: [
            {
              slug: 'jacobi-algorithm',
              title: 'Write the algorithm',
              prompt: `Implement the Jacobi symbol using only the rules above, without factoring. Prove that it performs $O(\\log n)$ steps. Test it against SymPy's function on a million random inputs, or as many as is practical.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'jacobi-reciprocity-proof',
              title: 'Reciprocity for Jacobi symbols',
              prompt: `Deduce the reciprocity law for Jacobi symbols from the Legendre case. You will need the congruence $\\frac{ab-1}2\\equiv\\frac{a-1}2+\\frac{b-1}2\\pmod 2$ for odd $a,b$, which you should prove.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'square-roots-by-hand',
              title: 'Square roots by hand',
              prompt: `Find the square roots of $2$ modulo $47$ and of $3$ modulo $23$, using the formula for $p\\equiv 3\\pmod 4$. Then find the square roots of $10$ modulo $13$ and of $5$ modulo $41$, by any method, and verify them. Find all square roots of $4$ modulo $15$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'solovay-strassen-experiment',
              title: 'Solovay-Strassen on Carmichael numbers',
              prompt: `For $n=561$ and $n=1105$, count the bases $a$ coprime to $n$ for which $a^{(n-1)/2}\\equiv\\left(\\frac an\\right)\\pmod n$. Compare with $\\varphi(n)/2$. Explain why these liars form a subgroup of the units, and why it must be proper if $n$ is composite.`,
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'If $\\left(\\frac an\\right)=1$ for composite $n$, is $a$ a square modulo $n$?',
              answerOutline: `Not necessarily. $\\left(\\frac2{15}\\right)=1$, and $2$ is not a square modulo $15$.`,
            },
            {
              question: 'Why is the Jacobi symbol useful even when you only care about Legendre symbols?',
              answerOutline: `Reciprocity applies to it without factoring the numerator, so you can compute Legendre symbols in about $\\log p$ steps.`,
            },
            {
              question: 'Give the formula for a square root modulo $p\\equiv 3\\pmod 4$.',
              answerOutline: `If $a$ is a residue, then $a^{(p+1)/4}$ is a square root of $a$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'reciprocity-explorer',
        title: 'Reciprocity explorer',
        description: `Investigate the patterns that quadratic reciprocity explains. Write code for Legendre and Jacobi symbols and for Tonelli-Shanks. Then explore: for each small $a$, find the residue classes of primes where $a$ is a residue, and compare with what reciprocity predicts; measure how evenly primes split between residues and nonresidues; and look at the runs of consecutive residues, or the least nonresidue, for primes up to $10^7$. Reproduce the lattice picture of the proof for several pairs of primes as an image.`,
        deliverables: [
          'Legendre, Jacobi and Tonelli-Shanks implementations with tests',
          'A table giving, for each $a$ up to $30$, the predicted classes of $p$ with $\\left(\\frac ap\\right)=1$, verified against primes up to $10^6$',
          'A plot of the least quadratic nonresidue against $p$, with its record values',
          'An image of the lattice point proof for $(p,q)=(7,11)$ and $(11,13)$',
          'A summary of one pattern that you found and either proved or explained',
        ],
        estimatedHours: 6,
        stretchGoals: ['Compare the counts of primes that are residues versus nonresidues at each bound, and research the bias you see'],
      },
    },
    {
      slug: 'further-topics',
      title: 'Further Topics',
      description:
        'Arithmetic functions and Mobius inversion, sums of squares, continued fractions, and solving Diophantine equations, including Pell\'s equation.',
      lessons: [
        {
          slug: 'arithmetic-functions',
          title: 'Arithmetic functions and Mobius inversion',
          summary:
            'Multiplicative functions, Dirichlet convolution and how to invert a sum over divisors.',
          estimatedMinutes: 140,
          objectives: [
            'Compute $\\tau$, $\\sigma$, $\\varphi$ and $\\mu$ from factorisations',
            'Prove that a divisor sum of a multiplicative function is multiplicative',
            'Apply Mobius inversion',
            'Characterise the even perfect numbers',
          ],
          concepts: [
            'Multiplicative function',
            'Divisor functions $\\tau$ and $\\sigma$',
            'Mobius function $\\mu$',
            'Dirichlet convolution',
            'Mobius inversion',
            'Perfect numbers',
          ],
          explanation: `An **arithmetic function** is a function on positive integers. It is **multiplicative** if $f(mn)=f(m)f(n)$ whenever $\\gcd(m,n)=1$, so it is determined by its values on prime powers. Examples are $\\tau(n)$, the number of divisors, and $\\sigma(n)$, the sum of divisors:
$$\\tau(p^k)=k+1,\\qquad\\sigma(p^k)=\\frac{p^{k+1}-1}{p-1}.$$
Multiplicativity comes from a general fact: if $f$ is multiplicative, then so is $F(n)=\\sum_{d\\mid n}f(d)$, because for coprime $m,n$, every divisor of $mn$ factors uniquely as a divisor of $m$ times a divisor of $n$.

The **Mobius function** is $\\mu(1)=1$, with $\\mu(n)=(-1)^r$ if $n$ is a product of $r$ distinct primes, and $\\mu(n)=0$ if $n$ has a squared factor. It is built to satisfy
$$\\sum_{d\\mid n}\\mu(d)=\\begin{cases}1&n=1\\\\0&n>1.\\end{cases}$$
To check this, for $n>1$ with $r$ distinct primes, the sum is $\\sum_j\\binom rj(-1)^j=(1-1)^r=0$.

The **Dirichlet convolution** is $(f*g)(n)=\\sum_{d\\mid n}f(d)g(n/d)$. It is commutative and associative, with identity $\\varepsilon$, where $\\varepsilon(1)=1$ and $\\varepsilon(n)=0$ otherwise. Writing $\\mathbf 1$ for the constant function $1$, the last identity reads $\\mu*\\mathbf 1=\\varepsilon$. So convolving with $\\mu$ undoes convolving with $\\mathbf 1$.

**Mobius inversion.** If $F(n)=\\sum_{d\\mid n}f(d)$ for all $n$, then $f(n)=\\sum_{d\\mid n}\\mu(d)F(n/d)$.

**Worked example.** We know $\\sum_{d\\mid n}\\varphi(d)=n$. Inverting gives
$$\\varphi(n)=\\sum_{d\\mid n}\\mu(d)\\frac nd.$$
For $n=12$ the squarefree divisors are $1,2,3,6$, so $\\varphi(12)=12-6-4+2=4$, which is correct. Next, take $360=2^3\\cdot 3^2\\cdot 5$. Then $\\tau(360)=4\\cdot 3\\cdot 2=24$, and
$$\\sigma(360)=\\frac{2^4-1}{1}\\cdot\\frac{3^3-1}{2}\\cdot\\frac{5^2-1}{4}=15\\cdot 13\\cdot 6=1170.$$

**Perfect numbers.** A number is **perfect** if $\\sigma(n)=2n$. Euclid showed that if $2^p-1$ is prime, then $n=2^{p-1}(2^p-1)$ is perfect. Multiplicativity gives $\\sigma(n)=(2^p-1)\\cdot 2^p=2n$. Euler proved that every even perfect number has this form. For $p=2,3,5,7$ we get $6,28,496,8128$. Whether an odd perfect number exists is a famous open problem.`,
          resources: [
            raji('See the chapter on multiplicative number-theoretic functions.'),
            conrad('ugradnumthy/perfect-numbers-mersenne.pdf', 'Perfect numbers and Mersenne primes', 'The Euclid-Euler theorem in detail.'),
            stein('Use the discussion of Euler\'s function and multiplicativity for background.'),
          ],
          exercises: [
            {
              slug: 'mobius-inversion-proof',
              title: 'Prove Mobius inversion',
              prompt: `Prove the Mobius inversion formula directly, by substituting the definition of $F$ and swapping sums. State the converse, and prove it too.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'convolution-identities',
              title: 'Identities by convolution',
              prompt: `Let $\\mathrm{id}(n)=n$. Show that $\\tau=\\mathbf 1*\\mathbf 1$, $\\sigma=\\mathrm{id}*\\mathbf 1$, $\\varphi=\\mu*\\mathrm{id}$ and $\\varphi*\\tau=\\sigma$. Verify the last identity numerically for all $n$ up to $200$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'even-perfect',
              title: 'Even perfect numbers',
              prompt: `Prove the Euclid-Euler theorem: an even number $n$ is perfect if and only if $n=2^{p-1}(2^p-1)$ with $2^p-1$ prime. In the harder direction, write $n=2^km$ with $m$ odd, and analyse $\\sigma(m)=2^{k+1}m/(2^{k+1}-1)$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'abundant-numbers',
              title: 'Abundant numbers',
              prompt: `A number is abundant if $\\sigma(n)>2n$. Prove that every proper multiple of a perfect number is abundant. Find the smallest odd abundant number by computer, and compute $\\sigma(n)$ for it from its factorisation.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'liouville-function',
              title: 'The Liouville function',
              prompt: `Let $\\lambda(n)=(-1)^{\\Omega(n)}$, where $\\Omega(n)$ counts prime factors with multiplicity. Prove that $\\sum_{d\\mid n}\\lambda(d)$ is $1$ if $n$ is a square, and $0$ otherwise. Write $\\lambda$ as a convolution with $\\mu$ of the indicator of the squares.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\mu(30)$, and $\\mu(12)$?',
              answerOutline: `$\\mu(30)=(-1)^3=-1$, and $\\mu(12)=0$ as $4\\mid 12$.`,
            },
            {
              question: 'Compute $\\sigma(28)$ and state what it shows.',
              answerOutline: `$\\sigma(28)=7\\cdot 8=56=2\\cdot 28$, so $28$ is perfect.`,
            },
            {
              question: 'Why does multiplicativity make these functions easy to compute?',
              answerOutline: `You only need values on prime powers, once you have the factorisation.`,
            },
          ],
        },
        {
          slug: 'sums-of-squares',
          title: 'Sums of squares',
          summary:
            'Which integers are sums of two squares, and how many squares are enough for every integer.',
          estimatedMinutes: 150,
          objectives: [
            'State the two squares theorem',
            'Prove that primes $p\\equiv 1\\pmod 4$ are sums of two squares',
            'Build representations from the product identity',
            'State the three and four square theorems',
          ],
          concepts: [
            'Two squares theorem',
            'Product identity',
            'Thue\'s lemma',
            'Hermite-Serret algorithm',
            'Representation count',
            'Lagrange\'s four square theorem',
            'Legendre\'s three square theorem',
          ],
          explanation: `Which $n$ can be written $a^2+b^2$? Experiment suggests that primes split by class modulo $4$: $5=1+4$ and $13=4+9$ work, but $3,7,11$ do not. The class modulo $4$ alone gives one half: squares are $0$ or $1$ modulo $4$, so a sum of two squares is never $3$ modulo $4$.

**Two squares theorem.** A positive integer $n$ is a sum of two squares if and only if every prime $q\\equiv 3\\pmod 4$ appears in $n$ to an even power.

There are three ingredients. **First, the identity**
$$(a^2+b^2)(c^2+d^2)=(ac-bd)^2+(ad+bc)^2,$$
which is the multiplicativity of the norm in the Gaussian integers. It shows that the set of sums of two squares is closed under multiplication.

**Second, primes.** If $p\\equiv 1\\pmod 4$, then there is an $r$ with $r^2\\equiv-1\\pmod p$. Thue's lemma gives nonzero $x,y$ with $|x|,|y|<\\sqrt p$ and $x\\equiv ry\\pmod p$. To get it, apply the pigeonhole principle to the numbers $u-rv$ with $0\\le u,v<\\sqrt p$. Then $x^2+y^2\\equiv(r^2+1)y^2\\equiv 0\\pmod p$, and $0<x^2+y^2<2p$. So $x^2+y^2=p$.

**Third, the necessity.** If $q\\equiv 3\\pmod 4$ divides $a^2+b^2$, then $q$ divides both $a$ and $b$, since otherwise $(a/b)^2\\equiv-1\\pmod q$. So $q^2\\mid a^2+b^2$, and dividing out and repeating shows that the exponent is even.

**Worked example 1.** Write $41$ as a sum of two squares. Here $9^2=81\\equiv-1\\pmod{41}$. Run the Euclidean algorithm on $41$ and $9$:
$$41=4\\cdot 9+5,\\quad 9=1\\cdot 5+4,\\quad 5=1\\cdot 4+1.$$
The first two remainders below $\\sqrt{41}\\approx 6.4$ are $5$ and $4$, and $5^2+4^2=41$. This is the **Hermite-Serret** method, and it finds the representation quickly even for large primes.

**Worked example 2.** Since $5=1^2+2^2$ and $13=2^2+3^2$, the identity gives two representations of $65$, depending on a choice of sign: $65=1^2+8^2=4^2+7^2$. So representations multiply. With $1105=5\\cdot 13\\cdot 17$, there are four: $4^2+33^2$, $9^2+32^2$, $12^2+31^2$ and $23^2+24^2$. The count of all integer pairs, allowing signs and order, is $r_2(n)=4(d_1(n)-d_3(n))$, where $d_i(n)$ counts divisors of $n$ congruent to $i$ modulo $4$.

**More squares.** Four are always enough: **Lagrange's theorem** says that every positive integer is a sum of four squares. **Legendre's three square theorem** says that $n$ is a sum of three squares exactly when $n$ is not of the form $4^a(8b+7)$. The two facts fit together: $7$ needs four squares.`,
          resources: [
            conrad('ugradnumthy/Zinotes.pdf', 'Gaussian integers', 'Explains the two squares theorem through factorisation in $\\mathbb{Z}[i]$.'),
            conrad('ugradnumthy/Picksumofsq.pdf', 'Sums of two squares and lattices', 'A geometric route to the same theorem.'),
            ocw781('The notes on sums of squares cover several proofs.'),
          ],
          exercises: [
            {
              slug: 'necessity-of-even-exponent',
              title: 'Primes 3 mod 4',
              prompt: `Prove that if a prime $q\\equiv 3\\pmod 4$ divides $a^2+b^2$, then $q$ divides both $a$ and $b$. Use this, with the product identity, to complete the proof of the two squares theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'thue-lemma',
              title: 'Thue\'s lemma',
              prompt: `Prove Thue's lemma: for a prime $p$ and any integer $r$, there exist integers $x,y$, not both zero, with $|x|,|y|<\\sqrt p$ and $x\\equiv ry\\pmod p$. Explain each use of the pigeonhole principle.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'which-are-sums',
              title: 'Which are sums of two squares',
              prompt: `For each of $245$, $1729$, $2025$ and $3150$, decide whether it is a sum of two squares, and give a representation or a reason it has none.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'hermite-serret',
              title: 'Hermite-Serret',
              prompt: `Use $22^2\\equiv-1\\pmod{97}$ and the Euclidean algorithm to write $97$ as a sum of two squares. Then implement the method, and write the prime $1000000000000000000000000000057$ as a sum of two squares. Check first that it is prime and that it is $1$ modulo $4$.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'count-representations',
              title: 'Counting representations',
              prompt: `Verify $r_2(n)=4(d_1(n)-d_3(n))$ by computer for all $n$ up to $5000$. Evaluate $r_2(25)$, $r_2(65)$ and $r_2(1105)$. Prove from the formula, or from Gaussian factorisation, that $r_2(p)=8$ for each prime $p\\equiv 1\\pmod 4$.`,
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Is $90$ a sum of two squares?',
              answerOutline: `Yes. $90=2\\cdot 3^2\\cdot 5$, with $3$ to an even power: $90=3^2+9^2$.`,
            },
            {
              question: 'Why is $21$ not a sum of two squares?',
              answerOutline: `$21=3\\cdot 7$ has primes congruent to $3$ modulo $4$ to an odd power.`,
            },
            {
              question: 'Which is the smallest positive integer that needs four squares?',
              answerOutline: `$7=4+1+1+1$, as it has the form $8b+7$.`,
            },
          ],
        },
        {
          slug: 'continued-fractions',
          title: 'Continued fractions',
          summary:
            'The Euclidean algorithm as a way of writing numbers, and why it gives the best rational approximations.',
          estimatedMinutes: 150,
          objectives: [
            'Compute continued fractions of rationals and quadratic irrationals',
            'Compute convergents by the recurrence',
            'Use convergents as best rational approximations',
            'State Lagrange\'s theorem on periodic continued fractions',
          ],
          concepts: [
            'Simple continued fraction',
            'Partial quotient',
            'Convergent',
            'Recurrence for convergents',
            'Determinant identity',
            'Best approximation',
            'Periodic expansions',
          ],
          explanation: `A **simple continued fraction** is an expression
$$[a_0;a_1,a_2,\\dots]=a_0+\\cfrac1{a_1+\\cfrac1{a_2+\\cdots}}$$
with integers $a_i\\ge 1$ for $i\\ge 1$. To expand $x$, set $a_0=\\lfloor x\\rfloor$, and repeat with $1/(x-a_0)$. For a rational number this is the Euclidean algorithm, and it stops. For an irrational number it continues forever.

**Worked example.** Expand $415/93$. The Euclidean algorithm gives
$$415=4\\cdot 93+43,\\quad 93=2\\cdot 43+7,\\quad 43=6\\cdot 7+1,\\quad 7=7\\cdot 1.$$
So $415/93=[4;2,6,7]$, reading off the quotients.

Truncating gives the **convergents** $p_k/q_k$. They obey
$$p_k=a_kp_{k-1}+p_{k-2},\\qquad q_k=a_kq_{k-1}+q_{k-2},$$
with $p_{-1}=1$, $q_{-1}=0$, $p_{-2}=0$ and $q_{-2}=1$. For the example, these are $4$, $9/2$, $58/13$, $415/93$. Check: $6\\cdot 9+4=58$ and $6\\cdot 2+1=13$, then $7\\cdot 58+9=415$ and $7\\cdot 13+2=93$.

The key identity is
$$p_kq_{k-1}-p_{k-1}q_k=(-1)^{k-1}.$$
So the convergents are in lowest terms, and consecutive ones differ by exactly $1/(q_kq_{k-1})$. They alternate around $x$, with even-indexed convergents below it and odd-indexed ones above it, so
$$\\Bigl|x-\\frac{p_k}{q_k}\\Bigr|<\\frac1{q_kq_{k+1}}<\\frac1{q_k^2}.$$
Since a large partial quotient $a_{k+1}$ makes $q_{k+1}$ large, it gives a very good approximation. For $\\pi=[3;7,15,1,292,\\dots]$ the convergents are $3$, $22/7$, $333/106$, $355/113$. The last one, correct to six decimal places, is so good because $292$ is big.

Convergents are **best approximations**: no fraction with a smaller denominator is closer to $x$. Conversely, Legendre proved that if $|x-p/q|<1/(2q^2)$, then $p/q$ is a convergent.

**Quadratic irrationals.** Expanding $\\sqrt2$: $\\sqrt2=1+(\\sqrt2-1)$, and $1/(\\sqrt2-1)=\\sqrt2+1=2+(\\sqrt2-1)$, which repeats. So $\\sqrt2=[1;2,2,2,\\dots]$. **Lagrange's theorem** says that a continued fraction is eventually periodic if and only if $x$ is a quadratic irrational. For $\\sqrt n$ with $n$ not a square, the expansion has the shape $[a_0;\\overline{a_1,\\dots,a_{\\ell-1},2a_0}]$. For instance, $\\sqrt7=[2;\\overline{1,1,1,4}]$.

The golden ratio $[1;1,1,1,\\dots]$ has all partial quotients $1$, so it is the number that is hardest to approximate by fractions, and its convergents are ratios of Fibonacci numbers.`,
          resources: [
            stein('Read the chapter on continued fractions.'),
            conrad('ugradnumthy/contfrac-neg-invert.pdf', 'Negation and inversion of continued fractions', 'A short note that makes you handle the definitions carefully.'),
            raji('See the chapter on continued fractions for routine practice.'),
          ],
          exercises: [
            {
              slug: 'convergent-recurrence',
              title: 'The recurrence for convergents',
              prompt: `Prove by induction that the recurrences for $p_k$ and $q_k$ give the convergents of $[a_0;a_1,\\dots]$. Then prove the identity $p_kq_{k-1}-p_{k-1}q_k=(-1)^{k-1}$, and deduce that $\\gcd(p_k,q_k)=1$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'square-root-expansions',
              title: 'Expansions of square roots',
              prompt: `Find the continued fractions of $\\sqrt7$, $\\sqrt{13}$ and $\\sqrt{19}$ by hand, using exact arithmetic of the form $(\\sqrt n+b)/c$. Compare the period lengths, and note the symmetry inside each period.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'calendar-rational',
              title: 'Leap year rules',
              prompt: `The tropical year is about $365.2422$ days. Expand $0.2422$ as a continued fraction, and list the first four convergents. Interpret each one as a leap year rule, compare them with the Julian and Gregorian calendars, and estimate the error in days per century for $31/128$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'periodic-is-quadratic',
              title: 'Periodic implies quadratic',
              prompt: `Prove that a number with an eventually periodic continued fraction is a quadratic irrational. Evaluate $[3;\\overline{1,2}]$ exactly.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'A purely periodic x satisfies x = (p x + r)/(q x + s) for integers built from convergents.',
            },
            {
              slug: 'best-approximation',
              title: 'Best approximations',
              prompt: `Let $p/q$ be any fraction with $0<q<q_{k+1}$. Prove that $|qx-p|\\ge|q_kx-p_k|$, and deduce that convergents are best approximations. Use the system $uq_k+vq_{k+1}=q$, $up_k+vp_{k+1}=p$ and the determinant identity.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $\\pi$ have such a good approximation $355/113$?',
              answerOutline: `The next partial quotient, $292$, is large, so $q_{k+1}$ is large and the error bound $1/(q_kq_{k+1})$ is tiny.`,
            },
            {
              question: 'What is the continued fraction of a rational number, and why does it end?',
              answerOutline: `It is the list of quotients in the Euclidean algorithm, which terminates.`,
            },
            {
              question: 'Which real numbers have eventually periodic continued fractions?',
              answerOutline: `Exactly the quadratic irrationals, by Lagrange's theorem.`,
            },
          ],
        },
        {
          slug: 'diophantine-equations',
          title: 'Diophantine equations',
          summary:
            'Pythagorean triples, Fermat\'s descent, and Pell\'s equation solved by continued fractions.',
          estimatedMinutes: 160,
          objectives: [
            'Parametrise all primitive Pythagorean triples',
            'Carry out a proof by infinite descent',
            'Solve Pell\'s equation with continued fractions',
            'Generate all solutions of a Pell equation from the fundamental one',
          ],
          concepts: [
            'Diophantine equation',
            'Pythagorean triple',
            'Infinite descent',
            'Pell\'s equation',
            'Fundamental solution',
            'Congruence obstruction',
          ],
          explanation: `A **Diophantine equation** is a polynomial equation to be solved in integers. There is no general method, and it is a theorem that none can exist in full generality. But several families are completely understood.

**Pythagorean triples.** The primitive solutions of $x^2+y^2=z^2$, with $x$ odd and all positive, are
$$x=m^2-n^2,\\quad y=2mn,\\quad z=m^2+n^2,$$
where $m>n>0$ are coprime and of opposite parity. The proof: $y^2=(z-x)(z+x)$, the factors $(z-x)/2$ and $(z+x)/2$ are coprime, and a product of coprime numbers that is a square has square factors. Taking $m=2$, $n=1$ gives $(3,4,5)$.

**Infinite descent.** Fermat proved that $x^4+y^4=z^2$ has no solutions in positive integers. Take a solution with $z$ minimal. It must be primitive. Then $(x^2,y^2,z)$ is a primitive Pythagorean triple, and applying the parametrisation twice produces a smaller solution, which is a contradiction. In particular, $x^4+y^4=z^4$ has no solutions. The general statement for exponents $n\\ge 3$ is **Fermat's last theorem**, proved by Wiles, with Taylor, using far deeper methods.

**Pell's equation.** Consider $x^2-ny^2=1$, for a positive integer $n$ that is not a square. It has infinitely many solutions in positive integers. The connection to continued fractions is direct. If $x^2-ny^2=1$ with $x,y>0$, then
$$\\Bigl|\\sqrt n-\\frac xy\\Bigr|=\\frac1{y^2(\\sqrt n+x/y)}<\\frac1{2y^2},$$
so $x/y$ is a convergent of $\\sqrt n$. Let $\\ell$ be the period length of the expansion. The least solution, called the **fundamental solution**, is $(p_{\\ell-1},q_{\\ell-1})$ if $\\ell$ is even, and $(p_{2\\ell-1},q_{2\\ell-1})$ if $\\ell$ is odd.

**Worked example.** Solve $x^2-7y^2=1$. Since $\\sqrt7=[2;\\overline{1,1,1,4}]$, we have $\\ell=4$, and we want $(p_3,q_3)$. The partial quotients $2,1,1,1$ give convergents $2$, $3$, $5/2$, $8/3$. So the least solution is $(8,3)$. Check: $64-7\\cdot 9=1$.

Every solution in positive integers comes from powers of the fundamental one: $x_k+y_k\\sqrt n=(x_1+y_1\\sqrt n)^k$. That works because $N(x+y\\sqrt n)=x^2-ny^2$ is multiplicative. Squaring,
$$(8+3\\sqrt7)^2=127+48\\sqrt7,$$
and $127^2-7\\cdot 48^2=16129-16128=1$.

The size of the least solution can be startling. For $n=61$, the period has length $11$, and the least solution is $x=1766319049$, $y=226153980$, while for $n=60$ it is just $(31,4)$.

**Obstructions.** For the related equation $x^2-ny^2=-1$, a congruence may rule out solutions. Modulo $3$, $x^2-3y^2=-1$ would give $x^2\\equiv 2$, which is impossible.`,
          resources: [
            conrad('ugradnumthy/pythagtriple.pdf', 'Pythagorean triples', 'Parametrisations, including the geometric one.'),
            conrad('ugradnumthy/descent.pdf', 'Proofs by descent', 'Fermat\'s method, with several examples.'),
            conrad('ugradnumthy/pelleqn1.pdf', 'Pell\'s equation, I', 'Existence of solutions and their structure.'),
            conrad('ugradnumthy/pelleqn2.pdf', 'Pell\'s equation, II', 'The link with continued fractions.'),
          ],
          exercises: [
            {
              slug: 'pythagorean-parametrisation',
              title: 'All primitive triples',
              prompt: `Prove the parametrisation of primitive Pythagorean triples in full, including that every $m,n$ as stated gives a primitive triple. List all primitive triples with $z\\le 100$; there are $16$ of them.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fermat-four',
              title: 'Fermat\'s descent',
              prompt: `Write out Fermat's proof that $x^4+y^4=z^2$ has no solutions in positive integers, naming the smaller solution explicitly. Deduce the case $n=4$ of Fermat's last theorem, and explain why this reduces the full theorem to odd prime exponents.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'pell-by-continued-fraction',
              title: 'Pell by continued fractions',
              prompt: `Use the continued fraction of $\\sqrt n$ to find the least positive solution of $x^2-ny^2=1$ for $n=7$, $13$ and $61$. For $n=13$, the period is odd: explain how the odd period gives first a solution of $x^2-13y^2=-1$, and what its square gives.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'all-pell-solutions',
              title: 'All solutions of Pell',
              prompt: `Let $(x_1,y_1)$ be the least positive solution of $x^2-ny^2=1$. Prove that every positive solution has $x+y\\sqrt n=(x_1+y_1\\sqrt n)^k$ for some $k\\ge 1$. Suppose that a solution lies strictly between two consecutive powers, and divide to get a smaller solution.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'square-triangular',
              title: 'Square triangular numbers',
              prompt: `Show that the triangular number $k(k+1)/2$ equals $m^2$ exactly when $(2k+1)^2-8m^2=1$. Use Pell's equation to list the first five square triangular numbers greater than $0$, and find a recurrence for them.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which $(m,n)$ produces the triple $(5,12,13)$?',
              answerOutline: `$(3,2)$: $9-4=5$, $2\\cdot 3\\cdot 2=12$, $9+4=13$.`,
            },
            {
              question: 'Why does a solution of Pell\'s equation give a convergent of $\\sqrt n$?',
              answerOutline: `It gives $|\\sqrt n-x/y|<1/(2y^2)$, and Legendre's criterion says such fractions are convergents.`,
            },
            {
              question: 'What does infinite descent prove?',
              answerOutline: `That no solution exists: a minimal solution would produce a smaller one.`,
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'number-theory-toolkit',
    title: 'A number theory toolkit and factoring engine',
    description: `Build a Python library that implements the main algorithms of this course from scratch, using only integer arithmetic, and use it to solve real problems. It should cover the extended Euclidean algorithm, the Chinese remainder theorem, modular exponentiation, Miller-Rabin, orders and primitive roots, baby-step giant-step, the Jacobi symbol, modular square roots by Tonelli-Shanks, continued fractions of quadratic irrationals and Pell's equation.

On top of the library, write a factoring engine that combines trial division, Pollard's rho, and a continued fraction factoring method (CFRAC), which finds congruences $x^2\\equiv y^2\\pmod n$ from the convergents of $\\sqrt n$. Then show the library doing things that would be impossible by brute force: factoring $2^{32}+1$ in milliseconds, finding the least solution of $x^2-61y^2=1$, and writing large primes $p\\equiv 1\\pmod 4$ as sums of two squares.

The accompanying report should explain why each algorithm is correct, proving at least four of the theorems it relies on, and it should measure how running time grows with input size.`,
    deliverables: [
      'A tested Python package with the algorithms listed above and at least 40 unit tests, compared against SymPy where it applies',
      'A factoring engine that factors $2^{32}+1=641\\cdot 6700417$, $2^{67}-1$ and a product of two $15$-digit primes',
      'The least solutions of Pell\'s equation for $n=61$ and $n=109$, verified exactly',
      'A function writing a prime $p\\equiv 1\\pmod 4$ as $a^2+b^2$ using a square root of $-1$ and the Euclidean algorithm, demonstrated on a $30$-digit prime',
      'A report of 4-8 pages with correctness proofs and running time plots',
    ],
    estimatedHours: 16,
    stretchGoals: [
      'Add a quadratic sieve and compare it with CFRAC',
      'Add the Lucas-Lehmer test and verify the Mersenne prime $2^{4423}-1$',
      'Package the library and publish its documentation',
    ],
  },
  masteryChecklist: [
    'I can run the extended Euclidean algorithm by hand and solve linear Diophantine equations',
    'I can prove unique factorisation from Euclid\'s lemma',
    'I can solve systems of congruences with the Chinese remainder theorem, including non-coprime moduli',
    'I can lift solutions of polynomial congruences with Hensel\'s lemma',
    'I can prove Fermat\'s, Euler\'s and Wilson\'s theorems, and explain why RSA works',
    'I can prove that primitive roots exist modulo a prime, and compute discrete logarithms in small cases',
    'I can compute Legendre and Jacobi symbols by hand, and prove quadratic reciprocity',
    'I can use Mobius inversion and characterise which integers are sums of two squares',
    'I can find continued fractions and use them to solve Pell\'s equation',
  ],
});
