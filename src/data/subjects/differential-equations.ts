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
              prompt: `Give the order of each equation and say whether it is linear.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y' + t y = e^t$`, answer: `First order, linear: $y$ and $y'$ appear to the first power with coefficients depending on $t$ only.` },
                { prompt: `$y'' + y y' = 0$`, answer: `Second order, non-linear: the product $yy'$ is not first power in the unknown.` },
                { prompt: `$t^2 y''' - y = \\cos t$`, answer: `Third order, linear. The coefficient $t^2$ may depend on $t$.` },
                { prompt: `$y' = \\sqrt{1 + y^2}$`, answer: `First order, non-linear: $y$ appears inside a square root.` },
                { prompt: `$e^t y'' + y' = t^3$`, answer: `Second order, linear.` },
                { prompt: `$y'' + \\sin(t)\\, y = 0$`, answer: `Second order, linear. The sine is of $t$, not of $y$, so it is only a coefficient.` },
              ],
            },
            {
              slug: 'verify-by-substitution',
              title: 'Verify and find powers',
              prompt: `Check candidate solutions by substituting them into the equation.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Show by substitution that $y = e^{3t}$ and $y = e^{-t}$ solve $y'' - 2y' - 3y = 0$, and that $y = te^{3t}$ does not.`, answer: `For $e^{3t}$: $(9 - 6 - 3)e^{3t} = 0$. For $e^{-t}$: $(1 + 2 - 3)e^{-t} = 0$. For $te^{3t}$: $y' = (1 + 3t)e^{3t}$ and $y'' = (6 + 9t)e^{3t}$, so $y'' - 2y' - 3y = (6 + 9t - 2 - 6t - 3t)e^{3t} = 4e^{3t} \\neq 0$.` },
                { prompt: `Find every value of $r$ for which $y = t^r$ solves $t^2 y'' - 2t y' + 2y = 0$ on $t > 0$.`, answer: `Substituting gives $\\big(r(r - 1) - 2r + 2\\big)t^r = (r - 1)(r - 2)t^r$, so $r = 1$ or $r = 2$.` },
              ],
            },
            {
              slug: 'drug-infusion-model',
              title: 'A drug infusion model',
              prompt: `A drug is infused at 2 mg/h, and the body eliminates it at a rate proportional to the amount present, with constant $k = 0.25\\ \\text{h}^{-1}$. There is none in the body at the start.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the initial value problem for the amount $x(t)$.`, answer: `Rate in is constant and rate out is $kx$: $x' = 2 - 0.25x$, $x(0) = 0$, with $x$ in mg and $t$ in hours.` },
                { prompt: `Verify that $x(t) = 8(1 - e^{-t/4})$ solves it.`, answer: `$x' = 2e^{-t/4}$, and $2 - 0.25 \\cdot 8(1 - e^{-t/4}) = 2e^{-t/4}$. Also $x(0) = 8(1 - 1) = 0$.` },
                { prompt: `State the steady-state amount.`, answer: `$x \\to 8$ mg, where infusion $2$ mg/h balances elimination $0.25 \\times 8 = 2$ mg/h.` },
                { prompt: `How long does it take to reach 90% of that amount?`, answer: `$e^{-t/4} = 0.1$, so $t = 4\\ln 10 \\approx 9.21$ hours.` },
              ],
            },
            {
              slug: 'falling-with-drag',
              title: 'Falling with linear drag',
              prompt: `A mass $m$ falls from rest with gravity $g$ and drag force $cv$ opposing the motion, with $v$ measured downward.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Derive $mv' = mg - cv$ from Newton's second law.`, answer: `Mass times acceleration equals the net downward force. Gravity gives $mg$ downward and the drag $cv$ acts upward against the motion, so $mv' = mg - cv$.` },
                { prompt: `Check that $v(t) = \\frac{mg}{c}\\left(1 - e^{-ct/m}\\right)$ solves it with $v(0) = 0$.`, answer: `$mv' = m \\cdot \\frac{mg}{c} \\cdot \\frac{c}{m}e^{-ct/m} = mge^{-ct/m}$, and $mg - cv = mg - mg(1 - e^{-ct/m}) = mge^{-ct/m}$. At $t = 0$ the bracket is 0.` },
                { prompt: `State the terminal speed and check its units.`, answer: `$v \\to mg/c$. The units are $\\text{kg}\\cdot\\text{m/s}^2$ divided by $\\text{kg/s}$, which is m/s.` },
                { prompt: `For $m = 80$ kg, $g = 9.8\\ \\text{m/s}^2$ and $c = 12$ kg/s, find the terminal speed and the time to reach 95% of it.`, answer: `$mg/c = 784/12 \\approx 65.3$ m/s. 95% needs $e^{-ct/m} = 0.05$, so $t = \\frac{m}{c}\\ln 20 = \\frac{80}{12}\\ln 20 \\approx 20.0$ s.` },
              ],
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
          quiz: [
            {
              question: `A 200 L tank of pure water receives brine with 0.5 kg of salt per litre at 4 L/min, and the well-mixed solution leaves at 4 L/min. Which equation governs the salt $Q(t)$ in kg?`,
              options: [`$Q' = 0.5 - Q/50$`, `$Q' = 2 - 4Q$`, `$Q' = 2 - Q/50$`, `$Q' = 2 - Q/200$`],
              answer: 2,
              explanation: `Salt enters at $0.5 \\times 4 = 2$ kg/min. The tank concentration is $Q/200$ kg/L, and 4 L/min of it leaves, so salt leaves at $4Q/200 = Q/50$ kg/min. Writing $Q/200$ for the outflow uses the concentration as if it were a rate and forgets the flow of 4 L/min; writing 0.5 for the inflow does the same with the incoming brine.`,
            },
            {
              question: `Which of these equations is linear?`,
              options: [`$t^3 y'' + e^t y = \\sin t$`, `$y' + \\cos y = 0$`, `$y y'' = t$`, `$y' = y^2 + t$`],
              answer: 0,
              explanation: `Linearity is about the unknown: $y$ and its derivatives must appear to the first power with coefficients that depend only on $t$. In $t^3 y'' + e^t y = \\sin t$ the functions $t^3$, $e^t$ and $\\sin t$ involve only $t$, so it is linear. In $y' + \\cos y = 0$ the cosine is applied to $y$ itself, which makes it non-linear even though it looks like a coefficient.`,
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
              prompt: `Solve each initial value problem and state the interval of validity.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y' = e^{t - y}$, $y(0) = 1$`, answer: `$e^y\\,dy = e^t\\,dt$ gives $e^y = e^t + C$, and $y(0) = 1$ gives $C = e - 1$. So $y = \\ln(e^t + e - 1)$, valid for all $t$, since $e^t + e - 1 > 0$.` },
                { prompt: `$y' = 2t(1 + y^2)$, $y(0) = 0$`, answer: `$\\arctan y = t^2 + C$ with $C = 0$, so $y = \\tan(t^2)$. The tangent blows up when $t^2 = \\pi/2$, so the interval is $|t| < \\sqrt{\\pi/2} \\approx 1.253$.` },
                { prompt: `$y' = -y/t$, $y(1) = 3$, for $t > 0$`, answer: `$\\ln|y| = -\\ln t + C$, so $y = C/t$, and $y(1) = 3$ gives $y = 3/t$, valid on $t > 0$.` },
              ],
            },
            {
              slug: 'coffee-cooling',
              title: 'Cooling coffee',
              prompt: `Coffee at 90 °C sits in a 20 °C room and has cooled to 60 °C after 10 minutes. Use Newton's law of cooling, $T' = -k(T - 20)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find $k$ to three significant figures.`, answer: `$T = 20 + 70e^{-kt}$. Then $70e^{-10k} = 40$, so $k = \\frac{1}{10}\\ln\\frac{7}{4} \\approx 0.0560$ per minute.` },
                { prompt: `Find the time at which the coffee reaches 30 °C.`, answer: `$70e^{-kt} = 10$, so $t = \\frac{\\ln 7}{k} = \\frac{10\\ln 7}{\\ln(7/4)} \\approx 34.8$ minutes.` },
                { prompt: `Is it ever exactly at 20 °C according to this model?`, answer: `No. $70e^{-kt} > 0$ for every $t$, so $T$ approaches 20 °C but never reaches it.` },
              ],
            },
            {
              slug: 'logistic-solution',
              title: 'Solve the logistic equation',
              prompt: `Take $P' = rP(1 - P/K)$ with $P(0) = P_0$, where $0 < P_0 < K$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Solve it using partial fractions, and show that
$$P(t) = \\frac{K}{1 + \\frac{K - P_0}{P_0}e^{-rt}}.$$`, answer: `$\\frac{K}{P(K - P)} = \\frac{1}{P} + \\frac{1}{K - P}$, so integrating $\\frac{K\\,dP}{P(K - P)} = rK\\,dt$ gives $\\ln\\frac{P}{K - P} = rt + c$. With $P(0) = P_0$, $\\frac{P}{K - P} = \\frac{P_0}{K - P_0}e^{rt}$. Solve for $P$ and divide top and bottom by $\\frac{P_0}{K - P_0}e^{rt}$.` },
                { prompt: `Prove that the graph has its inflection point exactly where $P = K/2$.`, answer: `Differentiate the equation itself: $P'' = r(1 - 2P/K)P'$. Since $0 < P < K$, $P' > 0$, so $P''$ changes sign exactly when $1 - 2P/K$ does, at $P = K/2$.` },
                { prompt: `Compute the time this happens for $r = 0.5$, $K = 1000$ and $P_0 = 10$.`, answer: `$P = K/2$ when $\\frac{K - P_0}{P_0}e^{-rt} = 1$, so $t = \\frac{1}{r}\\ln\\frac{K - P_0}{P_0} = 2\\ln 99 \\approx 9.19$.` },
              ],
            },
            {
              slug: 'lost-solution',
              title: 'The solution that division loses',
              prompt: `Take $y' = y^2 - 1$, which has the constant solutions $y \\equiv 1$ and $y \\equiv -1$.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Find the general solution by separation, in the form $\\frac{y - 1}{y + 1} = Ce^{2t}$.`, answer: `Partial fractions: $\\frac{1}{y^2 - 1} = \\frac12\\left(\\frac{1}{y - 1} - \\frac{1}{y + 1}\\right)$. Integrating gives $\\frac12\\ln\\left|\\frac{y - 1}{y + 1}\\right| = t + c$, so $\\frac{y - 1}{y + 1} = Ce^{2t}$.` },
                { prompt: `Of the two constant solutions, show which one comes from a value of $C$ and which one is lost.`, answer: `$C = 0$ gives $y \\equiv 1$. For $y \\equiv -1$ the left side is undefined, and solving $y = \\frac{1 + Ce^{2t}}{1 - Ce^{2t}}$ never gives $-1$ for any finite $C$, so $y \\equiv -1$ is lost when dividing by $y^2 - 1$.` },
                { prompt: `Solve with $y(0) = 3$ and find the time at which the solution blows up.`, answer: `$C = \\frac{2}{4} = \\frac12$, so $y = \\frac{2 + e^{2t}}{2 - e^{2t}}$. As $y \\to \\infty$ the left side tends to 1, so $\\frac12 e^{2t} = 1$ and $t = \\frac12\\ln 2 \\approx 0.347$.` },
              ],
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
          quiz: [
            {
              question: `What is the solution of $y' = 3t^2 y$ with $y(0) = 2$?`,
              options: [`$y = 2e^{3t^2}$`, `$y = 2e^{t^3}$`, `$y = e^{t^3} + 1$`, `$y = 2 + t^3$`],
              answer: 1,
              explanation: `Separate: $dy/y = 3t^2\\,dt$, so $\\ln|y| = t^3 + c$ and $y = Ce^{t^3}$, with $C = 2$. The option $e^{t^3} + 1$ adds the constant after exponentiating, but a constant added to $\\ln|y|$ becomes a factor, not a term. $2e^{3t^2}$ forgets to integrate the right side.`,
            },
            {
              question: `Which equation is not separable?`,
              options: [`$y' = e^{t + y}$`, `$y' = ty + t$`, `$y' = \\dfrac{\\sin t}{y^2}$`, `$y' = t + y$`],
              answer: 3,
              explanation: `$t + y$ is not a product $g(t)h(y)$, so it cannot be separated; it is linear and needs an integrating factor. The tempting wrong choice $e^{t + y}$ looks mixed, but it factors as $e^t e^y$. Likewise $ty + t = t(y + 1)$.`,
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
              prompt: `Solve each initial value problem, and check by substitution.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y' + 2y = e^{-t}$, $y(0) = 0$`, answer: `$\\mu = e^{2t}$: $(ye^{2t})' = e^t$, so $ye^{2t} = e^t + C$ with $C = -1$. Thus $y = e^{-t} - e^{-2t}$.` },
                { prompt: `$y' + y\\tan t = \\cos t$, $y(0) = 1$, on $(-\\pi/2, \\pi/2)$`, answer: `$\\mu = e^{\\int\\tan t\\,dt} = \\sec t$: $(y\\sec t)' = 1$, so $y\\sec t = t + C$ with $C = 1$. Thus $y = (t + 1)\\cos t$.` },
                { prompt: `$ty' - y = t^2$, $y(1) = 0$, on $t > 0$`, answer: `Standard form $y' - y/t = t$, $\\mu = 1/t$: $(y/t)' = 1$, so $y/t = t + C$ with $C = -1$. Thus $y = t^2 - t$.` },
              ],
            },
            {
              slug: 'tank-changing-volume',
              title: 'A tank with changing volume',
              prompt: `A large tank starts with 50 L of pure water. Brine at 0.1 kg/L enters at 3 L/min, and the mixture leaves at 2 L/min.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the equation for the salt $Q(t)$.`, answer: `The volume is $50 + t$ litres, so $Q' = 0.3 - \\frac{2Q}{50 + t}$, $Q(0) = 0$. The coefficient of $Q$ depends on $t$.` },
                { prompt: `Solve it.`, answer: `$\\mu = e^{\\int 2/(50 + t)\\,dt} = (50 + t)^2$. Then $\\big(Q(50 + t)^2\\big)' = 0.3(50 + t)^2$, so $Q(50 + t)^2 = 0.1(50 + t)^3 + C$ with $C = -12\\,500$. Thus $Q = 0.1(50 + t) - \\frac{12\\,500}{(50 + t)^2}$.` },
                { prompt: `Find the amount of salt after 50 minutes.`, answer: `$Q(50) = 10 - 12\\,500/10\\,000 = 8.75$ kg.` },
              ],
            },
            {
              slug: 'rl-circuit',
              title: 'Switching on an RL circuit',
              prompt: `An inductor $L = 0.5$ H and resistor $R = 10\\ \\Omega$ are in series with a 12 V battery switched on at $t = 0$, so $LI' + RI = 12$ with $I(0) = 0$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find $I(t)$.`, answer: `$I' + 20I = 24$, so $I = 1.2(1 - e^{-20t})$ amperes.` },
                { prompt: `Give the steady-state current and the time constant.`, answer: `$12/10 = 1.2$ A, and $L/R = 0.05$ s.` },
                { prompt: `Find the time for the current to reach 99% of steady state.`, answer: `$e^{-20t} = 0.01$, so $t = \\frac{\\ln 100}{20} \\approx 0.230$ s, about 4.6 time constants.` },
              ],
            },
            {
              slug: 'bernoulli-substitution',
              title: 'Reducing a Bernoulli equation',
              prompt: `An equation $y' + p(t)y = q(t)y^n$ with $n \\neq 0, 1$ is non-linear, but $v = y^{1-n}$ makes it linear. Apply this to $y' + y = y^2$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Solve with $y(0) = 2$.`, answer: `Here $v = 1/y$, and $v' = -y'/y^2 = -(y^2 - y)/y^2 = v - 1$. So $v = 1 + Ce^t$, and $v(0) = \\frac12$ gives $C = -\\frac12$. Thus $y = \\frac{1}{1 - e^t/2} = \\frac{2}{2 - e^t}$.` },
                { prompt: `Find the time at which that solution blows up.`, answer: `When $e^t = 2$, at $t = \\ln 2 \\approx 0.693$.` },
                { prompt: `Describe how the behaviour differs when $y(0) = 1/2$.`, answer: `Now $v(0) = 2$, so $C = 1$ and $y = \\frac{1}{1 + e^t}$. It exists for all $t$ and decays to 0. Starting below the equilibrium $y = 1$ the solution falls towards 0; starting above it, it blows up.` },
              ],
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
          quiz: [
            {
              question: `What is the general solution of $y' + 3t^2 y = t^2$?`,
              options: [`$y = Ce^{-t^3}$`, `$y = \\tfrac13 + Ce^{t^3}$`, `$y = \\tfrac{t^3}{3}e^{-t^3} + C$`, `$y = \\tfrac13 + Ce^{-t^3}$`],
              answer: 3,
              explanation: `The integrating factor is $e^{\\int 3t^2\\,dt} = e^{t^3}$, so $(ye^{t^3})' = t^2e^{t^3}$ and $ye^{t^3} = \\tfrac13 e^{t^3} + C$. Dividing by $e^{t^3}$ gives $\\tfrac13 + Ce^{-t^3}$. The option $Ce^{-t^3}$ is only the homogeneous part, and $\\tfrac13 + Ce^{t^3}$ has the sign of the exponent reversed.`,
            },
            {
              question: `What is the integrating factor for $2y' + 4ty = t$?`,
              options: [`$e^{2t^2}$`, `$e^{t^2}$`, `$e^{4t}$`, `$e^{t^2/2}$`],
              answer: 1,
              explanation: `The formula $e^{\\int p\\,dt}$ needs standard form $y' + p(t)y = q(t)$, so divide by 2 first: $y' + 2ty = t/2$. Then $\\mu = e^{\\int 2t\\,dt} = e^{t^2}$. Using $p = 4t$ without dividing gives $e^{2t^2}$, which does not make the left side an exact derivative.`,
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
              prompt: `Take $y' = 2y$ with $y(0) = 1$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Use Euler's method with $h = 0.25$ to approximate $y(1)$, and compare with the exact value.`, answer: `Each step multiplies by $1 + 2h = 1.5$, giving $1.5, 2.25, 3.375, 5.0625$. The exact value is $e^2 \\approx 7.389$, so the error is about 2.33.` },
                { prompt: `Show that $n$ steps of size $1/n$ give exactly $(1 + 2/n)^n$.`, answer: `Euler gives $y_{k+1} = y_k + h \\cdot 2y_k = (1 + 2h)y_k$, so $y_n = (1 + 2h)^n y_0 = (1 + 2/n)^n$. This tends to $e^2$ as $n \\to \\infty$.` },
              ],
            },
            {
              slug: 'isoclines-field',
              title: 'Isoclines and a hidden solution',
              prompt: `Study the direction field of $y' = y - t$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the isoclines for slopes $c = -1, 0, 1, 2$ and sketch the direction field by hand.`, answer: `The isocline for slope $c$ is $y - t = c$, the line $y = t + c$. So $y = t - 1$, $y = t$, $y = t + 1$ and $y = t + 2$, all of slope 1, with short segments of slope $-1, 0, 1, 2$ along them.` },
                { prompt: `Show that one isocline is itself a solution curve.`, answer: `On $y = t + 1$ the field slope is 1, the same as the slope of the line. Check: $y' = 1$ and $y - t = 1$.` },
                { prompt: `Explain what happens to solutions that start above it and below it.`, answer: `The general solution is $y = t + 1 + Ce^t$. Above the line ($C > 0$) solutions curve away upwards like $e^t$; below it ($C < 0$) they fall to $-\\infty$. The line repels its neighbours.` },
              ],
            },
            {
              slug: 'euler-convergence-study',
              title: 'A convergence study',
              prompt: `Write a Python function \`euler(f, t0, y0, tf, n)\`. Apply it to $y' = t - y$, $y(0) = 1$ on $[0, 1]$, where the exact value is $y(1) = 2/e$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `With $n = 10, 20, 40, 80, 160$, tabulate the error at $t = 1$ and the ratio of successive errors.`, answer: `The errors are about $3.84 \\times 10^{-2}$, $1.88 \\times 10^{-2}$, $9.29 \\times 10^{-3}$, $4.62 \\times 10^{-3}$ and $2.31 \\times 10^{-3}$. The ratios are 2.04, 2.02, 2.01 and 2.005, approaching 2.` },
                { prompt: `Plot the error against $h$ on log-log axes and fit the slope.`, answer: `The points lie on a straight line, and a least-squares fit gives a slope of about 1.01, so the error is proportional to $h$.` },
              ],
            },
            {
              slug: 'improved-euler',
              title: 'Improved Euler',
              prompt: `The improved Euler (Heun) method uses a predictor $\\tilde y = y_n + hf(t_n, y_n)$ and then $y_{n+1} = y_n + \\frac{h}{2}\\left(f(t_n, y_n) + f(t_{n+1}, \\tilde y)\\right)$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Repeat the convergence study of the previous exercise with this method. What are the ratios now, and what order of accuracy does that imply?`, answer: `The errors are about $1.32 \\times 10^{-3}$, $3.18 \\times 10^{-4}$, $7.81 \\times 10^{-5}$, $1.93 \\times 10^{-5}$ and $4.81 \\times 10^{-6}$, with ratios 4.16, 4.08, 4.04, 4.02. Halving $h$ divides the error by 4, so the method is second order and the log-log slope is about 2.` },
                { prompt: `By hand, compute one step with $h = 0.5$ from $y(0) = 1$ for $y' = t - y$.`, answer: `$f(0, 1) = -1$, so $\\tilde y = 0.5$. Then $f(0.5, 0.5) = 0$, and $y_1 = 1 + 0.25(-1 + 0) = 0.75$. The exact value is $y(0.5) = -0.5 + 2e^{-0.5} \\approx 0.713$.` },
              ],
            },
            {
              slug: 'euler-stability',
              title: 'When Euler explodes',
              prompt: `Apply Euler's method to $y' = -20y$, $y(0) = 1$ on $[0, 1.5]$. Each step multiplies $y$ by $1 - 20h$.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `$h = 0.15$`, answer: `The factor is $-2$: the values alternate in sign and double, reaching $(-2)^{10} = 1024$ at $t = 1.5$. The method explodes.` },
                { prompt: `$h = 0.1$`, answer: `The factor is $-1$: the values flip between $1$ and $-1$ for ever and never decay.` },
                { prompt: `$h = 0.05$`, answer: `The factor is 0: $y = 0$ after the first step and stays there. Crude, but it decays.` },
                { prompt: `$h = 0.01$`, answer: `The factor is $0.8$: a smooth decay to $0.8^{150} \\approx 2.9 \\times 10^{-15}$ at $t = 1.5$, close in shape to the exact $e^{-20t}$ (whose value there is $e^{-30} \\approx 9.4 \\times 10^{-14}$).` },
                { prompt: `What step size is required for the numerical solution to decay?`, answer: `$|1 - 20h| < 1$, that is $0 < h < 0.1$. To avoid sign oscillation as well, $h \\leq 0.05$.` },
              ],
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
          quiz: [
            {
              question: `Euler's method with $h = 0.5$ is applied to $y' = y + t$, $y(0) = 1$. What estimate of $y(1)$ does it give?`,
              options: [`$2.5$`, `$2.25$`, `$2$`, `$3.44$`],
              answer: 0,
              explanation: `First step: $y_1 = 1 + 0.5(1 + 0) = 1.5$. Second step uses $t = 0.5$: $y_2 = 1.5 + 0.5(1.5 + 0.5) = 2.5$. Keeping $t = 0$ in the second step gives 2.25, and 3.44 is the exact value $2e - 2$, not the Euler estimate.`,
            },
            {
              question: `With Euler's method and a fixed end time, what roughly happens to the error at the end when the step size is halved?`,
              options: [`It falls to a quarter`, `It stays the same, since twice as many steps add twice as many errors`, `It roughly halves`, `It falls by a factor of 2 per step, so by $2^n$ overall`],
              answer: 2,
              explanation: `Each step makes an error of order $h^2$, and there are about $1/h$ steps, so the global error is of order $h$: halving $h$ halves it. A quarter is the behaviour of a second-order method such as improved Euler.`,
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
              prompt: `For each initial value problem, say whether the existence and uniqueness theorem guarantees a unique solution near the initial time, and why.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$y' = \\sqrt{y}$, $y(0) = 1$`, answer: `Yes. $f = \\sqrt y$ and $f_y = \\frac{1}{2\\sqrt y}$ are continuous near $(0, 1)$.` },
                { prompt: `$y' = \\sqrt{y}$, $y(0) = 0$, and find two distinct solutions`, answer: `No guarantee of uniqueness: $f$ is continuous, but $f_y = \\frac{1}{2\\sqrt y}$ is unbounded near $y = 0$. Indeed $y \\equiv 0$ and $y = t^2/4$ for $t \\geq 0$ (and 0 for $t < 0$) both solve it: $y' = t/2 = \\sqrt{t^2/4}$.` },
                { prompt: `$y' = y/(t^2 - 1)$, $y(1) = 0$`, answer: `No. $f$ is not defined at $t = 1$, so the theorem does not apply at the initial point.` },
                { prompt: `$y' = t^2 + y^2$, $y(0) = 0$`, answer: `Yes. $f$ and $f_y = 2y$ are continuous everywhere, so a unique solution exists on some interval around $t = 0$ (it need not exist for all $t$).` },
              ],
            },
            {
              slug: 'phase-line-cubic',
              title: 'A phase line for a cubic',
              prompt: `Take $y' = y^3 - y = y(y - 1)(y + 1)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Draw the phase line and classify each equilibrium, using both arrows and the derivative test.`, answer: `$f$ is negative for $y < -1$, positive on $(-1, 0)$, negative on $(0, 1)$ and positive for $y > 1$. With $f'(y) = 3y^2 - 1$: $f'(-1) = 2 > 0$, so $-1$ is unstable; $f'(0) = -1 < 0$, so 0 is stable; $f'(1) = 2 > 0$, so 1 is unstable. The arrows agree.` },
                { prompt: `State the limit of $y(t)$ as $t$ increases for $y(0) = -0.5$ and $y(0) = 0.5$.`, answer: `Both tend to the stable equilibrium 0.` },
                { prompt: `Say what happens for $y(0) = 2$.`, answer: `$y$ increases without bound. The cubic growth makes it blow up in finite time, at $t = \\frac12\\ln\\frac43 \\approx 0.144$.` },
              ],
            },
            {
              slug: 'fishery-quota',
              title: 'Setting a fishing quota',
              prompt: `A fish stock obeys $P' = 0.5P(1 - P/100) - H$, with $P$ in tonnes and $t$ in years.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the largest harvest $H$ for which an equilibrium exists.`, answer: `The growth term $0.5P(1 - P/100)$ is largest at $P = 50$, where it equals 12.5. So $H \\leq 12.5$ tonnes per year.` },
                { prompt: `For $H = 8$, find the equilibria and classify them.`, answer: `$0.5P - 0.005P^2 = 8$ gives $P^2 - 100P + 1600 = 0$, so $P = 20$ or $80$. With $f'(P) = 0.5 - 0.01P$, $f'(20) = 0.3 > 0$ (unstable) and $f'(80) = -0.3 < 0$ (stable).` },
                { prompt: `For $H = 8$, state the smallest initial stock from which the fishery survives.`, answer: `20 tonnes. From any stock above 20 the population tends to 80; exactly 20 sits at the unstable equilibrium; below 20 it collapses to zero in finite time.` },
              ],
            },
            {
              slug: 'semistable-equilibrium',
              title: 'A semistable equilibrium',
              prompt: `Take $y' = (y - 1)^2$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show the derivative test is inconclusive at $y = 1$, and classify the equilibrium from the phase line.`, answer: `$f'(y) = 2(y - 1)$, so $f'(1) = 0$. Since $f \\geq 0$, the arrows point up on both sides: solutions below rise to 1 and solutions above move away. The equilibrium is semistable.` },
                { prompt: `Solve exactly with $y(0) = 0$, and give the limit.`, answer: `$-\\frac{1}{y - 1} = t + C$, with $C = 1$, so $y = 1 - \\frac{1}{t + 1} = \\frac{t}{t + 1}$. It tends to 1 as $t \\to \\infty$, slowly, like $1/t$.` },
                { prompt: `Solve exactly with $y(0) = 2$, and give the blow-up time.`, answer: `Now $C = -1$, so $y = 1 + \\frac{1}{1 - t}$, which blows up at $t = 1$. The same formula family approaches 1 from below over infinite time but escapes from above in finite time.` },
              ],
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
          quiz: [
            {
              question: `What are the equilibria of $y' = 4y - y^2 - 3$, and their stability?`,
              options: [`$y = 1$ stable, $y = 3$ unstable`, `$y = 0$ unstable, $y = 4$ stable`, `$y = 1$ unstable, $y = 3$ stable`, `$y = 1$ and $y = 3$, both stable`],
              answer: 2,
              explanation: `$4y - y^2 - 3 = -(y - 1)(y - 3)$, so the equilibria are 1 and 3. With $f'(y) = 4 - 2y$, $f'(1) = 2 > 0$ (unstable) and $f'(3) = -2 < 0$ (stable): between them $f > 0$ and solutions rise to 3. The option with 0 and 4 forgets the constant $-3$.`,
            },
            {
              question: `For $y' = y^{1/3}$ with $y(0) = 0$, what does the existence and uniqueness theorem tell you?`,
              options: [`No solution exists, because $f_y$ is unbounded at $y = 0$`, `A solution exists but uniqueness is not guaranteed, and indeed $y \\equiv 0$ and $y = (2t/3)^{3/2}$ for $t \\geq 0$ both work`, `There is a unique solution, because $f$ is continuous`, `There is a unique solution, because the equation is autonomous`],
              answer: 1,
              explanation: `$f = y^{1/3}$ is continuous, which gives existence, but $f_y = \\tfrac13 y^{-2/3}$ is unbounded at 0, so uniqueness is not guaranteed, and it fails: $y = (2t/3)^{3/2}$ has $y' = (2t/3)^{1/2} = y^{1/3}$. Continuity of $f$ alone gives existence, not uniqueness, which is the trap in the third option.`,
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
              prompt: `Compute the Wronskian of each pair and decide whether it is a fundamental set for the stated equation.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\cos 3t, \\sin 3t$ for $y'' + 9y = 0$`, answer: `$W = \\cos 3t \\cdot 3\\cos 3t - (-3\\sin 3t)\\sin 3t = 3 \\neq 0$. Both solve the equation, so it is a fundamental set.` },
                { prompt: `$e^{2t}, 5e^{2t}$ for $y'' - 4y = 0$`, answer: `$W = e^{2t} \\cdot 10e^{2t} - 2e^{2t} \\cdot 5e^{2t} = 0$. The second is a multiple of the first, so it is not a fundamental set.` },
                { prompt: `$\\cosh t, \\sinh t$ for $y'' - y = 0$`, answer: `$W = \\cosh^2 t - \\sinh^2 t = 1 \\neq 0$. Both solve the equation, so it is a fundamental set.` },
                { prompt: `$t, 1/t$ for $t^2y'' + ty' - y = 0$ on $t > 0$`, answer: `$W = t\\left(-\\frac{1}{t^2}\\right) - 1 \\cdot \\frac1t = -\\frac2t \\neq 0$. Both solve the equation (for $1/t$: $\\frac2t - \\frac1t - \\frac1t = 0$), so it is a fundamental set.` },
              ],
            },
            {
              slug: 'reduction-of-order',
              title: 'Reduction of order',
              prompt: `You are given that $y_1 = t$ solves $t^2y'' + ty' - y = 0$ on $t > 0$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Substitute $y = v(t)\\,t$ and obtain a first-order equation for $v'$.`, answer: `$y' = v't + v$ and $y'' = v''t + 2v'$. Substituting, the $v$ terms cancel and $t^3v'' + 3t^2v' = 0$, so $w = v'$ satisfies $w' = -\\frac{3}{t}w$.` },
                { prompt: `Find a second solution.`, answer: `$w = Ct^{-3}$, so $v = -\\frac{C}{2t^2}$ and $y = vt = -\\frac{C}{2t}$. Taking $C = -2$ gives $y_2 = 1/t$.` },
                { prompt: `Use Abel's formula to predict the Wronskian of the pair, and check it directly.`, answer: `In standard form $p = 1/t$, so $W = Ce^{-\\int dt/t} = C/t$. Directly, $W(t, 1/t) = t \\cdot \\left(-\\frac{1}{t^2}\\right) - \\frac1t = -\\frac2t$, which is of that form with $C = -2$.` },
              ],
            },
            {
              slug: 'superposition-fails',
              title: 'Superposition fails without linearity',
              prompt: `Consider the non-linear equation $yy'' + (y')^2 = 0$ on $t > 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $y_1 = 1$ and $y_2 = \\sqrt{t}$ are solutions.`, answer: `For $y_1 = 1$ both terms are 0. For $y_2 = \\sqrt t$: $y' = \\frac{1}{2\\sqrt t}$ and $y'' = -\\frac{1}{4t^{3/2}}$, so $yy'' = -\\frac{1}{4t}$ and $(y')^2 = \\frac{1}{4t}$, which add to 0.` },
                { prompt: `Show that $y_1 + y_2$ is not a solution.`, answer: `With $y = 1 + \\sqrt t$, $yy'' + (y')^2 = -\\frac{1 + \\sqrt t}{4t^{3/2}} + \\frac{1}{4t} = -\\frac{1}{4t^{3/2}} \\neq 0$.` },
                { prompt: `Point to the step of the superposition argument that breaks.`, answer: `Superposition uses $L[y_1 + y_2] = L[y_1] + L[y_2]$. Here $L[y] = yy'' + (y')^2$ is not additive: $L[y_1 + y_2] = L[y_1] + L[y_2] + y_1y_2'' + y_2y_1'' + 2y_1'y_2'$, and the cross terms do not vanish.` },
              ],
            },
            {
              slug: 'wronskian-zero-independent',
              title: 'Independent with zero Wronskian',
              prompt: `Let $f(t) = t^2$ and $g(t) = t|t|$ on $\\mathbb{R}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $g$ is differentiable and that $W(f, g) \\equiv 0$.`, answer: `For $t \\neq 0$, $g' = 2|t|$, and at 0 the difference quotient $g(h)/h = |h| \\to 0$, so $g' = 2|t|$ everywhere. Then $W = t^2 \\cdot 2|t| - 2t \\cdot t|t| = 0$ for every $t$.` },
                { prompt: `Show that $f$ and $g$ are nevertheless linearly independent on $\\mathbb{R}$.`, answer: `If $at^2 + bt|t| = 0$ for all $t$, then $t = 1$ gives $a + b = 0$ and $t = -1$ gives $a - b = 0$, so $a = b = 0$. (On $t > 0$ alone they would be dependent: $g = f$ there.)` },
                { prompt: `Explain why this does not contradict Abel's formula, and why $f$ and $g$ cannot both solve an equation $y'' + py' + qy = 0$ with continuous coefficients on an interval containing 0.`, answer: `Abel's formula, and the rule "zero Wronskian means dependent", apply only to solutions of such an equation; $f$ and $g$ are just functions. If both were solutions, then at $t = 0$ both have value 0 and slope 0, the same data as the zero solution, so uniqueness would force $f \\equiv g \\equiv 0$, which is false.` },
              ],
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
          quiz: [
            {
              question: `What is the Wronskian $W(y_1, y_2) = y_1y_2' - y_1'y_2$ of $y_1 = e^t$ and $y_2 = e^{-3t}$?`,
              options: [`$4e^{-2t}$`, `$-2e^{-2t}$`, `$0$`, `$-4e^{-2t}$`],
              answer: 3,
              explanation: `$y_1y_2' = e^t(-3e^{-3t}) = -3e^{-2t}$ and $y_1'y_2 = e^{-2t}$, so $W = -4e^{-2t}$, which is never 0, so the pair is independent. $4e^{-2t}$ comes from taking the products in the opposite order, $y_1'y_2 - y_1y_2'$.`,
            },
            {
              question: `$y_1$ and $y_2$ solve $y'' + p(t)y' + q(t)y = 0$ with $p, q$ continuous on an interval $I$, and their Wronskian is 0 at one point of $I$. What follows?`,
              options: [`The Wronskian is 0 everywhere on $I$, and the two solutions are linearly dependent`, `Nothing: the Wronskian may be non-zero elsewhere on $I$`, `They are independent, because they are different functions`, `Both solutions are identically zero`],
              answer: 0,
              explanation: `Abel's formula gives $W(t) = W(t_0)e^{-\\int_{t_0}^t p\\,ds}$, so a zero at one point makes $W$ zero everywhere, and for solutions that means dependence. "Nothing follows" is true for arbitrary functions, such as $t^2$ and $t|t|$, but not for two solutions of the same linear equation.`,
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
              prompt: `Find the solution of each initial value problem.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y'' - y' - 6y = 0$, $y(0) = 1$, $y'(0) = 8$`, answer: `Roots $3$ and $-2$. From $c_1 + c_2 = 1$ and $3c_1 - 2c_2 = 8$: $c_1 = 2$, $c_2 = -1$. So $y = 2e^{3t} - e^{-2t}$.` },
                { prompt: `$y'' - 4y' + 4y = 0$, $y(0) = 2$, $y'(0) = 1$`, answer: `Double root 2, so $y = (c_1 + c_2t)e^{2t}$ with $c_1 = 2$ and $2c_1 + c_2 = 1$, so $c_2 = -3$. Thus $y = (2 - 3t)e^{2t}$.` },
                { prompt: `$y'' + 6y' + 13y = 0$, $y(0) = 0$, $y'(0) = 4$`, answer: `Roots $-3 \\pm 2i$, so $y = e^{-3t}(c_1\\cos 2t + c_2\\sin 2t)$ with $c_1 = 0$ and $2c_2 = 4$. Thus $y = 2e^{-3t}\\sin 2t$.` },
              ],
            },
            {
              slug: 'amplitude-phase',
              title: 'Amplitude-phase form',
              prompt: `Take $y = -\\cos 3t + \\sqrt{3}\\,\\sin 3t$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write $y$ in the form $R\\cos(3t - \\delta)$ with $R > 0$ and $0 \\leq \\delta < 2\\pi$.`, answer: `$R\\cos(3t - \\delta) = R\\cos\\delta\\cos 3t + R\\sin\\delta\\sin 3t$, so $R\\cos\\delta = -1$ and $R\\sin\\delta = \\sqrt3$. Then $R = 2$, and the point $(-1, \\sqrt3)$ is in the second quadrant, so $\\delta = 2\\pi/3$: $y = 2\\cos(3t - 2\\pi/3)$.` },
                { prompt: `Find the first $t > 0$ at which $y$ reaches its maximum.`, answer: `The maximum 2 occurs when $3t - 2\\pi/3 = 0$, at $t = 2\\pi/9 \\approx 0.698$.` },
              ],
            },
            {
              slug: 'all-solutions-decay',
              title: 'When do all solutions decay?',
              prompt: `Take $ay'' + by' + cy = 0$ with $a > 0$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that every solution tends to 0 as $t \\to \\infty$ if and only if $b > 0$ and $c > 0$. Consider each root case.`, answer: `All solutions decay exactly when both roots have negative real part. Distinct real roots: their sum is $-b/a$ and product $c/a$; both are negative iff the sum is negative and the product positive, that is $b > 0$, $c > 0$. Repeated root $-b/2a$: negative iff $b > 0$, and then $c = b^2/4a > 0$. Complex roots: real part $-b/2a < 0$ iff $b > 0$, and $c > b^2/4a \\geq 0$ automatically.` },
                { prompt: `Use the result to find every real $k$ for which all solutions of $y'' + (k - 1)y' + (2 - k)y = 0$ decay.`, answer: `Need $k - 1 > 0$ and $2 - k > 0$, so $1 < k < 2$.` },
              ],
            },
            {
              slug: 'limit-of-distinct-roots',
              title: 'The repeated root as a limit',
              prompt: `For $\\epsilon \\neq 0$, the function $\\frac{e^{(r + \\epsilon)t} - e^{rt}}{\\epsilon}$ solves the equation with roots $r$ and $r + \\epsilon$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Find its limit as $\\epsilon \\to 0$.`, answer: `It is a difference quotient in $r$, so the limit is $\\frac{\\partial}{\\partial r}e^{rt} = te^{rt}$. (Or expand: $e^{\\epsilon t} = 1 + \\epsilon t + O(\\epsilon^2)$.)` },
                { prompt: `Explain how this accounts for the solution $te^{rt}$.`, answer: `For each $\\epsilon$ the function is a combination of the two exponential solutions. As $\\epsilon \\to 0$ the equation tends to the one with the double root $r$, and the solutions tend to $te^{rt}$, which therefore solves the limiting equation even though it is not an exponential.` },
              ],
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
          quiz: [
            {
              question: `What is the general solution of $y'' + 2y' + 10y = 0$?`,
              options: [`$e^{-t}(c_1\\cos 3t + c_2\\sin 3t)$`, `$e^{t}(c_1\\cos 3t + c_2\\sin 3t)$`, `$e^{-t}(c_1\\cos 9t + c_2\\sin 9t)$`, `$c_1e^{-t} + c_2e^{3t}$`],
              answer: 0,
              explanation: `$r^2 + 2r + 10 = 0$ gives $r = -1 \\pm \\sqrt{1 - 10} = -1 \\pm 3i$. The real part $-1$ is the decay rate and the imaginary part 3 is the frequency. Using 9 forgets the square root of the discriminant, and $e^{t}$ has the sign of $-b/2a$ reversed.`,
            },
            {
              question: `One solution of a constant-coefficient equation $ay'' + by' + cy = 0$ is $te^{-2t}$. What are its characteristic roots?`,
              options: [`$-2$ and $0$`, `$-2$ and $2$`, `$-2$, repeated`, `$-2 \\pm i$`],
              answer: 2,
              explanation: `A factor $t$ in front of $e^{rt}$ appears only when $r$ is a double root, so the equation is a multiple of $y'' + 4y' + 4y = 0$. The option $-2$ and $0$ reads the $t$ as if it came from a root 0, but a root 0 gives a constant solution, not a factor $t$.`,
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
              prompt: `Write the correct trial form for each equation, without computing constants.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y'' + 4y = t\\cos 2t$`, answer: `$\\pm 2i$ are simple roots, so multiply by $t$: $Y = t\\big[(At + B)\\cos 2t + (Ct + D)\\sin 2t\\big]$.` },
                { prompt: `$y'' + 2y' + 5y = e^{-t}\\sin 2t$`, answer: `The roots are $-1 \\pm 2i$, which match the forcing: $Y = te^{-t}(A\\cos 2t + B\\sin 2t)$.` },
                { prompt: `$y'' - 4y' + 4y = (t + 1)e^{2t}$`, answer: `2 is a double root, so multiply by $t^2$: $Y = t^2(At + B)e^{2t}$.` },
                { prompt: `$y'' - y' = t^2$`, answer: `0 is a simple root (constants solve the homogeneous equation), so $Y = t(At^2 + Bt + C)$.` },
                { prompt: `$y'' + y = e^t + \\sin t$`, answer: `Treat each term separately: $Y = Ae^t + t(B\\cos t + C\\sin t)$, since $\\pm i$ are roots.` },
              ],
            },
            {
              slug: 'particular-drill',
              title: 'Particular solution drill',
              prompt: `Find a particular solution of each equation.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y'' + y' - 2y = 2t$`, answer: `$Y = At + B$: $A - 2At - 2B = 2t$, so $A = -1$, $B = -\\frac12$. $Y = -t - \\frac12$.` },
                { prompt: `$y'' + 4y = 3\\cos 2t$`, answer: `Resonant, so $Y = t(A\\cos 2t + B\\sin 2t)$. Substituting gives $-4A\\sin 2t + 4B\\cos 2t = 3\\cos 2t$, so $A = 0$, $B = \\frac34$: $Y = \\frac34 t\\sin 2t$.` },
                { prompt: `$y'' + 2y' + y = e^{-t}$`, answer: `$-1$ is a double root, so $Y = At^2e^{-t}$, and substituting gives $2A = 1$: $Y = \\frac12 t^2e^{-t}$.` },
                { prompt: `$y'' - y = t + e^{2t}$`, answer: `Separately: $Y_1 = -t$, and $Y_2 = Ae^{2t}$ with $3A = 1$. So $Y = -t + \\frac13 e^{2t}$.` },
              ],
            },
            {
              slug: 'initial-value-with-forcing',
              title: 'Full initial value problem',
              prompt: `Solve $y'' + 2y' + 2y = 10\\sin t$ with $y(0) = 0$, $y'(0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the solution.`, answer: `Complex shortcut: with $e^{it}$, $P(i) = -1 + 2i + 2 = 1 + 2i$, so $Y = \\operatorname{Im}\\frac{10e^{it}}{1 + 2i} = \\operatorname{Im}\\,2(1 - 2i)e^{it} = 2\\sin t - 4\\cos t$. The roots are $-1 \\pm i$, and the initial conditions give $y = e^{-t}(4\\cos t + 2\\sin t) + 2\\sin t - 4\\cos t$.` },
                { prompt: `Identify the transient and the steady-state parts, and write the steady state in the form $R\\sin(t - \\delta)$.`, answer: `The transient is $e^{-t}(4\\cos t + 2\\sin t)$, which dies out. The steady state is $2\\sin t - 4\\cos t = R\\sin(t - \\delta)$ with $R\\cos\\delta = 2$, $R\\sin\\delta = 4$: $R = 2\\sqrt5 \\approx 4.47$ and $\\delta = \\arctan 2 \\approx 1.107$.` },
              ],
            },
            {
              slug: 'exponential-response',
              title: 'The exponential response formula',
              prompt: `Let $P(D) = aD^2 + bD + c$, where $D = d/dt$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $P(D)e^{st} = P(s)e^{st}$, and deduce that if $P(s) \\neq 0$, then $y = e^{st}/P(s)$ solves $P(D)y = e^{st}$.`, answer: `$De^{st} = se^{st}$ and $D^2e^{st} = s^2e^{st}$, so $P(D)e^{st} = (as^2 + bs + c)e^{st}$. Dividing by the number $P(s)$ gives the solution.` },
                { prompt: `Differentiate the identity with respect to $s$ to show that if $P(s) = 0$ and $P'(s) \\neq 0$, then $y = te^{st}/P'(s)$ is a solution.`, answer: `$\\frac{\\partial}{\\partial s}$ commutes with $P(D)$, so $P(D)(te^{st}) = P'(s)e^{st} + P(s)te^{st}$. With $P(s) = 0$ this is $P'(s)e^{st}$; divide by $P'(s)$.` },
                { prompt: `Use this to recover the worked example's value $A = -4$.`, answer: `For $y'' - 3y' + 2y = 4e^t$, $P(s) = s^2 - 3s + 2$ has $P(1) = 0$ and $P'(1) = 2 - 3 = -1$, so $Y = 4te^t/(-1) = -4te^t$.` },
              ],
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
          quiz: [
            {
              question: `What is a particular solution of $y'' - y' - 2y = 4e^{3t}$?`,
              options: [`$4e^{3t}$`, `$0.4e^{3t}$`, `$\\tfrac45 te^{3t}$`, `$e^{3t}$`],
              answer: 3,
              explanation: `Try $Ae^{3t}$: $(9 - 3 - 2)A = 4A = 4$, so $A = 1$. Since $3$ is not a characteristic root (the roots are $2$ and $-1$), no factor $t$ is needed, so $\\tfrac45 te^{3t}$ is the resonant form used where it does not apply. $0.4e^{3t}$ comes from the sign slip $9 + 3 - 2 = 10$.`,
            },
            {
              question: `What is the correct trial form for $y'' + 9y = e^t\\sin 3t$?`,
              options: [`$te^t(A\\cos 3t + B\\sin 3t)$`, `$e^t(A\\cos 3t + B\\sin 3t)$`, `$Ae^t\\sin 3t$`, `$t(A\\cos 3t + B\\sin 3t)$`],
              answer: 1,
              explanation: `The homogeneous roots are $\\pm 3i$, and the forcing corresponds to $1 \\pm 3i$, which is not a root, so no factor $t$ is needed; both sine and cosine are needed because derivatives mix them. The tempting $te^t(\\dots)$ reacts to the matching $\\sin 3t$, but resonance needs the whole exponent $1 + 3i$ to be a root.`,
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
              answer: `$y_1 = e^t$, $y_2 = te^t$, $W = e^{2t}$. Then $u_1' = -\\frac{y_2 g}{W} = -1$ and $u_2' = \\frac{y_1 g}{W} = \\frac1t$, so $u_1 = -t$, $u_2 = \\ln t$ and $Y = -te^t + te^t\\ln t$. Dropping the homogeneous $-te^t$, $Y = te^t\\ln t$, and $y = (c_1 + c_2t)e^t + te^t\\ln t$.`,
            },
            {
              slug: 'vop-variable-coefficients',
              title: 'Variable coefficients',
              prompt: `You know $y_1 = t^2$ and $y_2 = t^{-1}$ solve $t^2 y'' - 2y = 0$ on $t > 0$. Use variation of parameters to find a particular solution of $t^2 y'' - 2y = 3t^2 - 1$. Remember to put the equation in standard form first. Simplify by dropping any multiple of $y_1$ or $y_2$, and check by substitution.`,
              kind: 'problem',
              difficulty: 2,
              answer: `Standard form: $g = 3 - t^{-2}$, and $W = t^2(-t^{-2}) - 2t \\cdot t^{-1} = -3$. Then $u_1' = \\frac{1}{t} - \\frac{1}{3t^3}$, so $u_1 = \\ln t + \\frac{1}{6t^2}$, and $u_2' = -t^2 + \\frac13$, so $u_2 = -\\frac{t^3}{3} + \\frac t3$. This gives $Y = t^2\\ln t - \\frac{t^2}{3} + \\frac12$; drop $-\\frac{t^2}{3}$ to get $Y = t^2\\ln t + \\frac12$. Check: $Y'' = 2\\ln t + 3$, so $t^2Y'' - 2Y = 3t^2 - 1$.`,
            },
            {
              slug: 'tan-forcing',
              title: 'Tangent forcing',
              prompt: `Take $y'' + 4y = \\tan 2t$ on $(-\\pi/4, \\pi/4)$ with $y(0) = 0$, $y'(0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve it.`, answer: `$y_1 = \\cos 2t$, $y_2 = \\sin 2t$, $W = 2$. Then $u_1' = -\\frac{\\sin^2 2t}{2\\cos 2t} = -\\frac12(\\sec 2t - \\cos 2t)$ and $u_2' = \\frac12\\sin 2t$. Integrating from 0 (which builds in zero initial data): $y = \\frac14\\sin 2t - \\frac14\\cos 2t\\,\\ln(\\sec 2t + \\tan 2t)$.` },
                { prompt: `Evaluate $y(\\pi/8)$ and check it with a numerical solver.`, answer: `$y(\\pi/8) = \\frac{\\sqrt2}{8}\\big(1 - \\ln(1 + \\sqrt2)\\big) \\approx 0.020970$. \`solve_ivp\` at tight tolerance gives the same, $0.0209704$.` },
              ],
            },
            {
              slug: 'kernel-formula',
              title: 'Prove the kernel formula',
              prompt: `Let $y(t) = \\frac{1}{\\omega}\\int_0^t \\sin(\\omega(t - s))\\,g(s)\\,ds$ for continuous $g$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show by differentiating under the integral sign (using the Leibniz rule) that $y'' + \\omega^2 y = g$, $y(0) = y'(0) = 0$.`, answer: `The Leibniz rule gives $y' = \\frac1\\omega\\sin(0)g(t) + \\int_0^t\\cos(\\omega(t - s))g(s)\\,ds = \\int_0^t\\cos(\\omega(t - s))g(s)\\,ds$, then $y'' = g(t) - \\omega\\int_0^t\\sin(\\omega(t - s))g(s)\\,ds = g - \\omega^2 y$. Both integrals vanish at $t = 0$.` },
                { prompt: `Evaluate it for $g(s) = 1$ and check the result.`, answer: `$y = \\frac1\\omega\\left[\\frac{\\cos(\\omega(t - s))}{\\omega}\\right]_0^t = \\frac{1 - \\cos\\omega t}{\\omega^2}$. Check: $y'' = \\cos\\omega t$ and $\\omega^2y = 1 - \\cos\\omega t$, which add to 1, and $y(0) = y'(0) = 0$.` },
              ],
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
          quiz: [
            {
              question: `For $y'' - y = g(t)$ with $y_1 = e^t$ and $y_2 = e^{-t}$, variation of parameters uses $u_1' = -y_2g/W$. What is $u_1'$?`,
              options: [`$-\\tfrac12 e^{-t}g(t)$`, `$\\tfrac12 e^{t}g(t)$`, `$\\tfrac12 e^{-t}g(t)$`, `$-2e^{-t}g(t)$`],
              answer: 2,
              explanation: `$W = e^t(-e^{-t}) - e^te^{-t} = -2$, so $u_1' = -e^{-t}g/(-2) = \\tfrac12 e^{-t}g$. The option $-\\tfrac12 e^{-t}g$ treats the Wronskian as $+2$, and $-2e^{-t}g$ multiplies by $W$ instead of dividing.`,
            },
            {
              question: `For which forcing $g(t)$ in $y'' + 3y' + 2y = g(t)$ does undetermined coefficients fail, so that variation of parameters is needed?`,
              options: [`$\\ln t$`, `$t^3e^{2t}$`, `$e^{-t}\\cos 5t$`, `$t\\sin t$`],
              answer: 0,
              explanation: `Undetermined coefficients works when the derivatives of $g$ stay in a finite family: polynomials, exponentials, sines and cosines and their products. The derivatives of $\\ln t$ are $1/t, -1/t^2, \\dots$, an infinite family. $t^3e^{2t}$ looks harder, but the trial $(At^3 + Bt^2 + Ct + D)e^{2t}$ handles it.`,
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
              prompt: `For each system $mx'' + cx' + kx = 0$, find $\\omega_0 = \\sqrt{k/m}$ and the critical damping $c_{\\text{crit}} = 2\\sqrt{mk}$, and classify the motion.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$m = 2$, $c = 8$, $k = 6$`, answer: `$\\omega_0 = \\sqrt3 \\approx 1.73$, $c_{\\text{crit}} = 2\\sqrt{12} \\approx 6.93 < 8$: overdamped.` },
                { prompt: `$m = 1$, $c = 2$, $k = 10$, and give the frequency of the decaying oscillation`, answer: `$\\omega_0 = \\sqrt{10} \\approx 3.16$, $c_{\\text{crit}} = 2\\sqrt{10} \\approx 6.32 > 2$: underdamped. The roots are $-1 \\pm 3i$, so it oscillates at $\\omega_d = 3$ rad/s (period $2\\pi/3 \\approx 2.09$ s).` },
                { prompt: `$m = 4$, $c = 8$, $k = 4$`, answer: `$\\omega_0 = 1$, $c_{\\text{crit}} = 2\\sqrt{16} = 8 = c$: critically damped.` },
                { prompt: `In SI units, what are the units of $c$?`, answer: `$cx'$ is a force, so $c$ is in N s/m, which is kg/s.` },
              ],
            },
            {
              slug: 'rlc-analogy',
              title: 'An RLC circuit',
              prompt: `A series circuit has $L = 0.1$ H, $R = 2\\ \\Omega$, $C = 0.001$ F, with $q(0) = 0.01$ C and $I(0) = 0$, so $Lq'' + Rq' + q/C = 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve for the charge $q(t)$ and classify the damping.`, answer: `$q'' + 20q' + 10\\,000q = 0$ has roots $-10 \\pm i\\sqrt{9900} \\approx -10 \\pm 99.5i$, so it is underdamped. With $q'(0) = 0$: $q = e^{-10t}\\left(0.01\\cos 99.5t + \\frac{0.1}{99.5}\\sin 99.5t\\right) \\approx e^{-10t}(0.01\\cos 99.5t + 0.001005\\sin 99.5t)$ C.` },
                { prompt: `Give the time for the envelope to fall to 1% of its initial size.`, answer: `The envelope is proportional to $e^{-10t}$, so $t = \\frac{\\ln 100}{10} \\approx 0.461$ s.` },
              ],
            },
            {
              slug: 'derive-amplitude',
              title: 'Derive the amplitude and peak',
              prompt: `Start from $mx'' + cx' + kx = F_0\\cos\\omega t$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Derive $A(\\omega)$ and the formula for $\\omega_r$ using the complex method.`, answer: `Solve $mz'' + cz' + kz = F_0e^{i\\omega t}$ with $z = Ze^{i\\omega t}$: $Z = \\frac{F_0}{k - m\\omega^2 + ic\\omega}$, so $A = |Z| = \\frac{F_0}{\\sqrt{(k - m\\omega^2)^2 + c^2\\omega^2}}$. Minimise the denominator in $u = \\omega^2$: $-2m(k - mu) + c^2 = 0$, so $\\omega_r = \\sqrt{\\omega_0^2 - \\frac{c^2}{2m^2}}$, which exists when $c^2 < 2mk$.` },
                { prompt: `Show that the maximum amplitude is $F_0/(c\\,\\omega_d)$, where $\\omega_d = \\sqrt{\\omega_0^2 - (c/2m)^2}$.`, answer: `At $\\omega_r$, $k - m\\omega_r^2 = \\frac{c^2}{2m}$, so the squared denominator is $\\frac{c^4}{4m^2} + c^2\\left(\\omega_0^2 - \\frac{c^2}{2m^2}\\right) = c^2\\left(\\omega_0^2 - \\frac{c^2}{4m^2}\\right) = c^2\\omega_d^2$.` },
                { prompt: `Check this against the worked example.`, answer: `$m = 1$, $c = 0.4$, $k = 4$: $\\omega_d = \\sqrt{3.96} \\approx 1.990$, so $F_0/(c\\omega_d) = 1/0.796 \\approx 1.256$, matching $A(\\omega_r)$.` },
              ],
            },
            {
              slug: 'beats-to-resonance',
              title: 'From beats to resonance',
              prompt: `Take $x'' + 4x = \\cos(\\omega t)$, $x(0) = x'(0) = 0$.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `Solve it for $\\omega \\neq 2$.`, answer: `$x = \\frac{\\cos\\omega t - \\cos 2t}{4 - \\omega^2}$: the particular part $\\frac{\\cos\\omega t}{4 - \\omega^2}$ plus the homogeneous term that makes $x(0) = 0$; $x'(0) = 0$ holds automatically.` },
                { prompt: `Plot the solution for $\\omega = 1.8$ on $0 \\leq t \\leq 40$ and give the beat period, which is the time between zeros of the slow envelope.`, answer: `$x = \\frac{2}{0.76}\\sin(0.1t)\\sin(1.9t) \\approx 2.63\\sin(0.1t)\\sin(1.9t)$. You should see a fast oscillation inside the envelope $2.63|\\sin 0.1t|$, whose zeros are $\\pi/0.1 = 10\\pi \\approx 31.4$ apart.` },
                { prompt: `Take the limit $\\omega \\to 2$ by L'Hopital's rule to obtain the pure resonance solution, and confirm by substitution.`, answer: `Differentiate top and bottom in $\\omega$: $\\frac{-t\\sin\\omega t}{-2\\omega} \\to \\frac{t\\sin 2t}{4}$. Check: $x'' = \\cos 2t - t\\sin 2t$, so $x'' + 4x = \\cos 2t$, and $x(0) = x'(0) = 0$.` },
              ],
            },
            {
              slug: 'resonance-curve-plot',
              title: 'Plot resonance curves',
              prompt: `For $m = 1$, $k = 4$, $F_0 = 1$, the amplitude is $A(\\omega) = 1/\\sqrt{(4 - \\omega^2)^2 + c^2\\omega^2}$.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `Compute $A(\\omega)$ for $c = 0.1, 0.4, 1, 2\\sqrt{2}, 4$ and plot the curves on one axis. Mark $\\omega_r$ where it exists.`, answer: `$\\omega_r = \\sqrt{4 - c^2/2}$ exists for $c < 2\\sqrt2$. Peaks: $c = 0.1$: $\\omega_r \\approx 1.999$, $A \\approx 5.00$; $c = 0.4$: $1.980$, $1.256$; $c = 1$: $1.871$, $0.516$. For $c = 2\\sqrt2$ and $c = 4$ there is no peak: $A$ decreases from $A(0) = 0.25$.` },
                { prompt: `Confirm one point numerically: integrate the equation with \`solve_ivp\` for $c = 0.4$ and $\\omega = 1.98$ until the transient has gone, and measure the amplitude.`, answer: `The formula gives $A(1.98) \\approx 1.2563$. Integrating to $t = 200$ (the transient decays like $e^{-0.2t}$) and taking the largest $|x|$ on $[150, 200]$ gives $1.2563$ as well.` },
              ],
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
          quiz: [
            {
              question: `A 2 kg mass hangs on a spring with $k = 50$ N/m and a damper with $c = 4$ kg/s. How does it move when disturbed?`,
              options: [`Overdamped, because $c$ is much smaller than $k$`, `Underdamped, oscillating at about 4.90 rad/s`, `Underdamped, oscillating at 5 rad/s`, `Critically damped`],
              answer: 1,
              explanation: `$c_{\\text{crit}} = 2\\sqrt{mk} = 20 > 4$, so it is underdamped. The roots of $2r^2 + 4r + 50 = 0$ are $-1 \\pm \\sqrt{24}i$, so it oscillates at $\\omega_d = \\sqrt{24} \\approx 4.90$ rad/s. 5 rad/s is the undamped $\\omega_0$; damping lowers the frequency slightly. Comparing $c$ with $k$ directly is meaningless, since they have different units.`,
            },
            {
              question: `An oscillator with $m = 1$, $k = 9$, $c = 2$ is driven by $\\cos\\omega t$. At what driving frequency is the steady-state amplitude largest?`,
              options: [`$3$ rad/s, the natural frequency`, `$\\sqrt8 \\approx 2.83$ rad/s, the damped frequency`, `$\\sqrt5 \\approx 2.24$ rad/s`, `$\\sqrt7 \\approx 2.65$ rad/s`],
              answer: 3,
              explanation: `$\\omega_r = \\sqrt{\\omega_0^2 - c^2/(2m^2)} = \\sqrt{9 - 2} = \\sqrt7$. Three frequencies are easy to mix up here: $\\omega_0 = 3$, the free damped frequency $\\omega_d = \\sqrt{9 - 1} = \\sqrt8$, and the resonance peak $\\sqrt7$, which is lower than both. $\\sqrt5$ forgets the factor 2 in $c^2/(2m^2)$.`,
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
              prompt: `Find the general solution of each equation.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y'''' - 16y = 0$`, answer: `$r^4 - 16 = (r^2 - 4)(r^2 + 4)$, roots $\\pm 2$, $\\pm 2i$: $y = c_1e^{2t} + c_2e^{-2t} + c_3\\cos 2t + c_4\\sin 2t$.` },
                { prompt: `$y'''' + 2y'' + y = 0$`, answer: `$(r^2 + 1)^2$, so $\\pm i$ are double roots: $y = (c_1 + c_2t)\\cos t + (c_3 + c_4t)\\sin t$.` },
                { prompt: `$y''' - 3y'' + 3y' - y = 0$`, answer: `$(r - 1)^3$, a triple root: $y = (c_1 + c_2t + c_3t^2)e^t$.` },
                { prompt: `$y''' + y'' = 0$`, answer: `$r^2(r + 1)$: 0 is a double root, so $y = c_1 + c_2t + c_3e^{-t}$.` },
              ],
            },
            {
              slug: 'independence-tests',
              title: 'Independence tests',
              prompt: `Decide whether each set is independent on $\\mathbb{R}$, and justify your answer.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$1, t, t^2$`, answer: `Independent. The Wronskian matrix is upper triangular with diagonal $1, 1, 2$, so $W = 2 \\neq 0$.` },
                { prompt: `$1, \\cos 2t, \\sin^2 t$`, answer: `Dependent: $\\cos 2t = 1 - 2\\sin^2 t$, so $1 - \\cos 2t - 2\\sin^2 t = 0$ for all $t$.` },
                { prompt: `$e^t, e^{2t}, e^{3t}$; compute the Wronskian at $t = 0$ and recognise a Vandermonde determinant.`, answer: `At $t = 0$ the rows are $(1, 1, 1)$, $(1, 2, 3)$, $(1, 4, 9)$, a Vandermonde matrix in $1, 2, 3$, with determinant $(2 - 1)(3 - 1)(3 - 2) = 2 \\neq 0$. Independent.` },
                { prompt: `$t, |t|$, considered on $\\mathbb{R}$ and then on $t > 0$`, answer: `On $\\mathbb{R}$, $at + b|t| = 0$ at $t = 1$ and $t = -1$ gives $a + b = 0$ and $-a + b = 0$, so $a = b = 0$: independent. On $t > 0$, $|t| = t$, so they are dependent. (The Wronskian is not even defined at 0, since $|t|$ has no derivative there.)` },
              ],
            },
            {
              slug: 'third-order-ivp',
              title: 'A third-order forced problem',
              prompt: `Solve $y''' + y' = t$ with $y(0) = 0$, $y'(0) = 1$, $y''(0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              answer: `The roots are $0, \\pm i$. Constants solve the homogeneous equation, so the trial for $t$ needs a factor $t$: $Y = At^2 + Bt$ gives $2At + B = t$, so $Y = t^2/2$. Then $y = c_1 + c_2\\cos t + c_3\\sin t + t^2/2$, and the conditions give $c_1 + c_2 = 0$, $c_3 = 1$, $-c_2 + 1 = 0$. So $y = \\frac{t^2}{2} + \\cos t + \\sin t - 1$.`,
            },
            {
              slug: 'beam-deflection',
              title: 'A beam under uniform load',
              prompt: `The deflection of a uniform beam of length $L$ under load $w$ per unit length satisfies $EIy'''' = w$. For a beam clamped at $x = 0$ and free at $x = L$, the conditions are $y(0) = y'(0) = 0$ and $y''(L) = y'''(L) = 0$. Note that this is a boundary value problem rather than an initial value problem.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Solve, and show that the tip deflection is $wL^4/(8EI)$.`, answer: `$y = \\frac{wx^4}{24EI} + c_3x^3 + c_2x^2 + c_1x + c_0$. The clamp gives $c_0 = c_1 = 0$; $y'''(L) = 0$ gives $c_3 = -\\frac{wL}{6EI}$; $y''(L) = 0$ gives $c_2 = \\frac{wL^2}{4EI}$. So $y = \\frac{w}{24EI}(x^4 - 4Lx^3 + 6L^2x^2)$, and $y(L) = \\frac{3wL^4}{24EI} = \\frac{wL^4}{8EI}$.` },
                { prompt: `Why are four conditions right?`, answer: `A fourth-order linear equation has a four-parameter family of solutions, so four independent conditions fix one. Physically each end supplies two: the clamp fixes displacement and slope, and the free end has zero bending moment ($y''$) and zero shear force ($y'''$).` },
              ],
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
          quiz: [
            {
              question: `What is the general solution of $y''' - 4y' = 0$?`,
              options: [`$c_1e^{2t} + c_2e^{-2t}$`, `$c_1 + c_2e^{2t} + c_3e^{-2t}$`, `$c_1 + c_2\\cos 2t + c_3\\sin 2t$`, `$(c_1 + c_2t)e^{2t} + c_3e^{-2t}$`],
              answer: 1,
              explanation: `$r^3 - 4r = r(r - 2)(r + 2)$, with roots $0, 2, -2$. The root 0 contributes the constant $c_1$, and a third-order equation needs three constants. Dropping it gives the two-term option, which is the answer to $y'' - 4y = 0$. The sine and cosine option would come from $r^2 + 4$.`,
            },
            {
              question: `The characteristic polynomial of a linear constant-coefficient equation is $(r + 1)^3$. Which function is not a solution?`,
              options: [`$e^{-t}$`, `$te^{-t}$`, `$t^2e^{-t}$`, `$t^3e^{-t}$`],
              answer: 3,
              explanation: `A root of multiplicity 3 gives $e^{-t}$, $te^{-t}$ and $t^2e^{-t}$: three solutions for a third-order equation. The powers of $t$ stop one short of the multiplicity, so $t^3e^{-t}$ would need $(r + 1)^4$.`,
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
              prompt: `Apply the series method to $y'' + y = 0$ about $t = 0$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the recurrence.`, answer: `$(n + 2)(n + 1)a_{n+2} + a_n = 0$, so $a_{n+2} = -\\frac{a_n}{(n + 2)(n + 1)}$.` },
                { prompt: `Show that the two solutions are the Maclaurin series of $\\cos t$ and $\\sin t$.`, answer: `With $a_0 = 1$, $a_1 = 0$: $a_2 = -\\frac12$, $a_4 = \\frac{1}{24}$, and in general $a_{2k} = \\frac{(-1)^k}{(2k)!}$, the series of $\\cos t$. With $a_0 = 0$, $a_1 = 1$: $a_{2k+1} = \\frac{(-1)^k}{(2k + 1)!}$, the series of $\\sin t$.` },
              ],
            },
            {
              slug: 'first-order-series',
              title: 'A first-order series',
              prompt: `Solve $y' = 2ty$, $y(0) = 1$ by a power series about 0.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the recurrence.`, answer: `$\\sum (n + 1)a_{n+1}t^n = \\sum 2a_{n-1}t^n$ gives $a_1 = 0$ and $a_{n+1} = \\frac{2a_{n-1}}{n + 1}$ for $n \\geq 1$.` },
                { prompt: `Identify the sum in closed form.`, answer: `The odd coefficients vanish, and $a_0 = 1$, $a_2 = 1$, $a_4 = \\frac12$, $a_6 = \\frac16$: $a_{2k} = \\frac{1}{k!}$. So $y = \\sum \\frac{t^{2k}}{k!} = e^{t^2}$.` },
                { prompt: `Confirm by separation of variables.`, answer: `$dy/y = 2t\\,dt$ gives $\\ln y = t^2$, so $y = e^{t^2}$.` },
              ],
            },
            {
              slug: 'guaranteed-radius',
              title: 'Guaranteed radius',
              prompt: `Give the guaranteed minimum radius of convergence of series solutions: find the roots of the leading coefficient in the complex plane, and measure the distance from the centre there.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$(t^2 - 2t + 5)y'' + y = 0$ about $t_0 = 0$`, answer: `The roots are $1 \\pm 2i$, at distance $\\sqrt{1 + 4} = \\sqrt5 \\approx 2.24$ from 0.` },
                { prompt: `The same equation about $t_0 = 1$`, answer: `The distance from 1 to $1 \\pm 2i$ is 2.` },
                { prompt: `$(1 + t^2)y'' + ty' + y = 0$ about $t_0 = 1$`, answer: `The roots are $\\pm i$, at distance $\\sqrt{1 + 1} = \\sqrt2$ from 1.` },
                { prompt: `$(t^2 - 9)y'' + y' + y = 0$ about $t_0 = 1$`, answer: `The roots are $\\pm 3$, at distances 2 and 4, so the radius is 2.` },
              ],
            },
            {
              slug: 'airy-numerics',
              title: 'Check the Airy series numerically',
              prompt: `Compute the Airy coefficients by the recurrence up to $n = 60$, and take the solution with $a_0 = 1$, $a_1 = 0$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Evaluate it at $t = 2$ and $t = -6$, using partial sums, and compare with \`solve_ivp\` at tolerance $10^{-11}$.`, answer: `You should get $y(2) \\approx 2.7308830179$ and $y(-6) \\approx -0.5828293234$ from both methods, agreeing to about 9 or more digits.` },
                { prompt: `How many terms do you need for 8 correct digits at each point, and why does $t = -6$ need more?`, answer: `At $t = 2$, the partial sums settle by degree 21 (8 non-zero terms). At $t = -6$ you need about degree 57 (around 20 non-zero terms). The terms there grow to about 1300 before factorial decay wins, and they alternate in sign, so you must go much further out and lose about three digits to cancellation.` },
              ],
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
          quiz: [
            {
              question: `For $y'' + ty' + y = 0$, the series method gives $a_{n+2} = -\\dfrac{a_n}{n + 2}$. With $y(0) = 1$ and $y'(0) = 0$, what is $a_4$?`,
              options: [`$\\tfrac18$`, `$-\\tfrac18$`, `$\\tfrac{1}{24}$`, `$\\tfrac14$`],
              answer: 0,
              explanation: `$a_0 = 1$ gives $a_2 = -\\tfrac12$ and then $a_4 = -a_2/4 = \\tfrac18$. In fact this solution is $e^{-t^2/2} = 1 - \\tfrac{t^2}{2} + \\tfrac{t^4}{8} - \\dots$. The option $-\\tfrac18$ loses one of the two minus signs, and $\\tfrac{1}{24}$ uses $1/4!$ as if the series were that of an exponential in $t$.`,
            },
            {
              question: `What radius of convergence is guaranteed for series solutions about $t_0 = 0$ of $(t^2 + 4)y'' + y' + (t - 3)y = 0$?`,
              options: [`$3$`, `Infinite, since $t^2 + 4$ is never zero for real $t$`, `$2$`, `$4$`],
              answer: 2,
              explanation: `The singular points are the complex roots of the leading coefficient, $\\pm 2i$, at distance 2 from 0. Complex roots count even though the equation is studied on the real line. The root $t = 3$ of the coefficient of $y$ plays no role, since $t - 3$ is a polynomial and causes no singularity.`,
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
              prompt: `Take the Hermite equation $y'' - 2ty' + 2my = 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Derive the recurrence $a_{k+2} = \\frac{2(k - m)}{(k + 2)(k + 1)}a_k$.`, answer: `Collect $t^k$: $y''$ gives $(k + 2)(k + 1)a_{k+2}$, $-2ty'$ gives $-2ka_k$, and $2my$ gives $2ma_k$. Setting the sum to 0 gives the recurrence.` },
                { prompt: `For $m = 3$, find the polynomial solution with $y'(0) = 1$, and verify it by substitution.`, answer: `$a_1 = 1$, $a_3 = \\frac{2(1 - 3)}{6} = -\\frac23$, $a_5 = 0$: $y = t - \\frac23t^3$. Check: $y'' = -4t$ and $-4t - 2t(1 - 2t^2) + 6\\left(t - \\frac23t^3\\right) = 0$.` },
                { prompt: `For $m = 4$, find the polynomial solution with $y(0) = 1$, and verify it by substitution.`, answer: `$a_2 = \\frac{2(0 - 4)}{2} = -4$, $a_4 = \\frac{2(2 - 4)}{12}(-4) = \\frac43$, $a_6 = 0$: $y = 1 - 4t^2 + \\frac43t^4$. Check: $y'' = -8 + 16t^2$, $-2ty' = 16t^2 - \\frac{32}{3}t^4$ and $8y = 8 - 32t^2 + \\frac{32}{3}t^4$, which add to 0.` },
              ],
            },
            {
              slug: 'recentered-series',
              title: 'A series about $t_0 = 1$',
              prompt: `Take $y'' - ty = 0$ with $y(1) = 1$, $y'(1) = 0$, and work in powers of $x = t - 1$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the first five non-zero coefficients.`, answer: `In $x$ the equation is $y'' - (1 + x)y = 0$, so $(n + 2)(n + 1)b_{n+2} = b_n + b_{n-1}$. With $b_0 = 1$, $b_1 = 0$: $b_2 = \\frac12$, $b_3 = \\frac16$, $b_4 = \\frac{1}{24}$, $b_5 = \\frac{1}{30}$. So $y \\approx 1 + \\frac{x^2}{2} + \\frac{x^3}{6} + \\frac{x^4}{24} + \\frac{x^5}{30}$.` },
                { prompt: `Use them to estimate $y(1.5)$ and compare with a numerical solver.`, answer: `With $x = 0.5$: $1 + 0.125 + 0.020833 + 0.002604 + 0.001042 \\approx 1.14948$. A solver gives $1.14960$, so the five terms are good to about $1 \\times 10^{-4}$.` },
              ],
            },
            {
              slug: 'legendre-odd',
              title: 'Legendre cases',
              prompt: `Use the recurrence $a_{k+2} = \\frac{k(k + 1) - m(m + 1)}{(k + 2)(k + 1)}a_k$ for the Legendre equation.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Find the polynomial solution for $m = 3$, scaled so that $y(1) = 1$.`, answer: `Odd series: $a_1 = 1$, $a_3 = \\frac{2 - 12}{6} = -\\frac53$, then 0. So $t - \\frac53t^3$, with value $-\\frac23$ at 1. Scaled: $P_3 = \\frac12(5t^3 - 3t)$.` },
                { prompt: `Find the polynomial solution for $m = 4$, scaled so that $y(1) = 1$.`, answer: `Even series: $a_0 = 1$, $a_2 = -10$, $a_4 = \\frac{6 - 20}{12}(-10) = \\frac{35}{3}$, then 0. The value at 1 is $\\frac83$, so $P_4 = \\frac18(35t^4 - 30t^2 + 3)$.` },
                { prompt: `Show that for $m = 0$ the second, non-terminating series is $t + t^3/3 + t^5/5 + \\dots$, and identify it in closed form.`, answer: `With $m = 0$, $a_{k+2} = \\frac{k}{k + 2}a_k$, so from $a_1 = 1$: $a_3 = \\frac13$, $a_5 = \\frac15$, and $a_{2j+1} = \\frac{1}{2j + 1}$. This is $\\operatorname{artanh} t = \\frac12\\ln\\frac{1 + t}{1 - t}$.` },
                { prompt: `What happens as $t \\to 1^-$, and how does that fit with the guaranteed radius?`, answer: `It tends to infinity like $-\\frac12\\ln(1 - t)$. The singular points $\\pm 1$ give a guaranteed radius of 1, and this solution really is singular there, so the radius is exactly 1. Only the polynomial solution stays bounded at $t = \\pm 1$.` },
              ],
            },
            {
              slug: 'truncation-study',
              title: 'Measure truncation error',
              prompt: `For $(1 + t^2)y'' + y = 0$ with $y(0) = 1$, $y'(0) = 0$, compute the series coefficients to degree 40.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Evaluate partial sums at $t = 0.5$ and $t = 0.9$, and compare with \`solve_ivp\`.`, answer: `The recurrence is $a_{k+2} = -\\frac{k^2 - k + 1}{(k + 2)(k + 1)}a_k$, giving $1 - \\frac12t^2 + \\frac18t^4 - \\frac{13}{240}t^6 + \\dots$. At $t = 0.5$ the sums agree with the solver ($0.882067435138$) to about 12 digits. At $t = 0.9$ they converge slowly: degree 40 gives $0.656857$ against $0.656850$.` },
                { prompt: `Report what happens at $t = 1.1$, and connect it with the radius of convergence.`, answer: `The partial sums jump around with growing swings (about $0.497$, $0.535$, $0.501$, $0.546$ at degrees 10, 20, 30, 40), while the solver gives $0.5191$. The singular points $\\pm i$ make the radius 1, so the series diverges at $1.1$, even though the solution is perfectly smooth there.` },
              ],
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
          quiz: [
            {
              question: `Chebyshev's equation $(1 - t^2)y'' - ty' + n^2y = 0$ has the recurrence $a_{k+2} = \\dfrac{k^2 - n^2}{(k + 2)(k + 1)}a_k$. For $n = 2$, what is the solution with $y(0) = 1$, $y'(0) = 0$?`,
              options: [`$1 + 2t^2$`, `$1 - 4t^2$`, `$1 - 2t^2 + t^4$`, `$1 - 2t^2$`],
              answer: 3,
              explanation: `$a_2 = \\frac{0 - 4}{2}a_0 = -2$, and $a_4 = \\frac{4 - 4}{12}a_2 = 0$, so the even series stops: $y = 1 - 2t^2$, which is $-T_2(t)$. The option $1 - 4t^2$ forgets to divide by $(k + 2)(k + 1) = 2$, and the quartic option misses that the numerator vanishes at $k = n = 2$.`,
            },
            {
              question: `For $(4 + t^2)y'' + y = 0$, a typical solution's series about 0 has radius of convergence exactly 2. What happens if you sum 40 terms of it at $t = 3$?`,
              options: [`The solution itself stops existing at $|t| = 2$`, `The partial sums diverge at $t = 3$, although the solution exists there and a numerical solver handles it easily`, `The partial sums converge there, only more slowly`, `Taking more terms will eventually make the partial sums converge`],
              answer: 1,
              explanation: `The coefficients are continuous and $4 + t^2$ never vanishes on the real line, so the solution exists for all real $t$. The radius is limited by the complex singular points $\\pm 2i$, and beyond it the terms grow, so no number of terms helps. Thinking the solution itself ends at $|t| = 2$ confuses the reach of one series with the existence of the solution.`,
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
              prompt: `Find the Laplace transforms using the table and rules.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$3t^2 - 2 + e^{-t}$`, answer: `By linearity: $\\dfrac{6}{s^3} - \\dfrac{2}{s} + \\dfrac{1}{s + 1}$.` },
                { prompt: `$te^{2t}$`, answer: `Shift $\\mathcal{L}\\{t\\} = 1/s^2$ by 2: $\\dfrac{1}{(s - 2)^2}$.` },
                { prompt: `$e^{-t}\\sin 3t$`, answer: `Shift $\\dfrac{3}{s^2 + 9}$ by $-1$: $\\dfrac{3}{(s + 1)^2 + 9}$.` },
                { prompt: `$\\sin^2 t$, using a double-angle formula`, answer: `$\\sin^2 t = \\frac12(1 - \\cos 2t)$, so the transform is $\\dfrac{1}{2s} - \\dfrac{s}{2(s^2 + 4)} = \\dfrac{2}{s(s^2 + 4)}$.` },
              ],
            },
            {
              slug: 'inverse-drill',
              title: 'Inverse drill',
              prompt: `Find the inverse Laplace transforms.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\dfrac{1}{s^2(s + 1)}$`, answer: `Partial fractions: $\\dfrac{1}{s^2} - \\dfrac1s + \\dfrac{1}{s + 1}$, so $f = t - 1 + e^{-t}$.` },
                { prompt: `$\\dfrac{2s + 1}{s^2 + 4s + 13}$`, answer: `Complete the square: $\\dfrac{2(s + 2) - 3}{(s + 2)^2 + 9}$, so $f = e^{-2t}(2\\cos 3t - \\sin 3t)$.` },
                { prompt: `$\\dfrac{s}{(s + 1)(s^2 + 1)}$`, answer: `$\\dfrac{s}{(s + 1)(s^2 + 1)} = -\\dfrac{1/2}{s + 1} + \\dfrac{\\frac12 s + \\frac12}{s^2 + 1}$, so $f = -\\frac12e^{-t} + \\frac12\\cos t + \\frac12\\sin t$.` },
              ],
            },
            {
              slug: 'multiply-by-t',
              title: 'Multiplying by $t$',
              prompt: `Find a rule for the transform of $tf(t)$ and apply it.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Differentiate the definition under the integral sign to show that $\\mathcal{L}\\{tf(t)\\} = -F'(s)$.`, answer: `$F'(s) = \\frac{d}{ds}\\int_0^\\infty e^{-st}f(t)\\,dt = \\int_0^\\infty (-t)e^{-st}f(t)\\,dt = -\\mathcal{L}\\{tf(t)\\}$.` },
                { prompt: `Find $\\mathcal{L}\\{t\\sin t\\}$.`, answer: `$-\\frac{d}{ds}\\frac{1}{s^2 + 1} = \\dfrac{2s}{(s^2 + 1)^2}$.` },
                { prompt: `Find $\\mathcal{L}\\{t^2 e^{at}\\}$.`, answer: `Apply the rule twice: $\\frac{d^2}{ds^2}\\frac{1}{s - a} = \\dfrac{2}{(s - a)^3}$.` },
              ],
            },
            {
              slug: 'existence-limits',
              title: 'When the transform does not exist',
              prompt: `Test the edges of the existence theorem.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $e^{t^2}$ has no Laplace transform for any $s$.`, answer: `The integrand is $e^{t^2 - st}$, and $t^2 - st \\to \\infty$ as $t \\to \\infty$ for every $s$, so the integrand does not even tend to 0 and the integral diverges.` },
                { prompt: `Show that $1/t$ has none.`, answer: `Near 0, $\\int_0^1 \\frac{e^{-st}}{t}\\,dt \\geq e^{-|s|}\\int_0^1 \\frac{dt}{t} = \\infty$, so the integral diverges at the lower end.` },
                { prompt: `Show that $t^{-1/2}$, which is not piecewise continuous at 0, does have one, and that it equals $\\sqrt{\\pi/s}$, using the substitution $t = u^2/s$ and the Gaussian integral.`, answer: `With $t = u^2/s$, $dt = 2u\\,du/s$ and $t^{-1/2} = \\sqrt s/u$, so $\\int_0^\\infty t^{-1/2}e^{-st}\\,dt = \\frac{2}{\\sqrt s}\\int_0^\\infty e^{-u^2}\\,du = \\frac{2}{\\sqrt s}\\cdot\\frac{\\sqrt\\pi}{2} = \\sqrt{\\pi/s}$. The singularity at 0 is integrable, which is all that is needed.` },
              ],
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
          quiz: [
            {
              question: `What is the Laplace transform of $2t^3 - 5$?`,
              options: [`$\\dfrac{12}{s^4} - \\dfrac5s$`, `$\\dfrac{6}{s^4} - \\dfrac5s$`, `$\\dfrac{12}{s^3} - \\dfrac5s$`, `$\\dfrac{12}{s^4} - 5$`],
              answer: 0,
              explanation: `$\\mathcal{L}\\{t^n\\} = n!/s^{n+1}$, so $\\mathcal{L}\\{t^3\\} = 6/s^4$ and $2t^3$ gives $12/s^4$; the constant 5 gives $5/s$. The option $6/s^4$ uses $n = 3$ in place of $n! = 6$, and $-5$ forgets that a constant transforms to a multiple of $1/s$.`,
            },
            {
              question: `If $F(s) = \\mathcal{L}\\{f(t)\\}$, what is $\\mathcal{L}\\{e^{-4t}f(t)\\}$?`,
              options: [`$F(s - 4)$`, `$e^{-4s}F(s)$`, `$F(s + 4)$`, `$\\dfrac{F(s)}{s + 4}$`],
              answer: 2,
              explanation: `$\\int_0^\\infty e^{-st}e^{-4t}f(t)\\,dt = \\int_0^\\infty e^{-(s + 4)t}f(t)\\,dt = F(s + 4)$. $F(s - 4)$ has the shift in the wrong direction. $e^{-4s}F(s)$ is the other shift rule: it belongs to a delay in time, $u_4(t)f(t - 4)$, not to multiplication by an exponential.`,
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
              prompt: `Solve each initial value problem using Laplace transforms.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y'' - y' - 2y = 0$, $y(0) = 1$, $y'(0) = 0$`, answer: `$(s^2 - s - 2)Y = s - 1$, so $Y = \\frac{s - 1}{(s - 2)(s + 1)} = \\frac{1/3}{s - 2} + \\frac{2/3}{s + 1}$ and $y = \\frac13e^{2t} + \\frac23e^{-t}$.` },
                { prompt: `$y' + 3y = e^{-t}$, $y(0) = 2$`, answer: `$(s + 3)Y = 2 + \\frac{1}{s + 1}$, so $Y = \\frac{2}{s + 3} + \\frac{1/2}{s + 1} - \\frac{1/2}{s + 3}$ and $y = \\frac12e^{-t} + \\frac32e^{-3t}$.` },
                { prompt: `$y'' + 2y' + 2y = 0$, $y(0) = 0$, $y'(0) = 3$`, answer: `$(s^2 + 2s + 2)Y = 3$, so $Y = \\frac{3}{(s + 1)^2 + 1}$ and $y = 3e^{-t}\\sin t$.` },
              ],
            },
            {
              slug: 'resonance-by-laplace',
              title: 'Resonance by transforms',
              prompt: `Solve $y'' + 4y = \\sin 2t$ with $y(0) = y'(0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the inverse of $\\frac{2}{(s^2 + 4)^2}$, using the rule from the exercise on multiplying by $t$.`, answer: `$\\mathcal{L}\\{t\\cos 2t\\} = -\\frac{d}{ds}\\frac{s}{s^2 + 4} = \\frac{s^2 - 4}{(s^2 + 4)^2}$. Since $\\frac{1}{s^2 + 4} - \\frac{s^2 - 4}{(s^2 + 4)^2} = \\frac{8}{(s^2 + 4)^2}$, the inverse is $\\frac14\\left(\\frac12\\sin 2t - t\\cos 2t\\right) = \\frac18\\sin 2t - \\frac14t\\cos 2t$.` },
                { prompt: `Solve the equation, and check your answer by substituting it.`, answer: `$(s^2 + 4)Y = \\frac{2}{s^2 + 4}$, so $y = \\frac18\\sin 2t - \\frac14t\\cos 2t$. Check: $y'' = -\\frac12\\sin 2t + \\sin 2t + t\\cos 2t = \\frac12\\sin 2t + t\\cos 2t$, and $4y = \\frac12\\sin 2t - t\\cos 2t$; they add to $\\sin 2t$, and $y(0) = y'(0) = 0$.` },
              ],
            },
            {
              slug: 'system-by-laplace',
              title: 'A system by transforms',
              prompt: `Solve $x' = 2y$, $y' = 2x$ with $x(0) = 1$, $y(0) = 0$ by transforming both equations and solving a $2 \\times 2$ algebra problem for $X(s)$ and $Y(s)$.`,
              kind: 'problem',
              difficulty: 2,
              answer: `The transforms give $sX - 1 = 2Y$ and $sY = 2X$. Substituting $Y = 2X/s$ gives $X = \\frac{s}{s^2 - 4}$ and $Y = \\frac{2}{s^2 - 4}$, so $x = \\cosh 2t$ and $y = \\sinh 2t$.`,
            },
            {
              slug: 'poles-to-behaviour',
              title: 'From poles to behaviour',
              prompt: `Without inverting, describe the long-term behaviour of $y(t)$ for each transform, and state the rate.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\frac{1}{(s + 2)(s^2 + 2s + 10)}$`, answer: `Poles at $-2$ and $-1 \\pm 3i$, all in the left half-plane, so $y \\to 0$. The slowest pole, $-1 \\pm 3i$, dominates: a decaying oscillation like $e^{-t}\\sin(3t + \\phi)$.` },
                { prompt: `$\\frac{s}{(s - 1)(s + 5)}$`, answer: `The pole at 1 makes $y$ grow like $e^t$ (in fact $y = \\frac16e^t + \\frac56e^{-5t}$).` },
                { prompt: `$\\frac{1}{s(s + 1)}$, and invert it to confirm`, answer: `The pole at 0 gives a constant limit, approached at the rate $e^{-t}$. Indeed $y = 1 - e^{-t} \\to 1$.` },
                { prompt: `$\\frac{1}{(s^2 + 1)^2}$, and invert it to confirm`, answer: `Double poles at $\\pm i$ on the imaginary axis give an oscillation whose amplitude grows linearly in $t$. Indeed $y = \\frac12(\\sin t - t\\cos t)$.` },
              ],
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
          quiz: [
            {
              question: `Transforming $y' + 2y = 4$ with $y(0) = 1$ gives which $Y(s)$?`,
              options: [`$\\dfrac{4}{s(s + 2)}$`, `$\\dfrac{5}{s + 2}$`, `$\\dfrac{s + 4}{s(s + 2)}$`, `$\\dfrac{s + 4}{s + 2}$`],
              answer: 2,
              explanation: `$sY - 1 + 2Y = 4/s$, so $(s + 2)Y = 1 + 4/s = (s + 4)/s$ and $Y = \\frac{s + 4}{s(s + 2)}$, which inverts to $y = 2 - e^{-2t}$. $\\frac{4}{s(s + 2)}$ drops the initial value, and $\\frac{5}{s + 2}$ transforms the constant 4 as 4 instead of $4/s$.`,
            },
            {
              question: `With $y(0) = a$ and $y'(0) = b$, what is $\\mathcal{L}\\{y''\\}$?`,
              options: [`$s^2Y - as - b$`, `$s^2Y - a - bs$`, `$s^2Y - as^2 - bs$`, `$s^2Y + as + b$`],
              answer: 0,
              explanation: `Apply $\\mathcal{L}\\{f'\\} = sF - f(0)$ twice: $\\mathcal{L}\\{y''\\} = s(sY - a) - b = s^2Y - as - b$. The factor $s$ goes with $y(0)$, not $y'(0)$, because $y(0)$ entered one step earlier and was multiplied by $s$ in the second step; the option $s^2Y - a - bs$ swaps them.`,
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
              prompt: `Let $f(t) = t$ for $0 \\leq t < 2$ and $f(t) = 2$ for $t \\geq 2$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write $f$ using a step function, and show that $F(s) = (1 - e^{-2s})/s^2$.`, answer: `$f = t + u_2(t)(2 - t) = t - u_2(t)(t - 2)$. The shift rule gives $\\frac{1}{s^2} - e^{-2s}\\frac{1}{s^2}$.` },
                { prompt: `Transform $g(t) = u_1(t)\\,t^2$.`, answer: `Write $t^2 = (t - 1)^2 + 2(t - 1) + 1$, so $G(s) = e^{-s}\\left(\\frac{2}{s^3} + \\frac{2}{s^2} + \\frac1s\\right)$.` },
              ],
            },
            {
              slug: 'first-order-switch',
              title: 'A switched first-order system',
              prompt: `Solve switched forms of $y' + y = g(t)$ with $y(0) = 0$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Solve $y' + y = u_1(t)$ and plot the solution.`, answer: `$Y = \\frac{e^{-s}}{s(s + 1)}$, so $y = u_1(t)\\left(1 - e^{-(t - 1)}\\right)$: zero until $t = 1$, then rising towards 1 with a corner at $t = 1$.` },
                { prompt: `Solve $y' + y = u_1(t) - u_3(t)$, and give the value of $y$ at $t = 3$ and the limit as $t \\to \\infty$.`, answer: `$y = u_1(t)\\left(1 - e^{-(t - 1)}\\right) - u_3(t)\\left(1 - e^{-(t - 3)}\\right)$. At $t = 3$, $y = 1 - e^{-2} \\approx 0.865$. For $t > 3$, $y = (1 - e^{-2})e^{-(t - 3)} \\to 0$.` },
              ],
            },
            {
              slug: 'overdamped-pulse',
              title: 'A pulse on an overdamped system',
              prompt: `Solve $y'' + 3y' + 2y = 1 - u_2(t)$ with $y(0) = y'(0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Give the formula on each side of $t = 2$.`, answer: `The step response is $g(t) = \\frac12 - e^{-t} + \\frac12e^{-2t}$, from $\\frac{1}{s(s + 1)(s + 2)}$, and $y = g(t) - u_2(t)g(t - 2)$. For $t < 2$, $y = g(t)$. For $t \\geq 2$, $y = (e^2 - 1)e^{-t} - \\frac12(e^4 - 1)e^{-2t}$.` },
                { prompt: `Confirm that $y$ and $y'$ are continuous at $t = 2$.`, answer: `The jump is $-u_2(t)g(t - 2)$, and $g(0) = 0$, $g'(0) = 0$, so neither $y$ nor $y'$ jumps; only $y''$ jumps, by $-1$.` },
                { prompt: `Find the maximum of $y$, and check it against a numerical solution.`, answer: `$y$ rises while the force is on. Afterwards $y' = 0$ when $e^{-t} = \\frac{1}{e^2 + 1}$, at $t = \\ln(e^2 + 1) \\approx 2.127$, where $y = \\frac12\\cdot\\frac{e^2 - 1}{e^2 + 1} = \\frac12\\tanh 1 \\approx 0.3808$. \`solve_ivp\` gives the same value.` },
              ],
            },
            {
              slug: 'square-wave-transform',
              title: 'Transform of a square wave',
              prompt: `Let $f$ have period $2a$ with $f = 1$ on $[0, a)$ and $f = 0$ on $[a, 2a)$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove the periodic transform formula.`, answer: `For period $T$, split $\\int_0^\\infty$ into intervals $[nT, (n + 1)T)$ and substitute $t = \\tau + nT$: each gives $e^{-nTs}\\int_0^T e^{-s\\tau}f(\\tau)\\,d\\tau$. Summing the geometric series, $F(s) = \\frac{1}{1 - e^{-Ts}}\\int_0^T e^{-st}f(t)\\,dt$ for $s > 0$.` },
                { prompt: `Show that $F(s) = \\dfrac{1}{s(1 + e^{-as})}$.`, answer: `$\\int_0^a e^{-st}\\,dt = \\frac{1 - e^{-as}}{s}$, and $1 - e^{-2as} = (1 - e^{-as})(1 + e^{-as})$, so $F = \\frac{1 - e^{-as}}{s(1 - e^{-2as})} = \\frac{1}{s(1 + e^{-as})}$.` },
                { prompt: `Use it to write the solution of $y' + y = f(t)$, $y(0) = 0$ as a sum of delayed responses, and describe the behaviour for large $t$.`, answer: `$Y = \\frac{1}{s(s + 1)}\\sum_{n \\geq 0}(-1)^ne^{-nas}$, so $y = \\sum_{n \\geq 0}(-1)^nu_{na}(t)\\left(1 - e^{-(t - na)}\\right)$. For large $t$ it settles into a periodic wave of exponential rises and decays, rising to $\\frac{1}{1 + e^{-a}}$ while the input is on and decaying to $\\frac{e^{-a}}{1 + e^{-a}}$ while it is off, averaging $\\frac12$.` },
              ],
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
          quiz: [
            {
              question: `What is $\\mathcal{L}\\{u_2(t)e^t\\}$?`,
              options: [`$\\dfrac{e^{-2s}}{s - 1}$`, `$\\dfrac{e^{-2s}}{s - 3}$`, `$\\dfrac{e^{-2s}}{s(s - 1)}$`, `$\\dfrac{e^{2 - 2s}}{s - 1}$`],
              answer: 3,
              explanation: `The shift rule needs the function written in terms of $t - 2$: $e^t = e^2e^{t - 2}$. So $\\mathcal{L}\\{u_2(t)e^2e^{t - 2}\\} = e^2e^{-2s}\\frac{1}{s - 1}$. The option $\\frac{e^{-2s}}{s - 1}$ is the transform of $u_2(t)e^{t - 2}$, which forgets to rewrite the function before applying the rule.`,
            },
            {
              question: `Which expression equals 5 on $1 \\leq t < 4$ and 0 for all other $t \\geq 0$?`,
              options: [`$5u_1(t) + 5u_4(t)$`, `$5u_1(t) - 5u_4(t)$`, `$5u_4(t) - 5u_1(t)$`, `$5u_1(t)u_4(t)$`],
              answer: 1,
              explanation: `$5u_1$ switches 5 on at $t = 1$, and subtracting $5u_4$ switches it off at $t = 4$. $5u_4 - 5u_1$ gives $-5$ on the window, and the product $u_1u_4$ equals $u_4$, which is on after 4 and off before it.`,
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
              prompt: `Solve each problem, give the jump in $y'$, and sketch the solution.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y'' + y = \\delta(t - \\pi)$, $y(0) = y'(0) = 0$`, answer: `$Y = \\frac{e^{-\\pi s}}{s^2 + 1}$, so $y = u_\\pi(t)\\sin(t - \\pi) = -u_\\pi(t)\\sin t$. $y'$ jumps by 1 at $t = \\pi$. The sketch is zero until $\\pi$, then a sine wave of amplitude 1 starting upward.` },
                { prompt: `$y'' + 2y' + y = \\delta(t - 1)$, $y(0) = y'(0) = 0$`, answer: `$Y = \\frac{e^{-s}}{(s + 1)^2}$, so $y = u_1(t)(t - 1)e^{-(t - 1)}$. $y'$ jumps by 1 at $t = 1$. The sketch rises to a peak of $1/e$ at $t = 2$ and then decays without oscillating.` },
              ],
            },
            {
              slug: 'timed-kicks',
              title: 'Timing two kicks',
              prompt: `An undamped oscillator $y'' + y = \\delta(t) + A\\,\\delta(t - c)$ is at rest before $t = 0$. Treat the first kick as giving $y'(0^+) = 1$, so $y = \\sin t + Au_c(t)\\sin(t - c)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `For $A = 1$, $c = \\pi$, show that the motion stops completely after the second kick.`, answer: `For $t > \\pi$, $y = \\sin t + \\sin(t - \\pi) = \\sin t - \\sin t = 0$. The second kick arrives when the velocity is $-1$ and cancels it at $y = 0$.` },
                { prompt: `For $A = 1$, $c = 2\\pi$, find the amplitude after the second kick.`, answer: `$y = \\sin t + \\sin(t - 2\\pi) = 2\\sin t$, so the amplitude is 2.` },
                { prompt: `Find the amplitude after the second kick for general $A$ and $c$.`, answer: `Add the sinusoids as phasors: $\\sin t + A\\sin(t - c) = (1 + A\\cos c)\\sin t - A\\sin c\\cos t$, with amplitude $\\sqrt{1 + 2A\\cos c + A^2}$.` },
              ],
            },
            {
              slug: 'pulse-limit',
              title: 'Watch the pulse become an impulse',
              prompt: `Take $y'' + y = \\frac{1}{\\epsilon}[u_1(t) - u_{1+\\epsilon}(t)]$ with $y(0) = y'(0) = 0$.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `Solve it exactly.`, answer: `The step response of $y'' + y$ is $1 - \\cos t$, so $y = \\frac1\\epsilon u_1(t)\\big(1 - \\cos(t - 1)\\big) - \\frac1\\epsilon u_{1+\\epsilon}(t)\\big(1 - \\cos(t - 1 - \\epsilon)\\big)$.` },
                { prompt: `Show that the solution tends to $u_1(t)\\sin(t - 1)$ as $\\epsilon \\to 0$.`, answer: `For $t > 1 + \\epsilon$, $y = \\frac{\\cos(t - 1 - \\epsilon) - \\cos(t - 1)}{\\epsilon}$, a difference quotient of $\\cos$, which tends to $\\sin(t - 1)$. On $(1, 1 + \\epsilon)$, $y = \\frac{1 - \\cos(t - 1)}{\\epsilon} \\leq \\frac{\\epsilon}{2}$, which tends to 0.` },
                { prompt: `For $\\epsilon = 1, 0.1, 0.01$, find the maximum difference between the two on $[0, 10]$ and see how it scales.`, answer: `About $0.486$, $0.0500$ and $0.00500$. The difference is close to $\\epsilon/2$ for small $\\epsilon$: it scales linearly, like a phase lag of half the pulse width.` },
              ],
            },
            {
              slug: 'nonzero-initial-with-impulse',
              title: 'Initial data versus an impulse',
              prompt: `Compare $y'' + 3y' + 2y = 0$ with $y(0) = 0$, $y'(0) = 1$ and the equation $y'' + 3y' + 2y = \\delta(t)$ with zero initial data (the delta taken to act just after $t = 0$).`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that they have the same solution for $t > 0$, and find it.`, answer: `The first gives $(s^2 + 3s + 2)Y - 1 = 0$; the second gives $(s^2 + 3s + 2)Y = 1$. Both give $Y = \\frac{1}{(s + 1)(s + 2)}$, so $y = e^{-t} - e^{-2t}$.` },
                { prompt: `Explain in terms of momentum why this makes sense.`, answer: `A unit impulse transfers momentum 1 instantly. For unit mass the velocity jumps from 0 to 1 while the position has no time to change, which is exactly the initial data $y(0) = 0$, $y'(0) = 1$.` },
              ],
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
          quiz: [
            {
              question: `What is the solution of $y'' + 4y = 3\\delta(t - 1)$ with $y(0) = y'(0) = 0$?`,
              options: [`$\\tfrac32u_1(t)\\sin(2(t - 1))$`, `$3u_1(t)\\sin(2(t - 1))$`, `$\\tfrac32\\sin(2(t - 1))$ for all $t \\geq 0$`, `$\\tfrac32u_1(t)\\sin 2t$`],
              answer: 0,
              explanation: `$(s^2 + 4)Y = 3e^{-s}$, and $\\frac{3}{s^2 + 4}$ inverts to $\\frac32\\sin 2t$; the factor $e^{-s}$ delays it to $\\frac32u_1(t)\\sin(2(t - 1))$. The option without $\\frac12$ forgets that $\\mathcal{L}\\{\\sin 2t\\} = \\frac{2}{s^2 + 4}$, and $\\sin 2t$ forgets to shift the argument along with the step.`,
            },
            {
              question: `A unit impulse $\\delta(t - 2)$ hits $y'' + y$ at rest. What happens at $t = 2$?`,
              options: [`$y$ jumps by 1 and $y'$ is continuous`, `$y$ and $y'$ both jump by 1`, `Neither jumps; only $y''$ is momentarily infinite`, `$y'$ jumps by 1 and $y$ is continuous`],
              answer: 3,
              explanation: `Integrating the equation across $t = 2$ gives $y'(2^+) - y'(2^-) = 1$, since $\\int y\\,dt$ over a vanishing interval is 0. A jump in $y'$ means $y$ has a corner but stays continuous. If $y$ itself jumped, $y'$ would contain a delta and $y''$ a derivative of one, which the right side does not have.`,
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
              prompt: `Compute each convolution from the definition, and confirm it using the convolution theorem.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$1 * t$`, answer: `$\\int_0^t \\tau\\,d\\tau = \\frac{t^2}{2}$. Theorem: $\\frac1s\\cdot\\frac{1}{s^2} = \\frac{1}{s^3}$, which inverts to $\\frac{t^2}{2}$.` },
                { prompt: `$t * t$`, answer: `$\\int_0^t (t - \\tau)\\tau\\,d\\tau = \\frac{t^3}{2} - \\frac{t^3}{3} = \\frac{t^3}{6}$. Theorem: $\\frac{1}{s^4}$ inverts to $\\frac{t^3}{6}$.` },
                { prompt: `$e^{t} * e^{2t}$`, answer: `$\\int_0^t e^{t - \\tau}e^{2\\tau}\\,d\\tau = e^t(e^t - 1) = e^{2t} - e^t$. Theorem: $\\frac{1}{(s - 1)(s - 2)} = \\frac{1}{s - 2} - \\frac{1}{s - 1}$.` },
                { prompt: `$\\sin t * \\cos t$`, answer: `$\\int_0^t \\sin(t - \\tau)\\cos\\tau\\,d\\tau = \\frac12\\int_0^t \\big[\\sin t + \\sin(t - 2\\tau)\\big]\\,d\\tau = \\frac12t\\sin t$. Theorem: $\\frac{s}{(s^2 + 1)^2}$ inverts to $\\frac12t\\sin t$.` },
              ],
            },
            {
              slug: 'volterra-equation',
              title: 'An integral equation',
              prompt: `Take $y(t) = t + \\int_0^t (t - \\tau)y(\\tau)\\,d\\tau$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve it using the transform.`, answer: `The integral is $t * y$, so $Y = \\frac{1}{s^2} + \\frac{Y}{s^2}$, giving $Y = \\frac{1}{s^2 - 1}$ and $y = \\sinh t$.` },
                { prompt: `Check your answer by differentiating the equation twice to turn it into an initial value problem.`, answer: `$y' = 1 + \\int_0^t y(\\tau)\\,d\\tau$ and $y'' = y$, with $y(0) = 0$ and $y'(0) = 1$ from the equations at $t = 0$. The solution is $\\sinh t$.` },
              ],
            },
            {
              slug: 'prove-convolution-theorem',
              title: 'Prove the convolution theorem',
              prompt: `Assume $f$ and $g$ are continuous and of exponential order.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $\\mathcal{L}\\{f * g\\} = FG$ by writing the product as a double integral and changing variables. Sketch the region of integration in the $(t, \\tau)$ plane.`, answer: `$F(s)G(s) = \\int_0^\\infty\\int_0^\\infty e^{-s(\\tau + u)}f(\\tau)g(u)\\,du\\,d\\tau$. Put $t = \\tau + u$ in the inner integral: $\\int_0^\\infty\\int_\\tau^\\infty e^{-st}f(\\tau)g(t - \\tau)\\,dt\\,d\\tau$. The region is the wedge $0 \\leq \\tau \\leq t$, below the line $\\tau = t$. Swapping the order (allowed by absolute convergence for large $s$) gives $\\int_0^\\infty e^{-st}\\int_0^t f(\\tau)g(t - \\tau)\\,d\\tau\\,dt = \\mathcal{L}\\{f * g\\}$.` },
                { prompt: `Then prove that $f * g = g * f$.`, answer: `Substitute $u = t - \\tau$ in $\\int_0^t f(\\tau)g(t - \\tau)\\,d\\tau$: it becomes $\\int_0^t f(t - u)g(u)\\,du = (g * f)(t)$.` },
              ],
            },
            {
              slug: 'convolve-numerically',
              title: 'Response by discrete convolution',
              prompt: `For $y'' + 2y' + 5y = g(t)$ at rest, use $h(t) = \\frac12 e^{-t}\\sin 2t$, and take $g$ to be the square wave of period 4 equal to 1 on $[0, 2)$ and 0 on $[2, 4)$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Compute $y$ on $[0, 30]$ by a discrete convolution with \`numpy.convolve\`, using step $dt = 0.005$. Compare with \`solve_ivp\`, and report the maximum difference.`, answer: `Sketch: \`y = np.convolve(h, g)[:len(t)] * dt\`. The response rises to about 0.25 when the input is on and decays when it is off. The maximum difference from \`solve_ivp\` should be below $10^{-3}$ (about $7 \\times 10^{-4}$ with a left-endpoint sum), and it halves when $dt$ is halved.` },
                { prompt: `Explain the factor of $dt$ in the discrete sum.`, answer: `$y(t_n) = \\int_0^{t_n}h(t_n - \\tau)g(\\tau)\\,d\\tau \\approx \\sum_k h(t_n - t_k)g(t_k)\\,dt$. \`numpy.convolve\` computes only the sum $\\sum_k h_{n-k}g_k$, so multiplying by $dt$ turns it into a Riemann sum for the integral.` },
              ],
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
          quiz: [
            {
              question: `What is the convolution $t * e^t = \\int_0^t (t - \\tau)e^\\tau\\,d\\tau$?`,
              options: [`$te^t$`, `$e^t - 1$`, `$e^t - t - 1$`, `$\\tfrac12t^2e^t$`],
              answer: 2,
              explanation: `By the theorem, $\\frac{1}{s^2}\\cdot\\frac{1}{s - 1} = \\frac{1}{s - 1} - \\frac1s - \\frac{1}{s^2}$, which inverts to $e^t - 1 - t$; integrating by parts gives the same. $te^t$ is the ordinary product, which is a different operation: the transform of a product is not the product of transforms.`,
            },
            {
              question: `A system at rest has impulse response $h(t) = e^{-t}\\sin t$. What is its response to a forcing $g(t)$?`,
              options: [`$h(t)g(t)$`, `$\\int_0^t h(t - \\tau)g(\\tau)\\,d\\tau$`, `The inverse transform of $H(s) + G(s)$`, `$g(t)\\int_0^t h(\\tau)\\,d\\tau$`],
              answer: 1,
              explanation: `The forcing is a sum of impulses $g(\\tau)\\,d\\tau$ at times $\\tau$, each producing $h(t - \\tau)g(\\tau)\\,d\\tau$; adding them gives the convolution, and in transforms $Y = HG$. The product $h(t)g(t)$ would mean the response at time $t$ depends only on the forcing at that instant, ignoring the memory of earlier forcing.`,
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
              prompt: `Let $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find $\\det A$ and $A^{-1}$.`, answer: `$\\det A = 6 - 5 = 1$, so $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$: swap the diagonal, negate the off-diagonal, divide by the determinant.` },
                { prompt: `Solve $Ax = (1, 2)^T$, and check by multiplying.`, answer: `$x = A^{-1}(1, 2)^T = (3 - 2, -5 + 4)^T = (1, -1)^T$. Check: $2 - 1 = 1$ and $5 - 3 = 2$.` },
                { prompt: `Find a value of $k$ for which $\\begin{pmatrix} 2 & 1 \\\\ k & 3 \\end{pmatrix}$ has no inverse.`, answer: `The determinant $6 - k$ is 0 when $k = 6$.` },
              ],
            },
            {
              slug: 'eigen-drill',
              title: 'Eigenvalue drill',
              prompt: `Find the eigenvalues and eigenvectors, and check them against the trace and determinant.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\begin{pmatrix} 4 & -2 \\\\ 1 & 1 \\end{pmatrix}$`, answer: `$\\lambda^2 - 5\\lambda + 6 = 0$, so $\\lambda = 2$ with $v = (1, 1)$ and $\\lambda = 3$ with $v = (2, 1)$. Sum 5 = trace, product 6 = determinant.` },
                { prompt: `$\\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$`, answer: `$\\lambda = 3$, repeated, with only one independent eigenvector $(1, 0)$. Sum 6, product 9.` },
                { prompt: `$\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$`, answer: `$\\lambda^2 - 2\\lambda + 2 = 0$, so $\\lambda = 1 \\pm i$. For $1 + i$, the first row of $A - \\lambda I$ is $(-i, -1)$, giving $v = (1, -i)$; for $1 - i$, $v = (1, i)$. Sum 2, product 2.` },
                { prompt: `The $3 \\times 3$ triangular matrix with rows $(2, 0, 0)$, $(1, 3, 0)$, $(0, 0, -1)$`, answer: `The eigenvalues are the diagonal entries: $2$ with $v = (1, -1, 0)$, $3$ with $v = (0, 1, 0)$, and $-1$ with $v = (0, 0, 1)$. Sum $4$ = trace, product $-6$ = determinant.` },
              ],
            },
            {
              slug: 'independent-eigenvectors',
              title: 'Distinct eigenvalues give independent vectors',
              prompt: `Prove two basic facts about eigenvalues.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Suppose $Av = \\lambda v$ and $Aw = \\mu w$ with $\\lambda \\neq \\mu$ and $v, w$ non-zero. Prove that $v$ and $w$ are independent.`, answer: `Suppose $av + bw = 0$. Applying $A$ gives $a\\lambda v + b\\mu w = 0$. Subtract $\\lambda$ times the original: $b(\\mu - \\lambda)w = 0$. Since $\\mu \\neq \\lambda$ and $w \\neq 0$, $b = 0$, and then $av = 0$ gives $a = 0$.` },
                { prompt: `Prove that for any $2 \\times 2$ matrix the eigenvalues add to the trace and multiply to the determinant, using the factorisation of the characteristic polynomial.`, answer: `Expanding, $\\det(A - \\lambda I) = \\lambda^2 - (a + d)\\lambda + (ad - bc)$. It also equals $(\\lambda - \\lambda_1)(\\lambda - \\lambda_2) = \\lambda^2 - (\\lambda_1 + \\lambda_2)\\lambda + \\lambda_1\\lambda_2$. Compare coefficients.` },
              ],
            },
            {
              slug: 'numpy-eigen',
              title: 'Eigenvalues in NumPy',
              prompt: `Use \`numpy.linalg.eig\` on $\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$ and on $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. NumPy scales the eigenvectors to unit length and stores them as columns.`,
              kind: 'coding',
              difficulty: 1,
              parts: [
                { prompt: `Explain how the returned eigenvectors relate to the ones in this lesson.`, answer: `For the first matrix NumPy returns eigenvalues $3, -1$ and columns $(0.7071, 0.7071)$ and $(-0.7071, 0.7071)$: the lesson's $(1, 1)$ and $(1, -1)$ divided by $\\sqrt2$, the second multiplied by $-1$. For the rotation it returns $\\pm i$ with columns $(0.7071, -0.7071i)$ and $(0.7071, 0.7071i)$, which are $(1, \\mp i)/\\sqrt2$. Any non-zero multiple of an eigenvector is an eigenvector, so these are the same answers.` },
                { prompt: `Verify $Av = \\lambda v$ numerically.`, answer: `\`np.allclose(A @ V, V * w)\` returns \`True\`: column $j$ of $AV$ equals $w_j$ times column $j$ of $V$, up to rounding of order $10^{-16}$.` },
              ],
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
          quiz: [
            {
              question: `What are the eigenvalues of $\\begin{pmatrix} 5 & 2 \\\\ 2 & 2 \\end{pmatrix}$?`,
              options: [`$5$ and $2$`, `$1$ and $6$`, `$-1$ and $-6$`, `$3$ and $4$`],
              answer: 1,
              explanation: `The trace is 7 and the determinant is $10 - 4 = 6$, so $\\lambda^2 - 7\\lambda + 6 = 0$ and $\\lambda = 1, 6$. Reading off the diagonal entries 5 and 2 works only for triangular matrices, and it fails here: they multiply to 10, not to the determinant 6.`,
            },
            {
              question: `A $2 \\times 2$ matrix $A$ has $\\det A = 0$. Which statement is true?`,
              options: [`$A$ has no eigenvalues`, `$A$ must be the zero matrix`, `$Ax = b$ has exactly one solution for every $b$`, `0 is an eigenvalue: $Av = 0$ for some non-zero $v$`],
              answer: 3,
              explanation: `$\\det(A - 0I) = 0$ is exactly the condition for $\\lambda = 0$ to be an eigenvalue, so some non-zero $v$ is sent to 0. That makes $A$ singular, so $Ax = b$ has either no solution or infinitely many, never exactly one. $A$ need not be zero: $\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$ has determinant 0.`,
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
              prompt: `Rewrite higher-order equations as first-order systems.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write $y'' + 3y' + 2y = \\cos t$ as a first-order system, and confirm that the eigenvalues of the homogeneous system are the characteristic roots.`, answer: `With $x_1 = y$, $x_2 = y'$: $x' = \\begin{pmatrix} 0 & 1 \\\\ -2 & -3 \\end{pmatrix}x + \\begin{pmatrix} 0 \\\\ \\cos t \\end{pmatrix}$. The matrix has trace $-3$ and determinant 2, so $\\lambda^2 + 3\\lambda + 2 = 0$, the characteristic equation, with roots $-1, -2$.` },
                { prompt: `Write $y''' - 2y'' + y = 0$ as a system of three equations.`, answer: `With $x_1 = y$, $x_2 = y'$, $x_3 = y''$: $x_1' = x_2$, $x_2' = x_3$, $x_3' = -x_1 + 2x_3$, so $x' = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ -1 & 0 & 2 \\end{pmatrix}x$.` },
              ],
            },
            {
              slug: 'two-by-two-ivp',
              title: 'A $2 \\times 2$ initial value problem',
              prompt: `Take $x' = \\begin{pmatrix} 3 & -2 \\\\ 2 & -2 \\end{pmatrix}x$ with $x(0) = (1, -1)^T$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Solve it.`, answer: `Trace 1, determinant $-2$: $\\lambda = 2$ with $v = (2, 1)$ and $\\lambda = -1$ with $v = (1, 2)$. Then $c_1(2, 1) + c_2(1, 2) = (1, -1)$ gives $c_1 = 1$, $c_2 = -1$: $x = e^{2t}(2, 1)^T - e^{-t}(1, 2)^T$.` },
                { prompt: `Describe the behaviour as $t \\to \\infty$ and as $t \\to -\\infty$.`, answer: `As $t \\to \\infty$ the $e^{2t}$ term dominates, and $x$ grows along the direction $(2, 1)$. As $t \\to -\\infty$ the $e^{-t}$ term dominates, and $x$ grows along $-(1, 2)$. The origin is a saddle.` },
              ],
            },
            {
              slug: 'coupled-tanks',
              title: 'Two connected tanks',
              prompt: `Two 100 L tanks exchange well-mixed fluid through two pipes, each carrying 2 L/min in opposite directions. Tank 1 starts with 10 kg of salt, and tank 2 with none.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the system for $x_1, x_2$, and find the eigenvalues.`, answer: `$x_1' = -0.02x_1 + 0.02x_2$ and $x_2' = 0.02x_1 - 0.02x_2$. The matrix has trace $-0.04$ and determinant 0, so $\\lambda = 0$ and $\\lambda = -0.04$.` },
                { prompt: `Solve it, and explain the meaning of the eigenvalue 0 and of its eigenvector.`, answer: `Eigenvectors $(1, 1)$ for 0 and $(1, -1)$ for $-0.04$, and $(10, 0) = 5(1, 1) + 5(1, -1)$, so $x = (5 + 5e^{-0.04t},\\ 5 - 5e^{-0.04t})$. The eigenvalue 0 reflects conservation: salt only moves between the tanks, so the total stays 10 kg. Its eigenvector is the equilibrium with equal amounts, 5 kg each.` },
                { prompt: `Find the time at which tank 2 holds 4 kg.`, answer: `$5 - 5e^{-0.04t} = 4$ gives $e^{-0.04t} = 0.2$, so $t = 25\\ln 5 \\approx 40.2$ minutes.` },
              ],
            },
            {
              slug: 'three-by-three',
              title: 'A $3 \\times 3$ system',
              prompt: `Take $x' = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}x$ with $x(0) = (1, 0, 1)^T$. The eigenvalue 2 has two independent eigenvectors.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve it.`, answer: `The eigenvalues are 0 with $(1, -1, 0)$, and 2 with $(1, 1, 0)$ and $(0, 0, 1)$. Then $(1, 0, 1) = \\frac12(1, 1, 0) + \\frac12(1, -1, 0) + (0, 0, 1)$, so $x = \\left(\\frac{e^{2t} + 1}{2},\\ \\frac{e^{2t} - 1}{2},\\ e^{2t}\\right)$.` },
                { prompt: `Why does having two eigenvectors for the eigenvalue 2 mean you need no extra work here?`, answer: `There are three independent eigenvectors in all, a full basis, so every solution is a combination of $e^{\\lambda t}v$ terms. No generalised eigenvectors or factors of $t$ are needed.` },
                { prompt: `Check with \`numpy.linalg.eig\` or by substitution.`, answer: `NumPy returns eigenvalues $2, 0, 2$ with unit eigenvectors $(1, 1, 0)/\\sqrt2$, $(-1, 1, 0)/\\sqrt2$ and $(0, 0, 1)$. By substitution: $x_1' = e^{2t} = x_1 + x_2$, and likewise for the other rows.` },
              ],
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
          quiz: [
            {
              question: `A matrix $A$ has eigenvalue 4 with eigenvector $(1, 2)$ and eigenvalue $-1$ with eigenvector $(1, -1)$. What is the solution of $x' = Ax$ with $x(0) = (2, 1)$?`,
              options: [`$e^{4t}(1, 2) + e^{-t}(1, -1)$`, `$2e^{4t}(1, 2) + e^{-t}(1, -1)$`, `$e^{-t}(1, 2) + e^{4t}(1, -1)$`, `$(2e^{4t}, e^{-t})$`],
              answer: 0,
              explanation: `Solve $c_1(1, 2) + c_2(1, -1) = (2, 1)$: $c_1 + c_2 = 2$ and $2c_1 - c_2 = 1$ give $c_1 = c_2 = 1$. The option with $2e^{4t}$ uses the components of $x(0)$ as the coefficients, which is right only when the eigenvectors are the coordinate axes; $(2e^{4t}, e^{-t})$ makes the same mistake.`,
            },
            {
              question: `With $x_1 = y$ and $x_2 = y'$, which matrix turns $y'' + 5y' + 6y = 0$ into $x' = Ax$?`,
              options: [`$\\begin{pmatrix} 0 & 1 \\\\ 6 & 5 \\end{pmatrix}$`, `$\\begin{pmatrix} 1 & 0 \\\\ -6 & -5 \\end{pmatrix}$`, `$\\begin{pmatrix} 0 & 1 \\\\ -6 & -5 \\end{pmatrix}$`, `$\\begin{pmatrix} -6 & -5 \\\\ 0 & 1 \\end{pmatrix}$`],
              answer: 2,
              explanation: `$x_1' = x_2$ gives the first row $(0, 1)$, and $x_2' = y'' = -6y - 5y' = -6x_1 - 5x_2$ gives $(-6, -5)$. Its characteristic polynomial $\\lambda^2 + 5\\lambda + 6$ is the original one, as it must be. The option with $+6, +5$ forgets that the terms change sign when $y''$ is isolated.`,
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
              prompt: `Take $x' = \\begin{pmatrix} -1 & 2 \\\\ -2 & -1 \\end{pmatrix}x$ with $x(0) = (1, 0)^T$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Solve it.`, answer: `$\\lambda = -1 \\pm 2i$, and $x = e^{-t}(\\cos 2t, -\\sin 2t)^T$. Check: $x_1' = -e^{-t}(\\cos 2t + 2\\sin 2t) = -x_1 + 2x_2$, and $x_2' = e^{-t}(\\sin 2t - 2\\cos 2t) = -2x_1 - x_2$.` },
                { prompt: `Show that $|x(t)|$ decays like $e^{-t}$, and state whether the rotation is clockwise.`, answer: `$|x| = e^{-t}\\sqrt{\\cos^2 2t + \\sin^2 2t} = e^{-t}$ exactly. At $(1, 0)$ the velocity is $(-1, -2)$, pointing down, so the rotation is clockwise (the angle is $-2t$).` },
              ],
            },
            {
              slug: 'defective-ivp',
              title: 'A defective matrix',
              prompt: `Solve $x' = \\begin{pmatrix} 1 & -1 \\\\ 1 & 3 \\end{pmatrix}x$ with $x(0) = (1, 0)^T$, and verify by substitution.`,
              kind: 'problem',
              difficulty: 2,
              answer: `Trace 4, determinant 4, so $\\lambda = 2$ is double, and $A - 2I = \\begin{pmatrix} -1 & -1 \\\\ 1 & 1 \\end{pmatrix} \\neq 0$, with $(A - 2I)^2 = 0$. So $x = e^{2t}\\big(I + t(A - 2I)\\big)x(0) = e^{2t}(1 - t,\\ t)^T$. Check: $x_1' = e^{2t}(1 - 2t) = x_1 - x_2$ and $x_2' = e^{2t}(1 + 2t) = x_1 + 3x_2$.`,
            },
            {
              slug: 'coupled-masses',
              title: 'Coupled masses',
              prompt: `For the two masses in the lesson, $x'' = Kx$ with $K = \\begin{pmatrix} -2 & 1 \\\\ 1 & -2 \\end{pmatrix}$.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `Try $x = \\cos(\\omega t)v$ and $x = \\sin(\\omega t)v$. Show that $-\\omega^2$ must be an eigenvalue of $K$, and find both modes.`, answer: `$x'' = -\\omega^2\\cos(\\omega t)v$ must equal $\\cos(\\omega t)Kv$, so $Kv = -\\omega^2v$ (likewise for sine). The eigenvalue $-1$ with $v = (1, 1)$ gives the in-phase mode at $\\omega = 1$; $-3$ with $v = (1, -1)$ gives the opposite-phase mode at $\\omega = \\sqrt3$.` },
                { prompt: `Solve for $x(0) = (1, 0)^T$, $x'(0) = 0$, and describe the motion in terms of the two modes.`, answer: `$(1, 0) = \\frac12(1, 1) + \\frac12(1, -1)$, and zero velocity keeps only cosines: $x = \\frac12\\cos t\\,(1, 1)^T + \\frac12\\cos\\sqrt3t\\,(1, -1)^T$, so $x_1 = \\frac12(\\cos t + \\cos\\sqrt3t)$ and $x_2 = \\frac12(\\cos t - \\cos\\sqrt3t)$. It is an equal mix of the two modes.` },
                { prompt: `Explain why the motion is not periodic, and plot $x_1$ and $x_2$ on $[0, 40]$.`, answer: `The frequency ratio $\\sqrt3$ is irrational, so the two cosines never return to their starting phases together. The plot shows energy passing back and forth: $x_1$ and $x_2$ take turns at large amplitude, in an irregular beat pattern.` },
              ],
            },
            {
              slug: 'star-versus-defective',
              title: 'When is a repeated eigenvalue not defective?',
              prompt: `Take a $2 \\times 2$ matrix $A$ with a repeated eigenvalue $\\lambda$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that if $A$ has two independent eigenvectors for $\\lambda$, then $A = \\lambda I$.`, answer: `Two independent vectors span $\\mathbb{R}^2$, so every $x = av + bw$ satisfies $Ax = a\\lambda v + b\\lambda w = \\lambda x$. A matrix that acts as $\\lambda$ on every vector is $\\lambda I$.` },
                { prompt: `Show that if $A \\neq \\lambda I$, then $(A - \\lambda I)^2 = 0$, so every vector $w$ that is not an eigenvector gives a valid chain with $v = (A - \\lambda I)w$.`, answer: `A $2 \\times 2$ matrix satisfies its own characteristic equation: multiplying out with entries $a, b, c, d$ shows $A^2 - (a + d)A + (ad - bc)I = 0$. Here the characteristic polynomial is $(z - \\lambda)^2$, so $(A - \\lambda I)^2 = 0$. If $w$ is not an eigenvector, $v = (A - \\lambda I)w \\neq 0$ and $(A - \\lambda I)v = (A - \\lambda I)^2w = 0$, so $v$ is an eigenvector and $(A - \\lambda I)w = v$, which is the chain condition.` },
              ],
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
          quiz: [
            {
              question: `What is the solution of $x' = \\begin{pmatrix} -2 & -3 \\\\ 3 & -2 \\end{pmatrix}x$ with $x(0) = (1, 0)$?`,
              options: [`$e^{-2t}(\\cos 3t, -\\sin 3t)$`, `$e^{3t}(\\cos 2t, \\sin 2t)$`, `$e^{-2t}(\\sin 3t, \\cos 3t)$`, `$e^{-2t}(\\cos 3t, \\sin 3t)$`],
              answer: 3,
              explanation: `The eigenvalues are $-2 \\pm 3i$: decay $e^{-2t}$ and angular frequency 3. At $(1, 0)$ the velocity is $(-2, 3)$, pointing up, so the rotation is anticlockwise, which is the $(\\cos 3t, \\sin 3t)$ form; substituting confirms it. The option with $-\\sin 3t$ turns the wrong way, and $(\\sin 3t, \\cos 3t)$ does not start at $(1, 0)$.`,
            },
            {
              question: `A $2 \\times 2$ matrix has the double eigenvalue 3 but only one independent eigenvector $v$. Besides $e^{3t}v$, which is a solution of $x' = Ax$?`,
              options: [`$e^{3t}(tv + w)$, where $(A - 3I)w = v$`, `$te^{3t}v$`, `$e^{3t}w$, with $w$ any vector not parallel to $v$`, `$e^{3t}(v + tw)$, where $(A - 3I)w = v$`],
              answer: 0,
              explanation: `Differentiating $e^{3t}(tv + w)$ gives $e^{3t}(3tv + 3w + v)$, and $A(tv + w) = 3tv + 3w + v$ uses $Av = 3v$ and $Aw = 3w + v$, so they agree. $te^{3t}v$ alone, copied from the scalar case, leaves an unmatched $e^{3t}v$, and $e^{3t}w$ fails because $w$ is not an eigenvector.`,
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
              prompt: `Classify the origin for each matrix (written by rows), and state its stability.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$(1, 2; 3, 4)$`, answer: `$T = 5$, $D = -2 < 0$: a saddle, unstable.` },
                { prompt: `$(-2, 1; 1, -2)$`, answer: `$T = -4$, $D = 3$, $T^2 = 16 > 12$: a node with eigenvalues $-1, -3$, asymptotically stable.` },
                { prompt: `$(0, 1; -4, 0)$`, answer: `$T = 0$, $D = 4$: a center ($\\pm 2i$), stable but not asymptotically.` },
                { prompt: `$(1, -1; 5, -3)$`, answer: `$T = -2$, $D = 2$, $T^2 = 4 < 8$: a spiral with $\\lambda = -1 \\pm i$, asymptotically stable.` },
                { prompt: `$(2, 1; -1, 2)$`, answer: `$T = 4$, $D = 5$, $T^2 = 16 < 20$: a spiral with $\\lambda = 2 \\pm i$, unstable.` },
                { prompt: `$(-3, 1; -1, -1)$`, answer: `$T = -4$, $D = 4$, so $T^2 = 4D$: the double eigenvalue $-2$. Since $A + 2I \\neq 0$, the matrix is defective, so this is an improper (degenerate) node, asymptotically stable.` },
              ],
            },
            {
              slug: 'parameter-sweep',
              title: 'A parameter sweep',
              prompt: `Find how the type of the origin depends on the real parameter $a$, mark the values at which the type changes, and draw the path in the trace-determinant plane.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$A = \\begin{pmatrix} a & 1 \\\\ -1 & a \\end{pmatrix}$`, answer: `$\\lambda = a \\pm i$. For $a < 0$ a stable spiral, at $a = 0$ a center, for $a > 0$ an unstable spiral; the type changes at $a = 0$. The path $T = 2a$, $D = a^2 + 1$ is the parabola $D = T^2/4 + 1$, which stays above $T^2 = 4D$, so it never reaches the node region.` },
                { prompt: `$B = \\begin{pmatrix} 1 & a \\\\ 1 & -1 \\end{pmatrix}$`, answer: `$T = 0$ and $D = -1 - a$. For $a > -1$, $D < 0$: a saddle. For $a < -1$, $D > 0$ with $T = 0$: a center. At $a = -1$, $D = 0$: both eigenvalues are 0, and the line $x_1 = x_2$ consists of equilibria. The path runs down the $D$-axis as $a$ increases.` },
              ],
            },
            {
              slug: 'portrait-code',
              title: 'Draw portraits in code',
              prompt: `Write a Python function that takes a $2 \\times 2$ matrix, prints its classification, and draws a streamplot with eigenvector lines when they are real.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Write the function.`, answer: `A sketch: compute \`T = np.trace(A)\`, \`D = np.linalg.det(A)\`, \`disc = T**2 - 4*D\`, and classify by the table (saddle if \`D < 0\`, node or spiral by the sign of \`disc\`, stability by the sign of \`T\`, center if \`T == 0 < D\`, within a tolerance). Then evaluate \`U, V = A @ [X, Y]\` on a \`meshgrid\`, call \`plt.streamplot(X, Y, U, V)\`, and if \`disc >= 0\` draw the lines through the real eigenvectors from \`np.linalg.eig\`.` },
                { prompt: `Test it on one matrix of each type in the table.`, answer: `For example $(1, 2; 3, 4)$ should print saddle, $(-2, 1; 1, -2)$ stable node, $(1, -1; 5, -3)$ stable spiral, $(2, 1; -1, 2)$ unstable spiral and $(0, 1; -4, 0)$ center. Watch the boundary cases: use a tolerance so that $T = 0$ or $T^2 = 4D$ computed in floating point is still recognised.` },
                { prompt: `Compare the output with a hand sketch for the worked example, including the rotation direction.`, answer: `For $\\begin{pmatrix} -1 & 4 \\\\ -2 & 3 \\end{pmatrix}$ it should print unstable spiral ($\\lambda = 1 \\pm 2i$), with no eigenvector lines, and the streamlines should spiral outward clockwise: at $(1, 0)$ the arrow points along $(-1, -2)$.` },
              ],
            },
            {
              slug: 'slow-direction',
              title: 'The slow direction',
              prompt: `Take $A = \\begin{pmatrix} -1 & 0 \\\\ 0 & -4 \\end{pmatrix}$ and the solution with $x(0) = (a, b)$, where $a, b \\ne 0$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Eliminate $t$ and show that the orbit is a curve $x_2 = Cx_1^4$.`, answer: `$x_1 = ae^{-t}$ and $x_2 = be^{-4t}$. Then $e^{-t} = x_1/a$, so $x_2 = b(x_1/a)^4 = \\frac{b}{a^4}x_1^4$.` },
                { prompt: `Which axis are the orbits tangent to at the origin, and what eigenvalue does it go with?`, answer: `$dx_2/dx_1 = 4Cx_1^3 \\to 0$, so the orbits are tangent to the $x_1$-axis, the eigenvector of $\\lambda = -1$.` },
                { prompt: `Explain why this matches the rule in the lesson.`, answer: `The rule says orbits enter a node tangent to the slow direction, the eigenvalue of smaller absolute value. Here $|-1| < |-4|$: the $x_2$ component dies out like $e^{-4t}$, much faster than $x_1$, so near the origin only the slow $x_1$ direction is left.` },
              ],
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
          quiz: [
            {
              question: `What is the origin for $x' = \\begin{pmatrix} 2 & -5 \\\\ 1 & -2 \\end{pmatrix}x$?`,
              options: [`A saddle`, `An unstable spiral`, `A center`, `A stable node`],
              answer: 2,
              explanation: `$T = 0$ and $D = -4 + 5 = 1 > 0$, so $\\lambda = \\pm i$: a center, with closed orbits. The diagonal entries $2$ and $-2$ have opposite signs, which tempts people to call it a saddle, but the sign of the determinant decides that, not the diagonal.`,
            },
            {
              question: `A matrix has trace $-5$ and determinant $-6$. What is the origin?`,
              options: [`A stable node, since the trace is negative`, `A saddle, since the determinant is negative`, `A stable spiral`, `An unstable node`],
              answer: 1,
              explanation: `$\\lambda^2 + 5\\lambda - 6 = (\\lambda + 6)(\\lambda - 1)$, so the eigenvalues are $1$ and $-6$, of opposite signs. Whenever $D < 0$ the eigenvalues are real with product negative, so it is a saddle whatever the trace. The trace decides stability only when $D > 0$.`,
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
              prompt: `The damped pendulum is $\\theta' = \\omega$, $\\omega' = -\\sin\\theta - b\\omega$ with $b > 0$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the equilibria and compute the Jacobian.`, answer: `$\\omega = 0$ and $\\sin\\theta = 0$, so $(n\\pi, 0)$ for integers $n$. $J = \\begin{pmatrix} 0 & 1 \\\\ -\\cos\\theta & -b \\end{pmatrix}$.` },
                { prompt: `Classify $(0, 0)$ and $(\\pi, 0)$.`, answer: `At $(0, 0)$, $T = -b < 0$ and $D = 1 > 0$: asymptotically stable. At $(\\pi, 0)$, $D = -1 < 0$: a saddle, unstable.` },
                { prompt: `For what $b$ is the hanging equilibrium a spiral?`, answer: `$T^2 < 4D$ means $b^2 < 4$, so $0 < b < 2$. For $b > 2$ it is a stable node, and $b = 2$ is the degenerate boundary.` },
                { prompt: `What happens to your conclusion when $b = 0$?`, answer: `The linearisation at $(0, 0)$ becomes a center, which linearisation alone cannot settle. Here energy $\\frac12\\omega^2 - \\cos\\theta$ is conserved, so orbits near $(0, 0)$ are closed and it really is a center. $(\\pi, 0)$ is still a saddle.` },
              ],
            },
            {
              slug: 'lotka-volterra-center',
              title: 'Predator and prey',
              prompt: `Take $x' = x(1 - y)$, $y' = y(x - 1)$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Classify the equilibria by linearisation, and note what is inconclusive.`, answer: `$J = \\begin{pmatrix} 1 - y & -x \\\\ y & x - 1 \\end{pmatrix}$. At $(0, 0)$, $J = \\operatorname{diag}(1, -1)$: a saddle. At $(1, 1)$, $J = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, eigenvalues $\\pm i$: a linear center, which is inconclusive for the non-linear system.` },
                { prompt: `Show that $H(x, y) = x - \\ln x + y - \\ln y$ is constant on solutions with $x, y > 0$.`, answer: `$\\frac{dH}{dt} = \\left(1 - \\frac1x\\right)x' + \\left(1 - \\frac1y\\right)y' = (x - 1)(1 - y) + (y - 1)(x - 1) = 0$.` },
                { prompt: `Deduce that orbits near $(1, 1)$ are closed curves.`, answer: `$H$ has a strict minimum at $(1, 1)$ (each part $u - \\ln u$ is convex with minimum at $u = 1$), so its level sets near $(1, 1)$ are closed curves around it. Orbits stay on level sets and cannot stop, since $(1, 1)$ is the only equilibrium inside, so they go round and close up.` },
              ],
            },
            {
              slug: 'competition-basins',
              title: 'Map the basins of attraction',
              prompt: `For the competition model in the lesson, $x' = x(3 - x - 2y)$, $y' = y(2 - x - y)$, integrate from a grid of 400 starting points in $[0.05, 4]^2$ using \`solve_ivp\`.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `Colour each point by its final state, estimate the separatrix, and check that it passes through $(1, 1)$.`, answer: `On a $20 \\times 20$ grid integrated to $t = 60$, about 158 of the 400 points end at $(3, 0)$ and the rest at $(0, 2)$. The boundary between the colours is a curve rising from near the origin through $(1, 1)$: points below it go to $(3, 0)$ and points above it to $(0, 2)$.` },
                { prompt: `Find the eigenvector of the stable direction at $(1, 1)$ and check that it is tangent to your numerical boundary.`, answer: `$J = \\begin{pmatrix} -1 & -2 \\\\ -1 & -1 \\end{pmatrix}$ has $\\lambda = -1 \\pm \\sqrt2$. The stable one, $-1 - \\sqrt2 \\approx -2.414$, has eigenvector $(\\sqrt2, 1)$, of slope $1/\\sqrt2 \\approx 0.707$. The colour boundary should cross $(1, 1)$ with that slope.` },
              ],
            },
            {
              slug: 'center-either-way',
              title: 'A center that goes either way',
              prompt: `Take $x' = -y + \\mu x(x^2 + y^2)$, $y' = x + \\mu y(x^2 + y^2)$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Derive $r' = \\mu r^3$ and solve it.`, answer: `$rr' = xx' + yy' = \\mu(x^2 + y^2)^2 = \\mu r^4$, so $r' = \\mu r^3$ (and $\\theta' = 1$). Separating, $r^{-2} = r_0^{-2} - 2\\mu t$, so $r = \\frac{r_0}{\\sqrt{1 - 2\\mu r_0^2t}}$.` },
                { prompt: `For $\\mu = 1$ find the blow-up time from $r(0) = r_0$.`, answer: `$t = \\frac{1}{2r_0^2}$. For $r_0 = 0.5$ that is $t = 2$.` },
                { prompt: `For $\\mu = -1$ find the rate at which $r$ tends to 0, and contrast it with exponential decay.`, answer: `$r = \\frac{r_0}{\\sqrt{1 + 2r_0^2t}} \\approx \\frac{1}{\\sqrt{2t}}$: algebraic decay like $t^{-1/2}$, far slower than any $e^{-ct}$, and independent of $r_0$ for large $t$.` },
                { prompt: `Confirm both numerically.`, answer: `With $r_0 = 0.5$, \`solve_ivp\` gives $r(1.99) \\approx 7.07$ for $\\mu = 1$, matching $0.5/\\sqrt{0.005}$, and $r(100) \\approx 0.0700$ for $\\mu = -1$, matching $0.5/\\sqrt{51}$.` },
              ],
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
          quiz: [
            {
              question: `The system $x' = x - y$, $y' = x^2 - 4$ has equilibria $(2, 2)$ and $(-2, -2)$. What is $(2, 2)$?`,
              options: [`A saddle`, `An unstable spiral`, `A stable spiral`, `A center`],
              answer: 1,
              explanation: `$J = \\begin{pmatrix} 1 & -1 \\\\ 2x & 0 \\end{pmatrix}$. At $(2, 2)$, $T = 1$, $D = 4$ and $T^2 = 1 < 16$: an unstable spiral, and since it is hyperbolic the linearisation is trustworthy. The saddle is the other equilibrium: at $(-2, -2)$ the determinant is $-4$.`,
            },
            {
              question: `The linearisation at an equilibrium of a non-linear planar system has eigenvalues $\\pm i$. What can you conclude?`,
              options: [`It is a center: nearby orbits are closed`, `It is stable, but not asymptotically stable`, `It is unstable`, `Nothing yet: the non-linear terms decide whether orbits close, spiral in or spiral out`],
              answer: 3,
              explanation: `Linearisation decides the type only when no eigenvalue has zero real part. With $\\pm i$ the non-linear terms can tip the balance either way, as in $x' = -y + \\mu x(x^2 + y^2)$, $y' = x + \\mu y(x^2 + y^2)$, which spirals out for $\\mu > 0$ and in for $\\mu < 0$. Calling it a center copies the linear picture, which is the trap.`,
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
              prompt: `For $y'' + 4y = 0$, $y(0) = 0$, the condition at 0 leaves $y = B\\sin 2t$. Decide how many solutions there are with each second condition, and find them.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$y(\\pi) = 0$`, answer: `$B\\sin 2\\pi = 0$ for every $B$: infinitely many solutions, $y = B\\sin 2t$.` },
                { prompt: `$y(\\pi) = 1$`, answer: `$B\\sin 2\\pi = 0 \\neq 1$: no solution.` },
                { prompt: `$y(\\pi/4) = 1$`, answer: `$B\\sin(\\pi/2) = B = 1$: exactly one solution, $y = \\sin 2t$.` },
              ],
            },
            {
              slug: 'neumann-eigenvalues',
              title: 'Neumann eigenvalues',
              prompt: `Find all eigenvalues and eigenfunctions of $y'' + \\lambda y = 0$, $y'(0) = 0$, $y'(L) = 0$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Treat $\\lambda < 0$.`, answer: `With $\\lambda = -\\mu^2$, $y = A\\cosh\\mu x + B\\sinh\\mu x$. $y'(0) = \\mu B = 0$ and then $y'(L) = A\\mu\\sinh\\mu L = 0$ force $A = B = 0$. No eigenvalues.` },
                { prompt: `Treat $\\lambda = 0$, and say what it means physically for heat in a rod with insulated ends.`, answer: `$y = A + Bx$ with $y' = B = 0$, so $\\lambda = 0$ is an eigenvalue with eigenfunction $y = 1$. For an insulated rod this is the constant temperature that survives for ever: no heat escapes, so the rod tends to its average temperature.` },
                { prompt: `Treat $\\lambda > 0$.`, answer: `With $\\lambda = \\mu^2$, $y = A\\cos\\mu x + B\\sin\\mu x$; $y'(0) = 0$ gives $B = 0$, and $y'(L) = -A\\mu\\sin\\mu L = 0$ gives $\\mu = n\\pi/L$. So $\\lambda_n = (n\\pi/L)^2$ with $y_n = \\cos(n\\pi x/L)$, $n = 1, 2, \\dots$` },
              ],
            },
            {
              slug: 'periodic-eigenvalues',
              title: 'Periodic conditions',
              prompt: `Solve $y'' + \\lambda y = 0$ on $[-L, L]$ with $y(-L) = y(L)$ and $y'(-L) = y'(L)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that each eigenvalue $\\lambda_n = (n\\pi/L)^2$ with $n \\geq 1$ has two independent eigenfunctions.`, answer: `For $\\lambda = \\mu^2 > 0$, $y = A\\cos\\mu x + B\\sin\\mu x$. The condition on $y$ gives $2B\\sin\\mu L = 0$ and the condition on $y'$ gives $2A\\mu\\sin\\mu L = 0$. If $\\sin\\mu L = 0$, that is $\\mu = n\\pi/L$, both $A$ and $B$ are free, so $\\cos(n\\pi x/L)$ and $\\sin(n\\pi x/L)$ are both eigenfunctions. (Also $\\lambda = 0$ with $y = 1$, and no negative eigenvalues.)` },
                { prompt: `Explain how this differs from the Dirichlet problem.`, answer: `For $y(0) = y(L) = 0$ each eigenvalue $(n\\pi/L)^2$ has only one eigenfunction, $\\sin(n\\pi x/L)$, and 0 is not an eigenvalue. The periodic problem has double eigenvalues, which is why a full Fourier series needs both sines and cosines.` },
              ],
            },
            {
              slug: 'robin-eigenvalues-numerical',
              title: 'Eigenvalues from a transcendental equation',
              prompt: `Take $y'' + \\lambda y = 0$, $y(0) = 0$, $y(1) + y'(1) = 0$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Show that there are no eigenvalues $\\lambda \\leq 0$.`, answer: `$\\lambda = 0$: $y = Bx$ and $y(1) + y'(1) = 2B = 0$. $\\lambda = -\\mu^2 < 0$: $y = B\\sinh\\mu x$ and $B(\\sinh\\mu + \\mu\\cosh\\mu) = 0$, where the bracket is positive for $\\mu > 0$. Either way $B = 0$.` },
                { prompt: `Show that $\\lambda = \\beta^2$ is an eigenvalue exactly when $\\tan\\beta = -\\beta$ with $\\beta > 0$.`, answer: `$y = B\\sin\\beta x$, and $y(1) + y'(1) = B(\\sin\\beta + \\beta\\cos\\beta) = 0$ with $B \\neq 0$ needs $\\sin\\beta = -\\beta\\cos\\beta$. Here $\\cos\\beta \\neq 0$ (otherwise $\\sin\\beta = 0$ too), so divide: $\\tan\\beta = -\\beta$.` },
                { prompt: `Draw $y = \\tan\\beta$ and $y = -\\beta$ to justify your search brackets, and find the first three $\\beta$ to four decimal places with \`scipy.optimize.brentq\`.`, answer: `On each interval $((k - \\frac12)\\pi, k\\pi)$ the tangent rises from $-\\infty$ to 0 while $-\\beta$ is negative, so there is exactly one crossing there. Brackets just inside $(\\pi/2, \\pi)$, $(3\\pi/2, 2\\pi)$ and $(5\\pi/2, 3\\pi)$ give $\\beta \\approx 2.0288$, $4.9132$ and $7.9787$, so $\\lambda \\approx 4.116$, $24.14$ and $63.66$. Use $\\sin\\beta + \\beta\\cos\\beta$ in \`brentq\` to avoid the poles of the tangent.` },
              ],
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
          quiz: [
            {
              question: `What is the smallest eigenvalue of $y'' + \\lambda y = 0$ with $y(0) = 0$ and $y(3) = 0$?`,
              options: [`$\\pi^2/9$`, `$\\pi/3$`, `$9\\pi^2$`, `$\\pi^2/3$`],
              answer: 0,
              explanation: `The eigenfunctions are $\\sin(n\\pi x/3)$ with $\\lambda_n = (n\\pi/3)^2$, so the first is $\\pi^2/9 \\approx 1.10$. $\\pi/3$ is the frequency $\\sqrt{\\lambda_1}$, not the eigenvalue $\\lambda_1$, and $\\pi^2/3$ forgets to square the length.`,
            },
            {
              question: `For $y'' + \\lambda y = 0$ on $[0, L]$, is $\\lambda = 0$ an eigenvalue?`,
              options: [`Yes, for both Dirichlet conditions $y(0) = y(L) = 0$ and Neumann conditions $y'(0) = y'(L) = 0$`, `Only for the Dirichlet conditions`, `Only for the Neumann conditions, with a constant eigenfunction`, `For neither, because $\\lambda = 0$ turns the equation into $y'' = 0$`],
              answer: 2,
              explanation: `With $\\lambda = 0$ the solutions are $y = A + Bx$. Neumann conditions force $B = 0$ and leave the non-zero constant $A$, so 0 is an eigenvalue. Dirichlet conditions force $A = B = 0$, so it is not. The equation $y'' = 0$ still has non-zero solutions, so "neither" is wrong.`,
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
              answer: `The function is odd, so every $a_n = 0$. By parts, $b_n = \\frac2\\pi\\int_0^\\pi x\\sin nx\\,dx = \\frac{2(-1)^{n+1}}{n}$. So $f \\sim 2\\left(\\sin x - \\frac{\\sin 2x}{2} + \\frac{\\sin 3x}{3} - \\dots\\right) = 2\\sum_{n=1}^\\infty \\frac{(-1)^{n+1}}{n}\\sin nx$.`,
            },
            {
              slug: 'triangle-series',
              title: 'A triangle wave',
              prompt: `Take the function with period $2\\pi$ equal to $|x|$ on $[-\\pi, \\pi]$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find its Fourier series.`, answer: `It is even, so $b_n = 0$. $a_0 = \\frac2\\pi\\int_0^\\pi x\\,dx = \\pi$, and $a_n = \\frac2\\pi\\int_0^\\pi x\\cos nx\\,dx = \\frac{2((-1)^n - 1)}{\\pi n^2}$, which is $-\\frac{4}{\\pi n^2}$ for odd $n$ and 0 for even $n$. So $|x| \\sim \\frac\\pi2 - \\frac4\\pi\\sum_{n\\ \\text{odd}}\\frac{\\cos nx}{n^2}$.` },
                { prompt: `Compare the decay of its coefficients with that of the square wave, and relate it to the smoothness of each function.`, answer: `The triangle wave's coefficients fall like $1/n^2$, the square wave's like $1/n$. The triangle wave is continuous with a jump only in its derivative; the square wave itself jumps. Each extra degree of smoothness buys one more power of $1/n$.` },
              ],
            },
            {
              slug: 'parabola-series',
              title: 'General period',
              prompt: `Find the Fourier series of $f(x) = x^2$ on $(-L, L)$, extended with period $2L$. Show that $a_0 = 2L^2/3$ and $a_n = 4L^2(-1)^n/(n^2\\pi^2)$ for $n \\geq 1$.`,
              kind: 'problem',
              difficulty: 2,
              answer: `The function is even, so $b_n = 0$. $a_0 = \\frac1L\\int_{-L}^L x^2\\,dx = \\frac{2L^2}{3}$. Integrating by parts twice, $a_n = \\frac2L\\int_0^L x^2\\cos\\frac{n\\pi x}{L}\\,dx = \\frac{4L^2(-1)^n}{n^2\\pi^2}$. So $x^2 \\sim \\frac{L^2}{3} + \\frac{4L^2}{\\pi^2}\\sum_{n=1}^\\infty\\frac{(-1)^n}{n^2}\\cos\\frac{n\\pi x}{L}$.`,
            },
            {
              slug: 'piecewise-half-ramp',
              title: 'A half ramp',
              prompt: `Find the Fourier series of the function with period 2 given by $f(x) = 0$ on $(-1, 0)$ and $f(x) = x$ on $(0, 1)$. Note that neither symmetry helps, so both families of coefficients are present.`,
              kind: 'problem',
              difficulty: 2,
              answer: `With $L = 1$: $a_0 = \\int_0^1 x\\,dx = \\frac12$, $a_n = \\int_0^1 x\\cos n\\pi x\\,dx = \\frac{(-1)^n - 1}{n^2\\pi^2}$ and $b_n = \\int_0^1 x\\sin n\\pi x\\,dx = \\frac{(-1)^{n+1}}{n\\pi}$. So $f \\sim \\frac14 + \\sum_{n=1}^\\infty\\left[\\frac{(-1)^n - 1}{n^2\\pi^2}\\cos n\\pi x + \\frac{(-1)^{n+1}}{n\\pi}\\sin n\\pi x\\right]$; the cosine terms are $-\\frac{2}{n^2\\pi^2}$ for odd $n$ and 0 for even $n$.`,
            },
            {
              slug: 'partial-sum-plots',
              title: 'Partial sum plots',
              prompt: `Write a Python function that computes Fourier coefficients numerically with \`scipy.integrate.quad\` for any function on $[-L, L]$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Check it against your answers for the sawtooth and the triangle wave.`, answer: `A sketch: \`a = quad(lambda x: f(x)*np.cos(n*np.pi*x/L), -L, L)[0]/L\`, and similarly for \`b\` with sine. For the sawtooth you should get $b_1 = 2$, $b_2 = -1$, $b_3 = 0.6667$ and all $a_n \\approx 0$; for $|x|$, $a_0 = \\pi$, $a_1 = -4/\\pi \\approx -1.2732$, $a_2 \\approx 0$, $a_3 \\approx -0.1415$.` },
                { prompt: `Plot partial sums with $N = 1, 5, 25, 125$ and report the maximum error on $[-3, 3]$ in each case.`, answer: `Sawtooth: about $2.72$, $1.64$, $0.500$, $0.106$. The worst point is at the ends $x = \\pm 3$, close to the jump at $\\pm\\pi$, and convergence there is slow. Triangle wave: about $0.298$, $0.105$, $0.0245$, $0.0051$, worst at the corner $x = 0$ and falling roughly like $1/N$.` },
              ],
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
          quiz: [
            {
              question: `The function with period $2\\pi$ equal to 0 on $(-\\pi, 0)$ and 1 on $(0, \\pi)$ has Fourier coefficient $b_1$ equal to what?`,
              options: [`$\\dfrac4\\pi$`, `$\\dfrac1\\pi$`, `$\\dfrac2\\pi$`, `$0$`],
              answer: 2,
              explanation: `$b_1 = \\frac1\\pi\\int_0^\\pi \\sin x\\,dx = \\frac2\\pi$. This function is $\\frac12 + \\frac12$ times the square wave that jumps between $-1$ and $1$, whose $b_1$ is $\\frac4\\pi$, so halving gives $\\frac2\\pi$. $\\frac4\\pi$ is the coefficient of that square wave, not of this one.`,
            },
            {
              question: `For $f(x) = x^3$ on $(-\\pi, \\pi)$, extended with period $2\\pi$, which coefficients are all zero?`,
              options: [`Every $a_n$, including $a_0$`, `Every $b_n$`, `Only $a_0$`, `None of them, since the extension has jumps`],
              answer: 0,
              explanation: `$x^3$ is odd and $\\cos nx$ is even, so $x^3\\cos nx$ is odd and integrates to 0 over $(-\\pi, \\pi)$: the series is a pure sine series. Choosing the $b_n$ swaps the rule; an odd function keeps the odd functions, the sines. The jumps at $\\pm\\pi$ affect convergence there, not the symmetry.`,
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
              prompt: `Take $f(x) = 1$ on $(0, L)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find its Fourier sine series.`, answer: `$b_n = \\frac2L\\int_0^L \\sin\\frac{n\\pi x}{L}\\,dx = \\frac{2(1 - (-1)^n)}{n\\pi}$, which is $\\frac{4}{n\\pi}$ for odd $n$. So $1 \\sim \\frac4\\pi\\sum_{n\\ \\text{odd}}\\frac1n\\sin\\frac{n\\pi x}{L}$.` },
                { prompt: `Sketch its odd periodic extension.`, answer: `A square wave of period $2L$: $-1$ on $(-L, 0)$ and $1$ on $(0, L)$, with jumps at every multiple of $L$.` },
                { prompt: `To what value does the series converge at $x = 0$ and at $x = L/2$?`, answer: `At $x = 0$ the extension jumps from $-1$ to $1$, so the series gives the average 0 (every term is 0 there). At $L/2$ the extension is continuous with value 1, so the series gives 1.` },
              ],
            },
            {
              slug: 'sine-series-parabola',
              title: 'Sine series of a parabola',
              prompt: `Take $f(x) = x(L - x)$ on $(0, L)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find its Fourier sine series.`, answer: `Integrating by parts twice, $b_n = \\frac2L\\int_0^L x(L - x)\\sin\\frac{n\\pi x}{L}\\,dx = \\frac{4L^2(1 - (-1)^n)}{n^3\\pi^3}$, which is $\\frac{8L^2}{n^3\\pi^3}$ for odd $n$ and 0 for even $n$.` },
                { prompt: `How fast do the coefficients decay, and why is this faster than for $f(x) = x$?`, answer: `Like $1/n^3$. The odd extension of $x(L - x)$ is continuous and so is its derivative; only the second derivative jumps. The odd extension of $x$ jumps at $x = \\pm L$, so its coefficients decay only like $1/n$.` },
              ],
            },
            {
              slug: 'cross-series',
              title: 'Sine as cosines and cosine as sines',
              prompt: `Work on $(0, \\pi)$, using $2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the cosine series of $\\sin x$, and sketch the extension.`, answer: `$a_0 = \\frac2\\pi\\int_0^\\pi\\sin x\\,dx = \\frac4\\pi$, $a_1 = 0$, and for $n \\geq 2$, $a_n = -\\frac{4}{\\pi(n^2 - 1)}$ for even $n$ and 0 for odd $n$. So $\\sin x \\sim \\frac2\\pi - \\frac4\\pi\\sum_{n\\ \\text{even}}\\frac{\\cos nx}{n^2 - 1}$. The even extension is $|\\sin x|$, a continuous chain of arches.` },
                { prompt: `Find the sine series of $\\cos x$, treating $n = 1$ separately, and sketch the extension.`, answer: `$b_1 = \\frac1\\pi\\int_0^\\pi\\sin 2x\\,dx = 0$. For $n \\geq 2$, $b_n = \\frac{4n}{\\pi(n^2 - 1)}$ for even $n$ and 0 for odd $n$, so $\\cos x \\sim \\frac4\\pi\\sum_{n\\ \\text{even}}\\frac{n\\sin nx}{n^2 - 1}$. The odd extension is $\\cos x$ on $(0, \\pi)$ and $-\\cos x$ on $(-\\pi, 0)$, jumping by 2 at $0$ and $\\pm\\pi$.` },
              ],
            },
            {
              slug: 'odd-even-decomposition',
              title: 'Even and odd parts',
              prompt: `Take $e^x$ on $(-\\pi, \\pi)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the even and odd parts of $e^x$, and explain how they relate to $\\cosh$ and $\\sinh$.`, answer: `Even part $\\frac{e^x + e^{-x}}{2} = \\cosh x$ and odd part $\\frac{e^x - e^{-x}}{2} = \\sinh x$: the hyperbolic functions are exactly that decomposition.` },
                { prompt: `Show that the odd part and the even part are orthogonal on the symmetric interval.`, answer: `$\\cosh x\\sinh x$ is odd, so $\\int_{-\\pi}^\\pi \\cosh x\\sinh x\\,dx = 0$.` },
                { prompt: `Compute the Fourier cosine coefficient $a_1$ of $e^x$ on $(-\\pi, \\pi)$, both directly and using the even part only.`, answer: `Directly, $a_1 = \\frac1\\pi\\int_{-\\pi}^\\pi e^x\\cos x\\,dx = \\frac1\\pi\\left[\\frac{e^x(\\cos x + \\sin x)}{2}\\right]_{-\\pi}^\\pi = -\\frac{\\sinh\\pi}{\\pi} \\approx -3.676$. The odd part contributes nothing to cosine coefficients, so $\\frac2\\pi\\int_0^\\pi\\cosh x\\cos x\\,dx$ gives the same value.` },
              ],
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
          quiz: [
            {
              question: `The cosine series of $f(x) = x$ on $(0, 2)$ uses $\\cos(n\\pi x/2)$. What is its coefficient $a_1$?`,
              options: [`$-\\dfrac{4}{\\pi^2}$`, `$\\dfrac4\\pi$`, `$0$`, `$-\\dfrac{8}{\\pi^2}$`],
              answer: 3,
              explanation: `$a_n = \\frac2L\\int_0^L x\\cos\\frac{n\\pi x}{L}\\,dx = \\frac{2L((-1)^n - 1)}{n^2\\pi^2}$, so with $L = 2$ and $n = 1$, $a_1 = -\\frac{8}{\\pi^2}$. $-\\frac{4}{\\pi^2}$ is the value for $L = 1$: the coefficient scales with $L$. 0 would hold for the full-range series of the odd function $x$, but the cosine series uses the even extension.`,
            },
            {
              question: `The Fourier sine series of $f(x) = x^2$ on $(0, 1)$ converges at $x = 1$ to what value?`,
              options: [`$1$`, `$0$`, `$\\tfrac12$`, `$-1$`],
              answer: 1,
              explanation: `The sine series represents the odd extension with period 2. Just left of $x = 1$ it is near $1$, and just right it equals the value near $-1$, which is $-1$, so the series converges to the average, 0. Every term $\\sin n\\pi$ is 0 there too. Answering 1 reads off $f(1)$ and forgets that the series sees the extension, not $f$.`,
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
              prompt: `The function $f$ has period 4 with $f(x) = 2$ on $(-2, 0)$ and $f(x) = x$ on $(0, 2)$, and $f(0) = 5$. State the value the Fourier series converges to at each point.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$x = 0$`, answer: `The left limit is 2 and the right limit is 0, so the series gives 1. The assigned value $f(0) = 5$ is irrelevant.` },
                { prompt: `$x = 1$`, answer: `$f$ is continuous there, so the series gives $f(1) = 1$.` },
                { prompt: `$x = 2$`, answer: `The left limit is $2$ (from $f = x$), and the right limit is the value just right of $-2$, which is also 2. So the series gives 2.` },
                { prompt: `$x = 3$`, answer: `By periodicity $f(3) = f(-1) = 2$, a point of continuity, so the series gives 2.` },
              ],
            },
            {
              slug: 'odd-squares-sum',
              title: 'Two sums from one series',
              prompt: `Use the triangle wave series $|x| = \\frac\\pi2 - \\frac4\\pi\\sum_{n\\ \\text{odd}}\\frac{\\cos nx}{n^2}$ on $[-\\pi, \\pi]$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Justify that the convergence theorem applies at $x = 0$.`, answer: `The periodic extension of $|x|$ is continuous everywhere and piecewise smooth, so the series converges to $f(0) = 0$ at $x = 0$ (in fact uniformly).` },
                { prompt: `Evaluate at $x = 0$ to find $\\sum_{k=0}^\\infty \\frac{1}{(2k + 1)^2}$.`, answer: `$0 = \\frac\\pi2 - \\frac4\\pi S$, so $S = \\frac{\\pi^2}{8}$.` },
                { prompt: `Use Parseval to find $\\sum_{k=0}^\\infty \\frac{1}{(2k + 1)^4}$.`, answer: `$\\frac1\\pi\\int_{-\\pi}^\\pi x^2\\,dx = \\frac{2\\pi^2}{3} = \\frac{a_0^2}{2} + \\sum a_n^2 = \\frac{\\pi^2}{2} + \\frac{16}{\\pi^2}\\sum_{n\\ \\text{odd}}\\frac{1}{n^4}$. So the sum is $\\frac{\\pi^2}{16}\\cdot\\frac{\\pi^2}{6} = \\frac{\\pi^4}{96} \\approx 1.0147$.` },
              ],
            },
            {
              slug: 'measure-gibbs',
              title: 'Measure the Gibbs overshoot',
              prompt: `Compute the partial sums of the square wave, $\\frac4\\pi\\sum \\frac{\\sin nx}{n}$ over odd $n$ up to $2N - 1$, with $N = 10, 100, 1000$ harmonics on a fine grid near $x = 0$.`,
              kind: 'simulation',
              difficulty: 2,
              parts: [
                { prompt: `Find the maximum value and the location of the first peak for each $N$.`, answer: `Maximum about $1.17981$, $1.17899$ and $1.17898$, at $x \\approx 0.15709$, $0.015707$ and $0.0015708$.` },
                { prompt: `Show that the height approaches $\\frac{2}{\\pi}\\int_0^\\pi \\frac{\\sin t}{t}\\,dt \\approx 1.179$ and that the location is about $\\pi/(2N)$.`, answer: `$\\frac2\\pi\\int_0^\\pi\\frac{\\sin t}{t}\\,dt = 1.178980$ (by \`quad\`), which the peaks approach, and $\\pi/(2N) = 0.15708$, $0.015708$, $0.0015708$ match the locations. The overshoot does not shrink: it stays at about 9% of the jump of 2 and only moves towards the jump.` },
              ],
            },
            {
              slug: 'differentiate-series',
              title: 'Differentiate and integrate',
              prompt: `Use the triangle wave and sawtooth series to produce new series.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Start from the triangle wave series for $|x|$. Differentiate it term by term and show that you get the square wave series. Why is this legitimate?`, answer: `$\\frac{d}{dx}\\left[\\frac\\pi2 - \\frac4\\pi\\sum_{n\\ \\text{odd}}\\frac{\\cos nx}{n^2}\\right] = \\frac4\\pi\\sum_{n\\ \\text{odd}}\\frac{\\sin nx}{n}$, the square wave, which is the derivative of $|x|$ (it is $\\operatorname{sign} x$). It is legitimate because the periodic extension of $|x|$ is continuous and its derivative is piecewise smooth; a jump in $f$ itself would break term-by-term differentiation.` },
                { prompt: `Integrate the sawtooth series for $x$ term by term from 0 to $x$ to find the series of $x^2$ on $(-\\pi, \\pi)$, fixing the constant using the average value.`, answer: `$\\frac{x^2}{2} = 2\\sum\\frac{(-1)^{n+1}}{n^2}(1 - \\cos nx)$, so $x^2 = C + 4\\sum\\frac{(-1)^n}{n^2}\\cos nx$. The cosine terms average to zero, so $C$ is the average of $x^2$, which is $\\frac{\\pi^2}{3}$. (Integration is always allowed term by term.)` },
                { prompt: `Compare with the exercise on general period.`, answer: `With $L = \\pi$ that exercise gives $a_0/2 = \\pi^2/3$ and $a_n = \\frac{4(-1)^n}{n^2}$: the same series.` },
              ],
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
          quiz: [
            {
              question: `The square wave equal to $-1$ on $(-\\pi, 0)$ and $1$ on $(0, \\pi)$ has $b_n = \\dfrac{4}{n\\pi}$ for odd $n$ and all other coefficients 0. What does Parseval's identity give?`,
              options: [`$\\sum_{n\\ \\text{odd}} \\dfrac{1}{n^2} = \\dfrac{\\pi^2}{16}$`, `$\\sum_{n\\ \\text{odd}} \\dfrac{1}{n^2} = \\dfrac{\\pi^2}{8}$`, `$\\sum_{n \\geq 1} \\dfrac{1}{n^2} = \\dfrac{\\pi^2}{8}$`, `$\\sum_{n\\ \\text{odd}} \\dfrac{1}{n} = \\dfrac{\\pi}{4}$`],
              answer: 1,
              explanation: `$\\frac1\\pi\\int_{-\\pi}^\\pi f^2\\,dx = 2 = \\sum b_n^2 = \\frac{16}{\\pi^2}\\sum_{n\\ \\text{odd}}\\frac{1}{n^2}$, so the sum over odd $n$ is $\\frac{\\pi^2}{8}$. $\\frac{\\pi^2}{16}$ comes from normalising with $\\frac{1}{2\\pi}$ instead of $\\frac1\\pi$, and the third option forgets that only odd $n$ appear.`,
            },
            {
              question: `As more terms are added, what happens to the overshoot of square-wave partial sums next to the jump?`,
              options: [`It shrinks to zero like $1/N$`, `It grows without bound`, `It disappears once enough terms are taken`, `Its height stays at about 9% of the jump, while it moves closer to the jump`],
              answer: 3,
              explanation: `This is the Gibbs phenomenon: the peak tends to about 1.179 for a jump from $-1$ to $1$, an overshoot of about 9% of the jump, at a distance about $\\pi/(2N)$. Pointwise convergence still holds, because any fixed $x \\neq 0$ is eventually passed by the moving peak, which is why "it shrinks to zero" is tempting but wrong for the height.`,
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
              answer: `Each sine mode $\\sin nx$ decays like $e^{-2n^2t}$, so $u = 3e^{-2t}\\sin x - e^{-32t}\\sin 4x$. Check: $u_t = -6e^{-2t}\\sin x + 32e^{-32t}\\sin 4x$ and $2u_{xx} = 2(-3e^{-2t}\\sin x + 16e^{-32t}\\sin 4x)$, which agree; the ends are 0 and $t = 0$ gives the data.`,
            },
            {
              slug: 'uniform-rod-cooling',
              title: 'Cooling a uniform rod',
              prompt: `A rod with $L = 1$ and $\\alpha = 0.1$ starts at $u = 100$ and has both ends held at 0.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the series solution.`, answer: `The sine coefficients of 100 are $\\frac{400}{n\\pi}$ for odd $n$, so $u = \\frac{400}{\\pi}\\sum_{n\\ \\text{odd}}\\frac1n e^{-0.1n^2\\pi^2t}\\sin n\\pi x$.` },
                { prompt: `Keeping the first non-zero term, estimate the time for the midpoint to fall to 50.`, answer: `$\\frac{400}{\\pi}e^{-0.1\\pi^2t} = 50$ gives $t = \\frac{\\ln(8/\\pi)}{0.1\\pi^2} \\approx 0.947$.` },
                { prompt: `Compute the time accurately with more terms, and comment on the error.`, answer: `With many terms, $t \\approx 0.9469$, so the one-term estimate is off by only about $2 \\times 10^{-4}$. By then the $n = 3$ term is smaller than the first by a factor $\\frac13e^{-0.8\\pi^2t} \\approx 2 \\times 10^{-4}$, so one term is plenty; it would not be for small $t$.` },
              ],
            },
            {
              slug: 'insulated-rod',
              title: 'An insulated rod',
              prompt: `Solve $u_t = u_{xx}$ on $0 < x < 1$ with $u_x(0, t) = u_x(1, t) = 0$ and $u(x, 0) = x$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the solution and state the limiting temperature.`, answer: `The cosine coefficients of $x$ on $(0, 1)$ are $a_0 = 1$ and $a_n = -\\frac{4}{n^2\\pi^2}$ for odd $n$, so $u = \\frac12 - \\frac{4}{\\pi^2}\\sum_{n\\ \\text{odd}}\\frac{1}{n^2}e^{-n^2\\pi^2t}\\cos n\\pi x$. The limit is the average, $\\frac12$.` },
                { prompt: `Using the first non-constant term, find the time after which the solution is within 1% of that limit everywhere.`, answer: `Need $\\frac{4}{\\pi^2}e^{-\\pi^2t} \\leq 0.005$ (1% of $\\frac12$), so $t \\geq \\frac{1}{\\pi^2}\\ln\\frac{4}{0.005\\pi^2} \\approx 0.445$. (If you read 1% as an absolute 0.01, you get $t \\approx 0.375$.)` },
              ],
            },
            {
              slug: 'nonzero-ends',
              title: 'Non-zero end temperatures',
              prompt: `A rod of length $\\pi$ with $\\alpha = 1$ has $u(0, t) = 0$, $u(\\pi, t) = 10$, and starts at 0.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the steady state.`, answer: `$v'' = 0$ with $v(0) = 0$, $v(\\pi) = 10$: $v = 10x/\\pi$.` },
                { prompt: `Find the series for the difference $w = u - v$.`, answer: `$w$ has zero end values and starts at $-10x/\\pi$, whose sine coefficients are $\\frac{20(-1)^n}{n\\pi}$. So $w = \\sum_{n=1}^\\infty\\frac{20(-1)^n}{n\\pi}e^{-n^2t}\\sin nx$.` },
                { prompt: `Write the full solution and evaluate $u(\\pi/2, 1)$ to three significant figures.`, answer: `$u = \\frac{10x}{\\pi} + \\sum_{n=1}^\\infty\\frac{20(-1)^n}{n\\pi}e^{-n^2t}\\sin nx$. At $(\\pi/2, 1)$: $5 - \\frac{20}{\\pi}e^{-1} + \\frac{20}{3\\pi}e^{-9} - \\dots \\approx 2.66$.` },
              ],
            },
            {
              slug: 'finite-difference-heat',
              title: 'Check by finite differences',
              prompt: `Solve the worked example ($\\alpha = 1$, $L = \\pi$, $f = x(\\pi - x)$) numerically using the explicit scheme $u_i^{k+1} = u_i^k + r(u_{i+1}^k - 2u_i^k + u_{i-1}^k)$, with $r = \\alpha\\Delta t/\\Delta x^2$, on 100 spatial intervals.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `With $r = 0.4$, compare with the series at $t = 0.1$ and $t = 1$.`, answer: `The maximum difference from the series should be about $6 \\times 10^{-5}$ at $t = 0.1$ and $1 \\times 10^{-4}$ at $t = 1$, when the midpoint value is about $\\frac{8}{\\pi}e^{-1} \\approx 0.937$. (Compare at the time actually reached, $n\\Delta t$.)` },
                { prompt: `Try $r = 0.4$ and $r = 0.6$, and describe what happens in each case.`, answer: `$r = 0.4$ is smooth and accurate. $r = 0.6$ blows up: a sawtooth oscillation from grid to grid grows by a factor of about $|1 - 4r| = 1.4$ per step, reaching about $10^{18}$ by $t = 0.1$. The explicit scheme is stable only for $r \\leq \\frac12$.` },
              ],
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
          quiz: [
            {
              question: `What is the solution of $u_t = 3u_{xx}$ on $0 < x < \\pi$ with $u(0, t) = u(\\pi, t) = 0$ and $u(x, 0) = 5\\sin 2x$?`,
              options: [`$5e^{-12t}\\sin 2x$`, `$5e^{-6t}\\sin 2x$`, `$5e^{-4t}\\sin 2x$`, `$5e^{-3t}\\sin 2x$`],
              answer: 0,
              explanation: `The mode $\\sin nx$ decays like $e^{-\\alpha n^2t}$, and here $\\alpha n^2 = 3 \\cdot 4 = 12$. Check: $u_t = -60e^{-12t}\\sin 2x$ and $3u_{xx} = 3(-20e^{-12t}\\sin 2x)$. $e^{-6t}$ uses $n$ instead of $n^2$, and $e^{-4t}$ forgets $\\alpha$.`,
            },
            {
              question: `A rod with both ends insulated starts with $u(x, 0) = 4 + 3\\cos(\\pi x/L)$. What does $u$ tend to as $t \\to \\infty$?`,
              options: [`$0$, since every mode decays`, `$7$, the initial maximum`, `$4$, the average initial temperature`, `$1$, the initial minimum`],
              answer: 2,
              explanation: `With insulated ends the cosine modes decay except $n = 0$, the constant term, which is the average of the initial data: no heat leaves, so it spreads out evenly. The answer 0 is right for ends held at 0, where every sine mode decays; mixing up the two boundary conditions is the trap.`,
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
              prompt: `Solve $u_{tt} = 4u_{xx}$ on $0 < x < \\pi$ with fixed ends, and substitute your answers back into the equation.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$u(x, 0) = \\sin 3x$, $u_t(x, 0) = 0$`, answer: `$c = 2$, so the mode $\\sin 3x$ has $\\omega = 6$: $u = \\sin 3x\\cos 6t$. Check: $u_{tt} = -36\\sin 3x\\cos 6t = 4(-9\\sin 3x\\cos 6t) = 4u_{xx}$.` },
                { prompt: `$u(x, 0) = 0$, $u_t(x, 0) = \\sin 2x$`, answer: `$\\omega = 4$ and $4B = 1$, so $u = \\frac14\\sin 2x\\sin 4t$. Check: $u_{tt} = -4\\sin 2x\\sin 4t$ and $4u_{xx} = 4 \\cdot \\frac14(-4)\\sin 2x\\sin 4t$, the same; $u_t(x, 0) = \\sin 2x$.` },
              ],
            },
            {
              slug: 'guitar-string',
              title: 'Tuning a string',
              prompt: `A steel string has length 0.65 m, linear density 3.6 g/m and tension 60 N.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the wave speed, the fundamental frequency and the second harmonic.`, answer: `Convert the density: $\\rho = 0.0036$ kg/m. Then $c = \\sqrt{60/0.0036} \\approx 129.1$ m/s, $f_1 = c/(2L) = 129.1/1.3 \\approx 99.3$ Hz and $f_2 = 2f_1 \\approx 198.6$ Hz.` },
                { prompt: `By what factor must the tension be changed to raise the pitch one octave?`, answer: `An octave doubles the frequency, so $c$ must double, and $c \\propto \\sqrt\\tau$ means the tension must be multiplied by 4 (to 240 N).` },
                { prompt: `What is the effect of pressing the string at the midpoint?`, answer: `The vibrating length halves, so every frequency doubles: the fundamental becomes about 198.6 Hz, one octave up.` },
              ],
            },
            {
              slug: 'struck-string',
              title: 'A struck string',
              prompt: `A string of length $\\pi$ with $c = 1$ starts flat, with velocity $g(x) = 1$ on $(\\pi/4, 3\\pi/4)$ and 0 elsewhere.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the series for $u$.`, answer: `$A_n = 0$, and $nB_n = \\frac2\\pi\\int_{\\pi/4}^{3\\pi/4}\\sin nx\\,dx$, so $B_n = \\frac{2}{\\pi n^2}\\left(\\cos\\frac{n\\pi}{4} - \\cos\\frac{3n\\pi}{4}\\right)$, which is 0 for even $n$ (for example $B_1 = \\frac{2\\sqrt2}{\\pi}$). Then $u = \\sum B_n\\sin nt\\sin nx$.` },
                { prompt: `Evaluate $u(\\pi/2, \\pi/4)$ numerically from the series, and compare with the exact value $\\pi/4$ from d'Alembert's integral formula $u = \\frac{1}{2c}\\int_{x - ct}^{x + ct}\\tilde g(s)\\,ds$.`, answer: `d'Alembert: $\\frac12\\int_{\\pi/4}^{3\\pi/4}1\\,ds = \\frac\\pi4 \\approx 0.785398$. The series converges slowly, since $B_n \\sim 1/n^2$: 10 terms give about $0.7537$, 100 terms $0.7822$, 1000 terms $0.78508$.` },
              ],
            },
            {
              slug: 'mode-energy',
              title: 'Conserved energy',
              prompt: `Define $E(t) = \\frac12\\int_0^L(u_t^2 + c^2 u_x^2)\\,dx$ for a solution of $u_{tt} = c^2u_{xx}$ with fixed ends.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Differentiate under the integral and integrate by parts to show $E' = 0$.`, answer: `$E' = \\int_0^L(u_tu_{tt} + c^2u_xu_{xt})\\,dx = c^2\\int_0^L(u_tu_{xx} + u_xu_{xt})\\,dx = c^2\\big[u_xu_t\\big]_0^L$. Fixed ends mean $u_t = 0$ at $x = 0$ and $L$, so $E' = 0$.` },
                { prompt: `Compute $E$ for $u = \\sin(n\\pi x/L)\\cos\\omega_n t$ directly.`, answer: `With $k = n\\pi/L$ and $\\omega_n = ck$: $u_t^2 = \\omega_n^2\\sin^2kx\\sin^2\\omega_nt$ and $c^2u_x^2 = \\omega_n^2\\cos^2kx\\cos^2\\omega_nt$. Both $\\sin^2kx$ and $\\cos^2kx$ integrate to $L/2$, so $E = \\frac{L\\omega_n^2}{4}(\\sin^2 + \\cos^2) = \\frac{L\\omega_n^2}{4} = \\frac{n^2\\pi^2c^2}{4L}$, constant in time.` },
              ],
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
          quiz: [
            {
              question: `A string 0.5 m long carries waves at $c = 200$ m/s. What is its fundamental frequency?`,
              options: [`$100$ Hz`, `$400$ Hz`, `$200$ Hz`, `$400\\pi$ Hz`],
              answer: 2,
              explanation: `$f_1 = c/(2L) = 200/1 = 200$ Hz: the fundamental has half a wavelength on the string, so $\\lambda = 2L$. $400$ Hz uses $c/L$, forgetting the factor 2, and $400\\pi$ is the angular frequency $\\omega_1 = \\pi c/L$ in rad/s, not a frequency in Hz.`,
            },
            {
              question: `On $0 < x < \\pi$ with fixed ends, start from $u(x, 0) = \\sin x$ and $u_t(x, 0) = 0$. The heat equation $u_t = u_{xx}$ gives $e^{-t}\\sin x$. What does the wave equation $u_{tt} = u_{xx}$ give?`,
              options: [`$\\sin x\\cos t$`, `$e^{-t}\\sin x$`, `$\\sin x\\sin t$`, `$\\sin x$, unchanged`],
              answer: 0,
              explanation: `For the wave equation the time factor solves $T'' + T = 0$, an oscillation, and $T(0) = 1$, $T'(0) = 0$ give $\\cos t$. Heat modes decay, wave modes oscillate for ever, so $e^{-t}\\sin x$ carries over the wrong behaviour. $\\sin x\\sin t$ would match zero initial displacement and non-zero velocity instead.`,
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
              answer: `$u = \\sin\\frac{\\pi x}{a}\\cdot\\frac{\\sinh(\\pi(b - y)/a)}{\\sinh(\\pi b/a)}$. Then $u_{xx} = -\\frac{\\pi^2}{a^2}u$ and $u_{yy} = \\frac{\\pi^2}{a^2}u$, so $\\Delta u = 0$. At $y = 0$ the fraction is 1, giving $\\sin(\\pi x/a)$; at $y = b$ it is 0; at $x = 0$ and $x = a$ the sine is 0.`,
            },
            {
              slug: 'disk-from-data',
              title: 'A disk from boundary data',
              prompt: `On the unit disk, solve $\\Delta u = 0$ with $u(1, \\theta) = 1 + 2\\cos\\theta + \\sin 2\\theta$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the answer in Cartesian coordinates, and check directly that it is harmonic.`, answer: `Each mode gains a factor $r^n$: $u = 1 + 2r\\cos\\theta + r^2\\sin 2\\theta = 1 + 2x + 2xy$. Then $u_{xx} = 0$ and $u_{yy} = 0$, so $\\Delta u = 0$.` },
                { prompt: `State the value at the centre, and verify that it is the average of the boundary values.`, answer: `$u(0, 0) = 1$. The average of $1 + 2\\cos\\theta + \\sin 2\\theta$ over $[0, 2\\pi]$ is 1, since the trigonometric terms average to 0.` },
                { prompt: `Find the point of the boundary at which $u$ is largest, and the value there.`, answer: `$\\frac{d}{d\\theta}(1 + 2\\cos\\theta + \\sin 2\\theta) = -2\\sin\\theta + 2\\cos 2\\theta = 0$ gives $2\\sin^2\\theta + \\sin\\theta - 1 = 0$, so $\\sin\\theta = \\frac12$ or $-1$. The maximum is at $\\theta = \\pi/6$, the point $(\\frac{\\sqrt3}{2}, \\frac12)$, with value $1 + \\frac{3\\sqrt3}{2} \\approx 3.598$.` },
              ],
            },
            {
              slug: 'square-two-sides',
              title: 'Two hot sides',
              prompt: `On the unit square, $u = 1$ on the top and right edges, and $u = 0$ on the left and bottom edges.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Using the symmetry argument of the lesson together with superposition, find $u$ at the centre, with no computation of series.`, answer: `$u$ is the sum of the problem with only the top hot and the problem with only the right side hot. Each has the value $\\frac14$ at the centre by the four-rotation argument, so $u = \\frac12$ there.` },
                { prompt: `Evaluate the series for $u(0.75, 0.75)$ to four decimal places.`, answer: `With $u_{\\text{top}} = \\sum_{n\\ \\text{odd}}\\frac{4}{n\\pi}\\frac{\\sinh n\\pi y}{\\sinh n\\pi}\\sin n\\pi x$, the right-edge problem is $u_{\\text{top}}(y, x)$, and at $(0.75, 0.75)$ the two are equal. So $u = 2u_{\\text{top}}(0.75, 0.75) \\approx 0.8641$.` },
              ],
            },
            {
              slug: 'jacobi-laplace',
              title: 'Solve Laplace numerically',
              prompt: `Solve the worked example (top edge at 1, other edges at 0) on an $N \\times N$ grid using Jacobi iteration, replacing each interior value by the average of its four neighbours. Run with $N = 21, 41, 81$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Report the value at the centre and the number of iterations needed for the largest update to fall below $10^{-6}$.`, answer: `Starting from zero you should find roughly: $N = 21$, centre $0.2499$ after about 690 iterations; $N = 41$, $0.2497$ after about 2300; $N = 81$, $0.2487$ after about 7500. The exact value is $\\frac14$. The drift for large $N$ comes from stopping too early: with slow convergence, an update of $10^{-6}$ still leaves an error of order $10^{-3}$.` },
                { prompt: `How does the iteration count grow with $N$?`, answer: `Roughly like $N^2$: each doubling of $N$ multiplies the count by about 3 to 4, because the slowest error mode shrinks by a factor of only about $1 - \\pi^2/(2N^2)$ per sweep.` },
              ],
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
          quiz: [
            {
              question: `On the unit disk, $u$ is harmonic with boundary values $u(1, \\theta) = 3 + \\cos 2\\theta$. What is $u$ at $r = \\frac12$, $\\theta = 0$?`,
              options: [`$3.5$`, `$4$`, `$3.125$`, `$3.25$`],
              answer: 3,
              explanation: `The mode $\\cos 2\\theta$ becomes $r^2\\cos 2\\theta$ inside, so $u = 3 + \\frac14 = 3.25$. Using $r$ instead of $r^2$ gives 3.5, and 4 is the boundary value at $\\theta = 0$, which the interior does not copy.`,
            },
            {
              question: `A harmonic function on a square has boundary values that all lie between $-1$ and $2$, and it is not constant. What can you say about its values inside?`,
              options: [`Nothing: inside it may exceed the boundary values`, `They lie strictly between $-1$ and $2$`, `They all equal the average, $0.5$`, `They lie between $-2$ and $4$`],
              answer: 1,
              explanation: `By the mean value property, an interior maximum would be the average of nearby values, all no larger, which forces the function to be constant. So a non-constant harmonic function takes its extremes on the boundary: the maximum principle. Only the value at the centre of a disk equals a boundary average; other points are not all equal to it.`,
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
