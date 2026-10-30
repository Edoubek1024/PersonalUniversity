import { defineSubject } from '../define';

export default defineSubject({
  id: 'math-methods',
  title: 'Mathematical Methods for Physics',
  category: 'physics',
  tagline:
    'Calculus, linear algebra, differential equations, vector calculus, Fourier and complex analysis: the shared mathematical toolkit every physics and data subject draws on.',
  description: `Physics is written in mathematics, and almost every later subject in this curriculum (mechanics, electromagnetism, quantum mechanics, statistics, machine learning, computational physics) assumes you can differentiate, integrate, diagonalise a matrix, solve a differential equation and expand a function in a Fourier series without stopping to think. This subject is the canonical home for that toolkit. Other subjects link here whenever they need a shared idea, so each lesson is written to stand on its own as a reference as well as a lesson.

The approach is a physicist's: every method is motivated by a physical problem (a falling body, a vibrating string, a heat flow, a wave packet), derived properly, and then checked numerically in Python. You will fill a notebook with small numerical experiments that confirm each derivation, which is how working scientists actually build trust in a formula. The order follows the classic sequence of Mary Boas's *Mathematical Methods in the Physical Sciences*: single- and multi-variable calculus, linear algebra, ordinary differential equations, vector calculus, Fourier and complex analysis, and finally partial differential equations with the special functions they generate.

The primary free sources are MIT OpenCourseWare (18.01, 18.02, 18.03, 18.04, 18.06), the OpenStax Calculus volumes, Paul's Online Math Notes, 3Blue1Brown's visual series, LibreTexts and James Nearing's free *Mathematical Tools for Physics*. Boas and Riley/Hobson/Bence are excellent paid companions, never required. Expect to spend most of your time on exercises; reading alone will not make these methods automatic, and automatic is the goal.`,
  difficulty: 'intermediate',
  estimatedHours: 120,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra, trigonometry and exponentials/logarithms',
    'Some exposure to derivatives and integrals (a first calculus course helps but is not assumed)',
    'Basic Python for the numerical checks (see programming-fundamentals)',
  ],
  tags: ['calculus', 'linear algebra', 'differential equations', 'vector calculus', 'fourier', 'complex analysis', 'PDEs'],
  core: true,
  modules: [
    {
      slug: 'single-variable-calculus',
      title: 'Single-Variable Calculus',
      description:
        'Derivatives, integrals and series as a physicist uses them: rates of change, accumulation, approximation, and the standard integrals that appear everywhere.',
      lessons: [
        {
          slug: 'limits-and-derivatives',
          title: 'Limits, derivatives and linearisation',
          summary:
            'The derivative as a local linear approximation, the rules that compute it, and why physicists constantly replace functions by their tangent lines.',
          estimatedMinutes: 150,
          objectives: [
            'Define the derivative as a limit and interpret it as slope, rate of change and best linear approximation',
            'Apply the product, quotient and chain rules fluently, including implicit and logarithmic differentiation',
            'Linearise a function around a point and estimate the error of the approximation',
            'Find and classify extrema using first and second derivatives',
            'Relate derivatives to physical quantities: velocity, acceleration, power, current',
          ],
          concepts: [
            'Limit and continuity',
            'Derivative as a limit of difference quotients',
            'Tangent line / linear approximation',
            'Product, quotient and chain rules',
            'Implicit differentiation',
            'Critical points, second-derivative test',
            'Small-angle and small-parameter approximations',
            'Notation: Leibniz, Newton (dot) and prime',
          ],
          explanation: `The derivative is the single most used idea in physics, and the way physicists use it is slightly different from the way a first calculus course presents it. Formally,

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h},$$

but the working intuition is **linearisation**: close to $x_0$, $f(x) \\approx f(x_0) + f'(x_0)(x - x_0)$. Every "small oscillation", "weak field" or "low velocity" argument in physics is this replacement of a curve by its tangent line, and the quality of the approximation is controlled by the next term, $\\tfrac{1}{2} f''(x_0)(x-x_0)^2$. Keep this picture in mind: a derivative is a *local* statement.

The computational rules are few. The **chain rule** $\\frac{d}{dx} f(g(x)) = f'(g(x))\\, g'(x)$ is the one you will use most, because physical quantities are almost always functions of other functions (position depends on time, energy depends on position). In Leibniz notation it reads $\\frac{dy}{dx} = \\frac{dy}{du}\\frac{du}{dx}$, which looks like cancelling fractions and is a reliable mnemonic. **Implicit differentiation** handles relations like $x^2 + y^2 = r^2$ where $y$ is not isolated; differentiate both sides and solve for $dy/dx$. **Logarithmic differentiation** tames products and powers: take $\\ln$, differentiate, multiply back.

Two pitfalls. First, $\\sin\\theta \\approx \\theta$ requires $\\theta$ in radians; the small-angle approximation is just linearisation at $\\theta = 0$. Second, a zero derivative is necessary but not sufficient for an extremum; check the second derivative or the sign change, and remember that on a closed interval the extremum may sit at an endpoint.

Work through MIT 18.01SC Unit 1 (Differentiation) alongside OpenStax Calculus Volume 1 chapters 2-4. Do many short problems rather than a few long ones: fluency is the goal. Then watch the 3Blue1Brown *Essence of Calculus* episodes on derivatives and the chain rule for the geometric picture, and reproduce the pictures yourself with a few lines of matplotlib.`,
          resources: [
            {
              title: 'MIT 18.01SC Single Variable Calculus — Unit 1: Differentiation',
              url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions 1-30 with worked examples and problem sets. Do the problem-set checks before moving on.',
              primary: true,
            },
            {
              title: 'OpenStax Calculus Volume 1 — Chapters 2-4',
              url: 'https://openstax.org/details/books/calculus-volume-1',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Limits, derivatives and applications of derivatives, with many drill exercises and answers to odd problems.',
            },
            {
              title: '3Blue1Brown — Essence of Calculus',
              url: 'https://www.3blue1brown.com/topics/calculus',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Episodes 1-4 for the geometric meaning of the derivative and the chain rule.',
            },
            {
              title: "Paul's Online Math Notes — Calculus I",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Compact notes with fully worked problems; good for a quick second explanation of any rule.',
            },
          ],
          exercises: [
            {
              slug: 'derivative-drill',
              title: 'Derivative drill with the chain rule',
              prompt:
                'Differentiate by hand: (a) $x^2 e^{-x^2/2}$, (b) $\\ln(\\cos x)$, (c) $\\sqrt{1 + \\tan^2 x}$, (d) $x^x$ (use logarithmic differentiation), (e) $y$ from $x^3 + y^3 = 6xy$ at the point $(3,3)$. Then check each answer numerically in Python with a central difference $(f(x+h)-f(x-h))/2h$ for $h = 10^{-5}$; report the absolute error in each case (it should be below $10^{-8}$ for smooth functions).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'linearisation-error',
              title: 'Measure the error of linearisation',
              prompt:
                'Linearise $f(\\theta) = \\sin\\theta$ about $\\theta = 0$ and $g(x) = \\sqrt{1+x}$ about $x = 0$. For $\\theta, x \\in [10^{-3}, 1]$ plot the absolute error of each linear approximation on log-log axes. Show that the slope is 3 for $\\sin$ (the quadratic term vanishes) and 2 for $\\sqrt{1+x}$, and explain why from the next Taylor term.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'On log-log axes a power law $C x^n$ is a straight line of slope $n$.',
            },
            {
              slug: 'projectile-optimum',
              title: 'Optimise a projectile',
              prompt:
                'A projectile launched at speed $v$ and angle $\\theta$ on flat ground has range $R(\\theta) = (v^2/g)\\sin 2\\theta$. Find the angle that maximises range using the first and second derivative, then repeat for a launch from height $h$: $R = \\frac{v\\cos\\theta}{g}\\left(v\\sin\\theta + \\sqrt{v^2\\sin^2\\theta + 2gh}\\right)$. Solve the second case numerically for $v = 20\\ \\mathrm{m/s}$, $h = 10\\ \\mathrm{m}$ and show the optimum is below $45^\\circ$ (about $37^\\circ$).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the derivative described as the "best linear approximation" and what controls the error of that approximation?',
              answerOutline:
                'The tangent line $f(x_0) + f\'(x_0)(x-x_0)$ matches value and slope; the error is $\\approx \\tfrac12 f\'\'(x_0)(x-x_0)^2$, so it shrinks quadratically with distance and depends on curvature.',
            },
            {
              question: 'State the chain rule in Leibniz notation and give a physical example where it is needed.',
              answerOutline:
                '$dy/dx = (dy/du)(du/dx)$. Example: kinetic energy as function of time via velocity, $dK/dt = (dK/dv)(dv/dt) = mva$.',
            },
            {
              question: 'Why can $f\'(x_0)=0$ fail to indicate a maximum or minimum?',
              answerOutline:
                'It may be an inflection point (e.g. $x^3$ at 0); the second derivative or a sign change of $f\'$ is needed, and extrema on closed intervals may be at endpoints.',
            },
            {
              question: 'What does the small-angle approximation assume and what is the first neglected term?',
              answerOutline:
                '$\\theta$ in radians and $|\\theta| \\ll 1$; $\\sin\\theta = \\theta - \\theta^3/6 + \\dots$ so the first neglected term is $-\\theta^3/6$.',
            },
          ],
        },
        {
          slug: 'integration-techniques',
          title: 'Integration: techniques and the standard physics integrals',
          summary:
            'The fundamental theorem, substitution, parts and partial fractions, and the improper and Gaussian integrals that appear throughout physics.',
          estimatedMinutes: 180,
          objectives: [
            'State the fundamental theorem of calculus and use it to differentiate integrals with variable limits',
            'Evaluate integrals by substitution, integration by parts, trigonometric substitution and partial fractions',
            'Evaluate improper integrals and decide convergence',
            'Derive the Gaussian integral $\\int_{-\\infty}^{\\infty} e^{-ax^2}dx = \\sqrt{\\pi/a}$ and its moments',
            'Define the Gamma function and use it to evaluate integrals of the form $\\int_0^\\infty x^n e^{-x}dx$',
          ],
          concepts: [
            'Riemann sum and definite integral',
            'Fundamental theorem of calculus',
            'Substitution (change of variable)',
            'Integration by parts',
            'Partial fractions',
            'Improper integrals and convergence',
            'Gaussian integral and differentiation under the integral sign',
            'Gamma function $\\Gamma(n) = \\int_0^\\infty x^{n-1}e^{-x}dx$',
          ],
          explanation: `An integral is a sum of infinitely many infinitesimal pieces: $\\int_a^b f(x)\\,dx = \\lim \\sum f(x_i)\\,\\Delta x$. Whenever you compute a total from a density (mass from density, work from force, charge from charge density, probability from a probability density) you are integrating. The **fundamental theorem of calculus**, $\\int_a^b f'(x)\\,dx = f(b) - f(a)$ and $\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)$, connects this to antiderivatives and is what makes integrals computable in closed form at all.

The techniques are a small toolbox. **Substitution** is the chain rule in reverse; the skill is spotting that the integrand contains both $g(x)$ and $g'(x)$. **Integration by parts**, $\\int u\\,dv = uv - \\int v\\,du$, is the product rule in reverse and is how you handle $x^n e^{x}$, $x\\sin x$, $\\ln x$ and, later, how you move derivatives from one function onto another in quantum mechanics and in deriving Euler-Lagrange equations. **Partial fractions** decompose rational functions into terms you can integrate as logarithms and arctangents.

Physics needs a few special integrals so often that you should know them cold. The **Gaussian integral** is the centrepiece:

$$I = \\int_{-\\infty}^{\\infty} e^{-a x^2}\\,dx = \\sqrt{\\frac{\\pi}{a}},$$

proved by squaring $I$, switching to polar coordinates and integrating $r e^{-ar^2}$. Differentiating with respect to the parameter $a$ (differentiation under the integral sign) then gives all even moments: $\\int x^2 e^{-ax^2}dx = \\frac{1}{2a}\\sqrt{\\pi/a}$. The **Gamma function** $\\Gamma(n) = \\int_0^\\infty x^{n-1} e^{-x}\\,dx$ satisfies $\\Gamma(n+1) = n\\Gamma(n)$ (by parts) and $\\Gamma(1/2) = \\sqrt{\\pi}$, which lets you write down integrals such as $\\int_0^\\infty x^3 e^{-x^2}dx$ immediately.

Improper integrals (infinite limits or singular integrands) are limits; always ask whether the limit exists. $\\int_1^\\infty x^{-p}dx$ converges only for $p > 1$, and $\\int_0^1 x^{-p}dx$ only for $p < 1$: this pair is the comparison test you will use most.

Work MIT 18.01SC Units 3-4 and OpenStax Volume 2 chapters 1-3. Then verify every special integral in this lesson numerically with \`scipy.integrate.quad\`; disagreement means you made an algebra mistake, and finding it is the lesson.`,
          resources: [
            {
              title: 'MIT 18.01SC — Units 3-4: Integration and Techniques of Integration',
              url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Includes improper integrals and the Gaussian integral in the session on numerical integration and polar coordinates.',
              primary: true,
            },
            {
              title: 'OpenStax Calculus Volume 2 — Chapters 1-3',
              url: 'https://openstax.org/details/books/calculus-volume-2',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Integration, applications of integration, techniques of integration (parts, trig substitution, partial fractions, improper integrals).',
            },
            {
              title: "Paul's Online Math Notes — Calculus II",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'The integration-techniques chapter has many worked examples at exactly the level needed here.',
            },
            {
              title: 'NIST Digital Library of Mathematical Functions — Chapter 5: Gamma Function',
              url: 'https://dlmf.nist.gov/5',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The authoritative reference for the Gamma function identities you will use.',
            },
          ],
          exercises: [
            {
              slug: 'technique-drill',
              title: 'Technique drill',
              prompt:
                'Evaluate by hand and check with SciPy: (a) $\\int_0^{\\pi/2} \\sin^3 x \\cos x\\,dx$, (b) $\\int_0^\\infty x^2 e^{-x}\\,dx$, (c) $\\int \\frac{dx}{x^2 - 1}$, (d) $\\int_0^1 \\frac{dx}{\\sqrt{1-x^2}}$, (e) $\\int_0^\\infty \\frac{dx}{1+x^2}$. Expected: 1/4, 2, $\\tfrac12\\ln|(x-1)/(x+1)|$, $\\pi/2$, $\\pi/2$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gaussian-integral-derivation',
              title: 'Derive the Gaussian integral and its moments',
              prompt:
                'Derive $\\int_{-\\infty}^\\infty e^{-ax^2}dx = \\sqrt{\\pi/a}$ by the polar-coordinate trick. Then differentiate with respect to $a$ to obtain $\\langle x^2\\rangle$ and $\\langle x^4\\rangle$ for the normalised density $\\sqrt{a/\\pi}\\,e^{-ax^2}$. Finally derive the general formula $\\int_{-\\infty}^\\infty x^{2n} e^{-ax^2}dx = \\frac{(2n-1)!!}{(2a)^n}\\sqrt{\\pi/a}$ and verify $n = 1, 2, 3$ with numerical quadrature for $a = 1.7$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gamma-function-identities',
              title: 'Gamma function identities',
              prompt:
                'Prove $\\Gamma(n+1) = n\\Gamma(n)$ by integration by parts and $\\Gamma(1/2) = \\sqrt{\\pi}$ by the substitution $x = t^2$. Use them to evaluate $\\int_0^\\infty x^{5/2} e^{-x}dx$ and $\\int_0^\\infty x^3 e^{-x^2}dx$ in closed form, then check both with `scipy.special.gamma` and `scipy.integrate.quad`.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'improper-convergence',
              title: 'Convergence of improper integrals',
              prompt:
                'Decide, with justification, whether each converges: $\\int_1^\\infty \\frac{dx}{x\\ln x}$, $\\int_0^\\infty \\frac{\\sin x}{x}dx$, $\\int_0^1 \\ln x\\,dx$, $\\int_0^\\infty e^{-x}x^{-1/2}dx$. For the convergent ones compute the value (the second is $\\pi/2$, the third $-1$, the fourth $\\sqrt{\\pi}$). Then numerically integrate $\\int_1^{L} dx/(x\\ln x)$ for $L = 10^2, 10^4, 10^8$ and show the growth is $\\ln\\ln L$.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain why integration by parts is "the product rule in reverse" and write the formula.',
              answerOutline:
                'Integrate $(uv)\' = u\'v + uv\'$ to get $uv = \\int u\'v + \\int uv\'$, i.e. $\\int u\\,dv = uv - \\int v\\,du$.',
            },
            {
              question: 'Sketch the proof that $\\int_{-\\infty}^\\infty e^{-x^2}dx = \\sqrt{\\pi}$.',
              answerOutline:
                'Square the integral to get a double integral over the plane, switch to polar coordinates ($dx\\,dy = r\\,dr\\,d\\theta$), integrate $\\int_0^{2\\pi}d\\theta\\int_0^\\infty re^{-r^2}dr = 2\\pi \\cdot \\tfrac12 = \\pi$, take the square root.',
            },
            {
              question: 'For which $p$ does $\\int_1^\\infty x^{-p}dx$ converge, and for which does $\\int_0^1 x^{-p}dx$?',
              answerOutline:
                'The first for $p > 1$ (value $1/(p-1)$); the second for $p < 1$ (value $1/(1-p)$). $p = 1$ diverges logarithmically in both.',
            },
            {
              question: 'What is $\\Gamma(5)$ and $\\Gamma(3/2)$?',
              answerOutline:
                '$\\Gamma(5) = 4! = 24$; $\\Gamma(3/2) = \\tfrac12\\Gamma(1/2) = \\sqrt{\\pi}/2$.',
            },
          ],
        },
        {
          slug: 'taylor-series',
          title: 'Sequences, series and Taylor expansions',
          summary:
            'Convergence of series, the Taylor expansion as the physicist\'s universal approximation tool, and the expansions you must know by heart.',
          estimatedMinutes: 150,
          objectives: [
            'Test series for convergence with the ratio, comparison and integral tests',
            'Derive Taylor and Maclaurin series from the definition and from known series',
            'Quote the expansions of $e^x$, $\\sin x$, $\\cos x$, $\\ln(1+x)$ and $(1+x)^\\alpha$ with their radii of convergence',
            'Use truncated expansions to approximate functions and estimate the truncation error with the Lagrange remainder',
            'Apply expansions to physical limits (non-relativistic limit of relativistic energy, small oscillations, multipole expansions)',
          ],
          concepts: [
            'Convergence and divergence of series',
            'Ratio test, comparison test, integral test',
            'Power series and radius of convergence',
            'Taylor polynomial and Taylor series',
            'Lagrange remainder / error bound',
            'Binomial series $(1+x)^\\alpha$',
            'Order notation $O(x^n)$',
            'Asymptotic vs convergent expansions',
          ],
          explanation: `A Taylor series rewrites a smooth function as a polynomial of infinite degree built from its derivatives at one point:

$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n.$$

The linearisation from the first lesson is the $n \\le 1$ truncation. Physicists use Taylor series constantly, almost never to infinite order: the point is to keep the first one or two non-trivial terms and understand the regime in which that is accurate. The relativistic energy $E = mc^2(1 - v^2/c^2)^{-1/2}$ becomes $mc^2 + \\tfrac12 mv^2 + \\tfrac38 m v^4/c^2 + \\dots$; the first correction tells you *when* Newtonian mechanics fails. A potential $V(x)$ near a minimum becomes $V(x_0) + \\tfrac12 V''(x_0)(x-x_0)^2$, which is why everything oscillates harmonically for small amplitudes.

You need five expansions by heart: $e^x = \\sum x^n/n!$ (all $x$); $\\sin x = x - x^3/3! + \\dots$ and $\\cos x = 1 - x^2/2! + \\dots$ (all $x$); $\\ln(1+x) = x - x^2/2 + x^3/3 - \\dots$ ($|x| < 1$); and the **binomial series** $(1+x)^\\alpha = 1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2}x^2 + \\dots$ ($|x| < 1$), which with $\\alpha = -1/2$ or $-1$ or $1/2$ covers most physical approximations. Learn to get new series by substitution and by differentiating or integrating known ones rather than by computing derivatives from scratch.

Convergence matters when you push an approximation. The **ratio test** gives the radius of convergence of a power series; outside it the series is meaningless even though the function may be fine (the series for $1/(1+x^2)$ fails at $|x| = 1$ because of poles at $\\pm i$, a fact that only complex analysis explains). The **Lagrange remainder** $R_n = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-a)^{n+1}$ bounds the truncation error. Finally, be aware that some physically important series (Stirling's formula, perturbation theory) are *asymptotic*: a few terms are excellent, but the series diverges if you keep going.

Read OpenStax Volume 2 chapters 5-6, then 18.01SC Unit 5. Use the Paul's Notes Taylor-series page for additional examples. Then do the numerical exercises: plotting successive Taylor polynomials against the function is the fastest way to internalise how radius of convergence behaves.`,
          resources: [
            {
              title: 'OpenStax Calculus Volume 2 — Chapters 5-6: Sequences, Series and Power Series',
              url: 'https://openstax.org/details/books/calculus-volume-2',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Convergence tests, Taylor and Maclaurin series, binomial series, with many exercises.',
              primary: true,
            },
            {
              title: 'MIT 18.01SC — Unit 5: Exploring the Infinite',
              url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions on infinite series, power series and Taylor series.',
            },
            {
              title: "Paul's Online Math Notes — Taylor Series",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcII/TaylorSeries.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
            },
            {
              title: '3Blue1Brown — Taylor series',
              url: 'https://www.3blue1brown.com/lessons/taylor-series',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'The geometric picture of matching derivatives at a point.',
            },
          ],
          exercises: [
            {
              slug: 'taylor-polynomial-plots',
              title: 'Plot successive Taylor polynomials',
              prompt:
                'Write a Python function that returns the degree-$N$ Taylor polynomial of $\\sin x$, $\\ln(1+x)$ and $1/(1+x^2)$ about 0 (use SymPy or hand-coded coefficients). Plot the function and the polynomials for $N = 1, 3, 5, 9, 15$ on $[-3, 3]$. Describe what happens at $|x| = 1$ for the last two functions and relate it to the radius of convergence found by the ratio test.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'physical-expansions',
              title: 'Physical limits by expansion',
              prompt:
                'Expand to second non-trivial order: (a) relativistic kinetic energy $mc^2\\left[(1-v^2/c^2)^{-1/2} - 1\\right]$ in $v/c$; (b) the pendulum period $T = 4\\sqrt{L/g}\\,K(\\sin^2(\\theta_0/2))$ using $K(m) \\approx \\frac{\\pi}{2}(1 + m/4 + \\dots)$ to show $T \\approx 2\\pi\\sqrt{L/g}\\,(1 + \\theta_0^2/16)$; (c) the potential of a dipole $\\frac{q}{|\\mathbf{r} - \\mathbf{d}/2|} - \\frac{q}{|\\mathbf{r} + \\mathbf{d}/2|}$ along the axis for $r \\gg d$, obtaining $qd/r^2$. For (a), compute the fractional error of $\\tfrac12 mv^2$ at $v = 0.1c$ and $v = 0.5c$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'remainder-bound',
              title: 'Bound a truncation error',
              prompt:
                'Using the Lagrange remainder, find the smallest $N$ such that the degree-$N$ Maclaurin polynomial of $e^x$ approximates $e^{x}$ to within $10^{-6}$ for all $|x| \\le 1$. Verify numerically by computing the maximum error over a fine grid. Repeat for $\\cos x$ on $|x| \\le \\pi$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For $e^x$ on $|x| \\le 1$, $|R_N| \\le e/(N+1)!$.',
            },
            {
              slug: 'stirling-asymptotic',
              title: 'An asymptotic series: Stirling',
              prompt:
                'Stirling\'s expansion is $\\ln n! \\approx n\\ln n - n + \\tfrac12\\ln(2\\pi n) + \\frac{1}{12n} - \\frac{1}{360 n^3} + \\dots$. Compute the error of the 2-, 3- and 4-term truncations for $n = 2, 5, 10, 100$ against `math.lgamma(n+1)`. Explain in two sentences why this series is useful even though it does not converge for fixed $n$.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the binomial series for $(1+x)^{-1/2}$ to second order and state where it converges.',
              answerOutline:
                '$1 - \\tfrac12 x + \\tfrac38 x^2 - \\dots$, convergent for $|x| < 1$.',
            },
            {
              question: 'Why does the Maclaurin series of $1/(1+x^2)$ only converge for $|x| < 1$ although the function is smooth everywhere on the real line?',
              answerOutline:
                'The radius of convergence is the distance to the nearest singularity in the complex plane; $1/(1+z^2)$ has poles at $z = \\pm i$, at distance 1.',
            },
            {
              question: 'What is the difference between a convergent and an asymptotic series?',
              answerOutline:
                'Convergent: fixed $x$, error goes to zero as terms are added. Asymptotic: fixed number of terms, error goes to zero as the expansion parameter goes to zero, but adding terms eventually makes it worse.',
            },
            {
              question: 'How does the Taylor expansion of a potential about a minimum explain simple harmonic motion?',
              answerOutline:
                '$V(x) \\approx V_0 + \\tfrac12 k (x-x_0)^2$ with $k = V\'\'(x_0) > 0$, the linear term vanishing at a minimum; the force is then $-k(x-x_0)$, Hooke\'s law.',
            },
          ],
        },
      ],
    },
    {
      slug: 'multivariable-calculus',
      title: 'Multivariable Calculus',
      description:
        'Functions of several variables: partial derivatives, the gradient, multiple integrals, the coordinate systems of physics and constrained optimisation.',
      lessons: [
        {
          slug: 'partial-derivatives-and-gradient',
          title: 'Partial derivatives, the gradient and the chain rule',
          summary:
            'Differentiating functions of several variables, the gradient as the direction of steepest ascent, total differentials and the multivariable chain rule.',
          estimatedMinutes: 150,
          objectives: [
            'Compute partial derivatives and interpret them as slopes in coordinate directions',
            'Write the total differential and use it for error propagation and thermodynamic identities',
            'Define the gradient, relate it to directional derivatives and level surfaces',
            'Apply the multivariable chain rule, including changes of variables',
            'Use the equality of mixed partials and know when it holds',
          ],
          concepts: [
            'Partial derivative $\\partial f/\\partial x$ with other variables held fixed',
            'Total differential $df = f_x dx + f_y dy$',
            'Gradient $\\nabla f$',
            'Directional derivative $\\nabla f \\cdot \\hat{u}$',
            'Level curves and surfaces; gradient is normal',
            'Multivariable chain rule',
            'Mixed partials: Clairaut/Schwarz theorem',
            'Thermodynamic notation $(\\partial U/\\partial V)_T$',
          ],
          explanation: `Almost every physical quantity depends on several variables: temperature on position and time, energy on position and momentum, pressure on volume and temperature. The **partial derivative** $\\partial f/\\partial x$ is the ordinary derivative with every other variable frozen. The subtlety is *which* variables are frozen; thermodynamics writes $(\\partial U/\\partial V)_T$ precisely because $(\\partial U/\\partial V)_S$ is a different number. Always know your independent variables.

The **total differential** $df = \\frac{\\partial f}{\\partial x}dx + \\frac{\\partial f}{\\partial y}dy$ is the multivariable linearisation: the change in $f$ for small changes in all inputs. It is the basis of error propagation in the lab ($\\delta f \\approx |f_x|\\delta x + |f_y|\\delta y$, or added in quadrature for independent errors) and of every Maxwell relation in thermodynamics.

Collect the partials into the **gradient** $\\nabla f = (f_x, f_y, f_z)$. Its two properties are the ones you will use forever: the rate of change of $f$ in direction $\\hat{u}$ is $\\nabla f \\cdot \\hat{u}$, so $\\nabla f$ points in the direction of steepest increase with magnitude equal to that maximum rate; and $\\nabla f$ is perpendicular to the level surfaces $f = \\text{const}$. A conservative force is $\\mathbf{F} = -\\nabla V$: it points downhill in potential, perpendicular to equipotentials.

The **chain rule** generalises to $\\frac{df}{dt} = \\frac{\\partial f}{\\partial x}\\frac{dx}{dt} + \\frac{\\partial f}{\\partial y}\\frac{dy}{dt}$ for $f$ along a path, and to the Jacobian-matrix form for changes of variables. Mixed partials commute, $f_{xy} = f_{yx}$, whenever they are continuous; this innocent fact is what makes a vector field with zero curl locally a gradient.

A common error is to treat partial derivatives as fractions that cancel; $\\left(\\frac{\\partial x}{\\partial y}\\right)_z \\left(\\frac{\\partial y}{\\partial z}\\right)_x \\left(\\frac{\\partial z}{\\partial x}\\right)_y = -1$, not $+1$. Derive this once (it is an exercise below) and you will never trust the naive cancellation again.

Work MIT 18.02SC Part A of Unit 2 and OpenStax Volume 3 chapter 4. Then build the numerical intuition: plot a scalar field with contour lines and overlay the gradient as arrows with \`matplotlib.quiver\`; they must cross the contours at right angles.`,
          resources: [
            {
              title: 'MIT 18.02SC Multivariable Calculus — Unit 2: Partial Derivatives',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Part A (functions of two variables, tangent planes, chain rule, gradient).',
              primary: true,
            },
            {
              title: 'OpenStax Calculus Volume 3 — Chapter 4: Differentiation of Functions of Several Variables',
              url: 'https://openstax.org/details/books/calculus-volume-3',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: "Paul's Online Math Notes — Calculus III",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcIII/CalcIII.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Partial derivatives chapter: many worked examples of the chain rule and directional derivatives.',
            },
            {
              title: 'Khan Academy — Multivariable calculus',
              url: 'https://www.khanacademy.org/math/multivariable-calculus',
              type: 'video',
              cost: 'free',
              provider: 'Khan Academy',
              note: 'The gradient and directional derivative videos (by Grant Sanderson) give the geometric picture.',
            },
          ],
          exercises: [
            {
              slug: 'gradient-contour-plot',
              title: 'Gradient perpendicular to contours',
              prompt:
                'For $f(x,y) = x^2 + 3y^2 - xy$ compute $\\nabla f$ by hand. In Python plot the contours of $f$ on $[-2,2]^2$ and overlay $\\nabla f$ as arrows on a coarse grid. Confirm numerically at ten random points that $\\nabla f$ is perpendicular to the contour tangent (dot product below $10^{-6}$ using a finite-difference tangent). Then find the direction of steepest descent at $(1,1)$ and the rate of change in the direction $(1,1)/\\sqrt2$.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'triple-product-rule',
              title: 'The cyclic (triple product) rule',
              prompt:
                'For a relation $F(x,y,z) = 0$ show that $\\left(\\frac{\\partial x}{\\partial y}\\right)_z\\left(\\frac{\\partial y}{\\partial z}\\right)_x\\left(\\frac{\\partial z}{\\partial x}\\right)_y = -1$ by writing $dF = 0$ and setting one differential to zero at a time. Verify on the ideal gas $PV = nRT$: compute each factor explicitly and multiply.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'error-propagation',
              title: 'Error propagation with the total differential',
              prompt:
                'The period of a pendulum gives $g = 4\\pi^2 L/T^2$. With $L = 1.000 \\pm 0.002$ m and $T = 2.007 \\pm 0.004$ s, use the total differential to find $\\delta g$ (a) adding errors linearly and (b) in quadrature. Then Monte-Carlo the answer: sample $L$ and $T$ from normal distributions with those standard deviations $10^5$ times and compare the standard deviation of $g$ with (b).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the gradient of a scalar field tell you geometrically?',
              answerOutline:
                'Direction of steepest increase; magnitude is that maximal rate; it is normal to level surfaces. Directional derivative is $\\nabla f\\cdot\\hat u$.',
            },
            {
              question: 'Why does thermodynamics write subscripts such as $(\\partial U/\\partial T)_V$?',
              answerOutline:
                'The value of a partial derivative depends on which other variables are held fixed; $U$ can be considered a function of $(T,V)$ or $(T,P)$ and the derivatives differ.',
            },
            {
              question: 'State the multivariable chain rule for $f(x(t), y(t))$.',
              answerOutline:
                '$df/dt = f_x\\,\\dot{x} + f_y\\,\\dot{y}$; more generally $df/dt = \\nabla f \\cdot \\mathbf{v}$.',
            },
            {
              question: 'Under what condition are mixed partial derivatives equal?',
              answerOutline:
                'When the second partials are continuous (Schwarz/Clairaut theorem); almost always true for physical functions but fails for pathological examples.',
            },
          ],
        },
        {
          slug: 'multiple-integrals',
          title: 'Double and triple integrals',
          summary:
            'Integrating over regions of the plane and space: setting up limits, iterated integrals, and computing masses, centres of mass and moments of inertia.',
          estimatedMinutes: 150,
          objectives: [
            'Set up double and triple integrals over regions described by inequalities, in either order of integration',
            'Swap the order of integration and recognise when it simplifies a problem',
            'Compute areas, volumes, masses, centres of mass and moments of inertia',
            'Evaluate integrals in polar coordinates with the factor $r\\,dr\\,d\\theta$',
            'Estimate a multiple integral numerically and understand why the cost grows with dimension',
          ],
          concepts: [
            'Double integral as a volume / total over a region',
            'Iterated integrals and Fubini\'s theorem',
            'Limits of integration from region inequalities',
            'Order of integration',
            'Polar coordinates: $dA = r\\,dr\\,d\\theta$',
            'Mass, centre of mass, moment of inertia',
            'Average of a function over a region',
            'Numerical integration on grids and the curse of dimensionality',
          ],
          explanation: `A double integral $\\iint_R f\\,dA$ adds up $f$ times tiny area elements over a region $R$. If $f = 1$ it is the area; if $f$ is a surface density it is the mass; if $f$ is a height it is the volume under the surface. Physically the integrand is almost always a *density* (mass, charge, probability, energy) and the integral a *total*.

The entire difficulty is in the **limits of integration**. Write the region as inequalities, pick an order (say $dy$ then $dx$), and ask: for a fixed $x$, where does $y$ run? That gives the inner limits as functions of $x$; the outer limits are the overall range of $x$. Sketch the region every time. **Fubini's theorem** says that for well-behaved integrands the order does not matter, and choosing the other order is often the key to an integral that looks impossible, e.g. $\\int_0^1 \\int_x^1 e^{-y^2}dy\\,dx$ is hopeless as written and trivial as $\\int_0^1 \\int_0^y e^{-y^2}dx\\,dy = \\tfrac12(1 - e^{-1})$.

In **polar coordinates** the area element is $r\\,dr\\,d\\theta$, not $dr\\,d\\theta$; the extra $r$ is the Jacobian, which the next lesson treats in general. The Gaussian integral is the classic payoff. Triple integrals work the same way with $dV$, and the standard applications are

$$M = \\int \\rho\\,dV,\\qquad \\mathbf{r}_{cm} = \\frac{1}{M}\\int \\mathbf{r}\\rho\\,dV,\\qquad I = \\int r_\\perp^2 \\rho\\,dV,$$

where $r_\\perp$ is the distance from the rotation axis. Compute $I$ for a solid sphere ($\\tfrac25 MR^2$), a rod, a disc and a cylinder until you can do them without looking anything up; they appear throughout mechanics.

Numerically, a double integral on a grid with $n$ points per axis costs $n^2$ evaluations, a triple $n^3$, and a 10-dimensional integral is impossible this way; this **curse of dimensionality** is the reason Monte Carlo integration exists (see computational-physics).

Read OpenStax Volume 3 chapter 5 and do the MIT 18.02SC Unit 3 sessions on double integrals and polar coordinates. Then compute the moment-of-inertia table yourself, by hand and with \`scipy.integrate.dblquad\`/\`tplquad\`.`,
          resources: [
            {
              title: 'MIT 18.02SC — Unit 3: Double Integrals and Line Integrals in the Plane',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Part A: double integrals, polar coordinates, changing the order of integration. Unit 4 Part A covers triple integrals.',
              primary: true,
            },
            {
              title: 'OpenStax Calculus Volume 3 — Chapter 5: Multiple Integration',
              url: 'https://openstax.org/details/books/calculus-volume-3',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'SciPy — Integration tutorial (dblquad, tplquad, nquad)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/integrate.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'For the numerical checks. Note how the limit functions mirror the hand-written limits.',
            },
          ],
          exercises: [
            {
              slug: 'order-of-integration',
              title: 'Swap the order of integration',
              prompt:
                'Evaluate $\\int_0^1\\int_x^1 \\sin(y^2)\\,dy\\,dx$ and $\\int_0^2 \\int_{y/2}^{1} e^{x^2}\\,dx\\,dy$ by swapping the order. Sketch both regions. Expected: $\\tfrac12(1-\\cos 1) \\approx 0.2298$ and $e - 1$. Check with `dblquad` in the original order (it will be slow but it works).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'moment-of-inertia-table',
              title: 'Build the moment-of-inertia table',
              prompt:
                'Derive by triple integration the moments of inertia about a symmetry axis of: a thin rod about its centre ($ML^2/12$), a uniform disc ($MR^2/2$), a solid cylinder ($MR^2/2$), a solid sphere ($2MR^2/5$) and a hollow thin sphere ($2MR^2/3$). Use the coordinate system that makes each easiest. Verify every result numerically with `tplquad` for $M = R = L = 1$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'centre-of-mass-cone',
              title: 'Centre of mass of a cone and a hemisphere',
              prompt:
                'Find the centre of mass of a uniform solid cone of height $h$ (answer: $h/4$ from the base) and a uniform solid hemisphere of radius $R$ (answer: $3R/8$ from the flat face). Then repeat for a cone whose density grows linearly with height from the base, $\\rho = \\rho_0 z/h$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'grid-integration-cost',
              title: 'The cost of grid integration',
              prompt:
                'Integrate $f(\\mathbf{x}) = \\exp(-|\\mathbf{x}|^2)$ over the unit cube $[0,1]^d$ with a midpoint rule on an $n^d$ grid for $d = 1, 2, 3, 4$ and $n = 10, 20, 40$. Time each run and compare the error with the exact value $\\left(\\tfrac{\\sqrt\\pi}{2}\\operatorname{erf}(1)\\right)^d$. Plot time against $d$ on a log axis and extrapolate to $d = 10$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Describe the procedure for finding the limits of a double integral over the region between $y = x^2$ and $y = x$.',
              answerOutline:
                'Sketch; curves cross at $x = 0, 1$; for fixed $x$ in $[0,1]$, $y$ runs from $x^2$ to $x$: $\\int_0^1\\int_{x^2}^{x} f\\,dy\\,dx$. Or for fixed $y$, $x$ from $y$ to $\\sqrt y$.',
            },
            {
              question: 'Why is the polar area element $r\\,dr\\,d\\theta$ and not $dr\\,d\\theta$?',
              answerOutline:
                'A patch spanned by $dr$ and $d\\theta$ has arc length $r\\,d\\theta$, so its area is $r\\,dr\\,d\\theta$; equivalently the Jacobian of $(x,y) \\to (r,\\theta)$ is $r$.',
            },
            {
              question: 'What is the moment of inertia of a solid sphere about a diameter and what integral gives it?',
              answerOutline:
                '$I = \\int r_\\perp^2\\rho\\,dV$ with $r_\\perp = r\\sin\\theta$ in spherical coordinates, giving $\\tfrac25 MR^2$.',
            },
          ],
        },
        {
          slug: 'coordinate-systems-and-jacobians',
          title: 'Change of variables: Jacobians, cylindrical and spherical coordinates',
          summary:
            'How volume elements transform under a change of variables, and the cylindrical and spherical coordinate systems physics uses by default.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the Jacobian determinant and explain why it appears in a change of variables',
            'Write the volume elements $r\\,dr\\,d\\theta\\,dz$ and $r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\phi$ and derive them geometrically',
            'Set up and evaluate integrals in cylindrical and spherical coordinates',
            'Convert between Cartesian, cylindrical and spherical descriptions of points, regions and vector components',
            'Recognise which coordinate system a problem\'s symmetry calls for',
          ],
          concepts: [
            'Jacobian matrix and determinant',
            'Change-of-variables formula $dx\\,dy = |J|\\,du\\,dv$',
            'Cylindrical coordinates $(r, \\phi, z)$',
            'Spherical coordinates $(r, \\theta, \\phi)$, physics convention',
            'Volume element $r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\phi$',
            'Solid angle $d\\Omega = \\sin\\theta\\,d\\theta\\,d\\phi$',
            'Unit vectors $\\hat r, \\hat\\theta, \\hat\\phi$ depend on position',
            'Choosing coordinates from symmetry',
          ],
          explanation: `When you substitute $x = g(u)$ in a one-dimensional integral you must include $dx = g'(u)\\,du$. In several dimensions the same thing happens with the **Jacobian determinant**: if $(x,y) = (x(u,v), y(u,v))$ then

$$dx\\,dy = \\left|\\det\\begin{pmatrix} \\partial x/\\partial u & \\partial x/\\partial v \\\\ \\partial y/\\partial u & \\partial y/\\partial v\\end{pmatrix}\\right| du\\,dv .$$

The determinant is the area of the small parallelogram into which the unit $(du, dv)$ square is mapped, which is exactly why it is the right factor. For polar coordinates it evaluates to $r$, confirming the previous lesson.

Physics uses two curvilinear systems constantly. **Cylindrical** coordinates $(r, \\phi, z)$ have $dV = r\\,dr\\,d\\phi\\,dz$ and suit anything with an axis: wires, solenoids, pipes, rotating bodies. **Spherical** coordinates $(r, \\theta, \\phi)$ in the physics convention ($\\theta$ polar angle from the $z$-axis, $\\phi$ azimuth) have

$$dV = r^2 \\sin\\theta\\,dr\\,d\\theta\\,d\\phi,$$

which you should be able to derive from the picture: the three edge lengths of the little box are $dr$, $r\\,d\\theta$ and $r\\sin\\theta\\,d\\phi$. The angular part $d\\Omega = \\sin\\theta\\,d\\theta\\,d\\phi$ is the **solid angle**, integrating to $4\\pi$; it is central to radiation, scattering cross-sections and the hydrogen atom. Beware that mathematics texts (and some software, including SciPy's spherical harmonics) swap the names of $\\theta$ and $\\phi$.

The crucial difference from Cartesian coordinates is that the **unit vectors** $\\hat r, \\hat\\theta, \\hat\\phi$ change direction from point to point. You cannot pull them out of integrals or derivatives. This is the root of every "extra term" in curvilinear div, grad and curl (vector-calculus module) and of the centripetal and Coriolis terms in rotating frames.

Choosing coordinates is a skill: match them to the symmetry of the boundary or the source. A sphere's gravitational field is a spherical problem; a long wire is cylindrical; a rectangular box is Cartesian. Picking wrong does not make the problem impossible, just miserable.

Read OpenStax Volume 3 sections 5.4-5.7 and 18.02SC Unit 4 Part A. The Paul's Notes change-of-variables page has worked Jacobian examples. Then do the derivations below; the spherical volume element is one you should be able to reconstruct on demand.`,
          resources: [
            {
              title: 'OpenStax Calculus Volume 3 — Sections 5.4-5.7: Triple integrals, cylindrical and spherical coordinates, change of variables',
              url: 'https://openstax.org/details/books/calculus-volume-3',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT 18.02SC — Unit 4 Part A: Triple Integrals and Surface Integrals in 3-space',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions on cylindrical and spherical coordinates and on gravitational attraction.',
            },
            {
              title: "Paul's Online Math Notes — Change of Variables",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcIII/ChangeOfVariables.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Jacobians with worked examples for non-standard transformations.',
            },
          ],
          exercises: [
            {
              slug: 'derive-spherical-volume-element',
              title: 'Derive the spherical volume element two ways',
              prompt:
                'Derive $dV = r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\phi$ (a) geometrically from the edge lengths of the coordinate box and (b) by computing the $3\\times3$ Jacobian determinant of $(x,y,z) = (r\\sin\\theta\\cos\\phi, r\\sin\\theta\\sin\\phi, r\\cos\\theta)$. Verify (b) symbolically with SymPy. Then integrate to get the volume of a sphere and the solid angle of a cone of half-angle $\\alpha$ (answer $2\\pi(1-\\cos\\alpha)$).',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'spherical-shell-gravity',
              title: 'Gravitational potential of a spherical shell',
              prompt:
                'Compute the gravitational potential at distance $d$ from the centre of a thin uniform spherical shell of mass $M$ and radius $R$ by integrating $-G\\,dm/|\\mathbf{r} - \\mathbf{d}|$ over the shell in spherical coordinates (use the law of cosines for the distance). Show that the result is $-GM/d$ outside and $-GM/R$ inside: Newton\'s shell theorem. Check both cases numerically for $R = 1$, $d = 0.5$ and $d = 2$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $u = \\cos\\theta$ the integral over the sphere reduces to $\\int_{-1}^{1} du/\\sqrt{d^2 + R^2 - 2dRu}$.',
            },
            {
              slug: 'elliptical-jacobian',
              title: 'A non-standard change of variables',
              prompt:
                'Compute the area of the ellipse $x^2/a^2 + y^2/b^2 \\le 1$ using $x = ar\\cos\\theta$, $y = br\\sin\\theta$ and the Jacobian. Then evaluate $\\iint_R (x+y)^2 e^{x-y}\\,dA$ over the square with vertices $(1,0), (0,1), (-1,0), (0,-1)$ using $u = x+y$, $v = x-y$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a Jacobian determinant appear when changing variables in a multiple integral?',
              answerOutline:
                'The map sends a small coordinate box to a parallelepiped whose volume is $|\\det J|$ times the box volume; integrals must count physical volume, not coordinate volume.',
            },
            {
              question: 'What are the three edge lengths of the coordinate box in spherical coordinates, and the resulting $dV$?',
              answerOutline:
                '$dr$, $r\\,d\\theta$, $r\\sin\\theta\\,d\\phi$; $dV = r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\phi$.',
            },
            {
              question: 'What is solid angle and what is its total around a point?',
              answerOutline:
                '$d\\Omega = \\sin\\theta\\,d\\theta\\,d\\phi$ = area on the unit sphere; total $4\\pi$ steradians.',
            },
            {
              question: 'Why can you not treat $\\hat r$ as a constant when differentiating a vector written in spherical components?',
              answerOutline:
                'Its direction depends on position ($\\partial\\hat r/\\partial\\theta = \\hat\\theta$ etc.), so derivatives of $A_r\\hat r$ produce extra terms.',
            },
          ],
        },
        {
          slug: 'lagrange-multipliers-and-optimization',
          title: 'Optimisation in several variables and Lagrange multipliers',
          summary:
            'Finding and classifying critical points of multivariable functions, and optimising under constraints with Lagrange multipliers.',
          estimatedMinutes: 120,
          objectives: [
            'Find critical points of $f(x,y)$ and classify them with the Hessian (second-derivative test)',
            'Explain geometrically why $\\nabla f = \\lambda\\nabla g$ at a constrained extremum',
            'Solve constrained problems with one or more Lagrange multipliers',
            'Interpret the multiplier as a sensitivity (shadow price, temperature, chemical potential)',
            'Set up least-squares fitting as a multivariable minimisation',
          ],
          concepts: [
            'Critical points in several variables',
            'Hessian matrix and the second-derivative test',
            'Saddle points',
            'Constraint surface $g(x,y,z) = c$',
            'Lagrange multiplier condition $\\nabla f = \\lambda \\nabla g$',
            'Multiplier as $\\partial f_{max}/\\partial c$',
            'Least squares as minimisation',
            'Maximum entropy and the Boltzmann distribution (preview)',
          ],
          explanation: `A function of several variables has an extremum only where all its partial derivatives vanish, $\\nabla f = 0$. To classify the critical point, expand to second order: $f \\approx f_0 + \\tfrac12 \\mathbf{h}^T H \\mathbf{h}$ where $H$ is the **Hessian** matrix of second partials. If $H$ is positive definite (all eigenvalues positive; in 2D, $f_{xx} > 0$ and $f_{xx}f_{yy} - f_{xy}^2 > 0$) you have a minimum; negative definite, a maximum; mixed signs, a **saddle**. Saddles are common in physics (unstable equilibria, transition states) and are the generic case in high dimensions.

Most physical optimisation is **constrained**: maximise entropy subject to fixed energy, minimise energy subject to normalisation of a wavefunction, find the shortest path on a surface. The method of **Lagrange multipliers** says that at an extremum of $f$ on the surface $g = c$, the gradient of $f$ has no component along the surface, so it must be parallel to the surface normal:

$$\\nabla f = \\lambda \\nabla g .$$

Together with $g = c$ this is $n + 1$ equations for the $n$ unknowns plus $\\lambda$. With several constraints, $\\nabla f = \\sum_i \\lambda_i \\nabla g_i$. The picture is that the level curves of $f$ are tangent to the constraint curve where the extremum sits; draw it once and the condition becomes obvious.

The multiplier is not merely a bookkeeping device: $\\lambda = \\partial f^*/\\partial c$, the rate at which the optimum changes when the constraint is relaxed. In statistical mechanics, maximising entropy with the constraint of fixed mean energy produces the Boltzmann distribution $p_i \\propto e^{-\\beta E_i}$ and the multiplier $\\beta$ turns out to be $1/k_BT$; a second constraint on particle number produces the chemical potential. Economists call the same object a shadow price.

Least-squares fitting is the other ubiquitous optimisation: minimise $S(\\mathbf{a}) = \\sum_i (y_i - f(x_i;\\mathbf{a}))^2$ over the parameters. For a linear model the condition $\\nabla S = 0$ gives the **normal equations**, a linear system; for nonlinear models you iterate (see computational-physics).

Read OpenStax Volume 3 sections 4.7-4.8 and the 18.02SC sessions on the second-derivative test and Lagrange multipliers. The Paul's Notes page has many worked constrained problems. Then do the maximum-entropy exercise: it is the first time you will see how a piece of pure mathematics produces a law of physics.`,
          resources: [
            {
              title: 'MIT 18.02SC — Unit 2 Part B: Chain rule, gradient and directional derivatives; Lagrange multipliers',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions on max-min problems, the second derivative test and Lagrange multipliers.',
              primary: true,
            },
            {
              title: 'OpenStax Calculus Volume 3 — Sections 4.7-4.8: Maxima/Minima and Lagrange Multipliers',
              url: 'https://openstax.org/details/books/calculus-volume-3',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: "Paul's Online Math Notes — Lagrange Multipliers",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcIII/LagrangeMultipliers.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
            },
            {
              title: 'SciPy — Optimization tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/optimize.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Use `minimize` with constraints to check your hand solutions.',
            },
          ],
          exercises: [
            {
              slug: 'classify-critical-points',
              title: 'Find and classify critical points',
              prompt:
                'For $f(x,y) = x^3 - 3x + y^2 - 2y$ and $f(x,y) = x^4 + y^4 - 4xy$, find all critical points and classify each with the Hessian. Plot each function as a contour map and mark the points; saddles should sit where contours cross. Verify the Hessian eigenvalues with `numpy.linalg.eigvalsh`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'box-and-sphere-multipliers',
              title: 'Classic constrained problems',
              prompt:
                'Using Lagrange multipliers: (a) find the box of maximum volume inscribed in the sphere $x^2+y^2+z^2 = R^2$ (a cube of side $2R/\\sqrt3$); (b) find the point on the plane $x + 2y + 3z = 6$ closest to the origin and show $\\lambda$ is related to the distance; (c) find the extrema of $x^2 + y^2$ on the ellipse $x^2/4 + y^2 = 1$ and interpret them. Verify (a) with `scipy.optimize.minimize` using an equality constraint.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'maximum-entropy-boltzmann',
              title: 'Maximum entropy gives the Boltzmann distribution',
              prompt:
                'Maximise $S = -\\sum_i p_i \\ln p_i$ subject to $\\sum_i p_i = 1$ and $\\sum_i p_i E_i = U$ using two multipliers $\\alpha, \\beta$. Show $p_i = e^{-\\beta E_i}/Z$ with $Z = \\sum_i e^{-\\beta E_i}$. For energies $E_i = i$ ($i = 0..9$) and $U = 2$, solve numerically for $\\beta$ (expected $\\beta \\approx 0.47$) and plot $p_i$. Explain why $\\beta$ must be positive here.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'normal-equations',
              title: 'Derive the normal equations',
              prompt:
                'For the straight-line model $y = a + bx$ and data $(x_i, y_i)$, write $S(a,b) = \\sum (y_i - a - bx_i)^2$, set $\\partial S/\\partial a = \\partial S/\\partial b = 0$ and solve for $a, b$ in closed form. Generate 50 noisy points from $y = 2 + 0.5x$ and confirm your formulas agree with `numpy.polyfit(x, y, 1)` to machine precision.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain geometrically why $\\nabla f$ must be parallel to $\\nabla g$ at a constrained extremum.',
              answerOutline:
                'Moving along the constraint surface must not change $f$ to first order, so $\\nabla f$ has no tangential component; it is therefore along the normal, which is $\\nabla g$.',
            },
            {
              question: 'What does the Hessian tell you about a critical point in two dimensions?',
              answerOutline:
                'Positive definite (det > 0, $f_{xx}$ > 0): minimum; negative definite: maximum; det < 0: saddle; det = 0: test inconclusive.',
            },
            {
              question: 'What physical meaning does the Lagrange multiplier acquire in the maximum-entropy derivation of the Boltzmann distribution?',
              answerOutline:
                '$\\beta = 1/k_BT$; the multiplier for energy is inverse temperature, and the one for particle number is related to the chemical potential.',
            },
            {
              question: 'How is least-squares fitting an optimisation problem and what are the normal equations?',
              answerOutline:
                'Minimise the sum of squared residuals over parameters; for linear models $\\nabla S = 0$ gives the linear system $A^TA\\,\\mathbf{a} = A^T\\mathbf{y}$.',
            },
          ],
        },
      ],
      project: {
        slug: 'calculus-toolkit-notebook',
        title: 'Module project: a calculus toolkit notebook',
        description:
          'Build a Jupyter notebook that implements and tests, with SymPy and SciPy, every tool from the first two modules: symbolic differentiation and Taylor expansion of user-supplied expressions, numerical integration in Cartesian, polar, cylindrical and spherical coordinates with the correct Jacobians, and a Lagrange-multiplier solver. Each function must be checked against at least one closed-form result from these lessons (Gaussian moments, moments of inertia, shell theorem, box in sphere).',
        deliverables: [
          'Notebook with functions, docstrings and a test cell per function that compares against closed-form results',
          'A one-page summary of which approximations (Taylor order, grid size) were needed for $10^{-6}$ accuracy',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'linear-algebra',
      title: 'Linear Algebra',
      description:
        'Vectors, matrices and linear systems, vector spaces and inner products, and the eigenvalue problem that underlies normal modes, quantum mechanics, stability analysis and data science.',
      lessons: [
        {
          slug: 'vectors-matrices-and-linear-systems',
          title: 'Vectors, matrices and solving linear systems',
          summary:
            'Matrices as linear maps, matrix multiplication, Gaussian elimination, determinants and inverses, and what it means for a system to have zero, one or many solutions.',
          estimatedMinutes: 150,
          objectives: [
            'Interpret a matrix as a linear transformation and a matrix product as composition',
            'Solve $A\\mathbf{x} = \\mathbf{b}$ by Gaussian elimination and reduced row echelon form',
            'Compute determinants and interpret them as volume scale factors; relate $\\det A = 0$ to singularity',
            'Characterise the solution set of a linear system via rank and the nullspace',
            'Use NumPy to solve systems and know why `solve` is preferred to computing an inverse',
          ],
          concepts: [
            'Vector, dot product, norm',
            'Matrix as linear map; column picture of $A\\mathbf{x}$',
            'Matrix multiplication as composition',
            'Gaussian elimination, pivots, row echelon form',
            'Determinant as signed volume',
            'Inverse matrix and when it exists',
            'Rank, nullspace, consistency',
            'LU factorisation (preview)',
          ],
          explanation: `A matrix is a **linear map**: $A\\mathbf{x}$ is a vector-valued function of $\\mathbf{x}$ satisfying $A(\\alpha\\mathbf{u} + \\beta\\mathbf{v}) = \\alpha A\\mathbf{u} + \\beta A\\mathbf{v}$. The most useful way to read $A\\mathbf{x}$ is the **column picture**: it is a linear combination of the columns of $A$ with coefficients $x_i$. Then $A\\mathbf{x} = \\mathbf{b}$ asks "which combination of the columns gives $\\mathbf{b}$?", and matrix multiplication $AB$ is simply "apply $B$, then $A$", which is why it is associative but not commutative.

**Gaussian elimination** solves linear systems by subtracting multiples of rows to reach upper-triangular form, then back-substituting. The numbers you divide by are the **pivots**; the number of nonzero pivots is the **rank**. A square system has a unique solution exactly when all $n$ pivots are nonzero, equivalently when $\\det A \\neq 0$, equivalently when $A^{-1}$ exists. If a pivot is missing, the system either has no solution (inconsistent) or infinitely many (a whole affine subspace, $\\mathbf{x}_p + $ nullspace).

The **determinant** has a geometric meaning you should hold onto: $|\\det A|$ is the factor by which $A$ scales volumes, and the sign records whether orientation flips. That is why the Jacobian determinant appears in changes of variables, why $\\det A = 0$ means the map squashes space onto a lower-dimensional subspace (and so cannot be inverted), and why $\\det(AB) = \\det A\\det B$. Cofactor expansion is fine for $3\\times3$; for anything larger use elimination, which gives $\\det A$ as the product of the pivots.

Two practical warnings. Never compute $A^{-1}$ to solve a system; \`numpy.linalg.solve\` (LU factorisation) is faster and more accurate. And a determinant that is "small" tells you nothing about how close to singular a matrix is; the **condition number** does (see computational-physics).

Watch 3Blue1Brown's *Essence of Linear Algebra* chapters 1-7 first for the geometry, then work MIT 18.06SC Unit 1 (Strang's lectures 1-9) with the problem sets, using the OpenStax-style drill in the LibreTexts linear algebra bookshelf as needed. Strang's "four fundamental subspaces" picture is the goal of the unit.`,
          resources: [
            {
              title: 'MIT 18.06SC Linear Algebra (Gilbert Strang) — Unit 1: Ax = b and the Four Subspaces',
              url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures 1-10 with recitations and problem sets; the recitation videos are excellent for worked problems.',
              primary: true,
            },
            {
              title: '3Blue1Brown — Essence of Linear Algebra',
              url: 'https://www.3blue1brown.com/topics/linear-algebra',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Chapters 1-7: vectors, linear combinations, transformations, matrix multiplication, determinants, inverses, rank.',
            },
            {
              title: 'LibreTexts Mathematics — Linear Algebra bookshelf',
              url: 'https://math.libretexts.org/Bookshelves/Linear_Algebra',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Several free textbooks; Kuttler\'s "A First Course in Linear Algebra" has many drill exercises on systems and determinants.',
            },
            {
              title: 'Introduction to Linear Algebra (Strang) — book site',
              url: 'https://math.mit.edu/~gs/linearalgebra/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wellesley-Cambridge Press',
              note: 'The companion text to 18.06; not required because the OCW lectures and notes cover the same ground.',
            },
          ],
          exercises: [
            {
              slug: 'elimination-by-hand',
              title: 'Elimination by hand and by machine',
              prompt:
                'Solve by Gaussian elimination, showing pivots: (a) $x + 2y + z = 2$, $3x + 8y + z = 12$, $4y + z = 2$; (b) the same system with the last equation replaced by $4y + z = 3$ after changing the $(3,3)$ entry so that elimination produces a zero pivot. For (b) decide whether the system is inconsistent or has infinitely many solutions and describe the solution set. Check (a) with `numpy.linalg.solve` and the rank of (b) with `numpy.linalg.matrix_rank`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'determinant-as-volume',
              title: 'Determinant as a volume scale factor',
              prompt:
                'Take the unit cube spanned by $\\mathbf{e}_1,\\mathbf{e}_2,\\mathbf{e}_3$ and apply $A = \\begin{pmatrix}2&1&0\\\\0&1&1\\\\1&0&3\\end{pmatrix}$. Compute the volume of the resulting parallelepiped with the scalar triple product and compare with $\\det A$. Then generate $10^5$ random points in the cube, map them with $A$, and verify that the Monte Carlo estimate of the image volume (bounding box times hit fraction) agrees with $|\\det A|$ to about 1%.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'circuit-linear-system',
              title: 'A resistor network as a linear system',
              prompt:
                'Write Kirchhoff\'s node equations for a 3-node resistor network of your own design with one voltage source, obtain a $3\\times3$ system $G\\mathbf{v} = \\mathbf{i}$, and solve it. Then build the $N\\times N$ conductance matrix for an $N$-node ladder network programmatically for $N = 10, 100, 1000$, solve with `numpy.linalg.solve`, and time it. Does the time scale as $N^3$?',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain the "column picture" of $A\\mathbf{x} = \\mathbf{b}$.',
              answerOutline:
                '$A\\mathbf{x}$ is $x_1(\\text{col}_1) + x_2(\\text{col}_2) + \\dots$; solving asks for the combination of columns equal to $\\mathbf{b}$, which exists iff $\\mathbf{b}$ is in the column space.',
            },
            {
              question: 'What are the three possible outcomes for a linear system and how do pivots decide between them?',
              answerOutline:
                'Unique solution (full rank, $n$ pivots); no solution (a zero row equals a nonzero constant); infinitely many (free variables, nullspace nontrivial, consistent).',
            },
            {
              question: 'Give two geometric facts about the determinant.',
              answerOutline:
                '$|\\det A|$ is the volume scale factor of the map; sign gives orientation; $\\det A = 0$ iff the map collapses dimension iff $A$ is singular.',
            },
            {
              question: 'Why should you not solve $A\\mathbf{x}=\\mathbf{b}$ by computing $A^{-1}$ numerically?',
              answerOutline:
                'It costs about three times more and loses accuracy; LU-based solve is faster and better conditioned.',
            },
          ],
        },
        {
          slug: 'vector-spaces-bases-and-inner-products',
          title: 'Vector spaces, bases, orthogonality and projections',
          summary:
            'Linear independence, bases and dimension; inner products, orthonormal bases and Gram-Schmidt; projections and least squares. The language of quantum states and Fourier series.',
          estimatedMinutes: 150,
          objectives: [
            'Decide whether vectors are linearly independent and find a basis for a subspace',
            'Describe the four fundamental subspaces of a matrix and the rank-nullity theorem',
            'Define an inner product, orthogonality and the norm; construct orthonormal bases with Gram-Schmidt',
            'Project a vector onto a subspace and derive least squares as a projection',
            'Recognise functions as vectors: inner products of functions and orthogonal function expansions',
          ],
          concepts: [
            'Vector space and subspace',
            'Linear independence, span, basis, dimension',
            'Column space, nullspace, row space, left nullspace',
            'Rank-nullity theorem',
            'Inner product, orthogonality, orthonormal basis',
            'Gram-Schmidt orthogonalisation',
            'Projection matrix $P = A(A^TA)^{-1}A^T$',
            'Function spaces and $\\langle f, g\\rangle = \\int f^* g\\,dx$',
          ],
          explanation: `A **vector space** is any set where you can add elements and scale them by numbers. Arrows in $\\mathbb{R}^3$ qualify, but so do polynomials, solutions of a linear differential equation, $2\\times2$ matrices and square-integrable functions on an interval. This abstraction is what lets the same theorems serve classical mechanics, quantum mechanics and signal processing.

A set of vectors is **linearly independent** if no nontrivial combination gives zero; a **basis** is an independent set that spans the space; every basis of a space has the same size, its **dimension**. For a matrix $A$ the key subspaces are the column space (all $A\\mathbf{x}$) and the nullspace (all $\\mathbf{x}$ with $A\\mathbf{x} = 0$), and the **rank-nullity theorem** says their dimensions add to the number of columns. Strang's picture of the four fundamental subspaces, with the row space orthogonal to the nullspace, is worth memorising.

An **inner product** $\\langle \\mathbf{u}, \\mathbf{v}\\rangle$ adds geometry: lengths, angles, orthogonality. In an **orthonormal basis** $\\{\\mathbf{e}_i\\}$ the coefficients of any vector are just inner products, $\\mathbf{v} = \\sum_i \\langle \\mathbf{e}_i, \\mathbf{v}\\rangle \\mathbf{e}_i$, with no linear system to solve. That one formula *is* the Fourier series, the expansion of a quantum state in energy eigenstates, and the multipole expansion; the only thing that changes is the inner product, which for functions is $\\langle f, g\\rangle = \\int_a^b f^*(x)g(x)\\,w(x)\\,dx$. **Gram-Schmidt** manufactures an orthonormal basis from any basis; applied to $1, x, x^2, \\dots$ on $[-1,1]$ it produces the Legendre polynomials.

**Projection** is the workhorse application. The closest point to $\\mathbf{b}$ in the column space of $A$ is $A\\hat{\\mathbf{x}}$ with $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$: the error $\\mathbf{b} - A\\hat{\\mathbf{x}}$ must be orthogonal to every column. These are the normal equations of least squares, now understood geometrically rather than by calculus. When the columns are orthonormal, $A^TA = I$ and the projection is a sum of inner products again.

Watch 3Blue1Brown chapters 8-10 and 13-15, then work 18.06SC Unit 2 (orthogonality, projections, Gram-Schmidt). Then do the function-space exercises below; the moment you treat $\\sin nx$ as a basis vector, the Fourier module becomes a corollary.`,
          resources: [
            {
              title: 'MIT 18.06SC — Unit 2: Least Squares, Determinants and Eigenvalues (orthogonality and projections sessions)',
              url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures 9-10 (independence, basis, dimension, four subspaces) and 14-17 (orthogonality, projections, least squares, Gram-Schmidt).',
              primary: true,
            },
            {
              title: '3Blue1Brown — Essence of Linear Algebra: abstract vector spaces',
              url: 'https://www.3blue1brown.com/lessons/abstract-vector-spaces',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Why functions are vectors; watch with the dot-product and change-of-basis chapters.',
            },
            {
              title: 'Introduction to Applied Linear Algebra (Boyd & Vandenberghe) — free PDF',
              url: 'https://web.stanford.edu/~boyd/vmls/',
              type: 'textbook',
              cost: 'free',
              provider: 'Stanford',
              note: 'Chapters 5 (independence), 10-12 (matrices, inverses, least squares) with a strongly applied flavour.',
            },
            {
              title: 'Interactive Linear Algebra (Margalit & Rabinoff)',
              url: 'https://textbooks.math.gatech.edu/ila/',
              type: 'interactive',
              cost: 'free',
              provider: 'Georgia Tech',
              note: 'Interactive figures for subspaces, bases and orthogonal projections.',
            },
          ],
          exercises: [
            {
              slug: 'four-subspaces',
              title: 'The four fundamental subspaces',
              prompt:
                'For $A = \\begin{pmatrix}1&2&0&1\\\\2&4&1&3\\\\3&6&1&4\\end{pmatrix}$ find bases for the column space, nullspace, row space and left nullspace by elimination. Verify rank-nullity and that the row space is orthogonal to the nullspace (compute all dot products). Compare with `scipy.linalg.null_space` and `orth`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gram-schmidt-legendre',
              title: 'Gram-Schmidt produces Legendre polynomials',
              prompt:
                'Apply Gram-Schmidt to $1, x, x^2, x^3$ with the inner product $\\langle f,g\\rangle = \\int_{-1}^1 f g\\,dx$ by hand, and show you obtain multiples of $P_0..P_3$: $1, x, (3x^2-1)/2, (5x^3-3x)/2$. Implement the procedure numerically (represent polynomials by coefficient arrays, integrate with `numpy.polynomial.polynomial`) up to degree 6 and compare with `scipy.special.legendre`.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'projection-least-squares',
              title: 'Least squares as projection',
              prompt:
                'Fit a parabola $y = a + bx + cx^2$ to the points $x = 0,1,2,3,4$, $y = 1, 2.2, 4.1, 7.9, 12.5$ by forming the $5\\times3$ matrix $A$ and solving the normal equations. Compute the residual vector and show numerically that it is orthogonal to each column of $A$. Then compute the projection matrix $P = A(A^TA)^{-1}A^T$, verify $P^2 = P$ and $P^T = P$, and explain what each property means.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'function-inner-products',
              title: 'Orthogonality of sines and cosines',
              prompt:
                'Show analytically that $\\int_{-\\pi}^{\\pi}\\sin(mx)\\sin(nx)\\,dx = \\pi\\delta_{mn}$ for positive integers $m,n$ and that sines are orthogonal to cosines on this interval. Build the $6\\times6$ Gram matrix of $\\{1,\\cos x,\\sin x,\\cos 2x,\\sin 2x,\\cos 3x\\}$ numerically and confirm it is diagonal. Use it to compute the coefficients of $f(x) = x$ in this basis and plot the truncated expansion against $f$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are the coefficients of a vector in an orthonormal basis given by inner products?',
              answerOutline:
                'Take the inner product of $\\mathbf{v} = \\sum c_j \\mathbf{e}_j$ with $\\mathbf{e}_i$; orthonormality kills every term but $c_i$.',
            },
            {
              question: 'State the rank-nullity theorem and give the dimensions of the four subspaces of an $m\\times n$ matrix of rank $r$.',
              answerOutline:
                'rank + nullity = $n$. Column space $r$ (in $\\mathbb{R}^m$), nullspace $n-r$, row space $r$ (in $\\mathbb{R}^n$), left nullspace $m-r$.',
            },
            {
              question: 'Derive the normal equations from the geometry of projection.',
              answerOutline:
                'The residual $\\mathbf{b} - A\\hat{\\mathbf{x}}$ must be orthogonal to every column of $A$: $A^T(\\mathbf{b} - A\\hat{\\mathbf{x}}) = 0$, so $A^TA\\hat{\\mathbf{x}} = A^T\\mathbf{b}$.',
            },
            {
              question: 'In what sense are functions on $[a,b]$ vectors, and what is their inner product?',
              answerOutline:
                'They add and scale pointwise and form a vector space; the inner product is $\\int_a^b f^* g\\,dx$ (possibly with a weight), making orthogonal expansions possible.',
            },
          ],
        },
        {
          slug: 'eigenvalues-and-eigenvectors',
          title: 'Eigenvalues and eigenvectors',
          summary:
            'The directions a linear map merely stretches: computing eigenvalues from the characteristic polynomial, their geometric meaning, and their role in stability, oscillations and quantum mechanics.',
          estimatedMinutes: 150,
          objectives: [
            'Define eigenvalues and eigenvectors and compute them for $2\\times2$ and $3\\times3$ matrices via $\\det(A - \\lambda I) = 0$',
            'Interpret complex eigenvalues as rotations and relate trace and determinant to the eigenvalues',
            'State the spectral theorem for real symmetric and Hermitian matrices and explain why physics is full of them',
            'Use eigenvalues to predict the long-time behaviour of $\\mathbf{x}_{n+1} = A\\mathbf{x}_n$ and $\\dot{\\mathbf{x}} = A\\mathbf{x}$',
            'Compute eigen-decompositions numerically and interpret the output of `numpy.linalg.eigh`',
          ],
          concepts: [
            'Eigenvector equation $A\\mathbf{v} = \\lambda\\mathbf{v}$',
            'Characteristic polynomial $\\det(A - \\lambda I)$',
            'Trace = sum, determinant = product of eigenvalues',
            'Eigenspaces, algebraic vs geometric multiplicity',
            'Symmetric / Hermitian matrices: real eigenvalues, orthogonal eigenvectors',
            'Spectral theorem',
            'Complex eigenvalues and rotation',
            'Power iteration and dominant eigenvalue',
          ],
          explanation: `Most vectors change direction when a matrix acts on them. The few that do not, the **eigenvectors**, satisfy $A\\mathbf{v} = \\lambda\\mathbf{v}$, and the stretch factor $\\lambda$ is the **eigenvalue**. Rewriting as $(A - \\lambda I)\\mathbf{v} = 0$, a nonzero $\\mathbf{v}$ exists only when $A - \\lambda I$ is singular, so the eigenvalues are the roots of the **characteristic polynomial** $\\det(A - \\lambda I) = 0$. For a $2\\times2$ matrix this is $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0$; in general the trace is the sum of the eigenvalues and the determinant their product, which is a fast sanity check on any eigenvalue computation.

Why physicists care: eigenvectors are the coordinates in which a linear problem decouples. If $\\mathbf{x}$ is written as a combination of eigenvectors, $A$ acts on each component by a simple multiplication, so $A^n\\mathbf{x}$ and $e^{At}\\mathbf{x}$ become trivial. Repeated application of $A$ (population models, Markov chains, iterative solvers) is dominated by the eigenvalue of largest modulus; a linear system $\\dot{\\mathbf{x}} = A\\mathbf{x}$ decays if all eigenvalues have negative real part, oscillates if they are imaginary, and grows if any has positive real part: this is linear **stability analysis**. Complex eigenvalues come in conjugate pairs for real matrices and mean the map rotates as it scales.

The **spectral theorem** is the most important special case. A real symmetric matrix ($A = A^T$), or a complex Hermitian one ($A = A^\\dagger$), has *real* eigenvalues and an *orthonormal* basis of eigenvectors. Hooke's-law stiffness matrices, moment-of-inertia tensors, Hessians, covariance matrices and every quantum observable are Hermitian; the realness of eigenvalues is why measured energies are real and the orthogonality is why energy eigenstates are independent. Eigenvalues with multiplicity greater than one (degeneracy) have whole eigenspaces, and for non-symmetric matrices the geometric multiplicity can be smaller than the algebraic one (defective matrices), in which case diagonalisation fails.

Numerically, nobody finds roots of the characteristic polynomial; \`numpy.linalg.eig\` uses the QR algorithm. Use \`eigh\` for symmetric/Hermitian input: it is faster, guarantees real eigenvalues in ascending order and returns orthonormal eigenvectors as columns.

Watch 3Blue1Brown chapter 14 first, then 18.06SC lectures 21-22 and 25 (symmetric matrices), then do the exercises; the coupled-oscillator exercise is the archetype of every normal-mode problem in later subjects.`,
          resources: [
            {
              title: 'MIT 18.06SC — Eigenvalues and eigenvectors (Lectures 21-22, 25)',
              url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Unit 2 sessions on eigenvalues, diagonalisation, symmetric matrices and positive definiteness.',
              primary: true,
            },
            {
              title: '3Blue1Brown — Eigenvectors and eigenvalues',
              url: 'https://www.3blue1brown.com/lessons/eigenvalues',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'The geometric picture; the "quick trick" for 2x2 eigenvalues from trace and determinant is in a companion video.',
            },
            {
              title: 'Interactive Linear Algebra — Chapter 5: Eigenvalues and Eigenvectors',
              url: 'https://textbooks.math.gatech.edu/ila/',
              type: 'interactive',
              cost: 'free',
              provider: 'Georgia Tech',
              note: 'Interactive demos of eigenspaces and of the dynamics of repeated multiplication.',
            },
            {
              title: 'SciPy — scipy.linalg.eigh documentation',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.eigh.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Read the return-value conventions (eigenvectors are columns, ascending eigenvalues).',
            },
          ],
          exercises: [
            {
              slug: 'eigen-by-hand',
              title: 'Eigenvalues by hand',
              prompt:
                'Find all eigenvalues and eigenvectors of (a) $\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}$, (b) $\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$, (c) $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$, (d) $\\begin{pmatrix}2&0&0\\\\0&3&4\\\\0&4&9\\end{pmatrix}$. For each, verify trace and determinant, say whether the matrix is diagonalisable, and interpret geometrically ((b) is a rotation; (c) is a shear and is defective). Check with `numpy.linalg.eig`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'coupled-oscillators-normal-modes',
              title: 'Normal modes of two coupled masses',
              prompt:
                'Two equal masses $m$ on a line are connected to walls by springs $k$ and to each other by a spring $k_c$. Write the equations of motion as $m\\ddot{\\mathbf{x}} = -K\\mathbf{x}$, find the eigenvalues and eigenvectors of $K$, and show the normal-mode frequencies are $\\sqrt{k/m}$ (in-phase) and $\\sqrt{(k+2k_c)/m}$ (anti-phase). Simulate the system with `scipy.integrate.solve_ivp` starting with only mass 1 displaced and show the energy sloshes between the masses with beat frequency equal to the difference of the mode frequencies.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'power-iteration',
              title: 'Power iteration and stability',
              prompt:
                'Implement power iteration (repeatedly apply $A$ and normalise) for a random symmetric $20\\times20$ matrix and show it converges to the eigenvector of largest $|\\lambda|$, with the error decaying like $|\\lambda_2/\\lambda_1|^n$. Then take the Leslie population matrix $\\begin{pmatrix}0&1.5&1\\\\0.5&0&0\\\\0&0.4&0\\end{pmatrix}$, find its dominant eigenvalue, and predict the long-run growth rate and stable age distribution; confirm by iterating 50 generations.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'spectral-theorem-proof',
              title: 'Prove two parts of the spectral theorem',
              prompt:
                'For a Hermitian matrix $H$ ($H^\\dagger = H$), prove that (a) every eigenvalue is real and (b) eigenvectors with distinct eigenvalues are orthogonal, using only $\\langle \\mathbf{u}, H\\mathbf{v}\\rangle = \\langle H\\mathbf{u}, \\mathbf{v}\\rangle$. Then verify numerically on the Pauli matrices and on a random $4\\times4$ Hermitian matrix built as $B + B^\\dagger$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are the eigenvalues the roots of $\\det(A - \\lambda I)$?',
              answerOutline:
                '$A\\mathbf{v} = \\lambda\\mathbf{v}$ with $\\mathbf{v} \\neq 0$ means $A - \\lambda I$ has a nontrivial nullspace, i.e. is singular, i.e. has zero determinant.',
            },
            {
              question: 'What does the spectral theorem guarantee for symmetric/Hermitian matrices and why does physics care?',
              answerOutline:
                'Real eigenvalues and an orthonormal eigenbasis; observables, stiffness matrices, Hessians and covariance matrices are all Hermitian, so measurements are real and modes/states decouple.',
            },
            {
              question: 'How do the eigenvalues of $A$ decide the fate of $\\mathbf{x}_{n+1} = A\\mathbf{x}_n$?',
              answerOutline:
                'Decompose into eigenvectors; each component scales by $\\lambda_i^n$; growth if any $|\\lambda| > 1$, decay if all $< 1$, dominated by the largest modulus.',
            },
            {
              question: 'What is a defective matrix?',
              answerOutline:
                'One whose geometric multiplicity is less than algebraic for some eigenvalue, so it lacks a full set of eigenvectors and cannot be diagonalised, e.g. a shear.',
            },
          ],
        },
        {
          slug: 'diagonalization-and-matrix-functions',
          title: 'Diagonalisation, matrix functions and quadratic forms',
          summary:
            'Using $A = PDP^{-1}$ to compute powers and exponentials of matrices, solve linear ODE systems, classify quadratic forms, and introduce the singular value decomposition.',
          estimatedMinutes: 150,
          objectives: [
            'Diagonalise a matrix and use $A = PDP^{-1}$ to compute $A^n$ and $e^{At}$',
            'Solve $\\dot{\\mathbf{x}} = A\\mathbf{x}$ via eigen-decomposition and classify fixed points',
            'Classify quadratic forms and the definiteness of symmetric matrices with eigenvalues; find principal axes',
            'Explain unitary and orthogonal matrices as change of orthonormal basis',
            'State what the singular value decomposition is and use it for rank, conditioning and low-rank approximation',
          ],
          concepts: [
            'Diagonalisation $A = PDP^{-1}$',
            'Matrix exponential $e^{At}$',
            'Linear ODE systems and phase portraits',
            'Quadratic forms $\\mathbf{x}^TA\\mathbf{x}$ and principal axes',
            'Positive definiteness',
            'Orthogonal and unitary matrices',
            'Similarity and change of basis',
            'Singular value decomposition (SVD)',
          ],
          explanation: `If $A$ has $n$ independent eigenvectors, stack them as the columns of $P$; then $AP = PD$ with $D = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n)$, so $A = PDP^{-1}$. This is a **change of basis**: $P^{-1}$ converts to eigen-coordinates, $D$ acts by simple scaling, $P$ converts back. Anything you can do to a diagonal matrix you can now do to $A$: $A^n = PD^nP^{-1}$ and, defining functions by their power series,

$$e^{At} = P\\,\\operatorname{diag}(e^{\\lambda_1 t}, \\dots, e^{\\lambda_n t})\\,P^{-1}.$$

The **matrix exponential** solves every constant-coefficient linear ODE system at once: $\\dot{\\mathbf{x}} = A\\mathbf{x}$ has solution $\\mathbf{x}(t) = e^{At}\\mathbf{x}(0) = \\sum_i c_i e^{\\lambda_i t}\\mathbf{v}_i$. Real negative eigenvalues give a stable node, real positive an unstable one, opposite signs a saddle, complex with negative real part a stable spiral, purely imaginary a centre. Drawing these phase portraits for $2\\times2$ systems is a skill used throughout classical mechanics and nonlinear dynamics.

For symmetric $A$ the eigenvectors are orthonormal, so $P$ is **orthogonal** ($P^{-1} = P^T$) and $A = PDP^T$. The quadratic form $\\mathbf{x}^TA\\mathbf{x}$ becomes $\\sum\\lambda_i y_i^2$ in the rotated coordinates $\\mathbf{y} = P^T\\mathbf{x}$: the eigenvectors are the **principal axes** of the ellipsoid $\\mathbf{x}^TA\\mathbf{x} = 1$, which is the principal-axis theorem of rigid-body rotation, the classification of critical points by the Hessian, and principal component analysis in statistics. $A$ is **positive definite** iff all $\\lambda_i > 0$. The complex version, unitary $U$ with $U^{-1} = U^\\dagger$, is how quantum mechanics changes between orthonormal bases while preserving inner products.

Non-square or non-diagonalisable matrices still have a **singular value decomposition** $A = U\\Sigma V^T$ with orthogonal $U, V$ and non-negative singular values $\\sigma_i$ (the square roots of the eigenvalues of $A^TA$). The number of nonzero $\\sigma_i$ is the rank, $\\sigma_1/\\sigma_n$ is the condition number, and keeping the largest few gives the best low-rank approximation, which is image compression and PCA in one theorem.

Work 18.06SC lectures 22-23 (diagonalisation, differential equations and $e^{At}$), 27-28 (positive definite matrices) and 29-30 (similarity, SVD). The matrix-exponential exercise connects directly to the ODE module.`,
          resources: [
            {
              title: 'MIT 18.06SC — Diagonalisation, matrix exponentials, positive definite matrices and the SVD',
              url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures 22-23, 27-31. Lecture 23 (differential equations and exp(At)) is the bridge to the ODE module.',
              primary: true,
            },
            {
              title: '3Blue1Brown — Change of basis',
              url: 'https://www.3blue1brown.com/lessons/change-of-basis',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Why $PDP^{-1}$ is "translate, act, translate back".',
            },
            {
              title: 'Introduction to Applied Linear Algebra (Boyd & Vandenberghe)',
              url: 'https://web.stanford.edu/~boyd/vmls/',
              type: 'textbook',
              cost: 'free',
              provider: 'Stanford',
              note: 'Orthogonal matrices and least squares; the companion Julia/Python notebooks show the numerics.',
            },
            {
              title: 'SciPy — Linear algebra tutorial (expm, svd, eigh)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/linalg.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
          ],
          exercises: [
            {
              slug: 'matrix-exponential-ode',
              title: 'Solve a linear system with the matrix exponential',
              prompt:
                'For $A = \\begin{pmatrix}-1&2\\\\-2&-1\\end{pmatrix}$ compute $e^{At}$ by diagonalisation (complex eigenvalues) and show the solution of $\\dot{\\mathbf{x}} = A\\mathbf{x}$ is a decaying spiral. Compare your closed form against `scipy.linalg.expm(A*t)` for $t = 0.5, 1, 2$ and against `solve_ivp`. Plot the phase portrait. Repeat for $A = \\begin{pmatrix}1&1\\\\4&1\\end{pmatrix}$ (saddle) and sketch both.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'principal-axes-inertia',
              title: 'Principal axes of an inertia tensor',
              prompt:
                'Compute the inertia tensor of a uniform rectangular plate ($a\\times b$, mass $M$) about a corner, with axes along the edges. Diagonalise it to find the principal moments and principal axes. Show that the in-plane principal axes are rotated from the edges by an angle you derive, and that the sum of the principal moments equals the trace. Verify numerically with `numpy.linalg.eigh` for $a = 2, b = 1$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'svd-image-compression',
              title: 'Low-rank approximation with the SVD',
              prompt:
                'Load any greyscale image as a matrix (or generate a 256x256 smooth test pattern), compute its SVD, and reconstruct it keeping the top $k = 5, 20, 50$ singular values. Plot the singular-value spectrum on a log axis and the reconstruction error $\\|A - A_k\\|_F$ against $k$. Show the error equals $\\sqrt{\\sum_{i>k}\\sigma_i^2}$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'definiteness-classification',
              title: 'Classify quadratic forms',
              prompt:
                'For $Q(x,y,z) = 2x^2 + 2y^2 + 3z^2 + 2xy + 2yz$, write the symmetric matrix, find its eigenvalues, decide definiteness, and write $Q$ as a sum of squares in principal coordinates. Then determine for which real $c$ the matrix $\\begin{pmatrix}1&c\\\\c&4\\end{pmatrix}$ is positive definite using (a) eigenvalues and (b) leading principal minors, and show the two criteria agree.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain $A = PDP^{-1}$ as a change of basis.',
              answerOutline:
                '$P^{-1}$ expresses a vector in eigen-coordinates, $D$ scales each coordinate by its eigenvalue, $P$ returns to the original basis; the map is the same, the coordinates differ.',
            },
            {
              question: 'How does $e^{At}$ solve $\\dot{\\mathbf{x}} = A\\mathbf{x}$ and what do the eigenvalues tell you?',
              answerOutline:
                '$\\mathbf{x}(t) = e^{At}\\mathbf{x}(0)$; components along eigenvectors evolve as $e^{\\lambda t}$, so real parts give growth/decay and imaginary parts oscillation.',
            },
            {
              question: 'What is the principal-axis theorem?',
              answerOutline:
                'A real symmetric matrix can be orthogonally diagonalised, $A = PDP^T$; in the rotated coordinates the quadratic form has no cross terms and the eigenvectors are the axes of the ellipsoid.',
            },
            {
              question: 'What does the SVD give you that eigen-decomposition does not?',
              answerOutline:
                'It exists for every matrix (including rectangular and defective ones), with orthogonal factors; singular values give rank, condition number and optimal low-rank approximations.',
            },
          ],
        },
      ],
      project: {
        slug: 'normal-modes-of-a-chain',
        title: 'Module project: normal modes of a chain of masses',
        description:
          'Model $N$ equal masses connected by springs with fixed ends as the matrix eigenproblem $K\\mathbf{x} = \\omega^2 M\\mathbf{x}$. Derive $K$, diagonalise it numerically for $N = 2, 5, 50, 500$, compare the mode shapes and frequencies with the analytic result $\\omega_n = 2\\sqrt{k/m}\\sin\\left(\\frac{n\\pi}{2(N+1)}\\right)$, and show that as $N \\to \\infty$ the low modes converge to the standing waves of a continuous string. Animate the first three modes.',
        deliverables: [
          'Derivation of the stiffness matrix and the analytic dispersion relation',
          'Notebook producing frequency spectra and mode-shape plots versus theory for all $N$',
          'Animation of the first three modes and a short discussion of the continuum limit',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Add a defect (one heavier mass) and show a localised mode appears outside the band',
          'Diagonalise with `scipy.sparse.linalg.eigsh` for $N = 10^5$ and time it against dense `eigh`',
        ],
      },
    },
    {
      slug: 'ordinary-differential-equations',
      title: 'Ordinary Differential Equations',
      description:
        'Solving the equations of motion: first-order methods, the damped driven oscillator, linear systems and phase planes, Laplace transforms and series solutions, and the calculus of variations.',
      lessons: [
        {
          slug: 'first-order-odes',
          title: 'First-order ODEs: separable, linear and exact',
          summary:
            'What a differential equation and its solution are, direction fields, and the three solvable families of first-order equations with their physical applications.',
          estimatedMinutes: 150,
          objectives: [
            'Classify first-order ODEs as separable, linear, exact or none of these',
            'Solve separable equations and linear equations with an integrating factor',
            'Interpret direction fields and sketch solution families without solving',
            'Model and solve radioactive decay, Newtonian cooling, RC circuits, terminal velocity and logistic growth',
            'State the existence and uniqueness theorem and recognise when it fails',
          ],
          concepts: [
            'Order, linearity, initial value problem',
            'Direction (slope) field',
            'Separable equations',
            'Linear first-order: integrating factor $e^{\\int p\\,dx}$',
            'Exact equations and potential functions',
            'Equilibrium solutions and stability',
            'Existence and uniqueness (Picard)',
            'Time constants and characteristic scales',
          ],
          explanation: `A differential equation relates a function to its derivatives; a first-order ODE has the form $y' = f(x, y)$. Its solution is not a number but a *family* of functions, one for each initial condition, and the **direction field** (a small arrow of slope $f(x,y)$ at each point) lets you see the whole family before solving anything. Draw one for $y' = y(1-y)$ and the logistic S-curves and the stable equilibrium at $y = 1$ are visible immediately.

Three families can be solved in closed form. **Separable** equations $y' = g(x)h(y)$ become $\\int dy/h(y) = \\int g(x)\\,dx$: radioactive decay $\\dot N = -\\lambda N$, Newton's law of cooling, and terminal velocity with quadratic drag $m\\dot v = mg - cv^2$ are all separable. **Linear** equations $y' + p(x)y = q(x)$ are solved by multiplying with the **integrating factor** $\\mu = e^{\\int p\\,dx}$, which turns the left side into $(\\mu y)'$; the charging RC circuit $RC\\,\\dot q + q = V(t)$ is the standard example and its solution is a transient $e^{-t/RC}$ plus a particular response. **Exact** equations $M\\,dx + N\\,dy = 0$ with $\\partial M/\\partial y = \\partial N/\\partial x$ are the statement that $(M, N)$ is a gradient; the solution curves are level sets of the potential. That condition is the same mixed-partials fact behind conservative forces.

Two conceptual points matter more than technique. First, every linear first-order problem has a **time constant** ($1/\\lambda$, $RC$, $m/c$) that sets the scale on which transients die; find it before solving and you can predict the answer's shape. Second, the **existence and uniqueness theorem** says that if $f$ and $\\partial f/\\partial y$ are continuous, exactly one solution passes through each point, so solution curves never cross. When the hypothesis fails ($y' = \\sqrt{y}$ at $y = 0$) uniqueness really is lost, which is a useful warning when a model behaves strangely.

Work 18.03SC Unit 1 and OpenStax Volume 2 chapter 4 (or Paul's Notes, first-order chapter). The MIT "Mathlets" linked from 18.03SC let you play with direction fields interactively. Then do the exercises, always checking a closed-form solution against \`solve_ivp\`.`,
          resources: [
            {
              title: 'MIT 18.03SC Differential Equations — Unit 1: First Order Differential Equations',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions on direction fields, separable and linear equations, and the exponential input theorem; use the MIT Mathlets linked from the sessions.',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Differential Equations",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/DE.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'First-order chapter: linear, separable, exact, with modelling examples.',
            },
            {
              title: 'OpenStax Calculus Volume 2 — Chapter 4: Introduction to Differential Equations',
              url: 'https://openstax.org/details/books/calculus-volume-2',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'Notes on Diffy Qs (Lebl) — free open textbook',
              url: 'https://www.jirka.org/diffyqs/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jiří Lebl',
              note: 'Chapter 1 for first-order equations; used again for systems and Laplace transforms.',
            },
          ],
          exercises: [
            {
              slug: 'classify-and-solve',
              title: 'Classify and solve',
              prompt:
                'Classify and solve: (a) $y\' = xy^2$; (b) $y\' + 2y = e^{-x}$ with $y(0) = 1$; (c) $(2xy + \\cos x)\\,dx + (x^2 + 1)\\,dy = 0$; (d) $\\dot v = g - (c/m)v^2$, $v(0) = 0$. For (d) find the terminal velocity and the time to reach 99% of it for $m = 80$ kg, $c = 0.25$ kg/m. Check each against `solve_ivp` on a plot.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'direction-fields',
              title: 'Read a direction field',
              prompt:
                'Using `matplotlib.quiver`, draw direction fields for $y\' = y(1-y)$, $y\' = x - y$ and $y\' = \\sin(xy)$ on $[-3,3]^2$. For each, identify equilibria and their stability by inspection, then overlay five numerically computed solution curves. For the first, prove analytically that $y = 1$ is stable and $y = 0$ unstable by linearising around each.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'rc-circuit-response',
              title: 'RC circuit with a square-wave drive',
              prompt:
                'Solve $RC\\dot q + q = V_0$ for $q(0) = 0$ and identify the time constant. Then drive the circuit with a square wave of period $T$ and compute the response numerically for $T = 0.2RC, RC, 10RC$. Explain, using the time constant, why the capacitor voltage is a triangle wave in one limit and a square wave in the other.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'uniqueness-failure',
              title: 'When uniqueness fails',
              prompt:
                'Show that $y\' = 3y^{2/3}$ with $y(0) = 0$ has the solutions $y = 0$ and $y = x^3$ (and infinitely many more, piecewise). Explain which hypothesis of the existence-uniqueness theorem fails. Run `solve_ivp` from $y(0) = 0$ and from $y(0) = 10^{-12}$ and compare.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the integrating factor method work for $y\' + p(x)y = q(x)$?',
              answerOutline:
                'Multiply by $\\mu = e^{\\int p}$; then $\\mu y\' + \\mu p y = (\\mu y)\'$, so $\\mu y = \\int \\mu q\\,dx + C$.',
            },
            {
              question: 'What is the time constant of $\\dot x = -x/\\tau + f$, and what happens for $t \\gg \\tau$?',
              answerOutline:
                '$\\tau$; transients decay as $e^{-t/\\tau}$ and the solution approaches the particular (steady) response.',
            },
            {
              question: 'What does the existence and uniqueness theorem guarantee and what does it imply about solution curves?',
              answerOutline:
                'If $f$ and $f_y$ are continuous near the initial point, exactly one solution exists locally; hence solution curves in the $(x,y)$ plane never cross.',
            },
            {
              question: 'What is the condition for $M\\,dx + N\\,dy = 0$ to be exact and what is the solution?',
              answerOutline:
                '$M_y = N_x$; then there is $F$ with $F_x = M$, $F_y = N$, and solutions are the level curves $F(x,y) = C$.',
            },
          ],
        },
        {
          slug: 'second-order-linear-odes-and-oscillators',
          title: 'Second-order linear ODEs: the damped, driven oscillator',
          summary:
            'Constant-coefficient linear equations, the characteristic equation, damping regimes, resonance and the superposition principle, built around the harmonic oscillator.',
          estimatedMinutes: 180,
          objectives: [
            'Solve homogeneous constant-coefficient linear ODEs via the characteristic equation, including repeated and complex roots',
            'Explain superposition and why the general solution of a linear equation is homogeneous plus particular',
            'Find particular solutions for sinusoidal, exponential and polynomial forcing (undetermined coefficients, complex exponentials)',
            'Analyse the damped driven oscillator: underdamped, critically damped, overdamped, resonance curve, phase lag, Q factor',
            'Use the Wronskian to test independence and apply variation of parameters',
          ],
          concepts: [
            'Linear operator and superposition',
            'Characteristic equation $r^2 + 2\\gamma r + \\omega_0^2 = 0$',
            'Under-, critically and overdamped regimes',
            'Homogeneous + particular solution',
            'Complex exponential method for sinusoidal forcing',
            'Resonance, amplitude response, phase lag',
            'Quality factor $Q$',
            'Wronskian and variation of parameters',
          ],
          explanation: `The equation $\\ddot x + 2\\gamma\\dot x + \\omega_0^2 x = f(t)$ describes a mass on a spring with friction, an RLC circuit, a pendulum at small angles, a molecule in a laser field and a building in an earthquake. It is the most important ODE in physics, and solving it exercises every technique for linear equations.

**Linearity** means solutions superpose: if $x_1, x_2$ solve the homogeneous equation ($f = 0$) so does $c_1x_1 + c_2x_2$, and the general solution of the forced equation is any particular solution plus the general homogeneous one. For constant coefficients, try $x = e^{rt}$ to get the **characteristic equation** $r^2 + 2\\gamma r + \\omega_0^2 = 0$, with roots $r = -\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}$. Three regimes follow: **underdamped** ($\\gamma < \\omega_0$), decaying oscillations $e^{-\\gamma t}\\cos(\\omega_d t + \\phi)$ with $\\omega_d = \\sqrt{\\omega_0^2 - \\gamma^2}$; **critically damped** ($\\gamma = \\omega_0$), a repeated root and solutions $(A + Bt)e^{-\\gamma t}$, the fastest return without overshoot; **overdamped**, two real decays. Complex roots are not a problem: take real parts, or keep the complex form, which is usually easier.

For sinusoidal driving $f = F_0\\cos\\omega t$, write $f = \\operatorname{Re} F_0 e^{i\\omega t}$ and try $x = \\operatorname{Re} \\tilde{A} e^{i\\omega t}$. Substitution gives the complex amplitude

$$\\tilde{A} = \\frac{F_0}{\\omega_0^2 - \\omega^2 + 2i\\gamma\\omega},$$

whose modulus is the **amplitude response** and whose argument is the **phase lag**. The amplitude peaks near $\\omega_0$ with a width $\\sim 2\\gamma$ and height $\\sim F_0/(2\\gamma\\omega_0)$; the quality factor $Q = \\omega_0/2\\gamma$ measures the sharpness. The phase passes through $-\\pi/2$ at resonance, which is why pushing a swing works best a quarter-cycle ahead of its motion. After transients decay only this steady-state part survives, which is the whole basis of frequency-response thinking.

For non-constant coefficients or general forcing, two independent homogeneous solutions (checked by a nonzero **Wronskian** $W = x_1\\dot x_2 - x_2\\dot x_1$) give the particular solution by **variation of parameters**; this is the first appearance of a Green's function.

Work 18.03SC Unit 2 fully, including the sessions on damped oscillators, resonance and the exponential response formula. Paul's Notes covers the mechanics of undetermined coefficients and variation of parameters. Then do the resonance-curve exercise and keep the plot: you will see it again in waves, electromagnetism and quantum mechanics.`,
          resources: [
            {
              title: 'MIT 18.03SC — Unit 2: Second Order Constant Coefficient Linear Equations',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Includes the damped harmonic oscillator, exponential response formula, resonance and the "amplitude and phase" Mathlets.',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Second Order Differential Equations",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/DE.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Characteristic equation cases, undetermined coefficients, variation of parameters, mechanical vibrations.',
            },
            {
              title: 'MIT 8.03SC Physics III: Vibrations and Waves — Lectures 1-3',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The physicist\'s treatment of damped and driven oscillators, with demonstrations.',
            },
          ],
          exercises: [
            {
              slug: 'three-damping-regimes',
              title: 'The three damping regimes',
              prompt:
                'Solve $\\ddot x + 2\\gamma\\dot x + x = 0$ with $x(0) = 1$, $\\dot x(0) = 0$ in closed form for $\\gamma = 0.2, 1, 2$. Plot all three on one figure together with `solve_ivp` solutions. Show that the critically damped case returns to within 1% of zero fastest, and compute that time for each case.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'resonance-curve',
              title: 'Derive and plot the resonance curve',
              prompt:
                'Derive the complex amplitude $\\tilde A(\\omega)$ for $\\ddot x + 2\\gamma\\dot x + \\omega_0^2 x = F_0\\cos\\omega t$. Plot $|\\tilde A|$ and the phase $\\arg\\tilde A$ versus $\\omega/\\omega_0$ for $Q = 2, 10, 50$. Show that the peak sits at $\\omega = \\sqrt{\\omega_0^2 - 2\\gamma^2}$ and that the full width at half maximum of $|\\tilde A|^2$ is approximately $2\\gamma$ for large $Q$. Confirm one point of the curve by integrating the ODE numerically to steady state and measuring the amplitude.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rlc-circuit',
              title: 'RLC circuit as an oscillator',
              prompt:
                'Write the ODE for charge in a series RLC circuit driven by $V_0\\cos\\omega t$ and map $R, L, C$ onto $\\gamma, \\omega_0, F_0$. For $L = 10$ mH, $C = 100$ nF, find $R$ for critical damping and for $Q = 20$. Compute the power dissipated in the resistor as a function of $\\omega$ at $Q = 20$ and identify the bandwidth.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'variation-of-parameters',
              title: 'Variation of parameters',
              prompt:
                'Solve $\\ddot x + x = \\sec t$ (where undetermined coefficients fails) by variation of parameters; answer: $x = c_1\\cos t + c_2\\sin t + t\\sin t + \\cos t\\ln|\\cos t|$. Verify by substituting back symbolically with SymPy.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three damping regimes and how do they follow from the characteristic equation?',
              answerOutline:
                'Discriminant $\\gamma^2 - \\omega_0^2$: negative gives complex roots (underdamped oscillation), zero a repeated root (critical, $(A+Bt)e^{-\\gamma t}$), positive two real decays (overdamped).',
            },
            {
              question: 'Why does the complex exponential method work for sinusoidal forcing?',
              answerOutline:
                'The equation is linear with real coefficients, so the real part of a complex solution for $F_0e^{i\\omega t}$ solves the equation for $F_0\\cos\\omega t$; derivatives of exponentials are algebraic.',
            },
            {
              question: 'What is the phase lag at resonance and what does it mean physically?',
              answerOutline:
                '$\\pi/2$: the displacement lags the force by a quarter cycle, so the force is in phase with the velocity and does maximal work.',
            },
            {
              question: 'What does the quality factor measure?',
              answerOutline:
                '$Q = \\omega_0/2\\gamma$: number of radians of oscillation before the energy drops by $e$, and the ratio of resonant frequency to bandwidth.',
            },
          ],
        },
        {
          slug: 'systems-of-odes-and-phase-plane',
          title: 'Systems of ODEs and the phase plane',
          summary:
            'Converting higher-order equations to first-order systems, solving linear systems with eigenvalues, classifying fixed points, and analysing nonlinear systems by linearisation.',
          estimatedMinutes: 150,
          objectives: [
            'Rewrite any $n$-th order ODE as a first-order system $\\dot{\\mathbf{x}} = \\mathbf{F}(\\mathbf{x})$',
            'Solve linear systems with eigenvalues/eigenvectors and sketch the phase portrait of each fixed-point type',
            'Find fixed points of nonlinear systems and classify them by linearisation (the Jacobian)',
            'Interpret conserved quantities as curves in the phase plane and use them for the pendulum',
            'Explain, with the Lotka-Volterra and pendulum examples, what linearisation can and cannot tell you',
          ],
          concepts: [
            'State vector and first-order form',
            'Phase plane and trajectories',
            'Fixed points: node, saddle, spiral, centre',
            'Trace-determinant classification',
            'Jacobian and linearisation',
            'Hyperbolic vs non-hyperbolic fixed points',
            'Conserved quantities and separatrices',
            'Limit cycles (preview)',
          ],
          explanation: `Every ODE can be written as a first-order system by introducing the derivatives as new variables: $\\ddot x = f(x, \\dot x)$ becomes $\\dot x = v$, $\\dot v = f(x, v)$. The vector $(x, v)$ is the **state**, and the equation says how the state moves. This is not merely a trick for numerical solvers (although \`solve_ivp\` requires it); it gives you the **phase plane**, where a solution is a curve and the ODE is a velocity field. Trajectories never cross (uniqueness), and the whole qualitative behaviour is visible at once.

For a **linear system** $\\dot{\\mathbf{x}} = A\\mathbf{x}$ the origin is a fixed point and the eigenvalues of $A$ classify it. Real eigenvalues of the same sign give a **node** (stable if negative), opposite signs a **saddle** with the eigenvectors as the in- and out-going directions, complex with nonzero real part a **spiral**, purely imaginary a **centre** of closed orbits. The trace-determinant diagram summarises this: $\\operatorname{tr}A < 0$ and $\\det A > 0$ means stable; $\\det A < 0$ is always a saddle.

A **nonlinear system** $\\dot{\\mathbf{x}} = \\mathbf{F}(\\mathbf{x})$ is analysed by finding its fixed points $\\mathbf{F} = 0$ and linearising near each: $\\dot{\\boldsymbol\\xi} \\approx J\\boldsymbol\\xi$ where $J$ is the **Jacobian** matrix $\\partial F_i/\\partial x_j$. The Hartman-Grobman theorem says the linearisation is faithful near **hyperbolic** fixed points (no eigenvalue with zero real part). Centres are the exception: nonlinear terms can turn a linear centre into a slow spiral, so a conserved quantity is needed to prove the orbits really close.

The undamped pendulum $\\ddot\\theta = -\\sin\\theta$ shows everything. Fixed points at $\\theta = 0$ (centre) and $\\theta = \\pi$ (saddle); energy $E = \\tfrac12\\dot\\theta^2 - \\cos\\theta$ is conserved, so trajectories are its level curves; the **separatrix** $E = 1$ through the saddle divides oscillation from rotation. Add damping and the centres become stable spirals. The Lotka-Volterra predator-prey system has a centre that survives for the same reason (a conserved quantity), while small changes to the model destroy it.

Work 18.03SC Unit 4 (first-order systems, phase portraits, linearisation and the pendulum). Lebl chapter 3 and 8 are a good second source. Then do the exercises, which are mostly plotting: a phase portrait you have drawn yourself is worth more than any amount of reading here.`,
          resources: [
            {
              title: 'MIT 18.03SC — Unit 4: First-order Systems',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Linear systems, phase portraits, the trace-determinant plane, linearisation of nonlinear systems, limit cycles.',
              primary: true,
            },
            {
              title: 'Notes on Diffy Qs (Lebl) — Chapters 3 and 8',
              url: 'https://www.jirka.org/diffyqs/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jiří Lebl',
              note: 'Systems of ODEs; nonlinear systems, linearisation and the pendulum.',
            },
            {
              title: "Paul's Online Math Notes — Systems of Differential Equations",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/SystemsDE.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Many fully worked phase-portrait classifications for linear systems.',
            },
            {
              title: 'SciPy — solve_ivp documentation',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Read the examples; use dense_output and events for the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'linear-portrait-gallery',
              title: 'A gallery of linear phase portraits',
              prompt:
                'For the matrices $\\begin{pmatrix}-2&0\\\\0&-1\\end{pmatrix}$, $\\begin{pmatrix}1&1\\\\4&1\\end{pmatrix}$, $\\begin{pmatrix}-1&-2\\\\2&-1\\end{pmatrix}$, $\\begin{pmatrix}0&2\\\\-2&0\\end{pmatrix}$, $\\begin{pmatrix}2&1\\\\-1&2\\end{pmatrix}$, compute eigenvalues, classify the fixed point, and plot the phase portrait with `streamplot`. Mark eigenvector directions where real. Place each on the trace-determinant diagram.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'pendulum-phase-portrait',
              title: 'The full pendulum',
              prompt:
                'For $\\ddot\\theta + b\\dot\\theta + \\sin\\theta = 0$, find the fixed points and classify them via the Jacobian for $b = 0$ and $b = 0.3$. Plot the phase portrait for both, overlay the energy contours for $b = 0$, and draw the separatrix. Compute the period of oscillation as a function of amplitude numerically (with an event in `solve_ivp`) and compare with $2\\pi(1 + \\theta_0^2/16)$ from the Taylor lesson.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'lotka-volterra',
              title: 'Predator-prey dynamics',
              prompt:
                'For $\\dot x = x - xy$, $\\dot y = -y + xy$: find both fixed points, classify them by linearisation, and show that $H = x - \\ln x + y - \\ln y$ is conserved, proving the orbits are closed. Plot orbits for several initial conditions. Then add logistic growth $\\dot x = x(1 - x/K) - xy$ with $K = 5$ and show the centre becomes a stable spiral.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'van-der-pol-limit-cycle',
              title: 'A limit cycle',
              prompt:
                'Integrate the van der Pol oscillator $\\ddot x - \\mu(1 - x^2)\\dot x + x = 0$ for $\\mu = 0.1, 1, 5$ from two initial conditions (inside and outside the cycle). Show that all trajectories approach the same closed orbit, classify the origin by linearisation, and measure the period of the cycle versus $\\mu$.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you convert $\\dddot{x} + 2\\ddot x - x = \\sin t$ to a first-order system?',
              answerOutline:
                'Let $x_1 = x, x_2 = \\dot x, x_3 = \\ddot x$; then $\\dot x_1 = x_2$, $\\dot x_2 = x_3$, $\\dot x_3 = x_1 - 2x_3 + \\sin t$.',
            },
            {
              question: 'Classify the fixed point of $\\dot{\\mathbf{x}} = A\\mathbf{x}$ from the trace and determinant of $A$.',
              answerOutline:
                '$\\det < 0$: saddle. $\\det > 0$: stable if tr < 0, unstable if tr > 0; node if $\\operatorname{tr}^2 > 4\\det$, spiral if less; centre if tr = 0.',
            },
            {
              question: 'When is linearisation about a fixed point trustworthy, and what is the classic exception?',
              answerOutline:
                'When the fixed point is hyperbolic (no eigenvalue with zero real part). A linear centre may become a spiral under nonlinear terms; a conserved quantity is needed to confirm closed orbits.',
            },
            {
              question: 'What is a separatrix in the pendulum phase plane?',
              answerOutline:
                'The energy contour through the saddle at $\\theta = \\pi$ ($E = 1$ in units where $E = \\tfrac12\\dot\\theta^2 - \\cos\\theta$); it separates libration from rotation.',
            },
          ],
        },
        {
          slug: 'laplace-transforms-and-series-solutions',
          title: 'Laplace transforms and series solutions',
          summary:
            'Turning initial-value problems into algebra with the Laplace transform, handling impulses and switches, and solving variable-coefficient equations with power series.',
          estimatedMinutes: 150,
          objectives: [
            'Define the Laplace transform, compute it for standard functions and derive the transform of derivatives',
            'Solve initial-value problems with discontinuous or impulsive forcing using step and delta functions',
            'Use convolution and the transfer function to describe linear systems',
            'Find power-series solutions about ordinary points and recognise regular singular points (Frobenius)',
            'Derive the Hermite or Legendre recurrence from a series ansatz and explain why quantisation emerges from termination',
          ],
          concepts: [
            'Laplace transform $F(s) = \\int_0^\\infty f(t)e^{-st}dt$',
            'Transform of derivatives encodes initial conditions',
            'Partial fractions and inversion',
            'Heaviside step and Dirac delta',
            'Transfer function and convolution theorem',
            'Power series about an ordinary point',
            'Regular singular points and the Frobenius method',
            'Recurrence relations and series termination',
          ],
          explanation: `The **Laplace transform** $F(s) = \\int_0^\\infty f(t)e^{-st}\\,dt$ converts differentiation into multiplication: $\\mathcal{L}[f'] = sF(s) - f(0)$ and $\\mathcal{L}[f''] = s^2F(s) - sf(0) - f'(0)$. An initial-value problem for a linear constant-coefficient ODE therefore becomes an *algebraic* equation for $F(s)$, with the initial conditions built in automatically. You solve for $F$, split it into partial fractions, and read off the inverse from a table. For the oscillator, $\\ddot x + 2\\gamma\\dot x + \\omega_0^2 x = f$ gives $X(s) = \\frac{F(s) + (s + 2\\gamma)x_0 + v_0}{s^2 + 2\\gamma s + \\omega_0^2}$; the denominator's roots are the characteristic roots, so nothing is lost and much is gained.

What is gained is the ability to handle **switched and impulsive inputs** cleanly. The Heaviside step $u(t - a)$ has transform $e^{-as}/s$, and the Dirac delta $\\delta(t - a)$ has transform $e^{-as}$; a hammer blow or a switched-on voltage is one line of algebra instead of a piecewise solution with matching conditions. The response to $\\delta(t)$ is the **impulse response** $h(t)$, whose transform $H(s) = 1/(s^2 + 2\\gamma s + \\omega_0^2)$ is the **transfer function**; the response to any input is then the **convolution** $x = h * f$, since $\\mathcal{L}[h * f] = HF$. This is the time-domain Green's function, and in engineering language it is the entire theory of linear time-invariant systems.

Equations with **variable coefficients**, such as Legendre's $(1-x^2)y'' - 2xy' + \\ell(\\ell+1)y = 0$ and Hermite's $y'' - 2xy' + 2ny = 0$, generally have no elementary solutions. The **power-series method** substitutes $y = \\sum a_k x^k$ and turns the ODE into a **recurrence relation** for the $a_k$. Something remarkable happens: the series diverges badly unless the parameter ($\\ell$ or $n$) is an integer that makes the recurrence terminate, leaving a polynomial. In quantum mechanics this termination condition *is* the quantisation of energy. Near a **regular singular point** (Bessel's equation at $x = 0$) use the **Frobenius** ansatz $y = x^r\\sum a_k x^k$ and first solve the indicial equation for $r$.

Work 18.03SC Unit 3 (Laplace transform, step and delta functions, convolution, transfer functions), then Paul's Notes on series solutions, and do the Hermite exercise carefully; it is the mathematical core of the quantum harmonic oscillator.`,
          resources: [
            {
              title: 'MIT 18.03SC — Unit 3: Fourier Series and Laplace Transform',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions on the Laplace transform, step and delta functions, convolution and the transfer function.',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Laplace Transforms",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/LaplaceIntro.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Includes a table of transforms and many worked IVPs with step functions and delta functions.',
            },
            {
              title: "Paul's Online Math Notes — Series Solutions to Differential Equations",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/SeriesSolutions.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
            },
            {
              title: '3Blue1Brown — The Laplace transform',
              url: 'https://www.3blue1brown.com/lessons/laplace-transform',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'A visual account of why $e^{-st}$ probes exponential and oscillatory content.',
            },
          ],
          exercises: [
            {
              slug: 'laplace-table',
              title: 'Build your own transform table',
              prompt:
                'Derive from the definition the Laplace transforms of $1$, $t^n$, $e^{at}$, $\\cos\\omega t$, $\\sin\\omega t$, $u(t-a)$ and $e^{at}f(t)$ (shift theorem), and the formulas for $\\mathcal{L}[f\']$ and $\\mathcal{L}[f\'\']$. Verify three of them with SymPy\'s `laplace_transform`.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'hammer-blow',
              title: 'Impulse and step responses',
              prompt:
                'Solve $\\ddot x + 2\\dot x + 5x = \\delta(t - 1)$ and $\\ddot x + 2\\dot x + 5x = u(t-1)$ with zero initial conditions using Laplace transforms. Plot both solutions, identify the impulse response $h(t)$, and verify numerically that the step response is the integral of the impulse response. Then compute the response to $f(t) = e^{-t}\\sin 3t$ as a convolution integral with `numpy.convolve` and compare with `solve_ivp`.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'hermite-series',
              title: 'Series solution of Hermite\'s equation',
              prompt:
                'Substitute $y = \\sum a_k x^k$ into $y\'\' - 2xy\' + 2ny = 0$ and derive the recurrence $a_{k+2} = \\frac{2(k-n)}{(k+1)(k+2)}a_k$. Show that for non-integer $n$ the series behaves like $e^{x^2}$ for large $x$ (compare ratios of coefficients), and that for integer $n$ it terminates. Write out $H_0..H_4$ and compare with `scipy.special.hermite`. Explain in a paragraph how this produces $E_n = \\hbar\\omega(n + \\tfrac12)$ in the quantum oscillator.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'frobenius-bessel',
              title: 'Frobenius method for Bessel\'s equation',
              prompt:
                'For $x^2y\'\' + xy\' + (x^2 - \\nu^2)y = 0$, show $x = 0$ is a regular singular point, find the indicial equation $r^2 = \\nu^2$, and derive the series for $J_0(x) = \\sum_k \\frac{(-1)^k}{(k!)^2}(x/2)^{2k}$. Sum 20 terms numerically and compare with `scipy.special.j0` on $[0, 10]$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Laplace transform turn an initial-value problem into algebra?',
              answerOutline:
                'Derivatives become multiplication by $s$ plus initial-condition terms, so a linear ODE with constant coefficients becomes a linear algebraic equation for $F(s)$.',
            },
            {
              question: 'What is the transfer function and how is it related to the impulse response and convolution?',
              answerOutline:
                '$H(s) = 1/(\\text{characteristic polynomial})$ is the transform of the impulse response $h(t)$; the response to input $f$ is $h * f$ because $\\mathcal{L}[h*f] = HF$.',
            },
            {
              question: 'Why does the power-series method lead to quantisation in Hermite\'s equation?',
              answerOutline:
                'The recurrence produces a series growing like $e^{x^2}$ (unnormalisable) unless the parameter is an integer that terminates it, giving polynomial solutions only for discrete values.',
            },
            {
              question: 'When do you need the Frobenius method rather than a plain power series?',
              answerOutline:
                'At a regular singular point, where coefficients blow up no faster than $1/x$ and $1/x^2$; the ansatz $x^r\\sum a_kx^k$ with $r$ from the indicial equation is needed.',
            },
          ],
        },
        {
          slug: 'calculus-of-variations',
          title: 'Calculus of variations and the Euler-Lagrange equation',
          summary:
            'Optimising over functions rather than numbers: deriving the Euler-Lagrange equation and applying it to the shortest path, the brachistochrone and the principle of least action.',
          estimatedMinutes: 150,
          objectives: [
            'Explain what a functional is and what it means for a function to make it stationary',
            'Derive the Euler-Lagrange equation from the first variation and integration by parts',
            'Solve classic problems: geodesics in the plane and on a sphere, the brachistochrone, the hanging chain',
            'Use the first integral (Beltrami identity) when the integrand has no explicit dependence on the independent variable',
            'Set up Hamilton\'s principle and obtain Newton\'s second law and conservation laws from a Lagrangian',
          ],
          concepts: [
            'Functional $J[y] = \\int F(x, y, y\')\\,dx$',
            'Variation $\\delta y$ and the first variation $\\delta J$',
            'Euler-Lagrange equation',
            'Natural and fixed boundary conditions',
            'Beltrami identity / first integral',
            'Constraints via Lagrange multipliers in functionals',
            'Hamilton\'s principle $\\delta\\int L\\,dt = 0$',
            'Cyclic coordinates and conserved momenta',
          ],
          explanation: `Ordinary calculus finds the number that makes a function stationary. The **calculus of variations** finds the *function* that makes a **functional** stationary, where a functional is a number computed from a whole function, such as the length of a curve $\\int\\sqrt{1 + y'^2}\\,dx$ or the time taken to slide down it. Fermat's principle (light takes the path of least time), Hamilton's principle (mechanics follows the path of stationary action) and every "minimum energy" argument are variational problems, which is why this lesson sits here even though the result is an ODE.

Take $J[y] = \\int_a^b F(x, y, y')\\,dx$ with $y(a), y(b)$ fixed. Perturb $y \\to y + \\epsilon\\eta(x)$ with $\\eta(a) = \\eta(b) = 0$ and demand $dJ/d\\epsilon = 0$ at $\\epsilon = 0$:

$$\\int_a^b \\left(\\frac{\\partial F}{\\partial y}\\eta + \\frac{\\partial F}{\\partial y'}\\eta'\\right)dx = 0 .$$

Integrate the second term by parts; the boundary term vanishes because $\\eta$ does, and since $\\eta$ is otherwise arbitrary the bracket must vanish identically:

$$\\frac{\\partial F}{\\partial y} - \\frac{d}{dx}\\frac{\\partial F}{\\partial y'} = 0 .$$

This is the **Euler-Lagrange equation**. Note the $d/dx$ is a *total* derivative along the solution. Two shortcuts are worth knowing. If $F$ does not contain $y$ explicitly, $\\partial F/\\partial y'$ is constant (a conserved "momentum"). If $F$ does not contain $x$ explicitly, the **Beltrami identity** $F - y'\\,\\partial F/\\partial y' = \\text{const}$ holds, which is energy conservation in disguise and reduces the brachistochrone to a first-order equation whose solution is a cycloid.

With $F = L(q, \\dot q, t) = T - V$ and $x = t$, the Euler-Lagrange equation reads $\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot q} = \\frac{\\partial L}{\\partial q}$, which for $L = \\tfrac12 m\\dot q^2 - V(q)$ is Newton's second law. The power of the method is that $q$ can be *any* coordinates, the equations come out correct automatically, and a coordinate absent from $L$ immediately yields a conserved momentum. Classical-mechanics subjects build on exactly this.

Constraints (a chain of fixed length, a normalised wavefunction) are handled by adding $\\lambda\\,G$ to the integrand, as in the Lagrange-multiplier lesson. Read Nearing's chapter 16 or the LibreTexts treatment, then the 8.01-level account of Hamilton's principle, and do every classic problem below by hand once.`,
          resources: [
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 16: Calculus of Variations',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
              note: 'Free full text; the chapter derives Euler-Lagrange carefully and treats several classic problems.',
              primary: true,
            },
            {
              title: 'LibreTexts Physics — Mathematical Physics and Pedagogy bookshelf',
              url: 'https://phys.libretexts.org/Bookshelves/Mathematical_Physics_and_Pedagogy/Mathematical_Methods',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Search within the bookshelf for "calculus of variations"; several texts cover the brachistochrone and Hamilton\'s principle.',
            },
            {
              title: 'The Feynman Lectures on Physics, Vol. II Chapter 19: The Principle of Least Action',
              url: 'https://www.feynmanlectures.caltech.edu/',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Feynman\'s famous lecture; read it after deriving Euler-Lagrange yourself.',
            },
            {
              title: 'Mathematical Methods in the Physical Sciences (Boas) — Chapter 9',
              url: 'https://en.wikipedia.org/wiki/Mathematical_Methods_in_the_Physical_Sciences',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wiley',
              note: 'The standard paid reference for this whole subject; Nearing above is the free alternative.',
            },
          ],
          exercises: [
            {
              slug: 'derive-euler-lagrange',
              title: 'Derive Euler-Lagrange and the Beltrami identity',
              prompt:
                'Carry out the derivation of the Euler-Lagrange equation in full, stating where each assumption ($\\eta$ vanishes at the ends, $\\eta$ arbitrary, smoothness) is used. Then show that when $\\partial F/\\partial x = 0$, $\\frac{d}{dx}\\left(F - y\'\\frac{\\partial F}{\\partial y\'}\\right) = 0$. Finally, show the shortest curve between two points in the plane is a straight line.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'brachistochrone',
              title: 'The brachistochrone',
              prompt:
                'A bead slides without friction from the origin to $(x_1, y_1)$ (y downward) under gravity. Write the travel time as a functional, apply the Beltrami identity, and show the solution is the cycloid $x = a(\\theta - \\sin\\theta)$, $y = a(1 - \\cos\\theta)$. Numerically compute the descent time along the cycloid, a straight line and a circular arc between $(0,0)$ and $(1, 0.5)$ (with $g = 1$) by quadrature and confirm the cycloid wins.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'geodesics-on-sphere',
              title: 'Geodesics on a sphere',
              prompt:
                'Write the arc length on a sphere of radius $R$ in spherical coordinates with $\\phi(\\theta)$ as the unknown function, use the fact that $\\phi$ is cyclic to get a first integral, and show the solutions are great circles. Verify numerically by computing the length of your solution and of a parallel of latitude between two points at the same latitude $60^\\circ$ separated by $90^\\circ$ of longitude.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'lagrangian-pendulum',
              title: 'From Lagrangian to equation of motion',
              prompt:
                'Write the Lagrangian for a pendulum of length $\\ell$ whose pivot is forced to move horizontally as $x_p(t) = A\\cos\\Omega t$. Derive the equation of motion with Euler-Lagrange, check it reduces to $\\ddot\\theta + (g/\\ell)\\sin\\theta = 0$ for $A = 0$, and simulate it for $\\Omega$ near twice the natural frequency to see parametric-style growth of small oscillations.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a function and a functional, and what does "stationary" mean for a functional?',
              answerOutline:
                'A functional maps functions to numbers; stationary means the first-order change vanishes for every admissible perturbation $\\eta$ of the function.',
            },
            {
              question: 'Where does integration by parts enter the derivation of Euler-Lagrange and why does the boundary term vanish?',
              answerOutline:
                'To move the derivative off $\\eta\'$ in $\\int F_{y\'}\\eta\'$; the boundary term $[F_{y\'}\\eta]_a^b$ vanishes because $\\eta(a) = \\eta(b) = 0$ (fixed endpoints).',
            },
            {
              question: 'What conservation law follows when the Lagrangian does not depend on a coordinate $q$?',
              answerOutline:
                '$\\partial L/\\partial q = 0$ implies $\\frac{d}{dt}(\\partial L/\\partial\\dot q) = 0$: the generalised momentum conjugate to $q$ is conserved.',
            },
            {
              question: 'What is the Beltrami identity and when can it be used?',
              answerOutline:
                '$F - y\' F_{y\'} = $ const, valid when $F$ has no explicit dependence on the independent variable; it is a first integral that lowers the order of the problem.',
            },
          ],
        },
      ],
      project: {
        slug: 'oscillator-explorer',
        title: 'Module project: an oscillator explorer',
        description:
          'Write a small Python package that solves the damped driven oscillator three ways (closed form, Laplace/transfer function, numerical integration) and compares them. Expose functions for the homogeneous solution in each damping regime, the steady-state amplitude and phase for sinusoidal forcing, the impulse response, and convolution with arbitrary forcing. Produce a report with resonance curves for several $Q$, a demonstration that the three methods agree to numerical precision, and a phase-plane animation of the transient.',
        deliverables: [
          'Python module with tests comparing the three solution methods',
          'Figures: damping regimes, resonance amplitude and phase, impulse and step responses, phase portrait',
          'Short written derivation of each formula used',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'vector-calculus',
      title: 'Vector Calculus',
      description:
        'The calculus of fields: gradient, divergence and curl, line and surface integrals, the integral theorems of Green, Stokes and Gauss, and curvilinear coordinates. The language of electromagnetism and fluid dynamics.',
      lessons: [
        {
          slug: 'vector-fields-div-grad-curl',
          title: 'Vector fields, divergence and curl',
          summary:
            'Scalar and vector fields, the three derivatives of vector calculus and their physical meaning as sources and circulation, plus the identities that follow.',
          estimatedMinutes: 150,
          objectives: [
            'Distinguish scalar and vector fields and visualise them with contour and quiver plots',
            'Compute $\\nabla f$, $\\nabla\\cdot\\mathbf{F}$ and $\\nabla\\times\\mathbf{F}$ in Cartesian coordinates and interpret each physically',
            'Prove and use the identities $\\nabla\\times\\nabla f = 0$ and $\\nabla\\cdot(\\nabla\\times\\mathbf{F}) = 0$',
            'Define the Laplacian and interpret it as the deviation from the local average',
            'Use index notation (Kronecker delta, Levi-Civita symbol) to verify vector identities',
          ],
          concepts: [
            'Scalar field, vector field',
            'Gradient $\\nabla f$',
            'Divergence $\\nabla\\cdot\\mathbf{F}$ as source density',
            'Curl $\\nabla\\times\\mathbf{F}$ as local rotation',
            'Laplacian $\\nabla^2 f$',
            'Irrotational and solenoidal fields',
            'Index notation, $\\delta_{ij}$ and $\\epsilon_{ijk}$',
            'Vector identities (product rules, $\\nabla\\times\\nabla\\times$)',
          ],
          explanation: `A **field** assigns a value to every point in space: temperature is a scalar field, wind velocity, electric field and gravitational acceleration are vector fields. Vector calculus is the set of derivatives and integrals that make sense for fields, and it is written with the operator $\\nabla = (\\partial_x, \\partial_y, \\partial_z)$.

The **gradient** of a scalar field you already know. The **divergence** of a vector field, $\\nabla\\cdot\\mathbf{F} = \\partial_x F_x + \\partial_y F_y + \\partial_z F_z$, measures the net outflow per unit volume from an infinitesimal box: positive where the field is being created (a source), negative where it disappears (a sink), zero for an incompressible flow. Gauss's law $\\nabla\\cdot\\mathbf{E} = \\rho/\\epsilon_0$ says charge is the source of electric field. The **curl**, $\\nabla\\times\\mathbf{F}$, measures the local circulation: put a tiny paddle wheel in the flow and the curl is twice its angular velocity, pointing along the axis. A field with zero curl is **irrotational**, one with zero divergence **solenoidal**. Faraday's law $\\nabla\\times\\mathbf{E} = -\\partial_t\\mathbf{B}$ says a changing magnetic field makes the electric field circulate.

The two identities you must know and understand are $\\nabla\\times(\\nabla f) = 0$ (gradients do not circulate; this is why a conservative force has a potential) and $\\nabla\\cdot(\\nabla\\times\\mathbf{A}) = 0$ (curls have no sources; this is why $\\nabla\\cdot\\mathbf{B} = 0$ lets us write $\\mathbf{B} = \\nabla\\times\\mathbf{A}$). Both are consequences of mixed partials commuting. The **Laplacian** $\\nabla^2 f = \\nabla\\cdot\\nabla f$ measures how much $f$ at a point differs from its average over a small surrounding sphere, which is why it appears in diffusion, in electrostatics ($\\nabla^2\\phi = -\\rho/\\epsilon_0$) and in the wave equation.

Vector identities such as $\\nabla\\times(\\nabla\\times\\mathbf{F}) = \\nabla(\\nabla\\cdot\\mathbf{F}) - \\nabla^2\\mathbf{F}$ are tedious by components but fast in **index notation**: write $(\\nabla\\times\\mathbf{F})_i = \\epsilon_{ijk}\\partial_j F_k$, use the summation convention and the identity $\\epsilon_{ijk}\\epsilon_{ilm} = \\delta_{jl}\\delta_{km} - \\delta_{jm}\\delta_{kl}$. Learn it now; it pays for itself in electromagnetism within a week.

Watch the 3Blue1Brown divergence-and-curl video, work 18.02SC Unit 4 Part B (div, curl in 3D), and read the Corral *Vector Calculus* chapter 4 for identities. The plotting exercise below is the fastest way to make divergence and curl intuitive.`,
          resources: [
            {
              title: 'MIT 18.02SC — Unit 4: Triple Integrals and Surface Integrals in 3-space (Part B: flux, divergence theorem, curl)',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: '3Blue1Brown — Divergence and curl',
              url: 'https://www.3blue1brown.com/lessons/divergence-and-curl',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'The fluid-flow picture of both operators.',
            },
            {
              title: 'Vector Calculus (Corral) — free textbook on LibreTexts',
              url: 'https://math.libretexts.org/Bookshelves/Calculus/Vector_Calculus_(Corral)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapter 4: line and surface integrals, div, grad, curl and the integral theorems, with exercises.',
            },
            {
              title: 'Vector Calculus for Engineers (Chasnov) — free lecture notes',
              url: 'https://www.math.hkust.edu.hk/~machas/vector-calculus-for-engineers.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'HKUST',
              note: 'Concise notes including index notation and the Levi-Civita identities.',
            },
          ],
          exercises: [
            {
              slug: 'visualise-div-curl',
              title: 'Visualise divergence and curl',
              prompt:
                'For the 2D fields $\\mathbf{F}_1 = (x, y)$, $\\mathbf{F}_2 = (-y, x)$, $\\mathbf{F}_3 = (y, 0)$ and $\\mathbf{F}_4 = (x^2 - y^2, 2xy)$: compute divergence and curl by hand; plot each field with `quiver` and colour the background by divergence, then by the $z$-component of curl computed with finite differences. Say which fields are gradients of a potential and find the potential where it exists.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'index-notation-identities',
              title: 'Vector identities in index notation',
              prompt:
                'Using $\\epsilon_{ijk}\\epsilon_{ilm} = \\delta_{jl}\\delta_{km} - \\delta_{jm}\\delta_{kl}$, prove: (a) $\\mathbf{A}\\times(\\mathbf{B}\\times\\mathbf{C}) = \\mathbf{B}(\\mathbf{A}\\cdot\\mathbf{C}) - \\mathbf{C}(\\mathbf{A}\\cdot\\mathbf{B})$; (b) $\\nabla\\times(\\nabla\\times\\mathbf{F}) = \\nabla(\\nabla\\cdot\\mathbf{F}) - \\nabla^2\\mathbf{F}$; (c) $\\nabla\\cdot(\\mathbf{F}\\times\\mathbf{G}) = \\mathbf{G}\\cdot(\\nabla\\times\\mathbf{F}) - \\mathbf{F}\\cdot(\\nabla\\times\\mathbf{G})$; (d) $\\nabla\\times\\nabla f = 0$. Verify (b) on $\\mathbf{F} = (xyz, y^2, xz^2)$ with SymPy.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'laplacian-as-average',
              title: 'The Laplacian as deviation from the mean',
              prompt:
                'Show that for a smooth $f$, the average of $f$ over a small sphere of radius $r$ centred at $\\mathbf{x}_0$ is $f(\\mathbf{x}_0) + \\frac{r^2}{6}\\nabla^2 f(\\mathbf{x}_0) + O(r^4)$ by Taylor expanding. Verify numerically for $f = x^2 + 2y^2 - z^2$ (so $\\nabla^2 f = 4$) by Monte Carlo averaging over random points on a sphere of radius $0.1$. Explain why a harmonic function ($\\nabla^2 f = 0$) cannot have an interior maximum.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give the physical meaning of divergence and curl in one sentence each.',
              answerOutline:
                'Divergence: net outflow per unit volume (source density). Curl: local circulation / twice the angular velocity of a small paddle wheel, directed along the rotation axis.',
            },
            {
              question: 'Why is $\\nabla\\times\\nabla f = 0$ and what physical consequence does it have?',
              answerOutline:
                'Components are differences of mixed partials, which commute. Consequence: a curl-free (conservative) field can be written as a gradient of a potential; work is path-independent.',
            },
            {
              question: 'What does $\\nabla^2 f > 0$ at a point tell you?',
              answerOutline:
                '$f$ there is below its local average, so the point is a local "valley" in the mean-curvature sense; in heat flow it would warm up.',
            },
            {
              question: 'Write the curl in index notation and the $\\epsilon\\epsilon$ identity.',
              answerOutline:
                '$(\\nabla\\times\\mathbf{F})_i = \\epsilon_{ijk}\\partial_jF_k$; $\\epsilon_{ijk}\\epsilon_{ilm} = \\delta_{jl}\\delta_{km} - \\delta_{jm}\\delta_{kl}$.',
            },
          ],
        },
        {
          slug: 'line-and-surface-integrals',
          title: 'Line integrals, surface integrals and flux',
          summary:
            'Integrating along curves and over surfaces: work, circulation, flux, conservative fields and potentials, and parametrising curves and surfaces.',
          estimatedMinutes: 150,
          objectives: [
            'Parametrise curves and surfaces and compute $d\\mathbf{r}$, $d\\mathbf{S}$ and $dS$',
            'Evaluate line integrals of scalar and vector fields (arc length, work, circulation)',
            'Test whether a field is conservative, find its potential, and use the fundamental theorem for line integrals',
            'Evaluate surface integrals and flux integrals, including through spheres and cylinders',
            'Explain why the work done by a conservative force is path independent and relate this to energy conservation',
          ],
          concepts: [
            'Parametrised curve $\\mathbf{r}(t)$, tangent vector',
            'Line integral $\\int \\mathbf{F}\\cdot d\\mathbf{r}$ (work, circulation)',
            'Conservative field, potential, path independence',
            'Fundamental theorem for line integrals',
            'Parametrised surface, normal vector $\\mathbf{r}_u\\times\\mathbf{r}_v$',
            'Surface element $dS$ and vector element $d\\mathbf{S} = \\hat{\\mathbf{n}}\\,dS$',
            'Flux integral $\\iint\\mathbf{F}\\cdot d\\mathbf{S}$',
            'Orientation of curves and surfaces',
          ],
          explanation: `Work is force times displacement, so the work done by a force field along a path is the **line integral** $W = \\int_C \\mathbf{F}\\cdot d\\mathbf{r}$. Parametrise the curve as $\\mathbf{r}(t)$, $a \\le t \\le b$, and the integral becomes an ordinary one: $\\int_a^b \\mathbf{F}(\\mathbf{r}(t))\\cdot\\mathbf{r}'(t)\\,dt$. The same integral measures **circulation** around a closed loop, written $\\oint$. Scalar line integrals $\\int_C f\\,ds$ with $ds = |\\mathbf{r}'(t)|\\,dt$ give arc length, mass of a wire, and so on.

The central fact about line integrals is the **fundamental theorem**: if $\\mathbf{F} = \\nabla\\phi$ then $\\int_C\\mathbf{F}\\cdot d\\mathbf{r} = \\phi(\\mathbf{r}_{end}) - \\phi(\\mathbf{r}_{start})$, independent of the path. Such fields are **conservative**; the work around any closed loop is zero, and defining $V = -\\phi$ gives potential energy and energy conservation. The test is $\\nabla\\times\\mathbf{F} = 0$ (on a simply connected domain, a caveat that matters for the magnetic field of a wire). To find $\\phi$, integrate $F_x$ with respect to $x$, differentiate the result with respect to $y$ and match against $F_y$, and so on.

A **surface** is parametrised by two variables, $\\mathbf{r}(u, v)$; the vectors $\\mathbf{r}_u$ and $\\mathbf{r}_v$ are tangent, so $\\mathbf{r}_u\\times\\mathbf{r}_v$ is normal and its magnitude is the area of the little parallelogram: $d\\mathbf{S} = (\\mathbf{r}_u\\times\\mathbf{r}_v)\\,du\\,dv$. For a sphere of radius $R$ this gives $d\\mathbf{S} = R^2\\sin\\theta\\,\\hat{\\mathbf{r}}\\,d\\theta\\,d\\phi$, consistent with the solid-angle lesson. The **flux** $\\iint_S\\mathbf{F}\\cdot d\\mathbf{S}$ counts how much of the field passes through the surface: fluid volume per second, electric flux in Gauss's law, magnetic flux in Faraday's law. The sign depends on the chosen orientation of $\\hat{\\mathbf{n}}$, so always state it (outward for closed surfaces).

Symmetry does most of the work in physics. The flux of a radial field $\\mathbf{F} = f(r)\\hat{\\mathbf{r}}$ through a sphere is just $4\\pi r^2 f(r)$ because $\\mathbf{F}\\parallel d\\mathbf{S}$ and $|\\mathbf{F}|$ is constant on the sphere; this is how Gauss's law becomes a one-line calculation for spheres, cylinders and planes.

Work 18.02SC Unit 3 Part B (line integrals, conservative fields) and Unit 4 Part B (surface integrals and flux), reading Corral chapter 4 alongside. Then compute every integral in the exercises both by hand and by brute-force numerical integration of the parametrised form, which doubles as a check of your parametrisations.`,
          resources: [
            {
              title: 'MIT 18.02SC — Unit 3 Part B: Vector Fields and Line Integrals; Unit 4 Part B: Flux and the Divergence Theorem',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Surface Integrals",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcIII/SurfaceIntegrals.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Parametrising surfaces, orientation and flux with many worked examples.',
            },
            {
              title: 'Vector Calculus (Corral) — Chapter 4',
              url: 'https://math.libretexts.org/Bookshelves/Calculus/Vector_Calculus_(Corral)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
            },
          ],
          exercises: [
            {
              slug: 'work-along-paths',
              title: 'Path dependence of work',
              prompt:
                'Compute $\\int_C\\mathbf{F}\\cdot d\\mathbf{r}$ for $\\mathbf{F} = (y, -x)$ and for $\\mathbf{G} = (2xy, x^2)$ from $(0,0)$ to $(1,1)$ along (a) the straight line, (b) the parabola $y = x^2$, (c) the two legs of the square. Explain the results via curl, find the potential of $\\mathbf{G}$, and confirm the path independence with the fundamental theorem. Check all six integrals numerically.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'flux-through-surfaces',
              title: 'Flux through a sphere, a cylinder and a paraboloid',
              prompt:
                'Compute the outward flux of $\\mathbf{F} = (x, y, z)$ through the sphere of radius $R$ (answer $4\\pi R^3$) and of $\\mathbf{F} = (x, y, 0)$ through the closed cylinder $x^2 + y^2 \\le 1$, $0 \\le z \\le 2$ (answer $4\\pi$), by direct parametrisation. Then compute the flux of $\\mathbf{F} = (0, 0, z)$ upward through the paraboloid $z = 1 - x^2 - y^2$, $z \\ge 0$, and check numerically with `dblquad`.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'magnetic-field-of-wire',
              title: 'A curl-free field that is not conservative',
              prompt:
                'The field $\\mathbf{B} = \\frac{(-y, x, 0)}{x^2 + y^2}$ (the field of a long wire, up to constants) has $\\nabla\\times\\mathbf{B} = 0$ away from the $z$-axis. Compute $\\oint\\mathbf{B}\\cdot d\\mathbf{r}$ around the unit circle (answer $2\\pi$) and around a circle not enclosing the axis (answer 0). Explain why the fundamental theorem does not apply and what this has to do with the domain not being simply connected.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the fundamental theorem for line integrals and its physical meaning.',
              answerOutline:
                '$\\int_C\\nabla\\phi\\cdot d\\mathbf{r} = \\phi(B) - \\phi(A)$: work by a conservative force depends only on endpoints, so potential energy is well defined and mechanical energy is conserved.',
            },
            {
              question: 'How do you compute the vector surface element of a parametrised surface?',
              answerOutline:
                '$d\\mathbf{S} = (\\mathbf{r}_u\\times\\mathbf{r}_v)\\,du\\,dv$; the cross product is normal and its length is the area element.',
            },
            {
              question: 'Why is the flux of $f(r)\\hat{\\mathbf{r}}$ through a sphere simply $4\\pi r^2 f(r)$?',
              answerOutline:
                'The field is parallel to the outward normal and constant in magnitude on the sphere, so the integral is $|\\mathbf{F}|$ times the area.',
            },
            {
              question: 'Under what condition does zero curl guarantee a field is conservative?',
              answerOutline:
                'The domain must be simply connected; around a hole (e.g. a wire) a curl-free field can still have nonzero circulation.',
            },
          ],
        },
        {
          slug: 'integral-theorems',
          title: 'Green, Stokes and the divergence theorem',
          summary:
            'The three integral theorems that relate derivatives inside a region to values on its boundary, why they are all the same theorem, and how they turn Maxwell\'s equations between integral and differential form.',
          estimatedMinutes: 180,
          objectives: [
            'State Green\'s theorem, Stokes\' theorem and the divergence (Gauss) theorem with correct orientations',
            'Sketch the proof idea of each theorem from the box/parallelogram definitions of div and curl',
            'Use the theorems to convert between line, surface and volume integrals and to evaluate integrals efficiently',
            'Derive the differential form of Gauss\'s law and Ampère\'s law from the integral form and vice versa',
            'Derive the continuity equation and Green\'s identities',
          ],
          concepts: [
            'Green\'s theorem in the plane',
            'Stokes\' theorem $\\oint\\mathbf{F}\\cdot d\\mathbf{r} = \\iint(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}$',
            'Divergence theorem $\\oiint\\mathbf{F}\\cdot d\\mathbf{S} = \\iiint\\nabla\\cdot\\mathbf{F}\\,dV$',
            'Orientation and the right-hand rule',
            'Continuity equation $\\partial_t\\rho + \\nabla\\cdot\\mathbf{J} = 0$',
            'Integral vs differential form of Maxwell\'s equations',
            'Green\'s identities',
            'Generalised Stokes theorem (boundary of boundary is zero)',
          ],
          explanation: `The fundamental theorem of calculus says that integrating a derivative over an interval gives the function's values at the two endpoints. The three great theorems of vector calculus say the same thing in two and three dimensions: the integral of a derivative over a region equals an integral of the field over the region's **boundary**.

The **divergence theorem** states $\\oiint_{\\partial V}\\mathbf{F}\\cdot d\\mathbf{S} = \\iiint_V\\nabla\\cdot\\mathbf{F}\\,dV$ with outward normal. The proof idea is just the definition of divergence: chop $V$ into tiny boxes, the flux out of each box is $(\\nabla\\cdot\\mathbf{F})\\,dV$, and flux through interior faces cancels between neighbouring boxes, leaving only the outer surface. **Stokes' theorem** states $\\oint_{\\partial S}\\mathbf{F}\\cdot d\\mathbf{r} = \\iint_S(\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{S}$, with the curve oriented by the right-hand rule relative to $\\hat{\\mathbf{n}}$; the proof chops $S$ into tiny loops whose interior edges cancel. **Green's theorem** is Stokes in the plane: $\\oint(P\\,dx + Q\\,dy) = \\iint(Q_x - P_y)\\,dA$.

These theorems are how physics moves between *local* and *global* statements. Gauss's law in integral form, "flux of $\\mathbf{E}$ out of any closed surface equals enclosed charge over $\\epsilon_0$", becomes $\\nabla\\cdot\\mathbf{E} = \\rho/\\epsilon_0$ by applying the divergence theorem and noting the volume is arbitrary. Ampère's law goes from circulation to $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}$ via Stokes. Conservation of charge, "the charge in $V$ decreases at the rate current flows out", becomes the **continuity equation** $\\partial_t\\rho + \\nabla\\cdot\\mathbf{J} = 0$, which has the same form for mass, energy and probability.

Two consequences are worth internalising. Since $\\nabla\\cdot(\\nabla\\times\\mathbf{A}) = 0$, the flux of a curl through any *closed* surface is zero (Stokes with no boundary), and since $\\nabla\\times\\nabla\\phi = 0$, the circulation of a gradient is zero. Both are the statement "the boundary of a boundary is empty", the single idea that unifies all these theorems in differential-forms language. Finally, applying the divergence theorem to $\\phi\\nabla\\psi$ gives **Green's identities**, the tool for uniqueness proofs in electrostatics and for Green's functions.

Work 18.02SC Unit 3 Part C (Green's theorem) and Unit 4 Parts B-C (divergence theorem, Stokes). Paul's Notes pages for Stokes and the divergence theorem have many worked integrals. Then do the Maxwell exercise; it is the point of the module.`,
          resources: [
            {
              title: 'MIT 18.02SC — Unit 3 Part C: Green\'s Theorem; Unit 4 Part C: Line Integrals and Stokes\' Theorem',
              url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Includes the proof sketches and the physical applications sessions.',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Stokes' Theorem",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcIII/StokesTheorem.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
            },
            {
              title: "Paul's Online Math Notes — Divergence Theorem",
              url: 'https://tutorial.math.lamar.edu/Classes/CalcIII/DivergenceTheorem.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
            },
            {
              title: 'The Feynman Lectures on Physics, Vol. II Chapters 2-3: Differential and Integral Calculus of Vector Fields',
              url: 'https://www.feynmanlectures.caltech.edu/',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Feynman\'s physical derivation of both theorems and their use in electromagnetism.',
            },
          ],
          exercises: [
            {
              slug: 'verify-theorems-numerically',
              title: 'Verify all three theorems numerically',
              prompt:
                'For $\\mathbf{F} = (xy, yz, zx)$: (a) verify the divergence theorem on the unit cube by computing both sides (answer $3/2$); (b) verify Stokes on the hemisphere $z = \\sqrt{1 - x^2 - y^2}$ with boundary the unit circle; (c) verify Green\'s theorem for $(P, Q) = (-y^2, x^2)$ on the triangle $(0,0),(1,0),(0,1)$. Do each by hand and with numerical quadrature of the parametrised integrals.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'maxwell-integral-to-differential',
              title: 'Maxwell\'s equations: integral to differential form',
              prompt:
                'Starting from the integral forms of Gauss\'s law, Gauss\'s law for magnetism, Faraday\'s law and Ampère-Maxwell, derive the four differential equations using the divergence and Stokes theorems and the arbitrariness of the region. Then derive the continuity equation by taking the divergence of Ampère-Maxwell and using Gauss\'s law, and explain why Maxwell\'s displacement-current term was necessary for consistency.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'greens-identities-uniqueness',
              title: 'Green\'s identities and uniqueness',
              prompt:
                'Derive Green\'s first identity $\\iiint(\\phi\\nabla^2\\psi + \\nabla\\phi\\cdot\\nabla\\psi)\\,dV = \\oiint\\phi\\nabla\\psi\\cdot d\\mathbf{S}$ from the divergence theorem. Use it with $\\phi = \\psi = u_1 - u_2$ to prove that two solutions of $\\nabla^2 u = -\\rho/\\epsilon_0$ in a volume with the same boundary values must be identical. Explain why this justifies the method of images.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'area-by-green',
              title: 'Area from a boundary integral',
              prompt:
                'Show from Green\'s theorem that the area of a plane region is $\\tfrac12\\oint(x\\,dy - y\\,dx)$. Use it to compute the area of an ellipse and of the astroid $x = \\cos^3 t, y = \\sin^3 t$ (answer $3\\pi/8$). Then implement the shoelace formula for a polygon and explain why it is the same theorem.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'State the divergence theorem and Stokes\' theorem with their orientation conventions.',
              answerOutline:
                'Divergence: flux out through the closed boundary (outward normal) equals volume integral of div. Stokes: circulation around the boundary curve, oriented by the right-hand rule with the surface normal, equals flux of curl through the surface.',
            },
            {
              question: 'Explain in one paragraph why the divergence theorem is true.',
              answerOutline:
                'Divergence is flux per unit volume out of a tiny box; summing over boxes filling $V$, interior faces cancel in pairs, leaving the flux through the outer boundary.',
            },
            {
              question: 'How does the integral form of Gauss\'s law become $\\nabla\\cdot\\mathbf{E} = \\rho/\\epsilon_0$?',
              answerOutline:
                'Apply the divergence theorem to the flux, write enclosed charge as $\\int\\rho\\,dV$, and since the volume is arbitrary the integrands must be equal.',
            },
            {
              question: 'Why is the flux of $\\nabla\\times\\mathbf{A}$ through any closed surface zero?',
              answerOutline:
                'By the divergence theorem it equals $\\int\\nabla\\cdot(\\nabla\\times\\mathbf{A})\\,dV = 0$; equivalently, a closed surface has no boundary curve for Stokes.',
            },
          ],
        },
        {
          slug: 'curvilinear-coordinates',
          title: 'Div, grad, curl and the Laplacian in curvilinear coordinates',
          summary:
            'Scale factors and the general formulas for gradient, divergence, curl and Laplacian in orthogonal curvilinear coordinates, specialised to cylindrical and spherical systems.',
          estimatedMinutes: 150,
          objectives: [
            'Define scale factors $h_i$ for an orthogonal coordinate system and compute them for cylindrical and spherical coordinates',
            'Derive the gradient, divergence, curl and Laplacian in terms of scale factors',
            'Write down (or quickly re-derive) the spherical and cylindrical Laplacian',
            'Explain why extra terms appear (position-dependent unit vectors) and verify a formula numerically',
            'Solve symmetric problems (radial fields, Laplace\'s equation with spherical symmetry) directly in the natural coordinates',
          ],
          concepts: [
            'Orthogonal curvilinear coordinates',
            'Scale factors $h_i = |\\partial\\mathbf{r}/\\partial q_i|$',
            'Gradient $\\nabla f = \\sum\\frac{1}{h_i}\\frac{\\partial f}{\\partial q_i}\\hat{\\mathbf{e}}_i$',
            'Divergence and curl from flux/circulation of a coordinate box',
            'Laplacian in cylindrical and spherical coordinates',
            'Position-dependent unit vectors',
            'Radial Laplacian $\\frac{1}{r^2}\\frac{d}{dr}(r^2\\frac{df}{dr})$',
            'Angular part of the Laplacian (preview of spherical harmonics)',
          ],
          explanation: `Physics problems with spherical or cylindrical symmetry are miserable in Cartesian coordinates and trivial in the right ones, but only if you have the vector operators in those coordinates. The general machinery is simple. In **orthogonal curvilinear coordinates** $(q_1, q_2, q_3)$, moving $dq_i$ displaces you by $h_i\\,dq_i$ along the unit vector $\\hat{\\mathbf{e}}_i$, where the **scale factor** is $h_i = |\\partial\\mathbf{r}/\\partial q_i|$. For cylindrical coordinates $(h_r, h_\\phi, h_z) = (1, r, 1)$; for spherical $(h_r, h_\\theta, h_\\phi) = (1, r, r\\sin\\theta)$. The volume element is $h_1h_2h_3\\,dq_1dq_2dq_3$, which recovers the Jacobians of the multivariable module.

The operators follow from their coordinate-free definitions. The gradient is the rate of change per unit *distance*, so $\\nabla f = \\sum_i \\frac{1}{h_i}\\frac{\\partial f}{\\partial q_i}\\hat{\\mathbf{e}}_i$. Divergence is flux per unit volume out of the coordinate box, whose faces have areas like $h_2h_3\\,dq_2dq_3$, giving

$$\\nabla\\cdot\\mathbf{F} = \\frac{1}{h_1h_2h_3}\\left[\\frac{\\partial}{\\partial q_1}(h_2h_3F_1) + \\frac{\\partial}{\\partial q_2}(h_3h_1F_2) + \\frac{\\partial}{\\partial q_3}(h_1h_2F_3)\\right].$$

Curl is circulation per unit area around each face, and the Laplacian is $\\nabla\\cdot\\nabla f$. Specialising to spherical coordinates gives the formula you will use in the hydrogen atom and in every multipole expansion:

$$\\nabla^2 f = \\frac{1}{r^2}\\frac{\\partial}{\\partial r}\\left(r^2\\frac{\\partial f}{\\partial r}\\right) + \\frac{1}{r^2\\sin\\theta}\\frac{\\partial}{\\partial\\theta}\\left(\\sin\\theta\\frac{\\partial f}{\\partial\\theta}\\right) + \\frac{1}{r^2\\sin^2\\theta}\\frac{\\partial^2 f}{\\partial\\phi^2}.$$

The "extra" terms compared to Cartesian coordinates all come from the unit vectors changing direction with position; the scale-factor derivation hides this bookkeeping, which is why it is the method to learn. Do not try to memorise the curl formulas; memorise the derivation and the table of scale factors.

Immediate payoffs: $\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 0$ for $r > 0$ (the Coulomb field is divergence-free away from the charge), the radial solutions of Laplace's equation are $A + B/r$, and the angular part of the Laplacian is the operator whose eigenfunctions are the spherical harmonics (PDE module). Read Corral section 4.6 and the Chasnov notes, then derive the spherical Laplacian yourself once, slowly.`,
          resources: [
            {
              title: 'Vector Calculus (Corral) — Section 4.6: Gradient, Divergence, Curl and Laplacian in curvilinear coordinates',
              url: 'https://math.libretexts.org/Bookshelves/Calculus/Vector_Calculus_(Corral)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              primary: true,
            },
            {
              title: 'Vector Calculus for Engineers (Chasnov) — curvilinear coordinates chapter',
              url: 'https://www.math.hkust.edu.hk/~machas/vector-calculus-for-engineers.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'HKUST',
            },
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 9: Vector Calculus 1',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
              note: 'The scale-factor derivation of divergence and the Laplacian.',
            },
          ],
          exercises: [
            {
              slug: 'derive-spherical-laplacian',
              title: 'Derive the spherical Laplacian',
              prompt:
                'Starting from the scale factors, derive the gradient and divergence in spherical coordinates and combine them into the Laplacian. Verify with SymPy by taking $f = x^2 z$ in Cartesian form, computing $\\nabla^2 f = 2z$, converting $f$ to spherical form and applying your formula.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'coulomb-divergence',
              title: 'Divergence of the Coulomb field',
              prompt:
                'Show using the spherical divergence formula that $\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 0$ for $r > 0$, yet the flux through any sphere around the origin is $4\\pi$. Reconcile this with the divergence theorem by explaining what $\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 4\\pi\\delta^3(\\mathbf{r})$ means. Then compute $\\nabla^2(1/r)$ for $r > 0$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cylindrical-curl-solenoid',
              title: 'Curl in cylindrical coordinates',
              prompt:
                'Derive the curl in cylindrical coordinates from the circulation definition. Apply it to $\\mathbf{B} = \\frac{\\mu_0 I r}{2\\pi a^2}\\hat{\\boldsymbol\\phi}$ (inside a wire of radius $a$) and to $\\mathbf{B} = \\frac{\\mu_0 I}{2\\pi r}\\hat{\\boldsymbol\\phi}$ (outside) to recover the current density via $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}$. Check both with a finite-difference curl computed in Cartesian components on a grid.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'radial-laplace-solutions',
              title: 'Spherically symmetric solutions of Laplace and Poisson',
              prompt:
                'Solve $\\nabla^2\\phi = 0$ for spherically symmetric $\\phi(r)$ to get $A + B/r$. Then solve $\\nabla^2\\phi = -\\rho_0/\\epsilon_0$ inside a uniformly charged sphere of radius $R$ and match to the exterior solution to obtain the potential everywhere; plot it and the field $-d\\phi/dr$, checking continuity at $R$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a scale factor and what are they for spherical coordinates?',
              answerOutline:
                '$h_i = |\\partial\\mathbf{r}/\\partial q_i|$, the distance moved per unit change of coordinate; spherical: $h_r = 1, h_\\theta = r, h_\\phi = r\\sin\\theta$.',
            },
            {
              question: 'Why does the divergence formula in curvilinear coordinates contain products of scale factors inside the derivatives?',
              answerOutline:
                'Flux through a face is the component times the face area $h_jh_k\\,dq_jdq_k$, and both the component and the area vary with $q_i$, so the derivative acts on the product.',
            },
            {
              question: 'Write the radial part of the spherical Laplacian and give its two independent homogeneous solutions.',
              answerOutline:
                '$\\frac{1}{r^2}\\frac{d}{dr}(r^2 f\')$; solutions $f = $ const and $f = 1/r$.',
            },
            {
              question: 'What is the origin of the "extra terms" in curvilinear vector derivatives?',
              answerOutline:
                'The unit vectors depend on position, so differentiating a vector field differentiates the basis as well as the components.',
            },
          ],
        },
      ],
      project: {
        slug: 'field-visualiser-and-theorem-checker',
        title: 'Module project: a field visualiser and integral-theorem checker',
        description:
          'Build a Python toolkit that takes a vector field (as a Python function or a SymPy expression) and (1) plots it with divergence and curl maps, (2) numerically evaluates line, surface and volume integrals over user-specified parametrised curves, surfaces and regions, and (3) verifies Stokes and the divergence theorem to a stated tolerance. Use it to check the Coulomb field, the field of a current loop and a vortex flow, and to demonstrate the failure of the fundamental theorem on a non-simply-connected domain.',
        deliverables: [
          'Python module with tests for each integral type against closed-form results',
          'Gallery of figures for at least four physical fields with divergence and curl maps',
          'Short report explaining each theorem check and one case where it must fail',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'fourier-and-complex-analysis',
      title: 'Fourier and Complex Analysis',
      description:
        'Expanding functions in sines, cosines and complex exponentials, the Fourier transform and the delta function, and the complex-variable techniques that evaluate the integrals physics needs.',
      lessons: [
        {
          slug: 'fourier-series',
          title: 'Fourier series',
          summary:
            'Representing periodic functions as sums of sines and cosines (or complex exponentials): coefficients by orthogonality, convergence, Parseval\'s theorem and solving driven and heat problems mode by mode.',
          estimatedMinutes: 180,
          objectives: [
            'Derive the Fourier coefficient formulas from orthogonality of sines, cosines and complex exponentials',
            'Compute Fourier series of standard waveforms (square, sawtooth, triangle) and exploit symmetry',
            'State the convergence behaviour, including the Gibbs phenomenon at discontinuities',
            'Use Parseval\'s theorem to relate energy in a signal to its spectrum and to sum series',
            'Solve a linear ODE with periodic forcing term by term and explain why the method works',
          ],
          concepts: [
            'Periodic function, fundamental frequency, harmonics',
            'Orthogonality on an interval',
            'Fourier coefficients $a_n, b_n$ and complex $c_n$',
            'Even/odd functions and half-range series',
            'Pointwise convergence and Gibbs phenomenon',
            'Parseval\'s theorem',
            'Spectrum / amplitude of harmonics',
            'Superposition: solving linear equations harmonic by harmonic',
          ],
          explanation: `A function with period $2L$ can be written as a sum of harmonics of the fundamental frequency:

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty\\left[a_n\\cos\\frac{n\\pi x}{L} + b_n\\sin\\frac{n\\pi x}{L}\\right],\\qquad a_n = \\frac{1}{L}\\int_{-L}^{L} f(x)\\cos\\frac{n\\pi x}{L}\\,dx,\\quad b_n = \\frac{1}{L}\\int_{-L}^{L} f(x)\\sin\\frac{n\\pi x}{L}\\,dx .$$

The coefficient formulas are nothing but the orthonormal-basis rule from linear algebra: the functions $\\cos(n\\pi x/L)$ and $\\sin(n\\pi x/L)$ are mutually orthogonal under $\\int_{-L}^L$, so projecting $f$ onto each basis function extracts its coefficient. The **complex form** $f = \\sum_{n=-\\infty}^\\infty c_n e^{in\\pi x/L}$ with $c_n = \\frac{1}{2L}\\int f e^{-in\\pi x/L}dx$ is tidier and is what the Fourier transform generalises. Even functions have only cosines, odd functions only sines; a function on $[0, L]$ can be extended either way to give a **half-range** series, which is how boundary conditions get built in when solving PDEs.

Why physicists care: linear systems respond to each harmonic *independently*. A driven oscillator with a square-wave force responds with the resonance curve applied to each harmonic separately, and the heat equation damps each spatial harmonic at its own rate $e^{-\\kappa n^2\\pi^2 t/L^2}$. Fourier series turn linear differential equations into algebra, one mode at a time, and the PDE module relies on this completely.

Convergence has a characteristic quirk. At a jump discontinuity the series converges to the midpoint, and the partial sums overshoot by about 9% of the jump no matter how many terms you keep: the **Gibbs phenomenon**. Coefficients of a discontinuous function decay like $1/n$, of a continuous function with a kink like $1/n^2$, and of a smooth function faster than any power; the smoothness of $f$ is visible in its spectrum. **Parseval's theorem**, $\\frac{1}{L}\\int_{-L}^L|f|^2dx = \\frac{a_0^2}{2} + \\sum(a_n^2 + b_n^2)$, says the energy of a signal is the sum of the energies of its harmonics and, as a bonus, evaluates sums like $\\sum 1/n^2 = \\pi^2/6$.

Work 18.03SC Unit 3 (Fourier series sessions) and Paul's Notes Fourier series chapter, and watch the 3Blue1Brown video for the rotating-vector picture. Then compute and plot partial sums for the standard waveforms; seeing Gibbs appear with your own code makes the convergence theory concrete.`,
          resources: [
            {
              title: 'MIT 18.03SC — Unit 3: Fourier Series',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sessions on Fourier series basics, operations on series, periodic solutions and resonance.',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Fourier Series",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/FourierSeries.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Includes sine and cosine series and convergence.',
            },
            {
              title: '3Blue1Brown — But what is a Fourier series?',
              url: 'https://www.3blue1brown.com/lessons/fourier-series',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Complex exponentials as rotating vectors; watch before the complex form.',
            },
            {
              title: 'Introduction to Partial Differential Equations (Herman) — Fourier series chapters',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'A physics-oriented treatment that continues into the PDE module.',
            },
          ],
          exercises: [
            {
              slug: 'standard-waveforms',
              title: 'Fourier series of standard waveforms',
              prompt:
                'Compute by hand the Fourier series of the square wave ($f = 1$ on $(0,\\pi)$, $-1$ on $(-\\pi, 0)$), the sawtooth $f = x$ on $(-\\pi,\\pi)$, and the triangle wave $f = |x|$. Note the decay rate of the coefficients in each case and relate it to smoothness. Plot partial sums with $N = 1, 5, 20, 100$ terms and measure the Gibbs overshoot of the square wave (expected about 1.179 for a jump from -1 to 1).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'parseval-basel',
              title: 'Parseval and the Basel problem',
              prompt:
                'Derive Parseval\'s theorem from orthogonality. Apply it to the sawtooth series to show $\\sum_{n=1}^\\infty 1/n^2 = \\pi^2/6$, and to $f = x^2$ on $(-\\pi,\\pi)$ to obtain $\\sum 1/n^4 = \\pi^4/90$. Check both numerically by direct summation to $10^6$ terms.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'driven-oscillator-square-wave',
              title: 'Square-wave-driven oscillator, harmonic by harmonic',
              prompt:
                'Drive $\\ddot x + 0.2\\dot x + x = f(t)$ with a square wave of period $T$. Expand $f$ in Fourier series, apply the steady-state response formula from the oscillator lesson to each harmonic, and sum. For $T = 2\\pi$, $2\\pi/3$ and $6\\pi$ compare the series solution (50 harmonics) with a long `solve_ivp` run, and explain which harmonic resonates in each case.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'numerical-fourier-coefficients',
              title: 'Coefficients by numerical integration and by FFT',
              prompt:
                'Write a function that computes $c_n$ for $|n| \\le N$ by numerical quadrature for any periodic $f$. Then compute them with `numpy.fft.fft` on $M$ equally spaced samples and show the two agree for $|n| \\ll M$. Explain the normalisation and the ordering of the FFT output, and what happens to the agreement as $|n|$ approaches $M/2$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where do the formulas for Fourier coefficients come from?',
              answerOutline:
                'Orthogonality: multiply $f$ by a basis function and integrate; every other term vanishes, leaving the coefficient times the norm squared of the basis function.',
            },
            {
              question: 'What is the Gibbs phenomenon and does it go away with more terms?',
              answerOutline:
                'A roughly 9% overshoot of partial sums near a jump; its width shrinks but its height does not, so pointwise convergence holds but uniform convergence fails.',
            },
            {
              question: 'How does the smoothness of $f$ show up in its Fourier coefficients?',
              answerOutline:
                'Jumps give $1/n$ decay, kinks $1/n^2$, each extra continuous derivative one more power; analytic functions have exponentially decaying coefficients.',
            },
            {
              question: 'State Parseval\'s theorem and its physical meaning.',
              answerOutline:
                'Mean square of $f$ equals the sum of squared coefficients (suitably normalised): total energy is the sum of the energies of the harmonics.',
            },
          ],
        },
        {
          slug: 'fourier-transform',
          title: 'The Fourier transform',
          summary:
            'Extending Fourier series to non-periodic functions: the transform pair, key properties, the Gaussian and the uncertainty principle, convolution, and the connection to the discrete transform.',
          estimatedMinutes: 180,
          objectives: [
            'Derive the Fourier transform as the limit of a Fourier series as the period goes to infinity',
            'Compute transforms of the Gaussian, exponential decay, rectangle and derivative, and use the shift and scaling theorems',
            'State and prove the convolution theorem and explain its role in linear systems and in smoothing',
            'Explain the time-bandwidth (uncertainty) relation and its quantum interpretation',
            'Relate the continuous transform to the discrete Fourier transform computed by the FFT',
          ],
          concepts: [
            'Transform pair $\\tilde f(k) = \\int f(x)e^{-ikx}dx$, $f(x) = \\frac{1}{2\\pi}\\int\\tilde f(k)e^{ikx}dk$',
            'Normalisation conventions',
            'Shift, scaling and derivative theorems',
            'Transform of a Gaussian is a Gaussian',
            'Uncertainty relation $\\Delta x\\,\\Delta k \\ge 1/2$',
            'Convolution theorem',
            'Plancherel/Parseval theorem',
            'Discrete Fourier transform and sampling',
          ],
          explanation: `Let the period of a Fourier series grow without bound. The harmonics $k_n = n\\pi/L$ crowd together, the sum becomes an integral, and the coefficients $c_n$ become a function of a continuous wavenumber. The result is the **Fourier transform pair**

$$\\tilde f(k) = \\int_{-\\infty}^\\infty f(x)e^{-ikx}\\,dx, \\qquad f(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^\\infty\\tilde f(k)e^{ikx}\\,dk .$$

Conventions differ in where the $2\\pi$ goes and the sign of the exponent; physicists often use the symmetric $1/\\sqrt{2\\pi}$ version, and NumPy uses frequency $\\nu$ with $e^{-2\\pi i\\nu t}$. Pick one and be consistent. The transform decomposes a signal, a wave packet or an image into its plane-wave components; $|\\tilde f(k)|^2$ is the **power spectrum**.

A handful of transforms and theorems cover most of physics. The transform of $e^{-x^2/2\\sigma^2}$ is a Gaussian of width $1/\\sigma$: narrow in $x$ means broad in $k$. This is the **uncertainty principle**, $\\Delta x\\,\\Delta k \\ge \\tfrac12$ for any function, which with $p = \\hbar k$ is Heisenberg's relation and with time and frequency is the statement that a short pulse has a wide bandwidth. The **derivative theorem**, $\\widetilde{f'}(k) = ik\\tilde f(k)$, converts differential equations into algebraic ones, exactly as Laplace did for initial-value problems. The **shift theorem** $f(x - a) \\to e^{-ika}\\tilde f(k)$ shows that translation only changes phase, which is why the power spectrum is translation invariant.

The **convolution theorem** is the most used result: $\\widetilde{f * g} = \\tilde f\\,\\tilde g$ where $(f * g)(x) = \\int f(y)g(x-y)\\,dy$. Every linear, translation-invariant process (a filter, an optical system blurring an image, a detector response, the solution of a linear PDE with a Green's function) is a convolution, and in Fourier space it becomes multiplication. This is also why the FFT makes convolution fast. **Plancherel's theorem** $\\int|f|^2dx = \\frac{1}{2\\pi}\\int|\\tilde f|^2dk$ is Parseval for transforms.

On a computer you sample $f$ at $N$ points and compute the **discrete Fourier transform**; the FFT does so in $O(N\\log N)$. The DFT approximates the continuous transform only for frequencies below the Nyquist limit (half the sampling rate), and the output order and normalisation are frequent sources of error. The practical use of the FFT is treated in computational-physics; here, make sure you can predict what the FFT of a Gaussian or a rectangle must look like before you compute it.

Watch the 3Blue1Brown video first, then work the 18.03SC and Herman chapters, and read the NumPy FFT documentation page closely before the last exercise.`,
          resources: [
            {
              title: '3Blue1Brown — But what is the Fourier transform? A visual introduction',
              url: 'https://www.3blue1brown.com/lessons/fourier-transforms',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'The winding-frequency picture; makes the definition intuitive.',
              primary: true,
            },
            {
              title: 'Introduction to Partial Differential Equations (Herman) — Transform techniques chapter',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Fourier transform properties, convolution theorem, Gaussian and delta-function examples.',
            },
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 15: Fourier Analysis',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
            },
            {
              title: 'NumPy — Discrete Fourier Transform (numpy.fft) documentation',
              url: 'https://numpy.org/doc/stable/reference/routines.fft.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
              note: 'Read the "Implementation details" section for normalisation and output ordering.',
            },
          ],
          exercises: [
            {
              slug: 'transform-table',
              title: 'Build a transform table',
              prompt:
                'Compute from the definition the transforms of: the rectangle function of width $a$ (giving $a\\,\\operatorname{sinc}(ka/2)$), $e^{-|x|/\\tau}$ (Lorentzian), the Gaussian $e^{-x^2/2\\sigma^2}$ (complete the square), and $\\cos(k_0x)e^{-x^2/2\\sigma^2}$ (two shifted Gaussians). Prove the derivative, shift and scaling theorems. Verify the Gaussian and rectangle numerically with `numpy.fft`, paying attention to normalisation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'uncertainty-principle',
              title: 'The uncertainty relation',
              prompt:
                'For the Gaussian wave packet compute $\\Delta x$ and $\\Delta k$ (standard deviations of $|f|^2$ and $|\\tilde f|^2$) and show $\\Delta x\\Delta k = 1/2$. Then compute the product numerically for a rectangle, a triangle and a Lorentzian-shaped packet and confirm each exceeds 1/2. Explain the quantum interpretation with $p = \\hbar k$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'convolution-theorem',
              title: 'Convolution theorem: proof and use',
              prompt:
                'Prove $\\widetilde{f * g} = \\tilde f\\tilde g$ by changing the order of integration. Then blur a sharp 1D signal (a square pulse) with a Gaussian kernel both by direct convolution (`numpy.convolve`) and by multiplying FFTs, and show the results agree. Explain why a Gaussian blur suppresses high frequencies and compute the half-power cutoff frequency as a function of the kernel width.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'diffusion-by-fourier',
              title: 'Solve the diffusion equation with the Fourier transform',
              prompt:
                'Transform $\\partial_t u = D\\partial_x^2 u$ in $x$ to get $\\partial_t\\tilde u = -Dk^2\\tilde u$, solve, and invert for an initial delta function to obtain the Gaussian $u = \\frac{1}{\\sqrt{4\\pi Dt}}e^{-x^2/4Dt}$. Show the general solution is the initial condition convolved with this kernel. Implement it with FFTs for a square initial profile and compare with a finite-difference solution at $t = 0.1, 1$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the Fourier transform arise from the Fourier series?',
              answerOutline:
                'As $L\\to\\infty$ the discrete wavenumbers $n\\pi/L$ become continuous, the sum over $n$ becomes an integral over $k$ with measure $dk/(2\\pi)$, and $2Lc_n \\to \\tilde f(k)$.',
            },
            {
              question: 'Why does a narrow function have a broad transform, and what physical principles does this express?',
              answerOutline:
                'Scaling theorem: $f(ax) \\to \\tilde f(k/a)/|a|$; Heisenberg uncertainty ($\\Delta x\\Delta p \\ge \\hbar/2$) and time-bandwidth product of pulses.',
            },
            {
              question: 'State the convolution theorem and give two physical situations where it applies.',
              answerOutline:
                'Transform of a convolution is the product of transforms. Examples: instrument response blurring a spectrum, a linear filter acting on a signal, Green\'s-function solutions of linear PDEs, diffraction patterns.',
            },
            {
              question: 'What limits the agreement between the DFT of sampled data and the continuous transform?',
              answerOutline:
                'Sampling (aliasing above the Nyquist frequency), finite record length (spectral leakage/resolution $1/T$), and normalisation and ordering conventions.',
            },
          ],
        },
        {
          slug: 'dirac-delta-and-greens-functions',
          title: 'The Dirac delta function and Green\'s functions',
          summary:
            'The delta function as a limit and as a distribution, its properties and representations, and how it leads to Green\'s functions for linear differential equations.',
          estimatedMinutes: 150,
          objectives: [
            'Define the delta function via its sifting property and as a limit of narrow functions',
            'Use the scaling, composition and derivative rules for $\\delta$ correctly',
            'Give the Fourier representation of $\\delta$ and use it to prove orthogonality and completeness relations',
            'Define a Green\'s function and construct it for a simple ODE boundary value problem',
            'Explain how the Green\'s function expresses the solution for arbitrary sources as a superposition',
          ],
          concepts: [
            'Sifting property $\\int f(x)\\delta(x-a)\\,dx = f(a)$',
            'Delta as limit of Gaussians / rectangles',
            '$\\delta(ax) = \\delta(x)/|a|$ and $\\delta(g(x)) = \\sum\\delta(x - x_i)/|g\'(x_i)|$',
            'Derivative of the step function',
            'Fourier representation $\\delta(x) = \\frac{1}{2\\pi}\\int e^{ikx}dk$',
            'Three-dimensional delta and point charges',
            'Green\'s function $LG = \\delta$',
            'Superposition of point sources',
          ],
          explanation: `A point charge, an instantaneous impulse, a plane wave's spectrum: physics needs an object that is zero everywhere except at one point yet integrates to one. The **Dirac delta** $\\delta(x)$ is defined not by its values but by what it does inside integrals, the **sifting property** $\\int f(x)\\delta(x - a)\\,dx = f(a)$. Think of it as the limit of a Gaussian of width $\\sigma \\to 0$ and height $1/\\sigma\\sqrt{2\\pi}$; any such sequence of narrowing, normalised bumps works. Strictly it is a *distribution*, and every manipulation should be checked by imagining it under an integral with a smooth test function.

The rules follow from substitution under the integral: $\\delta(ax) = \\delta(x)/|a|$; more generally $\\delta(g(x)) = \\sum_i\\delta(x - x_i)/|g'(x_i)|$ over the simple zeros of $g$; $\\delta'$ acts by $\\int f\\delta'(x-a)\\,dx = -f'(a)$ (integrate by parts); and $\\delta$ is the derivative of the Heaviside step, which is why a kink in a potential gives a delta in the force and a jump in a derivative shows up in equations with point sources. In three dimensions $\\delta^3(\\mathbf{r}) = \\delta(x)\\delta(y)\\delta(z)$, so a point charge is $\\rho = q\\delta^3(\\mathbf{r} - \\mathbf{r}_0)$ and the earlier result $\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 4\\pi\\delta^3(\\mathbf{r})$ makes sense; in spherical coordinates remember the Jacobian: $\\delta^3 = \\delta(r)/(4\\pi r^2)$ for a point at the origin.

The **Fourier representation** $\\delta(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^\\infty e^{ikx}\\,dk$ is what makes the Fourier inversion formula true, and it is also the statement that plane waves are orthogonal and complete, $\\int e^{i(k-k')x}dx = 2\\pi\\delta(k - k')$, the continuous analogue of $\\int\\sin mx\\sin nx = \\pi\\delta_{mn}$.

The payoff is the **Green's function**. For a linear operator $L$ (say $-d^2/dx^2$ with given boundary conditions), define $G(x, x')$ by $L G = \\delta(x - x')$: the response to a unit point source. Then for any source $f$, $u(x) = \\int G(x, x')f(x')\\,dx'$ solves $Lu = f$ with the same boundary conditions, simply by superposition, because $f$ is a sum of point sources $f(x')\\delta(x - x')$. You have met this already: the impulse response of the oscillator is its Green's function, and convolution is the superposition integral. Constructing $G$ for an ODE means solving the homogeneous equation on either side of $x'$, matching continuity, and imposing a jump in the derivative of size $-1$ (from integrating $LG = \\delta$ across $x'$). The electrostatic potential of a point charge, $1/4\\pi\\epsilon_0|\\mathbf{r} - \\mathbf{r}'|$, is the Green's function of the Laplacian.

Read Nearing chapter 17 (Densities and Distributions) and the Herman chapter on Green's functions. Then do the exercises; constructing one Green's function by hand and verifying it numerically is the core skill.`,
          resources: [
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 17: Densities and Distributions',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
              primary: true,
            },
            {
              title: 'Introduction to Partial Differential Equations (Herman) — Green\'s functions chapter',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Green\'s functions for ODE boundary value problems and for the Laplacian.',
            },
            {
              title: 'MIT 18.03SC — Unit 3: Delta functions and the impulse response',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The sessions on the unit impulse response and convolution are the ODE version of the Green\'s function.',
            },
          ],
          exercises: [
            {
              slug: 'delta-rules',
              title: 'Delta-function rules',
              prompt:
                'Prove $\\delta(ax) = \\delta(x)/|a|$ and $\\delta(x^2 - a^2) = [\\delta(x-a) + \\delta(x+a)]/2|a|$ by substitution under an integral. Evaluate $\\int_{-\\infty}^\\infty (x^3 + 1)\\delta(2x - 4)\\,dx$, $\\int_0^{\\pi}\\cos x\\,\\delta(\\sin x - 1/2)\\,dx$ and $\\int x^2\\delta\'(x - 1)\\,dx$. Verify each numerically by replacing $\\delta$ with a narrow Gaussian and showing convergence as the width shrinks.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'fourier-representation-delta',
              title: 'The Fourier representation of the delta',
              prompt:
                'Show that $\\frac{1}{2\\pi}\\int_{-K}^{K}e^{ikx}dk = \\frac{\\sin Kx}{\\pi x}$, plot it for $K = 5, 20, 100$, and verify numerically that $\\int f(x)\\frac{\\sin Kx}{\\pi x}dx \\to f(0)$ for $f = e^{-x^2}$ as $K$ grows. Use the representation to derive the Fourier inversion formula from the forward transform.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'construct-greens-function',
              title: 'Construct and verify a Green\'s function',
              prompt:
                'For $-u\'\' = f(x)$ on $[0,1]$ with $u(0) = u(1) = 0$, construct $G(x, x\')$ by solving the homogeneous equation on each side, imposing continuity and the derivative jump; answer $G = x_<(1 - x_>)$. Use it to solve for $f = 1$ and $f = \\sin\\pi x$ by numerical integration and compare with the exact solutions $x(1-x)/2$ and $\\sin(\\pi x)/\\pi^2$. Plot $G(x, 0.3)$ and interpret it as the shape of a string plucked at $x\' = 0.3$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'greens-function-laplacian',
              title: 'Green\'s function of the Laplacian',
              prompt:
                'Show that $G(\\mathbf{r}) = -1/4\\pi r$ satisfies $\\nabla^2 G = \\delta^3(\\mathbf{r})$ by (a) checking $\\nabla^2 G = 0$ for $r > 0$ and (b) integrating $\\nabla^2 G$ over a small ball using the divergence theorem. Conclude that $\\phi(\\mathbf{r}) = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\rho(\\mathbf{r}\')}{|\\mathbf{r} - \\mathbf{r}\'|}dV\'$ solves Poisson\'s equation, and recover the potential of a uniformly charged sphere by direct numerical integration at three radii.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the defining property of the delta function and why is it "not a function"?',
              answerOutline:
                'Sifting: $\\int f(x)\\delta(x-a)dx = f(a)$ for smooth $f$. No ordinary function is zero almost everywhere yet integrates to 1; it is a distribution, meaningful only under integrals.',
            },
            {
              question: 'Explain $\\delta(g(x)) = \\sum_i\\delta(x-x_i)/|g\'(x_i)|$.',
              answerOutline:
                'Near each simple zero $x_i$, $g(x) \\approx g\'(x_i)(x - x_i)$, and the scaling rule divides by $|g\'(x_i)|$.',
            },
            {
              question: 'What is a Green\'s function and how does it give the solution for a general source?',
              answerOutline:
                'The response to a unit point source, $LG = \\delta(x - x\')$ with the problem\'s boundary conditions; by linearity $u = \\int G(x,x\')f(x\')dx\'$ solves $Lu = f$.',
            },
            {
              question: 'What conditions does $G(x,x\')$ satisfy at $x = x\'$ for $L = -d^2/dx^2$?',
              answerOutline:
                'Continuity of $G$, and a jump of $-1$ in $\\partial_x G$ (from integrating $-G\'\' = \\delta$ across $x\'$).',
            },
          ],
        },
        {
          slug: 'complex-analytic-functions',
          title: 'Complex numbers and analytic functions',
          summary:
            'Complex arithmetic and Euler\'s formula as a physicist\'s tool, then analytic functions, the Cauchy-Riemann equations and why analyticity is such a strong condition.',
          estimatedMinutes: 150,
          objectives: [
            'Manipulate complex numbers in Cartesian and polar form and use Euler\'s formula for trigonometric identities and phasors',
            'Compute complex powers, roots and logarithms, and handle branches',
            'Define complex differentiability, derive the Cauchy-Riemann equations and test functions for analyticity',
            'Show that real and imaginary parts of analytic functions are harmonic and interpret them as 2D potentials',
            'Classify singularities (poles, essential, branch points) and identify them for standard functions',
          ],
          concepts: [
            'Complex plane, modulus, argument',
            'Euler\'s formula $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$',
            'Phasors and complex impedance',
            'Roots of unity, multivalued functions, branch cuts',
            'Analytic (holomorphic) function',
            'Cauchy-Riemann equations',
            'Harmonic functions and conformal maps',
            'Poles, essential singularities, branch points',
          ],
          explanation: `Complex numbers enter physics first as a convenience and then as a necessity. The convenience is **Euler's formula** $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$: oscillations become exponentials, derivatives become multiplications by $i\\omega$, trigonometric identities fall out of $e^{i(a+b)} = e^{ia}e^{ib}$, and an RLC circuit becomes Ohm's law with complex **impedance** $Z = R + i\\omega L + 1/i\\omega C$. You used this in the oscillator lesson. Polar form $z = re^{i\\theta}$ makes multiplication a rotation-and-scaling, roots of unity sit on a regular polygon, and $\\ln z = \\ln r + i(\\theta + 2\\pi n)$ is **multivalued**: choosing a branch and a **branch cut** is necessary for $\\ln$, $\\sqrt{z}$ and $z^\\alpha$, and it matters in physical problems.

The necessity comes from **analytic functions**. A complex function $f(z) = u + iv$ is differentiable at $z$ if the limit $\\lim(f(z+h) - f(z))/h$ exists and is the same for every direction of approach of the complex $h$. Comparing approach along the real and imaginary axes gives the **Cauchy-Riemann equations**

$$\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\qquad \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x} .$$

This is a severe constraint. It implies $u$ and $v$ are both **harmonic** ($\\nabla^2 u = 0$), that an analytic function is infinitely differentiable and equal to its Taylor series within a disc reaching the nearest singularity (which finally explains the radius of convergence of $1/(1+x^2)$), and that the function is determined everywhere by its values on any small arc (analytic continuation). Conversely, any 2D electrostatic or ideal-fluid problem is the real part of an analytic function, and **conformal maps** $w = f(z)$ carry solutions between geometries; the complex potential $\\Phi = \\phi + i\\psi$ has equipotentials and field lines as its level curves.

Functions fail to be analytic at **singularities**. A **pole** of order $n$ is where $f \\sim 1/(z - z_0)^n$ (the oscillator response has poles at the characteristic roots); an **essential singularity** such as $e^{1/z}$ at 0 is wilder; **branch points** such as $z = 0$ for $\\sqrt{z}$ are where multivaluedness lives. Classifying singularities is the first step of every contour integral in the next lesson.

Work MIT 18.04 topics 1-3 (complex algebra, analytic functions, Cauchy-Riemann) with Orloff's notes, supported by Chong's *Complex Methods for the Sciences* for the physical applications. Then do the exercises, including the plotting one: colouring the complex plane by $\\arg f(z)$ makes zeros, poles and branch cuts visible.`,
          resources: [
            {
              title: 'MIT 18.04 Complex Variables with Applications (Spring 2018)',
              url: 'https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Jeremy Orloff\'s notes, topics 1-3 for this lesson and 4-9 for the next.',
              primary: true,
            },
            {
              title: 'Complex Variables with Applications (Orloff) — LibreTexts edition',
              url: 'https://math.libretexts.org/Bookshelves/Analysis/Complex_Variables_with_Applications_(Orloff)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
            },
            {
              title: 'Complex Methods for the Sciences (Chong)',
              url: 'https://phys.libretexts.org/Bookshelves/Mathematical_Physics_and_Pedagogy/Complex_Methods_for_the_Sciences_(Chong)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'A physicist\'s treatment with phasors, impedance and branch cuts.',
            },
          ],
          exercises: [
            {
              slug: 'euler-and-phasors',
              title: 'Euler\'s formula at work',
              prompt:
                'Using $e^{i\\theta}$: derive $\\cos 3\\theta$ and $\\sin 3\\theta$ in terms of $\\cos\\theta$, $\\sin\\theta$; sum $\\sum_{n=0}^{N-1}\\cos n\\theta$ in closed form (a geometric series); find all cube roots of $-8i$ and plot them. Then compute the complex impedance of a series RLC circuit and reproduce the resonance curve from the oscillator lesson as $|V_0/Z|$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'cauchy-riemann-tests',
              title: 'Cauchy-Riemann and harmonic conjugates',
              prompt:
                'Derive the Cauchy-Riemann equations. Test $z^2$, $\\bar z$, $|z|^2$, $e^z$ and $1/z$ for analyticity and state where each fails. Show that $u = x^3 - 3xy^2$ is harmonic, find its harmonic conjugate $v$ and the analytic function $f = u + iv$. Prove that $u$ and $v$ of any analytic function are harmonic using equality of mixed partials.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'domain-colouring',
              title: 'Domain colouring of complex functions',
              prompt:
                'Write a function that plots a complex function on a grid with hue = $\\arg f(z)$ and brightness = $\\log|f(z)|$. Apply it to $z^3 - 1$, $1/(z^2 + 1)$, $\\sqrt{z}$ (principal branch), $\\ln z$ and $e^{1/z}$. Identify zeros, poles (with their order from the number of hue cycles), branch cuts and the essential singularity in the pictures.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'conformal-map-flow',
              title: 'A conformal map for fluid flow',
              prompt:
                'The complex potential $\\Phi(z) = U(z + a^2/z)$ describes ideal flow past a cylinder of radius $a$. Compute the velocity $\\bar{v} = d\\Phi/dz$, show the cylinder $|z| = a$ is a streamline (imaginary part of $\\Phi$ constant), find the stagnation points, and plot streamlines and equipotentials. Verify that $\\psi = \\operatorname{Im}\\Phi$ is harmonic numerically.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the Cauchy-Riemann equations in two or three lines.',
              answerOutline:
                'Require the difference quotient to have the same limit along real $h$ ($u_x + iv_x$) and imaginary $h$ ($-iu_y + v_y$); equate real and imaginary parts.',
            },
            {
              question: 'Why are the real and imaginary parts of an analytic function harmonic, and why does this matter for physics?',
              answerOutline:
                'Differentiate C-R: $u_{xx} = v_{yx} = -u_{yy}$. Harmonic functions solve Laplace\'s equation, so analytic functions supply 2D electrostatic and ideal-fluid solutions, and conformal maps transfer them between geometries.',
            },
            {
              question: 'What is a branch cut and why is one needed for $\\ln z$?',
              answerOutline:
                '$\\arg z$ is defined only modulo $2\\pi$, so $\\ln z$ is multivalued; a cut (e.g. the negative real axis) makes a single-valued branch by forbidding paths that circle the branch point at 0.',
            },
            {
              question: 'How does complex analysis explain the radius of convergence of the real Taylor series of $1/(1+x^2)$?',
              answerOutline:
                'The series converges in the largest disc about the expansion point free of singularities; the poles at $\\pm i$ are at distance 1 from the origin.',
            },
          ],
        },
        {
          slug: 'contour-integration-and-residues',
          title: 'Contour integration and the residue theorem',
          summary:
            'Cauchy\'s theorem and integral formula, Laurent series and residues, and the residue theorem as a machine for evaluating real integrals, inverse transforms and Green\'s functions.',
          estimatedMinutes: 180,
          objectives: [
            'State Cauchy\'s theorem and Cauchy\'s integral formula and explain their meaning',
            'Expand functions in Laurent series and compute residues at poles of any order',
            'Apply the residue theorem to evaluate real integrals of rational and trigonometric functions and Fourier-type integrals',
            'Use Jordan\'s lemma and indented contours; evaluate principal-value integrals',
            'Interpret the poles of a response function physically (causality, damping, the Kramers-Kronig relations)',
          ],
          concepts: [
            'Contour integral $\\oint f(z)\\,dz$',
            'Cauchy\'s theorem: $\\oint f\\,dz = 0$ for analytic $f$',
            'Cauchy\'s integral formula',
            'Laurent series and residue',
            'Residue theorem $\\oint f\\,dz = 2\\pi i\\sum\\operatorname{Res}$',
            'Closing contours, Jordan\'s lemma',
            'Principal value and indented contours',
            'Causality and poles in the lower/upper half-plane',
          ],
          explanation: `Integrate an analytic function around a closed loop and you get zero. That is **Cauchy's theorem**, and it follows from Green's theorem plus the Cauchy-Riemann equations; it means contours can be deformed freely through regions where $f$ is analytic without changing the integral. Everything else in this lesson is a consequence. **Cauchy's integral formula** $f(z_0) = \\frac{1}{2\\pi i}\\oint\\frac{f(z)}{z - z_0}dz$ shows that an analytic function inside a loop is determined by its values on the loop, and differentiating it gives all derivatives, hence the Taylor series.

Near an isolated singularity $f$ has a **Laurent series** $\\sum_{n=-\\infty}^\\infty a_n(z - z_0)^n$. The coefficient $a_{-1}$ is the **residue**, and it is all that survives a contour integral because $\\oint(z - z_0)^n dz = 2\\pi i\\,\\delta_{n,-1}$. Hence the **residue theorem**:

$$\\oint_C f(z)\\,dz = 2\\pi i\\sum_{\\text{poles inside } C}\\operatorname{Res} f .$$

For a simple pole, $\\operatorname{Res} = \\lim(z - z_0)f(z)$, or $g(z_0)/h'(z_0)$ for $f = g/h$; for an order-$n$ pole use the $(n-1)$-th derivative formula.

The practical art is turning a real integral into a closed contour. Rational functions over $(-\\infty, \\infty)$: close with a large semicircle, which contributes nothing if $f$ decays faster than $1/|z|$. Fourier-type integrals $\\int f(x)e^{ikx}dx$: **Jordan's lemma** says the semicircle contributes nothing in the upper half-plane for $k > 0$ even if $f$ only decays like $1/|z|$; so close upward for $k > 0$ and downward for $k < 0$. Trigonometric integrals over $[0, 2\\pi]$: substitute $z = e^{i\\theta}$ and integrate around the unit circle. A pole *on* the real axis is handled by an indented contour and gives the **principal value** plus half a residue.

The physical payoff is deep. Inverting the Fourier transform of the oscillator response function $1/(\\omega_0^2 - \\omega^2 - 2i\\gamma\\omega)$ by residues produces the impulse response, and the fact that its poles lie in the lower half-plane (for the $e^{-i\\omega t}$ convention) is exactly **causality**: the response vanishes before the impulse. The same observation yields the **Kramers-Kronig relations** connecting the real and imaginary parts of any causal response (refractive index and absorption), and in quantum scattering the poles of the S-matrix are bound states and resonances.

Work 18.04 topics 4-9 (Cauchy's theorem, integral formula, Laurent series, residues, definite integrals) with Orloff's notes, and Chong's chapters on contour integration. Then do every integral in the exercises by residues *and* numerically; the numerical check is how you catch sign and factor-of-$2\\pi$ errors, which everyone makes.`,
          resources: [
            {
              title: 'MIT 18.04 Complex Variables with Applications — Topics 4-9',
              url: 'https://ocw.mit.edu/courses/18-04-complex-variables-with-applications-spring-2018/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Cauchy\'s theorem and formula, Taylor and Laurent series, residues, definite integrals via contours.',
              primary: true,
            },
            {
              title: 'Complex Variables with Applications (Orloff) — LibreTexts edition',
              url: 'https://math.libretexts.org/Bookshelves/Analysis/Complex_Variables_with_Applications_(Orloff)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
            },
            {
              title: 'Complex Methods for the Sciences (Chong) — Contour integration chapters',
              url: 'https://phys.libretexts.org/Bookshelves/Mathematical_Physics_and_Pedagogy/Complex_Methods_for_the_Sciences_(Chong)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Includes the causality and Kramers-Kronig discussion.',
            },
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 14: Complex Variables',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
            },
          ],
          exercises: [
            {
              slug: 'residue-drill',
              title: 'Residues and real integrals',
              prompt:
                'Evaluate by residues and check numerically: $\\int_{-\\infty}^\\infty\\frac{dx}{1+x^4}$ ($\\pi/\\sqrt2$), $\\int_{-\\infty}^\\infty\\frac{dx}{(x^2+1)^2}$ ($\\pi/2$), $\\int_0^{2\\pi}\\frac{d\\theta}{2+\\cos\\theta}$ ($2\\pi/\\sqrt3$), $\\int_{-\\infty}^\\infty\\frac{\\cos kx}{x^2+a^2}dx$ ($\\frac{\\pi}{a}e^{-|k|a}$). For each, draw the contour, list the enclosed poles and state why the arc contribution vanishes.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'principal-value-sinc',
              title: 'Principal value and the sinc integral',
              prompt:
                'Evaluate $\\int_{-\\infty}^\\infty\\frac{\\sin x}{x}dx = \\pi$ using $e^{iz}/z$ with an indented contour around the origin, showing explicitly that the small semicircle contributes $-i\\pi$ times the residue. Then evaluate $\\mathrm{P}\\int_{-\\infty}^\\infty\\frac{dx}{(x-1)(x^2+1)}$ and verify with `scipy.integrate.quad` using the `weight=\'cauchy\'` option.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'causality-oscillator',
              title: 'Causality from pole positions',
              prompt:
                'The oscillator response in frequency space is $\\chi(\\omega) = 1/(\\omega_0^2 - \\omega^2 - 2i\\gamma\\omega)$. Find its poles and show they lie in the lower half-plane. Compute the impulse response $h(t) = \\frac{1}{2\\pi}\\int\\chi(\\omega)e^{-i\\omega t}d\\omega$ by residues, closing in the upper half-plane for $t < 0$ (giving 0) and the lower for $t > 0$ (giving $\\frac{1}{\\omega_d}e^{-\\gamma t}\\sin\\omega_d t$). Compare with a numerical inverse FFT of $\\chi$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'laurent-expansions',
              title: 'Laurent series and classification',
              prompt:
                'Find the Laurent series of $\\frac{1}{z(z-1)}$ in the regions $0 < |z| < 1$ and $|z| > 1$, and of $e^{1/z}$ about 0. Read off the residues and classify the singularities. Verify one residue by numerically integrating around a small circle with the trapezoidal rule (which is spectrally accurate for periodic integrands).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the residue theorem and the formula for the residue at a simple pole of $g(z)/h(z)$.',
              answerOutline:
                '$\\oint f\\,dz = 2\\pi i\\sum$ residues inside (counterclockwise); at a simple zero $z_0$ of $h$, Res $= g(z_0)/h\'(z_0)$.',
            },
            {
              question: 'When can you close a real-line integral with a large semicircle and discard the arc?',
              answerOutline:
                'If $|f| = o(1/|z|)$ on the arc (e.g. rational functions with degree difference at least 2), or, for $f(z)e^{ikz}$ with $k>0$ in the upper half-plane, if $f \\to 0$ (Jordan\'s lemma).',
            },
            {
              question: 'What does an indentation around a pole on the real axis contribute?',
              answerOutline:
                'Half the residue times $\\pm i\\pi$ (sign by direction), so the full-line integral equals the principal value plus $i\\pi\\,$Res.',
            },
            {
              question: 'How is causality encoded in the analytic structure of a response function?',
              answerOutline:
                'All poles of $\\chi(\\omega)$ lie in one half-plane (lower, for $e^{-i\\omega t}$), so closing the contour on the other side for $t<0$ gives zero response before the impulse; this analyticity yields the Kramers-Kronig relations.',
            },
          ],
        },
      ],
      project: {
        slug: 'spectral-toolkit',
        title: 'Module project: a spectral analysis toolkit with analytic checks',
        description:
          'Write a notebook that (1) computes Fourier series and transforms of user-supplied functions symbolically (SymPy) and numerically (FFT) and overlays them, (2) demonstrates the convolution theorem, the uncertainty relation and Gibbs phenomenon, (3) inverts the oscillator response function by residues and by FFT and shows they agree, and (4) evaluates a table of ten definite integrals by residues with numerical verification. Document every normalisation convention used.',
        deliverables: [
          'Notebook with symbolic and numerical transforms and a conventions section',
          'Figures for Gibbs, uncertainty products, convolution and the impulse response',
          'Table of ten residue-evaluated integrals with contour sketches and numerical checks',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'partial-differential-equations-and-special-functions',
      title: 'Partial Differential Equations and Special Functions',
      description:
        'The heat, wave and Laplace equations solved by separation of variables, the Sturm-Liouville theory that makes eigenfunction expansions work, and the Legendre, spherical-harmonic and Bessel functions that spherical and cylindrical problems produce.',
      lessons: [
        {
          slug: 'separation-of-variables',
          title: 'The heat, wave and Laplace equations: separation of variables',
          summary:
            'The three canonical linear PDEs of physics, their boundary and initial conditions, and the separation-of-variables method that reduces them to ODEs and Fourier series.',
          estimatedMinutes: 180,
          objectives: [
            'Derive the heat and wave equations from physical conservation and force balance, and identify Laplace\'s equation as their steady state',
            'Classify boundary conditions (Dirichlet, Neumann, periodic) and know which conditions make each PDE well posed',
            'Carry out separation of variables for the 1D heat and wave equations with homogeneous boundary conditions',
            'Impose initial conditions with Fourier (half-range) series and interpret the modal solution',
            'Solve Laplace\'s equation in a rectangle and in polar coordinates',
          ],
          concepts: [
            'Heat equation $u_t = \\kappa u_{xx}$',
            'Wave equation $u_{tt} = c^2 u_{xx}$',
            'Laplace equation $\\nabla^2 u = 0$',
            'Dirichlet, Neumann and periodic boundary conditions',
            'Separation ansatz $u = X(x)T(t)$ and separation constant',
            'Eigenvalue problem for $X$ and normal modes',
            'Superposition and fitting initial data by Fourier series',
            'd\'Alembert\'s solution (travelling waves)',
          ],
          explanation: `Three partial differential equations describe most of linear physics. The **heat (diffusion) equation** $u_t = \\kappa\\nabla^2 u$ follows from conservation of energy plus Fourier's law that heat flows down the temperature gradient; it also governs diffusion of particles and, with an $i$, the Schrödinger equation. The **wave equation** $u_{tt} = c^2\\nabla^2 u$ follows from Newton's law on a string or from Maxwell's equations. **Laplace's equation** $\\nabla^2 u = 0$ is the steady state of both and governs electrostatics and gravity in empty space. All three are linear, so solutions superpose, and that is what separation of variables exploits.

Take the heat equation on $0 < x < L$ with $u(0,t) = u(L,t) = 0$ (**Dirichlet** conditions). Try $u = X(x)T(t)$; substituting and dividing by $XT$ gives $T'/\\kappa T = X''/X$. The left depends only on $t$, the right only on $x$, so both equal a constant, $-\\lambda$. Then $X'' + \\lambda X = 0$ with $X(0) = X(L) = 0$ is an **eigenvalue problem**: nontrivial solutions exist only for $\\lambda_n = (n\\pi/L)^2$ with $X_n = \\sin(n\\pi x/L)$. The time part gives $T_n = e^{-\\kappa\\lambda_n t}$, and superposition gives

$$u(x,t) = \\sum_{n=1}^\\infty b_n\\sin\\frac{n\\pi x}{L}\\,e^{-\\kappa n^2\\pi^2 t/L^2},$$

where the $b_n$ are the Fourier sine coefficients of the initial temperature. Each mode decays at its own rate; high harmonics die first, so any initial profile smooths into a single sine arch. The wave equation gives the same spatial modes with $T_n = \\cos\\omega_n t$ or $\\sin\\omega_n t$, $\\omega_n = n\\pi c/L$: the **normal modes** of a string, with the harmonics of music. **Neumann** conditions ($u_x = 0$, insulated ends or free ends) give cosines and include a constant mode; periodic conditions give the full Fourier series.

The method works because the boundary conditions are *homogeneous* and the domain is a coordinate box. Inhomogeneous boundary values are handled by subtracting a steady-state solution; a rectangle for Laplace's equation separates into $\\sin$ in one direction and $\\sinh$ in the other; a disc separates in polar coordinates into $r^{\\pm n}$ and $e^{in\\phi}$. For the wave equation on an infinite line there is also **d'Alembert's** solution $u = f(x - ct) + g(x + ct)$, which shows the solution is a pair of travelling shapes and exhibits the finite propagation speed.

Work the 18.03SC PDE sessions (heat equation, wave equation) and Herman chapters 1-2 and the Laplace chapter, with Paul's Notes separation-of-variables pages as drill. Then do the exercises; animating the modal solution next to a brute-force finite-difference solution is the most convincing check you can make.`,
          resources: [
            {
              title: 'Introduction to Partial Differential Equations (Herman)',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapters on second-order PDEs, the heat and wave equations by separation of variables, and Laplace\'s equation.',
              primary: true,
            },
            {
              title: "Paul's Online Math Notes — Separation of Variables",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/SeparationofVariables.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Followed by the heat-equation, wave-equation and Laplace-equation pages in the same chapter.',
            },
            {
              title: 'MIT 18.03SC — PDE sessions (heat and wave equations)',
              url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Unit 3 sessions that apply Fourier series to the heat equation.',
            },
            {
              title: '3Blue1Brown — Solving the heat equation',
              url: 'https://www.3blue1brown.com/lessons/heat-equation',
              type: 'video',
              cost: 'free',
              provider: '3Blue1Brown',
              note: 'Why sine waves are the natural building blocks of the heat equation.',
            },
          ],
          exercises: [
            {
              slug: 'heat-equation-modes',
              title: 'Heat equation by separation of variables',
              prompt:
                'Solve $u_t = u_{xx}$ on $[0, \\pi]$ with $u(0,t) = u(\\pi,t) = 0$ and $u(x,0) = x(\\pi - x)$. Compute the sine coefficients (only odd $n$ survive; $b_n = 8/\\pi n^3$). Animate the 20-term solution and overlay a simple explicit finite-difference solution; show the maximum temperature decays as $e^{-t}$ at late times. Repeat with insulated ends ($u_x = 0$) and show the temperature tends to the spatial average.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'plucked-string',
              title: 'The plucked string',
              prompt:
                'A string of length $L$ fixed at both ends is plucked into a triangle of height $h$ at $x = L/4$ and released. Find the modal solution, compute the energy in each mode, and show that modes with $n$ a multiple of 4 are absent and why. Animate the motion over one period and compare with d\'Alembert\'s solution built from the odd periodic extension of the initial shape.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'laplace-rectangle',
              title: 'Laplace\'s equation in a rectangle',
              prompt:
                'Solve $\\nabla^2 u = 0$ on $[0,a]\\times[0,b]$ with $u = 0$ on three sides and $u(x, b) = V_0$ on the top. Show $u = \\sum_{n\\,\\text{odd}}\\frac{4V_0}{n\\pi}\\frac{\\sinh(n\\pi y/a)}{\\sinh(n\\pi b/a)}\\sin\\frac{n\\pi x}{a}$. Plot equipotentials for $a = b = 1$ and compare with a Jacobi relaxation solution on a $100\\times100$ grid; report the maximum difference.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'derive-wave-equation',
              title: 'Derive the wave and heat equations',
              prompt:
                'Derive the wave equation for small transverse displacements of a string under tension $T$ with linear density $\\mu$ by applying Newton\'s law to a small element, identifying $c^2 = T/\\mu$. Derive the heat equation from energy conservation in a rod with Fourier\'s law $q = -k\\,\\partial_x u$, identifying $\\kappa = k/\\rho c_p$. State in each case which approximation was linear.',
              kind: 'derivation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does separation of variables produce a constant, and why is it an eigenvalue?',
              answerOutline:
                'After dividing by $XT$ one side depends only on $x$ and the other only on $t$, so both equal a constant; the boundary conditions then allow nontrivial $X$ only for discrete values of that constant.',
            },
            {
              question: 'What do Dirichlet versus Neumann boundary conditions mean physically for the heat equation, and what eigenfunctions do they produce on $[0, L]$?',
              answerOutline:
                'Dirichlet: temperature fixed (sines); Neumann: zero flux / insulated (cosines, including a constant mode). The latter conserves total heat.',
            },
            {
              question: 'How are the initial conditions imposed in the modal solution?',
              answerOutline:
                'Expand the initial profile in the eigenfunctions (a Fourier sine/cosine series); orthogonality gives each mode\'s amplitude.',
            },
            {
              question: 'What is d\'Alembert\'s solution and what does it reveal that the modal solution hides?',
              answerOutline:
                '$u = f(x - ct) + g(x + ct)$: the solution is two shapes travelling at speed $c$, showing finite propagation speed and the role of characteristics.',
            },
          ],
        },
        {
          slug: 'sturm-liouville-theory',
          title: 'Sturm-Liouville theory and eigenfunction expansions',
          summary:
            'Why separation of variables always produces orthogonal eigenfunctions: self-adjoint operators, weight functions, completeness, and the generalised Fourier series.',
          estimatedMinutes: 150,
          objectives: [
            'Write an ODE in Sturm-Liouville form and identify $p$, $q$, $w$ and the boundary conditions',
            'Prove that eigenvalues are real and eigenfunctions with distinct eigenvalues are orthogonal with respect to the weight $w$',
            'Expand a function in a generalised Fourier series of eigenfunctions and compute coefficients',
            'Recognise the Legendre, Hermite, Bessel and Chebyshev equations as Sturm-Liouville problems',
            'Explain the analogy with Hermitian matrices and its role in quantum mechanics',
          ],
          concepts: [
            'Sturm-Liouville form $(py\')\' + qy + \\lambda wy = 0$',
            'Self-adjoint operator and boundary terms',
            'Weight function and weighted inner product',
            'Real eigenvalues, orthogonal eigenfunctions',
            'Completeness and generalised Fourier series',
            'Regular vs singular Sturm-Liouville problems',
            'Rayleigh quotient',
            'Analogy with Hermitian matrices',
          ],
          explanation: `Every separation of variables ends in an ODE eigenvalue problem, and in every case the eigenfunctions turn out to be orthogonal and complete so that initial data can be expanded in them. This is not luck. The ODEs are all of **Sturm-Liouville** form,

$$\\frac{d}{dx}\\left(p(x)\\frac{dy}{dx}\\right) + q(x)y + \\lambda w(x)y = 0, \\qquad a < x < b,$$

with boundary conditions of the type $\\alpha y(a) + \\beta y'(a) = 0$ (and similarly at $b$), or periodicity, or boundedness where $p$ vanishes. Define the operator $L y = -(py')' - qy$. Integration by parts twice shows $\\int_a^b u\\,Lv\\,dx - \\int_a^b v\\,Lu\\,dx = [p(uv' - vu')]_a^b$, and the boundary conditions make this boundary term vanish: $L$ is **self-adjoint**, the function-space version of a Hermitian matrix.

The matrix theorems carry over word for word. The eigenvalues $\\lambda_n$ of $Ly = \\lambda w y$ are real; eigenfunctions with distinct eigenvalues are orthogonal with respect to the **weighted inner product** $\\langle u, v\\rangle = \\int_a^b u v\\,w\\,dx$; for a regular problem the eigenvalues form an increasing sequence $\\lambda_1 < \\lambda_2 < \\dots \\to \\infty$ and the eigenfunctions are **complete**, so any reasonable $f$ has a **generalised Fourier series** $f = \\sum c_n y_n$ with $c_n = \\langle y_n, f\\rangle/\\langle y_n, y_n\\rangle$. The ordinary Fourier series is the case $p = w = 1$, $q = 0$. Quantum mechanics is the case where $L$ is the Hamiltonian: real energies, orthogonal stationary states, expansion of any wavefunction in them.

The special functions of the next lessons are Sturm-Liouville eigenfunctions. Legendre's equation has $p = 1 - x^2$, $w = 1$ on $[-1, 1]$, with $p$ vanishing at the ends (a **singular** problem, where boundedness replaces a boundary condition and forces integer $\\ell$); Bessel's has $p = x$, $q = -\\nu^2/x$, $w = x$; Hermite's, after a transformation, has $w = e^{-x^2}$. Knowing this, you can write down orthogonality relations such as $\\int_{-1}^1 P_\\ell P_m\\,dx = \\frac{2}{2\\ell+1}\\delta_{\\ell m}$ and $\\int_0^1 J_\\nu(\\alpha_i x)J_\\nu(\\alpha_j x)\\,x\\,dx = 0$ for $i \\ne j$ without a separate calculation, and you know which weight to use.

The **Rayleigh quotient** $\\lambda = \\frac{\\int(py'^2 - qy^2)dx - [pyy']_a^b}{\\int wy^2dx}$ gives eigenvalues from eigenfunctions and bounds the lowest eigenvalue from above with any trial function, which is the variational method of quantum mechanics.

Read Herman's Sturm-Liouville chapter and the corresponding Nearing section, then do the exercises: the proof of orthogonality is short and you should be able to reproduce it from memory.`,
          resources: [
            {
              title: 'Introduction to Partial Differential Equations (Herman) — Sturm-Liouville chapter',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              primary: true,
            },
            {
              title: 'Differential Equations (Chasnov) — free textbook on LibreTexts',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Differential_Equations_(Chasnov)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Compact treatment of eigenvalue problems and Fourier series in the PDE chapter.',
            },
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 5: Fourier Series (Sturm-Liouville section)',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
            },
          ],
          exercises: [
            {
              slug: 'prove-orthogonality',
              title: 'Prove reality and orthogonality',
              prompt:
                'Starting from the Sturm-Liouville form, prove Lagrange\'s identity $uLv - vLu = -[p(uv\' - vu\')]\'$, show that the boundary term vanishes for separated boundary conditions, and deduce that eigenvalues are real and that eigenfunctions with distinct eigenvalues are orthogonal with weight $w$. State exactly where each boundary condition was used.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'nonstandard-eigenproblem',
              title: 'A non-standard eigenvalue problem',
              prompt:
                'Solve $y\'\' + \\lambda y = 0$ on $[0, 1]$ with $y(0) = 0$ and $y\'(1) + y(1) = 0$ (a Robin condition modelling radiative cooling). Show the eigenvalues satisfy $\\tan\\sqrt\\lambda = -\\sqrt\\lambda$, find the first five numerically with `scipy.optimize.brentq`, verify orthogonality by quadrature, and expand $f(x) = x$ in the first 20 eigenfunctions, plotting the partial sum.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sl-form-conversion',
              title: 'Convert equations to Sturm-Liouville form',
              prompt:
                'Write Legendre\'s, Hermite\'s, Chebyshev\'s ($(1 - x^2)y\'\' - xy\' + n^2y = 0$) and Bessel\'s equations in Sturm-Liouville form by finding the integrating factor $p = \\exp\\int(\\text{coefficient of } y\'/\\text{coefficient of } y\'\')$. Identify $p, q, w$ and the interval, and write the orthogonality relation for each. Verify the Hermite orthogonality $\\int H_mH_n e^{-x^2}dx = 0$ ($m \\ne n$) numerically.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'rayleigh-quotient-bound',
              title: 'Rayleigh quotient as a variational bound',
              prompt:
                'Derive the Rayleigh quotient. For $-y\'\' = \\lambda y$ on $[0,1]$ with $y(0) = y(1) = 0$ (exact $\\lambda_1 = \\pi^2$), compute the quotient for the trial functions $x(1-x)$ and $x(1-x)(1 + cx^2)$ minimised over $c$, and show each gives an upper bound that approaches $\\pi^2 \\approx 9.8696$ (the first gives 10). Explain why this is the variational principle of quantum mechanics.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does it mean for a differential operator to be self-adjoint, and what makes a Sturm-Liouville operator self-adjoint?',
              answerOutline:
                '$\\langle u, Lv\\rangle = \\langle Lu, v\\rangle$ for all admissible $u, v$; the form $-(py\')\' - qy$ plus boundary conditions that kill the boundary term $[p(uv\'-vu\')]$ achieve this.',
            },
            {
              question: 'What is the role of the weight function?',
              answerOutline:
                'It defines the inner product in which eigenfunctions are orthogonal; coefficients in expansions must be computed with $\\int f y_n w\\,dx$.',
            },
            {
              question: 'Why must $\\ell$ be an integer in Legendre\'s equation?',
              answerOutline:
                'The problem is singular at $x = \\pm1$ where $p = 1-x^2$ vanishes; requiring bounded solutions there (the physical condition at the poles) terminates the series only for integer $\\ell$.',
            },
            {
              question: 'How does the Rayleigh quotient bound the lowest eigenvalue?',
              answerOutline:
                'Expanding any trial function in eigenfunctions shows the quotient is a weighted average of eigenvalues, hence at least $\\lambda_1$; minimising over trial functions approximates $\\lambda_1$ from above.',
            },
          ],
        },
        {
          slug: 'legendre-polynomials-and-spherical-harmonics',
          title: 'Legendre polynomials and spherical harmonics',
          summary:
            'Solving Laplace\'s equation in spherical coordinates: Legendre polynomials, their generating function and multipole expansion, associated Legendre functions and the spherical harmonics $Y_\\ell^m$.',
          estimatedMinutes: 180,
          objectives: [
            'Separate Laplace\'s equation in spherical coordinates and obtain the radial solutions $r^\\ell$, $r^{-(\\ell+1)}$ and Legendre\'s equation',
            'Generate Legendre polynomials from the Rodrigues formula, the recurrence and the generating function',
            'Use the generating function to derive the multipole expansion of $1/|\\mathbf{r} - \\mathbf{r}\'|$',
            'Define spherical harmonics, state their orthonormality and completeness, and expand functions on the sphere',
            'Solve axisymmetric boundary-value problems (sphere in a uniform field, specified potential on a sphere)',
          ],
          concepts: [
            'Separation in spherical coordinates',
            'Legendre equation and polynomials $P_\\ell(x)$',
            'Rodrigues formula and recurrence relation',
            'Generating function $\\frac{1}{\\sqrt{1 - 2xt + t^2}} = \\sum P_\\ell(x)t^\\ell$',
            'Multipole expansion',
            'Associated Legendre functions $P_\\ell^m$',
            'Spherical harmonics $Y_\\ell^m(\\theta,\\phi)$',
            'Addition theorem and completeness on the sphere',
          ],
          explanation: `Separate Laplace's equation $\\nabla^2 u = 0$ in spherical coordinates with $u = R(r)\\Theta(\\theta)\\Phi(\\phi)$. The azimuthal part gives $e^{im\\phi}$ with integer $m$ (single-valuedness), the radial part gives $R = Ar^\\ell + Br^{-(\\ell+1)}$, and with $x = \\cos\\theta$ the polar part becomes the **associated Legendre equation**

$$(1 - x^2)\\Theta'' - 2x\\Theta' + \\left[\\ell(\\ell+1) - \\frac{m^2}{1 - x^2}\\right]\\Theta = 0 .$$

For $m = 0$ (axisymmetric problems) this is **Legendre's equation**, whose bounded solutions on $[-1, 1]$ are the **Legendre polynomials** $P_\\ell(x)$ for integer $\\ell$: $P_0 = 1$, $P_1 = x$, $P_2 = \\tfrac12(3x^2 - 1)$, $P_3 = \\tfrac12(5x^3 - 3x)$. They are produced by the **Rodrigues formula** $P_\\ell = \\frac{1}{2^\\ell\\ell!}\\frac{d^\\ell}{dx^\\ell}(x^2 - 1)^\\ell$, by the recurrence $(\\ell + 1)P_{\\ell+1} = (2\\ell + 1)xP_\\ell - \\ell P_{\\ell-1}$ (the way to compute them numerically), and by Gram-Schmidt on the monomials. By Sturm-Liouville theory they are orthogonal: $\\int_{-1}^1 P_\\ell P_m\\,dx = \\frac{2}{2\\ell+1}\\delta_{\\ell m}$.

The physically decisive property is the **generating function** $\\frac{1}{\\sqrt{1 - 2xt + t^2}} = \\sum_\\ell P_\\ell(x)t^\\ell$ for $|t| < 1$. With $x = \\cos\\gamma$ and $t = r'/r$ it is exactly $r/|\\mathbf{r} - \\mathbf{r}'|$, so the potential of any localised charge or mass distribution at large $r$ is the **multipole expansion** $\\phi = \\sum_\\ell \\frac{1}{r^{\\ell+1}}\\int r'^\\ell P_\\ell(\\cos\\gamma)\\rho\\,dV'$: monopole, dipole, quadrupole and so on, each falling off one power faster. Gravity of an oblate planet, the fields of molecules and the cosmic microwave background are all described this way.

For general $m$ the solutions are the associated functions $P_\\ell^m$, and the normalised products $Y_\\ell^m(\\theta, \\phi) = N_{\\ell m}P_\\ell^m(\\cos\\theta)e^{im\\phi}$ are the **spherical harmonics**, with $\\ell = 0, 1, 2, \\dots$ and $|m| \\le \\ell$. They are orthonormal over the sphere, $\\int Y_\\ell^{m*}Y_{\\ell'}^{m'}d\\Omega = \\delta_{\\ell\\ell'}\\delta_{mm'}$, and complete: any function on the sphere is $\\sum a_{\\ell m}Y_\\ell^m$, the Fourier series of the sphere. They are eigenfunctions of the angular part of the Laplacian with eigenvalue $-\\ell(\\ell+1)$, which in quantum mechanics means they are the eigenstates of $L^2$ and $L_z$ with $\\ell$ the orbital angular momentum: the s, p, d, f orbitals are $Y_0^0, Y_1^m, Y_2^m, Y_3^m$ times radial functions. Beware the $(-1)^m$ Condon-Shortley phase and the $\\theta/\\phi$ naming swap in \`scipy.special.sph_harm\`.

Read Herman's chapter on special functions and the DLMF chapter 14 for formulas; the Feynman Lectures Vol. II chapter 6 is the physics of dipoles. Then do the exercises, especially the multipole one: the expansion of $1/|\\mathbf{r} - \\mathbf{r}'|$ is used in every electromagnetism course.`,
          resources: [
            {
              title: 'Introduction to Partial Differential Equations (Herman) — Special functions and problems in higher dimensions',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Legendre polynomials, generating function, spherical harmonics and Laplace\'s equation in a sphere.',
              primary: true,
            },
            {
              title: 'NIST DLMF — Chapter 14: Legendre and Related Functions',
              url: 'https://dlmf.nist.gov/14',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The reference for definitions, recurrences and normalisation conventions.',
            },
            {
              title: 'SciPy — Special functions (scipy.special)',
              url: 'https://docs.scipy.org/doc/scipy/reference/special.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'legendre, lpmv, sph_harm; read the argument order carefully.',
            },
            {
              title: 'The Feynman Lectures on Physics, Vol. II Chapter 6: The Electric Field in Various Circumstances',
              url: 'https://www.feynmanlectures.caltech.edu/',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Dipoles and the physical meaning of the multipole expansion.',
            },
          ],
          exercises: [
            {
              slug: 'legendre-three-ways',
              title: 'Legendre polynomials three ways',
              prompt:
                'Generate $P_0..P_5$ by (a) the Rodrigues formula with SymPy, (b) the three-term recurrence in NumPy, and (c) expanding the generating function to order $t^5$. Confirm all agree, verify the orthogonality integrals numerically, and plot $P_0..P_5$ on $[-1,1]$. Show $P_\\ell(1) = 1$ and $P_\\ell(-x) = (-1)^\\ell P_\\ell(x)$.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'multipole-expansion',
              title: 'Multipole expansion of a charge distribution',
              prompt:
                'Derive $\\frac{1}{|\\mathbf{r} - \\mathbf{r}\'|} = \\sum_\\ell\\frac{r_<^\\ell}{r_>^{\\ell+1}}P_\\ell(\\cos\\gamma)$ from the generating function. Apply it to two charges $+q$ at $z = \\pm a$ and $-2q$ at the origin (a linear quadrupole) to show the leading term of the potential on the axis is $\\propto qa^2/r^3$. Compare the 3-term expansion with the exact potential along the axis and at $45^\\circ$ for $r = 2a, 5a, 20a$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sphere-in-uniform-field',
              title: 'Conducting sphere in a uniform field',
              prompt:
                'A grounded conducting sphere of radius $R$ sits in a uniform field $E_0\\hat z$. Using the general axisymmetric solution $\\sum(A_\\ell r^\\ell + B_\\ell r^{-\\ell-1})P_\\ell(\\cos\\theta)$, impose $\\phi \\to -E_0 r\\cos\\theta$ at infinity and $\\phi = 0$ on the sphere to obtain $\\phi = -E_0(r - R^3/r^2)\\cos\\theta$. Compute the induced surface charge $\\sigma = -\\epsilon_0\\partial_r\\phi|_R$ and show its total is zero and its dipole moment is $4\\pi\\epsilon_0R^3E_0$. Plot the field lines.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'spherical-harmonic-expansion',
              title: 'Expand a function on the sphere',
              prompt:
                'Using `scipy.special.sph_harm` (check its argument convention), compute the coefficients $a_{\\ell m}$ of $f(\\theta,\\phi) = \\cos^2\\theta\\,\\sin\\phi + e^{-\\theta^2}$ up to $\\ell = 8$ by numerical integration over the sphere. Plot the reconstruction error against $\\ell_{max}$ and visualise $|Y_2^1|^2$ and $|Y_3^0|^2$ as 3D surfaces. Verify numerically that $Y_2^1$ is an eigenfunction of the angular Laplacian with eigenvalue $-6$.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the radial solutions of Laplace\'s equation in spherical coordinates and when is each used?',
              answerOutline:
                '$r^\\ell$ (regular at the origin, used inside) and $r^{-(\\ell+1)}$ (vanishing at infinity, used outside).',
            },
            {
              question: 'Explain how the generating function gives the multipole expansion.',
              answerOutline:
                'With $t = r\'/r$ and $x = \\cos\\gamma$, $1/|\\mathbf{r} - \\mathbf{r}\'| = \\frac{1}{r}\\sum(r\'/r)^\\ell P_\\ell(\\cos\\gamma)$; integrating against $\\rho$ gives monopole, dipole, quadrupole terms falling as $1/r, 1/r^2, 1/r^3$.',
            },
            {
              question: 'What differential equation do spherical harmonics satisfy and what is the eigenvalue?',
              answerOutline:
                'The angular part of the Laplacian: $\\nabla^2_{\\Omega}Y_\\ell^m = -\\ell(\\ell+1)Y_\\ell^m$; in QM, $L^2Y = \\hbar^2\\ell(\\ell+1)Y$ and $L_zY = \\hbar mY$.',
            },
            {
              question: 'Why are only integer $\\ell$ and $|m| \\le \\ell$ allowed?',
              answerOutline:
                'Integer $m$ from single-valuedness in $\\phi$; integer $\\ell$ from boundedness at the poles (series termination); $|m| \\le \\ell$ because $P_\\ell^m$ vanishes otherwise.',
            },
          ],
        },
        {
          slug: 'bessel-functions-and-cylindrical-problems',
          title: 'Bessel functions and cylindrical problems',
          summary:
            'Separating the Helmholtz and Laplace equations in cylindrical coordinates: Bessel functions of the first and second kind, their zeros, orthogonality and asymptotics, applied to vibrating membranes and cylindrical waveguides.',
          estimatedMinutes: 150,
          objectives: [
            'Separate the wave/Helmholtz equation in cylindrical coordinates and obtain Bessel\'s equation',
            'Describe $J_\\nu$, $Y_\\nu$ and the modified functions $I_\\nu$, $K_\\nu$: series, behaviour at 0 and infinity, and when each is admissible',
            'Use the zeros of $J_m$ to find the normal modes and frequencies of a circular membrane',
            'State and use the orthogonality of Bessel functions with the weight $r$ (Fourier-Bessel series)',
            'Compute Bessel functions and their zeros with SciPy and use the large-argument asymptotic form',
          ],
          concepts: [
            'Helmholtz equation $\\nabla^2 u + k^2 u = 0$',
            'Bessel\'s equation $x^2y\'\' + xy\' + (x^2 - \\nu^2)y = 0$',
            '$J_\\nu$ (regular at 0) and $Y_\\nu$ (singular at 0)',
            'Modified Bessel functions $I_\\nu$, $K_\\nu$',
            'Zeros $j_{m,n}$ and quantised frequencies',
            'Fourier-Bessel series and orthogonality with weight $r$',
            'Asymptotics $J_\\nu(x) \\sim \\sqrt{2/\\pi x}\\cos(x - \\nu\\pi/2 - \\pi/4)$',
            'Drum modes and waveguide modes',
          ],
          explanation: `Separate the wave equation $u_{tt} = c^2\\nabla^2 u$ for a circular drum of radius $a$. With $u = R(r)\\Phi(\\phi)T(t)$ and $T = e^{-i\\omega t}$, $\\Phi = e^{im\\phi}$, the radial equation with $k = \\omega/c$ and $x = kr$ is **Bessel's equation**

$$x^2R'' + xR' + (x^2 - m^2)R = 0 .$$

It is second order, so it has two independent solutions: $J_m(x)$, the **Bessel function of the first kind**, regular at the origin and given by the Frobenius series $J_m(x) = \\sum_k\\frac{(-1)^k}{k!(k+m)!}(x/2)^{2k+m}$; and $Y_m(x)$, the **second kind**, which diverges logarithmically (for $m = 0$) or as $x^{-m}$ at the origin. For a solid drum only $J_m$ is admissible; $Y_m$ is needed for annular regions or problems that exclude the axis. Both oscillate with slowly decaying amplitude, $J_m(x) \\sim \\sqrt{2/\\pi x}\\cos(x - m\\pi/2 - \\pi/4)$ for large $x$, so they are "damped cosines" with a phase shift that depends on $m$; the decay is the geometric spreading of a cylindrical wave.

The boundary condition $u(a) = 0$ quantises the frequencies: $J_m(ka) = 0$, so $k_{mn} = j_{m,n}/a$ where $j_{m,n}$ is the $n$-th zero of $J_m$ ($j_{0,1} \\approx 2.405$, $j_{1,1} \\approx 3.832$, $j_{0,2} \\approx 5.520$). Unlike a string, the overtones of a drum are *not* harmonic, which is why drums do not have a definite pitch. The mode $(m, n)$ has $m$ nodal diameters and $n - 1$ nodal circles. Sturm-Liouville theory (with $p = r$, $w = r$) guarantees the orthogonality $\\int_0^a J_m(j_{m,n}r/a)J_m(j_{m,n'}r/a)\\,r\\,dr = \\frac{a^2}{2}J_{m+1}^2(j_{m,n})\\delta_{nn'}$, so any initial drum shape expands in a **Fourier-Bessel series**.

When the separation constant has the opposite sign (Laplace's equation in a cylinder with $z$-dependence $e^{\\pm kz}$, or diffusion), the radial equation becomes the **modified Bessel equation** with solutions $I_m$ (growing exponentially) and $K_m$ (decaying), which are to $J, Y$ what $\\cosh, \\sinh$ are to $\\cos, \\sin$. $K_0$ is the 2D Green's function of the screened Poisson equation and appears in the Yukawa potential's cylindrical cousin and in heat loss from pipes.

Half-integer orders give the **spherical Bessel functions** $j_\\ell(x) = \\sqrt{\\pi/2x}J_{\\ell+1/2}(x)$, elementary functions such as $j_0 = \\sin x/x$, which are the radial solutions of the Helmholtz equation in spherical coordinates and the free-particle states in quantum scattering.

Read Herman's special functions chapter and DLMF chapter 10 for the formulas. Use \`scipy.special.jv\`, \`yv\`, \`jn_zeros\` for computation, and do the drum exercise fully: the animation of a drum mode is one of the memorable pictures of this subject.`,
          resources: [
            {
              title: 'NIST DLMF — Chapter 10: Bessel Functions',
              url: 'https://dlmf.nist.gov/10',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'Definitions, series, zeros, asymptotics and the modified and spherical functions; graphs for every function.',
              primary: true,
            },
            {
              title: 'Introduction to Partial Differential Equations (Herman) — Bessel functions and the vibrating membrane',
              url: 'https://math.libretexts.org/Bookshelves/Differential_Equations/Introduction_to_Partial_Differential_Equations_(Herman)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
            },
            {
              title: 'SciPy — Special functions (Bessel family)',
              url: 'https://docs.scipy.org/doc/scipy/reference/special.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'jv, yv, iv, kv, jn_zeros, spherical_jn.',
            },
            {
              title: 'Mathematical Tools for Physics (Nearing) — Chapter 4: Differential Equations (Bessel section)',
              url: 'https://web.archive.org/web/2024/https://www.physics.miami.edu/~nearing/mathmethods/',
              type: 'textbook',
              cost: 'free',
              provider: 'James Nearing',
            },
          ],
          exercises: [
            {
              slug: 'bessel-properties',
              title: 'Properties of Bessel functions',
              prompt:
                'Plot $J_0..J_3$ and $Y_0..Y_2$ on $[0, 20]$. Verify numerically the recurrence $J_{\\nu-1} + J_{\\nu+1} = (2\\nu/x)J_\\nu$, the derivative identity $J_0\' = -J_1$, and the asymptotic form for $x > 10$ (plot the ratio). Show that the spacing of consecutive zeros of $J_0$ approaches $\\pi$.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'drum-modes',
              title: 'Normal modes of a circular drum',
              prompt:
                'For a drum of radius $a = 1$, $c = 1$: compute the frequencies of the first 10 modes using `jn_zeros`, list them as ratios to the fundamental, and show they are not integer multiples. Plot the mode shapes $J_m(j_{m,n}r)\\cos m\\phi$ for $(m,n) = (0,1), (1,1), (2,1), (0,2)$ as surface plots and animate one. Verify the orthogonality integral for $(0,1)$ and $(0,2)$ numerically, including the weight $r$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'fourier-bessel-expansion',
              title: 'Fourier-Bessel series of an initial drum shape',
              prompt:
                'Expand the axisymmetric initial shape $u(r, 0) = 1 - r^2$ on the unit disc in the series $\\sum_n c_nJ_0(j_{0,n}r)$ using the orthogonality relation. Compute $c_1..c_{10}$ by quadrature, plot partial sums, and then animate the subsequent motion $\\sum c_nJ_0(j_{0,n}r)\\cos(j_{0,n}t)$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'modified-bessel-heat-loss',
              title: 'Modified Bessel functions: a cooling fin',
              prompt:
                'Steady temperature in a thin circular fin satisfies $\\frac{1}{r}\\frac{d}{dr}(r\\frac{dT}{dr}) - \\mu^2T = 0$ (heat loss to the air). Show the solution regular at the origin is $I_0(\\mu r)$ and the one decaying at infinity is $K_0(\\mu r)$. For an annular fin $a \\le r \\le b$ with $T(a) = T_0$ and insulated outer edge, write $T$ as a combination of $I_0, K_0$ and plot it for $\\mu = 2$, $a = 1$, $b = 3$; compare with a numerical BVP solution via `scipy.integrate.solve_bvp`.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is only $J_m$ admissible for a solid drum, and when would $Y_m$ be needed?',
              answerOutline:
                '$Y_m$ diverges at $r = 0$, which is unphysical for a membrane including the centre; it is needed for annular domains or regions excluding the axis.',
            },
            {
              question: 'How are the frequencies of a circular drum determined, and why are they inharmonic?',
              answerOutline:
                '$J_m(ka) = 0$ gives $\\omega_{mn} = cj_{m,n}/a$; the zeros of Bessel functions are not equally spaced in simple ratios, so overtones are not integer multiples of the fundamental.',
            },
            {
              question: 'What is the orthogonality relation for Bessel functions and where does the weight come from?',
              answerOutline:
                '$\\int_0^a J_m(j_{m,n}r/a)J_m(j_{m,n\'}r/a)\\,r\\,dr = 0$ for $n \\ne n\'$; the weight $r$ is the Sturm-Liouville weight (and the polar area element).',
            },
            {
              question: 'How do the modified Bessel functions relate to the ordinary ones?',
              answerOutline:
                '$I_\\nu(x) = i^{-\\nu}J_\\nu(ix)$: they solve the equation with $x^2 \\to -x^2$ and grow/decay monotonically like $\\cosh/\\sinh$ rather than oscillate.',
            },
          ],
        },
      ],
      project: {
        slug: 'pde-solver-gallery',
        title: 'Module project: a gallery of separated solutions',
        description:
          'Build a notebook that solves and animates six classic boundary-value problems by separation of variables: the heat equation on a rod (Dirichlet and Neumann), the plucked string, Laplace\'s equation in a rectangle and in a disc, the potential of a sphere with specified surface potential (Legendre), and the circular drum (Bessel). For each, verify against an independent finite-difference or relaxation solution and report the discrepancy as a function of the number of modes.',
        deliverables: [
          'Notebook with one section per problem: derivation, eigenfunction expansion, animation, numerical check',
          'A summary table of convergence rates of the modal expansions (error versus number of modes)',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Add the quantum particle in a circular box and in a spherical box and compare their spectra',
          'Solve the heat equation on a disc with a time-dependent boundary temperature using Duhamel\'s principle',
        ],
      },
    },
  ],
  capstone: {
    slug: 'derivations-portfolio-and-numerical-checks',
    title: 'Capstone: a derivations portfolio with numerical verification',
    description: `Assemble a portfolio of the twenty most important derivations in this subject, written out in your own words with every step justified, and a companion Jupyter notebook that checks each one numerically. The portfolio should include at least: the Gaussian integral and its moments; the Taylor remainder bound; the Jacobian for spherical coordinates; Newton's shell theorem; the maximum-entropy derivation of the Boltzmann distribution; the normal equations of least squares; the spectral theorem for Hermitian matrices; the normal modes of coupled oscillators; the resonance curve of the driven oscillator; the Euler-Lagrange equation and the brachistochrone; the divergence and Stokes theorems with an application to Maxwell's equations; the spherical Laplacian; Parseval's theorem and the Basel sum; the Fourier transform of a Gaussian and the uncertainty relation; the Green's function of $-d^2/dx^2$ and of the Laplacian; the residue evaluation of a Fourier-type integral and the causality of the oscillator response; the Sturm-Liouville orthogonality proof; the multipole expansion; and the drum modes.

For each derivation the notebook must contain an independent numerical check (quadrature, finite differences, random sampling, direct simulation) with a stated tolerance, and a short note on what approximation or convention would make the check fail. The point is to leave this subject with a reference you trust because you tested it.`,
    deliverables: [
      'A typeset (Markdown/LaTeX or PDF) portfolio of at least twenty derivations with all steps justified',
      'A Jupyter notebook with a numerical verification cell per derivation, each passing at a stated tolerance',
      'A one-page map showing which later subjects (mechanics, electromagnetism, quantum mechanics, statistics) use each derivation',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Add the Kramers-Kronig relations with a numerical demonstration on the oscillator response',
      'Derive and verify the hydrogen-atom radial equation solutions (associated Laguerre polynomials)',
      'Package the verification notebook as a pytest suite that runs in under a minute',
    ],
  },
  masteryChecklist: [
    'I can differentiate and integrate fluently, including by parts, substitution and partial fractions, and I know the Gaussian and Gamma-function integrals by heart',
    'I can Taylor-expand any smooth function, bound the error, and use expansions to extract physical limits',
    'I can set up and evaluate multiple integrals in Cartesian, cylindrical and spherical coordinates with the correct Jacobians',
    'I can solve linear systems, find eigenvalues and eigenvectors, diagonalise symmetric matrices and explain the spectral theorem',
    'I can solve first- and second-order linear ODEs, analyse the damped driven oscillator, and classify fixed points of nonlinear systems in the phase plane',
    'I can use Laplace transforms, series solutions and the Euler-Lagrange equation to solve physical problems',
    'I can compute gradient, divergence and curl in curvilinear coordinates and apply Green, Stokes and the divergence theorem',
    'I can expand functions in Fourier series and transforms, use the delta function and construct Green\'s functions',
    'I can evaluate real integrals by contour integration and explain the physical meaning of poles of a response function',
    'I can solve the heat, wave and Laplace equations by separation of variables and use Legendre, spherical-harmonic and Bessel expansions',
    'I have a verified portfolio of derivations and a notebook that checks every one numerically',
  ],
});
