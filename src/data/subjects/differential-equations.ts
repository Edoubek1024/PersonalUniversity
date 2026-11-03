import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const lebl = (note: string): ResourceInput => ({
  title: 'Notes on Diffy Qs',
  url: 'https://www.jirka.org/diffyqs/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jiří Lebl',
  note,
  primary: true,
});

const paul = (page: string, title: string, note: string): ResourceInput => ({
  title: `Paul's Online Notes: ${title}`,
  url: `https://tutorial.math.lamar.edu/Classes/DE/${page}.aspx`,
  type: 'textbook',
  cost: 'free',
  provider: 'Lamar University',
  note,
});

const mit1803 = (note: string): ResourceInput => ({
  title: 'MIT 18.03SC Differential Equations',
  url: 'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const threeBlue = (lesson: string, title: string, note: string): ResourceInput => ({
  title: `3Blue1Brown: ${title}`,
  url: `https://www.3blue1brown.com/lessons/${lesson}`,
  type: 'video',
  cost: 'free',
  provider: '3Blue1Brown',
  note,
});

const solveIvp = (note: string): ResourceInput => ({
  title: 'scipy.integrate.solve_ivp',
  url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
  note,
});

export default defineSubject({
  id: 'differential-equations',
  title: 'Introduction to Differential Equations',
  category: 'math',
  tagline:
    'Solve, sketch and simulate the equations of change: first-order models, oscillators, Laplace transforms, linear systems, Fourier series and a first look at PDEs.',
  description: `A differential equation states how something changes, and solving it tells you what happens. Cooling coffee, a swinging bridge, a circuit, two species in competition and heat spreading along a rod are all governed by the equations in this course. You will learn to solve the ones that can be solved in closed form, to read qualitative behaviour from the ones that cannot, and to compute numerical solutions you can trust.

This course follows the topics of MATH 285, Introduction to Differential Equations, at the University of Illinois Urbana-Champaign, as described in its public catalog entry: techniques and applications of ordinary differential equations, Fourier series, boundary value problems, linear systems and an introduction to partial differential equations. The lessons, examples and exercises here are original, and the course is not affiliated with or endorsed by the University of Illinois.

It assumes Calculus III. You do not need a linear algebra course first: the module on systems teaches the matrix facts it uses, namely determinants, eigenvalues and eigenvectors, at the level needed for two and three equations. Every lesson can be learned from the page, with one worked example at its heart. The free resources give a second explanation and more practice. Get into the habit of checking every answer by substituting it back into the equation. It is the cheapest and most reliable test you have.

The later proof-based courses \`ode-theory\` and \`partial-differential-equations\` both build on this one.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['calculus-3'],
  recommendedBackground: [
    'Fluent differentiation and integration, including partial fractions and integration by parts',
    'Partial derivatives and Taylor series',
    'Complex numbers at the level of Euler\'s formula helps, and is reviewed where it is used',
    'Basic Python (NumPy and Matplotlib) for the numerical exercises',
  ],
  tags: ['differential equations', 'modeling', 'Laplace transform', 'linear systems', 'Fourier series', 'PDEs', 'stability'],
  core: false,
  modules: [
    {
      slug: 'first-order-equations',
      title: 'First-Order Equations',
      description:
        'Turn a physical situation into an equation, solve the separable and linear cases exactly, and use direction fields, phase lines and Euler\'s method when no formula is available.',
      lessons: [
        {
          slug: 'modeling-and-solutions',
          title: 'Modeling and what a solution is',
          summary:
            'Write a rate equation from a physical description, classify it, and confirm a proposed solution by substitution.',
          estimatedMinutes: 90,
          objectives: [
            'Translate "rate in minus rate out" descriptions into a differential equation',
            'Classify an equation by order and as linear or non-linear, ordinary or partial',
            'Verify a proposed solution by substitution and fix a constant from an initial condition',
            'Read long-term behaviour from a formula and check that the units make sense',
          ],
          concepts: [
            'Differential equation',
            'Order',
            'Linear and non-linear equations',
            'General and particular solutions',
            'Initial value problem',
            'Balance law: rate in minus rate out',
          ],
          explanation: `A **differential equation** relates an unknown function to its derivatives. The **order** is that of the highest derivative. An ordinary differential equation (ODE) has one independent variable; a partial differential equation (PDE) has several. An $n$th-order ODE is **linear** if it can be written

$$a_n(t)y^{(n)} + \\dots + a_1(t)y' + a_0(t)y = g(t),$$

so that $y$ and its derivatives appear only to the first power, with coefficients depending on $t$ alone. Thus $y'' + t^2 y = \\sin t$ is linear, while $y' = y^2$ and $y'' + \\sin y = 0$ are not.

Most models come from a **balance law**: the rate of change of a quantity equals the rate it enters minus the rate it leaves.

**Worked example.** A tank holds 100 L of pure water. Brine with 0.2 kg of salt per litre flows in at 5 L/min, and the well-mixed solution flows out at 5 L/min. Let $Q(t)$ be the salt in kg. Salt enters at $0.2 \\times 5 = 1$ kg/min. The concentration is $Q/100$ kg/L, so salt leaves at $5Q/100 = Q/20$ kg/min. Therefore

$$Q' = 1 - \\frac{Q}{20}, \\qquad Q(0) = 0.$$

Claim: $Q(t) = 20 + Ce^{-t/20}$ solves the equation for every constant $C$. Substitute: the left side is $-\\frac{C}{20}e^{-t/20}$, and the right side is $1 - \\frac{20 + Ce^{-t/20}}{20} = -\\frac{C}{20}e^{-t/20}$. They agree. This family is the **general solution**. The initial condition gives $20 + C = 0$, so the **particular solution** is

$$Q(t) = 20\\left(1 - e^{-t/20}\\right).$$

As $t \\to \\infty$, $Q \\to 20$ kg, which matches a concentration of 0.2 kg/L in 100 L. The salt reaches half that value when $e^{-t/20} = 1/2$, at $t = 20\\ln 2 \\approx 13.9$ minutes.

The interactive below draws the slope $1 - Q/20$ at many points of the $(t, Q)$ plane. Every member of the family $20 + Ce^{-t/20}$ follows those slopes.

\`\`\`interactive
direction-field
{"title": "The tank equation Q' = 1 − Q/20", "f": "1 - Q/20", "vars": ["t", "Q"], "view": [0, 100, -5, 40], "start": [0, 0], "curves": [[0, 35], [0, 10]], "caption": "The red curve starts at the initial point (0, 0) and is Q = 20(1 − e^(−t/20)). It passes Q = 10 near t = 13.9. Tap anywhere to add another member of the general solution, or drag the red point to change the initial salt. Curves starting above 20 kg fall towards 20 and curves starting below rise towards it, so the limit is 20 kg whatever the initial value."}
\`\`\`

Notice the three checks: substitution, the limiting value, and the units (both sides of the equation are in kg/min). An equation together with a starting value is an **initial value problem**. Writing the model is usually the hard part, and it deserves more care than the integration that follows.`,
          resources: [
            lebl('The introductory chapter on classification and on what a solution is.'),
            paul('Modeling', 'Modeling with First Order Equations', 'Mixing, population and falling-object models with the set-up written out.'),
            threeBlue('differential-equations', 'Differential equations, studying the unsolvable', 'Why equations of change appear everywhere, and a first view of what a solution means.'),
          ],
          exercises: [
            {
              slug: 'classify-six',
              title: 'Classify six equations',
              prompt: `Give the order of each equation and say whether it is linear: (a) $y' + t y = e^t$; (b) $y'' + y y' = 0$; (c) $t^2 y''' - y = \\cos t$; (d) $y' = \\sqrt{1 + y^2}$; (e) $e^t y'' + y' = t^3$; (f) $y'' + \\sin(t)\\, y = 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'verify-by-substitution',
              title: 'Verify and find powers',
              prompt: `(a) Show by substitution that $y = e^{3t}$ and $y = e^{-t}$ solve $y'' - 2y' - 3y = 0$, and that $y = te^{3t}$ does not. (b) Find every value of $r$ for which $y = t^r$ solves $t^2 y'' - 2t y' + 2y = 0$ on $t > 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'drug-infusion-model',
              title: 'A drug infusion model',
              prompt: `A drug is infused at 2 mg/h, and the body eliminates it at a rate proportional to the amount present, with constant $k = 0.25\\ \\text{h}^{-1}$. Starting from none in the body, write the initial value problem for the amount $x(t)$. Verify that $x(t) = 8(1 - e^{-t/4})$ solves it, state the steady-state amount, and find how long it takes to reach 90% of that amount.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Rate in is constant. Rate out is $kx$.',
            },
            {
              slug: 'falling-with-drag',
              title: 'Falling with linear drag',
              prompt: `A mass $m$ falls from rest with gravity $g$ and drag force $cv$ opposing the motion, with $v$ measured downward. Derive $mv' = mg - cv$ from Newton's second law. Check that $v(t) = \\frac{mg}{c}\\left(1 - e^{-ct/m}\\right)$ solves it with $v(0) = 0$. State the terminal speed and check its units. For $m = 80$ kg, $g = 9.8\\ \\text{m/s}^2$ and $c = 12$ kg/s, find the terminal speed and the time to reach 95% of it.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes $y\' = ty$ linear but $y\' = y^2$ non-linear?',
              answerOutline: 'In the first, $y$ appears to the first power with a coefficient depending only on $t$. In the second, $y$ is squared.',
            },
            {
              question: 'What is the difference between the general solution and a particular solution?',
              answerOutline: 'The general solution is the whole family, with arbitrary constants. An initial condition selects one member, the particular solution.',
            },
            {
              question: 'In the tank example, why does the outflow rate depend on $Q$ while the inflow does not?',
              answerOutline: 'Inflow concentration is fixed. Outflow concentration is the current tank concentration $Q/100$, because the tank is well mixed.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/first-order-odes'],
        },
        {
          slug: 'separable-equations',
          title: 'Separable equations',
          summary:
            'Move each variable to its own side and integrate, then find the interval on which the solution is valid and any constant solutions you lost.',
          estimatedMinutes: 100,
          objectives: [
            'Recognise and solve separable equations, implicitly or explicitly',
            'Recover constant solutions lost when dividing',
            'Determine the interval of validity of a solution',
            'Solve and interpret Newton\'s law of cooling and the logistic equation',
          ],
          concepts: [
            'Separable equation',
            'Implicit solution',
            'Lost constant solutions',
            'Interval of validity',
            'Newton\'s law of cooling',
            'Logistic equation',
          ],
          explanation: `A first-order equation is **separable** if it can be written $y' = g(t)h(y)$. Where $h(y) \\neq 0$, divide and integrate:

$$\\int \\frac{dy}{h(y)} = \\int g(t)\\,dt + C.$$

This is just the chain rule in reverse. If $H$ is an antiderivative of $1/h$, then $\\frac{d}{dt}H(y(t)) = y'(t)/h(y(t)) = g(t)$, so $H(y(t))$ is an antiderivative of $g$.

Two traps follow. First, dividing by $h(y)$ loses any constant solution $y \\equiv y_0$ with $h(y_0) = 0$. Find those separately. Second, a solution is a differentiable function on an **interval**, and that interval may be shorter than the formula suggests.

**Worked example.** Solve $y' = ty^2$ with $y(0) = 1$.

The constant $y \\equiv 0$ solves the equation, but it fails the initial condition, so we may divide by $y^2$:

$$\\int y^{-2}\\,dy = \\int t\\,dt \\quad\\Longrightarrow\\quad -\\frac{1}{y} = \\frac{t^2}{2} + C.$$

At $t = 0$, $y = 1$ gives $C = -1$. Hence

$$y(t) = \\frac{1}{1 - t^2/2} = \\frac{2}{2 - t^2}.$$

Check: $y' = \\frac{4t}{(2 - t^2)^2}$, and $ty^2 = \\frac{4t}{(2 - t^2)^2}$. They agree.

The formula is defined for $t > \\sqrt{2}$ too, but the solution through $(0, 1)$ cannot cross the vertical asymptotes at $t = \\pm\\sqrt{2}$. Its interval of validity is the one containing the initial time: $-\\sqrt{2} < t < \\sqrt{2}$. The solution blows up in finite time even though the right side $ty^2$ is perfectly smooth. Linear equations never do that, as you will see in the next lesson.

\`\`\`interactive
direction-field
{"title": "Blow-up of y' = ty²", "f": "t*y^2", "view": [-2.5, 2.5, -2, 6], "start": [0, 1], "curves": [[0, 0], [0, -1]], "caption": "The red curve is y = 2/(2 − t²) through (0, 1). It runs off the top of the picture as t approaches ±√2 ≈ ±1.414 and never reaches the other side. Drag the red point upwards: the larger y(0) is, the sooner the curve blows up. The flat line y = 0 is the constant solution that dividing by y² loses. Curves below it (tap there) stay negative and exist for all t."}
\`\`\`

The same technique solves **Newton's law of cooling**, $T' = -k(T - A)$, where $A$ is the ambient temperature. Separating gives $T(t) = A + (T_0 - A)e^{-kt}$. The **logistic equation** $P' = rP(1 - P/K)$ also separates, with partial fractions on the left. Here $r$ is the small-population growth rate and $K$ is the carrying capacity.

When you integrate, keep the constant on one side only, and use the initial condition before you try to solve for $y$, since this often settles a choice of sign or branch.`,
          resources: [
            lebl('The section on separable equations, and the discussion of implicit solutions.'),
            paul('Separable', 'Separable Equations', 'Several examples with intervals of validity worked out.'),
            mit1803('The opening unit on first-order equations includes separable equations with recitation videos.'),
          ],
          exercises: [
            {
              slug: 'separable-drill',
              title: 'Separable drill',
              prompt: `Solve each initial value problem and state the interval of validity. (a) $y' = e^{t - y}$, $y(0) = 1$. (b) $y' = 2t(1 + y^2)$, $y(0) = 0$. (c) $y' = -y/t$, $y(1) = 3$, for $t > 0$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'In (b) the arctangent appears, and the tangent has asymptotes.',
            },
            {
              slug: 'coffee-cooling',
              title: 'Cooling coffee',
              prompt: `Coffee at 90 °C sits in a 20 °C room and has cooled to 60 °C after 10 minutes. Using Newton's law of cooling, find $k$ to three significant figures, and find the time at which the coffee reaches 30 °C. Is it ever exactly at 20 °C according to this model?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'logistic-solution',
              title: 'Solve the logistic equation',
              prompt: `Solve $P' = rP(1 - P/K)$ with $P(0) = P_0$, where $0 < P_0 < K$, using partial fractions. Show that
$$P(t) = \\frac{K}{1 + \\frac{K - P_0}{P_0}e^{-rt}}.$$
Prove that the graph has its inflection point exactly where $P = K/2$, and compute the time this happens for $r = 0.5$, $K = 1000$ and $P_0 = 10$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the inflection, differentiate the equation itself: $P\'\' = r(1 - 2P/K)P\'$.',
            },
            {
              slug: 'lost-solution',
              title: 'The solution that division loses',
              prompt: `Find the general solution of $y' = y^2 - 1$ by separation, in the form $\\frac{y - 1}{y + 1} = Ce^{2t}$. Of the two constant solutions $y \\equiv 1$ and $y \\equiv -1$, show which one comes from a value of $C$ and which one is lost. Then solve with $y(0) = 3$ and find the time at which the solution blows up.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Use partial fractions on $1/(y^2 - 1)$. As $y \\to \\infty$, the left side of the formula tends to 1.',
            },
          ],
          selfAssessment: [
            {
              question: 'How is separation of variables justified without treating $dy/dt$ as a fraction?',
              answerOutline: 'If $H$ is an antiderivative of $1/h$, the chain rule gives $\\frac{d}{dt}H(y) = y\'/h(y) = g(t)$. Integrating gives $H(y) = G(t) + C$.',
            },
            {
              question: 'Why is $y = 2/(2 - t^2)$ for $t > \\sqrt{2}$ not part of the solution with $y(0) = 1$?',
              answerOutline: 'A solution must be differentiable on an interval containing $t = 0$. The function has a vertical asymptote at $t = \\sqrt{2}$, so the interval stops there.',
            },
            {
              question: 'What do you do about values of $y$ where $h(y) = 0$?',
              answerOutline: 'Those give constant solutions. Check them separately, because dividing by $h(y)$ assumes it is non-zero.',
            },
          ],
        },
        {
          slug: 'linear-equations-and-integrating-factors',
          title: 'Linear equations and integrating factors',
          summary:
            'Multiply by the right function so that the left side becomes a single derivative, and solve any first-order linear equation.',
          estimatedMinutes: 100,
          objectives: [
            'Put a first-order linear equation in standard form and find the integrating factor',
            'Solve initial value problems and state the interval of validity',
            'Set up and solve mixing problems with changing volume and simple circuits',
            'Use a substitution to reduce a Bernoulli equation to a linear one',
          ],
          concepts: [
            'Standard form $y\' + p(t)y = g(t)$',
            'Integrating factor',
            'Transient and steady-state parts',
            'Time constant',
            'Bernoulli equation',
          ],
          explanation: `A first-order linear equation in **standard form** is

$$y' + p(t)y = g(t).$$

The idea is to multiply by a function $\\mu(t)$ that turns the left side into the derivative of a product. We want $\\mu y' + \\mu p y = (\\mu y)' = \\mu y' + \\mu' y$, which requires $\\mu' = p\\mu$. One solution is the **integrating factor**

$$\\mu(t) = \\exp\\left(\\int p(t)\\,dt\\right).$$

Any antiderivative of $p$ will do, so leave out the constant. The equation becomes $(\\mu y)' = \\mu g$, and integrating gives

$$y(t) = \\frac{1}{\\mu(t)}\\left(\\int \\mu(t)g(t)\\,dt + C\\right).$$

The standard form matters: $p$ is the coefficient of $y$ only after you divide by whatever multiplies $y'$.

**Worked example.** Solve $ty' + 2y = 4t^2$ with $y(1) = 2$.

Divide by $t$ (taking $t > 0$, since the initial time is $t = 1$):

$$y' + \\frac{2}{t}y = 4t.$$

Then $\\mu = \\exp(\\int 2/t\\,dt) = \\exp(2\\ln t) = t^2$. Multiplying through,

$$(t^2 y)' = 4t^3 \\quad\\Longrightarrow\\quad t^2 y = t^4 + C \\quad\\Longrightarrow\\quad y = t^2 + \\frac{C}{t^2}.$$

The condition $y(1) = 2$ gives $C = 1$, so $y = t^2 + t^{-2}$ on $t > 0$. Check: $ty' + 2y = t(2t - 2t^{-3}) + 2t^2 + 2t^{-2} = 4t^2$. It works.

The interval is decided by the coefficients, and you can read it off before solving. Here $p = 2/t$ and $g = 4t$ are continuous on $t > 0$, which is the interval that contains $t = 1$. This is a general theorem: if $p$ and $g$ are continuous on an open interval containing $t_0$, the initial value problem has exactly one solution on that **whole** interval. So a linear equation cannot blow up in the middle of an interval where its coefficients are continuous, in contrast to $y' = ty^2$.

\`\`\`interactive
direction-field
{"title": "Solutions of ty' + 2y = 4t²", "f": "4*t - 2*y/t", "view": [0, 3, -2, 10], "start": [1, 2], "curves": [[1, 1], [1, 0.5], [1, 3], [1, -0.5]], "caption": "The equation in standard form is y' = 4t − 2y/t. The red curve is the worked solution y = t² + t^(−2) through (1, 2). Every curve is y = t² + C/t². Each one is defined on the whole interval t > 0 and only blows up at t = 0, where p = 2/t is discontinuous. As t grows the C/t² transient fades and the curves crowd onto y = t². Drag the red point to change C."}
\`\`\`

For constant $p > 0$ the solution splits into a **transient**, $Ce^{-pt}$, which dies away and remembers the initial condition, and a **steady-state** part driven by $g$. The number $1/p$ is the **time constant**, the time for the transient to shrink by a factor of $e$.`,
          resources: [
            lebl('The section on linear equations and the integrating factor.'),
            paul('Linear', 'Linear Equations', 'Careful derivation of the integrating factor, then a run of examples.'),
            paul('IoV', 'Intervals of Validity', 'Compares what the existence theorems say for linear and non-linear equations.'),
          ],
          exercises: [
            {
              slug: 'integrating-factor-drill',
              title: 'Integrating factor drill',
              prompt: `Solve, and check by substitution: (a) $y' + 2y = e^{-t}$, $y(0) = 0$; (b) $y' + y\\tan t = \\cos t$, $y(0) = 1$, on $(-\\pi/2, \\pi/2)$; (c) $ty' - y = t^2$, $y(1) = 0$, on $t > 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'tank-changing-volume',
              title: 'A tank with changing volume',
              prompt: `A large tank starts with 50 L of pure water. Brine at 0.1 kg/L enters at 3 L/min, and the mixture leaves at 2 L/min. Write the equation for the salt $Q(t)$, solve it, and find the amount of salt after 50 minutes.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The volume at time $t$ is $50 + t$. The coefficient of $Q$ depends on $t$.',
            },
            {
              slug: 'rl-circuit',
              title: 'Switching on an RL circuit',
              prompt: `An inductor $L = 0.5$ H and resistor $R = 10\\ \\Omega$ are in series with a 12 V battery switched on at $t = 0$, so $LI' + RI = 12$ with $I(0) = 0$. Find $I(t)$, the steady-state current, the time constant, and the time for the current to reach 99% of steady state.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'bernoulli-substitution',
              title: 'Reducing a Bernoulli equation',
              prompt: `An equation $y' + p(t)y = q(t)y^n$ with $n \\neq 0, 1$ is non-linear, but $v = y^{1-n}$ makes it linear. Use this to solve $y' + y = y^2$ with $y(0) = 2$, and find the time at which the solution blows up. Describe how the behaviour differs when $y(0) = 1/2$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you divide by the leading coefficient before computing $\\mu$?',
              answerOutline: 'The derivation assumes the coefficient of $y\'$ is 1. Otherwise $\\mu$ fails to make the left side an exact derivative.',
            },
            {
              question: 'Without solving, on what interval does $(t - 3)y\' + y = \\ln(t)$ with $y(1) = 0$ have a unique solution?',
              answerOutline: 'Standard form has $p = 1/(t - 3)$ and $g = \\ln(t)/(t - 3)$, continuous on $(0, 3)$, which contains $t = 1$.',
            },
            {
              question: 'What are the transient and the steady state in $y\' + 3y = 6$?',
              answerOutline: 'Solution $y = 2 + Ce^{-3t}$. The transient is $Ce^{-3t}$ with time constant $1/3$; the steady state is $2$.',
            },
          ],
        },
        {
          slug: 'direction-fields-and-eulers-method',
          title: "Direction fields and Euler's method",
          summary:
            'See solutions without solving by drawing slopes, then turn that picture into the simplest numerical method.',
          estimatedMinutes: 110,
          objectives: [
            'Sketch a direction field and solution curves using isoclines',
            'Carry out Euler\'s method by hand and in code',
            'Measure the global error and show that it is proportional to the step size',
            'Recognise numerical instability on a stiff decay problem',
          ],
          concepts: [
            'Direction field',
            'Isocline',
            'Euler\'s method',
            'Step size',
            'Local and global error',
            'First-order accuracy',
            'Numerical instability',
          ],
          explanation: `The equation $y' = f(t, y)$ tells you the slope of the solution at every point of the $(t, y)$ plane, even when you cannot find a formula. Drawing a short segment of slope $f(t, y)$ at many points gives a **direction field**, and a solution is a curve tangent to the segments everywhere. By hand, use **isoclines**: the curves $f(t, y) = c$, along which every segment has the same slope $c$.

**Euler's method** walks along the field in straight steps. With step $h$ and $t_{n+1} = t_n + h$,

$$y_{n+1} = y_n + h f(t_n, y_n).$$

Each step follows the tangent line for a distance $h$. One step makes a **local error** of about $\\tfrac{1}{2}y''h^2$, from Taylor's theorem. Reaching a fixed time takes about $1/h$ steps, so the **global error** is proportional to $h$. Euler's method is **first-order accurate**: halving $h$ roughly halves the error.

**Worked example.** Take $y' = t - y$ with $y(0) = 1$, and approximate $y(1)$. This equation is linear, with exact solution $y = t - 1 + 2e^{-t}$, so $y(1) = 2/e \\approx 0.7358$.

With $h = 0.5$: $y_1 = 1 + 0.5(0 - 1) = 0.5$, and $y_2 = 0.5 + 0.5(0.5 - 0.5) = 0.5$. The error is $0.2358$.

With $h = 0.25$:

| $n$ | $t_n$ | $y_n$ | $t_n - y_n$ |
|---|---|---|---|
| 0 | 0 | 1 | $-1$ |
| 1 | 0.25 | 0.75 | $-0.5$ |
| 2 | 0.5 | 0.625 | $-0.125$ |
| 3 | 0.75 | 0.59375 | $0.15625$ |
| 4 | 1 | 0.63281 | |

The error is now $0.1030$. Halving $h$ cut the error by a factor of about 2.3, and the ratio approaches 2 as $h$ shrinks.

You can repeat this experiment in the interactive below. Each notch of the slider halves $h$.

\`\`\`interactive
direction-field
{"title": "Euler's method for y' = t − y", "f": "t - y", "view": [-0.25, 2.5, -0.25, 1.75], "start": [0, 1], "euler": true, "span": 1, "hs": [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625], "h": 0.5, "caption": "With h = 0.5 the red Euler steps end at 0.5, an error of 0.2358, and with h = 0.25 at 0.63281, as in the table. The green curve is the exact solution, y(1) = 2/e ≈ 0.7358. Keep halving h and watch the ratio of successive errors: 2.29, then 2.14, 2.07, ..., approaching 2, which is first-order accuracy. Each step follows the slope at its left end, and here the solution curves upwards, so Euler always lands below it. Drag the red point to try another initial value."}
\`\`\`

In code the method takes a few lines, and you should always run a **convergence study**: repeat with $h, h/2, h/4$, and confirm the error behaves as predicted. That is how you find bugs, and it is how you decide whether to trust a number for a problem with no exact solution.

Small steps also matter for stability. For $y' = -\\lambda y$ with $\\lambda > 0$, Euler gives $y_{n+1} = (1 - h\\lambda)y_n$, and if $h > 2/\\lambda$ the numbers grow without bound although the true solution decays. Library routines such as \`solve_ivp\` use higher-order formulas and adjust the step automatically, but they rest on the same idea.

\`\`\`interactive
direction-field
{"title": "Euler on the stiff decay y' = −20y", "f": "-20*y", "view": [0, 1.5, -2, 2], "start": [0, 1], "euler": true, "span": 1.5, "hs": [0.15, 0.1, 0.05, 0.01], "h": 0.15, "caption": "Here λ = 20, so 2/λ = 0.1. With h = 0.15 each step multiplies y by 1 − 20h = −2: the red path flips sign and doubles every step, and it ends at 1024 instead of almost 0. With h = 0.1 the factor is −1, so it bounces between ±1 for ever. With h = 0.05 the factor is 0, and with h = 0.01 it is 0.8. Only these last two decay like the true solution e^(−20t)."}
\`\`\``,
          resources: [
            lebl('The sections on slope fields and on numerical methods.'),
            paul('DirectionFields', 'Direction Fields', 'How to sketch a field and read long-term behaviour from it.'),
            paul('EulersMethod', "Euler's Method", 'Derivation from the tangent line, with error tables.'),
            solveIvp('For comparison: what a production solver offers, including error tolerances and stiff methods.'),
          ],
          exercises: [
            {
              slug: 'euler-by-hand',
              title: 'Euler by hand',
              prompt: `Use Euler's method with $h = 0.25$ to approximate $y(1)$ for $y' = 2y$, $y(0) = 1$. Compare with the exact value, and show that $n$ steps of size $1/n$ give exactly $(1 + 2/n)^n$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'isoclines-field',
              title: 'Isoclines and a hidden solution',
              prompt: `For $y' = y - t$, find the isoclines for slopes $c = -1, 0, 1, 2$ and sketch the direction field by hand. Show that one isocline is itself a solution curve, and explain what happens to solutions that start above it and below it.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'euler-convergence-study',
              title: 'A convergence study',
              prompt: `Write a Python function \`euler(f, t0, y0, tf, n)\`. Apply it to $y' = t - y$, $y(0) = 1$ on $[0, 1]$ with $n = 10, 20, 40, 80, 160$. Tabulate the error at $t = 1$ and the ratio of successive errors, plot the error against $h$ on log-log axes, and fit the slope. The ratios should approach 2.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'improved-euler',
              title: 'Improved Euler',
              prompt: `The improved Euler (Heun) method uses a predictor $\\tilde y = y_n + hf(t_n, y_n)$ and then $y_{n+1} = y_n + \\frac{h}{2}\\left(f(t_n, y_n) + f(t_{n+1}, \\tilde y)\\right)$. Repeat the convergence study of the previous exercise with this method. What are the ratios now, and what order of accuracy does that imply? By hand, compute one step with $h = 0.5$ from $y(0) = 1$ for $y' = t - y$.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'euler-stability',
              title: 'When Euler explodes',
              prompt: `Apply Euler's method to $y' = -20y$, $y(0) = 1$ on $[0, 1.5]$ with $h = 0.15$, $h = 0.1$, $h = 0.05$ and $h = 0.01$. Describe each result and explain them using the factor $1 - 20h$. What step size is required for the numerical solution to decay?`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a global error of order $h$ follow from a local error of order $h^2$?',
              answerOutline: 'About $1/h$ steps are needed to reach a fixed time, and errors accumulate, giving roughly $h^2 \\cdot 1/h = h$.',
            },
            {
              question: 'What is an isocline, and how does it help?',
              answerOutline: 'A curve $f(t, y) = c$ along which solutions all have slope $c$. Drawing a few fills in the field quickly.',
            },
            {
              question: 'How can you tell numerical instability from true growth?',
              answerOutline: 'Instability changes when you refine $h$, and it often oscillates in sign. True behaviour converges as $h$ shrinks.',
            },
          ],
        },
        {
          slug: 'existence-and-autonomous-equations',
          title: 'Existence, uniqueness and autonomous equations',
          summary:
            'Know when a solution is guaranteed, and read the long-term behaviour of $y\' = f(y)$ straight from a phase line.',
          estimatedMinutes: 110,
          objectives: [
            'State and apply the existence and uniqueness theorem for first-order equations',
            'Give examples of non-uniqueness and of finite-time blow-up',
            'Draw a phase line and classify equilibria as stable, unstable or semistable',
            'Use the derivative test for stability of an equilibrium',
          ],
          concepts: [
            'Existence and uniqueness theorem',
            'Non-uniqueness',
            'Autonomous equation',
            'Equilibrium solution',
            'Phase line',
            'Stable, unstable, semistable',
            'Bifurcation in a harvesting model',
          ],
          explanation: `**Theorem.** If $f$ and $\\partial f/\\partial y$ are continuous on an open rectangle containing $(t_0, y_0)$, then $y' = f(t, y)$, $y(t_0) = y_0$ has exactly one solution on some interval around $t_0$.

The interval may be small and the theorem does not say how small. For example $y' = y^2$, $y(0) = 1$ has the solution $y = 1/(1 - t)$, which stops at $t = 1$. The hypothesis on $\\partial f/\\partial y$ is needed for uniqueness: $y' = y^{1/3}$, $y(0) = 0$ has both $y \\equiv 0$ and $y = (2t/3)^{3/2}$ for $t \\geq 0$, and here $\\partial f/\\partial y = \\frac{1}{3}y^{-2/3}$ is undefined at $y = 0$.

Uniqueness has a useful picture: two solutions of an equation satisfying the hypotheses cannot cross, because the crossing point would have two solutions through it.

An equation $y' = f(y)$ with no explicit $t$ is **autonomous**. A number $y^*$ with $f(y^*) = 0$ gives a constant solution, an **equilibrium**. On a number line, called the **phase line**, mark the equilibria and draw an arrow right where $f > 0$ and left where $f < 0$. Because solutions cannot cross equilibria, the line shows every solution's fate. An equilibrium is **stable** if nearby arrows point towards it, **unstable** if they point away, and **semistable** if they do one of each. When $f$ is differentiable, $f'(y^*) < 0$ implies stable and $f'(y^*) > 0$ implies unstable. If $f'(y^*) = 0$ the test says nothing.

**Worked example.** Fish with logistic growth are harvested at a constant rate. In scaled units,

$$P' = P(1 - P) - \\frac{3}{16} = -\\left(P - \\frac14\\right)\\left(P - \\frac34\\right).$$

The equilibria are $P = 1/4$ and $P = 3/4$. For $P$ between them, $P' > 0$. Outside them, $P' < 0$. So the arrows point up between the two values and down elsewhere, and $P = 3/4$ is stable while $P = 1/4$ is unstable. The derivative test agrees: with $f(P) = P - P^2 - 3/16$, $f'(P) = 1 - 2P$, so $f'(1/4) = 1/2 > 0$ and $f'(3/4) = -1/2 < 0$.

The meaning is practical. A population above $1/4$ settles at $3/4$. A population below $1/4$ falls to zero in finite time and the fishery collapses.

For general harvest $h$, the equilibria solve $P^2 - P + h = 0$, so they exist only for $h \\leq 1/4$. As $h$ grows they approach each other, merge at $P = 1/2$ when $h = 1/4$, and vanish. For $h > 1/4$, $P' < 0$ everywhere, and every population collapses. This sudden change in behaviour is a **bifurcation**.

Drag the harvest slider in the interactive below to watch the bifurcation happen.

\`\`\`interactive
direction-field
{"title": "Harvested fish: P' = P(1 − P) − h", "f": "P*(1 - P) - h", "vars": ["t", "P"], "sliders": {"h": [0.1875, 0, 0.35, 0.0025]}, "view": [0, 12, -0.25, 1.25], "start": [0, 0.5], "curves": [[0, 0.2], [0, 1.1], [0, 0.3]], "phaseLine": true, "caption": "At h = 3/16 the phase line on the right shows the unstable equilibrium P = 1/4 (hollow) and the stable P = 3/4 (filled). The arrows point up between them and down outside. Curves starting above 1/4 settle at 3/4, and those below fall through zero. Slide h up to 1/4: the two equilibria meet at P = 1/2, where f′ = 0 and the point is semistable. Past 1/4 they vanish and every curve falls. Solution curves never cross the dashed equilibrium lines, as uniqueness requires."}
\`\`\``,
          resources: [
            lebl('The sections on existence and uniqueness and on autonomous equations.'),
            paul('EquilibriumSolutions', 'Equilibrium Solutions', 'Phase-line reasoning, with sketches.'),
            paul('IoV', 'Intervals of Validity', 'Worked statements of the theorem, with non-uniqueness examples.'),
          ],
          exercises: [
            {
              slug: 'apply-existence-theorem',
              title: 'Apply the theorem',
              prompt: `For each initial value problem, say whether the theorem guarantees a unique solution near the initial time, and why. (a) $y' = \\sqrt{y}$, $y(0) = 1$. (b) $y' = \\sqrt{y}$, $y(0) = 0$. (c) $y' = y/(t^2 - 1)$, $y(1) = 0$. (d) $y' = t^2 + y^2$, $y(0) = 0$. For (b), find two distinct solutions.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'In (c), $f$ is not defined at the initial point.',
            },
            {
              slug: 'phase-line-cubic',
              title: 'A phase line for a cubic',
              prompt: `Draw the phase line of $y' = y^3 - y$ and classify each equilibrium, using both arrows and the derivative test. State the limit of $y(t)$ as $t$ increases for $y(0) = -0.5$ and $y(0) = 0.5$, and say what happens for $y(0) = 2$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'fishery-quota',
              title: 'Setting a fishing quota',
              prompt: `A fish stock obeys $P' = 0.5P(1 - P/100) - H$, with $P$ in tonnes and $t$ in years. Find the largest harvest $H$ for which an equilibrium exists. For $H = 8$, find the equilibria, classify them, and state the smallest initial stock from which the fishery survives.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'semistable-equilibrium',
              title: 'A semistable equilibrium',
              prompt: `For $y' = (y - 1)^2$, show the derivative test is inconclusive at $y = 1$, and classify the equilibrium from the phase line. Solve exactly with $y(0) = 0$ and with $y(0) = 2$. Compare the limit in the first case with the blow-up time in the second.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State a condition that guarantees uniqueness, and give an example where it fails and uniqueness fails with it.',
              answerOutline: 'Continuity of $f$ and $\\partial f/\\partial y$ near the initial point. Example: $y\' = y^{1/3}$, $y(0) = 0$.',
            },
            {
              question: 'Why can a solution of an autonomous equation with smooth $f$ never reach an equilibrium in finite time?',
              answerOutline: 'The equilibrium is itself a solution, so reaching it would mean two solutions through one point, contradicting uniqueness.',
            },
            {
              question: 'What happens to the equilibria of $P\' = P(1 - P) - h$ as $h$ rises past $1/4$?',
              answerOutline: 'The stable and unstable equilibria merge at $P = 1/2$ when $h = 1/4$ and then vanish, so every population collapses.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/first-order-odes'],
        },
      ],
      project: {
        slug: 'harvest-model-lab',
        title: 'Harvest model lab',
        description: `Build a small Python study of a harvested population, $P' = rP(1 - P/K) - H$, combining the exact, qualitative and numerical views from this module. Use your own parameters, and choose ones you can justify for some real species from a published estimate or a reasoned guess. The aim is to show that three different kinds of argument give the same answer.`,
        deliverables: [
          'A function implementing Euler and improved Euler, with a convergence table showing orders 1 and 2 on a problem with a known solution',
          'The exact solution for $H = 0$, compared with your numerical solutions on a plot',
          'A phase line for three values of $H$: below, at and above the critical harvest $rK/4$',
          'A plot of equilibria against $H$ showing the bifurcation, with the stable and unstable branches marked',
          'A short note, around one page, on what a safety margin below $rK/4$ would protect against',
        ],
        estimatedHours: 6,
        stretchGoals: ['Make $H$ proportional to $P$ (constant effort) and compare the two policies'],
      },
    },
    {
      slug: 'second-order-linear-equations',
      title: 'Second-Order Linear Equations',
      description:
        'The structure of solutions, constant-coefficient equations, two ways of handling a forcing term, and the physics of oscillators and resonance.',
      lessons: [
        {
          slug: 'linear-structure-and-the-wronskian',
          title: 'Superposition and the Wronskian',
          summary:
            'Why two independent solutions are all you need, and how a determinant tells you when you have them.',
          estimatedMinutes: 100,
          objectives: [
            'State the existence theorem for second-order linear equations',
            'Use superposition to build solutions of a homogeneous equation',
            'Compute a Wronskian and decide whether two solutions form a fundamental set',
            'Find a second solution by reduction of order',
          ],
          concepts: [
            'Homogeneous and non-homogeneous equations',
            'Superposition',
            'Linear independence',
            'Wronskian',
            'Fundamental set of solutions',
            'Abel\'s formula',
            'Reduction of order',
          ],
          explanation: `Consider the linear equation $y'' + p(t)y' + q(t)y = g(t)$, with $p$, $q$ and $g$ continuous on an open interval $I$. The theorem from first-order equations extends: for any $t_0 \\in I$ and any numbers $y_0, v_0$, there is exactly one solution on all of $I$ with $y(t_0) = y_0$ and $y'(t_0) = v_0$. Two pieces of data are needed because the equation is second order.

If $g = 0$ the equation is **homogeneous**, and **superposition** holds: if $y_1$ and $y_2$ are solutions, so is $c_1 y_1 + c_2 y_2$. To see this, substitute and use linearity of differentiation. This fails for non-linear equations.

To match arbitrary initial data with $y = c_1 y_1 + c_2 y_2$, you need to solve

$$\\begin{pmatrix} y_1(t_0) & y_2(t_0) \\\\ y_1'(t_0) & y_2'(t_0) \\end{pmatrix}\\begin{pmatrix} c_1 \\\\ c_2 \\end{pmatrix} = \\begin{pmatrix} y_0 \\\\ v_0 \\end{pmatrix},$$

which is possible for all data exactly when the determinant, the **Wronskian** $W = y_1 y_2' - y_1' y_2$, is non-zero at $t_0$. Then $y_1, y_2$ form a **fundamental set**, and every solution of the homogeneous equation is $c_1 y_1 + c_2 y_2$: any solution has some initial data, the combination matches it, and uniqueness says they are the same function.

**Abel's formula** shows that $W' = -pW$, so $W(t) = W(t_0)\\exp\\left(-\\int_{t_0}^t p\\right)$. For two solutions, $W$ is therefore zero everywhere on $I$ or nowhere. You may check it at whichever point is easiest.

**Worked example.** On $t > 0$, consider $t^2 y'' - 2y = 0$. Trying $y = t^r$ gives $r(r - 1) - 2 = 0$, so $r = 2$ or $r = -1$. With $y_1 = t^2$ and $y_2 = t^{-1}$,

$$W = t^2(-t^{-2}) - (2t)(t^{-1}) = -1 - 2 = -3 \\neq 0.$$

So the general solution is $y = c_1 t^2 + c_2 t^{-1}$. For $y(1) = 1$, $y'(1) = 0$ we solve $c_1 + c_2 = 1$ and $2c_1 - c_2 = 0$, giving $c_1 = 1/3$, $c_2 = 2/3$. Abel agrees: standard form has $p = 0$, so $W$ must be constant, and it is.

Finally, if $g \\neq 0$, the difference of two solutions solves the homogeneous equation. So the general solution of the full equation is

$$y = y_p + c_1 y_1 + c_2 y_2,$$

any one particular solution plus the homogeneous general solution. This single fact organises the rest of this module: first solve $g = 0$, then find one $y_p$.`,
          resources: [
            lebl('The section on second-order linear equations and superposition.'),
            paul('SecondOrderConcepts', 'Basic Concepts', 'The Wronskian and fundamental sets, stated with care.'),
            paul('Wronskian', 'More on the Wronskian', 'What the Wronskian does and does not tell you about general functions.'),
          ],
          exercises: [
            {
              slug: 'wronskian-checks',
              title: 'Wronskian checks',
              prompt: `Compute the Wronskian of each pair and decide whether it is a fundamental set for the stated equation. (a) $\\cos 3t, \\sin 3t$ for $y'' + 9y = 0$. (b) $e^{2t}, 5e^{2t}$ for $y'' - 4y = 0$. (c) $\\cosh t, \\sinh t$ for $y'' - y = 0$. (d) $t, 1/t$ for $t^2y'' + ty' - y = 0$ on $t > 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'reduction-of-order',
              title: 'Reduction of order',
              prompt: `Given that $y_1 = t$ solves $t^2y'' + ty' - y = 0$ on $t > 0$, substitute $y = v(t)\\,t$, obtain a first-order equation for $v'$, and find a second solution. Then use Abel's formula to predict the Wronskian of the pair and check it directly.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'superposition-fails',
              title: 'Superposition fails without linearity',
              prompt: `Consider the non-linear equation $yy'' + (y')^2 = 0$ on $t > 0$. Show that $y_1 = 1$ and $y_2 = \\sqrt{t}$ are solutions, but that $y_1 + y_2$ is not. Point to the step of the superposition argument that breaks.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'wronskian-zero-independent',
              title: 'Independent with zero Wronskian',
              prompt: `Let $f(t) = t^2$ and $g(t) = t|t|$ on $\\mathbb{R}$. Show that $g$ is differentiable, that $W(f, g) \\equiv 0$, and that $f$ and $g$ are nevertheless linearly independent on $\\mathbb{R}$. Explain why this does not contradict Abel's formula, and why $f$ and $g$ cannot both solve an equation $y'' + py' + qy = 0$ with continuous coefficients on an interval containing 0.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'At $t = 0$ both functions have value 0 and slope 0. Think about uniqueness.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does every solution of the homogeneous equation have the form $c_1 y_1 + c_2 y_2$ when $W \\neq 0$?',
              answerOutline: 'Given a solution, pick $c_1, c_2$ to match its values at $t_0$, which is possible since $W(t_0) \\neq 0$. Uniqueness makes the two functions equal.',
            },
            {
              question: 'What does Abel\'s formula tell you about where a Wronskian of two solutions can vanish?',
              answerOutline: 'It is an exponential times a constant, so it is identically zero or never zero on $I$.',
            },
            {
              question: 'If $y_p$ solves the full equation, what is the general solution?',
              answerOutline: '$y_p + c_1 y_1 + c_2 y_2$, since the difference of two solutions of the full equation solves the homogeneous one.',
            },
          ],
        },
        {
          slug: 'characteristic-roots',
          title: 'Constant coefficients and characteristic roots',
          summary:
            'Exponentials turn $ay\'\' + by\' + cy = 0$ into a quadratic, and its three cases give exponentials, oscillations and a repeated-root correction.',
          estimatedMinutes: 100,
          objectives: [
            'Solve constant-coefficient homogeneous equations in all three root cases',
            'Use Euler\'s formula to convert complex exponentials into real solutions',
            'Explain where the factor $t$ comes from for a repeated root',
            'Fit initial conditions and put an oscillation in amplitude-phase form',
          ],
          concepts: [
            'Characteristic equation',
            'Distinct real roots',
            'Complex conjugate roots',
            'Repeated roots',
            'Euler\'s formula',
            'Amplitude and phase',
          ],
          explanation: `For $ay'' + by' + cy = 0$ with constants $a \\neq 0, b, c$, try $y = e^{rt}$. Every derivative brings a factor $r$, and the exponential cancels, leaving the **characteristic equation**

$$ar^2 + br + c = 0.$$

There are three cases, set by the discriminant $b^2 - 4ac$.

**Distinct real roots.** $y = c_1 e^{r_1 t} + c_2 e^{r_2 t}$.

**Complex roots** $r = \\alpha \\pm i\\beta$ with $\\beta > 0$. Euler's formula $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$, which you can confirm from Taylor series, gives $e^{(\\alpha + i\\beta)t} = e^{\\alpha t}(\\cos\\beta t + i\\sin\\beta t)$. Since the coefficients are real, the real and imaginary parts of a complex solution are real solutions, so

$$y = e^{\\alpha t}(c_1\\cos\\beta t + c_2\\sin\\beta t).$$

**Repeated root** $r_1 = r_2 = r$. Only one exponential appears. Reduction of order supplies the second solution, and the general solution is $y = (c_1 + c_2 t)e^{rt}$. To see why, write the operator as $(D - r)^2$, where $D = d/dt$. Since $(D - r)(te^{rt}) = e^{rt}$ and $(D - r)e^{rt} = 0$, applying $(D - r)$ twice to $te^{rt}$ gives zero.

**Worked example.** Solve $y'' + 2y' + 5y = 0$ with $y(0) = 1$, $y'(0) = 1$.

The characteristic equation $r^2 + 2r + 5 = 0$ has roots $r = -1 \\pm 2i$. So

$$y = e^{-t}(c_1\\cos 2t + c_2\\sin 2t).$$

Then $y(0) = c_1 = 1$. Differentiating, $y'(0) = -c_1 + 2c_2 = 1$, so $c_2 = 1$. Thus

$$y = e^{-t}(\\cos 2t + \\sin 2t).$$

To read this as a single oscillation, use $c_1\\cos\\beta t + c_2\\sin\\beta t = R\\cos(\\beta t - \\delta)$, with $R = \\sqrt{c_1^2 + c_2^2}$ and $\\delta$ the angle of the point $(c_1, c_2)$. Here $R = \\sqrt{2}$ and $\\delta = \\pi/4$, so

$$y = \\sqrt{2}\\,e^{-t}\\cos(2t - \\pi/4),$$

a wave of angular frequency 2 inside the shrinking envelope $\\pm\\sqrt{2}\\,e^{-t}$.

A common mistake is to get $\\delta$ from $\\arctan(c_2/c_1)$ without looking at the signs. The arctangent returns an angle in $(-\\pi/2, \\pi/2)$, which is wrong by $\\pi$ whenever $c_1 < 0$. Plot the point $(c_1, c_2)$ to choose the correct quadrant.

The sign of the real parts controls the long-term behaviour. All solutions decay exactly when both roots have negative real part, which for $a > 0$ means $b > 0$ and $c > 0$.

The interactive below treats $ay'' + by' + cy = 0$ as a mass $a$ on a spring of stiffness $c$ with damping $b$, and plots the two roots in the complex plane.

\`\`\`interactive
oscillator
{"title": "Characteristic roots of ay'' + by' + cy = 0", "mode": "free", "var": "y", "names": ["a", "b", "c"], "m": 1, "c": 2, "k": 5, "x0": 1, "v0": 1, "tMax": 10, "ranges": {"m": [0.5, 3], "c": [-1, 8], "k": [0.5, 10]}, "caption": "The start is the worked example y'' + 2y' + 5y = 0 with y(0) = y'(0) = 1. The roots are −1 ± 2i, and the graph is √2 e^(−t) cos(2t − π/4). Increase b and the roots slide round the dashed circle of radius √(c/a) until they meet on the real axis at b = 2√5 ≈ 4.47, the repeated root. Beyond that they split along the axis and the oscillation is gone. Drag b below 0 and the roots cross into the right half-plane (unshaded), so the solution grows. Press Play to watch the mass."}
\`\`\``,
          resources: [
            lebl('The sections on constant-coefficient equations, including complex roots.'),
            paul('IntroSecondOrder', 'Second Order Differential Equations', 'Separate pages for real, complex and repeated roots, each with several examples.'),
            mit1803('The second-order unit, with lecture videos on complex roots and damping.'),
          ],
          exercises: [
            {
              slug: 'three-cases',
              title: 'Three cases',
              prompt: `Find the solution of each initial value problem. (a) $y'' - y' - 6y = 0$, $y(0) = 1$, $y'(0) = 8$. (b) $y'' - 4y' + 4y = 0$, $y(0) = 2$, $y'(0) = 1$. (c) $y'' + 6y' + 13y = 0$, $y(0) = 0$, $y'(0) = 4$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'amplitude-phase',
              title: 'Amplitude-phase form',
              prompt: `Write $y = -\\cos 3t + \\sqrt{3}\\,\\sin 3t$ in the form $R\\cos(3t - \\delta)$ with $R > 0$ and $0 \\leq \\delta < 2\\pi$. Find the first $t > 0$ at which $y$ reaches its maximum.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'The point $(-1, \\sqrt{3})$ is in the second quadrant.',
            },
            {
              slug: 'all-solutions-decay',
              title: 'When do all solutions decay?',
              prompt: `For $a > 0$, prove that every solution of $ay'' + by' + cy = 0$ tends to 0 as $t \\to \\infty$ if and only if $b > 0$ and $c > 0$. Consider each root case. Then use the result to find every real $k$ for which all solutions of $y'' + (k - 1)y' + (2 - k)y = 0$ decay.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'limit-of-distinct-roots',
              title: 'The repeated root as a limit',
              prompt: `For $\\epsilon \\neq 0$, the function $\\frac{e^{(r + \\epsilon)t} - e^{rt}}{\\epsilon}$ solves the equation with roots $r$ and $r + \\epsilon$. Find its limit as $\\epsilon \\to 0$, and explain how this accounts for the solution $te^{rt}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can you take real and imaginary parts of a complex solution?',
              answerOutline: 'The coefficients are real, so the equation applied to $u + iv$ gives $Lu + iLv = 0$, and both parts must vanish.',
            },
            {
              question: 'What is the general solution of $y\'\' + 4y = 0$, and of $y\'\' - 4y = 0$?',
              answerOutline: '$c_1\\cos 2t + c_2\\sin 2t$, and $c_1 e^{2t} + c_2 e^{-2t}$.',
            },
            {
              question: 'Why is $\\arctan(c_2/c_1)$ not always the phase $\\delta$?',
              answerOutline: 'Arctangent cannot distinguish $(c_1, c_2)$ from $(-c_1, -c_2)$. If $c_1 < 0$, add $\\pi$.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/second-order-linear-odes-and-oscillators'],
        },
        {
          slug: 'undetermined-coefficients',
          title: 'Undetermined coefficients',
          summary:
            'Guess the form of a particular solution from the forcing term, and correct the guess when it overlaps the homogeneous solution.',
          estimatedMinutes: 100,
          objectives: [
            'Choose the trial form for polynomial, exponential and sinusoidal forcing',
            'Apply the modification rule when the guess solves the homogeneous equation',
            'Use superposition for a sum of forcing terms',
            'Combine a particular solution with initial conditions in the correct order',
          ],
          concepts: [
            'Particular solution',
            'Trial form',
            'Modification rule',
            'Superposition of forcing terms',
            'Complex exponential shortcut',
          ],
          explanation: `For constant coefficients, a forcing term built from polynomials, exponentials and sines and cosines reproduces its own kind under differentiation, so a particular solution has the same kind of form. Write the form with unknown constants, substitute, and match coefficients.

| Forcing $g(t)$ | Trial form $Y(t)$ |
|---|---|
| Polynomial of degree $m$ | Polynomial of degree $m$ (all terms) |
| $e^{at}$ | $Ae^{at}$ |
| $\\cos bt$ or $\\sin bt$ | $A\\cos bt + B\\sin bt$ |
| $e^{at}\\cos bt$ or $e^{at}\\sin bt$ | $e^{at}(A\\cos bt + B\\sin bt)$ |

Products combine: forcing $t^2 e^{3t}$ needs $(At^2 + Bt + C)e^{3t}$. If $g$ is a sum, treat each piece separately and add the answers.

**Modification rule.** If any term of the trial form solves the homogeneous equation, the trial cannot work, because substituting it gives zero. Multiply the whole trial by $t$, or by $t^2$ if that still overlaps.

**Worked example.** Solve $y'' - 3y' + 2y = 4e^t$ with $y(0) = 0$, $y'(0) = 0$.

The characteristic roots are $1$ and $2$, so $y_h = c_1 e^t + c_2 e^{2t}$. The natural guess $Ae^t$ is a homogeneous solution, so use $Y = Ate^t$. Then

$$Y' = A(1 + t)e^t, \\qquad Y'' = A(2 + t)e^t.$$

Substituting,

$$A[(2 + t) - 3(1 + t) + 2t]e^t = -Ae^t = 4e^t,$$

so $A = -4$. The $t$ terms cancel, as they must when the modification is right. Now the general solution is $y = c_1 e^t + c_2 e^{2t} - 4te^t$, and only now do we apply initial conditions:

$$y(0) = c_1 + c_2 = 0, \\qquad y'(0) = c_1 + 2c_2 - 4 = 0.$$

Thus $c_2 = 4$ and $c_1 = -4$, giving

$$y = -4e^t + 4e^{2t} - 4te^t.$$

Check at $t = 0$: $y = 0$, and $y' = -4e^t + 8e^{2t} - 4e^t - 4te^t$ gives $-4 + 8 - 4 = 0$.

Do not fit the initial conditions to $y_h$ alone and then add $Y$. That is the most common error with this method.

For sinusoidal forcing you can often save work with complex numbers. To solve $y'' + y' + y = \\cos 2t$, solve $z'' + z' + z = e^{2it}$ with $z = Ae^{2it}$, which gives $A(-4 + 2i + 1) = 1$, and then take the real part of $z$. In this way a single complex division replaces a pair of simultaneous equations.

The method works only for this family of forcing terms and constant coefficients. For $g = \\sec t$ or $g = \\ln t$, you need the next lesson's method.`,
          resources: [
            lebl('The section on non-homogeneous equations.'),
            paul('UndeterminedCoefficients', 'Undetermined Coefficients', 'A long list of trial forms, with the modification rule worked through.'),
            mit1803('Recitations on the exponential response formula, which is the complex shortcut in systematic form.'),
          ],
          exercises: [
            {
              slug: 'trial-forms-only',
              title: 'Trial forms only',
              prompt: `Write the correct trial form, without computing constants, for each. (a) $y'' + 4y = t\\cos 2t$. (b) $y'' + 2y' + 5y = e^{-t}\\sin 2t$. (c) $y'' - 4y' + 4y = (t + 1)e^{2t}$. (d) $y'' - y' = t^2$. (e) $y'' + y = e^t + \\sin t$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'particular-drill',
              title: 'Particular solution drill',
              prompt: `Find a particular solution: (a) $y'' + y' - 2y = 2t$; (b) $y'' + 4y = 3\\cos 2t$; (c) $y'' + 2y' + y = e^{-t}$; (d) $y'' - y = t + e^{2t}$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'initial-value-with-forcing',
              title: 'Full initial value problem',
              prompt: `Solve $y'' + 2y' + 2y = 10\\sin t$ with $y(0) = 0$, $y'(0) = 0$. Identify the transient and the steady-state parts and write the steady state in the form $R\\sin(t - \\delta)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Use the complex shortcut with $e^{it}$ and take the imaginary part.',
            },
            {
              slug: 'exponential-response',
              title: 'The exponential response formula',
              prompt: `Let $P(D) = aD^2 + bD + c$. Show that $P(D)e^{st} = P(s)e^{st}$, and deduce that if $P(s) \\neq 0$, then $y = e^{st}/P(s)$ solves $P(D)y = e^{st}$. Differentiate the identity with respect to $s$ to show that if $P(s) = 0$ and $P'(s) \\neq 0$, then $y = te^{st}/P'(s)$ is a solution. Use this to recover the worked example's value $A = -4$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the trial $Ae^t$ fail for $y\'\' - 3y\' + 2y = 4e^t$?',
              answerOutline: '$e^t$ solves the homogeneous equation, so substitution gives $0 = 4e^t$. Multiply the trial by $t$.',
            },
            {
              question: 'When are the initial conditions applied?',
              answerOutline: 'After forming $y = y_h + Y$, because the constants must account for the initial value of $Y$ too.',
            },
            {
              question: 'What trial form is needed for $y\'\' = 1 + t$?',
              answerOutline: 'Constants and $t$ solve the homogeneous equation, so multiply the polynomial $At + B$ by $t^2$, giving $At^3 + Bt^2$.',
            },
          ],
        },
        {
          slug: 'variation-of-parameters',
          title: 'Variation of parameters',
          summary:
            'A general formula for a particular solution, valid for any continuous forcing term and any known pair of homogeneous solutions.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the variation of parameters formulas',
            'Apply the method to forcing terms beyond the reach of undetermined coefficients',
            'Apply it to equations with variable coefficients, in standard form',
            'Express the zero-initial-data solution as an integral against a kernel',
          ],
          concepts: [
            'Variation of parameters',
            'Standard form',
            'Simplifying assumption',
            'Wronskian in the denominator',
            'Impulse response kernel',
          ],
          explanation: `Suppose $y_1, y_2$ is a fundamental set for $y'' + py' + qy = 0$. To solve $y'' + py' + qy = g$, promote the constants to functions:

$$y = u_1 y_1 + u_2 y_2.$$

Two unknown functions leave room for one convenient condition. Differentiating gives $y' = u_1 y_1' + u_2 y_2' + (u_1' y_1 + u_2' y_2)$, so impose $u_1' y_1 + u_2' y_2 = 0$. Differentiate again and substitute into the equation. The terms in $u_1$ and $u_2$ cancel since $y_1, y_2$ solve the homogeneous equation, leaving $u_1' y_1' + u_2' y_2' = g$. These two equations solve to

$$u_1' = -\\frac{y_2 g}{W}, \\qquad u_2' = \\frac{y_1 g}{W}, \\qquad W = y_1 y_2' - y_1' y_2.$$

Here $g$ is the right side when the coefficient of $y''$ is 1. Forgetting to divide by the leading coefficient first is the commonest mistake.

**Worked example.** Solve $y'' + y = \\sec t$ on $(-\\pi/2, \\pi/2)$.

Undetermined coefficients does not apply, since differentiating $\\sec t$ never closes up into a finite family. Take $y_1 = \\cos t$, $y_2 = \\sin t$, so $W = \\cos^2 t + \\sin^2 t = 1$. Then

$$u_1' = -\\sin t\\sec t = -\\tan t, \\qquad u_2' = \\cos t\\sec t = 1.$$

Integrating, $u_1 = \\ln(\\cos t)$ (no absolute value is needed, since $\\cos t > 0$ on this interval) and $u_2 = t$. Thus

$$y_p = \\cos t\\,\\ln(\\cos t) + t\\sin t.$$

Check: $y_p' = -\\sin t\\ln(\\cos t) - \\sin t + \\sin t + t\\cos t = -\\sin t\\ln(\\cos t) + t\\cos t$, and differentiating again,

$$y_p'' = -\\cos t\\ln(\\cos t) + \\frac{\\sin^2 t}{\\cos t} + \\cos t - t\\sin t.$$

Adding $y_p$ gives $\\frac{\\sin^2 t}{\\cos t} + \\cos t = \\frac{1}{\\cos t} = \\sec t$, as required.

The constants of integration just add homogeneous solutions, so they can be dropped when you need only one $y_p$.

If you integrate from a fixed $t_0$ in the formulas, you obtain the solution with $y(t_0) = y'(t_0) = 0$:

$$y(t) = \\int_{t_0}^t \\frac{y_1(s)y_2(t) - y_2(s)y_1(t)}{W(s)}\\,g(s)\\,ds.$$

For $y'' + y = g$ this is $y(t) = \\int_{t_0}^t \\sin(t - s)\\,g(s)\\,ds$. The kernel $\\sin(t - s)$ is the response at time $t$ to a sharp kick at time $s$, and the solution adds up those responses. You will meet the same formula again as a convolution in the Laplace module.`,
          resources: [
            lebl('The part of the non-homogeneous equations section covering variation of parameters.'),
            paul('VariationofParameters', 'Variation of Parameters', 'A derivation with the simplifying assumption made explicit.'),
          ],
          exercises: [
            {
              slug: 'vop-exponential-over-t',
              title: 'Forcing with $1/t$',
              prompt: `Find a particular solution of $y'' - 2y' + y = e^t/t$ on $t > 0$, and state the general solution.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'vop-variable-coefficients',
              title: 'Variable coefficients',
              prompt: `You know $y_1 = t^2$ and $y_2 = t^{-1}$ solve $t^2 y'' - 2y = 0$ on $t > 0$. Use variation of parameters to find a particular solution of $t^2 y'' - 2y = 3t^2 - 1$. Remember to put the equation in standard form first. Simplify by dropping any multiple of $y_1$ or $y_2$, and check by substitution.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'tan-forcing',
              title: 'Tangent forcing',
              prompt: `Solve $y'' + 4y = \\tan 2t$ on $(-\\pi/4, \\pi/4)$ with $y(0) = 0$, $y'(0) = 0$. Evaluate $y(\\pi/8)$ and check it with a numerical solver.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'kernel-formula',
              title: 'Prove the kernel formula',
              prompt: `Show by differentiating under the integral sign (using the Leibniz rule) that $y(t) = \\frac{1}{\\omega}\\int_0^t \\sin(\\omega(t - s))\\,g(s)\\,ds$ satisfies $y'' + \\omega^2 y = g$, $y(0) = y'(0) = 0$, for continuous $g$. Then evaluate it for $g(s) = 1$ and check the result.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the purpose of the condition $u_1\' y_1 + u_2\' y_2 = 0$?',
              answerOutline: 'It keeps second derivatives of $u_i$ out of the calculation, so the equation reduces to a first-order linear system for $u_1\', u_2\'$.',
            },
            {
              question: 'When does the formula apply, and when is undetermined coefficients the better choice?',
              answerOutline: 'Variation of parameters applies for any continuous $g$ with known $y_1, y_2$. Undetermined coefficients is faster when it applies: constant coefficients and the special forcing family.',
            },
            {
              question: 'Why do the constants of integration not matter?',
              answerOutline: 'They add $c_1 y_1 + c_2 y_2$, which is already in the general solution.',
            },
          ],
        },
        {
          slug: 'oscillators-and-resonance',
          title: 'Oscillators and resonance',
          summary:
            'Mass-spring systems and RLC circuits: damping regimes, beats, and the peak of the steady-state response.',
          estimatedMinutes: 120,
          objectives: [
            'Derive $mx\'\' + cx\' + kx = F(t)$ from Newton\'s law and map it onto an RLC circuit',
            'Classify motion as underdamped, critically damped or overdamped',
            'Derive the steady-state amplitude and locate the resonance peak',
            'Explain beats and the linear growth at exact undamped resonance',
          ],
          concepts: [
            'Natural frequency $\\omega_0$',
            'Damping regimes',
            'Steady-state amplitude',
            'Resonance',
            'Beats',
            'Mechanical-electrical analogy',
          ],
          explanation: `A mass $m$ on a spring of stiffness $k$ with a viscous damper $c$, under force $F(t)$, satisfies

$$mx'' + cx' + kx = F(t).$$

A series RLC circuit is the same equation for the charge: $Lq'' + Rq' + q/C = E(t)$.

With $F = 0$, the roots are $r = \\frac{-c \\pm \\sqrt{c^2 - 4mk}}{2m}$. Let $\\omega_0 = \\sqrt{k/m}$ be the **natural frequency**. Then **underdamped** means $c^2 < 4mk$, which gives decaying oscillation at $\\omega_d = \\sqrt{\\omega_0^2 - (c/2m)^2}$. **Critically damped** means $c^2 = 4mk$, the fastest return to rest without oscillating, for typical initial data. **Overdamped** means $c^2 > 4mk$, a slow double-exponential decay.

Now take $F = F_0\\cos\\omega t$ with $c > 0$. The transient dies away, and the steady state oscillates at the driving frequency with amplitude

$$A(\\omega) = \\frac{F_0}{\\sqrt{(k - m\\omega^2)^2 + (c\\omega)^2}}.$$

To derive this, solve with $z = Ze^{i\\omega t}$: then $Z(k - m\\omega^2 + ic\\omega) = F_0$, and $A = |Z|$. Minimising the denominator gives the **resonance frequency**

$$\\omega_r = \\sqrt{\\omega_0^2 - \\frac{c^2}{2m^2}},$$

which exists only if $c^2 < 2mk$. If the damping is larger, the amplitude simply falls as $\\omega$ rises.

**Worked example.** Let $m = 1$, $c = 0.4$, $k = 4$, $F_0 = 1$, in SI units. Then $\\omega_0 = 2$, and $c^2 = 0.16 < 16 = 4mk$, so the system is underdamped. The resonance is at

$$\\omega_r = \\sqrt{4 - 0.08} = \\sqrt{3.92} \\approx 1.980.$$

At that frequency, $k - m\\omega_r^2 = 0.08$ and $(c\\omega_r)^2 = 0.16 \\times 3.92 = 0.6272$. So

$$A(\\omega_r) = \\frac{1}{\\sqrt{0.0064 + 0.6272}} = \\frac{1}{\\sqrt{0.6336}} \\approx 1.256.$$

Compared with the static deflection $F_0/k = 0.25$, the amplitude is about 5 times larger. Light damping gives a tall, narrow peak.

\`\`\`interactive
oscillator
{"title": "Forced damped oscillator", "m": 1, "c": 0.4, "k": 4, "F0": 1, "omega": 1.5, "tMax": 40, "caption": "These are the worked example's values, starting from rest. The graph shows the transient dying away until x(t) lies on the dashed green steady state, which oscillates at the driving frequency ω. Slide ω to 1.98: the amber dot climbs to the top of the response curve, and A(ω_r) ≈ 1.256. Now raise c. The peak gets lower and wider, moves left, and disappears once c² ≥ 2mk, that is c ≥ 2.83. The readouts also show the regime changing to critically damped at c = 2√(mk) = 4."}
\`\`\`

With no damping, take $x(0) = x'(0) = 0$ and $\\omega \\neq \\omega_0$. Then

$$x = \\frac{F_0/m}{\\omega_0^2 - \\omega^2}(\\cos\\omega t - \\cos\\omega_0 t) = \\frac{2F_0/m}{\\omega_0^2 - \\omega^2}\\sin\\frac{(\\omega_0 - \\omega)t}{2}\\sin\\frac{(\\omega_0 + \\omega)t}{2}.$$

For $\\omega$ near $\\omega_0$ this is a fast oscillation in a slow envelope, called **beats**. Letting $\\omega \\to \\omega_0$ gives **pure resonance**, $x = \\frac{F_0}{2m\\omega_0}t\\sin\\omega_0 t$, which grows linearly until the model breaks down.

\`\`\`interactive
oscillator
{"title": "Beats and pure resonance (no damping)", "m": 1, "c": 0, "k": 4, "F0": 1, "omega": 1.8, "tMax": 80, "response": false, "ranges": {"c": [0, 1]}, "caption": "With c = 0, ω₀ = 2 and ω = 1.8, the motion is a fast oscillation inside the slow dashed envelope ±(2F₀/m)|sin((ω₀ − ω)t/2)|/(ω₀² − ω²). Its beats repeat every 2π/(ω₀ − ω) ≈ 31.4 time units. Move ω closer to 2: the beats get slower and taller. At ω = 2 exactly the envelope becomes the straight lines ±t/4 of pure resonance. Add a little damping and the growth stops at a finite steady amplitude."}
\`\`\``,
          resources: [
            lebl('The sections on mechanical vibrations and forced oscillations.'),
            paul('Vibrations', 'Mechanical Vibrations', 'Each damping and forcing case with a graph.'),
            mit1803('Lectures on frequency response and resonance.'),
          ],
          exercises: [
            {
              slug: 'classify-damping',
              title: 'Classify damping',
              prompt: `For each system, find $\\omega_0$ and the critical damping $c_{\\text{crit}} = 2\\sqrt{mk}$, and classify the motion. (a) $m = 2$, $c = 8$, $k = 6$. (b) $m = 1$, $c = 2$, $k = 10$. (c) $m = 4$, $c = 8$, $k = 4$. In SI units, what are the units of $c$? For (b), give the frequency of the decaying oscillation.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rlc-analogy',
              title: 'An RLC circuit',
              prompt: `A series circuit has $L = 0.1$ H, $R = 2\\ \\Omega$, $C = 0.001$ F, with $q(0) = 0.01$ C and $I(0) = 0$. Solve for the charge $q(t)$, classify the damping, and give the time for the envelope to fall to 1% of its initial size.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'derive-amplitude',
              title: 'Derive the amplitude and peak',
              prompt: `Starting from $mx'' + cx' + kx = F_0\\cos\\omega t$, derive $A(\\omega)$ and the formula for $\\omega_r$ using the complex method. Show that the maximum amplitude is $F_0/(c\\,\\omega_d)$, where $\\omega_d = \\sqrt{\\omega_0^2 - (c/2m)^2}$. Check this against the worked example.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'beats-to-resonance',
              title: 'From beats to resonance',
              prompt: `Solve $x'' + 4x = \\cos(\\omega t)$, $x(0) = x'(0) = 0$ for $\\omega \\neq 2$. Plot the solution for $\\omega = 1.8$ on $0 \\leq t \\leq 40$ and give the beat period, which is the time between zeros of the slow envelope. Take the limit $\\omega \\to 2$ by L'Hopital's rule to obtain the pure resonance solution, and confirm by substitution.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'resonance-curve-plot',
              title: 'Plot resonance curves',
              prompt: `For $m = 1$, $k = 4$, $F_0 = 1$, compute $A(\\omega)$ for $c = 0.1, 0.4, 1, 2\\sqrt{2}, 4$ and plot the curves on one axis. Mark $\\omega_r$ where it exists. Then confirm one point numerically: integrate the equation with \`solve_ivp\` for $c = 0.4$ and $\\omega = 1.98$ until the transient has gone, and measure the amplitude.`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the condition for a resonance peak at positive frequency, and how does it differ from the underdamped condition?',
              answerOutline: 'Peak needs $c^2 < 2mk$. Underdamped needs $c^2 < 4mk$. For $2mk \\leq c^2 < 4mk$ the system rings but has no peak.',
            },
            {
              question: 'Why does the steady state not depend on the initial conditions?',
              answerOutline: 'Initial data only sets the homogeneous part, which decays because $c > 0$.',
            },
            {
              question: 'Why is the resonance solution a linear ramp times a sinusoid, not an exponential?',
              answerOutline: 'Forcing at $\\omega_0$ overlaps the homogeneous solution, so the modification rule supplies a factor $t$.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/second-order-linear-odes-and-oscillators'],
        },
      ],
      project: {
        slug: 'resonance-measurement',
        title: 'A resonance experiment on the computer',
        description: `Treat a simulated oscillator as a black box. Write a function that integrates $mx'' + cx' + kx = F_0\\cos\\omega t$ with hidden parameters, which you pick at random and then forget. Using only sweeps of the driving frequency and a free-decay run, recover $m$, $c$ and $k$. Then reveal the values and compare. This is how engineers identify real structures.`,
        deliverables: [
          'A simulator using `solve_ivp`, with transient removal and amplitude measurement',
          'A measured resonance curve, overlaid with a fit of the formula $A(\\omega)$',
          'An estimate of $\\omega_0$ and $c/m$ from a free-decay run (logarithmic decrement)',
          'A comparison of the two estimates and the true values, with percentage errors',
          'A short discussion of how noise added to the measured amplitudes changes the estimates',
        ],
        estimatedHours: 7,
      },
    },
    {
      slug: 'higher-order-and-series',
      title: 'Higher-Order Equations and Series Solutions',
      description:
        'Extend the linear theory to any order, then solve variable-coefficient equations by power series near an ordinary point.',
      lessons: [
        {
          slug: 'higher-order-linear-equations',
          title: 'Higher-order linear equations',
          summary:
            'The $n$th-order theory: independence of $n$ functions, the Wronskian, and characteristic polynomials with repeated and complex roots.',
          estimatedMinutes: 100,
          objectives: [
            'State the structure theorem for $n$th-order linear equations',
            'Test functions for linear independence',
            'Solve constant-coefficient equations of any order from the roots of the characteristic polynomial',
            'Fit $n$ initial conditions by solving a linear system',
          ],
          concepts: [
            'Linear independence of functions',
            'Wronskian of $n$ functions',
            'Characteristic polynomial',
            'Root multiplicity',
            'Fundamental set of $n$ solutions',
          ],
          explanation: `Everything from second order carries over. For $y^{(n)} + p_{n-1}(t)y^{(n-1)} + \\dots + p_0(t)y = g(t)$ with coefficients continuous on an interval $I$, initial values $y(t_0), y'(t_0), \\dots, y^{(n-1)}(t_0)$ pick out exactly one solution on $I$. The homogeneous solutions form a family with $n$ free constants, and the general solution of the full equation is one particular solution plus that family.

Functions $f_1, \\dots, f_n$ are **linearly independent** on $I$ if $c_1 f_1 + \\dots + c_n f_n \\equiv 0$ on $I$ forces every $c_i = 0$. For instance $1, \\cos^2 t, \\sin^2 t$ are dependent, because $\\cos^2 t + \\sin^2 t - 1 \\equiv 0$. The $n$-function **Wronskian** is the determinant with rows $f_i, f_i', \\dots, f_i^{(n-1)}$. If it is non-zero at one point, the functions are independent. For $n$ solutions of a linear equation, it is identically zero or never zero, and non-zero exactly when they are independent.

A determinant of a $3 \\times 3$ matrix $M$ can be computed by expanding along the first row: $\\det M = m_{11}\\det M_{11} - m_{12}\\det M_{12} + m_{13}\\det M_{13}$, where $M_{1j}$ is $M$ with row 1 and column $j$ removed.

For constant coefficients, $y = e^{rt}$ gives the **characteristic polynomial** $P(r) = r^n + a_{n-1}r^{n-1} + \\dots + a_0$. Each root contributes solutions as follows. A real root $r$ of multiplicity $k$ contributes $e^{rt}, te^{rt}, \\dots, t^{k-1}e^{rt}$. A complex pair $\\alpha \\pm i\\beta$ of multiplicity $k$ contributes $t^j e^{\\alpha t}\\cos\\beta t$ and $t^j e^{\\alpha t}\\sin\\beta t$ for $j = 0, \\dots, k - 1$. The total count is $n$, as the fundamental theorem of algebra promises.

**Worked example.** Solve $y''' - 2y'' + y' - 2y = 0$ with $y(0) = 1$, $y'(0) = 0$, $y''(0) = 0$.

Factor by grouping: $r^3 - 2r^2 + r - 2 = r^2(r - 2) + (r - 2) = (r - 2)(r^2 + 1)$. The roots are $2, \\pm i$, so

$$y = c_1 e^{2t} + c_2\\cos t + c_3\\sin t.$$

The derivatives at 0 give the linear system

$$c_1 + c_2 = 1, \\qquad 2c_1 + c_3 = 0, \\qquad 4c_1 - c_2 = 0.$$

Adding the first and third equations gives $5c_1 = 1$. So $c_1 = 1/5$, $c_2 = 4/5$, $c_3 = -2/5$, and

$$y = \\tfrac15 e^{2t} + \\tfrac45\\cos t - \\tfrac25\\sin t.$$

If you need the roots of a high-degree polynomial with no obvious factor, try the rational root test, then use \`numpy.roots\`. Undetermined coefficients and variation of parameters extend as well. The modification rule multiplies by $t^k$ where $k$ is the multiplicity of the overlapping root.`,
          resources: [
            lebl('The chapter section on higher-order linear equations.'),
            mit1803('Lectures on operator notation and higher-order constant-coefficient equations.'),
          ],
          exercises: [
            {
              slug: 'roots-to-solutions',
              title: 'From roots to solutions',
              prompt: `Find the general solution. (a) $y'''' - 16y = 0$. (b) $y'''' + 2y'' + y = 0$. (c) $y''' - 3y'' + 3y' - y = 0$. (d) $y''' + y'' = 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'independence-tests',
              title: 'Independence tests',
              prompt: `Decide whether each set is independent on $\\mathbb{R}$, and justify your answer. (a) $1, t, t^2$. (b) $1, \\cos 2t, \\sin^2 t$. (c) $e^t, e^{2t}, e^{3t}$; compute the Wronskian at $t = 0$ and recognise a Vandermonde determinant. (d) $t, |t|$, considered on $\\mathbb{R}$ and then on $t > 0$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'third-order-ivp',
              title: 'A third-order forced problem',
              prompt: `Solve $y''' + y' = t$ with $y(0) = 0$, $y'(0) = 1$, $y''(0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Constants solve the homogeneous equation, so the trial for $t$ needs a factor $t$.',
            },
            {
              slug: 'beam-deflection',
              title: 'A beam under uniform load',
              prompt: `The deflection of a uniform beam of length $L$ under load $w$ per unit length satisfies $EIy'''' = w$. For a beam clamped at $x = 0$ and free at $x = L$, the conditions are $y(0) = y'(0) = 0$ and $y''(L) = y'''(L) = 0$. Solve and show that the tip deflection is $wL^4/(8EI)$. Note that this is a boundary value problem rather than an initial value problem. Why are four conditions right?`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What solutions does a root $r = 1 + 2i$ of multiplicity 2 contribute, together with its conjugate?',
              answerOutline: '$e^t\\cos 2t$, $e^t\\sin 2t$, $te^t\\cos 2t$, $te^t\\sin 2t$: four real solutions.',
            },
            {
              question: 'If the Wronskian of three arbitrary functions is zero at every point, are they dependent?',
              answerOutline: 'Not necessarily. The implication holds only for solutions of a single linear equation with continuous coefficients.',
            },
            {
              question: 'Why does the general solution of an $n$th-order equation have $n$ constants?',
              answerOutline: 'Initial data consists of $n$ numbers, and each choice gives one solution, so the solution space has dimension $n$.',
            },
          ],
        },
        {
          slug: 'power-series-and-ordinary-points',
          title: 'Power series solutions at ordinary points',
          summary:
            'When coefficients vary and no formula exists, build the solution term by term from a recurrence relation.',
          estimatedMinutes: 110,
          objectives: [
            'Differentiate power series and shift indices confidently',
            'Identify ordinary and singular points',
            'Derive a recurrence relation and compute series coefficients',
            'State the guaranteed radius of convergence',
          ],
          concepts: [
            'Power series and radius of convergence',
            'Index shifting',
            'Ordinary and singular points',
            'Recurrence relation',
            'Airy equation',
            'Guaranteed radius',
          ],
          explanation: `A power series $\\sum_{n=0}^\\infty a_n(t - t_0)^n$ converges for $|t - t_0| < \\rho$, its **radius of convergence**, and it can be differentiated term by term inside that interval. Two series are equal on an interval only if all coefficients match. These two facts are the whole method.

For $P(t)y'' + Q(t)y' + R(t)y = 0$ with polynomial coefficients, a point $t_0$ is **ordinary** if $P(t_0) \\neq 0$, and **singular** otherwise.

**Theorem.** If $t_0$ is an ordinary point, the equation has two independent power series solutions about $t_0$. Each has radius of convergence at least the distance from $t_0$ to the nearest root of $P$ **in the complex plane**, assuming $P, Q, R$ have no common factor.

The complex roots matter. For $(1 + t^2)y'' + y = 0$ about $t_0 = 0$, the only singularities are $\\pm i$, at distance 1, so a series is guaranteed for $|t| < 1$ only, even though nothing goes wrong on the real line.

**Worked example.** Consider the **Airy equation** $y'' - ty = 0$ at $t_0 = 0$. There $P = 1$ has no roots, so the series converge for all $t$.

Write $y = \\sum_{n=0}^\\infty a_n t^n$. Then

$$y'' = \\sum_{n=2}^\\infty n(n - 1)a_n t^{n-2} = \\sum_{n=0}^\\infty (n + 2)(n + 1)a_{n+2}t^n,$$

$$ty = \\sum_{n=0}^\\infty a_n t^{n+1} = \\sum_{n=1}^\\infty a_{n-1}t^n.$$

Both shifts put the general power at $t^n$. Now match coefficients. For $n = 0$: $2a_2 = 0$, so $a_2 = 0$. For $n \\geq 1$:

$$a_{n+2} = \\frac{a_{n-1}}{(n + 2)(n + 1)}.$$

This steps by threes, starting from the free constants $a_0$ and $a_1$:

$$a_3 = \\frac{a_0}{6}, \\quad a_4 = \\frac{a_1}{12}, \\quad a_5 = 0, \\quad a_6 = \\frac{a_0}{180}, \\quad a_7 = \\frac{a_1}{504}.$$

So the general solution is

$$y = a_0\\left(1 + \\frac{t^3}{6} + \\frac{t^6}{180} + \\dots\\right) + a_1\\left(t + \\frac{t^4}{12} + \\frac{t^7}{504} + \\dots\\right).$$

The constants $a_0 = y(0)$ and $a_1 = y'(0)$ are the initial data, as they should be. The two series define new functions, close relatives of the standard Airy functions. For $t > 0$ they grow rapidly, and for $t < 0$ they oscillate. You could predict this by treating $-t$ as a slowly varying stiffness in $y'' + (-t)y = 0$.

When you do this by hand, write out $n = 0$ and $n = 1$ separately, since the sums may start at different indices. A small mistake in a shift ruins everything after it, so check the first few terms by substituting them back.`,
          resources: [
            lebl('The chapter on power series methods.'),
            paul('SeriesIntro', 'Series Solutions', 'Power series review, then the method applied at ordinary points.'),
            paul('SeriesSolutions', 'Series Solutions to Differential Equations', 'Examples with index shifting shown line by line.'),
          ],
          exercises: [
            {
              slug: 'recover-cosine',
              title: 'Recover what you know',
              prompt: `Apply the series method to $y'' + y = 0$ about $t = 0$. Find the recurrence and show that the two solutions are the Maclaurin series of $\\cos t$ and $\\sin t$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'first-order-series',
              title: 'A first-order series',
              prompt: `Solve $y' = 2ty$, $y(0) = 1$ by a power series about 0. Find the recurrence and identify the sum in closed form. Confirm by separation of variables.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'guaranteed-radius',
              title: 'Guaranteed radius',
              prompt: `Give the guaranteed minimum radius of convergence of series solutions. (a) $(t^2 - 2t + 5)y'' + y = 0$ about $t_0 = 0$. (b) The same equation about $t_0 = 1$. (c) $(1 + t^2)y'' + ty' + y = 0$ about $t_0 = 1$. (d) $(t^2 - 9)y'' + y' + y = 0$ about $t_0 = 1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Find the roots of the leading coefficient in the complex plane, and measure distance there.',
            },
            {
              slug: 'airy-numerics',
              title: 'Check the Airy series numerically',
              prompt: `Compute the Airy coefficients by the recurrence up to $n = 60$. Evaluate the solution with $a_0 = 1$, $a_1 = 0$ at $t = 2$ and $t = -6$, using partial sums. Compare with \`solve_ivp\` at tolerance $10^{-11}$. How many terms do you need for 8 correct digits at each point, and why does $t = -6$ need more?`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is an ordinary point, and why does the leading coefficient decide it?',
              answerOutline: 'A point where $P \\neq 0$, so standard form has analytic coefficients. Division by $P$ is where trouble arises.',
            },
            {
              question: 'Why are $a_0$ and $a_1$ free?',
              answerOutline: 'They equal $y(t_0)$ and $y\'(t_0)$. A second-order equation has two free constants, and the recurrence determines the rest.',
            },
            {
              question: 'For $(1 + t^2)y\'\' + y = 0$, why does the real line not tell the whole story about convergence?',
              answerOutline: 'Series convergence is governed by discs in the complex plane. The complex singularities at $\\pm i$ limit the radius.',
            },
          ],
        },
        {
          slug: 'series-solutions-in-practice',
          title: 'Series solutions in practice',
          summary:
            'Series that stop give polynomial solutions, such as Legendre and Hermite. Series that do not stop can still be evaluated reliably.',
          estimatedMinutes: 100,
          objectives: [
            'Find polynomial solutions by arranging for a recurrence to terminate',
            'Expand about a point other than zero',
            'Check a truncated series against a numerical solution and estimate its accuracy',
            'Explain why special functions arise from important equations',
          ],
          concepts: [
            'Terminating series',
            'Legendre equation',
            'Hermite equation',
            'Recentering at $t_0$',
            'Truncation error',
          ],
          explanation: `Some recurrences contain a factor that can hit zero. When that happens the series stops, and a polynomial solution appears. These polynomials are important, because equations of this kind come from physical problems in spherical geometry, quantum mechanics and more.

**Worked example.** The **Legendre equation** with parameter $m$ is

$$(1 - t^2)y'' - 2ty' + m(m + 1)y = 0.$$

The point $t = 0$ is ordinary, and the singularities are at $t = \\pm 1$, so series about 0 converge at least on $|t| < 1$. Substituting $y = \\sum a_k t^k$ and collecting the power $t^k$:

- $y''$ gives $(k + 2)(k + 1)a_{k+2}$,
- $-t^2 y''$ gives $-k(k - 1)a_k$,
- $-2ty'$ gives $-2ka_k$,
- $m(m + 1)y$ gives $m(m + 1)a_k$.

So the recurrence is

$$a_{k+2} = \\frac{k(k + 1) - m(m + 1)}{(k + 2)(k + 1)}\\,a_k.$$

The numerator vanishes at $k = m$. If $m$ is a non-negative integer, then one of the two series, the even one or the odd one, stops at degree $m$. For $m = 2$, take $a_0 = 1$, $a_1 = 0$:

$$a_2 = \\frac{0 - 6}{2}\\cdot 1 = -3, \\qquad a_4 = \\frac{6 - 6}{12}a_2 = 0.$$

The polynomial is $y = 1 - 3t^2$. Check: $y' = -6t$, $y'' = -6$, and

$$(1 - t^2)(-6) - 2t(-6t) + 6(1 - 3t^2) = -6 + 6t^2 + 12t^2 + 6 - 18t^2 = 0.$$

Scaled so that $y(1) = 1$, this is the Legendre polynomial $P_2(t) = \\frac12(3t^2 - 1)$.

To expand about $t_0 \\neq 0$, substitute $x = t - t_0$ first, and rewrite the coefficients in powers of $x$. This is what you need when initial data are given at $t_0$. For $y'' - ty = 0$ near $t_0 = 1$, the equation becomes $y'' - (1 + x)y = 0$ in $x$.

If the series does not terminate, truncation gives an approximation that is excellent well inside the radius of convergence and poor near it. Establish how good it is by comparing with a numerical solver, or by watching successive partial sums settle. For a series with a finite radius $\\rho$, the terms behave roughly like $(|t - t_0|/\\rho)^n$, so at $|t - t_0| = \\rho/2$ you gain about one binary digit per term.

Series remain a working tool because libraries such as SciPy use them, along with other expansions, to evaluate special functions. In \`scipy.special\` you can call \`airy\`, \`legendre\`, \`hermite\` and \`jv\` directly.`,
          resources: [
            lebl('The chapter on power series methods.'),
            paul('SeriesSolutions', 'Series Solutions to Differential Equations', 'Work the examples about points other than zero.'),
          ],
          exercises: [
            {
              slug: 'hermite-polynomial',
              title: 'Hermite polynomials',
              prompt: `For $y'' - 2ty' + 2my = 0$, derive the recurrence $a_{k+2} = \\frac{2(k - m)}{(k + 2)(k + 1)}a_k$. For $m = 3$, find the polynomial solution with $y'(0) = 1$, and for $m = 4$ the polynomial solution with $y(0) = 1$. Verify each by substitution.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'recentered-series',
              title: 'A series about $t_0 = 1$',
              prompt: `Find the first five non-zero coefficients in powers of $x = t - 1$ for the solution of $y'' - ty = 0$ with $y(1) = 1$, $y'(1) = 0$. Use them to estimate $y(1.5)$ and compare with a numerical solver.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'legendre-odd',
              title: 'Legendre cases',
              prompt: `Use the recurrence to find polynomial solutions of the Legendre equation for $m = 3$ and $m = 4$, and scale them so that $y(1) = 1$. Then show that for $m = 0$ the second, non-terminating series is $t + t^3/3 + t^5/5 + \\dots$, and identify it in closed form. What happens as $t \\to 1^-$, and how does that fit with the guaranteed radius?`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'truncation-study',
              title: 'Measure truncation error',
              prompt: `For $(1 + t^2)y'' + y = 0$ with $y(0) = 1$, $y'(0) = 0$, compute the series coefficients to degree 40, and evaluate partial sums at $t = 0.5, 0.9, 1.1$. Compare with \`solve_ivp\`. Report what happens at $t = 1.1$, and connect it with the radius of convergence.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an integer $m$ give a polynomial solution of the Legendre equation?',
              answerOutline: 'The numerator $k(k + 1) - m(m + 1)$ vanishes at $k = m$, so the series of the same parity as $m$ terminates.',
            },
            {
              question: 'How would you expand the solution of an equation about $t_0 = 2$?',
              answerOutline: 'Substitute $x = t - 2$, rewrite the coefficients in powers of $x$, and use the ordinary point method at $x = 0$.',
            },
            {
              question: 'How do you judge the accuracy of a truncated series?',
              answerOutline: 'Watch successive partial sums settle and compare with a numerical solver, staying well inside the radius of convergence.',
            },
          ],
        },
      ],
    },
    {
      slug: 'laplace-transforms',
      title: 'Laplace Transforms',
      description:
        'Turn differential equations into algebra, handle switched and impulsive forcing cleanly, and see the solution as a convolution with the impulse response.',
      lessons: [
        {
          slug: 'definition-and-table',
          title: 'The transform and its table',
          summary:
            'Define the Laplace transform, build a table from the integral, and invert by partial fractions and completing the square.',
          estimatedMinutes: 100,
          objectives: [
            'Compute transforms from the definition and say for which $s$ they exist',
            'State when a transform is guaranteed to exist',
            'Use linearity, the first shift rule and the derivative rule',
            'Invert rational functions using partial fractions and completing the square',
          ],
          concepts: [
            'Laplace transform',
            'Exponential order',
            'First shift theorem',
            'Transform of a derivative',
            'Partial fractions',
            'Inverse transform',
          ],
          explanation: `The **Laplace transform** of a function $f$ defined for $t \\geq 0$ is

$$F(s) = \\mathcal{L}\\{f\\}(s) = \\int_0^\\infty e^{-st}f(t)\\,dt,$$

for those $s$ where the improper integral converges. It exists for $s > a$ when $f$ is piecewise continuous on every finite interval and of **exponential order** $a$, meaning $|f(t)| \\leq Me^{at}$ for large $t$. These conditions are sufficient and not necessary.

For example, $\\mathcal{L}\\{e^{at}\\} = \\int_0^\\infty e^{-(s-a)t}\\,dt = \\frac{1}{s - a}$ for $s > a$. Taking $a = ib$ and then real and imaginary parts gives the cosine and sine.

| $f(t)$ | $F(s)$ | valid for |
|---|---|---|
| $1$ | $1/s$ | $s > 0$ |
| $t^n$, $n = 0, 1, 2, \\dots$ | $n!/s^{n+1}$ | $s > 0$ |
| $e^{at}$ | $1/(s - a)$ | $s > a$ |
| $\\cos bt$ | $s/(s^2 + b^2)$ | $s > 0$ |
| $\\sin bt$ | $b/(s^2 + b^2)$ | $s > 0$ |

The transform is linear. Two rules do most of the work.

**First shift.** $\\mathcal{L}\\{e^{at}f(t)\\} = F(s - a)$, directly from the definition.

**Derivatives.** Integration by parts gives, for continuous $f$ of exponential order with piecewise continuous $f'$,

$$\\mathcal{L}\\{f'\\} = sF(s) - f(0), \\qquad \\mathcal{L}\\{f''\\} = s^2F(s) - sf(0) - f'(0).$$

This is why the transform is useful: derivatives become multiplication by $s$, and initial values enter automatically.

To go back, you use the table in reverse. Continuous functions with the same transform are equal, so the inverse is well defined for the functions we use.

**Worked example.** Find $f$ with $F(s) = \\dfrac{s + 3}{s^2 + 2s + 5}$.

The denominator has no real roots, so complete the square: $s^2 + 2s + 5 = (s + 1)^2 + 4$. Rewrite the numerator in terms of $s + 1$:

$$F(s) = \\frac{(s + 1) + 2}{(s + 1)^2 + 4} = \\frac{s + 1}{(s + 1)^2 + 2^2} + \\frac{2}{(s + 1)^2 + 2^2}.$$

These are the cosine and sine entries with $b = 2$, shifted by $a = -1$. Therefore

$$f(t) = e^{-t}(\\cos 2t + \\sin 2t).$$

You met this function before: it solves $y'' + 2y' + 5y = 0$ with $y(0) = 1$, $y'(0) = 1$, and the denominator here is exactly its characteristic polynomial. That is no accident, as the next lesson shows.

With real roots, use partial fractions instead. For $\\frac{1}{s^2 - 3s + 2} = \\frac{1}{(s - 1)(s - 2)} = \\frac{1}{s - 2} - \\frac{1}{s - 1}$, the inverse is $e^{2t} - e^t$.`,
          resources: [
            lebl('The chapter on the Laplace transform, first section.'),
            paul('LaplaceDefinition', 'The Definition', 'Evaluating the improper integral for basic functions.'),
            paul('LaplaceIntro', 'Laplace Transforms', 'The start of a chapter with many inversion examples; use it for drill.'),
          ],
          exercises: [
            {
              slug: 'transform-drill',
              title: 'Transform drill',
              prompt: `Find the transforms using the table and rules. (a) $3t^2 - 2 + e^{-t}$. (b) $te^{2t}$. (c) $e^{-t}\\sin 3t$. (d) $\\sin^2 t$, using a double-angle formula.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'inverse-drill',
              title: 'Inverse drill',
              prompt: `Find the inverse transforms. (a) $\\dfrac{1}{s^2(s + 1)}$. (b) $\\dfrac{2s + 1}{s^2 + 4s + 13}$. (c) $\\dfrac{s}{(s + 1)(s^2 + 1)}$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'multiply-by-t',
              title: 'Multiplying by $t$',
              prompt: `Differentiate the definition under the integral sign to show that $\\mathcal{L}\\{tf(t)\\} = -F'(s)$. Use this to find $\\mathcal{L}\\{t\\sin t\\}$ and $\\mathcal{L}\\{t^2 e^{at}\\}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'existence-limits',
              title: 'When the transform does not exist',
              prompt: `Show that $e^{t^2}$ has no Laplace transform for any $s$, and that $1/t$ has none. Show that $t^{-1/2}$, which is not piecewise continuous at 0, does have one, and that it equals $\\sqrt{\\pi/s}$, using the substitution $t = u^2/s$ and the Gaussian integral.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do initial conditions appear in $\\mathcal{L}\\{y\'\\}$?',
              answerOutline: 'Integration by parts leaves the boundary term $-y(0)$, from the lower limit of the integral.',
            },
            {
              question: 'What does the first shift rule do in practice?',
              answerOutline: 'It lets you read $F(s - a)$ as $e^{at}f(t)$, which handles completed squares like $(s + 1)^2 + 4$.',
            },
            {
              question: 'For which $s$ is $\\mathcal{L}\\{e^{3t}\\}$ defined?',
              answerOutline: 'For $s > 3$, where the integrand decays.',
            },
          ],
        },
        {
          slug: 'solving-initial-value-problems',
          title: 'Solving initial value problems',
          summary:
            'Transform the equation, solve for $Y(s)$ algebraically, and invert. The poles of $Y$ tell you the behaviour of $y$.',
          estimatedMinutes: 100,
          objectives: [
            'Solve constant-coefficient initial value problems by the transform method',
            'Carry out partial fractions efficiently with the cover-up method',
            'Interpret the poles of $Y(s)$ as behaviour in time',
            'Solve small linear systems using transforms',
          ],
          concepts: [
            'Algebraic equation for $Y(s)$',
            'Characteristic polynomial in the denominator',
            'Cover-up method',
            'Poles and time behaviour',
            'Transfer function',
          ],
          explanation: `The method has three steps. Transform the equation, using the derivative rule. Solve the resulting algebra problem for $Y(s)$. Invert.

For $ay'' + by' + cy = g(t)$ with data $y(0), y'(0)$, the transform gives

$$(as^2 + bs + c)Y(s) = G(s) + a[sy(0) + y'(0)] + by(0).$$

The polynomial $P(s) = as^2 + bs + c$ is the characteristic polynomial. Dividing by it separates two effects:

$$Y(s) = \\frac{G(s)}{P(s)} + \\frac{a[sy(0) + y'(0)] + by(0)}{P(s)}.$$

The first term is the response to forcing with zero initial data. The second is the response to initial data with zero forcing. The function $H(s) = 1/P(s)$ is the **transfer function**.

**Worked example.** Solve $y'' + 4y' + 3y = e^{-2t}$ with $y(0) = 1$, $y'(0) = 0$.

Transforming,

$$(s^2Y - s) + 4(sY - 1) + 3Y = \\frac{1}{s + 2}.$$

So

$$(s + 1)(s + 3)Y = s + 4 + \\frac{1}{s + 2}.$$

Combining over a common denominator gives the numerator $(s + 4)(s + 2) + 1 = s^2 + 6s + 9 = (s + 3)^2$. So

$$Y(s) = \\frac{(s + 3)^2}{(s + 1)(s + 2)(s + 3)} = \\frac{s + 3}{(s + 1)(s + 2)}.$$

Now use the **cover-up method**. For the coefficient at $s = -1$, cover $(s + 1)$ and evaluate the rest at $s = -1$: $\\frac{2}{1} = 2$. At $s = -2$: $\\frac{1}{-1} = -1$. Therefore

$$Y(s) = \\frac{2}{s + 1} - \\frac{1}{s + 2}, \\qquad y(t) = 2e^{-t} - e^{-2t}.$$

Check: $y(0) = 1$, and $y'(0) = -2 + 2 = 0$. In the equation, the $e^{-t}$ term gives $2(1 - 4 + 3) = 0$, and the $e^{-2t}$ term gives $-(4 - 8 + 3) = 1$. So the left side equals $e^{-2t}$.

The $e^{-3t}$ mode cancelled here because of this particular initial data, which is the sort of thing that is hidden when you use undetermined coefficients.

The **poles** of $Y$, the points where its denominator vanishes, describe the solution. A pole at a real $a$ means a term $e^{at}$. A pair at $\\alpha \\pm i\\beta$ means oscillation at frequency $\\beta$, with growth or decay at rate $\\alpha$. A double pole brings a factor of $t$. So the rightmost pole sets the long-term behaviour, and you can often answer "does it decay?" without any inversion.

The method needs constant coefficients, and it works best with data at $t = 0$. Its real strength appears in the next lessons, with forcing that switches on and off.`,
          resources: [
            lebl('The section on transforms of derivatives and solving ODEs.'),
            paul('IVPWithLaplace', "Solving IVPs with Laplace Transforms", 'Examples with the algebra written out.'),
          ],
          exercises: [
            {
              slug: 'laplace-ivp-drill',
              title: 'Initial value drill',
              prompt: `Solve using transforms. (a) $y'' - y' - 2y = 0$, $y(0) = 1$, $y'(0) = 0$. (b) $y' + 3y = e^{-t}$, $y(0) = 2$. (c) $y'' + 2y' + 2y = 0$, $y(0) = 0$, $y'(0) = 3$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'resonance-by-laplace',
              title: 'Resonance by transforms',
              prompt: `Solve $y'' + 4y = \\sin 2t$ with $y(0) = y'(0) = 0$. You will need the inverse of $\\frac{2}{(s^2 + 4)^2}$. Find it using the rule from the exercise on multiplying by $t$, and check your answer by substituting it into the equation.`,
              kind: 'problem',
              difficulty: 2,
              hint: '$\\frac{d}{ds}\\frac{s}{s^2 + 4} = \\frac{4 - s^2}{(s^2 + 4)^2}$. Combine it with $\\frac{1}{s^2 + 4}$.',
            },
            {
              slug: 'system-by-laplace',
              title: 'A system by transforms',
              prompt: `Solve $x' = 2y$, $y' = 2x$ with $x(0) = 1$, $y(0) = 0$ by transforming both equations and solving a $2 \\times 2$ algebra problem for $X(s)$ and $Y(s)$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'poles-to-behaviour',
              title: 'From poles to behaviour',
              prompt: `Without inverting, describe the long-term behaviour of $y(t)$ for each transform, and state the rate. (a) $\\frac{1}{(s + 2)(s^2 + 2s + 10)}$. (b) $\\frac{s}{(s - 1)(s + 5)}$. (c) $\\frac{1}{s(s + 1)}$. (d) $\\frac{1}{(s^2 + 1)^2}$. Then invert (c) and (d) and confirm.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the characteristic polynomial appear in $Y(s)$?',
              answerOutline: 'Each derivative becomes a power of $s$ times $Y$, so the left side is $P(s)Y$ plus initial data terms.',
            },
            {
              question: 'What does a pole at $s = -1 \\pm 3i$ tell you?',
              answerOutline: 'A term $e^{-t}$ times a combination of $\\cos 3t$ and $\\sin 3t$.',
            },
            {
              question: 'In which step do initial conditions enter, compared with undetermined coefficients?',
              answerOutline: 'Right away, in the transform. There is no separate step to fit constants.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/laplace-transforms-and-series-solutions'],
        },
        {
          slug: 'step-functions',
          title: 'Step functions and switched forcing',
          summary:
            'Write piecewise forcing with Heaviside functions, and use the second shift rule to solve for the response.',
          estimatedMinutes: 100,
          objectives: [
            'Write piecewise functions using unit step functions',
            'Apply the second shift theorem in both directions',
            'Solve initial value problems with switched forcing',
            'Find the transform of a periodic function',
          ],
          concepts: [
            'Unit step function $u_c(t)$',
            'Second shift theorem',
            'Time delay',
            'Piecewise forcing',
            'Periodic functions',
          ],
          explanation: `The **unit step** $u_c(t)$ is 0 for $t < c$ and 1 for $t \\geq c$. Multiplying by it switches something on at time $c$, and $u_a(t) - u_b(t)$ is a window that is 1 on $[a, b)$. So a function equal to $g_1$ on $[0, c)$ and $g_2$ afterwards is $g_1(t) + u_c(t)[g_2(t) - g_1(t)]$.

**Second shift theorem.** If $F(s) = \\mathcal{L}\\{f\\}$ and $c \\geq 0$, then

$$\\mathcal{L}\\{u_c(t)f(t - c)\\} = e^{-cs}F(s).$$

A delay of $c$ in time is multiplication by $e^{-cs}$. Substituting $\\tau = t - c$ in the integral proves it. In particular $\\mathcal{L}\\{u_c\\} = e^{-cs}/s$.

Note the form carefully: the function must be written in terms of $t - c$. To transform $u_2(t)\\,t$, write $t = (t - 2) + 2$, and get $e^{-2s}(1/s^2 + 2/s)$.

**Worked example.** A mass on a spring, at rest, feels a constant force for a time $\\pi$ and then nothing. Solve

$$y'' + y = 1 - u_\\pi(t), \\qquad y(0) = y'(0) = 0.$$

Transforming,

$$(s^2 + 1)Y = \\frac{1 - e^{-\\pi s}}{s}, \\qquad Y = (1 - e^{-\\pi s})\\frac{1}{s(s^2 + 1)}.$$

Partial fractions give $\\frac{1}{s(s^2 + 1)} = \\frac{1}{s} - \\frac{s}{s^2 + 1}$, whose inverse is $h(t) = 1 - \\cos t$. By the second shift theorem,

$$y(t) = h(t) - u_\\pi(t)h(t - \\pi) = 1 - \\cos t - u_\\pi(t)[1 - \\cos(t - \\pi)].$$

Since $\\cos(t - \\pi) = -\\cos t$, this is

$$y(t) = \\begin{cases} 1 - \\cos t, & 0 \\leq t < \\pi, \\\\ -2\\cos t, & t \\geq \\pi. \\end{cases}$$

Check continuity at $t = \\pi$: the first piece gives $2$ and the second gives $2$. The derivative is $\\sin t$ on the left and $2\\sin t$ on the right, both 0 at $\\pi$. The second derivative jumps, by exactly the jump in the forcing.

After the force is removed, the mass swings with amplitude 2, because the release happens at the moment of largest displacement. Had the force been switched off at $t = 2\\pi$, when the mass was back at rest, there would have been no motion afterwards. The timing of a switch matters, and the transform handles it with no need to match pieces by hand.

\`\`\`interactive
laplace-response
{"title": "y'' + y = 1 − u_c(t): switching the force off", "mode": "switch", "a": 1, "b": 0, "c": 1, "F": 1, "on": 0, "off": "pi", "tMax": "4*pi", "caption": "The top strip is the force and the bottom plot is y(t). With the switch at c = π the mass is released at y = 2 with zero velocity, so it swings with amplitude 2, as in the worked example. Press 'Off at 2π' and the mass is released at rest at y = 0, so nothing moves afterwards. Drag the switch-off time between them: y and y′ stay continuous at the switch (only y″ jumps), and the amplitude afterwards is 2|sin(c/2)|."}
\`\`\`

Solving by hand would mean solving on each interval and matching $y$ and $y'$ at the switch. The transform does that bookkeeping for you, and the fact that $y$ and $y'$ stay continuous is automatic.

A **periodic** function with period $T$ has transform

$$F(s) = \\frac{\\int_0^T e^{-st}f(t)\\,dt}{1 - e^{-Ts}},$$

which comes from summing a geometric series of delayed copies.`,
          resources: [
            lebl('The Laplace transform chapter covers the Heaviside function and the shifting rule.'),
            paul('StepFunctions', 'Step Functions', 'Writing piecewise functions in terms of steps, and transforming them.'),
            paul('IVPWithStepFunction', 'IVPs with Step Functions', 'Examples of switched forcing from start to finish.'),
          ],
          exercises: [
            {
              slug: 'ramp-and-hold',
              title: 'Ramp and hold',
              prompt: `Let $f(t) = t$ for $0 \\leq t < 2$ and $f(t) = 2$ for $t \\geq 2$. Write $f$ using a step function, and show that $F(s) = (1 - e^{-2s})/s^2$. Then transform $g(t) = u_1(t)\\,t^2$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'first-order-switch',
              title: 'A switched first-order system',
              prompt: `Solve $y' + y = u_1(t)$ with $y(0) = 0$. Plot the solution. Then solve $y' + y = u_1(t) - u_3(t)$ with $y(0) = 0$, and give the value of $y$ at $t = 3$ and the limit as $t \\to \\infty$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'overdamped-pulse',
              title: 'A pulse on an overdamped system',
              prompt: `Solve $y'' + 3y' + 2y = 1 - u_2(t)$ with $y(0) = y'(0) = 0$. Give the formula on each side of $t = 2$, confirm that $y$ and $y'$ are continuous at $t = 2$, and find the maximum of $y$. Check it against a numerical solution.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'square-wave-transform',
              title: 'Transform of a square wave',
              prompt: `Let $f$ have period $2a$ with $f = 1$ on $[0, a)$ and $f = 0$ on $[a, 2a)$. Prove the periodic transform formula, and show that $F(s) = \\dfrac{1}{s(1 + e^{-as})}$. Use it to write the solution of $y' + y = f(t)$, $y(0) = 0$ as a sum of delayed responses, and describe the behaviour for large $t$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\mathcal{L}\\{u_3(t)(t - 3)^2\\}$, and why is it simple?',
              answerOutline: '$2e^{-3s}/s^3$. The function is already written in $t - 3$.',
            },
            {
              question: 'In the worked example, why does the amplitude after the force stops equal 2?',
              answerOutline: 'The motion is an oscillation of amplitude 1 about 1, so at $t = \\pi$ the mass is at 2 with zero velocity. With no force it swings about 0 with amplitude 2.',
            },
            {
              question: 'If forcing has a jump, which of $y, y\', y\'\'$ jump in a second-order equation?',
              answerOutline: 'Only $y\'\'$. The functions $y$ and $y\'$ remain continuous.',
            },
          ],
        },
        {
          slug: 'impulses-and-delta',
          title: 'Impulses and the delta function',
          summary:
            'Model a sharp blow as a limit of short pulses, and solve for the jump in velocity it causes.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the delta function as the limit of unit-area pulses',
            'Use the sifting property and $\\mathcal{L}\\{\\delta(t - c)\\} = e^{-cs}$',
            'Solve initial value problems with impulsive forcing',
            'Relate an impulse to a jump in the first derivative',
          ],
          concepts: [
            'Impulse',
            'Dirac delta $\\delta(t - c)$',
            'Sifting property',
            'Jump in velocity',
            'Impulse response',
          ],
          explanation: `A hammer blow transfers a finite momentum in a very short time. Its **impulse** is $\\int F\\,dt$. Model it by a pulse $d_\\epsilon(t)$ of height $1/\\epsilon$ on $[c, c + \\epsilon)$, with area 1. As $\\epsilon \\to 0$ no ordinary function is the limit, since the height is infinite and the width is zero. What does have a limit is the effect on a continuous function $f$:

$$\\int_0^\\infty d_\\epsilon(t)f(t)\\,dt = \\frac{1}{\\epsilon}\\int_c^{c + \\epsilon}f(t)\\,dt \\longrightarrow f(c).$$

The **Dirac delta** $\\delta(t - c)$ is the object defined by this **sifting property**:

$$\\int_0^\\infty \\delta(t - c)f(t)\\,dt = f(c), \\qquad c > 0.$$

It is not a function in the usual sense. It is a rule for what happens under an integral. Take $f = e^{-st}$ to get

$$\\mathcal{L}\\{\\delta(t - c)\\} = e^{-cs}.$$

The transform of the pulse $d_\\epsilon$ is $e^{-cs}(1 - e^{-\\epsilon s})/(\\epsilon s)$, which tends to $e^{-cs}$ as well, so the limit is consistent.

**Worked example.** A damped oscillator at rest receives a unit impulse at $t = 1$:

$$y'' + 2y' + 5y = \\delta(t - 1), \\qquad y(0) = y'(0) = 0.$$

Transforming,

$$(s^2 + 2s + 5)Y = e^{-s}, \\qquad Y = e^{-s}\\frac{1}{(s + 1)^2 + 4}.$$

The inverse of $\\frac{1}{(s + 1)^2 + 4}$ is $\\frac12 e^{-t}\\sin 2t$, so the second shift theorem gives

$$y(t) = \\tfrac12 u_1(t)\\,e^{-(t - 1)}\\sin 2(t - 1).$$

Nothing happens until $t = 1$. Then $y$ is continuous, but $y'$ jumps. Differentiating at $t = 1^+$, $y'(1^+) = \\frac12 \\cdot 2 = 1$, while $y'(1^-) = 0$. So a unit impulse raises $y'$ by exactly 1.

To see this from the equation, integrate it from $1 - \\epsilon$ to $1 + \\epsilon$. The left side gives $[y' + 2y]_{1-\\epsilon}^{1+\\epsilon} + 5\\int y\\,dt$. As $\\epsilon \\to 0$, $y$ stays continuous, and only the jump in $y'$ survives, equal to the integral of the delta, namely 1. In general, for $ay'' + by' + cy = J\\delta(t - c_0)$ the jump in $y'$ is $J/a$. In mechanics, this is momentum: $m\\,\\Delta v = J$.

The response of a system at rest to $\\delta(t)$ is called the **impulse response** $h(t)$. Its transform is the transfer function, $H(s) = 1/P(s)$. Here that gives $h(t) = \\frac12 e^{-t}\\sin 2t$. Once you know $h$, you can find the response to any forcing, and this is the subject of the next lesson.

\`\`\`interactive
laplace-response
{"title": "A unit impulse at t = 1", "mode": "impulse", "a": 1, "b": 2, "c": 5, "J": 1, "at": 1, "tMax": 6, "caption": "With ε = 0 the input is δ(t − 1), and the response is ½ u₁(t) e^(−(t−1)) sin 2(t − 1). Nothing happens before t = 1, then y′ jumps by J/a = 1 and y starts from 0 with a corner. Raise the pulse width ε: the input becomes the pulse d_ε of height 1/ε and area 1, and its response (solid) lags behind the impulse response (dashed). Shrink ε back towards 0 and the gap readout falls to 0, which is the sense in which d_ε tends to δ."}
\`\`\``,
          resources: [
            lebl('The section on Dirac delta and impulse response.'),
            paul('DiracDeltaFunction', 'Dirac Delta Function', 'The definition, the limit and solved problems.'),
            mit1803('Sessions on the delta function and on impulse response.'),
          ],
          exercises: [
            {
              slug: 'single-kick',
              title: 'A single kick',
              prompt: `Solve (a) $y'' + y = \\delta(t - \\pi)$, $y(0) = y'(0) = 0$, and (b) $y'' + 2y' + y = \\delta(t - 1)$, $y(0) = y'(0) = 0$. Give the jump in $y'$ in each case and sketch the solution.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'timed-kicks',
              title: 'Timing two kicks',
              prompt: `An undamped oscillator $y'' + y = \\delta(t) + A\\,\\delta(t - c)$ is at rest before $t = 0$. (a) For $A = 1$, $c = \\pi$, show that the motion stops completely after the second kick. (b) For $A = 1$, $c = 2\\pi$, find the amplitude after the second kick. (c) Find the amplitude after the second kick for general $A$ and $c$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Treat the initial kick as giving $y\'(0^+) = 1$. For (c) add the two sinusoids as phasors.',
            },
            {
              slug: 'pulse-limit',
              title: 'Watch the pulse become an impulse',
              prompt: `Solve $y'' + y = \\frac{1}{\\epsilon}[u_1(t) - u_{1+\\epsilon}(t)]$ with $y(0) = y'(0) = 0$ exactly. Show that the solution tends to $u_1(t)\\sin(t - 1)$ as $\\epsilon \\to 0$. For $\\epsilon = 1, 0.1, 0.01$, find the maximum difference between the two on $[0, 10]$ and see how it scales.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'nonzero-initial-with-impulse',
              title: 'Initial data versus an impulse',
              prompt: `Show that $y'' + 3y' + 2y = 0$ with $y(0) = 0$, $y'(0) = 1$ and the equation $y'' + 3y' + 2y = \\delta(t)$ with zero initial data (the delta taken to act just after $t = 0$) have the same solution for $t > 0$. Find it. Then explain in terms of momentum why this makes sense.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\int_0^\\infty \\delta(t - 2)\\cos t\\,dt$?',
              answerOutline: '$\\cos 2$, by the sifting property.',
            },
            {
              question: 'Why is the delta "function" not a function?',
              answerOutline: 'No ordinary function is zero except at a point and yet has integral 1. It is defined by its action under an integral.',
            },
            {
              question: 'A mass of 2 kg receives an impulse of 6 N s. What is the jump in velocity?',
              answerOutline: '$J/m = 3$ m/s. The position stays continuous.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/dirac-delta-and-greens-functions'],
        },
        {
          slug: 'convolution',
          title: 'Convolution and the impulse response',
          summary:
            'A product of transforms is the transform of a convolution, so every response is a weighted memory of past forcing.',
          estimatedMinutes: 100,
          objectives: [
            'Compute convolutions from the definition',
            'State and use the convolution theorem',
            'Write the solution of a forced equation as the impulse response convolved with the forcing',
            'Solve a simple integral equation by transforms',
          ],
          concepts: [
            'Convolution $f * g$',
            'Convolution theorem',
            'Impulse response',
            'Transfer function',
            'Duhamel\'s principle',
            'Volterra integral equation',
          ],
          explanation: `The transform of a product is not the product of the transforms. Instead, products of transforms correspond to **convolution**:

$$(f * g)(t) = \\int_0^t f(t - \\tau)g(\\tau)\\,d\\tau, \\qquad \\mathcal{L}\\{f * g\\} = F(s)G(s).$$

To prove the theorem, write $F(s)G(s)$ as a double integral over the first quadrant in the $(\\sigma, \\tau)$ plane and change variable to $t = \\sigma + \\tau$. Exchanging the order of integration is justified for functions of exponential order when $s$ is large enough. Convolution is commutative, $f * g = g * f$, as the substitution $\\tau \\to t - \\tau$ shows. It also distributes over addition and is associative.

Warning: $1 * f$ is not $f$. It is $\\int_0^t f$. The identity for convolution is $\\delta$, since $\\mathcal{L}\\{\\delta\\} = 1$.

Apply this to $P(D)y = g$ with zero initial data, where $P(s) = as^2 + bs + c$. Then

$$Y(s) = H(s)G(s), \\quad H(s) = \\frac{1}{P(s)}, \\quad\\text{so}\\quad y(t) = \\int_0^t h(t - \\tau)g(\\tau)\\,d\\tau.$$

This is **Duhamel's principle**. To understand it, think of $g$ as a stream of tiny impulses $g(\\tau)\\,d\\tau$. Each one produces a response $h(t - \\tau)g(\\tau)\\,d\\tau$ at the later time $t$, and because the equation is linear, the responses add. So $h$ is the system's memory.

**Worked example.** Solve $y'' + y = g(t)$ with zero initial data.

Here $H(s) = 1/(s^2 + 1)$, so $h(t) = \\sin t$, and

$$y(t) = \\int_0^t \\sin(t - \\tau)g(\\tau)\\,d\\tau$$

for any piecewise continuous $g$. This is the same formula that variation of parameters produced. Try $g(t) = t$:

$$y(t) = \\int_0^t \\tau\\sin(t - \\tau)\\,d\\tau.$$

Integrate by parts with $u = \\tau$ and $dv = \\sin(t - \\tau)\\,d\\tau$, so $v = \\cos(t - \\tau)$:

$$y(t) = \\Big[\\tau\\cos(t - \\tau)\\Big]_0^t - \\int_0^t \\cos(t - \\tau)\\,d\\tau = t - \\sin t.$$

Check: $y'' + y = \\sin t + t - \\sin t = t$, with $y(0) = 0$ and $y'(0) = 1 - 1 = 0$. You can also get it from transforms: $\\frac{1}{s^2}\\cdot\\frac{1}{s^2 + 1} = \\frac{1}{s^2} - \\frac{1}{s^2 + 1}$.

\`\`\`interactive
laplace-response
{"title": "Duhamel's principle for y'' + y = g(t)", "mode": "convolution", "a": 1, "b": 0, "c": 1, "g": "t", "tMax": 10, "caption": "The upper plot shows the integrand at the chosen time t: the forcing g(τ) = τ, the impulse response h(t − τ) = sin(t − τ) run backwards from t, and their product. Its signed shaded area is y(t). Move t or press Play: the area readout matches t − sin t, which is also the directly solved y(t). Type another forcing, such as cos(t) for resonance or 1 for a step, and the two readouts still agree."}
\`\`\`

Convolution solves some **integral equations** as well. If $y(t) = f(t) + \\int_0^t k(t - \\tau)y(\\tau)\\,d\\tau$, then $Y = F + KY$, so $Y = F/(1 - K)$.

The same idea appears in signal processing, where a linear time-invariant system is fully described by its impulse response, and in probability, where the density of a sum of independent variables is a convolution of densities.`,
          resources: [
            lebl('The section on convolution.'),
            paul('ConvolutionIntegrals', 'Convolution Integrals', 'The theorem with examples of inverting products.'),
            mit1803('The sessions on convolution and on Green\'s formula.'),
          ],
          exercises: [
            {
              slug: 'compute-convolutions',
              title: 'Compute convolutions',
              prompt: `From the definition, compute (a) $1 * t$; (b) $t * t$; (c) $e^{t} * e^{2t}$; (d) $\\sin t * \\cos t$. Confirm each using the convolution theorem.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'volterra-equation',
              title: 'An integral equation',
              prompt: `Solve $y(t) = t + \\int_0^t (t - \\tau)y(\\tau)\\,d\\tau$ using the transform. Check your answer by differentiating the equation twice to turn it into an initial value problem.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'prove-convolution-theorem',
              title: 'Prove the convolution theorem',
              prompt: `Assume $f$ and $g$ are continuous and of exponential order. Prove that $\\mathcal{L}\\{f * g\\} = FG$ by writing the product as a double integral and changing variables. Sketch the region of integration in the $(t, \\tau)$ plane. Then prove that $f * g = g * f$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'convolve-numerically',
              title: 'Response by discrete convolution',
              prompt: `For $y'' + 2y' + 5y = g(t)$ at rest, use $h(t) = \\frac12 e^{-t}\\sin 2t$, and take $g$ to be the square wave of period 4 equal to 1 on $[0, 2)$ and 0 on $[2, 4)$. Compute $y$ on $[0, 30]$ by a discrete convolution with \`numpy.convolve\`, using step $dt = 0.005$. Compare with \`solve_ivp\`, and report the maximum difference. Explain the factor of $dt$ in the discrete sum.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $h$ called the impulse response, and how do you get it from $P(s)$?',
              answerOutline: 'It is the response to $\\delta(t)$ with the system at rest. It is the inverse transform of $1/P(s)$.',
            },
            {
              question: 'What is $\\mathcal{L}^{-1}\\{F(s)/s\\}$?',
              answerOutline: '$1 * f = \\int_0^t f(\\tau)\\,d\\tau$.',
            },
            {
              question: 'What does Duhamel\'s principle assume about the system?',
              answerOutline: 'It must be linear and time-invariant, with zero initial data. Initial data adds a separate homogeneous term.',
            },
          ],
        },
      ],
      project: {
        slug: 'transfer-function-toolkit',
        title: 'A transfer function toolkit',
        description: `Write a small Python module that answers questions about a second-order system from its coefficients alone: poles, impulse response, step response and the response to arbitrary sampled forcing. Use it to study a door closer: choose the damping coefficient of a mass-spring-damper model so that a door shuts quickly without slamming, and then examine what happens when someone pushes on it for a second.`,
        deliverables: [
          'Functions for poles, impulse response and step response, tested against hand-derived formulas for an underdamped and an overdamped case',
          'A function computing the response to sampled forcing by discrete convolution, and tested against `solve_ivp`',
          'A SymPy script that derives the transform solution for one case and verifies it by substitution',
          'A design study for the door closer: settling time against damping, and the chosen value with reasons',
          'The response to a pulse and to a short impulse, showing that they agree when the pulse is brief',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add a Bode plot of $|H(i\\omega)|$ and connect it with the resonance formula'],
      },
    },
    {
      slug: 'systems',
      title: 'Systems of Differential Equations',
      description:
        'Learn the matrix facts you need, solve linear systems with eigenvalues, draw phase portraits, and use linearisation to study non-linear systems near equilibria.',
      lessons: [
        {
          slug: 'matrices-and-eigenvalues',
          title: 'Matrices and eigenvalues',
          summary:
            'The minimum linear algebra for systems: matrix products, determinants, inverses, eigenvalues and eigenvectors, with no prior course assumed.',
          estimatedMinutes: 120,
          objectives: [
            'Multiply matrices, compute a $2 \\times 2$ determinant and inverse, and solve $Ax = b$',
            'Find eigenvalues from the characteristic equation and eigenvectors from $(A - \\lambda I)v = 0$',
            'Use trace and determinant as checks',
            'Handle complex eigenvalues and eigenvectors',
          ],
          concepts: [
            'Matrix-vector product',
            'Determinant',
            'Inverse of a matrix',
            'Linear independence of vectors',
            'Eigenvalue and eigenvector',
            'Characteristic equation',
            'Trace',
          ],
          explanation: `A matrix $A$ acts on a vector by taking combinations of its columns:

$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}.$$

The product $AB$ applies $B$ first and then $A$, and in general $AB \\neq BA$. The identity $I$ has ones on the diagonal and zeros elsewhere.

For a $2 \\times 2$ matrix, the **determinant** is $\\det A = ad - bc$. If it is non-zero, then $A$ has the inverse

$$A^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix},$$

and $Ax = b$ has the unique solution $x = A^{-1}b$. If $\\det A = 0$, then $Ax = 0$ has non-zero solutions. This last fact is the key to everything below. Two vectors are **linearly independent** if neither is a multiple of the other, which is the same as saying the matrix with those columns has non-zero determinant.

A non-zero vector $v$ is an **eigenvector** of $A$ with **eigenvalue** $\\lambda$ if

$$Av = \\lambda v.$$

Along $v$, the matrix acts like simple multiplication. Rewriting gives $(A - \\lambda I)v = 0$, and a non-zero solution exists only if

$$\\det(A - \\lambda I) = 0.$$

For a $2 \\times 2$ matrix this **characteristic equation** is

$$\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A = 0,$$

where the **trace** $\\operatorname{tr}A = a + d$ is the sum of the diagonal entries. Hence the eigenvalues add to the trace and multiply to the determinant, which gives you a quick check.

**Worked example.** Take $A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$. The trace is 2 and the determinant is $-3$, so

$$\\lambda^2 - 2\\lambda - 3 = (\\lambda - 3)(\\lambda + 1) = 0.$$

For $\\lambda = 3$:

$$A - 3I = \\begin{pmatrix} -2 & 2 \\\\ 2 & -2 \\end{pmatrix},$$

so both rows say $v_1 = v_2$, and $v = (1, 1)$. For $\\lambda = -1$:

$$A + I = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix},$$

so $v_1 = -v_2$, and $v = (1, -1)$. Check: $A(1, 1)^T = (3, 3)^T$. It works.

The two rows of $A - \\lambda I$ must be multiples of each other when $\\lambda$ is an eigenvalue. If they are not, you have made an arithmetic mistake. Any non-zero multiple of an eigenvector is an eigenvector too.

Eigenvalues may be complex even when $A$ is real. For $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, the equation is $\\lambda^2 + 1 = 0$, so $\\lambda = \\pm i$. The eigenvectors are then complex, found in the same way, and they come in conjugate pairs.`,
          resources: [
            lebl('The appendix on linear algebra and the section on eigenvalues in the systems chapter.'),
            paul('LA_Matrix', 'Review: Matrices and Vectors', 'A compact review of matrix arithmetic.'),
            paul('LA_Eigen', 'Review: Eigenvalues and Eigenvectors', 'Worked eigenvalue computations, including complex ones.'),
            { title: '3Blue1Brown: Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The episodes on determinants and on eigenvectors give the geometric meaning.' },
          ],
          exercises: [
            {
              slug: 'inverse-and-solve',
              title: 'Inverse and solve',
              prompt: `Let $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$. Find $\\det A$ and $A^{-1}$, and solve $Ax = (1, 2)^T$. Check by multiplying. Find a value of $k$ for which $\\begin{pmatrix} 2 & 1 \\\\ k & 3 \\end{pmatrix}$ has no inverse.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'eigen-drill',
              title: 'Eigenvalue drill',
              prompt: `Find the eigenvalues and eigenvectors, and check them against the trace and determinant. (a) $\\begin{pmatrix} 4 & -2 \\\\ 1 & 1 \\end{pmatrix}$. (b) $\\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$. (c) $\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$. (d) The $3 \\times 3$ triangular matrix with rows $(2, 0, 0)$, $(1, 3, 0)$, $(0, 0, -1)$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'independent-eigenvectors',
              title: 'Distinct eigenvalues give independent vectors',
              prompt: `Suppose $Av = \\lambda v$ and $Aw = \\mu w$ with $\\lambda \\neq \\mu$ and $v, w$ non-zero. Prove that $v$ and $w$ are independent. Then prove that for any $2 \\times 2$ matrix the eigenvalues add to the trace and multiply to the determinant, using the factorisation of the characteristic polynomial.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Suppose $av + bw = 0$, apply $A$, and subtract $\\lambda$ times the original equation.',
            },
            {
              slug: 'numpy-eigen',
              title: 'Eigenvalues in NumPy',
              prompt: `Use \`numpy.linalg.eig\` on $\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$ and on $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. Explain how the returned eigenvectors relate to the ones in this lesson, given that NumPy scales them to unit length and stores them as columns. Verify $Av = \\lambda v$ numerically.`,
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must $\\det(A - \\lambda I) = 0$ at an eigenvalue?',
              answerOutline: 'Otherwise $A - \\lambda I$ is invertible, and the only solution of $(A - \\lambda I)v = 0$ is $v = 0$.',
            },
            {
              question: 'What quick checks can you apply to eigenvalues?',
              answerOutline: 'Their sum equals the trace, and their product equals the determinant.',
            },
            {
              question: 'What are the eigenvalues of a triangular matrix?',
              answerOutline: 'Its diagonal entries, since the determinant of a triangular matrix is the product of its diagonal.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/eigenvalues-and-networks/eigenvalues-and-eigenvectors'],
        },
        {
          slug: 'first-order-linear-systems',
          title: 'First-order linear systems',
          summary:
            'Write coupled equations as $x\' = Ax$, and build the general solution from eigenvalues and eigenvectors.',
          estimatedMinutes: 110,
          objectives: [
            'Convert a higher-order equation into a first-order system',
            'Use superposition and the Wronskian for systems',
            'Solve $x\' = Ax$ when $A$ has real distinct eigenvalues',
            'Solve initial value problems, and model coupled tanks',
          ],
          concepts: [
            'First-order system',
            'Vector form $x\' = Ax$',
            'Eigenvalue solution $e^{\\lambda t}v$',
            'Fundamental set for a system',
            'Conversion from higher order',
          ],
          explanation: `A system of first-order equations can always be written in vector form. For example, any second-order equation becomes a system by naming the velocity: for $y'' + 3y' + 2y = 0$, let $x_1 = y$ and $x_2 = y'$, so

$$x_1' = x_2, \\qquad x_2' = -2x_1 - 3x_2,$$

which is $x' = Ax$ with $A = \\begin{pmatrix} 0 & 1 \\\\ -2 & -3 \\end{pmatrix}$. The eigenvalues of $A$ are the characteristic roots, $-1$ and $-2$. This is why numerical solvers need only handle first-order systems.

The theory matches what you know. If the entries of $A(t)$ and $g(t)$ are continuous on an interval, $x' = A(t)x + g(t)$ has a unique solution there for each $x(t_0)$. Solutions of the homogeneous system can be superposed. For two equations, solutions $x^{(1)}, x^{(2)}$ form a fundamental set if the Wronskian $\\det[x^{(1)}\\ x^{(2)}]$ is non-zero, and then all solutions are $c_1 x^{(1)} + c_2 x^{(2)}$.

For constant $A$, try $x = e^{\\lambda t}v$ with a constant vector $v$. Then $x' = \\lambda e^{\\lambda t}v$ and $Ax = e^{\\lambda t}Av$, so we need exactly $Av = \\lambda v$. **Each eigenpair gives a solution.** With real distinct eigenvalues, the eigenvectors are independent, and

$$x(t) = c_1 e^{\\lambda_1 t}v_1 + c_2 e^{\\lambda_2 t}v_2.$$

Along each eigenvector, the motion is pure exponential growth or decay.

**Worked example.** Solve $x' = \\begin{pmatrix} 1 & 1 \\\\ 4 & 1 \\end{pmatrix}x$ with $x(0) = (2, 0)^T$.

Trace 2 and determinant $-3$ give $\\lambda^2 - 2\\lambda - 3 = 0$, so $\\lambda = 3, -1$.

For $\\lambda = 3$: $A - 3I$ has first row $(-2, 1)$, so $v_1 = (1, 2)^T$.

For $\\lambda = -1$: $A + I$ has first row $(2, 1)$, so $v_2 = (1, -2)^T$.

The general solution is

$$x(t) = c_1 e^{3t}\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} + c_2 e^{-t}\\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}.$$

At $t = 0$: $c_1 + c_2 = 2$ and $2c_1 - 2c_2 = 0$, so $c_1 = c_2 = 1$. Hence

$$x_1 = e^{3t} + e^{-t}, \\qquad x_2 = 2e^{3t} - 2e^{-t}.$$

Check: $x_1' = 3e^{3t} - e^{-t}$, and $x_1 + x_2 = 3e^{3t} - e^{-t}$. It matches, and likewise $x_2' = 6e^{3t} + 2e^{-t} = 4x_1 + x_2$.

For large $t$, the $e^{3t}$ term dominates, so the solution lines up with $(1, 2)^T$. The direction of the fastest-growing mode wins for almost every starting point. The exceptions are the points on the line through $(1, -2)^T$, where $c_1 = 0$.

\`\`\`interactive
phase-portrait
{"title": "x' = Ax with A = (1, 1; 4, 1)", "A": [[1, 1], [4, 1]], "probe": [2, 0], "traceDet": false, "caption": "The red probe sits at the worked example's initial point (2, 0), and the red curve is x₁ = e^(3t) + e^(−t), x₂ = 2e^(3t) − 2e^(−t). The dashed lines are the eigenvector directions: (1, 2) with λ = 3 (red, growing) and (1, −2) with λ = −1 (green, decaying). Every trajectory turns to run parallel to (1, 2) as t grows. Drag the probe onto the green line, where c₁ = 0, and the solution slides straight into the origin instead. Change the entries to see the eigenvectors move."}
\`\`\``,
          resources: [
            lebl('The systems chapter, on first-order linear systems and the eigenvalue method.'),
            paul('SystemsIntro', 'Systems of Differential Equations', 'The start of the systems chapter.'),
            paul('SolutionsToSystems', 'Solutions to Systems', 'Why $e^{\\lambda t}v$ works.'),
            paul('RealEigenvalues', 'Real Eigenvalues', 'Examples, with phase portraits.'),
          ],
          exercises: [
            {
              slug: 'convert-to-system',
              title: 'Convert to a system',
              prompt: `Write $y'' + 3y' + 2y = \\cos t$ as a first-order system. Then write $y''' - 2y'' + y = 0$ as a system of three equations. In the first case confirm that the eigenvalues of the homogeneous system are the characteristic roots.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'two-by-two-ivp',
              title: 'A $2 \\times 2$ initial value problem',
              prompt: `Solve $x' = \\begin{pmatrix} 3 & -2 \\\\ 2 & -2 \\end{pmatrix}x$ with $x(0) = (1, -1)^T$. Describe the behaviour as $t \\to \\infty$ and as $t \\to -\\infty$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'coupled-tanks',
              title: 'Two connected tanks',
              prompt: `Two 100 L tanks exchange well-mixed fluid through two pipes, each carrying 2 L/min in opposite directions. Tank 1 starts with 10 kg of salt, and tank 2 with none. Write the system for $x_1, x_2$, and find the eigenvalues. Solve it, explain the meaning of the eigenvalue 0 and of its eigenvector, and find the time at which tank 2 holds 4 kg.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'three-by-three',
              title: 'A $3 \\times 3$ system',
              prompt: `Solve $x' = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}x$ with $x(0) = (1, 0, 1)^T$. The eigenvalue 2 has two independent eigenvectors. Why does that mean you need no extra work here? Check with \`numpy.linalg.eig\` or by substitution.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $x = e^{\\lambda t}v$ solve $x\' = Ax$ when $Av = \\lambda v$?',
              answerOutline: 'Both sides equal $\\lambda e^{\\lambda t}v$.',
            },
            {
              question: 'Which term dominates for large $t$ in $c_1 e^{3t}v_1 + c_2 e^{-t}v_2$?',
              answerOutline: 'The $e^{3t}$ term, unless $c_1 = 0$, so the solution aligns with $v_1$.',
            },
            {
              question: 'Why can a numerical solver work with first-order systems only?',
              answerOutline: 'Any higher-order equation can be converted by introducing derivatives as new unknowns.',
            },
          ],
        },
        {
          slug: 'complex-and-repeated-eigenvalues',
          title: 'Complex and repeated eigenvalues',
          summary:
            'Extract real solutions from complex eigenpairs, and find the missing solution when a repeated eigenvalue has too few eigenvectors.',
          estimatedMinutes: 110,
          objectives: [
            'Build two real solutions from a complex eigenpair',
            'Find a generalised eigenvector for a defective repeated eigenvalue',
            'Solve initial value problems in these cases',
            'Find the normal modes of a pair of coupled oscillators',
          ],
          concepts: [
            'Complex eigenpair',
            'Real and imaginary parts of a solution',
            'Defective eigenvalue',
            'Generalised eigenvector',
            'Normal modes',
          ],
          explanation: `**Complex eigenvalues.** If $A$ is real with eigenpair $\\lambda = \\alpha + i\\beta$, $v$, then $e^{\\lambda t}v$ is a complex solution, and its real and imaginary parts are two independent real solutions.

**Worked example.** Take $A = \\begin{pmatrix} 1 & -5 \\\\ 1 & -3 \\end{pmatrix}$. The trace is $-2$ and the determinant is $-3 + 5 = 2$, so $\\lambda^2 + 2\\lambda + 2 = 0$ and $\\lambda = -1 \\pm i$. For $\\lambda = -1 + i$, the first row of $A - \\lambda I$ is $(2 - i, -5)$, so $(2 - i)v_1 = 5v_2$. Take $v = (5, 2 - i)^T$. Then

$$e^{(-1 + i)t}v = e^{-t}(\\cos t + i\\sin t)\\begin{pmatrix} 5 \\\\ 2 - i \\end{pmatrix}.$$

Multiplying out and separating,

$$x^{(1)} = e^{-t}\\begin{pmatrix} 5\\cos t \\\\ 2\\cos t + \\sin t \\end{pmatrix}, \\qquad x^{(2)} = e^{-t}\\begin{pmatrix} 5\\sin t \\\\ 2\\sin t - \\cos t \\end{pmatrix}.$$

The general solution is $c_1 x^{(1)} + c_2 x^{(2)}$. Do not use the conjugate eigenvalue as well, since it gives the same two real solutions.

To check $x^{(1)}$: its first component has derivative $e^{-t}(-5\\cos t - 5\\sin t)$, and $x_1 - 5x_2 = e^{-t}(5\\cos t - 10\\cos t - 5\\sin t)$, which is the same.

\`\`\`interactive
phase-portrait
{"title": "Complex eigenvalues: A = (1, −5; 1, −3)", "A": [[1, -5], [1, -3]], "view": [-6, 6, -4, 4], "probe": [5, 2], "traceDet": false, "caption": "The eigenvalues are −1 ± i, so there are no real eigenvector lines. Solutions wind round the origin with angular frequency β = 1 while e^(−t) shrinks them. The probe at (5, 2) is x⁽¹⁾ at t = 0. Its curve is the real solution e^(−t)(5 cos t, 2 cos t + sin t), a tilted ellipse that decays. Drag d to −1 so that the trace is 0: the real part vanishes and the spirals close into ellipses."}
\`\`\`

**Repeated eigenvalues.** If $\\lambda$ is a double root and has two independent eigenvectors, nothing changes. For a $2 \\times 2$ matrix this happens only if $A = \\lambda I$. Otherwise there is just one eigenvector $v$, the eigenvalue is **defective**, and one solution $e^{\\lambda t}v$ is missing. By analogy with the factor $t$ in the repeated-root case, try $x = e^{\\lambda t}(tv + w)$. Substituting gives

$$(A - \\lambda I)v = 0, \\qquad (A - \\lambda I)w = v.$$

The vector $w$ is a **generalised eigenvector**.

For $A = \\begin{pmatrix} 3 & 1 \\\\ -1 & 1 \\end{pmatrix}$, the trace is 4 and the determinant is 4, so $\\lambda = 2$ twice. Then $A - 2I = \\begin{pmatrix} 1 & 1 \\\\ -1 & -1 \\end{pmatrix}$, which gives $v = (1, -1)^T$. Solving $w_1 + w_2 = 1$ allows $w = (1, 0)^T$. So

$$x(t) = c_1 e^{2t}\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} + c_2 e^{2t}\\left[t\\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} + \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}\\right].$$

Any other choice of $w$ differs by a multiple of $v$, and only changes $c_1$.

\`\`\`interactive
phase-portrait
{"title": "A defective eigenvalue: A = (3, 1; −1, 1)", "A": [[3, 1], [-1, 1]], "view": [-3, 3, -3, 3], "probe": [1, 0], "caption": "λ = 2 is a double eigenvalue with the single eigenvector line through (1, −1), shown dashed. The probe at w = (1, 0) follows e^(2t)[t(1, −1) + (1, 0)]: as t grows the t v term takes over, so it bends round to run parallel to v. In the trace-determinant panel the point sits exactly on the parabola D = T²/4 at T = 4. Move b or c a little and it leaves the parabola, giving a node with two eigenvector lines or a spiral."}
\`\`\`

**Normal modes.** Two equal masses connected by three equal springs satisfy $x'' = Kx$ with $K = \\begin{pmatrix} -2 & 1 \\\\ 1 & -2 \\end{pmatrix}$, in units where $k/m = 1$. Eigenvalues $-1$ and $-3$ of $K$ give frequencies $1$ and $\\sqrt{3}$, for the in-phase and opposite-phase motions.`,
          resources: [
            lebl('The sections on complex and on repeated eigenvalues in the systems chapter.'),
            paul('ComplexEigenvalues', 'Complex Eigenvalues', 'Extracting real solutions.'),
            paul('RepeatedEigenvalues', 'Repeated Eigenvalues', 'Generalised eigenvectors, with a derivation.'),
          ],
          exercises: [
            {
              slug: 'rotation-decay',
              title: 'Rotation with decay',
              prompt: `Solve $x' = \\begin{pmatrix} -1 & 2 \\\\ -2 & -1 \\end{pmatrix}x$ with $x(0) = (1, 0)^T$. Show that $|x(t)|$ decays like $e^{-t}$, and state whether the rotation is clockwise.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'defective-ivp',
              title: 'A defective matrix',
              prompt: `Solve $x' = \\begin{pmatrix} 1 & -1 \\\\ 1 & 3 \\end{pmatrix}x$ with $x(0) = (1, 0)^T$, and verify by substitution.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'coupled-masses',
              title: 'Coupled masses',
              prompt: `For the two masses in the lesson, $x'' = Kx$, try $x = \\cos(\\omega t)v$ and $x = \\sin(\\omega t)v$. Show that $-\\omega^2$ must be an eigenvalue of $K$. Find both modes. Solve for $x(0) = (1, 0)^T$, $x'(0) = 0$, and describe the motion in terms of the two modes. Explain why it is not periodic. Plot $x_1$ and $x_2$ on $[0, 40]$.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'star-versus-defective',
              title: 'When is a repeated eigenvalue not defective?',
              prompt: `Prove that a $2 \\times 2$ matrix with a repeated eigenvalue $\\lambda$ and two independent eigenvectors must equal $\\lambda I$. Then show the converse of the method: if $A$ is $2 \\times 2$, has a double eigenvalue $\\lambda$ and $A \\neq \\lambda I$, then $(A - \\lambda I)^2 = 0$, so every vector $w$ that is not an eigenvector gives a valid chain with $v = (A - \\lambda I)w$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the second part, use the fact that a $2 \\times 2$ matrix satisfies its own characteristic equation (check this directly from the entries).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do you need only one of the two conjugate eigenvalues?',
              answerOutline: 'The conjugate solution has the same real part and the negative imaginary part, so it adds no new real solutions.',
            },
            {
              question: 'What equations define a generalised eigenvector?',
              answerOutline: '$(A - \\lambda I)v = 0$ and $(A - \\lambda I)w = v$, with $v \\neq 0$.',
            },
            {
              question: 'Why does a double eigenvalue bring a factor of $t$?',
              answerOutline: 'There are not enough eigenvectors, so a solution of the form $e^{\\lambda t}(tv + w)$ is needed, as with repeated characteristic roots.',
            },
          ],
        },
        {
          slug: 'phase-portraits',
          title: 'Phase portraits and the trace-determinant plane',
          summary:
            'Classify every planar linear system by two numbers, and draw what its solutions do.',
          estimatedMinutes: 110,
          objectives: [
            'Sketch phase portraits for each type of planar linear system',
            'Classify a system from its trace and determinant',
            'Find the sense of rotation from a test vector',
            'Interpret a damped oscillator in the trace-determinant plane',
          ],
          concepts: [
            'Phase plane',
            'Saddle',
            'Node',
            'Spiral',
            'Center',
            'Trace-determinant plane',
            'Sense of rotation',
          ],
          explanation: `For $x' = Ax$ in two dimensions, plot solutions as curves $(x_1(t), x_2(t))$ in the **phase plane**, with arrows showing the direction of time. If $\\det A \\neq 0$, the origin is the only equilibrium. Let $T = \\operatorname{tr}A$, $D = \\det A$. The eigenvalues are

$$\\lambda = \\frac{T \\pm \\sqrt{T^2 - 4D}}{2},$$

so these two numbers decide the picture.

| Condition | Type | Stability |
|---|---|---|
| $D < 0$ | Saddle | Unstable |
| $D > 0$, $T^2 > 4D$, $T < 0$ | Node | Asymptotically stable |
| $D > 0$, $T^2 > 4D$, $T > 0$ | Node | Unstable |
| $D > 0$, $T^2 < 4D$, $T < 0$ | Spiral | Asymptotically stable |
| $D > 0$, $T^2 < 4D$, $T > 0$ | Spiral | Unstable |
| $D > 0$, $T = 0$ | Center | Stable, not asymptotically |

**Saddle:** eigenvalues of opposite sign. Solutions come in along the eigenvector of the negative eigenvalue and leave along the positive one. **Node:** two real eigenvalues of the same sign. Near the origin, solutions run tangent to the eigenvector of the eigenvalue with smaller absolute value, the slow direction, and far from it they run parallel to the fast direction. **Spiral:** $\\lambda = \\alpha \\pm i\\beta$ with $\\alpha \\neq 0$, so solutions wind in or out. **Center:** $\\alpha = 0$, so solutions are closed ellipses.

The boundary $T^2 = 4D$ holds the repeated eigenvalues: improper nodes for a defective matrix and star points for $A = \\lambda I$. Summary: **all eigenvalues have negative real part exactly when $T < 0$ and $D > 0$.**

**Worked example.** Classify $x' = Ax$ with $A = \\begin{pmatrix} -1 & 4 \\\\ -2 & 3 \\end{pmatrix}$.

Here $T = 2$, $D = -3 + 8 = 5$, and $T^2 = 4 < 20 = 4D$. So this is an **unstable spiral**, with $\\lambda = 1 \\pm 2i$. Solutions grow like $e^t$ while rotating at angular frequency 2.

The eigenvalues do not reveal the sense of rotation, but a test vector does. At the point $(1, 0)$,

$$A\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ -2 \\end{pmatrix}.$$

The velocity at a point on the positive $x_1$-axis points downward, so the rotation is **clockwise**.

To sketch a system, find the type, draw eigenvector lines if the eigenvalues are real, add a few velocity vectors from test points, and fill in curves that respect them.

Physical systems fit this picture directly. The oscillator $mx'' + cx' + kx = 0$ has $T = -c/m$ and $D = k/m$. The condition $T^2 < 4D$ means $c^2 < 4mk$, so underdamped motion is a stable spiral, overdamped motion is a stable node, critical damping sits on the parabola, and no damping is a center. Moving through the plane by changing parameters shows how behaviour changes.

\`\`\`interactive
phase-portrait
{"title": "Phase portraits and the trace-determinant plane", "A": [[-1, 4], [-2, 3]], "caption": "This is the worked example: T = 2, D = 5, an unstable spiral turning clockwise, as the rotation readout and the test vector A(1, 0) = (−1, −2) say. Drag the blue point in the trace-determinant plane. Its trace moves the diagonal entries and its determinant moves one off-diagonal entry. Cross the T axis to the left and the spiral turns stable. Stop on T = 0 and it becomes a center. Cross the parabola and the dashed eigenvector lines appear. Drop below D = 0 for a saddle."}
\`\`\``,
          resources: [
            lebl('The section on the phase plane and the two-dimensional classification.'),
            paul('PhasePlane', 'Phase Plane', 'Sketches for each type.'),
            mit1803('The unit on linear systems, with its interactive mathlets on phase portraits.'),
          ],
          exercises: [
            {
              slug: 'classify-six-matrices',
              title: 'Classify six matrices',
              prompt: `Classify the origin for each matrix (written by rows), and state its stability. (a) $(1, 2; 3, 4)$. (b) $(-2, 1; 1, -2)$. (c) $(0, 1; -4, 0)$. (d) $(1, -1; 5, -3)$. (e) $(2, 1; -1, 2)$. (f) $(-3, 1; -1, -1)$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'parameter-sweep',
              title: 'A parameter sweep',
              prompt: `For $A = \\begin{pmatrix} a & 1 \\\\ -1 & a \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & a \\\\ 1 & -1 \\end{pmatrix}$, find how the type of the origin depends on the real parameter $a$. Mark the values at which the type changes, and draw a path in the trace-determinant plane.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'portrait-code',
              title: 'Draw portraits in code',
              prompt: `Write a Python function that takes a $2 \\times 2$ matrix, prints its classification, and draws a streamplot with eigenvector lines when they are real. Test it on one matrix of each type in the table. Compare the output with a hand sketch for the worked example, including the rotation direction.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'slow-direction',
              title: 'The slow direction',
              prompt: `For $A = \\begin{pmatrix} -1 & 0 \\\\ 0 & -4 \\end{pmatrix}$, eliminate $t$ from the solution with $x(0) = (a, b)$ with $a, b \\ne 0$, and show that the orbit is a curve $x_2 = Cx_1^4$. Which axis are the orbits tangent to at the origin, and what eigenvalue does it go with? Explain why this matches the rule in the lesson.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give the condition on $T$ and $D$ for all solutions to tend to 0.',
              answerOutline: '$T < 0$ and $D > 0$.',
            },
            {
              question: 'How do you find the sense of rotation?',
              answerOutline: 'Evaluate $Ax$ at a test point such as $(1, 0)$, and see whether the velocity turns counterclockwise or clockwise.',
            },
            {
              question: 'Where does an underdamped oscillator sit in the trace-determinant plane?',
              answerOutline: 'At $T = -c/m < 0$ and $D = k/m > 0$ under the parabola $T^2 = 4D$, the stable spiral region.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/systems-of-odes-and-phase-plane'],
        },
        {
          slug: 'nonlinear-stability',
          title: 'A first look at non-linear stability',
          summary:
            'Find equilibria, linearise with the Jacobian, and read off the local picture. Then see where linearisation cannot decide.',
          estimatedMinutes: 120,
          objectives: [
            'Find the equilibria of a planar non-linear system',
            'Compute the Jacobian and classify each equilibrium by linearisation',
            'Say when linearisation is conclusive and when it is not',
            'Assemble local information into a global sketch with numerical help',
          ],
          concepts: [
            'Autonomous system',
            'Equilibrium point',
            'Jacobian matrix',
            'Linearisation',
            'Hyperbolic equilibrium',
            'Separatrix',
            'Competitive exclusion',
          ],
          explanation: `For an autonomous system $x' = f(x, y)$, $y' = g(x, y)$, an **equilibrium** is a point where $f = g = 0$. Near one, say $(x_0, y_0)$, Taylor's theorem gives a linear approximation. With $u = x - x_0$ and $v = y - y_0$,

$$\\begin{pmatrix} u \\\\ v \\end{pmatrix}' \\approx J\\begin{pmatrix} u \\\\ v \\end{pmatrix}, \\qquad J = \\begin{pmatrix} f_x & f_y \\\\ g_x & g_y \\end{pmatrix}_{(x_0, y_0)}.$$

$J$ is the **Jacobian**. If **no eigenvalue of $J$ has zero real part**, the equilibrium is **hyperbolic**, and the non-linear system looks qualitatively like its linearisation nearby: a saddle stays a saddle, a stable node or spiral stays stable, an unstable one stays unstable. If some eigenvalue has zero real part, linearisation does not decide. In particular, a linear center may become a spiral in either direction.

**Worked example.** Two species compete:

$$x' = x(3 - x - 2y), \\qquad y' = y(2 - x - y), \\qquad x, y \\geq 0.$$

Equilibria: $x = 0$ or $x + 2y = 3$, together with $y = 0$ or $x + y = 2$. That gives $(0, 0)$, $(0, 2)$, $(3, 0)$ and $(1, 1)$. The Jacobian is

$$J = \\begin{pmatrix} 3 - 2x - 2y & -2x \\\\ -y & 2 - x - 2y \\end{pmatrix}.$$

At each point:

- $(0, 0)$: $J = \\text{diag}(3, 2)$, an unstable node.
- $(3, 0)$: $J = \\begin{pmatrix} -3 & -6 \\\\ 0 & -1 \\end{pmatrix}$, eigenvalues $-3, -1$, a stable node.
- $(0, 2)$: $J = \\begin{pmatrix} -1 & 0 \\\\ -2 & -2 \\end{pmatrix}$, eigenvalues $-1, -2$, a stable node.
- $(1, 1)$: $J = \\begin{pmatrix} -1 & -2 \\\\ -1 & -1 \\end{pmatrix}$, $\\det J = -1 < 0$, a saddle.

The picture is **competitive exclusion**: one species always wins, and which one depends on where you start. The stable curve of the saddle at $(1, 1)$, called a **separatrix**, divides the quadrant into the two basins of attraction. Starting at $(1.5, 1)$ leads to $(3, 0)$, and starting at $(1, 1.5)$ leads to $(0, 2)$.

\`\`\`interactive
phase-portrait
{"title": "Competing species", "mode": "nonlinear", "f": "x*(3 - x - 2*y)", "g": "y*(2 - x - y)", "view": [-0.3, 3.5, -0.3, 2.8], "starts": [[1.5, 1], [1, 1.5]], "probe": [2.5, 2.2], "caption": "The four equilibria are found numerically and classified from their Jacobians, which match the list above. The blue trajectories start at (1.5, 1) and (1, 1.5), on either side of the purple separatrix through the saddle (1, 1). One ends at (3, 0) and the other at (0, 2). Drag the red probe across the separatrix and watch the winner change. In the trace-determinant panel, point 3 lies below the T axis, the saddle region, and the stable nodes lie to the left under the parabola."}
\`\`\`

Linearisation failing looks like this. Consider

$$x' = -y + x(x^2 + y^2), \\qquad y' = x + y(x^2 + y^2).$$

At the origin $J = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, a center. But with $r^2 = x^2 + y^2$, we get $rr' = xx' + yy' = r^4$, so $r' = r^3 > 0$, and solutions spiral **out**. Changing the sign of the cubic terms makes them spiral in. The linear part cannot see the difference.

\`\`\`interactive
phase-portrait
{"title": "When linearisation cannot decide", "mode": "nonlinear", "f": "-y + s*x*(x^2 + y^2)", "g": "x + s*y*(x^2 + y^2)", "sliders": {"s": [1, -1, 1, 0.05]}, "view": [-1.5, 1.5, -1.5, 1.5], "starts": [[0.5, 0]], "probe": [0.25, 0.25], "eigen": false, "traceDet": false, "caption": "With s = 1 this is the system above. Its Jacobian at the origin has eigenvalues ±i for every s, and the table reports a center that linearisation cannot decide. The trajectories show the truth: with s > 0 they spiral out (r′ = s r³), with s < 0 they spiral in, and only at s = 0 are they closed circles."}
\`\`\`

When the linear test is inconclusive, look for a conserved quantity or a function that decreases along solutions. You will see those tools in \`ode-theory\`. In practice, combine the local analysis with a numerical integration from a grid of starting points.`,
          resources: [
            lebl('The chapter on non-linear systems, on linearisation and stability.'),
            solveIvp('Use this to integrate from many starting points and draw the global picture.'),
            { title: 'Nonlinear Dynamics and Chaos: Steven Strogatz, Cornell University', url: 'https://www.youtube.com/playlist?list=PLbN57C5Zdl6j_qJA-pARJnKsmROzPnO9V', type: 'lecture', cost: 'free', provider: 'Cornell University', note: 'The lectures on two-dimensional systems make a good extension after this lesson.' },
          ],
          exercises: [
            {
              slug: 'pendulum-equilibria',
              title: 'The pendulum',
              prompt: `The damped pendulum is $\\theta' = \\omega$, $\\omega' = -\\sin\\theta - b\\omega$ with $b > 0$. Find the equilibria, compute the Jacobian, and classify $(0, 0)$ and $(\\pi, 0)$. For what $b$ is the hanging equilibrium a spiral? What happens to your conclusion when $b = 0$?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'lotka-volterra-center',
              title: 'Predator and prey',
              prompt: `For $x' = x(1 - y)$, $y' = y(x - 1)$, classify the equilibria by linearisation, and note what is inconclusive. Show that $H(x, y) = x - \\ln x + y - \\ln y$ is constant on solutions with $x, y > 0$, and deduce that orbits near $(1, 1)$ are closed curves.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'competition-basins',
              title: 'Map the basins of attraction',
              prompt: `For the competition model in the lesson, integrate from a grid of 400 starting points in $[0.05, 4]^2$ using \`solve_ivp\`, and colour each by its final state. Estimate the separatrix, and check that it passes through $(1, 1)$. Also find the eigenvector of the stable direction at $(1, 1)$ and check that it is tangent to your numerical boundary.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'center-either-way',
              title: 'A center that goes either way',
              prompt: `For $x' = -y + \\mu x(x^2 + y^2)$, $y' = x + \\mu y(x^2 + y^2)$, derive $r' = \\mu r^3$ and solve it. For $\\mu = 1$ find the blow-up time from $r(0) = r_0$. For $\\mu = -1$ find the rate at which $r$ tends to 0, and contrast it with exponential decay. Confirm both numerically.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the Jacobian, and why does it describe local behaviour?',
              answerOutline: 'The matrix of first partial derivatives. It gives the first-order Taylor approximation of the vector field at the equilibrium.',
            },
            {
              question: 'When is linearisation inconclusive?',
              answerOutline: 'When some eigenvalue of the Jacobian has zero real part, such as a linear center.',
            },
            {
              question: 'What is a separatrix in the competition model?',
              answerOutline: 'The stable curve of the saddle. It separates initial conditions by which species wins.',
            },
          ],
        },
      ],
      project: {
        slug: 'phase-plane-explorer',
        title: 'Phase plane explorer',
        description: `Build a tool that takes a planar system, given as Python functions or SymPy expressions, and produces a full report: equilibria, Jacobians, classifications and a global phase portrait. Apply it to a non-linear model that interests you, such as an epidemic with births, a chemical reaction, two competing products or a pendulum with torque.`,
        deliverables: [
          'A function that finds equilibria with SymPy or by numerical root-finding from a grid of guesses',
          'Automatic classification from Jacobian eigenvalues, flagging the non-hyperbolic cases as undecided',
          'A portrait with a streamplot, nullclines, equilibria and sample orbits from `solve_ivp`',
          'Tests on the competition model and the Lotka-Volterra model with the expected answers',
          'A two-page write-up of your chosen model: what the phase portrait means in the terms of that model',
        ],
        estimatedHours: 9,
      },
    },
    {
      slug: 'fourier-and-boundary-value-problems',
      title: 'Fourier Series and Boundary Value Problems',
      description:
        'Boundary conditions pick out special frequencies, and those frequencies are the building blocks of general functions.',
      lessons: [
        {
          slug: 'two-point-eigenvalue-problems',
          title: 'Two-point boundary value problems',
          summary:
            'Conditions at two ends behave very differently from initial conditions, and they produce eigenvalues.',
          estimatedMinutes: 100,
          objectives: [
            'Show by example that a boundary value problem may have no solution, one or infinitely many',
            'Solve $y\'\' + \\lambda y = 0$ with Dirichlet, Neumann and mixed conditions',
            'Handle the cases $\\lambda < 0$, $\\lambda = 0$ and $\\lambda > 0$ systematically',
            'Prove orthogonality of eigenfunctions',
          ],
          concepts: [
            'Boundary value problem',
            'Dirichlet and Neumann conditions',
            'Eigenvalue and eigenfunction',
            'Case analysis on the sign of $\\lambda$',
            'Orthogonality of eigenfunctions',
          ],
          explanation: `An initial value problem for a linear equation always has a unique solution. A **boundary value problem**, with conditions at two different points, need not. Take $y'' + y = 0$, whose solutions are $y = c_1\\cos x + c_2\\sin x$. With $y(0) = 0$ we have $c_1 = 0$, and then:

- $y(\\pi/2) = 1$ gives $c_2 = 1$: one solution.
- $y(\\pi) = 1$ requires $0 = 1$: no solution.
- $y(\\pi) = 0$ holds for every $c_2$: infinitely many solutions.

This last case is the useful one. For the problem

$$y'' + \\lambda y = 0, \\qquad y(0) = 0, \\quad y(L) = 0,$$

$y \\equiv 0$ always works. The values of $\\lambda$ that allow a non-zero solution are the **eigenvalues**, and those solutions are the **eigenfunctions**, just as for a matrix. Here is the systematic procedure.

**Case $\\lambda < 0$.** Write $\\lambda = -\\mu^2$. Then $y = c_1\\cosh\\mu x + c_2\\sinh\\mu x$, and $y(0) = 0$ gives $c_1 = 0$. Then $c_2\\sinh\\mu L = 0$ with $\\sinh\\mu L \\neq 0$ gives $c_2 = 0$. No eigenvalues.

**Case $\\lambda = 0$.** Then $y = c_1 + c_2 x$, and both conditions give $y \\equiv 0$. No eigenvalue.

**Case $\\lambda > 0$.** Write $\\lambda = \\beta^2$ with $\\beta > 0$. Then $y = c_1\\cos\\beta x + c_2\\sin\\beta x$, and $y(0) = 0$ gives $c_1 = 0$. The other condition gives $\\sin\\beta L = 0$, so $\\beta = n\\pi/L$:

$$\\lambda_n = \\left(\\frac{n\\pi}{L}\\right)^2, \\qquad y_n = \\sin\\frac{n\\pi x}{L}, \\qquad n = 1, 2, 3, \\dots$$

**Worked example.** Solve the mixed problem $y'' + \\lambda y = 0$, $y(0) = 0$, $y'(L) = 0$.

The negative case: $y = c_2\\sinh\\mu x$, and $y'(L) = c_2\\mu\\cosh\\mu L = 0$ forces $c_2 = 0$. For $\\lambda = 0$: $y = c_2 x$, so $y' = c_2 = 0$. For $\\lambda = \\beta^2 > 0$: $y = c_2\\sin\\beta x$ and

$$y'(L) = c_2\\beta\\cos\\beta L = 0.$$

So $\\beta L = (n - \\frac12)\\pi$, which gives

$$\\lambda_n = \\left(\\frac{(2n - 1)\\pi}{2L}\\right)^2, \\qquad y_n = \\sin\\frac{(2n - 1)\\pi x}{2L}, \\qquad n = 1, 2, \\dots$$

The first eigenfunction is a quarter sine wave: it rises from 0 to a flat top at $x = L$.

Check with $n = 1$: $y = \\sin(\\pi x/2L)$ has $y(0) = 0$, $y' = (\\pi/2L)\\cos(\\pi x/2L)$, which vanishes at $x = L$, and $y'' = -(\\pi/2L)^2 y$.

These eigenfunctions are **orthogonal**. If $y_m'' = -\\lambda_m y_m$ and $y_n'' = -\\lambda_n y_n$, then multiplying crosswise, subtracting and integrating by parts gives

$$(\\lambda_m - \\lambda_n)\\int_0^L y_m y_n\\,dx = \\Big[y_m y_n' - y_m' y_n\\Big]_0^L = 0$$

whenever the boundary conditions make the bracket vanish. That is the property behind Fourier series, which come next.

You can find the eigenvalues by shooting. Start every solution with $y(0) = 0$, $y'(0) = 1$, and vary $\\lambda$ until the condition at $x = L$ also holds.

\`\`\`interactive
bvp-shooting
{"title": "Shooting for the eigenvalues of y'' + λy = 0", "L": "pi", "right": "neumann", "lambda": 0.6, "caption": "Here L = π and the right-end condition is y′(π) = 0, as in the worked example. Slide λ: the curve sin(√λ x)/√λ is level at x = π only when λ = ((2n − 1)/2)², that is 0.25, 2.25, 6.25 and so on. These are the zeros of the lower plot. Use the eigenvalue buttons to land on them exactly. For λ ≤ 0 the curve never turns back, so nothing can be hit. Switch to y(π) = 0 and the eigenvalues become n² = 1, 4, 9, …"}
\`\`\``,
          resources: [
            lebl('The section on boundary value problems at the start of the Fourier series chapter.'),
            paul('BoundaryValueProblem', 'Boundary Value Problems', 'Examples with no solution, one and many.'),
            paul('BVPEvals', 'Eigenvalues and Eigenfunctions', 'The case analysis written out for several boundary conditions.'),
          ],
          exercises: [
            {
              slug: 'how-many-solutions',
              title: 'How many solutions?',
              prompt: `For $y'' + 4y = 0$, $y(0) = 0$, decide how many solutions there are with each second condition, and find them: (a) $y(\\pi) = 0$; (b) $y(\\pi) = 1$; (c) $y(\\pi/4) = 1$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'neumann-eigenvalues',
              title: 'Neumann eigenvalues',
              prompt: `Find all eigenvalues and eigenfunctions of $y'' + \\lambda y = 0$, $y'(0) = 0$, $y'(L) = 0$, treating all three cases. Note the eigenvalue $\\lambda = 0$, and say what it means physically for heat in a rod with insulated ends.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'periodic-eigenvalues',
              title: 'Periodic conditions',
              prompt: `Solve $y'' + \\lambda y = 0$ on $[-L, L]$ with $y(-L) = y(L)$ and $y'(-L) = y'(L)$. Show that each eigenvalue $\\lambda_n = (n\\pi/L)^2$ with $n \\geq 1$ has two independent eigenfunctions. Explain how this differs from the Dirichlet problem.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'robin-eigenvalues-numerical',
              title: 'Eigenvalues from a transcendental equation',
              prompt: `For $y'' + \\lambda y = 0$, $y(0) = 0$, $y(1) + y'(1) = 0$, show that there are no eigenvalues $\\lambda \\leq 0$, and that $\\lambda = \\beta^2$ is an eigenvalue exactly when $\\tan\\beta = -\\beta$ with $\\beta > 0$. Find the first three $\\beta$ to four decimal places with \`scipy.optimize.brentq\`. Draw $y = \\tan\\beta$ and $y = -\\beta$ to justify your search brackets.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the existence and uniqueness theorem for initial value problems not apply here?',
              answerOutline: 'It needs both pieces of data at one point. Conditions at two points are a different kind of problem.',
            },
            {
              question: 'What makes $\\lambda$ an eigenvalue of a boundary value problem?',
              answerOutline: 'The problem with that $\\lambda$ has a solution that is not identically zero.',
            },
            {
              question: 'Why must each sign of $\\lambda$ be tested?',
              answerOutline: 'The form of the solution differs in each case, and eigenvalues can appear in any of them, such as $\\lambda = 0$ for Neumann conditions.',
            },
          ],
        },
        {
          slug: 'fourier-series',
          title: 'Fourier series',
          summary:
            'Write a periodic function as a sum of sines and cosines, and compute coefficients from orthogonality.',
          estimatedMinutes: 110,
          objectives: [
            'State the orthogonality relations on $[-L, L]$',
            'Derive and apply the coefficient formulas',
            'Compute the Fourier series of piecewise functions by hand',
            'Plot partial sums and describe how they approach the function',
          ],
          concepts: [
            'Periodic function',
            'Trigonometric series',
            'Orthogonality relations',
            'Fourier coefficients',
            'Partial sums',
            'Inner product of functions',
          ],
          explanation: `In 1807 Fourier claimed that an arbitrary function on an interval can be written as a sum of sines and cosines. For a function $f$ with period $2L$, the **Fourier series** is

$$f(x) \\sim \\frac{a_0}{2} + \\sum_{n=1}^\\infty\\left(a_n\\cos\\frac{n\\pi x}{L} + b_n\\sin\\frac{n\\pi x}{L}\\right).$$

The symbol $\\sim$ is used because we have not yet said in what sense the series converges. That is the subject of a later lesson.

The coefficients come from **orthogonality**. Define $\\langle f, g\\rangle = \\int_{-L}^L f(x)g(x)\\,dx$, which plays the role of a dot product. Then for integers $m, n \\geq 1$,

$$\\left\\langle\\cos\\tfrac{m\\pi x}{L}, \\sin\\tfrac{n\\pi x}{L}\\right\\rangle = 0, \\qquad \\left\\langle\\cos\\tfrac{m\\pi x}{L}, \\cos\\tfrac{n\\pi x}{L}\\right\\rangle = \\left\\langle\\sin\\tfrac{m\\pi x}{L}, \\sin\\tfrac{n\\pi x}{L}\\right\\rangle = L\\,\\delta_{mn}.$$

Here $\\delta_{mn}$ is 1 if $m = n$ and 0 otherwise. These follow from product-to-sum identities, or from the last lesson's orthogonality argument with periodic conditions.

To extract $a_m$, multiply the series by $\\cos(m\\pi x/L)$ and integrate. Every term dies except one, just like finding the component of a vector along an orthogonal basis vector. This gives

$$a_n = \\frac{1}{L}\\int_{-L}^L f(x)\\cos\\frac{n\\pi x}{L}\\,dx, \\qquad b_n = \\frac{1}{L}\\int_{-L}^L f(x)\\sin\\frac{n\\pi x}{L}\\,dx.$$

The $a_n$ formula also works for $n = 0$, which is why the constant term is written $a_0/2$. That term is the average of $f$ over one period.

**Worked example.** Let $f$ have period $2\\pi$ with $f(x) = -1$ on $(-\\pi, 0)$ and $f(x) = 1$ on $(0, \\pi)$.

Here $L = \\pi$. Since $f$ is odd and cosine is even, $f\\cos nx$ is odd, so every $a_n = 0$, including $a_0$. Since $f\\sin nx$ is even,

$$b_n = \\frac{2}{\\pi}\\int_0^\\pi \\sin nx\\,dx = \\frac{2}{\\pi}\\cdot\\frac{1 - \\cos n\\pi}{n} = \\frac{2(1 - (-1)^n)}{n\\pi}.$$

So $b_n = 0$ for even $n$, and $b_n = \\frac{4}{n\\pi}$ for odd $n$:

$$f(x) \\sim \\frac{4}{\\pi}\\left(\\sin x + \\frac{\\sin 3x}{3} + \\frac{\\sin 5x}{5} + \\dots\\right).$$

The value $(-1)^n$ for $\\cos n\\pi$ is used constantly. Plot partial sums of this series and watch the corners sharpen as terms are added, with a persistent overshoot near each jump. The interactive below does exactly that.

\`\`\`interactive
fourier-series
{"title": "Fourier partial sums on (−π, π)", "preset": "square", "L": "pi", "N": 5, "Nmax": 60, "caption": "The square wave of the worked example. Its bars are b_n = 4/(nπ) for odd n and 0 for even n, and every a_n is 0 because f is odd. The green note compares these numerically computed coefficients with the closed form. Raise N: the corners sharpen, but the overshoot next to each jump stays near 0.18. Switch to |x| and only cosine terms appear, since |x| is even. The sawtooth has a jump at ±π, created by its periodic extension even though x itself is smooth."}
\`\`\`

If you have a function defined only on $(-L, L)$, the series represents its **periodic extension**, so jumps can arise at $\\pm L$ even if $f$ is smooth. For a piecewise definition, split the integral at the breakpoints. When possible, use symmetry first. It can save half the work.`,
          resources: [
            lebl('The section on the trigonometric series and on computing Fourier coefficients.'),
            paul('FourierSeries', 'Fourier Series', 'Full calculations, including the piecewise case.'),
            threeBlue('fourier-series', 'But what is a Fourier series?', 'A visual treatment using rotating vectors, and the link with heat flow.'),
          ],
          exercises: [
            {
              slug: 'sawtooth-series',
              title: 'A sawtooth',
              prompt: `Find the Fourier series of the function with period $2\\pi$ equal to $x$ on $(-\\pi, \\pi)$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'triangle-series',
              title: 'A triangle wave',
              prompt: `Find the Fourier series of the function with period $2\\pi$ equal to $|x|$ on $[-\\pi, \\pi]$. Compare the decay of its coefficients with that of the square wave, and relate it to the smoothness of each function.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'parabola-series',
              title: 'General period',
              prompt: `Find the Fourier series of $f(x) = x^2$ on $(-L, L)$, extended with period $2L$. Show that $a_0 = 2L^2/3$ and $a_n = 4L^2(-1)^n/(n^2\\pi^2)$ for $n \\geq 1$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'piecewise-half-ramp',
              title: 'A half ramp',
              prompt: `Find the Fourier series of the function with period 2 given by $f(x) = 0$ on $(-1, 0)$ and $f(x) = x$ on $(0, 1)$. Note that neither symmetry helps, so both families of coefficients are present.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'partial-sum-plots',
              title: 'Partial sum plots',
              prompt: `Write a Python function that computes Fourier coefficients numerically with \`scipy.integrate.quad\` for any function on $[-L, L]$. Check it against your answers for the sawtooth and the triangle wave. Plot partial sums with $N = 1, 5, 25, 125$ and report the maximum error on $[-3, 3]$ in each case.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the constant term written as $a_0/2$?',
              answerOutline: 'So that the cosine formula for $a_n$ also gives $a_0$. The norm of the constant 1 is $2L$, twice that of the cosines.',
            },
            {
              question: 'What does orthogonality do in the derivation of the coefficients?',
              answerOutline: 'After multiplying by a basis function and integrating, all terms but one vanish.',
            },
            {
              question: 'What symmetry makes all $a_n$ vanish, and what makes all $b_n$ vanish?',
              answerOutline: 'An odd $f$ gives $a_n = 0$. An even $f$ gives $b_n = 0$.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-series'],
        },
        {
          slug: 'sine-and-cosine-series',
          title: 'Sine and cosine series',
          summary:
            'A function on $[0, L]$ can be extended oddly or evenly, which gives the series you need for boundary value problems.',
          estimatedMinutes: 100,
          objectives: [
            'Use even and odd symmetry to simplify coefficient integrals',
            'Construct the odd and even periodic extensions of a function on $[0, L]$',
            'Compute Fourier sine and cosine series',
            'Choose the right series for given boundary conditions',
          ],
          concepts: [
            'Even and odd functions',
            'Odd periodic extension',
            'Even periodic extension',
            'Fourier sine series',
            'Fourier cosine series',
          ],
          explanation: `A boundary value problem on $[0, L]$ gives you data on that interval only, and you are free to extend it to $[-L, L]$ however you like. Two extensions are especially useful.

The **odd extension** sets $f(-x) = -f(x)$. Since it is odd, all cosine terms vanish, leaving the **Fourier sine series**:

$$f(x) \\sim \\sum_{n=1}^\\infty b_n\\sin\\frac{n\\pi x}{L}, \\qquad b_n = \\frac{2}{L}\\int_0^L f(x)\\sin\\frac{n\\pi x}{L}\\,dx.$$

The **even extension** sets $f(-x) = f(x)$, which leaves the **Fourier cosine series**:

$$f(x) \\sim \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n\\cos\\frac{n\\pi x}{L}, \\qquad a_n = \\frac{2}{L}\\int_0^L f(x)\\cos\\frac{n\\pi x}{L}\\,dx.$$

The factor is $2/L$, because the integrand is even on $[-L, L]$, so the full integral is twice the integral on $[0, L]$. Both series represent the same $f$ on $(0, L)$, wherever they converge to it, but they differ outside.

Which series do you use? The one whose terms obey your boundary conditions. Sines vanish at $0$ and $L$, so they suit $y(0) = y(L) = 0$. Cosines have zero slope at both ends, so they suit $y'(0) = y'(L) = 0$.

**Worked example.** Let $f(x) = x$ on $(0, L)$.

For the sine series, integrate by parts:

$$b_n = \\frac{2}{L}\\int_0^L x\\sin\\frac{n\\pi x}{L}\\,dx = \\frac{2}{L}\\left[-\\frac{xL}{n\\pi}\\cos\\frac{n\\pi x}{L}\\right]_0^L + \\frac{2}{n\\pi}\\int_0^L\\cos\\frac{n\\pi x}{L}\\,dx.$$

The last integral is zero. The bracket gives $-\\frac{2L}{n\\pi}\\cos n\\pi$, so

$$x \\sim \\frac{2L}{\\pi}\\sum_{n=1}^\\infty\\frac{(-1)^{n+1}}{n}\\sin\\frac{n\\pi x}{L}.$$

For the cosine series, $a_0 = \\frac{2}{L}\\int_0^L x\\,dx = L$, and for $n \\geq 1$,

$$a_n = \\frac{2}{L}\\int_0^L x\\cos\\frac{n\\pi x}{L}\\,dx = \\frac{2L}{n^2\\pi^2}((-1)^n - 1).$$

This vanishes for even $n$, and equals $-\\frac{4L}{n^2\\pi^2}$ for odd $n$:

$$x \\sim \\frac{L}{2} - \\frac{4L}{\\pi^2}\\sum_{n\\text{ odd}}\\frac{1}{n^2}\\cos\\frac{n\\pi x}{L}.$$

Compare them. The odd extension of $x$ is a sawtooth with jumps at $\\pm L$, so its coefficients decay like $1/n$. The even extension is the continuous triangle wave $|x|$, so its coefficients decay like $1/n^2$. The cosine series therefore converges faster here. At $x = L$, the sine series gives 0, the average of the jump from $L$ to $-L$, not $f(L) = L$.

\`\`\`interactive
fourier-series
{"title": "Sine and cosine series of f(x) = x on (0, L)", "mode": "sine", "modes": ["sine", "cosine"], "preset": "sawtooth", "L": 1, "N": 6, "Nmax": 60, "caption": "Here L = 1. In the sine series the odd extension of x is a sawtooth, and the partial sums pass through 0 at x = L, the midpoint of the jump. Switch to the cosine series: the even extension is the triangle wave |x|, and with the same N it already hugs the line. Turn on the log-log scale. The sine coefficients follow the slope −1 line (1/n), and the cosine ones the slope −2 line (1/n²). Try the other shapes too: x(L − x) vanishes at both ends, so its sine series converges fastest."}
\`\`\`

Handy facts about symmetry: the product of two even or two odd functions is even, an even times an odd is odd, and an odd function integrates to zero on a symmetric interval. Any function is the sum of its even part $\\frac12(f(x) + f(-x))$ and its odd part $\\frac12(f(x) - f(-x))$. The cosine terms of its Fourier series represent the first, and the sine terms the second.`,
          resources: [
            lebl('The section on sine and cosine series.'),
            paul('FourierSineSeries', 'Fourier Sine Series', 'Odd extension, with several calculations.'),
            paul('FourierCosineSeries', 'Fourier Cosine Series', 'Even extension, with several calculations.'),
          ],
          exercises: [
            {
              slug: 'sine-series-constant',
              title: 'Sine series of a constant',
              prompt: `Find the Fourier sine series of $f(x) = 1$ on $(0, L)$. Sketch its odd periodic extension. To what value does the series converge at $x = 0$ and at $x = L/2$?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'sine-series-parabola',
              title: 'Sine series of a parabola',
              prompt: `Find the Fourier sine series of $f(x) = x(L - x)$ on $(0, L)$. How fast do the coefficients decay, and why is this faster than for $f(x) = x$?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cross-series',
              title: 'Sine as cosines and cosine as sines',
              prompt: `On $(0, \\pi)$, find (a) the cosine series of $\\sin x$, and (b) the sine series of $\\cos x$. In (b), treat $n = 1$ separately. Sketch each extension.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Use $2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)$.',
            },
            {
              slug: 'odd-even-decomposition',
              title: 'Even and odd parts',
              prompt: `Find the even and odd parts of $e^x$ on $(-\\pi, \\pi)$, and explain how they relate to $\\cosh$ and $\\sinh$. Show that the odd part and the even part are orthogonal on the symmetric interval. Compute the Fourier cosine coefficient $a_1$ of $e^x$ on $(-\\pi, \\pi)$, both directly and using the even part only.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are the coefficient formulas on $[0, L]$ multiplied by $2/L$, not $1/L$?',
              answerOutline: 'The product of $f$ extended and the basis function is even, so the integral on $[-L, L]$ is twice that on $[0, L]$.',
            },
            {
              question: 'Which series would you use for a rod with insulated ends?',
              answerOutline: 'The cosine series, because cosines have zero derivative at both ends.',
            },
            {
              question: 'Why does the cosine series of $x$ converge faster than the sine series?',
              answerOutline: 'Its even extension is continuous, whereas the odd extension has jumps.',
            },
          ],
        },
        {
          slug: 'convergence-of-fourier-series',
          title: 'Convergence of Fourier series',
          summary:
            'What a Fourier series converges to, where it overshoots, when you may differentiate it, and how Parseval turns it into a machine for summing series.',
          estimatedMinutes: 110,
          objectives: [
            'State the pointwise convergence theorem with its hypotheses',
            'Describe the Gibbs phenomenon',
            'Relate smoothness to the rate of decay of coefficients',
            'Use Parseval\'s identity and point evaluation to sum numerical series',
            'Say when term-by-term differentiation is legitimate',
          ],
          concepts: [
            'Piecewise smooth function',
            'Convergence to the average at a jump',
            'Gibbs phenomenon',
            'Uniform convergence',
            'Parseval\'s identity',
            'Term-by-term differentiation',
          ],
          explanation: `A function $f$ is **piecewise smooth** if $f$ and $f'$ are continuous except at finitely many points in each period, with finite one-sided limits there.

**Theorem.** If $f$ has period $2L$ and is piecewise smooth, its Fourier series converges at every $x$ to

$$\\frac{f(x^+) + f(x^-)}{2}.$$

So it converges to $f(x)$ at points of continuity, and to the midpoint of the jump at a discontinuity. Note that the value of $f$ at a jump plays no part.

If $f$ is also continuous everywhere, including across the period boundary, the convergence is uniform. It cannot be uniform if $f$ has a jump, because a uniform limit of continuous functions is continuous. Partial sums near a jump overshoot, and the overshoot does not shrink as $N$ grows. It only moves closer to the jump. This is the **Gibbs phenomenon**: the peak overshoot tends to about 8.95% of the size of the jump. For the square wave with values $\\pm 1$, the partial sums peak near $1.179$.

Smoothness controls decay. A jump gives coefficients of order $1/n$. A continuous $f$ with a jump in $f'$ gives order $1/n^2$. Each further continuous derivative of the periodic extension improves this by one power of $n$.

\`\`\`interactive
fourier-series
{"title": "Convergence, Gibbs and Parseval", "preset": "square", "L": "pi", "N": 25, "Nmax": 150, "parseval": true, "caption": "For the ±1 square wave the peak of S_N stays near 1.179 however large N is: the overshoot is about 8.95% of the jump of 2. It only moves closer to the jump. At the jumps themselves the partial sums pass through the hollow midpoints. Switch to the continuous triangle or |x| and the readout becomes the maximum error, which shrinks steadily: that is uniform convergence. On the log-log scale the jump gives 1/n coefficients and the corners give 1/n². The last readouts check Parseval's identity: the sum of squares climbs towards (1/L)∫f²."}
\`\`\`

**Term-by-term differentiation** is not automatic. The sawtooth series $2\\sum (-1)^{n+1}\\sin(nx)/n$ for $x$ on $(-\\pi, \\pi)$ differentiates to $2\\sum (-1)^{n+1}\\cos nx$, which diverges, since its terms do not tend to 0. It is valid if $f$ is continuous and periodic and $f'$ is piecewise smooth. Integrating term by term is safer, and is allowed for any piecewise smooth $f$.

**Parseval's identity** says that for piecewise smooth $f$ with period $2L$,

$$\\frac{1}{L}\\int_{-L}^L f(x)^2\\,dx = \\frac{a_0^2}{2} + \\sum_{n=1}^\\infty(a_n^2 + b_n^2).$$

It says that energy in $x$ equals the sum of the energy in each frequency, a Pythagorean theorem in infinitely many dimensions.

**Worked example.** Find $\\sum_{n=1}^\\infty 1/n^2$.

For $f(x) = x$ on $(-\\pi, \\pi)$, we have $a_n = 0$ and $b_n = 2(-1)^{n+1}/n$. The left side of Parseval is

$$\\frac{1}{\\pi}\\int_{-\\pi}^\\pi x^2\\,dx = \\frac{2\\pi^2}{3},$$

and the right side is $\\sum 4/n^2$. Therefore

$$\\sum_{n=1}^\\infty\\frac{1}{n^2} = \\frac{\\pi^2}{6}.$$

Point evaluation gives other sums. The square wave series at $x = \\pi/2$ gives $\\frac{4}{\\pi}(1 - \\frac13 + \\frac15 - \\dots) = 1$, the Leibniz formula $\\pi/4$. This alternating series is only conditionally convergent, so the order of its terms matters, and here they appear in the order given by the Fourier series.

The theorems above have hypotheses for a good reason. There are continuous functions whose Fourier series diverge at some points. Piecewise smoothness rules that out.`,
          resources: [
            lebl('The section on further results about Fourier series, including convergence and differentiation.'),
            paul('ConvergenceFourierSeries', 'Convergence of Fourier Series', 'The theorem with examples at jumps.'),
          ],
          exercises: [
            {
              slug: 'values-at-points',
              title: 'What does the series converge to?',
              prompt: `The function $f$ has period 4 with $f(x) = 2$ on $(-2, 0)$ and $f(x) = x$ on $(0, 2)$, and $f(0) = 5$. State the value the Fourier series converges to at $x = 0, 1, 2$ and $3$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'odd-squares-sum',
              title: 'Two sums from one series',
              prompt: `Use the triangle wave series for $|x|$ on $[-\\pi, \\pi]$. Evaluate at $x = 0$ to find $\\sum_{k=0}^\\infty \\frac{1}{(2k + 1)^2}$. Use Parseval to find $\\sum_{k=0}^\\infty \\frac{1}{(2k + 1)^4}$. Justify that the convergence theorem applies at $x = 0$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'measure-gibbs',
              title: 'Measure the Gibbs overshoot',
              prompt: `Compute the partial sums of the square wave with $N = 10, 100, 1000$ harmonics on a fine grid near $x = 0$. Find the maximum value and the location of the first peak. Show that the height approaches $\\frac{2}{\\pi}\\int_0^\\pi \\frac{\\sin t}{t}\\,dt \\approx 1.179$ and that the location is about $\\pi/(2N)$ when the sum includes the odd terms up to $2N - 1$.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'differentiate-series',
              title: 'Differentiate and integrate',
              prompt: `Start from the triangle wave series for $|x|$. Differentiate it term by term and show that you get the square wave series. Why is this legitimate? Then integrate the sawtooth series for $x$ term by term from 0 to $x$, to find the series of $x^2$ on $(-\\pi, \\pi)$. Fix the constant using the average value. Compare with the exercise on general period.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'To what does a Fourier series converge at a jump?',
              answerOutline: 'The average of the left and right limits, regardless of $f$ at that point, provided $f$ is piecewise smooth.',
            },
            {
              question: 'Why can a Fourier series of a discontinuous function not converge uniformly?',
              answerOutline: 'Partial sums are continuous, and a uniform limit of continuous functions is continuous.',
            },
            {
              question: 'What does Parseval\'s identity express?',
              answerOutline: 'The mean square of $f$ equals the sum of squared coefficients, with the $a_0^2/2$ normalisation.',
            },
          ],
        },
      ],
    },
    {
      slug: 'introduction-to-pdes',
      title: 'Introduction to Partial Differential Equations',
      description:
        'Combine separation of variables, eigenvalue problems and Fourier series to solve the heat, wave and Laplace equations.',
      lessons: [
        {
          slug: 'heat-equation',
          title: 'The heat equation',
          summary:
            'Derive the equation for heat flow in a rod, separate variables, and expand the initial temperature in a sine series.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the one-dimensional heat equation from conservation of energy and Fourier\'s law',
            'Carry out separation of variables with Dirichlet conditions',
            'Solve an initial-boundary value problem by Fourier series',
            'Handle insulated ends and fixed non-zero end temperatures',
          ],
          concepts: [
            'Heat equation',
            'Diffusivity',
            'Separation of variables',
            'Superposition of modes',
            'Steady-state solution',
            'Decay rate of modes',
          ],
          explanation: `Consider a thin rod with temperature $u(x, t)$. The heat in a segment $[a, b]$ is proportional to $\\int_a^b u\\,dx$, and it changes only through flow at the ends. **Fourier's law** says that heat flows from hot to cold at a rate proportional to $-u_x$. Conservation of energy then gives, for every segment,

$$\\int_a^b u_t\\,dx = \\alpha\\,[u_x]_a^b = \\alpha\\int_a^b u_{xx}\\,dx,$$

so $u_t = \\alpha u_{xx}$, where $\\alpha > 0$ is the **thermal diffusivity**. Add the **initial condition** $u(x, 0) = f(x)$ and **boundary conditions**, for example $u(0, t) = u(L, t) = 0$.

**Separation of variables.** Look for solutions $u = X(x)T(t)$. Substituting and dividing gives

$$\\frac{T'}{\\alpha T} = \\frac{X''}{X} = -\\lambda.$$

The left side depends only on $t$, and the middle only on $x$, so both are a constant. Then $X'' + \\lambda X = 0$ with $X(0) = X(L) = 0$, which is the eigenvalue problem you already solved: $\\lambda_n = (n\\pi/L)^2$, $X_n = \\sin(n\\pi x/L)$. Next, $T' = -\\alpha\\lambda_n T$ gives $T_n = e^{-\\alpha\\lambda_n t}$.

The equation and boundary conditions are linear and homogeneous, so any sum of such products is a solution:

$$u(x, t) = \\sum_{n=1}^\\infty b_n e^{-\\alpha(n\\pi/L)^2 t}\\sin\\frac{n\\pi x}{L}.$$

At $t = 0$ this is the sine series of $f$. So the $b_n$ are the Fourier sine coefficients of $f$.

**Worked example.** Solve with $\\alpha = 1$, $L = \\pi$ and $f(x) = x(\\pi - x)$.

Integrating by parts twice gives

$$b_n = \\frac{2}{\\pi}\\int_0^\\pi x(\\pi - x)\\sin nx\\,dx = \\frac{4(1 - (-1)^n)}{\\pi n^3},$$

which is $\\frac{8}{\\pi n^3}$ for odd $n$ and 0 for even $n$. Hence

$$u(x, t) = \\frac{8}{\\pi}\\sum_{n\\text{ odd}}\\frac{1}{n^3}e^{-n^2 t}\\sin nx.$$

Each mode decays at its own rate, $e^{-n^2 t}$, so high frequencies vanish first, and $u$ quickly looks like a single sine bump. At $t = 1$ the $n = 3$ term is smaller than the first by a factor of $\\frac{1}{27}e^{-8} \\approx 1.2 \\times 10^{-5}$. The midpoint temperature is then about $\\frac{8}{\\pi}e^{-1} \\approx 0.937$.

\`\`\`interactive
heat-wave
{"title": "Heat equation on [0, π]", "equation": "heat", "L": "pi", "alpha": 1, "ic": "parabola", "N": 10, "tMax": 2, "caption": "The initial temperature is x(π − x), the worked example. Drag the time slider to t = 1 and the midpoint readout shows about 0.937. The bars are the decay factors e^(−n²t): by t = 0.1 the n = 10 factor is already e^(−10) ≈ 0.00005, while the first is 0.9. That is why the profile soon looks like a single sine bump. Choose the box shape: its corners vanish at once, because the high modes that build them die first. Sketch your own profile and press Play."}
\`\`\`

For **insulated ends**, $u_x(0, t) = u_x(L, t) = 0$, the same steps give cosines and

$$u = \\frac{a_0}{2} + \\sum_{n=1}^\\infty a_n e^{-\\alpha(n\\pi/L)^2 t}\\cos\\frac{n\\pi x}{L}.$$

The limit $a_0/2$ is the average of $f$, as conservation of heat demands.

For **fixed end temperatures** $u(0, t) = T_1$, $u(L, t) = T_2$, subtract the steady state $v(x) = T_1 + (T_2 - T_1)x/L$. Then $w = u - v$ satisfies the problem with zero boundary values, and you solve that with initial data $f - v$.`,
          resources: [
            lebl('The section on the heat equation, in the chapter on Fourier series and PDEs.'),
            paul('TheHeatEquation', 'The Heat Equation', 'The derivation, with boundary condition options.'),
            paul('SolvingHeatEquation', 'Solving the Heat Equation', 'Separation of variables worked out for several conditions.'),
            threeBlue('pdes', 'But what is a partial differential equation?', 'Builds the heat equation from a visual picture of temperature differences.'),
          ],
          exercises: [
            {
              slug: 'two-mode-data',
              title: 'Data with two modes',
              prompt: `Solve $u_t = 2u_{xx}$ on $0 < x < \\pi$, with $u(0, t) = u(\\pi, t) = 0$ and $u(x, 0) = 3\\sin x - \\sin 4x$. No integrals are necessary. Substitute your answer back into the equation.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'uniform-rod-cooling',
              title: 'Cooling a uniform rod',
              prompt: `A rod with $L = 1$ and $\\alpha = 0.1$ starts at $u = 100$ and has both ends held at 0. Find the series solution. Keeping the first non-zero term, estimate the time for the midpoint to fall to 50. Then compute the time accurately with more terms, and comment on the error.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'insulated-rod',
              title: 'An insulated rod',
              prompt: `Solve $u_t = u_{xx}$ on $0 < x < 1$ with $u_x(0, t) = u_x(1, t) = 0$ and $u(x, 0) = x$. State the limiting temperature, and find the time after which the solution is within 1% of that limit everywhere, using the first non-constant term.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'nonzero-ends',
              title: 'Non-zero end temperatures',
              prompt: `A rod of length $\\pi$ with $\\alpha = 1$ has $u(0, t) = 0$, $u(\\pi, t) = 10$, and starts at 0. Find the steady state, and the series for the difference. Write the full solution and evaluate $u(\\pi/2, 1)$ to three significant figures.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'finite-difference-heat',
              title: 'Check by finite differences',
              prompt: `Solve the worked example numerically using the explicit scheme $u_i^{k+1} = u_i^k + r(u_{i+1}^k - 2u_i^k + u_{i-1}^k)$, with $r = \\alpha\\Delta t/\\Delta x^2$, on 100 spatial intervals. Compare with the series at $t = 0.1$ and $t = 1$. Try $r = 0.4$ and $r = 0.6$, and describe what happens in each case.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does separation of variables lead to an eigenvalue problem for $X$?',
              answerOutline: 'The separated ratio is a constant, and the boundary conditions fall on $X$, giving $X\'\' + \\lambda X = 0$ with two-point conditions.',
            },
            {
              question: 'Why do high frequencies die off first?',
              answerOutline: 'Decay rates are $\\alpha(n\\pi/L)^2$, which increase like $n^2$.',
            },
            {
              question: 'What is the limit of $u$ for insulated ends?',
              answerOutline: 'The average of the initial temperature, because no heat escapes.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/separation-of-variables'],
        },
        {
          slug: 'wave-equation',
          title: 'The wave equation',
          summary:
            'Solve for a vibrating string with fixed ends, and see the modes, harmonics and travelling waves inside the solution.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the terms of the wave equation for a stretched string',
            'Solve the fixed-end problem with initial position and velocity',
            'Compute the frequencies of a string from its tension, density and length',
            'Connect standing waves with travelling waves',
          ],
          concepts: [
            'Wave equation',
            'Wave speed',
            'Standing waves',
            'Harmonics',
            'Initial position and velocity',
            'D\'Alembert form',
          ],
          explanation: `A string with tension $\\tau$ and linear density $\\rho$ has small transverse displacement $u(x, t)$. Applying Newton's second law to a short piece, the net vertical force is proportional to the curvature $u_{xx}$. The result is the **wave equation**

$$u_{tt} = c^2 u_{xx}, \\qquad c = \\sqrt{\\tau/\\rho},$$

where $c$ has units of speed. Because it is second order in time, you need two initial conditions: $u(x, 0) = f(x)$ and $u_t(x, 0) = g(x)$. For fixed ends, $u(0, t) = u(L, t) = 0$.

Separate as before, with $u = X(x)T(t)$:

$$\\frac{T''}{c^2 T} = \\frac{X''}{X} = -\\lambda.$$

Again $X_n = \\sin(n\\pi x/L)$ and $\\lambda_n = (n\\pi/L)^2$, and now $T'' + c^2\\lambda_n T = 0$ oscillates. Let $\\omega_n = n\\pi c/L$. Then

$$u(x, t) = \\sum_{n=1}^\\infty\\left(A_n\\cos\\omega_n t + B_n\\sin\\omega_n t\\right)\\sin\\frac{n\\pi x}{L}.$$

At $t = 0$, $u = f$ makes $A_n$ the sine coefficients of $f$. Differentiating, $u_t = g$ gives $\\omega_n B_n$ equal to the sine coefficients of $g$.

The modes do not decay. Each is a **standing wave**, and the frequencies $f_n = n\\,c/(2L)$ are integer multiples of the **fundamental**, which is why a string sounds like a musical note.

**Worked example.** A string of length $L$ is plucked at its centre to height $h$ and released from rest. So $g = 0$, and $f$ is the triangle $2hx/L$ on $[0, L/2]$ and $2h(L - x)/L$ on $[L/2, L]$.

All $B_n = 0$. The triangle is symmetric about the centre, so only odd modes appear. Integrating by parts,

$$A_n = \\frac{2}{L}\\int_0^L f(x)\\sin\\frac{n\\pi x}{L}\\,dx = \\frac{8h}{n^2\\pi^2}\\sin\\frac{n\\pi}{2}.$$

So

$$u(x, t) = \\frac{8h}{\\pi^2}\\left(\\sin\\frac{\\pi x}{L}\\cos\\omega_1 t - \\frac{1}{9}\\sin\\frac{3\\pi x}{L}\\cos 3\\omega_1 t + \\frac{1}{25}\\sin\\frac{5\\pi x}{L}\\cos 5\\omega_1 t - \\dots\\right).$$

The amplitude of the $n$th harmonic is $1/n^2$ of that of the fundamental, and the even harmonics are absent. Plucking at another point changes this mix, which is part of why a guitar sounds different near the bridge.

Using $\\sin a\\cos b = \\frac12[\\sin(a + b) + \\sin(a - b)]$, each term of the series with $g = 0$ becomes a sum of two waves travelling in opposite directions:

$$u(x, t) = \\frac12\\left[\\tilde f(x + ct) + \\tilde f(x - ct)\\right],$$

where $\\tilde f$ is the odd periodic extension of $f$. This is **d'Alembert's form**. It shows that the corners of the plucked string do not smooth out. They travel and reflect at speed $c$. The heat equation smooths at once. The wave equation carries its initial shape along, and all its singularities with it.

\`\`\`interactive
heat-wave
{"title": "Plucked string", "equation": "wave", "L": 1, "c": 1, "ic": "pluck", "height": 1, "pluckAt": 0.5, "N": 15, "caption": "Here L = c = h = 1, so the period is 2L/c = 2. With the pluck at the centre, b₂ = 0 and the odd harmonics have size 8/(n²π²): no even modes appear. Press Play: the bars show each mode's cos(nπct/L) swinging without decay. Turn on the travelling halves: each is half the odd extension of the triangle, one moving right and one moving left. Their sum is the string, and the corners travel and reflect instead of smoothing. Slide the pluck point towards an end and the even harmonics switch on."}
\`\`\``,
          resources: [
            lebl('The section on the wave equation, and the section on d\'Alembert\'s solution.'),
            paul('VibratingString', 'Vibrating String', 'Separation of variables for the string.'),
            paul('SeparationofVariables', 'Separation of Variables', 'A general account of the method.'),
          ],
          exercises: [
            {
              slug: 'one-mode-string',
              title: 'A single mode',
              prompt: `Solve $u_{tt} = 4u_{xx}$ on $0 < x < \\pi$ with fixed ends for (a) $u(x, 0) = \\sin 3x$, $u_t(x, 0) = 0$; and (b) $u(x, 0) = 0$, $u_t(x, 0) = \\sin 2x$. Substitute your answers back into the equation.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'guitar-string',
              title: 'Tuning a string',
              prompt: `A steel string has length 0.65 m, linear density 3.6 g/m and tension 60 N. Find the wave speed, the fundamental frequency and the second harmonic. By what factor must the tension be changed to raise the pitch one octave? What is the effect of pressing the string at the midpoint?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Convert density to kg/m. An octave doubles the frequency.',
            },
            {
              slug: 'struck-string',
              title: 'A struck string',
              prompt: `A string of length $\\pi$ with $c = 1$ starts flat, with velocity $g(x) = 1$ on $(\\pi/4, 3\\pi/4)$ and 0 elsewhere. Find the series for $u$. Evaluate $u(\\pi/2, \\pi/4)$ numerically from the series, and compare with the exact value $\\pi/4$ from d'Alembert's integral formula $u = \\frac{1}{2c}\\int_{x - ct}^{x + ct}\\tilde g(s)\\,ds$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mode-energy',
              title: 'Conserved energy',
              prompt: `Define $E(t) = \\frac12\\int_0^L(u_t^2 + c^2 u_x^2)\\,dx$. For a solution with fixed ends, differentiate under the integral and integrate by parts to show $E' = 0$. Then compute $E$ for $u = \\sin(n\\pi x/L)\\cos\\omega_n t$ directly.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the wave equation need that the heat equation does not?',
              answerOutline: 'Two initial conditions, position and velocity, because it is second order in time.',
            },
            {
              question: 'Why does a string have harmonics at integer multiples of a fundamental?',
              answerOutline: 'The eigenvalues give $\\omega_n = n\\pi c/L$, which is proportional to $n$.',
            },
            {
              question: 'What is the main qualitative difference between heat and wave solutions?',
              answerOutline: 'Heat solutions decay and smooth. Wave solutions keep their energy and carry shapes along without smoothing.',
            },
          ],
        },
        {
          slug: 'laplace-equation',
          title: 'Laplace\'s equation',
          summary:
            'Steady states solve Laplace\'s equation, and separation works on rectangles and disks when one boundary piece is treated at a time.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why steady states of heat flow satisfy Laplace\'s equation',
            'Solve Dirichlet problems on a rectangle by separation',
            'Use superposition to treat several non-zero sides',
            'Solve the Dirichlet problem on a disk in polar coordinates',
          ],
          concepts: [
            'Laplace\'s equation',
            'Harmonic function',
            'Dirichlet problem',
            'Superposition of boundary data',
            'Polar separation',
            'Mean value at the centre',
          ],
          explanation: `In two space dimensions, the heat equation is $u_t = \\alpha(u_{xx} + u_{yy})$. When the temperature no longer changes, $u_t = 0$, and we get **Laplace's equation**

$$u_{xx} + u_{yy} = 0.$$

Solutions are called **harmonic**. There is no time here, and so no initial condition. The temperature on the boundary determines everything inside. This is the **Dirichlet problem**.

On a rectangle, separation needs homogeneous conditions on opposite sides, so we handle one non-zero side at a time and add the results.

**Worked example.** On the unit square, solve $\\Delta u = 0$ with $u = 1$ on the top edge $y = 1$ and $u = 0$ on the other three edges.

With $u = X(x)Y(y)$ we get $X''/X = -Y''/Y = -\\lambda$. The conditions $X(0) = X(1) = 0$ give $X_n = \\sin n\\pi x$, $\\lambda_n = (n\\pi)^2$. Then $Y'' = n^2\\pi^2 Y$, and $Y(0) = 0$ gives $Y_n = \\sinh n\\pi y$. Thus

$$u(x, y) = \\sum_{n=1}^\\infty c_n\\sinh(n\\pi y)\\sin(n\\pi x).$$

At $y = 1$ this must equal 1, so $c_n\\sinh n\\pi$ is the sine coefficient of the constant 1, namely $\\frac{4}{n\\pi}$ for odd $n$ and 0 for even $n$. So

$$u(x, y) = \\sum_{n\\text{ odd}}\\frac{4}{n\\pi}\\frac{\\sinh n\\pi y}{\\sinh n\\pi}\\sin n\\pi x.$$

At the centre, the first term alone gives

$$\\frac{4}{\\pi}\\cdot\\frac{\\sinh(\\pi/2)}{\\sinh\\pi}\\cdot 1 = \\frac{4}{\\pi}\\cdot\\frac{1}{2\\cosh(\\pi/2)} \\approx 0.2537,$$

and the second term subtracts about $0.0038$. The series sums to exactly $\\frac14$. Here is a neat proof. Rotate the problem by 90° four times. By symmetry each version has the same value at the centre. Adding the four gives a harmonic function equal to 1 on the whole boundary (except at the corners), namely the constant 1. So each contributes $\\frac14$.

The factor $\\sinh(n\\pi y)/\\sinh(n\\pi)$ shrinks rapidly away from the top edge for large $n$. Fine boundary details are invisible a short way inside, which is why harmonic functions are smooth.

\`\`\`interactive
laplace-square
{"title": "Steady temperature in the unit square", "top": "1", "N": 9, "probe": [0.5, 0.5], "caption": "The top edge is held at 1 and the other three at 0. With N = 1 the centre value is the first term, 0.2537. Raise N and it settles at exactly 1/4. Drag the probe up towards the top edge: the slice through it ripples near the corners like a Fourier partial sum, but just below the edge it is already smooth. Type a top edge with more detail, such as sin(5*pi*x) or a step like (1 + sign(x - 0.5))/2, and watch it fade with depth."}
\`\`\`

**On a disk**, use polar coordinates, where

$$\\Delta u = u_{rr} + \\frac{1}{r}u_r + \\frac{1}{r^2}u_{\\theta\\theta}.$$

Requiring periodicity in $\\theta$ and boundedness at $r = 0$ gives

$$u(r, \\theta) = \\frac{a_0}{2} + \\sum_{n=1}^\\infty r^n(a_n\\cos n\\theta + b_n\\sin n\\theta).$$

On the unit circle this is the Fourier series of the boundary data. At $r = 0$, $u = a_0/2$, which is the average of the boundary values. So the value at the centre of a disk equals the mean value on its boundary. This is the **mean value property**, and it implies that a harmonic function takes its maximum and minimum on the boundary.`,
          resources: [
            lebl('The section on the steady-state temperature and Laplace\'s equation.'),
            paul('LaplacesEqn', "Laplace's Equation", 'The rectangle and the disk, worked out.'),
            paul('IntroPDE', 'Partial Differential Equations', 'The chapter overview, useful for reviewing all three equations together.'),
          ],
          exercises: [
            {
              slug: 'one-mode-rectangle',
              title: 'A single mode on a rectangle',
              prompt: `On $0 < x < a$, $0 < y < b$, solve $\\Delta u = 0$ with $u(x, 0) = \\sin(\\pi x/a)$ and $u = 0$ on the other three sides. Verify the Laplace equation and all four boundary conditions.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'disk-from-data',
              title: 'A disk from boundary data',
              prompt: `On the unit disk, solve $\\Delta u = 0$ with $u(1, \\theta) = 1 + 2\\cos\\theta + \\sin 2\\theta$. Write the answer in Cartesian coordinates and check directly that it is harmonic. State the value at the centre, and verify that it is the average of the boundary values. Find the point of the boundary at which $u$ is largest, and the value there.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'square-two-sides',
              title: 'Two hot sides',
              prompt: `On the unit square, $u = 1$ on the top and right edges, and $u = 0$ on the left and bottom edges. Using the symmetry argument of the lesson together with superposition, find $u$ at the centre, with no computation of series. Evaluate the series for $u(0.75, 0.75)$ to four decimal places.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'jacobi-laplace',
              title: 'Solve Laplace numerically',
              prompt: `Solve the worked example on an $N \\times N$ grid using Jacobi iteration, replacing each interior value by the average of its four neighbours. Run with $N = 21, 41, 81$. Report the value at the centre and the number of iterations needed for the largest update to fall below $10^{-6}$. How does the iteration count grow with $N$?`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there no initial condition for Laplace\'s equation?',
              answerOutline: 'There is no time variable. It describes a steady state fixed by the boundary data.',
            },
            {
              question: 'Why must rectangle problems be broken into one non-zero side at a time?',
              answerOutline: 'Separation needs homogeneous conditions on a pair of opposite sides, to give an eigenvalue problem.',
            },
            {
              question: 'Why do we exclude $r^{-n}$ and $\\ln r$ on a full disk?',
              answerOutline: 'They blow up at the origin, and the solution must be bounded there.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'quarter-car-suspension-study',
    title: 'A quarter-car suspension study',
    description: `Model one corner of a car as two masses in a line: the body $m_s$ supported by a spring $k_s$ and damper $c_s$ on the wheel $m_u$, which rides on the tyre stiffness $k_t$ over a road profile $r(t)$. Reasonable starting values are $m_s = 300$ kg, $m_u = 40$ kg, $k_s = 20\\,000$ N/m, $c_s = 1500$ N s/m and $k_t = 180\\,000$ N/m. Your job is to analyse this four-dimensional linear system by every method in the course, showing that each agrees with the others, and then to recommend a damper setting.

This course has no machine problems, so this is its main piece of independent work. Everything should run from a clean checkout of your code, and every analytic claim should have a numerical check beside it.`,
    deliverables: [
      'The equations of motion, derived from Newton\'s law, in first-order form $x\' = Ax + b\\,r(t)$, with a derivation of the units of each term',
      'Eigenvalues and eigenvectors of $A$, interpreted as body bounce and wheel hop modes, with frequencies in Hz and damping ratios',
      'Laplace transform treatment: the transfer function from road height to body height, and a plot of its magnitude against frequency',
      'Responses to three roads: a step (a kerb), a short pulse approximated by a delta function (a pothole) and a periodic speed-bump profile treated by Fourier series',
      'A comparison of each analytic response with `solve_ivp`, with the maximum difference reported',
      'A design study of $c_s$ that trades body acceleration against tyre contact, ending in a recommended value with reasons',
      'A short section adding a non-linear element, such as a stiffer spring in bump, with equilibria found and linearised, and a statement of how the conclusions change',
      'A heat-flow appendix: the damper body treated as a rod with one end at ambient temperature and an insulated end, solved by separation of variables and compared with an explicit finite-difference solution',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Add a random road with a realistic spectrum and compute the output spectrum',
      'Build an interactive slider for $c_s$ that updates the response plots',
    ],
  },
  masteryChecklist: [
    'I can turn a physical description into a differential equation, and check its units and limiting behaviour',
    'I can solve first-order separable and linear equations, and state the interval of validity',
    'I can solve constant-coefficient linear equations of any order, with forcing, by undetermined coefficients, variation of parameters and Laplace transforms',
    'I can find series solutions about an ordinary point and state their guaranteed radius of convergence',
    'I can solve linear systems with real, complex or repeated eigenvalues, and classify planar phase portraits',
    'I can linearise a non-linear system at an equilibrium, and I know when that analysis is inconclusive',
    'I can compute Fourier series, and state exactly what they converge to',
    'I can solve the heat, wave and Laplace equations on simple domains by separation of variables',
    'I can check any result by substitution and by a numerical solver, and I can run a convergence study',
  ],
});
