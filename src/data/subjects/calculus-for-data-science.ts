import { defineSubject } from '../define';

export default defineSubject({
  id: 'calculus-for-data-science',
  title: 'Calculus for Data Science',
  category: 'data-science',
  tagline:
    'A complete first calculus course for someone with algebra and no calculus: limits, derivatives, integrals and gradients, taught through growth, loss functions, densities and fitting models to data.',
  description: `This is a full first course in calculus. It starts from algebra and assumes you have never seen a derivative. It follows the topics in the public catalog description of MATH 220 (Calculus) at the University of Illinois Urbana-Champaign, the calculus course in the Illinois data science core: limits, continuity, differentiation and its applications, integration and the fundamental theorem. All the content here is original, and this course is not affiliated with Illinois.

Every idea is taught from the beginning and worked through by hand, because calculus only becomes usable once the steps are automatic. The applications come from data, and they are real uses rather than decoration. A derivative is how you minimise a loss, and it explains why the mean is the best guess under squared error and the median under absolute error. An integral turns a density into a probability and a rate into a total. Newton's method is what runs inside a logistic regression fit. Module 6 goes past a typical first course, into partial derivatives, gradient descent and the chain rule behind backpropagation, because every later modeling course needs them.

You can follow the whole course with pencil and paper. Python appears for checks, and two machine problems and a final project bring you to real data in VS Code, with the setup and the few Python features you need spelled out on the page. The course pairs with Linear Algebra for Data Science and leads into Probability and Statistics and Machine Learning. Mathematical Methods for Physics is a faster review for someone who already knows calculus, so treat it as a later reference rather than a substitute.`,
  difficulty: 'beginner',
  estimatedHours: 80,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra: fractions, exponents, solving equations and working with graphs',
    'No calculus is assumed',
    'No programming is assumed. The machine problems spell out the Python they need',
  ],
  tags: ['calculus', 'derivatives', 'integrals', 'optimisation', 'gradient descent', 'data science', 'mathematics'],
  core: false,
  modules: [
    {
      slug: 'functions-and-limits',
      title: 'Functions and Limits',
      description:
        'The algebra calculus is built on: functions, exponentials and logarithms, and trigonometric functions. Then the one new idea everything else rests on, the limit, and the continuity it defines.',
      lessons: [
        {
          slug: 'algebra-and-functions',
          title: 'Algebra review: functions, lines and powers',
          summary:
            'Functions as rules, lines and their slopes, exponent laws, composition and inverses: the algebra every later lesson uses without comment.',
          estimatedMinutes: 110,
          objectives: [
            'State the domain and range of a function given by a formula',
            'Find a line from two points and interpret its slope with units',
            'Simplify expressions using the exponent laws, including negative and fractional powers',
            'Compose two functions and find an inverse by solving for the input',
            'Describe how shifting and scaling change a graph',
          ],
          concepts: [
            'Function, domain and range',
            'Slope as change in output per unit input',
            'Exponent laws',
            'Negative and fractional powers',
            'Composition f(g(x))',
            'Inverse function',
            'Shifts and scaling of graphs',
          ],
          explanation: `A **function** is a rule that takes an input and gives exactly one output. In $f(x) = 3 + 2x$, the input $x$ might be years of experience and the output a predicted salary. The **domain** is the set of allowed inputs, and the **range** is the set of outputs. $f(x) = \\sqrt{x}$ needs $x \\ge 0$, and $f(x) = 1/x$ needs $x \\ne 0$. A statistical model is a function, so this is the vocabulary of everything that follows.

**Lines.** The slope between two points is

$$m = \\frac{y_2 - y_1}{x_2 - x_1}.$$

It has units: dollars per year, or users per month. Then $y = y_1 + m(x - x_1)$. Calculus exists to extend the idea of slope to curves, so make sure it means *change in output per unit of input* to you, and not just "rise over run".

**Powers.** You will use these laws constantly:

$$x^a x^b = x^{a+b}, \\quad (x^a)^b = x^{ab}, \\quad x^{-a} = \\frac{1}{x^a}, \\quad x^{1/2} = \\sqrt{x}.$$

Rewriting $\\frac{1}{\\sqrt{x}}$ as $x^{-1/2}$ is the first step of many derivatives. A classic error is $(x + y)^2 = x^2 + y^2$. It is wrong, because $(x + y)^2 = x^2 + 2xy + y^2$.

**Composition** chains functions: $f(g(x))$ means apply $g$, then $f$. If $g(x) = x - 70$ and $f(u) = u / 10$, then $f(g(x)) = (x - 70)/10$, which is a z-score with mean 70 and standard deviation 10. Being able to see a complicated formula as a chain of simple steps is exactly what the chain rule needs.

**Inverses** undo a function. To invert $y = (x - 70)/10$, solve for $x$ to get $x = 70 + 10y$. Only functions that never repeat an output have an inverse, so $x^2$ needs its domain restricted.

**Shifts and scaling.** Replacing $x$ with $x - c$ moves a graph right by $c$. Multiplying the output by $a$ stretches it vertically.

Work through the review below until the laws are automatic, and graph each new function in Desmos before computing with it.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 1.1 Review of Functions', url: 'https://openstax.org/books/calculus-volume-1/pages/1-1-review-of-functions', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Functions, domain, range and composition, with exercises and answers to the odd ones.', primary: true },
            { title: 'Algebra/Trig Review', url: 'https://tutorial.math.lamar.edu/Extras/AlgebraTrigReview/AlgebraTrigIntro.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'Worked problems. Use it as a diagnostic and fill any gaps it shows.' },
            { title: 'Desmos Graphing Calculator', url: 'https://www.desmos.com/calculator', type: 'tool', cost: 'free', provider: 'Desmos', note: 'Graph every function in this module. Sliders are ideal for shifts and scaling.' },
          ],
          exercises: [
            {
              slug: 'line-from-two-months',
              title: 'A line from two data points',
              prompt:
                'A service had 1.2 million users in month 3 and 1.8 million in month 9. (a) Find the line through these points and state the slope with units. (b) Predict month 15. (c) Find the month the line reaches 3 million. (d) Say in one sentence why this prediction could be badly wrong. Expected: slope 0.1 million users per month, 2.4 million at month 15, and 3 million at month 21.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rewrite-with-powers',
              title: 'Rewrite with powers',
              prompt:
                'Write each as a single power or a sum of powers of $x$: (a) $\\frac{1}{x^3}$, (b) $\\sqrt{x}\\,x^2$, (c) $\\frac{x^2 + 1}{\\sqrt{x}}$, (d) $(x^{1/3})^6$, (e) $\\frac{1}{\\sqrt[3]{x}}$. Then decide whether $\\sqrt{x + y} = \\sqrt{x} + \\sqrt{y}$ is true by testing $x = 9$, $y = 16$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'compose-and-invert',
              title: 'Compose and invert a standardisation',
              prompt:
                'Let $g(x) = x - 500$ and $f(u) = u / 100$. (a) Write $f(g(x))$ as one formula. (b) Write $g(f(x))$ and show it is a different function. (c) Invert $z = (x - 500)/100$. (d) Use the inverse to turn $z = 1.5$ back into a score. Expected: $x = 650$.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes a rule a function, and what does the domain tell you?',
              answerOutline: 'Each input gives exactly one output. The domain is the set of inputs for which the rule is defined.',
            },
            {
              question: 'What do the units of a slope tell you?',
              answerOutline: 'They are output units per input unit, so the slope is a rate of change, such as dollars per year.',
            },
            {
              question: 'Why is it useful to see $(x - 70)/10$ as a composition?',
              answerOutline: 'It is two simple steps, shift then scale. Seeing formulas as chains of steps is what the chain rule depends on.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/limits-and-derivatives'],
        },
        {
          slug: 'exponentials-and-logarithms',
          title: 'Exponentials and logarithms',
          summary:
            'Growth by a fixed percentage, the number e, the natural logarithm and its laws, doubling times, and why data scientists take logs.',
          estimatedMinutes: 120,
          objectives: [
            'Tell exponential growth from linear growth in a table of values',
            'Use the laws of logarithms to solve for a variable in an exponent',
            'Compute doubling times and half-lives',
            'Explain why logarithms turn products into sums and why that matters for likelihoods',
            'Convert between probabilities, odds and log-odds',
          ],
          concepts: [
            'Exponential function $a^x$',
            'The number $e$',
            'Natural logarithm as the inverse of $e^x$',
            'Log laws',
            'Doubling time and half-life',
            'Log transform',
            'Odds and log-odds',
          ],
          explanation: `Linear growth adds a fixed amount each step. **Exponential** growth multiplies by a fixed factor. A quantity growing 7% per day satisfies $N(t) = N_0 (1.07)^t$, and each day's value is 1.07 times the last. To test a table for exponential growth, look at ratios of consecutive values rather than differences.

The most important base is $e \\approx 2.71828$. You will see why in Module 2, where $e^x$ turns out to be the function that equals its own derivative. Any exponential can be written $N_0 e^{rt}$, where $r$ is the continuous growth rate.

The **natural logarithm** $\\ln x$ is the inverse of $e^x$: $\\ln(e^x) = x$, and $e^{\\ln x} = x$ for $x > 0$. It answers "what power of $e$ gives this?" Its laws come directly from the exponent laws:

$$\\ln(ab) = \\ln a + \\ln b, \\quad \\ln(a/b) = \\ln a - \\ln b, \\quad \\ln(a^k) = k \\ln a.$$

Note that $\\ln(a + b)$ has no such rule, and that mistake is common.

**Solving for time.** To find when $N_0 e^{rt}$ doubles, solve $e^{rt} = 2$. Taking logs gives $rt = \\ln 2$, so the **doubling time** is $t = \\ln 2 / r \\approx 0.693 / r$. Decay works the same way: $e^{-kt}$ has **half-life** $\\ln 2 / k$. A one-step growth factor $b$ gives $t = \\ln 2 / \\ln b$.

**Why data scientists take logs.** First, a skewed quantity such as income or city size often looks symmetric after a log transform, because differences of logs are ratios. Second, probabilities multiply, so a likelihood is a product of many small numbers that underflows in a computer. Its logarithm is a sum, which is stable and much easier to differentiate. Third, exponential growth plots as a straight line on a log scale, with slope $r$.

**Log-odds.** If $p$ is a probability, the odds are $p / (1 - p)$ and the log-odds is $\\ln(p / (1 - p))$. This maps $(0, 1)$ onto every real number, and logistic regression is built on it.

Read the OpenStax section, then do its exercises on solving exponential equations until you never need to look up the laws.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 1.5 Exponential and Logarithmic Functions', url: 'https://openstax.org/books/calculus-volume-1/pages/1-5-exponential-and-logarithmic-functions', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Exponentials, logarithms and their laws, with growth examples.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'Keep this for Module 2, where the chapter on derivatives of exponentials explains what is special about e.' },
          ],
          exercises: [
            {
              slug: 'doubling-time',
              title: 'Doubling times',
              prompt:
                'A page gains 7% more views each day. (a) Find the doubling time using $\\ln 2 / \\ln 1.07$. (b) Find the doubling time if the continuous rate is $r = 0.07$. (c) Explain why they differ. (d) Test the rule of thumb "70 divided by the percentage". Expected: about 10.24 days and 9.90 days.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'underflow',
              title: 'Why likelihoods use logs',
              prompt:
                'The chance of a particular sequence of 2,000 fair coin flips is $0.5^{2000}$. (a) Compute its natural log by hand using the log laws. (b) If you have Python, evaluate `0.5 ** 2000` and `2000 * math.log(0.5)` and report both. (c) Explain what underflow is and why every statistics library works with log-likelihoods. Expected: about $-1386.3$, while the direct power prints `0.0`.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Python is optional here. Part (a) and part (c) can be done on paper.',
            },
            {
              slug: 'log-odds',
              title: 'Probabilities, odds and log-odds',
              prompt:
                'For $p = 0.5, 0.8, 0.99$ compute the odds and the log-odds. Then solve $\\ln(p/(1 - p)) = t$ for $p$, and show the answer can be written $p = 1/(1 + e^{-t})$. Expected: for $p = 0.8$ the odds are 4 and the log-odds is about 1.386. You have just derived the logistic function.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How can you tell exponential growth from linear growth in a table?',
              answerOutline: 'Linear growth has constant differences. Exponential growth has constant ratios, and it plots as a straight line on a log scale.',
            },
            {
              question: 'Derive the doubling time of $N_0 e^{rt}$.',
              answerOutline: 'Set $e^{rt} = 2$, take logs to get $rt = \\ln 2$, so $t = \\ln 2 / r$.',
            },
            {
              question: 'Give two reasons to work with a log-likelihood rather than a likelihood.',
              answerOutline: 'Products of many small numbers underflow, while sums of logs do not. Sums are also far easier to differentiate than products.',
            },
          ],
        },
        {
          slug: 'trigonometric-functions',
          title: 'Trigonometric functions and seasonality',
          summary:
            'Radians, sine and cosine as coordinates on a circle, amplitude, period and phase, and how these functions model repeating patterns in data.',
          estimatedMinutes: 110,
          objectives: [
            'Convert between degrees and radians and explain why calculus uses radians',
            'Read sine and cosine from the unit circle',
            'Write a seasonal model with a chosen mean, amplitude, period and peak time',
            'Combine a sine and a cosine into a single wave',
            'Use sine and cosine to encode a cyclic feature such as hour of day',
          ],
          concepts: [
            'Radians',
            'Unit circle',
            'Sine, cosine and tangent',
            'Amplitude, period and phase',
            '$\\sin^2\\theta + \\cos^2\\theta = 1$',
            'Seasonal models',
            'Cyclic feature encoding',
          ],
          explanation: `Put a point on a circle of radius 1 and rotate it by an angle $\\theta$. Its coordinates are $(\\cos\\theta, \\sin\\theta)$. That is the definition, and it gives you the main identity at once, by Pythagoras: $\\sin^2\\theta + \\cos^2\\theta = 1$. The **tangent** is $\\tan\\theta = \\sin\\theta / \\cos\\theta$.

Calculus measures angles in **radians**, where a full turn is $2\\pi$. So $180^\\circ = \\pi$ and $90^\\circ = \\pi/2$. A radian is the angle that sweeps out an arc as long as the radius, and this is what makes the derivative of $\\sin x$ equal exactly $\\cos x$. In degrees, an ugly factor of $\\pi/180$ appears. Set your calculator to radians and leave it there.

**Key values.** $\\sin 0 = 0$, $\\sin(\\pi/2) = 1$, $\\sin\\pi = 0$, $\\cos 0 = 1$, $\\cos(\\pi/2) = 0$, $\\cos\\pi = -1$. Both functions repeat every $2\\pi$.

**A general wave.** Any smooth repeating pattern can start from

$$y(t) = m + A \\sin\\!\\left(\\frac{2\\pi (t - t_0)}{P}\\right),$$

where $m$ is the mean level, $A$ the **amplitude** (half the peak-to-trough swing), $P$ the **period**, and $t_0$ shifts the wave in time. For monthly temperatures, $P = 12$. The factor $2\\pi / P$ matters: when $t$ advances by $P$, the angle advances by exactly one full turn. Forgetting it is the most common mistake.

**Two waves into one.** A sine and a cosine of the same period always add up to a single shifted wave:

$$a \\sin\\theta + b \\cos\\theta = R \\sin(\\theta + \\phi), \\quad R = \\sqrt{a^2 + b^2}.$$

This is why seasonal regression uses both a sine and a cosine column. The fit can then choose the amplitude and the timing freely.

**Cyclic features.** Hour 23 and hour 1 are close in time but far apart as numbers. Encoding an hour $h$ as the pair $(\\sin(2\\pi h/24), \\cos(2\\pi h/24))$ places hours on a circle, so distances behave correctly.

Read the OpenStax section, and use Desmos sliders for $m$, $A$, $P$ and $t_0$ until you can predict each change before you make it.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 1.3 Trigonometric Functions', url: 'https://openstax.org/books/calculus-volume-1/pages/1-3-trigonometric-functions', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Radians, the unit circle, identities and graphs.', primary: true },
            { title: 'Desmos Graphing Calculator', url: 'https://www.desmos.com/calculator', type: 'tool', cost: 'free', provider: 'Desmos', note: 'Add sliders for the mean, amplitude, period and phase of a sine wave.' },
          ],
          exercises: [
            {
              slug: 'read-a-seasonal-model',
              title: 'Read a seasonal model',
              prompt:
                'A monthly temperature model is $T(m) = 12 + 10 \\sin(2\\pi (m - 4)/12)$, with $m$ in months. Find the mean, amplitude and period. Find the hottest and coldest months and their temperatures. Expected: the peak is at $m = 7$ with 22 degrees, and the trough at $m = 1$ with 2 degrees.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'two-waves-into-one',
              title: 'Two waves into one',
              prompt:
                'Use a graph or a table to confirm that $3 \\sin\\theta + 4 \\cos\\theta$ is a single wave with amplitude 5. Using the angle addition formula $\\sin(\\theta + \\phi) = \\sin\\theta\\cos\\phi + \\cos\\theta\\sin\\phi$, find $\\phi$, then show why $R = \\sqrt{a^2 + b^2}$ in general. Expected: $\\phi \\approx 0.927$ radians.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Match coefficients: $R\\cos\\phi = a$ and $R\\sin\\phi = b$.',
            },
            {
              slug: 'cyclic-hours',
              title: 'Encode hours on a circle',
              prompt:
                'Encode the hours 23, 1 and 11 as points $(\\sin(2\\pi h/24), \\cos(2\\pi h/24))$. Compute the straight-line distance between hours 23 and 1, and between hours 23 and 11. Compare these with the plain differences 22 and 12, and explain which better describes time of day. Expected: about 0.518 and exactly 2.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does calculus use radians?',
              answerOutline: 'With radians, the derivative of $\\sin x$ is exactly $\\cos x$. In degrees every derivative picks up a factor of $\\pi/180$.',
            },
            {
              question: 'What is the role of the factor $2\\pi/P$ in a seasonal model?',
              answerOutline: 'It converts time into angle so that one period of $t$ corresponds to one full turn of $2\\pi$.',
            },
            {
              question: 'Why does a seasonal regression use both a sine and a cosine?',
              answerOutline: 'Their combination is one wave of any amplitude and phase, so the fit can find the timing using ordinary linear coefficients.',
            },
          ],
        },
        {
          slug: 'limits',
          title: 'Limits',
          summary:
            'What it means for a function to approach a value, how to compute limits with algebra, one-sided limits, and limits at infinity.',
          estimatedMinutes: 130,
          objectives: [
            'Estimate a limit from a table and a graph, and recognise when it does not exist',
            'Compute limits using the limit laws and algebraic simplification',
            'Evaluate one-sided limits and limits at infinity',
            'Explain why the value at a point and the limit at that point are different things',
            'Spot when a computer table stops being trustworthy because of rounding',
          ],
          concepts: [
            'Limit as approaching, not arriving',
            'One-sided limits',
            'Limit laws',
            'Indeterminate form $0/0$',
            'Limits at infinity and horizontal asymptotes',
            '$\\lim_{x \\to 0} \\sin x / x = 1$',
            '$e$ as a limit',
          ],
          explanation: `Calculus is built on one question: what value does a function *approach*, as its input gets close to some point? We write

$$\\lim_{x \\to a} f(x) = L$$

to mean that $f(x)$ can be made as close to $L$ as you like by taking $x$ close enough to $a$, without ever setting $x = a$. What happens at $a$ itself does not matter. The function need not even be defined there.

**Why this matters.** Take $f(x) = (x^2 - 1)/(x - 1)$. At $x = 1$ it reads $0/0$, which has no value. Yet a table shows $f(0.9) = 1.9$, $f(0.99) = 1.99$, and $f(1.01) = 2.01$. Factoring shows why:

$$\\frac{x^2 - 1}{x - 1} = \\frac{(x - 1)(x + 1)}{x - 1} = x + 1 \\quad (x \\ne 1),$$

so the limit is 2. Every derivative in Module 2 is a $0/0$ limit of this kind, which is why you learn this first.

**Computing limits.** If $f$ is built from polynomials, roots, exponentials and trig functions and is defined at $a$, substitute. If you get $0/0$, simplify first: factor, cancel, or multiply by a conjugate. The **limit laws** say limits pass through sums, products and quotients, provided the pieces exist and you do not divide by zero.

**One-sided limits.** $\\lim_{x \\to a^-}$ approaches from below and $\\lim_{x \\to a^+}$ from above. The two-sided limit exists only if both agree. For $f(x) = |x|/x$, the left limit at 0 is $-1$ and the right limit is $+1$, so there is no limit.

**At infinity.** $\\lim_{x \\to \\infty} f(x)$ asks for long-run behaviour. Divide by the highest power: $\\frac{3x^2 + 1}{x^2 + 5} \\to 3$. The logistic curve $1/(1 + e^{-x})$ tends to 1 as $x \\to \\infty$ and to 0 as $x \\to -\\infty$. Two limits worth memorising are $\\lim_{x \\to 0} \\sin x / x = 1$ and $\\lim_{n \\to \\infty} (1 + 1/n)^n = e$.

**A pitfall.** Tables on a computer lie for very small inputs. Rounding error can make $(1 - \\cos x)/x^2$ print 0 at $x = 10^{-9}$, when the true limit is $1/2$.

Work the OpenStax sections on limits, doing the table problems first and then the algebraic ones.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 2.2 The Limit of a Function', url: 'https://openstax.org/books/calculus-volume-1/pages/2-2-the-limit-of-a-function', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Intuitive limits, one-sided limits and infinite limits. Continue into 2.3 on the limit laws.', primary: true },
            { title: "Paul's Online Notes: Calculus I", url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'The Limits chapter has many fully worked examples of simplifying $0/0$ forms.' },
            { title: 'MIT 18.01SC Single Variable Calculus', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 1 opens with limits and continuity, with short videos and problem sets.' },
          ],
          exercises: [
            {
              slug: 'simplify-zero-over-zero',
              title: 'Simplify $0/0$ forms',
              prompt:
                'Evaluate by simplifying: (a) $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$, (b) $\\lim_{h \\to 0} \\frac{(2 + h)^2 - 4}{h}$, (c) $\\lim_{x \\to 4} \\frac{\\sqrt{x} - 2}{x - 4}$, (d) $\\lim_{x \\to \\infty} \\frac{5x^3 - x}{2x^3 + 7}$. Expected: 6, 4, 1/4 and 5/2. Part (b) is the first derivative you have computed, though it has not been named yet.',
              kind: 'problem',
              difficulty: 1,
              hint: 'For (c), multiply the top and bottom by $\\sqrt{x} + 2$.',
            },
            {
              slug: 'limit-tables',
              title: 'Build limit tables',
              prompt:
                'By calculator or in Python, tabulate $(e^h - 1)/h$, $\\sin(h)/h$ and $(1 + h)^{1/h}$ for $h = 0.1, 0.01, 0.001$ and for the same negative values. State the limit each table suggests. Then evaluate $(1 - \\cos h)/h^2$ at $h = 10^{-4}$ and $h = 10^{-9}$, and explain why the second value is wrong. Expected limits: 1, 1 and $e$. The last expression should approach $1/2$, but prints 0 at $h = 10^{-9}$ in double precision.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'one-sided-sign',
              title: 'When a limit fails to exist',
              prompt:
                'A classifier outputs $s(x) = 1$ when $x \\ge 0$ and $s(x) = 0$ when $x < 0$. Find the left limit, the right limit and $s(0)$. Does $\\lim_{x \\to 0} s(x)$ exist? Now compare with $\\sigma(x) = 1/(1 + e^{-10x})$. Find $\\lim_{x \\to \\infty} \\sigma(x)$, $\\lim_{x \\to -\\infty} \\sigma(x)$ and $\\lim_{x \\to 0} \\sigma(x)$, and explain in a sentence why smooth outputs help when fitting a model.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Can a limit exist at a point where the function is undefined? Give an example.',
              answerOutline: 'Yes. $(x^2 - 1)/(x - 1)$ is undefined at 1, and its limit there is 2. A limit depends only on nearby values.',
            },
            {
              question: 'What should you do when direct substitution gives $0/0$?',
              answerOutline: 'Treat it as a signal to simplify, by factoring, cancelling or using a conjugate. It is not an answer in itself.',
            },
            {
              question: 'When does a two-sided limit fail to exist even though both one-sided limits do?',
              answerOutline: 'When the left and right limits disagree, as with $|x|/x$ at 0 or a step function.',
            },
            {
              question: 'How do you find the limit at infinity of a ratio of polynomials?',
              answerOutline: 'Divide the top and bottom by the highest power. Only the leading terms survive.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/limits-and-derivatives'],
        },
        {
          slug: 'continuity',
          title: 'Continuity and the intermediate value theorem',
          summary:
            'What continuity means precisely, the kinds of discontinuity, and how the intermediate value theorem powers bisection, a root finder that cannot fail.',
          estimatedMinutes: 100,
          objectives: [
            'State the three conditions for continuity at a point',
            'Classify removable, jump and infinite discontinuities',
            'Find a constant that makes a piecewise function continuous',
            'State the intermediate value theorem and use it to prove a root exists',
            'Run bisection and predict how many steps a given accuracy needs',
          ],
          concepts: [
            'Continuity at a point',
            'Removable, jump and infinite discontinuities',
            'Piecewise functions',
            'Intermediate value theorem',
            'Bisection',
            'Continuous but not smooth (a kink)',
          ],
          explanation: `A function is **continuous** at $a$ when three things hold: $f(a)$ is defined, $\\lim_{x \\to a} f(x)$ exists, and they are equal. Informally, the graph has no break at $a$. All polynomials, exponentials, sines and cosines are continuous everywhere, and logarithms and roots are continuous on their domains. Sums, products and compositions of continuous functions are continuous too, so you rarely check by hand.

**Kinds of discontinuity.** A *removable* one is a single missing or misplaced point, as with $(x^2 - 1)/(x - 1)$ at 1. A *jump* has different one-sided limits, as with a tax bill that charges a flat fee once income crosses a line, or a classifier that switches from 0 to 1. An *infinite* one has a vertical asymptote, as $1/x$ does at 0.

**Piecewise functions** appear everywhere in data work. To join two pieces continuously, make the one-sided limits equal at the boundary. A tiered price or an income tax with marginal rates is continuous even though its slope jumps: $T(x) = 0.1x$ up to 10,000 and $1000 + 0.2(x - 10000)$ above that. Both formulas give 1,000 at the boundary. Such a point is a *kink*: continuous, but with no single slope. The ReLU function $\\max(0, x)$ in neural networks has one at 0.

**Intermediate value theorem.** If $f$ is continuous on $[a, b]$ and $N$ lies between $f(a)$ and $f(b)$, then $f(c) = N$ for some $c$ in $(a, b)$. You cannot get from below a line to above it without crossing. In particular, if $f(a)$ and $f(b)$ have opposite signs, $f$ has a root between them.

**Bisection** turns this into an algorithm. Take the midpoint $c$. If $f(c)$ has the same sign as $f(a)$, replace $a$ with $c$, and otherwise replace $b$ with $c$. Each step halves the interval, so after $n$ steps the width is $(b - a)/2^n$. It needs no derivatives and it cannot fail on a continuous function with a sign change. Statistical software uses the same idea to find quantiles, by solving $F(x) = p$ for a cumulative distribution.

Read the OpenStax section, then run bisection by hand for four steps before writing any code.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 2.4 Continuity', url: 'https://openstax.org/books/calculus-volume-1/pages/2-4-continuity', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Types of discontinuity and the intermediate value theorem.', primary: true },
            { title: "Paul's Online Notes: Calculus I", url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'The section on continuity gives worked examples with piecewise functions.' },
          ],
          exercises: [
            {
              slug: 'join-the-pieces',
              title: 'Join two pieces',
              prompt:
                'Let $f(x) = x^2$ for $x < 2$ and $f(x) = 3x + c$ for $x \\ge 2$. Find $c$ so $f$ is continuous, then graph it. Does the slope match at the join? Now check that the tax function $T(x)$ from the lesson is continuous at 10,000, and find the income at which the tax equals 2,500. Expected: $c = -2$, and an income of 17,500.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'bisection-by-hand',
              title: 'Bisection by hand',
              prompt:
                'Show that $f(x) = x^3 - x - 2$ has a root in $[1, 2]$ using the intermediate value theorem. Run four bisection steps by hand and record each interval. How many steps guarantee a width below $10^{-6}$? Optionally, code it in Python as a function `bisect(f, a, b, tol)`. Expected: the root is near 1.5214, and 20 steps are enough.',
              kind: 'problem',
              difficulty: 2,
              hint: 'You need $1/2^n < 10^{-6}$. Take logs.',
            },
            {
              slug: 'classify-discontinuities',
              title: 'Classify the breaks',
              prompt:
                'Classify each discontinuity as removable, jump or infinite, and say what real quantity could behave this way: (a) $(x^2 - 4)/(x - 2)$ at 2, (b) a shipping cost of 5 below 50 and 0 at or above 50, as a function of order value, (c) $1/(x - 3)$ at 3, (d) $|x - 1|/(x - 1)$ at 1. For (b), explain what behaviour such a jump causes near 50.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What three conditions define continuity at a point?',
              answerOutline: '$f(a)$ exists, the limit at $a$ exists, and the two are equal.',
            },
            {
              question: 'State the intermediate value theorem. What goes wrong without continuity?',
              answerOutline: 'A continuous function on an interval takes every value between its endpoint values. A jump can skip a value, so a sign change would not guarantee a root.',
            },
            {
              question: 'How does the error of bisection shrink with the number of steps?',
              answerOutline: 'It halves each step, so the width after $n$ steps is $(b - a)/2^n$. This is reliable but slower than Newton\'s method near a root.',
            },
          ],
          relatedLessons: ['computational-physics/numerical-calculus-and-linear-algebra/root-finding-and-optimisation'],
        },
      ],
    },
    {
      slug: 'derivatives',
      title: 'Derivatives',
      description:
        'The derivative as an instantaneous rate of change, defined by a limit and then computed with rules: powers, sums, products, quotients, the chain rule and implicit differentiation.',
      lessons: [
        {
          slug: 'the-derivative',
          title: 'The derivative: slope of a curve',
          summary:
            'From average rate of change to instantaneous rate: the limit definition, what the notation means, and how to estimate a derivative from data.',
          estimatedMinutes: 130,
          objectives: [
            'Compute an average rate of change and interpret it with units',
            'Use the limit definition to differentiate simple functions',
            'Read and use the notations $f\'(x)$, $dy/dx$ and $\\frac{d}{dx}$',
            'Explain why $|x|$ has no derivative at 0',
            'Estimate a derivative from a table of data using a central difference',
          ],
          concepts: [
            'Average rate of change',
            'Secant and tangent lines',
            'Derivative as a limit',
            'Leibniz notation $dy/dx$',
            'Differentiable implies continuous',
            'Forward and central differences',
          ],
          explanation: `Suppose $C(t)$ is an atmospheric CO2 reading at time $t$. The **average rate of change** from $t$ to $t + h$ is

$$\\frac{C(t + h) - C(t)}{h},$$

the slope of a **secant** line through two points. If you shrink $h$, the secant turns into the **tangent** line, and its slope is the instantaneous rate of change. That limit is the **derivative**:

$$f'(x) = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}.$$

Its units are output per input: ppm per year, or loss per unit of a parameter. It reads $0/0$ at $h = 0$, which is why limits came first.

**A worked example.** For $f(x) = x^2$,

$$\\frac{(x + h)^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h \\to 2x.$$

So the slope of $x^2$ at $x = 3$ is 6: near 3, the output changes about 6 times as fast as the input. The derivative is itself a function, telling you the slope at every point.

**Notation.** $f'(x)$, $y'$, $\\frac{dy}{dx}$ and $\\frac{d}{dx}f(x)$ all mean the same thing. Leibniz's $\\frac{dy}{dx}$ is not literally a fraction, but it behaves like one so often that it is worth using.

**Sign and size.** $f' > 0$ means rising, $f' < 0$ falling, and $f' = 0$ a flat spot, which is where maxima and minima hide. A large $|f'|$ means the output is sensitive to the input.

**Differentiability.** A function with a derivative at a point is continuous there, but not the reverse. $|x|$ is continuous at 0, yet its slope is $-1$ on the left and $+1$ on the right, so no single tangent exists. Kinks, jumps and vertical tangents all fail.

**Derivatives from data.** You often have a table rather than a formula. The **forward difference** $(f(x + h) - f(x))/h$ has an error proportional to $h$. The **central difference** $(f(x + h) - f(x - h))/2h$ has an error proportional to $h^2$, so it is much better for the same data. Its one risk is noise: dividing small differences by a small $h$ amplifies measurement error.

Watch the first chapters of the 3Blue1Brown series, then do the limit-definition problems in OpenStax 3.1 by hand.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 3.1 Defining the Derivative', url: 'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Difference quotients and the limit definition, with a set of drill problems.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'Chapters 1 and 2 build the idea of a derivative from a picture.' },
            { title: 'MIT 18.01SC Single Variable Calculus', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 1, Part A covers the definition with recitation videos.' },
          ],
          exercises: [
            {
              slug: 'from-the-definition',
              title: 'Differentiate from the definition',
              prompt:
                'Use the limit definition to find the derivative of (a) $f(x) = x^2 + 3x$, (b) $f(x) = 1/x$, (c) $f(x) = \\sqrt{x}$. Show the algebra that removes $h$. Expected: $2x + 3$, $-1/x^2$ and $1/(2\\sqrt{x})$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), multiply the top and bottom by $\\sqrt{x + h} + \\sqrt{x}$.',
            },
            {
              slug: 'rates-from-a-table',
              title: 'Rates from a table',
              prompt:
                'A product has 100, 130, 170, 220 and 290 users on days 0 to 4. (a) Estimate the rate at days 1, 2 and 3 with central differences. (b) Estimate the growth rate per user at day 2 by dividing the rate by the number of users. (c) Say whether this looks closer to linear or exponential growth, and give your evidence. Expected: 35, 45 and 60 users per day, and about 26% per day at day 2.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'difference-accuracy',
              title: 'Compare forward and central differences',
              prompt:
                'For $f(x) = e^x$ at $x = 1$, where the true derivative is $e$, compute the forward and central differences at $h = 0.1, 0.01, 0.001$ on a calculator or in Python. Record the absolute errors. What happens to each error when $h$ shrinks by a factor of 10? Expected at $h = 0.001$: about $1.36 \\times 10^{-3}$ for forward and $4.53 \\times 10^{-7}$ for central.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between an average and an instantaneous rate of change?',
              answerOutline: 'The average is a secant slope over a finite interval. The instantaneous rate is the limit of that as the interval shrinks to 0, the tangent slope.',
            },
            {
              question: 'Why does $|x|$ have no derivative at 0 even though it is continuous?',
              answerOutline: 'The difference quotient tends to $-1$ from the left and $+1$ from the right, so the limit does not exist.',
            },
            {
              question: 'Why is a central difference usually better than a forward difference, and what can spoil it?',
              answerOutline: 'Its error is order $h^2$ rather than $h$. Measurement noise or rounding is amplified when $h$ is small.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/limits-and-derivatives'],
        },
        {
          slug: 'differentiation-rules',
          title: 'Differentiation rules',
          summary:
            'The power, constant multiple and sum rules, and the derivatives of exponentials, logarithms and trigonometric functions, applied to a first loss function.',
          estimatedMinutes: 120,
          objectives: [
            'Differentiate any polynomial and any power of $x$ at sight',
            'State the derivatives of $e^x$, $\\ln x$, $\\sin x$ and $\\cos x$',
            'Write the tangent line to a curve at a point',
            'Compute second derivatives and interpret them',
            'Differentiate a sum of squared errors and find where it is zero',
          ],
          concepts: [
            'Power rule',
            'Constant multiple and sum rules',
            'Derivative of $e^x$',
            'Derivative of $\\ln x$',
            'Derivatives of sine and cosine',
            'Tangent line equation',
            'Second derivative',
          ],
          explanation: `You will not use the limit definition every time. A few rules, each proved once from the definition, cover almost everything.

**Power rule.** $\\frac{d}{dx} x^n = n x^{n-1}$, for any real $n$. So $\\frac{d}{dx} x^5 = 5x^4$, and because $\\sqrt{x} = x^{1/2}$, its derivative is $\\frac12 x^{-1/2}$. Likewise $\\frac{d}{dx} x^{-1} = -x^{-2}$. Constants vanish, since a flat line has slope 0.

**Linearity.** Derivatives pass through sums and constant multiples:

$$\\frac{d}{dx}\\big(a f(x) + b g(x)\\big) = a f'(x) + b g'(x).$$

**Standard functions.** Memorise these:

$$\\frac{d}{dx} e^x = e^x, \\quad \\frac{d}{dx} \\ln x = \\frac{1}{x}, \\quad \\frac{d}{dx} \\sin x = \\cos x, \\quad \\frac{d}{dx} \\cos x = -\\sin x.$$

$e^x$ equals its own slope at every point, and that is exactly what makes $e$ special. The growth rate of $e^x$ is the amount present. The sine and cosine rules need radians.

**Tangent lines.** At $x = a$, the tangent is $y = f(a) + f'(a)(x - a)$. Near $a$ this line is a good stand-in for the curve, and that idea drives Newton's method and gradient descent. For example, $\\ln x$ at 1 has tangent $y = x - 1$, so $\\ln 1.1 \\approx 0.1$.

**Second derivatives.** $f''$ is the derivative of $f'$. It measures how fast the slope changes, which is curvature.

**Your first loss function.** Suppose you summarise data $y_1, \\dots, y_n$ with one number $m$, and measure the misfit by the sum of squared errors:

$$L(m) = \\sum_{i=1}^n (y_i - m)^2.$$

Expanding each square and using linearity gives

$$L'(m) = \\sum_{i=1}^n -2(y_i - m) = -2\\Big(\\sum_i y_i - nm\\Big).$$

Setting this to zero gives $m = \\frac{1}{n}\\sum_i y_i$, the **mean**. So the sample mean is not an arbitrary formula. It is the minimiser of squared error. Module 3 extends this to other losses.

Do the drill sets in OpenStax 3.3 until the rules take no thought, because every later topic assumes it.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 3.3 Differentiation Rules', url: 'https://openstax.org/books/calculus-volume-1/pages/3-3-differentiation-rules', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Power, sum and constant rules with many drill problems. Sections 3.5 and 3.9 cover trigonometric and exponential functions.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'Chapters 3 and 5 give visual derivations of the power rule and of what makes e special.' },
          ],
          exercises: [
            {
              slug: 'rules-drill',
              title: 'Rules drill',
              prompt:
                'Differentiate: (a) $4x^3 - 2x + 7$, (b) $3\\sqrt{x} + 2/x$, (c) $5e^x - \\ln x$, (d) $2\\sin x + 3\\cos x$, (e) $x^{-2} + x^{1/3}$, (f) $\\pi^2$. Find the second derivative of (a) and of (c). Check two answers with a central difference at $x = 1$, using $h = 0.001$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'mean-as-minimiser',
              title: 'The mean as a minimiser',
              prompt:
                'For the data 2, 4, 9, write $L(m) = (2 - m)^2 + (4 - m)^2 + (9 - m)^2$. Differentiate, set $L\'(m) = 0$ and solve. Compute $L$ at your answer and at $m = 4$ and $m = 6$. Use $L\'\'$ to explain why this is a minimum and not a maximum. Expected: $L\'(m) = 6m - 30$, so $m = 5$ with $L = 26$, while $L(4) = L(6) = 29$.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'tangent-estimates',
              title: 'Estimate with tangent lines',
              prompt:
                'Write the tangent lines to $\\ln x$ at $x = 1$, to $e^x$ at $x = 0$ and to $\\sqrt{x}$ at $x = 4$. Use them to estimate $\\ln 1.1$, $e^{0.1}$ and $\\sqrt{4.1}$. Compare with exact values and state each error. Expected: 0.1, 1.1 and 2.025, with exact values 0.09531, 1.10517 and 2.02485.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What property makes $e^x$ special?',
              answerOutline: 'It equals its own derivative, so its rate of growth at any point equals its value.',
            },
            {
              question: 'Write the tangent line to $f$ at $a$ and say what it is used for.',
              answerOutline: '$y = f(a) + f\'(a)(x - a)$. It approximates $f$ near $a$, and it is the basis of Newton\'s method and of gradient methods.',
            },
            {
              question: 'Why is the sample mean the best single number under squared error?',
              answerOutline: 'Setting the derivative of $\\sum (y_i - m)^2$ to zero gives $m = \\bar{y}$, and the second derivative $2n$ is positive, so it is a minimum.',
            },
          ],
        },
        {
          slug: 'product-and-quotient-rules',
          title: 'The product and quotient rules',
          summary:
            'How to differentiate products and ratios, why the naive rule is wrong, and how a product rule finds the revenue-maximising price.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the product rule from the limit definition',
            'Apply the product and quotient rules correctly',
            'Find the derivative of $\\tan x$',
            'Differentiate a revenue function and find the best price',
            'Decide when to simplify first instead of using the quotient rule',
          ],
          concepts: [
            'Product rule',
            'Quotient rule',
            'Derivative of a saturating ratio',
            'Revenue as price times demand',
            'Elasticity',
            'Simplify before differentiating',
          ],
          explanation: `The derivative of a product is **not** the product of the derivatives. If $f = x$ and $g = x$, then $fg = x^2$ has derivative $2x$, while $f'g' = 1$. The right rule is

$$(fg)' = f'g + fg'.$$

**Why it works.** Picture a rectangle with sides $f$ and $g$. If both sides grow a little, the area gains two strips, of size $g\\,\\Delta f$ and $f\\,\\Delta g$, plus a tiny corner $\\Delta f\\,\\Delta g$ that vanishes in the limit. Formally, add and subtract $f(x + h) g(x)$ in the limit definition.

**Quotient rule.** Apply the product rule to $f = (f/g) \\cdot g$ and solve:

$$\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}.$$

The order matters in the numerator. "Low d-high minus high d-low, over low squared" is one way to remember it. As an example, $\\tan x = \\sin x / \\cos x$ gives

$$\\tan' x = \\frac{\\cos x \\cos x + \\sin x \\sin x}{\\cos^2 x} = \\frac{1}{\\cos^2 x}.$$

A saturating response $r(x) = x / (1 + x)$, such as the fraction of users reached by $x$ ad impressions, has $r'(x) = \\frac{(1 + x) - x}{(1 + x)^2} = \\frac{1}{(1 + x)^2}$. Each extra impression helps less than the one before, a pattern known as diminishing returns.

**Simplify first.** To differentiate $(x^2 + 1)/x$, write it as $x + 1/x$. Then the power rule gives $1 - 1/x^2$ in one line. The quotient rule is correct too, but slower and easier to get wrong.

**A data application: pricing.** Suppose demand falls exponentially with price, $q(p) = 1000 e^{-0.02p}$. Revenue is $R(p) = p\\, q(p)$, a product. You will need the chain rule to differentiate $e^{-0.02p}$ properly, which is the next lesson, but take the result $q'(p) = -0.02\\, q(p)$ for now:

$$R'(p) = q(p) + p\\, q'(p) = q(p)(1 - 0.02p).$$

Since $q > 0$, $R' = 0$ exactly at $p = 50$. The product rule shows the trade-off in one line: raising the price earns more per sale ($q$) and loses sales ($p\\,q'$). The balance point is where **elasticity**, the percentage fall in demand for a 1% rise in price, equals 1.

Work the section in OpenStax, writing out each $f$, $g$, $f'$ and $g'$ before combining them.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 3.3 Differentiation Rules', url: 'https://openstax.org/books/calculus-volume-1/pages/3-3-differentiation-rules', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'The second half covers the product and quotient rules with drill problems.', primary: true },
            { title: "Paul's Online Notes: Calculus I", url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'The section on the product and quotient rule has fully worked examples and practice problems.' },
          ],
          exercises: [
            {
              slug: 'product-quotient-drill',
              title: 'Product and quotient drill',
              prompt:
                'Differentiate: (a) $x^2 e^x$, (b) $x \\ln x$, (c) $e^x \\sin x$, (d) $\\frac{x}{x^2 + 1}$, (e) $\\frac{\\ln x}{x}$, (f) $\\frac{x^2 + 3x}{x}$ (simplify first). Expected for (b) and (e): $\\ln x + 1$ and $(1 - \\ln x)/x^2$. Find where (e) has zero slope. Expected: $x = e$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'best-price',
              title: 'The revenue-maximising price',
              prompt:
                'Demand is $q(p) = 500 - 4p$ for a product priced at $p$. (a) Write revenue $R(p) = p\\,q(p)$ and differentiate with the product rule. (b) Find the best price and the revenue there. (c) Compute elasticity $-p\\,q\'(p)/q(p)$ at that price. (d) Name one thing this model leaves out. Expected: $p = 62.5$, $R = 15625$ and elasticity 1.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'diminishing-returns',
              title: 'Diminishing returns',
              prompt:
                'A reach curve is $r(x) = \\frac{a x}{b + x}$ with $a = 0.8$ and $b = 5$, where $x$ is spend. Find $r\'(x)$ with the quotient rule. Evaluate $r$ and $r\'$ at $x = 1, 5, 20$. Find the limit of $r$ as $x \\to \\infty$ and interpret $a$ and $b$. Expected: $r\'(x) = ab/(b + x)^2$, $r\'(5) = 0.04$, and a limit of 0.8.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $(fg)\' \\ne f\'g\'$? Give a one-line counterexample.',
              answerOutline: '$f = g = x$ gives $(x^2)\' = 2x$, but $f\'g\' = 1$.',
            },
            {
              question: 'State the quotient rule. What does swapping the terms in the numerator do?',
              answerOutline: '$(f\'g - fg\')/g^2$. Swapping flips the sign and gives the wrong answer.',
            },
            {
              question: 'What does the product rule show about the trade-off in pricing?',
              answerOutline: 'Revenue changes by the sales you keep at the higher price plus the sales you lose. The best price balances the two.',
            },
          ],
        },
        {
          slug: 'the-chain-rule',
          title: 'The chain rule',
          summary:
            'Differentiating compositions: rates multiply along a chain. This is the most used rule in machine learning, and here it produces the gradient of the logistic loss.',
          estimatedMinutes: 140,
          objectives: [
            'State the chain rule in both prime and Leibniz notation',
            'Differentiate a composition by naming the inner and outer functions',
            'Differentiate seasonal, Gaussian and logistic functions',
            'Show that the logistic function satisfies $\\sigma\' = \\sigma(1 - \\sigma)$',
            'Compute the derivative of a one-parameter logistic loss',
          ],
          concepts: [
            'Composition and inner/outer functions',
            'Chain rule $(f \\circ g)\' = f\'(g)\\,g\'$',
            'Leibniz form $dy/dx = (dy/du)(du/dx)$',
            'Generalised power, exponential and log rules',
            'Logistic function',
            'Log loss',
          ],
          explanation: `If $y$ depends on $u$ and $u$ depends on $x$, rates multiply. A wheel turning 3 times as fast as a gear, which turns 2 times as fast as a crank, turns 6 times as fast as the crank. That is the **chain rule**:

$$\\frac{d}{dx} f(g(x)) = f'(g(x))\\, g'(x), \\quad \\text{or} \\quad \\frac{dy}{dx} = \\frac{dy}{du} \\frac{du}{dx}.$$

Say it as a procedure: differentiate the outer function, leaving the inside alone, then multiply by the derivative of the inside.

**Examples.** With $u$ as the inside,

$$\\frac{d}{dx} (x^2 + 1)^5 = 5(x^2 + 1)^4 \\cdot 2x, \\quad \\frac{d}{dx} e^{-x^2/2} = -x e^{-x^2/2},$$

$$\\frac{d}{dx} \\ln(1 + x^2) = \\frac{2x}{1 + x^2}, \\quad \\frac{d}{dt} \\sin(2\\pi t) = 2\\pi \\cos(2\\pi t).$$

The last one matters for seasonal data. A wave of amplitude 3 ppm repeating once a year has a slope of up to $3 \\cdot 2\\pi \\approx 19$ ppm per year, which can dwarf a trend of 2 ppm per year. And the pricing rule from the last lesson follows at once: $\\frac{d}{dp} e^{-0.02p} = -0.02 e^{-0.02p}$.

**The logistic function.** $\\sigma(x) = (1 + e^{-x})^{-1}$ turns any number into a probability. With the outer function $u^{-1}$ and inner $1 + e^{-x}$,

$$\\sigma'(x) = -(1 + e^{-x})^{-2} \\cdot (-e^{-x}) = \\frac{e^{-x}}{(1 + e^{-x})^2} = \\sigma(x)\\big(1 - \\sigma(x)\\big).$$

**The logistic loss.** For one example with label $y \\in \\{0, 1\\}$, input $x$ and weight $w$, the model predicts $p = \\sigma(wx)$, and the log loss is

$$\\ell(w) = -y \\ln p - (1 - y) \\ln(1 - p).$$

This is a chain $w \\to wx \\to p \\to \\ell$. Multiplying the three rates, with $dp/dw = p(1 - p)x$, gives the tidy result

$$\\ell'(w) = (p - y)\\,x.$$

Fitting a logistic regression is nothing more than this formula used many times. Backpropagation in Module 6 is the same rule applied through a longer chain.

**Common errors.** Forgetting the inner derivative is by far the most frequent. Note also that the chain rule combines with the product rule: differentiate $x e^{-x^2}$ with the product rule first.

Do many short problems here. Name the inner function aloud each time until it becomes automatic.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 3.6 The Chain Rule', url: 'https://openstax.org/books/calculus-volume-1/pages/3-6-the-chain-rule', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Worked compositions and a long drill set.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'Chapter 4 gives a visual account of the product and chain rules.' },
            { title: 'MIT 18.01SC Single Variable Calculus', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 1 works through the chain rule with problem sets and solutions.' },
          ],
          exercises: [
            {
              slug: 'chain-drill',
              title: 'Chain rule drill',
              prompt:
                'Differentiate: (a) $(3x + 1)^4$, (b) $e^{5x}$, (c) $\\sqrt{1 + x^2}$, (d) $\\ln(\\sin x)$, (e) $\\cos(2\\pi t / 12)$, (f) $x e^{-x^2/2}$, (g) $e^{\\sin x}$. Name the inner function for each. Expected for (f): $(1 - x^2)e^{-x^2/2}$. Check (c) and (f) at $x = 1$ with a central difference.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'seasonal-rate',
              title: 'The rate of a seasonal curve',
              prompt:
                'A quantity follows $C(t) = 400 + 2t + 3\\sin(2\\pi t)$, with $t$ in years. (a) Find $C\'(t)$. (b) Find the largest and smallest values of $C\'$. (c) Find the fraction of each year during which $C$ is falling. (d) Explain why measuring the trend needs a window of a whole year. Expected: $C\'$ runs from about $-16.85$ to $20.85$ ppm per year, and $C$ falls for about 47% of each year.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For (c), solve $\\cos(2\\pi t) < -2/(6\\pi)$ using the inverse cosine.',
            },
            {
              slug: 'logistic-loss-gradient',
              title: 'Derive the logistic loss gradient',
              prompt:
                'Derive $\\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))$. Then derive $\\ell\'(w) = (\\sigma(wx) - y)x$ for the log loss, carefully showing the three factors of the chain. Evaluate it at $w = 0.5$, $x = 2$, $y = 1$. Check your value with a central difference. Expected: $\\sigma(1) \\approx 0.7311$, and $\\ell\'(0.5) \\approx -0.5379$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the chain rule and explain it as a statement about rates.',
              answerOutline: '$dy/dx = (dy/du)(du/dx)$: the rate of the output with respect to the input is the product of the rates along the chain.',
            },
            {
              question: 'What is the most common error with the chain rule?',
              answerOutline: 'Forgetting to multiply by the derivative of the inner function.',
            },
            {
              question: 'Why can a small seasonal wave dominate the slope of a curve?',
              answerOutline: 'The chain rule multiplies amplitude by $2\\pi$ per year, so an amplitude of 3 gives a slope up to about 19, larger than a slow trend.',
            },
            {
              question: 'What is the derivative of the logistic loss for one example?',
              answerOutline: '$(p - y)x$ with $p = \\sigma(wx)$: the prediction error times the input.',
            },
          ],
          relatedLessons: [
            'math-methods/single-variable-calculus/limits-and-derivatives',
            'machine-learning/linear-models/logistic-regression',
          ],
        },
        {
          slug: 'implicit-differentiation',
          title: 'Implicit differentiation and related rates',
          summary:
            'Differentiating equations where y is not isolated, proving the log and inverse function rules, logarithmic differentiation, and how fast a standard error shrinks.',
          estimatedMinutes: 110,
          objectives: [
            'Find $dy/dx$ from an equation relating $x$ and $y$',
            'Derive the derivative of $\\ln x$ and of inverse functions',
            'Use logarithmic differentiation on products and variable powers',
            'Differentiate $\\arctan x$',
            'Solve a related rates problem, such as how fast a standard error falls',
          ],
          concepts: [
            'Implicit differentiation',
            'Derivative of an inverse function',
            'Logarithmic differentiation',
            'Inverse trigonometric derivatives',
            'Related rates',
            'Standard error as a function of sample size',
          ],
          explanation: `Sometimes $y$ is tied to $x$ by an equation rather than given by a formula. The circle $x^2 + y^2 = 25$ is an example. **Implicit differentiation** treats $y$ as an unknown function of $x$, and differentiates both sides using the chain rule:

$$2x + 2y \\frac{dy}{dx} = 0, \\quad \\text{so} \\quad \\frac{dy}{dx} = -\\frac{x}{y}.$$

At $(3, 4)$ the slope is $-3/4$. The key move is that $\\frac{d}{dx} y^2 = 2y\\, y'$, and not $2y$.

**Inverse functions.** This gives the rules you were asked to accept. If $y = \\ln x$, then $e^y = x$. Differentiating both sides gives $e^y y' = 1$, so $y' = 1/e^y = 1/x$. In general, the slope of an inverse is the reciprocal of the original slope, because reflecting a graph across $y = x$ swaps rise and run. The same trick on $\\tan y = x$ gives $\\frac{d}{dx} \\arctan x = \\frac{1}{1 + x^2}$.

**Logarithmic differentiation.** For $y = x^x$, neither the power rule nor the exponential rule applies, because both base and exponent vary. Take logs first: $\\ln y = x \\ln x$. Then

$$\\frac{y'}{y} = \\ln x + 1, \\quad \\text{so} \\quad y' = x^x(\\ln x + 1).$$

The quantity $y'/y = (\\ln y)'$ is the **relative growth rate**, which is the same for any scale of $y$. Likelihoods are handled this way, because a log turns a product into a sum.

**Related rates.** When two quantities are linked and both change in time, differentiate the link with respect to time. The standard error of a sample mean is

$$SE = \\sigma\\, n^{-1/2}.$$

If a study collects data at a rate $dn/dt$, the chain rule gives

$$\\frac{d(SE)}{dt} = -\\frac{\\sigma}{2} n^{-3/2} \\frac{dn}{dt}.$$

With $\\sigma = 10$, $n = 400$ and 20 new samples a day, $SE = 0.5$, and it falls by $0.025$ per day. At $n = 1600$ it falls 8 times more slowly, at the same collection rate. That is why the last bit of precision in a survey or experiment is the most expensive. The $\\sqrt{n}$ law is a calculus fact about diminishing returns, and worth remembering.

Do the OpenStax drill problems, and write $y'$ explicitly every time you differentiate a term containing $y$.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 3.8 Implicit Differentiation', url: 'https://openstax.org/books/calculus-volume-1/pages/3-8-implicit-differentiation', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Implicit differentiation. Section 3.7 covers inverse functions, and 4.1 covers related rates.', primary: true },
            { title: "Paul's Online Notes: Calculus I", url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'Implicit differentiation, logarithmic differentiation and related rates, all with worked examples.' },
          ],
          exercises: [
            {
              slug: 'implicit-drill',
              title: 'Implicit differentiation',
              prompt:
                'Find $dy/dx$ for (a) $x^2 + xy + y^2 = 7$ at $(1, 2)$, (b) $y e^y = x$ in terms of $y$, (c) $\\sin y = x$. For (a), write the tangent line at $(1, 2)$. Expected: (a) $-4/5$, (b) $1/(e^y(1 + y))$, (c) $1/\\cos y$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'variable-exponent',
              title: 'Logarithmic differentiation',
              prompt:
                'Use logarithmic differentiation to find the derivative of (a) $x^x$ at $x = 2$, (b) $(1 + x)^{1/x}$ at $x = 1$, (c) $L(p) = p^{7}(1 - p)^{3}$. For (c), find the $p$ where $L\'(p) = 0$, and explain in a sentence what this says about a coin that landed heads 7 times in 10 flips. Expected: (a) about 6.77, (b) about $-0.3863$, (c) $p = 0.7$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'standard-error-rate',
              title: 'How fast does precision improve?',
              prompt:
                'A survey has $\\sigma = 10$ and collects 20 responses a day. (a) Starting with $n = 400$, find $SE$ and its rate of change. (b) Repeat at $n = 1600$. (c) How many days does it take to halve $SE$ from $n = 400$? How many more to halve it again? (d) Explain what this means for planning a study. Expected: rates of $-0.025$ and about $-0.00313$ per day, then 60 and 240 days.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does differentiating $y^2$ with respect to $x$ give $2y\\,y\'$?',
              answerOutline: '$y$ is a function of $x$, so the chain rule applies: the outer derivative is $2y$ and the inner derivative is $y\'$.',
            },
            {
              question: 'How is the derivative of $\\ln x$ obtained from that of $e^x$?',
              answerOutline: 'Differentiate $e^y = x$ implicitly to get $e^y y\' = 1$, so $y\' = 1/x$.',
            },
            {
              question: 'What does $y\'/y$ measure, and how do you compute it easily?',
              answerOutline: 'The relative growth rate. It equals the derivative of $\\ln y$.',
            },
            {
              question: 'Why does extra data help less as a sample grows?',
              answerOutline: 'The standard error goes as $n^{-1/2}$, so its rate of decrease goes as $n^{-3/2}$. Halving $SE$ needs four times the data.',
            },
          ],
        },
      ],
    },
    {
      slug: 'applications-of-derivatives',
      title: 'Applications of Derivatives',
      description:
        'What derivatives are for: reading the shape of a curve, finding the best value of something, solving equations with Newton\'s method, and fitting one parameter by minimising a loss.',
      lessons: [
        {
          slug: 'curve-sketching',
          title: 'Curve sketching and the shape of a function',
          summary:
            'Using the first and second derivatives to find rises, falls, peaks and bends, plus the mean value theorem and L\'Hopital\'s rule.',
          estimatedMinutes: 130,
          objectives: [
            'Find and classify critical points with the first and second derivative tests',
            'Find intervals of concavity and inflection points',
            'State the mean value theorem and explain what it guarantees',
            'Use L\'Hopital\'s rule on $0/0$ and $\\infty/\\infty$ limits',
            'Interpret the inflection point of a logistic growth curve',
          ],
          concepts: [
            'Critical point',
            'First derivative test',
            'Second derivative test',
            'Concavity and inflection point',
            'Mean value theorem',
            'L\'Hopital\'s rule',
            'Logistic growth',
          ],
          explanation: `A derivative tells you the shape of a function without plotting it, and you need this to judge a model or a loss curve.

**First derivative.** Where $f' > 0$, $f$ rises, and where $f' < 0$ it falls. A **critical point** is where $f' = 0$ or $f'$ does not exist. If $f'$ changes from $+$ to $-$ there, you have a local maximum, and from $-$ to $+$ a local minimum. If it does not change sign, you have neither: $x^3$ is flat at 0 but keeps rising.

**Second derivative.** Where $f'' > 0$, the slope is increasing and the curve is **concave up**, shaped like a cup. Where $f'' < 0$ it is concave down. At a critical point, $f'' > 0$ means a minimum and $f'' < 0$ a maximum. If $f'' = 0$ the test says nothing. An **inflection point** is where concavity changes.

**Worked example.** Take $f(x) = x e^{-x}$. Then $f'(x) = (1 - x) e^{-x}$, which is zero at $x = 1$ and changes from $+$ to $-$, so the maximum is $f(1) = 1/e$. Next, $f''(x) = (x - 2) e^{-x}$, so there is an inflection at $x = 2$. As $x \\to \\infty$, $f \\to 0$. That is the whole shape.

**Logistic growth.** Adoption curves often follow $N(t) = L / (1 + e^{-k(t - t_0)})$. The second derivative is zero at $t = t_0$, where $N = L/2$ and growth peaks at $kL/4$. So the inflection point marks the moment growth starts to slow, and it is roughly the earliest moment you could identify the ceiling $L$ from data. Before it, an exponential and a logistic curve look almost the same, so predictions made there are fragile.

**Mean value theorem.** If $f$ is continuous on $[a, b]$ and differentiable inside, some $c$ has $f'(c) = \\frac{f(b) - f(a)}{b - a}$: at some moment the instantaneous rate equals the average. It is why a function with zero derivative everywhere must be constant, and integration depends on that fact.

**L'Hopital's rule.** For a $0/0$ or $\\infty/\\infty$ limit, $\\lim f/g = \\lim f'/g'$, if the latter exists. For example, $x \\ln x$ at $0^+$ is $\\frac{\\ln x}{1/x}$, and the rule gives $\\frac{1/x}{-1/x^2} = -x \\to 0$. This is why entropy formulas can safely treat $0 \\ln 0$ as 0.

Sketch each function by hand from its derivatives, then confirm it in Desmos.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 4.5 Derivatives and the Shape of a Graph', url: 'https://openstax.org/books/calculus-volume-1/pages/4-5-derivatives-and-the-shape-of-a-graph', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'First and second derivative tests. See 4.4 for the mean value theorem and 4.8 for L\'Hopital\'s rule.', primary: true },
            { title: 'MIT 18.01SC Single Variable Calculus', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 2 covers curve sketching and the mean value theorem.' },
          ],
          exercises: [
            {
              slug: 'sketch-two-curves',
              title: 'Sketch two curves',
              prompt:
                'For (a) $f(x) = x^3 - 3x$ and (b) $g(x) = e^{-x^2/2}$, find critical points, classify them, find inflection points and describe the behaviour as $x \\to \\pm\\infty$. Sketch both by hand. Expected: (a) maximum at $(-1, 2)$, minimum at $(1, -2)$, inflection at 0. (b) maximum at $(0, 1)$, inflections at $x = \\pm 1$. This is why one standard deviation marks the bend in a bell curve.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'logistic-inflection',
              title: 'Where growth peaks',
              prompt:
                'For $N(t) = 1000 / (1 + e^{-0.5(t - 20)})$, (a) use the logistic derivative to show $N\'(t) = 0.5\\,N(1 - N/1000)$, (b) find the time and value of the largest growth rate, (c) find $N(10)$, then compare $N(t)$ with the pure exponential $6.69\\,e^{0.5(t - 10)}$ at $t = 15$ and $t = 30$. Explain why forecasting the ceiling is hard before the inflection. Expected: peak rate 125 at $t = 20$ and $N(10) \\approx 6.69$. At $t = 15$ the two curves give about 76 and 82, and at $t = 30$ about 993 and 147,000.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'entropy-shape',
              title: 'The shape of entropy',
              prompt:
                'Let $H(p) = -p \\ln p - (1 - p) \\ln(1 - p)$ for $0 < p < 1$. (a) Find $H\'(p)$ and $H\'\'(p)$. (b) Show the maximum is at $p = 1/2$ and compute it. (c) Use L\'Hopital to find $\\lim_{p \\to 0^+} H(p)$. (d) Explain what this measures about a coin. Expected: $H(1/2) = \\ln 2 \\approx 0.693$, and the limit is 0.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does $f\'(a) = 0$ guarantee a maximum or minimum? Give an example.',
              answerOutline: 'No. $x^3$ has $f\'(0) = 0$, but no extreme value, because $f\'$ does not change sign there.',
            },
            {
              question: 'What does the inflection point of a logistic curve tell you?',
              answerOutline: 'Growth peaks there and starts to slow. It occurs at half the ceiling, so the ceiling is hard to estimate before it.',
            },
            {
              question: 'What does the mean value theorem say in plain words?',
              answerOutline: 'Somewhere the instantaneous rate equals the average rate over the interval.',
            },
            {
              question: 'When can you use L\'Hopital\'s rule?',
              answerOutline: 'Only for $0/0$ or $\\infty/\\infty$ forms, and it differentiates the top and bottom separately, not as a quotient.',
            },
          ],
        },
        {
          slug: 'optimisation',
          title: 'Optimisation',
          summary:
            'Finding the best value: closed intervals, turning words into a function to minimise, and data problems such as allocating a survey sample and maximum likelihood.',
          estimatedMinutes: 140,
          objectives: [
            'Find the global maximum and minimum of a function on a closed interval',
            'Turn a word problem into a one-variable function by eliminating a constraint',
            'Justify that a critical point is a global optimum',
            'Maximise a likelihood through its logarithm',
            'Solve a sample allocation problem and interpret the answer',
          ],
          concepts: [
            'Closed interval method',
            'Objective and constraint',
            'Global versus local optimum',
            'Convexity as a guarantee',
            'Maximum likelihood',
            'Neyman allocation',
            'Balancing two costs',
          ],
          explanation: `Most of data science is optimisation: pick the parameter that makes something as small or as large as possible.

**On a closed interval.** A continuous function on $[a, b]$ always has a global maximum and minimum. They occur at critical points or at the ends, so check all of them and compare values. Forgetting the endpoints is the classic error.

**Word problems.** Write the objective, write the constraint, use the constraint to eliminate a variable, then differentiate. If $f'' > 0$ everywhere, the function is **convex**, and any critical point is the global minimum. Convexity is the property that makes linear and logistic regression reliable.

**Example: allocating a sample.** You will survey two groups with spreads $\\sigma_1$ and $\\sigma_2$, using $N$ people in total, to estimate a difference in means. The variance of the estimate is

$$V(n) = \\frac{\\sigma_1^2}{n} + \\frac{\\sigma_2^2}{N - n}.$$

Then $V'(n) = -\\sigma_1^2/n^2 + \\sigma_2^2/(N - n)^2$. Setting it to zero gives $\\frac{n}{N - n} = \\frac{\\sigma_1}{\\sigma_2}$, so

$$n = N \\frac{\\sigma_1}{\\sigma_1 + \\sigma_2}.$$

Sample each group in proportion to its spread, not its size. This is **Neyman allocation**. For $\\sigma_1 = 2$, $\\sigma_2 = 6$ and $N = 1000$, take $n = 250$. Its variance is $0.064$, against $0.08$ for an equal split.

**Example: maximum likelihood.** If $k$ of $n$ trials succeed, the likelihood is $L(p) = p^k (1 - p)^{n - k}$. Maximising $\\ln L$ gives the same answer and is far easier:

$$\\ln L = k \\ln p + (n - k) \\ln(1 - p), \\quad \\frac{k}{p} - \\frac{n - k}{1 - p} = 0, \\quad \\hat{p} = \\frac{k}{n}.$$

The obvious estimate is the one that makes the data most probable. Every fitted model you will use rests on this idea.

**Example: balancing two costs.** Retraining a model costs $C$ each time, and the staleness cost per day grows with the age of the model, averaging $hT/2$ over a cycle of $T$ days. The cost per day is $c(T) = C/T + hT/2$, and $c'(T) = 0$ gives $T = \\sqrt{2C/h}$. At the optimum, the two costs are equal. That pattern appears throughout operations and systems work.

Work through OpenStax 4.7, drawing a picture and naming the objective and constraint before any calculus.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 4.7 Applied Optimization Problems', url: 'https://openstax.org/books/calculus-volume-1/pages/4-7-applied-optimization-problems', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'A careful method for word problems, with worked examples and many exercises.', primary: true },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 7 connects these ideas to how machine learning uses optimisation. Read it later, after Module 6.' },
          ],
          exercises: [
            {
              slug: 'neyman-allocation',
              title: 'Allocate a sample',
              prompt:
                'For $\\sigma_1 = 2$, $\\sigma_2 = 6$ and $N = 1000$: (a) derive the best $n$ and confirm it is a minimum using $V\'\'$. (b) Compute the variance for $n = 250$ and $n = 500$. (c) By what percentage does the better design reduce variance, and so the sample needed? (d) Name one reason you might still choose an equal split. Expected: 0.064 against 0.08, a 20% reduction.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'exponential-mle',
              title: 'Maximum likelihood for waiting times',
              prompt:
                'Waiting times follow an exponential model whose density is $\\lambda e^{-\\lambda x}$. For independent observations $x_1, \\dots, x_n$, write the likelihood, take its log, differentiate with respect to $\\lambda$ and solve. Evaluate for the data 2, 3, 5. Use the second derivative to confirm a maximum. Expected: $\\hat\\lambda = n / \\sum x_i = 0.3$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'retraining-schedule',
              title: 'How often to retrain',
              prompt:
                'Retraining a model costs 800, and staleness costs $4T/2$ per day on average over a $T$-day cycle. (a) Find the best $T$ and the daily cost there. (b) Compare with $T = 10$ and $T = 40$. (c) Show the two cost terms are equal at the optimum. (d) How much does the best $T$ change if $C$ doubles? Expected: $T = 20$ with cost 80, against 100 at both alternatives, and $T$ grows by a factor of $\\sqrt{2}$.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What must you check to find a global optimum on $[a, b]$?',
              answerOutline: 'All critical points in the interval and both endpoints, then compare values.',
            },
            {
              question: 'Why maximise $\\ln L$ rather than $L$?',
              answerOutline: 'The log is increasing, so the maximiser is the same, and it turns products into sums that are easy to differentiate.',
            },
            {
              question: 'Why is convexity valuable?',
              answerOutline: 'Every critical point of a convex function is a global minimum, so a local method cannot get stuck.',
            },
          ],
          relatedLessons: [
            'probability-statistics/estimation-and-confidence/maximum-likelihood-estimation',
            'math-methods/multivariable-calculus/lagrange-multipliers-and-optimization',
          ],
        },
        {
          slug: 'newtons-method',
          title: 'Linear approximation and Newton\'s method',
          summary:
            'Replacing a curve with its tangent line, then using that repeatedly to solve equations that have no formula, including the fit of a logistic regression.',
          estimatedMinutes: 120,
          objectives: [
            'Use a tangent line to approximate a function and estimate the error',
            'Derive the Newton step from the tangent line',
            'Run Newton\'s method by hand and observe the digits doubling',
            'Find an optimum with Newton\'s method on the derivative',
            'Recognise and explain the ways Newton\'s method fails',
          ],
          concepts: [
            'Linear approximation',
            'Newton step $x - f(x)/f\'(x)$',
            'Quadratic convergence',
            'Newton for optimisation',
            'Failure modes',
            'Safeguarding with a bracket',
          ],
          explanation: `Near a point $a$, a smooth curve is almost a straight line:

$$f(x) \\approx f(a) + f'(a)(x - a).$$

This **linear approximation** gives $\\sqrt{10} \\approx 3 + \\frac{1}{6} \\approx 3.1667$, using the tangent at 9. The true value is 3.1623. The error grows like $(x - a)^2$ and depends on the curvature.

**Newton's method.** To solve $f(x) = 0$, start at a guess $x_n$, replace $f$ with its tangent line and solve that line exactly:

$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}.$$

For $f(x) = x^2 - 2$ starting at 1, you get 1.5, 1.41667, 1.4142157, 1.41421356. The error goes 0.086, 0.0025, 0.0000021, roughly squaring each step, so the number of correct digits doubles. This is **quadratic convergence**, and bisection's single bit per step looks slow next to it.

**Optimisation.** A minimum of a loss $L$ is a root of $L'$, so apply Newton to $L'$:

$$w_{n+1} = w_n - \\frac{L'(w_n)}{L''(w_n)}.$$

Geometrically, you fit a parabola at $w_n$ and jump to its bottom. This is how logistic regression is usually fitted. For one weight, the loss has $L'(w) = \\sum_i (p_i - y_i) x_i$ and $L''(w) = \\sum_i p_i (1 - p_i) x_i^2$, with $p_i = \\sigma(w x_i)$. With $x = (-2, -1, 1, 2, 3)$ and $y = (0, 1, 0, 1, 1)$, starting from 0, Newton gives 0.5263, 0.6150, 0.6205, 0.62049 and stops.

**When it fails.**
- *A flat spot:* if $f'(x_n)$ is near 0, the step is huge.
- *A bad start:* on that same logistic problem, starting at $w = 3$ jumps to $-14$ and then to millions. The tangent is nearly flat out there, so it points far away.
- *Wrong curvature:* if $L'' < 0$, Newton heads for a maximum.
- *A cycle or divergence:* for $f(x) = x^{1/3}$, the step gives $x_{n+1} = -2x_n$, which moves away forever.

**Safeguards.** Keep a bracket $[a, b]$ with a sign change, and if a Newton step leaves it, take a bisection step instead. Real solvers such as Brent's method do something similar. A method that is fast when it works and fails loudly when it does not needs a backstop.

Compute by hand once, then code the method with a limit on iterations and a check that the result solves the equation.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 4.9 Newton\'s Method', url: 'https://openstax.org/books/calculus-volume-1/pages/4-9-newtons-method', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'The method, examples of failure, and exercises. Section 4.2 covers linear approximation.', primary: true },
            { title: 'MIT 18.01SC Single Variable Calculus', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 2 includes a session on Newton\'s method with worked examples.' },
          ],
          exercises: [
            {
              slug: 'newton-by-hand',
              title: 'Newton by hand',
              prompt:
                'Use Newton\'s method to solve (a) $\\cos x = x$ from $x_0 = 1$, (b) $x^3 - 2x - 5 = 0$ from $x_0 = 2$, (c) $x e^x = 3$ from $x_0 = 1$. Give four iterations of each, to 6 decimal places, on a calculator or in Python. Expected: 0.739085, 2.094551 and 1.049909.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'newton-logistic',
              title: 'Fit a one-weight logistic model',
              prompt:
                'For $x = (-2, -1, 1, 2, 3)$ and $y = (0, 1, 0, 1, 1)$, use $L\'(w)$ and $L\'\'(w)$ from the lesson to run Newton from $w = 0$. Report $w$ at each step until it changes by less than $10^{-6}$. Rerun from $w = 3$ and record what happens. Then fix it: if a step leaves the bracket $[-5, 5]$, or increases the loss, halve the step until it does not. Expected: $w \\approx 0.620489$ in about 5 steps, and divergence from $w = 3$ without the safeguard.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Computing $L(w) = -\\sum_i [y_i \\ln p_i + (1 - y_i) \\ln(1 - p_i)]$ lets you check whether a step helped.',
            },
            {
              slug: 'newton-failure',
              title: 'Break Newton\'s method',
              prompt:
                'Show algebraically that for $f(x) = x^{1/3}$ the Newton step gives $x_{n+1} = -2x_n$. Run bisection on $[-1, 2]$ for the same $f$, and explain why it succeeds. Then find a starting point near which $f(x) = x^3 - 2x + 2$ falls into a cycle between 0 and 1, and show the cycle by computing two steps from $x_0 = 0$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the Newton step.',
              answerOutline: 'Set the tangent line $f(x_n) + f\'(x_n)(x - x_n)$ to zero and solve for $x$.',
            },
            {
              question: 'What does quadratic convergence mean in practice?',
              answerOutline: 'The error is roughly squared each step, so the number of correct digits doubles.',
            },
            {
              question: 'Name two ways Newton\'s method can fail and a safeguard against them.',
              answerOutline: 'A near-zero derivative, a poor start, or negative curvature. Keep a bracket and fall back on bisection, or reduce the step if the loss rises.',
            },
          ],
          relatedLessons: ['computational-physics/numerical-calculus-and-linear-algebra/root-finding-and-optimisation'],
        },
        {
          slug: 'loss-functions-on-one-parameter',
          title: 'Loss functions on one parameter',
          summary:
            'Why the mean, the median and a quantile are each the answer to a minimisation problem, and how the choice of loss decides how outliers are treated.',
          estimatedMinutes: 130,
          objectives: [
            'Show that squared loss gives the mean and absolute loss gives the median',
            'Explain how each loss treats an outlier using its derivative',
            'Compute the Huber estimate of a small data set',
            'Show that the pinball loss gives a quantile',
            'Choose a loss to match a real cost of being wrong',
          ],
          concepts: [
            'Loss function',
            'Empirical risk',
            'Squared loss and the mean',
            'Absolute loss and the median',
            'Huber loss',
            'Pinball (quantile) loss',
            'Influence of an outlier',
          ],
          explanation: `You want one number $\\theta$ to summarise data $x_1, \\dots, x_n$. Choosing a **loss function** $\\ell(x - \\theta)$ states what being wrong costs, and the best $\\theta$ minimises the total $L(\\theta) = \\sum_i \\ell(x_i - \\theta)$. The choice has real consequences.

**Squared loss.** $\\ell(r) = r^2$ gives $L'(\\theta) = -2 \\sum_i (x_i - \\theta)$, so $\\theta$ is the **mean**. The derivative shows why outliers matter: each point pulls with force proportional to its residual, so one wild point can move the answer by any amount.

**Absolute loss.** $\\ell(r) = |r|$ has a kink at 0, but elsewhere

$$L'(\\theta) = (\\text{number of points below } \\theta) - (\\text{number above } \\theta).$$

This is zero when half the points lie on each side, which is the **median**. Each point pulls with the same force, whatever its distance, so moving an outlier further changes nothing.

**Huber loss.** This compromise is quadratic for small residuals and linear for large ones:

$$\\ell(r) = \\begin{cases} \\tfrac12 r^2 & |r| \\le \\delta \\\\ \\delta(|r| - \\tfrac12 \\delta) & |r| > \\delta \\end{cases}$$

Its derivative caps each point's pull at $\\delta$. Setting $L' = 0$ means solving $\\sum_i \\text{clip}(x_i - \\theta, -\\delta, \\delta) = 0$.

**Worked example.** For the data 1, 2, 3, 4, 100, the mean is 22 and the median is 3. With $\\delta = 5$, the first four points are inside the band and the last is capped, so $(10 - 4\\theta) + 5 = 0$ and $\\theta = 3.75$.

**Pinball loss.** If under-predicting costs more than over-predicting, use $\\ell(r) = \\tau r$ for $r > 0$ and $(\\tau - 1) r$ for $r < 0$. The derivative balances to give the $\\tau$ **quantile**. For $\\tau = 0.9$, you get the 90th percentile, which suits stocking enough inventory or setting a latency target.

**Log loss.** For $k$ successes in $n$ trials, the best constant probability under log loss is $k/n$, as you found last lesson. So each familiar summary statistic is a minimiser of some loss.

**Beyond one parameter.** Every regression method fixes a loss and minimises it over more parameters. Least squares inherits the mean's sensitivity. Quantile regression and Huber regression inherit the behaviours above.

Do the exercises on paper first, then confirm them on the real data set in the last one.`,
          resources: [
            { title: 'Huber loss', url: 'https://en.wikipedia.org/wiki/Huber_loss', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The definition, with its behaviour and its smooth variants.', primary: true },
            { title: 'An Introduction to Statistical Learning', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani', note: 'Chapter 2 frames fitting as minimising a loss. A preview of how this idea is used at scale.' },
            { title: 'Old Faithful data (faithful)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/faithful.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: '272 eruptions with waiting times in minutes, for the last exercise.' },
          ],
          exercises: [
            {
              slug: 'median-from-the-derivative',
              title: 'The median from the derivative',
              prompt:
                'For the data 1, 2, 3, 4, 100: (a) plot or tabulate $L(\\theta) = \\sum_i |x_i - \\theta|$ at $\\theta = 0, 2, 3, 3.5, 10$. (b) State the slope of $L$ on each piece. (c) Show the minimum is at 3. (d) Change 100 to 1000 and report how the mean, the median and the Huber estimate with $\\delta = 5$ change. Expected: the mean moves from 22 to 202, while the median stays 3 and the Huber estimate stays 3.75.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pinball-quantile',
              title: 'The pinball loss gives a quantile',
              prompt:
                'For the data 1, 2, ..., 10 and $\\tau = 0.9$, write the slope of $L(\\theta)$ between consecutive data points, as a count of points below and above weighted by $1 - \\tau$ and $\\tau$. Find all minimisers. Then explain which $\\tau$ you would choose if running out of stock costs 9 times as much as holding one extra unit. Expected: any $\\theta$ in $[9, 10]$ is a minimiser, and $\\tau = 0.9$ fits that cost ratio.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'old-faithful-summaries',
              title: 'Choose a summary for Old Faithful',
              prompt:
                'Download the Old Faithful data and use the `waiting` column. Compute the mean, the median, the Huber estimate with $\\delta = 5$ and the 90th percentile. Compute the total squared loss at the mean and at the median, and the total absolute loss at both. Plot a histogram, then say what these numbers show and what they hide, given that the waits fall into two groups. Expected: 272 rows, mean 70.90, median 76, Huber 75, 90th percentile 86. Below and above 65, the group means are about 54 and 80.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'A spreadsheet is enough for most of this. For the Huber estimate, iterate $\\theta \\leftarrow \\theta + \\sum \\text{clip}(x_i - \\theta, -\\delta, \\delta) / \\#\\{|x_i - \\theta| \\le \\delta\\}$ starting from the median.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does squared loss give the mean and absolute loss give the median?',
              answerOutline: 'Setting the derivative to zero makes the residuals sum to zero for squared loss, and balances the count on each side for absolute loss.',
            },
            {
              question: 'Use derivatives to explain why the mean is sensitive to outliers.',
              answerOutline: 'Each point pulls with force proportional to its residual, so an outlier has unbounded influence. For the median the pull is constant.',
            },
            {
              question: 'What does Huber loss do to an outlier?',
              answerOutline: 'It caps the pull at $\\delta$. Small residuals behave as in least squares, and large ones behave as in absolute loss.',
            },
            {
              question: 'When would you minimise a pinball loss with $\\tau = 0.95$?',
              answerOutline: 'When under-predicting costs about 19 times as much as over-predicting, or when you want a 95th percentile, such as a latency target.',
            },
          ],
          relatedLessons: [
            'machine-learning/linear-models/linear-regression-and-least-squares',
            'probability-statistics/estimation-and-confidence/point-estimation-and-estimator-properties',
          ],
        },
      ],
    },
    {
      slug: 'integration',
      title: 'Integration',
      description:
        'The second half of calculus: undoing derivatives, adding up infinitely many small pieces, the fundamental theorem that connects the two, and the two main techniques, substitution and integration by parts.',
      lessons: [
        {
          slug: 'antiderivatives',
          title: 'Antiderivatives',
          summary:
            'Working backwards from a rate to a quantity: the reverse rules, the constant of integration, and using a known starting value.',
          estimatedMinutes: 100,
          objectives: [
            'Find antiderivatives of powers, exponentials and trigonometric functions',
            'Explain why every antiderivative carries a constant',
            'Use an initial value to fix the constant',
            'Recover a quantity from its rate of change',
            'Check an antiderivative by differentiating it',
          ],
          concepts: [
            'Antiderivative',
            'Indefinite integral notation',
            'Constant of integration',
            'Reverse power rule',
            'Initial value problem',
            'Rate to total',
          ],
          explanation: `Differentiation takes a quantity and gives its rate. Often you have the rate and want the quantity: arrivals per hour and total arrivals, or growth rate and level. An **antiderivative** of $f$ is a function $F$ with $F' = f$.

**The constant.** $x^2$, $x^2 + 5$ and $x^2 - 3$ all have derivative $2x$. Since a function with zero derivative must be constant (by the mean value theorem), all antiderivatives of $f$ differ by a constant. We write

$$\\int f(x)\\,dx = F(x) + C.$$

The constant is not a formality. It reflects a real gap: the rate alone cannot tell you where you started.

**Reverse rules.** Read the derivative table backwards:

$$\\int x^n\\,dx = \\frac{x^{n+1}}{n + 1} + C \\quad (n \\ne -1), \\qquad \\int \\frac{1}{x}\\,dx = \\ln|x| + C,$$

$$\\int e^{ax}\\,dx = \\frac{1}{a} e^{ax} + C, \\qquad \\int \\sin x\\,dx = -\\cos x + C, \\qquad \\int \\cos x\\,dx = \\sin x + C.$$

The power rule fails at $n = -1$, where it would divide by zero, and that is exactly where the logarithm comes in. Sums and constant multiples work term by term. Products and quotients do not, which is why later lessons need techniques.

**Always check.** Differentiating your answer must give the original function. This takes seconds, and it catches most errors.

**Initial values.** If signups arrive at a rate $s(t) = 200 e^{-0.05t}$ per day, starting from zero total at launch, then

$$S(t) = \\int 200 e^{-0.05t}\\,dt = -4000 e^{-0.05t} + C.$$

Setting $S(0) = 0$ gives $C = 4000$, so $S(t) = 4000(1 - e^{-0.05t})$. You now know two things the rate does not show directly: after 30 days the total is about 3,107, and it levels off at 4,000. A decaying rate has a finite total.

**A note on what is possible.** Every continuous function has an antiderivative, but many have no formula. The bell curve $e^{-x^2/2}$ is the famous example, and that is why normal probabilities come from tables and numerical methods rather than an expression. Differentiation is mechanical, but antidifferentiation takes pattern recognition and sometimes cannot be done at all. Module 5 handles those cases numerically.

Do the OpenStax exercises, and check each answer by differentiating.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 4.10 Antiderivatives', url: 'https://openstax.org/books/calculus-volume-1/pages/4-10-antiderivatives', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Reverse rules and initial value problems, with many drill questions.', primary: true },
            { title: "Paul's Online Notes: Calculus I", url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'The Integrals chapter opens with indefinite integrals and their rules.' },
          ],
          exercises: [
            {
              slug: 'antiderivative-drill',
              title: 'Antiderivative drill',
              prompt:
                'Find and check by differentiating: (a) $\\int (3x^2 - 4x + 1)\\,dx$, (b) $\\int (\\sqrt{x} + 1/x^2)\\,dx$, (c) $\\int (2e^{3x} + 1/x)\\,dx$, (d) $\\int (\\sin x + 2\\cos x)\\,dx$. For (a), find the antiderivative with value 5 at $x = 0$, and evaluate it at $x = 2$. Expected: 7.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rate-to-total',
              title: 'From a rate to a total',
              prompt:
                'For signups arriving at $s(t) = 200 e^{-0.05t}$ per day: (a) derive $S(t)$ with $S(0) = 0$. (b) Find $S(30)$. (c) Find the limit as $t \\to \\infty$. (d) How many days does it take to reach 90% of the limit? (e) Say what assumption about the future this limit depends on. Expected: about 3,107, then 4,000, then about 46 days.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'recover-a-seasonal-curve',
              title: 'Recover a seasonal curve',
              prompt:
                'A quantity changes at the rate $r(t) = 2 + 6\\pi\\cos(2\\pi t)$, with $t$ in years, and $C(0) = 400$. (a) Find $C(t)$, and check by differentiating. (b) Find $C(1) - C(0)$. (c) Explain why the seasonal term contributes nothing over a whole year. Expected: $C(t) = 400 + 2t + 3\\sin(2\\pi t)$, and a yearly change of exactly 2.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an antiderivative have a $+C$, and what does $C$ mean in practice?',
              answerOutline: 'Functions differing by a constant have the same derivative. In practice $C$ is the starting level, which a rate cannot reveal.',
            },
            {
              question: 'Why does the reverse power rule fail for $1/x$?',
              answerOutline: 'It would divide by $n + 1 = 0$. The antiderivative is $\\ln|x|$ instead.',
            },
            {
              question: 'Why are normal probabilities found from tables or software?',
              answerOutline: 'The antiderivative of $e^{-x^2/2}$ exists, but it has no formula in elementary functions.',
            },
          ],
        },
        {
          slug: 'riemann-sums-and-the-definite-integral',
          title: 'Riemann sums and the definite integral',
          summary:
            'Adding up many thin rectangles to get a total, the definition of the definite integral, and the trapezoids behind the area under an ROC curve.',
          estimatedMinutes: 130,
          objectives: [
            'Compute left, right, midpoint and trapezoid sums',
            'Write a sum in sigma notation',
            'Define the definite integral as a limit of Riemann sums',
            'Interpret an integral as a signed area and as an accumulated total',
            'Compute a total from an irregular table of rates',
          ],
          concepts: [
            'Sigma notation',
            'Left, right and midpoint sums',
            'Trapezoid rule',
            'Definite integral',
            'Signed area',
            'Accumulation',
            'Area under the ROC curve',
          ],
          explanation: `If a rate were constant, the total would be rate times time. When it varies, cut time into small pieces, treat the rate as constant on each one, and add up. That sum is the whole idea of integration.

**Riemann sums.** Split $[a, b]$ into $n$ pieces of width $\\Delta x = (b - a)/n$, and pick a point $x_i^*$ in each. The sum

$$\\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x$$

adds rectangle areas. A **left sum** uses left endpoints, a **right sum** right endpoints, and a **midpoint sum** midpoints. The **trapezoid** rule averages left and right.

For $f(x) = x^2$ on $[0, 1]$ with $n = 4$, the left sum is 0.21875, the right 0.46875, the midpoint 0.328125 and the trapezoid 0.34375. The true value is $1/3$. For an increasing function, the left sum is too low and the right too high, so the true value is bracketed.

**The definite integral** is the limit as the pieces shrink:

$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x.$$

The notation records this: $\\int$ is a stretched S for "sum", and $dx$ recalls the width. For example, using the formula for a sum of squares,

$$\\sum_{i=1}^{n} \\left(\\frac{i}{n}\\right)^2 \\frac{1}{n} = \\frac{(n + 1)(2n + 1)}{6n^2} \\to \\frac13.$$

**Meaning.** The integral is the **signed area** between $f$ and the axis, with area below the axis counted as negative. Of more use to you, the integral of a rate is an accumulated total, and its units are the product of the units: views per hour times hours gives views. It obeys $\\int_a^b (f + g) = \\int_a^b f + \\int_a^b g$ and $\\int_a^b f + \\int_b^c f = \\int_a^c f$.

**From data.** With measurements at uneven times, the trapezoid rule is natural:

$$\\text{total} \\approx \\sum_{i} (t_{i+1} - t_i)\\, \\frac{r_i + r_{i+1}}{2}.$$

This is how pharmacologists measure drug exposure from a few blood samples, and how a classifier's **AUC** is computed. An ROC curve through $(0, 0)$, $(0.1, 0.6)$, $(0.3, 0.8)$ and $(1, 1)$ has trapezoid area $0.03 + 0.14 + 0.63 = 0.80$.

Compute a few sums by hand before using software, so the formula stays attached to the picture.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 5.1 Approximating Areas', url: 'https://openstax.org/books/calculus-volume-1/pages/5-1-approximating-areas', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Sigma notation and Riemann sums. Continue with 5.2 on the definite integral.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'Chapter 8 shows integration as adding up thin slices, and why that connects to derivatives.' },
          ],
          exercises: [
            {
              slug: 'four-sums',
              title: 'Four sums by hand',
              prompt:
                'For $f(x) = 1/x$ on $[1, 2]$ with $n = 4$, compute the left, right, midpoint and trapezoid sums. Say which of them over- or under-estimate, and why. Compare with the true value $\\ln 2$. Expected: about 0.7595, 0.6345, 0.6912 and 0.6970, against 0.6931.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'sum-to-integral',
              title: 'From a sum to an exact integral',
              prompt:
                'Using $\\sum_{i=1}^n i = n(n + 1)/2$, write the right Riemann sum for $f(x) = 3x$ on $[0, 2]$ with $n$ pieces, simplify it, and let $n \\to \\infty$. Check against the area of a triangle. Expected: the sum is $6(n + 1)/n$, and the limit is 6.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'auc-by-trapezoids',
              title: 'Compute an AUC',
              prompt:
                'A classifier gives the ROC points (false positive rate, true positive rate) $(0, 0)$, $(0.05, 0.4)$, $(0.2, 0.7)$, $(0.5, 0.9)$ and $(1, 1)$. Compute the area with trapezoids. Then compute it for a random classifier, whose curve is the diagonal. Say in one sentence what 0.5 and 1 would mean. Expected: AUC of 0.8075, and 0.5 for the diagonal.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a Riemann sum, and what happens as the pieces shrink?',
              answerOutline: 'A sum of $f$ times a small width. For a continuous function, it tends to the definite integral whichever sample points you use.',
            },
            {
              question: 'What are the units of $\\int_0^T r(t)\\,dt$ if $r$ is in views per hour and $t$ in hours?',
              answerOutline: 'Views. The units multiply.',
            },
            {
              question: 'Why does the trapezoid rule suit data measured at uneven times?',
              answerOutline: 'Each piece uses its own width and just the two neighbouring readings, so no regular grid is needed.',
            },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/classification-metrics-and-curves'],
        },
        {
          slug: 'the-fundamental-theorem',
          title: 'The fundamental theorem of calculus',
          summary:
            'The result that links rates and totals: an integral can be computed from any antiderivative, and the derivative of an accumulated total is the rate.',
          estimatedMinutes: 120,
          objectives: [
            'State both parts of the fundamental theorem',
            'Evaluate definite integrals with antiderivatives',
            'Differentiate an integral with a variable upper limit',
            'Explain the theorem using the idea of net change',
            'Compute an average rate from an integral',
          ],
          concepts: [
            'Accumulation function',
            'FTC part 1',
            'FTC part 2',
            'Net change theorem',
            'Evaluation bars',
            'Variable limits with the chain rule',
          ],
          explanation: `Derivatives are about slopes, and integrals are about areas. It is a surprise that they are inverse operations, and this is the central fact of calculus.

**Part 1.** Define an accumulation function $A(x) = \\int_a^x f(t)\\,dt$, the total so far. Then

$$A'(x) = f(x).$$

**Why.** Increasing $x$ by a small $h$ adds a thin strip of height about $f(x)$ and width $h$, so $A(x + h) - A(x) \\approx f(x) h$. Divide by $h$ and let it shrink. In words: the rate at which a total grows is the current rate. For probabilities, this says a density is the derivative of its cumulative distribution.

**Part 2.** If $F$ is any antiderivative of $f$, then

$$\\int_a^b f(x)\\,dx = F(b) - F(a).$$

**Why.** $A$ and $F$ have the same derivative, so they differ by a constant, and $A(a) = 0$ fixes it. This replaces a limit of sums with one subtraction. The constant $C$ cancels, so any antiderivative will do. We write $\\big[F(x)\\big]_a^b$ for $F(b) - F(a)$.

**Worked examples.**

$$\\int_0^1 x^2\\,dx = \\Big[\\tfrac13 x^3\\Big]_0^1 = \\tfrac13, \\qquad \\int_0^\\pi \\sin x\\,dx = \\big[-\\cos x\\big]_0^\\pi = 2.$$

The first is the answer that needed a limit of sums last lesson.

**Net change.** Part 2 says $\\int_a^b F'(t)\\,dt = F(b) - F(a)$. The integral of a rate is the total change, regardless of the path. Applied to a seasonal rate, a full year of the sine term cancels, leaving just the trend. Applied to a net flow, it gives the net change even when the flow reverses sign. To get the total distance rather than the net change, you must integrate $|F'|$.

**Variable limits.** Combine Part 1 with the chain rule:

$$\\frac{d}{dx} \\int_0^{x^2} e^{-t^2}\\,dt = e^{-x^4} \\cdot 2x.$$

This works even though the integrand has no antiderivative formula, because the theorem never needs one.

**Average value.** Since the total equals the average rate times the length of the interval, the average of $f$ on $[a, b]$ is $\\frac{1}{b - a} \\int_a^b f(x)\\,dx$.

**Pitfall.** Part 2 needs $f$ continuous on the whole interval. $\\int_{-1}^1 x^{-2}\\,dx$ is not $-2$, because $1/x^2$ blows up at 0. Module 5 deals with this case.

Watch the 3Blue1Brown chapter, then do the OpenStax problems on both parts.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 5.3 The Fundamental Theorem of Calculus', url: 'https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Both parts, the average value theorem and many drill problems.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'Chapters 8 and 9 give the geometric reason integration undoes differentiation.' },
            { title: 'MIT 18.01SC Single Variable Calculus', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 3 covers the theorem with worked problems.' },
          ],
          exercises: [
            {
              slug: 'evaluate-integrals',
              title: 'Evaluate definite integrals',
              prompt:
                'Evaluate: (a) $\\int_1^4 (2x + 1)\\,dx$, (b) $\\int_1^e \\frac{1}{x}\\,dx$, (c) $\\int_0^{\\pi/2} \\cos x\\,dx$, (d) $\\int_0^2 e^{-x}\\,dx$, (e) $\\int_0^1 (x - x^2)\\,dx$. Expected: 18, 1, 1, about 0.8647, and 1/6.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'differentiate-an-accumulation',
              title: 'Differentiate an accumulation',
              prompt:
                'Find (a) $\\frac{d}{dx} \\int_1^x \\ln t\\,dt$, (b) $\\frac{d}{dx} \\int_0^{x^2} e^{-t^2}\\,dt$, (c) $\\frac{d}{dx} \\int_x^5 \\sin t\\,dt$. Let $F(x) = \\int_0^x f(t)\\,dt$ be the total share of a population below $x$, for a density $f$. Say what $F\'(x)$ means, and why $F$ can never decrease.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'net-versus-total',
              title: 'Net change and total movement',
              prompt:
                'Water levels change at $r(t) = \\sin t$ on $[0, 2\\pi]$. Find the net change and the total movement $\\int_0^{2\\pi} |\\sin t|\\,dt$. Give an example from data, such as customer churn and signups, where a net change near zero hides large movement. Find the average of $r$ and of $|r|$ over the interval. Expected: net 0, total 4, and averages 0 and $2/\\pi$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State both parts of the fundamental theorem in words.',
              answerOutline: 'The rate of growth of an accumulated total is the current value of the rate. A definite integral is the change in any antiderivative.',
            },
            {
              question: 'Why does the constant $C$ not appear in a definite integral?',
              answerOutline: 'It appears in both $F(b)$ and $F(a)$ and cancels on subtraction.',
            },
            {
              question: 'Why is $\\int_{-1}^1 x^{-2}\\,dx$ not equal to $-2$?',
              answerOutline: 'The integrand is unbounded at 0, inside the interval, so the theorem does not apply.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/integration-techniques'],
        },
        {
          slug: 'substitution',
          title: 'Integration by substitution',
          summary:
            'The chain rule run backwards: how to spot an inner function, change variables and change limits, and why standardising a variable is a substitution.',
          estimatedMinutes: 120,
          objectives: [
            'Recognise when an integrand contains a function and its derivative',
            'Carry out a substitution in an indefinite integral',
            'Change the limits in a definite integral',
            'Explain standardisation as a change of variables',
            'Decide when substitution will not help',
          ],
          concepts: [
            'u-substitution',
            'Reverse chain rule',
            'Changing limits',
            'Linear substitution',
            'Change of scale',
            'Standardisation $z = (x - \\mu)/\\sigma$',
          ],
          explanation: `The chain rule says $\\frac{d}{dx} F(g(x)) = f(g(x)) g'(x)$ when $F' = f$. Reading that backwards gives **substitution**:

$$\\int f(g(x))\\, g'(x)\\,dx = \\int f(u)\\,du \\quad \\text{where } u = g(x).$$

**The method.** Choose an inner function $u$ whose derivative also appears, up to a constant. Write $du = g'(x)\\,dx$, replace everything, integrate in $u$, then return to $x$.

**Example 1.** For $\\int x e^{-x^2/2}\\,dx$, let $u = -x^2/2$, so $du = -x\\,dx$. The integral becomes $-\\int e^u\\,du = -e^{-x^2/2} + C$. Differentiate to check. Remove the factor of $x$, though, and the method fails: $\\int e^{-x^2/2}\\,dx$ has no elementary form. Substitution needs that derivative present.

**Example 2.** For $\\int \\frac{2x}{1 + x^2}\\,dx$, let $u = 1 + x^2$. The integral is $\\int \\frac{1}{u}\\,du = \\ln(1 + x^2) + C$. In general, $\\int \\frac{g'}{g}\\,dx = \\ln|g| + C$.

**Definite integrals.** Change the limits along with the variable, and you never need to return to $x$:

$$\\int_0^2 x e^{-x^2}\\,dx = \\tfrac12 \\int_0^4 e^{-u}\\,du = \\tfrac12 (1 - e^{-4}) \\approx 0.4908,$$

with $u = x^2$. The limits 0 and 2 became 0 and 4. Leaving the old limits in place is the most common error.

**Linear substitutions** are simple but useful: $\\int f(ax + b)\\,dx = \\frac{1}{a} F(ax + b) + C$.

**Standardisation.** With $z = (x - \\mu)/\\sigma$, we have $dz = dx/\\sigma$, so

$$\\int_{\\mu - \\sigma}^{\\mu + \\sigma} \\frac{1}{\\sigma} g\\!\\left(\\frac{x - \\mu}{\\sigma}\\right) dx = \\int_{-1}^{1} g(z)\\,dz.$$

This is why one table of the standard normal serves every normal distribution, and why the $1/\\sigma$ in a density formula is not optional: stretching the axis by $\\sigma$ means height must fall by $\\sigma$ so the area stays 1. Every density with a scale parameter works this way.

**Choosing $u$.** Look for something inside a power, an exponential, a root or a logarithm. If a wrong choice leaves stray $x$ terms, try another. If nothing works, the next lesson or a numerical method may.

Do the OpenStax problems, always writing $u$ and $du$ on a separate line, and check indefinite answers by differentiating.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 5.5 Substitution', url: 'https://openstax.org/books/calculus-volume-1/pages/5-5-substitution', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Indefinite and definite substitution. Sections 5.6 and 5.7 extend it to exponentials and inverse trig.', primary: true },
            { title: "Paul's Online Notes: Calculus I", url: 'https://tutorial.math.lamar.edu/Classes/CalcI/CalcI.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'Two sections of substitution problems, starting simple and building up.' },
          ],
          exercises: [
            {
              slug: 'substitution-drill',
              title: 'Substitution drill',
              prompt:
                'Evaluate: (a) $\\int (3x + 2)^5\\,dx$, (b) $\\int \\frac{\\ln x}{x}\\,dx$, (c) $\\int_0^{\\pi/2} \\sin x \\cos x\\,dx$, (d) $\\int_0^1 \\frac{x}{1 + x^2}\\,dx$, (e) $\\int_0^2 x e^{-x^2}\\,dx$, (f) $\\int e^{x}\\sqrt{1 + e^{x}}\\,dx$. State $u$ for each. Expected for (c), (d), (e): $1/2$, about 0.3466, and about 0.4908.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'density-scale',
              title: 'Why densities divide by the scale',
              prompt:
                'Let $g(z) = \\frac12 e^{-|z|}$, the Laplace density, which has total area 1. Using a substitution, show that $f(x) = \\frac{1}{\\sigma} g((x - \\mu)/\\sigma)$ also has total area 1, for any $\\mu$ and $\\sigma > 0$. Then find the area of $g$ on $[0, 2]$, and argue what the area of $f$ is on $[\\mu, \\mu + 2\\sigma]$. Expected: both are $\\frac12(1 - e^{-2}) \\approx 0.4323$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'when-it-fails',
              title: 'When substitution fails',
              prompt:
                'For each integral, try the obvious substitution and say whether it works, showing what is left over if not: (a) $\\int x e^{x^2}\\,dx$, (b) $\\int e^{x^2}\\,dx$, (c) $\\int x^2 e^{x^3}\\,dx$, (d) $\\int x e^{x}\\,dx$, (e) $\\int \\frac{1}{1 + x^2}\\,dx$. Which ones need a different method, and which have no elementary answer? Do not solve the failures yet.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes an integral suitable for substitution?',
              answerOutline: 'It contains a composite $f(g(x))$ together with $g\'(x)$, up to a constant factor.',
            },
            {
              question: 'What happens to the limits in a definite integral?',
              answerOutline: 'They change to the values of $u$ at the old limits, and you do not need to convert back.',
            },
            {
              question: 'Why does a density with scale $\\sigma$ carry a factor of $1/\\sigma$?',
              answerOutline: 'Stretching the axis by $\\sigma$ multiplies area by $\\sigma$, so height must be divided by $\\sigma$ for the total to stay 1. The substitution $z = (x - \\mu)/\\sigma$ shows this.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/integration-techniques'],
        },
        {
          slug: 'integration-by-parts',
          title: 'Integration by parts',
          summary:
            'The product rule run backwards, used for integrals of products such as $x e^{-x}$, the integral behind expected values and mean residence times.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the integration by parts formula from the product rule',
            'Choose $u$ and $dv$ sensibly',
            'Evaluate integrals involving $x e^{ax}$, $\\ln x$ and $x \\sin x$',
            'Apply parts twice',
            'Compute $\\int_0^T t e^{-kt}\\,dt$ and interpret it',
          ],
          concepts: [
            'Integration by parts',
            'Choosing u and dv',
            'Repeated parts',
            'Integrating logarithms',
            'First moment integral',
            'Boundary terms',
          ],
          explanation: `The product rule says $(uv)' = u'v + uv'$. Integrate both sides and rearrange:

$$\\int u\\,dv = uv - \\int v\\,du.$$

This trades one integral for another that is hopefully easier. It suits a product where differentiating one factor makes it simpler, and integrating the other does not make it worse.

**Example 1.** For $\\int x e^{-x}\\,dx$, take $u = x$, so $du = dx$, and $dv = e^{-x}\\,dx$, so $v = -e^{-x}$. Then

$$\\int x e^{-x}\\,dx = -x e^{-x} + \\int e^{-x}\\,dx = -e^{-x}(x + 1) + C.$$

If you swapped the choice, $u = e^{-x}$ and $dv = x\\,dx$, the power of $x$ would rise and the problem would get worse.

**Choosing $u$.** A rule of thumb is LIATE: pick $u$ as the first of Logarithm, Inverse trig, Algebraic, Trig, Exponential that appears.

**Example 2: a logarithm.** $\\int \\ln x\\,dx$ looks like one factor, but take $u = \\ln x$ and $dv = dx$:

$$\\int \\ln x\\,dx = x \\ln x - \\int x \\cdot \\frac{1}{x}\\,dx = x \\ln x - x + C.$$

**Example 3: repeated parts.** For $\\int x^2 e^{-x}\\,dx$, one round lowers $x^2$ to $x$, and a second lowers $x$ to 1. Each round reduces the polynomial's degree by one.

**Definite integrals.** Evaluate the boundary term $uv$ at the limits:

$$\\int_a^b u\\,dv = \\big[uv\\big]_a^b - \\int_a^b v\\,du.$$

**Why this matters for data.** If $t$ is a time and $e^{-kt}$ describes how something decays, then $\\int t e^{-kt}\\,dt$ is a **first moment**. It weights each time by how much is still there, and it is how you compute an average time:

$$\\int_0^T t e^{-kt}\\,dt = \\frac{1 - e^{-kT}(1 + kT)}{k^2}.$$

Divide by the total, $\\int_0^T e^{-kt}\\,dt = (1 - e^{-kT})/k$, and you have the average time at which things happen. Pharmacologists use this ratio as the mean residence time of a drug, and in Module 5 the same integral gives the expected value of a waiting time. As $T \\to \\infty$ the ratio tends to $1/k$. So the mean of an exponential decay is $1/k$, longer than its half-life of $\\ln 2 / k$, because the long tail pulls the average up.

Between them, substitution and parts handle most integrals you will meet by hand. Do the OpenStax problems, then look back at the failures from the last lesson's exercise.`,
          resources: [
            { title: 'OpenStax Calculus Volume 2, 3.1 Integration by Parts', url: 'https://openstax.org/books/calculus-volume-2/pages/3-1-integration-by-parts', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'The formula, advice on choosing parts, and many exercises.', primary: true },
            { title: "Paul's Online Notes: Calculus II", url: 'https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'The first section of Integration Techniques has fully worked examples.' },
          ],
          exercises: [
            {
              slug: 'parts-drill',
              title: 'Integration by parts drill',
              prompt:
                'Evaluate: (a) $\\int_0^1 x e^{x}\\,dx$, (b) $\\int_1^e \\ln x\\,dx$, (c) $\\int_1^e x \\ln x\\,dx$, (d) $\\int_0^\\pi x \\sin x\\,dx$, (e) $\\int x^2 e^{-x}\\,dx$. State $u$ and $dv$ for each. Expected: 1, 1, $(e^2 + 1)/4 \\approx 2.097$, $\\pi$, and $-e^{-x}(x^2 + 2x + 2) + C$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'first-moment',
              title: 'The first moment of a decay',
              prompt:
                'Derive $\\int_0^T t e^{-kt}\\,dt = (1 - e^{-kT}(1 + kT))/k^2$. Then find the average time $\\bar{t}(T)$ for $k = 0.1$ at $T = 10, 50$ and 200, and find its limit as $T \\to \\infty$. Compare the limit with the half-life. Expected: about 4.18, 9.66, 10.0, with the limit 10 against a half-life of about 6.93.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'choose-the-technique',
              title: 'Choose the technique',
              prompt:
                'Decide on substitution, parts, both or neither, then evaluate those you can: (a) $\\int x \\cos(x^2)\\,dx$, (b) $\\int x \\cos x\\,dx$, (c) $\\int \\ln(x)^2 / x\\,dx$, (d) $\\int e^{\\sqrt{x}}\\,dx$, (e) $\\int e^{-x^2}\\,dx$. For (d), substitute first, then use parts. Say why (e) cannot be done by these methods.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive integration by parts.',
              answerOutline: 'Integrate the product rule $(uv)\' = u\'v + uv\'$ and rearrange.',
            },
            {
              question: 'For $\\int x e^{-x}\\,dx$, why choose $u = x$?',
              answerOutline: 'Differentiating $x$ simplifies it to a constant, while $e^{-x}$ stays the same kind of function when integrated.',
            },
            {
              question: 'What is a first moment, and why does it give an average?',
              answerOutline: '$\\int t f(t)\\,dt$ weights each time by how much is there. Dividing by $\\int f(t)\\,dt$ gives a weighted average time.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/integration-techniques'],
        },
      ],
    },
    {
      slug: 'applications-of-integrals',
      title: 'Applications of Integrals',
      description:
        'Integrals at work in data: areas and inequality measures, densities and cumulative distributions, expected values and variances, and numerical integration for the many integrals with no formula.',
      lessons: [
        {
          slug: 'area-and-average-value',
          title: 'Area between curves, average value and the Gini coefficient',
          summary:
            'Computing areas between functions, the average of a function, and turning a Lorenz curve into the most quoted measure of inequality.',
          estimatedMinutes: 100,
          objectives: [
            'Find the area between two curves, including where they cross',
            'Compute the average value of a function on an interval',
            'Explain what a Lorenz curve shows',
            'Compute a Gini coefficient from a formula and from a table',
            'State what a Gini coefficient does not tell you',
          ],
          concepts: [
            'Area between curves',
            'Finding intersection points',
            'Average value of a function',
            'Lorenz curve',
            'Gini coefficient',
            'Trapezoids from grouped data',
          ],
          explanation: `The area between $f$ and $g$ on $[a, b]$, when $f \\ge g$, is

$$\\int_a^b \\big(f(x) - g(x)\\big)\\,dx.$$

Think of thin vertical strips of height $f - g$. If the curves cross, find the crossing points and integrate $|f - g|$ piece by piece. Otherwise the positive and negative parts will cancel. For $f = x$ and $g = x^2$, which meet at 0 and 1, the area is $\\frac12 - \\frac13 = \\frac16$.

**Average value.** The average of $f$ on $[a, b]$ is

$$\\bar{f} = \\frac{1}{b - a} \\int_a^b f(x)\\,dx.$$

It is the height of the rectangle with the same width and the same area. It generalises the arithmetic mean, since a Riemann sum is a sum of $f(x_i)$ times $\\Delta x$, divided by the total width. The average of $\\sin x$ on $[0, \\pi]$ is $2/\\pi \\approx 0.637$, which is not the midpoint of its range. A seasonal wave averages to zero over a whole period, and that is why monthly seasonal effects can be removed by averaging over 12 months.

**The Lorenz curve.** Sort a population from poorest to richest. Let $L(p)$ be the share of total income held by the bottom fraction $p$. Then $L(0) = 0$, $L(1) = 1$, and $L$ is increasing and bent downwards. Perfect equality gives $L(p) = p$, the diagonal. The further the curve sags below the diagonal, the more unequal the distribution.

**The Gini coefficient** turns that sag into one number:

$$G = 2 \\int_0^1 \\big(p - L(p)\\big)\\,dp = 1 - 2 \\int_0^1 L(p)\\,dp.$$

The factor of 2 makes the maximum 1. $G = 0$ is perfect equality. For $L(p) = p^2$, $G = 1 - 2 \\cdot \\frac13 = \\frac13$.

**From a table.** Agencies usually publish shares by group, so use trapezoids. Quintile shares of 3, 8, 14, 23 and 52 percent cumulate to 0, 0.03, 0.11, 0.25, 0.48 and 1. The trapezoid area is $0.2(0.03 + 0.11 + 0.25 + 0.48 + 0.5) = 0.274$, so $G \\approx 0.452$. Grouping hides inequality inside each group, so this slightly understates the true value.

**A caution.** Very different distributions can share a Gini. One number summarises the area, not the shape: two Lorenz curves can cross. Always look at the curve too.

Work the area problems in OpenStax, then compute a Gini yourself before reading any published figure.`,
          resources: [
            { title: 'OpenStax Calculus Volume 1, 5.3 The Fundamental Theorem of Calculus', url: 'https://openstax.org/books/calculus-volume-1/pages/5-3-the-fundamental-theorem-of-calculus', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'The average value theorem. Section 6.1 of the book covers areas between curves.', primary: true },
            { title: 'OpenStax Calculus Volume 1', url: 'https://openstax.org/details/books/calculus-volume-1', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Book landing page. Use Chapter 6 for areas between curves.' },
          ],
          exercises: [
            {
              slug: 'crossing-curves',
              title: 'Areas with a crossing',
              prompt:
                'Find the area between (a) $y = x$ and $y = x^2$ on $[0, 2]$, where the curves cross, and (b) $y = \\sin x$ and $y = \\cos x$ on $[0, \\pi/2]$. Compare with the plain integral of the difference, which ignores the crossing. Expected: (a) 1, against a plain integral of $-2/3$. (b) $2\\sqrt{2} - 2 \\approx 0.828$, against 0.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'gini-from-formulas',
              title: 'Gini from formulas',
              prompt:
                'Find $G$ for the Lorenz curves $L(p) = p^3$ and $L(p) = 0.5p + 0.5p^3$. Check that each satisfies $L(0) = 0$ and $L(1) = 1$ and is increasing. For a general $L(p) = p^a$ with $a \\ge 1$, derive $G = (a - 1)/(a + 1)$. Expected: 1/2 and 1/4.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gini-from-a-table',
              title: 'Gini from quintile shares',
              prompt:
                'A published table gives income shares by quintile. Use the shares 3, 8, 14, 23 and 52 percent, an illustrative pattern, and then a more equal 7, 12, 17, 23 and 41. Compute both Gini values with trapezoids, and plot both Lorenz curves on one graph. Say whether grouping biases the estimate up or down, and why. Expected: about 0.452 and 0.316.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you split an area integral where curves cross?',
              answerOutline: 'The signed difference changes sign, so the parts cancel. Area needs the absolute difference.',
            },
            {
              question: 'What is the average value of a function, geometrically?',
              answerOutline: 'The height of a rectangle on the same base with the same area as under the curve.',
            },
            {
              question: 'What does the Gini coefficient measure, and what does it miss?',
              answerOutline: 'Twice the area between the Lorenz curve and the diagonal. It is a single summary, so different shapes can share a value, and crossing Lorenz curves cannot be ranked by it.',
            },
          ],
        },
        {
          slug: 'densities-and-cumulative-distributions',
          title: 'Densities and cumulative distributions',
          summary:
            'Improper integrals, what a probability density means, the cumulative distribution, and why heavy tails can decide whether a total is finite.',
          estimatedMinutes: 140,
          objectives: [
            'Evaluate improper integrals and decide whether they converge',
            'Check that a function is a valid density and find its constant',
            'Compute probabilities as areas under a density',
            'Move between a density and its cumulative distribution',
            'Find a median and other quantiles from a cumulative distribution',
          ],
          concepts: [
            'Improper integral',
            'Convergence and divergence',
            'Probability density function',
            'Cumulative distribution function',
            'Survival function',
            'Quantile',
            'Exponential distribution',
            'Heavy tails',
          ],
          explanation: `**Improper integrals.** To integrate to infinity, integrate to a finite $R$ and take a limit:

$$\\int_1^\\infty x^{-p}\\,dx = \\lim_{R \\to \\infty} \\Big[\\frac{x^{1-p}}{1 - p}\\Big]_1^R = \\frac{1}{p - 1} \\quad (p > 1).$$

If $p \\le 1$ the limit is infinite. So $\\int_1^\\infty x^{-2}\\,dx = 1$, while $\\int_1^\\infty x^{-1}\\,dx$ diverges, though both integrands tend to 0. A tail must fall fast enough, and whether a total is finite can hang on this one exponent. The same limit method handles an integrand that blows up inside an interval: $\\int_0^1 x^{-1/2}\\,dx = 2$.

**Densities.** A continuous random variable $X$ has a **density** $f(x) \\ge 0$ with $\\int_{-\\infty}^{\\infty} f(x)\\,dx = 1$. Probability is area:

$$P(a \\le X \\le b) = \\int_a^b f(x)\\,dx.$$

A density is not a probability. It can exceed 1, because it has units of probability per unit of $x$. Any single point has probability 0. Since $P(x \\le X \\le x + h) \\approx f(x)\\,h$, a density is a rate of probability per unit of $x$, which is why a histogram with a small bin width estimates one.

**Cumulative distribution.** $F(x) = P(X \\le x) = \\int_{-\\infty}^x f(t)\\,dt$. By the fundamental theorem, $F' = f$. $F$ rises from 0 to 1, and $P(a \\le X \\le b) = F(b) - F(a)$. A **quantile** inverts it: the median solves $F(m) = 1/2$. Unlike a density, $F$ can be estimated from data with no bin width, by counting the fraction of values below $x$.

**The exponential.** $f(x) = \\lambda e^{-\\lambda x}$ for $x \\ge 0$ models waiting times. Then $F(x) = 1 - e^{-\\lambda x}$, and the **survival function** is $S(x) = 1 - F(x) = e^{-\\lambda x}$. The median is $\\ln 2 / \\lambda$.

**The normal.** $\\frac{1}{\\sqrt{2\\pi}} e^{-x^2/2}$ integrates to 1, though proving it needs a trick from multivariable calculus. Its $F$ has no formula, and that is why it is found numerically.

**Heavy tails.** The Pareto density $f(x) = \\alpha x^{-\\alpha - 1}$ on $[1, \\infty)$ has $S(x) = x^{-\\alpha}$, a power law. A power-law tail decays far more slowly than an exponential one, so extreme values are common. Incomes, city sizes and attention online often behave this way.

Work the improper integral section in OpenStax, then the exercises below.`,
          resources: [
            { title: 'OpenStax Calculus Volume 2, 3.7 Improper Integrals', url: 'https://openstax.org/books/calculus-volume-2/pages/3-7-improper-integrals', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Integrals over infinite intervals and with unbounded integrands, with convergence tests.', primary: true },
            { title: "Paul's Online Notes: Calculus II", url: 'https://tutorial.math.lamar.edu/Classes/CalcII/CalcII.aspx', type: 'textbook', cost: 'free', provider: 'Lamar University', note: 'The Applications of Integrals chapter has a section on probability.' },
            { title: 'Old Faithful data (faithful)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/faithful.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'For the empirical distribution exercise.' },
          ],
          exercises: [
            {
              slug: 'converge-or-diverge',
              title: 'Converge or diverge',
              prompt:
                'Evaluate or show divergence: (a) $\\int_1^\\infty x^{-3}\\,dx$, (b) $\\int_1^\\infty x^{-1/2}\\,dx$, (c) $\\int_0^1 x^{-1/2}\\,dx$, (d) $\\int_0^1 x^{-2}\\,dx$, (e) $\\int_0^\\infty e^{-2x}\\,dx$, (f) $\\int_0^\\infty x e^{-x}\\,dx$. State in one sentence the rule for $x^{-p}$ at infinity and at 0. Expected: 1/2, diverges, 2, diverges, 1/2, 1.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'build-a-distribution',
              title: 'Build a distribution',
              prompt:
                'Let $f(x) = cx^2$ on $[0, 2]$ and 0 elsewhere. Find $c$, $F(x)$, $P(X \\le 1)$ and the median. For the exponential with $\\lambda = 0.5$, find $P(X > 3)$, the median and the 90th percentile. Expected: $c = 3/8$, $P(X \\le 1) = 1/8$, median about 1.587. Then 0.2231, about 1.386 and about 4.605.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'empirical-cdf',
              title: 'An empirical distribution',
              prompt:
                'Using the Old Faithful `waiting` column, compute the fraction of waits at or below 50, 60, 70, 80 and 90 minutes, then plot the empirical cumulative distribution as a step function. Estimate the density on $(60, 70]$ and on $(75, 85]$ as a fraction per minute. Compare the fraction at or below 60 with a normal model using the sample mean and standard deviation. Say what the disagreement shows. Expected fractions: 0.096, 0.305, 0.393, 0.691, 0.978. The densities are about 0.009 and 0.040, and the normal model gives about 0.21 for the fraction below 60, against 0.305.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'To evaluate the normal model, compute the z-score and read a table, or use `statistics.NormalDist` in Python.',
            },
            {
              slug: 'pareto-tail',
              title: 'Compare two tails',
              prompt:
                'Compare an exponential with $\\lambda = 1$, shifted to start at 1 so $S(x) = e^{-(x - 1)}$, and a Pareto with $\\alpha = 2$ and $S(x) = x^{-2}$. Compute both survival probabilities at $x = 2, 5, 10, 50$. For what $\\alpha$ is $\\int_1^\\infty S(x)\\,dx$ finite? Expected: at $x = 50$, about $5.2 \\times 10^{-22}$ against $4 \\times 10^{-4}$. The integral is finite for $\\alpha > 1$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'For which $p$ does $\\int_1^\\infty x^{-p}\\,dx$ converge? How do you show it?',
              answerOutline: 'For $p > 1$. Integrate to $R$ and take the limit: the value is $1/(p - 1)$.',
            },
            {
              question: 'Can a density exceed 1? Why does this not break probability?',
              answerOutline: 'Yes. A density is probability per unit of $x$. Only its area must equal 1.',
            },
            {
              question: 'How are the density and the cumulative distribution related?',
              answerOutline: '$F$ is the integral of $f$, and $f$ is the derivative of $F$. This is the fundamental theorem.',
            },
            {
              question: 'What does "heavy tail" mean in terms of a survival function?',
              answerOutline: 'It decays slowly, like a power law rather than an exponential, so extreme values are far more likely.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/continuous-distributions'],
        },
        {
          slug: 'expected-value-and-variance',
          title: 'Expected value and variance',
          summary:
            'Averages of a random quantity as integrals: the mean, the variance, the expected value of a function, and distributions whose mean does not exist.',
          estimatedMinutes: 120,
          objectives: [
            'Compute an expected value and a variance from a density',
            'Use $E[g(X)] = \\int g(x) f(x)\\,dx$',
            'Derive the mean and variance of the exponential distribution',
            'Show how scale and shift change a mean and variance',
            'Explain why a Pareto distribution can have no finite mean',
          ],
          concepts: [
            'Expected value',
            'Expectation of a function',
            'Variance and standard deviation',
            'Linearity of expectation',
            'Moments',
            'Infinite mean',
            'Sample mean versus expected value',
          ],
          explanation: `The **expected value** of $X$ with density $f$ is

$$E[X] = \\int_{-\\infty}^{\\infty} x f(x)\\,dx.$$

This is the sum of value times probability from discrete statistics, with $f(x)\\,dx$ as the probability of a thin slice. It is the balance point of the density, and the long-run average of many draws. More generally, the expected value of any function is

$$E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) f(x)\\,dx.$$

**Variance** measures spread:

$$\\text{Var}(X) = E\\big[(X - \\mu)^2\\big] = E[X^2] - \\mu^2.$$

The second form is usually easier. The standard deviation is $\\sqrt{\\text{Var}(X)}$, in the same units as $X$.

**The exponential.** With $f(x) = \\lambda e^{-\\lambda x}$, integration by parts gives

$$E[X] = \\int_0^\\infty x \\lambda e^{-\\lambda x}\\,dx = \\Big[-x e^{-\\lambda x}\\Big]_0^\\infty + \\int_0^\\infty e^{-\\lambda x}\\,dx = \\frac{1}{\\lambda}.$$

The boundary term vanishes because an exponential beats any power. Doing parts twice gives $E[X^2] = 2/\\lambda^2$, so the variance is $1/\\lambda^2$ and the standard deviation equals the mean.

**Linearity.** Because integrals are linear, $E[aX + b] = aE[X] + b$. By contrast, $\\text{Var}(aX + b) = a^2 \\text{Var}(X)$: a shift has no effect on spread, and scaling acts on the square. These two rules explain standardising: $Z = (X - \\mu)/\\sigma$ has mean 0 and variance 1.

**A warning.** $E[g(X)] \\ne g(E[X])$ in general. The mean of $X^2$ is not the square of the mean, and the difference is exactly the variance. If $g$ is convex, $E[g(X)] \\ge g(E[X])$, which is called Jensen's inequality.

**When the mean does not exist.** For the Pareto density $f(x) = \\alpha x^{-\\alpha - 1}$ on $[1, \\infty)$,

$$E[X] = \\int_1^\\infty \\alpha x^{-\\alpha}\\,dx = \\frac{\\alpha}{\\alpha - 1} \\quad \\text{only if } \\alpha > 1.$$

For $\\alpha \\le 1$ the integral diverges. The variance needs $\\alpha > 2$. This is no curiosity. If the tail is that heavy, a sample mean never settles down: each new record can move it, and "average" stops being a useful summary. The law of large numbers needs a finite mean, and you should look at the shape of a tail before you trust an average.

Do the derivations by hand, then confirm them by simulating draws in Python and comparing the sample mean.`,
          resources: [
            { title: 'OpenStax Calculus Volume 2', url: 'https://openstax.org/details/books/calculus-volume-2', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Section 2.8 discusses exponential growth and decay, and 3.7 the improper integrals needed here.', primary: true },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 6 covers expected values and variance alongside the notation used in machine learning.' },
          ],
          exercises: [
            {
              slug: 'moments-by-hand',
              title: 'Moments by hand',
              prompt:
                'Compute the mean and variance of (a) $f(x) = 2x$ on $[0, 1]$, (b) the uniform density on $[a, b]$, (c) $f(x) = \\frac{3}{8}x^2$ on $[0, 2]$. Then use the linearity rules to find the mean and variance of $Y = 10X + 5$ for (a). Expected: (a) 2/3 and 1/18, (b) $(a + b)/2$ and $(b - a)^2/12$, (c) 1.5 and 0.15. For $Y$: 35/3 and 50/9.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'exponential-moments',
              title: 'Moments of the exponential',
              prompt:
                'Derive $E[X] = 1/\\lambda$ and $\\text{Var}(X) = 1/\\lambda^2$ for the exponential distribution, showing each boundary term. Then derive the median, and explain why the mean exceeds the median. For $\\lambda = 0.2$, find the probability a draw exceeds its mean. Expected: $1/e \\approx 0.368$, whatever $\\lambda$ is.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sample-means-that-wander',
              title: 'Sample means that refuse to settle',
              prompt:
                'A Pareto draw can be simulated as $X = U^{-1/\\alpha}$, where $U$ is uniform on $(0, 1)$. In Python, draw $10^6$ values for $\\alpha = 3$, $1.5$ and $0.9$, and plot the running mean against the sample size on log axes. Repeat with 3 seeds. Compute the theoretical means where they exist. Report what you see, and say which cases have a meaningful average. Expected: theoretical means 1.5 and 3. For $\\alpha = 3$ the running means settle close to 1.5. For $\\alpha = 1.5$ they settle slowly and jump at large draws. For $\\alpha = 0.9$ they keep growing.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use `numpy.random.default_rng(seed).random(n)` and `numpy.cumsum`.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the expected value of $g(X)$ as an integral, and say why it is an average.',
              answerOutline: '$\\int g(x) f(x)\\,dx$. It is a sum of values weighted by the probability $f(x)\\,dx$ of each slice.',
            },
            {
              question: 'How do a shift and a scale change the mean and variance?',
              answerOutline: 'The mean becomes $a\\mu + b$. The variance becomes $a^2 \\sigma^2$, and the shift has no effect.',
            },
            {
              question: 'Is $E[X^2]$ equal to $(E[X])^2$?',
              answerOutline: 'No. The difference is the variance, which is non-negative. This is a case of Jensen\'s inequality.',
            },
            {
              question: 'What can go wrong with a sample mean when $\\alpha \\le 1$ in a Pareto tail?',
              answerOutline: 'The expected value is infinite, so the running average does not converge and is dominated by the largest draws.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/random-variables-and-expectation'],
        },
        {
          slug: 'numerical-integration',
          title: 'Numerical integration',
          summary:
            'When no antiderivative exists: midpoint, trapezoid and Simpson rules, how their errors shrink, and when Monte Carlo is the better tool.',
          estimatedMinutes: 110,
          objectives: [
            'Implement the midpoint, trapezoid and Simpson rules',
            'State the order of accuracy of each rule and measure it',
            'Compute a normal probability numerically',
            'Explain when Monte Carlo beats a grid',
            'Say which rule fits irregularly spaced data',
          ],
          concepts: [
            'Midpoint rule',
            'Trapezoid rule',
            'Simpson\'s rule',
            'Order of accuracy',
            'Monte Carlo integration',
            'Curse of dimensionality',
            'Library integrators',
          ],
          explanation: `Most integrals you meet in practice have no formula. Fortunately, a definite integral is a number, and you can compute it from samples of the function.

**The three rules.** With $n$ pieces of width $h = (b - a)/n$:

- **Midpoint**: $M_n = h \\sum_i f(x_i + h/2)$. Each rectangle's height comes from the centre of its piece.
- **Trapezoid**: $T_n = \\frac{h}{2} (f_0 + 2f_1 + \\dots + 2f_{n-1} + f_n)$.
- **Simpson** ($n$ even): $S_n = \\frac{h}{3} (f_0 + 4f_1 + 2f_2 + 4f_3 + \\dots + 4f_{n-1} + f_n)$. It fits a parabola through each pair of pieces.

**How accurate are they?** For a smooth function, the error of the midpoint and trapezoid rules falls like $h^2$. Doubling $n$ divides the error by 4. Simpson's error falls like $h^4$, so doubling $n$ divides it by 16. Midpoint is about twice as accurate as trapezoid, with the opposite sign, and Simpson is in effect a weighted average, $S_{2n} = (2M_n + T_n)/3$, that cancels the leading error.

**Measured on real numbers.** For $\\int_0^1 e^{-x^2}\\,dx = 0.746824\\ldots$ with $n = 10$:

| Rule | Value | Error |
|---|---|---|
| Midpoint | 0.747131 | $3.1 \\times 10^{-4}$ |
| Trapezoid | 0.746211 | $-6.1 \\times 10^{-4}$ |
| Simpson | 0.746825 | $8.2 \\times 10^{-7}$ |

At $n = 20$ those errors become $7.7 \\times 10^{-5}$, $-1.5 \\times 10^{-4}$ and $5.1 \\times 10^{-8}$, which matches the predicted ratios.

**A normal probability.** Simpson's rule with $n = 20$ on the standard normal density gives $\\Phi(1.96) \\approx 0.97500$, the familiar 95% interval value, from a few lines of code.

**Data.** A function you can call is different from a table of readings. With uneven times, or noise, use the trapezoid rule. Simpson's rule needs an even grid, and its high order assumes smoothness that noisy data do not have.

**Monte Carlo.** Since $\\int_0^1 f(x)\\,dx = E[f(U)]$ for a uniform $U$, you can average $f$ at random points. Its error falls like $1/\\sqrt{n}$, which is slow in one dimension. A grid in $d$ dimensions needs $n^d$ points, however, while Monte Carlo's rate does not depend on $d$. That is why high-dimensional integrals in statistics use it.

In practice, call a library such as SciPy's \`quad\`. Write these rules once yourself so that you know what it does, and when not to trust it.`,
          resources: [
            { title: 'OpenStax Calculus Volume 2, 3.6 Numerical Integration', url: 'https://openstax.org/books/calculus-volume-2/pages/3-6-numerical-integration', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'The three rules, with error bounds and worked examples.', primary: true },
            { title: 'SciPy: Integration', url: 'https://docs.scipy.org/doc/scipy/tutorial/integrate.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'How library integrators are used, including `quad` and sampled data.' },
          ],
          exercises: [
            {
              slug: 'three-rules',
              title: 'Implement and measure three rules',
              prompt:
                'In Python, write `midpoint(f, a, b, n)`, `trapezoid(f, a, b, n)` and `simpson(f, a, b, n)`. Test them on $\\int_0^1 e^{-x^2}\\,dx$ at $n = 4, 10, 20, 40$ and print the errors, using 0.746824132812427 as the true value. Compute the ratio of consecutive errors from $n = 10$ to 20 and from 20 to 40. Expected: at $n = 4$ the errors are about $1.9 \\times 10^{-3}$, $-3.8 \\times 10^{-3}$ and $3.1 \\times 10^{-5}$. The ratios are about 4 for the first two rules and about 16 for Simpson.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Written without NumPy, a rule is just a `for` loop. Use `math.exp`.',
            },
            {
              slug: 'normal-probabilities',
              title: 'Normal probabilities from scratch',
              prompt:
                'Use your Simpson rule with $n = 100$ on the standard normal density to compute $\\Phi(1.96)$ and the probabilities within 1, 2 and 3 standard deviations of the mean. Then find $z$ with $\\Phi(z) = 0.975$ using bisection on your function. Expected: 0.97500, 0.68269, 0.95450, 0.99730 and $z \\approx 1.96$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Because the density is symmetric, $\\Phi(z) = 0.5 + \\int_0^z$ the density.',
            },
            {
              slug: 'monte-carlo-versus-grid',
              title: 'Monte Carlo against a grid',
              prompt:
                'Estimate $\\int_0^1 e^{-x^2}\\,dx$ by averaging $f$ at $n$ uniform random points, for $n = 10^2, 10^4, 10^6$, with a seed. Report each estimate with the standard error $s/\\sqrt{n}$. How does the error scale? Now work out how many function evaluations a grid with 10 points per axis would need in 2, 6 and 20 dimensions. Say when you would pick Monte Carlo. Expected: the standard errors are about 0.02, 0.002 and 0.0002.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'If you double $n$, what happens to the error of each rule on a smooth function?',
              answerOutline: 'Midpoint and trapezoid fall by a factor of 4, Simpson by 16.',
            },
            {
              question: 'Which rule would you use for readings taken at uneven times, and why?',
              answerOutline: 'Trapezoid, because it works piece by piece with any spacing and does not assume extra smoothness.',
            },
            {
              question: 'Why does Monte Carlo win in high dimensions despite a slow rate?',
              answerOutline: 'Grids need a number of points exponential in the dimension, while the Monte Carlo rate does not depend on the dimension.',
            },
          ],
          relatedLessons: ['computational-physics/numerical-calculus-and-linear-algebra/numerical-integration'],
        },
      ],
    },
    {
      slug: 'towards-many-variables',
      title: 'Towards Many Variables',
      description:
        'The step beyond a first course that every modeling course needs: Taylor approximation, partial derivatives, the gradient, gradient descent, and the chain rule through a network.',
      lessons: [
        {
          slug: 'taylor-approximation',
          title: 'Taylor approximation',
          summary:
            'Approximating a function with polynomials, the error of doing so, and three data science uses: log returns, the delta method and curvature near a minimum.',
          estimatedMinutes: 120,
          objectives: [
            'Build a Taylor polynomial of a given degree at a point',
            'State the standard expansions of $e^x$, $\\ln(1 + x)$, $\\sin x$ and $1/(1 - x)$',
            'Estimate the error from the next term',
            'Use the delta method to approximate the spread of a function of a random quantity',
            'Explain why a quadratic describes any smooth minimum',
          ],
          concepts: [
            'Taylor polynomial',
            'Maclaurin series',
            'Remainder and order of the error',
            'Radius of convergence',
            'Log returns',
            'Delta method',
            'Quadratic near a minimum',
          ],
          explanation: `A tangent line matches a function's value and slope at a point. A parabola can also match its curvature. Continuing that idea gives the **Taylor polynomial** of degree $n$ at $a$:

$$T_n(x) = f(a) + f'(a)(x - a) + \\frac{f''(a)}{2!}(x - a)^2 + \\dots + \\frac{f^{(n)}(a)}{n!}(x - a)^n.$$

The factorials appear because differentiating $(x - a)^n$ exactly $n$ times gives $n!$.

**Standard expansions** at $a = 0$:

$$e^x \\approx 1 + x + \\frac{x^2}{2} + \\frac{x^3}{6}, \\qquad \\ln(1 + x) \\approx x - \\frac{x^2}{2} + \\frac{x^3}{3},$$

$$\\sin x \\approx x - \\frac{x^3}{6}, \\qquad \\frac{1}{1 - x} \\approx 1 + x + x^2 + x^3.$$

**Error.** For small $x - a$, the error is about the size of the first omitted term. The degree 2 polynomial for $e^x$ has an error near $x^3/6$. Some series work only near $a$: $\\ln(1 + x)$ and $1/(1 - x)$ converge only for $|x| < 1$, so a Taylor polynomial can be excellent locally and useless far away.

**Three uses in data science.**

1. *Log returns.* For a small change, $\\ln(1 + r) \\approx r$. A 2% change has log change 0.0198. That is why differences of logs read as percentages, and why it stops working for large changes: a 50% rise has log change 0.405.

2. *The delta method.* If $X$ has mean $\\mu$ and small standard deviation $\\sigma$, then a first-order expansion gives

$$\\text{Var}(g(X)) \\approx g'(\\mu)^2 \\sigma^2.$$

Linearising $g$ turns it into a scale factor. If $X$ has mean 100 and standard deviation 5, then $\\ln X$ has a standard deviation close to $5/100 = 0.05$. This is how uncertainty passes through a formula.

3. *Near a minimum.* At a minimum $\\theta^*$, the first derivative vanishes, so

$$L(\\theta) \\approx L(\\theta^*) + \\frac12 L''(\\theta^*)(\\theta - \\theta^*)^2.$$

Every smooth loss looks like a parabola close to its minimum. This one fact explains how fast gradient descent converges and which step sizes are safe, and in statistics the curvature measures how precisely the data pin down a parameter: a sharp minimum means a small standard error.

Read the OpenStax section, then plot $T_1$, $T_2$ and $T_3$ against each function in Desmos.`,
          resources: [
            { title: 'OpenStax Calculus Volume 2, 6.3 Taylor and Maclaurin Series', url: 'https://openstax.org/books/calculus-volume-2/pages/6-3-taylor-and-maclaurin-series', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Taylor polynomials, the remainder, and series for standard functions.', primary: true },
            { title: 'Essence of Calculus', url: 'https://www.3blue1brown.com/topics/calculus', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapter on Taylor series builds the polynomials from matching derivatives.' },
          ],
          exercises: [
            {
              slug: 'taylor-by-hand',
              title: 'Taylor polynomials by hand',
              prompt:
                'Derive the degree 3 polynomials of $\\ln(1 + x)$ and $\\sqrt{1 + x}$ at 0. Use them to estimate $\\ln 1.1$ and $\\sqrt{1.1}$, and compare with exact values. Then estimate $e^{0.5}$ using degree 3. Expected: 0.09533 against 0.09531, 1.048813 against 1.048809, and 1.64583 against 1.64872.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'delta-method',
              title: 'The delta method',
              prompt:
                'Let $X$ have mean 100 and standard deviation 5. (a) Use the delta method for the standard deviations of $\\ln X$, $\\sqrt{X}$ and $X^2$. (b) In Python, simulate $10^6$ normal draws and compare. (c) Repeat with a standard deviation of 40, and explain why the approximation for $\\ln X$ now breaks down. Expected for (a): 0.05, 0.25 and 1,000.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'With a standard deviation of 40, drop any non-positive draws and note how many there were.',
            },
            {
              slug: 'quadratic-near-minimum',
              title: 'The parabola at a minimum',
              prompt:
                'For $L(\\theta) = \\cosh\\theta - \\theta$, where $\\cosh\\theta = (e^\\theta + e^{-\\theta})/2$, find the minimum $\\theta^*$ using Newton\'s method, then compute $L\'\'(\\theta^*)$. Write the quadratic model, and compare it with $L$ at $\\theta^* \\pm 0.1$ and $\\theta^* \\pm 1$. Expected: $\\theta^* \\approx 0.8814$ and $L\'\'(\\theta^*) = \\sqrt{2} \\approx 1.414$. The model is excellent at $\\pm 0.1$ and noticeably off at $\\pm 1$.',
              kind: 'problem',
              difficulty: 3,
              hint: '$\\frac{d}{d\\theta}\\cosh\\theta = \\sinh\\theta = (e^\\theta - e^{-\\theta})/2$, and the derivative of $\\sinh$ is $\\cosh$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the degree 2 Taylor polynomial match that the tangent line does not?',
              answerOutline: 'The second derivative, which is the curvature of the function at the point.',
            },
            {
              question: 'How large is the error of a Taylor polynomial close to the expansion point?',
              answerOutline: 'About the size of the first omitted term, so it shrinks with the next power of $x - a$.',
            },
            {
              question: 'State the delta method, and say when it fails.',
              answerOutline: '$\\text{Var}(g(X)) \\approx g\'(\\mu)^2 \\sigma^2$. It fails when $\\sigma$ is large compared to the range over which $g$ is close to linear.',
            },
            {
              question: 'Why does every smooth loss look quadratic near a minimum?',
              answerOutline: 'The first derivative is zero there, so the leading term of the Taylor expansion after the constant is the quadratic one.',
            },
          ],
          relatedLessons: ['math-methods/single-variable-calculus/taylor-series'],
        },
        {
          slug: 'partial-derivatives',
          title: 'Partial derivatives',
          summary:
            'Functions of several variables, differentiating one variable at a time, and deriving the formula for the best-fit line by setting two partial derivatives to zero.',
          estimatedMinutes: 120,
          objectives: [
            'Evaluate and visualise a function of two variables',
            'Compute first and second partial derivatives',
            'Interpret a partial derivative with other inputs held fixed',
            'Write the linear approximation of a function of two variables',
            'Derive the least squares line from partial derivatives',
          ],
          concepts: [
            'Function of several variables',
            'Level curves',
            'Partial derivative',
            'Holding other variables fixed',
            'Second and mixed partials',
            'Tangent plane',
            'Normal equations',
          ],
          explanation: `A model usually has more than one parameter. A line has a slope $m$ and an intercept $b$, so its loss $L(m, b)$ is a surface above a plane. You can picture it as a landscape, or as a map of **level curves**, each joining points of equal height.

**Partial derivatives.** $\\frac{\\partial f}{\\partial x}$ is the rate of change of $f$ as $x$ moves and all other variables stay fixed. To compute it, treat the others as constants:

$$f(x, y) = x^2 y + e^{xy}, \\quad \\frac{\\partial f}{\\partial x} = 2xy + y e^{xy}, \\quad \\frac{\\partial f}{\\partial y} = x^2 + x e^{xy}.$$

Every rule from Module 2 still applies. Geometrically, you slice the surface along one axis and take the slope of the curve in that slice.

**Holding others fixed.** This is the same idea as "controlling for" a variable in a regression. A coefficient says how the prediction moves with one feature while the others stay fixed. It is a claim about the model, not a claim that the world would respond that way if you intervened.

**Second partials.** $f_{xx}$ measures curvature along $x$, and the mixed partial $f_{xy}$ measures how the slope in $x$ changes as $y$ moves. For smooth functions, $f_{xy} = f_{yx}$.

**Linear approximation.** Near $(a, b)$, a surface is close to its tangent plane:

$$f(x, y) \\approx f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b).$$

**The best line.** For points $(x_i, y_i)$, let

$$L(m, b) = \\sum_i (y_i - m x_i - b)^2.$$

The chain rule gives

$$\\frac{\\partial L}{\\partial m} = -2 \\sum_i x_i (y_i - m x_i - b), \\qquad \\frac{\\partial L}{\\partial b} = -2 \\sum_i (y_i - m x_i - b).$$

At a minimum both are zero. The second equation says the residuals sum to zero, so the line passes through $(\\bar{x}, \\bar{y})$. Solving the pair, the **normal equations**, gives

$$m = \\frac{\\sum_i (x_i - \\bar{x})(y_i - \\bar{y})}{\\sum_i (x_i - \\bar{x})^2}, \\qquad b = \\bar{y} - m \\bar{x}.$$

For $(1, 2)$, $(2, 3)$ and $(3, 5)$, that gives $m = 1.5$ and $b = 1/3$. Any statistics package does exactly this, and Linear Algebra for Data Science treats it in matrix form.

Practise with OpenStax 4.3. Sketch a slice of the function each time to keep the meaning attached to the symbols.`,
          resources: [
            { title: 'OpenStax Calculus Volume 3, 4.3 Partial Derivatives', url: 'https://openstax.org/books/calculus-volume-3/pages/4-3-partial-derivatives', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Definitions, computation and higher-order partials. Section 4.1 covers functions of several variables.', primary: true },
            { title: 'MIT 18.02SC Multivariable Calculus', url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Unit 2 covers partial derivatives, with a session on least squares.' },
          ],
          exercises: [
            {
              slug: 'partials-drill',
              title: 'Partial derivatives drill',
              prompt:
                'Find $f_x$, $f_y$, $f_{xx}$ and $f_{xy}$ for (a) $x^3 y^2 + 4y$, (b) $e^{2x + 3y}$, (c) $\\ln(x^2 + y^2)$, (d) $x \\sin(xy)$. Confirm $f_{xy} = f_{yx}$ for (a). Evaluate $f_x$ of (b) at $(0, 0)$ and check it with a central difference. Expected: 2.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'derive-the-line',
              title: 'Derive the best-fit line',
              prompt:
                'Derive the normal equations for $L(m, b)$. Solve them for the points $(1, 2)$, $(2, 3)$ and $(3, 5)$, then compute the residuals and confirm they sum to 0 and that their weighted sum $\\sum_i x_i r_i$ is 0. Say why those two facts are the normal equations in disguise. Expected: $m = 1.5$, $b = 1/3$, residuals $1/6$, $-1/3$, $1/6$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'loss-surface',
              title: 'Look at a loss surface',
              prompt:
                'Download the `cars` data, where the columns are `speed` and `dist`. Compute $m$ and $b$ from the formula. Then in Python, evaluate $L(m, b)$ on a grid around the minimum and draw level curves with `matplotlib.pyplot.contour`. Describe the shape of the valley. Does changing $m$ with $b$ fixed have more effect than changing $b$ with $m$ fixed? Redo the plot after subtracting $\\bar{x}$ from speed, and describe what changes. Expected: 50 rows, $m \\approx 3.932$ and $b \\approx -17.58$. The first surface is a long tilted valley. After centring, the valley lines up with the axes.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you compute $\\partial f / \\partial x$?',
              answerOutline: 'Differentiate with respect to $x$ and treat the other variables as constants.',
            },
            {
              question: 'What does a regression coefficient have in common with a partial derivative?',
              answerOutline: 'It gives the change in the prediction per unit of one input, with the others held fixed. That describes the model, not necessarily a causal effect.',
            },
            {
              question: 'What does setting $\\partial L / \\partial b = 0$ say about residuals?',
              answerOutline: 'They sum to zero, so the fitted line passes through the point of means.',
            },
          ],
          relatedLessons: [
            'math-methods/multivariable-calculus/partial-derivatives-and-gradient',
            'probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares',
          ],
        },
        {
          slug: 'the-gradient',
          title: 'The gradient',
          summary:
            'Collecting partial derivatives into a vector that points uphill, directional derivatives, level curves, and how to classify critical points.',
          estimatedMinutes: 110,
          objectives: [
            'Compute a gradient and evaluate it at a point',
            'Compute a directional derivative as a dot product',
            'Show that the gradient gives the direction of steepest ascent',
            'Explain why the gradient is perpendicular to level curves',
            'Classify a critical point with the second derivative test',
          ],
          concepts: [
            'Gradient vector',
            'Dot product',
            'Directional derivative',
            'Steepest ascent',
            'Perpendicular to level curves',
            'Critical point in two variables',
            'Saddle point',
            'Hessian matrix',
          ],
          explanation: `The **gradient** of $f$ collects all its partial derivatives into one vector:

$$\\nabla f = \\Big(\\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_n}\\Big).$$

For $f(x, y) = x^2 + 3y^2$, $\\nabla f = (2x, 6y)$, so at $(1, 1)$ it is $(2, 6)$.

**A quick note on vectors.** You need just one operation here. The **dot product** of $a$ and $b$ is $a \\cdot b = \\sum_i a_i b_i$, and it equals $|a||b|\\cos\\theta$, where $\\theta$ is the angle between them.

**Directional derivatives.** A partial derivative measures change along an axis. For a unit vector $u$ in any direction, the first-order approximation gives

$$D_u f = \\nabla f \\cdot u.$$

At $(1, 1)$, moving along $u = (1, 0)$ changes $f$ at a rate of 2, and along $u = (0, 1)$ at a rate of 6.

**Steepest ascent.** Since $\\nabla f \\cdot u = |\\nabla f| \\cos\\theta$, the rate is largest when $u$ points along $\\nabla f$, with value $|\\nabla f|$. So the gradient points in the direction of fastest increase, and its length is that rate. It points away from low values, and $-\\nabla f$ is the direction of fastest decrease. Gradient descent is built on this one fact. At $(1, 1)$ the steepest rate is $\\sqrt{40} \\approx 6.32$, in the direction $(1, 3)/\\sqrt{10}$.

**Perpendicular to level curves.** Along a level curve $f$ does not change, so the directional derivative along it is zero. That means the gradient is perpendicular to the level curves. On a map, it points straight across the contour lines.

**Critical points.** A point with $\\nabla f = 0$ is a candidate. In two variables, there is a new possibility besides a maximum and a minimum: a **saddle**, curving up one way and down another. $x^2 - y^2$ has one at the origin.

The **Hessian** collects the second partials. With $D = f_{xx} f_{yy} - f_{xy}^2$ at a critical point:

- $D > 0$ and $f_{xx} > 0$: a minimum
- $D > 0$ and $f_{xx} < 0$: a maximum
- $D < 0$: a saddle
- $D = 0$: the test says nothing

In high dimensions saddles become far more common, because a minimum needs every direction to curve upwards at once.

Do the OpenStax section, and draw level curves with gradient arrows for at least one function by hand.`,
          resources: [
            { title: 'OpenStax Calculus Volume 3, 4.6 Directional Derivatives and the Gradient', url: 'https://openstax.org/books/calculus-volume-3/pages/4-6-directional-derivatives-and-the-gradient', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'Directional derivatives and the gradient. Section 4.7 covers classifying critical points.', primary: true },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 5 on vector calculus uses this notation for gradients of models.' },
          ],
          exercises: [
            {
              slug: 'gradient-by-hand',
              title: 'Gradients and directions',
              prompt:
                'For $f(x, y) = x^2 + 3y^2$ at $(1, 1)$: find $\\nabla f$, the directional derivative along $(1, 1)/\\sqrt{2}$, the direction of steepest descent and its rate, and a direction along which $f$ does not change at first order. Expected: a rate of $8/\\sqrt{2} \\approx 5.66$, a steepest descent direction of $-(1, 3)/\\sqrt{10}$, rate $-6.32$, and a no-change direction such as $(3, -1)/\\sqrt{10}$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'classify-critical-points',
              title: 'Classify critical points',
              prompt:
                'Find and classify every critical point of (a) $f = x^2 + xy + y^2 - 3x$, (b) $g = x^3 - 3x + y^2$, (c) $h = x^2 - y^2$. Expected: (a) a minimum at $(2, -1)$, (b) a minimum at $(1, 0)$ and a saddle at $(-1, 0)$, (c) a saddle at the origin.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'quiver-plot',
              title: 'Draw a gradient field',
              prompt:
                'In Python, draw level curves of $f(x, y) = x^2 + 3y^2$ using `matplotlib.pyplot.contour`, and overlay arrows of $-\\nabla f$ with `quiver` on a coarse grid. Set equal axes. Confirm by eye that the arrows cross the level curves at right angles, and note that they do not point at the minimum, except on the axes. Explain why this matters for an algorithm that follows the arrows.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two things does the gradient tell you?',
              answerOutline: 'The direction of fastest increase, and, through its length, the rate of increase in that direction.',
            },
            {
              question: 'Why is the gradient perpendicular to a level curve?',
              answerOutline: 'Along the curve $f$ does not change, so the dot product of the gradient with the tangent direction is zero.',
            },
            {
              question: 'What is a saddle point?',
              answerOutline: 'A critical point that curves up in one direction and down in another, so it is neither a maximum nor a minimum.',
            },
          ],
          relatedLessons: ['math-methods/multivariable-calculus/partial-derivatives-and-gradient'],
        },
        {
          slug: 'gradient-descent',
          title: 'Gradient descent',
          summary:
            'Walking downhill to fit a model: the update rule, why step size matters, why scaling features helps, and how mini-batches make it work at scale.',
          estimatedMinutes: 140,
          objectives: [
            'Write the gradient descent update and run it by hand on a quadratic',
            'Derive the stable range of step sizes from the curvature',
            'Explain why badly scaled features slow descent',
            'Fit a line to real data by gradient descent',
            'Explain why mini-batches are used, and verify a gradient numerically',
          ],
          concepts: [
            'Update rule',
            'Learning rate',
            'Stability condition $\\eta < 2/L$',
            'Conditioning',
            'Feature scaling',
            'Backtracking',
            'Stochastic and mini-batch gradients',
            'Gradient check',
          ],
          explanation: `To minimise a loss $L(\\theta)$, start somewhere and repeatedly step against the gradient:

$$\\theta_{t+1} = \\theta_t - \\eta \\nabla L(\\theta_t).$$

The **learning rate** $\\eta$ sets the step size. Each step uses only local slope, so it scales to millions of parameters, where Newton's method would need a matrix far too big to store.

**Analysis on a quadratic.** Near a minimum, a loss is quadratic, so study $L(x) = \\frac{a}{2} x^2$. The gradient is $ax$, so

$$x_{t+1} = (1 - \\eta a) x_t.$$

This shrinks only if $|1 - \\eta a| < 1$, which means $0 < \\eta < 2/a$. If $\\eta < 1/a$, $x$ approaches 0 steadily. Between $1/a$ and $2/a$ it overshoots and oscillates, while still shrinking. Above $2/a$ it diverges. A curvature of 2 means a step size above 1 explodes.

**Two dimensions.** For $L = \\frac12 (x^2 + 100 y^2)$, the steep direction forces $\\eta < 2/100$, but then $x$ shrinks by only 2% per step at best. At $\\eta = 0.019$, reducing $x$ by a factor of 1000 takes about 360 steps, and $y$ bounces from side to side the whole way. The ratio of largest to smallest curvature is the **condition number**, and it sets the speed of gradient descent. Poor conditioning is the main reason training is slow.

**Scaling features.** Features with large or uncentred values create exactly this. Fitting $\\text{dist} = m\\,\\text{speed} + b$ to the \`cars\` data by raw gradient descent, the largest stable $\\eta$ is about 0.0038, and the condition number is about 2,570. With $\\eta = 0.001$, even 20,000 steps leave $m$ at 3.916, short of the true 3.932. Standardise speed instead, and $\\eta = 0.1$ reaches the exact answer in 200 steps.

**Choosing $\\eta$.** Plot the loss against steps. If it rises or oscillates, reduce $\\eta$. A **backtracking** rule halves the step until the loss falls by enough.

**Mini-batches.** When the loss is a sum over a million examples, computing the full gradient for one step is wasteful. **Stochastic** gradient descent uses a small random batch. The estimate is noisy but correct on average, and it gives many more updates for the same work.

**Check your gradient.** Compare each component with $(L(\\theta + \\epsilon e_i) - L(\\theta - \\epsilon e_i))/2\\epsilon$. Disagreement means a bug in the derivative.

Code it yourself on the \`cars\` data, and then read how the machine learning course builds on this.`,
          resources: [
            { title: 'CS231n: Optimization', url: 'https://cs231n.github.io/optimization-1/', type: 'article', cost: 'free', provider: 'Stanford', note: 'Numerical and analytic gradients, gradient checks and mini-batches, in a clear applied style.', primary: true },
            { title: 'Why Momentum Really Works', url: 'https://distill.pub/2017/momentum/', type: 'article', cost: 'free', provider: 'Distill', note: 'Interactive plots of the quadratic analysis. Read up to where it introduces eigenvectors, then return after linear algebra.' },
            { title: 'Speed and stopping distance of cars (cars)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/cars.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'The 50-row data set used in the lesson and the exercises.' },
          ],
          exercises: [
            {
              slug: 'step-size-regimes',
              title: 'Step size regimes',
              prompt:
                'For $L(x) = x^2$, starting from $x_0 = 1$, run 10 steps of gradient descent by hand or in code for $\\eta = 0.1, 0.5, 0.9, 1.1$. Describe each behaviour. Derive the stability bound for $L(x) = \\frac{a}{2} x^2$, and say which $\\eta$ reaches the minimum in one step. Expected: smooth decay, an exact hit at 0.5, oscillating decay, then divergence. For $L = x^2$, the bound is $\\eta < 1$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gd-on-real-data',
              title: 'Fit a line to real data',
              prompt:
                'Using `cars`, fit $\\text{dist} = m\\,\\text{speed} + b$ under mean squared error. (a) Derive the gradient. (b) Check it with central differences at $(m, b) = (0, 0)$. (c) Run raw gradient descent with $\\eta = 0.001$ for 20,000 steps, then try $\\eta = 0.005$. (d) Standardise speed, run with $\\eta = 0.1$ for 200 steps, then convert $m$ and $b$ back to the original units. Compare against the formula, and state what the slope does and does not tell you about stopping. Expected: raw gives $(3.916, -17.29)$, $\\eta = 0.005$ diverges, and standardised gives $(3.9324, -17.579)$, equal to the exact answer.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'ill-conditioned-valley',
              title: 'An ill-conditioned valley',
              prompt:
                'Run gradient descent on $L = \\frac12 (x^2 + c y^2)$ from $(1, 1)$, for $c = 1, 10, 100$, using $\\eta = 1.5/c$. Count the steps until $|x|$ and $|y|$ are both below $10^{-3}$. Plot the path for $c = 100$. Explain the result using the condition number. Expected: 10, 43 and 458 steps for $c = 1, 10, 100$, so for large $c$ the count grows in proportion to $c$.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the gradient descent update, and explain why it uses a minus sign.',
              answerOutline: '$\\theta \\leftarrow \\theta - \\eta \\nabla L$. The gradient points uphill, so its negative is the steepest way down.',
            },
            {
              question: 'What limits the learning rate on a quadratic?',
              answerOutline: 'The largest curvature $a$. Stability needs $\\eta < 2/a$.',
            },
            {
              question: 'Why does feature scaling speed up gradient descent?',
              answerOutline: 'It makes curvatures similar, which lowers the condition number and allows a larger stable step.',
            },
            {
              question: 'Why use mini-batches?',
              answerOutline: 'A small random batch gives a noisy but unbiased gradient at a fraction of the cost, so you get far more steps for the same work.',
            },
          ],
          relatedLessons: ['machine-learning/optimization-and-generalization-theory/gradient-descent-and-sgd'],
        },
        {
          slug: 'chain-rule-and-backpropagation',
          title: 'The chain rule behind backpropagation',
          summary:
            'The multivariable chain rule on a computation graph, a forward and a backward pass by hand, and why reverse mode makes training a neural network possible.',
          estimatedMinutes: 140,
          objectives: [
            'State the multivariable chain rule',
            'Draw a computation graph for a small model',
            'Compute a loss with a forward pass and a gradient with a backward pass by hand',
            'Explain why reverse mode is efficient for many parameters',
            'Verify a backpropagated gradient with finite differences',
          ],
          concepts: [
            'Multivariable chain rule',
            'Computation graph',
            'Forward pass',
            'Backward pass',
            'Reverse-mode differentiation',
            'Reuse of intermediate values',
            'Vanishing gradients',
          ],
          explanation: `If a quantity depends on $t$ through several paths, add the contribution of each path. For $z = f(x(t), y(t))$,

$$\\frac{dz}{dt} = \\frac{\\partial f}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial f}{\\partial y} \\frac{dy}{dt}.$$

This is the **multivariable chain rule**: multiply along each path, then add over paths. Neural networks are just long chains of small steps, so this one rule is how they are trained.

**A computation graph** writes a formula as a sequence of simple steps. Take a tiny network with input $x$, target $y$ and two weights:

$$h = w_1 x, \\quad a = \\sigma(h), \\quad \\hat{y} = w_2 a, \\quad r = \\hat{y} - y, \\quad L = r^2.$$

**Forward pass.** With $x = 2$, $y = 1$, $w_1 = 0.5$ and $w_2 = 1.5$, compute each value in order and keep them:

$$h = 1, \\quad a = 0.7311, \\quad \\hat{y} = 1.0966, \\quad r = 0.0966, \\quad L = 0.00933.$$

**Backward pass.** Start from $L$ and walk back, multiplying by each local derivative:

$$\\frac{\\partial L}{\\partial \\hat{y}} = 2r = 0.1932,$$

$$\\frac{\\partial L}{\\partial w_2} = 0.1932 \\cdot a = 0.1412,$$

$$\\frac{\\partial L}{\\partial a} = 0.1932 \\cdot w_2 = 0.2898,$$

$$\\frac{\\partial L}{\\partial h} = 0.2898 \\cdot a(1 - a) = 0.0570,$$

$$\\frac{\\partial L}{\\partial w_1} = 0.0570 \\cdot x = 0.1139.$$

Every step reuses the result of the one before. That reuse is **backpropagation**, and it is the chain rule with a good order of operations.

**Why backwards?** You could also go forwards, carrying $\\partial(\\cdot)/\\partial w_1$ through the graph. But that needs one full pass per parameter. Going backwards starts from the single output and gets all the gradients in one pass, at roughly the cost of one forward pass. With millions of weights and one loss, that difference is what makes training practical. Libraries such as PyTorch record the graph as you compute, then run this backward pass for you.

**Two practical points.** Backpropagation is only as right as its local derivatives, so verify it with the central difference check from the last lesson. And long chains multiply many factors. If each is well below 1, as $a(1 - a) \\le 0.25$ is, the gradient shrinks exponentially with depth. This is the **vanishing gradient** problem, and it is why the ReLU activation and careful initialisation exist.

Do the exercises by hand first. Then read the backpropagation notes below and watch the 3Blue1Brown video.`,
          resources: [
            { title: 'CS231n: Backpropagation', url: 'https://cs231n.github.io/optimization-2/', type: 'article', cost: 'free', provider: 'Stanford', note: 'Computation graphs and backward passes, worked in the same step-by-step way.', primary: true },
            { title: 'Neural Networks', url: 'https://www.3blue1brown.com/topics/neural-networks', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapters on backpropagation and its calculus.' },
            { title: 'OpenStax Calculus Volume 3, 4.5 The Chain Rule', url: 'https://openstax.org/books/calculus-volume-3/pages/4-5-the-chain-rule', type: 'textbook', cost: 'free', provider: 'OpenStax', note: 'The multivariable chain rule with tree diagrams.' },
          ],
          exercises: [
            {
              slug: 'multivariable-chain',
              title: 'The multivariable chain rule',
              prompt:
                'If $z = x^2 y$, $x = \\cos t$ and $y = e^t$, find $dz/dt$ with the chain rule, then again by substituting first. Evaluate at $t = 0$. Expected: 1.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'backprop-by-hand',
              title: 'Backpropagate by hand',
              prompt:
                'For the network in the lesson, use $x = 1$, $y = 0$, $w_1 = 2$ and $w_2 = -1$. Write the forward and backward passes as tables, with one row per intermediate variable. Then write Python that computes $L$ and both gradients, and compare them with central differences using $\\epsilon = 10^{-6}$. Take one gradient step with $\\eta = 0.5$ and confirm that $L$ falls. Expected: $a \\approx 0.8808$, $L \\approx 0.7758$, $\\partial L/\\partial w_2 \\approx -1.5516$ and $\\partial L/\\partial w_1 \\approx 0.1850$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'vanishing-gradient',
              title: 'Watch a gradient vanish',
              prompt:
                'Consider a chain of $n$ logistic layers, $a_{k+1} = \\sigma(a_k)$, with $a_0 = 1$. Write a small program that computes $da_n / da_0$ as a product of local derivatives, for $n = 1, 2, 5, 10, 20$. Plot its log against $n$. Then replace $\\sigma$ with ReLU, $\\max(0, x)$, and repeat. Explain what you see. Expected: the logistic product falls roughly exponentially, while ReLU gives exactly 1 for positive inputs.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the multivariable chain rule in words.',
              answerOutline: 'Multiply the rates along each path from input to output, then add across paths.',
            },
            {
              question: 'What does the backward pass reuse?',
              answerOutline: 'The derivative of the loss with respect to each later variable, along with the values saved in the forward pass.',
            },
            {
              question: 'Why is reverse mode efficient when there are many parameters and one loss?',
              answerOutline: 'One backward pass gives every partial derivative. Forward mode would need a pass per parameter.',
            },
            {
              question: 'What causes vanishing gradients?',
              answerOutline: 'Multiplying many local derivatives smaller than 1 makes the product shrink exponentially with depth.',
            },
          ],
          relatedLessons: ['deep-learning/neural-network-foundations/backpropagation-and-autograd'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'calculus-data-notebook',
    title: 'A calculus notebook on real data',
    description:
      'Choose a real time series or sample and use calculus on it end to end: estimate a rate, integrate to a total, fit a one-parameter model by minimising a loss, and report what the fit does and does not show.',
    deliverables: [
      'A notebook or report with a hand derivation for each formula used',
      'A numerical check of each derivative and each integral',
      'A short written interpretation of the results and their limits',
    ],
    estimatedHours: 20,
  },
  masteryChecklist: [
    'I can compute limits and explain continuity, including what goes wrong at a kink or a jump',
    'I can differentiate any combination of powers, exponentials, logarithms and trig functions by hand',
    'I can find and justify a best value, and explain why the mean, the median and a quantile are each answers to a minimisation problem',
    'I can use and safeguard Newton\'s method',
    'I can evaluate integrals with the fundamental theorem, substitution and parts, and estimate the rest numerically',
    'I can move between a density and its cumulative distribution, and compute an expected value and a variance',
    'I can decide whether an improper integral converges and say what that means for a heavy-tailed quantity',
    'I can derive a gradient, check it numerically and use it in gradient descent with a sensible step size',
    'I can run backpropagation by hand on a small network',
    'I can apply calculus to real data and state what the result does and does not show',
  ],
});
