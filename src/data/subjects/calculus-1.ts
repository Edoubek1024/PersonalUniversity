import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Calculus Volume 1: ${title}`,
  url: `https://openstax.org/books/calculus-volume-1/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const paul = (page: string, title: string, note: string): ResourceInput => ({
  title: `Paul's Online Math Notes: ${title}`,
  url: `https://tutorial.math.lamar.edu/Classes/CalcI/${page}.aspx`,
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

const grapher: ResourceInput = {
  title: 'Calculus Grapher',
  url: 'https://phet.colorado.edu/en/simulations/calculus-grapher',
  type: 'interactive',
  cost: 'free',
  provider: 'PhET Interactive Simulations',
  note: 'Draw a function and watch its derivative and integral redraw as you change it.',
};

export default defineSubject({
  id: 'calculus-1',
  title: 'Calculus I',
  category: 'math',
  tagline:
    'Limits, derivatives and integrals from the ground up, by hand, with geometric and physical reasoning throughout.',
  description: `Calculus is the mathematics of change and accumulation. It answers two questions that sound unrelated: how fast is something changing at this instant, and how much has built up over time? The great discovery of the subject, the fundamental theorem of calculus, is that these two questions are inverses of each other. Almost all of physics, engineering and higher mathematics is written in this language.

This course assumes algebra and no calculus. It starts with a review of the functions you will use, builds the limit carefully, and then develops the derivative and the integral with the tangent line, the falling ball, the leaking tank and the stretched spring as constant companions. Every technique is practised by hand, because fluency with these calculations is what later courses assume. Each lesson is written so that you can learn from the page alone: read the worked example with a pencil, reproduce it with the page covered, then do the exercises. Hints hold a first step and, where an exercise has a definite result, the answer to check against.

The course follows the topics of MATH 220 and MATH 221 at the University of Illinois Urbana-Champaign, based on the public catalog description. It is an original course and is not affiliated with or endorsed by the University of Illinois. A separate course, Calculus for Data Science, covers similar material through data and computation. This one is the standard geometric and physical route, and it is the base of every other course in the mathematics category.`,
  difficulty: 'beginner',
  estimatedHours: 100,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra: factoring, fractions, solving equations and inequalities',
    'Basic geometry: areas, volumes, similar triangles, the Pythagorean theorem',
  ],
  tags: ['calculus', 'limits', 'derivatives', 'integrals', 'optimisation', 'mathematics'],
  core: false,
  modules: [
    {
      slug: 'functions-and-precalculus',
      title: 'Functions and Precalculus Review',
      description:
        'The functions calculus is built on: algebraic, trigonometric, exponential, logarithmic and inverse functions, reviewed with an eye on the mistakes that cause trouble later.',
      lessons: [
        {
          slug: 'functions-and-graphs',
          title: 'Functions, domains and composition',
          summary:
            'What a function is, how to find its domain, how to combine functions, and how a graph changes under shifts and stretches.',
          estimatedMinutes: 150,
          objectives: [
            'State what makes a rule a function and test a graph with the vertical line test',
            'Find the domain of a function built from fractions and roots',
            'Form compositions and find their domains',
            'Shift, stretch and reflect a graph from a change in the formula',
            'Simplify a difference quotient',
          ],
          concepts: [
            'Function, domain, range',
            'Vertical line test',
            'Composition $f \\circ g$',
            'Graph transformations',
            'Even and odd functions',
            'Difference quotient',
          ],
          explanation: `A **function** is a rule that assigns to each input in a set, the **domain**, exactly one output. The set of outputs is the **range**. On a graph, "exactly one output" means that every vertical line meets the curve at most once.

When a function is given by a formula and no domain is stated, the domain is every real number for which the formula makes sense. For now that means two restrictions: you cannot divide by zero, and you cannot take an even root of a negative number. For example, $f(x)=\\dfrac{\\sqrt{x-2}}{x-5}$ needs $x \\ge 2$ and $x \\ne 5$, so its domain is $[2,5)\\cup(5,\\infty)$.

The **composition** $f\\circ g$ means "do $g$ first, then $f$": $(f\\circ g)(x)=f(g(x))$. The order matters, and simplifying can hide a domain restriction.

**Worked example.** Let $f(x)=\\sqrt{x-1}$ and $g(x)=x^2+1$. Then

$$
(f\\circ g)(x)=\\sqrt{(x^2+1)-1}=\\sqrt{x^2}=|x|,
$$

which is defined for all real $x$. Note the absolute value: $\\sqrt{x^2}=x$ is false when $x<0$. In the other order,

$$
(g\\circ f)(x)=(\\sqrt{x-1})^2+1=(x-1)+1=x,
$$

but this holds only for $x\\ge 1$, because $f$ must be defined first. The simplified formula $x$ does not show that restriction, so you must carry it along by hand.

**Transformations.** Replacing $f(x)$ by $f(x-c)$ moves the graph right by $c$. Adding $c$ to the output, $f(x)+c$, moves it up by $c$. Using $cf(x)$ stretches it vertically, and $-f(x)$ reflects it in the $x$-axis. A function is **even** if $f(-x)=f(x)$ (symmetric about the $y$-axis) and **odd** if $f(-x)=-f(x)$ (symmetric about the origin).

\`\`\`interactive
function-explorer
{"title": "Shifts, stretches and reflections", "f": ["x^2", "s*(x - c)^2 + d"], "sliders": {"c": [0, -4, 4, 0.1], "d": [0, -4, 4, 0.1], "s": [1, -3, 3, 0.1]}, "view": [-6, 6, -5, 7], "caption": "The first curve is y = x², the second y = s(x − c)² + d. Drag c and the parabola moves right by c; drag d and it moves up by d; s stretches it vertically, and a negative s reflects it in the x-axis. Set c = 2, d = 3 and s = 1 to get y = (x − 2)² + 3 from the self-check, with its vertex at (2, 3)."}
\`\`\`

One expression deserves special attention, because the whole of differential calculus grows from it. The **difference quotient** $\\dfrac{f(x+h)-f(x)}{h}$ is the slope of the line through two points of the graph. For $f(x)=x^2$ it simplifies to

$$
\\frac{(x+h)^2-x^2}{h}=\\frac{2xh+h^2}{h}=2x+h \\qquad (h\\ne 0).
$$

Practise this algebra now. You will do it dozens of times in Module 3.`,
          resources: [
            openstax('1-1-review-of-functions', 'Review of functions', 'Definitions, domains, composition and symmetry, with plenty of examples.', true),
            openstax('1-2-basic-classes-of-functions', 'Basic classes of functions', 'Polynomials, rational and algebraic functions, and graph transformations.'),
            paul('Functions', 'Review of functions', 'A short second explanation of function notation and difference quotient algebra.'),
          ],
          exercises: [
            {
              slug: 'domains',
              title: 'Domains by hand',
              prompt: `Find the domain of each function in interval notation: (a) $\\dfrac{x+1}{x^2-4}$, (b) $\\sqrt{6-2x}$, (c) $\\dfrac{1}{\\sqrt{x^2-9}}$, (d) $\\dfrac{\\sqrt{x}}{x-3}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'List the restrictions, then combine them. Answers: (a) all reals except -2 and 2; (b) (-inf, 3]; (c) (-inf, -3) union (3, inf); (d) [0, 3) union (3, inf).',
            },
            {
              slug: 'compositions',
              title: 'Compose in both orders',
              prompt: `Let $f(x)=x^2-3x$ and $g(x)=\\dfrac{1}{x+1}$. Write $f\\circ g$ and $g\\circ f$ as single simplified fractions, and give the domain of each.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'f(g(x)) = (-3x - 2)/(x + 1)^2 with x not -1. g(f(x)) = 1/(x^2 - 3x + 1), with x not equal to (3 + sqrt 5)/2 or (3 - sqrt 5)/2.',
            },
            {
              slug: 'difference-quotients',
              title: 'Difference quotients',
              prompt: `Simplify $\\dfrac{f(x+h)-f(x)}{h}$ for $h\\ne 0$ until no $h$ remains in a denominator: (a) $f(x)=x^3$, (b) $f(x)=\\dfrac1x$, (c) $f(x)=\\sqrt{x}$ (multiply top and bottom by the conjugate).`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) 3x^2 + 3xh + h^2; (b) -1/(x(x + h)); (c) 1/(sqrt(x + h) + sqrt(x)).',
            },
            {
              slug: 'wire-model',
              title: 'Build a function from a description',
              prompt: `A wire of length $1.2$ m is cut in two. A piece of length $x$ is bent into a square and the rest into a circle. Write the total enclosed area $A(x)$ as a function of $x$ and state its domain. Evaluate $A(0)$ and $A(1.2)$. (You will find the best cut in Module 5.)`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The square has side x/4. The circle has circumference 1.2 - x. A(x) = (x/4)^2 + (1.2 - x)^2/(4 pi) on [0, 1.2]. A(0) is about 0.1146 and A(1.2) = 0.09 square metres.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\sqrt{x^2}=|x|$ and not $x$?',
              answerOutline: 'The square root symbol means the non-negative root. If $x=-3$ then $\\sqrt{9}=3=-x$. So the result is $x$ for $x\\ge0$ and $-x$ for $x<0$.',
            },
            {
              question: 'How do you find the domain of $f\\circ g$?',
              answerOutline: 'Take the $x$ in the domain of $g$ for which $g(x)$ is in the domain of $f$. Work this out before simplifying, because simplifying can hide a restriction.',
            },
            {
              question: 'How does the graph of $y=(x-2)^2+3$ relate to $y=x^2$?',
              answerOutline: 'It is the same parabola moved right by 2 and up by 3, with vertex at $(2,3)$.',
            },
          ],
        },
        {
          slug: 'trigonometry',
          title: 'Trigonometry in radians',
          summary:
            'Radian measure, the unit circle, exact values, the essential identities and solving trigonometric equations.',
          estimatedMinutes: 170,
          objectives: [
            'Convert between degrees and radians and say why calculus uses radians',
            'Read sine, cosine and tangent off the unit circle, including exact values',
            'Use the Pythagorean, angle-sum and double-angle identities',
            'Solve trigonometric equations on a given interval',
            'Write a sinusoidal model from its amplitude, period and midline',
          ],
          concepts: [
            'Radian measure',
            'Unit circle definition of sine and cosine',
            'Exact values at multiples of $\\pi/6$ and $\\pi/4$',
            'Pythagorean identity',
            'Angle-sum and double-angle formulas',
            'Amplitude and period',
          ],
          explanation: `A **radian** measures an angle by arc length: an angle of $\\theta$ radians cuts off an arc of length $\\theta$ on a circle of radius 1. A full turn is $2\\pi$, so $180^\\circ=\\pi$ radians. On a circle of radius $r$ the arc is $s=r\\theta$. Calculus always uses radians, because the simple derivative formulas of Module 3 are true only in this unit.

Take the point where a ray at angle $\\theta$ meets the unit circle, measuring anticlockwise from the positive $x$-axis. That point is $(\\cos\\theta,\\sin\\theta)$. This definition works for every angle, not just those in right triangles, and it gives $\\tan\\theta=\\sin\\theta/\\cos\\theta$ wherever $\\cos\\theta\\ne0$. Sine and cosine have period $2\\pi$. Tangent has period $\\pi$. Sine is odd and cosine is even: $\\sin(-\\theta)=-\\sin\\theta$ and $\\cos(-\\theta)=\\cos\\theta$.

Learn these values cold. For $\\theta=0,\\ \\pi/6,\\ \\pi/4,\\ \\pi/3,\\ \\pi/2$, sine takes the values $0,\\ \\tfrac12,\\ \\tfrac{\\sqrt2}{2},\\ \\tfrac{\\sqrt3}{2},\\ 1$, and cosine takes the same values in reverse. Other quadrants follow by symmetry.

Drag the point round the circle below and watch both coordinates at once.

\`\`\`interactive
unit-circle
{"title": "Sine and cosine on the unit circle", "degrees": 30, "caption": "The point at angle θ is (cos θ, sin θ): its x-coordinate is the cos θ segment and its y-coordinate the sin θ segment, and the graphs on the right are traced as θ grows. Near multiples of π/6 and π/4 the point snaps and the readouts become exact. Check sin(5π/6) = 1/2 and cos(7π/4) = √2/2, then find the two angles in [0, 2π) with sin θ = −1/2 from the worked example: both have reference angle π/6."}
\`\`\`

The identities you will use constantly are

$$
\\sin^2\\theta+\\cos^2\\theta=1,\\qquad \\sin(a+b)=\\sin a\\cos b+\\cos a\\sin b,
$$

$$
\\cos(a+b)=\\cos a\\cos b-\\sin a\\sin b,
$$

and the special cases $\\sin2\\theta=2\\sin\\theta\\cos\\theta$ and $\\cos2\\theta=\\cos^2\\theta-\\sin^2\\theta=2\\cos^2\\theta-1=1-2\\sin^2\\theta$. Dividing the first by $\\cos^2\\theta$ gives $1+\\tan^2\\theta=\\sec^2\\theta$.

**Worked example.** Solve $2\\sin^2x-\\sin x-1=0$ for $0\\le x<2\\pi$.

This is a quadratic in $s=\\sin x$: $2s^2-s-1=(2s+1)(s-1)=0$, so $s=1$ or $s=-\\tfrac12$. The equation $\\sin x=1$ gives $x=\\pi/2$. The equation $\\sin x=-\\tfrac12$ has reference angle $\\pi/6$ in the quadrants where sine is negative, the third and fourth, so $x=7\\pi/6$ and $x=11\\pi/6$. There are three solutions. A common slip is to divide an equation by $\\sin x$, which throws away the solutions where $\\sin x=0$. Factor instead.

**Exact values from identities.** Since $\\pi/12=\\pi/3-\\pi/4$,

$$
\\cos\\tfrac{\\pi}{12}=\\cos\\tfrac\\pi3\\cos\\tfrac\\pi4+\\sin\\tfrac\\pi3\\sin\\tfrac\\pi4=\\frac{\\sqrt6+\\sqrt2}{4}.
$$

**Sinusoids.** The function $y=A\\cos(\\omega t)+D$ oscillates about the midline $y=D$ with amplitude $|A|$ and period $2\\pi/\\omega$. Waves and vibrations throughout physics have this form.

\`\`\`interactive
function-explorer
{"title": "Sinusoids", "f": "A*cos(w*(x - c)) + D", "sliders": {"A": [1, -3, 3, 0.1], "w": [1, 0.25, 4, 0.05], "c": [0, -3.15, 3.15, 0.05], "D": [0, -2, 2, 0.1]}, "view": [-6.6, 6.6, -4, 4], "trig": true, "caption": "y = A cos(w(x − c)) + D, with w playing the role of ω. |A| is the amplitude, 2π/w the period, c the shift to the right and D the midline. Set w = 2 and check that the period halves to π. Make A negative and the curve starts at its lowest point at x = 0, like the rider in the Ferris wheel exercise."}
\`\`\``,
          resources: [
            openstax('1-3-trigonometric-functions', 'Trigonometric functions', 'Radians, the unit circle, identities and graphs.', true),
            paul('TrigFcns', 'Review of trig functions', 'Fast review with exact values.'),
            paul('TrigEquations', 'Solving trig equations', 'Extra worked equations, including how to count solutions on an interval.'),
          ],
          exercises: [
            {
              slug: 'exact-values',
              title: 'Exact values',
              prompt: `Without a calculator: (a) write $150^\\circ$ in radians, (b) $\\sin(5\\pi/6)$, (c) $\\cos(7\\pi/4)$, (d) $\\tan(2\\pi/3)$, (e) $\\sec\\pi$, (f) $\\sin(\\pi/12)$ using an angle-difference formula.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 5 pi/6; (b) 1/2; (c) sqrt(2)/2; (d) -sqrt 3; (e) -1; (f) (sqrt 6 - sqrt 2)/4.',
            },
            {
              slug: 'trig-equations',
              title: 'Solve on an interval',
              prompt: `Find every solution in the interval $[0,2\\pi)$, showing the factoring step in each case: (a) $\\cos2x=\\cos x$, (b) $\\sin2x=\\sin x$, (c) $\\tan^2x=3$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Use a double-angle formula and factor; do not divide by sin x. Answers: (a) 0, 2 pi/3, 4 pi/3; (b) 0, pi/3, pi, 5 pi/3; (c) pi/3, 2 pi/3, 4 pi/3, 5 pi/3.',
            },
            {
              slug: 'ferris-wheel',
              title: 'A sinusoidal model',
              prompt: `A wheel of radius $20$ m has its centre $24$ m above the ground and turns once every $90$ s. A rider starts at the lowest point at $t=0$. Write the rider's height $h(t)$ as a cosine function. When does the rider first reach a height of $34$ m?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'h(t) = 24 - 20 cos(2 pi t / 90). Setting h = 34 gives cos(2 pi t / 90) = -1/2, so t = 30 s.',
            },
            {
              slug: 'triple-angle',
              title: 'Prove an identity',
              prompt: `Prove that $\\sin3\\theta=3\\sin\\theta-4\\sin^3\\theta$ using the angle-sum formula on $\\sin(2\\theta+\\theta)$ and the double-angle formulas. Then use the identity to confirm the exact value of $\\sin(\\pi/2)$ from $\\theta=\\pi/6$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Replace cos^2 by 1 - sin^2 wherever it appears so that only sines are left.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the arc length cut off by an angle of $2$ radians on a circle of radius $5$?',
              answerOutline: '$s=r\\theta=10$.',
            },
            {
              question: 'Why does dividing $\\sin x\\cos x=\\sin x$ by $\\sin x$ lose solutions?',
              answerOutline: 'Dividing assumes $\\sin x\\ne0$. The solutions with $\\sin x=0$ vanish. Move everything to one side and factor: $\\sin x(\\cos x-1)=0$.',
            },
            {
              question: 'State the three forms of $\\cos2\\theta$ and say which you would use to write $\\cos^2\\theta$ in terms of $\\cos2\\theta$.',
              answerOutline: '$\\cos^2\\theta-\\sin^2\\theta$, $2\\cos^2\\theta-1$ and $1-2\\sin^2\\theta$. The second gives $\\cos^2\\theta=\\tfrac12(1+\\cos2\\theta)$.',
            },
          ],
        },
        {
          slug: 'exponentials-and-logarithms',
          title: 'Exponential and logarithmic functions',
          summary:
            'Exponent and logarithm laws, the number $e$, solving equations, and growth and decay models.',
          estimatedMinutes: 150,
          objectives: [
            'Apply the laws of exponents and logarithms',
            'Solve exponential and logarithmic equations, rejecting answers outside the domain',
            'Use the natural logarithm and the number $e$',
            'Fit a model $A(t)=A_0e^{kt}$ to two pieces of information',
            'Compute doubling times and half-lives',
          ],
          concepts: [
            'Exponential function $b^x$',
            'Logarithm as an inverse of an exponential',
            'Natural logarithm $\\ln x$',
            'The number $e\\approx2.71828$',
            'Change of base',
            'Half-life and doubling time',
          ],
          explanation: `An **exponential function** is $f(x)=b^x$ with $b>0$ and $b\\ne1$. The variable is in the exponent, which makes it quite different from a power such as $x^b$. The laws are $b^{x+y}=b^xb^y$, $b^{x-y}=b^x/b^y$ and $(b^x)^y=b^{xy}$. The function is positive for every $x$. If $b>1$ it grows, and if $0<b<1$ it decays.

The **logarithm** undoes the exponential: $\\log_b x=y$ means $b^y=x$. So $\\log_b$ is defined only for $x>0$. Each exponent law becomes a logarithm law:

$$
\\log_b(xy)=\\log_b x+\\log_b y,\\quad \\log_b(x/y)=\\log_b x-\\log_b y,\\quad \\log_b(x^r)=r\\log_b x.
$$

There is no law for $\\log_b(x+y)$. The change-of-base formula is $\\log_b x=\\ln x/\\ln b$.

The most important base is $e\\approx2.71828$, for a reason you will see in Module 4: $e^x$ is the one exponential that is its own derivative, in other words its slope at any point equals its height. We write $\\ln x$ for $\\log_e x$. The two functions cancel: $\\ln(e^x)=x$ for all $x$, and $e^{\\ln x}=x$ for $x>0$.

\`\`\`interactive
function-explorer
{"title": "Exponentials and their logarithms", "f": ["b^x", "log(x)/log(b)", "x"], "sliders": {"b": [2, 0.2, 5, 0.05]}, "view": [-4, 6, -4, 6], "equal": true, "caption": "The first curve is y = bˣ, the second y = log_b x = ln x / ln b, and the third the line y = x: each curve is the other's mirror image in that line, because the logarithm undoes the exponential. Every exponential passes through (0, 1) and every logarithm through (1, 0). Slide b below 1 and growth turns into decay; at b = 1 the logarithm disappears, which is why b ≠ 1. Set b = 2.7 for a close look at eˣ and ln x."}
\`\`\`

**Worked example 1.** Solve $\\ln x+\\ln(x-2)=\\ln3$.

Combine the logs to get $\\ln(x(x-2))=\\ln3$, so $x^2-2x-3=(x-3)(x+1)=0$ and $x=3$ or $x=-1$. The original equation needs $x>0$ and $x>2$, so $x=-1$ is rejected. The only solution is $x=3$. Combining logs can introduce false solutions, so always check the domain of the original equation.

**Worked example 2.** Iodine-131 has a half-life of about $8$ days. Model the amount as $A(t)=A_0e^{-kt}$ with $t$ in days. The half-life condition is $e^{-8k}=\\tfrac12$, so $8k=\\ln2$ and $k=\\tfrac{\\ln2}{8}\\approx0.0866$ per day. To find when $10\\%$ remains, solve $e^{-kt}=0.1$:

$$
t=\\frac{\\ln10}{k}=\\frac{8\\ln10}{\\ln2}\\approx26.6\\text{ days}.
$$

Notice the answer does not depend on $A_0$. Exponential decay has this memoryless character: it takes the same time to halve, whatever amount you start with. Likewise, growth at continuous rate $k$ has doubling time $\\ln2/k$.`,
          resources: [
            openstax('1-5-exponential-and-logarithmic-functions', 'Exponential and logarithmic functions', 'Laws, the number e, and models.', true),
            paul('ExpFunctions', 'Exponential functions', 'A short review of the graph and the number e.'),
            paul('ExpLogEqns', 'Exponential and logarithm equations', 'Worked equations, with attention to rejected solutions.'),
          ],
          exercises: [
            {
              slug: 'solve-exp-log',
              title: 'Solve exactly',
              prompt: `Solve exactly: (a) $3^{2x-1}=27$, (b) $e^{2x}-5e^x+6=0$, (c) $\\log_2x+\\log_2(x-6)=4$, (d) $\\ln(x^2)=2\\ln3$. Watch the domains carefully in (c) and (d).`,
              kind: 'problem',
              difficulty: 1,
              hint: 'For (b) let u = e^x. Answers: (a) x = 2; (b) x = ln 2 or ln 3; (c) x = 8 only; (d) x = 3 or x = -3, since ln(x^2) is defined for negative x.',
            },
            {
              slug: 'culture-growth',
              title: 'Fit a growth model',
              prompt: `A bacterial culture has $500$ cells at $t=0$ and $3200$ cells at $t=4$ hours. Assuming $N(t)=N_0e^{kt}$, find $k$, the doubling time, and the time at which the culture reaches $10\\,000$ cells. Give values to three significant figures.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'k = ln(6.4)/4, about 0.464 per hour. Doubling time about 1.49 h. Time to 10000 cells is ln(20)/k, about 6.46 h.',
            },
            {
              slug: 'log-laws-proof',
              title: 'Prove the laws',
              prompt: `Using only the definition of the logarithm and the exponent laws, prove (a) $\\log_b(xy)=\\log_bx+\\log_by$ for $x,y>0$, (b) $\\log_b(x^r)=r\\log_bx$, and (c) the change-of-base formula $\\log_bx=\\ln x/\\ln b$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Let p = log_b x and q = log_b y, so x = b^p and y = b^q. Then compute xy.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\ln(x^2)=2\\ln x$ not true for every $x$ where the left side is defined?',
              answerOutline: 'The left side is defined for all $x\\ne0$, the right only for $x>0$. In general $\\ln(x^2)=2\\ln|x|$.',
            },
            {
              question: 'What is the difference between $x^2$ and $2^x$ for large $x$?',
              answerOutline: 'The first is a power, the second an exponential. Exponentials eventually outgrow every power: $2^{10}=1024$ against $10^2=100$.',
            },
            {
              question: 'A quantity grows at continuous rate $7\\%$ per year. Roughly how long does it take to double?',
              answerOutline: '$\\ln2/0.07\\approx9.9$ years.',
            },
          ],
        },
        {
          slug: 'inverse-functions',
          title: 'Inverse functions and inverse trigonometry',
          summary:
            'When a function has an inverse, how to find it, and how restricting a domain produces arcsine, arccosine and arctangent.',
          estimatedMinutes: 130,
          objectives: [
            'Decide whether a function is one-to-one and apply the horizontal line test',
            'Find an inverse formula and state its domain',
            'Relate the graph of an inverse to the original by reflection in $y=x$',
            'Restrict a domain so that an inverse exists',
            'Evaluate inverse trigonometric expressions using their exact ranges',
          ],
          concepts: [
            'One-to-one function',
            'Horizontal line test',
            'Inverse $f^{-1}$ and cancellation',
            'Reflection in $y=x$',
            'Domain restriction',
            'Arcsine, arccosine, arctangent and their ranges',
          ],
          explanation: `A function is **one-to-one** if different inputs always give different outputs. On a graph this means every horizontal line meets the curve at most once. A one-to-one function $f$ has an **inverse** $f^{-1}$ that reverses it: $f^{-1}(y)=x$ exactly when $f(x)=y$. The domain and range swap, and the cancellation laws are $f^{-1}(f(x))=x$ on the domain of $f$ and $f(f^{-1}(y))=y$ on the domain of $f^{-1}$. Note that $f^{-1}(x)$ does not mean $1/f(x)$.

To find a formula, write $y=f(x)$, solve for $x$ in terms of $y$, then swap the names. Because swapping coordinates reflects a point across the line $y=x$, the graph of $f^{-1}$ is the mirror image of the graph of $f$ in that line.

**Worked example 1.** Find the inverse of $f(x)=\\dfrac{2x+1}{x-3}$.

Write $y(x-3)=2x+1$, so $yx-3y=2x+1$. Collect the $x$ terms: $x(y-2)=3y+1$, hence $x=\\dfrac{3y+1}{y-2}$. Swapping names, $f^{-1}(x)=\\dfrac{3x+1}{x-2}$ for $x\\ne2$. As a check, $f(0)=-\\tfrac13$ and $f^{-1}(-\\tfrac13)=\\dfrac{0}{-7/3}=0$.

**Restricting the domain.** The function $x^2$ is not one-to-one on the real line, since $(-2)^2=2^2$. On $[0,\\infty)$ it is, and its inverse is $\\sqrt{x}$. Trigonometric functions need the same treatment:

- $\\arcsin x$ is the angle in $[-\\pi/2,\\pi/2]$ whose sine is $x$, for $-1\\le x\\le1$.
- $\\arccos x$ is the angle in $[0,\\pi]$ whose cosine is $x$, for $-1\\le x\\le1$.
- $\\arctan x$ is the angle in $(-\\pi/2,\\pi/2)$ whose tangent is $x$, for all real $x$.

These ranges matter. In the interactive below, drag the point $P$ and watch its mirror image.

\`\`\`interactive
inverse-function
{"title": "Inverses by reflection", "examples": [{"label": "x²", "f": "x^2", "restrict": [0, 1000000], "a": 1.5, "view": [-3.5, 4.5, -3.5, 4.5], "name": "x^2", "inverseName": "\\\\sqrt{x}"}, {"label": "sin x", "f": "sin(x)", "restrict": [-1.5707963267948966, 1.5707963267948966], "a": 0.7853981633974483, "trig": true, "view": [-3.6, 3.6, -3.6, 3.6], "name": "\\\\sin x", "inverseName": "\\\\arcsin x"}, {"label": "(2x+1)/(x−3)", "f": "(2x + 1)/(x - 3)", "a": 0, "view": [-8, 10, -8, 10], "name": "\\\\frac{2x+1}{x-3}", "inverseName": "\\\\frac{3x+1}{x-2}"}], "caption": "P′ = (f(a), a) swaps the coordinates of P, so it traces the reflection of the graph in y = x. On the x² tab, turn on the horizontal line test and drag P: most lines meet the parabola twice, and the reflection is not a function. Restrict to x ≥ 0 and the reflection becomes y = √x. On the sin x tab, restricting to [−π/2, π/2] gives arcsin x. Without the restriction, put a near 3π/4 and read sin a ≈ 0.707; then restrict and move P′ to the input 0.707: its height is π/4, not 3π/4, as in worked example 2. The third tab is worked example 1, already one-to-one."}
\`\`\`

**Worked example 2.** Evaluate $\\arcsin(\\sin\\tfrac{3\\pi}{4})$. Tempting as it is, the answer is not $3\\pi/4$, which lies outside the range of arcsine. Since $\\sin\\tfrac{3\\pi}{4}=\\tfrac{\\sqrt2}{2}$, the answer is the angle in $[-\\pi/2,\\pi/2]$ with that sine, namely $\\pi/4$.

**Worked example 3.** Simplify $\\cos(\\arcsin x)$. Let $\\theta=\\arcsin x$, so $\\sin\\theta=x$ and $\\theta\\in[-\\pi/2,\\pi/2]$, where cosine is non-negative. Then $\\cos\\theta=+\\sqrt{1-\\sin^2\\theta}=\\sqrt{1-x^2}$. Simplifications like this are exactly how the derivatives of inverse trigonometric functions come out in Module 4.`,
          resources: [
            openstax('1-4-inverse-functions', 'Inverse functions', 'One-to-one functions, domain restriction and inverse trigonometric functions.', true),
            paul('InverseFunctions', 'Inverse functions', 'Short worked examples of finding and verifying inverses.'),
          ],
          exercises: [
            {
              slug: 'find-inverses',
              title: 'Find inverses with domains',
              prompt: `Find each inverse and state its domain: (a) $f(x)=x^3-2$, (b) $g(x)=\\sqrt{x-1}+3$ for $x\\ge1$, (c) $h(x)=e^{2x}+1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) cube root of (x + 2), all reals; (b) (x - 3)^2 + 1 for x >= 3; (c) (1/2) ln(x - 1) for x > 1.',
            },
            {
              slug: 'evaluate-inverse-trig',
              title: 'Inverse trigonometry',
              prompt: `Evaluate exactly: (a) $\\arccos(-\\tfrac12)$, (b) $\\arctan(-1)$, (c) $\\arcsin(\\sin\\tfrac{5\\pi}{6})$, (d) $\\sin(\\arccos\\tfrac35)$. (e) Simplify $\\tan(\\arcsin x)$ for $|x|<1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) 2 pi/3; (b) -pi/4; (c) pi/6; (d) 4/5; (e) x / sqrt(1 - x^2).',
            },
            {
              slug: 'restrict-quadratic',
              title: 'Restrict a domain',
              prompt: `Let $f(x)=x^2-4x+7$. Show that $f$ is not one-to-one on the real line by exhibiting two inputs with the same output. Complete the square, restrict $f$ to $x\\ge2$, and find the inverse with its domain.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'f(1) = f(3) = 4. f(x) = (x - 2)^2 + 3, so the inverse is 2 + sqrt(x - 3) for x >= 3.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $\\sin$ need its domain restricted before it has an inverse?',
              answerOutline: 'It is periodic, so it fails the horizontal line test. On $[-\\pi/2,\\pi/2]$ it is one-to-one and still takes every value in $[-1,1]$.',
            },
            {
              question: 'If $f(2)=7$ and $f$ is one-to-one, what can you say about $f^{-1}$?',
              answerOutline: '$f^{-1}(7)=2$, and the point $(7,2)$ is on the graph of $f^{-1}$.',
            },
            {
              question: 'Is $\\arctan(\\tan x)=x$ for every $x$ where the left side is defined?',
              answerOutline: 'No, only for $x\\in(-\\pi/2,\\pi/2)$. Outside that interval the result is the shifted angle in the range of arctangent.',
            },
          ],
        },
      ],
    },
    {
      slug: 'limits-and-continuity',
      title: 'Limits and Continuity',
      description:
        'The limit is the idea that separates calculus from algebra. This module builds it from intuition to computation, then to continuity and the precise epsilon-delta definition.',
      lessons: [
        {
          slug: 'the-intuitive-limit',
          title: 'The idea of a limit',
          summary:
            'From the speed of a falling ball to the informal definition of a limit, one-sided limits, and how limits can fail to exist.',
          estimatedMinutes: 150,
          objectives: [
            'Explain how the tangent and instantaneous velocity problems lead to limits',
            'Estimate a limit from a table and from a graph',
            'Compute one-sided limits of piecewise functions',
            'Use the rule that a limit exists exactly when both one-sided limits agree',
            'Recognise jumps, blow-ups and oscillation as reasons a limit fails to exist',
          ],
          concepts: [
            'Average and instantaneous velocity',
            'Secant and tangent lines',
            'Informal definition of a limit',
            'Left and right limits',
            'Limit versus function value',
            'Non-existence of a limit',
          ],
          explanation: `Drop a ball. After $t$ seconds it has fallen $s(t)=4.9t^2$ metres. How fast is it moving at $t=2$? Speed is distance over time, but at a single instant both are zero. The way out is to look at short intervals. Over $[2,2+h]$ the average velocity is

$$
\\frac{s(2+h)-s(2)}{h}=\\frac{4.9(4+4h+h^2)-19.6}{h}=19.6+4.9h.
$$

For $h=0.1$ this is $20.09$ m/s, for $h=0.01$ it is $19.649$ m/s. As $h$ shrinks the average closes in on $19.6$ m/s, and we call that the instantaneous velocity. We cannot set $h=0$ in the original fraction, which would be $0/0$. We can ask what value it approaches. Geometrically, the same computation turns a secant line through two points of a curve into a tangent line.

**Definition (informal).** We write $\\lim_{x\\to a}f(x)=L$ if $f(x)$ can be made as close to $L$ as we like by taking $x$ sufficiently close to $a$, but not equal to $a$.

That last clause is crucial. The limit describes what happens near $a$. It says nothing about $f(a)$, which may be different or may not exist at all.

**One-sided limits.** $\\lim_{x\\to a^-}f(x)$ uses only $x<a$, and $\\lim_{x\\to a^+}f(x)$ uses only $x>a$. The two-sided limit exists exactly when both one-sided limits exist and are equal.

**Worked example.** Let $f(x)=x+1$ for $x<1$, $f(1)=5$, and $f(x)=3-x$ for $x>1$. From the left, $f(x)\\to2$. From the right, $f(x)\\to2$. So $\\lim_{x\\to1}f(x)=2$, even though $f(1)=5$. Now let $g(x)=\\dfrac{|x-2|}{x-2}$. For $x>2$ this equals $1$, and for $x<2$ it equals $-1$. The one-sided limits are $1$ and $-1$, so $\\lim_{x\\to2}g(x)$ does not exist.

Limits can fail in three main ways: a **jump**, as for $g$; **unbounded growth**, as for $1/x^2$ at $0$; and **oscillation**, as for $\\sin(1/x)$ near $0$, which takes every value between $-1$ and $1$ on every interval around $0$.

\`\`\`interactive
epsilon-delta
{"title": "Zooming in on a limit", "modes": ["zoom"], "examples": [{"label": "f(1) = 5", "f": "2 - |x - 1|", "a": 1, "fa": 5, "view": [-1, 3, -0.6, 5.6]}, {"label": "Jump", "f": "|x - 2|/(x - 2)", "a": 2, "view": [0, 4, -2, 2]}, {"label": "1/x²", "f": "1/x^2", "a": 0, "L": 2, "view": [-2, 2, -1, 10]}, {"label": "sin(1/x)", "f": "sin(1/x)", "a": 0, "L": 0, "view": [-1, 1, -1.6, 1.6]}], "caption": "The first tab is the worked example's f: x + 1 to the left of 1, 3 − x to the right, and f(1) = 5. Shrink the window and read the table: from both sides f(x) closes in on 2, while the filled dot stays at 5. The limit ignores f(a). The other tabs fail in the three ways of the lesson: the jump settles on −1 and 1 from the two sides, 1/x² grows without bound, and sin(1/x) keeps covering [−1, 1] at every zoom."}
\`\`\`

Tables are useful for guessing, but they can mislead, because a calculator rounds and because a function can behave differently at scales you did not sample. The next lesson gives methods that prove the value.`,
          resources: [
            openstax('2-1-a-preview-of-calculus', 'A preview of calculus', 'The tangent, velocity and area problems.', true),
            openstax('2-2-the-limit-of-a-function', 'The limit of a function', 'Informal definition, one-sided and infinite limits.'),
            paul('OneSidedLimits', 'One-sided limits', 'Good pictures of one-sided behaviour.'),
            essence('Watch the opening episodes for the moving-object view of a derivative.'),
          ],
          exercises: [
            {
              slug: 'estimate-from-table',
              title: 'Estimate a limit from a table',
              prompt: `Make a table of $f(x)=\\dfrac{2^x-1}{x}$ at $x=\\pm0.1,\\ \\pm0.01,\\ \\pm0.001$ and estimate $\\lim_{x\\to0}f(x)$ to three decimal places. Explain why $f(0)$ itself tells you nothing here.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'The values approach about 0.693. In Module 4 you will see that this is ln 2. f(0) is undefined, because the formula gives 0/0.',
            },
            {
              slug: 'piecewise-limits',
              title: 'One-sided limits',
              prompt: `Let $f(x)=x^2$ for $x<2$, $f(2)=1$, and $f(x)=8-2x$ for $x>2$. Find $\\lim_{x\\to2^-}f$, $\\lim_{x\\to2^+}f$ and $\\lim_{x\\to2}f$. Then let $g(x)=\\dfrac{x^2-x}{|x-1|}$ and find both one-sided limits at $x=1$. Does $\\lim_{x\\to1}g(x)$ exist?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For f: 4, 4, so the limit is 4, despite f(2) = 1. For g, x^2 - x = x(x - 1), so g is x for x > 1 and -x for x < 1. The one-sided limits are 1 (right) and -1 (left), so no limit.',
            },
            {
              slug: 'average-to-instant',
              title: 'From average to instantaneous velocity',
              prompt: `A cart has position $s(t)=t^2+3t$ metres. Simplify the average velocity over $[1,1+h]$ as an expression in $h$. Use it to find the instantaneous velocity at $t=1$, with units.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'The average velocity is 5 + h, so the instantaneous velocity is 5 m/s.',
            },
            {
              slug: 'oscillation',
              title: 'A limit that oscillates',
              prompt: `Show that $\\lim_{x\\to0}\\sin(\\pi/x)$ does not exist by finding one sequence of $x$ values approaching $0$ on which the function equals $0$, and another on which it equals $1$. Explain why this rules out every candidate value $L$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Try x = 1/n and x = 2/(4n + 1) for positive integers n.',
            },
          ],
          selfAssessment: [
            {
              question: 'If $f(3)=7$, must $\\lim_{x\\to3}f(x)=7$? If $\\lim_{x\\to3}f(x)=7$, must $f(3)=7$?',
              answerOutline: 'No to both. The value at a point and the limit at that point are independent unless $f$ is continuous there.',
            },
            {
              question: 'What does it mean for the two-sided limit to exist?',
              answerOutline: 'Both one-sided limits exist and have the same finite value.',
            },
            {
              question: 'Why can you not find instantaneous velocity by setting $h=0$ in the average velocity fraction?',
              answerOutline: 'The fraction becomes $0/0$, which is undefined. You simplify for $h\\ne0$ and then see what the expression approaches.',
            },
          ],
        },
        {
          slug: 'computing-limits',
          title: 'Limit laws and computing limits',
          summary:
            'The limit laws, direct substitution, algebra for the form 0/0, the squeeze theorem and the key limit of sin(x)/x.',
          estimatedMinutes: 180,
          objectives: [
            'State the limit laws and the conditions they require',
            'Evaluate limits by direct substitution where it is valid',
            'Resolve the form $0/0$ by factoring, rationalising or combining fractions',
            'Apply the squeeze theorem',
            'Use $\\lim_{\\theta\\to0}\\sin\\theta/\\theta=1$',
          ],
          concepts: [
            'Limit laws',
            'Direct substitution',
            'Indeterminate form $0/0$',
            'Rationalising with a conjugate',
            'Squeeze theorem',
            'Fundamental trigonometric limit',
          ],
          explanation: `**Limit laws.** If $\\lim_{x\\to a}f=L$ and $\\lim_{x\\to a}g=M$ both exist, then the limit of $f\\pm g$ is $L\\pm M$, of $fg$ is $LM$, of $cf$ is $cL$, and of $f/g$ is $L/M$ **provided** $M\\ne0$. These laws give **direct substitution**: if $f$ is a polynomial, or a rational function with $a$ in its domain, then $\\lim_{x\\to a}f(x)=f(a)$.

If substitution gives $0/0$, you have learned nothing yet. The form is called **indeterminate**. Two functions that agree except at $x=a$ have the same limit at $a$, so you may cancel a common factor and try again.

**Worked example 1.** Find $\\lim_{x\\to4}\\dfrac{\\sqrt{x}-2}{x-4}$. Substitution gives $0/0$. Multiply by the conjugate:

$$
\\frac{\\sqrt{x}-2}{x-4}\\cdot\\frac{\\sqrt{x}+2}{\\sqrt{x}+2}=\\frac{x-4}{(x-4)(\\sqrt{x}+2)}=\\frac{1}{\\sqrt{x}+2}\\to\\frac14.
$$

**Squeeze theorem.** If $g(x)\\le f(x)\\le h(x)$ for all $x$ near $a$ (except possibly at $a$), and $\\lim_{x\\to a} g=\\lim_{x\\to a} h=L$, then $\\lim_{x\\to a}f=L$.

**Worked example 2.** For $x\\ne0$, $-1\\le\\cos(1/x)\\le1$, so $-x^2\\le x^2\\cos(1/x)\\le x^2$. Both outer functions tend to $0$, hence $\\lim_{x\\to0}x^2\\cos(1/x)=0$. You could not use the product law here, because $\\lim_{x\\to0}\\cos(1/x)$ does not exist.

\`\`\`interactive
epsilon-delta
{"title": "Squeezed to zero", "modes": ["zoom"], "f": "x^2*cos(1/x)", "a": 0, "L": 0, "view": [-0.5, 0.5, -0.3, 0.3], "caption": "Zoom in on x² cos(1/x) near 0. It oscillates infinitely often, but always between −x² and x², so the wiggles shrink faster than the window and the table of f(±h) goes to 0. Compare sin(1/x) in the previous lesson, whose wiggles never shrink."}
\`\`\`

**The key trigonometric limit.** Take $0<\\theta<\\pi/2$ on the unit circle. Comparing the areas of an inner triangle, a sector and an outer triangle gives

$$
\\tfrac12\\sin\\theta<\\tfrac12\\theta<\\tfrac12\\tan\\theta.
$$

Dividing by $\\tfrac12\\sin\\theta$ and inverting gives $\\cos\\theta<\\dfrac{\\sin\\theta}{\\theta}<1$, and $\\sin\\theta/\\theta$ is even, so the same bounds hold for small negative $\\theta$. By the squeeze theorem,

$$
\\lim_{\\theta\\to0}\\frac{\\sin\\theta}{\\theta}=1\\quad(\\theta\\text{ in radians}).
$$

**Worked example 3.** Rearranging so that the angle in the sine matches the denominator,

$$
\\lim_{x\\to0}\\frac{\\sin5x}{3x}=\\frac53\\lim_{x\\to0}\\frac{\\sin5x}{5x}=\\frac53.
$$

A frequent error is to apply the quotient law when $M=0$. If the denominator tends to $0$ and the numerator does not, the limit is not a finite number. See the next lesson for what happens then.`,
          resources: [
            openstax('2-3-the-limit-laws', 'The limit laws', 'Laws, cancelling, the squeeze theorem and trigonometric limits.', true),
            paul('ComputingLimits', 'Computing limits', 'Many worked 0/0 examples.'),
            paul('LimitsProperties', 'Limit properties', 'The laws stated one by one.'),
          ],
          exercises: [
            {
              slug: 'algebraic-limits',
              title: 'Resolve 0/0',
              prompt: `Evaluate each limit, first confirming that direct substitution gives $0/0$: (a) $\\lim_{x\\to2}\\dfrac{x^2-5x+6}{x^2-4}$, (b) $\\lim_{x\\to3}\\dfrac{\\frac1x-\\frac13}{x-3}$, (c) $\\lim_{x\\to4}\\dfrac{\\sqrt{x+5}-3}{x-4}$, (d) $\\lim_{h\\to0}\\dfrac{(2+h)^3-8}{h}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) -1/4; (b) -1/9; (c) 1/6; (d) 12.',
            },
            {
              slug: 'trig-limits',
              title: 'Trigonometric limits',
              prompt: `Evaluate each limit using the key trigonometric limit or the squeeze theorem: (a) $\\lim_{x\\to0}\\dfrac{\\sin4x}{\\sin7x}$, (b) $\\lim_{x\\to0}\\dfrac{\\tan x}{x}$, (c) $\\lim_{x\\to0}\\dfrac{1-\\cos x}{x^2}$, (d) $\\lim_{x\\to0}x\\sin(1/x)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (c) multiply top and bottom by 1 + cos x. For (d) use the squeeze theorem. Answers: (a) 4/7; (b) 1; (c) 1/2; (d) 0.',
            },
            {
              slug: 'limit-proofs',
              title: 'Proofs and counterexamples',
              prompt: `(a) Prove that $\\lim_{\\theta\\to0}\\dfrac{1-\\cos\\theta}{\\theta}=0$ from $\\lim_{\\theta\\to0}\\sin\\theta/\\theta=1$. (b) Give functions $f,g$ such that $\\lim_{x\\to0}f(x)g(x)$ exists while neither $\\lim_{x\\to0}f$ nor $\\lim_{x\\to0}g$ does. Explain why this does not contradict the product law.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a) multiply by (1 + cos t)/(1 + cos t). For (b) try f = g = |x|/x.',
            },
          ],
          selfAssessment: [
            {
              question: 'When is direct substitution valid?',
              answerOutline: 'When $f$ is continuous at $a$, for example a polynomial, or a rational function with non-zero denominator at $a$.',
            },
            {
              question: 'Why may you cancel $(x-2)$ in $\\frac{(x-2)(x+3)}{x-2}$ when taking a limit at $2$?',
              answerOutline: 'The limit only involves $x\\ne2$, where the two expressions are equal, so they have the same limit.',
            },
            {
              question: 'What does the squeeze theorem need?',
              answerOutline: 'Bounds $g\\le f\\le h$ near $a$ and the same limit $L$ for both $g$ and $h$ at $a$.',
            },
          ],
        },
        {
          slug: 'infinite-limits-and-asymptotes',
          title: 'Infinite limits and limits at infinity',
          summary:
            'Vertical and horizontal asymptotes, end behaviour of rational and root functions, and the traps in working with infinity.',
          estimatedMinutes: 150,
          objectives: [
            'Determine infinite one-sided limits from signs',
            'Find limits at infinity of rational functions by dividing by the highest power',
            'Handle $\\sqrt{x^2}$ correctly as $x\\to-\\infty$',
            'Resolve the form $\\infty-\\infty$ with a conjugate',
            'List all asymptotes and holes of a rational function',
          ],
          concepts: [
            'Infinite limit',
            'Vertical asymptote',
            'Limit at infinity',
            'Horizontal asymptote',
            'Removable hole',
            'Indeterminate form $\\infty-\\infty$',
          ],
          explanation: `$\\infty$ is not a number. Writing $\\lim_{x\\to a}f(x)=\\infty$ is shorthand for saying that $f(x)$ grows without bound as $x$ approaches $a$. The limit does not exist as a real number, but the notation records how it fails. The line $x=a$ is then a **vertical asymptote**.

To decide the sign, look at a fraction whose denominator tends to $0$ while the numerator does not, and track the signs from each side. For $\\dfrac{x+1}{x-2}$ near $x=2$, the numerator is near $3$. As $x\\to2^+$ the denominator is a small positive number, so the fraction tends to $+\\infty$. As $x\\to2^-$ it tends to $-\\infty$.

A limit **at** infinity asks about end behaviour. If $\\lim_{x\\to\\infty}f(x)=L$, then $y=L$ is a **horizontal asymptote**. The basic facts are $\\lim_{x\\to\\pm\\infty}1/x^r=0$ for $r>0$ (where the power is defined), $\\lim_{x\\to\\infty}e^{-x}=0$ and $\\lim_{x\\to\\infty}\\arctan x=\\pi/2$. For a rational function, divide top and bottom by the highest power of $x$ in the denominator.

**Worked example.** Find all the limits of interest for $f(x)=\\dfrac{\\sqrt{4x^2+1}}{x-3}$.

As $x\\to\\infty$, $x>0$, so $\\sqrt{x^2}=x$ and

$$
f(x)=\\frac{x\\sqrt{4+1/x^2}}{x(1-3/x)}\\to\\frac{\\sqrt4}{1}=2.
$$

As $x\\to-\\infty$, however, $x<0$, so $\\sqrt{x^2}=|x|=-x$, and

$$
f(x)=\\frac{-x\\sqrt{4+1/x^2}}{x(1-3/x)}\\to-2.
$$

There are two different horizontal asymptotes, $y=2$ and $y=-2$. Near $x=3$ the numerator is close to $\\sqrt{37}>0$, so $f\\to+\\infty$ from the right and $-\\infty$ from the left, giving a vertical asymptote.

\`\`\`interactive
function-explorer
{"title": "Two horizontal asymptotes", "f": ["sqrt(k*x^2 + 1)/(x - 3)", "sqrt(k)", "-sqrt(k)"], "sliders": {"k": [4, 0.25, 9, 0.25]}, "view": [-30, 30, -8, 8], "caption": "The first curve is y = √(kx² + 1)/(x − 3); the two horizontal lines are y = √k and y = −√k. With k = 4 this is the worked example: the graph approaches y = 2 far to the right, y = −2 far to the left, and goes to +∞ just right of x = 3 and −∞ just left. Change k and the asymptotes move to ±√k but always have opposite signs, because √(x²) = |x|."}
\`\`\`

**The form $\\infty-\\infty$** is indeterminate, as $0/0$ is. For $\\lim_{x\\to\\infty}(\\sqrt{x^2+x}-x)$, the terms grow at nearly the same rate. Multiply by the conjugate:

$$
\\sqrt{x^2+x}-x=\\frac{x}{\\sqrt{x^2+x}+x}=\\frac{1}{\\sqrt{1+1/x}+1}\\to\\frac12.
$$

So the answer is $\\tfrac12$, not $0$.

**Holes versus asymptotes.** If a factor cancels completely, as $(x-1)$ does in $\\dfrac{(x-1)(x+1)}{(x-1)(x-2)}$, the point $x=1$ is a removable hole, not an asymptote. Always factor first.`,
          resources: [
            openstax('4-6-limits-at-infinity-and-asymptotes', 'Limits at infinity and asymptotes', 'End behaviour, including functions with different limits at each end.', true),
            paul('InfiniteLimits', 'Infinite limits', 'Sign analysis near a vertical asymptote.'),
            paul('LimitsAtInfinityI', 'Limits at infinity, part I', 'Rational and root functions, including the negative infinity trap.'),
          ],
          exercises: [
            {
              slug: 'limits-at-infinity',
              title: 'End behaviour',
              prompt: `Evaluate each limit, or say that it is infinite, by dividing through or using a conjugate: (a) $\\lim_{x\\to\\infty}\\dfrac{3x^2-x}{2x^2+5}$, (b) $\\lim_{x\\to-\\infty}\\dfrac{x+1}{x^2+1}$, (c) $\\lim_{x\\to\\infty}\\dfrac{x^3}{x^2+1}$, (d) $\\lim_{x\\to-\\infty}\\dfrac{\\sqrt{9x^2+x}}{x}$, (e) $\\lim_{x\\to\\infty}(\\sqrt{x^2+6x}-x)$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 3/2; (b) 0; (c) infinity; (d) -3, because sqrt(x^2) = -x for x < 0; (e) 3.',
            },
            {
              slug: 'all-asymptotes',
              title: 'Holes and asymptotes',
              prompt: `For $f(x)=\\dfrac{x^2-1}{x^2-3x+2}$: factor, find any hole (with the limit there), find every vertical and horizontal asymptote, and give both one-sided limits at each vertical asymptote.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'f reduces to (x + 1)/(x - 2). Hole at x = 1 with limit -2. Vertical asymptote x = 2, with limit +inf from the right and -inf from the left. Horizontal asymptote y = 1.',
            },
            {
              slug: 'terminal-velocity',
              title: 'A physical limit',
              prompt: `With air resistance proportional to velocity, a falling object can have speed $v(t)=v_T(1-e^{-t/\\tau})$, where $v_T,\\tau>0$ are constants. Find $\\lim_{t\\to\\infty}v(t)$ and say what it means physically. Taking $v_T=50$ m/s and $\\tau=5$ s, find the time at which the speed reaches $99\\%$ of the limit.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The limit is v_T, the terminal velocity. Solve e^(-t/5) = 0.01 to get t = 5 ln 100, about 23.0 s.',
            },
          ],
          selfAssessment: [
            {
              question: 'Does a rational function always have a vertical asymptote where its denominator is zero?',
              answerOutline: 'No. If the factor cancels with the numerator, there is a hole instead. Factor first.',
            },
            {
              question: 'Why does $\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{x}$ equal $-1$?',
              answerOutline: 'For $x<0$, $\\sqrt{x^2}=-x$, so the expression is $-\\sqrt{1+1/x^2}$, which tends to $-1$.',
            },
            {
              question: 'Why is $\\infty-\\infty$ not $0$?',
              answerOutline: 'It depends on how fast each part grows. For example $(x+5)-x\\to5$ and $x^2-x\\to\\infty$. Both have the form $\\infty-\\infty$.',
            },
          ],
        },
        {
          slug: 'continuity-and-ivt',
          title: 'Continuity and the intermediate value theorem',
          summary:
            'The three-part definition of continuity, kinds of discontinuity, and the theorem that guarantees roots.',
          estimatedMinutes: 170,
          objectives: [
            'State the definition of continuity at a point',
            'Classify discontinuities as removable, jump or infinite',
            'Choose constants that make a piecewise function continuous',
            'State the intermediate value theorem with its hypotheses and use it to locate a root',
            'Trap a root by bisection',
          ],
          concepts: [
            'Continuity at a point',
            'Removable, jump and infinite discontinuities',
            'Continuity on an interval',
            'Continuity of compositions',
            'Intermediate value theorem',
            'Bisection',
          ],
          explanation: `A function $f$ is **continuous at $a$** if $\\lim_{x\\to a}f(x)=f(a)$. This packs in three requirements: $f(a)$ is defined, the limit exists, and the two are equal. Each can fail, which gives the standard types: a **removable** discontinuity (the limit exists but $f(a)$ differs or is missing), a **jump** (one-sided limits differ), and an **infinite** discontinuity.

Polynomials, rational functions, roots, sines, cosines, exponentials and logarithms are all continuous on their domains. Sums, products, quotients (where the denominator is non-zero) and compositions of continuous functions are continuous too. So $\\lim_{x\\to a}f(x)=f(a)$ is justified for almost every formula you meet, and only special points need a closer look.

**Worked example 1.** Find $c$ so that $f(x)=cx+1$ for $x\\le3$, and $f(x)=cx^2-1$ for $x>3$, is continuous. Both pieces are continuous away from $x=3$, so only that point matters. The left limit and value are $3c+1$, and the right limit is $9c-1$. Setting $3c+1=9c-1$ gives $c=\\tfrac13$.

**Intermediate value theorem (IVT).** If $f$ is continuous on the closed interval $[a,b]$ and $N$ is any number strictly between $f(a)$ and $f(b)$, then there is at least one $c$ in $(a,b)$ with $f(c)=N$.

Informally, you cannot get from one height to another without passing through the heights between. The theorem says a solution exists. It does not say how many there are or give a formula. Continuity is essential: $1/x$ is negative at $-1$ and positive at $1$, yet never zero, and the IVT does not apply because of the break at $0$.

**Worked example 2.** Show that $x^3+x-1=0$ has a root in $[0,1]$ and locate it. Let $f(x)=x^3+x-1$, a polynomial and so continuous. Since $f(0)=-1<0<1=f(1)$, the IVT gives a root in $(0,1)$. **Bisection** halves the interval and keeps the half where the sign changes:

| $x$ | $0.5$ | $0.75$ | $0.625$ | $0.6875$ |
|---|---|---|---|---|
| $f(x)$ | $-0.375$ | $0.172$ | $-0.131$ | $0.0125$ |

The root lies in $(0.625,0.6875)$. Each step halves the uncertainty, so accuracy is guaranteed, if slowly. In Module 5 Newton's method does this much faster.`,
          resources: [
            openstax('2-4-continuity', 'Continuity', 'Definition, types of discontinuity and the IVT.', true),
            paul('Continuity', 'Continuity', 'Short examples, including applying the IVT.'),
            mit1801('Use the recitation videos on continuity if you want another voice on the definitions.'),
          ],
          exercises: [
            {
              slug: 'classify-discontinuities',
              title: 'Classify discontinuities',
              prompt: `Find and classify each discontinuity: (a) $\\dfrac{x^2-x-2}{x-2}$, (b) $\\dfrac{1}{(x+1)^2}$, (c) $\\lfloor x\\rfloor$, the greatest integer function, (d) $f(x)=\\dfrac{\\sin x}{x}$ for $x\\ne0$ with $f(0)=2$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) removable at 2, where the limit is 3; (b) infinite at -1; (c) jump at every integer; (d) removable at 0, where the limit is 1.',
            },
            {
              slug: 'match-pieces',
              title: 'Choose constants',
              prompt: `Find $a$ and $b$ so that $f$ is continuous everywhere: $f(x)=2x$ for $x<1$, $f(x)=ax+b$ for $1\\le x<2$, and $f(x)=x^2+1$ for $x\\ge2$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Matching at 1 gives a + b = 2. Matching at 2 gives 2a + b = 5. So a = 3 and b = -1.',
            },
            {
              slug: 'ivt-applications',
              title: 'Use the IVT',
              prompt: `(a) Prove that $\\cos x=x$ has a solution in $[0,\\pi/2]$, and trap it in an interval of width at most $0.1$ by bisection. (b) Show that $x^5-3x+1=0$ has at least three real roots. (c) A hiker walks up a mountain from 6 am to 6 pm one day, and down the same path from 6 am to 6 pm the next. Prove that there is a time of day at which the hiker was at the same spot on both days.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a) use f(x) = cos x - x; the root is near 0.739. For (b) evaluate at -2, 0, 1 and 2. For (c) consider the difference between the two height functions.',
            },
          ],
          selfAssessment: [
            {
              question: 'What three things does continuity at $a$ require?',
              answerOutline: '$f(a)$ is defined, $\\lim_{x\\to a}f(x)$ exists, and they are equal.',
            },
            {
              question: 'The IVT guarantees a root. Does it say how many?',
              answerOutline: 'No. It gives at least one. There may be more. A sign change is sufficient for continuous $f$, and not necessary: $x^2$ has a root with no sign change.',
            },
            {
              question: 'After 10 bisection steps from an interval of width 1, how wide is the bracket?',
              answerOutline: '$2^{-10}\\approx0.001$.',
            },
          ],
        },
        {
          slug: 'epsilon-delta',
          title: 'The precise definition of a limit',
          summary:
            'The epsilon-delta definition, what it says in words and pictures, and how to write proofs with it.',
          estimatedMinutes: 170,
          objectives: [
            'State the epsilon-delta definition and read it as a challenge and response',
            'Find a working $\\delta$ for a given $\\varepsilon$',
            'Write complete proofs for linear limits',
            'Prove a quadratic limit by first restricting $\\delta$',
            'Prove that a limit does not exist by negating the definition',
          ],
          concepts: [
            'Epsilon and delta',
            'Quantifiers: for every, there exists',
            'Scratch work versus proof',
            'Bounding a factor',
            'Taking a minimum of two restrictions',
            'Negation of the definition',
          ],
          explanation: `"As close as we like" and "sufficiently close" need precise meanings before limits can carry proofs. Here is the definition, from Cauchy and Weierstrass.

**Definition.** $\\lim_{x\\to a}f(x)=L$ means: for every $\\varepsilon>0$ there exists $\\delta>0$ such that

$$
0<|x-a|<\\delta\\ \\Longrightarrow\\ |f(x)-L|<\\varepsilon.
$$

Read it as a game. Your opponent names a tolerance $\\varepsilon$ around $L$, as small as they like. You must answer with a window $\\delta$ around $a$ in which every $x$ other than $a$ itself lands $f(x)$ within the tolerance. The limit is $L$ if you can always answer. The answer $\\delta$ may depend on $\\varepsilon$. The condition $0<|x-a|$ is the "but not equal to $a$" of the informal definition.

Proofs have two stages. First, in scratch work, start from $|f(x)-L|$ and try to expose a factor of $|x-a|$. Second, write the proof forwards.

**Worked example 1.** Prove $\\lim_{x\\to2}(3x+1)=7$. Scratch: $|(3x+1)-7|=3|x-2|$, so $\\delta=\\varepsilon/3$ should work.

*Proof.* Let $\\varepsilon>0$ and set $\\delta=\\varepsilon/3$. If $0<|x-2|<\\delta$, then $|(3x+1)-7|=3|x-2|<3\\delta=\\varepsilon$. $\\blacksquare$

**Worked example 2.** Prove $\\lim_{x\\to2}x^2=4$. Scratch: $|x^2-4|=|x-2|\\,|x+2|$. The factor $|x+2|$ varies with $x$, so bound it by first agreeing to keep $\\delta\\le1$. Then $|x-2|<1$ gives $1<x<3$, so $|x+2|<5$. We then need $5|x-2|<\\varepsilon$.

*Proof.* Let $\\varepsilon>0$ and set $\\delta=\\min(1,\\varepsilon/5)$. If $0<|x-2|<\\delta$, then $|x-2|<1$, so $|x+2|<5$, and also $|x-2|<\\varepsilon/5$. Therefore

$$
|x^2-4|=|x-2|\\,|x+2|<\\frac{\\varepsilon}{5}\\cdot5=\\varepsilon.\\ \\blacksquare
$$

The minimum is what makes both restrictions hold at once.

**Showing a limit fails.** To show that $L$ is not the limit, you must find one $\\varepsilon>0$ such that no $\\delta$ works: for every $\\delta>0$ there is an $x$ with $0<|x-a|<\\delta$ and $|f(x)-L|\\ge\\varepsilon$.

Play the game yourself below. Choose $\\varepsilon$, then find a $\\delta$ that works.

\`\`\`interactive
epsilon-delta
{"title": "The ε–δ game", "examples": [{"label": "3x + 1", "f": "3x + 1", "a": 2, "L": 7, "epsilon": 0.6, "delta": 0.5, "view": [-1, 5, 1, 13]}, {"label": "x²", "f": "x^2", "a": 2, "L": 4, "epsilon": 0.5, "delta": 0.3, "view": [-1, 5, -2, 10]}, {"label": "x/|x|", "f": "x/abs(x)", "a": 0, "L": 0, "epsilon": 0.5, "delta": 0.5, "editL": true, "view": [-2, 2, -2, 2]}], "caption": "The horizontal band is L ± ε and the vertical strip a ± δ. The graph inside the strip (x = a itself excluded) turns green where it stays in the band and red where it escapes. For 3x + 1 the largest δ that works is exactly ε/3, the δ of worked example 1. For x² compare it with the proof's min(1, ε/5): the proof's δ is smaller, which is safe. On the x/|x| tab, move L anywhere you like: once ε ≤ 1 no δ works, which is the last exercise. In Game mode your opponent names ε."}
\`\`\`

This style of argument returns in full force in real analysis. Here, the goal is to see that a limit is a claim that can be proved, not just a number read from a table.`,
          resources: [
            openstax('2-5-the-precise-definition-of-a-limit', 'The precise definition of a limit', 'Definition and proofs, with one-sided versions.', true),
            paul('DefnOfLimit', 'The definition of the limit', 'Several proofs written out with the scratch work visible.'),
            paul('LimitProofs', 'Proofs of limit properties', 'For later reading: how the limit laws themselves are proved.'),
          ],
          exercises: [
            {
              slug: 'find-delta',
              title: 'Find a delta',
              prompt: `(a) For $\\lim_{x\\to2}(3x+1)=7$ and $\\varepsilon=0.01$, give a value of $\\delta$ that works. (b) For $\\lim_{x\\to2}x^2=4$, is $\\delta=0.01$ enough when $\\varepsilon=0.05$? Use the bound in the lesson to decide, and check with $x=2.01$ and $x=1.99$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Any delta at most 0.01/3, such as 0.003. (b) Yes: min(1, 0.05/5) = 0.01. At x = 2.01 the error is 0.0401, and at x = 1.99 it is 0.0399.',
            },
            {
              slug: 'linear-proof',
              title: 'A linear proof',
              prompt: `Write a complete epsilon-delta proof that $\\lim_{x\\to1}(5-2x)=3$, showing your scratch work first and then the forward proof.`,
              kind: 'derivation',
              difficulty: 1,
              hint: '|(5 - 2x) - 3| = 2|x - 1|, so take delta = epsilon/2.',
            },
            {
              slug: 'nonlinear-proofs',
              title: 'Nonlinear proofs',
              prompt: `Write complete epsilon-delta proofs of these two limits, with scratch work and then the forward proof: (a) $\\lim_{x\\to3}x^2=9$, (b) $\\lim_{x\\to4}\\sqrt{x}=2$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: '(a) With delta <= 1, |x + 3| < 7, so delta = min(1, epsilon/7). (b) Use |sqrt x - 2| = |x - 4|/(sqrt x + 2) <= |x - 4|/2, and take delta = min(4, 2 epsilon) so that x > 0.',
            },
            {
              slug: 'no-limit-proof',
              title: 'Prove that a limit does not exist',
              prompt: `Let $f(x)=x/|x|$ for $x\\ne0$. Prove from the definition that $\\lim_{x\\to0}f(x)$ does not exist, for any candidate $L$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Take epsilon = 1/2. Any interval around 0 contains points where f = 1 and points where f = -1. Those values are 2 apart, so they cannot both lie within 1/2 of L.',
            },
          ],
          selfAssessment: [
            {
              question: 'In the definition, which is chosen first, $\\varepsilon$ or $\\delta$, and why does that matter?',
              answerOutline: '$\\varepsilon$ comes first and is arbitrary. $\\delta$ is chosen in response and may depend on it. Reversing the order would state a much stronger property.',
            },
            {
              question: 'Why does the definition have $0<|x-a|$ instead of just $|x-a|<\\delta$?',
              answerOutline: 'The limit must ignore the value at $a$. Without this condition, a removable discontinuity would break the limit.',
            },
            {
              question: 'Why take $\\delta=\\min(1,\\varepsilon/5)$ rather than just $\\varepsilon/5$?',
              answerOutline: 'The bound $|x+2|<5$ was derived assuming $|x-2|<1$. The minimum makes both conditions hold for large $\\varepsilon$ too.',
            },
          ],
        },
      ],
    },
    {
      slug: 'the-derivative',
      title: 'The Derivative',
      description:
        'Rates of change made exact. You define the derivative from the limit, learn what it means, and build the rules that let you differentiate any elementary formula by hand.',
      lessons: [
        {
          slug: 'rates-of-change',
          title: 'Tangent lines and rates of change',
          summary:
            'The derivative at a point as the limit of secant slopes, its meaning as a rate, and how to read its units.',
          estimatedMinutes: 160,
          objectives: [
            'Define $f\'(a)$ as a limit and compute it from the definition',
            'Write the equation of a tangent line',
            'Interpret a derivative as velocity or another rate, with correct units',
            'Solve vertical-motion problems from a position function',
          ],
          concepts: [
            'Difference quotient',
            'Derivative at a point',
            'Tangent line',
            'Instantaneous rate of change',
            'Units of a derivative',
            'Velocity and speed',
          ],
          explanation: `The **derivative of $f$ at $a$** is

$$
f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h},
$$

if this limit exists. The fraction is the slope of the secant line through $(a,f(a))$ and $(a+h,f(a+h))$. Its limit is the slope of the **tangent line**, which is the line that best matches the curve near $a$:

$$
y=f(a)+f'(a)(x-a).
$$

The same number is the **instantaneous rate of change** of $f$ at $a$. If $s(t)$ is position, $s'(t)$ is velocity. If $V(t)$ is volume in a tank, $V'(t)$ is the rate of flow. The units of $f'$ are always the units of the output divided by the units of the input. If temperature $T$ is in $^\\circ$C and $t$ in minutes, then $T'(10)=-2$ means that at $t=10$ the temperature is falling at $2\\ ^\\circ$C per minute.

**Worked example 1.** Find the tangent line to $f(x)=x^2-3x$ at $x=2$. From the definition,

$$
f(2+h)-f(2)=(4+4h+h^2-6-3h)-(-2)=h+h^2,
$$

so the difference quotient is $1+h$ and $f'(2)=1$. Since $f(2)=-2$, the tangent line is $y=-2+1\\cdot(x-2)$, that is, $y=x-4$.

\`\`\`interactive
secant-tangent
{"title": "From secant to tangent", "f": "x^2 - 3x", "name": "x^2-3x", "a": 2, "h": 1, "view": [-1.5, 4.5, -3.5, 4], "caption": "P is the point (2, −2) on f(x) = x² − 3x and Q is (2 + h, f(2 + h)). The secant slope is the worked example's difference quotient 1 + h. Drag Q towards P, or press Shrink h: the secant swings onto the dashed tangent y = x − 4 and its slope tends to f′(2) = 1. The table shows the quotients for h = ±1, ±0.1, ±0.01, … from both sides. At h = 0 the quotient is 0/0, which is why a limit is needed."}
\`\`\`

**Worked example 2.** A stone is thrown straight up from the ground, with height $s(t)=20t-4.9t^2$ metres. Using the definition at a general time $t$,

$$
\\frac{s(t+h)-s(t)}{h}=\\frac{20h-9.8th-4.9h^2}{h}=20-9.8t-4.9h\\to20-9.8t,
$$

so $v(t)=20-9.8t$ m/s. At $t=1$ the velocity is $10.2$ m/s, upwards. The top of the flight is where the velocity changes sign, $v=0$, at $t=20/9.8\\approx2.04$ s. The stone lands when $s=0$ for $t>0$, at $t=20/4.9\\approx4.08$ s, with velocity $-20$ m/s. The negative sign means downward, and the **speed**, which is the absolute value of velocity, is $20$ m/s, the same as at launch.

The sign of the derivative shows the direction of change, and its size the steepness. Do not confuse the value of a function with its rate: a stone at the top of its flight is at its greatest height while its velocity is zero.`,
          resources: [
            openstax('3-1-defining-the-derivative', 'Defining the derivative', 'Tangent lines and the limit definition.', true),
            openstax('3-4-derivatives-as-rates-of-change', 'Derivatives as rates of change', 'Motion and other rates.'),
            paul('Tangents_Rates', 'Tangent lines and rates of change', 'The same two problems side by side.'),
            essence('Episode on the paradox of the derivative: why an instantaneous rate needs a limit.'),
          ],
          exercises: [
            {
              slug: 'tangents-from-definition',
              title: 'Tangent lines from the definition',
              prompt: `Use the limit definition to find $f'(a)$ and the tangent line: (a) $f(x)=1/x$ at $a=2$, (b) $f(x)=\\sqrt{x}$ at $a=9$, (c) $f(x)=x^3$ at $a=-1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) -1/4, y = -x/4 + 1; (b) 1/6, y = x/6 + 3/2; (c) 3, y = 3x + 2.',
            },
            {
              slug: 'read-units',
              title: 'Read the units',
              prompt: `State the units and the meaning of each derivative in a sentence. (a) $P(t)$ is the population of a town in thousands, $t$ in years, and $P'(5)=1.2$. (b) $C(q)$ is the cost in dollars of making $q$ kilograms of a product, and $C'(100)=4$. (c) $\\rho(x)$ is the density of the air in $\\text{kg/m}^3$ at altitude $x$ in metres, and $\\rho'(1000)=-0.0001$.`,
              kind: 'writing',
              difficulty: 1,
              hint: 'Each answer should have units of output per input and mention the point at which the rate holds, for example thousands of people per year at t = 5.',
            },
            {
              slug: 'throw-from-roof',
              title: 'A stone from a roof',
              prompt: `A stone is thrown upward from a $25$ m roof, with height $s(t)=25+10t-4.9t^2$ metres. From the definition of the derivative, find $v(t)$. Find the maximum height, the time it hits the ground, and its speed on impact. Give three significant figures.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'v(t) = 10 - 9.8t. The top is at t = 1.02 s, with height about 30.1 m. Impact at about 3.50 s, at speed about 24.3 m/s.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the geometric meaning of the difference quotient, and of its limit?',
              answerOutline: 'The quotient is the slope of a secant line. The limit is the slope of the tangent line.',
            },
            {
              question: 'If $f(3)=5$ and $f\'(3)=-2$, write the tangent line at $3$.',
              answerOutline: '$y=5-2(x-3)$.',
            },
            {
              question: 'What is the difference between velocity and speed?',
              answerOutline: 'Velocity has a sign that gives direction. Speed is its absolute value.',
            },
          ],
        },
        {
          slug: 'derivative-as-a-function',
          title: 'The derivative as a function',
          summary:
            'Moving from a slope at one point to the function of all slopes, what differentiability requires, and higher derivatives.',
          estimatedMinutes: 170,
          objectives: [
            'Compute $f\'(x)$ as a function from the limit definition',
            'Use prime and Leibniz notation',
            'Sketch the graph of $f\'$ from the graph of $f$',
            'Identify corners, cusps, vertical tangents and discontinuities as failures of differentiability',
            'Prove that differentiable functions are continuous',
            'Interpret the second derivative as acceleration',
          ],
          concepts: [
            'Derivative function',
            "Leibniz notation $dy/dx$",
            'Differentiability',
            'Corners, cusps, vertical tangents',
            'Differentiable implies continuous',
            'Higher derivatives',
          ],
          explanation: `Letting the point vary turns the derivative into a new function:

$$
f'(x)=\\lim_{h\\to0}\\frac{f(x+h)-f(x)}{h}.
$$

Its domain is the set of $x$ where this limit exists. Other notations are $y'$, $\\dfrac{dy}{dx}$, $\\dfrac{d}{dx}f(x)$ and, for time derivatives, $\\dot{s}$. In the Leibniz form, read $\\dfrac{d}{dx}$ as an instruction, and $\\dfrac{dy}{dx}$ as the limit of $\\Delta y/\\Delta x$. It is not literally a fraction yet, although it often behaves like one.

**Worked example.** Differentiate $f(x)=\\sqrt{x}$. Use the conjugate:

$$
\\frac{\\sqrt{x+h}-\\sqrt{x}}{h}=\\frac{(x+h)-x}{h(\\sqrt{x+h}+\\sqrt{x})}=\\frac{1}{\\sqrt{x+h}+\\sqrt{x}}\\to\\frac{1}{2\\sqrt{x}}.
$$

This works for $x>0$. At $x=0$ the one-sided quotient is $\\sqrt{h}/h=1/\\sqrt{h}\\to\\infty$, so the graph has a vertical tangent there. So $f$ is defined on $[0,\\infty)$ while $f'$ is defined only on $(0,\\infty)$. A derivative can have a smaller domain than the function.

**Where differentiability fails.** $f$ is differentiable at $a$ if $f'(a)$ exists. Picture zooming in: at a differentiable point, the graph looks more and more like a straight line. The standard failures are:

- a **corner**, such as $|x|$ at $0$, where the one-sided slopes are $-1$ and $1$;
- a **cusp**, such as $x^{2/3}$ at $0$, where the slopes blow up with opposite signs;
- a **vertical tangent**, such as $x^{1/3}$ at $0$;
- a **discontinuity**.

**Theorem.** If $f$ is differentiable at $a$, then $f$ is continuous at $a$. *Proof.* For $x\\ne a$ write

$$
f(x)-f(a)=\\frac{f(x)-f(a)}{x-a}\\cdot(x-a).
$$

As $x\\to a$, the first factor tends to $f'(a)$ and the second to $0$, so $f(x)\\to f(a)$. $\\blacksquare$ The converse is false, and $|x|$ shows it.

**Higher derivatives.** The derivative of $f'$ is $f''$, also written $\\dfrac{d^2y}{dx^2}$. If $s$ is position, then $s'$ is velocity and $s''$ is acceleration, which is why Newton's law $F=ma$ makes force a statement about a second derivative.

To sketch $f'$ from a graph of $f$, mark where $f$ has horizontal tangents (zeros of $f'$), where it rises ($f'>0$) and where it falls ($f'<0$), and join these up, judging steepness by eye. The Calculus Grapher simulation is good practice for this, and so is the interactive below.

\`\`\`interactive
secant-tangent
{"title": "Tracing the derivative", "modes": ["trace"], "examples": [{"label": "x³ − 3x", "f": "x^3 - 3x", "name": "x^3-3x", "a": -2.5, "view": [-2.5, 2.5, -4, 4], "fpView": [-4, 16]}, {"label": "√x", "f": "sqrt(x)", "name": "\\\\sqrt{x}", "a": -0.5, "view": [-0.5, 4.5, -0.5, 2.5], "fpView": [-0.5, 3.5]}, {"label": "|x|", "f": "abs(x)", "name": "|x|", "a": -2, "view": [-2, 2, -0.5, 2], "fpView": [-1.6, 1.6]}], "caption": "Press Sweep, or drag the point, and the slope of each tangent is plotted in the lower graph: the dots draw f′. Before you turn on Show f′, predict where it is zero and where it is negative. On the √x tab the slopes shoot up near 0, the vertical tangent of the worked example, and f′ = 1/(2√x) exists only for x > 0. On |x| the slopes jump from −1 to 1 at the corner, so f′(0) does not exist."}
\`\`\``,
          resources: [
            openstax('3-2-the-derivative-as-a-function', 'The derivative as a function', 'Graphs, differentiability and higher derivatives.', true),
            paul('DefnOfDerivative', 'The definition of the derivative', 'Worked limit-definition computations.'),
            grapher,
          ],
          exercises: [
            {
              slug: 'derivatives-from-definition',
              title: 'Derivatives from the definition',
              prompt: `Find $f'(x)$ from the limit definition, showing the algebra of each difference quotient: (a) $f(x)=2x^2-5x$, (b) $f(x)=\\dfrac{1}{x+1}$, (c) $f(x)=\\sqrt{2x+1}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 4x - 5; (b) -1/(x + 1)^2; (c) 1/sqrt(2x + 1).',
            },
            {
              slug: 'where-differentiable',
              title: 'Where does it fail?',
              prompt: `Decide where each function fails to be differentiable and name the failure. (a) $|x^2-4|$. (b) $f(x)=x^2$ for $x\\le1$ and $f(x)=2x-1$ for $x>1$. (c) $g(x)=x^2$ for $x\\le1$ and $g(x)=2x$ for $x>1$. (d) $(x-3)^{1/3}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) corners at x = 2 and x = -2; (b) differentiable everywhere, with both slopes 2 at x = 1; (c) discontinuous at x = 1, so not differentiable there, even though the slopes look close; (d) vertical tangent at x = 3.',
            },
            {
              slug: 'sketch-derivative',
              title: 'Sketch a derivative',
              prompt: `In the Calculus Grapher, or on paper, draw $f$ with a local maximum at $x=-1$, a local minimum at $x=2$, and a corner at $x=4$. Sketch $f'$ underneath it, on the same horizontal scale. Mark the zeros of $f'$, the intervals where $f'$ is positive and negative, and what happens to $f'$ at $x=4$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Your sketch of f prime must be zero at -1 and 2, positive left of -1, negative between -1 and 2, and must have a jump at x = 4.',
            },
            {
              slug: 'even-derivative',
              title: 'A function differentiable only once',
              prompt: `Let $f(x)=x|x|$. Using one-sided limits, show that $f'(0)$ exists and find $f'(x)$ for all $x$. Is $f'$ differentiable at $0$? Explain.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'f is x^2 for x >= 0 and -x^2 for x < 0. Then f prime(x) = 2|x|, which has a corner at 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give an example of a function continuous at a point but not differentiable there.',
              answerOutline: '$|x|$ at $0$. The one-sided slopes are $-1$ and $1$.',
            },
            {
              question: 'If $s(t)$ is position, what are $s\'$ and $s\'\'$?',
              answerOutline: 'Velocity and acceleration.',
            },
            {
              question: 'What does differentiability look like when you zoom in on a graph?',
              answerOutline: 'The graph near the point becomes indistinguishable from a straight line, which is the tangent line.',
            },
          ],
        },
        {
          slug: 'differentiation-rules',
          title: 'Power, product and quotient rules',
          summary:
            'The rules that replace the limit: where they come from, and how to use them quickly and correctly.',
          estimatedMinutes: 180,
          objectives: [
            'Prove the power rule for positive integers and use it for any real exponent',
            'Apply the sum and constant-multiple rules',
            'Prove and apply the product rule',
            'Derive and apply the quotient rule',
            'Rewrite expressions to simplify before differentiating',
          ],
          concepts: [
            'Power rule',
            'Sum and constant-multiple rules',
            'Product rule',
            'Quotient rule',
            'Negative and fractional exponents',
            'Horizontal tangents',
          ],
          explanation: `Computing every derivative from the limit would be slow. A few rules, each proved once, do the job instead.

**Power rule.** $\\dfrac{d}{dx}x^n=nx^{n-1}$. For a positive integer $n$, the binomial theorem gives $(x+h)^n=x^n+nx^{n-1}h+(\\text{terms with }h^2\\text{ or higher})$. Subtract $x^n$, divide by $h$ and let $h\\to0$: only $nx^{n-1}$ survives. The rule holds for every real exponent, which you will be able to prove later, so $\\dfrac{d}{dx}\\sqrt{x}=\\tfrac12x^{-1/2}$ and $\\dfrac{d}{dx}x^{-2}=-2x^{-3}$. Constants differentiate to $0$, and $(cf)'=cf'$, $(f+g)'=f'+g'$.

**Product rule.** $(fg)'=f'g+fg'$, and it is emphatically not $f'g'$. Think of a rectangle with sides $f$ and $g$. If the sides grow by $\\Delta f$ and $\\Delta g$, the area grows by two strips and a tiny corner: $\\Delta f\\,g+f\\,\\Delta g+\\Delta f\\,\\Delta g$. The corner vanishes in the limit. Algebraically, add and subtract $f(x+h)g(x)$ in the numerator:

$$
\\frac{f(x+h)g(x+h)-f(x)g(x)}{h}=f(x+h)\\frac{g(x+h)-g(x)}{h}+g(x)\\frac{f(x+h)-f(x)}{h}.
$$

Differentiable functions are continuous, so $f(x+h)\\to f(x)$, and the rule follows.

**Quotient rule.** Where $g\\ne0$,

$$
\\left(\\frac{f}{g}\\right)'=\\frac{f'g-fg'}{g^2}.
$$

The order in the numerator matters, because of the minus sign.

**Worked example.** (a) Differentiate $y=(3x^2+1)(x-4)$. The product rule gives

$$
y'=6x(x-4)+(3x^2+1)(1)=9x^2-24x+1.
$$

Multiplying out first, $y=3x^3-12x^2+x-4$, gives the same result. Doing a problem two ways like this is a useful habit.

(b) Differentiate $y=\\dfrac{x^2+1}{2x-3}$. The quotient rule gives

$$
y'=\\frac{2x(2x-3)-(x^2+1)(2)}{(2x-3)^2}=\\frac{2x^2-6x-2}{(2x-3)^2}.
$$

(c) Differentiate $y=\\dfrac{x^3+\\sqrt{x}}{x}$. You do not need the quotient rule. Rewrite as $y=x^2+x^{-1/2}$, so that $y'=2x-\\tfrac12x^{-3/2}$. Rewriting first saves work and errors.

Horizontal tangents occur where $y'=0$. With these rules, finding them for a polynomial comes down to solving an algebra problem. For the tangent line at a point, compute $y'$ as a function first, then substitute the $x$ value to get the slope. Substituting too early gives you the derivative of a number, which is zero.`,
          resources: [
            openstax('3-3-differentiation-rules', 'Differentiation rules', 'All the rules with proofs and examples.', true),
            paul('DiffFormulas', 'Differentiation formulas', 'Power rule practice.'),
            paul('ProductQuotientRule', 'Product and quotient rule', 'Worked examples of both rules.'),
            essence('Episode on visualising the derivative formulas through geometry.'),
          ],
          exercises: [
            {
              slug: 'rule-drill',
              title: 'Rule drill',
              prompt: `Differentiate each function, rewriting first where that makes things simpler: (a) $4x^5-3x^2+7$, (b) $\\sqrt{x}(x^2+1)$, (c) $\\dfrac{x^2-1}{x^2+1}$, (d) $\\dfrac{3}{x^2}-\\dfrac{5}{\\sqrt[3]{x}}$, (e) $(x^2+x)(x^3-1)$, (f) $\\dfrac{x}{1+\\sqrt{x}}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 20x^4 - 6x; (b) (5/2)x^(3/2) + (1/2)x^(-1/2); (c) 4x/(x^2 + 1)^2; (d) -6x^(-3) + (5/3)x^(-4/3); (e) 5x^4 + 4x^3 - 2x - 1; (f) (1 + sqrt(x)/2)/(1 + sqrt x)^2.',
            },
            {
              slug: 'tangent-problems',
              title: 'Horizontal and given-slope tangents',
              prompt: `(a) Find the points on $y=x^3-3x^2-9x+1$ with horizontal tangent lines. (b) Find the tangent line to $y=\\dfrac{x}{x+1}$ at $x=1$. (c) Find every point on $y=x^3$ where the tangent line is parallel to $y=12x+5$. (d) Find the two lines through $(0,-4)$ that are tangent to $y=x^2$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) (-1, 6), (3, -26); (b) y = x/4 + 1/4; (c) (2, 8), (-2, -8); (d) the tangent at x = a is y = 2ax - a^2, and -4 = -a^2 gives a = 2 or -2: y = 4x - 4 and y = -4x - 4.',
            },
            {
              slug: 'prove-rules',
              title: 'Prove the rules',
              prompt: `(a) Derive the quotient rule by writing $f=(f/g)\\,g$ and applying the product rule (assume that $f/g$ is differentiable). (b) Use the quotient rule to prove the power rule for negative integers $n=-m$. (c) Find a formula for $(fgh)'$ and use it on $x\\sqrt{x}\\,(x+1)$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: "(c) (fgh)' = f'gh + fg'h + fgh'. The example equals x^(5/2) + x^(3/2), which gives a quick check.",
            },
          ],
          selfAssessment: [
            {
              question: 'What is wrong with saying $(x^2\\cdot x^3)\'=2x\\cdot3x^2$?',
              answerOutline: 'The derivative of a product is not the product of derivatives. The true value is $5x^4$, not $6x^3$.',
            },
            {
              question: 'When should you avoid the quotient rule?',
              answerOutline: 'When the denominator is a constant or a monomial. Rewriting as powers is simpler.',
            },
            {
              question: 'Explain the rectangle picture for the product rule.',
              answerOutline: 'Area $fg$ grows by strips $g\\,\\Delta f$ and $f\\,\\Delta g$. The corner $\\Delta f\\,\\Delta g$ is second order and vanishes in the limit.',
            },
          ],
        },
        {
          slug: 'trigonometric-derivatives',
          title: 'Derivatives of trigonometric functions',
          summary:
            'Why the derivative of sine is cosine, the other five derivatives, and simple harmonic motion.',
          estimatedMinutes: 150,
          objectives: [
            'Derive $\\frac{d}{dx}\\sin x=\\cos x$ from the limit definition',
            'State all six trigonometric derivatives',
            'Combine them with the product and quotient rules',
            'Explain why radians are needed',
            'Describe the velocity and acceleration of simple harmonic motion',
          ],
          concepts: [
            'Derivative of sine and cosine',
            'Derivatives of tangent, secant, cotangent, cosecant',
            'Role of radians',
            'Periodicity of repeated derivatives',
            'Simple harmonic motion',
          ],
          explanation: `Using the angle-sum formula,

$$
\\frac{\\sin(x+h)-\\sin x}{h}=\\sin x\\cdot\\frac{\\cos h-1}{h}+\\cos x\\cdot\\frac{\\sin h}{h}.
$$

We know from Module 2 that $\\dfrac{\\sin h}{h}\\to1$ and $\\dfrac{1-\\cos h}{h}\\to0$, so

$$
\\frac{d}{dx}\\sin x=\\cos x.
$$

Those limits hold because $h$ is measured in radians. In degrees, the derivative of sine would carry an awkward factor of $\\pi/180$. The same argument gives $\\dfrac{d}{dx}\\cos x=-\\sin x$. The geometry agrees: at $x=0$ the sine curve rises with slope $1$, at $x=\\pi/2$ it is flat, and at $x=\\pi$ it falls with slope $-1$, which is exactly the cosine curve.

\`\`\`interactive
secant-tangent
{"title": "The slope of sine is cosine", "modes": ["trace"], "examples": [{"label": "sin x", "f": "sin(x)", "name": "\\\\sin x"}, {"label": "cos x", "f": "cos(x)", "name": "\\\\cos x"}], "a": 0, "trig": true, "view": [-0.4, 6.7, -1.4, 1.4], "fpView": [-1.4, 1.4], "caption": "Sweep the tangent along y = sin x and record its slope: slope 1 at 0, flat at π/2, −1 at π. The recorded dots fall exactly on the cosine curve (turn on Show f′ to compare). On the cos x tab they trace −sin x. Both rely on x being in radians."}
\`\`\`

The other four follow from the quotient rule:

$$
\\frac{d}{dx}\\tan x=\\sec^2x,\\quad\\frac{d}{dx}\\sec x=\\sec x\\tan x,
$$

$$
\\frac{d}{dx}\\cot x=-\\csc^2x,\\quad\\frac{d}{dx}\\csc x=-\\csc x\\cot x.
$$

For example, $\\dfrac{d}{dx}\\tan x=\\dfrac{\\cos x\\cos x-\\sin x(-\\sin x)}{\\cos^2x}=\\dfrac{1}{\\cos^2x}=\\sec^2x$. A useful memory aid: the functions beginning with "co" have derivatives with a minus sign.

**Worked example 1.** Find the tangent to $y=x\\cos x$ at $x=\\pi$. The product rule gives $y'=\\cos x-x\\sin x$, so $y'(\\pi)=-1$. Also $y(\\pi)=-\\pi$. The tangent is $y=-\\pi-(x-\\pi)$, that is, $y=-x$.

**Worked example 2.** A mass on a spring has position $x(t)=0.1\\cos4t$ metres. (The derivative of $\\cos4t$ uses the chain rule of the next lesson: it is $-4\\sin4t$.) Then

$$
v(t)=-0.4\\sin4t\\text{ m/s},\\qquad a(t)=-1.6\\cos4t\\text{ m/s}^2.
$$

Notice that $a(t)=-16\\,x(t)$. The acceleration is proportional to the displacement and opposite in direction, which is what a spring force does. The speed is greatest, $0.4$ m/s, when the mass passes through $x=0$, and the acceleration is greatest at the ends of the motion, where the velocity is zero. This is **simple harmonic motion**, and it is why sines and cosines appear whenever something vibrates.

Repeated differentiation cycles with period four: $\\sin x,\\ \\cos x,\\ -\\sin x,\\ -\\cos x,\\ \\sin x,\\dots$`,
          resources: [
            openstax('3-5-derivatives-of-trigonometric-functions', 'Derivatives of trigonometric functions', 'Derivations and higher-order derivatives.', true),
            paul('DiffTrigFcns', 'Derivatives of trig functions', 'Worked examples with products and quotients.'),
            paul('ProofTrigDeriv', 'Proof of trig limits and derivatives', 'The geometric limit and all six derivatives, proved.'),
          ],
          exercises: [
            {
              slug: 'trig-drill',
              title: 'Trigonometric drill',
              prompt: `Differentiate and simplify: (a) $x\\sin x$, (b) $\\dfrac{\\sin x}{1+\\cos x}$, (c) $\\tan x\\sec x$, (d) $x^2\\cos x-2x\\sin x-2\\cos x$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) sin x + x cos x; (b) 1/(1 + cos x); (c) sec^3 x + sec x tan^2 x; (d) -x^2 sin x.',
            },
            {
              slug: 'derive-the-rest',
              title: 'Derive the rest',
              prompt: `(a) Derive $\\dfrac{d}{dx}\\cos x=-\\sin x$ from the limit definition. (b) Derive the derivatives of $\\sec x$, $\\csc x$ and $\\cot x$ with the quotient rule.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a) use cos(x + h) = cos x cos h - sin x sin h, then group as in the lesson.',
            },
            {
              slug: 'trig-tangents',
              title: 'Tangents and high derivatives',
              prompt: `(a) Find all $x$ in $[0,2\\pi)$ where $y=x+2\\sin x$ has a horizontal tangent. (b) Find $\\dfrac{d^{99}}{dx^{99}}\\sin x$. (c) Find $\\dfrac{d^{35}}{dx^{35}}(x\\sin x)$ by computing the first few derivatives and spotting a pattern. (d) A mass moves as $x(t)=3\\sin t+4\\cos t$. Show that $x''=-x$, and find the maximum displacement.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 2 pi/3, 4 pi/3; (b) -cos x; (c) -35 sin x - x cos x; (d) the critical points satisfy tan t = 3/4 and the maximum is 5.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which two limits does the derivative of sine rest on?',
              answerOutline: '$\\sin h/h\\to1$ and $(1-\\cos h)/h\\to0$, with $h$ in radians.',
            },
            {
              question: 'What is the derivative of $\\sec x$? Of $\\csc x$?',
              answerOutline: '$\\sec x\\tan x$ and $-\\csc x\\cot x$.',
            },
            {
              question: 'In simple harmonic motion, where is the speed greatest?',
              answerOutline: 'At the centre, where the position is zero and acceleration is zero.',
            },
          ],
        },
        {
          slug: 'chain-rule',
          title: 'The chain rule',
          summary:
            'How to differentiate a composition: the most used rule in calculus, its meaning as multiplied rates, and fluent use on nested functions.',
          estimatedMinutes: 180,
          objectives: [
            'State the chain rule in function and Leibniz notation',
            'Explain it as a product of rates',
            'Identify the inner and outer functions in a composition',
            'Differentiate nested functions of several layers',
            'Combine the chain rule with the product and quotient rules',
          ],
          concepts: [
            'Composition and chain rule',
            'Inner and outer functions',
            'Leibniz form $\\frac{dy}{dx}=\\frac{dy}{du}\\frac{du}{dx}$',
            'General power rule',
            'Multi-layer compositions',
          ],
          explanation: `If you walk twice as fast as a friend, who walks three times as fast as a toddler, you walk six times as fast as the toddler. Rates multiply through a chain, and that is the idea of this rule.

**Chain rule.** If $g$ is differentiable at $x$ and $f$ is differentiable at $g(x)$, then

$$
\\frac{d}{dx}f(g(x))=f'(g(x))\\,g'(x).
$$

In words: differentiate the outer function, leaving the inside alone, then multiply by the derivative of the inside. In Leibniz notation, with $y=f(u)$ and $u=g(x)$,

$$
\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}.
$$

*Why it is true.* For a small change $\\Delta x$, let $\\Delta u=g(x+\\Delta x)-g(x)$. Then $\\dfrac{\\Delta y}{\\Delta x}=\\dfrac{\\Delta y}{\\Delta u}\\cdot\\dfrac{\\Delta u}{\\Delta x}$, and each factor tends to the matching derivative. This outline needs $\\Delta u\\ne0$. A full proof patches that case, using the fact that a differentiable function equals its tangent line plus a term that shrinks faster than $\\Delta x$.

**Worked examples.**

(a) $\\dfrac{d}{dx}(x^2+1)^{10}=10(x^2+1)^9\\cdot2x=20x(x^2+1)^9$. Expanding the power first would take far longer. This case, $\\dfrac{d}{dx}[u^n]=nu^{n-1}u'$, is the **general power rule**.

(b) $\\dfrac{d}{dx}\\sqrt{1+\\sin2x}$ has three layers: square root, then $1+\\sin(\\cdot)$, then $2x$. Working from the outside in,

$$
\\frac{1}{2\\sqrt{1+\\sin2x}}\\cdot\\cos2x\\cdot2=\\frac{\\cos2x}{\\sqrt{1+\\sin2x}}.
$$

(c) Combining with the product rule,

$$
\\frac{d}{dx}\\left[x^3\\cos(x^2)\\right]=3x^2\\cos(x^2)+x^3\\cdot(-\\sin(x^2))\\cdot2x=3x^2\\cos(x^2)-2x^4\\sin(x^2).
$$

The usual mistake is forgetting the inner derivative: $\\dfrac{d}{dx}\\sin(3x)$ is $3\\cos3x$, not $\\cos3x$. Another is mixing up $\\sin^2x=(\\sin x)^2$, whose derivative is $2\\sin x\\cos x$, and $\\sin(x^2)$, whose derivative is $2x\\cos(x^2)$.

The chain rule also shows why degrees are awkward. If $x$ is in degrees, $\\sin(x^\\circ)=\\sin(\\pi x/180)$, so its derivative is $\\dfrac{\\pi}{180}\\cos(x^\\circ)$.

Nearly every derivative from here on uses this rule, so work the drill until the outside-in pattern is automatic.`,
          resources: [
            openstax('3-6-the-chain-rule', 'The chain rule', 'Statement, proof and combined examples.', true),
            paul('ChainRule', 'Chain rule', 'A long list of worked examples at growing difficulty.'),
            essence('Episode on the chain rule and product rule, built from pictures of nudges.'),
            mit1801('The session on the chain rule, with a recitation video and practice problems.'),
          ],
          exercises: [
            {
              slug: 'chain-drill',
              title: 'Chain rule drill',
              prompt: `Differentiate each function, naming the outer and inner functions as you go: (a) $(3x-5)^7$, (b) $\\sqrt{x^2+9}$, (c) $\\sin(x^3)$, (d) $\\cos^2(5x)$, (e) $\\tan(\\sqrt{x})$, (f) $\\left(\\dfrac{x}{x+1}\\right)^4$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 21(3x - 5)^6; (b) x/sqrt(x^2 + 9); (c) 3x^2 cos(x^3); (d) -5 sin(10x); (e) sec^2(sqrt x)/(2 sqrt x); (f) 4x^3/(x + 1)^5.',
            },
            {
              slug: 'nested-and-mixed',
              title: 'Nested and mixed',
              prompt: `Differentiate each function, working from the outside in and simplifying your result: (a) $\\sin(\\cos(x^2))$, (b) $\\sqrt{1+\\sqrt{1+x}}$, (c) $x^2(1-3x)^5$, (d) $\\dfrac{\\sin^2x}{\\cos(2x)}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) -2x sin(x^2) cos(cos(x^2)); (b) 1/(4 sqrt(1 + x) sqrt(1 + sqrt(1 + x))); (c) x(1 - 3x)^4(2 - 21x); (d) sin(2x)/cos^2(2x) after using cos 2x = 1 - 2 sin^2 x.',
            },
            {
              slug: 'chain-from-table',
              title: 'Chain rule from a table',
              prompt: `Given $g(1)=2$, $g'(1)=-3$, $f(2)=5$, $f'(2)=4$, $f(1)=7$, $f'(1)=6$, find at $x=1$ the derivative of (a) $f(g(x))$, (b) $g(f(x))$, if the data allows it (say why or why not), (c) $f(x)g(x)$, (d) $f(x^2)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: "(a) f'(2) g'(1) = -12. (b) This needs g'(7), which is not given, so it cannot be found. (c) 6(2) + 7(-3) = -9. (d) 2x f'(x^2) at x = 1 is 12.",
            },
            {
              slug: 'symmetry-proof',
              title: 'Derivatives and symmetry',
              prompt: `Use the chain rule to prove that the derivative of a differentiable even function is odd, and the derivative of a differentiable odd function is even. Test this on $\\cos x$ and $x^3$. If $f$ is periodic with period $p$, what can you say about $f'$?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Differentiate f(-x) = f(x) with respect to x. For the periodic part, differentiate f(x + p) = f(x).',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the derivative of $\\sin^3(2x)$, and how many chain rule steps does it take?',
              answerOutline: '$6\\sin^2(2x)\\cos(2x)$. Three layers: cube, sine, $2x$.',
            },
            {
              question: 'State the chain rule in Leibniz form and say what each factor means.',
              answerOutline: '$dy/dx=(dy/du)(du/dx)$: the rate of $y$ per unit of $u$ times the rate of $u$ per unit of $x$.',
            },
            {
              question: 'What is the difference between $\\sin(x^2)$ and $\\sin^2x$ as compositions?',
              answerOutline: 'In the first, sine is outside and $x^2$ inside. In the second, squaring is outside and sine inside.',
            },
          ],
        },
      ],
      project: {
        slug: 'motion-from-measurements',
        title: 'Motion from measurements',
        description: `Take the ideas of this module to a real falling object. Film a ball dropped from about two metres next to a measuring tape, using a phone (slow motion if you have it). Step through the video and record position against time at about ten moments. If you cannot film, use this table of a simulated drop instead (time in seconds, distance fallen in metres): $(0,0)$, $(0.1,0.05)$, $(0.2,0.20)$, $(0.3,0.44)$, $(0.4,0.78)$, $(0.5,1.23)$, $(0.6,1.76)$.

Estimate velocity by hand from difference quotients, then acceleration from differences of your velocities, and compare with a fitted model $s(t)=\\tfrac12gt^2$. The aim is to see that a derivative is a limit you can only approach in the real world, and to think about how measurement error affects a difference quotient as the time step shrinks.`,
        deliverables: [
          'A table of positions and times, with an estimate of the measurement error in each',
          'Forward and central difference estimates of velocity at each interior time, worked by hand or in a spreadsheet',
          'An estimate of acceleration from the velocity table, compared with 9.8 metres per second squared',
          'A fitted model and its derivative, plotted over your velocity estimates',
          'A half-page discussion of why halving the time step does not always improve the estimate of velocity from real data',
        ],
        estimatedHours: 4,
        stretchGoals: ['Repeat with a light object, such as a coffee filter, and detect air resistance in your acceleration estimates'],
      },
    },
    {
      slug: 'more-differentiation',
      title: 'More Differentiation',
      description:
        'Curves that are not graphs, inverses, exponentials and logarithms, then the first big applications: linked rates and linear approximation.',
      lessons: [
        {
          slug: 'implicit-differentiation',
          title: 'Implicit differentiation',
          summary:
            'Finding slopes on curves defined by an equation in $x$ and $y$, without solving for $y$.',
          estimatedMinutes: 150,
          objectives: [
            'Differentiate an equation in $x$ and $y$ with the chain rule',
            'Find tangent lines to implicitly defined curves',
            'Locate horizontal and vertical tangents',
            'Compute second derivatives implicitly',
            'Prove the power rule for rational exponents',
          ],
          concepts: [
            'Explicit and implicit functions',
            'Treating $y$ as a function of $x$',
            'Chain rule on $y^n$',
            'Horizontal and vertical tangents',
            'Second derivative by substitution',
          ],
          explanation: `The circle $x^2+y^2=25$ is not the graph of a function, yet it has a tangent at every point. Near $(3,4)$ the curve is the graph of $y=\\sqrt{25-x^2}$, but solving for $y$ is clumsy, and for a curve like $x^3+y^3=9$ it is worse. **Implicit differentiation** avoids it.

Treat $y$ as an unknown function of $x$, differentiate both sides with respect to $x$, and solve for $y'$. The one new idea is that a term such as $y^2$ needs the chain rule: $\\dfrac{d}{dx}y^2=2y\\,y'$. This is the place where almost all the errors occur. A product such as $xy$ needs the product rule: $\\dfrac{d}{dx}(xy)=y+xy'$.

**Worked example 1.** For the circle, $2x+2y\\,y'=0$, so $y'=-x/y$. At $(3,4)$ the slope is $-\\tfrac34$. Check this with geometry: the radius to $(3,4)$ has slope $\\tfrac43$, and the tangent is perpendicular to it.

**Worked example 2.** Find the slope of $x^2+xy+y^2=7$ at $(1,2)$. First confirm that the point is on the curve: $1+2+4=7$. Differentiating,

$$
2x+y+xy'+2y\\,y'=0\\quad\\Longrightarrow\\quad y'=-\\frac{2x+y}{x+2y}.
$$

At $(1,2)$, $y'=-\\tfrac45$. The tangent is horizontal where the numerator vanishes and the denominator does not, and vertical where the denominator vanishes and the numerator does not. In each case, combine the condition with the equation of the curve to find the points.

**Second derivatives.** For the circle, differentiate $y'=-x/y$ with the quotient rule:

$$
y''=-\\frac{y-xy'}{y^2}=-\\frac{y+x^2/y}{y^2}=-\\frac{y^2+x^2}{y^3}=-\\frac{25}{y^3}.
$$

Substituting for $y'$, then using the equation of the curve, gives the neat result.

**Rational exponents.** If $y=x^{p/q}$ with integers $p,q$ and $x>0$, then $y^q=x^p$. Differentiating gives $qy^{q-1}y'=px^{p-1}$, and solving for $y'$ gives

$$
y'=\\frac{p}{q}\\,\\frac{x^{p-1}}{y^{q-1}}=\\frac{p}{q}\\,x^{p/q-1}.
$$

So the power rule holds for all rational exponents. (This assumes that $y$ is differentiable, which is true on $x>0$ by the inverse function result in the next lesson.) One caution: implicit differentiation gives a slope only at points that really lie on the curve. The equation $x^2+y^2=-1$ describes no points at all, even though the formal rule $y'=-x/y$ still comes out.`,
          resources: [
            openstax('3-8-implicit-differentiation', 'Implicit differentiation', 'The method, with tangent lines to curves.', true),
            paul('ImplicitDIff', 'Implicit differentiation', 'Many worked examples.'),
            mit1801('The session on implicit differentiation and inverse functions.'),
          ],
          exercises: [
            {
              slug: 'implicit-slopes',
              title: 'Slopes on implicit curves',
              prompt: `Find $dy/dx$ at the given point: (a) $x^3+y^3=9$ at $(1,2)$, (b) $xy+y^2=6$ at $(1,2)$, (c) $x\\cos y+y=1$ at $(1,0)$, (d) $\\sqrt{x}+\\sqrt{y}=3$ at $(1,4)$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) -1/4; (b) -2/5; (c) -1; (d) -2.',
            },
            {
              slug: 'horizontal-vertical-tangents',
              title: 'Horizontal and vertical tangents',
              prompt: `For the ellipse $x^2-xy+y^2=3$, find $y'$, then find all points where the tangent is horizontal and all points where it is vertical.`,
              kind: 'problem',
              difficulty: 2,
              hint: "y' = (y - 2x)/(2y - x). Horizontal: y = 2x gives (1, 2), (-1, -2). Vertical: x = 2y gives (2, 1), (-2, -1).",
            },
            {
              slug: 'implicit-second-derivative',
              title: 'Second derivative',
              prompt: `For $x^2-y^2=1$ with $y\\ne0$, show that $y'=x/y$ and $y''=-1/y^3$. What does the sign of $y''$ tell you about the upper branch of the curve?`,
              kind: 'derivation',
              difficulty: 2,
              hint: "Use the quotient rule, substitute for y', then use x^2 - y^2 = 1. On the upper branch y > 0, so y'' < 0 and the branch bends downward.",
            },
            {
              slug: 'normal-through-centre',
              title: 'Tangents and normals',
              prompt: `Prove that every normal line to the circle $x^2+y^2=r^2$ passes through the origin. Then find the two points on $x^2+4y^2=8$ where the tangent line has slope $-\\tfrac12$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the ellipse, y prime = -x/(4y) = -1/2 gives x = 2y, so 8y^2 = 8. The points are (2, 1) and (-2, -1).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\frac{d}{dx}y^3=3y^2y\'$ and not $3y^2$?',
              answerOutline: '$y$ is a function of $x$, so the chain rule applies: the outer cube gives $3y^2$ and the inner function gives $y\'$.',
            },
            {
              question: 'How do you find vertical tangents on an implicit curve?',
              answerOutline: 'Write $y\'=N/D$, then solve $D=0$ together with the curve equation, checking $N\\ne0$.',
            },
            {
              question: 'What is the derivative of $x^{3/4}$, and how does implicit differentiation justify it?',
              answerOutline: '$\\tfrac34x^{-1/4}$. Let $y^4=x^3$ and differentiate both sides.',
            },
          ],
        },
        {
          slug: 'exponential-and-log-derivatives',
          title: 'Derivatives of inverse, exponential and logarithmic functions',
          summary:
            'Why $e^x$ is its own derivative, how inverses invert slopes, and how logarithms simplify hard derivatives.',
          estimatedMinutes: 180,
          objectives: [
            'Use the inverse function derivative formula',
            'Differentiate $e^x$, $a^x$, $\\ln x$ and $\\log_a x$ with the chain rule',
            'Derive the derivatives of arcsine and arctangent',
            'Apply logarithmic differentiation to products and variable powers',
          ],
          concepts: [
            'Derivative of an inverse',
            'Defining property of $e$',
            'Derivatives of $\\ln x$ and $a^x$',
            'Inverse trigonometric derivatives',
            'Logarithmic differentiation',
          ],
          explanation: `**Inverses.** The graph of $f^{-1}$ is the graph of $f$ reflected in $y=x$, which swaps rise and run and so inverts slopes. If $f$ is one-to-one and differentiable with $f(a)=b$ and $f'(a)\\ne0$, then

$$
(f^{-1})'(b)=\\frac{1}{f'(a)}.
$$

For instance, $f(x)=x^3+x$ has $f(1)=2$ and $f'(1)=4$, so $(f^{-1})'(2)=\\tfrac14$, without any formula for $f^{-1}$.

**Exponentials.** For $f(x)=a^x$,

$$
f'(x)=\\lim_{h\\to0}\\frac{a^{x+h}-a^x}{h}=a^x\\lim_{h\\to0}\\frac{a^h-1}{h}.
$$

The derivative is proportional to the function itself. The constant is $f'(0)$, the slope at $x=0$, and we **define** $e$ as the base for which that slope is $1$. Therefore

$$
\\frac{d}{dx}e^x=e^x.
$$

**Logarithms.** Differentiating $e^{\\ln x}=x$ gives $e^{\\ln x}\\cdot(\\ln x)'=1$, so for $x>0$,

$$
\\frac{d}{dx}\\ln x=\\frac1x.
$$

For either sign, $\\dfrac{d}{dx}\\ln|x|=\\dfrac1x$ when $x\\ne0$. Other bases follow from $a^x=e^{x\\ln a}$: $\\dfrac{d}{dx}a^x=a^x\\ln a$, and $\\dfrac{d}{dx}\\log_ax=\\dfrac{1}{x\\ln a}$.

**Inverse trigonometry.** Let $y=\\arcsin x$, so $\\sin y=x$ with $y\\in[-\\pi/2,\\pi/2]$. Differentiating, $\\cos y\\cdot y'=1$. On that range $\\cos y\\ge0$, so $\\cos y=\\sqrt{1-x^2}$. Thus

$$
\\frac{d}{dx}\\arcsin x=\\frac{1}{\\sqrt{1-x^2}}\\ \\ (|x|<1),\\qquad\\frac{d}{dx}\\arctan x=\\frac{1}{1+x^2},
$$

and $\\dfrac{d}{dx}\\arccos x=-\\dfrac{1}{\\sqrt{1-x^2}}$.

**Logarithmic differentiation.** When the variable is in both base and exponent, as in $y=x^{\\sin x}$ with $x>0$, none of the power or exponential rules applies. Take logarithms first.

**Worked example.** From $\\ln y=\\sin x\\,\\ln x$, differentiate both sides:

$$
\\frac{y'}{y}=\\cos x\\ln x+\\frac{\\sin x}{x},\\qquad y'=x^{\\sin x}\\left(\\cos x\\ln x+\\frac{\\sin x}{x}\\right).
$$

The method also tames long products and quotients, since logs turn them into sums and powers into multiples. As a final step, multiply through by $y$ and write the original function back in, because the answer is wanted in terms of $x$ alone. A logarithm needs a positive input, so the method is applied where $y>0$, or to $\\ln|y|$ when the sign varies. Do not confuse the three cases: $\\dfrac{d}{dx}x^3=3x^2$ has a constant exponent, $\\dfrac{d}{dx}3^x=3^x\\ln3$ has a constant base, and $\\dfrac{d}{dx}x^x$ needs logs.`,
          resources: [
            openstax('3-7-derivatives-of-inverse-functions', 'Derivatives of inverse functions', 'The formula and the inverse trigonometric derivatives.', true),
            openstax('3-9-derivatives-of-exponential-and-logarithmic-functions', 'Derivatives of exponential and logarithmic functions', 'Includes logarithmic differentiation.'),
            paul('DiffExpLogFcns', 'Derivatives of exponential and logarithm functions', 'Short derivations and examples.'),
            paul('DiffInvTrigFcns', 'Derivatives of inverse trig functions', 'All six, with examples.'),
            paul('LogDiff', 'Logarithmic differentiation', 'Worked examples of both uses.'),
          ],
          exercises: [
            {
              slug: 'exp-log-drill',
              title: 'Drill',
              prompt: `Differentiate: (a) $e^{3x^2}$, (b) $\\ln(x^2+1)$, (c) $x^2\\ln x$, (d) $2^{\\sin x}$, (e) $\\arctan(2x)$, (f) $\\arcsin(\\sqrt{x})$, (g) $\\ln(\\cos x)$, (h) $e^{-x}\\sin3x$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 6x e^(3x^2); (b) 2x/(x^2 + 1); (c) 2x ln x + x; (d) 2^(sin x) (ln 2) cos x; (e) 2/(1 + 4x^2); (f) 1/(2 sqrt(x) sqrt(1 - x)); (g) -tan x; (h) e^(-x)(3 cos 3x - sin 3x).',
            },
            {
              slug: 'log-differentiation',
              title: 'Logarithmic differentiation',
              prompt: `(a) Find $y'$ for $y=x^x$, $x>0$, and find where the graph has a horizontal tangent. (b) For $y=\\dfrac{(x^2+1)^3\\sqrt{x+2}}{(x-1)^4}$, find $y'(0)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: "(a) y' = x^x (ln x + 1), horizontal at x = 1/e. (b) y'/y = 6x/(x^2 + 1) + 1/(2(x + 2)) - 4/(x - 1). At 0 this is 17/4, and y(0) = sqrt 2, so y'(0) = 17 sqrt(2)/4.",
            },
            {
              slug: 'inverse-derivative',
              title: 'Derivative of an inverse',
              prompt: `Let $f(x)=x^5+2x+1$. Use the sign of its derivative to explain why $f$ is one-to-one. With $g=f^{-1}$, find $g'(1)$ and $g'(4)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: "f'(x) = 5x^4 + 2 > 0, so f is increasing. f(0) = 1 gives g'(1) = 1/2. f(1) = 4 gives g'(4) = 1/7.",
            },
            {
              slug: 'e-as-limit',
              title: 'Where $e$ comes from',
              prompt: `(a) Derive $\\dfrac{d}{dx}\\arctan x$ with implicit differentiation. (b) Show that $\\arctan x+\\arctan(1/x)$ has zero derivative for $x>0$, and find its value. (c) Using the fact that $\\ln x$ has derivative $1$ at $x=1$, show that $\\lim_{n\\to\\infty}n\\ln(1+1/n)=1$, and conclude that $\\lim_{n\\to\\infty}(1+1/n)^n=e$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: '(b) The constant is pi/2: evaluate at x = 1. (c) Write the limit as a difference quotient of ln at 1, with h = 1/n, then use continuity of the exponential.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between $\\frac{d}{dx}e^x$ and $\\frac{d}{dx}x^e$?',
              answerOutline: 'The first is $e^x$, an exponential. The second is a power, $ex^{e-1}$.',
            },
            {
              question: 'Why does $(f^{-1})\'(b)=1/f\'(a)$ fail if $f\'(a)=0$?',
              answerOutline: 'A horizontal tangent reflects to a vertical tangent, so the inverse has no derivative there. Example: $x^3$ at $0$.',
            },
            {
              question: 'When would you use logarithmic differentiation?',
              answerOutline: 'When variables appear in both a base and an exponent, or for messy products and quotients.',
            },
          ],
        },
        {
          slug: 'related-rates',
          title: 'Related rates',
          summary:
            'When two quantities are linked by an equation, their rates are linked by its derivative with respect to time.',
          estimatedMinutes: 170,
          objectives: [
            'Translate a word problem into variables, an equation and known rates',
            'Differentiate an equation with respect to time',
            'Avoid substituting changing values too soon',
            'Use similar triangles and the Pythagorean theorem to relate quantities',
            'Give answers with sign and units',
          ],
          concepts: [
            'Rates as derivatives with respect to time',
            'Linking equation',
            'Implicit differentiation in time',
            'Similar triangles',
            'Sign of a rate',
          ],
          explanation: `If two quantities are connected and both change with time, their rates of change are connected as well. Differentiate the connecting equation with respect to time, and you can find one rate from the other. Every problem follows the same steps:

1. Draw a picture and name every changing quantity with a variable.
2. Write down what you know and what you want, as derivatives with respect to $t$.
3. Find an equation linking the variables, valid at **all** times.
4. Differentiate with respect to $t$, using the chain rule.
5. Now substitute the numbers for the instant in question, and solve.

Step 5 must come after step 4. If you put in a value that is changing before you differentiate, you freeze it and its derivative disappears. This is the classic error.

**Worked example.** Water pours at $2\\ \\text{m}^3$/min into a conical tank, point down, of height $6$ m and top radius $3$ m. How fast is the level rising when the water is $3$ m deep?

Let $h$ be the depth and $r$ the radius of the water surface. We know $dV/dt=2$ and we want $dh/dt$ when $h=3$. The volume of a cone is $V=\\tfrac13\\pi r^2h$. By similar triangles, $r/h=3/6$ at all times, so $r=h/2$. This removes $r$:

$$
V=\\frac{\\pi}{12}h^3.
$$

Differentiating with respect to time,

$$
\\frac{dV}{dt}=\\frac{\\pi}{4}h^2\\frac{dh}{dt}.
$$

Now substitute $h=3$ and $dV/dt=2$:

$$
2=\\frac{9\\pi}{4}\\frac{dh}{dt},\\qquad\\frac{dh}{dt}=\\frac{8}{9\\pi}\\approx0.283\\text{ m/min}.
$$

Ask whether this makes sense. The tank widens as it fills, so a constant inflow raises the level more and more slowly, and indeed $dh/dt$ is proportional to $1/h^2$.

\`\`\`interactive
related-rates
{"title": "Filling the conical tank", "scene": "cone", "H": 6, "R": 3, "rate": 2, "caption": "Water pours in at a steady 2 m³/min. Press Play, or drag t. The widget starts at the moment the depth is 3 m, where dh/dt = 8/(9π) ≈ 0.283 m/min, the worked example's answer. The depth graph is steep at first and flattens as the tank widens. The slope of its dashed tangent is dh/dt, and it is always (dV/dt)/(πr²), the inflow spread over the water's surface."}
\`\`\`

**Signs.** A quantity that is decreasing has a negative derivative. When a ladder slides down a wall, the height $y$ has $dy/dt<0$, and if you put in a positive number by mistake your answer will have the wrong sign. State the direction in your final sentence.

\`\`\`interactive
related-rates
{"title": "A sliding ladder", "scene": "ladder", "length": 5, "rate": 0.5, "x0": 1, "caption": "The foot of a 5 m ladder slides out at 0.5 m/s, and x² + y² = 25 holds at all times. Differentiating gives dy/dt = −(x/y)·dx/dt, which is negative: the top falls, slowly at first and faster and faster as the ladder flattens. Use it to check the sign and size of your answer to the sliding-ladder exercise."}
\`\`\`

**Units.** Keep track of them. If you mix km and m in a single equation, the answer will be wrong by a factor of 1000.

Geometry supplies most of the linking equations: the Pythagorean theorem for distances, similar triangles for shadows and tanks, $\\tan\\theta=$ opposite over adjacent for angles of elevation, and formulas for areas and volumes.`,
          resources: [
            openstax('4-1-related-rates', 'Related rates', 'Strategy and a range of examples.', true),
            paul('RelatedRates', 'Related rates', 'Long worked examples with diagrams.'),
          ],
          exercises: [
            {
              slug: 'balloon',
              title: 'Inflating a balloon',
              prompt: `Air enters a spherical balloon at $100\\ \\text{cm}^3$/s. When the radius is $5$ cm, how fast is the radius growing, and how fast is the surface area growing?`,
              kind: 'problem',
              difficulty: 1,
              hint: "V = (4/3) pi r^3 gives dr/dt = 100/(4 pi r^2) = 1/pi, about 0.318 cm/s. S = 4 pi r^2 gives dS/dt = 8 pi r dr/dt = 40 cm^2/s.",
            },
            {
              slug: 'sliding-ladder',
              title: 'Sliding ladder',
              prompt: `The foot of a $5$ m ladder is pulled away from a wall at $0.5$ m/s. When the foot is $3$ m from the wall, find the rate at which the top is moving and the rate of change of the angle between the ladder and the ground.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'x^2 + y^2 = 25 gives dy/dt = -0.375 m/s (downward). cos(theta) = x/5 gives d(theta)/dt = -0.125 rad/s.',
            },
            {
              slug: 'radar-and-shadow',
              title: 'Radar and a shadow',
              prompt: `(a) A plane flies level at $3$ km altitude at $240$ m/s, directly over a radar station. Find the rate at which the distance from the station is increasing when that distance is $5$ km. (b) A person $1.8$ m tall walks at $1.4$ m/s straight away from a lamp $6$ m high. How fast does the shadow lengthen, and how fast does the tip of the shadow move?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) s^2 = x^2 + 9, x = 4 km, so ds/dt = 192 m/s. (b) Similar triangles give shadow length L = (3/7)x, so dL/dt = 0.6 m/s and the tip moves at 2.0 m/s.',
            },
            {
              slug: 'rocket-camera',
              title: 'Angle of elevation',
              prompt: `A rocket rises vertically from a pad, and a camera $500$ m from the pad tracks it. When the rocket is $500$ m up, its speed is $100$ m/s. How fast must the camera's angle of elevation change, in rad/s? When the height is $1200$ m at a speed of $200$ m/s, what is the rate? Why can a faster rocket need a slower camera?`,
              kind: 'problem',
              difficulty: 3,
              hint: 'tan(theta) = y/500. First case 0.1 rad/s. Second case: sec^2(theta) = 1 + (2.4)^2 = 6.76, so the rate is 200/(500 times 6.76), about 0.0592 rad/s.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you differentiate before substituting the instantaneous values?',
              answerOutline: 'Substituting a changing quantity turns it into a constant, whose derivative is zero, so its rate disappears from the equation.',
            },
            {
              question: 'If a tank is draining, what sign does $dV/dt$ have?',
              answerOutline: 'Negative.',
            },
            {
              question: 'What is the role of similar triangles in the cone example?',
              answerOutline: 'They give $r$ in terms of $h$ at all times, leaving one variable in the volume formula.',
            },
          ],
        },
        {
          slug: 'linear-approximation',
          title: 'Linear approximation and differentials',
          summary:
            'Replacing a curve by its tangent line to estimate values and propagate measurement error.',
          estimatedMinutes: 140,
          objectives: [
            'Write the linearisation of a function at a point',
            'Estimate values by hand',
            'Decide from concavity whether an estimate is high or low',
            'Use differentials to propagate measurement error',
            'Compute relative errors',
          ],
          concepts: [
            'Linearisation $L(x)$',
            'Differentials $dy$ and $dx$',
            'Error propagation',
            'Relative error',
            'Small-angle approximation',
          ],
          explanation: `Near a point where $f$ is differentiable, the graph is close to its tangent. So for $x$ near $a$,

$$
f(x)\\approx L(x)=f(a)+f'(a)(x-a).
$$

$L$ is the **linearisation** of $f$ at $a$. This single idea accounts for a large part of how physics and engineering use calculus: when something changes only a little, treat the change as proportional.

**Worked example 1.** Estimate $\\sqrt{4.1}$. Take $f(x)=\\sqrt{x}$ and $a=4$, where the value is easy: $f(4)=2$ and $f'(4)=\\tfrac{1}{2\\sqrt4}=\\tfrac14$. Then

$$
\\sqrt{4.1}\\approx2+\\tfrac14(0.1)=2.025.
$$

The true value is $2.02485\\ldots$, so the estimate is too high by about $0.00015$. That makes sense: the graph of $\\sqrt{x}$ curves downward, so it lies below its tangent, and the tangent overestimates. In general, if $f$ is concave down near $a$ the linearisation is high, and if it is concave up the linearisation is low.

\`\`\`interactive
secant-tangent
{"title": "Linear approximation", "modes": ["linear"], "f": "sqrt(x)", "name": "\\\\sqrt{x}", "a": 4, "h": 0.1, "view": [-0.5, 9, -0.5, 3.5], "caption": "The tangent to √x at a = 4 is L(x) = 2 + (x − 4)/4. With h = 0.1 the readouts reproduce worked example 1: L(4.1) = 2.025, √4.1 ≈ 2.02485, error ≈ −0.00015, negative because √x is concave down and lies below its tangent. Zoom in and the curve and the tangent become indistinguishable. Make h ten times smaller and the error becomes about a hundred times smaller."}
\`\`\`

Standard approximations near $x=0$ are $\\sin x\\approx x$, $\\cos x\\approx1$, $e^x\\approx1+x$, $\\ln(1+x)\\approx x$ and $(1+x)^k\\approx1+kx$.

**Differentials.** Write $dx$ for a small change in $x$, and define $dy=f'(x)\\,dx$. Then $dy$ is the change along the tangent line, which approximates the true change $\\Delta y$.

**Worked example 2.** The radius of a ball is measured as $10$ cm, with possible error $\\pm0.2$ cm. The volume is $V=\\tfrac43\\pi r^3$, so

$$
dV=4\\pi r^2\\,dr=4\\pi(100)(0.2)=80\\pi\\approx251\\ \\text{cm}^3.
$$

The computed volume is about $4189\\ \\text{cm}^3$, so the error could be $\\pm251\\ \\text{cm}^3$. The **relative error** is more telling. Dividing $dV$ by $V$,

$$
\\frac{dV}{V}=\\frac{4\\pi r^2\\,dr}{\\frac43\\pi r^3}=3\\,\\frac{dr}{r}=3(0.02)=6\\%.
$$

A $2\\%$ error in a length becomes a $6\\%$ error in a volume. A general rule follows: if $y=cx^k$, then $\\dfrac{dy}{y}=k\\,\\dfrac{dx}{x}$. Whenever a quantity depends on a high power of a measurement, that measurement deserves the most care.

Linear approximation is good only close to $a$. Taylor series in Calculus II explain how to measure exactly what you lose.`,
          resources: [
            openstax('4-2-linear-approximations-and-differentials', 'Linear approximations and differentials', 'Includes error propagation.', true),
            paul('LinearApproximations', 'Linear approximations', 'Examples with a look at where the estimate degrades.'),
            paul('Differentials', 'Differentials', 'Notation and comparison of dy with the true change.'),
          ],
          exercises: [
            {
              slug: 'estimate-by-hand',
              title: 'Estimate by hand',
              prompt: `Use a linearisation at a convenient point, and say whether each estimate is high or low. (a) $\\sqrt[3]{8.06}$, (b) $\\ln1.04$, (c) $1/0.98$, (d) $(1.02)^{10}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 2.005, high; (b) 0.04, high; (c) 1.02, low; (d) 1.2, low (true value about 1.219).',
            },
            {
              slug: 'pendulum-error',
              title: 'Error in a pendulum',
              prompt: `The period of a pendulum is $T=2\\pi\\sqrt{L/g}$. (a) Show that $\\dfrac{dT}{T}=\\dfrac12\\dfrac{dL}{L}$. (b) A clock's pendulum lengthens by $0.1\\%$ in summer. By how many seconds per day does the clock run slow? (c) If you use $T$ and $L$ to compute $g$, what is the relative error in $g$ from a $0.5\\%$ error in $T$ alone?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) T grows by 0.05%, so the clock loses about 0.0005 times 86400 = 43 s per day. (c) g = 4 pi^2 L/T^2, so dg/g = -2 dT/T, which has size 1%.',
            },
            {
              slug: 'small-angle-limit',
              title: 'How good is small-angle?',
              prompt: `Using $\\sin\\theta\\approx\\theta$, what is the largest angle for which the relative error $\\left|\\dfrac{\\theta-\\sin\\theta}{\\sin\\theta}\\right|$ is below $1\\%$? Find it by trial with a calculator, to two significant figures, in radians and in degrees.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'The relative error is roughly theta^2/6, so try theta near sqrt(0.06). The result is about 0.24 rad, or 14 degrees.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the linearisation of $e^x$ at $0$?',
              answerOutline: '$L(x)=1+x$.',
            },
            {
              question: 'What is the difference between $\\Delta y$ and $dy$?',
              answerOutline: '$\\Delta y$ is the true change in the function. $dy=f\'(x)dx$ is the change along the tangent line.',
            },
            {
              question: 'If $A=\\pi r^2$, how does a $1\\%$ error in $r$ affect $A$?',
              answerOutline: 'About $2\\%$, since $dA/A=2\\,dr/r$.',
            },
          ],
        },
      ],
    },
    {
      slug: 'applications-of-the-derivative',
      title: 'Applications of the Derivative',
      description:
        'What derivatives say about the shape of a function: extreme values, the mean value theorem, curve sketching, optimisation, and two tools built on derivatives.',
      lessons: [
        {
          slug: 'extreme-values',
          title: 'Maximum and minimum values',
          summary:
            'Absolute and local extrema, the extreme value theorem, critical numbers and the closed interval method.',
          estimatedMinutes: 150,
          objectives: [
            'Distinguish absolute and local extrema',
            'State the extreme value theorem with its hypotheses',
            'State Fermat\'s theorem and explain why its converse fails',
            'Find critical numbers, including those where $f\'$ does not exist',
            'Carry out the closed interval method',
          ],
          concepts: [
            'Absolute and local extrema',
            'Extreme value theorem',
            'Fermat\'s theorem',
            'Critical number',
            'Closed interval method',
          ],
          explanation: `An **absolute maximum** of $f$ on a set $D$ is a value $f(c)$ with $f(c)\\ge f(x)$ for all $x$ in $D$. A **local maximum** only needs this for $x$ near $c$. Minima are defined the same way. An extreme value is the output, and it occurs at the input $c$.

**Extreme value theorem.** If $f$ is continuous on a closed bounded interval $[a,b]$, then $f$ attains an absolute maximum and an absolute minimum on $[a,b]$.

Both hypotheses are needed. On the open interval $(0,1)$, $f(x)=x$ has no largest value. On $[0,1]$, the discontinuous function with $f(x)=x$ for $x<1$ and $f(1)=0$ has no largest value either.

**Fermat's theorem.** If $f$ has a local extremum at an interior point $c$ and $f'(c)$ exists, then $f'(c)=0$.

*Proof for a local maximum.* For small $h>0$, $\\dfrac{f(c+h)-f(c)}{h}\\le0$, so the limit $f'(c)\\le0$. For small $h<0$, the quotient is $\\ge0$, so $f'(c)\\ge0$. Hence $f'(c)=0$. $\\blacksquare$

The converse is false: $x^3$ has zero derivative at $0$ and no extremum. Also, an extremum can occur where $f'$ fails to exist, like $|x|$ at $0$. So we define a **critical number** of $f$ as a number $c$ in its domain where $f'(c)=0$ or $f'(c)$ does not exist. Extrema at interior points happen only at critical numbers. These are candidates, not guarantees.

**Closed interval method.** To find the absolute extrema of continuous $f$ on $[a,b]$:

1. Find the critical numbers in $(a,b)$.
2. Evaluate $f$ at those numbers and at the endpoints $a,b$.
3. The largest value is the absolute maximum, the smallest the absolute minimum.

**Worked example.** Find the absolute extrema of $f(x)=x^3-3x^2+1$ on $[-\\tfrac12,4]$.

$f'(x)=3x^2-6x=3x(x-2)$, which is zero at $x=0$ and $x=2$, both in the interval. Now tabulate:

| $x$ | $-\\tfrac12$ | $0$ | $2$ | $4$ |
|---|---|---|---|---|
| $f(x)$ | $\\tfrac18$ | $1$ | $-3$ | $17$ |

The absolute maximum is $17$ at $x=4$, an endpoint, and the absolute minimum is $-3$ at $x=2$. Note that $x=0$ gives a local maximum, which is not the absolute one. No test for concavity or sign is needed. You compare values, which is why the method is so reliable.

\`\`\`interactive
curve-analysis
{"title": "The closed interval method", "modes": ["extrema"], "f": "x^3 - 3x^2 + 1", "name": "x^3-3x^2+1", "a": -0.5, "b": 4, "view": [-1.5, 4.5, -5, 19], "caption": "The table lists the candidates: the endpoints and the critical numbers inside the interval. With [−1/2, 4] it is the worked example: maximum 17 at the endpoint x = 4, minimum −3 at x = 2, and x = 0 only a local maximum. Drag b below 3 and the absolute maximum moves to x = 0. Drag a or b past a critical number and that candidate drops out of the table."}
\`\`\`

If the interval is not closed and bounded, the theorem gives no guarantee. You must then study limits at the open ends or at infinity.`,
          resources: [
            openstax('4-3-maxima-and-minima', 'Maxima and minima', 'Definitions and the closed interval method.', true),
            paul('CriticalPoints', 'Critical points', 'Includes functions with non-existent derivatives.'),
            paul('AbsExtrema', 'Finding absolute extrema', 'The method on a range of functions.'),
          ],
          exercises: [
            {
              slug: 'closed-interval-drill',
              title: 'Closed interval method',
              prompt: `Find the absolute maximum and minimum on the interval: (a) $2x^3-3x^2-12x+1$ on $[-2,3]$, (b) $x-2\\sin x$ on $[0,\\pi]$, (c) $x^{2/3}(x-5)$ on $[-1,8]$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) max 8 at x = -1, min -19 at x = 2. (b) max pi at x = pi, min pi/3 - sqrt 3 at x = pi/3. (c) Critical numbers are 0 (derivative undefined) and 2. Max 12 at x = 8, min -6 at x = -1.',
            },
            {
              slug: 'hypotheses-matter',
              title: 'Why the hypotheses matter',
              prompt: `Give an example of each, or explain why none exists. (a) A continuous function on $(0,1)$ with no absolute maximum. (b) A function on $[0,1]$ with no absolute minimum. (c) A continuous function on $[0,1]$ with no absolute maximum. (d) A function with $f'(0)=0$ and no local extremum at $0$. (e) A function with a local minimum at $0$ where $f'(0)$ does not exist.`,
              kind: 'writing',
              difficulty: 2,
              hint: '(a) 1/x. (b) f(x) = x on (0, 1], f(0) = 1. (c) None, by the extreme value theorem. (d) x^3. (e) |x|.',
            },
            {
              slug: 'unbounded-interval',
              title: 'Extrema on an unbounded interval',
              prompt: `Find the absolute extrema of $f(x)=xe^{-x}$ on $[0,\\infty)$, or show there are none. The closed interval method does not apply directly, so say what you do in its place. Repeat for $g(x)=\\dfrac{x}{x^2+4}$ on the whole real line.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Use the limits at infinity, both 0. f has max 1/e at x = 1, min 0 at x = 0. g has max 1/4 at x = 2 and min -1/4 at x = -2.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the two hypotheses of the extreme value theorem.',
              answerOutline: '$f$ continuous, on a closed bounded interval.',
            },
            {
              question: 'Is every critical number a local extremum? Is every local extremum a critical number?',
              answerOutline: 'No to the first ($x^3$ at $0$). Yes to the second for interior points. On a closed interval, extrema may also occur at endpoints.',
            },
            {
              question: 'Why is $0$ a critical number of $x^{2/3}$?',
              answerOutline: 'It is in the domain, and the derivative $\\tfrac23x^{-1/3}$ does not exist there.',
            },
          ],
        },
        {
          slug: 'mean-value-theorem',
          title: 'The mean value theorem',
          summary:
            'The theorem that links average and instantaneous rates, and the reason sign tests and constants of integration are valid.',
          estimatedMinutes: 170,
          objectives: [
            'State Rolle\'s theorem and the mean value theorem with all hypotheses',
            'Find the point promised by the theorem in simple cases',
            'Prove that zero derivative on an interval means constant',
            'Use the sign of $f\'$ to prove a function increasing or decreasing',
            'Prove inequalities and count roots with the theorem',
          ],
          concepts: [
            'Rolle\'s theorem',
            'Mean value theorem',
            'Zero derivative implies constant',
            'Increasing and decreasing test',
            'Bounding a function from its derivative',
          ],
          explanation: `**Mean value theorem (MVT).** If $f$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there is at least one $c$ in $(a,b)$ with

$$
f'(c)=\\frac{f(b)-f(a)}{b-a}.
$$

Geometrically, some tangent line is parallel to the secant through the endpoints. In motion terms, if you drive $30$ km in $20$ minutes, your average speed is $90$ km/h, so at some instant your speedometer read exactly $90$ km/h. Your speed changed smoothly, and it could not have stayed below the average for the whole trip.

\`\`\`interactive
curve-analysis
{"title": "Tangents parallel to the secant", "modes": ["mvt"], "examples": [{"label": "x³ − x", "f": "x^3 - x", "name": "x^3-x", "a": 0, "b": 2, "view": [-1.6, 2.4, -2, 7]}, {"label": "|x|", "f": "abs(x)", "name": "|x|", "a": -1, "b": 1, "view": [-1.6, 1.6, -0.6, 1.8]}], "caption": "The solid line is the secant through (a, f(a)) and (b, f(b)); each dashed line is a tangent with the same slope, touching at a point c. For x³ − x on [0, 2] the secant slope is 3 and c = 2/√3 ≈ 1.155, as in worked example 1. Drag a and b: the c values move, but at least one always exists. On the |x| tab the secant over [−1, 1] is flat and no tangent is, because the corner at 0 breaks the hypothesis."}
\`\`\`

The special case with $f(a)=f(b)$, where the conclusion is $f'(c)=0$, is **Rolle's theorem**. It follows from what you already know: a continuous $f$ has extrema on $[a,b]$. If both are at the endpoints then $f$ is constant, and otherwise one is at an interior point, where Fermat's theorem gives $f'(c)=0$. To get the MVT, apply Rolle's theorem to $f$ minus the secant line.

**Worked example 1.** For $f(x)=x^3-x$ on $[0,2]$, the secant slope is $\\dfrac{6-0}{2}=3$. Solving $3c^2-1=3$ gives $c=\\pm\\dfrac{2}{\\sqrt3}$. Only $c=2/\\sqrt3\\approx1.155$ lies in $(0,2)$.

**Why it matters.** The theorem rarely finds a specific $c$. Its value is that it turns information about $f'$ into information about $f$:

- If $f'(x)=0$ on an interval, then $f$ is constant there. For any two points, $f(b)-f(a)=f'(c)(b-a)=0$.
- If $f'=g'$ on an interval, then $f-g$ is a constant. This justifies the "$+C$" of the next module.
- If $f'>0$ on an interval, then $f$ is increasing there, since $f(b)-f(a)=f'(c)(b-a)>0$ for $b>a$. Likewise $f'<0$ means decreasing.

**Worked example 2.** Show that $x^3+x-1=0$ has exactly one real root. Let $f(x)=x^3+x-1$. Since $f(0)<0<f(1)$, the IVT gives at least one root. If there were two, Rolle's theorem would give a point with $f'(c)=0$. But $f'(x)=3x^2+1>0$ everywhere, a contradiction.

**Worked example 3.** For all real $a,b$, $|\\sin a-\\sin b|\\le|a-b|$. By the MVT, $\\sin a-\\sin b=\\cos c\\,(a-b)$ for some $c$ between them, and $|\\cos c|\\le1$.

Check the hypotheses before using the theorem. For $f(x)=|x|$ on $[-1,1]$, the secant slope is $0$, but no point has $f'=0$. There is no contradiction, because $f$ is not differentiable at $0$.`,
          resources: [
            openstax('4-4-the-mean-value-theorem', 'The mean value theorem', 'Rolle and the MVT, with corollaries.', true),
            paul('MeanValueTheorem', 'The mean value theorem', 'Proofs and root-counting examples.'),
            mit1801('The session on the mean value theorem shows how it supports the rest of the subject.'),
          ],
          exercises: [
            {
              slug: 'find-c',
              title: 'Find the promised point',
              prompt: `Check the hypotheses and find every $c$ promised by the MVT: (a) $\\sqrt{x}$ on $[1,9]$, (b) $x^2+2x$ on $[0,3]$, (c) $\\dfrac1x$ on $[1,4]$. Then explain why the MVT does not apply to (d) $\\dfrac1x$ on $[-1,1]$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) c = 4; (b) c = 3/2; (c) c = 2; (d) the function is not continuous at 0.',
            },
            {
              slug: 'bound-from-derivative',
              title: 'Bounds from a derivative',
              prompt: `(a) If $f(0)=2$ and $f'(x)\\le5$ for all $x$ in $[0,4]$, how large can $f(4)$ be? Give a function that attains this. (b) A driver passes a camera at 2:00 pm, and another $150$ km further on at 3:20 pm. The limit is $100$ km/h. Prove that the driver was speeding at some moment, and give the speed the MVT guarantees.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) f(4) <= 22, attained by 2 + 5x. (b) Average speed 150/(4/3) = 112.5 km/h.',
            },
            {
              slug: 'mvt-proofs',
              title: 'Proofs with the MVT',
              prompt: `Prove: (a) $2x+\\cos x=0$ has exactly one real root. (b) For $x>0$, $\\sin x<x$. (c) For $x>0$, $\\ln(1+x)<x$. (d) A polynomial of degree $n$ has at most $n$ real roots, assuming the case $n-1$ for its derivative.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b) with 0 < x <= 1, the MVT on [0, x] gives sin x = x cos c with 0 < c < x, and cos c < 1; for x > 1 use sin x <= 1. For (c) the MVT gives ln(1 + x) = x/(1 + c) with c > 0. For (d), between two roots of f lies a root of its derivative.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the mean value theorem with its hypotheses.',
              answerOutline: '$f$ continuous on $[a,b]$, differentiable on $(a,b)$. Then there is $c$ in $(a,b)$ with $f\'(c)=(f(b)-f(a))/(b-a)$.',
            },
            {
              question: 'Why does zero derivative imply constant only on an interval?',
              answerOutline: 'On a set with a gap, such as $x\\ne0$, a function like $|x|/x$ has zero derivative but two values. The MVT needs an interval between the two points.',
            },
            {
              question: 'How does Rolle\'s theorem help count roots?',
              answerOutline: 'Between two roots of $f$ lies a root of $f\'$. If $f\'$ is never zero, $f$ has at most one root.',
            },
          ],
        },
        {
          slug: 'curve-sketching',
          title: 'The shape of a graph',
          summary:
            'Using the first and second derivatives to find rises, falls, peaks, bends and inflection points, and drawing a full graph by hand.',
          estimatedMinutes: 190,
          objectives: [
            'Apply the first derivative test',
            'Determine concavity and inflection points',
            'Apply the second derivative test and say when it is inconclusive',
            'Sketch a function from its derivatives and asymptotes',
          ],
          concepts: [
            'First derivative test',
            'Concavity',
            'Inflection point',
            'Second derivative test',
            'Curve sketching checklist',
            'Slant asymptote',
          ],
          explanation: `The sign of $f'$ tells you where $f$ rises and falls. So the **first derivative test** classifies a critical number $c$ of a continuous function: if $f'$ changes from positive to negative at $c$ there is a local maximum, if from negative to positive a local minimum, and if there is no sign change there is no extremum.

The sign of $f''$ tells you about bending. If $f''>0$ on an interval, $f'$ is increasing, the slopes grow, and the graph is **concave up**, holding water like a cup. If $f''<0$ it is **concave down**. An **inflection point** is a point on the graph where the concavity changes.

**Second derivative test.** Suppose $f'(c)=0$ and $f''$ is continuous near $c$. If $f''(c)>0$, there is a local minimum. If $f''(c)<0$, there is a local maximum. If $f''(c)=0$, the test says nothing: $x^4$, $-x^4$ and $x^3$ all have $f'(0)=f''(0)=0$, and they have a minimum, a maximum and neither. In the same way, $f''(c)=0$ alone does not give an inflection point: $x^4$ has $f''(0)=0$ and no change of concavity.

**Sketching checklist.** Domain; intercepts; symmetry; asymptotes; sign of $f'$; sign of $f''$; plot the key points and join them.

**Worked example.** Sketch $f(x)=x^4-4x^3$.

The domain is all reals, and $f(x)=x^3(x-4)$ has intercepts at $x=0$ and $x=4$. There is no symmetry and no asymptotes, and $f\\to\\infty$ at both ends.

The first derivative is $f'(x)=4x^3-12x^2=4x^2(x-3)$. It is negative for $x<0$ and for $0<x<3$, and positive for $x>3$. So $f$ falls until $x=3$ and then rises. The critical number $x=0$ has no sign change, so no extremum, and $x=3$ is a local (and absolute) minimum with $f(3)=-27$.

The second derivative is $f''(x)=12x^2-24x=12x(x-2)$:

| interval | $x<0$ | $0<x<2$ | $x>2$ |
|---|---|---|---|
| sign of $f''$ | $+$ | $-$ | $+$ |
| concavity | up | down | up |

Concavity changes at $x=0$ and $x=2$, so the inflection points are $(0,0)$ and $(2,-16)$.

Put it together. The graph comes down from the upper left, concave up, flattens to a horizontal tangent at the origin while switching to concave down, keeps falling, switches back at $(2,-16)$, reaches the minimum at $(3,-27)$, then rises through $(4,0)$.

\`\`\`interactive
curve-analysis
{"title": "f, f′ and f″ together", "modes": ["sketch"], "f": "x^4 - 4x^3", "name": "x^4-4x^3", "x": 1, "view": [-1.5, 4.5, -32, 12], "caption": "The three graphs share one x-axis: f(x) = x⁴ − 4x³ on top, f′ in the middle and f″ below, each shaded by sign. Drag the cursor: f falls wherever f′ < 0, reaches its minimum at x = 3 where f′ changes from − to +, and is concave down exactly on 0 < x < 2 where f″ < 0. The critical number x = 0 is marked 'no extremum' because f′ touches 0 there without changing sign. The table under the graphs is the lesson's sign chart."}
\`\`\`

**Slant asymptotes.** If a rational function has top degree one greater than bottom degree, long division gives $f(x)=mx+b+(\\text{a term}\\to0)$, and the line $y=mx+b$ is a slant asymptote.`,
          resources: [
            openstax('4-5-derivatives-and-the-shape-of-a-graph', 'Derivatives and the shape of a graph', 'Both tests and concavity.', true),
            paul('ShapeofGraphPtI', 'The shape of a graph, part I', 'The first derivative.'),
            paul('ShapeofGraphPtII', 'The shape of a graph, part II', 'The second derivative.'),
            grapher,
          ],
          exercises: [
            {
              slug: 'cubic-shape',
              title: 'A cubic',
              prompt: `For $f(x)=x^3-3x+2$, give the intervals of increase and decrease, local extrema, intervals of concavity and the inflection point. Sketch the graph by hand, and mark the $x$-intercepts.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Increasing on (-inf, -1) and (1, inf). Local max 4 at x = -1, local min 0 at x = 1. Concave down for x < 0, up for x > 0, inflection at (0, 2). f = (x - 1)^2 (x + 2).',
            },
            {
              slug: 'rational-sketches',
              title: 'Rational functions',
              prompt: `Sketch each by hand, showing asymptotes, extrema and concavity. (a) $f(x)=\\dfrac{x}{x^2+1}$. (b) $g(x)=\\dfrac{x^2}{x-1}$, including its slant asymptote.`,
              kind: 'problem',
              difficulty: 2,
              hint: "(a) f' = (1 - x^2)/(x^2 + 1)^2 and f'' = 2x(x^2 - 3)/(x^2 + 1)^3. Max 1/2 at 1, min -1/2 at -1; inflection at 0 and plus or minus sqrt 3; y = 0. (b) g = x + 1 + 1/(x - 1); local max 0 at x = 0, local min 4 at x = 2; x = 1 and y = x + 1 are asymptotes; g'' = 2/(x - 1)^3.",
            },
            {
              slug: 'exponential-shape',
              title: 'A function with an exponential',
              prompt: `Analyse $f(x)=xe^{-x}$ fully, then answer: does it have an inflection point, and how does the curve behave at each end?`,
              kind: 'problem',
              difficulty: 2,
              hint: "f' = (1 - x)e^(-x); f'' = (x - 2)e^(-x). Max 1/e at x = 1, inflection at (2, 2/e^2). f tends to 0 as x tends to inf, and to -inf as x tends to -inf.",
            },
            {
              slug: 'shape-reasoning',
              title: 'Reason without a formula',
              prompt: `(a) Is there a function defined on all real numbers with $f'(x)>0$ and $f''(x)<0$ everywhere? Give one, or prove there is none. (b) Is there one with $f(x)<0$, $f'(x)>0$ and $f''(x)<0$ everywhere? (c) Is there one with $f(x)>0$ and $f''(x)<0$ everywhere?`,
              kind: 'derivation',
              difficulty: 3,
              hint: '(a) Yes: -e^(-x). (b) Yes, the same function. (c) No: a concave-down function lies below each tangent line, and a tangent with non-zero slope goes negative somewhere. If all slopes were 0, f would be constant and f prime prime would be 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $f\'\'(c)=0$ tell you?',
              answerOutline: 'By itself, nothing definite. You must check whether $f\'\'$ changes sign at $c$.',
            },
            {
              question: 'When is the second derivative test inconclusive, and what do you do then?',
              answerOutline: 'When $f\'\'(c)=0$ or does not exist. Use the first derivative test.',
            },
            {
              question: 'What does a graph look like where $f\'<0$ and $f\'\'>0$?',
              answerOutline: 'Falling but levelling out, like the left side of a bowl.',
            },
          ],
        },
        {
          slug: 'optimisation',
          title: 'Optimisation problems',
          summary:
            'Turning a practical question about the best choice into a maximum or minimum problem and solving it.',
          estimatedMinutes: 190,
          objectives: [
            'Set up an objective function of one variable from a word problem',
            'State the feasible domain',
            'Find the optimum, and justify that it is global',
            'Interpret the result in the original terms',
          ],
          concepts: [
            'Objective function',
            'Constraint',
            'Feasible domain',
            'Justifying a global optimum',
            'Boundary solutions',
          ],
          explanation: `Finding the best design, the cheapest route or the largest output is often the reason for doing calculus at all. The mathematics is the previous lessons, and the skill lies in the setting up:

1. Draw a picture and name the variables.
2. Write the quantity to optimise, the **objective**.
3. Use the **constraints** to reduce the objective to one variable.
4. State the feasible domain of that variable.
5. Find critical numbers and compare with the boundary.
6. Justify that your answer is the global optimum, and answer in words with units.

For step 6 there are three good arguments. On a closed interval, compare values. If there is one critical number and the function is continuous on an interval, a local extremum there is global. If $f''>0$ on the whole domain, a critical number is a global minimum.

**Worked example.** A closed cylindrical can must hold $V=1000\\ \\text{cm}^3$. Which radius uses the least metal?

Let $r$ be the radius and $h$ the height. The objective is the surface area $S=2\\pi r^2+2\\pi rh$. The constraint is $\\pi r^2h=V$, so $h=\\dfrac{V}{\\pi r^2}$. Substituting,

$$
S(r)=2\\pi r^2+\\frac{2V}{r},\\qquad r>0.
$$

The domain is open, and $S\\to\\infty$ at both ends: as $r\\to0^+$ (a thin tall tube) and as $r\\to\\infty$ (a flat pancake). So there is a minimum in between. Setting

$$
S'(r)=4\\pi r-\\frac{2V}{r^2}=0
$$

gives $r^3=\\dfrac{V}{2\\pi}$, so $r=\\left(\\dfrac{500}{\\pi}\\right)^{1/3}\\approx5.42$ cm. Since $S''(r)=4\\pi+\\dfrac{4V}{r^3}>0$ for all $r>0$, this is the global minimum.

The height is $h=\\dfrac{V}{\\pi r^2}=\\dfrac{2\\pi r^3}{\\pi r^2}=2r\\approx10.8$ cm. So the best can has height equal to its diameter, whatever the volume, which is the sort of general result that algebra with a symbol $V$ reveals and arithmetic with $1000$ would hide. Minimum area is $S\\approx554\\ \\text{cm}^2$.

\`\`\`interactive
can-optimisation
{"title": "The 1000 cm³ can", "V": 1000, "r": 3, "rMax": 14, "caption": "Drag r, on the graph or with the slider. The constraint fixes the height h = V/(πr²), so the can on the left is always to scale and always holds 1000 cm³. A narrow can is tall and uses a lot of side; a wide one is a flat pancake with large lids. Both make S large. At r ≈ 5.42 cm the tangent to S is horizontal, S ≈ 554 cm², and h/r reads 2: the height equals the diameter."}
\`\`\`

Most supermarket cans are taller than this. Metal is not the only cost: rolling a side from a sheet and cutting tops wastes different amounts, and the objective changes. Modelling always involves such choices.

**Boundary solutions.** The optimum need not be at a critical number. In the wire problem from Module 1 (see the exercises), the critical number gives the **minimum** area, and the maximum is at an endpoint. Do not assume that $f'=0$ is the answer.`,
          resources: [
            openstax('4-7-applied-optimization-problems', 'Applied optimization problems', 'A range of worked setups.', true),
            paul('Optimization', 'Optimization', 'The method, with justification of the global optimum.'),
            paul('MoreOptimization', 'More optimization problems', 'Harder setups.'),
          ],
          exercises: [
            {
              slug: 'wire-optimum',
              title: 'The wire, revisited',
              prompt: `Return to the $1.2$ m wire from Module 1, with area $A(x)=(x/4)^2+\\dfrac{(1.2-x)^2}{4\\pi}$ on $[0,1.2]$. Find the cut that minimises the total area and the cut that maximises it. Give the areas.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The critical number x = 4.8/(pi + 4), about 0.672 m, gives the minimum, about 0.0504 m^2. The maximum is at x = 0 (all circle), about 0.1146 m^2.',
            },
            {
              slug: 'closest-point',
              title: 'Closest point',
              prompt: `Find the point on $y=\\sqrt{x}$ closest to $(3,0)$, and the distance. Explain why you may minimise the squared distance in place of the distance.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'D^2 = (x - 3)^2 + x, minimised at x = 5/2. The distance is sqrt(11)/2, about 1.66. Squaring preserves order for non-negative numbers.',
            },
            {
              slug: 'lifeguard',
              title: 'The lifeguard',
              prompt: `A swimmer is $30$ m from a straight shore. A lifeguard is on the shore, $40$ m along it from the nearest point to the swimmer. The lifeguard runs at $5$ m/s and swims at $1.5$ m/s. Where should the lifeguard enter the water to reach the swimmer in the least time? What is that time? Compare with running as little as possible and with running all the way.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'With x the distance from the nearest point to the entry point, T(x) = (40 - x)/5 + sqrt(x^2 + 900)/1.5. Then x is about 9.43 m and T is about 27.1 s. Swimming straight takes 33.3 s, and running to the nearest point takes 28 s.',
            },
            {
              slug: 'snells-law',
              title: "Fermat's principle",
              prompt: `Light travels from $A$ above a flat boundary to $B$ below it, at speed $v_1$ above and $v_2$ below, and takes the path of least time. Let $A$ be a height $a$ above the boundary and $B$ a depth $b$ below it, separated horizontally by $d$. Show that the crossing point satisfies Snell's law, $\\dfrac{\\sin\\theta_1}{v_1}=\\dfrac{\\sin\\theta_2}{v_2}$, with the angles measured from the normal. Explain why the critical point is a global minimum.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Let x be the horizontal distance to the crossing point. T(x) = sqrt(a^2 + x^2)/v1 + sqrt(b^2 + (d - x)^2)/v2. T prime is the difference of two sines over speeds, and T double prime is positive.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the role of a constraint?',
              answerOutline: 'It links the variables, so the objective can be written as a function of one variable.',
            },
            {
              question: 'List three ways to justify that a critical point is the global optimum.',
              answerOutline: 'Compare with endpoints on a closed interval. Use a single critical point on an interval. Use a second derivative of one sign on the whole domain.',
            },
            {
              question: 'Why write the can problem with a symbol $V$ and not $1000$?',
              answerOutline: 'The answer $h=2r$ then appears as a general fact, independent of the volume.',
            },
          ],
        },
        {
          slug: 'lhopital-and-newton',
          title: "L'Hopital's rule and Newton's method",
          summary:
            'Two powerful uses of the derivative: evaluating indeterminate limits and finding roots quickly.',
          estimatedMinutes: 180,
          objectives: [
            "State L'Hopital's rule with its hypotheses",
            'Evaluate limits of the forms $0/0$ and $\\infty/\\infty$',
            'Rewrite $0\\cdot\\infty$, $\\infty-\\infty$, $1^\\infty$, $0^0$ and $\\infty^0$ into a usable form',
            "Run Newton's method by hand and explain its geometry",
            "Recognise how Newton's method can fail",
          ],
          concepts: [
            "L'Hopital's rule",
            'Indeterminate forms',
            'Logarithms for exponent forms',
            "Newton's iteration",
            'Convergence and failure',
          ],
          explanation: `**L'Hopital's rule.** Suppose $f$ and $g$ are differentiable near $a$ (except possibly at $a$), $g'(x)\\ne0$ near $a$, and $\\lim f/g$ has the form $0/0$ or $\\pm\\infty/\\pm\\infty$. If $\\lim_{x\\to a}f'(x)/g'(x)$ exists or is infinite, then

$$
\\lim_{x\\to a}\\frac{f(x)}{g(x)}=\\lim_{x\\to a}\\frac{f'(x)}{g'(x)}.
$$

It also holds for one-sided limits and for $x\\to\\pm\\infty$. Note that you differentiate top and bottom separately, and this is not the quotient rule. Both conditions matter. The form must be indeterminate: $\\lim_{x\\to1}\\dfrac{x^2+1}{x+1}=1$, while the ratio of derivatives gives $2$. And the new limit must exist: $\\dfrac{x+\\sin x}{x}\\to1$ as $x\\to\\infty$, though $\\dfrac{1+\\cos x}{1}$ has no limit.

**Worked example 1.** $\\displaystyle\\lim_{x\\to0}\\frac{e^x-1-x}{x^2}$ has the form $0/0$. Apply the rule twice:

$$
\\lim_{x\\to0}\\frac{e^x-1}{2x}=\\lim_{x\\to0}\\frac{e^x}{2}=\\frac12.
$$

Other forms must be rewritten first. For $0\\cdot\\infty$, make a fraction: $x\\ln x=\\dfrac{\\ln x}{1/x}$, which gives $\\lim_{x\\to0^+}x\\ln x=\\lim_{x\\to0^+}\\dfrac{1/x}{-1/x^2}=0$. For exponent forms, take a logarithm.

**Worked example 2.** Find $L=\\lim_{x\\to\\infty}(1+3/x)^x$, of form $1^\\infty$. Then

$$
\\ln L=\\lim_{x\\to\\infty}x\\ln(1+3/x)=\\lim_{x\\to\\infty}\\frac{\\ln(1+3/x)}{1/x}=\\lim_{x\\to\\infty}\\frac{3}{1+3/x}=3,
$$

so $L=e^3$. (The rule was applied to the middle fraction, and the $-3/x^2$ and $-1/x^2$ cancelled.)

**Newton's method.** To solve $f(x)=0$, start from a guess $x_0$, follow the tangent line to where it crosses the axis, and repeat:

$$
x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}.
$$

**Worked example 3.** To compute $\\sqrt2$, take $f(x)=x^2-2$, so $x_{n+1}=x_n-\\dfrac{x_n^2-2}{2x_n}=\\dfrac12\\left(x_n+\\dfrac{2}{x_n}\\right)$. From $x_0=1$: $x_1=1.5$, $x_2=1.41667$, $x_3=1.414216$, which already agrees with $\\sqrt2=1.414214$ to five decimals. Near a simple root, the number of correct digits about doubles at each step.

It can fail. If $f'(x_n)=0$ the tangent is horizontal. A bad start can jump to another root or cycle. For $f(x)=x^{1/3}$ it diverges from every non-zero start. Always check that your answer really solves the equation.

\`\`\`interactive
newton-method
{"title": "Newton's method, step by step", "examples": [{"label": "√2", "f": "x^2 - 2", "name": "x^2-2", "x0": 1, "view": [-0.5, 3, -2.5, 4]}, {"label": "Cycle", "f": "x^3 - 2x + 2", "name": "x^3-2x+2", "x0": 0, "view": [-2.5, 2, -3, 6]}, {"label": "x^(1/3)", "f": "cbrt(x)", "name": "x^{1/3}", "x0": 1, "maxSteps": 6, "view": [-40, 40, -4, 4]}, {"label": "f′ = 0", "f": "x^2 - 2", "name": "x^2-2", "x0": 0, "view": [-2.5, 2.5, -2.5, 4]}, {"label": "Jumps", "f": "x^3 - x", "name": "x^3-x", "x0": 0.5, "view": [-1.6, 1.6, -1.5, 1.5]}], "caption": "Press Step to follow the tangent at (xₙ, f(xₙ)) down to the x-axis, or drag x₀. On the √2 tab the table reproduces worked example 3 (1.5, 1.41667, 1.414216, …) and the number of correct digits roughly doubles each step. The other tabs are the failures in the lesson: x³ − 2x + 2 from 0 cycles between 0 and 1; x^(1/3) doubles its distance from the root each step; a start at a horizontal tangent goes nowhere; and x³ − x from 0.5 jumps over the two nearest roots to land on −1."}
\`\`\``,
          resources: [
            openstax('4-8-lhopitals-rule', "L'Hopital's rule", 'Includes all the indeterminate forms.', true),
            openstax('4-9-newtons-method', "Newton's method", 'Iteration, geometry and failure modes.'),
            paul('LHospitalsRule', "L'Hospital's rule and indeterminate forms", 'Worked examples of each form.'),
            paul('NewtonsMethod', "Newton's method", 'Worked numeric examples.'),
          ],
          exercises: [
            {
              slug: 'indeterminate-limits',
              title: 'Indeterminate limits',
              prompt: `Evaluate each limit, naming the indeterminate form before you start: (a) $\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}$, (b) $\\lim_{x\\to\\infty}x^2e^{-x}$, (c) $\\lim_{x\\to0}\\dfrac{\\tan x-x}{x^3}$, (d) $\\lim_{x\\to0^+}x^x$, (e) $\\lim_{x\\to0^+}\\left(\\dfrac1x-\\dfrac{1}{\\sin x}\\right)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) 0; (b) 0; (c) 1/3; (d) 1; (e) 0.',
            },
            {
              slug: 'lhopital-traps',
              title: "When L'Hopital's rule is the wrong tool",
              prompt: `Evaluate each limit, and explain what goes wrong with a careless use of the rule: (a) $\\lim_{x\\to0}\\dfrac{\\cos x}{x^2+1}$, (b) $\\lim_{x\\to\\infty}\\dfrac{x+\\sin x}{x}$, (c) $\\lim_{x\\to\\infty}\\dfrac{\\sqrt{x^2+1}}{x}$ (try the rule twice).`,
              kind: 'writing',
              difficulty: 2,
              hint: '(a) 1 by substitution: the form is not indeterminate. (b) 1 by dividing through; the ratio of derivatives has no limit. (c) 1 by factoring; the rule swaps numerator and denominator forever.',
            },
            {
              slug: 'newton-by-hand',
              title: "Newton's method by hand",
              prompt: `Do these with a basic calculator. (a) Newton used his method on $x^3-2x-5=0$. Starting from $x_0=2$, compute $x_1$ and $x_2$. (b) Solve $\\cos x=x$ from $x_0=1$, to six decimal places. (c) Show that for $f(x)=x^{1/3}$ the method gives $x_{n+1}=-2x_n$, and explain what happens. (d) Starting at $x_0=0$ for $f(x)=x^3-2x+2$, compute a few steps and describe what happens.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) x1 = 2.1, x2 is about 2.09457. (b) 0.739085. (c) The iterates double in size and alternate in sign, so they diverge. (d) The iterates cycle: 0, 1, 0, 1, ...',
            },
          ],
          selfAssessment: [
            {
              question: "What two things must you check before using L'Hopital's rule?",
              answerOutline: 'The limit has form $0/0$ or $\\infty/\\infty$, and the limit of the ratio of derivatives exists or is infinite.',
            },
            {
              question: 'How do you handle a limit of the form $1^\\infty$?',
              answerOutline: 'Take $\\ln$ to get $0\\cdot\\infty$, rewrite as a fraction, evaluate, then exponentiate.',
            },
            {
              question: "Give the Newton's method formula and its geometric meaning.",
              answerOutline: '$x_{n+1}=x_n-f(x_n)/f\'(x_n)$. The next guess is where the tangent line at the current guess meets the $x$-axis.',
            },
          ],
        },
      ],
      project: {
        slug: 'design-study',
        title: 'A design study',
        description: `Pick an everyday object whose shape reflects a trade-off, such as a drinks can, a paper cup, a rain gutter made by folding a metal sheet, a window that is a rectangle topped by a semicircle, or the route of a delivery cable from a road to a house. Write down an objective and a constraint, reduce to one variable, and find the optimum by hand. Measure the real object and compare. Then improve your model by adding one real cost that you left out at first, such as the extra cost of the top and bottom of a can, and optimise again. Explain whether the real design now looks closer to optimal, and what might still be missing.`,
        deliverables: [
          'A statement of the design problem with a labelled diagram and clearly defined variables',
          'A full hand derivation of the first model, including the feasible domain and a justification that the optimum is global',
          'Measurements of a real example and a comparison with the model',
          'A second, improved model with a different cost, with its derivation and a new optimum',
          'A plot of the objective against the design variable for both models',
          'A one-page conclusion on what the model captures and what it leaves out',
        ],
        estimatedHours: 6,
        stretchGoals: ['Find a design with two variables, and reduce it by treating one as fixed. Then explore how the optimum moves as that value changes.'],
      },
    },
    {
      slug: 'the-integral',
      title: 'The Integral',
      description:
        'Accumulation made exact. Antiderivatives, sums of thin rectangles, the definite integral, and the fundamental theorem that ties it all to differentiation.',
      lessons: [
        {
          slug: 'antiderivatives',
          title: 'Antiderivatives',
          summary:
            'Reversing differentiation, the constant of integration, and recovering motion from acceleration.',
          estimatedMinutes: 150,
          objectives: [
            'Find the general antiderivative of standard functions',
            'Explain the role of the constant, using the mean value theorem',
            'Solve initial value problems',
            'Find velocity and position from acceleration',
          ],
          concepts: [
            'Antiderivative',
            'General solution and $+C$',
            'Table of basic antiderivatives',
            'Initial value problem',
            'Motion under constant acceleration',
          ],
          explanation: `An **antiderivative** of $f$ is a function $F$ with $F'=f$. Since the derivative of a constant is zero, antiderivatives are not unique: $x^2$, $x^2+5$ and $x^2-\\pi$ all have derivative $2x$. The mean value theorem guarantees that this is the only freedom: on an interval, any two antiderivatives differ by a constant. So the **general antiderivative** is $F(x)+C$, and we write $\\int f(x)\\,dx=F(x)+C$.

Each derivative rule, read backwards, gives an antiderivative rule:

| $f(x)$ | $x^n$ $(n\\ne-1)$ | $1/x$ | $e^x$ | $\\cos x$ | $\\sin x$ | $\\sec^2x$ | $1/(1+x^2)$ |
|---|---|---|---|---|---|---|---|
| $F(x)$ | $\\frac{x^{n+1}}{n+1}$ | $\\ln\\lvert x\\rvert$ | $e^x$ | $\\sin x$ | $-\\cos x$ | $\\tan x$ | $\\arctan x$ |

You can always check an antiderivative by differentiating it. Sums and constant multiples go through term by term. Products and quotients do not. There is no general product rule for antiderivatives, so rewrite first: $\\dfrac{x^2+1}{x}=x+\\dfrac1x$ has antiderivative $\\dfrac{x^2}{2}+\\ln|x|+C$.

A condition such as a starting value fixes $C$. A differential equation with such a condition is an **initial value problem**.

**Worked example 1.** Find $f$ if $f''(x)=6x+2$, $f(0)=1$ and $f'(0)=-1$. Antidifferentiating once gives $f'(x)=3x^2+2x+C$, and $f'(0)=-1$ gives $C=-1$. Again, $f(x)=x^3+x^2-x+D$, and $f(0)=1$ gives $D=1$. So $f(x)=x^3+x^2-x+1$. Two conditions are needed, one for each constant.

**Worked example 2.** A stone is thrown upward at $15$ m/s from a $50$ m cliff. Take height $s$ in metres and up as positive, so $a(t)=-9.8$. Then

$$
v(t)=-9.8t+15,\\qquad s(t)=-4.9t^2+15t+50,
$$

the constants being the initial velocity and height. The highest point is where $v=0$, at $t\\approx1.53$ s, at height $s\\approx61.5$ m. The stone lands when $s=0$:

$$
4.9t^2-15t-50=0\\ \\Longrightarrow\\ t=\\frac{15+\\sqrt{225+980}}{9.8}\\approx5.07\\text{ s},
$$

taking the positive root. The general formulas $v=v_0+at$ and $s=s_0+v_0t+\\tfrac12at^2$ of introductory physics are just this calculation with symbols.

A sign convention must be chosen and held: if up is positive then gravity is $-9.8$. Mixing conventions is a common error.`,
          resources: [
            openstax('4-10-antiderivatives', 'Antiderivatives', 'Tables, initial value problems and motion.', true),
            paul('IndefiniteIntegrals', 'Indefinite integrals', 'Notation and the role of the constant.'),
            paul('ComputingIndefiniteIntegrals', 'Computing indefinite integrals', 'Practice with rewriting.'),
          ],
          exercises: [
            {
              slug: 'antiderivative-drill',
              title: 'Antiderivative drill',
              prompt: `Find the general antiderivative, and check by differentiating: (a) $3x^2-4x+5$, (b) $\\sqrt{x}+\\dfrac{1}{x}$, (c) $2\\cos x-\\sec^2x$, (d) $e^x+\\dfrac{1}{1+x^2}$, (e) $\\dfrac{(x+1)^2}{\\sqrt{x}}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers, each plus C: (a) x^3 - 2x^2 + 5x; (b) (2/3)x^(3/2) + ln|x|; (c) 2 sin x - tan x; (d) e^x + arctan x; (e) (2/5)x^(5/2) + (4/3)x^(3/2) + 2x^(1/2).',
            },
            {
              slug: 'initial-value-problems',
              title: 'Initial value problems',
              prompt: `Solve: (a) $f'(x)=2x+1$, $f(1)=3$. (b) $f''(x)=12x^2+2$, $f(0)=1$, $f'(0)=-1$. (c) $f'(x)=\\sin x$, $f(\\pi)=0$. (d) $f'(x)=1/x$ for $x>0$, with $f(1)=2$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) x^2 + x + 1; (b) x^4 + x^2 - x + 1; (c) -cos x - 1; (d) ln x + 2.',
            },
            {
              slug: 'braking',
              title: 'Braking distance',
              prompt: `A car at $30$ m/s brakes with constant deceleration and stops in $45$ m. By antidifferentiating, find the deceleration and the stopping time. If the same car is moving at $40$ m/s, how far does it take to stop with that deceleration? Why does it not take just a third more distance?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'With acceleration -a, the stopping time is 30/a and the distance is 450/a = 45, so a = 10 m/s^2 and t = 3 s. At 40 m/s the distance is 800/10 = 80 m. Distance grows with the square of speed.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the $+C$ capture all antiderivatives?',
              answerOutline: 'By the MVT, two functions with the same derivative on an interval differ by a constant.',
            },
            {
              question: 'What is $\\int x^{-1}dx$, and why does the power rule fail?',
              answerOutline: '$\\ln|x|+C$. The power rule would divide by $n+1=0$.',
            },
            {
              question: 'How many conditions fix an antiderivative of $f\'\'$?',
              answerOutline: 'Two, one for each constant of integration.',
            },
          ],
        },
        {
          slug: 'riemann-sums',
          title: 'Area and Riemann sums',
          summary:
            'Approximating area with rectangles, sigma notation, and defining the definite integral as a limit.',
          estimatedMinutes: 180,
          objectives: [
            'Use sigma notation and the standard sum formulas',
            'Compute left, right and midpoint sums',
            'Define the definite integral as a limit of Riemann sums',
            'Evaluate a simple integral directly from the limit',
          ],
          concepts: [
            'Sigma notation',
            'Partition and sample point',
            'Left, right and midpoint sums',
            'Definite integral',
            'Integrable function',
          ],
          explanation: `How do you find the area under a curve, or the distance travelled when the speed changes? Break the problem into thin pieces on which things are nearly constant, add up, and take a limit.

Divide $[a,b]$ into $n$ equal subintervals of width $\\Delta x=\\dfrac{b-a}{n}$, with endpoints $x_i=a+i\\Delta x$. Choose a sample point $x_i^*$ in each. The **Riemann sum** is

$$
\\sum_{i=1}^{n}f(x_i^*)\\,\\Delta x,
$$

which adds the signed areas of rectangles. With left endpoints it is $L_n$, with right endpoints $R_n$, and with midpoints $M_n$.

**Definition.** The **definite integral** is

$$
\\int_a^bf(x)\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n}f(x_i^*)\\,\\Delta x,
$$

when this limit exists and is the same for all choices of sample points. Then $f$ is **integrable**. Every continuous function on $[a,b]$ is integrable, as is any bounded function with finitely many jumps. (The general definition allows unequal subintervals. For a continuous function equal widths suffice.)

You need these sums:

$$
\\sum_{i=1}^{n}i=\\frac{n(n+1)}{2},\\qquad\\sum_{i=1}^{n}i^2=\\frac{n(n+1)(2n+1)}{6},\\qquad\\sum_{i=1}^{n}i^3=\\left[\\frac{n(n+1)}{2}\\right]^2.
$$

**Worked example.** Evaluate $\\int_0^2x^2\\,dx$ from the definition. Here $\\Delta x=\\dfrac2n$ and $x_i=\\dfrac{2i}{n}$, using right endpoints. Then

$$
R_n=\\sum_{i=1}^{n}\\left(\\frac{2i}{n}\\right)^2\\frac2n=\\frac{8}{n^3}\\sum_{i=1}^{n}i^2=\\frac{8}{n^3}\\cdot\\frac{n(n+1)(2n+1)}{6}=\\frac43\\cdot\\frac{(n+1)(2n+1)}{n^2}.
$$

As $n\\to\\infty$, $\\dfrac{(n+1)(2n+1)}{n^2}\\to2$, so the integral is $\\dfrac83$. A small case shows how the approximation works: $R_4=\\tfrac12(0.25+1+2.25+4)=3.75$ overestimates, since $x^2$ is increasing and each rectangle pokes above the curve, and $L_4=\\tfrac12(0+0.25+1+2.25)=1.75$ underestimates.

\`\`\`interactive
riemann-sum
{"title": "Riemann sums for x² on [0, 2]", "f": "x^2", "a": 0, "b": 2, "n": 4, "method": "right", "methods": ["left", "right", "midpoint", "upper", "lower"], "exact": 2.6666666666666665, "exactTex": "\\\\tfrac83", "view": [-0.25, 2.25, -0.4, 4.4], "caption": "With n = 4 the Right and Left tabs give the worked example's R₄ = 3.75 and L₄ = 1.75. Increase n and every choice of sample point closes in on 8/3. Because x² is increasing, the right sum equals the upper sum and the left sum the lower sum, and the true value is trapped between them. The midpoint sum is already within 0.05 at n = 4."}
\`\`\`

**Distance from velocity.** If $v(t)>0$, the distance travelled over a short interval is about $v(t_i)\\Delta t$, so the total is a Riemann sum and in the limit $\\int_a^bv(t)\\,dt$. This shows why area under a speed graph is a distance. The units agree too: height in m/s times width in s gives metres. In general the integral has the units of $f$ times the units of $x$, and the $dx$ is a reminder of the width.

The limit computation above takes effort even for $x^2$. The fundamental theorem, two lessons from now, reduces it to one line.`,
          resources: [
            openstax('5-1-approximating-areas', 'Approximating areas', 'Sigma notation and rectangle approximations.', true),
            openstax('5-2-the-definite-integral', 'The definite integral', 'The formal definition and first properties.'),
            paul('SummationNotation', 'Summation notation', 'The standard formulas.'),
            paul('AreaProblem', 'The area problem', 'A detailed numeric example.'),
            paul('DefnOfDefiniteIntegral', 'Definition of the definite integral', 'Definition and properties.'),
          ],
          exercises: [
            {
              slug: 'sigma-practice',
              title: 'Sigma practice',
              prompt: `Evaluate: (a) $\\sum_{i=1}^{10}i^2$, (b) $\\sum_{i=1}^{n}(2i+3)$ in closed form, (c) $\\sum_{i=1}^{n}(2i-1)$ in closed form. What does (c) say about the sum of the first $n$ odd numbers?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 385; (b) n^2 + 4n; (c) n^2.',
            },
            {
              slug: 'three-sums',
              title: 'Left, right and midpoint',
              prompt: `For $f(x)=x^3$ on $[0,2]$ with $n=4$, compute $L_4$, $R_4$ and $M_4$ by hand. The exact value is $4$. Which is best? Why are $L_4$ and $R_4$ below and above the true value?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'L4 = 2.25, R4 = 6.25, M4 = 3.875. The function is increasing, so left endpoints give the smallest height on each subinterval and right endpoints give the largest.',
            },
            {
              slug: 'limit-of-sums',
              title: 'Integrals from the definition',
              prompt: `Using right endpoints and sum formulas, evaluate from the definition: (a) $\\int_1^3(2x+1)\\,dx$, (b) $\\int_0^1x^3\\,dx$. Check (a) using the geometry of a trapezoid.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 10; (b) 1/4. For (a) put x_i = 1 + 2i/n.',
            },
            {
              slug: 'distance-from-table',
              title: 'Distance from a speed table',
              prompt: `A car's speedometer gives these speeds in m/s at $t=0,10,20,30,40,50,60$ seconds: $0,\\ 12,\\ 20,\\ 24,\\ 26,\\ 25,\\ 22$. Estimate the distance travelled over the minute with left and right sums. Give an upper and lower bound if you know the car only sped up until $t=40$ and then slowed down.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'L6 = 10(0 + 12 + 20 + 24 + 26 + 25) = 1070 m. R6 = 10(12 + 20 + 24 + 26 + 25 + 22) = 1290 m. For bounds, on [0,40] use left for lower and right for upper, and on [40,60] use right for lower and left for upper: 1030 m to 1330 m.',
            },
          ],
          selfAssessment: [
            {
              question: 'For increasing $f$, how do $L_n$, $R_n$ and the integral compare?',
              answerOutline: '$L_n\\le\\int_a^bf\\le R_n$.',
            },
            {
              question: 'What does the $dx$ in an integral remind you of?',
              answerOutline: 'The width $\\Delta x$ in the sum. It also fixes the variable and the units.',
            },
            {
              question: 'Is every continuous function integrable on a closed interval?',
              answerOutline: 'Yes. That is a theorem, and it is why Riemann sums can be trusted for continuous $f$.',
            },
          ],
        },
        {
          slug: 'the-definite-integral',
          title: 'Properties of the definite integral',
          summary:
            'Signed area, the algebra of integrals, comparison bounds, and using geometry to evaluate integrals.',
          estimatedMinutes: 140,
          objectives: [
            'Interpret an integral as net signed area',
            'Use linearity and additivity over intervals',
            'Evaluate integrals with geometry and symmetry',
            'Bound an integral by comparison',
            'Distinguish displacement from total distance',
          ],
          concepts: [
            'Net signed area',
            'Linearity',
            'Additivity over intervals',
            'Comparison bounds',
            'Odd and even symmetry',
            'Displacement versus distance',
          ],
          explanation: `When $f$ takes negative values, the terms $f(x_i^*)\\Delta x$ are negative. So $\\int_a^bf(x)\\,dx$ measures **net signed area**: area above the axis counts as positive, and area below counts as negative.

The definition gives these properties, for integrable functions:

- **Linearity:** $\\int_a^b(cf+g)\\,dx=c\\int_a^bf\\,dx+\\int_a^bg\\,dx$.
- **Additivity:** $\\int_a^cf\\,dx+\\int_c^bf\\,dx=\\int_a^bf\\,dx$, wherever $a,b,c$ are located.
- **Direction:** $\\int_b^af\\,dx=-\\int_a^bf\\,dx$, and $\\int_a^af\\,dx=0$.
- **Comparison:** if $f\\le g$ on $[a,b]$ with $a<b$, then $\\int_a^bf\\,dx\\le\\int_a^bg\\,dx$. In particular, if $m\\le f\\le M$ there, then $m(b-a)\\le\\int_a^bf\\,dx\\le M(b-a)$.

There is no product rule: $\\int fg\\,dx$ is not $\\int f\\,dx\\int g\\,dx$.

**Symmetry.** If $f$ is odd, then $\\int_{-a}^{a}f\\,dx=0$, since the signed areas cancel. If $f$ is even, then $\\int_{-a}^{a}f\\,dx=2\\int_0^af\\,dx$.

**Worked example 1.** Evaluate $\\int_{-3}^{3}\\left(\\sqrt{9-x^2}+x\\right)dx$. Split by linearity. The first integrand is the upper half of a circle of radius $3$, so its integral is $\\tfrac12\\pi\\cdot9=\\tfrac{9\\pi}{2}$. The second, $x$, is odd over a symmetric interval, giving $0$. The answer is $\\tfrac{9\\pi}{2}$.

**Worked example 2.** A particle has velocity $v(t)=t-2$ m/s for $0\\le t\\le5$. Its **displacement** is the net signed area. The graph of $v$ forms a triangle below the axis on $[0,2]$, of area $2$, and a triangle above on $[2,5]$, of area $\\tfrac92$. So

$$
\\int_0^5v\\,dt=-2+\\frac92=\\frac52\\text{ m}.
$$

The **total distance** counts both as positive:

$$
\\int_0^5|v|\\,dt=2+\\frac92=\\frac{13}{2}\\text{ m}.
$$

Mixing these two up is a common error. For distance, split at the points where the velocity changes sign.

\`\`\`interactive
riemann-sum
{"title": "Net signed area", "f": "x - 2", "a": 0, "b": 5, "n": 10, "method": "left", "methods": ["left", "right", "midpoint", "trapezoid"], "exact": 2.5, "exactTex": "\\\\tfrac52", "view": [-0.4, 5.4, -2.6, 3.6], "caption": "Here x plays the part of t and the curve is v(t) = t − 2. Rectangles below the axis are shaded in the second colour and count negatively. Whatever the rule, as n grows the sums tend to the displacement −2 + 9/2 = 5/2, not to the total distance 13/2: the negative pieces cancel part of the positive ones. (Midpoint and trapezoid are exact here at once, because v is a straight line.)"}
\`\`\`

**Worked example 3.** Bound $\\int_0^1e^{-x^2}dx$. On $[0,1]$, the integrand decreases from $1$ to $e^{-1}$, so the integral lies between $e^{-1}\\approx0.368$ and $1$. This integral has no formula in elementary functions, and yet this simple argument tells you something definite. Sharper bounds use the same reasoning on smaller pieces.`,
          resources: [
            openstax('5-2-the-definite-integral', 'The definite integral', 'Net signed area, properties and comparison.', true),
            paul('DefnOfDefiniteIntegral', 'Definition of the definite integral', 'All the properties, listed.'),
            paul('ProofIntProp', 'Proof of various integral properties', 'For later reading: the properties proved.'),
          ],
          exercises: [
            {
              slug: 'evaluate-with-geometry',
              title: 'Use geometry and symmetry',
              prompt: `Evaluate each integral without antiderivatives, using only areas of familiar shapes and symmetry: (a) $\\int_{-2}^{2}\\sqrt{4-x^2}\\,dx$, (b) $\\int_0^3(3-x)\\,dx$, (c) $\\int_0^5|x-2|\\,dx$, (d) $\\int_{-\\pi}^{\\pi}\\sin x\\,dx$, (e) $\\int_{-1}^{1}(x^3+|x|)\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 2 pi; (b) 9/2; (c) 13/2; (d) 0; (e) 1.',
            },
            {
              slug: 'integral-algebra',
              title: 'Algebra of integrals',
              prompt: `Given $\\int_0^5f\\,dx=4$, $\\int_0^2f\\,dx=7$ and $\\int_0^5g\\,dx=-1$, find (a) $\\int_2^5f\\,dx$, (b) $\\int_5^0(3f-2g)\\,dx$, (c) $\\int_2^2g\\,dx$. (d) Can you find $\\int_0^5fg\\,dx$?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) -3; (b) -14; (c) 0; (d) no, the data does not determine it.',
            },
            {
              slug: 'displacement-distance',
              title: 'Displacement and distance',
              prompt: `A particle has velocity $v(t)=2-|t-3|$ m/s for $0\\le t\\le6$. Sketch $v$. Find the displacement and the total distance, using areas of triangles.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'v is -1 at t = 0 and 6, is zero at t = 1 and 5, and peaks at 2 when t = 3. Above the axis: 4. Below: 1/2 + 1/2. Displacement is 3 m and distance is 5 m.',
            },
            {
              slug: 'bounding-integrals',
              title: 'Bound without computing',
              prompt: `Prove: (a) $\\dfrac{1}{2}\\le\\int_0^1\\dfrac{dx}{1+x^3}\\le1$. (b) $\\int_0^1x^3\\,dx\\le\\int_0^1x^2\\,dx$. (c) If $f$ is continuous and $f\\ge0$ on $[a,b]$ with $f(c)>0$ at some $c$, then $\\int_a^bf\\,dx>0$. Explain the idea of (c) in terms of continuity.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), continuity keeps f above f(c)/2 on a small interval around c, so a rectangle of positive area fits under the graph.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does it mean if $\\int_a^bf\\,dx=0$?',
              answerOutline: 'The signed areas cancel. It does not mean that $f=0$.',
            },
            {
              question: 'How do you find the total distance from a velocity function?',
              answerOutline: 'Integrate $|v|$, splitting at the times where $v$ changes sign.',
            },
            {
              question: 'What is $\\int_{-a}^af\\,dx$ when $f$ is odd?',
              answerOutline: '$0$, by symmetry, provided $f$ is integrable on $[-a,a]$.',
            },
          ],
        },
        {
          slug: 'fundamental-theorem',
          title: 'The fundamental theorem of calculus',
          summary:
            'The theorem that connects slopes with areas: integrals can be computed from antiderivatives, and integrals produce antiderivatives.',
          estimatedMinutes: 190,
          objectives: [
            'State both parts of the fundamental theorem with their hypotheses',
            'Evaluate definite integrals with antiderivatives',
            'Differentiate functions defined by integrals, including with variable limits',
            'Apply the net change theorem',
            'Spot when a discontinuity makes the theorem inapplicable',
          ],
          concepts: [
            'Area function',
            'FTC part 1',
            'FTC part 2',
            'Net change theorem',
            'Variable limits and the chain rule',
          ],
          explanation: `Let $f$ be continuous on $[a,b]$, and let $A(x)=\\int_a^xf(t)\\,dt$ be the area from $a$ up to a moving right edge $x$. How fast does this area grow? Moving the edge from $x$ to $x+h$ adds a thin strip of width $h$ and height about $f(x)$, so

$$
\\frac{A(x+h)-A(x)}{h}\\approx f(x).
$$

As $h\\to0$, the approximation becomes exact, because $f$ is continuous. This gives the first part.

**FTC, part 1.** If $f$ is continuous on $[a,b]$, then $A(x)=\\int_a^xf(t)\\,dt$ is differentiable on $(a,b)$ and $A'(x)=f(x)$.

So every continuous function has an antiderivative. Any other antiderivative $F$ differs from $A$ by a constant, so $F(b)-F(a)=A(b)-A(a)=\\int_a^bf\\,dx$.

**FTC, part 2.** If $f$ is continuous on $[a,b]$ and $F$ is any antiderivative of $f$, then

$$
\\int_a^bf(x)\\,dx=F(b)-F(a).
$$

This is remarkable. A limit of sums over an entire interval depends only on two values of $F$. The whole of the previous lessons' hard work on $\\int_0^2x^2dx$ becomes $\\left[\\tfrac{x^3}{3}\\right]_0^2=\\tfrac83$.

Read part 2 as the **net change theorem**: $\\int_a^bF'(x)\\,dx=F(b)-F(a)$. Integrating a rate gives the total change. Integrating a flow rate gives the volume added, and integrating velocity gives displacement.

**Worked example 1.** $\\displaystyle\\int_0^\\pi\\sin x\\,dx=\\left[-\\cos x\\right]_0^\\pi=1-(-1)=2$. One arch of the sine curve has an area of exactly $2$.

\`\`\`interactive
riemann-sum
{"title": "The area function A(x)", "modes": ["accumulate"], "f": "sin(x)", "a": 0, "b": 6.283185307179586, "x": 1.2, "trig": true, "view": [-0.3, 6.6, -1.3, 1.3], "caption": "Drag the right edge x, or press Play. The shaded signed area is A(x) = ∫₀ˣ sin t dt, and the lower graph traces A. The dashed tangent to A at x always has slope f(x), the height of the curve above: that is part 1 of the theorem, and the thin strip at x is the extra area f(x)·h. At x = π the area is exactly 2, one arch. Beyond π the area below the axis counts negatively and A falls back to 0 at 2π, because A(x) = 1 − cos x."}
\`\`\`

**Worked example 2.** Differentiate $G(x)=\\int_1^{x^2}\\cos t\\,dt$. With $u=x^2$, the chain rule gives

$$
G'(x)=\\cos(u)\\cdot\\frac{du}{dx}=2x\\cos(x^2).
$$

If $x$ appears in the lower limit, split or reverse the integral: $\\dfrac{d}{dx}\\int_x^5f(t)\\,dt=-f(x)$.

**A trap.** The expression $\\int_{-1}^{1}\\dfrac{dx}{x^2}$ might look like $\\left[-\\dfrac1x\\right]_{-1}^{1}=-2$. That is nonsense, since a positive function cannot have a negative integral. The hypothesis fails: $1/x^2$ is not continuous on $[-1,1]$, as it is unbounded at $0$. Before using the theorem, check for continuity on the whole interval. In Calculus II, integrals like this are handled as improper integrals, and this one diverges.

Differentiation and integration undo each other. Everything else in this course depends on this one fact.`,
          resources: [
            openstax('5-3-the-fundamental-theorem-of-calculus', 'The fundamental theorem of calculus', 'Both parts, with a proof and many examples.', true),
            openstax('5-4-integration-formulas-and-the-net-change-theorem', 'Integration formulas and the net change theorem', 'Rates and totals.'),
            paul('ComputingDefiniteIntegrals', 'Computing definite integrals', 'Evaluating with care about discontinuities.'),
            essence('Episode on integration and the fundamental theorem: why area and slope are inverses.'),
            grapher,
          ],
          exercises: [
            {
              slug: 'ftc-evaluate',
              title: 'Evaluate definite integrals',
              prompt: `Evaluate each integral with the fundamental theorem, writing down the antiderivative at each step: (a) $\\int_1^4\\left(\\sqrt{x}+\\dfrac{1}{x^2}\\right)dx$, (b) $\\int_0^{\\pi/4}\\sec^2x\\,dx$, (c) $\\int_1^e\\dfrac{dx}{x}$, (d) $\\int_0^1(e^x+x)\\,dx$, (e) $\\int_0^1\\dfrac{dx}{1+x^2}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 65/12; (b) 1; (c) 1; (d) e - 1/2; (e) pi/4.',
            },
            {
              slug: 'variable-limits',
              title: 'Variable limits',
              prompt: `Find the derivative with respect to $x$ of each function, without evaluating the integrals: (a) $\\int_0^x\\sqrt{1+t^3}\\,dt$, (b) $\\int_x^2t^2\\,dt$, (c) $\\int_0^{\\sin x}\\dfrac{dt}{1+t^2}$, (d) $\\int_x^{x^2}e^{t^2}\\,dt$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) sqrt(1 + x^3); (b) -x^2; (c) cos x/(1 + sin^2 x); (d) 2x e^(x^4) - e^(x^2).',
            },
            {
              slug: 'net-change',
              title: 'Net change',
              prompt: `Water flows into a tank at $r(t)=20-0.5t$ litres per minute for $0\\le t\\le60$. The tank holds $100$ L at $t=0$. When does the amount in the tank peak, and what is the amount then? What is the amount at $t=60$? Is the rate ever negative, and what does that mean?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The rate is zero at t = 40, when the amount is 100 + 800 - 400 = 500 L. At t = 60 it is 100 + 1200 - 900 = 400 L. For t > 40 the rate is negative, so the tank is draining.',
            },
            {
              slug: 'ftc-theory',
              title: 'Theory',
              prompt: `(a) Find the error in $\\int_{-1}^{2}\\dfrac{dx}{x}=\\ln2$. (b) Let $F(x)=\\int_0^x\\sin(t^2)\\,dt$ for $x\\ge0$. Find the first $x>0$ where $F$ has a local maximum, and the concavity of $F$ just after $x=0$. (c) Deduce part 2 of the FTC from part 1, carefully, assuming only that $F'=f$ on $[a,b]$ with $f$ continuous.`,
              kind: 'derivation',
              difficulty: 3,
              hint: "(a) 1/x is unbounded at 0, inside the interval. (b) F' = sin(x^2) changes from + to - at x = sqrt(pi). F'' = 2x cos(x^2) > 0 near 0. (c) Show that F - A is constant, then evaluate at a and b.",
            },
          ],
          selfAssessment: [
            {
              question: 'State part 2 of the fundamental theorem and its key hypothesis.',
              answerOutline: 'If $f$ is continuous on $[a,b]$ and $F\'=f$, then $\\int_a^bf\\,dx=F(b)-F(a)$.',
            },
            {
              question: 'Why does a constant of integration not appear in a definite integral?',
              answerOutline: 'It cancels in $F(b)-F(a)$.',
            },
            {
              question: 'What is $\\frac{d}{dx}\\int_0^{g(x)}f(t)\\,dt$?',
              answerOutline: '$f(g(x))\\,g\'(x)$, by the chain rule.',
            },
          ],
        },
        {
          slug: 'substitution',
          title: 'Integration by substitution',
          summary:
            'The chain rule in reverse: changing variables to turn a hard integral into a simple one.',
          estimatedMinutes: 190,
          objectives: [
            'Recognise when an integrand contains a function and its derivative',
            'Carry out substitution in indefinite integrals',
            'Change the limits in definite integrals',
            'Integrate $\\tan x$, $1/(ax+b)$ and related forms',
            'Use symmetry on integrals over symmetric intervals',
          ],
          concepts: [
            'Reverse chain rule',
            'Choosing $u$',
            'Changing limits',
            'Back-substitution',
            'Integrals of logarithmic and arctangent type',
          ],
          explanation: `The chain rule says $\\dfrac{d}{dx}F(g(x))=F'(g(x))\\,g'(x)$. Read backwards, with $f=F'$,

$$
\\int f(g(x))\\,g'(x)\\,dx=\\int f(u)\\,du\\quad\\text{with }u=g(x),\\ du=g'(x)\\,dx.
$$

So look for an inner function whose derivative also appears, up to a constant factor. The treatment of $du=g'(x)\\,dx$ as an equation between differentials is just a neat bookkeeping device for this rule.

**Worked example 1.** $\\int2x\\cos(x^2)\\,dx$. Let $u=x^2$, $du=2x\\,dx$. Then

$$
\\int\\cos u\\,du=\\sin u+C=\\sin(x^2)+C.
$$

Check by differentiating. The answer must be in the original variable.

**Worked example 2.** $\\int x^2\\sqrt{x^3+1}\\,dx$. Let $u=x^3+1$, so $du=3x^2dx$ and $x^2dx=\\tfrac13du$. Only a constant factor is missing, which is fine. Then

$$
\\frac13\\int u^{1/2}\\,du=\\frac29u^{3/2}+C=\\frac29(x^3+1)^{3/2}+C.
$$

If a variable factor were missing, as in $\\int\\sqrt{x^3+1}\\,dx$, you could not do this. Substitution works only when everything converts.

**Worked example 3.** $\\int\\tan x\\,dx=\\int\\dfrac{\\sin x}{\\cos x}\\,dx$. With $u=\\cos x$ and $du=-\\sin x\\,dx$,

$$
-\\int\\frac{du}{u}=-\\ln|u|+C=-\\ln|\\cos x|+C.
$$

**Definite integrals.** Change the limits to $u$-values at the same time, and then you need not go back to $x$.

**Worked example 4.** Evaluate $\\int_0^1x\\sqrt{1-x^2}\\,dx$. Let $u=1-x^2$, so $du=-2x\\,dx$. When $x=0$, $u=1$, and when $x=1$, $u=0$:

$$
\\int_0^1x\\sqrt{1-x^2}\\,dx=-\\frac12\\int_1^0\\sqrt{u}\\,du=\\frac12\\int_0^1\\sqrt{u}\\,du=\\frac12\\cdot\\frac23=\\frac13.
$$

The usual slip is to keep the old limits on the new variable.

**Sometimes $x$ must be rewritten as well.** In $\\int x\\sqrt{x+1}\\,dx$, let $u=x+1$, so that $x=u-1$. The integrand becomes $(u-1)u^{1/2}$, which expands to easy powers.

Substitution is a trial-and-error skill. If your first choice of $u$ leaves stray $x$ terms that will not convert, try the next natural inner function, such as whatever sits under a root, inside a bracket or in a denominator. Not every integrand yields: $\\int e^{-x^2}dx$ has no elementary antiderivative at all. Calculus II adds further techniques, and substitution remains the first thing to try.

Useful patterns to recognise include $\\int\\dfrac{dx}{ax+b}=\\dfrac1a\\ln|ax+b|+C$, $\\int e^{ax}dx=\\dfrac1ae^{ax}+C$, and $\\int\\dfrac{dx}{a^2+x^2}=\\dfrac1a\\arctan\\dfrac xa+C$.`,
          resources: [
            openstax('5-5-substitution', 'Substitution', 'The method, with changing limits.', true),
            openstax('5-6-integrals-involving-exponential-and-logarithmic-functions', 'Integrals involving exponential and logarithmic functions', 'More substitutions.'),
            openstax('5-7-integrals-resulting-in-inverse-trigonometric-functions', 'Integrals resulting in inverse trigonometric functions', 'Arctangent and arcsine forms.'),
            paul('SubstitutionRuleIndefinite', 'Substitution rule for indefinite integrals', 'A long run of worked examples.'),
            paul('SubstitutionRuleDefinite', 'Substitution rule for definite integrals', 'Two ways to handle limits.'),
          ],
          exercises: [
            {
              slug: 'substitution-drill',
              title: 'Substitution drill',
              prompt: `Evaluate: (a) $\\int x(x^2+1)^5\\,dx$, (b) $\\int\\sin^3x\\cos x\\,dx$, (c) $\\int\\dfrac{dx}{2x+1}$, (d) $\\int\\dfrac{\\ln x}{x}\\,dx$, (e) $\\int\\dfrac{dx}{1+4x^2}$, (f) $\\int\\dfrac{e^x}{1+e^{2x}}\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers, each plus C: (a) (x^2 + 1)^6/12; (b) sin^4(x)/4; (c) (1/2) ln|2x + 1|; (d) (ln x)^2/2; (e) (1/2) arctan(2x); (f) arctan(e^x).',
            },
            {
              slug: 'definite-substitution',
              title: 'Definite integrals',
              prompt: `Evaluate, changing the limits: (a) $\\int_0^2xe^{x^2}\\,dx$, (b) $\\int_0^{\\pi/2}\\dfrac{\\cos x}{(1+\\sin x)^2}\\,dx$, (c) $\\int_0^3\\dfrac{x}{\\sqrt{x+1}}\\,dx$, (d) $\\int_1^{e}\\dfrac{(\\ln x)^2}{x}\\,dx$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) (e^4 - 1)/2; (b) 1/2; (c) 8/3; (d) 1/3.',
            },
            {
              slug: 'symmetry-integrals',
              title: 'Symmetry and a neat trick',
              prompt: `(a) Use substitution to prove that $\\int_{-a}^{a}f\\,dx=0$ for odd $f$ and $2\\int_0^af\\,dx$ for even $f$. (b) Evaluate $\\int_{-1}^{1}x^3\\cos x\\,dx$. (c) Use $u=\\pi/2-x$ to show that $\\int_0^{\\pi/2}\\sin^2x\\,dx=\\int_0^{\\pi/2}\\cos^2x\\,dx$, and hence find their common value.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a) split at 0 and put u = -x on the negative part. (b) 0. (c) Their sum is the integral of 1, which is pi/2, so each equals pi/4.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you decide what to call $u$?',
              answerOutline: 'Look for an inner function whose derivative also appears as a factor, up to a constant.',
            },
            {
              question: 'What goes wrong if you keep the limits $0,1$ after substituting $u=1-x^2$?',
              answerOutline: 'The limits belong to $x$. They must become $u(0)$ and $u(1)$, or you must convert back to $x$ first.',
            },
            {
              question: 'Why can you not substitute $u=x^2$ in $\\int\\cos(x^2)\\,dx$?',
              answerOutline: 'There is no factor of $x$ to absorb $du$, so the integral does not convert. It has no elementary antiderivative.',
            },
          ],
        },
      ],
      project: {
        slug: 'integrals-by-machine',
        title: 'Riemann sums by machine',
        description: `Write a short program, or build a spreadsheet, that computes $L_n$, $R_n$ and $M_n$ for any function on any interval. Use it on $\\int_0^1x^2\\,dx$, $\\int_0^\\pi\\sin x\\,dx$ and $\\int_0^1e^{-x^2}\\,dx$, for $n=10,100,1000$. For the first two, compare with the exact values from the fundamental theorem and tabulate the errors. By how much does each error shrink when $n$ grows by a factor of ten? What does that suggest about how the error depends on $n$ for each rule? The third integral has no elementary antiderivative, so numerics is the honest route. State your result to as many digits as you can justify, and say why you trust them.`,
        deliverables: [
          'Your program or spreadsheet, tested on an integral with a known answer',
          'A table of left, right and midpoint values and errors for each integral at three sizes of n',
          'A log-log plot of error against n, with the slope of each line reported',
          'A value for the integral of exp(-x^2) on [0,1] with a justified number of correct digits',
          'A short written explanation of why the midpoint rule beats the endpoint rules on these integrals',
        ],
        estimatedHours: 5,
        stretchGoals: ['Compute a sum with unequal subintervals and show that it converges to the same limit'],
      },
    },
    {
      slug: 'applications-of-the-integral',
      title: 'Applications of the Integral',
      description:
        'One idea, used four ways: slice the problem, approximate each slice, add, and take a limit. It gives areas, volumes, averages and work.',
      lessons: [
        {
          slug: 'area-between-curves',
          title: 'Area between curves',
          summary:
            'Setting up area integrals, finding intersections, and choosing whether to integrate in $x$ or $y$.',
          estimatedMinutes: 150,
          objectives: [
            'Set up an area as the integral of top minus bottom',
            'Find limits of integration from intersection points',
            'Split a region where the top and bottom curves swap',
            'Integrate with respect to $y$ when that is simpler',
          ],
          concepts: [
            'Slice and sum',
            'Top minus bottom',
            'Intersection points',
            'Horizontal slices',
            'Absolute value of the difference',
          ],
          explanation: `All the applications in this module follow one pattern. Slice the object into thin pieces, approximate one piece with something simple, write the Riemann sum, and let it become an integral.

For the region between $y=f(x)$ above and $y=g(x)$ below, from $x=a$ to $x=b$, a thin vertical slice at $x$ is a rectangle of height $f(x)-g(x)$ and width $dx$. Adding them up gives

$$
A=\\int_a^b\\big(f(x)-g(x)\\big)\\,dx.
$$

This holds even if the curves dip below the axis, because only the difference matters. If the top and bottom curves swap, then you need $\\int_a^b|f-g|\\,dx$, which means splitting at each crossing.

Follow these steps. Sketch the region. Find the intersections to get the limits. Decide which curve is on top, testing a point if unsure. Integrate.

**Worked example 1.** Find the area between $y=x^2$ and $y=x+2$. They meet where $x^2=x+2$, that is, $(x-2)(x+1)=0$, so at $x=-1$ and $x=2$. At $x=0$ the line is at $2$ and the parabola at $0$, so the line is on top:

$$
A=\\int_{-1}^{2}(x+2-x^2)\\,dx=\\left[\\frac{x^2}{2}+2x-\\frac{x^3}{3}\\right]_{-1}^{2}=\\frac{10}{3}+\\frac76=\\frac92.
$$

\`\`\`interactive
riemann-sum
{"title": "Slices between two curves", "f": "x + 2", "g": "x^2", "a": -1, "b": 2, "n": 6, "method": "midpoint", "methods": ["left", "right", "midpoint"], "exact": 4.5, "exactTex": "\\\\tfrac92", "view": [-1.6, 2.6, -0.6, 4.6], "caption": "Each rectangle runs from the parabola y = x² up to the line y = x + 2, so its height is f(x) − g(x) at the sample point and its area (f − g)Δx. Increase n and the sum of the slices tends to the area 9/2 of worked example 1."}
\`\`\`

**Worked example 2.** Find the area between $y=\\sin x$ and $y=\\cos x$ on $[0,\\pi/2]$. They cross at $x=\\pi/4$. Cosine is on top before it, and sine after. So

$$
A=\\int_0^{\\pi/4}(\\cos x-\\sin x)\\,dx+\\int_{\\pi/4}^{\\pi/2}(\\sin x-\\cos x)\\,dx=2(\\sqrt2-1).
$$

Forgetting to split gives $\\int_0^{\\pi/2}(\\cos x-\\sin x)\\,dx=0$, which is plainly not the area.

\`\`\`interactive
riemann-sum
{"title": "Why you must split at a crossing", "f": "cos(x)", "g": "sin(x)", "a": 0, "b": 1.5707963267948966, "n": 8, "method": "midpoint", "methods": ["midpoint", "trapezoid"], "exact": 0, "exactTex": "0", "trig": true, "view": [-0.2, 1.8, -0.2, 1.2], "caption": "The slices have height cos x − sin x. After x = π/4 sine is on top, so those slices are negative and shaded in the second colour. Their sum tends to 0, not to the area. The true area 2(√2 − 1) ≈ 0.828 counts both sets of slices as positive."}
\`\`\`

**Horizontal slices.** When a region is bounded on the left and right by curves in $y$, use slices of width $dy$ and length "right minus left":

$$
A=\\int_c^d\\big(x_{\\text{right}}(y)-x_{\\text{left}}(y)\\big)\\,dy.
$$

For example, for the region between the parabola $x=y^2$ and the line $x=6-y$, solving $y^2=6-y$ gives $y=-3$ and $y=2$. The line is to the right, so

$$
A=\\int_{-3}^{2}(6-y-y^2)\\,dy=\\frac{125}{6}.
$$

With vertical slices this would need two integrals, because the lower boundary changes partway along. Choose the direction that gives one simple integral.`,
          resources: [
            openstax('6-1-areas-between-curves', 'Areas between curves', 'Both slicing directions.', true),
            paul('AreaBetweenCurves', 'Area between curves', 'Several worked regions, including splitting.'),
          ],
          exercises: [
            {
              slug: 'area-drill',
              title: 'Area drill',
              prompt: `Find the area of the region bounded by: (a) $y=x^2$ and $y=2x$, (b) $y=x^3$ and $y=x$ (both lobes), (c) $y=e^x$, $y=e^{-x}$ and $x=1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 4/3; (b) 1/2; (c) e + 1/e - 2.',
            },
            {
              slug: 'integrate-in-y',
              title: 'Integrate in y',
              prompt: `Find the area bounded by $x=y^2-3$ and $x=2y+5$, by horizontal slices. Set up (do not evaluate) the same area with vertical slices, and say why it takes two integrals.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'They meet at y = -2 and y = 4. The area is the integral from -2 to 4 of (8 + 2y - y^2) dy = 36.',
            },
            {
              slug: 'equal-area-line',
              title: 'A line that halves a region',
              prompt: `Find the number $k$ such that the horizontal line $y=k$ divides the region between $y=x^2$ and $y=4$ into two parts of equal area.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'The whole area is 32/3. The part below y = k has area (4/3) k^(3/2). So k^(3/2) = 4 and k = 4^(2/3), about 2.52.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does "top minus bottom" still work if both curves are below the $x$-axis?',
              answerOutline: 'The height of a slice is the difference of the $y$ values, whatever their signs.',
            },
            {
              question: 'When should you slice horizontally?',
              answerOutline: 'When the left and right boundaries are single functions of $y$, while a vertical slice would change formulas partway.',
            },
            {
              question: 'What does $\\int_a^b(f-g)\\,dx$ give if the curves cross?',
              answerOutline: 'A net value in which pieces cancel, not the area. You need to split at the crossings.',
            },
          ],
        },
        {
          slug: 'volumes-by-slicing',
          title: 'Volumes by slicing: disks and washers',
          summary:
            'Finding volume from cross-sectional area, including solids of revolution.',
          estimatedMinutes: 170,
          objectives: [
            'Write a volume as the integral of a cross-sectional area',
            'Use the disk method',
            'Use the washer method, including about lines other than the axes',
            'Derive the volumes of the sphere and cone',
          ],
          concepts: [
            'Cross-sectional area',
            'Solid of revolution',
            'Disk method',
            'Washer method',
            'Outer and inner radius',
          ],
          explanation: `Slice a solid perpendicular to the $x$-axis, like a loaf of bread. A slice at $x$ of thickness $dx$ has volume about $A(x)\\,dx$, where $A(x)$ is the area of the cross-section. Summing gives

$$
V=\\int_a^bA(x)\\,dx.
$$

Everything hinges on finding $A(x)$. Here is a solid with square cross-sections. Take a base disk $x^2+y^2\\le r^2$ whose slices perpendicular to the $x$-axis are squares. At $x$, the side is the chord $2\\sqrt{r^2-x^2}$, so $A(x)=4(r^2-x^2)$, and

$$
V=\\int_{-r}^{r}4(r^2-x^2)\\,dx=\\frac{16r^3}{3}.
$$

**Solids of revolution.** If you spin the region under $y=f(x)$ about the $x$-axis, each slice is a **disk** of radius $f(x)$, so $A(x)=\\pi f(x)^2$:

$$
V=\\pi\\int_a^bf(x)^2\\,dx.
$$

**Worked example 1.** Rotate the region under $y=\\sqrt{x}$ on $[0,4]$ about the $x$-axis:

$$
V=\\pi\\int_0^4x\\,dx=8\\pi.
$$

\`\`\`interactive
solid-of-revolution
{"title": "Disks: √x about the x-axis", "f": "sqrt(x)", "fTex": "\\\\sqrt{x}", "a": 0, "b": 4, "axis": "x-axis", "methods": ["disk"], "n": 8, "exact": 25.132741228718345, "exactTex": "8\\\\pi", "caption": "Press Sweep to turn the region under y = √x round the x-axis, or drag the sweep slider; drag the 3D view to look at it from another side. The highlighted strip of width dx becomes a disk of radius R = √x, with volume πR² dx. Move it with the slice slider or by dragging it in the left picture. Build the solid from n disks and the sum of their volumes approaches 8π as n grows."}
\`\`\`

If the region has a gap between it and the axis, each slice is a **washer**, a disk with a hole, with outer radius $R$ and inner radius $r$. Then $A=\\pi(R^2-r^2)$. Note this is not $\\pi(R-r)^2$.

**Worked example 2.** Rotate the region between $y=x$ and $y=x^2$, for $0\\le x\\le1$, about the $x$-axis. On this interval $x\\ge x^2$, so $R=x$ and $r=x^2$:

$$
V=\\pi\\int_0^1(x^2-x^4)\\,dx=\\pi\\left(\\frac13-\\frac15\\right)=\\frac{2\\pi}{15}.
$$

**Worked example 3.** Rotate the same region about the line $y=-1$. A radius is the distance from the axis of rotation to the curve, so now $R=x+1$ and $r=x^2+1$:

$$
V=\\pi\\int_0^1\\big[(x+1)^2-(x^2+1)^2\\big]\\,dx=\\pi\\int_0^1(2x-x^2-x^4)\\,dx=\\pi\\left(1-\\frac13-\\frac15\\right)=\\frac{7\\pi}{15}.
$$

Always draw a typical slice and mark the radii as distances from the axis. If the axis is vertical, slice horizontally and integrate in $y$, with radii written as functions of $y$. The classic mistake when rotating about a shifted axis is to forget that the radii change.

\`\`\`interactive
solid-of-revolution
{"title": "Washers, and a shifted axis", "f": "x", "g": "x^2", "gTex": "x^2", "a": 0, "b": 1, "axis": "x-axis", "axes": ["x-axis", "y = -1"], "methods": ["disk"], "n": 10, "exact": 0.41887902047863906, "exactTex": "\\\\tfrac{2\\\\pi}{15}", "caption": "The region between y = x and y = x² turns into a solid with a hole, so each slice is a washer with outer radius R and inner radius r, both measured from the axis. About the x-axis R = x and r = x², and the volume is 2π/15 ≈ 0.419 (worked example 2). Switch the axis to y = −1: both radii grow by 1, the hole widens, and the volume becomes 7π/15 ≈ 1.466 (worked example 3)."}
\`\`\``,
          resources: [
            openstax('6-2-determining-volumes-by-slicing', 'Determining volumes by slicing', 'General slicing, disks and washers.', true),
            paul('VolumeWithRings', 'Volumes of solids of revolution: rings', 'Disks and washers about shifted axes.'),
            paul('MoreVolume', 'More volume problems', 'Solids with known cross-sections.'),
          ],
          exercises: [
            {
              slug: 'classic-volumes',
              title: 'Derive classic volumes',
              prompt: `Derive with the disk method: (a) the volume of a sphere of radius $r$, (b) a cone of base radius $r$ and height $h$, (c) a spherical cap of height $h$ cut from a sphere of radius $r$.`,
              kind: 'derivation',
              difficulty: 1,
              hint: '(a) 4 pi r^3/3. (b) pi r^2 h/3. (c) pi h^2 (3r - h)/3, integrating (r^2 - x^2) from r - h to r.',
            },
            {
              slug: 'washer-drill',
              title: 'Disks and washers',
              prompt: `Find the volume when the region is rotated: (a) under $y=x^2$ on $[0,2]$, about the $x$-axis. (b) Between $y=x^2$ and $y=4$, about the line $y=-1$. (c) Between $y=x^2$ and $y=4$, about the line $y=4$. (d) Between $y=\\sqrt{x}$, $y=0$ and $x=4$, about the $y$-axis, with horizontal slices.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) 32 pi/5; (b) 1088 pi/15; (c) 512 pi/15; (d) 128 pi/5.',
            },
            {
              slug: 'known-cross-section',
              title: 'A wedge from a log',
              prompt: `A wedge is cut from a cylindrical log of radius $r$ by a flat cut across the log and a second cut at $45^\\circ$ that meets the first along a diameter. Using cross-sections perpendicular to that diameter, show that they are right isosceles triangles and find the volume of the wedge. (Note that the answer has no $\\pi$.)`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Let the diameter lie on the x-axis. At x the triangle has legs y = sqrt(r^2 - x^2), so its area is (r^2 - x^2)/2 and V = 2 r^3/3.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the area of a washer with radii $R$ and $r$?',
              answerOutline: '$\\pi(R^2-r^2)$, which is not $\\pi(R-r)^2$.',
            },
            {
              question: 'When rotating about $y=-1$, what is the radius to the curve $y=f(x)$, if $f\\ge-1$?',
              answerOutline: '$f(x)+1$.',
            },
            {
              question: 'What is the general formula for volume by slicing?',
              answerOutline: '$V=\\int_a^bA(x)\\,dx$, where $A(x)$ is the area of the cross-section at $x$.',
            },
          ],
        },
        {
          slug: 'cylindrical-shells',
          title: 'Volumes by cylindrical shells',
          summary:
            'A second way of slicing solids of revolution, and how to choose between methods.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the shell formula by unrolling a thin cylinder',
            'Set up shell integrals about vertical and horizontal axes',
            'Choose between shells and washers',
            'Confirm a volume by computing it both ways',
          ],
          concepts: [
            'Cylindrical shell',
            'Shell radius and height',
            'Slices parallel to the axis',
            'Choosing a method',
          ],
          explanation: `Sometimes washers are awkward. Take the region under $y=3x^2-2x^3$ on $[0,1]$ and spin it about the $y$-axis. Washers would need $x$ as a function of $y$, which means solving a cubic. **Cylindrical shells** avoid this by using slices parallel to the axis instead of perpendicular to it.

A thin vertical strip at distance $x$ from the axis, with height $h(x)$ and width $dx$, sweeps out a thin-walled tube when rotated. Cut the tube along its length and unroll it, and you get a flat plate of length $2\\pi x$ (the circumference), height $h(x)$ and thickness $dx$. So its volume is about $2\\pi x\\,h(x)\\,dx$, and

$$
V=\\int_a^b2\\pi\\,(\\text{radius})\\,(\\text{height})\\,dx.
$$

For the example above, that gives

$$
V=2\\pi\\int_0^1x(3x^2-2x^3)\\,dx=2\\pi\\left(\\frac34-\\frac25\\right)=\\frac{7\\pi}{10}.
$$

No inverse function was needed.

\`\`\`interactive
solid-of-revolution
{"title": "Shells about the y-axis", "f": "3x^2 - 2x^3", "fTex": "3x^2-2x^3", "a": 0, "b": 1, "axis": "y-axis", "methods": ["shell", "disk"], "method": "shell", "n": 8, "exact": 2.199114857512855, "exactTex": "\\\\tfrac{7\\\\pi}{10}", "caption": "A vertical strip at distance x from the y-axis sweeps out a thin tube of radius x, height 3x² − 2x³ and thickness dx, with volume about 2πx·h(x)·dx. Sweep the region round to see one shell form, then build the solid from n shells: their total approaches 7π/10. Switch to Disks / washers: the slices become horizontal, and each one's radii need x as a function of y, which is the cubic you would have had to solve."}
\`\`\`

**Worked example 1.** Rotate the region under $y=x-x^2$, for $0\\le x\\le1$, about the $y$-axis. The radius is $x$, the height $x-x^2$:

$$
V=2\\pi\\int_0^1x(x-x^2)\\,dx=2\\pi\\left(\\frac13-\\frac14\\right)=\\frac\\pi6.
$$

**Worked example 2.** Rotate the region between $y=x$ and $y=x^2$ about the line $y=2$, using both methods.

*Washers*: with $x$ slices, the radii are distances down to the curves from $y=2$: $R=2-x^2$ and $r=2-x$. Then

$$
V=\\pi\\int_0^1\\big[(2-x^2)^2-(2-x)^2\\big]\\,dx=\\pi\\int_0^1(x^4-5x^2+4x)\\,dx=\\frac{8\\pi}{15}.
$$

*Shells*: with horizontal strips at height $y$, the radius is $2-y$, and the length is $\\sqrt{y}-y$, from the line to the parabola:

$$
V=2\\pi\\int_0^1(2-y)(\\sqrt{y}-y)\\,dy=\\frac{8\\pi}{15}.
$$

The two agree, which is a strong check on the setup.

\`\`\`interactive
solid-of-revolution
{"title": "Both methods about y = 2", "f": "x", "g": "x^2", "gTex": "x^2", "a": 0, "b": 1, "axis": "y = 2", "methods": ["disk", "shell"], "n": 10, "exact": 1.6755160819145563, "exactTex": "\\\\tfrac{8\\\\pi}{15}", "caption": "The region between y = x and y = x², turned about the line y = 2 (worked example 2). With washers the strip is vertical, R = 2 − x² and r = 2 − x. With shells the strip is horizontal at height y, its radius is 2 − y and its length √y − y. Switch between the methods: the slices look completely different, but both sums approach 8π/15."}
\`\`\`

**Choosing.** Use the method whose slice runs along a direction where the top and bottom (or left and right) are single simple formulas. Slices perpendicular to the axis give washers, and slices parallel to it give shells. Rotating about a vertical axis with functions of $x$ points to shells. Rotating about a horizontal axis with functions of $x$ points to washers.

Whatever the case, the shell radius is the distance from the strip to the axis of rotation, so it may be $x$, $2-y$, $x+3$ and so on.`,
          resources: [
            openstax('6-3-volumes-of-revolution-cylindrical-shells', 'Volumes of revolution: cylindrical shells', 'Derivation and a comparison of methods.', true),
            paul('VolumeWithCylinder', 'Volumes of solids of revolution: cylinders', 'Shells about shifted axes.'),
          ],
          exercises: [
            {
              slug: 'shell-drill',
              title: 'Shell drill',
              prompt: `Use shells: (a) rotate the region under $y=\\sqrt{x}$ on $[0,4]$ about the $y$-axis. (b) Rotate the region under $y=e^{-x^2}$ on $[0,1]$ about the $y$-axis. (c) Rotate the region under $y=x^2$ on $[0,2]$ about the line $x=3$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 128 pi/5; (b) pi(1 - 1/e); (c) radius is 3 - x, giving 8 pi.',
            },
            {
              slug: 'both-ways',
              title: 'Compute it both ways',
              prompt: `Region: bounded by $y=x^2$, $y=0$ and $x=2$. Compute its volume of rotation about the $x$-axis, and about the $y$-axis, each by both washers and shells. Confirm that the two methods agree in each case.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'About the x-axis: 32 pi/5. About the y-axis: 8 pi.',
            },
            {
              slug: 'torus-and-bead',
              title: 'Torus and napkin ring',
              prompt: `(a) By shells, show that the torus formed by rotating the disk $(x-R)^2+y^2\\le r^2$ about the $y$-axis ($R>r$) has volume $2\\pi^2Rr^2$. (Hint for the integral: use the geometry of a half-disk, after substituting $u=x-R$.) (b) A cylindrical hole is drilled through the centre of a sphere of radius $a$, leaving a ring of height $h$. Show that the volume left is $\\pi h^3/6$, which does not depend on $a$. Explain why that is surprising.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), with shell radius x from b to a, where b^2 = a^2 - (h/2)^2, the height of the shell is 2 sqrt(a^2 - x^2).',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the dimensions of the unrolled shell?',
              answerOutline: 'Length $2\\pi(\\text{radius})$, height $h$, thickness $dx$.',
            },
            {
              question: 'Slices parallel to the axis of rotation give which method?',
              answerOutline: 'Shells. Slices perpendicular to it give disks or washers.',
            },
            {
              question: 'Why might you choose shells for rotating under $y=x^3+x$ about the $y$-axis?',
              answerOutline: 'Washers would need $x$ as a function of $y$, which means inverting the cubic.',
            },
          ],
        },
        {
          slug: 'average-value-and-work',
          title: 'Average value and work',
          summary:
            'The average of a function, the mean value theorem for integrals, and work done by a varying force.',
          estimatedMinutes: 180,
          objectives: [
            'Compute the average value of a function',
            'State the mean value theorem for integrals',
            'Compute work done by a variable force',
            'Solve spring, rope and pumping problems with correct units',
          ],
          concepts: [
            'Average value',
            'Mean value theorem for integrals',
            'Work $W=\\int F\\,dx$',
            'Hooke\'s law',
            'Pumping liquid: weight of a slice times distance',
          ],
          explanation: `**Average value.** The mean of $n$ sample values of $f$ is $\\dfrac1n\\sum f(x_i)$. Take $n$ equally spaced samples on $[a,b]$, so that $\\dfrac1n=\\dfrac{\\Delta x}{b-a}$. Then as $n\\to\\infty$ the mean becomes

$$
f_{\\text{avg}}=\\frac{1}{b-a}\\int_a^bf(x)\\,dx.
$$

Geometrically, $f_{\\text{avg}}$ is the height of the rectangle on $[a,b]$ with the same area as the region under $f$. For example, the average of $\\sin x$ on $[0,\\pi]$ is $\\dfrac1\\pi\\cdot2=\\dfrac2\\pi\\approx0.64$.

**Mean value theorem for integrals.** If $f$ is continuous on $[a,b]$, there is a $c$ in $[a,b]$ with $f(c)=f_{\\text{avg}}$. This is the IVT at work: the average lies between the minimum and the maximum, which $f$ attains.

**Work.** A constant force $F$ acting through a distance $d$ in its own direction does work $W=Fd$. With force in newtons and distance in metres, work is in joules. If the force varies with position, each small step of length $dx$ takes work $F(x)\\,dx$, so

$$
W=\\int_a^bF(x)\\,dx.
$$

**Worked example 1 (spring).** By Hooke's law, the force to hold a spring stretched $x$ from rest length is $F=kx$. Suppose $40$ N holds it stretched by $0.2$ m. Then $k=200$ N/m. The work to stretch it from $0.2$ m to $0.5$ m beyond rest length is

$$
W=\\int_{0.2}^{0.5}200x\\,dx=\\left[100x^2\\right]_{0.2}^{0.5}=25-4=21\\text{ J}.
$$

Always measure $x$ from the rest length, not from the total length of the spring.

**Worked example 2 (pumping).** Water fills a cylindrical tank of radius $2$ m and height $5$ m. How much work is needed to pump all of it out over the top? Here different water travels different distances, so slice by height. Take $y$ as the height above the bottom. A thin layer at $y$ has volume $\\pi(2)^2\\,dy$, mass $1000\\cdot4\\pi\\,dy$ kg, and weight $9.8\\cdot1000\\cdot4\\pi\\,dy$ N. It must rise $5-y$ metres. So

$$
W=\\int_0^5 9800\\cdot4\\pi\\,(5-y)\\,dy=39200\\pi\\left[5y-\\frac{y^2}{2}\\right]_0^5=39200\\pi\\cdot12.5\\approx1.54\\times10^6\\text{ J}.
$$

As a check, the water's centre of mass is $2.5$ m below the top, and its weight is $9800\\cdot20\\pi$ N. Lifting that weight $2.5$ m gives the same answer. For a tank with a varying cross-section, only the area of the slice changes: use similar triangles to write it as a function of $y$, just as in related rates.

For the same reason, a rope hanging from a roof needs an integral, since each piece has a different distance to rise.`,
          resources: [
            openstax('6-5-physical-applications', 'Physical applications', 'Mass, work and hydrostatic force.', true),
            paul('AvgFcnValue', 'Average function value', 'Definition and the mean value theorem for integrals.'),
            paul('Work', 'Work', 'Spring, cable and pumping examples.'),
          ],
          exercises: [
            {
              slug: 'averages',
              title: 'Averages',
              prompt: `(a) Find the average of $x^2$ on $[1,4]$ and a value $c$ where it is attained. (b) A household's power use over a day is modelled as $P(t)=2+\\sin(\\pi t/12)$ kW, for $0\\le t\\le24$ hours. Find the energy used and the average power. (c) A ball is dropped and falls freely for $T$ seconds. Show that its average velocity with respect to time is half of its final velocity.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 7, c = sqrt 7. (b) The sine term integrates to 0 over a full period, so 48 kWh and 2 kW. (c) The average of gt over [0, T] is gT/2.',
            },
            {
              slug: 'springs-and-ropes',
              title: 'Springs and ropes',
              prompt: `(a) A spring needs $6$ J to stretch from rest length to $0.3$ m. How much work is needed to stretch it from $0.3$ m to $0.6$ m beyond rest? (b) A $30$ m rope of mass $1.5$ kg/m hangs from a roof. Find the work to pull it all up. (c) A $20$ kg bucket hangs at the end of that rope, and is lifted with the rope. Find the total work. Use $g=9.8\\ \\text{m/s}^2$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) k = 400/3 N/m, so the work is 18 J. (b) 1.5(9.8)(450) = 6615 J. (c) Add 20(9.8)(30) = 5880 J, to get 12495 J.',
            },
            {
              slug: 'conical-pump',
              title: 'Pumping a cone',
              prompt: `An inverted cone (point down) of height $6$ m and top radius $3$ m is full of water. Find the work needed to pump the water to a pipe $1$ m above the top of the tank. Use density $1000\\ \\text{kg/m}^3$ and $g=9.8\\ \\text{m/s}^2$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'At height y above the point, the radius is y/2. Each slice rises 7 - y. W = 9800 pi times the integral from 0 to 6 of (y^2/4)(7 - y) dy = 9800 pi (45), about 1.39 x 10^6 J.',
            },
            {
              slug: 'escape',
              title: 'Lifting a payload',
              prompt: `Gravity on a mass $m$ at distance $r$ from Earth's centre is $F=GMm/r^2$, with $GM=3.986\\times10^{14}\\ \\text{m}^3/\\text{s}^2$ and Earth's radius $R=6.371\\times10^6$ m. (a) Find the work to raise a $1000$ kg payload from the surface to an altitude of $1000$ km. (b) Compare with the constant-gravity estimate $mgh$. (c) Take $r\\to\\infty$ to find the work to escape Earth entirely, and hence the escape speed from $\\tfrac12mv^2=W$.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) GMm(1/R - 1/(R + h)), about 8.49 x 10^9 J. (b) mgh with g = 9.8 is 9.8 x 10^9 J. (c) W = GMm/R and v = sqrt(2GM/R), about 11.2 km/s.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the average value formula and give its geometric meaning.',
              answerOutline: '$\\frac{1}{b-a}\\int_a^bf\\,dx$: the height of the rectangle with the same base and area.',
            },
            {
              question: 'Why does pumping water need an integral, even at constant gravity?',
              answerOutline: 'Each layer has a different distance to rise.',
            },
            {
              question: 'A mass of water has density $1000\\ \\text{kg/m}^3$. What is the weight of a slice of volume $dV$?',
              answerOutline: '$1000\\,g\\,dV$ newtons, with $g=9.8\\ \\text{m/s}^2$.',
            },
          ],
        },
      ],
      project: {
        slug: 'measure-a-vase',
        title: 'Measure a vase',
        description: `Choose an object with circular cross-sections, such as a vase, a wine glass, a bottle or a bowl. Measure its inner radius at about ten heights. Estimate its volume as a sum of disks by hand, then fit a simple function to the profile and integrate it to get a volume. Finally, measure the true volume by filling it with water from a measuring jug. Compare the three numbers, and explain which approximations are responsible for the differences. Then use your model to find the height of the water surface when the object is half full, and to compute the rate at which the level rises when water pours in at a steady rate.`,
        deliverables: [
          'A table of heights and inner radii with an estimate of the measurement error',
          'A disk-sum estimate of the volume, by hand or in a spreadsheet',
          'A fitted profile function, plotted against your data, and the integral of its square',
          'A direct measurement of the volume and a comparison of all three values',
          'The half-full height, and the rate at which the level rises at two chosen heights',
        ],
        estimatedHours: 5,
        stretchGoals: ['Use your profile to compute the work needed to drink the water through a straw that reaches the bottom'],
      },
    },
  ],
  capstone: {
    slug: 'water-tower',
    title: 'Design a water tower',
    description: `Bring the whole course together in one worked design. A town needs a water tower that stores a stated volume, say $2000\\ \\text{m}^3$, at a stated height above the ground, in a tank whose shape you choose as a solid of revolution.

Pick a smooth profile curve $r(y)$ for the tank wall, using a formula you can integrate by hand. Using integrals, find the volume as a function of a size parameter and solve for the parameter that meets the capacity. Use optimisation on a simplified version of the design, such as a cylinder or a sphere of the same capacity, to discuss which shape needs the least wall material. Use related rates to predict how fast the water level rises during filling at a steady pump rate, and to find where in the tank the level rises fastest. Compute the work needed to fill the tank from a reservoir at ground level, and from this the size of pump needed to fill it in a night. Finally, find the average pressure at the base over a day in which the level follows a simple function of time that you specify, and use linear approximation to estimate how much a $2\\%$ error in the radius affects the capacity.

The result should read as a short engineering report, in which every number comes from a calculation shown in full. All integrals and derivatives are done by hand. A computer may be used only for plots and to check numbers.`,
    deliverables: [
      'A statement of the requirements, your chosen profile function and a labelled diagram',
      'A hand computation of the volume by slicing, and the size parameter that gives the required capacity',
      'An optimisation comparing wall material for at least two simple shapes of equal capacity',
      'A related rates analysis of the water level during filling, with a graph of level against time',
      'A work and pump power calculation with units, assuming a stated pump efficiency',
      'An average value calculation and a linear error analysis',
      'A numerical check of the main integrals using a Riemann sum',
      'A two-page conclusion on the design choices and the simplifying assumptions',
    ],
    estimatedHours: 12,
    stretchGoals: [
      'Make the walls thicker where the water pressure is greater, and find the total mass of steel',
      'Add a filling schedule in which the pump rate varies, and integrate it to predict the level through a day',
    ],
  },
  masteryChecklist: [
    'I can find domains, compose functions and work fluently with trigonometric, exponential and logarithmic functions',
    'I can compute limits by algebra, the squeeze theorem and one-sided analysis, and say when a limit does not exist',
    'I can prove a simple limit from the epsilon-delta definition',
    'I can state the intermediate value theorem, the extreme value theorem and the mean value theorem with all their hypotheses, and use each one',
    'I can differentiate any elementary function by hand, including implicit and logarithmic differentiation',
    'I can solve related rates, linear approximation and optimisation problems from a verbal description',
    'I can sketch a function from its first and second derivatives',
    "I can use L'Hopital's rule and Newton's method and explain when each fails",
    'I can state both parts of the fundamental theorem and explain why it is true',
    'I can evaluate integrals by antiderivatives and substitution, with correct limits',
    'I can set up area, volume, average value and work integrals by slicing',
  ],
});
