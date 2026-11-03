import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const ivrii = (note: string): ResourceInput => ({
  title: 'Partial Differential Equations (online textbook)',
  url: 'https://www.math.toronto.edu/ivrii/PDE-textbook/',
  type: 'textbook',
  cost: 'free',
  provider: 'Victor Ivrii, University of Toronto',
  note,
  primary: true,
});

const mit18152 = (note: string): ResourceInput => ({
  title: 'MIT 18.152 Introduction to Partial Differential Equations',
  url: 'https://ocw.mit.edu/courses/18-152-introduction-to-partial-differential-equations-fall-2011/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const mit18303 = (note: string): ResourceInput => ({
  title: 'MIT 18.303 Linear Partial Differential Equations',
  url: 'https://ocw.mit.edu/courses/18-303-linear-partial-differential-equations-fall-2006/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const olver = (note: string): ResourceInput => ({
  title: 'Olver, Introduction to Partial Differential Equations (book page)',
  url: 'https://www-users.cse.umn.edu/~olver/pde.html',
  type: 'textbook',
  cost: 'paid',
  provider: 'Peter J. Olver',
  note,
});

const diffyqs = (note: string): ResourceInput => ({
  title: 'Notes on Diffy Qs',
  url: 'https://www.jirka.org/diffyqs/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jiří Lebl',
  note,
});

const fdmBook = (note: string): ResourceInput => ({
  title: 'Finite Difference Computing with PDEs',
  url: 'https://hplgit.github.io/fdm-book/doc/web/index.html',
  type: 'textbook',
  cost: 'free',
  provider: 'Hans Petter Langtangen and Svein Linge',
  note,
});

const wiki = (page: string, title: string, note: string): ResourceInput => ({
  title: `Wikipedia: ${title}`,
  url: `https://en.wikipedia.org/wiki/${page}`,
  type: 'article',
  cost: 'free',
  provider: 'Wikipedia',
  note,
});

const dlmf = (chapter: string, title: string, note: string): ResourceInput => ({
  title: `NIST Digital Library of Mathematical Functions: ${title}`,
  url: `https://dlmf.nist.gov/${chapter}`,
  type: 'documentation',
  cost: 'free',
  provider: 'NIST',
  note,
});

