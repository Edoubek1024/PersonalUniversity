import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Calculus Volume 2: ${title}`,
  url: `https://openstax.org/books/calculus-volume-2/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const paul = (page: string, title: string, note: string): ResourceInput => ({
  title: `Paul's Online Math Notes: ${title}`,
  url: `https://tutorial.math.lamar.edu/Classes/CalcII/${page}.aspx`,
  type: 'textbook',
  cost: 'free',
  provider: 'Lamar University',
  note,
});

const essence = (note: string): ResourceInput => ({
  title: 'Essence of Calculus',
  url: 'https://www.3blue1brown.com/topics/calculus',
  type: 'video',
  cost: 'free',
  provider: '3Blue1Brown',
  note,
});

const mit1801 = (note: string): ResourceInput => ({
  title: 'MIT 18.01SC Single Variable Calculus',
  url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

export default defineSubject({
  id: 'calculus-2',
  title: 'Calculus II',
  category: 'math',
  tagline:
    'Integration techniques, infinite series and curves in the plane: the tools that turn calculus into a working language for science.',
  description: `Calculus I gave you the derivative, the integral and the fundamental theorem that joins them. This course makes those ideas powerful. First you extend your reach with integration: a toolkit of hand techniques, integrals over infinite ranges, and numerical rules for integrals with no formula. Then you use integrals to measure lengths, centres of mass and probabilities, and to solve your first differential equations.

The second half is about the infinite. What does it mean to add infinitely many numbers? When can a function such as $\\sin x$ be written as an infinite polynomial, and how accurate is it if you stop early? Taylor series answer those questions, and they are how calculators, physicists and engineers actually work with functions. The course ends with parametric and polar curves, which prepare you for the geometry of Calculus III.

As in Calculus I, everything is done by hand first, and each lesson teaches through fully worked examples. Hints hold a first step and, where an exercise has a definite result, the answer to check against. Numerical work, where it appears, is there to check and extend the mathematics, not to replace it.

The course follows the topics of MATH 231 at the University of Illinois Urbana-Champaign, based on the public catalog description. It is an original course and is not affiliated with or endorsed by the University of Illinois.`,
  difficulty: 'beginner',
  estimatedHours: 80,
  prerequisites: ['calculus-1'],
  recommendedBackground: [
    'Confidence with differentiation, substitution and the fundamental theorem',
    'Comfort with trigonometric identities',
  ],
  tags: ['calculus', 'integration', 'series', 'taylor series', 'polar coordinates', 'mathematics'],
  core: false,
  modules: [
    {
      slug: 'techniques-of-integration',
      title: 'Techniques of Integration',
      description:
        'Differentiation is a procedure, and integration is a craft. These are the standard hand techniques, and the judgement to choose among them.',
      lessons: [
        {
          slug: 'integration-by-parts',
          title: 'Integration by parts',
          summary:
            'The product rule in reverse: moving a derivative from one factor to the other.',
          estimatedMinutes: 170,
          objectives: [
            'Derive the integration by parts formula',
            'Choose $u$ and $dv$ sensibly',
            'Apply the method repeatedly',
            'Solve the looping case for integrals like $\\int e^x\\cos x\\,dx$',
            'Derive reduction formulas',
          ],
          concepts: [
            'Integration by parts',
            'Choosing $u$ and $dv$',
            'Repeated application',
            'Looping integrals',
            'Reduction formula',
          ],
          explanation: `The product rule says $(uv)'=u'v+uv'$. Integrating both sides and rearranging gives

$$
\\int u\\,dv=uv-\\int v\\,du.
$$

For definite integrals, $\\int_a^bu\\,dv=[uv]_a^b-\\int_a^bv\\,du$. The method trades one integral for another, and it helps when differentiating $u$ makes things simpler, while $dv$ can still be integrated.

A useful guide for picking $u$ is to prefer, in order: **l**ogarithms, **i**nverse trigonometric functions, **a**lgebraic powers, **t**rigonometric functions, **e**xponentials (LIATE). This is a heuristic, not a law.

**Worked example 1.** Evaluate $\\int xe^x\\,dx$. Take $u=x$ and $dv=e^x\\,dx$, so that $du=dx$ and $v=e^x$. Then

$$
\\int xe^x\\,dx=xe^x-\\int e^x\\,dx=(x-1)e^x+C.
$$

The opposite choice, $u=e^x$ and $dv=x\\,dx$, gives $\\tfrac12x^2e^x-\\int\\tfrac12x^2e^x\\,dx$, which is worse. If the new integral is harder than the old one, go back and swap.

**Worked example 2.** Evaluate $\\int\\ln x\\,dx$. There seems to be one factor only, so take $u=\\ln x$ and $dv=dx$. Then $du=dx/x$, $v=x$, and

$$
\\int\\ln x\\,dx=x\\ln x-\\int x\\cdot\\frac1x\\,dx=x\\ln x-x+C.
$$

The same trick handles $\\arctan x$ and $\\arcsin x$.

**Worked example 3 (looping).** Let $I=\\int e^x\\cos x\\,dx$. Take $u=\\cos x$ and $dv=e^x\\,dx$:

$$
I=e^x\\cos x+\\int e^x\\sin x\\,dx.
$$

Apply the method again to the new integral, with $u=\\sin x$ and $dv=e^x\\,dx$:

$$
I=e^x\\cos x+e^x\\sin x-\\int e^x\\cos x\\,dx=e^x(\\cos x+\\sin x)-I.
$$

The original integral has come back, so solve for it as an algebraic unknown:

$$
I=\\tfrac12e^x(\\sin x+\\cos x)+C.
$$

Keep the same type of choice for $u$ in both steps. If you swap, you simply undo the first step and arrive at $I=I$.

**Repeated parts.** For $\\int x^2\\sin x\\,dx$, one step lowers the power of $x$ by one, and a second step finishes the job. **Reduction formulas** package this pattern for a general exponent $n$.

Integration by parts reaches far beyond this course. In physics and differential equations it moves a derivative off one function and onto another, and that one move is at the heart of the Euler-Lagrange equations and of quantum operators.`,
          resources: [
            openstax('3-1-integration-by-parts', 'Integration by parts', 'Choosing parts, with definite integrals.', true),
            paul('IntegrationByParts', 'Integration by parts', 'Many examples, including the looping case.'),
            mit1801('The session on integration by parts and reduction formulas.'),
          ],
          exercises: [
            {
              slug: 'parts-drill',
              title: 'Parts drill',
              prompt: `Evaluate each indefinite integral by parts, and check your answer by differentiating: (a) $\\int x\\cos x\\,dx$, (b) $\\int x^2e^{-x}\\,dx$, (c) $\\int x\\ln x\\,dx$, (d) $\\int\\arctan x\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers, each plus C: (a) x sin x + cos x; (b) -(x^2 + 2x + 2)e^(-x); (c) (x^2/2) ln x - x^2/4; (d) x arctan x - (1/2) ln(1 + x^2).',
            },
            {
              slug: 'definite-parts',
              title: 'Definite integrals by parts',
              prompt: `Evaluate each definite integral exactly: (a) $\\int_0^\\pi x\\sin x\\,dx$, (b) $\\int_1^e\\ln x\\,dx$, (c) $\\int_0^1x^2e^x\\,dx$, (d) $\\int_1^e(\\ln x)^2\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) pi; (b) 1; (c) e - 2; (d) e - 2.',
            },
            {
              slug: 'looping-integral',
              title: 'A looping integral',
              prompt: `Evaluate $\\int e^{2x}\\sin3x\\,dx$ by integrating by parts twice and solving for the integral. Check your result by differentiating it.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The result is e^(2x)(2 sin 3x - 3 cos 3x)/13 + C.',
            },
            {
              slug: 'reduction-formula',
              title: 'A reduction formula',
              prompt: `Let $I_n=\\int_0^{\\pi/2}\\sin^nx\\,dx$. Use parts, with $u=\\sin^{n-1}x$, to prove that $I_n=\\dfrac{n-1}{n}I_{n-2}$ for $n\\ge2$. Use this with $I_0$ and $I_1$ to find $I_4$ and $I_5$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'You will need cos^2 = 1 - sin^2 after the first step. I4 = 3 pi/16 and I5 = 8/15.',
            },
          ],
          selfAssessment: [
            {
              question: 'What rule of differentiation does integration by parts come from?',
              answerOutline: 'The product rule, integrated and rearranged.',
            },
            {
              question: 'Why does $u=x$ work for $\\int xe^x\\,dx$ while $u=e^x$ does not?',
              answerOutline: 'Differentiating $x$ lowers its power. Choosing $dv=x\\,dx$ raises the power, making things worse.',
            },
            {
              question: 'How do you finish a looping integral?',
              answerOutline: 'When the original integral reappears, treat it as an unknown $I$ and solve the equation for $I$.',
            },
          ],
        },
        {
          slug: 'trigonometric-integrals',
          title: 'Trigonometric integrals',
          summary:
            'Powers and products of sines, cosines, tangents and secants, handled with identities and substitution.',
          estimatedMinutes: 160,
          objectives: [
            'Integrate $\\sin^mx\\cos^nx$ in the odd and even cases',
            'Use half-angle formulas',
            'Integrate powers of tangent and secant',
            'Use product-to-sum formulas',
          ],
          concepts: [
            'Saving a factor for $du$',
            'Half-angle identities',
            'Secant and tangent powers',
            'Integral of $\\sec x$',
            'Product-to-sum identities',
          ],
          explanation: `Every integral here comes down to the same tactic: use an identity so that a substitution works.

**Powers of sine and cosine, $\\int\\sin^mx\\cos^nx\\,dx$.**

If one power is odd, save one factor of that function for $du$, and convert the rest with $\\sin^2x+\\cos^2x=1$.

**Worked example 1.** For $\\int\\sin^3x\\cos^2x\\,dx$, sine has the odd power. Write $\\sin^3x=\\sin x(1-\\cos^2x)$ and let $u=\\cos x$, $du=-\\sin x\\,dx$:

$$
\\int(1-u^2)u^2(-du)=\\int(u^4-u^2)\\,du=\\frac{\\cos^5x}{5}-\\frac{\\cos^3x}{3}+C.
$$

If both powers are even, lower them with the half-angle formulas

$$
\\sin^2x=\\tfrac12(1-\\cos2x),\\qquad\\cos^2x=\\tfrac12(1+\\cos2x).
$$

**Worked example 2.** Evaluate $\\int_0^\\pi\\sin^2x\\,dx$:

$$
\\int_0^\\pi\\tfrac12(1-\\cos2x)\\,dx=\\left[\\frac x2-\\frac{\\sin2x}{4}\\right]_0^\\pi=\\frac\\pi2.
$$

The average of $\\sin^2x$ over a full cycle is $\\tfrac12$, which is the reason root-mean-square voltage is the peak divided by $\\sqrt2$.

**Powers of tangent and secant, $\\int\\tan^mx\\sec^nx\\,dx$.** Since $(\\tan x)'=\\sec^2x$ and $(\\sec x)'=\\sec x\\tan x$, you have two options. If the power of secant is even, save $\\sec^2x$ and convert the rest using $\\sec^2x=1+\\tan^2x$, with $u=\\tan x$. If the power of tangent is odd, save $\\sec x\\tan x$ and convert the rest, with $u=\\sec x$.

**Worked example 3.** Evaluate $\\int\\tan^2x\\sec^4x\\,dx$. Save $\\sec^2x$:

$$
\\int\\tan^2x(1+\\tan^2x)\\sec^2x\\,dx=\\int(u^2+u^4)\\,du=\\frac{\\tan^3x}{3}+\\frac{\\tan^5x}{5}+C.
$$

Two facts should be known outright: $\\int\\tan x\\,dx=\\ln|\\sec x|+C$, and

$$
\\int\\sec x\\,dx=\\ln|\\sec x+\\tan x|+C.
$$

The second comes from multiplying by $\\dfrac{\\sec x+\\tan x}{\\sec x+\\tan x}$, which makes the numerator the derivative of the denominator.

**Different frequencies.** To integrate $\\sin mx\\cos nx$ and similar products, use the formulas such as $\\sin A\\cos B=\\tfrac12[\\sin(A-B)+\\sin(A+B)]$. Integrating products like these over a full period gives $0$ when the frequencies differ. That fact is the foundation of Fourier series.\n\nWhen you are unsure which case applies, write the integrand with the powers visible, look for an odd power, and only then reach for half-angle formulas. Check each result by differentiating, since sign errors are common here.`,
          resources: [
            openstax('3-2-trigonometric-integrals', 'Trigonometric integrals', 'All the standard cases.', true),
            paul('IntegralsWithTrig', 'Integrals involving trig functions', 'A long run of worked examples by case.'),
          ],
          exercises: [
            {
              slug: 'trig-drill',
              title: 'Trigonometric drill',
              prompt: `Evaluate each integral, naming the strategy you use: (a) $\\int\\cos^3x\\,dx$, (b) $\\int\\sin^2x\\cos^2x\\,dx$, (c) $\\int\\tan^2x\\,dx$, (d) $\\int\\sin^5x\\cos^2x\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Each plus C: (a) sin x - sin^3(x)/3; (b) x/8 - sin(4x)/32; (c) tan x - x; (d) -cos^3(x)/3 + 2 cos^5(x)/5 - cos^7(x)/7.',
            },
            {
              slug: 'definite-trig',
              title: 'Definite trigonometric integrals',
              prompt: `Evaluate each definite integral exactly and by hand: (a) $\\int_0^{\\pi/4}\\sec^4x\\,dx$, (b) $\\int_0^\\pi\\cos^2(3x)\\,dx$, (c) $\\int_0^{\\pi/2}\\sin^3x\\,dx$, (d) $\\int_0^{\\pi/3}\\tan x\\sec x\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 4/3; (b) pi/2; (c) 2/3; (d) 1.',
            },
            {
              slug: 'orthogonality',
              title: 'Orthogonality of sines and cosines',
              prompt: `For positive integers $m,n$, prove: (a) $\\int_0^{2\\pi}\\sin mx\\cos nx\\,dx=0$, (b) $\\int_0^{2\\pi}\\sin mx\\sin nx\\,dx=0$ if $m\\ne n$, and $\\pi$ if $m=n$. Explain why these facts let you pick out one frequency from a sum of many.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use product-to-sum formulas. Treat m = n separately in (a), where sin mx cos mx = (1/2) sin 2mx.',
            },
            {
              slug: 'secant-cubed',
              title: 'The integral of secant cubed',
              prompt: `Use integration by parts, with $u=\\sec x$ and $dv=\\sec^2x\\,dx$, to prove that $\\int\\sec^3x\\,dx=\\tfrac12(\\sec x\\tan x+\\ln|\\sec x+\\tan x|)+C$. This integral appears often in arc length problems.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'After parts, write tan^2 = sec^2 - 1. The original integral loops back, so solve for it.',
            },
          ],
          selfAssessment: [
            {
              question: 'For $\\int\\sin^4x\\cos^3x\\,dx$, which substitution works, and why?',
              answerOutline: 'Cosine has the odd power, so save $\\cos x$ and let $u=\\sin x$.',
            },
            {
              question: 'What do you do when both powers of sine and cosine are even?',
              answerOutline: 'Use the half-angle formulas to reduce the powers.',
            },
            {
              question: 'What is the average value of $\\cos^2x$ over a period?',
              answerOutline: '$\\tfrac12$.',
            },
          ],
        },
        {
          slug: 'trigonometric-substitution',
          title: 'Trigonometric substitution',
          summary:
            'Turning square roots of quadratics into trigonometric expressions, using the Pythagorean identities.',
          estimatedMinutes: 170,
          objectives: [
            'Choose the right substitution for $\\sqrt{a^2-x^2}$, $\\sqrt{a^2+x^2}$ and $\\sqrt{x^2-a^2}$',
            'Convert the answer back to $x$ with a reference triangle',
            'Change limits for definite integrals',
            'Complete the square to bring a general quadratic to standard form',
          ],
          concepts: [
            'Inverse substitution',
            'The three standard forms',
            'Reference triangle',
            'Domain of the substitution',
            'Completing the square',
          ],
          explanation: `An ordinary substitution sets $u=g(x)$. Here you go the other way and set $x$ equal to a function of a new variable, chosen so that an identity removes a square root:

| expression | substitute | identity used |
|---|---|---|
| $\\sqrt{a^2-x^2}$ | $x=a\\sin\\theta$ | $1-\\sin^2\\theta=\\cos^2\\theta$ |
| $\\sqrt{a^2+x^2}$ | $x=a\\tan\\theta$ | $1+\\tan^2\\theta=\\sec^2\\theta$ |
| $\\sqrt{x^2-a^2}$ | $x=a\\sec\\theta$ | $\\sec^2\\theta-1=\\tan^2\\theta$ |

The substitution must be invertible, so restrict $\\theta$: to $[-\\pi/2,\\pi/2]$ for sine, to $(-\\pi/2,\\pi/2)$ for tangent, and to $[0,\\pi/2)$ for secant when $x\\ge a$. On those ranges the roots simplify cleanly, for example $\\sqrt{\\cos^2\\theta}=\\cos\\theta$.

**Worked example 1.** Find the area of a quarter of a circle of radius $2$ with $\\int_0^2\\sqrt{4-x^2}\\,dx$. Let $x=2\\sin\\theta$, $dx=2\\cos\\theta\\,d\\theta$. The limits become $\\theta=0$ and $\\theta=\\pi/2$, and the root becomes $2\\cos\\theta$:

$$
\\int_0^{\\pi/2}4\\cos^2\\theta\\,d\\theta=2\\int_0^{\\pi/2}(1+\\cos2\\theta)\\,d\\theta=\\pi.
$$

This matches the geometry: $\\tfrac14\\pi(2)^2=\\pi$.

**Worked example 2.** Evaluate $\\int\\dfrac{dx}{x^2\\sqrt{x^2+4}}$, for $x>0$. Let $x=2\\tan\\theta$, so that $dx=2\\sec^2\\theta\\,d\\theta$ and $\\sqrt{x^2+4}=2\\sec\\theta$. The integral becomes

$$
\\int\\frac{2\\sec^2\\theta\\,d\\theta}{4\\tan^2\\theta\\cdot2\\sec\\theta}=\\frac14\\int\\frac{\\sec\\theta}{\\tan^2\\theta}\\,d\\theta=\\frac14\\int\\frac{\\cos\\theta}{\\sin^2\\theta}\\,d\\theta=-\\frac{1}{4\\sin\\theta}+C,
$$

using $u=\\sin\\theta$ for the last step. To return to $x$, draw a right triangle with $\\tan\\theta=x/2$: the opposite side is $x$, the adjacent side is $2$, and the hypotenuse is $\\sqrt{x^2+4}$. So $\\sin\\theta=x/\\sqrt{x^2+4}$, and the answer is

$$
-\\frac{\\sqrt{x^2+4}}{4x}+C.
$$

**General quadratics.** Complete the square first. For instance, $x^2+2x+5=(x+1)^2+4$. With $w=x+1$, this has the form $w^2+a^2$.

For a definite integral, change the limits to $\\theta$ values as you substitute. Then you do not need the triangle at the end, which removes one source of error. The triangle is still the quickest way back to $x$ for an indefinite integral.\n\nCheck first whether a simple substitution will do. $\\int x\\sqrt{4-x^2}\\,dx$ needs only $u=4-x^2$. Use trigonometric substitution when no such shortcut exists.`,
          resources: [
            openstax('3-3-trigonometric-substitution', 'Trigonometric substitution', 'All three forms, with triangles.', true),
            paul('TrigSubstitutions', 'Trig substitutions', 'Careful attention to the domain of each substitution.'),
            paul('IntegralsWithQuadratics', 'Integrals involving quadratics', 'Completing the square.'),
          ],
          exercises: [
            {
              slug: 'substitution-drill',
              title: 'Three standard forms',
              prompt: `Evaluate each integral, drawing a reference triangle to convert back to $x$: (a) $\\int\\dfrac{dx}{\\sqrt{9-x^2}}$, (b) $\\int\\dfrac{x^2}{\\sqrt{4-x^2}}\\,dx$, (c) $\\int\\dfrac{dx}{(x^2+4)^{3/2}}$, (d) $\\int\\dfrac{\\sqrt{x^2-1}}{x}\\,dx$ for $x>1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Each plus C: (a) arcsin(x/3); (b) 2 arcsin(x/2) - x sqrt(4 - x^2)/2; (c) x/(4 sqrt(x^2 + 4)); (d) sqrt(x^2 - 1) - arcsec x.',
            },
            {
              slug: 'complete-the-square',
              title: 'Complete the square',
              prompt: `Complete the square in each quadratic, write the substitution you use, then evaluate each integral: (a) $\\int\\dfrac{dx}{\\sqrt{x^2+2x+5}}$, (b) $\\int_0^1\\dfrac{dx}{x^2+2x+2}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) ln(x + 1 + sqrt(x^2 + 2x + 5)) + C. (b) arctan 2 - pi/4.',
            },
            {
              slug: 'charged-rod',
              title: 'Ellipse and charged rod',
              prompt: `(a) Show by trigonometric substitution that the ellipse $x^2/a^2+y^2/b^2=1$ encloses area $\\pi ab$. (b) The electric field at distance $d$ from the middle of a uniformly charged rod of length $2L$ is proportional to $\\int_{-L}^{L}\\dfrac{d\\,dx}{(x^2+d^2)^{3/2}}$. Evaluate the integral, and find its limit as $L\\to\\infty$ and its behaviour for large $d$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The integral is 2L/(d sqrt(L^2 + d^2)). As L tends to infinity it tends to 2/d, like an infinite wire. For large d it behaves like 2L/d^2, like a point charge.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which substitution would you use for $\\sqrt{25+x^2}$?',
              answerOutline: '$x=5\\tan\\theta$.',
            },
            {
              question: 'Why do we restrict $\\theta$ in the substitution?',
              answerOutline: 'So the substitution is invertible and the sign of the simplified root is known.',
            },
            {
              question: 'Would you use trigonometric substitution for $\\int x\\sqrt{1+x^2}\\,dx$?',
              answerOutline: 'No. The simple substitution $u=1+x^2$ does it.',
            },
          ],
        },
        {
          slug: 'partial-fractions',
          title: 'Partial fractions',
          summary:
            'Breaking a rational function into simple pieces that integrate to logarithms and arctangents.',
          estimatedMinutes: 170,
          objectives: [
            'Reduce an improper rational function by long division',
            'Set up a decomposition for linear, repeated and irreducible quadratic factors',
            'Solve for the coefficients',
            'Integrate each piece',
          ],
          concepts: [
            'Proper and improper rational functions',
            'Long division',
            'Distinct and repeated linear factors',
            'Irreducible quadratic factors',
            'Cover-up by substitution',
          ],
          explanation: `Adding fractions is routine: $\\dfrac{2}{x-1}-\\dfrac{1}{x+2}=\\dfrac{x+5}{(x-1)(x+2)}$. **Partial fractions** runs this backwards, splitting a rational function into pieces you can integrate.

**Step 1: make it proper.** If the degree of the top is at least that of the bottom, do long division first.

**Step 2: factor the denominator** into linear factors and irreducible quadratics (those with no real roots).

**Step 3: write the form.**

- A linear factor $(x-a)$ gives a term $\\dfrac{A}{x-a}$.
- A repeated factor $(x-a)^k$ gives $\\dfrac{A_1}{x-a}+\\dfrac{A_2}{(x-a)^2}+\\dots+\\dfrac{A_k}{(x-a)^k}$.
- An irreducible $(x^2+bx+c)$ gives $\\dfrac{Ax+B}{x^2+bx+c}$.

**Step 4: find the constants.** Multiply through by the denominator. Then substitute convenient values of $x$, or match coefficients.

**Worked example 1.** Evaluate $\\int\\dfrac{x+5}{x^2+x-2}\\,dx$. The denominator is $(x-1)(x+2)$, so write

$$
\\frac{x+5}{(x-1)(x+2)}=\\frac{A}{x-1}+\\frac{B}{x+2},\\quad\\text{so}\\quad x+5=A(x+2)+B(x-1).
$$

Setting $x=1$ gives $6=3A$, so $A=2$. Setting $x=-2$ gives $3=-3B$, so $B=-1$. Hence

$$
\\int\\frac{x+5}{x^2+x-2}\\,dx=2\\ln|x-1|-\\ln|x+2|+C.
$$

**Worked example 2.** Evaluate $\\int\\dfrac{dx}{x(x^2+1)}$. The form is $\\dfrac Ax+\\dfrac{Bx+C}{x^2+1}$, so $1=A(x^2+1)+(Bx+C)x$. Setting $x=0$ gives $A=1$. Matching $x^2$ gives $A+B=0$, so $B=-1$, and matching $x$ gives $C=0$. Therefore

$$
\\int\\left(\\frac1x-\\frac{x}{x^2+1}\\right)dx=\\ln|x|-\\tfrac12\\ln(x^2+1)+C.
$$

**Worked example 3.** Evaluate $\\int\\dfrac{x^3}{x^2-1}\\,dx$. The fraction is improper. Division gives $\\dfrac{x^3}{x^2-1}=x+\\dfrac{x}{x^2-1}$, and the second piece needs only $u=x^2-1$. So the answer is $\\dfrac{x^2}{2}+\\dfrac12\\ln|x^2-1|+C$.

Choosing values of $x$ that make factors vanish is the fastest way to find the constants for linear factors. Matching coefficients is needed for the rest, and it gives a check on the values you found.\n\nFor irreducible quadratics, split the numerator so one part fits $u=x^2+bx+c$ and the rest gives an arctangent, completing the square as needed.

Forgetting the long division is the classic error: the decomposition form above is valid only for proper fractions. Another common slip is using $\\dfrac{A}{x^2+1}$ for a quadratic factor. The numerator needs a term in $x$ too.`,
          resources: [
            openstax('3-4-partial-fractions', 'Partial fractions', 'All four cases.', true),
            paul('PartialFractions', 'Partial fractions', 'Many setups, with both ways of finding the constants.'),
          ],
          exercises: [
            {
              slug: 'fractions-drill',
              title: 'Partial fractions drill',
              prompt: `Decompose each rational function into partial fractions, then integrate: (a) $\\dfrac{1}{x^2-4}$, (b) $\\dfrac{3x+1}{(x-1)(x+2)}$, (c) $\\dfrac{1}{x^2(x+1)}$, (d) $\\dfrac{x^2+1}{x^2-1}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Each plus C: (a) (1/4) ln|(x - 2)/(x + 2)|; (b) (4/3) ln|x - 1| + (5/3) ln|x + 2|; (c) -ln|x| - 1/x + ln|x + 1|; (d) x + ln|(x - 1)/(x + 1)|.',
            },
            {
              slug: 'definite-fractions',
              title: 'Definite integrals',
              prompt: `Evaluate each definite integral exactly, showing the decomposition and how you found each constant: (a) $\\int_2^3\\dfrac{x^2+1}{x^2-1}\\,dx$, (b) $\\int_1^2\\dfrac{x+1}{x(x^2+1)}\\,dx$, (c) $\\int_0^1\\dfrac{x}{(x+1)^2}\\,dx$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1 + ln(3/2). (b) ln 2 + arctan 2 - pi/4 - (1/2) ln(5/2). (c) ln 2 - 1/2.',
            },
            {
              slug: 'logistic-derivation',
              title: 'The logistic curve',
              prompt: `A population obeys $\\dfrac{dP}{dt}=kP\\left(1-\\dfrac PM\\right)$ with $0<P<M$. Separate variables, use partial fractions, and derive $P(t)=\\dfrac{M}{1+Ae^{-kt}}$, where $A=\\dfrac{M-P(0)}{P(0)}$. Show that $P\\to M$ as $t\\to\\infty$, and find where $P$ grows fastest.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'M/(P(M - P)) = 1/P + 1/(M - P). The growth rate is a parabola in P, greatest at P = M/2.',
            },
          ],
          selfAssessment: [
            {
              question: 'What must you check before writing a decomposition?',
              answerOutline: 'That the fraction is proper. If it is not, divide first.',
            },
            {
              question: 'Write the form of the decomposition of $\\frac{1}{(x-1)^2(x^2+1)}$.',
              answerOutline: '$\\frac{A}{x-1}+\\frac{B}{(x-1)^2}+\\frac{Cx+D}{x^2+1}$.',
            },
            {
              question: 'What kinds of function can come out of integrating a rational function?',
              answerOutline: 'Rational functions, logarithms and arctangents.',
            },
          ],
        },
        {
          slug: 'integration-strategy',
          title: 'Strategy for integration',
          summary:
            'How to look at an unfamiliar integral and decide what to try, and how to recognise one with no elementary answer.',
          estimatedMinutes: 150,
          objectives: [
            'Follow a systematic plan for an unlabelled integral',
            'Simplify with algebra or identities first',
            'Use rationalising substitutions',
            'Recognise integrals that are not elementary',
          ],
          concepts: [
            'Simplify first',
            'Classifying an integrand',
            'Rationalising substitution',
            'Weierstrass substitution',
            'Non-elementary integrals',
          ],
          explanation: `In the previous lessons you knew which technique to use from the title. In real work the integral carries no label. A reliable plan is the following.

1. **Simplify.** Expand, cancel, split fractions, use identities. For instance, $\\dfrac{\\sin x+\\cos x}{\\cos x}=\\tan x+1$.
2. **Look for a simple substitution.** Is there a function with its derivative as a factor? This is the most common solution, so always check it first.
3. **Classify the integrand.** Is it a rational function (partial fractions)? A product of unrelated types (parts)? Powers of trigonometric functions (identities)? A root of a quadratic (trigonometric substitution)?
4. **Try again in a new way.** Rationalise. Multiply by a clever form of $1$. Combine methods. Try a different $u$.

**Worked example 1.** Evaluate $\\int\\dfrac{dx}{1+\\sqrt{x}}$. The root is the obstacle, so let $u=\\sqrt{x}$. Then $x=u^2$ and $dx=2u\\,du$:

$$
\\int\\frac{2u\\,du}{1+u}=\\int\\left(2-\\frac{2}{1+u}\\right)du=2\\sqrt{x}-2\\ln(1+\\sqrt{x})+C.
$$

A substitution of this kind, which removes a root, is called **rationalising**.

**Worked example 2.** Evaluate $\\int e^{\\sqrt{x}}\\,dx$. Let $u=\\sqrt{x}$ again, so that the integral becomes $\\int2ue^u\\,du$, which falls to parts:

$$
2(u-1)e^u+C=2(\\sqrt{x}-1)e^{\\sqrt{x}}+C.
$$

Many integrals need a chain of methods like this one.

**Worked example 3.** Evaluate $\\int\\dfrac{dx}{1+\\sin x}$. Multiply top and bottom by $1-\\sin x$:

$$
\\int\\frac{1-\\sin x}{\\cos^2x}\\,dx=\\int(\\sec^2x-\\sec x\\tan x)\\,dx=\\tan x-\\sec x+C.
$$

The **Weierstrass substitution** $t=\\tan(x/2)$ handles any rational function of $\\sin x$ and $\\cos x$, turning it into a rational function of $t$ through $\\sin x=\\dfrac{2t}{1+t^2}$, $\\cos x=\\dfrac{1-t^2}{1+t^2}$ and $dx=\\dfrac{2\\,dt}{1+t^2}$. It always works, though often clumsily.

**When to stop.** Some innocent-looking integrals have no antiderivative that can be written with elementary functions, whatever your skill. Examples are

$$
\\int e^{-x^2}dx,\\quad\\int\\frac{\\sin x}{x}\\,dx,\\quad\\int\\frac{dx}{\\ln x},\\quad\\int\\sqrt{1+x^3}\\,dx.
$$

These functions are perfectly continuous, so by the fundamental theorem they have antiderivatives. Those antiderivatives simply are not elementary. A small change can reverse the situation: $\\int xe^{-x^2}dx$ is easy. For the truly non-elementary, use numerics (next module) or series (Module 5).

Computer algebra systems are good at this work, and you should use them to check your answers. You still need to be able to read and judge what they give you.`,
          resources: [
            openstax('3-5-other-strategies-for-integration', 'Other strategies for integration', 'Tables and computer algebra.', true),
            paul('IntegrationStrategy', 'Integration strategy', 'A checklist with examples.'),
            paul('IntegralsWithRoots', 'Integrals involving roots', 'Rationalising substitutions.'),
          ],
          exercises: [
            {
              slug: 'mixed-bag',
              title: 'Unlabelled integrals',
              prompt: `Here the method is not stated. Decide what to do and evaluate each integral: (a) $\\int\\dfrac{x}{1+x^4}\\,dx$, (b) $\\int\\ln(x^2+1)\\,dx$, (c) $\\int\\dfrac{dx}{e^x+1}$, (d) $\\int x\\sqrt{x-1}\\,dx$, (e) $\\int\\sec^2x\\tan^3x\\,dx$, (f) $\\int\\dfrac{dx}{x\\ln x}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Each plus C: (a) (1/2) arctan(x^2); (b) x ln(x^2 + 1) - 2x + 2 arctan x; (c) x - ln(e^x + 1); (d) (2/5)(x - 1)^(5/2) + (2/3)(x - 1)^(3/2); (e) tan^4(x)/4; (f) ln|ln x|.',
            },
            {
              slug: 'weierstrass',
              title: 'The Weierstrass substitution',
              prompt: `Verify the formulas for $\\sin x$, $\\cos x$ and $dx$ in terms of $t=\\tan(x/2)$. Then use them to find $\\int\\dfrac{dx}{1+\\sin x}$, and show that your answer differs from the lesson's by a constant. Also evaluate $\\int_0^{\\pi/2}\\dfrac{dx}{2+\\cos x}$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The first integral comes to -2/(1 + t) + C. The second is (2/sqrt 3) arctan(1/sqrt 3) = pi/(3 sqrt 3).',
            },
            {
              slug: 'elementary-or-not',
              title: 'Elementary or not?',
              prompt: `For each integral, decide whether it can be done in elementary terms using your methods, and evaluate those that can: (a) $\\int xe^{x^2}dx$, (b) $\\int e^{x^2}dx$, (c) $\\int\\dfrac{\\ln x}{x}\\,dx$, (d) $\\int\\dfrac{dx}{\\ln x}$, (e) $\\int x^2\\sqrt{1+x^3}\\,dx$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) e^(x^2)/2 + C. (b) not elementary. (c) (ln x)^2/2 + C. (d) not elementary. (e) (2/9)(1 + x^3)^(3/2) + C.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the first thing to check on any integral?',
              answerOutline: 'Whether it can be simplified, then whether a simple substitution works.',
            },
            {
              question: 'Does "no elementary antiderivative" mean that no antiderivative exists?',
              answerOutline: 'No. A continuous function always has one, given by the FTC, but it may not have a formula in elementary functions.',
            },
            {
              question: 'What would you try for $\\int\\sqrt{x}\\,e^{\\sqrt{x}}\\,dx$?',
              answerOutline: 'Let $u=\\sqrt{x}$, then use integration by parts on the result.',
            },
          ],
        },
      ],
      project: {
        slug: 'integration-field-guide',
        title: 'Your integration field guide',
        description: `Build a personal reference that you would really use. Collect at least twenty integrals of your own choosing, or ones you find in a physics or engineering book, and sort them by technique. For each one, write down what in the integrand told you which method to use, the key step, and the result, and check it by differentiating or with a computer algebra system. Then take ten more integrals in shuffled order and time yourself deciding the method alone. Note which decisions you got wrong, and rewrite your decision chart in response.`,
        deliverables: [
          'A one-page decision chart for choosing a method',
          'Twenty worked integrals grouped by technique, each with a note on the clue in the integrand',
          'A symbolic or numerical check of every result',
          'A record of the timed test, with your errors and what changed in your chart',
        ],
        estimatedHours: 5,
        stretchGoals: ['Find out how computer algebra decides whether an integral is elementary, by reading about the Risch algorithm'],
      },
    },
    {
      slug: 'improper-integrals-and-numerics',
      title: 'Improper Integrals and Numerical Methods',
      description:
        'Two ways to deal with integrals the fundamental theorem cannot do directly: limits for infinite ranges and blow-ups, and numerical rules with guaranteed error bounds.',
      lessons: [
        {
          slug: 'improper-integrals',
          title: 'Improper integrals',
          summary:
            'Integrals over infinite intervals or of unbounded functions, defined as limits, and the p-integrals.',
          estimatedMinutes: 170,
          objectives: [
            'Write an improper integral as a limit',
            'Decide convergence by evaluating the limit',
            'Know the $p$-integral results on $[1,\\infty)$ and on $(0,1]$',
            'Split at interior singularities and for doubly infinite ranges',
            'Avoid the symmetric limit trap',
          ],
          concepts: [
            'Type I and type II improper integrals',
            'Convergence and divergence',
            '$p$-integrals',
            'Interior singularity',
            'Doubly infinite integrals',
          ],
          explanation: `The definite integral was defined for a bounded function on a closed bounded interval. An **improper integral** drops one of these assumptions, and it is defined as a limit of ordinary integrals.

**Type I (infinite interval).** $\\displaystyle\\int_a^\\infty f(x)\\,dx=\\lim_{t\\to\\infty}\\int_a^tf(x)\\,dx$.

**Type II (unbounded integrand).** If $f$ blows up at $a$, then $\\displaystyle\\int_a^bf(x)\\,dx=\\lim_{t\\to a^+}\\int_t^bf(x)\\,dx$. A blow-up at $b$ is handled the same way.

If the limit exists as a finite number, the integral **converges**. Otherwise it **diverges**.

**Worked example 1.** $\\displaystyle\\int_0^\\infty xe^{-x}\\,dx=\\lim_{t\\to\\infty}\\left[-(x+1)e^{-x}\\right]_0^t=\\lim_{t\\to\\infty}\\left(1-(t+1)e^{-t}\\right)=1.$

An infinitely long region can have a finite area.

**The $p$-integrals.** Compute these once and memorise them.

$$
\\int_1^\\infty\\frac{dx}{x^p}=\\begin{cases}\\dfrac{1}{p-1}&p>1\\\\\\text{diverges}&p\\le1\\end{cases}\\qquad\\int_0^1\\frac{dx}{x^p}=\\begin{cases}\\dfrac{1}{1-p}&p<1\\\\\\text{diverges}&p\\ge1\\end{cases}
$$

The borderline case is $p=1$, which diverges in both directions because $\\ln x$ is unbounded at both $\\infty$ and $0$. The two conditions are opposites. At infinity the function must fall fast enough, and at $0$ it must not blow up too fast.

**Worked example 2.** $\\displaystyle\\int_0^1\\frac{dx}{\\sqrt{x}}$ has $p=\\tfrac12<1$, so it converges, to $2$. In contrast, $\\displaystyle\\int_1^\\infty\\frac{dx}{\\sqrt{x}}$ diverges.

**Singularities inside the interval.** Look at the integrand before you apply the fundamental theorem. In $\\int_{-1}^{1}\\dfrac{dx}{x^2}$ the integrand blows up at $x=0$. Split it into $\\int_{-1}^0$ and $\\int_0^1$. Each piece diverges, so the whole integral diverges.

**Doubly infinite.** We define

$$
\\int_{-\\infty}^\\infty f\\,dx=\\int_{-\\infty}^cf\\,dx+\\int_c^\\infty f\\,dx,
$$

and **both** pieces must converge separately. For example,

$$
\\int_{-\\infty}^\\infty\\frac{dx}{1+x^2}=\\frac\\pi2+\\frac\\pi2=\\pi.
$$

The trap is to use one symmetric limit. $\\lim_{t\\to\\infty}\\int_{-t}^tx\\,dx=0$, yet $\\int_{-\\infty}^\\infty x\\,dx$ diverges, since $\\int_0^\\infty x\\,dx$ alone does. The symmetric limit hides a cancellation of two infinities, and the definition does not allow it.

Improper integrals will turn up constantly: in probability, where total probability is $\\int_{-\\infty}^\\infty$ of a density; in physics, where the escape energy is $\\int_R^\\infty GMm/r^2\\,dr$; and in the integral test for series.`,
          resources: [
            openstax('3-7-improper-integrals', 'Improper integrals', 'Both types, with the comparison theorem.', true),
            paul('ImproperIntegrals', 'Improper integrals', 'Careful examples of each case.'),
          ],
          exercises: [
            {
              slug: 'improper-drill',
              title: 'Converge or diverge',
              prompt: `Decide whether each integral converges, and find its value if it does: (a) $\\int_1^\\infty x^{-3}\\,dx$, (b) $\\int_0^\\infty e^{-2x}\\,dx$, (c) $\\int_0^1\\ln x\\,dx$, (d) $\\int_1^\\infty\\dfrac{dx}{x}$, (e) $\\int_0^2\\dfrac{dx}{(x-1)^2}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 1/2; (b) 1/2; (c) -1; (d) diverges; (e) diverges, because of the blow-up at x = 1.',
            },
            {
              slug: 'harder-improper',
              title: 'Harder improper integrals',
              prompt: `Decide whether each integral converges by evaluating the limit: (a) $\\int_2^\\infty\\dfrac{dx}{x(\\ln x)^2}$, (b) $\\int_2^\\infty\\dfrac{dx}{x\\ln x}$, (c) $\\int_0^\\infty x^2e^{-x}\\,dx$, (d) $\\int_0^3\\dfrac{dx}{(3-x)^{2/3}}$, (e) $\\int_{-\\infty}^\\infty xe^{-x^2}\\,dx$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) 1/ln 2; (b) diverges; (c) 2; (d) 3 times the cube root of 3; (e) 0, with both halves convergent.',
            },
            {
              slug: 'gabriel-and-gamma',
              title: "Gabriel's horn and the gamma function",
              prompt: `(a) Rotate $y=1/x$, $x\\ge1$, about the $x$-axis. Show that the volume is $\\pi$. Then, using the surface area formula $S=2\\pi\\int y\\sqrt{1+y'^2}\\,dx$ and a simple lower bound, show the surface area is infinite. Discuss the paradox of a can you can fill and cannot paint. (b) Define $\\Gamma(s)=\\int_0^\\infty x^{s-1}e^{-x}\\,dx$ for $s>0$. Use parts to show $\\Gamma(s+1)=s\\Gamma(s)$, and deduce $\\Gamma(n+1)=n!$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the surface area, the square root is at least 1, so the integrand is at least 2 pi/x.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\int_{-1}^1dx/x$ not simply $0$ by symmetry?',
              answerOutline: 'The integrand has a singularity at $0$, and each half diverges. So the integral diverges, and symmetry cannot be used.',
            },
            {
              question: 'For which $p$ does $\\int_1^\\infty x^{-p}dx$ converge?',
              answerOutline: '$p>1$, with value $1/(p-1)$.',
            },
            {
              question: 'What must hold for $\\int_{-\\infty}^\\infty f\\,dx$ to converge?',
              answerOutline: 'Both $\\int_{-\\infty}^cf\\,dx$ and $\\int_c^\\infty f\\,dx$ must converge separately.',
            },
          ],
        },
        {
          slug: 'comparison-for-integrals',
          title: 'Comparison tests for improper integrals',
          summary:
            'Deciding convergence without evaluating, by comparison with an integral you know.',
          estimatedMinutes: 140,
          objectives: [
            'State and apply the direct comparison test',
            'State and apply the limit comparison test',
            'Choose a good function to compare with',
            'Use absolute convergence for integrands that change sign',
          ],
          concepts: [
            'Direct comparison',
            'Limit comparison',
            'Dominant behaviour',
            'Absolute convergence of an integral',
            'Conditional convergence',
          ],
          explanation: `Most improper integrals have no closed form. Often you need only to know whether they converge, and for that you do not need the value.

**Direct comparison.** Suppose $0\\le f(x)\\le g(x)$ for $x\\ge a$. Then:

- If $\\int_a^\\infty g\\,dx$ converges, so does $\\int_a^\\infty f\\,dx$.
- If $\\int_a^\\infty f\\,dx$ diverges, so does $\\int_a^\\infty g\\,dx$.

In words, below something finite is finite, and above something infinite is infinite. The test says nothing if $f$ is below something that diverges, or above something that converges. The same works for type II integrals.

**Worked example 1.** Does $\\int_1^\\infty e^{-x^2}dx$ converge? There is no elementary antiderivative. For $x\\ge1$, $x^2\\ge x$, so $e^{-x^2}\\le e^{-x}$, and $\\int_1^\\infty e^{-x}dx=e^{-1}$. So it converges.

**Worked example 2.** For $\\int_1^\\infty\\dfrac{1+\\sin^2x}{x}\\,dx$, the integrand is at least $\\dfrac1x$, whose integral diverges. So it diverges.

**Limit comparison.** Suppose $f,g>0$ for $x\\ge a$, and $\\lim_{x\\to\\infty}f(x)/g(x)=L$ with $0<L<\\infty$. Then the two integrals either both converge or both diverge. This formalises the idea that only the dominant behaviour for large $x$ matters.

**Worked example 3.** $\\int_1^\\infty\\dfrac{dx}{\\sqrt{x^3+1}}$. For large $x$, the integrand acts like $x^{-3/2}$. Then

$$
\\lim_{x\\to\\infty}\\frac{1/\\sqrt{x^3+1}}{x^{-3/2}}=\\lim_{x\\to\\infty}\\sqrt{\\frac{x^3}{x^3+1}}=1,
$$

and since $\\int_1^\\infty x^{-3/2}dx$ converges ($p=\\tfrac32>1$), so does the original.

Near a finite singularity, the same idea applies. For $\\int_0^1\\dfrac{dx}{x+x^2}$, the integrand behaves like $1/x$ near $0$, so it diverges.

**Integrands that change sign.** The comparison tests need non-negative functions. If $\\int|f|\\,dx$ converges, then $\\int f\\,dx$ converges too, and we say it **converges absolutely**. For instance, $\\left|\\dfrac{\\sin x}{x^2}\\right|\\le\\dfrac{1}{x^2}$, so $\\int_1^\\infty\\dfrac{\\sin x}{x^2}\\,dx$ converges absolutely. The converse is false: $\\int_1^\\infty\\dfrac{\\sin x}{x}\\,dx$ converges through cancellation, although $\\int_1^\\infty\\left|\\dfrac{\\sin x}{x}\\right|dx$ diverges. You will meet the same distinction for infinite series in Module 4.

The usual workflow is to guess the behaviour from the dominant terms, then prove it with one of the two tests.`,
          resources: [
            openstax('3-7-improper-integrals', 'Improper integrals', 'The comparison theorem appears in the final part of this section.', true),
            paul('ImproperIntegralsCompTest', 'Comparison test for improper integrals', 'How to pick a comparison function.'),
          ],
          exercises: [
            {
              slug: 'comparison-drill',
              title: 'Comparison drill',
              prompt: `Decide whether each integral converges, and name the test and the comparison function you use: (a) $\\int_1^\\infty\\dfrac{dx}{x^2+x+1}$, (b) $\\int_1^\\infty\\dfrac{2+\\cos x}{\\sqrt{x}}\\,dx$, (c) $\\int_2^\\infty\\dfrac{dx}{\\ln x}$, (d) $\\int_1^\\infty\\dfrac{e^{-x}}{x}\\,dx$, (e) $\\int_0^1\\dfrac{e^x}{\\sqrt{x}}\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) converges, below 1/x^2. (b) diverges, above 1/sqrt x. (c) diverges, above 1/x. (d) converges, below e^(-x). (e) converges, below e/sqrt x.',
            },
            {
              slug: 'parameter-families',
              title: 'Families with a parameter',
              prompt: `Find exactly which parameter values give convergence, and justify it: (a) $\\int_2^\\infty\\dfrac{dx}{x(\\ln x)^p}$, (b) $\\int_0^\\infty\\dfrac{x^a}{1+x^2}\\,dx$, by analysing the behaviour at both ends, (c) $\\int_0^1x^a\\ln x\\,dx$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) p > 1, using u = ln x. (b) -1 < a < 1. Near 0 it behaves like x^a, and at infinity like x^(a - 2). (c) a > -1.',
            },
            {
              slug: 'sine-over-x',
              title: 'Conditional convergence of an integral',
              prompt: `(a) Integrate by parts to show $\\int_1^t\\dfrac{\\sin x}{x}\\,dx=\\cos1-\\dfrac{\\cos t}{t}-\\int_1^t\\dfrac{\\cos x}{x^2}\\,dx$. Deduce that $\\int_1^\\infty\\dfrac{\\sin x}{x}\\,dx$ converges. (b) Use $|\\sin x|\\ge\\sin^2x=\\tfrac12(1-\\cos2x)$ to show it does not converge absolutely.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), split the integral of (1 - cos 2x)/(2x). The cosine part converges by the method of (a), and the other part diverges.',
            },
          ],
          selfAssessment: [
            {
              question: 'If $f\\le g$ and $\\int g$ diverges, what can you say about $\\int f$?',
              answerOutline: 'Nothing. The test is inconclusive.',
            },
            {
              question: 'What does limit comparison need?',
              answerOutline: 'Positive functions, and a limit of $f/g$ that is finite and non-zero.',
            },
            {
              question: 'What function would you compare $\\frac{x+1}{x^3+2}$ with for large $x$?',
              answerOutline: '$1/x^2$, so the integral on $[1,\\infty)$ converges.',
            },
          ],
        },
        {
          slug: 'numerical-integration',
          title: 'Numerical integration and error',
          summary:
            'The midpoint, trapezoid and Simpson rules, how accurate they are, and how to choose the number of subintervals.',
          estimatedMinutes: 180,
          objectives: [
            'Apply the midpoint, trapezoid and Simpson rules by hand',
            'Use the error bounds to choose $n$',
            'Explain why the trapezoid and midpoint errors have opposite signs for curved functions',
            'Explain why Simpson has a much smaller error',
            'Apply the rules to measured data',
          ],
          concepts: [
            'Midpoint rule',
            'Trapezoid rule',
            'Simpson rule',
            'Error bounds',
            'Order of a method',
          ],
          explanation: `Divide $[a,b]$ into $n$ subintervals of width $h=(b-a)/n$, with points $x_i=a+ih$. Three rules cover most needs.

**Midpoint.** $M_n=h\\sum_{i=1}^nf(\\bar x_i)$, where $\\bar x_i$ is the midpoint of the $i$th subinterval.

**Trapezoid.** Replace the curve by a straight line on each piece:

$$
T_n=\\frac h2\\left[f(x_0)+2f(x_1)+\\dots+2f(x_{n-1})+f(x_n)\\right].
$$

**Simpson.** Replace the curve by a parabola through each three consecutive points, with $n$ even:

$$
S_n=\\frac h3\\left[f(x_0)+4f(x_1)+2f(x_2)+4f(x_3)+\\dots+4f(x_{n-1})+f(x_n)\\right].
$$

**Error bounds.** If $|f''|\\le K$ on $[a,b]$ and $|f^{(4)}|\\le K_4$ on $[a,b]$, then

$$
|E_T|\\le\\frac{K(b-a)^3}{12n^2},\\quad|E_M|\\le\\frac{K(b-a)^3}{24n^2},\\quad|E_S|\\le\\frac{K_4(b-a)^5}{180n^4}.
$$

Doubling $n$ cuts the trapezoid and midpoint errors by about $4$, and cuts the Simpson error by about $16$. If $f$ is concave up, the trapezoid rule overestimates and the midpoint rule underestimates, and the midpoint error is about half the size. Simpson combines them to cancel the leading error: $S_{2n}=\\tfrac13(2M_n+T_n)$. Simpson is exact for all cubics, because $f^{(4)}=0$.

**Worked example.** Approximate $\\int_1^2\\dfrac{dx}{x}=\\ln2\\approx0.693147$ with $n=4$, so $h=0.25$. The function values at $1,\\ 1.25,\\ 1.5,\\ 1.75,\\ 2$ are $1,\\ 0.8,\\ 0.66667,\\ 0.57143,\\ 0.5$.

$$
T_4=0.125\\left[1+2(0.8+0.66667+0.57143)+0.5\\right]=0.69702,
$$

$$
S_4=\\frac{0.25}{3}\\left[1+4(0.8)+2(0.66667)+4(0.57143)+0.5\\right]=0.69325.
$$

The errors are about $0.00388$ and $0.00011$. Now compare with the bounds. Since $f''=2/x^3$, the largest value on $[1,2]$ is $K=2$, so $|E_T|\\le\\dfrac{2}{12\\cdot16}\\approx0.0104$. The bound holds, but it is not tight.

To guarantee $|E_T|<10^{-4}$, we need $\\dfrac{2}{12n^2}<10^{-4}$, so $n^2>1667$ and $n\\ge41$. With Simpson, $f^{(4)}=24/x^5$ gives $K_4=24$, and $\\dfrac{24}{180n^4}<10^{-4}$ gives $n^4>1334$, so $n\\ge8$, taking the next even number. That is a very large saving.

These rules also work on data alone, where there is no formula at all, which is why engineers use them for measured profiles.`,
          resources: [
            openstax('3-6-numerical-integration', 'Numerical integration', 'The rules with their error bounds.', true),
            paul('ApproximatingDefIntegrals', 'Approximating definite integrals', 'Compares all the rules on one example.'),
          ],
          exercises: [
            {
              slug: 'rules-by-hand',
              title: 'Rules by hand',
              prompt: `Compute $T_4$, $M_4$ and $S_4$ by hand for $\\int_0^1e^{-x^2}\\,dx$. Use six decimals. The accurate value is $0.746824$. Report each error, and comment on the signs of the $T_4$ and $M_4$ errors.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'T4 is about 0.742984, M4 about 0.748747, and S4 about 0.746855. The T error is about -0.0038 and the M error about +0.0019: opposite signs, with M about half the size.',
            },
            {
              slug: 'choose-n',
              title: 'How many subintervals?',
              prompt: `For $\\int_0^\\pi\\sin x\\,dx$, use the error bounds to find the smallest $n$ that guarantees an error below $10^{-6}$: (a) with the trapezoid rule, (b) with the Simpson rule, taking $n$ even. Then evaluate the real Simpson error at that $n$ with a short program or a spreadsheet.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'K = 1 and K4 = 1. (a) n >= 1608. (b) n >= 38, the first even number above 36.1.',
            },
            {
              slug: 'river-section',
              title: 'Rules on measured data',
              prompt: `A river $30$ m wide has these depths in metres, measured every $5$ m from one bank: $0,\\ 1.2,\\ 2.1,\\ 2.6,\\ 2.4,\\ 1.3,\\ 0$. Estimate the cross-sectional area by the trapezoid and Simpson rules. If the mean flow speed is $0.8$ m/s, estimate the volume flow rate.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Trapezoid 48 m^2, Simpson 49 m^2. The flow rate is about 39 m^3/s.',
            },
            {
              slug: 'simpson-theory',
              title: 'Why Simpson works',
              prompt: `(a) By direct integration, show that for any cubic $p$, $\\int_{-h}^{h}p(x)\\,dx=\\dfrac h3\\left[p(-h)+4p(0)+p(h)\\right]$. (b) Show algebraically that $S_{2n}=\\tfrac13(2M_n+T_n)$. (c) Use the error rates to explain why this particular weighted average cancels the leading error.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a) it is enough to check 1, x, x^2 and x^3. For (c), the midpoint error is about -1/2 of the trapezoid error.',
            },
          ],
          selfAssessment: [
            {
              question: 'If you double $n$, what happens to the error in the trapezoid and Simpson rules?',
              answerOutline: 'It falls by about a factor of 4 for the trapezoid rule, and about 16 for Simpson.',
            },
            {
              question: 'For a concave up function, which is larger: $T_n$, $M_n$ or the integral?',
              answerOutline: '$M_n\\le\\int f\\le T_n$.',
            },
            {
              question: 'Why must $n$ be even for Simpson?',
              answerOutline: 'Each parabola spans two subintervals.',
            },
          ],
        },
      ],
    },
    {
      slug: 'more-applications',
      title: 'More Applications of Integration',
      description:
        'The slice-and-sum idea at work on lengths, surfaces, balance points and probabilities, and your first differential equations.',
      lessons: [
        {
          slug: 'arc-length-and-surface-area',
          title: 'Arc length and surface area',
          summary:
            'Measuring the length of a curve and the area of a surface of revolution.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the arc length formula from small straight segments',
            'Compute arc lengths where the integrand simplifies',
            'Derive and use the surface area of revolution formula',
            'Fall back on numerical methods when no closed form exists',
          ],
          concepts: [
            'Arc length integrand $\\sqrt{1+f\'(x)^2}$',
            'Arc length element $ds$',
            'Surface of revolution',
            'Frustum of a cone',
            'Perfect-square integrands',
          ],
          explanation: `Approximate a curve $y=f(x)$ by short straight segments. A segment across a small step $\\Delta x$ rises about $f'(x)\\Delta x$, so by Pythagoras its length is about $\\sqrt{1+f'(x)^2}\\,\\Delta x$. Summing and taking the limit gives the **arc length**, for $f'$ continuous on $[a,b]$:

$$
L=\\int_a^b\\sqrt{1+f'(x)^2}\\,dx.
$$

It is handy to write $ds=\\sqrt{1+f'(x)^2}\\,dx$ for the length of a small piece of curve, sometimes written $ds^2=dx^2+dy^2$.

**Worked example 1.** Find the length of $y=x^{3/2}$ on $[0,4]$. Here $y'=\\tfrac32x^{1/2}$, so $1+y'^2=1+\\tfrac94x$:

$$
L=\\int_0^4\\sqrt{1+\\tfrac94x}\\,dx=\\frac49\\cdot\\frac23\\left[(1+\\tfrac94x)^{3/2}\\right]_0^4=\\frac{8}{27}\\left(10^{3/2}-1\\right)\\approx9.07.
$$

The straight line between the end points has length $\\sqrt{16+64}\\approx8.94$. The curve should be slightly longer, and it is. That is a good quick check.

The square root usually spoils the integration, and the arc length of a simple curve like $y=\\sin x$ has no elementary form. So you should use numerics in such cases. The hand-computable cases are often built so that $1+f'^2$ is a perfect square.

**Surface of revolution.** Rotate the curve about the $x$-axis. A short piece of length $ds$ at height $f(x)$ sweeps out a thin band, nearly a slice of a cone, of circumference $2\\pi f(x)$. So, for $f\\ge0$,

$$
S=\\int_a^b2\\pi f(x)\\sqrt{1+f'(x)^2}\\,dx.
$$

Note that the width of the band is $ds$, not $dx$. Using $dx$ would be fine for volume but it gives the wrong surface area, since it ignores the slope. When rotating about the $y$-axis, the circumference is $2\\pi x$ instead.

**Worked example 2.** Rotate $y=\\sqrt{x}$, $0\\le x\\le2$, about the $x$-axis. Here $y'=\\dfrac{1}{2\\sqrt{x}}$, so

$$
y\\sqrt{1+y'^2}=\\sqrt{x}\\sqrt{1+\\frac{1}{4x}}=\\sqrt{x+\\tfrac14}.
$$

The awkward denominators cancel. Thus

$$
S=2\\pi\\int_0^2\\sqrt{x+\\tfrac14}\\,dx=\\frac{4\\pi}{3}\\left[(x+\\tfrac14)^{3/2}\\right]_0^2=\\frac{4\\pi}{3}\\left(\\frac{27}{8}-\\frac18\\right)=\\frac{13\\pi}{3}.
$$

Although $y'$ is unbounded at $x=0$, the simplified integrand is fine, so the integral needs no special care in this example.`,
          resources: [
            openstax('2-4-arc-length-of-a-curve-and-surface-area', 'Arc length of a curve and surface area', 'Derivations and examples.', true),
            paul('ArcLength', 'Arc length', 'Examples in both x and y.'),
            paul('SurfaceArea', 'Surface area', 'Rotation about both axes.'),
          ],
          exercises: [
            {
              slug: 'length-drill',
              title: 'Arc lengths',
              prompt: `Find each length exactly, simplifying the square root first: (a) $y=\\tfrac23(x^2+1)^{3/2}$ on $[0,1]$, (b) $y=\\ln(\\sec x)$ on $[0,\\pi/4]$, (c) $y=x^2/2$ on $[0,1]$, using a result from trigonometric substitution or from the earlier exercise on the integral of secant cubed.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1 + y prime squared is (2x^2 + 1)^2, so L = 5/3. (b) ln(1 + sqrt 2). (c) (sqrt 2 + ln(1 + sqrt 2))/2.',
            },
            {
              slug: 'surfaces',
              title: 'Surfaces of revolution',
              prompt: `Use the surface area formula: (a) show that a cone of base radius $r$ and height $h$ has lateral area $\\pi r\\sqrt{r^2+h^2}$, (b) rotate $y=x^3$ on $[0,1]$ about the $x$-axis, (c) show that the part of a sphere of radius $r$ between two parallel planes a distance $w$ apart has area $2\\pi rw$, wherever the planes are.`,
              kind: 'derivation',
              difficulty: 2,
              hint: '(b) (pi/27)(10^(3/2) - 1). (c) For y = sqrt(r^2 - x^2), y sqrt(1 + y prime squared) simplifies to the constant r.',
            },
            {
              slug: 'sine-arc',
              title: 'An arc with no formula',
              prompt: `Write down the integral for the length of one arch of $y=\\sin x$, from $0$ to $\\pi$. Estimate it by the Simpson rule with $n=6$, by hand or in a spreadsheet, and compare with the straight line of length $\\pi$ between the end points.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'L is the integral from 0 to pi of sqrt(1 + cos^2 x) dx. The accurate value is about 3.820.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the arc length formula contain $\\sqrt{1+f\'^2}$?',
              answerOutline: 'By Pythagoras, a small piece of curve has length $\\sqrt{dx^2+dy^2}=\\sqrt{1+(dy/dx)^2}\\,dx$.',
            },
            {
              question: 'What is the common error in the surface area formula?',
              answerOutline: 'Using $dx$ for the width of the band in place of $ds$.',
            },
            {
              question: 'Why are so few arc length integrals exactly solvable?',
              answerOutline: 'The square root of a sum rarely simplifies. Textbook cases are built to make it a perfect square.',
            },
          ],
        },
        {
          slug: 'moments-and-centres-of-mass',
          title: 'Moments and centres of mass',
          summary:
            'Balance points of masses, rods and flat plates, and a neat theorem about volumes.',
          estimatedMinutes: 150,
          objectives: [
            'Compute the centre of mass of point masses and of rods',
            'Compute the centroid of a plane region',
            'Use symmetry to avoid integrals',
            'Apply the theorem of Pappus',
          ],
          concepts: [
            'Moment',
            'Centre of mass',
            'Centroid',
            'Density function',
            'Theorem of Pappus',
          ],
          explanation: `Two children on a seesaw balance when mass times distance is the same on each side. The product of mass and signed distance from a point is the **moment** about that point. For masses $m_i$ at positions $x_i$, the balance point, or **centre of mass**, is

$$
\\bar x=\\frac{\\sum m_ix_i}{\\sum m_i}.
$$

**Rods.** If a thin rod has density $\\rho(x)$ in kg/m on $[a,b]$, a small piece has mass $\\rho(x)\\,dx$. Replacing sums by integrals,

$$
m=\\int_a^b\\rho\\,dx,\\qquad\\bar x=\\frac1m\\int_a^bx\\rho(x)\\,dx.
$$

For example, a rod on $[0,2]$ with $\\rho(x)=1+x$ has $m=4$ and $\\bar x=\\tfrac14\\int_0^2(x+x^2)\\,dx=\\tfrac14\\left(2+\\tfrac83\\right)=\\tfrac76$. This is to the right of the midpoint, on the heavier side.

**Plates.** A thin flat plate of uniform density balances at its **centroid**. Take the region under $y=f(x)\\ge0$ on $[a,b]$, with area $A$. A vertical strip at $x$ has area $f(x)\\,dx$, and its own centre is at height $\\tfrac12f(x)$. So

$$
\\bar x=\\frac1A\\int_a^bxf(x)\\,dx,\\qquad\\bar y=\\frac1A\\int_a^b\\tfrac12f(x)^2\\,dx.
$$

For the region between $f$ on top and $g$ below, use $\\bar x=\\dfrac1A\\int x(f-g)\\,dx$ and $\\bar y=\\dfrac1A\\int\\tfrac12(f^2-g^2)\\,dx$.

**Worked example.** Find the centroid of the region under $y=\\sqrt{x}$ on $[0,4]$. First,

$$
A=\\int_0^4x^{1/2}\\,dx=\\frac{16}{3}.
$$

Next,

$$
\\bar x=\\frac{3}{16}\\int_0^4x^{3/2}\\,dx=\\frac{3}{16}\\cdot\\frac25\\cdot32=\\frac{12}{5},\\qquad\\bar y=\\frac{3}{16}\\int_0^4\\frac x2\\,dx=\\frac{3}{16}\\cdot4=\\frac34.
$$

So the centroid is at $(2.4,\\ 0.75)$. It is to the right of the middle of the base, where most of the area lies, and low down.

**Symmetry.** If a region has a line of symmetry, the centroid is on that line. This saves an integral, and sometimes two.

**Pappus's theorem.** If a plane region of area $A$ lies on one side of a line and is rotated about it, the volume of the solid is

$$
V=2\\pi\\bar rA,
$$

where $\\bar r$ is the distance from the centroid to the line. In other words, volume equals area times the distance travelled by the centroid. A torus from a disk of radius $r$ whose centre is at distance $R$ from the axis has $V=2\\pi R\\cdot\\pi r^2=2\\pi^2Rr^2$, as you found by shells in Calculus I. It also works in reverse: the known volume of a sphere gives the centroid of a half-disk.`,
          resources: [
            openstax('2-6-moments-and-centers-of-mass', 'Moments and centers of mass', 'Rods, plates and Pappus.', true),
            paul('CenterOfMass', 'Center of mass', 'Plate examples.'),
          ],
          exercises: [
            {
              slug: 'mass-points-rods',
              title: 'Masses and rods',
              prompt: `(a) Find the centre of mass of $2$ kg at $x=1$, $3$ kg at $x=4$ and $5$ kg at $x=-2$. (b) A rod on $[0,3]$ m has density $\\rho(x)=x^2$ kg/m. Find its mass and centre of mass. Is the result to the right of the midpoint, as you would expect?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 0.4. (b) m = 9 kg, x bar = 9/4 m.',
            },
            {
              slug: 'centroids',
              title: 'Centroids of regions',
              prompt: `Find the centroid of each region, using symmetry where you can: (a) between $y=x^2$ and $y=x$, (b) the quarter disk $x^2+y^2\\le r^2$ with $x,y\\ge0$, (c) the triangle with vertices $(0,0)$, $(b,0)$, $(0,h)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) (1/2, 2/5). (b) (4r/(3 pi), 4r/(3 pi)). (c) (b/3, h/3).',
            },
            {
              slug: 'pappus',
              title: 'Using Pappus',
              prompt: `(a) Use the volume of a sphere and Pappus's theorem to show that a half-disk of radius $r$ has its centroid at distance $4r/(3\\pi)$ from the diameter. (b) Rotate the triangle with vertices $(1,0)$, $(3,0)$, $(1,3)$ about the $y$-axis, and find the volume by Pappus. Confirm by shells.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'The centroid of the triangle is at x = 5/3, and its area is 3, so V = 10 pi.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is a moment?',
              answerOutline: 'Mass times signed distance from the reference point.',
            },
            {
              question: 'Why does the $\\bar y$ formula have $\\tfrac12f(x)^2$?',
              answerOutline: 'A strip has area $f\\,dx$ and centre at height $f/2$, so its moment is $\\tfrac12f^2dx$.',
            },
            {
              question: 'State Pappus\'s theorem in words.',
              answerOutline: 'The volume of revolution equals the area of the region times the distance travelled by its centroid.',
            },
          ],
        },
        {
          slug: 'probability-with-integrals',
          title: 'Probability with integrals',
          summary:
            'Probability densities, means and variances, and the exponential and normal distributions.',
          estimatedMinutes: 150,
          objectives: [
            'State what makes a function a probability density',
            'Compute probabilities as areas',
            'Compute the mean, median and variance from a density',
            'Work with exponential waiting times',
            'Use the standard normal density',
          ],
          concepts: [
            'Probability density function',
            'Normalisation',
            'Mean as a centre of mass',
            'Median',
            'Variance',
            'Exponential and normal distributions',
          ],
          explanation: `A continuous random quantity $X$, such as a waiting time, has a **probability density** $f$, with $f(x)\\ge0$ and

$$
\\int_{-\\infty}^\\infty f(x)\\,dx=1.
$$

Probability is area:

$$
P(a\\le X\\le b)=\\int_a^bf(x)\\,dx.
$$

The probability of any single exact value is $0$, and $f(x)$ is not itself a probability. It is a probability per unit of $x$, and it can exceed $1$.

The **mean** is $\\mu=\\int_{-\\infty}^\\infty xf(x)\\,dx$. This is exactly the centre of mass of the previous lesson, with total mass $1$. The **median** $m$ splits the probability in half: $\\int_{-\\infty}^mf\\,dx=\\tfrac12$. The **variance** measures spread: $\\sigma^2=\\int_{-\\infty}^\\infty(x-\\mu)^2f(x)\\,dx$.

**Exponential waiting times.** With rate $\\lambda>0$,

$$
f(x)=\\lambda e^{-\\lambda x}\\quad\\text{for }x\\ge0,
$$

and $f(x)=0$ for $x<0$. The total area is $1$, and integration by parts gives the mean $1/\\lambda$.

**Worked example.** Calls arrive at a help desk, and the time to the next call is exponential with mean $5$ minutes, so $\\lambda=0.2$ per minute. The probability of waiting over $10$ minutes is

$$
P(X>10)=\\int_{10}^\\infty0.2e^{-0.2x}\\,dx=\\left[-e^{-0.2x}\\right]_{10}^\\infty=e^{-2}\\approx0.135.
$$

For the median, solve $1-e^{-0.2m}=\\tfrac12$, to get $m=5\\ln2\\approx3.47$ minutes. The median is below the mean, because a few long waits pull the mean to the right.

**The normal distribution.** The familiar bell curve has density

$$
f(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right).
$$

It has no elementary antiderivative, so its probabilities come from tables or numerics. About $68.3\\%$ of the probability lies within one standard deviation of the mean, and about $95.4\\%$ within two. The constant $1/(\\sigma\\sqrt{2\\pi})$ comes from the Gaussian integral $\\int_{-\\infty}^\\infty e^{-x^2}dx=\\sqrt\\pi$, which is proved with double integrals in Calculus III.

To make a function into a density, multiply it by a constant so that the total area is $1$. That step is called **normalising**.`,
          resources: [
            paul('Probability', 'Probability', 'Densities and mean values with examples.'),
            openstax('3-7-improper-integrals', 'Improper integrals', 'Review, since densities over infinite ranges are improper integrals.'),
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/continuous-distributions'],
          exercises: [
            {
              slug: 'normalise',
              title: 'Normalise a density',
              prompt: `Let $f(x)=cx(1-x)$ on $[0,1]$, and $0$ elsewhere. Find the constant $c$ that makes $f$ a density. Then find $P(X\\le\\tfrac14)$, the mean and the variance of $X$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'c = 6, P = 5/32, mean 1/2, variance 1/20.',
            },
            {
              slug: 'memoryless',
              title: 'Exponential distribution',
              prompt: `For the exponential density with rate $\\lambda$: (a) prove that the mean is $1/\\lambda$ and the variance is $1/\\lambda^2$. (b) Prove the memoryless property $P(X>s+t\\mid X>s)=P(X>t)$, where the conditional probability is $P(X>s+t)/P(X>s)$. (c) Explain in words why the time you have already waited for the next radioactive decay does not matter.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a) use parts, or the gamma function result. For (b), P(X > t) = e^(-lambda t).',
            },
            {
              slug: 'normal-numerics',
              title: 'The one-sigma rule',
              prompt: `Use the Simpson rule with $n=10$ on $\\dfrac{1}{\\sqrt{2\\pi}}\\int_{-1}^{1}e^{-x^2/2}\\,dx$ to confirm that about $68.3\\%$ of a normal distribution lies within one standard deviation of the mean. Use symmetry to reduce the work. Then find $P(X>2)$ for a standard normal, from the two-sigma figure in the lesson.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Simpson gives about 0.6827. P(X > 2) is about (1 - 0.954)/2, or about 0.023.',
            },
          ],
          selfAssessment: [
            {
              question: 'Can a probability density exceed $1$?',
              answerOutline: 'Yes. Only the area must equal $1$. A uniform density on $[0,\\tfrac12]$ has value $2$.',
            },
            {
              question: 'How is the mean of a density related to centres of mass?',
              answerOutline: 'It is the balance point of the density, thinking of $f$ as a mass density with total mass $1$.',
            },
            {
              question: 'Why is the median of the exponential below its mean?',
              answerOutline: 'The distribution is skewed: a long right tail pulls the mean up, but not the median.',
            },
          ],
        },
        {
          slug: 'simple-differential-equations',
          title: 'Simple differential equations',
          summary:
            'Solving separable equations, and modelling growth, cooling, mixing and logistic populations.',
          estimatedMinutes: 170,
          objectives: [
            'Recognise and solve separable equations',
            'Apply initial conditions',
            'Spot solutions lost when dividing',
            'Model exponential growth, Newton cooling and mixing',
            'Interpret a logistic model',
          ],
          concepts: [
            'Differential equation',
            'Separation of variables',
            'Equilibrium solution',
            'Newton\'s law of cooling',
            'Mixing problem',
            'Blow-up',
          ],
          explanation: `A **differential equation** relates an unknown function to its derivatives. Solving one means finding the function, and science is full of them, because laws of nature are usually statements about rates.

An equation is **separable** if it can be written $\\dfrac{dy}{dx}=g(x)h(y)$. Move all the $y$ terms to one side, and integrate:

$$
\\int\\frac{dy}{h(y)}=\\int g(x)\\,dx.
$$

This is legitimate, as it is really a substitution in disguise. A constant appears, which a starting value then fixes.

**Worked example 1.** Solve $y'=xy$ with $y(0)=2$. Separate: $\\dfrac{dy}{y}=x\\,dx$. Integrate: $\\ln|y|=\\dfrac{x^2}{2}+C$. Exponentiate: $y=Ae^{x^2/2}$, where $A=\\pm e^C$. The condition $y(0)=2$ gives $A=2$, so $y=2e^{x^2/2}$.

Dividing by $y$ assumed $y\\ne0$, and $y=0$ is a solution of the original equation. Such constant solutions are called **equilibria**, and you must check them separately. Here $A=0$ recovers it.

**Growth and decay.** The equation $y'=ky$ says that the rate is proportional to the amount. Its solution is $y=y_0e^{kt}$, which grows for $k>0$ and decays for $k<0$.

**Worked example 2 (cooling).** Newton's law says that an object's temperature changes at a rate proportional to its difference from the surroundings: $T'=-k(T-T_s)$. A coffee at $90^\\circ$C sits in a room at $20^\\circ$C, and after $10$ minutes it is at $60^\\circ$C. When does it reach $30^\\circ$C?

Let $D=T-20$, so that $D'=-kD$ and $D=70e^{-kt}$. At $t=10$, $40=70e^{-10k}$, which gives $e^{-10k}=\\tfrac47$ and $k=\\tfrac{1}{10}\\ln\\tfrac74\\approx0.0560$ per minute. For $T=30$, we need $70e^{-kt}=10$, so

$$
t=\\frac{\\ln7}{k}\\approx34.8\\text{ minutes}.
$$

**Mixing.** Let $Q(t)$ be the amount of a substance in a well-stirred tank. Then $Q'$ equals the rate in minus the rate out, and the rate out is the concentration $Q/V$ times the outflow. The model is often separable, and the setup is the main skill.

**Logistic growth.** Real populations are limited by a carrying capacity $M$: $P'=kP(1-P/M)$. In Module 1 you derived the solution $P=\\dfrac{M}{1+Ae^{-kt}}$, an S-curve. It looks exponential at first, then levels off at $M$.

**Solutions can blow up.** The equation $y'=y^2$ with $y(0)=1$ has solution $y=\\dfrac{1}{1-x}$, which reaches infinity at $x=1$, although the equation looks harmless. Differential equations get their own full course later in the curriculum, and these methods are the first step.`,
          resources: [
            openstax('4-3-separable-equations', 'Separable equations', 'The method, with cooling and mixing applications.', true),
            openstax('4-4-the-logistic-equation', 'The logistic equation', 'Derivation and interpretation.'),
            openstax('4-1-basics-of-differential-equations', 'Basics of differential equations', 'Definitions and initial value problems.'),
          ],
          exercises: [
            {
              slug: 'separable-drill',
              title: 'Separable drill',
              prompt: `Solve each initial value problem, and state where the solution is defined: (a) $y'=x/y$, $y(0)=2$, (b) $y'=y^2$, $y(0)=1$, (c) $y'=y\\cos x$, $y(0)=1$, (d) $y'=e^{-y}$, $y(0)=0$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) y = sqrt(x^2 + 4), all x. (b) y = 1/(1 - x), for x < 1. (c) y = e^(sin x), all x. (d) y = ln(x + 1), for x > -1.',
            },
            {
              slug: 'decay-and-mixing',
              title: 'Decay and mixing',
              prompt: `(a) Carbon-14 has a half-life of about $5730$ years. A sample has $30\\%$ of its original carbon-14. Estimate its age. (b) A tank holds $1000$ L of water with $50$ kg of salt dissolved in it. Pure water flows in at $10$ L/min, and the mixture flows out at the same rate. Write the equation for the salt $Q(t)$, solve it, and find when $10$ kg remains.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) About 9950 years. (b) Q prime = -Q/100, so Q = 50 e^(-t/100), and 10 kg remains at t = 100 ln 5, about 161 minutes.',
            },
            {
              slug: 'logistic-use',
              title: 'Use a logistic model',
              prompt: `A fish population in a lake follows $P'=0.5P(1-P/1000)$, with $t$ in years and $P(0)=100$. Using the solution $P=\\dfrac{M}{1+Ae^{-kt}}$, find $A$. Find when $P$ reaches $500$, and when it reaches $900$. What sustainable yearly catch would keep the population at $500$?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'A = 9. P = 500 at t = 2 ln 9, about 4.39 years. P = 900 at t = 4 ln 9, about 8.79 years. At P = 500 the growth rate is 125 fish per year, which is the sustainable catch.',
            },
            {
              slug: 'falling-with-drag',
              title: 'Falling with drag',
              prompt: `A falling object with linear drag obeys $v'=g-cv$, with $c>0$ and $v(0)=0$. Separate variables to find $v(t)$, and find the terminal velocity. Why is it not surprising that this equation has the same structure as Newton's law of cooling? Integrate once more to find the distance fallen.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'v = (g/c)(1 - e^(-ct)), with terminal velocity g/c. Distance = (g/c)t - (g/c^2)(1 - e^(-ct)).',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you tell whether an equation is separable?',
              answerOutline: 'The right side must factor into a function of $x$ times a function of $y$.',
            },
            {
              question: 'What can be lost when you divide by $h(y)$?',
              answerOutline: 'Constant solutions where $h(y)=0$. Check them separately.',
            },
            {
              question: 'What is the long-term temperature in Newton\'s law of cooling?',
              answerOutline: 'The temperature of the surroundings.',
            },
          ],
        },
      ],
      project: {
        slug: 'cooling-curve',
        title: 'A cooling curve in your kitchen',
        description: `Test Newton's law of cooling on a real cup. Pour hot water in a mug, and record the temperature with a kitchen thermometer every two minutes for at least forty minutes. Note the room temperature. Take $\\ln(T-T_s)$ and plot it against time. If the law holds, this is a straight line, and its slope gives $-k$. Fit the model, use it to predict the temperature at a later time, then measure that time to test your prediction. Repeat with a lid, or with a different mug, and compare the values of $k$. Finally, use the fitted model to answer a practical question: if you must add cold milk, is your drink warmer if you add it at the start or at the end of a fifteen minute wait?`,
        deliverables: [
          'A table of times and temperatures, and the measured room temperature',
          'A plot of ln(T - Ts) against time, with a fitted line and the value of k',
          'A derivation of the model from the differential equation',
          'A prediction tested against a later measurement, with the size of the error',
          'A comparison of k across two setups, with a physical explanation',
          'A worked answer to the milk question, with your mixing assumption stated',
        ],
        estimatedHours: 4,
        stretchGoals: ['Look for systematic curvature in the log plot, and suggest what physical effect it may reflect'],
      },
    },
    {
      slug: 'sequences-and-series',
      title: 'Sequences and Series',
      description:
        'What it means to add infinitely many numbers, and a set of tests that decide whether the sum makes sense.',
      lessons: [
        {
          slug: 'sequences',
          title: 'Sequences',
          summary:
            'Infinite lists of numbers, their limits, and the monotone convergence theorem.',
          estimatedMinutes: 150,
          objectives: [
            'Compute limits of sequences with function limits and the squeeze theorem',
            'State when a geometric sequence converges',
            'Apply the monotone convergence theorem',
            'Find the limit of a recursive sequence, after proving that it exists',
          ],
          concepts: [
            'Sequence and its limit',
            'Convergence and divergence',
            'Bounded and monotonic sequences',
            'Monotone convergence theorem',
            'Recursive definition',
          ],
          explanation: `A **sequence** is an infinite ordered list $a_1,a_2,a_3,\\dots$, in other words a function on the positive integers. It **converges** to $L$ if the terms get and stay as close to $L$ as we like: for every $\\varepsilon>0$ there is an $N$ with $|a_n-L|<\\varepsilon$ for all $n>N$. Otherwise it **diverges**.

Your limit methods carry over. If $a_n=f(n)$ and $\\lim_{x\\to\\infty}f(x)=L$, then $a_n\\to L$. So you can use L'Hopital's rule on $f$ even though it cannot be applied to $a_n$ directly, since $a_n$ is defined only on integers. For example, $\\ln n/n\\to0$ because $\\ln x/x\\to0$. The limit laws and the squeeze theorem also hold. A useful special case: if $|a_n|\\to0$ then $a_n\\to0$, so $(-1)^n/n\\to0$.

**Geometric sequences.** $r^n$ tends to $0$ if $|r|<1$, equals $1$ always if $r=1$, and diverges for $r=-1$ (it oscillates) and for $|r|>1$.

Standard limits worth memorising, all for fixed $x$: $\\sqrt[n]{n}\\to1$, $(1+x/n)^n\\to e^x$, and $x^n/n!\\to0$. The last says that factorials outgrow exponentials.

**Monotone convergence.** A sequence is **increasing** if $a_{n+1}\\ge a_n$ for every $n$, and **bounded above** if some $M$ has $a_n\\le M$ for all $n$. The theorem says that every bounded, monotonic sequence converges. This is a deep property of the real numbers, in effect that the number line has no holes. Its value is that it proves a limit exists without knowing what it is.

**Worked example.** Let $a_1=\\sqrt2$ and $a_{n+1}=\\sqrt{2+a_n}$. The first few terms are $1.414,\\ 1.848,\\ 1.962,\\ 1.990$.

*Bounded.* We show $a_n<2$ by induction. It holds for $n=1$. If $a_n<2$, then $a_{n+1}=\\sqrt{2+a_n}<\\sqrt4=2$.

*Increasing.* For $0<a_n<2$, $a_{n+1}^2-a_n^2=2+a_n-a_n^2=(2-a_n)(1+a_n)>0$, so $a_{n+1}>a_n$.

So the sequence converges to some $L$, and we can take limits in the recursion: $L=\\sqrt{2+L}$, so $L^2-L-2=(L-2)(L+1)=0$. Since the terms are positive, $L=2$.

Do not skip the existence step. The sequence $a_1=2$, $a_{n+1}=a_n^2$ would "solve" $L=L^2$ to give $L=0$ or $1$, but it plainly diverges to infinity.`,
          resources: [
            openstax('5-1-sequences', 'Sequences', 'Limits, with monotone convergence.', true),
            paul('Sequences', 'Sequences', 'Definitions with examples.'),
            paul('MoreSequences', 'More on sequences', 'Monotonic and bounded sequences.'),
          ],
          exercises: [
            {
              slug: 'sequence-limits',
              title: 'Limits of sequences',
              prompt: `Find each limit, or show that the sequence diverges: (a) $\\dfrac{3n^2+1}{n^2+n}$, (b) $\\dfrac{n}{2^n}$, (c) $(-1)^n\\dfrac{n}{n+1}$, (d) $\\sqrt[n]{n}$, (e) $(1+2/n)^n$, (f) $\\dfrac{n!}{n^n}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 3. (b) 0. (c) diverges. (d) 1, by taking logs. (e) e^2. (f) 0: squeeze between 0 and 1/n.',
            },
            {
              slug: 'recursive-sequences',
              title: 'Recursive sequences',
              prompt: `For each recursion, prove convergence by showing it is monotonic and bounded, then find the limit. (a) $a_1=1$, $a_{n+1}=\\tfrac12(a_n+6)$. (b) $a_1=2$, $a_{n+1}=\\tfrac12(a_n+3/a_n)$, which is Newton's method for $\\sqrt3$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Increasing, bounded by 6, limit 6. (b) By the inequality of the means, a_n >= sqrt 3 for every n, and then the sequence decreases. The limit is sqrt 3.',
            },
            {
              slug: 'golden-ratio',
              title: 'Fibonacci and the golden ratio',
              prompt: `With Fibonacci numbers $F_1=F_2=1$, $F_{n+1}=F_n+F_{n-1}$, let $r_n=F_{n+1}/F_n$. (a) Show that $r_{n+1}=1+1/r_n$. (b) Compute $r_1$ to $r_8$. (c) Assuming the limit exists, show that it equals $(1+\\sqrt5)/2$. (d) Explain why the sequence $r_n$ is not monotonic, so that the monotone convergence theorem cannot be used directly.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The terms alternate above and below the limit: 1, 2, 1.5, 1.667, 1.6, 1.625, 1.615, 1.619.',
            },
          ],
          selfAssessment: [
            {
              question: 'Can a bounded sequence diverge?',
              answerOutline: 'Yes: $(-1)^n$. The theorem needs bounded and monotonic.',
            },
            {
              question: 'Why must you prove that the limit exists before solving $L=f(L)$?',
              answerOutline: 'The equation holds only if a limit exists. It can have solutions when the sequence diverges.',
            },
            {
              question: 'For which $r$ does $r^n$ converge?',
              answerOutline: '$-1<r\\le1$.',
            },
          ],
        },
        {
          slug: 'series-basics',
          title: 'Infinite series',
          summary:
            'Partial sums, geometric and telescoping series, the divergence test and the harmonic series.',
          estimatedMinutes: 170,
          objectives: [
            'Define the sum of a series using partial sums',
            'Sum geometric series',
            'Sum telescoping series',
            'Apply the divergence test, and state what it cannot show',
            'Prove that the harmonic series diverges',
          ],
          concepts: [
            'Partial sum',
            'Convergent series',
            'Geometric series',
            'Telescoping series',
            'Divergence test',
            'Harmonic series',
          ],
          explanation: `An infinite sum cannot be done term by term. It is defined through a sequence. The **partial sums** are $s_n=a_1+a_2+\\dots+a_n$. If $s_n\\to S$, the series $\\sum_{n=1}^\\infty a_n$ **converges** with sum $S$. If not, it **diverges**.

Keep the two sequences apart: $a_n$ is what you add, and $s_n$ is the running total.

**Geometric series.** For $s_n=a+ar+\\dots+ar^{n-1}$, multiply by $r$, subtract, and solve to get $s_n=\\dfrac{a(1-r^n)}{1-r}$ for $r\\ne1$. Thus

$$
\\sum_{n=1}^\\infty ar^{n-1}=\\frac{a}{1-r}\\quad\\text{if }|r|<1,
$$

and it diverges if $|r|\\ge1$ (with $a\\ne0$). In words: first term over one minus the ratio.

**Worked example 1.** The repeating decimal $0.999\\ldots$ is the geometric series $\\tfrac{9}{10}+\\tfrac{9}{100}+\\dots$, with $a=\\tfrac{9}{10}$ and $r=\\tfrac{1}{10}$. Its sum is $\\dfrac{9/10}{9/10}=1$. So $0.999\\ldots$ equals $1$, exactly.

**Worked example 2.** $\\displaystyle\\sum_{n=1}^\\infty\\left(\\frac23\\right)^n=\\frac{2/3}{1-2/3}=2$. The first term here is $\\tfrac23$, because the sum starts at $n=1$.

**Telescoping series.** If terms cancel in pairs, $s_n$ collapses. Since $\\dfrac{1}{n(n+1)}=\\dfrac1n-\\dfrac{1}{n+1}$,

$$
s_n=\\left(1-\\frac12\\right)+\\left(\\frac12-\\frac13\\right)+\\dots+\\left(\\frac1n-\\frac{1}{n+1}\\right)=1-\\frac{1}{n+1}\\to1.
$$

**Divergence test.** If $\\sum a_n$ converges, then $a_n\\to0$, because $a_n=s_n-s_{n-1}\\to S-S=0$. So if the terms do not tend to $0$, the series diverges. This is the first check for any series. The converse is **false**: terms tending to zero do not guarantee convergence.

**Worked example 3 (the harmonic series).** $\\sum1/n$ has terms tending to $0$, but it diverges. Group the terms:

$$
1+\\frac12+\\left(\\frac13+\\frac14\\right)+\\left(\\frac15+\\dots+\\frac18\\right)+\\dots\\ge1+\\frac12+\\frac12+\\frac12+\\dots
$$

Each group has a sum of at least $\\tfrac12$, so the partial sums grow without bound, although very slowly: it takes more than $12\\,000$ terms to pass $10$.

**Algebra.** Convergent series may be added term by term and multiplied by constants. Changing finitely many terms does not affect whether a series converges, though it changes the sum.`,
          resources: [
            openstax('5-2-infinite-series', 'Infinite series', 'Partial sums, geometric and telescoping series.', true),
            paul('Series_Basics', 'Series: the basics', 'Notation and index shifts.'),
            paul('ConvergenceOfSeries', 'Convergence and divergence', 'Definition, with the divergence test.'),
            paul('Series_Special', 'Special series', 'Geometric, telescoping and harmonic series.'),
          ],
          exercises: [
            {
              slug: 'sum-series',
              title: 'Sum these series',
              prompt: `Find the sum of each series, or explain why it diverges: (a) $\\sum_{n=1}^\\infty3(\\tfrac14)^{n-1}$, (b) $\\sum_{n=0}^\\infty(-\\tfrac23)^n$, (c) $\\sum_{n=1}^\\infty\\dfrac{2^{n+1}}{3^n}$, (d) $\\sum_{n=1}^\\infty\\dfrac{1}{n^2+3n+2}$, (e) $\\sum_{n=1}^\\infty\\dfrac{n}{n+1}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 4. (b) 3/5. (c) 4. (d) 1/2, since the term is 1/(n + 1) - 1/(n + 2). (e) diverges, as the terms tend to 1.',
            },
            {
              slug: 'geometric-applications',
              title: 'Geometric applications',
              prompt: `(a) Write $0.\\overline{12}=0.121212\\ldots$ as a fraction. (b) A ball is dropped from $2$ m, and each bounce returns it to $\\tfrac34$ of the previous height. Find the total distance it travels. (c) With $g=9.8\\ \\text{m/s}^2$, find the total time before it stops. Is it paradoxical that infinitely many bounces take a finite time?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 4/33. (b) 2 + 2(1.5)/(1 - 3/4) = 14 m. (c) Falling takes sqrt(2h/g). The total is T0(1 + 2 r/(1 - r)), where T0 = sqrt(4/9.8) and r = sqrt 3/2; about 8.90 s.',
            },
            {
              slug: 'terms-to-zero',
              title: 'Terms tending to zero',
              prompt: `(a) Show that $\\sum_{n=1}^\\infty\\ln(1+1/n)$ diverges by writing it as a telescoping sum, although its terms tend to $0$. (b) Show that $\\sum_{n=1}^\\infty\\cos(1/n)$ diverges. (c) Koch snowflake: start with an equilateral triangle of area $A_0$. Each step adds a small triangle, with side $\\tfrac13$ as long, to the middle of every edge, and each edge becomes four. Find the limit of the area, and show that the perimeter tends to infinity.`,
              kind: 'derivation',
              difficulty: 3,
              hint: '(a) Partial sums are ln(n + 1). (b) Terms tend to 1. (c) At step k there are 3 times 4^(k-1) new triangles, each of area A0/9^k. The total is (8/5) A0. The perimeter multiplies by 4/3 each step.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between $\\lim a_n$ and $\\sum a_n$?',
              answerOutline: 'The first is the limit of the terms. The second is the limit of the partial sums.',
            },
            {
              question: 'If $a_n\\to0$, does $\\sum a_n$ converge?',
              answerOutline: 'Not necessarily. The harmonic series is the standard counterexample.',
            },
            {
              question: 'Give the sum of a geometric series and the condition for it.',
              answerOutline: 'First term over $(1-r)$, for $|r|<1$.',
            },
          ],
        },
        {
          slug: 'integral-and-comparison-tests',
          title: 'The integral and comparison tests',
          summary:
            'Testing positive series by comparing them with integrals and with series you already understand.',
          estimatedMinutes: 170,
          objectives: [
            'State and apply the integral test with its hypotheses',
            'Use the $p$-series result',
            'Estimate the error in a partial sum with integrals',
            'Apply the direct and limit comparison tests',
          ],
          concepts: [
            'Integral test',
            '$p$-series',
            'Remainder estimate',
            'Direct comparison',
            'Limit comparison',
          ],
          explanation: `For a series of positive terms, the partial sums only go up. So by monotone convergence the only question is whether they stay bounded. All the tests in this lesson answer that.

**Integral test.** Let $f$ be continuous, positive and decreasing on $[1,\\infty)$, with $a_n=f(n)$. Then $\\sum a_n$ converges exactly when $\\int_1^\\infty f(x)\\,dx$ converges.

Picture rectangles of width $1$ under and over the curve: $\\sum_{n=2}^Na_n\\le\\int_1^Nf\\,dx\\le\\sum_{n=1}^{N-1}a_n$. The integral and the sum are bounded together. The value of the integral is not generally the sum of the series.

**$p$-series.** By the integral test, and the $p$-integral,

$$
\\sum_{n=1}^\\infty\\frac{1}{n^p}\\text{ converges exactly when }p>1.
$$

So $\\sum1/n^2$ converges, and $\\sum1/\\sqrt{n}$ diverges.

**Remainder estimate.** The same picture bounds the error when a series is cut off after $n$ terms. If $R_n=\\sum_{k=n+1}^\\infty a_k$, then

$$
\\int_{n+1}^\\infty f\\,dx\\le R_n\\le\\int_n^\\infty f\\,dx.
$$

**Worked example 1.** For $\\sum1/n^2$, $\\int_n^\\infty x^{-2}dx=1/n$. So $s_{10}=1.54977$ is below the sum by between $\\tfrac{1}{11}$ and $\\tfrac{1}{10}$. Hence the sum is between $1.6407$ and $1.6498$. The exact value, found by Euler, is $\\pi^2/6\\approx1.64493$.

**Direct comparison.** Let $0\\le a_n\\le b_n$. If $\\sum b_n$ converges, so does $\\sum a_n$. If $\\sum a_n$ diverges, so does $\\sum b_n$.

**Limit comparison.** Let $a_n,b_n>0$ and $\\lim a_n/b_n=L$ with $0<L<\\infty$. Then both converge or both diverge. It is the better tool for messy algebraic terms.

**Worked example 2.** Consider $\\sum\\dfrac{2n+1}{n^3+5}$. Keep the dominant terms: it looks like $\\dfrac{2n}{n^3}=\\dfrac{2}{n^2}$. Compare with $b_n=1/n^2$:

$$
\\lim_{n\\to\\infty}\\frac{(2n+1)/(n^3+5)}{1/n^2}=\\lim_{n\\to\\infty}\\frac{2n^3+n^2}{n^3+5}=2.
$$

Since $\\sum1/n^2$ converges, so does the given series.

**Worked example 3.** For $\\sum_{n=2}^\\infty\\dfrac{1}{n\\ln n}$, no simple comparison fits. The function $1/(x\\ln x)$ is positive and decreasing for $x\\ge2$, and $\\int_2^\\infty\\dfrac{dx}{x\\ln x}=\\left[\\ln\\ln x\\right]_2^\\infty=\\infty$. So it diverges. Series like this sit near the edge between convergence and divergence.

Check the hypotheses: the integral test needs positive and decreasing terms, at least eventually, and all these tests are for positive terms.`,
          resources: [
            openstax('5-3-the-divergence-and-integral-tests', 'The divergence and integral tests', 'With remainder estimates.', true),
            openstax('5-4-comparison-tests', 'Comparison tests', 'Direct and limit comparison.'),
            paul('IntegralTest', 'Integral test', 'Proof picture with worked examples.'),
            paul('SeriesCompTest', 'Comparison test and limit comparison test', 'How to pick a comparison series.'),
            paul('EstimatingSeries', 'Estimating the value of a series', 'Remainders.'),
          ],
          exercises: [
            {
              slug: 'classify-positive',
              title: 'Classify positive series',
              prompt: `Decide whether each series converges, and name the test: (a) $\\sum\\dfrac{1}{n^{1.1}}$, (b) $\\sum\\dfrac{n}{n^2+1}$, (c) $\\sum\\dfrac{1}{2^n+n}$, (d) $\\sum\\dfrac{\\ln n}{n^2}$, (e) $\\sum\\dfrac{n^2}{n^4+1}$, (f) $\\sum_{n=2}^\\infty\\dfrac{1}{n(\\ln n)^2}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) converges, p-series. (b) diverges, limit comparison with 1/n. (c) converges, below (1/2)^n. (d) converges, e.g. ln n < n^(1/2) for large n, so compare with n^(-3/2). (e) converges, compare with 1/n^2. (f) converges, integral test.',
            },
            {
              slug: 'bound-zeta',
              title: 'Bound a sum',
              prompt: `For $\\sum1/n^4$, compute $s_4$ by hand and use the integral remainder bounds to give an interval containing the exact sum. Compare with the true value $\\pi^4/90$. How many terms $n$ guarantee an error below $10^{-6}$?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The remainder after n terms lies between 1/(3(n + 1)^3) and 1/(3n^3). s4 is about 1.078752, so the sum lies between about 1.08142 and 1.08396. For error below 10^-6 you need n >= 70.',
            },
            {
              slug: 'comparison-proofs',
              title: 'Proofs about positive series',
              prompt: `Prove: (a) if $a_n\\ge0$ and $\\sum a_n$ converges, then $\\sum a_n^2$ converges. (b) Show by example that $\\sum a_n$ can diverge while $\\sum a_n^2$ converges. (c) If $a_n,b_n>0$, $a_n/b_n\\to0$ and $\\sum b_n$ converges, then $\\sum a_n$ converges. (d) Why does the case $L=0$ need a separate statement in limit comparison?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a), the terms eventually fall below 1, so a_n^2 <= a_n from some point on. For (b) use 1/n.',
            },
          ],
          selfAssessment: [
            {
              question: 'What three properties of $f$ does the integral test need?',
              answerOutline: 'Continuous, positive and decreasing, at least for large $x$.',
            },
            {
              question: 'Does the integral equal the sum of the series?',
              answerOutline: 'No. They converge or diverge together, but their values differ.',
            },
            {
              question: 'For which $p$ does $\\sum n^{-p}$ converge?',
              answerOutline: '$p>1$.',
            },
          ],
        },
        {
          slug: 'alternating-and-absolute',
          title: 'Alternating series and absolute convergence',
          summary:
            'Series with signs: the alternating series test, its error bound, and the difference between absolute and conditional convergence.',
          estimatedMinutes: 170,
          objectives: [
            'State and apply the alternating series test',
            'Bound the error in an alternating sum',
            'Distinguish absolute and conditional convergence',
            'Explain why conditionally convergent series are delicate',
          ],
          concepts: [
            'Alternating series test',
            'Error bound by the first omitted term',
            'Absolute convergence',
            'Conditional convergence',
            'Rearrangement',
          ],
          explanation: `**Alternating series test.** If $b_n>0$, $b_{n+1}\\le b_n$ for all large $n$, and $b_n\\to0$, then $\\sum(-1)^{n-1}b_n$ converges.

The reason is visible on a number line. The partial sums step right, then left, then right, each step shorter than the last. The even partial sums rise and the odd ones fall, and they squeeze together on the limit.

For this reason the sum always lies between two consecutive partial sums, which gives a free error bound:

$$
|S-s_n|\\le b_{n+1}.
$$

The error is at most the size of the first term you left out, and its sign is the sign of that term.

**Worked example 1.** The **alternating harmonic series** $1-\\tfrac12+\\tfrac13-\\tfrac14+\\dots$ converges by the test, while the harmonic series itself diverges. In the next module you will see that its sum is $\\ln2$.

**Worked example 2.** To sum $\\sum(-1)^{n-1}/n^2$ with error below $0.001$, we need $\\dfrac{1}{(n+1)^2}<0.001$, which means $n+1\\ge32$, so $n=31$ terms suffice. (The first omitted term is $1/1024$, just under $0.001$.)

**Absolute and conditional convergence.** A series $\\sum a_n$ **converges absolutely** if $\\sum|a_n|$ converges. If $\\sum a_n$ converges and $\\sum|a_n|$ diverges, it **converges conditionally**.

**Theorem.** Absolute convergence implies convergence. *Proof.* We have $0\\le a_n+|a_n|\\le2|a_n|$, so $\\sum(a_n+|a_n|)$ converges by comparison, and $\\sum a_n$ is the difference of two convergent series. $\\blacksquare$

This extends every test for positive series to series with arbitrary signs. For example, $\\left|\\dfrac{\\cos n}{n^2}\\right|\\le\\dfrac{1}{n^2}$, so $\\sum\\dfrac{\\cos n}{n^2}$ converges absolutely, even though the signs follow no simple pattern.

Decide in this order. First test $\\sum|a_n|$. If it converges, you are done. If it diverges, then check for conditional convergence, usually with the alternating series test. Then state which case holds.

**Why the distinction matters.** A sum of infinitely many terms is a limit, not ordinary addition, and order can matter. An absolutely convergent series can be rearranged freely, with the same sum. A conditionally convergent one cannot: Riemann's rearrangement theorem says that its terms can be reordered to sum to **any** real number, or to diverge. A conditionally convergent sum relies on a delicate balance of positive and negative parts that both diverge on their own.

All three conditions of the alternating test matter. A series may alternate, with terms tending to zero, and still diverge if those terms do not eventually decrease. An exercise below constructs one.`,
          resources: [
            openstax('5-5-alternating-series', 'Alternating series', 'The test, error bounds and conditional convergence.', true),
            paul('AlternatingSeries', 'Alternating series test', 'Careful checks of the conditions.'),
            paul('AbsoluteConvergence', 'Absolute convergence', 'Definitions and rearrangements.'),
          ],
          exercises: [
            {
              slug: 'classify-signed',
              title: 'Classify signed series',
              prompt: `Classify each series as absolutely convergent, conditionally convergent or divergent: (a) $\\sum\\dfrac{(-1)^n}{\\sqrt{n}}$, (b) $\\sum\\dfrac{(-1)^nn}{n+1}$, (c) $\\sum\\dfrac{(-1)^n}{n^3}$, (d) $\\sum\\dfrac{\\sin n}{n^2}$, (e) $\\sum_{n=2}^\\infty\\dfrac{(-1)^n\\ln n}{n}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) conditional. (b) divergent, as the terms do not tend to 0. (c) absolute. (d) absolute. (e) conditional, with terms decreasing from n = 3.',
            },
            {
              slug: 'alternating-estimate',
              title: 'Estimate an alternating sum',
              prompt: `Estimate $\\sum_{n=1}^\\infty(-1)^{n-1}/n^4$ with error below $0.0005$. Decide how many terms you need by using the error bound, then compute the sum by hand. Compare with the exact value $7\\pi^4/720$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'You need 1/(n + 1)^4 < 0.0005, so n = 6 terms, giving about 0.94677. The exact value is about 0.94703, and the error of 0.00026 is inside the bound.',
            },
            {
              slug: 'rearrangement',
              title: 'Rearrangement in action',
              prompt: `(a) Take the alternating harmonic series with sum $S$, and rearrange it as $1-\\tfrac12-\\tfrac14+\\tfrac13-\\tfrac16-\\tfrac18+\\tfrac15-\\dots$, with one positive term followed by two negative ones. Group the terms to show the new sum is $\\tfrac12S$. (b) Construct an alternating series with $b_n\\to0$ that diverges, by letting $b_n$ be $1/n$ for odd $n$ and $1/n^2$ for even $n$. Say which hypothesis fails.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a), group as (1 - 1/2) - 1/4 + (1/3 - 1/6) - 1/8 + ... = 1/2 - 1/4 + 1/6 - 1/8 + ... For (b), decreasing fails, and the positive terms alone sum to infinity while the negative terms sum to a finite value.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the error bound for an alternating series?',
              answerOutline: 'The error after $n$ terms is at most the first omitted term, $b_{n+1}$.',
            },
            {
              question: 'Give an example of conditional convergence.',
              answerOutline: 'The alternating harmonic series.',
            },
            {
              question: 'If $\\sum|a_n|$ diverges, can $\\sum a_n$ converge?',
              answerOutline: 'Yes, conditionally.',
            },
          ],
        },
        {
          slug: 'ratio-and-root-tests',
          title: 'Ratio and root tests, and a strategy',
          summary:
            'Tests based on geometric behaviour, and how to choose the right test for any series.',
          estimatedMinutes: 160,
          objectives: [
            'State and apply the ratio test',
            'State and apply the root test',
            'Recognise when these tests are inconclusive',
            'Choose a suitable test for an unlabelled series',
          ],
          concepts: [
            'Ratio test',
            'Root test',
            'Inconclusive case $L=1$',
            'Factorials and exponentials',
            'Choosing a test',
          ],
          explanation: `Both tests compare a series with a geometric series, by asking at what rate its terms shrink.

**Ratio test.** Let $L=\\lim_{n\\to\\infty}\\left|\\dfrac{a_{n+1}}{a_n}\\right|$.

- If $L<1$, the series converges absolutely.
- If $L>1$ (or the limit is $\\infty$), the series diverges.
- If $L=1$, the test says nothing.

If $L<1$, pick $r$ between $L$ and $1$. Eventually each term is less than $r$ times the one before, so the tail is below a geometric series of ratio $r$.

The test shines on factorials and exponentials, which simplify nicely in a ratio.

**Worked example 1.** For $\\sum\\dfrac{n^2}{2^n}$,

$$
\\frac{a_{n+1}}{a_n}=\\frac{(n+1)^2}{2^{n+1}}\\cdot\\frac{2^n}{n^2}=\\frac12\\left(1+\\frac1n\\right)^2\\to\\frac12<1.
$$

So it converges.

**Worked example 2.** For $\\sum\\dfrac{n!}{n^n}$,

$$
\\frac{a_{n+1}}{a_n}=\\frac{(n+1)!}{(n+1)^{n+1}}\\cdot\\frac{n^n}{n!}=\\left(\\frac{n}{n+1}\\right)^n=\\frac{1}{(1+1/n)^n}\\to\\frac1e<1.
$$

So it converges too. The $(n+1)$ factors cancel, and the limit that defines $e$ appears.

**Root test.** Let $L=\\lim_{n\\to\\infty}\\sqrt[n]{|a_n|}$. The conclusions are the same as for the ratio test. Use it when the whole term is an $n$th power.

**Worked example 3.** For $\\sum\\left(\\dfrac{n}{2n+1}\\right)^n$, the $n$th root is $\\dfrac{n}{2n+1}\\to\\tfrac12$, so it converges.

**The inconclusive case.** $\\sum1/n$ diverges and $\\sum1/n^2$ converges, and both have $L=1$ for both tests. So $L=1$ tells you nothing. Rational functions of $n$ always give $L=1$, so do not try these tests on such terms.

**Strategy.** Given a series, ask these questions in order.

1. Do the terms tend to $0$? If not, it diverges.
2. Is it geometric, a $p$-series, or telescoping? If so, use the known result.
3. Is it algebraic, a rational function of $n$ with roots? Use limit comparison.
4. Does it have factorials or $c^n$? Use the ratio test.
5. Is it an $n$th power? Use the root test.
6. Does it alternate? Check absolute convergence first, then the alternating test.
7. Is $a_n=f(n)$ with an easy integral? Use the integral test.

Sometimes a series can be handled more than one way. Choose the simplest route.`,
          resources: [
            openstax('5-6-ratio-and-root-tests', 'Ratio and root tests', 'Includes a summary table of all tests.', true),
            paul('RatioTest', 'Ratio test', 'Worked examples and limits of the test.'),
            paul('RootTest', 'Root test', 'Worked examples.'),
            paul('SeriesStrategy', 'Strategy for series', 'A decision checklist.'),
          ],
          exercises: [
            {
              slug: 'ratio-drill',
              title: 'Ratio and root drill',
              prompt: `Use the ratio or root test to decide whether each series converges: (a) $\\sum\\dfrac{3^n}{n!}$, (b) $\\sum\\dfrac{n!}{10^n}$, (c) $\\sum\\dfrac{n^3}{3^n}$, (d) $\\sum\\dfrac{(2n)!}{(n!)^2}$, (e) $\\sum\\left(\\dfrac{n+1}{n}\\right)^{n^2}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Limits: (a) L = 0, converges. (b) L = inf, diverges. (c) L = 1/3, converges. (d) L = 4, diverges. (e) root test gives L = e, diverges.',
            },
            {
              slug: 'unlabelled-series',
              title: 'Unlabelled series',
              prompt: `Decide what happens to each series, with a reason: (a) $\\sum\\dfrac{(-1)^nn}{n^2+1}$, (b) $\\sum\\dfrac{n+2^n}{3^n}$, (c) $\\sum\\sin(1/n)$, (d) $\\sum\\dfrac{1}{n^{1+1/n}}$, (e) $\\sum\\dfrac{n^{10}}{1.01^n}$, (f) $\\sum\\left(1-\\dfrac1n\\right)^n$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) conditional. (b) converges. (c) diverges, by limit comparison with 1/n. (d) diverges, by limit comparison with 1/n, since n^(1/n) tends to 1. (e) converges, ratio 1/1.01. (f) diverges, since the terms tend to 1/e.',
            },
            {
              slug: 'sum-arithmetic-geometric',
              title: 'A sum you can find exactly',
              prompt: `Show that $\\sum n/2^n$ converges by the ratio test, then find its value exactly. Let $S=\\sum_{n=1}^\\infty n/2^n$ and work out $S-\\tfrac12S$ term by term, which leaves a geometric series. Why is this manipulation justified?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'S - S/2 = 1/2 + 1/4 + 1/8 + ... = 1, so S = 2. It is justified because the series converges absolutely.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the ratio test say if $L=1$?',
              answerOutline: 'Nothing. Use another test.',
            },
            {
              question: 'When is the ratio test a poor choice?',
              answerOutline: 'For rational functions of $n$, where $L=1$ always.',
            },
            {
              question: 'What test would you first try on $\\sum\\frac{n!}{(2n)!}$?',
              answerOutline: 'The ratio test, because of the factorials.',
            },
          ],
        },
      ],
    },
    {
      slug: 'power-series',
      title: 'Power Series',
      description:
        'Functions written as infinite polynomials: where such series converge, how to build them, how good a finite part is, and what they make possible.',
      lessons: [
        {
          slug: 'radius-of-convergence',
          title: 'Power series and radius of convergence',
          summary:
            'What a power series is, why it converges on an interval, and how to find that interval, endpoints included.',
          estimatedMinutes: 150,
          objectives: [
            'Define a power series centred at $a$',
            'Find the radius of convergence with the ratio test',
            'Test the endpoints separately',
            'State the interval of convergence',
          ],
          concepts: [
            'Power series',
            'Centre',
            'Radius of convergence',
            'Interval of convergence',
            'Endpoint behaviour',
          ],
          explanation: `A **power series** centred at $a$ is

$$
\\sum_{n=0}^\\infty c_n(x-a)^n=c_0+c_1(x-a)+c_2(x-a)^2+\\dots
$$

It is a function of $x$, defined wherever the series converges. Think of it as a polynomial of infinite degree.

**Theorem.** For any power series, exactly one of these holds: it converges only at $x=a$; it converges for all $x$; or there is a number $R>0$, the **radius of convergence**, such that it converges absolutely for $|x-a|<R$ and diverges for $|x-a|>R$. In the first two cases we say $R=0$ and $R=\\infty$.

At the endpoints $x=a\\pm R$ anything can happen, and each must be tested separately, using the series tests from Module 4. The ratio test cannot help there, since it gives $L=1$.

**Worked example 1.** Find the interval of convergence of $\\sum_{n=1}^\\infty\\dfrac{x^n}{n}$. Using the ratio test with $x$ held fixed,

$$
\\left|\\frac{x^{n+1}}{n+1}\\cdot\\frac{n}{x^n}\\right|=|x|\\frac{n}{n+1}\\to|x|.
$$

So it converges for $|x|<1$ and diverges for $|x|>1$, which means $R=1$. At $x=1$ it is the harmonic series, which diverges. At $x=-1$ it is the alternating harmonic series, which converges. The interval is $[-1,1)$.

**Worked example 2.** Find the interval for $\\sum_{n=1}^\\infty\\dfrac{(x-2)^n}{3^nn^2}$. The ratio gives

$$
\\frac{|x-2|}{3}\\cdot\\frac{n^2}{(n+1)^2}\\to\\frac{|x-2|}{3}.
$$

So $R=3$, and the series converges on at least $(-1,5)$. At both endpoints the terms have size $1/n^2$, so both converge, absolutely. The interval is $[-1,5]$.

**The extremes.** For $\\sum\\dfrac{x^n}{n!}$, the ratio is $\\dfrac{|x|}{n+1}\\to0$ for every $x$, so $R=\\infty$. For $\\sum n!\\,x^n$, the ratio is $(n+1)|x|\\to\\infty$ for every $x\\ne0$, so $R=0$, and this series converges only at its centre.

**Watch the powers.** For $\\sum\\dfrac{x^{2n}}{4^n}$, a ratio of consecutive non-zero terms gives $x^2/4$, so the series converges for $x^2<4$, in other words $|x|<2$. Treat the whole term, and do not assume that $R$ is the reciprocal of a coefficient ratio in the case when powers are skipped.

Inside the radius a power series behaves very well, as the next lesson shows. The convergence is absolute, and that makes the series as easy to work with as a polynomial.`,
          resources: [
            openstax('6-1-power-series-and-functions', 'Power series and functions', 'Convergence, radius and interval.', true),
            paul('PowerSeries', 'Power series', 'Radius and interval, with endpoint work.'),
          ],
          exercises: [
            {
              slug: 'interval-drill',
              title: 'Intervals of convergence',
              prompt: `Find the radius and interval of convergence of each series, testing both endpoints: (a) $\\sum\\dfrac{x^n}{n^2}$, (b) $\\sum\\dfrac{(x-3)^n}{n2^n}$, (c) $\\sum nx^n$, (d) $\\sum\\dfrac{(2x)^n}{n!}$, (e) $\\sum\\dfrac{(-1)^nx^{2n}}{4^n}$, (f) $\\sum\\dfrac{(x+1)^n}{\\sqrt{n}}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) R = 1, [-1, 1]. (b) R = 2, [1, 5). (c) R = 1, (-1, 1). (d) R = inf, all reals. (e) R = 2, (-2, 2). (f) R = 1, [-2, 0).',
            },
            {
              slug: 'harder-intervals',
              title: 'Harder intervals',
              prompt: `Find the interval of convergence of each series: (a) $\\sum\\dfrac{n!\\,x^n}{n^n}$, using the known limit of $(1+1/n)^n$ for the radius (you need not settle the endpoints fully, but say what the size of the terms suggests), (b) $\\sum\\dfrac{(3x-2)^n}{n}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) R = e. By Stirling, the terms at x = e behave like sqrt(2 pi n), so they do not tend to 0, and the series diverges at both endpoints. (b) The centre is 2/3, R = 1/3, and the interval is [1/3, 1).',
            },
            {
              slug: 'radius-reasoning',
              title: 'Reason about radii',
              prompt: `(a) If $\\sum c_nx^n$ converges at $x=4$ and diverges at $x=-6$, what can you say about $R$, and about convergence at $x=-3$, $x=5$ and $x=7$? (b) Can a power series centred at $0$ have interval of convergence $(0,2)$? Explain why or why not. (c) If $\\sum c_nx^n$ has radius $R$, what is the radius of $\\sum c_nx^{2n}$?`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 4 <= R <= 6. Converges at -3, diverges at 7, unknown at 5. (b) No: the interval is symmetric about the centre. (c) sqrt R.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the ratio test tell you at the endpoints of the interval?',
              answerOutline: 'Nothing, since $L=1$ there. Use other tests.',
            },
            {
              question: 'What shapes can the set of convergence of a power series take?',
              answerOutline: 'A single point, an interval around the centre with any choice of endpoints, or the whole line.',
            },
            {
              question: 'What is $R$ for $\\sum x^n/n!$ and for $\\sum n!\\,x^n$?',
              answerOutline: '$\\infty$ and $0$.',
            },
          ],
        },
        {
          slug: 'functions-as-power-series',
          title: 'Representing functions as power series',
          summary:
            'Getting new series from the geometric series, by substitution, differentiation and integration.',
          estimatedMinutes: 160,
          objectives: [
            'Write a function as a geometric series by substitution',
            'Differentiate and integrate a power series term by term',
            'Derive the series for $\\ln(1+x)$ and $\\arctan x$',
            'Use series to find exact sums and to approximate integrals',
          ],
          concepts: [
            'Geometric series as a function',
            'Term-by-term differentiation',
            'Term-by-term integration',
            'Series for logarithm and arctangent',
            'Endpoints after integration',
          ],
          explanation: `The geometric series gives one key formula:

$$
\\frac{1}{1-x}=\\sum_{n=0}^\\infty x^n\\quad\\text{for }|x|<1.
$$

Replacing $x$ by another expression gives many more. For $|x|<1$,

$$
\\frac{1}{1+x^2}=\\sum_{n=0}^\\infty(-1)^nx^{2n}.
$$

For a different centre or radius, do some algebra first:

$$
\\frac{1}{2-x}=\\frac12\\cdot\\frac{1}{1-x/2}=\\sum_{n=0}^\\infty\\frac{x^n}{2^{n+1}},\\qquad|x|<2.
$$

**Theorem.** If $f(x)=\\sum c_n(x-a)^n$ has radius $R>0$, then on $|x-a|<R$ the function $f$ is differentiable, and you may differentiate or integrate term by term:

$$
f'(x)=\\sum nc_n(x-a)^{n-1},\\qquad\\int f(x)\\,dx=C+\\sum\\frac{c_n(x-a)^{n+1}}{n+1}.
$$

The new series have the same radius. Endpoint behaviour may change, and it must be checked again.

**Worked example 1.** Differentiating the geometric series gives, for $|x|<1$,

$$
\\frac{1}{(1-x)^2}=\\sum_{n=1}^\\infty nx^{n-1}=\\sum_{n=0}^\\infty(n+1)x^n.
$$

Multiply by $x$ to get $\\sum nx^n=\\dfrac{x}{(1-x)^2}$. At $x=\\tfrac12$ this gives $\\sum n/2^n=2$, a result you found another way in the last module.

**Worked example 2.** Integrating $\\dfrac{1}{1+x}=\\sum(-1)^nx^n$ from $0$ to $x$ gives

$$
\\ln(1+x)=x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\dots=\\sum_{n=1}^\\infty\\frac{(-1)^{n-1}x^n}{n},\\quad|x|<1.
$$

Integrating $\\dfrac{1}{1+x^2}$ gives

$$
\\arctan x=x-\\frac{x^3}{3}+\\frac{x^5}{5}-\\dots=\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n+1}}{2n+1},\\quad|x|<1.
$$

Both new series also converge at $x=1$, and Abel's theorem says that the sum there equals the value of the function, provided the function is continuous from the left there. So $1-\\tfrac12+\\tfrac13-\\dots=\\ln2$ and $1-\\tfrac13+\\tfrac15-\\dots=\\tfrac\\pi4$.

**Worked example 3.** Integrals with no formula become series. For example,

$$
\\int_0^{1/2}\\frac{dx}{1+x^4}=\\int_0^{1/2}(1-x^4+x^8-\\dots)\\,dx=\\frac12-\\frac{1}{5\\cdot2^5}+\\frac{1}{9\\cdot2^9}-\\dots\\approx0.49397.
$$

The series alternates, so stopping after the third term leaves an error below the next term, $\\dfrac{1}{13\\cdot2^{13}}\\approx9\\times10^{-6}$.\n\nThe working rule is to start from a series you already know, then substitute, multiply by powers of $x$, differentiate or integrate to reach the function you want. Track the radius at every step: substituting $x^2$ or $x/2$ changes where the series converges, while differentiating and integrating do not. Check the endpoints again at the end, because those are what term-by-term operations can change. A quick test of any series you build is to compare its first few terms with values of the function near the centre.`,
          resources: [
            openstax('6-2-properties-of-power-series', 'Properties of power series', 'Term-by-term operations.', true),
            paul('PowerSeriesandFunctions', 'Power series and functions', 'Getting series from the geometric series.'),
          ],
          exercises: [
            {
              slug: 'from-geometric',
              title: 'Series from the geometric series',
              prompt: `Find a power series centred at $0$, with its radius of convergence, for each function: (a) $\\dfrac{1}{1+9x^2}$, (b) $\\dfrac{x}{1-x^3}$, (c) $\\dfrac{1}{(1-x)^3}$, by differentiating twice, (d) $\\ln(1-x)$, (e) $\\dfrac{1}{4+x}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) sum (-9)^n x^(2n), R = 1/3. (b) sum x^(3n+1), R = 1. (c) sum (n + 1)(n + 2) x^n/2, R = 1. (d) -sum x^n/n for n >= 1, R = 1. (e) sum (-1)^n x^n/4^(n+1), R = 4.',
            },
            {
              slug: 'exact-sums',
              title: 'Exact sums from series',
              prompt: `Use known series to find each exact sum: (a) $\\sum_{n=1}^\\infty\\dfrac{1}{n2^n}$, (b) $\\sum_{n=1}^\\infty\\dfrac{n^2}{2^n}$, (c) $\\sum_{n=0}^\\infty\\dfrac{(-1)^n}{(2n+1)3^n}$, using $\\arctan$ at a suitable point.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) ln 2, from -ln(1 - x) at x = 1/2. (b) 6: apply x d/dx to x/(1 - x)^2. (c) sqrt(3) arctan(1/sqrt 3) = sqrt(3) pi/6.',
            },
            {
              slug: 'pi-by-series',
              title: 'Computing pi',
              prompt: `(a) How many terms of $1-\\tfrac13+\\tfrac15-\\dots$ are needed to get $\\pi/4$ with error below $10^{-4}$? (b) Verify Machin's formula numerically, $\\tfrac\\pi4=4\\arctan\\tfrac15-\\arctan\\tfrac{1}{239}$, and use the first two terms of each arctangent series to estimate $\\pi$ by hand. Then add the third term of the series for $\\arctan\\tfrac15$. (c) Why does Machin's formula converge so much faster?`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 5000 terms: the first omitted term must be under 10^-4. (b) Two terms of each give about 3.1406. With the third term of arctan(1/5), about 3.14162. (c) Small arguments give rapidly shrinking powers.',
            },
          ],
          selfAssessment: [
            {
              question: 'What happens to the radius when you differentiate a power series?',
              answerOutline: 'It is unchanged, though endpoints may behave differently.',
            },
            {
              question: 'How do you get the series for $\\arctan x$?',
              answerOutline: 'Integrate the geometric series for $1/(1+x^2)$ term by term.',
            },
            {
              question: 'Why does the constant $C$ vanish for $\\ln(1+x)$?',
              answerOutline: 'Both sides equal $0$ at $x=0$.',
            },
          ],
        },
        {
          slug: 'taylor-and-maclaurin-series',
          title: 'Taylor and Maclaurin series',
          summary:
            'The series a smooth function must have, and the essential list of series to know.',
          estimatedMinutes: 170,
          objectives: [
            'Derive the Taylor coefficient formula',
            'Compute a Taylor series at a given centre',
            'Know the standard Maclaurin series with their radii',
            'Build series by substitution and multiplication',
            'Give an example where the Taylor series does not equal the function',
          ],
          concepts: [
            'Taylor series',
            'Maclaurin series',
            'Taylor polynomial',
            'Standard series',
            'Analytic function',
          ],
          explanation: `Suppose $f$ has a power series $f(x)=\\sum c_n(x-a)^n$ with $R>0$. Put $x=a$ to get $c_0=f(a)$. Differentiate once and put $x=a$ to get $c_1=f'(a)$. Differentiating $n$ times leaves $n!\\,c_n$ as the constant term. So the coefficients must be

$$
c_n=\\frac{f^{(n)}(a)}{n!}.
$$

This gives the **Taylor series** of $f$ at $a$:

$$
f(x)\\sim\\sum_{n=0}^\\infty\\frac{f^{(n)}(a)}{n!}(x-a)^n.
$$

When $a=0$ it is called a **Maclaurin series**. The partial sum up to degree $n$ is the **Taylor polynomial** $T_n$, and it matches $f$ and its first $n$ derivatives at $a$. $T_1$ is the tangent line.

**Worked example 1.** For $f(x)=\\sin x$ at $0$, the derivatives cycle through $\\sin,\\cos,-\\sin,-\\cos$, whose values at $0$ are $0,1,0,-1$. So

$$
\\sin x=x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\dots=\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n+1}}{(2n+1)!}.
$$

Only odd powers appear, as they must for an odd function.

**The list to memorise,** with the radius in brackets:

$$
e^x=\\sum_{n=0}^\\infty\\frac{x^n}{n!}\\ \\ (\\infty),\\qquad\\cos x=\\sum_{n=0}^\\infty\\frac{(-1)^nx^{2n}}{(2n)!}\\ \\ (\\infty),
$$

$$
\\sin x\\ \\ (\\infty),\\quad\\frac{1}{1-x}\\ \\ (1),\\quad\\ln(1+x)\\ \\ (1),\\quad\\arctan x\\ \\ (1).
$$

The proof that the first three converge to the function for every $x$ is in the next lesson.

**Worked example 2.** Do not differentiate when you do not have to. Substituting gives

$$
e^{-x^2}=1-x^2+\\frac{x^4}{2!}-\\frac{x^6}{3!}+\\dots
$$

Differentiating $e^{-x^2}$ directly six times would be much worse. Series may be multiplied too: $x\\sin x=x^2-\\dfrac{x^4}{6}+\\dots$. A consequence runs the other way. In the series for $e^{-x^2}$ the coefficient of $x^6$ is $-\\tfrac16$, and it must equal $f^{(6)}(0)/6!$. So $f^{(6)}(0)=-\\tfrac16\\cdot720=-120$, which is a cheap way to compute a high derivative.

**Worked example 3.** Find the Taylor series of $\\ln x$ about $a=1$. The derivatives are $f^{(n)}(x)=(-1)^{n-1}(n-1)!\\,x^{-n}$ for $n\\ge1$, so $f^{(n)}(1)/n!=(-1)^{n-1}/n$, and

$$
\\ln x=\\sum_{n=1}^\\infty\\frac{(-1)^{n-1}(x-1)^n}{n},\\quad0<x\\le2.
$$

**A warning.** A function's Taylor series can converge and yet not equal the function. A function that does equal its Taylor series near each point is called **analytic**. Most functions in this course are analytic, but an exercise below shows a smooth one that is not.`,
          resources: [
            openstax('6-3-taylor-and-maclaurin-series', 'Taylor and Maclaurin series', 'Taylor polynomials and the standard list.', true),
            paul('TaylorSeries', 'Taylor series', 'Worked derivations.'),
            essence('Episode on Taylor series: matching derivatives one at a time.'),
          ],
          exercises: [
            {
              slug: 'maclaurin-drill',
              title: 'Maclaurin series by substitution',
              prompt: `Use known series to give the first three non-zero terms of each Maclaurin series: (a) $e^{2x}$, (b) $\\cos(x^2)$, (c) $x\\sin x$, (d) $e^x\\cos x$, up to $x^3$ only, (e) $\\dfrac{\\sin x}{x}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 1 + 2x + 2x^2. (b) 1 - x^4/2 + x^8/24. (c) x^2 - x^4/6 + x^6/120. (d) 1 + x - x^3/3 (the x^2 term cancels). (e) 1 - x^2/6 + x^4/120.',
            },
            {
              slug: 'taylor-other-centres',
              title: 'Other centres',
              prompt: `Compute these directly from the coefficient formula: (a) the Taylor polynomial $T_2$ of $\\sqrt{x}$ at $a=4$, and use it to estimate $\\sqrt{4.1}$; (b) the Taylor series of $\\sin x$ at $a=\\pi/2$; (c) the Taylor series of $e^x$ at $a=1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2 + (x - 4)/4 - (x - 4)^2/64, giving about 2.024844. (b) sum (-1)^n (x - pi/2)^(2n)/(2n)!. (c) sum e (x - 1)^n/n!.',
            },
            {
              slug: 'smooth-not-analytic',
              title: 'Smooth but not analytic',
              prompt: `Let $f(x)=e^{-1/x^2}$ for $x\\ne0$, with $f(0)=0$. (a) Show from the definition that $f'(0)=0$. (b) Explain why all derivatives at $0$ are $0$, given that each derivative for $x\\ne0$ is a polynomial in $1/x$ times $e^{-1/x^2}$. (c) What is the Taylor series of $f$ at $0$? For which $x$ does it equal $f(x)$? (d) Explain what this says about the claim that a smooth function is determined by its derivatives at a point.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a), the quotient is e^(-1/h^2)/h. Let u = 1/h and use the fact that exponentials beat powers. (c) The series is zero and equals f only at x = 0.',
            },
            {
              slug: 'euler-formula',
              title: "Euler's formula",
              prompt: `Assuming the series for $e^x$ also holds for imaginary inputs, put $x=i\\theta$ and group real and imaginary parts to show that $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$. Deduce $e^{i\\pi}+1=0$. Use it to derive the angle-sum formula for cosine.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use i^2 = -1, i^3 = -i, i^4 = 1. For the angle sum, expand e^(i(a + b)) = e^(ia) e^(ib).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the Taylor coefficient be $f^{(n)}(a)/n!$?',
              answerOutline: 'Differentiating $n$ times and setting $x=a$ leaves $n!\\,c_n$.',
            },
            {
              question: 'Give the first three non-zero terms of $\\cos x$.',
              answerOutline: '$1-\\frac{x^2}{2}+\\frac{x^4}{24}$.',
            },
            {
              question: 'Does every smooth function equal its Taylor series?',
              answerOutline: 'No. Those that do are called analytic.',
            },
          ],
        },
        {
          slug: 'taylors-theorem',
          title: "Taylor's theorem and error",
          summary:
            'How far a Taylor polynomial can be from the function, and the proof that the standard series converge to their functions.',
          estimatedMinutes: 170,
          objectives: [
            "State Taylor's theorem with the Lagrange remainder",
            'Bound the error of a Taylor approximation',
            'Choose the degree needed for a given accuracy',
            'Prove that the series for $e^x$ and $\\sin x$ converge to those functions for all $x$',
          ],
          concepts: [
            'Remainder $R_n$',
            'Lagrange form of the remainder',
            'Bounding a derivative',
            'Convergence of a Taylor series',
            'Choosing a degree',
          ],
          explanation: `Write $f(x)=T_n(x)+R_n(x)$, where $T_n$ is the Taylor polynomial of degree $n$ at $a$, and $R_n$ is the error.

**Taylor's theorem.** If $f$ has $n+1$ continuous derivatives on an interval containing $a$ and $x$, then there is a $c$ between $a$ and $x$ with

$$
R_n(x)=\\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}.
$$

So the error looks just like the next term of the series, except that the derivative is taken at an unknown point $c$. The case $n=0$ is the mean value theorem. In practice you bound it. If $|f^{(n+1)}|\\le M$ between $a$ and $x$, then

$$
|R_n(x)|\\le\\frac{M}{(n+1)!}|x-a|^{n+1}.
$$

The factorial is why Taylor approximations work so well: near the centre, the bound drops very fast as $n$ grows.

**Worked example 1.** How many terms of the series give $e$ to within $10^{-5}$? Use $f=e^x$ at $a=0$ and $x=1$. All derivatives are $e^x$, and on $[0,1]$ they are at most $e<3$, so

$$
|R_n(1)|\\le\\frac{3}{(n+1)!}.
$$

We need $(n+1)!>3\\times10^5$. Since $8!=40\\,320$ and $9!=362\\,880$, we need $n+1=9$, so $n=8$. Then $T_8(1)=1+1+\\tfrac12+\\dots+\\tfrac{1}{8!}=2.718279$, which differs from $e$ by about $3.1\\times10^{-6}$, inside the bound of $3/9!\\approx8.3\\times10^{-6}$.

**Worked example 2.** Bound the error in $\\sin0.5\\approx0.5-\\dfrac{0.5^3}{6}+\\dfrac{0.5^5}{120}=0.479427$. The polynomial is $T_5$, and also $T_6$, since the $x^6$ coefficient is zero. Using $n=6$ with $|f^{(7)}|\\le1$,

$$
|R_6(0.5)|\\le\\frac{0.5^7}{7!}\\approx1.6\\times10^{-6}.
$$

Using the extra zero term like this gives a better bound. (The series also alternates here, which gives the same bound.)

**Proving convergence.** For a fixed $x$, $\\dfrac{|x|^{n+1}}{(n+1)!}\\to0$ as $n\\to\\infty$, since the factorial eventually beats any fixed power. All derivatives of $\\sin$ and $\\cos$ are bounded by $1$, so $R_n(x)\\to0$ for every $x$. Hence these series really do converge to $\\sin x$ and $\\cos x$ everywhere. For $e^x$, on $|x|\\le B$ the derivatives are bounded by $e^B$, which gives the same result. This limit is the step that upgrades a formal series to a true equation.

Two remarks on using the bound. The error grows fast away from the centre, so choose $a$ close to the $x$ you care about. And remember the difference between a bound and the actual error: the bound guarantees accuracy, while the real error is usually somewhat smaller.`,
          resources: [
            openstax('6-3-taylor-and-maclaurin-series', 'Taylor and Maclaurin series', 'Taylor polynomials, the remainder theorem and convergence.', true),
            paul('TaylorSeriesApps', 'Applications of series', 'How polynomials approximate functions.'),
            mit1801('The sessions on Taylor series and on the error of approximation.'),
          ],
          exercises: [
            {
              slug: 'error-bounds',
              title: 'Bound an error',
              prompt: `For each approximation, compute the value and bound the error with Taylor's theorem: (a) $\\cos0.2\\approx1-\\dfrac{0.2^2}{2}+\\dfrac{0.2^4}{24}$, (b) $\\sqrt{1.1}$ by $T_2$ of $\\sqrt{x}$ at $a=1$, (c) $e^{0.1}$ by $T_3$ at $a=0$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 0.980067, bound 0.2^6/720, about 8.9e-8. (b) 1.04875, bound (3/8)(0.1)^3/6 = 6.25e-5. (c) 1.105167, bound e^(0.1)(0.1)^4/24, about 4.6e-6.',
            },
            {
              slug: 'choose-degree',
              title: 'Choose the degree',
              prompt: `(a) How many terms of the Maclaurin series for $\\ln(1+x)$ give $\\ln1.5$ with error below $10^{-3}$? (b) For what range of $x$ is $\\sin x\\approx x-x^3/6$ accurate to within $10^{-4}$? (c) What degree of Taylor polynomial of $\\cos x$ at $0$ gives $\\cos1$ to within $10^{-6}$?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 7 terms by the alternating bound, since 0.5^8/8 is under 0.001. (b) |x|^5/120 < 10^-4 gives |x| < 0.41 or so. (c) Degree 8 or 9: 1/10! is about 2.8e-7.',
            },
            {
              slug: 'e-irrational',
              title: 'e is irrational',
              prompt: `Suppose $e=p/q$ for positive integers $p,q$. Using $e=\\sum_{k=0}^\\infty1/k!$, let $x=q!\\left(e-\\sum_{k=0}^q\\dfrac{1}{k!}\\right)$. (a) Show that $x$ is an integer. (b) Show that $x>0$. (c) Show by a geometric series comparison that $x<\\dfrac1q\\le1$. Why is that a contradiction?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), x equals 1/(q + 1) + 1/((q + 1)(q + 2)) + ..., which is less than the geometric series with ratio 1/(q + 1).',
            },
          ],
          selfAssessment: [
            {
              question: 'State the Lagrange form of the remainder.',
              answerOutline: '$R_n(x)=\\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ for some $c$ between $a$ and $x$.',
            },
            {
              question: 'Why does $|x|^n/n!\\to0$ for every fixed $x$?',
              answerOutline: 'Once $n>2|x|$, each new factor $|x|/n$ is below $\\tfrac12$, so the terms shrink faster than a geometric sequence.',
            },
            {
              question: 'How do you prove that a Taylor series converges to its function?',
              answerOutline: 'Show that $R_n(x)\\to0$ as $n\\to\\infty$.',
            },
          ],
        },
        {
          slug: 'binomial-series-and-applications',
          title: 'The binomial series and applications',
          summary:
            'Powers with any exponent as series, and uses in limits, integrals and physics.',
          estimatedMinutes: 170,
          objectives: [
            'State the binomial series for any real exponent',
            'Apply it to roots and to $1/\\sqrt{1-x^2}$',
            'Evaluate limits with series',
            'Integrate functions that have no elementary antiderivative',
            'Use series to make physical approximations',
          ],
          concepts: [
            'Generalised binomial coefficient',
            'Binomial series',
            'Limits by series',
            'Integrals by series',
            'Physical approximation',
          ],
          explanation: `For a positive integer $k$, $(1+x)^k$ is a polynomial given by the binomial theorem. Newton saw that the same formula works for any real $k$, if you allow it to go on forever. Computing Taylor coefficients gives the **binomial series**:

$$
(1+x)^k=\\sum_{n=0}^\\infty\\binom knx^n=1+kx+\\frac{k(k-1)}{2!}x^2+\\frac{k(k-1)(k-2)}{3!}x^3+\\dots,\\quad|x|<1,
$$

where $\\binom kn=\\dfrac{k(k-1)\\cdots(k-n+1)}{n!}$. If $k$ is a non-negative integer, the series stops, and is just the binomial theorem. Otherwise $R=1$.

**Worked example 1.** With $k=\\tfrac12$,

$$
\\sqrt{1+x}=1+\\frac x2-\\frac{x^2}{8}+\\frac{x^3}{16}-\\dots
$$

With $k=-\\tfrac12$, replacing $x$ by $-x^2$,

$$
\\frac{1}{\\sqrt{1-x^2}}=1+\\frac{x^2}{2}+\\frac{3x^4}{8}+\\dots
$$

Integrating gives $\\arcsin x=x+\\dfrac{x^3}{6}+\\dfrac{3x^5}{40}+\\dots$

**Limits.** Series expose the first non-cancelling term, often faster than repeated L'Hopital.

**Worked example 2.** Using $\\sin x=x-x^3/6+\\dots$,

$$
\\lim_{x\\to0}\\frac{\\sin x-x}{x^3}=\\lim_{x\\to0}\\frac{-x^3/6+x^5/120-\\dots}{x^3}=-\\frac16.
$$

**Integrals.** Non-elementary integrals become easy sums.

**Worked example 3.** Integrating the series for $e^{-x^2}$ term by term,

$$
\\int_0^1e^{-x^2}dx=1-\\frac13+\\frac{1}{10}-\\frac{1}{42}+\\frac{1}{216}-\\dots\\approx0.7475.
$$

The alternating bound gives an error below the next term, $\\dfrac{1}{1320}\\approx0.00076$. The true value is $0.74682$.

**Physics.** Replacing an exact formula with its first terms is everyday physics. In relativity the kinetic energy is $E=mc^2(\\gamma-1)$, with $\\gamma=(1-v^2/c^2)^{-1/2}$. The binomial series with $k=-\\tfrac12$ gives

$$
\\gamma=1+\\frac12\\frac{v^2}{c^2}+\\frac38\\frac{v^4}{c^4}+\\dots
$$

and so

$$
E=\\frac12mv^2+\\frac38\\frac{mv^4}{c^2}+\\dots
$$

Newton's kinetic energy is the first term, and the next term is a correction, tiny at everyday speeds. To use the binomial series on an expression such as $\\sqrt{4+x}$, first factor out the constant so the bracket starts with $1$: $\\sqrt{4+x}=2\\left(1+\\tfrac x4\\right)^{1/2}$, which converges for $|x|<4$.\n\nSeries like this show precisely how a simpler theory sits inside a more exact one. They also show when it fails, since that correction becomes important when $v$ is a sizeable fraction of $c$.`,
          resources: [
            openstax('6-4-working-with-taylor-series', 'Working with Taylor series', 'Binomial series, limits, integrals and differential equations.', true),
            paul('BinomialSeries', 'Binomial series', 'Coefficient formula and examples.'),
            paul('TaylorSeriesApps', 'Applications of series', 'Further uses.'),
          ],
          exercises: [
            {
              slug: 'binomial-drill',
              title: 'Binomial drill',
              prompt: `Use the binomial series for each of these, giving terms up to $x^3$: (a) $(1+x)^{1/3}$, (b) $\\dfrac{1}{(1-x)^3}$, (c) $\\sqrt{1-x^2}$, (d) $\\dfrac{1}{\\sqrt{4+x}}$, after factoring out a constant.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 1 + x/3 - x^2/9 + 5x^3/81. (b) 1 + 3x + 6x^2 + 10x^3. (c) 1 - x^2/2 (the x and x^3 terms vanish). (d) 1/2 - x/16 + 3x^2/256 - 5x^3/2048.',
            },
            {
              slug: 'series-limits',
              title: 'Limits with series',
              prompt: `Evaluate each limit using series, without L'Hopital's rule: (a) $\\lim_{x\\to0}\\dfrac{e^x-1-x-x^2/2}{x^3}$, (b) $\\lim_{x\\to0}\\dfrac{1-\\cos x-x^2/2}{x^4}$, (c) $\\lim_{x\\to0}\\dfrac{\\arctan x-x}{x^3}$, (d) $\\lim_{x\\to0}\\dfrac{\\ln(1+x)-x+x^2/2}{x^3}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1/6. (b) -1/24. (c) -1/3. (d) 1/3.',
            },
            {
              slug: 'pendulum-period',
              title: 'A real pendulum',
              prompt: `A pendulum of length $L$ with amplitude $\\theta_0$ has period $T=4\\sqrt{L/g}\\int_0^{\\pi/2}\\dfrac{d\\phi}{\\sqrt{1-k^2\\sin^2\\phi}}$, where $k=\\sin(\\theta_0/2)$. Expand the integrand with the binomial series to terms in $k^4$, and integrate using $I_2=\\pi/4$ and $I_4=3\\pi/16$. Show that $T\\approx T_0(1+k^2/4+9k^4/64)$, with $T_0=2\\pi\\sqrt{L/g}$. How much longer is the period at $\\theta_0=60^\\circ$?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'At 60 degrees k = 1/2, so the factor is about 1.0713, around 7% longer. The exact factor is about 1.0732.',
            },
          ],
          selfAssessment: [
            {
              question: 'When does the binomial series stop?',
              answerOutline: 'When $k$ is a non-negative integer.',
            },
            {
              question: 'Why can series be better than L\'Hopital\'s rule for limits?',
              answerOutline: 'They show the first term that survives cancellation at once, without many differentiations.',
            },
            {
              question: 'What is the first relativistic correction to kinetic energy?',
              answerOutline: '$\\tfrac38mv^4/c^2$.',
            },
          ],
        },
      ],
      project: {
        slug: 'how-calculators-compute',
        title: 'How a calculator computes sine',
        description: `Write your own sine, cosine, exponential and natural logarithm functions, using only addition, multiplication and division, and compare them with a library. Reduce each input to a small range first: for sine, use periodicity and symmetry to bring the angle into $[0,\\pi/4]$, then apply a Taylor polynomial whose degree you choose from the remainder bound so that the error is below a set tolerance. For the logarithm, explain why the series for $\\ln(1+x)$ is a poor choice for large $x$, and use a better identity, such as writing $x=m\\cdot2^p$ and using the series for $\\ln\\frac{1+y}{1-y}$. Measure the real error across many inputs and compare with your bound.`,
        deliverables: [
          'Working functions in a language of your choice, using only basic arithmetic',
          'A derivation of the polynomial degree needed for each function from the remainder bound',
          'A description of the argument reduction and why it is needed',
          'Plots of the true error across the input range, compared with the bound',
          'A short discussion of what limits accuracy in floating-point arithmetic',
        ],
        estimatedHours: 7,
        stretchGoals: ['Compare with a Chebyshev polynomial of the same degree, and show that its worst-case error is smaller'],
      },
    },
    {
      slug: 'parametric-and-polar-curves',
      title: 'Parametric and Polar Curves',
      description:
        'New ways to describe curves: the conic sections, curves traced out over time, and curves described by distance and angle.',
      lessons: [
        {
          slug: 'conic-sections',
          title: 'Conic sections',
          summary:
            'Parabolas, ellipses and hyperbolas: their definitions, equations, foci and appearances in nature.',
          estimatedMinutes: 150,
          objectives: [
            'Define each conic geometrically',
            'Put a quadratic equation into standard form by completing the square',
            'Find foci, vertices and asymptotes',
            'Use eccentricity to describe the shape of an orbit',
          ],
          concepts: [
            'Parabola: focus and directrix',
            'Ellipse: sum of distances',
            'Hyperbola: difference of distances',
            'Standard forms',
            'Eccentricity',
            'Reflective property',
          ],
          explanation: `Slicing a cone with a plane gives three types of curve. Each has a simple distance definition.

**Parabola.** The set of points equidistant from a point (the **focus**) and a line (the **directrix**). With vertex at the origin and focus $(0,p)$, its equation is

$$
x^2=4py.
$$

**Ellipse.** The set of points whose distances from two foci have a constant sum. With foci $(\\pm c,0)$ and $a>b>0$,

$$
\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1,\\qquad c^2=a^2-b^2.
$$

Here $a$ is the semi-major axis, and the constant sum of distances is $2a$.

**Hyperbola.** The set of points whose distances from two foci have a constant difference. With foci $(\\pm c,0)$,

$$
\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1,\\qquad c^2=a^2+b^2,
$$

with asymptotes $y=\\pm\\dfrac bax$. Note the different sign in the relation for $c$.

The **eccentricity** is $e=c/a$. It is $0$ for a circle, between $0$ and $1$ for an ellipse, and greater than $1$ for a hyperbola, with $e=1$ for a parabola. It measures how far a conic is from a circle.

**Worked example.** Identify the curve $4x^2+9y^2-8x+36y+4=0$. Group the terms and complete the square in each variable:

$$
4(x^2-2x)+9(y^2+4y)=-4,
$$

$$
4(x-1)^2+9(y+2)^2=-4+4+36=36.
$$

Dividing by $36$ gives

$$
\\frac{(x-1)^2}{9}+\\frac{(y+2)^2}{4}=1.
$$

This is an ellipse centred at $(1,-2)$, with $a=3$ and $b=2$. So $c=\\sqrt{9-4}=\\sqrt5$, the foci are at $(1\\pm\\sqrt5,-2)$, and $e=\\sqrt5/3\\approx0.745$.

In general, for $Ax^2+Cy^2+Dx+Ey+F=0$ with no $xy$ term, $AC>0$ suggests an ellipse, $AC<0$ a hyperbola and $AC=0$ a parabola, barring degenerate cases such as a pair of lines or a single point.

**Why they matter.** Kepler found that planets move on ellipses with the Sun at a focus, and Newton proved that inverse-square gravity gives conic orbits: ellipses for bound bodies, and hyperbolas for bodies on one-time flybys. A parabola sends light from its focus into a parallel beam, which is why satellite dishes and car headlights have that shape. An ellipse sends a sound from one focus to the other. Hyperbolas underlie navigation from time differences, because a constant difference in arrival time from two stations places a receiver on a hyperbola.`,
          resources: [
            openstax('7-5-conic-sections', 'Conic sections', 'Definitions, standard forms, eccentricity and polar forms.', true),
            mit1801('The polar coordinates and conics material in the unit on further topics.'),
          ],
          exercises: [
            {
              slug: 'identify-conics',
              title: 'Identify the conic',
              prompt: `Put each equation in standard form, name the conic, and give its centre or vertex, foci and any asymptotes or directrix: (a) $x^2-4x-8y+12=0$, (b) $9x^2-16y^2=144$, (c) $x^2+4y^2=16$, (d) $y^2-4y-x^2+2x=1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Parabola (x - 2)^2 = 8(y - 1), vertex (2, 1), focus (2, 3), directrix y = -1. (b) Hyperbola, a = 4, b = 3, foci (+-5, 0), y = +-3x/4. (c) Ellipse, a = 4, b = 2, foci (+-2 sqrt 3, 0). (d) (y - 2)^2 - (x - 1)^2 = 4, a hyperbola centred at (1, 2), foci (1, 2 +- 2 sqrt 2), asymptotes y - 2 = +-(x - 1).',
            },
            {
              slug: 'orbits',
              title: 'Orbits as ellipses',
              prompt: `(a) Earth's distance from the Sun ranges from $147.1$ to $152.1$ million km. Find $a$, $c$ and $e$ for its orbit. Is it nearly circular? (b) Halley's comet has $a=17.8$ AU and $e=0.967$. Find its closest and farthest distances from the Sun, in AU.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) a = 149.6, c = 2.5 (million km), e is about 0.0167, so very nearly circular. (b) a(1 - e) is about 0.587 AU, and a(1 + e) is about 35.0 AU.',
            },
            {
              slug: 'reflective-parabola',
              title: 'The reflective property',
              prompt: `For the parabola $x^2=4py$ with focus $F=(0,p)$, take a point $P=(x_0,y_0)$ with $x_0\\ne0$. Let the tangent at $P$ meet the $y$-axis at $Q$. (a) Show that $Q=(0,-y_0)$. (b) Show that $|FP|=|FQ|$, so that triangle $FPQ$ is isosceles. (c) Deduce that a ray going up parallel to the axis reflects through the focus.`,
              kind: 'derivation',
              difficulty: 3,
              hint: "Use y' = x/(2p). |FP| equals y0 + p by the distance definition, using the directrix. Equal base angles give the equal angles of reflection.",
            },
          ],
          selfAssessment: [
            {
              question: 'How does $c$ relate to $a$ and $b$ in an ellipse and a hyperbola?',
              answerOutline: '$c^2=a^2-b^2$ for an ellipse, and $c^2=a^2+b^2$ for a hyperbola.',
            },
            {
              question: 'What is the eccentricity of a circle, and of a parabola?',
              answerOutline: '$0$ and $1$.',
            },
            {
              question: 'What is the constant sum of distances for an ellipse?',
              answerOutline: '$2a$.',
            },
          ],
        },
        {
          slug: 'parametric-curves',
          title: 'Parametric curves',
          summary:
            'Curves traced over time, and their tangents, enclosed areas and lengths.',
          estimatedMinutes: 170,
          objectives: [
            'Sketch a parametric curve, and eliminate the parameter',
            'Compute $dy/dx$ and $d^2y/dx^2$',
            'Find horizontal and vertical tangents, and self-crossings',
            'Compute area and arc length',
          ],
          concepts: [
            'Parameter',
            'Direction of travel',
            'Slope $\\frac{dy/dt}{dx/dt}$',
            'Second derivative',
            'Area $\\int y\\,dx$',
            'Arc length',
          ],
          explanation: `A **parametric curve** is given by $x=x(t)$, $y=y(t)$, with $t$ as a parameter, often time. This describes curves that are not graphs of functions, and it records motion: when you are at a point and which way you are going. For example, $x=\\cos t$, $y=\\sin t$ traces the unit circle anticlockwise. The curve $x=\\cos2t$, $y=\\sin2t$ is the same circle at double speed.

**Slope.** By the chain rule, $\\dfrac{dy}{dt}=\\dfrac{dy}{dx}\\dfrac{dx}{dt}$, so where $dx/dt\\ne0$,

$$
\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}.
$$

The tangent is horizontal where $dy/dt=0$ with $dx/dt\\ne0$, and vertical where $dx/dt=0$ with $dy/dt\\ne0$. If both vanish, more analysis is needed, and the curve may have a cusp.

For the second derivative, differentiate the slope with respect to $t$, and divide by $dx/dt$ again:

$$
\\frac{d^2y}{dx^2}=\\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{dx/dt}.
$$

It is a common error to write this as $\\dfrac{d^2y/dt^2}{d^2x/dt^2}$, which is wrong.

**Area and length.** Substitution in $\\int y\\,dx$ gives the area under a curve, traced left to right once, as $\\int_\\alpha^\\beta y(t)\\,x'(t)\\,dt$. Since $ds^2=dx^2+dy^2$,

$$
L=\\int_\\alpha^\\beta\\sqrt{x'(t)^2+y'(t)^2}\\,dt,
$$

for a curve traced once. The integrand is the speed, so length is the integral of speed.

**Worked example (the cycloid).** A wheel of radius $r$ rolls along the $x$-axis. A point on the rim traces a **cycloid**:

$$
x=r(t-\\sin t),\\qquad y=r(1-\\cos t).
$$

One arch has $0\\le t\\le2\\pi$.

*Slope:* $\\dfrac{dy}{dx}=\\dfrac{\\sin t}{1-\\cos t}$, which is undefined at $t=0$, since both derivatives vanish there. The curve has a cusp each time the point touches the ground.

*Area:*

$$
A=\\int_0^{2\\pi}r(1-\\cos t)\\cdot r(1-\\cos t)\\,dt=r^2\\int_0^{2\\pi}(1-2\\cos t+\\cos^2t)\\,dt=3\\pi r^2,
$$

which is three times the area of the wheel.

*Length:* $x'^2+y'^2=r^2(2-2\\cos t)=4r^2\\sin^2(t/2)$, using $1-\\cos t=2\\sin^2(t/2)$. On $[0,2\\pi]$, $\\sin(t/2)\\ge0$, so

$$
L=\\int_0^{2\\pi}2r\\sin(t/2)\\,dt=\\left[-4r\\cos(t/2)\\right]_0^{2\\pi}=8r.
$$

The length of one arch is exactly eight times the radius. Christopher Wren found this result in 1658, before calculus had been invented in its full form.`,
          resources: [
            openstax('7-1-parametric-equations', 'Parametric equations', 'Sketching and eliminating the parameter.', true),
            openstax('7-2-calculus-of-parametric-curves', 'Calculus of parametric curves', 'Derivatives, area and arc length.'),
            paul('ParametricEqn', 'Parametric equations and curves', 'Direction of travel.'),
            paul('ParaTangent', 'Tangents with parametric equations', 'First and second derivatives.'),
            paul('ParaArcLength', 'Arc length with parametric equations', 'Worked examples, with a warning about curves traced twice.'),
          ],
          exercises: [
            {
              slug: 'sketch-eliminate',
              title: 'Sketch and tangents',
              prompt: `(a) For $x=t^2$, $y=t^3$, eliminate $t$ and sketch the curve. (b) For $x=2\\cos t$, $y=3\\sin t$, eliminate $t$, give the direction of travel, and find the tangent line at $t=\\pi/4$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) y^2 = x^3, a cusp at the origin. (b) x^2/4 + y^2/9 = 1, anticlockwise, slope -3/2 at (sqrt 2, 3 sqrt(2)/2), so the line is y = -(3/2)x + 3 sqrt 2.',
            },
            {
              slug: 'tschirnhausen',
              title: 'A curve that crosses itself',
              prompt: `For $x=t^2$, $y=t^3-3t$: (a) find the horizontal and vertical tangents, (b) find $d^2y/dx^2$ and the concavity for $t>0$, (c) find where the curve crosses itself, and the two tangent slopes there.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Horizontal at t = 1, 2 and t = -1: points (1, -2), (1, 2). Vertical at t = 0: (0, 0). (b) 3(t^2 + 1)/(4t^3), concave up for t > 0. (c) t = sqrt 3 and t = -sqrt 3 at (3, 0), with slopes sqrt 3 and -sqrt 3.',
            },
            {
              slug: 'length-and-area',
              title: 'Lengths and areas',
              prompt: `(a) Find the length of $x=e^t\\cos t$, $y=e^t\\sin t$, for $0\\le t\\le1$. (b) For the astroid $x=\\cos^3t$, $y=\\sin^3t$, find the total length, using symmetry to avoid a sign problem, and the enclosed area.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) sqrt 2 (e - 1). (b) Length 6: work on the first quadrant and multiply by 4. Area 3 pi/8.',
            },
            {
              slug: 'fastest-descent',
              title: 'A surprising property of the cycloid',
              prompt: `A bead slides without friction down an inverted cycloid $x=r(t-\\sin t)$, $y=r(1-\\cos t)$, with $y$ measured downward. It starts at rest from the point with parameter $t_0$. Conservation of energy gives speed $v=\\sqrt{2g(y-y_0)}$. Show that the time to the bottom, at $t=\\pi$, is $\\pi\\sqrt{r/g}$, whatever the value of $t_0$. Use $dt_{\\text{time}}=ds/v$ and the substitution $u=\\cos(t/2)/\\cos(t_0/2)$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'ds = 2r sin(t/2) dt and y - y0 = r(cos t0 - cos t) = 2r(cos^2(t0/2) - cos^2(t/2)). The integral reduces to 2 sqrt(r/g) times the integral of du/sqrt(1 - u^2) from 0 to 1.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $dy/dx$ for a parametric curve?',
              answerOutline: '$\\frac{dy/dt}{dx/dt}$, where $dx/dt\\ne0$.',
            },
            {
              question: 'What is wrong with $\\frac{d^2y}{dx^2}=\\frac{y\'\'(t)}{x\'\'(t)}$?',
              answerOutline: 'The correct formula differentiates $dy/dx$ with respect to $t$, then divides by $x\'(t)$.',
            },
            {
              question: 'What is the integrand of arc length in motion terms?',
              answerOutline: 'The speed $\\sqrt{x\'^2+y\'^2}$.',
            },
          ],
        },
        {
          slug: 'polar-coordinates',
          title: 'Polar coordinates',
          summary:
            'Locating points by distance and angle, sketching polar curves, and finding their tangents.',
          estimatedMinutes: 160,
          objectives: [
            'Convert between polar and Cartesian coordinates',
            'Handle negative $r$ and non-unique coordinates',
            'Sketch circles, cardioids, limacons and roses',
            'Find the slope of a tangent to a polar curve',
          ],
          concepts: [
            'Polar coordinates $(r,\\theta)$',
            'Conversion formulas',
            'Negative radius',
            'Cardioid and rose curves',
            'Tangents in polar form',
            'Polar form of a conic',
          ],
          explanation: `A point can be located by its distance $r$ from the origin, or **pole**, and an angle $\\theta$ from the positive $x$-axis. The conversions are

$$
x=r\\cos\\theta,\\qquad y=r\\sin\\theta,\\qquad r^2=x^2+y^2,\\qquad\\tan\\theta=\\frac yx.
$$

Polar coordinates are not unique. $(r,\\theta)$ and $(r,\\theta+2\\pi)$ are the same point. A negative $r$ means going through the pole to the opposite side, so $(-r,\\theta)$ is the same point as $(r,\\theta+\\pi)$. The formula $\\tan\\theta=y/x$ also needs care: it cannot tell quadrant I from III, so check where the point is.

Some curves are much simpler in polar form. A circle about the origin is $r=a$. A ray is $\\theta=c$. Curves come from tabulating $r$ as $\\theta$ sweeps round.

**Worked example 1.** Convert $r=2\\cos\\theta$ to Cartesian form. Multiply by $r$: $r^2=2r\\cos\\theta$, so $x^2+y^2=2x$, and completing the square gives

$$
(x-1)^2+y^2=1.
$$

It is a circle of radius $1$ centred at $(1,0)$, traced once as $\\theta$ goes from $0$ to $\\pi$.

**Standard shapes.**

- $r=a\\cos\\theta$ and $r=a\\sin\\theta$: circles through the pole.
- $r=a+b\\cos\\theta$: **limacons**. If $a=b$ it is a **cardioid**, heart-shaped with a cusp at the pole. If $a<b$ there is an inner loop.
- $r=a\\cos n\\theta$: **roses**, with $n$ petals if $n$ is odd and $2n$ petals if $n$ is even.

Sketch by finding where $r=0$ and where $|r|$ is greatest, and by using a rough graph of $r$ against $\\theta$.

**Tangents.** A polar curve $r=f(\\theta)$ is a parametric curve with parameter $\\theta$: $x=r\\cos\\theta$ and $y=r\\sin\\theta$. So

$$
\\frac{dy}{dx}=\\frac{dy/d\\theta}{dx/d\\theta}=\\frac{r'\\sin\\theta+r\\cos\\theta}{r'\\cos\\theta-r\\sin\\theta}.
$$

**Worked example 2.** Find the tangent slope of the cardioid $r=1+\\cos\\theta$ at $\\theta=\\pi/2$. There $r=1$ and $r'=-\\sin\\theta=-1$. So

$$
\\frac{dy}{dx}=\\frac{(-1)(1)+(1)(0)}{(-1)(0)-(1)(1)}=\\frac{-1}{-1}=1.
$$

**Conics.** With one focus at the pole, every conic has the form $r=\\dfrac{ed}{1+e\\cos\\theta}$, where $e$ is the eccentricity and $d$ is the distance to the directrix. This is the natural form for orbits, with the Sun at the pole.`,
          resources: [
            openstax('7-3-polar-coordinates', 'Polar coordinates', 'Conversion, sketching and symmetry.', true),
            paul('PolarCoordinates', 'Polar coordinates', 'Conversions and common curves.'),
            paul('PolarTangents', 'Tangents with polar coordinates', 'The slope formula.'),
          ],
          exercises: [
            {
              slug: 'polar-conversions',
              title: 'Conversions',
              prompt: `(a) Convert to polar: $(x,y)=(-1,1)$. (b) Convert to Cartesian: $(r,\\theta)=(2,-\\pi/3)$ and $(-3,\\pi/6)$. (c) Write in Cartesian form, and name each curve: $r=4\\sin\\theta$, $r=\\dfrac{1}{\\cos\\theta+\\sin\\theta}$. (d) Write $y=x^2$ in polar form.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) (sqrt 2, 3 pi/4). (b) (1, -sqrt 3) and (-3 sqrt(3)/2, -3/2). (c) x^2 + (y - 2)^2 = 4, a circle; x + y = 1, a line. (d) r = tan(theta) sec(theta).',
            },
            {
              slug: 'polar-sketches',
              title: 'Sketch and analyse',
              prompt: `Sketch $r=1+2\\cos\\theta$ and give the angles where $r=0$. Sketch $r=\\sin3\\theta$ and $r=\\cos2\\theta$, and count the petals. For the cardioid $r=1+\\cos\\theta$, find the points with horizontal tangents.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'r = 0 at 2 pi/3, 4 pi/3, with an inner loop. Three and four petals. The tangent is horizontal at theta = pi/3 and 5 pi/3, with y = +-3 sqrt(3)/4, x = 3/4. At theta = pi both derivatives vanish, at the cusp.',
            },
            {
              slug: 'polar-conic',
              title: 'Conics in polar form',
              prompt: `Convert $r=\\dfrac{3}{1+\\frac12\\cos\\theta}$ into Cartesian form. Show that it is an ellipse. Find its centre, $a$ and $b$, and confirm that the eccentricity is $\\tfrac12$ and that one focus is at the origin.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Write r = 3 - x/2 and square. You get (3/4)(x + 2)^2 + y^2 = 12, so the centre is (-2, 0), a = 4, b^2 = 12, c = 2.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give two other polar representations of $(2,\\pi/3)$.',
              answerOutline: 'For example, $(2,7\\pi/3)$ and $(-2,4\\pi/3)$.',
            },
            {
              question: 'What shape is $r=a\\sin\\theta$?',
              answerOutline: 'A circle of diameter $|a|$, through the pole, centred on the $y$-axis.',
            },
            {
              question: 'Why is a polar curve a parametric curve?',
              answerOutline: 'With $\\theta$ as the parameter: $x=f(\\theta)\\cos\\theta$ and $y=f(\\theta)\\sin\\theta$.',
            },
          ],
        },
        {
          slug: 'calculus-in-polar-coordinates',
          title: 'Area and arc length in polar coordinates',
          summary:
            'Using thin sectors to find polar areas, and the polar arc length formula.',
          estimatedMinutes: 170,
          objectives: [
            'Derive the polar area formula from sectors',
            'Find the area enclosed by a polar curve, with correct limits',
            'Find areas between two polar curves',
            'Compute polar arc length',
          ],
          concepts: [
            'Sector area $\\frac12r^2\\Delta\\theta$',
            'Polar area integral',
            'Finding the limits',
            'Area between polar curves',
            'Polar arc length',
            'Intersections at the pole',
          ],
          explanation: `In polar coordinates the natural slice is not a rectangle but a thin sector. A sector of radius $r$ and small angle $\\Delta\\theta$ has area $\\tfrac12r^2\\Delta\\theta$. Adding up and taking a limit gives the area swept out from the pole by $r=f(\\theta)$ as $\\theta$ goes from $\\alpha$ to $\\beta$:

$$
A=\\frac12\\int_\\alpha^\\beta r^2\\,d\\theta.
$$

Do not omit the $\\tfrac12$. The limits must cover the region exactly once.

**Worked example 1.** The cardioid $r=1+\\cos\\theta$ is traced once for $0\\le\\theta\\le2\\pi$. So

$$
A=\\frac12\\int_0^{2\\pi}(1+2\\cos\\theta+\\cos^2\\theta)\\,d\\theta=\\frac12\\left(2\\pi+0+\\pi\\right)=\\frac{3\\pi}{2}.
$$

**Worked example 2.** One petal of $r=\\cos2\\theta$ lies between consecutive zeros of $r$, at $\\theta=\\pm\\pi/4$:

$$
A=\\frac12\\int_{-\\pi/4}^{\\pi/4}\\cos^22\\theta\\,d\\theta=\\frac12\\cdot\\frac\\pi4=\\frac\\pi8.
$$

For a rose, always find the limits from the zeros of $r$. If you integrate over $[0,2\\pi]$ for a three-petal rose, each petal is counted twice.

**Between two curves.** If the outer curve is $r_2$ and the inner is $r_1$ with $r_2\\ge r_1\\ge0$, then

$$
A=\\frac12\\int_\\alpha^\\beta(r_2^2-r_1^2)\\,d\\theta.
$$

Note that this is the difference of squares, not the square of a difference.

**Worked example 3.** Find the area inside $r=3\\cos\\theta$ and outside $r=1+\\cos\\theta$. The curves meet when $3\\cos\\theta=1+\\cos\\theta$, so $\\cos\\theta=\\tfrac12$, and $\\theta=\\pm\\pi/3$. Using symmetry about the $x$-axis,

$$
A=2\\cdot\\frac12\\int_0^{\\pi/3}\\left(9\\cos^2\\theta-(1+\\cos\\theta)^2\\right)d\\theta=\\int_0^{\\pi/3}(8\\cos^2\\theta-2\\cos\\theta-1)\\,d\\theta=\\pi.
$$

**Intersections.** Solving $f(\\theta)=g(\\theta)$ finds only the intersections that occur at the same $\\theta$. Curves can also meet at the pole, with different values of $\\theta$, or at points with different coordinates such as $(r,\\theta)$ and $(-r,\\theta+\\pi)$. Always sketch both curves. For example, $r=\\sin\\theta$ and $r=\\cos\\theta$ meet at the pole, and the equation $\\sin\\theta=\\cos\\theta$ does not reveal that.

**Arc length.** With $\\theta$ as parameter, $x'^2+y'^2=r^2+r'^2$, a small algebra result you should verify. Therefore

$$
L=\\int_\\alpha^\\beta\\sqrt{r^2+\\left(\\frac{dr}{d\\theta}\\right)^2}\\,d\\theta.
$$

For the cardioid, $r^2+r'^2=2+2\\cos\\theta=4\\cos^2(\\theta/2)$. Using symmetry to work on $[0,\\pi]$, where $\\cos(\\theta/2)\\ge0$, gives $L=2\\int_0^\\pi2\\cos(\\theta/2)\\,d\\theta=8$.

Kepler's second law says a planet sweeps out equal areas in equal times. Its statement in polar form is simply that $\\tfrac12r^2\\dfrac{d\\theta}{dt}$ is constant.`,
          resources: [
            openstax('7-4-area-and-arc-length-in-polar-coordinates', 'Area and arc length in polar coordinates', 'Both formulas, with worked regions.', true),
            paul('PolarArea', 'Area with polar coordinates', 'Regions between curves.'),
            paul('PolarArcLength', 'Arc length with polar coordinates', 'The formula with examples.'),
          ],
          exercises: [
            {
              slug: 'polar-area-drill',
              title: 'Polar areas',
              prompt: `Find the area of each region, stating your limits: (a) inside $r=2\\sin\\theta$, (b) inside the lemniscate $r^2=4\\cos2\\theta$, (c) one petal of $r=\\sin3\\theta$, (d) the inner loop of $r=1+2\\cos\\theta$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) pi. (b) 4. (c) pi/12. (d) pi - 3 sqrt(3)/2, using limits 2 pi/3 to 4 pi/3.',
            },
            {
              slug: 'between-polar-curves',
              title: 'Between curves',
              prompt: `Find the area of each region, sketching it first: (a) inside $r=1+\\cos\\theta$ and outside $r=1$, (b) inside both $r=\\sin\\theta$ and $r=\\cos\\theta$, (c) inside the circle $r=2$ and to the right of the line $r=\\sec\\theta$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) pi/4 + 2. (b) pi/8 - 1/4. (c) 4 pi/3 - sqrt 3.',
            },
            {
              slug: 'polar-length',
              title: 'Polar lengths',
              prompt: `Find the length of each curve: (a) the logarithmic spiral $r=e^\\theta$ for $0\\le\\theta\\le2\\pi$, (b) the circle $r=2\\cos\\theta$, as a check on the formula, (c) the spiral $r=\\theta$ for $0\\le\\theta\\le2\\pi$, using the integral of $\\sqrt{1+\\theta^2}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) sqrt 2 (e^(2 pi) - 1). (b) 2 pi. (c) pi sqrt(1 + 4 pi^2) + (1/2) ln(2 pi + sqrt(1 + 4 pi^2)), about 21.26.',
            },
            {
              slug: 'kepler-second',
              title: "Kepler's second law",
              prompt: `In polar coordinates, the area swept out from the pole has rate $\\dfrac{dA}{dt}=\\tfrac12r^2\\dfrac{d\\theta}{dt}$. (a) Derive this from the area integral. (b) A planet's angular momentum per unit mass is $h=r^2\\dfrac{d\\theta}{dt}$, which is constant for a central force. Show that this implies equal areas in equal times. (c) Using this, show that for an ellipse the speed at closest approach and at the farthest point are in the ratio $(1+e)/(1-e)$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'At both extreme points the velocity is perpendicular to the radius, so v = r times d(theta)/dt and h = rv. The distances are a(1 - e) and a(1 + e).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the polar area formula have a $\\tfrac12$?',
              answerOutline: 'A thin sector has area $\\tfrac12r^2\\Delta\\theta$, not $r^2\\Delta\\theta$.',
            },
            {
              question: 'Can solving $f(\\theta)=g(\\theta)$ miss an intersection?',
              answerOutline: 'Yes, at the pole or where the point has different coordinates on the two curves.',
            },
            {
              question: 'Write the polar arc length formula.',
              answerOutline: '$L=\\int_\\alpha^\\beta\\sqrt{r^2+r\'^2}\\,d\\theta$.',
            },
          ],
        },
      ],
      project: {
        slug: 'curves-gallery',
        title: 'A gallery of curves',
        description: `Choose three curves of historical or physical interest, such as the cycloid, the epicycloid traced by a gear tooth, a logarithmic spiral, a lemniscate, or a planetary orbit in polar form. For each one, derive a parametric or polar description from a physical or geometric definition, and plot it using a script or a graphing tool. By hand, compute a tangent line at a point of your choice, and the arc length or the enclosed area. Check each value numerically with the Simpson rule. Add a paragraph on why the curve matters, drawing on a source that you cite.`,
        deliverables: [
          'A derivation of the equations of each of the three curves from a definition',
          'A plot of each curve, with the parameter direction marked',
          'A hand computation of a tangent line and of an area or length for each curve',
          'A numerical check of each integral using the Simpson rule',
          'A short written note on each curve, with a cited source',
        ],
        estimatedHours: 5,
        stretchGoals: ['Animate a rolling circle tracing out your cycloid or epicycloid'],
      },
    },
  ],
  capstone: {
    slug: 'orbit-of-a-comet',
    title: 'The orbit of a comet',
    description: `Pick a real comet or asteroid, and look up its semi-major axis and eccentricity from a public source such as NASA's JPL Small-Body Database. Use the whole course to answer one question in detail: where will it be at a given date?

Write the orbit as a polar conic with the Sun at the pole. From Kepler's second law, $r^2\\,d\\theta/dt=h$, derive an integral for the time to move from the closest point to a given angle:

$$
t(\\theta)=\\frac1h\\int_0^\\theta r(\\phi)^2\\,d\\phi.
$$

First do what you can by hand. Find the period from the total area of the ellipse and check it against Kepler's third law, using $T^2=a^3$ with $T$ in years and $a$ in AU. Evaluate $t(\\theta)$ with the Simpson rule, and choose the number of steps from an error estimate, justified by doubling $n$ to observe the rate at which the result changes. For small $e$, expand $r(\\theta)^2$ with the binomial series to get an approximate formula for $t(\\theta)$, then compare it with your numerical values, and find for which eccentricities the series is accurate. Inverting the problem, use Newton's method to solve for the angle at a given time. Finally, compute the speed along the orbit, the length of the orbit by a numerical arc length integral, and the fraction of the orbital period the body spends inside the orbit of Mars or some other marker of your choice.`,
    deliverables: [
      'Orbital data with its source, and the polar equation of the orbit with a labelled plot',
      'A derivation of the time integral from Kepler\'s second law, with the area computation of the period',
      'A Simpson rule implementation with an error study, shown as a convergence table',
      'A binomial series approximation for small eccentricity, with its range of accuracy',
      'A Newton solver giving position at a stated date, tested against a published position if you can find one',
      'A numerical arc length of the orbit, and the speed at closest and farthest points',
      'A short report explaining each method and the checks you made',
    ],
    estimatedHours: 12,
    stretchGoals: [
      'Treat a hyperbolic visitor such as 1I/Oumuamua, and show which results change',
      'Derive Kepler\'s equation for the eccentric anomaly, and compare it with your integral method',
    ],
  },
  masteryChecklist: [
    'I can choose and carry out substitution, parts, trigonometric methods and partial fractions on an unlabelled integral',
    'I can evaluate improper integrals, test convergence by comparison, and avoid false symmetric limits',
    'I can apply numerical rules with error bounds to choose the number of subintervals',
    'I can set up arc length, surface area, centre of mass and probability integrals',
    'I can solve separable differential equations and interpret growth, cooling and logistic models',
    'I can test any series for convergence, and distinguish absolute from conditional convergence',
    'I can find the radius and interval of convergence of a power series, including endpoints',
    'I can write down the standard Taylor series and build new ones from them',
    "I can use Taylor's theorem to bound an error, and prove that a series converges to its function",
    'I can work with conic sections, parametric curves and polar curves, including areas and lengths',
  ],
});
