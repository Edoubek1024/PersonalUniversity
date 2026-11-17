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

This course assumes algebra and no calculus. It starts with a review of the functions you will use, builds the limit carefully, and then develops the derivative and the integral with the tangent line, the falling ball, the leaking tank and the stretched spring as constant companions. Every technique is practised by hand, because fluency with these calculations is what later courses assume. Each lesson is written so that you can learn from the page alone: read the worked example with a pencil, reproduce it with the page covered, then do the exercises. Exercises are split into parts, each with an answer to reveal once you have tried it, and each lesson ends with two quiz questions.

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
              prompt: `Find the domain of each function and write it in interval notation, listing the restrictions first.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\dfrac{x+1}{x^2-4}$`, answer: `The denominator vanishes at $x=\\pm2$, so the domain is $(-\\infty,-2)\\cup(-2,2)\\cup(2,\\infty)$.` },
                { prompt: `$\\sqrt{6-2x}$`, answer: `Need $6-2x\\ge0$, so $x\\le3$: the domain is $(-\\infty,3]$.` },
                { prompt: `$\\dfrac{1}{\\sqrt{x^2-9}}$`, answer: `Need $x^2-9>0$, strictly, because the root is in a denominator. So $|x|>3$: the domain is $(-\\infty,-3)\\cup(3,\\infty)$.` },
                { prompt: `$\\dfrac{\\sqrt{x}}{x-3}$`, answer: `Need $x\\ge0$ and $x\\ne3$: the domain is $[0,3)\\cup(3,\\infty)$.` },
              ],
            },
            {
              slug: 'compositions',
              title: 'Compose in both orders',
              prompt: `Let $f(x)=x^2-3x$ and $g(x)=\\dfrac{1}{x+1}$. Write each composition as a single simplified fraction, and give its domain.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$f\\circ g$`, answer: `$f(g(x))=\\dfrac{1}{(x+1)^2}-\\dfrac{3}{x+1}=\\dfrac{1-3(x+1)}{(x+1)^2}=\\dfrac{-3x-2}{(x+1)^2}$. The domain is $x\\ne-1$, inherited from $g$.` },
                { prompt: `$g\\circ f$`, answer: `$g(f(x))=\\dfrac{1}{x^2-3x+1}$. The denominator is zero at $x=\\dfrac{3\\pm\\sqrt5}{2}$, so the domain is every real number except those two.` },
              ],
            },
            {
              slug: 'difference-quotients',
              title: 'Difference quotients',
              prompt: `Simplify $\\dfrac{f(x+h)-f(x)}{h}$ for $h\\ne 0$ until no $h$ remains in a denominator.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$f(x)=x^3$`, answer: `$(x+h)^3-x^3=3x^2h+3xh^2+h^3$, so the quotient is $3x^2+3xh+h^2$.` },
                { prompt: `$f(x)=\\dfrac1x$`, answer: `$\\dfrac{1}{x+h}-\\dfrac1x=\\dfrac{x-(x+h)}{x(x+h)}=\\dfrac{-h}{x(x+h)}$, so the quotient is $-\\dfrac{1}{x(x+h)}$.` },
                { prompt: `$f(x)=\\sqrt{x}$ (multiply top and bottom by the conjugate)`, answer: `$\\dfrac{\\sqrt{x+h}-\\sqrt x}{h}\\cdot\\dfrac{\\sqrt{x+h}+\\sqrt x}{\\sqrt{x+h}+\\sqrt x}=\\dfrac{h}{h(\\sqrt{x+h}+\\sqrt x)}=\\dfrac{1}{\\sqrt{x+h}+\\sqrt{x}}$.` },
              ],
            },
            {
              slug: 'wire-model',
              title: 'Build a function from a description',
              prompt: `A wire of length $1.2$ m is cut in two. A piece of length $x$ is bent into a square and the rest into a circle. (You will find the best cut in Module 5.)`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the total enclosed area $A(x)$ as a function of $x$ and state its domain.`, answer: `The square has side $x/4$. The circle has circumference $1.2-x$, so radius $\\dfrac{1.2-x}{2\\pi}$ and area $\\dfrac{(1.2-x)^2}{4\\pi}$. So $A(x)=\\left(\\dfrac x4\\right)^2+\\dfrac{(1.2-x)^2}{4\\pi}$ on $[0,1.2]$.` },
                { prompt: `Evaluate $A(0)$ and $A(1.2)$.`, answer: `$A(0)=\\dfrac{1.44}{4\\pi}\\approx0.1146\\ \\text{m}^2$ (all circle) and $A(1.2)=0.3^2=0.09\\ \\text{m}^2$ (all square).` },
              ],
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
          quiz: [
            {
              question: 'Let $f(x)=\\sqrt{x+4}$ and $g(x)=x^2-5$. What is $(f\\circ g)(3)$?',
              options: ['$2$', '$4\\sqrt7$', '$2\\sqrt2$', '$6$'],
              answer: 2,
              explanation: 'Work from the inside: $g(3)=9-5=4$, then $f(4)=\\sqrt8=2\\sqrt2$. The answer $2$ is $(g\\circ f)(3)=(\\sqrt7)^2-5$, the other order, and $4\\sqrt7$ is the product $f(3)g(3)$, which is not a composition at all.',
            },
            {
              question: 'The graph of $y=f(x)$ passes through $(1,5)$. Which point must lie on the graph of $y=f(x+3)-2$?',
              options: ['$(4,3)$', '$(-2,7)$', '$(4,7)$', '$(-2,3)$'],
              answer: 3,
              explanation: 'Replacing $x$ by $x+3$ moves the graph left by $3$, and subtracting $2$ moves it down by $2$, so $(1,5)$ goes to $(-2,3)$. Check: at $x=-2$, $f(x+3)-2=f(1)-2=3$. Moving right to $(4,3)$ is the usual sign slip: $f(x-c)$ moves the graph right, so $f(x+3)$ moves it left.',
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
              prompt: `Find each value exactly, without a calculator, using the unit circle, reference angles and the angle-sum formulas.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write $150^\\circ$ in radians.`, answer: `$150\\cdot\\dfrac{\\pi}{180}=\\dfrac{5\\pi}{6}$.` },
                { prompt: `$\\sin(5\\pi/6)$`, answer: `$\\tfrac12$: the reference angle is $\\pi/6$, in the second quadrant, where sine is positive.` },
                { prompt: `$\\cos(7\\pi/4)$`, answer: `$\\tfrac{\\sqrt2}{2}$: the reference angle is $\\pi/4$, in the fourth quadrant, where cosine is positive.` },
                { prompt: `$\\tan(2\\pi/3)$`, answer: `$-\\sqrt3$, since $\\sin\\tfrac{2\\pi}{3}=\\tfrac{\\sqrt3}{2}$ and $\\cos\\tfrac{2\\pi}{3}=-\\tfrac12$.` },
                { prompt: `$\\sec\\pi$`, answer: `$\\dfrac{1}{\\cos\\pi}=-1$.` },
                { prompt: `$\\sin(\\pi/12)$, using an angle-difference formula`, answer: `$\\sin\\left(\\tfrac\\pi3-\\tfrac\\pi4\\right)=\\sin\\tfrac\\pi3\\cos\\tfrac\\pi4-\\cos\\tfrac\\pi3\\sin\\tfrac\\pi4=\\dfrac{\\sqrt6-\\sqrt2}{4}\\approx0.2588$.` },
              ],
            },
            {
              slug: 'trig-equations',
              title: 'Solve on an interval',
              prompt: `Find every solution in the interval $[0,2\\pi)$, showing the factoring step in each case.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\cos2x=\\cos x$`, answer: `Use $\\cos2x=2\\cos^2x-1$ and factor: $(2\\cos x+1)(\\cos x-1)=0$. So $\\cos x=1$, giving $x=0$, or $\\cos x=-\\tfrac12$, giving $x=\\tfrac{2\\pi}{3},\\tfrac{4\\pi}{3}$.` },
                { prompt: `$\\sin2x=\\sin x$`, answer: `Do not divide by $\\sin x$. Instead $2\\sin x\\cos x-\\sin x=\\sin x(2\\cos x-1)=0$, so $\\sin x=0$, giving $x=0,\\pi$, or $\\cos x=\\tfrac12$, giving $x=\\tfrac\\pi3,\\tfrac{5\\pi}{3}$. Four solutions.` },
                { prompt: `$\\tan^2x=3$`, answer: `$(\\tan x-\\sqrt3)(\\tan x+\\sqrt3)=0$, so $\\tan x=\\pm\\sqrt3$: $x=\\tfrac\\pi3,\\tfrac{2\\pi}{3},\\tfrac{4\\pi}{3},\\tfrac{5\\pi}{3}$.` },
              ],
            },
            {
              slug: 'ferris-wheel',
              title: 'A sinusoidal model',
              prompt: `A wheel of radius $20$ m has its centre $24$ m above the ground and turns once every $90$ s. A rider starts at the lowest point at $t=0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the rider's height $h(t)$ as a cosine function.`, answer: `Midline $24$, amplitude $20$, period $90$ s, starting at the minimum, so a negative cosine: $h(t)=24-20\\cos\\left(\\dfrac{2\\pi t}{90}\\right)$. Check: $h(0)=4$ m, the lowest point.` },
                { prompt: `When does the rider first reach a height of $34$ m?`, answer: `$24-20\\cos\\frac{2\\pi t}{90}=34$ gives $\\cos\\frac{2\\pi t}{90}=-\\tfrac12$. The first such angle is $\\frac{2\\pi}{3}$, so $\\frac{2\\pi t}{90}=\\frac{2\\pi}{3}$ and $t=30$ s.` },
              ],
            },
            {
              slug: 'triple-angle',
              title: 'Prove an identity',
              prompt: `Prove that $\\sin3\\theta=3\\sin\\theta-4\\sin^3\\theta$, then use the identity to check an exact value.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove the identity using the angle-sum formula on $\\sin(2\\theta+\\theta)$ and the double-angle formulas.`, answer: `Replace $\\cos^2\\theta$ by $1-\\sin^2\\theta$ wherever it appears, so that only sines are left: $\\sin3\\theta=\\sin2\\theta\\cos\\theta+\\cos2\\theta\\sin\\theta=2\\sin\\theta\\cos^2\\theta+(1-2\\sin^2\\theta)\\sin\\theta=2\\sin\\theta(1-\\sin^2\\theta)+\\sin\\theta-2\\sin^3\\theta=3\\sin\\theta-4\\sin^3\\theta$.` },
                { prompt: `Use the identity with $\\theta=\\pi/6$ to confirm the exact value of $\\sin(\\pi/2)$.`, answer: `$3\\cdot\\tfrac12-4\\cdot\\tfrac18=\\tfrac32-\\tfrac12=1$, which is $\\sin\\tfrac\\pi2$.` },
              ],
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
          quiz: [
            {
              question: 'How many solutions does $2\\cos^2x=\\cos x$ have in $[0,2\\pi)$?',
              options: ['$2$', '$4$', '$1$', '$3$'],
              answer: 1,
              explanation: 'Factor instead of dividing: $\\cos x(2\\cos x-1)=0$. Then $\\cos x=0$ gives $\\pi/2$ and $3\\pi/2$, and $\\cos x=\\tfrac12$ gives $\\pi/3$ and $5\\pi/3$: four solutions. Dividing by $\\cos x$ leaves only $\\cos x=\\tfrac12$ and loses the two solutions where $\\cos x=0$, which gives the tempting answer $2$.',
            },
            {
              question: 'What is the period of $y=3\\sin(4t)+1$?',
              options: ['$\\pi/2$', '$4$', '$8\\pi$', '$2\\pi$'],
              answer: 0,
              explanation: 'The period of $\\sin(\\omega t)$ is $2\\pi/\\omega=2\\pi/4=\\pi/2$. The $4$ is the angular frequency, not the period, and $8\\pi$ multiplies by $\\omega$ where you should divide: a larger $\\omega$ means faster oscillation and a shorter period. The $3$ and the $+1$ change the amplitude and the midline, not the period.',
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
              prompt: `Solve each equation exactly. Watch the domains carefully in (c) and (d).`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$3^{2x-1}=27$`, answer: `$27=3^3$, so $2x-1=3$ and $x=2$.` },
                { prompt: `$e^{2x}-5e^x+6=0$`, answer: `Let $u=e^x$: $u^2-5u+6=(u-2)(u-3)=0$, so $e^x=2$ or $e^x=3$, giving $x=\\ln2$ or $x=\\ln3$. Both are valid, since $2$ and $3$ are positive.` },
                { prompt: `$\\log_2x+\\log_2(x-6)=4$`, answer: `$\\log_2(x(x-6))=4$ gives $x^2-6x-16=(x-8)(x+2)=0$. The original equation needs $x>6$, so $x=-2$ is rejected and $x=8$ is the only solution.` },
                { prompt: `$\\ln(x^2)=2\\ln3$`, answer: `$x^2=9$, so $x=3$ or $x=-3$. Both are valid, because $\\ln(x^2)$ is defined for negative $x$. Rewriting the left side as $2\\ln x$ would wrongly lose $x=-3$.` },
              ],
            },
            {
              slug: 'culture-growth',
              title: 'Fit a growth model',
              prompt: `A bacterial culture has $500$ cells at $t=0$ and $3200$ cells at $t=4$ hours. Assume $N(t)=N_0e^{kt}$, and give values to three significant figures.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find $k$.`, answer: `$500e^{4k}=3200$ gives $e^{4k}=6.4$, so $k=\\dfrac{\\ln6.4}{4}\\approx0.464$ per hour.` },
                { prompt: `Find the doubling time.`, answer: `$e^{kT}=2$ gives $T=\\dfrac{\\ln2}{k}\\approx1.49$ h.` },
                { prompt: `Find the time at which the culture reaches $10\\,000$ cells.`, answer: `$500e^{kt}=10\\,000$ gives $e^{kt}=20$, so $t=\\dfrac{\\ln20}{k}\\approx6.46$ h.` },
              ],
            },
            {
              slug: 'log-laws-proof',
              title: 'Prove the laws',
              prompt: `Using only the definition of the logarithm and the exponent laws, prove each of these laws.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\log_b(xy)=\\log_bx+\\log_by$ for $x,y>0$`, answer: `Let $p=\\log_bx$ and $q=\\log_by$, so $x=b^p$ and $y=b^q$. Then $xy=b^pb^q=b^{p+q}$, and by the definition $\\log_b(xy)=p+q=\\log_bx+\\log_by$.` },
                { prompt: `$\\log_b(x^r)=r\\log_bx$`, answer: `With $x=b^p$, $x^r=(b^p)^r=b^{pr}$, so $\\log_b(x^r)=pr=r\\log_bx$.` },
                { prompt: `The change-of-base formula $\\log_bx=\\ln x/\\ln b$`, answer: `Let $p=\\log_bx$, so $b^p=x$. Take $\\ln$ of both sides and use the previous part: $p\\ln b=\\ln x$. Since $b\\ne1$, $\\ln b\\ne0$, so $p=\\ln x/\\ln b$.` },
              ],
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
          quiz: [
            {
              question: 'A radioactive sample has a half-life of $5$ years. How long does it take for $90\\%$ of it to decay?',
              options: ['$0.76$ years', '$4.5$ years', '$45$ years', '$16.6$ years'],
              answer: 3,
              explanation: 'With $A=A_0e^{-kt}$ and $k=\\ln2/5$, $90\\%$ decayed means $10\\%$ remains: $e^{-kt}=0.1$, so $t=\\dfrac{5\\ln10}{\\ln2}\\approx16.6$ years, a little over three half-lives ($12.5\\%$ remains after three). $0.76$ years is the time for $10\\%$ to decay, which solves $e^{-kt}=0.9$ instead.',
            },
            {
              question: 'Which of these is true for all $x,y>0$?',
              options: ['$\\ln(x+y)=\\ln x+\\ln y$', '$\\ln(xy)=\\ln x\\cdot\\ln y$', '$\\ln(x/y)=\\ln x-\\ln y$', '$\\ln(x^2)=(\\ln x)^2$'],
              answer: 2,
              explanation: 'The logarithm turns products into sums and quotients into differences, so $\\ln(x/y)=\\ln x-\\ln y$. There is no law for $\\ln(x+y)$: at $x=y=1$ the left side is $\\ln2$ and the right side $0$. Likewise $\\ln(xy)$ is a sum, not a product, and $\\ln(x^2)=2\\ln x$, not $(\\ln x)^2$.',
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
              prompt: `Find each inverse and state its domain, remembering that the domain of $f^{-1}$ is the range of $f$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$f(x)=x^3-2$`, answer: `$y=x^3-2$ gives $x=\\sqrt[3]{y+2}$, so $f^{-1}(x)=\\sqrt[3]{x+2}$, defined for all real $x$.` },
                { prompt: `$g(x)=\\sqrt{x-1}+3$ for $x\\ge1$`, answer: `$y-3=\\sqrt{x-1}$, so $x=(y-3)^2+1$. The range of $g$ is $[3,\\infty)$, so $g^{-1}(x)=(x-3)^2+1$ for $x\\ge3$.` },
                { prompt: `$h(x)=e^{2x}+1$`, answer: `$e^{2x}=y-1$ gives $x=\\tfrac12\\ln(y-1)$, so $h^{-1}(x)=\\tfrac12\\ln(x-1)$ for $x>1$.` },
              ],
            },
            {
              slug: 'evaluate-inverse-trig',
              title: 'Inverse trigonometry',
              prompt: `Evaluate (a) to (d) exactly, paying attention to the range of each inverse function, then simplify (e).`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\arccos(-\\tfrac12)$`, answer: `$\\dfrac{2\\pi}{3}$, the angle in $[0,\\pi]$ whose cosine is $-\\tfrac12$.` },
                { prompt: `$\\arctan(-1)$`, answer: `$-\\dfrac{\\pi}{4}$, which lies in $(-\\pi/2,\\pi/2)$.` },
                { prompt: `$\\arcsin(\\sin\\tfrac{5\\pi}{6})$`, answer: `$\\sin\\tfrac{5\\pi}{6}=\\tfrac12$, and the angle in $[-\\pi/2,\\pi/2]$ with sine $\\tfrac12$ is $\\dfrac\\pi6$, not $\\tfrac{5\\pi}{6}$.` },
                { prompt: `$\\sin(\\arccos\\tfrac35)$`, answer: `Let $\\theta=\\arccos\\tfrac35$, which lies in $[0,\\pi]$, where sine is non-negative. Then $\\sin\\theta=\\sqrt{1-\\tfrac{9}{25}}=\\dfrac45$.` },
                { prompt: `Simplify $\\tan(\\arcsin x)$ for $|x|<1$.`, answer: `Let $\\theta=\\arcsin x$, so $\\sin\\theta=x$ and $\\cos\\theta=\\sqrt{1-x^2}>0$. Then $\\tan\\theta=\\dfrac{x}{\\sqrt{1-x^2}}$.` },
              ],
            },
            {
              slug: 'restrict-quadratic',
              title: 'Restrict a domain',
              prompt: `Let $f(x)=x^2-4x+7$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $f$ is not one-to-one on the real line by exhibiting two inputs with the same output.`, answer: `$f(1)=1-4+7=4$ and $f(3)=9-12+7=4$.` },
                { prompt: `Complete the square, restrict $f$ to $x\\ge2$, and find the inverse with its domain.`, answer: `$f(x)=(x-2)^2+3$. On $x\\ge2$ it is increasing, with range $[3,\\infty)$. Solving $y=(x-2)^2+3$ with $x\\ge2$ gives $x=2+\\sqrt{y-3}$, so $f^{-1}(x)=2+\\sqrt{x-3}$ for $x\\ge3$.` },
              ],
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
          quiz: [
            {
              question: 'Let $f(x)=\\dfrac{x-1}{x+2}$. What is $f^{-1}(x)$?',
              options: ['$\\dfrac{2x+1}{1-x}$', '$\\dfrac{x+2}{x-1}$', '$\\dfrac{2x+1}{x-1}$', '$\\dfrac{x+1}{2-x}$'],
              answer: 0,
              explanation: 'From $y(x+2)=x-1$, collect the $x$ terms: $x(y-1)=-1-2y$, so $x=\\dfrac{2y+1}{1-y}$. Check: $f(0)=-\\tfrac12$, and $\\dfrac{2(-1/2)+1}{1+1/2}=0$. The option $\\dfrac{x+2}{x-1}$ is $1/f(x)$: the notation $f^{-1}$ means the inverse function, not the reciprocal.',
            },
            {
              question: 'What is $\\arccos\\left(\\cos\\tfrac{5\\pi}{3}\\right)$?',
              options: ['$5\\pi/3$', '$\\pi/3$', '$-\\pi/3$', '$\\tfrac12$'],
              answer: 1,
              explanation: 'Arccosine returns an angle in $[0,\\pi]$. Since $\\cos\\tfrac{5\\pi}{3}=\\tfrac12$, the answer is the angle in $[0,\\pi]$ with cosine $\\tfrac12$, which is $\\pi/3$. The functions do not simply cancel, because $5\\pi/3$ lies outside that range. $-\\pi/3$ is outside it too: it comes from the range of arcsine, $[-\\pi/2,\\pi/2]$.',
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
              prompt: `Let $f(x)=\\dfrac{2^x-1}{x}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                {
                  prompt: `Tabulate $f(x)$ at $x=\\pm0.1,\\ \\pm0.01,\\ \\pm0.001$ and estimate $\\lim_{x\\to0}f(x)$ to three decimal places.`,
                  answer: `$f(\\pm0.1)\\approx 0.71773,\\ 0.66967$; $f(\\pm0.01)\\approx 0.69556,\\ 0.69075$; $f(\\pm0.001)\\approx 0.69339,\\ 0.69291$. Both sides close in on $0.693$. (In Module 4 you will see that the exact value is $\\ln 2$.)`,
                },
                {
                  prompt: `Why does $f(0)$ itself tell you nothing about this limit?`,
                  answer: `$f(0)$ is undefined: the formula gives $0/0$. A limit never uses the value at the point anyway, only the values near it.`,
                },
              ],
            },
            {
              slug: 'piecewise-limits',
              title: 'One-sided limits',
              prompt: `Let $f(x)=x^2$ for $x<2$, $f(2)=1$, and $f(x)=8-2x$ for $x>2$, and let $g(x)=\\dfrac{x^2-x}{|x-1|}$. Find:`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\lim_{x\\to2^-}f(x)$`, answer: `$4$ (use $x^2$ from the left).` },
                { prompt: `$\\lim_{x\\to2^+}f(x)$`, answer: `$4$ (use $8-2x$ from the right).` },
                { prompt: `$\\lim_{x\\to2}f(x)$`, answer: `$4$, because both one-sided limits are $4$. The value $f(2)=1$ does not matter.` },
                { prompt: `Both one-sided limits of $g$ at $x=1$. Does $\\lim_{x\\to1}g(x)$ exist?`, answer: `$x^2-x=x(x-1)$, so $g(x)=x$ for $x>1$ and $g(x)=-x$ for $x<1$. The right limit is $1$ and the left limit is $-1$, so the two-sided limit does not exist.` },
              ],
            },
            {
              slug: 'average-to-instant',
              title: 'From average to instantaneous velocity',
              prompt: `A cart has position $s(t)=t^2+3t$ metres.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Simplify the average velocity over $[1,1+h]$ as an expression in $h$.`, answer: `$\\dfrac{s(1+h)-s(1)}{h}=\\dfrac{(1+h)^2+3(1+h)-4}{h}=\\dfrac{5h+h^2}{h}=5+h$ m/s.` },
                { prompt: `Use it to find the instantaneous velocity at $t=1$, with units.`, answer: `As $h\\to0$, $5+h\\to5$, so the velocity is $5$ m/s.` },
              ],
            },
            {
              slug: 'oscillation',
              title: 'A limit that oscillates',
              prompt: `Show that $\\lim_{x\\to0}\\sin(\\pi/x)$ does not exist.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Find a sequence of $x$ values approaching $0$ on which $\\sin(\\pi/x)=0$.`, answer: `$x=1/n$ for positive integers $n$: then $\\pi/x=n\\pi$ and $\\sin(n\\pi)=0$.` },
                { prompt: `Find another sequence approaching $0$ on which $\\sin(\\pi/x)=1$.`, answer: `$x=\\dfrac{2}{4n+1}$: then $\\pi/x=2n\\pi+\\dfrac{\\pi}{2}$, where sine is $1$.` },
                { prompt: `Explain why this rules out every candidate value $L$.`, answer: `If the limit were $L$, $\\sin(\\pi/x)$ would approach $L$ along every sequence tending to $0$. Along the first it approaches $0$ and along the second $1$, so $L$ would have to equal both, which is impossible.` },
              ],
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
          quiz: [
            {
              question: 'A stone falls $s(t)=4.9t^2$ metres. Its average velocity over $[3,3+h]$ simplifies to $29.4+4.9h$. What is its instantaneous velocity at $t=3$?',
              options: ['$29.4$ m/s', '$34.3$ m/s', '$44.1$ m/s', 'Undefined, because setting $h=0$ gives $0/0$'],
              answer: 0,
              explanation: 'As $h\\to0$, $29.4+4.9h\\to29.4$ m/s. $34.3$ is the average over $[3,4]$ ($h=1$), and $44.1$ is the distance fallen, $s(3)$. The fraction is $0/0$ at $h=0$, but the limit as $h\\to0$ still exists.',
            },
            {
              question: 'Let $f(x)=x^2$ for $x<3$, $f(3)=0$, and $f(x)=2x+3$ for $x>3$. What is $\\lim_{x\\to3}f(x)$?',
              options: ['$0$', '$9$', 'It does not exist, because $f(3)$ differs from the nearby values', 'It does not exist, because the one-sided limits differ'],
              answer: 1,
              explanation: 'From the left $x^2\\to9$ and from the right $2x+3\\to9$. The one-sided limits agree, so the limit is $9$. The value $f(3)=0$ is irrelevant: a limit only looks at $x$ near $3$, never at $3$ itself.',
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
              prompt: `Evaluate each limit. In each case, first confirm that direct substitution gives the indeterminate form $0/0$, then remove it.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\lim_{x\\to2}\\dfrac{x^2-5x+6}{x^2-4}$`, answer: `Factor: $\\dfrac{(x-2)(x-3)}{(x-2)(x+2)}=\\dfrac{x-3}{x+2}\\to-\\dfrac14$.` },
                { prompt: `$\\lim\\limits_{x\\to3}\\dfrac{\\frac1x-\\frac13}{x-3}$`, answer: `Combine the fractions: $\\dfrac1x-\\dfrac13=\\dfrac{3-x}{3x}$, so the quotient is $-\\dfrac{1}{3x}\\to-\\dfrac19$.` },
                { prompt: `$\\lim\\limits_{x\\to4}\\dfrac{\\sqrt{x+5}-3}{x-4}$`, answer: `Multiply by the conjugate: $\\dfrac{(x+5)-9}{(x-4)(\\sqrt{x+5}+3)}=\\dfrac{1}{\\sqrt{x+5}+3}\\to\\dfrac16$.` },
                { prompt: `$\\lim_{h\\to0}\\dfrac{(2+h)^3-8}{h}$`, answer: `$(2+h)^3-8=12h+6h^2+h^3$, so the quotient is $12+6h+h^2\\to12$.` },
              ],
            },
            {
              slug: 'trig-limits',
              title: 'Trigonometric limits',
              prompt: `Evaluate each limit using the key trigonometric limit $\\lim_{\\theta\\to0}\\sin\\theta/\\theta=1$ or the squeeze theorem.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\lim_{x\\to0}\\dfrac{\\sin4x}{\\sin7x}$`, answer: `$\\dfrac{\\sin4x}{\\sin7x}=\\dfrac{\\sin4x}{4x}\\cdot\\dfrac{7x}{\\sin7x}\\cdot\\dfrac47\\to\\dfrac47$.` },
                { prompt: `$\\lim_{x\\to0}\\dfrac{\\tan x}{x}$`, answer: `$\\dfrac{\\tan x}{x}=\\dfrac{\\sin x}{x}\\cdot\\dfrac{1}{\\cos x}\\to1\\cdot1=1$.` },
                { prompt: `$\\lim_{x\\to0}\\dfrac{1-\\cos x}{x^2}$`, answer: `Multiply top and bottom by $1+\\cos x$: $\\dfrac{1-\\cos^2x}{x^2(1+\\cos x)}=\\left(\\dfrac{\\sin x}{x}\\right)^2\\dfrac{1}{1+\\cos x}\\to\\dfrac12$.` },
                { prompt: `$\\lim_{x\\to0}x\\sin(1/x)$`, answer: `Use the squeeze theorem: $-|x|\\le x\\sin(1/x)\\le|x|$ for $x\\ne0$, and both bounds tend to $0$, so the limit is $0$.` },
              ],
            },
            {
              slug: 'limit-proofs',
              title: 'Proofs and counterexamples',
              prompt: `Prove one limit from the key trigonometric limit, then build a counterexample that tests what the product law says.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $\\lim_{\\theta\\to0}\\dfrac{1-\\cos\\theta}{\\theta}=0$ from $\\lim_{\\theta\\to0}\\sin\\theta/\\theta=1$.`, answer: `Multiply by $\\dfrac{1+\\cos\\theta}{1+\\cos\\theta}$: $\\dfrac{1-\\cos\\theta}{\\theta}=\\dfrac{\\sin^2\\theta}{\\theta(1+\\cos\\theta)}=\\dfrac{\\sin\\theta}{\\theta}\\cdot\\dfrac{\\sin\\theta}{1+\\cos\\theta}$. The first factor tends to $1$ and the second to $0/2=0$, so by the product law the limit is $0$.` },
                { prompt: `Give functions $f,g$ such that $\\lim_{x\\to0}f(x)g(x)$ exists while neither $\\lim_{x\\to0}f$ nor $\\lim_{x\\to0}g$ does.`, answer: `Take $f(x)=g(x)=\\dfrac{|x|}{x}$. Each is $-1$ for $x<0$ and $1$ for $x>0$, so neither has a limit at $0$. But $f(x)g(x)=1$ for every $x\\ne0$, so the product tends to $1$.` },
                { prompt: `Explain why this does not contradict the product law.`, answer: `The product law assumes that both limits exist, and then gives the limit of the product. It says nothing when they do not exist, so a product can have a limit even though its factors have none.` },
              ],
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
          quiz: [
            {
              question: 'Evaluate $\\lim_{x\\to9}\\dfrac{x-9}{\\sqrt{x}-3}$.',
              options: ['$\\tfrac16$', '$0$', '$6$', 'It does not exist, because substitution gives $0/0$'],
              answer: 2,
              explanation: 'Substitution gives $0/0$, which only says that more work is needed. Factor $x-9=(\\sqrt x-3)(\\sqrt x+3)$, so the quotient is $\\sqrt x+3\\to6$. $\\tfrac16$ is the limit of the reciprocal, $\\dfrac{\\sqrt x-3}{x-9}$, and $0/0$ is indeterminate, not a sign that the limit fails to exist.',
            },
            {
              question: 'Which argument correctly finds $\\lim_{x\\to0}x^4\\cos(2/x)$?',
              options: [
                'Squeeze it between $-x^4$ and $x^4$, so the limit is $0$',
                'The product law: $\\lim x^4=0$ times $\\lim\\cos(2/x)$ gives $0$',
                'The limit does not exist, because $\\cos(2/x)$ has no limit at $0$',
                'Substitute $x=0$ to get $0\\cdot\\cos(\\infty)=0$',
              ],
              answer: 0,
              explanation: 'Since $-1\\le\\cos(2/x)\\le1$, we have $-x^4\\le x^4\\cos(2/x)\\le x^4$, and both bounds tend to $0$, so the limit is $0$. The product law gives the right number here only by luck: it needs both limits to exist, and $\\lim_{x\\to0}\\cos(2/x)$ does not. A factor with no limit does not stop the product from having one.',
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
              prompt: `Evaluate each limit, or say that it is infinite, by dividing through by a power of $x$ or by using a conjugate.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\lim_{x\\to\\infty}\\dfrac{3x^2-x}{2x^2+5}$`, answer: `Divide by $x^2$: $\\dfrac{3-1/x}{2+5/x^2}\\to\\dfrac32$.` },
                { prompt: `$\\lim_{x\\to-\\infty}\\dfrac{x+1}{x^2+1}$`, answer: `Divide by $x^2$: $\\dfrac{1/x+1/x^2}{1+1/x^2}\\to0$.` },
                { prompt: `$\\lim_{x\\to\\infty}\\dfrac{x^3}{x^2+1}$`, answer: `Divide by $x^2$: $\\dfrac{x}{1+1/x^2}$, which grows without bound, so the limit is $\\infty$.` },
                { prompt: `$\\lim\\limits_{x\\to-\\infty}\\dfrac{\\sqrt{9x^2+x}}{x}$`, answer: `For $x<0$, $\\sqrt{x^2}=-x$, so $\\sqrt{9x^2+x}=-x\\sqrt{9+1/x}$ and the quotient is $-\\sqrt{9+1/x}\\to-3$.` },
                { prompt: `$\\lim_{x\\to\\infty}(\\sqrt{x^2+6x}-x)$`, answer: `Multiply by the conjugate: $\\dfrac{6x}{\\sqrt{x^2+6x}+x}=\\dfrac{6}{\\sqrt{1+6/x}+1}\\to3$.` },
              ],
            },
            {
              slug: 'all-asymptotes',
              title: 'Holes and asymptotes',
              prompt: `Let $f(x)=\\dfrac{x^2-1}{x^2-3x+2}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Factor, and find any hole together with the limit there.`, answer: `$f(x)=\\dfrac{(x-1)(x+1)}{(x-1)(x-2)}=\\dfrac{x+1}{x-2}$ for $x\\ne1$. There is a hole at $x=1$, where the limit is $\\dfrac{2}{-1}=-2$.` },
                { prompt: `Find every vertical asymptote, and give both one-sided limits at each.`, answer: `Only $x=2$. The numerator is near $3$ there, so $f\\to+\\infty$ as $x\\to2^+$ and $f\\to-\\infty$ as $x\\to2^-$.` },
                { prompt: `Find every horizontal asymptote.`, answer: `$f\\to1$ as $x\\to\\pm\\infty$ (divide top and bottom by $x$ after cancelling), so the only one is $y=1$.` },
              ],
            },
            {
              slug: 'terminal-velocity',
              title: 'A physical limit',
              prompt: `With air resistance proportional to velocity, a falling object can have speed $v(t)=v_T(1-e^{-t/\\tau})$, where $v_T,\\tau>0$ are constants.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find $\\lim_{t\\to\\infty}v(t)$ and say what it means physically.`, answer: `$e^{-t/\\tau}\\to0$, so $v(t)\\to v_T$. This is the terminal velocity: the speed rises towards $v_T$, as drag comes to balance gravity, and never exceeds it.` },
                { prompt: `Taking $v_T=50$ m/s and $\\tau=5$ s, find the time at which the speed reaches $99\\%$ of the limit.`, answer: `$1-e^{-t/5}=0.99$ gives $e^{-t/5}=0.01$, so $t=5\\ln100\\approx23.0$ s.` },
              ],
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
          quiz: [
            {
              question: 'What is $\\lim_{x\\to-\\infty}\\dfrac{2x-1}{\\sqrt{x^2+4}}$?',
              options: ['$2$', '$0$', '$-\\infty$', '$-2$'],
              answer: 3,
              explanation: 'For $x<0$, $\\sqrt{x^2}=|x|=-x$, so $\\sqrt{x^2+4}=-x\\sqrt{1+4/x^2}$ and the quotient is $\\dfrac{2-1/x}{-\\sqrt{1+4/x^2}}\\to-2$. The answer $2$ comes from writing $\\sqrt{x^2}=x$, which is true only for $x\\ge0$. A quick sanity check: for large negative $x$ the top is negative and the bottom positive.',
            },
            {
              question: 'What happens to $f(x)=\\dfrac{x^2-9}{x^2-x-6}$ at $x=3$ and at $x=-2$?',
              options: [
                'Vertical asymptotes at both $x=3$ and $x=-2$',
                'A hole at $x=3$ and a vertical asymptote at $x=-2$',
                'A vertical asymptote at $x=3$ and a hole at $x=-2$',
                'Holes at both, because $f$ is undefined at both',
              ],
              answer: 1,
              explanation: 'Factor first: $f(x)=\\dfrac{(x-3)(x+3)}{(x-3)(x+2)}=\\dfrac{x+3}{x+2}$ for $x\\ne3$. The factor $x-3$ cancels, so $x=3$ is a hole, where the limit is $\\tfrac65$. The factor $x+2$ does not cancel and the numerator is $1\\ne0$ there, so $x=-2$ is a vertical asymptote. A zero of the denominator alone does not make an asymptote.',
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
              prompt: `Find each discontinuity of these functions and classify it as removable, jump or infinite.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\dfrac{x^2-x-2}{x-2}$`, answer: `Removable at $x=2$: the function equals $x+1$ for $x\\ne2$, so the limit there is $3$, but $f(2)$ is undefined.` },
                { prompt: `$1/(x+1)^2$`, answer: `Infinite at $x=-1$: the function tends to $+\\infty$ from both sides.` },
                { prompt: `$\\lfloor x\\rfloor$, the greatest integer function`, answer: `A jump at every integer $n$: the left limit is $n-1$ and the right limit is $n$.` },
                { prompt: `$f(x)=\\dfrac{\\sin x}{x}$ for $x\\ne0$, with $f(0)=2$`, answer: `Removable at $x=0$: the limit is $1$, but $f(0)=2$. Redefining $f(0)=1$ makes $f$ continuous.` },
              ],
            },
            {
              slug: 'match-pieces',
              title: 'Choose constants',
              prompt: `Find $a$ and $b$ so that $f$ is continuous everywhere: $f(x)=2x$ for $x<1$, $f(x)=ax+b$ for $1\\le x<2$, and $f(x)=x^2+1$ for $x\\ge2$.`,
              kind: 'problem',
              difficulty: 2,
              answer: `Each piece is a polynomial, so only $x=1$ and $x=2$ need checking. Matching at $1$: $a+b=2$. Matching at $2$: $2a+b=2^2+1=5$. Subtracting, $a=3$, and then $b=-1$.`,
            },
            {
              slug: 'ivt-applications',
              title: 'Use the IVT',
              prompt: `Use the intermediate value theorem in each part, and check its hypotheses each time.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $\\cos x=x$ has a solution in $[0,\\pi/2]$, and trap it in an interval of width at most $0.1$ by bisection.`, answer: `Use $f(x)=\\cos x-x$, which is continuous, with $f(0)=1>0$ and $f(\\pi/2)=-\\pi/2<0$, so the IVT gives a root. Bisecting: $f(0.785)<0$, $f(0.393)>0$, $f(0.589)>0$, $f(0.687)>0$, so the root lies in $(0.687,0.785)$, of width $\\pi/16\\approx0.098$. (The root is $0.739\\ldots$)` },
                { prompt: `Show that $x^5-3x+1=0$ has at least three real roots.`, answer: `Let $p(x)=x^5-3x+1$, a polynomial and so continuous. Evaluate: $p(-2)=-25$, $p(0)=1$, $p(1)=-1$, $p(2)=27$. The sign changes on $(-2,0)$, $(0,1)$ and $(1,2)$, so the IVT gives a root in each of these three separate intervals.` },
                { prompt: `A hiker walks up a mountain from 6 am to 6 pm one day, and down the same path from 6 am to 6 pm the next. Prove that there is a time of day at which the hiker was at the same spot on both days.`, answer: `Let $u(t)$ and $d(t)$ be the distances along the path from the bottom at time $t$ on the first and second days, both continuous, and let $L$ be the length of the path. Then $D(t)=u(t)-d(t)$ is continuous, with $D=0-L<0$ at 6 am and $D=L-0>0$ at 6 pm. By the IVT, $D(t)=0$ at some time $t$, when the hiker is at the same spot on both days.` },
              ],
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
          quiz: [
            {
              question: 'For which $k$ is $f(x)=kx^2$ for $x\\le2$, $f(x)=3x+k$ for $x>2$, continuous everywhere?',
              options: ['$\\tfrac65$', '$2$', '$\\tfrac34$', 'No value of $k$ works'],
              answer: 1,
              explanation: 'Only $x=2$ needs checking. The value and left limit are $4k$, and the right limit is $6+k$. Setting $4k=6+k$ gives $k=2$, when both equal $8$. The value $\\tfrac34$ matches the slopes $4k$ and $3$ instead, which differentiability would also need; continuity only needs the values to meet.',
            },
            {
              question: '$f$ is continuous on $[0,4]$, with $f(0)=3$ and $f(4)=-1$. Which statement must be true?',
              options: ['$f$ has exactly one root in $(0,4)$', '$f(2)=1$', '$f(c)=2$ for some $c$ in $(0,4)$', '$f$ is decreasing on $[0,4]$'],
              answer: 2,
              explanation: 'Since $2$ lies between $f(4)=-1$ and $f(0)=3$, the IVT gives some $c$ in $(0,4)$ with $f(c)=2$. It guarantees at least one such point, not exactly one, so the graph might cross zero three times. Nor does it say where a value occurs, so $f(2)$ need not be the average $1$, and $f$ need not be decreasing.',
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
              prompt: `Find or test a value of $\\delta$ for a given $\\varepsilon$, for two limits that are proved in the lesson.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `For $\\lim_{x\\to2}(3x+1)=7$ and $\\varepsilon=0.01$, give a value of $\\delta$ that works.`, answer: `$|(3x+1)-7|=3|x-2|<0.01$ when $|x-2|<0.01/3$. Any $\\delta\\le0.01/3\\approx0.00333$ works, for example $\\delta=0.003$.` },
                { prompt: `For $\\lim_{x\\to2}x^2=4$, is $\\delta=0.01$ enough when $\\varepsilon=0.05$? Use the bound in the lesson to decide.`, answer: `Yes. The lesson's proof uses $\\delta=\\min(1,\\varepsilon/5)=\\min(1,0.01)=0.01$: if $|x-2|<0.01$ then $|x+2|<5$, so $|x^2-4|<5(0.01)=0.05$.` },
                { prompt: `Check your answer to the previous part with $x=2.01$ and $x=1.99$.`, answer: `$2.01^2=4.0401$, an error of $0.0401$, and $1.99^2=3.9601$, an error of $0.0399$. Both are below $0.05$, even at the edges of the window.` },
              ],
            },
            {
              slug: 'linear-proof',
              title: 'A linear proof',
              prompt: `Write a complete epsilon-delta proof that $\\lim_{x\\to1}(5-2x)=3$, showing your scratch work first and then the forward proof.`,
              kind: 'derivation',
              difficulty: 1,
              answer: `*Scratch work:* $|(5-2x)-3|=|2-2x|=2|x-1|$, so $\\delta=\\varepsilon/2$ should work.

*Proof.* Let $\\varepsilon>0$ and set $\\delta=\\varepsilon/2$. If $0<|x-1|<\\delta$, then $|(5-2x)-3|=2|x-1|<2\\delta=\\varepsilon$. $\\blacksquare$`,
            },
            {
              slug: 'nonlinear-proofs',
              title: 'Nonlinear proofs',
              prompt: `Write complete epsilon-delta proofs of these two limits, with scratch work and then the forward proof.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                {
                  prompt: `$\\lim_{x\\to3}x^2=9$`,
                  answer: `*Scratch work:* $|x^2-9|=|x-3|\\,|x+3|$. If $\\delta\\le1$, then $2<x<4$, so $|x+3|<7$.

*Proof.* Let $\\varepsilon>0$ and set $\\delta=\\min(1,\\varepsilon/7)$. If $0<|x-3|<\\delta$, then $|x+3|<7$ and $|x-3|<\\varepsilon/7$, so $|x^2-9|<\\dfrac{\\varepsilon}{7}\\cdot7=\\varepsilon$. $\\blacksquare$`,
                },
                {
                  prompt: `$\\lim_{x\\to4}\\sqrt{x}=2$`,
                  answer: `*Scratch work:* $|\\sqrt x-2|=\\dfrac{|x-4|}{\\sqrt x+2}\\le\\dfrac{|x-4|}{2}$ for $x\\ge0$. Keeping $\\delta\\le4$ makes $x>0$, so that $\\sqrt x$ is defined.

*Proof.* Let $\\varepsilon>0$ and set $\\delta=\\min(4,2\\varepsilon)$. If $0<|x-4|<\\delta$, then $x>0$ and $|\\sqrt x-2|\\le\\dfrac{|x-4|}{2}<\\dfrac{2\\varepsilon}{2}=\\varepsilon$. $\\blacksquare$`,
                },
              ],
            },
            {
              slug: 'no-limit-proof',
              title: 'Prove that a limit does not exist',
              prompt: `Let $f(x)=x/|x|$ for $x\\ne0$. Prove from the definition that $\\lim_{x\\to0}f(x)$ does not exist, for any candidate $L$.`,
              kind: 'derivation',
              difficulty: 3,
              answer: `Take $\\varepsilon=\\tfrac12$. Let $L$ be any number and $\\delta>0$ any window. The points $x=\\delta/2$ and $x=-\\delta/2$ both satisfy $0<|x|<\\delta$, and there $f=1$ and $f=-1$. If both values were within $\\tfrac12$ of $L$, then $2=|1-(-1)|\\le|1-L|+|L+1|<\\tfrac12+\\tfrac12=1$, which is false. So no $\\delta$ works for this $\\varepsilon$, and $L$ is not the limit. Since $L$ was arbitrary, the limit does not exist.`,
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
          quiz: [
            {
              question: 'For $\\lim_{x\\to1}(4x-3)=1$ and $\\varepsilon=0.02$, what is the largest $\\delta$ that works?',
              options: ['$0.005$', '$0.08$', '$0.02$', '$0.01$'],
              answer: 0,
              explanation: '$|(4x-3)-1|=4|x-1|$, which is below $0.02$ exactly when $|x-1|<0.005$, so $\\delta=\\varepsilon/4=0.005$, and any smaller $\\delta$ also works. Multiplying instead, $\\delta=4\\varepsilon=0.08$, gets the direction wrong: a steeper line needs a narrower window, not a wider one.',
            },
            {
              question: 'Which statement is the definition of $\\lim_{x\\to a}f(x)=L$?',
              options: [
                'There is a $\\delta>0$ such that for every $\\varepsilon>0$, $0<|x-a|<\\delta$ implies $|f(x)-L|<\\varepsilon$',
                'For every $\\varepsilon>0$ there is a $\\delta>0$ such that $|f(x)-L|<\\varepsilon$ implies $0<|x-a|<\\delta$',
                'For every $\\delta>0$ there is an $\\varepsilon>0$ such that $0<|x-a|<\\delta$ implies $|f(x)-L|<\\varepsilon$',
                'For every $\\varepsilon>0$ there is a $\\delta>0$ such that $0<|x-a|<\\delta$ implies $|f(x)-L|<\\varepsilon$',
              ],
              answer: 3,
              explanation: 'The tolerance $\\varepsilon$ comes first and is arbitrary, $\\delta$ answers it, and closeness of $x$ to $a$ must force closeness of $f(x)$ to $L$. Swapping the quantifiers, so that one $\\delta$ serves every $\\varepsilon$, forces $f(x)=L$ exactly near $a$, which is far too strong. Exchanging the roles of $\\varepsilon$ and $\\delta$ gives a statement true of every bounded function, and reversing the implication says something else entirely.',
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
              prompt: `Use the limit definition to find $f'(a)$, then write the equation of the tangent line at $a$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$f(x)=1/x$ at $a=2$`, answer: `$\\dfrac{\\frac{1}{2+h}-\\frac12}{h}=\\dfrac{-1}{2(2+h)}\\to-\\dfrac14$. With $f(2)=\\tfrac12$ the tangent is $y=\\tfrac12-\\tfrac14(x-2)$, that is, $y=-\\tfrac x4+1$.` },
                { prompt: `$f(x)=\\sqrt{x}$ at $a=9$`, answer: `Using the conjugate, $\\dfrac{\\sqrt{9+h}-3}{h}=\\dfrac{1}{\\sqrt{9+h}+3}\\to\\dfrac16$. With $f(9)=3$ the tangent is $y=3+\\tfrac16(x-9)$, that is, $y=\\tfrac x6+\\tfrac32$.` },
                { prompt: `$f(x)=x^3$ at $a=-1$`, answer: `$\\dfrac{(-1+h)^3+1}{h}=3-3h+h^2\\to3$. With $f(-1)=-1$ the tangent is $y=-1+3(x+1)$, that is, $y=3x+2$.` },
              ],
            },
            {
              slug: 'read-units',
              title: 'Read the units',
              prompt: `State the units and the meaning of each derivative in a sentence.`,
              kind: 'writing',
              difficulty: 1,
              parts: [
                { prompt: `$P(t)$ is the population of a town in thousands, $t$ in years, and $P'(5)=1.2$.`, answer: `Thousands of people per year. At $t=5$ the population is growing at $1.2$ thousand, about $1200$ people, per year.` },
                { prompt: `$C(q)$ is the cost in dollars of making $q$ kilograms of a product, and $C'(100)=4$.`, answer: `Dollars per kilogram. When $100$ kg are being made, each extra kilogram costs about $4$ dollars.` },
                { prompt: `$\\rho(x)$ is the density of the air in $\\text{kg/m}^3$ at altitude $x$ in metres, and $\\rho'(1000)=-0.0001$.`, answer: `$\\text{kg/m}^3$ per metre. At an altitude of $1000$ m the density is falling by about $0.0001\\ \\text{kg/m}^3$ for each metre of climb.` },
              ],
            },
            {
              slug: 'throw-from-roof',
              title: 'A stone from a roof',
              prompt: `A stone is thrown upward from a $25$ m roof, with height $s(t)=25+10t-4.9t^2$ metres. Give answers to three significant figures.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `From the definition of the derivative, find $v(t)$.`, answer: `$\\dfrac{s(t+h)-s(t)}{h}=\\dfrac{10h-9.8th-4.9h^2}{h}=10-9.8t-4.9h\\to10-9.8t$, so $v(t)=10-9.8t$ m/s.` },
                { prompt: `Find the maximum height.`, answer: `$v=0$ at $t=10/9.8\\approx1.02$ s, where $s\\approx25+10.20-5.10\\approx30.1$ m.` },
                { prompt: `Find the time it hits the ground and its speed on impact.`, answer: `$4.9t^2-10t-25=0$ has positive root $t=\\dfrac{10+\\sqrt{590}}{9.8}\\approx3.50$ s. Then $v=10-9.8t\\approx-24.3$ m/s, so the impact speed is about $24.3$ m/s.` },
              ],
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
          quiz: [
            {
              question: 'What is the tangent line to $f(x)=x^2+4x$ at $x=1$?',
              options: ['$y=6x+5$', '$y=5x+1$', '$y=2x+4$', '$y=6x-1$'],
              answer: 3,
              explanation: '$f\'(1)=\\lim_{h\\to0}\\dfrac{(1+h)^2+4(1+h)-5}{h}=\\lim_{h\\to0}(6+h)=6$ and $f(1)=5$, so $y=5+6(x-1)=6x-1$. Writing $y=6x+5$ uses the height of the point as the $y$-intercept, but the line must pass through $(1,5)$, and $6(1)+5=11$. $y=5x+1$ swaps the value and the slope, and $y=2x+4$ is the derivative function $f\'(x)$ itself, not a line through the point.',
            },
            {
              question: 'A tank holds $V(t)$ litres at time $t$ minutes, with $V(10)=500$ and $V\'(10)=-8$. Which statement is correct?',
              options: [
                'At $t=10$ the tank holds $500$ L and is draining at $8$ L per minute',
                'Over the first $10$ minutes the tank lost $8$ L',
                'The tank will certainly be empty $62.5$ minutes later',
                'At $t=10$ the volume is $-8$ L, so the data must be wrong',
              ],
              answer: 0,
              explanation: '$V(10)$ is the amount and $V\'(10)$ the rate at that instant, in litres per minute; the negative sign means the volume is falling. The derivative says nothing about the total change since $t=0$, and $500/8=62.5$ minutes to empty assumes that the rate stays at $8$ L/min, which a derivative at one instant does not promise.',
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
              prompt: `Find $f'(x)$ from the limit definition, showing the algebra of each difference quotient.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$f(x)=2x^2-5x$`, answer: `$f(x+h)-f(x)=4xh+2h^2-5h$, so the quotient is $4x+2h-5\\to4x-5$.` },
                { prompt: `$f(x)=\\dfrac{1}{x+1}$`, answer: `$\\dfrac{1}{x+h+1}-\\dfrac{1}{x+1}=\\dfrac{-h}{(x+h+1)(x+1)}$, so the quotient is $\\dfrac{-1}{(x+h+1)(x+1)}\\to-\\dfrac{1}{(x+1)^2}$.` },
                { prompt: `$f(x)=\\sqrt{2x+1}$`, answer: `Multiply by the conjugate: $\\dfrac{(2x+2h+1)-(2x+1)}{h(\\sqrt{2x+2h+1}+\\sqrt{2x+1})}=\\dfrac{2}{\\sqrt{2x+2h+1}+\\sqrt{2x+1}}\\to\\dfrac{1}{\\sqrt{2x+1}}$.` },
              ],
            },
            {
              slug: 'where-differentiable',
              title: 'Where does it fail?',
              prompt: `Decide where each function fails to be differentiable, and name the failure.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$|x^2-4|$`, answer: `Corners at $x=-2$ and $x=2$, where $x^2-4$ changes sign. At each of them the one-sided slopes are $-4$ and $4$.` },
                { prompt: `$f(x)=x^2$ for $x\\le1$ and $f(x)=2x-1$ for $x>1$`, answer: `Differentiable everywhere. At $x=1$ both pieces have the value $1$, and both one-sided slopes are $2$.` },
                { prompt: `$g(x)=x^2$ for $x\\le1$ and $g(x)=2x$ for $x>1$`, answer: `Not differentiable at $x=1$, because $g$ is not even continuous there: $g(1)=1$ but the right limit is $2$. The two pieces both have slope $2$ near $x=1$, which looks close, but a jump rules out a derivative.` },
                { prompt: `$(x-3)^{1/3}$`, answer: `A vertical tangent at $x=3$: the derivative $\\tfrac13(x-3)^{-2/3}$ grows without bound there from both sides.` },
              ],
            },
            {
              slug: 'sketch-derivative',
              title: 'Sketch a derivative',
              prompt: `In the Calculus Grapher, or on paper, draw $f$ with a local maximum at $x=-1$, a local minimum at $x=2$, and a corner at $x=4$. Sketch $f'$ underneath it, on the same horizontal scale, and mark:`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `the zeros of $f'$`, answer: `$f'=0$ at $x=-1$ and $x=2$, the horizontal tangents. (Your $f$ may have others, but these two must be there.)` },
                { prompt: `the intervals where $f'$ is positive and where it is negative`, answer: `You should find $f'>0$ to the left of $-1$, $f'<0$ between $-1$ and $2$, and $f'>0$ just after $2$, as the graph climbs out of the minimum. Further right it depends on the $f$ you drew.` },
                { prompt: `what happens to $f'$ at $x=4$`, answer: `$f'(4)$ does not exist. The two sides of the corner have different slopes, so the graph of $f'$ jumps at $x=4$, with a gap between the two heights.` },
              ],
            },
            {
              slug: 'even-derivative',
              title: 'A function differentiable only once',
              prompt: `Let $f(x)=x|x|$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Using one-sided limits, show that $f'(0)$ exists.`, answer: `$\\dfrac{f(h)-f(0)}{h}=\\dfrac{h|h|}{h}=|h|\\to0$ from both sides, so $f'(0)=0$.` },
                { prompt: `Find $f'(x)$ for all $x$.`, answer: `$f(x)=x^2$ for $x\\ge0$ and $-x^2$ for $x<0$, so $f'(x)=2x$ for $x>0$ and $-2x$ for $x<0$. With $f'(0)=0$, this is $f'(x)=2|x|$ for all $x$.` },
                { prompt: `Is $f'$ differentiable at $0$? Explain.`, answer: `No. $f'(x)=2|x|$ has a corner at $0$, with one-sided slopes $-2$ and $2$. So $f$ can be differentiated once at $0$, but not twice.` },
              ],
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
          quiz: [
            {
              question: 'From the limit definition, what is $f\'(x)$ for $f(x)=\\dfrac{3}{x}$?',
              options: ['$\\dfrac{3}{x^2}$', '$-\\dfrac{1}{3x^2}$', '$-\\dfrac{3}{x^2}$', '$0$, because $3$ is a constant'],
              answer: 2,
              explanation: '$\\dfrac{3}{x+h}-\\dfrac3x=\\dfrac{-3h}{x(x+h)}$, so the difference quotient is $\\dfrac{-3}{x(x+h)}\\to-\\dfrac{3}{x^2}$. The sign must be negative, because $3/x$ decreases on each side of $0$. A derivative of $0$ would need the whole function to be constant, not just its numerator.',
            },
            {
              question: 'Which statement is true?',
              options: [
                'If $f$ is continuous at $a$, then $f$ is differentiable at $a$',
                'If $f$ is differentiable at $a$, then $f$ is continuous at $a$',
                'If $f\'(a)$ does not exist, then $f$ is discontinuous at $a$',
                'If $f$ is continuous everywhere, then $f\'$ exists everywhere',
              ],
              answer: 1,
              explanation: 'Differentiable implies continuous: $f(x)-f(a)=\\dfrac{f(x)-f(a)}{x-a}(x-a)\\to f\'(a)\\cdot0=0$. The converse is false. $|x|$ is continuous at $0$ but has a corner there, which also shows that a missing derivative does not mean a discontinuity, and that a function continuous everywhere can fail to have a derivative somewhere.',
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
              prompt: `Differentiate each function, rewriting first where that makes things simpler.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$4x^5-3x^2+7$`, answer: `$20x^4-6x$.` },
                { prompt: `$\\sqrt{x}(x^2+1)$`, answer: `Rewrite as $x^{5/2}+x^{1/2}$. The derivative is $\\tfrac52x^{3/2}+\\tfrac12x^{-1/2}$.` },
                { prompt: `$\\dfrac{x^2-1}{x^2+1}$`, answer: `Quotient rule: $\\dfrac{2x(x^2+1)-(x^2-1)2x}{(x^2+1)^2}=\\dfrac{4x}{(x^2+1)^2}$.` },
                { prompt: `$\\dfrac{3}{x^2}-\\dfrac{5}{\\sqrt[3]{x}}$`, answer: `Rewrite as $3x^{-2}-5x^{-1/3}$. The derivative is $-6x^{-3}+\\tfrac53x^{-4/3}$.` },
                { prompt: `$(x^2+x)(x^3-1)$`, answer: `Multiply out to $x^5+x^4-x^2-x$, or use the product rule: $5x^4+4x^3-2x-1$.` },
                { prompt: `$\\frac{x}{1+\\sqrt{x}}$`, answer: `Quotient rule: $\\dfrac{(1+\\sqrt x)-x\\cdot\\frac{1}{2\\sqrt x}}{(1+\\sqrt x)^2}=\\dfrac{1+\\frac12\\sqrt x}{(1+\\sqrt x)^2}$.` },
              ],
            },
            {
              slug: 'tangent-problems',
              title: 'Horizontal and given-slope tangents',
              prompt: `Find the following tangent lines and points of tangency, using the differentiation rules.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the points on $y=x^3-3x^2-9x+1$ with horizontal tangent lines.`, answer: `$y'=3x^2-6x-9=3(x-3)(x+1)=0$ at $x=-1$ and $x=3$. The points are $(-1,6)$ and $(3,-26)$.` },
                { prompt: `Find the tangent line to $y=\\dfrac{x}{x+1}$ at $x=1$.`, answer: `$y'=\\dfrac{(x+1)-x}{(x+1)^2}=\\dfrac{1}{(x+1)^2}$, so the slope is $\\tfrac14$, and $y(1)=\\tfrac12$. The line is $y=\\tfrac12+\\tfrac14(x-1)$, that is, $y=\\tfrac x4+\\tfrac14$.` },
                { prompt: `Find every point on $y=x^3$ where the tangent line is parallel to $y=12x+5$.`, answer: `Parallel means slope $12$: $3x^2=12$, so $x=\\pm2$. The points are $(2,8)$ and $(-2,-8)$.` },
                { prompt: `Find the two lines through $(0,-4)$ that are tangent to $y=x^2$.`, answer: `The tangent at $x=a$ is $y=a^2+2a(x-a)=2ax-a^2$. It passes through $(0,-4)$ when $-a^2=-4$, so $a=\\pm2$. The lines are $y=4x-4$ and $y=-4x-4$.` },
              ],
            },
            {
              slug: 'prove-rules',
              title: 'Prove the rules',
              prompt: `Prove each of the following, using only the rules that the lesson has already established.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Derive the quotient rule by writing $f=(f/g)\\,g$ and applying the product rule (assume that $f/g$ is differentiable).`, answer: `Let $q=f/g$, so $f=qg$. The product rule gives $f'=q'g+qg'$, so $q'=\\dfrac{f'-qg'}{g}=\\dfrac{f'-\\frac fg g'}{g}=\\dfrac{f'g-fg'}{g^2}$.` },
                { prompt: `Use the quotient rule to prove the power rule for negative integers $n=-m$.`, answer: `With $m$ a positive integer, $x^{-m}=\\dfrac{1}{x^m}$, so $\\dfrac{d}{dx}x^{-m}=\\dfrac{0\\cdot x^m-1\\cdot mx^{m-1}}{x^{2m}}=-mx^{-m-1}$, which is $nx^{n-1}$ with $n=-m$.` },
                { prompt: `Find a formula for $(fgh)'$ and use it on $x\\sqrt{x}\\,(x+1)$.`, answer: `Apply the product rule twice: $(fgh)'=f'gh+fg'h+fgh'$. For $x\\cdot\\sqrt x\\cdot(x+1)$ this gives $\\sqrt x(x+1)+x\\cdot\\dfrac{1}{2\\sqrt x}(x+1)+x\\sqrt x=\\tfrac52x^{3/2}+\\tfrac32x^{1/2}$. Check: the function is $x^{5/2}+x^{3/2}$, which has the same derivative.` },
              ],
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
          quiz: [
            {
              question: 'What is the derivative of $y=\\dfrac{2x+1}{x-3}$?',
              options: ['$\\dfrac{7}{(x-3)^2}$', '$\\dfrac{-7}{(x-3)^2}$', '$2$', '$\\dfrac{4x-5}{(x-3)^2}$'],
              answer: 1,
              explanation: 'The quotient rule gives $\\dfrac{2(x-3)-(2x+1)(1)}{(x-3)^2}=\\dfrac{-7}{(x-3)^2}$. Writing the numerator in the other order, $fg\'-f\'g$, flips the sign to $+7$, which is why the order matters. $2$ is the ratio of the two derivatives, which is not the derivative of the ratio.',
            },
            {
              question: 'If $f(2)=3$, $f\'(2)=-1$, $g(2)=4$ and $g\'(2)=5$, what is $(fg)\'(2)$?',
              options: ['$-5$', '$12$', '$-19$', '$11$'],
              answer: 3,
              explanation: '$(fg)\'=f\'g+fg\'=(-1)(4)+(3)(5)=11$. The product of the derivatives, $(-1)(5)=-5$, is the classic error: the derivative of a product is not the product of the derivatives. $-19$ is $f\'g-fg\'$, which belongs in the numerator of a quotient rule, and $12$ is the value $f(2)g(2)$.',
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
              prompt: `Differentiate and simplify each function, using the product and quotient rules together with the trigonometric derivatives.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$x\\sin x$`, answer: `Product rule: $\\sin x+x\\cos x$.` },
                { prompt: `$\\frac{\\sin x}{1+\\cos x}$`, answer: `$\\dfrac{\\cos x(1+\\cos x)+\\sin^2x}{(1+\\cos x)^2}=\\dfrac{1+\\cos x}{(1+\\cos x)^2}=\\dfrac{1}{1+\\cos x}$, using $\\sin^2x+\\cos^2x=1$.` },
                { prompt: `$\\tan x\\sec x$`, answer: `$\\sec^2x\\cdot\\sec x+\\tan x\\cdot\\sec x\\tan x=\\sec^3x+\\sec x\\tan^2x$.` },
                { prompt: `$x^2\\cos x-2x\\sin x-2\\cos x$`, answer: `$(2x\\cos x-x^2\\sin x)-(2\\sin x+2x\\cos x)+2\\sin x=-x^2\\sin x$. Almost everything cancels.` },
              ],
            },
            {
              slug: 'derive-the-rest',
              title: 'Derive the rest',
              prompt: `Fill in the derivations that the lesson stated without proof, working from the definition and the quotient rule.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Derive $\\dfrac{d}{dx}\\cos x=-\\sin x$ from the limit definition.`, answer: `Use $\\cos(x+h)=\\cos x\\cos h-\\sin x\\sin h$, then group as in the lesson: $\\dfrac{\\cos(x+h)-\\cos x}{h}=\\cos x\\cdot\\dfrac{\\cos h-1}{h}-\\sin x\\cdot\\dfrac{\\sin h}{h}\\to\\cos x\\cdot0-\\sin x\\cdot1=-\\sin x$.` },
                { prompt: `Derive the derivatives of $\\sec x$, $\\csc x$ and $\\cot x$ with the quotient rule.`, answer: `$\\left(\\dfrac{1}{\\cos x}\\right)'=\\dfrac{\\sin x}{\\cos^2x}=\\sec x\\tan x$, $\\left(\\dfrac{1}{\\sin x}\\right)'=\\dfrac{-\\cos x}{\\sin^2x}=-\\csc x\\cot x$, and $\\left(\\dfrac{\\cos x}{\\sin x}\\right)'=\\dfrac{-\\sin^2x-\\cos^2x}{\\sin^2x}=-\\csc^2x$.` },
              ],
            },
            {
              slug: 'trig-tangents',
              title: 'Tangents and high derivatives',
              prompt: `Use the trigonometric derivatives on a tangent problem, on repeated derivatives and on a vibrating mass.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Find all $x$ in $[0,2\\pi)$ where $y=x+2\\sin x$ has a horizontal tangent.`, answer: `$y'=1+2\\cos x=0$ gives $\\cos x=-\\tfrac12$, so $x=\\tfrac{2\\pi}{3}$ and $x=\\tfrac{4\\pi}{3}$.` },
                { prompt: `Find $\\dfrac{d^{99}}{dx^{99}}\\sin x$.`, answer: `The derivatives repeat with period $4$, and $99=4\\cdot24+3$, so the answer is the third derivative, $-\\cos x$.` },
                { prompt: `Find $\\dfrac{d^{35}}{dx^{35}}(x\\sin x)$ by computing the first few derivatives and spotting a pattern.`, answer: `The first four are $\\sin x+x\\cos x$, $2\\cos x-x\\sin x$, $-3\\sin x-x\\cos x$ and $-4\\cos x+x\\sin x$: the $n$th derivative is $n$ times the $(n-1)$th derivative of $\\sin x$, plus $x$ times its $n$th. Since $35=4\\cdot8+3$, it is $35(-\\sin x)+x(-\\cos x)=-35\\sin x-x\\cos x$.` },
                { prompt: `A mass moves as $x(t)=3\\sin t+4\\cos t$. Show that $x''=-x$, and find the maximum displacement.`, answer: `$x'=3\\cos t-4\\sin t$ and $x''=-3\\sin t-4\\cos t=-x$. Critical points satisfy $3\\cos t=4\\sin t$, so $\\tan t=\\tfrac34$. The maximum has $\\sin t=\\tfrac35$ and $\\cos t=\\tfrac45$, giving $x=\\tfrac95+\\tfrac{16}{5}=5$.` },
              ],
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
          quiz: [
            {
              question: 'What is the derivative of $y=x^2\\tan x$?',
              options: ['$2x\\tan x+x^2\\sec^2x$', '$2x\\sec^2x$', '$2x\\tan x+x^2\\sec x\\tan x$', '$2x\\tan x-x^2\\sec^2x$'],
              answer: 0,
              explanation: 'The product rule with $(\\tan x)\'=\\sec^2x$ gives $2x\\tan x+x^2\\sec^2x$. $2x\\sec^2x$ multiplies the two derivatives, which the product rule never does, and $\\sec x\\tan x$ is the derivative of $\\sec x$, not of $\\tan x$.',
            },
            {
              question: 'Why does $\\dfrac{d}{dx}\\sin x=\\cos x$ need $x$ to be measured in radians?',
              options: [
                'Because cosine is defined only for angles in radians',
                'Because $\\sin x$ is periodic only when $x$ is in radians',
                'Because the proof uses $\\lim_{h\\to0}\\frac{\\sin h}{h}=1$, which holds only for $h$ in radians',
                'It does not: the formula is the same in degrees',
              ],
              answer: 2,
              explanation: 'The derivation reduces to $\\dfrac{\\sin h}{h}\\to1$ and $\\dfrac{\\cos h-1}{h}\\to0$, and the first comes from comparing an arc with the sine on the unit circle, which is radian measure. In degrees the derivative of $\\sin x$ is $\\dfrac{\\pi}{180}\\cos x$. Sine and cosine are periodic and defined in any unit; only the size of the slope changes.',
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
              prompt: `Differentiate each function, naming the outer and inner functions as you go.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$(3x-5)^7$`, answer: `Outer $u^7$, inner $3x-5$: $7(3x-5)^6\\cdot3=21(3x-5)^6$.` },
                { prompt: `$\\sqrt{x^2+9}$`, answer: `Outer $\\sqrt u$, inner $x^2+9$: $\\dfrac{1}{2\\sqrt{x^2+9}}\\cdot2x=\\dfrac{x}{\\sqrt{x^2+9}}$.` },
                { prompt: `$\\sin(x^3)$`, answer: `Outer $\\sin u$, inner $x^3$: $3x^2\\cos(x^3)$.` },
                { prompt: `$\\cos^2(5x)$`, answer: `Three layers: square, cosine, $5x$. So the derivative is $2\\cos(5x)\\cdot(-\\sin5x)\\cdot5=-10\\sin5x\\cos5x=-5\\sin(10x)$.` },
                { prompt: `$\\tan(\\sqrt{x})$`, answer: `Outer $\\tan u$, inner $\\sqrt x$: $\\sec^2(\\sqrt x)\\cdot\\dfrac{1}{2\\sqrt x}=\\dfrac{\\sec^2\\sqrt x}{2\\sqrt x}$.` },
                { prompt: `$\\left(\\dfrac{x}{x+1}\\right)^4$`, answer: `Outer $u^4$, inner $\\dfrac{x}{x+1}$, whose derivative is $\\dfrac{1}{(x+1)^2}$: $4\\left(\\dfrac{x}{x+1}\\right)^3\\dfrac{1}{(x+1)^2}=\\dfrac{4x^3}{(x+1)^5}$.` },
              ],
            },
            {
              slug: 'nested-and-mixed',
              title: 'Nested and mixed',
              prompt: `Differentiate each function, working from the outside in and simplifying your result.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\sin(\\cos(x^2))$`, answer: `$\\cos(\\cos(x^2))\\cdot(-\\sin(x^2))\\cdot2x=-2x\\sin(x^2)\\cos(\\cos(x^2))$.` },
                { prompt: `$\\sqrt{1+\\sqrt{1+x}}$`, answer: `$\\dfrac{1}{2\\sqrt{1+\\sqrt{1+x}}}\\cdot\\dfrac{1}{2\\sqrt{1+x}}=\\dfrac{1}{4\\sqrt{1+x}\\,\\sqrt{1+\\sqrt{1+x}}}$.` },
                { prompt: `$x^2(1-3x)^5$`, answer: `Product and chain rules: $2x(1-3x)^5+x^2\\cdot5(1-3x)^4(-3)=x(1-3x)^4\\big(2(1-3x)-15x\\big)=x(1-3x)^4(2-21x)$.` },
                { prompt: `$\\dfrac{\\sin^2x}{\\cos(2x)}$`, answer: `Simplify first with $\\cos2x=1-2\\sin^2x$, so $\\sin^2x=\\tfrac12(1-\\cos2x)$ and the function is $\\tfrac12(\\sec2x-1)$. The derivative is $\\tfrac12\\cdot2\\sec2x\\tan2x=\\dfrac{\\sin2x}{\\cos^2(2x)}$.` },
              ],
            },
            {
              slug: 'chain-from-table',
              title: 'Chain rule from a table',
              prompt: `Given $g(1)=2$, $g'(1)=-3$, $f(2)=5$, $f'(2)=4$, $f(1)=7$ and $f'(1)=6$, find the derivative of each function at $x=1$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$f(g(x))$`, answer: `$f'(g(1))\\,g'(1)=f'(2)(-3)=4(-3)=-12$.` },
                { prompt: `$g(f(x))$, if the data allows it (say why or why not)`, answer: `It needs $g'(f(1))\\,f'(1)=g'(7)\\cdot6$, and $g'(7)$ is not given, so it cannot be found.` },
                { prompt: `$f(x)g(x)$`, answer: `Product rule: $f'(1)g(1)+f(1)g'(1)=6(2)+7(-3)=-9$.` },
                { prompt: `$f(x^2)$`, answer: `$f'(x^2)\\cdot2x$ at $x=1$ is $2f'(1)=12$.` },
              ],
            },
            {
              slug: 'symmetry-proof',
              title: 'Derivatives and symmetry',
              prompt: `Use the chain rule to see how differentiation interacts with symmetry and with periodicity.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that the derivative of a differentiable even function is odd.`, answer: `Differentiate $f(-x)=f(x)$ with respect to $x$. The chain rule gives $-f'(-x)=f'(x)$, so $f'(-x)=-f'(x)$ and $f'$ is odd.` },
                { prompt: `Prove that the derivative of a differentiable odd function is even.`, answer: `Differentiate $f(-x)=-f(x)$: $-f'(-x)=-f'(x)$, so $f'(-x)=f'(x)$ and $f'$ is even.` },
                { prompt: `Test both results on $\\cos x$ and $x^3$.`, answer: `$\\cos x$ is even and its derivative $-\\sin x$ is odd. $x^3$ is odd and its derivative $3x^2$ is even.` },
                { prompt: `If $f$ is periodic with period $p$, what can you say about $f'$?`, answer: `Differentiate $f(x+p)=f(x)$: $f'(x+p)=f'(x)$, so $f'$ is periodic with period $p$ as well.` },
              ],
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
          quiz: [
            {
              question: 'What is the derivative of $y=\\sqrt{4x^2+1}$?',
              options: ['$\\dfrac{1}{2\\sqrt{4x^2+1}}$', '$\\dfrac{8x}{\\sqrt{4x^2+1}}$', '$\\dfrac{1}{2\\sqrt{8x}}$', '$\\dfrac{4x}{\\sqrt{4x^2+1}}$'],
              answer: 3,
              explanation: 'The outer function $\\sqrt u$ has derivative $\\dfrac{1}{2\\sqrt u}$ and the inner $u=4x^2+1$ has derivative $8x$, so $y\'=\\dfrac{8x}{2\\sqrt{4x^2+1}}=\\dfrac{4x}{\\sqrt{4x^2+1}}$. Stopping at $\\dfrac{1}{2\\sqrt{4x^2+1}}$ forgets the inner derivative, and $\\dfrac{8x}{\\sqrt{4x^2+1}}$ forgets the $\\tfrac12$ from the square root.',
            },
            {
              question: 'What is the derivative of $\\cos(x^2)$?',
              options: ['$-\\sin(x^2)$', '$-2\\cos x\\sin x$', '$-2x\\sin(x^2)$', '$2x\\cos(x^2)$'],
              answer: 2,
              explanation: 'Cosine is outside and $x^2$ inside, so the chain rule gives $-\\sin(x^2)\\cdot2x$. $-2\\cos x\\sin x$ is the derivative of $\\cos^2x=(\\cos x)^2$, the composition in the other order, and $-\\sin(x^2)$ forgets the inner derivative.',
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
              prompt: `Find $dy/dx$ at the given point, by differentiating implicitly and then substituting the coordinates.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$x^3+y^3=9$ at $(1,2)$`, answer: `$3x^2+3y^2y'=0$, so $y'=-\\dfrac{x^2}{y^2}=-\\dfrac14$.` },
                { prompt: `$xy+y^2=6$ at $(1,2)$`, answer: `$y+xy'+2yy'=0$, so $y'=-\\dfrac{y}{x+2y}=-\\dfrac25$.` },
                { prompt: `$x\\cos y+y=1$ at $(1,0)$`, answer: `$\\cos y-x\\sin y\\,y'+y'=0$, so $y'=\\dfrac{\\cos y}{x\\sin y-1}$, which is $\\dfrac{1}{0-1}=-1$ at $(1,0)$.` },
                { prompt: `$\\sqrt{x}+\\sqrt{y}=3$ at $(1,4)$`, answer: `$\\dfrac{1}{2\\sqrt x}+\\dfrac{y'}{2\\sqrt y}=0$, so $y'=-\\sqrt{y/x}=-2$.` },
              ],
            },
            {
              slug: 'horizontal-vertical-tangents',
              title: 'Horizontal and vertical tangents',
              prompt: `Consider the ellipse $x^2-xy+y^2=3$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find $y'$.`, answer: `$2x-y-xy'+2yy'=0$, so $y'=\\dfrac{y-2x}{2y-x}$.` },
                { prompt: `Find all points where the tangent is horizontal.`, answer: `The numerator vanishes: $y=2x$. Then $x^2-2x^2+4x^2=3x^2=3$, so the points are $(1,2)$ and $(-1,-2)$, where the denominator is $\\pm3\\ne0$.` },
                { prompt: `Find all points where the tangent is vertical.`, answer: `The denominator vanishes: $x=2y$. Then $4y^2-2y^2+y^2=3y^2=3$, so the points are $(2,1)$ and $(-2,-1)$, where the numerator is $\\mp3\\ne0$.` },
              ],
            },
            {
              slug: 'implicit-second-derivative',
              title: 'Second derivative',
              prompt: `Let $x^2-y^2=1$, with $y\\ne0$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show that $y'=x/y$.`, answer: `$2x-2yy'=0$, so $y'=x/y$.` },
                { prompt: `Show that $y''=-1/y^3$.`, answer: `Use the quotient rule, then substitute $y'=x/y$: $y''=\\dfrac{y-xy'}{y^2}=\\dfrac{y-x^2/y}{y^2}=\\dfrac{y^2-x^2}{y^3}=-\\dfrac{1}{y^3}$, using $x^2-y^2=1$.` },
                { prompt: `What does the sign of $y''$ tell you about the upper branch of the curve?`, answer: `On the upper branch $y>0$, so $y''<0$ everywhere: the branch is concave down, bending downward.` },
              ],
            },
            {
              slug: 'normal-through-centre',
              title: 'Tangents and normals',
              prompt: `Work with tangent and normal lines to a circle and to an ellipse, using implicit differentiation.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that every normal line to the circle $x^2+y^2=r^2$ passes through the origin.`, answer: `At a point $(a,b)$ with $b\\ne0$ the tangent slope is $-a/b$. If $a\\ne0$, the normal has slope $b/a$, so it is $y-b=\\tfrac ba(x-a)$, that is, $y=\\tfrac bax$, through the origin. If $a=0$ the normal is the $y$-axis. At $(\\pm r,0)$ the tangent is vertical and the normal is the $x$-axis. In every case it passes through the origin.` },
                { prompt: `Find the two points on $x^2+4y^2=8$ where the tangent line has slope $-\\tfrac12$.`, answer: `$2x+8yy'=0$ gives $y'=-\\dfrac{x}{4y}=-\\dfrac12$, so $x=2y$. Then $4y^2+4y^2=8$ and $y=\\pm1$: the points are $(2,1)$ and $(-2,-1)$.` },
              ],
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
          quiz: [
            {
              question: 'The point $(2,1)$ lies on $x^2y+y^3=5$. What is $dy/dx$ there?',
              options: ['$-\\tfrac74$', '$\\tfrac47$', '$-\\tfrac47$', '$0$'],
              answer: 2,
              explanation: 'Differentiate both sides, using the product rule on $x^2y$: $2xy+x^2y\'+3y^2y\'=0$, so $y\'=-\\dfrac{2xy}{x^2+3y^2}=-\\dfrac{4}{4+3}=-\\dfrac47$. The value $-\\tfrac74$ comes from writing the derivative of $y^3$ as $3y^2$ without the factor $y\'$, the most common error in implicit differentiation.',
            },
            {
              question: 'Implicit differentiation of $x^2+y^2=-4$ gives $y\'=-x/y$. What is the slope of this curve at $(0,2)$?',
              options: ['There is none: the equation describes no points at all', '$0$', 'Undefined, because the tangent there is vertical', '$-\\tfrac12$'],
              answer: 0,
              explanation: 'A sum of squares cannot equal $-4$, so the equation has no points. The formal rule $y\'=-x/y$ still comes out, and substituting $(0,2)$ gives $0$, but $(0,2)$ is not on the curve: $0+4\\ne-4$. Implicit differentiation gives slopes only at points that really satisfy the equation.',
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
              prompt: `Differentiate each function, combining the chain rule with the exponential, logarithmic and inverse trigonometric derivatives.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$e^{3x^2}$`, answer: `$e^{3x^2}\\cdot6x=6xe^{3x^2}$.` },
                { prompt: `$\\ln(x^2+1)$`, answer: `$\\dfrac{2x}{x^2+1}$.` },
                { prompt: `$x^2\\ln x$`, answer: `Product rule: $2x\\ln x+x^2\\cdot\\dfrac1x=2x\\ln x+x$.` },
                { prompt: `$2^{\\sin x}$`, answer: `$\\dfrac{d}{dx}a^u=a^u\\ln a\\cdot u'$, so the derivative is $2^{\\sin x}(\\ln2)\\cos x$.` },
                { prompt: `$\\arctan(2x)$`, answer: `$\\dfrac{1}{1+(2x)^2}\\cdot2=\\dfrac{2}{1+4x^2}$.` },
                { prompt: `$\\arcsin(\\sqrt{x})$`, answer: `$\\dfrac{1}{\\sqrt{1-x}}\\cdot\\dfrac{1}{2\\sqrt x}=\\dfrac{1}{2\\sqrt x\\,\\sqrt{1-x}}$.` },
                { prompt: `$\\ln(\\cos x)$`, answer: `$\\dfrac{-\\sin x}{\\cos x}=-\\tan x$.` },
                { prompt: `$e^{-x}\\sin3x$`, answer: `$-e^{-x}\\sin3x+3e^{-x}\\cos3x=e^{-x}(3\\cos3x-\\sin3x)$.` },
              ],
            },
            {
              slug: 'log-differentiation',
              title: 'Logarithmic differentiation',
              prompt: `Use logarithmic differentiation in each part, taking logarithms before you differentiate.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find $y'$ for $y=x^x$, $x>0$.`, answer: `$\\ln y=x\\ln x$, so $\\dfrac{y'}{y}=\\ln x+1$ and $y'=x^x(\\ln x+1)$.` },
                { prompt: `Find where the graph of $y=x^x$ has a horizontal tangent.`, answer: `Since $x^x>0$, $y'=0$ needs $\\ln x=-1$, so $x=1/e$.` },
                { prompt: `For $y=\\dfrac{(x^2+1)^3\\sqrt{x+2}}{(x-1)^4}$, find $y'(0)$.`, answer: `$\\ln|y|=3\\ln(x^2+1)+\\tfrac12\\ln(x+2)-4\\ln|x-1|$, so $\\dfrac{y'}{y}=\\dfrac{6x}{x^2+1}+\\dfrac{1}{2(x+2)}-\\dfrac{4}{x-1}$. At $x=0$ this is $0+\\tfrac14+4=\\tfrac{17}{4}$, and $y(0)=\\sqrt2$, so $y'(0)=\\dfrac{17\\sqrt2}{4}\\approx6.01$.` },
              ],
            },
            {
              slug: 'inverse-derivative',
              title: 'Derivative of an inverse',
              prompt: `Let $f(x)=x^5+2x+1$, and let $g=f^{-1}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Use the sign of its derivative to explain why $f$ is one-to-one.`, answer: `$f'(x)=5x^4+2>0$ for every $x$, so $f$ is increasing, and no two inputs give the same output.` },
                { prompt: `Find $g'(1)$.`, answer: `$f(0)=1$, so $g'(1)=\\dfrac{1}{f'(0)}=\\dfrac12$.` },
                { prompt: `Find $g'(4)$.`, answer: `$f(1)=4$, so $g'(4)=\\dfrac{1}{f'(1)}=\\dfrac17$.` },
              ],
            },
            {
              slug: 'e-as-limit',
              title: 'Where $e$ comes from',
              prompt: `Three derivations with inverse functions and logarithms, ending with the limit that produces $e$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Derive $\\dfrac{d}{dx}\\arctan x$ with implicit differentiation.`, answer: `Let $y=\\arctan x$, so $\\tan y=x$ with $y\\in(-\\pi/2,\\pi/2)$. Differentiating, $\\sec^2y\\,y'=1$, and $\\sec^2y=1+\\tan^2y=1+x^2$, so $y'=\\dfrac{1}{1+x^2}$.` },
                { prompt: `Show that $\\arctan x+\\arctan(1/x)$ has zero derivative for $x>0$, and find its value.`, answer: `The derivative is $\\dfrac{1}{1+x^2}+\\dfrac{1}{1+1/x^2}\\cdot\\left(-\\dfrac{1}{x^2}\\right)=\\dfrac{1}{1+x^2}-\\dfrac{1}{x^2+1}=0$. So the sum is constant on $(0,\\infty)$. At $x=1$ it is $\\tfrac\\pi4+\\tfrac\\pi4$, so its value is $\\dfrac\\pi2$.` },
                { prompt: `Using the fact that $\\ln x$ has derivative $1$ at $x=1$, show that $\\lim_{n\\to\\infty}n\\ln(1+1/n)=1$.`, answer: `With $h=1/n$, $n\\ln(1+1/n)=\\dfrac{\\ln(1+h)-\\ln1}{h}$, a difference quotient of $\\ln$ at $1$. As $n\\to\\infty$, $h\\to0^+$, and the quotient tends to the derivative of $\\ln$ at $1$, which is $1$.` },
                { prompt: `Conclude that $\\lim_{n\\to\\infty}(1+1/n)^n=e$.`, answer: `$(1+1/n)^n=e^{n\\ln(1+1/n)}$. The exponent tends to $1$ and the exponential function is continuous, so the limit is $e^1=e$.` },
              ],
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
          quiz: [
            {
              question: 'What is the derivative of $y=\\ln(3x^2+1)$?',
              options: ['$\\dfrac{1}{3x^2+1}$', '$\\dfrac{6x}{3x^2+1}$', '$\\dfrac{1}{6x}$', '$6x\\ln(3x^2+1)$'],
              answer: 1,
              explanation: '$\\dfrac{d}{dx}\\ln u=\\dfrac{u\'}{u}$, here with $u=3x^2+1$ and $u\'=6x$, giving $\\dfrac{6x}{3x^2+1}$. $\\dfrac{1}{3x^2+1}$ forgets the chain rule factor, the derivative of the inside.',
            },
            {
              question: 'What is $\\dfrac{d}{dx}\\,5^x$?',
              options: ['$x\\,5^{x-1}$', '$5^x$', '$\\dfrac{5^x}{\\ln5}$', '$5^x\\ln5$'],
              answer: 3,
              explanation: 'Write $5^x=e^{x\\ln5}$. The chain rule gives $e^{x\\ln5}\\cdot\\ln5=5^x\\ln5$. The power rule, which gives $x\\,5^{x-1}$, applies to a variable base with a constant exponent, not to a constant base with a variable exponent. Only base $e$ gives a function that is its own derivative.',
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
              prompt: `Air enters a spherical balloon at $100\\ \\text{cm}^3$/s. Consider the moment when the radius is $5$ cm.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `How fast is the radius growing?`, answer: `$V=\\tfrac43\\pi r^3$ gives $\\dfrac{dV}{dt}=4\\pi r^2\\dfrac{dr}{dt}$, so $\\dfrac{dr}{dt}=\\dfrac{100}{4\\pi(25)}=\\dfrac1\\pi\\approx0.318$ cm/s.` },
                { prompt: `How fast is the surface area growing?`, answer: `$S=4\\pi r^2$ gives $\\dfrac{dS}{dt}=8\\pi r\\dfrac{dr}{dt}=8\\pi(5)\\cdot\\dfrac1\\pi=40\\ \\text{cm}^2$/s.` },
              ],
            },
            {
              slug: 'sliding-ladder',
              title: 'Sliding ladder',
              prompt: `The foot of a $5$ m ladder is pulled away from a wall at $0.5$ m/s. Consider the moment when the foot is $3$ m from the wall.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the rate at which the top is moving.`, answer: `$x^2+y^2=25$ gives $2x\\dfrac{dx}{dt}+2y\\dfrac{dy}{dt}=0$. With $x=3$, $y=4$ and $\\dfrac{dx}{dt}=0.5$: $\\dfrac{dy}{dt}=-\\dfrac{3(0.5)}{4}=-0.375$ m/s, so the top slides down at $0.375$ m/s.` },
                { prompt: `Find the rate of change of the angle between the ladder and the ground.`, answer: `$\\cos\\theta=x/5$ gives $-\\sin\\theta\\dfrac{d\\theta}{dt}=\\dfrac15\\dfrac{dx}{dt}$. With $\\sin\\theta=\\tfrac45$: $\\dfrac{d\\theta}{dt}=-\\dfrac{0.5/5}{4/5}=-0.125$ rad/s. The angle is decreasing.` },
              ],
            },
            {
              slug: 'radar-and-shadow',
              title: 'Radar and a shadow',
              prompt: `Solve these two related rates problems, each built on a right triangle.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `A plane flies level at $3$ km altitude at $240$ m/s, directly over a radar station. Find the rate at which the distance from the station is increasing when that distance is $5$ km.`, answer: `With horizontal distance $x$ and distance $s$ from the station, $s^2=x^2+9$ (in km), so $s\\dfrac{ds}{dt}=x\\dfrac{dx}{dt}$. When $s=5$, $x=4$, and $\\dfrac{ds}{dt}=\\tfrac45(240)=192$ m/s.` },
                { prompt: `A person $1.8$ m tall walks at $1.4$ m/s straight away from a lamp $6$ m high. How fast does the shadow lengthen?`, answer: `Let $x$ be the person's distance from the lamp and $L$ the shadow's length. Similar triangles give $\\dfrac{L}{1.8}=\\dfrac{x+L}{6}$, so $L=\\tfrac37x$ and $\\dfrac{dL}{dt}=\\tfrac37(1.4)=0.6$ m/s.` },
                { prompt: `In the same situation, how fast does the tip of the shadow move?`, answer: `The tip is at distance $x+L$ from the lamp, so it moves at $1.4+0.6=2.0$ m/s.` },
              ],
            },
            {
              slug: 'rocket-camera',
              title: 'Angle of elevation',
              prompt: `A rocket rises vertically from a pad, and a camera $500$ m from the pad tracks it.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `When the rocket is $500$ m up, its speed is $100$ m/s. How fast must the camera's angle of elevation change, in rad/s?`, answer: `$\\tan\\theta=y/500$ gives $\\sec^2\\theta\\dfrac{d\\theta}{dt}=\\dfrac{1}{500}\\dfrac{dy}{dt}$. At $y=500$, $\\tan\\theta=1$ and $\\sec^2\\theta=2$, so $\\dfrac{d\\theta}{dt}=\\dfrac{100}{500\\cdot2}=0.1$ rad/s.` },
                { prompt: `When the height is $1200$ m at a speed of $200$ m/s, what is the rate?`, answer: `Now $\\tan\\theta=2.4$, so $\\sec^2\\theta=1+2.4^2=6.76$ and $\\dfrac{d\\theta}{dt}=\\dfrac{200}{500\\cdot6.76}\\approx0.0592$ rad/s.` },
                { prompt: `Why can a faster rocket need a slower camera?`, answer: `The rate is $\\dfrac{d\\theta}{dt}=\\dfrac{\\cos^2\\theta}{500}\\dfrac{dy}{dt}$. As the rocket climbs, $\\theta$ approaches $90^\\circ$ and $\\cos^2\\theta$ shrinks: the rocket is farther away, so each metre it climbs turns the camera less. Here the speed doubles while $\\cos^2\\theta$ falls from $\\tfrac12$ to about $0.148$.` },
              ],
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
          quiz: [
            {
              question: 'The radius of a circular oil slick grows at $0.5$ m/s. How fast is its area growing when the radius is $20$ m?',
              options: ['$20\\pi\\approx62.8\\ \\text{m}^2$/s', '$10\\pi\\approx31.4\\ \\text{m}^2$/s', '$400\\pi\\approx1257\\ \\text{m}^2$/s', '$0$, because the radius at that moment is a fixed number'],
              answer: 0,
              explanation: 'Differentiate $A=\\pi r^2$ first: $\\dfrac{dA}{dt}=2\\pi r\\dfrac{dr}{dt}=2\\pi(20)(0.5)=20\\pi$. Only then substitute $r=20$. Substituting first gives $A=400\\pi$, a constant whose derivative is $0$: freezing a changing quantity before differentiating is the classic related rates error.',
            },
            {
              question: 'Water drains from a tank, and its depth $h$ falls by $2$ cm each minute. What value should you use for $dh/dt$?',
              options: ['$2$ cm/min', '$-2$ cm/min', '$\\pm2$ cm/min, since either sign gives the same answer', '$0$, since the depth is measured at one instant'],
              answer: 1,
              explanation: 'A decreasing quantity has a negative derivative, so $dh/dt=-2$ cm/min. Using $+2$ describes a tank that is filling, and every rate you derive from it will have the wrong sign. Saying the direction in words at the end is a useful check.',
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
              prompt: `Use a linearisation at a convenient point to estimate each value, and say whether each estimate is high or low.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\sqrt[3]{8.06}$`, answer: `Take $f(x)=x^{1/3}$ at $a=8$: $f(8)=2$ and $f'(8)=\\tfrac{1}{12}$, so $\\sqrt[3]{8.06}\\approx2+\\tfrac{0.06}{12}=2.005$. The cube root is concave down, so this is high (the true value is $2.00499$).` },
                { prompt: `$\\ln1.04$`, answer: `$\\ln(1+x)\\approx x$ near $0$ gives $0.04$. The logarithm is concave down, so this is high (the true value is $0.03922$).` },
                { prompt: `$1/0.98$`, answer: `Take $f(x)=1/x$ at $a=1$, with $f'(1)=-1$: $1+(-1)(-0.02)=1.02$. The function $1/x$ is concave up for $x>0$, so this is low (the true value is $1.02041$).` },
                { prompt: `$(1.02)^{10}$`, answer: `$(1+x)^{10}\\approx1+10x$ gives $1.2$. The function is concave up, so this is low (the true value is about $1.219$).` },
              ],
            },
            {
              slug: 'pendulum-error',
              title: 'Error in a pendulum',
              prompt: `The period of a pendulum is $T=2\\pi\\sqrt{L/g}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $\\dfrac{dT}{T}=\\dfrac12\\dfrac{dL}{L}$.`, answer: `$T=cL^{1/2}$ with $c=2\\pi/\\sqrt g$, so $dT=\\tfrac12cL^{-1/2}\\,dL$ and $\\dfrac{dT}{T}=\\dfrac{\\frac12cL^{-1/2}\\,dL}{cL^{1/2}}=\\dfrac12\\dfrac{dL}{L}$.` },
                { prompt: `A clock's pendulum lengthens by $0.1\\%$ in summer. By how many seconds per day does the clock run slow?`, answer: `$T$ grows by $\\tfrac12(0.1\\%)=0.05\\%$, so the clock ticks $0.05\\%$ too slowly and loses about $0.0005\\times86\\,400\\approx43$ s per day.` },
                { prompt: `If you use $T$ and $L$ to compute $g$, what is the relative error in $g$ from a $0.5\\%$ error in $T$ alone?`, answer: `$g=4\\pi^2L/T^2$, so $\\dfrac{dg}{g}=-2\\dfrac{dT}{T}$, which has size $2(0.5\\%)=1\\%$.` },
              ],
            },
            {
              slug: 'small-angle-limit',
              title: 'How good is small-angle?',
              prompt: `Using $\\sin\\theta\\approx\\theta$, what is the largest angle for which the relative error $\\left|\\dfrac{\\theta-\\sin\\theta}{\\sin\\theta}\\right|$ is below $1\\%$? Find it by trial with a calculator, to two significant figures, in radians and in degrees.`,
              kind: 'problem',
              difficulty: 3,
              answer: `The relative error is roughly $\\theta^2/6$, so start near $\\theta=\\sqrt{0.06}\\approx0.245$. Trial: at $\\theta=0.24$ the error is $0.0097$, below $1\\%$, and at $\\theta=0.25$ it is $0.0105$, above. The largest angle is about $0.24$ rad, or $14^\\circ$.`,
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
          quiz: [
            {
              question: 'Use the linearisation of $\\sqrt{x}$ at $x=25$ to estimate $\\sqrt{24}$.',
              options: ['$5.1$', '$4.98$', '$4.8$', '$4.9$'],
              answer: 3,
              explanation: '$f(25)=5$ and $f\'(25)=\\dfrac{1}{2\\sqrt{25}}=\\dfrac{1}{10}$, so $\\sqrt{24}\\approx5+\\tfrac{1}{10}(24-25)=4.9$. The true value is $4.89898$, so the estimate is slightly high, as expected for a concave-down function. $5.1$ adds the correction instead of subtracting it, though $dx=-1$ here.',
            },
            {
              question: 'The side of a cube is measured with a possible error of $1\\%$. About how large is the possible error in its volume?',
              options: ['$1\\%$', '$\\tfrac13\\%$', '$3\\%$', '$0.0001\\%$'],
              answer: 2,
              explanation: '$V=s^3$ gives $dV=3s^2\\,ds$, so $\\dfrac{dV}{V}=3\\dfrac{ds}{s}=3\\%$. The error does not stay at $1\\%$, because the volume depends on the cube of the measurement: in general $y=cx^k$ gives $\\dfrac{dy}{y}=k\\dfrac{dx}{x}$. Cubing the error itself, $(0.01)^3$, confuses the error with the measurement.',
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
              prompt: `Find the absolute maximum and minimum of each function on the given interval, by the closed interval method.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$2x^3-3x^2-12x+1$ on $[-2,3]$`, answer: `$f'=6x^2-6x-12=6(x-2)(x+1)$, zero at $x=-1$ and $x=2$. Values: $f(-2)=-3$, $f(-1)=8$, $f(2)=-19$, $f(3)=-8$. Maximum $8$ at $x=-1$, minimum $-19$ at $x=2$.` },
                { prompt: `$x-2\\sin x$ on $[0,\\pi]$`, answer: `$f'=1-2\\cos x=0$ at $x=\\pi/3$. Values: $f(0)=0$, $f(\\pi/3)=\\pi/3-\\sqrt3\\approx-0.685$, $f(\\pi)=\\pi$. Maximum $\\pi$ at $x=\\pi$, minimum $\\pi/3-\\sqrt3$ at $x=\\pi/3$.` },
                { prompt: `$x^{2/3}(x-5)$ on $[-1,8]$`, answer: `$f=x^{5/3}-5x^{2/3}$, so $f'=\\tfrac53x^{2/3}-\\tfrac{10}{3}x^{-1/3}=\\dfrac{5(x-2)}{3x^{1/3}}$. The critical numbers are $0$, where the derivative is undefined, and $2$. Values: $f(-1)=-6$, $f(0)=0$, $f(2)=-3\\sqrt[3]4\\approx-4.76$, $f(8)=12$. Maximum $12$ at $x=8$, minimum $-6$ at $x=-1$.` },
              ],
            },
            {
              slug: 'hypotheses-matter',
              title: 'Why the hypotheses matter',
              prompt: `Give an example of each, or explain why none exists.`,
              kind: 'writing',
              difficulty: 2,
              parts: [
                { prompt: `A continuous function on $(0,1)$ with no absolute maximum.`, answer: `$f(x)=1/x$, which grows without bound as $x\\to0^+$. (Even $f(x)=x$ works: it approaches $1$ but never reaches it.)` },
                { prompt: `A function on $[0,1]$ with no absolute minimum.`, answer: `$f(x)=x$ for $0<x\\le1$, with $f(0)=1$. The values approach $0$ but never reach it. By the extreme value theorem, any example must be discontinuous.` },
                { prompt: `A continuous function on $[0,1]$ with no absolute maximum.`, answer: `None exists: by the extreme value theorem, a continuous function on a closed bounded interval attains its maximum.` },
                { prompt: `A function with $f'(0)=0$ and no local extremum at $0$.`, answer: `$f(x)=x^3$: $f'(0)=0$, but $f$ is increasing through $0$.` },
                { prompt: `A function with a local minimum at $0$ where $f'(0)$ does not exist.`, answer: `$f(x)=|x|$, which has a corner at its minimum.` },
              ],
            },
            {
              slug: 'unbounded-interval',
              title: 'Extrema on an unbounded interval',
              prompt: `Find the absolute extrema, or show there are none. The closed interval method does not apply directly, so say what you do in its place.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `$f(x)=xe^{-x}$ on $[0,\\infty)$`, answer: `Compare the critical values with the endpoint value and the limit at infinity. $f'=(1-x)e^{-x}=0$ at $x=1$, with $f(1)=1/e\\approx0.368$. Also $f(0)=0$, $f>0$ for $x>0$, and $f\\to0$ as $x\\to\\infty$. So the maximum is $1/e$ at $x=1$ and the minimum is $0$ at $x=0$.` },
                { prompt: `$g(x)=\\dfrac{x}{x^2+4}$ on the whole real line`, answer: `$g'=\\dfrac{4-x^2}{(x^2+4)^2}=0$ at $x=\\pm2$, with $g(\\pm2)=\\pm\\tfrac14$, and $g\\to0$ as $x\\to\\pm\\infty$. $g$ falls on $(-\\infty,-2)$, rises on $(-2,2)$ and falls on $(2,\\infty)$, so the maximum is $\\tfrac14$ at $x=2$ and the minimum $-\\tfrac14$ at $x=-2$.` },
              ],
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
          quiz: [
            {
              question: 'What is the absolute minimum value of $f(x)=x^3-12x$ on $[0,3]$?',
              options: ['$0$', '$-9$', '$-16$', '$2$'],
              answer: 2,
              explanation: 'The only critical number in $(0,3)$ is $x=2$, since $f\'=3x^2-12$. Compare $f(0)=0$, $f(2)=-16$ and $f(3)=-9$: the minimum value is $-16$, attained at $x=2$. Answering $2$ gives the location, not the value, and $-9$ comes from checking only the endpoints.',
            },
            {
              question: 'Which statement holds for every function differentiable on an open interval?',
              options: [
                'If $f\'(c)=0$, then $f$ has a local extremum at $c$',
                'A local maximum of $f$ is also its absolute maximum',
                '$f$ attains an absolute maximum on the interval',
                'If $f$ has a local extremum at $c$, then $f\'(c)=0$',
              ],
              answer: 3,
              explanation: 'This is Fermat\'s theorem: at an interior local extremum where $f\'$ exists, $f\'(c)=0$. The converse is false: $x^3$ has $f\'(0)=0$ and no extremum. A local maximum need not be the largest value overall, and on an open interval there may be no absolute maximum at all, as for $f(x)=x$ on $(0,1)$.',
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
              prompt: `Check the hypotheses of the mean value theorem in each part, and find every $c$ that it promises.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\sqrt{x}$ on $[1,9]$`, answer: `Continuous on $[1,9]$ and differentiable on $(1,9)$. The secant slope is $\\dfrac{3-1}{8}=\\dfrac14$, and $\\dfrac{1}{2\\sqrt c}=\\dfrac14$ gives $c=4$.` },
                { prompt: `$x^2+2x$ on $[0,3]$`, answer: `A polynomial, so the hypotheses hold. The secant slope is $\\dfrac{15-0}{3}=5$, and $2c+2=5$ gives $c=\\tfrac32$.` },
                { prompt: `$\\dfrac1x$ on $[1,4]$`, answer: `Continuous and differentiable for $x>0$. The secant slope is $\\dfrac{\\frac14-1}{3}=-\\dfrac14$, and $-\\dfrac{1}{c^2}=-\\dfrac14$ gives $c=2$ (the root $c=-2$ is outside the interval).` },
                { prompt: `Explain why the MVT does not apply to $\\dfrac1x$ on $[-1,1]$.`, answer: `$1/x$ is not continuous on $[-1,1]$: it is undefined at $0$. Indeed the secant slope is $\\dfrac{1-(-1)}{2}=1$, while $-1/c^2$ is always negative, so no such $c$ exists.` },
              ],
            },
            {
              slug: 'bound-from-derivative',
              title: 'Bounds from a derivative',
              prompt: `Use the mean value theorem to turn information about a derivative into information about the function.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `If $f(0)=2$ and $f'(x)\\le5$ for all $x$ in $[0,4]$, how large can $f(4)$ be? Give a function that attains this.`, answer: `By the MVT, $f(4)-f(0)=4f'(c)\\le20$ for some $c$, so $f(4)\\le22$. The function $f(x)=2+5x$ attains it.` },
                { prompt: `A driver passes a camera at 2:00 pm, and another $150$ km further on at 3:20 pm. The limit is $100$ km/h. Prove that the driver was speeding at some moment, and give the speed the MVT guarantees.`, answer: `The average speed is $\\dfrac{150\\text{ km}}{4/3\\text{ h}}=112.5$ km/h. Position is a differentiable function of time, so by the MVT the speedometer read exactly $112.5$ km/h at some instant, which is over the limit.` },
              ],
            },
            {
              slug: 'mvt-proofs',
              title: 'Proofs with the MVT',
              prompt: `Prove each statement, using the mean value theorem or Rolle's theorem.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `$2x+\\cos x=0$ has exactly one real root.`, answer: `Let $f(x)=2x+\\cos x$. Since $f(-1)=-2+\\cos1<0<1=f(0)$, the IVT gives a root. If there were two, Rolle's theorem would give a point with $f'(c)=0$, but $f'(x)=2-\\sin x\\ge1>0$.` },
                { prompt: `For $x>0$, $\\sin x<x$.`, answer: `For $0<x\\le1$, the MVT on $[0,x]$ gives $\\sin x=x\\cos c$ with $0<c<x$, and $\\cos c<1$, so $\\sin x<x$. For $x>1$, $\\sin x\\le1<x$.` },
                { prompt: `For $x>0$, $\\ln(1+x)<x$.`, answer: `The MVT for $\\ln(1+t)$ on $[0,x]$ gives $\\ln(1+x)=\\dfrac{x}{1+c}$ with $0<c<x$. Since $1+c>1$, this is less than $x$.` },
                { prompt: `A polynomial of degree $n$ has at most $n$ real roots, assuming the case $n-1$ for its derivative.`, answer: `If $p$ had $n+1$ distinct roots, Rolle's theorem would give a root of $p'$ between each consecutive pair: $n$ distinct roots of $p'$, a polynomial of degree $n-1$. That contradicts the assumption.` },
              ],
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
          quiz: [
            {
              question: 'For $f(x)=x^3$ on $[0,3]$, which $c$ does the mean value theorem promise?',
              options: ['$\\tfrac32$', '$\\sqrt3$', '$3$', '$9$'],
              answer: 1,
              explanation: 'The secant slope is $\\dfrac{27-0}{3}=9$, and $f\'(c)=3c^2=9$ gives $c=\\sqrt3\\approx1.73$, inside $(0,3)$. The midpoint $\\tfrac32$ would be right for a quadratic but not for a cubic, and $9$ is the slope, not the point.',
            },
            {
              question: 'Two functions have $f\'(x)=g\'(x)$ for all $x$ in an interval containing $0$ and $4$, with $f(0)=5$ and $g(0)=2$. What is $f(4)-g(4)$?',
              options: ['$3$', '$0$', 'It cannot be found without formulas for $f$ and $g$', '$12$'],
              answer: 0,
              explanation: '$(f-g)\'=0$ on the interval, so by the MVT $f-g$ is constant there, and the constant is $f(0)-g(0)=3$. Equal derivatives make two functions differ by a constant, not agree: that constant is exactly the $+C$ of antiderivatives.',
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
              prompt: `Let $f(x)=x^3-3x+2$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Give the intervals of increase and decrease, and the local extrema.`, answer: `$f'=3x^2-3=3(x-1)(x+1)$. Increasing on $(-\\infty,-1)$ and $(1,\\infty)$, decreasing on $(-1,1)$. Local maximum $f(-1)=4$, local minimum $f(1)=0$.` },
                { prompt: `Give the intervals of concavity and the inflection point.`, answer: `$f''=6x$: concave down for $x<0$ and concave up for $x>0$, with the inflection point $(0,2)$.` },
                { prompt: `Sketch the graph by hand, and mark the $x$-intercepts.`, answer: `$f=(x-1)^2(x+2)$, so the graph crosses the axis at $x=-2$ and touches it at $x=1$, the local minimum. It rises from $-\\infty$ to $(-1,4)$, falls through $(0,2)$ to $(1,0)$, and rises again.` },
              ],
            },
            {
              slug: 'rational-sketches',
              title: 'Rational functions',
              prompt: `Sketch each function by hand, showing its asymptotes, extrema and concavity.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$f(x)=\\dfrac{x}{x^2+1}$`, answer: `$f'=\\dfrac{1-x^2}{(x^2+1)^2}$ and $f''=\\dfrac{2x(x^2-3)}{(x^2+1)^3}$. Maximum $\\tfrac12$ at $x=1$, minimum $-\\tfrac12$ at $x=-1$. Inflection points at $x=0$ and $x=\\pm\\sqrt3$, where $f=0$ and $f=\\pm\\tfrac{\\sqrt3}{4}$. The horizontal asymptote is $y=0$ at both ends, and there is no vertical asymptote. The function is odd.` },
                { prompt: `$g(x)=\\dfrac{x^2}{x-1}$, including its slant asymptote`, answer: `Long division gives $g=x+1+\\dfrac{1}{x-1}$, so $y=x+1$ is a slant asymptote, and $x=1$ is a vertical one. $g'=1-\\dfrac{1}{(x-1)^2}=\\dfrac{x(x-2)}{(x-1)^2}$: local maximum $0$ at $x=0$, local minimum $4$ at $x=2$. $g''=\\dfrac{2}{(x-1)^3}$: concave down for $x<1$ and up for $x>1$, with no inflection point.` },
              ],
            },
            {
              slug: 'exponential-shape',
              title: 'A function with an exponential',
              prompt: `Analyse $f(x)=xe^{-x}$ fully, by working through the following questions.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Where does $f$ increase and decrease, and what are its extrema?`, answer: `$f'=(1-x)e^{-x}$: increasing for $x<1$, decreasing for $x>1$, with maximum $f(1)=1/e\\approx0.368$.` },
                { prompt: `Does it have an inflection point?`, answer: `Yes. $f''=(x-2)e^{-x}$ changes sign at $x=2$, so $(2,2/e^2)\\approx(2,0.271)$ is an inflection point: concave down before it and concave up after.` },
                { prompt: `How does the curve behave at each end?`, answer: `$f\\to0$ as $x\\to\\infty$, because the exponential wins, so $y=0$ is a horizontal asymptote on the right. $f\\to-\\infty$ as $x\\to-\\infty$.` },
              ],
            },
            {
              slug: 'shape-reasoning',
              title: 'Reason without a formula',
              prompt: `Reason from the signs of the derivatives alone, without a formula to start from.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Is there a function defined on all real numbers with $f'(x)>0$ and $f''(x)<0$ everywhere? Give one, or prove there is none.`, answer: `Yes: $f(x)=-e^{-x}$, with $f'=e^{-x}>0$ and $f''=-e^{-x}<0$.` },
                { prompt: `Is there one with $f(x)<0$, $f'(x)>0$ and $f''(x)<0$ everywhere?`, answer: `Yes, the same function: $-e^{-x}<0$ for every $x$. It rises towards the asymptote $y=0$ without reaching it.` },
                { prompt: `Is there one with $f(x)>0$ and $f''(x)<0$ everywhere?`, answer: `No. A concave-down function lies below each of its tangent lines. If some tangent has non-zero slope, that line goes negative somewhere, and so does $f$. If every slope were $0$, $f$ would be constant, and then $f''=0$, not negative.` },
              ],
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
          quiz: [
            {
              question: 'Where is $f(x)=x^3-6x^2+5$ concave down?',
              options: ['$x<2$', '$0<x<4$', '$x>2$', '$x<0$ or $x>4$'],
              answer: 0,
              explanation: '$f\'\'(x)=6x-12$, which is negative for $x<2$. The interval $0<x<4$ is where $f\'(x)=3x(x-4)<0$, that is, where $f$ is decreasing: falling and bending down are different properties.',
            },
            {
              question: 'For $f(x)=x^4+x$, $f\'\'(0)=0$. Does $f$ have an inflection point at $x=0$?',
              options: [
                'Yes, because $f\'\'(0)=0$',
                'Yes, because $f\'(0)\\ne0$',
                'No, because $f\'\'$ does not change sign at $0$',
                'No, because $f\'\'$ would have to be undefined at an inflection point',
              ],
              answer: 2,
              explanation: '$f\'\'(x)=12x^2$ is zero at $0$ but positive on both sides, so the graph is concave up throughout and the concavity never changes. An inflection point needs a change of sign in $f\'\'$, and $f\'\'(c)=0$ alone does not give one.',
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
              prompt: `Return to the $1.2$ m wire from Module 1, with area $A(x)=(x/4)^2+\\dfrac{(1.2-x)^2}{4\\pi}$ on $[0,1.2]$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the cut that minimises the total area, and give that area.`, answer: `$A'(x)=\\dfrac x8-\\dfrac{1.2-x}{2\\pi}=0$ gives $\\pi x=4(1.2-x)$, so $x=\\dfrac{4.8}{\\pi+4}\\approx0.672$ m. Since $A''=\\tfrac18+\\tfrac{1}{2\\pi}>0$, this is the minimum, with area about $0.0504\\ \\text{m}^2$.` },
                { prompt: `Find the cut that maximises the total area, and give that area.`, answer: `The maximum must be at an endpoint. $A(0)\\approx0.1146$ and $A(1.2)=0.09$, so it is at $x=0$: use all the wire for the circle, for an area of about $0.1146\\ \\text{m}^2$.` },
              ],
            },
            {
              slug: 'closest-point',
              title: 'Closest point',
              prompt: `Find the point on $y=\\sqrt{x}$ closest to $(3,0)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the point and the distance.`, answer: `$D^2=(x-3)^2+(\\sqrt x)^2=(x-3)^2+x$. Its derivative $2(x-3)+1$ is zero at $x=\\tfrac52$, a minimum, since $D^2$ is an upward parabola. The point is $\\left(\\tfrac52,\\sqrt{5/2}\\right)\\approx(2.5,1.58)$, and the distance is $\\sqrt{11/4}=\\tfrac{\\sqrt{11}}{2}\\approx1.66$.` },
                { prompt: `Explain why you may minimise the squared distance in place of the distance.`, answer: `Distances are non-negative, and for non-negative numbers $a<b$ exactly when $a^2<b^2$. So $D$ and $D^2$ are smallest at the same $x$, and $D^2$ avoids a square root.` },
              ],
            },
            {
              slug: 'lifeguard',
              title: 'The lifeguard',
              prompt: `A swimmer is $30$ m from a straight shore. A lifeguard is on the shore, $40$ m along it from the nearest point to the swimmer. The lifeguard runs at $5$ m/s and swims at $1.5$ m/s.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Where should the lifeguard enter the water to reach the swimmer in the least time?`, answer: `Let $x$ be the distance from the nearest point to the entry point. Then $T(x)=\\dfrac{40-x}{5}+\\dfrac{\\sqrt{x^2+900}}{1.5}$ on $[0,40]$, and $T'(x)=-\\dfrac15+\\dfrac{x}{1.5\\sqrt{x^2+900}}=0$ gives $\\dfrac{x}{\\sqrt{x^2+900}}=0.3$. So $x=\\dfrac{9}{\\sqrt{0.91}}\\approx9.43$ m from the nearest point, after running about $30.6$ m.` },
                { prompt: `What is that time?`, answer: `$T(9.43)\\approx6.11+20.97\\approx27.1$ s.` },
                { prompt: `Compare with running as little as possible and with running all the way.`, answer: `Swimming straight from the start ($x=40$) covers $50$ m in $33.3$ s. Running the full $40$ m to the nearest point and swimming $30$ m ($x=0$) takes $8+20=28$ s. Both are slower than $27.1$ s.` },
              ],
            },
            {
              slug: 'snells-law',
              title: "Fermat's principle",
              prompt: `Light travels from $A$ above a flat boundary to $B$ below it, at speed $v_1$ above and $v_2$ below, and takes the path of least time. Let $A$ be a height $a$ above the boundary and $B$ a depth $b$ below it, separated horizontally by $d$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that the crossing point satisfies Snell's law, $\\dfrac{\\sin\\theta_1}{v_1}=\\dfrac{\\sin\\theta_2}{v_2}$, with the angles measured from the normal.`, answer: `Let $x$ be the horizontal distance from $A$ to the crossing point. Then $T(x)=\\dfrac{\\sqrt{a^2+x^2}}{v_1}+\\dfrac{\\sqrt{b^2+(d-x)^2}}{v_2}$ and $T'(x)=\\dfrac{x}{v_1\\sqrt{a^2+x^2}}-\\dfrac{d-x}{v_2\\sqrt{b^2+(d-x)^2}}$. The fractions $\\dfrac{x}{\\sqrt{a^2+x^2}}$ and $\\dfrac{d-x}{\\sqrt{b^2+(d-x)^2}}$ are $\\sin\\theta_1$ and $\\sin\\theta_2$, so $T'=0$ is exactly Snell's law.` },
                { prompt: `Explain why the critical point is a global minimum.`, answer: `$T''(x)=\\dfrac{a^2}{v_1(a^2+x^2)^{3/2}}+\\dfrac{b^2}{v_2\\big(b^2+(d-x)^2\\big)^{3/2}}>0$ for every $x$, so $T$ is concave up everywhere and its one critical point is the global minimum. Also $T'(0)<0<T'(d)$, so that point lies between $0$ and $d$.` },
              ],
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
          quiz: [
            {
              question: 'A farmer fences a rectangular pen against a long straight wall, using $60$ m of fence for the other three sides. What is the largest possible area?',
              options: ['$225\\ \\text{m}^2$', '$400\\ \\text{m}^2$', '$900\\ \\text{m}^2$', '$450\\ \\text{m}^2$'],
              answer: 3,
              explanation: 'With $x$ for each side perpendicular to the wall, the side along the wall is $60-2x$, so $A=x(60-2x)$ on $[0,30]$. $A\'=60-4x=0$ at $x=15$, giving a $15$ by $30$ pen of area $450\\ \\text{m}^2$, while the endpoints give $0$. A square with three $20$ m sides gives only $400$: the best pen is not a square when one side is free.',
            },
            {
              question: '$f$ is differentiable on $[0,5]$, and its only critical number is $x=2$, where $f\'\'(2)>0$. Where is the absolute maximum of $f$ on $[0,5]$?',
              options: [
                'At $x=2$, the only critical number',
                'At $x=0$ or $x=5$, because $x=2$ gives a minimum',
                'At $x=2$, because $f\'\'(2)>0$',
                'There may be no absolute maximum, since $f\'\'$ is positive at $2$',
              ],
              answer: 1,
              explanation: '$f\'(2)=0$ with $f\'\'(2)>0$ makes $x=2$ a local minimum. A continuous function on $[0,5]$ has an absolute maximum, at a critical number or an endpoint, and the only critical number is a minimum, so the maximum is at an endpoint. Assuming that the critical point is the answer is the trap: as in the wire problem, $f\'=0$ can give the minimum when you want the maximum.',
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
              prompt: `Evaluate each limit, naming the indeterminate form before you start, and rewriting it first where needed.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\lim_{x\\to\\infty}\\dfrac{\\ln x}{x}$`, answer: `Form $\\infty/\\infty$. L'Hopital's rule gives $\\dfrac{1/x}{1}\\to0$.` },
                { prompt: `$\\lim_{x\\to\\infty}x^2e^{-x}$`, answer: `Form $\\infty\\cdot0$. Write it as $\\dfrac{x^2}{e^x}$, of form $\\infty/\\infty$, and apply the rule twice: $\\dfrac{2x}{e^x}$, then $\\dfrac{2}{e^x}\\to0$.` },
                { prompt: `$\\lim_{x\\to0}\\dfrac{\\tan x-x}{x^3}$`, answer: `Form $0/0$. One application gives $\\dfrac{\\sec^2x-1}{3x^2}=\\dfrac{\\tan^2x}{3x^2}=\\dfrac13\\left(\\dfrac{\\tan x}{x}\\right)^2\\to\\dfrac13$.` },
                { prompt: `$\\lim_{x\\to0^+}x^x$`, answer: `Form $0^0$. Take logarithms: $\\ln(x^x)=x\\ln x=\\dfrac{\\ln x}{1/x}$, and the rule gives $\\dfrac{1/x}{-1/x^2}=-x\\to0$. So $x^x\\to e^0=1$.` },
                { prompt: `$\\lim_{x\\to0^+}\\left(\\dfrac1x-\\dfrac{1}{\\sin x}\\right)$`, answer: `Form $\\infty-\\infty$. Combine: $\\dfrac{\\sin x-x}{x\\sin x}$, of form $0/0$. Once: $\\dfrac{\\cos x-1}{\\sin x+x\\cos x}$, still $0/0$. Again: $\\dfrac{-\\sin x}{2\\cos x-x\\sin x}\\to\\dfrac02=0$.` },
              ],
            },
            {
              slug: 'lhopital-traps',
              title: "When L'Hopital's rule is the wrong tool",
              prompt: `Evaluate each limit, and explain what goes wrong with a careless use of L'Hopital's rule.`,
              kind: 'writing',
              difficulty: 2,
              parts: [
                { prompt: `$\\lim_{x\\to0}\\dfrac{\\cos x}{x^2+1}$`, answer: `$1$, by direct substitution: the form is $1/1$, which is not indeterminate. Applying the rule anyway gives $\\dfrac{-\\sin x}{2x}\\to-\\dfrac12$, which is wrong.` },
                { prompt: `$\\lim_{x\\to\\infty}\\dfrac{x+\\sin x}{x}$`, answer: `$1$, by dividing through: $1+\\dfrac{\\sin x}{x}\\to1$. The ratio of derivatives, $\\dfrac{1+\\cos x}{1}$, has no limit, so the rule does not apply. That does not mean the original limit fails to exist.` },
                { prompt: `$\\lim\\limits_{x\\to\\infty}\\dfrac{\\sqrt{x^2+1}}{x}$ (try the rule twice)`, answer: `$1$, by factoring: $\\dfrac{\\sqrt{x^2+1}}{x}=\\sqrt{1+1/x^2}\\to1$ for $x>0$. The rule turns $\\dfrac{\\sqrt{x^2+1}}{x}$ into $\\dfrac{x}{\\sqrt{x^2+1}}$ and then back again, swapping numerator and denominator forever.` },
              ],
            },
            {
              slug: 'newton-by-hand',
              title: "Newton's method by hand",
              prompt: `Do these with a basic calculator, using the iteration $x_{n+1}=x_n-f(x_n)/f'(x_n)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Newton used his method on $x^3-2x-5=0$. Starting from $x_0=2$, compute $x_1$ and $x_2$.`, answer: `$f(2)=-1$ and $f'(2)=10$, so $x_1=2.1$. Then $f(2.1)=0.061$ and $f'(2.1)=11.23$, so $x_2=2.1-\\dfrac{0.061}{11.23}\\approx2.094568$.` },
                { prompt: `Solve $\\cos x=x$ from $x_0=1$, to six decimal places.`, answer: `With $f(x)=\\cos x-x$, $x_{n+1}=x_n+\\dfrac{\\cos x_n-x_n}{\\sin x_n+1}$. This gives $x_1\\approx0.750364$, $x_2\\approx0.739113$ and $x_3\\approx0.739085$, and $x_4$ agrees to six decimals. The root is $0.739085$.` },
                { prompt: `Show that for $f(x)=x^{1/3}$ the method gives $x_{n+1}=-2x_n$, and explain what happens.`, answer: `$\\dfrac{f}{f'}=\\dfrac{x^{1/3}}{\\frac13x^{-2/3}}=3x$, so $x_{n+1}=x_n-3x_n=-2x_n$. The iterates double in size and alternate in sign, so they diverge from every non-zero start, even though the root is $0$.` },
                { prompt: `Starting at $x_0=0$ for $f(x)=x^3-2x+2$, compute a few steps and describe what happens.`, answer: `$x_1=0-\\dfrac{2}{-2}=1$, then $x_2=1-\\dfrac11=0$. The iterates cycle $0,1,0,1,\\ldots$ forever and never approach the real root, which is near $-1.77$.` },
              ],
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
          quiz: [
            {
              question: 'Evaluate $\\lim_{x\\to0}\\dfrac{e^{2x}-1}{\\sin x}$.',
              options: ['$1$', '$\\tfrac12$', '$2$', '$0$'],
              answer: 2,
              explanation: 'Substitution gives $0/0$, so the rule applies: $\\dfrac{2e^{2x}}{\\cos x}\\to\\dfrac21=2$. Answering $1$ forgets the chain rule factor $2$ in the derivative of $e^{2x}$.',
            },
            {
              question: 'Newton\'s method for $f(x)=x^2-4$ is started at $x_0=0$. What happens?',
              options: [
                'It converges to $2$',
                'It cannot take a step, because the tangent at $x_0$ is horizontal',
                'It converges to $-2$',
                'It cycles between $0$ and $4$',
              ],
              answer: 1,
              explanation: '$f\'(0)=0$, so the formula $x_1=x_0-f(x_0)/f\'(x_0)$ divides by zero: the tangent at $(0,-4)$ is horizontal and never meets the $x$-axis. Any other start works, with positive starts converging to $2$ and negative ones to $-2$.',
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
              prompt: `Find the general antiderivative of each function, and check each answer by differentiating it.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$3x^2-4x+5$`, answer: `$x^3-2x^2+5x+C$.` },
                { prompt: `$\\sqrt{x}+\\dfrac{1}{x}$`, answer: `$\\tfrac23x^{3/2}+\\ln|x|+C$.` },
                { prompt: `$2\\cos x-\\sec^2x$`, answer: `$2\\sin x-\\tan x+C$.` },
                { prompt: `$e^x+\\frac{1}{1+x^2}$`, answer: `$e^x+\\arctan x+C$.` },
                { prompt: `$\\dfrac{(x+1)^2}{\\sqrt{x}}$`, answer: `Expand and divide first: $x^{3/2}+2x^{1/2}+x^{-1/2}$. The antiderivative is $\\tfrac25x^{5/2}+\\tfrac43x^{3/2}+2x^{1/2}+C$.` },
              ],
            },
            {
              slug: 'initial-value-problems',
              title: 'Initial value problems',
              prompt: `Solve each initial value problem, using the given values to fix the constants of integration.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$f'(x)=2x+1$, $f(1)=3$`, answer: `$f=x^2+x+C$, and $f(1)=2+C=3$, so $f(x)=x^2+x+1$.` },
                { prompt: `$f''(x)=12x^2+2$, $f(0)=1$, $f'(0)=-1$`, answer: `$f'=4x^3+2x+C$ with $C=-1$, then $f=x^4+x^2-x+D$ with $D=1$: $f(x)=x^4+x^2-x+1$.` },
                { prompt: `$f'(x)=\\sin x$, $f(\\pi)=0$`, answer: `$f=-\\cos x+C$, and $f(\\pi)=1+C=0$, so $f(x)=-\\cos x-1$.` },
                { prompt: `$f'(x)=1/x$ for $x>0$, with $f(1)=2$`, answer: `$f=\\ln x+C$, and $f(1)=C=2$, so $f(x)=\\ln x+2$.` },
              ],
            },
            {
              slug: 'braking',
              title: 'Braking distance',
              prompt: `A car at $30$ m/s brakes with constant deceleration and stops in $45$ m.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `By antidifferentiating, find the deceleration and the stopping time.`, answer: `With acceleration $-a$: $v=30-at$ and $s=30t-\\tfrac12at^2$. The car stops when $v=0$, at $t=30/a$, having gone $s=\\dfrac{900}{a}-\\dfrac{450}{a}=\\dfrac{450}{a}=45$. So $a=10\\ \\text{m/s}^2$, and the stopping time is $3$ s.` },
                { prompt: `If the same car is moving at $40$ m/s, how far does it take to stop with that deceleration?`, answer: `It stops after $40/10=4$ s, having gone $40(4)-5(4^2)=80$ m.` },
                { prompt: `Why does it not take just a third more distance?`, answer: `The stopping distance is $\\dfrac{v_0^2}{2a}$, which grows with the square of the speed: $\\left(\\tfrac43\\right)^2\\cdot45=80$ m. A third more speed means a third more braking time, travelled at a third more average speed.` },
              ],
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
          quiz: [
            {
              question: 'Find $f$ if $f\'(x)=6x^2-2$ and $f(1)=5$.',
              options: ['$2x^3-2x$', '$2x^3-2x+5$', '$12x-7$', '$6x^3-2x+1$'],
              answer: 1,
              explanation: 'Antidifferentiate term by term: $f(x)=2x^3-2x+C$. Then $f(1)=2-2+C=5$, so $C=5$. Leaving out $C$ ignores the initial condition. $6x^3-2x+1$ also has $f(1)=5$, but it forgets to divide by the new exponent: its derivative is $18x^2-2$, not $6x^2-2$.',
            },
            {
              question: 'Which of these is an antiderivative of $x\\cos x$?',
              options: ['$\\dfrac{x^2}{2}\\sin x$', '$x\\sin x$', '$x\\sin x+\\cos x$', '$\\tfrac12x^2\\cos x$'],
              answer: 2,
              explanation: 'Check by differentiating: $(x\\sin x+\\cos x)\'=\\sin x+x\\cos x-\\sin x=x\\cos x$. The tempting $\\dfrac{x^2}{2}\\sin x$ antidifferentiates each factor separately, but there is no product rule for antiderivatives: its derivative is $x\\sin x+\\dfrac{x^2}{2}\\cos x$.',
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
              prompt: `Evaluate each sum, using the standard sum formulas to find the closed forms.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\sum_{i=1}^{10}i^2$`, answer: `$\\dfrac{10\\cdot11\\cdot21}{6}=385$.` },
                { prompt: `$\\sum_{i=1}^{n}(2i+3)$ in closed form`, answer: `$2\\cdot\\dfrac{n(n+1)}{2}+3n=n^2+4n$.` },
                { prompt: `$\\sum_{i=1}^{n}(2i-1)$ in closed form`, answer: `$n(n+1)-n=n^2$.` },
                { prompt: `What does the previous part say about the sum of the first $n$ odd numbers?`, answer: `It is always a perfect square: $1+3+5+\\cdots+(2n-1)=n^2$. For example, $1+3+5+7=16$.` },
              ],
            },
            {
              slug: 'three-sums',
              title: 'Left, right and midpoint',
              prompt: `Let $f(x)=x^3$ on $[0,2]$ with $n=4$, so $\\Delta x=0.5$. The exact value of the integral is $4$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Compute $L_4$, $R_4$ and $M_4$ by hand.`, answer: `$L_4=0.5(0+0.125+1+3.375)=2.25$, $R_4=0.5(0.125+1+3.375+8)=6.25$ and $M_4=0.5(0.015625+0.421875+1.953125+5.359375)=3.875$.` },
                { prompt: `Which is best?`, answer: `$M_4$, which is off by $0.125$, against errors of $1.75$ for $L_4$ and $2.25$ for $R_4$.` },
                { prompt: `Why are $L_4$ and $R_4$ below and above the true value?`, answer: `$x^3$ is increasing on $[0,2]$, so the left endpoint gives the smallest height on each subinterval and the right endpoint the largest. Each left rectangle lies under the curve, and each right one pokes above it.` },
              ],
            },
            {
              slug: 'limit-of-sums',
              title: 'Integrals from the definition',
              prompt: `Using right endpoints and the sum formulas, evaluate each integral from the definition.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\int_1^3(2x+1)\\,dx$`, answer: `$\\Delta x=\\tfrac2n$ and $x_i=1+\\tfrac{2i}{n}$, so $R_n=\\sum_{i=1}^n\\left(3+\\tfrac{4i}{n}\\right)\\tfrac2n=6+\\tfrac{8}{n^2}\\cdot\\tfrac{n(n+1)}{2}=10+\\tfrac4n\\to10$.` },
                { prompt: `$\\int_0^1x^3\\,dx$`, answer: `$\\Delta x=\\tfrac1n$ and $x_i=\\tfrac in$, so $R_n=\\dfrac{1}{n^4}\\sum_{i=1}^n i^3=\\dfrac{1}{n^4}\\left[\\dfrac{n(n+1)}{2}\\right]^2=\\dfrac{(n+1)^2}{4n^2}\\to\\dfrac14$.` },
                { prompt: `Check your answer to the first integral using the geometry of a trapezoid.`, answer: `The region under $y=2x+1$ from $1$ to $3$ is a trapezoid with parallel sides $3$ and $7$ and width $2$, so its area is $\\tfrac12(3+7)(2)=10$.` },
              ],
            },
            {
              slug: 'distance-from-table',
              title: 'Distance from a speed table',
              prompt: `A car's speedometer gives these speeds in m/s at $t=0,10,20,30,40,50,60$ seconds: $0,\\ 12,\\ 20,\\ 24,\\ 26,\\ 25,\\ 22$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Estimate the distance travelled over the minute with a left sum.`, answer: `$L_6=10(0+12+20+24+26+25)=1070$ m.` },
                { prompt: `Estimate it with a right sum.`, answer: `$R_6=10(12+20+24+26+25+22)=1290$ m.` },
                { prompt: `Give an upper and a lower bound if you know the car only sped up until $t=40$ and then slowed down.`, answer: `On $[0,40]$ the speed rises, so left endpoints give a lower bound and right endpoints an upper one. On $[40,60]$ it falls, so the roles swap. Lower bound: $10(0+12+20+24)+10(25+22)=1030$ m. Upper bound: $10(12+20+24+26)+10(26+25)=1330$ m.` },
              ],
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
          quiz: [
            {
              question: 'Compute the midpoint sum $M_2$ for $\\int_0^4x^2\\,dx$, with two subintervals.',
              options: ['$20$', '$8$', '$40$', '$10$'],
              answer: 0,
              explanation: '$\\Delta x=2$ and the midpoints are $1$ and $3$, so $M_2=2(1^2+3^2)=20$, close to the exact value $64/3\\approx21.3$. The values $8$ and $40$ are the left and right sums, and $10$ forgets to multiply the heights by the width $\\Delta x$.',
            },
            {
              question: 'A function $f$ is decreasing on $[a,b]$. How do $L_n$, $R_n$ and $\\int_a^bf\\,dx$ compare?',
              options: [
                '$L_n\\le\\int_a^bf\\,dx\\le R_n$',
                '$L_n=R_n=\\int_a^bf\\,dx$',
                'It depends on whether $f$ is positive or negative',
                '$R_n\\le\\int_a^bf\\,dx\\le L_n$',
              ],
              answer: 3,
              explanation: 'On each subinterval a decreasing function is largest at the left end and smallest at the right end, so the left sum over-estimates and the right sum under-estimates: $R_n\\le\\int_a^bf\\,dx\\le L_n$. The order $L_n\\le\\int_a^bf\\,dx\\le R_n$ is the rule for increasing functions. Because the sums use signed heights, the comparison holds whatever the sign of $f$.',
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
              prompt: `Evaluate each integral without antiderivatives, using only areas of familiar shapes and symmetry.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\int_{-2}^{2}\\sqrt{4-x^2}\\,dx$`, answer: `The upper half of a circle of radius $2$: $\\tfrac12\\pi(2)^2=2\\pi$.` },
                { prompt: `$\\int_0^3(3-x)\\,dx$`, answer: `A triangle with base $3$ and height $3$: $\\tfrac92$.` },
                { prompt: `$\\int_0^5|x-2|\\,dx$`, answer: `Two triangles: base $2$ and height $2$ on $[0,2]$, base $3$ and height $3$ on $[2,5]$. The total is $2+\\tfrac92=\\tfrac{13}{2}$.` },
                { prompt: `$\\int_{-\\pi}^{\\pi}\\sin x\\,dx$`, answer: `$0$: sine is odd and the interval is symmetric, so the signed areas cancel.` },
                { prompt: `$\\int_{-1}^{1}(x^3+|x|)\\,dx$`, answer: `$x^3$ is odd and contributes $0$, and $|x|$ gives two triangles of area $\\tfrac12$. The total is $1$.` },
              ],
            },
            {
              slug: 'integral-algebra',
              title: 'Algebra of integrals',
              prompt: `Given $\\int_0^5f\\,dx=4$, $\\int_0^2f\\,dx=7$ and $\\int_0^5g\\,dx=-1$, find the following.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\int_2^5f\\,dx$`, answer: `By additivity, $\\int_0^5f=\\int_0^2f+\\int_2^5f$, so $\\int_2^5f\\,dx=4-7=-3$.` },
                { prompt: `$\\int_5^0(3f-2g)\\,dx$`, answer: `Reverse the limits and use linearity: $-\\big(3(4)-2(-1)\\big)=-14$.` },
                { prompt: `$\\int_2^2g\\,dx$`, answer: `$0$: the interval has zero width.` },
                { prompt: `Can you find $\\int_0^5fg\\,dx$?`, answer: `No. There is no product rule for integrals, and the data does not determine it: different $f$ and $g$ with these integrals give different values.` },
              ],
            },
            {
              slug: 'displacement-distance',
              title: 'Displacement and distance',
              prompt: `A particle has velocity $v(t)=2-|t-3|$ m/s for $0\\le t\\le6$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Sketch $v$.`, answer: `A tent shape: $v(0)=-1$, rising through $0$ at $t=1$ to a peak of $2$ at $t=3$, then falling through $0$ at $t=5$ to $-1$ at $t=6$.` },
                { prompt: `Find the displacement, using areas of triangles.`, answer: `Above the axis there is a triangle on $[1,5]$ of height $2$, with area $4$. Below there are two triangles of area $\\tfrac12$ each. The displacement is $4-\\tfrac12-\\tfrac12=3$ m.` },
                { prompt: `Find the total distance.`, answer: `Count every area as positive: $4+\\tfrac12+\\tfrac12=5$ m.` },
              ],
            },
            {
              slug: 'bounding-integrals',
              title: 'Bound without computing',
              prompt: `Prove each statement using the comparison property, without computing the integrals.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `$\\dfrac{1}{2}\\le\\int_0^1\\dfrac{dx}{1+x^3}\\le1$`, answer: `On $[0,1]$, $1\\le1+x^3\\le2$, so $\\tfrac12\\le\\dfrac{1}{1+x^3}\\le1$. Integrating over an interval of length $1$ gives the bounds. (The true value is about $0.836$.)` },
                { prompt: `$\\int_0^1x^3\\,dx\\le\\int_0^1x^2\\,dx$`, answer: `For $0\\le x\\le1$, $x^3=x\\cdot x^2\\le x^2$, so the comparison property gives the inequality. (The values are $\\tfrac14$ and $\\tfrac13$.)` },
                { prompt: `If $f$ is continuous and $f\\ge0$ on $[a,b]$ with $f(c)>0$ at some $c$, then $\\int_a^bf\\,dx>0$.`, answer: `By continuity there is an interval $I$ in $[a,b]$ around $c$, of length $\\ell>0$, on which $f>f(c)/2$. Since $f\\ge0$ elsewhere, $\\int_a^bf\\,dx\\ge\\int_If\\,dx\\ge\\ell\\cdot\\dfrac{f(c)}{2}>0$.` },
                { prompt: `Explain the idea of the previous part in terms of continuity.`, answer: `A continuous function cannot be positive at a single point only: it stays positive on a small interval around $c$. So a rectangle of positive area fits under the graph, and the rest of the integral cannot cancel it, because $f\\ge0$.` },
              ],
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
          quiz: [
            {
              question: 'Given $\\int_1^4f\\,dx=6$ and $\\int_1^4g\\,dx=-2$, what is $\\int_4^1(2f+5g)\\,dx$?',
              options: ['$2$', '$-22$', '$22$', '$-2$'],
              answer: 3,
              explanation: 'Linearity gives $\\int_1^4(2f+5g)\\,dx=2(6)+5(-2)=2$, and reversing the limits changes the sign, giving $-2$. The answer $2$ forgets that the limits run from $4$ down to $1$, and $\\pm22$ comes from a sign slip on $g$.',
            },
            {
              question: 'A particle has velocity $v(t)=t-3$ m/s for $0\\le t\\le4$. What is the total distance it travels?',
              options: ['$5$ m', '$-4$ m', '$4$ m', '$4.5$ m'],
              answer: 0,
              explanation: 'The velocity is negative on $[0,3)$ and positive on $(3,4]$, and the two triangles have areas $\\tfrac92$ and $\\tfrac12$. The displacement is the net signed area, $-\\tfrac92+\\tfrac12=-4$ m, but distance counts both pieces as positive: $\\tfrac92+\\tfrac12=5$ m.',
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
              prompt: `Evaluate each integral with the fundamental theorem, writing down the antiderivative at each step.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\int_1^4\\left(\\sqrt{x}+\\dfrac{1}{x^2}\\right)dx$`, answer: `$\\left[\\tfrac23x^{3/2}-\\tfrac1x\\right]_1^4=\\left(\\tfrac{16}{3}-\\tfrac14\\right)-\\left(\\tfrac23-1\\right)=\\tfrac{65}{12}$.` },
                { prompt: `$\\int_0^{\\pi/4}\\sec^2x\\,dx$`, answer: `$\\big[\\tan x\\big]_0^{\\pi/4}=1-0=1$.` },
                { prompt: `$\\int_1^e\\dfrac{dx}{x}$`, answer: `$\\big[\\ln x\\big]_1^e=1-0=1$.` },
                { prompt: `$\\int_0^1(e^x+x)\\,dx$`, answer: `$\\left[e^x+\\tfrac{x^2}{2}\\right]_0^1=\\left(e+\\tfrac12\\right)-1=e-\\tfrac12$.` },
                { prompt: `$\\int_0^1\\dfrac{dx}{1+x^2}$`, answer: `$\\big[\\arctan x\\big]_0^1=\\dfrac\\pi4$.` },
              ],
            },
            {
              slug: 'variable-limits',
              title: 'Variable limits',
              prompt: `Find the derivative with respect to $x$ of each function, without evaluating the integrals.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\int_0^x\\sqrt{1+t^3}\\,dt$`, answer: `By part 1 of the theorem, $\\sqrt{1+x^3}$.` },
                { prompt: `$\\int_x^2t^2\\,dt$`, answer: `$x$ is the lower limit, so write it as $-\\int_2^xt^2\\,dt$: the derivative is $-x^2$.` },
                { prompt: `$\\int_0^{\\sin x}\\dfrac{dt}{1+t^2}$`, answer: `The chain rule with $u=\\sin x$: $\\dfrac{1}{1+\\sin^2x}\\cdot\\cos x=\\dfrac{\\cos x}{1+\\sin^2x}$.` },
                { prompt: `$\\int_x^{x^2}e^{t^2}\\,dt$`, answer: `Split at $0$: $\\int_0^{x^2}e^{t^2}\\,dt-\\int_0^xe^{t^2}\\,dt$. The derivative is $e^{x^4}\\cdot2x-e^{x^2}=2xe^{x^4}-e^{x^2}$.` },
              ],
            },
            {
              slug: 'net-change',
              title: 'Net change',
              prompt: `Water flows into a tank at $r(t)=20-0.5t$ litres per minute for $0\\le t\\le60$. The tank holds $100$ L at $t=0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `When does the amount in the tank peak, and what is the amount then?`, answer: `The amount is $W(t)=100+\\int_0^t(20-0.5s)\\,ds=100+20t-0.25t^2$. It peaks where $r=0$, at $t=40$ min, with $W(40)=100+800-400=500$ L.` },
                { prompt: `What is the amount at $t=60$?`, answer: `$W(60)=100+1200-900=400$ L.` },
                { prompt: `Is the rate ever negative, and what does that mean?`, answer: `Yes, for $40<t\\le60$, where $20-0.5t<0$. Water is then leaving: the tank is draining.` },
              ],
            },
            {
              slug: 'ftc-theory',
              title: 'Theory',
              prompt: `Three questions on the hypotheses of the fundamental theorem and on its proof.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Find the error in $\\int_{-1}^{2}\\dfrac{dx}{x}=\\ln2$.`, answer: `The theorem needs $1/x$ to be continuous on $[-1,2]$, but it is unbounded at $0$, inside the interval. So the computation $\\big[\\ln|x|\\big]_{-1}^{2}=\\ln2$ is meaningless; as an improper integral, this one diverges.` },
                { prompt: `Let $F(x)=\\int_0^x\\sin(t^2)\\,dt$ for $x\\ge0$. Find the first $x>0$ where $F$ has a local maximum, and the concavity of $F$ just after $x=0$.`, answer: `$F'(x)=\\sin(x^2)$ changes from positive to negative where $x^2=\\pi$, so the first local maximum is at $x=\\sqrt\\pi\\approx1.77$. $F''(x)=2x\\cos(x^2)>0$ for small $x>0$, so $F$ is concave up just after $0$.` },
                { prompt: `Deduce part 2 of the FTC from part 1, carefully, assuming only that $F'=f$ on $[a,b]$ with $f$ continuous.`, answer: `Let $A(x)=\\int_a^xf(t)\\,dt$. By part 1, $A'=f=F'$ on $(a,b)$, and both are continuous on $[a,b]$, so by the MVT $F-A$ is a constant $C$. Hence $F(b)-F(a)=\\big(A(b)+C\\big)-\\big(A(a)+C\\big)=\\int_a^bf\\,dx-0$.` },
              ],
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
          quiz: [
            {
              question: 'Evaluate $\\int_1^2\\left(3x^2-\\dfrac{2}{x}\\right)dx$.',
              options: ['$7+2\\ln2$', '$7-\\ln2$', '$7-2\\ln2$', '$4.5$'],
              answer: 2,
              explanation: 'An antiderivative is $x^3-2\\ln x$, so the integral is $(8-2\\ln2)-(1-0)=7-2\\ln2\\approx5.61$. The value $4.5$ comes from evaluating the derivative $6x+2/x^2$ at the endpoints instead of an antiderivative, and $7+2\\ln2$ from a sign slip on the logarithm.',
            },
            {
              question: 'What is $\\dfrac{d}{dx}\\int_1^{x^3}\\cos t\\,dt$?',
              options: ['$\\cos(x^3)$', '$\\sin(x^3)-\\sin1$', '$\\cos x$', '$3x^2\\cos(x^3)$'],
              answer: 3,
              explanation: 'With $u=x^3$, part 1 of the theorem and the chain rule give $\\cos(u)\\cdot\\dfrac{du}{dx}=3x^2\\cos(x^3)$. $\\cos(x^3)$ forgets the chain rule factor, and $\\sin(x^3)-\\sin1$ is the integral itself, not its derivative.',
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
              prompt: `Evaluate each indefinite integral. Each one yields to a single substitution $u=g(x)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\int x(x^2+1)^5\\,dx$`, answer: `$u=x^2+1$, $du=2x\\,dx$: $\\tfrac12\\int u^5\\,du=\\dfrac{(x^2+1)^6}{12}+C$.` },
                { prompt: `$\\int\\sin^3x\\cos x\\,dx$`, answer: `$u=\\sin x$: $\\int u^3\\,du=\\dfrac{\\sin^4x}{4}+C$.` },
                { prompt: `$\\int\\dfrac{dx}{2x+1}$`, answer: `$u=2x+1$: $\\tfrac12\\int\\dfrac{du}{u}=\\tfrac12\\ln|2x+1|+C$.` },
                { prompt: `$\\int\\dfrac{\\ln x}{x}\\,dx$`, answer: `$u=\\ln x$, $du=dx/x$: $\\int u\\,du=\\dfrac{(\\ln x)^2}{2}+C$.` },
                { prompt: `$\\int\\dfrac{dx}{1+4x^2}$`, answer: `$u=2x$: $\\tfrac12\\int\\dfrac{du}{1+u^2}=\\tfrac12\\arctan(2x)+C$.` },
                { prompt: `$\\int\\frac{e^x}{1+e^{2x}}\\,dx$`, answer: `$u=e^x$, $du=e^x\\,dx$: $\\int\\dfrac{du}{1+u^2}=\\arctan(e^x)+C$.` },
              ],
            },
            {
              slug: 'definite-substitution',
              title: 'Definite integrals',
              prompt: `Evaluate each definite integral by substitution, changing the limits to values of $u$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\int_0^2xe^{x^2}\\,dx$`, answer: `$u=x^2$, from $0$ to $4$: $\\tfrac12\\int_0^4e^u\\,du=\\dfrac{e^4-1}{2}\\approx26.8$.` },
                { prompt: `$\\int_0^{\\pi/2}\\dfrac{\\cos x}{(1+\\sin x)^2}\\,dx$`, answer: `$u=1+\\sin x$, from $1$ to $2$: $\\int_1^2u^{-2}\\,du=\\left[-\\tfrac1u\\right]_1^2=\\tfrac12$.` },
                { prompt: `$\\int_0^3\\frac{x}{\\sqrt{x+1}}\\,dx$`, answer: `$u=x+1$, from $1$ to $4$, with $x=u-1$: $\\int_1^4\\left(u^{1/2}-u^{-1/2}\\right)du=\\left[\\tfrac23u^{3/2}-2u^{1/2}\\right]_1^4=\\tfrac43+\\tfrac43=\\tfrac83$.` },
                { prompt: `$\\int_1^{e}\\dfrac{(\\ln x)^2}{x}\\,dx$`, answer: `$u=\\ln x$, from $0$ to $1$: $\\int_0^1u^2\\,du=\\tfrac13$.` },
              ],
            },
            {
              slug: 'symmetry-integrals',
              title: 'Symmetry and a neat trick',
              prompt: `Use substitution to prove the symmetry rules for integrals, then apply them, and finish with one more trick.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $\\int_{-a}^{a}f\\,dx=0$ for odd $f$ and $2\\int_0^af\\,dx$ for even $f$.`, answer: `Split at $0$ and put $u=-x$ on the negative part: $\\int_{-a}^0f(x)\\,dx=\\int_a^0f(-u)(-du)=\\int_0^af(-u)\\,du$. For odd $f$ this is $-\\int_0^af\\,du$, which cancels the other half. For even $f$ it is $+\\int_0^af\\,du$, which doubles it.` },
                { prompt: `Evaluate $\\int_{-1}^{1}x^3\\cos x\\,dx$.`, answer: `$0$: $x^3\\cos x$ is odd (odd times even), and the interval is symmetric.` },
                { prompt: `Use $u=\\pi/2-x$ to show that $\\int_0^{\\pi/2}\\sin^2x\\,dx=\\int_0^{\\pi/2}\\cos^2x\\,dx$.`, answer: `With $u=\\pi/2-x$, $du=-dx$, the limits swap, and $\\sin x=\\sin(\\pi/2-u)=\\cos u$. So $\\int_0^{\\pi/2}\\sin^2x\\,dx=\\int_{\\pi/2}^0\\cos^2u\\,(-du)=\\int_0^{\\pi/2}\\cos^2u\\,du$.` },
                { prompt: `Hence find their common value.`, answer: `Their sum is $\\int_0^{\\pi/2}(\\sin^2x+\\cos^2x)\\,dx=\\int_0^{\\pi/2}1\\,dx=\\dfrac\\pi2$, so each equals $\\dfrac\\pi4$.` },
              ],
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
          quiz: [
            {
              question: 'Evaluate $\\int_1^2 2x(x^2-1)^2\\,dx$.',
              options: ['$\\tfrac73$', '$9$', '$27$', '$\\tfrac92$'],
              answer: 1,
              explanation: 'Let $u=x^2-1$, so $du=2x\\,dx$, and change the limits: $x=1$ gives $u=0$ and $x=2$ gives $u=3$. Then $\\int_0^3u^2\\,du=9$. Keeping the old limits gives $\\int_1^2u^2\\,du=\\tfrac73$, the usual slip: the limits belong to $x$ and must be converted. $27$ forgets to divide $u^3$ by $3$.',
            },
            {
              question: 'For which integral does the substitution $u=x^2$ work?',
              options: ['$\\int x\\sin(x^2)\\,dx$', '$\\int\\sin(x^2)\\,dx$', '$\\int x^2\\sin(x^2)\\,dx$', '$\\int\\cos x\\sin(x^2)\\,dx$'],
              answer: 0,
              explanation: '$du=2x\\,dx$, so the integrand needs a factor of $x$ to absorb $du$: $\\int x\\sin(x^2)\\,dx=\\tfrac12\\int\\sin u\\,du=-\\tfrac12\\cos(x^2)+C$. Without exactly that factor, stray $x$ terms remain and the integral does not convert. $\\int\\sin(x^2)\\,dx$ has no elementary antiderivative at all.',
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
              prompt: `Find the area of the region bounded by the given curves in each part.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y=x^2$ and $y=2x$`, answer: `They meet at $x=0$ and $x=2$, with the line on top: $\\int_0^2(2x-x^2)\\,dx=4-\\tfrac83=\\tfrac43$.` },
                { prompt: `$y=x^3$ and $y=x$ (both lobes)`, answer: `They meet at $x=-1,0,1$. By symmetry the area is twice the right lobe, where $x\\ge x^3$: $2\\int_0^1(x-x^3)\\,dx=2\\cdot\\tfrac14=\\tfrac12$.` },
                { prompt: `$y=e^x$, $y=e^{-x}$ and $x=1$`, answer: `The curves meet at $x=0$, and $e^x$ is on top for $x>0$: $\\int_0^1(e^x-e^{-x})\\,dx=(e-1)-(1-e^{-1})=e+\\tfrac1e-2\\approx1.086$.` },
              ],
            },
            {
              slug: 'integrate-in-y',
              title: 'Integrate in y',
              prompt: `Consider the region bounded by the parabola $x=y^2-3$ and the line $x=2y+5$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find its area by horizontal slices.`, answer: `They meet where $y^2-3=2y+5$, at $y=-2$ and $y=4$, and the line is on the right. So $A=\\int_{-2}^{4}\\big((2y+5)-(y^2-3)\\big)\\,dy=\\int_{-2}^{4}(8+2y-y^2)\\,dy=36$.` },
                { prompt: `Set up (do not evaluate) the same area with vertical slices, and say why it takes two integrals.`, answer: `The curves meet at $(1,-2)$ and $(13,4)$, and the parabola's vertex is $(-3,0)$. For $-3\\le x\\le1$ a slice runs between the two halves of the parabola, $y=\\pm\\sqrt{x+3}$. For $1\\le x\\le13$ it runs from the line $y=\\tfrac{x-5}{2}$ up to $y=\\sqrt{x+3}$. So $A=\\int_{-3}^{1}2\\sqrt{x+3}\\,dx+\\int_{1}^{13}\\left(\\sqrt{x+3}-\\tfrac{x-5}{2}\\right)dx$. Two integrals are needed because the lower boundary changes formula at $x=1$. (They also give $36$.)` },
              ],
            },
            {
              slug: 'equal-area-line',
              title: 'A line that halves a region',
              prompt: `Find the number $k$ such that the horizontal line $y=k$ divides the region between $y=x^2$ and $y=4$ into two parts of equal area.`,
              kind: 'problem',
              difficulty: 3,
              answer: `The whole region has area $\\int_{-2}^{2}(4-x^2)\\,dx=\\tfrac{32}{3}$. The part below $y=k$ lies between $x=\\pm\\sqrt k$, with area $\\int_{-\\sqrt k}^{\\sqrt k}(k-x^2)\\,dx=\\tfrac43k^{3/2}$. Setting this equal to $\\tfrac{16}{3}$ gives $k^{3/2}=4$, so $k=4^{2/3}\\approx2.52$.`,
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
          quiz: [
            {
              question: 'What is the area of the region between $y=x^2$ and $y=4x$?',
              options: ['$\\tfrac{32}{3}$', '$-\\tfrac{32}{3}$', '$\\tfrac{64}{3}$', '$32$'],
              answer: 0,
              explanation: 'The curves meet where $x^2=4x$, at $x=0$ and $x=4$, and the line is on top (at $x=1$, $4>1$). So $A=\\int_0^4(4x-x^2)\\,dx=32-\\tfrac{64}{3}=\\tfrac{32}{3}$. A negative answer means the curves were subtracted the wrong way round; an area is never negative. $\\tfrac{64}{3}$ and $32$ are the areas under each curve separately.',
            },
            {
              question: 'Since $\\int_0^{2\\pi}\\sin x\\,dx=0$, what is the area between $y=\\sin x$ and the $x$-axis on $[0,2\\pi]$?',
              options: [
                '$0$, the value of the integral',
                '$4$: the arches above and below cancel in the integral but both count as area',
                '$2\\pi$, the length of the interval',
                '$2$, the area of one arch',
              ],
              answer: 1,
              explanation: 'Sine is above the axis on $(0,\\pi)$ and below on $(\\pi,2\\pi)$, so the integral is a net value: $2+(-2)=0$. The area counts both arches as positive. Split at $\\pi$: $\\int_0^\\pi\\sin x\\,dx-\\int_\\pi^{2\\pi}\\sin x\\,dx=2+2=4$.',
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
              prompt: `Derive each volume with the disk method, by rotating a suitable region about the $x$-axis.`,
              kind: 'derivation',
              difficulty: 1,
              parts: [
                { prompt: `A sphere of radius $r$`, answer: `Rotate the half-disk under $y=\\sqrt{r^2-x^2}$: $V=\\pi\\int_{-r}^{r}(r^2-x^2)\\,dx=\\pi\\left(2r^3-\\tfrac23r^3\\right)=\\tfrac43\\pi r^3$.` },
                { prompt: `A cone of base radius $r$ and height $h$`, answer: `Rotate the region under the line $y=\\tfrac rhx$ for $0\\le x\\le h$: $V=\\pi\\int_0^h\\dfrac{r^2}{h^2}x^2\\,dx=\\dfrac{\\pi r^2}{h^2}\\cdot\\dfrac{h^3}{3}=\\tfrac13\\pi r^2h$.` },
                { prompt: `A spherical cap of height $h$ cut from a sphere of radius $r$`, answer: `Integrate the sphere's disks over the last stretch of height $h$: $V=\\pi\\int_{r-h}^{r}(r^2-x^2)\\,dx=\\dfrac{\\pi h^2(3r-h)}{3}$. As a check, $h=2r$ gives the whole sphere.` },
              ],
            },
            {
              slug: 'washer-drill',
              title: 'Disks and washers',
              prompt: `Find the volume of the solid formed when each region is rotated about the given line.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `The region under $y=x^2$ on $[0,2]$, about the $x$-axis`, answer: `Disks of radius $x^2$: $\\pi\\int_0^2x^4\\,dx=\\dfrac{32\\pi}{5}$.` },
                { prompt: `The region between $y=x^2$ and $y=4$, about the line $y=-1$`, answer: `Washers with $R=4-(-1)=5$ and $r=x^2+1$, for $-2\\le x\\le2$: $\\pi\\int_{-2}^{2}\\big(25-(x^2+1)^2\\big)\\,dx=\\dfrac{1088\\pi}{15}$.` },
                { prompt: `The region between $y=x^2$ and $y=4$, about the line $y=4$`, answer: `The axis is the top edge, so the slices are disks of radius $4-x^2$: $\\pi\\int_{-2}^{2}(4-x^2)^2\\,dx=\\dfrac{512\\pi}{15}$.` },
                { prompt: `The region between $y=\\sqrt{x}$, $y=0$ and $x=4$, about the $y$-axis, with horizontal slices`, answer: `For $0\\le y\\le2$ the slice runs from $x=y^2$ to $x=4$, so it is a washer with $R=4$ and $r=y^2$: $\\pi\\int_0^2(16-y^4)\\,dy=\\pi\\left(32-\\tfrac{32}{5}\\right)=\\dfrac{128\\pi}{5}$.` },
              ],
            },
            {
              slug: 'known-cross-section',
              title: 'A wedge from a log',
              prompt: `A wedge is cut from a cylindrical log of radius $r$ by a flat cut across the log and a second cut at $45^\\circ$ that meets the first along a diameter. Use cross-sections perpendicular to that diameter.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Show that the cross-sections are right isosceles triangles.`, answer: `Put the diameter on the $x$-axis. At $x$, the flat cut gives a horizontal leg from the diameter to the edge of the log, of length $y=\\sqrt{r^2-x^2}$. The $45^\\circ$ cut rises one unit for each unit along that leg, so the vertical leg also has length $y$, at a right angle to the first: a right isosceles triangle.` },
                { prompt: `Find the volume of the wedge. (Note that the answer has no $\\pi$.)`, answer: `Each triangle has area $\\tfrac12y^2=\\tfrac12(r^2-x^2)$, so $V=\\int_{-r}^{r}\\tfrac12(r^2-x^2)\\,dx=\\tfrac23r^3$.` },
              ],
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
          quiz: [
            {
              question: 'The region under $y=\\sqrt{x}$ on $[0,9]$ is rotated about the $x$-axis. What is the volume?',
              options: ['$18\\pi$', '$\\dfrac{81}{2}$', '$81\\pi$', '$\\dfrac{81\\pi}{2}$'],
              answer: 3,
              explanation: 'Each slice is a disk of radius $\\sqrt x$, with area $\\pi(\\sqrt x)^2=\\pi x$. So $V=\\pi\\int_0^9x\\,dx=\\dfrac{81\\pi}{2}$. The value $18\\pi$ comes from $\\pi\\int_0^9\\sqrt x\\,dx$, which forgets to square the radius, and $\\dfrac{81}{2}$ forgets the $\\pi$ in the area of a disk.',
            },
            {
              question: 'A washer-shaped slice has outer radius $R=3$, inner radius $r=1$ and thickness $dx$. What is its volume?',
              options: ['$4\\pi\\,dx$', '$2\\pi\\,dx$', '$8\\pi\\,dx$', '$10\\pi\\,dx$'],
              answer: 2,
              explanation: 'A washer is a disk of radius $R$ with a disk of radius $r$ removed, so its area is $\\pi(R^2-r^2)=\\pi(9-1)=8\\pi$. $\\pi(R-r)^2=4\\pi$ squares the difference instead of taking the difference of the squares, and $10\\pi$ adds the two disks instead of subtracting.',
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
              prompt: `Use cylindrical shells to find the volume of each solid of revolution.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `The region under $y=\\sqrt{x}$ on $[0,4]$, rotated about the $y$-axis`, answer: `Radius $x$, height $\\sqrt x$: $2\\pi\\int_0^4x^{3/2}\\,dx=2\\pi\\cdot\\tfrac25\\cdot32=\\dfrac{128\\pi}{5}$.` },
                { prompt: `The region under $y=e^{-x^2}$ on $[0,1]$, rotated about the $y$-axis`, answer: `$2\\pi\\int_0^1xe^{-x^2}\\,dx$, and with $u=x^2$ this is $\\pi\\int_0^1e^{-u}\\,du=\\pi\\left(1-\\tfrac1e\\right)\\approx1.99$.` },
                { prompt: `The region under $y=x^2$ on $[0,2]$, rotated about the line $x=3$`, answer: `The shell radius is the distance to the axis, $3-x$: $2\\pi\\int_0^2(3-x)x^2\\,dx=2\\pi(8-4)=8\\pi$.` },
              ],
            },
            {
              slug: 'both-ways',
              title: 'Compute it both ways',
              prompt: `Take the region bounded by $y=x^2$, $y=0$ and $x=2$. Find each volume of rotation by both washers and shells, and confirm that the two methods agree.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Rotate the region about the $x$-axis.`, answer: `Disks: $\\pi\\int_0^2x^4\\,dx=\\dfrac{32\\pi}{5}$. Shells, with horizontal strips at height $y$ from $x=\\sqrt y$ to $x=2$: $2\\pi\\int_0^4y(2-\\sqrt y)\\,dy=2\\pi\\left(16-\\tfrac{64}{5}\\right)=\\dfrac{32\\pi}{5}$.` },
                { prompt: `Rotate the region about the $y$-axis.`, answer: `Shells: $2\\pi\\int_0^2x\\cdot x^2\\,dx=8\\pi$. Washers, with horizontal slices of outer radius $2$ and inner radius $\\sqrt y$: $\\pi\\int_0^4(4-y)\\,dy=\\pi(16-8)=8\\pi$.` },
              ],
            },
            {
              slug: 'torus-and-bead',
              title: 'Torus and napkin ring',
              prompt: `Two classic solids of revolution, both found with cylindrical shells.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `By shells, show that the torus formed by rotating the disk $(x-R)^2+y^2\\le r^2$ about the $y$-axis ($R>r$) has volume $2\\pi^2Rr^2$. (Hint for the integral: use the geometry of a half-disk, after substituting $u=x-R$.)`, answer: `A shell at radius $x$ has height $2\\sqrt{r^2-(x-R)^2}$, so $V=2\\pi\\int_{R-r}^{R+r}2x\\sqrt{r^2-(x-R)^2}\\,dx$. With $u=x-R$ this is $4\\pi\\int_{-r}^{r}(u+R)\\sqrt{r^2-u^2}\\,du$. The $u$ term is odd and gives $0$, and $\\int_{-r}^{r}\\sqrt{r^2-u^2}\\,du=\\tfrac12\\pi r^2$, the area of a half-disk. So $V=4\\pi R\\cdot\\tfrac12\\pi r^2=2\\pi^2Rr^2$.` },
                { prompt: `A cylindrical hole is drilled through the centre of a sphere of radius $a$, leaving a ring of height $h$. Show that the volume left is $\\pi h^3/6$.`, answer: `The hole has radius $b$, with $b^2=a^2-(h/2)^2$. A shell at radius $x$, for $b\\le x\\le a$, has height $2\\sqrt{a^2-x^2}$, so $V=2\\pi\\int_b^a2x\\sqrt{a^2-x^2}\\,dx=\\left[-\\tfrac43\\pi(a^2-x^2)^{3/2}\\right]_b^a=\\tfrac43\\pi(a^2-b^2)^{3/2}=\\tfrac43\\pi\\left(\\tfrac h2\\right)^3=\\dfrac{\\pi h^3}{6}$.` },
                { prompt: `Explain why that result is surprising.`, answer: `It does not depend on $a$. A ring of height $6$ cm cut from a ball the size of the Earth has the same volume as a ball of radius $3$ cm, where the hole has shrunk to nothing. The larger sphere leaves a wider ring with a thinner wall, and the two effects balance exactly.` },
              ],
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
          quiz: [
            {
              question: 'The region under $y=x^2$ on $[0,1]$ is rotated about the $y$-axis. What volume do cylindrical shells give?',
              options: ['$\\dfrac{\\pi}{5}$', '$\\dfrac{\\pi}{2}$', '$\\dfrac{2\\pi}{3}$', '$\\dfrac{\\pi}{4}$'],
              answer: 1,
              explanation: 'A strip at $x$ has radius $x$ and height $x^2$, so $V=2\\pi\\int_0^1x\\cdot x^2\\,dx=\\dfrac{2\\pi}{4}=\\dfrac\\pi2$. $\\dfrac{2\\pi}{3}$ leaves out the radius factor $x$, and $\\dfrac\\pi5$ is the disk volume about the $x$-axis, which is a different solid.',
            },
            {
              question: 'Shells are used to rotate a region lying in $0\\le x\\le2$ about the line $x=-1$. What is the radius of the shell at $x$?',
              options: ['$x+1$', '$x-1$', '$x$', '$1-x$'],
              answer: 0,
              explanation: 'The radius is the distance from the strip to the axis of rotation. The strip at $x\\ge0$ lies to the right of the line $x=-1$ by $x-(-1)=x+1$. Using $x$ treats the axis as the $y$-axis, and $x-1$ gets the direction of the shift wrong.',
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
              prompt: `Compute each average with the formula $f_{\\text{avg}}=\\dfrac{1}{b-a}\\int_a^bf\\,dx$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the average of $x^2$ on $[1,4]$, and a value $c$ where it is attained.`, answer: `$\\dfrac13\\int_1^4x^2\\,dx=\\dfrac13\\cdot\\dfrac{64-1}{3}=7$, and $c^2=7$ gives $c=\\sqrt7\\approx2.65$, which is in $[1,4]$.` },
                { prompt: `A household's power use over a day is modelled as $P(t)=2+\\sin(\\pi t/12)$ kW, for $0\\le t\\le24$ hours. Find the energy used and the average power.`, answer: `The sine term has period $24$ h, so it integrates to $0$ over the day. The energy is $\\int_0^{24}P\\,dt=48$ kWh, and the average power is $48/24=2$ kW.` },
                { prompt: `A ball is dropped and falls freely for $T$ seconds. Show that its average velocity with respect to time is half of its final velocity.`, answer: `Its velocity is $v=gt$, so the average over $[0,T]$ is $\\dfrac1T\\int_0^Tgt\\,dt=\\dfrac1T\\cdot\\dfrac{gT^2}{2}=\\dfrac{gT}{2}$, half the final velocity $gT$.` },
              ],
            },
            {
              slug: 'springs-and-ropes',
              title: 'Springs and ropes',
              prompt: `Compute the work in each part, using $g=9.8\\ \\text{m/s}^2$ where gravity is involved.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `A spring needs $6$ J to stretch from rest length to $0.3$ m. How much work is needed to stretch it from $0.3$ m to $0.6$ m beyond rest?`, answer: `$\\int_0^{0.3}kx\\,dx=0.045k=6$, so $k=\\tfrac{400}{3}$ N/m. Then $\\int_{0.3}^{0.6}kx\\,dx=\\tfrac k2(0.36-0.09)=18$ J.` },
                { prompt: `A $30$ m rope of mass $1.5$ kg/m hangs from a roof. Find the work to pull it all up.`, answer: `A piece at depth $y$, of length $dy$, weighs $1.5(9.8)\\,dy$ N and rises $y$ m, so $W=\\int_0^{30}14.7y\\,dy=14.7\\cdot450=6615$ J.` },
                { prompt: `A $20$ kg bucket hangs at the end of that rope, and is lifted with the rope. Find the total work.`, answer: `The bucket needs a constant force of $20(9.8)=196$ N through $30$ m, which is $5880$ J. The total is $6615+5880=12\\,495$ J.` },
              ],
            },
            {
              slug: 'conical-pump',
              title: 'Pumping a cone',
              prompt: `An inverted cone (point down) of height $6$ m and top radius $3$ m is full of water. Find the work needed to pump the water to a pipe $1$ m above the top of the tank. Use density $1000\\ \\text{kg/m}^3$ and $g=9.8\\ \\text{m/s}^2$.`,
              kind: 'problem',
              difficulty: 2,
              answer: `Measure $y$ up from the point. By similar triangles a slice at height $y$ has radius $y/2$, so its volume is $\\pi\\tfrac{y^2}{4}\\,dy$ and its weight $9800\\pi\\tfrac{y^2}{4}\\,dy$ N, and it rises $7-y$ m to the pipe. So $W=9800\\pi\\int_0^6\\dfrac{y^2}{4}(7-y)\\,dy=9800\\pi\\cdot45\\approx1.39\\times10^6$ J.`,
            },
            {
              slug: 'escape',
              title: 'Lifting a payload',
              prompt: `Gravity on a mass $m$ at distance $r$ from Earth's centre is $F=GMm/r^2$, with $GM=3.986\\times10^{14}\\ \\text{m}^3/\\text{s}^2$ and Earth's radius $R=6.371\\times10^6$ m.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Find the work to raise a $1000$ kg payload from the surface to an altitude of $1000$ km.`, answer: `$W=\\int_R^{R+h}\\dfrac{GMm}{r^2}\\,dr=GMm\\left(\\dfrac1R-\\dfrac{1}{R+h}\\right)$ with $h=10^6$ m, which is about $8.49\\times10^9$ J.` },
                { prompt: `Compare with the constant-gravity estimate $mgh$.`, answer: `$mgh=1000(9.8)(10^6)=9.8\\times10^9$ J, about $15\\%$ too high, because gravity weakens with altitude.` },
                { prompt: `Take $r\\to\\infty$ to find the work to escape Earth entirely, and hence the escape speed from $\\tfrac12mv^2=W$.`, answer: `As the upper limit tends to infinity, $W\\to\\dfrac{GMm}{R}\\approx6.26\\times10^{10}$ J. Then $v=\\sqrt{2GM/R}\\approx1.12\\times10^4$ m/s, about $11.2$ km/s, whatever the mass.` },
              ],
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
          quiz: [
            {
              question: 'What is the average value of $f(x)=3x^2$ on $[0,2]$?',
              options: ['$8$', '$6$', '$4$', '$12$'],
              answer: 2,
              explanation: '$f_{\\text{avg}}=\\dfrac12\\int_0^23x^2\\,dx=\\dfrac12\\cdot8=4$. The option $8$ is the integral before dividing by the length of the interval, and $6$ averages only the endpoint values $0$ and $12$, which works for a straight line but not for a curve.',
            },
            {
              question: 'A spring has rest length $0.5$ m and $k=100$ N/m. How much work stretches it from a total length of $0.6$ m to $0.8$ m?',
              options: ['$14$ J', '$2$ J', '$20$ J', '$4$ J'],
              answer: 3,
              explanation: 'Measure $x$ from the rest length, so the stretch goes from $0.1$ m to $0.3$ m: $W=\\int_{0.1}^{0.3}100x\\,dx=50(0.09-0.01)=4$ J. Using the total lengths, $\\int_{0.6}^{0.8}100x\\,dx=14$ J, is the classic error. $2$ J is $\\tfrac12k(0.2)^2$, which treats the spring as if it started at rest length.',
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
