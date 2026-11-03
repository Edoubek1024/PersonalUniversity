import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const orloffOcw: ResourceInput = {
  title: 'MIT 18.04 Complex Variables with Applications',
  url: 'https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};

const orloffText: ResourceInput = {
  title: 'Complex Variables with Applications (Orloff)',
  url: 'https://math.libretexts.org/Bookshelves/Analysis/Complex_Variables_with_Applications_(Orloff)',
  type: 'textbook',
  cost: 'free',
  provider: 'LibreTexts',
};

const beckEtAl: ResourceInput = {
  title: 'A First Course in Complex Analysis (Beck, Marchesi, Pixton, Sabalka)',
  url: 'https://matthbeck.github.io/complex.html',
  type: 'textbook',
  cost: 'free',
  provider: 'Matthias Beck and coauthors',
};

const mpmathDocs: ResourceInput = {
  title: 'mpmath documentation',
  url: 'https://mpmath.org/doc/current/',
  type: 'documentation',
  cost: 'free',
  provider: 'mpmath',
};

export default defineSubject({
  id: 'complex-variables',
  title: 'Applied Complex Variables',
  category: 'math',
  tagline:
    'A working knowledge of complex analysis: analytic functions, contour integrals, residues for real integrals and transforms, and conformal maps for flow, heat and electrostatics.',
  description: `Complex numbers began as a trick for solving cubics. They turned into one of the most useful tools in applied mathematics. With them you can evaluate real integrals that resist every calculus technique, invert Laplace and Fourier transforms, count the roots of a polynomial in a region without finding them, and solve two-dimensional problems in fluid flow, heat conduction and electrostatics by bending one region into another.

This course follows the public catalog description of University of Illinois MATH 446, Applied Complex Variables: a working knowledge of complex variables, covering the standard topics with an introduction to integration by residues, the argument principle, conformal maps and potential fields. The sequence, explanations and exercises are original. This site is not affiliated with the University of Illinois, and nothing here is taken from that course's materials.

The emphasis is applied, as in MATH 446. Theorems are stated with their hypotheses, and the main ones are proved or sketched when the proof shows how to use them. The goal is that you can compute correctly and know when a method applies. The only prerequisite is Calculus III: you need partial derivatives, line integrals and Green's theorem, all of which are recalled when they appear. A course in proof helps, but it is not required.

Every lesson asks you to check results numerically, and Python with mpmath or SciPy is the tool. A residue calculation that disagrees with numerical quadrature has an error in it, and finding it is part of the learning. The main free texts are Orloff's MIT 18.04 notes and Beck and coauthors' *A First Course in Complex Analysis*.`,
  difficulty: 'advanced',
  estimatedHours: 70,
  prerequisites: ['calculus-3'],
  recommendedBackground: [
    'Partial derivatives, line integrals and Green\'s theorem',
    'Basic Python with NumPy, SciPy or mpmath for numerical checks',
    'Some exposure to differential equations helps for the transforms lesson',
  ],
  tags: ['complex analysis', 'residues', 'contour integration', 'conformal maps', 'potential flow', 'transforms'],
  core: false,
  modules: [
    {
      slug: 'complex-numbers-and-functions',
      title: 'Complex Numbers and Functions',
      description:
        'Arithmetic and geometry of complex numbers, the exponential and trigonometric functions, and the logarithm with its branches.',
      lessons: [
        {
          slug: 'complex-arithmetic-and-polar-form',
          title: 'Complex arithmetic and polar form',
          summary:
            'The algebra and geometry of complex numbers, Euler\'s formula, powers and roots.',
          estimatedMinutes: 110,
          objectives: [
            'Compute with complex numbers in Cartesian and polar form',
            'Interpret multiplication as rotation and scaling',
            'Use Euler\'s formula and de Moivre\'s theorem',
            'Find all $n$th roots of a complex number',
          ],
          concepts: [
            'Real and imaginary parts',
            'Conjugate and modulus',
            'Argument and principal argument',
            'Euler\'s formula',
            'de Moivre\'s theorem',
            'Roots of unity',
            'Triangle inequality',
          ],
          explanation: `A complex number is $z=x+iy$, with $x,y$ real and $i^2=-1$. Think of it as the point $(x,y)$ in the plane. Addition is vector addition. The **conjugate** is $\\bar z=x-iy$, the **modulus** is $|z|=\\sqrt{x^2+y^2}$, and $z\\bar z=|z|^2$. Division uses the conjugate: $\\frac1z=\\frac{\\bar z}{|z|^2}$.

**Polar form.** Writing $x=r\\cos\\theta$ and $y=r\\sin\\theta$, we get $z=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta}$, where **Euler's formula** $e^{i\\theta}=\\cos\\theta+i\\sin\\theta$ is the definition, or a consequence of the power series. Here $r=|z|$, and $\\theta$ is an **argument** of $z$, defined only up to multiples of $2\\pi$. The **principal argument** $\\mathrm{Arg}\\,z$ is the one in $(-\\pi,\\pi]$.

The point of polar form: $r_1e^{i\\theta_1}\\cdot r_2e^{i\\theta_2}=r_1r_2e^{i(\\theta_1+\\theta_2)}$. Multiplying multiplies lengths and adds angles. So multiplying by $i=e^{i\\pi/2}$ is a quarter turn. This is the geometric content of complex numbers. And **de Moivre's theorem** follows: $(e^{i\\theta})^n=e^{in\\theta}$.

**Worked example 1.** Compute $(1+i)^{10}$. In polar form, $1+i=\\sqrt2e^{i\\pi/4}$. So
$$(1+i)^{10}=(\\sqrt2)^{10}e^{i\\,10\\pi/4}=32e^{i5\\pi/2}=32e^{i\\pi/2}=32i.$$
Expanding by the binomial theorem would have taken eleven terms.

**Worked example 2.** Solve $z^4=-16$. Write $-16=16e^{i(\\pi+2\\pi k)}$. A fourth root has modulus $16^{1/4}=2$ and argument $\\frac{\\pi+2\\pi k}{4}$. Distinct values come from $k=0,1,2,3$:
$$z=2e^{i\\pi/4},\\ 2e^{i3\\pi/4},\\ 2e^{i5\\pi/4},\\ 2e^{i7\\pi/4},\\quad\\text{that is,}\\quad z=\\sqrt2(\\pm1\\pm i).$$
They are the vertices of a square. In general, the $n$th roots of $w\\ne0$ are $n$ points equally spaced on a circle of radius $|w|^{1/n}$. Including the $2\\pi k$ is what finds all of them.

**Pitfalls.**

- *The argument is not $\\arctan(y/x)$.* $\\arctan$ only returns values in $(-\\frac\\pi2,\\frac\\pi2)$. For $z=-1-i$, $\\frac yx=1$ and $\\arctan1=\\frac\\pi4$, but $\\mathrm{Arg}(-1-i)=-\\frac{3\\pi}4$. In code, use \`atan2(y, x)\` or \`cmath.phase\`.
- *There is no ordering.* Inequalities such as $z_1<z_2$ have no meaning for complex numbers. Only moduli can be compared.
- *Triangle inequality.* $|z_1+z_2|\\le|z_1|+|z_2|$ and $|z_1+z_2|\\ge\\big||z_1|-|z_2|\\big|$. The second is what you use to bound denominators from below, which you will do constantly with contour integrals.`,
          resources: [
            { ...orloffText, primary: true, note: 'The opening chapter on complex algebra and the complex plane.' },
            { ...beckEtAl, note: 'Its first chapter covers the same algebra with more geometric exercises.' },
            {
              title: 'Euler\'s formula with introductory group theory (3Blue1Brown)',
              url: 'https://www.3blue1brown.com/lessons/eulers-formula-dynamically',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'A visual explanation of why $e^{i\\theta}$ is a rotation.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/complex-analytic-functions'],
          exercises: [
            {
              slug: 'arithmetic-drill',
              title: 'Arithmetic drill',
              prompt: `Write in the form $x+iy$, then find the modulus and principal argument. (a) $\\frac{3+4i}{1-2i}$. (b) $(1-i\\sqrt3)^6$. (c) $\\frac{1}{(1+i)^3}$. (d) $e^{2+i\\pi/3}$. Check each with Python's \`cmath\`. Expected for (a): $-1+2i$, and for (b): $64$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'roots',
              title: 'Roots',
              prompt: `Find all solutions and plot them. (a) $z^3=8i$. (b) $z^6=1$. (c) $z^2=3-4i$, in Cartesian form, by solving for real and imaginary parts. (d) $z^2+(1-i)z-i=0$, using the quadratic formula. Check that the roots of unity in (b) sum to 0, and explain why.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'For (c), write $z=a+ib$ and solve $a^2-b^2=3$, $2ab=-4$.',
            },
            {
              slug: 'trig-identities',
              title: 'Identities from Euler',
              prompt: `Use $e^{i\\theta}$ to derive: (a) $\\cos3\\theta=4\\cos^3\\theta-3\\cos\\theta$. (b) $\\sum_{k=0}^{n-1}\\cos(k\\theta)=\\mathrm{Re}\\frac{1-e^{in\\theta}}{1-e^{i\\theta}}$ for $e^{i\\theta}\\ne1$, and simplify it. (c) $\\cos^4\\theta=\\frac18(\\cos4\\theta+4\\cos2\\theta+3)$. (d) For which $z$ does $|z-1|=|z+1|$ hold? Describe the set geometrically.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $z^n=w$ have exactly $n$ solutions for $w\\ne0$?',
              answerOutline: `The modulus is fixed at $|w|^{1/n}$, and the arguments $\\frac{\\theta+2\\pi k}{n}$ give $n$ different points for $k=0,\\dots,n-1$, after which they repeat. A good answer mentions the $2\\pi k$, without which only one root appears.`,
            },
            {
              question: 'What does multiplication by $e^{i\\pi/3}$ do to the plane?',
              answerOutline: `It rotates every point by $60^\\circ$ counter-clockwise about 0, with no change in distances from 0.`,
            },
            {
              question: 'What is $\\mathrm{Arg}(-2)$, and what is $\\mathrm{Arg}(-1-i\\sqrt3)$?',
              answerOutline: `$\\pi$, and $-\\frac{2\\pi}3$. If you got $\\frac\\pi3$ for the second, you used $\\arctan(y/x)$ without checking the quadrant.`,
            },
          ],
        },
        {
          slug: 'elementary-functions',
          title: 'The exponential and trigonometric functions',
          summary:
            'Extending exp, sin and cos to complex arguments, how they map the plane, and solving equations with them.',
          estimatedMinutes: 110,
          objectives: [
            'Define $e^z$, $\\sin z$ and $\\cos z$ for complex $z$, and compute their real and imaginary parts',
            'Describe how $e^z$ maps lines and strips',
            'Solve equations such as $\\sin z=2$',
            'Explain which real properties survive and which fail',
          ],
          concepts: [
            'Complex exponential',
            'Periodicity of $e^z$',
            'Complex sine and cosine',
            'Hyperbolic functions',
            'Mapping of regions',
            'Unbounded sine',
          ],
          explanation: `For $z=x+iy$, define $e^z=e^xe^{iy}=e^x(\\cos y+i\\sin y)$. So $|e^z|=e^x$, and $\\arg e^z=y$. The rule $e^{z+w}=e^ze^w$ still holds, and $e^z$ is never 0. But now $e^z$ is periodic with period $2\\pi i$: $e^{z+2\\pi i}=e^z$. That single fact is the source of all the multi-valuedness of logarithms.

**Mapping.** $e^z$ sends the vertical line $\\mathrm{Re}\\,z=x_0$ to the circle of radius $e^{x_0}$, and the horizontal line $\\mathrm{Im}\\,z=y_0$ to the ray at angle $y_0$. So the strip $-\\pi<\\mathrm{Im}\\,z\\le\\pi$ maps one-to-one onto $\\mathbb{C}\\setminus\\{0\\}$. This turns rectangles into sectors of annuli, which you will use for conformal mapping.

**Trigonometric functions.** From $e^{iy}=\\cos y+i\\sin y$ we get $\\cos y=\\frac{e^{iy}+e^{-iy}}2$ and $\\sin y=\\frac{e^{iy}-e^{-iy}}{2i}$. Use the same formulas as *definitions* for complex $z$:
$$\\cos z=\\frac{e^{iz}+e^{-iz}}{2},\\qquad\\sin z=\\frac{e^{iz}-e^{-iz}}{2i}.$$
All the usual identities survive, such as $\\sin^2z+\\cos^2z=1$ and the addition formulas. But $\\cos(iy)=\\cosh y$ and $\\sin(iy)=i\\sinh y$, so both are **unbounded**. Expanding,
$$\\sin(x+iy)=\\sin x\\cosh y+i\\cos x\\sinh y.$$

**Worked example.** Solve $\\sin z=2$.

From the expansion, we need $\\sin x\\cosh y=2$ and $\\cos x\\sinh y=0$.

- If $\\sinh y=0$, then $y=0$ and $\\sin x=2$, which is impossible.
- So $\\cos x=0$, and $x=\\frac\\pi2+m\\pi$. Then $\\sin x=\\pm1$. Since $\\cosh y>0$, we need $\\sin x=1$, so $x=\\frac\\pi2+2\\pi k$, and $\\cosh y=2$.

Then $y=\\pm\\cosh^{-1}2=\\pm\\ln(2+\\sqrt3)$. So
$$z=\\frac\\pi2+2\\pi k\\pm i\\ln(2+\\sqrt3),\\qquad k\\in\\mathbb{Z}.$$
Check: $\\cosh(\\ln(2+\\sqrt3))=\\frac12(2+\\sqrt3+\\frac1{2+\\sqrt3})=\\frac12(2+\\sqrt3+2-\\sqrt3)=2$.

An alternative is to set $w=e^{iz}$, which gives the quadratic $w^2-4iw-1=0$. Both methods are worth knowing. The second turns any trigonometric equation into a polynomial one.

**Pitfalls.** "$|\\sin z|\\le1$" is false off the real line. It fails at $z=i$, where $|\\sin i|=\\sinh1\\approx1.175$. And "$e^z=e^w$ implies $z=w$" is false. It implies $z=w+2\\pi ik$ for some integer $k$. Many wrong answers in later lessons come from forgetting this.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on complex functions, including the exponential and its mapping properties.' },
            { ...orloffOcw, note: 'The early lecture notes on complex functions.' },
          ],
          exercises: [
            {
              slug: 'evaluate-functions',
              title: 'Evaluate and solve',
              prompt: `(a) Compute $\\cos(1+i)$ and $\\sin(\\pi+i\\ln2)$ in the form $x+iy$, and check with Python. (b) Solve $e^z=-2$. (c) Solve $\\cos z=3$. (d) Find all $z$ with $\\sin z=0$, and prove there are no non-real ones. (e) Solve $e^{2z}=i$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'mapping-by-exp',
              title: 'Mapping by the exponential',
              prompt: `Find and sketch the image under $w=e^z$ of: (a) the rectangle $0\\le x\\le1$, $0\\le y\\le\\pi$. (b) The strip $0<y<\\frac\\pi2$. (c) The line $y=x$. Then plot the images numerically by mapping a grid of points, and check that right angles in the grid stay right angles in the image.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'modulus-of-sine',
              title: 'Size of the sine',
              prompt: `Show that $|\\sin(x+iy)|^2=\\sin^2x+\\sinh^2y$ and $|\\cos(x+iy)|^2=\\cos^2x+\\sinh^2y$. Deduce: (a) the zeros of $\\sin z$ and $\\cos z$ are all real. (b) On the square with corners $\\pm(N+\\frac12)\\pi\\pm i(N+\\frac12)\\pi$, $|\\cot z|$ is bounded by a constant independent of $N$. You will use (b) to sum series with residues.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $e^z=1$ tell you about $z$?',
              answerOutline: `$z=2\\pi ik$ for some integer $k$. $e^x=1$ forces $x=0$, and $e^{iy}=1$ forces $y=2\\pi k$.`,
            },
            {
              question: 'Is $\\cos z$ bounded on $\\mathbb{C}$? Give a number.',
              answerOutline: `No. $\\cos(iy)=\\cosh y$, which grows without bound, such as $\\cosh 3\\approx10.07$. A theorem you will meet, Liouville's, says that a non-constant function analytic everywhere cannot be bounded.`,
            },
            {
              question: 'Why is the strip $-\\pi<y\\le\\pi$ special for $e^z$?',
              answerOutline: `$e^z$ is one-to-one on it, and it maps onto all non-zero complex numbers. That makes it the natural domain for the inverse, the principal logarithm.`,
            },
          ],
        },
        {
          slug: 'logarithms-branches-and-powers',
          title: 'Logarithms, branches and complex powers',
          summary:
            'The multi-valued logarithm, branch cuts, the principal branch and complex powers, and the identities that fail.',
          estimatedMinutes: 120,
          objectives: [
            'Compute all values of $\\log z$ and the principal value $\\mathrm{Log}\\,z$',
            'Define a branch and its branch cut',
            'Compute complex powers with $z^a=e^{a\\log z}$',
            'Recognise identities that hold only up to multiples of $2\\pi i$',
          ],
          concepts: [
            'Multi-valued logarithm',
            'Principal logarithm',
            'Branch and branch cut',
            'Branch point',
            'Complex powers',
            'Principal square root',
          ],
          explanation: `We want $\\log z$ to solve $e^w=z$. Write $z=re^{i\\theta}$ and $w=u+iv$. Then $e^u=r$ and $v=\\theta+2\\pi k$. So
$$\\log z=\\ln|z|+i\\arg z=\\ln|z|+i(\\mathrm{Arg}\\,z+2\\pi k),\\qquad k\\in\\mathbb{Z},\\ z\\ne0.$$
It has infinitely many values, spaced $2\\pi i$ apart, because $e^w$ has period $2\\pi i$.

To get an honest function, choose a **branch**: restrict the argument to an interval of length $2\\pi$. The **principal logarithm** uses $\\mathrm{Arg}\\in(-\\pi,\\pi]$:
$$\\mathrm{Log}\\,z=\\ln|z|+i\\,\\mathrm{Arg}\\,z.$$
It jumps by $2\\pi i$ across the negative real axis. Remove that ray (the **branch cut**) and $\\mathrm{Log}$ is continuous, and in fact analytic, on $\\mathbb{C}\\setminus(-\\infty,0]$. The point 0 is a **branch point**: going once around it, on any small circle, changes $\\arg$ by $2\\pi$. So no branch can be continuous on a full loop around 0. Any cut from 0 to $\\infty$ works. You choose it to suit the problem, and this will matter for contour integrals.

**Powers.** For $z\\ne0$, define $z^a=e^{a\\log z}$, which has as many values as $a\\log z$ does mod $2\\pi i$. If $a$ is an integer, there is one value. If $a=\\frac pq$ in lowest terms, there are $q$ values, the $q$th roots. Otherwise, there are infinitely many.

**Worked example.** Find all values of $(1+i)^i$, and the principal value.

First, $\\log(1+i)=\\ln\\sqrt2+i(\\frac\\pi4+2\\pi k)$. Multiply by $i$:
$$i\\log(1+i)=-\\left(\\frac\\pi4+2\\pi k\\right)+i\\ln\\sqrt2.$$
So
$$(1+i)^i=e^{-\\pi/4-2\\pi k}\\big(\\cos(\\ln\\sqrt2)+i\\sin(\\ln\\sqrt2)\\big),\\qquad k\\in\\mathbb{Z}.$$
The principal value, with $k=0$, is $e^{-\\pi/4}e^{i\\ln\\sqrt2}\\approx0.4288+0.1549i$. All values lie on a single ray, with moduli $e^{-\\pi/4-2\\pi k}$. Likewise, $i^i=e^{-\\pi/2-2\\pi k}$, which is real for all $k$.

**Pitfalls.** Rules for real logarithms and powers fail in general.

- $\\mathrm{Log}(z_1z_2)\\ne\\mathrm{Log}\\,z_1+\\mathrm{Log}\\,z_2$ in general. With $z_1=z_2=-1$, the left side is $\\mathrm{Log}\\,1=0$ and the right side is $2\\pi i$. The multi-valued version holds as an equation between sets.
- $(z^a)^b\\ne z^{ab}$ in general. A famous wrong proof: $1=\\sqrt1=\\sqrt{(-1)(-1)}=\\sqrt{-1}\\sqrt{-1}=i\\cdot i=-1$. The third equality uses $\\sqrt{ab}=\\sqrt a\\sqrt b$, which holds for principal roots of non-negative reals, but not here.
- Software uses the principal branch. NumPy's \`log\` of a negative real gives $+i\\pi$. But for $-1-0i$ with a signed zero, it may return $-i\\pi$. On a cut, check what your library does.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on complex functions covers branches, branch cuts and complex powers.' },
            { ...beckEtAl, note: 'The section on the logarithm and complex exponentials, for more exercises.' },
            {
              title: 'Domain coloring',
              url: 'https://en.wikipedia.org/wiki/Domain_coloring',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'How to plot a complex function, and what a branch cut looks like in a plot.',
            },
          ],
          exercises: [
            {
              slug: 'log-values',
              title: 'Logarithms and powers',
              prompt: `Find all values, and then the principal value: (a) $\\log(-e)$. (b) $\\log(1-i)$. (c) $i^{1/2}$. (d) $(-1)^{1/3}$. (e) $2^i$. (f) $(-1)^{\\sqrt2}$, and explain why there are infinitely many values. Check the principal values with Python's \`cmath\`.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'failing-identities',
              title: 'Which identities fail',
              prompt: `Decide whether each holds for all non-zero $z_1,z_2$, with principal values throughout, and give a counterexample or an argument. (a) $\\mathrm{Log}(z_1z_2)=\\mathrm{Log}\\,z_1+\\mathrm{Log}\\,z_2$. (b) $\\mathrm{Log}(z_1z_2)=\\mathrm{Log}\\,z_1+\\mathrm{Log}\\,z_2$ when both have positive real part. (c) $\\mathrm{Log}(e^z)=z$. (d) $e^{\\mathrm{Log}\\,z}=z$. (e) $\\sqrt{z^2}=z$. Describe the set on which (c) holds.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'domain-coloring',
              title: 'See the branch cuts',
              prompt: `Write a domain-colouring plot, with hue for $\\arg f(z)$ and brightness for $|f(z)|$, on $[-2,2]^2$. Plot $z$, $z^2$, $\\frac1z$, $\\mathrm{Log}\\,z$, $\\sqrt z$ and $\\sqrt{z^2-1}$, with NumPy's principal branches. Identify each branch cut from the picture, and describe a choice of cut for $\\sqrt{z^2-1}$ that leaves it continuous off the segment $[-1,1]$.`,
              kind: 'coding',
              difficulty: 2,
              hint: 'Try $z\\sqrt{1-1/z^2}$ with the principal root for the last part.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must every branch of $\\log$ have a cut that reaches 0?',
              answerOutline: `On any loop around 0, $\\arg$ increases by $2\\pi$. A continuous branch on the loop would have to return to its starting value, which is impossible. So each loop around 0 must cross the cut.`,
            },
            {
              question: 'How many values does $z^{3/4}$ have, and why?',
              answerOutline: `Four. $\\frac34\\cdot2\\pi k$ gives distinct values mod $2\\pi$ for $k=0,1,2,3$.`,
            },
            {
              question: 'Find the error in $1=\\sqrt{(-1)(-1)}=\\sqrt{-1}\\sqrt{-1}=-1$.',
              answerOutline: `The rule $\\sqrt{ab}=\\sqrt a\\sqrt b$ is false for principal roots of negative numbers. Arguments add, and then the sum leaves the principal range.`,
            },
          ],
        },
      ],
      project: {
        slug: 'complex-function-viewer',
        title: 'A complex function viewer',
        description: `Build a small tool to see complex functions, and use it to explore the material of this module. It will stay useful for the rest of the course: you can use it to look at singularities, residues and conformal maps.`,
        deliverables: [
          'A domain-colouring plotter with adjustable window and resolution, with a colour legend for argument and modulus',
          'A grid mapper that draws the image of a rectangular or polar grid under a function',
          'Plots of $e^z$, $\\sin z$, $\\mathrm{Log}\\,z$ and $z^{1/3}$ with their cuts identified, and a written account of each',
          'A check of the 6 sixth roots of unity and of $\\sin z=2$ found numerically with a root finder from several starting points',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add an option to choose the branch cut of $\\log$ and of $z^a$, and show how a cut changes the plot'],
      },
    },
    {
      slug: 'analytic-functions',
      title: 'Analytic Functions',
      description:
        'Complex differentiability, the Cauchy-Riemann equations, and the harmonic functions that they produce for physics.',
      lessons: [
        {
          slug: 'complex-differentiation',
          title: 'Limits and complex differentiation',
          summary:
            'What it means to differentiate with respect to a complex variable, and why it is so much stronger than real differentiability.',
          estimatedMinutes: 100,
          objectives: [
            'Compute limits of complex functions, and show that a limit fails to exist',
            'Differentiate from the definition',
            'Show that $\\bar z$ is nowhere complex differentiable',
            'Define analytic on an open set',
          ],
          concepts: [
            'Limit in the complex plane',
            'Complex derivative',
            'Direction independence',
            'Analytic (holomorphic) function',
            'Entire function',
            'Rules of differentiation',
          ],
          explanation: `A limit $\\lim_{z\\to a}f(z)=L$ means that $|f(z)-L|$ is small whenever $0<|z-a|$ is small, from *every* direction in the plane. It is the same definition as for functions of two real variables, and it is just as easy to break: a limit fails if two paths give different values.

The **complex derivative** is
$$f'(a)=\\lim_{h\\to0}\\frac{f(a+h)-f(a)}{h},$$
where $h$ is complex. Because $h$ can approach 0 along any direction, this is far stronger than having partial derivatives. The usual rules hold, with the same proofs: sums, products, quotients and the chain rule. So polynomials are differentiable everywhere, with $(z^n)'=nz^{n-1}$, and rational functions are differentiable wherever the denominator is non-zero.

A function is **analytic** (or **holomorphic**) on an open set $U$ if it is complex differentiable at every point of $U$. It is analytic at a point if it is analytic on some disc around it. An **entire** function is analytic on all of $\\mathbb{C}$: polynomials, $e^z$, $\\sin z$ and $\\cos z$.

**Worked example.** Show that $f(z)=\\bar z$ is nowhere differentiable, even though it is as smooth as possible as a map of the plane: $(x,y)\\mapsto(x,-y)$.

The difference quotient at any $a$ is
$$\\frac{\\overline{a+h}-\\bar a}{h}=\\frac{\\bar h}{h}.$$
Along the real axis, $h=t$, the quotient is $\\frac tt=1$. Along the imaginary axis, $h=it$, it is $\\frac{-it}{it}=-1$. Two directions give different limits, so the limit does not exist. $\\square$

The same idea shows that $g(z)=|z|^2=z\\bar z$ is differentiable only at $z=0$. At $a$, the quotient is $\\bar a+a\\frac{\\bar h}{h}+\\bar h$. This has a limit as $h\\to0$ only if $a=0$, in which case $g'(0)=0$. So $g$ is differentiable at one point and analytic nowhere, since analytic requires a whole open set.

**Why this matters.** Analytic functions have remarkable properties that you will prove in this course: they are infinitely differentiable, equal to their Taylor series, and determined by their values on any small curve. None of these hold for real differentiable functions. The source of the strength is this direction-independence. Its practical form is the Cauchy-Riemann equations, in the next lesson.

**Pitfall.** Do not test a limit on only two paths and declare that it exists. Paths can show a limit fails, but not that it exists. To prove existence, bound $|f(z)-L|$ in terms of $|z-a|$. For instance, for $\\frac{z^2}{|z|}$ at 0, $|f(z)|=|z|\\to0$, so the limit is 0, whatever the direction.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on analytic functions starts with limits and the complex derivative.' },
            { ...beckEtAl, note: 'Its chapter on differentiation covers the same with proofs.' },
          ],
          exercises: [
            {
              slug: 'limits-in-c',
              title: 'Limits',
              prompt: `Find the limit, or show that it does not exist. (a) $\\lim_{z\\to0}\\frac{\\mathrm{Re}\\,z}{z}$. (b) $\\lim_{z\\to0}\\frac{z^2}{\\bar z}$. (c) $\\lim_{z\\to i}\\frac{z^2+1}{z-i}$. (d) $\\lim_{z\\to0}\\frac{\\bar z^2}{z^2}$. (e) $\\lim_{z\\to\\infty}\\frac{3z^2+i}{z^2-z}$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'derivatives-from-definition',
              title: 'From the definition',
              prompt: `From the definition: (a) show that $(z^3)'=3z^2$. (b) Show that $\\mathrm{Re}\\,z$ is nowhere differentiable. (c) Find where $f(z)=x^2+iy^2$ is differentiable, and say whether it is analytic anywhere. (d) Find where $z\\,\\mathrm{Re}\\,z$ is differentiable.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'numerical-quotient',
              title: 'See direction dependence numerically',
              prompt: `Compute $\\frac{f(a+h)-f(a)}{h}$ for $h=10^{-6}e^{i\\phi}$ and 12 angles $\\phi$ for: $f=z^2$ at $a=1+i$, $f=\\bar z$ at $a=1+i$, and $f=|z|^2$ at $a=0$ and $a=1$. Plot the quotients in the complex plane. For a differentiable function they collapse to one point. Describe the shape you see for $\\bar z$.`,
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Is $\\bar z$ continuous? Is it differentiable?',
              answerOutline: `It is continuous everywhere, since $|\\bar z-\\bar a|=|z-a|$. It is differentiable nowhere, as the quotient $\\frac{\\bar h}{h}$ depends on direction.`,
            },
            {
              question: 'Why is "analytic at a point" defined using a neighbourhood?',
              answerOutline: `Differentiability at one isolated point, as for $|z|^2$ at 0, gives none of the strong consequences. Those need differentiability on an open set.`,
            },
            {
              question: 'Two paths to $a$ give the same limit. What can you conclude?',
              answerOutline: `Nothing yet. Other paths may disagree. To show that a limit exists, bound $|f(z)-L|$ by something that tends to 0 with $|z-a|$.`,
            },
          ],
        },
        {
          slug: 'cauchy-riemann-equations',
          title: 'The Cauchy-Riemann equations',
          summary:
            'The partial differential equations that characterise complex differentiability, and how to use them to test and build analytic functions.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Cauchy-Riemann equations',
            'State the sufficient condition with continuous partials',
            'Use the equations to find where a function is analytic',
            'Use the polar form of the equations',
          ],
          concepts: [
            'Cauchy-Riemann equations',
            'Sufficient condition with continuous partials',
            'Derivative from partials',
            'Polar Cauchy-Riemann equations',
            'Constant modulus implies constant',
          ],
          explanation: `Write $f=u+iv$, with $u,v$ real functions of $(x,y)$. Suppose $f'(a)$ exists. Take $h$ real: the quotient tends to $u_x+iv_x$. Take $h=it$, imaginary: it tends to $\\frac{u_y+iv_y}{i}=v_y-iu_y$. These two must be equal, so
$$u_x=v_y,\\qquad u_y=-v_x.$$
These are the **Cauchy-Riemann equations**, and then $f'=u_x+iv_x$.

The converse needs a little more. **Theorem.** If $u$ and $v$ have *continuous* first partial derivatives near $a$, and satisfy the Cauchy-Riemann equations at $a$, then $f$ is complex differentiable at $a$. The continuity makes $u$ and $v$ differentiable as real functions, by Calculus III, and the equations make the real derivative a complex multiplication. In practice: compute the partials, check that they are continuous, and solve the equations to find where $f$ is differentiable.

**Worked example 1.** Check $f(z)=e^z$. Here $u=e^x\\cos y$ and $v=e^x\\sin y$. Then
$$u_x=e^x\\cos y=v_y,\\qquad u_y=-e^x\\sin y=-v_x.$$
The partials are continuous everywhere, so $e^z$ is entire, and $f'=u_x+iv_x=e^x\\cos y+ie^x\\sin y=e^z$.

**Worked example 2.** Where is $f(x+iy)=x^3+i(1-y)^3$ differentiable? We have $u_x=3x^2$, $v_y=-3(1-y)^2$, $u_y=0$ and $v_x=0$. The second equation always holds. The first needs $3x^2=-3(1-y)^2$, which forces $x=0$ and $y=1$. So $f$ is differentiable only at $z=i$, where $f'(i)=u_x+iv_x=0$. It is analytic nowhere.

**Polar form.** If $f=u(r,\\theta)+iv(r,\\theta)$, the equations become $u_r=\\frac1rv_\\theta$ and $v_r=-\\frac1ru_\\theta$. For $\\mathrm{Log}\\,z=\\ln r+i\\theta$ on the cut plane: $u_r=\\frac1r=\\frac1rv_\\theta$, and $v_r=0=-\\frac1ru_\\theta$. So $\\mathrm{Log}$ is analytic off the cut. Its derivative is $\\frac1z$.

**A consequence.** If $f$ is analytic on a connected open set and $|f|$ is constant, then $f$ is constant. For if $u^2+v^2=c$, differentiating and using the equations gives $u_x=u_y=v_x=v_y=0$ (when $c\\neq 0$). A related fact: if $f$ is analytic with real values only, then it is constant. Analytic functions are very rigid.

**Pitfall.** The equations at a point alone are not enough. For $u=\\sqrt{|xy|}$ and $v=0$, all four partials at 0 are 0, so the equations hold there. But along $y=x$, the quotient $\\frac{f(h)}{h}$ for $h=t(1+i)$ is $\\frac{|t|}{t(1+i)}$, which has different limits from the two sides. So $f$ is not differentiable at 0. The continuity of the partial derivatives is what fails.`,
          resources: [
            { ...orloffText, primary: true, note: 'The sections on the Cauchy-Riemann equations, including the polar form.' },
            { ...orloffOcw, note: 'Lecture notes on analytic functions and the Cauchy-Riemann equations.' },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/complex-analytic-functions'],
          exercises: [
            {
              slug: 'where-analytic',
              title: 'Where is it analytic?',
              prompt: `Use the Cauchy-Riemann equations to find where each is differentiable and where it is analytic, and give $f'$ there. (a) $z^2$. (b) $x^2-y^2-2ixy$. (c) $e^{-y}(\\cos x+i\\sin x)$. (d) $\\frac{x-iy}{x^2+y^2}$. (e) $x^2+y^2+2ixy$. Identify any of them as a familiar function of $z$ or $\\bar z$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rigidity-results',
              title: 'Rigidity',
              prompt: `Let $f=u+iv$ be analytic on a connected open set $D$. Prove that $f$ is constant if any of these hold: (a) $f'=0$ on $D$. (b) $f$ takes only real values. (c) $|f|$ is constant. (d) $v=u^2$. For (a), say exactly where connectedness is needed, with an example on a disconnected set.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'polar-cr',
              title: 'Polar form',
              prompt: `(a) Derive the polar Cauchy-Riemann equations from the Cartesian ones with the chain rule. (b) Use them to show that the principal branch of $z^{1/2}=\\sqrt re^{i\\theta/2}$ ($-\\pi<\\theta<\\pi$) is analytic, and find its derivative. (c) Show that $f'(z)=e^{-i\\theta}(u_r+iv_r)$ in polar form.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the equations in two lines.',
              answerOutline: `Along real $h$: $f'=u_x+iv_x$. Along imaginary $h=it$: $f'=v_y-iu_y$. Equating real and imaginary parts gives $u_x=v_y$ and $u_y=-v_x$.`,
            },
            {
              question: 'Do the equations at a single point imply differentiability there?',
              answerOutline: `Not alone. With continuous partials near the point, they do. The example $\\sqrt{|xy|}$ satisfies them at 0 and is not differentiable there.`,
            },
            {
              question: 'Is $f(z)=|z|$ analytic anywhere? Use the equations.',
              answerOutline: `No. $u=\\sqrt{x^2+y^2}$ and $v=0$ need $u_x=u_y=0$, which never happens for $z\\ne0$, and at 0 $u$ has no partials.`,
            },
          ],
        },
        {
          slug: 'harmonic-functions',
          title: 'Harmonic functions',
          summary:
            'Why the real and imaginary parts of an analytic function solve Laplace\'s equation, how to find a harmonic conjugate, and what that gives for physics.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that the real and imaginary parts of an analytic function are harmonic',
            'Find a harmonic conjugate',
            'Explain why level curves of $u$ and $v$ cross at right angles',
            'Interpret harmonic functions as steady temperatures, potentials and flows',
          ],
          concepts: [
            'Laplace\'s equation',
            'Harmonic function',
            'Harmonic conjugate',
            'Orthogonal level curves',
            'Equipotentials and field lines',
            'Simply connected domain',
          ],
          explanation: `If $f=u+iv$ is analytic, then $u$ and $v$ are **harmonic**: $u_{xx}+u_{yy}=0$, and similarly for $v$. Differentiate the Cauchy-Riemann equations: $u_{xx}=v_{yx}$ and $u_{yy}=-v_{xy}$. These add to zero, because mixed partials are equal. (That analytic functions have continuous second derivatives is a theorem from the next module.)

This is why complex analysis is useful in physics. Laplace's equation governs steady-state temperature, electrostatic potential in a charge-free region, the velocity potential of ideal flow, and gravitational potential in empty space. An analytic function gives two solutions at once.

**Harmonic conjugates.** Given a harmonic $u$ on a simply connected domain (one with no holes), there is a $v$, unique up to a constant, with $u+iv$ analytic. You find it by integrating the Cauchy-Riemann equations.

**Worked example.** Find a harmonic conjugate of $u=x^3-3xy^2+y$.

*Check harmonic:* $u_{xx}=6x$ and $u_{yy}=-6x$, which add to 0.

*Integrate $v_y=u_x=3x^2-3y^2$ in $y$:* $v=3x^2y-y^3+g(x)$, where $g$ is an unknown function of $x$ alone.

*Use $v_x=-u_y$:* here $v_x=6xy+g'(x)$, and $-u_y=-(-6xy+1)=6xy-1$. So $g'(x)=-1$, and $g(x)=-x+C$.

*Result:* $v=3x^2y-y^3-x+C$. To recognise $f$, set $y=0$: $f(x)=x^3+i(-x+C)=x^3-ix+iC$. So $f(z)=z^3-iz+iC$. Check: $z^3=x^3-3xy^2+i(3x^2y-y^3)$ and $-iz=y-ix$, which match $u$ and $v$.

**Geometry.** Where $f'\\ne0$, the level curves $u=c_1$ and $v=c_2$ meet at right angles. The gradients are $(u_x,u_y)$ and $(v_x,v_y)=(-u_y,u_x)$, and their dot product is 0. In electrostatics, if $u$ is the potential, then the curves $v=$ constant are the field lines. In flow, they are the streamlines. You get the second family free.

**Pitfall.** On a domain with a hole, a harmonic function may have no single-valued conjugate. $u=\\ln|z|=\\frac12\\ln(x^2+y^2)$ is harmonic on $\\mathbb{C}\\setminus\\{0\\}$. Its conjugate would be $\\arg z$, which cannot be defined continuously around the origin. This is the same obstruction as for the logarithm. Also, the product of two harmonic functions need not be harmonic: $x$ and $x$ are harmonic, but $x^2$ is not. Harmonic functions form a linear space, which is why superposition works in physics.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on harmonic functions, with physical applications.' },
            { ...beckEtAl, note: 'Its chapter on harmonic functions covers the mean value property and maximum principle.' },
          ],
          relatedLessons: ['electromagnetism/potentials-and-conductors/laplaces-equation-uniqueness-and-images'],
          exercises: [
            {
              slug: 'find-conjugates',
              title: 'Find harmonic conjugates',
              prompt: `Show that each $u$ is harmonic, find a conjugate $v$, and express $f=u+iv$ as a function of $z$. (a) $u=2x(1-y)$. (b) $u=e^x\\sin y$. (c) $u=\\frac{x}{x^2+y^2}$ on $\\mathbb{C}\\setminus\\{0\\}$. (d) $u=\\sinh x\\sin y$. Check (a) and (b) numerically by testing the Cauchy-Riemann equations with finite differences.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'orthogonal-families',
              title: 'Orthogonal families',
              prompt: `For $f(z)=z^2$, sketch the level curves of $u$ and $v$ and show that they are orthogonal hyperbolas. For $f(z)=\\frac1z$, show that the level curves are two families of circles through the origin. Interpret each as equipotentials and field lines. Then plot both families for $f(z)=z+\\frac1z$ on $|z|\\ge1$, which you will see again as flow around a cylinder.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'harmonic-facts',
              title: 'Facts about harmonic functions',
              prompt: `(a) Show that $u(x,y)=\\ln(x^2+y^2)$ is harmonic away from 0, and that it has no harmonic conjugate on $\\mathbb{C}\\setminus\\{0\\}$: assume one exists, and integrate $\\nabla v$ around the unit circle. (b) Find all harmonic functions of the form $u=\\phi(x^2+y^2)$. (c) If $u$ is harmonic and $f$ analytic, show that $u\\circ f$ is harmonic. Why does this make conformal maps useful?`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does every harmonic $u$ on a disc have a conjugate, but $\\ln|z|$ on a punctured plane has none?',
              answerOutline: `On a disc, the line integral defining $v$ is path independent. Around the hole, it picks up $2\\pi$, which is the change in $\\arg z$. So $v$ would be multi-valued.`,
            },
            {
              question: 'What is the physical meaning of the conjugate of a temperature field?',
              answerOutline: `Its level curves are the lines along which heat flows: they are orthogonal to the isotherms, since heat flows along $-\\nabla u$.`,
            },
            {
              question: 'Is $x^2-y^2+x$ harmonic? Is $x^2+y^2$?',
              answerOutline: `The first is, as $2-2=0$. The second is not, as $2+2=4$. The first is $\\mathrm{Re}(z^2+z)$.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'contour-integration',
      title: 'Contour Integration',
      description:
        'Integrals along curves in the plane, Cauchy\'s theorem and integral formula, and their consequences: Liouville\'s theorem and the maximum principle.',
      lessons: [
        {
          slug: 'contour-integrals',
          title: 'Contour integrals',
          summary:
            'How to parametrise and compute an integral along a curve, the ML bound, and when the answer depends on the path.',
          estimatedMinutes: 120,
          objectives: [
            'Compute contour integrals from a parametrisation',
            'Use the ML inequality to bound an integral',
            'Use an antiderivative to evaluate integrals independent of path',
            'Explain why $\\oint\\frac{dz}{z}=2\\pi i$ shows that $\\frac1z$ has no antiderivative on $\\mathbb{C}\\setminus\\{0\\}$',
          ],
          concepts: [
            'Parametrised curve',
            'Contour integral',
            'Orientation',
            'ML inequality',
            'Antiderivative',
            'Path independence',
          ],
          explanation: `A **contour** is a piecewise smooth curve $\\gamma:[a,b]\\to\\mathbb{C}$. The integral of $f$ along it is
$$\\int_\\gamma f(z)\\,dz=\\int_a^bf(\\gamma(t))\\,\\gamma'(t)\\,dt.$$
This is a line integral from Calculus III in complex form: with $f=u+iv$ and $dz=dx+i\\,dy$, it is $\\int(u\\,dx-v\\,dy)+i\\int(v\\,dx+u\\,dy)$. It does not depend on the parametrisation, but reversing the direction changes its sign. A closed curve traversed counter-clockwise is **positively oriented**.

**Worked example 1.** The most important integral in the course. Let $C$ be the circle $|z-a|=r$, counter-clockwise, parametrised by $z=a+re^{it}$, $0\\le t\\le2\\pi$, so $dz=ire^{it}\\,dt$. For an integer $n$,
$$\\oint_C(z-a)^n\\,dz=\\int_0^{2\\pi}r^ne^{int}\\cdot ire^{it}\\,dt=ir^{n+1}\\int_0^{2\\pi}e^{i(n+1)t}\\,dt.$$
If $n\\ne-1$, the last integral is 0. If $n=-1$, it is $2\\pi$. So
$$\\oint_C\\frac{dz}{z-a}=2\\pi i,\\qquad\\oint_C(z-a)^n\\,dz=0\\ \\ (n\\ne-1).$$
Almost everything in the rest of the course is built on this computation.

**Antiderivatives.** If $F'=f$ on an open set containing $\\gamma$, then $\\int_\\gamma f\\,dz=F(\\gamma(b))-F(\\gamma(a))$. So the integral depends only on the end points, and is zero around closed curves. For instance, $\\int_\\gamma z^2\\,dz=\\frac{(1+i)^3}{3}$ for every path from 0 to $1+i$. Since $\\oint\\frac{dz}z=2\\pi i\\ne0$, $\\frac1z$ has **no** antiderivative on $\\mathbb{C}\\setminus\\{0\\}$. Any branch of $\\log z$ is an antiderivative only on a cut plane, and a loop around 0 must cross the cut.

**Worked example 2.** Path dependence for a non-analytic function. Integrate $\\bar z$ from 0 to $1+i$.

- *Straight line:* $z=t(1+i)$, $\\bar z\\,dz=t(1-i)(1+i)\\,dt=2t\\,dt$. The integral is 1.
- *Along the axes, through 1:* the first leg gives $\\int_0^1t\\,dt=\\frac12$. The second leg is $z=1+it$, $dz=i\\,dt$, so $\\int_0^1(1-it)i\\,dt=i+\\frac12$. The total is $1+i$.

The answers differ, as they can for a function that is not analytic.

**The ML inequality.** If $|f|\\le M$ on $\\gamma$ and $\\gamma$ has length $L$, then $|\\int_\\gamma f\\,dz|\\le ML$. For example, on $|z|=R>1$, $|z^2+1|\\ge R^2-1$ (reverse triangle inequality), so
$$\\left|\\oint_{|z|=R}\\frac{dz}{z^2+1}\\right|\\le\\frac{2\\pi R}{R^2-1}\\to0.$$
This kind of bound is how you will show that arcs at infinity contribute nothing.

**Pitfall.** The modulus of an integral is not the integral of the modulus: in general, $|\\int f\\,dz|\\le\\int|f||dz|$. And always include $\\gamma'(t)$. Forgetting the $ire^{it}$ factor is the most common error in this lesson.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on line integrals and Cauchy\'s theorem begins with contour integrals.' },
            { ...beckEtAl, note: 'Its chapter on integration has the same material with exercises.' },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/contour-integration-and-residues'],
          exercises: [
            {
              slug: 'parametrise-and-compute',
              title: 'Parametrise and compute',
              prompt: `Compute, then check numerically with \`scipy.integrate.quad\` on the real and imaginary parts. (a) $\\int_\\gamma z\\,dz$ along the upper half of $|z|=1$ from 1 to $-1$. (b) $\\int_\\gamma\\bar z^2\\,dz$ on the same path. (c) $\\oint_{|z|=2}\\frac{dz}{z^3}$. (d) $\\oint_{|z|=1}\\frac{\\bar z}{z}\\,dz$. (e) $\\int_\\gamma e^z\\,dz$ along the segment from 0 to $i\\pi$. Expected for (a), (c), (e): 0, 0, $-2$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'ml-bounds',
              title: 'Bounds',
              prompt: `(a) Show that $|\\int_\\gamma\\frac{dz}{z^4}|\\le4\\sqrt2$, where $\\gamma$ is the segment from $i$ to 1. (b) Let $C_R$ be the upper semicircle $|z|=R$. Show that $\\int_{C_R}\\frac{z^2}{z^4+1}\\,dz\\to0$ as $R\\to\\infty$. (c) Show that the same bound does not prove that $\\int_{C_R}\\frac{e^{iz}}{z}\\,dz\\to0$. (That needs Jordan's lemma, which comes later.)`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'path-independence',
              title: 'Path independence',
              prompt: `(a) Compute $\\int_\\gamma\\frac{dz}{z}$ from $-i$ to $i$ along the right half of the unit circle, and along the left half. Explain the difference with a branch of $\\log$. (b) Find $\\int_\\gamma z\\,e^{z^2}\\,dz$ along any path from 0 to $1+i$. (c) Give a function and two paths with the same ends where the integrals differ, other than $\\bar z$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\oint\\frac{dz}{z}=2\\pi i$ and not 0 on the unit circle, even though $\\frac1z$ is analytic on the circle?',
              answerOutline: `Analytic on the curve is not enough. $\\frac1z$ is not analytic at 0, which is inside. Equivalently, there is no antiderivative on a set containing the whole circle.`,
            },
            {
              question: 'What is $\\int_\\gamma f\\,dz$ for $\\gamma$ traversed backward?',
              answerOutline: `The negative of the forward integral. Reversing direction negates $\\gamma'(t)$.`,
            },
            {
              question: 'Bound $|\\int_{|z|=3}\\frac{e^z}{z^2+1}\\,dz|$ with the ML inequality.',
              answerOutline: `$|e^z|\\le e^3$ and $|z^2+1|\\ge8$ on the circle, which has length $6\\pi$. So the bound is $\\frac{6\\pi e^3}{8}$. The key step is the lower bound on the denominator.`,
            },
          ],
        },
        {
          slug: 'cauchys-theorem',
          title: 'Cauchy\'s theorem and deformation of contours',
          summary:
            'Why integrals of analytic functions around closed curves vanish, and how that lets you move contours.',
          estimatedMinutes: 120,
          objectives: [
            'State Cauchy\'s theorem with its hypotheses',
            'Prove it with Green\'s theorem when $f\'$ is continuous',
            'Deform contours across regions where the integrand is analytic',
            'Evaluate integrals around curves enclosing singularities',
          ],
          concepts: [
            'Simply connected domain',
            'Cauchy\'s theorem',
            'Cauchy-Goursat theorem',
            'Green\'s theorem',
            'Deformation of contours',
            'Multiply connected regions',
          ],
          explanation: `**Cauchy's theorem.** If $f$ is analytic on a simply connected open set $D$, then $\\oint_Cf\\,dz=0$ for every closed contour $C$ in $D$. Equivalently, integrals in $D$ depend only on the end points, and $f$ has an antiderivative on $D$.

**Worked example (proof with Green's theorem).** Assume also that $f'$ is continuous, and that $C$ is a simple closed curve, positively oriented, bounding a region $R$ inside $D$. Recall Green's theorem: $\\oint_CP\\,dx+Q\\,dy=\\iint_R(Q_x-P_y)\\,dA$. With $f=u+iv$,
$$\\oint_Cf\\,dz=\\oint_C(u\\,dx-v\\,dy)+i\\oint_C(v\\,dx+u\\,dy)=\\iint_R(-v_x-u_y)\\,dA+i\\iint_R(u_x-v_y)\\,dA.$$
Both integrands vanish by the Cauchy-Riemann equations, so the integral is 0. $\\square$

Goursat showed that the continuity of $f'$ is not needed. This matters for the theory, because it later lets us *prove* that $f'$ is continuous. For computing, the Green proof shows what is going on.

**Hypotheses.** Analyticity is needed at every point *inside* $C$, not just on it. And "simply connected" means no holes: on $\\mathbb{C}\\setminus\\{0\\}$, the function $\\frac1z$ is analytic, but $\\oint_{|z|=1}\\frac{dz}z=2\\pi i$.

**Deformation.** If two closed curves $C_1$ and $C_2$ are positively oriented, $C_2$ inside $C_1$, and $f$ is analytic on the region between them and on both curves, then $\\oint_{C_1}f\\,dz=\\oint_{C_2}f\\,dz$. Cut the annular region with a slit to make it simply connected. The integrals along the two sides of the slit cancel. So you can shrink a contour down to tiny circles around the singularities without changing the integral.

*Example.* Let $C$ be the square with corners $\\pm2\\pm2i$, positively oriented. Then $\\oint_C\\frac{dz}{z-1}=2\\pi i$: shrink the square to a small circle around 1 and use the basic integral. Parametrising the four sides would also work, but take far longer.

*Example with two singularities.* $\\oint_{|z|=2}\\frac{dz}{z^2-1}$. Partial fractions give $\\frac1{z^2-1}=\\frac12\\left(\\frac1{z-1}-\\frac1{z+1}\\right)$. Each term contributes $\\frac12\\cdot2\\pi i$ with its sign. The total is 0. For $|z-1|=1$, only $z=1$ is inside, and the answer is $\\pi i$.

**Pitfalls.**

- *Do not apply the theorem across a branch cut.* $\\mathrm{Log}\\,z$ is analytic off the negative real axis, but a contour crossing the cut is not inside a region where $\\mathrm{Log}$ is analytic.
- *A function analytic at every point of a curve can still have a non-zero integral* if a singularity sits inside.
- *Check orientation.* Clockwise gives a minus sign.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on Cauchy\'s theorem, including the extended version and deformation.' },
            { ...orloffOcw, note: 'The lecture notes on Cauchy\'s theorem.' },
          ],
          exercises: [
            {
              slug: 'apply-cauchy',
              title: 'Zero or not',
              prompt: `For the positively oriented circle $|z|=1$, decide which integrals are 0 by Cauchy's theorem, and compute the others. (a) $\\oint\\frac{e^z}{z-2}\\,dz$. (b) $\\oint\\tan z\\,dz$. (c) $\\oint\\frac{dz}{z^2+4}$. (d) $\\oint\\frac{dz}{2z+1}$. (e) $\\oint\\mathrm{Log}(z+3)\\,dz$. (f) $\\oint\\bar z\\,dz$. Expected for (d): $\\pi i$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'deformation-practice',
              title: 'Deformation',
              prompt: `Using partial fractions and deformation, find: (a) $\\oint_{|z|=3}\\frac{z\\,dz}{(z-1)(z+2)}$. (b) $\\oint_C\\frac{dz}{z(z-2)}$ for $C$ the rectangle with corners $-1\\pm i$, $1\\pm i$. (c) $\\oint_{|z|=4}\\frac{dz}{z^2+1}$. (d) $\\oint_{|z-i|=1}\\frac{dz}{z^2+1}$. Check two of them numerically by parametrising.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'green-proof-details',
              title: 'The proof in detail',
              prompt: `(a) Write out the Green's theorem proof, stating each hypothesis of Green's theorem and checking it. (b) Prove that if $f$ is analytic on a disc, then $F(z)=\\int_{[a,z]}f(w)\\,dw$ (straight segment) satisfies $F'=f$, using Cauchy's theorem for triangles. (c) Explain why this fails on an annulus, using $\\frac1z$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State Cauchy\'s theorem with its hypotheses.',
              answerOutline: `$f$ analytic on a simply connected open set $D$, and $C$ a closed contour in $D$. Then $\\oint_Cf\\,dz=0$. The common mistake is to check analyticity only on $C$.`,
            },
            {
              question: 'Why can you replace a big contour by small circles around the singularities?',
              answerOutline: `On the region between them, $f$ is analytic. Cauchy's theorem, applied to that region cut into simply connected pieces, says that the difference of the integrals is 0.`,
            },
            {
              question: 'What does Cauchy\'s theorem say about $\\oint_{|z|=1}\\frac{\\sin z}{z}\\,dz$?',
              answerOutline: `The singularity at 0 is removable: $\\frac{\\sin z}{z}$ extends to an entire function. So the integral is 0. Not every apparent singularity is a real one.`,
            },
          ],
        },
        {
          slug: 'cauchy-integral-formula',
          title: 'Cauchy\'s integral formula',
          summary:
            'Values and derivatives of an analytic function from an integral around a curve, and their use in computing integrals.',
          estimatedMinutes: 130,
          objectives: [
            'State and use Cauchy\'s integral formula',
            'Use the formula for derivatives',
            'Combine partial fractions and the formula for several singularities',
            'Explain why analytic functions are infinitely differentiable',
          ],
          concepts: [
            'Cauchy integral formula',
            'Derivative formula',
            'Infinite differentiability',
            'Mean value property',
            'Determination by boundary values',
          ],
          explanation: `**Cauchy's integral formula.** Let $f$ be analytic on and inside a simple closed contour $C$, positively oriented, and let $a$ be inside $C$. Then
$$f(a)=\\frac1{2\\pi i}\\oint_C\\frac{f(z)}{z-a}\\,dz,\\qquad f^{(n)}(a)=\\frac{n!}{2\\pi i}\\oint_C\\frac{f(z)}{(z-a)^{n+1}}\\,dz.$$

*Why the first formula holds.* Shrink $C$ to a circle $|z-a|=r$. Write $\\frac{f(z)}{z-a}=\\frac{f(a)}{z-a}+\\frac{f(z)-f(a)}{z-a}$. The first term integrates to $2\\pi if(a)$. The second is bounded near $a$, since it tends to $f'(a)$, so its integral over a circle of length $2\\pi r$ tends to 0. Since the left side does not depend on $r$, that term's integral is 0. Differentiating under the integral sign gives the derivative formula.

**The consequences are remarkable.** The values of $f$ inside $C$ are fixed by its values on $C$. And since the right side of the derivative formula exists for every $n$, an analytic function has derivatives of all orders. So $u$ and $v$ are infinitely differentiable, which completes the proof that they are harmonic. Taking $C$ to be a circle centred at $a$ gives the **mean value property**: $f(a)$ is the average of $f$ around the circle.

**Worked example 1.** $\\oint_{|z|=2}\\frac{e^z}{(z-1)^3}\\,dz$. Take $f(z)=e^z$, which is entire, with $a=1$ inside and $n=2$. Then
$$\\oint\\frac{e^z}{(z-1)^3}\\,dz=\\frac{2\\pi i}{2!}f''(1)=\\pi ie.$$

**Worked example 2.** $\\oint_{|z|=3}\\frac{e^z}{z(z-1)}\\,dz$. Both 0 and 1 are inside. Partial fractions give $\\frac1{z(z-1)}=\\frac1{z-1}-\\frac1z$. So the integral is
$$\\oint\\frac{e^z}{z-1}\\,dz-\\oint\\frac{e^z}{z}\\,dz=2\\pi i(e^1-e^0)=2\\pi i(e-1).$$
Alternatively, deform to two small circles, one around each point, and apply the formula on each with the other factor included in $f$: around 0, $f(z)=\\frac{e^z}{z-1}$, and $f(0)=-1$; around 1, $f(z)=\\frac{e^z}{z}$, and $f(1)=e$. The sum is again $2\\pi i(e-1)$.

**Pitfalls.**

- *Choose $f$ to be analytic inside $C$.* In example 2, you cannot take $f(z)=\\frac{e^z}{z-1}$ on the large circle, because it has a singularity at 1 inside the circle.
- *Watch the factorial and the power.* $(z-a)^{n+1}$ goes with $f^{(n)}$, so $(z-1)^3$ means the second derivative.
- *Points outside $C$ contribute nothing.* If $a$ is outside, the integrand is analytic inside, and Cauchy's theorem gives 0.
- *Check numerically.* Parametrise the circle and integrate with \`mpmath.quad\`. This catches sign and factorial errors at once.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on Cauchy\'s integral formula and its consequences.' },
            { ...beckEtAl, note: 'Its chapter on consequences of Cauchy\'s theorem.' },
            { ...mpmathDocs, note: 'Use \`mpmath.quad\` with a parametrised circle to check contour integrals.' },
          ],
          exercises: [
            {
              slug: 'cif-computations',
              title: 'Use the formula',
              prompt: `Evaluate, with all circles positively oriented, and check numerically. (a) $\\oint_{|z|=1}\\frac{\\cos z}{z}\\,dz$. (b) $\\oint_{|z|=2}\\frac{\\sin z}{z^4}\\,dz$. (c) $\\oint_{|z-i|=1}\\frac{dz}{z^2+1}$. (d) $\\oint_{|z|=2}\\frac{z^2}{(z-1)^2(z+3)}\\,dz$. (e) $\\oint_{|z|=3}\\frac{e^{2z}}{(z+1)^4}\\,dz$. Expected for (a), (b), (c): $2\\pi i$, $-\\frac{\\pi i}{3}$, $\\pi$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'mean-value-property',
              title: 'Mean value property',
              prompt: `(a) Derive the mean value property $f(a)=\\frac1{2\\pi}\\int_0^{2\\pi}f(a+re^{it})\\,dt$ from Cauchy's formula. (b) Take real parts to get the mean value property for harmonic functions. (c) Use it to find $\\frac1{2\\pi}\\int_0^{2\\pi}\\ln|1+\\frac12e^{it}|\\,dt$, and check numerically. (d) Interpret (b) for a steady temperature on a disc.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'two-singularities',
              title: 'Several singularities',
              prompt: `Compute $\\oint_{|z|=2}\\frac{dz}{z^2(z-1)}$ in two ways: with partial fractions and with the formula on small circles. Then compute $\\oint_{|z|=2}\\frac{e^z}{z^2(z-1)}\\,dz$, expected $2\\pi i(e-2)$, and check both numerically with \`mpmath\`.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which derivative does $\\oint\\frac{f(z)}{(z-a)^4}\\,dz$ give, and with what factor?',
              answerOutline: `The third: $\\oint=\\frac{2\\pi i}{3!}f'''(a)$. The power is one more than the order of the derivative.`,
            },
            {
              question: 'Why does Cauchy\'s formula imply that analytic functions are infinitely differentiable?',
              answerOutline: `The formula for $f^{(n)}$ is an integral that exists for every $n$, so each derivative exists and is analytic. This is very different from real functions, where one derivative says nothing about the next.`,
            },
            {
              question: 'What is $\\oint_{|z|=1}\\frac{e^z}{z-2}\\,dz$?',
              answerOutline: `0, since 2 is outside the circle and the integrand is analytic on and inside it. Applying the formula would wrongly give $2\\pi ie^2$.`,
            },
          ],
        },
        {
          slug: 'liouville-and-maximum-modulus',
          title: 'Liouville\'s theorem and the maximum principle',
          summary:
            'Bounds on derivatives from Cauchy\'s formula, why bounded entire functions are constant, a proof of the fundamental theorem of algebra, and where maxima occur.',
          estimatedMinutes: 120,
          objectives: [
            'Derive Cauchy\'s estimates',
            'Prove Liouville\'s theorem and the fundamental theorem of algebra',
            'State the maximum modulus principle and the maximum principle for harmonic functions',
            'Find the maximum of $|f|$ on a closed region',
          ],
          concepts: [
            'Cauchy estimates',
            'Liouville\'s theorem',
            'Fundamental theorem of algebra',
            'Maximum modulus principle',
            'Maximum principle for harmonic functions',
            'Minimum modulus',
          ],
          explanation: `**Cauchy's estimates.** If $f$ is analytic on and inside the circle $|z-a|=R$, and $|f|\\le M$ on the circle, then
$$|f^{(n)}(a)|\\le\\frac{n!\\,M}{R^n}.$$
Apply the ML inequality to the derivative formula: the length is $2\\pi R$, and the integrand is bounded by $\\frac{M}{R^{n+1}}$.

**Liouville's theorem.** A bounded entire function is constant. *Proof.* If $|f|\\le M$ everywhere, then $|f'(a)|\\le\\frac MR$ for every $R$. Letting $R\\to\\infty$ gives $f'(a)=0$ for every $a$, so $f$ is constant. $\\square$ This is why $\\sin z$ and $\\cos z$ must be unbounded.

**Worked example (the fundamental theorem of algebra).** Every non-constant polynomial $p$ with complex coefficients has a complex root.

*Proof.* Suppose $p(z)\\ne0$ for all $z$. Then $g=\\frac1p$ is entire. Write $p(z)=a_nz^n+\\dots+a_0$ with $n\\ge1$ and $a_n\\ne0$. For large $|z|$,
$$|p(z)|\\ge|a_n||z|^n-(|a_{n-1}||z|^{n-1}+\\dots+|a_0|)\\ge\\frac{|a_n|}{2}|z|^n.$$
So $|g(z)|\\le\\frac2{|a_n||z|^n}\\to0$ as $|z|\\to\\infty$. Hence $g$ is bounded outside some disc $|z|\\le R_0$, and it is also bounded on that disc, since a continuous function on a closed disc is bounded. So $g$ is bounded on $\\mathbb{C}$, and constant by Liouville. Then $p$ is constant, a contradiction. $\\square$ Dividing out a root and repeating shows that $p$ has exactly $n$ roots, counted with multiplicity.

**Maximum modulus principle.** If $f$ is analytic and non-constant on a connected open set $D$, then $|f|$ has no maximum in $D$. On a bounded region with its boundary, where $f$ is continuous on the closure, the maximum of $|f|$ is attained on the boundary. The reason is the mean value property: $f(a)$ is an average over a small circle, so $|f(a)|$ cannot be larger than all values on that circle unless $f$ is constant nearby.

*Example.* On the closed unit disc, $|e^z|=e^{\\mathrm{Re}\\,z}$ is largest where $\\mathrm{Re}\\,z$ is largest. So the maximum is $e$, at $z=1$. For $f(z)=z^2+1$, $|f|\\le|z|^2+1=2$, with equality at $z=\\pm1$, again on the boundary.

**Harmonic version.** A non-constant harmonic function on a connected region attains its max and min only on the boundary. For a steady temperature: the hottest and coldest points of a plate are on its edge. This also gives uniqueness for the Dirichlet problem, since the difference of two solutions is harmonic and 0 on the boundary.

**Pitfalls.** Liouville needs *entire* and *bounded*. $\\frac1{1+z^2}$ is bounded on $\\mathbb{R}$, but not entire. And there is no *minimum* modulus principle in general: $|z|$ on the unit disc has its minimum at 0, the centre, where $f$ is zero. The principle holds for the minimum only when $f$ has no zeros.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on Cauchy\'s formula includes Liouville\'s theorem and the maximum modulus principle.' },
            { ...beckEtAl, note: 'Its chapters on consequences of Cauchy\'s theorem and on harmonic functions.' },
          ],
          exercises: [
            {
              slug: 'use-liouville',
              title: 'Use Liouville',
              prompt: `Prove: (a) if $f$ is entire and $\\mathrm{Re}\\,f\\le0$ everywhere, then $f$ is constant (consider $e^f$). (b) If $f$ is entire and $|f(z)|\\le C|z|^2$ for large $|z|$, then $f$ is a polynomial of degree at most 2 (use Cauchy's estimates for $f'''$). (c) If $f$ is entire and $f(z+1)=f(z)$ and $f(z+i)=f(z)$ for all $z$, then $f$ is constant.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'max-modulus-problems',
              title: 'Where is the maximum',
              prompt: `Find the maximum of $|f|$ on the given closed region, and where it occurs. (a) $f(z)=z^2-z$ on $|z|\\le1$. (b) $f(z)=e^{z^2}$ on $|z|\\le1$. (c) $f(z)=\\sin z$ on the square $0\\le x\\le\\pi$, $0\\le y\\le1$. (d) Check each by sampling $|f|$ on a fine grid in Python. Expected for (a): 2 at $z=-1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (c), use $|\\sin z|^2=\\sin^2x+\\sinh^2y$.',
            },
            {
              slug: 'cauchy-estimate-check',
              title: 'Sharpness of the estimates',
              prompt: `For $f(z)=e^z$ at $a=0$, Cauchy's estimate on the circle of radius $R$ gives $|f^{(n)}(0)|\\le\\frac{n!e^R}{R^n}$. (a) Minimise the bound over $R$, and compare with the true value 1 for $n=1,5,10$. (b) Use Stirling's formula to explain how the ratio grows. (c) Apply the estimates to $\\frac{1}{1-z}$ with $R<1$ to show that $|f^{(n)}(0)|\\le\\frac{n!}{R^n(1-R)}$, and compare with the exact $n!$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\sin z$ unbounded on $\\mathbb{C}$, in one line?',
              answerOutline: `It is entire and non-constant, so Liouville's theorem forbids it to be bounded. Directly: $|\\sin(iy)|=|\\sinh y|$.`,
            },
            {
              question: 'Where does the proof of the fundamental theorem of algebra use $n\\ge1$?',
              answerOutline: `To make $|p(z)|\\to\\infty$, so that $\\frac1p$ tends to 0 and is bounded. For a constant polynomial, there is nothing to prove, and no root.`,
            },
            {
              question: 'A steady temperature on a disc is 30 on the boundary arc where $y>0$ and 10 where $y<0$. Can the temperature inside reach 35?',
              answerOutline: `No. By the maximum principle for harmonic functions, values inside lie strictly between the boundary min and max, 10 and 30, unless the function is constant.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'series',
      title: 'Series',
      description:
        'Taylor and Laurent series of analytic functions, and the classification of zeros and isolated singularities.',
      lessons: [
        {
          slug: 'taylor-series',
          title: 'Taylor series and the radius of convergence',
          summary:
            'Every analytic function is its Taylor series on the largest disc that avoids its singularities, which explains real-variable puzzles.',
          estimatedMinutes: 120,
          objectives: [
            'State Taylor\'s theorem for analytic functions',
            'Predict the radius of convergence from the location of singularities',
            'Compute Taylor series by algebraic manipulation, not by derivatives',
            'Explain why a real function smooth everywhere can have a finite radius of convergence',
          ],
          concepts: [
            'Taylor series',
            'Radius of convergence',
            'Distance to the nearest singularity',
            'Geometric series manipulation',
            'Uniqueness of power series',
            'Identity theorem',
          ],
          explanation: `**Taylor's theorem.** If $f$ is analytic on the disc $|z-a|<R$, then
$$f(z)=\\sum_{n=0}^\\infty c_n(z-a)^n,\\qquad c_n=\\frac{f^{(n)}(a)}{n!}=\\frac1{2\\pi i}\\oint\\frac{f(w)}{(w-a)^{n+1}}\\,dw,$$
for every $z$ in that disc. This comes from expanding $\\frac1{w-z}$ in Cauchy's formula as a geometric series. The series is unique: a power series that converges to $f$ near $a$ must be this one. So you may find it by any valid method.

Consequently, the radius of convergence is at least the distance from $a$ to the nearest point where $f$ fails to be analytic. Usually it is exactly that, the distance to the nearest singularity. There is no real-variable analogue of this. It is one of the great explanatory successes of complex analysis.

**Worked example 1.** Why does the series for $\\frac1{1+x^2}$ at 0 converge only for $|x|<1$? The function is smooth on all of $\\mathbb{R}$. But $\\frac1{1+z^2}$ has poles at $z=\\pm i$, at distance 1 from 0. So $R=1$. Indeed,
$$\\frac1{1+z^2}=\\sum_{n=0}^\\infty(-1)^nz^{2n},\\qquad|z|<1.$$
Expanding about $a=1$ instead, the radius is the distance from 1 to $\\pm i$, which is $\\sqrt2$.

**Worked example 2.** Expand $\\frac1{z-2}$ about $a=i$. The only singularity is at 2, at distance $|2-i|=\\sqrt5$, so we expect $R=\\sqrt5$. Write the denominator in terms of $z-i$:
$$\\frac1{z-2}=\\frac1{(z-i)-(2-i)}=-\\frac1{2-i}\\cdot\\frac1{1-\\frac{z-i}{2-i}}=-\\sum_{n=0}^\\infty\\frac{(z-i)^n}{(2-i)^{n+1}}.$$
The geometric series converges when $|z-i|<|2-i|=\\sqrt5$, as predicted.

**Algebra.** Series can be added, multiplied, divided (where the denominator is non-zero), substituted and differentiated term by term inside the disc. For example, $e^{z^2}=\\sum\\frac{z^{2n}}{n!}$, and $\\mathrm{Log}(1+z)=\\sum_{n\\ge1}\\frac{(-1)^{n+1}z^n}{n}$, with $R=1$ because of the branch point at $-1$.

**Identity theorem.** If two analytic functions on a connected open set agree on a set with a limit point in it, such as a segment, they agree everywhere. So identities true for real $x$, like $\\sin^2x+\\cos^2x=1$, extend to all complex $z$ at once. It also explains why there is only one reasonable extension of $e^x$ to $\\mathbb{C}$.

**Pitfall.** The radius is the distance to the nearest *singularity*, not to the nearest point where a formula looks bad. $\\frac{\\sin z}{z}$ is entire, so its series about 1 has infinite radius. Branch points count as singularities. Branch *cuts* do not limit the radius, since you may choose a different cut: $\\mathrm{Log}\\,z$ about $a=-1+i$ has radius $|-1+i|=\\sqrt2$, the distance to 0, even though the principal cut is only at distance 1.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on Taylor and Laurent series.' },
            { ...orloffOcw, note: 'The lecture notes on Taylor series.' },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/taylor-series'],
          exercises: [
            {
              slug: 'predict-radius',
              title: 'Predict the radius',
              prompt: `Without computing coefficients, give the radius of convergence of the Taylor series. (a) $\\frac1{z^2-3z+2}$ about 0. (b) $\\tan z$ about 0. (c) $\\frac{e^z}{z^2+9}$ about $1$. (d) $\\mathrm{Log}(z)$ about $3+4i$. (e) $\\frac{z}{e^z-1}$ about 0, with the value 1 at 0. Then check two of them by computing many coefficients numerically and estimating $|c_n|^{-1/n}$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'compute-series',
              title: 'Compute series by algebra',
              prompt: `Find the first four non-zero terms, and the radius. (a) $\\frac1{(1-z)^2}$ about 0, by differentiating. (b) $\\frac{1}{z}$ about $a=1$. (c) $e^z\\sin z$ about 0, by multiplying series. (d) $\\tan z$ about 0, by dividing $\\sin$ by $\\cos$. (e) $\\arctan z$ about 0, by integrating. Check with SymPy's \`series\`.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'identity-theorem-use',
              title: 'Identity theorem',
              prompt: `(a) Prove that $\\sin(z+w)=\\sin z\\cos w+\\cos z\\sin w$ for all complex $z,w$, using the real identity and the identity theorem twice. (b) Is there an entire function with $f(\\frac1n)=\\frac{1}{n^2}$ for $n=1,2,\\dots$ other than $z^2$? (c) Is there an entire $f$ with $f(\\frac1n)=\\frac{(-1)^n}{n}$? Justify both.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the radius of $\\sum(-1)^nx^{2n}$ equal to 1, when $\\frac1{1+x^2}$ has no real problem at $\\pm1$?',
              answerOutline: `The poles at $\\pm i$ are at distance 1 from 0, and a power series converges on discs, which cannot avoid them.`,
            },
            {
              question: 'Can the Taylor series of an analytic function converge on a disc bigger than the distance to the nearest singularity?',
              answerOutline: `No, if the singularity is genuine. The sum would give an analytic extension past it. Removable singularities do not count, since they are not genuine.`,
            },
            {
              question: 'Why may you find a Taylor series by any valid manipulation?',
              answerOutline: `Power series are unique. Any power series that converges to $f$ near $a$ must have coefficients $\\frac{f^{(n)}(a)}{n!}$.`,
            },
          ],
        },
        {
          slug: 'laurent-series',
          title: 'Laurent series',
          summary:
            'Series with negative powers on annuli, how to find them in each region, and why the coefficient of $\\frac1{z-a}$ is special.',
          estimatedMinutes: 120,
          objectives: [
            'State the Laurent expansion theorem on an annulus',
            'Find Laurent series in different annuli for the same function',
            'Identify the principal part',
            'Relate the coefficient of $(z-a)^{-1}$ to a contour integral',
          ],
          concepts: [
            'Annulus',
            'Laurent series',
            'Principal part',
            'Regular part',
            'Region dependence',
            'Coefficient $a_{-1}$',
          ],
          explanation: `**Laurent's theorem.** If $f$ is analytic on the annulus $r<|z-a|<R$, then
$$f(z)=\\sum_{n=-\\infty}^{\\infty}a_n(z-a)^n,\\qquad a_n=\\frac1{2\\pi i}\\oint_C\\frac{f(w)}{(w-a)^{n+1}}\\,dw,$$
for every circle $C$ inside the annulus around $a$. The negative powers make up the **principal part**, and the non-negative powers the regular part. The expansion is unique on a given annulus. But the same function has different Laurent series on different annuli.

The coefficient $a_{-1}$ is special. With $n=-1$, the formula says $\\oint_Cf\\,dz=2\\pi ia_{-1}$. All other terms integrate to 0, by the basic integral. This is the bridge to residues.

**Worked example.** Expand $f(z)=\\frac1{(z-1)(z-2)}$ in powers of $z$ on each region where it is analytic: $|z|<1$, $1<|z|<2$ and $|z|>2$.

Partial fractions give $f(z)=\\frac1{z-2}-\\frac1{z-1}$. The work is to expand each fraction in the form that converges on the region.

- For $|z|<2$: $\\frac1{z-2}=-\\frac12\\cdot\\frac1{1-z/2}=-\\sum_{n\\ge0}\\frac{z^n}{2^{n+1}}$.
- For $|z|>2$: $\\frac1{z-2}=\\frac1z\\cdot\\frac1{1-2/z}=\\sum_{n\\ge1}\\frac{2^{n-1}}{z^n}$.
- For $|z|<1$: $-\\frac1{z-1}=\\frac1{1-z}=\\sum_{n\\ge0}z^n$.
- For $|z|>1$: $-\\frac1{z-1}=-\\frac1z\\cdot\\frac1{1-1/z}=-\\sum_{n\\ge1}\\frac1{z^n}$.

Combining:

- On $|z|<1$: $f(z)=\\sum_{n\\ge0}\\left(1-\\frac1{2^{n+1}}\\right)z^n$. This is the Taylor series, and there are no negative powers.
- On $1<|z|<2$: $f(z)=-\\sum_{n\\ge1}\\frac1{z^n}-\\sum_{n\\ge0}\\frac{z^n}{2^{n+1}}$.
- On $|z|>2$: $f(z)=\\sum_{n\\ge1}\\frac{2^{n-1}-1}{z^n}=\\frac1{z^2}+\\frac3{z^3}+\\frac7{z^4}+\\cdots$

Check the last one: for large $z$, $f\\approx\\frac1{z^2}$, which matches.

The coefficient $a_{-1}$ is $-1$ on the middle annulus and $0$ outside. So $\\oint_{|z|=1.5}f\\,dz=-2\\pi i$, and $\\oint_{|z|=3}f\\,dz=0$. Check with the integral formula: on $|z|=1.5$, only the pole at 1 is enclosed, and $\\frac1{z-2}$ at 1 is $-1$. So the answer is $2\\pi i\\cdot(-1)$. On $|z|=3$, both poles are enclosed and the contributions $-1$ and $+1$ cancel.

**Pitfalls.**

- *State the annulus.* A Laurent series without a region is ambiguous.
- *A Laurent series about $a$ in the annulus $r<|z-a|$ with $r>0$ is not the same as an expansion near $a$.* The principal part at $a$ is read from the expansion on the punctured disc $0<|z-a|<\\rho$. In the example, the series on $1<|z|<2$ is about 0, where $f$ is analytic. Its negative powers come from the pole at 1, not from 0.
- *Use the right geometric form.* $\\frac1{1-w}=\\sum w^n$ needs $|w|<1$. Choosing $w=\\frac z2$ or $w=\\frac2z$ is exactly the region choice.`,
          resources: [
            { ...orloffText, primary: true, note: 'The sections on Laurent series and on regions of convergence.' },
            { ...beckEtAl, note: 'Its chapter on Taylor and Laurent series has more examples.' },
          ],
          exercises: [
            {
              slug: 'laurent-three-regions',
              title: 'Regions',
              prompt: `Find the Laurent series of $f(z)=\\frac{1}{z(z+2)}$ in powers of $z$ on $0<|z|<2$ and on $|z|>2$. Then find the series of the same function in powers of $(z+2)$ on $0<|z+2|<2$. Use each to compute $\\oint f\\,dz$ around a suitable circle, and check numerically.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'laurent-at-singularities',
              title: 'Expansions at a singularity',
              prompt: `Find the Laurent series on a punctured disc around the given point, up to the constant term, and identify the principal part. (a) $\\frac{e^z}{z^3}$ at 0. (b) $\\frac{1}{z^2\\sin z}$ at 0. (c) $z^2e^{1/z}$ at 0 (all terms). (d) $\\frac{1}{(z-1)^2(z-3)}$ at 1. Give the coefficient $a_{-1}$ in each case.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'laurent-coefficient-numerics',
              title: 'Coefficients from integrals',
              prompt: `For $f(z)=\\frac1{(z-1)(z-2)}$, compute $a_n$ numerically from the integral formula on the circle $|z|=1.5$ for $n=-4,\\dots,3$, using the trapezoid rule with 256 points (which is very accurate for periodic integrands). Compare with the worked example. Then repeat on $|z|=3$, and explain why the results change.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does one function have several Laurent series about the same centre?',
              answerOutline: `Each annulus between singularities has its own expansion. They match the same function on different regions, and uniqueness only holds region by region.`,
            },
            {
              question: 'What does $a_{-1}$ tell you about $\\oint_Cf\\,dz$?',
              answerOutline: `$\\oint_Cf\\,dz=2\\pi ia_{-1}$ for any circle $C$ in the annulus, positively oriented. Every other power integrates to 0.`,
            },
            {
              question: 'Is the Laurent series on $|z|>2$ in the worked example of any use near $z=1$?',
              answerOutline: `No. It converges only for $|z|>2$. Near 1, you need the expansion on a punctured disc around 1.`,
            },
          ],
        },
        {
          slug: 'zeros-and-singularities',
          title: 'Zeros and isolated singularities',
          summary:
            'Orders of zeros, removable singularities, poles and essential singularities, and how to tell them apart quickly.',
          estimatedMinutes: 120,
          objectives: [
            'Find the order of a zero',
            'Classify isolated singularities using limits or Laurent series',
            'Determine the order of a pole from orders of zeros',
            'Describe the behaviour near an essential singularity',
          ],
          concepts: [
            'Zero of order $m$',
            'Isolated singularity',
            'Removable singularity',
            'Pole of order $m$',
            'Essential singularity',
            'Casorati-Weierstrass theorem',
            'Point at infinity',
          ],
          explanation: `**Zeros.** If $f$ is analytic at $a$, $f(a)=0$ and $f$ is not identically 0 nearby, then $f(z)=(z-a)^mg(z)$ with $g(a)\\ne0$ for some $m\\ge1$, the **order**. Equivalently, $f^{(k)}(a)=0$ for $k<m$, and $f^{(m)}(a)\\ne0$. Zeros of a non-zero analytic function are **isolated**. For instance, $\\sin z$ has simple zeros at $k\\pi$, since $\\cos(k\\pi)\\ne0$, and $1-\\cos z$ has a zero of order 2 at 0.

**Isolated singularities.** If $f$ is analytic on $0<|z-a|<\\rho$, the Laurent series on that punctured disc classifies $a$.

- **Removable:** no negative powers. Equivalently, $f$ is bounded near $a$, and $\\lim_{z\\to a}f$ exists. Example: $\\frac{\\sin z}{z}$ at 0.
- **Pole of order $m$:** finitely many negative powers, the lowest being $(z-a)^{-m}$. Equivalently, $\\lim(z-a)^mf(z)$ exists and is non-zero. Then $|f|\\to\\infty$.
- **Essential:** infinitely many negative powers. Example: $e^{1/z}=\\sum\\frac1{n!z^n}$ at 0.

**Quick rule for quotients.** If $p$ has a zero of order $j$ at $a$, and $q$ a zero of order $k$, then $\\frac pq$ has a pole of order $k-j$ if $k>j$, and a removable singularity if $k\\le j$.

**Worked example.** Classify the singularity of $f(z)=\\frac{1-\\cos z}{z^5}$ at 0, and find the coefficient $a_{-1}$.

The numerator has a zero of order 2, and the denominator one of order 5. So we expect a pole of order 3. Confirm with the series:
$$1-\\cos z=\\frac{z^2}{2}-\\frac{z^4}{24}+\\frac{z^6}{720}-\\cdots,\\qquad f(z)=\\frac1{2z^3}-\\frac1{24z}+\\frac{z}{720}-\\cdots$$
So $f$ has a pole of order 3, and $a_{-1}=-\\frac1{24}$. Therefore $\\oint_{|z|=1}f\\,dz=2\\pi i\\cdot(-\\frac1{24})=-\\frac{\\pi i}{12}$.

**Essential singularities are wild.** By the **Casorati-Weierstrass theorem**, near an essential singularity $f$ comes arbitrarily close to every complex value. Picard's theorem (stated without proof) says more: it takes every value, with at most one exception, infinitely often near the point. For $e^{1/z}$ near 0, every non-zero value is taken infinitely often, and 0 is the exception. So "$\\lim_{z\\to0}e^{1/z}$" does not exist, even as $\\infty$: along the positive real axis $e^{1/z}\\to\\infty$, and along the negative one, it tends to 0.

**At infinity.** Classify $f$ at $\\infty$ by classifying $f(\\frac1w)$ at $w=0$. A polynomial of degree $n$ has a pole of order $n$ at $\\infty$, and $e^z$ has an essential singularity there.

**Pitfalls.**

- *Not all singularities are isolated.* $\\mathrm{Log}\\,z$ at 0 is a branch point, and $\\frac1{\\sin(1/z)}$ at 0 has poles accumulating at 0. Neither is classified by this scheme.
- *Count orders, do not guess.* $\\frac{1}{z\\sin z}$ at 0 has a pole of order 2, not 1, because $z\\sin z$ has a zero of order 2.
- *Removable singularities contribute nothing to integrals.* Fill them in and forget them.`,
          resources: [
            { ...orloffText, primary: true, note: 'The sections on zeros and on isolated singularities.' },
            {
              title: 'Casorati-Weierstrass theorem',
              url: 'https://en.wikipedia.org/wiki/Casorati%E2%80%93Weierstrass_theorem',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'The statement and a short proof, with links to Picard\'s theorems.',
            },
          ],
          exercises: [
            {
              slug: 'classify-singularities',
              title: 'Classify',
              prompt: `Find and classify all isolated singularities in $\\mathbb{C}$, including the order of each pole. (a) $\\frac{z^2-1}{z^2+1}$. (b) $\\frac{\\sin z}{z^3}$. (c) $\\tan z$. (d) $\\frac{e^z-1}{z}$. (e) $\\sin\\frac1z$. (f) $\\frac{1}{z(e^z-1)}$. (g) $\\frac{z}{\\sin^2z}$. Then classify each at $\\infty$ where that makes sense.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'order-proofs',
              title: 'Orders and classification proofs',
              prompt: `Prove: (a) if $f$ has a zero of order $m$ at $a$, then $\\frac1f$ has a pole of order $m$ there. (b) If $f$ is bounded near an isolated singularity, the singularity is removable. Use the coefficient formula with a shrinking circle. (c) If $f$ has a pole at $a$, then $|f(z)|\\to\\infty$ as $z\\to a$. (d) Show that $e^{1/z}$ takes the value $i$ at points arbitrarily close to 0, and find them.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'see-singularities',
              title: 'See them',
              prompt: `Use your domain-colouring plotter on $\\frac{\\sin z}{z}$, $\\frac{1}{z^3}$, $\\frac{1-\\cos z}{z^5}$ and $e^{1/z}$ near 0. Describe how a pole of order $m$ shows up (the hue cycles $m$ times around it), and what the essential singularity looks like. Explain the pictures with the Laurent series.`,
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Classify $\\frac{z}{\\sin z}$ at 0 and at $\\pi$.',
              answerOutline: `At 0, removable, with value 1. At $\\pi$, a simple pole, since $\\sin$ has a simple zero there and the numerator $\\pi\\ne0$.`,
            },
            {
              question: 'How do you find the order of a pole of $\\frac pq$ quickly?',
              answerOutline: `Find the orders of the zeros of $p$ and $q$ at the point. The pole has order (order of $q$) minus (order of $p$), when this is positive. Otherwise the singularity is removable.`,
            },
            {
              question: 'Does $\\lim_{z\\to0}|e^{1/z}|$ exist?',
              answerOutline: `No. Along the positive real axis it tends to $\\infty$, and along the negative real axis to 0. On the imaginary axis, $|e^{1/z}|=1$. This is typical of an essential singularity.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'residues',
      title: 'Residues',
      description:
        'The residue theorem and how to compute residues, its use for real integrals of several kinds, and the argument principle for counting zeros.',
      lessons: [
        {
          slug: 'residue-theorem',
          title: 'Residues and the residue theorem',
          summary:
            'A contour integral is $2\\pi i$ times the sum of the residues inside. Fast ways to compute residues at poles.',
          estimatedMinutes: 120,
          objectives: [
            'State the residue theorem with its hypotheses',
            'Compute residues at simple and higher-order poles',
            'Use the $\\frac{p}{q\'}$ shortcut for simple poles',
            'Evaluate contour integrals by residues, and check them numerically',
          ],
          concepts: [
            'Residue',
            'Residue theorem',
            'Simple pole formula',
            'The $p/q\'$ rule',
            'Higher-order pole formula',
            'Residue from a Laurent series',
          ],
          explanation: `The **residue** of $f$ at an isolated singularity $a$ is the coefficient $a_{-1}$ of $(z-a)^{-1}$ in its Laurent series on a punctured disc around $a$. Write it $\\mathrm{Res}(f,a)$.

**Residue theorem.** Let $C$ be a simple closed contour, positively oriented. Let $f$ be analytic on and inside $C$, except at finitely many points $a_1,\\dots,a_k$ inside $C$ (none on $C$). Then
$$\\oint_Cf(z)\\,dz=2\\pi i\\sum_{j=1}^k\\mathrm{Res}(f,a_j).$$
This follows from deformation: shrink $C$ to small circles around each $a_j$, and integrate the Laurent series term by term on each.

**Computing residues.**

- *Simple pole:* $\\mathrm{Res}(f,a)=\\lim_{z\\to a}(z-a)f(z)$.
- *The $\\frac p{q'}$ rule:* if $f=\\frac pq$, with $p,q$ analytic at $a$, $p(a)\\ne0$, and $q$ having a simple zero at $a$, then $\\mathrm{Res}(f,a)=\\frac{p(a)}{q'(a)}$.
- *Pole of order $m$:* $\\mathrm{Res}(f,a)=\\frac1{(m-1)!}\\lim_{z\\to a}\\frac{d^{m-1}}{dz^{m-1}}\\big[(z-a)^mf(z)\\big]$.
- *Otherwise,* including at essential singularities, find the Laurent series.

**Worked example.** Compute $\\oint_{|z|=2}\\frac{e^z}{z^2(z-1)}\\,dz$.

The singularities are at 0 (a double pole) and 1 (a simple pole), both inside $|z|=2$.

*At 1:* $\\mathrm{Res}=\\lim_{z\\to1}(z-1)f(z)=\\frac{e^1}{1^2}=e$.

*At 0:* with $m=2$,
$$\\mathrm{Res}=\\frac{d}{dz}\\left[\\frac{e^z}{z-1}\\right]_{z=0}=\\left[\\frac{e^z(z-1)-e^z}{(z-1)^2}\\right]_{z=0}=\\frac{-1-1}{1}=-2.$$

*Total:* $\\oint=2\\pi i(e-2)\\approx4.513i$.

*Check:* parametrise $z=2e^{it}$ and integrate numerically. In mpmath:

\`mp.quad(lambda t: f(2*mp.expj(t))*2j*mp.expj(t), [0, 2*mp.pi])\`

This returns approximately $4.5132i$. An answer that does not match means a mistake: commonly a missing factor of $(m-1)!$, a wrong pole order, or a pole outside the contour that was counted.

**Another example.** For $\\frac{1}{z^4+1}$, the poles are the four roots $e^{i\\pi(2k+1)/4}$. With the $\\frac p{q'}$ rule, $\\mathrm{Res}=\\frac{1}{4a^3}=\\frac{a}{4a^4}=-\\frac a4$, using $a^4=-1$. This trick avoids heavy algebra, and you will use it in the next lesson.

**Pitfalls.**

- *Orders of poles.* Check the order before applying a formula. $\\frac{\\sin z}{z^4}$ has a pole of order 3 at 0, not 4, because $\\sin z$ has a simple zero there.
- *Residue at a removable singularity is 0*, even if the formula looks singular.
- *Singularities on the contour* make the integral improper. The theorem does not apply as stated, and the principal value treatment in a later lesson is needed.
- *The theorem needs isolated singularities.* A branch cut inside the contour cannot be treated as a residue.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on residue theorem, with examples of computing residues.' },
            { ...mpmathDocs, note: 'The pages on numerical integration (\`quad\`) are what you need for checking.' },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/contour-integration-and-residues'],
          exercises: [
            {
              slug: 'compute-residues',
              title: 'Compute residues',
              prompt: `Find the residue at each finite singularity. (a) $\\frac{z}{z^2+4}$. (b) $\\frac{e^z}{(z-1)^3}$. (c) $\\cot z$ at $k\\pi$. (d) $\\frac{1}{z^2\\sin z}$ at 0. (e) $z^3e^{1/z}$ at 0. (f) $\\frac{1}{(z^2+1)^2}$ at $i$. Check (b), (d) and (f) with SymPy's \`residue\`. Expected: (b) $\\frac e2$, (d) $\\frac16$, (f) $-\\frac i4$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'contour-by-residues',
              title: 'Contour integrals by residues',
              prompt: `Evaluate, and check each numerically with \`mpmath.quad\`. (a) $\\oint_{|z|=3}\\frac{z^2}{(z-1)(z-2)}\\,dz$. (b) $\\oint_{|z|=1}\\frac{dz}{z\\sin z}$. (c) $\\oint_{|z|=2}\\tan z\\,dz$. (d) $\\oint_{|z|=1}z^2\\sin\\frac1z\\,dz$. (e) $\\oint_{|z|=4}\\frac{dz}{z^4+1}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (e), the sum of all residues is 0, which you can check with the $-\\frac a4$ formula.',
            },
            {
              slug: 'residue-at-infinity',
              title: 'Residue at infinity',
              prompt: `Define $\\mathrm{Res}(f,\\infty)=-\\mathrm{Res}\\big(\\frac{1}{w^2}f(\\frac1w),0\\big)$. (a) Show that if $f$ has finitely many singularities, then the sum of all residues, including at $\\infty$, is 0. (b) Use this to compute $\\oint_{|z|=3}\\frac{z^5}{z^6-1}\\,dz$ with one residue instead of six. (c) Check numerically.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the residue of $\\frac{\\cos z}{z}$ at 0, and of $\\frac{\\cos z}{z^2}$?',
              answerOutline: `1 (a simple pole with $\\cos0=1$), and 0 (a double pole: $\\frac{\\cos z}{z^2}=\\frac1{z^2}-\\frac12+\\dots$, with no $\\frac1z$ term).`,
            },
            {
              question: 'When does the $\\frac p{q\'}$ rule apply?',
              answerOutline: `When $q$ has a simple zero at $a$, and $p$ is analytic at $a$. If $q$ has a double zero, it fails, and you need the higher-order formula or a series.`,
            },
            {
              question: 'Your residue answer disagrees with numerical quadrature. What do you check first?',
              answerOutline: `Which poles are inside the contour; the order of each pole; the factorial in the higher-order formula; and the orientation. Then check the numerical integral itself by increasing its accuracy.`,
            },
          ],
        },
        {
          slug: 'real-integrals-by-residues',
          title: 'Real integrals: rational and trigonometric',
          summary:
            'Two standard methods: closing a contour in the upper half-plane for rational functions, and the unit circle for integrals over a period.',
          estimatedMinutes: 140,
          objectives: [
            'Evaluate $\\int_{-\\infty}^\\infty\\frac{P}{Q}\\,dx$ by closing in a half-plane',
            'Justify that the arc contributes nothing, with the degree condition',
            'Turn $\\int_0^{2\\pi}R(\\cos\\theta,\\sin\\theta)\\,d\\theta$ into a contour integral',
            'Check every result numerically',
          ],
          concepts: [
            'Closing the contour',
            'Semicircular arc estimate',
            'Degree condition',
            'Substitution $z=e^{i\\theta}$',
            'Poles inside the unit circle',
            'Symmetry tricks',
          ],
          explanation: `**Type 1: rational functions on the line.** Let $P$ and $Q$ be polynomials with $\\deg Q\\ge\\deg P+2$, and $Q$ with no real zeros. Then
$$\\int_{-\\infty}^\\infty\\frac{P(x)}{Q(x)}\\,dx=2\\pi i\\sum_{\\mathrm{Im}\\,a>0}\\mathrm{Res}\\left(\\frac PQ,a\\right).$$
*Why.* Close the segment $[-R,R]$ with the upper semicircle $C_R$. For $R$ large, the closed contour encloses all poles in the upper half-plane. On $C_R$, $|\\frac PQ|\\le\\frac{K}{R^2}$ by the degree condition, and $C_R$ has length $\\pi R$. So the arc's contribution is at most $\\frac{\\pi K}{R}\\to0$. The degree condition also makes the real integral converge absolutely. Without it, both statements fail.

**Worked example 1.** $\\int_{-\\infty}^\\infty\\frac{dx}{x^4+1}$.

The degree condition holds: $4\\ge0+2$. The poles in the upper half-plane are $a_1=e^{i\\pi/4}$ and $a_2=e^{3i\\pi/4}$. By the trick from the last lesson, $\\mathrm{Res}=-\\frac a4$. So
$$\\int=2\\pi i\\left(-\\frac{a_1+a_2}{4}\\right)=-\\frac{\\pi i}{2}\\left(\\frac{1+i}{\\sqrt2}+\\frac{-1+i}{\\sqrt2}\\right)=-\\frac{\\pi i}2\\cdot\\frac{2i}{\\sqrt2}=\\frac{\\pi}{\\sqrt2}.$$
Check: \`scipy.integrate.quad(lambda x: 1/(x**4+1), -inf, inf)\` gives $2.2214$, and $\\frac\\pi{\\sqrt2}=2.2214$.

The answer must be real and positive, since the integrand is positive. If you get an imaginary number, a residue is wrong. This is a free sanity check on every such calculation.

**Type 2: integrals over a period.** For $\\int_0^{2\\pi}R(\\cos\\theta,\\sin\\theta)\\,d\\theta$, put $z=e^{i\\theta}$, so the path is the unit circle and
$$\\cos\\theta=\\frac{z+z^{-1}}2,\\qquad\\sin\\theta=\\frac{z-z^{-1}}{2i},\\qquad d\\theta=\\frac{dz}{iz}.$$
The integral becomes $\\oint_{|z|=1}$ of a rational function. Only poles *inside* the unit circle count.

**Worked example 2.** For $a>|b|$, $\\int_0^{2\\pi}\\frac{d\\theta}{a+b\\cos\\theta}=\\frac{2\\pi}{\\sqrt{a^2-b^2}}$. Take $a=2$, $b=1$. The substitution gives
$$\\oint\\frac{1}{2+\\frac{z+z^{-1}}{2}}\\cdot\\frac{dz}{iz}=\\oint\\frac{2\\,dz}{i(z^2+4z+1)}.$$
The roots are $z=-2\\pm\\sqrt3$. Only $z_0=-2+\\sqrt3\\approx-0.27$ is inside. The residue of $\\frac{2}{i(z^2+4z+1)}$ there is $\\frac{2}{i(2z_0+4)}=\\frac{2}{2\\sqrt3\\,i}=\\frac{1}{\\sqrt3\\,i}$. So the integral is $2\\pi i\\cdot\\frac{1}{\\sqrt3\\,i}=\\frac{2\\pi}{\\sqrt3}\\approx3.628$, which agrees with the general formula.

**Pitfalls.**

- *Check the hypotheses.* $\\int_{-\\infty}^\\infty\\frac{x}{x^2+1}\\,dx$ fails the degree condition. It diverges, though its symmetric limit is 0.
- *Poles on the real axis* need a principal value and indentation, which is the next lesson.
- *Count only poles in the region enclosed*: upper half-plane for type 1, the unit disc for type 2.
- *Use symmetry.* An even integrand on $[0,\\infty)$ is half the integral on $\\mathbb{R}$.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on definite integrals using the residue theorem.' },
            { ...orloffOcw, note: 'The lecture notes on definite integrals by residues, with worked examples.' },
          ],
          exercises: [
            {
              slug: 'rational-integrals',
              title: 'Rational integrals',
              prompt: `Evaluate by residues, state why the arc vanishes, and check with \`scipy.integrate.quad\`. (a) $\\int_{-\\infty}^\\infty\\frac{dx}{(x^2+1)^2}$. (b) $\\int_{-\\infty}^\\infty\\frac{dx}{(x^2+1)(x^2+4)}$. (c) $\\int_0^\\infty\\frac{x^2}{x^4+1}\\,dx$. (d) $\\int_{-\\infty}^\\infty\\frac{dx}{x^2+2x+2}$. Expected: $\\frac\\pi2$, $\\frac\\pi6$, $\\frac{\\pi}{2\\sqrt2}$, $\\pi$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'trig-integrals',
              title: 'Trigonometric integrals',
              prompt: `Evaluate and check numerically. (a) $\\int_0^{2\\pi}\\frac{d\\theta}{5+4\\sin\\theta}$. (b) $\\int_0^{2\\pi}\\frac{\\cos2\\theta}{5-4\\cos\\theta}\\,d\\theta$. (c) $\\int_0^{\\pi}\\frac{d\\theta}{(2+\\cos\\theta)^2}$. (d) Prove the general formula $\\int_0^{2\\pi}\\frac{d\\theta}{a+b\\cos\\theta}=\\frac{2\\pi}{\\sqrt{a^2-b^2}}$ for $a>|b|$. Expected for (a), (b): $\\frac{2\\pi}3$, $\\frac\\pi6$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'In (b), write $\\cos2\\theta=\\mathrm{Re}\\,e^{2i\\theta}$, or substitute $\\frac{z^2+z^{-2}}{2}$.',
            },
            {
              slug: 'wedge-contour',
              title: 'A wedge contour',
              prompt: `Compute $\\int_0^\\infty\\frac{dx}{1+x^3}$ with the contour that runs along $[0,R]$, then along the arc $|z|=R$ to angle $\\frac{2\\pi}{3}$, then back to 0 along that ray. Show that the ray integral is $-e^{2\\pi i/3}$ times the original, so only one pole is enclosed. Expected: $\\frac{2\\pi}{3\\sqrt3}$. Check numerically.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the degree condition $\\deg Q\\ge\\deg P+2$ and not $+1$?',
              answerOutline: `With $+1$, the integrand is about $\\frac1R$ on the arc of length $\\pi R$, so the ML bound does not go to 0. Also the real integral may diverge, such as $\\int\\frac{x}{x^2+1}$.`,
            },
            {
              question: 'You get an imaginary answer for an integral of a positive real function. What happened?',
              answerOutline: `A residue is wrong, or a pole in the lower half-plane was included. The true value must be real and positive.`,
            },
            {
              question: 'In the trigonometric method, which poles count?',
              answerOutline: `Only those strictly inside the unit circle. For $a>|b|$, the two roots of the quadratic have product 1, so exactly one is inside.`,
            },
          ],
        },
        {
          slug: 'fourier-integrals-and-branch-cuts',
          title: 'Fourier integrals, indentation and branch cuts',
          summary:
            'Jordan\'s lemma for oscillating integrals, principal values around poles on the axis, and keyhole contours for multi-valued integrands.',
          estimatedMinutes: 150,
          objectives: [
            'Evaluate $\\int\\frac{P}{Q}e^{ikx}\\,dx$ with Jordan\'s lemma',
            'Handle a simple pole on the real axis with a principal value',
            'Evaluate $\\int_0^\\infty\\frac{\\sin x}{x}\\,dx$',
            'Use a keyhole contour for $\\int_0^\\infty x^{a-1}R(x)\\,dx$',
          ],
          concepts: [
            'Jordan\'s lemma',
            'Choice of half-plane by the sign of $k$',
            'Cauchy principal value',
            'Indented contour, half residue',
            'Keyhole contour',
            'Branch of $z^{a}$ on a keyhole',
          ],
          explanation: `**Jordan's lemma.** If $k>0$ and $|g(z)|\\le M(R)$ on the upper semicircle $C_R$, with $M(R)\\to0$, then $\\int_{C_R}g(z)e^{ikz}\\,dz\\to0$. Note that $M(R)\\to 0$ is enough, which is weaker than the $\\frac1{R^2}$ needed before. The reason is that $|e^{ikz}|=e^{-ky}$ is tiny on most of the arc. The bound comes from $\\sin\\theta\\ge\\frac{2\\theta}\\pi$ on $[0,\\frac\\pi2]$.

So for $\\deg Q\\ge\\deg P+1$ and no real zeros of $Q$:
$$\\int_{-\\infty}^\\infty\\frac{P(x)}{Q(x)}e^{ikx}\\,dx=2\\pi i\\sum_{\\mathrm{Im}\\,a>0}\\mathrm{Res}\\left(\\frac PQe^{ikz},a\\right)\\quad(k>0).$$
For $k<0$, close downward (and get a minus sign for the clockwise orientation). To get $\\int\\cos(kx)\\cdots$, take the real part of the $e^{ikx}$ result. Do *not* use $\\cos kz$ itself, because $\\cos kz$ grows in both half-planes.

**Worked example 1.** $\\int_{-\\infty}^\\infty\\frac{\\cos kx}{x^2+a^2}\\,dx$ with $k\\ge0$, $a>0$. Consider $\\frac{e^{ikz}}{z^2+a^2}$, with a simple pole at $ia$ in the upper half-plane. The residue there is $\\frac{e^{ik(ia)}}{2ia}=\\frac{e^{-ka}}{2ia}$. So
$$\\int_{-\\infty}^\\infty\\frac{e^{ikx}}{x^2+a^2}\\,dx=2\\pi i\\cdot\\frac{e^{-ka}}{2ia}=\\frac{\\pi e^{-ka}}{a}.$$
The result is already real. Its real part gives the cosine integral, and the sine integral is 0 by oddness. For $a=k=1$, this is $\\frac{\\pi}{e}\\approx1.1557$. Check it with \`mpmath.quadosc\`, which is designed for oscillatory integrals. Plain quadrature struggles with them.

**Poles on the axis.** If $Q$ has a simple real zero at $x_0$, the integral is defined as a **principal value**, removing $(x_0-\\varepsilon,x_0+\\varepsilon)$ symmetrically and letting $\\varepsilon\\to0$. Go around $x_0$ on a small upper semicircle. As its radius shrinks, it contributes $-\\pi i\\,\\mathrm{Res}$, which is half a residue with the clockwise sign.

**Worked example 2.** $\\int_0^\\infty\\frac{\\sin x}{x}\\,dx=\\frac\\pi2$. Take $\\frac{e^{iz}}{z}$, which has no poles in the upper half-plane and a simple pole at 0 with residue 1. The closed indented contour encloses nothing, so the contour sum is 0. Jordan's lemma kills the big arc, and the small arc gives $-\\pi i$. Therefore $\\mathrm{PV}\\int_{-\\infty}^\\infty\\frac{e^{ix}}{x}\\,dx=\\pi i$. The imaginary part is $\\int_{-\\infty}^\\infty\\frac{\\sin x}{x}\\,dx=\\pi$, and halving it by evenness gives $\\frac\\pi2$.

**Keyholes.** For $\\int_0^\\infty\\frac{x^{a-1}}{1+x}\\,dx$ with $0<a<1$, cut the plane along $[0,\\infty)$, use $z^{a-1}$ with $0<\\arg z<2\\pi$, and integrate around a keyhole: above the cut, around a big circle, back below the cut, around a small circle. Below the cut, $z^{a-1}$ picks up the factor $e^{2\\pi i(a-1)}$. The circles contribute nothing in the limit, which uses $0<a<1$. The residue at $z=-1=e^{i\\pi}$ gives
$$\\int_0^\\infty\\frac{x^{a-1}}{1+x}\\,dx=\\frac{\\pi}{\\sin\\pi a}.$$

**Pitfalls.** Close in the half-plane where $e^{ikz}$ decays. Use $e^{ikz}$, not $\\cos kz$. Be careful with the branch of $z^a$ on each side of a cut, and with $\\arg(-1)=\\pi$ in the residue. Note the half-residue rule applies only to *simple* poles on the axis.`,
          resources: [
            { ...orloffText, primary: true, note: 'The sections on Fourier-type integrals, Jordan\'s lemma, principal values and keyhole contours.' },
            {
              title: 'Jordan\'s Lemma',
              url: 'https://mathworld.wolfram.com/JordansLemma.html',
              type: 'article',
              cost: 'free',
              provider: 'Wolfram MathWorld',
              note: 'A compact statement of the lemma and its bound.',
            },
            { ...mpmathDocs, note: 'See \`quadosc\` for oscillatory integrals on infinite intervals.' },
          ],
          exercises: [
            {
              slug: 'fourier-type',
              title: 'Fourier-type integrals',
              prompt: `Evaluate and check with \`mpmath.quadosc\`. (a) $\\int_{-\\infty}^\\infty\\frac{\\cos x}{x^2+4}\\,dx$. (b) $\\int_{-\\infty}^\\infty\\frac{x\\sin x}{x^2+1}\\,dx$, using Jordan's lemma (the arc estimate with $\\frac1{R^2}$ is not enough). (c) $\\int_{-\\infty}^\\infty\\frac{\\cos x}{(x^2+1)^2}\\,dx$. (d) $\\int_{-\\infty}^{\\infty}\\frac{e^{-ikx}}{1+x^2}\\,dx$ for all real $k$, which is the Fourier transform. Expected: $\\frac{\\pi}{2e^2}$, $\\frac\\pi e$, $\\frac{\\pi}{e}$, $\\pi e^{-|k|}$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'principal-values',
              title: 'Principal values',
              prompt: `(a) Compute $\\mathrm{PV}\\int_{-\\infty}^\\infty\\frac{dx}{x(x^2+1)}$ and explain why the answer is clear by symmetry. (b) Compute $\\mathrm{PV}\\int_{-\\infty}^\\infty\\frac{\\cos x}{x-1}\\,dx$. (c) Compute $\\int_0^\\infty\\frac{\\sin^2x}{x^2}\\,dx$ by integrating $\\frac{1-e^{2iz}}{z^2}$ with an indentation. Expected for (c): $\\frac\\pi2$. Check (b) and (c) numerically.`,
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'keyhole',
              title: 'Keyhole contours',
              prompt: `(a) Carry out the keyhole calculation in full, showing why each circle contributes nothing when $0<a<1$, and get $\\frac{\\pi}{\\sin\\pi a}$. (b) Check numerically for $a=\\frac13$ and $a=\\frac12$. (c) Use the same contour with $\\log z$ to find $\\int_0^\\infty\\frac{\\ln x}{(1+x)^2}\\,dx$ (expected 0), and explain why the plain integrand $\\frac{1}{(1+x)^2}$ cannot be done with a keyhole without the logarithm.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), integrate $\\frac{(\\log z)^2}{(1+z)^2}$ around the keyhole: the jump in $(\\log z)^2$ across the cut produces the $\\ln x$ term.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why use $e^{iz}$ and not $\\cos z$ to compute $\\int\\frac{\\cos x}{x^2+1}\\,dx$?',
              answerOutline: `$\\cos z$ contains $e^{-iz}$, which grows in the upper half-plane, so the arc does not vanish. $e^{iz}$ decays there, and the cosine integral is its real part.`,
            },
            {
              question: 'What does a small semicircle above a simple pole on the axis contribute as its radius shrinks?',
              answerOutline: `$-\\pi i$ times the residue, going clockwise over the top. Half of the full circle's $2\\pi i\\,\\mathrm{Res}$, with the sign of the direction.`,
            },
            {
              question: 'Why do you need $0<a<1$ for the keyhole integral?',
              answerOutline: `$a>0$ makes the small circle vanish (and the integral converge at 0). $a<1$ makes the big circle vanish (and the integral converge at infinity).`,
            },
          ],
        },
        {
          slug: 'argument-principle-and-rouche',
          title: 'The argument principle and Rouche\'s theorem',
          summary:
            'Counting zeros and poles inside a curve with a contour integral, and comparing two functions to locate roots, with an application to stability.',
          estimatedMinutes: 130,
          objectives: [
            'State and use the argument principle',
            'Compute a winding number numerically',
            'State Rouche\'s theorem and use it to count roots in a disc or annulus',
            'Apply these to stability of a linear system',
          ],
          concepts: [
            'Logarithmic derivative',
            'Argument principle',
            'Winding number',
            'Rouche\'s theorem',
            'Counting roots in a region',
            'Stability and the right half-plane',
          ],
          explanation: `**Argument principle.** Let $C$ be a simple closed contour, positively oriented, and let $f$ be analytic on and inside $C$ except for finitely many poles inside, with no zeros or poles on $C$. Then
$$\\frac1{2\\pi i}\\oint_C\\frac{f'(z)}{f(z)}\\,dz=Z-P,$$
where $Z$ and $P$ are the numbers of zeros and poles inside $C$, counted with multiplicity.

*Why.* Near a zero of order $m$, $f=(z-a)^mg$, and $\\frac{f'}{f}=\\frac m{z-a}+\\frac{g'}{g}$, with residue $m$. A pole of order $m$ gives residue $-m$. Then apply the residue theorem.

*Geometric form.* $\\frac{f'}{f}$ is the derivative of $\\log f$, so the integral measures the total change of $\\arg f(z)$ as $z$ goes around $C$, divided by $2\\pi$. In other words, $Z-P$ is the **winding number** of the image curve $f(C)$ around 0. You can see this on a plot: draw $f(C)$, and count how many times it goes around the origin.

**Rouche's theorem.** If $f$ and $g$ are analytic on and inside $C$, and $|g|<|f|$ on $C$, then $f$ and $f+g$ have the same number of zeros inside $C$. The intuition is a person walking a dog: if the leash, $g$, is always shorter than the walker's distance from a tree, $f$, then the dog, $f+g$, circles the tree as often as the walker does.

**Worked example.** How many roots of $p(z)=z^5+3z+1$ lie in $|z|<1$, and how many in $1<|z|<2$?

*On $|z|=1$:* take $f=3z$ and $g=z^5+1$. Then $|f|=3$, and $|g|\\le|z|^5+1=2<3$. So $p=f+g$ has as many zeros in $|z|<1$ as $3z$ does: exactly one.

*On $|z|=2$:* take $f=z^5$ and $g=3z+1$. Then $|f|=32$, and $|g|\\le7<32$. So $p$ has five zeros in $|z|<2$.

*Conclusion:* one root in the unit disc, and four in the annulus $1<|z|<2$. No roots lie on $|z|=1$, as the strict inequality shows. Check: \`numpy.roots([1,0,0,0,3,1])\` gives five roots, one near $-0.33$, and two conjugate pairs with moduli about 1.26 and 1.37.

**Application: stability.** A linear system $y'=Ay$, or a linear differential equation with characteristic polynomial $p$, is asymptotically stable when all roots of $p$ have negative real part. Counting roots in the right half-plane is therefore an engineering question. The **Nyquist criterion** in control theory is the argument principle applied to a large half-disc in the right half-plane. You count how many times the image of the boundary winds around the origin.

**Pitfalls.**

- *Zeros on the contour* make the integral undefined. Rouche's strict inequality rules them out.
- *Choose $f$ as the dominant term on the contour.* It can be a different term on different contours, as in the example.
- *Multiplicities count.* $z^5$ has one zero of multiplicity five.
- *Rouche counts zeros; it does not locate them.* For locations, use a numerical root finder, then use Rouche to check that none were missed.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on the argument principle, Rouche\'s theorem and the Nyquist criterion.' },
            { ...orloffOcw, note: 'The lecture notes on the argument principle include the Nyquist stability criterion.' },
          ],
          exercises: [
            {
              slug: 'rouche-counts',
              title: 'Count the roots',
              prompt: `Use Rouche's theorem, then check with \`numpy.roots\`. (a) How many roots of $z^7-4z^3+z-1$ are in $|z|<1$? (b) How many roots of $z^4+8z+10$ are in $|z|<1$, and how many in $1<|z|<3$? (c) Show that $z^5+15z+1$ has exactly four roots in $\\frac32<|z|<2$. (d) Show that $e^z=3z$ has exactly one solution in $|z|<1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (b), on $|z|=1$ compare with 10, and on $|z|=3$ compare with $z^4$.',
            },
            {
              slug: 'winding-numerically',
              title: 'Count zeros numerically',
              prompt: `Write a function that computes $\\frac1{2\\pi i}\\oint\\frac{f'}{f}\\,dz$ on a circle with the trapezoid rule, and another that tracks the continuous change of $\\arg f(z)$ around the circle. Apply both to $z^5+3z+1$ on $|z|=r$ for $r=0.5,1,1.5,2$, and to $\\frac{z^2-1}{z^3}$ on $|z|=2$. Explain each count.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stability-check',
              title: 'Stability of a polynomial',
              prompt: `For $p(s)=s^3+2s^2+3s+K$, with $K>0$ a real parameter, find for which $K$ all roots lie in the left half-plane. Use the argument principle on a large half-disc in the right half-plane: count how the argument of $p(iy)$ changes as $y$ runs from $\\infty$ to $-\\infty$. Confirm the threshold numerically. (Expected: stable for $0<K<6$.)`,
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $\\frac1{2\\pi i}\\oint\\frac{f\'}{f}\\,dz$ count for $f(z)=\\frac{(z-1)^2}{z+3}$ on $|z|=5$? On $|z|=2$?',
              answerOutline: `On $|z|=5$: $Z-P=2-1=1$. On $|z|=2$: $2-0=2$, since the pole at $-3$ is outside.`,
            },
            {
              question: 'State Rouche\'s condition and why it must be strict.',
              answerOutline: `$|g|<|f|$ on $C$. Strictness ensures that neither $f$ nor $f+g$ vanishes on $C$, which the argument principle needs.`,
            },
            {
              question: 'Why is the number of roots of a polynomial of degree $n$ in a huge disc equal to $n$, by Rouche?',
              answerOutline: `On a large circle, the leading term $a_nz^n$ dominates the rest. So the polynomial has the same number of zeros as $a_nz^n$, which is $n$.`,
            },
          ],
        },
      ],
      project: {
        slug: 'residue-calculator',
        title: 'A residue calculator with numerical checks',
        description: `Build a small library that evaluates integrals by residues and checks each result against high-precision quadrature. The aim is not to replace a computer algebra system, but to make a habit of checking every residue calculation, and to collect the cases where a hypothesis fails.`,
        deliverables: [
          'Functions that find poles of a rational function, compute residues with the formulas from this module, and return $2\\pi i\\sum\\mathrm{Res}$ for a chosen contour',
          'A test suite of at least twelve integrals from this module, each compared with \`mpmath.quad\` or \`mpmath.quadosc\` to at least 10 significant digits',
          'Three cases where the method fails (degree condition, pole on the axis, branch cut), with the numerical evidence and the correct treatment',
          'A short report on which residue errors the numerical check caught while you were building it',
        ],
        estimatedHours: 12,
        stretchGoals: ['Use residues of $\\pi\\cot(\\pi z)f(z)$ to sum $\\sum\\frac1{n^2+a^2}$ in closed form, and check against a direct sum'],
      },
    },
    {
      slug: 'conformal-maps-and-applications',
      title: 'Conformal Maps and Applications',
      description:
        'Angle-preserving maps and Mobius transformations, and their use in potential flow, heat conduction, electrostatics and transform inversion.',
      lessons: [
        {
          slug: 'conformal-maps-and-mobius',
          title: 'Conformal maps and Mobius transformations',
          summary:
            'Why analytic maps preserve angles where the derivative is non-zero, and the Mobius maps that send circles to circles.',
          estimatedMinutes: 130,
          objectives: [
            'Explain why an analytic map with $f\'\\ne0$ preserves angles',
            'Describe the images of lines and circles under Mobius maps',
            'Find the Mobius map sending three given points to three given points',
            'Map half-planes and discs onto each other',
          ],
          concepts: [
            'Conformal map',
            'Critical point',
            'Mobius transformation',
            'Circles and lines',
            'Cross-ratio',
            'Cayley map',
          ],
          explanation: `Near a point $a$ with $f'(a)\\ne0$, $f(z)\\approx f(a)+f'(a)(z-a)$. Multiplying by $f'(a)=|f'(a)|e^{i\\alpha}$ is a rotation by $\\alpha$ and a scaling by $|f'(a)|$. So tiny figures are rotated and scaled, but not distorted. In particular, the angle between two curves through $a$ is preserved, in size and orientation. Such a map is **conformal**. At a **critical point**, where $f'(a)=0$, angles are multiplied: $z^2$ doubles angles at 0.

The use of conformal maps in applications: if $u$ is harmonic, then so is $u\\circ f$ for analytic $f$. So a problem posed on a complicated region can be moved to a simple one, solved there, and moved back. The boundary conditions move with it.

**Mobius transformations** are maps $T(z)=\\frac{az+b}{cz+d}$ with $ad-bc\\ne0$. They are the building blocks:

- They are compositions of translations, rotations and scalings, and inversion $\\frac1z$.
- They send circles and lines to circles and lines. A line counts as a circle through $\\infty$.
- There is exactly one Mobius map sending three distinct points $z_1,z_2,z_3$ to $0,1,\\infty$:
$$T(z)=\\frac{(z-z_1)(z_2-z_3)}{(z-z_3)(z_2-z_1)}.$$

**Worked example.** Find the Mobius map with $1\\mapsto0$, $i\\mapsto1$, $-1\\mapsto\\infty$, and the image of the unit disc.

Substitute into the formula:
$$T(z)=\\frac{(z-1)(i+1)}{(z+1)(i-1)}.$$
Simplify: $\\frac{1+i}{-1+i}=\\frac{(1+i)(-1-i)}{(-1+i)(-1-i)}=\\frac{-2i}{2}=-i$. So
$$T(z)=-i\\,\\frac{z-1}{z+1}.$$
Check: $T(i)=-i\\cdot\\frac{i-1}{i+1}=-i\\cdot i=1$.

*Image of the disc.* The unit circle passes through $1,i,-1$, which go to $0,1,\\infty$. So the circle goes to the real axis. The disc goes to one side of it, which we find by testing a point: $T(0)=-i\\cdot(-1)=i$, in the upper half-plane. So $T$ maps the unit disc onto the upper half-plane. Its inverse, $z=\\frac{i-w}{i+w}$ after solving, maps the upper half-plane back onto the disc. The standard **Cayley map** $w=\\frac{z-i}{z+i}$ does the same job, sending $i$ to 0.

**Other standard maps.**

- $z^\\alpha$ opens or closes a wedge: $z^2$ sends the first quadrant to the upper half-plane.
- $e^z$ sends a horizontal strip of height $\\pi$ to a half-plane, and $\\mathrm{Log}$ does the reverse.
- The **Joukowski map** $z+\\frac1z$ sends the exterior of the unit circle to the plane minus the segment $[-2,2]$. A shifted circle goes to an airfoil shape, as you will see in the next lesson.

**Pitfalls.**

- *Conformal fails at critical points.* For $z^2$ at 0, angles double. The boundary of a quadrant goes to a straight line.
- *Find the image region by a test point.* A circle divides the plane into two parts, and the map could send the inside to either side.
- *A Mobius map may send a circle to a line.* This happens exactly when a point of the circle goes to $\\infty$.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapter on conformal transformations, including Mobius maps.' },
            {
              title: 'Conformal map',
              url: 'https://en.wikipedia.org/wiki/Conformal_map',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Short overview with pictures of standard maps.',
            },
          ],
          exercises: [
            {
              slug: 'find-mobius',
              title: 'Find Mobius maps',
              prompt: `(a) Find the Mobius map with $0\\mapsto-1$, $1\\mapsto0$, $\\infty\\mapsto1$, and find the image of the upper half-plane. (b) Find a Mobius map from the disc $|z|<1$ onto itself sending $\\frac12$ to 0. (c) Find the image of the line $\\mathrm{Re}\\,z=1$ under $\\frac1z$. (d) Find the image of the circle $|z-1|=1$ under $\\frac1z$. Verify each by mapping sample points numerically.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (b), try $\\frac{z-a}{1-\\bar az}$, and for (c) and (d), recall that $\\frac1z$ maps circles through 0 to lines.',
            },
            {
              slug: 'composite-maps',
              title: 'Compose maps',
              prompt: `Find a conformal map from each region onto the upper half-plane, as a composition of standard maps. (a) The first quadrant. (b) The strip $0<\\mathrm{Im}\\,z<\\pi$. (c) The half-disc $|z|<1$, $\\mathrm{Im}\\,z>0$. (d) The region outside the unit circle in the upper half-plane. Plot the image of a grid for one of them to check.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For (c), map $-1\\mapsto0$ and $1\\mapsto\\infty$ with a Mobius map first, which gives a quadrant.',
            },
            {
              slug: 'angle-preservation',
              title: 'Angles numerically',
              prompt: `For $f(z)=z^2$ and $f(z)=e^z$, take two lines through a point $a$ at angle $\\frac\\pi3$, map short segments numerically, and measure the angle between the images. Do this at $a=1+i$ and, for $z^2$, at $a=0$. Report the angles, and explain the result at 0.`,
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $f\'(a)\\ne0$ give angle preservation?',
              answerOutline: `Locally, $f$ is multiplication by $f'(a)$, a rotation and scaling, which preserve angles. At a zero of $f'$, the leading term is $(z-a)^m$, which multiplies angles by $m$.`,
            },
            {
              question: 'How do you decide which side of a circle a Mobius map sends the inside to?',
              answerOutline: `Map a test point inside, such as the centre, and see which side of the image circle or line it lands on.`,
            },
            {
              question: 'Why are conformal maps useful for Laplace\'s equation?',
              answerOutline: `If $u$ is harmonic and $f$ is analytic, then $u\\circ f$ is harmonic. So you can solve on a simple region and pull the solution back to a complicated one.`,
            },
          ],
        },
        {
          slug: 'potential-flow',
          title: 'Potential flow',
          summary:
            'Ideal two-dimensional flow from a complex potential: uniform flow, sources, vortices, flow past a cylinder and the lift on a body with circulation.',
          estimatedMinutes: 140,
          objectives: [
            'Relate the complex potential to the velocity field and streamlines',
            'Superpose uniform flow, sources and vortices',
            'Analyse flow around a cylinder, with stagnation points and pressure',
            'Use the Joukowski map to move the cylinder solution to an airfoil shape',
          ],
          concepts: [
            'Ideal flow',
            'Velocity potential and stream function',
            'Complex potential',
            'Complex velocity',
            'Stagnation point',
            'Circulation',
            'Kutta-Joukowski lift',
          ],
          explanation: `Steady two-dimensional flow of an ideal fluid that is incompressible ($\\nabla\\cdot\\mathbf{v}=0$) and irrotational ($\\nabla\\times\\mathbf{v}=0$) has velocity $\\mathbf{v}=\\nabla\\phi$, with $\\phi$ harmonic. Let $\\psi$ be a harmonic conjugate, the **stream function**: its level curves are the streamlines. Then the **complex potential** $\\Phi=\\phi+i\\psi$ is analytic, and the velocity $\\mathbf{v}=(v_1,v_2)$ comes from
$$\\Phi'(z)=v_1-iv_2.$$
Note the conjugate, by the Cauchy-Riemann equations. Speed is $|\\Phi'|$.

**Building blocks.** Uniform flow $Uz$, with speed $U$ to the right; a source of strength $m$ at $a$, $\\frac{m}{2\\pi}\\log(z-a)$; a vortex of circulation $\\Gamma$, $-\\frac{i\\Gamma}{2\\pi}\\log(z-a)$. Since everything is linear, sums of these are flows too.

**Worked example (flow past a cylinder).** Let $a>0$, $U>0$, and
$$\\Phi(z)=U\\left(z+\\frac{a^2}{z}\\right),\\qquad|z|\\ge a.$$

*Boundary.* On $z=ae^{i\\theta}$, $\\Phi=U(ae^{i\\theta}+ae^{-i\\theta})=2Ua\\cos\\theta$, which is real. So $\\psi=0$ on the circle, and the circle is a streamline. The fluid flows around it, not through it. Far away, $\\Phi\\approx Uz$, a uniform flow.

*Velocity.* $\\Phi'(z)=U(1-\\frac{a^2}{z^2})$. On the circle, $\\Phi'=U(1-e^{-2i\\theta})$, so
$$|\\Phi'|=U|e^{i\\theta}-e^{-i\\theta}|=2U|\\sin\\theta|.$$
The **stagnation points**, where $\\Phi'=0$, are $z=\\pm a$, the front and back. The speed is greatest, $2U$, at the top and bottom.

*Pressure.* Bernoulli's equation gives $p+\\frac12\\rho|\\mathbf{v}|^2=$ constant. The pressure coefficient on the surface is $C_p=1-\\frac{|\\mathbf{v}|^2}{U^2}=1-4\\sin^2\\theta$. It is symmetric front to back and top to bottom, so the net force is zero. This is **d'Alembert's paradox**: an ideal fluid exerts no drag. Real fluids have viscosity and separation, and this model leaves them out.

**Adding circulation.** $\\Phi=U(z+\\frac{a^2}z)-\\frac{i\\Gamma}{2\\pi}\\log z$ still has the circle as a streamline. The stagnation points move: $\\Phi'=0$ gives $\\sin\\theta=\\frac{\\Gamma}{4\\pi Ua}$ on the circle, if $|\\Gamma|\\le4\\pi Ua$. Now the top and bottom pressures differ, and there is a lift force per unit span of size $\\rho U|\\Gamma|$. This is the **Kutta-Joukowski theorem**, and it can be derived from a residue calculation, Blasius's formula.

**Airfoils.** The Joukowski map $w=z+\\frac{c^2}{z}$ sends a circle passing through $z=c$ and enclosing $-c$ to a shape with a sharp trailing edge. Composing it with the cylinder flow gives flow past an airfoil. Choosing $\\Gamma$ so that a stagnation point sits at the trailing edge, the **Kutta condition**, determines the lift. This is the capstone project.

**Pitfalls.** The velocity is $\\overline{\\Phi'}$, not $\\Phi'$. Forgetting the conjugate reverses the vertical component. And the model is valid only outside the body, in the region where $\\Phi$ is analytic.`,
          resources: [
            {
              title: 'Potential flow',
              url: 'https://en.wikipedia.org/wiki/Potential_flow',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'The two-dimensional section covers complex potentials and standard flows.',
              primary: true,
            },
            { ...orloffText, note: 'The chapter on two-dimensional hydrodynamics and complex potentials.' },
            {
              title: 'Joukowsky transform',
              url: 'https://en.wikipedia.org/wiki/Joukowsky_transform',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'The map from circles to airfoils, with the Kutta condition.',
            },
          ],
          exercises: [
            {
              slug: 'standard-flows',
              title: 'Standard flows',
              prompt: `For each complex potential, find the velocity, the stagnation points and the streamlines, and plot them. (a) $\\Phi=z^2$, flow in a corner: show the walls are $x=0$ and $y=0$ in the first quadrant. (b) $\\Phi=Uz+\\frac{m}{2\\pi}\\log z$, a source in a stream: find the stagnation point. (c) $\\Phi=\\frac{m}{2\\pi}\\log\\frac{z-1}{z+1}$, a source and a sink. (d) $\\Phi=-\\frac{i\\Gamma}{2\\pi}\\log z$: find the speed at radius $r$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cylinder-analysis',
              title: 'Cylinder with circulation',
              prompt: `For $\\Phi=U(z+\\frac{a^2}z)-\\frac{i\\Gamma}{2\\pi}\\log z$: (a) show that $|z|=a$ is a streamline. (b) Find the stagnation points for $\\Gamma=0$, $\\Gamma=2\\pi Ua$ and $\\Gamma=4\\pi Ua$. Expected for $\\Gamma=2\\pi Ua$: at $\\theta=\\frac\\pi6$ and $\\frac{5\\pi}6$. (c) Integrate the surface pressure numerically to get the net force, and compare with $\\rho U\\Gamma$. (d) Plot the streamlines for the three cases.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'blasius',
              title: 'Lift by residues',
              prompt: `Blasius's theorem says that the force on a body, per unit span, satisfies $F_x-iF_y=\\frac{i\\rho}{2}\\oint\\left(\\frac{d\\Phi}{dz}\\right)^2dz$, around the body. (a) For the cylinder with circulation, expand $(\\Phi')^2$ in a Laurent series for large $|z|$, and find the coefficient of $\\frac1z$. (b) Use the residue theorem on a large circle to show $F_x=0$ and $|F_y|=\\rho U|\\Gamma|$. (c) Explain why the integral may be taken on any circle enclosing the body.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the velocity $\\overline{\\Phi\'}$?',
              answerOutline: `$\\Phi'=\\phi_x+i\\psi_x=\\phi_x-i\\phi_y$, by the Cauchy-Riemann equations, and $\\mathbf{v}=(\\phi_x,\\phi_y)$. So $\\Phi'=v_1-iv_2$.`,
            },
            {
              question: 'Why is the circle $|z|=a$ a streamline for $U(z+\\frac{a^2}z)$?',
              answerOutline: `On it, $\\frac{a^2}{z}=\\bar z$, so $\\Phi=U(z+\\bar z)$ is real and $\\psi=0$, a constant.`,
            },
            {
              question: 'What is d\'Alembert\'s paradox, and what resolves it?',
              answerOutline: `Ideal potential flow predicts no drag on a body in steady flow, from the symmetric pressure. Real fluids have viscosity, which creates boundary layers and separation. The ideal model omits these.`,
            },
          ],
        },
        {
          slug: 'heat-and-electrostatics',
          title: 'Steady heat and electrostatics',
          summary:
            'Solving Dirichlet problems for Laplace\'s equation by conformal mapping, with the argument function as the basic building block.',
          estimatedMinutes: 140,
          objectives: [
            'Recognise steady temperature and electrostatic potential as harmonic functions',
            'Solve a half-plane problem with piecewise-constant boundary values',
            'Move the solution to other regions by conformal maps',
            'Find isotherms, heat-flow lines, equipotentials and field lines',
          ],
          concepts: [
            'Dirichlet problem',
            'Harmonic measure',
            'Argument as a harmonic function',
            'Transplanting a solution',
            'Isotherms and flux lines',
            'Poisson integral for the half-plane',
          ],
          explanation: `Steady temperature in a plate with no heat sources satisfies Laplace's equation, and so does the electrostatic potential in a region with no charge. The **Dirichlet problem** asks for a harmonic $u$ in a region with given values on the boundary. Physically: you hold the edges at given temperatures, or voltages, and wait.

**The building block.** In the upper half-plane, $\\mathrm{Arg}\\,z$ is harmonic, as the imaginary part of the analytic function $\\mathrm{Log}\\,z$. On the positive real axis it is 0, and on the negative real axis it is $\\pi$. So:

**Worked example 1.** Find the steady temperature $u$ in the upper half-plane with $u=0$ on the positive real axis and $u=1$ on the negative real axis.
$$u(z)=\\frac1\\pi\\mathrm{Arg}\\,z=\\frac1\\pi\\arctan_2(y,x).$$
It is harmonic, it has the right boundary values, and it is bounded. The isotherms $u=c$ are rays from the origin at angle $\\pi c$. The heat flow lines are the level curves of the conjugate, $-\\frac1\\pi\\ln|z|$: semicircles centred at 0. Heat flows from the hot half of the boundary to the cold half around these semicircles.

More generally, if $u$ is 1 on the interval $(a,b)$ of the real axis and 0 on the rest, then
$$u=\\frac1\\pi\\big(\\mathrm{Arg}(z-b)-\\mathrm{Arg}(z-a)\\big),$$
which is $\\frac1\\pi$ times the angle subtended by $[a,b]$ at $z$. Sums of such terms handle any piecewise-constant data. And in the limit, they give the **Poisson integral**
$$u(x,y)=\\frac y\\pi\\int_{-\\infty}^\\infty\\frac{g(t)}{(x-t)^2+y^2}\\,dt$$
for boundary values $g$.

**Worked example 2 (transplanting).** Find the steady temperature in the first quadrant with $u=0$ on the positive $x$-axis and $u=1$ on the positive $y$-axis.

The map $w=z^2$ sends the first quadrant onto the upper half-plane. It sends the positive $x$-axis to the positive real axis, and the positive $y$-axis to the negative real axis. So the problem becomes example 1 in the $w$-plane, and
$$u(z)=\\frac1\\pi\\mathrm{Arg}(z^2)=\\frac2\\pi\\mathrm{Arg}\\,z.$$
Check: on the $y$-axis, $\\mathrm{Arg}\\,z=\\frac\\pi2$, so $u=1$. The isotherms are rays again, now spread over a right angle.

**Electrostatics.** The same mathematics gives potentials between conductors. Two semi-infinite plates meeting at the origin at angle $\\alpha$, held at potentials 0 and $V$, give $u=\\frac V\\alpha\\mathrm{Arg}\\,z$. The field $\\mathbf{E}=-\\nabla u$ has size $\\frac{V}{\\alpha r}$, which grows near the corner. For coaxial cylinders of radii $r_1<r_2$ at potentials $V_1,V_2$, use the real part of a logarithm: $u=V_1+(V_2-V_1)\\frac{\\ln(r/r_1)}{\\ln(r_2/r_1)}$.

**Pitfalls.**

- *Uniqueness needs boundedness.* In the half-plane, $u=y$ is harmonic and zero on the real axis, and so can be added to any solution. The physical solution is the bounded one.
- *Check where each boundary piece goes under the map,* including which side of the cut $\\mathrm{Arg}$ uses.
- *Insulated boundaries* ($\\partial u/\\partial n=0$) are different conditions from fixed values. Those boundaries become streamlines of the conjugate.`,
          resources: [
            { ...orloffText, primary: true, note: 'The chapters on harmonic functions and on conformal transformations include temperature and electrostatics examples.' },
            { ...orloffOcw, note: 'The lecture notes on solving the Dirichlet problem with conformal maps.' },
          ],
          relatedLessons: ['electromagnetism/potentials-and-conductors/laplaces-equation-uniqueness-and-images'],
          exercises: [
            {
              slug: 'half-plane-problems',
              title: 'Half-plane problems',
              prompt: `Find the bounded harmonic $u$ in the upper half-plane with the given boundary values, and check numerically that it satisfies Laplace's equation with finite differences. (a) $u=1$ on $(-1,1)$ and $0$ elsewhere. Give $u(0,1)$, expected $\\frac12$. (b) $u=T_1$ for $x<0$, $u=T_2$ for $0<x<1$, $u=T_3$ for $x>1$. (c) Compute $u(0,1)$ in (a) also with the Poisson integral, by quadrature.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'transplant-solutions',
              title: 'Transplant solutions',
              prompt: `(a) The strip $0<y<\\pi$, with $u=0$ on $y=0$ and $u=1$ on $y=\\pi$: show that $u=\\frac y\\pi$ and confirm it with the map $e^z$. (b) The strip with $u=1$ on the part of $y=0$ where $x<0$, and $u=0$ on the rest of the boundary. (c) The unit disc, with $u=1$ on the upper semicircle and $u=0$ on the lower. Use the Cayley map, and give $u(0)$, expected $\\frac12$. (d) The wedge $0<\\mathrm{Arg}\\,z<\\frac\\pi4$ with $u=0$ and $u=100$ on its two edges.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'relaxation-check',
              title: 'Check against a numerical solver',
              prompt: `Solve example 2, the quadrant with 0 and 1 on its edges, numerically by Jacobi or Gauss-Seidel relaxation on a grid over $[0,L]^2$. Use the exact solution as the boundary values on the far edges $x=L$ and $y=L$. Compare with $\\frac2\\pi\\mathrm{Arg}\\,z$ at interior points, and report how the error depends on grid spacing. Explain the large error near the corner.`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\mathrm{Arg}\\,z$ harmonic in the upper half-plane?',
              answerOutline: `It is the imaginary part of $\\mathrm{Log}\\,z$, which is analytic there, as the cut is on the negative real axis, which is boundary, not interior.`,
            },
            {
              question: 'Is the half-plane Dirichlet problem unique?',
              answerOutline: `Only among bounded solutions. Adding $cy$ gives other harmonic functions with the same boundary values.`,
            },
            {
              question: 'Describe the isotherms and heat-flow lines in example 1.',
              answerOutline: `Isotherms are rays from 0. The heat-flow lines are semicircles centred at 0, the level curves of the conjugate $\\ln|z|$, and they cross the isotherms at right angles.`,
            },
          ],
        },
        {
          slug: 'transforms-by-residues',
          title: 'Inverting transforms with residues',
          summary:
            'The Bromwich integral for the inverse Laplace transform, Fourier transforms by contour integration, and the inverse z-transform.',
          estimatedMinutes: 140,
          objectives: [
            'State the inverse Laplace transform as a contour integral',
            'Invert rational Laplace transforms by summing residues',
            'Compute Fourier transforms with contour integration',
            'Invert a z-transform with a contour integral',
          ],
          concepts: [
            'Laplace transform',
            'Bromwich integral',
            'Abscissa of convergence',
            'Closing to the left',
            'Fourier transform',
            'z-transform',
          ],
          explanation: `The Laplace transform $F(s)=\\int_0^\\infty f(t)e^{-st}\\,dt$ turns differential equations into algebra. You have probably inverted it with tables and partial fractions. Complex analysis gives the general formula, the **Bromwich integral**:
$$f(t)=\\frac1{2\\pi i}\\int_{\\gamma-i\\infty}^{\\gamma+i\\infty}F(s)e^{st}\\,ds,$$
along a vertical line $\\mathrm{Re}\\,s=\\gamma$ to the right of every singularity of $F$.

For $t>0$, close the contour with a large arc to the **left**, where $e^{st}$ decays, by a version of Jordan's lemma. If $F$ is rational with denominator degree greater than numerator degree, the arc contributes nothing, and
$$f(t)=\\sum_{\\text{poles }p}\\mathrm{Res}\\big(F(s)e^{st},p\\big)\\qquad(t>0).$$

**Worked example 1.** Invert $F(s)=\\frac1{(s+1)(s+2)}$. Both poles are simple.
$$\\mathrm{Res}_{s=-1}=\\frac{e^{-t}}{-1+2}=e^{-t},\\qquad\\mathrm{Res}_{s=-2}=\\frac{e^{-2t}}{-2+1}=-e^{-2t}.$$
So $f(t)=e^{-t}-e^{-2t}$, matching partial fractions. The method shows something useful: each pole $p$ gives a term $e^{pt}$. Poles in the left half-plane give decay, and poles on the right give growth. This is the stability criterion from the argument principle lesson.

**Worked example 2.** A repeated pole, where tables need care: $F(s)=\\frac1{(s^2+1)^2}$, which has double poles at $\\pm i$. At $s=i$,
$$\\mathrm{Res}=\\frac{d}{ds}\\left[\\frac{e^{st}}{(s+i)^2}\\right]_{s=i}=\\left[\\frac{te^{st}}{(s+i)^2}-\\frac{2e^{st}}{(s+i)^3}\\right]_{s=i}=\\frac{te^{it}}{-4}-\\frac{2e^{it}}{-8i}=-\\frac{te^{it}}{4}-\\frac{ie^{it}}{4}.$$
The residue at $-i$ is the complex conjugate. Adding the two takes twice the real part:
$$f(t)=2\\,\\mathrm{Re}\\left(-\\frac{te^{it}}{4}-\\frac{ie^{it}}{4}\\right)=-\\frac{t\\cos t}{2}+\\frac{\\sin t}{2}=\\frac{\\sin t-t\\cos t}{2}.$$
This is the response of an undamped oscillator driven at resonance: the $t\\cos t$ term grows. Check: with SymPy, \`inverse_laplace_transform\` gives the same.

**Fourier transforms.** $\\hat f(\\omega)=\\int_{-\\infty}^\\infty f(x)e^{-i\\omega x}\\,dx$ is the type of integral done with Jordan's lemma, closing up or down according to the sign of $\\omega$. For example, the transform of $\\frac1{1+x^2}$ is $\\pi e^{-|\\omega|}$. The kink at $\\omega=0$ reflects the slow decay of $\\frac{1}{1+x^2}$.

**z-transforms.** For a sequence $a_n$, $A(z)=\\sum_{n\\ge0}a_nz^{-n}$, a Laurent series converging outside some circle. The inverse is a Laurent coefficient: $a_n=\\frac1{2\\pi i}\\oint A(z)z^{n-1}\\,dz$, around a large circle. So it is again a sum of residues. This is how digital filters and linear recurrences are analysed.

**Pitfalls.**

- *The Bromwich line must be to the right of all singularities.* Otherwise you get a different function.
- *For $t<0$, close to the right*, which encloses nothing, so $f(t)=0$. That is consistent with $f$ being defined for $t\\ge0$.
- *Non-rational $F$* may have branch points, as for $\\frac1{\\sqrt s}$. Then the contour must avoid a cut, and the answer is a real integral along the cut, not a sum of residues.`,
          resources: [
            {
              title: 'Laplace transform',
              url: 'https://en.wikipedia.org/wiki/Laplace_transform',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'See the section on the inverse transform and the Bromwich integral.',
            },
            { ...orloffText, primary: true, note: 'The chapter on the Laplace transform covers the inverse transform with residues.' },
            {
              title: 'Z-transform',
              url: 'https://en.wikipedia.org/wiki/Z-transform',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'The section on the inverse z-transform by the residue theorem.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
          exercises: [
            {
              slug: 'invert-laplace',
              title: 'Invert by residues',
              prompt: `Invert by summing residues, and check with SymPy's \`inverse_laplace_transform\`. (a) $\\frac{s}{s^2+4}$. (b) $\\frac{1}{s(s+1)^2}$. (c) $\\frac{1}{s^2+2s+5}$. (d) $\\frac{s^2}{(s^2+1)^2}$. Expected for (b): $1-e^{-t}-te^{-t}$, and for (c): $\\frac12e^{-t}\\sin2t$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'solve-ode-by-transform',
              title: 'An initial value problem',
              prompt: `Solve $y''+2y'+y=e^{-t}$, $y(0)=0$, $y'(0)=1$, by Laplace transform, finding the transform of $y$ and inverting it by residues. Identify the order of the pole and explain the $t^2e^{-t}$ term physically. Verify by substituting into the equation with SymPy. (Expected: $y=te^{-t}+\\frac12t^2e^{-t}$.)`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'z-transform-recurrence',
              title: 'Recurrences by the z-transform',
              prompt: `For $a_{n+2}=a_{n+1}+a_n$, $a_0=0$, $a_1=1$: (a) show that $A(z)=\\frac{z}{z^2-z-1}$. (b) Invert by residues of $A(z)z^{n-1}$ to get Binet's formula. (c) Check the first 30 terms numerically. (d) Explain from the pole locations why $a_{n+1}/a_n$ tends to the golden ratio.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why close the Bromwich contour to the left for $t>0$?',
              answerOutline: `$|e^{st}|=e^{t\\,\\mathrm{Re}\\,s}$ is small when $\\mathrm{Re}\\,s$ is very negative and $t>0$, so the arc's contribution tends to 0 there.`,
            },
            {
              question: 'What does a double pole at $s=-a$ produce in $f(t)$?',
              answerOutline: `A term $te^{-at}$, along with $e^{-at}$. In general, a pole of order $m$ gives $t^{m-1}e^{-at}$ times a constant, plus lower powers.`,
            },
            {
              question: 'How does the pole location of a Laplace transform relate to stability?',
              answerOutline: `Each pole $p$ gives $e^{pt}$ (times a polynomial for repeated poles). All poles with $\\mathrm{Re}\\,p<0$ means decay, and any with $\\mathrm{Re}\\,p>0$ means growth.`,
            },
          ],
        },
      ],
      project: {
        slug: 'conformal-map-explorer',
        title: 'A conformal map and Laplace solver',
        description: `Combine the ideas of this module in a small program: map a region onto a half-plane, solve a boundary value problem there, and pull back the solution. Compare with a direct numerical solution, so that you can see both the power of the method and where it needs care.`,
        deliverables: [
          'A tool that plots the image of a grid under a chosen composition of standard maps, and checks the angles at grid crossings',
          'Exact solutions, isotherms and flux lines for at least three temperature or potential problems from this module, on a quadrant, a strip and a disc',
          'A comparison of one exact solution with a finite-difference relaxation solution, with an error table',
          'Streamlines and surface speed for flow past a cylinder with and without circulation, with stagnation points marked',
        ],
        estimatedHours: 12,
        stretchGoals: ['Use the Schwarz-Christoffel formula, read from a reference, to map the half-plane to a rectangle or a step, and solve a channel flow'],
      },
    },
  ],
  capstone: {
    slug: 'joukowski-airfoil',
    title: 'Lift on a Joukowski airfoil',
    description: `Model two-dimensional flow past an airfoil using only the tools of this course, and compute its lift. The airfoil is the image of a circle under the Joukowski map $w=z+\\frac{c^2}{z}$. The circle has centre $z_0$, slightly off the origin, and passes through $z=c$, which becomes the sharp trailing edge.

Start from the cylinder flow with circulation in the $z$-plane, tilted to give an angle of attack $\\alpha$: the free stream is $Ue^{-i\\alpha}(z-z_0)$ plus the matching image term and a vortex. Map it to the $w$-plane. Then impose the Kutta condition, that the flow leaves the trailing edge smoothly, by choosing the circulation $\\Gamma$ so that $z=c$ is a stagnation point. Write $c-z_0=Re^{-i\\beta}$, so that $R$ is the circle's radius and $\\beta$ is the angle by which the line from $z_0$ to $c$ points below the horizontal. You should find $|\\Gamma|=4\\pi UR\\sin(\\alpha+\\beta)$. Fix your sign convention for $\\Gamma$ at the start and derive this carefully. Then the Kutta-Joukowski theorem gives the lift per unit span, of size $\\rho U|\\Gamma|$.

Report the lift coefficient $C_L=\\frac{L}{\\frac12\\rho U^2\\cdot\\text{chord}}$ against $\\alpha$, and compare with the thin airfoil result $C_L\\approx2\\pi\\alpha$ for small thickness and camber, and with published measurements for a real airfoil at small angles. Say clearly what the model leaves out: viscosity, stall and three-dimensional effects.`,
    deliverables: [
      'A derivation, in your own words, of the complex potential around the airfoil, including the Kutta condition and the formula for $\\Gamma$',
      'Code that plots the airfoil, the streamlines and the surface pressure coefficient for chosen $z_0$ and $\\alpha$',
      'The lift computed three ways, all agreeing: from the Kutta-Joukowski formula, from Blasius\'s theorem by residues, and by integrating surface pressure numerically',
      'A plot of $C_L$ against $\\alpha$ from 0 to 10 degrees for two airfoil shapes, compared with $2\\pi\\alpha$',
      'A section on the limits of the model and where it disagrees with experiment',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Add a second, Karman-Trefftz, map to give a trailing edge with a finite angle',
      'Compute the flow on a grid with a panel method, and compare with the conformal solution',
    ],
  },
  masteryChecklist: [
    'I can compute with complex numbers in Cartesian and polar form, and find all roots, logarithms and powers with their branches',
    'I can test analyticity with the Cauchy-Riemann equations, and find harmonic conjugates',
    'I can compute contour integrals directly and with Cauchy\'s theorem and integral formula, checking the hypotheses',
    'I can find Taylor and Laurent series on the right region, and classify singularities',
    'I can compute residues and use them for rational, trigonometric, Fourier-type, principal-value and keyhole integrals, and I check every answer numerically',
    'I can count zeros in a region with the argument principle and Rouche\'s theorem, and relate this to stability',
    'I can find conformal maps between standard regions, including Mobius maps',
    'I can solve potential flow, steady heat and electrostatics problems in two dimensions with conformal maps',
    'I can invert Laplace and z-transforms with residues',
  ],
});
