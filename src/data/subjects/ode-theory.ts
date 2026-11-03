import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const teschl = (note: string): ResourceInput => ({
  title: 'Ordinary Differential Equations and Dynamical Systems',
  url: 'https://www.mat.univie.ac.at/~gerald/ftp/book-ode/',
  type: 'textbook',
  cost: 'free',
  provider: 'Gerald Teschl',
  note,
  primary: true,
});

const mit18034 = (note: string): ResourceInput => ({
  title: 'MIT 18.034 Honors Differential Equations',
  url: 'https://ocw.mit.edu/courses/18-034-honors-differential-equations-spring-2009/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const mit18385 = (note: string): ResourceInput => ({
  title: 'MIT 18.385J Nonlinear Dynamics and Chaos',
  url: 'https://ocw.mit.edu/courses/18-385j-nonlinear-dynamics-and-chaos-fall-2014/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const strogatz = (note: string): ResourceInput => ({
  title: 'Nonlinear Dynamics and Chaos: Steven Strogatz, Cornell University',
  url: 'https://www.youtube.com/playlist?list=PLbN57C5Zdl6j_qJA-pARJnKsmROzPnO9V',
  type: 'lecture',
  cost: 'free',
  provider: 'Cornell University',
  note,
});

const basicAnalysis = (note: string): ResourceInput => ({
  title: 'Basic Analysis: Introduction to Real Analysis',
  url: 'https://www.jirka.org/ra/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jiří Lebl',
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

export default defineSubject({
  id: 'ode-theory',
  title: 'Differential Equations',
  category: 'math',
  tagline:
    'The rigorous theory of ordinary differential equations: existence, linear systems, stability, phase plane analysis and boundary value problems, with proofs.',
  description: `In a first course you solve differential equations. In this one you prove things about them, mostly for equations nobody can solve. Does a solution exist? Is there only one? How long does it last? Does a small change in the data produce a small change in the answer? What happens as time goes to infinity? These questions can be answered with theorems, and the proofs are short enough to learn and use.

This course follows the topics of MATH 441, Differential Equations, at the University of Illinois Urbana-Champaign, as described in its public catalog entry: a rigorous treatment of ordinary differential equations, including existence and uniqueness, linear systems, stability and boundary value problems. The lessons, examples and exercises here are original, and the course is not affiliated with or endorsed by the University of Illinois.

It assumes \`differential-equations\`, so you can already solve the standard equations, and \`higher-mathematics\`, so you can read and write proofs with epsilon arguments. Facts from analysis, such as uniform convergence and completeness of spaces of continuous functions, are stated when they are used. Facts from linear algebra, such as Jordan form, are quoted. Most exercises are proofs: write them out in full, then check each step against the hypotheses. A computation on the side, in SymPy or SciPy, is the best way to test what a theorem claims, but it is never a proof.

The course runs from the local question of existence, through the linear theory, to stability and the geometry of planar flows, and it ends with boundary value problems and Sturm-Liouville theory.`,
  difficulty: 'advanced',
  estimatedHours: 70,
  prerequisites: ['differential-equations', 'higher-mathematics'],
  recommendedBackground: [
    'Comfort with epsilon-delta proofs and with uniform convergence',
    'Linear algebra through eigenvalues and Jordan form (statement level)',
    'Multivariable calculus, including the mean value inequality and Green\'s theorem',
    'Basic Python with NumPy and SciPy, for testing claims numerically',
  ],
  tags: ['differential equations', 'proofs', 'dynamical systems', 'stability', 'Sturm-Liouville', 'analysis'],
  core: false,
  modules: [
    {
      slug: 'existence-and-uniqueness',
      title: 'Existence and Uniqueness',
      description:
        'Turn the initial value problem into a fixed-point problem, prove the Picard-Lindelöf theorem, and use Gronwall\'s inequality to control how solutions depend on their data and how long they exist.',
      lessons: [
        {
          slug: 'the-initial-value-problem',
          title: 'The initial value problem',
          summary:
            'State the problem precisely, convert it into an integral equation, and define the Lipschitz condition that decides uniqueness.',
          estimatedMinutes: 110,
          objectives: [
            'State what a solution of an initial value problem is, including its domain',
            'Prove the equivalence of the differential and the integral forms',
            'Prove that a continuously differentiable $f$ is locally Lipschitz in $x$',
            'Produce examples of non-uniqueness and of finite-time blow-up',
          ],
          concepts: [
            'Initial value problem in $\\mathbb{R}^n$',
            'Integral equation form',
            'Lipschitz condition in $x$',
            'Locally Lipschitz',
            'Mean value inequality',
            'Non-uniqueness',
            'Blow-up',
          ],
          explanation: `Let $D \\subset \\mathbb{R} \\times \\mathbb{R}^n$ be open and $f : D \\to \\mathbb{R}^n$ continuous. A **solution** of the initial value problem

$$x' = f(t, x), \\qquad x(t_0) = x_0, \\qquad (t_0, x_0) \\in D,$$

is a $C^1$ function $\\varphi$ on an interval $I$ containing $t_0$, with $(t, \\varphi(t)) \\in D$ for all $t \\in I$, $\\varphi' = f(t, \\varphi)$ on $I$, and $\\varphi(t_0) = x_0$. The interval is part of the solution. Higher-order equations are covered too, by adding derivatives as new unknowns.

**Lemma (integral form).** A continuous $\\varphi : I \\to \\mathbb{R}^n$ with graph in $D$ solves the problem if and only if

$$\\varphi(t) = x_0 + \\int_{t_0}^t f(s, \\varphi(s))\\,ds \\quad\\text{for all } t \\in I.$$

If $\\varphi$ solves the problem, integrate. Conversely, if $\\varphi$ is continuous and satisfies the equation, then $s \\mapsto f(s, \\varphi(s))$ is continuous, so the right side is $C^1$ by the fundamental theorem of calculus, and differentiating gives the equation. The integral form is better for analysis, since it asks only for continuity, and limits behave well under integrals.

Say $f$ is **Lipschitz in $x$** on $E \\subset D$ if there is an $L$ with $|f(t, x) - f(t, y)| \\leq L|x - y|$ for all $(t, x), (t, y) \\in E$. It is **locally Lipschitz** if every point of $D$ has a neighbourhood on which this holds. If $D_x f$ is continuous, $f$ is locally Lipschitz: on a closed cylinder with convex cross-sections, $|D_x f| \\leq L$ by compactness, and

$$f(t, x) - f(t, y) = \\int_0^1 D_x f(t, y + s(x - y))(x - y)\\,ds.$$

**Worked example.** Take the scalar equation $x' = 3x^{2/3}$ (real cube root, squared), with $x(0) = 0$. For $a \\geq 0$ define

$$x_a(t) = \\begin{cases} 0, & t \\leq a, \\\\ (t - a)^3, & t \\geq a. \\end{cases}$$

Each $x_a$ is $C^1$: the one-sided derivatives at $t = a$ are both 0, and $x_a' = 3(t - a)^2$ is continuous. For $t \\geq a$, $3x_a^{2/3} = 3(t - a)^2 = x_a'$. For $t < a$ both sides vanish. So there are infinitely many solutions through one point.

This $f$ is continuous, so continuity alone cannot give uniqueness. The Lipschitz condition fails at 0: $|f(x) - f(0)|/|x| = 3|x|^{-1/3} \\to \\infty$ as $x \\to 0$.

Smoothness does not give global existence either. $f(x) = x^2$ is $C^\\infty$, so it is locally Lipschitz, yet the solution of $x' = x^2$, $x(0) = 1$ is $x = 1/(1 - t)$, which exists only for $t < 1$. On $\\mathbb{R}$, $x^2$ is not Lipschitz, since its slope is unbounded. The rest of this module turns these two examples into theorems.`,
          resources: [
            teschl('The introductory chapter and the chapter on initial value problems.'),
            mit18034('The syllabus and lecture notes: the unit on existence and uniqueness.'),
            basicAnalysis('Use its treatment of uniform convergence and metric spaces as a reference.'),
          ],
          exercises: [
            {
              slug: 'prove-integral-form',
              title: 'Prove the integral form',
              prompt: `Write out a complete proof of the integral form lemma for $f$ continuous on an open set $D$. Point to exactly where continuity of $f$ is used. Then give an example of a function $f$, discontinuous in $t$, for which a continuous solution of the integral equation is not $C^1$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'c1-implies-lipschitz',
              title: 'Continuously differentiable implies locally Lipschitz',
              prompt: `Let $f$ and $D_x f$ be continuous on an open set $D$. Prove that every point of $D$ has a neighbourhood on which $f$ is Lipschitz in $x$. Where do you use convexity of the cross-sections? Show by example that a Lipschitz function need not be differentiable.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'lipschitz-constants',
              title: 'Find the constants',
              prompt: `Decide whether each function is Lipschitz on the set, and find the smallest constant when it is. (a) $\\sin x$ on $\\mathbb{R}$. (b) $x^2$ on $[-R, R]$. (c) $x^2$ on $\\mathbb{R}$. (d) $\\sqrt{|x|}$ on $[-1, 1]$. (e) $1/(1 + x^2)$ on $\\mathbb{R}$. (f) $|x|$ on $\\mathbb{R}$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'square-root-branches',
              title: 'Where non-uniqueness stops',
              prompt: `For $x' = 2\\sqrt{|x|}$, describe all solutions with $x(0) = 0$ on $\\mathbb{R}$. Then prove that the solution with $x(0) = 1$ is unique on an interval around $0$, even though $f$ is not Lipschitz on $\\mathbb{R}$. How far back in time does the uniqueness extend?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Local Lipschitz behaviour at the initial point is what matters. Follow the solution backward until it reaches $x = 0$.',
            },
            {
              slug: 'reduce-to-first-order',
              title: 'Reduction to first-order autonomous systems',
              prompt: `Show that $x^{(n)} = g(t, x, x', \\dots, x^{(n-1)})$ is equivalent to a first-order system, and that a non-autonomous system $x' = f(t, x)$ on $D$ is equivalent to an autonomous one on $D$ by adding $t$ as a state variable. Prove that if $g$ is locally Lipschitz in all its variables then the resulting vector field is locally Lipschitz.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the integral form easier to work with than the differential form?',
              answerOutline: 'It requires only continuity, and integrals pass to uniform limits, so a limit of approximate solutions is easy to control.',
            },
            {
              question: 'Give the definition of $f$ being Lipschitz in $x$ on a set.',
              answerOutline: 'There is a constant $L$ with $|f(t, x) - f(t, y)| \\leq L|x - y|$ for all pairs with the same $t$ in the set.',
            },
            {
              question: 'What do $x\' = 3x^{2/3}$ and $x\' = x^2$ each show?',
              answerOutline: 'The first shows that continuity does not give uniqueness. The second shows that smoothness does not give global existence.',
            },
          ],
        },
        {
          slug: 'picard-iteration',
          title: 'Picard iteration and local existence',
          summary:
            'Prove the Picard-Lindelöf theorem by iterating the integral equation, with an explicit interval of existence.',
          estimatedMinutes: 130,
          objectives: [
            'State the Picard-Lindelöf theorem with all its hypotheses',
            'Carry out the proof that the iterates converge uniformly',
            'Compute Picard iterates for simple equations',
            'Bound the error of the $k$th iterate',
            'Recast the proof using the contraction mapping theorem',
          ],
          concepts: [
            'Picard iterates',
            'Interval of existence $h = \\min(a, b/M)$',
            'Weierstrass M-test',
            'Uniform limit',
            'Contraction mapping theorem',
            'Weighted norm',
          ],
          explanation: `Define the operator $T$ on continuous functions by $(T\\varphi)(t) = x_0 + \\int_{t_0}^t f(s, \\varphi(s))\\,ds$. By the integral form lemma, solutions are the fixed points of $T$. **Picard iteration** starts from $\\varphi_0 \\equiv x_0$ and sets $\\varphi_{k+1} = T\\varphi_k$.

**Theorem (Picard-Lindelöf, existence).** Let $R = \\{(t, x) : |t - t_0| \\leq a,\\ |x - x_0| \\leq b\\}$ with $a, b > 0$. Suppose $f$ is continuous on $R$, $|f| \\leq M$ on $R$ with $M > 0$, and $f$ is Lipschitz in $x$ on $R$ with constant $L$. Put $h = \\min(a, b/M)$. Then the iterates converge uniformly on $J = [t_0 - h, t_0 + h]$ to a solution of the initial value problem on $J$.

*Proof.* **The iterates stay in $R$.** If $\\varphi_k$ is continuous with graph in $R$, then for $t \\in J$,

$$|\\varphi_{k+1}(t) - x_0| \\leq \\left|\\int_{t_0}^t M\\,ds\\right| = M|t - t_0| \\leq Mh \\leq b.$$

This is why $h$ involves $b/M$: the solution must not escape the box before time runs out.

**Successive differences.** We claim $|\\varphi_{k+1}(t) - \\varphi_k(t)| \\leq ML^k|t - t_0|^{k+1}/(k + 1)!$. For $k = 0$ this was just shown. If it holds for $k - 1$, then for $t \\geq t_0$, using the Lipschitz condition,

$$|\\varphi_{k+1}(t) - \\varphi_k(t)| \\leq L\\int_{t_0}^t|\\varphi_k(s) - \\varphi_{k-1}(s)|\\,ds \\leq L\\int_{t_0}^t\\frac{ML^{k-1}(s - t_0)^k}{k!}\\,ds,$$

which is the claimed bound. The case $t < t_0$ is the same.

**Convergence.** Since $\\sum_k ML^kh^{k+1}/(k + 1)! < \\infty$, the M-test shows that $\\varphi_k = \\varphi_0 + \\sum_{j<k}(\\varphi_{j+1} - \\varphi_j)$ converges uniformly on $J$ to a continuous $\\varphi$, with graph in $R$ since $R$ is closed.

**The limit solves it.** $|f(s, \\varphi_k(s)) - f(s, \\varphi(s))| \\leq L|\\varphi_k(s) - \\varphi(s)| \\to 0$ uniformly, so we may pass to the limit under the integral in $\\varphi_{k+1} = T\\varphi_k$. So $\\varphi = T\\varphi$. $\\square$

Note that $h$ does not depend on $L$. The Lipschitz constant only affects the speed of convergence. Uniqueness comes in the next lesson.

**Worked example.** Take $x' = x$, $x(0) = 1$. Then $\\varphi_0 = 1$, $\\varphi_1 = 1 + \\int_0^t 1\\,ds = 1 + t$, and $\\varphi_2 = 1 + \\int_0^t(1 + s)\\,ds = 1 + t + t^2/2$. By induction $\\varphi_k = \\sum_{j=0}^k t^j/j!$, the Taylor polynomial of $e^t$.

On $R$ with $a$ arbitrary and $b$ given, $M = 1 + b$, so $h = \\min(a, b/(1 + b)) < 1$. The theorem gives only an interval shorter than 1, although the iterates converge for all $t$. The theorem is local and often pessimistic. The next lessons show how to extend the solution as far as it goes.`,
          resources: [
            teschl('The chapter on initial value problems: the Picard-Lindelöf theorem.'),
            mit18034('The lecture notes on existence and uniqueness, including the method of successive approximations.'),
            basicAnalysis('The section on the fixed point theorem and on Picard\'s theorem, for the contraction viewpoint.'),
          ],
          exercises: [
            {
              slug: 'compute-iterates',
              title: 'Compute iterates',
              prompt: `Compute the Picard iterates in closed form, prove your formula by induction, and identify the limit. (a) $x' = 2tx$, $x(0) = 1$. (b) $x' = t + x$, $x(0) = 0$; show that $\\varphi_k(t) = \\sum_{j=2}^{k+1} t^j/j!$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'guaranteed-interval',
              title: 'The guaranteed interval',
              prompt: `For $x' = x^2$, $x(0) = 1$, with $a$ large, find the value of $b$ that makes $h = \\min(a, b/M)$ as large as possible, and find that $h$. Compare it with the true interval to the right, $[0, 1)$. Compute the first two Picard iterates, and explain why they are not close to the solution at $t = 1$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'iterate-error-bound',
              title: 'An error bound',
              prompt: `In the setting of the theorem, prove that for all $k$ and $t \\in J$,
$$|\\varphi(t) - \\varphi_k(t)| \\leq \\frac{M}{L}\\cdot\\frac{(Lh)^{k+1}}{(k + 1)!}e^{Lh}.$$
For $x' = \\sin x$ with $x(0) = 1$, $a = 1$ and $b = 1$, find a $k$ for which the bound guarantees 6 correct decimal places on $J$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Sum the tail of the series of successive differences, and compare it with the tail of the exponential series.',
            },
            {
              slug: 'contraction-proof',
              title: 'A contraction with a weighted norm',
              prompt: `Let $X$ be the set of continuous $\\varphi : J \\to \\mathbb{R}^n$ with $|\\varphi(t) - x_0| \\leq b$ on $J$. For $L > 0$, define $\\|\\varphi\\|_L = \\sup_{t \\in J} e^{-2L|t - t_0|}|\\varphi(t)|$. Prove that $X$ with this norm is a complete metric space and that $T$ maps $X$ into itself and is a contraction with constant $1/2$. Conclude existence and uniqueness in $X$ on all of $J$, by the contraction mapping theorem. Compare with using the plain sup norm, which needs $h < 1/L$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'picard-numerics',
              title: 'Picard iteration on a computer',
              prompt: `Implement Picard iteration on a grid using cumulative trapezoid integration. Apply it to $x' = \\cos(t)\\,x$, $x(0) = 1$ on $[0, 3]$, whose solution is $e^{\\sin t}$. Plot the sup-norm error against $k$ on a log axis, compare it with the bound from the error estimate exercise, and find where grid error takes over.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the theorem use $h = \\min(a, b/M)$?',
              answerOutline: 'The time must stay within $a$. A solution with speed at most $M$ cannot leave the ball of radius $b$ before time $b/M$.',
            },
            {
              question: 'Where in the proof is the Lipschitz condition used?',
              answerOutline: 'In the induction on successive differences, and when passing to the limit under the integral.',
            },
            {
              question: 'Does this proof show uniqueness?',
              answerOutline: 'It only constructs one solution. Uniqueness needs a separate argument, by Gronwall or by the contraction property.',
            },
          ],
        },
        {
          slug: 'gronwall-inequality',
          title: "Gronwall's inequality and uniqueness",
          summary:
            'The one inequality that turns a Lipschitz condition into uniqueness, bounds and convergence estimates.',
          estimatedMinutes: 110,
          objectives: [
            'State and prove Gronwall\'s inequality, noting the sign condition',
            'Derive uniqueness from a Lipschitz condition',
            'Use Gronwall to bound solutions you cannot compute',
            'Prove convergence of Euler\'s method through a discrete version',
          ],
          concepts: [
            'Gronwall\'s inequality',
            'Integrating factor trick',
            'Sign condition $k \\geq 0$',
            'Uniqueness theorem',
            'Discrete Gronwall',
            'A priori bound',
          ],
          explanation: `**Theorem (Gronwall).** Let $u$ and $k$ be continuous on $[t_0, t_1]$ with $k \\geq 0$, and let $C$ be a constant. If

$$u(t) \\leq C + \\int_{t_0}^t k(s)u(s)\\,ds \\quad\\text{for all } t \\in [t_0, t_1],$$

then $u(t) \\leq C\\exp\\left(\\int_{t_0}^t k(s)\\,ds\\right)$ on $[t_0, t_1]$.

*Proof.* Let $v(t)$ be the right side of the hypothesis, so $u \\leq v$, and $v$ is $C^1$ with $v' = ku$. Since $k \\geq 0$, $v' \\leq kv$. With $K(t) = \\int_{t_0}^t k$, this gives $(e^{-K}v)' = e^{-K}(v' - kv) \\leq 0$. So $e^{-K(t)}v(t) \\leq v(t_0) = C$, and $u \\leq v \\leq Ce^{K}$. $\\square$

The hypothesis $k \\geq 0$ was used in going from $v' = ku$ to $v' \\leq kv$. No sign condition on $u$ or $C$ is needed.

**Theorem (uniqueness).** If $f$ is continuous and Lipschitz in $x$ with constant $L$ on $E$, and $\\varphi, \\psi$ are solutions with graphs in $E$ on an interval $I \\ni t_0$ with $\\varphi(t_0) = \\psi(t_0)$, then $\\varphi = \\psi$ on $I$.

*Proof.* For $t \\geq t_0$, subtract the integral equations:

$$|\\varphi(t) - \\psi(t)| \\leq \\int_{t_0}^t L|\\varphi(s) - \\psi(s)|\\,ds.$$

Gronwall with $C = 0$ gives $|\\varphi - \\psi| \\leq 0$. For $t < t_0$, apply this to $\\tilde\\varphi(t) = \\varphi(2t_0 - t)$ and $\\tilde\\psi$, which solve the reflected equation. $\\square$

For **locally** Lipschitz $f$, uniqueness still holds. The set of $t \\in I$ where $\\varphi(t) = \\psi(t)$ is closed by continuity, and open by the local result, so it is all of $I$, as $I$ is connected.

**Worked example.** Bound the solution of $x' = 1 + t\\sin x$, $x(0) = 0$ on $[0, 1]$, without solving it.

Because the right side is smooth with bounded $x$-derivative on the strip, a solution exists. In integral form, with $|\\sin x| \\leq |x|$,

$$|x(t)| \\leq t + \\int_0^t s|x(s)|\\,ds \\leq 1 + \\int_0^t s|x(s)|\\,ds, \\qquad 0 \\leq t \\leq 1.$$

Now apply Gronwall with $u = |x|$, $C = 1$ and $k(s) = s$:

$$|x(t)| \\leq \\exp\\left(\\int_0^t s\\,ds\\right) = e^{t^2/2}, \\qquad\\text{so}\\quad |x(1)| \\leq e^{1/2} \\approx 1.649.$$

A numerical integration gives $x(1) \\approx 1.34$, so the bound is valid and not absurdly weak. We used no information about the solution except the structure of the equation. An estimate like this is called an **a priori bound**, and it is the key to global existence in a later lesson.

Gronwall also explains stability of numerical methods, and it reappears in the proof of continuous dependence.`,
          resources: [
            teschl('The sections on dependence on initial conditions and the Gronwall inequality.'),
            mit18034('The lecture notes on uniqueness, comparison theorems and well-posedness.'),
          ],
          exercises: [
            {
              slug: 'variable-alpha',
              title: 'Gronwall with variable $\\alpha$',
              prompt: `Let $\\alpha$ be continuous and non-decreasing on $[t_0, t_1]$, and $k \\geq 0$ continuous. Prove that $u(t) \\leq \\alpha(t) + \\int_{t_0}^t k(s)u(s)\\,ds$ implies $u(t) \\leq \\alpha(t)\\exp\\left(\\int_{t_0}^t k\\right)$. Note that in general no sign is assumed on $u$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Fix $T$ in the interval and apply the theorem on $[t_0, T]$ with constant $C = \\alpha(T)$.',
            },
            {
              slug: 'sign-condition',
              title: 'The sign condition matters',
              prompt: `Take $k \\equiv -1$, $C = 1$, $t_0 = 0$ and $u(t) = 2t$. Show that $u(t) \\leq 1 - \\int_0^t u(s)\\,ds$ holds on $[0, \\sqrt{2} - 1]$, and that the conclusion $u(t) \\leq e^{-t}$ fails at $t = \\sqrt{2} - 1$. Explain which step of the proof breaks down.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'nonlinear-gronwall-fails',
              title: 'Why the inequality has to be linear',
              prompt: `Show that $u(t) = t^2$ satisfies $u(t) = \\int_0^t 2\\sqrt{u(s)}\\,ds$ for $t \\geq 0$, so that a sublinear integral inequality with $C = 0$ does not force $u \\equiv 0$. Relate this to non-uniqueness for $x' = 2\\sqrt{|x|}$ and to the failure of the Lipschitz condition at 0.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'discrete-gronwall-euler',
              title: 'Euler\'s method converges',
              prompt: `Let $f$ be Lipschitz in $x$ with constant $L > 0$ on a strip, and let the solution $\\varphi$ be $C^2$ on $[t_0, t_0 + T]$ with $|\\varphi''| \\leq 2C$. For Euler's method with step $h$, let $e_n = |y_n - \\varphi(t_n)|$. Show that $e_{n+1} \\leq (1 + hL)e_n + Ch^2$. Deduce by induction that $e_n \\leq \\frac{Ch}{L}(e^{L(t_n - t_0)} - 1)$ if $e_0 = 0$. State the resulting theorem.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State Gronwall\'s inequality with its hypotheses.',
              answerOutline: 'If $u, k$ are continuous, $k \\geq 0$ and $u \\leq C + \\int ku$, then $u \\leq C\\exp\\int k$.',
            },
            {
              question: 'How does uniqueness follow from Gronwall?',
              answerOutline: 'The difference of two solutions satisfies the inequality with $C = 0$ and $k = L$, so it vanishes.',
            },
            {
              question: 'Why does the inequality with $u(t) \\leq \\int_0^t 2\\sqrt{u}$ not imply $u = 0$?',
              answerOutline: 'The right side is not linear in $u$. Near 0, $\\sqrt{u}$ is not bounded by a constant times $u$.',
            },
          ],
        },
        {
          slug: 'continuous-dependence',
          title: 'Continuous dependence on data',
          summary:
            'Solutions change continuously with initial data and with the equation, at a rate at most exponential in time.',
          estimatedMinutes: 110,
          objectives: [
            'State and prove the continuous dependence estimate',
            'Show that the exponential estimate is sharp',
            'Derive the variational equation for $\\partial\\varphi/\\partial x_0$',
            'Reduce dependence on parameters to dependence on initial data',
          ],
          concepts: [
            'Continuous dependence',
            'Well-posed problem',
            'Variational equation',
            'Differentiable dependence',
            'Sensitivity to parameters',
          ],
          explanation: `A model is useful only if small errors in data give small errors in predictions, at least over a fixed time.

**Theorem.** Let $f$ and $g$ be continuous on $E$, let $f$ be Lipschitz in $x$ on $E$ with constant $L > 0$, and suppose $|f - g| \\leq \\epsilon$ on $E$. If $\\varphi$ solves $x' = f(t, x)$ and $\\psi$ solves $y' = g(t, y)$ on an interval $I \\ni t_0$, with graphs in $E$, then for $t \\in I$,

$$|\\varphi(t) - \\psi(t)| \\leq |\\varphi(t_0) - \\psi(t_0)|\\,e^{L|t - t_0|} + \\frac{\\epsilon}{L}\\left(e^{L|t - t_0|} - 1\\right).$$

*Proof.* Take $t \\geq t_0$ and let $w = |\\varphi - \\psi|$ and $\\delta = w(t_0)$. Subtracting integral equations and using $|f(t, \\varphi) - g(t, \\psi)| \\leq |f(t, \\varphi) - f(t, \\psi)| + |f(t, \\psi) - g(t, \\psi)|$,

$$w(t) \\leq \\delta + \\int_{t_0}^t(Lw(s) + \\epsilon)\\,ds.$$

Set $u = w + \\epsilon/L$. Then $u(t) \\leq (\\delta + \\epsilon/L) + \\int_{t_0}^t Lu(s)\\,ds$. Gronwall gives $u \\leq (\\delta + \\epsilon/L)e^{L(t - t_0)}$, which rearranges to the claim. $\\square$

Note the factor $e^{L|t - t_0|}$. The dependence is continuous on bounded time intervals only. For large times, tiny differences may grow. That is the root of sensitive dependence in chaotic systems, and it is not a contradiction of this theorem.

When $f$ is $C^1$, more is true. The flow is differentiable in the initial data.

**Theorem (statement).** If $f$ and $D_x f$ are continuous on $D$, then the solution $\\varphi(t; x_0)$ is $C^1$ in $x_0$ on its domain, and $Z(t) = \\partial\\varphi/\\partial x_0$ is the matrix solution of the **variational equation**

$$Z' = D_x f(t, \\varphi(t; x_0))\\,Z, \\qquad Z(t_0) = I.$$

You can recover the form of this equation by differentiating $\\varphi' = f(t, \\varphi)$ in $x_0$, though the theorem's real content is that the derivative exists. The proof compares a difference quotient with $Z$, using Gronwall.

**Worked example.** For $x' = x^2$, $x(0) = x_0$, separation gives $\\varphi(t; x_0) = x_0/(1 - x_0 t)$ for $x_0 t < 1$. Differentiating directly,

$$\\frac{\\partial\\varphi}{\\partial x_0} = \\frac{(1 - x_0 t) + x_0 t}{(1 - x_0 t)^2} = \\frac{1}{(1 - x_0 t)^2}.$$

Now solve the variational equation. $Z' = 2\\varphi Z$ with $Z(0) = 1$ gives

$$Z(t) = \\exp\\int_0^t\\frac{2x_0}{1 - x_0 s}\\,ds = \\exp\\left(-2\\ln(1 - x_0 t)\\right) = \\frac{1}{(1 - x_0 t)^2}.$$

They match. With $x_0 = 1$, the sensitivity is $1/(1 - t)^2$, growing without bound as $t \\to 1$, which reflects that the blow-up time depends on $x_0$.

Parameters reduce to initial data. For $x' = f(t, x, \\mu)$, add the equation $\\mu' = 0$ with $\\mu(t_0) = \\mu_0$. The enlarged system has $\\mu$ as an initial value, so the theorems above apply.`,
          resources: [
            teschl('The sections on dependence on initial conditions and on parameters.'),
            mit18034('The lectures on well-posedness.'),
          ],
          exercises: [
            {
              slug: 'sharpness',
              title: 'The estimate is sharp',
              prompt: `For a scalar $L > 0$, take $f(t, x) = Lx$ and $g(t, y) = Ly + \\epsilon$. Solve both with $x(0) = x_0 < y(0) = y_0$. Show that the theorem holds with equality for $t \\geq 0$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'logistic-variational',
              title: 'Variational equation for the logistic',
              prompt: `For $x' = x(1 - x)$, with solution $\\varphi = \\frac{x_0e^t}{1 - x_0 + x_0e^t}$, compute $\\partial\\varphi/\\partial x_0$ directly. Verify that it solves $Z' = (1 - 2\\varphi)Z$, $Z(0) = 1$. For $x_0 = 1/4$, find the time at which $Z$ is largest, its value there, and the limit as $t \\to \\infty$. Why does $Z$ tend to 0, in terms of the equilibrium at 1?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'parameter-sensitivity',
              title: 'Sensitivity to a parameter',
              prompt: `Show that if $f$ is $C^1$ in $(x, \\mu)$, then $Y = \\partial\\varphi/\\partial\\mu$ satisfies $Y' = D_x f\\,Y + D_\\mu f$, $Y(t_0) = 0$ along the solution. Check this for $x' = \\mu x$, $x(0) = x_0$. Then apply it to the pendulum $\\theta'' + \\mu\\sin\\theta = 0$ with $\\theta(0) = 1$, $\\theta'(0) = 0$, $\\mu = 1$: integrate the enlarged system, and compare $Y(5)$ with a finite difference.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'prove-differentiability',
              title: 'Prove differentiable dependence (scalar case)',
              prompt: `For scalar $f$ with $f$ and $f_x$ continuous, let $Z$ solve the variational equation along $\\varphi(t; x_0)$. Let $h \\neq 0$ and $q(t) = [\\varphi(t; x_0 + h) - \\varphi(t; x_0)]/h - Z(t)$. Write an integral equation for $q$, using the mean value theorem and continuous dependence, and apply Gronwall to show that $q \\to 0$ uniformly on a compact interval as $h \\to 0$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does continuous dependence not contradict chaos?',
              answerOutline: 'The bound grows like $e^{L|t - t_0|}$, so closeness is guaranteed only on a fixed time interval.',
            },
            {
              question: 'What is the variational equation?',
              answerOutline: 'The linear equation $Z\' = D_x f(t, \\varphi)Z$ with $Z(t_0) = I$, satisfied by the derivative of the flow in the initial data.',
            },
            {
              question: 'How do you handle dependence on a parameter?',
              answerOutline: 'Add $\\mu\' = 0$ as a new equation, so that the parameter becomes an initial condition.',
            },
          ],
        },
        {
          slug: 'maximal-solutions',
          title: 'Maximal solutions and global existence',
          summary:
            'Every solution extends to a largest interval, and at a finite endpoint it must leave every compact set.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that a unique maximal solution exists',
            'State and use the theorem on leaving compact sets',
            'Prove global existence under a linear growth bound',
            'Use conserved quantities and comparison to decide global existence',
          ],
          concepts: [
            'Maximal interval of existence',
            'Leaving every compact set',
            'Blow-up alternative',
            'Linear growth bound',
            'Comparison argument',
            'Conserved quantity',
          ],
          explanation: `Let $f$ be continuous on an open set $D$ and locally Lipschitz in $x$.

**Theorem.** For each $(t_0, x_0) \\in D$ there is a unique solution $\\varphi : (\\alpha, \\beta) \\to \\mathbb{R}^n$ of the initial value problem such that every other solution is a restriction of it. This $\\varphi$ is the **maximal solution**.

The proof takes the union of all solutions. Their domains are intervals containing $t_0$, and any two agree on their overlap by uniqueness, so they glue to a single solution on the union. Its interval is open, because otherwise the local theorem at an endpoint would extend it further.

**Theorem (leaving compact sets).** If $\\beta < \\infty$, then for every compact $K \\subset D$ there is a $\\tau < \\beta$ with $(t, \\varphi(t)) \\notin K$ for all $t \\in (\\tau, \\beta)$. The same holds at $\\alpha$.

*Idea.* By compactness, the local existence time from Picard-Lindelöf has a uniform lower bound $h > 0$ for all starting points in a slightly smaller compact set. If the graph came back into $K$ at a time within $h$ of $\\beta$, the solution from that point would extend past $\\beta$, a contradiction.

When $D = \\mathbb{R} \\times \\mathbb{R}^n$, taking $K = [t_0, \\beta] \\times \\bar B(0, R)$ shows that $\\beta < \\infty$ implies $|\\varphi(t)| \\to \\infty$ as $t \\to \\beta^-$. So **to prove global existence, it is enough to prove an a priori bound**: solutions cannot blow up in finite time.

**Theorem (linear growth).** If $D = \\mathbb{R} \\times \\mathbb{R}^n$ and $|f(t, x)| \\leq a(t) + b(t)|x|$ with $a, b \\geq 0$ continuous, then every maximal solution is defined on all of $\\mathbb{R}$.

*Proof.* Suppose $\\beta < \\infty$. On $[t_0, \\beta)$, $a \\leq A$ and $b \\leq B$. The integral equation gives $|\\varphi(t)| \\leq |x_0| + A(\\beta - t_0) + \\int_{t_0}^t B|\\varphi|$. Gronwall bounds $|\\varphi|$ on $[t_0, \\beta)$, contradicting blow-up. $\\square$

In particular linear systems $x' = A(t)x + g(t)$ have solutions on the whole interval of continuity.

**Worked example.** Show that the solution of $x' = t^2 + x^2$, $x(0) = 1$ blows up at some $\\beta \\leq 1$.

Let $y = 1/(1 - t)$, which solves $y' = y^2$, $y(0) = 1$. Let $w = x - y$ on the common interval $[0, c)$. Then

$$w' = t^2 + (x + y)w, \\qquad w(0) = 0.$$

This is a linear equation for $w$ with coefficient $m(t) = x + y$. So

$$w(t) = \\int_0^t e^{\\int_s^t m}s^2\\,ds \\geq 0.$$

Thus $x \\geq y$ wherever both exist. If $\\beta > 1$, then $x$ would be bounded on $[0, 1]$, whereas $x \\geq y \\to \\infty$ as $t \\to 1^-$. So $\\beta \\leq 1$. By the previous theorem, $|x| \\to \\infty$ as $t \\to \\beta^-$. Numerically, $\\beta \\approx 0.970$.

The set $D$ matters. For $x' = -1/(2x)$ on $D = \\{x > 0\\}$ with $x(0) = 1$, the solution $\\sqrt{1 - t}$ stays bounded, but it leaves every compact subset of $D$ by approaching the boundary point $x = 0$.`,
          resources: [
            teschl('The sections on extensibility of solutions.'),
            mit18034('The lecture notes on existence and continuation of solutions.'),
          ],
          exercises: [
            {
              slug: 'glue-solutions',
              title: 'Glue the solutions',
              prompt: `Write the full proof of the existence of a unique maximal solution. Be careful to show that the union $J$ of domains is an open interval, that the glued function is well defined and $C^1$, and that it is the unique solution with this property.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'decide-global',
              title: 'Global or not?',
              prompt: `Decide whether the maximal solution is defined for all $t \\in \\mathbb{R}$, and prove it. (a) $x' = \\sin x + t^2$. (b) $x' = x^3$, $x(0) = 1$; find $(\\alpha, \\beta)$. (c) $x' = -x^3$, $x(0) = 1$; find $(\\alpha, \\beta)$. (d) $x' = y$, $y' = -x - x^3$ with any initial data, using the function $E = \\frac12y^2 + \\frac12x^2 + \\frac14x^4$. (e) $x' = x\\ln(1 + x^2)$, $x(0) = 1$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (e), compare with $x\' = C|x|\\ln|x|$ for large $x$, or study $u = \\ln(1 + x^2)$ and bound its growth.',
            },
            {
              slug: 'leave-compact',
              title: 'Prove the theorem on leaving compact sets',
              prompt: `Let $K \\subset D$ be compact. Prove that there exist $h > 0$ and a compact $K' \\supset K$ in $D$ such that the solution through any point of $K$ exists at least on a time interval of length $h$ forward. Use this to prove the theorem. Deduce that when $D = \\mathbb{R} \\times \\mathbb{R}^n$ and $\\beta < \\infty$, $|\\varphi(t)| \\to \\infty$ as $t \\to \\beta^-$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'blowup-numerics',
              title: 'Locate a blow-up time',
              prompt: `For $x' = t^2 + x^2$, $x(0) = 1$, use the substitution $u = 1/x$ to integrate past the point where $x$ becomes huge. Find the time $\\beta$ with $u(\\beta) = 0$ to five decimal places. Also find the blow-up time for $x(0) = 0$, and for $x(0) = -1$, where the solution first goes up through zero. What changes as $x(0) \\to -\\infty$?`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What can happen at a finite endpoint $\\beta$ of the maximal interval?',
              answerOutline: 'The graph must leave every compact subset of $D$: either $|x| \\to \\infty$, or it approaches the boundary of $D$.',
            },
            {
              question: 'Why does linear growth give global existence?',
              answerOutline: 'Gronwall bounds the solution on any finite interval, so blow-up is impossible.',
            },
            {
              question: 'Why is $x\' = x^2$ not covered by the linear growth theorem?',
              answerOutline: 'It has no bound $a + b|x|$, because quadratic growth outruns any linear function.',
            },
          ],
        },
      ],
      project: {
        slug: 'proof-companion-for-existence',
        title: 'A computational companion to Picard-Lindelöf',
        description: `Build a notebook that makes the theorems of this module quantitative for one non-linear equation of your choice, such as a pendulum with a torque, a Riccati equation or a growth model. Everything should be derived first by hand: the constants $a$, $b$, $M$, $L$ and the guaranteed interval, then a comparison between theory and computation. The aim is to develop a feeling for which estimates are sharp and which are crude.`,
        deliverables: [
          'A written derivation of $M$, $L$ and $h$ for your equation, with reasoning for the choice of box',
          'A Picard iteration code with sup-norm convergence plots, compared with the theoretical error bound',
          'A continuous dependence experiment: two nearby solutions, the observed separation and the Gronwall bound on one plot',
          'The variational equation integrated along a solution, checked against finite differences',
          'A proof, in your own words, of global existence or finite-time blow-up for your equation',
        ],
        estimatedHours: 7,
        stretchGoals: ['Use interval arithmetic to turn one computation into a rigorous enclosure of the solution'],
      },
    },
    {
      slug: 'linear-systems',
      title: 'Linear Systems',
      description:
        'The complete theory of linear systems: the matrix exponential for constant coefficients, fundamental matrices for variable coefficients, forcing by variation of constants, and Floquet theory for periodic coefficients.',
      lessons: [
        {
          slug: 'matrix-exponential',
          title: 'The matrix exponential',
          summary:
            'Define $e^{tA}$ by a power series, prove that it solves $x\' = Ax$, and compute it from the Jordan form.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that the exponential series converges and can be differentiated term by term',
            'Prove $e^{A+B} = e^Ae^B$ for commuting matrices, and show that it fails otherwise',
            'Compute $e^{tA}$ using diagonalisation or nilpotent parts',
            'State and use the growth bound in terms of the spectrum',
          ],
          concepts: [
            'Matrix exponential',
            'Operator norm',
            'Commuting matrices',
            'Nilpotent matrix',
            'Jordan decomposition',
            'Spectral abscissa',
          ],
          explanation: `For a real or complex $n \\times n$ matrix $A$ define

$$e^{tA} = \\sum_{k=0}^\\infty\\frac{t^kA^k}{k!}.$$

With the operator norm, $\\|A^k\\| \\leq \\|A\\|^k$, so the series converges absolutely, and uniformly for $t$ in compact sets, by comparison with $e^{|t|\\|A\\|}$. The differentiated series converges in the same way, so

$$\\frac{d}{dt}e^{tA} = Ae^{tA} = e^{tA}A, \\qquad e^{0A} = I.$$

Hence $\\varphi(t) = e^{tA}x_0$ solves $x' = Ax$, $x(0) = x_0$, and it is the only solution by the uniqueness theorem.

**Commuting matrices.** If $AB = BA$ then $e^{t(A+B)} = e^{tA}e^{tB}$. Proof: $\\Psi(t) = e^{tA}e^{tB}$ satisfies $\\Psi' = Ae^{tA}e^{tB} + e^{tA}Be^{tB}$. Since $B$ commutes with $A$ it commutes with $e^{tA}$, so $\\Psi' = (A + B)\\Psi$ with $\\Psi(0) = I$. By uniqueness $\\Psi = e^{t(A+B)}$. In particular, $e^{tA}$ is invertible with inverse $e^{-tA}$, and $e^{(s+t)A} = e^{sA}e^{tA}$.

**Change of basis.** If $A = PJP^{-1}$, then $A^k = PJ^kP^{-1}$ and $e^{tA} = Pe^{tJ}P^{-1}$. So it is enough to compute the exponential of a Jordan block $\\lambda I + N$, with $N$ nilpotent. Since $\\lambda I$ commutes with $N$,

$$e^{t(\\lambda I + N)} = e^{\\lambda t}\\left(I + tN + \\frac{t^2N^2}{2!} + \\dots + \\frac{t^{m-1}N^{m-1}}{(m-1)!}\\right),$$

where the sum is finite since $N^m = 0$ for a block of size $m$.

**Worked example.** Compute $e^{tA}$ for $A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$, and for $B = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$.

Write $A = 2I + N$ with $N = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ and $N^2 = 0$. Then

$$e^{tA} = e^{2t}(I + tN) = e^{2t}\\begin{pmatrix} 1 & t \\\\ 0 & 1 \\end{pmatrix}.$$

Check: $\\frac{d}{dt}$ of the $(1, 2)$ entry is $e^{2t}(1 + 2t)$, and the $(1, 2)$ entry of $Ae^{tA}$ is $2te^{2t} + e^{2t}$. They agree.

For $B$, note $B^2 = -I$. So even powers give $(-1)^j I$ and odd powers give $(-1)^j B$. Splitting the series,

$$e^{tB} = (\\cos t)I + (\\sin t)B = \\begin{pmatrix} \\cos t & \\sin t \\\\ -\\sin t & \\cos t \\end{pmatrix},$$

a rotation, clockwise for $t > 0$.

**Growth bound.** From the Jordan form, each entry of $e^{tA}$ is a sum of terms $t^je^{\\lambda t}$, with $\\lambda$ an eigenvalue and $j$ less than the size of its largest block. So if every eigenvalue satisfies $\\operatorname{Re}\\lambda < \\mu$, there is a constant $C$ with

$$\\|e^{tA}\\| \\leq Ce^{\\mu t}, \\qquad t \\geq 0.$$

The strict inequality absorbs the polynomial factors. This estimate is the bridge between linear algebra and stability.`,
          resources: [
            teschl('The chapter on linear equations: the matrix exponential.'),
            mit18034('The lecture notes on systems of first-order equations.'),
          ],
          exercises: [
            {
              slug: 'derivative-of-series',
              title: 'Differentiate the series',
              prompt: `Prove from the definition that $t \\mapsto e^{tA}$ is differentiable, with derivative $Ae^{tA}$. Use a theorem about uniformly convergent series of derivatives, and check its hypotheses. Then prove that $Ae^{tA} = e^{tA}A$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'non-commuting-counterexample',
              title: 'Non-commuting matrices',
              prompt: `Let $A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 0 \\\\ 1 & 0 \\end{pmatrix}$. Compute $e^A$, $e^B$, $e^Ae^B$ and $e^{A+B}$ exactly. Show that $e^Ae^B \\neq e^{A+B}$ and also that $e^Ae^B \\neq e^Be^A$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'compute-exponential',
              title: 'Compute an exponential',
              prompt: `Find $e^{tA}$ for (a) $A = \\begin{pmatrix} 0 & 1 \\\\ -1 & -2 \\end{pmatrix}$; (b) $A = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$; (c) the $3 \\times 3$ block with $\\lambda = -1$ on the diagonal and 1 on the superdiagonal. Check each by differentiating or with \`scipy.linalg.expm\`.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'determinant-trace',
              title: 'Determinant and trace',
              prompt: `Prove that $\\det e^A = e^{\\operatorname{tr}A}$ for every complex matrix $A$, using the Jordan form or triangularisation. Deduce that $e^A$ is always invertible, and that a real matrix with negative determinant has no real logarithm.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'prove-growth-bound',
              title: 'Prove the growth bound',
              prompt: `Let every eigenvalue of $A$ have real part strictly less than $\\mu$. Prove that there is a $C$ with $\\|e^{tA}\\| \\leq Ce^{\\mu t}$ for all $t \\geq 0$. Show by a $2 \\times 2$ example that you cannot in general take $\\mu$ equal to the largest real part. Show also that in general $C$ must exceed 1.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the identity $e^{A+B} = e^Ae^B$ need $AB = BA$?',
              answerOutline: 'The proof needs $B$ to commute with $e^{tA}$. Without commutativity, products in the expansions of the two sides do not match.',
            },
            {
              question: 'What is the exponential of a nilpotent matrix?',
              answerOutline: 'A finite sum, because the series stops: a polynomial in $tN$.',
            },
            {
              question: 'What form do the entries of $e^{tA}$ take?',
              answerOutline: 'Linear combinations of $t^je^{\\lambda t}$, with $\\lambda$ eigenvalues and $j$ less than the size of the largest Jordan block for $\\lambda$.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/diagonalization-and-matrix-functions'],
        },
        {
          slug: 'fundamental-matrices',
          title: 'Fundamental matrices and Liouville\'s formula',
          summary:
            'The solutions of a linear system with variable coefficients form an $n$-dimensional space, and its volume form evolves by the trace.',
          estimatedMinutes: 110,
          objectives: [
            'Prove that the solution space of $x\' = A(t)x$ has dimension $n$',
            'Define fundamental matrices and the state transition matrix',
            'Prove Liouville\'s formula',
            'Explain why $\\exp\\int A$ is not the solution in general',
          ],
          concepts: [
            'Solution space',
            'Fundamental matrix',
            'State transition matrix',
            'Liouville\'s formula',
            'Commuting family of matrices',
            'Adjoint equation',
          ],
          explanation: `Let $A$ be continuous on an interval $I$. By the linear growth theorem, every solution of $x' = A(t)x$ exists on all of $I$.

**Theorem.** The set $S$ of solutions on $I$ is a vector space of dimension $n$. For each $t_0 \\in I$, the evaluation map $\\varphi \\mapsto \\varphi(t_0)$ is an isomorphism $S \\to \\mathbb{R}^n$.

*Proof.* $S$ is a vector space by linearity. Evaluation is linear, it is onto by existence, and it is one-to-one by uniqueness. $\\square$

A consequence is striking: solutions that are independent at one time are independent at every time. A **fundamental matrix** is a matrix function $\\Phi$ whose columns are a basis of $S$, so that $\\Phi' = A\\Phi$ and $\\det\\Phi(t) \\neq 0$. Any two fundamental matrices differ by a constant invertible factor on the right. The **state transition matrix** is

$$\\Phi(t, s) = \\Phi(t)\\Phi(s)^{-1}.$$

It does not depend on the choice of $\\Phi$. It carries the state at time $s$ to the state at time $t$: $\\varphi(t) = \\Phi(t, s)\\varphi(s)$. It obeys $\\Phi(t, t) = I$ and $\\Phi(t, s)\\Phi(s, r) = \\Phi(t, r)$. For constant $A$, $\\Phi(t, s) = e^{(t-s)A}$.

**Theorem (Liouville).** For a fundamental matrix,

$$\\det\\Phi(t) = \\det\\Phi(t_0)\\exp\\int_{t_0}^t\\operatorname{tr}A(s)\\,ds.$$

*Proof.* From $\\Phi(t + h) = \\Phi(t) + hA(t)\\Phi(t) + o(h) = (I + hA(t) + o(h))\\Phi(t)$ and $\\det(I + hB) = 1 + h\\operatorname{tr}B + O(h^2)$, we get $(\\det\\Phi)' = \\operatorname{tr}A(t)\\det\\Phi$. This is a scalar linear equation. $\\square$

Geometrically, the trace is the rate of expansion of volume under the flow.

**Worked example.** On $t > 0$, consider $y'' - \\frac{2}{t}y' + \\frac{2}{t^2}y = 0$, with solutions $y = t$ and $y = t^2$. As a system with $x = (y, y')^T$,

$$A(t) = \\begin{pmatrix} 0 & 1 \\\\ -2/t^2 & 2/t \\end{pmatrix}, \\qquad \\Phi(t) = \\begin{pmatrix} t & t^2 \\\\ 1 & 2t \\end{pmatrix}.$$

Check the second column: its derivative is $(2t, 2)^T$, and $A(t)(t^2, 2t)^T = (2t, -2 + 4)^T$.

Here $\\det\\Phi = t^2$ and $\\operatorname{tr}A = 2/t$. Liouville predicts, from $t_0 = 1$,

$$\\det\\Phi(t) = 1\\cdot\\exp\\int_1^t\\frac{2}{s}\\,ds = t^2.$$

It agrees. The state transition matrix is

$$\\Phi(t, 1) = \\Phi(t)\\Phi(1)^{-1} = \\begin{pmatrix} t & t^2 \\\\ 1 & 2t \\end{pmatrix}\\begin{pmatrix} 2 & -1 \\\\ -1 & 1 \\end{pmatrix} = \\begin{pmatrix} 2t - t^2 & t^2 - t \\\\ 2 - 2t & 2t - 1 \\end{pmatrix}.$$

**A warning.** It is tempting to generalise the scalar formula and write $\\Phi(t, t_0) = \\exp\\int_{t_0}^tA(s)\\,ds$. This is false in general, because the derivative of $\\exp B(t)$ is not $B'\\exp B$ unless $B'(t)$ commutes with $B(t)$. It is true if the matrices $A(t)$ commute with each other at all times. There is no general formula for $\\Phi$, even for $n = 2$. That is why this whole theory is qualitative.`,
          resources: [
            teschl('The sections on linear autonomous and non-autonomous first-order systems.'),
            mit18034('The lecture notes on systems of first-order equations.'),
          ],
          exercises: [
            {
              slug: 'exp-integral-fails',
              title: 'The integral formula can fail',
              prompt: `Let $A(t) = \\begin{pmatrix} 1 & t \\\\ 0 & 0 \\end{pmatrix}$. Find $\\Phi(t, 0)$ exactly by solving the system. Find $\\exp\\int_0^tA(s)\\,ds$. Show that they differ and that $A(t)A(s) \\neq A(s)A(t)$ for $t \\neq s$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'commuting-family',
              title: 'When the formula is right',
              prompt: `Suppose that $A(t)A(s) = A(s)A(t)$ for all $s, t \\in I$, with $A$ continuous. Prove that $B(t) = \\int_{t_0}^tA$ commutes with $A(t)$, and that $\\Phi(t, t_0) = e^{B(t)}$. Give a non-constant example with $n = 2$ in which the matrices are not diagonal.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'liouville-from-determinant',
              title: 'A second proof of Liouville',
              prompt: `For $n = 2$, write $\\Phi$ by columns and differentiate $\\det\\Phi$ by the product rule, one column at a time. Substitute $\\Phi' = A\\Phi$, and simplify to $(\\det\\Phi)' = \\operatorname{tr}(A)\\det\\Phi$. Explain how this recovers Abel's formula for $y'' + py' + qy = 0$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'adjoint-equation',
              title: 'The adjoint equation',
              prompt: `Show that if $\\Phi$ is a fundamental matrix of $x' = A(t)x$, then $\\Psi = (\\Phi^{-1})^T$ is a fundamental matrix of $y' = -A(t)^Ty$. Deduce that $x(t)^Ty(t)$ is constant for solutions of the two systems. Then show that when $A(t)$ is skew-symmetric for all $t$, the norm $|x(t)|$ is constant.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'volume-of-a-flow',
              title: 'Volume under a flow',
              prompt: `For the linear system $x' = Ax$ with $A = \\begin{pmatrix} -1 & 2 \\\\ 0 & -3 \\end{pmatrix}$, compute the area of the image of the unit square under $e^{tA}$ at $t = 1$ in two ways: from $\\det e^{A}$ and from the trace. Then state and prove the fact that a non-linear flow in the plane with $\\operatorname{div}f < 0$ everywhere shrinks areas, using the variational equation.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are solutions of a linear system independent at all times if they are at one time?',
              answerOutline: 'Evaluation at any time is an isomorphism, or equivalently, $\\det\\Phi$ is an exponential times a constant.',
            },
            {
              question: 'What does $\\Phi(t, s)$ do?',
              answerOutline: 'It maps the value of any solution at time $s$ to its value at time $t$.',
            },
            {
              question: 'When is $\\exp\\int A$ correct?',
              answerOutline: 'When the matrices $A(t)$ commute for all pairs of times, such as for constant $A$ or for scalars.',
            },
          ],
        },
        {
          slug: 'variation-of-constants',
          title: 'Variation of constants',
          summary:
            'The solution of a forced linear system is the free response plus an integral of responses to past forcing.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the variation of constants formula',
            'Use it to bound solutions under bounded forcing',
            'Find periodic solutions of a periodically forced linear system',
            'Use the formula in perturbation arguments',
          ],
          concepts: [
            'Variation of constants',
            'Duhamel formula',
            'Bounded input, bounded state',
            'Periodic forcing',
            'Non-resonance condition',
          ],
          explanation: `Consider $x' = A(t)x + g(t)$ with $A$ and $g$ continuous on $I$.

**Theorem.** The solution with $x(t_0) = x_0$ is

$$x(t) = \\Phi(t, t_0)x_0 + \\int_{t_0}^t\\Phi(t, s)g(s)\\,ds.$$

*Derivation.* Substitute $x = \\Phi(t)c(t)$, with $\\Phi$ a fundamental matrix. Then $x' = A\\Phi c + \\Phi c' = Ax + \\Phi c'$, so we need $\\Phi c' = g$, that is $c' = \\Phi(t)^{-1}g(t)$. Integrate, and use $x(t_0) = \\Phi(t_0)c(t_0)$. $\\square$

For constant $A$ this is

$$x(t) = e^{(t-t_0)A}x_0 + \\int_{t_0}^te^{(t-s)A}g(s)\\,ds.$$

Each small input $g(s)\\,ds$ travels forward under the free flow from time $s$ to time $t$, and all of these are added. It generalises the convolution formula, and it works just as well when $g$ depends on $x$, giving an integral equation:

$$x' = Ax + N(t, x) \\quad\\Longrightarrow\\quad x(t) = e^{(t-t_0)A}x_0 + \\int_{t_0}^te^{(t-s)A}N(s, x(s))\\,ds.$$

Combined with Gronwall, this form is how one proves that small non-linear terms do not destroy a stable linear system.

**Worked example.** Let $A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$, $g = (0, 1)^T$, $x(0) = 0$. From the last lesson's calculation, $e^{sA} = \\begin{pmatrix} \\cos s & \\sin s \\\\ -\\sin s & \\cos s \\end{pmatrix}$. Substituting $u = t - s$ in the integral,

$$x(t) = \\int_0^te^{uA}\\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}du = \\int_0^t\\begin{pmatrix} \\sin u \\\\ \\cos u \\end{pmatrix}du = \\begin{pmatrix} 1 - \\cos t \\\\ \\sin t \\end{pmatrix}.$$

Check: $x_1' = \\sin t = x_2$, and $x_2' = \\cos t = -x_1 + 1$. The forcing moves the centre of the circular motion to the new equilibrium $(1, 0)$.

**Bounded forcing.** If $\\|e^{tA}\\| \\leq Ce^{-at}$ for $t \\geq 0$ with $a > 0$, and $|g(t)| \\leq G$ for $t \\geq 0$, then

$$|x(t)| \\leq Ce^{-at}|x_0| + \\int_0^tCe^{-a(t-s)}G\\,ds \\leq Ce^{-at}|x_0| + \\frac{CG}{a}.$$

So a stable linear system turns bounded input into bounded state. Without stability this is false: a pure resonance grows without bound under a bounded input, as the exercises show.

**Periodic forcing.** Let $g$ have period $T$ and $A$ be constant. A solution is $T$-periodic exactly when $x(T) = x(0)$, by uniqueness, because $x(t + T)$ solves the same equation. From the formula, that condition reads

$$(I - e^{TA})x_0 = \\int_0^Te^{(T-s)A}g(s)\\,ds.$$

If 1 is not an eigenvalue of $e^{TA}$, equivalently no eigenvalue of $A$ has the form $2\\pi ik/T$ with $k$ an integer, there is exactly one periodic solution. This is the non-resonance condition, in its general form.`,
          resources: [
            teschl('The section on the inhomogeneous linear equation.'),
            mit18034('The lecture notes on inhomogeneous equations.'),
          ],
          exercises: [
            {
              slug: 'resonant-forcing',
              title: 'Resonant forcing',
              prompt: `For $A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$ and $g(t) = (0, \\cos\\omega t)^T$, $x(0) = 0$, compute $x(t)$ by the formula for $\\omega \\neq 1$, and for $\\omega = 1$. In the second case show that $x_1(t) = \\frac12t\\sin t$. Identify the eigenvalues of $A$ that cause the resonance.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'bibo-sharp',
              title: 'Bounded input, bounded state',
              prompt: `Prove the bounded forcing estimate. Then prove that if in addition $g(t) \\to 0$ as $t \\to \\infty$, then $x(t) \\to 0$. Show by a scalar example that $g(t) \\to 0$ alone is not sufficient when $a = 0$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Split the integral at $t/2$. In the example, try $x\' = 1/(1 + t)$.',
            },
            {
              slug: 'periodic-solution',
              title: 'A periodic solution',
              prompt: `For the scalar equation $x' = -x + \\cos t$, use the formula to find the unique $2\\pi$-periodic solution, and show that every solution approaches it. Then for $x' = x + \\cos t$, find the periodic solution, and show that it is unstable. Why does the formula with $(I - e^{TA})^{-1}$ work in both cases?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'perturbed-stable-system',
              title: 'A perturbed stable system',
              prompt: `Let $\\|e^{tA}\\| \\leq Ce^{-at}$ with $a > 0$, and let $B(t)$ be continuous with $\\|B(t)\\| \\leq \\beta$. Use variation of constants and Gronwall, on the function $e^{at}|x(t)|$, to prove that every solution of $x' = (A + B(t))x$ satisfies $|x(t)| \\leq C|x_0|e^{-(a - C\\beta)t}$. Conclude that small enough perturbations keep the system exponentially stable.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the meaning of the term $\\Phi(t, s)g(s)$ in the formula?',
              answerOutline: 'The input at time $s$ carried to time $t$ by the free dynamics.',
            },
            {
              question: 'When does a linear system with $T$-periodic forcing have a unique $T$-periodic solution?',
              answerOutline: 'When $I - e^{TA}$ is invertible, meaning that no eigenvalue of $A$ equals $2\\pi ik/T$.',
            },
            {
              question: 'Why is $x(T) = x(0)$ enough for a periodic solution?',
              answerOutline: 'Since $g$ is periodic, $x(t + T)$ solves the same equation with the same initial value, so uniqueness gives $x(t + T) = x(t)$.',
            },
          ],
        },
        {
          slug: 'floquet-theory',
          title: 'Floquet theory',
          summary:
            'Linear systems with periodic coefficients reduce to constant coefficients through a periodic change of variables, and the monodromy matrix decides stability.',
          estimatedMinutes: 130,
          objectives: [
            'State the Floquet representation theorem',
            'Compute the monodromy matrix and the Floquet multipliers',
            'Relate multipliers to stability',
            'Analyse Hill\'s equation through the trace of the monodromy matrix',
            'Explain why frozen-time eigenvalues do not decide stability',
          ],
          concepts: [
            'Periodic coefficients',
            'Monodromy matrix',
            'Floquet multiplier',
            'Floquet exponent',
            'Hill\'s equation',
            'Parametric resonance',
          ],
          explanation: `Let $A$ be continuous with period $T$, so $A(t + T) = A(t)$. Solutions of $x' = A(t)x$ are not usually periodic, but the equation has a symmetry: if $\\Phi(t)$ is a fundamental matrix, so is $\\Phi(t + T)$. Hence there is a constant invertible $C$ with $\\Phi(t + T) = \\Phi(t)C$.

Take $\\Phi(0) = I$. Then $C = \\Phi(T) =: M$, the **monodromy matrix**, and $\\Phi(t + kT) = \\Phi(t)M^k$. Everything about long-term behaviour is in the powers of $M$. Its eigenvalues are the **Floquet multipliers**. A different choice of fundamental matrix changes $M$ only by similarity, so the multipliers are well defined.

**Theorem (Floquet).** There exists a complex matrix $B$ with $e^{TB} = M$, and then $P(t) = \\Phi(t)e^{-tB}$ is $T$-periodic, so

$$\\Phi(t) = P(t)e^{tB}.$$

*Proof.* Every invertible complex matrix has a logarithm, by Jordan form. Then $P(t + T) = \\Phi(t)Me^{-TB}e^{-tB} = P(t)$. $\\square$

The substitution $x = P(t)y$ turns the system into $y' = By$, with constant coefficients. A real $B$ may not exist with period $T$, but $M^2$ has a real logarithm, so one exists with period $2T$. Numbers $\\rho$ with $e^{\\rho T} = \\mu$, for a multiplier $\\mu$, are **Floquet exponents**.

**Stability.** If all $|\\mu| < 1$, every solution tends to 0 exponentially. If some $|\\mu| > 1$, some solution is unbounded. If all $|\\mu| \\leq 1$ and those of modulus 1 have only trivial Jordan blocks, all solutions are bounded. By Liouville, $\\det M = \\mu_1\\cdots\\mu_n = \\exp\\int_0^T\\operatorname{tr}A$.

**Worked example.** Take the scalar equation $x' = (a + b\\cos t)x$ with period $T = 2\\pi$. Then

$$\\Phi(t) = \\exp(at + b\\sin t) = \\underbrace{e^{b\\sin t}}_{P(t)}\\,e^{at}.$$

The multiplier is $\\mu = \\Phi(2\\pi) = e^{2\\pi a}$, and the exponent is $a$, the mean of the coefficient. The oscillating part only adds a bounded periodic factor. So all solutions decay exactly when $a < 0$, whatever the value of $b$. Note that $a + b\\cos t > 0$ for part of the time when $|b| > |a|$, and yet decay still happens.

**Hill's equation.** For $y'' + q(t)y = 0$ with $q$ $T$-periodic, the system has trace zero, so $\\mu_1\\mu_2 = 1$. The multipliers are the roots of $\\mu^2 - (\\operatorname{tr}M)\\mu + 1 = 0$. If $|\\operatorname{tr}M| < 2$, they are complex conjugates on the unit circle and all solutions are bounded. If $|\\operatorname{tr}M| > 2$, they are real with one outside the unit circle, and there are unbounded solutions. That is **parametric resonance**, the mechanism of pumping a swing by shifting your weight: stiffness is changed periodically, and energy enters.

**A warning.** The eigenvalues of the frozen matrix $A(t)$ do not decide stability. A periodic $A(t)$ can have eigenvalues with negative real part at every moment and still have growing solutions, as you will show in the exercises.`,
          resources: [
            teschl('The section on periodic linear systems and Floquet theory.'),
            wiki('Floquet_theory', 'Floquet theory', 'A concise statement of the theorem, for reference.'),
            mit18385('The lecture notes on weakly non-linear oscillators give a physical view of periodically driven systems.'),
          ],
          exercises: [
            {
              slug: 'multipliers-well-defined',
              title: 'Multipliers are well defined',
              prompt: `Let $\\Phi$ and $\\Psi$ be two fundamental matrices, with $\\Phi(t + T) = \\Phi(t)C_1$ and $\\Psi(t + T) = \\Psi(t)C_2$. Prove that $C_1$ and $C_2$ are similar. Then prove that $\\mu$ is a multiplier if and only if there is a non-zero solution with $x(t + T) = \\mu x(t)$ for all $t$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'stability-theorem',
              title: 'Multipliers and stability',
              prompt: `Using $\\Phi(t) = P(t)e^{tB}$ with $P$ continuous and periodic, prove that (a) if all $|\\mu| < 1$, then $\\|\\Phi(t)\\| \\leq Ce^{-ct}$ for some $c > 0$; (b) if some $|\\mu| > 1$, then an unbounded solution exists; (c) the trivial solution is stable if and only if all $|\\mu| \\leq 1$ and multipliers of modulus 1 have only trivial Jordan blocks.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'frozen-eigenvalues',
              title: 'Frozen eigenvalues mislead',
              prompt: `Let
$$A(t) = \\begin{pmatrix} -1 + \\frac32\\cos^2 t & 1 - \\frac32\\sin t\\cos t \\\\ -1 - \\frac32\\sin t\\cos t & -1 + \\frac32\\sin^2 t \\end{pmatrix}.$$
Show that for every $t$ the eigenvalues of $A(t)$ are $\\frac14(-1 \\pm i\\sqrt{7})$. Show that $x(t) = e^{t/2}(\\cos t, -\\sin t)^T$ is a solution. Find both Floquet multipliers, given that $T = \\pi$ is a period of $A$, using Liouville for the second one.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mathieu-tongues',
              title: 'Mathieu stability chart',
              prompt: `For $y'' + (\\delta + \\epsilon\\cos t)y = 0$, integrate the matrix system over $[0, 2\\pi]$ with \`solve_ivp\` to get $M$, and compute $\\operatorname{tr}M$. Report whether the system is stable at $(\\delta, \\epsilon) = (0.25, 0.2)$, $(0.5, 0.2)$, $(1, 0.2)$, $(1, 0.8)$. Then colour the stable and unstable regions on $0 \\leq \\delta \\leq 2$, $0 \\leq \\epsilon \\leq 1$, and describe the tongues growing from $\\delta = n^2/4$.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use tight tolerances. Check $\\det M = 1$ as a test of accuracy.',
            },
            {
              slug: 'constant-coefficient-case',
              title: 'Check on a constant coefficient',
              prompt: `Treat $y'' + \\omega^2y = 0$ as a Hill equation with an arbitrary period $T$. Find $M$, $\\operatorname{tr}M$ and the multipliers. For which $\\omega$ does $|\\operatorname{tr}M| = 2$? What is special about those values, and what does this suggest about where the Mathieu tongues start?`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the monodromy matrix?',
              answerOutline: 'The fundamental matrix with $\\Phi(0) = I$, evaluated at one period: $M = \\Phi(T)$.',
            },
            {
              question: 'Why do multipliers come in reciprocal pairs for Hill\'s equation?',
              answerOutline: 'The trace of the system is 0, so Liouville gives $\\det M = 1$.',
            },
            {
              question: 'What does Floquet\'s theorem say in one sentence?',
              answerOutline: 'A periodic linear system is equivalent, through a periodic change of variables, to a constant-coefficient system.',
            },
          ],
        },
      ],
      project: {
        slug: 'parametric-resonance-chart',
        title: 'A parametric resonance chart',
        description: `Produce a publication-quality stability chart for a periodically driven system. Start with the Mathieu equation, then add damping: $y'' + cy' + (\\delta + \\epsilon\\cos t)y = 0$. Show from Liouville's formula how damping changes the multipliers, compute the chart, and compare the boundary of the first tongue with a perturbation estimate that you derive yourself.`,
        deliverables: [
          'Code computing the monodromy matrix by integrating the matrix system, with a test on a constant-coefficient case and a check of Liouville\'s formula',
          'A stability chart for $c = 0$ and for one positive $c$, at a resolution of at least $200 \\times 200$',
          'A short derivation showing that with damping $\\det M = e^{-2\\pi c}$, and why the tongues lift off the $\\delta$-axis',
          'A perturbation estimate of the boundary near $\\delta = 1/4$ for small $\\epsilon$, compared with the numerics',
          'A time-domain demonstration of one stable and one unstable point',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'stability',
      title: 'Stability',
      description:
        'Define stability precisely, settle it for linear systems, prove Lyapunov\'s theorems, and use linearisation with its limits, ending with the Hartman-Grobman theorem.',
      lessons: [
        {
          slug: 'stability-of-equilibria',
          title: 'Stability of equilibria',
          summary:
            'Precise definitions of stable, attractive and asymptotically stable, and a complete answer for linear systems.',
          estimatedMinutes: 110,
          objectives: [
            'State the definitions, with their quantifiers',
            'Give an example of an attractive equilibrium that is not stable',
            'Prove the eigenvalue criteria for linear systems',
            'Use the Routh-Hurwitz test in low dimensions',
          ],
          concepts: [
            'Lyapunov stability',
            'Attractivity',
            'Asymptotic stability',
            'Exponential stability',
            'Semisimple eigenvalue',
            'Routh-Hurwitz criterion',
          ],
          explanation: `Let $f$ be locally Lipschitz near $0$ with $f(0) = 0$, and consider the autonomous system $x' = f(x)$. Let $\\varphi_t(x_0)$ be the solution with $\\varphi_0(x_0) = x_0$.

The origin is **stable** if for every $\\epsilon > 0$ there is a $\\delta > 0$ such that $|x_0| < \\delta$ implies that $\\varphi_t(x_0)$ exists for all $t \\geq 0$ and satisfies $|\\varphi_t(x_0)| < \\epsilon$.

It is **attractive** if there is an $\\eta > 0$ such that $|x_0| < \\eta$ implies $\\varphi_t(x_0) \\to 0$ as $t \\to \\infty$. It is **asymptotically stable** if it is stable and attractive. It is **exponentially stable** if there are $C, c, \\eta > 0$ with $|\\varphi_t(x_0)| \\leq Ce^{-ct}|x_0|$ for $|x_0| < \\eta$ and $t \\geq 0$. **Unstable** means not stable.

Stable is a statement about all times, attractive only about the limit. Neither implies the other.

**Worked example.** Consider the flow on the circle given by $\\theta' = 1 - \\cos\\theta$, with $\\theta$ taken modulo $2\\pi$. The only equilibrium is $\\theta = 0$, since $1 - \\cos\\theta \\geq 0$ vanishes only there. Starting at a small $\\theta_0 > 0$, the angle increases and tends to $2\\pi$, which is the same point as $0$. Starting at a small $\\theta_0 < 0$, it increases to 0. So every solution tends to the equilibrium: it is attractive, globally. But it is not stable. A solution from a tiny $\\theta_0 > 0$ travels all the way round the circle, reaching $\\theta = \\pi$ on the way, however small $\\theta_0$ is. So the $\\epsilon$ in the definition cannot be met when $\\epsilon < \\pi$.

To build this in the plane, use polar coordinates with $r' = r(1 - r)$ and $\\theta' = 1 - \\cos\\theta$, where the point $(1, 0)$ is attractive and unstable.

Conversely $x' = 0$ is stable but not attractive, and so is the rotation $x_1' = x_2$, $x_2' = -x_1$.

**Theorem (linear systems).** For $x' = Ax$:

1. The origin is asymptotically stable if and only if every eigenvalue has $\\operatorname{Re}\\lambda < 0$, and then it is exponentially stable.
2. It is stable if and only if every eigenvalue has $\\operatorname{Re}\\lambda \\leq 0$ and each eigenvalue with $\\operatorname{Re}\\lambda = 0$ is **semisimple**, meaning its Jordan blocks all have size 1.

These follow from the form $t^je^{\\lambda t}$ of the entries of $e^{tA}$. A non-trivial block at $\\operatorname{Re}\\lambda = 0$ gives polynomial growth. For example, $A = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ has both eigenvalues 0, and $e^{tA}x_0 = (x_{0,1} + tx_{0,2}, x_{0,2})^T$ is unbounded when $x_{0,2} \\neq 0$. So the origin is unstable despite having no eigenvalue with positive real part.

You need not compute eigenvalues to apply part 1. The **Routh-Hurwitz** conditions read stability from the coefficients of the characteristic polynomial. For $\\lambda^2 + a\\lambda + b$, the conditions are $a, b > 0$. For $\\lambda^3 + a\\lambda^2 + b\\lambda + c$, they are $a > 0$, $c > 0$ and $ab > c$.`,
          resources: [
            teschl('The chapter on dynamical systems: stability of fixed points.'),
            mit18034('The lecture on stability, and the later one on almost linear systems.'),
            strogatz('The lectures on one-dimensional flows and linear systems, for intuition.'),
          ],
          exercises: [
            {
              slug: 'prove-linear-criteria',
              title: 'Prove the linear criteria',
              prompt: `Prove both parts of the theorem on linear systems. For the "only if" directions, construct an explicit solution that does not decay or is unbounded, from an eigenvector or generalised eigenvector. Treat the case of complex eigenvalues of a real matrix carefully.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'linear-equivalences',
              title: 'Equivalences for linear systems',
              prompt: `For $x' = Ax$, prove: (a) the origin is stable if and only if all solutions are bounded on $[0, \\infty)$; (b) attractive implies asymptotically stable, and implies exponentially stable. So the example of attractive without stable cannot be linear.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'circle-example',
              title: 'The circle example, in detail',
              prompt: `Solve $\\theta' = 1 - \\cos\\theta$ explicitly on $(0, 2\\pi)$ using $u = \\cot(\\theta/2)$: show that $u' = -1$, so $\\cot(\\theta(t)/2) = \\cot(\\theta_0/2) - t$. Hence find the time for a solution from $\\theta_0 \\in (0, \\pi)$ to reach $\\theta = \\pi$. Show that this time tends to infinity as $\\theta_0 \\to 0^+$, and yet every such solution does reach $\\theta = \\pi$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'nonautonomous-decay',
              title: 'Asymptotic but not exponential',
              prompt: `Show that $x' = -x^3$ has an asymptotically stable origin which is not exponentially stable, by solving it. Then show that the time-dependent equation $x' = -x/(1 + t)$ has zero solution attracting all solutions at the rate $1/(1 + t)$, but not exponentially. Why would this second case be impossible for an autonomous linear equation?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'routh-hurwitz-cubic',
              title: 'Routh-Hurwitz for a cubic',
              prompt: `Prove that all roots of $\\lambda^3 + a\\lambda^2 + b\\lambda + c$, with real coefficients, have negative real part if and only if $a > 0$, $c > 0$ and $ab > c$. Use the fact that as the coefficients vary continuously, a root can enter the right half-plane only by passing through the imaginary axis. Apply it to $y''' + 2y'' + ky' + y = 0$, and find the range of $k$ for which every solution tends to 0.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Roots on the imaginary axis of a real cubic with $c \\neq 0$ occur only if $\\lambda^2 = -b$ and $ab = c$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the definition of Lyapunov stability with quantifiers.',
              answerOutline: 'For every $\\epsilon > 0$ there is $\\delta > 0$ such that $|x_0| < \\delta$ implies $|\\varphi_t(x_0)| < \\epsilon$ for all $t \\geq 0$.',
            },
            {
              question: 'Why is the eigenvalue 0 of $\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ a problem, but the eigenvalue 0 of the zero matrix is not?',
              answerOutline: 'In the first case the eigenvalue is not semisimple, which gives growth linear in $t$. In the second it is semisimple, so solutions are constant.',
            },
            {
              question: 'What is the difference between attractive and asymptotically stable?',
              answerOutline: 'Asymptotically stable also requires stability, so orbits that start close stay close on the way in.',
            },
          ],
        },
        {
          slug: 'lyapunov-functions',
          title: 'Lyapunov functions',
          summary:
            'Prove stability with no knowledge of the solutions, by finding a function that decreases along them.',
          estimatedMinutes: 130,
          objectives: [
            'State and prove Lyapunov\'s theorems on stability and asymptotic stability',
            'Construct Lyapunov functions from energy and from quadratic forms',
            'Apply LaSalle\'s invariance principle when $\\dot V$ is only semi-definite',
            'Prove global asymptotic stability using radial unboundedness',
          ],
          concepts: [
            'Lyapunov function',
            'Orbital derivative $\\dot V$',
            'Positive definite function',
            'LaSalle invariance principle',
            'Radially unbounded function',
            'Basin of attraction',
          ],
          explanation: `Let $f$ be locally Lipschitz on an open set $U \\ni 0$ with $f(0) = 0$. For a $C^1$ function $V : U \\to \\mathbb{R}$, the **orbital derivative** is $\\dot V(x) = \\nabla V(x)\\cdot f(x)$, the rate of change of $V$ along solutions.

**Theorem (Lyapunov).** Suppose $V(0) = 0$ and $V(x) > 0$ for $x \\neq 0$ in $U$. If $\\dot V \\leq 0$ on $U$, the origin is stable. If $\\dot V < 0$ on $U \\setminus \\{0\\}$, it is asymptotically stable.

*Proof of stability.* Given small $\\epsilon > 0$ with the closed ball $\\bar B_\\epsilon \\subset U$, let $m = \\min_{|x| = \\epsilon}V > 0$. By continuity there is $\\delta < \\epsilon$ with $V < m$ on $B_\\delta$. If $|x_0| < \\delta$, then $V(\\varphi_t(x_0)) \\leq V(x_0) < m$ as long as the solution exists in $U$, so it cannot reach the sphere $|x| = \\epsilon$. It remains in a compact set, and so it exists for all $t \\geq 0$.

*Proof of attraction.* With strict decrease, $V(\\varphi_t(x_0))$ decreases to a limit $c \\geq 0$. If $c > 0$, the orbit stays in the compact set $\\{c \\leq V\\} \\cap \\bar B_\\epsilon$, which avoids 0, and there $\\dot V \\leq -d < 0$. This drives $V$ to $-\\infty$, a contradiction. So $V \\to 0$. Since $V$ is continuous and positive away from 0 on a compact ball, it follows that $\\varphi_t(x_0) \\to 0$. $\\square$

**Theorem (LaSalle, statement).** Let $K$ be compact and positively invariant, $V$ a $C^1$ function with $\\dot V \\leq 0$ on $K$, and $S$ the largest invariant subset of $\\{x \\in K : \\dot V(x) = 0\\}$. Then every solution starting in $K$ tends to $S$.

**Worked example.** The damped pendulum is

$$x' = y, \\qquad y' = -\\sin x - cy, \\qquad c > 0.$$

Take the energy $V(x, y) = \\frac12y^2 + 1 - \\cos x$. Near the origin it is positive except at 0. Compute

$$\\dot V = (\\sin x)\\,y + y(-\\sin x - cy) = -cy^2 \\leq 0.$$

So the origin is stable. But $\\dot V = 0$ on the whole line $y = 0$, so Lyapunov's theorem does not give attraction. Use LaSalle. Let $K = \\{V \\leq a\\}$ near the origin, with $0 < a < 2$, taking the component with $|x| < \\pi$. It is compact, and it is positively invariant since $V$ does not increase. In $K$, $\\dot V = 0$ forces $y = 0$. An invariant set inside $\\{y = 0\\}$ needs $y' = 0$ too, so $\\sin x = 0$, so $x = 0$ in $K$. Thus $S = \\{0\\}$, and every solution in $K$ tends to the origin. It is asymptotically stable.

**Global results.** If $U = \\mathbb{R}^n$, $\\dot V < 0$ for $x \\neq 0$ and $V$ is **radially unbounded**, meaning $V(x) \\to \\infty$ as $|x| \\to \\infty$, then all solutions tend to 0. This makes every sublevel set compact.

Good first guesses for $V$ are physical energy and weighted sums of squares.`,
          resources: [
            teschl('The sections on Lyapunov\'s method and on the invariance principle.'),
            wiki('LaSalle%27s_invariance_principle', "LaSalle's invariance principle", 'A statement of the principle with the standard pendulum example, for comparison with the lesson.'),
            strogatz('The lectures on phase plane methods include Liapunov functions and gradient systems.'),
          ],
          exercises: [
            {
              slug: 'write-lyapunov-proof',
              title: 'Write the proof in full',
              prompt: `Write complete proofs of both parts of Lyapunov's theorem. Justify each use of compactness. Explain why the argument gives existence for all $t \\geq 0$ as a by-product.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'nonlinear-rotation',
              title: 'A non-linear rotation',
              prompt: `For $x' = -y - x^3$, $y' = x - y^3$, show with $V = x^2 + y^2$ that the origin is globally asymptotically stable, although the linearisation is a center. Prove that the decay is not exponential by finding a lower bound for $V$ along solutions.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use $x^4 + y^4 \\leq (x^2 + y^2)^2$ to bound $\\dot V$ from below.',
            },
            {
              slug: 'nonlinear-damping-lasalle',
              title: 'Non-linear damping',
              prompt: `Consider $x'' + (x')^3 + x = 0$. Write it as a system, show that $V = \\frac12(x^2 + y^2)$ has $\\dot V = -y^4$, and use LaSalle to prove global asymptotic stability. Explain why the linearisation says nothing here. Confirm numerically that the amplitude decays, and estimate the decay law from the data.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gradient-systems',
              title: 'Gradient systems',
              prompt: `Let $U$ be $C^2$ on $\\mathbb{R}^n$, and let $x' = -\\nabla U(x)$. Show that $U$ decreases along solutions. Prove that a strict local minimum which is an isolated critical point is asymptotically stable. Prove that a gradient system in the plane has no non-constant periodic orbits. Apply this to $U = x^4/4 - x^2/2 + y^2/2$: find the critical points, and classify them.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'unbounded-sublevel-sets',
              title: 'Why radial unboundedness is needed',
              prompt: `Let $u = 1 + x^2$ and consider $x' = -6x/u^2 + 2y$, $y' = -2(x + y)/u^2$, with $V = x^2/u + y^2$. (a) Show that $\\dot V = -12x^2/u^4 - 4y^2/u^2$, so that $V$ is positive definite with negative definite derivative, and the origin is asymptotically stable. (b) Show that $V$ is not radially unbounded: the set $\\{V \\leq c\\}$ is unbounded when $c \\geq 1$. (c) Show that on the curve $y = 2/(x - \\sqrt{2})$ with $x > \\sqrt{2}$, the vector field points into the region above the curve, so that no orbit starting there reaches the origin. (d) Integrate from $(2, 4)$ numerically, and describe what the orbit does.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), compute the derivative of $F = y - 2/(x - \\sqrt{2})$ along the field on the curve $F = 0$, and simplify using $y(x - \\sqrt{2}) = 2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does one not need solutions to compute $\\dot V$?',
              answerOutline: 'By the chain rule $\\dot V = \\nabla V\\cdot f$, which is a function of $x$ alone.',
            },
            {
              question: 'What does LaSalle add to Lyapunov\'s theorem?',
              answerOutline: 'Asymptotic conclusions when $\\dot V$ is only non-positive, by looking at invariant subsets of $\\{\\dot V = 0\\}$.',
            },
            {
              question: 'In the pendulum example, why is the energy not enough on its own?',
              answerOutline: 'Its derivative $-cy^2$ vanishes on the line $y = 0$, not just at the origin, so it is not negative definite.',
            },
          ],
        },
        {
          slug: 'linearisation',
          title: 'Linearisation and the Lyapunov equation',
          summary:
            'Prove that a linear part with eigenvalues in the left half-plane decides stability, using a quadratic Lyapunov function.',
          estimatedMinutes: 120,
          objectives: [
            'Solve the Lyapunov equation $A^TP + PA = -I$',
            'Prove the linearised stability theorem',
            'State the instability theorem and give undecided examples',
            'Estimate a region of attraction from a quadratic Lyapunov function',
          ],
          concepts: [
            'Linearisation at an equilibrium',
            'Lyapunov equation',
            'Quadratic form',
            'Exponential stability',
            'Critical cases',
            'Estimate of the basin',
          ],
          explanation: `Let $f$ be $C^1$ near 0 with $f(0) = 0$, and write $f(x) = Ax + g(x)$ with $A = Df(0)$, so that $|g(x)|/|x| \\to 0$ as $x \\to 0$.

**Theorem.** If every eigenvalue of $A$ has $\\operatorname{Re}\\lambda < 0$, the origin is exponentially stable for $x' = f(x)$.

*Proof.* Since $\\|e^{tA}\\| \\leq Ce^{-at}$ with $a > 0$, the integral

$$P = \\int_0^\\infty e^{tA^T}e^{tA}\\,dt$$

converges. It is symmetric, and positive definite since $x^TPx = \\int_0^\\infty|e^{tA}x|^2\\,dt > 0$ for $x \\neq 0$. It solves the **Lyapunov equation**:

$$A^TP + PA = \\int_0^\\infty\\frac{d}{dt}\\left(e^{tA^T}e^{tA}\\right)dt = -I.$$

Let $V(x) = x^TPx$, and let $0 < \\lambda_-\\leq\\lambda_+$ be the smallest and largest eigenvalues of $P$. Then along solutions

$$\\dot V = x^T(A^TP + PA)x + 2x^TPg(x) = -|x|^2 + 2x^TPg(x).$$

Choose $r > 0$ with $|g(x)| \\leq |x|/(4\\lambda_+)$ for $|x| \\leq r$. Since $\\|P\\| = \\lambda_+$, this gives $\\dot V \\leq -\\frac12|x|^2 \\leq -\\frac{1}{2\\lambda_+}V$. So $V(\\varphi_t) \\leq V(x_0)e^{-t/(2\\lambda_+)}$ as long as the orbit stays in the ball, and this is ensured for small $x_0$ since $V$ decreases. Finally $\\lambda_-|x|^2 \\leq V \\leq \\lambda_+|x|^2$ turns this into exponential decay of $|x|$. $\\square$

The linear part wins because near 0 the term $g$ is small compared with $|x|$, and the quadratic form $V$ is designed for $A$, not for the Euclidean norm, in which solutions may at first grow.

**Instability (statement).** If some eigenvalue of $A$ has $\\operatorname{Re}\\lambda > 0$, the origin is unstable.

**Critical cases.** If the eigenvalues have $\\operatorname{Re}\\lambda \\leq 0$, with some on the imaginary axis, the linear part does not decide. The equations $x' = x^3$ and $x' = -x^3$ have the same linearisation, and one is unstable while the other is asymptotically stable.

**Worked example.** Consider

$$x_1' = x_2, \\qquad x_2' = -2x_1 - 3x_2 + x_1^3.$$

Here $A = \\begin{pmatrix} 0 & 1 \\\\ -2 & -3 \\end{pmatrix}$, with eigenvalues $-1, -2$. Solve $A^TP + PA = -I$ with $P = \\begin{pmatrix} p & q \\\\ q & s \\end{pmatrix}$. The three entries give $-4q = -1$, $p - 3q - 2s = 0$ and $2q - 6s = -1$. So $q = s = \\frac14$ and $p = \\frac54$.

The eigenvalues of $P$ solve $\\lambda^2 - \\frac32\\lambda + \\frac14 = 0$, so $\\lambda_- \\approx 0.191$ and $\\lambda_+ \\approx 1.309$.

With $g = (0, x_1^3)^T$,

$$2x^TPg = \\frac12(x_1 + x_2)x_1^3, \\qquad\\text{so}\\quad \\dot V \\leq -|x|^2 + \\frac{\\sqrt{2}}{2}|x|^4.$$

This is negative for $0 < |x|^2 < \\sqrt{2}$. Any sublevel set $\\{V \\leq c\\}$ inside that disc is positively invariant and lies in the basin of attraction. Since $|x|^2 \\leq V/\\lambda_-$, any $c < \\sqrt{2}\\lambda_- \\approx 0.27$ will do. This is a rigorous estimate of the basin, which a numerical simulation could never give by itself. The true basin is larger. It is bounded by the stable curves of the saddles at $(\\pm\\sqrt{2}, 0)$.`,
          resources: [
            teschl('The sections on stability via linearisation.'),
            mit18034('The lectures on stability, almost linear systems and the methods of Lyapunov.'),
          ],
          exercises: [
            {
              slug: 'lyapunov-equation-solved',
              title: 'Solve a Lyapunov equation',
              prompt: `For $A = \\begin{pmatrix} -1 & 4 \\\\ 0 & -3 \\end{pmatrix}$, find the symmetric $P$ solving $A^TP + PA = -I$, by hand. Check that it is positive definite. Compare with \`scipy.linalg.solve_continuous_lyapunov\`, minding its sign and transpose convention. Show by example that $V = |x|^2$ does not itself decrease along all solutions for this $A$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'uniqueness-of-p',
              title: 'Uniqueness and convergence of $P$',
              prompt: `Assume all eigenvalues of $A$ have negative real part. Prove that the integral defining $P$ converges, that $A^TP + PA = -Q$ has the unique solution $P = \\int_0^\\infty e^{tA^T}Qe^{tA}\\,dt$ for each symmetric $Q$, and that $P$ is positive definite when $Q$ is. Conversely, prove that if some positive definite $P$ satisfies $A^TP + PA = -I$, then all eigenvalues have negative real part.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'one-dimensional-basin',
              title: 'Exact versus estimated basin',
              prompt: `For $x' = -x + x^2$, find the exact basin of attraction of 0 by solving or from the phase line. Use $V = x^2$ to obtain the largest interval around 0 on which $\\dot V < 0$, and compare. Then for $x' = -x + x^3$, do the same.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'saddle-instability',
              title: 'A proof of instability',
              prompt: `Let $x' = x + g_1(x, y)$, $y' = -y + g_2(x, y)$ with $g_1, g_2$ being $C^1$ and $o(r)$ as $r = \\sqrt{x^2 + y^2} \\to 0$. Let $V = x^2 - y^2$. Prove that in the sector $x > |y|$ near 0, $\\dot V > 0$. Use this to prove that the origin is unstable: an orbit starting in the sector cannot leave it through $|y| = x$, and $V$ grows until the orbit leaves a small ball.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'center-perturbation',
              title: 'A critical case both ways',
              prompt: `For $x_1' = x_2 + ax_1(x_1^2 + x_2^2)$, $x_2' = -x_1 + ax_2(x_1^2 + x_2^2)$, show that the eigenvalues at 0 are $\\pm i$ for all $a$, and determine stability for $a > 0$, $a = 0$ and $a < 0$. Use the Lyapunov function $V = x_1^2 + x_2^2$.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $P$ defined by that integral a natural choice?',
              answerOutline: '$x^TPx$ is the total squared size of the linear solution from $x$ over all future time, so it must fall along solutions.',
            },
            {
              question: 'What does the linearisation theorem not tell you?',
              answerOutline: 'Anything in the critical case, where an eigenvalue has real part 0. It also says nothing about the size of the basin.',
            },
            {
              question: 'Why might solutions of a stable linear system grow at first?',
              answerOutline: 'If $A$ is non-normal, $\\|e^{tA}\\|$ can exceed 1 for small $t$. The constant $C$ in the bound exceeds 1.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/systems-of-odes-and-phase-plane'],
        },
        {
          slug: 'hartman-grobman',
          title: 'The Hartman-Grobman theorem',
          summary:
            'Near a hyperbolic equilibrium, a non-linear flow is a continuous deformation of its linearisation. The theorem is stated with care and tested on examples.',
          estimatedMinutes: 100,
          objectives: [
            'State the Hartman-Grobman theorem with its hypotheses',
            'Explain the meaning of topological conjugacy',
            'Compute stable and unstable manifolds in simple examples',
            'Give examples that show why hyperbolicity is required and why the conjugacy is only continuous',
          ],
          concepts: [
            'Hyperbolic equilibrium',
            'Topological conjugacy',
            'Stable manifold',
            'Unstable manifold',
            'Stable manifold theorem',
          ],
          explanation: `An equilibrium $p$ of $x' = f(x)$ is **hyperbolic** if no eigenvalue of $Df(p)$ lies on the imaginary axis.

**Theorem (Hartman-Grobman, statement).** Let $f$ be $C^1$ on an open set containing a hyperbolic equilibrium $p$, let $\\varphi_t$ be its flow and $A = Df(p)$. Then there exist neighbourhoods $V$ of $p$ and $W$ of 0 and a homeomorphism $h : V \\to W$ with $h(p) = 0$, such that

$$h(\\varphi_t(x)) = e^{tA}h(x)$$

for every $x \\in V$ and every $t$ for which $\\varphi_s(x) \\in V$ for all $s$ between 0 and $t$.

So $h$ carries orbits of the non-linear system to orbits of the linear one, preserving time. It is a change of coordinates that is continuous with a continuous inverse. In general $h$ is not differentiable. This means that the theorem preserves the topology of the phase portrait, such as the number of stable directions, but not geometric details. For example, in the plane a stable node and a stable spiral are conjugate by a homeomorphism, as are $x' = -x$ and $x' = -2x$.

The companion result describes the invariant curves.

**Theorem (stable manifold, statement).** With $p$ hyperbolic and $f$ of class $C^1$, the set of points near $p$ whose forward orbits stay near $p$ and tend to $p$ is a $C^1$ manifold $W^s_{\\text{loc}}(p)$, tangent at $p$ to the stable subspace of $A$, of the same dimension. The same holds for the unstable manifold $W^u_{\\text{loc}}(p)$ in backward time.

**Worked example.** Consider

$$x' = x, \\qquad y' = -y + x^2.$$

At the origin $A = \\text{diag}(1, -1)$, so the equilibrium is a hyperbolic saddle. Here the conjugacy is explicit. Try $h(x, y) = (x, y - cx^2)$, and let $v = y - cx^2$. Then

$$v' = -y + x^2 - 2cx\\cdot x = -y + (1 - 2c)x^2 = -v + (1 - 3c)x^2.$$

Choosing $c = \\frac13$ gives $v' = -v$. So with $(u, v) = (x, y - x^2/3)$, the system becomes $u' = u$, $v' = -v$. The map $h$ is a global diffeomorphism, with inverse $(u, v) \\mapsto (u, v + u^2/3)$. Thus $h \\circ \\varphi_t = e^{tA} \\circ h$ on all of $\\mathbb{R}^2$.

Read off the invariant curves. In $(u, v)$ the stable manifold is the axis $u = 0$, and the unstable manifold is $v = 0$. In the original coordinates they are

$$W^s = \\{x = 0\\}, \\qquad W^u = \\{y = x^2/3\\},$$

tangent to the $y$-axis and the $x$-axis at 0, as the theorem says.

In this example $h$ happens to be smooth, which is exceptional. When eigenvalues satisfy resonance relations, such as $\\lambda_1 = 2\\lambda_2$, smooth linearisation can fail even for polynomial $f$.

Hyperbolicity is essential. With an eigenvalue on the imaginary axis, the non-linear terms decide the outcome, as in $x' = \\pm x^3$, whose flows are not conjugate to the linearised flow $x' = 0$. The conclusion is also local: Hartman-Grobman says nothing about what orbits do once they leave $V$.`,
          resources: [
            teschl('The chapter on local behaviour near fixed points covers both theorems.'),
            wiki('Hartman%E2%80%93Grobman_theorem', 'Hartman-Grobman theorem', 'A brief statement with references for the proof.'),
            strogatz('The lectures on two-dimensional flows discuss when linearisation can be trusted.'),
          ],
          exercises: [
            {
              slug: 'verify-explicit-conjugacy',
              title: 'Verify the conjugacy on the flow',
              prompt: `For the worked example, solve the system explicitly: find $\\varphi_t(x_0, y_0)$. Verify directly that $h(\\varphi_t(x_0, y_0)) = e^{tA}h(x_0, y_0)$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'stable-manifold-compute',
              title: 'Compute an invariant curve',
              prompt: `For $x' = -x$, $y' = y + x^2$, find the stable manifold of the origin exactly, as a graph $y = \\psi(x)$. Then for $x' = -x$, $y' = y + x^3$, do the same. Confirm with a numerical integration backward from a point near the origin on the curve you found.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Substitute $y = cx^2$ and match coefficients in the invariance equation $\\psi\'(x)x\' = y\'$.',
            },
            {
              slug: 'only-continuous',
              title: 'Conjugate, but not smoothly',
              prompt: `Show that $h(x) = x|x|$ is a homeomorphism of $\\mathbb{R}$ that conjugates the flow of $x' = x$ to that of $x' = 2x$. Then prove that no $C^1$ diffeomorphism with $h(0) = 0$ can conjugate these two flows, by differentiating the relation $h(e^tx) = e^{2t}h(x)$ at $x = 0$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'hyperbolicity-needed',
              title: 'Hyperbolicity is needed',
              prompt: `Show that the flows of $x' = x^3$ and $x' = 0$ on an interval around 0 are not topologically conjugate near 0. Then in the plane, show that $r' = r^3$, $\\theta' = 1$ and its linearisation at the origin are not conjugate, by comparing the behaviour of nearby orbits.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pendulum-saddle-manifolds',
              title: 'The inverted pendulum',
              prompt: `For $\\theta' = \\omega$, $\\omega' = -\\sin\\theta - b\\omega$ with $b = 1$, linearise at $(\\pi, 0)$ and find the eigenvalues and eigenvectors. Compute the unstable and stable manifolds numerically, by integrating from points slightly off the equilibrium along the eigenvectors, backward for the stable manifold. Plot them, and use the stable manifold to decide which initial angular velocities at $\\theta = 0$ lead to the first, second or third well.`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the theorem say, in words?',
              answerOutline: 'Near a hyperbolic equilibrium, there is a continuous change of coordinates turning the non-linear flow into its linearisation.',
            },
            {
              question: 'Why can a node and a spiral be topologically conjugate?',
              answerOutline: 'A homeomorphism may twist orbits. Rotation rate is a geometric feature that does not survive merely continuous maps.',
            },
            {
              question: 'What does hyperbolicity rule out, and why does that matter?',
              answerOutline: 'Eigenvalues on the imaginary axis, where the higher-order terms decide stability.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/systems-of-odes-and-phase-plane'],
        },
      ],
      project: {
        slug: 'lyapunov-basin-certificate',
        title: 'Certify a basin of attraction',
        description: `For a non-linear planar system with an asymptotically stable equilibrium, such as a damped pendulum with torque or a competition model, produce a rigorous estimate of the basin of attraction with a quadratic Lyapunov function, and compare it against the true basin found by simulation. Then improve the certificate.`,
        deliverables: [
          'The Lyapunov equation solved symbolically or numerically, with a check of the residual',
          'A proof that a stated sublevel set of $V$ is positively invariant and in the basin, with all estimates shown',
          'A plot of the certified sublevel set over a numerically computed true basin, with the stable manifolds of any saddles on the boundary',
          'A second certificate from a different $Q$ in $A^TP + PA = -Q$, optimised for the area of the certified region',
          'A paragraph on what the certificate proves that the simulation cannot',
        ],
        estimatedHours: 7,
        stretchGoals: ['Use a higher-degree polynomial $V$ and a sampling check, and state clearly what is and is not proved'],
      },
    },
    {
      slug: 'phase-plane-analysis',
      title: 'Phase Plane Analysis',
      description:
        'Flows and limit sets, criteria that rule periodic orbits in or out, the Poincaré-Bendixson theorem, and the basic local bifurcations.',
      lessons: [
        {
          slug: 'flows-and-limit-sets',
          title: 'Flows, orbits and limit sets',
          summary:
            'An autonomous equation defines a flow. The omega-limit set records where an orbit ends up, and it has strong properties when the orbit is bounded.',
          estimatedMinutes: 110,
          objectives: [
            'Prove the group property of the flow',
            'Define orbits, invariant sets and omega-limit sets',
            'Prove that a bounded forward orbit has a non-empty, compact, connected, invariant omega-limit set',
            'Compute limit sets in explicit examples',
          ],
          concepts: [
            'Flow $\\varphi_t$',
            'Group property',
            'Orbit',
            'Invariant set',
            'Omega-limit set',
            'Periodic orbit',
          ],
          explanation: `Let $f$ be locally Lipschitz on an open set $U \\subset \\mathbb{R}^n$, and write $\\varphi_t(x)$ for the value at time $t$ of the maximal solution of $x' = f(x)$ starting at $x$. Because the equation is autonomous, $t \\mapsto \\varphi_{t+s}(x)$ solves the same equation as $t \\mapsto \\varphi_t(\\varphi_s(x))$ and agrees with it at $t = 0$. Uniqueness gives the **group property**

$$\\varphi_{t+s}(x) = \\varphi_t(\\varphi_s(x))$$

wherever both sides are defined. The **orbit** of $x$ is the curve $\\{\\varphi_t(x)\\}$, and the forward orbit is the part with $t \\geq 0$. By uniqueness, two orbits are either disjoint or identical, so orbits partition $U$. An orbit that returns to its starting point, $\\varphi_T(x) = x$ with $T > 0$ and $x$ not an equilibrium, is a **periodic orbit**, a closed curve. A set $S$ is **invariant** if $x \\in S$ implies $\\varphi_t(x) \\in S$ for all $t$ where it is defined, and **positively invariant** if this holds for $t \\geq 0$.

The **omega-limit set** of $x$ is

$$\\omega(x) = \\{y : \\varphi_{t_k}(x) \\to y \\text{ for some sequence } t_k \\to \\infty\\}.$$

**Theorem.** If the forward orbit of $x$ lies in a compact set $K \\subset U$, then $\\omega(x)$ is non-empty, compact, connected and invariant, and $\\operatorname{dist}(\\varphi_t(x), \\omega(x)) \\to 0$ as $t \\to \\infty$.

*Sketch.* Non-empty: the sequence $\\varphi_k(x)$ has a convergent subsequence. Closed: $\\omega(x) = \\bigcap_{T}\\overline{\\{\\varphi_t(x) : t \\geq T\\}}$, an intersection of closed sets, contained in $K$. Invariant: if $\\varphi_{t_k}(x) \\to y$, then by continuity of $\\varphi_s$, $\\varphi_{t_k + s}(x) \\to \\varphi_s(y)$. Connected: if $\\omega(x)$ split into two separated compact pieces, the orbit would cross the gap between them infinitely often, giving a limit point in the gap. The distance claim also follows by compactness.

**Worked example.** In polar coordinates take $r' = r(1 - r^2)$ and $\\theta' = 1$. The radial equation separates. With $s = r^2$, it becomes $s' = 2s(1 - s)$, a logistic equation, so

$$r(t)^2 = \\frac{1}{1 + (r_0^{-2} - 1)e^{-2t}}, \\qquad r_0 > 0.$$

As $t \\to \\infty$, $r(t) \\to 1$, while $\\theta = \\theta_0 + t$ keeps turning. Every point of the unit circle is a limit of the orbit along a suitable sequence of times, the ones where $\\theta$ comes round to the right angle. So for every $x \\neq 0$, $\\omega(x)$ is the whole unit circle, which is a periodic orbit. For $x = 0$, $\\omega(0) = \\{0\\}$. In backward time, orbits from inside the circle tend to 0, and orbits from outside reach infinity at the finite negative time where $1 + (r_0^{-2} - 1)e^{-2t} = 0$.

Without compactness the theorem fails. For $x' = 1$ on $\\mathbb{R}$, every $\\omega(x)$ is empty. In dimension three or more, limit sets can be very complicated, as with the Lorenz attractor. In the plane, the next lessons show that they cannot.`,
          resources: [
            teschl('The chapter on dynamical systems: flows, orbits and limit sets.'),
            strogatz('The lectures on two-dimensional flows and limit cycles.'),
          ],
          exercises: [
            {
              slug: 'group-property',
              title: 'Prove the group property',
              prompt: `Prove $\\varphi_{t+s}(x) = \\varphi_t(\\varphi_s(x))$, including the statement about domains: if $\\varphi_s(x)$ is defined, then $t \\mapsto \\varphi_t(\\varphi_s(x))$ is defined exactly for $t + s$ in the maximal interval of $x$. Deduce that orbits are disjoint or equal, and that a solution with $\\varphi_T(x) = x$ for some $T > 0$ is periodic and defined for all $t$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'omega-properties',
              title: 'Properties of the omega-limit set',
              prompt: `Under the hypothesis of the theorem, write complete proofs that $\\omega(x)$ is non-empty, compact, invariant and connected, and that $\\operatorname{dist}(\\varphi_t(x), \\omega(x)) \\to 0$. Then give an example of an unbounded forward orbit in the plane whose omega-limit set is non-empty and not connected.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the example, think of an orbit that alternates between going far out to the left and far out to the right along two lines.',
            },
            {
              slug: 'torus-flow',
              title: 'A dense orbit on the torus',
              prompt: `On the torus $\\mathbb{R}^2/(2\\pi\\mathbb{Z})^2$, take $\\theta_1' = 1$, $\\theta_2' = \\alpha$ with $\\alpha$ irrational. Prove that every orbit is dense, so that $\\omega(x)$ is the whole torus. Explain why this does not contradict the Poincaré-Bendixson theorem in the next lesson.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Look at successive returns to the circle $\\theta_1 = 0$: they form the sequence $2\\pi k\\alpha$ modulo $2\\pi$.',
            },
            {
              slug: 'explicit-limit-sets',
              title: 'Limit sets in examples',
              prompt: `For $r' = r(1 - r)(2 - r)$, $\\theta' = 1$, find $\\omega(x)$ and $\\alpha(x)$, the backward limit set, for all starting radii. Identify which periodic orbits attract and which repel, and check the radial computation numerically in Cartesian coordinates.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can two distinct orbits never cross?',
              answerOutline: 'A common point would have two solutions through it, contradicting uniqueness.',
            },
            {
              question: 'What does $\\omega(x)$ describe?',
              answerOutline: 'The set of points the forward orbit approaches along sequences of times tending to infinity.',
            },
            {
              question: 'Why does the theorem need a compact set?',
              answerOutline: 'To extract convergent subsequences. Without it the orbit may escape and $\\omega(x)$ may be empty.',
            },
          ],
        },
        {
          slug: 'limit-cycles-and-dulac',
          title: 'Limit cycles and the Bendixson-Dulac criterion',
          summary:
            'Rule out periodic orbits with a divergence test, and decide the stability of a periodic orbit by integrating the divergence along it.',
          estimatedMinutes: 120,
          objectives: [
            'Define a limit cycle',
            'State and prove the Bendixson-Dulac criterion',
            'Use the index argument that a periodic orbit must surround an equilibrium',
            'Compute the non-trivial Floquet multiplier of a planar periodic orbit',
          ],
          concepts: [
            'Limit cycle',
            'Bendixson-Dulac criterion',
            'Dulac function',
            'Divergence',
            'Poincaré map',
            'Characteristic multiplier',
          ],
          explanation: `A **limit cycle** is a periodic orbit $\\gamma$ that is contained in $\\omega(x)$ or $\\alpha(x)$ for some $x \\notin \\gamma$. In other words nearby orbits spiral towards it or away from it. A center has periodic orbits that are not limit cycles.

**Theorem (Bendixson-Dulac).** Let $D \\subset \\mathbb{R}^2$ be open and simply connected, let $f = (P, Q)$ be $C^1$ on $D$, and let $B$ be $C^1$ on $D$. If $\\operatorname{div}(Bf) = (BP)_x + (BQ)_y$ does not change sign in $D$ and is not identically zero on any open subset, then $D$ contains no periodic orbit.

*Proof.* Suppose $\\gamma \\subset D$ is a periodic orbit, and let $\\Omega$ be the region it encloses, which lies in $D$ because $D$ is simply connected. Green's theorem gives

$$\\iint_\\Omega\\operatorname{div}(Bf)\\,dA = \\oint_\\gamma B(P\\,dy - Q\\,dx).$$

On $\\gamma$, $dx = P\\,dt$ and $dy = Q\\,dt$, so the integrand on the right is $B(PQ - QP)\\,dt = 0$. The left side is non-zero by hypothesis, a contradiction. $\\square$

A second constraint comes from index theory: **a periodic orbit of a planar $C^1$ field must enclose at least one equilibrium.** So a simply connected region without equilibria contains no periodic orbits.

**Stability of a periodic orbit.** Take a short segment $\\Sigma$ crossing $\\gamma$ transversally. The **Poincaré map** sends a point of $\\Sigma$ to the next point where its orbit crosses $\\Sigma$. Its derivative at $\\gamma$ is the non-trivial Floquet multiplier of the variational equation along $\\gamma$, and in the plane it has a formula. If $\\gamma$ has period $T$,

$$\\mu = \\exp\\int_0^T\\operatorname{div}f(\\gamma(t))\\,dt.$$

The cycle is orbitally asymptotically stable if $\\mu < 1$, and unstable if $\\mu > 1$. This comes from Liouville's formula, since the other multiplier is 1, along the direction of the flow.

**Worked example.** Competing species: $x' = x(3 - x - 2y)$, $y' = y(2 - x - y)$ on the open quadrant $D = \\{x > 0, y > 0\\}$, which is simply connected. Take $B = 1/(xy)$. Then $BP = (3 - x - 2y)/y$ and $BQ = (2 - x - y)/x$, so

$$\\operatorname{div}(Bf) = \\frac{\\partial}{\\partial x}\\frac{3 - x - 2y}{y} + \\frac{\\partial}{\\partial y}\\frac{2 - x - y}{x} = -\\frac1y - \\frac1x < 0.$$

So there are no periodic orbits in the open quadrant. The axes are invariant, so a periodic orbit touching them would have to lie on them, which is impossible. This completes the picture of competitive exclusion: with no cycles, bounded orbits must tend to equilibria.

For the second idea, take $x' = x - y - x(x^2 + y^2)$, $y' = x + y - y(x^2 + y^2)$, which is $r' = r(1 - r^2)$, $\\theta' = 1$. Here $\\operatorname{div}f = 2 - 4r^2$, which equals $-2$ on the unit circle. With period $2\\pi$, $\\mu = e^{-4\\pi}$, so the cycle is strongly attracting. The radial equation agrees: linearising at $r = 1$ gives $\\rho' = -2\\rho$, and over one period that is a factor of $e^{-4\\pi}$.`,
          resources: [
            teschl('The sections on planar dynamical systems and periodic solutions.'),
            wiki('Bendixson%E2%80%93Dulac_theorem', 'Bendixson-Dulac theorem', 'Statement and short proof, to compare with yours.'),
            mit18385('The lecture notes on weakly non-linear oscillators and limit cycles.'),
          ],
          exercises: [
            {
              slug: 'prove-dulac',
              title: 'Write the proof',
              prompt: `Write a complete proof of the Bendixson-Dulac criterion, with the orientation of Green's theorem explicit. Then explain why simple connectivity is needed, by giving a field on an annulus with positive divergence everywhere and a periodic orbit.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'rule-out-cycles',
              title: 'Rule out cycles',
              prompt: `Show that these systems have no periodic orbits in the region given. (a) $x' = y$, $y' = -x - y(1 + x^2)$ in $\\mathbb{R}^2$. (b) The general competition model $x' = x(a - bx - cy)$, $y' = y(d - ex - gy)$ with $b, g > 0$, in the open quadrant. (c) $x' = y$, $y' = -\\sin x - y + y^3$: show that no periodic orbit lies entirely in the strip $|y| < 1/\\sqrt{3}$, and explain why the criterion says nothing about orbits that leave the strip.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), compute the divergence and find the strip of $y$ values on which it has one sign.',
            },
            {
              slug: 'at-most-one-cycle',
              title: 'At most one cycle in an annulus',
              prompt: `Let $A$ be an open annulus in the plane, and suppose $\\operatorname{div}f < 0$ on $A$. Prove that $A$ contains at most one periodic orbit that goes round the hole. Use Green's theorem on the region between two such orbits.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'van-der-pol-multiplier',
              title: 'The van der Pol cycle',
              prompt: `For $x' = y$, $y' = -x + \\mu(1 - x^2)y$ with $\\mu = 1$, find the limit cycle numerically: integrate until transients die out, and estimate the period and the maximum of $x$ on the cycle. Compute $\\int_0^T\\operatorname{div}f\\,dt$ along it, and the multiplier. Check the multiplier by measuring the contraction of a nearby orbit over one period on a section.`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a limit cycle and a periodic orbit in a center?',
              answerOutline: 'Nearby orbits approach or leave a limit cycle. Around a center nearby orbits are themselves periodic.',
            },
            {
              question: 'Why does the Green\'s theorem line integral vanish on a periodic orbit?',
              answerOutline: 'The orbit is tangent to $f$, so $P\\,dy - Q\\,dx = (PQ - QP)\\,dt = 0$.',
            },
            {
              question: 'How do you decide the stability of a planar periodic orbit from the vector field?',
              answerOutline: 'Integrate $\\operatorname{div}f$ over one period along the orbit. A negative integral means it attracts.',
            },
          ],
        },
        {
          slug: 'poincare-bendixson',
          title: 'The Poincaré-Bendixson theorem',
          summary:
            'In the plane, a bounded orbit that avoids equilibria must approach a periodic orbit. Use this with trapping regions to prove that cycles exist.',
          estimatedMinutes: 130,
          objectives: [
            'State the Poincaré-Bendixson theorem and its corollary on trapping regions',
            'Construct trapping regions using polar coordinates or level sets',
            'Explain the role of the Jordan curve theorem in the proof',
            'Give an example of each of the possible omega-limit sets',
          ],
          concepts: [
            'Trapping region',
            'Transversal segment',
            'Monotonicity along a transversal',
            'Jordan curve theorem',
            'Homoclinic orbit',
            'Heteroclinic cycle',
          ],
          explanation: `**Theorem (Poincaré-Bendixson).** Let $f$ be $C^1$ on an open set $U \\subset \\mathbb{R}^2$, and suppose the forward orbit of $x$ lies in a compact set $K \\subset U$ containing only finitely many equilibria. Then one of the following holds:

1. $\\omega(x)$ is a single equilibrium;
2. $\\omega(x)$ is a periodic orbit;
3. $\\omega(x)$ consists of finitely many equilibria together with orbits each of which tends to one of these equilibria as $t \\to \\pm\\infty$.

**Corollary.** If $K \\subset U$ is compact, positively invariant and contains no equilibria, then $K$ contains a periodic orbit.

The key ingredient is planar topology. Take a **transversal**, a short segment across which the field points in one direction. *Lemma:* the successive crossings of a forward orbit with a transversal are monotone along the segment. The piece of orbit between two crossings, together with the piece of segment between them, forms a closed curve. By the Jordan curve theorem, it splits the plane into two regions, and the orbit can cross the segment in one direction only, so it is trapped on one side. Hence $\\omega(x)$ meets each transversal in at most one point, which forces the three alternatives. In three dimensions there is no Jordan curve theorem of this kind, and orbits can wind around chaotically.

To apply the corollary, you need a **trapping region**, usually an annulus whose boundary the field crosses inward, containing no equilibria.

**Worked example.** In polar coordinates, let

$$r' = r(1 - r^2) + \\epsilon r\\cos\\theta, \\qquad \\theta' = 1,$$

with $0 < |\\epsilon| < 1$. We prove that a periodic orbit exists.

Choose radii $a, b$ with $0 < a^2 < 1 - |\\epsilon|$ and $b^2 > 1 + |\\epsilon|$. On the circle $r = a$,

$$r' = a(1 - a^2 + \\epsilon\\cos\\theta) \\geq a(1 - a^2 - |\\epsilon|) > 0.$$

On $r = b$,

$$r' = b(1 - b^2 + \\epsilon\\cos\\theta) \\leq b(1 - b^2 + |\\epsilon|) < 0.$$

So orbits cross both circles into the closed annulus $K = \\{a \\leq r \\leq b\\}$, which is compact and positively invariant. The only equilibrium is the origin, since $\\theta' = 1 \\neq 0$ for $r > 0$, and the origin is not in $K$. By the corollary, $K$ contains a periodic orbit. In Cartesian coordinates the field is $C^1$ on the plane: with $\\cos\\theta = x/r$, the term $\\epsilon r\\cos\\theta$ contributes $\\epsilon x\\cos\\theta = \\epsilon x^2/r$ to $x'$, which is $C^1$ away from 0, and $K$ avoids 0.

The theorem gives existence, not a formula, and says nothing about uniqueness. For that you can add the divergence criterion on an annulus from the previous lesson, if it applies.

The third alternative really occurs. For $x' = y$, $y' = x - x^3 - y\\,E$ with $E = \\frac12y^2 - \\frac12x^2 + \\frac14x^4$, one finds $E' = -y^2E$, so $E \\to 0$ and orbits accumulate on the figure-eight $\\{E = 0\\}$, made of the equilibrium at the origin and two homoclinic orbits.`,
          resources: [
            teschl('The section on the Poincaré-Bendixson theorem, including the proof.'),
            wiki('Poincar%C3%A9%E2%80%93Bendixson_theorem', 'Poincaré-Bendixson theorem', 'Statement and the precise form of the hypotheses.'),
            strogatz('The lecture on the Poincaré-Bendixson theorem and trapping regions.'),
          ],
          exercises: [
            {
              slug: 'monotone-crossings',
              title: 'The monotonicity lemma',
              prompt: `Prove the lemma that successive crossings of a forward orbit with a transversal segment are monotone along the segment, using the Jordan curve theorem. State carefully which side of the closed curve the orbit enters and why it can never come back.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'brusselator-cycle',
              title: 'The Brusselator',
              prompt: `For $x' = a - (b + 1)x + x^2y$, $y' = bx - x^2y$ with $a, b > 0$, find the unique equilibrium and show that its Jacobian has trace $b - 1 - a^2$ and determinant $a^2$. For $b > 1 + a^2$ the equilibrium is an unstable spiral or node. Take $a = 1$, $b = 3$ and confirm numerically that a limit cycle exists, giving its period. Then describe how one builds a trapping region for this system, and why the corollary then applies after cutting out a small disc around the equilibrium.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'figure-eight',
              title: 'An omega-limit set with homoclinic orbits',
              prompt: `For the system at the end of the lesson, verify $E' = -y^2E$. Show that the set $\\{E = 0\\}$ consists of the origin and two homoclinic orbits. Describe $\\omega(x)$ for a starting point with $E > 0$ and one with $E < 0$ (inside one loop). Confirm with plots.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'equilibrium-inside',
              title: 'Every cycle encloses an equilibrium',
              prompt: `Use the Poincaré-Bendixson theorem, not index theory, to prove this: if $\\gamma$ is a periodic orbit of a $C^1$ planar field defined on the whole region $\\Omega$ enclosed by $\\gamma$, then $\\Omega$ contains an equilibrium. Assume finitely many equilibria. Consider periodic orbits in $\\Omega$, and use the bounded area enclosed.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If there were no equilibrium, every orbit in $\\Omega$ would have a periodic orbit in its limit set. Consider the infimum of the areas enclosed by periodic orbits inside $\\Omega$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three possible omega-limit sets in the theorem?',
              answerOutline: 'An equilibrium, a periodic orbit, or equilibria joined by connecting orbits.',
            },
            {
              question: 'Why does the theorem fail in three dimensions?',
              answerOutline: 'The proof uses the Jordan curve theorem. A closed curve does not separate three-dimensional space.',
            },
            {
              question: 'What must a trapping region satisfy to give a periodic orbit?',
              answerOutline: 'It must be compact and positively invariant, and contain no equilibria.',
            },
          ],
        },
        {
          slug: 'bifurcations',
          title: 'Bifurcations',
          summary:
            'How equilibria and cycles appear, disappear and exchange stability as a parameter changes: saddle-node, transcritical, pitchfork and Hopf.',
          estimatedMinutes: 120,
          objectives: [
            'Recognise and analyse the saddle-node, transcritical and pitchfork bifurcations',
            'State the conditions of the Hopf bifurcation theorem',
            'Distinguish supercritical and subcritical bifurcations',
            'Locate bifurcations in a model and confirm them numerically',
          ],
          concepts: [
            'Bifurcation',
            'Normal form',
            'Saddle-node bifurcation',
            'Transcritical bifurcation',
            'Pitchfork bifurcation',
            'Hopf bifurcation',
            'Supercritical and subcritical',
          ],
          explanation: `A family $x' = f(x, \\mu)$ undergoes a **bifurcation** at $\\mu_0$ when the phase portrait changes its topological type there. By Hartman-Grobman, local changes can happen only at a non-hyperbolic equilibrium. In one dimension that means $f = 0$ and $f_x = 0$.

The basic scalar cases, in **normal form**:

- **Saddle-node**, $x' = \\mu - x^2$. For $\\mu < 0$ there are no equilibria. For $\\mu > 0$ there are two, $\\pm\\sqrt{\\mu}$, with $+\\sqrt{\\mu}$ stable. Generic conditions: $f = f_x = 0$, $f_\\mu \\neq 0$, $f_{xx} \\neq 0$.
- **Transcritical**, $x' = \\mu x - x^2$. Equilibria $0$ and $\\mu$ cross and exchange stability.
- **Pitchfork**, $x' = \\mu x - x^3$. For $\\mu > 0$ the origin loses stability and two stable equilibria $\\pm\\sqrt{\\mu}$ appear. This is **supercritical**. The **subcritical** case $x' = \\mu x + x^3$ has two unstable equilibria for $\\mu < 0$ that merge into the origin.

Transcritical and pitchfork bifurcations need special structure, such as a fixed equilibrium or a symmetry $x \\to -x$. Generic families have only saddle-nodes.

In the plane, a pair of complex eigenvalues can cross the imaginary axis.

**Theorem (Hopf, statement).** Let $f$ be smooth enough (say $C^4$), with $f(0, \\mu) = 0$, and suppose $Df(0, \\mu)$ has eigenvalues $\\alpha(\\mu) \\pm i\\beta(\\mu)$ with $\\alpha(0) = 0$, $\\beta(0) \\neq 0$ and $\\alpha'(0) \\neq 0$. Suppose also that the first Lyapunov coefficient $\\ell_1$, computed from the second and third derivatives at $\\mu = 0$, is non-zero. Then a unique family of periodic orbits bifurcates from the origin on one side of $\\mu = 0$, with amplitude proportional to $\\sqrt{|\\mu|}$ and period near $2\\pi/|\\beta(0)|$. If $\\ell_1 < 0$, the cycles are stable and the bifurcation is supercritical. If $\\ell_1 > 0$, they are unstable and it is subcritical.

**Worked example.** Take

$$x' = \\mu x - y - x(x^2 + y^2), \\qquad y' = x + \\mu y - y(x^2 + y^2).$$

The linearisation at the origin is $\\begin{pmatrix} \\mu & -1 \\\\ 1 & \\mu \\end{pmatrix}$, with eigenvalues $\\mu \\pm i$. So $\\alpha(\\mu) = \\mu$, $\\alpha'(0) = 1 \\neq 0$, $\\beta = 1$. In polar coordinates, compute $rr' = xx' + yy'$:

$$rr' = \\mu(x^2 + y^2) - (x^2 + y^2)^2 = \\mu r^2 - r^4,$$

so $r' = \\mu r - r^3$, and similarly $\\theta' = 1$. The radial equation is a pitchfork. For $\\mu \\leq 0$ the origin is globally asymptotically stable. For $\\mu > 0$ it is an unstable spiral, surrounded by the circle $r = \\sqrt{\\mu}$, a periodic orbit of period $2\\pi$ which attracts every other non-zero orbit. Its multiplier, by the divergence formula, is $\\exp(2\\pi(2\\mu - 4\\mu)) = e^{-4\\pi\\mu} < 1$. This is a supercritical Hopf bifurcation, with amplitude $\\sqrt{\\mu}$ as the theorem predicts.

Flipping the sign of the cubic terms gives the subcritical case, in which an unstable cycle of radius $\\sqrt{-\\mu}$ exists for $\\mu < 0$ and shrinks onto the origin. In that case, as $\\mu$ passes 0, the state jumps to a distant attractor.`,
          resources: [
            wiki('Hopf_bifurcation', 'Hopf bifurcation', 'The statement, including the role of the first Lyapunov coefficient.'),
            mit18385('The lecture notes on Hopf bifurcations.'),
            strogatz('The lectures on bifurcations in one dimension and on Hopf bifurcations.'),
          ],
          exercises: [
            {
              slug: 'three-normal-forms',
              title: 'Three normal forms',
              prompt: `For $x' = \\mu - x^2$, $x' = \\mu x - x^2$ and $x' = \\mu x + x^3$, find all equilibria as functions of $\\mu$, classify their stability with the derivative test, and draw each bifurcation diagram with stable branches solid and unstable branches dashed. Check the generic conditions for the saddle-node.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'imperfect-pitchfork',
              title: 'The imperfect pitchfork',
              prompt: `For $x' = h + \\mu x - x^3$, show that the number of equilibria changes exactly on the curve $27h^2 = 4\\mu^3$ in the $(\\mu, h)$ plane. Show that crossing this curve away from the origin gives a saddle-node. Draw bifurcation diagrams in $\\mu$ for $h = 0$ and for a small $h > 0$, and explain why a small imperfection destroys the pitchfork.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cycle-saddle-node',
              title: 'A saddle-node of cycles',
              prompt: `For $r' = \\mu r + r^3 - r^5$, $\\theta' = 1$, find all periodic orbits as functions of $\\mu$ and their stability. Show that two cycles are born together at $\\mu = -1/4$, and that one of them shrinks to the origin as $\\mu \\to 0^-$. Describe the hysteresis as $\\mu$ is swept slowly up through 0 and back down to $-1/2$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'brusselator-hopf',
              title: 'Hopf in the Brusselator',
              prompt: `For the Brusselator with $a = 1$, show that the Hopf conditions on the eigenvalues hold at $b = 2$, with $\\beta(0) = 1$ and the trace crossing zero at non-zero speed. Integrate for $b = 2.05, 2.1, 2.2, 2.4$, measure the amplitude of the cycle in $x$, and plot amplitude squared against $b - 2$. Is the result consistent with a supercritical bifurcation? Compare the period with $2\\pi$.`,
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a local bifurcation of an equilibrium only occur where it is non-hyperbolic?',
              answerOutline: 'At a hyperbolic equilibrium the implicit function theorem continues it, and Hartman-Grobman fixes its local type.',
            },
            {
              question: 'What distinguishes supercritical from subcritical Hopf bifurcations?',
              answerOutline: 'The sign of the first Lyapunov coefficient: stable small cycles after the bifurcation, or unstable cycles before it.',
            },
            {
              question: 'Why are pitchfork bifurcations non-generic?',
              answerOutline: 'They need extra structure, such as a symmetry. A generic perturbation turns them into a saddle-node and a branch.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/systems-of-odes-and-phase-plane'],
        },
      ],
    },
    {
      slug: 'boundary-value-problems',
      title: 'Boundary Value Problems',
      description:
        'Sturm-Liouville problems, oscillation theory, Green\'s functions and eigenfunction expansions: the theory behind Fourier series and separation of variables.',
      lessons: [
        {
          slug: 'sturm-liouville-problems',
          title: 'Regular Sturm-Liouville problems',
          summary:
            'Self-adjoint boundary value problems have real, simple eigenvalues and orthogonal eigenfunctions, and the Rayleigh quotient bounds them.',
          estimatedMinutes: 120,
          objectives: [
            'Put a second-order eigenvalue problem into Sturm-Liouville form',
            'Prove Lagrange\'s identity and the self-adjointness of separated boundary conditions',
            'Prove that eigenvalues are real and simple and that eigenfunctions are orthogonal',
            'Use the Rayleigh quotient to bound the lowest eigenvalue',
          ],
          concepts: [
            'Sturm-Liouville form',
            'Weight function',
            'Separated boundary conditions',
            'Lagrange\'s identity',
            'Self-adjoint operator',
            'Rayleigh quotient',
          ],
          explanation: `A **regular Sturm-Liouville problem** on $[a, b]$ is

$$Ly := -(p\\,y')' + q\\,y = \\lambda w\\,y,$$

with $p \\in C^1[a, b]$, $p > 0$, $q, w \\in C[a, b]$, $w > 0$, and **separated boundary conditions**

$$\\alpha_1y(a) + \\alpha_2y'(a) = 0, \\qquad \\beta_1y(b) + \\beta_2y'(b) = 0,$$

with $(\\alpha_1, \\alpha_2) \\neq (0, 0)$ and $(\\beta_1, \\beta_2) \\neq (0, 0)$. Any equation $a_0y'' + a_1y' + a_2y + \\lambda a_3y = 0$ with $a_0 > 0$ can be put in this form, by multiplying by $\\frac{1}{a_0}\\exp\\int\\frac{a_1}{a_0}\\,dx$.

**Lagrange's identity.** For $C^2$ functions $u, v$,

$$\\int_a^b(u\\,Lv - v\\,Lu)\\,dx = \\Big[p(u'v - uv')\\Big]_a^b.$$

Differentiate $p(u'v - uv')$ to check it. If $u$ and $v$ both satisfy the condition at $a$, the vectors $(u(a), u'(a))$ and $(v(a), v'(a))$ are both orthogonal to $(\\alpha_1, \\alpha_2)$, so they are parallel and $u'v - uv' = 0$ at $a$. The same holds at $b$. Hence $\\langle u, Lv\\rangle = \\langle Lu, v\\rangle$ on functions satisfying the conditions: $L$ is **symmetric**.

**Theorem.**
1. Eigenvalues are real. If $Ly = \\lambda wy$, apply the identity to $y$ and $\\bar y$ to get $(\\lambda - \\bar\\lambda)\\int w|y|^2 = 0$.
2. Each eigenvalue is simple. Two eigenfunctions for the same $\\lambda$ solve the same equation with the same condition at $a$, so their Wronskian vanishes at $a$ and they are dependent.
3. Eigenfunctions for distinct eigenvalues are orthogonal with weight $w$: $\\int_a^b y_my_nw\\,dx = 0$.
4. (Stated.) The eigenvalues form an increasing sequence $\\lambda_1 < \\lambda_2 < \\dots \\to \\infty$, and the eigenfunction $y_n$ has exactly $n - 1$ zeros in $(a, b)$.

Multiplying $Ly = \\lambda wy$ by $y$ and integrating by parts gives the **Rayleigh quotient**:

$$\\lambda = \\frac{\\int_a^b(p\\,y'^2 + q\\,y^2)\\,dx - \\big[p\\,y\\,y'\\big]_a^b}{\\int_a^b w\\,y^2\\,dx}.$$

With Dirichlet conditions the boundary term vanishes, so $q \\geq 0$ forces $\\lambda > 0$. Moreover $\\lambda_1$ is the minimum of this quotient over admissible functions, so any trial function gives an upper bound.

**Worked example.** Solve $(xy')' + \\frac{\\lambda}{x}y = 0$ on $[1, e]$ with $y(1) = y(e) = 0$. Here $p = x$, $q = 0$, $w = 1/x$.

Substitute $s = \\ln x$, so $s$ runs over $[0, 1]$. Then $xy' = dy/ds$, and $(xy')' = \\frac{1}{x}\\frac{d^2y}{ds^2}$. The equation becomes $\\frac{d^2y}{ds^2} + \\lambda y = 0$ with $y = 0$ at $s = 0, 1$. So

$$\\lambda_n = n^2\\pi^2, \\qquad y_n = \\sin(n\\pi\\ln x), \\qquad n = 1, 2, \\dots$$

The eigenfunction $y_n$ has $n - 1$ interior zeros, at $x = e^{k/n}$. Orthogonality with the weight is a substitution away:

$$\\int_1^e\\sin(m\\pi\\ln x)\\sin(n\\pi\\ln x)\\frac{dx}{x} = \\int_0^1\\sin(m\\pi s)\\sin(n\\pi s)\\,ds = 0, \\qquad m \\neq n.$$

Without the weight $1/x$, these functions are **not** orthogonal, so the weight is part of the structure.`,
          resources: [
            teschl('The chapter on boundary value problems: Sturm-Liouville problems.'),
            wiki('Sturm%E2%80%93Liouville_theory', 'Sturm-Liouville theory', 'A summary of the main theorems, with the regular and singular cases.'),
            mit18034('The syllabus lists Sturm-Liouville theory near the end of the course.'),
          ],
          exercises: [
            {
              slug: 'to-sl-form',
              title: 'Put it in Sturm-Liouville form',
              prompt: `Find $p$, $q$ and $w$ for each equation: (a) Hermite, $y'' - 2xy' + \\lambda y = 0$; (b) Laguerre, $xy'' + (1 - x)y' + \\lambda y = 0$; (c) $y'' + 2y' + (1 + \\lambda)y = 0$. In (c), solve the problem with $y(0) = y(\\pi) = 0$, and confirm orthogonality with your weight.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'prove-sl-theorem',
              title: 'Prove parts 1 to 3',
              prompt: `Prove Lagrange's identity, the symmetry of $L$ under separated conditions, and parts 1, 2 and 3 of the theorem. Then show that with periodic conditions $y(a) = y(b)$, $y'(a) = y'(b)$ and $p(a) = p(b)$, $L$ is still symmetric but part 2 can fail, with an example.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rayleigh-bound',
              title: 'A Rayleigh bound',
              prompt: `For $-y'' = \\lambda y$ on $[0, 1]$ with $y(0) = y(1) = 0$, compute the Rayleigh quotient of $y = x(1 - x)$ and compare with $\\lambda_1 = \\pi^2$. Then try $y = x(1 - x)(1 + cx(1 - x))$ and minimise over $c$. How close do you get?`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'robin-eigenvalues',
              title: 'Robin conditions',
              prompt: `For $-y'' = \\lambda y$ on $[0, 1]$ with $y(0) = 0$ and $y'(1) + hy(1) = 0$, show that all eigenvalues are positive when $h > -1$. Find the equation for $\\sqrt\\lambda$, and compute the first three eigenvalues for $h = 1$. Show numerically that eigenfunctions $n = 1$ and $n = 2$ are orthogonal, and count their zeros.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For $h = 1$, the condition becomes $\\tan\\sqrt\\lambda = -\\sqrt\\lambda$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do separated boundary conditions make the boundary term in Lagrange\'s identity vanish?',
              answerOutline: 'At each end both functions have $(y, y\')$ orthogonal to the same non-zero vector, so the vectors are parallel and the Wronskian is 0.',
            },
            {
              question: 'Why are eigenvalues simple?',
              answerOutline: 'Two eigenfunctions satisfy the same condition at $a$, so their Wronskian is 0 there, and they are dependent.',
            },
            {
              question: 'How does the Rayleigh quotient give an upper bound for $\\lambda_1$?',
              answerOutline: '$\\lambda_1$ is the minimum of the quotient over admissible functions, so every trial function gives a value at least $\\lambda_1$.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/sturm-liouville-theory'],
        },
        {
          slug: 'sturm-oscillation-theory',
          title: 'Sturm comparison and oscillation',
          summary:
            'Zeros of solutions interlace, and a larger coefficient forces more zeros. These two facts count the zeros of eigenfunctions.',
          estimatedMinutes: 110,
          objectives: [
            'Prove the Sturm separation theorem',
            'Prove the Sturm comparison theorem',
            'Bound the spacing of zeros from bounds on the coefficient',
            'Decide whether an equation is oscillatory',
          ],
          concepts: [
            'Sturm separation theorem',
            'Sturm comparison theorem',
            'Picone-type identity',
            'Zero spacing',
            'Oscillatory equation',
            'Euler equation threshold',
          ],
          explanation: `Consider $y'' + q(x)y = 0$ with $q$ continuous. (The general form $(py')' + qy = 0$ behaves in the same way.) Zeros of a non-trivial solution are isolated: at a zero, $y' \\neq 0$, since otherwise uniqueness would give $y \\equiv 0$.

**Theorem (separation).** If $y_1, y_2$ are independent solutions, then between two consecutive zeros of $y_1$ there is exactly one zero of $y_2$.

*Proof.* Let $x_1 < x_2$ be consecutive zeros of $y_1$, and say $y_1 > 0$ between them, so $y_1'(x_1) > 0$ and $y_1'(x_2) < 0$. The Wronskian $W = y_1y_2' - y_1'y_2$ is constant and non-zero. At the zeros, $W = -y_1'(x_i)y_2(x_i)$. Since $W$ has the same sign at both points and $y_1'$ changes sign, $y_2(x_1)$ and $y_2(x_2)$ have opposite signs, so $y_2$ vanishes in between. Exchanging roles shows there is only one zero. $\\square$

**Theorem (comparison).** Let $y'' + q_1y = 0$ and $z'' + q_2z = 0$ with $q_2 \\geq q_1$ on $[x_1, x_2]$ and $q_2 \\not\\equiv q_1$ there. If $y$ is a non-trivial solution with consecutive zeros $x_1 < x_2$, then every solution $z$ has a zero in $(x_1, x_2)$.

*Proof.* Suppose not. Take $y > 0$ and $z > 0$ on $(x_1, x_2)$. Then $(y'z - yz')' = (q_2 - q_1)yz$. Integrating,

$$y'(x_2)z(x_2) - y'(x_1)z(x_1) = \\int_{x_1}^{x_2}(q_2 - q_1)yz\\,dx > 0.$$

But $y'(x_2) < 0 < y'(x_1)$ and $z \\geq 0$ at the endpoints, so the left side is $\\leq 0$, a contradiction. $\\square$

Comparing with $z'' + m^2z = 0$, whose solutions $\\sin(m(x - c))$ have zeros spaced $\\pi/m$, gives:

**Corollary.** If $m^2 \\leq q \\leq M^2$ on an interval with $0 < m \\leq M$, consecutive zeros of a solution there are at distance between $\\pi/M$ and $\\pi/m$.

**Worked example.** Bessel's equation $x^2y'' + xy' + (x^2 - \\nu^2)y = 0$ becomes, with $u = \\sqrt{x}\\,y$,

$$u'' + \\left(1 + \\frac{1/4 - \\nu^2}{x^2}\\right)u = 0,$$

as you can verify by substitution. For $\\nu = 0$ the coefficient exceeds 1, so the gaps between zeros of $J_0$ are less than $\\pi$. For $\\nu > \\frac12$ it is less than 1, so gaps exceed $\\pi$. For $\\nu = \\frac12$ it equals 1 exactly, and indeed $J_{1/2}(x) = \\sqrt{2/(\\pi x)}\\sin x$. As $x \\to \\infty$ the coefficient tends to 1, so gaps tend to $\\pi$ in every case. The numbers agree: the first zeros of $J_0$ are about $2.405, 5.520, 8.654$, with gaps $3.115, 3.134$, both below $\\pi \\approx 3.1416$. Those of $J_1$ are $3.832, 7.016, 10.173$, with gaps $3.184, 3.157$, above $\\pi$.

For the Sturm-Liouville problem, the same idea shows that as $\\lambda$ increases, zeros move inward and new ones enter. That is how one proves that the $n$th eigenfunction has $n - 1$ interior zeros.`,
          resources: [
            teschl('The section on oscillation theory, in the boundary value problems chapter.'),
            wiki('Sturm_separation_theorem', 'Sturm separation theorem', 'Statement and proof for comparison.'),
            mit18034('The lecture on oscillation and comparison theorems.'),
          ],
          exercises: [
            {
              slug: 'zeros-simple',
              title: 'Zeros are simple and isolated',
              prompt: `Prove that a non-trivial solution of $y'' + q(x)y = 0$ on a compact interval has only finitely many zeros there, each simple. Then explain why a solution cannot oscillate like $\\sin(1/x)$ near a point of a closed interval on which $q$ is continuous.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'euler-threshold',
              title: 'The threshold $1/4$',
              prompt: `Solve $y'' + \\frac{k}{x^2}y = 0$ on $x > 0$ by trying $y = x^r$. Show that solutions have infinitely many zeros in $[1, \\infty)$ if and only if $k > \\frac14$. Then use the comparison theorem to prove: if $q(x) \\geq \\frac{k}{x^2}$ with $k > \\frac14$ for all large $x$, every solution of $y'' + qy = 0$ has infinitely many zeros.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'airy-zeros',
              title: 'Zeros of Airy functions',
              prompt: `For $y'' + xy = 0$, which is Airy's equation with $x \\to -x$, use the corollary to show that on $[a, a + \\pi/\\sqrt{a}]$ every solution has a zero when $a > 0$, and that a solution has at most one zero on $(-\\infty, 0]$. Compute the zeros of $\\operatorname{Ai}(-x)$ in $[0, 20]$ with \`scipy.special.ai_zeros\`, and check the spacing bounds on each gap.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'On $[a, b]$ the coefficient lies between $a$ and $b$.',
            },
            {
              slug: 'more-zeros-larger-lambda',
              title: 'More zeros for larger eigenvalues',
              prompt: `For $-(py')' + qy = \\lambda wy$ with $y(a) = y(b) = 0$, use the comparison theorem in the form for $(py')' + Qy = 0$ to prove that if $\\lambda < \\mu$ are eigenvalues, the eigenfunction for $\\mu$ has a zero strictly between any two consecutive zeros of the eigenfunction for $\\lambda$. Deduce that it has more interior zeros. State the comparison theorem you used and indicate how its proof changes with $p$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Sturm separation theorem.',
              answerOutline: 'Zeros of two independent solutions of the same equation strictly interlace.',
            },
            {
              question: 'What does the comparison theorem say, informally?',
              answerOutline: 'A larger coefficient $q$ makes solutions oscillate faster: between two zeros of the slower one, the faster one has a zero.',
            },
            {
              question: 'Why do gaps between zeros of Bessel functions tend to $\\pi$?',
              answerOutline: 'After the substitution $u = \\sqrt{x}y$, the coefficient tends to 1, so comparison with $\\sin$ squeezes the gaps.',
            },
          ],
        },
        {
          slug: 'greens-functions',
          title: "Green's functions for boundary value problems",
          summary:
            'Invert a Sturm-Liouville operator with an explicit kernel built from two homogeneous solutions, and see when inversion is impossible.',
          estimatedMinutes: 120,
          objectives: [
            'Construct the Green\'s function from solutions satisfying each boundary condition',
            'Prove that it solves the boundary value problem',
            'State the jump and symmetry properties',
            'State and use the Fredholm alternative when 0 is an eigenvalue',
          ],
          concepts: [
            'Green\'s function',
            'Jump condition',
            'Symmetry of the kernel',
            'Fredholm alternative',
            'Solvability condition',
            'Discrete Green\'s function',
          ],
          explanation: `Take the operator $Ly = -(py')' + qy$ on $[a, b]$ with separated conditions as before, and suppose 0 is **not** an eigenvalue. We want to solve $Ly = f$ for continuous $f$.

Let $u$ be a non-trivial solution of $Lu = 0$ satisfying the condition at $a$, and $v$ a non-trivial solution of $Lv = 0$ satisfying the condition at $b$. Then $c = p(u'v - uv')$ is a constant, by Abel's formula. It is non-zero: if $c = 0$, then $u$ and $v$ are dependent, so $u$ satisfies both conditions and is an eigenfunction for $\\lambda = 0$. Define

$$G(x, \\xi) = \\frac{1}{c}\\begin{cases} u(x)v(\\xi), & x \\leq \\xi, \\\\ u(\\xi)v(x), & x \\geq \\xi. \\end{cases}$$

**Theorem.** The unique solution of $Ly = f$ with the boundary conditions is

$$y(x) = \\int_a^bG(x, \\xi)f(\\xi)\\,d\\xi.$$

*Proof.* Write $y = \\frac1c\\left[v(x)\\int_a^xuf + u(x)\\int_x^bvf\\right]$. Differentiating, the terms from the variable limits cancel, so $y' = \\frac1c[v'\\int_a^xuf + u'\\int_x^bvf]$. Differentiating $py'$ again,

$$(py')' = \\frac1c\\left[(pv')'\\int_a^xuf + (pu')'\\int_x^bvf\\right] + \\frac{p(uv' - u'v)}{c}f = qy - f.$$

So $Ly = f$. At $x = a$ the first integral vanishes, so $(y(a), y'(a))$ is a multiple of $(u(a), u'(a))$, and the condition at $a$ holds. The same argument works at $b$. Uniqueness: the difference of two solutions would be an eigenfunction for 0. $\\square$

$G$ is continuous and symmetric, $G(x, \\xi) = G(\\xi, x)$, and $\\partial_xG$ jumps by $-1/p(\\xi)$ across $x = \\xi$. These properties characterise it: $G(\\cdot, \\xi)$ is the response to a unit point source at $\\xi$.

**Worked example.** Solve $-y'' = f$ on $[0, 1]$ with $y(0) = y(1) = 0$.

Take $u = x$ and $v = 1 - x$. With $p = 1$, $c = u'v - uv' = (1 - x) + x = 1$. So

$$G(x, \\xi) = \\begin{cases} x(1 - \\xi), & x \\leq \\xi, \\\\ \\xi(1 - x), & x \\geq \\xi. \\end{cases}$$

For $f \\equiv 1$,

$$y(x) = (1 - x)\\int_0^x\\xi\\,d\\xi + x\\int_x^1(1 - \\xi)\\,d\\xi = \\frac{(1 - x)x^2}{2} + \\frac{x(1 - x)^2}{2} = \\frac{x(1 - x)}{2}.$$

Check: $-y'' = 1$, and $y$ vanishes at both ends. $G \\geq 0$ here, which encodes a maximum principle: a non-negative load gives a non-negative deflection.

**Fredholm alternative.** If 0 is an eigenvalue, with eigenfunction $\\varphi$, then $Ly = f$ has a solution if and only if $\\int_a^bf\\varphi\\,dx = 0$, and then solutions differ by multiples of $\\varphi$. Necessity follows from Lagrange's identity: $\\int f\\varphi = \\int(Ly)\\varphi = \\int y\\,L\\varphi = 0$. For $-y'' = f$ with $y'(0) = y'(1) = 0$, $\\varphi = 1$, so you need $\\int_0^1f = 0$. Physically, a rod with insulated ends has a steady state only when the net heat source is zero.`,
          resources: [
            teschl('The section on Green\'s functions and the inverse of a Sturm-Liouville operator.'),
            wiki('Green%27s_function', "Green's function", 'The general idea and the table of examples.'),
            mit18034('The lecture notes on Green\'s functions.'),
          ],
          exercises: [
            {
              slug: 'green-with-q',
              title: 'A Green\'s function with $q = 1$',
              prompt: `Find the Green's function for $-y'' + y = f$ on $[0, 1]$ with $y(0) = y(1) = 0$. Use it to solve with $f \\equiv 1$, and check your answer by solving the equation directly.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'green-mixed',
              title: 'Mixed conditions and a weight',
              prompt: `(a) Show that the Green's function of $-y'' = f$ on $[0, 1]$ with $y(0) = 0$, $y'(1) = 0$ is $G = \\min(x, \\xi)$. (b) Find the Green's function of $-(xy')' = f$ on $[1, e]$ with $y(1) = y(e) = 0$. Verify the jump condition in each case.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fredholm-proof',
              title: 'Prove the Fredholm alternative',
              prompt: `Suppose 0 is an eigenvalue of $L$ with separated conditions, with eigenfunction $\\varphi$. Prove that $Ly = f$ is solvable if and only if $\\int f\\varphi = 0$. For sufficiency, use variation of parameters with $\\varphi$ and a second solution, and show that the solvability condition is exactly what makes the second boundary condition achievable.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'discrete-green',
              title: 'The discrete Green\'s function',
              prompt: `Discretise $-y'' = f$ on $[0, 1]$ with $y(0) = y(1) = 0$ using $N$ interior points and the matrix $A = h^{-2}\\,\\text{tridiag}(-1, 2, -1)$, $h = 1/(N + 1)$. Show numerically, and then prove, that $(A^{-1})_{ij} = h\\,G(x_i, x_j)$ exactly for the $G$ of the worked example.`,
              kind: 'coding',
              difficulty: 2,
              hint: 'Check that each column $h\\,G(x_i, x_j)$, as a function of $i$, is piecewise linear in $x_i$ with the right kink at $j$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must 0 not be an eigenvalue for $G$ to exist?',
              answerOutline: 'Then $c = 0$, because $u$ would satisfy both conditions, so the formula divides by zero. Uniqueness also fails.',
            },
            {
              question: 'What is the jump in $\\partial_xG$ across $x = \\xi$?',
              answerOutline: '$-1/p(\\xi)$, from integrating $-(pG_x)\' = \\delta(x - \\xi)$ across the point.',
            },
            {
              question: 'When does $-y\'\' = f$ with Neumann conditions have a solution?',
              answerOutline: 'When $\\int_0^1f = 0$, and then solutions differ by constants.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/dirac-delta-and-greens-functions'],
        },
        {
          slug: 'eigenfunction-expansions',
          title: 'Eigenfunction expansions',
          summary:
            'Sturm-Liouville eigenfunctions form an orthonormal basis, so you can expand functions in them and solve forced problems mode by mode.',
          estimatedMinutes: 120,
          objectives: [
            'State the expansion theorem in mean square and uniform forms',
            'Prove Bessel\'s inequality and the best-approximation property',
            'Expand the Green\'s function in eigenfunctions',
            'Solve forced problems and explain resonance by expansion',
          ],
          concepts: [
            'Weighted inner product',
            'Orthonormal eigenfunctions',
            'Bessel\'s inequality',
            'Completeness and Parseval\'s identity',
            'Compact self-adjoint operator',
            'Eigenfunction expansion of $G$',
          ],
          explanation: `Use the weighted inner product $\\langle f, g\\rangle_w = \\int_a^bfg\\,w\\,dx$, and normalise the eigenfunctions so that $\\langle\\varphi_m, \\varphi_n\\rangle_w = \\delta_{mn}$. The **coefficients** of $f$ are $c_n = \\langle f, \\varphi_n\\rangle_w$.

**Bessel's inequality.** For any $N$, expanding $0 \\leq \\|f - \\sum_{n \\leq N}c_n\\varphi_n\\|_w^2$ gives $\\sum_{n \\leq N}c_n^2 \\leq \\|f\\|_w^2$. The same calculation shows that the partial sum is the best approximation of $f$ by combinations of $\\varphi_1, \\dots, \\varphi_N$ in the weighted mean-square norm.

**Theorem (expansion, statement).** For a regular Sturm-Liouville problem:

1. For every $f$ with $\\int f^2w < \\infty$, $\\sum c_n\\varphi_n \\to f$ in the weighted mean-square norm, and $\\sum c_n^2 = \\|f\\|_w^2$ (Parseval).
2. If $f$ is $C^2$ and satisfies the boundary conditions, the series converges absolutely and uniformly to $f$.

*Idea of the proof.* Shift $q$ so that 0 is not an eigenvalue, which does not change the eigenfunctions. Then the operator $Tf(x) = \\int G(x, \\xi)f(\\xi)w(\\xi)\\,d\\xi$ is the inverse of $L/w$, so its eigenfunctions are the $\\varphi_n$ with eigenvalues $1/\\lambda_n$. Because $G$ is continuous and symmetric, $T$ is a compact self-adjoint operator on the weighted $L^2$ space. The spectral theorem for such operators gives an orthonormal basis of eigenfunctions of $T$ for the closure of its range, and the range is dense, since it contains all $C^2$ functions satisfying the conditions. For part 2, a $C^2$ $f$ satisfying the conditions is $f = T(Lf/w)$, and applying $T$ to a mean-square convergent series gives a uniformly convergent one.

**Solving forced problems.** If $Ly - \\mu wy = wf$ and $\\mu$ is not an eigenvalue, expand $y = \\sum y_n\\varphi_n$. Taking the inner product with $\\varphi_n$ and using symmetry gives $(\\lambda_n - \\mu)y_n = c_n$, so

$$y = \\sum_n\\frac{c_n}{\\lambda_n - \\mu}\\varphi_n.$$

As $\\mu$ approaches an eigenvalue $\\lambda_k$, the $k$th coefficient blows up unless $c_k = 0$. This is resonance, and also the Fredholm alternative again.

**Worked example.** For $-y'' = \\lambda y$ on $[0, 1]$ with Dirichlet conditions, $\\varphi_n = \\sqrt2\\sin n\\pi x$ and $\\lambda_n = n^2\\pi^2$. With $\\mu = 0$, the solution of $-y'' = f$ is $\\sum\\frac{c_n}{n^2\\pi^2}\\varphi_n(x)$, with $c_n = \\int_0^1f(\\xi)\\varphi_n(\\xi)\\,d\\xi$. Comparing with $y = \\int G f$ gives

$$G(x, \\xi) = \\sum_{n=1}^\\infty\\frac{2\\sin n\\pi x\\,\\sin n\\pi\\xi}{n^2\\pi^2},$$

which converges uniformly. Check it at $x = \\xi = \\frac12$. The left side is $\\frac12\\cdot\\frac12 = \\frac14$. On the right, $\\sin^2(n\\pi/2)$ is 1 for odd $n$ and 0 for even $n$, so the sum is $\\frac{2}{\\pi^2}\\sum_{n\\text{ odd}}\\frac{1}{n^2} = \\frac{2}{\\pi^2}\\cdot\\frac{\\pi^2}{8} = \\frac14$. Setting $x = \\xi$ and integrating instead gives

$$\\sum_{n=1}^\\infty\\frac{1}{\\lambda_n} = \\int_0^1G(x, x)\\,dx = \\int_0^1x(1 - x)\\,dx = \\frac16,$$

which is $\\sum 1/n^2 = \\pi^2/6$ once more, now as the trace of the operator $T$.`,
          resources: [
            teschl('The sections on compact symmetric operators and on the expansion theorem.'),
            wiki('Sturm%E2%80%93Liouville_theory', 'Sturm-Liouville theory', 'The completeness statement, and the singular problems that give Legendre and Bessel expansions.'),
            basicAnalysis('Its material on uniform convergence and series of functions, for the convergence arguments.'),
          ],
          exercises: [
            {
              slug: 'best-approximation',
              title: 'Best approximation',
              prompt: `Prove Bessel's inequality, and prove that among all combinations $\\sum_{n \\leq N}a_n\\varphi_n$ the weighted mean-square distance to $f$ is smallest exactly when $a_n = c_n$. Show that the expansion theorem implies Parseval's identity.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'expand-a-load',
              title: 'A forced string by modes',
              prompt: `Solve $-y'' - \\mu y = 1$ on $[0, 1]$ with $y(0) = y(1) = 0$ by eigenfunction expansion, for $\\mu = 0$ and $\\mu = 5$. Compare with the closed form, at $x = 1/2$, using 1, 3 and 10 terms. Explain why nothing special happens as $\\mu \\to 4\\pi^2$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The coefficient of $\\varphi_2$ of the constant function is zero.',
            },
            {
              slug: 'mercer-trace',
              title: 'The trace formula',
              prompt: `For the problem with $y(0) = 0$, $y'(1) = 0$, find the eigenvalues and normalised eigenfunctions, expand $G = \\min(x, \\xi)$ in them, and deduce $\\sum_{n \\geq 1}\\frac{1}{(2n - 1)^2} = \\frac{\\pi^2}{8}$ from $\\int_0^1G(x, x)\\,dx$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'legendre-expansion',
              title: 'A singular problem: Legendre',
              prompt: `The Legendre equation $-((1 - x^2)y')' = \\lambda y$ on $[-1, 1]$ is singular, since $p$ vanishes at the ends, yet its bounded eigenfunctions $P_\\ell$ with $\\lambda = \\ell(\\ell + 1)$ are complete. Compute the first three non-zero coefficients of $|x|$ in Legendre polynomials, using $c_\\ell = \\frac{2\\ell + 1}{2}\\int_{-1}^1|x|P_\\ell\\,dx$. Plot partial sums, and show that the mean-square error decreases.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What role does the Green\'s function play in proving completeness?',
              answerOutline: 'It defines a compact symmetric inverse operator, to which the spectral theorem applies.',
            },
            {
              question: 'When does the eigenfunction series converge uniformly?',
              answerOutline: 'For example when $f$ is $C^2$ and satisfies the boundary conditions.',
            },
            {
              question: 'How does resonance appear in the expansion?',
              answerOutline: 'The coefficient $c_k/(\\lambda_k - \\mu)$ blows up as $\\mu \\to \\lambda_k$, unless $c_k = 0$.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'rigorous-study-of-a-planar-model',
    title: 'A rigorous study of a planar model',
    description: `Choose a planar non-linear model from science or engineering, such as the FitzHugh-Nagumo neuron, the Brusselator or a predator-prey model with satiation, and write a short paper of 10 to 15 pages that proves as much as you can about it. The model must have a parameter at which its behaviour changes. Every claim is either proved, with the theorem from this course that you used, or marked clearly as numerical evidence.

This course has no machine problems, so this paper is its main independent work. Aim for something you would be happy to show a mathematician: careful hypotheses, complete arguments, and figures that support, rather than replace, the proofs.`,
    deliverables: [
      'Global existence and uniqueness of solutions for all initial data in the relevant region, with the region shown to be positively invariant',
      'All equilibria and their classification by linearisation, noting every non-hyperbolic case and how you resolve it',
      'A Lyapunov function or a Dulac function result, with complete proof, for at least one parameter range',
      'A trapping region and a Poincaré-Bendixson argument proving that a periodic orbit exists in some parameter range',
      'Verification of the Hopf conditions on the eigenvalues at the bifurcation value, and numerical evidence for the type (supercritical or subcritical) from amplitude measurements',
      'The Floquet multiplier of the periodic orbit at one parameter value, computed both from the divergence integral and from the monodromy matrix of the variational equation',
      'A bifurcation diagram assembled from your results, with proved and numerical parts distinguished',
      'Code that reproduces every figure from a clean checkout',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Prove uniqueness of the periodic orbit in some parameter range',
      'Compute the first Lyapunov coefficient symbolically and compare with your numerical evidence',
    ],
  },
  masteryChecklist: [
    'I can state and prove the Picard-Lindelöf theorem and Gronwall\'s inequality, and use them for uniqueness, continuous dependence and global existence',
    'I can compute matrix exponentials and fundamental matrices, and use Liouville\'s formula and variation of constants',
    'I can compute Floquet multipliers and use them to decide stability of periodic linear systems',
    'I can prove stability with Lyapunov functions, LaSalle\'s principle and the Lyapunov equation, and I know the limits of linearisation',
    'I can state the Hartman-Grobman and stable manifold theorems precisely and compute invariant manifolds in examples',
    'I can use limit sets, the Bendixson-Dulac criterion and the Poincaré-Bendixson theorem to analyse planar flows',
    'I can analyse saddle-node, pitchfork and Hopf bifurcations in examples',
    'I can prove the basic theorems of regular Sturm-Liouville theory and solve boundary value problems with Green\'s functions and eigenfunction expansions',
  ],
});