export default defineSubject({
  id: 'partial-differential-equations',
  title: 'Introduction to Partial Differential Equations',
  category: 'math',
  tagline:
    'Derive the classical equations of physics and solve them properly: characteristics, the wave and heat equations, Fourier series, Laplace\'s equation and transforms.',
  description: `Partial differential equations describe quantities that vary in space and time: heat in a metal plate, a vibrating drum, pressure in a fluid, the potential around a charge. This course derives the main linear equations from conservation laws, and then studies each with the methods that suit it. You will meet characteristics for first-order equations, d'Alembert's formula and energy for waves, the maximum principle and the heat kernel for diffusion, separation of variables with careful attention to convergence, mean values and Green's functions for Laplace's equation, and the Fourier transform. The last module moves to higher dimensions and to numerical methods.

This course follows the topics of MATH 442, Introduction to Partial Differential Equations, at the University of Illinois Urbana-Champaign, as described in its public catalog entry: the wave, heat and Laplace equations, separation of variables, Fourier series and eigenfunction expansions, maximum principles and related topics. The lessons, examples and exercises here are original, and the course is not affiliated with or endorsed by the University of Illinois.

It assumes \`differential-equations\`, including the short introduction to the heat, wave and Laplace equations at its end, and multivariable calculus with the divergence theorem. It is an introduction with real derivations: theorems are stated with their hypotheses and most are proved, but measure theory is not used, and convergence is treated with the tools of advanced calculus. Each lesson pairs the analysis with a computation you can run, because a formula you have checked numerically is one you understand.`,
  difficulty: 'advanced',
  estimatedHours: 70,
  prerequisites: ['differential-equations'],
  recommendedBackground: [
    'Multivariable calculus, including the divergence theorem and polar and spherical coordinates',
    'Fourier series at the level of an introductory differential equations course',
    'Some exposure to proofs, such as from a course on higher mathematics',
    'Python with NumPy, SciPy and Matplotlib',
  ],
  tags: ['PDEs', 'wave equation', 'heat equation', 'Laplace equation', 'Fourier series', 'Fourier transform', 'mathematical physics'],
  core: false,
  modules: [
    {
      slug: 'modeling-and-first-order-equations',
      title: 'Modeling and First-Order Equations',
      description:
        'Derive PDEs from conservation laws, solve first-order equations by characteristics, see how shocks form in non-linear conservation laws, and classify second-order equations.',
      lessons: [
        {
          slug: 'conservation-laws-and-derivations',
          title: 'Conservation laws and derivations',
          summary:
            'Every classical PDE in this course comes from a balance law plus a constitutive law. Derive the heat and wave equations, and see what boundary data a well-posed problem needs.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the integral and differential forms of a conservation law',
            'Derive the heat equation from Fourier\'s law and the wave equation for a string',
            'Choose physically meaningful boundary conditions: Dirichlet, Neumann and Robin',
            'State what makes a problem well posed',
          ],
          concepts: [
            'Conservation law',
            'Flux and source',
            'Constitutive law',
            'Fourier\'s law and Fick\'s law',
            'Boundary conditions',
            'Well-posedness',
          ],
          explanation: `Let $u(x, t)$ be the density of some quantity along a line, such as heat energy or a pollutant, let $\\phi(x, t)$ be its **flux** (the amount crossing the point $x$ per unit time, rightward counted positive), and let $s(x, t)$ be a source. For every interval $[a, b]$,

$$\\frac{d}{dt}\\int_a^bu\\,dx = \\phi(a, t) - \\phi(b, t) + \\int_a^bs\\,dx.$$

This is the integral form of a **conservation law**. If everything is smooth, write $\\phi(a) - \\phi(b) = -\\int_a^b\\phi_x\\,dx$. Since the interval is arbitrary and the integrand is continuous, it must vanish:

$$u_t + \\phi_x = s.$$

To close the equation you need a **constitutive law** relating flux to density. For heat, with temperature $T$, density $\\rho$, specific heat $c$ and conductivity $K$, the energy density is $c\\rho T$ and **Fourier's law** says $\\phi = -KT_x$: heat flows down the gradient. So $c\\rho T_t = (KT_x)_x + s$, and for constant coefficients $T_t = kT_{xx} + s/(c\\rho)$ with diffusivity $k = K/(c\\rho)$. **Fick's law** gives the same diffusion equation for concentrations. If instead the flux is carried by a flow at speed $c$, $\\phi = cu$, the result is the transport equation $u_t + cu_x = 0$.

The wave equation comes from Newton's law rather than a constitutive law. A string under tension $\\tau$ with density $\\rho$ has vertical force $\\tau u_x$ on its cross-sections for small slopes, and momentum balance gives $\\rho u_{tt} = (\\tau u_x)_x$, so $u_{tt} = c^2u_{xx}$ with $c^2 = \\tau/\\rho$.

**Boundary conditions** say what happens at the ends. **Dirichlet** fixes $u$, such as an end held at a temperature. **Neumann** fixes $u_x$, hence the flux; $u_x = 0$ is an insulated end. **Robin** sets $-Ku_x = h(u - T_{\\text{out}})$ at a right-hand end, which is Newton's law of cooling at a surface.

A problem is **well posed**, in Hadamard's sense, when a solution exists, it is unique, and it depends continuously on the data. All three matter: a model whose answer jumps when the data change slightly cannot predict anything.

**Worked example.** A rod of length $L$ has its ends held at 0 °C and is heated internally at a constant rate $Q$ per unit volume. Find the steady temperature.

At steady state $T_t = 0$, so $KT'' = -Q$ with $T(0) = T(L) = 0$. Integrating twice, $T = -\\frac{Q}{2K}x^2 + Ax + B$. The condition at $0$ gives $B = 0$, and at $L$ gives $A = \\frac{QL}{2K}$. So

$$T(x) = \\frac{Q}{2K}x(L - x),$$

with maximum $QL^2/(8K)$ at the centre. Check the energy balance: the flux out of the right end is $-KT'(L) = QL/2$, the same leaves the left end, and the total $QL$ equals the heat generated. Doubling the length quadruples the peak temperature, which is why long heated rods need cooling along their length.`,
          resources: [
            ivrii('The opening chapter on how PDEs arise, and the derivations of the basic equations.'),
            mit18303('The early lecture notes on deriving the heat and wave equations.'),
            olver('The book is paid. Its home page has errata and supporting material, and its first chapters are a careful model of derivations.'),
          ],
          exercises: [
            {
              slug: 'derive-with-variable-coefficients',
              title: 'A rod with varying properties',
              prompt: `A rod has cross-sectional area $A(x)$, constant $c\\rho$ and conductivity $K(x)$, and loses heat through its side at a rate $h(T - T_0)$ per unit length. Derive $c\\rho A T_t = (KAT_x)_x - h(T - T_0)$ from an energy balance on $[a, b]$. State clearly which step needs continuity of the integrand.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'steady-state-with-cooling',
              title: 'Steady state with cooling at one end',
              prompt: `A rod $0 \\leq x \\leq 1$ with $k = 1$ has $T(0) = 100$ and a Robin condition $T'(1) = -2(T(1) - 20)$ at the right end. Find the steady temperature and the heat flux out at $x = 1$. Check that the temperature at $x = 1$ lies between 20 and 100, and explain why it must.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'pollutant-in-river',
              title: 'Pollutant in a river',
              prompt: `A pollutant is carried by a river at speed $v$, diffuses with coefficient $D$, and decays at rate $\\lambda$. Derive $u_t + vu_x = Du_{xx} - \\lambda u$. Find the steady state on $x > 0$ when $u(0) = u_0$ and $u$ stays bounded, and give its decay length for $v = 0.5$ m/s, $D = 10$ m$^2$/s and $\\lambda = 10^{-4}$ s$^{-1}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'ill-posed-example',
              title: 'An ill-posed problem',
              prompt: `Consider Laplace's equation $u_{xx} + u_{yy} = 0$ for $y > 0$ with "initial data" $u(x, 0) = 0$, $u_y(x, 0) = \\frac{1}{n}\\sin nx$. Show that $u_n = \\frac{1}{n^2}\\sin(nx)\\sinh(ny)$ is a solution. Show that the data tend to 0 uniformly as $n \\to \\infty$, while $u_n(\\pi/(2n), 1) \\to \\infty$. Which of Hadamard's conditions fails?`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two ingredients produce the heat equation?',
              answerOutline: 'Conservation of energy, $u_t + \\phi_x = s$, and Fourier\'s law $\\phi = -Ku_x$.',
            },
            {
              question: 'What does a Neumann condition $u_x = 0$ mean for heat flow?',
              answerOutline: 'No flux through the boundary: the end is insulated.',
            },
            {
              question: 'What are Hadamard\'s three conditions?',
              answerOutline: 'Existence, uniqueness, and continuous dependence on the data.',
            },
          ],
        },
        {
          slug: 'linear-first-order-equations',
          title: 'Linear first-order equations and characteristics',
          summary:
            'A first-order linear PDE is an ODE along certain curves. Find those curves and you have the solution.',
          estimatedMinutes: 110,
          objectives: [
            'Solve constant-coefficient equations by a change of coordinates',
            'Find characteristic curves for variable coefficients',
            'Solve initial and boundary value problems along characteristics, including with lower-order terms',
            'Recognise when data on a curve fail to determine a solution',
          ],
          concepts: [
            'Transport equation',
            'Characteristic curve',
            'Directional derivative',
            'Characteristic coordinates',
            'Non-characteristic data',
            'Constant along characteristics',
          ],
          explanation: `The equation $au_x + bu_y = 0$, with constants $a, b$ not both zero, says that the directional derivative of $u$ in the direction $(a, b)$ vanishes. So $u$ is constant along every line $bx - ay = C$, and the general solution is

$$u(x, y) = f(bx - ay)$$

for an arbitrary differentiable $f$. In time and space, $u_t + cu_x = 0$ has $u = f(x - ct)$: the initial profile moves right at speed $c$ without changing shape.

For variable coefficients, $a(x, y)u_x + b(x, y)u_y = 0$, the same idea works along curves. A **characteristic curve** is a solution of

$$\\frac{dx}{ds} = a(x, y), \\qquad \\frac{dy}{ds} = b(x, y).$$

Along it, $\\frac{d}{ds}u(x(s), y(s)) = au_x + bu_y = 0$, so $u$ is constant on each characteristic. If the characteristics are the level sets of a function $\\xi(x, y) = C$, the general solution is $u = f(\\xi(x, y))$. Lower-order terms are handled the same way: for $au_x + bu_y + cu = g$, the restriction of $u$ to a characteristic satisfies a linear ODE.

To fix $f$ you need data on a curve that each characteristic crosses exactly once. If the data curve is itself a characteristic, the data must be constant along it, and then the solution is not unique; otherwise there is no solution at all.

**Worked example.** Solve $u_t + xu_x = 0$ for $t > 0$, with $u(x, 0) = f(x)$.

The characteristics satisfy $\\frac{dx}{dt} = x$, so $x = \\xi e^t$, where $\\xi$ is the starting point at $t = 0$. Along each, $u$ is constant, so $u(\\xi e^t, t) = f(\\xi)$. Solving for $\\xi = xe^{-t}$,

$$u(x, t) = f(xe^{-t}).$$

Check: $u_t = f'(xe^{-t})(-xe^{-t})$ and $xu_x = x\\,f'(xe^{-t})e^{-t}$, which sum to zero, and $u(x, 0) = f(x)$.

The characteristics spread out, so the profile is stretched: a bump of width 1 at $t = 0$ has width $e^t$ later. Values move along the characteristics without change, and so the maximum and minimum of $u$ never change, a first example of a maximum principle.

If the equation is $u_t + xu_x = -u$ instead, then along a characteristic $\\frac{d}{dt}u = -u$, so $u(x, t) = e^{-t}f(xe^{-t})$. The total $\\int u\\,dx$ is then conserved, since the stretching by $e^t$ and the decay by $e^{-t}$ cancel. In fact this second equation is the conservation law $u_t + (xu)_x = 0$, with flux $\\phi = xu$ for a flow with velocity $x$.`,
          resources: [
            ivrii('The chapter on first-order equations and characteristics.'),
            mit18152('The first lectures, on the transport equation and characteristics.'),
          ],
          exercises: [
            {
              slug: 'constant-coefficient-drill',
              title: 'Constant coefficients',
              prompt: `Solve $2u_x + 3u_y = 0$ with $u(0, y) = \\sin y$, and check by substitution. Then solve $u_t + 4u_x = -2u$ with $u(x, 0) = e^{-x^2}$, and describe the solution in words.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'variable-characteristics',
              title: 'Curved characteristics',
              prompt: `Solve $(1 + x^2)u_x + u_y = 0$ with $u(x, 0) = x^2$. Sketch several characteristics. Then solve $xu_x + yu_y = 2u$ for $y > 0$ with $u(x, 1) = g(x)$, and explain why the answer is homogeneous of degree 2.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'characteristic-data',
              title: 'Data on a characteristic',
              prompt: `For $u_x + u_y = 0$, show that the problem with $u(x, x) = h(x)$ has a solution only if $h$ is constant, and then infinitely many solutions. Interpret this with the picture of characteristics.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'characteristics-numerically',
              title: 'Trace characteristics numerically',
              prompt: `For $u_t + \\sin(x)u_x = 0$ with $u(x, 0) = \\cos x$, integrate the characteristic ODE $dx/dt = \\sin x$ backward from a grid of points at $t = 2$ to recover $u(x, 2)$. Compare with the exact solution, which follows from $\\tan(x/2) = e^t\\tan(\\xi/2)$, and plot $u(x, t)$ for several times. Where do characteristics accumulate, and what does this do to the gradient of $u$?`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $u$ constant along characteristics of $au_x + bu_y = 0$?',
              answerOutline: 'Along a characteristic the derivative of $u$ is $au_x + bu_y$, which is zero.',
            },
            {
              question: 'What goes wrong when data are given on a characteristic?',
              answerOutline: 'The data must satisfy the equation along it, and the solution off it is not determined.',
            },
            {
              question: 'How do lower-order terms change the method?',
              answerOutline: 'Along each characteristic $u$ solves a linear ODE instead of being constant.',
            },
          ],
        },
        {
          slug: 'nonlinear-conservation-laws',
          title: 'Non-linear conservation laws and shocks',
          summary:
            'When the speed depends on the solution, characteristics cross and shocks form. Find the breaking time and the speed of the shock.',
          estimatedMinutes: 120,
          objectives: [
            'Solve the inviscid Burgers equation by characteristics before breaking',
            'Compute the breaking time from the initial data',
            'Derive the Rankine-Hugoniot condition from the integral form',
            'Solve Riemann problems with shocks and rarefaction fans',
          ],
          concepts: [
            'Inviscid Burgers equation',
            'Wave speed $F\'(u)$',
            'Breaking time',
            'Shock',
            'Rankine-Hugoniot condition',
            'Rarefaction fan',
            'Traffic flow model',
          ],
          explanation: `A conservation law with flux $F(u)$ is $u_t + F(u)_x = 0$, or $u_t + F'(u)u_x = 0$ for smooth solutions. The simplest non-linear case, the inviscid **Burgers equation**, has $F = u^2/2$:

$$u_t + uu_x = 0, \\qquad u(x, 0) = f(x).$$

Characteristics are still curves along which $u$ is constant, but now their speed is $u$ itself, so they are straight lines $x = \\xi + f(\\xi)t$. The solution is given implicitly by $u = f(x - ut)$. Where $f$ decreases, faster characteristics start behind slower ones and eventually catch up.

**Breaking time.** Differentiating $u = f(\\xi)$ with $x = \\xi + f(\\xi)t$ gives $u_x = f'(\\xi)/(1 + f'(\\xi)t)$. This becomes infinite when $1 + f'(\\xi)t = 0$. So if $f'$ is somewhere negative, the first breaking happens at

$$t^* = -\\frac{1}{\\min f'}.$$

After $t^*$ the formula gives several values of $u$ at one point, which is not physical. A **shock** forms instead: a moving discontinuity.

**Rankine-Hugoniot.** A discontinuous $u$ cannot satisfy the PDE pointwise, but it can satisfy the integral form $\\frac{d}{dt}\\int_a^bu\\,dx = F(u(a)) - F(u(b))$. If $u$ jumps from $u_L$ to $u_R$ along $x = s(t)$, applying this on an interval around the shock and letting it shrink gives the shock speed

$$s'(t) = \\frac{F(u_L) - F(u_R)}{u_L - u_R} = \\frac{[F]}{[u]}.$$

For Burgers this is $s' = \\frac12(u_L + u_R)$. Shocks are admissible only when characteristics run into them, $F'(u_L) > s' > F'(u_R)$. If $u_L < u_R$ for Burgers, the admissible solution is instead a **rarefaction fan** $u = x/t$ between the two states.

**Worked example.** Find the breaking time for Burgers with $f(x) = \\frac{1}{1 + x^2}$.

Here $f'(x) = -\\frac{2x}{(1 + x^2)^2}$. To minimise, set $f'' = 0$:

$$f''(x) = \\frac{-2(1 + x^2) + 8x^2}{(1 + x^2)^3} = \\frac{6x^2 - 2}{(1 + x^2)^3},$$

which vanishes at $x = 1/\\sqrt3$. There

$$f'\\left(\\tfrac{1}{\\sqrt3}\\right) = -\\frac{2/\\sqrt3}{(4/3)^2} = -\\frac{9}{8\\sqrt3},$$

so $t^* = \\frac{8\\sqrt3}{9} \\approx 1.540$. The shock first appears at $x = \\xi + f(\\xi)t^* = \\frac{1}{\\sqrt3} + \\frac34\\cdot\\frac{8\\sqrt3}{9} = \\sqrt3 \\approx 1.732$, on the front side of the hump, as you would expect, since the peak moves fastest.

**Traffic.** With car density $\\rho$ and speed $v = v_{\\max}(1 - \\rho/\\rho_{\\max})$, the flux is $\\rho v$. Density waves move at $F'(\\rho)$, which is slower than the cars and negative in heavy traffic. A shock is the back of a queue at a red light.`,
          resources: [
            ivrii('The section on non-linear first-order equations and shocks.'),
            wiki('Burgers%27_equation', "Burgers' equation", 'The inviscid and viscous forms, with the breaking and shock solutions.'),
            wiki('Rankine%E2%80%93Hugoniot_conditions', 'Rankine-Hugoniot conditions', 'The jump condition in general form, for comparison with your derivation.'),
          ],
          exercises: [
            {
              slug: 'breaking-time-drill',
              title: 'Breaking times',
              prompt: `Find the breaking time and location for Burgers' equation with (a) $f(x) = -\\tanh x$; (b) $f(x) = e^{-x^2}$; (c) $f(x) = \\sin x$. For (b), find the location numerically to three decimal places.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'riemann-problems',
              title: 'Riemann problems',
              prompt: `Solve Burgers' equation with (a) $u = 1$ for $x < 0$ and $u = 0$ for $x > 0$; (b) $u = 0$ for $x < 0$ and $u = 1$ for $x > 0$. In (a) give the shock speed and check the admissibility condition. In (b) verify that $u = x/t$ solves the equation in the fan, and that $u$ is continuous for $t > 0$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'derive-rankine-hugoniot',
              title: 'Derive the jump condition',
              prompt: `Let $u$ be smooth on each side of a curve $x = s(t)$, satisfy the PDE on each side, and satisfy the integral form on every interval. Derive the Rankine-Hugoniot condition by applying the integral form on $[a, b]$ with $a < s(t) < b$ and differentiating the integrals split at $s(t)$. Then show that writing Burgers' equation as $(u^2)_t + (\\frac23u^3)_x = 0$, which is equivalent for smooth solutions, gives a different shock speed. What does this say about which conserved quantity matters?`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'red-light',
              title: 'A red light turns green',
              prompt: `In the traffic model with $v_{\\max} = 1$ and $\\rho_{\\max} = 1$, cars are stopped at a red light at $x = 0$ with $\\rho = 1$ for $x < 0$ and the road ahead empty. At $t = 0$ the light turns green. Show that the solution is a rarefaction, find it, and find how long a car starting at $x = -1$ waits before it moves.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do characteristics of the Burgers equation cross?',
              answerOutline: 'Their speed equals the value of $u$, so faster characteristics behind slower ones catch up where $f$ decreases.',
            },
            {
              question: 'What determines the speed of a shock?',
              answerOutline: 'Conservation in integral form: $s\' = [F]/[u]$, the Rankine-Hugoniot condition.',
            },
            {
              question: 'When do you use a rarefaction rather than a shock?',
              answerOutline: 'When characteristics spread apart, $F\'(u_L) < F\'(u_R)$. A shock there would not be admissible.',
            },
          ],
        },
        {
          slug: 'classification-of-second-order-equations',
          title: 'Classification of second-order equations',
          summary:
            'The sign of a discriminant splits second-order equations into hyperbolic, parabolic and elliptic types, each with its own canonical form and behaviour.',
          estimatedMinutes: 100,
          objectives: [
            'Classify a second-order linear equation from its principal part',
            'Factor a constant-coefficient hyperbolic operator and find its general solution',
            'Reduce an equation to canonical form by a linear change of variables',
            'Explain why the three types need different kinds of data',
          ],
          concepts: [
            'Principal part',
            'Discriminant $b^2 - ac$',
            'Hyperbolic, parabolic, elliptic',
            'Characteristic directions',
            'Canonical form',
            'Mixed type',
          ],
          explanation: `Write the principal part of a second-order linear equation in two variables as

$$au_{xx} + 2bu_{xy} + cu_{yy},$$

with the factor 2 on the middle term, and let $a, b, c$ depend on $(x, y)$. Lower-order terms do not affect the type. At each point, the equation is

- **hyperbolic** if $b^2 - ac > 0$, like the wave equation $u_{tt} - u_{xx} = 0$;
- **parabolic** if $b^2 - ac = 0$, like the heat equation $u_t - u_{xx} = 0$;
- **elliptic** if $b^2 - ac < 0$, like Laplace's equation $u_{xx} + u_{yy} = 0$.

The type is unchanged by any smooth invertible change of variables, and it is the type that decides what data make a problem well posed. Hyperbolic equations propagate data along characteristics at finite speed and suit initial value problems. Parabolic equations smooth and need initial data plus boundary data. Elliptic equations describe equilibria and suit boundary value problems; as the exercise on ill-posedness showed in the first lesson, an initial value problem for Laplace's equation is not well posed.

A linear change of variables removes the mixed term and brings a constant-coefficient equation to a **canonical form**: $u_{\\xi\\eta}$ or $u_{\\xi\\xi} - u_{\\eta\\eta}$ for hyperbolic, $u_{\\xi\\xi}$ for parabolic, $u_{\\xi\\xi} + u_{\\eta\\eta}$ for elliptic, plus lower-order terms. Hyperbolic operators have two real **characteristic directions** along which the operator factors.

**Worked example.** Find the general solution of $u_{xx} + 4u_{xy} + 3u_{yy} = 0$.

Here $a = 1$, $2b = 4$ so $b = 2$, and $c = 3$. Then $b^2 - ac = 4 - 3 = 1 > 0$: hyperbolic. Treat $\\partial_x$ and $\\partial_y$ like numbers and factor:

$$\\partial_x^2 + 4\\partial_x\\partial_y + 3\\partial_y^2 = (\\partial_x + \\partial_y)(\\partial_x + 3\\partial_y).$$

The first-order operator $\\partial_x + 3\\partial_y$ annihilates any function of $3x - y$, since $3F' - 3F' = 0$. The operator $\\partial_x + \\partial_y$ annihilates any function of $x - y$. The two factors commute. So

$$u = F(3x - y) + G(x - y)$$

for arbitrary $C^2$ functions $F, G$. That this is every solution follows from changing variables to $\\xi = 3x - y$, $\\eta = x - y$, in which the equation becomes a multiple of $u_{\\xi\\eta} = 0$, whose solutions are exactly $F(\\xi) + G(\\eta)$. You can confirm the change of variables with the chain rule: $u_x = 3u_\\xi + u_\\eta$ and $u_y = -u_\\xi - u_\\eta$, and substituting gives $-4u_{\\xi\\eta}$.

The lines $3x - y = C$ and $x - y = C$ are the characteristics. Disturbances travel along them.

Variable coefficients can change type. The Tricomi equation $yu_{xx} + u_{yy} = 0$ has $b^2 - ac = -y$, so it is elliptic for $y > 0$ and hyperbolic for $y < 0$. Equations of this kind model transonic flow, with the type change at the speed of sound.`,
          resources: [
            ivrii('The section on the classification of second-order equations.'),
            mit18152('The lecture notes on classification, if you want a second account.'),
          ],
          exercises: [
            {
              slug: 'classify-equations',
              title: 'Classify equations',
              prompt: `Classify each equation, at each point if the type varies. (a) $u_{xx} - 4u_{xy} + 4u_{yy} + u_x = 0$. (b) $u_{xx} + u_{xy} + u_{yy} = 0$. (c) $yu_{xx} + u_{yy} = 0$. (d) $u_{xx} + xu_{yy} = 0$. (e) $u_{xy} = u$. (f) $(1 + x^2)u_{xx} + (1 + y^2)u_{yy} = 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'general-solution-hyperbolic',
              title: 'General solutions by factoring',
              prompt: `Find the general solution of $u_{xx} - 3u_{xy} - 4u_{yy} = 0$. Then solve it with $u(x, 0) = x^2$ and $u_y(x, 0) = 0$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'With the factor 2 convention, $2b = -3$. Factor the quadratic $r^2 - 3r - 4$.',
            },
            {
              slug: 'parabolic-canonical',
              title: 'A parabolic canonical form',
              prompt: `Show that $u_{xx} + 2u_{xy} + u_{yy} = 0$ is parabolic, and find variables $\\xi, \\eta$ in which it becomes $u_{\\eta\\eta} = 0$. Find the general solution, and check it by substitution.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'type-invariance',
              title: 'Type is invariant',
              prompt: `Under a linear change of variables $\\xi = \\alpha x + \\beta y$, $\\eta = \\gamma x + \\delta y$ with $\\alpha\\delta - \\beta\\gamma \\neq 0$, show that the coefficient matrix $\\begin{pmatrix} a & b \\\\ b & c \\end{pmatrix}$ of the principal part transforms as $M \\mapsto JMJ^T$ with $J$ the Jacobian. Deduce that the sign of $b^2 - ac = -\\det M$ is unchanged.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the convention write $2b$ on the mixed term?',
              answerOutline: 'So that the principal part is the quadratic form of the symmetric matrix with entries $a, b, b, c$, and the discriminant is $b^2 - ac = -\\det$.',
            },
            {
              question: 'Which type suits an initial value problem, and which a boundary value problem?',
              answerOutline: 'Hyperbolic (and parabolic forward in time) suit initial value problems. Elliptic equations suit boundary value problems.',
            },
            {
              question: 'What are characteristics for a hyperbolic equation?',
              answerOutline: 'Curves along which the operator factors and along which disturbances propagate.',
            },
          ],
        },
      ],
    },
    {
      slug: 'wave-equation',
      title: 'The Wave Equation',
      description:
        'Solve the wave equation on the line with d\'Alembert\'s formula, prove conservation of energy and finite propagation speed, handle boundaries by reflection, and add sources with Duhamel\'s principle.',
      lessons: [
        {
          slug: 'dalembert-formula',
          title: "D'Alembert's formula",
          summary:
            'Factor the wave operator into two transport operators and solve the initial value problem on the whole line in closed form.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the general solution $F(x + ct) + G(x - ct)$',
            'Derive d\'Alembert\'s formula and verify it',
            'Sketch solutions from initial position and velocity',
            'Explain how singularities propagate along characteristics',
          ],
          concepts: [
            'Wave operator factorisation',
            'Left- and right-moving waves',
            'D\'Alembert\'s formula',
            'Characteristic lines $x \\pm ct$',
            'Propagation of singularities',
          ],
          explanation: `The wave operator factors as

$$\\partial_t^2 - c^2\\partial_x^2 = (\\partial_t - c\\partial_x)(\\partial_t + c\\partial_x).$$

If $v = u_t + cu_x$, then $v_t - cv_x = 0$, so $v$ is a function of $x + ct$, and solving the transport equation for $u$ gives the general solution

$$u(x, t) = F(x + ct) + G(x - ct),$$

a wave moving left plus a wave moving right, each keeping its shape. Equivalently, in the characteristic variables $\\xi = x + ct$, $\\eta = x - ct$, the equation becomes $u_{\\xi\\eta} = 0$.

Now impose $u(x, 0) = \\phi(x)$ and $u_t(x, 0) = \\psi(x)$. Then $F + G = \\phi$ and $c(F' - G') = \\psi$. Integrating the second, $F - G = \\frac1c\\int_0^x\\psi + K$. Solving the pair for $F$ and $G$ and substituting gives **d'Alembert's formula**:

$$u(x, t) = \\frac12\\left[\\phi(x + ct) + \\phi(x - ct)\\right] + \\frac{1}{2c}\\int_{x - ct}^{x + ct}\\psi(s)\\,ds.$$

**Theorem.** If $\\phi \\in C^2(\\mathbb{R})$ and $\\psi \\in C^1(\\mathbb{R})$, this is a $C^2$ solution of the initial value problem, and it is the only one.

Uniqueness follows because every $C^2$ solution has the form $F + G$, and the data determine $F$ and $G$ up to a constant that cancels. The formula shows continuous dependence too: if the data change by at most $\\epsilon$ in sup norm, the solution changes by at most $\\epsilon(1 + t)$ over time $t$.

**Worked example.** Solve with $\\phi(x) = e^{-x^2}$ and $\\psi(x) = \\cos x$.

The first part is two half-height Gaussians moving apart:

$$\\frac12\\left[e^{-(x + ct)^2} + e^{-(x - ct)^2}\\right].$$

The second part is

$$\\frac{1}{2c}\\int_{x - ct}^{x + ct}\\cos s\\,ds = \\frac{1}{2c}\\left[\\sin(x + ct) - \\sin(x - ct)\\right] = \\frac{1}{c}\\cos x\\sin ct,$$

using $\\sin A - \\sin B = 2\\cos\\frac{A + B}{2}\\sin\\frac{A - B}{2}$. So

$$u = \\frac12\\left[e^{-(x + ct)^2} + e^{-(x - ct)^2}\\right] + \\frac{1}{c}\\cos x\\,\\sin ct.$$

Check the second part: $\\partial_t^2$ gives $-c\\cos x\\sin ct$, and $c^2\\partial_x^2$ gives $-c\\cos x\\sin ct$, so it solves the equation. At $t = 0$ it vanishes and its time derivative is $\\cos x$.

The formula also explains how roughness travels. If $\\phi$ has a corner at $x_0$, the solution has corners on the lines $x \\pm ct = x_0$ and nowhere else. The wave equation neither creates nor removes singularities; it moves them along the characteristics. A plucked string keeps its corners forever.`,
          resources: [
            ivrii('The chapter on the one-dimensional wave equation.'),
            mit18152('The lecture notes on the wave equation in one dimension.'),
            diffyqs('The section on d\'Alembert\'s solution, as a gentler second account.'),
          ],
          exercises: [
            {
              slug: 'dalembert-drill',
              title: 'Apply the formula',
              prompt: `Solve $u_{tt} = c^2u_{xx}$ on the line for (a) $\\phi = 0$, $\\psi = \\frac{1}{1 + x^2}$; (b) $\\phi = \\sin x$, $\\psi = x$. In (a) find $\\lim_{t \\to \\infty}u(x, t)$ for each fixed $x$, and explain it physically.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'box-data',
              title: 'A box of initial displacement',
              prompt: `Let $c = 1$, $\\psi = 0$ and $\\phi = 1$ for $|x| < 1$, $\\phi = 0$ otherwise. Sketch $u$ at $t = 0, \\frac12, 1, 2$. Then take instead $\\phi = 0$ and $\\psi = 1$ for $|x| < 1$, 0 otherwise, and sketch the same times. Which of the two solutions keeps its jumps, and why?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'derive-dalembert',
              title: 'Derive and prove',
              prompt: `Derive d'Alembert's formula from $F + G = \\phi$ and $c(F' - G') = \\psi$. Prove that for $\\phi \\in C^2$ and $\\psi \\in C^1$ the result is $C^2$ and solves the problem. Prove the continuous dependence estimate $\\sup|u_1 - u_2| \\leq \\sup|\\phi_1 - \\phi_2| + t\\sup|\\psi_1 - \\psi_2|$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'parallelogram-rule',
              title: 'The parallelogram rule',
              prompt: `Show that every $C^2$ solution satisfies $u(A) + u(C) = u(B) + u(D)$ for any parallelogram $ABCD$ whose sides are characteristic lines, with $A$ and $C$ opposite. Use it to express $u(x, t)$, for $0 < t < x$, in terms of the values of $u$ on the line $t = 0$ and on the characteristic $t = x$, for a solution of $u_{tt} = u_{xx}$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Write $u = F(x + t) + G(x - t)$ and evaluate at the four corners.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the general solution of $u_{tt} = c^2u_{xx}$?',
              answerOutline: '$F(x + ct) + G(x - ct)$, waves moving left and right at speed $c$.',
            },
            {
              question: 'What regularity of data does the theorem need?',
              answerOutline: '$\\phi \\in C^2$ and $\\psi \\in C^1$, which make $u$ a $C^2$ solution.',
            },
            {
              question: 'Where does a corner in $\\phi$ appear in the solution?',
              answerOutline: 'Along the two characteristic lines through it, $x \\pm ct = x_0$.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/separation-of-variables'],
        },
        {
          slug: 'energy-and-causality',
          title: 'Energy, uniqueness and causality',
          summary:
            'The energy of a wave is conserved, which proves uniqueness, and a local version of the same argument proves that waves travel at a finite speed.',
          estimatedMinutes: 110,
          objectives: [
            'Prove conservation of energy for the wave equation',
            'Use energy to prove uniqueness on bounded and unbounded domains',
            'State and prove finite propagation speed',
            'Describe the domain of dependence and region of influence',
          ],
          concepts: [
            'Kinetic and potential energy',
            'Energy method',
            'Domain of dependence',
            'Region of influence',
            'Finite propagation speed',
            'Huygens\' principle (failure in one dimension)',
          ],
          explanation: `For a solution of $\\rho u_{tt} = \\tau u_{xx}$ on the line whose derivatives vanish for large $|x|$, define the **energy**

$$E(t) = \\frac12\\int_{-\\infty}^\\infty\\left(\\rho u_t^2 + \\tau u_x^2\\right)dx,$$

kinetic plus potential. Differentiate under the integral and use the equation:

$$E'(t) = \\int(\\rho u_tu_{tt} + \\tau u_xu_{xt})\\,dx = \\int(\\tau u_tu_{xx} + \\tau u_xu_{xt})\\,dx = \\tau\\int(u_tu_x)_x\\,dx = 0.$$

So **energy is conserved**. On an interval with fixed or free ends the boundary term $\\tau u_tu_x$ also vanishes.

**Uniqueness.** If $u_1, u_2$ solve the same problem, $w = u_1 - u_2$ has zero data, so $E_w(0) = 0$, so $E_w(t) = 0$ for all $t$. Then $w_t = w_x = 0$, so $w$ is constant, and the initial value gives $w = 0$.

**Causality.** D'Alembert's formula shows that $u(x_0, t_0)$ depends only on data in $[x_0 - ct_0, x_0 + ct_0]$, the **domain of dependence**. Conversely, data at a point $x_1$ affect only the wedge $|x - x_1| \\leq ct$, the **region of influence**. The energy method gives this without the formula, which matters because it extends to variable coefficients and higher dimensions.

**Theorem (finite speed).** Let $c = \\sqrt{\\tau/\\rho}$, and define the local energy $e(t) = \\frac12\\int_{x_0 - c(t_0 - t)}^{x_0 + c(t_0 - t)}(\\rho u_t^2 + \\tau u_x^2)\\,dx$ for $0 \\leq t \\leq t_0$. Then $e$ is non-increasing. In particular, if the data vanish on $[x_0 - ct_0, x_0 + ct_0]$, then $u(x_0, t_0) = 0$.

*Proof sketch.* Differentiating, the interior gives the boundary term $\\tau u_tu_x$ at the two ends, and the shrinking limits give $-\\frac c2(\\rho u_t^2 + \\tau u_x^2)$ at each end. By the inequality $2|ab| \\leq a^2 + b^2$ and $c\\rho = \\sqrt{\\rho\\tau}$, the total is $\\leq 0$.

**Worked example.** Let $c = 1$, $\\phi = 0$ and $\\psi = 1$ on $[-1, 1]$, 0 elsewhere. By d'Alembert, $u(x, t)$ is half the length of $[x - t, x + t] \\cap [-1, 1]$. At $x = 0$, this gives $u(0, t) = t$ for $t \\leq 1$, and $u(0, t) = 1$ for $t \\geq 1$. At $x = 3$, nothing happens until $t = 2$, when the region of influence $|x| \\leq 1 + t$ reaches it. Then $u(3, t) = \\frac12(t - 2)$ for $2 \\leq t \\leq 4$ and $u = 1$ after.

So the string is left permanently displaced after the disturbance passes: an initial velocity leaves a wake. Waves in one dimension do not obey **Huygens' principle**, which says that a sharp signal stays sharp. In three dimensions they do, as Kirchhoff's formula shows. The energy is $E = \\frac12\\int\\psi^2 = 1$ at $t = 0$, and stays 1 for all time, even though $u$ becomes flat, because the energy travels outward in the two moving fronts where $u_t$ and $u_x$ are non-zero.`,
          resources: [
            ivrii('The sections on energy and on domains of dependence for the wave equation.'),
            mit18152('The lecture notes on energy methods for the wave equation.'),
          ],
          exercises: [
            {
              slug: 'energy-with-damping',
              title: 'Energy with damping',
              prompt: `For $u_{tt} + ru_t = c^2u_{xx}$ on $0 < x < L$ with $u = 0$ at both ends and $r > 0$, define $E$ with $\\rho = 1$, $\\tau = c^2$. Prove $E'(t) = -r\\int u_t^2\\,dx \\leq 0$, and deduce uniqueness for this problem.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'finite-speed-proof',
              title: 'Prove finite propagation speed',
              prompt: `Write out the full proof that the local energy $e(t)$ is non-increasing, including the differentiation of an integral with moving limits. Then deduce that if $\\phi$ and $\\psi$ vanish on $[x_0 - ct_0, x_0 + ct_0]$, $u(x_0, t_0) = 0$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'energy-of-box',
              title: 'Where does the energy go?',
              prompt: `For the worked example, compute $u_t$ and $u_x$ at $t = 3$ explicitly, and verify that $E(3) = 1$ by integrating. Show that the energy is split equally between the two moving fronts, and between kinetic and potential.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'equipartition',
              title: 'Equipartition of energy',
              prompt: `For a solution on the line with $\\phi, \\psi$ smooth and zero outside a bounded interval, show that for large $t$ the kinetic and potential energies are equal. Express each in terms of $F'$ and $G'$, and use the fact that the supports of $F'(x + ct)$ and $G'(x - ct)$ separate.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does energy conservation prove uniqueness?',
              answerOutline: 'The difference of two solutions has zero energy at $t = 0$, hence always, so it is constant, hence zero.',
            },
            {
              question: 'What is the domain of dependence of $(x_0, t_0)$?',
              answerOutline: 'The interval $[x_0 - ct_0, x_0 + ct_0]$ of initial data that can influence $u(x_0, t_0)$.',
            },
            {
              question: 'Why does a string with initial velocity stay displaced after the pulse passes?',
              answerOutline: 'The velocity term in d\'Alembert integrates $\\psi$ over the whole domain of dependence, which eventually contains all of the support.',
            },
          ],
        },
        {
          slug: 'reflections-and-boundaries',
          title: 'Reflections and boundaries',
          summary:
            'Solve on a half-line or a finite string by extending the data oddly or evenly, and watch waves reflect.',
          estimatedMinutes: 100,
          objectives: [
            'Solve the Dirichlet and Neumann problems on a half-line by reflection',
            'Write the formula explicitly in the region where the boundary matters',
            'Explain inverted and upright reflections',
            'Solve the finite string by periodic extension and connect it with Fourier series',
          ],
          concepts: [
            'Odd extension',
            'Even extension',
            'Method of images',
            'Reflected wave',
            'Compatibility at the corner',
            'Periodic extension',
          ],
          explanation: `On the half-line $x > 0$, solve $u_{tt} = c^2u_{xx}$ with data $\\phi, \\psi$ and the Dirichlet condition $u(0, t) = 0$.

Extend the data to the whole line as **odd** functions: $\\phi_{\\text{odd}}(-x) = -\\phi(x)$, and similarly for $\\psi$. Solve on the line by d'Alembert. The solution with odd data is odd in $x$, by uniqueness, since $-u(-x, t)$ solves the same problem. An odd continuous function vanishes at 0, so the boundary condition holds automatically. Restricting to $x > 0$ gives the solution, and uniqueness on the half-line follows from the energy method.

For $x > ct$ the boundary has not yet been felt, and the solution is the ordinary d'Alembert formula. For $0 < x < ct$, using oddness on the pieces that lie at negative arguments,

$$u(x, t) = \\frac12\\left[\\phi(ct + x) - \\phi(ct - x)\\right] + \\frac{1}{2c}\\int_{ct - x}^{ct + x}\\psi(s)\\,ds.$$

For the solution to be $C^2$ up to the corner, the data must be **compatible** with the boundary condition: $\\phi(0) = \\psi(0) = \\phi''(0) = 0$.

For a free end, $u_x(0, t) = 0$, use the **even** extension instead. The image wave then has the same sign.

**Worked example.** Let $c = 1$, $\\psi = 0$, and let $\\phi$ be a bump centred at $x = 3$: say $\\phi(x) = \\max(0, 1 - |x - 3|)$. What happens at a fixed end?

On the line, the odd extension has an upright bump at 3 and an inverted bump at $-3$. Each splits into two half-height bumps moving apart. The left-moving half of the real bump, centred at $3 - t$, meets the right-moving half of the image, centred at $-3 + t$, at the origin at $t = 3$. At that moment they cancel exactly at $x = 0$, as the condition demands. Afterwards, the image half, centred at $t - 3$, has entered $x > 0$: it is an **inverted** half-height bump moving right. So the reflected pulse is upside down.

Explicitly, at $t = 5$ and $x = 2$, which is in the region $x < ct$, the formula gives $u = \\frac12[\\phi(7) - \\phi(3)] = \\frac12[0 - 1] = -\\frac12$, the trough of the reflected bump. For a free end, the even extension gives $+\\frac12$ instead.

On a finite string $0 < x < L$ with both ends fixed, extend oddly about both ends. The result is odd and $2L$-periodic, which is exactly the extension behind a Fourier sine series. D'Alembert with this extension and the separated sine series solution are the same function, written in two ways. The waves reflect forever, inverting at each end, and the motion repeats with period $2L/c$.`,
          resources: [
            ivrii('The sections on the half-line and on reflections.'),
            diffyqs('The section on d\'Alembert\'s solution treats the finite string through odd periodic extension.'),
          ],
          exercises: [
            {
              slug: 'half-line-formula',
              title: 'Derive the half-line formula',
              prompt: `Derive the formula for $0 < x < ct$ from d'Alembert with odd extensions. Then derive the analogous formula for the Neumann problem $u_x(0, t) = 0$. Check both on $\\phi = 0$, $\\psi = \\sin x$ for the Dirichlet case, where the answer should be $\\frac1c\\sin x\\sin ct$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'reflection-numbers',
              title: 'A reflection by numbers',
              prompt: `With $c = 2$, $\\phi = 0$ and $\\psi(x) = 1$ for $1 < x < 2$, 0 otherwise, on $x > 0$ with $u(0, t) = 0$, compute $u(1, t)$ for $0 \\leq t \\leq 3$ as a piecewise linear function. Find the final value as $t \\to \\infty$ at any fixed $x$, and compare with the same problem with a free end.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'finite-string-equivalence',
              title: 'Two forms of the finite string',
              prompt: `For the string $0 < x < \\pi$, $c = 1$, fixed ends, $\\psi = 0$ and $\\phi = x(\\pi - x)$, evaluate $u(1, 2.5)$ two ways: by the sine series with 200 terms, and by d'Alembert with the odd $2\\pi$-periodic extension. They should agree to about six digits. Then confirm that the motion has period $2\\pi$.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'moving-boundary-condition',
              title: 'A driven end',
              prompt: `Solve $u_{tt} = u_{xx}$ for $x > 0$ with zero initial data and $u(0, t) = h(t)$, where $h(0) = h'(0) = h''(0) = 0$. Show that $u(x, t) = h(t - x)$ for $x < t$ and $0$ for $x > t$. Check that it satisfies everything, and say what the compatibility conditions are for.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the odd extension enforce $u(0, t) = 0$?',
              answerOutline: 'Odd data give an odd solution by uniqueness, and an odd continuous function vanishes at 0.',
            },
            {
              question: 'How does a reflected pulse differ for a fixed end and a free end?',
              answerOutline: 'It is inverted at a fixed (Dirichlet) end and upright at a free (Neumann) end.',
            },
            {
              question: 'How is d\'Alembert related to the Fourier sine series on a finite string?',
              answerOutline: 'Both represent the same solution. The odd periodic extension is the one whose Fourier series is the sine series.',
            },
          ],
        },
        {
          slug: 'sources-and-duhamel',
          title: "Sources and Duhamel's principle",
          summary:
            'A forced wave equation is solved by adding up free waves started by the forcing at each earlier moment, an integral over the characteristic triangle.',
          estimatedMinutes: 100,
          objectives: [
            'State Duhamel\'s principle for the wave equation',
            'Derive the solution as an integral over the backward characteristic triangle',
            'Compute solutions with simple sources and verify them',
            'Recognise resonance for a bounded string with periodic forcing',
          ],
          concepts: [
            'Inhomogeneous wave equation',
            'Duhamel\'s principle',
            'Characteristic triangle',
            'Green\'s theorem proof',
            'Resonant forcing',
          ],
          explanation: `Consider $u_{tt} - c^2u_{xx} = f(x, t)$ on the line with zero initial data. **Duhamel's principle**: for each $s \\geq 0$, let $w(x, t; s)$ be the free solution, for $t > s$, started at time $s$ with zero displacement and velocity $f(x, s)$. Then

$$u(x, t) = \\int_0^tw(x, t; s)\\,ds.$$

The forcing during $[s, s + ds]$ gives the string an extra velocity $f\\,ds$, and each such kick then evolves freely. By d'Alembert, $w(x, t; s) = \\frac{1}{2c}\\int_{x - c(t - s)}^{x + c(t - s)}f(y, s)\\,dy$, so

$$u(x, t) = \\frac{1}{2c}\\int_0^t\\int_{x - c(t - s)}^{x + c(t - s)}f(y, s)\\,dy\\,ds = \\frac{1}{2c}\\iint_{\\Delta}f\\,dA,$$

where $\\Delta$ is the **characteristic triangle** with apex $(x, t)$ and base $[x - ct, x + ct]$ on the line $t = 0$. The value at $(x, t)$ depends only on the forcing inside its backward triangle, which is causality again. Adding d'Alembert's formula handles non-zero initial data.

To verify the formula, differentiate under the integral twice. Each differentiation with respect to $t$ produces a term from the upper limit $s = t$, where the inner interval shrinks to a point. Alternatively, integrate the equation over $\\Delta$ and use Green's theorem: the line integrals along the two characteristic sides reduce to differences of $u$ at the corners.

**Worked example.** Solve $u_{tt} - c^2u_{xx} = \\sin x$ with $u = u_t = 0$ at $t = 0$.

The inner integral is

$$\\int_{x - c(t - s)}^{x + c(t - s)}\\sin y\\,dy = \\cos(x - c(t - s)) - \\cos(x + c(t - s)) = 2\\sin x\\sin(c(t - s)).$$

Then

$$u = \\frac{1}{2c}\\int_0^t2\\sin x\\sin(c(t - s))\\,ds = \\frac{\\sin x}{c}\\cdot\\frac{1 - \\cos ct}{c} = \\frac{\\sin x}{c^2}(1 - \\cos ct).$$

Check: $u_{tt} = \\sin x\\cos ct$, and $-c^2u_{xx} = \\sin x(1 - \\cos ct)$. They add to $\\sin x$. Both $u$ and $u_t = \\frac{\\sin x}{c}\\sin ct$ vanish at $t = 0$.

The string oscillates about the static deflection $\\sin x/c^2$, which is the solution of $-c^2u_{xx} = \\sin x$. With $f = 1$ the triangle has area $ct^2$, so $u = t^2/2$, a uniform acceleration.

On a bounded string with fixed ends, expand $f$ in the sine eigenfunctions. Each mode becomes a forced oscillator $\\ddot a_n + \\omega_n^2a_n = f_n(t)$. Forcing at a natural frequency $\\omega_n = n\\pi c/L$, with $f_n \\neq 0$, gives a mode amplitude growing linearly in $t$: resonance, which on the infinite line has no analogue, since the line has a continuum of frequencies and energy radiates away.`,
          resources: [
            ivrii('The section on the inhomogeneous wave equation and Duhamel\'s principle.'),
            mit18152('The lecture notes on the inhomogeneous wave equation.'),
          ],
          exercises: [
            {
              slug: 'duhamel-drill',
              title: 'Duhamel drill',
              prompt: `With zero initial data, solve $u_{tt} - c^2u_{xx} = f$ for (a) $f = 1$; (b) $f = xt$; (c) $f = e^{-t}$; (d) $f = \\cos x$. Check each by substitution.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'verify-duhamel',
              title: 'Verify the formula',
              prompt: `Prove that for $f$ continuous with continuous $f_x$, $u = \\frac{1}{2c}\\iint_\\Delta f$ is $C^2$ and solves the inhomogeneous equation with zero data. Do it twice: by differentiating under the integral, and by integrating the equation over the triangle with Green's theorem.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'resonant-string',
              title: 'Resonance on a string',
              prompt: `On $0 < x < \\pi$ with fixed ends and $c = 1$, solve $u_{tt} - u_{xx} = \\sin(2x)\\cos(\\omega t)$ from rest. Treat $\\omega \\neq 2$ and $\\omega = 2$, and show that in the second case $u = \\frac{t}{4}\\sin 2t\\sin 2x$. Why does $\\sin(2x)\\cos(3t)$ not cause resonance?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'point-source',
              title: 'A localised source',
              prompt: `Let $f = 1$ for $|x| < 1$ and $0 < t < 1$, and $f = 0$ otherwise, with $c = 1$. Use the triangle formula to compute $u(0, t)$ for all $t \\geq 0$, and $u(5, t)$. Explain the final value of $u(0, t)$ as $t \\to \\infty$.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State Duhamel\'s principle for the wave equation in words.',
              answerOutline: 'Treat forcing during each short time as an impulse that sets an initial velocity, and add the resulting free waves.',
            },
            {
              question: 'Which forcing values affect $u(x, t)$?',
              answerOutline: 'Only those in the backward characteristic triangle with apex $(x, t)$.',
            },
            {
              question: 'Why can a bounded string resonate?',
              answerOutline: 'It has discrete natural frequencies. Forcing at one of them drives that mode with linearly growing amplitude.',
            },
          ],
        },
      ],
      project: {
        slug: 'wave-solver-against-dalembert',
        title: 'A wave solver checked against exact solutions',
        description: `Write a finite-difference solver for $u_{tt} = c^2u_{xx}$ on an interval with fixed, free or driven ends, using the standard leapfrog scheme, and check it against d'Alembert's formula with reflections. The aim is a solver you can trust, so every claim needs a test.`,
        deliverables: [
          'A leapfrog solver with a correct first time step for initial velocity, and Dirichlet, Neumann and driven boundary options',
          'Tests against exact d\'Alembert solutions with reflection, for a smooth pulse and for a pulse with a corner',
          'A convergence table showing second-order accuracy for smooth data, and the reduced order for data with corners',
          'A demonstration of instability when $c\\Delta t/\\Delta x > 1$, with an explanation in terms of the domain of dependence',
          'An energy plot over time for the fixed-end case, with a discussion of how well the discrete energy is conserved',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'diffusion-equation',
      title: 'The Diffusion Equation',
      description:
        'The maximum principle, the heat kernel on the line, uniqueness and the ill-posedness of running heat backward, and sources and boundaries by Duhamel\'s principle and reflection.',
      lessons: [
        {
          slug: 'maximum-principle',
          title: 'The maximum principle',
          summary:
            'A solution of the heat equation takes its maximum on the bottom or sides of a space-time rectangle, never inside. This one fact gives uniqueness and stability.',
          estimatedMinutes: 110,
          objectives: [
            'State the weak maximum principle with the parabolic boundary',
            'Prove it with the perturbation $u + \\epsilon x^2$',
            'Deduce uniqueness, comparison and stability in the sup norm',
            'Show by example that extra terms in the equation can break it',
          ],
          concepts: [
            'Parabolic boundary',
            'Weak maximum principle',
            'Strong maximum principle',
            'Minimum principle',
            'Comparison principle',
            'Stability in sup norm',
          ],
          explanation: `Let $R = [0, l] \\times [0, T]$ in the $(x, t)$ plane. Its **parabolic boundary** $\\Gamma$ is the bottom $t = 0$ together with the two sides $x = 0$ and $x = l$. The top edge $t = T$ is excluded.

**Theorem (weak maximum principle).** Let $u$ be continuous on $R$, with $u_t$ and $u_{xx}$ continuous in $0 < x < l$, $0 < t \\leq T$, and suppose $u_t - ku_{xx} \\leq 0$ there, with $k > 0$. Then

$$\\max_Ru = \\max_\\Gamma u.$$

*Proof.* First suppose the strict inequality $u_t - ku_{xx} < 0$. If the maximum were at an interior point, we would have $u_t = 0$ and $u_{xx} \\leq 0$, so $u_t - ku_{xx} \\geq 0$, a contradiction. If it were on the top edge with $0 < x < l$, then $u_t \\geq 0$, since $u$ cannot be larger just before time $T$, and again $u_{xx} \\leq 0$. Contradiction again. For the general case, put $v = u + \\epsilon x^2$ with $\\epsilon > 0$. Then $v_t - kv_{xx} = u_t - ku_{xx} - 2k\\epsilon < 0$, so $\\max_Rv = \\max_\\Gamma v$. Since $u \\leq v \\leq u + \\epsilon l^2$,

$$\\max_Ru \\leq \\max_Rv = \\max_\\Gamma v \\leq \\max_\\Gamma u + \\epsilon l^2,$$

and $\\epsilon \\to 0$ finishes it. $\\square$

Applied to $-u$, it gives the **minimum principle**. The **strong** version, stated without proof, says that if the maximum is attained at an interior point $(x_0, t_0)$, then $u$ is constant on $[0, l] \\times [0, t_0]$.

**Consequences.** If $u_1, u_2$ solve the heat equation with the same initial and boundary data, then $w = u_1 - u_2$ is 0 on $\\Gamma$, so $\\max w = \\min w = 0$: uniqueness. More generally,

$$\\max_R|u_1 - u_2| \\leq \\max_\\Gamma|u_1 - u_2|,$$

which is **stability**: a small change in the initial and boundary temperatures causes a change at most as large everywhere afterwards. If the data of $u_1$ are below those of $u_2$, then $u_1 \\leq u_2$ everywhere, the **comparison principle**.

**Worked example.** Check the theorem for $u = 1 - x^2 - 2kt$ on $[-1, 1] \\times [0, T]$.

It solves the heat equation, since $u_t = -2k$ and $ku_{xx} = -2k$. On the bottom, $u = 1 - x^2$, with maximum 1 at $x = 0$. On the sides $x = \\pm1$, $u = -2kt$, with maximum 0. So $\\max_\\Gamma u = 1$. In the interior and on the top, $u \\leq 1 - 2kt < 1$. So the maximum over $R$ is 1, attained only at $(0, 0)$, on $\\Gamma$.

The minimum is $-2kT$ at the top corners $(\\pm1, T)$. Those points are on the sides, so they belong to $\\Gamma$, consistent with the minimum principle.

The principle depends on the form of the equation. For $u_t = ku_{xx} + cu$ with $c > 0$, a reaction term, it fails, as an exercise shows.`,
          resources: [
            ivrii('The section on the maximum principle for the heat equation.'),
            mit18152('The lecture on the weak maximum principle for the heat equation.'),
            wiki('Maximum_principle', 'Maximum principle', 'An overview of elliptic and parabolic versions, for orientation.'),
          ],
          exercises: [
            {
              slug: 'write-max-principle',
              title: 'Write the proof',
              prompt: `Write the proof of the weak maximum principle in full, including why $u_t \\geq 0$ at a maximum on the top edge. Then state and prove the minimum principle and the comparison principle, assuming the maximum principle.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'reaction-breaks-it',
              title: 'A reaction term breaks it',
              prompt: `Show that $u = e^t\\sin x$ solves $u_t = u_{xx} + 2u$ on $[0, \\pi]$, is 0 on both sides, and has maximum 1 on the bottom, yet exceeds 1 inside $R$ for $T > 0$. Where exactly does the proof break?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'stability-bound',
              title: 'A stability bound',
              prompt: `Two rods of length 1 with $k = 1$ have the same zero end temperatures and initial temperatures $\\phi_1 = \\sin\\pi x$ and $\\phi_2 = \\sin\\pi x + 0.01\\sin 5\\pi x$. Use the maximum principle to bound $|u_1 - u_2|$ for all $t$. Then find $\\max_x|u_1 - u_2|$ at $t = 0.01$ exactly, and compare.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'max-decreases',
              title: 'The maximum decreases',
              prompt: `For a solution with zero boundary values on $[0, l]$, use the maximum principle on $[0, l] \\times [t_1, t_2]$ to prove that $M(t) = \\max_x u(x, t)$ is non-increasing when $M \\geq 0$. Confirm numerically for the series solution with $\\phi = x(1 - x)(1 + 3x)$, and $k = 1$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the parabolic boundary, and why is the top excluded?',
              answerOutline: 'The bottom and the two sides. A maximum can occur on the top only if it already occurred on the parabolic boundary.',
            },
            {
              question: 'What is the role of $\\epsilon x^2$ in the proof?',
              answerOutline: 'It turns a non-strict inequality into a strict one, which rules out interior maxima, and it costs only $\\epsilon l^2$.',
            },
            {
              question: 'How does the maximum principle give uniqueness?',
              answerOutline: 'The difference of two solutions is 0 on the parabolic boundary, so its maximum and minimum are both 0.',
            },
          ],
        },
        {
          slug: 'heat-kernel',
          title: 'The heat kernel on the line',
          summary:
            'Find the fundamental solution by a scaling argument, and write every solution on the line as a Gaussian average of its initial data.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the heat kernel from scale invariance',
            'Write the solution of the initial value problem on the line as a convolution',
            'Compute solutions for Gaussian and step data',
            'Explain smoothing and infinite propagation speed',
          ],
          concepts: [
            'Scale invariance',
            'Similarity variable',
            'Error function',
            'Heat kernel $S(x, t)$',
            'Convolution',
            'Approximate identity',
            'Infinite speed of propagation',
          ],
          explanation: `If $u(x, t)$ solves $u_t = ku_{xx}$ on the line, so does $u(\\sqrt a\\,x, at)$ for every $a > 0$, and the step function $H(x)$ is unchanged by that scaling. So the solution $Q$ with $Q(x, 0) = H(x)$ should be unchanged too, which suggests $Q = g(p)$ with $p = x/\\sqrt{4kt}$. Substituting gives $g'' + 2pg' = 0$, so $g' = c_1e^{-p^2}$. Matching $Q \\to 1$ for $x > 0$ and $Q \\to 0$ for $x < 0$ as $t \\to 0^+$ gives

$$Q(x, t) = \\frac12 + \\frac12\\operatorname{erf}\\left(\\frac{x}{\\sqrt{4kt}}\\right), \\qquad \\operatorname{erf}(z) = \\frac{2}{\\sqrt\\pi}\\int_0^ze^{-s^2}\\,ds.$$

Its derivative is the **heat kernel**

$$S(x, t) = \\frac{\\partial Q}{\\partial x} = \\frac{1}{\\sqrt{4\\pi kt}}e^{-x^2/(4kt)}, \\qquad t > 0.$$

It solves the heat equation, has $\\int S\\,dx = 1$ for every $t$, and concentrates at $x = 0$ as $t \\to 0^+$. It is the temperature from a unit amount of heat released at the origin at time 0. By linearity and translation invariance:

**Theorem.** If $\\phi$ is bounded and continuous on $\\mathbb{R}$, then

$$u(x, t) = \\int_{-\\infty}^\\infty S(x - y, t)\\,\\phi(y)\\,dy$$

solves $u_t = ku_{xx}$ for $t > 0$, is infinitely differentiable there, and $u(x, t) \\to \\phi(x)$ as $t \\to 0^+$.

The limit holds because $S(\\cdot, t)$ is an **approximate identity**: positive, of integral 1, with mass concentrating at 0. Smoothness holds because all derivatives can be taken under the integral, where they fall on the Gaussian.

**Worked example.** Solve with $\\phi(x) = e^{-x^2}$.

We need $\\frac{1}{\\sqrt{4\\pi kt}}\\int e^{-(x - y)^2/(4kt) - y^2}\\,dy$. Complete the square in $y$. With $\\sigma = 4kt$, the exponent is

$$-\\frac{(x - y)^2}{\\sigma} - y^2 = -\\frac{1 + \\sigma}{\\sigma}\\left(y - \\frac{x}{1 + \\sigma}\\right)^2 - \\frac{x^2}{1 + \\sigma}.$$

The Gaussian integral gives $\\sqrt{\\pi\\sigma/(1 + \\sigma)}$, and so

$$u(x, t) = \\frac{1}{\\sqrt{1 + 4kt}}\\exp\\left(-\\frac{x^2}{1 + 4kt}\\right).$$

Check at $t = 0$: $u = e^{-x^2}$. The total $\\int u\\,dx = \\sqrt\\pi$ for all $t$, which is conservation of heat. The peak falls like $(4kt)^{-1/2}$ for large $t$, and the width grows like $\\sqrt{4kt}$. You can verify $u_t = ku_{xx}$ by direct differentiation.

**Infinite speed.** If $\\phi \\geq 0$ is non-zero only on $[-1, 1]$, then $u(x, t) > 0$ for every $x$ and every $t > 0$, since $S > 0$ everywhere. Heat is felt everywhere at once, although very faintly far away. This is a limitation of the model, not of nature: diffusion is a statistical description that breaks down at very short times.`,
          resources: [
            ivrii('The section on the heat equation on the line and the heat kernel.'),
            mit18152('The lectures on the fundamental solution and the global Cauchy problem.'),
            wiki('Heat_kernel', 'Heat kernel', 'The kernel in several settings, with the properties used in this lesson.'),
          ],
          exercises: [
            {
              slug: 'kernel-properties',
              title: 'Properties of the kernel',
              prompt: `Verify by differentiation that $S$ solves $S_t = kS_{xx}$. Show $\\int S\\,dx = 1$ and $\\int x^2S\\,dx = 2kt$. Interpret the second as the mean square displacement of a random walker, and compute $\\sqrt{2kt}$ for sugar in water with $k = 5 \\times 10^{-10}$ m$^2$/s after one hour.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'box-initial-data',
              title: 'Box initial data',
              prompt: `Solve with $\\phi = 1$ on $|x| < 1$ and $\\phi = 0$ elsewhere, in terms of erf. Find $u(0, t)$ and its behaviour as $t \\to \\infty$. Then show that $\\phi(x) = x^2$ gives $u = x^2 + 2kt$, and check by substitution.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'prove-initial-limit',
              title: 'Prove the initial limit',
              prompt: `For bounded continuous $\\phi$, prove that $\\int S(x - y, t)\\phi(y)\\,dy \\to \\phi(x)$ as $t \\to 0^+$. Split the integral into $|y - x| < \\delta$ and the rest, and use continuity of $\\phi$ at $x$ and the fact that $\\int_{|z| > \\delta}S(z, t)\\,dz \\to 0$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'kernel-numerics',
              title: 'Convolve numerically',
              prompt: `Implement the convolution formula with numerical quadrature for $\\phi(x) = \\operatorname{sign}(x)\\max(0, 1 - |x|)$. Compare at $t = 0.01, 0.1, 1$ with an explicit finite-difference solution on a large interval. Measure the time when the finite-difference solution first shows a value above $10^{-12}$ at $x = 5$, and compare with the exact positivity at all times.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $x/\\sqrt{t}$ the natural similarity variable?',
              answerOutline: 'The equation is invariant under $x \\to \\sqrt a\\,x$, $t \\to at$, and $x/\\sqrt t$ is unchanged by it.',
            },
            {
              question: 'What does $S(x, t)$ represent physically?',
              answerOutline: 'The temperature from a unit of heat released at the origin at time 0.',
            },
            {
              question: 'Why is $u$ smooth for $t > 0$ even if $\\phi$ is only continuous?',
              answerOutline: 'Derivatives fall on the smooth kernel under the integral.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
        },
        {
          slug: 'uniqueness-and-well-posedness',
          title: 'Uniqueness, energy and running time backward',
          summary:
            'An energy method gives a second proof of uniqueness. Running the heat equation backward is ill-posed, and on the whole line uniqueness needs a growth condition.',
          estimatedMinutes: 100,
          objectives: [
            'Prove uniqueness and $L^2$ stability by the energy method',
            'Show by example that the backward heat equation is ill-posed',
            'State the growth condition for uniqueness on the line',
            'Relate smoothing to the impossibility of running backward',
          ],
          concepts: [
            'Energy method',
            '$L^2$ stability',
            'Backward heat equation',
            'Hadamard\'s example',
            'Growth condition',
            'Smoothing effect',
          ],
          explanation: `**Energy method.** Let $u$ solve $u_t = ku_{xx}$ on $0 < x < l$ with $u = 0$ at both ends, or $u_x = 0$ at both ends. Then

$$\\frac{d}{dt}\\frac12\\int_0^lu^2\\,dx = \\int_0^luu_t\\,dx = k\\int_0^luu_{xx}\\,dx = k\\Big[uu_x\\Big]_0^l - k\\int_0^lu_x^2\\,dx = -k\\int_0^lu_x^2\\,dx \\leq 0.$$

So $\\int u^2$ never increases. Applied to the difference of two solutions with the same data, it starts at 0 and stays 0: uniqueness. Applied to the difference of two solutions with different initial data, it gives $\\|u_1(t) - u_2(t)\\| \\leq \\|\\phi_1 - \\phi_2\\|$ in the $L^2$ norm, stability in the mean-square sense. Robin conditions $u_x = -hu$ with $h \\geq 0$ add a term $-khu^2 \\leq 0$ at the boundary, so the argument still works.

**Backward in time.** Since $\\int u^2$ decreases forward, it increases backward, and the growth can be unlimited.

**Worked example.** On $0 < x < \\pi$ with $u = 0$ at both ends, suppose the temperature at time $T$ is known to be $u(x, T) = \\frac1n\\sin nx$, and we want the temperature at time 0. The solution of the heat equation through that state is

$$u(x, t) = \\frac1ne^{-kn^2(t - T)}\\sin nx, \\qquad\\text{so}\\qquad u(x, 0) = \\frac1ne^{kn^2T}\\sin nx.$$

The data at time $T$ have size $1/n$, which tends to 0. The answer at time 0 has size $e^{kn^2T}/n$, which tends to infinity. With $kT = 0.1$ and $n = 10$, data of size $0.1$ correspond to an initial state of size $e^{10}/10 \\approx 2203$. With $n = 20$, the factor is $e^{40}/20 \\approx 1.2 \\times 10^{16}$. A measurement error in the 20th mode as small as $10^{-16}$ would produce an initial-state error of order 1. Recovering the past from the present violates continuous dependence: the backward problem is **ill-posed**.

This is the price of smoothing. The forward evolution multiplies the $n$th mode by $e^{-kn^2t}$, which crushes high frequencies, so very different pasts lead to almost the same present. Inverting such a map amplifies noise without limit. Deblurring an image is the same problem, and it is solved in practice by regularisation, which means deliberately not trying to recover the highest frequencies.

**On the whole line**, uniqueness needs a growth condition. Tychonoff constructed a non-zero solution of $u_t = u_{xx}$ on $\\mathbb{R} \\times (0, \\infty)$ that is continuous up to $t = 0$ with $u(x, 0) = 0$, and it grows extremely fast as $|x| \\to \\infty$. Uniqueness does hold in the class of solutions with $|u(x, t)| \\leq Me^{ax^2}$ for some constants $M, a$. The heat kernel formula gives the solution in that class, and it is the physically meaningful one.`,
          resources: [
            ivrii('The sections on energy and uniqueness for the heat equation.'),
            mit18152('The lecture on uniqueness for the heat equation.'),
          ],
          exercises: [
            {
              slug: 'energy-uniqueness-robin',
              title: 'Energy with Robin conditions',
              prompt: `Prove uniqueness for $u_t = ku_{xx} + f$ on $0 < x < 1$ with $u(0, t) = g(t)$ and $u_x(1, t) + hu(1, t) = j(t)$, $h \\geq 0$, using the energy method. Explain what goes wrong in the argument if $h < 0$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'energy-decay-rate',
              title: 'An energy decay rate',
              prompt: `For zero Dirichlet conditions on $(0, l)$, use the inequality $\\int_0^lu_x^2 \\geq \\frac{\\pi^2}{l^2}\\int_0^lu^2$, which you should prove with a sine series, to show $\\int u^2 \\leq e^{-2k\\pi^2t/l^2}\\int\\phi^2$. Show that the rate is sharp.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'deblurring-experiment',
              title: 'A deblurring experiment',
              prompt: `On $(0, \\pi)$ with $k = 1$, take $\\phi(x) = x(\\pi - x)$, compute $u(x, 0.1)$ from 50 sine modes, add noise of standard deviation $10^{-6}$ at 200 grid points, and try to recover $\\phi$ by running each mode backward. Plot the result using the first $N$ modes for $N = 3, 6, 10, 20$. Which $N$ is best, and why?`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'smoothing-proof',
              title: 'Solutions are smooth',
              prompt: `For the series $u = \\sum b_ne^{-kn^2\\pi^2t/l^2}\\sin(n\\pi x/l)$ with bounded $b_n$, prove that for every $t_0 > 0$ the series of any $x$- or $t$-derivative converges uniformly on $t \\geq t_0$. Conclude that $u$ is infinitely differentiable for $t > 0$, whatever the regularity of $\\phi$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $\\int u^2$ decrease for the heat equation with zero Dirichlet data?',
              answerOutline: 'Its derivative is $-k\\int u_x^2$ after integrating by parts, and the boundary term vanishes.',
            },
            {
              question: 'Which of Hadamard\'s conditions fails for the backward heat equation?',
              answerOutline: 'Continuous dependence: small data at time $T$ can correspond to huge states at time 0.',
            },
            {
              question: 'Why is a growth condition needed for uniqueness on the line?',
              answerOutline: 'Tychonoff\'s example is a non-zero solution with zero initial data that grows very fast in $|x|$.',
            },
          ],
        },
        {
          slug: 'sources-and-the-half-line',
          title: 'Sources and the half-line',
          summary:
            'Add heat sources with Duhamel\'s principle, and handle a boundary at $x = 0$ by reflecting the heat kernel.',
          estimatedMinutes: 110,
          objectives: [
            'Write the solution with a source as a space-time integral against the kernel',
            'Solve Dirichlet and Neumann problems on the half-line by odd and even reflection',
            'Use the complementary error function for a sudden change of boundary temperature',
            'Estimate penetration depths in applications',
          ],
          concepts: [
            'Duhamel\'s principle for heat',
            'Method of images',
            'Odd and even reflection',
            'Complementary error function',
            'Penetration depth $\\sqrt{4kt}$',
          ],
          explanation: `**Sources.** For $u_t - ku_{xx} = f(x, t)$ on the line with $u(x, 0) = \\phi(x)$, **Duhamel's principle** gives

$$u(x, t) = \\int S(x - y, t)\\phi(y)\\,dy + \\int_0^t\\int S(x - y, t - s)f(y, s)\\,dy\\,ds.$$

Heat added during $[s, s + ds]$ then diffuses for the remaining time $t - s$. For example, $f(x, t) = \\sin x$ with $\\phi = 0$: the kernel acts on $\\sin x$ by the factor $e^{-k(t - s)}$, a fact you can check from the Fourier transform or by trying $a(t)\\sin x$ in the equation. So

$$u = \\int_0^te^{-k(t - s)}\\,ds\\,\\sin x = \\frac{1 - e^{-kt}}{k}\\sin x.$$

**Half-line.** On $x > 0$ with $u(0, t) = 0$, extend $\\phi$ to an odd function and solve on the line. The solution stays odd, so it vanishes at 0. Splitting the integral at 0 and using oddness,

$$u(x, t) = \\int_0^\\infty\\left[S(x - y, t) - S(x + y, t)\\right]\\phi(y)\\,dy.$$

The second term is an "image" heat source of opposite sign at $-y$. For a Neumann condition $u_x(0, t) = 0$, use an even extension, which gives a plus sign.

**Worked example.** The ground is at a uniform 10 °C. At $t = 0$ the surface temperature drops to $-5$ °C and stays there. How deep does the frost reach in 30 days, with diffusivity $k = 5 \\times 10^{-7}$ m$^2$/s?

Let $w = u + 5$, so that $w(0, t) = 0$ and $w(x, 0) = 15$. With $\\phi = 15$ in the image formula,

$$w = 15\\left[\\int_0^\\infty S(x - y, t)\\,dy - \\int_0^\\infty S(x + y, t)\\,dy\\right] = 15\\left[Q(x, t) - (1 - Q(x, t))\\right] = 15\\operatorname{erf}\\left(\\frac{x}{\\sqrt{4kt}}\\right).$$

So $u = -5 + 15\\operatorname{erf}(x/\\sqrt{4kt})$. The frost line is where $u = 0$, that is, where $\\operatorname{erf}(z) = 1/3$, at $z \\approx 0.3046$. After 30 days, $t = 2.592 \\times 10^6$ s and $\\sqrt{4kt} = \\sqrt{5.184} \\approx 2.277$ m. So the frost depth is about $0.3046 \\times 2.277 \\approx 0.69$ m.

The depth grows like $\\sqrt t$: four times as long gives twice the depth. The length $\\sqrt{4kt}$ is the **penetration depth**, and it is the first number to estimate in any diffusion problem. This model ignores latent heat, which slows real freezing considerably.

Equivalently $u = 10 - 15\\operatorname{erfc}(x/\\sqrt{4kt})$, with $\\operatorname{erfc} = 1 - \\operatorname{erf}$. This is the standard solution for a sudden change of boundary temperature.`,
          resources: [
            ivrii('The sections on the heat equation on the half-line and with sources.'),
            mit18152('The lecture notes on the global Cauchy problem and Duhamel\'s principle.'),
          ],
          exercises: [
            {
              slug: 'neumann-half-line',
              title: 'An insulated end',
              prompt: `Derive the solution formula on $x > 0$ with $u_x(0, t) = 0$, using an even extension. Solve with $\\phi = 1$ on $0 < x < 1$, 0 for $x > 1$, and find $u(0, t)$. Compare with the Dirichlet solution at $x = 0.5$, $t = 0.25$, $k = 1$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'duhamel-heat-drill',
              title: 'Sources',
              prompt: `With $\\phi = 0$, solve $u_t - ku_{xx} = f$ on the line for (a) $f = 1$; (b) $f = \\cos(2x)e^{-t}$, with $k \\neq 1/4$; (c) $f = \\sin x$, as in the lesson, checking by substitution. What happens in (b) when $k = 1/4$?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'frost-depth-check',
              title: 'Check the frost depth',
              prompt: `Solve the worked example numerically with an implicit finite-difference scheme on $[0, 10]$ m, with $u = 10$ at the far end, for 30 days, and find the frost depth by interpolation. Compare with $0.69$ m. Then find the time for the frost to reach 1 m from the formula.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'oscillating-surface',
              title: 'Seasonal temperature waves',
              prompt: `The surface temperature of the ground varies as $u(0, t) = A\\cos\\omega t$. Look for a solution of the form $u = Ae^{-\\alpha x}\\cos(\\omega t - \\alpha x)$ and find $\\alpha$. With $k = 5 \\times 10^{-7}$ m$^2$/s and a period of one year, find the depth at which the yearly variation is 5% of the surface amplitude, and the time lag there.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the image source $-S(x + y, t)$ do?',
              answerOutline: 'It cancels the heat at $x = 0$ exactly, enforcing $u(0, t) = 0$.',
            },
            {
              question: 'How does a penetration depth scale with time?',
              answerOutline: 'Like $\\sqrt{4kt}$: four times the time gives twice the depth.',
            },
            {
              question: 'How does Duhamel\'s principle treat a source?',
              answerOutline: 'Heat added at time $s$ is spread by the kernel for the remaining time $t - s$, and all such contributions add.',
            },
          ],
        },
      ],
      project: {
        slug: 'heat-kernel-lab',
        title: 'Heat kernel and maximum principle lab',
        description: `Build a small library that solves the heat equation on the line and the half-line by the kernel formulas, using quadrature, and checks them against finite-difference solutions. Use it to test the theorems of this module numerically: conservation of heat, the maximum principle, the $\\sqrt t$ scaling and the ill-posedness of the backward problem.`,
        deliverables: [
          'Kernel-formula solvers for the line and for Dirichlet and Neumann half-lines, with unit tests on the Gaussian and erf solutions',
          'An explicit and an implicit (Crank-Nicolson) finite-difference solver, with convergence tables against the exact solutions',
          'A plot of $\\max_xu(x, t)$ and of $\\int u\\,dx$ against $t$ for three kinds of initial data, illustrating the maximum principle and conservation',
          'A frost-depth or similar application with real material constants and a sentence on what the model leaves out',
          'A backward-in-time experiment showing noise amplification mode by mode',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'separation-and-fourier-series',
      title: 'Separation of Variables and Fourier Series',
      description:
        'Separation of variables on intervals with every standard boundary condition, the symmetry behind orthogonality, the convergence theorems that make the series meaningful, and problems with sources and moving boundary data.',
      lessons: [
        {
          slug: 'separation-of-variables',
          title: 'Separation of variables',
          summary:
            'Turn a PDE with homogeneous boundary conditions into an eigenvalue problem in space and ODEs in time, for Dirichlet, Neumann and periodic conditions.',
          estimatedMinutes: 110,
          objectives: [
            'Carry out separation of variables for the heat and wave equations on an interval',
            'Solve the eigenvalue problems for Dirichlet, Neumann, mixed and periodic conditions',
            'Assemble the series solution and fit initial data',
            'Identify the long-time behaviour from the lowest eigenvalue',
          ],
          concepts: [
            'Product solutions',
            'Separation constant',
            'Homogeneous boundary conditions',
            'Eigenvalue problem',
            'Superposition',
            'Periodic boundary conditions',
          ],
          explanation: `Separation works for a linear homogeneous PDE with linear homogeneous boundary conditions. The steps are always the same.

1. Look for solutions $u = X(x)T(t)$, and divide the equation by $XT$. A function of $t$ equals a function of $x$, so both equal a constant $-\\lambda$.
2. The boundary conditions fall on $X$, giving an **eigenvalue problem** $-X'' = \\lambda X$ with two homogeneous conditions.
3. Solve the time ODE for each eigenvalue.
4. Superpose, and choose the coefficients to fit the initial data, using orthogonality.

The eigenvalue problems on $0 < x < l$ that arise most often are:

| Conditions | Eigenvalues | Eigenfunctions |
|---|---|---|
| $X(0) = X(l) = 0$ | $(n\\pi/l)^2$, $n \\geq 1$ | $\\sin(n\\pi x/l)$ |
| $X'(0) = X'(l) = 0$ | $(n\\pi/l)^2$, $n \\geq 0$ | $\\cos(n\\pi x/l)$ |
| $X(0) = X'(l) = 0$ | $((n - \\frac12)\\pi/l)^2$, $n \\geq 1$ | $\\sin((n - \\frac12)\\pi x/l)$ |
| periodic on $(-l, l)$ | $(n\\pi/l)^2$, $n \\geq 0$ | $\\cos$ and $\\sin(n\\pi x/l)$ |

For each, show that there are no negative eigenvalues and decide whether 0 is one, as you did in \`differential-equations\`. The Neumann problem has $\\lambda_0 = 0$ with $X_0 = 1$. The periodic problem, for heat in a thin ring, has a two-dimensional eigenspace for each $n \\geq 1$.

**Worked example.** A rod $0 < x < 1$ with $k = 1$ has insulated ends and initial temperature $u(x, 0) = x$.

The eigenfunctions are $1$ and $\\cos n\\pi x$, and $T_n = e^{-n^2\\pi^2t}$. So

$$u = \\frac{A_0}{2} + \\sum_{n=1}^\\infty A_ne^{-n^2\\pi^2t}\\cos n\\pi x,$$

where the $A_n$ are the cosine coefficients of $x$ on $(0, 1)$:

$$A_0 = 2\\int_0^1x\\,dx = 1, \\qquad A_n = 2\\int_0^1x\\cos n\\pi x\\,dx = \\frac{2((-1)^n - 1)}{n^2\\pi^2}.$$

So $A_n = -4/(n^2\\pi^2)$ for odd $n$ and 0 for even $n \\geq 2$, and

$$u(x, t) = \\frac12 - \\frac{4}{\\pi^2}\\sum_{n\\text{ odd}}\\frac{1}{n^2}e^{-n^2\\pi^2t}\\cos n\\pi x.$$

As $t \\to \\infty$, $u \\to \\frac12$, the average initial temperature, since no heat leaves. The approach is governed by the first non-zero eigenvalue $\\pi^2$: after a time of a few multiples of $1/\\pi^2 \\approx 0.1$, the solution is $\\frac12 - \\frac{4}{\\pi^2}e^{-\\pi^2t}\\cos\\pi x$ to good accuracy.

Check the boundary conditions: every term has zero $x$-derivative at $x = 0$ and $x = 1$. And at $t = 0$ the series is the cosine series of $x$, which converges to $x$ on $[0, 1]$, as the even extension is continuous.

Why should the series solve the PDE when it is an infinite sum? For the heat equation and $t > 0$, the factors $e^{-n^2\\pi^2t}$ make the differentiated series converge uniformly, so term-by-term differentiation is justified. For the wave equation there is no such decay, and the meaning of the series needs more care, which the lesson on convergence provides.`,
          resources: [
            ivrii('The chapter on separation of variables.'),
            mit18303('The lecture notes on separation of variables and eigenfunctions.'),
            diffyqs('The sections on the heat equation and the wave equation, for more worked practice.'),
          ],
          exercises: [
            {
              slug: 'ring-heat',
              title: 'Heat in a ring',
              prompt: `A thin ring of circumference $2\\pi$ with $k = 1$ has initial temperature $\\phi(\\theta) = |\\theta|$ for $-\\pi < \\theta \\leq \\pi$. Solve $u_t = u_{\\theta\\theta}$ with periodic conditions. Find the limit as $t \\to \\infty$ and the time after which $u$ differs from it by less than 0.01 everywhere, using the first non-trivial term and a bound on the rest.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mixed-conditions-heat',
              title: 'One end fixed, one insulated',
              prompt: `Solve $u_t = u_{xx}$ on $0 < x < \\pi$ with $u(0, t) = 0$, $u_x(\\pi, t) = 0$ and $u(x, 0) = 1$. Find the decay rate of the slowest mode, and compare with the problem with both ends fixed.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'free-ends-wave',
              title: 'A free-free bar',
              prompt: `Longitudinal vibrations of a bar with free ends satisfy $u_{tt} = c^2u_{xx}$, $u_x(0, t) = u_x(l, t) = 0$. Solve with $u(x, 0) = 0$ and $u_t(x, 0) = v_0$, a constant. Interpret the $n = 0$ term, and explain why it grows linearly.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'decay-term',
              title: 'Absorb a decay term',
              prompt: `Solve $u_t = ku_{xx} - \\gamma u$ on $0 < x < l$ with zero Dirichlet conditions, by substituting $u = e^{-\\gamma t}v$. Then solve it directly by separation and confirm the two answers agree.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must both sides of the separated equation equal a constant?',
              answerOutline: 'One side depends only on $t$ and the other only on $x$, so each is unchanged when either variable varies.',
            },
            {
              question: 'Why do the boundary conditions need to be homogeneous?',
              answerOutline: 'So that they fall on $X$ alone and survive superposition.',
            },
            {
              question: 'What does the lowest non-zero eigenvalue tell you?',
              answerOutline: 'The rate at which the solution approaches its long-time limit.',
            },
          ],
        },
        {
          slug: 'symmetric-boundary-conditions',
          title: 'Robin conditions and orthogonality',
          summary:
            'Green\'s identity explains why eigenfunctions are orthogonal for any symmetric boundary conditions, including the Robin conditions of heat loss at a surface.',
          estimatedMinutes: 110,
          objectives: [
            'Define symmetric boundary conditions using Green\'s second identity',
            'Prove that eigenvalues are real and eigenfunctions orthogonal under symmetric conditions',
            'Solve Robin eigenvalue problems from a transcendental equation',
            'Decide the sign of eigenvalues from the energy identity',
          ],
          concepts: [
            'Green\'s second identity',
            'Symmetric boundary conditions',
            'Robin condition',
            'Transcendental eigenvalue equation',
            'Positivity of eigenvalues',
            'Negative eigenvalue',
          ],
          explanation: `For $C^2$ functions on $[a, b]$, integrating by parts twice gives **Green's second identity**

$$\\int_a^b\\left(-f''g + fg''\\right)dx = \\Big[-f'g + fg'\\Big]_a^b.$$

Call a pair of boundary conditions **symmetric** if the right side vanishes for every $f, g$ satisfying them. Dirichlet, Neumann, periodic and Robin conditions $X' = \\alpha X$ at each end are all symmetric.

**Theorem.** Under symmetric conditions, the eigenvalues of $-X'' = \\lambda X$ are real, and eigenfunctions for different eigenvalues are orthogonal on $[a, b]$.

*Proof.* If $-X_1'' = \\lambda_1X_1$ and $-X_2'' = \\lambda_2X_2$, the identity gives $(\\lambda_1 - \\lambda_2)\\int X_1X_2 = 0$. For reality, apply this to $X$ and $\\bar X$, which has eigenvalue $\\bar\\lambda$, and use $\\int|X|^2 > 0$. $\\square$

For the sign, multiply $-X'' = \\lambda X$ by $X$ and integrate by parts:

$$\\lambda\\int_a^bX^2\\,dx = \\int_a^bX'^2\\,dx - \\Big[XX'\\Big]_a^b.$$

With Dirichlet or Neumann conditions the bracket vanishes, so $\\lambda \\geq 0$. With Robin conditions, it depends on the sign of the heat-transfer coefficient. For $X(0) = 0$ and $X'(l) + hX(l) = 0$, the bracket is $-hX(l)^2$, so $\\lambda \\int X^2 = \\int X'^2 + hX(l)^2 > 0$ when $h \\geq 0$. A negative $h$, physically a surface that pumps heat in as it warms, can produce a negative eigenvalue, a mode that grows exponentially.

**Worked example.** Find the eigenvalues of $-X'' = \\lambda X$ on $(0, 1)$ with $X(0) = 0$ and $X'(1) + 2X(1) = 0$, which models a rod cooled at one end into surroundings at temperature 0.

By the energy identity with $h = 2$, every eigenvalue is positive. Write $\\lambda = \\beta^2$ with $\\beta > 0$. The condition at 0 gives $X = \\sin\\beta x$. The condition at 1 gives

$$\\beta\\cos\\beta + 2\\sin\\beta = 0 \\quad\\Longleftrightarrow\\quad \\tan\\beta = -\\frac{\\beta}{2}.$$

Graph $\\tan\\beta$ against the line $-\\beta/2$. They cross once in each interval $((n - \\frac12)\\pi, n\\pi)$, so there are infinitely many eigenvalues, with $\\beta_n$ slightly above $(n - \\frac12)\\pi$ for large $n$, because $-\\beta/2$ is large and negative there and $\\tan$ takes large negative values just after each $(n - \\frac12)\\pi$. Numerically,

$$\\beta_1 \\approx 2.2889, \\qquad \\beta_2 \\approx 5.0870, \\qquad \\beta_3 \\approx 8.0962,$$

so $\\lambda_1 \\approx 5.24$. Compare with $\\pi^2/4 \\approx 2.47$ for an insulated end and $\\pi^2 \\approx 9.87$ for an end held at 0. Cooling at the surface sits between the two, as it should.

By the theorem, the $\\sin\\beta_nx$ are orthogonal on $(0, 1)$, although the $\\beta_n$ are not evenly spaced and nothing about this is visible without the identity. To expand data, use $c_n = \\int_0^1\\phi\\sin\\beta_nx\\,dx \\big/ \\int_0^1\\sin^2\\beta_nx\\,dx$, and the heat solution is $\\sum c_ne^{-k\\beta_n^2t}\\sin\\beta_nx$.`,
          resources: [
            ivrii('The section on eigenvalue problems with Robin boundary conditions.'),
            mit18303('The lecture notes on Hermitian operators and eigenfunctions.'),
          ],
          exercises: [
            {
              slug: 'which-symmetric',
              title: 'Which conditions are symmetric?',
              prompt: `Decide which are symmetric on $[0, 1]$: (a) $X(0) = X(1)$ and $X'(0) = X'(1)$; (b) $X(0) = 2X(1)$ and $X'(0) = \\frac12X'(1)$; (c) $X(0) = X'(1)$ and $X'(0) = 0$; (d) $X'(0) = 3X(0)$ and $X'(1) = -X(1)$. Prove your answers.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'negative-eigenvalue',
              title: 'A growing mode',
              prompt: `For $X(0) = 0$ and $X'(1) + hX(1) = 0$, show that there is a negative eigenvalue exactly when $h < -1$, and find it numerically for $h = -2$. What does the corresponding heat solution do, and what physical situation could it describe?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Try $X = \\sinh\\mu x$ and compare $\\tanh\\mu/\\mu$ with $-1/h$.',
            },
            {
              slug: 'robin-heat-solution',
              title: 'A cooled rod',
              prompt: `For the worked example with $k = 1$ and $u(x, 0) = 1$, compute the first five coefficients $c_n$ and evaluate $u(0.5, 0.2)$. Verify the orthogonality of the first three eigenfunctions numerically. Then solve the same problem with a finite-difference scheme and compare.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'complex-eigenvalues-impossible',
              title: 'No complex eigenvalues',
              prompt: `Write the proof that eigenvalues are real for symmetric conditions in detail, explaining why $\\bar X$ satisfies the same boundary conditions when the coefficients in them are real. Then take the conditions $X(0) = 0$, $X'(0) = X'(1)$. Show that they are not symmetric, find all eigenvalues, complex ones included, and show that they happen to be real. Show that the eigenfunctions for $\\lambda = 0$ and $\\lambda = 4\\pi^2$ are not orthogonal.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $X = \\sin\\beta x$, the condition is $\\beta(1 - \\cos\\beta) = 0$. Allow complex $\\beta$, and treat $\\lambda = 0$ separately.',
            },
          ],
          selfAssessment: [
            {
              question: 'What makes a pair of boundary conditions symmetric?',
              answerOutline: 'The boundary term $[-f\'g + fg\']$ in Green\'s identity vanishes for all functions satisfying them.',
            },
            {
              question: 'Why are eigenvalues positive for $X(0) = 0$, $X\'(l) + hX(l) = 0$ with $h \\geq 0$?',
              answerOutline: 'The energy identity gives $\\lambda\\int X^2 = \\int X\'^2 + hX(l)^2 > 0$.',
            },
            {
              question: 'How do you find Robin eigenvalues in practice?',
              answerOutline: 'Reduce to a transcendental equation such as $\\tan\\beta = -\\beta/h$, bracket roots from a graph, and solve numerically.',
            },
          ],
        },
        {
          slug: 'convergence-theorems',
          title: 'Convergence theorems',
          summary:
            'Mean-square, pointwise and uniform convergence of Fourier series, with hypotheses, and a proof of the uniform theorem from Bessel\'s inequality.',
          estimatedMinutes: 120,
          objectives: [
            'State the three convergence theorems with their hypotheses',
            'Prove Bessel\'s inequality and the uniform convergence theorem',
            'Derive the Dirichlet kernel and explain the pointwise theorem',
            'Use convergence results to justify series solutions of PDEs',
          ],
          concepts: [
            'Mean-square convergence',
            'Bessel\'s inequality',
            'Completeness',
            'Dirichlet kernel',
            'Riemann-Lebesgue lemma',
            'Uniform convergence',
          ],
          explanation: `Let $f$ be defined on $(-l, l)$, extended with period $2l$, and let $S_N$ be the partial sum of its full Fourier series.

**Theorem 1 (mean square).** If $\\int_{-l}^lf^2 < \\infty$, then $\\int_{-l}^l(f - S_N)^2\\,dx \\to 0$.

**Theorem 2 (pointwise).** If $f$ and $f'$ are piecewise continuous, then $S_N(x) \\to \\frac12[f(x^+) + f(x^-)]$ at every $x$.

**Theorem 3 (uniform).** If the periodic extension of $f$ is continuous and $f'$ is piecewise continuous, then $\\sum(|a_n| + |b_n|) < \\infty$, and $S_N \\to f$ uniformly.

**Bessel's inequality.** Expanding $\\int(f - S_N)^2 \\geq 0$ and using orthogonality,

$$\\frac{a_0^2}{2} + \\sum_{n=1}^N(a_n^2 + b_n^2) \\leq \\frac1l\\int_{-l}^lf^2\\,dx.$$

Theorem 1 says that equality holds as $N \\to \\infty$ (Parseval). This is the **completeness** of the trigonometric system, and its proof needs more than orthogonality.

**Worked example.** Prove Theorem 3, taking $l = \\pi$ for simplicity.

Since the extension is continuous and periodic with $f'$ piecewise continuous, we may integrate by parts in the coefficients of $f'$, and the boundary terms cancel by periodicity. This gives

$$a_n(f') = nb_n(f), \\qquad b_n(f') = -na_n(f).$$

Bessel's inequality for $f'$ says $\\sum n^2(a_n^2 + b_n^2) \\leq \\frac1\\pi\\int(f')^2 < \\infty$. By the Cauchy-Schwarz inequality,

$$\\sum_{n=1}^\\infty(|a_n| + |b_n|) = \\sum_{n=1}^\\infty\\frac1n\\cdot n(|a_n| + |b_n|) \\leq \\left(\\sum\\frac{2}{n^2}\\right)^{1/2}\\left(\\sum n^2(a_n^2 + b_n^2)\\right)^{1/2} < \\infty,$$

using $(|a| + |b|)^2 \\leq 2(a^2 + b^2)$. By the Weierstrass M-test the series converges absolutely and uniformly to some continuous $g$. Its Fourier coefficients equal those of $f$, since uniform convergence lets us integrate term by term. Then $f - g$ is continuous with all coefficients zero, and by Theorem 1 it has $\\int(f - g)^2 = 0$, so $f = g$. $\\square$

Apply it to the plucked string $\\phi(x) = x(\\pi - x)$. Its odd extension is continuous and periodic with a piecewise continuous derivative, so the sine series converges uniformly. Indeed $b_n = 8/(\\pi n^3)$ for odd $n$.

**The pointwise theorem** rests on the **Dirichlet kernel**. A short calculation shows

$$S_N(x) = \\frac{1}{2\\pi}\\int_{-\\pi}^\\pi D_N(\\theta)f(x + \\theta)\\,d\\theta, \\qquad D_N(\\theta) = \\frac{\\sin((N + \\frac12)\\theta)}{\\sin(\\theta/2)},$$

with $\\frac{1}{2\\pi}\\int D_N = 1$. Subtracting the claimed limit leaves an integral of a piecewise continuous function against $\\sin((N + \\frac12)\\theta)$, which tends to zero by the **Riemann-Lebesgue lemma**. The hypothesis on $f'$ is what makes that function piecewise continuous near $\\theta = 0$.

For PDEs, these theorems decide what a series solution means. For the wave equation, a series with coefficients satisfying $\\sum n^2(|A_n| + |B_n|) < \\infty$ can be differentiated twice term by term, and is a genuine $C^2$ solution. A plucked string, whose coefficients decay like $1/n^2$, does not quite qualify. It is a solution in a weaker sense, and d'Alembert's formula shows exactly how its corners move.`,
          resources: [
            ivrii('The chapter on Fourier series, including the convergence theorems and their proofs.'),
            diffyqs('The section on further results about Fourier series.'),
            wiki('Gibbs_phenomenon', 'Gibbs phenomenon', 'The behaviour at jumps, with the overshoot constant.'),
          ],
          exercises: [
            {
              slug: 'dirichlet-kernel',
              title: 'The Dirichlet kernel',
              prompt: `Derive the formula for $S_N$ as an integral against $D_N(\\theta) = 1 + 2\\sum_{n=1}^N\\cos n\\theta$, and prove the closed form $D_N(\\theta) = \\sin((N + \\frac12)\\theta)/\\sin(\\theta/2)$. Show $\\frac{1}{2\\pi}\\int_{-\\pi}^\\pi D_N = 1$. Plot $D_N$ for $N = 5, 20$, and explain why $\\int|D_N|$ grows, which is why continuity alone does not guarantee convergence.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'mean-square-error',
              title: 'Mean-square error of a square wave',
              prompt: `For the square wave $f = \\operatorname{sign}(x)$ on $(-\\pi, \\pi)$, use Parseval to show that $\\int_{-\\pi}^\\pi(f - S_N)^2\\,dx = \\pi\\sum_{n > N}b_n^2$. Compute it for $N = 1, 5, 25$ and confirm with numerical integration. Show that it tends to zero like $1/N$, even though $\\max|f - S_N|$ does not tend to zero.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'riemann-lebesgue',
              title: 'The Riemann-Lebesgue lemma',
              prompt: `Prove that $\\int_a^bg(\\theta)\\sin(m\\theta)\\,d\\theta \\to 0$ as $m \\to \\infty$ for every piecewise continuous $g$, first for $g$ a step function, then by approximation. Then use the lemma and the Dirichlet kernel to prove Theorem 2 at a point where $f$ is differentiable.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'which-theorem',
              title: 'Which theorem applies?',
              prompt: `For each function on $(-\\pi, \\pi)$, extended periodically, say which of the three theorems apply, and what the series converges to at $x = 0$ and $x = \\pi$: (a) $x^2$; (b) $x$; (c) $|x|^{1/2}$; (d) $e^x$; (e) $\\sin(x/2)$.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does Bessel\'s inequality say, and what does Parseval add?',
              answerOutline: 'The sum of squared coefficients is at most the mean square of $f$. Parseval says equality holds: the system is complete.',
            },
            {
              question: 'Why does Theorem 3 need the periodic extension to be continuous?',
              answerOutline: 'Integration by parts for the coefficients of $f\'$ needs the boundary terms to cancel. A jump would also prevent uniform convergence.',
            },
            {
              question: 'Why is a plucked-string series not a classical $C^2$ solution?',
              answerOutline: 'Its coefficients decay like $1/n^2$, too slowly to differentiate twice term by term. The solution has corners.',
            },
          ],
        },
        {
          slug: 'inhomogeneous-problems',
          title: 'Inhomogeneous problems',
          summary:
            'Remove non-zero boundary data by subtracting a function that satisfies them, and handle sources by expanding in eigenfunctions with time-dependent coefficients.',
          estimatedMinutes: 110,
          objectives: [
            'Reduce non-homogeneous boundary conditions by subtracting a steady state or another simple function',
            'Solve forced problems by eigenfunction expansion with time-dependent coefficients',
            'Handle time-dependent boundary data',
            'Recognise resonance in forced wave problems on an interval',
          ],
          concepts: [
            'Non-homogeneous boundary data',
            'Steady-state subtraction',
            'Eigenfunction expansion method',
            'Time-dependent coefficients',
            'Duhamel for each mode',
            'Resonance',
          ],
          explanation: `Separation needs homogeneous boundary conditions. When the boundary data are non-zero, subtract a function that takes care of them.

**Steady data.** For $u_t = ku_{xx}$ on $0 < x < l$ with $u(0, t) = A$, $u(l, t) = B$, the steady state $v(x) = A + (B - A)x/l$ satisfies the equation and the boundary conditions. Then $w = u - v$ has zero boundary values, and initial data $\\phi - v$.

**Sources.** For $u_t = ku_{xx} + f(x, t)$ with zero Dirichlet data, expand everything in the eigenfunctions $X_n = \\sin(n\\pi x/l)$:

$$u = \\sum u_n(t)X_n(x), \\qquad f = \\sum f_n(t)X_n(x).$$

Substituting, and using $X_n'' = -\\lambda_nX_n$, each coefficient obeys an ODE:

$$u_n' + k\\lambda_nu_n = f_n(t), \\qquad u_n(0) = \\phi_n.$$

Solve each by an integrating factor, $u_n(t) = e^{-k\\lambda_nt}\\phi_n + \\int_0^te^{-k\\lambda_n(t - s)}f_n(s)\\,ds$, which is Duhamel's principle mode by mode. The same works for the wave equation, where each mode is a forced oscillator.

**Time-dependent data.** If $u(0, t) = g(t)$ and $u(l, t) = h(t)$, subtract $v(x, t) = g(t) + (h(t) - g(t))x/l$. This satisfies the boundary conditions, but not the equation, so $w = u - v$ picks up the source $-v_t$. Then use the eigenfunction method.

**Worked example.** Solve $u_t = u_{xx}$ on $0 < x < \\pi$ with $u(0, t) = 0$, $u(\\pi, t) = 1$, $u(x, 0) = 0$.

The steady state is $v = x/\\pi$. Then $w = u - x/\\pi$ solves the heat equation with zero boundary values and $w(x, 0) = -x/\\pi$. Its sine coefficients are

$$b_n = \\frac2\\pi\\int_0^\\pi\\left(-\\frac x\\pi\\right)\\sin nx\\,dx = -\\frac{2}{\\pi^2}\\cdot\\frac{\\pi(-1)^{n+1}}{n} = \\frac{2(-1)^n}{n\\pi},$$

using $\\int_0^\\pi x\\sin nx\\,dx = \\pi(-1)^{n+1}/n$. So

$$u(x, t) = \\frac x\\pi + \\sum_{n=1}^\\infty\\frac{2(-1)^n}{n\\pi}e^{-n^2t}\\sin nx.$$

At $t = 0$ the series is the sine series of $-x/\\pi$, so $u(x, 0) = 0$ for $0 \\leq x < \\pi$. At $x = \\pi$ the series converges to 0, the midpoint of the jump in the odd extension, while $u(\\pi, 0)$ should equal 1. The initial data and the boundary data disagree at the corner $(\\pi, 0)$. That incompatibility is harmless: for $t > 0$ the solution is smooth and takes the right boundary values. At the midpoint and $t = 1$, the first term gives $u(\\pi/2, 1) \\approx \\frac12 - \\frac2\\pi e^{-1} \\approx 0.266$.

**Forcing a mode.** For $u_t = u_{xx} + \\sin x$ with zero data on $(0, \\pi)$, only $n = 1$ is forced: $u_1' + u_1 = 1$, $u_1(0) = 0$. So $u = (1 - e^{-t})\\sin x$, tending to the steady state $\\sin x$, which solves $-u'' = \\sin x$.`,
          resources: [
            ivrii('The section on non-homogeneous problems and the method of eigenfunction expansion.'),
            mit18303('The lecture notes on inhomogeneous problems.'),
          ],
          exercises: [
            {
              slug: 'source-expansion',
              title: 'A source by expansion',
              prompt: `Solve $u_t = u_{xx} + x$ on $0 < x < \\pi$ with zero boundary values and zero initial data, by eigenfunction expansion. Check your answer against the steady state, which you can find by solving $-v'' = x$ directly, as $t \\to \\infty$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'moving-boundary-data',
              title: 'An oscillating end temperature',
              prompt: `Solve $u_t = u_{xx}$ on $0 < x < \\pi$ with $u(0, t) = 0$, $u(\\pi, t) = \\sin t$ and $u(x, 0) = 0$. Subtract $v = (x/\\pi)\\sin t$, find the source for $w$, and solve the coefficient ODEs. Describe the long-time periodic behaviour, and compute the amplitude of $u(\\pi/2, t)$ for large $t$ numerically.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'forced-string-modes',
              title: 'A forced string',
              prompt: `For $u_{tt} = u_{xx} + \\sin(3x)\\sin(\\omega t)$ on $(0, \\pi)$ with fixed ends, starting from rest, find $u$ for $\\omega \\neq 3$. Show that the amplitude grows without bound when $\\omega = 3$. Then add damping, $u_{tt} + 0.1u_t = u_{xx} + \\sin(3x)\\sin(3t)$, and find the steady amplitude.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'corner-incompatibility',
              title: 'Living with an incompatible corner',
              prompt: `For the worked example, plot partial sums at $t = 0$, $0.001$ and $0.1$ near $x = \\pi$, with 10, 100 and 1000 terms. Explain what you see at $t = 0$ in terms of the Gibbs phenomenon, and why the problem disappears for $t > 0$.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does subtracting the steady state achieve?',
              answerOutline: 'It moves non-zero boundary data into the initial data, leaving homogeneous conditions for separation.',
            },
            {
              question: 'What equation does each coefficient satisfy for a source problem?',
              answerOutline: 'A first-order linear ODE $u_n\' + k\\lambda_nu_n = f_n(t)$ for heat, or a forced oscillator for waves.',
            },
            {
              question: 'Why does the worked example converge to 0, not 1, at $x = \\pi$ when $t = 0$?',
              answerOutline: 'The sine series of the odd extension converges to the midpoint of its jump there.',
            },
          ],
        },
      ],
    },
    {
      slug: 'laplace-equation',
      title: "Laplace's Equation",
      description:
        'Harmonic functions and the mean value property, the Poisson formula on a disk, Green\'s identities with their consequences, and Green\'s functions built by the method of images.',
      lessons: [
        {
          slug: 'harmonic-functions-and-mean-value',
          title: 'Harmonic functions and the mean value property',
          summary:
            'A harmonic function equals its average over every circle, which forces its maximum onto the boundary and makes the Dirichlet problem unique.',
          estimatedMinutes: 110,
          objectives: [
            'Prove the mean value property in two dimensions',
            'Deduce the strong and weak maximum principles',
            'Prove uniqueness and stability for the Dirichlet problem',
            'Generate harmonic functions from complex analysis and from radial solutions',
          ],
          concepts: [
            'Harmonic function',
            'Mean value property',
            'Strong maximum principle',
            'Weak maximum principle',
            'Uniqueness for the Dirichlet problem',
            'Fundamental solution $\\frac{1}{2\\pi}\\ln r$',
          ],
          explanation: `A $C^2$ function with $\\Delta u = u_{xx} + u_{yy} = 0$ on an open set $D$ is **harmonic**. Real and imaginary parts of analytic functions are harmonic: from $z^n$ come $r^n\\cos n\\theta$ and $r^n\\sin n\\theta$, such as $x^2 - y^2$ and $x^3 - 3xy^2$. Radial harmonic functions satisfy $u'' + u'/r = 0$, so they are $a + b\\ln r$ in the plane. In three dimensions they are $a + b/r$.

**Theorem (mean value property).** If $u$ is harmonic on a domain containing the closed disk of radius $R$ about $p$, then for every $0 < r \\leq R$,

$$u(p) = \\frac{1}{2\\pi}\\int_0^{2\\pi}u(p + r(\\cos\\theta, \\sin\\theta))\\,d\\theta.$$

*Proof.* Call the right side $M(r)$. Differentiating under the integral,

$$M'(r) = \\frac{1}{2\\pi}\\int_0^{2\\pi}\\frac{\\partial u}{\\partial r}\\,d\\theta = \\frac{1}{2\\pi r}\\oint_{|x - p| = r}\\frac{\\partial u}{\\partial n}\\,ds = \\frac{1}{2\\pi r}\\iint_{|x - p| < r}\\Delta u\\,dA = 0,$$

by the divergence theorem. So $M$ is constant, and as $r \\to 0$, $M(r) \\to u(p)$ by continuity. $\\square$

**Strong maximum principle.** If $D$ is connected and $u$ attains its maximum at an interior point, then $u$ is constant. Indeed, the set where $u$ equals its maximum $m$ is closed. It is also open: around such a point, $u \\leq m$ on each small circle, its average is $m$, so $u = m$ on the circle, hence on a disk. A non-empty open and closed subset of a connected set is all of it.

**Weak maximum principle.** If $D$ is bounded and $u$ is continuous on $\\bar D$, then $\\max_{\\bar D}u = \\max_{\\partial D}u$, and similarly for the minimum.

**Uniqueness and stability.** If $u_1, u_2$ solve $\\Delta u = 0$ in $D$ with boundary values $h_1, h_2$, then $\\max_{\\bar D}|u_1 - u_2| \\leq \\max_{\\partial D}|h_1 - h_2|$. So the Dirichlet problem has at most one solution, and it depends continuously on the data.

**Worked example.** Check the mean value property for $u = x^3 - 3xy^2$ on the circle of radius 1 about $p = (1, 1)$.

The theorem predicts $u(1, 1) = 1 - 3 = -2$. Directly, with $x = 1 + \\cos\\theta$ and $y = 1 + \\sin\\theta$,

$$x^3 = 1 + 3\\cos\\theta + 3\\cos^2\\theta + \\cos^3\\theta,$$

$$3xy^2 = 3(1 + \\cos\\theta)(1 + 2\\sin\\theta + \\sin^2\\theta).$$

Averaging over $\\theta$, using that the averages of $\\cos\\theta$, $\\sin\\theta$, $\\cos^3\\theta$, $\\cos\\theta\\sin\\theta$ and $\\cos\\theta\\sin^2\\theta$ are 0 and those of $\\cos^2\\theta$, $\\sin^2\\theta$ are $\\frac12$: the first gives $1 + \\frac32 = \\frac52$. The second gives $3(1 + \\frac12) = \\frac92$. The difference is $\\frac52 - \\frac92 = -2$, as predicted.

The same reasoning fails for non-harmonic functions: $x^2 + y^2$ has average $r^2$ on a circle of radius $r$ about the origin, but value 0 at the centre. A harmonic function cannot have a strict local maximum or minimum, which is why a soap film stretched on a wire has no bumps.`,
          resources: [
            ivrii('The chapter on Laplace\'s equation: harmonic functions and the maximum principle.'),
            mit18152('The lectures on Laplace\'s and Poisson\'s equations and the mean value property.'),
            wiki('Harmonic_function', 'Harmonic function', 'Properties and examples, including the mean value property.'),
          ],
          exercises: [
            {
              slug: 'harmonic-catalogue',
              title: 'A catalogue of harmonic functions',
              prompt: `Verify that each is harmonic where defined: (a) $e^x\\cos y$; (b) $\\ln(x^2 + y^2)$; (c) $\\frac{x}{x^2 + y^2}$; (d) $1/\\sqrt{x^2 + y^2 + z^2}$ in three dimensions. For (a), find a harmonic conjugate $v$, so that $u + iv$ is analytic.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'area-mean-value',
              title: 'The mean over a disk',
              prompt: `From the circle version, prove that $u(p)$ also equals the average of $u$ over the disk of radius $r$ about $p$. Then use the mean value property to show that a bounded harmonic function on all of $\\mathbb{R}^2$ is constant (Liouville's theorem), by comparing the averages over two large disks with different centres.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'max-principle-bound',
              title: 'Bounding a solution without solving',
              prompt: `Let $u$ be harmonic in the unit square with $u = x^2$ on the boundary. Without solving, show that $0 \\leq u \\leq 1$ inside and that the inequalities are strict. By comparing $u$ with the harmonic functions $x$ and $x^2 - y^2$ on the boundary, show that $x^2 - y^2 \\leq u \\leq x$ inside, so that $0 \\leq u(\\frac12, \\frac12) \\leq \\frac12$. Then compute $u(\\frac12, \\frac12)$ numerically, by a series or a finite-difference solver.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'poisson-max-principle',
              title: 'A maximum principle for Poisson',
              prompt: `Suppose $\\Delta u = f \\geq 0$ in a bounded domain $D$ with $u$ continuous on $\\bar D$. Prove $\\max_{\\bar D}u = \\max_{\\partial D}u$, using $u + \\epsilon|x|^2$. Then deduce the bound $|u| \\leq \\max_{\\partial D}|u| + \\frac{R^2}{4}\\max|\\Delta u|$ for $D$ inside a disk of radius $R$ about the origin.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the key step in the proof of the mean value property?',
              answerOutline: 'The derivative of the circle average equals the flux through the circle divided by $2\\pi r$, which is zero by the divergence theorem.',
            },
            {
              question: 'Why can a harmonic function not have an interior strict maximum?',
              answerOutline: 'Its value equals its average on small circles, so it cannot exceed all nearby values.',
            },
            {
              question: 'How does the maximum principle give uniqueness for the Dirichlet problem?',
              answerOutline: 'The difference of two solutions is harmonic and zero on the boundary, so its maximum and minimum are 0.',
            },
          ],
        },
        {
          slug: 'poisson-formula',
          title: 'The Poisson formula',
          summary:
            'Sum the separated series for a disk in closed form, and obtain a formula for the harmonic function with any continuous boundary values.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the Poisson kernel from the series solution on a disk',
            'State and use the Poisson formula',
            'Prove the main properties of the Poisson kernel',
            'Solve problems on annuli and exteriors of disks',
          ],
          concepts: [
            'Poisson kernel',
            'Poisson integral formula',
            'Geometric series in complex form',
            'Harnack inequality',
            'Exterior Dirichlet problem',
          ],
          explanation: `On the disk $r < a$, separation in polar coordinates gives the bounded solutions

$$u(r, \\theta) = \\frac{A_0}{2} + \\sum_{n=1}^\\infty\\left(\\frac ra\\right)^n(A_n\\cos n\\theta + B_n\\sin n\\theta),$$

where $A_n, B_n$ are the Fourier coefficients of the boundary data $h(\\theta) = u(a, \\theta)$. Substitute the integral formulas for the coefficients and exchange sum and integral, which is allowed for $r < a$ since the factors $(r/a)^n$ give uniform convergence. Using $\\cos n\\theta\\cos n\\phi + \\sin n\\theta\\sin n\\phi = \\cos n(\\theta - \\phi)$,

$$u(r, \\theta) = \\frac{1}{2\\pi}\\int_0^{2\\pi}\\left[1 + 2\\sum_{n=1}^\\infty\\left(\\frac ra\\right)^n\\cos n(\\theta - \\phi)\\right]h(\\phi)\\,d\\phi.$$

**Worked example.** Sum the bracket in closed form.

Let $\\rho = r/a < 1$ and $\\alpha = \\theta - \\phi$, and write $w = \\rho e^{i\\alpha}$. Then the bracket is the real part of $1 + 2\\sum_{n \\geq 1}w^n$. Summing the geometric series,

$$1 + 2\\sum_{n=1}^\\infty w^n = 1 + \\frac{2w}{1 - w} = \\frac{1 + w}{1 - w}.$$

Multiply the numerator and denominator by $1 - \\bar w$:

$$\\frac{(1 + w)(1 - \\bar w)}{|1 - w|^2} = \\frac{1 - |w|^2 + (w - \\bar w)}{1 - 2\\rho\\cos\\alpha + \\rho^2}.$$

The term $w - \\bar w$ is imaginary, so the real part is $\\frac{1 - \\rho^2}{1 - 2\\rho\\cos\\alpha + \\rho^2}$. Multiplying top and bottom by $a^2$ gives **Poisson's formula**:

$$u(r, \\theta) = \\frac{a^2 - r^2}{2\\pi}\\int_0^{2\\pi}\\frac{h(\\phi)}{a^2 - 2ar\\cos(\\theta - \\phi) + r^2}\\,d\\phi.$$

At $r = 0$ the kernel is $\\frac{1}{2\\pi}$, which recovers the mean value property.

**Theorem.** If $h$ is continuous on the circle, Poisson's formula defines a harmonic function in the disk with $u(r, \\theta) \\to h(\\theta_0)$ as $(r, \\theta) \\to (a, \\theta_0)$.

The proof uses three properties of the kernel $P(r, \\alpha) = \\frac{a^2 - r^2}{2\\pi(a^2 - 2ar\\cos\\alpha + r^2)}$: it is positive, its integral over $\\alpha$ is 1 (take $h = 1$, where $u = 1$), and as $r \\to a$ it concentrates at $\\alpha = 0$. So it is an approximate identity, like the heat kernel. The formula needs only continuity of $h$, whereas the series argument needed more.

**Example of use.** For $h = \\cos^2\\theta = \\frac12 + \\frac12\\cos 2\\theta$ on the unit circle, the series gives at once $u = \\frac12 + \\frac12r^2\\cos 2\\theta = \\frac12 + \\frac12(x^2 - y^2)$. Poisson's formula gives the same function, as you can check numerically.

Because $P > 0$, a non-negative boundary function gives a non-negative solution, and bounds on $P$ give **Harnack's inequality**: for $u \\geq 0$ harmonic on the disk,

$$\\frac{a - r}{a + r}u(0) \\leq u(r, \\theta) \\leq \\frac{a + r}{a - r}u(0).$$`,
          resources: [
            ivrii('The sections on Laplace\'s equation in a disk and the Poisson formula.'),
            mit18152('The lecture on the Poisson formula.'),
            wiki('Poisson_kernel', 'Poisson kernel', 'The kernel for the disk and the half-plane, with its properties.'),
          ],
          exercises: [
            {
              slug: 'kernel-properties-disk',
              title: 'Kernel properties',
              prompt: `Prove that the Poisson kernel is positive for $r < a$, integrates to 1, and that for every $\\delta > 0$, $\\max_{\\delta \\leq |\\alpha| \\leq \\pi}P(r, \\alpha) \\to 0$ as $r \\to a^-$. Verify directly that $P$ is harmonic in $(r, \\theta)$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'half-hot-disk',
              title: 'Half the circle hot',
              prompt: `On the unit disk, let $h = 1$ for $0 < \\theta < \\pi$ and $h = 0$ for $\\pi < \\theta < 2\\pi$. Find $u(0, 0)$ without computation. Compute $u$ at $(0, \\frac12)$ and $(0, -\\frac12)$ from Poisson's formula by numerical quadrature, and check that they sum to 1. Explain why by symmetry.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'annulus-and-exterior',
              title: 'Annulus and exterior',
              prompt: `(a) Find the harmonic function on $1 < r < 2$ with $u = 0$ on $r = 1$ and $u = 1$ on $r = 2$. (b) Find the bounded harmonic function outside the unit disk with $u = \\cos\\theta$ on $r = 1$, and its limit at infinity. (c) On the annulus $1 < r < 2$ with $u(1, \\theta) = 0$ and $u(2, \\theta) = \\sin\\theta$, find $u$ by separation.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'harnack',
              title: 'Prove Harnack\'s inequality',
              prompt: `Prove Harnack's inequality from Poisson's formula by bounding the kernel above and below for $u \\geq 0$. Use it to show that if $u_n \\geq 0$ are harmonic on the disk and $u_n(0) \\to 0$, then $u_n \\to 0$ uniformly on each smaller disk.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How is the Poisson kernel obtained from the series?',
              answerOutline: 'Insert the coefficient integrals, exchange sum and integral, and sum the geometric series $\\operatorname{Re}\\frac{1 + w}{1 - w}$.',
            },
            {
              question: 'Why does Poisson\'s formula need only continuous boundary data?',
              answerOutline: 'Its kernel is a positive approximate identity, so convergence at the boundary follows from continuity alone.',
            },
            {
              question: 'What is the Poisson kernel at the centre of the disk?',
              answerOutline: 'The constant $1/(2\\pi)$, which gives the mean value property.',
            },
          ],
        },
        {
          slug: 'greens-identities',
          title: "Green's identities and the energy",
          summary:
            'Green\'s identities give uniqueness, the compatibility condition for Neumann problems, the Dirichlet principle and a representation formula for harmonic functions.',
          estimatedMinutes: 110,
          objectives: [
            'Derive Green\'s first and second identities from the divergence theorem',
            'Prove uniqueness for Dirichlet, Neumann and Robin problems by the energy method',
            'State the compatibility condition for the Neumann problem',
            'State and use the Dirichlet principle',
            'State the representation formula in three dimensions',
          ],
          concepts: [
            'Green\'s first identity',
            'Green\'s second identity',
            'Neumann compatibility condition',
            'Dirichlet energy',
            'Dirichlet principle',
            'Representation formula',
          ],
          explanation: `Let $D$ be a bounded domain with smooth boundary and outward normal $n$. Applying the divergence theorem to $v\\nabla u$ gives **Green's first identity**:

$$\\iint_D\\left(v\\Delta u + \\nabla v\\cdot\\nabla u\\right)dA = \\oint_{\\partial D}v\\frac{\\partial u}{\\partial n}\\,ds.$$

Subtracting the same with $u$ and $v$ exchanged gives **Green's second identity**:

$$\\iint_D(u\\Delta v - v\\Delta u)\\,dA = \\oint_{\\partial D}\\left(u\\frac{\\partial v}{\\partial n} - v\\frac{\\partial u}{\\partial n}\\right)ds.$$

The same holds in three dimensions with volume and surface integrals.

**Consequences.** Take $v = 1$ in the first identity: for $\\Delta u = f$ in $D$ with $\\partial u/\\partial n = g$ on $\\partial D$,

$$\\iint_Df\\,dA = \\oint_{\\partial D}g\\,ds.$$

This **compatibility condition** is necessary for the Neumann problem to have a solution. For steady heat, total heat produced inside must equal total heat flowing out.

Take $v = u$ with $\\Delta u = 0$: $\\iint|\\nabla u|^2 = \\oint u\\,\\partial_nu$. If $u = 0$ on the boundary, or $\\partial_nu = 0$, the right side vanishes, so $\\nabla u = 0$ and $u$ is constant. Applied to the difference of two solutions, this gives uniqueness for the Dirichlet problem, and uniqueness up to an additive constant for Neumann. For Robin conditions $\\partial_nu + \\alpha u = 0$ with $\\alpha > 0$, the right side is $-\\oint\\alpha u^2 \\leq 0$, which again forces $u = 0$.

**Dirichlet principle.** Among all $C^1$ functions $w$ on $\\bar D$ with $w = h$ on $\\partial D$, the harmonic one minimises the **energy** $E[w] = \\frac12\\iint|\\nabla w|^2$.

**Worked example.** On the unit disk with boundary data $h = \\cos\\theta$, the harmonic solution is $u = r\\cos\\theta = x$. Compare it with $w = x + c(1 - r^2)$, which has the same boundary values for every $c$.

Expand the energy:

$$2E[w] = \\iint|\\nabla x|^2 + 2c\\iint\\nabla x\\cdot\\nabla(1 - r^2) + c^2\\iint|\\nabla(1 - r^2)|^2.$$

The first integral is the area, $\\pi$. For the cross term, $\\nabla(1 - r^2) = (-2x, -2y)$, so $\\nabla x\\cdot\\nabla(1 - r^2) = -2x$, whose integral over the disk is 0 by symmetry. This is Green's first identity at work: the cross term is $\\oint(1 - r^2)\\partial_nx - \\iint(1 - r^2)\\Delta x = 0$. The last integral is $\\iint 4r^2\\,dA = 4\\cdot\\frac{2\\pi}{4} = 2\\pi$. So

$$E[w] = \\frac\\pi2 + \\pi c^2,$$

which is smallest exactly at $c = 0$, the harmonic function. The general proof is the same: writing $w = u + v$ with $v = 0$ on the boundary, the cross term vanishes by Green's identity, and $E[w] = E[u] + E[v] \\geq E[u]$.

**Representation formula (three dimensions).** If $u$ is harmonic in $D$ and $x_0 \\in D$, then

$$u(x_0) = \\frac{1}{4\\pi}\\iint_{\\partial D}\\left[-u\\frac{\\partial}{\\partial n}\\frac{1}{|x - x_0|} + \\frac{1}{|x - x_0|}\\frac{\\partial u}{\\partial n}\\right]dS.$$

It comes from the second identity with $v = 1/|x - x_0|$, after removing a small ball around $x_0$. It shows that harmonic functions are determined by boundary values and normal derivatives together, and it is the starting point for Green's functions.`,
          resources: [
            ivrii('The sections on Green\'s identities and on the Dirichlet principle.'),
            mit18152('The lectures on Green functions for Poisson\'s equation.'),
          ],
          exercises: [
            {
              slug: 'neumann-compatibility',
              title: 'When does a Neumann problem have a solution?',
              prompt: `On the unit disk, for which constants $c$ does $\\Delta u = 1$ with $\\partial u/\\partial n = c$ on the boundary have a solution? Find a solution for that $c$, and describe all solutions. Then do the same for $\\Delta u = 0$ with $\\partial_nu = \\cos^2\\theta + c$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'robin-uniqueness',
              title: 'Uniqueness with Robin conditions',
              prompt: `Prove uniqueness for $\\Delta u = f$ in $D$ with $\\partial_nu + \\alpha u = g$ on $\\partial D$, where $\\alpha > 0$ is a continuous function. Explain what can go wrong when $\\alpha$ is allowed to be negative, using the radial functions on a disk.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'representation-check',
              title: 'Check the representation formula',
              prompt: `Verify the three-dimensional representation formula for $u = 1$ and for $u = z$ on the unit sphere with $x_0 = 0$, computing both surface integrals. Then evaluate it numerically for $u = x^2 - y^2$ and $x_0 = (0.2, 0.1, 0.3)$, by quadrature on the sphere, and compare with $u(x_0)$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'dirichlet-principle-proof',
              title: 'Prove the Dirichlet principle',
              prompt: `Prove the Dirichlet principle as sketched in the lesson, with all hypotheses. Then show the converse: if $u$ minimises $E$ among $C^2$ functions with given boundary values, then $u$ is harmonic, by considering $E[u + \\epsilon v]$ for $v$ vanishing on the boundary.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the compatibility condition for the Neumann problem, physically?',
              answerOutline: 'Total source inside equals total flux out: $\\iint f = \\oint g$.',
            },
            {
              question: 'Why are Neumann solutions unique only up to a constant?',
              answerOutline: 'Adding a constant changes neither $\\Delta u$ nor $\\partial_nu$, and the energy argument only gives $\\nabla u = 0$.',
            },
            {
              question: 'What does the Dirichlet principle say?',
              answerOutline: 'The harmonic function minimises the energy $\\frac12\\iint|\\nabla w|^2$ among functions with the given boundary values.',
            },
          ],
        },
        {
          slug: 'greens-functions-and-images',
          title: "Green's functions and the method of images",
          summary:
            'A Green\'s function solves the Dirichlet problem by an integral. For half-spaces and balls, it can be built by placing an image charge.',
          estimatedMinutes: 120,
          objectives: [
            'Define the Green\'s function of a domain and derive the solution formula',
            'Construct Green\'s functions for the half-plane and half-space by reflection',
            'Derive the half-plane Poisson kernel and use it',
            'Recover the disk Poisson kernel from an image point',
          ],
          concepts: [
            'Fundamental solution',
            'Green\'s function',
            'Method of images',
            'Half-plane Poisson kernel',
            'Image point for a disk',
            'Symmetry of $G$',
          ],
          explanation: `In two dimensions the **fundamental solution** is $\\Phi(x) = \\frac{1}{2\\pi}\\ln|x|$, and in three it is $\\Phi(x) = -\\frac{1}{4\\pi|x|}$. Each is harmonic away from 0, and $\\Delta\\Phi = \\delta$ in the sense that $\\iint\\Phi(x - x_0)\\Delta\\varphi(x)\\,dA = \\varphi(x_0)$ for smooth $\\varphi$ vanishing outside a bounded set.

The **Green's function** of a domain $D$ is $G(x, x_0) = \\Phi(x - x_0) + H(x)$, where $H$ is harmonic in $D$ and chosen so that $G = 0$ for $x \\in \\partial D$. Applying Green's second identity to $u$ and $G$, with a small disk removed around $x_0$, gives the solution of $\\Delta u = 0$ in $D$, $u = h$ on $\\partial D$:

$$u(x_0) = \\oint_{\\partial D}h(x)\\frac{\\partial G}{\\partial n}(x, x_0)\\,ds.$$

Finding $H$ is a boundary value problem itself. For some domains there is a trick: put a mirror-image source outside $D$ that cancels $\\Phi$ on the boundary.

**Worked example.** Find the solution in the upper half-plane $y > 0$ with $u(x, 0) = h(x)$, and evaluate it for the step $h = 1$ for $x > 0$, $h = 0$ for $x < 0$.

For $x_0 = (x_0, y_0)$ let $x_0^* = (x_0, -y_0)$ be its reflection. Then

$$G(x, x_0) = \\frac{1}{2\\pi}\\left(\\ln|x - x_0| - \\ln|x - x_0^*|\\right)$$

vanishes on $y = 0$, since the two distances are equal there. The extra term is harmonic in the upper half-plane, since its singularity is in the lower half-plane. The outward normal on $y = 0$ points down, so $\\partial G/\\partial n = -\\partial G/\\partial y$. At $y = 0$,

$$\\frac{\\partial}{\\partial y}\\ln|x - x_0| = \\frac{y - y_0}{|x - x_0|^2} = \\frac{-y_0}{(\\xi - x_0)^2 + y_0^2},$$

writing $\\xi$ for the boundary coordinate. The image term gives the same with the opposite sign. So $-\\partial G/\\partial y = \\frac{y_0}{\\pi((\\xi - x_0)^2 + y_0^2)}$, and

$$u(x_0, y_0) = \\frac{y_0}{\\pi}\\int_{-\\infty}^\\infty\\frac{h(\\xi)}{(x_0 - \\xi)^2 + y_0^2}\\,d\\xi.$$

For the step, substitute $s = (\\xi - x_0)/y_0$:

$$u = \\frac1\\pi\\int_{-x_0/y_0}^\\infty\\frac{ds}{1 + s^2} = \\frac1\\pi\\left(\\frac\\pi2 + \\arctan\\frac{x_0}{y_0}\\right) = \\frac12 + \\frac1\\pi\\arctan\\frac{x_0}{y_0}.$$

Check: as $y_0 \\to 0^+$, this tends to 1 for $x_0 > 0$ and 0 for $x_0 < 0$. It is harmonic, since $\\arctan(x/y)$ is, up to a constant, the polar angle measured from the $y$-axis. On the $y$-axis $u = \\frac12$, the average of the two boundary values. The level curves are rays from the origin.

For the disk of radius $a$, the image of $x_0$ is the inverse point $x_0^* = a^2x_0/|x_0|^2$. On the circle, $|x - x_0^*| = \\frac{a}{|x_0|}|x - x_0|$, so $\\frac{1}{2\\pi}\\left(\\ln|x - x_0| - \\ln|x - x_0^*| - \\ln\\frac{|x_0|}{a}\\right)$ vanishes there. Computing its normal derivative recovers the Poisson kernel of the previous lesson.

In electrostatics, this is the classical method of images: a charge above a grounded conducting plane produces the same field above the plane as the charge and an opposite charge at its mirror image.`,
          resources: [
            ivrii('The sections on Green\'s functions and the method of images.'),
            mit18303('The lecture notes on Green\'s functions.'),
            wiki('Method_of_image_charges', 'Method of image charges', 'The physics version of the construction, with the plane and the sphere.'),
          ],
          exercises: [
            {
              slug: 'half-plane-kernel-properties',
              title: 'The half-plane kernel',
              prompt: `Show that $P_y(x) = \\frac{y}{\\pi(x^2 + y^2)}$ is harmonic in $y > 0$, has integral 1 over $x \\in \\mathbb{R}$ for each $y$, and concentrates at 0 as $y \\to 0^+$. Solve with $h(\\xi) = \\frac{1}{1 + \\xi^2}$ and show $u(x, y) = \\frac{1 + y}{x^2 + (1 + y)^2}$. Check that it is harmonic.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Convolution of two such kernels adds the $y$ values: $P_y * P_1 = P_{y+1}$.',
            },
            {
              slug: 'quarter-plane',
              title: 'Images in a quarter-plane',
              prompt: `Construct the Green's function of the quarter-plane $x > 0$, $y > 0$ using three image points. Check that it vanishes on both edges. Then write the Green's function for the half-plane with a Neumann condition $\\partial_yu = 0$ on $y = 0$, using an image of the same sign.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'disk-image',
              title: 'The disk from an image point',
              prompt: `Prove that $|x - x_0^*| = \\frac{a}{|x_0|}|x - x_0|$ for $|x| = a$, with $x_0^* = a^2x_0/|x_0|^2$. Then compute $\\partial G/\\partial n$ on the circle, and show that it equals the Poisson kernel $\\frac{a^2 - |x_0|^2}{2\\pi a|x - x_0|^2}$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'induced-charge',
              title: 'Induced charge on a plane',
              prompt: `A point charge $q$ sits at height $d$ above a grounded conducting plane $z = 0$. Using the three-dimensional image construction, find the potential for $z > 0$ and the surface charge density $\\sigma = -\\epsilon_0\\partial_z\\varphi$ on the plane. Show that the total induced charge is $-q$, by integrating over the plane in polar coordinates.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two properties define a Green\'s function for the Dirichlet problem?',
              answerOutline: 'It is the fundamental solution plus a function harmonic in $D$, and it vanishes on $\\partial D$.',
            },
            {
              question: 'Why is the image term harmonic in the domain?',
              answerOutline: 'Its singularity lies outside the domain.',
            },
            {
              question: 'What is the solution in the half-plane on the line $x = 0$ for step data?',
              answerOutline: '$\\frac12$, the average of the two boundary values, since $\\arctan 0 = 0$.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/dirac-delta-and-greens-functions'],
        },
      ],
      project: {
        slug: 'laplace-solver-validation',
        title: 'A Laplace solver validated four ways',
        description: `Write a finite-difference solver for Laplace's and Poisson's equations on a rectangle and on a disk (on a polar grid), and validate it with every exact result in this module: separated series, Poisson's formula, the mean value property and the maximum principle. Then use it on a problem of your choice, such as the potential in a capacitor with an odd-shaped electrode, or steady heat in a plate with a hole.`,
        deliverables: [
          'A solver using a sparse direct method, with an option for Jacobi or Gauss-Seidel iteration and a comparison of their speed',
          'Convergence tables against a separated series on the square and against Poisson\'s formula on the disk',
          'Numerical checks that the computed solution satisfies the discrete maximum principle and the mean value property approximately',
          'A Neumann problem solved with the compatibility condition imposed, and a demonstration of what happens when it fails',
          'Your application, with a figure of the level curves and a short interpretation',
        ],
        estimatedHours: 9,
      },
    },
    {
      slug: 'transforms-and-higher-dimensions',
      title: 'Fourier Transforms and Higher Dimensions',
      description:
        'Solve problems on unbounded domains with the Fourier transform, separate variables in circular and spherical domains to meet Bessel functions and Legendre polynomials, and compute solutions with stable numerical schemes.',
      lessons: [
        {
          slug: 'fourier-transform',
          title: 'The Fourier transform',
          summary:
            'On the whole line, Fourier series become integrals. Derivatives become multiplication, and the heat, wave and Laplace equations become ODEs in time or height.',
          estimatedMinutes: 120,
          objectives: [
            'Define the Fourier transform and state the inversion formula',
            'Use the derivative and convolution rules',
            'Compute the transform of a Gaussian',
            'Solve the heat equation and Laplace\'s equation in a half-plane by transforms',
          ],
          concepts: [
            'Fourier transform',
            'Inversion formula',
            'Derivative rule',
            'Convolution theorem',
            'Gaussian transform',
            'Plancherel\'s theorem',
          ],
          explanation: `For an integrable $f$ on $\\mathbb{R}$, define

$$\\hat f(\\xi) = \\int_{-\\infty}^\\infty f(x)e^{-i\\xi x}\\,dx, \\qquad f(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^\\infty\\hat f(\\xi)e^{i\\xi x}\\,d\\xi,$$

where the inversion formula holds, for example when $f$ is smooth and decays rapidly. Other books put the $2\\pi$ elsewhere, so always check the convention. The rules that make the transform useful are:

- **Derivatives:** $\\widehat{f'}(\\xi) = i\\xi\\hat f(\\xi)$, by integration by parts.
- **Convolution:** $\\widehat{f * g} = \\hat f\\,\\hat g$, where $(f * g)(x) = \\int f(x - y)g(y)\\,dy$.
- **Plancherel:** $\\int|f|^2\\,dx = \\frac{1}{2\\pi}\\int|\\hat f|^2\\,d\\xi$.

**Worked example.** Compute the transform of $g(x) = e^{-ax^2}$ with $a > 0$, and use it to solve the heat equation.

Differentiate under the integral sign:

$$\\hat g'(\\xi) = \\int(-ix)e^{-ax^2}e^{-i\\xi x}\\,dx = \\frac{i}{2a}\\int\\left(\\frac{d}{dx}e^{-ax^2}\\right)e^{-i\\xi x}\\,dx.$$

Integrating by parts moves the derivative onto $e^{-i\\xi x}$, which brings down $-(-i\\xi) = i\\xi$, so $\\hat g'(\\xi) = \\frac{i}{2a}\\cdot(i\\xi)\\hat g(\\xi) = -\\frac{\\xi}{2a}\\hat g(\\xi)$. This ODE has solution $\\hat g(\\xi) = \\hat g(0)e^{-\\xi^2/(4a)}$, and $\\hat g(0) = \\int e^{-ax^2}\\,dx = \\sqrt{\\pi/a}$. So

$$\\widehat{e^{-ax^2}}(\\xi) = \\sqrt{\\frac\\pi a}\\,e^{-\\xi^2/(4a)}.$$

A Gaussian transforms to a Gaussian, and a narrow one to a wide one.

Now transform $u_t = ku_{xx}$ in $x$. The derivative rule turns $u_{xx}$ into $-\\xi^2\\hat u$, so for each $\\xi$,

$$\\frac{d\\hat u}{dt} = -k\\xi^2\\hat u, \\qquad \\hat u(\\xi, t) = \\hat\\phi(\\xi)e^{-k\\xi^2t}.$$

By the convolution rule, $u = S(\\cdot, t) * \\phi$, where $\\hat S = e^{-k\\xi^2t}$. Using the Gaussian result with $a = 1/(4kt)$, the function whose transform is $e^{-k\\xi^2t}$ is

$$S(x, t) = \\frac{1}{\\sqrt{4\\pi kt}}e^{-x^2/(4kt)},$$

the heat kernel from module 3, now derived in three lines. The factor $e^{-k\\xi^2t}$ shows the smoothing directly: high frequencies are damped fastest.

**Laplace in a half-plane.** For $u_{xx} + u_{yy} = 0$ in $y > 0$ with $u(x, 0) = h(x)$ and $u$ bounded, transforming in $x$ gives $\\hat u_{yy} = \\xi^2\\hat u$. Boundedness selects $\\hat u = \\hat h(\\xi)e^{-|\\xi|y}$. The inverse transform of $e^{-|\\xi|y}$ is $\\frac{y}{\\pi(x^2 + y^2)}$, which is the half-plane Poisson kernel found earlier with images.

**Waves.** For $u_{tt} = c^2u_{xx}$, the transform gives $\\hat u_{tt} = -c^2\\xi^2\\hat u$, so $\\hat u = \\hat\\phi\\cos(c\\xi t) + \\hat\\psi\\frac{\\sin(c\\xi t)}{c\\xi}$. Inverting term by term gives d'Alembert's formula.`,
          resources: [
            ivrii('The chapter on the Fourier transform and its applications to PDEs.'),
            mit18303('The lecture notes on the Fourier transform and problems on infinite domains.'),
            wiki('Fourier_transform', 'Fourier transform', 'Tables of transforms, with a note on conventions; check the convention before using a table entry.'),
          ],
          exercises: [
            {
              slug: 'transform-table',
              title: 'Build a small table',
              prompt: `With this lesson's convention, compute the transforms of (a) $e^{-|x|}$; (b) the box $\\chi_{[-1,1]}$; (c) $xe^{-x^2}$, using the derivative rule; (d) $f(x - x_0)$ in terms of $\\hat f$. Use Plancherel with (b) to evaluate $\\int_{-\\infty}^\\infty\\frac{\\sin^2\\xi}{\\xi^2}\\,d\\xi$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'half-plane-by-transform',
              title: 'The half-plane by transform',
              prompt: `Show that the inverse transform of $e^{-|\\xi|y}$ is $\\frac{y}{\\pi(x^2 + y^2)}$ by computing the forward transform of the right side, or the inverse integral directly. Explain why the solution $\\hat h(\\xi)e^{|\\xi|y}$ must be excluded.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'advection-diffusion',
              title: 'Advection and diffusion',
              prompt: `Solve $u_t + vu_x = ku_{xx}$ on the line with $u(x, 0) = \\phi(x)$ by Fourier transform, and show that the result is the heat kernel solution shifted by $vt$. Check against the change of variables $y = x - vt$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fft-heat',
              title: 'Solve with the FFT',
              prompt: `On a periodic grid of 512 points on $[-20, 20)$, solve the heat equation with $\\phi(x) = e^{-x^2}$ and $k = 1$ by multiplying the FFT of $\\phi$ by $e^{-k\\xi^2t}$. Compare with the exact solution at $t = 1$ and $t = 10$. When does periodicity start to cause visible errors, and why?`,
              kind: 'coding',
              difficulty: 2,
              hint: 'Use numpy.fft.fftfreq to get the wavenumbers, multiplied by $2\\pi$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the transform do to a derivative?',
              answerOutline: 'It multiplies by $i\\xi$, so constant-coefficient PDEs become ODEs in the remaining variable.',
            },
            {
              question: 'Why does the heat kernel come out as a Gaussian?',
              answerOutline: 'The transformed solution operator is $e^{-k\\xi^2t}$, a Gaussian in $\\xi$, and Gaussians transform to Gaussians.',
            },
            {
              question: 'In the half-plane problem, what selects $e^{-|\\xi|y}$?',
              answerOutline: 'Boundedness as $y \\to \\infty$ rules out the growing exponential.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
        },
        {
          slug: 'circular-domains-and-bessel',
          title: 'Circular domains and Bessel functions',
          summary:
            'Separating variables on a disk produces Bessel\'s equation. Its zeros set the frequencies of a drum and the decay rates of heat in a cylinder.',
          estimatedMinutes: 120,
          objectives: [
            'Separate the wave and heat equations in polar coordinates',
            'Recognise Bessel\'s equation and the regular solution $J_n$',
            'Compute drum frequencies from Bessel zeros',
            'Expand data in Fourier-Bessel series using the weighted orthogonality',
          ],
          concepts: [
            'Laplacian in polar coordinates',
            'Bessel\'s equation',
            'Bessel functions $J_n$',
            'Zeros $z_{n,m}$',
            'Weighted orthogonality with weight $r$',
            'Fourier-Bessel series',
          ],
          explanation: `On the disk $r < a$, the eigenvalue problem $-\\Delta v = \\lambda v$ with $v = 0$ on $r = a$ is the spatial part of both the heat and wave equations. In polar coordinates, try $v = R(r)\\Theta(\\theta)$. Periodicity in $\\theta$ gives $\\Theta = \\cos n\\theta$ or $\\sin n\\theta$ with $n = 0, 1, 2, \\dots$, and then

$$R'' + \\frac1rR' + \\left(\\lambda - \\frac{n^2}{r^2}\\right)R = 0.$$

With $s = \\sqrt\\lambda\\,r$ this is **Bessel's equation** of order $n$, $s^2R'' + sR' + (s^2 - n^2)R = 0$. Its solution bounded at $s = 0$ is the Bessel function $J_n(s)$. The other solution, $Y_n$, blows up at 0 and is excluded on a full disk. The boundary condition gives $J_n(\\sqrt\\lambda\\,a) = 0$, so

$$\\lambda_{n,m} = \\left(\\frac{z_{n,m}}{a}\\right)^2, \\qquad v_{n,m} = J_n\\left(\\frac{z_{n,m}r}{a}\\right)\\begin{Bmatrix}\\cos n\\theta \\\\ \\sin n\\theta\\end{Bmatrix},$$

where $z_{n,m}$ is the $m$th positive zero of $J_n$. These are tabulated, and SciPy computes them. For example $z_{0,1} \\approx 2.4048$, $z_{1,1} \\approx 3.8317$, $z_{2,1} \\approx 5.1356$ and $z_{0,2} \\approx 5.5201$.

For the radial equation the natural weight is $r$, from the area element. Sturm-Liouville theory gives

$$\\int_0^aJ_n\\left(\\frac{z_{n,m}r}{a}\\right)J_n\\left(\\frac{z_{n,l}r}{a}\\right)r\\,dr = 0 \\quad (m \\neq l), \\qquad = \\frac{a^2}{2}J_{n+1}(z_{n,m})^2 \\quad (m = l).$$

**A drum.** A membrane with wave speed $c$ vibrates at frequencies $\\omega_{n,m} = cz_{n,m}/a$. Their ratios to the fundamental are $1, 1.593, 2.136, 2.295, \\dots$, not integers. That is why a drum, unlike a string, has no clear pitch.

**Worked example.** A long cylinder of radius 1 with $k = 1$ starts at temperature 1 and has its surface held at 0. Find the temperature.

The data are radial, so only $n = 0$ appears:

$$u(r, t) = \\sum_{m=1}^\\infty A_mJ_0(z_mr)e^{-z_m^2t}, \\qquad z_m = z_{0,m}.$$

At $t = 0$ we need $1 = \\sum A_mJ_0(z_mr)$. Using the orthogonality,

$$A_m = \\frac{\\int_0^1J_0(z_mr)\\,r\\,dr}{\\frac12J_1(z_m)^2}.$$

The identity $\\frac{d}{ds}(sJ_1(s)) = sJ_0(s)$ gives $\\int_0^1J_0(z_mr)r\\,dr = \\frac{J_1(z_m)}{z_m}$. So

$$A_m = \\frac{2}{z_mJ_1(z_m)}.$$

With $z_1 \\approx 2.4048$ and $J_1(z_1) \\approx 0.5191$, $A_1 \\approx 1.602$. The centre temperature is $\\sum A_me^{-z_m^2t}$, and for $t \\geq 0.2$ the first term alone, $1.602e^{-5.783t}$, is accurate to better than 1%. Compare a slab of half-width 1, whose slowest decay rate is $(\\pi/2)^2 \\approx 2.47$. The cylinder cools faster, since heat leaves in every radial direction.`,
          resources: [
            ivrii('The sections on separation of variables in polar coordinates and Bessel functions.'),
            dlmf('10', 'Bessel Functions', 'The reference for identities, zeros and asymptotics.'),
            wiki('Vibrations_of_a_circular_membrane', 'Vibrations of a circular membrane', 'Mode shapes with animations, and the frequency ratios.'),
          ],
          exercises: [
            {
              slug: 'bessel-series-coefficient',
              title: 'A Fourier-Bessel coefficient',
              prompt: `Verify the identity $\\frac{d}{ds}(sJ_1(s)) = sJ_0(s)$ from the series of $J_0$ and $J_1$, and use it to derive $A_m = 2/(z_mJ_1(z_m))$. Compute $A_1, A_2, A_3$ numerically, and evaluate the centre temperature at $t = 0.1$ with five terms.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'drum-modes',
              title: 'Drum frequencies',
              prompt: `A drum of radius 0.3 m has wave speed $c = 100$ m/s. List the first six distinct frequencies in Hz, and the ratio of each to the fundamental. Sketch the nodal lines of the modes $(n, m) = (0, 2)$, $(1, 1)$ and $(2, 1)$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'struck-drum',
              title: 'A struck drum',
              prompt: `A unit drum with $c = 1$ starts flat, with velocity $\\psi = 1 - r^2$. Find the solution as a Fourier-Bessel series, using $\\int_0^1(1 - r^2)J_0(zr)r\\,dr = 2J_2(z)/z^2$. Check that identity numerically for $z = z_1$ and compute the first three coefficients.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'bessel-orthogonality-proof',
              title: 'Prove the orthogonality',
              prompt: `Write the radial equation in Sturm-Liouville form, $-(rR')' + \\frac{n^2}{r}R = \\lambda rR$. Explain why it is singular at $r = 0$, and show that the boundary term in Lagrange's identity still vanishes at 0 for solutions bounded there. Deduce the orthogonality relation.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $Y_n$ excluded on a full disk?',
              answerOutline: 'It is unbounded at $r = 0$, and the physical solution is bounded there.',
            },
            {
              question: 'What weight appears in Fourier-Bessel orthogonality, and why?',
              answerOutline: 'The weight $r$, which comes from the area element $r\\,dr\\,d\\theta$.',
            },
            {
              question: 'Why does a drum not have harmonic overtones?',
              answerOutline: 'Its frequencies are proportional to Bessel zeros, which are not integer multiples of the first.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/bessel-functions-and-cylindrical-problems'],
        },
        {
          slug: 'spherical-domains',
          title: 'Spherical domains and Legendre polynomials',
          summary:
            'In a ball, axially symmetric harmonic functions are sums of $r^\\ell P_\\ell(\\cos\\theta)$, and radial problems reduce to one dimension.',
          estimatedMinutes: 110,
          objectives: [
            'Separate Laplace\'s equation in spherical coordinates for axially symmetric problems',
            'Expand boundary data in Legendre polynomials',
            'Solve interior and exterior problems on a sphere',
            'Reduce radial heat and wave problems in a ball with $v = ru$',
          ],
          concepts: [
            'Spherical Laplacian',
            'Axial symmetry',
            'Legendre polynomials $P_\\ell$',
            'Interior and exterior solutions',
            'Radial reduction $v = ru$',
            'Spherical harmonics (statement)',
          ],
          explanation: `In spherical coordinates, with $\\theta$ the angle from the $z$-axis, a function independent of the azimuth $\\phi$ satisfies $\\Delta u = 0$ if

$$\\frac{1}{r^2}(r^2u_r)_r + \\frac{1}{r^2\\sin\\theta}(\\sin\\theta\\,u_\\theta)_\\theta = 0.$$

Try $u = R(r)\\Theta(\\theta)$, and set $x = \\cos\\theta$. The angular equation becomes the Legendre equation $((1 - x^2)\\Theta')' + \\lambda\\Theta = 0$ on $[-1, 1]$. Its only solutions bounded at both poles occur for $\\lambda = \\ell(\\ell + 1)$, and they are the **Legendre polynomials** $P_\\ell(x)$: $P_0 = 1$, $P_1 = x$, $P_2 = \\frac12(3x^2 - 1)$, $P_3 = \\frac12(5x^3 - 3x)$. The radial equation $(r^2R')' = \\ell(\\ell + 1)R$ has solutions $r^\\ell$ and $r^{-\\ell-1}$. So

$$u = \\sum_{\\ell=0}^\\infty\\left(A_\\ell r^\\ell + B_\\ell r^{-\\ell-1}\\right)P_\\ell(\\cos\\theta).$$

Inside a ball, boundedness at the origin removes the $B_\\ell$. Outside, decay at infinity removes the $A_\\ell$. The Legendre polynomials are orthogonal on $[-1, 1]$ with $\\int_{-1}^1P_\\ell^2\\,dx = \\frac{2}{2\\ell + 1}$, so boundary data $u(a, \\theta) = f(\\cos\\theta)$ give

$$A_\\ell a^\\ell = \\frac{2\\ell + 1}{2}\\int_{-1}^1f(x)P_\\ell(x)\\,dx.$$

Without axial symmetry, the angular functions are the **spherical harmonics** $Y_\\ell^m(\\theta, \\phi)$, with the same radial factors.

**Worked example.** Find the harmonic function in the ball $r < a$ with $u(a, \\theta) = \\cos^2\\theta$.

Since the data are a polynomial in $x = \\cos\\theta$, expand directly instead of integrating. From $P_2 = \\frac12(3x^2 - 1)$, we get $x^2 = \\frac13 + \\frac23P_2(x)$. So $A_0 = \\frac13$, $A_2a^2 = \\frac23$, and all others vanish:

$$u(r, \\theta) = \\frac13 + \\frac23\\left(\\frac ra\\right)^2P_2(\\cos\\theta).$$

In Cartesian coordinates, $r^2P_2(\\cos\\theta) = \\frac12(3z^2 - r^2)$, so

$$u = \\frac13 + \\frac{1}{3a^2}(3z^2 - x^2 - y^2 - z^2) = \\frac13 + \\frac{2z^2 - x^2 - y^2}{3a^2}.$$

Check: $\\Delta(2z^2 - x^2 - y^2) = 4 - 2 - 2 = 0$. On the sphere, with $z = a\\cos\\theta$ and $x^2 + y^2 = a^2\\sin^2\\theta$, $u = \\frac13 + \\frac13(2\\cos^2\\theta - \\sin^2\\theta) = \\cos^2\\theta$. At the centre $u = \\frac13$, which is the average of $\\cos^2\\theta$ over the sphere, the mean value property in three dimensions.

**Radial problems.** For the heat equation in a ball with radial data, $\\Delta u = \\frac1r(ru)_{rr}$, so $v = ru$ satisfies $v_t = kv_{rr}$, a one-dimensional problem on $(0, a)$ with $v(0, t) = 0$. A ball of radius 1 starting at 1 with surface at 0 has $v(r, 0) = r$, and the sine series of $r$ gives

$$u(r, t) = \\sum_{n=1}^\\infty\\frac{2(-1)^{n+1}}{n\\pi}e^{-n^2\\pi^2kt}\\frac{\\sin n\\pi r}{r}.$$`,
          resources: [
            ivrii('The sections on separation of variables in spherical coordinates and Legendre polynomials.'),
            dlmf('14', 'Legendre and Related Functions', 'Identities, normalisations and recurrences for Legendre functions.'),
          ],
          exercises: [
            {
              slug: 'legendre-data',
              title: 'Expand boundary data',
              prompt: `Solve $\\Delta u = 0$ in the unit ball with (a) $u = \\cos\\theta$; (b) $u = \\cos^3\\theta$; (c) $u = 1$ for $0 \\leq \\theta < \\pi/2$ and $0$ for $\\pi/2 < \\theta \\leq \\pi$, giving the first four non-zero terms. Check (a) and (b) in Cartesian coordinates.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'sphere-in-field',
              title: 'A grounded sphere in a uniform field',
              prompt: `Outside a grounded conducting sphere of radius $a$, the potential satisfies $\\Delta\\varphi = 0$, $\\varphi = 0$ on $r = a$, and $\\varphi \\to -E_0z$ at infinity. Show that $\\varphi = -E_0\\left(r - \\frac{a^3}{r^2}\\right)\\cos\\theta$. Find the surface charge density, and the points where the field at the surface is strongest.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cooling-ball',
              title: 'Cooling a ball',
              prompt: `For the radial heat example, derive the series from the one-dimensional problem for $v = ru$. Find the centre temperature $u(0, t)$ as a series, and the time at which it falls to $\\frac12$ for $k = 1$. Compare the slowest decay rate with those of the cylinder and slab of the same radius.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'As $r \\to 0$, $\\sin(n\\pi r)/r \\to n\\pi$.',
            },
            {
              slug: 'legendre-orthogonality',
              title: 'Legendre orthogonality and norms',
              prompt: `Prove that $\\int_{-1}^1P_\\ell P_m\\,dx = 0$ for $\\ell \\neq m$ from the Sturm-Liouville form, explaining why there is no boundary term although there are no boundary conditions. Verify $\\int_{-1}^1P_\\ell^2 = \\frac{2}{2\\ell + 1}$ for $\\ell = 0, 1, 2, 3$ by direct integration.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are only the Legendre polynomials allowed as angular functions?',
              answerOutline: 'Other solutions of the Legendre equation blow up at one of the poles, $x = \\pm 1$.',
            },
            {
              question: 'Which radial factors appear inside a ball, and which outside?',
              answerOutline: '$r^\\ell$ inside, for boundedness at 0. $r^{-\\ell-1}$ outside, for decay at infinity.',
            },
            {
              question: 'Why does $v = ru$ simplify radial problems?',
              answerOutline: 'The radial Laplacian equals $\\frac1r(ru)_{rr}$, so $v$ satisfies the one-dimensional equation.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/legendre-polynomials-and-spherical-harmonics'],
        },
        {
          slug: 'numerical-methods',
          title: 'Numerical methods',
          summary:
            'Finite differences for the heat, wave and Laplace equations, with von Neumann stability analysis to explain why some step sizes fail.',
          estimatedMinutes: 120,
          objectives: [
            'Derive explicit and implicit difference schemes for the heat equation',
            'Carry out a von Neumann stability analysis',
            'State and explain the CFL condition for the wave equation',
            'Solve the discrete Laplace equation by direct and iterative methods',
          ],
          concepts: [
            'Finite differences',
            'Truncation error',
            'Von Neumann analysis',
            'Amplification factor',
            'Crank-Nicolson scheme',
            'CFL condition',
            'Jacobi iteration',
          ],
          explanation: `Replace derivatives by differences on a grid $x_j = j\\Delta x$, $t_n = n\\Delta t$, with $u_j^n \\approx u(x_j, t_n)$. Taylor's theorem gives $u_{xx} = \\frac{u_{j+1} - 2u_j + u_{j-1}}{\\Delta x^2} + O(\\Delta x^2)$.

The explicit scheme for $u_t = ku_{xx}$, often called FTCS (forward time, centred space), is

$$u_j^{n+1} = u_j^n + s\\left(u_{j+1}^n - 2u_j^n + u_{j-1}^n\\right), \\qquad s = \\frac{k\\Delta t}{\\Delta x^2}.$$

Its truncation error is $O(\\Delta t + \\Delta x^2)$. But accuracy of each step is not enough: errors must not grow. By the **Lax equivalence theorem**, for a consistent linear scheme, convergence is equivalent to stability.

**Worked example.** Find the values of $s$ for which FTCS is stable.

**Von Neumann analysis** tests one Fourier mode at a time. Substitute $u_j^n = \\rho^ne^{ij\\beta}$, where $\\beta = \\xi\\Delta x$ ranges over $[-\\pi, \\pi]$. Dividing by $\\rho^ne^{ij\\beta}$,

$$\\rho = 1 + s(e^{i\\beta} - 2 + e^{-i\\beta}) = 1 + 2s(\\cos\\beta - 1) = 1 - 4s\\sin^2\\frac\\beta2.$$

The **amplification factor** $\\rho$ is real, and it ranges over $[1 - 4s, 1]$. Stability needs $|\\rho| \\leq 1$ for every mode, which requires $1 - 4s \\geq -1$, so

$$s = \\frac{k\\Delta t}{\\Delta x^2} \\leq \\frac12.$$

The worst mode is $\\beta = \\pi$, the sawtooth $(-1)^j$ on the grid. If $s = 0.6$, that mode is multiplied by $1 - 2.4 = -1.4$ at each step. Rounding errors seed it, and after 100 steps it has grown by a factor of about $1.4^{100} \\approx 4 \\times 10^{14}$. That is the alternating explosion you saw in the heat lesson of \`differential-equations\`.

The condition is severe: halving $\\Delta x$ forces $\\Delta t$ to quarter. The **Crank-Nicolson** scheme averages the spatial difference between time levels $n$ and $n + 1$. Its factor is

$$\\rho = \\frac{1 - 2s\\sin^2(\\beta/2)}{1 + 2s\\sin^2(\\beta/2)},$$

which satisfies $|\\rho| \\leq 1$ for every $s > 0$. It is unconditionally stable and second-order in time, at the price of solving a tridiagonal system each step, which costs $O(N)$ operations.

**Waves.** The leapfrog scheme $u_j^{n+1} - 2u_j^n + u_j^{n-1} = C^2(u_{j+1}^n - 2u_j^n + u_{j-1}^n)$ with $C = c\\Delta t/\\Delta x$ has $\\rho^2 - 2(1 - 2C^2\\sin^2(\\beta/2))\\rho + 1 = 0$. Both roots lie on the unit circle exactly when $C \\leq 1$. This is the **CFL condition**. It says the numerical domain of dependence must contain the true one: information must not travel more than one grid cell per step.

**Laplace.** The five-point scheme sets each interior value to the average of its four neighbours, a discrete mean value property, which gives a discrete maximum principle. The resulting sparse linear system can be solved directly, or by **Jacobi iteration**, which repeats the averaging. Jacobi converges, but slowly: the number of iterations grows like $N^2$ on an $N \\times N$ grid, which is why multigrid and conjugate gradient methods exist.`,
          resources: [
            fdmBook('The chapters on diffusion and wave equations, including stability analysis.'),
            wiki('Von_Neumann_stability_analysis', 'Von Neumann stability analysis', 'The method with the FTCS example worked out.'),
            wiki('Courant%E2%80%93Friedrichs%E2%80%93Lewy_condition', 'Courant-Friedrichs-Lewy condition', 'The CFL condition and its interpretation in terms of domains of dependence.'),
          ],
          exercises: [
            {
              slug: 'ftcs-stability-demo',
              title: 'Watch the stability limit',
              prompt: `Solve $u_t = u_{xx}$ on $(0, 1)$ with zero boundary values and $u(x, 0) = \\sin\\pi x$, using FTCS with 50 intervals, for $s = 0.45, 0.5, 0.55$ up to $t = 0.5$. Compare each with the exact solution. For $s = 0.55$, measure the growth factor of the error per step and compare with $|1 - 4s|$.`,
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'crank-nicolson-factor',
              title: 'Crank-Nicolson',
              prompt: `Derive the amplification factor of Crank-Nicolson. Show that $|\\rho| < 1$ for all $s > 0$ and $\\beta \\neq 0$, but that $\\rho \\to -1$ for the highest mode as $s \\to \\infty$. Explain the oscillations this causes for large time steps with discontinuous data, and confirm them numerically.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'leapfrog-cfl',
              title: 'Leapfrog and the CFL condition',
              prompt: `Derive the characteristic equation for the leapfrog scheme, and prove that both roots have modulus 1 for all $\\beta$ if and only if $C \\leq 1$. Then run the scheme with $C = 0.9, 1, 1.05$ on a smooth pulse and describe the results. At $C = 1$, show that the scheme reproduces d'Alembert's formula exactly on the grid.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'jacobi-iterations',
              title: 'How slow is Jacobi?',
              prompt: `For the five-point Laplacian on an $N \\times N$ interior grid of the unit square, the Jacobi iteration matrix has spectral radius $\\cos(\\pi/(N + 1))$. Show that the number of iterations to reduce the error by $10^{-6}$ is about $\\frac{2\\ln 10^6}{\\pi^2}(N + 1)^2$, and check this against experiments with $N = 20, 40, 80$.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the amplification factor in von Neumann analysis?',
              answerOutline: 'The factor $\\rho(\\beta)$ by which a Fourier mode is multiplied in one step. Stability needs $|\\rho| \\leq 1$ for all $\\beta$.',
            },
            {
              question: 'What is the stability limit for FTCS, and which mode fails first?',
              answerOutline: '$s \\leq \\frac12$. The sawtooth mode $\\beta = \\pi$ fails first.',
            },
            {
              question: 'What does the CFL condition mean physically?',
              answerOutline: 'The numerical domain of dependence must contain the true one, so $c\\Delta t \\leq \\Delta x$.',
            },
          ],
        },
      ],
      project: {
        slug: 'drum-and-cylinder',
        title: 'Hearing a drum',
        description: `Compute the vibrations of a circular drum two ways, by Fourier-Bessel series and by a finite-difference solver on a Cartesian grid with the boundary approximated by grid points, and compare their frequencies. Then synthesise a short sound file of the drum being struck at the centre and off-centre, and explain the difference you hear.`,
        deliverables: [
          'A Bessel-series solution for a given initial velocity, with coefficients computed from the weighted orthogonality',
          'A finite-difference solver on a square grid with the disk boundary, stable under the CFL condition',
          'A table of the first eight frequencies from both methods, with relative differences and a discussion of grid effects at the boundary',
          'Two audio files, struck at the centre and at half the radius, generated from the modal sums, with the modes each excites',
          'A one-page explanation of why the drum has no clear pitch',
        ],
        estimatedHours: 9,
        stretchGoals: ['Repeat for a square drum and compare the spectra'],
      },
    },
  ],
  capstone: {
    slug: 'validated-pde-toolkit',
    title: 'A validated PDE toolkit with an application',
    description: `Build a small, tested Python library that solves the heat, wave and Laplace equations in one and two dimensions by both series and finite-difference methods, and use it on one real problem of your choice. Examples are cooling of a cylindrical pipe wall, the tones of a rectangular or circular plate, ground temperature under seasonal forcing, or the potential in an electrostatic lens. The point of the project is trust: every numerical method is checked against an exact solution, and every claim in the application is backed by a convergence study.

This course has no machine problems, so this project is its main independent work. Write it as a repository someone else could install and use.`,
    deliverables: [
      'Series solvers for the interval with Dirichlet, Neumann and Robin conditions (Robin eigenvalues found numerically), and for the disk and the ball in the radially symmetric case',
      'Finite-difference solvers: FTCS and Crank-Nicolson for heat, leapfrog for waves, and a sparse five-point solver for Laplace and Poisson',
      'A test suite that compares each numerical solver with an exact solution and checks the observed order of convergence',
      'Checks of qualitative theorems: the maximum principle, energy conservation for waves, the mean value property and the Neumann compatibility condition',
      'A characteristics solver for a scalar conservation law that detects the breaking time and compares it with the formula',
      'The application: a clear problem statement, a model derived from conservation laws, results with error bars from convergence studies, and a discussion of what the model leaves out',
      'Documentation with a worked example for each solver',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Add a spectral (FFT) solver for periodic problems and compare its accuracy and speed with finite differences',
      'Add a two-dimensional heat solver with an alternating-direction implicit scheme',
    ],
  },
  masteryChecklist: [
    'I can derive the heat, wave and transport equations from conservation laws and choose sensible boundary conditions',
    'I can solve first-order equations by characteristics, and find breaking times and shock speeds for simple conservation laws',
    'I can classify second-order equations and explain what data each type needs',
    'I can solve the wave equation by d\'Alembert\'s formula, with reflections and sources, and prove energy conservation and finite speed',
    'I can prove the maximum principle for the heat equation, use the heat kernel, and explain why the backward problem is ill-posed',
    'I can solve problems on intervals by separation of variables with any symmetric boundary conditions, and state what the series converges to',
    'I can prove the mean value property and use Poisson\'s formula, Green\'s identities and Green\'s functions for Laplace\'s equation',
    'I can use the Fourier transform, Bessel functions and Legendre polynomials, and write stable finite-difference schemes',
  ],
});
