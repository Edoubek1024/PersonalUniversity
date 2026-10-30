import { defineSubject } from '../define';

export default defineSubject({
  id: 'computational-physics',
  title: 'Computational Physics',
  category: 'physics',
  tagline:
    'Numerical methods as a physicist uses them: floating point, integration and root finding, ODE integrators, Monte Carlo, PDE solvers, spectral methods and N-body simulation, all validated against analytic results.',
  description: `Most physical systems worth studying cannot be solved with pen and paper: three bodies under gravity, a turbulent fluid, a magnet near its critical point, a protein in water. Computational physics is the third pillar beside theory and experiment, and it is a discipline with its own rules. A simulation is only as good as its numerical method, its error control and its validation, and this subject teaches all three. It is the canonical home in this curriculum for numerical integration, ODE solvers, Monte Carlo methods and the FFT in practice; the mathematics behind them lives in math-methods and probability-statistics, and this subject turns it into working, trustworthy code.

The approach is hands-on and Python-based (NumPy, SciPy, Matplotlib, with Numba where speed matters). Every method is derived, implemented from scratch at least once, compared with the library routine, and then tested on a problem with a known answer: you will measure convergence orders, check conservation laws, and reproduce analytic results before trusting any new output. The modules follow the classic structure of Mark Newman's *Computational Physics* (sample chapters free online): numerics and floating point, calculus and linear algebra, ODEs, Monte Carlo, PDEs, Fourier methods, N-body and molecular dynamics, and finally reproducibility and performance.

Other free sources are Morten Hjorth-Jensen's open lecture notes and code (University of Oslo / MSU), Alex Gezerlis's *Numerical Methods in Physics with Python* companion site, MIT 18.330 and 18.085, the Scientific Python Lecture Notes and the official library documentation. By the end you should be able to take a physical problem, choose and implement an appropriate method, quantify its numerical error and defend the result.`,
  difficulty: 'advanced',
  estimatedHours: 80,
  prerequisites: ['programming-fundamentals', 'classical-mechanics', 'math-methods'],
  recommendedBackground: [
    'Fluent Python including functions, NumPy arrays and plotting',
    'Calculus, linear algebra and ODEs at the level of math-methods',
    'Newtonian and Lagrangian mechanics; some statistical mechanics helps for the Monte Carlo module',
  ],
  tags: ['numerical methods', 'simulation', 'python', 'numpy', 'scipy', 'monte carlo', 'ODE', 'PDE', 'FFT', 'n-body'],
  core: true,
  modules: [
    {
      slug: 'scientific-python-and-numerics',
      title: 'Scientific Python and the Nature of Numerical Error',
      description:
        'The scientific Python stack, vectorised array programming, floating-point arithmetic, and the two great sources of numerical error: rounding and truncation.',
      lessons: [
        {
          slug: 'numpy-and-vectorised-computing',
          title: 'NumPy, vectorisation and plotting',
          summary:
            'Arrays as the fundamental data structure of numerical physics, broadcasting and vectorisation for speed, and Matplotlib for the figures every computation must end with.',
          estimatedMinutes: 150,
          objectives: [
            'Create, index, slice and reshape NumPy arrays and understand views versus copies',
            'Replace Python loops with vectorised expressions and broadcasting, and measure the speed-up',
            'Use NumPy universal functions, reductions and boolean masks on physical data',
            'Produce clear line, contour, image and quiver plots and simple animations with Matplotlib',
            'Organise numerical code into small tested functions rather than monolithic scripts',
          ],
          concepts: [
            'ndarray: dtype, shape, strides',
            'Views versus copies',
            'Vectorisation and universal functions',
            'Broadcasting rules',
            'Reductions along axes (sum, mean, max)',
            'Boolean masking and fancy indexing',
            'Matplotlib figure/axes API',
            'FuncAnimation for time-dependent results',
          ],
          explanation: `Numerical physics is mostly arithmetic on large arrays of numbers: positions of particles, field values on a grid, samples from a distribution. Pure Python loops over such arrays are slow (each operation goes through the interpreter), whereas a **NumPy** array is a contiguous block of machine numbers with a fixed **dtype**, and operations on whole arrays run in compiled code. Writing \`a * b + c\` on million-element arrays is typically 50-100 times faster than the equivalent loop. This style, **vectorisation**, is the first skill of computational physics in Python.

Two features make it powerful. **Broadcasting** lets arrays of different shapes combine: a column of shape (N, 1) minus a row of shape (1, N) gives the full N×N matrix of pairwise differences, which is how you compute all particle separations in one line. **Reductions** (\`sum\`, \`mean\`, \`max\` with an \`axis\` argument) collapse dimensions, and **boolean masks** select elements by condition (\`E[E > 0]\`). Know also that slicing returns a **view** sharing memory with the original; modifying it modifies the parent, a classic source of bugs, so use \`.copy()\` when you need independence.

Every computation ends in a figure, and **Matplotlib**'s object-oriented interface (\`fig, ax = plt.subplots()\`) gives full control: label axes with units, use log scales where quantities span decades, use \`contourf\`/\`imshow\` for fields and \`quiver\`/\`streamplot\` for vector fields, and \`FuncAnimation\` for anything time-dependent. A plot is also your first debugging tool: plotting an intermediate array catches more errors than reading code.

Finally, structure. Write small functions with clear inputs and outputs (a force function, an integrator step, an energy diagnostic), test each against a case you can do by hand, and keep parameters out of the function bodies. This discipline pays off in every later module.

Work through the Scientific Python Lectures chapters on NumPy and Matplotlib, the NumPy absolute-beginners guide and broadcasting page, and Newman's chapter 3 (graphics and visualisation, free sample). Then do the exercises, timing each loop against its vectorised version.`,
          resources: [
            {
              title: 'Scientific Python Lectures — NumPy: creating and manipulating numerical data',
              url: 'https://lectures.scientific-python.org/intro/numpy/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Scientific Python',
              note: 'Includes exercises on broadcasting and fancy indexing; read alongside the Matplotlib chapter.',
              primary: true,
            },
            {
              title: 'NumPy — Broadcasting',
              url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
            },
            {
              title: 'Computational Physics (Newman) — book site with free sample chapters and programs',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Chapters 2-3 (Python programming, graphics) and several later chapters are free; the full book is paid. Used throughout this subject.',
            },
            {
              title: 'Matplotlib — Animations using Matplotlib',
              url: 'https://matplotlib.org/stable/users/explain/animations/animations.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Matplotlib',
            },
          ],
          exercises: [
            {
              slug: 'vectorise-pairwise-distances',
              title: 'Vectorise pairwise distances',
              prompt:
                'For $N$ random points in 3D, compute the $N\\times N$ matrix of distances (a) with a double Python loop, (b) with broadcasting, (c) with `scipy.spatial.distance.cdist`. Verify all three agree to $10^{-12}$, then time them for $N = 100, 500, 2000$ and plot time against $N$ on log-log axes. Report the speed-up of (b) over (a) and explain the memory cost of (b) for large $N$.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'field-plots',
              title: 'Plot the field of two charges',
              prompt:
                'On a $200\\times200$ grid, compute the electric potential and field of a dipole ($+q$ at $(0.5, 0)$, $-q$ at $(-0.5, 0)$) using only vectorised NumPy. Produce a figure with filled potential contours (with a diverging colour map and a colour bar), field lines with `streamplot`, and a log-scaled field magnitude panel. Check numerically that $\\mathbf{E} = -\\nabla\\phi$ using `numpy.gradient`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'views-and-copies',
              title: 'Views, copies and a silent bug',
              prompt:
                'Write a function that "normalises" a slice of an array in place and show that it silently modifies the parent array. Fix it with `.copy()`. Then use `numpy.shares_memory` to test which of the following produce views: basic slicing, reshape, transpose, fancy indexing, boolean masking. Summarise the rules in a table.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is vectorised NumPy code so much faster than a Python loop?',
              answerOutline:
                'Operations run in compiled loops over contiguous typed memory, avoiding per-element interpreter overhead and dynamic typing.',
            },
            {
              question: 'State the broadcasting rule.',
              answerOutline:
                'Align shapes from the right; dimensions are compatible if equal or one of them is 1; size-1 dimensions are stretched virtually without copying.',
            },
            {
              question: 'When does slicing return a view and why does it matter?',
              answerOutline:
                'Basic slicing (start:stop:step) returns a view sharing memory; writing to it changes the original. Fancy/boolean indexing returns a copy.',
            },
          ],
        },
        {
          slug: 'floating-point-and-rounding-error',
          title: 'Floating-point arithmetic and rounding error',
          summary:
            'How computers represent real numbers (IEEE 754), machine epsilon, overflow and underflow, catastrophic cancellation, and how to rearrange calculations to avoid losing precision.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the IEEE 754 double-precision format and compute machine epsilon',
            'Explain overflow, underflow, NaN and inf, and work in log space where necessary',
            'Identify catastrophic cancellation and rewrite formulas to avoid it',
            'Estimate the accumulated rounding error of a sum and use compensated (Kahan) summation',
            'Never test floats for exact equality; use tolerances appropriate to the problem',
          ],
          concepts: [
            'IEEE 754: sign, exponent, mantissa (53-bit significand)',
            'Machine epsilon $\\epsilon \\approx 2.2\\times10^{-16}$',
            'Relative versus absolute error',
            'Overflow, underflow, subnormals, inf and NaN',
            'Catastrophic cancellation',
            'Error accumulation in sums ($\\sim\\sqrt N\\epsilon$ random, $N\\epsilon$ worst)',
            'Kahan compensated summation',
            'Log-sum-exp trick',
          ],
          explanation: `A double-precision floating-point number stores a sign, an 11-bit exponent and a 52-bit fraction (53 significant bits), representing $\\pm m\\times2^e$. This gives about 16 significant decimal digits and a range up to about $10^{308}$. The key number is **machine epsilon** $\\epsilon = 2^{-52} \\approx 2.2\\times10^{-16}$, the gap between 1 and the next representable number: every arithmetic operation can introduce a *relative* error of about $\\epsilon/2$. Numbers like 0.1 are not representable exactly, which is why \`0.1 + 0.2 == 0.3\` is \`False\`. Never compare floats with \`==\`; use \`numpy.isclose\` with a tolerance justified by the problem.

Rounding error is usually harmless because it is relative and tiny. It becomes catastrophic in **subtraction of nearly equal numbers**: if $a$ and $b$ agree in their first 12 digits, $a - b$ has only about 4 correct digits left. This **catastrophic cancellation** ruins the naive quadratic formula when $b^2 \\gg 4ac$, the evaluation of $1 - \\cos x$ for small $x$, and finite-difference derivatives with too small a step (next lesson). The cure is algebraic rearrangement: $x_1 = (-b - \\operatorname{sign}(b)\\sqrt{b^2 - 4ac})/2a$, $x_2 = c/(ax_1)$; $1 - \\cos x = 2\\sin^2(x/2)$; use \`numpy.expm1\` and \`log1p\` for $e^x - 1$ and $\\ln(1 + x)$.

At the extremes, numbers **overflow** to \`inf\` or **underflow** to zero. Products of many probabilities underflow, which is why statistics works with log-likelihoods, and sums of exponentials such as partition functions overflow unless you use the **log-sum-exp** trick $\\ln\\sum e^{x_i} = x_{max} + \\ln\\sum e^{x_i - x_{max}}$. \`NaN\` propagates silently through calculations; check for it explicitly. In physics, also choose **units** that keep numbers near 1 (natural or reduced units), which avoids both extremes.

Summing $N$ numbers accumulates rounding errors: roughly $\\sqrt N\\epsilon$ for random errors, up to $N\\epsilon$ in the worst case, and much worse when adding small numbers to a large running total. **Kahan summation** carries a compensation term and reduces the error to $O(\\epsilon)$; NumPy's \`sum\` uses pairwise summation, which is also good. Read Goldberg's classic paper (sections 1-2), the Python floating-point tutorial and Newman section 4.2, then do the exercises, which make each failure mode visible.`,
          resources: [
            {
              title: 'What Every Computer Scientist Should Know About Floating-Point Arithmetic (Goldberg)',
              url: 'https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html',
              type: 'article',
              cost: 'free',
              provider: 'Oracle (reprint of ACM Computing Surveys 1991)',
              note: 'Sections on rounding error, guard digits and cancellation; skim the proofs.',
              primary: true,
            },
            {
              title: 'Python tutorial — Floating Point Arithmetic: Issues and Limitations',
              url: 'https://docs.python.org/3/tutorial/floatingpoint.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Computational Physics (Newman) — Chapter 4: Accuracy and speed',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Chapter 4 is one of the free sample chapters.',
            },
          ],
          exercises: [
            {
              slug: 'machine-epsilon',
              title: 'Find machine epsilon and the limits',
              prompt:
                'Find machine epsilon experimentally by halving $\\epsilon$ until $1 + \\epsilon = 1$, for float64, float32 and float16; compare with `numpy.finfo`. Find the largest factorial representable in float64 and the smallest positive number before underflow (including subnormals). Show that $(10^{-20} + 1) - 1 = 0$ but $10^{-20} + (1 - 1) = 10^{-20}$ and explain non-associativity.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'quadratic-cancellation',
              title: 'Catastrophic cancellation in the quadratic formula',
              prompt:
                'Solve $x^2 + bx + 1 = 0$ for $b = 10^2, 10^4, 10^6, 10^8$ using the textbook formula and the stable rearrangement. Compute the relative error of the small root against a high-precision reference (use `mpmath` or the series $-1/b - 1/b^3$). Plot relative error against $b$ and explain the observed loss of roughly $2\\log_{10}b$ digits.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'summation-error',
              title: 'Summation error and Kahan summation',
              prompt:
                'Sum $\\sum_{k=1}^{N}1/k^2$ for $N = 10^7$ in float32 forwards, backwards, with Kahan summation, and with `numpy.sum`, and compare with the float64 reference and with $\\pi^2/6 - 1/N$. Explain why summing small terms first is better. Then compute $\\ln\\sum_i e^{x_i}$ for $x_i \\in [1000, 1010]$ naively and with log-sum-exp.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is machine epsilon for double precision and what does it mean?',
              answerOutline:
                '$2^{-52} \\approx 2.2\\times10^{-16}$: the relative spacing of floats near 1, setting the relative rounding error of each operation (about 16 digits).',
            },
            {
              question: 'What is catastrophic cancellation? Give an example and a fix.',
              answerOutline:
                'Loss of significant digits when subtracting nearly equal numbers; e.g. $1 - \\cos x$ for small $x$, fixed by $2\\sin^2(x/2)$; or the quadratic formula fixed by computing one root from the product $c/a$.',
            },
            {
              question: 'Why do statistical and physical codes work with logarithms of probabilities or partition functions?',
              answerOutline:
                'Products of many small numbers underflow and sums of large exponentials overflow; logs and the log-sum-exp trick keep values representable.',
            },
          ],
        },
        {
          slug: 'truncation-error-and-convergence',
          title: 'Truncation error, convergence order and finite differences',
          summary:
            'The error from approximating continuous mathematics by discrete steps: Taylor-series analysis of finite differences, convergence order, the optimal step size where truncation meets rounding, and Richardson extrapolation.',
          estimatedMinutes: 150,
          objectives: [
            'Derive forward, backward and central difference formulas and their truncation errors from Taylor series',
            'Define convergence order and measure it from a log-log error plot',
            'Find the optimal step size balancing truncation and rounding error',
            'Apply Richardson extrapolation to raise the order of a method',
            'Use convergence tests as the primary verification tool for any numerical code',
          ],
          concepts: [
            'Truncation (discretisation) error',
            'Forward difference: $O(h)$',
            'Central difference: $O(h^2)$',
            'Second-derivative stencil $(f_{+} - 2f_0 + f_{-})/h^2$',
            'Convergence order $p$: error $\\propto h^p$',
            'Optimal step $h \\sim \\epsilon^{1/(p+1)}$',
            'Richardson extrapolation',
            'Convergence testing as verification',
          ],
          explanation: `Rounding error comes from the machine; **truncation error** comes from you. Whenever you replace a derivative by a difference, an integral by a sum or a differential equation by a step rule, you make an error controlled by a step size $h$, and Taylor series tell you exactly how large it is. Expanding $f(x + h) = f + hf' + \\tfrac{h^2}{2}f'' + \\tfrac{h^3}{6}f''' + \\dots$ gives the **forward difference**

$$f'(x) = \\frac{f(x+h) - f(x)}{h} - \\frac{h}{2}f''(x) + \\dots,$$

with error $O(h)$, while subtracting the expansions of $f(x \\pm h)$ cancels the even terms and gives the **central difference** $[f(x+h) - f(x-h)]/2h$ with error $\\frac{h^2}{6}f'''$, $O(h^2)$. Adding them gives the second-derivative stencil $[f(x+h) - 2f(x) + f(x-h)]/h^2$, also $O(h^2)$, which is the discrete Laplacian of every PDE solver in this subject.

A method has **convergence order** $p$ if its error scales as $h^p$. Measure it: compute the error for a sequence of $h$ values against a known answer and plot on log-log axes; the slope is $p$. This **convergence test** is the single most important verification tool in computational physics. If your second-order code shows slope 1, there is a bug (often a boundary treatment or an off-by-one in a stencil), however plausible the output looks.

Truncation error falls as $h$ shrinks but rounding error grows, because you divide a difference of nearly equal function values (error $\\sim\\epsilon|f|$) by $h$. For the forward difference the total error is about $\\frac{h}{2}|f''| + \\frac{2\\epsilon|f|}{h}$, minimised at $h \\sim\\sqrt{\\epsilon} \\approx 10^{-8}$ with about 8 correct digits; for the central difference $h \\sim\\epsilon^{1/3} \\approx 10^{-5}$ gives about 10-11 digits. Making $h$ smaller beyond this makes the answer *worse*: the V-shaped error plot is one you should produce yourself.

**Richardson extrapolation** exploits the known error form: if $D(h) = f' + Ch^2 + O(h^4)$, then $[4D(h/2) - D(h)]/3$ cancels the $h^2$ term and is fourth order. Applied repeatedly to integration it gives Romberg's method; the same idea underlies adaptive step control in ODE solvers (estimate the error by comparing two orders).

Read Newman section 5.10 (derivatives) and chapter 4, and the derivative sections of Chasnov's free numerical methods notes, then do the exercises; the V-shaped error plot and the convergence-order measurement are skills you will use in every later module.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 4 (accuracy) and Section 5.10 (derivatives)',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'Numerical Methods (Chasnov) — free lecture notes',
              url: 'https://www.math.hkust.edu.hk/~machas/numerical-methods.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'HKUST',
              note: 'Chapters on finite differences, Richardson extrapolation and numerical integration.',
            },
            {
              title: 'MIT 18.330 Introduction to Numerical Analysis',
              url: 'https://ocw.mit.edu/courses/18-330-introduction-to-numerical-analysis-spring-2012/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture notes on finite differences, interpolation and error analysis.',
            },
          ],
          exercises: [
            {
              slug: 'v-shaped-error',
              title: 'The V-shaped error plot',
              prompt:
                'Compute the derivative of $f(x) = e^{\\sin x}$ at $x = 1$ with forward and central differences for $h = 10^{-1}, 10^{-2}, \\dots, 10^{-15}$. Plot the absolute error against $h$ on log-log axes. Identify the truncation-dominated region (slopes 1 and 2), the rounding-dominated region (slope $-1$), and the optimal $h$ for each; compare with the predictions $\\sqrt\\epsilon$ and $\\epsilon^{1/3}$.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'derive-stencils',
              title: 'Derive higher-order stencils',
              prompt:
                'Using Taylor series, derive the five-point central difference $f\' \\approx [-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)]/12h$ and show its error is $O(h^4)$. Derive the one-sided second-order formula $f\'(x) \\approx [-3f(x) + 4f(x+h) - f(x+2h)]/2h$ used at boundaries. Verify both orders numerically with a convergence plot.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'richardson-extrapolation',
              title: 'Richardson extrapolation',
              prompt:
                'Implement Richardson extrapolation on the central difference to build a table $D_{k,m}$ (as in Romberg). For $f = \\tan x$ at $x = 1$, show the extrapolated values gain two orders per column, and find the best accuracy achievable before rounding dominates. Compare with `scipy`-free complex-step differentiation $f\'(x) \\approx \\operatorname{Im}f(x + ih)/h$ with $h = 10^{-20}$ and explain why it has no cancellation.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the central difference second order while the forward difference is first order?',
              answerOutline:
                'Subtracting the Taylor expansions of $f(x\\pm h)$ cancels the $h^2f\'\'$ term, leaving a leading error $\\frac{h^2}{6}f\'\'\'$.',
            },
            {
              question: 'Why does making $h$ smaller eventually make a finite-difference derivative worse?',
              answerOutline:
                'Rounding error in $f(x+h) - f(x)$ is $\\sim\\epsilon|f|$ and is divided by $h$, so it grows as $1/h$ while truncation shrinks; the total is minimised at an optimal $h$.',
            },
            {
              question: 'How do you measure the convergence order of a code and why is it important?',
              answerOutline:
                'Compute errors against a known solution for several $h$ and fit the slope on a log-log plot; a mismatch with the theoretical order reveals bugs.',
            },
            {
              question: 'What does Richardson extrapolation do?',
              answerOutline:
                'Combines results at two step sizes with weights chosen to cancel the leading error term, raising the order (e.g. $[4D(h/2) - D(h)]/3$ for an $h^2$ method).',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/taylor-series'],
        },
      ],
    },
    {
      slug: 'numerical-calculus-and-linear-algebra',
      title: 'Numerical Calculus and Linear Algebra',
      description:
        'Integration by quadrature, root finding and optimisation, and numerical linear algebra: the building blocks of every larger simulation.',
      lessons: [
        {
          slug: 'numerical-integration',
          title: 'Numerical integration: trapezoid, Simpson and Gaussian quadrature',
          summary:
            'Approximating integrals by weighted sums: Newton-Cotes rules and their errors, adaptive integration, Gaussian quadrature, and handling infinite ranges and singularities.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the trapezoidal and Simpson rules and their error orders',
            'Implement composite rules and verify their convergence order',
            'Explain Gaussian quadrature and why $N$ points integrate polynomials of degree $2N - 1$ exactly',
            'Use adaptive quadrature (scipy.integrate.quad) and understand its error estimate',
            'Transform infinite ranges and integrable singularities into well-behaved integrals',
          ],
          concepts: [
            'Trapezoidal rule, error $O(h^2)$',
            'Simpson\'s rule, error $O(h^4)$',
            'Euler-Maclaurin formula and spectral accuracy for periodic integrands',
            'Romberg integration',
            'Gaussian quadrature: nodes and weights from Legendre polynomials',
            'Adaptive quadrature and error estimates',
            'Change of variables for infinite ranges',
            'Subtracting singularities',
          ],
          explanation: `Most integrals in physics have no closed form, and **quadrature** approximates them as weighted sums of function values, $\\int_a^b f\\,dx \\approx \\sum_i w_if(x_i)$. The **trapezoidal rule** joins sample points with straight lines: on $N$ slices of width $h$, $I \\approx h[\\tfrac12f_0 + f_1 + \\dots + f_{N-1} + \\tfrac12f_N]$, with error $-\\tfrac{h^2}{12}[f'(b) - f'(a)] + O(h^4)$ by the Euler-Maclaurin formula. **Simpson's rule** fits parabolas through triples of points, giving weights $\\tfrac h3(1, 4, 2, 4, \\dots, 4, 1)$ and error $O(h^4)$. Both are easy to implement and to test: halving $h$ should cut the error by 4 and 16 respectively. The Euler-Maclaurin formula also explains a surprise: for smooth *periodic* functions over a full period the trapezoidal rule is spectrally accurate, because all the endpoint correction terms vanish.

Equally spaced points are not optimal. **Gaussian quadrature** chooses both nodes and weights: the $N$ nodes are the roots of the Legendre polynomial $P_N$, and the rule integrates every polynomial of degree up to $2N - 1$ exactly, twice what $N$ free weights alone could achieve. For smooth integrands it converges extraordinarily fast (often 10 points give machine precision). Its weakness is that the error estimate is not free; adaptive Gauss-Kronrod rules (QUADPACK, behind \`scipy.integrate.quad\`) pair a Gauss rule with an extended one to estimate the error and subdivide where the integrand is difficult.

Real integrals need preparation. An **infinite range** is mapped to a finite one, e.g. $x = t/(1-t)$ or $x = \\tan\\theta$, with the Jacobian included. An **integrable singularity** such as $1/\\sqrt x$ at 0 destroys the convergence order of every rule; remove it by substitution ($x = u^2$) or by subtracting an analytically integrable piece. Oscillatory integrands with many periods need special rules or careful splitting. In more than a few dimensions, grids become unaffordable and Monte Carlo takes over (module 4).

Always check: compare two methods or two resolutions, and never trust a single quadrature result. Read Newman chapter 5 (sections 5.1-5.6), the SciPy integration tutorial, and the Gaussian-quadrature section of Hjorth-Jensen's lecture notes. Then implement each rule yourself before using the library.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 5: Integrals and derivatives',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Trapezoid, Simpson, error estimation, Romberg, Gaussian quadrature, infinite ranges.',
              primary: true,
            },
            {
              title: 'SciPy — Integration (scipy.integrate) tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/integrate.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'quad, fixed_quad, romb, simpson and the meaning of the returned error estimate.',
            },
            {
              title: 'Computational Physics lecture notes and code (Hjorth-Jensen)',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
              note: 'Numerical integration chapter with Gaussian quadrature derivations and C++/Python code.',
            },
          ],
          exercises: [
            {
              slug: 'trapezoid-simpson-convergence',
              title: 'Implement and verify the Newton-Cotes rules',
              prompt:
                'Implement the composite trapezoidal and Simpson rules. Integrate $\\int_0^2(x^4 - 2x + 1)\\,dx = 4.4$ and $\\int_0^\\pi\\sin x\\,dx = 2$ for $N = 2^k$, $k = 1..16$, and plot the error against $N$ on log-log axes; measure slopes $-2$ and $-4$. Then integrate $\\int_0^{2\\pi}e^{\\cos x}\\,dx$ with the trapezoidal rule and show the error falls exponentially fast. Explain using Euler-Maclaurin.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'gaussian-quadrature-from-scratch',
              title: 'Gaussian quadrature from scratch',
              prompt:
                'Compute Gauss-Legendre nodes as the roots of $P_N$ (Newton iteration on the three-term recurrence) and the weights $w_i = 2/[(1 - x_i^2)P_N\'(x_i)^2]$. Verify against `numpy.polynomial.legendre.leggauss`. Show that your rule integrates $x^{2N-1}$ exactly and $x^{2N}$ not. Then compute the heat capacity integral of the Debye model $\\int_0^{x_D}\\frac{x^4e^x}{(e^x-1)^2}dx$ for $x_D = 10$ with $N = 5, 10, 20$ points and compare with `quad`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'singular-and-infinite',
              title: 'Singularities and infinite ranges',
              prompt:
                'Evaluate $\\int_0^1\\frac{\\cos x}{\\sqrt x}dx$ with Simpson\'s rule directly (start at $x = 10^{-10}$) and after the substitution $x = u^2$; compare convergence orders. Evaluate the blackbody integral $\\int_0^\\infty\\frac{x^3}{e^x - 1}dx = \\pi^4/15$ with the map $x = t/(1-t)$ and Gaussian quadrature, and with `quad` on the infinite range. Report errors and function evaluations.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the error orders of the composite trapezoidal and Simpson rules?',
              answerOutline:
                'Trapezoid $O(h^2)$, Simpson $O(h^4)$ for smooth integrands; halving $h$ reduces the errors by 4 and 16.',
            },
            {
              question: 'Why does $N$-point Gaussian quadrature integrate polynomials of degree $2N-1$ exactly?',
              answerOutline:
                'Choosing the nodes (as roots of the orthogonal polynomial $P_N$) as well as the weights gives $2N$ free parameters; orthogonality kills the remainder for degree up to $2N-1$.',
            },
            {
              question: 'Why is the trapezoidal rule spectrally accurate for smooth periodic integrands over a full period?',
              answerOutline:
                'The Euler-Maclaurin correction terms involve differences of odd derivatives at the endpoints, which all vanish by periodicity.',
            },
            {
              question: 'How do you handle $\\int_0^1 f(x)/\\sqrt x\\,dx$ numerically?',
              answerOutline:
                'Remove the singularity by substitution ($x = u^2$ gives $2\\int_0^1 f(u^2)du$) or subtract an analytically integrable term; otherwise convergence degrades badly.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/integration-techniques'],
        },
        {
          slug: 'root-finding-and-optimisation',
          title: 'Root finding and optimisation',
          summary:
            'Solving $f(x) = 0$ and minimising functions: bisection, Newton-Raphson, secant and Brent, Newton in several dimensions, golden-section search, gradient methods and Nelder-Mead.',
          estimatedMinutes: 150,
          objectives: [
            'Implement bisection, Newton-Raphson and secant methods and compare their convergence rates',
            'Explain linear, superlinear and quadratic convergence and recognise each in an error sequence',
            'Solve nonlinear systems with multidimensional Newton and a Jacobian',
            'Minimise functions with golden-section search, gradient descent and scipy.optimize methods',
            'Diagnose failure modes: bad initial guesses, multiple roots, local minima',
          ],
          concepts: [
            'Bracketing and bisection (linear convergence)',
            'Newton-Raphson (quadratic convergence)',
            'Secant and Brent\'s method',
            'Relaxation (fixed-point) iteration and its convergence condition',
            'Multidimensional Newton with a Jacobian',
            'Golden-section search',
            'Gradient descent, BFGS, Nelder-Mead',
            'Local versus global minima',
          ],
          explanation: `Physics is full of equations that cannot be solved algebraically: the transcendental equation for the energies of a finite square well, Kepler's equation $M = E - e\\sin E$, the self-consistency equation of mean-field theory $m = \\tanh(\\beta Jzm)$. **Root finding** solves $f(x) = 0$ numerically. The safest method is **bisection**: given a bracket $[a, b]$ with $f(a)f(b) < 0$, halve it repeatedly, keeping the half with a sign change. It cannot fail, and it gains one binary digit per step (**linear convergence**, about 50 steps for full double precision).

**Newton-Raphson** uses the derivative to jump to the root of the tangent line, $x_{n+1} = x_n - f(x_n)/f'(x_n)$. Near a simple root the error squares each step (**quadratic convergence**: the number of correct digits doubles), so 5 iterations usually suffice. But it can diverge or cycle from a poor starting point, fails at $f' = 0$, and converges only linearly at multiple roots. The **secant method** replaces $f'$ by a difference quotient (order about 1.618); **Brent's method** (\`scipy.optimize.brentq\`) combines bisection's safety with secant and inverse-quadratic speed and is the default choice for one-dimensional problems with a bracket. **Relaxation** $x_{n+1} = g(x_n)$ converges if $|g'| < 1$ near the fixed point, which is a quick method for self-consistency equations.

For systems $\\mathbf{f}(\\mathbf{x}) = 0$, Newton generalises with the **Jacobian** $J_{ij} = \\partial f_i/\\partial x_j$: solve $J\\,\\delta\\mathbf{x} = -\\mathbf{f}$ and update. It keeps quadratic convergence and is the inner loop of implicit ODE solvers and of nonlinear PDE solvers.

**Optimisation** is root finding for the gradient. In one dimension, **golden-section search** brackets a minimum and shrinks it by the golden ratio each step without derivatives. In many dimensions, **gradient descent** moves downhill but zigzags in narrow valleys; quasi-Newton methods (**BFGS**) build up curvature information and converge much faster; **Nelder-Mead** needs no derivatives and is robust for small noisy problems. All of these find *local* minima; for rugged landscapes (spin glasses, protein folding, many-parameter fits) you need multiple starts or stochastic methods such as simulated annealing (module 4). Always plot the function first if you can.

Read Newman chapter 6 (sections 6.3-6.4), the SciPy optimisation tutorial, and Chasnov's notes on root finding. Implement each method yourself and print the error at each iteration: seeing digits double under Newton is the best way to learn what quadratic convergence means.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 6: Solution of linear and nonlinear equations (6.3-6.4)',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'SciPy — Optimization and root finding (scipy.optimize) tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/optimize.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'brentq, newton, root, minimize (BFGS, Nelder-Mead) and least_squares.',
            },
            {
              title: 'Numerical Methods (Chasnov) — Root finding chapter',
              url: 'https://www.math.hkust.edu.hk/~machas/numerical-methods.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'HKUST',
              note: 'Includes the analysis of convergence order and fractal Newton basins.',
            },
          ],
          exercises: [
            {
              slug: 'finite-well-energies',
              title: 'Energy levels of a finite square well',
              prompt:
                'For a finite square well of depth $V_0$ and width $2a$, the even-state energies satisfy $\\sqrt{z_0^2 - z^2} = z\\tan z$ with $z = ka$, $z_0 = a\\sqrt{2mV_0}/\\hbar$. For $z_0 = 8$, find all even solutions by bisection, Newton and `brentq`, printing the error per iteration. Show bisection gains about 1 bit per step and Newton doubles digits. Plot the two sides of the equation to bracket the roots.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'kepler-equation',
              title: 'Kepler\'s equation and orbits',
              prompt:
                'Solve Kepler\'s equation $M = E - e\\sin E$ by Newton\'s method for $e = 0.1, 0.5, 0.9, 0.99$ over $M \\in [0, 2\\pi]$, starting from $E_0 = M$ and from $E_0 = \\pi$. Count iterations to $10^{-14}$ and find where the naive start struggles at high eccentricity. Use the solver to plot an orbit $(x, y)$ at uniform time steps and verify Kepler\'s second law numerically.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mean-field-and-newton-basins',
              title: 'Self-consistency and Newton basins',
              prompt:
                '(a) Solve the mean-field equation $m = \\tanh(m/T)$ by relaxation for $T$ from 0.1 to 1.5 and plot $m(T)$; show relaxation slows down near $T_c = 1$ and explain via $|g\'(m)|$. (b) Apply Newton\'s method to $z^3 - 1 = 0$ on a $1000\\times1000$ grid of complex starting points, colour each by the root it converges to, and display the fractal basin boundaries.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'optimiser-comparison',
              title: 'Comparing optimisers on the Rosenbrock valley',
              prompt:
                'Minimise the Rosenbrock function $(1-x)^2 + 100(y - x^2)^2$ from $(-1.5, 2)$ with your own gradient descent (fixed step), and with `scipy.optimize.minimize` using Nelder-Mead, BFGS and Newton-CG. Plot each path on the contour map and report the number of function and gradient evaluations to reach $10^{-8}$ accuracy. Explain the zigzag of gradient descent.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Compare bisection and Newton-Raphson in robustness and convergence rate.',
              answerOutline:
                'Bisection: guaranteed with a bracket, linear (1 bit/step). Newton: quadratic near a simple root but can diverge, needs a derivative and a good start.',
            },
            {
              question: 'When does the fixed-point iteration $x_{n+1} = g(x_n)$ converge?',
              answerOutline:
                'When $|g\'(x^*)| < 1$ near the fixed point; convergence is linear with rate $|g\'(x^*)|$, slow when it is close to 1.',
            },
            {
              question: 'How does Newton\'s method generalise to systems of equations?',
              answerOutline:
                'Solve the linear system $J(\\mathbf{x}_n)\\delta = -\\mathbf{f}(\\mathbf{x}_n)$ with the Jacobian and set $\\mathbf{x}_{n+1} = \\mathbf{x}_n + \\delta$.',
            },
            {
              question: 'Why can a minimiser return a wrong answer without reporting an error?',
              answerOutline:
                'It finds a local minimum dependent on the starting point; global structure requires multiple starts, plots or stochastic methods.',
            },
          ],
        },
        {
          slug: 'numerical-linear-algebra',
          title: 'Numerical linear algebra: solving systems and eigenproblems',
          summary:
            'Gaussian elimination and LU decomposition with pivoting, conditioning, banded and sparse systems, iterative solvers, and eigenvalue algorithms from power iteration to QR, applied to physical problems.',
          estimatedMinutes: 180,
          objectives: [
            'Implement Gaussian elimination with partial pivoting and explain why pivoting is needed',
            'Use LU decomposition to solve many right-hand sides efficiently and know the $O(N^3)$ cost',
            'Compute and interpret the condition number and its effect on accuracy',
            'Exploit banded and sparse structure (tridiagonal solver, scipy.sparse) and use iterative solvers',
            'Compute eigenvalues with power iteration, inverse iteration and library QR routines for physical problems',
          ],
          concepts: [
            'Gaussian elimination and back substitution',
            'Partial pivoting',
            'LU decomposition; $O(N^3)$ factorisation, $O(N^2)$ solve',
            'Condition number $\\kappa(A) = \\|A\\|\\|A^{-1}\\|$',
            'Tridiagonal (Thomas) algorithm',
            'Sparse matrices and iterative solvers (Jacobi, Gauss-Seidel, conjugate gradient)',
            'Power iteration and inverse iteration',
            'QR algorithm; eigh for Hermitian matrices',
          ],
          explanation: `Linear systems are the inner loop of physics computing: implicit time steps, finite-difference PDEs, least-squares fits and circuit networks all reduce to $A\\mathbf{x} = \\mathbf{b}$. **Gaussian elimination** reduces $A$ to upper-triangular form by row operations, then **back-substitutes**. Dividing by a small pivot amplifies rounding errors catastrophically, so **partial pivoting** swaps rows to put the largest available element on the diagonal; with it, elimination is stable for essentially all practical problems. Recording the multipliers gives the **LU decomposition** $PA = LU$: factorising costs $O(N^3)$, but each further right-hand side costs only $O(N^2)$, which is why you factor once and solve many times (\`scipy.linalg.lu_factor\`/\`lu_solve\`).

Accuracy is limited by the **condition number** $\\kappa(A) = \\|A\\|\\|A^{-1}\\|$ (the ratio of largest to smallest singular values): you can lose up to $\\log_{10}\\kappa$ digits however good the algorithm. A Hilbert matrix of size 12 has $\\kappa \\sim 10^{16}$ and its solution is noise. A small determinant does *not* indicate ill-conditioning; $\\kappa$ does. Compute it with \`numpy.linalg.cond\` when results look suspicious.

Physical matrices are usually **structured**. A 1D finite-difference Laplacian is tridiagonal, solvable in $O(N)$ by the Thomas algorithm (\`scipy.linalg.solve_banded\`). 2D and 3D grids give **sparse** matrices with a handful of nonzeros per row; store them with \`scipy.sparse\` and solve with sparse direct methods or **iterative** methods. Jacobi and Gauss-Seidel iterations are simple and are exactly the relaxation methods for Laplace's equation in module 5; **conjugate gradient** converges far faster for symmetric positive-definite systems, in about $\\sqrt\\kappa$ iterations.

**Eigenproblems** give normal modes, quantum energy levels and stability exponents. **Power iteration** finds the dominant eigenvalue; **inverse iteration** with a shift $\\sigma$ (solving $(A - \\sigma I)\\mathbf{y} = \\mathbf{x}$) converges to the eigenvalue nearest $\\sigma$, ideal for one state of a big Hamiltonian. Production codes use the **QR algorithm** (via LAPACK): use \`eigh\` for symmetric/Hermitian matrices, which is faster and returns orthonormal eigenvectors, and \`scipy.sparse.linalg.eigsh\` for a few eigenvalues of a large sparse matrix. Discretising the Schrödinger equation on a grid turns it into exactly this problem, one of the exercises below.

Read Newman chapter 6 (sections 6.1-6.2) and the SciPy linear algebra and sparse tutorials, and revisit math-methods for the eigenvalue theory. Then implement elimination with pivoting once, and use the libraries for everything after.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 6: Gaussian elimination, LU, eigenvalues (6.1-6.2)',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'SciPy — Linear algebra (scipy.linalg) tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/linalg.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
            {
              title: 'SciPy — Sparse linear algebra (scipy.sparse.linalg)',
              url: 'https://docs.scipy.org/doc/scipy/reference/sparse.linalg.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'spsolve, cg, gmres and eigsh for large sparse problems.',
            },
            {
              title: 'MIT 18.085 Computational Science and Engineering I (Strang)',
              url: 'https://ocw.mit.edu/courses/18-085-computational-science-and-engineering-i-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on the second-difference matrices K, T, B, C and their eigenvalues.',
            },
          ],
          exercises: [
            {
              slug: 'elimination-with-pivoting',
              title: 'Gaussian elimination with and without pivoting',
              prompt:
                'Implement Gaussian elimination with back substitution, with and without partial pivoting. Test on $\\begin{pmatrix}10^{-17}&1\\\\1&1\\end{pmatrix}\\mathbf{x} = (1, 2)^T$ and show the unpivoted version fails. Then solve random $N\\times N$ systems for $N = 50..800$, compare accuracy and time with `numpy.linalg.solve`, and verify the $N^3$ scaling.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'conditioning-hilbert',
              title: 'Ill-conditioning',
              prompt:
                'For Hilbert matrices $H_{ij} = 1/(i + j - 1)$ of size $N = 2..14$, set $\\mathbf{x}_{true} = (1, \\dots, 1)$, compute $\\mathbf{b} = H\\mathbf{x}_{true}$, solve, and plot the relative error and $\\kappa(H)\\epsilon$ against $N$. Show the error tracks $\\kappa\\epsilon$. Then show that the determinant of $10^{-3}I$ is tiny but its condition number is 1.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'schrodinger-matrix',
              title: 'The Schrödinger equation as a matrix eigenproblem',
              prompt:
                'Discretise $-\\tfrac12\\psi\'\' + V(x)\\psi = E\\psi$ on $[-10, 10]$ with $N = 1000$ points and the three-point Laplacian, giving a tridiagonal Hamiltonian. For the harmonic potential $V = x^2/2$ find the lowest 10 eigenvalues with `scipy.linalg.eigh_tridiagonal` and with `scipy.sparse.linalg.eigsh`, compare with $n + \\tfrac12$, and measure the $O(h^2)$ convergence of $E_0$. Plot the first four eigenfunctions. Repeat for the anharmonic $V = x^4$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'iterative-solvers',
              title: 'Iterative solvers for the 2D Poisson matrix',
              prompt:
                'Build the sparse 2D Laplacian on an $n\\times n$ grid with `scipy.sparse.kron`. Solve $A\\mathbf{x} = \\mathbf{b}$ for $n = 32, 64, 128$ with Jacobi, Gauss-Seidel, `scipy.sparse.linalg.cg` and `spsolve`. Plot residual against iteration for the iterative methods and report wall-clock times; show that the iteration counts of Jacobi grow like $n^2$ and of CG like $n$.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is partial pivoting necessary in Gaussian elimination?',
              answerOutline:
                'Dividing by small pivots creates huge multipliers that amplify rounding errors; swapping in the largest available pivot keeps multipliers at most 1 in magnitude.',
            },
            {
              question: 'What does the condition number tell you?',
              answerOutline:
                'The factor by which relative errors in data can be amplified in the solution; expect to lose about $\\log_{10}\\kappa$ digits regardless of algorithm.',
            },
            {
              question: 'Why factorise with LU rather than recompute elimination for each right-hand side?',
              answerOutline:
                'Factorisation costs $O(N^3)$ once; each subsequent solve with triangular factors costs only $O(N^2)$.',
            },
            {
              question: 'How would you find the eigenvalue of a large sparse Hamiltonian closest to a given energy?',
              answerOutline:
                'Shift-invert (inverse iteration) around that energy, e.g. `eigsh` with `sigma`, which converges to the eigenvalues nearest the shift.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors'],
        },
      ],
      project: {
        slug: 'quantum-well-solver',
        title: 'Module project: a 1D quantum bound-state solver',
        description:
          'Build a tool that finds bound states of an arbitrary 1D potential in two independent ways: (1) the shooting method, integrating the Schrödinger equation outward and using root finding on the energy so the wavefunction vanishes at the far boundary, and (2) the finite-difference matrix method with a sparse eigensolver. Validate both on the harmonic oscillator, the infinite and finite square wells and the Pöschl-Teller potential (all with known spectra), measure convergence orders, and apply the solver to a double-well potential to study tunnelling splitting as a function of barrier height.',
        deliverables: [
          'Python module implementing both methods with tests against four analytic spectra',
          'Convergence plots (error vs grid spacing) for both methods',
          'Short report on the double-well tunnelling splitting with a WKB comparison',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'ode-integrators',
      title: 'ODE Integrators',
      description:
        'Solving initial-value problems: Euler and Runge-Kutta methods, adaptive step control, stiffness and implicit methods, and boundary-value problems by shooting and relaxation (symplectic integrators are in the N-body module).',
      lessons: [
        {
          slug: 'euler-and-runge-kutta',
          title: 'Euler and Runge-Kutta methods',
          summary:
            'From the Euler method to fourth-order Runge-Kutta: local and global error, convergence order, stability on the test equation, and implementing a general vector ODE solver.',
          estimatedMinutes: 180,
          objectives: [
            'Derive the Euler method and its local and global error orders',
            'Derive the second-order midpoint method and state the RK4 scheme',
            'Implement a vectorised RK4 solver for systems $\\dot{\\mathbf{y}} = \\mathbf{f}(t, \\mathbf{y})$ and verify fourth-order convergence',
            'Analyse stability using the test equation $\\dot y = \\lambda y$ and find the stability region of Euler and RK4',
            'Use scipy.integrate.solve_ivp correctly, including tolerances, dense output and events',
          ],
          concepts: [
            'Initial-value problem and first-order form',
            'Euler method: local error $O(h^2)$, global $O(h)$',
            'Midpoint (RK2) method',
            'Classical RK4',
            'Local versus global truncation error',
            'Test equation and stability region',
            'Energy drift in non-symplectic methods',
            'solve_ivp: rtol, atol, dense_output, events',
          ],
          explanation: `Every ODE problem in physics can be written as a first-order system $\\dot{\\mathbf{y}} = \\mathbf{f}(t, \\mathbf{y})$ with a state vector $\\mathbf{y}$ (positions and velocities for mechanics). The simplest integrator follows the tangent line: **Euler's method** $\\mathbf{y}_{n+1} = \\mathbf{y}_n + h\\mathbf{f}(t_n, \\mathbf{y}_n)$. Taylor expansion shows each step makes a **local error** $O(h^2)$; over a fixed interval you take $1/h$ steps, so the **global error** is $O(h)$. First-order accuracy is poor: to get 6 digits you need about a million steps. Worse, for oscillators Euler is unstable: the energy of a harmonic oscillator grows by a factor $1 + h^2\\omega^2$ per step.

**Runge-Kutta** methods sample $\\mathbf{f}$ at several points within the step and combine them to cancel low-order error terms. The **midpoint method** evaluates the slope at a trial half step, $\\mathbf{k}_1 = h\\mathbf{f}(t, \\mathbf{y})$, $\\mathbf{y}_{n+1} = \\mathbf{y}_n + h\\mathbf{f}(t + h/2, \\mathbf{y} + \\mathbf{k}_1/2)$, and is second order. The classical **RK4** uses four slopes,

$$\\mathbf{y}_{n+1} = \\mathbf{y}_n + \\tfrac16(\\mathbf{k}_1 + 2\\mathbf{k}_2 + 2\\mathbf{k}_3 + \\mathbf{k}_4),$$

with $\\mathbf{k}_1 = h\\mathbf{f}(t, \\mathbf{y})$, $\\mathbf{k}_2 = h\\mathbf{f}(t + \\tfrac h2, \\mathbf{y} + \\tfrac12\\mathbf{k}_1)$, $\\mathbf{k}_3 = h\\mathbf{f}(t + \\tfrac h2, \\mathbf{y} + \\tfrac12\\mathbf{k}_2)$, $\\mathbf{k}_4 = h\\mathbf{f}(t + h, \\mathbf{y} + \\mathbf{k}_3)$, and global error $O(h^4)$: halving the step improves accuracy 16-fold. It is the workhorse fixed-step method; implement it once with NumPy arrays so it handles any system.

**Stability** is separate from accuracy. Apply a method to $\\dot y = \\lambda y$; it multiplies $y$ by an amplification factor $R(h\\lambda)$ per step ($1 + h\\lambda$ for Euler). The method is stable where $|R| \\le 1$. Euler's stability region is the disc $|1 + h\\lambda| \\le 1$, which excludes the imaginary axis (oscillations grow); RK4's region includes a segment of the imaginary axis, so it is stable for oscillators with $h\\omega < 2.8$, but its energy still drifts slowly, a fact that matters for long orbital integrations (lesson 3).

In practice use \`scipy.integrate.solve_ivp\`, which implements adaptive Runge-Kutta (RK45, DOP853) and implicit methods; set \`rtol\` and \`atol\` deliberately (defaults of $10^{-3}$ are loose for physics), use \`dense_output\` for smooth interpolation and \`events\` to detect crossings (periods, collisions). Read Newman chapter 8 (sections 8.1-8.3, free sample chapter) and the solve_ivp documentation, then do the exercises, measuring the convergence order of everything you write.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 8: Ordinary differential equations',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Euler, RK2, RK4, systems and second-order equations; Chapter 8 is a free sample chapter.',
              primary: true,
            },
            {
              title: 'SciPy — solve_ivp documentation',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
            {
              title: 'Numerical Methods in Physics with Python (Gezerlis) — companion site',
              url: 'https://numphyspy.org/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Alex Gezerlis / Cambridge University Press',
              note: 'Free code listings and tutorials; the ODE chapter codes are a useful reference. The book itself is paid.',
            },
          ],
          exercises: [
            {
              slug: 'rk4-convergence',
              title: 'Implement and verify Euler, RK2 and RK4',
              prompt:
                'Write a function `integrate(f, y0, t0, t1, h, method)` supporting Euler, midpoint and RK4 for vector states. Integrate the harmonic oscillator $\\ddot x = -x$ from $(1, 0)$ to $t = 10$ and plot the global error at $t = 10$ against $h$ on log-log axes; measure slopes 1, 2 and 4. Also plot the energy against time for $h = 0.1$ for each method over $t \\in [0, 1000]$ and describe the drift.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'stability-regions',
              title: 'Stability regions',
              prompt:
                'Derive the amplification factors $R(z)$ ($z = h\\lambda$) for Euler, midpoint and RK4 ($R = 1 + z + z^2/2 + z^3/6 + z^4/24$). Plot the regions $|R(z)| \\le 1$ in the complex plane. For the oscillator ($\\lambda = \\pm i\\omega$) find the largest stable $h\\omega$ for RK4 (about 2.83) and confirm by simulation that the amplitude blows up just above it.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'nonlinear-pendulum-period',
              title: 'Period of the nonlinear pendulum',
              prompt:
                'Using `solve_ivp` with `rtol=1e-10` and an event at $\\dot\\theta = 0$, compute the period of $\\ddot\\theta = -\\sin\\theta$ for amplitudes $\\theta_0$ from 0.1 to 3.1 rad. Compare with the exact result $T = 4K(\\sin^2(\\theta_0/2))$ using `scipy.special.ellipk` and plot the relative error. Check how the error changes with `rtol` from $10^{-3}$ to $10^{-12}$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'lorenz-sensitivity',
              title: 'Chaos and the limits of prediction',
              prompt:
                'Integrate the Lorenz system ($\\sigma = 10$, $\\rho = 28$, $\\beta = 8/3$) with RK4 at $h = 0.01$ and $h = 0.005$ from the same initial condition, and with two initial conditions differing by $10^{-10}$. Plot the separation against time on a log axis and estimate the largest Lyapunov exponent (about 0.9). Explain why convergence testing must be done over a finite horizon for chaotic systems.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the global error of Euler\'s method $O(h)$ although each step has error $O(h^2)$?',
              answerOutline:
                'There are $\\sim1/h$ steps over a fixed interval, and local errors accumulate: $(1/h)\\times O(h^2) = O(h)$.',
            },
            {
              question: 'What is a stability region and why does Euler fail for oscillators?',
              answerOutline:
                'The set of $z = h\\lambda$ with $|R(z)| \\le 1$; Euler\'s region is the disc centred at $-1$, excluding the imaginary axis, so oscillatory modes grow every step.',
            },
            {
              question: 'Write the RK4 update.',
              answerOutline:
                '$y_{n+1} = y_n + (k_1 + 2k_2 + 2k_3 + k_4)/6$ with slopes at the start, twice at the midpoint, and at the end (each using the previous slope).',
            },
            {
              question: 'What should you set when calling solve_ivp for a physics problem?',
              answerOutline:
                'Tight rtol/atol appropriate to the required accuracy, an appropriate method (RK45/DOP853 or implicit for stiff), dense_output or t_eval for output, and events for crossings.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/second-order-linear-odes-and-oscillators'],
        },
        {
          slug: 'adaptive-steps-and-stiff-equations',
          title: 'Adaptive step size and stiff equations',
          summary:
            'Controlling error automatically with embedded Runge-Kutta pairs, recognising stiffness, and solving stiff problems with implicit methods such as backward Euler and BDF.',
          estimatedMinutes: 150,
          objectives: [
            'Estimate local error by step doubling or with an embedded pair and adapt the step to meet a tolerance',
            'Implement an adaptive RK4 or RK45 integrator and apply it to highly eccentric orbits',
            'Define stiffness and recognise it from widely separated eigenvalues of the Jacobian',
            'Derive backward Euler, show it is A-stable, and implement it with a Newton solve',
            'Choose between explicit and implicit solvers in solve_ivp (RK45, DOP853, Radau, BDF, LSODA)',
          ],
          concepts: [
            'Local error estimate by step doubling',
            'Embedded Runge-Kutta pairs (Dormand-Prince)',
            'Step-size controller $h_{new} = h(\\text{tol}/\\text{err})^{1/(p+1)}$',
            'Stiffness and the ratio of time scales',
            'A-stability',
            'Backward (implicit) Euler and trapezoidal rule',
            'BDF and Radau methods',
            'Jacobian supply for implicit solvers',
          ],
          explanation: `A fixed step is wasteful whenever the solution varies on very different time scales in different places: a comet on an eccentric orbit moves slowly far from the Sun and very fast at perihelion. **Adaptive** integrators estimate the local error at each step and adjust $h$ to keep it near a tolerance. The simplest estimate is **step doubling**: take one step of $2h$ and two of $h$ with RK4; their difference, divided by $2^4 - 1 = 15$, estimates the error of the better result. Then rescale the step by $(\\text{tol}/\\text{err})^{1/5}$ (for a fourth-order method), with a safety factor, and redo the step if the error was too large. **Embedded pairs** such as Dormand-Prince 5(4), which \`solve_ivp\`'s RK45 uses, get two orders from one shared set of function evaluations, which is cheaper. A good adaptive code takes tiny steps at perihelion and large ones at aphelion automatically, and the accuracy of the whole orbit is controlled by one parameter.

**Stiffness** is a different problem. A system is stiff when it contains both fast-decaying and slow components, for example a chemical network with reaction times from microseconds to hours, or a PDE discretised on a fine grid (the diffusion equation's fastest mode decays at a rate $\\sim1/\\Delta x^2$). The fast components die almost immediately, yet an explicit method must keep $h|\\lambda_{fast}| \\lesssim 2$ to stay *stable*, so it is forced to take tiny steps for the entire slow evolution. You recognise stiffness by the eigenvalues of the Jacobian $\\partial f_i/\\partial y_j$ spanning many orders of magnitude, or empirically when an explicit adaptive solver crawls with tiny steps although the solution looks smooth.

The cure is **implicit** methods. **Backward Euler** evaluates the slope at the end of the step: $\\mathbf{y}_{n+1} = \\mathbf{y}_n + h\\mathbf{f}(t_{n+1}, \\mathbf{y}_{n+1})$. Its amplification factor for the test equation is $1/(1 - h\\lambda)$, which has modulus below 1 for every $\\lambda$ with negative real part: it is **A-stable**, so the step is limited only by accuracy on the slow components. The price is solving a (generally nonlinear) system at each step, by Newton's method with the Jacobian. Higher-order implicit methods (the trapezoidal/Crank-Nicolson rule, **BDF** backward differentiation formulas, **Radau** collocation) are what \`solve_ivp\` provides for stiff problems; supply the Jacobian analytically when you can, because finite-difference Jacobians are expensive and noisy. LSODA switches automatically between explicit and implicit methods.

Read Newman sections 8.4-8.5 (adaptive step size and other methods), the solve_ivp documentation on method choice, and Chasnov's notes on stiff equations. The Robertson chemical-kinetics problem in the exercises is the standard demonstration that choosing the wrong solver can make a computation thousands of times slower.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Sections 8.4-8.5: Adaptive step sizes, other methods',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'SciPy — solve_ivp (method choice: RK45, DOP853, Radau, BDF, LSODA)',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
            {
              title: 'Numerical Methods (Chasnov) — ODE chapter (adaptive methods and stiffness)',
              url: 'https://www.math.hkust.edu.hk/~machas/numerical-methods.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'HKUST',
            },
          ],
          exercises: [
            {
              slug: 'adaptive-comet',
              title: 'An adaptive integrator for a comet',
              prompt:
                'Implement adaptive RK4 by step doubling with target accuracy $\\delta$ per unit time. Integrate a comet orbit around the Sun (eccentricity 0.95, in units with $GM = 4\\pi^2$, AU and years) for 5 orbits with $\\delta = 10^{-6}$ AU/yr. Plot the orbit with dots at each step (they bunch at perihelion), the step size against time, and the energy error. Compare the number of steps with a fixed-step RK4 achieving the same final accuracy.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'robertson-stiff',
              title: 'Stiffness: the Robertson problem',
              prompt:
                'Integrate the Robertson kinetics system $\\dot y_1 = -0.04y_1 + 10^4y_2y_3$, $\\dot y_2 = 0.04y_1 - 10^4y_2y_3 - 3\\times10^7y_2^2$, $\\dot y_3 = 3\\times10^7y_2^2$ from $(1, 0, 0)$ to $t = 10^5$ with `solve_ivp` using RK45, Radau, BDF and LSODA. Record wall time, number of function evaluations and accepted steps. Compute the Jacobian eigenvalues at a few times to show the stiffness ratio. Supply an analytic Jacobian to BDF and measure the speed-up.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'backward-euler',
              title: 'Implement backward Euler',
              prompt:
                'Derive the amplification factor of backward Euler for $\\dot y = \\lambda y$ and show A-stability. Implement it for the linear stiff system $\\dot{\\mathbf{y}} = A\\mathbf{y}$ with $A = \\operatorname{diag}(-1, -1000)$ (one linear solve per step) and for the nonlinear van der Pol oscillator with $\\mu = 1000$ (Newton iteration per step). Compare with forward Euler at the same step size and show forward Euler explodes for $h > 0.002$ while backward Euler remains stable at $h = 0.1$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does step doubling estimate the local error of RK4?',
              answerOutline:
                'Compare one step of $2h$ with two steps of $h$; the difference is about $15\\times$ the error of the two-step result (since error scales as $h^5$ per step).',
            },
            {
              question: 'What makes a system stiff?',
              answerOutline:
                'Widely separated time scales (Jacobian eigenvalues spanning orders of magnitude); explicit stability forces steps set by the fastest, already-decayed mode.',
            },
            {
              question: 'Why is backward Euler A-stable?',
              answerOutline:
                'Its amplification factor $1/(1 - h\\lambda)$ has modulus less than 1 for all $\\lambda$ with negative real part and any $h > 0$.',
            },
            {
              question: 'What is the cost of implicit methods and how is it reduced?',
              answerOutline:
                'A (non)linear solve per step via Newton\'s method; supply an analytic or sparse Jacobian and reuse factorisations.',
            },
          ],
        },
        {
          slug: 'boundary-value-problems',
          title: 'Boundary-value problems: shooting and relaxation',
          summary:
            'ODEs with conditions at both ends: the shooting method combining an integrator with root finding, finite-difference relaxation, and eigenvalue problems such as quantum bound states.',
          estimatedMinutes: 120,
          objectives: [
            'Distinguish boundary-value from initial-value problems and recognise when each applies',
            'Solve two-point BVPs by the shooting method using an ODE integrator and a root finder',
            'Solve linear BVPs by finite differences as a tridiagonal linear system',
            'Find eigenvalues of Sturm-Liouville problems (e.g. the Schrödinger equation) by shooting on the energy',
            'Use scipy.integrate.solve_bvp and validate against analytic solutions',
          ],
          concepts: [
            'Two-point boundary conditions',
            'Shooting method',
            'Root finding on the unknown initial slope',
            'Finite-difference discretisation of BVPs',
            'Tridiagonal systems',
            'Eigenvalue BVPs and shooting on the eigenvalue',
            'Numerov method (preview)',
            'solve_bvp collocation',
          ],
          explanation: `Many physical problems specify conditions at two different places: a projectile that must hit a target, a string fixed at both ends, a quantum wavefunction that must vanish at $\\pm\\infty$, a beam clamped at both supports. These are **boundary-value problems** (BVPs), and an initial-value integrator alone cannot solve them because you do not know all the initial data.

The **shooting method** turns a BVP into root finding. For $y'' = f(x, y, y')$ with $y(a) = \\alpha$, $y(b) = \\beta$, guess the missing initial slope $s = y'(a)$, integrate to $b$, and record the miss $F(s) = y(b; s) - \\beta$. Then find the root of $F$ with the secant method or bisection; each function evaluation is a full ODE integration. It reuses the integrators of this module and is accurate, but it can fail when solutions grow exponentially (small changes in $s$ produce enormous misses), in which case shoot from both ends toward a matching point in the middle.

**Relaxation** (finite differences) discretises the whole domain at once. Replace $y''$ by $(y_{i+1} - 2y_i + y_{i-1})/h^2$ at every interior point; a linear ODE becomes a **tridiagonal** linear system, solved in $O(N)$ with the boundary values built into the first and last equations. Nonlinear ODEs become nonlinear algebraic systems solved by Newton's method. The method is robust and converges as $O(h^2)$; it is the 1D version of the PDE solvers in module 5. \`scipy.integrate.solve_bvp\` uses a higher-order collocation version with mesh refinement.

**Eigenvalue problems** are BVPs with an unknown parameter that admits solutions only for special values: the energies of the time-independent Schrödinger equation $-\\frac{\\hbar^2}{2m}\\psi'' + V\\psi = E\\psi$ with $\\psi \\to 0$ at the boundaries. Shoot on $E$: integrate from one side with $\\psi = 0$, $\\psi' = 1$ (normalisation is irrelevant), and find the energies at which $\\psi$ also vanishes at the other side. Counting the nodes of $\\psi$ tells you which state you have found (the $n$-th state has $n$ nodes, by Sturm-Liouville theory). The **Numerov** method, a specialised fourth-order scheme for $y'' = g(x)y$, is the traditional integrator for this task. The finite-difference alternative is the matrix eigenproblem of the linear-algebra lesson; doing both and comparing is the module project.

Read Newman section 8.6 (boundary value problems, shooting, relaxation, eigenvalue problems) and the solve_bvp documentation, then do the exercises.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Section 8.6: Boundary value problems',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Shooting method, relaxation, and the Schrödinger eigenvalue example.',
              primary: true,
            },
            {
              title: 'SciPy — Integration tutorial (solve_bvp section)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/integrate.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
            {
              title: 'Computational Physics lecture notes and code (Hjorth-Jensen) — two-point boundary value problems',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
              note: 'The tridiagonal Poisson problem is the first project in this course.',
            },
          ],
          exercises: [
            {
              slug: 'shooting-projectile',
              title: 'Shooting a projectile with drag',
              prompt:
                'A ball with quadratic air drag ($\\ddot{\\mathbf{r}} = -g\\hat{z} - k|\\dot{\\mathbf{r}}|\\dot{\\mathbf{r}}$, $k = 0.01$/m) is launched at 30 m/s. Find the launch angle(s) that land it 50 m away by shooting: integrate with `solve_ivp` with a ground-impact event, and use `brentq` on the miss distance. Find both solutions (low and high trajectories) and plot them. Compare the maximum range and its angle with the drag-free case.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'tridiagonal-poisson',
              title: 'Relaxation for the 1D Poisson equation',
              prompt:
                'Solve $-u\'\' = 100e^{-10x}$ on $[0,1]$ with $u(0) = u(1) = 0$ by finite differences, implementing the Thomas algorithm yourself. Compare with the exact solution $u = 1 - (1 - e^{-10})x - e^{-10x}$ and plot the maximum error against $h$ for $N = 10..10^6$. Show second-order convergence until rounding takes over, and identify the optimal $N$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shoot-schrodinger',
              title: 'Shooting for quantum eigenvalues',
              prompt:
                'Find the first five energy levels of the anharmonic oscillator $V(x) = x^4$ (units $\\hbar = m = 1$, $-\\tfrac12\\psi\'\' + V\\psi = E\\psi$) by shooting from $x = -L$ to $x = +L$ with $L = 6$ and using the secant method on $\\psi(L; E)$. Count nodes to label states. Compare with the finite-difference matrix eigenvalues ($E_0 \\approx 0.6680986$). Show the sensitivity to $L$ and explain why the outward integration becomes unstable for large $L$.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the shooting method work?',
              answerOutline:
                'Guess the unknown initial condition, integrate to the far boundary, measure the miss, and use root finding on the guess to drive the miss to zero.',
            },
            {
              question: 'When does shooting fail and what is the remedy?',
              answerOutline:
                'When solutions grow exponentially so the miss is extremely sensitive to the guess; shoot from both ends to a matching point, or use relaxation.',
            },
            {
              question: 'What linear system does finite-difference relaxation produce for a 1D second-order linear BVP?',
              answerOutline:
                'A tridiagonal system from the three-point stencil, solvable in $O(N)$ by the Thomas algorithm, with boundary values moved to the right-hand side.',
            },
            {
              question: 'How do you know which eigenstate the shooting method has found?',
              answerOutline:
                'Count the nodes of the wavefunction: the $n$-th state (from 0) has $n$ nodes, by Sturm-Liouville oscillation theory.',
            },
          ],
        },
      ],
      project: {
        slug: 'orbital-integrator-comparison',
        title: 'Module project: an orbital integrator testbed',
        description:
          'Build a small library of integrators (Euler, RK4, adaptive RK45 via step doubling, leapfrog, Yoshida-4) with a common interface, and a testbed that runs them on the Kepler problem, the restricted three-body problem and a stiff damped oscillator. Measure convergence order, energy and angular-momentum conservation, cost per unit accuracy, and long-term behaviour over $10^5$ orbits. Produce a report recommending an integrator for each problem class, justified by the measurements.',
        deliverables: [
          'Python package with the integrators, a common API and tests verifying each method\'s convergence order',
          'Benchmark scripts and plots: error vs step size, energy error vs time, cost vs accuracy',
          'A 3-5 page report with recommendations',
        ],
        estimatedHours: 12,
        stretchGoals: [
          'Add a Wisdom-Holman mapping and compare with REBOUND\'s WHFast on the outer Solar System',
          'Integrate Mercury\'s orbit with the 1PN relativistic correction and measure the 43"/century perihelion precession',
        ],
      },
    },
    {
      slug: 'monte-carlo-methods',
      title: 'Monte Carlo Methods',
      description:
        'Using randomness to compute: Monte Carlo integration and importance sampling, random walks and diffusion, the Metropolis algorithm for statistical mechanics with the Ising model, and simulated annealing.',
      lessons: [
        {
          slug: 'monte-carlo-integration',
          title: 'Monte Carlo integration and importance sampling',
          summary:
            'Estimating integrals as averages over random samples, the dimension-independent $1/\\sqrt N$ error, importance sampling and other variance-reduction techniques.',
          estimatedMinutes: 150,
          objectives: [
            'Estimate integrals by hit-or-miss and mean-value Monte Carlo and attach statistical error bars',
            'Explain why Monte Carlo beats grid quadrature in high dimensions',
            'Derive importance sampling and choose a good sampling distribution',
            'Apply variance reduction: control variates, antithetic variates, stratification',
            'Compute a high-dimensional physics integral (e.g. the volume of a hypersphere or a classical partition function)',
          ],
          concepts: [
            'Mean-value Monte Carlo $I \\approx (b-a)\\langle f\\rangle$',
            'Statistical error $\\sigma_f/\\sqrt N$',
            'Hit-or-miss method',
            'Curse of dimensionality for grids',
            'Importance sampling with weight $f/p$',
            'Optimal sampling density $p \\propto |f|$',
            'Control and antithetic variates',
            'Stratified sampling',
          ],
          explanation: `An integral is an average: $\\int_V f(\\mathbf{x})\\,d\\mathbf{x} = V\\langle f\\rangle$ where the average is over points uniformly distributed in $V$. **Monte Carlo integration** estimates that average with $N$ random points, $I \\approx \\frac{V}{N}\\sum f(\\mathbf{x}_i)$, and the central limit theorem gives its error: $V\\sigma_f/\\sqrt N$, with $\\sigma_f^2$ the variance of $f$ estimated from the same samples. Report it with every estimate. The **hit-or-miss** variant (throw points under the graph and count) is simpler but always has larger variance.

The $1/\\sqrt N$ convergence is slow compared with Simpson's $N^{-4}$ in one dimension, so why use it? Because it does not depend on dimension. A grid method of order $p$ in $d$ dimensions has error $\\sim N^{-p/d}$ with $N$ total points; for $d = 10$ Simpson converges like $N^{-0.4}$ and needs $10^{10}$ points for a coarse 10-point grid. Monte Carlo's $N^{-1/2}$ wins for $d \\gtrsim 8$, and statistical mechanics, quantum many-body physics and particle-physics phase-space integrals live in hundreds or millions of dimensions.

Since the error is $\\sigma_f/\\sqrt N$, reducing the variance is as valuable as increasing $N$. **Importance sampling** draws points from a density $p(\\mathbf{x})$ concentrated where $f$ is large and averages the ratio:

$$I = \\int f\\,d\\mathbf{x} = \\int\\frac{f}{p}\\,p\\,d\\mathbf{x} \\approx \\frac1N\\sum_i\\frac{f(\\mathbf{x}_i)}{p(\\mathbf{x}_i)}, \\quad \\mathbf{x}_i \\sim p .$$

The variance vanishes when $p \\propto |f|$, which you cannot achieve exactly (it requires knowing $I$) but can approach; a poor choice with lighter tails than $f$ gives infinite variance, a silent disaster detected only by watching the weights. This idea leads directly to Markov chain Monte Carlo, where $p$ is the Boltzmann distribution and is sampled with a Markov chain. Other variance-reduction tricks: **control variates** subtract a function with known integral that is correlated with $f$; **antithetic variates** pair each $\\mathbf{x}$ with its reflection to cancel odd fluctuations; **stratified sampling** divides the domain and samples each part separately.

Read Newman chapter 10 (sections 10.1-10.2; random numbers and Monte Carlo integration) and the corresponding Hjorth-Jensen notes, and revisit the probability-statistics lesson on simulation for the statistics of the estimates. Then do the exercises; the hypersphere exercise makes the curse of dimensionality concrete.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 10: Random processes and Monte Carlo methods',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Sections 10.1-10.2: random numbers, Monte Carlo integration, importance sampling. Chapter 10 is a free sample chapter.',
              primary: true,
            },
            {
              title: 'Computational Physics lecture notes and code (Hjorth-Jensen) — Monte Carlo integration chapter',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
            },
            {
              title: 'NumPy — Random sampling (Generator API)',
              url: 'https://numpy.org/doc/stable/reference/random/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
            },
          ],
          exercises: [
            {
              slug: 'hypersphere-volume',
              title: 'Volume of a hypersphere',
              prompt:
                'Estimate the volume of the unit ball in $d = 2, 3, 5, 10, 15, 20$ dimensions by hit-or-miss Monte Carlo with $N = 10^6$ points, with error bars, and compare with $\\pi^{d/2}/\\Gamma(d/2 + 1)$. Then attempt the same with a midpoint grid of comparable total cost and compare errors. Explain why the hit-or-miss acceptance fraction collapses for large $d$ and how importance sampling (e.g. sampling from a Gaussian) fixes it.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'importance-sampling-integral',
              title: 'Importance sampling a singular integral',
              prompt:
                'Estimate $I = \\int_0^1\\frac{x^{-1/2}}{e^x + 1}dx \\approx 0.8389$ (Newman exercise 10.8) by (a) mean-value Monte Carlo with uniform samples and (b) importance sampling with $p(x) = \\tfrac12x^{-1/2}$ (sampled by $x = u^2$). For $N = 10^6$ compare the estimates and their standard errors, and plot the distribution of weights $f/p$ in each case. Explain why (a) has a heavy-tailed weight distribution.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'variance-reduction',
              title: 'Variance-reduction techniques',
              prompt:
                'For $I = \\int_0^1 e^x\\,dx = e - 1$, compare the standard error at $N = 10^4$ of plain Monte Carlo, antithetic variates ($x$ and $1 - x$), a control variate $g(x) = 1 + x$ with known integral 1.5, and stratified sampling with 100 strata. Derive the variance of each analytically where possible and confirm empirically. Rank the methods by error per function evaluation.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the error of a Monte Carlo integral and how does it depend on dimension?',
              answerOutline:
                '$V\\sigma_f/\\sqrt N$; independent of dimension, unlike grid methods whose error is $N^{-p/d}$.',
            },
            {
              question: 'Derive the importance-sampling estimator and state the ideal sampling density.',
              answerOutline:
                '$I = \\int (f/p)p\\,dx \\approx \\frac1N\\sum f(x_i)/p(x_i)$ with $x_i \\sim p$; variance vanishes for $p \\propto |f|$.',
            },
            {
              question: 'What can go wrong with importance sampling?',
              answerOutline:
                'If $p$ has lighter tails than $f$ (or is zero where $f$ is not), weights become huge or the estimator biased; variance can be infinite and the error estimate misleading.',
            },
            {
              question: 'When does Monte Carlo beat Simpson\'s rule?',
              answerOutline:
                'In high dimensions: Simpson error $\\sim N^{-4/d}$ versus $N^{-1/2}$, so roughly for $d > 8$, and for irregular domains or discontinuous integrands.',
            },
          ],
        },
        {
          slug: 'random-walks-and-diffusion',
          title: 'Random walks, diffusion and stochastic processes',
          summary:
            'Random walks as microscopic models of diffusion, the emergence of the diffusion equation, Brownian motion and the Langevin equation, and diffusion-limited aggregation.',
          estimatedMinutes: 120,
          objectives: [
            'Simulate lattice and continuous random walks and measure the mean squared displacement',
            'Derive the diffusion equation from the random-walk master equation and relate $D$ to step length and time',
            'Integrate the Langevin equation for a Brownian particle (Euler-Maruyama) and verify the fluctuation-dissipation relation',
            'Simulate diffusion-limited aggregation and measure its fractal dimension',
            'Recognise anomalous diffusion and its signatures',
          ],
          concepts: [
            'Lattice random walk',
            'Mean squared displacement $\\langle r^2\\rangle = 2dDt$',
            'Master equation and continuum limit',
            'Brownian motion and the Wiener process',
            'Langevin equation and Euler-Maruyama integration',
            'Fluctuation-dissipation (Einstein) relation $D = k_BT/\\gamma$',
            'Diffusion-limited aggregation and fractal dimension',
            'Anomalous (sub/super) diffusion',
          ],
          explanation: `A particle that takes independent random steps of length $\\ell$ every $\\tau$ seconds has, after $n$ steps, a displacement that is a sum of independent vectors; by the central limit theorem it is Gaussian with variance growing linearly in time. The **mean squared displacement** $\\langle r^2\\rangle = n\\ell^2 = 2dDt$ in $d$ dimensions defines the **diffusion coefficient** $D = \\ell^2/(2d\\tau)$. Diffusion is therefore the macroscopic face of microscopic randomness: the spread grows like $\\sqrt t$, not $t$, which is why a dye drop takes minutes to spread a centimetre and years to spread a metre.

The connection to the PDE is exact in the continuum limit. For a 1D lattice walk the probability obeys the **master equation** $P(x, t + \\tau) = \\tfrac12P(x - \\ell, t) + \\tfrac12P(x + \\ell, t)$. Taylor-expanding in $\\tau$ and $\\ell$ gives $\\partial_tP = D\\,\\partial_x^2P$, the diffusion equation, whose Gaussian solution matches the walker histogram. You can therefore study diffusion either by simulating many walkers or by solving the PDE (module 5), and comparing the two is an excellent validation.

A **Brownian particle** in a fluid feels friction $-\\gamma v$ and random kicks from molecules. The **Langevin equation** $m\\dot v = -\\gamma v + \\xi(t)$ with white noise $\\langle\\xi(t)\\xi(t')\\rangle = 2\\gamma k_BT\\delta(t - t')$ describes it. Integrating a stochastic equation needs care: in the **Euler-Maruyama** scheme the noise increment over a step $h$ has standard deviation $\\propto\\sqrt h$, not $h$, so $v_{n+1} = v_n - (\\gamma/m)v_nh + \\sqrt{2\\gamma k_BTh}/m\\,\\eta_n$ with $\\eta_n \\sim N(0, 1)$. The noise strength is fixed by the **fluctuation-dissipation relation**, which ensures equipartition $\\langle\\tfrac12mv^2\\rangle = \\tfrac12k_BT$ and gives Einstein's $D = k_BT/\\gamma$. Langevin dynamics is also used as a thermostat in molecular dynamics.

Random walks with rules generate rich structures. In **diffusion-limited aggregation** (DLA), walkers released far away stick when they touch a growing cluster; the result is a branched fractal with dimension about 1.71 in 2D, a model for electrodeposits, lightning and mineral dendrites. Measure the fractal dimension from the mass-radius scaling $M(r) \\propto r^{d_f}$. Walks with long-range correlations or heavy-tailed steps show **anomalous diffusion**, $\\langle r^2\\rangle \\propto t^\\alpha$ with $\\alpha \\ne 1$, observed in crowded cells and turbulent flows.

Read Newman section 10.1 (random walks, DLA exercises) and the Hjorth-Jensen chapter on random walks and the Metropolis algorithm, then do the exercises, comparing walker histograms with Gaussian theory.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 10: Random processes (random walks, Brownian motion, DLA)',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'Computational Physics lecture notes (Hjorth-Jensen) — Random walks and the Metropolis algorithm',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
            },
            {
              title: 'MIT 6.0002 — Lectures on random walks and stochastic simulation',
              url: 'https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'msd-random-walk',
              title: 'Mean squared displacement of random walks',
              prompt:
                'Simulate $10^4$ walkers on a 2D square lattice for 1000 steps (vectorised over walkers). Plot $\\langle r^2\\rangle$ against $t$ and fit $D$; compare with $\\ell^2/(4\\tau)$. Histogram the $x$ positions at $t = 100$ and $1000$ and overlay the Gaussian solution of the diffusion equation. Then add a reflecting wall at $x = 20$ and compare the histogram with the method-of-images solution.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'langevin-brownian',
              title: 'Brownian motion with the Langevin equation',
              prompt:
                'Integrate the 1D Langevin equation with Euler-Maruyama for $m = 1$, $\\gamma = 1$, $k_BT = 1$ for an ensemble of 2000 particles. Verify (a) $\\langle v^2\\rangle \\to k_BT/m$, (b) the velocity autocorrelation decays as $e^{-\\gamma t/m}$, (c) $\\langle x^2\\rangle \\to 2Dt$ with $D = k_BT/\\gamma$ at long times and $\\propto t^2$ at short times. Show what goes wrong if the noise is incorrectly scaled with $h$ instead of $\\sqrt h$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'dla-fractal',
              title: 'Diffusion-limited aggregation',
              prompt:
                'Grow a DLA cluster of 5000 particles on a square lattice, launching walkers on a circle just outside the cluster and killing those that wander far away. Display the cluster coloured by arrival order. Measure the fractal dimension from $M(r)$ within radius $r$ of the seed on log-log axes (expect about 1.7). Discuss how the launch radius and kill radius affect run time and results.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the mean squared displacement of a random walk grow linearly in time?',
              answerOutline:
                'It is a sum of independent steps; variances add, so $\\langle r^2\\rangle = n\\ell^2 \\propto t$.',
            },
            {
              question: 'How is the diffusion equation obtained from a random walk?',
              answerOutline:
                'Write the master equation for $P(x,t)$, Taylor expand in $\\tau$ and $\\ell$, and take the limit with $D = \\ell^2/2\\tau$ fixed, giving $\\partial_tP = D\\partial_x^2P$.',
            },
            {
              question: 'Why does the noise term in Euler-Maruyama scale as $\\sqrt h$?',
              answerOutline:
                'The integral of white noise over a step (a Wiener increment) has variance proportional to $h$, so its standard deviation is $\\propto\\sqrt h$.',
            },
            {
              question: 'What does the fluctuation-dissipation relation guarantee in Langevin dynamics?',
              answerOutline:
                'That friction and noise are balanced so the system reaches thermal equilibrium at temperature $T$ (equipartition), and gives $D = k_BT/\\gamma$.',
            },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/central-limit-theorem'],
        },
        {
          slug: 'metropolis-and-the-ising-model',
          title: 'The Metropolis algorithm and the Ising model',
          summary:
            'Markov chain Monte Carlo for statistical mechanics: importance sampling of the Boltzmann distribution, the Ising model, measuring magnetisation and heat capacity, critical slowing down, and simulated annealing.',
          estimatedMinutes: 180,
          objectives: [
            'Explain why statistical-mechanics averages require importance sampling of the Boltzmann distribution',
            'Implement single-spin-flip Metropolis for the 2D Ising model efficiently (vectorised or Numba)',
            'Measure energy, magnetisation, heat capacity and susceptibility versus temperature with error bars from blocking',
            'Locate the phase transition and compare with Onsager\'s $T_c = 2/\\ln(1 + \\sqrt2)$',
            'Explain equilibration, autocorrelation and critical slowing down, and apply simulated annealing to an optimisation problem',
          ],
          concepts: [
            'Boltzmann distribution $P \\propto e^{-E/k_BT}$',
            'Markov chain with detailed balance',
            'Metropolis acceptance $\\min(1, e^{-\\Delta E/k_BT})$',
            'Ising model $E = -J\\sum_{\\langle ij\\rangle}s_is_j$',
            'Periodic boundary conditions',
            'Heat capacity and susceptibility from fluctuations',
            'Equilibration, autocorrelation, blocking analysis',
            'Critical slowing down; simulated annealing',
          ],
          explanation: `A thermal average $\\langle A\\rangle = \\sum_s A(s)e^{-E(s)/k_BT}/Z$ over the states of a 100×100 Ising lattice is a sum over $2^{10000}$ configurations. Uniform Monte Carlo is useless because almost all random configurations have negligible Boltzmann weight. The **Metropolis algorithm** samples configurations with probability proportional to their weight by building a Markov chain: propose a small change (flip one spin), compute the energy change $\\Delta E$, and accept with probability $\\min(1, e^{-\\Delta E/k_BT})$. This satisfies **detailed balance** with respect to the Boltzmann distribution, so after equilibration the chain visits states with the right frequencies and $\\langle A\\rangle$ is a simple average over the chain. $Z$ is never needed.

The **Ising model** $E = -J\\sum_{\\langle ij\\rangle}s_is_j$ with $s_i = \\pm1$ on a square lattice with **periodic boundaries** is the standard test bed. A single flip changes the energy by $\\Delta E = 2Js_i\\sum_{\\text{nbrs}}s_j$, which takes only five values, so the acceptance probabilities can be tabulated. Below the critical temperature the system orders spontaneously (nonzero magnetisation), above it disorders, and in 2D Onsager's exact solution gives $k_BT_c/J = 2/\\ln(1 + \\sqrt2) \\approx 2.269$, making this one of the few nontrivial simulations you can check exactly. Response functions come from fluctuations: $C = (\\langle E^2\\rangle - \\langle E\\rangle^2)/k_BT^2$ and $\\chi = (\\langle M^2\\rangle - \\langle|M|\\rangle^2)/k_BT$, both peaking near $T_c$ with heights that grow with lattice size (finite-size scaling).

Doing it correctly requires care. Start from a random or ordered state and discard the **equilibration** period (plot $E$ and $M$ against sweeps). Successive configurations are correlated, so error bars must account for the **autocorrelation time** $\\tau$: the effective sample count is $N/2\\tau$, and **blocking** (averaging in blocks and watching the error estimate plateau as block size grows) is the practical method. Near $T_c$ the correlation length diverges and single-spin flips decorrelate extremely slowly (**critical slowing down**, $\\tau \\sim L^z$ with $z \\approx 2$); cluster algorithms (Wolff, Swendsen-Wang) flip whole correlated clusters and largely cure it. Python loops over spins are slow; use a checkerboard update vectorised in NumPy or compile the loop with Numba.

The same machinery solves optimisation problems. **Simulated annealing** runs Metropolis on a cost function treated as energy while slowly lowering $T$, letting the system escape local minima early and settle into a good minimum; it is a classic approach to the travelling salesman problem.

Read Newman sections 10.3-10.4 (Monte Carlo simulation, simulated annealing), the Hjorth-Jensen Ising project, and the probability-statistics MCMC lesson for the theory of Markov chains and diagnostics.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Sections 10.3-10.4: Monte Carlo simulation, Ising model, simulated annealing',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'Computational Physics lecture notes and code (Hjorth-Jensen) — Ising model project',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'problem-set',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
              note: 'The Ising-model project with expected results for small lattices that can be checked analytically.',
            },
            {
              title: 'MIT 8.333 Statistical Mechanics I (Kardar) — lectures on the Ising model',
              url: 'https://ocw.mit.edu/courses/8-333-statistical-mechanics-i-statistical-mechanics-of-particles-fall-2013/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The statistical-physics background; use for the meaning of the transition and critical exponents.',
            },
            {
              title: 'Numba documentation',
              url: 'https://numba.readthedocs.io/en/stable/',
              type: 'tool',
              cost: 'free',
              provider: 'Numba',
              note: 'Compile the spin-update loop with @njit for a 50-100x speed-up.',
            },
          ],
          exercises: [
            {
              slug: 'ising-metropolis',
              title: 'Metropolis simulation of the 2D Ising model',
              prompt:
                'Implement single-spin-flip Metropolis for the 2D Ising model with periodic boundaries and $J = k_B = 1$ (use Numba or a checkerboard vectorisation). For $L = 32$, sweep $T$ from 1.5 to 3.5 in steps of 0.05, equilibrating at each $T$, and measure $\\langle E\\rangle$, $\\langle|M|\\rangle$, $C$ and $\\chi$ per spin with blocking error bars. Plot them and locate the peaks; compare with $T_c = 2.269$ and with Onsager\'s exact $\\langle|M|\\rangle = (1 - \\sinh^{-4}(2/T))^{1/8}$ below $T_c$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'small-lattice-exact-check',
              title: 'Validate against exact enumeration',
              prompt:
                'For a $3\\times3$ (or $4\\times4$) periodic Ising lattice, enumerate all $2^{9}$ (or $2^{16}$) configurations to compute exact $\\langle E\\rangle$, $C$ and $\\langle|M|\\rangle$ at $T = 1, 2.269, 4$. Run your Metropolis code on the same lattice and show agreement within statistical errors. This is your test that the code samples the right distribution.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'critical-slowing-down',
              title: 'Autocorrelation and critical slowing down',
              prompt:
                'Measure the integrated autocorrelation time of $|M|$ for $L = 8, 16, 32, 64$ at $T = T_c$ and at $T = 3.0$ using single-spin Metropolis. Fit $\\tau \\propto L^z$ at $T_c$ (expect $z \\approx 2.1$). Implement the Wolff cluster algorithm and repeat, showing the dramatic reduction of $\\tau$ at $T_c$. Explain why error bars that ignore $\\tau$ are wrong.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'simulated-annealing-tsp',
              title: 'Simulated annealing for the travelling salesman',
              prompt:
                'Place 50 cities at random in the unit square. Minimise the tour length by simulated annealing with moves that reverse a segment of the tour, using an exponential cooling schedule. Plot the tour and the length versus temperature. Compare the result for slow and fast cooling and with a greedy nearest-neighbour tour. Run 10 seeds and report the spread of final lengths.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a statistical-mechanics average not be computed by uniform random sampling of configurations?',
              answerOutline:
                'The number of states is astronomically large and almost all have negligible Boltzmann weight; uniform samples would essentially never hit the important region.',
            },
            {
              question: 'State the Metropolis acceptance rule and why it produces the Boltzmann distribution.',
              answerOutline:
                'Accept with $\\min(1, e^{-\\Delta E/k_BT})$; with symmetric proposals this satisfies detailed balance with respect to $e^{-E/k_BT}$, making it the stationary distribution.',
            },
            {
              question: 'How are the heat capacity and susceptibility obtained from a simulation?',
              answerOutline:
                'From fluctuations: $C = \\operatorname{Var}(E)/k_BT^2$ and $\\chi = \\operatorname{Var}(M)/k_BT$ (with $|M|$ in finite systems).',
            },
            {
              question: 'What is critical slowing down and how do cluster algorithms help?',
              answerOutline:
                'Near $T_c$ correlated domains are large and single-spin flips decorrelate slowly ($\\tau \\sim L^z$); cluster algorithms flip whole correlated clusters, reducing $z$ dramatically.',
            },
          ],
          relatedLessons: [
            'probability-statistics/bayesian-inference-and-mcmc/mcmc-sampling',
            'thermodynamics-statistical-mechanics/phase-transitions-and-critical-phenomena/the-ising-model-and-mean-field-theory',
          ],
        },
      ],
      project: {
        slug: 'ising-finite-size-study',
        title: 'Module project: finite-size scaling of the 2D Ising model',
        description:
          'Using an optimised Metropolis or Wolff code, simulate the 2D Ising model for $L = 8, 16, 32, 64, 128$ across the critical region with careful equilibration and blocking error analysis. Locate $T_c(L)$ from the susceptibility peaks and the Binder cumulant crossing, extrapolate to $L \\to \\infty$, and estimate the critical exponents $\\gamma/\\nu$ and $\\beta/\\nu$ from the scaling of the peak susceptibility and the magnetisation at $T_c$. Compare with the exact values ($T_c = 2.269$, $\\gamma/\\nu = 7/4$, $\\beta/\\nu = 1/8$) and produce a data-collapse plot.',
        deliverables: [
          'Simulation code with a test against exact enumeration on a small lattice',
          'Plots of $C$, $\\chi$ and the Binder cumulant versus $T$ for all $L$ with error bars',
          'Finite-size scaling fits and a data-collapse figure, with exponent estimates compared to exact values',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'pdes-and-field-simulation',
      title: 'PDEs and Field Simulation',
      description:
        'Solving the partial differential equations of physics on grids: relaxation methods for Laplace and Poisson, explicit and implicit schemes for diffusion, finite-difference wave propagation and the stability analysis that governs them all.',
      lessons: [
        {
          slug: 'laplace-and-poisson-relaxation',
          title: 'Laplace and Poisson equations: relaxation methods',
          summary:
            'Elliptic PDEs on a grid: the five-point Laplacian, Jacobi and Gauss-Seidel relaxation, successive over-relaxation, convergence criteria and boundary conditions, applied to electrostatics.',
          estimatedMinutes: 150,
          objectives: [
            'Discretise the Laplace and Poisson equations with the five-point stencil and impose Dirichlet and Neumann boundaries',
            'Implement Jacobi, Gauss-Seidel and SOR iterations and compare their convergence',
            'Choose a stopping criterion and verify second-order spatial accuracy against an analytic solution',
            'Explain why relaxation is slow for fine grids and how multigrid or sparse direct solvers fix it',
            'Compute potentials and fields of electrostatic configurations (capacitors, conductors in boxes)',
          ],
          concepts: [
            'Elliptic PDE and boundary-value problem',
            'Five-point Laplacian stencil',
            'Jacobi iteration as averaging',
            'Gauss-Seidel and red-black ordering',
            'Successive over-relaxation and optimal $\\omega$',
            'Convergence criterion and residual',
            'Dirichlet and Neumann boundaries; ghost points',
            'Multigrid (concept) and sparse direct solve',
          ],
          explanation: `Laplace's equation $\\nabla^2\\phi = 0$ and Poisson's equation $\\nabla^2\\phi = -\\rho/\\epsilon_0$ describe electrostatics, gravity, steady heat flow and incompressible potential flow. On a square grid with spacing $a$, the **five-point stencil** $\\nabla^2\\phi \\approx [\\phi_{i+1,j} + \\phi_{i-1,j} + \\phi_{i,j+1} + \\phi_{i,j-1} - 4\\phi_{i,j}]/a^2$ turns Laplace's equation into the statement that every interior value is the **average of its four neighbours**, with $O(a^2)$ error. This is the discrete version of the mean-value property of harmonic functions, and it suggests the simplest solver.

**Jacobi relaxation**: start from any guess, replace every interior value by the average of its neighbours (plus $a^2\\rho/4\\epsilon_0$ for Poisson), keeping boundary values fixed, and repeat until the change is below a tolerance. In NumPy this is one vectorised slicing expression per iteration. **Gauss-Seidel** uses updated values as soon as they are available, which converges about twice as fast and needs no second array (vectorise it with **red-black** checkerboard ordering). **Successive over-relaxation** overshoots each update by a factor $\\omega \\in (1, 2)$: $\\phi \\leftarrow (1+\\omega)\\phi_{GS} - \\omega\\phi$ in Newman's notation, or $\\phi \\leftarrow \\phi + \\omega(\\phi_{GS} - \\phi)$ in the usual one; near the optimal $\\omega \\approx 2/(1 + \\pi/N)$ it converges in $O(N)$ sweeps instead of $O(N^2)$.

Two pitfalls. The **stopping criterion** "change per iteration below $\\delta$" can be satisfied long before convergence, since slow methods change little per sweep; monitor the residual $\\|\\nabla^2\\phi + \\rho/\\epsilon_0\\|$ and test against a known solution. And **boundary conditions** must be implemented consistently with the stencil's accuracy: Dirichlet values are simply fixed; Neumann conditions ($\\partial_n\\phi = 0$, an insulating or symmetry boundary) use ghost points mirrored across the boundary.

Relaxation's slowness has a clear cause: each sweep moves information one grid cell, and long-wavelength errors decay at a rate $\\sim(\\pi/N)^2$. **Multigrid** methods smooth on a hierarchy of coarser grids and converge in $O(N^2)$ total work in 2D, which is optimal; for moderate sizes a sparse direct solve with \`scipy.sparse.linalg.spsolve\` on the assembled Laplacian is simplest and fast. For periodic domains, the FFT solves Poisson's equation exactly (module 6).

Read Newman section 9.1-9.2 (boundary value problems, relaxation, Gauss-Seidel, SOR; part of the free chapter 9) and the Hjorth-Jensen PDE notes, then do the exercises, including the convergence test against an analytic solution from the math-methods separation-of-variables lesson.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 9: Partial differential equations (9.1-9.2)',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'Jacobi, Gauss-Seidel and over-relaxation for electrostatics; chapter 9 is a free sample chapter.',
              primary: true,
            },
            {
              title: 'Finite Difference Computing with PDEs (Langtangen and Linge) — open book',
              url: 'https://hplgit.github.io/fdm-book/doc/pub/book/sphinx/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Simula / Springer Open',
              note: 'A thorough, free treatment of finite-difference methods with Python code; used throughout this module.',
            },
            {
              title: 'SciPy — Sparse linear algebra (spsolve, cg)',
              url: 'https://docs.scipy.org/doc/scipy/reference/sparse.linalg.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
          ],
          exercises: [
            {
              slug: 'capacitor-relaxation',
              title: 'Parallel-plate capacitor in a grounded box',
              prompt:
                'Following Newman exercise 9.3, compute the potential in a 10 cm square grounded box containing two 6 cm plates at $\\pm1$ V, 6 cm apart, on a $100\\times100$ grid, with Jacobi, Gauss-Seidel and SOR (try several $\\omega$). Plot the potential and field lines. Record iterations to reach a residual of $10^{-6}$ for each method and find the optimal $\\omega$ empirically; compare with $2/(1 + \\pi/N)$.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'relaxation-convergence-test',
              title: 'Convergence test against an analytic solution',
              prompt:
                'Solve Laplace\'s equation on the unit square with $\\phi = \\sin\\pi x$ on the top edge and zero elsewhere, whose exact solution is $\\sin(\\pi x)\\sinh(\\pi y)/\\sinh\\pi$. Using SOR or a sparse direct solve, compute the maximum error for $N = 16, 32, 64, 128, 256$ and confirm second-order convergence. Show that stopping the iteration with a loose tolerance creates an error floor larger than the discretisation error.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'poisson-charge-distribution',
              title: 'Poisson\'s equation with charges and a Neumann boundary',
              prompt:
                'Solve Poisson\'s equation in a 2D box for two square charge distributions of opposite sign, first with all boundaries grounded and then with an insulating (Neumann) boundary on one side implemented with ghost points. Compare the potentials, verify Gauss\'s law numerically by computing the flux of $-\\nabla\\phi$ around one charge, and time SOR against `spsolve` on the assembled sparse matrix for $N = 256$.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the five-point stencil say about the solution of Laplace\'s equation?',
              answerOutline:
                'Each interior value equals the average of its four neighbours (discrete mean-value property), with $O(a^2)$ truncation error.',
            },
            {
              question: 'Why does Jacobi relaxation converge slowly on fine grids?',
              answerOutline:
                'Information propagates one cell per sweep; the slowest (longest-wavelength) error modes decay by a factor $\\approx 1 - (\\pi/N)^2$ per sweep, requiring $O(N^2)$ sweeps.',
            },
            {
              question: 'Why is "change per iteration below tolerance" a dangerous stopping criterion?',
              answerOutline:
                'A slowly converging method changes little per step while still far from the solution; monitor the residual and verify against known solutions.',
            },
            {
              question: 'How is a Neumann boundary condition implemented in a finite-difference grid?',
              answerOutline:
                'With ghost points outside the domain set equal to the mirrored interior values (for zero normal derivative), keeping second-order accuracy.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/separation-of-variables'],
        },
        {
          slug: 'diffusion-equation-schemes',
          title: 'The diffusion equation: FTCS, implicit and Crank-Nicolson schemes',
          summary:
            'Time-dependent parabolic PDEs: the method of lines, the explicit FTCS scheme and its stability limit, von Neumann stability analysis, and unconditionally stable implicit and Crank-Nicolson schemes.',
          estimatedMinutes: 180,
          objectives: [
            'Discretise the diffusion equation with the method of lines and the FTCS scheme',
            'Derive the stability condition $D\\Delta t/\\Delta x^2 \\le 1/2$ by von Neumann analysis and observe instability when it is violated',
            'Implement backward-Euler (implicit) and Crank-Nicolson schemes with tridiagonal or sparse solvers',
            'Compare accuracy and cost of the schemes and measure their convergence orders in space and time',
            'Solve a physical diffusion problem (heat in a rod or the Earth\'s crust) and validate against an analytic solution',
          ],
          concepts: [
            'Method of lines',
            'FTCS (forward-time centred-space) scheme',
            'von Neumann stability analysis and amplification factor',
            'Stability limit $r = D\\Delta t/\\Delta x^2 \\le 1/2$',
            'Implicit (backward Euler) scheme',
            'Crank-Nicolson scheme',
            'Unconditional stability versus accuracy',
            'Stiffness of discretised PDEs',
          ],
          explanation: `The diffusion (heat) equation $\\partial_tu = D\\partial_x^2u$ is first order in time, so it can be treated as a huge system of ODEs: discretise space with the three-point stencil and you get $\\dot u_j = D(u_{j+1} - 2u_j + u_{j-1})/\\Delta x^2$, one equation per grid point. This **method of lines** connects PDEs to the ODE module directly. Advancing with forward Euler gives the **FTCS** scheme

$$u_j^{n+1} = u_j^n + r\\,(u_{j+1}^n - 2u_j^n + u_{j-1}^n), \\qquad r = \\frac{D\\Delta t}{\\Delta x^2},$$

first order in time and second order in space, and trivially vectorised.

Run it with too large a time step and it explodes into a sawtooth. **Von Neumann stability analysis** explains why: substitute a Fourier mode $u_j^n = \\xi^ne^{ikj\\Delta x}$ and find the amplification factor $\\xi = 1 - 4r\\sin^2(k\\Delta x/2)$. Stability requires $|\\xi| \\le 1$ for all $k$, and the shortest wavelength ($k\\Delta x = \\pi$) gives $r \\le 1/2$. So $\\Delta t \\le \\Delta x^2/2D$: halving the grid spacing forces four times as many time steps, and fine grids become prohibitively expensive. This is **stiffness** again: the discretised system has eigenvalues ranging from $-D\\pi^2/L^2$ to $-4D/\\Delta x^2$, and an explicit method must resolve the fastest even though it decays instantly.

The cure is implicit time stepping. **Backward Euler** evaluates the spatial derivative at the new time: $u_j^{n+1} - r(u_{j+1}^{n+1} - 2u_j^{n+1} + u_{j-1}^{n+1}) = u_j^n$, a tridiagonal system per step, solved in $O(N)$. Its amplification factor $1/(1 + 4r\\sin^2(k\\Delta x/2))$ is below 1 for every $r$: **unconditionally stable**. **Crank-Nicolson** averages the explicit and implicit stencils, giving second-order accuracy in time as well as space and still unconditional stability, at the same tridiagonal cost; it is the standard choice. But stability is not accuracy: Crank-Nicolson with a very large $r$ damps short wavelengths poorly and produces decaying oscillations near sharp features, so choose $\\Delta t$ for the accuracy you need, not merely for stability.

In 2D and 3D the implicit systems are sparse rather than tridiagonal; use sparse solvers or alternating-direction implicit (ADI) splitting. Read Newman section 9.3 (initial value problems, FTCS, stability, implicit and Crank-Nicolson methods) and the diffusion chapter of Langtangen and Linge, then do the exercises: provoking the FTCS instability on purpose is the fastest way to understand it.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Section 9.3: Initial value problems (FTCS, stability, Crank-Nicolson)',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'Finite Difference Computing with PDEs (Langtangen and Linge) — Diffusion equations chapter',
              url: 'https://hplgit.github.io/fdm-book/doc/pub/book/sphinx/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Simula / Springer Open',
              note: 'Detailed stability and accuracy analysis of the theta-rule family including Crank-Nicolson.',
            },
            {
              title: 'MIT 18.085 Computational Science and Engineering I — lectures on the heat equation and finite differences',
              url: 'https://ocw.mit.edu/courses/18-085-computational-science-and-engineering-i-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'ftcs-instability',
              title: 'Provoke and explain the FTCS instability',
              prompt:
                'Solve the heat equation on $[0, 1]$ with $u = 0$ at both ends and $u(x, 0) = \\sin\\pi x + 0.1\\sin 20\\pi x$ by FTCS with $r = 0.4, 0.5, 0.51, 0.6$. Plot snapshots and the maximum of $|u|$ versus time on a log axis. Derive the amplification factor and show the observed growth rate of the unstable mode matches $|\\xi|$ for $k\\Delta x = \\pi$.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'crank-nicolson-implementation',
              title: 'Implicit and Crank-Nicolson schemes',
              prompt:
                'Implement backward Euler and Crank-Nicolson for the same problem using `scipy.linalg.solve_banded`. Measure the error at $t = 0.1$ against the exact solution for a range of $\\Delta t$ at fixed fine $\\Delta x$ and confirm first- and second-order convergence in time. Show both remain stable at $r = 50$, and demonstrate the spurious oscillations of Crank-Nicolson for a step-function initial condition at large $r$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'earth-crust-temperature',
              title: 'Annual temperature wave in the Earth\'s crust',
              prompt:
                'Following Newman exercise 9.4, the surface temperature varies as $T_0(t) = A + B\\sin(2\\pi t/\\tau)$ with $A = 10$ C, $B = 12$ C, $\\tau = 365$ days; the bottom at 20 m is held at 11 C; $D = 0.1$ m$^2$/day. Simulate 10 years with Crank-Nicolson, then plot four temperature profiles over the final year. Compare the decay depth and phase lag of the temperature wave with the analytic $e^{-z/\\delta}$, $\\delta = \\sqrt{D\\tau/\\pi}$.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the FTCS stability condition in two lines.',
              answerOutline:
                'Substitute $\\xi^ne^{ikj\\Delta x}$: $\\xi = 1 - 4r\\sin^2(k\\Delta x/2)$; requiring $|\\xi| \\le 1$ for $k\\Delta x = \\pi$ gives $r = D\\Delta t/\\Delta x^2 \\le 1/2$.',
            },
            {
              question: 'Why is the explicit scheme so expensive on fine grids?',
              answerOutline:
                'Stability forces $\\Delta t \\propto \\Delta x^2$, so halving $\\Delta x$ quadruples the number of time steps (8x total cost in 1D).',
            },
            {
              question: 'What advantages does Crank-Nicolson have over backward Euler?',
              answerOutline:
                'Both are unconditionally stable and tridiagonal; CN is second order in time while backward Euler is first order (but BE damps short wavelengths more robustly).',
            },
            {
              question: 'Is an unconditionally stable scheme accurate at any time step?',
              answerOutline:
                'No; stability only prevents blow-up. Accuracy still requires $\\Delta t$ small compared with the time scales of interest; CN at large $r$ gives oscillatory artefacts.',
            },
          ],
        },
        {
          slug: 'wave-equation-and-hyperbolic-pdes',
          title: 'The wave equation and hyperbolic PDEs',
          summary:
            'Finite-difference time domain for waves: the leapfrog scheme for the wave equation, the CFL condition, numerical dispersion, advection schemes and upwinding, and boundary conditions that absorb outgoing waves.',
          estimatedMinutes: 150,
          objectives: [
            'Discretise the 1D and 2D wave equation with the second-order centred (leapfrog) scheme',
            'Derive the Courant-Friedrichs-Lewy condition $c\\Delta t/\\Delta x \\le 1$ and explain it physically',
            'Measure numerical dispersion and its dependence on resolution',
            'Solve the advection equation with upwind and Lax-Wendroff schemes and explain numerical diffusion',
            'Implement fixed, free and simple absorbing boundary conditions and simulate a physical wave problem',
          ],
          concepts: [
            'Hyperbolic PDEs and characteristics',
            'Centred-difference (leapfrog) scheme for $u_{tt} = c^2u_{xx}$',
            'Courant number and the CFL condition',
            'Numerical dispersion and phase error',
            'Advection equation and FTCS instability',
            'Upwind scheme and numerical diffusion',
            'Lax-Wendroff scheme',
            'Absorbing boundaries (Mur, sponge layers)',
          ],
          explanation: `Waves are governed by **hyperbolic** PDEs: information travels at finite speed along characteristics, and that single fact controls everything about solving them numerically. For $u_{tt} = c^2u_{xx}$, centred differences in both time and space give the explicit **leapfrog** scheme

$$u_j^{n+1} = 2u_j^n - u_j^{n-1} + C^2(u_{j+1}^n - 2u_j^n + u_{j-1}^n), \\qquad C = \\frac{c\\Delta t}{\\Delta x},$$

second order in space and time, needing two previous time levels (start it with a Taylor step from the initial velocity). Von Neumann analysis gives the **Courant-Friedrichs-Lewy (CFL)** condition $C \\le 1$: the numerical domain of dependence must contain the physical one, i.e. in one time step a signal must not travel further than one grid cell. Violate it and the scheme explodes; at exactly $C = 1$ in 1D the scheme is exact, a coincidence that does not survive in 2D or with variable $c$.

Below the CFL limit the scheme is stable but not perfect. **Numerical dispersion**: different wavelengths travel at slightly different numerical speeds, $\\omega_{num}(k) \\ne ck$, with errors growing as $(k\\Delta x)^2$, so a sharp pulse develops trailing ripples. The cure is resolution: about 10-20 grid points per wavelength for the shortest wave you care about. This is the basis of FDTD electromagnetic simulation (the Yee scheme for Maxwell's equations is leapfrog on a staggered grid) and of seismic modelling.

The first-order **advection equation** $u_t + cu_x = 0$ is deceptively harder. FTCS is *unconditionally unstable* for it. The **upwind** scheme uses a one-sided difference from the direction the wave comes from, $u_j^{n+1} = u_j^n - C(u_j^n - u_{j-1}^n)$ for $c > 0$; it is stable for $C \\le 1$ but adds **numerical diffusion** (it effectively solves an advection-diffusion equation), smearing sharp features. **Lax-Wendroff** is second order and less diffusive but creates oscillations near discontinuities. Choosing between dissipation and dispersion errors, and the flux-limiter schemes that combine them, is the core of computational fluid dynamics.

Boundaries matter for waves: fixed ends reflect with inversion, free ends without; to simulate an open domain you need **absorbing boundaries** (Mur's first-order condition, or a damping "sponge" layer) so outgoing waves do not reflect back into the region of interest.

Read Newman section 9.3.3 onward (the wave equation and stability), the Langtangen and Linge wave-equation chapter, and revisit waves-optics for the physics. Then do the exercises; measuring dispersion against resolution is the key quantitative skill.`,
          resources: [
            {
              title: 'Finite Difference Computing with PDEs (Langtangen and Linge) — Wave equations chapter',
              url: 'https://hplgit.github.io/fdm-book/doc/pub/book/sphinx/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Simula / Springer Open',
              note: 'Leapfrog scheme, stability, numerical dispersion relation and boundary conditions with Python code.',
              primary: true,
            },
            {
              title: 'Computational Physics (Newman) — Section 9.3: The wave equation and stability analysis',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
            },
            {
              title: 'MIT 8.03SC Physics III: Vibrations and Waves',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The physics of dispersion and reflection to compare against your numerical results.',
            },
          ],
          exercises: [
            {
              slug: 'string-leapfrog-cfl',
              title: 'Vibrating string and the CFL condition',
              prompt:
                'Simulate a plucked string (fixed ends, triangular initial shape, zero velocity) with the leapfrog scheme for Courant numbers $C = 0.5, 0.9, 1.0, 1.01$. Animate the motion, compare with the analytic Fourier-series solution, and show the instability at $C > 1$. Check energy conservation (discrete kinetic plus potential) for stable runs.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'numerical-dispersion',
              title: 'Measure numerical dispersion',
              prompt:
                'Derive the numerical dispersion relation of the leapfrog scheme, $\\sin(\\omega\\Delta t/2) = C\\sin(k\\Delta x/2)$. Propagate a Gaussian pulse of width 10 cells over 500 cells with $C = 0.5$, measure the pulse shape and the trailing ripples, and compare with the predicted phase velocity error versus $k\\Delta x$. Repeat with 5, 10 and 20 cells per pulse width and recommend a resolution.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'advection-schemes',
              title: 'Advection: FTCS, upwind and Lax-Wendroff',
              prompt:
                'Advect a square pulse and a Gaussian with $u_t + u_x = 0$ on a periodic domain for one full period using FTCS, upwind and Lax-Wendroff with $C = 0.8$. Plot the final profiles against the exact (unchanged) profile and compute the $L_2$ errors. Explain the instability, the smearing and the oscillations in terms of dissipation and dispersion, and show the upwind scheme\'s smearing matches an equivalent diffusion coefficient $\\tfrac12c\\Delta x(1 - C)$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: '2d-wave-absorbing',
              title: '2D waves with an absorbing boundary',
              prompt:
                'Simulate the 2D wave equation on a $400\\times400$ grid with a point source oscillating at fixed frequency, first with reflecting boundaries and then with a 30-cell sponge layer (damping that ramps up toward the edge). Show the standing-wave pattern in the first case and outgoing circular waves in the second; quantify the reflection coefficient of the sponge by comparing amplitudes. Add a slit barrier and observe diffraction.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the CFL condition and its physical meaning.',
              answerOutline:
                '$c\\Delta t/\\Delta x \\le 1$ (in 1D): the numerical domain of dependence must include the physical one; a wave must not cross more than one cell per step.',
            },
            {
              question: 'What is numerical dispersion and how do you reduce it?',
              answerOutline:
                'Different wavelengths propagate at different numerical speeds, distorting pulses; reduce by resolving waves with more points per wavelength (or higher-order schemes).',
            },
            {
              question: 'Why does the upwind scheme smear sharp features?',
              answerOutline:
                'Its truncation error acts like a diffusion term $\\tfrac12c\\Delta x(1 - C)u_{xx}$ (numerical diffusion).',
            },
            {
              question: 'Why are absorbing boundaries needed and how can they be built?',
              answerOutline:
                'To mimic an infinite domain without reflections; use one-way wave (Mur) conditions or damping sponge layers / PMLs at the edges.',
            },
          ],
        },
      ],
      project: {
        slug: 'heat-and-wave-solver',
        title: 'Module project: a validated 2D field solver',
        description:
          'Write a 2D finite-difference solver package with three modes: Poisson (SOR and sparse direct), diffusion (Crank-Nicolson with ADI or sparse solves) and waves (leapfrog with sponge boundaries). Validate each mode against an analytic solution with a convergence study, then apply it to one physical problem in each class: the field of a parallel-plate capacitor with fringing, the cooling of a hot square plate, and the interference pattern behind a double slit. Document stability limits and measured orders.',
        deliverables: [
          'Python package with tests reproducing three analytic solutions to stated tolerances',
          'Convergence plots for each mode and a table of stability limits',
          'Figures and animations for the three physical applications with short explanations',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'spectral-methods-and-data',
      title: 'Spectral Methods and Data',
      description:
        'The FFT in practice: the discrete Fourier transform and its pitfalls, spectral analysis of real signals, filtering and convolution, spectral PDE solvers, and fitting models to data.',
      lessons: [
        {
          slug: 'the-fft-in-practice',
          title: 'The discrete Fourier transform and the FFT in practice',
          summary:
            'The DFT and the Cooley-Tukey FFT, frequency grids, the Nyquist limit and aliasing, spectral leakage and windowing, zero-padding, and power spectra with correct normalisation.',
          estimatedMinutes: 150,
          objectives: [
            'Define the DFT, implement it directly, and explain how the FFT reduces the cost to $O(N\\log N)$',
            'Construct correct frequency axes with numpy.fft.fftfreq/rfftfreq and interpret the output ordering',
            'Explain sampling, the Nyquist frequency and aliasing, and design a sampling rate',
            'Diagnose spectral leakage and reduce it with window functions; understand zero-padding',
            'Compute and normalise power spectral densities (periodogram, Welch) so that Parseval holds',
          ],
          concepts: [
            'DFT $X_k = \\sum_n x_ne^{-2\\pi ikn/N}$',
            'Cooley-Tukey FFT, $O(N\\log N)$',
            'Frequency resolution $1/T$ and Nyquist frequency $f_s/2$',
            'Aliasing',
            'Spectral leakage and window functions (Hann)',
            'Zero-padding interpolates, does not add resolution',
            'Real FFT and output ordering',
            'Power spectral density, periodogram, Welch method',
          ],
          explanation: `Sample a signal at $N$ equally spaced times $t_n = n\\Delta t$ and its **discrete Fourier transform** is $X_k = \\sum_{n=0}^{N-1}x_ne^{-2\\pi ikn/N}$, with inverse $x_n = \\frac1N\\sum_kX_ke^{2\\pi ikn/N}$. Computed directly this costs $N^2$ operations; the **fast Fourier transform** (Cooley-Tukey) splits the sum into even and odd samples recursively and costs $O(N\\log N)$, the difference between hours and milliseconds for $N = 10^6$. It is one of the most important algorithms in science, and NumPy and SciPy provide excellent implementations (\`numpy.fft\`, \`scipy.fft\`).

Using it correctly is mostly bookkeeping. The frequencies are $f_k = k/(N\\Delta t)$, so the **frequency resolution** is $1/T$ where $T = N\\Delta t$ is the record length, and the output is ordered with zero frequency first, then positive frequencies, then negative ones from the most negative upward; \`fftfreq\` gives the axis and \`fftshift\` reorders for plotting. For real signals \`rfft\` returns only non-negative frequencies. The highest representable frequency is the **Nyquist frequency** $f_s/2$; any content above it is **aliased**, folded back to a lower frequency indistinguishable from real signal. Aliasing cannot be undone after sampling, which is why instruments filter before digitising.

The DFT implicitly treats the record as one period of a periodic signal. If a sinusoid does not complete an integer number of cycles in $T$, the wrap-around creates a discontinuity and its power **leaks** into neighbouring frequencies with slowly decaying sidelobes. Multiplying by a smooth **window** (Hann, Blackman) that tapers to zero at the ends suppresses leakage at the cost of slightly broader peaks. **Zero-padding** (appending zeros) produces a finer frequency grid that interpolates the spectrum smoothly, but it does not improve the true resolution, which is fixed by $T$.

Normalisation conventions are a perennial source of error. Decide whether you want amplitude, power or **power spectral density** (power per unit frequency), and check with **Parseval's theorem**: $\\sum|x_n|^2 = \\frac1N\\sum|X_k|^2$. A single periodogram of a noisy signal has a variance as large as its mean at every frequency; averaging periodograms of overlapping windowed segments (**Welch's method**, \`scipy.signal.welch\`) trades resolution for a stable estimate.

Read Newman chapter 7 (Fourier transforms; free sample), the NumPy FFT documentation and the SciPy FFT and signal tutorials, and review the math-methods Fourier lessons for the continuous theory. Then do the exercises, always predicting the spectrum before computing it.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Chapter 7: Fourier transforms',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              note: 'DFT, FFT derivation and applications; a free sample chapter.',
              primary: true,
            },
            {
              title: 'SciPy — Fourier transforms (scipy.fft) tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/fft.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Normalisation, real transforms, fftfreq, windowing examples.',
            },
            {
              title: 'NumPy — Discrete Fourier Transform (numpy.fft)',
              url: 'https://numpy.org/doc/stable/reference/routines.fft.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
            },
            {
              title: 'SciPy — Signal processing (scipy.signal) tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/signal.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Windows, periodograms, Welch PSD estimates and filter design.',
            },
          ],
          exercises: [
            {
              slug: 'dft-vs-fft',
              title: 'Write the DFT and an FFT',
              prompt:
                'Implement the DFT as a matrix-vector product and a recursive radix-2 Cooley-Tukey FFT. Verify both against `numpy.fft.fft` to $10^{-10}$ for random input, and time all three for $N = 2^6..2^{14}$ (direct DFT only up to $2^{12}$). Plot time against $N$ and confirm the $N^2$ and $N\\log N$ scalings.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'aliasing-and-leakage',
              title: 'Aliasing, leakage and windows',
              prompt:
                'Sample $\\sin(2\\pi\\cdot 7.3t) + 0.01\\sin(2\\pi\\cdot 11t)$ at 50 Hz for 4 s. Compute the amplitude spectrum with and without a Hann window, on a log scale, and show the weak 11 Hz line is hidden by leakage without windowing. Then sample a 40 Hz sinusoid at 50 Hz and predict and confirm the aliased frequency. Show that zero-padding to 16x length smooths the spectrum without separating two lines at 7.3 and 7.5 Hz.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'psd-normalisation',
              title: 'Normalise a power spectral density',
              prompt:
                'Generate white Gaussian noise of variance $\\sigma^2 = 4$ sampled at 1 kHz for 100 s. Compute the one-sided PSD with your own periodogram (correct normalisation) and with `scipy.signal.welch`; both should average $2\\sigma^2/f_s$ per Hz. Verify Parseval: the integral of the PSD equals the variance. Then add a 60 Hz line of amplitude 0.1 and measure its power from the PSD.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What sets the frequency resolution and the maximum frequency of a DFT?',
              answerOutline:
                'Resolution $1/T$ (record length); maximum unaliased frequency is Nyquist $f_s/2 = 1/(2\\Delta t)$.',
            },
            {
              question: 'What is aliasing and can it be removed after sampling?',
              answerOutline:
                'Content above Nyquist folds to lower frequencies indistinguishably; it cannot be removed afterwards, only prevented by anti-alias filtering or faster sampling.',
            },
            {
              question: 'Why do windows reduce spectral leakage and what do they cost?',
              answerOutline:
                'They taper the record smoothly to zero, removing the wrap-around discontinuity that spreads power into sidelobes; the cost is a broader main peak and some lost signal power.',
            },
            {
              question: 'Does zero-padding improve frequency resolution?',
              answerOutline:
                'No; it interpolates the spectrum on a finer grid but the ability to separate close lines is still set by $1/T$.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
        },
        {
          slug: 'filtering-convolution-and-spectral-solvers',
          title: 'Filtering, convolution and spectral PDE solvers',
          summary:
            'Using the FFT as a tool: filtering and smoothing signals, fast convolution and correlation, and spectral methods that solve the Poisson, diffusion and Schrödinger equations with exponential accuracy.',
          estimatedMinutes: 150,
          objectives: [
            'Filter signals in the frequency domain and with designed digital filters, understanding phase and edge effects',
            'Compute convolutions and cross-correlations with FFTs and handle wrap-around with padding',
            'Solve the periodic Poisson equation with the FFT and verify spectral accuracy',
            'Implement a pseudo-spectral or split-step Fourier solver for the diffusion or time-dependent Schrödinger equation',
            'Explain when spectral methods beat finite differences and when they fail (non-smooth solutions, non-periodic domains)',
          ],
          concepts: [
            'Low-pass, high-pass and band-pass filtering',
            'Ringing from sharp frequency cut-offs; smooth filters',
            'Convolution theorem; circular vs linear convolution',
            'Cross-correlation for time delays and template matching',
            'Spectral differentiation $\\partial_x \\to ik$',
            'FFT Poisson solver',
            'Split-step Fourier method',
            'Spectral (exponential) accuracy and the Gibbs problem',
          ],
          explanation: `Once you can move between time (or space) and frequency in $O(N\\log N)$, many operations become cheap. **Filtering** is the simplest: transform, multiply by a frequency response $H(f)$, transform back. A brick-wall cut-off causes **ringing** (Gibbs oscillations) in the time domain, so use smooth responses (Gaussian, Butterworth); for causal or streaming applications design a digital filter with \`scipy.signal\` and use \`filtfilt\` for zero phase shift.

The **convolution theorem** makes convolution, $O(N^2)$ directly, cost $O(N\\log N)$: smoothing with a kernel, modelling an instrument's response, or computing the potential of a charge distribution as the convolution with a Green's function. The DFT computes *circular* convolution, so pad both arrays with zeros to at least the sum of their lengths when you want linear convolution, or the ends wrap into each other. **Cross-correlation** $\\sum x_ny_{n+m}$, computed as $\\mathcal{F}^{-1}[X^*Y]$, finds time delays between signals and detects a known template in noise (the matched filter that discovered gravitational waves is exactly this, weighted by the noise spectrum).

**Spectral methods** use the same idea to solve PDEs. On a periodic domain, differentiation is multiplication: $\\widehat{\\partial_xu} = ik\\hat u$, exact for every resolved mode. The periodic **Poisson equation** $\\nabla^2\\phi = -\\rho$ becomes $\\hat\\phi(\\mathbf{k}) = \\hat\\rho/k^2$ (set the $k = 0$ mode by the neutrality condition): one forward and one inverse FFT, with an error that falls **exponentially** with resolution for smooth $\\rho$, compared with $O(\\Delta x^2)$ for finite differences. The linear diffusion equation is solved exactly mode by mode, $\\hat u(k, t) = \\hat u(k, 0)e^{-Dk^2t}$, with no time-step restriction. For the time-dependent Schrödinger equation the **split-step Fourier** method alternates the potential step in position space ($\\psi \\to e^{-iV\\Delta t/\\hbar}\\psi$) and the kinetic step in momentum space ($\\hat\\psi \\to e^{-i\\hbar k^2\\Delta t/2m}\\hat\\psi$); each step is unitary, so the norm is conserved exactly, and Strang splitting makes it second order in time. Newman's crank-nicolson and spectral treatments of the wave packet are good companions.

Spectral methods need smooth solutions and suitable domains. Discontinuities bring back the Gibbs phenomenon and slow algebraic convergence; non-periodic boundaries need Chebyshev or sine/cosine transforms (\`scipy.fft.dst\`, \`dct\`) instead; and nonlinear terms create aliasing that must be controlled by dealiasing (the 2/3 rule). Read Newman section 7.4 and chapter 9 exercises on the spectral method, the SciPy FFT and signal tutorials, and review the math-methods lesson on the delta function and Green's functions.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Section 7.4 and Chapter 9: FFT applications and the spectral method for PDEs',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'SciPy — Signal processing tutorial (filter design, filtfilt, correlation)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/signal.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
            {
              title: 'SciPy — Fourier transforms tutorial (DCT/DST for non-periodic problems)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/fft.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
          ],
          exercises: [
            {
              slug: 'filter-noisy-signal',
              title: 'Filtering a noisy measurement',
              prompt:
                'Generate a chirp signal from 1 to 20 Hz over 10 s sampled at 500 Hz plus white noise and 50 Hz mains interference. Remove the noise with (a) a brick-wall FFT low-pass at 25 Hz, (b) a Gaussian frequency taper, (c) a 4th-order Butterworth low-pass applied with `filtfilt`, and (d) a notch at 50 Hz. Compare residuals against the clean chirp and show the ringing of (a) near the start and end.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'fft-poisson-solver',
              title: 'An FFT Poisson solver with spectral accuracy',
              prompt:
                'Solve $\\nabla^2\\phi = -\\rho$ on the periodic unit square with $\\rho = \\sin(2\\pi x)\\cos(4\\pi y) + $ a narrow Gaussian blob minus its mean. Implement the FFT solver, check it against the exact solution of the sinusoidal part, and compare the error versus $N$ with your SOR solver from module 5: show exponential versus algebraic convergence. Time both for $N = 512$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'split-step-wavepacket',
              title: 'Split-step Fourier for a quantum wave packet',
              prompt:
                'Evolve a Gaussian wave packet ($\\hbar = m = 1$, $k_0 = 5$, width 1) incident on a square barrier of height 12 and width 0.5 using the split-step Fourier method on $[-50, 50]$ with 4096 points. Animate $|\\psi|^2$, verify the norm is conserved to rounding, compute the transmitted probability and compare with the plane-wave transmission coefficient averaged over the packet\'s momentum distribution. Check convergence in $\\Delta t$ (second order with Strang splitting).',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'cross-correlation-delay',
              title: 'Time delay by cross-correlation',
              prompt:
                'Two detectors record the same broadband pulse buried in independent noise (SNR 0.5 per sample), one delayed by 37.4 samples. Estimate the delay by FFT cross-correlation with parabolic interpolation of the peak, and estimate its uncertainty by repeating with 500 noise realisations. Show what goes wrong without zero-padding (circular wrap-around) when the delay is large.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must arrays be zero-padded for FFT-based linear convolution?',
              answerOutline:
                'The DFT computes circular convolution; without padding to at least $N_1 + N_2 - 1$ the tails wrap around and contaminate the result.',
            },
            {
              question: 'How does the FFT solve the periodic Poisson equation?',
              answerOutline:
                'Transform $\\rho$, divide by $k^2$ (setting the $k=0$ mode to zero for a neutral system) with the appropriate sign, transform back.',
            },
            {
              question: 'Why does the split-step Fourier method conserve probability exactly?',
              answerOutline:
                'Each sub-step multiplies by a pure phase (in position or momentum space) and the FFT is unitary, so the full step is unitary.',
            },
            {
              question: 'When do spectral methods lose their advantage?',
              answerOutline:
                'For non-smooth solutions (Gibbs, algebraic convergence), complex geometry or non-periodic boundaries (need other bases), and nonlinear problems without dealiasing.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/dirac-delta-and-greens-functions'],
        },
        {
          slug: 'fitting-models-to-data',
          title: 'Fitting models to data and periodograms for uneven sampling',
          summary:
            'Interpolation and curve fitting in practice: linear and nonlinear least squares with scipy.optimize, uncertainty estimation and validation, and the Lomb-Scargle periodogram for unevenly sampled time series.',
          estimatedMinutes: 150,
          objectives: [
            'Interpolate data with polynomials and splines and recognise the Runge phenomenon',
            'Fit linear and nonlinear models with numpy.linalg.lstsq, curve_fit and least_squares, using correct weights',
            'Obtain parameter uncertainties from the covariance matrix and validate them with residuals and bootstrap',
            'Choose good starting values, scale parameters and diagnose non-convergence of nonlinear fits',
            'Find periodicities in unevenly sampled data with the Lomb-Scargle periodogram',
          ],
          concepts: [
            'Polynomial interpolation and the Runge phenomenon',
            'Cubic splines',
            'Linear least squares via lstsq / QR',
            'Nonlinear least squares (Levenberg-Marquardt)',
            'curve_fit: sigma, absolute_sigma, pcov',
            'Residual analysis and $\\chi^2/\\nu$',
            'Lomb-Scargle periodogram',
            'False-alarm probability',
          ],
          explanation: `Data must be connected to models, either by **interpolation** (passing exactly through the points) or by **fitting** (finding the best parameters of a model given noisy data). Interpolation with a single high-degree polynomial is dangerous: on equally spaced points it oscillates wildly near the ends (the **Runge phenomenon**). Use piecewise low-order **splines** (\`scipy.interpolate.CubicSpline\`), which are smooth and local, or Chebyshev-spaced nodes if you must use a global polynomial. Never interpolate noisy data; fit it.

For models linear in their parameters, least squares is a linear algebra problem: build the design matrix and solve with \`numpy.linalg.lstsq\` (QR or SVD under the hood), weighting rows by $1/\\sigma_i$. For **nonlinear** models (an exponential decay, a Lorentzian line, a damped sinusoid), \`scipy.optimize.curve_fit\` and \`least_squares\` use the **Levenberg-Marquardt** algorithm, a blend of Gauss-Newton steps and gradient descent. Three practical rules decide whether a nonlinear fit works. Give good **starting values** (estimate them from the data: peak height, position and width by inspection; decay time from the log of the data). Put parameters on comparable **scales** (fit in sensible units or log-parameters). And pass \`sigma\` with \`absolute_sigma=True\` when your errors are real measurement uncertainties; otherwise \`curve_fit\` rescales the covariance by $\\chi^2/\\nu$ silently.

The returned covariance matrix gives parameter uncertainties and correlations, valid when the model is right, the errors Gaussian and the fit near-linear over the error range. Validate them: plot residuals normalised by $\\sigma$ (they should look like unit-variance noise with no structure), check $\\chi^2/\\nu \\approx 1$, and confirm the error bars by a parametric bootstrap (refit simulated datasets). The statistical background is in probability-statistics; here the emphasis is on the numerical craft.

Time-series data from astronomy and geophysics are often **unevenly sampled** (weather, day-night cycles, satellite orbits), so the FFT does not apply. The **Lomb-Scargle periodogram** fits a sinusoid at each trial frequency by least squares and reports the improvement in fit; it reduces to the classical periodogram for even sampling. It is implemented in \`astropy.timeseries.LombScargle\`, which also computes the **false-alarm probability** of the highest peak. Choose the frequency grid carefully (spacing finer than $1/T$, maximum set by the shortest meaningful period) and beware of aliases created by regular gaps in sampling (e.g. 1-day aliases).

Read Newman section 6.4 (nonlinear fitting) and chapter 5 interpolation sections, the SciPy curve_fit, optimize and interpolate documentation, and VanderPlas's "Understanding the Lomb-Scargle periodogram". Then do the exercises.`,
          resources: [
            {
              title: 'SciPy — scipy.optimize.curve_fit documentation',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.curve_fit.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Read the notes on sigma, absolute_sigma, bounds and the meaning of pcov.',
              primary: true,
            },
            {
              title: 'Understanding the Lomb-Scargle Periodogram (VanderPlas)',
              url: 'https://arxiv.org/abs/1703.09824',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'A practical guide to the periodogram, frequency grids, aliasing and false-alarm probabilities.',
            },
            {
              title: 'Astropy — Lomb-Scargle periodograms (astropy.timeseries)',
              url: 'https://docs.astropy.org/en/stable/timeseries/lombscargle.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'SciPy — Interpolation (scipy.interpolate) tutorial',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/interpolate.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
            },
          ],
          exercises: [
            {
              slug: 'runge-and-splines',
              title: 'Runge phenomenon and splines',
              prompt:
                'Interpolate $f(x) = 1/(1 + 25x^2)$ on $[-1, 1]$ with polynomials through $N = 5, 11, 21$ equally spaced points, through Chebyshev nodes, and with a cubic spline through the equally spaced points. Plot all against $f$ and tabulate the maximum error. Explain the Runge phenomenon and why Chebyshev nodes and splines avoid it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'nonlinear-fit-damped-oscillator',
              title: 'Nonlinear fit of a damped oscillation',
              prompt:
                'Simulate 200 noisy samples of $A e^{-t/\\tau}\\cos(\\omega t + \\phi) + c$ with known parameters and $\\sigma = 0.05$. Fit with `curve_fit` from (a) good starting values estimated from the data and (b) poor ones; show (b) can converge to a wrong minimum. Report parameters with errors (absolute_sigma=True), plot normalised residuals, compute $\\chi^2/\\nu$, and validate the error bars with 300 parametric-bootstrap refits.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'lomb-scargle-variable-star',
              title: 'Period of a variable star from uneven data',
              prompt:
                'Generate 150 observations of a sinusoidal variable star with period 0.6127 days, sampled only at night over 60 days with random weather gaps and photometric noise. Compute the Lomb-Scargle periodogram with astropy over a well-chosen frequency grid, identify the true peak and its 1-day aliases, compute the false-alarm probability, and phase-fold the data at the best period. Estimate the period uncertainty by bootstrap.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the Runge phenomenon and how do you avoid it?',
              answerOutline:
                'Large oscillations of high-degree interpolating polynomials near the ends of equally spaced nodes; use splines or Chebyshev nodes.',
            },
            {
              question: 'What does `absolute_sigma` control in curve_fit?',
              answerOutline:
                'Whether sigma is treated as true absolute errors (True) or only relative weights, in which case pcov is rescaled by the reduced chi-square.',
            },
            {
              question: 'Name three ways to make a nonlinear fit converge reliably.',
              answerOutline:
                'Good starting values estimated from data, parameters on comparable scales or reparametrised, bounds where physical; check residuals and try multiple starts.',
            },
            {
              question: 'Why is the Lomb-Scargle periodogram used instead of the FFT for astronomical time series?',
              answerOutline:
                'Observations are unevenly sampled; Lomb-Scargle fits sinusoids by least squares at arbitrary frequencies, and handles gaps (while revealing aliases).',
            },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
        },
      ],
    },
    {
      slug: 'n-body-and-molecular-dynamics',
      title: 'N-body Simulation and Molecular Dynamics',
      description:
        'Simulating many interacting particles: symplectic integrators, direct-summation gravitational N-body codes with softening, tree methods for large N, and molecular dynamics of Lennard-Jones fluids with thermostats and measured thermodynamics.',
      lessons: [
        {
          slug: 'symplectic-integrators',
          title: 'Symplectic integrators for Hamiltonian systems',
          summary:
            'Why long-term orbital and molecular simulations use leapfrog/Verlet: phase-space volume preservation, bounded energy error, time reversibility, and higher-order symplectic schemes.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the leapfrog (kick-drift-kick) and velocity Verlet integrators',
            'Explain symplecticity and why it gives bounded energy error rather than drift',
            'Demonstrate time reversibility and phase-space area preservation numerically',
            'Compare RK4 and leapfrog over very long integrations of the Kepler problem',
            'Construct a fourth-order symplectic integrator by composition (Yoshida/Forest-Ruth)',
          ],
          concepts: [
            'Hamiltonian flow and phase-space volume (Liouville)',
            'Symplectic map',
            'Leapfrog / kick-drift-kick',
            'Velocity Verlet',
            'Shadow Hamiltonian and bounded energy error',
            'Time reversibility',
            'Splitting methods and composition (Yoshida)',
            'Fixed versus adaptive steps in symplectic integration',
          ],
          explanation: `Run RK4 on a planetary orbit for a million orbits and the planet slowly spirals inward or outward: the energy error is small per step but systematic, so it accumulates linearly. Hamiltonian systems (orbits, molecules, charged particles in fields) have geometric structure that general-purpose methods ignore. Hamilton's flow preserves **phase-space volume** (Liouville's theorem) and, more strongly, is a **symplectic** map. Integrators that are themselves symplectic inherit this structure and their long-term behaviour is qualitatively right.

The simplest is **leapfrog**. For $H = p^2/2m + V(q)$, split each step into a half "kick" of the momentum, a full "drift" of the position, and another half kick:

$$p_{n+1/2} = p_n - \\tfrac h2V'(q_n), \\quad q_{n+1} = q_n + \\tfrac hm p_{n+1/2}, \\quad p_{n+1} = p_{n+1/2} - \\tfrac h2V'(q_{n+1}).$$

Algebraically identical is **velocity Verlet**, the standard integrator of molecular dynamics. Each substep is the exact flow of part of the Hamiltonian (kinetic or potential alone), and compositions of exact flows are symplectic. The method is second order, needs only one force evaluation per step (the last kick's force is reused), and is **time-reversible**: run it backward with $-h$ and you retrace your path exactly (up to rounding).

The payoff is in the energy. A symplectic integrator exactly conserves a nearby **shadow Hamiltonian** $\\tilde H = H + O(h^2)$, so the true energy oscillates within a bounded band of width $O(h^2)$ forever instead of drifting. Over long times leapfrog at step $h$ beats RK4 at the same cost by orders of magnitude in energy error, even though RK4 is more accurate over a single orbit. Phase errors (the planet running ahead or behind along its orbit) still grow linearly, but the orbit's shape stays right, which is what matters for stability studies.

Higher orders come from **composition**: three leapfrog steps with sub-step sizes $w_1h, w_0h, w_1h$, $w_1 = 1/(2 - 2^{1/3})$, $w_0 = 1 - 2w_1$, give Yoshida's fourth-order symplectic scheme (with one negative sub-step). Beware that naive **adaptive** step sizes destroy symplecticity; long-term codes use fixed steps, time transformations or specialised schemes (e.g. Wisdom-Holman, as in the REBOUND package).

Read Newman section 8.5.4 (leapfrog and Verlet), the Verlet integration article for the derivations, and the REBOUND documentation for production practice. The million-orbit comparison exercise is worth running overnight once.`,
          resources: [
            {
              title: 'Computational Physics (Newman) — Section 8.5: The leapfrog and Verlet methods',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
              primary: true,
            },
            {
              title: 'Verlet integration (Wikipedia)',
              url: 'https://en.wikipedia.org/wiki/Verlet_integration',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Derivations of position and velocity Verlet with error analysis.',
            },
            {
              title: 'REBOUND N-body code documentation',
              url: 'https://rebound.readthedocs.io/en/latest/',
              type: 'tool',
              cost: 'free',
              provider: 'Hanno Rein et al.',
              note: 'Production symplectic integrators (WHFast, IAS15) with explanations of when each is appropriate.',
            },
          ],
          exercises: [
            {
              slug: 'leapfrog-vs-rk4-kepler',
              title: 'Leapfrog versus RK4 on the Kepler problem',
              prompt:
                'Integrate an orbit with eccentricity 0.5 for $10^4$ orbits with leapfrog and RK4 at step sizes chosen so the cost (force evaluations) is equal. Plot the relative energy error against time on log axes for both: RK4 should drift linearly, leapfrog should oscillate in a bounded band. Also plot the angular momentum error and the precession of the perihelion for each. Explain the results using the shadow Hamiltonian.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'phase-space-area',
              title: 'Phase-space area preservation and reversibility',
              prompt:
                'For the pendulum $H = p^2/2 - \\cos q$, evolve a small circle of 1000 initial conditions in phase space with leapfrog, explicit Euler and RK4 for 50 time units. Compute the enclosed area (shoelace formula) over time and show leapfrog preserves it to rounding, Euler expands it, and RK4 slowly contracts it. Then integrate forward 1000 steps and back 1000 steps with each method and report how close you return to the start.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'yoshida-fourth-order',
              title: 'A fourth-order symplectic integrator',
              prompt:
                'Implement Yoshida\'s fourth-order composition of leapfrog and verify fourth-order convergence of the position error after one orbit of the harmonic oscillator. Show that the energy error remains bounded with amplitude scaling as $h^4$. Compare the cost per unit accuracy against leapfrog and RK4 for $10^3$ Kepler orbits.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the kick-drift-kick leapfrog step.',
              answerOutline:
                'Half kick $p \\leftarrow p + \\tfrac h2F(q)$, drift $q \\leftarrow q + hp/m$, half kick $p \\leftarrow p + \\tfrac h2F(q)$ with the new force.',
            },
            {
              question: 'Why does the energy error of a symplectic integrator stay bounded?',
              answerOutline:
                'The method exactly conserves a shadow Hamiltonian close to $H$ (differing by $O(h^p)$), so $H$ only oscillates around its initial value instead of drifting.',
            },
            {
              question: 'Why is RK4 a poor choice for million-orbit integrations even though it is fourth order?',
              answerOutline:
                'It is not symplectic; its small per-step energy errors are systematic and accumulate linearly, eventually changing the orbit qualitatively.',
            },
            {
              question: 'What happens if you use a naive adaptive step size with leapfrog?',
              answerOutline:
                'Symplecticity and time-reversibility are lost and energy drift returns; long-term codes use fixed steps or special time transformations.',
            },
          ],
          relatedLessons: ['classical-mechanics/hamiltonian-mechanics-and-symmetry/phase-space-and-liouvilles-theorem'],
        },
        {
          slug: 'gravitational-n-body',
          title: 'Direct-summation gravitational N-body simulation',
          summary:
            'Writing an $O(N^2)$ gravitational N-body code: vectorised force calculation, softening, units, conserved quantities as diagnostics, and applications from the Solar System to star clusters.',
          estimatedMinutes: 180,
          objectives: [
            'Implement a vectorised direct-summation gravity solver with Plummer softening',
            'Choose N-body units and initial conditions (Kepler orbits, Plummer sphere, cold collapse)',
            'Monitor energy, momentum and angular momentum conservation and use them to choose the time step',
            'Simulate the Solar System and a small star cluster with leapfrog and measure relaxation and virial equilibrium',
            'Explain close encounters, softening bias and when individual or adaptive time steps are needed',
          ],
          concepts: [
            'Pairwise force $\\mathbf{F}_{ij} = -Gm_im_j\\mathbf{r}_{ij}/|\\mathbf{r}_{ij}|^3$',
            '$O(N^2)$ cost of direct summation',
            'Plummer softening $\\epsilon$',
            'N-body units ($G = M = 1$, $E = -1/4$)',
            'Centre-of-mass frame',
            'Virial theorem $2K + W = 0$',
            'Two-body relaxation time $t_{relax} \\approx (N/8\\ln N)t_{cross}$',
            'Close encounters and individual time steps',
          ],
          explanation: `The gravitational N-body problem is the simplest many-body simulation and one of the most important in astrophysics. Each particle feels the sum of Newtonian attractions from all the others,

$$\\ddot{\\mathbf{r}}_i = -G\\sum_{j \\ne i}m_j\\frac{\\mathbf{r}_i - \\mathbf{r}_j}{(|\\mathbf{r}_i - \\mathbf{r}_j|^2 + \\epsilon^2)^{3/2}},$$

where the **softening length** $\\epsilon$ (Plummer softening) prevents the force from diverging in close encounters. Direct summation costs $O(N^2)$ per step; with NumPy broadcasting you compute all pairwise separation vectors as an $N\\times N\\times3$ array in one expression, which is fast up to a few thousand particles. Beyond that, memory and time force either compiled loops (Numba) or approximate methods (next lesson).

Work in **N-body units** ($G = 1$, total mass 1, and a length scale such that the total energy is $-1/4$ for a bound cluster in equilibrium), or in AU, years and solar masses ($G = 4\\pi^2$) for planetary systems; keeping numbers near 1 avoids round-off trouble and makes results transferable. Move to the **centre-of-mass frame** before starting, otherwise the whole system drifts.

Your best debugging tools are the **conserved quantities**: total energy, linear momentum and angular momentum. Compute them every few steps. Momentum should be conserved to rounding by any integrator that uses symmetric pair forces (Newton's third law); energy conservation with leapfrog should be bounded at a level that scales as $\\Delta t^2$, and a sudden jump signals a close encounter that the time step did not resolve. For a self-gravitating cluster the **virial ratio** $2K/|W|$ tells you whether it is in equilibrium (1), collapsing (<1) or expanding (>1). A **cold collapse** (all particles at rest) violently relaxes to virial equilibrium within a few crossing times, a classic test problem.

Softening is a compromise: it removes the singularity and the need for tiny steps, but it biases the dynamics on scales below $\\epsilon$, so choose $\\epsilon$ smaller than the structures you care about (and in collisionless simulations, comparable to the interparticle spacing). Small-$N$ systems with real close encounters (binaries, planetary systems) need no softening, adaptive or **individual time steps** and high-order or regularised integrators, as in production codes such as REBOUND's IAS15. Over long times **two-body relaxation** changes the cluster's structure on a time $t_{relax} \\approx (N/8\\ln N)t_{cross}$, leading to mass segregation and core collapse.

Read Newman chapter 8 exercises on orbits and the three-body problem, the REBOUND documentation for production practice, and the arborjs or Princeton notes for the setup of particle systems. Then build the code in the exercises, testing it on a two-body Kepler orbit before anything else.`,
          resources: [
            {
              title: 'REBOUND N-body code documentation',
              url: 'https://rebound.readthedocs.io/en/latest/',
              type: 'tool',
              cost: 'free',
              provider: 'Hanno Rein et al.',
              note: 'Use to cross-check your Solar System runs; read the integrator overview.',
              primary: true,
            },
            {
              title: 'Computational Physics (Newman) — Chapter 8 exercises: orbits, the three-body problem',
              url: 'http://www-personal.umich.edu/~mejn/cp/',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Mark Newman',
            },
            {
              title: 'Computational Physics lecture notes and code (Hjorth-Jensen) — Solar System project',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'problem-set',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
              note: 'The Earth-Sun and full Solar System project with Verlet, including the Mercury perihelion test.',
            },
          ],
          exercises: [
            {
              slug: 'vectorised-nbody-code',
              title: 'A vectorised N-body code',
              prompt:
                'Write `accelerations(pos, mass, eps)` using broadcasting and a leapfrog driver. Test on a two-body circular orbit (energy error bounded, period correct) and on the figure-eight three-body choreography (Chenciner-Montgomery initial conditions), which should remain periodic for many periods with small steps. Time the force calculation for $N = 100..5000$ and confirm $O(N^2)$; then compile it with Numba and report the speed-up.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'solar-system-simulation',
              title: 'Simulate the Solar System',
              prompt:
                'Set up the Sun and eight planets from approximate orbital elements (or from JPL Horizons vectors) in AU, years and solar masses. Integrate for 1000 years with leapfrog at $\\Delta t = 1$ day and with RK4 at the same cost; plot orbits, energy error and the semimajor-axis drift of Mercury for both. Compare one planet\'s position after 100 years with REBOUND.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'cold-collapse-cluster',
              title: 'Cold collapse and virialisation of a star cluster',
              prompt:
                'Place $N = 1000$ equal-mass particles uniformly in a sphere at rest (N-body units) and integrate with leapfrog and softening $\\epsilon = 0.01$ for 10 crossing times. Plot the virial ratio, total energy error, half-mass radius and the density profile over time. Show the system relaxes to $2K/|W| \\approx 1$. Repeat with $\\epsilon = 0.001$ and $0.1$ and discuss how softening and time step affect energy conservation and the final structure.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is softening introduced and what does it cost?',
              answerOutline:
                'To prevent divergent forces and tiny time steps in close encounters; it modifies gravity below the scale $\\epsilon$, biasing small-scale dynamics.',
            },
            {
              question: 'Which conserved quantities should an N-body code monitor and what does each test?',
              answerOutline:
                'Total energy (integrator accuracy, time step), linear momentum (symmetric forces, Newton III), angular momentum (rotational symmetry, integration accuracy).',
            },
            {
              question: 'What does the virial ratio tell you about a self-gravitating system?',
              answerOutline:
                '$2K/|W| = 1$ in equilibrium; below 1 the system will collapse, above 1 it expands.',
            },
            {
              question: 'What limits direct summation and what is the two-body relaxation time?',
              answerOutline:
                '$O(N^2)$ cost per step; $t_{relax} \\approx (N/8\\ln N)t_{cross}$, the time over which cumulative weak encounters change orbits.',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/keplers-laws-and-orbits'],
        },
        {
          slug: 'tree-codes-and-large-n',
          title: 'Tree codes and methods for large N',
          summary:
            'Beating $O(N^2)$: the Barnes-Hut octree algorithm with its opening-angle criterion, multipole approximations, particle-mesh methods with the FFT, and the accuracy-cost trade-off.',
          estimatedMinutes: 150,
          objectives: [
            'Explain how the Barnes-Hut algorithm groups distant particles and achieves $O(N\\log N)$ cost',
            'Build a quadtree or octree recursively and compute centres of mass of nodes',
            'Implement the opening-angle criterion and measure force error versus $\\theta$',
            'Describe the particle-mesh method using the FFT Poisson solver and its resolution limit',
            'Choose between direct, tree and mesh methods for a given physical problem',
          ],
          concepts: [
            'Hierarchical spatial decomposition (quadtree, octree)',
            'Monopole (centre-of-mass) approximation',
            'Opening angle $\\theta = s/d$',
            '$O(N\\log N)$ complexity',
            'Multipole expansion and the fast multipole method',
            'Particle-mesh (PM) method: mass assignment, FFT Poisson, interpolation',
            'Cloud-in-cell assignment',
            'Hybrid TreePM codes',
          ],
          explanation: `The force from a distant group of particles is almost the same as the force from a single particle at their centre of mass carrying their total mass; this is the leading term of the **multipole expansion** from math-methods. The **Barnes-Hut algorithm** exploits it hierarchically. Enclose all particles in a cube and subdivide it recursively into eight children (four in 2D, a **quadtree**) until each leaf contains at most one particle; store the total mass and centre of mass of every node. To compute the force on a particle, walk the tree from the root: if a node of size $s$ at distance $d$ satisfies $s/d < \\theta$, treat it as a single point mass; otherwise open it and examine its children.

The **opening angle** $\\theta$ controls the accuracy-cost trade-off. With $\\theta = 0$ every node is opened and you recover direct summation; with $\\theta \\approx 0.5$-0.7 force errors are typically 0.1-1% and the cost is $O(N\\log N)$, since each particle interacts with $O(\\log N)$ nodes. For $N = 10^6$ that is a speed-up of tens of thousands. Including quadrupole moments of the nodes improves accuracy at a fixed $\\theta$, and the **fast multipole method** goes further, computing node-node interactions to reach $O(N)$. Tree codes handle arbitrary geometry and clustering gracefully, which is why they dominate simulations of galaxies and planet formation, but the approximate forces no longer obey Newton's third law exactly, so momentum is conserved only approximately: monitor it.

For nearly uniform systems with periodic boundaries (cosmological volumes, plasmas) the **particle-mesh** (PM) method is faster still. Assign particle masses to a grid (**cloud-in-cell** spreads each particle over the nearest $2^3$ cells), solve Poisson's equation on the grid with the FFT ($\\hat\\phi = -4\\pi G\\hat\\rho/k^2$, module 6), difference the potential to get forces, and interpolate back to the particles with the same scheme. The cost is $O(N + N_g\\log N_g)$ for $N_g$ grid cells, but forces are smoothed on the grid scale, so small-scale structure is lost. **TreePM** codes (GADGET) combine a mesh for long-range forces with a tree for short-range ones.

Read the Princeton Barnes-Hut assignment and the arborjs explanation for the algorithm, and the Barnes-Hut article for references to the original paper. Then build a 2D quadtree code; implementing the recursion yourself is the exercise that makes the algorithm transparent.`,
          resources: [
            {
              title: 'The Barnes-Hut Algorithm (arbor.js explanation)',
              url: 'https://arborjs.org/docs/barnes-hut',
              type: 'article',
              cost: 'free',
              provider: 'arbor.js',
              note: 'A clear illustrated walkthrough of quadtree construction and the opening criterion.',
              primary: true,
            },
            {
              title: 'Princeton COS 126 — Barnes-Hut galaxy simulation assignment',
              url: 'https://www.cs.princeton.edu/courses/archive/fall03/cs126/assignments/barnes-hut.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Princeton University',
              note: 'A structured implementation guide with test inputs.',
            },
            {
              title: 'Barnes-Hut simulation (Wikipedia)',
              url: 'https://en.wikipedia.org/wiki/Barnes%E2%80%93Hut_simulation',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Overview, complexity and references to Barnes and Hut (1986) and the fast multipole method.',
            },
          ],
          exercises: [
            {
              slug: 'quadtree-barnes-hut',
              title: 'Build a 2D Barnes-Hut code',
              prompt:
                'Implement a quadtree with recursive insertion and centre-of-mass computation, and a force routine with opening angle $\\theta$. For $N = 2000$ random particles, compare the forces with direct summation: plot the distribution of relative force errors for $\\theta = 0.3, 0.5, 0.8, 1.0$, and the time per force evaluation. Measure the scaling with $N$ from 1000 to 32000 at $\\theta = 0.5$ and confirm it is close to $N\\log N$.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'galaxy-collision',
              title: 'A 2D galaxy encounter',
              prompt:
                'Using your tree code (or a softened direct code if $N$ is small), set up two rotating discs of test particles around massive central bodies on a parabolic encounter. Integrate with leapfrog and render snapshots; identify tidal tails and bridges (Toomre and Toomre 1972). Report momentum and energy conservation over the run and how they depend on $\\theta$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'particle-mesh-gravity',
              title: 'A particle-mesh gravity solver',
              prompt:
                'Implement cloud-in-cell mass assignment on a periodic $128^2$ grid, the FFT Poisson solve and force interpolation. Test it on a single particle by comparing the force against the periodic Newtonian force as a function of distance: show the force is smoothed below about 2 cells. Then compare PM and direct forces for 4000 clustered particles and discuss when PM is adequate.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does Barnes-Hut reduce the cost of force evaluation?',
              answerOutline:
                'It groups distant particles in tree nodes and replaces each group by its total mass at the centre of mass when $s/d < \\theta$, so each particle interacts with $O(\\log N)$ nodes.',
            },
            {
              question: 'What does the opening angle control?',
              answerOutline:
                'The trade-off between accuracy and cost: smaller $\\theta$ opens more nodes (more accurate, slower); $\\theta = 0$ is direct summation.',
            },
            {
              question: 'Why is momentum not exactly conserved in a tree code?',
              answerOutline:
                'Approximated forces are not pairwise antisymmetric (particle A sees node B differently from how B\'s particles see A), so Newton\'s third law holds only approximately.',
            },
            {
              question: 'What are the strengths and weaknesses of the particle-mesh method?',
              answerOutline:
                'Very fast ($O(N + N_g\\log N_g)$) for periodic, fairly uniform systems; forces smoothed on the grid scale so small-scale structure is unresolved.',
            },
          ],
        },
        {
          slug: 'molecular-dynamics',
          title: 'Molecular dynamics of a Lennard-Jones fluid',
          summary:
            'Simulating atoms: the Lennard-Jones potential in reduced units, periodic boundaries and the minimum-image convention, cut-offs and neighbour lists, thermostats, and measuring temperature, pressure and the radial distribution function.',
          estimatedMinutes: 180,
          objectives: [
            'Implement velocity-Verlet molecular dynamics for a Lennard-Jones system in reduced units',
            'Apply periodic boundary conditions with the minimum-image convention, a force cut-off and a cell or Verlet neighbour list',
            'Equilibrate a system and measure temperature (equipartition), pressure (virial) and energy with error bars',
            'Compute the radial distribution function and the velocity autocorrelation and diffusion coefficient',
            'Use a thermostat (velocity rescaling, Berendsen, Langevin or Andersen) to sample the canonical ensemble',
          ],
          concepts: [
            'Lennard-Jones potential $4\\epsilon[(\\sigma/r)^{12} - (\\sigma/r)^6]$',
            'Reduced units ($\\sigma = \\epsilon = m = 1$)',
            'Periodic boundaries and minimum image',
            'Cut-off radius and shifted potential',
            'Cell lists and Verlet neighbour lists',
            'Kinetic temperature and virial pressure',
            'Radial distribution function $g(r)$',
            'Thermostats and the NVE vs NVT ensembles',
          ],
          explanation: `**Molecular dynamics** (MD) integrates Newton's equations for many atoms and extracts thermodynamic and transport properties from the trajectories. The standard test system is argon modelled by the **Lennard-Jones** potential $V(r) = 4\\epsilon[(\\sigma/r)^{12} - (\\sigma/r)^6]$: steep repulsion at short range, van der Waals attraction at long range, minimum $-\\epsilon$ at $r = 2^{1/6}\\sigma$. Work in **reduced units** ($\\sigma = \\epsilon = m = k_B = 1$), in which the time unit for argon is about 2 ps and the phase diagram has its triple point near $T^* \\approx 0.69$, $\\rho^* \\approx 0.85$.

The integrator is **velocity Verlet** (the symplectic leapfrog of this module's first lesson), with $\\Delta t \\approx 0.005$ in reduced units; check that total energy fluctuates without drift. A bulk fluid is mimicked with **periodic boundary conditions**: the simulation box is surrounded by copies of itself, and each pair interacts through its nearest image (**minimum-image convention**: subtract $L\\,\\mathrm{round}(\\Delta x/L)$ from each separation component). The potential is truncated at a **cut-off** $r_c \\approx 2.5\\sigma$ and shifted so it vanishes there (avoiding energy jumps); long-range corrections can be added analytically. To avoid computing all $N^2$ distances, use **cell lists** (divide the box into cells of size $\\ge r_c$ and only check neighbouring cells) or **Verlet neighbour lists** rebuilt every few steps, which make the cost $O(N)$.

Measurements come from time averages after **equilibration**. The temperature follows from equipartition, $\\tfrac32Nk_BT = \\langle K\\rangle$ (minus the 3 degrees of freedom of the fixed centre of mass), the pressure from the **virial** $P = \\rho k_BT + \\frac{1}{3V}\\langle\\sum_{i<j}\\mathbf{r}_{ij}\\cdot\\mathbf{F}_{ij}\\rangle$, and the structure from the **radial distribution function** $g(r)$, the density of neighbours at distance $r$ relative to an ideal gas: a gas has $g \\approx 1$, a liquid shows damped oscillations from neighbour shells, a crystal sharp peaks. Transport coefficients come from correlation functions: the diffusion coefficient is $D = \\frac13\\int_0^\\infty\\langle\\mathbf{v}(0)\\cdot\\mathbf{v}(t)\\rangle dt$ or the slope of the mean squared displacement. Error bars need block averaging because successive configurations are correlated, exactly as in Monte Carlo.

Plain Verlet samples the microcanonical (NVE) ensemble. To simulate at fixed temperature, add a **thermostat**: crude velocity rescaling during equilibration only; Berendsen weak coupling (fast but not exactly canonical); Langevin or Andersen stochastic thermostats, or Nosé-Hoover, which sample the canonical ensemble correctly.

Read the Hjorth-Jensen MD notes, the Lennard-Jones and Verlet articles, and browse the LAMMPS documentation to see how production codes organise the same steps. Then build the code in stages, testing energy conservation at each stage.`,
          resources: [
            {
              title: 'Computational Physics lecture notes and code (Hjorth-Jensen) — Molecular dynamics',
              url: 'https://github.com/CompPhysics/ComputationalPhysics',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Oslo / Michigan State University',
              note: 'Velocity Verlet, periodic boundaries and the argon MD project.',
              primary: true,
            },
            {
              title: 'Lennard-Jones potential (Wikipedia)',
              url: 'https://en.wikipedia.org/wiki/Lennard-Jones_potential',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'Reduced units, truncation and shifting conventions, and the phase diagram.',
            },
            {
              title: 'LAMMPS documentation',
              url: 'https://docs.lammps.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Sandia National Laboratories',
              note: 'Read the "Howto" sections on thermostats, neighbour lists and the LJ melt example, and compare a run with your code.',
            },
          ],
          exercises: [
            {
              slug: 'lj-md-code',
              title: 'A Lennard-Jones MD code',
              prompt:
                'Implement velocity-Verlet MD for $N = 256$ LJ atoms in a periodic box at $\\rho^* = 0.8$, starting from an FCC lattice with random velocities scaled to $T^* = 1.0$ and zero total momentum. Use minimum image, a cut-off of 2.5 with a shifted potential, and a cell list (or Numba-compiled $O(N^2)$ loop). Show the total energy fluctuates without drift for $\\Delta t = 0.005$ over $10^4$ steps and that the fluctuation amplitude scales as $\\Delta t^2$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rdf-and-phases',
              title: 'Radial distribution function across phases',
              prompt:
                'Using your MD code with a velocity-rescaling equilibration then NVE production, compute $g(r)$ for (a) a gas ($\\rho^* = 0.05$, $T^* = 2$), (b) a liquid ($\\rho^* = 0.8$, $T^* = 1$), (c) a solid ($\\rho^* = 1.1$, $T^* = 0.5$). Plot all three and interpret the peaks. Measure pressure via the virial with block-averaged error bars for the liquid and compare with published LJ equation-of-state values.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'diffusion-coefficient-md',
              title: 'Diffusion coefficient two ways',
              prompt:
                'For the LJ liquid at $\\rho^* = 0.8$, $T^* = 1.0$, compute the self-diffusion coefficient from (a) the slope of the mean squared displacement (with unwrapped coordinates) and (b) the Green-Kubo integral of the velocity autocorrelation function. Show they agree within errors. Then switch on a Langevin thermostat with friction $\\gamma = 1$ and show how it changes $D$ while leaving $g(r)$ and $T$ unchanged; explain why.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the minimum-image convention?',
              answerOutline:
                'With periodic boundaries each pair interacts only through the nearest periodic image; separations are wrapped into $[-L/2, L/2)$ per component.',
            },
            {
              question: 'How are temperature and pressure measured in MD?',
              answerOutline:
                'Temperature from equipartition of mean kinetic energy over the degrees of freedom; pressure from the virial $\\rho k_BT + \\frac{1}{3V}\\langle\\sum\\mathbf{r}_{ij}\\cdot\\mathbf{F}_{ij}\\rangle$.',
            },
            {
              question: 'What does the radial distribution function tell you and how does it distinguish phases?',
              answerOutline:
                'Neighbour density at distance $r$ relative to ideal gas; gas $\\approx 1$, liquid damped oscillations (shells), solid sharp persistent peaks at lattice distances.',
            },
            {
              question: 'Why is a thermostat needed and what is wrong with simple velocity rescaling for production runs?',
              answerOutline:
                'To sample fixed temperature (NVT) rather than fixed energy; rescaling suppresses the kinetic-energy fluctuations and does not generate the canonical ensemble.',
            },
          ],
        },
      ],
      project: {
        slug: 'lj-melting-study',
        title: 'Module project: melting of a Lennard-Jones solid',
        description:
          'Use your MD code (optimised with cell lists and Numba) to study the melting of an FCC Lennard-Jones crystal. Heat the system gradually at fixed density with a correct thermostat, monitor the energy, pressure, Lindemann parameter, mean squared displacement and $g(r)$, and locate the melting transition and its hysteresis on heating and cooling. Validate the code first with energy conservation tests and a comparison with LAMMPS for one state point.',
        deliverables: [
          'MD package with tests (energy conservation, momentum conservation, a LAMMPS comparison)',
          'Plots of $E(T)$, $P(T)$, Lindemann parameter, MSD and $g(r)$ through the transition',
          'Short report estimating the melting temperature with uncertainty and discussing finite-size and superheating effects',
        ],
        estimatedHours: 14,
        stretchGoals: [
          'Implement a Nosé-Hoover thermostat and compare kinetic-energy distributions with velocity rescaling and Langevin',
          'Add a Monte Carlo code for the same system and compare $g(r)$ and pressure with MD',
        ],
      },
    },
    {
      slug: 'reproducibility-and-performance',
      title: 'Reproducibility and Performance',
      description:
        'Making simulations fast and trustworthy: profiling and optimisation with Numba and vectorisation, parallelism, verification and validation, testing numerical code, and reproducible computational workflows.',
      lessons: [
        {
          slug: 'profiling-and-optimisation',
          title: 'Profiling and optimisation: vectorisation, Numba and Cython',
          summary:
            'Finding where time is spent with profilers, the hierarchy of optimisations from algorithms to compiled loops, and how to speed up Python numerical code by factors of 10-1000 without losing correctness.',
          estimatedMinutes: 150,
          objectives: [
            'Profile Python code with timeit, cProfile and line-level profiling and identify hot spots',
            'Apply the optimisation hierarchy: better algorithm, vectorisation, compiled loops, parallelism',
            'Accelerate loops with Numba @njit (and understand when it helps), and know what Cython offers',
            'Understand memory effects: cache locality, array layout, temporary arrays',
            'Verify that optimised code gives the same results as the reference implementation',
          ],
          concepts: [
            'Premature optimisation and measuring first',
            'timeit and cProfile',
            'Algorithmic complexity as the first optimisation',
            'Vectorisation and avoiding Python loops',
            'Numba JIT compilation (@njit, prange)',
            'Cython and C extensions',
            'Cache locality, C vs Fortran order, temporaries',
            'Regression tests for optimised code',
          ],
          explanation: `Optimisation without measurement is guesswork. The first rule is to get a correct, simple version working and tested; the second is to **profile** it to find where time actually goes, which is almost never where you expect. \`timeit\` (or the \`%timeit\` magic in IPython) measures small snippets reliably by repeating them; \`cProfile\` reports time per function for a whole program; line-level profilers pinpoint individual statements. Typically one inner loop (the force calculation, the spin update, the stencil sweep) accounts for 90% of the runtime, and that is the only place worth optimising.

Optimisations form a hierarchy, and the top of it gives by far the biggest gains. **Algorithms** first: replacing an $O(N^2)$ force sum with a tree or cell list, a dense solve with a banded one, or a fixed-step integrator with an adaptive one can gain factors of thousands that no amount of low-level tuning matches. Then **vectorisation**: express the inner loop as whole-array NumPy operations, which run in compiled code. Vectorisation sometimes costs memory (large temporary arrays) or clarity, and some algorithms (sequential updates such as Gauss-Seidel or Metropolis) do not vectorise naturally.

For those, **compile the loop**. **Numba** compiles a Python function using NumPy arrays and scalars to machine code the first time it is called: add \`@njit\` and explicit loops become as fast as C, often 100x faster than pure Python. It supports most of NumPy, and \`prange\` with \`parallel=True\` parallelises loops across cores. It does not help code that is already vectorised NumPy, and it fails (or falls back) on unsupported Python objects, so keep compiled kernels simple: arrays in, arrays out. **Cython** offers similar speed by compiling annotated Python to C, with more control and more effort; it is common in libraries.

**Memory** matters as much as arithmetic on modern hardware. Accessing arrays in the order they are stored (row-major, C order, in NumPy: loop over the last index innermost) keeps data in cache; creating temporaries in a hot loop (\`a = b + c * d\` creates intermediate arrays) costs bandwidth, which in-place operations (\`out=\` arguments) avoid. Single precision halves memory traffic where accuracy permits.

Finally, every optimised version must be checked against the reference: keep the slow, obviously correct implementation as a test oracle and assert agreement to a tolerance. Read the Scientific Python Lectures chapter on optimising code, the Numba quick-start, and the Python profile documentation, then do the exercises on the code you wrote in earlier modules.`,
          resources: [
            {
              title: 'Scientific Python Lectures — Optimizing code',
              url: 'https://lectures.scientific-python.org/advanced/optimizing/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Scientific Python',
              note: 'Profiling workflow, timeit, cProfile, line profiling and common NumPy speed-ups.',
              primary: true,
            },
            {
              title: 'Numba documentation — 5-minute guide and performance tips',
              url: 'https://numba.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Numba',
            },
            {
              title: 'Python — The Python Profilers (cProfile)',
              url: 'https://docs.python.org/3/library/profile.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Cython documentation',
              url: 'https://cython.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Cython',
              note: 'Optional: the tutorial on working with NumPy arrays (typed memoryviews).',
            },
          ],
          exercises: [
            {
              slug: 'profile-a-simulation',
              title: 'Profile one of your simulations',
              prompt:
                'Take your Ising or MD code from earlier modules in its simplest form. Profile it with cProfile and a line profiler, identify the hot spot, and record the fraction of time it takes. Then produce four versions of the hot spot (pure Python, vectorised NumPy, Numba @njit, Numba parallel prange), verify all agree with the reference to a tolerance (or statistically for stochastic code with fixed seeds), and tabulate the speed-ups for three problem sizes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'memory-layout',
              title: 'Memory layout and cache effects',
              prompt:
                'For a $4000\\times4000$ float64 array, time summing along rows versus columns in a Numba loop, for C-ordered and Fortran-ordered arrays. Then time a five-point stencil update written (a) with temporaries, (b) with `out=` in-place operations, (c) in Numba. Explain the timings in terms of cache lines and memory bandwidth, and estimate the achieved bandwidth in GB/s.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'algorithm-beats-tuning',
              title: 'Algorithms beat tuning',
              prompt:
                'For a 2D LJ system of $N = 4000$ particles, compare the force calculation using (a) an optimised Numba $O(N^2)$ loop and (b) a cell list in Numba, verifying identical forces. Measure the crossover $N$ at which the cell list wins and extrapolate both to $N = 10^6$. Write a paragraph on the order in which to apply optimisations.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should you profile before optimising?',
              answerOutline:
                'Time is usually concentrated in one small hot spot that intuition misidentifies; optimising elsewhere wastes effort and adds complexity.',
            },
            {
              question: 'List the optimisation hierarchy from largest to smallest typical gain.',
              answerOutline:
                'Better algorithm (complexity), vectorisation, compilation of loops (Numba/Cython), parallelism, low-level memory tuning.',
            },
            {
              question: 'When does Numba help and when does it not?',
              answerOutline:
                'Helps for explicit loops over arrays and scalars that cannot easily be vectorised (sequential updates); little benefit for code that is already vectorised NumPy, and unsupported Python objects prevent compilation.',
            },
            {
              question: 'How do you make sure an optimised version is still correct?',
              answerOutline:
                'Keep the simple reference implementation as a test oracle and assert agreement (to a tolerance, or statistically with fixed seeds) in automated tests.',
            },
          ],
        },
        {
          slug: 'verification-validation-and-testing',
          title: 'Verification, validation and testing of numerical code',
          summary:
            'How to know a simulation is right: verification against exact solutions and convergence tests, the method of manufactured solutions, conservation laws, validation against experiment, and automated tests with pytest.',
          estimatedMinutes: 150,
          objectives: [
            'Distinguish verification (solving the equations right) from validation (solving the right equations)',
            'Design convergence tests and apply the method of manufactured solutions to a PDE code',
            'Use conservation laws, symmetries and limiting cases as built-in diagnostics',
            'Write automated pytest tests for deterministic and stochastic numerical code with appropriate tolerances',
            'Quantify numerical uncertainty and report it alongside physical results',
          ],
          concepts: [
            'Verification versus validation',
            'Code verification: convergence order tests',
            'Method of manufactured solutions',
            'Conservation laws and symmetries as tests',
            'Limiting cases and analytic benchmarks',
            'Unit, integration and regression tests (pytest)',
            'Testing stochastic code: fixed seeds and statistical tolerances',
            'Numerical uncertainty estimation (Richardson, grid refinement)',
          ],
          explanation: `A simulation that runs and makes pretty pictures is not a result. The computational-science community distinguishes two questions. **Verification** asks whether the code solves the mathematical model correctly: are the equations implemented without bugs, and is the discretisation error under control? **Validation** asks whether the mathematical model describes reality: does the simulation agree with experiment within the combined uncertainties? Verification must come first; validating a buggy code is meaningless, and a validated code may still be right for the wrong reasons if errors cancel.

The strongest verification test is the **convergence test**: compare with an exact solution at several resolutions and confirm that the error decreases at the theoretical order. Getting the right *order* is far more stringent than getting a small error, because most bugs (a wrong boundary stencil, a missing factor in one term) reduce the order while leaving the answer plausible. When no exact solution exists for your equation, use the **method of manufactured solutions**: pick any smooth function $u_m(x, t)$, substitute it into the PDE to compute the source term that makes it an exact solution, add that source to your code, and test convergence to $u_m$. It exercises every term in the equation, including boundaries.

Physics supplies further checks. **Conservation laws** (energy, momentum, mass, probability) should hold to the level the method guarantees; **symmetries** (a symmetric initial condition stays symmetric; results are invariant under translation or relabelling) catch indexing errors; **limiting cases** (zero coupling, small amplitude, high temperature) should reproduce known analytic results. Build these diagnostics into your codes and output them routinely, as you have done throughout this subject.

Make tests **automatic**. With \`pytest\`, a test is a function that asserts something: that the integrator conserves energy to $10^{-6}$ over 100 orbits, that the Poisson solver converges at order 2, that the Ising code reproduces exact enumeration on a 3×3 lattice. Run them after every change, so an "optimisation" that breaks physics is caught immediately. Compare floats with tolerances (\`numpy.testing.assert_allclose\`), not equality. Stochastic code is tested with fixed seeds for regression and with statistical tolerances (agreement within a few standard errors) for correctness; a test that fails 1% of the time by chance is a test people learn to ignore, so set thresholds deliberately.

Finally, estimate and report **numerical uncertainty**: from grid refinement and Richardson extrapolation, step-size halving, or varying the number of samples, alongside the physical uncertainties. Read the pytest documentation, the Turing Way chapter on testing, and the Langtangen and Linge sections on verification with manufactured solutions, then apply them to your earlier codes.`,
          resources: [
            {
              title: 'pytest documentation',
              url: 'https://docs.pytest.org/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
              note: 'Getting started, fixtures and parametrised tests (useful for convergence tests at several resolutions).',
              primary: true,
            },
            {
              title: 'Finite Difference Computing with PDEs (Langtangen and Linge) — verification and the method of manufactured solutions',
              url: 'https://hplgit.github.io/fdm-book/doc/pub/book/sphinx/index.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Simula / Springer Open',
            },
            {
              title: 'The Turing Way — Code testing chapter',
              url: 'https://the-turing-way.netlify.app/',
              type: 'textbook',
              cost: 'free',
              provider: 'The Alan Turing Institute',
            },
          ],
          exercises: [
            {
              slug: 'manufactured-solution',
              title: 'Method of manufactured solutions',
              prompt:
                'Choose $u_m(x, t) = e^{-t}\\sin(\\pi x)(1 + x^2)$ for the equation $u_t = (k(x)u_x)_x + f$ with $k(x) = 1 + x$ on $[0, 1]$. Compute $f$ symbolically with SymPy, add it to a Crank-Nicolson solver for the variable-coefficient diffusion equation, and verify second-order convergence in space and time. Then introduce a deliberate bug (a first-order boundary treatment) and show that the error stays small but the convergence order drops to 1.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pytest-suite',
              title: 'A test suite for your integrators',
              prompt:
                'Write a pytest suite for the ODE integrator library from module 3: parametrised tests that each method achieves its theoretical order on the harmonic oscillator (fit the slope and assert it within 0.1), that leapfrog\'s energy error stays bounded over $10^4$ periods, that momentum is conserved for a two-body problem, and a regression test against a stored reference trajectory. Run it in under 30 seconds and add it to a CI workflow (e.g. GitHub Actions).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'testing-stochastic-code',
              title: 'Testing stochastic code',
              prompt:
                'For your Ising Metropolis code, write (a) a regression test with a fixed seed asserting identical output to a stored result, and (b) a statistical test that the mean energy on a $4\\times4$ lattice at $T = 2.5$ agrees with exact enumeration within 4 standard errors (estimated by blocking). Compute the false-failure rate of (b) and explain how you chose the threshold. Then show that (a) catches an accidental change of the update order while (b) may not.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between verification and validation?',
              answerOutline:
                'Verification: the code solves the chosen equations correctly (math/numerics). Validation: the equations describe reality (comparison with experiment).',
            },
            {
              question: 'Why is matching the convergence order a stronger test than having a small error?',
              answerOutline:
                'Many bugs degrade the order without making the error obviously large at a single resolution; the order is a sharp, resolution-independent signature of correct implementation.',
            },
            {
              question: 'Describe the method of manufactured solutions.',
              answerOutline:
                'Choose an analytic function, substitute it into the PDE to derive the source term (and boundary data) that makes it exact, then test the code\'s convergence to it.',
            },
            {
              question: 'How do you test code whose output is random?',
              answerOutline:
                'Fixed seeds for exact regression tests; statistical tests comparing averages to exact values within a chosen number of standard errors, with a controlled false-failure rate.',
            },
          ],
        },
        {
          slug: 'reproducible-computational-workflows',
          title: 'Reproducible computational workflows and parallel runs',
          summary:
            'Structuring simulation projects so they can be rerun and trusted: version control, environments, configuration and provenance, data formats, seeds, parameter sweeps and embarrassingly parallel execution.',
          estimatedMinutes: 120,
          objectives: [
            'Organise a simulation project with version control, a package layout, configuration files and separate raw and derived data',
            'Pin software environments and record provenance (code version, parameters, seeds) with every output',
            'Store simulation output in appropriate formats (NumPy .npz, HDF5) with metadata',
            'Run parameter sweeps in parallel with multiprocessing or job arrays using independent random streams',
            'Produce a paper-ready figure pipeline that regenerates every figure from saved data with one command',
          ],
          concepts: [
            'Git and meaningful commits',
            'Package layout: src/, tests/, scripts/, data/',
            'Configuration files (YAML/TOML) instead of hard-coded parameters',
            'Environment pinning (requirements.txt, conda environment.yml)',
            'Provenance: storing git hash, parameters and seeds with outputs',
            'HDF5 and .npz data formats',
            'Embarrassingly parallel sweeps; multiprocessing; independent RNG streams (SeedSequence)',
            'Workflow tools (make, snakemake) and archiving (Zenodo DOIs)',
          ],
          explanation: `A simulation result is reproducible when someone else (or you, in a year) can regenerate it from the code and inputs. That is rarely true by accident. The essentials are simple and cumulative. Put everything in **git** from the first day and commit small, described changes; a commit hash then identifies exactly which code produced a result. Lay the project out as an importable package (\`src/\` with the physics, \`tests/\` with pytest, \`scripts/\` that run experiments, \`data/raw\` and \`data/derived\`, \`figures/\`), so that notebooks import tested functions instead of redefining them.

Keep parameters out of the code: a run is defined by a **configuration file** (YAML or TOML) listing physical parameters, numerical parameters (grid size, time step, tolerance) and the random seed. Each output file then carries its **provenance**: the configuration, the git commit hash (and whether the tree was dirty), library versions and run date. HDF5 (via \`h5py\`) and NumPy's \`.npz\` both store arrays with metadata; HDF5 also handles large datasets and partial reads. Pin the software **environment** with a \`requirements.txt\` or conda \`environment.yml\` listing versions; numerical results can change subtly between library versions.

Most research simulations are **parameter sweeps**: the same code at many temperatures, sizes or seeds. These are embarrassingly parallel, and the simplest effective approach is to make each run a function of its configuration and launch many with \`multiprocessing.Pool\`, \`concurrent.futures\` or a cluster job array. Random streams must be independent across workers: spawn them from a single \`numpy.random.SeedSequence\` rather than seeding workers with consecutive integers or the clock. Write each run's output to its own file, then aggregate in a separate analysis step.

Finally, automate the path from data to figures: a \`Makefile\` or \`snakemake\` workflow (or a single \`make_figures.py\`) that regenerates every figure and number in your report from saved data, so no figure is ever hand-edited or produced by a forgotten notebook cell. When you publish, archive the code and data with a DOI (Zenodo integrates with GitHub). These habits cost an hour at the start of a project and save weeks at the end; the capstone requires them.

Read the Software Carpentry Git lesson, the Turing Way chapters on reproducible environments and version control, the NumPy documentation on seeding parallel streams, and the h5py quick-start, then restructure one earlier project as in the exercises.`,
          resources: [
            {
              title: 'The Turing Way — Reproducible research (version control, environments, data management)',
              url: 'https://the-turing-way.netlify.app/',
              type: 'textbook',
              cost: 'free',
              provider: 'The Alan Turing Institute',
              primary: true,
            },
            {
              title: 'Software Carpentry — Lessons (Version Control with Git; Programming with Python)',
              url: 'https://software-carpentry.org/lessons/',
              type: 'course',
              cost: 'free',
              provider: 'The Carpentries',
            },
            {
              title: 'NumPy — Random sampling: parallel random number generation with SeedSequence',
              url: 'https://numpy.org/doc/stable/reference/random/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
            },
            {
              title: 'h5py documentation',
              url: 'https://docs.h5py.org/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'h5py',
              note: 'Quick-start guide: datasets, groups and attributes for metadata.',
            },
          ],
          exercises: [
            {
              slug: 'restructure-project',
              title: 'Restructure a project for reproducibility',
              prompt:
                'Take the Ising finite-size project (module 4) and restructure it: a `src/` package with the simulation kernel, a YAML config per run, a driver script that writes HDF5 output containing the data plus config, git hash and library versions as attributes, a pytest suite, a pinned environment file, and a README. Clone it into a fresh directory, create the environment from the file, run one configuration and confirm bit-identical output to the original run with the same seed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'parallel-sweep',
              title: 'A parallel parameter sweep with independent streams',
              prompt:
                'Run 40 Ising simulations (8 temperatures x 5 seeds) in parallel with `multiprocessing.Pool`, spawning child seeds with `SeedSequence.spawn`. Measure the wall-clock speed-up versus serial for 1, 2, 4 and all cores and plot parallel efficiency. Then demonstrate the danger of naive seeding by seeding workers with the same seed and showing identical "independent" runs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'figure-pipeline',
              title: 'A one-command figure pipeline',
              prompt:
                'Write a `Makefile` (or snakemake workflow) with targets that run the simulations defined by config files, aggregate the results, and generate every figure of a short report, with dependencies so that changing one config reruns only what is affected. Demonstrate by changing one temperature value and showing which targets rebuild. Archive the repository state with a tagged release.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What provenance information should be stored with every simulation output?',
              answerOutline:
                'Full configuration (physical and numerical parameters), random seed, code version (git hash, dirty flag), library versions, date and machine.',
            },
            {
              question: 'Why must parallel workers not be seeded with consecutive integers or the clock?',
              answerOutline:
                'Streams may overlap or be correlated, and clock seeds are not reproducible; SeedSequence.spawn creates statistically independent, reproducible child streams.',
            },
            {
              question: 'Why separate simulation, aggregation and plotting steps?',
              answerOutline:
                'Expensive runs are not repeated when only analysis or figures change, each step can be tested, and a workflow tool can rebuild exactly what is affected.',
            },
            {
              question: 'Name three things that make a computational result reproducible by someone else.',
              answerOutline:
                'Version-controlled code with a tagged release, pinned environment, configs and seeds stored with outputs, scripted figure generation, archived data/code (DOI).',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'validated-simulation-project',
    title: 'Capstone: a complete simulation study with validation against analytic results',
    description: `Choose a physical system that requires simulation and carry out a complete computational study of it, to the standard of a short research paper. Suitable choices include: the restricted three-body problem and the stability of Trojan orbits; the 2D Ising model with Wolff updates and finite-size scaling of critical exponents; a Lennard-Jones fluid's equation of state and liquid-gas coexistence; a 2D FDTD simulation of electromagnetic waves in a waveguide or photonic crystal; wave-packet scattering from a double barrier with resonant tunnelling; a self-gravitating disc with a tree code; or the Kuramoto model of coupled oscillators.

The study must: derive the governing equations and the expected analytic behaviour in at least two limiting cases; justify the choice of numerical methods; verify the code with convergence tests at the theoretical order, conservation diagnostics and (where applicable) a manufactured solution or exact small-system result; reproduce at least two analytic or published benchmark results quantitatively; then use the code to answer a question that is not available analytically, with numerical uncertainties estimated alongside statistical ones. The code must be a tested, documented package with a reproducible pipeline that regenerates every figure from configuration files.`,
    deliverables: [
      'A git repository with the simulation package, pytest suite (including convergence-order and conservation tests), configuration files, pinned environment and a one-command figure pipeline',
      'A verification section: convergence plots at the expected order, conservation diagnostics, and benchmark reproductions with quantified agreement',
      'An 8-12 page report: physical model, derivation of limits, methods and their justification, verification, results with numerical and statistical uncertainties, discussion of limitations',
      'A performance appendix: profile of the final code, optimisations applied and their measured speed-ups',
    ],
    estimatedHours: 35,
    stretchGoals: [
      'Implement a second, independent numerical method for the same system and show the two agree within their estimated errors',
      'Parallelise the main kernel (Numba prange or multiprocessing) and report strong and weak scaling',
      'Compare one result quantitatively with experimental data and discuss validation as distinct from verification',
    ],
  },
  masteryChecklist: [
    'I can explain floating-point representation, identify catastrophic cancellation and choose step sizes that balance truncation and rounding error',
    'I can implement and verify quadrature, root-finding, optimisation and linear-algebra routines and know when to use library versions',
    'I can choose and implement appropriate ODE integrators (RK4, adaptive, implicit, symplectic) and measure their convergence and conservation properties',
    'I can apply Monte Carlo integration with importance sampling and simulate statistical-mechanics systems with Metropolis, including correct error analysis',
    'I can solve elliptic, parabolic and hyperbolic PDEs with finite differences, derive their stability conditions and verify their convergence',
    'I can use the FFT correctly for spectral analysis, filtering, convolution and spectral PDE solvers, and analyse unevenly sampled data',
    'I can write gravitational N-body and molecular dynamics codes with appropriate integrators, boundary conditions and diagnostics, and accelerate them with trees or neighbour lists',
    'I can profile and optimise numerical Python code with vectorisation and Numba without sacrificing correctness',
    'I can verify and validate a simulation with convergence tests, manufactured solutions, conservation laws and automated tests',
    'I can organise a simulation project reproducibly, from configuration files to a one-command figure pipeline',
  ],
});
